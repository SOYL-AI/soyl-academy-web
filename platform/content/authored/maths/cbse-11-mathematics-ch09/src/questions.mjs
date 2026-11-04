// CBSE 11 Mathematics ch09 Straight Lines — objective items (mcq, assertion-reason, true-false, fill-blank, numerical) with
// independent re-solve checks. Every slope, angle, equation, intercept and distance is computed with exact fractions (ln.mjs);
// distractors are the results of plausible wrong methods. Lines are compared as normalised triples (a, b, c).
import { Q, mk } from './lib.mjs';
import { r, P, K, T, N$, deg, rad } from './qh.mjs';
import { F, Fr, must, slope, through, join, byIntercepts, meet, isParallel, isPerp, line, on, xInt, yInt, xAt, yAt, slopeOf, inclination, inclOfSlope, angleBetween, dist, distParallel, normalForm, tx, eqTex, dx, surdOver, range } from './ln.mjs';

export { r };
const sl$ = (v) => `$${tx(v)}$`;

// =============================================================== MCQ
{
  const A = P(-5, 4), B = P(3, -8), m = slope(A, B);
  const inv = F(1).div(m);
  Q('m01', mk.mcq({ stem: r`The segment joining $A(-5, 4)$ and $B(3, -8)$ lies on a line whose slope is`, opts: [sl$(m), sl$(m.neg()), sl$(inv), sl$(inv.neg())], key: 'a', sol: r`$m = \dfrac{-8 - 4}{3 - (-5)} = \dfrac{-12}{8} = ${tx(m)}$. Reversing the sign gives $${tx(m.neg())}$, and the run-over-rise values are $${tx(inv)}$ and $${tx(inv.neg())}$.`, d: 1, c: 'recall', t: [1], time: 45 }), (Cx) => { Cx.assert(m.eq(F(-3, 2)) && slope(B, A).eq(m), 'slope -3/2 in both directions'); Cx.which([-1.5, 1.5, -2 / 3, 2 / 3], m.num()); });
}
{
  const m = Math.tan(rad(120));
  Q('m02', mk.mcq({ stem: r`A straight line is inclined at $120^\circ$ to the positive direction of the $x$-axis. Its slope is`, opts: [r`$-\sqrt{3}$`, r`$\sqrt{3}$`, r`$-\dfrac{1}{\sqrt{3}}$`, r`$\dfrac{1}{\sqrt{3}}$`], key: 'a', sol: r`$m = \tan 120^\circ = -\tan 60^\circ = -\sqrt{3}$. The value $\sqrt{3}$ loses the sign, while $\pm\dfrac{1}{\sqrt{3}}$ belong to $30^\circ$ and $150^\circ$.`, d: 1, c: 'recall', t: [1], time: 45 }), (Cx) => { Cx.assert(Math.abs(m + Math.sqrt(3)) < 1e-12 && Math.abs(Math.tan(rad(150)) + 1 / Math.sqrt(3)) < 1e-12, 'tan 120 = -sqrt 3'); Cx.which([-Math.sqrt(3), Math.sqrt(3), -1 / Math.sqrt(3), 1 / Math.sqrt(3)], m); });
}
{
  const L = line(9, 4, -11), m = slopeOf(L), c = yInt(L);
  Q('m03', mk.mcq({ stem: r`The straight line $9x + 4y - 11 = 0$ has slope`, opts: [sl$(m), sl$(m.neg()), sl$(F(1).div(m)), sl$(c)], key: 'a', sol: r`Solving for $y$: $4y = -9x + 11$, so $y = -\dfrac{9}{4}x + \dfrac{11}{4}$ and the slope is $${tx(m)}$. The value $\dfrac{9}{4}$ drops the sign, $-\dfrac{4}{9}$ is inverted, and $\dfrac{11}{4}$ is the $y$-intercept.`, d: 1, c: 'recall', t: [1], time: 45 }), (Cx) => { Cx.assert(m.eq(F(-9, 4)) && c.eq(F(11, 4)), 'slope -9/4, intercept 11/4'); Cx.which([-9 / 4, 9 / 4, -4 / 9, 11 / 4], m.num()); });
}
{
  const L2 = line(8, 3, 2);
  const ok = (k) => isParallel(line(k, 6, -5), L2);
  Q('m04', mk.mcq({ stem: r`The lines $kx + 6y - 5 = 0$ and $8x + 3y + 2 = 0$ are parallel for $k$ equal to`, opts: ['$16$', r`$-\dfrac{9}{4}$`, '$4$', '$48$'], key: 'a', sol: r`Parallel lines have equal slopes: $-\dfrac{k}{6} = -\dfrac{8}{3}$, so $k = 16$. The value $-\dfrac{9}{4}$ comes from the perpendicular condition $8k + 18 = 0$, $4$ from cross-multiplying the wrong way ($6k = 24$), and $48$ from multiplying $6 \times 8$.`, d: 2, c: 'application', t: [1], time: 75 }), (Cx) => { Cx.assert(ok(16) && !ok(4) && !ok(48) && !ok(F(-9, 4)) && isPerp(line(F(-9, 4), 6, -5), L2), 'only k = 16 is parallel; k = -9/4 is perpendicular'); Cx.which([16, -9 / 4, 4, 48].map((k) => (ok(k) ? 1 : 0)), 1) ; });
}
{
  const L2 = line(10, -12, 7);
  const ok = (k) => isPerp(line(6, k, -1), L2);
  Q('m05', mk.mcq({ stem: r`The lines $6x + ky - 1 = 0$ and $10x - 12y + 7 = 0$ meet at right angles when $k$ is`, opts: ['$5$', '$-5$', r`$-\dfrac{36}{5}$`, r`$\dfrac{36}{5}$`], key: 'a', sol: r`The slopes are $-\dfrac{6}{k}$ and $\dfrac{10}{12} = \dfrac{5}{6}$, and their product must be $-1$: $-\dfrac{6}{k} \times \dfrac{5}{6} = -1$ gives $k = 5$. The values $\mp\dfrac{36}{5}$ come from the parallel condition.`, d: 2, c: 'application', t: [1], time: 75 }), (Cx) => { Cx.assert(ok(5) && !ok(-5) && !ok(F(36, 5)) && isParallel(line(6, F(-36, 5), -1), L2), 'k = 5 perpendicular; k = -36/5 parallel'); Cx.which([5, -5, -36 / 5, 36 / 5].map((k) => (ok(k) ? 1 : 0)), 1); });
}
{
  const L1 = line(3, -1, 4), L2 = line(2, 1, -9), ab = angleBetween(L1, L2);
  Q('m06', mk.mcq({ stem: r`The acute angle between the lines $3x - y + 4 = 0$ and $2x + y - 9 = 0$ is`, opts: [r`$45^\circ$`, r`$135^\circ$`, r`$90^\circ$`, r`$60^\circ$`], key: 'a', sol: r`The slopes are $m_1 = 3$ and $m_2 = -2$, so $\tan\theta = \left|\dfrac{3 - (-2)}{1 + 3(-2)}\right| = \left|\dfrac{5}{-5}\right| = 1$ and $\theta = 45^\circ$. The angle $135^\circ$ is the obtuse angle between the same two lines.`, d: 2, c: 'understanding', t: [1], time: 75 }), (Cx) => { Cx.assert(ab.tan.eq(1) && ab.acute === 45 && ab.obtuse === 135, 'tan 1, 45 and 135 degrees'); Cx.which([45, 135, 90, 60], ab.acute); });
}
{
  const Pp = P(-3, 8), Qq = P(1, 2), Lq = join(Pp, Qq), kx = xAt(Lq, -4);
  const colin = (k) => on(Lq, P(k, -4));
  Q('m07', mk.mcq({ stem: r`The points $P(-3, 8)$, $Q(1, 2)$ and $R(k, -4)$ lie on one straight line. Then $k$ equals`, opts: ['$5$', '$-3$', '$10$', '$-5$'], key: 'a', sol: r`Slope of $PQ = \dfrac{2 - 8}{1 + 3} = -\dfrac{3}{2}$, and slope of $QR = \dfrac{-4 - 2}{k - 1}$. Equating: $\dfrac{-6}{k - 1} = -\dfrac{3}{2}$ gives $k - 1 = 4$, so $k = 5$. A sign slip gives $-3$, and inverting the slope gives $k - 1 = 9$, so $k = 10$.`, d: 2, c: 'application', t: [1], time: 90 }), (Cx) => { Cx.assert(kx.eq(5) && colin(5) && !colin(-3) && !colin(10) && !colin(-5) && slope(Pp, Qq).eq(F(-3, 2)), 'k = 5'); Cx.which([5, -3, 10, -5], kx.num()); });
}
{
  const L = line(3, -2, 7), m = slopeOf(L), kk = F(2).add(F(6).div(m)); // 6 / (k - 2) = 3/2 -> k = 6
  const ok = (k) => { const l = join(P(2, -1), P(k, 5)); return isParallel(l, L) || false; };
  Q('m08', mk.mcq({ stem: r`The line through $(2, -1)$ and $(k, 5)$ is parallel to the line $3x - 2y + 7 = 0$. The value of $k$ is`, opts: ['$6$', '$-7$', '$11$', '$4$'], key: 'a', sol: r`The given line has slope $\dfrac{3}{2}$, so $\dfrac{5 - (-1)}{k - 2} = \dfrac{3}{2}$, i.e. $k - 2 = 4$ and $k = 6$. The value $-7$ comes from using the perpendicular slope $-\dfrac{2}{3}$, $11$ from inverting the slope, and $4$ from taking the slope as $3$.`, d: 3, c: 'application', t: [1], time: 90 }), (Cx) => { Cx.assert(m.eq(F(3, 2)) && kk.eq(6) && ok(6) && !ok(11) && !ok(4) && isPerp(join(P(2, -1), P(-7, 5)), L), 'k = 6; k = -7 perpendicular'); Cx.which([6, -7, 11, 4].map((k) => (ok(k) ? 1 : 0)), 1); });
}
{
  const Pt = P(6, -1), m = F(-2, 3), L = through(Pt, m);
  const w1 = through(Pt, F(2, 3)), w2 = through(P(-6, 1), m), w3 = through(Pt, F(-3, 2));
  Q('m09', mk.mcq({ stem: r`The line that passes through $(6, -1)$ with slope $-\dfrac{2}{3}$ has the equation`, opts: [T(L), T(w1), T(w2), T(w3)], key: 'a', sol: r`Point-slope form: $y + 1 = -\dfrac{2}{3}(x - 6)$, so $3y + 3 = -2x + 12$ and $${eqTex(L)}$. Using slope $\dfrac{2}{3}$ gives $${eqTex(w1)}$, the point $(-6, 1)$ gives $${eqTex(w2)}$, and slope $-\dfrac{3}{2}$ gives $${eqTex(w3)}$.`, d: 2, c: 'understanding', t: [2], time: 75 }), (Cx) => { Cx.assert(K(L) === '2,3,-9' && on(L, Pt) && slopeOf(L).eq(m) && ![w1, w2, w3].some((w) => on(w, Pt) && slopeOf(w).eq(m)), '2x + 3y - 9 = 0'); Cx.which([K(L), K(w1), K(w2), K(w3)], K(line(2, 3, -9))); });
}
{
  const A = P(-4, 7), B = P(8, -2), L = join(A, B);
  const w1 = through(A, F(3, 4)), w2 = through(A, F(-4, 3)), w3 = line(3, 4, 16);
  Q('m10', mk.mcq({ stem: r`The straight line through $A(-4, 7)$ and $B(8, -2)$ has the equation`, opts: [T(L), T(w1), T(w2), T(w3)], key: 'a', sol: r`Slope $= \dfrac{-2 - 7}{8 + 4} = -\dfrac{3}{4}$, so $y - 7 = -\dfrac{3}{4}(x + 4)$ and $${eqTex(L)}$. The line $${eqTex(w1)}$ has the wrong sign of slope, $${eqTex(w2)}$ inverts it, and $${eqTex(w3)}$ has the wrong constant: it misses both points.`, d: 2, c: 'understanding', t: [2], time: 90 }), (Cx) => { Cx.assert(K(L) === '3,4,-16' && on(L, A) && on(L, B) && ![w1, w2, w3].some((w) => on(w, A) && on(w, B)), '3x + 4y - 16 = 0'); Cx.which([K(L), K(w1), K(w2), K(w3)], K(join(A, B))); });
}
{
  const L = byIntercepts(-4, 6), w1 = byIntercepts(6, -4), w2 = byIntercepts(4, 6), w3 = byIntercepts(4, -6);
  Q('m11', mk.mcq({ stem: r`A straight line makes an intercept of $-4$ on the $x$-axis and $6$ on the $y$-axis. Its equation is`, opts: [T(L), T(w1), T(w2), T(w3)], key: 'a', sol: r`Intercept form: $\dfrac{x}{-4} + \dfrac{y}{6} = 1$. Multiplying by $12$: $-3x + 2y = 12$, that is $${eqTex(L)}$. Swapping the intercepts gives $${eqTex(w1)}$, and changing a sign gives $${eqTex(w2)}$ or $${eqTex(w3)}$.`, d: 2, c: 'understanding', t: [2], time: 75 }), (Cx) => { Cx.assert(K(L) === '3,-2,12' && xInt(L).eq(-4) && yInt(L).eq(6) && !on(w1, P(-4, 0)) && !on(w2, P(-4, 0)) && !on(w3, P(-4, 0)), '3x - 2y + 12 = 0'); Cx.which([K(L), K(w1), K(w2), K(w3)], K(line(3, -2, 12))); });
}
{
  const L = line(5, -12, 60), xi = xInt(L), yi = yInt(L);
  Q('m12', mk.mcq({ stem: r`The line $5x - 12y + 60 = 0$ cuts the $x$-axis and the $y$-axis at distances (with sign) equal to`, opts: ['$-12$ and $5$', '$12$ and $-5$', '$5$ and $-12$', '$-5$ and $12$'], key: 'a', sol: r`Put $y = 0$: $5x = -60$, so the $x$-intercept is $-12$. Put $x = 0$: $-12y = -60$, so the $y$-intercept is $5$. The other options swap the intercepts or change signs. Intercept form: $\dfrac{x}{-12} + \dfrac{y}{5} = 1$.`, d: 2, c: 'understanding', t: [2], time: 60 }), (Cx) => { Cx.assert(xi.eq(-12) && yi.eq(5) && K(byIntercepts(-12, 5)) === K(L), 'intercepts -12 and 5'); Cx.which([[-12, 5], [12, -5], [5, -12], [-5, 12]], [xi.num(), yi.num()]); });
}
{
  const L = through(P(-7, 2), null);
  Q('m13', mk.mcq({ stem: r`The line drawn through $(-7, 2)$ at right angles to the $x$-axis has the equation`, opts: ['$x = -7$', '$y = 2$', '$x = 2$', '$y = -7$'], key: 'a', sol: r`A line perpendicular to the $x$-axis is vertical, so every point on it has the same $x$-coordinate, $-7$: the line is $x = -7$. The line $y = 2$ is the horizontal line through the same point.`, d: 1, c: 'recall', t: [2], time: 45 }), (Cx) => { Cx.assert(K(L) === '1,0,7' && on(L, P(-7, 2)) && on(L, P(-7, 100)) && isPerp(L, line(0, 1, 0)), 'x = -7'); Cx.which(['x=-7', 'y=2', 'x=2', 'y=-7'], 'x=-7'); });
}
{
  const G = line(3, -5, 8), p = P(-1, 4), L = through(p, F(-5, 3));
  const w1 = through(p, F(3, 5)), w2 = through(p, F(-3, 5)), w3 = through(p, F(5, 3));
  Q('m14', mk.mcq({ stem: r`The line through $(-1, 4)$ that is perpendicular to the line $3x - 5y + 8 = 0$ has the equation`, opts: [T(L), T(w1), T(w2), T(w3)], key: 'a', sol: r`The given line has slope $\dfrac{3}{5}$, so the perpendicular has slope $-\dfrac{5}{3}$. Then $y - 4 = -\dfrac{5}{3}(x + 1)$ gives $${eqTex(L)}$. The line $${eqTex(w1)}$ is parallel to the given one, $${eqTex(w2)}$ negates only the sign, and $${eqTex(w3)}$ inverts only the fraction.`, d: 3, c: 'application', t: [2], time: 90 }), (Cx) => { Cx.assert(K(L) === '5,3,-7' && isPerp(L, G) && on(L, p) && !isPerp(w1, G) && !isPerp(w2, G) && !isPerp(w3, G) && isParallel(w1, G), '5x + 3y - 7 = 0'); Cx.which([K(L), K(w1), K(w2), K(w3)], K(through(p, F(-1).div(slopeOf(G))))); });
}
{
  const L = line(5, 12, -20), p = P(-5, 7), d = dist(L, p);
  Q('m15', mk.mcq({ stem: r`How far, measured perpendicularly, is the point $(-5, 7)$ from the line $5x + 12y - 20 = 0$?`, opts: ['$3$', '$39$', r`$\dfrac{3}{13}$`, r`$\dfrac{39}{17}$`], key: 'a', sol: r`$d = \dfrac{|5(-5) + 12(7) - 20|}{\sqrt{5^2 + 12^2}} = \dfrac{|39|}{13} = 3$. The value $39$ forgets the denominator, $\dfrac{3}{13}$ divides by $13^2$ instead of $13$, and $\dfrac{39}{17}$ uses $5 + 12$ under the root sign.`, d: 2, c: 'understanding', t: [3], time: 75 }), (Cx) => { Cx.assert(d.value === 3 && d.signed.eq(39) && d.r2 === 169, 'distance 3'); Cx.which([3, 39, 3 / 13, 39 / 17], d.value); });
}
{
  const L1 = line(3, 4, 8), L2 = line(6, 8, -14), dp = distParallel(L1, L2);
  Q('m16', mk.mcq({ stem: r`Two parallel roads on a grid are drawn as $3x + 4y + 8 = 0$ and $6x + 8y - 14 = 0$. The gap between them is`, opts: ['$3$', r`$\dfrac{22}{5}$`, r`$\dfrac{11}{5}$`, r`$\dfrac{1}{5}$`], key: 'a', sol: r`First make the coefficients equal: $6x + 8y - 14 = 0$ is $3x + 4y - 7 = 0$. Then $d = \dfrac{|8 - (-7)|}{\sqrt{3^2 + 4^2}} = \dfrac{15}{5} = 3$. Using $-14$ directly gives $\dfrac{22}{5}$, dividing $22$ by $10$ gives $\dfrac{11}{5}$, and $|8 - 7|$ gives $\dfrac{1}{5}$.`, d: 3, c: 'application', t: [3], time: 90 }), (Cx) => { Cx.assert(dp.value === 3 && dp.diff.eq(15) && K(L2) === '3,4,-7', 'distance 3 after normalising the second line to 3x + 4y - 7'); Cx.which([3, 22 / 5, 11 / 5, 1 / 5], dp.value); });
}
{
  const L = line(4, -3, 7), ks = [F(7, 2), F(-4)], dd = (k) => dist(L, P(k, 2)).value;
  Q('m17', mk.mcq({ stem: r`The point $(k, 2)$ with $k > 0$ is at distance $3$ from the line $4x - 3y + 7 = 0$. Then $k$ equals`, opts: [r`$\dfrac{7}{2}$`, '$4$', r`$\dfrac{7}{4}$`, r`$\dfrac{9}{2}$`], key: 'a', sol: r`$\dfrac{|4k - 6 + 7|}{5} = 3$ gives $|4k + 1| = 15$, so $4k + 1 = 15$ or $4k + 1 = -15$. Hence $k = \dfrac{7}{2}$ or $k = -4$, and only $\dfrac{7}{2}$ is positive. The other options give distances $3.4$, $1.6$ and $3.8$.`, d: 3, c: 'application', t: [3], time: 105 }), (Cx) => { Cx.assert(ks.every((k) => Math.abs(dd(k) - 3) < 1e-12) && Math.abs(dd(4) - 3.4) < 1e-12 && Math.abs(dd(F(7, 4)) - 1.6) < 1e-12 && Math.abs(dd(F(9, 2)) - 3.8) < 1e-12, 'k = 7/2 or -4'); Cx.which([3.5, 4, 1.75, 4.5].map((k) => (Math.abs(dd(F(Math.round(k * 4), 4)) - 3) < 1e-9 ? 1 : 0)), 1); });
}
{
  const L = line(5, 12, -26), nf = normalForm(L);
  Q('m18', mk.mcq({ stem: r`The normal form of the line $5x + 12y - 26 = 0$ is`, opts: [r`$\dfrac{5}{13}x + \dfrac{12}{13}y = 2$`, r`$\dfrac{12}{13}x + \dfrac{5}{13}y = 2$`, r`$-\dfrac{5}{13}x - \dfrac{12}{13}y = 2$`, r`$\dfrac{5}{13}x + \dfrac{12}{13}y = 26$`], key: 'a', sol: r`Divide by $\sqrt{5^2 + 12^2} = 13$: $\dfrac{5}{13}x + \dfrac{12}{13}y = \dfrac{26}{13} = 2$. Here $\cos\omega = \dfrac{5}{13}$, $\sin\omega = \dfrac{12}{13}$ and $p = 2 > 0$. Swapping the coefficients, changing signs (which makes $p$ negative) or leaving $p = 26$ do not give the normal form.`, d: 2, c: 'understanding', t: [4], time: 75 }), (Cx) => { Cx.assert(nf.cn === 5 && nf.sn === 12 && nf.pnum === 26 && nf.r2 === 169 && nf.pv === 2, 'cos 5/13, sin 12/13, p = 2'); Cx.which([[5 / 13, 12 / 13, 2], [12 / 13, 5 / 13, 2], [-5 / 13, -12 / 13, 2], [5 / 13, 12 / 13, 26]], [nf.cn / 13, nf.sn / 13, nf.pv]); });
}
{
  const L = line(3, -4, 15), nf = normalForm(L);
  Q('m19', mk.mcq({ stem: r`When the line $3x - 4y + 15 = 0$ is written in the normal form $x\cos\omega + y\sin\omega = p$, the value of $p$ is`, opts: ['$3$', '$15$', '$5$', r`$\dfrac{3}{5}$`], key: 'a', sol: r`Rewrite as $-3x + 4y = 15$ and divide by $5$: $-\dfrac{3}{5}x + \dfrac{4}{5}y = 3$. So $\cos\omega = -\dfrac{3}{5}$, $\sin\omega = \dfrac{4}{5}$ and $p = 3$, the distance of the line from the origin. The value $15$ is the constant before dividing, $5$ is $\sqrt{3^2 + 4^2}$, and $\dfrac{3}{5}$ is a cosine value.`, d: 2, c: 'understanding', t: [4], time: 75 }), (Cx) => { Cx.assert(nf.pv === 3 && nf.cn === -3 && nf.sn === 4 && Math.abs(nf.omega - 126.869897645844) < 1e-9, 'p = 3, omega 126.87 degrees'); Cx.which([3, 15, 5, 3 / 5], nf.pv); });
}

// =============================================================== assertion-reason
{
  const L1 = line(4, -6, 7), L2 = line(6, 4, -1);
  Q('ar1', mk.ar({ a: r`The lines $4x - 6y + 7 = 0$ and $6x + 4y - 1 = 0$ are perpendicular.`, r: r`Two lines $a_1x + b_1y + c_1 = 0$ and $a_2x + b_2y + c_2 = 0$ are perpendicular exactly when $a_1a_2 + b_1b_2 = 0$.`, key: 'a', sol: r`Here $a_1a_2 + b_1b_2 = 4 \times 6 + (-6)(4) = 24 - 24 = 0$, so A is true. The slopes are $\dfrac{2}{3}$ and $-\dfrac{3}{2}$, with product $-1$. R is the criterion used, so it explains A.`, d: 2, c: 'understanding', t: [1] }), (Cx) => { Cx.assert(isPerp(L1, L2) && slopeOf(L1).mul(slopeOf(L2)).eq(-1) && L1.a * L2.a + L1.b * L2.b === 0, 'perpendicular'); Cx.key('a'); });
}
{
  const H = line(0, 1, 4), V = line(1, 0, -3);
  Q('ar2', mk.ar({ a: r`The line $y + 4 = 0$ has slope $0$.`, r: r`Every straight line in the plane has a slope.`, key: 'c', sol: r`A is true: $y = -4$ is a horizontal line, so its slope is $0$. R is false: a vertical line such as $x = 3$ makes an angle of $90^\circ$ with the $x$-axis, and $\tan 90^\circ$ is not defined, so it has no slope.`, d: 2, c: 'understanding', t: [1] }), (Cx) => { Cx.assert(slopeOf(H).isZero() && slopeOf(V) === null, 'horizontal slope 0, vertical no slope'); Cx.key('c'); });
}
{
  const L1 = line(3, 2, -8), L2 = line(6, 4, -16);
  Q('ar3', mk.ar({ a: r`The lines $3x + 2y = 8$ and $6x + 4y = 16$ are parallel and distinct.`, r: r`Two distinct lines with equal slopes are parallel.`, key: 'd', sol: r`R is true. But $6x + 4y - 16 = 0$ is twice $3x + 2y - 8 = 0$, so the two equations describe the same line: they are coincident, not distinct, and A is false.`, d: 3, c: 'analysis', t: [1] }), (Cx) => { Cx.assert(K(L1) === K(L2) && slopeOf(L1).eq(slopeOf(L2)) && !isParallel(L1, L2), 'coincident lines'); Cx.key('d'); });
}
{
  const L = line(4, -3, 12), xi = xInt(L), yi = yInt(L), dd = Math.hypot(xi.num(), yi.num());
  Q('ar4', mk.ar({ a: r`The line $4x - 3y + 12 = 0$ meets the axes at two points whose distance apart is $5$.`, r: r`The perpendicular distance of a point from a line is the least distance from that point to any point of the line.`, key: 'b', sol: r`Putting $y = 0$ gives $x = -3$, and putting $x = 0$ gives $y = 4$, so the points are $(-3, 0)$ and $(0, 4)$, and $\sqrt{9 + 16} = 5$: A is true. R is also true, but it says nothing about the intercepts; the distance $5$ comes from the Pythagoras relation, so R does not explain A.`, d: 3, c: 'analysis', t: [2] }), (Cx) => { Cx.assert(xi.eq(-3) && yi.eq(4) && Math.abs(dd - 5) < 1e-12, 'intercepts -3 and 4, distance 5'); Cx.key('b'); });
}
{
  const A = P(-2, 7), B = P(1, -5), m = slope(A, B);
  Q('ar5', mk.ar({ a: r`The segment from $(-2, 7)$ to $(1, -5)$ lies on a line of slope $-4$.`, r: r`For $x_1 \ne x_2$, the slope of the segment from $(x_1, y_1)$ to $(x_2, y_2)$ equals the change in $y$ divided by the change in $x$.`, key: 'a', sol: r`$m = \dfrac{-5 - 7}{1 - (-2)} = \dfrac{-12}{3} = -4$. So A is true, and it is obtained directly from the slope formula in R.`, d: 1, c: 'recall', t: [1] }), (Cx) => { Cx.assert(m.eq(-4), 'slope -4'); Cx.key('a'); });
}
{
  const L = line(8, 6, -20), nf = normalForm(L);
  Q('ar6', mk.ar({ a: r`The normal form of $8x + 6y - 20 = 0$ is $\dfrac{4}{5}x + \dfrac{3}{5}y = 2$.`, r: r`In the normal form $x\cos\omega + y\sin\omega = p$, the constant $p$ can be negative.`, key: 'c', sol: r`A is true: dividing by $\sqrt{8^2 + 6^2} = 10$ gives $\dfrac{4}{5}x + \dfrac{3}{5}y = 2$. R is false: $p$ is the length of the perpendicular from the origin, so it is positive, and the signs of $\cos\omega$ and $\sin\omega$ are adjusted to keep $p > 0$.`, d: 3, c: 'understanding', t: [4] }), (Cx) => { Cx.assert(nf.cn === 4 && nf.sn === 3 && nf.r2 === 25 && nf.pnum === 10 && nf.pv === 2, '4/5, 3/5, 2 after the common factor 2 is removed'); Cx.key('c'); });
}

// =============================================================== true-false
{
  const A = P(0, 0), B = P(7, -4), C = P(1, 3), D = P(-3, -4), m1 = slope(A, B), m2 = slope(C, D);
  Q('tf1', mk.tf({ stem: r`The line through $O(0, 0)$ and $(7, -4)$ is perpendicular to the line through $(1, 3)$ and $(-3, -4)$.`, key: 't', sol: r`The first slope is $-\dfrac{4}{7}$ and the second is $\dfrac{-4 - 3}{-3 - 1} = \dfrac{7}{4}$. Their product is $-\dfrac{4}{7} \times \dfrac{7}{4} = -1$, so the lines are perpendicular.`, d: 2, c: 'application', t: [1] }), (Cx) => { Cx.assert(m1.eq(F(-4, 7)) && m2.eq(F(7, 4)) && isPerp(join(A, B), join(C, D)), 'perpendicular'); Cx.key('t'); });
}
{
  const A = P(-2, -7), B = P(1, -1), C = P(4, 5);
  Q('tf2', mk.tf({ stem: r`The points $A(-2, -7)$, $B(1, -1)$ and $C(4, 5)$ all lie on one straight line.`, key: 't', sol: r`Slope of $AB = \dfrac{-1 + 7}{1 + 2} = 2$ and slope of $BC = \dfrac{5 + 1}{4 - 1} = 2$. The two slopes are equal and share the point $B$, so the three points are collinear (the line is $y = 2x - 3$).`, d: 2, c: 'application', t: [1] }), (Cx) => { Cx.assert(slope(A, B).eq(2) && slope(B, C).eq(2) && on(join(A, B), C) && K(join(A, C)) === '2,-1,-3', 'collinear on y = 2x - 3'); Cx.key('t'); });
}
{
  const L = line(4, 5, -20);
  Q('tf3', mk.tf({ stem: r`The line $4x + 5y = 20$ makes an intercept of $4$ on the $x$-axis and an intercept of $5$ on the $y$-axis.`, key: 'f', sol: r`Putting $y = 0$ gives $x = 5$, and putting $x = 0$ gives $y = 4$. The intercepts are $5$ on the $x$-axis and $4$ on the $y$-axis: the statement has them swapped. In intercept form, $\dfrac{x}{5} + \dfrac{y}{4} = 1$.`, d: 2, c: 'understanding', t: [2] }), (Cx) => { Cx.assert(xInt(L).eq(5) && yInt(L).eq(4) && K(byIntercepts(5, 4)) === K(L), 'x-intercept 5, y-intercept 4'); Cx.key('f'); });
}
{
  const L1 = line(8, 6, -15), L2 = line(4, 3, 5), dp = distParallel(L1, L2);
  Q('tf4', mk.tf({ stem: r`The parallel lines $8x + 6y - 15 = 0$ and $4x + 3y + 5 = 0$ are exactly $2$ units apart.`, key: 'f', sol: r`Write the second line as $8x + 6y + 10 = 0$. Then $d = \dfrac{|-15 - 10|}{\sqrt{8^2 + 6^2}} = \dfrac{25}{10} = 2.5$, not $2$. The statement is false.`, d: 3, c: 'application', t: [3] }), (Cx) => { Cx.assert(dp.value === 2.5 && dp.diff.eq(25) && dp.r2 === 100, 'distance 2.5'); Cx.key('f'); });
}
{
  const L = line(6, 8, -30), d = dist(L, P(0, 0));
  Q('tf5', mk.tf({ stem: r`The line $6x + 8y - 30 = 0$ lies at distance $3$ from the origin.`, key: 't', sol: r`$d = \dfrac{|6(0) + 8(0) - 30|}{\sqrt{6^2 + 8^2}} = \dfrac{30}{10} = 3$, so the statement is true.`, d: 1, c: 'understanding', t: [3] }), (Cx) => { Cx.assert(d.value === 3, 'distance 3'); Cx.key('t'); });
}

// =============================================================== fill in the blank
{
  const m = slope(P(-9, 5), P(3, -1));
  Q('fb1', mk.fill({ stem: r`The slope of the line joining $(-9, 5)$ and $(3, -1)$ is ____.`, acc: [['-1/2', '-0.5']], sol: r`$m = \dfrac{-1 - 5}{3 - (-9)} = \dfrac{-6}{12} = -\dfrac{1}{2}$, that is $-1/2$.`, d: 1, c: 'recall', t: [1] }), (Cx) => { Cx.assert(m.eq(F(-1, 2)), '-1/2'); Cx.blank(-0.5); });
}
{
  const L = join(P(2, 1), P(6, 9)), c = yInt(L);
  Q('fb2', mk.fill({ stem: r`The line through $(2, 1)$ and $(6, 9)$ cuts the $y$-axis at the point $(0, $ ____ $)$.`, acc: [['-3']], sol: r`Slope $= \dfrac{9 - 1}{6 - 2} = 2$, so $y - 1 = 2(x - 2)$, i.e. $y = 2x - 3$. At $x = 0$ the value is $y = -3$.`, d: 2, c: 'understanding', t: [2] }), (Cx) => { Cx.assert(K(L) === '2,-1,-3' && c.eq(-3), 'y = 2x - 3'); Cx.blank(-3); });
}
{
  const ab = angleBetween(line(1, -2, 0), line(1, -3, 0));
  Q('fb3', mk.fill({ stem: r`Two lines have slopes $\dfrac{1}{2}$ and $\dfrac{1}{3}$. The tangent of the acute angle between them is ____.`, acc: [['1/7']], sol: r`$\tan\theta = \left|\dfrac{\frac{1}{2} - \frac{1}{3}}{1 + \frac{1}{2} \times \frac{1}{3}}\right| = \dfrac{1/6}{7/6} = \dfrac{1}{7}$, that is $1/7$.`, d: 2, c: 'application', t: [1] }), (Cx) => { Cx.assert(ab.tan.eq(F(1, 7)) && Math.abs(ab.acute - 8.130102354156) < 1e-9, 'tan 1/7'); Cx.blank(1 / 7); });
}
{
  const d = dist(line(5, -12, 26), P(0, 0));
  Q('fb4', mk.fill({ stem: r`The perpendicular distance of the origin from the line $5x - 12y + 26 = 0$ is ____ units.`, acc: [['2']], sol: r`$d = \dfrac{|26|}{\sqrt{5^2 + 12^2}} = \dfrac{26}{13} = 2$.`, d: 1, c: 'understanding', t: [3] }), (Cx) => { Cx.assert(d.value === 2, '2'); Cx.blank(2); });
}
{
  const L = through(P(5, -3), -2), xi = xInt(L);
  Q('fb5', mk.fill({ stem: r`A line of slope $-2$ passes through $(5, -3)$. It meets the $x$-axis at $x =$ ____.`, acc: [['7/2', '3.5']], sol: r`$y + 3 = -2(x - 5)$ gives $2x + y - 7 = 0$. Putting $y = 0$: $x = \dfrac{7}{2} = 3.5$.`, d: 2, c: 'application', t: [2] }), (Cx) => { Cx.assert(K(L) === '2,1,-7' && xi.eq(F(7, 2)), '2x + y - 7 = 0'); Cx.blank(3.5); });
}

// =============================================================== numerical
{
  const A = P(-2, -7), B = P(5, 0), m = slope(A, B), th = inclination(join(A, B));
  Q('n01', mk.num({ stem: r`Find the inclination, in degrees, of the line through $(-2, -7)$ and $(5, 0)$.`, value: 45, sol: r`$m = \dfrac{0 - (-7)}{5 - (-2)} = \dfrac{7}{7} = 1$, so $\tan\theta = 1$ and $\theta = 45$ degrees.`, scheme: [['m = 7/7 = 1', 0.5], ['tan theta = 1, theta = 45', 0.5]], d: 1, c: 'understanding', t: [1], time: 60 }), (Cx) => { Cx.assert(m.eq(1) && th === 45, '45 degrees'); Cx.val(th); });
}
{
  const L1 = (k) => line(k, 4, -6), L2 = (k) => line(9, k, 2);
  const ks = range(-12, 12).filter((k) => k !== 0 && isParallel(L1(k), L2(k)));
  Q('n02', mk.num({ stem: r`The lines $kx + 4y - 6 = 0$ and $9x + ky + 2 = 0$ are parallel. Find the positive value of $k$.`, value: 6, sol: r`Equal slopes: $-\dfrac{k}{4} = -\dfrac{9}{k}$, so $k^2 = 36$ and $k = 6$ (the other root, $-6$, is not positive).`, scheme: [['k^2 = 36', 0.5], ['k = 6', 0.5]], d: 3, c: 'application', t: [1], time: 90 }), (Cx) => { Cx.assert(ks.join() === '-6,6' && !on(L1(6), P(0, 0)), 'k = 6 or -6'); Cx.val(Math.max(...ks)); });
}
{
  const L = line(7, -4, 28), a = xInt(L), b = yInt(L), area = a.abs().mul(b.abs()).div(2);
  Q('n03', mk.num({ stem: r`The line $7x - 4y + 28 = 0$ and the two coordinate axes enclose a triangle. Find its area in square units.`, value: 14, sol: r`The intercepts are $-4$ (put $y = 0$) and $7$ (put $x = 0$). Area $= \dfrac{1}{2} \times 4 \times 7 = 14$ square units.`, scheme: [['intercepts -4 and 7', 0.5], ['area = 14', 0.5]], d: 2, c: 'application', t: [2], time: 75 }), (Cx) => { Cx.assert(a.eq(-4) && b.eq(7) && area.eq(14), 'area 14'); Cx.val(area.num()); });
}
{
  const L = join(P(3, -2), P(-1, 6)), c = yInt(L);
  Q('n04', mk.num({ stem: r`The line joining $(3, -2)$ and $(-1, 6)$ crosses the $y$-axis at height $y = k$. Find $k$.`, value: 4, sol: r`Slope $= \dfrac{6 + 2}{-1 - 3} = -2$, so $y + 2 = -2(x - 3)$, i.e. $y = -2x + 4$. At $x = 0$: $y = 4$, so $k = 4$.`, scheme: [['slope = -2 and y = -2x + 4', 0.5], ['k = 4', 0.5]], d: 2, c: 'understanding', t: [2], time: 75 }), (Cx) => { Cx.assert(K(L) === '2,1,-4' && c.eq(4), 'y = -2x + 4'); Cx.val(c.num()); });
}
{
  const L = line(8, 15, -20), p = P(-4, 8), d = dist(L, p);
  Q('n05', mk.num({ stem: r`Find the distance, in units, of the point $(-4, 8)$ from the line $8x + 15y - 20 = 0$.`, value: 4, sol: r`$d = \dfrac{|8(-4) + 15(8) - 20|}{\sqrt{8^2 + 15^2}} = \dfrac{68}{17} = 4$.`, scheme: [['|8(-4) + 15(8) - 20| = 68 and root 289 = 17', 0.5], ['d = 4', 0.5]], d: 2, c: 'understanding', t: [3], time: 75 }), (Cx) => { Cx.assert(d.signed.eq(68) && d.r2 === 289 && d.value === 4, '68/17 = 4'); Cx.val(d.value); });
}
{
  const L1 = line(4, -3, 7), L2 = line(8, -6, -13), dp = distParallel(L1, L2);
  Q('n06', mk.num({ stem: r`Two parallel fences follow $4x - 3y + 7 = 0$ and $8x - 6y - 13 = 0$. How wide is the strip between them?`, value: 2.7, sol: r`Write the second line as $4x - 3y - 6.5 = 0$. Then $d = \dfrac{|7 - (-6.5)|}{\sqrt{4^2 + 3^2}} = \dfrac{13.5}{5} = 2.7$.`, scheme: [['second line as 4x - 3y - 6.5 = 0', 0.5], ['d = 13.5/5 = 2.7', 0.5]], d: 3, c: 'application', t: [3], time: 90 }), (Cx) => { Cx.assert(dp.diff.eq(F(27, 2)) && dp.value === 2.7, '2.7'); Cx.val(dp.value); });
}
{
  const L1 = line(5, -1, -2), L2 = line(2, -3, 6), ab = angleBetween(L1, L2);
  Q('n07', mk.num({ stem: r`Find, in degrees, the obtuse angle between the lines $5x - y = 2$ and $2x - 3y + 6 = 0$.`, value: 135, sol: r`The slopes are $5$ and $\dfrac{2}{3}$, so $\tan\theta = \left|\dfrac{5 - \frac{2}{3}}{1 + 5 \times \frac{2}{3}}\right| = \dfrac{13/3}{13/3} = 1$ and the acute angle is $45$ degrees. The obtuse angle is $180 - 45 = 135$ degrees.`, scheme: [['tan(theta) = 1, acute angle 45', 0.5], ['obtuse angle 180 - 45 = 135', 0.5]], d: 3, c: 'application', t: [1], time: 90 }), (Cx) => { Cx.assert(slopeOf(L1).eq(5) && slopeOf(L2).eq(F(2, 3)) && ab.tan.eq(1) && ab.obtuse === 135, '135'); Cx.val(ab.obtuse); });
}
