import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import {
  CATEGORIES,
  getCategoryBySlug,
  getSubcategoryBySlug,
} from '@/lib/categories';
import {
  getArticlesBySubcategory,
  paginateArticles,
} from '@/lib/content';
import { ARTICLES_PER_PAGE } from '@/lib/constants';
import ArticleGrid from '@/components/article/ArticleGrid';
import Pagination from '@/components/ui/Pagination';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd';
import Link from 'next/link';

export const revalidate = 300;

interface PageProps {
  params: Promise<{ category: string; subcategory: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateStaticParams() {
  const params: { category: string; subcategory: string }[] = [];
  CATEGORIES.forEach((c) =>
    c.subcategories.forEach((s) =>
      params.push({ category: c.slug, subcategory: s.slug })
    )
  );
  return params;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { category: catSlug, subcategory: subSlug } = await params;
  const category = getCategoryBySlug(catSlug);
  const subcategory = getSubcategoryBySlug(catSlug, subSlug);
  if (!category || !subcategory) return {};

  const title = `${subcategory.name} — ${category.name}`;
  const description = `${category.name} > ${subcategory.name} 카테고리의 최신 뉴스와 리뷰`;
  return {
    title,
    description,
    alternates: { canonical: `/${catSlug}/${subSlug}` },
  };
}

export default async function SubcategoryPage({
  params,
  searchParams,
}: PageProps) {
  const { category: catSlug, subcategory: subSlug } = await params;
  const { page: pageParam } = await searchParams;
  const category = getCategoryBySlug(catSlug);
  const subcategory = getSubcategoryBySlug(catSlug, subSlug);
  if (!category || !subcategory) notFound();

  const allArticles = getArticlesBySubcategory(catSlug, subSlug);
  const page = parseInt(pageParam || '1', 10);
  const { articles, totalPages } = paginateArticles(
    allArticles,
    page,
    ARTICLES_PER_PAGE
  );

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: category.name, href: `/${category.slug}` },
          {
            name: subcategory.name,
            href: `/${category.slug}/${subcategory.slug}`,
          },
        ]}
      />
      <Breadcrumbs
        items={[
          { label: category.name, href: `/${category.slug}` },
          { label: subcategory.name },
        ]}
      />

      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        {subcategory.name}
      </h1>

      {/* Subcategory nav */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Link
          href={`/${category.slug}`}
          className="px-3 py-1.5 text-sm rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
        >
          전체
        </Link>
        {category.subcategories.map((sub) => (
          <Link
            key={sub.slug}
            href={`/${category.slug}/${sub.slug}`}
            className={`px-3 py-1.5 text-sm rounded-full ${
              sub.slug === subSlug
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {sub.name}
          </Link>
        ))}
      </div>

      <ArticleGrid articles={articles} />
      {totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          basePath={`/${catSlug}/${subSlug}`}
        />
      )}
    </>
  );
}
