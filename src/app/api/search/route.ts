import { NextRequest, NextResponse } from 'next/server';
import Fuse, { type IFuseOptions } from 'fuse.js';
import { getAllArticles } from '@/lib/content';

type ArticleItem = ReturnType<typeof getAllArticles>[number];

const fuseOptions: IFuseOptions<ArticleItem> = {
  keys: [
    { name: 'title', weight: 0.4 },
    { name: 'description', weight: 0.3 },
    { name: 'tags', weight: 0.2 },
    { name: 'category', weight: 0.05 },
    { name: 'subcategory', weight: 0.05 },
  ],
  threshold: 0.4,
  includeScore: true,
  minMatchCharLength: 2,
};

let fuse: Fuse<ArticleItem> | null = null;

function getFuse() {
  if (!fuse) {
    fuse = new Fuse(getAllArticles(), fuseOptions);
  }
  return fuse;
}

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('q') || '';
  if (!query || query.length < 2) {
    return NextResponse.json({ articles: [] });
  }

  const results = getFuse().search(query, { limit: 20 });
  const articles = results.map(({ item: { content: _, ...rest } }) => rest);
  return NextResponse.json({ articles });
}
