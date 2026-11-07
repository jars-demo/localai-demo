'use client'

import { useState } from 'react'

// Renders step text: **bold** and `code`. Code chips copy themselves on click.

export function CodeChip({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text)
          setCopied(true)
          window.setTimeout(() => setCopied(false), 1400)
        } catch {
          // Clipboard blocked: the text is still selectable.
        }
      }}
      title={copied ? 'Copied' : 'Click to copy'}
      className={`code-chip ${copied ? 'is-copied' : ''}`}
    >
      <code>{text}</code>
      <span aria-hidden="true" className="code-chip-icon">
        {copied ? '✓' : '⧉'}
      </span>
      <span className="sr-only" aria-live="polite">
        {copied ? 'Copied' : ''}
      </span>
    </button>
  )
}

export function Rich({ text }: { text: string }) {
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g)
  return (
    <>
      {parts.map((part, index) => {
        if (part.length > 2 && part.startsWith('`') && part.endsWith('`')) {
          return <CodeChip key={index} text={part.slice(1, -1)} />
        }
        if (part.length > 4 && part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={index} className="font-semibold text-ink">
              {part.slice(2, -2)}
            </strong>
          )
        }
        return part
      })}
    </>
  )
}
