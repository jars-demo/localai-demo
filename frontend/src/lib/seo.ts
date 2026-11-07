// One place for the facts search engines and share cards see.
// Public credit is the author only. Never add the co-creator here (see AGENTS.md, rule 6).

export const SITE_URL = 'https://localai.jishanahmed.in'
export const REPO_URL = 'https://github.com/jars-demo/localai-demo'

export const SITE_NAME = 'Your own private ChatGPT'
export const SITE_TAGLINE = 'Run AI on your own laptop, offline'
export const SITE_DESCRIPTION =
  'A free, no-code, hands-on workshop: run a ChatGPT-style AI on your own Windows or Mac laptop with Jan and one small model. Keep its chats off the system drive, chat with the internet off, and check what is actually private.'

export const AUTHOR = {
  name: 'Jishanahmed AR Shaikh',
  tag: 'JARS',
  credit: 'Jishanahmed AR Shaikh [JARS]',
  url: 'https://www.youtube.com/@jishanahmedarshaikh',
  sameAs: [
    'https://www.youtube.com/@jishanahmedarshaikh',
    'https://github.com/jars-demo',
    'https://skills.jishanahmed.in',
  ],
}

export const KEYWORDS = [
  'local AI',
  'private AI',
  'offline AI',
  'private ChatGPT',
  'ChatGPT alternative',
  'run AI locally',
  'local LLM',
  'run LLM on laptop',
  'Jan AI',
  'Jan app tutorial',
  'LM Studio',
  'Qwen3.5',
  'GGUF',
  'llama.cpp',
  'AI without internet',
  'free AI on Windows',
  'local AI on Mac',
  'no-code AI workshop',
  'AI privacy',
  'JARS',
]

/** A person node for structured data, reused on every page. */
export const AUTHOR_LD = {
  '@type': 'Person',
  '@id': `${SITE_URL}/#author`,
  name: AUTHOR.name,
  alternateName: AUTHOR.tag,
  url: AUTHOR.url,
  sameAs: AUTHOR.sameAs,
}

export function absolute(path: string): string {
  return new URL(path, SITE_URL).toString()
}

type PageMetaInput = {
  title: string
  description: string
  path: string
  type?: 'website' | 'article'
}

/** Title, description, canonical and share data for one page. Images come from the file conventions. */
export function pageMeta({ title, description, path, type = 'website' }: PageMetaInput) {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      url: path,
      siteName: SITE_NAME,
      locale: 'en_IN',
      title,
      description,
    },
    twitter: { card: 'summary_large_image' as const, title, description },
  }
}
