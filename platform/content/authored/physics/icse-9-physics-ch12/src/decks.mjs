// ICSE 9 Physics ch12 Magnetism — Part 1 (t01–t02: induced magnetism, field lines),
// Part 2 (t03–t04: the earth's field and the compass, the combined field and neutral points).
import { sl, deck, table, flow, svgV, r } from '../../icse-9-physics-ch01/src/lib.mjs';
import { INDUCED, CHAIN, FIELD, FIELD_COMPASS, EARTH_FIG, COMB_NN, COMB_NS, RESULTANT } from './svgs.mjs';
import * as K from './calc.mjs';

const fig = {
  ind: svgV(INDUCED, 'A soft iron bar far from a magnet and near its N pole, where the nearer end becomes a S pole'),
  chain: svgV(CHAIN, 'Two nails hanging from the N pole of a magnet, each magnetised by induction'),
  field: svgV(FIELD, 'Field lines of a bar magnet from the N pole to the S pole'),
  comp: svgV(FIELD_COMPASS, 'Compass needles lying along a field line of a bar magnet'),
  earth: svgV(EARTH_FIG, 'The earth as a bar magnet with compass needles'),
  nn: svgV(COMB_NN, 'Combined field with the N pole of the magnet pointing north and two neutral points on the equatorial line'),
  ns: svgV(COMB_NS, 'Combined field with the N pole of the magnet pointing south and two neutral points on the axial line'),
  res: svgV(RESULTANT, 'The resultant of 3 units north and 4 units east is 5 units at 53 degrees east of north'),
};

export const deck1 = deck({
  part: 1,
  title: 'Magnetism — Part 1: Induced magnetism and field lines',
  goals: [
    'Explain why a magnet induces magnetism in iron before it attracts it',
    'Draw the field lines of a bar magnet and state their properties',
    'Use field lines to say where a field is strong and which way it points',
  ],
  slides: [
    sl('title', 'Magnets and their fields', {
      b: 'Part 1: how a magnet makes iron magnetic before it attracts it, and how the field around a magnet is drawn with field lines.',
      v: flow('LR', [['m', 'Magnetic materials'], ['i', 'Induction'], ['f', 'Field lines'], ['p', 'Properties']], [['m', 'i'], ['i', 'f'], ['f', 'p']], 'Flow: magnetic materials, induction, field lines, properties of field lines'),
      n: 'This part asks what happens when iron comes near a magnet, and then shows how the invisible field around a magnet is drawn and read.',
    }),
    sl('concept', 'Magnetic materials and poles', {
      b: '**Iron, steel, nickel and cobalt** are attracted by a magnet; wood, plastic, copper and glass are not. Every magnet has two poles, **N** and **S**: **like poles repel and unlike poles attract**.',
      v: table(['Attracted by a magnet', 'Not attracted'], [['iron, steel', 'wood, plastic'], ['nickel, cobalt', 'copper, glass']], 'Table of materials attracted and not attracted by a magnet'),
      n: 'Iron, steel, nickel and cobalt are magnetic materials. Wood, plastic, copper and glass are not. Like poles push apart, and unlike poles pull together.',
    }),
    sl('diagram', 'Induced magnetism', {
      b: 'Bring a soft iron bar near the **N pole** of a magnet. The magnet **induces** poles in it: the **nearer end becomes a S pole** and the **far end a N pole**. Unlike poles then attract, so the bar is pulled towards the magnet.',
      v: fig.ind,
      n: 'Far from the magnet the iron bar has no poles. Near the north pole of the magnet, the nearer end of the bar becomes a south pole and the far end a north pole. Then the bar is attracted.',
    }),
    sl('concept', 'Induction precedes attraction', {
      b: 'A magnet can attract iron **only after** it has made the iron magnetic by induction. An unmagnetised iron piece is attracted too, so **attraction is not a sure test** of a magnet. **Repulsion** is the sure test.',
      v: table(['Test', 'Magnet', 'Unmagnetised iron'], [['Brought near a N pole', 'attracts or repels', 'attracts only']], 'Table comparing a magnet and unmagnetised iron near a pole'),
      n: 'Both a magnet and a plain piece of iron are pulled by a magnet. Only a magnet can be pushed away by it. So repulsion is the sure test for a magnet.',
    }),
    sl('check', 'Quick check: induced poles', {
      b: 'Think of the end of the nail nearest to the pole.',
      v: table(['Item', 'Pole'], [['Magnet end near the nail', 'N']], 'Table giving the pole of the magnet end near the nail'),
      chk: 'chk-ind',
      n: 'The north pole of a magnet is brought near the head of an iron nail. What pole is induced at the head?',
    }),
    sl('example', 'Worked example 1: a chain of nails', {
      b: '**Problem.** Two iron nails hang one below the other from the N pole of a magnet. Give the poles of each nail and explain why the second nail hangs on.\n\n**Step 1.** Nail 1 is magnetised by the magnet: its upper end is a **S pole** and its lower end a **N pole**.\n\n**Step 2.** Nail 1 now acts as a magnet and magnetises nail 2: the upper end of nail 2 is a **S pole** and the lower end a **N pole**.\n\n**Step 3.** The N end of nail 1 attracts the S end of nail 2.',
      v: fig.chain,
      n: 'Each nail is magnetised by the one above it. The lower end of the first nail is a north pole, which attracts the upper end of the second nail, a south pole. Induction comes first, then attraction.',
    }),
    sl('diagram', 'Field lines of a bar magnet', {
      b: 'A **field line** shows the direction of the magnetic field. Outside the magnet the lines go from the **N pole to the S pole**; inside they go from S to N, so every line is a **closed curve**.',
      v: fig.field,
      n: 'The lines leave the north pole, curve round and enter the south pole. Inside the magnet they continue from south to north, so each line is a closed loop.',
    }),
    sl('concept', 'Properties of field lines', {
      b: 'Field lines are **closed curves**, with the **tangent** giving the direction of the field. They **never cross**. They are **crowded where the field is strong** and **far apart where it is weak**.',
      v: table(['Property', 'Meaning'], [['Never cross', 'one direction at each point'], ['Crowded lines', 'strong field, near the poles'], ['Parallel and equally spaced', 'uniform field'], ['Closed curves', 'N to S outside, S to N inside']], 'Table of the properties of field lines and what each means'),
      n: 'Lines never cross, because the field has only one direction at a point. Where the lines crowd together the field is strong. Parallel lines that are equally spaced show a uniform field.',
    }),
    sl('check', 'Quick check: crossing lines', {
      b: 'How many directions can the field have at one point?',
      v: table(['Statement', 'True?'], [['Field lines cross at a point', '?']], 'Table asking whether field lines can cross'),
      chk: 'chk-lines',
      n: 'Two field lines are drawn crossing each other at a point. Why is this impossible?',
    }),
    sl('diagram', 'Plotting a field line with a compass', {
      b: 'Place a small compass near the N pole. Mark the two ends of the needle, move the compass so that one end sits on the second dot, and repeat. Join the dots and add an arrow. The needle always lies **along the line**.',
      v: fig.comp,
      n: 'The needle of a small compass lies along the field line, with its north end pointing the way the field points. Moving the compass step by step and marking dots draws the line.',
    }),
    sl('example', 'Worked example 2: reading a field diagram', {
      b: '**Problem.** On a diagram of a bar magnet, which place has the strongest field and which way does a compass needle point just beyond the N pole?\n\n**Step 1.** The lines are most crowded near the **poles**, so the field is strongest there and weakest far away.\n\n**Step 2.** Beyond the N pole the lines point **away from the magnet**, so the N end of the needle points away from the magnet.',
      v: fig.field,
      n: 'Look for where the lines crowd together, near the poles, for the strongest field. Beyond the north pole the lines point away from the magnet, so the north end of a compass needle points away too.',
    }),
    sl('check', 'Quick check: direction at a point', {
      b: 'Outside the magnet the lines run from N to S.',
      v: table(['Point', 'Position'], [['Above the middle of a magnet', 'N pole on the right']], 'Table giving a point above the middle of a bar magnet'),
      chk: 'chk-dir',
      n: 'A bar magnet has its north pole on the right. A small compass is placed above its middle. Which way does the north end of the needle point?',
    }),
    sl('check', 'Quick check: strength of the field', {
      b: 'Where are the lines closest together?',
      v: table(['Place', 'Lines'], [['Near a pole', 'close'], ['Far from the magnet', 'spread out']], 'Table of the spacing of field lines near and far from a pole'),
      chk: 'chk-strong',
      n: 'A diagram shows the field lines of a magnet. Where is the field strongest?',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'A magnet first induces opposite poles in iron (nearer end unlike), then attracts it.',
        'Repulsion, not attraction, is the sure test for a magnet.',
        'Field lines go N to S outside a magnet, never cross, and crowd where the field is strong.',
        'A compass needle lies along a field line.',
      ],
      v: table(['Idea', 'Key fact'], [['Induction', 'comes before attraction'], ['Sure test', 'repulsion'], ['Field lines', 'closed, never cross']], 'Summary table of the main facts of Part 1'),
      n: 'To sum up. A magnet magnetises iron by induction before it attracts it. Only repulsion proves a magnet. Field lines run from north to south outside, never cross and crowd where the field is strong.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'Name the induced poles: the nearer end is the unlike pole.',
        'Always put arrows on field lines, from N to S outside the magnet.',
        'Never draw lines that cross or stop in mid-air.',
        'Use repulsion, not attraction, as the test for a magnet.',
      ],
      v: table(['Slip', 'Fix'], [['Attraction proves a magnet', 'Only repulsion does']], 'Table of a common slip and its fix'),
      n: 'Exam tips. Name the induced poles correctly. Draw arrows on every field line. Do not let lines cross. And remember that only repulsion is a sure test for a magnet.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: "Magnetism — Part 2: The earth's field and neutral points",
  goals: [
    "Give evidence for the earth's magnetic field and explain how a compass shows direction",
    'Locate the neutral points of a bar magnet placed with its N pole pointing north and pointing south',
    'Explain why the net field is zero at a neutral point and find the resultant of two fields',
  ],
  slides: [
    sl('title', 'The earth as a magnet', {
      b: "Part 2: the earth's own magnetic field, the compass, and the points near a magnet where the magnet's field and the earth's field cancel.",
      v: flow('LR', [['e', 'Earth as a magnet'], ['c', 'Compass'], ['n', 'Combined field'], ['z', 'Neutral points']], [['e', 'c'], ['c', 'n'], ['n', 'z']], 'Flow: the earth as a magnet, the compass, the combined field, neutral points'),
      n: 'This part treats the earth as a giant magnet, shows how a compass uses its field, and then finds the special points where a bar magnet and the earth cancel each other.',
    }),
    sl('diagram', 'The earth as a bar magnet', {
      b: 'The earth acts like a huge bar magnet. Its **magnetic S pole is near the geographic north** and its magnetic N pole near the geographic south. The N pole of a compass is attracted to the S pole in the north.',
      v: fig.earth,
      n: 'The earth behaves like a bar magnet whose south pole is near the geographic north. A compass needle, a tiny magnet, lines up with the field, and its north end points towards the geographic north.',
    }),
    sl('concept', 'Evidence for the earth’s field', {
      b: 'A **freely suspended bar magnet** or a pivoted needle always rests along the **north-south line**. Soft iron left in that line for a long time becomes weakly magnetised. Neutral points exist near magnets.',
      v: table(['Observation', 'Meaning'], [['Suspended magnet settles north-south', 'a field acts on it'], ['Compass needle points north', 'the field points north'], ['Neutral points near a magnet', 'a second field cancels the magnet’s']], 'Table of evidence for the earth’s magnetic field'),
      n: 'A freely hanging magnet always comes to rest pointing north and south. That shows a magnetic field is acting on it everywhere, and the field belongs to the earth.',
    }),
    sl('check', 'Quick check: why the needle points north', {
      b: 'Unlike poles attract.',
      v: table(['Needle end', 'Attracted to'], [['N pole of the needle', '?']], 'Table asking what the north pole of a needle is attracted to'),
      chk: 'chk-compass',
      n: 'The north pole of a compass needle points to the geographic north. Why?',
    }),
    sl('concept', 'The compass and the uniform field', {
      b: 'A **compass** is a small magnetised needle on a pivot; its N pole points roughly **north**. Over a small region, the earth’s field is **uniform**: parallel, equally spaced lines pointing north.',
      v: table(['Region', 'Earth’s field'], [['A laboratory table', 'uniform, pointing north'], ['The whole earth', 'changes from place to place']], 'Table of the earth’s field over a small region and over the whole earth'),
      n: 'Over a table or a classroom the earth’s field is the same everywhere, with straight parallel lines pointing north. Over the whole earth it changes from place to place.',
    }),
    sl('concept', 'Neutral points', {
      b: 'Near a bar magnet the field is the **sum** of the magnet’s field and the earth’s uniform field. A **neutral point** is a point where they are **equal and opposite**, so the **resultant field is zero**. A compass there can rest in any direction.',
      v: table(['At a neutral point', 'Value'], [['Magnet’s field', 'equal to the earth’s'], ['Directions', 'opposite'], ['Resultant field', 'zero']], 'Table describing a neutral point'),
      n: 'At a neutral point the magnet pulls one way and the earth pulls the opposite way with the same strength. The two cancel, the resultant field is zero, and a compass needle there is not turned at all.',
    }),
    sl('diagram', 'N pole pointing north', {
      b: 'With the magnet’s **N pole pointing north**, its field on the **equatorial line** points south, against the earth’s field. The **two neutral points are on the equatorial line**, one on each side.',
      v: fig.nn,
      n: 'With the north pole of the magnet pointing north, the field of the magnet on the line through its middle, at right angles to its length, points south. It opposes the earth, so the neutral points lie there, east and west of the magnet.',
    }),
    sl('diagram', 'N pole pointing south', {
      b: 'With the magnet’s **N pole pointing south**, its field on the **axial line** points south, against the earth’s field. The **two neutral points are on the axial line**, one beyond each pole.',
      v: fig.ns,
      n: 'Turn the magnet round so that its north pole points south. Now the field of the magnet along its length opposes the earth, so the neutral points lie on that line, one beyond each end of the magnet.',
    }),
    sl('check', 'Quick check: where are the neutral points?', {
      b: 'N pole pointing north: look at the line at right angles to the magnet.',
      v: table(['Magnet', 'N pole points'], [['Bar magnet', 'north']], 'Table giving the direction of the N pole of a bar magnet'),
      chk: 'chk-n1',
      n: 'A bar magnet is placed with its north pole pointing north. On which line do its neutral points lie?',
    }),
    sl('check', 'Quick check: the other way round', {
      b: 'N pole pointing south: look along the length of the magnet.',
      v: table(['Magnet', 'N pole points'], [['Bar magnet', 'south']], 'Table giving the direction of the N pole of a bar magnet'),
      chk: 'chk-n2',
      n: 'The magnet is turned so that its north pole points south. On which line do its neutral points lie?',
    }),
    sl('example', 'Worked example 1: distance of a neutral point from a pole', {
      b: r`**Problem.** A neutral point lies on the equatorial line, ${K.EQ1.d} cm from the centre of a ${K.EQ1.len} cm magnet. Find its distance from each pole. (The poles are taken at the ends.)

**Step 1.** Each pole is ${K.EQ1_HALF} cm from the centre, at right angles to the line to the neutral point.

**Step 2.** $d = \sqrt{${K.EQ1.d}^2 + ${K.EQ1_HALF}^2} = \sqrt{${K.EQ1.d ** 2 + K.EQ1_HALF ** 2}} = ${K.EQ1_POLE}$ cm.`,
      v: table(['Quantity', 'Value'], [['Magnet length', `${K.EQ1.len} cm`], ['Half length', `${K.EQ1_HALF} cm`], ['Centre to neutral point', `${K.EQ1.d} cm`], ['Pole to neutral point', `${K.EQ1_POLE} cm`]], 'Table of the lengths in the neutral point problem'),
      n: 'The neutral point, the centre and a pole form a right angled triangle. Six and eight give a hypotenuse of ten, so the neutral point is ten centimetres from each pole.',
    }),
    sl('example', 'Worked example 2: the direction of a compass needle', {
      b: r`**Problem.** At a point the earth's field is ${K.RES.earth} units north and a magnet's field is ${K.RES.magnet} units east. Find the resultant field.

**Step 1.** The fields are at right angles, so $R = \sqrt{${K.RES.earth}^2 + ${K.RES.magnet}^2} = ${K.RES_MAG}$ units.

**Step 2.** The angle from north is $\tan^{-1}\dfrac{${K.RES.magnet}}{${K.RES.earth}} \approx ${K.RES_ANG}^\circ$ towards the east. A compass lies along this direction.`,
      v: fig.res,
      n: 'Draw the two fields as arrows at right angles. The resultant is the diagonal, five units long. A compass needle at the point lies along that diagonal, about fifty three degrees east of north.',
    }),
    sl('check', 'Quick check: equal fields at right angles', {
      b: 'The resultant lies between the two fields.',
      v: table(['Earth’s field', 'Magnet’s field'], [['4 units north', '4 units east']], 'Table of two equal fields at right angles'),
      chk: 'chk-res',
      n: 'The earth’s field is four units to the north and a magnet’s field at the same point is four units to the east. In which direction does a compass needle point?',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'The earth is a huge magnet; its magnetic S pole is near the geographic north.',
        'A compass needle lies along the field with its N pole pointing north.',
        'A neutral point is where the magnet’s field and the earth’s field are equal and opposite: the resultant is zero.',
        'N pole north: neutral points on the equatorial line. N pole south: on the axial line.',
      ],
      v: table(['N pole points', 'Neutral points lie on'], [['north', 'equatorial line'], ['south', 'axial line']], 'Summary table of where the neutral points lie'),
      n: 'To sum up. The earth acts as a magnet. A neutral point is where two fields cancel. With the north pole of the magnet pointing north the neutral points are on the equatorial line, and pointing south they are on the axial line.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'Say the earth’s magnetic S pole is near the geographic north.',
        'For a neutral point say the fields are equal and opposite, so the resultant is zero.',
        'Match the line to the orientation: N north gives equatorial, N south gives axial.',
        'For a distance from a pole use a right angled triangle, and give the unit.',
      ],
      v: table(['Slip', 'Fix'], [['Neutral points on the wrong line', 'Check which way the N pole points'], ['Distance from the centre given for a pole', 'Use the right angled triangle']], 'Table of two common slips in Part 2 and their fixes'),
      n: 'Exam tips. Name the earth’s magnetic south pole in the north. Say equal and opposite for a neutral point. Choose the equatorial or the axial line from the way the north pole points. And use a right angled triangle for distances.',
    }),
  ],
});
