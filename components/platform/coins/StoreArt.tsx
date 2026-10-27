/**
 * Placeholder artwork for store items, keyed by `item.image` (ADR-020: artwork pending, OA-19).
 * Plain inline SVG: no external images (WEB-1). Always decorative; the card names the item.
 */
import type { ReactNode } from 'react';

const ART: Record<string, ReactNode> = {
  'frame-saffron': (
    <>
      <circle cx="60" cy="60" r="38" fill="none" stroke="#ff9933" strokeWidth="10" />
      <circle cx="60" cy="60" r="27" fill="#fff4e6" />
      <circle cx="60" cy="52" r="9" fill="#b45f06" />
      <path d="M42 76c4-9 11-12 18-12s14 3 18 12" fill="#b45f06" />
    </>
  ),
  'frame-constellation': (
    <>
      <circle cx="60" cy="60" r="38" fill="none" stroke="#9db0ff" strokeWidth="8" strokeDasharray="2 7" strokeLinecap="round" />
      <circle cx="60" cy="60" r="27" fill="#1b2350" />
      <path d="M45 50l10 6 12-9 8 14-14 8" fill="none" stroke="#f2d45c" strokeWidth="1.5" />
      {[
        [45, 50],
        [55, 56],
        [67, 47],
        [75, 61],
        [61, 69],
      ].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="2.6" fill="#fff8d6" />
      ))}
    </>
  ),
  'theme-midnight': (
    <>
      <rect x="22" y="26" width="76" height="68" rx="10" fill="#141a33" />
      <path d="M72 44a14 14 0 1 0 6 22 11 11 0 0 1-6-22z" fill="#c9d3ff" />
      <rect x="32" y="80" width="40" height="5" rx="2.5" fill="#3155ff" />
      <circle cx="40" cy="42" r="1.8" fill="#fff" />
      <circle cx="52" cy="58" r="1.4" fill="#fff" />
    </>
  ),
  'theme-streak-flame': (
    <>
      <rect x="22" y="26" width="76" height="68" rx="10" fill="#2a1408" />
      <path d="M60 86a16 16 0 0 0 16-16c0-8-6-13-9-21-3 4-5 8-5 12-3-2-5-5-5-9-5 5-13 11-13 18a16 16 0 0 0 16 16z" fill="#ff8a1f" />
      <path d="M60 86a8 8 0 0 0 8-8c0-4-3-7-5-11-2 3-6 6-6 9-2-1-3-2-3-4-1 2-2 4-2 6a8 8 0 0 0 8 8z" fill="#ffd166" />
    </>
  ),
  'sticker-pack': (
    <>
      <rect x="30" y="36" width="44" height="44" rx="10" transform="rotate(-10 52 58)" fill="#f2d45c" />
      <circle cx="72" cy="66" r="20" fill="#3155ff" />
      <path d="M64 66l6 6 10-12" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <text x="50" y="62" textAnchor="middle" fontSize="12" fontWeight="800" fill="#171717" transform="rotate(-10 52 58)">
        SOYL
      </text>
    </>
  ),
  notebook: (
    <>
      <rect x="34" y="24" width="52" height="72" rx="6" fill="#2f3e9e" />
      <rect x="34" y="24" width="10" height="72" rx="3" fill="#1d2766" />
      <rect x="52" y="40" width="26" height="12" rx="2" fill="#f4f0e7" />
      <text x="65" y="49.5" textAnchor="middle" fontSize="8" fontWeight="800" fill="#171717">
        SOYL
      </text>
    </>
  ),
  bottle: (
    <>
      <rect x="50" y="20" width="20" height="10" rx="3" fill="#55554f" />
      <path d="M46 34c0-3 3-5 6-5h16c3 0 6 2 6 5v54a8 8 0 0 1-8 8H54a8 8 0 0 1-8-8V34z" fill="#c9ced8" />
      <rect x="46" y="50" width="28" height="20" fill="#3155ff" />
      <text x="60" y="63" textAnchor="middle" fontSize="8" fontWeight="800" fill="#fff">
        SOYL
      </text>
    </>
  ),
  tee: (
    <>
      <path d="M40 28l-18 12 8 14 10-5v43h40V49l10 5 8-14-18-12c-3 6-8 9-20 9s-17-3-20-9z" fill="#f4f0e7" stroke="#171717" strokeWidth="2" strokeLinejoin="round" />
      <text x="60" y="68" textAnchor="middle" fontSize="11" fontWeight="800" fill="#3155ff">
        SOYL
      </text>
    </>
  ),
  hoodie: (
    <>
      <path d="M44 30c4-8 28-8 32 0l20 14-8 16-8-4v38H40V56l-8 4-8-16 20-14z" fill="#171717" />
      <path d="M48 30c3 10 21 10 24 0" fill="none" stroke="#55554f" strokeWidth="3" />
      <rect x="48" y="72" width="24" height="12" rx="3" fill="#2a2a2a" />
      <text x="60" y="64" textAnchor="middle" fontSize="10" fontWeight="800" fill="#f2d45c">
        SOYL
      </text>
    </>
  ),
  'topper-jacket': (
    <>
      <path d="M42 28l-20 14 8 18 10-5v39h40V55l10 5 8-18-20-14-9 6h-18z" fill="#7a1f1f" />
      <path d="M40 55v39M80 55v39" stroke="#f2d45c" strokeWidth="3" />
      <path d="M60 34v60" stroke="#f4f0e7" strokeWidth="2" strokeDasharray="3 4" />
      <circle cx="70" cy="50" r="7" fill="#f2d45c" />
      <text x="70" y="53" textAnchor="middle" fontSize="7" fontWeight="900" fill="#7a1f1f">
        1
      </text>
    </>
  ),
};

const FALLBACK = (
  <>
    <circle cx="60" cy="60" r="30" fill="#f2d45c" />
    <circle cx="60" cy="60" r="22" fill="none" stroke="#b08a00" strokeWidth="3" />
  </>
);

export function StoreArt({ image, className }: { image: string; className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true" focusable="false" data-art={ART[image] ? image : 'fallback'}>
      {ART[image] ?? FALLBACK}
    </svg>
  );
}
