/**
 * KaTeX configuration (WEB-7). Reviewed renderer code: every maths string in the platform is
 * rendered through `renderMathToString`, nothing else calls KaTeX.
 *
 * - trust: false            \href, \url, \includegraphics, \htmlClass/\htmlId/\htmlStyle/\htmlData are refused
 * - strict: 'warn'          non-LaTeX input is rendered, with a console warning
 * - maxExpand: 1000         stops exponential macro bombs (\def\a{\b\b} ...)
 * - maxSize: 10 (em)        stops giant rules/boxes covering the page
 * - throwOnError: false     a bad formula renders its source as escaped red text, never HTML
 * - macros: {} per call     \gdef / \global\def cannot leak from one formula into the next
 * - output: htmlAndMathml   visual HTML is aria-hidden; screen readers get MathML
 *
 * mhchem (\ce, \pu) is registered by importing katex/contrib/mhchem once, here.
 */
import katex from 'katex';
import 'katex/contrib/mhchem';

/** Longest formula we render; longer input is shown as text (it is a content bug, not maths). */
export const MAX_TEX_LENGTH = 4000;

export const KATEX_ERROR_COLOUR = '#b3362c';

export function katexOptions(displayMode: boolean): katex.KatexOptions {
  return {
    displayMode,
    trust: false,
    strict: 'warn',
    maxExpand: 1000,
    maxSize: 10,
    throwOnError: false,
    errorColor: KATEX_ERROR_COLOUR,
    output: 'htmlAndMathml',
    macros: {},
    globalGroup: false,
  };
}

function escapeHtml(text: string): string {
  return text.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
}

function errorSpan(tex: string, reason: string): string {
  return `<span class="katex-error" title="${escapeHtml(reason)}">${escapeHtml(tex)}</span>`;
}

/** Returns KaTeX HTML (safe to inject: KaTeX escapes all text and trust is off) or escaped source text. */
export function renderMathToString(tex: string, displayMode: boolean): string {
  if (typeof tex !== 'string') return '';
  if (tex.length > MAX_TEX_LENGTH) return errorSpan(tex.slice(0, 200) + '…', 'Formula too long');
  try {
    return katex.renderToString(tex, katexOptions(displayMode));
  } catch (err) {
    // throwOnError:false covers ParseError; anything else (e.g. maxExpand) lands here.
    return errorSpan(tex, err instanceof Error ? err.message : 'Formula error');
  }
}

/** True when every { has a matching } and no } closes early (so an argument cannot break out). */
export function bracesBalanced(text: string): boolean {
  let depth = 0;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (c === '\\') {
      i++; // skip the escaped character (\{ and \} are literal braces)
      continue;
    }
    if (c === '{') depth++;
    else if (c === '}') {
      depth--;
      if (depth < 0) return false;
    }
  }
  return depth === 0;
}

/** mhchem equation → TeX. Refuses input whose braces could close \ce{ early. */
export function chemToTex(equation: string): string | null {
  const eq = equation.trim();
  if (!eq || eq.length > 500 || !bracesBalanced(eq)) return null;
  return `\\ce{${eq}}`;
}
