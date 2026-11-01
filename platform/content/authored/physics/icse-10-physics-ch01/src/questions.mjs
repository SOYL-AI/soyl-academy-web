// ICSE 10 Physics ch01 Force: Turning Effect and Circular Motion — question bank (ICSE 2027 specimen style).
// Every numerical value is computed here and asserted by a re-solve check. MCQ keys are placed by the builder.
import { mk, add, r, near } from './lib.mjs';

const { mcq, ar, tf, fill, match, num, short, long } = mk;
const f = (x, n = 3) => String(Number(x.toPrecision(n)));

// ---------------------------------------------------------------- t01 moment of a force
const m1 = 40 * 0.3; // spanner
add('moment-mcq', mcq({
  stem: 'A force of 40 N is applied at right angles to a wrench, 30 cm from the centre of a bolt. The moment of the force about the bolt is:',
  right: `${f(m1)} N m`,
  wrong: ['1200 N m', '120 N m', '1.2 N m'],
  sol: `Moment $= F \\times d = 40 \\times 0.30 = ${f(m1)}$ N m — option (@K).`,
  d: 2, c: 'application', t: [1],
}), () => near(m1, 12) || 'moment');
add('motion-mcq', mcq({
  stem: 'Which of these is an example of purely rotational motion?',
  right: 'The blades of a ceiling fan turning about its fixed axis',
  wrong: ['A lift moving up its shaft', 'A car moving along a straight road', 'A ball rolling down a slope'],
  sol: 'The fan turns about a fixed axis; a rolling ball both rotates and translates — option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
add('handle-mcq', mcq({
  stem: 'A door is easiest to open when it is pushed:',
  right: 'at the edge farthest from the hinges, at right angles to the door',
  wrong: ['close to the hinges, at right angles to the door', 'at the edge, along the plane of the door towards the hinges', 'at the hinges themselves'],
  sol: 'Largest perpendicular distance gives the largest moment for a given force — option (@K).',
  d: 2, c: 'application', t: [1],
}));
const dyne = 0.6 * 1e7;
add('unit-mcq', mcq({
  stem: 'A moment of 0.6 N m expressed in cgs units is:',
  right: '6 × 10⁶ dyne cm',
  wrong: ['6 × 10⁵ dyne cm', '60 dyne cm', '6 × 10⁷ dyne cm'],
  sol: `$1\\ \\text{N m} = 10^{7}$ dyne cm, so $0.6 \\times 10^{7} = 6 \\times 10^{6}$ dyne cm — option (@K).`,
  d: 2, c: 'application', t: [1],
}), () => dyne === 6e6 || 'conversion');
add('zero-tf', tf({
  stem: 'A force whose line of action passes through the axis of rotation produces no moment about that axis.',
  key: 't',
  sol: 'True: the perpendicular distance is zero.',
  d: 1, c: 'understanding', t: [1],
}));
add('unit-fill', fill({
  stem: 'The SI unit of the moment of a force is the newton ___.',
  acc: [['metre', 'meter']],
  sol: '**Metre** (N m).',
  d: 1, c: 'recall', t: [1],
}));
add('moment-fill', fill({
  stem: 'The moment of a force equals the force multiplied by the ___ distance of its line of action from the axis.',
  acc: [['perpendicular']],
  sol: '**Perpendicular**.',
  d: 1, c: 'recall', t: [1],
}));
const F2 = 18 / 0.6;
add('wheel-num', num({
  stem: 'A bus driver needs a moment of 18 N m to turn the steering wheel. The radius of the wheel is 0.6 m. What force (in N), applied at the rim at right angles, is needed?',
  value: F2, tol: 0, unit: 'N',
  sol: `$F = \\dfrac{\\text{moment}}{d} = \\dfrac{18}{0.6} = ${f(F2)}$ N.`,
  scheme: [[`${f(F2)} N`, 1]],
  d: 2, c: 'application', t: [1],
}), () => near(F2, 30) || 'F');
const d3 = 7.5 / 25;
add('dist-num', num({
  stem: 'A force of 25 N produces a moment of 7.5 N m about a hinge. How far (in m) is the line of action of the force from the hinge?',
  value: d3, tol: 0.001, unit: 'm',
  sol: `$d = \\dfrac{7.5}{25} = ${f(d3)}$ m.`,
  scheme: [[`${f(d3)} m`, 1]],
  d: 1, c: 'application', t: [1],
}), () => near(d3, 0.3) || 'd');
add('rot-short1', short({
  marks: 1,
  stem: 'Name the type of motion of a wheel of a moving bicycle.',
  model: 'Both rotational (about its axle) and translational (along the road).',
  sol: 'Rotation + translation.',
  scheme: [['Both named', 1]],
  d: 1, c: 'understanding', t: [1],
}));
const m4 = 20 * 0.4;
const m4b = 20 * 0.1;
add('spanner-short2', short({
  marks: 2,
  stem: 'A 20 N force is applied at right angles to a spanner (a) 40 cm and (b) 10 cm from the nut. Calculate the moment in each case and explain which is better for loosening a tight nut.',
  model: `(a) $20 \\times 0.40 = ${f(m4)}$ N m. (b) $20 \\times 0.10 = ${f(m4b)}$ N m. Case (a): the same force gives four times the moment because the perpendicular distance is larger.`,
  sol: 'Two moments; larger distance better.',
  scheme: [['Both moments', 1], ['Explanation', 1]],
  d: 2, c: 'application', t: [1],
}), () => near(m4, 8) && near(m4b, 2) || 'moments');

// ---------------------------------------------------------------- t02 clockwise / anticlockwise; resultant; couple
const acw = 300 * 1.5;
const cw = 250 * 2.0;
add('resultant-mcq', mcq({
  stem: 'On a see-saw pivoted at its centre, Arjun pushes down with 300 N at 1.5 m on the left and Meera pushes down with 250 N at 2.0 m on the right. The see-saw:',
  right: `turns clockwise, with a resultant moment of ${cw - acw} N m`,
  wrong: [`turns anticlockwise, with a resultant moment of ${cw - acw} N m`, 'stays balanced', `turns clockwise, with a resultant moment of ${cw + acw} N m`],
  sol: `Anticlockwise $300 \\times 1.5 = ${acw}$; clockwise $250 \\times 2.0 = ${cw}$; resultant $= ${cw} - ${acw} = ${cw - acw}$ N m clockwise — option (@K).`,
  d: 3, c: 'application', t: [2],
}), () => cw - acw === 50 || 'resultant');
add('couple-mcq', mcq({
  stem: 'When you turn a water tap with your finger and thumb, the two equal and opposite forces form a couple. The couple:',
  right: 'turns the tap without moving it from its place',
  wrong: ['moves the tap sideways without turning it', 'produces no effect because the forces cancel', 'both moves and turns the tap equally'],
  sol: 'A couple has zero resultant force but a non-zero moment — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
const cpl = 15 * 0.4;
add('couplemom-mcq', mcq({
  stem: 'Two equal and opposite forces of 15 N act tangentially at opposite ends of a steering wheel of diameter 40 cm. The moment of the couple is:',
  right: `${f(cpl)} N m`,
  wrong: ['3 N m', '600 N m', '12 N m'],
  sol: `Moment of couple $= F \\times \\text{arm} = 15 \\times 0.40 = ${f(cpl)}$ N m — option (@K).`,
  d: 3, c: 'application', t: [2],
}), () => near(cpl, 6) || 'couple');
add('sign-ar', ar({
  a: 'A body acted on by an anticlockwise moment of 20 N m and a clockwise moment of 20 N m about the same axis does not start rotating.',
  r: 'The resultant moment on the body is zero.',
  key: 'a',
  sol: 'Both are true, and R explains A — option (a).',
  d: 2, c: 'understanding', t: [2, 3],
}));
add('couple-tf', tf({
  stem: 'A couple can make a body move along a straight line.',
  key: 'f',
  sol: 'False: its two forces cancel, so it produces rotation only.',
  d: 1, c: 'understanding', t: [2],
}));
add('couple-fill', fill({
  stem: 'Two equal and opposite parallel forces acting along different lines form a ___.',
  acc: [['couple']],
  sol: '**Couple**.',
  d: 1, c: 'recall', t: [2],
}));
const r5 = 6 * 0.5 - 4 * 0.5 - 2 * 0.25;
add('res-num', num({
  stem: 'A rod is pivoted at its centre. Forces act at right angles to it: 6 N at 0.5 m on one side giving an anticlockwise moment, 4 N at 0.5 m on the other side giving a clockwise moment, and 2 N at 0.25 m giving a clockwise moment. Find the resultant moment in N m (anticlockwise positive).',
  value: r5, tol: 0.001, unit: 'N m',
  sol: `Resultant $= 6 \\times 0.5 - 4 \\times 0.5 - 2 \\times 0.25 = ${f(r5)}$ N m (anticlockwise).`,
  scheme: [[`${f(r5)} N m`, 1]],
  d: 3, c: 'application', t: [2],
}), () => near(r5, 0.5) || 'resultant');
add('sense-short1', short({
  marks: 1,
  stem: 'State the usual sign given to a clockwise moment.',
  model: 'Negative (anticlockwise moments are taken as positive).',
  sol: 'Negative.',
  scheme: [['Negative', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('couple-short2', short({
  marks: 2,
  stem: 'What is a couple? Give two examples from daily life.',
  model: 'A pair of equal and opposite parallel forces whose lines of action are different, producing rotation only. Examples: turning a tap with finger and thumb; turning a steering wheel with both hands (also winding a key, opening a bottle cap).',
  sol: 'Definition; two examples.',
  scheme: [['Definition', 1], ['Two examples', 1]],
  d: 1, c: 'recall', t: [2],
}));

// ---------------------------------------------------------------- t03 equilibrium and principle of moments
const xb = (60 * 30) / 90;
add('balance-mcq', mcq({
  stem: 'A uniform metre rule balances at its 50 cm mark with 60 gf hung at the 20 cm mark. Where must 90 gf be hung to keep it balanced?',
  right: `At the ${50 + xb} cm mark`,
  wrong: ['At the 80 cm mark', 'At the 90 cm mark', 'At the 65 cm mark'],
  sol: `$60 \\times 30 = 90 \\times x$, so $x = ${xb}$ cm from the fulcrum: the ${50 + xb} cm mark — option (@K).`,
  d: 2, c: 'application', t: [3],
}), () => xb === 20 || 'x');
add('equil-mcq', mcq({
  stem: 'For a body to be in complete equilibrium:',
  right: 'the resultant force and the resultant moment on it must both be zero',
  wrong: ['only the resultant force must be zero', 'only the resultant moment must be zero', 'all the forces on it must be equal'],
  sol: 'Both translational and rotational conditions — option (@K).',
  d: 1, c: 'understanding', t: [3],
}));
add('dynamic-mcq', mcq({
  stem: 'A raindrop falls through still air at a constant speed. It is in:',
  right: 'dynamic equilibrium, because the forces on it balance while it moves',
  wrong: ['static equilibrium, because it is at rest', 'neither kind of equilibrium, because it is moving', 'equilibrium only if it is spinning'],
  sol: 'Weight is balanced by air resistance; uniform velocity — option (@K).',
  d: 2, c: 'application', t: [3],
}));
const Wr = (100 * 10) / 30;
add('rule-mcq', mcq({
  stem: 'A uniform metre rule of weight 100 gf is balanced on a knife edge at its 40 cm mark when a weight W is hung at the 10 cm mark. W is about:',
  right: `${f(Wr, 3)} gf`,
  wrong: ['100 gf', '25 gf', '75 gf'],
  sol: `The rule’s weight acts at 50 cm: $100 \\times 10 = W \\times 30$, so $W = ${f(Wr, 3)}$ gf — option (@K).`,
  d: 4, c: 'analysis', t: [3, 4],
}), () => near(Wr, 33.3) || 'W');
add('pom-ar', ar({
  a: 'When moments are taken about the fulcrum of a balanced lever, the force exerted by the fulcrum can be ignored.',
  r: 'The fulcrum force passes through the point about which moments are taken, so its moment is zero.',
  key: 'a',
  sol: 'Both are true, and R explains A — option (a).',
  d: 3, c: 'analysis', t: [3],
}));
add('pom-tf', tf({
  stem: 'The principle of moments holds for moments taken about any point of a body in equilibrium, not only about the fulcrum.',
  key: 't',
  sol: 'True: the resultant moment is zero about every point.',
  d: 3, c: 'understanding', t: [3],
}));
add('pom-fill', fill({
  stem: 'For a body in equilibrium, the sum of the anticlockwise moments about any point equals the sum of the ___ moments about that point.',
  acc: [['clockwise']],
  sol: '**Clockwise**.',
  d: 1, c: 'recall', t: [3],
}));
const Fr = 60 + 90;
add('react-num', num({
  stem: 'A light (weightless) rod balanced on a fulcrum carries 60 gf on one side and 90 gf on the other. What upward force, in gf, does the fulcrum exert?',
  value: Fr, tol: 0, unit: 'gf',
  sol: `Resultant force zero: reaction $= 60 + 90 = ${Fr}$ gf.`,
  scheme: [[`${Fr} gf`, 1]],
  d: 2, c: 'application', t: [3],
}), () => Fr === 150 || 'R');
const xm = (50 * 20) / 25;
add('pos-num', num({
  stem: 'A uniform metre rule is balanced at its centre. A 50 gf weight hangs at the 30 cm mark. At what mark (in cm) must a 25 gf weight hang on the other side to balance it?',
  value: 50 + xm, tol: 0, unit: 'cm',
  sol: `$50 \\times 20 = 25 \\times x$, so $x = ${xm}$ cm; mark $= 50 + ${xm} = ${50 + xm}$ cm.`,
  scheme: [[`${50 + xm} cm`, 1]],
  d: 2, c: 'application', t: [3],
}), () => 50 + xm === 90 || 'mark');
add('pom-short1', short({
  marks: 1,
  stem: 'State the principle of moments.',
  model: 'For a body in equilibrium, the sum of the anticlockwise moments about any point is equal to the sum of the clockwise moments about the same point.',
  sol: 'Statement.',
  scheme: [['Statement with “any point”', 1]],
  d: 1, c: 'recall', t: [3],
}));
add('verify-short2', short({
  marks: 2,
  stem: 'Describe briefly how you would verify the principle of moments using a metre rule, a knife edge and two known weights.',
  model: 'Balance the metre rule on the knife edge at its centre of gravity. Hang the two weights on opposite sides and move them until the rule is horizontal again. Measure each distance from the knife edge and show that W₁ × d₁ = W₂ × d₂; repeat for other positions.',
  sol: 'Balance; adjust; compare products.',
  scheme: [['Set-up and balancing', 1], ['Measurements and comparison', 1]],
  d: 2, c: 'understanding', t: [3],
}));
const L1 = 30 * 0.8 / 0.4;
add('lever-short2', short({
  marks: 2,
  stem: 'A light plank is balanced on a log at its middle. A 30 kgf box sits 0.8 m to one side of the log. (a) What weight placed 0.4 m on the other side will balance it? (b) What is the total upward force from the log?',
  model: `(a) $30 \\times 0.8 = W \\times 0.4$, so $W = ${L1}$ kgf. (b) $30 + ${L1} = ${30 + L1}$ kgf.`,
  sol: `${L1} kgf; ${30 + L1} kgf.`,
  scheme: [['(a)', 1], ['(b)', 1]],
  d: 2, c: 'application', t: [3],
}), () => L1 === 60 || 'W');
const Wx = (40 * 25 + 20 * 15) / 35;
add('pom-short3', short({
  marks: 3,
  stem: 'A uniform metre rule is balanced at its 50 cm mark. On the left, 40 gf hangs at the 25 cm mark; on the right, 20 gf hangs at the 65 cm mark. (a) Calculate the total anticlockwise moment. (b) Where must an extra 30 gf be hung (right side) to restore balance? (c) Why does the rule’s own weight not appear in your equation?',
  model: `(a) Anticlockwise $= 40 \\times 25 = 1000$ gf cm. (b) Clockwise so far $20 \\times 15 = 300$; needed $1000 - 300 = 700 = 30 \\times x$, so $x \\approx ${f(700 / 30, 3)}$ cm: about the ${f(50 + 700 / 30, 3)} cm mark. (c) Its weight acts at its centre of gravity, the fulcrum, so its moment is zero.`,
  sol: '1000 gf cm; about 73.3 cm; weight at the fulcrum.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 3, c: 'application', t: [3, 4],
}), () => near(50 + 700 / 30, 73.3) && Wx > 0 || 'x');

// ---------------------------------------------------------------- t04 centre of gravity
add('cg-mcq', mcq({
  stem: 'The centre of gravity of a uniform circular ring lies:',
  right: 'at the centre of the ring, where there is no material',
  wrong: ['at any point on the rim', 'at the lowest point of the ring', 'outside the circle of the ring'],
  sol: 'By symmetry it is at the geometric centre — option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('triangle-mcq', mcq({
  stem: 'The centre of gravity of a uniform triangular lamina is at the point where its:',
  right: 'three medians meet',
  wrong: ['three altitudes meet', 'longest side is bisected', 'three angle bisectors meet'],
  sol: 'Centroid — option (@K).',
  d: 2, c: 'recall', t: [4],
}));
add('plumb-mcq', mcq({
  stem: 'To find the centre of gravity of an irregular cardboard sheet, it is hung from a pin through a hole and a plumb line is used. The sheet must then be hung from:',
  right: 'a second hole, and G is where the two plumb lines cross',
  wrong: ['the same hole again, upside down', 'its heaviest corner only', 'a hole at its centre'],
  sol: 'G lies on every vertical through a suspension point — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('cg-ar', ar({
  a: 'The centre of gravity of a body always lies within the material of the body.',
  r: 'The centre of gravity is the point through which the whole weight of the body acts.',
  key: 'd',
  sol: 'A is false (for a ring it lies in empty space); R is true — option (d).',
  d: 2, c: 'understanding', t: [4],
}));
add('cg-tf', tf({
  stem: 'The centre of gravity of a uniform rectangular sheet lies where its diagonals intersect.',
  key: 't',
  sol: 'True.',
  d: 1, c: 'recall', t: [4],
}));
add('cg-fill', fill({
  stem: 'The point through which the whole weight of a body acts is called its centre of ___.',
  acc: [['gravity']],
  sol: '**Gravity**.',
  d: 1, c: 'recall', t: [4],
}));
add('cg-short1', short({
  marks: 1,
  stem: 'Where is the centre of gravity of a uniform metre rule?',
  model: 'At its mid-point, the 50 cm mark.',
  sol: '50 cm.',
  scheme: [['50 cm mark', 1]],
  d: 1, c: 'recall', t: [4],
}));
add('cg-short2', short({
  marks: 2,
  stem: 'Describe how you would locate the centre of gravity of an irregular lamina using a plumb line.',
  model: 'Make two holes near the edge. Hang the lamina freely from one hole on a pin with a plumb line from the same pin; mark the line along the lamina. Repeat from the second hole. The point where the two lines cross is the centre of gravity.',
  sol: 'Two suspensions; intersection.',
  scheme: [['Suspension with plumb line marked', 1], ['Second suspension; intersection is G', 1]],
  d: 2, c: 'understanding', t: [4],
}));

// ---------------------------------------------------------------- t05 circular motion
add('circle-mcq', mcq({
  stem: 'A stone tied to a string is whirled in a horizontal circle at constant speed. At any instant, its velocity is directed:',
  right: 'along the tangent to the circle',
  wrong: ['towards the centre', 'away from the centre', 'along the string'],
  sol: 'Velocity is tangential; the string pulls towards the centre — option (@K).',
  d: 1, c: 'understanding', t: [5],
}));
add('accel-mcq', mcq({
  stem: 'A satellite moves round the Earth at constant speed in a circular orbit. Its motion is accelerated because:',
  right: 'the direction of its velocity changes continuously',
  wrong: ['its speed keeps increasing', 'it has no mass in space', 'the Earth pushes it outward'],
  sol: 'Changing direction means changing velocity — option (@K).',
  d: 2, c: 'understanding', t: [5],
}));
add('centri-mcq', mcq({
  stem: 'A car takes a circular turn on a level road. The centripetal force on the car is provided by:',
  right: 'friction between the tyres and the road',
  wrong: ['the weight of the car', 'the engine pushing forward', 'the centrifugal force'],
  sol: 'Sideways friction acts towards the centre of the turn — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('release-mcq', mcq({
  stem: 'Mud on the tyre of a moving bicycle flies off. It leaves the wheel:',
  right: 'along the tangent to the wheel at the point where it separates',
  wrong: ['along the spoke, away from the axle', 'towards the axle', 'straight downwards'],
  sol: 'Once the adhesion (centripetal force) fails, the mud keeps its tangential velocity — option (@K).',
  d: 3, c: 'application', t: [5],
}));
add('centri-ar', ar({
  a: 'Centrifugal force is not shown when we draw the forces acting on a stone whirled on a string, as seen from the ground.',
  r: 'Centrifugal force is an apparent force that is felt only in the rotating frame.',
  key: 'a',
  sol: 'Both are true, and R explains A — option (a).',
  d: 3, c: 'analysis', t: [5],
}));
add('centri2-ar', ar({
  a: 'In uniform circular motion the speed is constant, so there is no acceleration.',
  r: 'In uniform circular motion the velocity is always along the tangent.',
  key: 'd',
  sol: 'A is false (velocity changes direction, so the body accelerates); R is true — option (d).',
  d: 2, c: 'understanding', t: [5],
}));
add('speed-tf', tf({
  stem: 'In uniform circular motion, both the speed and the velocity remain constant.',
  key: 'f',
  sol: 'False: speed is constant but velocity changes direction.',
  d: 1, c: 'understanding', t: [5],
}));
add('centri-fill', fill({
  stem: 'The force that keeps a body moving in a circle and acts towards the centre is called the ___ force.',
  acc: [['centripetal']],
  sol: '**Centripetal**.',
  d: 1, c: 'recall', t: [5],
}));
add('moon-short1', short({
  marks: 1,
  stem: 'Name the force that provides the centripetal force for the Moon moving round the Earth.',
  model: 'The gravitational force of attraction of the Earth.',
  sol: 'Gravity.',
  scheme: [['Gravitational force', 1]],
  d: 1, c: 'recall', t: [5],
}));
add('cc-short2', short({
  marks: 2,
  stem: 'Distinguish between centripetal force and centrifugal force with one example of each.',
  model: 'Centripetal force acts towards the centre and is a real force that keeps a body in a circle (tension in the string of a whirled stone). Centrifugal force acts away from the centre and is an apparent force felt in the rotating frame (a passenger on a turning bus feels pushed outward).',
  sol: 'Direction and nature; examples.',
  scheme: [['Difference', 1], ['Examples', 1]],
  d: 2, c: 'analysis', t: [5],
}));
add('circle-short3', short({
  marks: 3,
  stem: 'A ball tied to a string is whirled in a horizontal circle at constant speed. (a) Is its motion uniform or accelerated? Give a reason. (b) What provides the centripetal force? (c) Describe the path of the ball if the string breaks.',
  model: '(a) Accelerated: the direction of the velocity changes continuously. (b) The tension in the string. (c) It moves along the tangent to the circle at the point where the string broke (then curves down under gravity).',
  sol: 'Accelerated; tension; tangent.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 2, c: 'application', t: [5],
}));

// ---------------------------------------------------------------- match items
add('term-match', match({
  marks: 2,
  stem: 'Match each quantity in Column A with its unit or description in Column B.',
  pairs: [
    ['Moment of a force', 'N m'],
    ['Couple', 'Rotation only'],
    ['Centripetal force', 'Towards the centre'],
    ['Centre of gravity of a ring', 'At its centre'],
  ],
  order: [1, 3, 0, 2],
  sol: 'Moment → N m; couple → rotation only; centripetal force → towards the centre; ring → G at its centre.',
  d: 1, c: 'recall', t: [1, 2, 4, 5],
}));
add('example-match', match({
  marks: 2,
  stem: 'Match each situation in Column A with the idea it shows in Column B.',
  pairs: [
    ['A long spanner loosens a tight nut', 'Moment increases with distance'],
    ['A balanced see-saw', 'Principle of moments'],
    ['A raindrop at terminal speed', 'Dynamic equilibrium'],
    ['A car turning on a level road', 'Friction as centripetal force'],
  ],
  order: [2, 0, 3, 1],
  sol: 'Spanner → distance; see-saw → principle of moments; raindrop → dynamic equilibrium; car → friction as centripetal force.',
  d: 2, c: 'application', t: [1, 3, 5],
}));

// ---------------------------------------------------------------- 10-mark structured questions
const lA = 60 * 0.25;
add('moment-long', long({
  stem: '(a) Define the moment of a force and state its SI unit. [3]\n\n(b) A force of 60 N is applied at right angles to a door at 25 cm from the hinges. (i) Calculate the moment. (ii) What force would produce the same moment at 75 cm? (iii) Express the moment in dyne cm. [3]\n\n(c) Explain, using moments, why (i) a spanner with a long handle is used for a tight nut, (ii) a door cannot be opened by pushing at the hinges, (iii) a steering wheel is turned with a couple, and (iv) a hand-operated flour mill has its handle near the rim. [4]',
  model: `(a) The turning effect of a force about an axis, equal to the force × the perpendicular distance of its line of action from the axis; SI unit N m.\n\n(b) (i) $60 \\times 0.25 = ${f(lA)}$ N m. (ii) $${f(lA)} \\div 0.75 = ${f(lA / 0.75)}$ N. (iii) $${f(lA)} \\times 10^{7} = 1.5 \\times 10^{8}$ dyne cm.\n\n(c) (i) Larger perpendicular distance gives a larger moment for the same force. (ii) At the hinges d = 0, so the moment is zero. (iii) Two equal opposite forces give rotation only, with moment F × diameter. (iv) Large d means a smaller force is needed.`,
  sol: 'Definition; three calculations; four reasons.',
  scheme: [['(a) definition', 2], ['(a) unit', 1], ['(b)(i)', 1], ['(b)(ii)', 1], ['(b)(iii)', 1], ['(c)(i)', 1], ['(c)(ii)', 1], ['(c)(iii)', 1], ['(c)(iv)', 1]],
  d: 3, c: 'application', t: [1, 2],
}), () => near(lA, 15) && near(lA / 0.75, 20) || 'moment');
const pb = (50 * (50 - 20)) / (85 - 50);
add('pom-long', long({
  stem: '(a) State the two conditions for a body to be in equilibrium, and the principle of moments. [3]\n\n(b) A uniform metre rule is balanced at its 50 cm mark. A 50 gf weight hangs at the 20 cm mark. (i) Find the weight that must hang at the 85 cm mark to balance it. (ii) Find the upward force exerted by the knife edge if the rule weighs 40 gf. [3]\n\n(c) The same rule is now balanced at its 30 cm mark with nothing on it but a weight P at the 10 cm mark. (i) Where does the rule’s weight act? (ii) Calculate P. (iii) Which condition of equilibrium did you use? (iv) Why can the knife-edge force be ignored when taking moments about the knife edge? [4]',
  model: `(a) Resultant force zero; resultant moment zero. Principle: for a body in equilibrium the sum of anticlockwise moments about any point equals the sum of clockwise moments about that point.\n\n(b) (i) $50 \\times 30 = W \\times 35$, so $W = ${f(pb, 3)}$ gf. (ii) $50 + ${f(pb, 3)} + 40 = ${f(50 + pb + 40, 3)}$ gf.\n\n(c) (i) At its centre of gravity, the 50 cm mark. (ii) $40 \\times 20 = P \\times 20$, so $P = 40$ gf. (iii) Resultant moment zero (principle of moments). (iv) It passes through the point about which moments are taken, so its moment is zero.`,
  sol: 'Conditions; two calculations; off-centre rule.',
  scheme: [['(a)', 3], ['(b)(i)', 2], ['(b)(ii)', 1], ['(c)(i)', 1], ['(c)(ii)', 1], ['(c)(iii)', 1], ['(c)(iv)', 1]],
  d: 4, c: 'analysis', t: [3, 4],
}), () => near(pb, 42.86, 0.001) || 'W');
add('cg-long', long({
  stem: '(a) Define the centre of gravity of a body. Can it lie outside the body? Give an example. [3]\n\n(b) State the position of the centre of gravity of (i) a uniform rod, (ii) a circular disc and (iii) a triangular lamina. [3]\n\n(c) Describe, step by step, the plumb-line method of finding the centre of gravity of an irregular lamina, and explain why it works. [4]',
  model: '(a) The point through which the whole weight of the body acts, in every position. Yes: for a ring (or a hollow sphere, or a boomerang) it is at the centre, where there is no material.\n\n(b) (i) Mid-point. (ii) Centre of the disc. (iii) Point of intersection of the medians.\n\n(c) Make two or three holes near the edge. Suspend the lamina freely from one hole on a pin; hang a plumb line from the same pin and mark its line on the lamina. Repeat from another hole. The lines cross at G. It works because a freely suspended body comes to rest with its centre of gravity vertically below the point of suspension, so G lies on each plumb line.',
  sol: 'Definition and example; three positions; method and reason.',
  scheme: [['(a) definition', 2], ['(a) example', 1], ['(b)(i)', 1], ['(b)(ii)', 1], ['(b)(iii)', 1], ['(c) method', 3], ['(c) reason', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('circle-long', long({
  stem: '(a) What is uniform circular motion? Explain why it is called accelerated motion. [3]\n\n(b) Distinguish between centripetal and centrifugal force. [3]\n\n(c) Name the force that provides the centripetal force in each case: (i) a car on a curved level road; (ii) the Earth going round the Sun; (iii) a stone whirled on a string. (iv) In which direction does the stone move if the string snaps? [4]',
  model: '(a) Motion of a body along a circular path at constant speed. The direction of the velocity, along the tangent, changes at every point, so the velocity changes and the motion is accelerated (towards the centre).\n\n(b) Centripetal force: real, acts towards the centre, needed for circular motion. Centrifugal force: apparent, acts away from the centre, felt only in the rotating frame, equal and opposite to the centripetal force.\n\n(c) (i) Friction between tyres and road. (ii) The Sun’s gravitational attraction. (iii) Tension in the string. (iv) Along the tangent at the point of release.',
  sol: 'Definition; difference; four answers.',
  scheme: [['(a)', 3], ['(b)', 3], ['(c)(i)', 1], ['(c)(ii)', 1], ['(c)(iii)', 1], ['(c)(iv)', 1]],
  d: 2, c: 'understanding', t: [5],
}));
const sx = (400 * 1.2) / 300;
add('seesaw-long', long({
  stem: 'Two children sit on a see-saw pivoted at its centre. Child A (weight 400 N) sits 1.2 m to the left of the pivot.\n\n(a) Where must child B (weight 300 N) sit on the right so that the see-saw balances? [3]\n\n(b) Child B instead sits 1.0 m to the right. (i) Calculate the resultant moment. (ii) State its sense. (iii) Which end goes down? [3]\n\n(c) (i) What upward force does the pivot exert when the see-saw is balanced as in (a) (plank weight 200 N, centred on the pivot)? (ii) Explain why the plank’s weight does not appear in the moment equation. (iii) State which condition of equilibrium each part uses. [4]',
  model: `(a) $400 \\times 1.2 = 300 \\times x$, so $x = ${f(sx)}$ m to the right.\n\n(b) (i) Anticlockwise $400 \\times 1.2 = 480$ N m; clockwise $300 \\times 1.0 = 300$ N m; resultant $= 480 - 300 = 180$ N m. (ii) Anticlockwise. (iii) A’s end (left) goes down.\n\n(c) (i) $400 + 300 + 200 = 900$ N. (ii) It acts at the pivot, so its moment about the pivot is zero. (iii) (a) uses resultant moment zero; (c)(i) uses resultant force zero.`,
  sol: 'Balance position; resultant moment; reaction.',
  scheme: [['(a)', 3], ['(b)(i)', 1], ['(b)(ii)', 1], ['(b)(iii)', 1], ['(c)(i)', 2], ['(c)(ii)', 1], ['(c)(iii)', 1]],
  d: 3, c: 'application', t: [2, 3],
}), () => near(sx, 1.6) && 480 - 300 === 180 || 'x');

// ---------------------------------------------------------------- additional application items
const cgsM = 2e5 * 30;
add('cgs-num', num({
  stem: 'A force of 2 N acts at right angles to a lever at 30 cm from its pivot. Find the moment in dyne cm. (1 N = 10⁵ dyne)',
  value: cgsM, tol: 0, unit: 'dyne cm',
  sol: r`$F = 200000$ dyne; moment $= 200000 \times 30 = 6000000$ dyne cm, that is $6 \times 10^{6}$ dyne cm.`,
  scheme: [['6 × 10⁶ dyne cm', 1]],
  d: 2, c: 'application', t: [1],
}), () => cgsM === 6e6 || 'cgs');
const Fd = 12 / 0.8;
add('door-num', num({
  stem: 'A door needs a moment of 12 N m to open. Its handle is 0.8 m from the hinges. What is the least force (in N) that must be applied at the handle?',
  value: Fd, tol: 0, unit: 'N',
  sol: `Force is least when applied at right angles: $F = 12 \\div 0.8 = ${f(Fd)}$ N.`,
  scheme: [[`${f(Fd)} N`, 1]],
  d: 2, c: 'application', t: [1],
}), () => near(Fd, 15) || 'F');
const xk = (2 * 30) / 3;
add('kg-mcq', mcq({
  stem: 'On a light rod, a 2 kg mass hangs 30 cm to the left of the fulcrum. How far to the right must a 3 kg mass hang for the rod to balance?',
  right: `${xk} cm`,
  wrong: ['45 cm', '30 cm', '15 cm'],
  sol: `$2 \\times 30 = 3 \\times x$, so $x = ${xk}$ cm — option (@K).`,
  d: 2, c: 'application', t: [3],
}), () => xk === 20 || 'x');
add('track-short2', short({
  marks: 2,
  stem: 'An athlete runs round a circular track at a steady 6 m/s. (a) Is her velocity constant? Explain. (b) Which force provides the centripetal force she needs?',
  model: '(a) No: her speed is constant but her direction changes continuously, so her velocity changes. (b) Friction between her shoes and the track, directed towards the centre.',
  sol: 'Velocity changes; friction.',
  scheme: [['(a)', 1], ['(b)', 1]],
  d: 2, c: 'application', t: [5],
}));
add('tap-short2', short({
  marks: 2,
  stem: 'A plumber turns a tap with equal and opposite forces of 8 N at the two ends of its 5 cm handle. Calculate the moment of the couple in N m, and state why the tap does not move sideways.',
  model: r`Moment $= 8 \times 0.05 = 0.4$ N m. The two forces are equal and opposite, so the resultant force is zero: no translation.`,
  sol: '0.4 N m; zero resultant force.',
  scheme: [['Moment', 1], ['Reason', 1]],
  d: 2, c: 'application', t: [2],
}), () => near(8 * 0.05, 0.4) || 'couple');
