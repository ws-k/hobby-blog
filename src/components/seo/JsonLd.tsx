import { Article } from '@/types/article';
import { SITE_NAME, SITE_URL } from '@/lib/constants';

interface NewsArticleJsonLdProps {
  article: Article;
}

export function NewsArticleJsonLd({ article }: NewsArticleJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': article.contentType === 'review' ? 'Review' : 'NewsArticle',
    headline: article.title,
    description: article.description,
    image: article.thumbnail
      ? `${SITE_URL}${article.thumbnail}`
      : undefined,
    datePublished: article.date,
    dateModified: article.date,
    author: {
      '@type': 'Organization',
      name: SITE_NAME,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/article/${article.slug}`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function WebSiteJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
