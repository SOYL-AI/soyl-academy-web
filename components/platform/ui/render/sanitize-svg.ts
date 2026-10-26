/**
 * SVG sanitiser (WEB-7, finding F-012, threat AC-19). REVIEWED CODE: change only with a
 * security review and the XSS corpus in __tests__/xss.test.tsx green.
 *
 * Policy = platform/shared/content/svg-allowlist.ts (elements, attributes, SVG_RULES) enforced
 * with DOMPurify, plus rules the allow-list cannot express:
 *   - href only "#fragment"; url(...) only "url(#fragment)" in any attribute;
 *   - no style attribute, no <style>, <script>, <foreignObject>, <a>, <image>, animation;
 *   - class tokens only `diagram-*` (no <style> is allowed, so other classes could only reach
 *     page CSS: a UI-redress risk such as class="fixed inset-0");
 *   - every id is prefixed per diagram and every #ref / url(#ref) rewritten to match, so two
 *     diagrams on one page cannot collide and no diagram can reference (or clobber) page ids;
 *   - no DOCTYPE/ENTITY/processing instructions, size ≤ SVG_RULES.maxBytes, exactly one root
 *     <svg> with a viewBox (synthesised from numeric width/height when missing).
 * Hard failures return { svg: null } so the caller renders the alt text instead.
 *
 * DOM-only (DOMPurify needs a window): runs in the browser (SvgVisual, lazily) and in jsdom tests.
 */
import type { Config, DOMPurify } from 'dompurify';
import { SVG_ALLOWED_ATTRIBUTES, SVG_ALLOWED_ELEMENTS, SVG_RULES } from '@/platform/shared/content/svg-allowlist';

export interface SanitizeResult {
  /** Serialised, sanitised <svg>…</svg>, or null when the input was refused. */
  svg: string | null;
  /** What was stripped (for the admin editor / pipeline report: "reject, don't silently strip"). */
  removed: string[];
  /** Why the input was refused, when svg is null. */
  error?: string;
}

const SVG_NS = 'http://www.w3.org/2000/svg';
const ID_RE = /^[A-Za-z_][\w.:-]{0,63}$/;
const FRAGMENT_RE = /^#([A-Za-z_][\w.:-]{0,63})$/;
const URL_FN_RE = /url\s*\(/i;
const FRAGMENT_URL_RE = /^\s*url\(\s*(['"]?)#([A-Za-z_][\w.:-]{0,63})\1\s*\)\s*$/i;
const CLASS_TOKEN_RE = /^diagram-[a-z0-9-]{1,40}$/;
const REFUSE_RE = /<!DOCTYPE|<!ENTITY|<\?xml-stylesheet|<!\[CDATA\[/i;

const FORBID_TAGS = [
  'script', 'style', 'foreignObject', 'iframe', 'object', 'embed', 'image', 'a', 'animate', 'animateMotion',
  'animateTransform', 'animateColor', 'set', 'feImage', 'switch', 'link', 'meta', 'base', 'audio', 'video', 'canvas',
  'math', 'template', 'noscript', 'handler', 'listener', 'discard', 'filter', 'mask', 'view', 'cursor', 'font', 'font-face',
];

export const SVG_PURIFY_CONFIG: Config = {
  ALLOWED_TAGS: [...SVG_ALLOWED_ELEMENTS],
  ALLOWED_ATTR: [...SVG_ALLOWED_ATTRIBUTES],
  FORBID_TAGS,
  FORBID_ATTR: ['style', 'xlink:href', 'formaction', 'action', 'src', 'srcset', 'background', 'ping'],
  ALLOW_DATA_ATTR: false,
  ALLOW_ARIA_ATTR: false,
  ALLOW_UNKNOWN_PROTOCOLS: false,
  ALLOW_SELF_CLOSE_IN_ATTR: false,
  KEEP_CONTENT: false,
  SAFE_FOR_XML: true,
  SANITIZE_DOM: true,
  WHOLE_DOCUMENT: false,
  RETURN_DOM_FRAGMENT: true,
};

function byteLength(text: string): number {
  return new TextEncoder().encode(text).length;
}

/** Short deterministic hash → per-diagram id prefix (same input gives the same ids: no hydration drift). */
export function idPrefixFor(input: string): string {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return `d${(h >>> 0).toString(36)}-`;
}

function describeNode(node: Node | null | undefined): string {
  if (!node) return 'node';
  return node.nodeType === 1 ? `<${(node as Element).localName}>` : node.nodeName;
}

export type SvgSanitizer = (input: string) => SanitizeResult;

/** Builds a sanitiser around a dedicated DOMPurify instance (hooks never leak to other users). */
export function createSvgSanitizer(purify: DOMPurify): SvgSanitizer {
  let prefix = '';
  let notes: string[] = [];

  purify.addHook('uponSanitizeAttribute', (node, event) => {
    const name = event.attrName.toLowerCase();
    const value = event.attrValue;
    const drop = (why: string) => {
      event.keepAttr = false;
      notes.push(`attribute ${event.attrName} on ${describeNode(node)}: ${why}`);
    };

    if (name.startsWith('on')) return drop('event handler');
    if (name === 'href') {
      const m = FRAGMENT_RE.exec(value.trim());
      if (!m) return drop('href must be a #fragment');
      event.attrValue = `#${prefix}${m[1]}`;
      return;
    }
    if (name === 'id') {
      const v = value.trim();
      if (!ID_RE.test(v)) return drop('invalid id');
      event.attrValue = `${prefix}${v}`;
      return;
    }
    if (name === 'class') {
      const tokens = value.split(/\s+/).filter((t) => CLASS_TOKEN_RE.test(t));
      if (tokens.length === 0) return drop('only diagram-* classes are allowed');
      event.attrValue = tokens.join(' ');
      return;
    }
    if (name === 'xmlns') {
      if (value.trim() !== SVG_NS) return drop('foreign namespace');
      return;
    }
    if (URL_FN_RE.test(value)) {
      const m = FRAGMENT_URL_RE.exec(value);
      if (!m) return drop('url() must reference a #fragment');
      event.attrValue = `url(#${prefix}${m[2]})`;
      return;
    }
    if (/javascript:|data:|vbscript:|expression\s*\(/i.test(value)) return drop('script-like value');
  });

  return function sanitize(input: string): SanitizeResult {
    notes = [];
    if (typeof input !== 'string') return { svg: null, removed: [], error: 'not a string' };
    const trimmed = input.trim();
    if (!trimmed.startsWith('<svg')) return { svg: null, removed: [], error: 'must start with <svg' };
    if (byteLength(trimmed) > SVG_RULES.maxBytes) return { svg: null, removed: [], error: `larger than ${SVG_RULES.maxBytes} bytes` };
    if (REFUSE_RE.test(trimmed)) return { svg: null, removed: [], error: 'DOCTYPE, ENTITY or CDATA is not allowed' };

    prefix = idPrefixFor(trimmed);
    const fragment = purify.sanitize(trimmed, SVG_PURIFY_CONFIG) as unknown as DocumentFragment;
    const removed = [
      ...purify.removed.map((r) =>
        'element' in r ? `element ${describeNode(r.element)}` : `attribute ${r.attribute?.name ?? '?'} on ${describeNode(r.from)}`,
      ),
      ...notes,
    ];

    const roots = Array.from(fragment.childNodes).filter((n) => n.nodeType === 1 || (n.nodeType === 3 && n.textContent?.trim()));
    const root = roots[0] as Element | undefined;
    if (roots.length !== 1 || !root || root.localName !== 'svg' || root.namespaceURI !== SVG_NS) {
      return { svg: null, removed, error: 'expected exactly one <svg> root' };
    }

    if (!root.getAttribute('viewBox')) {
      const w = Number.parseFloat(root.getAttribute('width') ?? '');
      const h = Number.parseFloat(root.getAttribute('height') ?? '');
      if (!(w > 0 && h > 0)) return { svg: null, removed, error: 'viewBox (or numeric width/height) is required' };
      root.setAttribute('viewBox', `0 0 ${w} ${h}`);
    }
    // The container sizes the drawing; the wrapper carries role="img" + aria-label (the visual's alt).
    root.removeAttribute('width');
    root.removeAttribute('height');
    root.removeAttribute('role');
    root.removeAttribute('aria-label');
    root.setAttribute('aria-hidden', 'true');
    root.setAttribute('focusable', 'false');
    root.setAttribute('xmlns', SVG_NS);

    return { svg: root.outerHTML, removed };
  };
}

/**
 * Browser helper: loads DOMPurify on first use (its own chunk, never in the route's first-load JS)
 * and returns a ready sanitiser.
 */
let browserSanitizer: Promise<SvgSanitizer> | null = null;
export function loadBrowserSvgSanitizer(): Promise<SvgSanitizer> {
  if (!browserSanitizer) {
    browserSanitizer = import('dompurify').then((mod) => createSvgSanitizer(mod.default(window)));
  }
  return browserSanitizer;
}
