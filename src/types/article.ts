export type ContentType = 'news' | 'review';

export interface ArticleFrontmatter {
  title: string;
  slug: string;
  date: string;
  category: string;
  subcategory: string;
  contentType: ContentType;
  description: string;
  thumbnail: string;
  thumbnailAlt: string;
  tags: string[];
  source: string;
  sourceUrl: string;
  imageCredit: string;
  readingTime: number;
  featured: boolean;
}

export interface Article extends ArticleFrontmatter {
  content: string;
}

export interface ArticleWithHtml extends Article {
  html: string;
}
