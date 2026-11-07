// ICSE 10 Physics ch10 Electromagnetism — question bank (ICSE 2027 specimen style). Per the syllabus the DC motor and AC
// generator are examined by parts and energy transfer only. Directions are checked with cross products (x east or right,
// y north or up the page, z up or out of the page); numerical values are computed and asserted by re-solve checks.
import { mk, add, r, near } from './lib.mjs';

const { mcq, ar, tf, fill, match, num, short, long } = mk;
const f = (x, n = 3) => String(Number(x.toPrecision(n)));
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const same = (a, b) => a.every((v, i) => Math.abs(v - b[i]) < 1e-12);

// ---------------------------------------------------------------- t01 Oersted; fields of a wire and a loop; thumb rule
add('thumb-mcq', mcq({
  stem: 'A long straight wire lies flat on this page and carries a current from the bottom of the page towards the top. At a point just to the right of the wire, the magnetic field is directed:',
  right: 'into the page',
  wrong: ['out of the page', 'towards the top of the page', 'to the right, away from the wire'],
  sol: 'Right hand: thumb up the page; the fingers curl into the page on the right of the wire — option (@K).',
  d: 3, c: 'application', t: [1],
}), () => same(cross([0, 1, 0], [1, 0, 0]), [0, 0, -1]) || 'B');
add('oersted-mcq', mcq({
  stem: 'In Oersted’s experiment, a compass needle lying under a wire swung away from north when a current was switched on. This showed that:',
  right: 'an electric current produces a magnetic field around it',
  wrong: ['a magnet produces an electric current in a wire', 'the wire had become a permanent magnet', 'the Earth’s magnetic field had reversed'],
  sol: 'The current’s own magnetic field deflected the needle — option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
add('spacing-mcq', mcq({
  stem: 'Iron filings are sprinkled on a card through which a long straight wire passes vertically, carrying a large current. The pattern shows:',
  right: 'concentric circles that are farther apart at greater distances from the wire',
  wrong: ['straight lines radiating outwards from the wire', 'circles that are equally spaced at all distances', 'lines parallel to the wire'],
  sol: 'The field lines are circles round the wire, and the field weakens with distance — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('reverse-mcq', mcq({
  stem: 'A long vertical wire passes through a horizontal card and carries a current upwards. A small compass on the card, due east of the wire, has its north pole pointing north (the field of the wire is much stronger than the Earth’s). The current is now reversed and the compass is moved to a point due west of the wire. Its north pole now points:',
  right: 'north',
  wrong: ['south', 'east', 'west'],
  sol: 'Upward current: the field is anticlockwise seen from above, so east of the wire it points north. Reversing the current makes the field clockwise, and west of the wire a clockwise field also points north. Both changes cancel — option (@K).',
  d: 3, c: 'application', t: [1],
}), () => same(cross([0, 0, 1], [1, 0, 0]), [0, 1, 0]) && same(cross([0, 0, -1], [-1, 0, 0]), [0, 1, 0]) || 'N');
add('thumb-ar', ar({
  a: 'Reversing the current in a straight wire reverses the direction of the magnetic field around it.',
  r: 'By the right-hand thumb rule, the curl of the fingers gives the field direction when the thumb points along the current.',
  key: 'c',
  sol: 'Both are true; reversing the thumb reverses the curl of the fingers — option (c).',
  d: 2, c: 'understanding', t: [1],
}));
add('loop-tf', tf({
  stem: 'Near the centre of a circular loop carrying a current, the magnetic field lines are nearly straight.',
  key: 't',
  sol: 'True: the circles round each part of the loop merge into nearly straight lines along the axis at the centre.',
  d: 2, c: 'understanding', t: [1],
}));
add('oersted-fill', fill({
  stem: 'The deflection of a compass needle by a current in a nearby wire was first observed by ___.',
  acc: [['Oersted', 'Hans Christian Oersted', 'Ørsted']],
  sol: '**Oersted** (1820).',
  d: 1, c: 'recall', t: [1],
}));
add('thumb-fill', fill({
  stem: 'The direction of the magnetic field round a straight current-carrying wire is given by the right-hand ___ rule.',
  acc: [['thumb']],
  sol: 'Right-hand **thumb** rule.',
  d: 1, c: 'recall', t: [1],
}));
add('thumb-short1', short({
  marks: 1,
  stem: 'State the right-hand thumb rule.',
  model: 'Grip the straight conductor in the right hand with the thumb pointing along the current: the direction in which the fingers curl is the direction of the magnetic field lines.',
  sol: 'Thumb along current; fingers give field.',
  scheme: [['Statement', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('oersted-short1', short({
  marks: 1,
  stem: 'What conclusion did Oersted draw when a compass needle near a wire was deflected by a current?',
  model: 'That a current-carrying conductor sets up a magnetic field around itself.',
  sol: 'Current produces a magnetic field.',
  scheme: [['Conclusion', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('clock-short1', short({
  marks: 1,
  stem: 'State the clock rule for finding the polarity of an end of a solenoid.',
  model: 'Look at the end: if the current there flows clockwise the end is a south pole, and if anticlockwise it is a north pole.',
  sol: 'Clockwise S, anticlockwise N.',
  scheme: [['Rule', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('factors-short2', short({
  marks: 2,
  stem: 'A student places a small compass at different distances from a long straight wire carrying a steady current and records how far the needle swings from its starting position. At 2 cm the swing is 40°, at 4 cm it is 22° and at 8 cm it is 11°. (a) What do the readings show about the magnetic field as the distance from the wire increases? (b) The student wants the swing at 8 cm to be about 22°. What should be changed in the circuit, and why will it work?',
  model: '(a) The field gets weaker as the distance increases: the swing falls steadily, to roughly half each time the distance is doubled. (b) Increase the current in the wire. A larger current gives a stronger field at every distance, so the needle at 8 cm will swing farther.',
  sol: 'Weaker with distance; more current.',
  scheme: [['(a)', 1], ['(b)', 1]],
  d: 3, c: 'analysis', t: [1],
}));
add('loop-short2', short({
  marks: 2,
  stem: 'A circular coil hangs in a vertical plane and carries a current. (a) Describe the field lines near the centre of the coil. (b) Seen from one face, the current flows anticlockwise. Which magnetic pole does that face behave as?',
  model: '(a) Near the centre they are almost straight and parallel, along the axis of the coil, at right angles to its plane. (b) A north pole.',
  sol: 'Straight along the axis; north.',
  scheme: [['(a)', 1], ['(b)', 1]],
  d: 2, c: 'application', t: [1, 2],
}));

// ---------------------------------------------------------------- t02 solenoid and electromagnets
add('emag-mcq', mcq({
  stem: 'A student winds a coil on an iron nail and counts the paper clips it lifts. With 20 turns and 1.0 A it lifts 4 clips; with 40 turns and 1.0 A it lifts 8 clips; with 20 turns and 2.0 A it lifts 8 clips. Using the pattern in these readings, the number of clips lifted with 40 turns and 2.0 A would be about:',
  right: '16',
  wrong: ['12', '8', '32'],
  sol: 'Doubling the turns doubles the strength (4 to 8) and doubling the current doubles it as well (4 to 8). Doing both doubles it twice: 4 × 2 × 2 = 16 — option (@K). Adding the two gains (12) ignores that the effects multiply.',
  d: 3, c: 'analysis', t: [2],
}), () => 4 * 2 * 2 === 16 || 'clips');
add('core-mcq', mcq({
  stem: 'In an electric bell, the electromagnet pulls an iron armature, which makes the hammer strike the gong and also breaks the circuit so that a spring can pull the armature back. If the soft iron core were replaced by a steel rod of the same size, the bell would most likely:',
  right: 'ring once and then stick, because the steel stays magnetised and keeps holding the armature',
  wrong: ['ring continuously, but more loudly, because steel makes a stronger magnet', 'not ring at all, because steel cannot be magnetised', 'ring continuously, because steel conducts current better than iron'],
  sol: 'The bell works only if the core loses its magnetism as soon as the circuit breaks. A steel core stays magnetised, so the armature stays pulled in — option (@K).',
  d: 3, c: 'application', t: [2],
}));
add('pins-mcq', mcq({
  stem: 'An electromagnet is holding a cluster of iron pins. The key in its circuit is opened. The pins fall because:',
  right: 'the soft iron core loses its magnetism when the current stops',
  wrong: ['the pins become magnetised with the opposite polarity', 'the coil becomes a permanent magnet', 'the Earth’s field becomes stronger than the core’s'],
  sol: 'No current, no magnetising field, and soft iron does not retain magnetism — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('perm-mcq', mcq({
  stem: 'A shop’s fire door is held open against a spring by a magnet fixed in the wall. When the fire alarm trips, the door must close by itself. The wall magnet should be:',
  right: 'an electromagnet, switched off by the alarm so that it lets go of the door',
  wrong: ['a permanent magnet, because it never loses its strength', 'a permanent magnet, because the alarm can reverse its poles', 'an electromagnet with a steel core, which keeps holding the door after the current stops'],
  sol: 'Only an electromagnet with a soft iron core can be switched off to release the door; a permanent magnet cannot, and a steel core would stay magnetised — option (@K).',
  d: 3, c: 'application', t: [2],
}));
add('compass-mcq', mcq({
  stem: 'Seen from its left end, the current in the coil of an electromagnet flows anticlockwise. A small compass is placed just beyond that left end, on the axis. The north pole of the compass needle points:',
  right: 'away from the electromagnet',
  wrong: ['towards the electromagnet', 'at right angles to the axis', 'in no particular direction, because the core is soft iron'],
  sol: 'Clock rule: anticlockwise means the left end is a north pole, which repels the north pole of the needle — option (@K).',
  d: 3, c: 'application', t: [2],
}));
add('emag-ar', ar({
  a: 'A coil with a soft iron core makes a stronger magnet than the same coil, carrying the same current, without a core.',
  r: 'Soft iron is a good conductor of electricity.',
  key: 'd',
  sol: 'Both are true, but the core strengthens the magnet because soft iron is easily magnetised, not because it conducts electricity — option (d).',
  d: 3, c: 'analysis', t: [2],
}));
add('perm-tf', tf({
  stem: 'A permanent magnet can be switched off when it is not needed.',
  key: 'f',
  sol: 'False: only an electromagnet can be switched off, by stopping its current.',
  d: 1, c: 'understanding', t: [2],
}));
add('emag-fill', fill({
  stem: 'The core of an electromagnet is made of ___ iron.',
  acc: [['soft']],
  sol: '**Soft** iron.',
  d: 1, c: 'recall', t: [2],
}));
add('pole-fill', fill({
  stem: 'Looking at the left end of a solenoid, Arjun sees the current flowing anticlockwise. He brings the south pole of a bar magnet towards that end. The magnet and the solenoid ___ each other.',
  acc: [['attract', 'attracts', 'attracted']],
  sol: 'Clock rule: anticlockwise makes the left end a north pole, and a south pole is attracted to it, so they **attract**.',
  d: 3, c: 'application', t: [2],
}));
add('emag-short2', short({
  marks: 2,
  stem: 'State two differences between an electromagnet and a permanent magnet.',
  model: 'An electromagnet is magnetic only while current flows; a permanent magnet keeps its magnetism. The strength and polarity of an electromagnet can be changed by changing the current; those of a permanent magnet are fixed.',
  sol: 'Two differences.',
  scheme: [['First difference', 1], ['Second difference', 1]],
  d: 1, c: 'understanding', t: [2],
}));
add('emag-short3', short({
  marks: 3,
  stem: 'A junkyard uses an electromagnet hung from a crane to move scrap cars. (a) Name two ways to make it lift heavier loads. (b) Why is its core made of soft iron? (c) Why can it not be used to move scrap aluminium?',
  model: '(a) Increase the current in the coil; increase the number of turns. (b) Soft iron is strongly magnetised while the current flows and lets go of the load when the current is switched off. (c) Aluminium is not attracted by a magnet (it is not a magnetic material).',
  sol: 'Current and turns; soft iron; aluminium non-magnetic.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 2, c: 'application', t: [2],
}));

// ---------------------------------------------------------------- t03 force on a conductor; left-hand rule; DC motor
add('motor-mcq', mcq({
  stem: 'The electric motor inside a table fan converts:',
  right: 'electrical energy into mechanical energy',
  wrong: ['mechanical energy into electrical energy', 'electrical energy into chemical energy', 'heat energy into electrical energy'],
  sol: 'A motor uses a current to produce motion — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('flhr-mcq', mcq({
  stem: 'In Fleming’s left-hand rule, the forefinger points in the direction of the:',
  right: 'magnetic field',
  wrong: ['current', 'force on the conductor', 'motion of the magnet'],
  sol: 'Forefinger — field, middle finger — current, thumb — force — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('forcedir-mcq', mcq({
  stem: 'A vertical wire carries a current upwards. A uniform magnetic field acts horizontally towards the north. The force on the wire acts towards the:',
  right: 'west',
  wrong: ['east', 'north', 'south'],
  sol: 'Left hand: forefinger north, middle finger up; the thumb points west — option (@K).',
  d: 4, c: 'analysis', t: [3],
}), () => same(cross([0, 0, 1], [0, 1, 0]), [-1, 0, 0]) || 'F');
add('parallel-mcq', mcq({
  stem: 'A horizontal rod lies east–west and carries a current from west to east in a uniform horizontal magnetic field pointing north. The rod is pushed upwards. If both the current and the field are now reversed together, the rod is pushed:',
  right: 'upwards, as before',
  wrong: ['downwards', 'towards the north', 'nowhere, because the force becomes zero'],
  sol: 'Left hand: forefinger north, middle finger east, so the thumb points up. Reversing only one of the two would reverse the force, but reversing both restores it: upwards again — option (@K).',
  d: 3, c: 'application', t: [3],
}), () => same(cross([1, 0, 0], [0, 1, 0]), [0, 0, 1]) && same(cross([-1, 0, 0], [0, -1, 0]), [0, 0, 1]) || 'F');
add('parts-mcq', mcq({
  stem: 'In a simple DC motor, the parts that press on the split rings and connect the rotating coil to the battery are the:',
  right: 'carbon brushes',
  wrong: ['field magnets', 'slip rings', 'axle bearings'],
  sol: 'The carbon brushes slide on the split rings — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('flhr-ar', ar({
  a: 'A current-carrying wire lying along the magnetic field lines experiences the largest possible force.',
  r: 'The force on a current-carrying wire in a magnetic field is greatest when the wire is at right angles to the field.',
  key: 'b',
  sol: 'A is false: a wire along the field lines experiences no force. R is true — option (b).',
  d: 2, c: 'understanding', t: [3],
}));
add('motor-tf', tf({
  stem: 'A simple DC motor uses two slip rings to connect its coil to the battery.',
  key: 'f',
  sol: 'False: a DC motor uses a split ring commutator; slip rings belong to an AC generator.',
  d: 2, c: 'recall', t: [3, 4],
}));
add('arm-fill', fill({
  stem: 'The coil that turns between the poles of the magnet in a DC motor is called the ___.',
  acc: [['armature']],
  sol: '**Armature**.',
  d: 1, c: 'recall', t: [3],
}));
add('split-fill', fill({
  stem: 'In a DC motor, the ends of the coil are joined to a ___ ring commutator.',
  acc: [['split']],
  sol: '**Split** ring commutator.',
  d: 1, c: 'recall', t: [3],
}));
add('flhr-short2', short({
  marks: 2,
  stem: 'Use Fleming’s left-hand rule to find the direction of the force on a wire in each case. (a) Current due east, field vertically downwards. (b) Current due east, field vertically upwards.',
  model: '(a) Forefinger down, middle finger east: the thumb points north. (b) Reversing the field reverses the force: south.',
  sol: 'North; south.',
  scheme: [['(a)', 1], ['(b)', 1]],
  d: 3, c: 'application', t: [3],
}), () => same(cross([1, 0, 0], [0, 0, -1]), [0, 1, 0]) && same(cross([1, 0, 0], [0, 0, 1]), [0, -1, 0]) || 'F');
add('motor-short2', short({
  marks: 2,
  stem: 'Name four main parts of a simple DC motor and state the energy conversion that takes place in it.',
  model: 'Field magnet (N and S poles), armature coil on an axle, split ring commutator, carbon brushes (and a DC source). It converts electrical energy into mechanical energy.',
  sol: 'Four parts; electrical to mechanical.',
  scheme: [['Four parts', 1], ['Energy conversion', 1]],
  d: 1, c: 'recall', t: [3],
}));

// ---------------------------------------------------------------- t04 electromagnetic induction; right-hand rule; AC generator; household AC
add('induce-mcq', mcq({
  stem: 'A bar magnet is held still inside a coil connected to a galvanometer. It is then pulled out quickly, held still beside the coil, and finally pushed back in slowly. The galvanometer needle shows:',
  right: 'zero, a large swing one way, zero, then a small swing the opposite way',
  wrong: ['zero, a large swing one way, zero, then a small swing the same way', 'zero, a small swing one way, zero, then a large swing the opposite way', 'a steady deflection, a large swing, a steady deflection, then a small swing'],
  sol: 'No change of field means zero; pulling out fast gives a large swing; pushing in reverses the change, so the swing reverses, and slow motion makes it small — option (@K).',
  d: 3, c: 'application', t: [4],
}));
add('frhr-mcq', mcq({
  stem: 'A straight horizontal rod lying north–south is moved due east through a magnetic field that acts vertically downwards. The current induced in the rod flows towards the:',
  right: 'north',
  wrong: ['south', 'east', 'west'],
  sol: 'Right hand: thumb east (motion), forefinger down (field); the middle finger points north — option (@K).',
  d: 3, c: 'analysis', t: [4],
}), () => same(cross([1, 0, 0], [0, 0, -1]), [0, 1, 0]) || 'I');
add('gen-mcq', mcq({
  stem: 'A bicycle dynamo lights the lamp of a cycle. In the dynamo the energy conversion is:',
  right: 'mechanical energy into electrical energy',
  wrong: ['electrical energy into mechanical energy', 'chemical energy into electrical energy', 'light energy into electrical energy'],
  sol: 'A generator (dynamo) converts the energy of motion into electrical energy — option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('slip-mcq', mcq({
  stem: 'In a simple AC generator, the two ends of the armature coil are connected to:',
  right: 'two separate slip rings',
  wrong: ['the two halves of a split ring', 'the two poles of the magnet', 'a single slip ring'],
  sol: 'Each end has its own full slip ring — option (@K).',
  d: 2, c: 'recall', t: [4],
}));
const fq = 1 / 0.02;
add('freq-mcq', mcq({
  stem: 'The mains supply in Kunal’s home completes one full cycle every 20 ms. Its frequency is:',
  right: `${f(fq)} Hz`,
  wrong: ['20 Hz', '0.05 Hz', '500 Hz'],
  sol: `$f = \\dfrac{1}{T} = \\dfrac{1}{0.02} = ${f(fq)}$ Hz — option (@K).`,
  d: 2, c: 'understanding', t: [4],
}), () => near(fq, 50) || 'f');
add('speed-mcq', mcq({
  stem: 'Pushing the north pole of a magnet slowly into a coil makes the galvanometer needle swing to the right. The same pole is then pulled out of the coil more quickly. The needle swings:',
  right: 'to the left, by a larger amount',
  wrong: ['to the right, by a larger amount', 'to the left, by a smaller amount', 'not at all, because the magnet is leaving the coil'],
  sol: 'Pulling out reverses the change of field, so the swing reverses (left); the faster change makes it larger — option (@K).',
  d: 3, c: 'application', t: [4],
}));
add('induced-ar', ar({
  a: 'A current is induced in a closed coil when a bar magnet is moved towards it.',
  r: 'The magnetic field linked with the coil changes while the magnet moves.',
  key: 'c',
  sol: 'Both are true, and the changing field is the cause of the induced current — option (c).',
  d: 2, c: 'understanding', t: [4],
}));
add('induce-tf', tf({
  stem: 'Moving a coil towards a stationary magnet induces a current in it, just as moving the magnet towards the coil does.',
  key: 't',
  sol: 'True: only relative motion matters.',
  d: 2, c: 'understanding', t: [4],
}));
add('emi-fill', fill({
  stem: 'The production of a current in a coil by changing the magnetic field linked with it is called electromagnetic ___.',
  acc: [['induction']],
  sol: 'Electromagnetic **induction**.',
  d: 1, c: 'recall', t: [4],
}));
add('slip-fill', fill({
  stem: 'In an AC generator, the two ends of the coil are joined to two ___ rings.',
  acc: [['slip']],
  sol: '**Slip** rings.',
  d: 1, c: 'recall', t: [4],
}));
const T60 = (15 * 1000) / 60;
add('period-num', num({
  stem: 'In some countries the mains supply has a frequency of 60 Hz. How long, in milliseconds, does the supply take to go through 15 complete cycles?',
  value: T60, tol: 0.5, unit: 'ms',
  sol: r`$T = \dfrac{1}{60}$ s, so 15 cycles take $15 \times \dfrac{1}{60} = 0.25$ s $= 250$ ms.`,
  scheme: [['250 ms', 1]],
  d: 3, c: 'understanding', t: [4],
}), () => near(T60, 250) || 'T');
const cyc = 2 * 50 * 180;
add('cycles-num', num({
  stem: 'A lamp is connected to the 50 Hz mains for 3 minutes. How many times does the current in the lamp reverse its direction in this time?',
  value: cyc, tol: 0, unit: null,
  sol: r`$t = 180$ s, so cycles $= 50 \times 180 = 9000$. The current reverses twice in every cycle, so reversals $= 2 \times 9000 = 18000$.`,
  scheme: [['18000', 1]],
  d: 3, c: 'application', t: [4],
}), () => cyc === 18000 || 'cycles');
add('emi-short2', short({
  marks: 2,
  stem: 'A coil is joined to a galvanometer. Pushing the north pole of a bar magnet into the coil at a steady speed makes the needle swing to the right. Predict the swing, with a reason, when (a) the same north pole is pulled out again at the same speed, and (b) the south pole is pushed in at twice that speed.',
  model: '(a) The needle swings to the left by about the same amount: the field through the coil is now decreasing, so the induced current is reversed. (b) The needle swings to the left, because the opposite pole reverses the direction of the change, and by a larger amount, because the field changes faster.',
  sol: 'Left, same size; left, larger.',
  scheme: [['(a)', 1], ['(b)', 1]],
  d: 3, c: 'application', t: [4],
}));
add('gen-short2', short({
  marks: 2,
  stem: 'Name the main parts of a simple AC generator and state the energy conversion in it.',
  model: 'Field magnet, armature coil turned on an axle, two slip rings and two carbon brushes (with the external circuit). It converts mechanical energy into electrical energy.',
  sol: 'Parts; mechanical to electrical.',
  scheme: [['Parts', 1], ['Energy conversion', 1]],
  d: 1, c: 'recall', t: [4],
}));
add('frhr-short3', short({
  marks: 3,
  stem: 'A straight wire lies between the poles of a magnet, north pole on the left and south pole on the right. (a) State Fleming’s right-hand rule. (b) Find the direction of the induced current when the wire is pushed downwards. (c) What happens to the current if the wire is moved parallel to the field lines?',
  model: '(a) With the thumb, forefinger and middle finger of the right hand at right angles, the thumb along the motion and the forefinger along the field, the middle finger gives the induced current. (b) Field to the right, motion down: the current flows out of the page. (c) No current is induced, since the wire does not cut across the field.',
  sol: 'Rule; out of the page; zero.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 3, c: 'application', t: [4],
}), () => same(cross([0, -1, 0], [1, 0, 0]), [0, 0, 1]) && same(cross([1, 0, 0], [1, 0, 0]), [0, 0, 0]) || 'I');

// ---------------------------------------------------------------- t05 AC versus DC; transformers
add('trans-mcq', mcq({
  stem: 'A transformer has 400 turns on its primary coil and 8000 turns on its secondary coil. It is a:',
  right: 'step-up transformer',
  wrong: ['step-down transformer', 'DC generator', 'split ring commutator'],
  sol: 'More turns on the secondary raise the voltage — option (@K).',
  d: 1, c: 'understanding', t: [5],
}));
add('dc-mcq', mcq({
  stem: 'A transformer is connected by mistake to a 12 V car battery. After the switch is closed it gives no output, because:',
  right: 'a steady current does not produce a changing magnetic field in the core',
  wrong: ['the battery voltage is too low for any transformer', 'the core becomes a permanent magnet', 'the secondary coil is short-circuited by the battery'],
  sol: 'Induction needs a changing field; steady DC gives none — option (@K).',
  d: 3, c: 'analysis', t: [5],
}));
add('advantage-mcq', mcq({
  stem: 'Two designs send the same electric power through the same long cable: design X at 11 kV and design Y at 440 V. Compared with design Y, design X wastes:',
  right: 'less energy as heat in the cable, because its current is smaller',
  wrong: ['less energy as heat in the cable, because its current is larger', 'more energy as heat in the cable, because a higher voltage heats the wire more', 'the same energy, because the power sent is the same'],
  sol: 'For the same power P = VI, the higher voltage means a much smaller current, and the heat produced in the cable depends on the current — option (@K).',
  d: 3, c: 'application', t: [5],
}));
const VsSD = (220 * 100) / 1000;
const IpSD = (VsSD * 5) / 220;
add('stepdown-mcq', mcq({
  stem: 'A transformer in a hostel has 1000 turns on its primary and 100 turns on its secondary, and its primary is joined to the 220 V mains. The secondary supplies a current of 5 A. Assuming no energy is lost, the current drawn from the mains is:',
  right: '0.5 A',
  wrong: ['50 A', '5 A', '0.05 A'],
  sol: `$V_{s} = 220 \\times \\dfrac{100}{1000} = ${f(VsSD)}$ V, so the output power is $22 \\times 5 = 110$ W. The primary takes the same power: $I_{p} = \\dfrac{110}{220} = ${f(IpSD)}$ A — option (@K).`,
  d: 3, c: 'application', t: [5],
}), () => near(VsSD, 22) && near(IpSD, 0.5) || 'Ip');
add('trans-ar', ar({
  a: 'A step-down transformer has fewer turns on its secondary coil than on its primary coil.',
  r: 'A step-down transformer raises both the voltage and the current.',
  key: 'a',
  sol: 'A is true (Vs ÷ Vp = Ns ÷ Np). R is false: it lowers the voltage, and the current is stepped up — option (a).',
  d: 2, c: 'understanding', t: [5],
}));
add('trans-tf', tf({
  stem: 'A step-up transformer increases both the voltage and the current.',
  key: 'f',
  sol: 'False: when the voltage is stepped up, the current is stepped down (power in about equals power out).',
  d: 3, c: 'understanding', t: [5],
}));
add('trans-fill', fill({
  stem: 'The coil of a transformer that is connected to the AC supply is called the ___ coil.',
  acc: [['primary']],
  sol: '**Primary** coil.',
  d: 1, c: 'recall', t: [5],
}));
const Vs1 = (220 * 240) / 2200;
const P1 = Vs1 * 0.5;
add('vs-num', num({
  stem: 'The transformer of a bedside lamp has 2200 turns on its primary and 240 turns on its secondary, and its primary is connected to the 220 V mains. A small lamp joined across the secondary draws a current of 0.5 A. Find the power delivered to the lamp, in watts.',
  value: P1, tol: 0.01, unit: 'W',
  sol: r`$V_{s} = V_{p} \times \dfrac{N_{s}}{N_{p}} = 220 \times \dfrac{240}{2200} = 24$ V, so $P = V_{s}I_{s} = 24 \times 0.5 = 12$ W.`,
  scheme: [['12 W', 1]],
  d: 3, c: 'application', t: [5],
}), () => near(Vs1, 24) && near(P1, 12) || 'Vs');
const Ns2 = (150 * (220 * 5)) / (220 * 0.5);
add('ns-num', num({
  stem: 'An ideal step-up transformer in a microwave oven takes 5 A from the 220 V mains and delivers a current of 0.5 A at its output. Its primary has 150 turns. How many turns does its secondary have?',
  value: Ns2, tol: 0, unit: 'turns',
  sol: r`For an ideal transformer $V_{p}I_{p} = V_{s}I_{s}$, so $\dfrac{V_{s}}{V_{p}} = \dfrac{I_{p}}{I_{s}} = \dfrac{5}{0.5} = 10$ and $N_{s} = N_{p} \times \dfrac{V_{s}}{V_{p}} = 150 \times 10 = 1500$.`,
  scheme: [['1500 turns', 1]],
  d: 3, c: 'application', t: [5],
}), () => Ns2 === 1500 || 'Ns');
const Ip = (11 * 4) / 220;
add('ip-num', num({
  stem: 'An ideal transformer steps 220 V down to 11 V for a set of garden lights that draw 4 A. Assuming no energy is lost, find the current, in amperes, taken from the mains by the primary coil.',
  value: Ip, tol: 0.001, unit: 'A',
  sol: r`$V_{p}I_{p} = V_{s}I_{s}$: $I_{p} = \dfrac{11 \times 4}{220} = 0.2$ A.`,
  scheme: [['0.2 A', 1]],
  d: 4, c: 'analysis', t: [5],
}), () => near(Ip, 0.2) || 'Ip');
const effT = ((22 * 4) / (220 * 0.5)) * 100;
add('turns-num', num({
  stem: 'A transformer takes a current of 0.5 A from the 220 V mains. Its secondary delivers 4 A at 22 V to a set of lamps. Find the efficiency of the transformer, as a percentage.',
  value: effT, tol: 0.1, unit: '%',
  sol: r`Input power $= 220 \times 0.5 = 110$ W; output power $= 22 \times 4 = 88$ W. Efficiency $= \dfrac{88}{110} \times 100 = 80\%$.`,
  scheme: [['80 %', 1]],
  d: 3, c: 'application', t: [5],
}), () => near(effT, 80) || 'eff');
add('hz-short1', short({
  marks: 1,
  stem: 'What is the frequency of the AC mains supply in India, and how long does one cycle take?',
  model: 'It is 50 Hz, so each cycle lasts one-fiftieth of a second, 20 ms.',
  sol: '50 Hz; 0.02 s.',
  scheme: [['Both', 1]],
  d: 1, c: 'recall', t: [4],
}));
add('acdc-short2', short({
  marks: 2,
  stem: 'A power station sends 22 kW of electric power to a town through two long, thin cables. (a) Find the current in the cables if the power is sent at 220 V, and if it is sent at 22000 V. (b) Which way wastes less energy as heat in the cables, and why can only an alternating supply be changed to that voltage easily?',
  model: '(a) $I = \\dfrac{P}{V}$: at 220 V, $I = \\dfrac{22000}{220} = 100$ A; at 22000 V, $I = \\dfrac{22000}{22000} = 1$ A. (b) Sending at 22000 V wastes far less energy, because its current is 100 times smaller and the heating of the cables depends on the current. A transformer, which works only on AC, can raise the voltage for transmission and lower it again for use.',
  sol: '100 A and 1 A; high voltage, transformer needs AC.',
  scheme: [['(a)', 1], ['(b)', 1]],
  d: 3, c: 'application', t: [5],
}), () => near(22000 / 220, 100) && near(22000 / 22000, 1) || 'I');
const VsT = (220 * 30) / 1100;
add('trans-short3', short({
  marks: 3,
  stem: 'A transformer for a toy train has 1100 turns on its primary and 30 turns on its secondary, and its primary is joined to the 220 V mains. (a) Is it a step-up or a step-down transformer? Give a reason. (b) Calculate the output voltage. (c) Why would it not work if joined to a 6 V battery instead?',
  model: r`(a) Step-down: the secondary has fewer turns than the primary. (b) $V_{s} = 220 \times \dfrac{30}{1100} = 6$ V. (c) A battery gives steady DC, which sets up no changing magnetic field in the core, so no voltage is induced in the secondary.`,
  sol: 'Step-down; 6 V; needs AC.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 3, c: 'application', t: [5],
}), () => near(VsT, 6) || 'Vs');

// ---------------------------------------------------------------- match items
add('rule-match', match({
  marks: 2,
  stem: 'Match each rule in Column A with what it is used to find in Column B.',
  pairs: [
    ['Right-hand thumb rule', 'Direction of the field round a straight wire'],
    ['Fleming’s left-hand rule', 'Direction of the force on a current in a field'],
    ['Fleming’s right-hand rule', 'Direction of an induced current'],
    ['Clock rule', 'Polarity of an end of a solenoid'],
  ],
  order: [1, 3, 0, 2],
  sol: 'Thumb rule → field round a wire; left-hand rule → force; right-hand rule → induced current; clock rule → solenoid polarity.',
  d: 2, c: 'understanding', t: [1, 2, 3, 4],
}));
add('device-match', match({
  marks: 2,
  stem: 'Match each device in Column A with the correct description in Column B.',
  pairs: [
    ['DC motor', 'Electrical energy to mechanical energy'],
    ['AC generator', 'Mechanical energy to electrical energy'],
    ['Step-up transformer', 'Raises an alternating voltage'],
    ['Electromagnet', 'A temporary magnet with a soft iron core'],
  ],
  order: [2, 0, 3, 1],
  sol: 'Motor → electrical to mechanical; generator → mechanical to electrical; step-up transformer → raises AC voltage; electromagnet → temporary magnet.',
  d: 1, c: 'recall', t: [2, 3, 4, 5],
}));

// ---------------------------------------------------------------- 10-mark structured questions
add('field-long', long({
  stem: '(a) Describe Oersted’s experiment. What did it show? [3]\n\n(b) A long straight wire passes vertically through a horizontal card and carries a current upwards. (i) Describe the pattern of field lines on the card. (ii) Seen from above, are the lines clockwise or anticlockwise? (iii) How does the pattern change if the current is increased? [3]\n\n(c) A solenoid is connected to a battery. (i) Compare its field with that of a bar magnet. (ii) How would you find which end is the north pole? (iii) State two ways of making its field stronger. [4]',
  model: '(a) A wire is stretched along the north–south line just above a compass needle. With no current the needle points north; when a current flows the needle is deflected, and reversing the current reverses the deflection. So an electric current produces a magnetic field around it.\n\n(b) (i) Concentric circles centred on the wire, farther apart away from the wire. (ii) Anticlockwise (thumb pointing up, towards the viewer). (iii) The field becomes stronger: the lines are drawn closer together and extend farther.\n\n(c) (i) Like a bar magnet: straight parallel lines inside, looping from one end to the other outside. (ii) Look at an end: if the current there flows anticlockwise, that end is north (clock rule), or use a compass. (iii) More turns; more current (or a soft iron core).',
  sol: 'Oersted; straight-wire field; solenoid.',
  scheme: [['(a) description', 2], ['(a) conclusion', 1], ['(b)(i)', 1], ['(b)(ii)', 1], ['(b)(iii)', 1], ['(c)(i)', 1], ['(c)(ii)', 1], ['(c)(iii)', 2]],
  d: 2, c: 'understanding', t: [1, 2],
}), () => same(cross([0, 0, 1], [1, 0, 0]), [0, 1, 0]) || 'B');
add('emag-long', long({
  stem: '(a) What is an electromagnet? Why is its core made of soft iron rather than steel? [3]\n\n(b) Give three differences between an electromagnet and a permanent magnet. [3]\n\n(c) (i) Name two devices that use electromagnets. (ii) How can the polarity of an electromagnet be reversed? (iii) Coil P has 300 turns carrying 1 A and coil Q has 150 turns carrying 2.5 A, on identical cores. Using N × I as a measure of strength, which is stronger? [4]',
  model: r`(a) A temporary magnet made by passing a current through a coil wound on a soft iron core. Soft iron is strongly magnetised while the current flows and loses its magnetism when the current stops; steel would stay magnetised.

(b) An electromagnet is magnetic only while current flows, a permanent magnet always; its strength can be changed, a permanent magnet’s is fixed; its polarity can be reversed, a permanent magnet’s cannot.

(c) (i) Electric bell; crane for lifting scrap iron (also relays, loudspeakers). (ii) Reverse the current in the coil. (iii) P: $300 \times 1 = 300$; Q: $150 \times 2.5 = 375$; so Q is stronger.`,
  sol: 'Definition; differences; uses and comparison.',
  scheme: [['(a) definition', 1], ['(a) soft iron', 2], ['(b)', 3], ['(c)(i)', 1], ['(c)(ii)', 1], ['(c)(iii)', 2]],
  d: 2, c: 'application', t: [2],
}), () => 300 * 1 < 150 * 2.5 || 'NI');
add('motor-long', long({
  stem: '(a) State Fleming’s left-hand rule. When is the force on a current-carrying conductor in a magnetic field (i) greatest and (ii) zero? [3]\n\n(b) A horizontal wire carries current due north in a uniform magnetic field. Find the direction of the force when the field is (i) vertically downwards, (ii) vertically upwards and (iii) due north. [3]\n\n(c) (i) Name the four main parts of a simple DC motor. (ii) State its energy conversion. (iii) Name two household appliances that use one. [4]',
  model: '(a) Stretch the thumb, forefinger and middle finger of the left hand at right angles: forefinger along the field, middle finger along the current; the thumb gives the force. (i) Greatest when the conductor is at right angles to the field. (ii) Zero when it lies along the field.\n\n(b) (i) Forefinger down, middle finger north: thumb points west. (ii) Reversed field: east. (iii) Current parallel to the field: no force.\n\n(c) (i) Field magnet, armature coil, split ring commutator, carbon brushes. (ii) Electrical energy to mechanical energy. (iii) Ceiling fan and mixer-grinder (or washing machine, water pump).',
  sol: 'Rule; three directions; motor parts.',
  scheme: [['(a) rule', 1], ['(a)(i)', 1], ['(a)(ii)', 1], ['(b)(i)', 1], ['(b)(ii)', 1], ['(b)(iii)', 1], ['(c)(i)', 2], ['(c)(ii)', 1], ['(c)(iii)', 1]],
  d: 3, c: 'application', t: [3],
}), () => same(cross([0, 1, 0], [0, 0, -1]), [-1, 0, 0]) && same(cross([0, 1, 0], [0, 0, 1]), [1, 0, 0]) && same(cross([0, 1, 0], [0, 1, 0]), [0, 0, 0]) || 'F');
const Tgen = 1 / 50;
add('gen-long', long({
  stem: '(a) Describe an experiment with a coil, a galvanometer and a bar magnet to show electromagnetic induction. State what you observe when the magnet is (i) pushed in, (ii) held still and (iii) pulled out. [3]\n\n(b) State Fleming’s right-hand rule. A wire between the poles of a magnet (N on the left, S on the right) is pushed upwards. Find the direction of the induced current. [3]\n\n(c) (i) Name the main parts of a simple AC generator. (ii) State its energy conversion. (iii) What is the frequency of household AC in India? (iv) Find the time taken for one cycle. [4]',
  model: r`(a) Join a coil to a galvanometer and move a bar magnet relative to the coil. (i) Pushed in: the needle deflects. (ii) Held still: no deflection. (iii) Pulled out: the needle deflects in the opposite direction. A current is induced only while the field through the coil changes.

(b) With the thumb, forefinger and middle finger of the right hand at right angles, thumb along the motion and forefinger along the field, the middle finger gives the induced current. Field to the right, motion up: the current flows into the page.

(c) (i) Field magnet, armature coil, two slip rings, two carbon brushes. (ii) Mechanical energy to electrical energy. (iii) 50 Hz. (iv) $T = \dfrac{1}{50} = 0.02$ s.`,
  sol: 'Induction experiment; right-hand rule; generator and household AC.',
  scheme: [['(a)(i)–(iii)', 3], ['(b) rule', 2], ['(b) direction', 1], ['(c)(i)', 1], ['(c)(ii)', 1], ['(c)(iii)', 1], ['(c)(iv)', 1]],
  d: 2, c: 'application', t: [4],
}), () => near(Tgen, 0.02) && same(cross([0, 1, 0], [1, 0, 0]), [0, 0, -1]) || 'gen');
const Vs3 = (220 * 10000) / 500;
const Ns3 = (5000 * 220) / 11000;
const Is3 = (220 * 0.5) / 11;
add('trans-long', long({
  stem: '(a) Give two advantages of AC over DC. Why is DC still needed for some purposes? [3]\n\n(b) (i) A transformer has 500 turns on its primary and 10000 turns on its secondary, with 220 V on the primary. Find the output voltage. (ii) A pole transformer steps 11000 V down to 220 V and has 5000 turns on its primary. How many turns are on its secondary? [3]\n\n(c) (i) Why is power transmitted at a high voltage? (ii) Why does a transformer not work on DC? (iii) An ideal transformer takes 0.5 A from the 220 V mains and gives 11 V. Find the output current. (iv) Is this transformer step-up or step-down? [4]',
  model: r`(a) AC voltage can be changed easily with transformers, allowing high-voltage transmission with little loss; AC generators are simpler for large power and AC is easily converted to DC. DC is needed for charging batteries and electroplating, which need current in one direction.

(b) (i) $V_{s} = 220 \times \dfrac{10000}{500} = 4400$ V. (ii) $N_{s} = 5000 \times \dfrac{220}{11000} = 100$ turns.

(c) (i) For the same power, a high voltage means a small current, so less energy is lost as heat in the lines. (ii) A steady current gives no changing magnetic field, so nothing is induced in the secondary. (iii) $I_{s} = \dfrac{220 \times 0.5}{11} = 10$ A. (iv) Step-down.`,
  sol: 'AC advantages; two transformer sums; transmission and ideal transformer.',
  scheme: [['(a) advantages', 2], ['(a) DC uses', 1], ['(b)(i)', 1.5], ['(b)(ii)', 1.5], ['(c)(i)', 1], ['(c)(ii)', 1], ['(c)(iii)', 1], ['(c)(iv)', 1]],
  d: 4, c: 'analysis', t: [5],
}), () => near(Vs3, 4400) && near(Ns3, 100) && near(Is3, 10) || 'trans');
