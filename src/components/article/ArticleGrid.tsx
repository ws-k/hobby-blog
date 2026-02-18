import { Article } from '@/types/article';
import ArticleCard from './ArticleCard';

interface ArticleGridProps {
  articles: Article[];
  priorityCount?: number;
}

export default function ArticleGrid({ articles, priorityCount = 0 }: ArticleGridProps) {
  if (articles.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        아직 기사가 없습니다.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {articles.map((article, index) => (
        <ArticleCard key={article.slug} article={article} priority={index < priorityCount} />
      ))}
    </div>
  );
}
