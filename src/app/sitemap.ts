import { MetadataRoute } from 'next';
import { getAllArticles } from '@/lib/content';
import { CATEGORIES } from '@/lib/categories';
import { SITE_URL } from '@/lib/constants';

const URLS_PER_SITEMAP = 5000;

export async function generateSitemaps() {
  const articles = getAllArticles();
  const totalArticles = articles.length;
  // 카테고리 + 서브카테고리 + 홈 = 고정 URL 수
  const fixedUrls = 1 + CATEGORIES.length + CATEGORIES.reduce((sum, c) => sum + c.subcategories.length, 0);
  const totalUrls = fixedUrls + totalArticles;
  const numSitemaps = Math.max(1, Math.ceil(totalUrls / URLS_PER_SITEMAP));

  return Array.from({ length: numSitemaps }, (_, i) => ({ id: i }));
}

export default function sitemap({ id }: { id: number }): MetadataRoute.Sitemap {
  const articles = getAllArticles();

  // 첫 번째 사이트맵에 고정 URL 포함
  const staticEntries: MetadataRoute.Sitemap = id === 0
    ? [
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
      ]
    : [];

  // 기사는 사이트맵 ID에 따라 분할
  const staticCount = id === 0 ? staticEntries.length : 0;
  const articleSlots = URLS_PER_SITEMAP - staticCount;
  const articleStart = id === 0 ? 0 : URLS_PER_SITEMAP - (1 + CATEGORIES.length + CATEGORIES.reduce((sum, c) => sum + c.subcategories.length, 0)) + (id - 1) * URLS_PER_SITEMAP;
  const articleSlice = articles.slice(articleStart, articleStart + articleSlots);

  const articleEntries: MetadataRoute.Sitemap = articleSlice.map((a) => ({
    url: `${SITE_URL}/article/${a.slug}`,
    lastModified: new Date(a.date),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [...staticEntries, ...articleEntries];
}
