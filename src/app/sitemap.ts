import { MetadataRoute } from 'next';
import { getAllArticles } from '@/lib/content';
import { CATEGORIES } from '@/lib/categories';
import { SITE_URL } from '@/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getAllArticles();

  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      changeFrequency: 'hourly',
      priority: 1.0,
    },
    ...CATEGORIES.map((c) => ({
      url: `${SITE_URL}/${c.slug}`,
      changeFrequency: 'daily' as const,
      priority: 0.7,
    })),
    ...CATEGORIES.flatMap((c) =>
      c.subcategories.map((s) => ({
        url: `${SITE_URL}/${c.slug}/${s.slug}`,
        changeFrequency: 'daily' as const,
        priority: 0.6,
      }))
    ),
  ];

  const articleEntries: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${SITE_URL}/article/${a.slug}`,
    lastModified: new Date(a.date),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [...staticEntries, ...articleEntries];
}
