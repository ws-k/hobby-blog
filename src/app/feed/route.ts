import { getAllArticles } from '@/lib/content';
import { generateRssFeed } from '@/lib/feed';

export async function GET() {
  const articles = getAllArticles();
  const feed = generateRssFeed(articles);
  return new Response(feed, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
