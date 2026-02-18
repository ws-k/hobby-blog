import Link from 'next/link';
import { Article } from '@/types/article';
import AdSidebar from '@/components/ads/AdSidebar';

interface SidebarProps {
  popularArticles?: Article[];
}

export default function Sidebar({ popularArticles = [] }: SidebarProps) {
  return (
    <aside className="hidden lg:block w-[300px] shrink-0 space-y-6">
      <AdSidebar />
      {popularArticles.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="font-bold text-gray-900 mb-4">인기 기사</h3>
          <ul className="space-y-3">
            {popularArticles.map((article, i) => (
              <li key={article.slug}>
                <Link
                  href={`/article/${article.slug}`}
                  className="flex gap-3 group"
                >
                  <span className="text-2xl font-bold text-gray-300 group-hover:text-blue-500 transition-colors">
                    {i + 1}
                  </span>
                  <span className="text-sm text-gray-700 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {article.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  );
}
