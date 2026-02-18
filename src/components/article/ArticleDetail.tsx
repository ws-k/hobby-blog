import { ArticleWithHtml } from '@/types/article';
import { getCategoryBySlug, getSubcategoryBySlug } from '@/lib/categories';
import Badge from '@/components/ui/Badge';
import ShareButtons from './ShareButtons';
import AdInArticle from '@/components/ads/AdInArticle';

interface ArticleDetailProps {
  article: ArticleWithHtml;
}

export default function ArticleDetail({ article }: ArticleDetailProps) {
  const category = getCategoryBySlug(article.category);
  const subcategory = getSubcategoryBySlug(
    article.category,
    article.subcategory
  );

  // Process HTML to replace ad placeholders with actual ad components
  const htmlParts = article.html.split(
    '<div class="ad-in-article" data-ad-slot="in-article"></div>'
  );

  return (
    <article className="max-w-3xl">
      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <Badge variant={article.contentType === 'news' ? 'blue' : 'green'}>
            {article.contentType === 'news' ? '뉴스' : '리뷰'}
          </Badge>
          {category && (
            <span className="text-sm text-gray-500">{category.name}</span>
          )}
          {subcategory && (
            <>
              <span className="text-gray-300">·</span>
              <span className="text-sm text-gray-500">{subcategory.name}</span>
            </>
          )}
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
          {article.title}
        </h1>
        <div className="flex items-center gap-3 text-sm text-gray-500">
          <time dateTime={article.date}>
            {new Date(article.date).toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
          <span>·</span>
          <span>{article.readingTime}분 읽기</span>
          {article.source && (
            <>
              <span>·</span>
              <span>출처: {article.source}</span>
            </>
          )}
        </div>
      </header>

      {/* Thumbnail */}
      {article.thumbnail && (
        <figure className="mb-8">
          <img
            src={article.thumbnail}
            alt={article.thumbnailAlt || article.title}
            className="w-full rounded-lg"
          />
          {article.imageCredit && (
            <figcaption className="text-xs text-gray-400 mt-2 text-right">
              이미지: {article.imageCredit}
            </figcaption>
          )}
        </figure>
      )}

      {/* Content with inline ads */}
      <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 prose-img:rounded-lg">
        {htmlParts.map((part, index) => (
          <div key={index}>
            <div dangerouslySetInnerHTML={{ __html: part }} />
            {index < htmlParts.length - 1 && <AdInArticle />}
          </div>
        ))}
      </div>

      {/* Tags */}
      {article.tags.length > 0 && (
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Source link */}
      {article.sourceUrl && (
        <div className="mt-4 text-sm text-gray-500">
          원문:{' '}
          <a
            href={article.sourceUrl}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="text-blue-600 hover:underline"
          >
            {article.source}
          </a>
        </div>
      )}

      {/* Share */}
      <div className="mt-8">
        <ShareButtons title={article.title} slug={article.slug} />
      </div>
    </article>
  );
}
