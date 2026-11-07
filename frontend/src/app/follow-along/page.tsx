import type { Metadata } from 'next'
import Link from 'next/link'

import { FollowAlong } from '@/components/FollowAlong'
import { JsonLd } from '@/components/JsonLd'
import { absolute, AUTHOR_LD, pageMeta } from '@/lib/seo'
import { stepsFor } from '@/lib/steps'

const TITLE = 'Follow along: set up your own local AI, step by step'
const DESCRIPTION =
  'Every step to run your own AI on Windows or Mac, on one page: install Jan, move its data off the system drive, download one small model, and chat with the internet off. Pick your drive and every path fills in.'

export const metadata: Metadata = pageMeta({
  title: TITLE,
  description: DESCRIPTION,
  path: '/follow-along',
})

const plain = (text: string) => text.replace(/\*\*|`/g, '')

const HOWTO_LD = {
  '@type': 'HowTo',
  name: 'Set up your own private ChatGPT on your laptop',
  description: DESCRIPTION,
  url: absolute('/follow-along'),
  totalTime: 'PT1H',
  estimatedCost: { '@type': 'MonetaryAmount', currency: 'INR', value: 0 },
  tool: [{ '@type': 'HowToTool', name: 'Jan (free, open source)' }],
  supply: [{ '@type': 'HowToSupply', name: 'Qwen3.5-2B, Q4_K_M (1.28 GB)' }],
  author: AUTHOR_LD,
  step: stepsFor({ os: 'windows', drive: 'D', mac: 'default' }).map((step) => ({
    '@type': 'HowToStep',
    name: step.title,
    url: absolute(`/follow-along#step-${step.id}`),
    text: step.doThis.map(plain).join(' '),
  })),
}

export default function FollowAlongPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-10 pb-24">
      <JsonLd data={HOWTO_LD} />
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
