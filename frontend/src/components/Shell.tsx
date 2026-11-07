import Link from 'next/link'

import { BackToTop } from './BackToTop'

export const REPO_URL = 'https://github.com/jars-demo/localai-demo'
export const SITE_URL = 'https://localai.jishanahmed.in'

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

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="border-b border-line">
        <nav
          aria-label="Main"
          className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-4"
        >
          <Link href="/" className="inline-flex items-center gap-2.5 text-[15px] font-semibold">
            <Mark />
            <span className="hidden sm:inline">Your own private ChatGPT</span>
            <span className="sm:hidden">Private ChatGPT</span>
          </Link>
          <ul className="flex items-center gap-4 text-[14px] text-ink-2 sm:gap-5">
            <li>
              <Link href="/workshop" className="hover:text-ink">
                Chapters
              </Link>
            </li>
            <li>
              <a href={REPO_URL} className="hidden hover:text-ink sm:inline">
                GitHub
              </a>
            </li>
            <li>
              <Link href="/follow-along" className="nav-cta">
                Follow along
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main id="main" className="flex-1">
        {children}
      </main>
      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-5xl flex-col gap-2 px-4 py-6 text-[13px] text-muted sm:flex-row sm:justify-between">
          <span>Your own private ChatGPT · a JARS DEMO workshop · MIT licensed</span>
          <span>
            Not affiliated with OpenAI, Jan or LM Studio ·{' '}
            <a href={REPO_URL} className="hover:text-ink">
              GitHub
            </a>
          </span>
        </div>
      </footer>
      <BackToTop />
    </>
  )
}
