// Exact linear-inequation solver for ICSE 10 Mathematics ch04 (Linear Inequations).
// Rationals are BigInt pairs; an inequation is ax + b REL cx + d; a condition list is a conjunction
// (a combined inequation is two conditions). Every solution set is found two ways and asserted equal:
//   1. algebraically (collect x terms, divide, reverse the sign when dividing by a negative), and
//   2. by brute force: every integer in a wide window is tested in the ORIGINAL inequations, and for R
//      thousands of rational sample points (endpoints, endpoints ± small steps, a fine grid) are tested.
// Roster, set-builder and interval descriptions are generated from the verified set.

// ---------------------------------------------------------------- rationals
const babs = (a) => (a < 0n ? -a : a);
const bgcd = (a, b) => { a = babs(a); b = babs(b); while (b) [a, b] = [b, a % b]; return a; };
export function fr(n, d = 1) {
  if (typeof n === 'object') return n;
  if (!Number.isFinite(n) || !Number.isFinite(d)) throw new Error(`fr: not a finite number (${n}/${d})`);
  if (!Number.isInteger(n) || !Number.isInteger(d)) {
    // allow decimals with up to 6 places
    const s = 1e6;
    return fr(Math.round(n * s), Math.round(d * s));
  }
  let N = BigInt(n), D = BigInt(d);
  if (D === 0n) throw new Error('zero denominator');
  if (D < 0n) { N = -N; D = -D; }
  const g = bgcd(N, D) || 1n;
  return { n: N / g, d: D / g };
}
const mk = (N, D) => { if (D < 0n) { N = -N; D = -D; } const g = bgcd(N, D) || 1n; return { n: N / g, d: D / g }; };
export const add = (p, q) => mk(fr(p).n * fr(q).d + fr(q).n * fr(p).d, fr(p).d * fr(q).d);
export const sub = (p, q) => add(p, neg(q));
export const neg = (p) => ({ n: -fr(p).n, d: fr(p).d });
export const mul = (p, q) => mk(fr(p).n * fr(q).n, fr(p).d * fr(q).d);
export const div = (p, q) => { if (fr(q).n === 0n) throw new Error('divide by zero'); return mk(fr(p).n * fr(q).d, fr(p).d * fr(q).n); };
export const cmp = (p, q) => { const s = fr(p).n * fr(q).d - fr(q).n * fr(p).d; return s < 0n ? -1 : s > 0n ? 1 : 0; };
export const isInt = (p) => fr(p).d === 1n;
export const num = (p) => Number(fr(p).n) / Number(fr(p).d);
export const eqv = (p, q) => cmp(p, q) === 0;
const floorQ = (p) => { const { n, d } = fr(p); const q = n / d; return Number(n < 0n && q * d !== n ? q - 1n : q); };
const ceilQ = (p) => -floorQ(neg(p));

/** Plain text of a rational: -9/2 → "−9/2"; integers and short decimals as decimals when exact (−4.5). */
export function txt(p, { minus = '−', decimal = true } = {}) {
  const { n, d } = fr(p);
  const sgn = n < 0n ? minus : '';
  const a = babs(n);
  if (d === 1n) return `${sgn}${a}`;
  if (decimal) {
    let dd = d; while (dd % 2n === 0n) dd /= 2n; while (dd % 5n === 0n) dd /= 5n;
    if (dd === 1n) { const v = Number(a) / Number(d); const s = String(v); if (s.split('.')[1]?.length <= 3) return `${sgn}${s}`; }
  }
  return `${sgn}${a}/${d}`;
}
/** TeX of a rational: −\dfrac{9}{2}, or a decimal when asked. */
export function tex(p, { decimal = false } = {}) {
  const { n, d } = fr(p);
  if (d === 1n) return `${n}`;
  if (decimal) return txt(p, { minus: '-' });
  return `${n < 0n ? '-' : ''}\\dfrac{${babs(n)}}{${d}}`;
}
/** Spoken words for a rational: "minus 4.5", "two thirds" is not needed; we say "minus 9 over 2". */
export function words(p) {
  const t = txt(p, { minus: 'minus ' });
  return t.replace('/', ' over ');
}

// ---------------------------------------------------------------- inequations
export const REL = { '<': (s) => s < 0, '<=': (s) => s <= 0, '>': (s) => s > 0, '>=': (s) => s >= 0 };
const FLIP = { '<': '>', '<=': '>=', '>': '<', '>=': '<=' };
export const relTex = { '<': '<', '<=': r('\\le'), '>': '>', '>=': r('\\ge') };
function r(s) { return s; }
/** Linear expression ax + b. */
export const L = (a, b = 0) => ({ a: fr(a), b: fr(b) });
export const K = (b) => L(0, b);
export const X = L(1, 0);
export const evalL = (e, x) => add(mul(e.a, x), e.b);
/** One inequation  left REL right. */
const asL = (e) => (typeof e === 'number' || (e && 'n' in e) ? K(e) : e);
export const ineq = (left, rel, right) => ({ left: asL(left), rel, right: asL(right) });
/** Combined inequation lo REL1 mid REL2 hi as two conditions. */
export const combined = (lo, rel1, mid, rel2, hi) => [ineq(lo, rel1, mid), ineq(mid, rel2, hi)];
export const holds = (q, x) => REL[q.rel](cmp(evalL(q.left, x), evalL(q.right, x)));
export const holdsAll = (conds, x) => conds.every((q) => holds(q, x));

// Interval: { lo, loIn, hi, hiIn } with lo/hi = null for −∞/+∞. A set over R = sorted disjoint intervals.
const ALL = () => [{ lo: null, loIn: false, hi: null, hiIn: false }];
/** Solve one inequation algebraically, recording the steps (for working lines). */
export function solveOne(q) {
  const a = sub(q.left.a, q.right.a); // (a − c) x REL (d − b)
  const k = sub(q.right.b, q.left.b);
  if (fr(a).n === 0n) return { set: REL[q.rel](cmp(0, k)) ? ALL() : [], a, k, rel: q.rel, flipped: false };
  const v = div(k, a);
  const flipped = cmp(a, 0) < 0;
  const rel = flipped ? FLIP[q.rel] : q.rel;
  const set = rel === '<' ? [{ lo: null, loIn: false, hi: v, hiIn: false }]
    : rel === '<=' ? [{ lo: null, loIn: false, hi: v, hiIn: true }]
      : rel === '>' ? [{ lo: v, loIn: false, hi: null, hiIn: false }]
        : [{ lo: v, loIn: true, hi: null, hiIn: false }];
  return { set, a, k, v, rel, flipped };
}
export function intersect(A, B) {
  const out = [];
  for (const I of A) for (const J of B) {
    let lo, loIn, hi, hiIn;
    if (I.lo === null) { lo = J.lo; loIn = J.loIn; } else if (J.lo === null) { lo = I.lo; loIn = I.loIn; } else {
      const c = cmp(I.lo, J.lo); lo = c >= 0 ? I.lo : J.lo; loIn = c > 0 ? I.loIn : c < 0 ? J.loIn : I.loIn && J.loIn;
    }
    if (I.hi === null) { hi = J.hi; hiIn = J.hiIn; } else if (J.hi === null) { hi = I.hi; hiIn = I.hiIn; } else {
      const c = cmp(I.hi, J.hi); hi = c <= 0 ? I.hi : J.hi; hiIn = c < 0 ? I.hiIn : c > 0 ? J.hiIn : I.hiIn && J.hiIn;
    }
    if (lo !== null && hi !== null) { const c = cmp(lo, hi); if (c > 0 || (c === 0 && !(loIn && hiIn))) continue; }
    out.push({ lo, loIn, hi, hiIn });
  }
  return out;
}
export function union(A, B) {
  const all = [...A, ...B].sort((I, J) => (I.lo === null ? -1 : J.lo === null ? 1 : cmp(I.lo, J.lo)));
  const out = [];
  for (const I of all) {
    const last = out[out.length - 1];
    if (last && (last.hi === null || I.lo === null || cmp(I.lo, last.hi) < 0 || (cmp(I.lo, last.hi) === 0 && (I.loIn || last.hiIn)))) {
      if (last.hi === null || I.hi === null) { last.hi = null; last.hiIn = false; } else { const c = cmp(I.hi, last.hi); if (c > 0) { last.hi = I.hi; last.hiIn = I.hiIn; } else if (c === 0) last.hiIn ||= I.hiIn; }
    } else out.push({ ...I });
  }
  return out;
}
export const inSet = (S, x) => S.some((I) => (I.lo === null || cmp(x, I.lo) > 0 || (I.loIn && eqv(x, I.lo))) && (I.hi === null || cmp(x, I.hi) < 0 || (I.hiIn && eqv(x, I.hi))));
/** Solve a conjunction of inequations (a combined inequation, or A ∩ B) over R. */
export const solveAll = (conds) => conds.map((q) => solveOne(q).set).reduce(intersect, ALL());

// ---------------------------------------------------------------- replacement sets
const W0 = -300, W1 = 300;
export const UNIVERSE = { N: (x) => x >= 1, W: (x) => x >= 0, Z: () => true };
/**
 * Solution set of `conds` over U ∈ {N, W, Z, R}, verified by brute force. Returns
 * { U, intervals, members (window list for N/W/Z), left, right (continues beyond the window), roster, builder, count }.
 */
export function solution(conds, U) {
  const S = solveAll(conds);
  if (U === 'R') {
    // sample: every endpoint exactly and ± small steps, a 1/8 grid, and odd sevenths
    const pts = [];
    for (const I of S) for (const e of [I.lo, I.hi]) if (e !== null) for (const h of [0, 1, -1, fr(1, 1000), fr(-1, 1000), fr(1, 7), fr(-1, 7)]) pts.push(add(e, h));
    for (let i = W0 * 8; i <= W1 * 8; i++) pts.push(fr(i, 8));
    for (let i = W0 * 7; i <= W1 * 7; i += 3) pts.push(fr(i, 7));
    for (const q of conds) { const s = solveOne(q); if (s.v) for (const h of [0, fr(1, 1000), fr(-1, 1000)]) pts.push(add(s.v, h)); }
    for (const x of pts) if (holdsAll(conds, x) !== inSet(S, x)) throw new Error(`R sampling disagrees at x = ${txt(x)}`);
    return { U, intervals: S, samples: pts.length };
  }
  if (Array.isArray(U)) {
    // a finite replacement set given in the question, e.g. {-5, -4, …, 5}
    const brute = U.filter((x) => holdsAll(conds, fr(x)));
    const alg = U.filter((x) => inSet(S, fr(x)));
    if (brute.join() !== alg.join()) throw new Error(`brute force ${brute} vs algebra ${alg}`);
    return { U: 'list', intervals: S, members: brute, left: false, right: false, count: brute.length };
  }
  const inU = UNIVERSE[U];
  const brute = [];
  for (let x = W0; x <= W1; x++) if (inU(x) && holdsAll(conds, fr(x))) brute.push(x);
  const alg = [];
  for (let x = W0; x <= W1; x++) if (inU(x) && inSet(S, fr(x))) alg.push(x);
  if (brute.join() !== alg.join()) throw new Error(`brute force ${brute} vs algebra ${alg}`);
  const right = brute.includes(W1), left = brute.includes(W0);
  if ((right || left) === false && brute.some((x) => Math.abs(x) > W1 - 50)) throw new Error('members near the window edge');
  return { U, intervals: S, members: brute, left, right, count: left || right ? Infinity : brute.length };
}
export const members = (sol) => sol.members;

/** Roster TeX: \{-2, -1, 0\}; \{4, 5, 6, \ldots\}; \{\ldots, -1, 0, 1\}; \phi. */
export function roster(sol, { show = 3 } = {}) {
  const m = sol.members;
  if (!m.length) return '\\phi';
  if (sol.left && sol.right) throw new Error('all integers');
  if (sol.right) { const first = m.slice(0, show); return `\\{${first.join(', ')}, \\ldots\\}`; }
  if (sol.left) { const last = m.slice(-show); return `\\{\\ldots, ${last.join(', ')}\\}`; }
  return `\\{${m.join(', ')}\\}`;
}
/** Interval condition TeX for x: "-2 \le x < 4", "x > \dfrac{9}{2}", or "x \in \mathbb{R}". */
export function condTex(S, { v = 'x', decimal = false } = {}) {
  if (!S.length) return null;
  if (S.length > 1) return S.map((I) => condTex([I], { v, decimal })).join(' \\text{ or } ');
  const I = S[0];
  const lo = I.lo !== null ? `${tex(I.lo, { decimal })} ${I.loIn ? '\\le' : '<'} ` : '';
  const hi = I.hi !== null ? ` ${I.hiIn ? '\\le' : '<'} ${tex(I.hi, { decimal })}` : '';
  if (!lo && !hi) return `${v} \\in \\mathbb{R}`;
  if (lo && !hi) return `${v} ${I.loIn ? '\\ge' : '>'} ${tex(I.lo, { decimal })}`;
  return `${lo}${v}${hi}`;
}
/** Set-builder TeX: \{x : x \in \mathbb{R}, -2 \le x < 4\}. */
export function builder(sol, { decimal = false } = {}) {
  const c = condTex(sol.intervals, { decimal });
  if (!c) return '\\phi';
  return `\\{x : x \\in \\mathbb{${sol.U}},\\ ${c}\\}`;
}
/** Spoken/plain description of S for alt text. */
export function describe(sol) {
  if (sol.U !== 'R') {
    const m = sol.members;
    if (!m.length) return 'no numbers: the solution set is empty';
    const w = (x) => (x < 0 ? `minus ${-x}` : `${x}`);
    if (sol.right) return `${m.slice(0, 3).map(w).join(', ')} and every larger ${sol.U === 'Z' ? 'integer' : 'whole number'}`;
    if (sol.left) return `${m.slice(-3).map(w).join(', ')} and every smaller integer`;
    return m.length === 1 ? w(m[0]) : `${m.slice(0, -1).map(w).join(', ')} and ${w(m[m.length - 1])}`;
  }
  if (!sol.intervals.length) return 'no numbers: the solution set is empty';
  return sol.intervals.map((I) => {
    if (I.lo === null && I.hi === null) return 'every real number';
    if (I.lo !== null && I.hi !== null) return `every real number from ${words(I.lo)} (${I.loIn ? 'included' : 'not included'}) to ${words(I.hi)} (${I.hiIn ? 'included' : 'not included'})`;
    if (I.lo !== null) return `every real number greater than ${I.loIn ? 'or equal to ' : ''}${words(I.lo)}`;
    return `every real number less than ${I.hiIn ? 'or equal to ' : ''}${words(I.hi)}`;
  }).join(', and ');
}

// ---------------------------------------------------------------- working lines (TeX)
const coefTex = (a, v = 'x') => { const s = tex(a); return s === '1' ? v : s === '-1' ? `-${v}` : `${s}${v}`; };
/** TeX of ax + b. */
export function lin(e, v = 'x') {
  const a = e.a, b = e.b;
  if (fr(a).n === 0n) return tex(b);
  const head = coefTex(a, v);
  if (fr(b).n === 0n) return head;
  return cmp(b, 0) > 0 ? `${head} + ${tex(b)}` : `${head} - ${tex(neg(b))}`;
}
/** Steps for one inequation: collected form, divided form (with the reversal noted). */
export function steps(q) {
  const s = solveOne(q);
  const left = lin(L(s.a, 0));
  const lines = [`${left} ${relTex[q.rel]} ${tex(s.k)}`];
  if (s.v !== undefined && !eqv(s.a, 1)) lines.push(`x ${relTex[s.rel]} ${tex(s.v)}`);
  return { ...s, lines };
}
export { relTex as REL_TEX, floorQ, ceilQ };
