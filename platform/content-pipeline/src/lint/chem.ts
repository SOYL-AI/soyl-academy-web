/**
 * Atom balance of reaction equations: every `\ce{… -> …}` in text and every chem visual equation.
 *
 * Deliberately unbalanced equations (skeletal equations being taught, wrong MCQ options) are not
 * errors when they are marked by context — the documented rule:
 *   - the surrounding text says so: the same slide / question stem / flashcard / notes section
 *     contains "skeletal", "unbalanced", "not balanced", or the imperative "balance"/"balancing"
 *     (e.g. "Balance $\ce{Al + O2 -> Al2O3}$");
 *   - the equation is in a wrong option of an objective question (distractors may be wrong).
 * Equations with placeholders (x, n, ?, ___, …) are skipped.
 */

export const SKELETAL_CONTEXT = /skeletal|unbalanced|not\s+(?:yet\s+)?balanced|\bbalance\b(?!d)|\bbalancing\b|असंतुलित|कंकाल/i;

/** \ce{...} bodies in a string (one level of nested braces). */
export function ceBodies(text: string): string[] {
  const out: string[] = [];
  const re = /\\ce\{((?:[^{}]|\{[^{}]*\})*)\}/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) out.push(m[1]!);
  return out;
}

type Counts = Record<string, number>;

function add(into: Counts, from: Counts, k = 1) {
  for (const [el, n] of Object.entries(from)) into[el] = (into[el] ?? 0) + n * k;
}

/** Element counts of a formula such as Ca(OH)2, [Cu(NH3)4]SO4, CuSO4.5H2O. Throws when unparseable. */
export function parseFormula(formula: string): Counts {
  const parts = formula.split(/\s*[.*·]\s*/);
  const total: Counts = {};
  for (const part of parts) {
    const m = /^(\d*)(.+)$/.exec(part.trim());
    if (!m) throw new Error(`cannot parse ${formula}`);
    add(total, parseGroup(m[2]!), m[1] ? Number(m[1]) : 1);
  }
  return total;
}

function parseGroup(f: string): Counts {
  const stack: Counts[] = [{}];
  let i = 0;
  while (i < f.length) {
    const c = f[i]!;
    if (c === '(' || c === '[') {
      stack.push({});
      i++;
      continue;
    }
    if (c === ')' || c === ']') {
      i++;
      let num = '';
      while (/\d/.test(f[i] ?? '')) num += f[i++];
      const grp = stack.pop();
      if (!grp || !stack.length) throw new Error(`unbalanced brackets in ${f}`);
      add(stack[stack.length - 1]!, grp, num ? Number(num) : 1);
      continue;
    }
    const m = /^([A-Z][a-z]?)(\d*)/.exec(f.slice(i));
    if (!m) throw new Error(`cannot parse ${f}`);
    const top = stack[stack.length - 1]!;
    top[m[1]!] = (top[m[1]!] ?? 0) + (m[2] ? Number(m[2]) : 1);
    i += m[0].length;
  }
  if (stack.length !== 1) throw new Error(`unbalanced brackets in ${f}`);
  return stack[0]!;
}

const NON_SPECIES = /^(heat|energy|light|electricity|sunlight|catalyst|Δ|\\Delta)$/i;

function side(s: string): Counts {
  const total: Counts = {};
  for (let term of s.split(/\s\+\s/)) {
    term = term
      .trim()
      .replace(/\((?:s|l|g|aq)\)/g, '')
      .replace(/\s+(?:\^|v)$/, '')
      .replace(/\^\{?[0-9]*[+-]\}?/g, '')
      .replace(/(?<=[A-Za-z0-9)\]])[+-]+$/, '')
      .trim();
    if (!term || NON_SPECIES.test(term)) continue;
    const m = /^(\d+(?:\/\d+)?)?\s*(.+)$/.exec(term)!;
    const coef = m[1] ? (m[1].includes('/') ? Number(m[1].split('/')[0]) / Number(m[1].split('/')[1]) : Number(m[1])) : 1;
    add(total, parseFormula(m[2]!), coef);
  }
  return total;
}

/** mhchem reaction arrows (with optional [above][below] text). `=` is a double bond in mhchem, not an arrow. */
const ARROW = /\s*(?:<=>>|<<=>|<=>|<->|->|<-)\s*(?:\[[^\]]*\]){0,2}\s*/;

export type BalanceResult = { kind: 'balanced' } | { kind: 'unbalanced'; elements: string[] } | { kind: 'skipped'; reason: string };

/** Checks one mhchem equation body (without \ce{}). */
export function checkBalance(body: string): BalanceResult {
  if (!ARROW.test(body)) return { kind: 'skipped', reason: 'no reaction arrow' };
  if (/(?:^|[\s+])[xn]\s*[A-Z(]|\?|_{2,}|\.\.\.|…|\\/.test(body.replace(/->\[[^\]]*\]/g, '->'))) return { kind: 'skipped', reason: 'placeholder or markup' };
  const sides = body.split(ARROW).filter((s) => s.trim());
  if (sides.length !== 2) return { kind: 'skipped', reason: 'not a single reaction' };
  try {
    const L = side(sides[0]!);
    const R = side(sides[1]!);
    const bad = [...new Set([...Object.keys(L), ...Object.keys(R)])].filter((e) => Math.abs((L[e] ?? 0) - (R[e] ?? 0)) > 1e-9);
    return bad.length ? { kind: 'unbalanced', elements: bad } : { kind: 'balanced' };
  } catch (e) {
    return { kind: 'skipped', reason: (e as Error).message };
  }
}
