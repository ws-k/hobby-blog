'use client';

import { SITE_URL } from '@/lib/constants';
import { trackShare } from '@/components/analytics/GA4Events';

interface ShareButtonsProps {
  title: string;
  slug: string;
  description?: string;
}

export default function ShareButtons({
  title,
  slug,
  description = '',
}: ShareButtonsProps) {
  const url = `${SITE_URL}/article/${slug}`;

  const handleKakaoShare = () => {
    const kakaoUrl = `https://story.kakao.com/share?url=${encodeURIComponent(url)}`;
    window.open(kakaoUrl, '_blank', 'width=600,height=400');
    trackShare('kakao', slug);
  };

  const handleTwitterShare = () => {
    trackShare('twitter', slug);
  };

  const handleFacebookShare = () => {
    trackShare('facebook', slug);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      alert('링크가 복사되었습니다.');
    } catch {
      const input = document.createElement('input');
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      alert('링크가 복사되었습니다.');
    }
    trackShare('copy_link', slug);
  };

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium text-gray-500">공유:</span>

      {/* 카카오톡 */}
      <button
        onClick={handleKakaoShare}
        className="p-2 rounded-full bg-[#FEE500] hover:bg-[#FDD835] text-[#3C1E1E] transition-colors"
        aria-label="카카오 공유"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 3C6.48 3 2 6.58 2 10.9c0 2.78 1.8 5.22 4.51 6.6-.2.73-.72 2.65-.83 3.06-.13.5.18.5.39.36.16-.1 2.59-1.76 3.63-2.48.75.11 1.52.16 2.3.16 5.52 0 10-3.58 10-7.9S17.52 3 12 3z" />
        </svg>
      </button>

      {/* 트위터/X */}
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
        aria-label="트위터 공유"
        onClick={handleTwitterShare}
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </a>

      {/* 페이스북 */}
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
        aria-label="페이스북 공유"
        onClick={handleFacebookShare}
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      </a>

      {/* 링크 복사 */}
      <button
        onClick={handleCopyLink}
        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
        aria-label="링크 복사"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
          />
        </svg>
      </button>
    </div>
  );
}
