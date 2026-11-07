// Build CBSE 9 Mathematics ch10 4-gons (Quadrilaterals). Run from platform/:
//   npx tsx content/_stage/maths/cbse-9-mathematics-ch10/src/build.mjs
// Every figure is drawn from computed coordinates (figs.mjs, asserted there); every property in a table or a worked example is
// computed here from coordinates with classify() and symmetries() (q.mjs) and asserted.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, topic, deck, sl, table, flow, build, chapterTests } from './lib.mjs';
import { r, must, close, range, dist, angleAt, polar } from './h.mjs';
import { classify, symmetries, varignon, polyArea, mid, add } from './q.mjs';
import { f4Types, fQuad, fAngleSum, fPar, fParDiag, fRhRect, fParNum, fBisect, fMid, fMidProof, fConv, fMedial, fMedians, fMedProof, fVar, fVar2, fSym, fRot, fTile, classOf } from './figs.mjs';

setUnit('cbse-9-mathematics-ch10', 'claude-sonnet-5-5 (writer); reviewed by claude-opus-5-5 (subject-producer)');
await import('./questions.mjs');
await import('./questions2.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const yn = (b) => (b ? 'Yes' : 'No');

// ================================================================ tables and flows, deck 1
const goalFlow1 = flow('LR', [['a', 'What a 4-gon is'], ['b', 'Types of 4-gon'], ['c', 'Parallelogram properties'], ['d', 'Tests for a parallelogram']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow of Part 1: what a 4-gon is and its angle sum, the types of 4-gon, the properties of a parallelogram, and the tests that show a 4-gon is a parallelogram.', 'Part 1 road map.');

const c = classOf;
must(c.par.oppSidesEqual && c.par.oppAnglesEqual && c.par.diagBisect && c.rho.diag.perpendicular && c.rec.diag.equal && c.sq.diag.perpendicular && c.sq.diag.equal && c.kite.diag.perpendicular && !c.kite.diagBisect, 'properties of the sample shapes');
const tTypes = table(['Type', 'Defining property', 'Other properties'], [
  ['Trapezium', 'At least one pair of parallel sides', 'The other two sides need not be parallel'],
  ['Parallelogram', 'Both pairs of opposite sides parallel', 'Opposite sides equal, opposite angles equal, diagonals bisect each other'],
  ['Rhombus', 'A parallelogram with four equal sides', 'Diagonals are perpendicular'],
  ['Rectangle', 'A 4-gon with four right angles', 'It is a parallelogram; the diagonals are equal'],
  ['Square', 'Four equal sides and four right angles', 'Both a rhombus and a rectangle'],
  ['Kite', 'Two pairs of equal adjacent sides', 'Diagonals are perpendicular; one diagonal is a line of symmetry'],
], 'Table of six types of 4-gon with their defining property and other properties: trapezium, parallelogram, rhombus, rectangle, square and kite.', 'Each type is defined by one property; the others follow from it.');
// the hierarchy: every square is a rhombus, a rectangle, a parallelogram and a trapezium
must(c.sq.rhombus && c.sq.rectangle && c.sq.parallelogram && c.sq.trapezium && c.rho.parallelogram && c.rec.parallelogram && c.par.trapezium && !c.kite.parallelogram, 'hierarchy');
const hier = flow('TB', [['q', '4-gon'], ['t', 'Trapezium'], ['k', 'Kite'], ['p', 'Parallelogram'], ['rh', 'Rhombus'], ['re', 'Rectangle'], ['s', 'Square']], [['q', 't'], ['q', 'k'], ['t', 'p'], ['p', 'rh'], ['p', 're'], ['rh', 's'], ['re', 's']], 'Chart of how the types of 4-gon are related: a trapezium is a special 4-gon, a parallelogram is a special trapezium, a rhombus and a rectangle are special parallelograms, a square is a special rhombus and a special rectangle, and a kite is a separate special 4-gon.', 'An arrow means "is a special case of".');

const pc = classOf.par;
const tParProof = table(['Step', 'Statement', 'Reason'], [
  ['1', r`$ABCD$ is a parallelogram: $AB \parallel DC$ and $AD \parallel BC$. Join the diagonal $AC$`, 'Given; construction'],
  ['2', r`$\angle DAC = \angle ACB$`, r`Alternate angles, $AD \parallel BC$`],
  ['3', r`$\angle BAC = \angle ACD$`, r`Alternate angles, $AB \parallel DC$`],
  ['4', r`$AC = CA$`, 'Common side'],
  ['5', r`$\triangle ABC \cong \triangle CDA$`, 'ASA: steps 2, 3 and 4'],
  ['6', r`$AB = CD$, $BC = DA$ and $\angle B = \angle D$`, 'CPCT'],
  ['7', r`$\angle A = \angle DAC + \angle BAC = \angle ACB + \angle ACD = \angle C$`, 'Adding steps 2 and 3'],
], 'Table: proof that opposite sides and opposite angles of a parallelogram are equal. Join the diagonal AC; the alternate angles DAC and ACB are equal and BAC and ACD are equal, AC is common, so triangles ABC and CDA are congruent by ASA. Then AB equals CD, BC equals DA and angle B equals angle D, and adding the equal angles at A and C gives angle A equals angle C.', 'The diagonal splits the parallelogram into two congruent triangles.');
const dPO = fParDiagNumbers();
function fParDiagNumbers() {
  const A = [0, 0], B = [7, 0], D = polar(A, 3.2, 52), C = add(B, D), O = mid(A, C);
  must(close(dist(A, O), dist(O, C)) && close(dist(B, O), dist(O, D)) && close(dist(A, B), dist(D, C)), 'diagonals bisect');
  return { AO: dist(A, O), BO: dist(B, O), AB: dist(A, B) };
}
const tDiagProof = table(['Step', 'Statement', 'Reason'], [
  ['1', r`In $\triangle AOB$ and $\triangle COD$: $\angle OAB = \angle OCD$`, r`Alternate angles, $AB \parallel DC$`],
  ['2', r`$AB = CD$`, 'Opposite sides of a parallelogram'],
  ['3', r`$\angle OBA = \angle ODC$`, r`Alternate angles, $AB \parallel DC$`],
  ['4', r`$\triangle AOB \cong \triangle COD$`, 'ASA: steps 1, 2 and 3'],
  ['5', r`$OA = OC$ and $OB = OD$`, 'CPCT'],
  ['Check', r`$AB = 7$ cm and $AO = OC \approx ${dPO.AO.toFixed(2)}$ cm in the figure`, 'Computed from the coordinates'],
], 'Table: proof that the diagonals of a parallelogram bisect each other. In triangles AOB and COD the alternate angles OAB and OCD are equal, AB equals CD, and the alternate angles OBA and ODC are equal, so the triangles are congruent by ASA and OA equals OC and OB equals OD.', 'The triangles AOB and COD are congruent.');

const isoTrap = [[0, 0], [6, 0], [5, 2], [1, 2]], cIso = classify(isoTrap);
must(close(cIso.sides[1], cIso.sides[3]) && !cIso.parallelogram && cIso.trapezium, 'isosceles trapezium: a pair of equal opposite sides but not a parallelogram');
const tTests = table(['If a 4-gon has...', 'Idea of the proof', 'Parallelogram?'], [
  ['Both pairs of opposite sides equal', 'A diagonal makes two congruent triangles (SSS), so alternate angles are equal', 'Yes'],
  ['Both pairs of opposite angles equal', r`The angles add up to $360^\circ$, so $\angle A + \angle B = 180^\circ$ and $AD \parallel BC$`, 'Yes'],
  ['Diagonals that bisect each other', 'Two pairs of congruent triangles (SAS), so alternate angles are equal', 'Yes'],
  ['One pair of opposite sides equal and parallel', 'A diagonal makes two congruent triangles (SAS), so the other pair is parallel', 'Yes'],
  ['Only one pair of opposite sides equal', r`An isosceles trapezium has equal legs but is not a parallelogram`, 'No'],
], 'Table of tests for a parallelogram: both pairs of opposite sides equal, both pairs of opposite angles equal, diagonals that bisect each other, and one pair of opposite sides equal and parallel all give a parallelogram; only one pair of opposite sides equal does not, as an isosceles trapezium shows.', 'The converses of the parallelogram properties are tests.');

const pr = (s) => (s ? 'Yes' : 'No');
const tSpecial = table(['Property', 'Parallelogram', 'Rhombus', 'Rectangle', 'Square'], [
  ['Opposite sides equal', ...[c.par, c.rho, c.rec, c.sq].map((x) => pr(x.oppSidesEqual))],
  ['Diagonals bisect each other', ...[c.par, c.rho, c.rec, c.sq].map((x) => pr(x.diagBisect))],
  ['Diagonals equal', ...[c.par, c.rho, c.rec, c.sq].map((x) => pr(x.diag.equal))],
  ['Diagonals perpendicular', ...[c.par, c.rho, c.rec, c.sq].map((x) => pr(x.diag.perpendicular))],
  ['Four equal sides', ...[c.par, c.rho, c.rec, c.sq].map((x) => pr(x.rhombus))],
  ['Four right angles', ...[c.par, c.rho, c.rec, c.sq].map((x) => pr(x.rectangle))],
], 'Table comparing a parallelogram, a rhombus, a rectangle and a square: all have opposite sides equal and diagonals that bisect each other; diagonals are equal for a rectangle and a square; diagonals are perpendicular for a rhombus and a square; four equal sides for a rhombus and a square; four right angles for a rectangle and a square.', 'Which properties hold for which type.');
must(c.rho.diag.perpendicular && !c.rho.diag.equal && c.rec.diag.equal && !c.rec.diag.perpendicular && !c.par.diag.equal && !c.par.diag.perpendicular, 'special parallelograms table');

const xs = range(1, 60).filter((x) => 2 * x + 20 + 3 * x - 10 === 180);
must(xs.join() === '34' && 2 * 34 + 20 === 88 && 3 * 34 - 10 === 92 && 88 + 92 === 180, 'parallelogram angles x = 34');
const tWE1 = table(['Step', 'Work', 'Result'], [
  ['Adjacent angles add up to $180^\\circ$', r`$(2x + 20) + (3x - 10) = 180$`, r`$5x + 10 = 180$, so $x = 34$`],
  [r`$\angle A$ and $\angle B$`, r`$2 \times 34 + 20$ and $3 \times 34 - 10$`, r`$88^\circ$ and $92^\circ$`],
  [r`$\angle C$ and $\angle D$ (opposite angles)`, r`$\angle C = \angle A$, $\angle D = \angle B$`, r`$88^\circ$ and $92^\circ$`],
], 'Table: for a parallelogram ABCD with angle A equal to 2x plus 20 and angle B equal to 3x minus 10, adjacent angles add up to 180, so 5x plus 10 is 180 and x is 34; angle A is 88 and angle B is 92, and the opposite angles C and D are 88 and 92 degrees.', 'Adjacent angles of a parallelogram are supplementary.');

const wAB = dist(polar([0, 0], 3.5, 190), polar([0, 0], 2.5, 80)), wBC = dist(polar([0, 0], 2.5, 80), polar([0, 0], 3.5, 10));
must(close(wAB, dist(polar([0, 0], 3.5, 10), polar([0, 0], 2.5, 260))) && close(wBC, dist(polar([0, 0], 3.5, 190), polar([0, 0], 2.5, 260))), 'the opposite sides computed from the diagonals');
const tWE2 = table(['Step', 'Statement', 'Reason'], [
  ['1', r`$OA = OC$ and $OB = OD$`, 'Given'],
  ['2', r`$\angle AOB = \angle COD$`, 'Vertically opposite angles'],
  ['3', r`$\triangle AOB \cong \triangle COD$`, 'SAS: steps 1 and 2'],
  ['4', r`$\angle OAB = \angle OCD$, so $AB \parallel DC$`, 'CPCT; alternate angles are equal'],
  ['5', r`In the same way $\triangle AOD \cong \triangle COB$, so $AD \parallel BC$`, 'SAS and CPCT'],
  ['6', r`$ABCD$ is a parallelogram`, 'Both pairs of opposite sides are parallel'],
  ['Check', r`$AB = CD \approx ${wAB.toFixed(2)}$ cm and $BC = DA \approx ${wBC.toFixed(2)}$ cm`, 'Computed from the diagonals of the figure'],
], 'Table: proof that a 4-gon whose diagonals bisect each other is a parallelogram. The vertically opposite angles at O are equal, so triangles AOB and COD are congruent by SAS and AB is parallel to DC; in the same way AD is parallel to BC.', 'Diagonals that bisect each other give a parallelogram.');
const sum1 = flow('LR', [['a', 'Angles of a 4-gon add up to 360'], ['b', 'Types: trapezium to square'], ['c', 'Parallelogram: sides, angles, diagonals'], ['d', 'Converses are tests']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Summary flow of Part 1: the angles of a 4-gon add up to 360 degrees, the types of 4-gon from trapezium to square, the properties of a parallelogram, and the converses used as tests.', 'The story of Part 1.');

// ================================================================ deck 1
const d1 = deck({
  part: 1,
  title: '4-gons (Quadrilaterals): Part 1, types of 4-gon and the parallelogram',
  goals: ['Define a 4-gon and prove that its angles add up to 360 degrees', 'Name the types of 4-gon and say how they are related', 'Prove the properties of a parallelogram', 'Use the converses as tests for a parallelogram'],
  slides: [
    sl('title', 'Four sides, many shapes', { b: 'A book, a window, a kite in the sky: each has **four sides**. A figure with four sides is a **4-gon** (also called a quadrilateral). In this chapter we sort 4-gons into types and prove their properties.', v: f4Types, n: `Look around a classroom. The page of a book is a rectangle, a window frame is a rectangle too, and a kite flying outside has quite another shape. All of these have four sides. A figure with four sides is called a four-gon, or a quadrilateral. In this chapter we sort four sided figures into types, and we find out which properties each type has and why.` }),
    sl('concept', 'What you will be able to do', { ul: ['Define a **4-gon** and prove its **angle sum** is $360^\\circ$', 'Name the types: **trapezium, parallelogram, rhombus, rectangle, square, kite**', 'Prove the **properties of a parallelogram**', 'Use the **converses** as tests'], v: goalFlow1, n: `In this part we define a four-gon and its parts, and we prove that its angles add up to three hundred sixty degrees. We learn the names of the main types, and how they are related. Then we prove properties of a parallelogram, such as equal opposite sides and diagonals that bisect each other, and we learn the tests that tell us a four-gon is a parallelogram.` }),
    sl('diagram', 'What is a 4-gon?', { b: r`A **4-gon** $ABCD$ has four **vertices** and four **sides** $AB$, $BC$, $CD$, $DA$, joined in order. Sides that meet are **adjacent**; sides that do not meet are **opposite**. A segment joining opposite vertices is a **diagonal**: $AC$ and $BD$.`, v: fQuad, n: `A four-gon has four vertices and four sides, joined in order. We name it by its vertices going round, like A B C D. Sides that meet at a vertex are adjacent, and sides that do not meet are opposite. A segment joining two opposite vertices is a diagonal, and a four-gon has two diagonals, which are dashed in the figure.` }),
    sl('diagram', 'The angles of a 4-gon add up to 360 degrees', { b: r`The diagonal $AC$ splits $ABCD$ into two triangles, each with angle sum $180^\circ$. Together their angles make the four angles of the 4-gon, so the sum is $2 \times 180^\circ = 360^\circ$. Check: $80 + 95 + 70 + 115 = 360$.`, v: fAngleSum, n: `Draw the diagonal A C. It splits the four-gon into two triangles, A B C and A C D. The angles of each triangle add up to one hundred eighty degrees. The angles of the two triangles together make up exactly the four angles of the four-gon. So the angles of a four-gon add up to three hundred sixty degrees. In the figure, eighty, ninety-five, seventy and one hundred fifteen make three hundred sixty.` }),
    sl('concept', 'Types of 4-gon', { b: 'Each type is defined by **one** property. The other properties follow from it.', v: tTypes, n: `Here are the main types. A trapezium has at least one pair of parallel sides. A parallelogram has both pairs of opposite sides parallel. A rhombus is a parallelogram with four equal sides, and a rectangle is a four-gon with four right angles. A square is both. A kite has two pairs of equal adjacent sides. Notice that every square is a rectangle, and every rectangle is a parallelogram.` }),
    sl('diagram', 'How the types are related', { b: r`An arrow means "is a special case of". Every **square** is a rhombus and a rectangle; every **rhombus** and **rectangle** is a parallelogram; every **parallelogram** is a trapezium. A **kite** is not a parallelogram in general.`, v: hier, n: `This chart shows how the types are related. An arrow means is a special case of. A parallelogram is a special trapezium. A rhombus and a rectangle are special parallelograms, and a square is a special rhombus and a special rectangle. A kite is not a parallelogram in general, because its opposite sides are not parallel.` }),
    sl('check', 'Quick check: name the type', { b: 'A 4-gon has two pairs of equal adjacent sides, but its opposite sides are not parallel. What is it?', v: f4Types, chk: 'm01', n: `Think about which type has equal adjacent sides.` }),
    sl('diagram', 'The parallelogram and its diagonal', { b: r`In a **parallelogram** $AB \parallel DC$ and $AD \parallel BC$. The diagonal $AC$ makes **alternate angles** equal: $\angle DAC = \angle ACB$ and $\angle BAC = \angle ACD$.`, v: fPar, n: `In a parallelogram both pairs of opposite sides are parallel, shown by the arrows. Draw the diagonal A C. Because A D is parallel to B C, the angles D A C and A C B are alternate angles and are equal. Because A B is parallel to D C, the angles B A C and A C D are alternate angles and are equal. These equal angles will help us prove the main properties.` }),
    sl('concept', 'Opposite sides and angles are equal', { b: r`**Theorem:** in a parallelogram, opposite sides are equal and opposite angles are equal. The proof uses the congruent triangles $ABC$ and $CDA$.`, v: tParProof, n: `Theorem: in a parallelogram, opposite sides are equal and opposite angles are equal. The triangles A B C and C D A have two equal angles and the common side A C between them, so they are congruent by angle side angle. By corresponding parts, A B equals C D, and B C equals D A. Adding the two pairs of equal angles at A and C shows that the angle A equals the angle C.` }),
    sl('diagram', 'The diagonals bisect each other', { b: r`**Theorem:** the diagonals of a parallelogram bisect each other. In $\triangle AOB$ and $\triangle COD$ two angles and the side between them are equal (ASA), so $OA = OC$ and $OB = OD$.`, v: fParDiag, m: [r`OA = OC, \quad OB = OD`], n: `Theorem: the diagonals of a parallelogram bisect each other. Look at triangles A O B and C O D. The angles O A B and O C D are alternate angles, so they are equal. The angles O B A and O D C are alternate angles too. And A B equals C D, because opposite sides are equal. So the triangles are congruent by angle side angle, and O A equals O C, and O B equals O D.` }),
    sl('concept', 'The proof in steps', { b: r`The full proof, with a reason for every step. Check: in the figure $AB = 7$ cm.`, v: tDiagProof, n: `Here is the proof written step by step. First the alternate angles at A and C are equal, because A B is parallel to D C. Then A B equals C D, as opposite sides of a parallelogram. The alternate angles at B and D are equal. Angle side angle then gives congruent triangles, and the corresponding parts O A and O C are equal, and so are O B and O D.` }),
    sl('check', 'Quick check: the diagonals', { b: 'In a parallelogram $ABCD$ the diagonals meet at $O$ and $OA = 6.5$ cm. How long is the diagonal $AC$?', v: fParDiag, chk: 'm02', n: `Remember that the diagonals bisect each other.` }),
    sl('concept', 'The converses: tests for a parallelogram', { b: 'Each property has a **converse**, and the converses are true. They give **tests** that show a 4-gon is a parallelogram. But **one** pair of equal opposite sides is **not** enough.', v: tTests, n: `The converses are also true, and they give us tests. A four-gon is a parallelogram if both pairs of opposite sides are equal. It is a parallelogram if both pairs of opposite angles are equal. It is a parallelogram if its diagonals bisect each other. And it is a parallelogram if one pair of opposite sides is both equal and parallel. But one pair of equal opposite sides alone is not enough.` }),
    sl('diagram', 'Rhombus, rectangle and square', { b: r`The diagonals of a **rhombus** are perpendicular: with diagonals $8$ cm and $6$ cm the side is $\sqrt{4^2 + 3^2} = 5$ cm. The diagonals of a **rectangle** are equal: for $8$ cm by $6$ cm each is $10$ cm. A **square** has both properties.`, v: fRhRect, n: `Rhombus and rectangle have extra properties. The diagonals of a rhombus are perpendicular, and in the figure the diagonals of eight and six centimetres meet at right angles, so the side is five centimetres. The diagonals of a rectangle are equal, and for a rectangle of eight by six centimetres each diagonal is ten centimetres. A square has both properties.` }),
    sl('concept', 'Which property for which type?', { b: 'A table to compare the four special 4-gons. Every row is checked on a drawing.', v: tSpecial, n: `This table compares a parallelogram, a rhombus, a rectangle and a square. All four have equal opposite sides and diagonals that bisect each other. The diagonals are equal for a rectangle and a square. The diagonals are perpendicular for a rhombus and a square. A rhombus and a square have four equal sides, and a rectangle and a square have four right angles.` }),
    sl('example', 'Worked example 1: angles of a parallelogram', { b: r`In a parallelogram $ABCD$, $\angle A = (2x + 20)^\circ$ and $\angle B = (3x - 10)^\circ$. Find $x$ and all four angles.`, ul: [r`**Adjacent angles —** they add up to $180^\circ$: $5x + 10 = 180$, so $x = 34$`, r`**$\angle A$ and $\angle B$ —** $88^\circ$ and $92^\circ$`, r`**Opposite angles are equal —** $\angle C = 88^\circ$, $\angle D = 92^\circ$`], v: fParNum, n: `In a parallelogram A B C D the angle A is two x plus twenty and the angle B is three x minus ten degrees. Adjacent angles of a parallelogram add up to one hundred eighty degrees. So five x plus ten equals one hundred eighty, and x is thirty-four. The angle A is eighty-eight degrees, the angle B is ninety-two degrees, and the opposite angles are equal to these.` }),
    sl('example', 'Worked example 2: a 4-gon whose diagonals bisect each other', { b: r`In a 4-gon $ABCD$ the diagonals meet at $O$, with $OA = OC = 3.5$ cm and $OB = OD = 2.5$ cm. Prove that $ABCD$ is a parallelogram.`, ul: [r`**Vertically opposite angles —** $\angle AOB = \angle COD$`, r`**SAS —** $\triangle AOB \cong \triangle COD$, so $\angle OAB = \angle OCD$ and $AB \parallel DC$`, r`**Same for the other pair —** $AD \parallel BC$, so $ABCD$ is a parallelogram`], v: fBisect, n: `In a four-gon A B C D the diagonals meet at O, with O A equal to O C, and O B equal to O D. The angles A O B and C O D are vertically opposite, so the triangles A O B and C O D are congruent by side angle side. So the alternate angles O A B and O C D are equal, and A B is parallel to D C. In the same way A D is parallel to B C.` }),
    sl('check', 'Quick check: not enough', { b: 'Which condition does **not** guarantee that a 4-gon is a parallelogram?', v: tTests, chk: 'm03', n: `Recall the isosceles trapezium.` }),
    sl('summary', 'Summary', { ul: [r`A **4-gon** has four vertices, four sides and two diagonals; its angles add up to $360^\circ$`, '**Types:** trapezium, parallelogram, rhombus, rectangle, square, kite; a square is a rhombus and a rectangle', 'In a **parallelogram** opposite sides and angles are equal and the diagonals bisect each other', '**Tests:** both pairs of opposite sides equal, both pairs of opposite angles equal, diagonals bisect each other, or one pair of opposite sides equal and parallel'], v: sum1, n: `To sum up. A four-gon has four vertices, four sides and two diagonals, and its angles add up to three hundred sixty degrees. The types are trapezium, parallelogram, rhombus, rectangle, square and kite. In a parallelogram opposite sides and opposite angles are equal and the diagonals bisect each other. The converses give tests that show a four-gon is a parallelogram.` }),
    sl('exam-tips', 'Exam tips: how marks are awarded', { ul: ['**Proofs (3 marks):** draw the diagonal, show the congruent triangles with reasons, then use CPCT', '**Angle problems (2 marks):** write the equation from the property, solve, then state all angles', '**Mistake:** saying a 4-gon is a parallelogram because one pair of opposite sides is equal', '**Mistake:** mixing up the diagonal properties of a rhombus and a rectangle'], v: tSpecial, n: `In proofs, draw the diagonal, show the congruent triangles with a reason for each pair of equal parts, and then use corresponding parts. In angle problems, write an equation from the property, solve it, and state all the angles. Two common slips are saying a four-gon is a parallelogram because only one pair of opposite sides is equal, and mixing up the diagonal properties of a rhombus and a rectangle.` }),
  ],
});

// ================================================================ tables and flows, deck 2
const goalFlow2 = flow('LR', [['a', 'Midpoint theorem'], ['b', 'Medians are concurrent'], ['c', 'Midpoints of a 4-gon'], ['d', 'Symmetry and tiling']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow of Part 2: the midpoint theorem and its converse, the concurrency of the medians, the parallelogram formed by the midpoints of a 4-gon, and symmetry and tiling.', 'Part 2 road map.');
const tMidProof = table(['Step', 'Statement', 'Reason'], [
  ['1', r`$D$, $E$ are midpoints of $AB$, $AC$. Extend $DE$ to $F$ so that $EF = DE$ and join $CF$`, 'Construction'],
  ['2', r`$AE = EC$ and $DE = EF$`, 'Midpoint; construction'],
  ['3', r`$\angle AED = \angle CEF$`, 'Vertically opposite angles'],
  ['4', r`$\triangle AED \cong \triangle CEF$`, 'SAS'],
  ['5', r`$CF = AD = BD$ and $CF \parallel AB$`, 'CPCT; alternate angles $\\angle ADE = \\angle CFE$ are equal'],
  ['6', r`$BDFC$ is a parallelogram`, 'One pair of opposite sides ($BD$ and $CF$) equal and parallel'],
  ['7', r`$DF \parallel BC$ and $DF = BC$`, 'Opposite sides of a parallelogram'],
  ['8', r`$DE \parallel BC$ and $DE = \frac12 DF = \frac12 BC$`, '$E$ is the midpoint of $DF$'],
  ['Check', r`$DE = 4$ cm and $BC = 8$ cm in the figure`, 'Computed from the coordinates'],
], 'Table: proof of the midpoint theorem. Extend DE to F with EF equal to DE and join CF. Triangles AED and CEF are congruent by SAS, so CF equals AD which equals BD, and CF is parallel to AB. So BDFC is a parallelogram, DF is parallel and equal to BC, and DE is half of DF.', 'The proof builds a parallelogram.');
const mcE = (() => { const A = [2, 6], B = [0, 0], C = [9, 0], D = mid(A, B); const t = (D[1] - A[1]) / (C[1] - A[1]); return [A[0] + t * (C[0] - A[0]), D[1]]; })();
must(close(dist([2, 6], mcE), dist(mcE, [9, 0])) && close(dist([2, 6], mcE), Math.hypot(3.5, 3)), 'AE = EC = sqrt(3.5^2 + 3^2)');
const tConvProof = table(['Step', 'Statement', 'Reason'], [
  ['1', r`$D$ is the midpoint of $AB$, $DE \parallel BC$ and $E$ is on $AC$. Let $E'$ be the midpoint of $AC$`, 'Given; construction'],
  ['2', r`$DE' \parallel BC$`, 'Midpoint theorem in $\\triangle ABC$'],
  ['3', r`$DE$ and $DE'$ are lines through $D$ parallel to $BC$`, 'Steps 1 and 2'],
  ['4', r`$E = E'$`, 'Only one line through $D$ is parallel to $BC$'],
  ['5', r`$AE = EC$`, '$E$ is the midpoint of $AC$'],
  ['Check', r`$AE = EC \approx ${Math.hypot(3.5, 3).toFixed(2)}$ cm in the figure`, 'Computed from the coordinates'],
], 'Table: proof of the converse of the midpoint theorem. Let E prime be the midpoint of AC. By the midpoint theorem DE prime is parallel to BC. There is only one line through D parallel to BC, so E and E prime are the same point and AE equals EC.', 'Uniqueness of the parallel line.');
const medSides = [[12, 6], [14, 7], [10, 5]];
must(medSides.every(([a, b]) => a / 2 === b) && 12 + 14 + 10 === 36 && 6 + 7 + 5 === 18, 'medial triangle');
const tMedial = table(['Side of $\\triangle ABC$', 'Length', 'Parallel side of $\\triangle DEF$', 'Length'], [
  ['$BC$', '$12$ cm', '$EF$', '$6$ cm'], ['$CA$', '$14$ cm', '$FD$', '$7$ cm'], ['$AB$', '$10$ cm', '$DE$', '$5$ cm'], ['Perimeter', '$36$ cm', 'Perimeter', '$18$ cm'],
], 'Table: the sides BC, CA and AB of 12, 14 and 10 centimetres, and the parallel sides EF, FD and DE of the triangle of midpoints, which are 6, 7 and 5 centimetres; the perimeters are 36 and 18 centimetres.', 'Each side of the midpoint triangle is half of the parallel side.');
const tMedProof = table(['Step', 'Statement', 'Reason'], [
  ['1', r`The medians $BE$ and $CF$ meet at $G$. $P$, $Q$ are the midpoints of $GB$, $GC$`, 'Construction'],
  ['2', r`$FE \parallel BC$ and $FE = \frac12 BC$`, r`Midpoint theorem in $\triangle ABC$`],
  ['3', r`$PQ \parallel BC$ and $PQ = \frac12 BC$`, r`Midpoint theorem in $\triangle GBC$`],
  ['4', r`$FE \parallel PQ$ and $FE = PQ$, so $FEQP$ is a parallelogram`, 'One pair of opposite sides equal and parallel'],
  ['5', r`The diagonals $EP$ and $FQ$ bisect each other at $G$, so $EG = GP$`, 'They lie along the medians $BE$ and $CF$, which meet at $G$'],
  ['6', r`$BG = 2 \times GP = 2 \times GE$, and in the same way $CG = 2 \times GF$`, '$P$ is the midpoint of $GB$'],
  ['7', r`The third median $AD$ meets $BE$ at the point that divides $BE$ in the ratio $2 : 1$, which is $G$`, 'There is only one such point on $BE$'],
], 'Table: proof that the medians of a triangle are concurrent. Using the midpoint theorem in triangles ABC and GBC, FEQP is a parallelogram, whose diagonals bisect each other at G, so BG is twice GE. The same holds for CG and GF, and the third median must pass through the same point.', 'The medians meet at one point and divide each other 2 : 1.');
const gdist = [dist([0, 0], [11 / 3, 2]), dist([11 / 3, 2], [5.5, 3])];
must(close(gdist[0], 2 * gdist[1]) && gdist[0].toFixed(2) === '4.18' && gdist[1].toFixed(2) === '2.09', 'BG = 2 GE: 4.18 and 2.09');
const Vq = [[0, 0], [7, 1], [6, 5.5], [1, 4]], [vp, vq, vr, vs] = varignon(Vq);
must(close(dist(vp, vq), dist(Vq[0], Vq[2]) / 2) && dist(Vq[0], Vq[2]).toFixed(2) === '8.14' && dist(vp, vq).toFixed(2) === '4.07', 'PQ = AC/2 = 4.07');
const tVarProof = table(['Step', 'Statement', 'Reason'], [
  ['1', r`$P$, $Q$, $R$, $S$ are the midpoints of $AB$, $BC$, $CD$, $DA$. Join $AC$`, 'Construction'],
  ['2', r`$PQ \parallel AC$ and $PQ = \frac12 AC$`, r`Midpoint theorem in $\triangle ABC$`],
  ['3', r`$SR \parallel AC$ and $SR = \frac12 AC$`, r`Midpoint theorem in $\triangle ADC$`],
  ['4', r`$PQ \parallel SR$ and $PQ = SR$`, 'Steps 2 and 3'],
  ['5', r`$PQRS$ is a parallelogram`, 'One pair of opposite sides equal and parallel'],
  ['Check', r`$AC \approx 8.14$ cm and $PQ = SR \approx 4.07$ cm in the figure`, 'Computed from the coordinates'],
], 'Table: proof that the midpoints of the sides of any 4-gon form a parallelogram. Join the diagonal AC. By the midpoint theorem in triangles ABC and ADC, PQ and SR are both parallel to AC and half of it, so they are parallel and equal, and PQRS is a parallelogram.', 'Midpoint theorem twice.');
const W2 = [[0, 0], [4, -2], [10, 0], [4, 4]], [wp, wq, wr, ws] = varignon(W2);
must(close(polyArea(W2), 30) && close(polyArea([wp, wq, wr, ws]), 15) && close(dist(wp, wq) + dist(wq, wr) + dist(wr, ws) + dist(ws, wp), 16), 'Varignon rectangle area 15, perimeter 16');
const tVarNums = table(['', 'Value', 'Why'], [
  ['Sides of $PQRS$ parallel to $AC$', r`$\frac12 \times 10 = 5$ cm`, 'Midpoint theorem'],
  ['Sides of $PQRS$ parallel to $BD$', r`$\frac12 \times 6 = 3$ cm`, 'Midpoint theorem'],
  ['Shape of $PQRS$', 'Rectangle', r`$AC \perp BD$, so the sides are perpendicular`],
  ['Perimeter of $PQRS$', r`$2(5 + 3) = 16$ cm`, 'Add the sides'],
  ['Area of $PQRS$', r`$5 \times 3 = 15$ cm$^2$`, r`Half of the area of $ABCD$, which is $\frac12 \times 10 \times 6 = 30$ cm$^2$`],
], 'Table for a 4-gon with diagonals 10 and 6 centimetres at right angles: the sides of the midpoint 4-gon are 5 and 3 centimetres, it is a rectangle, its perimeter is 16 centimetres and its area is 15 square centimetres, half of the 30 square centimetres of ABCD.', 'Numbers for the midpoint rectangle.');
// symmetry table
const symRows = [
  ['Trapezium (general)', classOf.trap && [[0, 0], [5, 0], [4, 2.2], [1.2, 2.2]]],
  ['Isosceles trapezium', isoTrap],
  ['Parallelogram', [[0, 0], [4.5, 0], [5.7, 2.2], [1.2, 2.2]]],
  ['Rhombus', [[0, 0], [3, 0], polar([3, 0], 3, 70), polar([0, 0], 3, 70)].map((p, i) => (i === 2 ? add([3, 0], polar([0, 0], 3, 70)) : p))],
  ['Rectangle', [[0, 0], [5, 0], [5, 2.5], [0, 2.5]]],
  ['Square', [[0, 0], [3, 0], [3, 3], [0, 3]]],
  ['Kite', [[0, 0], [1.7, 1.2], [0, 3.6], [-1.7, 1.2]]],
].map(([n, P]) => ({ n, s: symmetries(P) }));
const symOf = Object.fromEntries(symRows.map((x) => [x.n, x.s]));
must(symOf['Trapezium (general)'].lines === 0 && symOf['Isosceles trapezium'].lines === 1 && symOf['Parallelogram'].lines === 0 && symOf['Parallelogram'].order === 2 && symOf['Rhombus'].lines === 2 && symOf['Rhombus'].order === 2 && symOf['Rectangle'].lines === 2 && symOf['Square'].lines === 4 && symOf['Square'].order === 4 && symOf['Kite'].lines === 1 && symOf['Kite'].order === 1, 'symmetry table');
const tSym = table(['4-gon', 'Lines of symmetry', 'Order of rotational symmetry'], symRows.map((x) => [x.n, String(x.s.lines), String(x.s.order)]), 'Table of lines of symmetry and order of rotational symmetry: a general trapezium has 0 and 1, an isosceles trapezium 1 and 1, a parallelogram 0 and 2, a rhombus 2 and 2, a rectangle 2 and 2, a square 4 and 4, and a kite 1 and 1.', 'Counted by testing every reflection and rotation on the drawn shapes.');
const tTile = table(['Angle of the 4-gon', 'Size', 'Place at the meeting point'], [[r`$\angle A$`, r`$80^\circ$`, 'Copy 1'], [r`$\angle D$`, r`$115^\circ$`, 'Copy 2'], [r`$\angle C$`, r`$70^\circ$`, 'Copy 3'], [r`$\angle B$`, r`$95^\circ$`, 'Copy 4'], ['Total', r`$360^\circ$`, 'A full turn: no gap and no overlap']], 'Table of the four angles of the 4-gon, 80, 115, 70 and 95 degrees, placed one in each of four copies at a meeting point; the total is 360 degrees, a full turn.', 'The angle sum of a 4-gon is a full turn.');
must(80 + 115 + 70 + 95 === 360, 'tile angles');
const sum2 = flow('LR', [['a', 'Midpoint theorem and converse'], ['b', 'Medians meet 2 : 1'], ['c', 'Midpoint 4-gon is a parallelogram'], ['d', 'Symmetry and tiling']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Summary flow of Part 2: the midpoint theorem and its converse, the medians meeting in a point and dividing each other in the ratio 2 to 1, the midpoint 4-gon being a parallelogram, and symmetry and tiling.', 'The story of Part 2.');

// ================================================================ deck 2
const d2 = deck({
  part: 2,
  title: '4-gons (Quadrilaterals): Part 2, midpoints, medians, symmetry and tiling',
  goals: ['Prove the midpoint theorem and its converse', 'Prove that the medians of a triangle are concurrent', 'Prove that the midpoints of the sides of a 4-gon form a parallelogram', 'Describe the symmetry of 4-gons and explain why every 4-gon tiles the plane'],
  slides: [
    sl('title', 'A line joining two midpoints', { b: 'A beam fixed halfway up each slanting side of a gable looks **parallel** to the bottom, and **half as long**. This is the **midpoint theorem**, and it unlocks many results about 4-gons.', v: fMid, n: `A line that joins the midpoints of two sides of a triangle has a lovely property. Imagine the gable end of a roof, with a beam fixed halfway up each slanting side. The beam looks parallel to the bottom, and half as long. In this part we prove it, and we use it to show that the medians of a triangle meet at a point, and that the midpoints of any four-gon form a parallelogram.` }),
    sl('concept', 'What you will be able to do', { ul: ['Prove the **midpoint theorem** and its **converse**', 'Prove that the **medians** of a triangle are concurrent', 'Prove that joining the **midpoints** of a 4-gon gives a parallelogram', 'Describe **symmetry** and **tiling** of 4-gons'], v: goalFlow2, n: `First the midpoint theorem and its converse. Then the medians of a triangle, which turn out to be concurrent. Then the parallelogram that appears inside any four-gon when we join the midpoints of its sides. We finish with symmetry, which means reflection and rotation of four-gons, and with tiling, which explains why every four-gon can cover a floor.` }),
    sl('diagram', 'The midpoint theorem', { b: r`**Theorem:** the segment joining the midpoints of two sides of a triangle is **parallel** to the third side and **half** as long. Here $DE \parallel BC$ and $DE = \frac12 BC = 4$ cm.`, v: fMid, m: [r`DE \parallel BC, \quad DE = \tfrac{1}{2}\,BC`], n: `The midpoint theorem says: the segment joining the midpoints of two sides of a triangle is parallel to the third side, and is half as long. In the figure D and E are midpoints of A B and A C. The segment D E is four centimetres and parallel to B C, which is eight centimetres.` }),
    sl('concept', 'Proof of the midpoint theorem', { b: r`Extend $DE$ to $F$ with $EF = DE$ and join $CF$. The proof builds a **parallelogram** $BDFC$.`, v: tMidProof, n: `To prove it, extend D E to F so that E F equals D E, and join C F. Triangles A E D and C E F are congruent by side angle side, because the angles at E are vertically opposite. So C F equals B D and is parallel to it, which makes B D F C a parallelogram. Then D F is parallel and equal to B C, and D E is half of D F.` }),
    sl('check', 'Quick check: midpoint theorem', { b: 'In triangle $ABC$, $D$ and $E$ are the midpoints of $AB$ and $AC$, and $BC = 14$ cm. What is $DE$?', v: fMid, chk: 'm04', n: `Use the midpoint theorem.` }),
    sl('diagram', 'The converse of the midpoint theorem', { b: r`**Converse:** a line through the **midpoint** of one side of a triangle, **parallel** to a second side, **bisects** the third side. $D$ is the midpoint of $AB$ and $DE \parallel BC$, so $AE = EC$.`, v: fConv, n: `The converse says: a line through the midpoint of one side of a triangle, parallel to a second side, bisects the third side. Here D is the midpoint of A B, and D E is parallel to B C. Let E prime be the midpoint of A C. By the midpoint theorem, D E prime is also parallel to B C. Only one line through D is parallel to B C, so E is E prime, and A E equals E C.` }),
    sl('example', 'Worked example 1: joining the midpoints', { b: r`The sides of $\triangle ABC$ are $AB = 10$ cm, $BC = 12$ cm and $CA = 14$ cm. $D$, $E$, $F$ are the midpoints of $BC$, $CA$, $AB$. Find the sides and perimeter of $\triangle DEF$.`, ul: [r`**Midpoint theorem —** $EF = \frac12 BC = 6$, $FD = \frac12 CA = 7$, $DE = \frac12 AB = 5$ cm`, r`**Perimeter —** $6 + 7 + 5 = 18$ cm, half of $36$ cm`, r`**The four small triangles —** each has sides $5$, $6$, $7$ cm, so they are congruent (SSS)`], v: fMedial, n: `The sides of a triangle are ten, twelve and fourteen centimetres. The midpoints of its sides are joined. By the midpoint theorem each side of the new triangle is half of a side of the old one and parallel to it. So the new sides are five, six and seven centimetres, and the perimeter is eighteen centimetres, half of thirty-six. The four small triangles are congruent by side side side.` }),
    sl('diagram', 'Medians are concurrent', { b: r`A **median** joins a vertex to the midpoint of the opposite side. The three medians $AD$, $BE$, $CF$ pass through one point $G$ (**concurrent**), the **centroid**. $G$ divides each median in the ratio $2 : 1$, the longer part towards the vertex.`, v: fMedians, n: `A median joins a vertex to the midpoint of the opposite side. A triangle has three medians. In the figure the medians A D, B E and C F all pass through one point G. Lines that pass through one point are called concurrent. The point G is called the centroid, and it divides each median in the ratio two to one, with the longer part next to the vertex.` }),
    sl('concept', 'Why the medians meet in one point', { b: r`The proof applies the midpoint theorem to $\triangle ABC$ and $\triangle GBC$.`, v: tMedProof, n: `Let the medians B E and C F meet at G, and let P and Q be the midpoints of G B and G C. By the midpoint theorem, F E and P Q are both parallel to B C and half of it. So F E Q P is a parallelogram, and its diagonals bisect each other at G. So B G is twice G E, and the third median is forced through G.` }),
    sl('check', 'Quick check: the centroid', { b: 'The medians of a triangle meet at $G$, and the median $AD$ is $12$ cm long. How long is $AG$?', v: fMedians, chk: 'm05', n: `Remember how the centroid divides a median.` }),
    sl('diagram', 'The midpoints of any 4-gon', { b: r`Join the midpoints $P$, $Q$, $R$, $S$ of the sides of **any** 4-gon $ABCD$. Then $PQRS$ is always a **parallelogram**. Each side of $PQRS$ is parallel to a diagonal of $ABCD$.`, v: fVar, n: `Take any four-gon, even an irregular one, and join the midpoints of its sides in order. The new four-gon P Q R S is always a parallelogram. In the figure the sides of P Q R S are marked with ticks, and the opposite sides have the same ticks. The dashed diagonals A C and B D explain why: each side of P Q R S is parallel to a diagonal.` }),
    sl('concept', 'Proof: the Varignon parallelogram', { b: r`Join the diagonal $AC$ and use the midpoint theorem twice: $PQ \parallel AC \parallel SR$ and $PQ = SR = \frac12 AC$.`, v: tVarProof, n: `Join the diagonal A C. In triangle A B C, P Q joins midpoints, so it is parallel to A C and half of it. In triangle A D C, S R joins midpoints, so it is also parallel to A C and half of it. So P Q and S R are parallel and equal. A pair of opposite sides that is equal and parallel makes P Q R S a parallelogram.` }),
    sl('example', 'Worked example 2: perpendicular diagonals', { b: r`The diagonals $AC = 10$ cm and $BD = 6$ cm of a 4-gon $ABCD$ cross at right angles. $P$, $Q$, $R$, $S$ are the midpoints of its sides. Find the type, perimeter and area of $PQRS$.`, ul: [r`**Sides —** parallel to the diagonals and half as long: $5$ cm and $3$ cm`, r`**Type —** the diagonals are perpendicular, so the sides of $PQRS$ are perpendicular: a **rectangle**`, r`**Perimeter and area —** $2(5 + 3) = 16$ cm and $5 \times 3 = 15$ cm$^2$`], v: fVar2, n: `In a four-gon A B C D the diagonals are ten and six centimetres and they cross at right angles. The midpoint four-gon has sides parallel to the diagonals and half as long, so its sides are five and three centimetres. Since the diagonals are perpendicular, the sides of P Q R S are perpendicular too, so it is a rectangle. Its perimeter is sixteen centimetres and its area is fifteen square centimetres.` }),
    sl('diagram', 'Lines of symmetry', { b: r`A **line of symmetry** is a line such that folding along it makes the two halves fit exactly. A **rectangle** has $2$, a **rhombus** has $2$ (along its diagonals), a **kite** has $1$. A general parallelogram has none, and a square has $4$.`, v: fSym, n: `A figure has a line of symmetry if folding along the line makes the two halves fit exactly. A rectangle has two lines of symmetry, through the midpoints of opposite sides. A rhombus has two, along its diagonals. A kite has one, along its longer diagonal. A general parallelogram has none, and a square has four.` }),
    sl('diagram', 'Rotational symmetry', { b: r`A figure has **rotational symmetry** if a turn about a point, by less than a full turn, makes it fit itself. The **order** is how many times it fits in one full turn. A **parallelogram** has order $2$ (half-turn about the centre), a **square** has order $4$ (quarter-turn).`, v: fRot, n: `A figure has rotational symmetry if a turn about a point, by less than a full turn, makes it fit itself. A parallelogram fits itself after a half turn about the point where the diagonals meet, so its order of rotation is two. A square fits itself after a quarter turn, so its order is four. A kite has order one, meaning only the full turn.` }),
    sl('diagram', 'Why every 4-gon tiles the plane', { b: r`Place four copies of the same 4-gon around a point, using each of its four angles once: $80 + 115 + 70 + 95 = 360$. A full turn means **no gap**, so the corners fit. This works for **every** 4-gon because its angles always add up to $360^\circ$.`, v: fTile, n: `Why can every four-gon cover a floor with no gaps? Place four copies of the same four-gon round a point, one corner from each, using the four different angles. Here the angles are eighty, ninety-five, seventy and one hundred fifteen degrees. They add up to three hundred sixty degrees, which is a full turn, so the corners fit with no gap. This works for any four-gon.` }),
    sl('check', 'Quick check: tiling', { b: 'Three angles of a 4-gon tile are $75^\\circ$, $105^\\circ$ and $85^\\circ$. What must the fourth angle be?', v: tTile, chk: 'm06', n: `The four angles of a four-gon add up to a full turn.` }),
    sl('summary', 'Summary', { ul: [r`**Midpoint theorem:** the segment joining two midpoints is parallel to the third side and half as long; its **converse** also holds`, 'The **medians** of a triangle meet at the **centroid**, which divides each median in the ratio $2 : 1$', r`The midpoints of the sides of **any** 4-gon form a **parallelogram** (Varignon)`, '**Symmetry:** rectangle 2 lines, rhombus 2, kite 1, square 4; parallelogram has rotational order 2', r`**Tiling:** every 4-gon tiles the plane because its angles add up to $360^\circ$`], v: sum2, n: `To sum up. The segment joining the midpoints of two sides of a triangle is parallel to the third side and half as long, and the converse also holds. The medians of a triangle meet at the centroid, which divides each median in the ratio two to one. The midpoints of the sides of any four-gon form a parallelogram. Every four-gon tiles the plane, because its angles add up to three hundred sixty degrees.` }),
    sl('exam-tips', 'Exam tips: how marks are awarded', { ul: ['**Midpoint theorem proofs (3 marks):** the construction, the congruent triangles with reasons, then the conclusion', '**Numerical questions (2 marks):** name the theorem, then halve the right side', '**Symmetry (1–2 marks):** count lines of symmetry and the order of rotation', '**Mistake:** applying the midpoint theorem when the points are not midpoints'], v: tSym, n: `In proofs of the midpoint theorem, write the construction, show the congruent triangles with a reason for each pair of equal parts, and then state the conclusion. In numerical questions, name the theorem and then halve the correct side. In symmetry questions, count the lines of symmetry and the order of rotation. A common slip is using the midpoint theorem when the points are not midpoints.` }),
  ],
});

// ================================================================ notes
const notes = {
  unit: 'cbse-9-mathematics-ch10', version: 1, title: '4-gons (Quadrilaterals): chapter notes', language: 'en',
  sections: [
    { heading: '1. Definition and angle sum', body_md: r`A **4-gon** (quadrilateral) $ABCD$ has four vertices, four sides $AB$, $BC$, $CD$, $DA$ and two diagonals $AC$, $BD$. A diagonal that lies inside splits it into two triangles, so the **sum of its angles is $360^\circ$**. Opposite sides do not meet; adjacent sides do.`, key_terms: [{ term: '4-gon', definition_md: 'A closed figure made of four line segments joined end to end.' }, { term: 'Diagonal', definition_md: 'A segment joining two opposite vertices.' }], formulas: [{ latex: r`\angle A + \angle B + \angle C + \angle D = 360^\circ`, label: 'Angle sum of a 4-gon' }], visual: fQuad, visuals: [fAngleSum], topic_ids: [topic(1)] },
    { heading: '2. Types of 4-gon', body_md: r`**Trapezium:** at least one pair of parallel sides. **Parallelogram:** both pairs of opposite sides parallel. **Rhombus:** a parallelogram with four equal sides. **Rectangle:** four right angles (it is a parallelogram). **Square:** four equal sides and four right angles (a rhombus and a rectangle). **Kite:** two pairs of equal adjacent sides. Every square is a rectangle and a rhombus; every rectangle and rhombus is a parallelogram; every parallelogram is a trapezium.`, key_terms: [{ term: 'Parallelogram', definition_md: 'A 4-gon with both pairs of opposite sides parallel.' }, { term: 'Kite', definition_md: 'A 4-gon with two pairs of equal adjacent sides.' }], formulas: [], visual: f4Types, visuals: [tTypes, tSpecial], topic_ids: [topic(1)] },
    { heading: '3. Parallelogram: properties and tests', body_md: r`In a parallelogram: **opposite sides are equal**, **opposite angles are equal**, **adjacent angles add up to $180^\circ$** and **the diagonals bisect each other**. The proofs use the diagonal and alternate angles to get congruent triangles (ASA).\n\n**Tests (the converses):** a 4-gon is a parallelogram if (i) both pairs of opposite sides are equal, or (ii) both pairs of opposite angles are equal, or (iii) its diagonals bisect each other, or (iv) one pair of opposite sides is equal and parallel. One pair of equal opposite sides alone is not enough (isosceles trapezium).\n\nIn a **rhombus** the diagonals are perpendicular; in a **rectangle** they are equal; a square has both.`, key_terms: [{ term: 'Converse', definition_md: 'The statement with the given and the conclusion swapped.' }], formulas: [{ latex: r`AO = OC,\ BO = OD`, label: 'Diagonals of a parallelogram bisect each other' }], visual: fPar, visuals: [tParProof, fParDiag, tDiagProof, tTests, fRhRect, fParNum, tWE1, fBisect, tWE2], topic_ids: [topic(1)] },
    { heading: '4. The midpoint theorem and its converse', body_md: r`**Theorem:** the segment joining the midpoints of two sides of a triangle is **parallel** to the third side and **half** of it: $DE \parallel BC$, $DE = \frac12 BC$.\n\n*Proof idea:* extend $DE$ to $F$ with $EF = DE$; $\triangle AED \cong \triangle CEF$ (SAS), so $BDFC$ is a parallelogram.\n\n**Converse:** a line through the midpoint of one side, parallel to a second side, bisects the third side (uniqueness of the parallel line through a point).\n\nJoining the three midpoints gives a triangle with half-size sides, so its perimeter is half.`, key_terms: [{ term: 'Midpoint theorem', definition_md: 'The segment joining the midpoints of two sides of a triangle is parallel to the third side and half as long.' }], formulas: [{ latex: r`DE = \tfrac12\,BC,\quad DE \parallel BC`, label: 'Midpoint theorem' }], visual: fMid, visuals: [tMidProof, fMidProof, fConv, tConvProof, fMedial, tMedial], topic_ids: [topic(2)] },
    { heading: '5. Medians and the Varignon parallelogram', body_md: r`A **median** joins a vertex to the midpoint of the opposite side. The three medians are **concurrent**, at the **centroid** $G$, which divides each median in the ratio $2 : 1$ ($AG = 2\,GD$). *Proof idea:* in $\triangle ABC$ and $\triangle GBC$ the midpoint theorem gives a parallelogram $FEQP$ whose diagonals lie along the medians and bisect each other at $G$.\n\n**Varignon:** the midpoints $P$, $Q$, $R$, $S$ of the sides of **any** 4-gon form a parallelogram, with sides parallel to the diagonals and half as long. It is a rectangle if the diagonals are perpendicular, a rhombus if they are equal, and a square if both. Its area is half the area of $ABCD$.`, key_terms: [{ term: 'Median', definition_md: 'A segment from a vertex of a triangle to the midpoint of the opposite side.' }, { term: 'Centroid', definition_md: 'The point where the three medians meet.' }], formulas: [{ latex: r`AG : GD = 2 : 1`, label: 'Centroid' }], visual: fMedians, visuals: [tMedProof, fMedProof, fVar, tVarProof, fVar2, tVarNums], topic_ids: [topic(3)] },
    { heading: '6. Symmetry and tiling', body_md: r`A **line of symmetry** folds a figure onto itself. A figure has **rotational symmetry** of order $n$ if a turn of $360^\circ \div n$ about a point makes it fit itself. Rectangle: $2$ lines, order $2$. Rhombus: $2$ lines, order $2$. Square: $4$ lines, order $4$. Parallelogram: no lines, order $2$. Kite: $1$ line, order $1$.\n\n**Tiling:** four copies of any 4-gon can meet at a point, using each of its four angles once, because the angles add up to $360^\circ$. So every 4-gon tiles the plane with no gaps and no overlaps.`, key_terms: [{ term: 'Order of rotational symmetry', definition_md: 'The number of times a figure fits itself in one full turn.' }, { term: 'Tiling', definition_md: 'Covering the plane with copies of a shape with no gaps and no overlaps.' }], formulas: [], visual: fSym, visuals: [tSym, fRot, fTile, tTile], topic_ids: [topic(4)] },
  ],
  exam_tips_md: r`**How marks are awarded**\n- *Proofs (3 marks):* construction, congruent triangles with reasons, conclusion.\n- *Numerical questions (2 marks):* name the theorem, then use it.\n- *Symmetry (1–2 marks):* lines of symmetry and order of rotation.\n\n**Common mistakes**\n1. Calling a 4-gon a parallelogram because one pair of opposite sides is equal.\n2. Mixing up the diagonals of a rhombus (perpendicular) and a rectangle (equal).\n3. Using the midpoint theorem when the points are not midpoints.\n4. Forgetting the ratio $2 : 1$ is measured from the vertex.\n5. Forgetting reasons beside the steps of a proof.`,
  status: 'draft', provenance: d1.provenance,
};

const fcard = (id, front_md, back_md, tag, t) => ({ id, front_md, back_md, tag, topic_id: topic(t) });
const flashcards = {
  unit: 'cbse-9-mathematics-ch10', version: 1, language: 'en',
  cards: [
    fcard('f01', 'What is a 4-gon?', 'A closed figure made of four line segments joined end to end (a quadrilateral).', 'definition', 1),
    fcard('f02', 'What is a diagonal of a 4-gon?', 'A segment joining two opposite vertices.', 'definition', 1),
    fcard('f03', 'What is the sum of the angles of a 4-gon?', r`$360^\circ$.`, 'fact', 1),
    fcard('f04', 'Why do the angles of a 4-gon add up to $360^\\circ$?', r`A diagonal splits it into two triangles, each with angle sum $180^\circ$.`, 'concept', 1),
    fcard('f05', 'What is a trapezium?', 'A 4-gon with at least one pair of parallel sides.', 'definition', 1),
    fcard('f06', 'What is a parallelogram?', 'A 4-gon with both pairs of opposite sides parallel.', 'definition', 1),
    fcard('f07', 'What is a rhombus?', 'A parallelogram with four equal sides.', 'definition', 1),
    fcard('f08', 'What is a rectangle?', 'A 4-gon with four right angles (it is a parallelogram).', 'definition', 1),
    fcard('f09', 'What is a square?', 'A 4-gon with four equal sides and four right angles: a rhombus and a rectangle.', 'definition', 1),
    fcard('f10', 'What is a kite?', 'A 4-gon with two pairs of equal adjacent sides.', 'definition', 1),
    fcard('f11', 'List the properties of a parallelogram.', 'Opposite sides equal, opposite angles equal, diagonals bisect each other.', 'fact', 1),
    fcard('f12', 'How do you prove opposite sides of a parallelogram are equal?', 'Draw a diagonal; the two triangles are congruent by ASA (alternate angles); then CPCT.', 'concept', 1),
    fcard('f13', 'What do adjacent angles of a parallelogram add up to?', r`$180^\circ$.`, 'fact', 1),
    fcard('f14', 'Name four tests for a parallelogram.', 'Both pairs of opposite sides equal; both pairs of opposite angles equal; diagonals bisect each other; one pair of opposite sides equal and parallel.', 'fact', 1),
    fcard('f15', 'Is one pair of equal opposite sides enough for a parallelogram?', 'No: an isosceles trapezium has a pair of equal opposite sides (the legs) and is not a parallelogram.', 'exam-tip', 1),
    fcard('f16', 'What is special about the diagonals of a rhombus?', 'They are perpendicular (and bisect each other).', 'fact', 1),
    fcard('f17', 'What is special about the diagonals of a rectangle?', 'They are equal (and bisect each other).', 'fact', 1),
    fcard('f18', 'State the midpoint theorem.', 'The segment joining the midpoints of two sides of a triangle is parallel to the third side and half as long.', 'fact', 2),
    fcard('f19', 'How do you prove the midpoint theorem?', r`Extend $DE$ to $F$ with $EF = DE$; $\triangle AED \cong \triangle CEF$ (SAS); $BDFC$ is a parallelogram.`, 'concept', 2),
    fcard('f20', 'State the converse of the midpoint theorem.', 'A line through the midpoint of one side parallel to a second side bisects the third side.', 'fact', 2),
    fcard('f21', 'Why is the converse of the midpoint theorem true?', 'Only one line through the midpoint is parallel to the second side, and the line through the midpoint of the third side is one such line.', 'concept', 2),
    fcard('f22', 'What is the perimeter of the triangle formed by the midpoints of the sides?', 'Half the perimeter of the original triangle.', 'fact', 2),
    fcard('f23', 'What is a median of a triangle?', 'A segment from a vertex to the midpoint of the opposite side.', 'definition', 3),
    fcard('f24', 'What does concurrent mean?', 'Passing through one point.', 'definition', 3),
    fcard('f25', 'Where do the medians of a triangle meet, and in what ratio?', r`At the centroid $G$, which divides each median in the ratio $2 : 1$ from the vertex.`, 'fact', 3),
    fcard('f26', 'What 4-gon do the midpoints of the sides of any 4-gon form?', 'A parallelogram (the Varignon parallelogram).', 'fact', 3),
    fcard('f27', 'Why is the midpoint 4-gon a parallelogram?', r`Each of $PQ$ and $SR$ is parallel to the diagonal $AC$ and half of it, by the midpoint theorem.`, 'concept', 3),
    fcard('f28', 'When is the midpoint 4-gon a rectangle? A rhombus?', 'A rectangle when the diagonals are perpendicular; a rhombus when they are equal.', 'fact', 3),
    fcard('f29', 'How many lines of symmetry: rectangle, rhombus, kite, square, parallelogram?', r`$2$, $2$, $1$, $4$ and $0$.`, 'fact', 4),
    fcard('f30', 'Why does every 4-gon tile the plane?', r`Four copies fit round a point using each angle once, since the angles add up to $360^\circ$.`, 'concept', 4),
  ],
  status: 'draft', provenance: d1.provenance,
};

const release = {
  unit: 'cbse-9-mathematics-ch10', version: 1, academic_year: '2026-27', created_at: '2026-11-05T00:00:00+05:30',
  decks: [d1, d2], notes, flashcards, questions: [],
  build: { run_id: null, checks: { syllabus: 't01 definition and types of 4-gon (trapezium, parallelogram, rhombus, rectangle, square, kite), the angle sum 360, the properties of a parallelogram and their converses as tests; t02 the midpoint theorem and its converse with proofs; t03 medians are concurrent (via the midpoint theorem and a parallelogram) and the Varignon parallelogram with proof; t04 lines of symmetry and rotational symmetry of each 4-gon type, and why every 4-gon tiles the plane (angle sum 360), with a tiling figure.', self_checks: 'every figure is drawn from computed coordinates and asserted (types by classify(), parallel and equal marks, the centroid on all three medians dividing them 2 : 1, the Varignon figure a parallelogram, the four angles of the tile filling 360 degrees); the symmetry counts are found by testing every reflection and rotation on the drawn shapes; every angle, length and area answer in the item banks is recomputed from coordinates' } },
};
const tests = chapterTests('4-gons (Quadrilaterals)', {
  A: ['m08', 'm10', 'm14', 'ar1'],
  B: ['s201', 's204', 's301'],
  C: ['l01', 'l05'],
  D: ['c01'],
}, {
  A: ['m07', 'm09', 'm11', 'm12', 'm13', 'm15', 'm16', 'm18', 'ar2', 'ar3'],
  B: ['s202', 's205', ['s203', 's206'], 's302', ['s303', 's304']],
  C: ['l02', ['l03', 'l04']],
  D: ['c02', 'c03'],
});
build({ dir: DIR, release, testsSpec: tests });
