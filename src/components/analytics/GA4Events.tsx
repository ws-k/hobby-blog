'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { GA_MEASUREMENT_ID } from '@/lib/constants';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function trackEvent(action: string, params: Record<string, unknown>) {
  if (!GA_MEASUREMENT_ID || !window.gtag) return;
  window.gtag('event', action, params);
}

// 페이지뷰 추적
function usePageView() {
  const pathname = usePathname();

  useEffect(() => {
    trackEvent('page_view', {
      page_path: pathname,
    });
  }, [pathname]);
}

// 스크롤 깊이 추적 (25%, 50%, 75%, 100%)
function useScrollDepth() {
  useEffect(() => {
    const milestones = [25, 50, 75, 100];
    const reached = new Set<number>();

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;
      const percent = Math.round((window.scrollY / scrollHeight) * 100);

      for (const milestone of milestones) {
        if (percent >= milestone && !reached.has(milestone)) {
          reached.add(milestone);
          trackEvent('scroll_depth', {
            depth_percent: milestone,
            page_path: window.location.pathname,
          });
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
}

// 기사 읽기 시간 추적
function useReadingTime() {
  useEffect(() => {
    const startTime = Date.now();

    const handleBeforeUnload = () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      trackEvent('time_on_page', {
        seconds: timeSpent,
        page_path: window.location.pathname,
      });
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);
}

export default function GA4Events() {
  usePageView();
  useScrollDepth();
  useReadingTime();
  return null;
}

// 외부 링크 클릭 추적 유틸
export function trackOutboundClick(url: string) {
  trackEvent('outbound_click', {
    url,
    page_path: window.location.pathname,
  });
}

// 공유 버튼 클릭 추적 유틸
export function trackShare(method: string, slug: string) {
  trackEvent('share', {
    method,
    content_id: slug,
  });
}
