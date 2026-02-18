import { NextRequest, NextResponse } from 'next/server';
import { getAllArticles } from '@/lib/content';

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('q')?.toLowerCase() || '';
  if (!query) {
    return NextResponse.json({ articles: [] });
  }

  const allArticles = getAllArticles();
  const results = allArticles.filter(
    (a) =>
      a.title.toLowerCase().includes(query) ||
      a.description.toLowerCase().includes(query) ||
      a.tags.some((t) => t.toLowerCase().includes(query))
  );

  // Return without content field to reduce payload
  const articles = results.slice(0, 20).map(({ content: _, ...rest }) => rest);
  return NextResponse.json({ articles });
}
