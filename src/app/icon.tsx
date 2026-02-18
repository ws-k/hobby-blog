import { ImageResponse } from 'next/og';
import { readFile } from 'fs/promises';
import { join } from 'path';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default async function Icon() {
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
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#111827',
          color: '#E8DFD0',
          fontSize: 24,
          fontWeight: 700,
          fontFamily: 'Cormorant',
        }}
      >
        G
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
