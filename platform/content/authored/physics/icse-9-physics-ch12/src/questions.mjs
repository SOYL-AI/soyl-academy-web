// ICSE 9 Physics ch12 Magnetism — question bank in ICSE school-examination style.
// Field strengths in numericals are given in arbitrary units (arrow lengths); distances are in cm; the poles of a bar magnet are taken at its ends in distance problems.
// AR keys: a = (A) true (R) false, b = (A) false (R) true, c = both true and R explains, d = both true and R does not explain.
import { mk, add, svgV, r } from '../../icse-9-physics-ch01/src/lib.mjs';
import * as K from './calc.mjs';
import { CHAIN, FIELD_LET, COMB_NN_LET, COMB_NS_LET, EARTH_FIG, RESULTANT } from './svgs.mjs';

const { mcq, ar, tf, fill, num, short, long, match } = mk;
const term = (o) => short({ marks: 1, wl: null, scheme: [[o.sch ?? 'Correct answer', 1]], ...o });
const fv = (svg, alt) => svgV(svg, alt);
const sh = (a, b) => (a === b ? true : `got ${a}, expected ${b}`);
const figField = () => fv(FIELD_LET, 'Field lines of a bar magnet with N on the right; A is just beyond the N pole on the axis, B above the middle, C just beyond the S pole, D far from the magnet and E below the middle');
const figNN = () => fv(COMB_NN_LET, 'Field of a bar magnet whose N pole points north together with the earth’s field; points A to E are lettered, A and B being on the equatorial line');
const figNS = () => fv(COMB_NS_LET, 'Field of a bar magnet whose N pole points south together with the earth’s field; points A to E are lettered, A and B being on the axial line');

// ---------------------------------------------------------------- deck-check items (not used in tests)
add('chk-ind', mcq({
  stem: 'The N pole of a bar magnet is brought near the head of an unmagnetised iron nail. The pole induced at the head of the nail is',
  right: 'a S pole', wrong: ['a N pole', 'both a N pole and a S pole', 'no pole at all'],
  sol: 'The end of the iron nearer the N pole becomes the unlike pole, a S pole, option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('chk-lines', mcq({
  stem: 'Two magnetic field lines can never cross each other because',
  right: 'the field would then have two directions at the point of crossing', wrong: ['the field would be zero at the crossing', 'the lines would then be of unequal length', 'a compass needle would stop moving'],
  sol: 'At any point the field has one definite direction, so only one line passes through it, option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('chk-dir', mcq({
  stem: 'A bar magnet has its N pole on the right. A small compass is placed just above the middle of the magnet. The N pole of the needle points',
  right: 'to the left, from the N pole side towards the S pole side', wrong: ['to the right, away from the S pole', 'straight up, away from the magnet', 'straight down, into the magnet'],
  sol: 'Outside the magnet the field runs from N to S, which above the middle is towards the left, option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('chk-strong', mcq({
  stem: 'In a diagram of the field lines of a bar magnet, the field is strongest',
  right: 'near the poles, where the lines are most crowded', wrong: ['far from the magnet, where the lines are widely spaced', 'at the middle of the magnet, outside it', 'at the places where the lines cross'],
  sol: 'Crowded lines show a strong field, and the lines crowd together near the poles, option (@K).',
  d: 1, c: 'understanding', t: [2],
}));
add('chk-compass', mcq({
  stem: 'The N pole of a freely pivoted compass needle comes to rest pointing to the geographic north because it is attracted by',
  right: 'the earth’s magnetic S pole, which is near the geographic north', wrong: ['the earth’s magnetic N pole, which is near the geographic north', 'the pole star', 'the iron in every building'],
  sol: 'Unlike poles attract, and the earth’s magnetic pole in the north is a S pole, option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('chk-n1', mcq({
  stem: 'A bar magnet is placed on a table with its N pole pointing north. Its neutral points lie on',
  right: 'the equatorial line, one on each side of the magnet', wrong: ['the axial line, one beyond each pole', 'the equatorial line, both on the same side', 'no line, because no neutral point exists'],
  sol: 'On the equatorial line the magnet’s field points south, against the earth’s field, option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('chk-n2', mcq({
  stem: 'The magnet is turned so that its N pole points south. Its neutral points now lie on',
  right: 'the axial line, one beyond each pole', wrong: ['the equatorial line, one on each side', 'the axial line, both beyond the same pole', 'a line at 45° to the magnet'],
  sol: 'Along its axis the magnet’s field now points south, against the earth’s field, option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('chk-res', mcq({
  stem: 'At a point the earth’s field is 4 units towards the north and the field of a magnet is 4 units towards the east. A compass needle at the point points',
  right: `${K.EQUAL}° east of north`, wrong: ['along the north direction', '30° east of north', '60° east of north'],
  sol: 'Two equal fields at right angles have a resultant midway between them, at 45°, option (@K).',
  d: 2, c: 'application', t: [4],
}));

// ---------------------------------------------------------------- t01 induced magnetism
add('m-mag', mcq({
  stem: 'Which of the following is attracted by a magnet?',
  right: 'A nickel coin', wrong: ['A copper wire', 'A glass rod', 'A wooden ruler'],
  sol: 'Iron, steel, nickel and cobalt are magnetic materials; copper, glass and wood are not, option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('m-sure', mcq({
  stem: 'A student wants to find out whether a steel needle is a magnet. The reliable test is to see if it',
  right: 'is repelled by the N pole of a known magnet', wrong: ['is attracted to the N pole of a known magnet', 'is attracted to a piece of iron', 'floats on water'],
  sol: 'An unmagnetised needle is also attracted, but only a magnet can be repelled, option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('m-temp', mcq({
  stem: 'A soft iron nail hangs from a magnet holding a paper clip. When the magnet is taken away the clip falls because',
  right: 'soft iron loses its induced magnetism quickly', wrong: ['soft iron is a non-magnetic material', 'the clip is repelled by the nail', 'steel clips cannot be magnetised'],
  sol: 'Magnetism in soft iron is temporary and disappears when the magnet is removed, option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('m-induce', mcq({
  stem: 'The S pole of a bar magnet is brought near one end of a soft iron bar. The end of the bar nearer to the S pole becomes',
  right: 'a N pole', wrong: ['a S pole', 'a N pole while the far end stays a N pole', 'neither pole, as soft iron cannot be magnetised'],
  sol: 'Induction gives the nearer end the pole unlike the one brought near, option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('m-clip', mcq({
  stem: 'A chain of three iron paper clips hangs from the N pole of a magnet. The lower end of the topmost clip is',
  right: 'a N pole, which attracts the second clip', wrong: ['a S pole, which attracts the second clip', 'a N pole, which repels the second clip', 'without a pole, so the second clip hangs by its weight'],
  sol: 'The upper end of the top clip is a S pole and its lower end a N pole; this N end induces a S pole at the top of the second clip and attracts it, option (@K).',
  d: 3, c: 'analysis', t: [1],
}));
add('ar-ind', ar({
  a: 'A piece of soft iron is attracted by a magnet.',
  r: 'The attraction takes place before any pole is induced in the iron.',
  key: 'a',
  sol: 'The attraction is real, so (A) is true; but the magnet first induces poles, so (R) is false, option (a).',
  d: 2, c: 'analysis', t: [1],
}));
add('tf-cu', tf({
  stem: 'A copper wire is attracted by a magnet.',
  key: 'f',
  sol: 'False. Copper is not a magnetic material.',
  d: 1, c: 'recall', t: [1],
}));
add('tf-iron', tf({
  stem: 'A piece of soft iron keeps its induced magnetism for years after the magnet is removed.',
  key: 'f',
  sol: 'False. Soft iron loses its magnetism quickly; steel keeps it.',
  d: 1, c: 'recall', t: [1],
}));
add('fill-ind', fill({
  stem: 'The process by which a magnet makes a nearby piece of iron magnetic is called magnetic ___.',
  acc: [['induction']],
  sol: 'Induction.',
  d: 1, c: 'recall', t: [1],
}));
add('term-rep', term({
  stem: 'Name the property that is the sure test of whether a bar is a magnet.',
  model: '**Repulsion** by the pole of a known magnet.', sol: 'Repulsion.', sch: 'Repulsion',
  d: 1, c: 'recall', t: [1],
}));
add('s2a', short({
  marks: 2,
  stem: 'What is meant by induced magnetism? Name one material in which it is easily produced.',
  wl: null,
  model: 'It is the magnetism produced in a piece of **magnetic material** when it is placed **near a magnet**, without touching it, the nearer end getting the unlike pole. **Soft iron** shows it easily.',
  sol: 'Magnetism produced by a nearby magnet; soft iron.',
  scheme: [['Meaning of induced magnetism', 1], ['A material such as soft iron', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('s2b', short({
  marks: 2,
  stem: 'Why is repulsion, and not attraction, taken as the sure test of a magnet?',
  wl: null,
  model: 'A piece of **unmagnetised iron** is also **attracted** by a magnet (after induction), but only another **magnet** can **repel** a pole.',
  sol: 'Iron is attracted too; only a magnet repels.',
  scheme: [['Unmagnetised iron is attracted too', 1], ['Only a magnet can repel', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('s2g', short({
  marks: 2,
  stem: 'A steel needle and a soft iron nail are both held on the N pole of a magnet and then the magnet is removed. Compare what happens to the two.',
  wl: null,
  model: 'The **nail** loses its magnetism at once, as soft iron is a **temporary** magnet; the **steel needle** stays weakly magnetised, as steel keeps its magnetism.',
  sol: 'Nail loses it, needle keeps it.',
  scheme: [['Nail loses magnetism quickly', 1], ['Steel needle keeps magnetism', 1]],
  d: 2, c: 'application', t: [1],
}));
add('s3a', short({
  marks: 3,
  stem: 'A student says, "The N pole of a magnet attracts an iron nail because both are magnets." Correct the statement, using the idea of induction, and give the order of events.',
  wl: null,
  model: 'The nail is **not** a magnet at first. The **N pole induces a S pole** in the **nearer end** of the nail and a N pole at the far end. **Then** the unlike poles **attract**, so induction comes **before** attraction.',
  sol: 'Nail magnetised first; unlike pole nearer; then attraction.',
  scheme: [['The nail is not a magnet to begin with', 1], ['Nearer end becomes the unlike pole by induction', 1], ['Attraction follows induction', 1]],
  d: 2, c: 'application', t: [1],
}));

// ---------------------------------------------------------------- t02 field lines
add('m-prop', mcq({
  stem: 'Which statement about magnetic field lines is correct?',
  right: 'No two field lines can cross each other', wrong: ['They begin and end on the same pole', 'They are straight lines pointing from S to N outside a magnet', 'They are equally spaced near the poles'],
  sol: 'Each point has one field direction, so lines never cross, option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('m-inside', mcq({
  stem: 'Within the body of a bar magnet, the magnetic field lines are directed',
  right: 'from the S pole to the N pole', wrong: ['from the N pole to the S pole', 'across the magnet from side to side', 'nowhere, as there is no field inside a magnet'],
  sol: 'Outside they go from N to S; to be closed curves they must run S to N inside, option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('m-uniform', mcq({
  stem: 'In a region the magnetic field lines are straight, parallel and equally spaced. The field in the region is',
  right: 'uniform', wrong: ['zero', 'strongest at one end', 'weaker where the lines are closest'],
  sol: 'Equal spacing and a fixed direction show the same field everywhere, option (@K).',
  d: 1, c: 'understanding', t: [2],
}));
add('m-fieldA', mcq({
  stem: 'In the figure, a small compass is placed at A, just beyond the N pole of the magnet on its axis. The N end of the needle points',
  right: 'away from the magnet, along the axis', wrong: ['towards the magnet, along the axis', 'upwards, at right angles to the axis', 'downwards, at right angles to the axis'],
  sol: 'Outside the magnet the lines leave the N pole, so at A the field points away from the magnet, option (@K).',
  d: 2, c: 'application', t: [2],
  assets: [figField()],
}));
add('m-fieldD', mcq({
  stem: 'In the figure, the field is weakest at the point',
  right: 'D', wrong: ['A', 'B', 'E'],
  sol: 'D is farthest from the magnet and from the poles, where the lines are most widely spaced, option (@K).',
  d: 2, c: 'application', t: [2],
  assets: [figField()],
}));
add('ar-cross', ar({
  a: 'Two magnetic field lines can cross at a point.',
  r: 'The magnetic field at a point has only one direction.',
  key: 'b',
  sol: 'Because the field has one direction at a point, lines cannot cross: (A) is false and (R) is true, option (b).',
  d: 2, c: 'analysis', t: [2],
}));
add('tf-closed', tf({
  stem: 'Followed all the way round, each magnetic field line of a bar magnet comes back to the point where it started.',
  key: 't',
  sol: 'True. They go from N to S outside the magnet and from S to N inside it.',
  d: 1, c: 'recall', t: [2],
}));
add('match-mag', match({
  marks: 5,
  stem: 'Match each term in Column A with the statement in Column B that fits it best.',
  pairs: [
    ['Soft iron', 'Loses its magnetism quickly'],
    ['Steel', 'Keeps its magnetism for a long time'],
    ['Field lines', 'Show the direction of the magnetic field'],
    ['Neutral point', 'Net magnetic field is zero'],
    ['Compass needle', 'A small pivoted magnet'],
  ],
  order: [0, 1, 2, 3, 4],
  sol: 'Soft iron is a temporary magnet; steel is a permanent magnet; field lines show direction; a neutral point has zero resultant; a compass needle is a pivoted magnet.',
  scheme: [['Five pairs', 5]],
  d: 2, c: 'understanding', t: [1, 2, 4],
}));
add('s2c', short({
  marks: 2,
  stem: 'State two properties of magnetic field lines.',
  wl: null,
  model: 'They run from the **N pole to the S pole** outside the magnet and are **closed curves**; they **never cross**, and they are **crowded where the field is strong**.',
  sol: 'N to S, closed; never cross; crowd where strong.',
  scheme: [['A first property', 1], ['A second property', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('s3b', short({
  marks: 3,
  stem: 'Describe how you would plot the field line of a bar magnet that starts near its N pole, using a small compass.',
  wl: null,
  model: 'Place the magnet on a sheet of paper and a small **compass** near its N pole. **Mark two dots** at the ends of the needle. **Move the compass** so that one end is on the second dot and mark again; repeat until the S pole is reached. **Join the dots** and add an **arrow from N to S**.',
  sol: 'Mark the ends of the needle, move it on, join the dots, arrow.',
  scheme: [['Compass near the pole and the two ends marked', 1], ['Compass moved on step by step', 1], ['Dots joined and an arrow added from N to S', 1]],
  d: 2, c: 'understanding', t: [2],
}));

// ---------------------------------------------------------------- t03 the earth's field and the compass
add('m-earthS', mcq({
  stem: 'The magnetic pole of the earth that lies near the geographic north is',
  right: 'a magnetic S pole', wrong: ['a magnetic N pole', 'neither N nor S', 'both N and S'],
  sol: 'The N pole of a magnet points north because it is attracted to a S pole there, option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('m-evid', mcq({
  stem: 'Which observation is evidence that the earth has a magnetic field?',
  right: 'A freely suspended bar magnet always comes to rest in the north-south direction', wrong: ['A stone dropped from a height falls towards the ground', 'A compass needle spins steadily when placed on a table', 'A magnet attracts a steel pin'],
  sol: 'Only a field acting everywhere can set a freely suspended magnet in a fixed direction, option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('ar-earth', ar({
  a: 'The N pole of a freely suspended magnet points towards the geographic north.',
  r: 'The earth’s magnetic S pole lies near the geographic north.',
  key: 'c',
  sol: 'Unlike poles attract, so the N pole is drawn to the S pole in the north; (R) explains (A), option (c).',
  d: 2, c: 'analysis', t: [3],
}));
add('ar-uniform', ar({
  a: 'Over a small region the earth’s magnetic field can be taken as uniform.',
  r: 'A magnetic compass shows direction because its needle is a small magnet.',
  key: 'd',
  sol: 'Both statements are true, but the second does not explain the first, option (d).',
  d: 2, c: 'analysis', t: [3],
}));
add('term-comp', term({
  stem: 'Name the instrument that uses a small pivoted magnetised needle to show the north-south direction.',
  model: 'A **magnetic compass**.', sol: 'Magnetic compass.', sch: 'Magnetic compass',
  d: 1, c: 'recall', t: [3],
}));
add('fill-para', fill({
  marks: 5,
  stem: 'Complete the paragraph. Outside a magnet the field lines run from the ___ pole to the ___ pole. The earth’s magnetic ___ pole is near the geographic north. A point where the resultant field is zero is called a ___ point. A compass needle placed there ___ settle pointing in any direction.',
  acc: [['north', 'N'], ['south', 'S'], ['south', 'S'], ['neutral'], ['can', 'may']],
  sol: 'North, south, south, neutral, can.',
  d: 2, c: 'understanding', t: [2, 3, 4],
}));
add('s2d', short({
  marks: 2,
  stem: 'Why does a freely pivoted compass needle come to rest along the north-south line?',
  wl: null,
  model: 'The needle is a **small magnet** in the **earth’s magnetic field**; the field turns it until its **N pole points along the field**, towards the geographic north.',
  sol: 'Small magnet in the earth’s field turns to point along it.',
  scheme: [['Needle is a small magnet in the earth’s field', 1], ['It turns until its N pole points along the field, north', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('s2f', short({
  marks: 2,
  stem: 'Give two pieces of evidence that the earth has a magnetic field.',
  wl: null,
  model: 'A **freely suspended bar magnet** (or a pivoted compass needle) always comes to rest along the **north-south line**. A piece of **soft iron** kept in that line for a long time becomes **weakly magnetised**.',
  sol: 'Suspended magnet rests north-south; soft iron slowly magnetised.',
  scheme: [['First piece of evidence', 1], ['Second piece of evidence', 1]],
  d: 1, c: 'recall', t: [3],
}));

// ---------------------------------------------------------------- t04 the combined field and neutral points
add('m-neutral-def', mcq({
  stem: 'A neutral point near a bar magnet is a point where',
  right: 'the magnet’s field is equal and opposite to the earth’s field', wrong: ['the magnet’s field is at its greatest', 'the earth’s field is zero', 'a compass needle points exactly north'],
  sol: 'The two fields cancel, so the resultant field is zero, option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('m-two', mcq({
  stem: 'A bar magnet is placed with its N pole pointing north. The number of neutral points it has near it is',
  right: 'two', wrong: ['one', 'three', 'none'],
  sol: 'One neutral point lies on each side of the magnet on the equatorial line, option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('m-strong', mcq({
  stem: 'A student replaces a bar magnet by a much stronger one, placed the same way, and finds the neutral points again. Compared with before, they are',
  right: 'farther from the magnet', wrong: ['nearer to the magnet', 'at the same distance', 'no longer present'],
  sol: 'A stronger magnet’s field is as strong as the earth’s field only at a greater distance, option (@K).',
  d: 3, c: 'analysis', t: [4],
}));
add('m-lettered', mcq({
  stem: 'The figure shows a bar magnet with its N pole pointing north, in the earth’s field. Which two lettered points are neutral points?',
  right: 'A and B', wrong: ['C and D', 'A and C', 'B and E'],
  sol: 'A and B are on the equatorial line of the magnet at the distance where its field cancels the earth’s field, option (@K).',
  d: 2, c: 'application', t: [4],
  assets: [figNN()],
}));
add('tf-neutral', tf({
  stem: 'A compass needle placed at a neutral point always points towards the geographic north.',
  key: 'f',
  sol: 'False. The resultant field is zero there, so the needle can rest in any direction.',
  d: 2, c: 'understanding', t: [4],
}));
add('num-n1', num({
  stem: `A bar magnet ${K.EQ1.len} cm long is placed with its N pole pointing north. A neutral point on its equatorial line is ${K.EQ1.d} cm from the centre of the magnet. Taking the poles at the ends of the magnet, find the distance of the neutral point from each pole, in cm.`,
  value: K.EQ1_POLE, tol: 0, unit: 'cm',
  sol: r`Each pole is $\dfrac{${K.EQ1.len}}{2} = ${K.EQ1_HALF}$ cm from the centre, so $d = \sqrt{${K.EQ1.d}^2 + ${K.EQ1_HALF}^2} = \sqrt{${K.EQ1.d ** 2 + K.EQ1_HALF ** 2}} = ${K.EQ1_POLE}$ cm.`,
  scheme: [['Right angled triangle with the half length', 0.5], [`${K.EQ1_POLE} cm`, 0.5]],
  d: 3, c: 'application', t: [4],
}), () => sh(K.EQ1_POLE, 10));
add('num-n2', num({
  stem: `A bar magnet ${K.AX2.len} cm long is placed with its N pole pointing south. A neutral point on its axis lies ${K.AX2.d} cm from the centre. Find its distance from the farther pole, in cm.`,
  value: K.AX2_FAR, tol: 0, unit: 'cm',
  sol: r`The poles are ${K.AX2.len / 2} cm from the centre, so the farther pole is $${K.AX2.d} + ${K.AX2.len / 2} = ${K.AX2_FAR}$ cm away.`,
  scheme: [['Poles at the ends, half length 5 cm', 0.5], [`${K.AX2_FAR} cm`, 0.5]],
  d: 2, c: 'application', t: [4],
}), () => sh(K.AX2_FAR, 20));
add('num-n3', num({
  stem: `A bar magnet ${K.AX3.len} cm long has its N pole pointing south, and its two neutral points on the axis are ${K.AX3.gap} cm apart. Find the distance of a neutral point from the nearer pole, in cm.`,
  value: K.AX3_NEAR, tol: 0, unit: 'cm',
  sol: r`Each neutral point is $\dfrac{${K.AX3.gap}}{2} = ${K.AX3_C}$ cm from the centre; the nearer pole is ${K.AX3.len / 2} cm from the centre, so the distance is $${K.AX3_C} - ${K.AX3.len / 2} = ${K.AX3_NEAR}$ cm.`,
  scheme: [['Each neutral point 20 cm from the centre', 0.5], [`${K.AX3_NEAR} cm`, 0.5]],
  d: 3, c: 'application', t: [4],
}), () => sh(K.AX3_NEAR, 14));
add('num-res', num({
  stem: `At a point the earth’s field is ${K.RES.earth} units towards the north and the field of a magnet is ${K.RES.magnet} units towards the east. Find the magnitude of the resultant field, in units.`,
  value: K.RES_MAG, tol: 0, unit: 'units',
  sol: r`The fields are at right angles, so $R = \sqrt{${K.RES.earth}^2 + ${K.RES.magnet}^2} = \sqrt{${K.RES.earth ** 2 + K.RES.magnet ** 2}} = ${K.RES_MAG}$ units.`,
  scheme: [['Square root of the sum of squares', 0.5], [`${K.RES_MAG} units`, 0.5]],
  d: 2, c: 'application', t: [4],
}), () => sh(K.RES_MAG, 5));
add('num-ang', num({
  stem: `Using the same data (earth’s field ${K.RES.earth} units north, magnet’s field ${K.RES.magnet} units east), find the angle between the direction of a compass needle and the north direction, in degrees to the nearest degree.`,
  value: K.RES_ANG, tol: 1, unit: '°',
  sol: r`$\tan\theta = \dfrac{${K.RES.magnet}}{${K.RES.earth}} = 1.33$, so $\theta = ${K.RES_ANG}$ degrees east of north.`,
  scheme: [['tan of the angle from the two fields', 0.5], [`${K.RES_ANG}°`, 0.5]],
  d: 3, c: 'application', t: [4],
  assets: [fv(RESULTANT, 'The resultant of 3 units north and 4 units east is 5 units at 53 degrees east of north')],
}), () => sh(K.RES_ANG, 53));
add('num-opp', num({
  stem: `At a point on the equatorial line of a magnet placed with its N pole pointing north, the magnet’s field is ${K.OPP.magnet} units towards the south and the earth’s field is ${K.OPP.earth} units towards the north. Find the resultant field, in units.`,
  value: K.OPP_NET, tol: 0, unit: 'units',
  sol: r`The fields are opposite, so the resultant is $${K.OPP.magnet} - ${K.OPP.earth} = ${K.OPP_NET}$ units towards the south.`,
  scheme: [['Difference of the two fields', 0.5], [`${K.OPP_NET} units`, 0.5]],
  d: 2, c: 'application', t: [4],
}), () => sh(K.OPP_NET, 2));
add('s2e', short({
  marks: 2,
  stem: 'Define a neutral point of a bar magnet, and state the value of the resultant magnetic field there.',
  wl: null,
  model: 'A **neutral point** is a point where the magnetic field of the magnet is **equal and opposite** to the earth’s field; the **resultant field there is zero**.',
  sol: 'Equal and opposite fields; resultant zero.',
  scheme: [['Fields equal and opposite', 1], ['Resultant zero', 1]],
  d: 1, c: 'recall', t: [4],
}));
add('s3c', short({
  marks: 3,
  stem: 'A bar magnet lies with its N pole pointing north. On which line are its neutral points? Explain why the magnet’s field can cancel the earth’s field there.',
  wl: null,
  model: 'On the **equatorial line**, one on each side. There the magnet’s field points **south**, opposite to the earth’s field, which points **north**; at a certain distance the two are **equal in size**, so they cancel.',
  sol: 'Equatorial line; magnet’s field south, earth’s north; equal at a distance.',
  scheme: [['Equatorial line, one on each side', 1], ['Magnet’s field opposes the earth’s field there', 1], ['Equal in size at a certain distance', 1]],
  d: 3, c: 'application', t: [4],
}));
add('s3d', short({
  marks: 3,
  stem: `A bar magnet ${K.S3D.len} cm long is placed with its N pole pointing north. A neutral point is on its equatorial line, ${K.S3D.d} cm from the centre. Taking the poles at the ends, find (a) its distance from each pole and (b) the distance between the two neutral points.`,
  wl: null,
  model: `**(a)** Each pole is ${K.S3D.len / 2} cm from the centre: d = √(${K.S3D.d}² + ${K.S3D.len / 2}²) = √${K.S3D.d ** 2 + (K.S3D.len / 2) ** 2} = **${K.S3D_POLE} cm**.\n\n**(b)** The two neutral points are on opposite sides: ${K.S3D.d} + ${K.S3D.d} = **${K.S3D_GAP} cm**.`,
  sol: '25 cm from each pole; 48 cm apart.',
  scheme: [['Half length 7 cm and right angled triangle', 1], ['25 cm', 1], ['48 cm', 1]],
  d: 3, c: 'application', t: [4],
}), () => sh(K.S3D_POLE, 25));
add('s3e', short({
  marks: 3,
  stem: `At a point the earth’s field is ${K.RES2.earth} units towards the north and the field of a magnet is ${K.RES2.magnet} units towards the east. Find (a) the resultant field and (b) the angle of the compass needle from the north, to the nearest degree.`,
  wl: null,
  model: `**(a)** R = √(${K.RES2.earth}² + ${K.RES2.magnet}²) = √${K.RES2.earth ** 2 + K.RES2.magnet ** 2} = **${K.RES2_MAG} units**.\n\n**(b)** tan θ = ${K.RES2.magnet} ÷ ${K.RES2.earth} = 0.75, so θ = **${K.RES2_ANG}°** east of north.`,
  sol: '10 units; 37 degrees east of north.',
  scheme: [['Square root of the sum of squares', 1], ['10 units', 1], ['37° east of north', 1]],
  d: 3, c: 'application', t: [4],
}), () => sh(K.RES2_ANG, 37));
add('s3f', short({
  marks: 3,
  stem: 'A bar magnet is placed with its N pole pointing south. State where its neutral points lie and explain why there is none on the equatorial line.',
  wl: null,
  model: 'The neutral points lie on the **axial line**, one beyond each pole. On the **equatorial line** the magnet’s field points **north**, in the **same** direction as the earth’s field, so the two **add** and cannot cancel.',
  sol: 'Axial line; on the equatorial line the fields add.',
  scheme: [['Axial line, one beyond each pole', 1], ['On the equatorial line the magnet’s field is northward', 1], ['The fields add, so they cannot cancel', 1]],
  d: 3, c: 'analysis', t: [4],
}));

// ---------------------------------------------------------------- 10-mark structured questions
add('chain-long', long({
  marks: 10, wl: null,
  stem: 'The figure shows two iron nails hanging one below the other from the N pole of a bar magnet.\n\n(a) State the pole induced at the upper end and at the lower end of each nail. [4]\n\n(b) Explain why the second nail hangs from the first. [2]\n\n(c) The magnet is removed. What happens to the nails, and why? [2]\n\n(d) A steel bar is brought near the nails, and the end of the bar that is repelled by the N pole of the magnet is noted. What does this show about the bar? [2]',
  model: '**(a)** Each nail: **upper end S pole**, **lower end N pole**.\n\n**(b)** The **N end of the first nail** induces a **S pole at the upper end of the second nail**, and unlike poles attract.\n\n(c) The nails **fall apart**, because **soft iron loses its induced magnetism** when the magnet is taken away.\n\n**(d)** The bar is a **magnet**, since **repulsion** can occur only between two magnets.',
  sol: 'S above, N below for each nail; induction then attraction; they fall as soft iron loses magnetism; repulsion shows a magnet.',
  scheme: [['Upper end of the first nail a S pole', 1], ['Lower end of the first nail a N pole', 1], ['Upper end of the second nail a S pole', 1], ['Lower end of the second nail a N pole', 1], ['N end of the first nail induces a S pole in the second', 1], ['Unlike poles attract', 1], ['The nails fall apart', 1], ['Soft iron loses magnetism quickly', 1], ['The bar is a magnet', 1], ['Only repulsion proves it', 1]],
  d: 3, c: 'application', t: [1],
  assets: [fv(CHAIN, 'Two nails hanging from the N pole of a magnet')],
}));
add('field-long', long({
  marks: 10, wl: null,
  stem: 'The figure shows the field lines of a bar magnet with five points lettered A to E. A small compass is placed at each point.\n\n(a) The N end of the needle at A points in which direction? [2]\n\n(b) The N end of the needle at B points in which direction? [2]\n\n(c) At which of the lettered points is the field weakest, and how do the lines show it? [2]\n\n(d) State the direction of the field lines inside the magnet. [1]\n\n(e) Give two reasons why the field lines cannot cross. [2]\n\n(f) What is the shape of the lines taken as a whole? [1]',
  model: '**(a)** **Away from the magnet**, along the axis (to the right): outside the magnet the field leaves the N pole.\n\n**(b)** **To the left**, from the N pole side towards the S pole side, since the field outside runs from N to S.\n\n**(c)** At **D**; the lines there are **farthest apart**.\n\n**(d)** From the **S pole to the N pole**.\n\n**(e)** The field has **only one direction at a point**, and a compass needle there can point only along one line.\n\n**(f)** **Closed curves**.',
  sol: 'Away along the axis; to the left; D, lines far apart; S to N; one direction at a point; closed curves.',
  scheme: [['Direction at A: away from the magnet', 1], ['Reason: lines leave the N pole', 1], ['Direction at B: to the left', 1], ['Reason: N to S outside', 1], ['D is the weakest point', 1], ['Lines widely spaced there', 1], ['S to N inside the magnet', 1], ['Only one direction at a point', 1], ['A compass can point along one line only', 1], ['Closed curves', 1]],
  d: 3, c: 'application', t: [2],
  assets: [figField()],
}));
add('earth-long', long({
  marks: 10, wl: null,
  stem: 'The figure shows the earth behaving as a huge bar magnet, with a compass needle at three places.\n\n(a) Which magnetic pole of the earth is near the geographic north? [1]\n\n(b) Explain why the N pole of the compass needle points north. [2]\n\n(c) Give one piece of evidence for the earth’s magnetic field, other than the compass. [2]\n\n(d) Describe the earth’s magnetic field over a small region such as a table, and say how its lines are drawn. [3]\n\n(e) A bar magnet is hung freely from a thread. State the direction in which it comes to rest, and which of its poles points north. [2]',
  model: '**(a)** A magnetic **S pole**.\n\n**(b)** The needle is a small magnet; its **N pole is attracted by the earth’s magnetic S pole**, which is near the geographic north.\n\n**(c)** A **freely suspended bar magnet** always rests along the **north-south line**.\n\n**(d)** It is **uniform**: the lines are **parallel, equally spaced straight lines**, pointing **towards the north**.\n\n**(e)** It rests along the **north-south line**, with its **N pole pointing north**.',
  sol: 'S pole; N end attracted to the earth’s S pole in the north; suspended magnet rests north-south; uniform parallel lines northwards; north-south, N pole north.',
  scheme: [['S pole', 1], ['Needle is a magnet', 1], ['Unlike poles attract', 1], ['Evidence stated', 1], ['Reason that it shows a field', 1], ['Uniform field', 1], ['Parallel equally spaced lines', 1], ['Pointing north', 1], ['Rests north-south', 1], ['N pole points north', 1]],
  d: 2, c: 'understanding', t: [3],
  assets: [fv(EARTH_FIG, 'The earth as a bar magnet with compass needles at three places')],
}));
add('nn-long', long({
  marks: 10, wl: null,
  stem: `The figure shows a bar magnet ${K.EQ1.len} cm long placed on a table with its N pole pointing north, in the earth’s magnetic field. Points A to E are lettered.\n\n(a) Which two lettered points are neutral points? [2]\n\n(b) What is a neutral point? [2]\n\n(c) Why does the equatorial line, and not the axial line, have the neutral points in this position? [2]\n\n(d) A neutral point is ${K.EQ1.d} cm from the centre of the magnet. Taking the poles at the ends, find its distance from each pole. [3]\n\n(e) What does a compass needle do at a neutral point? [1]`,
  model: `**(a)** **A and B**.\n\n**(b)** A point where the magnet’s field is **equal and opposite to the earth’s field**, so the **resultant field is zero**.\n\n**(c)** On the equatorial line the magnet’s field points **south**, opposite to the earth’s field (north); on the axial line it points north and **adds** to it.\n\n**(d)** The poles are ${K.EQ1_HALF} cm from the centre: d = √(${K.EQ1.d}² + ${K.EQ1_HALF}²) = **${K.EQ1_POLE} cm**.\n\n**(e)** It is **not turned** and can **rest in any direction**.`,
  sol: 'A and B; equal and opposite, resultant zero; field opposes on the equatorial line; 10 cm; rests in any direction.',
  scheme: [['A', 1], ['B', 1], ['Fields equal and opposite', 1], ['Resultant zero', 1], ['Magnet’s field south on the equatorial line', 1], ['Opposite to the earth’s field', 1], ['Right angled triangle with half length 6 cm', 1], ['Substitution', 1], ['10 cm', 1], ['Needle can rest in any direction', 1]],
  d: 3, c: 'application', t: [4],
  assets: [figNN()],
}), () => sh(K.EQ1_POLE, 10));
add('ns-long', long({
  marks: 10, wl: null,
  stem: `The figure shows a bar magnet ${K.AX2.len} cm long with its N pole pointing south, in the earth’s magnetic field. Points A to E are lettered, and A and B are the neutral points.\n\n(a) On which line of the magnet do the neutral points lie? [1]\n\n(b) State the direction of the magnet’s field and of the earth’s field at A. [2]\n\n(c) Explain why the equatorial line has no neutral point in this position. [2]\n\n(d) A neutral point is ${K.AX2.d} cm from the centre of the magnet. Find its distances from the nearer and the farther pole, taking the poles at the ends. [3]\n\n(e) The magnet is replaced by a much stronger one. How do the neutral points change, and why? [2]`,
  model: `**(a)** The **axial line**.\n\n**(b)** At A the magnet’s field points **south**, the earth’s field points **north**, equal in size.\n\n**(c)** On the equatorial line the magnet’s field points **north**, the **same way** as the earth’s, so the two add and cannot cancel.\n\n**(d)** Nearer pole: ${K.AX2.d} − ${K.AX2.len / 2} = **${K.AX2_NEAR} cm**; farther pole: ${K.AX2.d} + ${K.AX2.len / 2} = **${K.AX2_FAR} cm**.\n\n**(e)** They move **farther from the magnet**, because a stronger magnet’s field equals the earth’s field only at a greater distance.`,
  sol: 'Axial line; south and north; fields add on the equatorial line; 10 cm and 20 cm; farther away.',
  scheme: [['Axial line', 1], ['Magnet’s field south at A', 1], ['Earth’s field north at A', 1], ['Magnet’s field north on the equatorial line', 1], ['Fields add', 1], ['Nearer pole 10 cm', 1], ['Farther pole 20 cm', 1], ['Poles at the ends, half length 5 cm', 1], ['Neutral points move farther away', 1], ['Reason: stronger field reaches farther', 1]],
  d: 4, c: 'analysis', t: [4],
  assets: [figNS()],
}), () => sh(K.AX2_FAR, 20));
add('res-long', long({
  marks: 10, wl: null,
  stem: `A small compass is placed at a point P near a bar magnet. At P the earth’s magnetic field is ${K.RES.earth} units towards the north and the magnet’s field is ${K.RES.magnet} units towards the east, as shown.\n\n(a) State why the fields are drawn as arrows and what the length of an arrow shows. [2]\n\n(b) Find the magnitude of the resultant field at P. [2]\n\n(c) Find the direction of the compass needle at P, relative to the north. [2]\n\n(d) The magnet is moved until its field at P is equal to the earth’s field. In which direction does the needle then point? [2]\n\n(e) The magnet is moved further until its field at P is ${K.RES.earth} units towards the south. What is the resultant field at P, and what is the point called? [2]`,
  model: `**(a)** A field has **magnitude and direction**; the **length** of the arrow shows the **strength** of the field.\n\n**(b)** R = √(${K.RES.earth}² + ${K.RES.magnet}²) = **${K.RES_MAG} units**.\n\n**(c)** tan θ = ${K.RES.magnet} ÷ ${K.RES.earth}, so θ = **${K.RES_ANG}°** east of north.\n\n**(d)** The resultant is midway: **${K.EQUAL}° east of north**.\n\n**(e)** The two fields are equal and opposite, so the resultant is **zero**, and P is a **neutral point**.`,
  sol: 'Arrow gives direction, length gives strength; 5 units; 53 degrees east of north; 45 degrees; zero, neutral point.',
  scheme: [['Arrow gives the direction', 1], ['Length gives the strength', 1], ['Square root of the sum of squares', 1], ['5 units', 1], ['tan θ = 4 ÷ 3', 1], ['53° east of north', 1], ['Resultant midway for equal fields', 1], ['45° east of north', 1], ['Resultant zero', 1], ['Neutral point', 1]],
  d: 4, c: 'application', t: [4],
  assets: [fv(RESULTANT, 'The earth’s field of 3 units north and a magnet’s field of 4 units east at a point P, with the resultant of 5 units')],
}), () => sh(K.RES_ANG, 53));

// ---------------------------------------------------------------- more items on field lines
add('m-closed', mcq({
  stem: 'Taken as a whole, the magnetic field lines of a bar magnet form',
  right: 'closed curves', wrong: ['straight lines from pole to pole', 'lines that begin on the N pole and end at infinity', 'circles centred on the middle of the magnet'],
  sol: 'Lines go from N to S outside the magnet and from S to N inside it, so each is a closed curve, option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('m-dense', mcq({
  stem: 'Iron filings sprinkled round a bar magnet cling most thickly near the poles because there',
  right: 'the field is strongest', wrong: ['the field is weakest', 'the filings are attracted only to the S pole', 'the earth’s field is strongest'],
  sol: 'The field, and so the force on the filings, is greatest where the lines are most crowded, near the poles, option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('s2h', short({
  marks: 2,
  stem: 'In the picture of the field of a bar magnet the lines are closest together near the poles. What does this show?',
  wl: null,
  model: 'It shows that the magnetic field is **strongest near the poles**; the lines spread out and the field becomes **weaker farther from the magnet**.',
  sol: 'Strong field near the poles, weaker far away.',
  scheme: [['Strongest near the poles', 1], ['Weaker where the lines are far apart', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('s2i', short({
  marks: 2,
  stem: 'A small compass is moved round a bar magnet. How does its needle show the direction of the field at each place?',
  wl: null,
  model: 'The needle **lies along the field line** through that place, with its **N end pointing the way the field points**, away from the N pole of the magnet.',
  sol: 'Needle along the line, N end in the field direction.',
  scheme: [['Needle lies along the field line', 1], ['N end gives the direction of the field', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('s3g', short({
  marks: 3,
  stem: 'Describe the field lines of a bar magnet: where they start and end outside it, what they do inside it, and how their spacing shows the strength of the field.',
  wl: null,
  model: 'Outside the magnet the lines **start at the N pole and end at the S pole**; inside, they run from **S to N**, so each line is a **closed curve**. The lines are **crowded near the poles**, showing a strong field, and **far apart elsewhere**, showing a weak field.',
  sol: 'N to S outside, S to N inside; crowded where strong.',
  scheme: [['N to S outside the magnet', 1], ['S to N inside, closed curves', 1], ['Spacing shows the strength of the field', 1]],
  d: 2, c: 'understanding', t: [2],
}));
