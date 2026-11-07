'use client'

import { fillDrive } from '@/lib/setup'
import { useSetup } from '@/lib/store'

import { SetupPicker } from './SetupPicker'

/** Code in a chapter. `X:` becomes the drive the reader picked. */
export function DriveCode({ text, className }: { text: string; className?: string }) {
  const setup = useSetup()
  return <code className={className}>{fillDrive(text, setup)}</code>
}

/** Shown on chapters that use X: paths. */
export function DriveBar() {
  return (
    <aside
      aria-label="Fill in your drive"
      className="mb-8 flex flex-col gap-2 rounded-2xl border-2 border-ink bg-accent-wash p-4 shadow-[3px_3px_0_var(--ink)]"
    >
      <p className="text-[14px] leading-snug text-ink-2">
        <strong className="text-ink">X: is your data drive.</strong> Pick yours and every path on
        this page fills in.
      </p>
      <SetupPicker compact />
    </aside>
  )
}
