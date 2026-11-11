// ISC 11 Mathematics ch03 Angles and Trigonometric Functions - objective items (mcq, assertion-reason, true-false,
// fill-blank, numerical). Each item is re-solved independently: exact arithmetic in Q(sqrt2, sqrt3) at multiples of 15
// degrees, rational arithmetic for Pythagorean triples, and sampling on a 0.5-degree grid over [-360, 360] degrees otherwise.
import { Q, mk } from './lib.mjs';
import { fr, el, mul, neg, val, tx, sinD, cosD, tanD, rad, toPi, piT, gridRad, fin, holds1, period } from './trig.mjs';
import { r, PI, M, fM, xM, piM, range, sin, cos, tan, cot, sec, csc, near, ks12, kx } from './qh.mjs';

const f4 = (v) => (Math.round(v * 1e4) / 1e4).toString();
const G = gridRad;
const okOn = (pred, xs = G) => xs.every((x) => pred(x));

// =============================================================== MCQ
Q('m01', mk.mcq({ stem: r`By convention, an angle formed by turning the initial ray in the clockwise sense is called`, opts: ['a positive angle', 'a negative angle', 'a reflex angle', 'a quadrantal angle'], key: 'b', sol: r`Anticlockwise rotation gives positive angles and clockwise rotation gives negative angles. A reflex angle is one between $180^\circ$ and $360^\circ$, and a quadrantal angle is a multiple of $90^\circ$; neither describes the sense of the turn.`, d: 1, c: 'recall', t: [1], time: 30 }), (C) => C.key('b'));
{
  const V = [[-2, 5], [-1, 5], [2, 5], [-5, 2]];
  Q('m02', mk.mcq({ stem: r`Converted into radians, the angle $-72^\circ$ becomes`, opts: V.map(([p, q]) => piM(p, q)), key: 'a', sol: r`Multiply by $\dfrac{\pi}{180}$: $-72 \times \dfrac{\pi}{180} = -\dfrac{2\pi}{5}$. Dividing by $360$ instead gives $-\dfrac{\pi}{5}$, and dropping the sign gives $\dfrac{2\pi}{5}$.`, d: 1, c: 'understanding', t: [1], time: 40 }), (C) => C.which(V, toPi(-72)));
}
{
  const s = 4.2, rr = 1.5, V = [2.8, 6.3, 5.7, 1.4];
  Q('m03', mk.mcq({ stem: r`An arc of length $4.2$ m is cut from a circle of radius $1.5$ m. The angle it subtends at the centre of the circle is`, opts: V.map((v) => M(`${v}\\text{ rad}`)), key: 'a', sol: r`With $l = r\theta$, $\theta = \dfrac{l}{r} = \dfrac{4.2}{1.5} = 2.8$ radians. The product $6.3$ multiplies instead of dividing, and $5.7$ adds the two lengths.`, d: 2, c: 'understanding', t: [1], time: 50 }), (C) => C.which(V, s / rr));
}
{
  const rr = 12, th = (5 * PI) / 6;
  const A = (0.5 * rr * rr * th) / PI;
  const V = [60, 120, 5, 10];
  Q('m04', mk.mcq({ stem: r`A sector of a circle has radius $12$ cm and central angle $\dfrac{5\pi}{6}$. Its area, in square centimetres, is`, opts: V.map((v) => M(`${v}\\pi`)), key: 'a', sol: r`$A = \dfrac{1}{2}r^2\theta = \dfrac{1}{2} \times 144 \times \dfrac{5\pi}{6} = 60\pi$. Omitting the factor $\dfrac{1}{2}$ gives $120\pi$; the value $10\pi$ is the arc length $r\theta$.`, d: 2, c: 'application', t: [1], time: 70 }), (C) => { C.assert(near(rr * th / PI, 10), 'arc length 10 pi'); C.which(V, A); });
}
{
  const V = [[3, 4], [3, 8], [2, 3], [5, 6]];
  const hours = 7.5 - 3, d = hours * 30;
  Q('m05', mk.mcq({ stem: r`The hour hand of a wall clock moves from the $3$ o'clock position to the $7{:}30$ position. The angle it turns through is`, opts: V.map(([p, q]) => piM(p, q)), key: 'a', sol: r`The hour hand turns $30^\circ$ in each hour, so in $4.5$ hours it turns $4.5 \times 30^\circ = 135^\circ = \dfrac{3\pi}{4}$ radians. Counting only $4$ hours gives $\dfrac{2\pi}{3}$.`, d: 3, c: 'application', t: [1], time: 80 }), (C) => { C.assert(d === 135, '4.5 h at 30 degrees an hour'); C.which(V, toPi(d)); });
}
{
  const V = [[-3, 4], [3, 4], [-4, 3], [4, 3]];
  const s = -3 / 5, c = Math.sqrt(1 - s * s);
  Q('m06', mk.mcq({ stem: r`Given $\sin\theta = -\dfrac{3}{5}$ and $\cos\theta > 0$, the value of $\tan\theta$ is`, opts: V.map(([p, q]) => fM(p, q)), key: 'a', sol: r`The cosine is positive, so $\cos\theta = \sqrt{1 - \dfrac{9}{25}} = \dfrac{4}{5}$. Then $\tan\theta = \dfrac{-3/5}{4/5} = -\dfrac{3}{4}$. The reciprocal $-\dfrac{4}{3}$ is $\cot\theta$.`, d: 2, c: 'application', t: [2], time: 60 }), (C) => { C.assert(near(c, 0.8), 'cos = 4/5'); C.which(V.map(([p, q]) => p / q), s / c); });
}
{
  const q = [sin(5) > 0 && cos(5) > 0, sin(5) > 0 && cos(5) < 0, sin(5) < 0 && cos(5) < 0, sin(5) < 0 && cos(5) > 0];
  Q('m07', mk.mcq({ stem: r`The terminal side of an angle of $5$ radians lies in`, opts: ['the first quadrant', 'the second quadrant', 'the third quadrant', 'the fourth quadrant'], key: 'd', sol: r`Since $\dfrac{3\pi}{2} \approx 4.71$ and $2\pi \approx 6.28$, the angle $5$ lies between them, so the terminal side is in the fourth quadrant, where sine is negative and cosine is positive.`, d: 3, c: 'understanding', t: [1, 2], time: 60 }), (C) => C.which(q, true));
}
{
  const f = (x) => 1 + 1 / (tan(x) ** 2);
  const cands = [(x) => csc(x) ** 2, (x) => sec(x) ** 2, (x) => tan(x) ** 2, (x) => csc(x)];
  const xs = G.filter((x) => Math.abs(sin(x)) > 1e-3 && Math.abs(cos(x)) > 1e-3);
  Q('m08', mk.mcq({ stem: r`Wherever the expressions are defined, $1 + \cot^2\theta$ is identical to`, opts: [r`$\operatorname{cosec}^2\theta$`, r`$\sec^2\theta$`, r`$\tan^2\theta$`, r`$\operatorname{cosec}\theta$`], key: 'a', sol: r`Divide $\sin^2\theta + \cos^2\theta = 1$ by $\sin^2\theta$: $1 + \cot^2\theta = \operatorname{cosec}^2\theta$. The companion identity $1 + \tan^2\theta = \sec^2\theta$ is the one that gives the wrong option $\sec^2\theta$.`, d: 1, c: 'recall', t: [2], time: 40 }), (C) => C.which(cands.map((g) => holds1(f, g, xs)), true));
}
{
  const V = [3 / 4, -1 / 2, -5 / 4, 0];
  const possible = V.map((v) => v !== 0 && Math.abs(1 / v) <= 1);
  Q('m09', mk.mcq({ stem: r`Exactly one of the numbers below can be the value of $\sec\theta$ for some real angle $\theta$. Which one?`, opts: [r`$\dfrac{3}{4}$`, r`$-\dfrac{1}{2}$`, r`$-\dfrac{5}{4}$`, r`$0$`], key: 'c', sol: r`Since $\sec\theta = \dfrac{1}{\cos\theta}$ and $-1 \le \cos\theta \le 1$, we need $|\sec\theta| \ge 1$. Only $-\dfrac{5}{4}$ qualifies, with $\cos\theta = -\dfrac{4}{5}$. A reciprocal is never $0$.`, d: 2, c: 'understanding', t: [2, 4], time: 60 }), (C) => { C.assert(G.every((x) => !fin(sec(x)) || Math.abs(sec(x)) >= 1 - 1e-12), '|sec| >= 1 on the grid'); C.which(possible, true); });
}
{
  const V = [[-12, 13], [12, 13], [-5, 13], [5, 13]];
  const th = Math.atan2(5, -12);
  Q('m10', mk.mcq({ stem: r`If $\tan\theta = -\dfrac{5}{12}$ and $\sin\theta > 0$, then $\cos\theta$ equals`, opts: V.map(([p, q]) => fM(p, q)), key: 'a', sol: r`A negative tangent with a positive sine puts $\theta$ in the second quadrant, where cosine is negative. With legs $5$ and $12$ the hypotenuse is $13$, so $\cos\theta = -\dfrac{12}{13}$.`, d: 2, c: 'application', t: [2], time: 70 }), (C) => { C.assert(near(tan(th), -5 / 12) && sin(th) > 0, 'angle in quadrant II'); C.which(V.map(([p, q]) => p / q), cos(th)); });
}
{
  let lo = Math.PI / 4, hi = (5 * Math.PI) / 4;
  const g = (x) => sin(x) - cos(x) - 1 / 3;
  for (let i = 0; i < 200; i++) { const m = (lo + hi) / 2; if (g(lo) * g(m) <= 0) hi = m; else lo = m; }
  const th = (lo + hi) / 2;
  const V = [4 / 9, 1 / 9, 8 / 9, 2 / 9];
  Q('m11', mk.mcq({ stem: r`If $\sin\theta - \cos\theta = \dfrac{1}{3}$, then the product $\sin\theta\cos\theta$ equals`, opts: [r`$\dfrac{4}{9}$`, r`$\dfrac{1}{9}$`, r`$\dfrac{8}{9}$`, r`$\dfrac{2}{9}$`], key: 'a', sol: r`Square both sides: $\sin^2\theta + \cos^2\theta - 2\sin\theta\cos\theta = \dfrac{1}{9}$, so $1 - 2\sin\theta\cos\theta = \dfrac{1}{9}$ and $\sin\theta\cos\theta = \dfrac{1}{2}\left(1 - \dfrac{1}{9}\right) = \dfrac{4}{9}$. Forgetting the factor $\dfrac{1}{2}$ gives $\dfrac{8}{9}$.`, d: 4, c: 'analysis', t: [2], time: 100 }), (C) => { C.assert(near(sin(th) - cos(th), 1 / 3), 'angle found'); C.which(V, sin(th) * cos(th)); });
}
{
  const cands = [(x) => -cos(x), (x) => cos(x), (x) => -sin(x), (x) => sin(x)];
  Q('m12', mk.mcq({ stem: r`The expression $\sin\left(\dfrac{3\pi}{2} - x\right)$ can be rewritten, for any real $x$, as`, opts: [r`$-\cos x$`, r`$\cos x$`, r`$-\sin x$`, r`$\sin x$`], key: 'a', sol: r`The angle $\dfrac{3\pi}{2} - x$ lies in the third quadrant for small positive $x$, where sine is negative, and an odd multiple of $\dfrac{\pi}{2}$ turns sine into cosine. So $\sin\left(\dfrac{3\pi}{2} - x\right) = -\cos x$.`, d: 2, c: 'application', t: [3], time: 60 }), (C) => C.which(cands.map((g) => holds1((x) => sin(1.5 * PI - x), g)), true));
}
{
  const t = cosD(570);
  const V = [t, neg(t), el(fr(-1, 2)), el(fr(1, 2))];
  Q('m13', mk.mcq({ stem: r`The exact value of $\cos 570^\circ$ is`, opts: V.map(xM), key: 'a', sol: r`Subtract one full turn: $570^\circ - 360^\circ = 210^\circ$, a third-quadrant angle with reference angle $30^\circ$. Cosine is negative there, so $\cos 570^\circ = -\cos 30^\circ = -\dfrac{\sqrt{3}}{2}$.`, d: 2, c: 'application', t: [3], time: 60 }), (C) => { C.assert(near(val(t), Math.cos(rad(570))) && val(t) < 0, 'numeric and exact agree'); C.which(V.map(val), Math.cos(rad(570))); });
}
{
  const t = tanD(-390);
  const V = [t, neg(t), el(0, 0, -1), el(0, 0, 1)];
  Q('m14', mk.mcq({ stem: r`The value of $\tan\left(-\dfrac{13\pi}{6}\right)$ is`, opts: V.map(xM), key: 'a', sol: r`$-\dfrac{13\pi}{6} = -390^\circ = -360^\circ - 30^\circ$, so the angle is coterminal with $-30^\circ$. Tangent is odd, so $\tan(-30^\circ) = -\dfrac{1}{\sqrt{3}} = -\dfrac{\sqrt{3}}{3}$.`, d: 3, c: 'application', t: [3], time: 75 }), (C) => { C.assert(near(val(t), tan((-13 * PI) / 6)), 'numeric and exact agree'); C.which(V.map(val), tan((-13 * PI) / 6)); });
}
{
  const t = mul(sinD(330), cosD(150));
  const V = [t, neg(t), el(fr(3, 4)), el(fr(1, 4))];
  Q('m15', mk.mcq({ stem: r`The exact value of the product $\sin 330^\circ \cdot \cos 150^\circ$ is`, opts: V.map(xM), key: 'a', sol: r`$\sin 330^\circ = -\sin 30^\circ = -\dfrac{1}{2}$ and $\cos 150^\circ = -\cos 30^\circ = -\dfrac{\sqrt{3}}{2}$. The product of the two negative numbers is $\dfrac{\sqrt{3}}{4}$.`, d: 2, c: 'application', t: [3], time: 70 }), (C) => { C.assert(near(val(t), Math.sin(rad(330)) * Math.cos(rad(150))), 'exact vs numeric'); C.which(V.map(val), Math.sin(rad(330)) * Math.cos(rad(150))); });
}
{
  const tri = [[40, 65], [100, 30], [55, 55], [20, 120]].map(([a, b]) => [rad(a), rad(b), PI - rad(a) - rad(b)]);
  const expr = ([A, B, Cc]) => cos(A + B) + cos(Cc);
  Q('m16', mk.mcq({ stem: r`In a triangle $ABC$, the quantity $\cos(A + B) + \cos C$ always equals`, opts: ['$0$', '$1$', r`$2\cos C$`, r`$-2\cos C$`], key: 'a', sol: r`The angles of a triangle add up to $\pi$, so $A + B = \pi - C$ and $\cos(A + B) = \cos(\pi - C) = -\cos C$. Adding $\cos C$ gives $0$.`, d: 3, c: 'analysis', t: [3], time: 70 }), (C) => { C.assert(tri.every((t) => Math.abs(expr(t)) < 1e-12 && Math.abs(2 * cos(t[2])) > 0.1), 'zero for four triangles'); C.which([tri.every((t) => near(expr(t), 0)), tri.every((t) => near(expr(t), 1)), tri.every((t) => near(expr(t), 2 * cos(t[2]))), tri.every((t) => near(expr(t), -2 * cos(t[2])))], true); });
}
{
  const xs = G;
  const lo = Math.min(...xs.map((x) => 4 - 3 * sin(x))), hi = Math.max(...xs.map((x) => 4 - 3 * sin(x)));
  const V = [[1, 7], [3, 7], [1, 5], [-3, 3]];
  Q('m17', mk.mcq({ stem: r`As $x$ runs over all real numbers, the function $f(x) = 4 - 3\sin x$ takes exactly the values in`, opts: V.map(([a, b]) => M(`[${a},\\ ${b}]`)), key: 'a', sol: r`Since $-1 \le \sin x \le 1$, we get $-3 \le -3\sin x \le 3$ and hence $1 \le 4 - 3\sin x \le 7$; both ends occur at $x = \dfrac{\pi}{2}$ and $x = -\dfrac{\pi}{2}$.`, d: 3, c: 'application', t: [4], time: 70 }), (C) => { C.assert(near(4 - 3 * sin(PI / 2), 1) && near(4 - 3 * sin(-PI / 2), 7), 'ends attained'); C.which(V, [Math.round(lo), Math.round(hi)]); });
}
{
  const truth = (k) => k % 12 !== 0; // x = k*pi/12 ; sin x = 0 exactly when k is a multiple of 12
  const preds = [(k) => k % 12 !== 0, (k) => k % 12 !== 6 && k % 12 !== -6, (k) => k % 24 !== 0, (k) => k % 6 !== 0];
  Q('m18', mk.mcq({ stem: r`The cotangent function $\cot x$ is defined for every real $x$ except those of the form`, opts: [r`$x = n\pi$, $n$ an integer`, r`$x = (2n + 1)\dfrac{\pi}{2}$, $n$ an integer`, r`$x = 2n\pi$, $n$ an integer`, r`$x = n\dfrac{\pi}{2}$, $n$ an integer`], key: 'a', sol: r`$\cot x = \dfrac{\cos x}{\sin x}$ fails exactly where $\sin x = 0$, that is at every integer multiple of $\pi$. The odd multiples of $\dfrac{\pi}{2}$ are where $\tan x$ fails.`, d: 2, c: 'understanding', t: [4], time: 50 }), (C) => C.which(preds.map((p) => ks12.every((k) => p(k) === truth(k))), true));
}
{
  const f = (x) => csc(x);
  const cands = [(x) => sin(x), (x) => tan(x), (x) => cot(x), (x) => csc(x)];
  const fine = range(1, 5999).map((k) => (k * 2 * PI) / 6000).filter((x) => Math.abs(sin(x)) > 1e-9);
  const ok = cands.map((g) => fine.every((x) => Math.abs(g(x)) >= 1 - 1e-9) && fine.some((x) => Math.abs(g(x)) > 50));
  Q('m19', mk.mcq({ stem: r`Which of these functions has the set $(-\infty, -1] \cup [1, \infty)$ as its range?`, opts: [r`$\sin x$`, r`$\tan x$`, r`$\cot x$`, r`$\operatorname{cosec} x$`], key: 'd', sol: r`Because $|\sin x| \le 1$ and $\operatorname{cosec} x = \dfrac{1}{\sin x}$, we have $|\operatorname{cosec} x| \ge 1$, and every such value occurs. Tangent and cotangent take every real value; sine stays within $[-1, 1]$.`, d: 2, c: 'understanding', t: [4], time: 60 }), (C) => { C.assert(f(PI / 2) === 1, 'cosec at pi/2'); C.which(ok, true); });
}
{
  let n = 0;
  const g = (x) => sin(x) - 0.5;
  const N = 40000;
  for (let k = 0; k < N; k++) { const a = (4 * PI * k) / N, b = (4 * PI * (k + 1)) / N; if (g(a) * g(b) < 0) n++; }
  Q('m20', mk.mcq({ stem: r`For $0 \le x \le 4\pi$, the graph of $y = \sin x$ meets the horizontal line $y = \dfrac{1}{2}$ at how many points?`, opts: ['$2$', '$3$', '$4$', '$6$'], key: 'c', sol: r`In each complete wave of length $2\pi$ the sine curve rises through $\dfrac{1}{2}$ once, at $\dfrac{\pi}{6}$, and falls through it once, at $\dfrac{5\pi}{6}$. Two waves give $2 \times 2 = 4$ points.`, d: 2, c: 'application', t: [4], time: 60 }), (C) => C.which([2, 3, n, 6], 4));
}
{
  const zeros = ks12.filter((k) => k % 12 === 0 && k >= -24 && k <= 24).length;
  Q('m21', mk.mcq({ stem: r`How many vertical asymptotes does the graph of $y = \cot x$ have in the closed interval $-2\pi \le x \le 2\pi$?`, opts: ['$3$', '$4$', '$5$', '$6$'], key: 'c', sol: r`The asymptotes are at the zeros of $\sin x$, the integer multiples of $\pi$: $-2\pi, -\pi, 0, \pi, 2\pi$. Counting both end points of the closed interval gives $5$.`, d: 3, c: 'application', t: [4], time: 70 }), (C) => C.which([3, 4, zeros, 6], 5));
}
{
  const f = (x) => cos(x / 3);
  const p = period(f, range(-1000, 1000).map((k) => k / 40));
  Q('m22', mk.mcq({ stem: r`After how large an increase in $x$ does the graph of $f(x) = \cos\dfrac{x}{3}$ first repeat itself? That least positive length is`, opts: [r`$6\pi$`, r`$\dfrac{2\pi}{3}$`, r`$3\pi$`, r`$2\pi$`], key: 'a', sol: r`$\cos\theta$ repeats when $\theta$ grows by $2\pi$. Here $\theta = \dfrac{x}{3}$, so $x$ must grow by $3 \times 2\pi = 6\pi$. The value $\dfrac{2\pi}{3}$ would belong to $\cos 3x$.`, d: 3, c: 'application', t: [4], time: 60 }), (C) => { C.assert(p !== null && near(p, 6 * PI, 1e-6), `period found ${p}`); C.which([6, 2 / 3, 3, 2], p / PI); });
}

// =============================================================== assertion-reason
Q('ar1', mk.ar({ a: r`A sector of radius $10$ cm and central angle $1.2$ radians has area $60$ cm$^2$.`, r: r`The area of a sector with central angle $\theta$ radians in a circle of radius $r$ is $\dfrac{1}{2}r^2\theta$.`, key: 'a', sol: r`R is the standard formula. Using it, $\dfrac{1}{2} \times 100 \times 1.2 = 60$, which is the value in A. So A is true and R explains it.`, d: 2, c: 'application', t: [1] }), (C) => { C.assert(near(0.5 * 100 * 1.2, 60), 'area 60'); C.key('a'); });
Q('ar2', mk.ar({ a: r`The domain of the cosecant function is the whole set of real numbers.`, r: r`Cosecant is the reciprocal of sine, and the sine function takes the value $0$ at $x = n\pi$ for every integer $n$.`, key: 'd', sol: r`R is true. Because $\sin x = 0$ at $0, \pm\pi, \pm 2\pi, \dots$, the reciprocal is undefined there, so A is false.`, d: 2, c: 'understanding', t: [4] }), (C) => { C.assert(ks12.filter((k) => k % 12 === 0).length > 0 && Math.abs(sin(PI)) < 1e-15 && Math.abs(csc(PI)) > 1e15, 'cosec blows up at pi'); C.key('d'); });
Q('ar3', mk.ar({ a: r`The graph of $y = \cos x$ is the graph of $y = \sin x$ moved $\dfrac{\pi}{2}$ units to the left.`, r: r`The cosine function has period $2\pi$.`, key: 'b', sol: r`A is true because $\sin\left(x + \dfrac{\pi}{2}\right) = \cos x$. R is also true, but the period says nothing about a shift of $\dfrac{\pi}{2}$; the shift comes from the allied-angle result, so R does not explain A.`, d: 3, c: 'analysis', t: [3, 4] }), (C) => { C.assert(holds1((x) => sin(x + PI / 2), cos) && period(cos) !== null && near(period(cos), 2 * PI, 1e-6), 'shift and period'); C.key('b'); });
Q('ar4', mk.ar({ a: r`An angle of $1^\circ$ equals $\dfrac{\pi}{180}$ radian.`, r: r`$\pi$ radians equal $360^\circ$.`, key: 'c', sol: r`A is true: from $\pi$ radians $= 180^\circ$ we get $1^\circ = \dfrac{\pi}{180}$ radian. R is false, since $\pi$ radians is a half turn, $180^\circ$; $360^\circ$ is $2\pi$ radians.`, d: 1, c: 'understanding', t: [1] }), (C) => { C.assert(near(rad(180), PI) && near(rad(1), PI / 180) && !near(rad(360), PI), 'pi rad = 180 degrees'); C.key('c'); });
Q('ar5', mk.ar({ a: r`$\tan\left(\dfrac{\pi}{2} + \theta\right) = -\cot\theta$ whenever both sides are defined.`, r: r`$\sin\left(\dfrac{\pi}{2} + \theta\right) = \cos\theta$ and $\cos\left(\dfrac{\pi}{2} + \theta\right) = -\sin\theta$.`, key: 'a', sol: r`Dividing the two results in R gives $\tan\left(\dfrac{\pi}{2} + \theta\right) = \dfrac{\cos\theta}{-\sin\theta} = -\cot\theta$. R is true and is exactly the reason for A.`, d: 3, c: 'analysis', t: [3] }), (C) => { const xs = G.filter((x) => Math.abs(sin(x)) > 1e-3 && Math.abs(cos(x)) > 1e-3); C.assert(holds1((x) => tan(PI / 2 + x), (x) => -cot(x), xs) && holds1((x) => sin(PI / 2 + x), cos) && holds1((x) => cos(PI / 2 + x), (x) => -sin(x)), 'both hold'); C.key('a'); });
Q('ar6', mk.ar({ a: r`The function $f(x) = 3\sin x$ takes every value in the closed interval $[-3, 3]$.`, r: r`The sine function takes every value in the open interval $(-1, 1)$ only, and never reaches $1$ or $-1$.`, key: 'c', sol: r`A is true: $-1 \le \sin x \le 1$ with both ends reached, so $3\sin x$ covers $[-3, 3]$. R is false, because $\sin\dfrac{\pi}{2} = 1$ and $\sin\left(-\dfrac{\pi}{2}\right) = -1$.`, d: 2, c: 'understanding', t: [4] }), (C) => { C.assert(near(3 * sin(PI / 2), 3) && near(3 * sin(-PI / 2), -3) && near(sin(PI / 2), 1), 'ends attained'); C.key('c'); });
Q('ar7', mk.ar({ a: r`The sine function is an odd function: $\sin(-x) = -\sin x$ for every real $x$.`, r: r`$\sin(x + 2\pi) = \sin x$ for every real $x$.`, key: 'b', sol: r`Both statements are true. On the unit circle, turning by $-x$ gives the mirror image in the horizontal axis, which flips the sign of the height; that is A. The period in R is a different property and does not lead to A.`, d: 2, c: 'understanding', t: [3, 4] }), (C) => { C.assert(holds1((x) => sin(-x), (x) => -sin(x)) && holds1((x) => sin(x + 2 * PI), sin), 'odd and periodic'); C.key('b'); });

// =============================================================== true-false
Q('tf1', mk.tf({ stem: r`The identity $\sin^2\theta + \cos^2\theta = 1$ holds for every real $\theta$, including those where $\tan\theta$ is undefined.`, key: 't', sol: r`The identity is Pythagoras' theorem for the point $(\cos\theta, \sin\theta)$ on the unit circle; it needs no division, so it also holds at $\theta = \dfrac{\pi}{2}$, where $\tan\theta$ is undefined.`, d: 2, c: 'understanding', t: [2] }), (C) => { C.assert(holds1((x) => sin(x) ** 2 + cos(x) ** 2, () => 1) && near(sin(PI / 2) ** 2 + cos(PI / 2) ** 2, 1), 'identity on the grid and at pi/2'); C.key('t'); });
Q('tf2', mk.tf({ stem: r`The angle $400^\circ$ and the angle $-320^\circ$ have the same terminal side.`, key: 't', sol: r`Subtracting one turn, $400^\circ - 360^\circ = 40^\circ$; adding one turn, $-320^\circ + 360^\circ = 40^\circ$. Both end where $40^\circ$ ends.`, d: 2, c: 'understanding', t: [1] }), (C) => { C.assert(((400 % 360) + 360) % 360 === ((-320 % 360) + 360) % 360 && ((400 % 360) + 360) % 360 === 40, 'both reduce to 40'); C.key('t'); });
Q('tf3', mk.tf({ stem: r`The smallest positive period of the sine function and of the cosine function is the same number, $2\pi$.`, key: 't', sol: r`Both curves repeat after one full turn and not before: $\sin(x + 2\pi) = \sin x$ and $\cos(x + 2\pi) = \cos x$, while a half turn changes the sign of each.`, d: 1, c: 'recall', t: [4] }), (C) => { C.assert(near(period(sin), 2 * PI, 1e-6) && near(period(cos), 2 * PI, 1e-6), 'both periods 2 pi'); C.key('t'); });
Q('tf4', mk.tf({ stem: r`The graph of $y = \sec x$ crosses the $x$-axis at some points.`, key: 'f', sol: r`$\sec x = \dfrac{1}{\cos x}$ is a reciprocal, so it is never $0$; in fact $|\sec x| \ge 1$. The graph has branches above $y = 1$ and below $y = -1$ and never touches the axis.`, d: 2, c: 'understanding', t: [4] }), (C) => { C.assert(G.every((x) => !fin(sec(x)) || Math.abs(sec(x)) >= 1 - 1e-12), '|sec| >= 1'); C.key('f'); });
Q('tf5', mk.tf({ stem: r`When a central angle of $1$ radian is drawn in two circles of different radii, the larger circle gives the larger radian measure for that angle.`, key: 'f', sol: r`Radian measure is the ratio $\dfrac{\text{arc}}{\text{radius}}$. Doubling the radius doubles the arc cut off by the same angle, so the ratio stays $1$. The measure does not depend on the circle.`, d: 2, c: 'understanding', t: [1] }), (C) => { const th = 1; C.assert([1, 2, 5, 9].every((rr) => near((rr * th) / rr, th)), 'arc / radius constant'); C.key('f'); });
Q('tf6', mk.tf({ stem: r`An angle exists for which $\tan\theta = 100$ and $\operatorname{cosec}\theta = \dfrac{1}{2}$ at the same time.`, key: 'f', sol: r`The condition $\operatorname{cosec}\theta = \dfrac{1}{2}$ needs $\sin\theta = 2$, which is impossible because $|\sin\theta| \le 1$. So no angle satisfies both, whatever happens with the tangent.`, d: 3, c: 'analysis', t: [2, 4] }), (C) => { C.assert(1 / 0.5 === 2 && G.every((x) => Math.abs(sin(x)) <= 1), 'sin = 2 impossible'); C.key('f'); });

// =============================================================== fill in the blank
Q('fb1', mk.fill({ stem: r`In degrees, the angle $\dfrac{11\pi}{12}$ radians measures ____.`, acc: [['165']], sol: r`Multiply by $\dfrac{180}{\pi}$: $\dfrac{11\pi}{12} \times \dfrac{180}{\pi} = 165$, that is $165^\circ$.`, d: 1, c: 'understanding', t: [1] }), (C) => C.blank((11 * 180) / 12));
Q('fb2', mk.fill({ stem: r`A circle has radius $12$ cm. An angle of $0.75$ radian at its centre cuts off an arc of length ____ cm.`, acc: [['9']], sol: r`$l = r\theta = 12 \times 0.75 = 9$ cm.`, d: 1, c: 'understanding', t: [1] }), (C) => C.blank(12 * 0.75));
Q('fb3', mk.fill({ stem: r`The value of $\operatorname{cosec}\left(-\dfrac{\pi}{2}\right)$ is ____.`, acc: [['-1']], sol: r`$\sin\left(-\dfrac{\pi}{2}\right) = -1$, so its reciprocal $\operatorname{cosec}\left(-\dfrac{\pi}{2}\right) = \dfrac{1}{-1} = -1$.`, d: 1, c: 'understanding', t: [3] }), (C) => C.blank(Math.round(csc(-PI / 2))));
{
  const vals = G.map((x) => 5 * sin(x) - 2);
  const ints = range(-20, 20).filter((k) => k >= -7 && k <= 3);
  Q('fb4', mk.fill({ stem: r`The number of integers that belong to the range of $f(x) = 5\sin x - 2$ is ____.`, acc: [['11']], sol: r`From $-1 \le \sin x \le 1$ we get $-7 \le 5\sin x - 2 \le 3$, and every value in $[-7, 3]$ occurs. The integers $-7, -6, \dots, 3$ number $11$.`, d: 3, c: 'application', t: [4] }), (C) => { C.assert(near(Math.min(...vals), -7) && near(Math.max(...vals), 3), 'range [-7, 3]'); C.blank(ints.length); });
}
Q('fb5', mk.fill({ stem: r`A turntable completes $3\dfrac{1}{2}$ full turns in the anticlockwise sense. The angle it has turned through is ____ $\pi$ radians.`, acc: [['7']], sol: r`Each full turn is $2\pi$ radians, so $3.5 \times 2\pi = 7\pi$ radians.`, d: 1, c: 'understanding', t: [1] }), (C) => C.blank(3.5 * 2));
Q('fb6', mk.fill({ stem: r`The value of $\cos 540^\circ$ is ____.`, acc: [['-1']], sol: r`$540^\circ = 360^\circ + 180^\circ$, so $\cos 540^\circ = \cos 180^\circ = -1$.`, d: 1, c: 'understanding', t: [3] }), (C) => C.blank(Math.round(cos(rad(540)))));

// =============================================================== numerical
{
  const th = rad(132), s = 2.5 * th;
  Q('n01', mk.num({ stem: r`A runner follows a circular bend of radius $2.5$ m through a central angle of $132^\circ$. Find the length of the bend in metres, correct to two decimal places (use $\pi = 3.14159$).`, value: 5.76, tol: 0.005, sol: `$\\theta = 132 \\times \\dfrac{\\pi}{180} = ${f4(th)}$ radians, so $l = r\\theta = 2.5 \\times ${f4(th)} = ${s.toFixed(2)}$ m.`, scheme: [['Angle in radians', 0.5], ['$l = r\\theta = 5.76$ m', 0.5]], d: 2, c: 'application', t: [1], time: 90 }), (C) => { const th2 = (132 * 3.14159) / 180; C.val(Math.round(2.5 * th2 * 100) / 100, 0.005); });
}
{
  const rr = Math.sqrt((2 * 25.6) / 0.8);
  Q('n02', mk.num({ stem: r`A sector with central angle $0.8$ radian has area $25.6$ cm$^2$. Find the radius of the circle in centimetres.`, value: 8, sol: r`From $A = \dfrac{1}{2}r^2\theta$: $25.6 = \dfrac{1}{2}r^2 \times 0.8$, so $r^2 = \dfrac{25.6}{0.4} = 64$ and $r = 8$ cm.`, scheme: [['$r^2 = 64$', 0.5], ['$r = 8$', 0.5]], d: 2, c: 'application', t: [1], time: 80 }), (C) => { C.assert(near(0.5 * 64 * 0.8, 25.6), 'area from r = 8'); C.val(rr); });
}
Q('n03', mk.num({ stem: r`The boundary of a sector consists of an arc $13$ cm long and two radii of $8$ cm each. Find the area of the sector in square centimetres.`, value: 52, sol: r`For a sector, $A = \dfrac{1}{2}rl = \dfrac{1}{2} \times 8 \times 13 = 52$ cm$^2$.`, scheme: [['Area formula $\\dfrac{1}{2}rl$', 0.5], ['$A = 52$', 0.5]], d: 2, c: 'understanding', t: [1], time: 70 }), (C) => { const th = 13 / 8; C.assert(near(0.5 * 64 * th, 52), 'also half r squared theta'); C.val(0.5 * 8 * 13); });
{
  // cot t = 15/8, third quadrant: sin = -8/17, cosec = -17/8
  const th = Math.PI + Math.atan(8 / 15);
  Q('n04', mk.num({ stem: r`The angle $\theta$ lies in the third quadrant and $\cot\theta = \dfrac{15}{8}$. Find $\operatorname{cosec}\theta$ as a decimal.`, value: -2.125, sol: r`$1 + \cot^2\theta = 1 + \dfrac{225}{64} = \dfrac{289}{64}$, so $|\operatorname{cosec}\theta| = \dfrac{17}{8}$. Sine is negative in the third quadrant, so $\operatorname{cosec}\theta = -\dfrac{17}{8} = -2.125$.`, scheme: [['$\\operatorname{cosec}^2\\theta = \\dfrac{289}{64}$', 0.5], ['Sign by quadrant: $-2.125$', 0.5]], d: 3, c: 'application', t: [2], time: 90 }), (C) => { C.assert(near(cot(th), 15 / 8) && sin(th) < 0, 'quadrant III'); C.val(csc(th)); });
}
{
  const d = (2.4 * 180) / 3.14159;
  Q('n05', mk.num({ stem: r`A turning arm has rotated through $2.4$ radians. State this angle in degrees, correct to two decimal places (take $\pi = 3.14159$).`, value: 137.51, tol: 0.005, sol: `$2.4 \\times \\dfrac{180}{3.14159} = \\dfrac{432}{3.14159} = ${d.toFixed(2)}$ degrees.`, scheme: [['Multiply by $\\dfrac{180}{\\pi}$', 0.5], ['$137.51^\\circ$', 0.5]], d: 2, c: 'understanding', t: [1], time: 70 }), (C) => C.val(Math.round(d * 100) / 100, 0.005));
}
{
  // sec - tan = 2/5  ->  sec + tan = 5/2
  let lo = 1e-6, hi = PI / 2 - 1e-9; // sec t - tan t decreases from 1 to 0 on (0, pi/2)
  for (let i = 0; i < 200; i++) { const m = (lo + hi) / 2; if (sec(m) - tan(m) > 2 / 5) lo = m; else hi = m; }
  const th = (lo + hi) / 2;
  Q('n06', mk.num({ stem: r`Suppose $\sec\theta - \tan\theta = \dfrac{2}{5}$. Determine the numerical value of $\sec\theta + \tan\theta$, written as a decimal.`, value: 2.5, sol: r`Since $\sec^2\theta - \tan^2\theta = 1$, we have $(\sec\theta - \tan\theta)(\sec\theta + \tan\theta) = 1$. So $\sec\theta + \tan\theta = 1 \div \dfrac{2}{5} = 2.5$.`, scheme: [['Identity $\\sec^2\\theta - \\tan^2\\theta = 1$ factorised', 0.5], ['$2.5$', 0.5]], d: 4, c: 'analysis', t: [2], time: 90 }), (C) => { C.assert(near(sec(th) - tan(th), 0.4, 1e-9), 'angle found'); C.val(sec(th) + tan(th), 1e-6); });
}
