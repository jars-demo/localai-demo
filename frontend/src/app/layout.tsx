import type { Metadata, Viewport } from 'next'
import { DM_Mono, Figtree, Instrument_Serif } from 'next/font/google'

import { Shell, SITE_URL } from '@/components/Shell'

import './globals.css'

const TITLE = 'Your own private ChatGPT'
const DESCRIPTION =
  'A no-code workshop: run a ChatGPT-style AI on your own laptop with Jan, keep its data off the system drive, chat with the internet off, and check what is private. Windows and macOS.'

const sans = Figtree({
  variable: '--font-face-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
})
const serif = Instrument_Serif({
  variable: '--font-face-serif',
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
})
const mono = DM_Mono({
  variable: '--font-face-mono',
  subsets: ['latin'],
  weight: ['400', '500'],
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: `%s · ${TITLE}` },
  description: DESCRIPTION,
  keywords: [
    'local AI',
    'private AI',
    'offline AI',
    'Jan',
    'LM Studio',
    'Qwen3.5',
    'GGUF',
    'ChatGPT alternative',
    'Windows',
    'macOS',
    'workshop',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: TITLE,
    title: TITLE,
    description: DESCRIPTION,
    locale: 'en_IN',
  },
  twitter: { card: 'summary', title: TITLE, description: DESCRIPTION },
}

export const viewport: Viewport = { themeColor: '#f2f0eb' }

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${serif.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only bg-ink px-4 py-2 text-canvas focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50"
        >
          Skip to content
        </a>
        <Shell>{children}</Shell>
      </body>
    </html>
  )
}
