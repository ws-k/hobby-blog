import { ImageResponse } from 'next/og';
import { getArticleBySlug, getAllSlugs } from '@/lib/content';
import { getCategoryBySlug } from '@/lib/categories';
import { SITE_NAME } from '@/lib/constants';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = '기사 OG 이미지';

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export default async function OgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#1e293b',
            color: '#fff',
            fontSize: 48,
            fontWeight: 700,
          }}
        >
          {SITE_NAME}
        </div>
      ),
      { ...size }
    );
  }

  const category = getCategoryBySlug(article.category);
  const categoryName = category?.name || '';
  const isReview = article.contentType === 'review';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '60px',
          backgroundColor: '#0f172a',
          color: '#fff',
        }}
      >
        {/* Top: badges */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <div
            style={{
              padding: '6px 16px',
              borderRadius: '6px',
              backgroundColor: isReview ? '#059669' : '#2563eb',
              color: '#fff',
              fontSize: 20,
              fontWeight: 600,
            }}
          >
            {isReview ? '리뷰' : '뉴스'}
          </div>
          {categoryName && (
            <div
              style={{
                padding: '6px 16px',
                borderRadius: '6px',
                backgroundColor: '#334155',
                color: '#94a3b8',
                fontSize: 20,
                fontWeight: 500,
              }}
            >
              {categoryName}
            </div>
          )}
        </div>

        {/* Middle: title */}
        <div
          style={{
            fontSize: 52,
            fontWeight: 800,
            lineHeight: 1.3,
            color: '#f1f5f9',
            display: 'flex',
            maxWidth: '1000px',
          }}
        >
          {article.title.length > 60
            ? article.title.slice(0, 60) + '...'
            : article.title}
        </div>

        {/* Bottom: site name + date */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: '#3b82f6',
            }}
          >
            {SITE_NAME}
          </div>
          <div
            style={{
              fontSize: 20,
              color: '#64748b',
            }}
          >
            {new Date(article.date).toLocaleDateString('ko-KR')}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
