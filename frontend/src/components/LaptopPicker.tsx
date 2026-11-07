'use client'

import Link from 'next/link'
import { useState } from 'react'

import { advise, DEFAULT_LAPTOP, type Laptop } from '@/lib/picker'

type Option<T> = { value: T; label: string }

function Choice<K extends keyof Laptop>({
  name,
  legend,
  options,
  laptop,
  onChange,
}: {
  name: K
  legend: string
  options: Option<Laptop[K]>[]
  laptop: Laptop
  onChange: (next: Laptop) => void
}) {
  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="mb-1 text-[13px] font-semibold text-ink">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const checked = laptop[name] === option.value
          return (
            <label
              key={String(option.value)}
              className={`cursor-pointer rounded-xl border-2 px-3 py-1.5 text-[14px] transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-accent ${
                checked
                  ? 'border-ink bg-mint font-semibold shadow-[2px_2px_0_var(--ink)]'
                  : 'border-line-strong bg-surface hover:border-ink'
              }`}
            >
              <input
                type="radio"
                name={name}
                className="sr-only"
                checked={checked}
                onChange={() => onChange({ ...laptop, [name]: option.value })}
              />
              {option.label}
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}

const TONE = {
  go: 'bg-[#e6f8ee]',
  slow: 'bg-[#fff5d6]',
  no: 'bg-[#fdeceb]',
} as const

export function LaptopPicker() {
  const [laptop, setLaptop] = useState<Laptop>(DEFAULT_LAPTOP)
  const advice = advise(laptop)
  const isMac = laptop.os === 'mac'

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
      <form className="flex flex-col gap-5" aria-label="Your laptop">
        <Choice
          name="os"
          legend="System"
          laptop={laptop}
          onChange={setLaptop}
          options={[
            { value: 'windows', label: 'Windows' },
            { value: 'mac', label: 'macOS' },
          ]}
        />
        {isMac && (
          <Choice
            name="chip"
            legend="Chip (Apple menu → About This Mac)"
            laptop={laptop}
            onChange={setLaptop}
            options={[
              { value: 'apple', label: 'Apple M1 or newer' },
              { value: 'intel', label: 'Intel' },
            ]}
          />
        )}
        <Choice
          name="memory"
          legend="Memory (RAM)"
          laptop={laptop}
          onChange={setLaptop}
          options={[
            { value: 4, label: '4 GB' },
            { value: 8, label: '8 GB' },
            { value: 16, label: '16 GB' },
            { value: 32, label: '32 GB+' },
          ]}
        />
        {!isMac && (
          <Choice
            name="gpu"
            legend="Graphics (Task Manager → Performance)"
            laptop={laptop}
            onChange={setLaptop}
            options={[
              { value: 'none', label: 'None or built-in' },
              { value: 'nvidia-6', label: 'NVIDIA 4 to 6 GB' },
              { value: 'nvidia-8', label: 'NVIDIA 8 GB+' },
            ]}
          />
        )}
        <Choice
          name="drive"
          legend={isMac ? 'Storage' : 'Drives (File Explorer → This PC)'}
          laptop={laptop}
          onChange={setLaptop}
          options={
            isMac
              ? [
                  { value: 'single', label: 'Internal only' },
                  { value: 'second', label: 'External SSD too' },
                ]
              : [
                  { value: 'second', label: 'C: and another drive' },
                  { value: 'single', label: 'Only C:' },
                ]
          }
        />
      </form>

      <output
        aria-live="polite"
        className={`flex flex-col gap-4 rounded-2xl border-2 border-ink p-5 shadow-[4px_4px_0_var(--ink)] ${TONE[advice.verdict]}`}
      >
        <span className="text-[1.15rem] font-bold tracking-[-0.01em]">{advice.headline}</span>
        {advice.start && (
          <dl className="grid gap-3 text-[14.5px]">
            <div>
              <dt className="font-mono text-[12px] text-muted uppercase">Start with</dt>
              <dd className="font-medium">{advice.start}</dd>
            </div>
            {advice.upgrade && (
              <div>
                <dt className="font-mono text-[12px] text-muted uppercase">Upgrade later</dt>
                <dd>{advice.upgrade}</dd>
              </div>
            )}
            <div>
              <dt className="font-mono text-[12px] text-muted uppercase">Your data folder</dt>
              <dd>{advice.dataFolder}</dd>
            </div>
          </dl>
        )}
        <ul className="flex list-disc flex-col gap-1 pl-5 text-[14px] text-ink-2">
          {advice.notes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
        {advice.verdict !== 'no' && (
          <Link href="/follow-along" className="btn btn-white mt-1 w-fit">
            Follow along with this laptop
          </Link>
        )}
      </output>
    </div>
  )
}
