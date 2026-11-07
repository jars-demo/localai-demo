import { describe, expect, it } from 'vitest'

import { advise, DEFAULT_LAPTOP, START_MODEL, type Laptop } from '@/lib/picker'

const laptop = (patch: Partial<Laptop>): Laptop => ({ ...DEFAULT_LAPTOP, ...patch })

describe('advise', () => {
  it('turns Intel Macs away', () => {
    const advice = advise(laptop({ os: 'mac', chip: 'intel', memory: 16 }))
    expect(advice.verdict).toBe('no')
    expect(advice.start).toBeUndefined()
  })

  it('warns below the 8 GB minimum', () => {
    expect(advise(laptop({ memory: 4 })).verdict).toBe('no')
  })

  it('starts everyone else on the workshop model', () => {
    for (const patch of [
      {},
      { memory: 16 as const },
      { gpu: 'nvidia-8' as const },
      { os: 'mac' as const, memory: 8 as const },
    ]) {
      expect(advise(laptop(patch)).start).toBe(START_MODEL)
    }
  })

  it('calls an 8 GB Windows laptop with no graphics card slow, not broken', () => {
    const advice = advise(laptop({ memory: 8, gpu: 'none' }))
    expect(advice.verdict).toBe('slow')
    expect(advice.upgrade).toBeUndefined()
  })

  it('suggests upgrades that fit', () => {
    expect(advise(laptop({ gpu: 'nvidia-8' })).upgrade).toContain('Qwen3.5-9B')
    expect(advise(laptop({ gpu: 'nvidia-6' })).upgrade).toContain('Jan-v3.5-4B')
    expect(advise(laptop({ memory: 16 })).upgrade).toContain('Jan-v3.5-4B')
    expect(advise(laptop({ os: 'mac', memory: 32 })).upgrade).toContain('Qwen3.5-9B')
  })

  it('moves Windows data to another drive only when there is one', () => {
    expect(advise(laptop({ drive: 'second' })).dataFolder).toContain('other drive')
    expect(advise(laptop({ drive: 'single' })).dataFolder).toContain('Keep the default')
    expect(advise(laptop({ os: 'mac', drive: 'second' })).dataFolder).toContain('external SSD')
  })
})
