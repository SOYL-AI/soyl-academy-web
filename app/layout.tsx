import type { Metadata, Viewport } from 'next';
import { Inter, Instrument_Serif, Newsreader } from 'next/font/google';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CookieConsent } from '@/components/legal/CookieConsent';
import { CONSENT_BOOT_SCRIPT } from '@/components/legal/consent';
import { ConsentedAnalytics } from '@/components/legal/ConsentedAnalytics';
import { StructuredData } from '@/components/seo/StructuredData';
import { RevealObserver } from '@/components/motion/RevealObserver';
import {
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_LEGAL_NAME,
  SITE_LOCALE,
  SITE_NAME,
  SITE_URL,
} from '@/lib/seo/config';
import { ogImageUrl } from '@/lib/seo/metadata';
import { HOME_TITLE } from '@/lib/seo/pages';
import { graph, organizationNode, websiteNode } from '@/lib/seo/schema';
import './globals.css';

// Body face, shared with the product app (the platform UI kit reads --font-inter).
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

// Display serif for the marketing pages. One static weight per style keeps each
// file small. `optional`: the headline never re-flows when the font arrives late
// (no layout shift); on a first, very slow visit the size-adjusted fallback stays.
const newsreader = Newsreader({
  subsets: ['latin'],
  variable: '--font-newsreader',
  display: 'optional',
  weight: '400',
  style: 'normal',
});

// Italic accents in headlines.
const newsreaderItalic = Newsreader({
  subsets: ['latin'],
  variable: '--font-newsreader-italic',
  display: 'optional',
  weight: '400',
  style: 'italic',
});

// Kept for the learning platform's UI kit (--font-instrument-serif). The marketing
// pages no longer use it, so it is not preloaded.
const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  variable: '--font-instrument-serif',
  display: 'swap',
  weight: '400',
  style: 'normal',
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: {
    default: HOME_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_LEGAL_NAME,
  publisher: SITE_LEGAL_NAME,
  category: 'education',
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: 'website',
    locale: SITE_LOCALE,
    siteName: SITE_NAME,
    title: HOME_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    images: [{ url: ogImageUrl('/'), width: 1200, height: 630, alt: HOME_TITLE }],
  },
  twitter: {
    card: 'summary_large_image',
    title: HOME_TITLE,
    description: SITE_DESCRIPTION,
    images: [{ url: ogImageUrl('/'), alt: HOME_TITLE }],
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
  },
  alternates: {
    types: { 'application/rss+xml': [{ url: '/feed.xml', title: `${SITE_NAME} Journal` }] },
  },
  // Search Console / Bing Webmaster verification — set the env vars, no code change needed.
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    other: process.env.BING_SITE_VERIFICATION
      ? { 'msvalidate.01': process.env.BING_SITE_VERIFICATION }
      : undefined,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#FFFFFF',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // suppressHydrationWarning: the consent boot script may add data-consent before React hydrates.
    <html lang="en-IN" className={`${inter.variable} ${newsreader.variable} ${newsreaderItalic.variable} ${instrumentSerif.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: CONSENT_BOOT_SCRIPT }} />
      </head>
      <body className="font-sans antialiased">
        <StructuredData data={graph(organizationNode(), websiteNode())} />
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <CookieConsent />
        <ConsentedAnalytics />
        <RevealObserver />
      </body>
    </html>
  );
}
