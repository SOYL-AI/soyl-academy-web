// Exact quadratic solver for ICSE 10 Mathematics ch05 (Quadratic Equations in One Variable).
// Integer coefficients only (equations with fractions are cleared first, and the working-line checker
// in work.mjs proves the cleared form is equivalent). Roots are found exactly: rational roots as reduced
// fractions, irrational roots as (p ± q√s)/r with s square-free, and EVERY exact root is substituted back
// into ax² + bx + c with integer arithmetic (both the rational and the √s parts must vanish). Rounding to
// decimal places / significant figures refuses values within 10⁻⁷ of a rounding boundary.
export const gcd = (a, b) => (b === 0 ? Math.abs(a) : gcd(b, a % b));

/** Largest k with k² | n, and the square-free rest: n = k²·s. */
export function surd(n) {
  if (!Number.isInteger(n) || n < 0) throw new Error(`surd of ${n}`);
  let k = 1, s = n;
  for (let p = 2; p * p <= s; p++) while (s % (p * p) === 0) { s /= p * p; k *= p; }
  return { k, s };
}
export const isSquare = (n) => n >= 0 && Number.isInteger(Math.sqrt(n)) && Math.sqrt(n) ** 2 === n;

/** TeX of n/d, reduced, sign in front: "4", "-\dfrac{2}{3}". */
export function fracTex(n, d = 1) {
  if (d === 0) throw new Error('zero denominator');
  if (d < 0) { n = -n; d = -d; }
  const g = gcd(n, d) || 1;
  n /= g; d /= g;
  if (d === 1) return String(n);
  return `${n < 0 ? '-' : ''}\\dfrac{${Math.abs(n)}}{${d}}`;
}
const term = (coef, v, power, first) => {
  if (coef === 0) return '';
  const sign = coef < 0 ? (first ? '-' : ' - ') : first ? '' : ' + ';
  const m = Math.abs(coef);
  const body = power === 0 ? String(m) : `${m === 1 ? '' : m}${v}${power === 2 ? '^2' : ''}`;
  return sign + body;
};
/** "3x^2 - 10x - 8" (coefficients highest power first). */
export function polyTex([a, b, c], v = 'x') {
  let s = term(a, v, 2, true);
  s += term(b, v, 1, s === '');
  s += term(c, v, 0, s === '');
  return s || '0';
}

/** TeX of (p + sign·q√s)/r with r > 0 already reduced. */
function surdRootTex(p, q, s, r, sign) {
  const rad = `${q === 1 ? '' : q}\\sqrt{${s}}`;
  const num = p === 0 ? `${sign < 0 ? '-' : ''}${rad}` : `${p} ${sign < 0 ? '-' : '+'} ${rad}`;
  return r === 1 ? num : `\\dfrac{${num}}{${r}}`;
}

/**
 * Qd(a, b, c): the quadratic ax² + bx + c = 0.
 *   D, nature ('distinct' | 'equal' | 'none'), rational (D a perfect square), roots (ascending floats),
 *   exact roots [{ val, tex, n, d } | { val, tex, p, q, s, r }], pmTex ("3 \pm \sqrt{5}"), q (coefficients), v.
 * Every exact root is verified by integer substitution; the build stops otherwise.
 */
export function Qd(a, b, c, v = 'x') {
  for (const k of [a, b, c]) if (!Number.isInteger(k)) throw new Error(`Qd needs integers: ${a}, ${b}, ${c}`);
  if (a === 0) throw new Error('not quadratic');
  const D = b * b - 4 * a * c;
  const nature = D > 0 ? 'distinct' : D === 0 ? 'equal' : 'none';
  const out = { a, b, c, q: [a, b, c], v, D, nature, rational: isSquare(D), tex: polyTex([a, b, c], v), exact: [], roots: [], pmTex: null };
  if (D < 0) return out;
  if (out.rational) {
    const sq = Math.sqrt(D);
    const pairs = D === 0 ? [[-b, 2 * a]] : [[-b - sq, 2 * a], [-b + sq, 2 * a]];
    for (const [n0, d0] of pairs) {
      let n = n0, d = d0;
      if (d < 0) { n = -n; d = -d; }
      const g = gcd(n, d) || 1;
      n /= g; d /= g;
      // a n² + b n d + c d² = 0 exactly
      if (a * n * n + b * n * d + c * d * d !== 0) throw new Error(`substitution failed for ${n}/${d} in ${out.tex}`);
      out.exact.push({ val: n / d, tex: fracTex(n, d), n, d });
    }
  } else {
    const { k, s } = surd(D);
    let p = -b, q = k, r = 2 * a;
    if (r < 0) { p = -p; r = -r; } // q stays positive: ± covers both signs
    const g = gcd(gcd(p, q), r) || 1;
    p /= g; q /= g; r /= g;
    for (const sign of [-1, 1]) {
      const qq = sign * q;
      // x = (p + qq√s)/r: a(p² + qq²s) + b p r + c r² = 0 and 2a p qq + b qq r = 0
      if (a * (p * p + qq * qq * s) + b * p * r + c * r * r !== 0 || 2 * a * p * qq + b * qq * r !== 0) throw new Error(`surd substitution failed in ${out.tex}`);
      out.exact.push({ val: (p + qq * Math.sqrt(s)) / r, tex: surdRootTex(p, q, s, r, sign), p, q, s, r });
    }
    const rad = `${q === 1 ? '' : q}\\sqrt{${s}}`;
    const num = p === 0 ? `\\pm ${rad}` : `${p} \\pm ${rad}`;
    out.pmTex = r === 1 ? num : `\\dfrac{${num}}{${r}}`;
  }
  out.exact.sort((u, w) => u.val - w.val);
  out.roots = out.exact.map((e) => e.val);
  // float cross-check by direct substitution
  for (const x of out.roots) if (Math.abs(a * x * x + b * x + c) > 1e-9 * Math.max(1, Math.abs(a * x * x), Math.abs(c))) throw new Error(`float substitution failed in ${out.tex} at ${x}`);
  return out;
}

/** Quadratic in x from a function x ↦ value known to be a polynomial of degree ≤ 2 (three samples). */
export function coeffsOf(g) {
  const y0 = g(0), y1 = g(1), y2 = g(2);
  const a = (y2 - 2 * y1 + y0) / 2, b = y1 - y0 - a, c = y0;
  for (const t of [3, -2, 0.5, 7]) if (Math.abs(g(t) - (a * t * t + b * t + c)) > 1e-9 * Math.max(1, Math.abs(g(t)))) throw new Error('not a polynomial of degree ≤ 2');
  return [a, b, c].map((v) => (Math.abs(v - Math.round(v)) < 1e-9 ? Math.round(v) : v));
}

/** v rounded to k decimal places, as a string; refuses values within 1e-7 of a rounding boundary. */
export function dp(v, k) {
  const scaled = Math.abs(v) * 10 ** k;
  const frac = scaled - Math.floor(scaled);
  if (Math.abs(frac - 0.5) < 1e-7) throw new Error(`${v} is too close to a rounding boundary at ${k} d.p.`);
  const s = (Math.sign(v) * Math.round(scaled) / 10 ** k).toFixed(k);
  return s === `-${(0).toFixed(k)}` ? (0).toFixed(k) : s;
}
/** v rounded to n significant figures, as a string (e.g. 0.207, -1.21, 12.5). */
export function sf(v, n) {
  if (v === 0) throw new Error('sf of 0');
  const e = Math.floor(Math.log10(Math.abs(v)));
  const k = n - 1 - e;
  if (k >= 0) {
    const s = dp(v, k);
    // rounding may carry into a new digit (9.996 → 10.00): recompute with one place fewer
    const digits = s.replace(/[-.]/g, '').replace(/^0+/, '');
    return digits.length > n ? dp(v, k - 1) : s;
  }
  const unit = 10 ** -k;
  const q = v / unit;
  if (Math.abs(Math.abs(q - Math.trunc(q)) - 0.5) < 1e-7) throw new Error(`${v} too close to a boundary`);
  return String(Math.round(q) * unit);
}
/** Number of decimal places written in a decimal literal. */
export const places = (s) => (String(s).includes('.') ? String(s).split('.')[1].length : 0);

/** Values of a parameter k for which D(k) = 0, where D(k) is a polynomial of degree ≤ 2 in k (exact rationals). */
export function equalRootParams(Dk) {
  const [A, B, C] = coeffsOf(Dk);
  if (A === 0) {
    if (B === 0) throw new Error('D independent of k');
    return [{ val: -C / B, tex: fracTex(-C, B) }];
  }
  return Qd(A, B, C, 'k').exact.map((e) => ({ val: e.val, tex: e.tex }));
}
