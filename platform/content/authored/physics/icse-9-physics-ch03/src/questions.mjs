// ICSE 9 Physics ch03 Force and Newton's Laws of Motion — question bank in ICSE school-examination style.
// Every number comes from calc.mjs. kgf and gf appear only in conversions (second-law numericals use newton or dyne); inertial mass is a removed topic and is not asked.
// AR keys: a = (A) true (R) false, b = (A) false (R) true, c = both true and R explains, d = both true and R does not explain.
import { mk, add, svgV, r } from '../../icse-9-physics-ch01/src/lib.mjs';
import * as K from './calc.mjs';
import { CATCH, PAIR_LET } from './svgs.mjs';

const { mcq, ar, tf, fill, num, short, long, match } = mk;
const term = (o) => short({ marks: 1, wl: null, scheme: [[o.sch ?? 'Correct answer', 1]], ...o });
const fv = (svg, alt) => svgV(svg, alt);
const sh = (a, b) => (a === b ? true : `got ${a}, expected ${b}`);

// ---------------------------------------------------------------- deck-check items (not used in tests)
add('chk-contact', mcq({
  stem: 'Which one of the following forces can act on a body without any contact?',
  right: 'Magnetic force', wrong: ['Friction', 'Tension in a string', 'Normal reaction'],
  sol: 'A magnet attracts a nail across a gap, so the magnetic force is a non-contact force; the other three need contact, option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('chk-units', mcq({
  stem: 'A force of 5 N is equal to',
  right: `${K.U.n5_dyne} dyne`, wrong: ['5 dyne', '50 dyne', '5000 dyne'],
  sol: r`$1\ \text{N} = 10^5$ dyne, so $5 \times 10^5 = ${K.U.n5_dyne}$ dyne, option (@K).`,
  d: 2, c: 'application', t: [2],
}));
add('chk-inertia', mcq({
  stem: 'A passenger lurches forward when a moving bus stops suddenly. This is an example of',
  right: 'inertia of motion', wrong: ['inertia of rest', 'the third law of motion', 'the action of friction on the passenger'],
  sol: 'The body tends to keep moving with the bus’s earlier velocity, which is inertia of motion, option (@K).',
  d: 1, c: 'understanding', t: [3],
}));
add('chk-inv', mcq({
  stem: 'The distance between two bodies that attract each other by a force obeying the inverse square law is doubled. The force becomes',
  right: 'one quarter', wrong: ['one half', 'double', 'four times'],
  sol: r`$F \propto \dfrac{1}{r^2}$: for $2r$ the force is $\dfrac{1}{2^2} = \dfrac{1}{4}$ of its value, option (@K).`,
  d: 2, c: 'understanding', t: [1],
}));
add('chk-fma', mcq({
  stem: 'A force of 20 N acts on a body of mass 8 kg. Its acceleration is',
  right: `${K.FMA_A} m s⁻²`, wrong: ['0.4 m s⁻²', '12 m s⁻²', '160 m s⁻²'],
  sol: r`$a = \dfrac{F}{m} = \dfrac{20}{8} = ${K.FMA_A}$ m s⁻², option (@K).`,
  d: 2, c: 'application', t: [4],
}));
add('chk-eq', mcq({
  stem: 'A force of 150 N acts on a body of mass 50 kg, initially at rest, for 4 s. Its final velocity is',
  right: `${K.CHK_V} m s⁻¹`, wrong: ['3 m s⁻¹', '6 m s⁻¹', '600 m s⁻¹'],
  sol: r`$a = \dfrac{150}{50} = ${K.CHK_A}$ m s⁻²; $v = u + at = 0 + ${K.CHK_A} \times 4 = ${K.CHK_V}$ m s⁻¹, option (@K).`,
  d: 3, c: 'application', t: [4],
}));
add('chk-catch', mcq({
  stem: 'A fielder draws his hands back while catching a fast ball. The force on his hands is smaller because',
  right: 'the ball takes a longer time to stop, so the rate of change of momentum is smaller', wrong: ['the ball loses less momentum', 'the mass of the ball becomes smaller', 'the velocity of the ball increases'],
  sol: 'The change of momentum is the same, but force = change of momentum ÷ time, so a longer time gives a smaller force, option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('chk-third', mcq({
  stem: 'A hammer hits a nail with a force. The reaction to this force is the force exerted by',
  right: 'the nail on the hammer', wrong: ['the hammer on the nail', 'the wood on the nail', 'the hand on the hammer'],
  sol: 'Action and reaction act on different bodies and are exerted by each body on the other, option (@K).',
  d: 2, c: 'understanding', t: [5],
}));

// ---------------------------------------------------------------- t01 contact and non-contact forces
add('fc1', mcq({
  stem: 'Which of the following is a contact force?',
  right: 'Tension in a stretched string', wrong: ['Gravitational pull of the Earth on a stone', 'Attraction between a magnet and a nail across a gap', 'Repulsion between two charged balloons held apart'],
  sol: 'Tension acts through the string touching the body; the other three act across a gap, option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('fc2', mcq({
  stem: 'A book rests on a horizontal table. The normal reaction of the table on the book acts',
  right: 'upward, perpendicular to the surface of the table', wrong: ['downward, perpendicular to the surface of the table', 'along the surface of the table', 'upward, but at 45° to the surface of the table'],
  sol: 'The normal reaction is the push of the surface, at right angles to it, away from the table, option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
add('fc3', mcq({
  stem: 'The force between two small magnets varies inversely as the square of the distance between them. It is 16 N when they are 2 cm apart. At 4 cm apart it is',
  right: `${K.ISQ3_F} N`, wrong: ['8 N', '32 N', '2 N'],
  sol: r`Distance doubled, so the force becomes $\dfrac{1}{4}$: $\dfrac{16}{4} = ${K.ISQ3_F}$ N, option (@K).`,
  d: 2, c: 'application', t: [1],
}));
add('tf-cont', tf({
  stem: 'The gravitational force between two bodies acts only when the bodies touch each other.',
  key: 'f',
  sol: 'False. Gravitational force is a non-contact force; it acts across a gap.',
  d: 1, c: 'recall', t: [1],
}));
add('term-fric', term({
  stem: 'Name the contact force that opposes the sliding of one surface over another.',
  model: '**Friction.**', sol: 'Friction.', sch: 'Friction',
  d: 1, c: 'recall', t: [1],
}));
add('num-isq', num({
  stem: 'A non-contact force varies inversely as the square of the distance. It is 100 N at a distance of 2 m. Find its value at 10 m in N.',
  value: K.ISQ2_F, tol: 0, unit: 'N',
  sol: r`$F \propto \dfrac{1}{r^2}$, so $F_2 = 100 \times \left(\dfrac{2}{10}\right)^2 = 100 \times 0.04 = ${K.ISQ2_F}$ N.`,
  scheme: [['Inverse square ratio', 0.5], [`${K.ISQ2_F} N`, 0.5]],
  d: 2, c: 'application', t: [1],
}), () => sh(K.ISQ2_F, 4));
add('s2a', short({
  marks: 2,
  stem: 'Distinguish a contact force from a non-contact force, with one example of each.',
  wl: null,
  model: 'A contact force acts **only when the bodies touch** (for example friction); a non-contact force acts **across a gap** (for example the magnetic pull of a magnet on a nail).',
  sol: 'Touching against across a gap; friction and magnetic force.',
  scheme: [['Contact force with an example', 1], ['Non-contact force with an example', 1]],
  d: 1, c: 'understanding', t: [1],
}));

// ---------------------------------------------------------------- t02 units of force
add('un1', mcq({
  stem: 'The cgs unit of force is the',
  right: 'dyne', wrong: ['newton', 'kilogram-force', 'erg'],
  sol: 'In the cgs system the unit of force is the dyne, option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('un2', mcq({
  stem: 'A body weighs 3 kgf. Taking g = 10 m s⁻² so that 1 kgf = 10 N, its weight in newton is',
  right: `${K.V.kgf3_g10} N`, wrong: ['0.3 N', '3 N', '300 N'],
  sol: r`$3 \times 10 = ${K.V.kgf3_g10}$ N, option (@K).`,
  d: 2, c: 'application', t: [2],
}));
add('un3', mcq({
  stem: 'A force of 500 gf, taking 1 gf = 980 dyne, is equal to',
  right: `${K.V.gf500_n} N`, wrong: ['0.49 N', '49 N', '490 N'],
  sol: r`$500 \times 980 = 490000$ dyne $= \dfrac{490000}{10^5} = ${K.V.gf500_n}$ N, option (@K).`,
  d: 3, c: 'application', t: [2],
}));
add('ar-second', ar({
  a: 'A force of 1 N gives a body of mass 1 kg an acceleration of 1 m s⁻².',
  r: 'The kilogram-force is the SI unit of force.',
  key: 'a',
  sol: 'This is the definition of the newton, so (A) is true; the SI unit of force is the newton, so (R) is false, option (a).',
  d: 2, c: 'understanding', t: [2],
}));
add('tf-dyne', tf({
  stem: 'The dyne is the SI unit of force.',
  key: 'f',
  sol: 'False. The dyne is the cgs unit; the SI unit is the newton.',
  d: 1, c: 'recall', t: [2],
}));
add('fill-dyne', fill({
  stem: 'The force that gives a mass of 1 g an acceleration of 1 cm s⁻² is called one ___.',
  acc: [['dyne']],
  sol: 'One **dyne**.',
  d: 1, c: 'recall', t: [2],
}));
add('num-kgf', num({
  stem: 'A parcel weighs 6 kgf. Find its weight in N. (1 kgf = 9.8 N)',
  value: K.V.kgf6, tol: 0.01, unit: 'N',
  sol: r`$6 \times 9.8 = ${K.V.kgf6}$ N.`,
  scheme: [['Multiplication by 9.8', 0.5], [`${K.V.kgf6} N`, 0.5]],
  d: 1, c: 'application', t: [2],
}), () => sh(K.V.kgf6, 58.8));
add('num-dyne', num({
  stem: 'Express a force of 0.8 N in dyne. (1 N = 10⁵ dyne)',
  value: K.V.n08_dyne, tol: 0, unit: 'dyne',
  sol: r`$0.8 \times 10^5 = ${K.V.n08_dyne}$ dyne.`,
  scheme: [['Multiplication by 10⁵', 0.5], [`${K.V.n08_dyne} dyne`, 0.5]],
  d: 1, c: 'application', t: [2],
}), () => sh(K.V.n08_dyne, 80000));
add('num-gf', num({
  stem: 'Express a force of 150 gf in dyne. (1 gf = 980 dyne)',
  value: K.V.gf150_dyne, tol: 0, unit: 'dyne',
  sol: r`$150 \times 980 = ${K.V.gf150_dyne}$ dyne.`,
  scheme: [['Multiplication by 980', 0.5], [`${K.V.gf150_dyne} dyne`, 0.5]],
  d: 2, c: 'application', t: [2],
}), () => sh(K.V.gf150_dyne, 147000));
add('s2d', short({
  marks: 2,
  stem: 'Write the value of (a) 1 N in dyne and (b) 1 kgf in N.',
  wl: null,
  model: '**(a)** 1 N = **10⁵ dyne**.\n\n**(b)** 1 kgf = **9.8 N**.',
  sol: '10⁵ dyne; 9.8 N.',
  scheme: [['10⁵ dyne', 1], ['9.8 N', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('s3b', short({
  marks: 3,
  stem: 'Convert (a) 3.5 kgf to N, (b) 0.6 N to dyne and (c) 19.6 N to kgf. (1 kgf = 9.8 N; 1 N = 10⁵ dyne)',
  wl: null,
  model: `**(a)** 3.5 × 9.8 = **${K.V.kgf35_n} N**.\n\n**(b)** 0.6 × 10⁵ = **${K.V.n06_dyne} dyne**.\n\n**(c)** 19.6 ÷ 9.8 = **${K.V.n196_kgf} kgf**.`,
  sol: '34.3 N; 60000 dyne; 2 kgf.',
  scheme: [['34.3 N', 1], ['60000 dyne', 1], ['2 kgf', 1]],
  d: 2, c: 'application', t: [2],
}), () => sh(K.V.kgf35_n, 34.3));

// ---------------------------------------------------------------- t03 first law and inertia
add('in1', mcq({
  stem: 'Which of the following is explained by the inertia of rest?',
  right: 'Passengers fall backward when a bus at rest suddenly starts', wrong: ['A runner overshoots the finishing line', 'A cyclist is thrown forward when the cycle hits a stone', 'A ball goes on rolling after it is kicked'],
  sol: 'The passengers’ bodies tend to remain at rest while the bus moves forward; the other three show inertia of motion, option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('in2', mcq({
  stem: 'In a train moving at a steady velocity along a straight track, a boy throws a ball vertically upward and it falls back into his hand. This is because',
  right: 'the ball keeps the forward velocity of the train while it is in the air', wrong: ['the train exerts a forward force on the ball in the air', 'the ball has no horizontal motion at all', 'the air inside the train pushes the ball down'],
  sol: 'No horizontal force acts on the ball, so it keeps its forward velocity (first law) and stays above the boy’s hand, option (@K).',
  d: 3, c: 'analysis', t: [3],
}));
add('ar-first', ar({
  a: 'A passenger standing in a bus falls backward when the bus at rest suddenly starts.',
  r: 'The body of the passenger tends to remain at rest because of its inertia.',
  key: 'c',
  sol: 'The feet move with the bus but the upper body tends to stay at rest, so the passenger falls backward; (R) explains (A), option (c).',
  d: 2, c: 'analysis', t: [3],
}));
add('tf-const', tf({
  stem: 'The net force on a body moving with a constant velocity along a straight line is zero.',
  key: 't',
  sol: 'True. By the first law the velocity changes only when an unbalanced force acts.',
  d: 2, c: 'understanding', t: [3],
}));
add('s2f', short({
  marks: 2,
  stem: 'Dust comes out of a carpet when it is beaten with a stick. Explain this using inertia.',
  wl: null,
  model: 'The carpet is **set in motion** by the stick, but the dust particles tend to **stay at rest** because of their **inertia of rest**, so they are left behind and fall out.',
  sol: 'Carpet moves; dust stays at rest by inertia.',
  scheme: [['Carpet moves while the dust tends to stay at rest', 1], ['Names inertia of rest', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('s2b', short({
  marks: 2,
  stem: 'State Newton’s first law of motion.',
  wl: null,
  model: 'A body continues in its state of **rest** or of **uniform motion in a straight line** unless it is acted on by an **external force**.',
  sol: 'Rest or uniform straight-line motion unless an external force acts.',
  scheme: [['Rest or uniform motion in a straight line', 1], ['Unless an external force acts', 1]],
  d: 1, c: 'recall', t: [3],
}));
add('s2g', short({
  marks: 2,
  stem: 'A body moves along a straight line at a constant speed. What can you say about the total force on it? Give a reason.',
  wl: null,
  model: 'The **net force is zero**, because by the first law a body in uniform motion in a straight line keeps its velocity unless an **unbalanced force** acts on it.',
  sol: 'Zero net force by the first law.',
  scheme: [['Net force is zero', 1], ['Reason from the first law', 1]],
  d: 2, c: 'understanding', t: [3],
}));

// ---------------------------------------------------------------- t04 momentum and the second law
add('mo1', mcq({
  stem: 'A truck of mass 3000 kg moves at 6 m s⁻¹. Its linear momentum is',
  right: `${K.TRUCK3_P} kg m s⁻¹`, wrong: ['500 kg m s⁻¹', '3006 kg m s⁻¹', '180000 kg m s⁻¹'],
  sol: r`$p = mv = 3000 \times 6 = ${K.TRUCK3_P}$ kg m s⁻¹, option (@K).`,
  d: 2, c: 'application', t: [4],
}));
add('mo2', mcq({
  stem: 'Which statement about linear momentum is correct?',
  right: 'It is a vector in the direction of the velocity', wrong: ['It is a scalar quantity', 'Its SI unit is the newton', 'It is zero for a moving body'],
  sol: 'p = mv has the direction of v, so it is a vector, option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('sl1', mcq({
  stem: 'A force of 12 N gives a body an acceleration of 3 m s⁻². The same force acting on a body of twice the mass gives an acceleration of',
  right: `${K.SL1_A2} m s⁻²`, wrong: ['6 m s⁻²', '3 m s⁻²', '0.75 m s⁻²'],
  sol: r`$m = \dfrac{12}{3} = ${K.SL1_M}$ kg; for $2m = 8$ kg: $a = \dfrac{12}{8} = ${K.SL1_A2}$ m s⁻², option (@K).`,
  d: 3, c: 'application', t: [4],
}));
add('sl2', mcq({
  stem: 'The same force acts for the same time on two bodies A and B, initially at rest. The mass of A is half the mass of B. The ratio of the final velocity of A to that of B is',
  right: '2 : 1', wrong: ['1 : 2', '1 : 1', '4 : 1'],
  sol: 'a = F ÷ m, so A has twice the acceleration of B; v = at gives twice the velocity, option (@K).',
  d: 3, c: 'analysis', t: [4],
}));
add('sl3', mcq({
  stem: 'A constant force of 10 N acts on a body for 4 s. The change in the momentum of the body is',
  right: `${K.SL3_DP} kg m s⁻¹`, wrong: ['2.5 kg m s⁻¹', '14 kg m s⁻¹', '6 kg m s⁻¹'],
  sol: r`$F = \dfrac{\text{change of momentum}}{t}$, so change $= 10 \times 4 = ${K.SL3_DP}$ kg m s⁻¹, option (@K).`,
  d: 2, c: 'application', t: [4],
}));
add('ar-catch', ar({
  a: 'A cricketer draws his hands back while catching a fast ball.',
  r: 'The momentum of the ball is zero after it has been caught.',
  key: 'd',
  sol: 'Both are true, but the reason for drawing the hands back is that a longer stopping time reduces the force, not that the final momentum is zero, option (d).',
  d: 3, c: 'analysis', t: [4],
}));
add('tf-mom', tf({
  stem: 'The linear momentum of a body at rest is zero.',
  key: 't',
  sol: 'True. p = mv and v = 0.',
  d: 1, c: 'recall', t: [4],
}));
add('fill-mom', fill({
  stem: 'Linear momentum is the product of the mass of a body and its ___.',
  acc: [['velocity']],
  sol: 'Its **velocity**.',
  d: 1, c: 'recall', t: [4],
}));
add('term-mom', term({
  stem: 'Define the linear momentum of a body.',
  model: 'The **product of the mass of the body and its velocity**.', sol: 'Mass times velocity.', sch: 'Mass times velocity',
  d: 1, c: 'recall', t: [4],
}));
add('num-mom', num({
  stem: 'A girl of mass 40 kg runs at 5 m s⁻¹. Find her linear momentum in kg m s⁻¹.',
  value: K.GIRL_P, tol: 0, unit: 'kg m s⁻¹',
  sol: r`$p = mv = 40 \times 5 = ${K.GIRL_P}$ kg m s⁻¹.`,
  scheme: [['p = mv', 0.5], [`${K.GIRL_P} kg m s⁻¹`, 0.5]],
  d: 1, c: 'application', t: [4],
}), () => sh(K.GIRL_P, 200));
add('num-force', num({
  stem: 'A football of mass 0.4 kg is kicked and gains an acceleration of 15 m s⁻². Find the force of the kick in N.',
  value: K.KICK_F, tol: 0, unit: 'N',
  sol: r`$F = ma = 0.4 \times 15 = ${K.KICK_F}$ N.`,
  scheme: [['F = ma', 0.5], [`${K.KICK_F} N`, 0.5]],
  d: 2, c: 'application', t: [4],
}), () => sh(K.KICK_F, 6));
add('num-mass', num({
  stem: 'A force of 600 N gives a loaded cart an acceleration of 1.5 m s⁻². Find the mass of the cart in kg.',
  value: K.MASS_M, tol: 0, unit: 'kg',
  sol: r`$m = \dfrac{F}{a} = \dfrac{600}{1.5} = ${K.MASS_M}$ kg.`,
  scheme: [['m = F ÷ a', 0.5], [`${K.MASS_M} kg`, 0.5]],
  d: 2, c: 'application', t: [4],
}), () => sh(K.MASS_M, 400));
add('num-scoot', num({
  stem: 'A scooter and its rider have a total mass of 150 kg. A steady forward force of 300 N acts on them for 6 s, starting from rest. Find their velocity after 6 s in m s⁻¹.',
  value: K.SCOOT_V, tol: 0, unit: 'm s⁻¹',
  sol: r`$a = \dfrac{F}{m} = \dfrac{300}{150} = ${K.SCOOT_A}$ m s⁻²; $v = u + at = 0 + ${K.SCOOT_A} \times 6 = ${K.SCOOT_V}$ m s⁻¹.`,
  scheme: [['a = 2 m s⁻²', 0.5], [`${K.SCOOT_V} m s⁻¹`, 0.5]],
  d: 2, c: 'application', t: [4],
}), () => sh(K.SCOOT_V, 12));
add('num-sled', num({
  stem: 'A sled of mass 25 kg on smooth ice is pulled from rest by a horizontal force of 50 N. Find its speed after it has moved 16 m, in m s⁻¹.',
  value: K.SLED_V, tol: 0, unit: 'm s⁻¹',
  sol: r`$a = \dfrac{50}{25} = ${K.SLED_A}$ m s⁻²; $v^2 = u^2 + 2aS = 0 + 2 \times 2 \times 16 = 64$, so $v = ${K.SLED_V}$ m s⁻¹.`,
  scheme: [['a = 2 m s⁻²', 0.5], [`${K.SLED_V} m s⁻¹`, 0.5]],
  d: 3, c: 'application', t: [4],
}), () => sh(K.SLED_V, 8));
add('num-bike', num({
  stem: 'A cyclist and bicycle of total mass 120 kg moving at 10 m s⁻¹ are brought to rest in 4 s by the brakes. Find the magnitude of the braking force in N.',
  value: -K.BIKE_F, tol: 0, unit: 'N',
  sol: r`$a = \dfrac{0 - 10}{4} = ${K.BIKE_A}$ m s⁻²; $|F| = m|a| = 120 \times 2.5 = ${-K.BIKE_F}$ N, directed opposite to the motion.`,
  scheme: [['a = −2.5 m s⁻²', 0.5], ['300 N', 0.5]],
  d: 3, c: 'application', t: [4],
}), () => sh(-K.BIKE_F, 300));
add('num-hockey', num({
  stem: 'A hockey ball of mass 0.2 kg moving at 30 m s⁻¹ is stopped by a goalkeeper’s pad in 0.04 s. Find the average force on the ball in N.',
  value: K.HOCKEY_F, tol: 0, unit: 'N',
  sol: r`Change of momentum $= 0.2 \times 30 - 0 = ${K.HOCKEY_P}$ kg m s⁻¹; $F = \dfrac{${K.HOCKEY_P}}{0.04} = ${K.HOCKEY_F}$ N.`,
  scheme: [['Change of momentum 6 kg m s⁻¹', 0.5], [`${K.HOCKEY_F} N`, 0.5]],
  d: 3, c: 'application', t: [4],
}), () => sh(K.HOCKEY_F, 150));
add('num-cgs', num({
  stem: 'A force of 3 × 10⁴ dyne acts on a body of mass 500 g. Find its acceleration in cm s⁻².',
  value: K.CGS2_A, tol: 0, unit: 'cm s⁻²',
  sol: r`$a = \dfrac{F}{m} = \dfrac{30000}{500} = ${K.CGS2_A}$ cm s⁻².`,
  scheme: [['F = ma in cgs units', 0.5], [`${K.CGS2_A} cm s⁻²`, 0.5]],
  d: 2, c: 'application', t: [4],
}), () => sh(K.CGS2_A, 60));
add('num-truck', num({
  stem: 'A truck of mass 2000 kg changes its speed from 5 m s⁻¹ to 12 m s⁻¹ in 7 s under a steady force. Find the force in N.',
  value: K.TRUCK_F, tol: 0, unit: 'N',
  sol: r`Change of momentum $= 2000 \times (12 - 5) = ${K.TRUCK_DP}$ kg m s⁻¹; $F = \dfrac{${K.TRUCK_DP}}{7} = ${K.TRUCK_F}$ N.`,
  scheme: [['Change of momentum 14000 kg m s⁻¹', 0.5], [`${K.TRUCK_F} N`, 0.5]],
  d: 3, c: 'application', t: [4],
}), () => sh(K.TRUCK_F, 2000));
add('s2c', short({
  marks: 2,
  stem: 'Why does a fielder draw his hands back while catching a fast cricket ball? Answer in terms of momentum.',
  wl: null,
  model: 'Drawing the hands back **increases the time** in which the ball’s momentum is brought to zero. Force = change of momentum ÷ time, so the **force on the hands is smaller**.',
  sol: 'Longer time, smaller force.',
  scheme: [['Time of stopping is increased', 1], ['Force = change of momentum ÷ time is smaller', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('s2h', short({
  marks: 2,
  stem: 'A heavy lorry is much harder to stop than a bicycle moving at the same speed. Explain, using momentum.',
  wl: null,
  model: 'The lorry has a **much greater momentum** (mass × velocity) at the same speed, so a **larger force** or a longer time is needed to change it to zero.',
  sol: 'Greater mass gives greater momentum.',
  scheme: [['Greater mass gives greater momentum', 1], ['Larger force or longer time needed', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('s3a', short({
  marks: 3,
  stem: 'A body of constant mass m changes its velocity from u to v in time t. Using Newton’s second law, show that the force F = ma.',
  wl: null,
  model: 'Initial momentum = **mu**, final momentum = **mv**. Rate of change of momentum = (mv − mu) ÷ t = **m(v − u) ÷ t**. The second law says F is proportional to this; since (v − u) ÷ t = a, **F = ma** (the constant being 1 in SI units).',
  sol: 'Rate of change of momentum is m times acceleration.',
  scheme: [['Initial and final momentum', 1], ['Rate of change of momentum = m(v − u) ÷ t', 1], ['(v − u) ÷ t = a, so F = ma', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('s3d', short({
  marks: 3,
  stem: 'A ball of mass 0.5 kg moving at 8 m s⁻¹ is stopped by a wall in 0.1 s. Find (a) the change in its momentum, (b) the average force on the ball.',
  wl: null,
  model: `**(a)** Change of momentum = 0.5 × 8 − 0 = **${K.S3D_DP} kg m s⁻¹**.\n\n**(b)** F = change of momentum ÷ time = ${K.S3D_DP} ÷ 0.1 = **${K.S3D_F} N**, opposite to the motion.`,
  sol: '4 kg m/s; 40 N.',
  scheme: [['Change of momentum 4 kg m s⁻¹', 1], ['F = change ÷ time', 1], ['40 N', 1]],
  d: 2, c: 'application', t: [4],
}), () => sh(K.S3D_F, 40));
add('s3e', short({
  marks: 3,
  stem: 'A force of 24 N acts on a body of mass 6 kg, initially at rest, for 5 s. Find (a) its acceleration, (b) its velocity after 5 s, (c) the momentum gained.',
  wl: null,
  model: `**(a)** a = F ÷ m = 24 ÷ 6 = **${K.S3E_A} m s⁻²**.\n\n**(b)** v = u + at = 0 + ${K.S3E_A} × 5 = **${K.S3E_V} m s⁻¹**.\n\n**(c)** p = mv = 6 × ${K.S3E_V} = **${K.S3E_P} kg m s⁻¹**.`,
  sol: '4 m/s²; 20 m/s; 120 kg m/s.',
  scheme: [['4 m s⁻²', 1], ['20 m s⁻¹', 1], ['120 kg m s⁻¹', 1]],
  d: 3, c: 'application', t: [4],
}), () => sh(K.S3E_P, 120));

// ---------------------------------------------------------------- t05 third law
add('th1', mcq({
  stem: 'According to Newton’s third law, the action and the reaction act',
  right: 'on two different bodies', wrong: ['on the same body', 'only when the bodies are at rest', 'in the same direction'],
  sol: 'The two forces are exerted by each body on the other, so they act on different bodies, option (@K).',
  d: 1, c: 'recall', t: [5],
}));
add('th2', mcq({
  stem: 'A rocket moves upward because',
  right: 'the exhaust gases pushed downward push the rocket upward', wrong: ['the exhaust gases push against the air below the rocket', 'the Earth pulls the rocket upward', 'the rocket pushes the launching pad upward'],
  sol: 'Action: rocket on the gases (down); reaction: gases on the rocket (up), option (@K).',
  d: 2, c: 'understanding', t: [5],
}));
add('th3', mcq({
  stem: 'A gun recoils backward when a bullet is fired from it. The force on the gun is',
  right: 'equal and opposite to the force on the bullet', wrong: ['equal to the force on the bullet and in the same direction', 'smaller than the force on the bullet', 'zero because the gun is heavy'],
  sol: 'The force on the gun is the reaction to the force on the bullet: equal and opposite, option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('ar-third', ar({
  a: 'The action and reaction forces cancel each other because they are equal and opposite.',
  r: 'The action and reaction act on different bodies.',
  key: 'b',
  sol: 'Forces cancel only if they act on the same body, so (A) is false; (R) is true, option (b).',
  d: 2, c: 'analysis', t: [5],
}));
add('tf-pair', tf({
  stem: 'The weight of a book and the normal reaction of the table on it form an action-reaction pair.',
  key: 'f',
  sol: 'False. Both forces act on the book; an action-reaction pair acts on two different bodies.',
  d: 2, c: 'understanding', t: [5],
}));
add('s2e', short({
  marks: 2,
  stem: 'Why do the action and the reaction of Newton’s third law not cancel each other?',
  wl: null,
  model: 'Forces cancel only if they act on the **same body**. The action and the reaction act on **different bodies**, so each produces its own effect.',
  sol: 'Different bodies.',
  scheme: [['Cancel only when on the same body', 1], ['Action and reaction act on different bodies', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('s3c', short({
  marks: 3,
  stem: 'Name the action and the reaction in (a) a person walking, (b) a boat being rowed, (c) a balloon releasing air.',
  wl: null,
  model: '**(a)** Foot pushes the ground backward; the ground pushes the foot forward.\n\n**(b)** Oar pushes the water backward; the water pushes the boat forward.\n\n**(c)** Balloon pushes the air out backward; the air pushes the balloon forward.',
  sol: 'Backward push and forward push in each case.',
  scheme: [['Walking', 1], ['Rowing', 1], ['Balloon', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('s3f', short({
  marks: 3,
  stem: 'A rifle is fired and recoils backward. (a) Name the action and the reaction. (b) State how their sizes compare. (c) Why do these two forces not cancel each other?',
  wl: null,
  model: '**(a)** Action: the force of the rifle on the bullet (forward). Reaction: the force of the bullet on the rifle (backward).\n\n**(b)** They are **equal in size**.\n\n**(c)** They act on **different bodies** (the bullet and the rifle).',
  sol: 'Rifle on bullet and bullet on rifle; equal; different bodies.',
  scheme: [['Action and reaction named', 1], ['Equal in size', 1], ['Act on different bodies', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('situ-match', match({
  marks: 5,
  stem: 'Match each situation in Column A with the idea that explains it in Column B.',
  pairs: [
    ['A passenger lurches forward when a bus brakes', 'Inertia of motion'],
    ['A coin drops into a tumbler when the card under it is flicked away', 'Inertia of rest'],
    ['A fielder draws the hands back while catching a ball', 'Force = change of momentum ÷ time'],
    ['A swimmer pushes the water backward to move forward', 'Action and reaction'],
    ['A magnet pulls a nail across a small gap', 'Non-contact force'],
  ],
  order: [0, 1, 2, 3, 4],
  sol: 'Each situation shows the idea in Column B: inertia of motion, inertia of rest, force as rate of change of momentum, a reaction force, and a force acting across a gap.',
  scheme: [['Five pairs', 5]],
  d: 2, c: 'understanding', t: [1, 3, 4, 5],
}));

// ---------------------------------------------------------------- 10-mark structured questions
add('units-long', long({
  marks: 10, wl: null,
  stem: 'Force can be expressed in several units.\n\n(a) Define the newton and the dyne. [3]\n\n(b) Show that 1 N = 10⁵ dyne. [2]\n\n(c) Convert 7.5 N to dyne. [1]\n\n(d) A bag weighs 3.5 kgf. Find its weight in N and in dyne. (1 kgf = 9.8 N) [2]\n\n(e) Convert a force of 49000 dyne to gf. (1 gf = 980 dyne) [2]',
  model: `**(a)** One newton is the force that gives a body of mass **1 kg** an acceleration of **1 m s⁻²**; one dyne is the force that gives a body of mass **1 g** an acceleration of **1 cm s⁻²**.\n\n**(b)** 1 N = 1 kg × 1 m s⁻² = 1000 g × 100 cm s⁻² = **10⁵ g cm s⁻²** = **10⁵ dyne**.\n\n**(c)** 7.5 × 10⁵ = **${K.V.n75_dyne} dyne**.\n\n**(d)** 3.5 × 9.8 = **${K.V.kgf35_n} N**; in dyne: ${K.V.kgf35_n} × 10⁵ = **${K.V.kgf35_dyne} dyne**.\n\n**(e)** 49000 ÷ 980 = **${K.V.dyne49k_gf} gf**.`,
  sol: 'Definitions; 1 kg m/s² = 10⁵ g cm/s²; 750000 dyne; 34.3 N and 3430000 dyne; 50 gf.',
  scheme: [['Newton defined', 1.5], ['Dyne defined', 1.5], ['Conversion of kg to g and m to cm', 1], ['Result 10⁵ dyne', 1], ['750000 dyne', 1], ['34.3 N', 1], ['3430000 dyne', 1], ['Division by 980', 1], ['50 gf', 1]],
  d: 3, c: 'application', t: [2],
}), () => sh(K.V.kgf35_dyne, 3430000));
add('inertia-long', long({
  marks: 10, wl: null,
  stem: 'A coin is placed on a card resting over a tumbler. The card is flicked away sharply and the coin drops into the tumbler.\n\n(a) State Newton’s first law of motion. [2]\n\n(b) Explain why the coin drops into the tumbler and name the kind of inertia involved. [3]\n\n(c) A passenger standing in a moving bus lurches forward when the driver applies the brakes suddenly. Explain this, naming the kind of inertia. [3]\n\n(d) Why are seat belts provided in cars? [2]',
  model: '**(a)** A body continues in its state of **rest** or of **uniform motion in a straight line** unless an **external force** acts on it.\n\n**(b)** The coin is at rest and tends to **remain at rest** when the card is removed quickly; with no support below it, gravity pulls it down into the tumbler. This is **inertia of rest** (static inertia).\n\n**(c)** The feet are stopped with the bus by friction, but the upper body tends to **keep moving forward** with the earlier velocity, so the passenger lurches forward. This is **inertia of motion** (dynamic inertia).\n\n**(d)** When the car stops suddenly, the occupants tend to **keep moving forward** because of inertia of motion; the belt exerts a **force that stops them** and prevents injury.',
  sol: 'First law; inertia of rest; inertia of motion; seat belts oppose forward motion.',
  scheme: [['Rest or uniform motion in a straight line', 1], ['Unless an external force acts', 1], ['Coin tends to stay at rest', 1], ['Gravity pulls it into the tumbler', 1], ['Inertia of rest named', 1], ['Feet stop with the bus', 1], ['Upper body tends to keep moving', 1], ['Inertia of motion named', 1], ['Occupants tend to keep moving forward', 1], ['Belt provides the stopping force', 1]],
  d: 3, c: 'understanding', t: [3],
}));
add('second-long', long({
  marks: 10, wl: null,
  stem: 'A truck of mass 2000 kg changes its speed from 5 m s⁻¹ to 12 m s⁻¹ in 7 s.\n\n(a) Define linear momentum and state its SI unit. [2]\n\n(b) State Newton’s second law and use it to show that F = ma for a body of constant mass. [3]\n\n(c) Find the change in momentum of the truck and the force that acts on it. [3]\n\n(d) Find the acceleration of the truck and verify that F = ma gives the same force. [2]',
  model: `**(a)** Linear momentum is the **product of mass and velocity**, p = mv; its SI unit is **kg m s⁻¹**.\n\n**(b)** The **rate of change of momentum** of a body is proportional to the applied force and is in the direction of the force. F ∝ (mv − mu) ÷ t = m(v − u) ÷ t = ma, so **F = ma**.\n\n**(c)** Change of momentum = 2000 × (12 − 5) = **${K.TRUCK_DP} kg m s⁻¹**; F = ${K.TRUCK_DP} ÷ 7 = **${K.TRUCK_F} N**.\n\n**(d)** a = (12 − 5) ÷ 7 = **${K.TRUCK_A} m s⁻²**; F = ma = 2000 × ${K.TRUCK_A} = **${K.TRUCK_F} N**, the same.`,
  sol: 'p = mv, kg m/s; second law and F = ma; 14000 kg m/s and 2000 N; 1 m/s², 2000 N.',
  scheme: [['p = mv', 1], ['kg m s⁻¹', 1], ['Statement of the second law', 1], ['(mv − mu) ÷ t', 1], ['F = ma', 1], ['Change of momentum 14000', 1], ['Divided by 7', 1], ['2000 N', 1], ['a = 1 m s⁻²', 1], ['F = ma gives 2000 N', 1]],
  d: 3, c: 'application', t: [4],
}), () => sh(K.TRUCK_F, 2000));
add('catch-long', long({
  marks: 10, wl: null,
  stem: 'A cricket ball of mass 0.14 kg moving at 30 m s⁻¹ is caught by a fielder and brought to rest. The figure shows two ways of catching.\n\n(a) Find the momentum of the ball before it is caught. [2]\n\n(b) Find the average force on the hands if the ball is stopped in 0.04 s with the hands held fixed. [2]\n\n(c) Find the average force if the hands are drawn back and the ball takes 0.14 s to stop. [2]\n\n(d) Find how many times larger the first force is than the second, and explain why the fielder draws the hands back. [2]\n\n(e) Give one other example in which a longer stopping time is used to reduce a force. [2]',
  model: `**(a)** p = mv = 0.14 × 30 = **${K.CATCH2_P} kg m s⁻¹**.\n\n**(b)** F = change of momentum ÷ time = ${K.CATCH2_P} ÷ 0.04 = **${K.CATCH2_F1} N**.\n\n**(c)** F = ${K.CATCH2_P} ÷ 0.14 = **${K.CATCH2_F2} N**.\n\n**(d)** ${K.CATCH2_F1} ÷ ${K.CATCH2_F2} = **${K.CATCH2_R} times**. The change of momentum is the same, so a **longer time** gives a **smaller force** and the hands are not hurt.\n\n**(e)** A high jumper lands on a thick foam mat (or: bending the knees on landing; cushions in vehicles); the longer stopping time reduces the force.`,
  sol: '4.2 kg m/s; 105 N; 30 N; 3.5 times, longer time smaller force; foam mat.',
  scheme: [['p = mv', 1], ['4.2 kg m s⁻¹', 1], ['Formula F = change of momentum ÷ time', 1], ['105 N', 1], ['Substitution', 1], ['30 N', 1], ['3.5 times', 1], ['Longer time gives smaller force', 1], ['A suitable example', 1], ['Explanation in terms of time', 1]],
  d: 3, c: 'application', t: [4],
  assets: [fv(CATCH, 'Two ways of catching a ball: hands fixed and hands drawn back')],
}), () => sh(K.CATCH2_R, 3.5));
add('pairs-long', long({
  marks: 10, wl: null,
  stem: 'The figure shows a boy standing on the ground and pushing a wall. Five forces are shown by arrows lettered A to E.\n\n(a) Which two forces form an action-reaction pair? [2]\n\n(b) State the body on which each force of this pair acts. [2]\n\n(c) Name the forces C, D and E. [3]\n\n(d) The boy stays at rest. Which two of the forces balance each other horizontally on him? [2]\n\n(e) Why do the forces of the pair in (a) not cancel? [1]',
  model: '**(a)** The forces **A and B**.\n\n**(b)** **A** (push of the boy) acts on the **wall**; **B** (push of the wall) acts on the **boy**.\n\n**(c)** **C** is the **weight** of the boy; **D** is the **normal reaction** of the ground; **E** is the **friction** of the ground on his feet.\n\n**(d)** **B and E** balance each other horizontally on the boy, so he does not slide.\n\n**(e)** They act on **different bodies**, so they cannot cancel.',
  sol: 'A and B; wall and boy; weight, normal reaction, friction; B and E; different bodies.',
  scheme: [['A', 1], ['B', 1], ['A acts on the wall', 1], ['B acts on the boy', 1], ['Weight', 1], ['Normal reaction', 1], ['Friction', 1], ['B', 1], ['E', 1], ['Different bodies', 1]],
  d: 3, c: 'understanding', t: [5],
  assets: [fv(PAIR_LET, 'A boy pushing a wall with five forces lettered A to E')],
}));
add('fma-long', long({
  marks: 10, wl: null,
  stem: 'A sled of mass 25 kg on smooth horizontal ice is pulled from rest by a steady horizontal force of 50 N.\n\n(a) Find its acceleration. [2]\n\n(b) Find its speed after it has moved 16 m. [3]\n\n(c) Find the time taken to move the 16 m. [2]\n\n(d) Find the momentum of the sled at that moment. [2]\n\n(e) Find the force that would bring the sled to rest in 2 s. [1]',
  model: `**(a)** a = F ÷ m = 50 ÷ 25 = **${K.SLED_A} m s⁻²**.\n\n**(b)** v² = u² + 2aS = 0 + 2 × ${K.SLED_A} × 16 = 64, so v = **${K.SLED_V} m s⁻¹**.\n\n**(c)** t = (v − u) ÷ a = ${K.SLED_V} ÷ ${K.SLED_A} = **${K.SLED_T} s**.\n\n**(d)** p = mv = 25 × ${K.SLED_V} = **${K.SLED_P} kg m s⁻¹**.\n\n**(e)** F = change of momentum ÷ time = ${K.SLED_P} ÷ 2 = **${K.SLED_STOP} N** (opposite to the motion).`,
  sol: '2 m/s²; 8 m/s; 4 s; 200 kg m/s; 100 N.',
  scheme: [['a = F ÷ m', 1], ['2 m s⁻²', 1], ['v² = u² + 2aS', 1], ['Substitution', 1], ['8 m s⁻¹', 1], ['t = (v − u) ÷ a', 1], ['4 s', 1], ['p = mv', 1], ['200 kg m s⁻¹', 1], ['100 N', 1]],
  d: 4, c: 'application', t: [4],
}), () => sh(K.SLED_STOP, 100));
