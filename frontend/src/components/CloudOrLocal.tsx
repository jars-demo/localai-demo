'use client'

import { useState } from 'react'

import { Icon, type IconName } from './Icons'

type Side = 'cloud' | 'local'

const SIDES = {
  cloud: {
    tab: 'Cloud AI',
    icon: 'cloud' as IconName,
    tag: 'ChatGPT, Gemini, Claude',
    line: 'Your message travels over the internet to the AI company’s computers. The answer travels back.',
    path: [
      ['laptop', 'Your laptop'],
      ['globe', 'The internet'],
      ['server', 'A data centre'],
    ],
    rows: [
      ['Where the thinking happens', 'in a data centre'],
      ['Works without internet', 'no'],
      ['Who can see your messages', 'the AI company'],
      ['Cost', 'free with limits, or a subscription'],
      ['How clever', 'very'],
    ],
  },
  local: {
    tab: 'Local AI',
    icon: 'house' as IconName,
    tag: 'Jan + one model file on your laptop',
    line: 'The model is a file on your drive. Jan loads it into your memory, and your own processor writes the answer.',
    path: [
      ['laptop', 'Your laptop'],
      ['ram', 'Model in your RAM'],
    ],
    rows: [
      ['Where the thinking happens', 'on your laptop'],
      ['Works without internet', 'yes, after setup'],
      ['Who can see your messages', 'whoever can open your laptop'],
      ['Cost', 'free'],
      ['How clever', 'less: the model is small'],
    ],
  },
} as const

export function CloudOrLocal() {
  const [side, setSide] = useState<Side>('local')
  const current = SIDES[side]

  return (
    <div className="window">
      <div role="tablist" aria-label="Cloud or local" className="flex border-b-2 border-ink">
        {(Object.keys(SIDES) as Side[]).map((key) => (
          <button
            key={key}
            type="button"
            role="tab"
            id={`tab-${key}`}
            aria-selected={side === key}
            aria-controls="side-panel"
            onClick={() => setSide(key)}
            className={`flex-1 px-4 py-3 text-[15px] font-semibold transition-colors first:border-r-2 first:border-ink ${
              side === key ? 'bg-sun' : 'bg-surface text-ink-2 hover:bg-canvas'
            }`}
          >
            <span className="inline-flex items-center justify-center gap-2">
              <Icon name={SIDES[key].icon} size={24} />
              {SIDES[key].tab}
            </span>
          </button>
        ))}
      </div>
      <div
        id="side-panel"
        role="tabpanel"
        aria-labelledby={`tab-${side}`}
        className="grid gap-6 p-5 sm:p-7"
      >
        <div className="flex flex-col gap-1">
          <span className="font-mono text-[12px] tracking-wider text-muted uppercase">
            {current.tag}
          </span>
          <p className="text-[16px] leading-relaxed text-ink-2">{current.line}</p>
        </div>

        <div className="flow" key={side} aria-hidden="true">
          {current.path.map(([icon, label], index) => (
            <div key={label} className="contents">
              {index > 0 && (
                <span className={`flow-wire ${side === 'cloud' ? 'is-far' : ''}`}>
                  <span className="flow-dot" />
                </span>
              )}
              <span className="flow-node">
                <Icon name={icon as IconName} size={36} />
                <span className="text-[12.5px] font-semibold">{label}</span>
              </span>
            </div>
          ))}
        </div>

        <dl className="grid gap-x-8 gap-y-2 text-[14.5px] sm:grid-cols-2">
          {current.rows.map(([label, value]) => (
            <div key={label} className="flex justify-between gap-4 border-t border-line pt-2">
              <dt className="text-ink-2">{label}</dt>
              <dd className="text-right font-semibold">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}
