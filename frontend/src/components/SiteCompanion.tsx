'use client'

import { useEffect, useRef, useState } from 'react'

import { type CompanionAnswer, DOT_ANSWERS, DOT_GREETING } from '@/companion/answers'
import { VIDEO } from '@/lib/video'

import { Icon } from './Icons'
import { Mark } from './Mark'

// Dot, the help companion: the site's logo in the bottom-left corner. Tap it for quick answers.
// Answers are fixed text from the chapters, so it never makes anything up and sends nothing anywhere.

export function SiteCompanion() {
  const [open, setOpen] = useState(false)
  const [answer, setAnswer] = useState<CompanionAnswer | null>(null)
  const button = useRef<HTMLButtonElement>(null)
  const panel = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        button.current?.focus()
      }
    }
    const onPointer = (event: PointerEvent) => {
      const target = event.target as Node
      if (!panel.current?.contains(target) && !button.current?.contains(target)) setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('pointerdown', onPointer)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('pointerdown', onPointer)
    }
  }, [open])

  return (
    <div className="fixed bottom-4 left-4 z-40 print:hidden">
      {open && (
        <div
          ref={panel}
          role="dialog"
          aria-label="Ask Dot"
          className="absolute bottom-full left-0 mb-3 flex max-h-[min(72vh,36rem)] w-[min(21rem,calc(100vw-2rem))] flex-col gap-3 overflow-y-auto rounded-[20px] border-2 border-ink bg-surface p-4 shadow-[5px_5px_0_var(--ink)]"
        >
          <div className="flex items-start justify-between gap-3">
            <p className="flex items-center gap-2 text-[15px] leading-snug font-semibold">
              <Mark size={26} />
              {DOT_GREETING}
            </p>
            <button
              type="button"
              aria-label="Close"
              onClick={() => setOpen(false)}
              className="grid size-8 shrink-0 place-items-center rounded-full text-muted hover:bg-canvas hover:text-ink"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="m4 4 8 8m0-8-8 8"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
          {answer && (
            <div
              aria-live="polite"
              className="flex flex-col gap-2.5 rounded-2xl border-2 border-ink bg-accent-wash p-3 text-[14px] leading-relaxed text-ink"
            >
              <p>{answer.answer}</p>
              {answer.link && (
                <a
                  href={answer.link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={answer.link.tooltip}
                  className="flex w-fit items-center gap-2 rounded-full border-2 border-ink bg-surface py-1 pr-3.5 pl-1.5 text-[13px] font-semibold shadow-[2px_2px_0_var(--ink)] transition-transform hover:-translate-y-0.5"
                >
                  <Icon name="youtube" size={26} />
                  {answer.link.label}
                </a>
              )}
            </div>
          )}
          <ul className="flex flex-wrap gap-1.5">
            {DOT_ANSWERS.map((item) => (
              <li key={item.question}>
                <button
                  type="button"
                  onClick={() => setAnswer(item)}
                  className={`rounded-full border px-3 py-1.5 text-left text-[13px] transition-colors ${
                    answer === item
                      ? 'border-ink bg-mint font-semibold'
                      : 'border-line-strong bg-surface hover:border-ink'
                  }`}
                >
                  {item.question}
                </button>
              </li>
            ))}
          </ul>
          <p className="text-[11.5px] text-muted">
            Ready-made answers. Nothing you ask is sent anywhere.
          </p>
        </div>
      )}
      {VIDEO.id && !open && (
        <a
          href={`https://youtu.be/${VIDEO.id}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Watch the video here (YouTube, opens in a new tab)"
          className="group absolute bottom-full left-[5px] mb-3 grid size-[42px] place-items-center rounded-full border-2 border-ink bg-surface shadow-[3px_3px_0_var(--ink)] transition-transform hover:-translate-y-0.5"
        >
          <Icon name="youtube" size={28} />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-full ml-3 -translate-y-1/2 rounded-full border-2 border-ink bg-sun px-3 py-1 text-[13px] font-semibold whitespace-nowrap opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
          >
            Watch the video here
          </span>
        </a>
      )}
      <button
        ref={button}
        type="button"
        aria-expanded={open}
        aria-label="Ask Dot, the help companion"
        title="Need help? Ask Dot"
        onClick={() => {
          setOpen(!open)
          setAnswer(null)
        }}
        className="block rounded-[14px] drop-shadow-[3px_3px_0_var(--ink)] transition-transform hover:-translate-y-0.5 active:translate-y-0.5"
      >
        <Mark size={52} />
      </button>
    </div>
  )
}
