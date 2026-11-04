// CBSE 11 Mathematics ch03 Trigonometric Functions — objective items (mcq, assertion-reason, true-false, fill-blank, numerical)
// with independent re-solve checks: exact surd arithmetic at multiples of 15 degrees (trig.mjs), floating-point identity tests
// on 1,441 angles in all four quadrants, numeric root finding for equations, and exact fractions for given-ratio problems.
import { Q, mk } from './lib.mjs';
import * as T from './trig.mjs';
const { Fr, fr, near, piT, tx, val, eq, add, sub, mul, sinD, cosD, tanD, rad, deg, gridRad } = T;

/** String.raw, except that a backslash-n not followed by a lower-case letter (so not ne, neq, notin) becomes a newline. */
export const r = (s, ...v) => String.raw(s, ...v).replace(/\\n(?![a-z])/g, '\n');
export const $ = (s) => `$${s}$`;
const pio = (L) => L.map(([p, q]) => `$${piT(p, q)}$`);
const frac = (n, d) => fr(n, d);
const ex = (els) => els.map((e) => $(tx(e)));
/** Real roots of f on [a, b] (sign changes with |f| tiny after bisection; poles rejected). */
export function rootsOf(f, a, b, step = 1e-3) {
  const out = [];
  let x0 = a, y0 = f(a);
  for (let x = a + step; x <= b + 1e-12; x += step) {
    const y = f(x);
    if (Number.isFinite(y0) && Number.isFinite(y) && (y0 === 0 || y0 * y < 0)) {
      let lo = x0, hi = x;
      for (let i = 0; i < 80; i++) { const m = (lo + hi) / 2; if (f(lo) * f(m) <= 0) hi = m; else lo = m; }
      const z = (lo + hi) / 2;
      if (Math.abs(f(z)) < 1e-6 && !out.some((q) => Math.abs(q - z) < 1e-6)) out.push(z);
    }
    x0 = x; y0 = y;
  }
  return out;
}
const sameList = (A, B) => A.length === B.length && A.every((v, i) => near(v, B[i], 1e-6));
const PI = Math.PI;

// =============================================================== MCQ
Q('m01', mk.mcq({ stem: r`One radian is the angle subtended at the centre of a circle by`, opts: ['an arc whose length equals the radius', 'an arc whose length equals the diameter', 'a chord whose length equals the radius', 'an arc equal to one-third of the circumference'], key: 'a', sol: r`The definition of a radian uses an **arc** equal in length to the radius. A chord equal to the radius (option (c)) gives a central angle of $60^\circ$ instead, and a third of the circumference gives $\dfrac{2\pi}{3}$ radians.`, d: 1, c: 'recall', t: [1], time: 30 }), (C) => { C.key('a'); C.assert(near(T.deg(1), 57.29577951308232) && near(2 * Math.asin(0.5), PI / 3), '1 radian is 57.3 degrees; a chord equal to the radius subtends 60 degrees'); });
Q('m02', mk.mcq({ stem: r`In radian measure, the angle $135^\circ$ is`, opts: pio([[3, 4], [3, 8], [4, 3], [3, 2]]), key: 'a', sol: r`Multiply by $\dfrac{\pi}{180}$: $135 \times \dfrac{\pi}{180} = \dfrac{3\pi}{4}$. Dividing by $360$ instead of $180$ gives $\dfrac{3\pi}{8}$, and inverting the ratio gives $\dfrac{4\pi}{3}$.`, d: 1, c: 'understanding', t: [1], time: 40 }), (C) => C.which([[3, 4], [3, 8], [4, 3], [3, 2]].map(([p, q]) => p / q), rad(135) / PI));
Q('m03', mk.mcq({ stem: r`The angle $\dfrac{7\pi}{12}$ radians is equal to`, opts: ['$105^\\circ$', '$210^\\circ$', '$84^\\circ$', '$1.83^\\circ$'], key: 'a', sol: r`Multiply by $\dfrac{180}{\pi}$: $\dfrac{7\pi}{12} \times \dfrac{180}{\pi} = 105^\circ$. Using $360$ gives $210^\circ$; multiplying the $7$ and the $12$ gives $84^\circ$; and the decimal $1.83^\circ$ forgets the conversion altogether ($\dfrac{7\pi}{12} \approx 1.83$ is the radian value).`, d: 2, c: 'understanding', t: [1], time: 45 }), (C) => C.which([105, 210, 84, (7 * PI) / 12], deg((7 * PI) / 12)));
{
  const l = 45 * rad(20);
  Q('m04', mk.mcq({ stem: r`A pendulum $45$ cm long swings through an angle of $20^\circ$. The length of the arc traced by the bob is`, opts: [r`$5\pi$ cm`, r`$900$ cm`, r`$\dfrac{9\pi}{4}$ cm`, r`$10\pi$ cm`], key: 'a', sol: r`Convert first: $20^\circ = \dfrac{\pi}{9}$ radian, so $l = r\theta = 45 \times \dfrac{\pi}{9} = 5\pi$ cm. Using $\theta = 20$ directly gives $900$; dividing $45$ by $20$ gives $\dfrac{9\pi}{4}$ after the conversion; and doubling the angle gives $10\pi$.`, d: 2, c: 'application', t: [1], time: 75 }), (C) => { C.assert(near(l, 5 * PI), 'l = 5 pi'); C.which([5 * PI, 45 * 20, (9 * PI) / 4, 10 * PI], l); });
}
Q('m05', mk.mcq({ stem: r`In a circle of radius $6$ cm, an arc of length $9$ cm subtends at the centre an angle of`, opts: [r`$\dfrac{3}{2}$ radians`, r`$54$ radians`, r`$\dfrac{2}{3}$ radian`, r`$\dfrac{3\pi}{2}$ radians`], key: 'a', sol: r`$\theta = \dfrac{l}{r} = \dfrac{9}{6} = \dfrac{3}{2}$ radians. Multiplying ($9 \times 6 = 54$) or inverting the ratio ($\dfrac{2}{3}$) are the common slips; no $\pi$ appears because the answer is already in radians.`, d: 1, c: 'application', t: [1], time: 45 }), (C) => C.which([1.5, 54, 2 / 3, (3 * PI) / 2], 9 / 6));
{
  const quad = (t) => { const s = Math.sin(t), c = Math.cos(t); return s > 0 && c > 0 ? 1 : s > 0 && c < 0 ? 2 : s < 0 && c < 0 ? 3 : s < 0 && c > 0 ? 4 : 0; };
  const hits = new Set(gridRad.filter((t) => Math.sin(t) > 1e-9 && Math.tan(t) < -1e-9 && Number.isFinite(Math.tan(t)) && Math.abs(Math.cos(t)) > 1e-9).map(quad));
  Q('m06', mk.mcq({ stem: r`An angle $\theta$ has $\sin\theta > 0$ and $\tan\theta < 0$. Its terminal side lies in`, opts: ['the first quadrant', 'the second quadrant', 'the third quadrant', 'the fourth quadrant'], key: 'b', sol: r`$\sin\theta > 0$ allows quadrants I and II. Since $\tan\theta = \dfrac{\sin\theta}{\cos\theta}$ is negative while $\sin\theta$ is positive, $\cos\theta < 0$, which is quadrant II.`, d: 2, c: 'understanding', t: [2], time: 45 }), (C) => { C.assert(hits.size === 1 && hits.has(2), 'only quadrant II has sin > 0 and tan < 0'); C.key('b'); });
}
{
  const t = sinD(210), els = [t, sinD(30), cosD(210), tanD(210)];
  Q('m07', mk.mcq({ stem: r`The exact value of $\sin 210^\circ$ is`, opts: ex(els), key: 'a', sol: r`$210^\circ = 180^\circ + 30^\circ$ lies in quadrant III, where sine is negative, and the reference angle is $30^\circ$: $\sin 210^\circ = -\sin 30^\circ = ${tx(t)}$. Forgetting the sign gives $\dfrac{1}{2}$; the other options are $\cos 210^\circ$ and $\tan 210^\circ$.`, d: 2, c: 'understanding', t: [2], time: 50 }), (C) => { C.assert(eq(t, frac(-1, 2)) && near(val(t), Math.sin(rad(210))), 'sin 210 = -1/2'); C.which(els.map(val), val(t)); });
}
{
  const t = cosD(300), els = [t, cosD(240), sinD(300), sinD(60)];
  Q('m08', mk.mcq({ stem: r`The value of $\cos\dfrac{5\pi}{3}$ is`, opts: ex(els), key: 'a', sol: r`$\dfrac{5\pi}{3} = 300^\circ$, in quadrant IV where cosine is positive, with reference angle $60^\circ$. So $\cos\dfrac{5\pi}{3} = \cos 60^\circ = \dfrac{1}{2}$. Option (b) is $\cos 240^\circ$ (quadrant III) and option (c) is $\sin 300^\circ$.`, d: 2, c: 'understanding', t: [2], time: 50 }), (C) => { C.assert(near(PI * 5 / 3, rad(300)) && eq(t, frac(1, 2)), '5pi/3 = 300 degrees, cos = 1/2'); C.which(els.map(val), Math.cos((5 * PI) / 3)); });
}
{
  const t = tanD(210), els = [t, neg(t), tanD(60), el1()];
  function neg(x) { return T.neg(x); }
  function el1() { return T.el(1); }
  Q('m09', mk.mcq({ stem: r`The value of $\tan\dfrac{7\pi}{6}$ is`, opts: ex(els), key: 'a', sol: r`$\dfrac{7\pi}{6} = 210^\circ$, in quadrant III where tangent is positive, with reference angle $30^\circ$: $\tan 210^\circ = \tan 30^\circ = \dfrac{1}{\sqrt{3}} = \dfrac{\sqrt{3}}{3}$. The negative sign belongs to quadrants II and IV.`, d: 2, c: 'understanding', t: [2], time: 50 }), (C) => { C.assert(near(PI * 7 / 6, rad(210)), '7pi/6 = 210 degrees'); C.which(els.map(val), Math.tan((7 * PI) / 6)); });
}
{
  const g = (x) => 3 - 2 * Math.cos(x);
  const vals = gridRad.map(g);
  const lo = Math.min(...vals), hi = Math.max(...vals);
  Q('m10', mk.mcq({ stem: r`As $x$ takes all real values, the function $f(x) = 3 - 2\cos x$ takes exactly the values in`, opts: ['$[1, 5]$', '$[-1, 5]$', '$[-2, 2]$', '$[1, 3]$'], key: 'a', sol: r`Since $-1 \le \cos x \le 1$, we get $-2 \le -2\cos x \le 2$ and so $1 \le 3 - 2\cos x \le 5$, and both end values occur (at $x = 0$ and $x = \pi$). Interval $[-2, 2]$ forgets the shift by $3$.`, d: 2, c: 'application', t: [2], time: 60 }), (C) => { C.assert(near(lo, 1) && near(hi, 5) && near(g(0), 1) && near(g(PI), 5), 'range [1, 5]'); C.which([[1, 5], [-1, 5], [-2, 2], [1, 3]].map(([a, b]) => near(lo, a) && near(hi, b)), true); });
}
{
  const cosZero = [-3, -2, -1, 0, 1, 2, 3].map((n) => ((2 * n + 1) * PI) / 2);
  const tanZero = [-3, -2, -1, 0, 1, 2, 3].map((n) => n * PI);
  Q('m11', mk.mcq({ stem: r`The domain of the function $y = \tan x$ is`, opts: [r`$\mathbb{R} - \left\{(2n + 1)\dfrac{\pi}{2} : n \in \mathbb{Z}\right\}$`, r`$\mathbb{R} - \{n\pi : n \in \mathbb{Z}\}$`, r`$\mathbb{R} - \{2n\pi : n \in \mathbb{Z}\}$`, r`$\mathbb{R}$`], key: 'a', sol: r`$\tan x = \dfrac{\sin x}{\cos x}$ fails where $\cos x = 0$, that is at odd multiples of $\dfrac{\pi}{2}$. At $x = n\pi$ the tangent is $0$ and perfectly defined, so (b) removes the wrong points.`, d: 2, c: 'understanding', t: [2], time: 50 }), (C) => { C.assert(cosZero.every((x) => Math.abs(Math.cos(x)) < 1e-9 && Math.abs(Math.tan(x)) > 1e8), 'cos = 0 and tan blows up at odd multiples of pi/2'); C.assert(tanZero.every((x) => Math.abs(Math.tan(x)) < 1e-9), 'tan is defined and zero at n pi'); C.key('a'); });
}
{
  const f = (x) => Math.abs(Math.sin(x));
  const p = T.period(f);
  Q('m12', mk.mcq({ stem: r`The smallest positive period of the function $f(x) = |\sin x|$ is`, opts: [r`$\pi$`, r`$2\pi$`, r`$\dfrac{\pi}{2}$`, r`$4\pi$`], key: 'a', sol: r`The graph of $\sin x$ below the axis is reflected above it, so the pattern of one hump repeats every $\pi$: $|\sin(x + \pi)| = |-\sin x| = |\sin x|$. The period $2\pi$ of $\sin x$ itself is a period here too, but not the smallest.`, d: 3, c: 'analysis', t: [2], time: 75 }), (C) => { C.assert(near(p, PI, 1e-9), 'smallest period is pi'); C.which([PI, 2 * PI, PI / 2, 4 * PI], p); });
}
{
  const preds = [(x) => Math.sin(x), (x) => -Math.sin(x), (x) => Math.cos(x), (x) => -Math.cos(x)];
  Q('m13', mk.mcq({ stem: r`For every real $x$, the expression $\cos\left(\dfrac{3\pi}{2} - x\right)$ equals`, opts: [r`$\sin x$`, r`$-\sin x$`, r`$\cos x$`, r`$-\cos x$`], key: 'b', sol: r`Expand: $\cos\dfrac{3\pi}{2}\cos x + \sin\dfrac{3\pi}{2}\sin x = 0 \cdot \cos x + (-1)\sin x = -\sin x$. On the unit circle the angle $\dfrac{3\pi}{2} - x$ lies in quadrant III for small positive $x$, where cosine is negative, matching $-\sin x$.`, d: 3, c: 'application', t: [2], time: 75 }), (C) => C.which(preds.map((p) => T.holds1((x) => Math.cos((3 * PI) / 2 - x), p)), true));
}
{
  const xs = rootsOf(Math.cos, 0, 4 * PI);
  Q('m14', mk.mcq({ stem: r`The graph of $y = \cos x$ meets the $x$-axis how many times for $0 \le x \le 4\pi$?`, opts: ['$2$', '$3$', '$4$', '$5$'], key: 'c', sol: r`Cosine is $0$ at odd multiples of $\dfrac{\pi}{2}$: $\dfrac{\pi}{2}, \dfrac{3\pi}{2}, \dfrac{5\pi}{2}, \dfrac{7\pi}{2}$ all lie in $[0, 4\pi]$, and the next one, $\dfrac{9\pi}{2}$, does not. So there are $4$ crossings; counting the zeros of $\sin x$ instead would give $5$.`, d: 2, c: 'application', t: [2], time: 60 }), (C) => { C.assert(xs.length === 4 && xs.every((z, i) => near(z, ((2 * i + 1) * PI) / 2, 1e-6)), 'four zeros of cos x in [0, 4 pi]'); C.which([2, 3, 4, 5], xs.length); });
}
{
  const cs = frac(-5, 13), ss = fr(12, 13); // sec x = -13/5, x in quadrant II
  Q('m15', mk.mcq({ stem: r`If $\sec x = -\dfrac{13}{5}$ and $x$ lies in the second quadrant, then $\tan x$ equals`, opts: [r`$-\dfrac{12}{5}$`, r`$\dfrac{12}{5}$`, r`$-\dfrac{5}{12}$`, r`$\dfrac{5}{12}$`], key: 'a', sol: r`$\cos x = -\dfrac{5}{13}$, so $\sin^2 x = 1 - \dfrac{25}{169} = \dfrac{144}{169}$. In quadrant II sine is positive: $\sin x = \dfrac{12}{13}$. Then $\tan x = \dfrac{\sin x}{\cos x} = \dfrac{12/13}{-5/13} = -\dfrac{12}{5}$.`, d: 3, c: 'application', t: [2], time: 80 }), (C) => { const c = -5 / 13, s = Math.sqrt(1 - c * c); C.assert(near(s, 12 / 13) && ss.eq(fr(12, 13)) && cs.eq(frac(-5, 13)), 'sin = 12/13'); C.which([-12 / 5, 12 / 5, -5 / 12, 5 / 12], s / c); });
}
{
  const f1 = (x, y) => Math.cos(x + y);
  const opts = [
    [r`$\cos x \cos y - \sin x \sin y$`, (x, y) => Math.cos(x) * Math.cos(y) - Math.sin(x) * Math.sin(y)],
    [r`$\cos x \cos y + \sin x \sin y$`, (x, y) => Math.cos(x) * Math.cos(y) + Math.sin(x) * Math.sin(y)],
    [r`$\sin x \cos y + \cos x \sin y$`, (x, y) => Math.sin(x) * Math.cos(y) + Math.cos(x) * Math.sin(y)],
    [r`$\cos x + \cos y$`, (x, y) => Math.cos(x) + Math.cos(y)],
  ];
  Q('m16', mk.mcq({ stem: r`Which expression equals $\cos(x + y)$ for all real $x$ and $y$?`, opts: opts.map((o) => o[0]), key: 'a', sol: r`The cosine of a sum has a **minus** between the products of like functions: $\cos(x + y) = \cos x \cos y - \sin x \sin y$. Option (b) is $\cos(x - y)$, option (c) is $\sin(x + y)$, and cosine is never additive.`, d: 1, c: 'recall', t: [3], time: 30 }), (C) => C.which(opts.map((o) => T.holds2(f1, o[1])), true));
}
{
  const t = sinD(75), els = [t, sinD(15), add(sinD(45), sinD(30)), mul(sinD(45), sinD(30))];
  Q('m17', mk.mcq({ stem: r`The exact value of $\sin 75^\circ$ is`, opts: ex(els), key: 'a', sol: r`Write $75^\circ = 45^\circ + 30^\circ$: $\sin 75^\circ = \sin 45^\circ\cos 30^\circ + \cos 45^\circ\sin 30^\circ = \dfrac{\sqrt{2}}{2}\cdot\dfrac{\sqrt{3}}{2} + \dfrac{\sqrt{2}}{2}\cdot\dfrac{1}{2} = ${tx(t)}$. Option (b) is $\sin 15^\circ$ (a minus sign slipped in) and the sum $\sin 45^\circ + \sin 30^\circ$ in (c) is not $\sin 75^\circ$.`, d: 3, c: 'application', t: [3], time: 80 }), (C) => { C.assert(eq(t, add(mul(sinD(45), cosD(30)), mul(cosD(45), sinD(30)))), 'sin 75 = sin45 cos30 + cos45 sin30 exactly'); C.assert(near(val(t), Math.sin(rad(75))), 'sin 75 numeric'); C.which(els.map(val), val(t)); });
}
{
  const a = frac(2, 5), b = frac(3, 4);
  const one = fr(1);
  const good = a.add(b).div(one.sub(a.mul(b))), w1 = a.add(b).div(one.add(a.mul(b))), w2 = a.add(b), w3 = one.sub(a.mul(b)).div(a.add(b));
  const L = [good, w1, w2, w3];
  Q('m18', mk.mcq({ stem: r`If $\tan x = \dfrac{2}{5}$ and $\tan y = \dfrac{3}{4}$, then $\tan(x + y)$ is`, opts: L.map((f) => $(f.tex())), key: 'a', sol: r`$\tan(x + y) = \dfrac{\tan x + \tan y}{1 - \tan x\tan y} = \dfrac{\dfrac{2}{5} + \dfrac{3}{4}}{1 - \dfrac{2}{5}\cdot\dfrac{3}{4}} = \dfrac{23/20}{14/20} = ${good.tex()}$. Using $1 + \tan x\tan y$ in the denominator gives $${w1.tex()}$, and adding the tangents without dividing gives $${w2.tex()}$.`, d: 3, c: 'application', t: [3], time: 80 }), (C) => { C.assert(good.eq(fr(23, 14)), '23/14'); C.assert(near(Math.tan(Math.atan(0.4) + Math.atan(0.75)), 23 / 14), 'numeric tan(x+y)'); C.which(L.map((f) => f.v), 23 / 14); });
}
{
  // cos x = 12/13, x in quadrant IV so sin x = -5/13
  const s = frac(-5, 13), c = fr(12, 13);
  const good = fr(2).mul(s).mul(c), w1 = good.neg(), w2 = fr(2).mul(s), w3 = c.mul(c).sub(s.mul(s));
  const L = [good, w1, w2, w3];
  Q('m19', mk.mcq({ stem: r`Given $\cos x = \dfrac{12}{13}$ with $x$ in the fourth quadrant, the value of $\sin 2x$ is`, opts: L.map((f) => $(f.tex())), key: 'a', sol: r`In quadrant IV sine is negative: $\sin x = -\dfrac{5}{13}$. Then $\sin 2x = 2\sin x\cos x = 2\left(-\dfrac{5}{13}\right)\left(\dfrac{12}{13}\right) = ${good.tex()}$. A sign error gives (b), writing $2\sin x$ gives (c), and (d) is $\cos 2x$.`, d: 3, c: 'application', t: [3], time: 80 }), (C) => { const x = -Math.acos(12 / 13); C.assert(near(Math.sin(x), -5 / 13) && near(Math.sin(2 * x), good.v) && near(Math.cos(2 * x), w3.v), 'numeric sin 2x and cos 2x'); C.which(L.map((f) => f.v), Math.sin(2 * x)); });
}
{
  const t = fr(3), one = fr(1);
  const good = one.sub(t.mul(t)).div(one.add(t.mul(t))), w1 = fr(2).mul(t).div(one.add(t.mul(t))), w2 = good.neg(), w3 = fr(2).mul(t).div(one.sub(t.mul(t)));
  const L = [good, w1, w2, w3];
  Q('m20', mk.mcq({ stem: r`If $\tan x = 3$, then $\cos 2x$ equals`, opts: L.map((f) => $(f.tex())), key: 'a', sol: r`Use $\cos 2x = \dfrac{1 - \tan^2 x}{1 + \tan^2 x} = \dfrac{1 - 9}{1 + 9} = ${good.tex()}$. Option (b) is $\sin 2x = \dfrac{2\tan x}{1 + \tan^2 x}$, option (c) has the wrong sign, and option (d) is $\tan 2x$.`, d: 3, c: 'application', t: [3], time: 70 }), (C) => { const x = Math.atan(3); C.assert(near(Math.cos(2 * x), -0.8) && near(Math.sin(2 * x), 0.6) && near(Math.tan(2 * x), -0.75), 'numeric'); C.which(L.map((f) => f.v), Math.cos(2 * x)); });
}
{
  const s = fr(1, 3);
  const good = fr(3).mul(s).sub(fr(4).mul(s).mul(s).mul(s)), w1 = fr(3).mul(s).sub(s.mul(s).mul(s)), w2 = fr(1), w3 = good.neg();
  const L = [good, w1, w2, w3];
  Q('m21', mk.mcq({ stem: r`If $\sin x = \dfrac{1}{3}$, then $\sin 3x$ is`, opts: L.map((f) => $(f.tex())), key: 'a', sol: r`Use $\sin 3x = 3\sin x - 4\sin^3 x = 3\cdot\dfrac{1}{3} - 4\cdot\dfrac{1}{27} = 1 - \dfrac{4}{27} = ${good.tex()}$. Dropping the $4$ gives (b); the expression $4\sin^3 x - 3\sin x$ in (d) belongs to $\cos 3x$ with $\cos x$ in place of $\sin x$ and has the opposite sign.`, d: 3, c: 'application', t: [3], time: 70 }), (C) => { const x = Math.asin(1 / 3); C.assert(near(Math.sin(3 * x), 23 / 27), 'numeric'); C.which(L.map((f) => f.v), Math.sin(3 * x)); });
}
{
  const truth = rootsOf((x) => Math.tan(x) - Math.sqrt(3), -12, 12);
  const gen = (f) => { const out = []; for (let n = -10; n <= 10; n++) for (const v of f(n)) if (v >= -12 && v <= 12) out.push(v); return out.sort((a, b) => a - b); };
  const forms = [
    (n) => [n * PI + PI / 3],
    (n) => [2 * n * PI + PI / 3],
    (n) => [n * PI + PI / 3, n * PI - PI / 3],
    (n) => [2 * n * PI + PI / 3, 2 * n * PI - PI / 3],
  ];
  Q('m22', mk.mcq({ stem: r`The general solution of the equation $\tan x = \sqrt{3}$ is, for integer $n$,`, opts: [r`$x = n\pi + \dfrac{\pi}{3}$`, r`$x = 2n\pi + \dfrac{\pi}{3}$`, r`$x = n\pi \pm \dfrac{\pi}{3}$`, r`$x = 2n\pi \pm \dfrac{\pi}{3}$`], key: 'a', sol: r`$\sqrt{3} = \tan\dfrac{\pi}{3}$ and $\tan$ repeats every $\pi$, so $\tan x = \tan\dfrac{\pi}{3}$ gives $x = n\pi + \dfrac{\pi}{3}$. The forms with $2n\pi$ miss every second solution, and the $\pm$ forms belong to $\cos x = \cos\alpha$. (Formative topic.)`, d: 2, c: 'understanding', t: [4], time: 60 }), (C) => { C.assert(truth.length === 8, 'eight solutions of tan x = sqrt 3 in [-12, 12]'); C.which(forms.map((f) => sameList(gen(f), truth)), true); });
}
{
  const xs = rootsOf((x) => Math.cos(2 * x) - 0.5, 0, 2 * PI);
  Q('m23', mk.mcq({ stem: r`The equation $\cos 2x = \dfrac{1}{2}$ has how many solutions with $0 \le x \le 2\pi$?`, opts: ['$2$', '$3$', '$4$', '$6$'], key: 'c', sol: r`$2x$ runs over $[0, 4\pi]$, two full turns, and $\cos 2x = \dfrac{1}{2}$ happens twice per turn: $2x = \dfrac{\pi}{3}, \dfrac{5\pi}{3}, \dfrac{7\pi}{3}, \dfrac{11\pi}{3}$, so $x = \dfrac{\pi}{6}, \dfrac{5\pi}{6}, \dfrac{7\pi}{6}, \dfrac{11\pi}{6}$: $4$ solutions. Counting only one turn of $x$ would give $2$.`, d: 3, c: 'analysis', t: [3, 4], time: 75 }), (C) => { C.assert(xs.length === 4 && [1, 5, 7, 11].every((k, i) => near(xs[i], (k * PI) / 6, 1e-6)), 'solutions pi/6, 5pi/6, 7pi/6, 11pi/6'); C.which([2, 3, 4, 6], xs.length); });
}

// =============================================================== assertion-reason
Q('ar1', mk.ar({ a: r`A central angle of $2$ radians in a circle of radius $5$ cm cuts off an arc $10$ cm long.`, r: r`In a circle of radius $r$, an arc subtending an angle $\theta$ (in radians) at the centre has length $r\theta$.`, key: 'a', sol: r`Both are true and R explains A: $l = r\theta = 5 \times 2 = 10$ cm. The rule $l = r\theta$ is valid because one radian is defined by an arc of length $r$, and $\theta$ radians cut off $\theta$ such arcs.`, d: 2, c: 'understanding', t: [1], time: 70 }), (C) => { C.assert(5 * 2 === 10, 'A true: 5 x 2 = 10'); C.key('a'); });
Q('ar2', mk.ar({ a: r`In the third quadrant, both $\sin\theta$ and $\cos\theta$ are negative.`, r: r`The point of the unit circle at angle $\theta$ has coordinates $(\sin\theta, \cos\theta)$.`, key: 'c', sol: r`A is true: the point lies below and left of the origin. R is false: the first coordinate is $\cos\theta$ and the second is $\sin\theta$, so the point is $(\cos\theta, \sin\theta)$.`, d: 2, c: 'understanding', t: [2], time: 70 }), (C) => { const th = gridRad.filter((t) => Math.sin(t) < -1e-9 && Math.cos(t) < -1e-9); const t0 = rad(40); C.assert(th.length > 100 && gridRad.filter((t) => t > PI && t < (3 * PI) / 2).every((t) => Math.sin(t) < 0 && Math.cos(t) < 0), 'A true in quadrant III'); C.assert(!near(Math.cos(t0), Math.sin(t0)), 'R false: (sin, cos) would swap the coordinates'); C.key('c'); });
Q('ar3', mk.ar({ a: r`The function $\tan x$ is defined for every real number $x$.`, r: r`$\tan x = \dfrac{\sin x}{\cos x}$, and $\cos x = 0$ at $x = \dfrac{\pi}{2}$.`, key: 'd', sol: r`A is false: $\tan x$ is undefined at $x = \dfrac{\pi}{2} + n\pi$. R is true, and it is exactly the reason why A fails.`, d: 2, c: 'understanding', t: [2], time: 60 }), (C) => { C.assert(Math.abs(Math.cos(PI / 2)) < 1e-12 && Math.abs(Math.tan(PI / 2)) > 1e12, 'tan blows up at pi/2'); C.key('d'); });
Q('ar4', mk.ar({ a: r`The graph of $y = \sin x$ repeats itself after every interval of length $2\pi$.`, r: r`$-1 \le \sin x \le 1$ for every real $x$.`, key: 'b', sol: r`Both statements are true. R only bounds the values; the repetition in A comes from $\sin(x + 2\pi) = \sin x$, so R is not the explanation.`, d: 2, c: 'understanding', t: [2], time: 60 }), (C) => { C.assert(T.holds1((x) => Math.sin(x + 2 * PI), Math.sin) && gridRad.every((x) => Math.abs(Math.sin(x)) <= 1), 'both true'); C.key('b'); });
Q('ar5', mk.ar({ a: r`For every real $x$, $\cos 2x = 1 - 2\sin^2 x$.`, r: r`$\cos 2x = \cos^2 x - \sin^2 x$ and $\cos^2 x = 1 - \sin^2 x$.`, key: 'a', sol: r`Both are true, and R explains A: substituting $\cos^2 x = 1 - \sin^2 x$ into $\cos^2 x - \sin^2 x$ gives $1 - 2\sin^2 x$.`, d: 2, c: 'understanding', t: [3], time: 70 }), (C) => { C.assert(T.holds1((x) => Math.cos(2 * x), (x) => 1 - 2 * Math.sin(x) ** 2) && T.holds1((x) => Math.cos(2 * x), (x) => Math.cos(x) ** 2 - Math.sin(x) ** 2), 'identities'); C.key('a'); });
Q('ar6', mk.ar({ a: r`$\sin(x + y) = \sin x + \sin y$ for all real $x$ and $y$.`, r: r`$\sin(x + y) = \sin x\cos y + \cos x\sin y$ for all real $x$ and $y$.`, key: 'd', sol: r`A is false: with $x = y = \dfrac{\pi}{2}$ the left side is $\sin\pi = 0$ and the right side is $1 + 1 = 2$. R is the correct addition formula.`, d: 3, c: 'understanding', t: [3], time: 70 }), (C) => { C.assert(!near(Math.sin(PI), 2) && Math.abs(Math.sin(PI)) < 1e-12 && T.holds2((x, y) => Math.sin(x + y), (x, y) => Math.sin(x) * Math.cos(y) + Math.cos(x) * Math.sin(y)), 'A false by counterexample, R true'); C.key('d'); });

// =============================================================== true-false
{
  const xs = rootsOf((x) => Math.sin(x) - 0.5, 0, 2 * PI);
  Q('tf1', mk.tf({ stem: r`In the interval $0 \le x \le 2\pi$, the equation $\sin x = \dfrac{1}{2}$ has exactly one solution.`, key: 'f', sol: r`False. Sine is positive in quadrants I and II, so besides $x = \dfrac{\pi}{6}$ there is $x = \pi - \dfrac{\pi}{6} = \dfrac{5\pi}{6}$: two solutions.`, d: 2, c: 'understanding', t: [2, 4], time: 50 }), (C) => { C.assert(xs.length === 2 && near(xs[0], PI / 6, 1e-6) && near(xs[1], (5 * PI) / 6, 1e-6), 'two solutions'); C.key('f'); });
}
Q('tf2', mk.tf({ stem: r`The equation $\sin 2x = 2\sin x$ is true for every real number $x$.`, key: 'f', sol: r`False. The correct identity is $\sin 2x = 2\sin x\cos x$. At $x = \dfrac{\pi}{2}$ the left side is $\sin\pi = 0$ but the right side is $2$.`, d: 2, c: 'understanding', t: [3], time: 45 }), (C) => { C.assert(!near(Math.sin(PI), 2 * Math.sin(PI / 2)) && T.holds1((x) => Math.sin(2 * x), (x) => 2 * Math.sin(x) * Math.cos(x)), 'counterexample and true identity'); C.key('f'); });
Q('tf3', mk.tf({ stem: r`One radian is larger than $57^\circ$.`, key: 't', sol: r`True. $1$ radian $= \dfrac{180}{\pi}$ degrees $\approx 57.3^\circ$.`, d: 1, c: 'recall', t: [1], time: 30 }), (C) => { C.assert(deg(1) > 57 && deg(1) < 57.3, '1 radian is 57.29...'); C.key('t'); });
{
  Q('tf4', mk.tf({ stem: r`The smallest positive period of the tangent function is $2\pi$.`, key: 'f', sol: r`False. $\tan(x + \pi) = \tan x$ for every $x$ where it is defined, so the smallest period is $\pi$.`, d: 2, c: 'understanding', t: [2], time: 40 }), (C) => { const p = T.period(Math.tan); C.assert(near(p, PI, 1e-9), 'period pi'); C.key('f'); });
}
Q('tf5', mk.tf({ stem: r`For every real $x$, $\cos(\pi - x) = -\cos x$.`, key: 't', sol: r`True. $\cos(\pi - x) = \cos\pi\cos x + \sin\pi\sin x = -\cos x + 0 = -\cos x$. On the unit circle the angle $\pi - x$ is the mirror image of $x$ in the vertical axis, which changes the sign of the first coordinate.`, d: 2, c: 'understanding', t: [2], time: 50 }), (C) => { C.assert(T.holds1((x) => Math.cos(PI - x), (x) => -Math.cos(x)), 'cos(pi - x) = -cos x'); C.key('t'); });
Q('tf6', mk.tf({ stem: r`The arc-length formula $l = r\theta$ holds when the central angle $\theta$ is measured in degrees.`, key: 'f', sol: r`False. The formula needs $\theta$ in radians. In degrees the arc length is $l = r \times \dfrac{\pi\theta}{180}$.`, d: 1, c: 'understanding', t: [1], time: 40 }), (C) => { C.assert(!near(10 * 90, 10 * rad(90)) && near(10 * ((PI * 90) / 180), 10 * rad(90)), 'degrees need conversion'); C.key('f'); });

// =============================================================== fill in the blank
{
  const s = fr(1, 4), good = fr(1).sub(fr(2).mul(s).mul(s));
  Q('fb1', mk.fill({ stem: r`If $\sin x = \dfrac{1}{4}$, then $\cos 2x =$ ___.`, acc: [['7/8', '0.875']], sol: r`Use $\cos 2x = 1 - 2\sin^2 x = 1 - 2\cdot\dfrac{1}{16} = \dfrac{7}{8}$, that is $7/8$ or $0.875$.`, d: 2, c: 'application', t: [3], time: 50 }), (C) => { C.assert(good.eq(fr(7, 8)) && near(Math.cos(2 * Math.asin(0.25)), 0.875), '7/8'); C.blank(0.875); });
}
{
  const g = (x) => 5 - 2 * Math.sin(x);
  const mx = Math.max(...gridRad.map(g));
  Q('fb2', mk.fill({ stem: r`The greatest value of the function $f(x) = 5 - 2\sin x$ is ___.`, acc: [['7']], sol: r`The greatest value occurs when $\sin x = -1$ (at $x = \dfrac{3\pi}{2}$): $5 - 2(-1) = 7$.`, d: 2, c: 'application', t: [2], time: 45 }), (C) => { C.assert(near(mx, 7) && near(g((3 * PI) / 2), 7), 'max 7'); C.blank(7); });
}
Q('fb3', mk.fill({ stem: r`The angle $\dfrac{5\pi}{6}$ radians equals ___ degrees.`, acc: [['150']], sol: r`$\dfrac{5\pi}{6} \times \dfrac{180}{\pi} = 150$, so the angle is $150$ degrees.`, d: 1, c: 'understanding', t: [1], time: 40 }), (C) => { C.assert(near(deg((5 * PI) / 6), 150), '150'); C.blank(150); });
Q('fb4', mk.fill({ stem: r`The value of $\sin\left(-\dfrac{\pi}{6}\right)$ is ___.`, acc: [['-1/2', '-0.5']], sol: r`Sine is an odd function: $\sin\left(-\dfrac{\pi}{6}\right) = -\sin\dfrac{\pi}{6} = -\dfrac{1}{2}$, that is $-1/2$ or $-0.5$.`, d: 1, c: 'understanding', t: [2], time: 40 }), (C) => { C.assert(near(Math.sin(-PI / 6), -0.5) && eq(sinD(-30), frac(-1, 2)), '-1/2'); C.blank(-0.5); });
Q('fb5', mk.fill({ stem: r`The triple-angle formula reads $\sin 3x = 3\sin x - k\sin^3 x$. The constant $k$ is ___.`, acc: [['4']], sol: r`$\sin 3x = 3\sin x - 4\sin^3 x$, so $k = 4$.`, d: 1, c: 'recall', t: [3], time: 40 }), (C) => { C.assert(T.holds1((x) => Math.sin(3 * x), (x) => 3 * Math.sin(x) - 4 * Math.sin(x) ** 3), 'triple angle'); C.blank(4); });
{
  const xs = [0, 0.5, 1, 1.5].map((k) => k * PI).filter((x) => Math.abs(Math.sin(2 * x)) < 1e-9);
  Q('fb6', mk.fill({ stem: r`The number of solutions of $\sin 2x = 0$ with $0 \le x < 2\pi$ is ___.`, acc: [['4']], sol: r`$\sin 2x = 0$ gives $2x = n\pi$, so $x = \dfrac{n\pi}{2}$. In $[0, 2\pi)$ these are $0, \dfrac{\pi}{2}, \pi, \dfrac{3\pi}{2}$: $4$ solutions.`, d: 3, c: 'application', t: [3, 4], time: 55 }), (C) => { const z = rootsOf((x) => Math.sin(2 * x), -1e-3, 2 * PI - 1e-3).filter((x) => x >= -1e-9 && x < 2 * PI - 1e-9); C.assert(xs.length === 4, 'listed'); C.assert(z.length >= 3, 'roots found numerically (sign changes miss the endpoint 0)'); C.blank(4); });
}

// =============================================================== numerical
{
  const l = 0.35 * 2.4;
  Q('n01', mk.num({ stem: 'A flywheel of radius $0.35$ m turns through $2.4$ radians. How far, in metres, does a point on its rim travel along the circle?', value: 0.84, unit: 'm', sol: r`Arc length $l = r\theta = 0.35 \times 2.4 = 0.84$ m.`, scheme: [['0.84', 1]], d: 1, c: 'application', t: [1], time: 60 }), (C) => { C.assert(near(l, 0.84), 'l = 0.84'); C.val(l); });
}
{
  const th = (5 * PI) / 12;
  Q('n02', mk.num({ stem: r`An arc of length $5\pi$ cm on a circle of radius $12$ cm subtends an angle at the centre. Find this angle in degrees.`, value: 75, unit: 'degrees', sol: r`$\theta = \dfrac{l}{r} = \dfrac{5\pi}{12}$ radians, and $\dfrac{5\pi}{12} \times \dfrac{180}{\pi} = 75$ degrees.`, scheme: [['75', 1]], d: 2, c: 'application', t: [1], time: 70 }), (C) => { C.assert(near(5 * PI / 12, th) && near(deg(th), 75), '75 degrees'); C.val(deg(th)); });
}
Q('n03', mk.num({ stem: r`Express an angle of $2.5$ radians in degrees, correct to two decimal places (use $\pi = 3.14159$).`, value: 143.24, tol: 0.01, unit: 'degrees', sol: r`$2.5 \times \dfrac{180}{3.14159} = 143.24$ degrees.`, scheme: [['143.24', 1]], d: 2, c: 'understanding', t: [1], time: 60 }), (C) => { C.assert(near(2.5 * 180 / 3.14159, 143.24, 1e-5) && near(deg(2.5), 143.2394487827, 1e-6), '143.24'); C.val(143.2394, 0.01); });
{
  const t = fr(1, 2), one = fr(1);
  const good = one.sub(t.mul(t)).div(one.add(t.mul(t)));
  Q('n04', mk.num({ stem: r`If $\tan x = \dfrac{1}{2}$, find the value of $\cos 2x$ as a decimal.`, value: 0.6, sol: r`$\cos 2x = \dfrac{1 - \tan^2 x}{1 + \tan^2 x} = \dfrac{1 - \frac{1}{4}}{1 + \frac{1}{4}} = \dfrac{3/4}{5/4} = 0.6$.`.replace(r`\dfrac{1 - \frac{1}{4}}{1 + \frac{1}{4}}`, r`\dfrac{1 - \dfrac{1}{4}}{1 + \dfrac{1}{4}}`), scheme: [['0.6', 1]], d: 2, c: 'application', t: [3], time: 60 }), (C) => { C.assert(near(Math.cos(2 * Math.atan(0.5)), 0.6) && good.eq(fr(3, 5)), '0.6'); C.val(Math.cos(2 * Math.atan(0.5))); });
}
{
  const s = 0.4, v = 3 * s - 4 * s ** 3;
  Q('n05', mk.num({ stem: r`Given $\sin x = 0.4$, find $\sin 3x$.`, value: 0.944, sol: r`$\sin 3x = 3\sin x - 4\sin^3 x = 3(0.4) - 4(0.064) = 1.2 - 0.256 = 0.944$.`, scheme: [['0.944', 1]], d: 2, c: 'application', t: [3], time: 70 }), (C) => { C.assert(near(Math.sin(3 * Math.asin(0.4)), 0.944) && near(v, 0.944), '0.944'); C.val(v); });
}
{
  // sin x = 4/5 (x acute), cos y = -5/13 (y in quadrant II) -> sin(x - y)
  const sx = fr(4, 5), cx = fr(3, 5), cy = frac(-5, 13), sy = fr(12, 13);
  const v = sx.mul(cy).sub(cx.mul(sy));
  Q('n06', mk.num({ stem: r`Let $\sin x = \dfrac{4}{5}$ with $x$ acute and $\cos y = -\dfrac{5}{13}$ with $y$ in the second quadrant. Find $\sin(x - y)$, correct to four decimal places.`, value: -0.8615, tol: 0.0001, sol: r`Here $\cos x = \dfrac{3}{5}$ and $\sin y = \dfrac{12}{13}$. Then $\sin(x - y) = \sin x\cos y - \cos x\sin y = \dfrac{4}{5}\left(-\dfrac{5}{13}\right) - \dfrac{3}{5}\cdot\dfrac{12}{13} = -\dfrac{20}{65} - \dfrac{36}{65} = -\dfrac{56}{65} = -0.8615$.`, scheme: [['-0.8615', 1]], d: 3, c: 'application', t: [3], time: 100 }), (C) => { const x = Math.asin(0.8), y = Math.acos(-5 / 13); C.assert(v.eq(fr(-56, 65)) && near(Math.sin(x - y), v.v), '-56/65'); C.val(v.v, 0.0001); });
}
{
  const l = 7 * (rad(360) / 3);
  Q('n07', mk.num({ stem: r`The minute hand of a wall clock is $7$ cm long. How far, in centimetres, does its tip move in $20$ minutes? Take $\pi = 3.14159$ and give the answer to two decimal places.`, value: 14.66, tol: 0.01, unit: 'cm', sol: r`In $20$ minutes the hand turns $\dfrac{20}{60}$ of a revolution, i.e. $\dfrac{2\pi}{3}$ radians. So $l = r\theta = 7 \times \dfrac{2 \times 3.14159}{3} = 14.66$ cm.`, scheme: [['14.66', 1]], d: 2, c: 'application', t: [1], time: 80 }), (C) => { C.assert(near(l, (14 * PI) / 3) && near((7 * 2 * 3.14159) / 3, 14.6608, 1e-4), '14.66'); C.val(l, 0.01); });
}
