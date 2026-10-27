/**
 * remark plugin for content Markdown (WEB-7):
 * 1. Raw HTML never renders: every `html` node becomes a `text` node, so "<b>x</b>" shows literally
 *    (reviewers see it) instead of being interpreted or silently dropped.
 * 2. Bare mhchem outside $...$ ("Water is \ce{H2O}") becomes inline maths, so authors may write
 *    chemistry either way (contract: platform/shared/content/common.ts Markdown).
 * 3. The underline marker `++text++` (contract v2, common.ts UNDERLINE_RE) becomes an `<ins>` element,
 *    styled as an underline. Only text nodes are scanned, so never inside code or maths; "C++" stays
 *    text. A span may wrap inline formatting split across sibling nodes ("++**word**++").
 */
import { bracesBalanced } from './math';

interface MdNode {
  type: string;
  value?: string;
  children?: MdNode[];
  data?: Record<string, unknown>;
  position?: { start?: { offset?: number } };
}

function inlineMath(value: string): MdNode {
  // Same shape mdast-util-math produces for $...$, so remark-rehype emits <code class="language-math math-inline">.
  return {
    type: 'inlineMath',
    value,
    data: {
      hName: 'code',
      hProperties: { className: ['language-math', 'math-inline'] },
      hChildren: [{ type: 'text', value }],
    },
  };
}

/** Splits text on \ce{...} / \pu{...} with balanced braces. */
export function splitChem(text: string): MdNode[] {
  const out: MdNode[] = [];
  const re = /\\(ce|pu)\{/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    const start = m.index;
    let depth = 1;
    let i = re.lastIndex;
    for (; i < text.length && depth > 0; i++) {
      if (text[i] === '\\') {
        i++;
        continue;
      }
      if (text[i] === '{') depth++;
      else if (text[i] === '}') depth--;
    }
    if (depth !== 0) break; // unbalanced: leave the rest as text
    const tex = text.slice(start, i);
    if (!bracesBalanced(tex)) break;
    if (start > last) out.push({ type: 'text', value: text.slice(last, start) });
    out.push(inlineMath(tex));
    last = i;
    re.lastIndex = i;
  }
  if (last < text.length) out.push({ type: 'text', value: text.slice(last) });
  return out;
}

function displayMath(value: string): MdNode {
  // Same shape mdast-util-math produces for a fenced $$ block.
  return {
    type: 'math',
    value,
    data: {
      hName: 'pre',
      hChildren: [{ type: 'element', tagName: 'code', properties: { className: ['language-math', 'math-display'] }, children: [{ type: 'text', value }] }],
    },
  };
}

/**
 * Same pattern as UNDERLINE_RE in platform/shared/content/common.ts (that module imports zod, which must
 * not reach the client bundle); a unit test keeps the two identical.
 */
export const UNDERLINE_SOURCE = String.raw`\+\+([^\s+](?:[^\n]{0,78}?[^\s+])?)\+\+`;

function underline(children: MdNode[]): MdNode {
  return { type: 'underline', children, data: { hName: 'ins' } };
}

/** Splits a text value on complete `++…++` spans. */
export function splitUnderline(text: string): MdNode[] {
  const out: MdNode[] = [];
  const re = new RegExp(UNDERLINE_SOURCE, 'g');
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push({ type: 'text', value: text.slice(last, m.index) });
    out.push(underline([{ type: 'text', value: m[1]! }]));
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push({ type: 'text', value: text.slice(last) });
  return out;
}

const OPEN_AT_END = /(?:^|[^+\w])\+\+$/;
const CLOSE_AT_START = /^\+\+(?!\+)/;
const INLINE_WRAPPABLE = new Set(['strong', 'emphasis', 'delete', 'inlineMath', 'text']);

/** "++" ending one text node … "++" starting a later sibling: wrap the inline nodes between them. */
function joinSplitUnderlines(children: MdNode[]): MdNode[] {
  const out: MdNode[] = [];
  for (let i = 0; i < children.length; i++) {
    const c = children[i]!;
    if (c.type === 'text' && c.value && OPEN_AT_END.test(c.value)) {
      let close = -1;
      for (let j = i + 1; j < children.length && j <= i + 4; j++) {
        const n = children[j]!;
        if (n.type === 'text' && n.value && CLOSE_AT_START.test(n.value)) {
          if (j > i + 1) close = j;
          break;
        }
        if (!INLINE_WRAPPABLE.has(n.type) || (n.type === 'text' && /\n/.test(n.value ?? ''))) break;
      }
      if (close > 0) {
        const before = c.value.slice(0, -2);
        if (before) out.push({ type: 'text', value: before });
        out.push(underline(children.slice(i + 1, close)));
        const after = children[close]!.value!.slice(2);
        if (after) out.push({ type: 'text', value: after });
        i = close;
        continue;
      }
    }
    out.push(c);
  }
  return out;
}

/** Text → text / underline / inline-maths nodes. */
function splitText(value: string): MdNode[] {
  const parts = value.includes('++') ? splitUnderline(value) : [{ type: 'text', value }];
  return parts.flatMap((part) => {
    if (part.type === 'text') return part.value?.includes('\\') ? splitChem(part.value) : [part];
    return [{ ...part, children: (part.children ?? []).flatMap((t) => (t.value?.includes('\\') ? splitChem(t.value) : [t])) }];
  });
}

function transform(node: MdNode, source: string): void {
  if (!node.children) return;
  const next: MdNode[] = [];
  for (const child of node.children) {
    // A paragraph that is only "$$...$$" on one line is display maths (authors write it that way).
    const only = child.type === 'paragraph' && child.children?.length === 1 ? child.children[0] : null;
    const start = only?.position?.start?.offset;
    if (only && only.type === 'inlineMath' && typeof start === 'number' && source.startsWith('$$', start)) {
      next.push(displayMath(only.value ?? ''));
    } else if (child.type === 'html') {
      next.push({ type: 'text', value: child.value ?? '' });
    } else if (child.type === 'text' && child.value && (child.value.includes('\\') || child.value.includes('++'))) {
      next.push(...splitText(child.value));
    } else {
      transform(child, source);
      next.push(child);
    }
  }
  node.children = joinSplitUnderlines(next);
}

export default function remarkSoyl() {
  return (tree: MdNode, file: { value?: unknown }) => {
    transform(tree, typeof file?.value === 'string' ? file.value : String(file?.value ?? ''));
  };
}
