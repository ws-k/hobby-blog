import type { Metadata } from 'next';
import { Playfair_Display } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { getBaseMetadata } from '@/lib/seo';
import { WebSiteJsonLd } from '@/components/seo/JsonLd';
import { ADSENSE_CLIENT_ID, GA_MEASUREMENT_ID } from '@/lib/constants';
import GA4Events from '@/components/analytics/GA4Events';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  ...getBaseMetadata(),
  verification: {
    google: 'j2819kaZYoHw7AFPqZ3Cww0z4CUO1v0HFczuxEENmUA',
    other: {
      'naver-site-verification': '467400d896028e133880d04384454363a057bd59',
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={playfair.variable}>
      <head>
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        <WebSiteJsonLd />
      </head>
      <body className="antialiased min-h-screen flex flex-col">
        {children}
        <GA4Events />

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-MR2CWL1QTB"
          strategy="afterInteractive"
        />
        <Script id="ga4" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-MR2CWL1QTB');
          `}
        </Script>

        {/* AdSense */}
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3585350861428531"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
      </body>
    </html>
  );
}
