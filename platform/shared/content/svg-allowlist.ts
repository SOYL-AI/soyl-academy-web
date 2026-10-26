/**
 * The one allow-list for SVG diagrams (finding F-012, requirement WEB-7). The pipeline's lint stage
 * rejects SVG that uses anything outside it; the web renderer sanitises to it again before render.
 * Data only — each side uses its own parser.
 */

export const SVG_ALLOWED_ELEMENTS = [
  'svg', 'g', 'defs', 'title', 'desc', 'symbol', 'use',
  'path', 'rect', 'circle', 'ellipse', 'line', 'polyline', 'polygon',
  'text', 'tspan',
  'marker', 'linearGradient', 'radialGradient', 'stop', 'clipPath', 'pattern',
] as const;

export const SVG_ALLOWED_ATTRIBUTES = [
  // structure
  'id', 'class', 'viewBox', 'width', 'height', 'x', 'y', 'x1', 'y1', 'x2', 'y2', 'cx', 'cy', 'r', 'rx', 'ry',
  'd', 'points', 'transform', 'preserveAspectRatio', 'role', 'aria-label', 'aria-hidden', 'xmlns',
  // presentation
  'fill', 'fill-opacity', 'fill-rule', 'stroke', 'stroke-width', 'stroke-opacity', 'stroke-dasharray',
  'stroke-linecap', 'stroke-linejoin', 'opacity', 'font-size', 'font-weight', 'font-family', 'font-style',
  'text-anchor', 'dominant-baseline', 'letter-spacing',
  // markers, gradients, clipping
  'marker-start', 'marker-mid', 'marker-end', 'markerWidth', 'markerHeight', 'refX', 'refY', 'orient',
  'markerUnits', 'offset', 'stop-color', 'stop-opacity', 'gradientUnits', 'gradientTransform', 'fx', 'fy',
  'clip-path', 'clipPathUnits', 'patternUnits', 'patternTransform', 'dx', 'dy',
  // <use> may only reference fragments in the same document (checked separately)
  'href',
] as const;

/** Rules the allow-list alone cannot express; both checkers enforce them. */
export const SVG_RULES = {
  /** href / url(...) may only point at same-document fragments (#id). */
  fragmentOnlyReferences: true,
  /** No on* event handlers, no <script>, <foreignObject>, <image>, <a>, <style>, <animate*>. */
  forbidEventHandlers: true,
  /** No inline style attributes (CSS can carry url() and expressions). */
  forbidStyleAttribute: true,
  maxBytes: 60_000,
} as const;

/** Colours diagrams should use, so they read in light and dark mode. Renderers map these to theme tokens. */
export const DIAGRAM_PALETTE = ['currentColor', 'none', 'var(--diagram-accent)', 'var(--diagram-muted)', 'var(--diagram-fill)'] as const;
