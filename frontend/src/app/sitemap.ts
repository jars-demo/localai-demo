import type { MetadataRoute } from 'next'

import { absolute } from '@/lib/seo'
import { CHAPTERS } from '@/lib/workshop'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absolute('/'), changeFrequency: 'weekly', priority: 1 },
    { url: absolute('/follow-along'), changeFrequency: 'weekly', priority: 0.9 },
    { url: absolute('/workshop'), changeFrequency: 'monthly', priority: 0.7 },
    ...CHAPTERS.map((chapter) => ({
      url: absolute(`/workshop/${chapter.slug}`),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ]
}
