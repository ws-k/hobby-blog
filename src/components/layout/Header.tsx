'use client';

import Link from 'next/link';
import { useState } from 'react';
import { CATEGORIES } from '@/lib/categories';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      {/* Top bar */}
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="text-[30px] tracking-[0.02em] text-gray-900"
          style={{ fontFamily: 'var(--font-logo), Georgia, serif', fontWeight: 700 }}
        >
          GUYNOTE
        </Link>
        <div className="flex items-center gap-3">
          <Link
            href="/search"
            className="p-2 text-gray-600 hover:text-gray-900"
            aria-label="검색"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </Link>
          <button
            className="md:hidden p-2 text-gray-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="메뉴"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Desktop GNB */}
      <nav className="hidden md:block border-t border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex gap-0">
            {CATEGORIES.map((cat) => (
              <li
                key={cat.slug}
                className="relative"
                onMouseEnter={() => setActiveCategory(cat.slug)}
                onMouseLeave={() => setActiveCategory(null)}
              >
                <Link
                  href={`/${cat.slug}`}
                  className="block px-4 py-3 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                >
                  {cat.name}
                </Link>
                {activeCategory === cat.slug && cat.subcategories.length > 0 && (
                  <div className="absolute left-0 top-full bg-white border border-gray-200 shadow-lg rounded-b-lg min-w-[160px] z-50">
                    {cat.subcategories.map((sub) => (
                      <Link
                        key={sub.slug}
                        href={`/${cat.slug}/${sub.slug}`}
                        className="block px-4 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <nav className="md:hidden border-t border-gray-200 bg-white max-h-[70vh] overflow-y-auto">
          {CATEGORIES.map((cat) => (
            <div key={cat.slug} className="border-b border-gray-100">
              <Link
                href={`/${cat.slug}`}
                className="block px-4 py-3 font-medium text-gray-800"
                onClick={() => setMobileMenuOpen(false)}
              >
                {cat.name}
              </Link>
              <div className="pl-8 pb-2">
                {cat.subcategories.map((sub) => (
                  <Link
                    key={sub.slug}
                    href={`/${cat.slug}/${sub.slug}`}
                    className="block py-1.5 text-sm text-gray-500 hover:text-blue-600"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {sub.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>
      )}
    </header>
  );
}
