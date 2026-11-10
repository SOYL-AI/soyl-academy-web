import type { ReactNode } from 'react';
import { Newsreader } from 'next/font/google';

/**
 * Future Builders keeps its own look while the rest of the marketing site moves to "Ink and wash"
 * (docs/redesign-ink-and-wash.md §3.3, ADR-028): only the shared header and footer change. `.brand-legacy`
 * (app/globals.css) restores the colour names, the ground and the fonts these pages were built with, and the
 * Newsreader faces they use are loaded here, so no other page pays for them.
 */
const newsreader = Newsreader({
  subsets: ['latin'],
  variable: '--font-newsreader',
  display: 'optional',
  weight: '400',
  style: 'normal',
});

const newsreaderItalic = Newsreader({
  subsets: ['latin'],
  variable: '--font-newsreader-italic',
  display: 'optional',
  weight: '400',
  style: 'italic',
});

export default function FutureBuildersLayout({ children }: { children: ReactNode }) {
  return <div className={`brand-legacy ${newsreader.variable} ${newsreaderItalic.variable}`}>{children}</div>;
}
