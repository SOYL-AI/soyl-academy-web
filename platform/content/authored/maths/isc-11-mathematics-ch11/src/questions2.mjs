// ISC 11 Mathematics ch11 Straight Lines - true-false, fill-in-the-blank, numerical and 2-mark short items.
import { Q, mk } from './lib.mjs';
import { r, P, K, F, Fr, pt, ct, tx, eqTex, yTex, line, on, val, join, through, meet, mid, slope, slopeOf, divide, divideExt, cutRatio, area, collinear, shiftLine, shiftPt, bisectors, pencil, lamThrough, angleBetween, dist, distParallel, normalForm, byIntercepts, xInt, yInt, interceptTex, isParallel, isPerp, perpThrough, d2, surdOver, must } from './geo.mjs';

// ============================================================ true-false
Q('tf1', mk.tf({ stem: r`The three points $(-3, 7)$, $(1, -1)$ and $(4, -7)$ lie on one straight line.`, key: 't', sol: r`The slope from the first to the second point is $\dfrac{-1 - 7}{1 + 3} = -2$, and from the second to the third it is $\dfrac{-7 + 1}{4 - 1} = -2$. Equal slopes through the shared point $(1, -1)$ mean one line. The area is $0$, too.`, d: 2, c: 'understanding', t: [1] }), (C) => {
  const A = P(-3, 7), B = P(1, -1), D = P(4, -7);
  C.assert(collinear(A, B, D) && slope(A, B).eq(-2) && slope(B, D).eq(-2) && area(A, B, D).isZero(), 'slopes -2 and -2, area 0'); C.key('t');
});
Q('tf2', mk.tf({ stem: r`When the origin is moved to a new point and the axes are kept parallel to the old ones, the slope of a given line changes.`, key: 'f', sol: r`The new axes have the same directions, so every line keeps its inclination and its slope. Only the intercepts and the constant term change: $ax + by + c = 0$ becomes $aX + bY + (ah + bk + c) = 0$ with the same $a$ and $b$.`, d: 2, c: 'understanding', t: [1] }), (C) => {
  const L = line(3, -2, 5), s = shiftLine(L, 4, -1);
  C.assert(slopeOf(s.N).eq(slopeOf(L)) && s.raw[0] === 3 && s.raw[1] === -2, 'a and b unchanged, so the slope 3/2 is unchanged'); C.key('f');
});
Q('tf3', mk.tf({ stem: r`The two bisectors of the angles formed by a pair of intersecting lines are perpendicular to each other.`, key: 't', sol: r`The two lines make two supplementary angles, $\theta$ and $180^\circ - \theta$. Their bisectors make $\dfrac{\theta}{2}$ and $90^\circ - \dfrac{\theta}{2}$ with a line, so the angle between the bisectors is $\dfrac{\theta}{2} + 90^\circ - \dfrac{\theta}{2} = 90^\circ$. For example the bisectors of $x + y - 4 = 0$ and $x - y - 2 = 0$ are $y = 1$ and $x = 3$.`, d: 2, c: 'understanding', t: [4] }), (C) => {
  const bs = bisectors(line(1, 1, -4), line(1, -1, -2)); C.assert(isPerp(bs.plus, bs.minus) && K(bs.plus) === K(line(0, 1, -1)) && K(bs.minus) === K(line(1, 0, -3)), 'bisectors y = 1 and x = 3 are perpendicular'); C.key('t');
});
Q('tf4', mk.tf({ stem: r`The set of all points whose perpendicular distance from the line $3x + 4y - 10 = 0$ equals $2$ units is a single straight line.`, key: 'f', sol: r`A point can be $2$ units away on either side of the line, so the locus is a pair of parallel lines: $\dfrac{|3x + 4y - 10|}{5} = 2$ gives $3x + 4y - 10 = \pm 10$, that is $3x + 4y = 0$ and $3x + 4y - 20 = 0$.`, d: 3, c: 'analysis', t: [5] }), (C) => {
  const L = line(3, 4, -10), A = line(3, 4, 0), B = line(3, 4, -20);
  C.assert(dist(L, pt(0, 0)).value === 2 && dist(L, pt(4, 2)).rational.eq(2) && on(A, pt(0, 0)) && on(B, pt(4, 2)) && K(A) !== K(B) && isParallel(A, B), 'two parallel lines, each at distance 2'); C.key('f');
});
Q('tf5', mk.tf({ stem: r`Every straight line in the plane can be written in the intercept form $\dfrac{x}{a} + \dfrac{y}{b} = 1$.`, key: 'f', sol: r`The form needs non-zero intercepts on both axes. A line through the origin, such as $y = 2x$, has both intercepts zero, and a line parallel to an axis, such as $x = 5$, never meets the other axis. Neither can be written as $\dfrac{x}{a} + \dfrac{y}{b} = 1$.`, d: 2, c: 'understanding', t: [3] }), (C) => {
  const Lo = line(2, -1, 0), Lv = line(1, 0, -5); C.assert(xInt(Lo).isZero() && yInt(Lo).isZero() && yInt(Lv) === null, 'y = 2x has zero intercepts; x = 5 has no y-intercept'); C.key('f');
});

// ============================================================ fill-blank
Q('fb1', mk.fill({ stem: r`The point that divides the segment from $(1, -2)$ to $(7, 10)$ internally in the ratio $2 : 1$ has $y$-coordinate ____.`, acc: [['6']], sol: r`$y = \dfrac{2 \times 10 + 1 \times (-2)}{2 + 1} = \dfrac{18}{3} = 6$.`, d: 2, c: 'understanding', t: [1] }), (C) => {
  const p = divide(P(1, -2), P(7, 10), 2, 1); C.assert(ct(p) === '(5, 6)', 'P = (5, 6)'); C.blank(p[1].num());
});
Q('fb2', mk.fill({ stem: r`The member of the family $(x + y - 5) + \lambda(2x - y - 1) = 0$ that passes through the origin has $\lambda =$ ____.`, acc: [['-5']], sol: r`At the origin: $(0 + 0 - 5) + \lambda(0 - 0 - 1) = 0$, so $-5 - \lambda = 0$ and $\lambda = -5$.`, d: 2, c: 'understanding', t: [5] }), (C) => {
  const L1 = line(1, 1, -5), L2 = line(2, -1, -1), lam = lamThrough(L1, L2, pt(0, 0)); C.assert(lam.eq(-5) && on(pencil(L1, L2, lam), pt(0, 0)), 'lambda = -5'); C.blank(lam.num());
});
Q('fb3', mk.fill({ stem: r`A line is drawn at right angles to $7x - 3y + 2 = 0$. Its slope equals ____.`, acc: [['-3/7']], sol: r`The given line has slope $\dfrac{7}{3}$, and perpendicular slopes multiply to $-1$, so the required slope is $-\dfrac{3}{7}$, which is $-3/7$.`, d: 2, c: 'understanding', t: [2] }), (C) => {
  const L = line(7, -3, 2), m = slopeOf(L), q = F(-1).div(m); C.assert(m.eq(F(7, 3)) && q.eq(F(-3, 7)), 'slope -3/7'); C.blank(q.num());
});
Q('fb4', mk.fill({ stem: r`The distance of the origin from the line $8x + 15y - 68 = 0$ is ____ units.`, acc: [['4']], sol: r`$\dfrac{|-68|}{\sqrt{64 + 225}} = \dfrac{68}{17} = 4$.`, d: 2, c: 'understanding', t: [4] }), (C) => {
  const d = dist(line(8, 15, -68), pt(0, 0)); C.assert(d.rational.eq(4), 'distance 4'); C.blank(4);
});
Q('fb5', mk.fill({ stem: r`The line $7x - 2y = 14$ meets the $y$-axis at $y =$ ____.`, acc: [['-7']], sol: r`Put $x = 0$: $-2y = 14$, so $y = -7$.`, d: 2, c: 'understanding', t: [3] }), (C) => {
  const L = line(7, -2, -14); C.assert(yInt(L).eq(-7) && on(L, pt(0, -7)), 'y-intercept -7'); C.blank(-7);
});

// ============================================================ numerical
Q('n1', mk.num({ stem: r`A triangular plot has its corners at $A(-3, 1)$, $B(5, -2)$ and $C(2, 6)$ on a coordinate grid. Calculate the area of the plot in square units.`, value: 27.5, tol: 0, unit: null, sol: r`Area $= \dfrac{1}{2}\left|(-3)(-2 - 6) + 5(6 - 1) + 2(1 + 2)\right| = \dfrac{1}{2}\left|24 + 25 + 6\right| = \dfrac{55}{2} = 27.5$ square units.`, scheme: [['Area $= \\dfrac{1}{2}|\\ldots|$ with the three terms', 1]], d: 2, c: 'understanding', t: [1], time: 90 }), (C) => {
  const a = area(P(-3, 1), P(5, -2), P(2, 6)); C.assert(a.eq(F(55, 2)), 'area 55/2'); C.val(a.num());
});
Q('n2', mk.num({ stem: r`The point $Q$ lies on the line $AB$ beyond $B$, where $A$ is $(1, -3)$ and $B$ is $(7, 6)$, and $AQ : QB = 5 : 2$. Find the $y$-coordinate of $Q$.`, value: 12, tol: 0, unit: null, sol: r`Beyond $B$ the division is external: $y = \dfrac{5 \times 6 - 2 \times (-3)}{5 - 2} = \dfrac{36}{3} = 12$.`, scheme: [['External section formula applied to $y$', 1]], d: 3, c: 'application', t: [1], time: 100 }), (C) => {
  const q = divideExt(P(1, -3), P(7, 6), 5, 2); C.assert(ct(q) === '(11, 12)', 'Q = (11, 12)'); C.val(q[1].num());
});
Q('n3', mk.num({ stem: r`Let $\theta$ be the acute angle between the lines $3x - 4y + 7 = 0$ and $2x + y - 5 = 0$. Find the value of $\tan\theta$.`, value: 5.5, tol: 0, unit: null, sol: r`The slopes are $\dfrac{3}{4}$ and $-2$. $\tan\theta = \left|\dfrac{\frac{3}{4} + 2}{1 - \frac{3}{2}}\right| = \dfrac{11/4}{1/2} = \dfrac{11}{2} = 5.5$.`, scheme: [['Both slopes found and substituted', 1]], d: 3, c: 'application', t: [2], time: 100 }), (C) => {
  const ab = angleBetween(line(3, -4, 7), line(2, 1, -5)); C.assert(ab.tan.eq(F(11, 2)), 'tan = 11/2'); C.val(ab.tan.num());
});
Q('n4', mk.num({ stem: r`The line $5x + 4y = 40$ cuts the axes at two points, and these with the origin form a triangle. Calculate the area of that triangle in square units.`, value: 40, tol: 0, unit: null, sol: r`In intercept form $\dfrac{x}{8} + \dfrac{y}{10} = 1$, so the intercepts are $8$ and $10$. Area $= \dfrac{1}{2} \times 8 \times 10 = 40$ square units.`, scheme: [['Intercepts $8$ and $10$ found, area $\\dfrac{1}{2}ab$', 1]], d: 3, c: 'application', t: [3], time: 90 }), (C) => {
  const L = line(5, 4, -40), a = area(pt(0, 0), pt(xInt(L), 0), pt(0, yInt(L))); C.assert(xInt(L).eq(8) && yInt(L).eq(10) && a.eq(40), 'intercepts 8 and 10, area 40'); C.val(a.num());
});
Q('n5', mk.num({ stem: r`Find the perpendicular distance, in units, of the point $(-1, 4)$ from the line through $(2, 0)$ and $(-2, 3)$.`, value: 1.4, tol: 0, unit: null, sol: r`The line through the two points has slope $\dfrac{3 - 0}{-2 - 2} = -\dfrac{3}{4}$: $y = -\dfrac{3}{4}(x - 2)$, that is $3x + 4y - 6 = 0$. The distance is $\dfrac{|-3 + 16 - 6|}{5} = \dfrac{7}{5} = 1.4$.`, scheme: [['Equation of the line', 1]], d: 3, c: 'application', t: [4], time: 110 }), (C) => {
  const L = join(P(2, 0), P(-2, 3)), d = dist(L, pt(-1, 4)); C.assert(K(L) === K(line(3, 4, -6)) && d.rational.eq(F(7, 5)), 'line 3x + 4y - 6 = 0, distance 7/5'); C.val(d.rational.num());
});
Q('n6', mk.num({ stem: r`The line $(3x - 2y - 7) + \lambda(x + y - 1) = 0$ is parallel to the $x$-axis. Find $\lambda$.`, value: -3, tol: 0, unit: null, sol: r`Collect the terms: $(3 + \lambda)x + (-2 + \lambda)y - 7 - \lambda = 0$. A line parallel to the $x$-axis has no $x$ term, so $3 + \lambda = 0$ and $\lambda = -3$; the line is then $5y + 4 = 0$ after changing signs.`, scheme: [['Coefficient of $x$ set to zero', 1]], d: 3, c: 'application', t: [5], time: 90 }), (C) => {
  const L1 = line(3, -2, -7), L2 = line(1, 1, -1), N = pencil(L1, L2, -3); C.assert(N.a === 0 && N.b === 5 && N.c === 4 && on(N, meet(L1, L2)), 'lambda = -3 gives 5y + 4 = 0 through the meeting point'); C.val(-3);
});

// ============================================================ short, 2 marks
{
  const A = P(-3, 5), B = P(6, -1), q = divideExt(A, B, 4, 1);
  Q('s201', mk.short({ stem: r`Find the coordinates of the point $R$ that divides the join of $P(-3, 5)$ and $Q(6, -1)$ externally in the ratio $4 : 1$.`, marks: 2, model: r`External division: $R = \left(\dfrac{4 \times 6 - 1 \times (-3)}{4 - 1}, \dfrac{4 \times (-1) - 1 \times 5}{4 - 1}\right)$ (1 mark).\n$R = \left(\dfrac{27}{3}, \dfrac{-9}{3}\right) = ${ct(q)}$ (1 mark).`, sol: r`Use the external section formula with $m - n$ in the denominator.`, scheme: [['Substitution in the external formula', 1], ['$R = (9, -3)$', 1]], d: 2, c: 'understanding', t: [1], time: 120 }), (C) => {
    C.assert(ct(q) === '(9, -3)' && d2(A, q).eq(d2(q, B).mul(16)), 'R = (9, -3) with PR = 4 RQ'); C.model([27, 9, 3]);
  });
}
{
  const A = P(-1, 4), B = P(5, -2), L = line(1, -1, 0), cr = cutRatio(A, B, L);
  Q('s202', mk.short({ stem: r`In what ratio does the line $y = x$ divide the segment joining $A(-1, 4)$ and $B(5, -2)$? Find the point of division.`, marks: 2, model: r`Let the line divide $AB$ in the ratio $k : 1$. The point is $\left(\dfrac{5k - 1}{k + 1}, \dfrac{-2k + 4}{k + 1}\right)$. It lies on $y = x$, so $5k - 1 = -2k + 4$ and $k = \dfrac{5}{7}$ (1 mark).\nThe ratio is $5 : 7$ internally and the point is $\left(\dfrac{3}{2}, \dfrac{3}{2}\right)$ (1 mark).`, sol: r`Equate the two coordinates of the dividing point.`, scheme: [['$k$ from $x = y$', 1], ['Ratio and the point', 1]], d: 2, c: 'understanding', t: [1], time: 120 }), (C) => {
    C.assert(cr.internal && cr.lam.eq(F(5, 7)) && ct(cr.P) === '(\\dfrac{3}{2}, \\dfrac{3}{2})', 'ratio 5:7, point (3/2, 3/2)'); C.model([5, 7, 3, 2]);
  });
}
{
  const B = P(1, 3), D = P(4, 7), kk = -1, A = P(-2, kk);
  Q('s203', mk.short({ stem: r`Find $k$ if the points $A(-2, k)$, $B(1, 3)$ and $C(4, 7)$ are collinear, using the area of the triangle they form.`, marks: 2, model: r`Collinear points form a triangle of zero area: $\dfrac{1}{2}\left|-2(3 - 7) + 1(7 - k) + 4(k - 3)\right| = 0$ (1 mark).\n$8 + 7 - k + 4k - 12 = 0$, so $3k + 3 = 0$ and $k = -1$ (1 mark).`, sol: r`Set the determinant to zero and solve the linear equation.`, scheme: [['Area expression set to zero', 1], ['$k = -1$', 1]], d: 2, c: 'understanding', t: [1], time: 120 }), (C) => {
    C.assert(collinear(A, B, D) && !collinear(P(-2, 0), B, D), 'k = -1 makes the area 0'); C.model([8, 7, 12, 3, 1]);
  });
}
{
  const L1 = line(2, -1, 3), L2 = line(3, 1, -4), ab = angleBetween(L1, L2);
  Q('s204', mk.short({ stem: r`Show that the acute angle between the lines $2x - y + 3 = 0$ and $3x + y - 4 = 0$ is $45^\circ$.`, marks: 2, model: r`The slopes are $m_1 = 2$ and $m_2 = -3$ (1 mark).\n$\tan\theta = \left|\dfrac{2 - (-3)}{1 + 2(-3)}\right| = \left|\dfrac{5}{-5}\right| = 1$, so $\theta = 45^\circ$ (1 mark).`, sol: r`Use the angle formula with the absolute value.`, scheme: [['Slopes $2$ and $-3$', 1], ['$\\tan\\theta = 1$, $\\theta = 45^\\circ$', 1]], d: 2, c: 'understanding', t: [2], time: 100 }), (C) => {
    C.assert(ab.tan.eq(1) && Math.abs(ab.acute - 45) < 1e-9, 'tan = 1, 45 degrees'); C.model([2, 3, 5, 1, 45]);
  });
}
{
  const L = line(3, -2, 5), kk = 11, p = P(kk, -1), q = P(2, 5), M = join(p, q);
  Q('s205', mk.short({ stem: r`The line through $A(k, -1)$ and $B(2, 5)$ is perpendicular to the line $3x - 2y + 5 = 0$. Find $k$.`, marks: 2, model: r`The given line has slope $\dfrac{3}{2}$, so $AB$ must have slope $-\dfrac{2}{3}$ (1 mark).\n$\dfrac{5 + 1}{2 - k} = -\dfrac{2}{3}$ gives $2 - k = -9$, so $k = 11$ (1 mark).`, sol: r`Equate the slope of $AB$ to the negative reciprocal.`, scheme: [['Required slope $-\\dfrac{2}{3}$', 1], ['$k = 11$', 1]], d: 3, c: 'application', t: [2], time: 120 }), (C) => {
    C.assert(isPerp(M, L) && slope(p, q).eq(F(-2, 3)), 'k = 11'); C.model([3, 2, 5, 9, 11]);
  });
}
{
  const L = line(4, -5, 20), ic = interceptTex(L);
  Q('s206', mk.short({ stem: r`Write the line $4x - 5y + 20 = 0$ in intercept form and state its intercepts on the two axes.`, marks: 2, model: r`$4x - 5y = -20$; divide by $-20$: $\dfrac{x}{-5} + \dfrac{y}{4} = 1$ (1 mark).\nThe $x$-intercept is $-5$ and the $y$-intercept is $4$ (1 mark).`, sol: r`Move the constant to the right and divide so that the right side is $1$.`, scheme: [['Intercept form', 1], ['Both intercepts', 1]], d: 2, c: 'understanding', t: [3], time: 100 }), (C) => {
    C.assert(xInt(L).eq(-5) && yInt(L).eq(4) && ic === r`\dfrac{x}{-5} + \dfrac{y}{4} = 1` && K(byIntercepts(-5, 4)) === K(L), 'intercepts -5 and 4'); C.model([20, 5, 4]);
  });
}
{
  const A = P(5, -4), B = P(-3, 2), L = join(A, B);
  Q('s207', mk.short({ stem: r`Find the equation of the straight line through $A(5, -4)$ and $B(-3, 2)$, in the form $ax + by + c = 0$.`, marks: 2, model: r`Slope $= \dfrac{2 - (-4)}{-3 - 5} = -\dfrac{3}{4}$ (1 mark).\n$y + 4 = -\dfrac{3}{4}(x - 5)$, so $4y + 16 = -3x + 15$ and the line is $3x + 4y + 1 = 0$ (1 mark).`, sol: r`Slope first, then point-slope form with either point.`, scheme: [['Slope of $AB$', 1], ['Equation $3x + 4y + 1 = 0$', 1]], d: 2, c: 'understanding', t: [3], time: 100 }), (C) => {
    C.assert(K(L) === K(line(3, 4, 1)) && on(L, A) && on(L, B), '3x + 4y + 1 = 0'); C.model([4, 3, 16, 15, 1]);
  });
}
{
  const L = line(5, -2, 3), p0 = P(2, -1), d = dist(L, p0);
  Q('s208', mk.short({ stem: r`Find the perpendicular distance of the point $(2, -1)$ from the line $5x - 2y + 3 = 0$. Leave the answer as a surd with a rational denominator.`, marks: 2, model: r`$d = \dfrac{|5(2) - 2(-1) + 3|}{\sqrt{5^2 + (-2)^2}} = \dfrac{15}{\sqrt{29}}$ (1 mark).\n$d = \dfrac{15\sqrt{29}}{29}$ units (1 mark).`, sol: r`Substitute in the distance formula, then rationalise.`, scheme: [['Substitution', 1], ['Rationalised value', 1]], d: 2, c: 'understanding', t: [4], time: 100 }), (C) => {
    C.assert(val(L, p0).eq(15) && d.r2 === 29 && d.tex === r`\dfrac{15\sqrt{29}}{29}` && Math.abs(d.value - 15 / Math.sqrt(29)) < 1e-12, 'distance 15 / sqrt(29)'); C.model([15, 29]);
  });
}
{
  const L1 = line(2, -1, 4), L2 = line(2, -1, -6), dp = distParallel(L1, L2);
  Q('s209', mk.short({ stem: r`Find the distance between the parallel lines $2x - y + 4 = 0$ and $2x - y - 6 = 0$, leaving the answer as a surd in simplest form.`, marks: 2, model: r`Both lines have $a = 2$, $b = -1$, so $d = \dfrac{|4 - (-6)|}{\sqrt{2^2 + 1^2}}$ (1 mark).\n$d = \dfrac{10}{\sqrt{5}} = 2\sqrt{5}$ units (1 mark).`, sol: r`The coefficients already match, so use the constants directly.`, scheme: [['Formula with $|c_1 - c_2|$', 1], ['$2\\sqrt{5}$', 1]], d: 2, c: 'understanding', t: [4], time: 100 }), (C) => {
    C.assert(dp.diff.eq(10) && dp.r2 === 5 && dp.tex === r`2\sqrt{5}` && Math.abs(dp.value - 2 * Math.sqrt(5)) < 1e-12, 'distance 2 sqrt 5'); C.model([4, 6, 10, 5, 2]);
  });
}
{
  const L1 = line(2, 1, -6), L2 = line(1, -2, 2), m = meet(L1, L2), lam = lamThrough(L1, L2, pt(0, 0)), N = pencil(L1, L2, lam);
  Q('s210', mk.short({ stem: r`Find the equation of the line through the origin and through the point where $2x + y - 6 = 0$ meets $x - 2y + 2 = 0$.`, marks: 2, model: r`A line through the intersection: $(2x + y - 6) + \lambda(x - 2y + 2) = 0$. It passes through $(0, 0)$ when $-6 + 2\lambda = 0$, so $\lambda = 3$ (1 mark).\nThen $5x - 5y = 0$, that is $x - y = 0$ (1 mark).`, sol: r`Use the family of lines through the intersection and fix $\lambda$ from the origin.`, scheme: [['$\\lambda = 3$', 1], ['Line $x - y = 0$', 1]], d: 3, c: 'application', t: [5], time: 120 }), (C) => {
    C.assert(ct(m) === '(2, 2)' && lam.eq(3) && K(N) === K(line(1, -1, 0)), 'meeting point (2, 2), lambda 3, line x - y = 0'); C.model([6, 2, 3, 5]);
  });
}
