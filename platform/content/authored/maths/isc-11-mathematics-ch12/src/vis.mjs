// Visuals for ISC 11 Mathematics ch12 Circles. Every number in a table or figure is computed here (closed formula and point tests) and asserted.
import { table, flow, plot as plot0 } from './lib.mjs';
import { Circle, fr, halves, relPos, relPosByRadii, contact, d2, sqTex, pt, genTex, solve2, range, dist2, P } from './circ.mjs';

const r = String.raw;
/** plot() that also marks 'free' points on_curve: false (the shared stage-4 lint needs the flag). */
const plot = (spec, alt, caption) => { const v = plot0(spec, alt, caption); (spec.pts ?? []).forEach((p, i) => { if (p[3] === 'free') v.spec.points[i].on_curve = false; }); return v; };
export const must = (cond, msg) => { if (!cond) throw new Error(`self-check failed: ${msg}`); };
export const V = {};
const M = (t) => `$${t}$`;
const dec = (x) => fr(x).tex();

// ================================================================ deck 1
V.route1 = flow('LR', [['a', 'Standard form and special positions'], ['b', 'General form: centre and radius'], ['c', 'Diameter and parametric forms'], ['d', 'Circle through three points'], ['e', 'Centre on a given line']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']], 'Route map of Part 1: the standard form and special positions, the general form with its centre and radius, the diameter and parametric forms, the circle through three points, and a circle whose centre lies on a given line.', 'Part 1 at a glance.');
V.goals1 = table(['You will be able to', 'Using', 'Key result'], [
  ['Write a circle from centre and radius', 'standard form', M(r`(x - h)^2 + (y - k)^2 = r^2`)],
  ['Read centre and radius from an equation', r`$g$, $f$, $c$`, M(r`(-g, -f), \quad \sqrt{g^2 + f^2 - c}`)],
  ['Write a circle on a given diameter', 'diameter form', M(r`(x - x_1)(x - x_2) + (y - y_1)(y - y_2) = 0`)],
  ['Use the parametric form', 'an angle $\\theta$', M(r`x = h + r\cos\theta, \; y = k + r\sin\theta`)],
  ['Find a circle from three points or a line', 'linear equations', 'solve for $D$, $E$, $F$ or for the centre'],
], 'Table of goals for Part 1: standard form from a centre and radius, centre and radius from an equation, a circle on a diameter, the parametric form, and a circle from three points or from a line containing its centre.', 'What Part 1 covers.');

// standard form
{
  const c = new Circle(-1, 2, 25);
  must(c.verify() && c.std() === '(x + 1)^2 + (y - 2)^2 = 25', 'standard circle');
  V.std = plot({ x: [-8, 6], y: [-5, 9], fns: halves(c), pts: [[-1, 2, '$C(-1, 2)$', 'free'], [3, 5, '$(3, 5)$'], [-4, -2, '$(-4, -2)$'], [-1, 7, '$(-1, 7)$']].map(([x, y, l, o]) => (o ? [x, y, l, o] : (must(c.on([fr(x), fr(y)]), 'pt on std'), [x, y, l]))) }, 'Plot of the circle with centre at minus 1, 2 and radius 5, drawn as an upper half and a lower half; the centre is marked and the points 3, 5 and minus 4, minus 2 and minus 1, 7 lie on the circle.', 'Every point is $5$ units from $C(-1, 2)$.');
}
// we1
{
  const c = Circle.centreThrough([-3, 4], [2, -8]);
  must(c.r2.eq(169) && d2(P(-3, 4), P(2, -8)).eq(25 + 144) && c.rad.eq(13) && c.gen() === 'x^2 + y^2 + 6x - 8y - 144 = 0' && c.verify(), 'we1');
  V.we1 = table(['Step', 'Work'], [['Centre', M(c.cen())], ['Radius squared', M(r`r^2 = (2 + 3)^2 + (-8 - 4)^2 = 25 + 144 = 169`)], ['Equation', M(c.std())], ['General form', M(c.gen())]], 'Worked example 1 table: the circle with centre minus 3, 4 through the point 2, minus 8 has radius squared 169, equation x plus 3 all squared plus y minus 4 all squared equals 169, and general form x squared plus y squared plus 6 x minus 8 y minus 144 equals 0.', 'Find $r^2$ from the centre and one point.');
}
// special positions
{
  const o = new Circle(0, 0, 36), tx = new Circle(4, -3, 9), ty = new Circle(5, 2, 25), tb = new Circle(-2, 2, 4), po = Circle.general(-6, 4, 0);
  must(o.rad.eq(6) && tx.rad.eq(3) && tx.k.abs().eq(tx.rad) && ty.h.abs().eq(ty.rad) && tb.h.abs().eq(tb.rad) && tb.k.abs().eq(tb.rad) && po.on([0, 0]) && po.F.isZero() && po.r2.eq(13) && [o, tx, ty, tb, po].every((c) => c.verify()), 'special positions');
  V.special = table(['Position', 'Radius', 'General equation', 'Example'], [
    ['Centre at the origin', '$r$', M(r`x^2 + y^2 = r^2`), M(o.std())],
    ['Touches the $x$-axis', r`$\lvert k \rvert$`, M(r`(x - h)^2 + (y - k)^2 = k^2`), M(tx.std())],
    ['Touches the $y$-axis', r`$\lvert h \rvert$`, M(r`(x - h)^2 + (y - k)^2 = h^2`), M(ty.std())],
    ['Touches both axes', r`$\lvert h \rvert = \lvert k \rvert$`, M(r`(x - h)^2 + (y - k)^2 = h^2`), M(tb.std())],
    ['Passes through the origin', r`$\sqrt{h^2 + k^2}$`, M(r`x^2 + y^2 + 2gx + 2fy = 0`), M(po.gen())],
  ], 'Table of special positions of a circle: centre at the origin, touching the x-axis, touching the y-axis, touching both axes, and passing through the origin, each with its radius, its equation and a worked example.', 'The distance from the centre to the axis equals $r$ when the circle touches it.');
}
// we2: touches x-axis at (3,0), through (0,9)
{
  const c = new Circle(3, 5, 25), k = range(-60, 60).filter((kk) => kk !== 0 && 9 + (9 - kk) ** 2 === kk * kk);
  must(k.join() === '5' && c.on([0, 9]) && c.on([3, 0]) && c.rad.eq(c.k) && c.verify(), 'we2');
  V.we2 = plot({ x: [-3, 9], y: [-2, 11], fns: halves(c), pts: [[3, 5, '$(3, 5)$', 'free'], [3, 0, '$(3, 0)$'], [0, 9, '$(0, 9)$'], [6, 9, '$(6, 9)$']] }, 'Plot of the circle with centre 3, 5 and radius 5; it touches the x-axis at 3, 0 and passes through 0, 9 and 6, 9.', 'Touches the $x$-axis at $(3, 0)$: centre $(3, k)$, $r = k$.');
}
// general form
{
  const c = Circle.general(-6, 4, -12);
  must(c.cen() === '(3, -2)' && c.r2.eq(25) && c.on([8, -2]) && c.verify(), 'gen');
  V.gen = table(['Step', 'Work'], [
    ['Compare with $x^2 + y^2 + 2gx + 2fy + c = 0$', M(r`2g = -6, \; 2f = 4, \; c = -12 \Rightarrow g = -3, \; f = 2`)],
    ['Centre', M(r`(-g, -f) = (3, -2)`)],
    ['Radius', M(r`r = \sqrt{g^2 + f^2 - c} = \sqrt{9 + 4 + 12} = 5`)],
    ['Check', M(r`(8, -2): \; 64 + 4 - 48 - 8 - 12 = 0`)],
  ], 'Table that reads the circle x squared plus y squared minus 6 x plus 4 y minus 12 equals 0: g is minus 3, f is 2, c is minus 12, so the centre is 3, minus 2 and the radius is the square root of 9 plus 4 plus 12, which is 5; the point 8, minus 2 checks.', 'Centre $(-g, -f)$, radius $\\sqrt{g^2 + f^2 - c}$.');
}
// we3: scaled
{
  const c = Circle.scaled(4, -16, 8, -5);
  must(c.cen() === '(2, -1)' && c.r2.eq(fr(25, 4)) && c.rad.eq(fr(5, 2)) && c.on([fr(9, 2), -1]) && c.verify(), 'we3');
  V.we3 = table(['Step', 'Work'], [
    ['Divide by the coefficient $4$', M(r`x^2 + y^2 - 4x + 2y - \dfrac{5}{4} = 0`)],
    ['Read $g$, $f$, $c$', M(r`g = -2, \; f = 1, \; c = -\dfrac{5}{4}`)],
    ['Centre', M(c.cen())],
    ['Radius', M(r`r^2 = 4 + 1 + \dfrac{5}{4} = \dfrac{25}{4} \Rightarrow r = \dfrac{5}{2}`)],
  ], 'Worked example 3 table: dividing 4 x squared plus 4 y squared minus 16 x plus 8 y minus 5 equals 0 by 4 gives x squared plus y squared minus 4 x plus 2 y minus five quarters equals 0, with centre 2, minus 1 and radius five halves.', 'Make the coefficients of $x^2$ and $y^2$ equal to $1$ first.');
}
// real-circle condition
{
  const ks = [-12, 4, 12, 13, 20];
  const rows = ks.map((k) => {
    const v = 13 - k, c = v > 0 ? Circle.general(-4, 6, k) : null;
    must(v === 4 + 9 - k && (c ? c.r2.eq(v) : true), 'k row');
    return [M(String(k)), M(String(v)), v > 0 ? `circle, $r = ${sqTex(v)}$` : v === 0 ? 'a single point $(2, -3)$' : 'no real point'];
  });
  must(Circle.general(-4, 6, -12).rad.eq(5) && Circle.general(-4, 6, 4).rad.eq(3) && Circle.general(-4, 6, 12).rad.eq(1), 'radii 5, 3, 1');
  V.realK = table(['$k$', r`$g^2 + f^2 - c$`, 'The equation represents'], rows, 'Table for x squared plus y squared minus 4 x plus 6 y plus k equals 0: g squared plus f squared minus c equals 13 minus k, so k of minus 12, 4 and 12 give circles of radius 5, 3 and 1, k equal to 13 gives a single point and k equal to 20 gives no real point.', 'A real circle needs $g^2 + f^2 - c > 0$.');
}
// we4: radius 9
{
  const c = Circle.general(-8, 10, -40);
  must(c.rad.eq(9) && 16 + 25 - (-40) === 81 && range(-200, 200).filter((k) => 16 + 25 - k === 81).join() === '-40' && c.verify(), 'we4');
  V.we4 = table(['Step', 'Work'], [['Read $g$, $f$, $c$', M(r`g = -4, \; f = 5, \; c = k`)], ['Radius condition', M(r`r^2 = g^2 + f^2 - c = 16 + 25 - k = 81`)], ['Solve', M(r`k = -40`)], ['Check', M(c.gen())]], 'Worked example 4 table: for x squared plus y squared minus 8 x plus 10 y plus k equals 0 to have radius 9, 16 plus 25 minus k must equal 81, so k is minus 40.', 'Set $g^2 + f^2 - c = r^2$.');
}
// diameter form
{
  const c = Circle.diameter([-3, 1], [9, 5]);
  must(c.cen() === '(3, 3)' && c.r2.eq(40) && c.on([-3, 1]) && c.on([9, 5]) && c.verify(), 'diameter circle');
  V.diam = plot({ x: [-6, 12], y: [-5, 11], fns: [...halves(c), { expr: '1+(x+3)/3', label: 'diameter', domain: [-3, 9] }], pts: [[3, 3, '$C(3, 3)$', 'free'], [-3, 1, '$A(-3, 1)$'], [9, 5, '$B(9, 5)$']] }, 'Plot of the circle on the segment from A minus 3, 1 to B 9, 5 as a diameter: the centre is the midpoint 3, 3, the radius squared is 40, and the diameter AB passes through the centre.', 'The centre is the midpoint of $AB$.');
}
// we5: diameter form
{
  const c = Circle.diameter([-5, 2], [3, -4]);
  must(c.gen() === 'x^2 + y^2 + 2x + 2y - 23 = 0' && c.cen() === '(-1, -1)' && c.r2.eq(25) && c.verify() && (-5 + 3) === -2 && (-5) * 3 === -15 && 2 + -4 === -2 && 2 * -4 === -8, 'we5');
  V.we5 = table(['Step', 'Work'], [['Diameter form', M(r`(x + 5)(x - 3) + (y - 2)(y + 4) = 0`)], ['Expand', M(r`x^2 + 2x - 15 + y^2 + 2y - 8 = 0`)], ['Equation', M(c.gen())], ['Check by the midpoint', M(r`C = (-1, -1), \; r^2 = 1 + 1 + 23 = 25`)]], 'Worked example 5 table: the diameter form with ends minus 5, 2 and 3, minus 4 gives x squared plus y squared plus 2 x plus 2 y minus 23 equals 0, and the midpoint method gives centre minus 1, minus 1 and radius squared 25.', 'Two routes, one circle.');
}
// parametric
{
  const c = new Circle(2, -1, 9), rows = [[0, '1', '0'], [90, '0', '1'], [180, '-1', '0'], [270, '0', '-1']].map(([deg, cs, sn]) => {
    const x = fr(2).add(fr(3).mul(cs)), y = fr(-1).add(fr(3).mul(sn));
    must(c.on([x, y]) && Math.abs(Math.cos((deg * Math.PI) / 180) - Number(cs)) < 1e-12 && Math.abs(Math.sin((deg * Math.PI) / 180) - Number(sn)) < 1e-12, 'param row');
    return [M(`${deg}^\\circ`), M(`2 + 3(${cs}) = ${x.tex()}`), M(`-1 + 3(${sn}) = ${y.tex()}`), M(pt(x, y))];
  });
  const px = fr(2).add(fr(3, 2)), py = fr(-1); // theta = 60: offset (3/2, 3 sqrt 3 / 2); squared offsets 9/4 + 27/4
  must(fr(3, 2).mul(fr(3, 2)).add(fr(27, 4)).eq(9) && px.eq(fr(7, 2)) && py.eq(-1), 'theta 60');
  rows.push([M(r`60^\circ`), M(r`2 + \dfrac{3}{2} = \dfrac{7}{2}`), M(r`-1 + \dfrac{3\sqrt{3}}{2}`), M(r`\left(\dfrac{7}{2}, -1 + \dfrac{3\sqrt{3}}{2}\right)`)]);
  V.param = table(['$\\theta$', r`$x = 2 + 3\cos\theta$`, r`$y = -1 + 3\sin\theta$`, 'Point'], rows, 'Table of points of the circle with centre 2, minus 1 and radius 3 for theta of 0, 90, 180, 270 and 60 degrees: 5, minus 1; 2, 2; minus 1, minus 1; 2, minus 4; and 7 over 2 with a surd; each satisfies x minus 2 all squared plus y plus 1 all squared equals 9.', 'Eliminate $\\theta$ with $\\cos^2\\theta + \\sin^2\\theta = 1$.');
}
// we6: parametric
{
  const c = new Circle(-1, 4, 36);
  must(c.gen() === 'x^2 + y^2 + 2x - 8y - 19 = 0' && fr(27).add(9).eq(36) && c.verify(), 'we6');
  V.we6 = table(['Step', 'Work'], [['Isolate the cosine and sine', M(r`\cos\theta = \dfrac{x + 1}{6}, \quad \sin\theta = \dfrac{y - 4}{6}`)], ['Use $\\cos^2\\theta + \\sin^2\\theta = 1$', M(c.std())], ['General form', M(c.gen())], [r`The point for $\theta = 30^\circ$`, M(r`(-1 + 3\sqrt{3}, \; 7)`)]], 'Worked example 6 table: x equals minus 1 plus 6 cosine theta and y equals 4 plus 6 sine theta give x plus 1 all squared plus y minus 4 all squared equals 36; for theta of 30 degrees the point is minus 1 plus 3 root 3, 7.', 'Centre $(-1, 4)$, radius $6$.');
}
// three points
{
  const c = Circle.three([3, 1], [6, -2], [-2, -2]);
  must(c.gen() === 'x^2 + y^2 - 4x + 6y - 4 = 0' && c.cen() === '(2, -3)' && c.r2.eq(17) && c.verify(), 'three points');
  const rows = [[3, 1], [6, -2], [-2, -2]].map(([x, y]) => {
    const s = x * x + y * y;
    must(s + -4 * x + 6 * y + -4 === 0, 'sub');
    const tm = (k, v, first) => `${k < 0 ? (first ? '-' : '- ') : (first ? '' : '+ ')}${Math.abs(k) === 1 ? '' : Math.abs(k)}${v}`;
    return [M(`(${x}, ${y})`), M(`${s} ${tm(x, 'D', false)} ${tm(y, 'E', false)} + F = 0`), M(`${tm(x, 'D', true)} ${tm(y, 'E', false)} + F = ${-s}`)];
  });
  rows.push(['Solve', M(r`D = -4, \; E = 6, \; F = -4`), M(c.gen())]);
  V.three = table(['Point', 'Substitute in $x^2 + y^2 + Dx + Ey + F = 0$', 'Equation'], rows, 'Table that substitutes the points 3, 1; 6, minus 2; and minus 2, minus 2 into x squared plus y squared plus D x plus E y plus F equals 0 to get three linear equations, whose solution is D minus 4, E 6, F minus 4.', 'Three points, three equations, three unknowns.');
}
// we7 plot
{
  const c = Circle.three([3, 1], [6, -2], [-2, -2]);
  V.we7 = plot({ x: [-5, 9], y: [-9, 4], fns: halves(c), pts: [[2, -3, '$C(2, -3)$', 'free'], [3, 1, '$A(3, 1)$'], [6, -2, '$B(6, -2)$'], [-2, -2, '$P(-2, -2)$']].map((p) => (p[3] ? p : (must(c.on([fr(p[0]), fr(p[1])]), 'we7 pt'), p))) }, 'Plot of the circle through the points 3, 1 and 6, minus 2 and minus 2, minus 2: centre 2, minus 3 and radius squared 17; all three points are marked on the upper half.', 'The circle through $A$, $B$ and $P$ has centre $(2, -3)$.');
}
// centre on a line
{
  const sol = solve2(1, -1, 2, 2, -1, 5), c = Circle.centreThrough(sol, [0, 4]);
  must(sol.map(String).join() === '3,1' && c.on([6, -2]) && c.r2.eq(18) && c.verify() && -12 * 1 + 12 * 1 === 0, 'centre on line');
  // equal distances: h^2 + (k - 4)^2 = (h - 6)^2 + (k + 2)^2  =>  12h - 12k = 24
  const lhs = (h, k) => d2(P(h, k), P(0, 4)).sub(d2(P(h, k), P(6, -2)));
  must(range(-6, 6).every((h) => range(-6, 6).every((k) => lhs(h, k).eq(12 * h - 12 * k - 24))) && lhs(3, 1).isZero() && lhs(5, 3).isZero() && !lhs(4, 1).isZero(), 'perpendicular bisector');
  V.line = table(['Step', 'Work for $A(0, 4)$, $B(6, -2)$ and the line $2x - y = 5$'], [['Centre on the line', M(r`2h - k = 5`)], ['Equal distances', M(r`h^2 + (k - 4)^2 = (h - 6)^2 + (k + 2)^2 \Rightarrow h - k = 2`)], ['Solve the two equations', M(r`h = 3, \; k = 1`)], ['Radius squared', M(r`r^2 = 9 + 9 = 18`)]], 'Table for a circle through A 0, 4 and B 6, minus 2 with its centre on the line 2 x minus y equals 5: the centre h, k satisfies 2 h minus k equals 5 and h minus k equals 2, so it is 3, 1 and the radius squared is 18.', 'The centre lies on the perpendicular bisector of $AB$ and on the line.');
}
// we8 plot
{
  const c = Circle.centreThrough([3, 1], [0, 4]);
  V.we8 = plot({ x: [-4, 10], y: [-8, 8], fns: [...halves(c), { expr: '2*x-5', label: 'line 2x - y = 5', domain: [-1, 6] }], pts: [[3, 1, '$C(3, 1)$', 'free'], [0, 4, '$A(0, 4)$'], [6, -2, '$B(6, -2)$']].map((p) => (p[3] || must(c.on([fr(p[0]), fr(p[1])]), 'we8 pt'), p)) }, 'Plot of the circle with centre 3, 1 and radius squared 18 through A 0, 4 and B 6, minus 2, with the line 2 x minus y equals 5 passing through the centre.', 'The centre $(3, 1)$ is on the line.');
}
V.sum1 = table(['Task', 'Method', 'Result'], [
  ['Centre and radius given', 'standard form', M(r`(x - h)^2 + (y - k)^2 = r^2`)],
  ['General equation given', 'read $g$, $f$, $c$', M(r`(-g, -f), \; r^2 = g^2 + f^2 - c`)],
  ['Ends of a diameter given', 'diameter form or midpoint', M(r`(x - x_1)(x - x_2) + (y - y_1)(y - y_2) = 0`)],
  ['Three points given', 'solve for $D$, $E$, $F$', 'three linear equations'],
  ['Centre on a line', 'equal distances plus the line', 'two linear equations for $h$, $k$'],
], 'Summary table for Part 1: standard form, reading the general equation, the diameter form, solving for D, E and F from three points, and using equal distances with the line when the centre lies on a line.', 'Choose the method from the data given.');
V.tips1 = table(['Marks', 'Show'], [['2', 'the centre, then $r^2$, then the equation'], ['3', 'the three equations for $D$, $E$, $F$ and their solution'], ['5, in parts', 'general form, centre and radius, and a check by substituting a given point']], 'Table of exam tips for Part 1: for 2 marks show the centre, the radius squared and the equation; for 3 marks show the three equations for D, E and F and their solution; for 5 marks set in parts show the general form, the centre and radius, and a substitution check.', 'Always substitute a given point to check.');

// ================================================================ deck 2
V.route2 = flow('LR', [['a', 'Intercepts on the axes'], ['b', 'Touching an axis'], ['c', 'Two circles: relative positions'], ['d', 'External and internal contact'], ['e', 'Circles of a given radius that touch']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']], 'Route map of Part 2: intercepts on the axes, a circle touching an axis, the relative positions of two circles, external and internal contact, and circles of a given radius that touch a given circle.', 'Part 2 at a glance.');
V.goals2 = table(['You will be able to', 'Using', 'Key result'], [
  ['Find where a circle meets an axis', 'put $y = 0$ or $x = 0$', r`$x^2 + 2gx + c = 0$`],
  ['Find the length of an intercept', 'the discriminant', M(r`2\sqrt{g^2 - c}, \quad 2\sqrt{f^2 - c}`)],
  ['Decide how two circles lie', r`$d$ against $r_1 + r_2$ and $\lvert r_1 - r_2 \rvert$`, 'five cases'],
  ['Find the point of contact', 'ratio $r_1 : r_2$', 'section formula'],
  ['Find circles that touch a given circle', r`$d = r_1 + r_2$ or $\lvert r_1 - r_2 \rvert$`, 'solve for the centre'],
], 'Table of goals for Part 2: intercepts on the axes, the length of an intercept from the discriminant, the five relative positions of two circles, the point of contact from the ratio of the radii, and circles of a given radius touching a given circle.', 'What Part 2 covers.');
// intercepts plot
{
  const c = new Circle(4, 1, 65), xc = c.xCut(), yc = c.yCut();
  must(c.gen() === 'x^2 + y^2 - 8x - 2y - 48 = 0' && xc.roots.map(String).join() === '-4,12' && yc.roots.map(String).join() === '-6,8' && c.on([-4, 0]) && c.on([12, 0]) && c.on([0, -6]) && c.on([0, 8]) && c.verify(), 'intercept circle');
  V.icpt = plot({ x: [-7, 15], y: [-9, 11], fns: halves(c), pts: [[4, 1, '$C(4, 1)$', 'free'], [-4, 0, '$(-4, 0)$'], [12, 0, '$(12, 0)$'], [0, -6, '$(0, -6)$'], [0, 8, '$(0, 8)$']] }, 'Plot of the circle with centre 4, 1 and radius squared 65: it meets the x-axis at minus 4, 0 and 12, 0, and the y-axis at 0, minus 6 and 0, 8.', 'Put $y = 0$ for the $x$-intercepts, $x = 0$ for the $y$-intercepts.');
}
// we1 d2
{
  const c = new Circle(4, 1, 65), xc = c.xCut(), yc = c.yCut();
  must(xc.disc.eq(256) && yc.disc.eq(196) && 12 - -4 === 16 && 8 - -6 === 14, 'we1 d2');
  V.we1d2 = table(['Step', 'Work for ' + M(c.gen())], [['Meet the $x$-axis ($y = 0$)', M(r`x^2 - 8x - 48 = 0 \Rightarrow (x - 12)(x + 4) = 0`)], ['$x$-intercepts', M(r`x = 12 \text{ and } x = -4`) + ', length $16$'], ['Meet the $y$-axis ($x = 0$)', M(r`y^2 - 2y - 48 = 0 \Rightarrow (y - 8)(y + 6) = 0`)], ['$y$-intercepts', M(r`y = 8 \text{ and } y = -6`) + ', length $14$']], 'Worked example 1 table: the circle x squared plus y squared minus 8 x minus 2 y minus 48 equals 0 meets the x-axis where x is 12 or minus 4, an intercept of length 16, and the y-axis where y is 8 or minus 6, an intercept of length 14.', 'The intercept is the distance between the two roots.');
}
// touching axis table
{
  const A = Circle.general(-6, -4, 9), B = Circle.general(-8, -2, -48), C = Circle.general(-4, -6, 9);
  const cls = (v) => (v.sign() > 0 ? 'cuts' : v.isZero() ? 'touches' : 'misses');
  const row = (c) => { const gx = c.g.mul(c.g).sub(c.F), fy = c.f.mul(c.f).sub(c.F); must(gx.eq(c.xCut().disc.div(4)) && fy.eq(c.yCut().disc.div(4)), 'g2 - c equals disc/4'); return [M(c.gen()), M(gx.tex()), M(fy.tex()), `${cls(gx)} the $x$-axis`, `${cls(fy)} the $y$-axis`]; };
  const rows = [A, B, C].map(row);
  must(cls(A.g.mul(A.g).sub(A.F)) === 'touches' && cls(A.f.mul(A.f).sub(A.F)) === 'misses' && cls(C.g.mul(C.g).sub(C.F)) === 'misses' && cls(C.f.mul(C.f).sub(C.F)) === 'touches' && A.cen() === '(3, 2)' && A.rad.eq(2) && C.cen() === '(2, 3)' && C.rad.eq(2), 'touch classes');
  V.touch = table(['Circle', '$g^2 - c$', '$f^2 - c$', 'On the $x$-axis', 'On the $y$-axis'], rows, 'Table of three circles with g squared minus c and f squared minus c: a positive value means the circle cuts that axis, zero means it touches it, and a negative value means it misses it; the first circle touches the x-axis, the second cuts both, and the third touches the y-axis.', r`Intercept length $= 2\sqrt{g^2 - c}$ on the $x$-axis, $2\sqrt{f^2 - c}$ on the $y$-axis.`);
}
// we2 d2: origin with intercepts 10 and -4
{
  const c = Circle.general(-10, 4, 0);
  must(c.cen() === '(5, -2)' && c.r2.eq(29) && c.on([0, 0]) && c.on([10, 0]) && c.on([0, -4]) && c.xCut().roots.map(String).join() === '0,10' && c.yCut().roots.map(String).join() === '-4,0' && c.verify(), 'we2 d2');
  V.we2d2 = plot({ x: [-3, 13], y: [-9, 5], fns: halves(c), pts: [[5, -2, '$C(5, -2)$', 'free'], [0, 0, '$O(0, 0)$'], [10, 0, '$(10, 0)$'], [0, -4, '$(0, -4)$']] }, 'Plot of the circle through the origin that cuts off an intercept of 10 on the positive x-axis and 4 on the negative y-axis: centre 5, minus 2, radius squared 29, passing through 0, 0; 10, 0 and 0, minus 4.', 'Through the origin: $c = 0$, so $x^2 + y^2 + 2gx + 2fy = 0$.');
}
// relative positions
{
  const c1 = new Circle(0, 0, 25), rows = [[10, 'apart'], [8, 'external'], [6, 'cross'], [2, 'internal'], [1, 'inside']].map(([d, kind]) => {
    const c2 = new Circle(d, 0, 9);
    must(relPos(c1, c2) === kind && relPosByRadii(c1, c2) === kind && dist2(c1, c2).eq(d * d), `rel ${d}`);
    const sum = 8, df = 2;
    const cmp = d > sum ? `$d > ${sum}$` : d === sum ? `$d = ${sum}$` : d > df ? `$${df} < d < ${sum}$` : d === df ? `$d = ${df}$` : `$d < ${df}$`;
    const name = { apart: 'lie apart (no common point)', external: 'touch externally (one point)', cross: 'intersect at two points', internal: 'touch internally (one point)', inside: 'one lies inside the other' }[kind];
    return [M(String(d)), cmp, name];
  });
  V.rel = table([r`$d$ for $r_1 = 5$, $r_2 = 3$`, 'Comparison with $r_1 + r_2 = 8$ and $r_1 - r_2 = 2$', 'The circles'], rows, 'Table of the five relative positions of two circles of radii 5 and 3 whose centres are d apart: d of 10 means they lie apart, 8 external touching, 6 two intersection points, 2 internal touching, and 1 one circle inside the other.', 'Compare $d$ with $r_1 + r_2$ and $\\lvert r_1 - r_2 \\rvert$.');
}
// external plot and we3
const E1 = new Circle(-2, 1, 25), E2 = new Circle(7, 13, 100);
{
  const p = contact(E1, E2);
  must(p.map(String).join() === '1,5' && E1.gen() === 'x^2 + y^2 + 4x - 2y - 20 = 0' && E2.gen() === 'x^2 + y^2 - 14x - 26y + 118 = 0' && dist2(E1, E2).eq(225) && relPos(E1, E2) === 'external' && E1.verify() && E2.verify(), 'external pair');
  V.ext = plot({ x: [-9, 19], y: [-6, 26], fns: [...halves(E1, false), ...halves(E2, false), { expr: '1+4*(x+2)/3', label: 'line of centres', domain: [-2, 7] }], pts: [[-2, 1, '$C_1(-2, 1)$'], [7, 13, '$C_2(7, 13)$'], [1, 5, '$T(1, 5)$']] }, 'Plot of two circles that touch externally at T 1, 5: the first has centre minus 2, 1 and radius 5, the second has centre 7, 13 and radius 10, and the line of centres passes through the point of contact.', 'The point of contact lies on the line of centres.');
  V.we3d2 = table(['Step', 'Work'], [
    [r`First circle: $g = 2, f = -1, c = -20$`, M(r`C_1 = (-2, 1), \; r_1 = \sqrt{4 + 1 + 20} = 5`)],
    [r`Second circle: $g = -7, f = -13, c = 118$`, M(r`C_2 = (7, 13), \; r_2 = \sqrt{49 + 169 - 118} = 10`)],
    ['Distance between centres', M(r`d = \sqrt{9^2 + 12^2} = 15 = r_1 + r_2`)],
    ['Conclusion', 'the circles touch externally'],
    ['Point of contact', M(r`\left(\dfrac{5 \times 7 + 10 \times (-2)}{15}, \dfrac{5 \times 13 + 10 \times 1}{15}\right) = (1, 5)`)],
  ], 'Worked example 3 table: the circles x squared plus y squared plus 4 x minus 2 y minus 20 equals 0 and x squared plus y squared minus 14 x minus 26 y plus 118 equals 0 have radii 5 and 10, centres 15 apart, so they touch externally at 1, 5.', 'Radii $5$ and $10$, $d = 15$.');
}
// internal contact table and we4 plot
const I1 = new Circle(1, -2, 225), I2 = new Circle(4, 2, 100);
{
  const p = contact(I1, I2);
  must(p.map(String).join() === '10,10' && relPos(I1, I2) === 'internal' && dist2(I1, I2).eq(25) && I1.gen() === 'x^2 + y^2 - 2x + 4y - 220 = 0' && I2.gen() === 'x^2 + y^2 - 8x - 4y - 80 = 0' && I1.verify() && I2.verify(), 'internal pair');
  const ext = contact(E1, E2), exX = fr(5 * 7 + 10 * -2, 15), exY = fr(5 * 13 + 10, 15), inX = fr(15 * 4 - 10 * 1, 5), inY = fr(15 * 2 - 10 * -2, 5);
  must(exX.eq(ext[0]) && exY.eq(ext[1]) && inX.eq(p[0]) && inY.eq(p[1]), 'section formula');
  V.contact = table(['Contact', 'Condition', 'Point of contact', 'Example'], [
    ['External', r`$d = r_1 + r_2$`, M(r`\left(\dfrac{r_1 x_2 + r_2 x_1}{r_1 + r_2}, \dfrac{r_1 y_2 + r_2 y_1}{r_1 + r_2}\right)`), M(pt(exX, exY))],
    ['Internal', r`$d = \lvert r_1 - r_2 \rvert$`, M(r`\left(\dfrac{r_1 x_2 - r_2 x_1}{r_1 - r_2}, \dfrac{r_1 y_2 - r_2 y_1}{r_1 - r_2}\right)`), M(pt(inX, inY))],
  ], 'Table of the point of contact of two touching circles: for external contact the contact point divides the line of centres internally in the ratio r one to r two, giving 1, 5 in the example; for internal contact it divides it externally in that ratio, giving 10, 10.', 'External: divides $C_1C_2$ internally; internal: externally.');
  V.we4d2 = plot({ x: [-16, 18], y: [-19, 15], fns: [...halves(I1, false), ...halves(I2, false)], pts: [[1, -2, '$C_1(1, -2)$'], [4, 2, '$C_2(4, 2)$'], [10, 10, '$T(10, 10)$']].map((q, i) => (i < 2 ? [q[0], q[1], q[2], 'free'] : q)) }, 'Plot of two circles that touch internally at T 10, 10: the larger has centre 1, minus 2 and radius 15, the smaller has centre 4, 2 and radius 10, and their centres are 5 apart.', 'Radii $15$ and $10$, $d = 5$.');
}
// method: circles of a given radius touching
{
  const C = new Circle(3, 4, 4), sols = range(-30, 30).filter((t) => dist2(C, new Circle(t, 0, 9)).eq(25)), none = range(-30, 30).filter((t) => dist2(C, new Circle(t, 0, 9)).eq(1));
  must(sols.join() === '0,6' && none.length === 0 && relPos(C, new Circle(0, 0, 9)) === 'external' && relPos(C, new Circle(6, 0, 9)) === 'external' && C.gen() === 'x^2 + y^2 - 6x - 8y + 21 = 0', 'touching radius 3');
  V.method = table(['Step', 'Example: the circle ' + M(C.gen()) + ' and radius $3$ with centre $(t, 0)$'], [['Radius of the given circle', M(r`r_1 = \sqrt{9 + 16 - 21} = 2`)], ['External contact needs', M(r`d = 2 + 3 = 5`)], ['Distance from the centre', M(r`(t - 3)^2 + 4^2 = 25 \Rightarrow t = 0 \text{ or } 6`)], ['Internal contact needs', M(r`d = 3 - 2 = 1`)], ['But the distance is at least', M(r`4 > 1`) + ', so no internal contact']], 'Table of the method for circles of a given radius that touch a given circle: the given circle has radius 2; a circle of radius 3 with centre t, 0 touching it externally needs centres 5 apart, so t is 0 or 6; touching internally needs centres 1 apart, which is impossible because the centre is at least 4 away.', 'Set $d$ equal to $r_1 + r_2$ or $\\lvert r_1 - r_2 \\rvert$.');
  V.we5d2 = plot({ x: [-5, 10], y: [-4, 8], fns: [...halves(C, false), ...halves(new Circle(0, 0, 9), false), ...halves(new Circle(6, 0, 9), false)], pts: [[3, 4, '$(3, 4)$', 'free'], [0, 0, '$(0, 0)$', 'free'], [6, 0, '$(6, 0)$', 'free']] }, 'Plot of the circle with centre 3, 4 and radius 2 together with the two circles of radius 3 whose centres 0, 0 and 6, 0 lie on the x-axis; each touches the first circle externally.', 'Two circles of radius $3$ touch it externally.');
}
// we6 d2: touches y-axis at (0,4), through (4,12)
{
  const c = new Circle(10, 4, 100), h = range(-60, 60).filter((hh) => hh !== 0 && (hh - 4) ** 2 + 64 === hh * hh);
  must(h.join() === '10' && c.on([0, 4]) && c.on([4, 12]) && c.h.eq(c.rad) && c.gen() === 'x^2 + y^2 - 20x - 8y + 16 = 0' && c.verify(), 'we6 d2');
  V.we6d2 = plot({ x: [-4, 22], y: [-8, 16], fns: halves(c), pts: [[10, 4, '$C(10, 4)$', 'free'], [0, 4, '$(0, 4)$'], [4, 12, '$(4, 12)$']] }, 'Plot of the circle that touches the y-axis at 0, 4 and passes through 4, 12: centre 10, 4 and radius 10.', 'Touches the $y$-axis at $(0, 4)$: centre $(h, 4)$, $r = h$.');
}
V.sum2 = table(['Question', 'Method'], [
  ['Intercepts on the axes', r`$y = 0$ gives $x^2 + 2gx + c = 0$; $x = 0$ gives $y^2 + 2fy + c = 0$`],
  ['Length of an intercept', M(r`2\sqrt{g^2 - c} \text{ or } 2\sqrt{f^2 - c}`)],
  ['Touching an axis', r`$g^2 = c$ ($x$-axis) or $f^2 = c$ ($y$-axis)`],
  ['Two circles', r`compare $d$ with $r_1 + r_2$ and $\lvert r_1 - r_2 \rvert$`],
  ['Point of contact', 'divide the line of centres in the ratio of the radii'],
], 'Summary table for Part 2: intercepts from y equals 0 and x equals 0, the length of an intercept from the square root of g squared minus c or f squared minus c, touching an axis when g squared or f squared equals c, comparing d with the sum and difference of the radii, and dividing the line of centres for the point of contact.', 'The discriminant tells how a circle meets an axis.');
V.tips2 = table(['Marks', 'Show'], [['2', 'the radii, the distance $d$ and the comparison'], ['3', 'the equation in $x$ or $y$, its roots or discriminant, and the conclusion'], ['5, in parts', 'both centres and radii, $d$, the type of contact and the point of contact']], 'Table of exam tips for Part 2: for 2 marks show the radii, the distance between centres and the comparison; for 3 marks show the equation in x or y with its roots or discriminant and the conclusion; for 5 marks show both centres and radii, the distance, the type of contact and the point of contact.', 'State which case you have found.');
