// CBSE 11 Mathematics ch12 Limits and Derivatives: objective items (mcq, assertion-reason, true-false, fill-blank, numerical).
// Every key, distractor and number in a solution is recomputed here: exact rationals for polynomial/rational limits,
// two-sided numeric approach for trigonometric/exponential limits, five-point numeric differentiation for derivatives.
import { Q, mk } from './lib.mjs';
import { r, F, Fr, P, limRat, approachExact, near, numLim, sideLim, dnum, checkDeriv, matching } from './calc.mjs';

const T = (s) => `$${s}$`;
const frT = (v) => T(F(v.n, v.d).tex());
const eqv = (u, v) => (typeof u === 'string' ? u === v : Math.abs(u - v) < 1e-9);
/** Options from typed values: the key is the single option equal to the re-solved target. */
function opts(vals, target, show) {
  const hits = vals.map((v, i) => (eqv(v, target) ? i : -1)).filter((i) => i >= 0);
  if (hits.length !== 1) throw new Error(`options ${JSON.stringify(vals)} do not single out ${target}`);
  return { key: 'abcd'[hits[0]], opts: vals.map((v) => (show ? show(v) : T(String(v)))) };
}
const fq = (a, b) => T(`\\dfrac{${a}}{${b}}`);
const lim0 = (body) => r`$\displaystyle\lim_{x \to 0} ${body}$`;
const PI = Math.PI;

// =============================================================== multiple choice
{ // m01 (deck 1 check): polynomial limit by substitution
  const p = P(1, 4, -3, 7);
  const vals = [p.eval(-2).num(), (8 + 16 + 6 + 7), (-8 + 16 - 6 + 7), 7];
  const o = opts(vals, 21);
  Q('m01', mk.mcq({ stem: r`The value of $\displaystyle\lim_{x \to -2}\left(x^3 + 4x^2 - 3x + 7\right)$ is`, ...o, sol: r`A polynomial is continuous, so substitute $x = -2$: $-8 + 16 + 6 + 7 = 21$.`, d: 1, c: 'understanding', t: [1], time: 60 }), (Cx) => { Cx.which(vals, p.eval(-2).num()); Cx.assert(p.eval(-2).eq(21), 'p(-2) = 21 exactly'); Cx.sol([8, 16, 6, 7, 21]); });
}
{ // m02 (deck 1 check): sin 8x / 5x
  const g = (x) => Math.sin(8 * x) / (5 * x);
  const vals = [8 / 5, 5 / 8, 1, 8];
  const o = opts(vals, 8 / 5, (v) => ({ 1.6: fq(8, 5), 0.625: fq(5, 8), 1: '$1$', 8: '$8$' }[String(v)]));
  Q('m02', mk.mcq({ stem: r`The value of $\displaystyle\lim_{x \to 0}\dfrac{\sin 8x}{5x}$ is`, ...o, sol: r`Write $\dfrac{\sin 8x}{5x} = \dfrac{\sin 8x}{8x} \times \dfrac{8}{5}$ and use $\dfrac{\sin u}{u} \to 1$ to get $\dfrac{8}{5}$.`, d: 2, c: 'application', t: [1], time: 75 }), (Cx) => { Cx.assert(numLim(g, 0, 1.6), 'numeric 8/5 from both sides'); Cx.which(vals, 8 / 5); Cx.sol([8, 5]); });
}
{ // m03 (deck 2 check): which limit defines the derivative
  const f = (x) => x * x, x0 = 3, h = 1e-7;
  const cands = [
    (hh) => (f(x0 + hh) - f(x0)) / hh,
    (hh) => (f(x0 + hh) + f(x0)) / hh,
    (hh) => (f(x0 + hh) - f(x0)) / (x0 + hh),
    (hh) => (f(x0 + hh) - f(x0)) * hh,
  ];
  const tends = cands.map((c) => near(c(h), 6, 1e-4) && near(c(-h), 6, 1e-4));
  Q('m03', mk.mcq({ stem: r`The derivative $f'(x)$ of a real function $f$ is defined as`, key: 'a', opts: [r`$\displaystyle\lim_{h \to 0}\dfrac{f(x + h) - f(x)}{h}$`, r`$\displaystyle\lim_{h \to 0}\dfrac{f(x + h) + f(x)}{h}$`, r`$\displaystyle\lim_{h \to 0}\dfrac{f(x + h) - f(x)}{x + h}$`, r`$\displaystyle\lim_{h \to 0}\left[f(x + h) - f(x)\right]h$`], sol: r`Only the difference quotient divides the change in $f$ by the change $h$ in $x$, giving the slope.`, d: 1, c: 'recall', t: [2], time: 45 }), (Cx) => { Cx.assert(tends.join() === 'true,false,false,false', `only the difference quotient tends to f'(3) = 6 for f(x) = x^2 (${tends})`); Cx.key('a'); });
}
{ // m04 (deck 2 check): product rule vs plausible wrong rules
  const u = P(3, -1), v = P(1, 0, 4);
  const right = u.deriv().mul(v).add(u.mul(v.deriv()));
  const wrong1 = u.deriv().mul(v.deriv()); // u'v'
  const wrong2 = u.deriv().mul(v).sub(u.mul(v.deriv())); // u'v - uv'
  const wrong3 = u.deriv().mul(v); // u'v only
  const polys = [right, wrong1, wrong2, wrong3];
  const o = opts(polys.map((p) => p.tex()), right.tex(), (s) => T(s));
  Q('m04', mk.mcq({ stem: r`Applying the product rule to $(3x - 1)(x^2 + 4)$ gives a derivative equal to`, ...o, sol: r`Product rule: $(uv)' = u'v + uv' = 3(x^2 + 4) + (3x - 1)(2x) = 9x^2 - 2x + 12$.`, d: 2, c: 'understanding', t: [3], time: 75 }), (Cx) => { Cx.assert(right.eq(P(9, -2, 12)) && right.eq(u.mul(v).deriv()), 'product rule agrees with expanding first'); Cx.assert(checkDeriv((x) => u.num(x) * v.num(x), (x) => right.num(x), [-2, 0.5, 3]), 'numeric derivative'); Cx.assert(new Set(polys.map((p) => p.tex())).size === 4, 'four different options'); Cx.which(polys.map((p) => p.tex()), right.tex()); });
}
{ // m05: 0/0 rational limit
  const N = P(1, 0, -16), D = P(1, -1, -12);
  const L = limRat(N, D, 4);
  const vals = [8 / 7, 7 / 8, 0, 1];
  const o = opts(vals, L.value.num(), (v) => ({ [8 / 7]: fq(8, 7), [7 / 8]: fq(7, 8), 0: '$0$', 1: '$1$' }[v]));
  Q('m05', mk.mcq({ stem: r`The value of $\displaystyle\lim_{x \to 4}\dfrac{x^2 - 16}{x^2 - x - 12}$ is`, ...o, sol: r`Substituting gives $\dfrac{0}{0}$. Factorise: $\dfrac{(x - 4)(x + 4)}{(x - 4)(x + 3)} = \dfrac{x + 4}{x + 3} \to \dfrac{8}{7}$.`, d: 2, c: 'application', t: [1], time: 90 }), (Cx) => { Cx.assert(L.value.eq(F(8, 7)) && approachExact(N, D, 4, L.value) && N.eq(P(1, -4).mul(P(1, 4))) && D.eq(P(1, -4).mul(P(1, 3))), 'exact 8/7 and factorisation'); Cx.which(vals, 8 / 7); });
}
{ // m06: standard limit n a^{n-1}
  const g = (x) => (x ** 5 - 32) / (x - 2);
  const vals = [80, 160, 16, 5];
  const o = opts(vals, 5 * 2 ** 4);
  Q('m06', mk.mcq({ stem: r`The value of $\displaystyle\lim_{x \to 2}\dfrac{x^5 - 32}{x - 2}$ is`, ...o, sol: r`Since $32 = 2^5$, the standard limit gives $5 \times 2^{4} = 80$.`, d: 2, c: 'understanding', t: [1], time: 60 }), (Cx) => { Cx.assert(numLim(g, 2, 80, [1e-1, 1e-2, 1e-3, 1e-4], 5e-3) && 5 * 2 ** 4 === 80, 'numeric 80'); Cx.which(vals, 80); });
}
{ // m07: (1 - cos 10x)/x^2
  const g = (x) => (1 - Math.cos(10 * x)) / (x * x);
  const vals = [50, 100, 5, 10];
  const o = opts(vals, 50);
  Q('m07', mk.mcq({ stem: r`The value of $\displaystyle\lim_{x \to 0}\dfrac{1 - \cos 10x}{x^2}$ is`, ...o, sol: r`$1 - \cos 10x = 2\sin^2 5x$, so the limit is $2 \times 25 = 50$.`, d: 3, c: 'application', t: [1], time: 75 }), (Cx) => { Cx.assert(numLim(g, 0, 50, [1e-1, 1e-2, 1e-3], 5e-3) && 2 * 25 === 50 && near(1 - Math.cos(1), 2 * Math.sin(0.5) ** 2, 1e-12), 'numeric 50'); Cx.which(vals, 50); });
}
{ // m08: tan 9x / sin 4x
  const g = (x) => Math.tan(9 * x) / Math.sin(4 * x);
  const vals = [9 / 4, 4 / 9, 36, 1];
  const o = opts(vals, 9 / 4, (v) => ({ [9 / 4]: fq(9, 4), [4 / 9]: fq(4, 9), 36: '$36$', 1: '$1$' }[v]));
  Q('m08', mk.mcq({ stem: r`A student simplifies $\displaystyle\lim_{x \to 0}\dfrac{\tan 9x}{\sin 4x}$. The correct value is`, ...o, sol: r`Divide top and bottom by $x$: $\dfrac{\tan 9x}{9x} \times 9$ over $\dfrac{\sin 4x}{4x} \times 4$, giving $\dfrac{9}{4}$.`, d: 3, c: 'application', t: [1], time: 90 }), (Cx) => { Cx.assert(numLim(g, 0, 2.25, [1e-1, 1e-2, 1e-3, 1e-4], 5e-3), 'numeric 9/4'); Cx.which(vals, 9 / 4); });
}
{ // m09: limit of a split function
  const lf = (x) => 3 * x - 2, rf = (x) => x * x + 1;
  const L = sideLim(lf, 2, -1), R = sideLim(rf, 2, 1);
  const exists = Math.abs(L - R) < 1e-4;
  const vals = ['4', '5', '9', 'dne'];
  if (exists) throw new Error('m09: limits agree');
  const o = opts(vals, 'dne', (v) => (v === 'dne' ? 'The limit does not exist' : T(v)));
  Q('m09', mk.mcq({ stem: r`Let $f(x) = 3x - 2$ for $x < 2$ and $f(x) = x^2 + 1$ for $x \ge 2$. Then $\displaystyle\lim_{x \to 2} f(x)$ is`, ...o, sol: r`The left-hand limit is $3(2) - 2 = 4$ and the right-hand limit is $2^2 + 1 = 5$. They differ, so the limit does not exist.`, d: 3, c: 'understanding', t: [1], time: 75 }), (Cx) => { Cx.assert(!exists && Math.abs(L - 4) < 1e-4 && Math.abs(R - 5) < 1e-4, 'LHL 4, RHL 5'); Cx.which(vals, 'dne'); });
}
{ // m10: difference of two fractions
  const g = (x) => 1 / (x - 1) - 2 / (x * x - 1);
  const vals = [0.5, 1, 0, 2];
  const o = opts(vals, 0.5, (v) => ({ 0.5: fq(1, 2), 1: '$1$', 0: '$0$', 2: '$2$' }[v]));
  Q('m10', mk.mcq({ stem: r`The value of $\displaystyle\lim_{x \to 1}\left[\dfrac{1}{x - 1} - \dfrac{2}{x^2 - 1}\right]$ is`, ...o, sol: r`Combine: $\dfrac{(x + 1) - 2}{(x - 1)(x + 1)} = \dfrac{1}{x + 1}$ for $x \ne 1$, which tends to $\dfrac{1}{2}$.`, d: 4, c: 'analysis', t: [1], time: 105 }), (Cx) => { Cx.assert(numLim(g, 1, 0.5, [1e-1, 1e-2, 1e-3, 1e-4], 5e-3), 'numeric 1/2'); Cx.which(vals, 0.5); });
}
{ // m11: derivative of a cubic at a point
  const p = P(4, -7, 2, -9);
  const d = p.deriv().eval(2).num();
  const vals = [d, 20, p.eval(2).num(), 48 + 28 + 2];
  const o = opts(vals, 22);
  Q('m11', mk.mcq({ stem: r`If $f(x) = 4x^3 - 7x^2 + 2x - 9$, then $f'(2)$ equals`, ...o, sol: r`$f'(x) = 12x^2 - 14x + 2$, so $f'(2) = 48 - 28 + 2 = 22$.`, d: 2, c: 'understanding', t: [3], time: 60 }), (Cx) => { Cx.assert(d === 22 && p.deriv().eq(P(12, -14, 2)) && near(dnum((x) => p.num(x), 2), 22, 1e-8), 'f\'(2) = 22'); Cx.which(vals, 22); Cx.sol([12, 14, 48, 28, 22]); });
}
{ // m12: derivative of x sin x
  const target = (x) => x * Math.cos(x) + Math.sin(x);
  const fns = [(x) => x * Math.cos(x), target, Math.cos, (x) => Math.sin(x) - x * Math.cos(x)];
  const pts = [0.4, 1.1, 2.3];
  const hit = matching(fns, (x) => dnum((y) => y * Math.sin(y), x), pts);
  Q('m12', mk.mcq({ stem: r`Differentiating the product $x\sin x$ with respect to $x$ gives`, key: 'b', opts: [T(r`x\cos x`), T(r`\sin x + x\cos x`), T(r`\cos x`), T(r`\sin x - x\cos x`)], sol: r`Product rule: $(x)'\sin x + x(\sin x)' = \sin x + x\cos x$.`, d: 2, c: 'understanding', t: [3], time: 60 }), (Cx) => { Cx.assert(hit.join() === '1', `only option index 1 matches numeric differentiation (${hit})`); Cx.key('b'); });
}
{ // m13: cot x + 2 cosec x
  const g = (x) => 1 / Math.tan(x) + 2 / Math.sin(x);
  const fns = [
    (x) => -1 / Math.sin(x) ** 2 - 2 * Math.cos(x) / Math.sin(x) ** 2,
    (x) => 1 / Math.sin(x) ** 2 + 2 * Math.cos(x) / Math.sin(x) ** 2,
    (x) => -1 / Math.sin(x) ** 2 + 2 * Math.cos(x) / Math.sin(x) ** 2,
    (x) => -1 / Math.cos(x) ** 2 - 2 * Math.sin(x) / Math.cos(x) ** 2,
  ];
  const hit = matching(fns, (x) => dnum(g, x), [0.6, 1.2, 2.0]);
  Q('m13', mk.mcq({ stem: r`If $y = \cot x + 2\operatorname{cosec} x$, then $\dfrac{dy}{dx}$ equals`, key: 'a', opts: [T(r`-\operatorname{cosec}^2 x - 2\operatorname{cosec} x\cot x`), T(r`\operatorname{cosec}^2 x + 2\operatorname{cosec} x\cot x`), T(r`-\operatorname{cosec}^2 x + 2\operatorname{cosec} x\cot x`), T(r`-\sec^2 x - 2\sec x\tan x`)], sol: r`$(\cot x)' = -\operatorname{cosec}^2 x$ and $(\operatorname{cosec} x)' = -\operatorname{cosec} x\cot x$; add with the factor $2$.`, d: 3, c: 'understanding', t: [3], time: 75 }), (Cx) => { Cx.assert(hit.join() === '0', `only option index 0 matches (${hit})`); Cx.key('a'); });
}
{ // m14: quotient rule
  const g = (x) => (x - 1) / (x + 2);
  const fns = [(x) => 3 / (x + 2) ** 2, (x) => (2 * x + 1) / (x + 2) ** 2, (x) => -3 / (x + 2) ** 2, () => 1];
  const hit = matching(fns, (x) => dnum(g, x), [-1, 0.5, 3]);
  Q('m14', mk.mcq({ stem: r`When the quotient $\dfrac{x - 1}{x + 2}$ is differentiated by the quotient rule, the result is`, key: 'a', opts: [fq(3, '(x + 2)^2'), fq('2x + 1', '(x + 2)^2'), fq('-3', '(x + 2)^2'), '$1$'], sol: r`Quotient rule: $\dfrac{1\cdot(x + 2) - (x - 1)\cdot 1}{(x + 2)^2} = \dfrac{3}{(x + 2)^2}$.`, d: 2, c: 'application', t: [3], time: 75 }), (Cx) => { Cx.assert(hit.join() === '0', `only option index 0 matches (${hit})`); Cx.key('a'); });
}
{ // m15: slope of a tangent
  const p = P(1, 0, -4, 0);
  const vals = [p.deriv().eval(3).num(), 27, p.eval(3).num(), 5];
  const o = opts(vals, 23);
  Q('m15', mk.mcq({ stem: r`The slope of the tangent to the curve $y = x^3 - 4x$ at the point where $x = 3$ is`, ...o, sol: r`The slope is $\dfrac{dy}{dx} = 3x^2 - 4$, which at $x = 3$ is $27 - 4 = 23$.`, d: 2, c: 'understanding', t: [2], time: 60 }), (Cx) => { Cx.assert(p.deriv().eval(3).eq(23) && near(dnum((x) => p.num(x), 3), 23, 1e-8), 'slope 23'); Cx.which(vals, 23); Cx.sol([27, 4, 23]); });
}
{ // m16: chain rule (formative)
  const g = (x) => (5 * x - 2) ** 4;
  const fns = [(x) => 20 * (5 * x - 2) ** 3, (x) => 4 * (5 * x - 2) ** 3, (x) => 5 * (5 * x - 2) ** 4, (x) => 20 * (5 * x - 2) ** 4];
  const hit = matching(fns, (x) => dnum(g, x), [0.1, 0.7, 1.5]);
  Q('m16', mk.mcq({ stem: r`Using the chain rule, $\dfrac{d}{dx}\left[(5x - 2)^4\right]$ equals`, key: 'a', opts: [T('20(5x - 2)^3'), T('4(5x - 2)^3'), T('5(5x - 2)^4'), T('20(5x - 2)^4')], sol: r`Outer derivative $4(5x - 2)^3$, times the derivative of the inner $5x - 2$, which is $5$: $20(5x - 2)^3$.`, d: 3, c: 'application', t: [4], time: 75 }), (Cx) => { Cx.assert(hit.join() === '0', `only option index 0 matches (${hit})`); Cx.key('a'); });
}
{ // m17: average rate of change
  const f = P(1, -1, 0);
  const avg = f.eval(5).sub(f.eval(2)).div(3);
  const vals = [avg.num(), f.deriv().eval(2).num(), f.deriv().eval(5).num(), f.eval(5).sub(f.eval(2)).num()];
  const o = opts(vals, 6);
  Q('m17', mk.mcq({ stem: r`For $f(x) = x^2 - x$, the average rate of change of $f$ over the interval $[2, 5]$ is`, ...o, sol: r`$\dfrac{f(5) - f(2)}{5 - 2} = \dfrac{20 - 2}{3} = 6$.`, d: 2, c: 'understanding', t: [2], time: 60 }), (Cx) => { Cx.assert(f.eval(5).eq(20) && f.eval(2).eq(2) && avg.eq(6), 'average 6'); Cx.which(vals, 6); Cx.sol([20, 2, 3, 6]); });
}
{ // m18: log limit
  const g = (x) => Math.log(1 + 4 * x) / x;
  const vals = [4, 1, 0.25, 0];
  const o = opts(vals, 4, (v) => (v === 0.25 ? fq(1, 4) : T(String(v))));
  Q('m18', mk.mcq({ stem: r`The value of $\displaystyle\lim_{x \to 0}\dfrac{\ln(1 + 4x)}{x}$ is`, ...o, sol: r`Multiply and divide by $4$: $\dfrac{\ln(1 + 4x)}{4x} \times 4 \to 1 \times 4 = 4$.`, d: 2, c: 'understanding', t: [1], time: 60 }), (Cx) => { Cx.assert(numLim(g, 0, 4, [1e-1, 1e-2, 1e-3, 1e-4], 2e-2), 'numeric 4'); Cx.which(vals, 4); });
}
{ // m19: standard limit with a negative a
  const g = (x) => (x ** 4 - 81) / (x + 3);
  const vals = [-108, 108, -324, 324];
  const o = opts(vals, 4 * (-3) ** 3);
  Q('m19', mk.mcq({ stem: r`The value of $\displaystyle\lim_{x \to -3}\dfrac{x^4 - 81}{x + 3}$ is`, ...o, sol: r`Write $x + 3 = x - (-3)$ and $81 = (-3)^4$. The standard limit gives $4(-3)^3 = -108$.`, d: 3, c: 'application', t: [1], time: 75 }), (Cx) => { Cx.assert(numLim(g, -3, -108, [1e-1, 1e-2, 1e-3, 1e-4], 5e-3) && 4 * (-3) ** 3 === -108, 'numeric -108'); Cx.which(vals, -108); });
}
{ // m20: which limit equals 1
  const gs = [(x) => Math.sin(3 * x) / x, (x) => (1 - Math.cos(x)) / x, (x) => Math.tan(2 * x) / (2 * x), (x) => (1 - Math.cos(x)) / (x * x)];
  const Ls = [3, 0, 1, 0.5];
  const ok = gs.map((g, i) => numLim(g, 0, Ls[i], [1e-1, 1e-2, 1e-3], 5e-3));
  const hit = Ls.map((l, i) => (l === 1 ? i : -1)).filter((i) => i >= 0);
  Q('m20', mk.mcq({ stem: r`Out of the four limits below, as $x \to 0$, exactly one is equal to $1$. Which one?`, key: 'c', opts: [T(r`\dfrac{\sin 3x}{x}`), T(r`\dfrac{1 - \cos x}{x}`), T(r`\dfrac{\tan 2x}{2x}`), T(r`\dfrac{1 - \cos x}{x^2}`)], sol: r`The four limits are $3$, $0$, $1$ and $\dfrac{1}{2}$ in that order; only $\dfrac{\tan 2x}{2x}$ tends to $1$.`, d: 3, c: 'analysis', t: [1], time: 90 }), (Cx) => { Cx.assert(ok.every(Boolean) && hit.join() === '2', 'limits 3, 0, 1, 1/2; only the third is 1'); Cx.key('c'); });
}

// =============================================================== assertion-reason
Q('ar1', mk.ar({ a: r`The limit $\displaystyle\lim_{x \to 2}\dfrac{x^2 - 4}{x - 2}$ equals $4$, although the function is not defined at $x = 2$.`, r: r`A limit at a point depends only on the values of the function near the point, not on the value at the point.`, key: 'a', sol: 'The function equals x + 2 for x not equal to 2, so the values near 2 close in on 4; the value at 2 plays no part.', d: 2, c: 'understanding', t: [1] }), (Cx) => { const g = (x) => (x * x - 4) / (x - 2); Cx.assert(numLim(g, 2, 4) && Number.isNaN(g(2)), 'limit 4 and g(2) undefined'); Cx.key('a'); });
Q('ar2', mk.ar({ a: r`If $x$ is measured in degrees, then $\displaystyle\lim_{x \to 0}\dfrac{\sin x^\circ}{x} = 1$.`, r: r`The standard limit $\displaystyle\lim_{x \to 0}\dfrac{\sin x}{x} = 1$ holds only when $x$ is in radians.`, key: 'd', sol: 'With x in degrees the ratio tends to pi over 180, so A is false; R states the radian condition correctly.', d: 3, c: 'analysis', t: [1] }), (Cx) => { const g = (x) => Math.sin((x * PI) / 180) / x; Cx.assert(numLim(g, 0, PI / 180, [1e-1, 1e-2, 1e-3], 5e-3) && Math.abs(PI / 180 - 1) > 0.9, 'degree ratio tends to pi/180, not 1'); Cx.key('d'); });
Q('ar3', mk.ar({ a: r`The derivative of $x^7$ is $7x^6$.`, r: r`The derivative of any constant is $0$.`, key: 'b', sol: 'A is the power rule; R is also true but plays no part in finding the derivative of x to the seventh.', d: 2, c: 'understanding', t: [3] }), (Cx) => { Cx.assert(checkDeriv((x) => x ** 7, (x) => 7 * x ** 6, [0.5, 1.2, 2]) && checkDeriv(() => 9, () => 0, [0.5, 2]), 'both statements true'); Cx.key('b'); });
Q('ar4', mk.ar({ a: r`The derivative of $\sin x\cos x$ is $\cos 2x$.`, r: r`The derivative of a product is the product of the derivatives, so $(\sin x\cos x)' = \cos x \cdot (-\sin x)$.`, key: 'c', sol: 'A holds by the product rule: cos squared x minus sin squared x equals cos 2x. R is false: the product rule has two terms.', d: 3, c: 'analysis', t: [3] }), (Cx) => { const g = (x) => Math.sin(x) * Math.cos(x); const pts = [0.3, 1.0, 2.2]; Cx.assert(checkDeriv(g, (x) => Math.cos(2 * x), pts) && !pts.every((x) => near(dnum(g, x), -Math.sin(x) * Math.cos(x))), 'A true by numeric derivative; R false'); Cx.key('c'); });
Q('ar5', mk.ar({ a: r`For $f(x) = x + 1$ when $x < 1$ and $f(x) = 3x$ when $x \ge 1$, the limit $\displaystyle\lim_{x \to 1} f(x)$ does not exist.`, r: r`A limit at a point exists only when the left-hand and right-hand limits are equal.`, key: 'a', sol: 'The left-hand limit is 2 and the right-hand limit is 3, which are unequal, so the limit fails to exist; R is the general principle used.', d: 2, c: 'understanding', t: [1] }), (Cx) => { Cx.assert(Math.abs(sideLim((x) => x + 1, 1, -1) - 2) < 1e-4 && Math.abs(sideLim((x) => 3 * x, 1, 1) - 3) < 1e-4, 'LHL 2, RHL 3'); Cx.key('a'); });
Q('ar6', mk.ar({ a: r`The derivative of $\cos x$ is $\sin x$.`, r: r`The function $\cos x$ decreases on the interval $\left(0, \dfrac{\pi}{2}\right)$.`, key: 'd', sol: 'The derivative of cos x is minus sin x, so A is false. R is true, because cos x falls from 1 to 0 there.', d: 2, c: 'understanding', t: [3] }), (Cx) => { Cx.assert(checkDeriv(Math.cos, (x) => -Math.sin(x), [0.3, 1.0]) && !checkDeriv(Math.cos, Math.sin, [0.3, 1.0]) && Math.cos(0.2) > Math.cos(1.4), 'A false, R true'); Cx.key('d'); });

// =============================================================== true-false
{
  const g = (x) => (x ** 6 - 64) / (x - 2);
  Q('tf1', mk.tf({ stem: r`True or false: $\displaystyle\lim_{x \to 2}\dfrac{x^6 - 64}{x - 2} = 192$.`, key: 't', sol: r`Standard limit: $6 \times 2^5 = 192$.`, d: 2, c: 'application', t: [1], time: 60 }), (Cx) => { Cx.assert(numLim(g, 2, 192, [1e-1, 1e-2, 1e-3, 1e-4], 5e-3) && 6 * 2 ** 5 === 192, '192'); Cx.key('t'); });
}
{
  const g = (x) => 1 / Math.cos(x);
  Q('tf2', mk.tf({ stem: r`True or false: $\dfrac{d}{dx}(\sec x) = \sec x \tan x$.`, key: 't', sol: r`Write $\sec x = (\cos x)^{-1}$ and use the quotient rule: $\dfrac{\sin x}{\cos^2 x} = \sec x\tan x$.`, d: 2, c: 'recall', t: [3], time: 45 }), (Cx) => { Cx.assert(checkDeriv(g, (x) => g(x) * Math.tan(x), [0.3, 0.9, 1.3]), 'sec derivative'); Cx.key('t'); });
}
{
  const g = (x) => Math.sin(2 * x) / x;
  Q('tf3', mk.tf({ stem: r`True or false: $\displaystyle\lim_{x \to 0}\dfrac{\sin 2x}{x} = 1$.`, key: 'f', sol: r`$\dfrac{\sin 2x}{x} = 2 \cdot \dfrac{\sin 2x}{2x} \to 2 \times 1 = 2$, not $1$.`, d: 2, c: 'understanding', t: [1], time: 45 }), (Cx) => { Cx.assert(numLim(g, 0, 2) && !numLim(g, 0, 1), 'limit is 2'); Cx.key('f'); });
}
{
  const g = (x) => (x * x - 4) / (x - 2);
  Q('tf4', mk.tf({ stem: r`True or false: if $\displaystyle\lim_{x \to a} f(x)$ exists, then $f(a)$ must be defined.`, key: 'f', sol: r`Counter-example: $\dfrac{x^2 - 4}{x - 2}$ has limit $4$ at $x = 2$, but is not defined at $2$.`, d: 2, c: 'understanding', t: [1], time: 45 }), (Cx) => { Cx.assert(numLim(g, 2, 4) && Number.isNaN(g(2)), 'limit 4 but undefined at 2'); Cx.key('f'); });
}
{
  const u = (x) => (x * x + 2) / x;
  Q('tf5', mk.tf({ stem: r`True or false: by the quotient rule, $\dfrac{d}{dx}\left(\dfrac{x^2 + 2}{x}\right) = 2x$.`, key: 'f', sol: r`The quotient rule gives $\dfrac{2x \cdot x - (x^2 + 2)\cdot 1}{x^2} = \dfrac{x^2 - 2}{x^2} = 1 - \dfrac{2}{x^2}$, not $2x$.`, d: 3, c: 'understanding', t: [3], time: 60 }), (Cx) => { const pts = [1, 2, 3.5]; Cx.assert(checkDeriv(u, (x) => 1 - 2 / (x * x), pts) && !pts.every((x) => near(dnum(u, x), 2 * x)), 'true derivative is 1 - 2/x^2'); Cx.key('f'); });
}
{
  const g = (x) => Math.abs(x) / x;
  Q('tf6', mk.tf({ stem: r`True or false: $\displaystyle\lim_{x \to 0}\dfrac{|x|}{x}$ does not exist.`, key: 't', sol: r`For $x < 0$ the ratio is $-1$ and for $x > 0$ it is $1$, so the one-sided limits differ.`, d: 3, c: 'understanding', t: [1], time: 60 }), (Cx) => { Cx.assert(sideLim(g, 0, -1) === -1 && sideLim(g, 0, 1) === 1, 'LHL -1, RHL 1'); Cx.key('t'); });
}

// =============================================================== fill in the blank
{
  const N = P(1, -7, 10), D = P(1, -5), L = limRat(N, D, 5);
  Q('fb1', mk.fill({ stem: r`$\displaystyle\lim_{x \to 5}\dfrac{x^2 - 7x + 10}{x - 5} = $ ___.`, acc: [['3']], sol: r`Factorise $x^2 - 7x + 10 = (x - 2)(x - 5)$ and cancel: $x - 2 \to 5 - 2 = 3$.`, d: 2, c: 'application', t: [1], time: 60 }), (Cx) => { Cx.assert(L.value.eq(3) && approachExact(N, D, 5, F(3)) && N.eq(P(1, -2).mul(P(1, -5))), 'limit 3'); Cx.blank(3); });
}
{
  const p = P(1, 0, -3, 0, 7);
  Q('fb2', mk.fill({ stem: r`If $f(x) = x^4 - 3x^2 + 7$, then $f'(1) = $ ___.`, acc: [['-2']], sol: r`$f'(x) = 4x^3 - 6x$, so $f'(1) = 4 - 6 = -2$.`, d: 2, c: 'understanding', t: [3], time: 45 }), (Cx) => { Cx.assert(p.deriv().eval(1).eq(-2) && p.deriv().eq(P(4, 0, -6, 0)) && near(dnum((x) => p.num(x), 1), -2, 1e-8), 'f\'(1) = -2'); Cx.blank(-2); });
}
{
  const g = (x) => Math.sin(3 * x) / Math.sin(5 * x);
  Q('fb3', mk.fill({ stem: r`$\displaystyle\lim_{x \to 0}\dfrac{\sin 3x}{\sin 5x} = $ ___ (give the fraction).`, acc: [['3/5']], sol: r`Divide top and bottom by $x$: $\dfrac{3 \cdot \frac{\sin 3x}{3x}}{5 \cdot \frac{\sin 5x}{5x}} \to \dfrac{3}{5}$, that is 3/5.`, d: 2, c: 'application', t: [1], time: 60 }), (Cx) => { Cx.assert(numLim(g, 0, 0.6), 'numeric 3/5'); Cx.blank(0.6); });
}
{
  const g = (x) => (1 - Math.cos(2 * x)) / (3 * x * x);
  Q('fb4', mk.fill({ stem: r`$\displaystyle\lim_{x \to 0}\dfrac{1 - \cos 2x}{3x^2} = $ ___ (give the fraction).`, acc: [['2/3']], sol: r`$1 - \cos 2x = 2\sin^2 x$, so the limit is $\dfrac{2}{3} \times \left(\dfrac{\sin x}{x}\right)^2 \to \dfrac{2}{3}$, that is 2/3.`, d: 3, c: 'application', t: [1], time: 75 }), (Cx) => { Cx.assert(numLim(g, 0, 2 / 3, [1e-1, 1e-2, 1e-3], 5e-3), 'numeric 2/3'); Cx.blank(2 / 3); });
}
{
  const p = P(2, 0, -5, 0);
  Q('fb5', mk.fill({ stem: r`The slope of the curve $y = 2x^3 - 5x$ at the point where $x = -1$ is ___.`, acc: [['1']], sol: r`$\dfrac{dy}{dx} = 6x^2 - 5$, so at $x = -1$ the slope is $6 - 5 = 1$.`, d: 2, c: 'understanding', t: [2], time: 45 }), (Cx) => { Cx.assert(p.deriv().eval(-1).eq(1) && near(dnum((x) => p.num(x), -1), 1, 1e-8), 'slope 1'); Cx.blank(1); });
}
{
  const g = (x) => (Math.exp(6 * x) - 1) / (3 * x);
  Q('fb6', mk.fill({ stem: r`$\displaystyle\lim_{x \to 0}\dfrac{e^{6x} - 1}{3x} = $ ___.`, acc: [['2']], sol: r`$\dfrac{e^{6x} - 1}{6x} \times \dfrac{6}{3} \to 1 \times 2 = 2$.`, d: 2, c: 'understanding', t: [1], time: 60 }), (Cx) => { Cx.assert(numLim(g, 0, 2, [1e-1, 1e-2, 1e-3, 1e-4], 2e-2), 'numeric 2'); Cx.blank(2); });
}

// =============================================================== numerical
{
  const N = P(1, 0, 0, -8), D = P(1, 0, -4), L = limRat(N, D, 2);
  Q('n1', mk.num({ stem: r`Find $\displaystyle\lim_{x \to 2}\dfrac{x^3 - 8}{x^2 - 4}$.`, value: 3, sol: r`Cancel $(x - 2)$: $\dfrac{x^2 + 2x + 4}{x + 2}$, which at $x = 2$ is $\dfrac{12}{4} = 3$.`, scheme: [['Factorise and cancel, then substitute: 12/4 = 3', 1]], d: 3, c: 'application', t: [1], time: 90 }), (Cx) => { Cx.assert(L.value.eq(3) && approachExact(N, D, 2, F(3)) && N.eq(P(1, -2).mul(P(1, 2, 4))), 'exact 3'); Cx.val(3); });
}
{
  const hits = []; for (let a = 1; a <= 40; a++) if (5 * a ** 4 === 80) hits.push(a);
  Q('n2', mk.num({ stem: r`For a positive number $a$, $\displaystyle\lim_{x \to a}\dfrac{x^5 - a^5}{x - a} = 80$. Find $a$.`, value: 2, sol: r`The limit is $5a^4 = 80$, so $a^4 = 16$ and $a = 2$.`, scheme: [['5a^4 = 80, a^4 = 16, so a = 2', 1]], d: 3, c: 'analysis', t: [1], time: 90 }), (Cx) => { Cx.assert(hits.join() === '2', 'a = 2 is the only positive integer; a^4 = 16 forces a = 2'); Cx.val(2); });
}
{
  const g = (x) => (Math.sin(6 * x) - Math.sin(2 * x)) / x;
  Q('n3', mk.num({ stem: r`Find $\displaystyle\lim_{x \to 0}\dfrac{\sin 6x - \sin 2x}{x}$.`, value: 4, sol: r`Split: $\dfrac{\sin 6x}{x} - \dfrac{\sin 2x}{x} \to 6 - 2 = 4$.`, scheme: [['6 - 2 = 4', 1]], d: 3, c: 'application', t: [1], time: 75 }), (Cx) => { Cx.assert(numLim(g, 0, 4), 'numeric 4'); Cx.val(4); });
}
{
  const f = P(1, 0, 1).mul(P(1, -4));
  Q('n4', mk.num({ stem: r`If $f(x) = (x^2 + 1)(x - 4)$, find $f'(3)$.`, value: 4, sol: r`Product rule: $f'(x) = 2x(x - 4) + (x^2 + 1)$, so $f'(3) = 2(3)(-1) + 10 = -6 + 10 = 4$.`, scheme: [['f\'(x) = 2x(x - 4) + (x^2 + 1) and f\'(3) = -6 + 10 = 4', 1]], d: 3, c: 'understanding', t: [3], time: 90 }), (Cx) => { Cx.assert(f.deriv().eval(3).eq(4) && near(dnum((x) => f.num(x), 3), 4, 1e-8), 'f\'(3) = 4'); Cx.val(4); });
}
{
  const g = (x) => (x + 5) / (x - 1);
  Q('n5', mk.num({ stem: r`Find the value of $\dfrac{d}{dx}\left(\dfrac{x + 5}{x - 1}\right)$ at $x = 3$.`, value: -1.5, sol: r`Quotient rule: $\dfrac{(x - 1) - (x + 5)}{(x - 1)^2} = \dfrac{-6}{(x - 1)^2}$, which at $x = 3$ is $\dfrac{-6}{4} = -1.5$.`, scheme: [['-6/(x - 1)^2 and at x = 3 the value -6/4 = -1.5', 1]], d: 3, c: 'application', t: [3], time: 90 }), (Cx) => { Cx.assert(near(dnum(g, 3), -1.5, 1e-8) && -6 / 4 === -1.5, '-1.5'); Cx.val(-1.5); });
}
{
  const s = P(3, -2, 5, 0);
  const v2 = s.deriv().eval(2);
  Q('n6', mk.num({ stem: r`A toy train on a straight track covers $s = 3t^3 - 2t^2 + 5t$ metres in $t$ seconds (an imagined model). Find its speed in m/s at $t = 2$.`, value: 33, unit: 'm/s', sol: r`The speed is $\dfrac{ds}{dt} = 9t^2 - 4t + 5$, which at $t = 2$ is $36 - 8 + 5 = 33$.`, scheme: [['ds/dt = 9t^2 - 4t + 5 = 36 - 8 + 5 = 33', 1]], d: 3, c: 'application', t: [2], time: 90 }), (Cx) => { Cx.assert(v2.eq(33) && s.deriv().eq(P(9, -4, 5)) && near(dnum((t) => s.num(t), 2), 33, 1e-8), 'speed 33'); Cx.val(33); });
}
{
  const g = (x) => x * x * Math.cos(x);
  const dg = (x) => 2 * x * Math.cos(x) - x * x * Math.sin(x);
  Q('n7', mk.num({ stem: r`Find the derivative of $x^2\cos x$ at $x = \pi$, correct to two decimal places.`, value: -6.28, tol: 0.005, sol: r`$\dfrac{d}{dx}(x^2\cos x) = 2x\cos x - x^2\sin x$, so at $x = \pi$ it is $2\pi(-1) - 0 = -2\pi = -6.28$.`, scheme: [['2x cos x - x^2 sin x at pi gives -2 pi = -6.28', 1]], d: 3, c: 'application', t: [3], time: 90 }), (Cx) => { Cx.assert(checkDeriv(g, dg, [0.5, 1.7, PI]) && near(dg(PI), -2 * PI, 1e-9), 'derivative -2 pi'); Cx.val(-2 * PI); });
}
