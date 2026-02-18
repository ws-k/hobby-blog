import { NextRequest } from 'next/server';
import { getArticlesByCategory } from '@/lib/content';
import { getCategoryBySlug } from '@/lib/categories';
import { generateRssFeed } from '@/lib/feed';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ category: string }> }
) {
  const { category: categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);
  if (!category) {
    return new Response('Not Found', { status: 404 });
  }

  const articles = getArticlesByCategory(categorySlug);
  const feed = generateRssFeed(
    articles,
    category.name,
    `/feed/${categorySlug}`
  );

  return new Response(feed, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
