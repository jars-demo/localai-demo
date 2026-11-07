// The site's logo: a chat bubble in a sky tile, the AI that talks on your own laptop.

export function Mark({ size = 22 }: { size?: number }) {
  // A chat bubble in a sky tile: the AI that talks on your own laptop.
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <rect
        x="1"
        y="1"
        width="22"
        height="22"
        rx="6"
        fill="#2f74cc"
        stroke="#17181c"
        strokeWidth="1.6"
      />
      <path
        d="M6 7.5h12a1.5 1.5 0 0 1 1.5 1.5v6a1.5 1.5 0 0 1-1.5 1.5h-6.5L8 19v-2.5H6A1.5 1.5 0 0 1 4.5 15V9A1.5 1.5 0 0 1 6 7.5Z"
        fill="#ffffff"
        stroke="#17181c"
        strokeWidth="1.2"
      />
      <circle cx="9" cy="12" r="1.15" fill="#17181c" />
      <circle cx="12" cy="12" r="1.15" fill="#17181c" />
      <circle cx="15" cy="12" r="1.15" fill="#8be3ae" stroke="#17181c" strokeWidth="0.6" />
    </svg>
  )
}
