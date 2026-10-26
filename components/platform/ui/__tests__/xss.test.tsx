import { render, waitFor } from '@testing-library/react';
import createDOMPurify from 'dompurify';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { MARKDOWN_XSS, SVG_REFUSED, SVG_XSS } from '../__fixtures__/xss-corpus';
import { Markdown } from '../render/Markdown';
import { renderMathToString } from '../render/math';
import { createSvgSanitizer, idPrefixFor } from '../render/sanitize-svg';
import { SvgDiagram } from '../render/SvgDiagram';
import { findProblems } from './inert';

function parse(html: string): HTMLElement {
  const host = document.createElement('div');
  host.innerHTML = html;
  return host;
}

describe('Markdown XSS corpus (client render)', () => {
  it.each(MARKDOWN_XSS.map((p, i) => [i, p]))('payload %i renders inert', (_i, payload) => {
    const { container } = render(<Markdown cdnBase="https://cdn.soylai.com/content">{payload as string}</Markdown>);
    expect(findProblems(container)).toEqual([]);
    expect((window as unknown as { __xss?: number }).__xss).toBeUndefined();
  });
});

describe('Markdown XSS corpus (server render, as in Server Components)', () => {
  it.each(MARKDOWN_XSS.map((p, i) => [i, p]))('payload %i renders inert', (_i, payload) => {
    const html = renderToStaticMarkup(<Markdown cdnBase="https://cdn.soylai.com/content">{payload as string}</Markdown>);
    expect(findProblems(parse(html))).toEqual([]);
    // Real tags only: escaped payload text such as "&lt;img onerror=" is inert and expected.
    expect(html).not.toMatch(/<(?:script|iframe|object|embed|img|style|form|base|meta|details|svg\s+on)\b/i);
  });
});

describe('Markdown keeps what it should', () => {
  it('shows raw HTML as text instead of interpreting it', () => {
    const { container } = render(<Markdown>{'Say <b>bold</b> and <script>x()</script>'}</Markdown>);
    expect(container.textContent).toContain('<b>bold</b>');
    expect(container.querySelector('b, script')).toBeNull();
  });

  it('renders blocked links as plain text', () => {
    const { container } = render(<Markdown>{'[evil](javascript:alert(1)) [ext](https://evil.example/x)'}</Markdown>);
    expect(container.querySelectorAll('a')).toHaveLength(0);
    expect(container.textContent).toContain('evil');
    expect(container.textContent).toContain('ext');
  });

  it('keeps same-site, fragment, mailto and allow-listed https links', () => {
    const { container } = render(
      <Markdown>{'[a](/learn/cbse/10) [b](#s02) [c](mailto:help@soylai.com) [d](https://cbseacademic.nic.in/curriculum.html)'}</Markdown>,
    );
    const links = Array.from(container.querySelectorAll('a'));
    expect(links.map((a) => a.getAttribute('href'))).toEqual(['/learn/cbse/10', '#s02', 'mailto:help@soylai.com', 'https://cbseacademic.nic.in/curriculum.html']);
    const external = links[3];
    expect(external.getAttribute('rel')).toBe('noopener noreferrer nofollow');
    expect(external.getAttribute('target')).toBe('_blank');
  });

  it('allows CDN images only, and none when allowImages is false', () => {
    const md = '![cell](https://cdn.soylai.com/content/cell.png) ![x](https://evil.example/x.png)';
    const withCdn = render(<Markdown cdnBase="https://cdn.soylai.com/content">{md}</Markdown>);
    const imgs = withCdn.container.querySelectorAll('img');
    expect(imgs).toHaveLength(1);
    expect(imgs[0].getAttribute('src')).toBe('https://cdn.soylai.com/content/cell.png');
    expect(imgs[0].getAttribute('referrerpolicy')).toBe('no-referrer');
    withCdn.unmount();
    const ai = render(<Markdown cdnBase="https://cdn.soylai.com/content" allowImages={false}>{md}</Markdown>);
    expect(ai.container.querySelectorAll('img')).toHaveLength(0);
  });

  it('renders inline, display maths and bare \\ce{} with KaTeX', () => {
    const { container } = render(<Markdown>{'Area $\\pi r^2$, water \\ce{H2O}.\n\n$$E = mc^2$$'}</Markdown>);
    expect(container.querySelectorAll('[data-math="inline"]')).toHaveLength(2);
    expect(container.querySelectorAll('[data-math="display"]')).toHaveLength(1);
    expect(container.querySelectorAll('math')).toHaveLength(3); // MathML for screen readers
  });
});

describe('KaTeX hardening', () => {
  it('refuses \\href, \\url, \\html* and \\includegraphics (trust: false)', () => {
    for (const tex of [
      '\\href{javascript:alert(1)}{x}',
      '\\url{javascript:alert(1)}',
      '\\htmlClass{fixed}{x}',
      '\\htmlId{x}{y}',
      '\\htmlStyle{color:red}{x}',
      '\\htmlData{a=b}{x}',
      '\\includegraphics{https://evil.example/x.png}',
    ]) {
      const host = parse(renderMathToString(tex, false));
      expect(findProblems(host)).toEqual([]);
      expect(host.querySelector('a, img, [data-a], .fixed, #x')).toBeNull();
    }
  });

  it('stops macro bombs (maxExpand) and huge boxes (maxSize) without throwing', () => {
    const bomb = '\\def\\a{\\b\\b\\b\\b\\b\\b\\b\\b}\\def\\b{\\c\\c\\c\\c\\c\\c\\c\\c}\\def\\c{\\d\\d\\d\\d\\d\\d\\d\\d}\\def\\d{xxxxxxxx}\\a\\a\\a\\a';
    const out = renderMathToString(bomb, false);
    expect(out).toContain('katex-error');
    expect(out.length).toBeLessThan(20_000);
    const big = renderMathToString('\\rule{500em}{500em}', true);
    // The TeX source stays in the MathML annotation; no rendered box may be 500em.
    expect(big.replace(/<annotation[\s\S]*?<\/annotation>/g, '')).not.toMatch(/500em/);
  });

  it('does not leak \\gdef between renders (fresh macros per call)', () => {
    renderMathToString('\\gdef\\leak{LEAKED}', false);
    const next = renderMathToString('\\leak', false);
    expect(next).not.toContain('LEAKED');
  });

  it('escapes error text', () => {
    const out = renderMathToString('\\frac{<img src=x onerror=alert(1)>', false);
    expect(findProblems(parse(out))).toEqual([]);
  });
});

describe('SVG sanitiser corpus', () => {
  const sanitize = createSvgSanitizer(createDOMPurify(window));

  it.each(SVG_XSS.map((p, i) => [i, p]))('payload %i is stripped to inert, allow-listed SVG', (_i, payload) => {
    const result = sanitize(payload as string);
    if (result.svg === null) return; // refusing is also safe
    const host = parse(result.svg);
    expect(findProblems(host, { idPrefix: idPrefixFor((payload as string).trim()) })).toEqual([]);
    expect(host.children).toHaveLength(1);
    expect(host.firstElementChild?.localName).toBe('svg');
    expect(result.svg).not.toMatch(/javascript:|evil\.example|onload|onerror|onclick|<script|<style|<image|<a[\s>]|foreignObject/i);
  });

  it.each(SVG_REFUSED.map((p, i) => [i, p]))('refuses %i outright', (_i, payload) => {
    const result = sanitize(payload as string);
    expect(result.svg).toBeNull();
    expect(result.error).toBeTruthy();
  });

  it('reports what it removed (for reviewers: reject, do not silently strip)', () => {
    const result = sanitize('<svg viewBox="0 0 10 10" onload="x()"><script>x()</script><circle r="5" class="fixed diagram-accent"/></svg>');
    expect(result.removed.join('\n')).toMatch(/onload/);
    expect(result.removed.join('\n')).toMatch(/script/);
    expect(result.svg).toContain('class="diagram-accent"');
  });

  it('prefixes ids and rewrites #refs and url(#refs) consistently', () => {
    const input =
      '<svg viewBox="0 0 10 10"><defs><marker id="arrow"><path d="M0 0"/></marker><linearGradient id="g"><stop offset="0"/></linearGradient></defs>' +
      '<line marker-end="url(#arrow)" x2="5"/><rect fill="url(#g)" width="1" height="1"/><use href="#arrow"/></svg>';
    const result = sanitize(input);
    const p = idPrefixFor(input);
    expect(result.svg).toContain(`id="${p}arrow"`);
    expect(result.svg).toContain(`marker-end="url(#${p}arrow)"`);
    expect(result.svg).toContain(`fill="url(#${p}g)"`);
    expect(result.svg).toContain(`href="#${p}arrow"`);
  });

  it('keeps legitimate diagrams intact (tokens, text, markers)', () => {
    const input =
      '<svg viewBox="0 0 100 50" font-size="12"><title>Beaker</title><rect x="1" y="1" width="20" height="30" fill="var(--diagram-fill)" stroke="currentColor"/><text x="2" y="45" fill="currentColor">Copper sulphate (blue)</text></svg>';
    const result = sanitize(input);
    expect(result.svg).toContain('fill="var(--diagram-fill)"');
    expect(result.svg).toContain('Copper sulphate (blue)');
    expect(result.svg).toContain('aria-hidden="true"');
    expect(result.removed).toEqual([]);
  });

  it('synthesises a viewBox from numeric width/height and drops fixed sizes', () => {
    const result = sanitize('<svg width="40" height="20"><circle r="5"/></svg>');
    expect(result.svg).toContain('viewBox="0 0 40 20"');
    expect(result.svg).not.toMatch(/\swidth=/);
  });
});

describe('SvgDiagram component', () => {
  it('renders sanitised output with the alt as accessible name', async () => {
    const { container } = render(<SvgDiagram spec={SVG_XSS[0]} alt="A circle" />);
    await waitFor(() => expect(container.querySelector('[data-state="ready"]')).not.toBeNull());
    const host = container.querySelector('[role="img"]')!;
    expect(host.getAttribute('aria-label')).toBe('A circle');
    expect(findProblems(container)).toEqual([]);
  });

  it('falls back to the alt text when the input is refused', async () => {
    const { container } = render(<SvgDiagram spec={SVG_REFUSED[0]} alt="Refused drawing" />);
    await waitFor(() => expect(container.querySelector('[data-state="refused"]')).not.toBeNull());
    expect(container.textContent).toContain('Refused drawing');
  });
});
