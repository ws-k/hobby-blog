import Link from 'next/link';
import Image from 'next/image';
import { Article } from '@/types/article';
import { getCategoryBySlug } from '@/lib/categories';
import Badge from '@/components/ui/Badge';

interface ArticleCardProps {
  article: Article;
  priority?: boolean;
}

export default function ArticleCard({ article, priority = false }: ArticleCardProps) {
  const category = getCategoryBySlug(article.category);

  return (
    <article className="group bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <Link href={`/article/${article.slug}`}>
        <div className="aspect-video bg-gray-100 relative overflow-hidden">
          {article.thumbnail ? (
            <Image
              src={article.thumbnail}
              alt={article.thumbnailAlt || article.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              priority={priority}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
          <div className="absolute top-2 left-2 flex gap-1.5">
            <Badge variant={article.contentType === 'news' ? 'blue' : 'green'}>
              {article.contentType === 'news' ? '뉴스' : '리뷰'}
            </Badge>
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-center gap-2 mb-2">
            {category && (
              <span className="text-xs font-medium text-blue-600">
                {category.name}
              </span>
            )}
            <span className="text-xs text-gray-400">
              {new Date(article.date).toLocaleDateString('ko-KR')}
            </span>
          </div>
          <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-2">
            {article.title}
          </h3>
          <p className="text-sm text-gray-500 line-clamp-2">
            {article.description}
          </p>
        </div>
      </Link>
    </article>
  );
}
