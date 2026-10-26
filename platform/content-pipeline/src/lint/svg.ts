/**
 * Raw SVG check against the one allow-list (platform/shared/content/svg-allowlist.ts, F-012,
 * WEB-7, AC-19). Parsed with a strict XML parser (saxes), never regexes, and REJECTED rather than
 * stripped so reviewers see the problem. Rejected: DOCTYPE/entities, processing instructions,
 * CDATA, non-SVG namespaces, elements and attributes outside the allow-list, on* handlers, style
 * attributes, hrefs other than #fragment, url() other than url(#id), javascript:/data: anywhere,
 * classes outside the diagram-* theme classes, files over SVG_RULES.maxBytes, a root without viewBox.
 * Hard-coded colours are a warning (they may vanish in dark mode).
 */
import { SaxesParser, type SaxesAttributeNS, type SaxesTagNS } from 'saxes';
import { DIAGRAM_PALETTE, SVG_ALLOWED_ATTRIBUTES, SVG_ALLOWED_ELEMENTS, SVG_RULES } from '@soyl/shared/content/svg-allowlist';

export const SVG_NS = 'http://www.w3.org/2000/svg';
const XMLNS_NS = 'http://www.w3.org/2000/xmlns/';

export interface SvgCheck {
  errors: string[];
  warnings: string[];
  /** Text content of <text>/<tspan>/<title>/<desc>, for the banned-content checks. */
  texts: string[];
}

const ELEMENTS = new Set<string>(SVG_ALLOWED_ELEMENTS);
const ATTRIBUTES = new Set<string>(SVG_ALLOWED_ATTRIBUTES);
const CLASS_RE = new RegExp(SVG_RULES.classPattern);
const FRAGMENT_RE = /^#[A-Za-z_][\w.-]*$/;
const DANGEROUS_SCHEME = /(?:java|vb)script\s*:|data\s*:|livescript\s*:/i;
const COLOUR_ATTRS = new Set(['fill', 'stroke', 'stop-color']);
const PALETTE = new Set<string>(DIAGRAM_PALETTE);

const WHY_ELEMENT: Record<string, string> = {
  script: 'scripts are never allowed',
  foreignObject: '<foreignObject> can embed HTML',
  style: '<style> can carry url() and @import',
  image: '<image> loads external resources',
  a: 'links are not allowed in diagrams',
  iframe: 'frames are not allowed',
  object: 'embedded objects are not allowed',
  embed: 'embedded objects are not allowed',
  animate: 'animation can rewrite attributes (e.g. href) at runtime',
  set: 'animation can rewrite attributes (e.g. href) at runtime',
  animateTransform: 'animation is not allowed',
  animateMotion: 'animation is not allowed',
  filter: 'filters are not on the allow-list',
  feImage: 'filters can load external images',
};

export function checkSvg(svg: string): SvgCheck {
  const errors: string[] = [];
  const warnings: string[] = [];
  const texts: string[] = [];
  const bytes = Buffer.byteLength(svg, 'utf8');
  if (bytes > SVG_RULES.maxBytes) errors.push(`SVG is ${bytes} bytes (max ${SVG_RULES.maxBytes})`);

  const ids = new Set<string>();
  const refs: string[] = [];
  const stack: string[] = [];
  let sawRoot = false;
  let parseError: string | null = null;

  const parser = new SaxesParser({ xmlns: true, position: true });
  parser.on('error', (e) => {
    parseError ??= e.message;
  });
  parser.on('doctype', () => errors.push('DOCTYPE is not allowed (entity declarations can expand or reference external files)'));
  parser.on('processinginstruction', (pi) => errors.push(`processing instruction <?${pi.target}?> is not allowed`));
  parser.on('cdata', () => errors.push('CDATA sections are not allowed'));
  parser.on('text', (t) => {
    const top = stack[stack.length - 1];
    if (t.trim() && (top === 'text' || top === 'tspan' || top === 'title' || top === 'desc')) texts.push(t.trim());
  });
  parser.on('opentag', (tag) => {
    const node = tag as SaxesTagNS;
    const local = node.local;
    stack.push(local);
    if (!sawRoot) {
      sawRoot = true;
      if (local !== 'svg' || node.uri !== SVG_NS) errors.push(`root element must be <svg xmlns="${SVG_NS}">`);
      if (SVG_RULES.requireViewBox && !Object.values(node.attributes).some((a) => a.local === 'viewBox')) errors.push('root <svg> needs a viewBox');
    }
    if (node.uri !== SVG_NS) errors.push(`<${node.name}> is outside the SVG namespace`);
    else if (!ELEMENTS.has(local)) errors.push(`<${local}> is not allowed${WHY_ELEMENT[local] ? ` (${WHY_ELEMENT[local]})` : local.startsWith('animate') ? ' (animation is not allowed)' : ''}`);

    for (const attr of Object.values(node.attributes) as SaxesAttributeNS[]) {
      checkAttribute(local, attr, errors, warnings, ids, refs);
    }
  });
  parser.on('closetag', () => {
    stack.pop();
  });

  try {
    parser.write(svg).close();
  } catch (e) {
    parseError ??= (e as Error).message;
  }
  if (parseError) errors.push(`not well-formed XML: ${String(parseError).split('\n')[0]}`);
  if (!sawRoot && !parseError) errors.push('no root element');
  for (const ref of refs) if (!ids.has(ref)) warnings.push(`reference #${ref} has no matching id`);
  return { errors: [...new Set(errors)], warnings: [...new Set(warnings)], texts };
}

function checkAttribute(element: string, attr: SaxesAttributeNS, errors: string[], warnings: string[], ids: Set<string>, refs: string[]): void {
  const { name, prefix, local, value, uri } = attr;
  if (name === 'xmlns') {
    if (value !== SVG_NS) errors.push(`xmlns must be ${SVG_NS}`);
    return;
  }
  if (prefix === 'xmlns' || uri === XMLNS_NS) {
    errors.push(`namespace declaration ${name} is not allowed (use plain SVG attributes; href="#id" instead of xlink:href)`);
    return;
  }
  if (DANGEROUS_SCHEME.test(value)) errors.push(`${name} on <${element}> contains a script/data URL`);
  if (/^on/i.test(local)) {
    errors.push(`event handler ${name} on <${element}> is not allowed`);
    return;
  }
  if (prefix) {
    errors.push(`${name} on <${element}> is not allowed${local === 'href' ? ' (use href="#id")' : ''}`);
    return;
  }
  if (local === 'style') {
    errors.push(`style attribute on <${element}> is not allowed (CSS can carry url() and expressions)`);
    return;
  }
  if (!ATTRIBUTES.has(local)) {
    errors.push(`attribute ${name} on <${element}> is not allowed`);
    return;
  }
  if (local === 'href') {
    if (!FRAGMENT_RE.test(value.trim())) errors.push(`href="${value.slice(0, 60)}" on <${element}> must be a #fragment`);
    else refs.push(value.trim().slice(1));
  }
  if (local === 'id') ids.add(value);
  for (const m of value.matchAll(/url\s*\(\s*(['"]?)(.*?)\1\s*\)/gi)) {
    const target = m[2]!.trim();
    if (!FRAGMENT_RE.test(target)) errors.push(`url(${target.slice(0, 60)}) in ${name} must be url(#id)`);
    else refs.push(target.slice(1));
  }
  if (/url\s*\(/i.test(value) && !/url\s*\(\s*(['"]?)#[A-Za-z_][\w.-]*\1\s*\)/i.test(value)) errors.push(`${name} has a url() that is not url(#id)`);
  if (local === 'class') {
    for (const cls of value.split(/\s+/).filter(Boolean)) if (!CLASS_RE.test(cls)) errors.push(`class "${cls}" is not allowed (only ${SVG_RULES.classPattern})`);
  }
  if (COLOUR_ATTRS.has(local)) {
    const v = value.trim();
    if (!PALETTE.has(v) && !/^url\(#/.test(v) && !/^var\(--diagram-[a-z-]+\)$/.test(v)) warnings.push(`${name}="${v}" is a hard-coded colour; use currentColor or var(--diagram-*) so it reads in dark mode`);
  }
}
