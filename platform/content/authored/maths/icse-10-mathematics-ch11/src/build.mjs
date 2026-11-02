// Build ICSE 10 Mathematics ch11 Reflection. Run from platform/:
//   npx tsx content/authored/maths/icse-10-mathematics-ch11/src/build.mjs
// Every image point on the slides, in the notes, tables and plots is computed by refl.mjs (coordinate rule
// AND perpendicular-bisector or midpoint definition), every invariant point by the rule AND "on the mirror",
// every area by the shoelace formula AND Pick's theorem, every figure name from parallel sides, equal sides
// and right angles; every typed working line is checked by work.mjs; every plotted point is a vertex of a
// drawn segment or lies on a drawn mirror, and its label is generated from its coordinates.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, topic, deck, sl, table, flow, plot, build, chapterTests, r } from './lib.mjs';
import { pt, img, path as walk, imgAll, X, Y, O, vx, hy, onMirror, mirrorsOf, singleFor, dist, dist2, area, perimeter, classify, same, mid, ct, lab, must } from './refl.mjs';
import { steps, ARITH, eqctx, solvectx } from './work.mjs';

setUnit('icse-10-mathematics-ch11');
await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const S = (ctx, lines, msg) => steps(ctx, lines).must(msg);
const A = (lines, msg) => S(ARITH, lines, msg);
const pn = (v) => (v < 0 ? `(${v})` : `${v}`);
const tw = (a, v) => r`2 \times ${pn(a)} - ${pn(v)} = ${2 * a - v}`;
const d = (s) => `$${s}$`;
const P = (x, y) => pt(x, y);
const is = (p, q) => same(p, pt(q[0], q[1]));
const cP = (name, p) => `$${name}${ct(p)}$`;
const ORIGIN = P(0, 0);

/**
 * A coordinate figure: labelled points, segments and polygons as line series, mirror lines as dashed
 * vlines/hlines. Every marked point must be a vertex of a drawn segment or lie on a drawn mirror; labels are
 * generated from the coordinates.
 */
function fig({ x, y, pts = [], segs = [], mirrors = [] }, alt, caption) {
  for (const [name, p] of pts) must(segs.some(([, ps]) => ps.some((q) => same(q, p))) || mirrors.some((m) => onMirror(m, p)), `figure point ${name} is drawn`);
  const v = plot({ x, y, xl: 'x', yl: 'y', pts: pts.map(([name, p]) => [p[0], p[1], lab(name, p)]), series: segs.map(([label, ps, closed]) => ({ label, points: (closed ? [...ps, ps[0]] : ps).map((p) => [p[0], p[1]]), kind: 'line' })) }, alt, caption);
  const vl = mirrors.filter((m) => m.kind === 'v'), hl = mirrors.filter((m) => m.kind === 'h');
  if (vl.length) v.spec.vlines = vl.map((m) => ({ x: m.a, label: m.a === 0 ? 'mirror: y-axis' : `mirror $x = ${m.a}$`, dashed: true }));
  if (hl.length) v.spec.hlines = hl.map((m) => ({ y: m.b, label: m.b === 0 ? 'mirror: x-axis' : `mirror $y = ${m.b}$`, dashed: true }));
  return v;
}
/** Signed area (orientation) of a triangle. */
const orient = ([a, b, c]) => Math.sign((b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]));

// ---------------------------------------------------------------- deck 1 figures and worked examples (asserted)
// Title: a triangle and its image in the y-axis
const tri0 = [P(1, 2), P(4, 1), P(3, 5)], tri0i = imgAll(Y, tri0);
const fTitle = fig({ x: [-6, 6], y: [-1, 6], pts: [['A', tri0[0]], ['B', tri0[1]], ['C', tri0[2]], ["A'", tri0i[0]], ["B'", tri0i[1]], ["C'", tri0i[2]]], segs: [['triangle ABC', tri0, true], ["image A′B′C′", tri0i, true]], mirrors: [Y] }, 'A triangle ABC with vertices at (1, 2), (4, 1) and (3, 5) to the right of the y-axis, and its mirror image A′B′C′ at (−1, 2), (−4, 1) and (−3, 5) to the left of the y-axis.', 'Each vertex of the image is as far behind the mirror as the vertex is in front of it.');
must(tri0i.every((q, i) => q[0] === -tri0[i][0] && q[1] === tri0[i][1]), 'title images');

// What a reflection does: P(4, 3) in y = 1
const p3 = P(4, 3), p3i = img(hy(1), p3), m3 = mid(p3, p3i);
must(is(p3i, [4, -1]) && is(m3, [4, 1]) && dist(p3, m3) === 2 && dist(m3, p3i) === 2, 'what a reflection does');
const fWhat = fig({ x: [-1, 7], y: [-3, 5], pts: [['P', p3], ["P'", p3i], ['M', m3]], segs: [["PP′", [p3, m3, p3i]]], mirrors: [hy(1)] }, 'A point P at (4, 3) above a dashed mirror line y = 1, and its image P′ at (4, −1) below it. The segment PP′ is vertical, crosses the mirror at right angles at M (4, 1), and M is 2 units from each end.', 'The mirror is the perpendicular bisector of $PP\'$: $PM = MP\' = 2$.');

// Reflection in the x-axis and in the y-axis: A(2, 3), B(-4, 1), C(5, -2)
const abc = [P(2, 3), P(-4, 1), P(5, -2)], abcX = imgAll(X, abc), abcY = imgAll(Y, abc), nm3 = ['A', 'B', 'C'];
const fX = fig({ x: [-6, 7], y: [-4, 4], pts: abc.flatMap((p, i) => [[nm3[i], p], [`${nm3[i]}'`, abcX[i]]]), segs: abc.map((p, i) => [`${nm3[i]}${nm3[i]}′`, [p, abcX[i]]]) }, 'Three points A (2, 3), B (−4, 1) and C (5, −2) joined by vertical segments to their images in the x-axis: A′ (2, −3), B′ (−4, −1) and C′ (5, 2). Each segment is cut in half by the x-axis.', 'In the $x$-axis: same $x$-coordinate, opposite $y$-coordinate.');
const fY = fig({ x: [-6, 6], y: [-3, 4], pts: abc.flatMap((p, i) => [[nm3[i], p], [`${nm3[i]}'`, abcY[i]]]), segs: abc.map((p, i) => [`${nm3[i]}${nm3[i]}′`, [p, abcY[i]]]) }, 'The same three points A (2, 3), B (−4, 1) and C (5, −2) joined by horizontal segments to their images in the y-axis: A′ (−2, 3), B′ (4, 1) and C′ (−5, −2). Each segment is cut in half by the y-axis.', 'In the $y$-axis: opposite $x$-coordinate, same $y$-coordinate.');
must(abcX.every((q, i) => is(q, [abc[i][0], -abc[i][1]])) && abcY.every((q, i) => is(q, [-abc[i][0], abc[i][1]])), 'axis rules');

// WE1: A(-5, 2), B(0, -3) in both axes
const we1 = [['A', P(-5, 2)], ['B', P(0, -3)]];
const tWE1 = table(['Point', 'Image in the $x$-axis', 'Image in the $y$-axis'], we1.map(([n, p]) => [cP(n, p), d(ct(img(X, p))), same(img(Y, p), p) ? `${d(ct(img(Y, p)))} (invariant)` : d(ct(img(Y, p)))]), 'Table for worked example 1: A (−5, 2) has image (−5, −2) in the x-axis and (5, 2) in the y-axis; B (0, −3) has image (0, 3) in the x-axis and stays at (0, −3) in the y-axis, because it lies on the y-axis.', 'A point on the mirror does not move.');
must(is(img(X, we1[0][1]), [-5, -2]) && is(img(Y, we1[0][1]), [5, 2]) && is(img(X, we1[1][1]), [0, 3]) && same(img(Y, we1[1][1]), we1[1][1]), 'WE1 values');

// Reflection in the origin: P(3, 2)
const po = P(3, 2), poi = img(O, po);
must(is(poi, [-3, -2]) && same(mid(po, poi), ORIGIN) && same(walk(po, X, Y)[2], poi), 'origin rule');
const fO = fig({ x: [-5, 5], y: [-4, 4], pts: [['P', po], ["P'", poi], ['O', ORIGIN]], segs: [["PP′ through O", [po, ORIGIN, poi]]] }, 'A point P at (3, 2) and its image P′ at (−3, −2) under reflection in the origin. The segment PP′ passes through the origin O, which is its midpoint.', 'The origin is the midpoint of $PP\'$.');

// WE2: image in the y-axis is (-6, -1)
const we2i = P(-6, -1), we2p = img(Y, we2i), we2o = img(O, we2p);
must(is(we2p, [6, -1]) && same(img(Y, we2p), we2i) && is(we2o, [-6, 1]), 'WE2 values');
const fWE2 = fig({ x: [-8, 8], y: [-3, 3], pts: [["P'", we2i], ['P', we2p], ['Q', we2o]], segs: [["P′P", [we2i, we2p]], ['PQ through O', [we2p, ORIGIN, we2o]]] }, 'Worked example 2: the given image P′ (−6, −1), the point P (6, −1) found by reflecting it back in the y-axis, and Q (−6, 1), the image of P in the origin; the segment PQ passes through the origin.', 'Reflect the image back to find the point; then change both signs.');

// Reflection in x = a: mirror x = 2, P(5, 3), Q(0, -2)
const mA = vx(2), pa = [P(5, 3), P(0, -2)], pai = imgAll(mA, pa);
must(is(pai[0], [-1, 3]) && is(pai[1], [4, -2]), 'x = 2 images');
const wXa = S({ consts: {}, free: ['a', 'x'], sols: [], labels: {} }, [r`a - (x - a) = 2a - x`], 'x = a identity');
const wXa2 = A([tw(2, 5), tw(2, 0)], 'x = 2 lines');
const fXa = fig({ x: [-3, 7], y: [-4, 5], pts: [['P', pa[0]], ["P'", pai[0]], ['Q', pa[1]], ["Q'", pai[1]]], segs: [["PP′", [pa[0], pai[0]]], ["QQ′", [pa[1], pai[1]]]], mirrors: [mA] }, 'A dashed vertical mirror x = 2. P (5, 3) is 3 units to its right and its image P′ (−1, 3) is 3 units to its left; Q (0, −2) is 2 units to its left and its image Q′ (4, −2) is 2 units to its right.', 'Same distance on each side of $x = 2$; the $y$-coordinate is kept.');

// Reflection in y = b: mirror y = -1, P(2, 3), Q(-3, -2)
const mB = hy(-1), pb = [P(2, 3), P(-3, -2)], pbi = imgAll(mB, pb);
must(is(pbi[0], [2, -5]) && is(pbi[1], [-3, 0]), 'y = −1 images');
const wYb = A([tw(-1, 3), tw(-1, -2)], 'y = −1 lines');
const fYb = fig({ x: [-5, 5], y: [-6, 4], pts: [['P', pb[0]], ["P'", pbi[0]], ['Q', pb[1]], ["Q'", pbi[1]]], segs: [["PP′", [pb[0], pbi[0]]], ["QQ′", [pb[1], pbi[1]]]], mirrors: [mB] }, 'A dashed horizontal mirror y = −1. P (2, 3) is 4 units above it and its image P′ (2, −5) is 4 units below; Q (−3, −2) is 1 unit below it and its image Q′ (−3, 0) is 1 unit above.', 'Same distance above and below $y = -1$; the $x$-coordinate is kept.');

// WE3: R(7, -2) in x = 3 and in y = 1
const r3 = P(7, -2), r3a = img(vx(3), r3), r3b = img(hy(1), r3);
const w3 = A([tw(3, 7), tw(1, -2)], 'WE3 lines');
must(is(r3a, [-1, -2]) && is(r3b, [7, 4]), 'WE3 values');
const fWE3 = fig({ x: [-3, 9], y: [-4, 6], pts: [['R', r3], ["R'", r3a], ['R″', r3b]], segs: [["RR′", [r3, r3a]], ['RR″', [r3, r3b]]], mirrors: [vx(3), hy(1)] }, 'Worked example 3: R (7, −2) with its image R′ (−1, −2) in the dashed vertical mirror x = 3, joined by a horizontal segment, and its image R″ (7, 4) in the dashed horizontal mirror y = 1, joined by a vertical segment.', 'A vertical mirror moves the point sideways; a horizontal mirror moves it up or down.');

// WE4: find the mirror
const m4a = mirrorsOf(P(-1, 6), P(-1, -2)), m4b = mirrorsOf(P(5, 4), P(-3, 4));
const w4 = A([r`\dfrac{6 + (-2)}{2} = 2`, r`\dfrac{5 + (-3)}{2} = 1`], 'WE4 lines');
must(m4a.length === 1 && m4a[0].eq === 'y = 2' && m4b.length === 1 && m4b[0].eq === 'x = 1', 'WE4 mirrors');
const fWE4 = fig({ x: [-5, 7], y: [-3, 7], pts: [['P', P(-1, 6)], ["P'", P(-1, -2)], ['Q', P(5, 4)], ["Q'", P(-3, 4)]], segs: [["PP′", [P(-1, 6), P(-1, -2)]], ["QQ′", [P(5, 4), P(-3, 4)]]], mirrors: [m4a[0], m4b[0]] }, 'Worked example 4: the vertical segment from P (−1, 6) to P′ (−1, −2) is bisected by the dashed horizontal mirror y = 2, and the horizontal segment from Q (5, 4) to Q′ (−3, 4) is bisected by the dashed vertical mirror x = 1.', 'The mirror passes through the midpoint of the segment, at right angles to it.');

// WE5: image of (2a - 3, 5) in the y-axis is (-7, b + 2)
const w5 = S(solvectx(['a', 'b'], { a: 5, b: 3 }), [r`3 - 2a = -7 \Rightarrow 2a = 10 \Rightarrow a = 5`, r`b + 2 = 5 \Rightarrow b = 3`], 'WE5');
must(is(img(Y, P(2 * 5 - 3, 5)), [-7, 3 + 2]), 'WE5 substituted back');
const fWE5 = flow('LR', [['a', 'Write the image by the rule'], ['b', 'Equate the $x$-coordinates'], ['c', 'Equate the $y$-coordinates'], ['e', 'Substitute back to check']], [['a', 'b'], ['b', 'c'], ['c', 'e']], 'Flow chart for unknown coordinates: write the image of the given point using the reflection rule, set its x-coordinate equal to the given x-coordinate, set its y-coordinate equal to the given y-coordinate, then substitute the values back to check.', 'Two equal points have equal $x$-coordinates and equal $y$-coordinates.');

// All five rules (example point (4, -3))
const ex5 = P(4, -3);
const rules = [[X, '$(x, y) \\to (x, -y)$', 'every point of the $x$-axis'], [Y, '$(x, y) \\to (-x, y)$', 'every point of the $y$-axis'], [O, '$(x, y) \\to (-x, -y)$', 'only the origin'], [vx(1), '$(x, y) \\to (2a - x, y)$ with $a = 1$', 'every point with $x = 1$'], [hy(2), '$(x, y) \\to (x, 2b - y)$ with $b = 2$', 'every point with $y = 2$']];
const tRules = table(['Mirror', 'Rule', 'Invariant points', `Image of ${d(ct(ex5))}`], rules.map(([m, rule, inv]) => [m.tex.replace(/^the /, ''), rule, inv, d(ct(img(m, ex5)))]), 'Table of the five reflections with the image of the point (4, −3): in the x-axis (4, 3); in the y-axis (−4, −3); in the origin (−4, 3); in the line x = 1, (−2, −3); in the line y = 2, (4, 7). The x-axis, the y-axis and the lines keep every point on them fixed; the origin keeps only itself fixed.', 'Five rules, one example point.');
must(['4,3', '-4,-3', '-4,3', '-2,-3', '4,7'].join('|') === rules.map(([m]) => img(m, ex5).join()).join('|'), 'rules table images');

// Summary: P(3, 2) and its images in the axes and the origin form a rectangle
const ps = P(3, 2), psq = [ps, img(X, ps), img(O, ps), img(Y, ps)];
must(classify(psq) === 'rectangle' && area(psq) === 24, 'summary rectangle');
const fSum1 = fig({ x: [-5, 5], y: [-4, 4], pts: [['P', psq[0]], ['Pₓ', psq[1]], ['Pₒ', psq[2]], ['Pᵧ', psq[3]]], segs: [['P and its three images', psq, true]] }, 'The point P (3, 2) with its images in the x-axis (3, −2), the origin (−3, −2) and the y-axis (−3, 2); the four points are the corners of a rectangle centred on the origin.', 'One point, three images: the corners of a rectangle.');

// ---------------------------------------------------------------- deck 2 figures and worked examples (asserted)
// Title: a flag and its image in the y-axis
const pole = [P(2, 0), P(2, 5)], flag = [P(2, 5), P(5, 4), P(2, 3)], poleI = imgAll(Y, pole), flagI = imgAll(Y, flag);
const fTitle2 = fig({ x: [-6, 6], y: [-1, 6], pts: [['F', flag[1]], ["F'", flagI[1]]], segs: [['flag', [...pole, ...flag.slice(1)]], ['image', [...poleI, ...flagI.slice(1)]]], mirrors: [Y] }, 'A flag on a pole to the right of the y-axis, with its tip F at (5, 4), and its mirror image to the left with the tip F′ at (−5, 4). The image flag points the other way.', 'A reflected figure is the same size and shape, but faces the other way.');
must(is(flagI[1], [-5, 4]), 'flag tip');

// Invariant points: mirror y = -2
const mI = hy(-2), u = P(-3, -2), v = P(2, -2), w = P(1, 1), wi = img(mI, w);
must(same(img(mI, u), u) && same(img(mI, v), v) && is(wi, [1, -5]), 'invariant points');
const fInv = fig({ x: [-5, 5], y: [-6, 3], pts: [['U', u], ['V', v], ['W', w], ["W'", wi]], segs: [["WW′", [w, wi]]], mirrors: [mI] }, 'A dashed mirror y = −2 with two points U (−3, −2) and V (2, −2) on it, which stay where they are, and a point W (1, 1) above it that moves to W′ (1, −5) below it.', 'Points on the mirror are invariant; every other point moves.');

// WE1 (deck 2): invariant points
const set1 = { A: P(3, 0), B: P(0, -2), C: P(-2, 5), D: P(-2, -2) };
const fixed = (m) => Object.entries(set1).filter(([, p]) => same(img(m, p), p)).map(([k]) => k);
const mirrors1 = [X, Y, vx(-2), hy(-2)];
must(mirrors1.map((m) => fixed(m).join('')).join('|') === 'A|B|CD|BD', 'deck 2 WE1 invariant sets');
const tInv = table(['Mirror', 'Invariant points', 'Reason'], mirrors1.map((m) => [m.tex.replace(/^the /, ''), fixed(m).map((k) => d(k)).join(' and '), m.kind === 'v' ? `$x$-coordinate $${m.a}$` : `$y$-coordinate $${m.b}$`]), 'Table for worked example 1 of part 2: under the x-axis only A is invariant; under the y-axis only B; under the line x = −2 the points C and D; under the line y = −2 the points B and D. D is invariant under both lines.', '$D(-2, -2)$ lies on both $x = -2$ and $y = -2$.');

// Two reflections: P(4, 2) in the x-axis then the y-axis
const pc = walk(P(4, 2), X, Y);
must(same(pc[2], img(O, pc[0])) && same(walk(pc[0], Y, X)[2], pc[2]) && singleFor(X, Y).eq === 'O', 'combination = origin');
const fComb = fig({ x: [-6, 6], y: [-4, 4], pts: [['P', pc[0]], ['P_1', pc[1]], ['P_2', pc[2]], ['O', ORIGIN]], segs: [['in the x-axis, then in the y-axis', pc], ['in the origin', [pc[0], ORIGIN, pc[2]]]] }, 'The point P (4, 2) is reflected in the x-axis to P1 (4, −2) and then in the y-axis to P2 (−4, −2). A straight segment from P through the origin also reaches P2, showing that the two reflections together equal reflection in the origin.', 'Two axis reflections, one after the other, equal one reflection in the origin.');

// WE2 (deck 2): P(3, -5) in y = 1 then the y-axis, and in the other order
const pw = walk(P(3, -5), hy(1), Y), pw2 = walk(P(3, -5), Y, hy(1));
const w22 = A([tw(1, -5)], 'deck 2 WE2');
must(is(pw[1], [3, 7]) && is(pw[2], [-3, 7]) && is(pw2[1], [-3, -5]) && same(pw2[2], pw[2]), 'deck 2 WE2 values');
const fWE22 = fig({ x: [-5, 5], y: [-6, 8], pts: [['P', pw[0]], ['P_1', pw[1]], ['P_2', pw[2]], ['Q', pw2[1]]], segs: [['y = 1 first', pw], ['y-axis first', pw2]], mirrors: [hy(1), Y] }, 'Worked example 2 of part 2: P (3, −5) goes to P1 (3, 7) in the line y = 1 and then to P2 (−3, 7) in the y-axis. Taking the y-axis first sends P to Q (−3, −5), and then the line y = 1 sends Q to the same point P2.', 'For two perpendicular mirrors the order does not matter.');

// Reflecting a figure: triangle K, L, M in x = 1
const klm = [P(2, 1), P(5, 2), P(3, 4)], klmI = imgAll(vx(1), klm);
const side2 = (t) => t.map((p, i) => dist2(p, t[(i + 1) % 3]));
must(side2(klm).join() === side2(klmI).join() && area(klm) === area(klmI) && orient(klm) === -orient(klmI), 'congruent, orientation reversed');
must(klmI.map((q) => q.join()).join('|') === '0,1|-3,2|-1,4', 'figure images');
const fFig = fig({ x: [-4, 6], y: [-1, 5], pts: [['K', klm[0]], ['L', klm[1]], ['M', klm[2]], ["K'", klmI[0]], ["L'", klmI[1]], ["M'", klmI[2]]], segs: [['triangle KLM', klm, true], ['image K′L′M′', klmI, true]], mirrors: [vx(1)] }, 'Triangle KLM with K (2, 1), L (5, 2) and M (3, 4), and its image K′ (0, 1), L′ (−3, 2), M′ (−1, 4) in the dashed mirror x = 1. The two triangles have the same side lengths but face opposite ways.', 'Reflect every vertex, then join the images in the same order.');

// WE3 (deck 2): A(5, 2) and its images in the y-axis, origin, x-axis
const a3 = P(5, 2), rect3 = [a3, img(Y, a3), img(O, a3), img(X, a3)];
const w23 = A([r`5 - (-5) = 10`, r`2 - (-2) = 4`, r`10 \times 4 = 40`, r`2 \times (10 + 4) = 28`], 'deck 2 WE3');
must(classify(rect3) === 'rectangle' && area(rect3) === 40 && perimeter(rect3) === 28, 'deck 2 WE3');
const fWE23 = fig({ x: [-7, 7], y: [-4, 4], pts: [['A', rect3[0]], ['B', rect3[1]], ['C', rect3[2]], ['D', rect3[3]]], segs: [['ABCD', rect3, true]] }, 'Worked example 3 of part 2: A (5, 2) with B (−5, 2), its image in the y-axis, C (−5, −2), its image in the origin, and D (5, −2), its image in the x-axis. ABCD is a rectangle 10 units wide and 4 units tall.', '$ABCD$ is a rectangle: $10 \\times 4 = 40$ square units.');

// WE4 (deck 2): segment A(1, 4), B(3, 1) in x = 5: isosceles trapezium
const s4 = [P(1, 4), P(3, 1)], s4i = imgAll(vx(5), s4), trap4 = [s4[0], s4[1], s4i[1], s4i[0]];
const w24 = A([tw(5, 1), tw(5, 3), r`9 - 1 = 8`, r`7 - 3 = 4`, r`4 - 1 = 3`, r`\dfrac{1}{2} \times (8 + 4) \times 3 = 18`], 'deck 2 WE4');
must(is(s4i[0], [9, 4]) && is(s4i[1], [7, 1]) && classify(trap4) === 'isosceles trapezium' && area(trap4) === 18, 'deck 2 WE4');
const fWE24 = fig({ x: [-1, 11], y: [-1, 6], pts: [['A', s4[0]], ['B', s4[1]], ["B'", s4i[1]], ["A'", s4i[0]]], segs: [["ABB′A′", trap4, true]], mirrors: [vx(5)] }, 'Worked example 4 of part 2: the segment from A (1, 4) to B (3, 1) and its image from A′ (9, 4) to B′ (7, 1) in the dashed mirror x = 5. Together they form a trapezium with horizontal parallel sides AA′ of length 8 and BB′ of length 4, 3 units apart.', 'Parallel sides $8$ and $4$, height $3$: area $18$ square units.');

// Naming flow
const fName = flow('TB', [['q1', 'Both pairs of opposite sides parallel?'], ['q2', 'All angles right angles?'], ['q3', 'Exactly one pair parallel?'], ['sq', 'All sides equal: square; otherwise rectangle'], ['rh', 'All sides equal: rhombus; otherwise parallelogram'], ['tr', 'Trapezium (isosceles if the other two sides are equal)'], ['ki', 'Two pairs of equal adjacent sides: kite']], [['q1', 'q2', 'yes'], ['q2', 'sq', 'yes'], ['q2', 'rh', 'no'], ['q1', 'q3', 'no'], ['q3', 'tr', 'yes'], ['q3', 'ki', 'no']], 'Flow chart for naming a quadrilateral: if both pairs of opposite sides are parallel, check for right angles, giving a square or rectangle, or else a rhombus or parallelogram, depending on whether all sides are equal; if exactly one pair is parallel it is a trapezium, isosceles if the other two sides are equal; otherwise look for two pairs of equal adjacent sides, which make a kite.', 'Horizontal and vertical sides on graph paper make parallel sides and right angles easy to see.');

// WE5 (deck 2): kite from A(-1, 2) in x = 2 with B(2, 6), D(2, -1) on the mirror
const k5 = [P(-1, 2), P(2, 6), img(vx(2), P(-1, 2)), P(2, -1)];
const w25 = A([tw(2, -1), r`\sqrt{3^2 + 4^2} = 5`, r`5 - (-1) = 6`, r`6 - (-1) = 7`, r`\dfrac{1}{2} \times 6 \times 7 = 21`], 'deck 2 WE5');
must(is(k5[2], [5, 2]) && same(img(vx(2), k5[1]), k5[1]) && same(img(vx(2), k5[3]), k5[3]) && classify(k5) === 'kite' && area(k5) === 21 && dist(k5[0], k5[1]) === 5 && dist(k5[1], k5[2]) === 5 && dist2(k5[2], k5[3]) === 18, 'deck 2 WE5');
const fWE25 = fig({ x: [-3, 7], y: [-2, 7], pts: [['A', k5[0]], ['B', k5[1]], ['C', k5[2]], ['D', k5[3]]], segs: [['ABCD', k5, true], ['AC', [k5[0], k5[2]]]], mirrors: [vx(2)] }, 'Worked example 5 of part 2: A (−1, 2) and its image C (5, 2) in the dashed mirror x = 2, with B (2, 6) and D (2, −1) on the mirror. ABCD is a kite whose diagonal BD lies along the mirror and is perpendicular to the diagonal AC.', 'Diagonals $AC = 6$ and $BD = 7$ cross at right angles: area $21$ square units.');

// WE6 (deck 2): P(-5, 2) in y = -1, then in the y-axis
const t6 = walk(P(-5, 2), hy(-1), Y);
const w26 = A([tw(-1, 2), r`2 - (-4) = 6`, r`5 - (-5) = 10`, r`\dfrac{1}{2} \times 6 \times 10 = 30`], 'deck 2 WE6');
must(is(t6[1], [-5, -4]) && is(t6[2], [5, -4]) && classify(t6) === 'right-angled triangle' && area(t6) === 30, 'deck 2 WE6');
const fWE26 = fig({ x: [-7, 7], y: [-6, 4], pts: [['P', t6[0]], ["P'", t6[1]], ['P″', t6[2]]], segs: [["PP′P″", t6, true]], mirrors: [hy(-1)] }, 'Worked example 6 of part 2: P (−5, 2) is reflected in the dashed mirror y = −1 to P′ (−5, −4), and P′ in the y-axis to P″ (5, −4). The triangle PP′P″ has a vertical side of 6 and a horizontal side of 10 meeting at a right angle at P′.', 'Legs $6$ and $10$ at a right angle: area $30$ square units.');

// Lengths and distances table
const lp = P(1, 6), lpi = img(hy(2), lp), seg = [P(0, 0), P(3, 4)], segI = imgAll(vx(2), seg), tri6 = [P(1, 1), P(4, 1), P(1, 5)], tri6i = imgAll(X, tri6);
must(dist(lp, lpi) === 2 * (6 - 2) && dist(...seg) === 5 && dist(...segI) === 5 && area(tri6) === 6 && area(tri6i) === 6 && orient(tri6) === -orient(tri6i), 'lengths table');
const tLen = table(['Fact', 'Example'], [['A point $k$ units from the mirror is $2k$ units from its image', `$(1, 6)$ is $4$ units from $y = 2$ and $8$ units from its image ${d(ct(lpi))}`], ['A reflection keeps lengths', `$O(0, 0)$ to $(3, 4)$ and its image ${d(ct(segI[0]))} to ${d(ct(segI[1]))} in $x = 2$: both $5$ units`], ['A reflection keeps angles and areas', 'a right triangle of area $6$ and its image in the $x$-axis: both area $6$'], ['The order of the vertices is reversed', 'anticlockwise $ABC$ becomes clockwise $A\'B\'C\'$']], 'Table of four facts about lengths under reflection: a point k units from the mirror is 2 k from its image, for example (1, 6) and its image (1, −2) in y = 2 are 8 apart; lengths are kept, for example a segment of length 5 and its image; angles and areas are kept; and the order of the vertices is reversed.', 'The image is congruent to the figure: same size and shape, facing the other way.');

const sum2 = table(['Idea', 'Key fact'], [['Invariant points', 'the points on the mirror line; for the origin, only $O$ itself'], ['Same mirror twice', 'every point returns to where it started'], ['$x$-axis then $y$-axis', 'same as reflection in the origin (either order)'], ['Reflecting a figure', 'reflect each vertex; the image is congruent'], ['Naming the figure', 'look for parallel sides, equal sides, right angles'], ['Area', 'use horizontal and vertical sides as bases and heights']], 'Summary table for part 2: invariant points are the points on the mirror, and only the origin for reflection in the origin; reflecting twice in the same mirror returns a point; the x-axis then the y-axis equals the origin; a reflected figure is congruent; name figures from parallel sides, equal sides and right angles; find areas from horizontal and vertical sides.', 'Part 2 on one card.');

// ---------------------------------------------------------------- decks
const d1 = deck({
  part: 1,
  title: 'Reflection — Part 1: Images in the axes, the origin and lines parallel to the axes',
  goals: ['Describe a reflection: the mirror line is the perpendicular bisector of a point and its image', 'Write the image of a point reflected in the x-axis, the y-axis or the origin', 'Write the image of a point reflected in a line x = a or y = b', 'Work backwards to find a point, a mirror line or unknown coordinates'],
  slides: [
    sl('title', 'Reflection, Part 1', { b: 'A **reflection** makes a mirror image: every point moves to the other side of a **mirror line**, the same distance away. On a graph the coordinates of the image follow simple rules.', v: fTitle, n: 'Welcome to reflection. When you stand in front of a mirror, your image appears just as far behind it. On a graph we can do the same with points. Here a triangle on the right of the y axis has a mirror image on the left. In this part you will learn the rules that give the coordinates of any image.' }),
    sl('concept', 'What you will be able to do', { ul: ['Explain what a **reflection** does to a point', 'Reflect a point in the **$x$-axis**, the **$y$-axis** and the **origin**', 'Reflect a point in a line **$x = a$** or **$y = b$**', 'Find a point, a **mirror line** or **unknown coordinates** from given images'], n: 'These are your goals for part one. First we see exactly what a reflection does. Then we learn the rules for the two axes and for the origin. Next come mirror lines parallel to the axes. Finally we work backwards, finding a point, a mirror line or unknown coordinates from an image.' }),
    sl('concept', 'What a reflection does', { b: "The image $P'$ of a point $P$ in a mirror line lies on the other side of the line, so that the mirror is the **perpendicular bisector** of $PP'$.", ul: ["$PP'$ crosses the mirror **at right angles**", "the mirror cuts $PP'$ **in half**: $P$ and $P'$ are the same distance from it", 'a point **on** the mirror is its own image: it is **invariant**'], v: fWhat, n: 'Here the mirror is the line y equals one. The point P is two units above it, so its image P prime is two units below it. The segment joining them crosses the mirror at right angles and is cut exactly in half. A point lying on the mirror itself does not move at all. We call it invariant.' }),
    sl('concept', 'Reflection in the x-axis', { b: 'The $x$-axis is the line $y = 0$. Reflecting in it keeps the $x$-coordinate and **changes the sign of the $y$-coordinate**. This reflection is often written $M_x$.', m: [r`M_x : (x, y) \to (x, -y)`], v: fX, n: 'Reflect in the x axis and a point above the axis goes the same distance below it, and the other way round. Its x coordinate does not change, but its y coordinate changes sign. So A at two, three goes to two, minus three, and C at five, minus two goes to five, two.' }),
    sl('concept', 'Reflection in the y-axis', { b: 'The $y$-axis is the line $x = 0$. Reflecting in it **changes the sign of the $x$-coordinate** and keeps the $y$-coordinate. This reflection is often written $M_y$.', m: [r`M_y : (x, y) \to (-x, y)`], v: fY, n: 'Now the mirror is the y axis. A point to the right goes the same distance to the left. This time the y coordinate stays the same and the x coordinate changes sign. So A at two, three goes to minus two, three, and B at minus four, one goes to four, one.' }),
    sl('example', 'Worked example 1: images in the axes', { b: 'Write the images of $A(-5, 2)$ and $B(0, -3)$ under reflection in (i) the $x$-axis, (ii) the $y$-axis.', ul: ['**Step 1 —** in the $x$-axis change the sign of $y$: $A$ goes to $(-5, -2)$ and $B$ to $(0, 3)$.', '**Step 2 —** in the $y$-axis change the sign of $x$: $A$ goes to $(5, 2)$; $B$ goes to $(0, -3)$, itself.', '**Note —** $B$ lies on the $y$-axis, so it is **invariant** under reflection in the $y$-axis.'], v: tWE1, n: 'For the x axis, change the sign of the y coordinate: A goes to minus five, minus two and B goes to zero, three. For the y axis, change the sign of the x coordinate: A goes to five, two. But B has x coordinate zero, so changing its sign changes nothing. B lies on the mirror and stays where it is.' }),
    sl('check', 'Quick check: the y-axis', { b: 'Which coordinate changes sign?', chk: 'm02', n: 'The mirror is the y axis. Which coordinate changes sign, and which stays the same?' }),
    sl('concept', 'Reflection in the origin', { b: "Reflection in the origin **changes the signs of both coordinates**. The origin is the midpoint of $PP'$. It has the same effect as reflecting in the $x$-axis and then in the $y$-axis. It is often written $M_O$.", m: [r`M_O : (x, y) \to (-x, -y)`], v: fO, n: 'We can also reflect in a point, the origin. The image is as far beyond the origin as the point is in front of it, on the same straight line. Both coordinates change sign, so three, two goes to minus three, minus two. This is the same as reflecting in the x axis and then in the y axis.' }),
    sl('example', 'Worked example 2: working back', { b: 'The image of a point $P$ in the $y$-axis is $(-6, -1)$. Find $P$, and the image of $P$ in the origin.', ul: [`**Step 1 —** a reflection undoes itself: reflect $(-6, -1)$ in the $y$-axis again to get $P${ct(we2p)}$.`, `**Step 2 —** in the origin both signs change: the image of $P$ is ${d(ct(we2o))}.`, '**Check —** $(6, -1)$ in the $y$-axis gives $(-6, -1)$, the given image.'], v: fWE2, n: 'If we know an image, reflecting it in the same mirror takes us back to the point. So P is six, minus one. Its image in the origin changes both signs, giving minus six, one. Always check by reflecting your answer forwards again.' }),
    sl('check', 'Quick check: working backwards', { b: 'Reflect the image in the same mirror.', chk: 'm11', n: 'To find the point, reflect the given image in the same mirror line.' }),
    sl('concept', 'Reflection in the line x = a', { b: 'A **vertical** mirror $x = a$ keeps the $y$-coordinate. A point $x - a$ to the right of the mirror goes the same distance to its left, so its new $x$-coordinate is', m: [`${wXa.lines[0]}`, r`(x, y) \to (2a - x, y)`], ul: [`For $x = 2$: ${wXa2.md[0]}, so $P(5, 3)$ goes to $(-1, 3)$; ${wXa2.md[1]}, so $Q(0, -2)$ goes to $(4, -2)$.`], v: fXa, n: 'Now the mirror is a vertical line, x equals a. The y coordinate stays the same. A point three units to the right of the mirror ends up three units to the left of it. In symbols the new x coordinate is two a minus x. For the mirror x equals two, the point five, three goes to minus one, three.' }),
    sl('concept', 'Reflection in the line y = b', { b: 'A **horizontal** mirror $y = b$ keeps the $x$-coordinate, and the new $y$-coordinate is $2b - y$.', m: [r`(x, y) \to (x, 2b - y)`], ul: [`For $y = -1$: ${wYb.md[0]}, so $P(2, 3)$ goes to $(2, -5)$; ${wYb.md[1]}, so $Q(-3, -2)$ goes to $(-3, 0)$.`], v: fYb, n: 'A horizontal mirror, y equals b, works the same way with the roles swapped. The x coordinate stays the same, and the new y coordinate is two b minus y. With the mirror y equals minus one, the point two, three, which is four units above, goes to two, minus five, four units below.' }),
    sl('example', 'Worked example 3: lines parallel to the axes', { b: 'Find the images of $R(7, -2)$ in (i) the line $x = 3$, (ii) the line $y = 1$.', ul: [`**(i) —** $y$ stays $-2$; new $x$-coordinate ${w3.md[0]}: the image is ${d(ct(r3a))}.`, `**(ii) —** $x$ stays $7$; new $y$-coordinate ${w3.md[1]}: the image is ${d(ct(r3b))}.`, '**Check —** in each case the mirror is halfway between the point and its image.'], v: fWE3, n: 'For the vertical mirror x equals three, keep the y coordinate and work out two times three minus seven, which is minus one. For the horizontal mirror y equals one, keep the x coordinate and work out two times one minus minus two, which is four. Check that each mirror lies halfway between the point and its image.' }),
    sl('example', 'Worked example 4: finding the mirror', { b: "Find the mirror line in each case: (i) $P(-1, 6)$ and its image $P'(-1, -2)$; (ii) $Q(5, 4)$ and its image $Q'(-3, 4)$.", ul: [`**(i) —** same $x$-coordinate, so the mirror is horizontal, halfway between: $y = ${w4.lines[0]}$.`, `**(ii) —** same $y$-coordinate, so the mirror is vertical, halfway between: $x = ${w4.lines[1]}$.`, '**Answer —** the mirrors are $y = 2$ and $x = 1$.'], v: fWE4, n: 'The mirror passes through the midpoint of a point and its image, at right angles to the segment joining them. In the first pair the x coordinates are equal, so the mirror is horizontal, at the average height, two. In the second pair the y coordinates are equal, so the mirror is vertical, at x equals one.' }),
    sl('check', 'Quick check: the mirror line', { b: 'Take the average of the coordinates that change.', chk: 'm10', n: 'The two points share their x coordinate. The mirror is halfway between their y coordinates.' }),
    sl('example', 'Worked example 5: unknown coordinates', { b: 'The image of $(2a - 3, 5)$ in the $y$-axis is $(-7, b + 2)$. Find $a$ and $b$.', ul: ['**Step 1 —** by the rule, the image is $(3 - 2a, 5)$.', `**Step 2 —** compare $x$-coordinates: ${w5.md[0]}.`, `**Step 3 —** compare $y$-coordinates: ${w5.md[1]}.`, '**Check —** the point is $(7, 5)$, whose image in the $y$-axis is $(-7, 5)$.'], v: fWE5, n: 'First write the image using the rule: the x coordinate changes sign, so it becomes three minus two a, and the y coordinate stays five. Two points are equal only when both coordinates match. So three minus two a equals minus seven, giving a equals five, and b plus two equals five, giving b equals three.' }),
    sl('concept', 'All the rules together', { b: 'Learn the five rules and which points each one leaves fixed:', v: tRules, n: 'Here are all five rules in one table, with the image of the point four, minus three under each. A line mirror leaves every point on it fixed. Reflection in the origin leaves only the origin fixed. Learn the table, and you can answer most reflection questions in one line.' }),
    sl('check', 'Quick check: true or false?', { b: 'How far is the point from the mirror?', chk: 'tf6', n: 'Find how far the point is from the mirror, then go the same distance beyond it.' }),
    sl('summary', 'Summary', { ul: ['The mirror is the perpendicular bisector of $PP\'$', '$x$-axis: $(x, -y)$; $y$-axis: $(-x, y)$; origin: $(-x, -y)$', 'Line $x = a$: $(2a - x, y)$; line $y = b$: $(x, 2b - y)$', 'Reflect an image again to get the point back', 'Mirror from a point and its image: halfway between them'], v: fSum1, n: 'To sum up part one. A mirror line is the perpendicular bisector of a point and its image. In the x axis the y coordinate changes sign; in the y axis the x coordinate does; in the origin both do. For lines parallel to the axes use two a minus x or two b minus y. And to work backwards, reflect again.' }),
    sl('exam-tips', 'Exam tips: how marks are awarded', { ul: ['**Image of a point (1 mark each):** correct coordinates, written as a pair', '**Mirror line (1–2 marks):** horizontal or vertical stated, then the equation', '**Unknown coordinates (2–3 marks):** image by the rule 1 + each equation solved 1', '**Mistake:** changing the wrong coordinate (the $x$-axis changes $y$)', '**Mistake:** using $a - x$ instead of $2a - x$ for the line $x = a$', '**Mistake:** writing a mirror line such as $y = 3$ as $x = 3$'], n: 'In the exam, write each image as a coordinate pair. For a mirror line, say first whether it is horizontal or vertical, then give its equation. A very common slip is to change the wrong coordinate: reflection in the x axis changes the y coordinate. And for the line x equals a, the new x coordinate is two a minus x.' }),
  ],
});

const d2 = deck({
  part: 2,
  title: 'Reflection — Part 2: Invariant points, combined reflections and figures',
  goals: ['Identify the invariant points of a reflection', 'Combine two reflections and find a single equivalent reflection', 'Reflect a figure and plot it with its image on graph paper', 'Name the figure formed and find its area or perimeter'],
  slides: [
    sl('title', 'Reflection, Part 2', { b: 'Reflect a whole figure and it keeps its size and shape but **faces the other way**. Points and their images together make new figures to name and measure.', v: fTitle2, n: 'Welcome to part two. Here a flag on a pole is reflected in the y axis. The image flag is exactly the same size and shape, but it points the other way. In this part we look at points that do not move, at doing two reflections in a row, and at the shapes that points and their images make on graph paper.' }),
    sl('concept', 'What you will be able to do', { ul: ['Find the **invariant points** of a reflection', 'Combine **two reflections** into one', 'Reflect a **figure** and plot it with its image', '**Name** the figure formed and find its **area** or **perimeter**'], n: 'These are your goals for part two. We find which points stay fixed, combine two reflections, reflect whole figures, and then name the shapes formed on graph paper and work out their areas and perimeters.' }),
    sl('concept', 'Invariant points', { b: 'A point is **invariant** under a reflection if it is its own image. For a mirror **line**, the invariant points are exactly the points **on the line**. For reflection in the **origin**, only the origin itself is invariant.', v: fInv, n: 'A point is invariant if its image is the point itself. For a mirror line, that happens exactly when the point lies on the line. Here U and V sit on the mirror y equals minus two, so they stay put, while W moves to the other side. For reflection in the origin, only the origin is invariant.' }),
    sl('example', 'Worked example 1: which points stay fixed?', { b: 'Which of $A(3, 0)$, $B(0, -2)$, $C(-2, 5)$, $D(-2, -2)$ are invariant under reflection in (i) the $x$-axis, (ii) the $y$-axis, (iii) the line $x = -2$, (iv) the line $y = -2$?', ul: ['**Step 1 —** a point is invariant exactly when it lies on the mirror.', '**Answers —** (i) $A$; (ii) $B$; (iii) $C$ and $D$; (iv) $B$ and $D$.', '**Note —** $D$ is invariant under both $x = -2$ and $y = -2$: it is where the two lines cross.'], v: tInv, n: 'Check which points lie on each mirror. A has y coordinate zero, so it is on the x axis. B has x coordinate zero, so it is on the y axis. C and D have x coordinate minus two. B and D have y coordinate minus two. D lies on both of the last two lines, at their crossing point.' }),
    sl('check', 'Quick check: invariant points', { b: 'Which point lies on the mirror?', chk: 'm07', n: 'Look for the point that lies on the y axis. What is its x coordinate?' }),
    sl('concept', 'One reflection after another', { b: 'Reflecting in the $x$-axis and then in the $y$-axis (in either order) changes both signs, which is **reflection in the origin**. Reflecting **twice in the same line** brings every point back.', m: [r`(x, y) \to (x, -y) \to (-x, -y)`], v: fComb, n: 'Reflect four, two in the x axis to get four, minus two, then in the y axis to get minus four, minus two. Both signs have changed, exactly as for reflection in the origin. So these two reflections together equal one reflection in the origin. And reflecting twice in the same line just brings a point back.' }),
    sl('example', 'Worked example 2: two mirrors', { b: '$P(3, -5)$ is reflected in the line $y = 1$ to $P_1$, and $P_1$ in the $y$-axis to $P_2$. Find $P_2$. Does the other order give the same point?', ul: [`**Step 1 —** new $y$-coordinate ${w22.md[0]}: $P_1${ct(pw[1])}$.`, `**Step 2 —** in the $y$-axis: $P_2${ct(pw[2])}$.`, `**Other order —** $y$-axis first gives ${d(ct(pw2[1]))}, then $y = 1$ gives ${d(ct(pw2[2]))}: the same point.`], v: fWE22, n: 'In the line y equals one, the new y coordinate is two times one minus minus five, which is seven. So P one is three, seven. Then the y axis changes the sign of x: P two is minus three, seven. Doing the y axis first gives minus three, minus five, and then seven again. For perpendicular mirrors, the order does not matter.' }),
    sl('concept', 'Reflecting a figure', { b: 'To reflect a figure, reflect **each vertex** and join the images in the same order.', ul: ['the image is **congruent** to the figure: same lengths, angles and area', 'vertices on the mirror are **invariant**', 'the order of the vertices is **reversed** (clockwise becomes anticlockwise)'], v: fFig, n: 'To reflect a whole figure, reflect each of its corners and join them up in the same order. The image has the same side lengths, the same angles and the same area, so it is congruent to the original. But it faces the other way: going round the corners clockwise in one means anticlockwise in the other.' }),
    sl('check', 'Quick check: two routes', { b: 'Follow both routes step by step.', chk: 'tf3', n: 'Work out the image both ways, step by step, and compare.' }),
    sl('example', 'Worked example 3: a rectangle from one point', { b: 'Plot $A(5, 2)$ and its images $B$ in the $y$-axis, $C$ in the origin and $D$ in the $x$-axis. Name $ABCD$ and find its area and perimeter.', ul: [`**Step 1 —** $B${ct(rect3[1])}$, $C${ct(rect3[2])}$, $D${ct(rect3[3])}$.`, `**Step 2 —** the sides are horizontal and vertical, so every angle is a right angle: $AB = ${w23.lines[0]}$ and $BC = ${w23.lines[1]}$, so $ABCD$ is a rectangle.`, `**Step 3 —** area ${w23.md[2]} square units; perimeter ${w23.md[3]} units.`], v: fWE23, n: 'The three images are minus five, two; minus five, minus two; and five, minus two. Joining A, B, C and D gives horizontal and vertical sides, so all the angles are right angles. The width is ten and the height is four, so it is a rectangle with area forty square units and perimeter twenty eight units.' }),
    sl('example', 'Worked example 4: an isosceles trapezium', { b: "The segment joining $A(1, 4)$ and $B(3, 1)$ is reflected in the line $x = 5$ to $A'B'$. Name $ABB'A'$ and find its area.", ul: [`**Step 1 —** new $x$-coordinates ${w24.md[0]} and ${w24.md[1]}: $A'${ct(s4i[0])}$, $B'${ct(s4i[1])}$.`, "**Step 2 —** $AA'$ and $BB'$ are horizontal, so parallel; $AB = A'B'$. So $ABB'A'$ is an **isosceles trapezium**.", `**Step 3 —** $AA' = ${w24.lines[2]}$, $BB' = ${w24.lines[3]}$, height ${w24.md[4]}; area $= ${w24.lines[5]}$ square units.`], v: fWE24, n: 'Reflect both ends in the line x equals five: A goes to nine, four and B goes to seven, one. The segments A A prime and B B prime are both horizontal, so they are parallel, and the slanting sides are a segment and its image, so they are equal. That makes an isosceles trapezium, with area eighteen square units.' }),
    sl('concept', 'Naming the figure', { b: 'On graph paper, horizontal and vertical sides make parallel sides and right angles easy to spot. Then check the side lengths:', v: fName, n: 'To name a four sided figure, first look for parallel sides. Two pairs of parallel sides make a parallelogram, and right angles or equal sides turn it into a rectangle, rhombus or square. Exactly one pair makes a trapezium. With no parallel sides, two pairs of equal neighbouring sides make a kite.' }),
    sl('example', 'Worked example 5: a kite', { b: 'Reflect $A(-1, 2)$ in the line $x = 2$ to get $C$. With $B(2, 6)$ and $D(2, -1)$, name $ABCD$ and find its area.', ul: [`**Step 1 —** ${w25.md[0]}: $C${ct(k5[2])}$. $B$ and $D$ lie on the mirror, so they are invariant.`, `**Step 2 —** $AB = CB = ${w25.lines[1]}$ and $AD = CD$, but $AB \\ne AD$: $ABCD$ is a **kite**.`, `**Step 3 —** the diagonals $AC = ${w25.lines[2]}$ and $BD = ${w25.lines[3]}$ are perpendicular: area $= ${w25.lines[4]}$ square units.`], v: fWE25, n: 'The image of A in the line x equals two is C at five, two. B and D are on the mirror, so they stay fixed. The mirror swaps A and C, so A B equals C B and A D equals C D: two pairs of equal neighbouring sides, a kite. Its diagonals, six and seven, cross at right angles, so the area is twenty one square units.' }),
    sl('check', 'Quick check: an area', { b: 'Use the vertical segment as the base.', chk: 'm14', n: 'Take the vertical side as the base. The height is the distance of the origin from that side.' }),
    sl('example', 'Worked example 6: two steps, one triangle', { b: "$P(-5, 2)$ is reflected in the line $y = -1$ to $P'$, and $P'$ in the $y$-axis to $P''$. Name triangle $PP'P''$ and find its area.", ul: [`**Step 1 —** ${w26.md[0]}: $P'${ct(t6[1])}$; then $P''${ct(t6[2])}$.`, `**Step 2 —** $PP'$ is vertical and $P'P''$ horizontal, so the angle at $P'$ is a right angle: a **right-angled triangle**.`, `**Step 3 —** $PP' = ${w26.lines[1]}$, $P'P'' = ${w26.lines[2]}$; area $= ${w26.lines[3]}$ square units.`], v: fWE26, n: 'In the line y equals minus one the new y coordinate is minus two minus two, which is minus four, so P prime is minus five, minus four. The y axis then gives five, minus four. One side is vertical and one is horizontal, so the triangle has a right angle at P prime. Its legs are six and ten, so its area is thirty square units.' }),
    sl('concept', 'Lengths, distances and areas', { b: 'A reflection never changes lengths, so it never changes angles or areas either.', v: tLen, n: 'Remember these facts. A point at a certain distance from the mirror is twice that distance from its image. A reflection keeps every length, so a reflected figure is congruent to the original, with the same angles and area. Only the direction it faces is reversed.' }),
    sl('check', 'Quick check: true or false?', { b: 'Does a reflection change lengths?', chk: 'tf4', n: 'Does a reflection change any lengths? What does that tell you about the area?' }),
    sl('summary', 'Summary', { ul: ['Invariant points: the points on the mirror; for the origin, only $O$', 'Same mirror twice: back to the start', '$x$-axis then $y$-axis $=$ reflection in the origin', 'Reflect a figure vertex by vertex; the image is congruent', 'Name figures from parallel sides, equal sides and right angles'], v: sum2, n: 'To sum up part two. Invariant points are the points on the mirror line, or only the origin for reflection in the origin. Reflecting twice in one line gets you back. The x axis then the y axis equals the origin. A reflected figure is congruent. And to name a figure, look for parallel sides, equal sides and right angles.' }),
    sl('exam-tips', 'Exam tips: how marks are awarded', { ul: ['**Graph question (10 marks):** points plotted correctly with labels, images found, figure named, area or perimeter', '**Invariant points (1–2 marks):** points on the mirror, with a reason', '**Naming a figure (1–2 marks):** the name and the reason (parallel or equal sides, right angles)', '**Mistake:** joining the vertices in the wrong order', '**Mistake:** forgetting the half in the area of a triangle or trapezium', '**Mistake:** naming a figure without giving a reason'], n: 'In a graph question, use the scale given, plot and label every point, and write each image as a coordinate pair. When you name a figure, give the reason: which sides are parallel or equal, and where the right angles are. Join the vertices in the order given, and remember the half in triangle and trapezium areas.' }),
  ],
});

// ---------------------------------------------------------------- notes
const notes = {
  unit: 'icse-10-mathematics-ch11', version: 1, title: 'Reflection — chapter notes', language: 'en',
  sections: [
    { heading: '1. Reflection in a mirror line', body_md: r`- A **reflection** in a mirror line $l$ sends each point $P$ to its **image** $P'$ on the other side of $l$, at the same distance from it.
- The mirror line is the **perpendicular bisector** of $PP'$: $PP'$ meets $l$ at right angles, and $l$ passes through the midpoint of $PP'$.
- A point and its image are $2k$ units apart when the point is $k$ units from the mirror.
- A point **on** the mirror is its own image (it is **invariant**).

*Example:* $P(4, 3)$ in the line $y = 1$: $P$ is $2$ units above the mirror, so $P'$ is $(4, -1)$, $2$ units below it.`, key_terms: [{ term: 'Image', definition_md: 'The point to which a reflection sends a given point.' }, { term: 'Mirror line', definition_md: "The line of reflection; it is the perpendicular bisector of every segment $PP'$." }], formulas: [], visual: fWhat, visuals: [fTitle], topic_ids: [topic(1)] },
    { heading: '2. Reflection in the axes', body_md: r`- **In the $x$-axis** ($y = 0$, written $M_x$): keep $x$, change the sign of $y$.
- **In the $y$-axis** ($x = 0$, written $M_y$): change the sign of $x$, keep $y$.

$$M_x : (x, y) \to (x, -y) \qquad M_y : (x, y) \to (-x, y)$$

*Example:* $A(-5, 2)$ goes to $(-5, -2)$ in the $x$-axis and to $(5, 2)$ in the $y$-axis; $B(0, -3)$ lies on the $y$-axis, so it is invariant under $M_y$.`, key_terms: [{ term: '$M_x$', definition_md: 'Reflection in the $x$-axis: $(x, y) \\to (x, -y)$.' }, { term: '$M_y$', definition_md: 'Reflection in the $y$-axis: $(x, y) \\to (-x, y)$.' }], formulas: [{ latex: 'M_x : (x, y) \\to (x, -y)', label: 'Reflection in the x-axis' }, { latex: 'M_y : (x, y) \\to (-x, y)', label: 'Reflection in the y-axis' }], visual: fX, visuals: [fY, tWE1], topic_ids: [topic(1)] },
    { heading: '3. Reflection in the origin', body_md: r`- **In the origin** (written $M_O$): change the signs of **both** coordinates. The origin is the midpoint of $PP'$, and $P$, $O$, $P'$ lie on one straight line.

$$M_O : (x, y) \to (-x, -y)$$

- Reflection in the $x$-axis followed by reflection in the $y$-axis (in either order) has the same effect as $M_O$.
- Only the origin is invariant under $M_O$.

*Example:* the image of $(3, 2)$ in the origin is $(-3, -2)$; and if the image of $P$ in the $y$-axis is $(-6, -1)$, then $P$ is $(6, -1)$ and its image in the origin is $(-6, 1)$.`, key_terms: [{ term: '$M_O$', definition_md: 'Reflection in the origin: $(x, y) \\to (-x, -y)$.' }], formulas: [{ latex: 'M_O : (x, y) \\to (-x, -y)', label: 'Reflection in the origin' }], visual: fO, visuals: [fWE2], topic_ids: [topic(2)] },
    { heading: '4. Reflection in the lines x = a and y = b', body_md: r`- **In $x = a$** (a vertical mirror): keep $y$; a point $x - a$ to the right goes $x - a$ to the left, so the new $x$-coordinate is $a - (x - a) = 2a - x$.
- **In $y = b$** (a horizontal mirror): keep $x$; the new $y$-coordinate is $2b - y$.

$$(x, y) \to (2a - x, y) \qquad (x, y) \to (x, 2b - y)$$

- With $a = 0$ or $b = 0$ these become the rules for the axes.

*Example:* $R(7, -2)$ goes to $(2 \times 3 - 7, -2) = (-1, -2)$ in $x = 3$ and to $(7, 4)$ in $y = 1$.`, key_terms: [{ term: 'Line parallel to an axis', definition_md: '$x = a$ is vertical (parallel to the $y$-axis); $y = b$ is horizontal (parallel to the $x$-axis).' }], formulas: [{ latex: '(x, y) \\to (2a - x, y)', label: 'Reflection in x = a' }, { latex: '(x, y) \\to (x, 2b - y)', label: 'Reflection in y = b' }], visual: fXa, visuals: [fYb, fWE3], topic_ids: [topic(2)] },
    { heading: '5. Working backwards', body_md: r`- **The point from its image:** a reflection undoes itself, so reflect the image in the same mirror.
- **The mirror from a point and its image:** if the $x$-coordinates are equal, the mirror is horizontal, $y = \dfrac{y_1 + y_2}{2}$; if the $y$-coordinates are equal, it is vertical, $x = \dfrac{x_1 + x_2}{2}$; if both coordinates change sign, it is the origin.
- **Unknown coordinates:** write the image by the rule, then equate $x$-coordinates and $y$-coordinates separately.

*Example:* the image of $(2a - 3, 5)$ in the $y$-axis is $(-7, b + 2)$: $3 - 2a = -7$, so $a = 5$; $b + 2 = 5$, so $b = 3$.`, key_terms: [{ term: 'Self-inverse', definition_md: 'Reflecting twice in the same mirror gives back the original point.' }], formulas: [{ latex: 'y = \\dfrac{y_1 + y_2}{2}', label: 'Horizontal mirror through the midpoint' }, { latex: 'x = \\dfrac{x_1 + x_2}{2}', label: 'Vertical mirror through the midpoint' }], visual: fWE4, visuals: [fWE5], topic_ids: [topic(1), topic(2)] },
    { heading: '6. Invariant points', body_md: r`- A point is **invariant** under a reflection if its image is the point itself.
- For a mirror **line**, the invariant points are exactly the points **on** that line: $(x, 0)$ for the $x$-axis, $(0, y)$ for the $y$-axis, $(a, y)$ for $x = a$, $(x, b)$ for $y = b$.
- For the **origin**, only $O(0, 0)$ is invariant.
- A point invariant under two reflections in perpendicular lines is their point of intersection.

*Example:* $D(-2, -2)$ is invariant under reflection in both $x = -2$ and $y = -2$.`, key_terms: [{ term: 'Invariant point', definition_md: 'A point that is its own image under a transformation.' }], formulas: [], visual: fInv, visuals: [tRules, tInv], topic_ids: [topic(3)] },
    { heading: '7. Combined reflections and figures on graph paper', body_md: r`- **Two reflections:** $x$-axis then $y$-axis (either order) $=$ reflection in the origin; the same mirror twice $=$ no change.
- **A figure:** reflect each vertex and join the images in the same order. The image is **congruent** (same lengths, angles, area) but the order of the vertices is reversed.
- **Naming the figure:** horizontal and vertical sides give parallel sides and right angles at a glance; then compare side lengths (rectangle, square, isosceles trapezium, kite, right-angled or isosceles triangle).
- **Area:** use horizontal or vertical sides as bases and heights; trapezium $\dfrac{1}{2}(a + b)h$; kite $\dfrac{1}{2} d_1 d_2$.

*Example:* $A(5, 2)$ with its images in the $y$-axis, the origin and the $x$-axis makes a rectangle $10$ by $4$: area $40$ square units, perimeter $28$ units.`, key_terms: [{ term: 'Congruent', definition_md: 'Same size and shape; a reflected figure is congruent to the original.' }, { term: 'Isosceles trapezium', definition_md: 'A trapezium whose non-parallel sides are equal; a segment and its image often make one.' }], formulas: [{ latex: '\\dfrac{1}{2}(a + b)h', label: 'Area of a trapezium' }, { latex: '\\dfrac{1}{2} d_1 d_2', label: 'Area of a kite' }], visual: fWE23, visuals: [fComb, fWE24, fWE25, fName, tLen], topic_ids: [topic(3)] },
  ],
  exam_tips_md: r`**How marks are awarded**
- *Image of a point (1 mark):* correct coordinate pair.
- *Mirror line from a point and its image (1–2 marks):* horizontal or vertical stated 1; equation 1.
- *Unknown coordinates (2–3 marks):* image by the rule 1; each unknown 1.
- *Invariant points (1–2 marks):* the points on the mirror, with a reason.
- *10-mark graph question:* parts (a), (b), (c), usually 3 + 3 + 4: plotting and labelling, images, naming the figure with a reason, area or perimeter; show all working.

**Common mistakes**
1. Changing the wrong coordinate: reflection in the $x$-axis changes the $y$-coordinate.
2. Using $a - x$ or $x - 2a$ instead of $2a - x$ for the line $x = a$.
3. Confusing the line $x = 3$ (vertical) with the line $y = 3$ (horizontal).
4. Saying a point on the $x$-axis is invariant under reflection in the $y$-axis (only the origin is).
5. Joining the vertices of a figure in the wrong order, or naming it without a reason.
6. Forgetting the half in the area of a triangle, trapezium or kite.`,
  status: 'draft', provenance: d1.provenance,
};
// notes facts
must(is(img(hy(1), P(4, 3)), [4, -1]) && is(img(O, P(3, 2)), [-3, -2]), 'notes 1 and 3');
A([r`2 \times 3 - 7 = -1`], 'notes 4');
S(solvectx(['a', 'b'], { a: 5, b: 3 }), [r`3 - 2a = -7`, r`a = 5`, r`b + 2 = 5`, r`b = 3`], 'notes 5');
S({ consts: {}, free: ['a', 'x'], sols: [], labels: {} }, [r`a - (x - a) = 2a - x`], 'notes 4 identity');
must(same(img(vx(-2), set1.D), set1.D) && same(img(hy(-2), set1.D), set1.D), 'notes 6');
must(area(rect3) === 40 && perimeter(rect3) === 28, 'notes 7');

// ---------------------------------------------------------------- flashcards
const fc = (id, front_md, back_md, tag, t) => ({ id, front_md, back_md, tag, topic_id: topic(t) });
const flashcards = {
  unit: 'icse-10-mathematics-ch11', version: 1, language: 'en',
  cards: [
    fc('f01', 'What is the **image** of a point under a reflection?', 'The point on the other side of the mirror line, at the same distance from it, with the mirror as the perpendicular bisector of the joining segment.', 'definition', 1),
    fc('f02', 'What is an **invariant point**?', 'A point that is its own image under the transformation.', 'definition', 3),
    fc('f03', 'Rule for reflection in the **$x$-axis**?', '$(x, y) \\to (x, -y)$: keep $x$, change the sign of $y$.', 'formula', 1),
    fc('f04', 'Rule for reflection in the **$y$-axis**?', '$(x, y) \\to (-x, y)$: change the sign of $x$, keep $y$.', 'formula', 1),
    fc('f05', 'Rule for reflection in the **origin**?', '$(x, y) \\to (-x, -y)$: change both signs.', 'formula', 2),
    fc('f06', 'Rule for reflection in the line **$x = a$**?', '$(x, y) \\to (2a - x, y)$.', 'formula', 2),
    fc('f07', 'Rule for reflection in the line **$y = b$**?', '$(x, y) \\to (x, 2b - y)$.', 'formula', 2),
    fc('f08', 'Image of $(5, -7)$ in the $x$-axis?', `$${ct(img(X, P(5, -7)))}$.`, 'example', 1),
    fc('f09', 'Image of $(-6, 4)$ in the $y$-axis?', `$${ct(img(Y, P(-6, 4)))}$.`, 'example', 1),
    fc('f10', 'Image of $(3, 2)$ in the origin?', `$${ct(img(O, P(3, 2)))}$.`, 'example', 2),
    fc('f11', 'Image of $R(7, -2)$ in the line $x = 3$?', `$${ct(img(vx(3), P(7, -2)))}$, since $2 \\times 3 - 7 = -1$.`, 'example', 2),
    fc('f12', 'Image of $(2, 3)$ in the line $y = -1$?', `$${ct(img(hy(-1), P(2, 3)))}$, since $2 \\times (-1) - 3 = -5$.`, 'example', 2),
    fc('f13', 'Why is the new $x$-coordinate $2a - x$ in the line $x = a$?', 'The point is $x - a$ from the mirror, so its image is at $a - (x - a) = 2a - x$.', 'concept', 2),
    fc('f14', 'How do you find a point from its image?', 'Reflect the image in the same mirror: a reflection undoes itself.', 'concept', 1),
    fc('f15', '$P$ and $P\'$ have the same $x$-coordinate. What kind of mirror is it?', 'A horizontal line $y = \\dfrac{y_1 + y_2}{2}$, halfway between them.', 'concept', 2),
    fc('f16', 'Mirror line for $Q(5, 4)$ and $Q\'(-3, 4)$?', `$x = 1$, since $\\dfrac{5 + (-3)}{2} = 1$.`, 'example', 2),
    fc('f17', 'Which points are invariant under reflection in a **line**?', 'Exactly the points on that line.', 'concept', 3),
    fc('f18', 'Which points are invariant under reflection in the **origin**?', 'Only the origin $(0, 0)$.', 'concept', 3),
    fc('f19', 'Is $(0, -5)$ invariant under reflection in the $y$-axis?', 'Yes: it lies on the $y$-axis.', 'example', 3),
    fc('f20', '$x$-axis then $y$-axis: which single reflection?', 'Reflection in the origin (the order does not matter).', 'concept', 3),
    fc('f21', 'What happens if you reflect twice in the **same** line?', 'Every point returns to where it started.', 'concept', 3),
    fc('f22', 'How do you reflect a triangle?', 'Reflect each vertex and join the images in the same order.', 'exam-tip', 3),
    fc('f23', 'What stays the same when a figure is reflected?', 'Lengths, angles and area: the image is congruent. Only the direction it faces is reversed.', 'concept', 3),
    fc('f24', 'A point is $k$ units from the mirror. How far is it from its image?', '$2k$ units.', 'formula', 1),
    fc('f25', 'A slanted segment and its image in a vertical mirror: what figure do their ends make?', 'An isosceles trapezium (the joining segments are horizontal, hence parallel).', 'diagram', 3),
    fc('f26', '$A(5, 2)$ with its images in the $y$-axis, the origin and the $x$-axis: which figure?', 'A rectangle $10$ by $4$: area $40$ square units.', 'example', 3),
    fc('f27', 'Area of a kite with diagonals $d_1$ and $d_2$?', '$\\dfrac{1}{2} d_1 d_2$ (the diagonals are perpendicular).', 'formula', 3),
    fc('f28', 'Most common slip with $M_x$?', 'Changing the sign of $x$ instead of $y$: the $x$-axis changes the $y$-coordinate.', 'exam-tip', 1),
    fc('f29', 'How do you name a figure in a graph question?', 'Give the name and the reason: parallel sides, equal sides, right angles.', 'exam-tip', 3),
    fc('f30', 'Unknowns: the image of $(2a - 3, 5)$ in the $y$-axis is $(-7, b + 2)$?', '$a = 5$, $b = 3$.', 'example', 2),
  ],
  status: 'draft', provenance: d1.provenance,
};
// flashcard facts
A([r`2 \times 3 - 7 = -1`, r`2 \times (-1) - 3 = -5`, r`\dfrac{5 + (-3)}{2} = 1`], 'flashcard lines');
must(same(img(Y, P(0, -5)), P(0, -5)) && singleFor(X, Y).eq === 'O' && same(walk(P(7, 3), vx(4), vx(4))[2], P(7, 3)), 'flashcard facts');

// ---------------------------------------------------------------- release + tests
const release = {
  unit: 'icse-10-mathematics-ch11', version: 1, academic_year: '2026-27', created_at: '2026-11-01T00:00:00+05:30',
  decks: [d1, d2], notes, flashcards, questions: [],
  build: { run_id: null, checks: {
    syllabus: 'topics t01–t03 only (reflection of a point in the x-axis and the y-axis; in the lines x = a and y = b and in the origin; invariant points, combined reflections, and plotting a figure and its image on graph paper, naming the figure and finding its area or perimeter). The syllabus lists no removed topics for this chapter. Reflection in y = x is not in the syllabus and is not used.',
    geometry: 'every image is computed by the coordinate rule and confirmed by the geometric definition (mirror = perpendicular bisector of PP′, or O = midpoint of PP′), and reflecting the image again must give back the point; invariant points by the rule and by lying on the mirror; mirrors from a point and its image by the midpoint, confirmed by reflecting; areas by the shoelace formula and by Pick\'s theorem; lengths as exact square roots (Math.hypot agrees); figure names from parallel sides, equal sides and right angles on an asserted convex vertex order',
    working_lines: 'every equation typed in a worked example, note, flashcard or model answer is parsed from its TeX by an exact parser (fractions, brackets, exact square roots): numeric sides must be equal exactly, identities must agree at nine points, and an equation in an unknown must hold at the verified solution',
    figures: 'every plotted point is a vertex of a drawn segment or lies on a drawn mirror line, and its label is generated from its coordinates; mirror lines are drawn as dashed reference lines',
  } },
};
const tests = chapterTests('Reflection', {
  A: ['m01', 'm04', 'm12', 'ar1', 's301', 's303'],
  B: ['l01', 'l04'],
}, {
  A: ['m03', 'm06', 'm08', 'm09', 'm15', 'm18', 'ar3', 'ar4', 's401', 's403', 's405'],
  B: ['l02', 'l05', 'l07'],
});
build({ dir: DIR, release, testsSpec: tests });
