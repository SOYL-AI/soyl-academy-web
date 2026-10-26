/**
 * remark plugin for content Markdown (WEB-7):
 * 1. Raw HTML never renders: every `html` node becomes a `text` node, so "<b>x</b>" shows literally
 *    (reviewers see it) instead of being interpreted or silently dropped.
 * 2. Bare mhchem outside $...$ ("Water is \ce{H2O}") becomes inline maths, so authors may write
 *    chemistry either way (contract: platform/shared/content/common.ts Markdown).
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
    } else if (child.type === 'text' && child.value && child.value.includes('\\')) {
      next.push(...splitChem(child.value));
    } else {
      transform(child, source);
      next.push(child);
    }
  }
  node.children = next;
}

export default function remarkSoyl() {
  return (tree: MdNode, file: { value?: unknown }) => {
    transform(tree, typeof file?.value === 'string' ? file.value : String(file?.value ?? ''));
  };
}
