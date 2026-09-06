import type { Metadata } from 'next';
import { Instrument_Sans, Instrument_Serif } from 'next/font/google';
import { SmoothScrollProvider } from '@/components/motion/SmoothScrollProvider';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import './globals.css';

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-instrument-sans',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  variable: '--font-instrument-serif',
  display: 'swap',
  weight: '400',
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://soylacademy.com'),
  title: {
    default: 'SOYL Academy — Thinking is the work',
    template: '%s | SOYL Academy',
  },
  description:
    'SOYL Academy helps teachers create outcome-based learning experiences that ask students to think, apply, create, explain and defend — not simply submit.',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'SOYL Academy',
    title: 'SOYL Academy — Thinking is the work',
    description:
      'SOYL Academy helps teachers create outcome-based learning experiences that ask students to think, apply, create, explain and defend — not simply submit.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SOYL Academy — Thinking is the work',
    description:
      'SOYL Academy helps teachers create outcome-based learning experiences that ask students to think, apply, create, explain and defend — not simply submit.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${instrumentSans.variable} ${instrumentSerif.variable}`}
    >
      <body className="font-sans antialiased">
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        <SmoothScrollProvider>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
