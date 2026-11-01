// ICSE 10 Physics ch03 Machines — question bank (ICSE 2027 specimen style).
// Every numerical value is computed here and asserted by a re-solve check. MCQ keys are placed by the builder.
import { mk, add, r, near } from './lib.mjs';

const { mcq, ar, tf, fill, match, num, short, long } = mk;
const f = (x, n = 3) => String(Number(x.toPrecision(n)));

// ---------------------------------------------------------------- t01 MA, VR, efficiency
const e1 = (1200 / 300) / 5;
add('eff-mcq', mcq({
  stem: 'A car jack lifts a 1200 N load with an effort of 300 N. Its velocity ratio is 5. Its efficiency is:',
  right: `${f(e1 * 100)}%`,
  wrong: ['400%', '25%', '125%'],
  sol: `MA $= 1200 \\div 300 = 4$; $\\eta = 4 \\div 5 = ${f(e1)}$, that is ${f(e1 * 100)}% — option (@K).`,
  d: 2, c: 'application', t: [1],
}), () => near(e1, 0.8) || 'eta');
add('mavr-mcq', mcq({
  stem: 'For every practical machine:',
  right: 'MA is less than VR, so efficiency is less than 1',
  wrong: ['MA equals VR', 'MA is greater than VR', 'VR is less than 1'],
  sol: 'Friction and moving parts waste part of the input — option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
add('vr-mcq', mcq({
  stem: 'In a machine, the effort moves 3 m while the load rises 0.5 m. The velocity ratio is:',
  right: '6',
  wrong: ['1.5', '0.17', '3.5'],
  sol: 'VR = 3 ÷ 0.5 = 6 — option (@K).',
  d: 1, c: 'application', t: [1],
}), () => 3 / 0.5 === 6 || 'VR');
add('speed-mcq', mcq({
  stem: 'A machine with mechanical advantage less than 1 is still useful because:',
  right: 'it moves the load through a larger distance or at a greater speed than the effort',
  wrong: ['it has an efficiency greater than 1', 'it needs no effort', 'its velocity ratio is greater than its mechanical advantage only when ideal'],
  sol: 'It works as a speed multiplier — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
const MAn = 800 / 250;
add('ma-num', num({
  stem: 'A lever lifts an 800 N stone when an effort of 250 N is applied. Find its mechanical advantage.',
  value: MAn, tol: 0, unit: null,
  sol: `MA $= L/E = 800 \\div 250 = ${f(MAn)}$.`,
  scheme: [[f(MAn), 1]],
  d: 1, c: 'application', t: [1],
}), () => near(MAn, 3.2) || 'MA');
const etaP = (500 * 0.6) / (125 * 3);
add('eff-num', num({
  stem: 'A machine lifts a 500 N load through 0.6 m when an effort of 125 N moves 3 m. Find its efficiency as a percentage.',
  value: etaP * 100, tol: 0.1, unit: '%',
  sol: `Output $= 500 \\times 0.6 = 300$ J; input $= 125 \\times 3 = 375$ J; efficiency $= 300 \\div 375 \\times 100 = ${f(etaP * 100)}$%.`,
  scheme: [[`${f(etaP * 100)}%`, 1]],
  d: 2, c: 'application', t: [1],
}), () => near(etaP, 0.8) || 'eta');
const Ew = 400 / (0.75 * 4);
add('effort-num', num({
  stem: 'A machine of velocity ratio 4 and efficiency 75% is used to lift a load of 400 N. What effort (in N) is needed?',
  value: Ew, tol: 0.1, unit: 'N',
  sol: `MA $= \\eta \\times \\text{VR} = 0.75 \\times 4 = 3$; effort $= 400 \\div 3 = ${f(Ew)}$ N.`,
  scheme: [[`${f(Ew)} N`, 1]],
  d: 3, c: 'application', t: [1],
}), () => near(Ew, 133.3) || 'E');
add('mach-ar', ar({
  a: 'The efficiency of a practical machine is always less than 100%.',
  r: 'Some of the work input is used to overcome friction and to move parts of the machine.',
  key: 'a',
  sol: 'Both are true, and R explains A — option (a).',
  d: 1, c: 'understanding', t: [1],
}));
add('vr-ar', ar({
  a: 'Oiling the moving parts of a machine increases its velocity ratio.',
  r: 'Oiling reduces friction.',
  key: 'd',
  sol: 'A is false (VR depends only on the design; oiling raises MA and efficiency); R is true — option (d).',
  d: 3, c: 'analysis', t: [1],
}));
add('mach-tf', tf({
  stem: 'Mechanical advantage and velocity ratio are both measured in newtons.',
  key: 'f',
  sol: 'False: both are ratios and have no unit.',
  d: 1, c: 'recall', t: [1],
}));
add('eff-fill', fill({
  stem: 'Efficiency of a machine equals its mechanical advantage divided by its ___ ratio.',
  acc: [['velocity']],
  sol: '**Velocity** ratio.',
  d: 1, c: 'recall', t: [1],
}));
add('ideal-fill', fill({
  stem: 'For an ideal machine, the mechanical advantage is ___ to the velocity ratio. (Write one word.)',
  acc: [['equal']],
  sol: '**Equal**.',
  d: 1, c: 'recall', t: [1],
}));
add('derive-short2', short({
  marks: 2,
  stem: 'Starting from the definition of efficiency as useful work output ÷ work input, show that efficiency = MA ÷ VR.',
  model: r`$\eta = \dfrac{L \times d_L}{E \times d_E} = \dfrac{L}{E} \times \dfrac{d_L}{d_E}$. Since $L/E$ is the MA and $d_L/d_E$ is $1/\text{VR}$, $\eta = \text{MA}/\text{VR}$.`,
  sol: 'Split the ratio.',
  scheme: [['Output and input written', 1], ['Rearranged to MA/VR', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('mavr-short2', short({
  marks: 2,
  stem: 'Give two reasons why the mechanical advantage of a practical machine is less than its velocity ratio.',
  model: 'Part of the effort is used to overcome friction between moving parts; part is used to lift or move parts of the machine itself (for example the lower block of a pulley system), so less is available for the load.',
  sol: 'Friction; weight of moving parts.',
  scheme: [['Friction', 1], ['Weight of moving parts', 1]],
  d: 1, c: 'understanding', t: [1, 4],
}));
add('machine-short3', short({
  marks: 3,
  stem: 'A ramp of length 6 m is used to push a 900 N barrel onto a platform 1.5 m high with an effort of 300 N along the ramp. Find (a) the VR, (b) the MA and (c) the efficiency.',
  model: `(a) VR $= 6 \\div 1.5 = ${6 / 1.5}$. (b) MA $= 900 \\div 300 = ${900 / 300}$. (c) $\\eta = 3 \\div 4 = ${f(3 / 4)}$, that is ${f(75)}%.`,
  sol: '4; 3; 75%.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 3, c: 'application', t: [1],
}), () => 6 / 1.5 === 4 && 900 / 300 === 3 || 'ramp');

// ---------------------------------------------------------------- t02 levers
add('class-mcq', mcq({
  stem: 'In a nutcracker, the nut is placed between the hinge and the place where the hand squeezes. It is a lever of:',
  right: 'class II, with MA greater than 1',
  wrong: ['class I, with MA always 1', 'class III, with MA less than 1', 'class II, with MA less than 1'],
  sol: 'Load between fulcrum and effort; effort arm longer — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('tongs-mcq', mcq({
  stem: 'A pair of fire tongs is held near the hinge and used to pick up a hot coal at the tips. Its mechanical advantage is:',
  right: 'less than 1, because the effort arm is shorter than the load arm',
  wrong: ['greater than 1, because the load is between fulcrum and effort', 'exactly 1, because it is a class I lever', 'greater than 1, because it is a class III lever'],
  sol: 'Class III: effort between hinge and coal — option (@K).',
  d: 2, c: 'application', t: [2],
}));
const Ecrow = (1000 * 0.1) / 1.0;
add('crow-mcq', mcq({
  stem: 'A crowbar 1.1 m long is pivoted on a stone 0.1 m from the end under a 1000 N rock. The least effort needed at the other end is:',
  right: `${f(Ecrow)} N`,
  wrong: ['1000 N', '10 N', '110 N'],
  sol: `$E \\times 1.0 = 1000 \\times 0.1$, so $E = ${f(Ecrow)}$ N — option (@K).`,
  d: 3, c: 'application', t: [2],
}), () => Ecrow === 100 || 'E');
add('balance-mcq', mcq({
  stem: 'A common beam balance has its fulcrum exactly at the middle. As a lever its mechanical advantage is:',
  right: '1, because the effort and load arms are equal',
  wrong: ['greater than 1', 'less than 1', 'zero'],
  sol: 'Class I with equal arms — option (@K).',
  d: 2, c: 'application', t: [2],
}));
const Eb = (300 * 0.25) / 1.5;
add('barrow-num', num({
  stem: 'A wheelbarrow carries a 300 N load whose weight acts 0.25 m from the wheel axle. The handles are lifted 1.5 m from the axle. What upward effort (in N) is needed?',
  value: Eb, tol: 0, unit: 'N',
  sol: `$E \\times 1.5 = 300 \\times 0.25$, so $E = ${f(Eb)}$ N.`,
  scheme: [[`${f(Eb)} N`, 1]],
  d: 2, c: 'application', t: [2],
}), () => Eb === 50 || 'E');
const MAt = 0.05 / 0.2;
add('tong-num', num({
  stem: 'In a pair of sugar tongs, the effort is applied 5 cm from the hinge and the sugar cube is held 20 cm from it. Find the mechanical advantage.',
  value: MAt, tol: 0, unit: null,
  sol: `MA $= \\text{effort arm} \\div \\text{load arm} = 5 \\div 20 = ${f(MAt)}$.`,
  scheme: [[f(MAt), 1]],
  d: 2, c: 'application', t: [2],
}), () => MAt === 0.25 || 'MA');
add('lever-ar', ar({
  a: 'A class II lever always has a mechanical advantage greater than 1.',
  r: 'In a class II lever the load lies between the fulcrum and the effort, so the effort arm is always longer than the load arm.',
  key: 'a',
  sol: 'Both are true, and R explains A — option (a).',
  d: 2, c: 'understanding', t: [2],
}));
add('lever-tf', tf({
  stem: 'A pair of scissors is a class I lever.',
  key: 't',
  sol: 'True: the pivot lies between the cloth (load) and the fingers (effort).',
  d: 1, c: 'recall', t: [2],
}));
add('lever-fill', fill({
  stem: 'The fixed point about which a lever turns is called the ___.',
  acc: [['fulcrum']],
  sol: '**Fulcrum**.',
  d: 1, c: 'recall', t: [2],
}));
add('class3-fill', fill({
  stem: 'In a class ___ lever, the effort lies between the fulcrum and the load. (Write I, II or III.)',
  acc: [['III', '3', 'three']],
  sol: 'Class **III**.',
  d: 1, c: 'recall', t: [2],
}));
add('lever-short1', short({
  marks: 1,
  stem: 'State the principle of the lever.',
  model: 'Load × load arm = effort × effort arm (anticlockwise moment equals clockwise moment about the fulcrum).',
  sol: 'Moments balance.',
  scheme: [['Statement', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('lever-short2', short({
  marks: 2,
  stem: 'Classify each lever and state whether its MA is more than 1, equal to 1 or less than 1: (a) a bottle opener, (b) a fishing rod held at one end with the other hand pulling midway, (c) a see-saw with equal arms, (d) a pair of forceps.',
  model: '(a) Class II, MA > 1. (b) Class III, MA < 1. (c) Class I, MA = 1. (d) Class III, MA < 1.',
  sol: 'II, III, I, III.',
  scheme: [['(a) and (b)', 1], ['(c) and (d)', 1]],
  d: 2, c: 'application', t: [2],
}));
add('classes-short3', short({
  marks: 3,
  stem: 'Draw labelled sketches (or describe the arrangement of fulcrum, load and effort) of class I, class II and class III levers, giving one example of each.',
  model: 'Class I: fulcrum between load and effort (see-saw, crowbar). Class II: load between fulcrum and effort (nutcracker, wheelbarrow). Class III: effort between fulcrum and load (forceps, sugar tongs).',
  sol: 'Three arrangements with examples.',
  scheme: [['Class I', 1], ['Class II', 1], ['Class III', 1]],
  d: 1, c: 'recall', t: [2],
}));

// ---------------------------------------------------------------- t03 levers in the body
add('body-mcq', mcq({
  stem: 'When you lift a school bag with your hand, bending the arm at the elbow, the forearm acts as a lever of:',
  right: 'class III, with the biceps pulling between the elbow and the hand',
  wrong: ['class I, with the elbow between the bag and the biceps', 'class II, with the bag between the elbow and the biceps', 'class II, with the elbow between the bag and the biceps'],
  sol: 'Fulcrum at the elbow, effort (biceps) in the middle, load in the hand — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('toe-mcq', mcq({
  stem: 'When a dancer rises on her toes, the fulcrum, load and effort are respectively:',
  right: 'the toes, the body weight at the ankle, and the calf muscle pulling at the heel',
  wrong: ['the heel, the toes, and the knee', 'the ankle, the calf muscle, and the toes', 'the knee, the heel, and the body weight'],
  sol: 'Class II lever with load in the middle — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('neck-tf', tf({
  stem: 'Nodding the head forward and back uses the neck as a class I lever.',
  key: 't',
  sol: 'True: the fulcrum (top of the spine) lies between the weight of the face and the neck muscles.',
  d: 1, c: 'recall', t: [3],
}));
add('body-short2', short({
  marks: 2,
  stem: 'Name the class of lever and identify the fulcrum in (a) raising the heels to stand on the toes and (b) nodding the head.',
  model: '(a) Class II; fulcrum at the toes. (b) Class I; fulcrum at the top of the spine (atlas joint).',
  sol: 'II at toes; I at spine.',
  scheme: [['(a)', 1], ['(b)', 1]],
  d: 2, c: 'application', t: [3],
}));
const Fb = (30 * 0.35) / 0.04;
add('biceps-short2', short({
  marks: 2,
  stem: 'A 30 N weight is held in the hand 35 cm from the elbow. The biceps is attached 4 cm from the elbow. (a) Find the force the biceps must exert to hold the forearm horizontal (neglect the forearm’s weight). (b) Why is the forearm useful despite this large force?',
  model: `(a) $F \\times 0.04 = 30 \\times 0.35$, so $F = ${f(Fb)}$ N. (b) It is a class III lever: a small contraction of the biceps moves the hand through a large distance quickly.`,
  sol: `${f(Fb)} N; speed and distance gain.`,
  scheme: [['(a)', 1], ['(b)', 1]],
  d: 4, c: 'analysis', t: [3],
}), () => near(Fb, 262.5) || 'F');

// ---------------------------------------------------------------- t04 pulleys
add('fixed-mcq', mcq({
  stem: 'A single fixed pulley at the top of a flagpole is used to raise a flag. Its main advantage is that it:',
  right: 'changes the direction of the effort, so the flag is raised by pulling down',
  wrong: ['doubles the force applied', 'has an efficiency greater than 1', 'has a velocity ratio of 2'],
  sol: 'MA = VR = 1 ideally; it only changes direction — option (@K).',
  d: 1, c: 'understanding', t: [4],
}));
add('tackle-mcq', mcq({
  stem: 'In a block and tackle, five strands of rope support the lower block. The load moves up 0.4 m. How far must the effort end be pulled?',
  right: '2.0 m',
  wrong: ['0.08 m', '0.4 m', '5 m'],
  sol: 'VR = 5, so the effort moves 5 × 0.4 = 2.0 m — option (@K).',
  d: 2, c: 'application', t: [4],
}), () => near(5 * 0.4, 2) || 'dE');
add('improve-mcq', mcq({
  stem: 'The lower block of a block and tackle is replaced by a lighter one, with the same number of strands. Its:',
  right: 'MA and efficiency increase but VR stays the same',
  wrong: ['VR increases', 'MA, VR and efficiency all decrease', 'efficiency stays the same'],
  sol: 'Less effort is wasted lifting the block; VR depends only on the strands — option (@K).',
  d: 3, c: 'analysis', t: [4],
}));
const Em = (240 + 20) / 2;
add('movable-mcq', mcq({
  stem: 'A single movable pulley weighing 20 N lifts a load of 240 N. Neglecting friction, the effort needed is:',
  right: `${f(Em)} N`,
  wrong: ['120 N', '260 N', '110 N'],
  sol: `$2E = 240 + 20$, so $E = ${f(Em)}$ N — option (@K).`,
  d: 3, c: 'application', t: [4],
}), () => Em === 130 || 'E');
const n3 = 3;
const Eb3 = (480 + 60) / n3;
add('tackle-num', num({
  stem: 'A block and tackle with 3 strands supporting the lower block lifts a 480 N load. The lower block weighs 60 N. Neglecting friction, find the effort in N.',
  value: Eb3, tol: 0, unit: 'N',
  sol: `$3E = 480 + 60$, so $E = 540 \\div 3 = ${f(Eb3)}$ N.`,
  scheme: [[`${f(Eb3)} N`, 1]],
  d: 2, c: 'application', t: [4],
}), () => Eb3 === 180 || 'E');
const etaT = 480 / 540;
add('tackleeff-num', num({
  stem: 'For the block and tackle of the previous question (3 strands, load 480 N, lower block 60 N, no friction), find the efficiency as a percentage, to the nearest whole number.',
  value: Math.round(etaT * 100), tol: 1, unit: '%',
  sol: `$\\eta = L/(L + w) = 480 \\div 540 \\approx 0.889$, so efficiency $= 0.889 \\times 100 \\approx ${Math.round(etaT * 100)}$%.`,
  scheme: [[`${Math.round(etaT * 100)}%`, 1]],
  d: 3, c: 'application', t: [4],
}), () => Math.round(etaT * 100) === 89 || 'eta');
add('pulley-ar', ar({
  a: 'A single fixed pulley is often used even though its mechanical advantage is not more than 1.',
  r: 'A single fixed pulley lets the effort be applied downwards, using the body’s own weight.',
  key: 'a',
  sol: 'Both are true, and R explains A — option (a).',
  d: 2, c: 'understanding', t: [4],
}));
add('pulley-ar2', ar({
  a: 'The velocity ratio of a block and tackle equals the number of strands supporting the lower block.',
  r: 'The efficiency of a block and tackle increases with the weight of its lower block.',
  key: 'c',
  sol: 'A is true; R is false: a heavier lower block lowers the efficiency — option (c).',
  d: 3, c: 'analysis', t: [4],
}));
add('pulley-tf', tf({
  stem: 'The velocity ratio of a single movable pulley is 2.',
  key: 't',
  sol: 'True: two strands support it.',
  d: 1, c: 'recall', t: [4],
}));
add('strand-fill', fill({
  stem: 'In a block and tackle, the velocity ratio equals the number of ___ supporting the lower block.',
  acc: [['strands', 'segments', 'ropes']],
  sol: '**Strands**.',
  d: 1, c: 'recall', t: [4],
}));
add('fixed-short1', short({
  marks: 1,
  stem: 'State the ideal mechanical advantage of a single fixed pulley.',
  model: 'One (1).',
  sol: '1.',
  scheme: [['1', 1]],
  d: 1, c: 'recall', t: [4],
}));
add('pulley-short2', short({
  marks: 2,
  stem: 'A single movable pulley is used to lift a 150 N load with an effort of 90 N. Find (a) its MA and (b) its efficiency.',
  model: `(a) MA $= 150 \\div 90 \\approx ${f(150 / 90)}$. (b) VR $= 2$, so $\\eta = ${f(150 / 90)} \\div 2 \\approx ${f(150 / 180)}$, about ${f((150 / 180) * 100, 2)}%.`,
  sol: 'MA about 1.67; efficiency about 83%.',
  scheme: [['(a)', 1], ['(b)', 1]],
  d: 2, c: 'application', t: [4],
}), () => near(150 / 180, 0.833) || 'eta');
add('tackle-short3', short({
  marks: 3,
  stem: 'A block and tackle has 2 pulleys in the upper block and 2 in the lower block. Its lower block weighs 40 N. It lifts a 360 N load. Neglecting friction, find (a) its VR, (b) the effort and (c) its MA.',
  model: `(a) VR $= 4$. (b) $4E = 360 + 40$, so $E = ${(360 + 40) / 4}$ N. (c) MA $= 360 \\div ${(360 + 40) / 4} = ${f(360 / 100)}$.`,
  sol: '4; 100 N; 3.6.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 2, c: 'application', t: [4],
}), () => (360 + 40) / 4 === 100 || 'E');

// ---------------------------------------------------------------- additional items
add('mavr2-mcq', mcq({
  stem: 'A screw jack has a velocity ratio of 5 and an efficiency of 60%. Its mechanical advantage is:',
  right: '3',
  wrong: ['8.3', '0.12', '300'],
  sol: 'MA = η × VR = 0.6 × 5 = 3 — option (@K).',
  d: 2, c: 'application', t: [1],
}), () => near(0.6 * 5, 3) || 'MA');
add('pliers-mcq', mcq({
  stem: 'An electrician cuts a thick wire by placing it close to the hinge of the pliers rather than near the tips. This is because:',
  right: 'the load arm becomes shorter, so the MA of the class I lever increases',
  wrong: ['the effort arm becomes shorter, so the MA decreases', 'the pliers become a class III lever', 'the velocity ratio becomes less than 1'],
  sol: 'MA = effort arm ÷ load arm; a short load arm gives a large MA — option (@K).',
  d: 3, c: 'analysis', t: [2],
}));
const Et2 = 900 / (6 * 0.75);
add('tackle2-mcq', mcq({
  stem: 'A block and tackle with VR 6 and efficiency 75% is used to lift a 900 N load. The effort needed is:',
  right: `${f(Et2)} N`,
  wrong: ['150 N', '675 N', '112.5 N'],
  sol: `MA $= 0.75 \\times 6 = 4.5$; $E = 900 \\div 4.5 = ${f(Et2)}$ N — option (@K).`,
  d: 3, c: 'application', t: [4],
}), () => Et2 === 200 || 'E');
add('class3-tf', tf({
  stem: 'The mechanical advantage of a class III lever can be made greater than 1 by moving the effort closer to the load.',
  key: 'f',
  sol: 'False: as long as the effort is between the fulcrum and the load, the effort arm is shorter than the load arm, so MA < 1.',
  d: 3, c: 'analysis', t: [2],
}));
add('elbow-fill', fill({
  stem: 'In the human forearm used as a lever, the fulcrum is at the ___.',
  acc: [['elbow', 'elbow joint']],
  sol: '**Elbow**.',
  d: 1, c: 'recall', t: [3],
}));
const dE = 4 * 0.25;
add('vrload-num', num({
  stem: 'In a pulley system of velocity ratio 4, how far (in m) must the effort move to raise the load by 0.25 m?',
  value: dE, tol: 0, unit: 'm',
  sol: `$d_E = \\text{VR} \\times d_L = 4 \\times 0.25 = ${f(dE)}$ m.`,
  scheme: [[`${f(dE)} m`, 1]],
  d: 1, c: 'application', t: [1, 4],
}), () => dE === 1 || 'dE');
const Emv = (90 + 10) / 2;
add('movable-num', num({
  stem: 'A single movable pulley weighing 10 N is used to lift a 90 N bucket of sand. Neglecting friction, what effort (in N) is required?',
  value: Emv, tol: 0, unit: 'N',
  sol: `$2E = 90 + 10$, so $E = 100 \\div 2 = ${f(Emv)}$ N.`,
  scheme: [[`${f(Emv)} N`, 1]],
  d: 2, c: 'application', t: [4],
}), () => Emv === 50 || 'E');
add('shears-short2', short({
  marks: 2,
  stem: 'Shears used for cutting metal sheets have long handles and short blades, whereas scissors for cutting cloth have short handles and long blades. Explain both designs.',
  model: 'Both are class I levers. Long handles and short blades make the effort arm long and the load arm short, giving a large MA to cut tough metal. Long blades and short handles give MA < 1, so the blade tips move fast through a large distance, cutting cloth quickly.',
  sol: 'Force gain vs speed gain.',
  scheme: [['Metal shears', 1], ['Cloth scissors', 1]],
  d: 3, c: 'analysis', t: [2],
}));
add('vr-short1', short({
  marks: 1,
  stem: 'A block and tackle has three pulleys in the upper block and three in the lower block. What is its velocity ratio?',
  model: '6 (six strands support the lower block).',
  sol: '6.',
  scheme: [['6', 1]],
  d: 2, c: 'application', t: [4],
}));
add('tackle-ar', ar({
  a: 'When the free end of the rope of a block and tackle of VR 4 is pulled down 1 m, the load rises 0.25 m.',
  r: 'The velocity ratio is the distance moved by the effort divided by the distance moved by the load.',
  key: 'a',
  sol: 'Both are true, and R explains A (0.25 = 1 ÷ 4) — option (a).',
  d: 2, c: 'application', t: [1, 4],
}));

// ---------------------------------------------------------------- match items
add('lever-match', match({
  marks: 2,
  stem: 'Match each tool or action in Column A with its class of lever in Column B.',
  pairs: [
    ['Crowbar', 'Class I'],
    ['Bottle opener', 'Class II'],
    ['Fishing rod', 'Class III'],
    ['Single fixed pulley', 'Changes direction only'],
  ],
  order: [2, 0, 3, 1],
  sol: 'Crowbar → I; bottle opener → II; fishing rod → III; fixed pulley → changes direction only.',
  d: 2, c: 'application', t: [2, 4],
}));
add('term-match', match({
  marks: 2,
  stem: 'Match each quantity in Column A with its definition in Column B.',
  pairs: [
    ['Mechanical advantage', 'Load ÷ effort'],
    ['Velocity ratio', 'Effort distance ÷ load distance'],
    ['Efficiency', 'Output work ÷ input work'],
    ['Fulcrum', 'Fixed turning point of a lever'],
  ],
  order: [1, 3, 0, 2],
  sol: 'MA → L/E; VR → dE/dL; efficiency → output/input; fulcrum → turning point.',
  d: 1, c: 'recall', t: [1, 2],
}));

// ---------------------------------------------------------------- 10-mark structured questions
add('mach-long', long({
  stem: '(a) Define (i) mechanical advantage, (ii) velocity ratio and (iii) efficiency of a machine. [3]\n\n(b) Derive the relation between efficiency, MA and VR. Why is the efficiency of a practical machine always less than 1? [3]\n\n(c) A machine with VR 6 lifts a load of 900 N with an effort of 200 N. Find (i) MA, (ii) efficiency, (iii) the distance the effort moves when the load rises 0.5 m and (iv) the work wasted in that time. [4]',
  model: `(a) (i) Ratio of load to effort. (ii) Ratio of the distance moved by the effort to the distance moved by the load. (iii) Ratio of useful work output to work input.\n\n(b) $\\eta = \\dfrac{L d_L}{E d_E} = \\dfrac{L}{E} \\cdot \\dfrac{d_L}{d_E} = \\dfrac{\\text{MA}}{\\text{VR}}$. Some input is always wasted against friction and in moving parts of the machine.\n\n(c) (i) MA $= 900 \\div 200 = ${900 / 200}$. (ii) $\\eta = ${900 / 200} \\div 6 = ${f(4.5 / 6)}$, that is ${f(75)}%. (iii) $d_E = 6 \\times 0.5 = 3$ m. (iv) Input $= 200 \\times 3 = 600$ J; output $= 900 \\times 0.5 = 450$ J; wasted $= 150$ J.`,
  sol: 'Definitions; derivation; calculation.',
  scheme: [['(a)', 3], ['(b) derivation', 2], ['(b) reason', 1], ['(c)(i)', 1], ['(c)(ii)', 1], ['(c)(iii)', 1], ['(c)(iv)', 1]],
  d: 3, c: 'application', t: [1],
}), () => 600 - 450 === 150 && near(4.5 / 6, 0.75) || 'mach');
add('lever-long', long({
  stem: '(a) State the principle of the lever. How are levers classified? [3]\n\n(b) Name the class of each lever and say whether MA > 1 or < 1: (i) a pair of forceps, (ii) a wheelbarrow, (iii) the human forearm lifting a load. [3]\n\n(c) A uniform crowbar is used to lift a 1200 N boulder. The fulcrum is 20 cm from the boulder end and the effort is applied 1.0 m from the fulcrum. (i) Find the least effort. (ii) Find the MA. (iii) Name the class. (iv) How could the effort be reduced further? [4]',
  model: `(a) Load × load arm = effort × effort arm. Levers are classified by the relative positions of fulcrum, load and effort: class I (fulcrum in the middle), II (load in the middle), III (effort in the middle).\n\n(b) (i) Class III, MA < 1. (ii) Class II, MA > 1. (iii) Class III, MA < 1.\n\n(c) (i) $E \\times 1.0 = 1200 \\times 0.2$, so $E = ${1200 * 0.2}$ N. (ii) MA $= 1200 \\div ${1200 * 0.2} = ${1200 / 240}$. (iii) Class I. (iv) Move the fulcrum closer to the boulder or push farther from the fulcrum (longer effort arm).`,
  sol: 'Principle and classes; classification; crowbar.',
  scheme: [['(a) principle', 1], ['(a) classes', 2], ['(b)', 3], ['(c)(i)', 1], ['(c)(ii)', 1], ['(c)(iii)', 1], ['(c)(iv)', 1]],
  d: 2, c: 'application', t: [2, 3],
}), () => 1200 * 0.2 === 240 && 1200 / 240 === 5 || 'crowbar');
add('pulley-long', long({
  stem: '(a) Draw (or describe) a block and tackle system with a VR of 4, showing the direction of the effort and the tension in each strand. [3]\n\n(b) The lower block weighs 80 N and the system lifts a 720 N load. Neglecting friction, find (i) the effort, (ii) the MA and (iii) the efficiency. [3]\n\n(c) (i) How do MA, VR and efficiency change if a heavier lower block is used? (ii) Why is a single fixed pulley used for drawing water from a well even though its MA is 1? (iii) What is the VR of a single movable pulley? [4]',
  model: `(a) Two pulleys in a fixed upper block, two in a movable lower block, one continuous string; four strands support the lower block, each with tension E; the free end is pulled down with effort E.\n\n(b) (i) $4E = 720 + 80$, so $E = ${(720 + 80) / 4}$ N. (ii) MA $= 720 \\div ${(720 + 80) / 4} = ${f(720 / 200)}$. (iii) $\\eta = ${f(720 / 200)} \\div 4 = ${f(0.9)}$, that is 90%.\n\n(c) (i) MA and efficiency decrease; VR is unchanged. (ii) It changes the direction of the effort: one can pull downwards, using one’s own weight, which is easier and safer. (iii) 2.`,
  sol: 'Diagram; effort, MA, efficiency; effects.',
  scheme: [['(a)', 3], ['(b)(i)', 1], ['(b)(ii)', 1], ['(b)(iii)', 1], ['(c)(i)', 2], ['(c)(ii)', 1], ['(c)(iii)', 1]],
  d: 3, c: 'application', t: [4],
}), () => (720 + 80) / 4 === 200 || 'E');
add('body-long', long({
  stem: '(a) Name the class of lever in each, and identify fulcrum, load and effort: (i) nodding the head, (ii) raising the heels. [3]\n\n(b) The forearm is a class III lever. (i) Where is the fulcrum? (ii) Where does the effort act? (iii) Why is its MA less than 1? [3]\n\n(c) A 20 N book is held in the hand 30 cm from the elbow; the biceps is attached 5 cm from the elbow. (i) Find the force exerted by the biceps (neglect the forearm’s weight). (ii) Find the MA. (iii) What advantage does the arm gain in exchange for its low MA? (iv) Is the MA of a class III lever ever more than 1? [4]',
  model: `(a) (i) Class I: fulcrum at the top of the spine, load the weight of the face, effort by the neck muscles. (ii) Class II: fulcrum at the toes, load the body weight at the ankle, effort by the calf muscle at the heel.\n\n(b) (i) At the elbow. (ii) Where the biceps is attached, between the elbow and the hand. (iii) The effort arm is shorter than the load arm.\n\n(c) (i) $F \\times 0.05 = 20 \\times 0.30$, so $F = ${(20 * 0.3) / 0.05}$ N. (ii) MA $= 20 \\div ${(20 * 0.3) / 0.05} = ${f(20 / 120)}$. (iii) A small movement of the biceps moves the hand through a large distance quickly (speed and range). (iv) No: the effort arm is always shorter.`,
  sol: 'Body levers; forearm; calculation.',
  scheme: [['(a)(i)', 1.5], ['(a)(ii)', 1.5], ['(b)(i)', 1], ['(b)(ii)', 1], ['(b)(iii)', 1], ['(c)(i)', 1], ['(c)(ii)', 1], ['(c)(iii)', 1], ['(c)(iv)', 1]],
  d: 3, c: 'analysis', t: [2, 3],
}), () => near((20 * 0.3) / 0.05, 120) || 'F');
add('compare-long', long({
  stem: '(a) What is meant by a force multiplier and a speed multiplier? Give one example of each. [3]\n\n(b) A single movable pulley of weight 30 N lifts a 270 N load. Neglecting friction, find (i) the effort, (ii) the MA, (iii) the efficiency. [3]\n\n(c) A block and tackle of VR 5 has an efficiency of 80%. (i) Find its MA. (ii) Find the effort to lift 2000 N. (iii) Find the work done by the effort to raise the load 0.6 m. (iv) Why is its efficiency not 100%? [4]',
  model: `(a) A force multiplier has MA > 1 and lets a small effort overcome a large load (crowbar, wheelbarrow). A speed multiplier has MA < 1 and moves the load through a larger distance or faster (forceps, fishing rod).\n\n(b) (i) $2E = 270 + 30$, so $E = ${(270 + 30) / 2}$ N. (ii) MA $= 270 \\div ${(270 + 30) / 2} = ${f(270 / 150)}$. (iii) $\\eta = ${f(270 / 150)} \\div 2 = ${f(0.9)}$, that is 90%.\n\n(c) (i) MA $= 0.8 \\times 5 = 4$. (ii) $E = 2000 \\div 4 = 500$ N. (iii) Effort moves $5 \\times 0.6 = 3$ m; work $= 500 \\times 3 = 1500$ J. (iv) Work is wasted against friction and in lifting the lower block.`,
  sol: 'Definitions; movable pulley; block and tackle.',
  scheme: [['(a)', 3], ['(b)(i)', 1], ['(b)(ii)', 1], ['(b)(iii)', 1], ['(c)(i)', 1], ['(c)(ii)', 1], ['(c)(iii)', 1], ['(c)(iv)', 1]],
  d: 4, c: 'application', t: [1, 4],
}), () => (270 + 30) / 2 === 150 && 2000 / 4 * 3 === 1500 || 'calc');
