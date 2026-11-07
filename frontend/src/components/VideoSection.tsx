'use client'

import Link from 'next/link'
import { useState } from 'react'

import { VIDEO } from '@/lib/video'

const COVERS = [
  'ChatGPT vs local AI',
  'What a model is',
  'Install Jan',
  'Data off the C: drive',
  'First chat',
  'Internet off',
  'What is private',
]

function Screen({ children }: { children: React.ReactNode }) {
  return (
    <div className="window">
      <div
        className="flex items-center gap-1.5 border-b-2 border-ink px-4 py-2.5"
        aria-hidden="true"
      >
        <span className="size-2.5 rounded-full bg-[#ff6b6b]" />
        <span className="size-2.5 rounded-full bg-sun" />
        <span className="size-2.5 rounded-full bg-mint" />
      </div>
      <div className="relative aspect-video">{children}</div>
    </div>
  )
}

function Player({ id }: { id: string }) {
  const [playing, setPlaying] = useState(false)
  if (playing) {
    return (
      <iframe
        className="absolute inset-0 size-full"
        src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
        title={VIDEO.title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    )
  }
  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      className="video-poster group absolute inset-0 flex flex-col items-center justify-center gap-4 text-white"
    >
      <span className="play-button" aria-hidden="true">
        ▶
      </span>
      <span className="text-[17px] font-semibold">Play the video</span>
      <span className="text-[12.5px] text-white/80">Loads from YouTube when you press play</span>
    </button>
  )
}

export function VideoSection() {
  return (
    <section
      aria-labelledby="video-title"
      className="grid items-center gap-8 lg:grid-cols-[1fr_1.35fr]"
    >
      <div className="flex flex-col gap-4">
        <p className="w-fit rounded-full bg-sun px-3 py-1 text-[13px] font-semibold">
          {VIDEO.id ? 'Watch first' : 'Video coming soon'}
        </p>
        <h2 id="video-title" className="font-display text-[2.6rem] leading-tight">
          Watch it once, <em>then do it with us</em>
        </h2>
        <p className="text-[16px] leading-relaxed text-ink-2">
          A short walk-through: how ChatGPT and local AI differ, what a model actually is, then the
          whole setup on a real laptop, step by step. The follow-along page matches the video, so
          you can pause and catch up.
        </p>
        <ul className="flex flex-wrap gap-2" aria-label="What the video covers">
          {COVERS.map((topic) => (
            <li
              key={topic}
              className="rounded-full border border-line-strong bg-surface px-3 py-1 text-[13px]"
            >
              {topic}
            </li>
          ))}
        </ul>
      </div>
      <Screen>
        {VIDEO.id ? (
          <Player id={VIDEO.id} />
        ) : (
          <div className="video-poster absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center text-white">
            <span className="play-button is-waiting" aria-hidden="true">
              ▶
            </span>
            <span className="font-display text-[2rem] leading-none sm:text-[2.6rem]">
              Coming soon
            </span>
            <span className="max-w-sm text-[14px] text-white/90">
              Being recorded on a real laptop. Until then, the follow-along works on its own.
            </span>
            <Link href="/follow-along" className="btn btn-mint mt-1">
              Follow along now
            </Link>
          </div>
        )}
      </Screen>
    </section>
  )
}
