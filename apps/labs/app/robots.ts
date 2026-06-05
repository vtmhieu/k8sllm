import type { MetadataRoute } from 'next';
import { labsOrigin } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/progress', '/account'],
      },
    ],
    sitemap: `${labsOrigin}/sitemap.xml`,
    host: labsOrigin,
  };
}
