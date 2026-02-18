import { ImageResponse } from 'next/og';
import { readFile } from 'fs/promises';
import { join } from 'path';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default async function AppleIcon() {
  const fontData = await readFile(
    join(process.cwd(), 'src/assets/fonts/EBGaramond-Medium.ttf')
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f8f5f0',
          borderRadius: '36px',
          fontFamily: 'EBGaramond',
          fontSize: 72,
          fontWeight: 500,
        }}
      >
        <span style={{ color: '#C9A84C' }}>[</span>
        <span style={{ color: '#1a1a1a', letterSpacing: '-2px' }}>GN</span>
        <span style={{ color: '#C9A84C' }}>]</span>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'EBGaramond', data: fontData.buffer, style: 'normal' as const, weight: 500 as const },
      ],
    }
  );
}
