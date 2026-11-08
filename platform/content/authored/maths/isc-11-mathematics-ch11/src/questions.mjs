// ISC 11 Mathematics ch11 Straight Lines - multiple-choice and assertion-reason items.
// Every key is recomputed by the exact engine (geo.mjs / ln.mjs); every distractor is computed from its own wrong method.
import { Q, mk } from './lib.mjs';
import { r, P, K, T, Tp, N$, nv, F, Fr, pt, ct, tx, eqTex, line, on, val, join, through, meet, mid, slope, slopeOf, divide, divideExt, cutRatio, area, collinear, incentre, shiftLine, shiftPt, bisectors, bisectsAcute, orient, pencil, lamThrough, angleBetween, dist, distParallel, normalForm, isParallel, isPerp, d2, must } from './geo.mjs';

// Option 'a' is the key as authored; the build rotates keys afterwards.
const M = (id, o, check) => Q(id, mk.mcq({ key: 'a', ...o }), check);
const W = (C, vals, target) => C.which(vals.map(nv), nv(target));
const WL = (C, Ls, key) => C.which(Ls.map(K), K(key));
const WP = (C, ps, key) => C.which(ps.map(ct), ct(key));
const WS = (C, ss, key) => C.which(ss, key);
const distinct = (xs) => new Set(xs).size === xs.length;

// ============================================================ t01 section formula, area, incentre, shifting
{
  const A = P(-4, 6), B = P(8, -2), k = divide(A, B, 1, 3), ws = [divide(A, B, 3, 1), mid(A, B), divideExt(A, B, 1, 3)];
  M('m01', { stem: r`The point $P$ lies on the segment joining $A(-4, 6)$ and $B(8, -2)$ and is one-quarter of the way from $A$ to $B$. The coordinates of $P$ are`, opts: [k, ...ws].map(Tp), sol: r`$AP : PB = 1 : 3$, so $P = \left(\dfrac{1 \times 8 + 3 \times (-4)}{4}, \dfrac{1 \times (-2) + 3 \times 6}{4}\right) = ${ct(k)}$. The point $${ct(ws[0])}$ takes the ratio as $3 : 1$; $${ct(ws[1])}$ is the mid-point; $${ct(ws[2])}$ divides externally.`, d: 1, c: 'understanding', t: [1], time: 60 }, (C) => {
    C.assert(ct(k) === '(-1, 4)' && distinct([k, ...ws].map(ct)), 'P = (-1, 4); the three wrong points are distinct'); WP(C, [k, ...ws], k);
  });
}
{
  const A = P(2, -1), B = P(5, 3), k = divideExt(A, B, 2, 1), ws = [divide(A, B, 2, 1), divideExt(A, B, 1, 2), mid(A, B)];
  M('m02', { stem: r`The point $Q$ lies on the line through $A(2, -1)$ and $B(5, 3)$, outside the segment $AB$, with $AQ : QB = 2 : 1$. The coordinates of $Q$ are`, opts: [k, ...ws].map(Tp), sol: r`For an external division, $Q = \left(\dfrac{2 \times 5 - 1 \times 2}{2 - 1}, \dfrac{2 \times 3 - 1 \times (-1)}{2 - 1}\right) = ${ct(k)}$. The point $${ct(ws[0])}$ divides internally; $${ct(ws[1])}$ takes the ratio as $1 : 2$; $${ct(ws[2])}$ is the mid-point.`, d: 2, c: 'understanding', t: [1], time: 75 }, (C) => {
    C.assert(ct(k) === '(8, 7)' && d2(A, k).mul(1).eq(d2(k, B).mul(4)) && distinct([k, ...ws].map(ct)), 'Q = (8, 7) with AQ = 2 QB (squared distances 4 : 1)'); WP(C, [k, ...ws], k);
  });
}
{
  const A = P(-2, -6), B = P(4, 9), cr = cutRatio(A, B, line(0, 1, 0));
  const rt = (m, n, int) => `${m}:${n} ${int ? 'int' : 'ext'}`;
  M('m03', { stem: r`The $x$-axis cuts the segment joining $A(-2, -6)$ and $B(4, 9)$ at a point $P$. The ratio $AP : PB$ is`, opts: [r`$2 : 3$ internally`, r`$3 : 2$ internally`, r`$2 : 3$ externally`, r`$3 : 2$ externally`], sol: r`On the $x$-axis $y = 0$. If $AP : PB = \lambda : 1$, then $y = \dfrac{\lambda \times 9 + (-6)}{\lambda + 1} = 0$, so $\lambda = \dfrac{2}{3}$. It is positive, so $P$ is between $A$ and $B$: $AP : PB = 2 : 3$ internally. The ratio $3 : 2$ is $PB : AP$; an external ratio would need $A$ and $B$ on the same side of the axis, but their $y$-coordinates $-6$ and $9$ have opposite signs.`, d: 3, c: 'application', t: [1], time: 90 }, (C) => {
    C.assert(cr.internal && cr.lam.eq(F(2, 3)) && cr.P[0].eq(F(2, 5)) && cr.P[1].isZero(), 'lambda = 2/3 > 0, P = (2/5, 0)'); WS(C, [rt(2, 3, true), rt(3, 2, true), rt(2, 3, false), rt(3, 2, false)], rt(cr.lam.n, cr.lam.d, cr.internal));
  });
}
{
  const A = P(1, 2), B = P(4, 3), L = line(1, 1, -12), cr = cutRatio(A, B, L), rt = (m, n, int) => `${m}:${n} ${int ? 'int' : 'ext'}`, l = cr.lam.abs();
  M('m04', { stem: r`In what ratio does the line $x + y = 12$ divide the line segment through $A(1, 2)$ and $B(4, 3)$?`, opts: [r`$9 : 5$ externally`, r`$9 : 5$ internally`, r`$5 : 9$ externally`, r`$5 : 9$ internally`], sol: r`The values of $x + y - 12$ at $A$ and $B$ are $-9$ and $-5$: the same sign, so the line meets $AB$ outside the segment. $\lambda = -\dfrac{-9}{-5} = -\dfrac{9}{5}$, so $AP : PB = 9 : 5$ externally. The point is $P = ${ct(cr.P)}$. Option $9 : 5$ internally ignores the sign test; $5 : 9$ is $PB : AP$.`, d: 3, c: 'application', t: [1], time: 100 }, (C) => {
    C.assert(!cr.internal && l.eq(F(9, 5)) && ct(cr.P) === '(\\dfrac{31}{4}, \\dfrac{17}{4})' && on(L, cr.P) && collinear(A, B, cr.P), 'ratio 9:5 external, P on the line and on AB'); WS(C, [rt(9, 5, false), rt(9, 5, true), rt(5, 9, false), rt(5, 9, true)], rt(l.n, l.d, cr.internal));
  });
}
{
  const A = P(-2, 1), B = P(5, 3), Cc = P(1, 8), k = area(A, B, Cc), ws = [k.mul(2), F(27, 2), F(49, 2)];
  M('m05', { stem: r`A triangle has its corners at $(-2, 1)$, $(5, 3)$ and $(1, 8)$. Its area, in square units, is`, opts: [k, ...ws].map(N$), sol: r`Area $= \dfrac{1}{2}\left|(-2)(3 - 8) + 5(8 - 1) + 1(1 - 3)\right| = \dfrac{1}{2}\left|10 + 35 - 2\right| = \dfrac{43}{2}$. The value $43$ forgets the factor $\dfrac{1}{2}$; $\dfrac{27}{2}$ mixes the order of the $y$-differences; $\dfrac{49}{2}$ treats the triangle as half of a $7 \times 7$ rectangle.`, d: 2, c: 'understanding', t: [1], time: 75 }, (C) => {
    C.assert(k.eq(F(43, 2)) && F(10 - 35 - 2, 2).abs().eq(F(27, 2)) && distinct([k, ...ws].map(nv)), 'area = 43/2'); W(C, [k, ...ws], k);
  });
}
{
  const A = P(-3, -1), B = P(1, 5), kk = F(3), L = join(A, B), kw = [F(6), F(31, 2), F(-9)];
  M('m06', { stem: r`The three points $A(-3, -1)$, $B(1, 5)$ and $C(k, 8)$ lie on one straight line. The value of $k$ is`, opts: [kk, ...kw].map(N$), sol: r`The slope of $AB$ is $\dfrac{5 + 1}{1 + 3} = \dfrac{3}{2}$. Slope of $AC$ equal to $\dfrac{3}{2}$: $\dfrac{8 + 1}{k + 3} = \dfrac{3}{2}$, so $k + 3 = 6$ and $k = 3$. The value $6$ forgets to subtract $3$; $\dfrac{31}{2}$ puts $8$ as the $x$-coordinate; $-9$ uses the slope $-\dfrac{3}{2}$.`, d: 3, c: 'application', t: [1], time: 100 }, (C) => {
    C.assert(collinear(A, B, P(3, 8)) && !collinear(A, B, P(6, 8)) && on(L, P(3, 8)) && F(9).div(F(3, 2)).sub(3).eq(3) && F(9).div(F(-3, 2)).sub(3).eq(-9) && L.a === 3, 'k = 3 on the line 3x - 2y + 7 = 0'); W(C, [kk, ...kw], kk);
  });
}
{
  const A = P(-1, -1), B = P(5, -1), Cc = P(2, 3), ic = incentre(A, B, Cc), cen = pt(F(6, 3), F(1, 3));
  const wrongW = pt(F(5 * -1 + 6 * 5 + 5 * 2, 16), F(5 * -1 + 6 * -1 + 5 * 3, 16)); // weights a, c, b swapped round the vertices
  const ws = [pt(F(2), F(1, 3)), wrongW, pt(ic.r, ic.r)];
  M('m07', { stem: r`The vertices of a triangle are $A(-1, -1)$, $B(5, -1)$ and $C(2, 3)$. Its incentre is the point`, opts: [ic.I, ...ws].map(Tp), sol: r`The sides are $BC = ${ic.a}$, $CA = ${ic.b}$ and $AB = ${ic.c}$ (the side opposite each vertex gives its weight). $I = \left(\dfrac{5(-1) + 5(5) + 6(2)}{16}, \dfrac{5(-1) + 5(-1) + 6(3)}{16}\right) = ${ct(ic.I)}$. The point $${ct(ws[0])}$ is the centroid (all weights equal); $${ct(ws[1])}$ gives each vertex the length of a side that meets there; $${ct(ws[2])}$ uses the inradius $${tx(ic.r)}$ as both coordinates.`, d: 3, c: 'application', t: [1], time: 120 }, (C) => {
    C.assert(ic.a === 5 && ic.b === 5 && ic.c === 6 && ct(ic.I) === '(2, \\dfrac{1}{2})' && ic.r.eq(F(3, 2)) && distinct([ic.I, ...ws].map(ct)), 'incentre (2, 1/2), r = 3/2 (area / s)'); WP(C, [ic.I, ...ws], ic.I);
  });
}
{
  const p0 = P(6, -2), k = shiftPt(p0, -1, 3), ws = [pt(5, 1), pt(7, 1), pt(-7, 5)];
  M('m08', { stem: r`The origin is moved, with the axes kept parallel, to the point $O'(-1, 3)$. A point whose old coordinates are $(6, -2)$ has new coordinates`, opts: [k, ...ws].map(Tp), sol: r`$X = x - h = 6 - (-1) = 7$ and $Y = y - k = -2 - 3 = -5$, so the new coordinates are $${ct(k)}$. The pair $${ct(ws[0])}$ adds $h$ and $k$ instead of subtracting them; $${ct(ws[1])}$ corrects $x$ but not $y$; $${ct(ws[2])}$ subtracts in the wrong direction.`, d: 1, c: 'understanding', t: [1], time: 60 }, (C) => {
    C.assert(ct(k) === '(7, -5)' && distinct([k, ...ws].map(ct)), 'new coordinates (7, -5)'); WP(C, [k, ...ws], k);
  });
}
{
  const Lnew = line(3, -2, 4);
  // original line: 3(x - 2) - 2(y + 3) + 4 = 0  ->  3x - 2y - 8 = 0
  const Lorig = line(3, -2, -8);
  const ws = [line(3, -2, 16), line(3, -2, 4), line(3, -2, -2)];
  M('m09', { stem: r`After the origin is shifted to $(2, -3)$, a line has the equation $3X - 2Y + 4 = 0$ in the new axes. Its equation in the original axes is`, opts: [Lorig, ...ws].map(T), sol: r`Replace $X = x - 2$ and $Y = y + 3$: $3(x - 2) - 2(y + 3) + 4 = 0$, which is $3x - 2y - 8 = 0$. The line $${eqTex(ws[0])}$ shifts in the wrong direction; $${eqTex(ws[1])}$ is the unchanged equation; $${eqTex(ws[2])}$ replaces $X$ but leaves $Y$ alone.`, d: 3, c: 'application', t: [1], time: 100 }, (C) => {
    const cc = shiftLine(Lorig, 2, -3);
    C.assert(K(cc.N) === K(Lnew) && cc.raw.join() === '3,-2,4' && distinct([Lorig, ...ws].map(K)), 'shifting 3x - 2y - 8 = 0 to the origin (2, -3) gives 3X - 2Y + 4 = 0'); WL(C, [Lorig, ...ws], Lorig);
  });
}

// ============================================================ t02 slopes and angles
{
  const L1 = line(3, -2, 1), L2 = line(1, 4, -7), ab = angleBetween(L1, L2), m1 = F(3, 2), m2 = F(-1, 4);
  const ws = [m1.sub(m2).div(F(1).sub(m1.mul(m2))).abs(), m1.add(m2).div(F(1).add(m1.mul(m2))).abs(), F(5, 14)];
  M('m10', { stem: r`The acute angle $\theta$ between the lines $3x - 2y + 1 = 0$ and $x + 4y - 7 = 0$ satisfies $\tan\theta =$`, opts: [ab.tan, ...ws].map(N$), sol: r`The slopes are $m_1 = \dfrac{3}{2}$ and $m_2 = -\dfrac{1}{4}$. $\tan\theta = \left|\dfrac{m_1 - m_2}{1 + m_1m_2}\right| = \left|\dfrac{7/4}{5/8}\right| = \dfrac{14}{5}$. The value $\dfrac{14}{11}$ uses $1 - m_1m_2$ in the denominator; $2$ adds the slopes in the numerator; $\dfrac{5}{14}$ turns the fraction upside down.`, d: 2, c: 'understanding', t: [2], time: 90 }, (C) => {
    C.assert(ab.tan.eq(F(14, 5)) && ws[0].eq(F(14, 11)) && ws[1].eq(2) && slopeOf(L1).eq(m1) && slopeOf(L2).eq(m2) && distinct([ab.tan, ...ws].map(nv)), 'tan = 14/5'); W(C, [ab.tan, ...ws], ab.tan);
  });
}
{
  const L2 = line(6, 5, -8), ok = (k) => isPerp(line(5, -k, 3), L2);
  M('m11', { stem: r`The lines $5x - ky + 3 = 0$ and $6x + 5y - 8 = 0$ cut each other at right angles. The value of $k$ is`, opts: [N$(6), N$(-6), N$(F(-25, 6)), N$(F(6, 5))], sol: r`The slopes are $\dfrac{5}{k}$ and $-\dfrac{6}{5}$. Perpendicular lines have $m_1m_2 = -1$: $-\dfrac{6}{k} = -1$, so $k = 6$. Equivalently $a_1a_2 + b_1b_2 = 30 - 5k = 0$. The value $-6$ is a sign slip; $-\dfrac{25}{6}$ is the value for parallel lines ($a_1b_2 = a_2b_1$); $\dfrac{6}{5}$ is simply the slope of the second line with its sign dropped.`, d: 3, c: 'application', t: [2], time: 100 }, (C) => {
    const ks = [-12, -6, -3, -1, 1, 2, 3, 4, 5, 6, 7, 8, 10, 12].filter(ok);
    C.assert(ks.join() === '6' && isParallel(line(5, F(25, 6), 3), L2), 'k = 6 is the only perpendicular value in a search of -12..12; k = -25/6 would make them parallel'); W(C, [F(6), F(-6), F(-25, 6), F(6, 5)], F(6));
  });
}

// ============================================================ t03 forms of the equation of a line
{
  const p0 = P(2, -5), L = through(p0, -1), ws = [through(p0, 1), through(P(-2, 5), -1), through(P(0, 0), -1)];
  M('m12', { stem: r`A line through $(2, -5)$ is inclined at $135^\circ$ to the positive $x$-axis. Its equation is`, opts: [L, ...ws].map(T), sol: r`The slope is $\tan 135^\circ = -1$. Point-slope form: $y + 5 = -1\,(x - 2)$, that is $x + y + 3 = 0$. The line $${eqTex(ws[0])}$ takes the slope as $+1$; $${eqTex(ws[1])}$ passes through $(-2, 5)$ instead; $${eqTex(ws[2])}$ is the line of the same slope through the origin.`, d: 2, c: 'understanding', t: [3], time: 75 }, (C) => {
    C.assert(on(L, p0) && slopeOf(L).eq(-1) && Math.abs(Math.tan((135 * Math.PI) / 180) + 1) < 1e-12 && L.c === 3 && distinct([L, ...ws].map(K)), 'x + y + 3 = 0 through (2, -5) with slope -1'); WL(C, [L, ...ws], L);
  });
}
{
  const p0 = P(4, 3), L = line(1, 1, -7), ws = [line(1, -1, -1), line(3, -4, 0), line(3, 4, -12)];
  M('m13', { stem: r`A line passing through $(4, 3)$ makes equal non-zero intercepts on the two axes. Its equation is`, opts: [L, ...ws].map(T), sol: r`Equal intercepts $a$ give $\dfrac{x}{a} + \dfrac{y}{a} = 1$, so $x + y = a$. Through $(4, 3)$: $a = 7$, and the line is $x + y - 7 = 0$. The line $${eqTex(ws[0])}$ has the intercepts $1$ and $-1$, equal in size but opposite in sign; $${eqTex(ws[1])}$ passes through the origin, where both intercepts are zero; $${eqTex(ws[2])}$ uses the coordinates $4$ and $3$ of the point as the two intercepts.`, d: 3, c: 'application', t: [3], time: 100 }, (C) => {
    C.assert(on(L, p0) && F(7).eq(-L.c) && L.a === L.b && on(ws[1], p0) && on(ws[2], P(4, 0)) && distinct([L, ...ws].map(K)), 'x + y = 7: intercepts 7 and 7'); WL(C, [L, ...ws], L);
  });
}
{
  const L = line(5, -3, 12), m = slopeOf(L), c = F(12, 3), tt = (a, b) => `$m = ${tx(a)},\\ c = ${tx(b)}$`;
  M('m14', { stem: r`The line $5x - 3y + 12 = 0$ is written as $y = mx + c$. The slope and the $y$-intercept are`, opts: [tt(m, c), tt(F(-5, 3), c), tt(m, F(-4)), tt(F(3, 5), F(12, 5))], sol: r`$3y = 5x + 12$, so $y = \dfrac{5}{3}x + 4$: $m = \dfrac{5}{3}$ and $c = 4$. The pair with $m = -\dfrac{5}{3}$ takes $-\dfrac{a}{b}$ but ignores the sign of $b$; the pair with $c = -4$ moves $12$ across without changing its sign; the pair with $m = \dfrac{3}{5}$ divides $a$ by $b$ the wrong way round.`, d: 2, c: 'understanding', t: [3], time: 75 }, (C) => {
    C.assert(m.eq(F(5, 3)) && c.eq(4) && on(L, pt(0, 4)) && on(L, pt(F(-12, 5), 0)), 'm = 5/3, c = 4'); WS(C, ['5/3,4', '-5/3,4', '5/3,-4', '3/5,12/5'], `${m},${c}`);
  });
}
{
  const L = line(5, 12, 65), nf = normalForm(L);
  const key = r`$-\dfrac{5}{13}x - \dfrac{12}{13}y = 5$`;
  const ws = [r`$\dfrac{5}{13}x + \dfrac{12}{13}y = -5$`, r`$-\dfrac{5}{12}x - y = \dfrac{65}{12}$`, r`$-\dfrac{5}{13}x - \dfrac{12}{13}y = 65$`];
  M('m15', { stem: r`The line $5x + 12y + 65 = 0$ is reduced to the normal form $x\cos\omega + y\sin\omega = p$. The result is`, opts: [key, ...ws], sol: r`The constant term is positive, so first multiply by $-1$: $-5x - 12y = 65$. Divide by $\sqrt{25 + 144} = 13$: $-\dfrac{5}{13}x - \dfrac{12}{13}y = 5$, with $p = 5 > 0$, $\cos\omega = -\dfrac{5}{13}$ and $\sin\omega = -\dfrac{12}{13}$. The option with right-hand side $-5$ leaves $p$ negative; the option with right-hand side $\dfrac{65}{12}$ divides by $12$; the option with right-hand side $65$ divides the left side by $13$ but not the right.`, d: 3, c: 'application', t: [3], time: 100 }, (C) => {
    C.assert(nf.cn === -5 && nf.sn === -12 && nf.pnum === 65 && nf.r2 === 169 && nf.p === '5' && nf.cos === '-\\dfrac{5}{13}' && nf.sin === '-\\dfrac{12}{13}' && Math.abs(nf.omega - 247.38) < 0.01, 'cos = -5/13, sin = -12/13, p = 5, omega = 247.38 degrees'); C.which([[-5 / 13, -12 / 13, 5], [5 / 13, 12 / 13, -5], [-5 / 12, -1, 65 / 12], [-5 / 13, -12 / 13, 65]], [nf.cn / 13, nf.sn / 13, nf.pnum / 13]);
  });
}

// ============================================================ t04 distances and bisectors
{
  const L = line(5, -12, 85), p0 = P(-2, 3), d = dist(L, p0), ws = [F(39), F(3, 13), F(39, 17)];
  M('m16', { stem: r`The perpendicular distance of the point $(-2, 3)$ from the line $5x - 12y + 85 = 0$ is`, opts: [N$(F(3)), ...ws.map(N$)], sol: r`$\dfrac{|5(-2) - 12(3) + 85|}{\sqrt{5^2 + 12^2}} = \dfrac{39}{13} = 3$. The value $39$ forgets the denominator; $\dfrac{3}{13}$ divides by $169$ and not by its square root; $\dfrac{39}{17}$ uses $|a| + |b|$ in place of $\sqrt{a^2 + b^2}$.`, d: 2, c: 'understanding', t: [4], time: 75 }, (C) => {
    C.assert(d.rational.eq(3) && val(L, p0).eq(39) && distinct([3, ...ws.map(nv)]), 'distance 3'); W(C, [F(3), ...ws], d.rational);
  });
}
{
  const L1 = line(7, -24, 30), L2 = line(7, -24, -10), dp = distParallel(L1, L2);
  M('m17', { stem: r`Two parallel lines are given by $7x - 24y + 30 = 0$ and $14x - 48y - 20 = 0$. The distance between them is`, opts: [dp.rational, F(2), F(4, 5), F(8, 125)].map(N$), sol: r`Make the coefficients equal: the second line is $7x - 24y - 10 = 0$. The distance is $\dfrac{|30 - (-10)|}{\sqrt{49 + 576}} = \dfrac{40}{25} = \dfrac{8}{5}$. The value $2$ uses $-20$ without halving it; $\dfrac{4}{5}$ subtracts $-10$ the wrong way ($|30 - 10| = 20$); $\dfrac{8}{125}$ divides by $625$ and not its root.`, d: 3, c: 'application', t: [4], time: 100 }, (C) => {
    C.assert(dp.rational.eq(F(8, 5)) && F(50, 25).eq(2) && F(20, 25).eq(F(4, 5)) && F(40, 625).eq(F(8, 125)) && K(line(14, -48, -20)) === K(L2), 'distance 8/5'); W(C, [dp.rational, F(2), F(4, 5), F(8, 125)], dp.rational);
  });
}
{
  const L1 = line(3, -4, 5), L2 = line(8, 15, -38), bs = bisectors(L1, L2);
  const key = bs.minus; // origin-angle bisector (see assertions)
  const ws = [bs.plus, line(1, 1, -3), line(5, 19, -43)];
  M('m18', { stem: r`The lines $3x - 4y + 5 = 0$ and $8x + 15y - 38 = 0$ meet at $(1, 2)$. The equation of the bisector of the angle between them that contains the origin is`, opts: [key, ...ws].map(T), sol: r`Write both with positive constants: $3x - 4y + 5 = 0$ and $-8x - 15y + 38 = 0$. Equate the signed distances: $\dfrac{3x - 4y + 5}{5} = \dfrac{-8x - 15y + 38}{17}$, so $17(3x - 4y + 5) = 5(-8x - 15y + 38)$, which simplifies to $13x + y - 15 = 0$. The line $${eqTex(ws[0])}$ is the other bisector (the sign taken the other way); $${eqTex(ws[1])}$ is the sum of the two equations without scaling; $${eqTex(ws[2])}$ is their difference without scaling. Neither of the last two bisects the angle.`, d: 4, c: 'application', t: [4], time: 150 }, (C) => {
    const v1 = (q) => val(L1, q), v2 = (q) => val(L2, q).neg(); // L2 with a positive constant
    const onKey = pt(2, -11), onPlus = pt(14, 3);
    C.assert(K(key) === K(line(91, 7, -105)) && K(line(17 * 3 + 5 * 8, 17 * -4 + 5 * 15, 17 * 5 - 5 * 38)) === K(key) && on(key, onKey) && on(bs.plus, onPlus) && v1(pt(0, 0)).sign() > 0 && v2(pt(0, 0)).sign() > 0, 'origin-angle bisector: 17(3x - 4y + 5) = 5(-8x - 15y + 38), i.e. 13x + y - 15 = 0');
    C.assert(v1(onKey).sign() > 0 && v2(onKey).sign() > 0 && v1(onPlus).sign() > 0 && v2(onPlus).sign() < 0 && K(bs.plus) === K(line(1, -13, 25)) && on(ws[1], pt(1, 2)) && on(ws[2], pt(1, 2)) && distinct([key, ...ws].map(K)), 'the key bisector runs through the region where both oriented values are positive (the origin side); the other bisector does not');
    WL(C, [key, ...ws], key);
  });
}

// ============================================================ t05 family of lines, locus
{
  const L1 = line(3, 2, -7), L2 = line(1, -3, 5), Z = line(2, -1, 0), lam = lamThrough(L1, L2, pt(0, 0)), key = pencil(L1, L2, lam), ws = [pencil(L1, L2, F(-7, 5)), pencil(L1, L2, F(5, 7)), pencil(L1, L2, F(-5, 7))];
  M('m19', { stem: r`A line passes through the point of intersection of $3x + 2y - 7 = 0$ and $x - 3y + 5 = 0$ and through the origin. Its equation is`, opts: [key, ...ws].map(T), sol: r`Write $(3x + 2y - 7) + \lambda(x - 3y + 5) = 0$. At the origin $-7 + 5\lambda = 0$, so $\lambda = \dfrac{7}{5}$. Then $22x - 11y = 0$, that is $2x - y = 0$. The other options use $\lambda = -\dfrac{7}{5}$, $\dfrac{5}{7}$ and $-\dfrac{5}{7}$ (the sign or the quotient the wrong way round).`, d: 3, c: 'application', t: [5], time: 100 }, (C) => {
    C.assert(lam.eq(F(7, 5)) && K(key) === K(Z) && on(key, pt(1, 2)) && on(key, pt(0, 0)) && meet(L1, L2)[0].eq(1) && distinct([key, ...ws].map(K)), 'lambda = 7/5, line 2x - y = 0 through (1, 2) and the origin'); WL(C, [key, ...ws], Z);
  });
}
{
  const A = P(2, -1), B = P(-4, 3), key = line(3, -2, 5), ws = [join(A, B), line(2, -3, 5), line(3, -2, -8)];
  M('m20', { stem: r`A point $P(x, y)$ moves so that it is always the same distance from $A(2, -1)$ as from $B(-4, 3)$. The equation of its locus is`, opts: [key, ...ws].map(T), sol: r`$PA^2 = PB^2$ gives $(x - 2)^2 + (y + 1)^2 = (x + 4)^2 + (y - 3)^2$, so $-4x + 2y + 5 = 8x - 6y + 25$, that is $3x - 2y + 5 = 0$. This is the perpendicular bisector of $AB$. The line $${eqTex(ws[0])}$ is $AB$ itself; $${eqTex(ws[1])}$ is parallel to neither; $${eqTex(ws[2])}$ is perpendicular to $AB$ through $A$ only.`, d: 3, c: 'application', t: [5], time: 120 }, (C) => {
    const q = pt(1, 4), ok = d2(q, A).eq(d2(q, B)) && on(key, q) && on(key, pt(-1, 1)) && on(key, mid(A, B));
    C.assert(ok && isPerp(key, join(A, B)) && on(key, mid(A, B)) && distinct([key, ...ws].map(K)), '3x - 2y + 5 = 0 is the perpendicular bisector of AB'); WL(C, [key, ...ws], key);
  });
}

// ============================================================ assertion-reason
Q('ar1', mk.ar({ a: r`The point that divides the segment from $A(-5, 4)$ to $B(7, -8)$ internally in the ratio $2 : 1$ is $(3, -4)$.`, r: r`If $P$ divides $AB$ internally in the ratio $m : n$, then $P = \left(\dfrac{mx_2 + nx_1}{m + n}, \dfrac{my_2 + ny_1}{m + n}\right)$.`, key: 'a', sol: r`By R with $m = 2$, $n = 1$: $x = \dfrac{14 - 5}{3} = 3$ and $y = \dfrac{-16 + 4}{3} = -4$, so A is true. R is the formula that gives A, so R explains A.`, d: 2, c: 'understanding', t: [1] }), (C) => {
  const p = divide(P(-5, 4), P(7, -8), 2, 1); C.assert(ct(p) === '(3, -4)', 'P = (3, -4)'); C.key('a');
});
Q('ar2', mk.ar({ a: r`The incentre of the triangle with vertices $O(0, 0)$, $B(8, 0)$ and $C(0, 6)$ is $(2, 2)$.`, r: r`The incentre of a triangle is the point that is at equal distances from the three vertices.`, key: 'c', sol: r`The weights are the sides (the side opposite $O$ is $BC = 10$, opposite $B$ is $CA = 6$ and opposite $C$ is $AB = 8$). $I = \left(\dfrac{10 \cdot 0 + 6 \cdot 8 + 8 \cdot 0}{24}, \dfrac{10 \cdot 0 + 6 \cdot 0 + 8 \cdot 6}{24}\right) = (2, 2)$, so A is true. R is false: the incentre is equally far from the three **sides**; the point equally far from the vertices is the circumcentre, here $(4, 3)$.`, d: 3, c: 'analysis', t: [1] }), (C) => {
  const ic = incentre(P(0, 0), P(8, 0), P(0, 6)), cc = pt(4, 3);
  C.assert(ct(ic.I) === '(2, 2)' && ic.r.eq(2) && d2(cc, P(0, 0)).eq(d2(cc, P(8, 0))) && d2(cc, P(0, 0)).eq(d2(cc, P(0, 6))) && !d2(ic.I, P(0, 0)).eq(d2(ic.I, P(8, 0))), 'incentre (2, 2); circumcentre (4, 3) is the equidistant point; the incentre is not'); C.key('c');
});
Q('ar3', mk.ar({ a: r`The acute angle between two lines whose slopes are $2$ and $3$ is $45^\circ$.`, r: r`The acute angle $\theta$ between lines of slopes $m_1$ and $m_2$ satisfies $\tan\theta = \left|\dfrac{m_1 - m_2}{1 + m_1m_2}\right|$.`, key: 'd', sol: r`$\tan\theta = \left|\dfrac{2 - 3}{1 + 6}\right| = \dfrac{1}{7}$, so $\theta \approx 8.13^\circ$, not $45^\circ$: A is false. R is the standard formula and is true.`, d: 2, c: 'understanding', t: [2] }), (C) => {
  const L1 = line(2, -1, 0), L2 = line(3, -1, 0), ab = angleBetween(L1, L2); C.assert(ab.tan.eq(F(1, 7)) && Math.abs(ab.acute - 8.13) < 0.005, 'tan = 1/7, angle 8.13 degrees'); C.key('d');
});
Q('ar4', mk.ar({ a: r`The line $2x - 3y = 6$ makes an intercept of $3$ on the $x$-axis and an intercept of $-2$ on the $y$-axis.`, r: r`In the equation $\dfrac{x}{a} + \dfrac{y}{b} = 1$ the line makes intercepts $a$ on the $x$-axis and $b$ on the $y$-axis.`, key: 'a', sol: r`Divide $2x - 3y = 6$ by $6$: $\dfrac{x}{3} + \dfrac{y}{-2} = 1$, so $a = 3$, $b = -2$ and A is true. R states what $a$ and $b$ mean in that form, which is exactly how the intercepts are read, so R explains A.`, d: 2, c: 'understanding', t: [3] }), (C) => {
  const L = line(2, -3, -6); C.assert(L.a === 2 && L.b === -3 && L.c === -6 && on(L, pt(3, 0)) && on(L, pt(0, -2)), 'intercepts 3 and -2'); C.key('a');
});
Q('ar5', mk.ar({ a: r`The two bisectors of the angles between the lines $3x + 4y - 12 = 0$ and $5x + 12y - 20 = 0$ are perpendicular to each other.`, r: r`Every point on a bisector of the angle between two lines is at the same distance from both lines.`, key: 'b', sol: r`The bisectors are $7x - 4y - 28 = 0$ and $4x + 7y - 16 = 0$; the product of their slopes is $\dfrac{7}{4} \times \left(-\dfrac{4}{7}\right) = -1$, so A is true. R is also a true property of bisectors, but it is the reason for the **equation** of a bisector, not for the right angle between the two bisectors (which comes from the two angles on a straight line adding to $180^\circ$ and being halved), so R does not explain A.`, d: 4, c: 'analysis', t: [4] }), (C) => {
  const L1 = line(3, 4, -12), L2 = line(5, 12, -20), bs = bisectors(L1, L2); C.assert(K(bs.plus) === K(line(7, -4, -28)) && K(bs.minus) === K(line(4, 7, -16)) && isPerp(bs.plus, bs.minus), 'bisectors 7x - 4y - 28 = 0 and 4x + 7y - 16 = 0 are perpendicular'); C.key('b');
});
Q('ar6', mk.ar({ a: r`Every line of the form $(3x + y - 5) + \lambda(x - y - 3) = 0$ passes through the point $(2, -1)$.`, r: r`The equation $L_1 + \lambda L_2 = 0$ represents a line through the intersection of $L_1 = 0$ and $L_2 = 0$ only when $\lambda$ is positive.`, key: 'c', sol: r`At $(2, -1)$: $3(2) - 1 - 5 = 0$ and $2 + 1 - 3 = 0$, so both brackets vanish and the point lies on every member: A is true. R is false: the point of intersection makes both $L_1$ and $L_2$ zero, so $L_1 + \lambda L_2 = 0$ holds there for every real $\lambda$, negative, zero or positive.`, d: 3, c: 'analysis', t: [5] }), (C) => {
  const L1 = line(3, 1, -5), L2 = line(1, -1, -3), m = meet(L1, L2); C.assert(ct(m) === '(2, -1)' && [-4, -1, 0, 2, 7].every((l) => on(pencil(L1, L2, l), m)), 'meeting point (2, -1) lies on L1 + lambda L2 for lambda of both signs'); C.key('c');
});
