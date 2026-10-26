// Figures for ch11 Areas Related to Circles. Shaded regions are SVG built from exact arcs (Svg in the
// shared lib computes every arc end from centre, radius and angle); figures with numeric angle and
// length labels that the pipeline can check are geometry specs.
import { Svg, polar, geom, mid, pt } from '../../cbse-10-mathematics-ch10/src/lib.mjs';

/** Circle with one shaded sector (or segment) and optional labels. */
function sectorPic({ R = 2.4, a1, a2, shade = 'sector', rLabel, angleLabel, title, alt, caption, majorShade = false, chord = false, w = 6.4, h = 6.4 }) {
  const S = new Svg(w, h);
  const c = [w / 2, h / 2];
  if (majorShade) S.sector(c, R, a2, a1 + 360, { fill: true, stroke: false });
  if (shade === 'sector') S.sector(c, R, a1, a2, { fill: majorShade ? 'none' : true, stroke: false });
  if (shade === 'segment') S.segment(c, R, a1, a2, { fill: true, stroke: false });
  S.circle(c, R, {});
  S.line(c, polar(c, R, a1), {}).line(c, polar(c, R, a2), {});
  if (chord || shade === 'segment') S.line(polar(c, R, a1), polar(c, R, a2), { dash: shade !== 'segment' });
  S.arc(c, R, a1, a2, { accent: true, sw: 3 });
  S.angleMark(c, a1, a2, 0.5);
  S.dot(c).text([c[0] - 0.25, c[1] - 0.25], 'O');
  S.text(polar(c, R + 0.3, a1), 'A').text(polar(c, R + 0.3, a2), 'B');
  if (angleLabel) S.text(polar(c, 0.85, (a1 + a2) / 2), angleLabel, { size: 12 });
  if (rLabel) S.text(polar(c, R / 2, a1 - 9), rLabel, { size: 12 });
  if (title) S.text([w / 2, h - 0.25], title, { size: 12, muted: true });
  return S.visual(alt, caption);
}

export const figs = {};

figs.title1 = sectorPic({ a1: 20, a2: 80, rLabel: 'r', angleLabel: 'θ', alt: 'A circle with centre O; the region between the radii OA and OB and the arc AB, with angle theta at O, is shaded as a sector. The arc AB is highlighted.', caption: 'A **sector** is the region between two radii and the arc they cut off.' });
figs.parts = (() => {
  const S = new Svg(7, 6.2), c = [3.5, 3.0], R = 2.4;
  S.sector(c, R, 30, 120, { fill: true, stroke: false });
  S.circle(c, R, {}).line(c, polar(c, R, 30), {}).line(c, polar(c, R, 120), {});
  S.arc(c, R, 30, 120, { accent: true, sw: 3 });
  S.dot(c).text([3.25, 2.75], 'O');
  S.text(polar(c, 1.3, 75), 'minor sector', { size: 12 });
  S.text(polar(c, 1.2, 255), 'major sector', { size: 12 });
  S.text(polar(c, R + 0.35, 75), 'minor arc', { size: 12 });
  S.text(polar(c, R + 0.35, 300), 'major arc', { size: 12, muted: true });
  return S.visual('A circle with two radii dividing it into a shaded minor sector, with the highlighted minor arc, and an unshaded major sector bounded by the major arc.', 'Minor sector (shaded) and major sector: their angles add up to $360^\\circ$.');
})();
figs.arcGeo = (() => {
  const O = [2.6, 1.0];
  const A = polar(O, 2.1, 0), B = polar(O, 2.1, 60);
  return geom({
    width: 5.2, height: 3.5,
    points: { O, A: { at: A, label_position: 'e' }, B: { at: B, label_position: 'n' } },
    segments: [{ from: 'O', to: 'A', label: '21 cm' }, { from: 'O', to: 'B' }],
    circles: [],
    angles: [{ at: 'O', from: 'A', to: 'B', label: '60°' }],
    deg: [['A', 'O', 'B', 60]], eq: [['O', 'A', 'O', 'B']],
  }, 'A sector OAB with radius 21 centimetres and an angle of 60 degrees at the centre O. Its arc AB is one sixth of the full circle.', 'Sector of radius $21$ cm and angle $60^\\circ$: one-sixth of the circle.');
})();
figs.cricket = (() => {
  const S = new Svg(6.4, 6), c = [3.2, 3], R = 2.45;
  S.circle(c, R, { fill: 'none' });
  S.sector(c, R, 60, 105, { fill: true, stroke: false });
  S.line(c, polar(c, R, 60), {}).line(c, polar(c, R, 105), {});
  S.arc(c, R, 60, 105, { accent: true, sw: 4 });
  S.angleMark(c, 60, 105, 0.5);
  S.text(polar(c, 0.85, 82.5), '45°', { size: 12 });
  S.text(polar(c, 1.3, 30), '70 m', { size: 12 });
  S.line(c, polar(c, R, 15), { dash: true, muted: true });
  S.rect(3.05, 2.6, 0.3, 0.8, { fill: 'muted', stroke: false });
  S.text(polar(c, R + 0.3, 82.5), 'boundary rope', { size: 11 });
  S.dot(c);
  return S.visual('A circular cricket ground of radius 70 metres with the pitch at the centre. A sector of 45 degrees between two fielders is shaded, and the part of the boundary rope along it is highlighted.', 'Boundary arc and sector between two fielders: $\\dfrac{45}{360} = \\dfrac18$ of the ground.');
})();
figs.pendulum = (() => {
  const S = new Svg(5, 4.6), P = [2.5, 4.2], L = 3.5;
  const a1 = 270 - 18, a2 = 270 + 18;
  S.line([1.4, 4.2], [3.6, 4.2], { sw: 3 });
  S.line(P, polar(P, L, a1), { dash: true }).line(P, polar(P, L, a2), {});
  S.line(P, polar(P, L, 270), { muted: true, dash: true });
  S.arc(P, L, a1, a2, { accent: true, sw: 3 });
  S.circle(polar(P, L, a1), 0.15, { fill: 'muted' }).circle(polar(P, L, a2), 0.15, { fill: 'accent' });
  S.angleMark(P, a1, a2, 0.6);
  S.text([2.5, 3.2], 'θ', { size: 13 });
  S.text(polar(P, L / 2, a2 + 9), '35 cm', { size: 12 });
  S.text([2.5, 0.35], 'arc 22 cm', { size: 12 });
  return S.visual('A pendulum hanging from a fixed bar. The string, 35 centimetres long, swings between two positions making an angle theta at the pivot, and the bob travels along an arc of 22 centimetres, highlighted at the bottom.', 'The bob moves along an arc of the circle whose radius is the string.');
})();
figs.major = sectorPic({ a1: 0, a2: 90, shade: 'none', majorShade: true, rLabel: '14 cm', angleLabel: '90°', alt: 'A circle of radius 14 centimetres with a quarter (the minor sector of 90 degrees) left white and the remaining major sector of 270 degrees shaded.', caption: 'Major sector $=$ circle $-$ minor sector: angle $270^\\circ$.' });
figs.seg90 = sectorPic({ a1: 45, a2: 135, shade: 'segment', rLabel: 'r', angleLabel: '90°', alt: 'A circle with centre O; the radii OA and OB make a right angle, and the region between the chord AB and the minor arc is shaded as the minor segment. The triangle OAB lies below it.', caption: 'Minor segment $=$ sector $OAB$ $-$ $\\triangle OAB$.' });
figs.seg60 = sectorPic({ a1: 60, a2: 120, shade: 'segment', rLabel: '12 cm', angleLabel: '60°', alt: 'A circle with centre O and radius 12 centimetres; the chord AB subtends 60 degrees at O, so triangle OAB is equilateral, and the thin minor segment above the chord is shaded.', caption: 'For $60^\\circ$, $\\triangle OAB$ is equilateral: area $\\dfrac{\\sqrt3}{4}r^2$.' });
figs.seg120 = (() => {
  const S = new Svg(6, 5.6), c = [3, 2.6], R = 2.3;
  S.segment(c, R, 30, 150, { fill: true, stroke: false });
  S.circle(c, R, {}).line(c, polar(c, R, 30), {}).line(c, polar(c, R, 150), {}).line(polar(c, R, 30), polar(c, R, 150), {});
  const M = [c[0], c[1] + R / 2];
  S.line(c, M, { dash: true }).rightMark(M, polar(c, R, 30), c, 0.2);
  S.angleMark(c, 30, 150, 0.45);
  S.dot(c).text([2.75, 2.35], 'O').text(polar(c, R + 0.3, 30), 'B').text(polar(c, R + 0.3, 150), 'A').text([M[0] + 0.3, M[1] + 0.25], 'M', { size: 12 });
  S.text(polar(c, 0.75, 120), '120°', { size: 11 }).text([3.35, 3.15], 'r/2', { size: 11 });
  return S.visual('A circle with centre O; the chord AB subtends 120 degrees at O and the minor segment above it is shaded. The perpendicular OM from O to the chord has length half the radius.', 'For $120^\\circ$: $OM = \\dfrac r2$, $AB = \\sqrt3\\,r$, so $\\triangle OAB = \\dfrac{\\sqrt3}{4}r^2$.');
})();
figs.tile = (() => {
  const k = 0.18, S = new Svg(6, 6), o = 0.48, s = 28 * k, rr = 7 * k;
  const [A, B, C, D] = [[o, o], [o + s, o], [o + s, o + s], [o, o + s]];
  const ctr = [o + s / 2, o + s / 2];
  const q = (P, a1, a2) => [['M', P], ['L', polar(P, rr, a1)], ['A', rr, false, true, polar(P, rr, a2)], ['Z']];
  S.path([['M', A], ['L', B], ['L', C], ['L', D], ['Z'], ...q(A, 0, 90), ...q(B, 90, 180), ...q(C, 180, 270), ...q(D, 270, 360), ['M', polar(ctr, rr, 0)], ['A', rr, false, true, polar(ctr, rr, 180)], ['A', rr, false, true, polar(ctr, rr, 360)], ['Z']], { fill: true, evenodd: true });
  S.text([o + s / 2, o - 0.25], '28 cm', { size: 12 }).text([o + 0.55, o + 0.45], '7', { size: 11 });
  return S.visual('A square tile of side 28 centimetres. A quadrant of radius 7 centimetres is cut at each corner and a circle of radius 7 centimetres at the centre; the remaining part of the tile is shaded.', 'Shaded $=$ square $-$ four quadrants $-$ central circle.');
})();
function leafPic(side, alt, caption) {
  const S = new Svg(5.4, 5.4), o = 0.7, s = 4;
  const [A, B, C, D] = [[o, o + s], [o + s, o + s], [o + s, o], [o, o]];
  S.path([['M', A], ['A', s, false, false, C], ['A', s, false, false, A], ['Z']], { fill: true });
  S.poly([A, B, C, D], {});
  S.arc(D, s, 0, 90, { dash: true }).arc(B, s, 180, 270, { dash: true });
  S.line(A, C, { dash: true, muted: true });
  S.text([A[0] - 0.25, A[1] + 0.2], 'A').text([B[0] + 0.25, B[1] + 0.2], 'B').text([C[0] + 0.25, C[1] - 0.2], 'C').text([D[0] - 0.25, D[1] - 0.2], 'D');
  S.text([o + s / 2, o - 0.3], `${side} cm`, { size: 12 });
  return S.visual(alt, caption);
}
figs.leaf = leafPic(10, 'Square ABCD of side 10 centimetres. Quadrant arcs centred at B and at D, each of radius 10 centimetres, pass through A and C and enclose a shaded leaf shape along the diagonal AC.', 'The leaf is two $90^\\circ$ segments on the diagonal $AC$.');
figs.leaf14 = leafPic(14, 'Square ABCD of side 14 centimetres with quadrant arcs centred at B and D through A and C, enclosing a shaded leaf along the diagonal AC.', 'Leaf $= 2 \\times$ (quadrant $-$ right triangle).');
figs.triSectors = (() => {
  const S = new Svg(6, 5.4), k = 0.25, a = 20 * k, rr = 10 * k;
  const A = [0.5, 0.6], B = [0.5 + a, 0.6], C = pt(0.5 + a / 2, 0.6 + (a * Math.sqrt(3)) / 2);
  const q = (P, a1, a2) => [['M', P], ['L', polar(P, rr, a1)], ['A', rr, false, true, polar(P, rr, a2)], ['Z']];
  S.path([['M', A], ['L', B], ['L', C], ['Z'], ...q(A, 0, 60), ...q(B, 120, 180), ...q(C, 240, 300)], { fill: true, evenodd: true });
  S.text([A[0] - 0.2, A[1] - 0.2], 'A').text([B[0] + 0.2, B[1] - 0.2], 'B').text([C[0], C[1] + 0.25], 'C');
  S.text([0.5 + a / 2, 0.3], '20 cm', { size: 12 });
  return S.visual('Equilateral triangle ABC of side 20 centimetres. At each vertex a sector of radius 10 centimetres is drawn inside the triangle; the three sectors meet at the midpoints of the sides, and the curved region left in the middle is shaded.', 'Shaded $=$ triangle $-$ three $60^\\circ$ sectors (together a semicircle).');
})();
figs.segPerimeter = (() => {
  const S = new Svg(6, 4.2), c = [3, 0.9], R = 2.8;
  S.segment(c, R, 45, 135, { fill: true, stroke: false });
  S.arc(c, R, 45, 135, { accent: true, sw: 3 });
  S.line(polar(c, R, 45), polar(c, R, 135), { accent: true, sw: 3 });
  S.line(c, polar(c, R, 45), { dash: true }).line(c, polar(c, R, 135), { dash: true });
  S.dot(c).text([3, 0.6], 'O');
  S.text([3, 3.95], 'arc', { size: 12 }).text([3, 2.65], 'chord', { size: 12 });
  return S.visual('A minor segment above a chord; both its boundaries are highlighted: the curved arc on top and the straight chord below. Dashed radii join the chord ends to the centre O.', 'Perimeter of a segment $=$ arc $+$ chord.');
})();
figs.tile2 = (() => {
  const S = new Svg(6, 6), o = 0.5, s = 5, R = 2.5;
  S.rect(o, o, s, s, {});
  S.segment([o, o + R], R, -90, 90, { fill: true });
  S.segment([o + s, o + R], R, 90, 270, { fill: true });
  S.text([o + s / 2, o - 0.25], '20 cm', { size: 12 });
  return S.visual('A square tile of side 20 centimetres. On the left and right sides, semicircles with those sides as diameters are drawn inwards and shaded; they touch at the centre of the tile.', 'Two painted semicircles on opposite sides of the tile.');
})();
figs.fan = (() => {
  const S = new Svg(6.4, 3.8), c = [3.2, 0.4], R = 3.15, rr = 1.05;
  S.path([['M', polar(c, R, 22.5)], ['A', R, false, true, polar(c, R, 157.5)], ['L', polar(c, rr, 157.5)], ['A', rr, false, false, polar(c, rr, 22.5)], ['Z']], { fill: true });
  for (let a = 22.5; a <= 157.5; a += 22.5) S.line(c, polar(c, R, a), { sw: 1, muted: true });
  S.arc(c, R, 22.5, 157.5, { accent: true, sw: 3 });
  S.dot(c);
  S.text(polar(c, 0.6, 90), '135°', { size: 11 }).text(polar(c, 2.1, 15), '21 cm', { size: 11 }).text(polar(c, 0.75, 10), '7 cm', { size: 11 });
  return S.visual('A folding hand fan opened to 135 degrees. The cloth is the shaded band between radii 7 and 21 centimetres from the pivot, with lace along the highlighted outer arc; the inner part shows only sticks.', 'Cloth $=$ sector of radius $21$ cm $-$ sector of radius $7$ cm.');
})();
figs.park = (() => {
  const S = new Svg(5.2, 5.2), o = 0.5, s = 4.2, rr = 1.4;
  const [A, B, C, D] = [[o, o], [o + s, o], [o + s, o + s], [o, o + s]];
  S.rect(o, o, s, s, {});
  S.sector(A, rr, 0, 90, { fill: true }).sector(B, rr, 90, 180, { fill: true }).sector(C, rr, 180, 270, { fill: true }).sector(D, rr, 270, 360, { fill: true });
  S.circle([o + s / 2, o + s / 2], 0.7, { fill: 'accent' });
  S.text([o + s / 2, o - 0.25], '42 m', { size: 12 }).text([o + 0.55, o + 0.45], '14 m', { size: 10 });
  S.text([o + s / 2, o + s / 2 + 1.0], 'lawn', { size: 12, muted: true });
  return S.visual('A square park of side 42 metres with a quadrant-shaped flower bed of radius 14 metres in each corner and a circular fountain of diameter 14 metres at the centre; the rest is lawn.', 'Flower beds (shaded quadrants), fountain (centre) and lawn.');
})();
figs.triInCircle = (() => {
  const S = new Svg(6, 6), c = [3, 3], R = 2.5;
  S.segment(c, R, 90, 210, { fill: true, stroke: false }).segment(c, R, 210, 330, { fill: true, stroke: false }).segment(c, R, 330, 450, { fill: true, stroke: false });
  S.circle(c, R, {}).poly([polar(c, R, 90), polar(c, R, 210), polar(c, R, 330)], {});
  S.line(c, polar(c, R, 90), { dash: true }).line(c, polar(c, R, 210), { dash: true });
  S.dot(c).text([3.25, 2.8], 'O').text(polar(c, R + 0.3, 90), 'A').text(polar(c, R + 0.3, 210), 'B').text(polar(c, R + 0.3, 330), 'C');
  return S.visual('An equilateral triangle ABC inscribed in a circle with centre O and radius 10 centimetres. The three segments between the sides of the triangle and the circle are shaded.', 'Three equal $120^\\circ$ segments.');
})();
figs.lune = (() => {
  const S = new Svg(5.4, 5.4), O = [0.8, 0.8], r = 3;
  const A = [O[0] + r, O[1]], B = [O[0], O[1] + r], M = mid(A, B), rr = r / Math.SQRT2;
  S.path([['M', A], ['A', rr, false, true, B], ['A', r, false, false, A], ['Z']], { fill: true });
  S.line(O, A, {}).line(O, B, {}).arc(O, r, 0, 90, {}).line(A, B, { dash: true });
  S.arc(M, rr, -45, 135, { accent: true, sw: 2.5 });
  S.dot(O).text([O[0] - 0.25, O[1] - 0.2], 'O').text([A[0] + 0.15, A[1] - 0.25], 'A').text([B[0] - 0.25, B[1] + 0.15], 'B');
  S.text([O[0] + r / 2, O[1] - 0.3], '14 cm', { size: 12 });
  return S.visual('A quadrant OAB of radius 14 centimetres with a semicircle drawn outward on the chord AB. The crescent between the semicircle and the quadrant arc is shaded.', 'The crescent lies inside the semicircle on $AB$ and outside the quadrant.');
})();
figs.pizza = (() => {
  const S = new Svg(5.6, 5.6), c = [2.8, 2.8], R = 2.4;
  S.sector(c, R, 0, 45, { fill: 'accent', stroke: false }).circle(c, R, { fill: true });
  S.sector(c, R, 0, 45, { fill: 'accent' });
  for (let a = 0; a < 360; a += 45) S.line(c, polar(c, R, a), { sw: 1.2 });
  S.text(polar(c, 0.75, 22.5), '45°', { size: 11 }).text(polar(c, 1.3, 200), '14 cm', { size: 12 });
  return S.visual('A round pizza of radius 14 centimetres cut by four straight lines through the centre into 8 equal slices; one slice of 45 degrees is highlighted.', 'Each slice is a sector of $45^\\circ$.');
})();
figs.chakra = (() => {
  const S = new Svg(5.6, 5.6), c = [2.8, 2.8], R = 2.4;
  S.sector(c, R, 0, 15, { fill: true, stroke: false });
  S.circle(c, R, { sw: 2.5 }).circle(c, 0.25, { fill: 'muted' });
  for (let a = 0; a < 360; a += 15) S.line(polar(c, 0.25, a), polar(c, R, a), { sw: 1 });
  S.text(polar(c, R + 0.3, 7.5), '15°', { size: 11 }).text(polar(c, 1.2, 190), '7 cm', { size: 12 });
  return S.visual('A wheel with 24 equally spaced spokes and an outer rim of radius 7 centimetres; the narrow sector between two adjacent spokes is shaded and marked 15 degrees.', '$24$ spokes divide the wheel into sectors of $15^\\circ$.');
})();
figs.door = (() => {
  const S = new Svg(5.6, 5.6), c = [2.8, 1.6], R = 2.1;
  const A = polar(c, R, 135), B = polar(c, R, 45);
  S.segment(c, R, 45, 135, { fill: true });
  S.circle(c, R, { dash: true, muted: true, sw: 1 });
  S.line(c, A, { dash: true }).line(c, B, { dash: true }).rightMark(c, A, B, 0.25);
  S.rect(A[0], 0.2, B[0] - A[0], A[1] - 0.2, { sw: 2 });
  S.dot(c).text([2.8, 1.35], 'O').text([A[0] - 0.25, A[1]], 'A').text([B[0] + 0.25, B[1]], 'B');
  S.text(polar(c, R / 2, 125), '70 cm', { size: 11 });
  return S.visual('A doorway with a glass panel on top. The panel is the shaded minor segment above the chord AB of a circle with centre O and radius 70 centimetres; OA and OB are perpendicular.', 'Glass panel $=$ minor segment for a $90^\\circ$ angle at $O$.');
})();
