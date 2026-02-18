'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SearchBar from '@/components/ui/SearchBar';
import ArticleGrid from '@/components/article/ArticleGrid';
import { Article } from '@/types/article';

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    setLoading(true);
    fetch(`/api/search?q=${encodeURIComponent(query)}`)
      .then((res) => res.json())
      .then((data) => {
        setResults(data.articles || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [query]);

  return (
    <>
      {query && (
        <p className="mt-4 text-sm text-gray-500">
          &quot;{query}&quot; 검색 결과 {results.length}건
        </p>
      )}
      {loading ? (
        <div className="text-center py-12 text-gray-500">검색 중...</div>
      ) : (
        <div className="mt-6">
          <ArticleGrid articles={results} />
        </div>
      )}
    </>
  );
}

export default function SearchPage() {
  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-8 flex-1">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">검색</h1>
        <SearchBar />
        <Suspense
          fallback={
            <div className="text-center py-12 text-gray-500">로딩 중...</div>
          }
        >
          <SearchResults />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
