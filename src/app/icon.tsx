import { ImageResponse } from 'next/og';
import { readFile } from 'fs/promises';
import { join } from 'path';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default async function Icon() {
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
          borderRadius: '4px',
          fontFamily: 'EBGaramond',
          fontSize: 20,
          fontWeight: 500,
        }}
      >
        <span style={{ color: '#C9A84C' }}>[</span>
        <span style={{ color: '#1a1a1a' }}>G</span>
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
