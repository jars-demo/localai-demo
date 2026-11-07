// Browser-only state: the learner's setup and progress, kept in localStorage.
// Client components import this; server code imports only the pure helpers in setup.ts.

import { useSyncExternalStore } from 'react'

import { DEFAULT_SETUP, type Setup } from './setup'

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
