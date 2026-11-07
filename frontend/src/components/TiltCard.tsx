'use client'

import { useRef, type ReactNode } from 'react'

// A light 3D tilt: the card leans toward the mouse and a soft sheen follows it.
// Mouse only, and off for people who prefer reduced motion. It never moves out of place.

export function TiltCard({
  children,
  className = '',
  max = 7,
  perspective = 1100,
  radius = '1.2rem',
}: {
  children: ReactNode
  className?: string
  /** Largest tilt in degrees. Big blocks want a small number. */
  max?: number
  /** Distance of the viewer in px. Bigger is flatter. */
  perspective?: number
  /** Corner radius of the sheen, to match the card. */
  radius?: string
}) {
  const card = useRef<HTMLDivElement>(null)
  const frame = useRef(0)

  function still() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }

  function onMove(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== 'mouse' || still()) return
    const el = card.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width
    const py = (event.clientY - rect.top) / rect.height
    cancelAnimationFrame(frame.current)
    frame.current = requestAnimationFrame(() => {
      el.style.setProperty('--tilt-x', `${(0.5 - py) * max * 2}deg`)
      el.style.setProperty('--tilt-y', `${(px - 0.5) * max * 2}deg`)
      el.style.setProperty('--sheen-x', `${px * 100}%`)
      el.style.setProperty('--sheen-y', `${py * 100}%`)
      el.dataset.tilting = 'true'
    })
  }

  function onLeave() {
    const el = card.current
    if (!el) return
    cancelAnimationFrame(frame.current)
    el.style.setProperty('--tilt-x', '0deg')
    el.style.setProperty('--tilt-y', '0deg')
    delete el.dataset.tilting
  }

  return (
    <div
      className={`tilt-stage ${className}`}
      style={{ perspective }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      <div ref={card} className="tilt-card">
        {children}
        <span className="tilt-sheen" style={{ borderRadius: radius }} aria-hidden="true" />
      </div>
    </div>
  )
}
