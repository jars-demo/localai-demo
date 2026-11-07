import Link from 'next/link'

import { AUTHOR, REPO_URL } from '@/lib/seo'

import { BackToTop } from './BackToTop'
import { Mark } from './Mark'
import { SiteCompanion } from './SiteCompanion'

export { REPO_URL, SITE_URL } from '@/lib/seo'
export { Mark } from './Mark'

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
          <span>
            Your own private ChatGPT · made by{' '}
            <a href={AUTHOR.url} rel="author" className="font-semibold text-ink-2 hover:text-ink">
              {AUTHOR.credit}
            </a>
          </span>
          <span>
            MIT licensed · Not affiliated with OpenAI, Jan or LM Studio ·{' '}
            <a href={REPO_URL} className="hover:text-ink">
              GitHub
            </a>
          </span>
        </div>
      </footer>
      <BackToTop />
      <SiteCompanion />
    </>
  )
}
