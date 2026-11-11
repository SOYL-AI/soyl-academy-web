import localFont from 'next/font/local';

/**
 * The marketing brand faces (ADR-028): Zodiak for display, Switzer for text, self-hosted from the git-ignored
 * `assets/fonts/` that `scripts/fetch-fonts.mjs` fills on install, dev and build (the files are never committed:
 * the ITF Free Font License forbids redistributing them, and this repository is public).
 *
 * Each has a metric-matched fallback (`adjustFontFallback`), so text keeps its size and line breaks while the
 * file loads, and also when the build had to use the glyphless placeholder (no network): then every character
 * renders in the adjusted Times New Roman / Arial.
 *
 * Coverage: Switzer has no rupee sign (U+20B9) and neither face has Devanagari or arrows (→). Set prices in
 * Zodiak (it has ₹), keep Noto Sans Devanagari for Hindi (ADR-023), and draw arrows as SVG.
 */

/** Display: headlines, the one italic "ask" line per screen, big numbers. */
export const zodiak = localFont({
  src: [
    { path: '../assets/fonts/zodiak-400.woff2', weight: '400', style: 'normal' },
    { path: '../assets/fonts/zodiak-400-italic.woff2', weight: '400', style: 'italic' },
  ],
  variable: '--font-zodiak',
  // A headline never re-flows when the face arrives late; on a first, very slow visit the adjusted fallback stays.
  display: 'optional',
  adjustFontFallback: 'Times New Roman',
  fallback: ['Georgia', 'Times New Roman', 'serif'],
});

/** Text and interface. */
export const switzer = localFont({
  src: [
    { path: '../assets/fonts/switzer-400.woff2', weight: '400', style: 'normal' },
    { path: '../assets/fonts/switzer-500.woff2', weight: '500', style: 'normal' },
    { path: '../assets/fonts/switzer-600.woff2', weight: '600', style: 'normal' },
  ],
  variable: '--font-switzer',
  display: 'swap',
  adjustFontFallback: 'Arial',
  fallback: ['system-ui', '-apple-system', 'Segoe UI', 'Arial', 'sans-serif'],
});
