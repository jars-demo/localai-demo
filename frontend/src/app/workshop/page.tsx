import type { Metadata } from 'next'
import Link from 'next/link'

import { CHAPTERS } from '@/lib/workshop'

export const metadata: Metadata = { title: 'Workshop' }

export default function WorkshopPage() {
  const minutes = CHAPTERS.reduce((sum, chapter) => sum + chapter.minutes, 0)
  return (
    <div className="mx-auto max-w-3xl px-4 pt-14 pb-24">
      <header className="mb-10 flex flex-col gap-3">
        <p className="font-mono text-[12px] tracking-wider text-muted uppercase">
          {CHAPTERS.length} chapters · {minutes} minutes
        </p>
        <h1 className="font-display text-[3rem] leading-[1.05]">The workshop</h1>
        <p className="text-[17px] leading-relaxed text-ink-2">
          From what local AI is to a chat that keeps working with the internet off, on Windows or
          Mac. Work through them in order; each ends with a way to check it worked.
        </p>
      </header>
      <Link
        href="/follow-along"
        className="mb-10 flex flex-col gap-1 rounded-2xl border-2 border-ink bg-mint p-5 shadow-[3px_3px_0_var(--ink)] transition-transform hover:-translate-y-0.5"
      >
        <span className="text-[16px] font-bold">Just want it running? Follow along →</span>
        <span className="text-[14.5px] text-ink-2">
          Every step from these chapters on one page, for your system and your drive, with a
          checklist.
        </span>
      </Link>
      <ol className="border-t border-line">
        {CHAPTERS.map((chapter) => (
          <li key={chapter.slug} className="border-b border-line">
            <Link
              href={`/workshop/${chapter.slug}`}
              className="flex items-start gap-4 py-5 hover:bg-surface"
            >
              <span className="w-7 shrink-0 pt-0.5 font-mono text-[13px] text-muted">
                {chapter.number}
              </span>
              <span className="flex min-w-0 flex-col gap-1">
                <span className="text-[17px] font-semibold">{chapter.title}</span>
                <span className="text-[15px] text-ink-2">{chapter.summary}</span>
              </span>
              <span className="ml-auto shrink-0 pt-1 font-mono text-[12px] text-muted">
                {chapter.minutes} min
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  )
}
