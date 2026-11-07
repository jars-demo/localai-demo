import { describe, expect, it } from 'vitest'

import { dataPath, DEFAULT_SETUP, fillDrive, inData, movesData, type Setup } from '@/lib/setup'
import { stepsFor } from '@/lib/steps'

const setup = (patch: Partial<Setup> = {}): Setup => ({ ...DEFAULT_SETUP, ...patch })

describe('the data folder', () => {
  it('uses the drive the learner picked, never a fixed letter', () => {
    expect(dataPath(setup({ drive: 'E' }))).toBe('E:\\Jan')
    expect(dataPath(setup({ drive: 'F' }))).toBe('F:\\Jan')
    expect(dataPath(setup())).toBe('X:\\Jan')
  })

  it('keeps the default with only C: or on a Mac without an SSD', () => {
    expect(dataPath(setup({ drive: 'C' }))).toBe('%APPDATA%\\Jan\\data')
    expect(movesData(setup({ drive: 'C' }))).toBe(false)
    expect(dataPath(setup({ os: 'mac' }))).toContain('Application Support')
    expect(movesData(setup({ os: 'mac' }))).toBe(false)
    expect(movesData(setup({ os: 'mac', mac: 'ssd' }))).toBe(true)
  })

  it('joins paths with the right separator', () => {
    expect(inData(setup({ drive: 'D' }), 'threads')).toBe('D:\\Jan\\threads')
    expect(inData(setup({ os: 'mac' }), 'threads')).toBe(
      '~/Library/Application Support/Jan/data/threads',
    )
  })

  it('fills X: in chapter text only once a drive is picked', () => {
    expect(fillDrive('X:\\Jan\\threads', setup({ drive: 'G' }))).toBe('G:\\Jan\\threads')
    expect(fillDrive('"data_folder": "X:\\\\Jan"', setup({ drive: 'E' }))).toBe(
      '"data_folder": "E:\\\\Jan"',
    )
    expect(fillDrive('X:\\Jan', setup())).toBe('X:\\Jan')
    expect(fillDrive('X:\\Jan', setup({ drive: 'C' }))).toBe('X:\\Jan')
  })
})

describe('the follow-along steps', () => {
  const setups = [
    setup({ drive: 'E' }),
    setup({ drive: 'C' }),
    setup({ os: 'mac' }),
    setup({ os: 'mac', mac: 'ssd' }),
  ]

  it('moves data after setup and before the model download, on every setup', () => {
    for (const s of setups) {
      const ids = stepsFor(s).map((step) => step.id)
      expect(ids.indexOf('move')).toBeGreaterThan(ids.indexOf('setup'))
      expect(ids.indexOf('move')).toBeLessThan(ids.indexOf('model'))
    }
  })

  it('uses the picked drive in every path', () => {
    const text = JSON.stringify(stepsFor(setup({ drive: 'F' })))
    expect(text).toContain('F:\\\\Jan')
    expect(text).not.toContain('D:\\\\Jan')
    expect(text).not.toContain('X:')
  })

  it('demos the one model, with Reasoning off', () => {
    const text = JSON.stringify(stepsFor(setup({ drive: 'D' })))
    expect(text).toContain('Qwen3.5-2B')
    expect(text).toContain('Q4_K_M')
    expect(text).toContain('1.28 GB')
    expect(text).toMatch(/Reasoning\*\* to \*\*Off/)
  })

  it('never overclaims and has no em dashes', () => {
    for (const s of setups) {
      const text = JSON.stringify(stepsFor(s))
      expect(text).not.toMatch(/100% private|nothing leaves|secure/i)
      expect(text).not.toContain('\u2014')
    }
  })
})
