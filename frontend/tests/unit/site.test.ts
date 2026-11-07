import fs from 'node:fs'
import path from 'node:path'

import { describe, expect, it } from 'vitest'

import { CHAPTERS, findChapter } from '@/lib/workshop'

const ROOT = path.join(process.cwd(), '..')

function markdownUnder(dir: string): string[] {
  return fs
    .readdirSync(path.join(ROOT, dir), { recursive: true, encoding: 'utf8' })
    .filter((file) => file.endsWith('.md'))
    .map((file) => path.join(dir, file))
}

describe('chapters', () => {
  it('has ten chapters numbered in order', () => {
    expect(CHAPTERS.map((chapter) => chapter.number)).toEqual([
      '01',
      '02',
      '03',
      '04',
      '05',
      '06',
      '07',
      '08',
      '09',
      '10',
    ])
  })

  it.each(CHAPTERS.map((chapter) => [chapter.slug, chapter] as const))(
    '%s has a summary, a time and the standard sections',
    (_slug, chapter) => {
      expect(chapter.summary.length).toBeGreaterThan(10)
      expect(chapter.minutes).toBeGreaterThan(0)
      expect(chapter.body).toMatch(/^## Goal$/m)
      expect(chapter.body).toMatch(/^## Check it works$/m)
      expect(chapter.body).toMatch(/^## Exercise$/m)
    },
  )

  it('links only to chapters that exist', () => {
    const slugs = new Set(CHAPTERS.map((chapter) => chapter.slug))
    for (const chapter of CHAPTERS) {
      for (const match of chapter.body.matchAll(/\]\((?:\.\/)?(\d{2}-[a-z0-9-]+)\.md\)/g)) {
        expect(slugs.has(match[1] ?? ''), `${chapter.slug} links to ${match[1]}`).toBe(true)
      }
    }
  })
})

describe('the workshop rules', () => {
  it.each(['03-install-on-windows', '04-install-on-mac'])(
    '%s moves the data folder before the first model download',
    (slug) => {
      const body = findChapter(slug)?.body ?? ''
      expect(body).toContain('App Data')
      expect(body).toContain('Change Location')
      expect(body.indexOf('Change Location')).toBeLessThan(body.indexOf('## Check it works'))
    },
  )

  it('writes the data drive as X: on Windows, and refuses the drive root', () => {
    const body = findChapter('03-install-on-windows')?.body ?? ''
    expect(body).toContain('X:\\Jan')
    expect(body).toMatch(/`X:\\` is refused/)
  })

  it('never fixes the data drive to one letter', () => {
    for (const chapter of CHAPTERS) {
      expect(chapter.body, chapter.slug).not.toMatch(/D:\\Jan/)
    }
  })

  it('writes X: drive paths only inside code, so the site can fill them in', () => {
    for (const chapter of CHAPTERS) {
      const prose = chapter.body.replace(/```[\s\S]*?```/g, '').replace(/`[^`]*`/g, '')
      expect(prose, chapter.slug).not.toMatch(/\bX:\\/)
    }
  })

  it('demos one model: Qwen3.5-2B, Q4_K_M', () => {
    const body = findChapter('05-your-first-model')?.body ?? ''
    expect(body).toContain('Qwen3.5-2B')
    expect(body).toContain('Q4_K_M')
    expect(body).toContain('1.28 GB')
    expect(body).not.toMatch(/Download.*(Jan-v3\.5-4B|Qwen3\.5-9B).*\*\*Download\*\*/)
  })

  it('covers Windows and macOS in every hands-on chapter', () => {
    for (const slug of ['02', '07', '08', '09'].map(
      (n) => CHAPTERS.find((c) => c.number === n)?.slug ?? '',
    )) {
      const body = findChapter(slug)?.body ?? ''
      expect(body, slug).toMatch(/Windows/)
      expect(body, slug).toMatch(/Mac/)
    }
  })

  const files = [...markdownUnder('workshop'), ...markdownUnder('docs'), 'README.md', 'AGENTS.md']

  it.each(files)('%s has no em dashes', (file) => {
    expect(fs.readFileSync(path.join(ROOT, file), 'utf8')).not.toContain('\u2014')
  })

  it('never promises total privacy in the chapters', () => {
    for (const chapter of CHAPTERS) {
      const claims = chapter.body
        .split('\n')
        .filter((line) => !/not say|should not|Do not quote|says it is used/i.test(line))
        .join('\n')
      expect(claims, chapter.slug).not.toMatch(/100% private|completely private|fully secure/i)
    }
  })
})
