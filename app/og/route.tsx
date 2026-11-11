import { ImageResponse } from 'next/og';
import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { getOgContent } from '@/lib/seo/pages';
import { SITE_URL } from '@/lib/seo/config';

/**
 * The 1200×630 share card for any indexable page, in Ink and wash (DESIGN.md): paper ground, the title in Zodiak
 * with one drawn stroke under it, and the painted ring on the right, closed, over its wash.
 *
 *   /og?path=/method
 *   /og?path=/journal/why-outcomes-matter
 *
 * The card text is resolved server-side from the page registry / journal content, never from the query string,
 * so this endpoint cannot be abused to render arbitrary text on the SOYL domain.
 *
 * Fonts: satori reads WOFF, not WOFF2, so scripts/fetch-fonts.mjs also fetches zodiak-400.woff and
 * switzer-500.woff into the git-ignored assets/fonts/. When they are missing (no network at build time) the card
 * still renders, in the default font.
 */

// Every path is written out in full so output file tracing can see it and ship the file with the route.
// PNG copies of the plates (tools/art/og.py): satori does not read WebP.
const stagePath = join(process.cwd(), 'app', 'og', 'stage.png');
const strokePath = join(process.cwd(), 'app', 'og', 'stroke.png');
const zodiakPath = join(process.cwd(), 'assets', 'fonts', 'zodiak-400.woff');
const switzerPath = join(process.cwd(), 'assets', 'fonts', 'switzer-500.woff');

const [stage, stroke, zodiak, switzer] = await Promise.all([
  readFile(stagePath, 'base64').then((b) => `data:image/png;base64,${b}`),
  readFile(strokePath, 'base64').then((b) => `data:image/png;base64,${b}`),
  // A missing font means the build had no network (scripts/fetch-fonts.mjs); the card uses its default font.
  existsSync(zodiakPath) ? readFile(zodiakPath) : null,
  existsSync(switzerPath) ? readFile(switzerPath) : null,
]);
const fonts = [
  ...(zodiak ? [{ name: 'Zodiak', data: zodiak, weight: 400 as const, style: 'normal' as const }] : []),
  ...(switzer ? [{ name: 'Switzer', data: switzer, weight: 500 as const, style: 'normal' as const }] : []),
];

const SIZE = { width: 1200, height: 630 };
const PAPER = '#FBFAF7';
const INK = '#1B1A19';
const GRAPHITE = '#4A4744';
const MUTED = '#6B6762';

export async function GET(request: Request) {
  const path = new URL(request.url).searchParams.get('path') ?? '/';
  const { eyebrow, title, description } = getOgContent(path);

  const titleSize = title.length > 52 ? 60 : title.length > 34 ? 72 : 88;
  const shortDescription = description.length > 120 ? `${description.slice(0, description.lastIndexOf(' ', 117)).trimEnd()}…` : description;
  const host = new URL(SITE_URL).host.replace(/^www\./, '');

  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', position: 'relative', background: PAPER, color: INK, fontFamily: 'Switzer' }}>
        {/* The ring, closed, over its wash: bleeding off the right edge so the text keeps the room. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={stage} width={620} height={620} alt="" style={{ position: 'absolute', right: -125, top: 18 }} />

        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: 760, height: '100%', padding: '60px 0 56px 72px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 18 }}>
            <div style={{ display: 'flex', fontSize: 30, letterSpacing: -0.4 }}>SOYL Academy</div>
            {eyebrow !== 'SOYL Academy' ? <div style={{ display: 'flex', fontSize: 22, color: MUTED }}>{eyebrow}</div> : null}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', fontFamily: 'Zodiak', fontSize: titleSize, lineHeight: 1.02, letterSpacing: -1.8 }}>{title}</div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={stroke} width={300} height={24} alt="" style={{ marginTop: 18 }} />
            <div style={{ display: 'flex', marginTop: 26, fontSize: 28, lineHeight: 1.38, color: GRAPHITE, maxWidth: 640 }}>{shortDescription}</div>
          </div>

          <div style={{ display: 'flex', fontSize: 22, color: MUTED }}>{host}</div>
        </div>
      </div>
    ),
    {
      ...SIZE,
      fonts: fonts.length ? fonts : undefined,
      headers: {
        'Cache-Control': 'public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400',
      },
    }
  );
}
