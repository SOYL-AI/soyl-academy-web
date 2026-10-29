// CBSE 12 Mathematics ch10 Vector Algebra — practice bank with independent re-solve checks.
// Every magnitude, direction cosine, section point, dot/cross product, angle, projection and area is
// recomputed from the givens with src/vec.mjs. The topic removed for 2026-27 (syllabus.yaml)
// appears nowhere.
import { Q, caseQ, child, mk, r } from '../../cbse-12-mathematics-ch01/src/lib.mjs';
import { add, sub, scl, dot, cross, mag, unit, angle, deg, proj, sectionIn, sectionEx, triArea, isZero, collinear, eqV, near, R } from './vec.mjs';

const P = Math.PI;
const S = Math.sqrt;

// ---------------------------------------------------------------- formatting helpers (LaTeX from the same arrays the checks use)
const IJK = [r`\hat{i}`, r`\hat{j}`, r`\hat{k}`];
/** Coefficient c is an integer or a fraction string such as '\dfrac{2}{3}' (sign in front if negative). */
export function V(...cs) {
  let out = '';
  cs.forEach((c, i) => {
    if (c === 0) return;
    const neg = typeof c === 'number' ? c < 0 : c.startsWith('-');
    const absTxt = typeof c === 'number' ? (Math.abs(c) === 1 ? '' : String(Math.abs(c))) : c.replace(/^-/, '');
    if (!out) out = `${neg ? '-' : ''}${absTxt}${IJK[i]}`;
    else out += ` ${neg ? '-' : '+'} ${absTxt}${IJK[i]}`;
  });
  return out || r`\vec{0}`;
}
export const pt = (...xs) => `(${xs.join(', ')})`;

// =============================================================== MCQ
Q('m01', mk.mcq({ stem: 'Which of the following is a vector quantity?', opts: ['displacement', 'mass', 'temperature', 'time'], key: 'a', sol: 'Displacement has both a size and a direction (for example 3 km towards the north-east). Mass, temperature and time are fully described by a number with a unit, so they are scalars.', d: 1, c: 'recall', t: [1], time: 30 }), (C) => C.which(['vector', 'scalar', 'scalar', 'scalar'], 'vector'));

{
  const a = [2, -3, 6];
  Q('m02', mk.mcq({ stem: r`The magnitude of $\vec{a} = ${V(...a)}$ is`, opts: ['$7$', '$49$', '$5$', r`$\sqrt{19}$`], key: 'a', sol: r`$|\vec{a}| = \sqrt{2^2 + (-3)^2 + 6^2} = \sqrt{4 + 9 + 36} = \sqrt{49} = 7$. The value $49$ forgets the square root; $5$ adds the components; $\sqrt{19}$ forgets to square the $6$.`, d: 1, c: 'understanding', t: [1], time: 45 }), (C) => C.which([7, 49, 5, S(19)], mag(a)));
}
{
  const a = [3, 0, 4];
  Q('m03', mk.mcq({ stem: r`The unit vector in the direction of $\vec{a} = ${V(...a)}$ is`, opts: [r`$\dfrac{3}{5}\hat{i} + \dfrac{4}{5}\hat{k}$`, r`$3\hat{i} + 4\hat{k}$`, r`$\dfrac{3}{5}\hat{i} + \dfrac{4}{5}\hat{j}$`, r`$\dfrac{3}{7}\hat{i} + \dfrac{4}{7}\hat{k}$`], key: 'a', sol: r`$|\vec{a}| = \sqrt{9 + 16} = 5$, so $\hat{a} = \dfrac{\vec{a}}{|\vec{a}|} = \dfrac{3}{5}\hat{i} + \dfrac{4}{5}\hat{k}$. Dividing by $3 + 4 = 7$ is a common slip; the $\hat{j}$ version changes the direction.`, d: 1, c: 'understanding', t: [1], time: 45 }), (C) => C.which([[0.6, 0, 0.8], [3, 0, 4], [0.6, 0.8, 0], [3 / 7, 0, 4 / 7]], R(unit(a))));
}
{
  const a = [1, -2, 2];
  Q('m04', mk.mcq({ stem: r`The direction cosines of the vector $${V(...a)}$ are`, opts: [r`$\dfrac13, -\dfrac23, \dfrac23$`, '$1, -2, 2$', r`$\dfrac15, -\dfrac25, \dfrac25$`, r`$-\dfrac13, \dfrac23, -\dfrac23$`], key: 'a', sol: r`Magnitude $\sqrt{1 + 4 + 4} = 3$. Direction cosines are the components divided by $3$: $\dfrac13, -\dfrac23, \dfrac23$. The numbers $1, -2, 2$ are direction ratios; the last option points the opposite way.`, d: 2, c: 'understanding', t: [1], time: 60 }), (C) => C.which([[1 / 3, -2 / 3, 2 / 3], [1, -2, 2], [0.2, -0.4, 0.4], [-1 / 3, 2 / 3, -2 / 3]], R(unit(a))));
}
{
  const v = [2, -3, 6];
  Q('m05', mk.mcq({ stem: r`A non-zero vector makes angles $\alpha$, $\beta$, $\gamma$ with the positive $x$-, $y$- and $z$-axes. Then $\cos^2\alpha + \cos^2\beta + \cos^2\gamma$ equals`, opts: ['$0$', '$1$', '$2$', '$3$'], key: 'b', sol: r`If $l, m, n$ are the direction cosines of $\vec{r}$, then $l\hat{i} + m\hat{j} + n\hat{k}$ is the unit vector $\hat{r}$, whose magnitude is $1$. So $l^2 + m^2 + n^2 = 1$.`, d: 1, c: 'recall', t: [1], time: 30 }), (C) => { const u = unit(v); C.which([0, 1, 2, 3], Math.round(dot(u, u) * 1e9) / 1e9); });
}
{
  const a = [2, -4, 6], b = [-1, 2, -3];
  const kind = collinear(a, b) ? (dot(a, b) < 0 ? 'opp' : 'same') : near(dot(a, b), 0) ? 'perp' : 'other';
  Q('m06', mk.mcq({ stem: r`The vectors $${V(...a)}$ and $${V(...b)}$ are`, opts: ['collinear and opposite in direction', 'perpendicular', 'equal', 'collinear and in the same direction'], key: 'a', sol: r`$${V(...a)} = -2(${V(...b)})$: one is a negative multiple of the other, so they are collinear and point in opposite directions. (Their dot product is $-28 \ne 0$, so they are not perpendicular.)`, d: 2, c: 'understanding', t: [1], time: 60 }), (C) => { C.which(['opp', 'perp', 'equal', 'same'], kind); C.assert(eqV(a, scl(-2, b)) && dot(a, b) === -28, 'a = -2b, a.b = -28'); });
}
Q('m07', mk.mcq({ stem: r`For which positive value of $p$ is $p(\hat{i} + \hat{j} + \hat{k})$ a unit vector?`, opts: [r`$\dfrac{1}{\sqrt{3}}$`, r`$\dfrac13$`, r`$\sqrt{3}$`, '$1$'], key: 'a', sol: r`$|p(\hat{i} + \hat{j} + \hat{k})| = p\sqrt{3}$ for $p > 0$. Setting $p\sqrt{3} = 1$ gives $p = \dfrac{1}{\sqrt{3}}$.`, d: 2, c: 'application', t: [1], time: 60 }), (C) => C.which([1 / S(3), 1 / 3, S(3), 1], 1 / mag([1, 1, 1])));
{
  const A = [1, 2, -1], B = [3, -2, 5];
  Q('m08', mk.mcq({ stem: r`If $A${pt(...A)}$ and $B${pt(...B)}$, then $\overrightarrow{AB}$ is`, opts: [`$${V(2, -4, 6)}$`, `$${V(4, 0, 4)}$`, `$${V(-2, 4, -6)}$`, `$${V(2, -4, 4)}$`], key: 'a', sol: r`$\overrightarrow{AB}$ = position vector of $B$ minus position vector of $A$ $= (3 - 1)\hat{i} + (-2 - 2)\hat{j} + (5 + 1)\hat{k}$. Subtracting the other way round gives the negative vector; adding gives neither.`, d: 1, c: 'understanding', t: [2], time: 45 }), (C) => C.which([[2, -4, 6], [4, 0, 4], [-2, 4, -6], [2, -4, 4]], sub(B, A)));
}
{
  const Pp = [2, -1, 4], Qp = [4, 3, -2];
  Q('m09', mk.mcq({ stem: r`The position vector of the midpoint of the segment joining $P${pt(...Pp)}$ and $Q${pt(...Qp)}$ is`, opts: [`$${V(3, 1, 1)}$`, `$${V(1, 2, -3)}$`, `$${V(6, 2, 2)}$`, `$${V(2, 4, -6)}$`], key: 'a', sol: r`Midpoint $= \dfrac{\vec{p} + \vec{q}}{2} = \dfrac{6\hat{i} + 2\hat{j} + 2\hat{k}}{2}$. Half of $\vec{q} - \vec{p}$ is a displacement, not a position.`, d: 1, c: 'understanding', t: [2], time: 45 }), (C) => C.which([[3, 1, 1], [1, 2, -3], [6, 2, 2], [2, 4, -6]], sectionIn(Pp, Qp, 1, 1)));
}
{
  const p = [1, 2, -1], q = [4, -1, 5];
  Q('m10', mk.mcq({ stem: r`Points $P$ and $Q$ have position vectors $${V(...p)}$ and $${V(...q)}$. The point $R$ dividing $PQ$ internally in the ratio $2 : 1$ has position vector`, opts: [`$${V(3, 0, 3)}$`, `$${V(2, 1, 1)}$`, `$${V(5, 1, 4)}$`, `$${V(9, 0, 9)}$`], key: 'a', sol: r`$\vec{r} = \dfrac{2\vec{q} + 1\cdot\vec{p}}{2 + 1} = \dfrac{9\hat{i} + 0\hat{j} + 9\hat{k}}{3}$. Pairing the $2$ with $\vec{p}$ instead of $\vec{q}$ gives the point that divides in $1 : 2$; forgetting to divide by $3$ gives the last option.`, d: 2, c: 'application', t: [2], time: 75 }), (C) => C.which([[3, 0, 3], [2, 1, 1], [5, 1, 4], [9, 0, 9]], sectionIn(p, q, 2, 1)));
}
{
  const A = [1, 4, -2], B = [5, -3, 0], Cc = [-2, 6, 7];
  const sum = add(add(sub(B, A), sub(Cc, B)), sub(A, Cc));
  Q('m11', mk.mcq({ stem: r`For any triangle $ABC$, $\overrightarrow{AB} + \overrightarrow{BC} + \overrightarrow{CA}$ equals`, opts: [r`$\vec{0}$`, r`$2\overrightarrow{AC}$`, r`$2\overrightarrow{AB}$`, r`$\overrightarrow{AC}$`], key: 'a', sol: r`By the triangle law, $\overrightarrow{AB} + \overrightarrow{BC} = \overrightarrow{AC}$, and $\overrightarrow{AC} + \overrightarrow{CA} = \vec{0}$: going round the triangle brings you back to the start.`, d: 1, c: 'recall', t: [2], time: 30 }), (C) => C.which(['zero', '2AC', '2AB', 'AC'], isZero(sum) ? 'zero' : 'other'));
}
{
  const a = [3, -1, 2], b = [2, 4, 1];
  Q('m12', mk.mcq({ stem: r`If $\vec{a} = ${V(...a)}$ and $\vec{b} = ${V(...b)}$, then $\vec{a} \cdot \vec{b}$ is`, opts: ['$4$', '$0$', '$12$', '$8$'], key: 'a', sol: r`Multiply matching components and add: $3(2) + (-1)(4) + 2(1) = 6 - 4 + 2 = 4$. Ignoring the minus sign gives $12$.`, d: 1, c: 'understanding', t: [3], time: 45 }), (C) => C.which([4, 0, 12, 8], dot(a, b)));
}
{
  // (2, λ, 1)·(1, −2, 3) = 0 → λ = (2·1 + 1·3)/2
  const lam = (2 * 1 + 1 * 3) / 2;
  Q('m13', mk.mcq({ stem: r`The value of $\lambda$ for which $2\hat{i} + \lambda\hat{j} + \hat{k}$ is perpendicular to $\hat{i} - 2\hat{j} + 3\hat{k}$ is`, opts: [r`$\dfrac52$`, r`$-\dfrac52$`, r`$\dfrac25$`, '$5$'], key: 'a', sol: r`Perpendicular means the dot product is zero: $2 - 2\lambda + 3 = 0$, so $\lambda = \dfrac52$.`, d: 2, c: 'application', t: [3], time: 60 }), (C) => { C.assert(near(dot([2, lam, 1], [1, -2, 3]), 0), 'dot zero'); C.which([2.5, -2.5, 0.4, 5], lam); });
}
{
  const a = [1, 1, 0], b = [0, 1, 1];
  Q('m14', mk.mcq({ stem: r`The angle between $\hat{i} + \hat{j}$ and $\hat{j} + \hat{k}$ is`, opts: [r`$\dfrac{\pi}{3}$`, r`$\dfrac{\pi}{6}$`, r`$\dfrac{\pi}{4}$`, r`$\dfrac{\pi}{2}$`], key: 'a', sol: r`$\cos\theta = \dfrac{\vec{a} \cdot \vec{b}}{|\vec{a}||\vec{b}|} = \dfrac{0 + 1 + 0}{\sqrt{2}\sqrt{2}} = \dfrac12$, so $\theta = \dfrac{\pi}{3}$.`, d: 2, c: 'understanding', t: [3], time: 60 }), (C) => C.which([P / 3, P / 6, P / 4, P / 2], angle(a, b)));
}
{
  const a = [2, 3, -1], b = [1, 2, 2];
  Q('m15', mk.mcq({ stem: r`The projection of $\vec{a} = ${V(...a)}$ on $\vec{b} = ${V(...b)}$ is`, opts: ['$2$', '$6$', r`$\dfrac{6}{\sqrt{14}}$`, r`$\dfrac23$`], key: 'a', sol: r`Projection of $\vec{a}$ on $\vec{b}$ $= \dfrac{\vec{a} \cdot \vec{b}}{|\vec{b}|} = \dfrac{2 + 6 - 2}{3} = 2$. Dividing by $|\vec{a}| = \sqrt{14}$ gives the projection of $\vec{b}$ on $\vec{a}$ instead.`, d: 2, c: 'understanding', t: [3], time: 60 }), (C) => C.which([2, 6, 6 / S(14), 2 / 3], proj(a, b)));
}
Q('m16', mk.mcq({ stem: r`$\hat{k} \times \hat{j}$ equals`, opts: [r`$-\hat{i}$`, r`$\hat{i}$`, r`$\vec{0}$`, '$1$'], key: 'a', sol: r`In the cyclic order $\hat{i} \to \hat{j} \to \hat{k} \to \hat{i}$, $\hat{j} \times \hat{k} = \hat{i}$. Reversing the order changes the sign, so $\hat{k} \times \hat{j} = -\hat{i}$. A cross product is a vector, never the number $1$.`, d: 1, c: 'recall', t: [4], time: 30 }), (C) => C.which([[-1, 0, 0], [1, 0, 0], [0, 0, 0], 'one'], cross([0, 0, 1], [0, 1, 0])));
{
  const a = [1, 1, -1], b = [2, -1, 1];
  Q('m17', mk.mcq({ stem: r`If $\vec{a} = ${V(...a)}$ and $\vec{b} = ${V(...b)}$, then $|\vec{a} \times \vec{b}|$ is`, opts: [r`$3\sqrt{2}$`, '$18$', '$0$', '$3$'], key: 'a', sol: r`$\vec{a} \times \vec{b} = (1 - 1)\hat{i} - (1 + 2)\hat{j} + (-1 - 2)\hat{k} = -3\hat{j} - 3\hat{k}$, whose magnitude is $\sqrt{9 + 9} = 3\sqrt{2}$. ($18$ forgets the square root.)`, d: 2, c: 'understanding', t: [4], time: 75 }), (C) => { C.assert(eqV(cross(a, b), [0, -3, -3]), 'a×b = −3j − 3k'); C.which([3 * S(2), 18, 0, 3], mag(cross(a, b))); });
}
{
  const d1 = [3, 1, -2], d2 = [1, -3, 4];
  Q('m18', mk.mcq({ stem: r`The diagonals of a parallelogram are $${V(...d1)}$ and $${V(...d2)}$. Its area is`, opts: [r`$5\sqrt{3}$`, r`$10\sqrt{3}$`, r`$5\sqrt{2}$`, '$20$'], key: 'a', sol: r`For diagonals $\vec{d_1}$, $\vec{d_2}$ the area is $\dfrac12|\vec{d_1} \times \vec{d_2}|$. Here $\vec{d_1} \times \vec{d_2} = -2\hat{i} - 14\hat{j} - 10\hat{k}$, of magnitude $\sqrt{300} = 10\sqrt{3}$; half of it is $5\sqrt{3}$. Forgetting the half gives $10\sqrt{3}$.`, d: 3, c: 'application', t: [4], time: 90 }), (C) => { C.assert(eqV(cross(d1, d2), [-2, -14, -10]), 'cross'); C.which([5 * S(3), 10 * S(3), 5 * S(2), 20], mag(cross(d1, d2)) / 2); });
}
{
  const A = 3, B = 4, AB = 6;
  Q('m19', mk.mcq({ stem: r`If $|\vec{a}| = 3$, $|\vec{b}| = 4$ and $\vec{a} \cdot \vec{b} = 6$, then $|\vec{a} + \vec{b}|$ is`, opts: [r`$\sqrt{37}$`, '$7$', r`$\sqrt{13}$`, '$37$'], key: 'a', sol: r`$|\vec{a} + \vec{b}|^2 = |\vec{a}|^2 + 2\,\vec{a} \cdot \vec{b} + |\vec{b}|^2 = 9 + 12 + 16 = 37$. Note $|\vec{a} + \vec{b}| = 7$ only if the vectors point the same way; $\sqrt{13}$ is $|\vec{a} - \vec{b}|$.`, d: 3, c: 'application', t: [3], time: 75 }), (C) => C.which([S(37), 7, S(13), 37], S(A * A + 2 * AB + B * B)));
}

// =============================================================== assertion-reason
Q('ar1', mk.ar({ a: r`The vectors $2\hat{i} + 3\hat{j}$ and $4\hat{i} + 6\hat{j}$ are collinear.`, r: 'Two non-zero vectors are collinear if one is a scalar multiple of the other.', key: 'a', sol: r`$4\hat{i} + 6\hat{j} = 2(2\hat{i} + 3\hat{j})$, so by R the vectors are collinear. Both are true and R explains A.`, d: 1, c: 'understanding', t: [1] }), (C) => { C.assert(collinear([2, 3, 0], [4, 6, 0]), 'collinear'); C.key('a'); });
Q('ar2', mk.ar({ a: r`$\hat{i} \cdot \hat{i} = 1$.`, r: r`$\hat{i} \times \hat{i} = \vec{0}$.`, key: 'b', sol: r`A: the angle between $\hat{i}$ and itself is $0$, so $\hat{i} \cdot \hat{i} = 1 \cdot 1 \cdot \cos 0 = 1$. R: $\sin 0 = 0$, so the cross product is the zero vector. Both are true, but R is about the cross product and does not explain a dot-product fact.`, d: 2, c: 'understanding', t: [3, 4] }), (C) => { C.assert(dot([1, 0, 0], [1, 0, 0]) === 1 && isZero(cross([1, 0, 0], [1, 0, 0])), 'i.i = 1, i×i = 0'); C.key('b'); });
{
  const a = [1, 2, 0], b = [0, 1, 3];
  Q('ar3', mk.ar({ a: r`$\vec{a} \times \vec{b} = \vec{b} \times \vec{a}$ for all vectors $\vec{a}$ and $\vec{b}$.`, r: r`The vector $\vec{a} \times \vec{b}$ is perpendicular to both $\vec{a}$ and $\vec{b}$.`, key: 'd', sol: r`A is false: $\vec{b} \times \vec{a} = -(\vec{a} \times \vec{b})$. For example, with $\vec{a} = \hat{i} + 2\hat{j}$ and $\vec{b} = \hat{j} + 3\hat{k}$, $\vec{a} \times \vec{b} = 6\hat{i} - 3\hat{j} + \hat{k}$ but $\vec{b} \times \vec{a} = -6\hat{i} + 3\hat{j} - \hat{k}$. R is true.`, d: 2, c: 'analysis', t: [4] }), (C) => { const x = cross(a, b), y = cross(b, a); C.assert(eqV(x, [6, -3, 1]) && eqV(y, scl(-1, x)) && near(dot(x, a), 0) && near(dot(x, b), 0), 'anticommutative, perpendicular'); C.key('d'); });
}
{
  const p = [2, -1, 0], q = [5, 2, 0];
  Q('ar4', mk.ar({ a: r`The point dividing the join of $2\hat{i} - \hat{j}$ and $5\hat{i} + 2\hat{j}$ internally in the ratio $1 : 2$ has position vector $3\hat{i}$.`, r: r`The point dividing $PQ$ internally in the ratio $m : n$ has position vector $\dfrac{m\vec{q} + n\vec{p}}{m + n}$.`, key: 'a', sol: r`By R with $m = 1$, $n = 2$: $\dfrac{(5\hat{i} + 2\hat{j}) + 2(2\hat{i} - \hat{j})}{3} = \dfrac{9\hat{i}}{3} = 3\hat{i}$. Both true; R gives A.`, d: 2, c: 'application', t: [2] }), (C) => { C.assert(eqV(sectionIn(p, q, 1, 2), [3, 0, 0]), '3i'); C.key('a'); });
}
Q('ar5', mk.ar({ a: r`The angle between $\hat{i} - \hat{j}$ and $-\hat{i} + \hat{j}$ is $\pi$.`, r: 'The dot product of two vectors is never negative.', key: 'c', sol: r`A: $-\hat{i} + \hat{j} = -(\hat{i} - \hat{j})$, so the vectors point in opposite directions; $\cos\theta = \dfrac{-2}{2} = -1$ and $\theta = \pi$. True. R is false: here the dot product is $-2$.`, d: 2, c: 'analysis', t: [3] }), (C) => { C.assert(near(angle([1, -1, 0], [-1, 1, 0]), P, 1e-6) && dot([1, -1, 0], [-1, 1, 0]) === -2, 'pi, dot −2'); C.key('c'); });
{
  const a = [1, 2, 2], b = [2, 1, -2];
  Q('ar6', mk.ar({ a: r`If $|\vec{a} + \vec{b}| = |\vec{a} - \vec{b}|$ for non-zero $\vec{a}$, $\vec{b}$, then $\vec{a}$ and $\vec{b}$ are parallel.`, r: r`$|\vec{a} + \vec{b}|^2 - |\vec{a} - \vec{b}|^2 = 4\,\vec{a} \cdot \vec{b}$.`, key: 'd', sol: r`R is true (expand both squares). By R the condition gives $\vec{a} \cdot \vec{b} = 0$, so the vectors are **perpendicular**, not parallel: e.g. $\hat{i} + 2\hat{j} + 2\hat{k}$ and $2\hat{i} + \hat{j} - 2\hat{k}$ give $|\vec{a} + \vec{b}| = |\vec{a} - \vec{b}| = \sqrt{18}$. A is false.`, d: 3, c: 'analysis', t: [3] }), (C) => { C.assert(near(mag(add(a, b)), mag(sub(a, b))) && near(mag(add(a, b)), S(18)) && near(dot(a, b), 0) && !collinear(a, b), 'perpendicular counterexample'); C.key('d'); });
}

// =============================================================== true-false
Q('tf1', mk.tf({ stem: r`$\dfrac{1}{\sqrt{2}}\hat{i} - \dfrac{1}{\sqrt{2}}\hat{j}$ is a unit vector.`, key: 't', sol: r`Its magnitude is $\sqrt{\dfrac12 + \dfrac12} = 1$. True.`, d: 1, c: 'understanding', t: [1] }), (C) => { C.assert(near(mag([1 / S(2), -1 / S(2), 0]), 1), 'unit'); C.key('t'); });
Q('tf2', mk.tf({ stem: r`The numbers $2, -1, 2$ are the direction cosines of the vector $2\hat{i} - \hat{j} + 2\hat{k}$.`, key: 'f', sol: r`Direction cosines satisfy $l^2 + m^2 + n^2 = 1$, but $4 + 1 + 4 = 9$. The numbers $2, -1, 2$ are direction **ratios**; the direction cosines are $\dfrac23, -\dfrac13, \dfrac23$. False.`, d: 2, c: 'understanding', t: [1] }), (C) => { C.assert(dot([2, -1, 2], [2, -1, 2]) === 9 && eqV(R(unit([2, -1, 2])), R([2 / 3, -1 / 3, 2 / 3])), 'dc 2/3, -1/3, 2/3'); C.key('f'); });
Q('tf3', mk.tf({ stem: r`The vectors $4\hat{i} - 2\hat{j} + \hat{k}$ and $\hat{i} + 3\hat{j} + 2\hat{k}$ are perpendicular.`, key: 't', sol: r`Dot product: $4 - 6 + 2 = 0$, so they are perpendicular. True.`, d: 1, c: 'understanding', t: [3] }), (C) => { C.assert(dot([4, -2, 1], [1, 3, 2]) === 0, 'dot 0'); C.key('t'); });
Q('tf4', mk.tf({ stem: r`$\hat{i} \times \hat{k} = \hat{j}$.`, key: 'f', sol: r`$\hat{k} \times \hat{i} = \hat{j}$ (cyclic order), so $\hat{i} \times \hat{k} = -\hat{j}$. False.`, d: 1, c: 'recall', t: [4] }), (C) => { C.assert(eqV(cross([1, 0, 0], [0, 0, 1]), [0, -1, 0]), 'i×k = −j'); C.key('f'); });
Q('tf5', mk.tf({ stem: 'Any two vectors that have the same magnitude are equal vectors.', key: 'f', sol: r`Equal vectors need the same magnitude **and** the same direction. $\hat{i}$ and $\hat{j}$ both have magnitude $1$ but are not equal. False.`, d: 1, c: 'understanding', t: [1] }), (C) => { C.assert(mag([1, 0, 0]) === mag([0, 1, 0]) && !eqV([1, 0, 0], [0, 1, 0]), 'counterexample'); C.key('f'); });

// =============================================================== fill in the blank
Q('fb1', mk.fill({ stem: r`The magnitude of $4\hat{i} - 4\hat{j} + 2\hat{k}$ is ______.`, acc: [['6', '$6$']], sol: r`$\sqrt{16 + 16 + 4} = \sqrt{36} = 6$.`, d: 1, c: 'understanding', t: [1] }), (C) => C.blank(mag([4, -4, 2])));
Q('fb2', mk.fill({ stem: r`If $\vec{a} \cdot \vec{b} = |\vec{a}||\vec{b}|$ for non-zero vectors $\vec{a}$ and $\vec{b}$, the angle between them is ______ degrees.`, acc: [['0', '$0$', '0°', 'zero']], sol: r`$\cos\theta = 1$, so $\theta = 0$: the vectors point the same way.`, d: 2, c: 'understanding', t: [3] }), (C) => C.blank(deg(Math.acos(1))));
{
  // 3i + λj + 2k collinear with 6i − 4j + 4k: ratio 3/6 = 2/4 = 1/2, so λ = −4/2
  const lam = -4 * (3 / 6);
  Q('fb3', mk.fill({ stem: r`If $3\hat{i} + \lambda\hat{j} + 2\hat{k}$ is collinear with $6\hat{i} - 4\hat{j} + 4\hat{k}$, then $\lambda = $ ______.`, acc: [['-2', '−2', '$-2$']], sol: r`Collinear vectors have proportional components: $\dfrac36 = \dfrac{\lambda}{-4} = \dfrac24 = \dfrac12$, so $\lambda = -2$.`, d: 2, c: 'application', t: [1] }), (C) => { C.assert(collinear([3, lam, 2], [6, -4, 4]), 'collinear'); C.blank(lam); });
}
Q('fb4', mk.fill({ stem: r`The area of the parallelogram with adjacent sides $\hat{i} + \hat{j}$ and $\hat{i} - \hat{j}$ is ______ square units.`, acc: [['2', '$2$']], sol: r`$(\hat{i} + \hat{j}) \times (\hat{i} - \hat{j}) = -2\hat{k}$, of magnitude $2$.`, d: 2, c: 'application', t: [4] }), (C) => C.blank(mag(cross([1, 1, 0], [1, -1, 0]))));
Q('fb5', mk.fill({ stem: r`If $|\vec{a}| = 5$ and $|\vec{b}| = 3$, then $(\vec{a} + \vec{b}) \cdot (\vec{a} - \vec{b}) = $ ______.`, acc: [['16', '$16$']], sol: r`The cross terms cancel because $\vec{a} \cdot \vec{b} = \vec{b} \cdot \vec{a}$: the product is $|\vec{a}|^2 - |\vec{b}|^2 = 25 - 9 = 16$.`, d: 2, c: 'application', t: [3] }), (C) => { const a = [5, 0, 0], b = [0, 3, 0], b2 = [1.8, 2.4, 0]; C.assert(near(dot(add(a, b2), sub(a, b2)), 16), 'independent of angle'); C.blank(dot(add(a, b), sub(a, b))); });

// =============================================================== numerical
{
  const a = [1, 2, -1], b = [-1, 1, 1];
  Q('n01', mk.num({ stem: r`If $\vec{a} = ${V(...a)}$ and $\vec{b} = ${V(...b)}$, find $|2\vec{a} - \vec{b}|$ correct to one decimal place.`, value: 5.2, tol: 0.01, sol: r`$2\vec{a} - \vec{b} = 3\hat{i} + 3\hat{j} - 3\hat{k}$, so $|2\vec{a} - \vec{b}| = \sqrt{27} = 3\sqrt{3} \approx 5.2$.`, scheme: [['5.2', 1]], d: 2, c: 'application', t: [1, 2], time: 75 }), (C) => { C.assert(eqV(sub(scl(2, a), b), [3, 3, -3]), '3i + 3j − 3k'); C.val(mag(sub(scl(2, a), b)), 0.01); });
}
{
  const A = [1, -1, 2], B = [3, 3, 0];
  // AC = (3, 6, k − 2) must be (3/2)·AB = (3, 6, −3)
  const k = 2 + 1.5 * (B[2] - A[2]);
  Q('n02', mk.num({ stem: r`The points $A${pt(...A)}$, $B${pt(...B)}$ and $C(4, 5, k)$ are collinear. Find $k$.`, value: -1, sol: r`$\overrightarrow{AB} = 2\hat{i} + 4\hat{j} - 2\hat{k}$ and $\overrightarrow{AC} = 3\hat{i} + 6\hat{j} + (k - 2)\hat{k}$. Collinear: $\dfrac32 = \dfrac64 = \dfrac{k - 2}{-2}$, so $k - 2 = -3$ and $k = -1$.`, scheme: [['-1', 1]], d: 3, c: 'application', t: [2], time: 90 }), (C) => { C.assert(collinear(sub(B, A), sub([4, 5, k], A)), 'collinear at k'); C.val(k); });
}
{
  const a = [6, 2, -3], b = [2, -2, 1];
  Q('n03', mk.num({ stem: r`Find the projection of $${V(...a)}$ on $${V(...b)}$, correct to two decimal places.`, value: 1.67, tol: 0.01, sol: r`$\dfrac{\vec{a} \cdot \vec{b}}{|\vec{b}|} = \dfrac{12 - 4 - 3}{3} = \dfrac53 \approx 1.67$.`, scheme: [['1.67', 1]], d: 2, c: 'understanding', t: [3], time: 60 }), (C) => C.val(proj(a, b), 0.01));
}
Q('n04', mk.num({ stem: r`Find, in degrees, the angle between $\hat{i} - \hat{j}$ and $\hat{j} - \hat{k}$.`, value: 120, unit: '°', sol: r`$\cos\theta = \dfrac{0 - 1 + 0}{\sqrt{2}\sqrt{2}} = -\dfrac12$. The angle is obtuse with reference angle $60$ degrees, so $\theta = 180 - 60 = 120$ degrees.`, scheme: [['120', 1]], d: 2, c: 'understanding', t: [3], time: 60 }), (C) => C.val(Math.round(deg(angle([1, -1, 0], [0, 1, -1])) * 1e6) / 1e6));
{
  const A = [1, 1, 1], B = [1, 2, 3], Cc = [2, 3, 1];
  Q('n05', mk.num({ stem: r`Find the area of the triangle with vertices $A${pt(...A)}$, $B${pt(...B)}$ and $C${pt(...Cc)}$, correct to two decimal places.`, value: 2.29, tol: 0.01, sol: r`$\overrightarrow{AB} = \hat{j} + 2\hat{k}$, $\overrightarrow{AC} = \hat{i} + 2\hat{j}$; $\overrightarrow{AB} \times \overrightarrow{AC} = -4\hat{i} + 2\hat{j} - \hat{k}$, magnitude $\sqrt{21}$. Area $= \dfrac{\sqrt{21}}{2} \approx 2.29$ square units.`, scheme: [['2.29', 1]], d: 3, c: 'application', t: [4], time: 120 }), (C) => { C.assert(eqV(cross(sub(B, A), sub(Cc, A)), [-4, 2, -1]), 'cross'); C.val(triArea(A, B, Cc), 0.01); });
}
Q('n06', mk.num({ stem: r`Two vectors have magnitudes $2$ and $3$ and the angle between them is $\dfrac{\pi}{3}$. Find the magnitude of their difference, correct to two decimal places.`, value: 2.65, tol: 0.01, sol: r`$|\vec{a} - \vec{b}|^2 = 4 + 9 - 2(2)(3)\cos\dfrac{\pi}{3} = 13 - 6 = 7$, so $|\vec{a} - \vec{b}| = \sqrt{7} \approx 2.65$.`, scheme: [['2.65', 1]], d: 3, c: 'application', t: [3], time: 90 }), (C) => { const a = [2, 0, 0], b = [3 * Math.cos(P / 3), 3 * Math.sin(P / 3), 0]; C.val(mag(sub(a, b)), 0.01); });
Q('n07', mk.num({ stem: r`If $|\vec{a}| = 4$, $|\vec{b}| = 5$ and $\vec{a} \cdot \vec{b} = 12$, find $|\vec{a} \times \vec{b}|$.`, value: 16, sol: r`$\cos\theta = \dfrac{12}{20} = \dfrac35$, so $\sin\theta = \dfrac45$ and $|\vec{a} \times \vec{b}| = 4 \times 5 \times \dfrac45 = 16$. (Or $|\vec{a} \times \vec{b}|^2 = 400 - 144 = 256$.)`, scheme: [['16', 1]], d: 3, c: 'application', t: [4], time: 90 }), (C) => { const th = Math.acos(12 / 20); const a = [4, 0, 0], b = [5 * Math.cos(th), 5 * Math.sin(th), 0]; C.assert(near(dot(a, b), 12), 'a.b = 12'); C.val(Math.round(mag(cross(a, b)) * 1e9) / 1e9); });

// =============================================================== short answer (2 marks)
{
  const a = [2, -1, 2];
  const want = scl(12 / mag(a), a);
  Q('s201', mk.short({ marks: 2, stem: r`Find a vector of magnitude $12$ units in the direction of $${V(...a)}$.`, model: r`$|\vec{a}| = \sqrt{4 + 1 + 4} = 3$, so $\hat{a} = \dfrac13(2\hat{i} - \hat{j} + 2\hat{k})$.

Required vector $= 12\hat{a} = 4(2\hat{i} - \hat{j} + 2\hat{k}) = 8\hat{i} - 4\hat{j} + 8\hat{k}$.`, sol: 'Unit vector first, then scale.', scheme: [['Unit vector', 1], ['8i − 4j + 8k', 1]], d: 2, c: 'understanding', t: [1], time: 90 }), (C) => { C.assert(eqV(want, [8, -4, 8]), '8, −4, 8'); C.model([3, 8, 4]); });
}
{
  const A = [2, -1, 3], B = [4, 3, -1];
  const AB = sub(B, A);
  Q('s202', mk.short({ marks: 2, stem: r`Find the direction cosines of $\overrightarrow{AB}$, where $A${pt(...A)}$ and $B${pt(...B)}$.`, model: r`$\overrightarrow{AB} = 2\hat{i} + 4\hat{j} - 4\hat{k}$ and $|\overrightarrow{AB}| = \sqrt{4 + 16 + 16} = 6$.

Direction cosines: $\dfrac26, \dfrac46, -\dfrac46$, i.e. $\dfrac{1}{3}, \dfrac{2}{3}, -\dfrac{2}{3}$.`, sol: 'Vector AB, its length, then divide.', scheme: [['AB and |AB| = 6', 1], ['1/3, 2/3, −2/3', 1]], d: 2, c: 'understanding', t: [1], time: 90 }), (C) => { C.assert(eqV(AB, [2, 4, -4]) && eqV(R(unit(AB)), R([1 / 3, 2 / 3, -2 / 3])), 'dc'); C.model([6, 1, 2, 3]); });
}
{
  const p = [-1, 2, 4], q = [5, -4, 1];
  const rr = sectionEx(p, q, 2, 1);
  Q('s203', mk.short({ marks: 2, stem: r`Find the position vector of the point $R$ that divides the join of $P${pt(...p)}$ and $Q${pt(...q)}$ externally in the ratio $2 : 1$.`, model: r`External division in $m : n = 2 : 1$: $\vec{r} = \dfrac{2\vec{q} - \vec{p}}{2 - 1}$.

$2\vec{q} = 10\hat{i} - 8\hat{j} + 2\hat{k}$, so $\vec{r} = (10 + 1)\hat{i} + (-8 - 2)\hat{j} + (2 - 4)\hat{k} = 11\hat{i} - 10\hat{j} - 2\hat{k}$.`, sol: 'Use the external section formula.', scheme: [['Formula with m = 2, n = 1', 1], ['11i − 10j − 2k', 1]], d: 2, c: 'application', t: [2], time: 90 }), (C) => { C.assert(eqV(rr, [11, -10, -2]), 'r'); C.model([11, 10, 2]); });
}
{
  const A = [1, 2, 7], B = [2, 6, 3], Cc = [3, 10, -1];
  Q('s204', mk.short({ marks: 2, stem: r`Using vectors, show that the points $A${pt(...A)}$, $B${pt(...B)}$ and $C${pt(...Cc)}$ are collinear.`, model: r`$\overrightarrow{AB} = \hat{i} + 4\hat{j} - 4\hat{k}$ and $\overrightarrow{BC} = \hat{i} + 4\hat{j} - 4\hat{k}$.

So $\overrightarrow{AB} = \overrightarrow{BC}$: the two vectors are parallel and share the point $B$, hence $A$, $B$, $C$ are collinear (and $B$ is the midpoint of $AC$).`, sol: 'Compare AB with BC.', scheme: [['Both vectors found', 1], ['Parallel with common point ⇒ collinear', 1]], d: 2, c: 'understanding', t: [2], time: 90 }), (C) => { C.assert(eqV(sub(B, A), sub(Cc, B)) && eqV(sub(B, A), [1, 4, -4]), 'AB = BC'); C.model(['collinear']); });
}
{
  // (2, λ, −1)·(3, −2, 4) = 8 → 6 − 2λ − 4 = 8
  const lam = (6 - 4 - 8) / 2;
  Q('s205', mk.short({ marks: 2, stem: r`If $\vec{a} = 2\hat{i} + \lambda\hat{j} - \hat{k}$, $\vec{b} = 3\hat{i} - 2\hat{j} + 4\hat{k}$ and $\vec{a} \cdot \vec{b} = 8$, find $\lambda$. Hence find the projection of $\vec{a}$ on $\hat{k}$.`, model: r`$\vec{a} \cdot \vec{b} = 6 - 2\lambda - 4 = 2 - 2\lambda = 8$, so $\lambda = -3$.

Projection of $\vec{a}$ on $\hat{k}$ $= \vec{a} \cdot \hat{k} = -1$ (it does not depend on $\lambda$).`, sol: 'Expand the dot product and solve.', scheme: [['λ = −3', 1], ['Projection −1', 1]], d: 2, c: 'understanding', t: [3], time: 90 }), (C) => { C.assert(dot([2, lam, -1], [3, -2, 4]) === 8 && lam === -3, 'λ = −3'); C.model([3, 1]); });
}
Q('s206', mk.short({ marks: 2, stem: r`Find the angle between $\vec{a}$ and $\vec{b}$ if $|\vec{a}| = 3$, $|\vec{b}| = 2$ and $\vec{a} \cdot \vec{b} = 3$.`, model: r`$\cos\theta = \dfrac{\vec{a} \cdot \vec{b}}{|\vec{a}||\vec{b}|} = \dfrac{3}{3 \times 2} = \dfrac12$.

So $\theta = \dfrac{\pi}{3}$ (that is, $60°$).`, sol: 'Use the definition of the dot product.', scheme: [['cos θ = 1/2', 1], ['θ = π/3', 1]], d: 1, c: 'understanding', t: [3], time: 60 }), (C) => { C.assert(near(Math.acos(3 / 6), P / 3), 'π/3'); C.model([60]); });
{
  const a = [2, 1, -1], b = [1, -1, 2];
  const n = cross(a, b);
  Q('s207', mk.short({ marks: 2, stem: r`Find a unit vector perpendicular to both $\vec{a} = ${V(...a)}$ and $\vec{b} = ${V(...b)}$.`, model: r`$\vec{a} \times \vec{b} = (1 \cdot 2 - (-1)(-1))\hat{i} - (2 \cdot 2 - (-1)(1))\hat{j} + (2(-1) - 1 \cdot 1)\hat{k} = \hat{i} - 5\hat{j} - 3\hat{k}$, with magnitude $\sqrt{1 + 25 + 9} = \sqrt{35}$.

Required unit vectors: $\pm\dfrac{1}{\sqrt{35}}(\hat{i} - 5\hat{j} - 3\hat{k})$.`, sol: 'Cross product, then divide by its length.', scheme: [['a × b', 1], ['± (1/√35)(i − 5j − 3k)', 1]], d: 2, c: 'application', t: [4], time: 120 }), (C) => { C.assert(eqV(n, [1, -5, -3]) && near(dot(n, a), 0) && near(dot(n, b), 0), 'normal'); C.model([35, 5, 3]); });
}
{
  const a = [3, 1, -2], b = [1, -1, 1];
  Q('s208', mk.short({ marks: 2, stem: r`Find the area of the parallelogram whose adjacent sides are $${V(...a)}$ and $${V(...b)}$.`, model: r`$\vec{a} \times \vec{b} = (1 - 2)\hat{i} - (3 + 2)\hat{j} + (-3 - 1)\hat{k} = -\hat{i} - 5\hat{j} - 4\hat{k}$.

Area $= |\vec{a} \times \vec{b}| = \sqrt{1 + 25 + 16} = \sqrt{42}$ square units.`, sol: 'Area of a parallelogram is the magnitude of the cross product of adjacent sides.', scheme: [['Cross product', 1], ['√42', 1]], d: 2, c: 'understanding', t: [4], time: 90 }), (C) => { C.assert(eqV(cross(a, b), [-1, -5, -4]), 'cross'); C.assert(near(mag(cross(a, b)), S(42)), '√42'); C.model([42]); });
}
{
  const a = [1, 2, -1], b = [3, -1, 1], c = [4, 1, 0];
  Q('s209', mk.short({ marks: 2, stem: r`Show that the vectors $${V(...a)}$, $${V(...b)}$ and $${V(...c)}$ form the sides of a right-angled triangle.`, model: r`The first two add up to the third: $(\hat{i} + 2\hat{j} - \hat{k}) + (3\hat{i} - \hat{j} + \hat{k}) = 4\hat{i} + \hat{j}$, so the three vectors form a triangle.

Dot product of the first two: $3 - 2 - 1 = 0$, so those sides are perpendicular and the triangle is right-angled.`, sol: 'Triangle law, then a zero dot product.', scheme: [['Sum shows a triangle', 1], ['Dot product 0 ⇒ right angle', 1]], d: 2, c: 'application', t: [2, 3], time: 120 }), (C) => { C.assert(eqV(add(a, b), c) && dot(a, b) === 0, 'right triangle'); C.model([0]); });
}

// =============================================================== short answer (3 marks)
{
  const A = [1, 0, 2], B = [3, 1, -1], Cc = [4, 3, 0];
  const D = sub(add(A, Cc), B);
  Q('s301', mk.short({ marks: 3, stem: r`$A${pt(...A)}$, $B${pt(...B)}$ and $C${pt(...Cc)}$ are three vertices of a parallelogram $ABCD$, taken in order. Find the fourth vertex $D$ and verify that the diagonals bisect each other.`, model: r`In a parallelogram $ABCD$, $\overrightarrow{AD} = \overrightarrow{BC}$, so $\vec{d} = \vec{a} + \vec{c} - \vec{b}$.

$\vec{d} = (1 + 4 - 3)\hat{i} + (0 + 3 - 1)\hat{j} + (2 + 0 + 1)\hat{k} = 2\hat{i} + 2\hat{j} + 3\hat{k}$, so $D(2, 2, 3)$.

Midpoint of $AC$: $\left(\dfrac{5}{2}, \dfrac{3}{2}, 1\right)$; midpoint of $BD$: $\left(\dfrac{5}{2}, \dfrac{3}{2}, 1\right)$. They coincide, so the diagonals bisect each other.`, sol: 'Equal opposite sides, then compare midpoints.', scheme: [['AD = BC set up', 1], ['D(2, 2, 3)', 1], ['Midpoints equal', 1]], d: 3, c: 'application', t: [2], time: 150 }), (C) => { C.assert(eqV(D, [2, 2, 3]) && eqV(sectionIn(A, Cc, 1, 1), sectionIn(B, D, 1, 1)) && eqV(sectionIn(A, Cc, 1, 1), [2.5, 1.5, 1]), 'D, midpoints'); C.model([2, 3, 5]); });
}
{
  const a = [2, -2, 1], b = [1, 2, -2], c = [2, -1, 4];
  const bc = add(b, c);
  Q('s302', mk.short({ marks: 3, stem: r`If $\vec{a} = ${V(...a)}$, $\vec{b} = ${V(...b)}$ and $\vec{c} = ${V(...c)}$, find the projection of $\vec{b} + \vec{c}$ on $\vec{a}$.`, model: r`$\vec{b} + \vec{c} = 3\hat{i} + \hat{j} + 2\hat{k}$.

$\vec{a} \cdot (\vec{b} + \vec{c}) = 6 - 2 + 2 = 6$ and $|\vec{a}| = \sqrt{4 + 4 + 1} = 3$.

Projection $= \dfrac{6}{3} = 2$.`, sol: 'Add first, then project on a.', scheme: [['b + c', 1], ['Dot product and |a|', 1], ['Projection 2', 1]], d: 2, c: 'understanding', t: [2, 3], time: 120 }), (C) => { C.assert(eqV(bc, [3, 1, 2]), 'b + c'); C.model([proj(bc, a), 6, 3]); });
}
{
  // a + b + c = 0, |a| = 3, |b| = 8, |c| = 7 → 2a·b = 49 − 9 − 64
  const ab = (49 - 9 - 64) / 2;
  const th = Math.acos(ab / (3 * 8));
  Q('s303', mk.short({ marks: 3, stem: r`Vectors $\vec{a}$, $\vec{b}$, $\vec{c}$ satisfy $\vec{a} + \vec{b} + \vec{c} = \vec{0}$, with $|\vec{a}| = 3$, $|\vec{b}| = 8$ and $|\vec{c}| = 7$. Find the angle between $\vec{a}$ and $\vec{b}$.`, model: r`$\vec{c} = -(\vec{a} + \vec{b})$, so $|\vec{c}|^2 = |\vec{a}|^2 + 2\,\vec{a} \cdot \vec{b} + |\vec{b}|^2$.

$49 = 9 + 64 + 2\,\vec{a} \cdot \vec{b}$, so $\vec{a} \cdot \vec{b} = -12$.

$\cos\theta = \dfrac{-12}{3 \times 8} = -\dfrac12$, hence $\theta = \dfrac{2\pi}{3}$ (that is, $120°$).`, sol: 'Square the magnitude of c = −(a + b).', scheme: [['c = −(a + b) squared', 1], ['a · b = −12', 1], ['θ = 2π/3', 1]], d: 3, c: 'analysis', t: [3], time: 150 }), (C) => { const a = [3, 0, 0], b = [8 * Math.cos(th), 8 * Math.sin(th), 0]; C.assert(near(mag(add(a, b)), 7) && near(th, 2 * P / 3), '|a + b| = 7, θ = 2π/3'); C.model([12, 120]); });
}
{
  const a = [1, 2, 2], b = [2, 1, -2];
  const n = cross(a, b), v = scl(6 / mag(n), n);
  Q('s304', mk.short({ marks: 3, stem: r`Find the vectors of magnitude $6$ that are perpendicular to both $${V(...a)}$ and $${V(...b)}$.`, model: r`$\vec{a} \times \vec{b} = (2(-2) - 2 \cdot 1)\hat{i} - (1(-2) - 2 \cdot 2)\hat{j} + (1 \cdot 1 - 2 \cdot 2)\hat{k} = -6\hat{i} + 6\hat{j} - 3\hat{k}$.

$|\vec{a} \times \vec{b}| = \sqrt{36 + 36 + 9} = 9$.

Required vectors: $\pm\dfrac69(-6\hat{i} + 6\hat{j} - 3\hat{k}) = \pm(-4\hat{i} + 4\hat{j} - 2\hat{k})$.`, sol: 'Cross product, unit vector, scale by 6.', scheme: [['Cross product', 1], ['Magnitude 9', 1], ['±(−4i + 4j − 2k)', 1]], d: 3, c: 'application', t: [4], time: 150 }), (C) => { C.assert(eqV(n, [-6, 6, -3]) && eqV(R(v), [-4, 4, -2]), 'vectors'); C.model([9, 4, 2]); });
}
{
  const A = [2, 0, 1], B = [3, 1, 0], Cc = [1, 2, 2];
  Q('s305', mk.short({ marks: 3, stem: r`Using vectors, find the area of the triangle with vertices $A${pt(...A)}$, $B${pt(...B)}$ and $C${pt(...Cc)}$.`, model: r`$\overrightarrow{AB} = \hat{i} + \hat{j} - \hat{k}$, $\overrightarrow{AC} = -\hat{i} + 2\hat{j} + \hat{k}$.

$\overrightarrow{AB} \times \overrightarrow{AC} = (1 + 2)\hat{i} - (1 - 1)\hat{j} + (2 + 1)\hat{k} = 3\hat{i} + 3\hat{k}$, magnitude $3\sqrt{2}$.

Area $= \dfrac12 \cdot 3\sqrt{2} = \dfrac{3\sqrt{2}}{2}$ square units.`, sol: 'Half the magnitude of the cross product of two sides from one vertex.', scheme: [['AB and AC', 1], ['Cross product 3i + 3k', 1], ['Area 3√2/2', 1]], d: 2, c: 'understanding', t: [4], time: 150 }), (C) => { C.assert(eqV(cross(sub(B, A), sub(Cc, A)), [3, 0, 3]) && near(triArea(A, B, Cc), 3 * S(2) / 2), 'area'); C.model([3, 2]); });
}
{
  const a = [2, 1, -2], b = [1, 2, 2];
  Q('s306', mk.short({ marks: 3, stem: r`Prove that if $|\vec{a}| = |\vec{b}|$, then $\vec{a} + \vec{b}$ and $\vec{a} - \vec{b}$ are perpendicular. Verify this for $\vec{a} = ${V(...a)}$ and $\vec{b} = ${V(...b)}$.`, model: r`$(\vec{a} + \vec{b}) \cdot (\vec{a} - \vec{b}) = \vec{a} \cdot \vec{a} - \vec{a} \cdot \vec{b} + \vec{b} \cdot \vec{a} - \vec{b} \cdot \vec{b} = |\vec{a}|^2 - |\vec{b}|^2 = 0$, since $\vec{a} \cdot \vec{b} = \vec{b} \cdot \vec{a}$. So the vectors are perpendicular (when both are non-zero).

Check: $|\vec{a}| = |\vec{b}| = 3$; $\vec{a} + \vec{b} = 3\hat{i} + 3\hat{j}$, $\vec{a} - \vec{b} = \hat{i} - \hat{j} - 4\hat{k}$; dot product $3 - 3 + 0 = 0$.`, sol: 'Expand the dot product; then substitute.', scheme: [['Expansion', 1], ['Uses |a| = |b| to get 0', 1], ['Numerical verification', 1]], d: 3, c: 'analysis', t: [3], time: 150 }), (C) => { C.assert(mag(a) === 3 && mag(b) === 3 && eqV(add(a, b), [3, 3, 0]) && eqV(sub(a, b), [1, -1, -4]) && dot(add(a, b), sub(a, b)) === 0, 'verified'); C.model([3, 4, 0]); });
}
{
  const A = [2, -3, 1], B = [8, 3, 4], Cc = [4, -1, 2];
  Q('s307', mk.short({ marks: 3, stem: r`The point $C${pt(...Cc)}$ lies on the segment joining $A${pt(...A)}$ and $B${pt(...B)}$. Using vectors, find the ratio in which $C$ divides $AB$.`, model: r`$\overrightarrow{AC} = 2\hat{i} + 2\hat{j} + \hat{k}$ and $\overrightarrow{CB} = 4\hat{i} + 4\hat{j} + 2\hat{k} = 2\,\overrightarrow{AC}$.

So $\overrightarrow{AC}$ and $\overrightarrow{CB}$ point the same way and $|\overrightarrow{CB}| = 2|\overrightarrow{AC}|$.

Hence $C$ divides $AB$ internally in the ratio $1 : 2$. Check: $\dfrac{1 \cdot \vec{b} + 2\vec{a}}{3} = \dfrac{12\hat{i} - 3\hat{j} + 6\hat{k}}{3} = 4\hat{i} - \hat{j} + 2\hat{k}$.`, sol: 'Compare AC and CB.', scheme: [['AC and CB', 1], ['CB = 2 AC', 1], ['Ratio 1 : 2', 1]], d: 3, c: 'application', t: [2], time: 150 }), (C) => { C.assert(eqV(sub(B, Cc), scl(2, sub(Cc, A))) && eqV(sectionIn(A, B, 1, 2), Cc), '1 : 2'); C.model([1, 2, 12]); });
}
{
  // angles π/4 with x, π/3 with y, acute γ with z, |r| = 8
  const l = Math.cos(P / 4), m = Math.cos(P / 3), n = Math.sqrt(1 - l * l - m * m);
  const rv = scl(8, [l, m, n]);
  Q('s308', mk.short({ marks: 3, stem: r`A vector $\vec{r}$ of magnitude $8$ makes an angle $\dfrac{\pi}{4}$ with the $x$-axis, $\dfrac{\pi}{3}$ with the $y$-axis and an acute angle $\gamma$ with the $z$-axis. Find $\gamma$ and $\vec{r}$.`, model: r`$\cos^2\dfrac{\pi}{4} + \cos^2\dfrac{\pi}{3} + \cos^2\gamma = 1$, so $\dfrac12 + \dfrac14 + \cos^2\gamma = 1$ and $\cos^2\gamma = \dfrac14$.

$\gamma$ is acute, so $\cos\gamma = \dfrac12$ and $\gamma = \dfrac{\pi}{3}$.

$\vec{r} = 8\left(\dfrac{1}{\sqrt{2}}\hat{i} + \dfrac12\hat{j} + \dfrac12\hat{k}\right) = 4\sqrt{2}\,\hat{i} + 4\hat{j} + 4\hat{k}$.`, sol: 'Sum of squares of direction cosines is 1.', scheme: [['Identity used', 1], ['γ = π/3', 1], ['r = 4√2 i + 4j + 4k', 1]], d: 3, c: 'application', t: [1], time: 150 }), (C) => { C.assert(near(n, 0.5) && eqV(R(rv), R([4 * S(2), 4, 4])), 'γ, r'); C.model([4, 2]); });
}

// =============================================================== long answer (5 marks)
{
  const a = [2, 1, -2], b = [3, 0, 4];
  const x = cross(a, b);
  Q('l01', mk.long({ stem: r`Let $\vec{a} = ${V(...a)}$ and $\vec{b} = ${V(...b)}$.
(a) Find $\vec{a} \cdot \vec{b}$ and the cosine of the angle between $\vec{a}$ and $\vec{b}$.
(b) Find the projection of $\vec{a}$ on $\vec{b}$.
(c) Find $\vec{a} \times \vec{b}$ and the area of the parallelogram with adjacent sides $\vec{a}$ and $\vec{b}$.
(d) Verify that $|\vec{a} \times \vec{b}|^2 + (\vec{a} \cdot \vec{b})^2 = |\vec{a}|^2|\vec{b}|^2$.`, model: r`(a) $\vec{a} \cdot \vec{b} = 6 + 0 - 8 = -2$; $|\vec{a}| = 3$, $|\vec{b}| = 5$, so $\cos\theta = -\dfrac{2}{15}$ (an obtuse angle).
(b) Projection of $\vec{a}$ on $\vec{b}$ $= \dfrac{\vec{a} \cdot \vec{b}}{|\vec{b}|} = -\dfrac25$.
(c) $\vec{a} \times \vec{b} = (1 \cdot 4 - 0)\hat{i} - (8 + 6)\hat{j} + (0 - 3)\hat{k} = 4\hat{i} - 14\hat{j} - 3\hat{k}$. Area $= \sqrt{16 + 196 + 9} = \sqrt{221}$ square units.
(d) $221 + 4 = 225$ and $|\vec{a}|^2|\vec{b}|^2 = 9 \times 25 = 225$. Verified.`, sol: 'Work part by part; part (d) is sin² + cos² = 1 in disguise.', scheme: [['a · b = −2 and cos θ = −2/15', 1], ['Projection −2/5', 1], ['a × b = 4i − 14j − 3k', 1], ['Area √221', 1], ['Verification 221 + 4 = 225', 1]], d: 3, c: 'application', t: [3, 4], time: 420 }), (C) => { C.assert(dot(a, b) === -2 && mag(a) === 3 && mag(b) === 5 && eqV(x, [4, -14, -3]) && dot(x, x) === 221 && dot(x, x) + 4 === 225, 'all parts'); C.model([2, 15, 5, 14, 221, 225]); });
}
{
  const p = [2, -1, 3], q = [8, 5, -3];
  const Rr = sectionIn(p, q, 1, 2), Ss = sectionEx(p, q, 1, 2), RS = sub(Rr, Ss);
  Q('l02', mk.long({ stem: r`The points $P$ and $Q$ have position vectors $${V(...p)}$ and $${V(...q)}$.
(a) Find the position vector of $R$, which divides $PQ$ internally in the ratio $1 : 2$.
(b) Find the position vector of $S$, which divides $PQ$ externally in the ratio $1 : 2$.
(c) Find $|\overrightarrow{SR}|$ and the direction cosines of $\overrightarrow{SR}$.
(d) Is $P$ the midpoint of $SR$? Justify your answer.`, model: r`(a) $\vec{r} = \dfrac{1\cdot\vec{q} + 2\vec{p}}{3} = \dfrac{12\hat{i} + 3\hat{j} + 3\hat{k}}{3} = 4\hat{i} + \hat{j} + \hat{k}$.
(b) $\vec{s} = \dfrac{1\cdot\vec{q} - 2\vec{p}}{1 - 2} = 2\vec{p} - \vec{q} = -4\hat{i} - 7\hat{j} + 9\hat{k}$.
(c) $\overrightarrow{SR} = \vec{r} - \vec{s} = 8\hat{i} + 8\hat{j} - 8\hat{k}$, so $|\overrightarrow{SR}| = 8\sqrt{3}$; direction cosines $\dfrac{1}{\sqrt{3}}, \dfrac{1}{\sqrt{3}}, -\dfrac{1}{\sqrt{3}}$.
(d) Midpoint of $SR$ $= \dfrac{\vec{s} + \vec{r}}{2} = -3\hat{j} + 5\hat{k}$, which is not $\vec{p}$. So $P$ is **not** the midpoint (it divides $SR$ in the ratio $3 : 1$).`, sol: 'Internal and external section formulas, then the vector SR.', scheme: [['R = 4i + j + k', 1], ['S = −4i − 7j + 9k', 1], ['|SR| = 8√3', 1], ['Direction cosines', 1], ['Midpoint check', 1]], d: 4, c: 'application', t: [1, 2], time: 420 }), (C) => { C.assert(eqV(R(Rr), [4, 1, 1]) && eqV(R(Ss), [-4, -7, 9]) && eqV(R(RS), [8, 8, -8]) && !eqV(sectionIn(Ss, Rr, 1, 1), p) && eqV(R(sectionIn(Ss, Rr, 1, 1)), [0, -3, 5]) && eqV(R(sectionIn(Ss, Rr, 3, 1)), p), 'R, S, SR, P divides SR in 3 : 1'); C.model([4, 7, 9, 8, 3, 5]); });
}
{
  const A = [1, 1, 2], B = [2, 3, 5], Cc = [1, 5, 5];
  const AB = sub(B, A), AC = sub(Cc, A), x = cross(AB, AC);
  Q('l03', mk.long({ stem: r`$A${pt(...A)}$, $B${pt(...B)}$ and $C${pt(...Cc)}$ are the vertices of a triangle.
(a) Find the area of triangle $ABC$.
(b) Find $\cos A$.
(c) Hence, or otherwise, find the length of the perpendicular from $C$ to the line $AB$.`, model: r`(a) $\overrightarrow{AB} = \hat{i} + 2\hat{j} + 3\hat{k}$, $\overrightarrow{AC} = 4\hat{j} + 3\hat{k}$.
$\overrightarrow{AB} \times \overrightarrow{AC} = (6 - 12)\hat{i} - (3 - 0)\hat{j} + (4 - 0)\hat{k} = -6\hat{i} - 3\hat{j} + 4\hat{k}$, magnitude $\sqrt{36 + 9 + 16} = \sqrt{61}$. Area $= \dfrac{\sqrt{61}}{2}$ square units.
(b) $\overrightarrow{AB} \cdot \overrightarrow{AC} = 0 + 8 + 9 = 17$, $|\overrightarrow{AB}| = \sqrt{14}$, $|\overrightarrow{AC}| = 5$. $\cos A = \dfrac{17}{5\sqrt{14}}$.
(c) Area $= \dfrac12 \times AB \times h$, so $h = \dfrac{2 \times \text{area}}{AB} = \dfrac{\sqrt{61}}{\sqrt{14}} = \sqrt{\dfrac{61}{14}}$ units (about $2.09$).`, sol: 'Cross product for area, dot product for the angle, area = ½ × base × height.', scheme: [['AB, AC', 1], ['Cross product and area √61/2', 1], ['cos A = 17/(5√14)', 1], ['Area = ½ AB h', 1], ['h = √(61/14)', 1]], d: 4, c: 'analysis', t: [3, 4], time: 420 }), (C) => { const h = (2 * triArea(A, B, Cc)) / mag(AB); C.assert(eqV(x, [-6, -3, 4]) && dot(x, x) === 61 && dot(AB, AC) === 17 && near(mag(AC), 5) && near(h, S(61 / 14)) && near(h, 2.09, 0.005), 'area, cos A, h'); C.model([61, 17, 14, 2.09]); });
}
{
  const a = [1, 2, 2], b = [4, 2, -1];
  const b1 = scl(dot(a, b) / dot(a, a), a), b2 = sub(b, b1);
  Q('l04', mk.long({ stem: r`Let $\vec{a} = ${V(...a)}$ and $\vec{b} = ${V(...b)}$.
(a) Find the projection of $\vec{b}$ on $\vec{a}$.
(b) Express $\vec{b}$ as $\vec{b_1} + \vec{b_2}$, where $\vec{b_1}$ is parallel to $\vec{a}$ and $\vec{b_2}$ is perpendicular to $\vec{a}$.
(c) Verify that $\vec{b_2} \cdot \vec{a} = 0$ and that $|\vec{b_1}|^2 + |\vec{b_2}|^2 = |\vec{b}|^2$.`, model: r`(a) $\vec{a} \cdot \vec{b} = 4 + 4 - 2 = 6$ and $|\vec{a}| = 3$, so the projection of $\vec{b}$ on $\vec{a}$ is $\dfrac63 = 2$.
(b) $\vec{b_1}$ is the projection times $\hat{a}$: $\vec{b_1} = 2 \cdot \dfrac{\vec{a}}{3} = \dfrac23\hat{i} + \dfrac43\hat{j} + \dfrac43\hat{k}$.
$\vec{b_2} = \vec{b} - \vec{b_1} = \dfrac{10}{3}\hat{i} + \dfrac{2}{3}\hat{j} - \dfrac{7}{3}\hat{k}$.
(c) $\vec{b_2} \cdot \vec{a} = \dfrac{10}{3} + \dfrac43 - \dfrac{14}{3} = 0$ ✓. $|\vec{b_1}|^2 = 4$, $|\vec{b_2}|^2 = \dfrac{100 + 4 + 49}{9} = 17$, and $4 + 17 = 21 = |\vec{b}|^2$ ✓.`, sol: 'Resolve b along a and perpendicular to a.', scheme: [['Projection 2', 1], ['b1 = (2/3)(i + 2j + 2k)', 1], ['b2 = b − b1', 1], ['b2 · a = 0', 1], ['Pythagoras check 4 + 17 = 21', 1]], d: 4, c: 'analysis', t: [3], time: 420 }), (C) => { C.assert(near(proj(b, a), 2) && eqV(R(b1), R([2 / 3, 4 / 3, 4 / 3])) && eqV(R(b2), R([10 / 3, 2 / 3, -7 / 3])) && near(dot(b2, a), 0) && near(dot(b1, b1), 4) && near(dot(b2, b2), 17) && dot(b, b) === 21, 'decomposition'); C.model([2, 10, 3, 7, 17, 21]); });
}
{
  const A = [1, 2, 3], B = [5, 0, 1], Cc = [3, 4, -1];
  const D = sectionIn(A, B, 1, 1), E = sectionIn(A, Cc, 1, 1);
  Q('l05', mk.long({ stem: r`(a) Using vectors, prove that the segment joining the midpoints of two sides of a triangle is parallel to the third side and equal to half of it.
(b) For the triangle with vertices $A${pt(...A)}$, $B${pt(...B)}$, $C${pt(...Cc)}$, let $D$ and $E$ be the midpoints of $AB$ and $AC$. Find $\overrightarrow{DE}$ and $\overrightarrow{BC}$ and check the result of part (a).`, model: r`(a) Let the vertices have position vectors $\vec{a}, \vec{b}, \vec{c}$. Then $\vec{d} = \dfrac{\vec{a} + \vec{b}}{2}$ and $\vec{e} = \dfrac{\vec{a} + \vec{c}}{2}$.
$\overrightarrow{DE} = \vec{e} - \vec{d} = \dfrac{\vec{c} - \vec{b}}{2} = \dfrac12\overrightarrow{BC}$.
So $\overrightarrow{DE}$ is a positive multiple of $\overrightarrow{BC}$: $DE \parallel BC$ and $DE = \dfrac12 BC$.
(b) $D = (3, 1, 2)$, $E = (2, 3, 1)$. $\overrightarrow{DE} = -\hat{i} + 2\hat{j} - \hat{k}$ and $\overrightarrow{BC} = -2\hat{i} + 4\hat{j} - 2\hat{k} = 2\,\overrightarrow{DE}$.
$|\overrightarrow{DE}| = \sqrt{6}$ and $|\overrightarrow{BC}| = 2\sqrt{6}$, as the result predicts.`, sol: 'Midpoint formula with position vectors.', scheme: [['d and e as averages', 1], ['DE = ½ BC', 1], ['Conclusion: parallel and half', 1], ['D, E, DE and BC computed', 1], ['Check BC = 2 DE', 1]], d: 3, c: 'analysis', t: [2], time: 420 }), (C) => { C.assert(eqV(D, [3, 1, 2]) && eqV(E, [2, 3, 1]) && eqV(sub(Cc, B), scl(2, sub(E, D))) && near(mag(sub(E, D)), S(6)), 'example'); const rnd = [[0.3, -2, 5], [4, 1.5, -1], [-3, 2, 2.2]]; C.assert(eqV(sub(sectionIn(rnd[0], rnd[2], 1, 1), sectionIn(rnd[0], rnd[1], 1, 1)), scl(0.5, sub(rnd[2], rnd[1]))), 'general triangle'); C.model([3, 2, 6]); });
}
{
  const a = [1, -1, 1], b = [2, 1, -3], c = [1, 1, 1];
  const n = cross(a, b), lam = 20 / dot(c, n), d = scl(lam, n);
  Q('l06', mk.long({ stem: r`Let $\vec{a} = ${V(...a)}$, $\vec{b} = ${V(...b)}$ and $\vec{c} = ${V(...c)}$.
(a) Find $\vec{a} \times \vec{b}$.
(b) Find the vector $\vec{d}$ that is perpendicular to both $\vec{a}$ and $\vec{b}$ and satisfies $\vec{c} \cdot \vec{d} = 20$.
(c) Find the area of the triangle that has $\vec{a}$ and $\vec{b}$ as two of its sides.`, model: r`(a) $\vec{a} \times \vec{b} = ((-1)(-3) - 1 \cdot 1)\hat{i} - (1(-3) - 1 \cdot 2)\hat{j} + (1 \cdot 1 - (-1)2)\hat{k} = 2\hat{i} + 5\hat{j} + 3\hat{k}$.
(b) Any vector perpendicular to both is $\vec{d} = \lambda(2\hat{i} + 5\hat{j} + 3\hat{k})$. Then $\vec{c} \cdot \vec{d} = \lambda(2 + 5 + 3) = 10\lambda = 20$, so $\lambda = 2$ and $\vec{d} = 4\hat{i} + 10\hat{j} + 6\hat{k}$.
Check: $\vec{d} \cdot \vec{a} = 4 - 10 + 6 = 0$ and $\vec{d} \cdot \vec{b} = 8 + 10 - 18 = 0$.
(c) Area $= \dfrac12|\vec{a} \times \vec{b}| = \dfrac12\sqrt{4 + 25 + 9} = \dfrac{\sqrt{38}}{2}$ square units.`, sol: 'A vector perpendicular to both is a multiple of the cross product.', scheme: [['a × b', 1], ['d = λ(a × b)', 1], ['λ = 2, d = 4i + 10j + 6k', 1], ['Perpendicularity check', 1], ['Area √38/2', 1]], d: 4, c: 'application', t: [3, 4], time: 420 }), (C) => { C.assert(eqV(n, [2, 5, 3]) && lam === 2 && eqV(d, [4, 10, 6]) && dot(d, a) === 0 && dot(d, b) === 0 && dot(n, n) === 38, 'd and area'); C.model([2, 5, 3, 4, 10, 6, 38]); });
}

// =============================================================== case-based (1 + 1 + 2, part (c) either/or)
{
  const OA = [4, 3, 0], AB = [5, -12, 0], OB = add(OA, AB);
  caseQ('c01', {
    passage: r`A medicine-delivery drone in Hyderabad takes off from a hospital $O$. Taking east as $\hat{i}$ and north as $\hat{j}$ (distances in km), it first flies to a pharmacy $A$ with displacement $\overrightarrow{OA} = 4\hat{i} + 3\hat{j}$, then to a clinic $B$ with displacement $\overrightarrow{AB} = 5\hat{i} - 12\hat{j}$.`,
    d: 3, c: 'application',
    model: r`(a) Option (a): $9\hat{i} - 9\hat{j}$. (b) $5$ km. (c) (i) $|\overrightarrow{OB}| = 9\sqrt{2}$ km; unit vector $\dfrac{1}{\sqrt{2}}(\hat{i} - \hat{j})$. Or (ii) $\cos\theta = -\dfrac{16}{65}$.`,
    sol: r`(a) Triangle law. (b) $\sqrt{16 + 9}$. (c) (i) $\sqrt{81 + 81} = 9\sqrt{2}$. (ii) $\dfrac{20 - 36}{5 \times 13}$.`,
    children: [
      child('a', mk.mcq({ stem: r`The displacement $\overrightarrow{OB}$ of the clinic from the hospital is`, opts: [r`$9\hat{i} - 9\hat{j}$`, r`$-\hat{i} + 15\hat{j}$`, r`$9\hat{i} + 15\hat{j}$`, r`$\hat{i} - 15\hat{j}$`], key: 'a', sol: r`$\overrightarrow{OB} = \overrightarrow{OA} + \overrightarrow{AB} = (4 + 5)\hat{i} + (3 - 12)\hat{j}$.`, d: 1, c: 'understanding', t: [2], time: 45 })),
      child('b', mk.num({ stem: 'How far (in km) is the pharmacy from the hospital?', value: 5, unit: 'km', sol: r`$|\overrightarrow{OA}| = \sqrt{16 + 9} = 5$.`, scheme: [['5', 1]], d: 1, c: 'understanding', t: [1], time: 45 })),
      child('c', mk.short({ marks: 2, stem: '**(i)** Find the straight-line distance from the hospital to the clinic and the unit vector in the direction of the clinic from the hospital.', model: r`$\overrightarrow{OB} = 9\hat{i} - 9\hat{j}$, so $|\overrightarrow{OB}| = \sqrt{81 + 81} = 9\sqrt{2}$ km (about $12.7$ km). Unit vector: $\dfrac{9\hat{i} - 9\hat{j}}{9\sqrt{2}} = \dfrac{1}{\sqrt{2}}(\hat{i} - \hat{j})$, i.e. towards the south-east.`, sol: 'Magnitude, then divide.', scheme: [['9√2 km', 1], ['Unit vector', 1]], d: 2, c: 'application', t: [1, 2], time: 120 }), [
        mk.short({ marks: 2, stem: '**(ii)** Find the cosine of the angle between the two legs of the flight, OA and AB.', model: r`$\overrightarrow{OA} \cdot \overrightarrow{AB} = 20 - 36 = -16$; $|\overrightarrow{OA}| = 5$, $|\overrightarrow{AB}| = \sqrt{25 + 144} = 13$. So $\cos\theta = -\dfrac{16}{65}$: the drone turns through an angle greater than a right angle.`, sol: 'Dot product of the two legs.', scheme: [['Dot product and magnitudes', 1], ['−16/65', 1]], d: 3, c: 'application', t: [3], time: 120 }),
      ]),
    ],
  }, (C) => { C.child('a').which([[9, -9, 0], [-1, 15, 0], [9, 15, 0], [1, -15, 0]], OB); C.child('b').val(mag(OA)); C.child('c').assert(near(mag(OB), 9 * S(2)) && eqV(R(unit(OB)), R([1 / S(2), -1 / S(2), 0])), '9√2, unit'); C.child('c').model([9, 2]); C.child('cii').assert(dot(OA, AB) === -16 && mag(AB) === 13, 'cos'); C.child('cii').model([16, 65]); });
}
{
  const F1 = [3, 4, 0], F2 = [-1, 2, 0], F = [4, 3, 0], d = [6, 2, 0];
  caseQ('c02', {
    passage: r`A ferry crossing the Hooghly at Kolkata is pushed by its engine with a force $\vec{F_1} = 3\hat{i} + 4\hat{j}$ and by the river current with a force $\vec{F_2} = -\hat{i} + 2\hat{j}$ (in kilonewtons; $\hat{i}$ points downstream, $\hat{j}$ across the river). The work done by a constant force $\vec{F}$ through a displacement $\vec{d}$ is $\vec{F} \cdot \vec{d}$.`,
    d: 3, c: 'application',
    model: r`(a) Option (a): $2\hat{i} + 6\hat{j}$. (b) $30$. (c) (i) $\cos\theta = \dfrac{1}{\sqrt{5}}$. Or (ii) $\sqrt{5}$.`,
    sol: r`(a) Add the forces. (b) $24 + 6$. (c) (i) $\dfrac{-3 + 8}{5\sqrt{5}}$. (ii) $\dfrac{5}{\sqrt{5}}$.`,
    children: [
      child('a', mk.mcq({ stem: 'The resultant force on the ferry is', opts: [r`$2\hat{i} + 6\hat{j}$`, r`$4\hat{i} + 2\hat{j}$`, r`$-3\hat{i} + 8\hat{j}$`, r`$2\hat{i} + 2\hat{j}$`], key: 'a', sol: r`$\vec{F_1} + \vec{F_2} = (3 - 1)\hat{i} + (4 + 2)\hat{j}$ (parallelogram law).`, d: 1, c: 'understanding', t: [2], time: 45 })),
      child('b', mk.num({ stem: r`A tug pulls a barge with force $4\hat{i} + 3\hat{j}$ kN through a displacement $6\hat{i} + 2\hat{j}$ metres. Find the work done in kilojoules.`, value: 30, unit: 'kJ', sol: r`$(4\hat{i} + 3\hat{j}) \cdot (6\hat{i} + 2\hat{j}) = 24 + 6 = 30$.`, scheme: [['30', 1]], d: 2, c: 'application', t: [3], time: 60 })),
      child('c', mk.short({ marks: 2, stem: '**(i)** Find the cosine of the angle between the engine force and the current force.', model: r`$\vec{F_1} \cdot \vec{F_2} = -3 + 8 = 5$, $|\vec{F_1}| = 5$, $|\vec{F_2}| = \sqrt{5}$. So $\cos\theta = \dfrac{5}{5\sqrt{5}} = \dfrac{1}{\sqrt{5}}$.`, sol: 'Dot product over the product of magnitudes.', scheme: [['Dot product 5 and magnitudes', 1], ['1/√5', 1]], d: 2, c: 'understanding', t: [3], time: 120 }), [
        mk.short({ marks: 2, stem: '**(ii)** Find the component (projection) of the engine force along the direction of the current force.', model: r`Projection of $\vec{F_1}$ on $\vec{F_2}$ $= \dfrac{\vec{F_1} \cdot \vec{F_2}}{|\vec{F_2}|} = \dfrac{5}{\sqrt{5}} = \sqrt{5}$ kN (about $2.24$ kN).`, sol: 'Scalar projection.', scheme: [['Formula', 1], ['√5 kN', 1]], d: 3, c: 'application', t: [3], time: 120 }),
      ]),
    ],
  }, (C) => { C.child('a').which([[2, 6, 0], [4, 2, 0], [-3, 8, 0], [2, 2, 0]], add(F1, F2)); C.child('b').val(dot(F, d)); C.child('c').assert(near(Math.cos(angle(F1, F2)), 1 / S(5)), 'cos'); C.child('c').model([5]); C.child('cii').assert(near(proj(F1, F2), S(5)) && near(proj(F1, F2), 2.24, 0.005), '√5'); C.child('cii').model([5, 2.24]); });
}
{
  const Pp = [0, 0, 0], Qp = [4, 0, 0], Rp = [2, 1, 3];
  const PQ = sub(Qp, Pp), PR = sub(Rp, Pp);
  caseQ('c03', {
    passage: r`A trekking group sets up a tent near Manali. One triangular end-flap has corners $P(0, 0, 0)$ and $Q(4, 0, 0)$ on the ground and the top $R(2, 1, 3)$ at the ridge, with coordinates in metres.`,
    d: 3, c: 'application',
    model: r`(a) Option (a): $2\hat{i} + \hat{j} + 3\hat{k}$. (b) $3.74$ m. (c) (i) $2\sqrt{10}$ m$^2$. Or (ii) $\cos P = \dfrac{2}{\sqrt{14}}$.`,
    sol: r`(a) $\vec{r} - \vec{p}$. (b) $\sqrt{14}$. (c) (i) $\dfrac12|\overrightarrow{PQ} \times \overrightarrow{PR}|$. (ii) $\dfrac{8}{4\sqrt{14}}$.`,
    children: [
      child('a', mk.mcq({ stem: r`The vector $\overrightarrow{PR}$ is`, opts: [r`$2\hat{i} + \hat{j} + 3\hat{k}$`, r`$-2\hat{i} + \hat{j} + 3\hat{k}$`, r`$6\hat{i} + \hat{j} + 3\hat{k}$`, r`$2\hat{i} - \hat{j} - 3\hat{k}$`], key: 'a', sol: r`$P$ is the origin, so $\overrightarrow{PR}$ is the position vector of $R$.`, d: 1, c: 'understanding', t: [1], time: 45 })),
      child('b', mk.num({ stem: 'Find the length PR of the sloping edge in metres, correct to two decimal places.', value: 3.74, tol: 0.01, unit: 'm', sol: r`$|\overrightarrow{PR}| = \sqrt{4 + 1 + 9} = \sqrt{14} \approx 3.74$.`, scheme: [['3.74', 1]], d: 2, c: 'understanding', t: [1], time: 60 })),
      child('c', mk.short({ marks: 2, stem: '**(i)** Find the area of the canvas needed for this flap.', model: r`$\overrightarrow{PQ} \times \overrightarrow{PR} = 4\hat{i} \times (2\hat{i} + \hat{j} + 3\hat{k}) = 4\hat{k} - 12\hat{j}$, magnitude $\sqrt{144 + 16} = \sqrt{160} = 4\sqrt{10}$. Area $= \dfrac12 \cdot 4\sqrt{10} = 2\sqrt{10} \approx 6.32$ m$^2$.`, sol: 'Half the magnitude of the cross product.', scheme: [['Cross product', 1], ['2√10 m²', 1]], d: 3, c: 'application', t: [4], time: 150 }), [
        mk.short({ marks: 2, stem: '**(ii)** Find the cosine of the angle at P between the ground edge PQ and the sloping edge PR.', model: r`$\overrightarrow{PQ} \cdot \overrightarrow{PR} = 8$; $|\overrightarrow{PQ}| = 4$, $|\overrightarrow{PR}| = \sqrt{14}$. $\cos P = \dfrac{8}{4\sqrt{14}} = \dfrac{2}{\sqrt{14}}$.`, sol: 'Dot product at the vertex.', scheme: [['Dot product 8', 1], ['2/√14', 1]], d: 2, c: 'application', t: [3], time: 120 }),
      ]),
    ],
  }, (C) => { C.child('a').which([[2, 1, 3], [-2, 1, 3], [6, 1, 3], [2, -1, -3]], PR); C.child('b').val(mag(PR), 0.01); C.child('c').assert(eqV(cross(PQ, PR), [0, -12, 4]) && near(triArea(Pp, Qp, Rp), 2 * S(10)), 'area'); C.child('c').model([10, 6.32]); C.child('cii').assert(near(Math.cos(angle(PQ, PR)), 2 / S(14)), 'cos P'); C.child('cii').model([8, 14]); });
}
{
  const OF = [30, 40, 0], OK = [0, -20, 0], FK = sub(OK, OF);
  caseQ('c04', {
    passage: r`In a match at Eden Gardens, take the striker's crease as the origin $O$, with $\hat{i}$ towards the off side and $\hat{j}$ towards the bowler (metres). A fielder stops the ball at $F$, where $\overrightarrow{OF} = 30\hat{i} + 40\hat{j}$, and throws it to the wicket-keeper at $K$, where $\overrightarrow{OK} = -20\hat{j}$.`,
    d: 3, c: 'application',
    model: r`(a) Option (a): $-30\hat{i} - 60\hat{j}$. (b) $50$ m. (c) (i) $\cos\angle FOK = -\dfrac45$. Or (ii) $-\dfrac{1}{\sqrt{5}}(\hat{i} + 2\hat{j})$, throw $30\sqrt{5}$ m.`,
    sol: r`(a) $\vec{k} - \vec{f}$. (b) $\sqrt{900 + 1600}$. (c) (i) $\dfrac{-800}{50 \times 20}$. (ii) Divide by $30\sqrt{5}$.`,
    children: [
      child('a', mk.mcq({ stem: r`The vector $\overrightarrow{FK}$ along which the ball is thrown is`, opts: [r`$-30\hat{i} - 60\hat{j}$`, r`$30\hat{i} + 60\hat{j}$`, r`$30\hat{i} + 20\hat{j}$`, r`$-30\hat{i} - 20\hat{j}$`], key: 'a', sol: r`$\overrightarrow{FK} = \overrightarrow{OK} - \overrightarrow{OF} = -30\hat{i} + (-20 - 40)\hat{j}$.`, d: 1, c: 'understanding', t: [2], time: 45 })),
      child('b', mk.num({ stem: 'How far (in metres) from the striker was the ball stopped?', value: 50, unit: 'm', sol: r`$|\overrightarrow{OF}| = \sqrt{900 + 1600} = 50$.`, scheme: [['50', 1]], d: 1, c: 'understanding', t: [1], time: 45 })),
      child('c', mk.short({ marks: 2, stem: '**(i)** Find the cosine of the angle FOK at the striker between the directions to the fielder and to the keeper.', model: r`$\overrightarrow{OF} \cdot \overrightarrow{OK} = 0 - 800 = -800$; $|\overrightarrow{OF}| = 50$, $|\overrightarrow{OK}| = 20$. $\cos\angle FOK = \dfrac{-800}{1000} = -\dfrac45$ (an obtuse angle).`, sol: 'Dot product of OF and OK.', scheme: [['Dot product −800', 1], ['−4/5', 1]], d: 2, c: 'application', t: [3], time: 120 }), [
        mk.short({ marks: 2, stem: '**(ii)** Find the length of the throw and the unit vector in the direction of the throw.', model: r`$|\overrightarrow{FK}| = \sqrt{900 + 3600} = \sqrt{4500} = 30\sqrt{5}$ m (about $67.1$ m). Unit vector $= \dfrac{-30\hat{i} - 60\hat{j}}{30\sqrt{5}} = -\dfrac{1}{\sqrt{5}}(\hat{i} + 2\hat{j})$.`, sol: 'Magnitude, then divide.', scheme: [['30√5 m', 1], ['Unit vector', 1]], d: 2, c: 'application', t: [1, 2], time: 120 }),
      ]),
    ],
  }, (C) => { C.child('a').which([[-30, -60, 0], [30, 60, 0], [30, 20, 0], [-30, -20, 0]], FK); C.child('b').val(mag(OF)); C.child('c').assert(near(Math.cos(angle(OF, OK)), -0.8), 'cos'); C.child('c').model([800, 1000]); C.child('cii').assert(near(mag(FK), 30 * S(5)) && eqV(R(unit(FK)), R([-1 / S(5), -2 / S(5), 0])) && near(mag(FK), 67.1, 0.05), 'throw'); C.child('cii').model([30, 5, 67.1]); });
}
{
  const A = [1, 2, 0], B = [7, 5, 6];
  const T = sectionIn(A, B, 1, 2), Sx = sectionEx(A, B, 2, 1), AB = sub(B, A);
  caseQ('c05', {
    passage: r`A ropeway is being planned in Darjeeling. Its lower station is at $A(1, 2, 0)$ and its upper station at $B(7, 5, 6)$, with coordinates in hundreds of metres. A support tower $T$ stands on the cable line, dividing $AB$ internally in the ratio $1 : 2$.`,
    d: 3, c: 'application',
    model: r`(a) Option (a): $3\hat{i} + 3\hat{j} + 2\hat{k}$. (b) $9$. (c) (i) $\dfrac23, \dfrac13, \dfrac23$. Or (ii) $13\hat{i} + 8\hat{j} + 12\hat{k}$.`,
    sol: r`(a) $\dfrac{\vec{b} + 2\vec{a}}{3}$. (b) $\sqrt{36 + 9 + 36}$. (c) (i) Components of $\overrightarrow{AB}$ over $9$. (ii) $\dfrac{2\vec{b} - \vec{a}}{2 - 1}$.`,
    children: [
      child('a', mk.mcq({ stem: 'The position vector of the tower T is', opts: [r`$3\hat{i} + 3\hat{j} + 2\hat{k}$`, r`$5\hat{i} + 4\hat{j} + 4\hat{k}$`, r`$4\hat{i} + \dfrac72\hat{j} + 3\hat{k}$`, r`$8\hat{i} + 7\hat{j} + 6\hat{k}$`], key: 'a', sol: r`$\vec{t} = \dfrac{1\cdot\vec{b} + 2\vec{a}}{1 + 2} = \dfrac{9\hat{i} + 9\hat{j} + 6\hat{k}}{3}$. Pairing the ratio the wrong way gives the point that divides in $2 : 1$.`, d: 2, c: 'application', t: [2], time: 60 })),
      child('b', mk.num({ stem: 'Find the length of the cable AB (in hundreds of metres).', value: 9, sol: r`$\overrightarrow{AB} = 6\hat{i} + 3\hat{j} + 6\hat{k}$, $|\overrightarrow{AB}| = \sqrt{81} = 9$.`, scheme: [['9', 1]], d: 1, c: 'understanding', t: [1], time: 45 })),
      child('c', mk.short({ marks: 2, stem: '**(i)** Find the direction cosines of the cable from A to B.', model: r`$\overrightarrow{AB} = 6\hat{i} + 3\hat{j} + 6\hat{k}$ with magnitude $9$. Direction cosines: $\dfrac69, \dfrac39, \dfrac69$, i.e. $\dfrac23, \dfrac13, \dfrac23$.`, sol: 'Divide the components by the length.', scheme: [['AB and its length', 1], ['2/3, 1/3, 2/3', 1]], d: 2, c: 'understanding', t: [1], time: 90 }), [
        mk.short({ marks: 2, stem: '**(ii)** A viewing deck S is planned on the line AB beyond B so that AS : BS = 2 : 1. Find the position vector of S.', model: r`$S$ divides $AB$ externally in the ratio $2 : 1$: $\vec{s} = \dfrac{2\vec{b} - \vec{a}}{2 - 1} = (14 - 1)\hat{i} + (10 - 2)\hat{j} + (12 - 0)\hat{k} = 13\hat{i} + 8\hat{j} + 12\hat{k}$.`, sol: 'External section formula.', scheme: [['Formula', 1], ['13i + 8j + 12k', 1]], d: 3, c: 'application', t: [2], time: 120 }),
      ]),
    ],
  }, (C) => { C.child('a').which([[3, 3, 2], [5, 4, 4], [4, 3.5, 3], [8, 7, 6]], T); C.child('b').val(mag(AB)); C.child('c').assert(eqV(R(unit(AB)), R([2 / 3, 1 / 3, 2 / 3])), 'dc'); C.child('c').model([6, 9, 3]); C.child('cii').assert(eqV(Sx, [13, 8, 12]) && near(mag(sub(Sx, A)), 2 * mag(sub(Sx, B))), 'AS = 2BS'); C.child('cii').model([13, 8, 12]); });
}
