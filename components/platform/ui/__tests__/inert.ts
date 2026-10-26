/**
 * "Nothing executable survived" check for rendered content. Walks a DOM tree and reports anything
 * that could run script, load a remote resource, or escape its box.
 */

const EXEC_TAGS = new Set([
  'script', 'iframe', 'frame', 'object', 'embed', 'applet', 'form', 'input', 'button', 'base', 'meta', 'link',
  'style', 'foreignobject', 'animate', 'set', 'animatemotion', 'animatetransform', 'handler', 'listener', 'image',
  'feimage', 'audio', 'video', 'details', 'template', 'textarea', 'select',
]);
const URL_ATTRS = new Set(['href', 'xlink:href', 'src', 'srcset', 'action', 'formaction', 'data', 'poster', 'background', 'ping', 'codebase', 'cite']);
const BAD_SCHEME = /^\s*(?:javascript|data|vbscript|file|blob):/i;

export interface InertOptions {
  /** Hosts an <a href> may point at (https only). */
  linkHosts?: string[];
  /** Allow <svg> internals that KaTeX emits (\sqrt, stretchy arrows): no href/url there anyway. */
  allowKatexSvg?: boolean;
  /** Required prefix for every id / #ref (SVG sanitiser output). */
  idPrefix?: string;
}

export function findProblems(root: ParentNode, opts: InertOptions = {}): string[] {
  const problems: string[] = [];
  const all = root.querySelectorAll('*');
  for (const el of Array.from(all)) {
    const tag = el.localName.toLowerCase();
    if (EXEC_TAGS.has(tag)) problems.push(`<${tag}> element`);
    if (tag === 'img') problems.push('<img> element');
    if (tag === 'a') {
      const href = el.getAttribute('href') ?? '';
      const ok =
        href.startsWith('#') ||
        (href.startsWith('/') && !href.startsWith('//')) ||
        href.startsWith('mailto:') ||
        (href.startsWith('https://') && (opts.linkHosts ?? ['www.soylai.com', 'soylai.com']).includes(new URL(href).hostname));
      if (!ok) problems.push(`<a href="${href}">`);
    }
    for (const attr of Array.from(el.attributes)) {
      const name = attr.name.toLowerCase();
      const value = attr.value;
      if (name.startsWith('on')) problems.push(`${name} on <${tag}>`);
      if (URL_ATTRS.has(name) && BAD_SCHEME.test(value)) problems.push(`${name}="${value}" on <${tag}>`);
      if (URL_ATTRS.has(name) && /^\s*(https?:)?\/\//i.test(value) && tag !== 'a') problems.push(`remote ${name} on <${tag}>`);
      if (/url\s*\(/i.test(value) && !/^\s*url\(\s*['"]?#[\w.:-]+['"]?\s*\)\s*$/i.test(value)) problems.push(`url() in ${name} on <${tag}>`);
      if (/javascript:|vbscript:|expression\s*\(/i.test(value)) problems.push(`script-like ${name} on <${tag}>`);
      if (opts.idPrefix && name === 'id' && !value.startsWith(opts.idPrefix)) problems.push(`unprefixed id ${value}`);
      if (opts.idPrefix && (name === 'href' || name === 'xlink:href') && !value.startsWith(`#${opts.idPrefix}`)) problems.push(`unprefixed ${name} ${value}`);
      if (name === 'class' && opts.idPrefix && value.split(/\s+/).some((c) => !/^diagram-[a-z0-9-]+$/.test(c))) problems.push(`class ${value}`);
      if (name === 'style' && opts.idPrefix) problems.push(`style attribute on <${tag}>`);
    }
  }
  return problems;
}
