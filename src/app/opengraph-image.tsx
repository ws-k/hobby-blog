import { ImageResponse } from 'next/og';
import { SITE_NAME, SITE_DESCRIPTION } from '@/lib/constants';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = '맨즈랩 OG 이미지';

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0f172a',
          color: '#fff',
          gap: '20px',
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: '#3b82f6',
          }}
        >
          {SITE_NAME}
        </div>
        <div
          style={{
            fontSize: 24,
            color: '#94a3b8',
            maxWidth: '800px',
            textAlign: 'center',
            lineHeight: 1.5,
          }}
        >
          {SITE_DESCRIPTION}
        </div>
      </div>
    ),
    { ...size }
  );
}
