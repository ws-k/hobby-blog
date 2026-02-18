import Link from 'next/link';
import { getRecentArticles, getFeaturedArticles } from '@/lib/content';
import ArticleGrid from '@/components/article/ArticleGrid';
import ArticleCard from '@/components/article/ArticleCard';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Sidebar from '@/components/layout/Sidebar';
import AdHeader from '@/components/ads/AdHeader';
import { CATEGORIES } from '@/lib/categories';

export const revalidate = 60;

export default function HomePage() {
  const recentArticles = getRecentArticles(12);
  const featuredArticles = getFeaturedArticles().slice(0, 5);
  const sidebarArticles = getRecentArticles(5);

  return (
    <>
      <Header />
      <AdHeader />
      <main className="max-w-7xl mx-auto px-4 py-6 flex-1">
        <div className="flex gap-8">
          <div className="flex-1 min-w-0">
            {/* Featured */}
            {featuredArticles.length > 0 && (
              <section className="mb-10">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  주요 기사
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {featuredArticles.slice(0, 2).map((article, i) => (
                    <ArticleCard key={article.slug} article={article} priority={i < 2} />
                  ))}
                </div>
              </section>
            )}

            {/* Recent */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                최신 기사
              </h2>
              <ArticleGrid articles={recentArticles} priorityCount={3} />
            </section>

            {/* Category links */}
            <section className="mt-12">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                카테고리
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/${cat.slug}`}
                    className="p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all text-center font-medium text-gray-700 hover:text-blue-600"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </section>
          </div>
          <Sidebar popularArticles={sidebarArticles} />
        </div>
      </main>
      <Footer />
    </>
  );
}
