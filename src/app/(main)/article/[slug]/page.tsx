import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import {
  getArticleBySlug,
  getAllSlugs,
  getRelatedArticles,
} from '@/lib/content';
import { markdownToHtml } from '@/lib/markdown';
import { getArticleMetadata } from '@/lib/seo';
import { getCategoryBySlug, getSubcategoryBySlug } from '@/lib/categories';
import ArticleDetail from '@/components/article/ArticleDetail';
import RelatedArticles from '@/components/article/RelatedArticles';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd';
import { NewsArticleJsonLd } from '@/components/seo/JsonLd';
import AdBanner from '@/components/ads/AdBanner';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return getArticleMetadata(article);
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const html = await markdownToHtml(article.content);
  const related = getRelatedArticles(article, 4);
  const category = getCategoryBySlug(article.category);
  const subcategory = getSubcategoryBySlug(
    article.category,
    article.subcategory
  );

  const breadcrumbItems = [];
  if (category) {
    breadcrumbItems.push({
      label: category.name,
      href: `/${category.slug}`,
      name: category.name,
    });
  }
  if (subcategory && category) {
    breadcrumbItems.push({
      label: subcategory.name,
      href: `/${category.slug}/${subcategory.slug}`,
      name: subcategory.name,
    });
  }
  breadcrumbItems.push({ label: article.title, name: article.title });

  return (
    <>
      <NewsArticleJsonLd article={article} />
      <BreadcrumbJsonLd
        items={breadcrumbItems.map((item) => ({
          name: item.name || item.label,
          href: item.href || `/article/${slug}`,
        }))}
      />
      <Breadcrumbs
        items={breadcrumbItems.map(({ label, href }) => ({ label, href }))}
      />
      <ArticleDetail article={{ ...article, html }} />

      {/* Bottom ad */}
      <div className="mt-8 max-w-3xl">
        <AdBanner slot="article-bottom" format="auto" className="min-h-[250px]" />
      </div>

      <RelatedArticles articles={related} />
    </>
  );
}
