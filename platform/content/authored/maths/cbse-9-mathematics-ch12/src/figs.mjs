// Figures of CBSE 9 Mathematics ch12 Area and Perimeter, shared by the deck builder and the question banks. Every point is computed
// (1 drawing unit = 1 length unit, so every length label agrees with the drawn length, and the lint measures them again); every area
// quoted beside a figure is asserted from the coordinates by the shoelace formula or by the formula under test.
import { fig, polar, P, onC, dist, mid, angleAt, heron, brahma, cyclicFromSides, circumcentre, polyArea, arcSegs, must, close, triFromSides, circleArea, PI7, rd } from './h.mjs';

const O = [0, 0];
const rt = (a, b, c) => ({ at: a, from: b, to: c, right: true });

// ---- circumference: a circle of diameter 14 cm
must(close(2 * PI7 * 7, 44) && close(PI7 * 14, 44), 'circumference 44');
export const fCirc = fig({
  points: { O: P(O, 's'), A: P([-7, 0], 'w'), B: P([7, 0], 'e') },
  circles: [{ center: 'O', radius: 7 }],
  segments: [{ from: 'A', to: 'B', label: '14 cm' }],
}, 'A circle with a diameter AB of 14 centimetres drawn through the centre O. Walking once round the circle covers 22 sevenths of the diameter, which is 44 centimetres.', 'Circumference $= \\pi d = \\dfrac{22}{7} \\times 14 = 44$ cm.');

// ---- the Egyptian rule: a square of side 8/9 of the diameter has about the same area as the circle (diameter 9)
must(close((8 / 9 * 9) ** 2, 64) && close(Math.PI * 4.5 ** 2, 63.617, 1e-3) && close((16 / 9) ** 2, 256 / 81), 'Egyptian rule');
export const fEgypt = fig({
  points: { O: P(O, false, false), A: P([-4.5, 0], 'w', false), B: P([4.5, 0], 'e', false), S1: P([-4, -4], undefined, false), S2: P([4, -4], undefined, false), S3: P([4, 4], undefined, false), S4: P([-4, 4], undefined, false) },
  circles: [{ center: 'O', radius: 4.5 }],
  segments: [{ from: 'A', to: 'B', label: '9' }, { from: 'S1', to: 'S2', label: '8' }, { from: 'S2', to: 'S3' }, { from: 'S3', to: 'S4' }, { from: 'S4', to: 'S1' }],
}, 'A circle of diameter 9 units and a square of side 8 units, drawn on the same centre. The ancient Egyptian rule says that the two have nearly the same area: the square has area 64 and the circle has area about 63.6.', 'A square of side $\\tfrac{8}{9}$ of the diameter has area $64$ for a circle of diameter $9$ (area about $63.6$).');

// ---- sector, radius 9 cm, angle 100 degrees
export const SEC = { r: 9, deg: 100 };
function sectorFig(rr, deg, alt, caption, { show = true, label = `${deg}°` } = {}) {
  const points = { O: P(O, 's'), A: P([rr, 0], 'e'), B: P(polar(O, rr, deg), compassOf(deg)) };
  const arc = arcSegs(points, 'k', O, rr, 0, deg, 30);
  const segs = [{ from: 'O', to: 'A', label: `${rr} cm` }, { from: 'O', to: 'B', label: `${rr} cm` }, ...arc];
  return fig({ points, segments: segs, angles: show ? [{ at: 'O', from: 'A', to: 'B', label }] : [] }, alt, caption);
}
function compassOf(deg) { return deg > 100 ? 'nw' : deg > 60 ? 'n' : 'ne'; }
must(close(angleAt(O, [9, 0], polar(O, 9, 100)), 100) && close((100 / 360) * 2 * 3.14 * 9, 15.7) && close((100 / 360) * 3.14 * 81, 70.65), 'sector 100 degrees, radius 9');
export const fArc = sectorFig(9, 100, 'A sector with the centre O, two radii OA and OB of 9 centimetres each, and the arc AB between them. The angle AOB at the centre is 100 degrees.', 'Sector of radius $9$ cm and angle $100^\\circ$. With $\\pi = 3.14$: arc $= 15.7$ cm, area $= 70.65$ cm$^2$.');

// ---- the window: a rectangle 56 cm by 80 cm topped by a semicircle of radius 28 cm
const win = { w: 56, h: 80, rr: 28 };
const winArc = (22 / 7) * win.rr, winPer = 2 * win.h + win.w + winArc, winArea = win.w * win.h + 0.5 * (22 / 7) * win.rr ** 2;
must(close(winArc, 88) && close(winPer, 304) && close(winArea, 5712), 'window numbers');
export const WIN = { ...win, arc: winArc, per: winPer, area: winArea };
export const fWindow = (() => {
  const points = { A: P([0, 0], 'sw'), B: P([win.w, 0], 'se'), C: P([win.w, win.h], 'e'), D: P([0, win.h], 'w'), M: P([win.w / 2, win.h], false, false) };
  const arc = arcSegs(points, 'k', [win.w / 2, win.h], win.rr, 0, 180, 36);
  return fig({
    points,
    segments: [{ from: 'A', to: 'B', label: '56 cm' }, { from: 'A', to: 'D', label: '80 cm' }, { from: 'B', to: 'C', label: '80 cm' }, { from: 'D', to: 'C', dashed: true }, ...arc],
  }, 'A window made of a rectangle 56 centimetres wide and 80 centimetres high with a semicircle of radius 28 centimetres on top. The dashed line is the diameter of the semicircle; it is not part of the frame.', 'Frame: $80 + 56 + 80$ plus the semicircular arc $\\dfrac{22}{7} \\times 28 = 88$ cm.');
})();

// ---- Heron: triangle 25, 29, 36 with the height 20 on the side of 36
const H = { B: [0, 0], C: [36, 0], A: [15, 20], F: [15, 0] };
must(close(dist(H.A, H.B), 25) && close(dist(H.A, H.C), 29) && close(dist(H.B, H.C), 36) && close(heron(25, 29, 36), 360) && close(polyArea([H.A, H.B, H.C]), 360) && close(0.5 * 36 * 20, 360), 'Heron 25 29 36');
export const fHeron = fig({
  points: { A: P(H.A, 'n'), B: P(H.B, 'sw'), C: P(H.C, 'se'), F: P(H.F, 's') },
  segments: [{ from: 'A', to: 'B', label: '25 cm' }, { from: 'A', to: 'C', label: '29 cm' }, { from: 'B', to: 'C', label: '36 cm' }, { from: 'A', to: 'F', label: '20 cm', dashed: true }],
  angles: [rt('F', 'A', 'C')],
}, 'A triangle ABC with AB of 25 centimetres, AC of 29 centimetres and BC of 36 centimetres. The dashed height AF from A to BC is 20 centimetres and makes a right angle with BC.', 'Heron: $s = 45$, area $= \\sqrt{45 \\times 20 \\times 16 \\times 9} = 360$ cm$^2$, the same as $\\tfrac{1}{2} \\times 36 \\times 20$.');

// ---- median bisects the area: B(0,0), C(14,0), A(5,12), D = mid-point of BC
const M = { B: [0, 0], C: [14, 0], A: [5, 12], D: [7, 0], F: [5, 0] };
must(close(polyArea([M.A, M.B, M.C]), 84) && close(polyArea([M.A, M.B, M.D]), 42) && close(polyArea([M.A, M.D, M.C]), 42) && close(dist(M.B, M.D), dist(M.D, M.C)), 'median halves the area');
export const fMedian = fig({
  points: { A: P(M.A, 'n'), B: P(M.B, 'sw'), C: P(M.C, 'se'), D: P(M.D, 's'), F: P(M.F, 's') },
  segments: [{ from: 'A', to: 'B' }, { from: 'A', to: 'C' }, { from: 'B', to: 'D', label: '7 cm', ticks: 1 }, { from: 'D', to: 'C', label: '7 cm', ticks: 1 }, { from: 'A', to: 'D' }, { from: 'A', to: 'F', label: '12 cm', dashed: true }],
  polygons: [{ vertices: ['A', 'B', 'D'], highlight: 'shade' }, { vertices: ['A', 'D', 'C'], highlight: 'outline' }],
  angles: [rt('F', 'A', 'C')],
}, 'A triangle ABC with D the mid-point of BC. The median AD splits the triangle into triangles ABD and ADC. BD and DC are 7 centimetres each, and the dashed height from A to BC is 12 centimetres for both triangles, so each has area 42 square centimetres.', 'Equal bases $BD = DC = 7$ cm and the same height $12$ cm: each half has area $42$ cm$^2$.');

// ---- a regular 12-gon in a circle of radius 10 (area 3 r^2 = 300, against pi r^2 = 314.16)
const poly12 = Array.from({ length: 12 }, (_, i) => polar(O, 10, 30 * i));
must(close(polyArea(poly12), 300, 1e-9) && close(0.5 * 12 * 100 * Math.sin(Math.PI / 6), 300), 'regular 12-gon');
export const fPoly = (() => {
  const points = { O: P(O, false, false) };
  poly12.forEach((p, i) => { points[`V${i}`] = P(p, undefined, false); });
  return fig({ points, circles: [{ center: 'O', radius: 10 }], segments: poly12.map((_, i) => ({ from: `V${i}`, to: `V${(i + 1) % 12}` })) },
    'A circle of radius 10 units with a regular polygon of 12 sides drawn inside it, with all its corners on the circle. The polygon fills most of the circle, and its area is 300 square units against about 314 for the circle.', 'A polygon with more and more sides fills the circle better and better.');
})();

// ---- segment: radius 14 cm, angle 90 degrees (sector 154, triangle 98, segment 56 with pi = 22/7)
must(close((90 / 360) * (22 / 7) * 196, 154) && close(0.5 * 14 * 14, 98) && close(154 - 98, 56), 'segment numbers');
export const fSeg = (() => {
  const points = { O: P(O, 'sw'), A: P([14, 0], 'e'), B: P([0, 14], 'n') };
  const arc = arcSegs(points, 'k', O, 14, 0, 90, 30);
  return fig({ points, segments: [{ from: 'O', to: 'A', label: '14 cm' }, { from: 'O', to: 'B', label: '14 cm' }, { from: 'A', to: 'B', dashed: true }, ...arc], polygons: [{ vertices: ['O', 'A', 'B'], highlight: 'shade' }], angles: [rt('O', 'A', 'B')] },
    'A quarter circle with centre O and radius 14 centimetres. The chord AB is dashed, and the triangle OAB is shaded. The segment is the part of the sector between the chord AB and the arc AB.', 'Segment $=$ sector $-$ triangle $= 154 - 98 = 56$ cm$^2$ (with $\\pi = \\tfrac{22}{7}$).');
})();

// ---- a circle inside a square of side 28 cm
must(close(28 * 28 - circleArea(14, PI7), 168), 'corners 168');
export const fCircSq = fig({
  points: { O: P([14, 14], false, false), P1: P([0, 0], undefined, false), P2: P([28, 0], undefined, false), P3: P([28, 28], undefined, false), P4: P([0, 28], undefined, false), R: P([28, 14], 'e', false) },
  circles: [{ center: 'O', radius: 14 }],
  segments: [{ from: 'P1', to: 'P2', label: '28 cm' }, { from: 'P2', to: 'P3' }, { from: 'P3', to: 'P4' }, { from: 'P4', to: 'P1' }, { from: 'O', to: 'R', label: '14 cm' }],
}, 'A square tile of side 28 centimetres with the largest circle drawn inside it, touching all four sides. The radius of the circle is 14 centimetres. The four corner pieces outside the circle make up the area to be found.', 'Corner pieces $= 28^2 - \\dfrac{22}{7} \\times 14^2 = 784 - 616 = 168$ cm$^2$.');

// ---- a ring: radii 14 m and 17.5 m
must(close(PI7 * (17.5 ** 2 - 14 ** 2), 346.5) && close(PI7 * 17.5 ** 2 - PI7 * 14 ** 2, 346.5), 'ring');
export const fRing = fig({
  points: { O: P(O, 's'), A: P([14, 0], 's', false), B: P([17.5, 0], 'se', false) },
  circles: [{ center: 'O', radius: 14 }, { center: 'O', radius: 17.5 }],
  segments: [{ from: 'O', to: 'A', label: '14 m' }, { from: 'A', to: 'B', label: '3.5 m' }],
}, 'Two circles with the same centre O. The inner circle, a pond, has radius 14 metres. The outer circle is the outer edge of a path of width 3.5 metres, so its radius is 17.5 metres.', 'A path around a pond: inner radius $14$ m, width $3.5$ m, outer radius $17.5$ m.');

// ---- Brahmagupta: cyclic quadrilateral with sides 7, 24, 20, 15 and diameter 25
const bq = { A: [-12.5, 0], C: [12.5, 0], B: [-12.5 + 7 * (7 / 25), 7 * (24 / 25)], D: [-12.5 + 15 * 0.6, -15 * 0.8] };
must(close(dist(bq.A, bq.B), 7) && close(dist(bq.B, bq.C), 24) && close(dist(bq.C, bq.D), 20) && close(dist(bq.D, bq.A), 15) && [bq.B, bq.D].every((p) => close(dist(p, O), 12.5)), 'Brahmagupta quad sides');
must(close(polyArea([bq.A, bq.B, bq.C, bq.D]), 234) && close(brahma(7, 24, 20, 15), 234) && close(0.5 * 7 * 24 + 0.5 * 15 * 20, 234) && close(angleAt(bq.B, bq.A, bq.C), 90) && close(angleAt(bq.D, bq.A, bq.C), 90), 'Brahmagupta 234');
export const fBrahma = fig({
  points: { A: P(bq.A, 'w'), B: P(bq.B, 'n'), C: P(bq.C, 'e'), D: P(bq.D, 's'), O: P(O, false, false) },
  circles: [{ center: 'O', radius: 12.5 }],
  segments: [{ from: 'A', to: 'B', label: '7 cm' }, { from: 'B', to: 'C', label: '24 cm' }, { from: 'C', to: 'D', label: '20 cm' }, { from: 'D', to: 'A', label: '15 cm' }, { from: 'A', to: 'C', label: '25 cm', dashed: true }],
  angles: [rt('B', 'A', 'C'), rt('D', 'A', 'C')],
}, 'A circle with a quadrilateral ABCD whose four corners lie on the circle. The sides AB, BC, CD and DA are 7, 24, 20 and 15 centimetres. The dashed diagonal AC is a diameter of 25 centimetres, so the angles at B and D are right angles.', 'A cyclic quadrilateral with sides $7$, $24$, $20$, $15$ cm: area $234$ cm$^2$ by Brahmagupta\'s formula.');

// ---- a rectangle 8 by 6 inside a circle of radius 5
must([[4, 3], [-4, 3], [-4, -3], [4, -3]].every((p) => close(dist(p, O), 5)) && close(brahma(8, 6, 8, 6), 48) && close(polyArea([[4, 3], [-4, 3], [-4, -3], [4, -3]]), 48), 'rectangle 8 by 6');
export const fRectCirc = fig({
  points: { O: P(O, false, false), A: P([-4, -3], 'sw'), B: P([4, -3], 'se'), C: P([4, 3], 'ne'), D: P([-4, 3], 'nw') },
  circles: [{ center: 'O', radius: 5 }],
  segments: [{ from: 'A', to: 'B', label: '8 cm' }, { from: 'B', to: 'C', label: '6 cm' }, { from: 'C', to: 'D' }, { from: 'D', to: 'A' }, { from: 'A', to: 'C', label: '10 cm', dashed: true }],
}, 'A rectangle ABCD, 8 centimetres by 6 centimetres, with all four corners on a circle. The diagonal AC is 10 centimetres and is a diameter of the circle. A rectangle is a cyclic quadrilateral.', 'A rectangle is cyclic: Brahmagupta gives $\\sqrt{(14 - 8)(14 - 6)(14 - 8)(14 - 6)} = 48$ cm$^2$.');

// ---- WE: a village plot, cyclic with sides 25, 39, 60, 52 (m)
export const plot = cyclicFromSides(25, 39, 60, 52);
const plotC = circumcentre(plot.A, plot.B, plot.C), plotR = dist(plotC, plot.A);
must(close(dist(plot.A, plot.B), 25) && close(dist(plot.B, plot.C), 39) && close(dist(plot.C, plot.D), 60) && close(dist(plot.D, plot.A), 52) && [plot.B, plot.C, plot.D].every((p) => close(dist(p, plotC), plotR)) && close(plotR, 32.5, 1e-9), 'plot on a circle of radius 32.5');
must(close(polyArea([plot.A, plot.B, plot.C, plot.D]), 1764, 1e-6) && close(brahma(25, 39, 60, 52), 1764), 'plot area 1764');
export const fPlot = fig({
  points: { A: P(plot.A, 'w'), B: P(plot.B, 'n'), C: P(plot.C, 'e'), D: P(plot.D, 's'), O: P(plotC, false, false) },
  circles: [{ center: 'O', radius: plotR }],
  segments: [{ from: 'A', to: 'B', label: '25 m' }, { from: 'B', to: 'C', label: '39 m' }, { from: 'C', to: 'D', label: '60 m' }, { from: 'D', to: 'A', label: '52 m' }],
}, 'A circle with a four-sided plot ABCD whose corners lie on the circle. The sides AB, BC, CD and DA are 25, 39, 60 and 52 metres. The circle has radius 32.5 metres.', 'A cyclic plot with sides $25$, $39$, $60$, $52$ m: area $1764$ m$^2$.');

export { O, rt, rd, triFromSides, mid, onC };
