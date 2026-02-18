import Link from 'next/link';
import { SITE_NAME } from '@/lib/constants';
import { CATEGORIES } from '@/lib/categories';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-12">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {CATEGORIES.slice(0, 4).map((cat) => (
            <div key={cat.slug}>
              <h3 className="text-white font-semibold mb-3">{cat.name}</h3>
              <ul className="space-y-1.5">
                {cat.subcategories.map((sub) => (
                  <li key={sub.slug}>
                    <Link
                      href={`/${cat.slug}/${sub.slug}`}
                      className="text-sm hover:text-white transition-colors"
                    >
                      {sub.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-8">
          {CATEGORIES.slice(4).map((cat) => (
            <div key={cat.slug}>
              <h3 className="text-white font-semibold mb-3">{cat.name}</h3>
              <ul className="space-y-1.5">
                {cat.subcategories.map((sub) => (
                  <li key={sub.slug}>
                    <Link
                      href={`/${cat.slug}/${sub.slug}`}
                      className="text-sm hover:text-white transition-colors"
                    >
                      {sub.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm">
            <Link href="/about" className="hover:text-white">
              소개
            </Link>
            <Link href="/privacy" className="font-bold hover:text-white">
              개인정보처리방침
            </Link>
            <Link href="/feed" className="hover:text-white">
              RSS
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
