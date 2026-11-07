import type { Metadata, Viewport } from 'next'
import { DM_Mono, Figtree, Instrument_Serif } from 'next/font/google'

import { Shell } from '@/components/Shell'
import { AUTHOR, KEYWORDS, SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE, SITE_URL } from '@/lib/seo'

import './globals.css'

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

const DEFAULT_TITLE = `${SITE_NAME}: ${SITE_TAGLINE}`

// Site-wide defaults. Each page sets its own title, description and canonical URL.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: DEFAULT_TITLE, template: `%s · ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: KEYWORDS,
  authors: [{ name: AUTHOR.credit, url: AUTHOR.url }],
  creator: AUTHOR.credit,
  publisher: AUTHOR.credit,
  category: 'technology',
  openGraph: {
    type: 'website',
    url: '/',
    siteName: SITE_NAME,
    locale: 'en_IN',
    title: DEFAULT_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: { card: 'summary_large_image', title: DEFAULT_TITLE, description: SITE_DESCRIPTION },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  formatDetection: { telephone: false, email: false, address: false },
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
