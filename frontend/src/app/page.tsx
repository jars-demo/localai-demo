import type { Metadata } from 'next'
import Link from 'next/link'

import { CloudOrLocal } from '@/components/CloudOrLocal'
import { Faq } from '@/components/Faq'
import { Icon, IconTile, type IconName, type Tone } from '@/components/Icons'
import { LaptopPicker } from '@/components/LaptopPicker'
import { ModelExplainer } from '@/components/ModelExplainer'
import { REPO_URL } from '@/components/Shell'
import { JsonLd } from '@/components/JsonLd'
import { TiltCard } from '@/components/TiltCard'
import { VideoSection } from '@/components/VideoSection'
import {
  absolute,
  AUTHOR_LD,
  pageMeta,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_URL,
} from '@/lib/seo'
import { CHAPTERS } from '@/lib/workshop'

export const metadata: Metadata = {
  ...pageMeta({ title: `${SITE_NAME}: ${SITE_TAGLINE}`, description: SITE_DESCRIPTION, path: '/' }),
  title: { absolute: `${SITE_NAME}: ${SITE_TAGLINE}` },
}

const SITE_LD = {
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      inLanguage: 'en-IN',
      author: { '@id': `${SITE_URL}/#author` },
      publisher: { '@id': `${SITE_URL}/#author` },
    },
    AUTHOR_LD,
    {
      '@type': 'Course',
      '@id': `${SITE_URL}/#course`,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      url: SITE_URL,
      inLanguage: 'en',
      isAccessibleForFree: true,
      educationalLevel: 'Beginner',
      teaches: [
        'What local AI is and how it differs from ChatGPT',
        'Installing Jan on Windows or Mac',
        'Keeping AI data off the system drive',
        'Running a small language model offline',
        'What a local AI app sends over the internet',
      ],
      provider: { '@id': `${SITE_URL}/#author` },
      author: { '@id': `${SITE_URL}/#author` },
      hasCourseInstance: {
        '@type': 'CourseInstance',
        courseMode: 'online',
        courseWorkload: 'PT1H',
      },
      offers: { '@type': 'Offer', price: 0, priceCurrency: 'INR', category: 'Free' },
      hasPart: CHAPTERS.map((chapter) => ({
        '@type': 'LearningResource',
        name: chapter.title,
        url: absolute(`/workshop/${chapter.slug}`),
        timeRequired: `PT${chapter.minutes}M`,
      })),
    },
  ],
}

const TOPICS = ['No code', 'Windows', 'macOS', 'Offline', 'Qwen3.5-2B', 'Privacy']

const JOURNEY = [
  ['01', 'Install Jan', 'Free, open source, about 10 minutes.'],
  [
    '02',
    'Move its data off C:',
    'To a folder on D:, E:, F:, any drive that is not your system drive.',
  ],
  ['03', 'Download one small model', 'Qwen3.5-2B, 1.28 GB. Runs on 8 GB laptops.'],
  ['04', 'Chat with the internet off', 'Airplane mode on. It still answers.'],
]

const SCENARIOS: {
  icon: IconName
  tone: Tone
  who: string
  what: string
  tryThis: string
}[] = [
  {
    icon: 'book',
    tone: 'sun',
    who: 'Student',
    what: 'Quiz yourself on a chapter the night before, with no data pack.',
    tryThis: 'Quiz me with 5 questions on photosynthesis.',
  },
  {
    icon: 'briefcase',
    tone: 'sky',
    who: 'Job hunter',
    what: 'Practise interview questions without sharing your CV with a company.',
    tryThis: 'Give me 5 likely questions for a data analyst internship.',
  },
  {
    icon: 'envelope',
    tone: 'rose',
    who: 'Office worker',
    what: 'Rewrite a touchy email without pasting it into a cloud tool.',
    tryThis: 'Rewrite this email to sound polite but firm.',
  },
  {
    icon: 'shop',
    tone: 'mint',
    who: 'Small business',
    what: 'Draft offers and replies on the shop laptop, free, every day.',
    tryThis: 'Write a WhatsApp message for our Diwali offer, under 50 words.',
  },
  {
    icon: 'code',
    tone: 'stone',
    who: 'Developer',
    what: 'Explain an error, or build on a local API with no key.',
    tryThis: 'Explain this error and suggest a fix.',
  },
  {
    icon: 'usb',
    tone: 'sky',
    who: 'Workshop room',
    what: 'Fifty laptops, bad Wi-Fi, one model on a pen drive.',
    tryThis: 'One download, copied to every laptop.',
  },
]

function Clouds() {
  // Soft clouds along the bottom of the sky band. Decoration only.
  return (
    <svg
      className="pointer-events-none absolute right-0 bottom-0 left-0 h-16 w-full sm:h-20"
      viewBox="0 0 1000 80"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M0 80V52c40-18 80-18 110 0 20-26 70-30 96-6 30-24 84-22 104 8 34-18 74-14 96 6 24-22 72-26 100 0 30-20 80-20 104 4 28-24 82-24 106 2 36-18 80-16 104 6 26-20 74-22 98 0 26-14 56-14 82 0V80Z"
        fill="#ffffff"
        fillOpacity="0.35"
      />
      <path
        d="M0 80V64c36-12 72-12 100 2 26-18 68-18 92 4 30-16 70-14 94 6 28-16 66-14 90 6 30-18 76-18 100 2 28-16 70-16 96 4 26-16 70-16 94 2 30-14 70-14 96 4 28-14 64-14 90 2 22-10 46-10 68-2V80Z"
        fill="#f2f0eb"
      />
    </svg>
  )
}

function SectionTitle({
  id,
  kicker,
  children,
  lead,
}: {
  id: string
  kicker?: string
  children: React.ReactNode
  lead?: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-3">
      {kicker && (
        <p className="font-mono text-[12px] tracking-wider text-muted uppercase">{kicker}</p>
      )}
      <h2 id={id} className="font-display text-[2.6rem] leading-tight">
        {children}
      </h2>
      {lead && <p className="max-w-2xl text-[16px] leading-relaxed text-ink-2">{lead}</p>}
    </div>
  )
}

export default function Home() {
  return (
    <div className="flex flex-col gap-24 pb-24">
      <JsonLd data={SITE_LD} />
      <section className="mx-auto w-full max-w-6xl px-3 pt-4 sm:px-4">
        <TiltCard max={2.5} perspective={2400} radius="28px">
          <div className="relative overflow-hidden rounded-[28px] bg-sky px-5 pt-12 pb-24 text-white sm:px-10 sm:pt-16 sm:pb-28">
            <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
              <div className="flex min-w-0 flex-col gap-6">
                <p className="w-fit rounded-full bg-white/15 px-3 py-1 font-mono text-[12px] tracking-wider uppercase">
                  Free hands-on workshop · about an hour
                </p>
                <h1 className="font-display text-[3.2rem] leading-[0.98] text-balance sm:text-[4.6rem]">
                  Your own private ChatGPT.
                </h1>
                <p className="max-w-xl text-[18px] leading-relaxed text-white/95">
                  Run a ChatGPT-style AI on your own laptop. No subscription, no API key, no
                  account. Keep its chats on a drive you chose, switch the internet off and keep
                  chatting.
                </p>
                <ul className="flex flex-wrap gap-2" aria-label="Topics">
                  {TOPICS.map((topic) => (
                    <li
                      key={topic}
                      className="rounded-full border border-white/40 px-3 py-1 text-[13px] font-medium"
                    >
                      {topic}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-4 pt-2">
                  <Link href="/follow-along" className="btn btn-mint">
                    Follow along, step by step
                  </Link>
                  <a href="#laptop" className="btn btn-white">
                    Will my laptop run it?
                  </a>
                </div>
              </div>

              <TiltCard className="min-w-0">
                <figure className="window text-ink">
                  <figcaption className="flex items-center justify-between gap-3 border-b-2 border-ink px-4 py-2.5 font-mono text-[12px]">
                    <span className="flex items-center gap-1.5" aria-hidden="true">
                      <span className="size-2.5 rounded-full bg-[#ff6b6b]" />
                      <span className="size-2.5 rounded-full bg-sun" />
                      <span className="size-2.5 rounded-full bg-mint" />
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Icon name="plane" size={16} />
                      Airplane mode on · Qwen3.5-2B
                    </span>
                    <span className="text-muted">illustration</span>
                  </figcaption>
                  <div className="flex flex-col gap-3 px-4 py-5 text-[14.5px] leading-relaxed">
                    <p className="ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-accent px-3.5 py-2 text-white">
                      Explain compound interest with an example in rupees.
                    </p>
                    <p className="max-w-[92%] rounded-2xl rounded-bl-md bg-canvas px-3.5 py-2">
                      Put ₹10,000 in at 8% a year. After one year you have ₹10,800. In year two you
                      earn 8% on ₹10,800, not on ₹10,000, so you end at ₹11,664. Interest earning
                      interest: that is compounding.
                    </p>
                    <p className="font-mono text-[12px] text-muted">
                      No internet. Answered on this laptop. Saved on the drive you chose.
                    </p>
                  </div>
                </figure>
              </TiltCard>
            </div>
            <Clouds />
          </div>
        </TiltCard>
      </section>

      <div className="mx-auto flex w-full max-w-5xl flex-col gap-28 px-4">
        <VideoSection />

        <section aria-labelledby="sides" className="flex flex-col gap-6">
          <SectionTitle
            id="sides"
            kicker="The idea"
            lead="Cloud AI cooks your order in someone else’s kitchen. Local AI cooks it in yours. The kitchen is smaller, but nobody else sees what you made. Flip between them."
          >
            Restaurant or <em>home kitchen</em>
          </SectionTitle>
          <CloudOrLocal />
        </section>

        <section aria-labelledby="model" className="flex flex-col gap-6">
          <SectionTitle
            id="model"
            kicker="How it works"
            lead="No magic and no internet. Here is what happens on your laptop when you press send."
          >
            What a model <em>actually is</em>
          </SectionTitle>
          <ModelExplainer />
        </section>

        <section
          aria-labelledby="laptop-title"
          id="laptop"
          className="flex scroll-mt-6 flex-col gap-6"
        >
          <SectionTitle
            id="laptop-title"
            kicker="Check first"
            lead={
              <>
                Pick what you have. Everything runs in your browser; nothing is sent anywhere.
                Details in{' '}
                <Link
                  href="/workshop/02-will-my-laptop-run-it"
                  className="text-accent underline underline-offset-4"
                >
                  chapter 02
                </Link>
                .
              </>
            }
          >
            Will my laptop <em>run it?</em>
          </SectionTitle>
          <div className="tiles">
            <div className="card p-5 sm:p-7">
              <LaptopPicker />
            </div>
          </div>
        </section>

        <section aria-labelledby="journey" className="flex flex-col gap-6">
          <SectionTitle
            id="journey"
            kicker="Hands-on"
            lead="One page, every step in order, for your system and your drive. Tick each one off. When the last box is ticked, the AI is running on your laptop."
          >
            Four stops to <em>your own AI</em>
          </SectionTitle>
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {JOURNEY.map(([number, title, body], index) => (
              <li
                key={title}
                className={`flex flex-col gap-1.5 rounded-2xl border-2 border-ink p-5 shadow-[3px_3px_0_var(--ink)] ${
                  index === 1 ? 'bg-sun' : 'bg-surface'
                }`}
              >
                <span className="font-display text-[2.6rem] leading-none text-accent">
                  {number}
                </span>
                <span className="text-[16px] font-bold">{title}</span>
                <span className="text-[14.5px] text-ink-2">{body}</span>
              </li>
            ))}
          </ol>
          <p className="text-[14.5px] leading-relaxed text-ink-2">
            <strong className="text-ink">The one rule:</strong> move Jan’s data off the system drive
            right after setup, before the first download. A Windows reset usually wipes C:, and
            models fill it up fast. Only one drive? Keep the default or use an external SSD.
          </p>
          <Link href="/follow-along" className="btn btn-mint w-fit">
            Start following along
          </Link>
        </section>

        <section aria-labelledby="scenarios" className="flex flex-col gap-6">
          <SectionTitle
            id="scenarios"
            kicker="Why bother"
            lead="Where it does not help: recent news, exact sums, and anything medical or legal. Chapter 06 shows it failing on purpose."
          >
            Where a small local model <em>helps</em>
          </SectionTitle>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SCENARIOS.map((scenario) => (
              <div key={scenario.who} className="card flex flex-col gap-3 p-5">
                <IconTile name={scenario.icon} tone={scenario.tone} />
                <span className="pt-1 text-[16px] font-bold">{scenario.who}</span>
                <span className="text-[14.5px] text-ink-2">{scenario.what}</span>
                <span className="mt-auto w-fit max-w-full rounded-2xl rounded-bl-md bg-canvas px-3 py-2 font-mono text-[12px] leading-snug text-ink-2">
                  {scenario.tryThis}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="faq" className="flex flex-col gap-6">
          <SectionTitle id="faq" kicker="Before you start">
            Questions people <em>ask first</em>
          </SectionTitle>
          <Faq />
        </section>

        <section aria-labelledby="chapters" className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div className="flex flex-col gap-3">
            <p className="font-mono text-[12px] tracking-wider text-muted uppercase">Go deeper</p>
            <h2 id="chapters" className="font-display text-[2.6rem] leading-tight">
              {CHAPTERS.length} short <em>chapters</em>
            </h2>
            <p className="text-[16px] leading-relaxed text-ink-2">
              The why behind every step: privacy, what to do when it breaks, and Jan vs LM Studio. A
              few minutes each, Windows and Mac side by side. Nothing to code.
            </p>
            <a href={REPO_URL} className="text-[15px] text-accent underline underline-offset-4">
              Read them on GitHub
            </a>
          </div>
          <ol className="card overflow-hidden">
            {CHAPTERS.map((chapter) => (
              <li key={chapter.slug} className="border-b border-line last:border-b-0">
                <Link
                  href={`/workshop/${chapter.slug}`}
                  className="flex items-center gap-4 px-5 py-3.5 hover:bg-accent-wash"
                >
                  <span className="w-9 shrink-0 font-display text-[1.6rem] leading-none text-accent">
                    {chapter.number}
                  </span>
                  <span className="min-w-0 flex-1 text-[15px] font-semibold">{chapter.title}</span>
                  <span className="shrink-0 font-mono text-[12px] text-muted">
                    {chapter.minutes} min
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </div>
  )
}
