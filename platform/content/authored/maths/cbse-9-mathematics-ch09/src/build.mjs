// Build CBSE 9 Mathematics ch09 Triangles – Congruence Theorems. Run from platform/:
//   npx tsx content/_stage/maths/cbse-9-mathematics-ch09/src/build.mjs
// Every figure is drawn from computed coordinates (figs.mjs, asserted there); every number shown in a table or worked example is
// computed here and asserted; the criterion for each pair of triangles in the tables is decided by criterion() in g.mjs.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, topic, deck, sl, table, flow, build, chapterTests } from './lib.mjs';
import { r, must, close, range, dist, angleAt, polar } from './h.mjs';
import { criterion, ssaSides, ssaCount, parts } from './g.mjs';
import { fWobble, fBrace, fCong, fSAS, fSSS, fASA, fAAS, fRHS, fKite, fTent, fIso, fIsoProof, fIsoConv, fIsoNum, fEquil, fSSA, fSSA2, fAltIso } from './figs.mjs';

setUnit('cbse-9-mathematics-ch09', 'claude-sonnet-5-5 (writer); reviewed by claude-opus-5-5 (subject-producer)');
await import('./questions.mjs');
await import('./questions2.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ================================================================ tables and flows, deck 1
const goalFlow1 = flow('LR', [['a', 'Rigid triangles'], ['b', 'Congruent triangles'], ['c', 'SAS and SSS'], ['d', 'ASA, AAS and RHS']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow of Part 1: why triangles are rigid, what congruent triangles are, the tests side angle side and side side side, and the tests angle side angle, angle angle side and right angle hypotenuse side.', 'Part 1 road map.');

const tUses = table(['Structure', 'Where the triangles are', 'What the triangle does'], [
  ['Steel bridge truss', 'Rows of triangles between the top and bottom beams', 'The load cannot push the frame out of shape'],
  ['Roof frame of a house', 'Two rafters and a tie beam across the bottom', 'The roof cannot spread or lean'],
  ['Electricity tower', 'Cross bars between the four legs', 'The tower stays upright in the wind'],
  ['Wooden stool', 'A slanting brace from a leg to the seat frame', 'A wobbling corner becomes a triangle'],
  ['Diamond-frame bicycle', 'Two triangles joined at the seat tube', 'The frame keeps its shape when you pedal'],
], 'Table of five structures that use triangles: a steel bridge truss, a roof frame, an electricity tower, a wooden stool with a brace, and a diamond-frame bicycle, each with where the triangles are and what the triangle does.', 'Triangles hold structures in shape.');

const fb = parts([[3, 4], [0, 0], [6, 0]]);
must(fb.sides.length === 3, 'parts');
const T1 = { ang: [70, 50, 60], sides: [6] };
const tCorr = table(['Vertex match', 'Matching sides', 'Matching angles'], [
  [r`$A \leftrightarrow P$`, r`$AB = PQ$`, r`$\angle A = \angle P = 70^\circ$`],
  [r`$B \leftrightarrow Q$`, r`$BC = QR = 6$ cm`, r`$\angle B = \angle Q = 50^\circ$`],
  [r`$C \leftrightarrow R$`, r`$CA = RP$`, r`$\angle C = \angle R = 60^\circ$`],
], 'Table of the correspondence A to P, B to Q, C to R for the congruent triangles ABC and PQR. The matching sides are AB and PQ, BC and QR (6 centimetres), CA and RP. The matching angles are 70 degrees at A and P, 50 degrees at B and Q, 60 degrees at C and R.', 'The order of letters in $\\triangle ABC \\cong \\triangle PQR$ tells which parts match.');
must(T1.ang.reduce((s, v) => s + v, 0) === 180, 'angles 70 50 60');

const kiteBC = dist(polar([0, 0], 5, 35), [7, 0]), kiteDC = dist(polar([0, 0], 5, -35), [7, 0]);
must(close(kiteBC, kiteDC) && kiteBC.toFixed(2) === '4.08', 'kite BC = DC = 4.08');
const tKite = table(['Step', 'Statement', 'Reason'], [
  ['1', r`$AB = AD$`, 'Given'],
  ['2', r`$\angle BAC = \angle DAC$`, r`Given: $AC$ bisects $\angle A$`],
  ['3', r`$AC = AC$`, 'Common side of both triangles'],
  ['4', r`$\triangle ABC \cong \triangle ADC$`, 'SAS: steps 1, 2 and 3 (the angle is between the two sides)'],
  ['5', r`$BC = DC$ and $\angle ABC = \angle ADC$`, 'CPCT'],
  ['Check', r`$BC = DC \approx 4.08$ cm in the figure`, 'Computed from the coordinates of the figure'],
], 'Table: the proof that triangles ABC and ADC are congruent. AB equals AD is given, the angle at A is bisected so the two angles are equal, and AC is common, so by SAS the triangles are congruent, and BC equals DC because corresponding parts are equal. In the figure both are about 4.08 centimetres.', 'SAS, then CPCT.');

const tentOB = Math.sqrt(5 * 5 - 4 * 4);
must(tentOB === 3 && Math.sqrt(5 * 5 - 4 * 4) === 3, 'tent: OB = OC = 3');
const tTent = table(['Step', 'Statement', 'Reason'], [
  ['1', r`$\angle AOB = \angle AOC = 90^\circ$`, 'The pole is upright on level ground'],
  ['2', r`Hypotenuse $AB$ = hypotenuse $AC$`, 'The two ropes are equal (given)'],
  ['3', r`$OA = OA$`, 'Common side'],
  ['4', r`$\triangle AOB \cong \triangle AOC$`, 'RHS: right angle, hypotenuse, one side'],
  ['5', r`$OB = OC$`, 'CPCT'],
  ['Check', r`$OB = OC = \sqrt{5^2 - 4^2} = 3$ m`, 'Ropes of 5 m and a pole of 4 m'],
], 'Table: the proof that the tent pegs are equally far from the pole. The angles at O are right angles, the ropes AB and AC are equal hypotenuses, and OA is common, so by RHS triangles AOB and AOC are congruent and OB equals OC. With ropes of 5 metres and a pole of 4 metres, each peg is 3 metres from the pole.', 'RHS, then CPCT.');

const crit = (equal, right) => criterion(equal, right);
must(crit(['b', 'c', 'A']) === 'SAS' && crit(['b', 'c', 'B']) === 'none' && crit(['a', 'b', 'c']) === 'SSS' && crit(['a', 'B', 'C']) === 'ASA' && crit(['a', 'A', 'B']) === 'AAS' && crit(['a', 'b'], 'B') === 'RHS' && crit(['b', 'a'], 'B') === 'RHS' && crit(['a', 'c'], 'B') === 'SAS', 'criteria');
const tWhich = table(['Equal parts', 'Test', 'Use it?'], [
  ['Two sides and the angle between them', 'SAS', 'Yes'],
  ['Three sides', 'SSS', 'Yes'],
  ['Two angles and the side between them', 'ASA', 'Yes'],
  ['Two angles and a side that is not between them', 'AAS', 'Yes'],
  ['Right angle, hypotenuse and one more side', 'RHS', 'Yes (right-angled triangles only)'],
  ['Two sides and an angle that is not between them', 'SSA', 'No: it can fail'],
], 'Table of equal parts and the test they give: SAS, SSS, ASA, AAS and RHS can be used to prove triangles congruent; two sides and an angle that is not between them, SSA, cannot be used in general.', 'Name the test, and check that the equal parts are in the right places.');
const sum1 = flow('LR', [['a', 'Triangles are rigid'], ['b', 'Congruent: all matching parts equal'], ['c', 'Tests: SAS, SSS, ASA, AAS, RHS'], ['d', 'Then CPCT']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Summary flow of Part 1: triangles are rigid, congruent triangles have all matching parts equal, the tests are SAS, SSS, ASA, AAS and RHS, and after proving congruence we use corresponding parts of congruent triangles are equal.', 'The story of Part 1.');

// ================================================================ deck 1
const d1 = deck({
  part: 1,
  title: 'Triangles – Congruence Theorems: Part 1, rigid triangles and the congruence tests',
  goals: ['Explain why triangles are rigid and how structures use them', 'Say what congruent triangles are and name their matching parts', 'Use SAS, SSS, ASA, AAS and RHS to prove triangles congruent', 'Use corresponding parts of congruent triangles to prove sides and angles equal'],
  slides: [
    sl('title', 'Why are bridges full of triangles?', { b: 'Look at the iron truss of a railway bridge, a school roof or a bicycle frame: they are made of **triangles**. A frame of four bars can lean over, but a frame of three bars cannot.', v: fWobble, n: `Look at a railway bridge, the roof of a school, or the frame of a bicycle. You will see triangles everywhere. There is a good reason. A frame made of four bars can lean over and change its shape, but a frame made of three bars always keeps the shape it was built with. In this chapter we find out why, and how to tell when two triangles are exactly the same.` }),
    sl('concept', 'What you will be able to do', { ul: ['Explain why a **triangle is rigid**', 'Say what **congruent** triangles are, and use **CPCT**', 'Prove triangles congruent by **SAS, SSS, ASA, AAS** or **RHS**', 'Use the tests in short proofs'], v: goalFlow1, n: `In this part we explain why triangles are rigid, and where engineers use them. Then we learn what congruent triangles are and how to name the matching parts. Finally we learn the five tests for congruence: side angle side, side side side, angle side angle, angle angle side, and right angle hypotenuse side.` }),
    sl('diagram', 'A frame of four bars wobbles, a frame of three does not', { b: r`A rectangle of bars $4$ cm and $3$ cm can lean over into a **parallelogram** with the same four bar lengths. Three bars of $3$, $4$ and $5$ cm can make only **one** triangle. We say a triangle is **rigid**.`, v: fWobble, n: `Take four bars joined at the corners with pins. Push on the frame and it leans over into a new shape, though every bar keeps its length. Now take three bars of three, four and five centimetres. There is only one triangle you can make from them. Its angles cannot change unless a bar bends or breaks. This is what we mean when we say that a triangle is rigid.` }),
    sl('concept', 'Triangles in structures', { b: 'Wherever a frame must **keep its shape**, engineers build it from triangles.', v: tUses, n: `Engineers use triangles wherever a frame must not change shape. The steel trusses of a bridge are rows of triangles. A roof frame has two slanting rafters and a beam across the bottom. A tall electricity tower has crossbars that make triangles between its legs. Even a wooden stool is made firm by a slanting brace, which turns a wobbly corner into a triangle.` }),
    sl('diagram', 'Bracing a four-sided frame', { b: r`Adding one **diagonal** $AC$ to the frame $ABCD$ splits it into two triangles, $ABC$ and $CDA$. Each triangle is rigid, so the whole frame is rigid. Here the frame is $4$ cm by $3$ cm and the brace is $5$ cm.`, v: fBrace, n: `A frame with four sides can be made rigid by adding one bar across a pair of opposite corners. This bar is called a brace, or a diagonal. In the figure, the frame is four centimetres by three, and the brace is five centimetres long. The brace splits the frame into two triangles, and each triangle is rigid, so the whole frame cannot lean any more.` }),
    sl('check', 'Quick check: bracing a frame', { b: 'A hinged four-bar frame wobbles. Which single bar makes it rigid?', v: fBrace, chk: 'm01', n: `Think about which bar splits the frame into triangles.` }),
    sl('diagram', 'Congruent triangles', { b: r`Two triangles are **congruent** if one can be moved, turned or flipped to fit exactly on the other. We write $\triangle ABC \cong \triangle PQR$. The **order of the letters** matters: $A$ matches $P$, $B$ matches $Q$ and $C$ matches $R$.`, v: fCong, n: `Two figures are congruent if one can be moved, turned or turned over so that it fits exactly on the other. In the figure, triangle A B C and triangle P Q R are congruent. We write this with the sign for congruent, and the order of the letters matters: A matches P, B matches Q, and C matches R. Matching sides and matching angles are equal.` }),
    sl('concept', 'Corresponding parts: CPCT', { b: r`If $\triangle ABC \cong \triangle PQR$, all six pairs of matching parts are equal. We use this as **CPCT**: corresponding parts of congruent triangles are equal.`, v: tCorr, n: `When two triangles are congruent, all six pairs of matching parts are equal. This is written as corresponding parts of congruent triangles are equal, and the short form is C P C T. In the table, A B equals P Q because A matches P and B matches Q. Always read the matching from the order of the letters in the congruence statement.` }),
    sl('diagram', 'Test 1: side angle side (SAS)', { b: r`**SAS:** if two sides and the **angle between them** in one triangle are equal to two sides and the angle between them in another, the triangles are congruent. Here $5$ cm, $4$ cm and $55^\circ$ between them.`, v: fSAS, n: `Our first test is side angle side. If two sides of one triangle and the angle between them are equal to two sides of another triangle and the angle between them, the triangles are congruent. In the figure, both triangles have a side of five, a side of four and an angle of fifty-five degrees between them. The word between matters, as we shall see later.` }),
    sl('diagram', 'Test 2: side side side (SSS)', { b: r`**SSS:** if the three sides of one triangle are equal to the three sides of another, the triangles are congruent. Here the sides are $7$, $6$ and $5$ cm, and the second triangle is turned over.`, v: fSSS, n: `The second test is side side side. If the three sides of one triangle are equal to the three sides of another triangle, the triangles are congruent. In the figure the sides are seven, six and five centimetres. The second triangle has been turned over, like a mirror image, but it is still congruent, and its angles match the angles of the first triangle.` }),
    sl('example', 'Worked example 1: a kite-shaped plot', { b: r`In the figure $AB = AD$ and the diagonal $AC$ bisects $\angle A$. Prove that $\triangle ABC \cong \triangle ADC$, and hence $BC = DC$.`, ul: [r`**Two sides and the angle between —** $AB = AD$, $\angle BAC = \angle DAC$, and $AC$ is common`, r`**Test —** SAS gives $\triangle ABC \cong \triangle ADC$`, r`**CPCT —** $BC = DC$ (about $4.08$ cm in the figure)`], v: tKite, n: `Here is a four sided figure A B C D in which A B equals A D, and the diagonal A C bisects the angle at A. We prove that triangles A B C and A D C are congruent. Two sides and the angle between them are equal, and the side A C is shared by both triangles. So the triangles are congruent by side angle side, and B C equals D C because matching parts are equal.` }),
    sl('check', 'Quick check: which test?', { b: 'Two triangles have two pairs of equal sides and the angle between them equal. Which test shows they are congruent?', v: fSAS, chk: 'm02', n: `Look at where the equal angle is placed.` }),
    sl('diagram', 'Test 3: angle side angle (ASA)', { b: r`**ASA:** if two angles and the **side between them** in one triangle are equal to two angles and the side between them in another, the triangles are congruent. Here the side is $6$ cm and the angles are $40^\circ$ and $75^\circ$.`, v: fASA, n: `The third test is angle side angle. If two angles and the side between them in one triangle are equal to two angles and the side between them in another, the triangles are congruent. In the figure, the side is six centimetres and the angles at its ends are forty and seventy-five degrees. The third angle is then sixty-five degrees in both triangles.` }),
    sl('diagram', 'Test 4: angle angle side (AAS)', { b: r`**AAS:** two angles and a side that is **not between them**. The third angles are equal too, because the angles of a triangle add up to $180^\circ$. Here $180 - 48 - 72 = 60$, so we are back to ASA.`, v: fAAS, n: `Sometimes the equal side is not between the two equal angles. This is the test angle angle side. Since the angles of a triangle add up to one hundred eighty degrees, equal angles at two corners force the third angles to be equal as well. So we can turn the situation into angle side angle, and the triangles are congruent. In the figure the third angles are both sixty degrees.` }),
    sl('diagram', 'Test 5: right angle, hypotenuse, side (RHS)', { b: r`The **hypotenuse** is the side opposite the right angle. **RHS:** if two right-angled triangles have equal hypotenuses and one other pair of equal sides, they are congruent. Here $13$ cm and $5$ cm, so the third side is $12$ cm in both.`, v: fRHS, n: `A right angled triangle has a special test. If the hypotenuse and one other side of a right angled triangle are equal to the hypotenuse and one side of another right angled triangle, the triangles are congruent. This is the right angle, hypotenuse, side test. In the figure both hypotenuses are thirteen and both sides are five centimetres, so the other sides are also equal, twelve centimetres.` }),
    sl('example', 'Worked example 2: pegs of a tent', { b: r`A tent pole $OA$ stands upright. Two ropes $AB$ and $AC$ of equal length are pegged at $B$ and $C$ on opposite sides of the pole. Prove that $OB = OC$.`, ul: [r`**Right angles —** $\angle AOB = \angle AOC = 90^\circ$`, r`**Hypotenuse and side —** $AB = AC$ and $OA$ is common`, r`**Test —** RHS, then CPCT gives $OB = OC$`], v: tTent, n: `A tent pole O A stands upright on level ground. Two ropes of equal length join the top A to pegs B and C on opposite sides of the pole. We show that the pegs are equally far from the pole. The triangles A O B and A O C are right angled, the ropes are the equal hypotenuses, and the pole is a shared side. So they are congruent by the right angle, hypotenuse, side test.` }),
    sl('check', 'Quick check: RHS', { b: 'Two right-angled triangles have hypotenuse $13$ cm and one side $5$ cm. What is the other side of each?', v: fRHS, chk: 'm03', n: `Use the rule for the sides of a right angled triangle.` }),
    sl('summary', 'Summary', { ul: ['A **triangle is rigid**; a four-bar frame is made rigid by a diagonal brace', r`Congruent triangles fit exactly; in $\triangle ABC \cong \triangle PQR$ the letters match in order`, '**Tests:** SAS, SSS, ASA, AAS and (right-angled triangles) RHS', '**CPCT:** after proving congruence, matching sides and angles are equal'], v: sum1, n: `To sum up. A triangle is rigid, which is why it is used in structures. Congruent triangles have all matching parts equal, and we read the matching from the order of the letters. The tests are side angle side, side side side, angle side angle, angle angle side, and, for right angled triangles, right angle hypotenuse side. Once triangles are congruent, matching parts are equal.` }),
    sl('exam-tips', 'Exam tips: how marks are awarded', { ul: ['**Proofs (3 marks):** three equal pairs, each with a reason, then the test, then the conclusion', '**Name the triangles in matching order:** $\\triangle ABC \\cong \\triangle PQR$ with $A \\leftrightarrow P$', '**Mistake:** using an angle that is not between the two sides for SAS', '**Mistake:** forgetting to say that a common side equals itself'], v: tWhich, n: `Write the three equal pairs in order, each with a reason, and then name the test. Write the congruence statement with the letters in matching order. Only after that, say that matching parts are equal. Common slips are using an angle that is not between the two sides, mixing up the order of letters, and forgetting to state that a shared side is equal to itself.` }),
  ],
});

// ================================================================ tables and flows, deck 2
const goalFlow2 = flow('LR', [['a', 'Isosceles triangles'], ['b', 'Converse'], ['c', 'Propositions'], ['d', 'Why SSA fails']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow of Part 2: the isosceles triangle theorem, its converse, propositions and converses, and why two sides and a non-included angle do not prove congruence.', 'Part 2 road map.');
const tIsoThm = table(['Step', 'Statement', 'Reason'], [
  ['1', r`In $\triangle ABC$, $AB = AC$. Draw the bisector $AD$ of $\angle A$ to meet $BC$ at $D$`, 'Construction'],
  ['2', r`$AB = AC$`, 'Given'],
  ['3', r`$\angle BAD = \angle CAD$`, r`$AD$ bisects $\angle A$`],
  ['4', r`$AD = AD$`, 'Common side'],
  ['5', r`$\triangle ABD \cong \triangle ACD$`, 'SAS'],
  ['6', r`$\angle B = \angle C$`, 'CPCT'],
], 'Table: proof that equal sides have equal angles opposite them. Draw the bisector AD of the angle at A. Triangles ABD and ACD have AB equal to AC, equal angles at A, and AD in common, so they are congruent by SAS, and angle B equals angle C.', 'Equal sides imply equal angles.');
const tIsoConv = table(['Step', 'Statement', 'Reason'], [
  ['1', r`In $\triangle ABC$, $\angle B = \angle C$. Draw the bisector $AD$ of $\angle A$ to meet $BC$ at $D$`, 'Construction'],
  ['2', r`$\angle B = \angle C$`, 'Given'],
  ['3', r`$\angle BAD = \angle CAD$`, r`$AD$ bisects $\angle A$`],
  ['4', r`$AD = AD$`, 'Common side'],
  ['5', r`$\triangle ABD \cong \triangle ACD$`, 'AAS (two angles and a side that is not between them)'],
  ['6', r`$AB = AC$`, 'CPCT'],
], 'Table: proof of the converse. Draw the bisector AD of the angle at A. Triangles ABD and ACD have angle B equal to angle C, equal angles at A, and AD in common, so they are congruent by AAS, and AB equals AC.', 'Equal angles imply equal sides.');

const e1 = range(1, 60).filter((x) => 3 * x + 5 === 5 * x - 25);
must(e1.join() === '15' && 3 * 15 + 5 === 50 && 5 * 15 - 25 === 50 && 180 - 2 * 50 === 80, 'isosceles x = 15');
const tIsoEx = table(['Step', 'Work', 'Result'], [
  ['Base angles are equal', r`$3x + 5 = 5x - 25$`, r`$2x = 30$, so $x = 15$`],
  ['Each base angle', r`$3 \times 15 + 5 = 5 \times 15 - 25$`, r`$50^\circ$`],
  ['Apex angle', r`$180 - 50 - 50$`, r`$80^\circ$`],
], 'Table: for an isosceles triangle with base angles 3x plus 5 and 5x minus 25 degrees, the base angles are equal, so x is 15, each base angle is 50 degrees, and the apex angle is 180 minus 100, which is 80 degrees.', 'Use the equal base angles to form an equation.');

const lastDigit0 = range(1, 200).filter((n) => n % 10 === 0).every((n) => n % 5 === 0), cx = range(1, 200).filter((n) => n % 5 === 0 && n % 10 !== 0);
must(lastDigit0 && cx.includes(15), 'a number ending in 0 is divisible by 5; 15 is a counterexample to the converse');
const tProp = table(['Statement', 'Converse', 'Converse true?'], [
  ['If two sides of a triangle are equal, the angles opposite them are equal', 'If two angles of a triangle are equal, the sides opposite them are equal', 'True: proved in this chapter'],
  ['If a triangle is equilateral, all its angles are $60^\\circ$', 'If all angles of a triangle are $60^\\circ$, it is equilateral', 'True'],
  ['If a number ends in $0$, it is divisible by $5$', 'If a number is divisible by $5$, it ends in $0$', 'False: $15$'],
  ['If a four-sided figure is a square, its four sides are equal', 'If a four-sided figure has four equal sides, it is a square', 'False: a rhombus'],
], 'Table of four statements, their converses, and whether the converse is true: equal sides and equal angles in a triangle, equilateral and all angles 60 degrees, a number ending in 0 and divisible by 5 with the counterexample 15, and a square and a four-sided figure with four equal sides with the counterexample of a rhombus.', 'The converse swaps "if" and "then", and may be false.');

const eqSum = 60 * 3;
must(eqSum === 180, 'equilateral');

const ssaAB = 4 * Math.SQRT2, ssaV = ssaSides(45, ssaAB, 5);
must(ssaV.length === 2 && close(ssaV[0], 1) && close(ssaV[1], 7), 'SSA 1 or 7');
const angC = (b) => (Math.acos((b * b + 25 - ssaAB * ssaAB) / (2 * b * 5)) * 180) / Math.PI;
must(close(angC(1) + angC(7), 180) && angC(1).toFixed(1) === '126.9' && angC(7).toFixed(1) === '53.1', 'SSA angles at C and D');
const tSSA = table(['', 'Triangle ABC', 'Triangle ABD'], [
  [r`$\angle A$`, r`$45^\circ$`, r`$45^\circ$`],
  [r`$AB$`, r`$4\sqrt{2} \approx 5.66$ cm`, r`$4\sqrt{2} \approx 5.66$ cm`],
  [r`$BC$ and $BD$`, '$5$ cm', '$5$ cm'],
  [r`The third side ($AC$ and $AD$)`, '$1$ cm', '$7$ cm'],
  ['The angle at the third corner', r`$\approx 126.9^\circ$`, r`$\approx 53.1^\circ$`],
], 'Table comparing two triangles ABC and ABD with the same angle A of 45 degrees, the same side AB of 4 root 2, about 5.66 centimetres, and the same side BC or BD of 5 centimetres. The third side AC is 1 centimetre in one and AD is 7 centimetres in the other; the angles at the third corner are about 126.9 and 53.1 degrees.', 'Same SSA data, different triangles.');

const ssaRows = [3, 4, 5, 6].map((a) => [a, ssaCount(45, ssaAB, a)]);
must(ssaRows.map((x) => x[1]).join() === '0,1,2,1', 'SSA counts');
const tSSAcases = table([r`Side $BC$ (angle $A = 45^\circ$, $AB \approx 5.66$ cm)`, 'Triangles possible', 'Why'], [
  ['$3$ cm', 'None', r`Too short to reach the ray: the shortest distance from $B$ is $4$ cm`],
  ['$4$ cm', 'One', r`Just touches the ray, at a right angle`],
  ['$5$ cm', 'Two', r`Meets the ray in two places, $1$ cm and $7$ cm from $A$`],
  ['$6$ cm', 'One', r`Longer than $AB$: only one meeting point on the ray`],
], 'Table of how many triangles can be drawn with angle A of 45 degrees, AB about 5.66 centimetres and different lengths of BC: none for 3 centimetres, one for 4 centimetres, two for 5 centimetres, and one for 6 centimetres.', 'SSA data can give none, one or two triangles.');

const altB = 4.8;
const tAlt = table(['Step', 'Statement', 'Reason'], [
  ['1', r`$AB = AC$, so $\angle ABC = \angle ACB$`, 'Equal sides, equal angles opposite them'],
  ['2', r`In $\triangle BEC$ and $\triangle CFB$: $\angle BEC = \angle CFB = 90^\circ$`, r`$BE \perp AC$ and $CF \perp AB$`],
  ['3', r`$\angle ECB = \angle FBC$`, 'Step 1'],
  ['4', r`$BC = CB$`, 'Common side'],
  ['5', r`$\triangle BEC \cong \triangle CFB$`, 'AAS'],
  ['6', r`$BE = CF$`, 'CPCT'],
  ['Check', r`$BE = CF = 4.8$ cm for sides $5$, $5$, $6$`, 'Area $12 = \\frac12 \\times 5 \\times BE$'],
], 'Table: the proof that the altitudes BE and CF of an isosceles triangle are equal. Angle ABC equals angle ACB, the angles at E and F are right angles, and BC is common, so triangles BEC and CFB are congruent by AAS and BE equals CF. For sides 5, 5 and 6 centimetres both altitudes are 4.8 centimetres.', 'Equal altitudes from an isosceles triangle.');
must(close(2 * 12 / 5, altB), 'altitude 4.8');
const sum2 = flow('LR', [['a', 'Equal sides: equal angles'], ['b', 'Converse: equal angles, equal sides'], ['c', 'Converse of a statement'], ['d', 'SSA does not work']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Summary flow of Part 2: equal sides give equal angles, the converse also holds, a converse swaps if and then, and two sides with a non-included angle do not prove congruence.', 'The story of Part 2.');
const tExam2 = table(['If you are asked to...', 'Do this'], [
  ['Prove base angles equal', 'Draw the bisector of the apex angle and use SAS'],
  ['Prove two sides equal', 'Show two angles equal, draw a bisector, use AAS'],
  ['Test a converse', 'Write it, then try an example that might break it'],
  ['Explain why SSA fails', 'Draw the two different triangles with the same data'],
], 'Table of exam tasks and what to do: prove base angles equal with the bisector and SAS, prove two sides equal with AAS, test a converse with an example, and explain why SSA fails by drawing two different triangles.', 'Four typical tasks in this chapter.');

// ================================================================ deck 2
const d2 = deck({
  part: 2,
  title: 'Triangles – Congruence Theorems: Part 2, isosceles triangles, converses and why SSA fails',
  goals: ['Prove that equal sides of a triangle have equal angles opposite them, and the converse', 'Form the converse of a statement and decide whether it is true', 'Explain why two sides and a non-included angle do not prove congruence', 'Use the isosceles theorem and congruence tests in short proofs'],
  slides: [
    sl('title', 'Equal sides, equal angles', { b: 'A roof frame with two equal rafters makes an **isosceles triangle**. It looks the same on the left and the right, so its base angles look equal. Is this always true?', v: fIso, n: `Roof frames often look like an upside down V with a beam across the bottom. The two rafters have the same length, so the triangle formed is isosceles. It looks the same on the left and the right, and its two base angles look equal. In this part we prove that this is always true, and we study when a statement and its converse are both true.` }),
    sl('concept', 'What you will be able to do', { ul: ['Prove the **isosceles triangle theorem** and its **converse**', 'Form the **converse** of a proposition', 'Explain why **SSA** does not prove congruence', 'Use the tests to solve short problems'], v: goalFlow2, n: `In this part we prove that equal sides give equal angles in a triangle, and that equal angles give equal sides. We learn what a proposition and its converse are. Then we find out why two sides and a non included angle do not guarantee congruent triangles, by drawing two different triangles with the same data.` }),
    sl('diagram', 'Parts of an isosceles triangle', { b: r`An **isosceles triangle** has two equal sides, the **legs**. The third side is the **base**. The angle between the legs is the **apex angle**, and the angles at the ends of the base are the **base angles**.`, v: fIso, n: `An isosceles triangle has two equal sides, called the legs. The third side is the base. The angle between the legs is the apex angle, and the two angles at the ends of the base are the base angles. In the figure, A B and A C are the equal legs, and the base angles at B and C are opposite the equal sides.` }),
    sl('concept', 'Theorem: equal sides, equal angles', { b: r`**Theorem:** if two sides of a triangle are equal, the angles opposite them are equal. The proof draws the bisector of the apex angle.`, v: tIsoThm, n: `Theorem: if two sides of a triangle are equal, the angles opposite them are equal. To prove it, draw the bisector of the apex angle, meeting the base at D. Triangles A B D and A C D have two equal sides, equal angles between them, and the side A D in common. They are congruent by side angle side, so the base angles B and C are equal.` }),
    sl('diagram', 'Converse: equal angles, equal sides', { b: r`**Theorem (converse):** if two angles of a triangle are equal, the sides opposite them are equal. Here the angles at $B$ and $C$ are both $65^\circ$, so $AB = AC$.`, v: fIsoConv, n: `Now the converse: if two angles of a triangle are equal, the sides opposite them are equal. Again draw the bisector A D of the angle at A. Triangles A B D and A C D have two pairs of equal angles, and the side A D is in common but not between the equal angles. They are congruent by angle angle side, so A B equals A C.` }),
    sl('check', 'Quick check: base angles', { b: 'In an isosceles triangle the apex angle is $50^\\circ$. What is each base angle?', v: fIsoProof, chk: 'm04', n: `The angles of a triangle add up to one hundred eighty degrees.` }),
    sl('concept', 'Propositions and converses', { b: r`A **proposition** is a statement that is either true or false. If it says "if $P$ then $Q$", its **converse** says "if $Q$ then $P$". A converse of a true statement may be true or false.`, v: tProp, n: `A proposition is a statement that can be true or false. Many results have the form: if this, then that. The converse swaps the two parts: if that, then this. The converse of a true statement may be true or false. The isosceles theorem and its converse are both true. But if a four sided figure is a square then its four sides are equal is true, and its converse is false, because a rhombus also has four equal sides.` }),
    sl('example', 'Worked example 1: find x', { b: r`In $\triangle ABC$, $AB = AC$, $\angle B = (3x + 5)^\circ$ and $\angle C = (5x - 25)^\circ$. Find $x$ and $\angle A$.`, ul: [r`**Equal sides —** the angles opposite them are equal: $3x + 5 = 5x - 25$`, r`**Solve —** $2x = 30$, so $x = 15$ and each base angle is $50^\circ$`, r`**Apex —** $\angle A = 180^\circ - 50^\circ - 50^\circ = 80^\circ$`], v: fIsoNum, n: `Here is an isosceles triangle A B C with A B equal to A C. The base angles are three x plus five and five x minus twenty-five degrees. Since the base angles are equal, we solve and find x equals fifteen. Each base angle is fifty degrees, so the apex angle is one hundred eighty minus one hundred, which is eighty degrees.` }),
    sl('check', 'Quick check: write the converse', { b: 'Write the converse of: if a four-sided figure is a rectangle, its diagonals are equal.', v: tProp, chk: 'm05', n: `Swap the two parts of the statement.` }),
    sl('diagram', 'Equilateral triangles', { b: r`In an equilateral triangle all sides are equal. Using the theorem on each pair of sides, all angles are equal, so each is $180^\circ \div 3 = 60^\circ$. The converse holds too: three equal angles give three equal sides.`, v: fEquil, n: `An equilateral triangle has three equal sides. Using the isosceles theorem on each pair of equal sides, all three angles are equal. They add up to one hundred eighty degrees, so each is sixty degrees. The converse also holds: a triangle with three equal angles has three equal sides. So equilateral and equiangular mean the same thing for triangles.` }),
    sl('diagram', 'A warning: two sides and an angle not between them', { b: r`Take $\angle A = 45^\circ$, a side $AB$, and a side $BC = 5$ cm **opposite** the angle. The point $C$ can be in **two** places on the ray, so there are two different triangles, $ABC$ and $ABD$.`, v: fSSA, n: `Now an important warning. We have seen that two sides and the angle between them fix a triangle. What if the equal angle is not between the two sides? Take an angle of forty-five degrees at A, a side A B, and a side B C of five centimetres opposite the angle. As the figure shows, the side B C can swing to two different positions, C or D.` }),
    sl('diagram', 'SSA is not a congruence test', { b: r`Both triangles have $\angle A = 45^\circ$, the same $AB$ and a side of $5$ cm opposite $\angle A$, but the third side is $1$ cm in one and $7$ cm in the other. So **SSA** is **not** a test for congruence.`, v: fSSA2, n: `Both triangles have the same angle of forty-five degrees, the same side A B, and the same side of five centimetres opposite the angle. But the third side is one centimetre in one triangle and seven centimetres in the other. They are not congruent. So two sides and a non included angle, called S S A, is not a test for congruence.` }),
    sl('concept', 'How many triangles does SSA give?', { b: r`The number of triangles depends on the length of the side opposite the angle: none, one or two. Because it can give two, SSA cannot be trusted in general. With a **right angle** at the corner it works: that is **RHS**.`, v: tSSAcases, n: `Whether the data gives one triangle, two triangles, or none depends on the length of the opposite side. With an angle of forty-five degrees and a side A B of about five point six six, a side of three centimetres is too short to reach. A side of four just touches. A side of five can reach in two ways. A longer side gives only one triangle. So S S A cannot be trusted in general.` }),
    sl('check', 'Quick check: not a test', { b: 'Which of these is **not** a test for congruence of two triangles?', v: tSSA, chk: 'm06', n: `Recall the figure with two different triangles.` }),
    sl('example', 'Worked example 2: equal altitudes', { b: r`In an isosceles triangle $ABC$ with $AB = AC$, $BE \perp AC$ and $CF \perp AB$. Prove that $BE = CF$.`, ul: [r`**Base angles —** $AB = AC$ gives $\angle ABC = \angle ACB$`, r`**Triangles $BEC$ and $CFB$ —** right angles at $E$ and $F$, equal base angles, $BC$ common`, r`**AAS, then CPCT —** $BE = CF$ ($4.8$ cm for sides $5, 5, 6$)`], v: tAlt, n: `In an isosceles triangle A B C with A B equal to A C, the perpendiculars B E and C F are drawn to the equal sides. We show that they are equal. In triangles B E C and C F B, the angles at E and F are right angles, the angles at B and C are equal because the triangle is isosceles, and B C is common. So the triangles are congruent, and B E equals C F.` }),
    sl('summary', 'Summary', { ul: [r`In an isosceles triangle the angles opposite the equal sides are **equal**, and the converse is true`, r`An **equilateral** triangle has three angles of $60^\circ$`, r`The **converse** of "if $P$ then $Q$" is "if $Q$ then $P$"; it may be true or false`, r`**SSA is not a test:** the same data can give two different triangles`], v: sum2, n: `To sum up. In an isosceles triangle, equal sides have equal angles opposite them, and the converse is also true. An equilateral triangle has three angles of sixty degrees. The converse of a statement swaps if and then, and it may be true or false. Two sides and a non included angle do not guarantee congruence, because two different triangles can have the same data.` }),
    sl('exam-tips', 'Exam tips: how marks are awarded', { ul: ['**Isosceles proofs (3 marks):** figure with the bisector, three equal pairs, test, CPCT', '**Converse questions (2 marks):** write the converse, then say true or give a counterexample', '**Mistake:** claiming SSA as a test', '**Mistake:** writing the letters of the congruent triangles in the wrong order'], v: tExam2, n: `In proofs, draw the figure and mark equal parts. Give a reason for each step, and name the test used. For the isosceles theorem, say which parts are equal and why. For converse questions, test the converse with an example before saying it is true. Common slips are claiming S S A as a test, and writing the congruence letters in the wrong order.` }),
  ],
});

// ================================================================ notes
const notes = {
  unit: 'cbse-9-mathematics-ch09', version: 1, title: 'Triangles – Congruence Theorems: chapter notes', language: 'en',
  sections: [
    { heading: '1. Rigidity of triangles', body_md: r`A frame of four bars joined by pins can change its shape (a rectangle leans over into a parallelogram), but a frame of three bars cannot: three given lengths make only **one** triangle. A triangle is **rigid**. Adding a diagonal to a 4-gon frame splits it into two triangles and makes it rigid. This is why bridges, roofs, towers, stools and cycle frames are built from triangles. A frame with $n$ sides needs $n - 3$ diagonals from one corner to become rigid.`, key_terms: [{ term: 'Rigid', definition_md: 'A frame is rigid if it cannot change its shape without a bar bending or breaking.' }, { term: 'Brace (diagonal)', definition_md: 'A bar added between two corners of a frame to split it into triangles.' }], formulas: [], visual: fWobble, visuals: [tUses, fBrace], topic_ids: [topic(1)] },
    { heading: '2. Congruent triangles and CPCT', body_md: r`Two figures are **congruent** if one can be moved, turned or flipped to fit exactly on the other. In $\triangle ABC \cong \triangle PQR$ the letters match in order: $A \leftrightarrow P$, $B \leftrightarrow Q$, $C \leftrightarrow R$. Then $AB = PQ$, $BC = QR$, $CA = RP$ and $\angle A = \angle P$, $\angle B = \angle Q$, $\angle C = \angle R$. **CPCT:** corresponding parts of congruent triangles are equal. We first prove the triangles congruent, then use CPCT to prove sides or angles equal.`, key_terms: [{ term: 'Congruent', definition_md: 'Having exactly the same shape and size.' }, { term: 'CPCT', definition_md: 'Corresponding parts of congruent triangles are equal.' }], formulas: [{ latex: r`\triangle ABC \cong \triangle PQR \Rightarrow AB = PQ,\ BC = QR,\ CA = RP`, label: 'Correspondence' }], visual: fCong, visuals: [tCorr], topic_ids: [topic(2)] },
    { heading: '3. Congruence criteria', body_md: r`**SAS:** two sides and the **included** angle. **SSS:** three sides. **ASA:** two angles and the **included** side. **AAS:** two angles and a side that is **not** between them (the third angles are then equal too). **RHS:** in right-angled triangles, the hypotenuse and one other side.\n\nTo prove triangles congruent, list three pairs of equal parts, each with a reason (given, common side, vertically opposite angles, and so on), name the test, write the triangles in matching order, and then conclude with CPCT.`, key_terms: [{ term: 'Included angle', definition_md: 'The angle between two given sides.' }, { term: 'Hypotenuse', definition_md: 'The side opposite the right angle of a right-angled triangle.' }], formulas: [], visual: tWhich, visuals: [fSAS, fSSS, fASA, fAAS, fRHS, tKite, tTent], topic_ids: [topic(2)] },
    { heading: '4. Isosceles triangles', body_md: r`An **isosceles** triangle has two equal sides (legs); the angles at the ends of the base are the base angles.\n\n**Theorem:** if two sides of a triangle are equal, the angles opposite them are equal. *Proof:* draw the bisector $AD$ of the apex angle; $\triangle ABD \cong \triangle ACD$ by SAS; so $\angle B = \angle C$.\n\n**Converse:** if two angles of a triangle are equal, the sides opposite them are equal. *Proof:* draw the bisector $AD$ of $\angle A$; $\triangle ABD \cong \triangle ACD$ by AAS; so $AB = AC$.\n\nAn **equilateral** triangle has three equal angles, each $60^\circ$, and conversely.`, key_terms: [{ term: 'Isosceles triangle', definition_md: 'A triangle with two equal sides.' }, { term: 'Apex angle', definition_md: 'The angle between the two equal sides.' }], formulas: [{ latex: r`AB = AC \iff \angle B = \angle C`, label: 'Isosceles triangle theorem and its converse' }], visual: fIso, visuals: [tIsoThm, fIsoProof, fIsoConv, tIsoConv, fIsoNum, tIsoEx, fEquil, fAltIso, tAlt], topic_ids: [topic(3)] },
    { heading: '5. Propositions and converses', body_md: r`A **proposition** is a statement that is true or false. For "if $P$ then $Q$", the **converse** is "if $Q$ then $P$". The converse of a true statement may be true (equal sides and equal angles in a triangle) or false (a number ending in $0$ is divisible by $5$, but $15$ is divisible by $5$ and does not end in $0$). To show that a statement is false, one **counterexample** is enough; to show it is true, we need a proof.`, key_terms: [{ term: 'Converse', definition_md: 'The statement obtained by swapping the "if" part and the "then" part.' }, { term: 'Counterexample', definition_md: 'One example that shows a statement is false.' }], formulas: [], visual: tProp, visuals: [], topic_ids: [topic(4)] },
    { heading: '6. Why SSA fails', body_md: r`Two sides and an angle that is **not** between them (SSA) do not prove congruence. With $\angle A = 45^\circ$, $AB = 4\sqrt{2}$ cm and $BC = 5$ cm, the point $C$ can be $1$ cm or $7$ cm from $A$ along the ray: two different triangles. For some data there is one triangle or none. When the angle is a right angle, the data does fix the triangle: this is RHS.`, key_terms: [{ term: 'SSA', definition_md: 'Two sides and a non-included angle: not a congruence test.' }], formulas: [], visual: fSSA, visuals: [fSSA2, tSSA, tSSAcases], topic_ids: [topic(4)] },
  ],
  exam_tips_md: r`**How marks are awarded**\n- *Congruence proofs (3 marks):* three equal pairs with reasons, the test, the conclusion.\n- *Isosceles problems (2 marks):* equal angles opposite equal sides, then the angle sum.\n- *Converse questions (2 marks):* write the converse, then true or a counterexample.\n\n**Common mistakes**\n1. Using an angle that is not between the two sides for SAS.\n2. Writing the triangles in the wrong order in the congruence statement.\n3. Using SSA as a test.\n4. Forgetting that a common side is equal to itself.\n5. Calling a converse true because one example works.`,
  status: 'draft', provenance: d1.provenance,
};

const fcard = (id, front_md, back_md, tag, t) => ({ id, front_md, back_md, tag, topic_id: topic(t) });
const flashcards = {
  unit: 'cbse-9-mathematics-ch09', version: 1, language: 'en',
  cards: [
    fcard('f01', 'Why is a triangle called rigid?', 'Three given side lengths make only one triangle, so its shape cannot change unless a bar bends or breaks.', 'concept', 1),
    fcard('f02', 'Why does a four-bar frame wobble?', 'The same four bar lengths can make many 4-gons, so the corners can lean over.', 'concept', 1),
    fcard('f03', 'How do you make a four-bar frame rigid?', 'Add a diagonal brace: it splits the frame into two triangles.', 'fact', 1),
    fcard('f04', 'Name three structures that use triangles.', 'A bridge truss, a roof frame and an electricity tower (also a braced stool).', 'fact', 1),
    fcard('f05', 'How many diagonals from one corner make a frame with $n$ sides rigid?', r`$n - 3$ diagonals.`, 'formula', 1),
    fcard('f06', 'What are congruent triangles?', 'Triangles that fit exactly on each other: same shape and same size.', 'definition', 2),
    fcard('f07', r`What does $\triangle ABC \cong \triangle PQR$ tell you about the letters?`, r`$A \leftrightarrow P$, $B \leftrightarrow Q$, $C \leftrightarrow R$: the order matters.`, 'concept', 2),
    fcard('f08', 'What does CPCT stand for?', 'Corresponding parts of congruent triangles are equal.', 'definition', 2),
    fcard('f09', 'When can you use CPCT?', 'Only after the triangles have been proved congruent.', 'exam-tip', 2),
    fcard('f10', 'State the SAS test.', 'Two sides and the angle between them are equal to two sides and the angle between them in another triangle.', 'fact', 2),
    fcard('f11', 'State the SSS test.', 'The three sides of one triangle equal the three sides of another.', 'fact', 2),
    fcard('f12', 'State the ASA test.', 'Two angles and the side between them are equal to two angles and the side between them in another triangle.', 'fact', 2),
    fcard('f13', 'State the AAS test.', 'Two angles and a side that is not between them are equal in both triangles.', 'fact', 2),
    fcard('f14', 'Why does AAS work?', r`The angles of a triangle add up to $180^\circ$, so the third angles are equal and AAS becomes ASA.`, 'concept', 2),
    fcard('f15', 'State the RHS test.', 'Two right-angled triangles with equal hypotenuses and one other equal side are congruent.', 'fact', 2),
    fcard('f16', 'What is the hypotenuse?', 'The side opposite the right angle of a right-angled triangle.', 'definition', 2),
    fcard('f17', 'What is the included angle?', 'The angle between the two given sides.', 'definition', 2),
    fcard('f18', 'What are the reasons you may give for equal parts?', 'Given, common side, vertically opposite angles, bisector, or an earlier result.', 'exam-tip', 2),
    fcard('f19', 'What is an isosceles triangle?', 'A triangle with two equal sides, called the legs.', 'definition', 3),
    fcard('f20', 'What are the base angles?', 'The angles at the two ends of the base, opposite the equal sides.', 'definition', 3),
    fcard('f21', 'State the isosceles triangle theorem.', 'If two sides of a triangle are equal, the angles opposite them are equal.', 'fact', 3),
    fcard('f22', 'How is the isosceles theorem proved?', 'Draw the bisector of the apex angle and use SAS, then CPCT.', 'concept', 3),
    fcard('f23', 'State the converse of the isosceles theorem.', 'If two angles of a triangle are equal, the sides opposite them are equal.', 'fact', 3),
    fcard('f24', 'Which test proves the converse?', 'AAS, using the bisector of the angle at the apex.', 'concept', 3),
    fcard('f25', 'What is each angle of an equilateral triangle?', r`$60^\circ$, because the three equal angles add up to $180^\circ$.`, 'fact', 3),
    fcard('f26', 'What is a proposition?', 'A statement that is either true or false.', 'definition', 4),
    fcard('f27', r`What is the converse of "if $P$ then $Q$"?`, r`"If $Q$ then $P$".`, 'definition', 4),
    fcard('f28', 'Is the converse of a true statement always true?', 'No. It may be true or false; one counterexample shows that it is false.', 'exam-tip', 4),
    fcard('f29', 'Why is SSA not a congruence test?', 'The same two sides and non-included angle can make two different triangles.', 'concept', 4),
    fcard('f30', 'When does the SSA data fix the triangle?', 'When the angle is a right angle: this is RHS.', 'fact', 4),
  ],
  status: 'draft', provenance: d1.provenance,
};

const release = {
  unit: 'cbse-9-mathematics-ch09', version: 1, academic_year: '2026-27', created_at: '2026-11-05T00:00:00+05:30',
  decks: [d1, d2], notes, flashcards, questions: [],
  build: { run_id: null, checks: { syllabus: 't01 rigidity of triangles and its use in structures (bridge trusses, roof frames, a braced stool, a wobbling 4-gon frame); t02 congruence, correspondence and CPCT, and the criteria SAS, SSS, ASA, AAS and RHS with proofs; t03 the isosceles triangle theorem and its converse, equilateral triangles; t04 propositions and converses, and why SSA fails (two non-congruent triangles with the same SSA data, computed and drawn). Inequalities in triangles are not in the syllabus and are left out.', self_checks: 'every figure is drawn from computed coordinates and asserted (equal sides and angles of the congruent copies, SSA lengths 1 and 7, equal altitudes); every table number is computed; the criterion shown for each set of equal parts is decided by a classifier in g.mjs; every angle-chasing and length answer in the item banks is recomputed from the givens' } },
};
const tests = chapterTests('Triangles – Congruence Theorems', {
  A: ['m07', 'm10', 'm14', 'ar1'],
  B: ['s201', 's204', 's301'],
  C: ['l01', 'l03'],
  D: ['c01'],
}, {
  A: ['m08', 'm09', 'm11', 'm12', 'm13', 'm15', 'm16', 'm18', 'ar2', 'ar3'],
  B: ['s202', 's205', ['s203', 's206'], 's302', ['s303', 's304']],
  C: ['l02', ['l04', 'l05']],
  D: ['c02', 'c03'],
});
build({ dir: DIR, release, testsSpec: tests });
