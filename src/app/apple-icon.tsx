import { ImageResponse } from 'next/og';
import { readFile } from 'fs/promises';
import { join } from 'path';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default async function AppleIcon() {
  const fontData = await readFile(
    join(process.cwd(), 'src/assets/fonts/CormorantGaramond-Bold.ttf')
  );

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
          backgroundColor: '#111827',
          borderRadius: '36px',
          fontFamily: 'Cormorant',
        }}
      >
        <div
          style={{
            display: 'flex',
            color: '#E8DFD0',
            fontSize: 76,
            fontWeight: 700,
            letterSpacing: '-2px',
            lineHeight: 1,
          }}
        >
          GN
        </div>
        <div
          style={{
            display: 'flex',
            width: 56,
            height: 2,
            backgroundColor: '#C9A84C',
            marginTop: 10,
            borderRadius: 1,
          }}
        />
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Cormorant', data: fontData.buffer, style: 'normal' as const, weight: 700 as const },
      ],
    }
  );
}
