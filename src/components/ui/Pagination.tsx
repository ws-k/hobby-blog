import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  basePath,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages: (number | '...')[] = [];
  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - 2 && i <= currentPage + 2)
    ) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== '...') {
      pages.push('...');
    }
  }

  const getHref = (page: number) =>
    page === 1 ? basePath : `${basePath}?page=${page}`;

  return (
    <nav aria-label="페이지 네비게이션" className="flex justify-center mt-10">
      <ul className="flex items-center gap-1">
        {currentPage > 1 && (
          <li>
            <Link
              href={getHref(currentPage - 1)}
              className="px-3 py-2 rounded text-sm text-gray-600 hover:bg-gray-100"
            >
              이전
            </Link>
          </li>
        )}
        {pages.map((page, i) =>
          page === '...' ? (
            <li key={`dots-${i}`} className="px-2 text-gray-400">
              ...
            </li>
          ) : (
            <li key={page}>
              <Link
                href={getHref(page)}
                className={`px-3 py-2 rounded text-sm ${
                  page === currentPage
                    ? 'bg-blue-600 text-white font-medium'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {page}
              </Link>
            </li>
          )
        )}
        {currentPage < totalPages && (
          <li>
            <Link
              href={getHref(currentPage + 1)}
              className="px-3 py-2 rounded text-sm text-gray-600 hover:bg-gray-100"
            >
              다음
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
