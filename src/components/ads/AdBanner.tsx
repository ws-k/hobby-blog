'use client';

import { useEffect, useRef, useState } from 'react';
import { ADSENSE_CLIENT_ID } from '@/lib/constants';

interface AdBannerProps {
  slot: string;
  format?: 'auto' | 'horizontal' | 'vertical' | 'rectangle';
  className?: string;
}

export default function AdBanner({
  slot,
  format = 'auto',
  className = '',
}: AdBannerProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // IntersectionObserver 기반 지연 로딩
  useEffect(() => {
    if (!adRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );

    observer.observe(adRef.current);
    return () => observer.disconnect();
  }, []);

  // 광고 로드
  useEffect(() => {
    if (!ADSENSE_CLIENT_ID || !isVisible) return;
    try {
      const w = window as typeof window & { adsbygoogle?: unknown[] };
      (w.adsbygoogle = w.adsbygoogle || []).push({});
    } catch {
      // AdSense not loaded
    }
  }, [isVisible]);

  if (!ADSENSE_CLIENT_ID) {
    return (
      <div
        ref={adRef}
        className={`bg-gray-100 border border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-xs ${className}`}
        style={{ minHeight: '90px' }}
      >
        광고 영역
      </div>
    );
  }

  return (
    <div ref={adRef} className={className}>
      {isVisible && (
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client={ADSENSE_CLIENT_ID}
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
      )}
    </div>
  );
}
