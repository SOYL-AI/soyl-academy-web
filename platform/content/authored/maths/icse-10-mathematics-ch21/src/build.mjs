// Build ICSE 10 Mathematics ch21 Heights and Distances. Run from platform/:
//   npx tsx content/authored/maths/icse-10-mathematics-ch21/src/build.mjs
// Every figure is drawn from real coordinates by ht.mjs scene(): each numeric length label and each degree label is asserted
// against the coordinates. Every number on a slide, in a table, a note or a flashcard is computed here (table values from
// Math, exact values in Q(sqrt2, sqrt3) from trig.mjs) and asserted; a table-based answer and the exact answer must round
// alike and sit away from a rounding boundary. The build stops on any mismatch.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, topic, deck, sl, table, flow, build, chapterTests, r } from './lib.mjs';
import * as T from './trig.mjs';
import { tn, ct, sn, cs, tab, rnd, safe, stable, holds, near, dist, angAt, scene, must } from './ht.mjs';

setUnit('icse-10-mathematics-ch21');
await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const { E, tx } = T;
const S3 = Math.sqrt(3);
const d$ = (s) => `$${s}$`;
const X = (src) => tx(E(src));
const R1 = (x) => rnd(x, 1);
const f4 = (x) => x.toFixed(4);

// ---------------------------------------------------------------- figures (all from real coordinates)
const fOver = (() => {
  const d = 40 * ct(30);
  return scene({ pts: { F: [0, 0], T: [0, 40], P: [-d, 0], H: [-d, 40] }, k: 0.06, names: { H: false }, pos: { T: 'ne', F: 'se', P: 'sw' }, segs: [['F', 'T', 40], ['P', 'F', '$d$'], ['P', 'T'], ['T', 'H', undefined, { dashed: true }]], angs: [['P', 'T', 'F', 30], ['T', 'P', 'H', 30], ['F', 'T', 'P', undefined, { right: true }]] },
    'A tower FT 40 metres tall. An observer at P on the ground sees the top T at an angle of elevation of 30 degrees. From the top T a dashed horizontal line runs to the left, and the angle between it and the line of sight down to P is the angle of depression, also 30 degrees.', 'The angle of elevation at $P$ and the angle of depression at $T$ are both $30^\\circ$.');
})();
const fElev = (() => {
  const d = 30 * ct(35);
  return scene({ pts: { F: [0, 0], T: [0, 30], P: [-d, 0] }, k: 0.07, pos: { T: 'n', F: 'se', P: 'sw' }, segs: [['F', 'T', 30], ['P', 'F', '$d$'], ['P', 'T']], angs: [['P', 'T', 'F', 35], ['F', 'T', 'P', undefined, { right: true }]] },
    'A column FT 30 metres tall on level ground. An observer at P on the ground looks up along the line of sight PT to the top T. The angle between the line of sight and the horizontal ground line PF is the angle of elevation, 35 degrees.', 'Angle of elevation: measured upward from the horizontal through the eye.');
})();
const fDep = (() => {
  const d = 45 * ct(25);
  return scene({ pts: { F: [0, 0], T: [0, 45], V: [d, 0], H: [d, 45] }, k: 0.04, names: { H: false }, pos: { T: 'nw', F: 'sw', V: 'se' }, segs: [['F', 'T', 45], ['F', 'V', '$d$'], ['T', 'V'], ['T', 'H', undefined, { dashed: true }]], angs: [['T', 'V', 'H', 25], ['F', 'T', 'V', undefined, { right: true }]] },
    'An observation deck T, 45 metres above the foot F, and a jogger at V on the ground. The dashed horizontal line from T and the line of sight TV make the angle of depression, 25 degrees, measured downward from the horizontal.', 'Angle of depression: measured downward from the horizontal through the eye.');
})();
const fAlt = (() => {
  const d = 45 * ct(25);
  return scene({ pts: { F: [0, 0], T: [0, 45], V: [d, 0], H: [d, 45] }, k: 0.04, names: { H: false }, pos: { T: 'nw', F: 'sw', V: 'se' }, segs: [['F', 'T', 45], ['F', 'V', '$d$'], ['T', 'V'], ['T', 'H', undefined, { dashed: true }]], angs: [['T', 'V', 'H', 25], ['V', 'T', 'F', 25], ['F', 'T', 'V', undefined, { right: true }]] },
    'The same figure with two equal angles marked: the angle of depression of V from T is 25 degrees, and the angle of elevation of T from V is also 25 degrees, because the horizontal line through T is parallel to the ground FV and the angles are alternate.', 'Alternate angles: depression at $T$ = elevation at $V$.');
})();
const fWE1 = (() => {
  const K = [80 * cs(30), 80 * sn(30)];
  return scene({ pts: { O: [0, 0], K, F: [K[0], 0] }, k: 0.06, pos: { O: 'sw', K: 'ne', F: 'se' }, segs: [['O', 'K', 80], ['K', 'F', '$h$'], ['O', 'F']], angs: [['O', 'K', 'F', 30], ['F', 'K', 'O', undefined, { right: true }]] },
    'A kite K flying on a taut string OK of length 80 metres held at O. The string makes an angle of 30 degrees with the level ground. F is the point of the ground directly below the kite, and KF is the height h of the kite.', 'The string is the hypotenuse; the height $h$ is opposite the $30^\\circ$ angle.');
})();
const WE2h = 48 * tn(52);
const fWE2 = scene({ pts: { P: [-48, 0], F: [0, 0], T: [0, WE2h] }, k: 0.055, pos: { T: 'n', F: 'se', P: 'sw' }, segs: [['P', 'F', 48], ['F', 'T', '$h$'], ['P', 'T']], angs: [['P', 'T', 'F', 52], ['F', 'T', 'P', undefined, { right: true }]] },
  'A water-tank tower FT of unknown height h. A point P on level ground is 48 metres from the foot F, and the angle of elevation of the top T from P is 52 degrees.', 'Known: $PF = 48$ m and the angle $52^\\circ$; unknown: $h = FT$.');
const WE3d = 72 / tn(25);
const fWE3 = scene({ pts: { F: [0, 0], T: [0, 72], V: [WE3d, 0], H: [WE3d, 72] }, k: 0.04, names: { H: false }, pos: { T: 'nw', F: 'sw', V: 'se' }, segs: [['F', 'T', 72], ['F', 'V', '$d$'], ['T', 'V'], ['T', 'H', undefined, { dashed: true }]], angs: [['T', 'V', 'H', 25], ['F', 'T', 'V', undefined, { right: true }]] },
  'A rooftop restaurant T, 72 metres above the foot F of the building. A boat jetty V on the level ground is seen from T at an angle of depression of 25 degrees. The distance d from F to V is to be found.', 'The depression $25^\\circ$ at $T$ gives the angle $25^\\circ$ at $V$.');
const WE4h = 1.6 + 30 * tn(40);
const fEye = scene({ pts: { Pf: [-30, 0], E: [-30, 1.6], F: [0, 0], H: [0, 1.6], T: [0, WE4h] }, k: 0.1, names: { H: false, Pf: 'P' }, pos: { T: 'n', F: 'se', Pf: 'sw', E: 'nw' }, segs: [['Pf', 'E', 1.6], ['E', 'H', 30, { dashed: true }], ['E', 'T'], ['F', 'T'], ['Pf', 'F']], angs: [['E', 'T', 'H', 40], ['H', 'T', 'E', undefined, { right: true }]] },
  'A surveyor whose eyes E are 1.6 metres above the ground at P looks at the top T of a mast 30 metres away. The dashed horizontal line through E meets the mast at H. The angle of elevation of T from E is 40 degrees, so the part HT above eye level is found first, and the eye height is added at the end.', 'The angle is measured at the eye $E$, so $HT$ is the height above eye level.');
const sameH = 24 / (ct(30) - ct(45));
const fSame = (() => {
  const Q = [-sameH * ct(45), 0], P = [-sameH * ct(30), 0];
  return scene({ pts: { F: [0, 0], T: [0, sameH], Q: Q.slice(), P: P.slice() }, k: 0.07, pos: { T: 'n', F: 'se', Q: 's', P: 'sw' }, segs: [['P', 'Q', 24], ['Q', 'F'], ['F', 'T', '$h$'], ['P', 'T'], ['Q', 'T']], angs: [['P', 'T', 'F', 30], ['Q', 'T', 'F', 45], ['F', 'T', 'P', undefined, { right: true }]] },
    'A tower FT of height h with two points P and Q on level ground in line with its foot F on the same side. Q is nearer. From P the top T is seen at an angle of elevation of 30 degrees and from Q at 45 degrees. P and Q are 24 metres apart.', 'Two right triangles $PFT$ and $QFT$ share the height $FT = h$.');
})();
const fOpp = (() => {
  const h = 48, A = [-h * ct(60), 0], B = [h * ct(45), 0];
  return scene({ pts: { F: [0, 0], D: [0, h], A, B, L: [A[0], h], R: [B[0], h] }, k: 0.05, names: { L: false, R: false }, pos: { D: 'n', F: 's', A: 's', B: 's' }, segs: [['D', 'F', 48], ['D', 'A'], ['D', 'B'], ['L', 'D', undefined, { dashed: true }], ['D', 'R', undefined, { dashed: true }]], angs: [['D', 'A', 'L', 60], ['D', 'B', 'R', 45], ['F', 'D', 'A', undefined, { right: true }]] },
    'A sky-walk D, 48 metres above the point F on level ground, with two points A and B on opposite sides of F. From D the angle of depression of A on the left is 60 degrees and of B on the right is 45 degrees. Dashed horizontal lines through D show where the angles are measured from.', 'Opposite sides: the two distances add, $AB = AF + FB$.');
})();
const topT = 36 * tn(52);
const fTop = scene({ pts: { P: [-36, 0], F: [0, 0], B: [0, 36], T: [0, topT] }, k: 0.07, names: { B: 'B', T: 'T' }, pos: { T: 'n', B: 'ne', F: 'se', P: 'sw' }, segs: [['P', 'F', 36], ['F', 'B'], ['B', 'T', '$f$'], ['P', 'B'], ['P', 'T']], angs: [['P', 'B', 'F', 45], ['P', 'T', 'F', 52], ['F', 'B', 'P', undefined, { right: true }]] },
  'A temple tower with a finial BT on top. From a point P on level ground 36 metres from the foot F of the tower, the angle of elevation of the bottom B of the finial is 45 degrees and of its top T is 52 degrees. The finial length f is the difference of the two heights.', 'Finial $f = FT - FB$, with both heights read from the same base $PF$.');
const walkH = 24 / (tab('cot', 36) - tab('cot', 52));
const fWalk = (() => {
  const h = 24 / (ct(36) - ct(52));
  return scene({ pts: { F: [0, 0], T: [0, h], B: [-h * ct(52), 0], A: [-h * ct(36), 0] }, k: 0.06, pos: { T: 'n', F: 'se', B: 's', A: 'sw' }, segs: [['A', 'B', 24], ['B', 'F'], ['F', 'T', '$h$'], ['A', 'T'], ['B', 'T']], angs: [['A', 'T', 'F', 36], ['B', 'T', 'F', 52], ['F', 'T', 'A', undefined, { right: true }]] },
    'A tower FT seen by a walker, first from A at an angle of elevation of 36 degrees and then from B, 24 metres closer on the same straight path to the foot F, at 52 degrees.', 'A walker moves $24$ m towards the tower: the elevation rises from $36^\\circ$ to $52^\\circ$.');
})();
const fBuild = (() => {
  const d = 18 * ct(60), H = 18 + d * tn(30);
  must(near(H, 24, 1e-9) && near(d, 6 * S3, 1e-9), 'building example: tower 24 m, base 6 sqrt3');
  return scene({ pts: { G: [0, 0], A: [0, 18], F: [d, 0], T: [d, H], X: [d, 18] }, k: 0.12, names: { X: false }, pos: { G: 'sw', A: 'w', F: 'se', T: 'n' }, segs: [['G', 'A', 18], ['G', 'F'], ['F', 'T', '$h$'], ['A', 'T'], ['A', 'F'], ['A', 'X', undefined, { dashed: true }]], angs: [['A', 'F', 'X', 60], ['A', 'T', 'X', 30], ['G', 'A', 'F', undefined, { right: true }], ['F', 'T', 'G', undefined, { right: true }]] },
    'An 18 metre building AG and a tower FT on the same level ground. From the top A of the building, the foot F of the tower is seen at an angle of depression of 60 degrees and the top T at an angle of elevation of 30 degrees. The dashed line AX is horizontal.', 'Depression $60^\\circ$ to the foot, elevation $30^\\circ$ to the top: two triangles at $A$.');
})();

// ---------------------------------------------------------------- tables and flows (values computed and asserted)
const stdRows = [30, 45, 60].map((A) => [d$(`${A}^\\circ`), d$(X(`sin(${A})`)), d$(X(`cos(${A})`)), d$(X(`tan(${A})`)), d$(X(`cot(${A})`))]);
must(stdRows[0][3] === '$\\dfrac{\\sqrt{3}}{3}$' && stdRows[2][3] === '$\\sqrt{3}$' && stdRows[1][1] === '$\\dfrac{\\sqrt{2}}{2}$' && stdRows[0][4] === '$\\sqrt{3}$', 'standard-value table');
const stdTable = table(['$\\theta$', '$\\sin\\theta$', '$\\cos\\theta$', '$\\tan\\theta$', '$\\cot\\theta$'], stdRows, 'Table of exact ratio values: at 30 degrees sine one half, cosine root three over two, tangent root three over three, cotangent root three; at 45 degrees sine and cosine root two over two, tangent and cotangent one; at 60 degrees sine root three over two, cosine one half, tangent root three, cotangent root three over three.', 'Exact values used when the angle is $30^\\circ$, $45^\\circ$ or $60^\\circ$.');
const tabRows = [25, 35, 40, 50].map((A) => [d$(`${A}^\\circ`), f4(tab('sin', A)), f4(tab('cos', A)), f4(tab('tan', A)), f4(tab('cot', A))]);
must(tabRows[0][3] === '0.4663' && tabRows[1][3] === '0.7002' && tabRows[2][3] === '0.8391' && tabRows[3][3] === '1.1918' && tabRows[3][2] === '0.6428' && tabRows[2][1] === '0.6428', 'table-value rows (tan 25, 35, 40, 50; cos 50 = sin 40)');
const tabTable = table(['Angle', 'sin', 'cos', 'tan', 'cot'], tabRows, 'Extract of trigonometric tables to four decimal places for 25, 35, 40 and 50 degrees: for example the tangent of 25 degrees is 0.4663, of 35 degrees 0.7002, of 40 degrees 0.8391 and of 50 degrees 1.1918.', 'Table values are rounded to four decimal places, so answers are approximate.');
const ratioTable = table(['You know', 'You want', 'Use'], [['height and ground distance', 'an angle', '$\\tan\\theta = \\dfrac{\\text{height}}{\\text{distance}}$'], ['angle and ground distance', 'the height', '$\\text{height} = \\text{distance}\\times\\tan\\theta$'], ['angle and height', 'the ground distance', '$\\text{distance} = \\dfrac{\\text{height}}{\\tan\\theta}$'], ['angle and a slant length (rope, string, line of sight)', 'the height', '$\\text{height} = \\text{slant}\\times\\sin\\theta$'], ['angle and a slant length', 'the ground distance', '$\\text{distance} = \\text{slant}\\times\\cos\\theta$']], 'Table for choosing the ratio: height and ground distance give the angle with tangent; angle and ground distance give height as distance times tangent; angle and height give ground distance as height over tangent; angle and a slant length give height with sine and ground distance with cosine.', 'Name the sides first, then choose the ratio that links the two you use.');
must(near(80 * sn(30), 40, 1e-9) && near(80 * cs(30), 40 * S3, 1e-9) && R1(40 * 1.732) === 69.3, 'WE1 values');
const we1Table = table(['Step', 'Working', 'Result'], [['Name the sides', '$80$ m is the hypotenuse; $h$ is opposite $30^\\circ$', 'use sine'], ['Height', '$h = 80\\sin 30^\\circ = 80\\times\\dfrac{1}{2}$', '$40$ m'], ['Horizontal reach', '$80\\cos 30^\\circ = 80\\times\\dfrac{\\sqrt{3}}{2} = 40\\sqrt{3}$ (with $\\sqrt{3} = 1.732$)', '$69.3$ m']], 'Working table for the kite: the string of eighty metres is the hypotenuse and the height is opposite thirty degrees, so use sine; height eighty times one half is forty metres; horizontal reach is forty root three, which is sixty-nine point three metres.', 'Slant length and angle: sine for height, cosine for reach.');
const we2e = 48 * tn(52), we2v = 48 * tab('tan', 52);
must(tab('tan', 52) === 1.2799 && stable(we2e, we2v, 1) && R1(we2v) === 61.4 && R1(we2e) === 61.4 && R1(48 * 1.2799) === 61.4, 'WE2 61.4 m');
const we2Table = table(['Step', 'Working', 'Result'], [['Name the sides', '$h$ opposite $52^\\circ$, $48$ m adjacent', 'use tangent'], ['Equation', '$\\tan 52^\\circ = \\dfrac{h}{48}$', '$h = 48\\tan 52^\\circ$'], ['Table value', '$\\tan 52^\\circ = 1.2799$', '$48\\times 1.2799 = 61.43$'], ['Answer to the nearest $0.1$ m', '$61.4352 \\to 61.4$', '$61.4$ m']], 'Working table for the water-tank tower: height is opposite fifty-two degrees and forty-eight metres is adjacent, so use tangent; height equals forty-eight times tangent fifty-two degrees; the table gives one point two seven nine nine, and forty-eight times that is sixty-one point four three, which is sixty-one point four metres.', 'Opposite and adjacent: tangent.');
const we3d = 72 / tan25(), we3v = 72 / tab('tan', 25);
function tan25() { return tn(25); }
must(tab('tan', 25) === 0.4663 && stable(we3d, we3v, 1) && R1(we3v) === 154.4, 'WE3 154.4 m');
const we3Table = table(['Step', 'Working', 'Result'], [['Alternate angle', 'depression at $T$ $=$ elevation at $V$', '$25^\\circ$ at $V$'], ['Equation', '$\\tan 25^\\circ = \\dfrac{72}{d}$', '$d = \\dfrac{72}{\\tan 25^\\circ}$'], ['Table value', '$\\tan 25^\\circ = 0.4663$', '$d = \\dfrac{72}{0.4663} = 154.4$'], ['Answer', 'the height is divided, not multiplied', '$154.4$ m']], 'Working table for the boat jetty: by alternate angles the angle at V is twenty-five degrees; tangent of twenty-five degrees equals seventy-two over d, so d is seventy-two divided by zero point four six six three, which is one hundred fifty-four point four metres.', 'When the height is known and the distance is wanted, divide by the tangent.');
const we4e = 1.6 + 30 * tn(40), we4v = 1.6 + 30 * tab('tan', 40);
must(tab('tan', 40) === 0.8391 && stable(we4e, we4v, 1) && R1(we4v) === 26.8, 'WE4 26.8 m');
const we4Table = table(['Step', 'Working', 'Result'], [['Height above eye level', '$HT = 30\\tan 40^\\circ = 30\\times 0.8391$', '$25.173$ m'], ['Add the eye height', '$FT = HT + 1.6$', '$26.773$ m'], ['Answer to the nearest $0.1$ m', '', '$26.8$ m']], 'Working table for the surveyor: the part of the mast above eye level is thirty times tangent forty degrees, which is twenty-five point one seven three metres; adding the eye height of one point six metres gives twenty-six point seven seven three, so the mast is twenty-six point eight metres tall.', 'The angle belongs to the eye, so the eye height is added at the end.');
const roundRows = [[48, 52], [72, 25], [65, 38]].map(([d, a], i) => { const e = i === 1 ? d / tn(a) : d * tn(a), v = i === 1 ? d / tab('tan', a) : d * tab('tan', a); must(stable(e, v, 1), `rounding row ${d} ${a}`); return [i === 1 ? d$(`\\dfrac{${d}}{\\tan ${a}^\\circ}`) : d$(`${d}\\tan ${a}^\\circ`), e.toFixed(4), v.toFixed(4), `${R1(v)} m`]; });
const roundTable = table(['Expression', 'Exact value', 'With four-place tables', 'Answer to $0.1$ m'], roundRows, 'Table showing that the exact value and the value from four-place tables agree after rounding to the nearest 0.1 metre: forty-eight tangent fifty-two degrees is sixty-one point four, seventy-two over tangent twenty-five degrees is one hundred fifty-four point four, and sixty-five tangent thirty-eight degrees is fifty point eight.', 'Round only at the end, and state the precision.');
const sum1 = table(['Idea', 'Key fact'], [['Elevation and depression', 'both measured from the horizontal through the eye; depression at the top $=$ elevation at the bottom'], ['Choose the ratio', 'height and ground distance: tangent; slant length: sine or cosine'], ['Exact or tables', 'use surds at $30^\\circ$, $45^\\circ$, $60^\\circ$; tables to four places otherwise'], ['Eye height', 'add it to the height found above eye level'], ['Precision', 'round at the end and state it: nearest $0.1$ m']], 'Summary table for part one: elevation and depression are measured from the horizontal; choose tangent, sine or cosine from the sides named; use exact values at standard angles and tables otherwise; add the eye height; and round at the end.', 'Part 1 on one card.');
const steps = flow('LR', [['a', 'Read the problem and draw a labelled figure'], ['b', 'Mark the horizontal and the angle'], ['c', 'Pick the right triangle'], ['d', 'Name opposite, adjacent, hypotenuse'], ['e', 'Choose the ratio and solve'], ['f', 'Answer with units and precision']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e'], ['e', 'f']], 'Flow chart of the method: read the problem and draw a labelled figure, mark the horizontal and the angle, pick the right triangle, name the opposite, adjacent and hypotenuse, choose the ratio and solve, and answer with units and the stated precision.', 'Six steps for every heights-and-distances problem.');
const strategy = flow('TB', [['a', 'Two angles, one height $h$'], ['b', 'Write each distance from the foot as $h\\cot\\theta$'], ['c', 'Same side: the distances differ by the gap'], ['d', 'Opposite sides: the distances add to the gap'], ['e', 'Solve the single equation for $h$']], [['a', 'b'], ['b', 'c'], ['b', 'd'], ['c', 'e'], ['d', 'e']], 'Flow chart for two triangles: both triangles share the height h; write each ground distance from the foot as h times cotangent of its angle; on the same side the distances differ by the gap, on opposite sides they add to the gap; then solve the single equation for h.', 'The common height links the two triangles.');

// deck 2 working
const s1 = 24 / (ct(30) - ct(45));
must(T.eq(T.div(24, T.sub(E('cot(30)'), E('cot(45)'))), T.mul(12, T.add(E('cot(30)'), 1))) && R1(12 * (1.732 + 1)) === 32.8 && stable(s1, 12 * 2.732, 1), 'deck2 WE1: h = 12(sqrt3 + 1) = 32.8');
const sameTable = table(['Step', 'Working'], [['Nearer distance $QF = x$', '$h = x\\tan 45^\\circ = x$'], ['Farther point', '$h = (x + 24)\\tan 30^\\circ = \\dfrac{x + 24}{\\sqrt{3}}$'], ['Equate', '$\\sqrt{3}\\,x = x + 24$, so $x(\\sqrt{3} - 1) = 24$'], ['Solve', '$x = \\dfrac{24}{\\sqrt{3} - 1} = 12(\\sqrt{3} + 1)$'], ['Answer ($\\sqrt{3} = 1.732$)', '$h = x = 12\\times 2.732 = 32.8$ m']], 'Working table: let the nearer distance be x; the height equals x times tangent forty-five degrees, which is x; the height also equals x plus twenty-four, over root three; equating gives root three x equals x plus twenty-four, so x is twelve times root three plus one; the height is thirty-two point eight metres.', 'Same side: the far distance exceeds the near one by the gap.');
const o1 = 48 * ct(60), o2 = 48 * ct(45);
must(near(o1, 16 * S3, 1e-9) && near(o2, 48, 1e-9) && stable(o1 + o2, 48 + 16 * 1.732, 1) && R1(48 + 16 * 1.732) === 75.7 && T.eq(T.add(T.mul(48, E('cot(60)')), 48), T.add(48, T.mul(16, E('cot(30)')))), 'deck2 WE2: 48 + 16 sqrt3 = 75.7');
const oppTable = table(['Step', 'Working'], [['Alternate angles', 'at $A$ the elevation is $60^\\circ$; at $B$ it is $45^\\circ$'], ['Left point', '$AF = 48\\cot 60^\\circ = \\dfrac{48}{\\sqrt{3}} = 16\\sqrt{3}$'], ['Right point', '$FB = 48\\cot 45^\\circ = 48$'], ['Opposite sides: add', '$AB = 16\\sqrt{3} + 48$'], ['Answer ($\\sqrt{3} = 1.732$)', '$AB = 27.712 + 48 = 75.7$ m']], 'Working table: by alternate angles the elevations at the two points are sixty and forty-five degrees; the left point is forty-eight cotangent sixty degrees, which is sixteen root three, from the foot; the right point is forty-eight metres away; on opposite sides the distances add, giving seventy-five point seven metres.', 'Opposite sides: add the two distances.');
const tt1 = 36 * tn(52), tt2 = 36 * tab('tan', 52);
must(tab('tan', 52) === 1.2799 && stable(tt1, tt2, 1) && R1(tt2) === 46.1 && stable(tt1 - 36, tt2 - 36, 1) && R1(tt2 - 36) === 10.1 && near(tn(45), 1, 1e-12), 'deck2 WE3: top 46.1 m, finial 10.1 m');
const topTable = table(['Step', 'Working'], [['Bottom of the finial', '$FB = 36\\tan 45^\\circ = 36$ m'], ['Top of the finial', '$FT = 36\\tan 52^\\circ = 36\\times 1.2799 = 46.08$ m'], ['Finial', '$BT = FT - FB = 46.08 - 36$'], ['Answer to $0.1$ m', '$10.1$ m']], 'Working table for the finial: the bottom is thirty-six metres high since tangent forty-five degrees is one; the top is thirty-six times one point two seven nine nine, which is forty-six point zero eight metres; the finial is the difference, ten point one metres.', 'Subtract two heights read from the same base.');
const wh = 24 / (tab('cot', 36) - tab('cot', 52)), wx = wh * tab('cot', 52), wev = 24 / (ct(36) - ct(52));
must(tab('cot', 36) === 1.3764 && tab('cot', 52) === 0.7813 && stable(wev, wh, 1) && R1(wh) === 40.3 && stable(wev * ct(52), wx, 1) && R1(wx) === 31.5 && near(walkH, wh, 1e-9), 'deck2 WE4: 40.3 m and 31.5 m');
const walkTable = table(['Step', 'Working'], [['Two distances', '$AF = h\\cot 36^\\circ$, $BF = h\\cot 52^\\circ$'], ['Gap', '$AF - BF = 24$, so $h(1.3764 - 0.7813) = 24$'], ['Height', '$h = \\dfrac{24}{0.5951} = 40.3$ m'], ['Distance of $B$', '$BF = 40.3\\times 0.7813 = 31.5$ m']], 'Working table for the walker: the distances from the foot are h cotangent thirty-six degrees and h cotangent fifty-two degrees; they differ by twenty-four, so h times zero point five nine five one equals twenty-four, giving a height of forty point three metres; the second point is thirty-one point five metres from the foot.', 'Cotangent turns each angle into a distance from the foot.');
const b1 = 18 * ct(60), up = b1 * tn(30);
must(near(b1, 6 * S3, 1e-9) && near(up, 6, 1e-9) && R1(6 * 1.732) === 10.4 && T.eq(T.mul(T.mul(18, E('cot(60)')), E('tan(30)')), 6), 'deck2 WE5: 6 sqrt3, 6 m, 24 m');
const buildTable = table(['Step', 'Working'], [['Alternate angle at $F$', '$\\angle AFG = 60^\\circ$, so $GF = 18\\cot 60^\\circ = 6\\sqrt{3}$ m'], ['Part of the tower above $A$', '$XT = 6\\sqrt{3}\\tan 30^\\circ = 6\\sqrt{3}\\times\\dfrac{\\sqrt{3}}{3} = 6$ m'], ['Whole tower', '$h = FX + XT = 18 + 6 = 24$ m']], 'Working table for the building and tower: the foot of the tower is eighteen cotangent sixty degrees, which is six root three metres from the building; the part of the tower above the roof is six root three times tangent thirty degrees, which is six metres; so the tower is eighteen plus six, twenty-four metres.', 'The ground distance is common to the lower and upper triangles.');
const scaleRows = [30, 60, 120].map((d) => { const a = (Math.atan2(30, d) * 180) / Math.PI; return [`${d} m`, `${rnd(a, 1).toFixed(1)}`]; });
must(scaleRows[0][1] === '45.0' && scaleRows[1][1] === '26.6' && scaleRows[2][1] === '14.0', 'angles do not scale: 45.0, 26.6, 14.0');
const scaleTable = table(['Distance of observer from a $30$ m tower', 'Angle of elevation (degrees)'], scaleRows, 'Table showing that a 30 metre tower seen from 30 metres has an elevation of 45 degrees, from 60 metres 26.6 degrees and from 120 metres 14.0 degrees: doubling the distance does not halve the angle.', 'Doubling the distance does not halve the angle: use the ratio, not proportion.');
const checklist = table(['Check before you finish', 'Why'], [['Is every angle measured from the horizontal?', 'a vertical reference gives the complementary angle'], ['Do both triangles use the same height or the same base?', 'that shared side links the two equations'], ['Same side or opposite sides?', 'subtract the distances for the same side, add for opposite sides'], ['Is the eye height included?', 'the angle is measured at the eye'], ['Does the answer look sensible, with units and precision stated?', 'a taller object from a nearer point means a larger angle']], 'Checklist for two-triangle problems: measure every angle from the horizontal; find the shared height or base; decide same side or opposite sides; include the eye height; and test that the answer is sensible with units and precision.', 'Five checks that catch most lost marks.');
const slips = table(['Common slip', 'Fix'], [['Measuring depression from the vertical', 'measure from the horizontal through the eye'], ['Multiplying where the height must be divided', 'unknown distance: height divided by tangent'], ['Treating the walked distance as the distance to the foot', 'use two triangles: the gap is the difference'], ['Adding for the same side', 'same side: subtract; opposite sides: add'], ['Rounding in the middle', 'keep surds or four places; round at the end']], 'Table of common slips and fixes: measure depression from the horizontal; divide the height by tangent to find a distance; treat the walked distance as a gap between two distances; subtract for the same side and add for opposite sides; and round only at the end.', 'Four slips that cost the most marks.');
const sum2 = table(['Idea', 'Key fact'], [['Shared side', 'both triangles share the height $h$ (or the distance from the foot)'], ['Same side', '$h\\cot\\alpha - h\\cot\\beta = $ gap'], ['Opposite sides', '$h\\cot\\alpha + h\\cot\\beta = $ gap'], ['Object on top', 'subtract the heights to the bottom and the top'], ['Scope', 'at most two right-angled triangles, in one vertical plane']], 'Summary table for part two: both triangles share the height; on the same side the cotangent terms subtract to the gap; on opposite sides they add; for an object on top subtract the two heights; at most two right triangles in one plane.', 'Part 2 on one card.');
must(near(angAt([-10, 0], [0, 10], [0, 0]), 45, 1e-9), 'misc');

// ---------------------------------------------------------------- decks
const d1 = deck({
  part: 1,
  title: 'Heights and Distances — Part 1: Angles of elevation and depression, one right triangle',
  goals: ['Draw a labelled figure and mark angles of elevation and depression', 'Read exact values and four-place table values', 'Find a height or a distance with one right triangle', 'Allow for eye height and state the precision'],
  slides: [
    sl('title', 'Heights and Distances, Part 1', { b: 'A tower, a rope or a roof: draw the right triangle, then use a ratio.', v: fOver, n: 'Welcome to heights and distances. We find how tall a tower is, or how far away something is, without measuring it directly. We draw a right angled triangle, mark an angle of elevation or depression, and use one trigonometric ratio. In this part we use one triangle.' }),
    sl('concept', 'What you will be able to do', { ul: ['Draw a labelled figure and mark the **angle of elevation** or **depression**', 'Use **exact values** and **table values**', 'Find a height or a distance from **one right triangle**', 'Allow for **eye height** and **round** as asked'], v: steps, n: 'These are your goals. Draw a clear figure first. Mark the angle from the horizontal. Choose exact values or table values. Then solve one right triangle, remembering the height of the eyes, and round the answer as the question asks.' }),
    sl('concept', 'The angle of elevation', { b: 'The angle **above** the horizontal through the eye, up to the line of sight.', v: fElev, n: 'Stand at a point P on the ground and look up at the top of a column. The line of sight goes up. The angle of elevation is the angle between the horizontal through your eye and that line of sight. It is always measured from the horizontal, never from the vertical.' }),
    sl('concept', 'The angle of depression', { b: 'The angle **below** the horizontal through the eye, down to the line of sight.', v: fDep, n: 'Now stand on the top of a building and look down at a jogger. The line of sight goes down. The angle of depression is the angle between the horizontal through your eye and the line of sight to the jogger. Again the reference is the horizontal.' }),
    sl('diagram', 'Depression equals elevation', { b: 'The horizontal through $T$ is parallel to the ground, so the two angles are **alternate angles**.', v: fAlt, n: 'The horizontal line through the observer on top is parallel to the ground. The line of sight is a transversal. So the angle of depression at the top equals the angle of elevation at the bottom. This lets us put the angle inside the right triangle, next to the ground.' }),
    sl('check', 'Quick check: which line?', { b: 'Where is the angle of depression measured from?', chk: 'm02', n: 'Think about the horizontal line through the eye of the observer.' }),
    sl('concept', 'Exact values at standard angles', { b: 'At $30^\\circ$, $45^\\circ$ and $60^\\circ$ keep **surds**, no decimals until the end.', v: stdTable, n: 'For thirty, forty five and sixty degrees we use exact values. Tangent of thirty degrees is root three over three, tangent of forty five degrees is one, and tangent of sixty degrees is root three. Keep the roots in your working and convert to decimals only at the end.' }),
    sl('concept', 'Table values for other angles', { b: 'For other angles the question gives a table value, rounded to **four decimal places**.', v: tabTable, n: 'For other angles the question gives you values from the tables, to four decimal places. For example tangent of thirty five degrees is zero point seven zero zero two. Because the table values are rounded, an answer found with them is an approximation.' }),
    sl('concept', 'Which ratio?', { b: 'Name **opposite**, **adjacent** and **hypotenuse** for the marked angle first.', v: ratioTable, n: 'Always name the sides first. If you know the height and the ground distance, use tangent. A rope, a string or a line of sight is the hypotenuse, so use sine to find the height and cosine to find the ground distance. Choose the ratio that links the two sides in play.' }),
    sl('example', 'Worked example 1: a kite on a string', { b: 'A kite string $80$ m long, pulled taut, makes $30^\\circ$ with level ground. Find the height of the kite.', ul: ['**Step 1 —** The string is the hypotenuse and $h$ is opposite $30^\\circ$: use sine.', '**Step 2 —** $h = 80\\sin 30^\\circ = 80 \\times \\dfrac{1}{2}$.', '**Answer —** $h = 40$ m. The horizontal reach is $40\\sqrt{3} = 69.3$ m.'], v: fWE1, n: 'The string is the hypotenuse and the height is opposite the thirty degree angle, so use sine. Eighty times one half is forty. The kite is forty metres high. The horizontal distance is eighty cosine thirty degrees, forty root three, about sixty nine point three metres.' }),
    sl('check', 'Quick check: a pole from the tables', { b: 'Use $\\tan 36^\\circ = 0.7265$ and round to $0.1$ m.', chk: 'm06', n: 'Name the sides. The distance is adjacent and the height is opposite, so multiply the distance by the tangent from the table.' }),
    sl('example', 'Worked example 2: a tower with tables', { b: 'A point $P$ is $48$ m from the foot of a water-tank tower. The angle of elevation of the top is $52^\\circ$. Using $\\tan 52^\\circ = 1.2799$, find the height to the nearest $0.1$ m.', ul: ['**Step 1 —** $h$ is opposite $52^\\circ$ and $48$ m is adjacent: tangent.', '**Step 2 —** $h = 48\\tan 52^\\circ = 48 \\times 1.2799 = 61.43$.', '**Answer —** $h = 61.4$ m.'], v: fWE2, n: 'The height is opposite the fifty two degree angle and forty eight metres is adjacent, so use tangent. Height equals forty eight times one point two seven nine nine, which is sixty one point four three. To the nearest tenth of a metre the tower is sixty one point four metres tall.' }),
    sl('example', 'Worked example 3: looking down', { b: 'From a rooftop restaurant $72$ m above the ground, a jetty is seen at an angle of depression of $25^\\circ$. Using $\\tan 25^\\circ = 0.4663$, find its horizontal distance from the building.', ul: ['**Step 1 —** The angle at the jetty is also $25^\\circ$ (alternate angles).', '**Step 2 —** $\\tan 25^\\circ = \\dfrac{72}{d}$, so $d = \\dfrac{72}{0.4663}$.', '**Answer —** $d = 154.4$ m.'], v: fWE3, n: 'By alternate angles the angle at the jetty is twenty five degrees. The height seventy two is opposite and the distance d is adjacent. Tangent twenty five degrees equals seventy two over d, so d is seventy two divided by zero point four six six three, one hundred fifty four point four metres.' }),
    sl('check', 'Quick check: a window and a bin', { b: 'The angle of depression is $45^\\circ$ and the window is $12$ m up.', chk: 'fb3', n: 'The tangent of forty five degrees is one, so the distance equals the height.' }),
    sl('concept', 'Eye height', { b: 'The angle is measured at the **eye**, so the figure has two levels.', v: fEye, n: 'When a person measures an angle, it is measured at the eyes, not at the ground. The horizontal line through the eyes meets the tower at H. The right triangle gives the height above eye level, H to T. The height of the eyes must be added at the end.' }),
    sl('example', 'Worked example 4: adding the eye height', { b: 'A surveyor whose eyes are $1.6$ m above the ground stands $30$ m from a mast and sees its top at $40^\\circ$. Use $\\tan 40^\\circ = 0.8391$ and find the height of the mast to $0.1$ m.', ul: ['**Step 1 —** Height above eye level $= 30\\tan 40^\\circ = 25.173$ m.', '**Step 2 —** Add the eye height: $25.173 + 1.6 = 26.773$.', '**Answer —** $26.8$ m.'], v: we4Table, n: 'First find the part of the mast above the surveyor eye level. It is thirty times tangent forty degrees, twenty five point one seven three metres. Then add the height of the eyes, one point six metres, to get twenty six point seven seven three. To the nearest tenth, the mast is twenty six point eight metres.' }),
    sl('check', 'Quick check: true or false', { b: 'Which line is the reference for both angles?', chk: 'tf6', n: 'Recall where each angle is measured from.' }),
    sl('concept', 'Precision and rounding', { b: 'Table values and exact values agree after rounding. **Round once, at the end**, and state the precision.', v: roundTable, n: 'Here the exact value and the value from four place tables are compared. They differ only in the fourth decimal place, so after rounding to the nearest tenth of a metre they give the same answer. Keep extra digits in the working and round only the final answer.' }),
    sl('summary', 'Summary', { ul: ['Elevation and depression are measured from the horizontal; depression at the top equals elevation at the bottom', 'Name the sides, then choose tangent, sine or cosine', 'Surds at $30^\\circ$, $45^\\circ$, $60^\\circ$; four-place tables otherwise', 'Add the eye height; round at the end'], v: sum1, n: 'To sum up part one. Both angles are measured from the horizontal. Name the sides and pick the ratio. Use exact values at the standard angles and tables for others. Add the height of the eyes when the observer is not at ground level, and round at the end as the question asks.' }),
    sl('exam-tips', 'Exam tips: how marks are awarded', { ul: ['**One-triangle problem (3 marks):** figure or angle identified 1 + ratio equation 1 + answer with units 1', '**Always draw** a labelled figure and mark the angle from the horizontal', '**State the precision** you used, such as the nearest $0.1$ m', '**Mistake:** dividing where you should multiply, or the reverse', '**Mistake:** forgetting the eye height'], n: 'In the exam, draw the figure. It usually earns a mark by itself. Write the ratio equation, solve, and give the answer with units and the precision asked for. Check whether you should multiply or divide, and never forget the eye height when it is given.' }),
  ],
});

const d2 = deck({
  part: 2,
  title: 'Heights and Distances — Part 2: Problems with two right-angled triangles',
  goals: ['Link two triangles through a shared height', 'Solve same-side and opposite-side problems', 'Find the height of an object on top of another', 'Check a two-triangle answer before finishing'],
  slides: [
    sl('title', 'Heights and Distances, Part 2', { b: 'Two angles, one height: the shared side joins two right triangles.', v: strategy, n: 'Welcome to part two. Many problems give two angles, from two places, or to two points. Then there are two right angled triangles. They always share a side, the height or the distance from the foot, and that shared side lets us write one equation.' }),
    sl('concept', 'What you will be able to do', { ul: ['Join two triangles through the **shared height**', 'Handle **same side** and **opposite side** cases', 'Find the height of an **object on top**', 'Run a **final check** on the answer'], v: checklist, n: 'These are your goals. Join two triangles through the shared side. Decide whether the two points are on the same side or opposite sides. Handle an object standing on top of another. And finish with a quick check that catches most lost marks.' }),
    sl('concept', 'Two triangles, one height', { b: 'Both points look at the same top $T$, so $FT = h$ in both triangles.', v: fSame, n: 'Here two points P and Q lie in line with the foot of the tower on the same side. From P the elevation is thirty degrees, from Q forty five degrees. Both triangles contain the same height. The ground distances are h cotangent of each angle, and they differ by twenty four metres.' }),
    sl('example', 'Worked example 1: same side', { b: 'The top of a tower is seen at $30^\\circ$ and $45^\\circ$ from two points $24$ m apart, in line with its foot and on the same side. Find the height of the tower.', ul: ['**Step 1 —** $QF = x$, so $h = x\\tan 45^\\circ = x$.', '**Step 2 —** $h = (x + 24)\\tan 30^\\circ$, so $\\sqrt{3}\\,x = x + 24$.', '**Answer —** $x = 12(\\sqrt{3} + 1)$, so $h = 32.8$ m.'], v: sameTable, n: 'Let the nearer distance be x. From the nearer point the height equals x, because tangent forty five degrees is one. From the farther point the height is x plus twenty four over root three. Equate: root three x equals x plus twenty four. So x is twelve times root three plus one, and the height is thirty two point eight metres.' }),
    sl('check', 'Quick check: the equation', { b: 'Which equation links the two triangles?', chk: 'm15', n: 'Both triangles share the height. Write the height from each point and equate.' }),
    sl('concept', 'Points on opposite sides', { b: 'From the top, depressions to **two sides**: each distance is $h\\cot\\theta$ and the distances **add**.', v: fOpp, n: 'Now the two points are on opposite sides of the foot. From the sky walk D, the left point is seen at sixty degrees depression and the right point at forty five degrees. By alternate angles these equal the angles of elevation at the points. The two distances from the foot add to give the gap.' }),
    sl('example', 'Worked example 2: opposite sides', { b: 'A sky-walk is $48$ m above level ground. Two points on opposite sides of the point below it are seen at depressions of $60^\\circ$ and $45^\\circ$. Find the distance between the points.', ul: ['**Step 1 —** $AF = 48\\cot 60^\\circ = 16\\sqrt{3}$ m.', '**Step 2 —** $FB = 48\\cot 45^\\circ = 48$ m.', '**Answer —** $AB = 16\\sqrt{3} + 48 = 75.7$ m.'], v: oppTable, n: 'By alternate angles the elevations at the two points are sixty and forty five degrees. The left point is forty eight cotangent sixty degrees, sixteen root three metres, from the foot. The right point is forty eight metres from the foot. They are on opposite sides, so we add. The distance is seventy five point seven metres.' }),
    sl('check', 'Quick check: the ratio of distances', { b: 'Test the statement with cotangents.', chk: 'tf3', n: 'Write the distance from the foot for each angle as the height times the cotangent, and compare the two.' }),
    sl('concept', 'An object on top of another', { b: 'A finial, flagstaff or statue: subtract the **height of the bottom** from the **height of the top**.', v: fTop, n: 'Sometimes an object stands on top of a tower. From one point we see the bottom of the object at one angle and its top at a larger angle. Both heights are read from the same ground distance, so the length of the object is the difference of the two heights.' }),
    sl('example', 'Worked example 3: a finial', { b: 'From a point $36$ m from the foot of a temple tower, the angles of elevation of the bottom and top of its finial are $45^\\circ$ and $52^\\circ$. Using $\\tan 52^\\circ = 1.2799$, find the length of the finial.', ul: ['**Step 1 —** $FB = 36\\tan 45^\\circ = 36$ m.', '**Step 2 —** $FT = 36\\tan 52^\\circ = 46.08$ m.', '**Answer —** $BT = 46.08 - 36 = 10.1$ m.'], v: topTable, n: 'The bottom of the finial is thirty six metres high because tangent forty five degrees is one. The top is thirty six times one point two seven nine nine, forty six point zero eight metres. The finial is the difference, ten point one metres to the nearest tenth.' }),
    sl('check', 'Quick check: a pole and a tower', { b: 'Find the distance first, then the drop.', chk: 'm17', n: 'The distance to the foot is common to both depression triangles.' }),
    sl('concept', 'A walker or a vehicle approaching', { b: 'Moving towards the tower: the **gap walked** is the difference of the two distances from the foot.', v: fWalk, n: 'A walker moves twenty four metres towards a tower. At the first point the elevation is thirty six degrees, at the second fifty two degrees. The twenty four metres is not the distance to the foot. It is the difference between the two distances, so we again use the height in both triangles.' }),
    sl('example', 'Worked example 4: the walker', { b: 'A walker moves $24$ m towards a tower; the elevation changes from $36^\\circ$ to $52^\\circ$. Using $\\cot 36^\\circ = 1.3764$ and $\\cot 52^\\circ = 0.7813$, find the height and the final distance from the foot.', ul: ['**Step 1 —** $AF = h\\cot 36^\\circ$ and $BF = h\\cot 52^\\circ$.', '**Step 2 —** $AF - BF = 24$ gives $h(1.3764 - 0.7813) = 24$.', '**Answer —** $h = 40.3$ m and $BF = 31.5$ m.'], v: walkTable, n: 'Write each distance from the foot as the height times a cotangent. Their difference is twenty four. So h times zero point five nine five one equals twenty four, and h is forty point three metres. The final distance from the foot is forty point three times zero point seven eight one three, thirty one point five metres.' }),
    sl('check', 'Quick check: a boat approaches', { b: 'Explain why the angle grows as the boat gets closer.', chk: 'ar6', n: 'Recall that tangent of the angle is height divided by distance.' }),
    sl('example', 'Worked example 5: a building and a tower', { b: 'From the top of an $18$ m building, the foot of a tower is seen at a depression of $60^\\circ$ and its top at an elevation of $30^\\circ$. Find the height of the tower.', ul: ['**Step 1 —** $GF = 18\\cot 60^\\circ = 6\\sqrt{3}$ m.', '**Step 2 —** $XT = 6\\sqrt{3}\\tan 30^\\circ = 6$ m.', '**Answer —** $h = 18 + 6 = 24$ m.'], v: fBuild, n: 'By alternate angles the foot of the tower is eighteen cotangent sixty degrees, six root three metres, from the building. In the upper triangle the part of the tower above the roof is six root three times tangent thirty degrees, which is six metres. The tower is eighteen plus six, twenty four metres tall.' }),
    sl('concept', 'Angles do not scale', { b: 'Never use proportion on angles: use the **tangent ratio**.', v: scaleTable, n: 'A common mistake is to think that doubling the distance halves the angle. It does not. A thirty metre tower is seen at forty five degrees from thirty metres, but only about twenty six point six degrees from sixty metres. The ratio is what scales, not the angle.' }),
    sl('concept', 'Five checks before you finish', { b: 'A short routine for every two-triangle problem.', v: checklist, n: 'Before you finish, run these five checks. Is each angle measured from the horizontal? Do both triangles share a height or distance? Same side or opposite sides? Is the eye height included? And is the answer sensible, with units and the precision stated?' }),
    sl('concept', 'Common slips', { b: 'These cost marks most often.', v: slips, n: 'Watch these slips. Do not measure a depression from the vertical. Divide the height by tangent to get a distance. Do not treat the walked distance as the distance to the foot. Subtract for the same side, add for opposite sides, and round only at the end.' }),
    sl('summary', 'Summary', { ul: ['Two triangles share a **height** or a **distance from the foot**', 'Same side: subtract; opposite sides: add', 'Object on top: subtract the heights', 'At most **two** right-angled triangles in one vertical plane'], v: sum2, n: 'To sum up part two. Two triangles share a side, and that gives one equation. On the same side the cotangent terms subtract to the gap, on opposite sides they add. An object on top is a difference of heights. Problems at this level use at most two right angled triangles in one plane.' }),
    sl('exam-tips', 'Exam tips: how marks are awarded', { ul: ['**Two-triangle problem (4 marks):** figure 1 + first triangle 1 + second triangle or equation 1 + answer 1', '**Name the shared side** in your working', '**Use exact values** when the angles are $30^\\circ$, $45^\\circ$, $60^\\circ$', '**Mistake:** adding distances for points on the same side', '**Mistake:** treating the walked distance as the distance to the foot'], n: 'Examiners reward the figure, the first triangle, the equation linking the second, and the answer with units. Name the shared side. Use exact values at the standard angles and tables for the rest. And remember: subtract for the same side, add for opposite sides.' }),
  ],
});

// ---------------------------------------------------------------- notes
const notes = {
  unit: 'icse-10-mathematics-ch21', version: 1, title: 'Heights and Distances — chapter notes', language: 'en',
  sections: [
    { heading: '1. Angles of elevation and depression', body_md: r`The **angle of elevation** is the angle between the horizontal through the observer's eye and the line of sight to an object **above** eye level. The **angle of depression** is the angle between that horizontal and the line of sight to an object **below** eye level. Both are measured from the horizontal, never from the vertical.

Because the horizontal through the observer is parallel to the ground, the angle of depression of an object equals the angle of elevation of the observer (alternate angles).

*Example:* from a $45$ m deck a jogger is seen at a depression of $25^\circ$, so the angle at the jogger is $25^\circ$ inside the right triangle.`, key_terms: [{ term: 'Angle of elevation', definition_md: 'Angle above the horizontal through the eye, up to the line of sight.' }, { term: 'Angle of depression', definition_md: 'Angle below the horizontal through the eye, down to the line of sight.' }, { term: 'Line of sight', definition_md: 'The straight line from the eye to the object looked at.' }], formulas: [], visual: fOver, visuals: [fAlt], topic_ids: [topic(1)] },
    { heading: '2. Exact values and the trigonometric tables', body_md: r`At $30^\circ$, $45^\circ$ and $60^\circ$ use exact values: $\tan 30^\circ = \dfrac{1}{\sqrt{3}}$, $\tan 45^\circ = 1$, $\tan 60^\circ = \sqrt{3}$, and the sines and cosines from the table. For other angles, read the value from the tables, which are rounded to **four decimal places**, for example $\tan 35^\circ = 0.7002$.

An answer found with table values is approximate. Say how you rounded: "correct to the nearest $0.1$ m".

*Example:* with $\tan 40^\circ = 0.8391$, $18\tan 40^\circ = 15.1$ m.`, key_terms: [{ term: 'Table value', definition_md: 'A ratio read from the tables, rounded to four decimal places.' }], formulas: [{ latex: '\\tan 30^\\circ = \\dfrac{1}{\\sqrt{3}},\\quad \\tan 45^\\circ = 1,\\quad \\tan 60^\\circ = \\sqrt{3}', label: 'Exact tangent values' }], visual: stdTable, visuals: [tabTable], topic_ids: [topic(1)] },
    { heading: '3. One right triangle: choosing the ratio', body_md: r`Draw the figure, mark the angle from the horizontal, and name **opposite**, **adjacent** and **hypotenuse** for that angle.

- height and ground distance: $\tan\theta = \dfrac{\text{height}}{\text{distance}}$;
- a rope, string or line of sight (hypotenuse): $\text{height} = \text{slant}\times\sin\theta$ and $\text{distance} = \text{slant}\times\cos\theta$;
- an unknown distance with a known height: $\text{distance} = \dfrac{\text{height}}{\tan\theta}$.

*Example:* a taut kite string of $80$ m at $30^\circ$: height $80\sin 30^\circ = 40$ m.`, key_terms: [{ term: 'Hypotenuse', definition_md: 'The side opposite the right angle: the rope, string or line of sight.' }], formulas: [{ latex: '\\text{height} = \\text{distance}\\times\\tan\\theta', label: 'Height from ground distance' }], visual: ratioTable, visuals: [fWE1, we1Table, fWE2, we2Table, fWE3, we3Table], topic_ids: [topic(2)] },
    { heading: '4. Eye height and precision', body_md: r`The angle is measured at the observer's **eye**. If the eye is $e$ m above the ground, the right triangle gives the height above eye level, and

$$\text{height of the object} = e + \text{distance}\times\tan\theta.$$

Keep surds or extra decimals in the working, and **round once, at the end**, to the precision asked. A table-based answer and an exact answer agree after rounding.

*Example:* $e = 1.6$ m, distance $30$ m, $\theta = 40^\circ$: $1.6 + 30\times 0.8391 = 26.8$ m.`, key_terms: [{ term: 'Eye height', definition_md: 'The height of the observer\'s eyes above the ground, added to the height above eye level.' }], formulas: [{ latex: 'h = e + d\\tan\\theta', label: 'Height with eye height' }], visual: fEye, visuals: [we4Table, roundTable], topic_ids: [topic(2)] },
    { heading: '5. Two triangles: points on the same side', body_md: r`Two points $P$ and $Q$ in line with the foot $F$ of a tower, on the same side, give two right triangles with the **same height** $h$. With $QF$ nearer, elevations $\alpha$ at $P$ and $\beta$ at $Q$, and $PQ = d$:

$$h\cot\alpha - h\cot\beta = d, \qquad h = \dfrac{d}{\cot\alpha - \cot\beta}.$$

*Example:* $d = 24$, $\alpha = 30^\circ$, $\beta = 45^\circ$ gives $h = 12(\sqrt{3} + 1) = 32.8$ m. A walker who moves $24$ m towards the tower is the same problem: $24$ m is a **gap**, not the distance to the foot.`, key_terms: [{ term: 'Shared side', definition_md: 'The height (or the distance from the foot) common to both right triangles.' }], formulas: [{ latex: 'h = \\dfrac{d}{\\cot\\alpha - \\cot\\beta}', label: 'Same side' }], visual: fSame, visuals: [sameTable, fWalk, walkTable], topic_ids: [topic(3)] },
    { heading: '6. Opposite sides and an object on top', body_md: r`**Opposite sides.** From a height $h$ the angles of depression to two points on opposite sides of the foot are $\alpha$ and $\beta$. By alternate angles the distances from the foot are $h\cot\alpha$ and $h\cot\beta$, and they **add**:

$$AB = h\cot\alpha + h\cot\beta.$$

**An object on top.** From a point $x$ from the foot, the bottom and the top of the object are seen at $\alpha$ and $\beta$. Its length is $x\tan\beta - x\tan\alpha$.

*Example:* $48$ m, depressions $60^\circ$ and $45^\circ$: $AB = 16\sqrt{3} + 48 = 75.7$ m.`, key_terms: [{ term: 'Alternate angles', definition_md: 'Equal angles between parallel lines on opposite sides of a transversal.' }], formulas: [{ latex: 'AB = h\\cot\\alpha + h\\cot\\beta', label: 'Opposite sides' }, { latex: 'x\\tan\\beta - x\\tan\\alpha', label: 'Length of an object on top' }], visual: fOpp, visuals: [oppTable, fTop, topTable, fBuild, buildTable], topic_ids: [topic(3)] },
    { heading: '7. Checklist and scope', body_md: r`1. Draw a labelled figure; mark the horizontal and the angle.
2. Find the shared side (height or distance).
3. Same side: subtract the distances. Opposite sides: add them.
4. Include the eye height if the observer is not at ground level.
5. Check the answer is sensible; give units and the stated precision.

Doubling the distance does not halve the angle: use the ratio.

*Not in the ICSE 2027 syllabus:* problems involving more than two right-angled triangles, and three-dimensional problems. Every problem in this chapter uses at most two right-angled triangles in one vertical plane.`, key_terms: [{ term: 'Gap', definition_md: 'The distance between two observation points, equal to the difference (same side) or the sum (opposite sides) of their distances from the foot.' }], formulas: [], visual: strategy, visuals: [checklist, slips, scaleTable], topic_ids: [topic(2), topic(3)] },
  ],
  exam_tips_md: r`**How marks are awarded**
- *One-triangle problem (2–3 marks):* figure or angle identified 1; ratio equation 1; answer with units 1.
- *Two-triangle problem (3–4 marks):* figure 1; first triangle 1; second triangle or linking equation 1; answer 1.
- *10-mark structured question:* parts (a), (b), (c) usually 3 + 3 + 4; show all working.

**Common mistakes**
1. Measuring an angle of depression from the vertical.
2. Multiplying where the height must be divided (unknown distance).
3. Forgetting the eye height.
4. Treating the walked distance as the distance to the foot.
5. Adding distances for points on the same side (or subtracting for opposite sides).
6. Rounding in the middle of the working, or not stating the precision.`,
  status: 'draft', provenance: d1.provenance,
};

// ---------------------------------------------------------------- flashcards
const fc = (id, front_md, back_md, tag, t) => ({ id, front_md, back_md, tag, topic_id: topic(t) });
must(R1(18 * tab('tan', 40)) === 15.1 && R1(12 * 2.732) === 32.8 && near(40 * tn(30) * 0 + 30 * tn(45), 30, 1e-9), 'flashcard values');
const flashcards = {
  unit: 'icse-10-mathematics-ch21', version: 1, language: 'en',
  cards: [
    fc('f01', 'What is the **angle of elevation**?', 'The angle above the horizontal through the eye, up to the line of sight to an object above eye level.', 'definition', 1),
    fc('f02', 'What is the **angle of depression**?', 'The angle below the horizontal through the eye, down to the line of sight to an object below eye level.', 'definition', 1),
    fc('f03', 'From which line are both angles measured?', 'The horizontal through the observer\'s eye, never the vertical.', 'concept', 1),
    fc('f04', 'Why does the depression at the top equal the elevation at the bottom?', 'The horizontal through the top is parallel to the ground, so the two angles are alternate angles.', 'concept', 1),
    fc('f05', 'Value of $\\tan 30^\\circ$?', '$\\dfrac{1}{\\sqrt{3}}$', 'fact', 1),
    fc('f06', 'Value of $\\tan 45^\\circ$?', '$1$, so at $45^\\circ$ the distance equals the height.', 'fact', 1),
    fc('f07', 'Value of $\\tan 60^\\circ$?', '$\\sqrt{3}$', 'fact', 1),
    fc('f08', 'How accurate are table values?', 'Rounded to four decimal places, so answers found with them are approximate.', 'fact', 1),
    fc('f09', 'Which ratio links the height and the ground distance?', 'Tangent: $\\tan\\theta = \\dfrac{\\text{height}}{\\text{distance}}$.', 'formula', 2),
    fc('f10', 'A rope of length $L$ makes angle $\\theta$ with the ground. Height?', '$L\\sin\\theta$ (the rope is the hypotenuse).', 'formula', 2),
    fc('f11', 'A rope of length $L$ makes angle $\\theta$ with the ground. Horizontal reach?', '$L\\cos\\theta$', 'formula', 2),
    fc('f12', 'Known height $h$ and angle $\\theta$: ground distance?', '$\\dfrac{h}{\\tan\\theta}$', 'formula', 2),
    fc('f13', 'Known distance $d$ and angle $\\theta$: height?', '$d\\tan\\theta$', 'formula', 2),
    fc('f14', 'A kite string $80$ m long at $30^\\circ$: height?', '$80\\sin 30^\\circ = 40$ m.', 'example', 2),
    fc('f15', '$48$ m from a tower at $52^\\circ$, $\\tan 52^\\circ = 1.2799$: height?', '$48\\times 1.2799 = 61.4$ m (nearest $0.1$ m).', 'example', 2),
    fc('f16', 'Observer\'s eyes are $e$ m high. Height of the object?', '$e + d\\tan\\theta$: add the eye height at the end.', 'exam-tip', 2),
    fc('f17', 'When do you round the answer?', 'Once, at the end, to the precision asked; keep surds or extra decimals in the working.', 'exam-tip', 2),
    fc('f18', 'Why is the walked distance not the distance to the foot?', 'It is only the gap between two points; two triangles with a shared height are needed.', 'concept', 3),
    fc('f19', 'Two points on the same side, gap $d$, elevations $\\alpha$ (far) and $\\beta$ (near): height?', '$h = \\dfrac{d}{\\cot\\alpha - \\cot\\beta}$', 'formula', 3),
    fc('f20', 'Same side: do the distances add or subtract?', 'Subtract: the far distance exceeds the near one by the gap.', 'concept', 3),
    fc('f21', 'Opposite sides: do the distances add or subtract?', 'Add: they lie on either side of the foot.', 'concept', 3),
    fc('f22', 'Opposite sides, depressions $\\alpha$ and $\\beta$ from height $h$: distance between the points?', '$h\\cot\\alpha + h\\cot\\beta$', 'formula', 3),
    fc('f23', 'Length of an object on top of a tower, seen at $\\alpha$ (bottom) and $\\beta$ (top) from distance $x$?', '$x\\tan\\beta - x\\tan\\alpha$', 'formula', 3),
    fc('f24', '$\\cot 30^\\circ$ and $\\cot 60^\\circ$?', '$\\sqrt{3}$ and $\\dfrac{1}{\\sqrt{3}}$', 'fact', 3),
    fc('f25', 'Does doubling the distance halve the angle of elevation?', 'No. A $30$ m tower is seen at $45^\\circ$ from $30$ m but only $26.6^\\circ$ from $60$ m.', 'concept', 3),
    fc('f26', 'How many right triangles may a problem use in this syllabus?', 'At most two, in one vertical plane. Three-dimensional problems are not included.', 'fact', 3),
    fc('f27', 'First step in any heights-and-distances problem?', 'Draw a labelled figure and mark the horizontal and the angle.', 'exam-tip', 1),
    fc('f28', 'Same side, $24$ m gap, $30^\\circ$ and $45^\\circ$: height?', '$12(\\sqrt{3} + 1) = 32.8$ m.', 'example', 3),
  ],
  status: 'draft', provenance: d1.provenance,
};

// ---------------------------------------------------------------- release + tests
const release = {
  unit: 'icse-10-mathematics-ch21', version: 1, academic_year: '2026-27', created_at: '2026-11-02T00:00:00+05:30',
  decks: [d1, d2], notes, flashcards, questions: [],
  build: { run_id: null, checks: { syllabus: 'topics t01–t03: angles of elevation and depression, exact values and four-place tables (t01); problems with one right-angled triangle (t02); problems with two right-angled triangles (t03). Removed for ICSE 2027 (named once, in the notes): more than two right-angled triangles, three-dimensional problems; nothing in this chapter uses either.', exact_arithmetic: 'values at 30, 45 and 60 degrees are exact surds from the Q(sqrt2, sqrt3) arithmetic of src/trig.mjs; table values come from Math rounded to four decimals; every table-based answer and its exact counterpart must round alike to the stated precision (0.1 m) and neither may sit within 0.08 of a rounding boundary, or within 0.02 where a decimal is taken from a surd with sqrt 3 = 1.732 (stable() and stableS() in src/ht.mjs)', figures: 'every figure is drawn from real coordinates in metres by scene() in src/ht.mjs: every numeric length label equals the distance between its endpoints, every degree label equals the angle measured from the coordinates (1e-6), right-angle marks measure 90, and each figure shows the data of its problem' } },
};
const tests = chapterTests('Heights and Distances', {
  A: ['m05', 'm08', 'm13', 'ar4', 's301', 's302'],
  B: ['l01', 'l02'],
}, {
  A: ['m03', 'm07', 'm09', 'm10', 'm14', 'm16', 'ar1', 'ar3', 's401', 's403', 's405'],
  B: ['l03', 'l04', 'l05'],
});
build({ dir: DIR, release, testsSpec: tests });
