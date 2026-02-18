import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Article, ArticleFrontmatter } from '@/types/article';

const contentDirectory = path.join(process.cwd(), 'content');

function getMarkdownFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...getMarkdownFiles(fullPath));
    } else if (entry.name.endsWith('.md')) {
      files.push(fullPath);
    }
  }
  return files;
}

function parseArticleFile(filePath: string): Article {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);
  return {
    ...(data as ArticleFrontmatter),
    content,
  };
}

let articlesCache: Article[] | null = null;

function getAllArticlesUncached(): Article[] {
  const files = getMarkdownFiles(contentDirectory);
  const articles = files.map(parseArticleFile);
  articles.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  return articles;
}

export function getAllArticles(): Article[] {
  if (process.env.NODE_ENV === 'production' && articlesCache) {
    return articlesCache;
  }
  articlesCache = getAllArticlesUncached();
  return articlesCache;
}

export function getArticleBySlug(slug: string): Article | undefined {
  return getAllArticles().find((a) => a.slug === slug);
}

export function getArticlesByCategory(category: string): Article[] {
  return getAllArticles().filter((a) => a.category === category);
}

export function getArticlesBySubcategory(
  category: string,
  subcategory: string
): Article[] {
  return getAllArticles().filter(
    (a) => a.category === category && a.subcategory === subcategory
  );
}

export function getFeaturedArticles(): Article[] {
  return getAllArticles().filter((a) => a.featured);
}

export function getRecentArticles(count: number): Article[] {
  return getAllArticles().slice(0, count);
}

export function getRelatedArticles(
  article: Article,
  count: number = 4
): Article[] {
  const all = getAllArticles().filter((a) => a.slug !== article.slug);
  // Same subcategory first, then same category
  const sameSubcat = all.filter(
    (a) =>
      a.category === article.category &&
      a.subcategory === article.subcategory
  );
  const sameCat = all.filter(
    (a) =>
      a.category === article.category &&
      a.subcategory !== article.subcategory
  );
  const rest = all.filter((a) => a.category !== article.category);
  return [...sameSubcat, ...sameCat, ...rest].slice(0, count);
}

export function getAllSlugs(): string[] {
  return getAllArticles().map((a) => a.slug);
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  getAllArticles().forEach((a) => a.tags.forEach((t) => tags.add(t)));
  return Array.from(tags).sort();
}

export function paginateArticles(
  articles: Article[],
  page: number,
  perPage: number
): { articles: Article[]; totalPages: number } {
  const totalPages = Math.ceil(articles.length / perPage);
  const start = (page - 1) * perPage;
  return {
    articles: articles.slice(start, start + perPage),
    totalPages,
  };
}
