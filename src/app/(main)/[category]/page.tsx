import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { CATEGORIES, getCategoryBySlug } from '@/lib/categories';
import { getArticlesByCategory, paginateArticles } from '@/lib/content';
import { getCategoryMetadata } from '@/lib/seo';
import { ARTICLES_PER_PAGE } from '@/lib/constants';
import ArticleGrid from '@/components/article/ArticleGrid';
import Pagination from '@/components/ui/Pagination';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd';
import AdBetweenPosts from '@/components/ads/AdBetweenPosts';
import Link from 'next/link';

export const revalidate = 300;

interface PageProps {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);
  if (!category) return {};
  return getCategoryMetadata(category.name, category.slug);
}

export default async function CategoryPage({ params, searchParams }: PageProps) {
  const { category: categorySlug } = await params;
  const { page: pageParam } = await searchParams;
  const category = getCategoryBySlug(categorySlug);
  if (!category) notFound();

  const allArticles = getArticlesByCategory(categorySlug);
  const page = parseInt(pageParam || '1', 10);
  const { articles, totalPages } = paginateArticles(
    allArticles,
    page,
    ARTICLES_PER_PAGE
  );

  return (
    <>
      <BreadcrumbJsonLd
        items={[{ name: category.name, href: `/${category.slug}` }]}
      />
      <Breadcrumbs items={[{ label: category.name }]} />

      <h1 className="text-2xl font-bold text-gray-900 mb-2">{category.name}</h1>

      {/* Subcategory nav */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Link
          href={`/${category.slug}`}
          className="px-3 py-1.5 text-sm rounded-full bg-blue-600 text-white"
        >
          전체
        </Link>
        {category.subcategories.map((sub) => (
          <Link
            key={sub.slug}
            href={`/${category.slug}/${sub.slug}`}
            className="px-3 py-1.5 text-sm rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
          >
            {sub.name}
          </Link>
        ))}
      </div>

      <ArticleGrid articles={articles} />
      {totalPages > 1 && (
        <>
          <AdBetweenPosts />
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            basePath={`/${categorySlug}`}
          />
        </>
      )}
    </>
  );
}
