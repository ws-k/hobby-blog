import { Metadata } from 'next';
import { Article } from '@/types/article';
import {
  SITE_NAME,
  SITE_DESCRIPTION,
  SITE_URL,
  SITE_LOCALE,
  DEFAULT_OG_IMAGE,
  NAVER_VERIFICATION_CODE,
} from './constants';

export function getBaseMetadata(): Metadata {
  return {
    title: {
      default: `${SITE_NAME} — ${SITE_DESCRIPTION}`,
      template: `%s | ${SITE_NAME}`,
    },
    description: SITE_DESCRIPTION,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: '/',
      types: {
        'application/rss+xml': '/feed',
      },
    },
    openGraph: {
      type: 'website',
      locale: SITE_LOCALE,
      siteName: SITE_NAME,
      title: SITE_NAME,
      description: SITE_DESCRIPTION,
      images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: SITE_NAME,
      description: SITE_DESCRIPTION,
      images: [DEFAULT_OG_IMAGE],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      ...(NAVER_VERIFICATION_CODE ? { other: { 'naver-site-verification': NAVER_VERIFICATION_CODE } } : {}),
    },
  };
}

export function getArticleMetadata(article: Article): Metadata {
  const url = `/article/${article.slug}`;
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      locale: SITE_LOCALE,
      siteName: SITE_NAME,
      title: article.title,
      description: article.description,
      url,
      publishedTime: article.date,
      tags: article.tags,
      images: [
        {
          url: article.thumbnail || DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: article.thumbnailAlt || article.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
      images: [article.thumbnail || DEFAULT_OG_IMAGE],
    },
  };
}

export function getCategoryMetadata(
  categoryName: string,
  categorySlug: string
): Metadata {
  const title = `${categoryName} — 최신 뉴스와 리뷰`;
  const description = `${categoryName} 카테고리의 최신 뉴스, 리뷰, 트렌드를 확인하세요.`;
  return {
    title,
    description,
    alternates: { canonical: `/${categorySlug}` },
    openGraph: {
      type: 'website',
      locale: SITE_LOCALE,
      siteName: SITE_NAME,
      title,
      description,
    },
  };
}
