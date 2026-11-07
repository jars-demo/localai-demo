import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import { DriveBar, DriveCode } from '@/components/DriveCode'
import { JsonLd } from '@/components/JsonLd'
import { MarkdownPre, textOf } from '@/components/MarkdownPre'
import { absolute, AUTHOR_LD, pageMeta, SITE_NAME, SITE_URL } from '@/lib/seo'
import { CHAPTERS, findChapter } from '@/lib/workshop'

export function generateStaticParams() {
  return CHAPTERS.map((chapter) => ({ slug: chapter.slug }))
}

export async function generateMetadata(props: PageProps<'/workshop/[slug]'>): Promise<Metadata> {
  const { slug } = await props.params
  const chapter = findChapter(slug)
  if (!chapter) return { title: 'Chapter' }
  return pageMeta({
    title: `${chapter.number}. ${chapter.title}`,
    description: chapter.summary,
    path: `/workshop/${chapter.slug}`,
    type: 'article',
  })
}

export default async function ChapterPage(props: PageProps<'/workshop/[slug]'>) {
  const { slug } = await props.params
  const chapter = findChapter(slug)
  if (!chapter) notFound()
  const index = CHAPTERS.indexOf(chapter)
  const previous = CHAPTERS[index - 1]
  const next = CHAPTERS[index + 1]

  return (
    <article className="mx-auto max-w-3xl px-4 pt-12 pb-24">
      <JsonLd
        data={{
          '@graph': [
            {
              '@type': 'LearningResource',
              name: chapter.title,
              description: chapter.summary,
              url: absolute(`/workshop/${chapter.slug}`),
              inLanguage: 'en',
              educationalLevel: 'Beginner',
              learningResourceType: 'Tutorial',
              timeRequired: `PT${chapter.minutes}M`,
              isAccessibleForFree: true,
              isPartOf: { '@type': 'Course', name: SITE_NAME, url: SITE_URL },
              author: AUTHOR_LD,
            },
            {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
                { '@type': 'ListItem', position: 2, name: 'Chapters', item: absolute('/workshop') },
                {
                  '@type': 'ListItem',
                  position: 3,
                  name: chapter.title,
                  item: absolute(`/workshop/${chapter.slug}`),
                },
              ],
            },
          ],
        }}
      />
      <nav aria-label="Breadcrumb" className="mb-8 font-mono text-[12px] text-muted">
        <Link href="/workshop" className="hover:text-ink">
          Workshop
        </Link>{' '}
        / {chapter.number}
      </nav>
      <header className="mb-8 flex flex-col gap-3">
        <p className="font-mono text-[12px] tracking-wider text-muted uppercase">
          Chapter {chapter.number} · {chapter.minutes} minutes
        </p>
        <h1 className="font-display text-[2.9rem] leading-[1.05] text-balance">{chapter.title}</h1>
        <p className="text-[17px] leading-relaxed text-ink-2">{chapter.summary}</p>
      </header>
      {chapter.body.includes('X:') && <DriveBar />}
      <div className="prose-chapter">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            pre: MarkdownPre,
            code: ({ children, className }) => (
              <DriveCode text={textOf(children)} className={className} />
            ),
          }}
        >
          {chapter.body}
        </ReactMarkdown>
      </div>
      <nav
        aria-label="Chapters"
        className="mt-14 grid gap-3 border-t border-line pt-6 sm:grid-cols-2"
      >
        {previous ? (
          <Link
            href={`/workshop/${previous.slug}`}
            className="flex flex-col gap-1 rounded-md border border-line p-4 hover:bg-surface"
          >
            <span className="font-mono text-[12px] text-muted">Previous</span>
            <span className="font-medium">
              {previous.number}. {previous.title}
            </span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/workshop/${next.slug}`}
            className="flex flex-col gap-1 rounded-md border border-line p-4 text-right hover:bg-surface"
          >
            <span className="font-mono text-[12px] text-muted">Next</span>
            <span className="font-medium">
              {next.number}. {next.title}
            </span>
          </Link>
        ) : (
          <Link
            href="/"
            className="flex flex-col gap-1 rounded-md border border-line p-4 text-right hover:bg-surface"
          >
            <span className="font-mono text-[12px] text-muted">Done</span>
            <span className="font-medium">Back to the start</span>
          </Link>
        )}
      </nav>
    </article>
  )
}
