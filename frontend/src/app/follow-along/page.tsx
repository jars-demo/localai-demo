import type { Metadata } from 'next'
import Link from 'next/link'

import { FollowAlong } from '@/components/FollowAlong'

export const metadata: Metadata = {
  title: 'Follow along',
  description:
    'Every step to run your own AI on Windows or Mac, in order: install Jan, move its data off the system drive, download one small model, and chat with the internet off.',
}

export default function FollowAlongPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-10 pb-24">
      <header className="mb-10 flex max-w-3xl flex-col gap-4">
        <p className="w-fit rounded-full bg-sun px-3 py-1 text-[13px] font-semibold">
          Hands-on · about an hour
        </p>
        <h1 className="font-display text-[3rem] leading-[1.02] text-balance sm:text-[3.8rem]">
          Follow along. <em>Finish with your own AI.</em>
        </h1>
        <p className="text-[17px] leading-relaxed text-ink-2">
          Pick your system and the drive for Jan’s data. Every step and path below changes to match.
          Do each step, check you see what it says, tick it off. No code, and nothing to sign up
          for. Want the reasons behind a step? Each one links to its{' '}
          <Link href="/workshop" className="text-accent underline underline-offset-4">
            chapter
          </Link>
          .
        </p>
      </header>
      <FollowAlong />
    </div>
  )
}
