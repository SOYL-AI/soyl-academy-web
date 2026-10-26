/**
 * KaTeX checks: every $...$ / $$...$$ in markdown, every display-math entry and every mhchem
 * equation must parse with the same settings the web renderer uses (WEB-7: trust off, maxExpand
 * 1000, maxSize 10). Commands that can carry links or HTML are rejected outright even though
 * trust:false would neutralise them, so reviewers see the problem at stage 4 (AC-19).
 */
import katex from 'katex';
import 'katex/contrib/mhchem';

export const KATEX_OPTIONS = {
  throwOnError: true,
  trust: false,
  maxExpand: 1000,
  maxSize: 10,
  output: 'html' as const,
};

/** Commands never allowed in content maths. */
export const FORBIDDEN_TEX = ['\\href', '\\url', '\\includegraphics', '\\htmlClass', '\\htmlId', '\\htmlStyle', '\\htmlData', '\\html', '\\def', '\\gdef', '\\edef', '\\xdef', '\\newcommand', '\\renewcommand', '\\providecommand', '\\let', '\\futurelet'];

export interface MathSpan {
  tex: string;
  display: boolean;
}

/**
 * Finds $$...$$ and $...$ spans in markdown. `\$` is a literal dollar. Returns spans and any
 * unbalanced delimiter as an error string.
 */
export function extractMath(md: string): { spans: MathSpan[]; error: string | null } {
  const spans: MathSpan[] = [];
  let i = 0;
  let error: string | null = null;
  while (i < md.length) {
    const c = md[i];
    if (c === '\\' && md[i + 1] === '$') {
      i += 2;
      continue;
    }
    if (c === '`') {
      // Skip inline code: maths delimiters inside code are literal.
      const end = md.indexOf('`', i + 1);
      i = end < 0 ? md.length : end + 1;
      continue;
    }
    if (c === '$') {
      const display = md[i + 1] === '$';
      const open = display ? 2 : 1;
      let j = i + open;
      let found = -1;
      while (j < md.length) {
        if (md[j] === '\\') {
          j += 2;
          continue;
        }
        if (display ? md.startsWith('$$', j) : md[j] === '$') {
          found = j;
          break;
        }
        j++;
      }
      if (found < 0) {
        error = `unclosed ${display ? '$$' : '$'} at position ${i}`;
        break;
      }
      spans.push({ tex: md.slice(i + open, found), display });
      i = found + open;
      continue;
    }
    i++;
  }
  return { spans, error };
}

export function checkTex(tex: string, display: boolean): { error: string | null; warnings: string[] } {
  const warnings: string[] = [];
  if (!tex.trim()) return { error: 'empty maths', warnings };
  for (const cmd of FORBIDDEN_TEX) {
    const re = new RegExp(`${cmd.replace(/\\/g, '\\\\')}(?![a-zA-Z])`);
    if (re.test(tex)) return { error: `forbidden command ${cmd}`, warnings };
  }
  try {
    katex.renderToString(tex, {
      ...KATEX_OPTIONS,
      displayMode: display,
      strict: (code: string, msg: string) => {
        warnings.push(`${code}: ${msg}`);
        return 'ignore';
      },
    });
    return { error: null, warnings };
  } catch (e) {
    return { error: (e as Error).message.replace(/^KaTeX parse error: /, ''), warnings };
  }
}

/** A chem visual's equation is mhchem notation without the \ce wrapper. */
export function checkMhchem(equation: string): { error: string | null; warnings: string[] } {
  const eq = equation.trim();
  return checkTex(eq.startsWith('\\ce{') ? eq : `\\ce{${eq}}`, true);
}

const SMILES_RE = /^[A-Za-z0-9@+\-[\]()=#$%/\\.:*]+$/;

export function checkSmiles(smiles: string): string | null {
  if (smiles.length > 500) return 'SMILES longer than 500 characters';
  if (!SMILES_RE.test(smiles)) return 'SMILES has characters outside the SMILES alphabet';
  let depthRound = 0;
  let depthSquare = 0;
  for (const c of smiles) {
    if (c === '(') depthRound++;
    if (c === ')') depthRound--;
    if (c === '[') depthSquare++;
    if (c === ']') depthSquare--;
    if (depthRound < 0 || depthSquare < 0) return 'unbalanced brackets in SMILES';
  }
  if (depthRound || depthSquare) return 'unbalanced brackets in SMILES';
  return null;
}
