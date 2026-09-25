import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Footer from '@/components/Footer';
import Analytics from '@/components/Analytics';
import JsonLd from '@/components/JsonLd';
import { siteGraph } from '@/lib/schema';
import { ogImageUrl } from '@/lib/og';
import { BASE_URL, SITE_NAME, PERSON_NAME, GA_MEASUREMENT_ID } from '@/lib/site';
import { PROFILE } from '@/lib/content';
import { BRAND_SUFFIX } from '@/lib/seo-title';

/**
 * Sora, self-hosted. The four weights the brand uses; latin subset. Files
 * are vendored under app/fonts (SIL Open Font License, see LICENSE-OFL.txt)
 * so the build has no dependency on Google Fonts.
 */
const sora = localFont({
  src: [
    { path: './fonts/sora-latin-300-normal.woff2', weight: '300', style: 'normal' },
    { path: './fonts/sora-latin-400-normal.woff2', weight: '400', style: 'normal' },
    { path: './fonts/sora-latin-500-normal.woff2', weight: '500', style: 'normal' },
    { path: './fonts/sora-latin-600-normal.woff2', weight: '600', style: 'normal' },
  ],
  variable: '--font-sora',
  display: 'swap',
  fallback: ['Avenir Next', 'Segoe UI', 'sans-serif'],
});

const OG_IMAGE = ogImageUrl({
  title: PERSON_NAME,
  eyebrow: SITE_NAME,
  subtitle: 'Health and safety across London and the South East.',
});

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  // The template is appended to every page title, so it has to be cheap:
  // " | Laws Safety" is 14 of the ~60 characters Google shows. See
  // lib/seo-title.ts for the budget page titles are written against.
  title: {
    default: `${PERSON_NAME} | ${SITE_NAME}`,
    template: `%s${BRAND_SUFFIX}`,
  },
  description: `${PERSON_NAME} CMIOSH, chartered health and safety professional in Kent: what he has done since 2011, what he knows, and his guides to the law.`,
  applicationName: SITE_NAME,
  authors: [{ name: PERSON_NAME, url: BASE_URL }],
  creator: PERSON_NAME,
  publisher: SITE_NAME,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large', 'max-video-preview': -1 },
  },
  alternates: {
    canonical: BASE_URL,
    languages: { 'en-GB': BASE_URL, 'x-default': BASE_URL },
    types: { 'application/rss+xml': `${BASE_URL}/rss.xml` },
  },
  openGraph: {
    type: 'profile',
    locale: 'en_GB',
    url: BASE_URL,
    siteName: SITE_NAME,
    title: `${PERSON_NAME} | ${SITE_NAME}`,
    description: `${PERSON_NAME} CMIOSH, chartered health and safety professional working across London and the South East.`,
    firstName: PROFILE.givenName,
    lastName: PROFILE.familyName,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: `${PERSON_NAME}, ${SITE_NAME}` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${PERSON_NAME} | ${SITE_NAME}`,
    description: `${PERSON_NAME} CMIOSH, chartered health and safety professional working across London and the South East.`,
    images: [OG_IMAGE],
  },
  icons: {
    icon: [
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon.png',
    apple: '/apple-touch-icon.png',
  },
  verification: {
    // Set GOOGLE_SITE_VERIFICATION and BING_SITE_VERIFICATION in Vercel once
    // the properties exist; nothing renders while they are unset.
    ...(process.env.GOOGLE_SITE_VERIFICATION ? { google: process.env.GOOGLE_SITE_VERIFICATION } : {}),
    ...(process.env.BING_SITE_VERIFICATION ? { other: { 'msvalidate.01': process.env.BING_SITE_VERIFICATION } } : {}),
  },
  other: {
    'msapplication-TileColor': '#0a1426',
  },
};

export const viewport: Viewport = {
  themeColor: '#0a1426',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB" className={sora.variable}>
      <head>
        <JsonLd id="site-graph" data={siteGraph()} />
      </head>
      <body className="font-sans antialiased bg-surface text-ink">
        {children}
        <Footer />
        <Analytics gaId={GA_MEASUREMENT_ID} />
      </body>
    </html>
  );
}
