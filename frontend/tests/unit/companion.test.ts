import { describe, expect, it } from 'vitest'

import { DOT_ANSWERS, DOT_GREETING } from '@/companion/answers'

describe('Dot, the help companion', () => {
  it('has a greeting and a set of fixed answers', () => {
    expect(DOT_GREETING).toContain('Dot')
    expect(DOT_ANSWERS.length).toBeGreaterThanOrEqual(8)
    for (const item of DOT_ANSWERS) {
      expect(item.question.length).toBeGreaterThan(3)
      expect(item.answer.length).toBeGreaterThan(20)
    }
  })

  it('never overclaims, never fixes the drive to D:, and has no em dashes', () => {
    const text = JSON.stringify(DOT_ANSWERS)
    expect(text).not.toMatch(/100% private|nothing leaves|secure\b/i)
    expect(text).not.toContain('\u2014')
    expect(text).toMatch(/not C:/)
  })
})
