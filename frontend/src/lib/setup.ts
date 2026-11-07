// The learner's setup: which system, and which drive holds Jan's data.
// Chosen once on the site, stored in this browser only, and used to fill in every path.

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
