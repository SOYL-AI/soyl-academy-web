/**
 * A tiny, dependency-free description of an SVG drawing (design-system, 2026-10-29): every piece of original
 * platform artwork (animal avatars, badges, league crests, subject glyphs) is data in this format, so one
 * drawing can be rendered three ways without duplication:
 * - as React elements (`SvgTree.tsx`, inline SVG for the avatar picker and the art sheet);
 * - as a static SVG string (`svgString`, served by the avatar image route: zero client JS);
 * - inspected by tests (every node a known tag, every colour a literal or a token).
 *
 * Attribute names use React's camelCase; `svgString` converts them. Values are numbers or plain strings
 * (no user data ever reaches a drawing, WEB-6).
 */

export type SvgTag = 'g' | 'path' | 'circle' | 'ellipse' | 'rect' | 'polygon';
export type SvgAttrs = Readonly<Record<string, string | number | undefined>>;
export type SvgNode = readonly [tag: SvgTag, attrs: SvgAttrs, children?: readonly SvgNode[]];

export const SVG_TAGS: readonly SvgTag[] = ['g', 'path', 'circle', 'ellipse', 'rect', 'polygon'];

/* Builders -------------------------------------------------------------------------------------- */

const round = (n: number) => Math.round(n * 100) / 100;

export const circle = (cx: number, cy: number, r: number, fill: string, extra: SvgAttrs = {}): SvgNode => ['circle', { cx: round(cx), cy: round(cy), r: round(r), fill, ...extra }];

export const ellipse = (cx: number, cy: number, rx: number, ry: number, fill: string, rotate = 0, extra: SvgAttrs = {}): SvgNode => [
  'ellipse',
  { cx: round(cx), cy: round(cy), rx: round(rx), ry: round(ry), fill, ...(rotate ? { transform: `rotate(${rotate} ${round(cx)} ${round(cy)})` } : {}), ...extra },
];

export const path = (d: string, fill: string, extra: SvgAttrs = {}): SvgNode => ['path', { d, fill, ...extra }];

/** A stroked line or curve (round caps and joins). */
export const line = (d: string, stroke: string, width = 2, extra: SvgAttrs = {}): SvgNode => [
  'path',
  { d, fill: 'none', stroke, strokeWidth: width, strokeLinecap: 'round', strokeLinejoin: 'round', ...extra },
];

export const group = (children: readonly SvgNode[], attrs: SvgAttrs = {}): SvgNode => ['g', attrs, children];

/** The same shapes mirrored around the vertical centre line of a `size` wide drawing. */
export const mirror = (children: readonly SvgNode[], size = 64): SvgNode => ['g', { transform: `matrix(-1 0 0 1 ${size} 0)` }, children];

/** Left-side shapes plus their mirror image (ears, eyes, cheeks…). */
export const pair = (children: readonly SvgNode[], size = 64): SvgNode[] => [...children, mirror(children, size)];

/* String rendering (server) --------------------------------------------------------------------- */

const kebab = (name: string) => name.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);

function escapeAttr(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function nodeString([tag, attrs, children]: SvgNode): string {
  const a = Object.entries(attrs)
    .filter(([, v]) => v !== undefined)
    .map(([k, v]) => ` ${kebab(k)}="${escapeAttr(String(v))}"`)
    .join('');
  if (!children || children.length === 0) return `<${tag}${a}/>`;
  return `<${tag}${a}>${children.map(nodeString).join('')}</${tag}>`;
}

/** A standalone SVG document for an `<img>` (fixed colours: an image cannot read the page's CSS tokens). */
export function svgString(nodes: readonly SvgNode[], viewBox = '0 0 64 64'): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}">${nodes.map(nodeString).join('')}</svg>`;
}

/** Every node in a drawing, depth first (tests). */
export function walk(nodes: readonly SvgNode[], visit: (node: SvgNode) => void): void {
  for (const n of nodes) {
    visit(n);
    if (n[2]) walk(n[2], visit);
  }
}
