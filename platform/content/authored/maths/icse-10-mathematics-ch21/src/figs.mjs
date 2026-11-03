// Figures for ICSE 10 Mathematics ch21 questions, drawn from real coordinates by scene() (ht.mjs). Every numeric length label
// and every degree label is asserted against the coordinates, and each figure's data is the data of the question it illustrates.
import { ct, tn, near, dist, scene, must } from './ht.mjs';

const S3 = Math.sqrt(3);
const opp = (h, a, b) => ({ F: [0, 0], D: [0, h], A: [-h * ct(a), 0], B: [h * ct(b), 0], L: [-h * ct(a), h], R: [h * ct(b), h] });

export const figS302 = (() => {
  const o = opp(36, 60, 30);
  return scene({ pts: { ...o }, k: 0.05, names: { L: false, R: false }, pos: { D: 'n', F: 's', A: 's', B: 's' }, segs: [['D', 'F', 36], ['D', 'A'], ['D', 'B'], ['L', 'D', undefined, { dashed: true }], ['D', 'R', undefined, { dashed: true }]], angs: [['D', 'A', 'L', 60], ['D', 'B', 'R', 30], ['F', 'D', 'A', undefined, { right: true }]] },
    'A viewing tower DF 36 metres tall with two kiosks, A on the left at an angle of depression of 60 degrees and B on the right at 30 degrees, both on the level ground through the foot F of the tower. Dashed horizontal lines through D show where the angles of depression are measured from.', 'Kiosks on opposite sides of the tower: $FA = 36\\cot 60^\\circ$ and $FB = 36\\cot 30^\\circ$.');
})();

export const figS402 = (() => {
  const d = 15 * ct(30), H = 15 + d * tn(60);
  must(near(H, 60, 1e-9), 's402 tower is 60 m');
  return scene({ pts: { G: [0, 0], A: [0, 15], F: [d, 0], T: [d, H], X: [d, 15] }, k: 0.045, names: { X: false }, pos: { G: 'sw', A: 'w', F: 'se', T: 'n' }, segs: [['G', 'A', 15], ['G', 'F'], ['F', 'T', '$h$'], ['A', 'T'], ['A', 'F'], ['A', 'X', undefined, { dashed: true }]], angs: [['A', 'F', 'X', 30], ['A', 'T', 'X', 60], ['G', 'A', 'F', undefined, { right: true }], ['F', 'T', 'G', undefined, { right: true }]] },
    'A 15 metre building AG and a taller tower FT on the same level ground. From the top A of the building, the foot F of the tower is seen at an angle of depression of 30 degrees and the top T at an angle of elevation of 60 degrees. The dashed line AX is horizontal.', 'Find $GF$ from the $30^\\circ$ triangle, then the part of the tower above $A$ from the $60^\\circ$ triangle.');
})();

export const figL01 = (() => {
  const h = 24, A = h * ct(30), B = h * ct(60);
  return scene({ pts: { F: [0, 0], D: [0, h], A: [A, 0], B: [B, 0], C: [-h * ct(45), 0], HA: [A, h], HC: [-h * ct(45), h] }, k: 0.085, names: { HA: false, HC: false }, pos: { D: 'n', F: 's', A: 's', B: 's', C: 's' }, segs: [['D', 'F', 24], ['D', 'A'], ['D', 'B'], ['D', 'C'], ['D', 'HA', undefined, { dashed: true }], ['D', 'HC', undefined, { dashed: true }]], angs: [['D', 'A', 'HA', 30], ['D', 'B', 'HA', 60], ['D', 'C', 'HC', 45], ['F', 'D', 'A', undefined, { right: true }]] },
    'An observation platform D, 24 metres above the foot F, and three scooters on the ground: A at an angle of depression of 30 degrees and B at 60 degrees on the right, and C at 45 degrees on the left. Dashed horizontal lines through D show where the angles of depression are measured from.', 'Depressions from $D$: $30^\\circ$ to $A$, $60^\\circ$ to $B$ and $45^\\circ$ to $C$.');
})();

export const figL04 = (() => {
  const h = 20 * (S3 + 1), A = [-h * S3, 0], Bp = [-h, 0], Cp = [-h / S3, 0];
  must(near(dist(A, Bp), 40, 1e-9), 'AB = 40 m');
  return scene({ pts: { F: [0, 0], T: [0, h], A, B: Bp, C: Cp }, k: 0.045, pos: { T: 'n', F: 'se', A: 'sw', B: 's', C: 's' }, segs: [['A', 'B', 40], ['A', 'T'], ['B', 'T'], ['C', 'T'], ['F', 'T', '$h$'], ['B', 'C'], ['C', 'F']], angs: [['A', 'T', 'F', 30], ['B', 'T', 'F', 45], ['C', 'T', 'F', 60], ['F', 'T', 'A', undefined, { right: true }]] },
    'A tower FT with three points A, B and C on level ground in line with its foot F, all on the same side. From A the top T is seen at an angle of elevation of 30 degrees, from B at 45 degrees and from C at 60 degrees. A and B are 40 metres apart.', 'Three sightings of the same top $T$: elevations $30^\\circ$, $45^\\circ$ and $60^\\circ$.');
})();

export const figL07 = (() => {
  const pB = 24 * ct(60);
  return scene({ pts: { A: [-30, 0], C: [-30, 30], P: [0, 0], B: [pB, 0], D: [pB, 24] }, k: 0.1, pos: { A: 'sw', C: 'n', P: 's', B: 'se', D: 'n' }, segs: [['A', 'C', 30], ['B', 'D', 24], ['A', 'B'], ['P', 'C'], ['P', 'D']], angs: [['P', 'C', 'A', 45], ['P', 'D', 'B', 60], ['A', 'C', 'P', undefined, { right: true }], ['B', 'D', 'P', undefined, { right: true }]] },
    'Two vertical poles AC, 30 metres tall, and BD, 24 metres tall, stand on opposite sides of a straight level road. From a point P on the road between them, the top C is seen at an angle of elevation of 45 degrees and the top D at 60 degrees.', 'From $P$: $\\angle CPA = 45^\\circ$ and $\\angle DPB = 60^\\circ$.');
})();
