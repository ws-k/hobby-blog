import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#111827',
          borderRadius: '36px',
          color: '#fff',
          fontSize: 80,
          fontWeight: 900,
          letterSpacing: '-4px',
          fontFamily: 'Georgia, serif',
        }}
      >
        GN
      </div>
    ),
    { ...size }
  );
}
