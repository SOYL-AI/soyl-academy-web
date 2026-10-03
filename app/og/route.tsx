import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { getOgContent } from '@/lib/seo/pages';

/**
 * Branded 1200×630 social card for any indexable page.
 *
 *   /og?path=/method
 *   /og?path=/journal/why-outcomes-matter
 *
 * The card text is resolved server-side from the page registry / journal
 * content, never from the query string, so this endpoint cannot be abused to
 * render arbitrary text on the SOYL domain.
 */

const logoData = await readFile(join(process.cwd(), 'public', 'logo.png'), 'base64');
const logoSrc = `data:image/png;base64,${logoData}`;

const SIZE = { width: 1200, height: 630 };

export async function GET(request: Request) {
  const path = new URL(request.url).searchParams.get('path') ?? '/';
  const { eyebrow, title, description } = getOgContent(path);

  const titleSize = title.length > 48 ? 64 : title.length > 28 ? 80 : 96;
  const shortDescription =
    description.length > 140 ? `${description.slice(0, 137).trimEnd()}…` : description;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#F4F0E7',
          padding: '64px 72px',
          color: '#171717',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logoSrc} width={64} height={64} alt="" style={{ borderRadius: 16 }} />
            <div style={{ display: 'flex', fontSize: 34, fontWeight: 700, letterSpacing: -1 }}>
              soyl
              <span style={{ color: '#3155FF' }}>.</span>
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 22,
              letterSpacing: 4,
              textTransform: 'uppercase',
              color: '#6B6B68',
            }}
          >
            {eyebrow}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              fontSize: titleSize,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -2.5,
              maxWidth: 1000,
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: 'flex',
              marginTop: 28,
              fontSize: 30,
              lineHeight: 1.35,
              color: '#6B6B68',
              maxWidth: 960,
            }}
          >
            {shortDescription}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: 10 }}>
            <div style={{ width: 56, height: 8, background: '#3155FF' }} />
            <div style={{ width: 56, height: 8, background: '#D84A3F' }} />
            <div style={{ width: 56, height: 8, background: '#F2D45C' }} />
          </div>
          <div style={{ display: 'flex', fontSize: 24, color: '#6B6B68' }}>SOYL Academy</div>
        </div>
      </div>
    ),
    {
      ...SIZE,
      headers: {
        'Cache-Control': 'public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400',
      },
    }
  );
}
