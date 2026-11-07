'use client'

import { DRIVE_LETTERS, setupStore, useSetup, type Setup } from '@/lib/setup'

type Option = { label: string; active: boolean; pick: () => void }

function Chips({ legend, options, hint }: { legend: string; options: Option[]; hint?: string }) {
  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="mb-1 text-[13px] font-semibold text-ink">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <label
            key={option.label}
            className={`chip ${option.active ? 'is-on' : ''} has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-accent`}
          >
            <input
              type="radio"
              name={legend}
              className="sr-only"
              checked={option.active}
              onChange={option.pick}
            />
            {option.label}
          </label>
        ))}
      </div>
      {hint && <p className="text-[12.5px] leading-snug text-muted">{hint}</p>}
    </fieldset>
  )
}

/** System and data drive. Shared by the follow-along page and the chapters. */
export function SetupPicker({ compact = false }: { compact?: boolean }) {
  const setup = useSetup()
  const update = (patch: Partial<Setup>) => setupStore.set({ ...setup, ...patch })

  const drive =
    setup.os === 'windows' ? (
      <Chips
        legend="Your data drive"
        hint={
          compact
            ? undefined
            : 'File Explorer → This PC shows your drives. Any drive that is not C: works.'
        }
        options={[
          ...DRIVE_LETTERS.map((letter) => ({
            label: `${letter}:`,
            active: setup.drive === letter,
            pick: () => update({ drive: letter }),
          })),
          { label: 'Only C:', active: setup.drive === 'C', pick: () => update({ drive: 'C' }) },
        ]}
      />
    ) : (
      <Chips
        legend="Where Jan’s data lives"
        hint={compact ? undefined : 'Most Macs have one internal drive. The default is fine.'}
        options={[
          {
            label: 'Internal (default)',
            active: setup.mac === 'default',
            pick: () => update({ mac: 'default' }),
          },
          {
            label: 'External SSD',
            active: setup.mac === 'ssd',
            pick: () => update({ mac: 'ssd' }),
          },
        ]}
      />
    )

  return (
    <form
      aria-label="Your setup"
      className="flex flex-col gap-4"
      onSubmit={(e) => e.preventDefault()}
    >
      <Chips
        legend="Your system"
        options={[
          {
            label: 'Windows',
            active: setup.os === 'windows',
            pick: () => update({ os: 'windows' }),
          },
          { label: 'macOS', active: setup.os === 'mac', pick: () => update({ os: 'mac' }) },
        ]}
      />
      {drive}
    </form>
  )
}
