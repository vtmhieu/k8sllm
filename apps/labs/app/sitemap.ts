import type { MetadataRoute } from 'next';
import { challenges, roadmaps } from '@/lib/content';
import { absoluteLabsUrl } from '@/lib/seo';

const lastModified = new Date('2026-06-05');

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: absoluteLabsUrl('/'),
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: absoluteLabsUrl('/challenges'),
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    ...challenges.map((challenge) => ({
      url: absoluteLabsUrl(`/challenges/${challenge.slug}`),
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: challenge.slug === 'vllm-inference' ? 0.9 : 0.8,
    })),
    ...roadmaps.map((roadmap) => ({
      url: absoluteLabsUrl(`/roadmaps/${roadmap.slug}`),
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    })),
  ];
}
