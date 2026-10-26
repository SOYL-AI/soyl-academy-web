/**
 * Arithmetic inside worked solutions (exemplar-maths recommendation 7: a key-only check missed a
 * wrong number inside a solution). In every maths span of a solution, model answer or worked
 * example, each pair of ADJACENT sides of an `=` chain that are purely numeric is evaluated with the
 * safe expression parser and must agree within 1% (use \approx for rounded values; ≈ links are not
 * checked). Sides with variables, units or words are skipped, so this only ever compares numbers
 * with numbers: e.g. `\dfrac{3}{5} \times 12 = 7.2` is checked, `AE = 4.5` is not.
 *
 * This is the cheap stage-4 half; stage 5 (M2) re-solves every question independently.
 */
import { evaluate, parseExpr, type Node } from './expr';

const TOLERANCE = 0.01;

/** Replaces \frac{a}{b} (and \dfrac, \tfrac) with ((a)/(b)), innermost first. */
function replaceFracs(tex: string): string {
  const re = /\\[dt]?frac\s*\{([^{}]*)\}\s*\{([^{}]*)\}/;
  let out = tex;
  for (let guard = 0; re.test(out) && guard < 50; guard++) out = out.replace(re, '(($1)/($2))');
  // \frac23 shorthand
  return out.replace(/\\[dt]?frac\s*(\d)(\d)/g, '(($1)/($2))');
}

/** LaTeX side → expression source, or null when it is not purely numeric. */
export function texToNumericExpr(side: string): string | null {
  let s = side.trim();
  // Units, words, degrees and percentages make a side non-numeric (letters are rejected below).
  if (!s || /%|°|\\circ/.test(s)) return null;
  s = s.replace(/\\left|\\right|\\[,;:! ]|~/g, ' ');
  s = replaceFracs(s);
  s = s
    .replace(/\\sqrt\s*\{([^{}]*)\}/g, 'sqrt($1)')
    .replace(/\\times|\\cdot/g, '*')
    .replace(/\\div/g, '/')
    .replace(/\\pi/g, 'pi')
    .replace(/(\d),(?=\d{2,3}\b)/g, '$1')
    .replace(/[{]/g, '(')
    .replace(/[}]/g, ')')
    .replace(/×/g, '*')
    .replace(/÷/g, '/')
    .replace(/−/g, '-');
  if (/\\|[A-Za-z_]/.test(s.replace(/sqrt|pi/g, ''))) return null;
  return s.trim() || null;
}

function hasVariable(n: Node): boolean {
  switch (n.t) {
    case 'var':
      return true;
    case 'const':
      return n.name === 'e';
    case 'num':
      return false;
    case 'neg':
    case 'call':
      return hasVariable(n.a);
    case 'bin':
      return hasVariable(n.a) || hasVariable(n.b);
  }
}

export function numericValue(side: string): number | null {
  const src = texToNumericExpr(side);
  if (!src) return null;
  try {
    const ast = parseExpr(src);
    if (hasVariable(ast)) return null;
    const v = evaluate(ast, 0);
    return Number.isFinite(v) ? v : null;
  } catch {
    return null;
  }
}

export interface ArithmeticSlip {
  left: string;
  right: string;
  leftValue: number;
  rightValue: number;
}

/** Checks one maths span. Only `=` chains count; spans with ≈, <, >, ≤, ≥, ≠ links are split there and not compared across. */
export function checkArithmetic(tex: string): ArithmeticSlip[] {
  const slips: ArithmeticSlip[] = [];
  // Break the span at relations other than "=", then walk "=" chains inside each piece.
  for (const piece of tex.split(/\\approx|≈|\\neq|\\ne\b|\\le(?:q)?\b|\\ge(?:q)?\b|<|>|\\Rightarrow|\\implies|\\therefore|,\s|;|\\quad|\\qquad|\\text\{\s*(?:and|so|or)\s*\}/)) {
    const sides = piece.split(/(?<![<>!\\])=/);
    if (sides.length < 2) continue;
    for (let i = 0; i + 1 < sides.length; i++) {
      const a = numericValue(sides[i]!);
      const b = numericValue(sides[i + 1]!);
      if (a === null || b === null) continue;
      if (Math.abs(a - b) > Math.max(1e-9, TOLERANCE * Math.max(Math.abs(a), Math.abs(b))))
        slips.push({ left: sides[i]!.trim(), right: sides[i + 1]!.trim(), leftValue: a, rightValue: b });
    }
  }
  return slips;
}
