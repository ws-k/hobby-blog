'use client';

import { useEffect, useState } from 'react';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export default function TOC({ html }: { html: string }) {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const matches = html.matchAll(/<h([23])\s+id="([^"]*)"[^>]*>(.*?)<\/h[23]>/gi);
    const items: TocItem[] = [];
    for (const match of matches) {
      items.push({
        level: parseInt(match[1]),
        id: match[2],
        text: match[3].replace(/<[^>]+>/g, ''),
      });
    }
    setHeadings(items);
  }, [html]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-80px 0px -80% 0px' }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 2) return null;

  return (
    <nav className="bg-gray-50 rounded-lg p-4 mb-8">
      <h2 className="font-bold text-gray-900 mb-3 text-sm">목차</h2>
      <ul className="space-y-1.5">
        {headings.map((h) => (
          <li key={h.id} style={{ paddingLeft: `${(h.level - 2) * 16}px` }}>
            <a
              href={`#${h.id}`}
              className={`text-sm block py-0.5 transition-colors ${
                activeId === h.id
                  ? 'text-blue-600 font-medium'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
