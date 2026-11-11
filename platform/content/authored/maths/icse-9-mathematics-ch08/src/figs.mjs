// Deck and notes figures for ICSE 9 Mathematics ch08, all built from coordinates by tri.mjs (every label is asserted against the
// coordinates). Worked values are returned beside the figures so that the slides quote computed numbers.
import { table, flow, r } from './lib.mjs';
import { fig, sss, sas, asa, iso, copy, polar, add, mid, inter, foot, circInter, lerp, dist, ang, len, near, must, congruent, notCongruent, canForm, sideOrder, angleOrder, r2, deg, RT, ARC, TK, A, W, eqctx } from './qh.mjs';

const mirror = (T, from, to, dx, rot = 0) => copy(T, from, to, { flip: true, dx, rot });
const merge = (...o) => Object.assign({}, ...o);

// ================================================================ deck 1
// title: a kite split by its long diagonal
const kite1 = { A: [0, 4], B: [-3, 0], C: [0, -2], D: [3, 0] };
export const fKite1 = fig({ pts: kite1, segs: [['A', 'B', '5 cm', TK(1)], ['A', 'D', '5 cm', TK(1)], ['C', 'B', undefined, TK(2)], ['C', 'D', undefined, TK(2)], ['A', 'C', undefined, { dashed: true }]], polys: [[['A', 'B', 'C', 'D']]] },
  'A kite-shaped frame ABCD. The two upper sides AB and AD are both 5 centimetres and carry one tick; the two lower sides CB and CD carry two ticks and are equal. A dashed bar AC joins the top corner to the bottom corner and splits the kite into two triangles that are mirror images of each other.',
  'The bar $AC$ splits the kite into $\\triangle ABC$ and $\\triangle ADC$.');
must(near(dist(kite1.A, kite1.B), 5) && near(dist(kite1.A, kite1.D), 5), 'kite: AB = AD = 5');

// two congruent triangles with corresponding parts marked (sides 4, 6, 5; angles marked with arcs)
const t0 = sss(6, 5, 4); // A above BC; BC = 6, CA = 5, AB = 4
const tP = mirror(t0, ['A', 'B', 'C'], ['P', 'Q', 'R'], 9, 0);
const WP = merge(t0, tP);
congruent(WP, ['A', 'B', 'C'], ['P', 'Q', 'R'], 'pair');
export const fPair = fig({ pts: WP, segs: [['A', 'B', '4 cm', TK(1)], ['B', 'C', '6 cm', TK(3)], ['C', 'A', '5 cm', TK(2)], ['P', 'Q', '4 cm', TK(1)], ['Q', 'R', '6 cm', TK(3)], ['R', 'P', '5 cm', TK(2)]], angles: [['A', 'B', 'C', undefined, ARC(1)], ['P', 'Q', 'R', undefined, ARC(1)], ['B', 'C', 'A', undefined, ARC(2)], ['Q', 'R', 'P', undefined, ARC(2)], ['C', 'A', 'B', undefined, ARC(3)], ['R', 'P', 'Q', undefined, ARC(3)]] },
  'Two triangles side by side, ABC on the left and PQR on the right, which is its mirror image. Matching sides carry matching tick marks and are 4, 6 and 5 centimetres; matching angles carry matching arcs: A with P, B with Q, C with R.',
  '$\\triangle ABC \\cong \\triangle PQR$: $A \\leftrightarrow P$, $B \\leftrightarrow Q$, $C \\leftrightarrow R$.');
const sidesAll = ['A', 'B', 'C'];
export const pairInfo = { angA: ang(WP, 'A', 'B', 'C') };

// SSS
export const fSSS = fig({ pts: WP, segs: [['A', 'B', '4 cm', TK(1)], ['B', 'C', '6 cm', TK(3)], ['C', 'A', '5 cm', TK(2)], ['P', 'Q', '4 cm', TK(1)], ['Q', 'R', '6 cm', TK(3)], ['R', 'P', '5 cm', TK(2)]] },
  'Two triangles ABC and PQR. Only the sides are marked: 4, 6 and 5 centimetres in each triangle, with matching ticks. No angles are given.',
  'Three sides equal to three sides: SSS.');

// SAS: two sides 5 and 6 with the included angle 62
const tS = sas(5, 6, 62); // A origin, B (5, 0), C at 6 cm, angle A = 62
const tS2 = mirror(tS, ['A', 'B', 'C'], ['P', 'Q', 'R'], 10, 0);
const WS = merge(tS, tS2);
congruent(WS, ['A', 'B', 'C'], ['P', 'Q', 'R'], 'SAS pair');
export const fSAS = fig({ pts: WS, segs: [['A', 'B', '5 cm', TK(1)], ['A', 'C', '6 cm', TK(2)], ['B', 'C'], ['P', 'Q', '5 cm', TK(1)], ['P', 'R', '6 cm', TK(2)], ['Q', 'R']], angles: [['A', 'B', 'C', deg(62), ARC(1)], ['P', 'Q', 'R', deg(62), ARC(1)]] },
  'Two triangles ABC and PQR, the second the mirror image of the first. In each, the sides from the first vertex are 5 and 6 centimetres, and the angle between them is 62 degrees. The third side is not marked.',
  'Two sides and the angle between them: SAS. The $62^\\circ$ angle lies between the $5$ cm and $6$ cm sides.');

// ASA: BC = 6 between angles 55 and 65
const tA = asa(6, 55, 65);
const tA2 = mirror(tA, ['A', 'B', 'C'], ['P', 'Q', 'R'], 9, 0);
const WA = merge(tA, tA2);
congruent(WA, ['A', 'B', 'C'], ['P', 'Q', 'R'], 'ASA pair');
export const fASA = fig({ pts: WA, segs: [['A', 'B'], ['B', 'C', '6 cm', TK(1)], ['C', 'A'], ['P', 'Q'], ['Q', 'R', '6 cm', TK(1)], ['R', 'P']], angles: [['B', 'C', 'A', deg(55), ARC(1)], ['C', 'B', 'A', deg(65), ARC(2)], ['Q', 'R', 'P', deg(55), ARC(1)], ['R', 'Q', 'P', deg(65), ARC(2)]] },
  'Two triangles ABC and PQR, mirror images. In each the side BC or QR is 6 centimetres, with angles of 55 and 65 degrees at its two ends. The side lies between the two marked angles.',
  'Two angles and the side between them: ASA.');
// AAS: angles at B (50) and at A (60); BC = 7 is not between them
const tG = asa(7, 50, 70);
const aA = ang(tG, 'A', 'B', 'C');
must(near(aA, 60), 'AAS: third angle 60');
const tG2 = mirror(tG, ['A', 'B', 'C'], ['P', 'Q', 'R'], 9, 0);
const WG = merge(tG, tG2);
congruent(WG, ['A', 'B', 'C'], ['P', 'Q', 'R'], 'AAS pair');
export const fAAS = fig({ pts: WG, segs: [['A', 'B'], ['B', 'C', '7 cm', TK(1)], ['C', 'A'], ['P', 'Q'], ['Q', 'R', '7 cm', TK(1)], ['R', 'P']], angles: [['B', 'A', 'C', deg(50), ARC(1)], ['A', 'B', 'C', deg(60), ARC(2)], ['Q', 'P', 'R', deg(50), ARC(1)], ['P', 'Q', 'R', deg(60), ARC(2)]] },
  'Two triangles ABC and PQR, mirror images. In each, the angles at B and A, or Q and P, are 50 and 60 degrees and the 7 centimetre side BC or QR is opposite the 60 degree angle, so it does not lie between the two marked angles.',
  'Two angles and a side that is not between them: AAS. The third angle ($70^\\circ$) is then equal too.');

// RHS: right angle at B, hypotenuse 25, side 7 (other side 24)
const tR = { A: [0, 7], B: [0, 0], C: [24, 0] };
const tR2 = copy(tR, ['A', 'B', 'C'], ['P', 'Q', 'R'], { flip: true, dx: 31 });
// after flipping, Q = (31, 0), R = (7, 0), P = (31, 7): a mirror image
const WR = merge(tR, tR2);
congruent(WR, ['A', 'B', 'C'], ['P', 'Q', 'R'], 'RHS pair');
must(near(dist(tR.A, tR.C), 25) && near(dist(tR.A, tR.B), 7), 'RHS 25 and 7');
export const fRHS = fig({ pts: WR, segs: [['A', 'B', '7 cm', TK(1)], ['B', 'C'], ['C', 'A', '25 cm', TK(2)], ['P', 'Q', '7 cm', TK(1)], ['Q', 'R'], ['R', 'P', '25 cm', TK(2)]], angles: [['B', 'A', 'C', undefined, RT], ['Q', 'P', 'R', undefined, RT]] },
  'Two right-angled triangles ABC and PQR, mirror images, with the right angle at B and at Q. The hypotenuse AC or PR is 25 centimetres and one other side, AB or PQ, is 7 centimetres in each. The third side is not marked.',
  'Right angle, hypotenuse and one side: RHS. The hypotenuse is the side opposite the right angle.');

// AAA and SSA: not enough
const s1 = { A: [0, 3], B: [0, 0], C: [4, 0] };
const s2 = { P: [8, 6], Q: [8, 0], R: [16, 0] };
const WN = merge(s1, s2);
must(notCongruent(WN, ['A', 'B', 'C'], ['P', 'Q', 'R']), 'AAA pair is not congruent');
must(near(ang(WN, 'A', 'B', 'C'), ang(WN, 'P', 'Q', 'R')) && near(ang(WN, 'C', 'A', 'B'), ang(WN, 'R', 'P', 'Q')), 'AAA: equal angles');
export const fAAA = fig({ pts: WN, segs: [['A', 'B', '3 cm'], ['B', 'C', '4 cm'], ['C', 'A', '5 cm'], ['P', 'Q', '6 cm'], ['Q', 'R', '8 cm'], ['R', 'P', '10 cm']], angles: [['B', 'A', 'C', undefined, RT], ['Q', 'P', 'R', undefined, RT], ['A', 'B', 'C', undefined, ARC(1)], ['P', 'Q', 'R', undefined, ARC(1)], ['C', 'A', 'B', undefined, ARC(2)], ['R', 'P', 'Q', undefined, ARC(2)]] },
  'Two right-angled triangles with the same three angles. The small one has sides 3, 4 and 5 centimetres; the large one has sides 6, 8 and 10 centimetres. The angles match with equal arcs, but the triangles are clearly not the same size.',
  'All three angles equal is not enough: this small and large triangle have equal angles but are not congruent.');
// SSA: two triangles with AB = 7, AC = 5 and angle B = 40, but different third sides
const Bd = 40, ABl = 7, ACl = 5;
const sinC = (ABl * Math.sin((Bd * Math.PI) / 180)) / ACl;
const C1 = (Math.asin(sinC) * 180) / Math.PI, C2 = 180 - C1;
must(Bd + C1 < 180 && Bd + C2 < 180, 'SSA: both triangles exist');
export const ssaCheck = { C1: r2(C1), C2: r2(C2) };

// Example 1: parallelogram frame, SSS
const pD = polar(7, 70);
const pgm = { A: [0, 0], B: [9, 0], D: pD, C: add([9, 0], pD) };
export const fPgm = fig({ pts: pgm, segs: [['A', 'B', '9 cm', TK(1)], ['D', 'C', '9 cm', TK(1)], ['A', 'D', '7 cm', TK(2)], ['B', 'C', '7 cm', TK(2)], ['A', 'C', undefined, { dashed: true }]], polys: [[['A', 'B', 'C', 'D']]] },
  'A parallelogram-shaped frame ABCD with a dashed diagonal AC. The sides AB and DC are 9 centimetres and carry one tick; the sides AD and BC are 7 centimetres and carry two ticks.',
  'Frame $ABCD$: $AB = DC = 9$ cm, $AD = BC = 7$ cm, diagonal $AC$.');
congruent(merge(pgm), ['A', 'B', 'C'], ['C', 'D', 'A'], 'parallelogram halves');

// CPCT flow chart
export const fFlow = flow('TB', [['s', 'To prove two sides or angles equal'], ['a', 'Find two triangles that contain them'], ['b', 'List three equal parts, taking one from each triangle in the same order'], ['c', 'Name the test: SSS, SAS, ASA, AAS or RHS'], ['d', 'Write the triangles with matching vertices and conclude: corresponding parts are equal']], [['s', 'a'], ['a', 'b'], ['b', 'c'], ['c', 'd']],
  'Flow chart for a congruence proof: to prove that two sides or angles are equal, find two triangles that contain them, list three pairs of equal parts, name the test that applies, then write the triangles with matching vertices and conclude that the corresponding parts are equal.', 'The steps of a congruence proof.');

// Example 2: kite frame, sides 13 and 15, diagonal AC = 14, BD = 24
const kite2 = { A: [0, 5], B: [-12, 0], C: [0, -9], D: [12, 0] };
must(near(dist(kite2.A, kite2.B), 13) && near(dist(kite2.C, kite2.B), 15) && near(dist(kite2.A, kite2.C), 14), 'kite 13, 15, 14');
export const kite2Angles = { B: ang(kite2, 'B', 'A', 'C'), D: ang(kite2, 'D', 'A', 'C') };
must(near(kite2Angles.B, kite2Angles.D), 'kite: angle B = angle D');
export const fKite2 = fig({ pts: kite2, segs: [['A', 'B', '13 cm', TK(1)], ['A', 'D', '13 cm', TK(1)], ['C', 'B', '15 cm', TK(2)], ['C', 'D', '15 cm', TK(2)], ['A', 'C', undefined, { dashed: true }]], polys: [[['A', 'B', 'C', 'D']]] },
  'A kite ABCD with the upper sides AB and AD both 13 centimetres (one tick) and the lower sides CB and CD both 15 centimetres (two ticks). The dashed bar AC joins the top and bottom corners.',
  'Kite $ABCD$: $AB = AD$, $CB = CD$; to prove $\\angle ABC = \\angle ADC$.');
congruent(kite2, ['A', 'B', 'C'], ['A', 'D', 'C'], 'kite halves');

// Example 3: two poles cross at their midpoints, SAS
const sc = { O: [0, 0], A: polar(5, 150), B: polar(5, 330), C: polar(4, 35), D: polar(4, 215) };
export const fScissor = fig({ pts: sc, segs: [['O', 'A', '5 cm', TK(1)], ['O', 'B', '5 cm', TK(1)], ['O', 'C', '4 cm', TK(2)], ['O', 'D', '4 cm', TK(2)], ['A', 'C'], ['B', 'D']], angles: [['O', 'A', 'C', deg(115), ARC(1)], ['O', 'B', 'D', deg(115), ARC(1)]], pos: { O: 's' } },
  'Two straight poles AB and CD cross at O, which is the middle of both. OA and OB are 5 centimetres with one tick; OC and OD are 4 centimetres with two ticks. The angles AOC and BOD, which are opposite each other, both measure 115 degrees. The ends are joined by AC and BD.',
  'Poles $AB$ and $CD$ bisect each other at $O$; $\\angle AOC = \\angle BOD = 115^\\circ$.');
export const scLen = { ac: r2(dist(sc.A, sc.C)), bd: r2(dist(sc.B, sc.D)) };
must(near(dist(sc.A, sc.C), dist(sc.B, sc.D)) && scLen.ac === scLen.bd, 'scissors: AC = BD');
must(near(Math.sqrt(25 + 16 - 40 * Math.cos((115 * Math.PI) / 180)), dist(sc.A, sc.C)), 'scissors: cosine rule');
congruent(sc, ['O', 'A', 'C'], ['O', 'B', 'D'], 'scissor triangles');

// Example 4: P on the bisector of an angle of 70 degrees; PM and PN perpendicular to the arms
const bis = { O: [0, 0], X: polar(8, 0), Y: polar(8, 70), P: polar(7, 35) };
bis.M = foot(bis.P, bis.O, bis.X);
bis.N = foot(bis.P, bis.O, bis.Y);
export const bisLen = r2(dist(bis.P, bis.M));
must(near(dist(bis.P, bis.M), dist(bis.P, bis.N)) && bisLen === 4.02, 'bisector: PM = PN = 4.02');
export const fBis = fig({ pts: bis, segs: [['O', 'X'], ['O', 'Y'], ['O', 'P', undefined, { dashed: true }], ['P', 'M'], ['P', 'N']], angles: [['O', 'M', 'P', deg(35), ARC(1)], ['O', 'N', 'P', deg(35), ARC(1)], ['M', 'O', 'P', undefined, RT], ['N', 'O', 'P', undefined, RT]] },
  'The angle XOY of 70 degrees with its bisector OP drawn as a dashed line, so the angles XOP and YOP are each 35 degrees. From P the perpendiculars PM to OX and PN to OY are drawn, with right-angle marks at M and N.',
  '$OP$ bisects $\\angle XOY$; $PM \\perp OX$ and $PN \\perp OY$.');
congruent(bis, ['O', 'M', 'P'], ['O', 'N', 'P'], 'bisector triangles');

// Example 5: isosceles with the perpendicular AD, RHS
const isoR = { A: [0, 15], B: [-8, 0], C: [8, 0], D: [0, 0] };
must(near(dist(isoR.A, isoR.B), 17) && near(dist(isoR.A, isoR.C), 17) && near(dist(isoR.A, isoR.D), 15), 'RHS iso 17, 15');
export const fIsoR = fig({ pts: isoR, segs: [['A', 'B', '17 cm', TK(1)], ['A', 'C', '17 cm', TK(1)], ['B', 'C'], ['A', 'D', '15 cm', { dashed: true }]], angles: [['D', 'A', 'B', undefined, RT], ['D', 'A', 'C', undefined, RT]] },
  'An isosceles triangle ABC with AB and AC both 17 centimetres. The dashed line AD of 15 centimetres is drawn from A perpendicular to BC, with right-angle marks at D.',
  'Triangle $ABC$ with $AB = AC = 17$ cm and $AD \\perp BC$, $AD = 15$ cm.');
congruent(isoR, ['A', 'D', 'B'], ['A', 'D', 'C'], 'RHS iso halves');

export const tTests = table(['Test', 'Equal parts', 'Remember'], [['SSS', 'three sides', 'no angles needed'], ['SAS', 'two sides and the angle between them', 'the angle must be between the sides'], ['ASA', 'two angles and the side between them', 'the side joins the two angle vertices'], ['AAS', 'two angles and a side not between them', 'the third angle is then equal as well'], ['RHS', 'right angle, hypotenuse and one side', 'only for right-angled triangles']], 'Table of the four congruence tests: SSS needs three equal sides; SAS needs two sides and the angle between them; ASA needs two angles and the side between them; AAS needs two angles and a side not between them; RHS needs a right angle, the hypotenuse and one side.', 'Congruence tests at a glance.');
export const tNot = table(['Equal parts', 'Test?', 'Why'], [['three angles (AAA)', 'No', 'same shape, but the size can differ'], ['two sides and an angle not between them (SSA)', 'No', 'two different triangles can fit'], ['two sides and the angle between them', 'Yes: SAS', 'fixes the third side'], ['two angles and any side', 'Yes: ASA or AAS', 'the third angle is fixed']], 'Table of equal parts that do and do not prove congruence: three angles do not, two sides and a non-included angle do not, two sides and the included angle do (SAS), two angles and any side do (ASA or AAS).', 'What is and is not a test.');

// ================================================================ deck 2
// title: apex 40, base angles 70
const iT = iso(40, 6);
must(near(ang(iT, 'B', 'A', 'C'), 70) && near(ang(iT, 'C', 'A', 'B'), 70), 'iso 40: base angles 70');
export const fIsoTitle = fig({ pts: iT, segs: [['A', 'B', '6 cm', TK(1)], ['A', 'C', '6 cm', TK(1)], ['B', 'C']], angles: [['A', 'B', 'C', deg(40)], ['B', 'A', 'C', deg(70), ARC(1)], ['C', 'A', 'B', deg(70), ARC(1)]] },
  'An isosceles triangle ABC with equal sides AB and AC of 6 centimetres marked with ticks. The angle at the top vertex A is 40 degrees and the two base angles at B and C are each 70 degrees, marked with equal arcs.',
  'Equal sides $AB = AC$ face equal angles: $\\angle B = \\angle C = 70^\\circ$.');
const iW = iso(64, 5);
must(near(ang(iW, 'B', 'A', 'C'), 58), 'iso 64: 58');
export const fIsoWords = fig({ pts: iW, segs: [['A', 'B', undefined, TK(1)], ['A', 'C', undefined, TK(1)], ['B', 'C']], angles: [['B', 'A', 'C', undefined, ARC(1)], ['C', 'A', 'B', undefined, ARC(1)]], names: { A: 'A (apex)' } },
  'An isosceles triangle ABC with the equal sides AB and AC, called the legs, marked with ticks. A is the apex at the top, BC is the base along the bottom, and the angles at B and C are the base angles, marked with equal arcs.',
  'Legs $AB = AC$, base $BC$, apex $A$, base angles $B$ and $C$.');
// theorem: bisector of angle A meets BC at D
const iP = iso(56, 6);
iP.D = [0, 0];
must(near(ang(iP, 'A', 'B', 'D'), 28) && near(ang(iP, 'A', 'C', 'D'), 28), 'iso 56: halves 28');
export const fIsoProof = fig({ pts: iP, segs: [['A', 'B', undefined, TK(1)], ['A', 'C', undefined, TK(1)], ['B', 'C'], ['A', 'D', undefined, { dashed: true }]], angles: [['A', 'B', 'D', undefined, ARC(1)], ['A', 'C', 'D', undefined, ARC(1)], ['B', 'A', 'D', undefined, ARC(2)], ['C', 'A', 'D', undefined, ARC(2)]], pos: { D: 's' } },
  'An isosceles triangle ABC with AB equal to AC. The dashed line AD is the bisector of the angle at A and meets the base BC at D. The two halves of the angle at A carry one arc each, and the base angles at B and C carry two arcs each.',
  'Proof: the bisector $AD$ makes $\\triangle ABD \\cong \\triangle ACD$ (SAS).');
congruent(iP, ['A', 'B', 'D'], ['A', 'C', 'D'], 'iso proof halves');
// Example 1: apex 50
const e1 = iso(50, 6);
must(near(ang(e1, 'B', 'A', 'C'), 65), 'ex1: 65');
export const fIsoE1 = fig({ pts: e1, segs: [['A', 'B', undefined, TK(1)], ['A', 'C', undefined, TK(1)], ['B', 'C']], angles: [['A', 'B', 'C', deg(50)], ['B', 'A', 'C', '$?$', ARC(1)], ['C', 'A', 'B', '$?$', ARC(1)]] },
  'Worked example 1: an isosceles triangle ABC with equal sides AB and AC. The angle at A is 50 degrees; the two equal base angles at B and C are marked with question marks.',
  '$AB = AC$ and $\\angle A = 50^\\circ$; find $\\angle B$ and $\\angle C$.');
// converse: base angles 50, altitude AD
const cv = asa(8, 50, 50);
cv.D = foot(cv.A, cv.B, cv.C);
must(near(dist(cv.B, cv.D), 4) && near(ang(cv, 'B', 'A', 'C'), 50), 'converse: D is the midpoint');
export const fConv = fig({ pts: cv, segs: [['A', 'B'], ['A', 'C'], ['B', 'C'], ['A', 'D', undefined, { dashed: true }]], angles: [['B', 'A', 'C', deg(50), ARC(1)], ['C', 'A', 'B', deg(50), ARC(1)], ['D', 'A', 'B', undefined, RT], ['D', 'A', 'C', undefined, RT]], pos: { D: 's' } },
  'A triangle ABC whose base angles at B and C are both 50 degrees, marked with equal arcs. The dashed line AD is drawn from A perpendicular to the base BC, with right-angle marks at D. The sides AB and AC carry no marks because they are to be proved equal.',
  'Given $\\angle B = \\angle C$, draw $AD \\perp BC$; to prove $AB = AC$.');
congruent(cv, ['A', 'D', 'B'], ['A', 'D', 'C'], 'converse halves');
// Example 2: gable with base angle 28
const e2 = iso(124, 5);
must(near(ang(e2, 'B', 'A', 'C'), 28), 'ex2: base angle 28');
export const fIsoE2 = fig({ pts: e2, segs: [['A', 'B', undefined, TK(1)], ['A', 'C', undefined, TK(1)], ['B', 'C']], angles: [['B', 'A', 'C', deg(28), ARC(1)], ['C', 'A', 'B', deg(28), ARC(1)], ['A', 'B', 'C', '$?$']] },
  'Worked example 2: an isosceles triangle shaped like a flat roof gable, with equal sides AB and AC and both base angles 28 degrees. The wide angle at the apex A is marked with a question mark.',
  'Base angles $\\angle B = \\angle C = 28^\\circ$; find $\\angle A$.');
// Example 3: algebra, (4x - 10) and (2x + 20) with x = 15
const e3 = iso(80, 6);
must(near(ang(e3, 'B', 'A', 'C'), 4 * 15 - 10) && near(ang(e3, 'C', 'A', 'B'), 2 * 15 + 20), 'ex3: 50 and 50');
export const fIsoE3 = fig({ pts: e3, segs: [['A', 'B', undefined, TK(1)], ['A', 'C', undefined, TK(1)], ['B', 'C']], angles: [['B', 'A', 'C', '$(4x - 10)^\\circ$', ARC(1)], ['C', 'A', 'B', '$(2x + 20)^\\circ$', ARC(1)], ['A', 'B', 'C', '$?$']] },
  'Worked example 3: an isosceles triangle ABC with equal sides AB and AC. The base angle at B is marked 4x minus 10 degrees and the base angle at C is marked 2x plus 20 degrees. The apex angle at A is marked with a question mark.',
  '$AB = AC$, $\\angle B = (4x - 10)^\\circ$, $\\angle C = (2x + 20)^\\circ$.');
// Example 4: AB = AC, angle C = 40, D on BC with DA = DC
const ch = asa(10, 40, 40);
{
  const m = mid(ch.A, ch.C), d = [ch.C[0] - ch.A[0], ch.C[1] - ch.A[1]];
  ch.D = inter(ch.B, ch.C, m, add(m, [-d[1], d[0]]));
}
must(near(dist(ch.D, ch.A), dist(ch.D, ch.C)) && near(ang(ch, 'A', 'B', 'D'), 60) && near(ang(ch, 'D', 'A', 'B'), 80) && near(ang(ch, 'C', 'A', 'D'), 40), 'chain: 60, 80, 40');
export const fChain = fig({ pts: ch, segs: [['A', 'B', undefined, TK(1)], ['A', 'C', undefined, TK(1)], ['B', 'C'], ['A', 'D', undefined, TK(2)], ['D', 'C', undefined, TK(2)]], angles: [['C', 'A', 'B', deg(40)], ['B', 'A', 'D', '$?$'], ['D', 'A', 'B', '$?$']], pos: { D: 's' } },
  'Worked example 4: a triangle ABC with AB equal to AC. A point D on the base BC is chosen so that DA equals DC. The angle at C is 40 degrees. The angle BAD and the angle ADB are marked with question marks.',
  '$AB = AC$, $DA = DC$, $\\angle C = 40^\\circ$; find $\\angle BAD$ and $\\angle ADB$.');
// side and angle order: angles 40, 65 and 75
const od = asa(9, 40, 75);
must(near(ang(od, 'A', 'B', 'C'), 65), 'order: A = 65');
export const orderTri = { names: ['A', 'B', 'C'], shortest: sideOrder(od, ['A', 'B', 'C'])[0], longest: sideOrder(od, ['A', 'B', 'C'])[2] };
must(orderTri.longest === 'AB' && orderTri.shortest === 'CA', 'order: longest AB (opposite C = 75), shortest AC (opposite B = 40)');
export const fOrder = fig({ pts: od, segs: [['A', 'B'], ['B', 'C'], ['C', 'A']], angles: [['B', 'A', 'C', deg(40)], ['A', 'B', 'C', deg(65)], ['C', 'A', 'B', deg(75)]] },
  'A scalene triangle ABC with angles of 65 degrees at A, 40 degrees at B and 75 degrees at C. The longest side, AB, faces the largest angle at C; the shortest side, AC, faces the smallest angle at B.',
  'The largest angle $C = 75^\\circ$ faces the longest side $AB$; the smallest angle $B = 40^\\circ$ faces the shortest side $AC$.');
// converse: sides 6, 8, 11
const o2 = sss(11, 6, 8); // BC = 11, CA = 6, AB = 8
export const o2Order = angleOrder(o2, ['A', 'B', 'C']);
must(o2Order.join('') === 'BCA' || o2Order.join('') === 'CBA', 'order2 sanity');
must(angleOrder(o2, ['A', 'B', 'C'])[2] === 'A', 'sides 6, 8, 11: the largest angle is A, opposite BC = 11');
export const fOrder2 = fig({ pts: o2, segs: [['A', 'B', '8 cm'], ['B', 'C', '11 cm'], ['C', 'A', '6 cm']] },
  'A triangle ABC with AB equal to 8 centimetres, BC equal to 11 centimetres and CA equal to 6 centimetres. The longest side BC is opposite the vertex A, which therefore has the largest angle.',
  'The longest side $BC = 11$ cm faces the largest angle, $\\angle A$.');
// Example 5: angles 48 and 62, third 70
const e5 = asa(8, 48, 62); // B = P, C = Q, A = R
const e5W = copy(e5, ['B', 'C', 'A'], ['P', 'Q', 'R']);
must(near(ang(e5W, 'R', 'P', 'Q'), 70), 'ex5: 70');
export const e5Order = sideOrder(e5W, ['P', 'Q', 'R']);
must(e5Order.join(',') === 'QR,RP,PQ', 'ex5: QR < PR < PQ');
export const fE5 = fig({ pts: e5W, segs: [['P', 'Q'], ['Q', 'R'], ['R', 'P']], angles: [['P', 'Q', 'R', deg(48)], ['Q', 'P', 'R', deg(62)], ['R', 'P', 'Q', '$?$']] },
  'Worked example 5: a triangle PQR with the angle at P equal to 48 degrees and the angle at Q equal to 62 degrees. The angle at R is marked with a question mark.',
  '$\\angle P = 48^\\circ$, $\\angle Q = 62^\\circ$; arrange the sides in order.');
// triangle inequality: two sticks of 4 and 3 cannot meet over a gap of 8
const ti = { A: [0, 0], B: [8, 0], X: polar(4, 50) };
ti.Y = add(ti.B, polar(3, 130));
must(!circInter(ti.A, 4, ti.B, 3) && !canForm(4, 3, 8) && 4 + 3 < 8, 'sticks 4 and 3 cannot span 8');
export const fSticks = fig({ pts: ti, segs: [['A', 'B', '8 cm'], ['A', 'X', '4 cm'], ['B', 'Y', '3 cm']], circles: [['A', 4], ['B', 3]], pos: { X: 'ne', Y: 'nw' } },
  'A base AB of 8 centimetres. A circle of radius 4 centimetres is drawn about A and a circle of radius 3 centimetres about B; the two circles do not touch because 4 plus 3 is less than 8. Two sticks AX and BY, of 4 and 3 centimetres, therefore cannot meet to close a triangle.',
  'Sticks of $4$ cm and $3$ cm cannot close a triangle over a base of $8$ cm: $4 + 3 < 8$.');
// Example 6: triples
const triples = [[7, 10, 18], [7, 10, 17], [9, 14, 5], [8, 8, 15]];
export const tripleVerdict = triples.map((t) => canForm(...t));
must(tripleVerdict.join() === 'false,false,false,true', 'triples: 7 10 18 no; 7 10 17 no (equal); 9 14 5 no (5+9=14); 8 8 15 yes');
export const tTriples = table(['Lengths (cm)', 'Sum of the two smaller', 'Largest', 'Triangle?'], triples.map((t, i) => { const s = [...t].sort((a, b) => a - b); return [t.join(', '), `${s[0]} + ${s[1]} = ${s[0] + s[1]}`, String(s[2]), tripleVerdict[i] ? 'yes' : 'no']; }), 'Table of four sets of lengths: 7, 10 and 18 centimetres gives 17 which is less than 18, no; 7, 10 and 17 gives 17 which equals 17, no; 9, 14 and 5 gives 14 which equals 14, no; 8, 8 and 15 gives 16 which is more than 15, yes.', 'Compare the two smaller lengths with the largest.');
// perpendicular is shortest: PM = 12, PA = 13, PB = 15
const pp = { P: [0, 12], M: [0, 0], A: [5, 0], B: [-9, 0], _L1: [-12, 0] };
must(near(dist(pp.P, pp.M), 12) && near(dist(pp.P, pp.A), 13) && near(dist(pp.P, pp.B), 15), 'perp 12 13 15');
export const fPerp = fig({ pts: { ...pp, l: [9, 0] }, segs: [['_L1', 'l'], ['P', 'M', '12 cm'], ['P', 'A', '13 cm'], ['P', 'B', '15 cm']], angles: [['M', 'P', 'A', undefined, RT]], pos: { l: 'e', M: 's' } },
  'A straight line l along the bottom and a point P above it. The perpendicular PM from P to the line is 12 centimetres, with a right-angle mark at M. Two slanting segments PA and PB to other points of the line are longer: 13 centimetres and 15 centimetres.',
  'The perpendicular $PM = 12$ cm is shorter than the slanting segments $PA = 13$ cm and $PB = 15$ cm.');
// Example 7: A and B on the same side of M: PA = 13, PB = 15
const e7 = { P: [0, 12], M: [0, 0], A: [5, 0], B: [9, 0] };
must(near(dist(e7.P, e7.A), 13) && near(dist(e7.P, e7.B), 15), 'ex7: 13 and 15');
export const e7Angles = { PAB: ang(e7, 'A', 'P', 'B'), PBA: ang(e7, 'B', 'P', 'A') };
must(e7Angles.PAB > 90 && e7Angles.PAB > e7Angles.PBA && dist(e7.P, e7.B) > dist(e7.P, e7.A), 'ex7: obtuse at A, so PB > PA');
export const fE7 = fig({ pts: e7, segs: [['M', 'B'], ['P', 'M', '12 cm'], ['P', 'A', '13 cm'], ['P', 'B', '15 cm']], angles: [['M', 'P', 'A', undefined, RT], ['A', 'P', 'B', undefined, ARC(2)], ['A', 'M', 'P', undefined, ARC(1)]] },
  'A point P above a straight line with the perpendicular PM of 12 centimetres. Two points A and B lie on the line on the same side of M, with A nearer to M. PA is 13 centimetres and PB is 15 centimetres. The angle PAM is marked with one arc and the exterior angle PAB, which is obtuse, with two arcs.',
  '$A$ lies between $M$ and $B$; the farther point $B$ gives the longer segment.');
// Example 8: pole of 8 m, cables to points 6 m and 15 m from the foot
const e8 = { A: [0, 8], B: [0, 0], D: [6, 0], C: [15, 0] };
must(near(dist(e8.A, e8.D), 10) && near(dist(e8.A, e8.C), 17), 'ex8: 10 and 17');
export const fE8 = fig({ pts: e8, segs: [['B', 'C'], ['A', 'B', '8 m'], ['A', 'D', '10 m'], ['A', 'C', '17 m']], angles: [['B', 'A', 'D', undefined, RT]], pos: { A: 'n' } },
  'A vertical pole AB of 8 metres standing on level ground with a right angle at the foot B. Two cables run from the top A to points D and C on the ground, 6 metres and 15 metres from B. The cable AD is 10 metres long and the cable AC is 17 metres long.',
  'Pole $AB = 8$ m; cables $AD = 10$ m and $AC = 17$ m.');
export const tSum2 = table(['Result', 'Statement', 'Use'], [['Isosceles', 'equal sides, equal opposite angles', 'angles from equal sides'], ['Converse', 'equal angles, equal opposite sides', 'show a triangle is isosceles'], ['Larger angle', 'the larger angle faces the longer side', 'order sides and angles'], ['Two sides', 'the sum of any two sides exceeds the third', 'test lengths'], ['Perpendicular', 'shortest of all segments to a line', 'least distance']], 'Summary table: in an isosceles triangle equal sides face equal angles and the converse holds; the larger angle faces the longer side and conversely; any two sides together exceed the third; the perpendicular is the shortest segment from a point to a line.', 'Part 2 on one card.');
export const tProps2 = table(['Result', 'In words', 'Topic'], [['Isosceles theorem', 'angles opposite equal sides are equal, and the converse', 'angle problems'], ['Side and angle order', 'greater side opposite greater angle, and conversely', 'ordering'], ['Triangle inequality', 'two sides together are longer than the third', 'can it be a triangle?'], ['Shortest distance', 'the perpendicular from a point to a line is shortest', 'least distance']], 'Table of the four results in part two: the isosceles theorem and its converse, the greater side opposite the greater angle and its converse, the triangle inequality, and the perpendicular as the shortest distance.', 'Part 2 results.');

// ---------------------------------------------------------------- worked values (checked line by line)
export const wk = {
  e1: A([r`\dfrac{180^\circ - 50^\circ}{2} = 65^\circ`], 'iso E1'),
  e2: A([r`28^\circ + 28^\circ = 56^\circ`, r`180^\circ - 56^\circ = 124^\circ`], 'iso E2'),
  e3: W(eqctx('x', [15]), [r`4x - 10 = 2x + 20 \Rightarrow 2x = 30 \Rightarrow x = 15`, r`4 \times 15 - 10 = 50`, r`2 \times 15 + 20 = 50`, r`180 - 50 - 50 = 80`], 'iso E3'),
  e4: A([r`180^\circ - 40^\circ - 40^\circ = 100^\circ`, r`100^\circ - 40^\circ = 60^\circ`, r`40^\circ + 40^\circ = 80^\circ`, r`60^\circ + 40^\circ + 80^\circ = 180^\circ`], 'iso E4'),
  e5: A([r`180^\circ - 48^\circ - 62^\circ = 70^\circ`], 'order E5'),
  e6: A([r`7 + 10 = 17`, r`9 + 5 = 14`, r`8 + 8 = 16`], 'inequality E6'),
  sc: A([r`115^\circ = 115^\circ`], 'scissors angle'),
};
must(180 - 48 - 62 === 70 && 9 + 5 === 14, 'worked arithmetic');
