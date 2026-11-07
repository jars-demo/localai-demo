'use client'

import Link from 'next/link'
import { useState } from 'react'

import { dataPath, hasDataDrive } from '@/lib/setup'
import { createStore, useSetup } from '@/lib/store'
import { stepsFor, type Step } from '@/lib/steps'

import { Icon, IconTile } from './Icons'
import { CodeChip, Rich } from './Rich'
import { SetupPicker } from './SetupPicker'

const progressStore = createStore<Record<string, boolean>>('localai.progress.v1', {})

function StepCard({
  step,
  number,
  done,
  next,
  onToggle,
}: {
  step: Step
  number: number
  done: boolean
  next: boolean
  onToggle: () => void
}) {
  const [peek, setPeek] = useState(false)
  const open = !done || peek

  return (
    <li
      id={`step-${step.id}`}
      className={`step-card scroll-mt-24 ${done ? 'is-done' : ''} ${next ? 'is-next' : ''}`}
    >
      <div className="flex items-start gap-4">
        <span className="step-number" aria-hidden="true">
          {done ? '✓' : number}
        </span>
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            {next && <span className="badge bg-sun">Up next</span>}
            <span className="font-mono text-[12px] text-muted">Step {number}</span>
          </div>
          <h2 className="text-[1.25rem] leading-snug font-bold tracking-[-0.01em]">{step.title}</h2>
        </div>
        <label className={`done-toggle ${done ? 'is-on' : ''}`}>
          <input type="checkbox" className="sr-only" checked={done} onChange={onToggle} />
          <span aria-hidden="true" className="done-box">
            {done ? '✓' : ''}
          </span>
          {done ? 'Done' : 'Mark done'}
          <span className="sr-only">: {step.title}</span>
        </label>
      </div>

      {done && (
        <button
          type="button"
          onClick={() => setPeek(!peek)}
          className="mt-2 ml-14 w-fit text-[13px] text-accent underline underline-offset-4"
        >
          {peek ? 'Hide the steps' : 'Show the steps again'}
        </button>
      )}

      {open && (
        <div className="mt-4 grid gap-4 sm:ml-14">
          <div>
            <h3 className="step-label">Do this</h3>
            <ol className="flex list-decimal flex-col gap-2 pl-5 text-[15px] leading-relaxed text-ink-2 marker:font-semibold marker:text-ink">
              {step.doThis.map((line) => (
                <li key={line}>
                  <Rich text={line} />
                </li>
              ))}
            </ol>
          </div>
          <div className="rounded-xl border-2 border-dashed border-[#5cc98a] bg-[#effaf3] p-3.5">
            <h3 className="step-label text-[#1d7a46]">You should see</h3>
            <ul className="flex flex-col gap-1.5 text-[15px] text-ink-2">
              {step.see.map((line) => (
                <li key={line} className="flex gap-2">
                  <span aria-hidden="true" className="font-bold text-[#1d7a46]">
                    ✓
                  </span>
                  <span>
                    <Rich text={line} />
                  </span>
                </li>
              ))}
            </ul>
          </div>
          {step.note && (
            <p className="flex gap-2.5 rounded-xl bg-[#fff5d6] px-3.5 py-2.5 text-[14px] leading-relaxed text-ink-2">
              <Icon name="bulb" size={22} className="mt-0.5 shrink-0" />
              <span>
                <Rich text={step.note} />
              </span>
            </p>
          )}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[14px]">
            {step.fix && (
              <details className="group w-full">
                <summary className="w-fit cursor-pointer font-semibold text-fail">
                  Didn’t work?
                </summary>
                <ul className="mt-2 flex list-disc flex-col gap-1.5 pl-5 text-ink-2">
                  {step.fix.map((line) => (
                    <li key={line}>
                      <Rich text={line} />
                    </li>
                  ))}
                </ul>
              </details>
            )}
            <Link
              href={`/workshop/${step.chapter}`}
              className="text-muted underline underline-offset-4 hover:text-ink"
            >
              Why this step? Chapter {step.chapter.slice(0, 2)}
            </Link>
          </div>
        </div>
      )}
    </li>
  )
}

export function FollowAlong() {
  const setup = useSetup()
  const progress = progressStore.useValue()
  const steps = stepsFor(setup)
  const doneCount = steps.filter((step) => progress[step.id]).length
  const nextStep = steps.find((step) => !progress[step.id])
  const percent = Math.round((doneCount / steps.length) * 100)
  const needsDrive = setup.os === 'windows' && setup.drive === ''

  const toggle = (id: string) => progressStore.set({ ...progress, [id]: !progress[id] })

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[320px_1fr]">
      <aside className="flex flex-col gap-5 lg:sticky lg:top-6">
        <div className="window p-5">
          <SetupPicker />
          <div className="mt-5 flex flex-col gap-1.5 border-t-2 border-dashed border-line-strong pt-4">
            <span className="font-mono text-[11.5px] tracking-wider text-muted uppercase">
              Jan’s data folder
            </span>
            <CodeChip text={dataPath(setup)} />
            {needsDrive && (
              <span className="text-[12.5px] text-fail">Pick your drive so the paths fill in.</span>
            )}
            {setup.os === 'windows' && hasDataDrive(setup) && (
              <span className="text-[12.5px] text-muted">
                Every path below now uses {setup.drive}:.
              </span>
            )}
          </div>
        </div>

        <div className="card flex flex-col gap-3 p-5">
          <div className="flex items-baseline justify-between">
            <span className="text-[15px] font-bold">Your progress</span>
            <span className="font-mono text-[13px]" aria-live="polite">
              {doneCount} of {steps.length} done
            </span>
          </div>
          <div
            className="h-3.5 overflow-hidden rounded-full border-2 border-ink bg-surface"
            role="progressbar"
            aria-label="Steps done"
            aria-valuemin={0}
            aria-valuemax={steps.length}
            aria-valuenow={doneCount}
          >
            <div
              className="h-full bg-mint transition-[width] duration-500"
              style={{ width: `${percent}%` }}
            />
          </div>
          <ol className="hidden flex-col gap-0.5 text-[13.5px] lg:flex">
            {steps.map((step, index) => (
              <li key={step.id}>
                <a
                  href={`#step-${step.id}`}
                  className={`flex gap-2 rounded-md px-2 py-1 hover:bg-accent-wash ${
                    progress[step.id] ? 'text-muted line-through' : ''
                  } ${nextStep?.id === step.id ? 'bg-accent-wash font-semibold' : ''}`}
                >
                  <span className="w-5 font-mono">{index + 1}</span>
                  {step.title}
                </a>
              </li>
            ))}
          </ol>
          {doneCount > 0 && (
            <button
              type="button"
              onClick={() => progressStore.set({})}
              className="w-fit text-[12.5px] text-muted underline underline-offset-4 hover:text-ink"
            >
              Start over
            </button>
          )}
          <p className="text-[12px] leading-snug text-muted">
            Saved in this browser only. Nothing is sent anywhere.
          </p>
        </div>
      </aside>

      <div className="flex min-w-0 flex-col gap-5">
        <ol className="flex flex-col gap-5">
          {steps.map((step, index) => (
            <StepCard
              key={step.id}
              step={step}
              number={index + 1}
              done={Boolean(progress[step.id])}
              next={nextStep?.id === step.id}
              onToggle={() => toggle(step.id)}
            />
          ))}
        </ol>

        {doneCount === steps.length && (
          <section
            aria-label="Finished"
            className="window flex flex-col gap-3 bg-mint p-6 text-center sm:p-8"
          >
            <span className="mx-auto">
              <IconTile name="trophy" tone="sun" size={72} />
            </span>
            <h2 className="font-display text-[2.4rem] leading-tight">You run your own AI now.</h2>
            <p className="mx-auto max-w-lg text-[15.5px] leading-relaxed text-ink-2">
              It lives in a folder you chose, answers with the internet off, and you know exactly
              when it goes online. Next: try the scenarios in chapter 06, or a bigger model in
              chapter 10.
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <Link href="/workshop/06-first-chat-and-scenarios" className="btn btn-white">
                Try the scenarios
              </Link>
              <Link href="/workshop/10-jan-vs-lm-studio" className="btn btn-white">
                Bigger models
              </Link>
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
