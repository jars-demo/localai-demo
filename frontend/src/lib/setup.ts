// The learner's setup: which system, and which drive holds Jan's data.
// Chosen once on the site, stored in this browser only, and used to fill in every path.

import { useSyncExternalStore } from 'react'

export type Os = 'windows' | 'mac'
export type MacPlace = 'default' | 'ssd'

export type Setup = {
  os: Os
  /** A Windows drive letter for the data folder, 'C' for "only C:", or '' when not chosen yet. */
  drive: string
  mac: MacPlace
}

export const DEFAULT_SETUP: Setup = { os: 'windows', drive: '', mac: 'default' }
export const DRIVE_LETTERS = ['D', 'E', 'F', 'G', 'H'] as const

export const MAC_DEFAULT = '~/Library/Application Support/Jan/data'
export const MAC_SSD = '/Volumes/YourSSD/Jan'
export const WIN_DEFAULT = '%APPDATA%\\Jan\\data'

/** A real data drive was picked (not C:, not unset). */
export function hasDataDrive(setup: Setup): boolean {
  return /^[D-Z]$/.test(setup.drive)
}

/** True when this setup moves Jan's data away from the default folder. */
export function movesData(setup: Setup): boolean {
  return setup.os === 'windows' ? setup.drive !== 'C' : setup.mac === 'ssd'
}

export function dataPath(setup: Setup): string {
  if (setup.os === 'mac') return setup.mac === 'ssd' ? MAC_SSD : MAC_DEFAULT
  if (setup.drive === 'C') return WIN_DEFAULT
  return `${hasDataDrive(setup) ? setup.drive : 'X'}:\\Jan`
}

/** A path inside the data folder, with the right separator. */
export function inData(setup: Setup, ...parts: string[]): string {
  return [dataPath(setup), ...parts].join(setup.os === 'mac' ? '/' : '\\')
}

/** The chapters write the data drive as X:. Swap in the learner's letter once they picked one. */
export function fillDrive(text: string, setup: Setup): string {
  return hasDataDrive(setup) ? text.replace(/\bX:/g, `${setup.drive}:`) : text
}

// A tiny localStorage-backed store. Storage can be missing or blocked; then it lives in memory.

export function createStore<T extends object>(key: string, fallback: T) {
  let value: T | undefined
  const listeners = new Set<() => void>()

  function get(): T {
    if (value === undefined) {
      value = fallback
      try {
        const raw = window.localStorage.getItem(key)
        if (raw) value = { ...fallback, ...(JSON.parse(raw) as Partial<T>) }
      } catch {
        // Private window or blocked storage: keep the fallback.
      }
    }
    return value
  }

  function set(next: T) {
    value = next
    try {
      window.localStorage.setItem(key, JSON.stringify(next))
    } catch {
      // Not saved, but the page still works for this visit.
    }
    listeners.forEach((listener) => listener())
  }

  function subscribe(listener: () => void) {
    listeners.add(listener)
    const onStorage = (event: StorageEvent) => {
      if (event.key !== key) return
      value = undefined
      listener()
    }
    window.addEventListener('storage', onStorage)
    return () => {
      listeners.delete(listener)
      window.removeEventListener('storage', onStorage)
    }
  }

  function useValue(): T {
    return useSyncExternalStore(subscribe, get, () => fallback)
  }

  return { get, set, subscribe, useValue }
}

export const setupStore = createStore<Setup>('localai.setup.v1', DEFAULT_SETUP)
export const useSetup = setupStore.useValue
