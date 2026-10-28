/**
 * Student avatar images (design-system, 2026-10-29): `/me/avatars/<id>.v<version>.svg`, one static SVG per animal,
 * prerendered at build time from the same drawing data as the picker (components/platform/ui/art/avatar-art.ts).
 * The top bar, boards, player card and headers show an avatar as a plain image, so they load no avatar code at
 * all; the full set only ships in the picker's lazy chunk.
 *
 * - The version is part of the file name, so the images can be cached for a year (immutable) and a redraw
 *   ships under a new URL.
 * - Only the 64 known ids exist (dynamicParams = false): anything else is a 404. With the platform flag off
 *   nothing is generated and every request is a 404 (GEN-4).
 * - The SVG carries fixed colours only (an image cannot read the page's CSS); the background circle is the
 *   page's own `--p-avatar-<bg>` token around the image.
 */
import { platformOn } from '@/components/platform/server/gate';
import { avatarImageFile, parseAvatarImageFile } from '@/components/platform/ui/art/avatar-src';
import { AVATAR_ART_IDS, avatarArt } from '@/components/platform/ui/art/avatar-art';
import { svgString } from '@/components/platform/ui/art/svg-tree';

export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams(): Array<{ file: string }> {
  if (!platformOn()) return [];
  return AVATAR_ART_IDS.map((id) => ({ file: avatarImageFile(id) }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ file: string }> }): Promise<Response> {
  const { file } = await params;
  const id = platformOn() ? parseAvatarImageFile(file) : null;
  const art = id ? avatarArt(id) : null;
  if (!art) return new Response('Not found', { status: 404, headers: { 'content-type': 'text/plain; charset=utf-8' } });
  return new Response(svgString(art), {
    headers: {
      'content-type': 'image/svg+xml; charset=utf-8',
      'cache-control': 'public, max-age=31536000, immutable',
      'x-content-type-options': 'nosniff',
    },
  });
}
