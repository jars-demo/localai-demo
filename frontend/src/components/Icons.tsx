// Hand-drawn icons in the site's sticker style: ink outlines, flat palette fills, no emoji.
// Each icon is a 40 x 40 drawing. `IconTile` puts one on a coloured tile with an offset shadow.

import type { ReactNode } from 'react'

const INK = '#17181c'
const SKY = '#2f74cc'
const MINT = '#8be3ae'
const SUN = '#ffd667'
const ROSE = '#ff9b9b'
const WHITE = '#ffffff'

const line = {
  stroke: INK,
  strokeWidth: 2.2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

const DRAWINGS = {
  book: (
    <>
      <path d="M20 11c-4-3-9-3.5-14-2v21c5-1.5 10-1 14 2Z" fill={WHITE} {...line} />
      <path d="M20 11c4-3 9-3.5 14-2v21c-5-1.5-10-1-14 2Z" fill={SUN} {...line} />
      <path d="M10 15c2.5-.5 4.5-.2 6.5.8M10 20c2.5-.5 4.5-.2 6.5.8" fill="none" {...line} />
    </>
  ),
  briefcase: (
    <>
      <path d="M15 13v-3a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v3" fill="none" {...line} />
      <rect x="5" y="13" width="30" height="20" rx="3.5" fill={SUN} {...line} />
      <path d="M5 21.5h30" fill="none" {...line} />
      <rect x="17.5" y="19" width="5" height="5" rx="1.2" fill={WHITE} {...line} />
    </>
  ),
  envelope: (
    <>
      <rect x="5" y="10" width="30" height="21" rx="3.5" fill={WHITE} {...line} />
      <path d="m6.5 12.5 13.5 10 13.5-10" fill="none" {...line} />
      <circle cx="30" cy="10" r="4" fill={ROSE} {...line} />
    </>
  ),
  shop: (
    <>
      <rect x="8" y="17" width="24" height="17" rx="1.5" fill={WHITE} {...line} />
      <path
        d="M6 10h28l1 5a3.5 3.5 0 0 1-7 0 3.5 3.5 0 0 1-7 0 3.5 3.5 0 0 1-7 0 3.5 3.5 0 0 1-7 0Z"
        fill={ROSE}
        {...line}
      />
      <rect x="17" y="24" width="6" height="10" rx="1" fill={SUN} {...line} />
    </>
  ),
  code: (
    <>
      <rect x="5" y="7" width="30" height="26" rx="3.5" fill={WHITE} {...line} />
      <path d="M5 13.5h30" fill="none" {...line} />
      <path d="m15 19-4 4 4 4M25 19l4 4-4 4M21.5 18l-3 10" fill="none" {...line} />
      <circle cx="9.5" cy="10.3" r="1" fill={INK} />
    </>
  ),
  usb: (
    <>
      <rect x="15" y="4" width="10" height="8" rx="1" fill={WHITE} {...line} />
      <path d="M18 7.5h.01M22 7.5h.01" fill="none" {...line} strokeWidth={2.6} />
      <rect x="11" y="12" width="18" height="24" rx="4" fill={SKY} {...line} />
      <rect x="15.5" y="18" width="9" height="9" rx="2" fill={MINT} {...line} />
    </>
  ),
  cloud: (
    <path
      d="M12 30h17.5a7 7 0 0 0 .8-14A9.5 9.5 0 0 0 12.4 14 8 8 0 0 0 12 30Z"
      fill={WHITE}
      {...line}
    />
  ),
  house: (
    <>
      <path d="M9 17v16h22V17" fill={SUN} {...line} />
      <path d="M5 19 20 6l15 13" fill="none" {...line} />
      <rect x="17" y="24" width="6" height="9" rx="1" fill={WHITE} {...line} />
    </>
  ),
  laptop: (
    <>
      <rect x="8" y="8" width="24" height="17" rx="2.5" fill={SKY} {...line} />
      <path d="M3.5 29h33l-2.5 4h-28Z" fill={WHITE} {...line} />
      <path d="M14 17h7" fill="none" {...line} stroke={WHITE} />
    </>
  ),
  globe: (
    <>
      <circle cx="20" cy="20" r="13.5" fill={WHITE} {...line} />
      <ellipse cx="20" cy="20" rx="6" ry="13.5" fill="none" {...line} />
      <path d="M6.5 20h27M9 13h22M9 27h22" fill="none" {...line} />
    </>
  ),
  server: (
    <>
      <rect x="8" y="5" width="24" height="9" rx="2" fill={WHITE} {...line} />
      <rect x="8" y="15.5" width="24" height="9" rx="2" fill={WHITE} {...line} />
      <rect x="8" y="26" width="24" height="9" rx="2" fill={WHITE} {...line} />
      <circle cx="13" cy="9.5" r="1.6" fill={ROSE} />
      <circle cx="13" cy="20" r="1.6" fill={ROSE} />
      <circle cx="13" cy="30.5" r="1.6" fill={ROSE} />
      <path d="M19 9.5h8M19 20h8M19 30.5h8" fill="none" {...line} />
    </>
  ),
  ram: (
    <>
      <path d="M4 13h32v13H23l-1.5 2h-3L17 26H4Z" fill={MINT} {...line} />
      <rect x="8" y="16" width="5" height="7" rx="1" fill={WHITE} {...line} />
      <rect x="17.5" y="16" width="5" height="7" rx="1" fill={WHITE} {...line} />
      <rect x="27" y="16" width="5" height="7" rx="1" fill={WHITE} {...line} />
      <path d="M8 30v3M12 30v3M28 30v3M32 30v3" fill="none" {...line} />
    </>
  ),
  chip: (
    <>
      <path
        d="M16 5v5M20 5v5M24 5v5M16 30v5M20 30v5M24 30v5M5 16h5M5 20h5M5 24h5M30 16h5M30 20h5M30 24h5"
        fill="none"
        {...line}
      />
      <rect x="10" y="10" width="20" height="20" rx="3.5" fill={SUN} {...line} />
      <rect x="15.5" y="15.5" width="9" height="9" rx="1.5" fill={WHITE} {...line} />
    </>
  ),
  file: (
    <>
      <path d="M10 4.5h14l7 7v24H10Z" fill={WHITE} {...line} />
      <path d="M24 4.5v7h7" fill="none" {...line} />
      <rect x="13.5" y="19" width="14" height="8" rx="2" fill={SKY} {...line} />
    </>
  ),
  chat: (
    <>
      <path
        d="M7.5 8h25a3 3 0 0 1 3 3v13a3 3 0 0 1-3 3H18l-7 6v-6H7.5a3 3 0 0 1-3-3V11a3 3 0 0 1 3-3Z"
        fill={WHITE}
        {...line}
      />
      <circle cx="13.5" cy="17.5" r="1.8" fill={INK} />
      <circle cx="20" cy="17.5" r="1.8" fill={INK} />
      <circle cx="26.5" cy="17.5" r="1.8" fill={MINT} {...line} strokeWidth={1.2} />
    </>
  ),
  bulb: (
    <>
      <path
        d="M20 5a10.5 10.5 0 0 0-6.2 19c.8.6 1.2 1.5 1.2 2.5V28h10v-1.5c0-1 .4-1.9 1.2-2.5A10.5 10.5 0 0 0 20 5Z"
        fill={SUN}
        {...line}
      />
      <path d="M15.5 32h9M17 35.5h6" fill="none" {...line} />
    </>
  ),
  trophy: (
    <>
      <path
        d="M12.5 10H7v2.5a5.5 5.5 0 0 0 6 5.5M27.5 10H33v2.5a5.5 5.5 0 0 1-6 5.5"
        fill="none"
        {...line}
      />
      <path d="M12 6h16v9.5a8 8 0 0 1-16 0Z" fill={SUN} {...line} />
      <path d="M20 23.5V28" fill="none" {...line} />
      <rect x="12.5" y="28" width="15" height="6" rx="1.5" fill={MINT} {...line} />
    </>
  ),
  plane: (
    <path
      d="M20 4.5c1.3 0 2.2 1.1 2.2 2.4v8.6l11.3 6.6v3.4l-11.3-3.4v6.4l3.5 2.6v3l-5.7-1.6-5.7 1.6v-3l3.5-2.6v-6.4L6.5 25.5v-3.4l11.3-6.6V6.9c0-1.3.9-2.4 2.2-2.4Z"
      fill={WHITE}
      {...line}
    />
  ),
  play: <path d="M14 9.5v21l17-10.5Z" fill={INK} {...line} />,
  youtube: (
    <>
      <rect x="4" y="9" width="32" height="22" rx="7" fill="#ff4e45" {...line} />
      <path d="M17 14.5v11l9-5.5Z" fill={WHITE} {...line} />
    </>
  ),
} satisfies Record<string, ReactNode>

export type IconName = keyof typeof DRAWINGS

export function Icon({
  name,
  size = 40,
  className,
}: {
  name: IconName
  size?: number
  className?: string
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {DRAWINGS[name]}
    </svg>
  )
}

const TONES = {
  sky: 'bg-accent-wash',
  mint: 'bg-[#e6f8ee]',
  sun: 'bg-[#fff5d6]',
  rose: 'bg-[#fdeceb]',
  stone: 'bg-canvas',
} as const

export type Tone = keyof typeof TONES

/** An icon on a small coloured tile, outlined and with an offset shadow, like the buttons. */
export function IconTile({
  name,
  tone = 'sky',
  size = 52,
}: {
  name: IconName
  tone?: Tone
  size?: number
}) {
  return (
    <span
      className={`inline-grid shrink-0 place-items-center rounded-2xl border-2 border-ink shadow-[3px_3px_0_var(--ink)] ${TONES[tone]}`}
      style={{ width: size, height: size }}
    >
      <Icon name={name} size={Math.round(size * 0.72)} />
    </span>
  )
}
