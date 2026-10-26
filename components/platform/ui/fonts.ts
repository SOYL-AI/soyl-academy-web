import { Noto_Sans_Devanagari } from 'next/font/google';

/**
 * Noto Sans Devanagari for Hindi (and other Devanagari) content, self-hosted by next/font at
 * build time as one variable font file (no request to Google at runtime, WEB-1), `display: swap`, Devanagari subset only
 * (Latin text keeps the site's Inter).
 *
 * Contract: put `notoDevanagari.variable` on the element that wraps platform pages (the
 * (platform) layout). It defines `--font-noto-devanagari`, which tokens.css uses in
 * `--p-font-sans` (per-glyph fallback for mixed Hinglish text) and `--p-font-devanagari`
 * (for `lang="hi"` subtrees).
 */
export const notoDevanagari = Noto_Sans_Devanagari({
  subsets: ['devanagari'],
  display: 'swap',
  variable: '--font-noto-devanagari',
  preload: true,
  adjustFontFallback: false,
});
