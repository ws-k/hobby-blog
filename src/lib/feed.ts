import { Article } from '@/types/article';
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from './constants';

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function generateRssFeed(articles: Article[], title?: string, feedPath: string = '/feed'): string {
  const feedTitle = title ? `${title} — ${SITE_NAME}` : SITE_NAME;
  const items = articles.slice(0, 50).map(
    (article) => `
    <item>
      <title>${escapeXml(article.title)}</title>
      <link>${SITE_URL}/article/${article.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/article/${article.slug}</guid>
      <description>${escapeXml(article.description)}</description>
      <pubDate>${new Date(article.date).toUTCString()}</pubDate>
      <category>${escapeXml(article.category)}</category>
    </item>`
  );

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(feedTitle)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>ko</language>
    <atom:link href="${SITE_URL}${feedPath}" rel="self" type="application/rss+xml"/>
    ${items.join('')}
  </channel>
</rss>`;
}
