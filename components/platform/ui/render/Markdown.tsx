/**
 * REVIEWED RENDERER (WEB-6/WEB-7): content Markdown (`*_md` fields, notes, AI tutor output).
 *
 * - CommonMark + GFM tables/strikethrough, rendered to React elements (no innerHTML here).
 * - No raw HTML: remark-soyl turns HTML into visible text; `skipHtml` and an element allow-list
 *   back that up. Never add rehype-raw.
 * - Links: policy.safeLink (same-site paths, #fragments, mailto:, https to allow-listed hosts);
 *   anything else renders as plain text. External links get rel="noopener noreferrer nofollow".
 * - Images: only from the CDN base; `allowImages={false}` for AI output (no exfiltration via URLs).
 * - Maths: $...$, $$...$$ and bare \ce{...} go through MathBlock/MathInline (KaTeX, trust off).
 *
 * No 'use client': render it in Server Components where possible (zero client JS).
 */
import type { ReactNode } from 'react';
import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import { cx } from '../cx';
import { MathBlock, MathInline } from './MathBlock';
import { cdnBaseFromEnv, DEFAULT_LINK_HOSTS, safeImageSrc, safeLink } from './policy';
import remarkSoyl from './remark-soyl';
import s from './render.module.css';

export const MAX_MARKDOWN_LENGTH = 50_000;

const ALLOWED_ELEMENTS = [
  'p', 'br', 'strong', 'em', 'del', 'code', 'pre', 'blockquote', 'hr',
  'ul', 'ol', 'li', 'a', 'img', 'sup', 'sub',
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'table', 'thead', 'tbody', 'tr', 'th', 'td',
];
const INLINE_ELEMENTS = ['p', 'br', 'strong', 'em', 'del', 'code', 'a', 'img', 'sup', 'sub'];

export interface MarkdownProps {
  children: string;
  /** Render inline (no paragraphs): headings, bullets, options, table cells. */
  inline?: boolean;
  /** Markdown "#" maps to h(1 + offset). Default 2: inside a slide/section whose title is h2. */
  headingOffset?: number;
  /** Images from the CDN are allowed by default; pass false for AI/user-influenced text. */
  allowImages?: boolean;
  /** Override the CDN base (defaults to NEXT_PUBLIC_CDN_BASE_URL). */
  cdnBase?: string;
  /** Override the link host allow-list. */
  linkHosts?: readonly string[];
  /** BCP 47 language of the text, e.g. "hi" for Hindi (switches to Devanagari typography). */
  lang?: string;
  className?: string;
}

function textOf(children: ReactNode): string {
  if (typeof children === 'string') return children;
  if (Array.isArray(children)) return children.map(textOf).join('');
  return '';
}

function classesOf(className: unknown): string[] {
  return typeof className === 'string' ? className.split(/\s+/) : Array.isArray(className) ? className.map(String) : [];
}

export function Markdown({
  children,
  inline = false,
  headingOffset = 2,
  allowImages = true,
  cdnBase,
  linkHosts = DEFAULT_LINK_HOSTS,
  lang,
  className,
}: MarkdownProps) {
  const source = typeof children === 'string' ? children.slice(0, MAX_MARKDOWN_LENGTH) : '';
  const base = cdnBase ?? cdnBaseFromEnv();

  const heading = (level: number) =>
    function Heading({ children: c }: { children?: ReactNode }) {
      const n = Math.min(6, Math.max(1, level + headingOffset));
      const Tag = `h${n}` as 'h1';
      return <Tag className={s.mdHeading}>{c}</Tag>;
    };

  const components: Components = {
    a({ href, children: c }) {
      const link = safeLink(href, linkHosts);
      if (!link) return <span className={s.mdBlockedLink}>{c}</span>;
      if (link.external) {
        return (
          <a href={link.href} target="_blank" rel="noopener noreferrer nofollow" className={s.mdLink}>
            {c}
            <span className="p-visually-hidden"> (opens in a new tab)</span>
          </a>
        );
      }
      return (
        <a href={link.href} className={s.mdLink}>
          {c}
        </a>
      );
    },
    img({ src, alt }) {
      const safe = allowImages ? safeImageSrc(src, base) : null;
      if (!safe) return alt ? <span className={s.mdBlockedImage}>[{alt}]</span> : null;
      // eslint-disable-next-line @next/next/no-img-element -- CDN content images; next/image would proxy through /_next/image
      return <img src={safe} alt={alt ?? ''} loading="lazy" decoding="async" referrerPolicy="no-referrer" className={s.mdImage} />;
    },
    code({ className: cls, children: c }) {
      const classes = classesOf(cls);
      if (classes.includes('language-math')) {
        const tex = textOf(c);
        return classes.includes('math-display') && !inline ? <MathBlock tex={tex} /> : <MathInline tex={tex} />;
      }
      return <code className={s.mdCode}>{c}</code>;
    },
    pre({ children: c, node }) {
      const first = node?.children?.[0];
      const isMath = first && first.type === 'element' && classesOf(first.properties?.className).includes('math-display');
      if (isMath) return <>{c}</>;
      return (
        <pre className={s.mdPre} tabIndex={0}>
          {c}
        </pre>
      );
    },
    table({ children: c }) {
      return (
        <div className={s.mdTableWrap} role="region" aria-label="Table" tabIndex={0}>
          <table className={s.mdTable}>{c}</table>
        </div>
      );
    },
    p({ children: c }) {
      return inline ? <>{c}</> : <p>{c}</p>;
    },
    h1: heading(1),
    h2: heading(2),
    h3: heading(3),
    h4: heading(4),
    h5: heading(5),
    h6: heading(6),
  };

  const Wrapper = inline ? 'span' : 'div';
  return (
    <Wrapper className={cx(inline ? s.mdInline : s.md, className)} lang={lang}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath, remarkSoyl]}
        skipHtml
        allowedElements={inline ? INLINE_ELEMENTS : ALLOWED_ELEMENTS}
        unwrapDisallowed
        // Links and images are decided by the components above; this only blanks what they refuse.
        urlTransform={(url, key) => (key === 'src' ? (allowImages ? safeImageSrc(url, base) ?? '' : '') : safeLink(url, linkHosts)?.href ?? '')}
        components={components}
      >
        {source}
      </ReactMarkdown>
    </Wrapper>
  );
}

