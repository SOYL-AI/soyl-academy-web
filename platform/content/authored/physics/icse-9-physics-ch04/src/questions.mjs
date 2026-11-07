// ICSE 9 Physics ch04 Gravitation: question bank in ICSE school-examination style (short stems, "state", "define",
// numericals with formula, substitution and unit, 10-mark structured questions in parts). Numbers come from calc.mjs.
// AR keys use the ICSE option order: a = A true R false, b = A false R true, c = both true and R explains, d = both true and R does not explain.
import { mk, add, svgV, r, near, sig } from '../../icse-9-physics-ch01/src/lib.mjs';
import * as K from './calc.mjs';
import { PAIR_LETTERED } from './svgs.mjs';

const { mcq, ar, tf, fill, num, short, long, match } = mk;
const pairFig = svgV(PAIR_LETTERED, 'Two bodies A and B with force arrows C and D and the distance E between their centres');
const term = (o) => short({ marks: 1, wl: null, scheme: [[o.sch ?? 'Correct answer', 1]], ...o });

// ---------------------------------------------------------------- deck-check items (not used in tests)
add('chk-pair', mcq({
  stem: 'The Earth pulls a falling mango downwards with a force of 3 N. The pull of the mango on the Earth is',
  right: '3 N, directed upwards towards the mango', wrong: ['zero, because the mango is so light', 'much less than 3 N, because the mango has a small mass', '3 N, directed downwards'],
  sol: 'The two forces of a pair are equal and opposite, so the mango pulls the Earth upwards with 3 N, option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('chk-ratio', mcq({
  stem: 'The mass of one body is made three times larger and the distance between the two bodies is also made three times larger. The gravitational force becomes',
  right: 'one third of the old force', wrong: ['three times the old force', 'one ninth of the old force', 'equal to the old force'],
  sol: r`The factor is $\dfrac{3}{3^2} = \dfrac{1}{3}$, option (@K).`,
  d: 2, c: 'application', t: [1],
}), () => near(3 / 9, 1 / 3) || 'factor');
add('chk-G', mcq({
  stem: 'The SI unit of the universal gravitational constant G is',
  right: r`$\text{N m}^2\ \text{kg}^{-2}$`, wrong: [r`$\text{N kg}^2\ \text{m}^{-2}$`, r`$\text{N m kg}^{-1}$`, r`$\text{kg m s}^{-2}$`],
  sol: r`Since $G = \dfrac{F r^2}{m_1 m_2}$, its unit is N m² divided by kg², that is N m² kg⁻², option (@K).`,
  d: 1, c: 'recall', t: [1],
}));
add('chk-fall', mcq({
  stem: 'In a strobe picture of a ball dropped from rest, the gap between successive positions increases steadily. This shows that',
  right: 'the speed of the ball keeps increasing as it falls', wrong: ['the ball falls with a steady speed', 'the mass of the ball increases as it falls', 'air is pushing the ball downwards'],
  sol: 'The photographs are taken at equal time intervals; larger gaps mean greater speed, option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('chk-weight', mcq({
  stem: `A body of mass ${K.SB_M} kg hangs from a spring balance that reads ${K.SB_M} kgf, which is ${K.SB_N} N. Which statement is correct?`,
  right: `${K.SB_M} kgf and ${K.SB_N} N are two ways of stating the same pull of the Earth on the body`, wrong: [`${K.SB_N} N is the mass of the body`, `The mass of the body is ${K.SB_N} kg`, `The weight of the body is ${K.SB_M} kg`],
  sol: 'Weight is a force; kgf and newton are two units for the same force, option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('chk-kgf', mcq({
  stem: 'A body weighs 3 kgf. Its weight in newton is (1 kgf = 9.8 N)',
  right: `${K.K3} N`, wrong: [`${K.K3_DIV} N`, '3 N', `${K.K3_ODD} N`],
  sol: `Newton = kgf × 9.8 = 3 × 9.8 = ${K.K3} N, option (@K).`,
  d: 2, c: 'application', t: [3],
}), () => K.K3 === 29.4 || 'kgf');

// ---------------------------------------------------------------- t01 universal law of gravitation
add('law-mcq1', mcq({
  stem: 'The universal law of gravitation says that the force between two bodies is',
  right: 'directly proportional to the product of their masses and inversely proportional to the square of the distance between their centres',
  wrong: ['directly proportional to the sum of their masses and inversely proportional to the distance between their centres', 'inversely proportional to the product of their masses and directly proportional to the distance between their centres', 'directly proportional to the square of the distance between their centres and independent of their masses'],
  sol: 'Product of the masses in the numerator and the square of the distance in the denominator, option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('law-mcq2', mcq({
  stem: 'The gravitational force between two bodies is F. The mass of one body is tripled and the distance between them is doubled. The new force is',
  right: '3F/4', wrong: ['3F/2', '6F', '4F/3'],
  sol: r`The factor is $\dfrac{3}{2^2} = \dfrac{3}{4}$, so the new force is $\dfrac{3F}{4}$, option (@K).`,
  d: 2, c: 'application', t: [1],
}), () => near(3 / 4, 0.75) || 'factor');
add('law-mcq3', mcq({
  stem: 'The universal gravitational constant G has',
  right: 'the same value for every pair of bodies, everywhere', wrong: ['a larger value for heavier bodies', 'a smaller value at a greater distance between the bodies', 'a different value on the Moon than on the Earth'],
  sol: 'G is a constant of nature; that is why it is called universal, option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
add('law-mcq4', mcq({
  stem: 'A student says: "The Earth pulls the Moon harder than the Moon pulls the Earth, because the Earth has the larger mass." This statement is',
  right: 'wrong, because the two pulls are equal in size and opposite in direction', wrong: ['correct, because the force is proportional to the larger mass', 'wrong, because the Moon pulls the Earth harder as it is nearer the Sun', 'correct, because the Earth is at the centre of the orbit'],
  sol: 'F = G m₁ m₂ / r² is the same for both bodies, and they form an action-reaction pair, option (@K).',
  d: 3, c: 'analysis', t: [1],
}));
add('law-mcq5', mcq({
  stem: 'Which of the following is NOT explained by the universal law of gravitation?',
  right: 'the lengthening of a metal rod when it is heated', wrong: ['the occurrence of ocean tides', 'the motion of the Moon round the Earth', 'the fall of a ripe mango to the ground'],
  sol: 'Thermal expansion concerns heat, not the attraction between masses, option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
add('law-mcq6', mcq({
  stem: 'Gravity differs from gravitation in that',
  right: 'gravity is the pull of the Earth on a body, while gravitation is the attraction between any two bodies', wrong: ['gravity acts between any two bodies, while gravitation acts only on the Earth', 'gravity is a repulsion, while gravitation is an attraction', 'gravity depends on the charge of a body, while gravitation depends on its mass'],
  sol: 'Gravity is the special case of gravitation in which one body is the Earth, option (@K).',
  d: 2, c: 'understanding', t: [1, 2],
}));
add('law-mcq7', mcq({
  stem: 'In the equation of the law of gravitation, the distance r is measured between',
  right: 'the centres of the two bodies', wrong: ['the nearest surfaces of the two bodies', 'the centre of one body and the surface of the other', 'the farthest points of the two bodies'],
  sol: 'The law is stated for the distance between the centres, option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('ar-law', ar({
  a: 'Two students sitting side by side do not feel any pull towards each other.',
  r: 'The gravitational force between two small bodies is extremely small because the value of G is very small.',
  key: 'c',
  sol: 'Both are true; the tiny force is the reason it cannot be felt, so (R) explains (A), option (c).',
  d: 2, c: 'analysis', t: [1],
}));
add('law-tf', tf({
  stem: 'In a gravitational pair, the heavier body pulls the lighter body with the larger force.',
  key: 'f',
  sol: 'False. The two pulls are equal in size, whatever the masses.',
  d: 1, c: 'understanding', t: [1],
}));
add('law-fill', fill({
  stem: 'The gravitational force between two bodies is inversely proportional to the ___ of the distance between their centres.',
  acc: [['square']],
  sol: 'The **square** of the distance.',
  d: 1, c: 'recall', t: [1],
}));
add('law-term', term({
  stem: 'Name the quantity whose SI unit is N m² kg⁻².',
  model: 'The universal gravitational constant, **G**.', sol: 'The universal gravitational constant.', sch: 'G named',
  d: 1, c: 'recall', t: [1],
}));
add('law-short2a', short({
  marks: 2, wl: null,
  stem: 'State the universal law of gravitation in words and write the equation that expresses it.',
  model: 'Any two bodies attract each other with a force that grows with **the product of their masses** and falls with **the square of the distance between their centres**.\n\n' + r`$F = \dfrac{G m_1 m_2}{r^2}$`,
  sol: 'Proportional to the product of the masses, inversely to the square of the distance; F = G m₁ m₂ / r².',
  scheme: [['Both proportionalities stated', 1], ['Equation with G', 1]],
  d: 1, c: 'understanding', t: [1],
}));
add('law-short2b', short({
  marks: 2, wl: null,
  stem: 'Two books lie 10 cm apart on a table. Give two reasons why they do not move towards each other.',
  model: 'The gravitational force between them is **extremely small**, because their masses are small and **G is very small**. It is also far smaller than the **friction** that holds each book on the table.',
  sol: 'The force is very small; friction is far larger.',
  scheme: [['Tiny force: small masses and tiny G', 1], ['Friction much larger', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('law-short3a', short({
  marks: 3, wl: null,
  stem: 'The force of attraction between two bodies is F. State the new force when (i) the mass of one body is doubled, (ii) the distance between them is halved, (iii) both masses and the distance are doubled.',
  model: r`**(i)** The factor is 2, so the force is **${K.R3[0]}F**.` + '\n\n' + r`**(ii)** The factor is $\dfrac{1}{(1/2)^2}$, so the force is **${K.R3[1]}F**.` + '\n\n' + r`**(iii)** The factor is $\dfrac{2 \times 2}{2^2} = 1$, so the force is **F** (unchanged).`,
  sol: '2F; 4F; F.',
  scheme: [['2F', 1], ['4F', 1], ['F, unchanged', 1]],
  d: 2, c: 'application', t: [1],
}), () => K.R3.join() === '2,4,1' || 'ratios');
add('law-short3b', short({
  marks: 3, wl: null,
  stem: 'A stone of mass 2 kg is released near the ground. (a) Find the force with which the Earth pulls it. (b) State the magnitude and direction of the force with which the stone pulls the Earth. (c) Why do we see only the stone move? (g = 10 m s⁻²)',
  model: r`**(a)** $F = m g = 2 \times 10 = 20$ N.` + '\n\n**(b)** **20 N**, directed **upwards**, towards the stone.\n\n**(c)** The same force gives the stone a large acceleration, but gives the Earth, whose mass is enormous, an **acceleration too small to notice**.',
  sol: '20 N; 20 N upwards; huge mass of the Earth.',
  scheme: [['20 N with working', 1], ['20 N upwards', 1], ['Enormous mass, negligible acceleration', 1]],
  d: 3, c: 'analysis', t: [1, 3],
}), () => 2 * K.g10 === 20 || 'force');

// numericals on the law
add('num-ball', num({
  stem: 'Two steel balls of mass 4 kg and 25 kg have their centres 0.5 m apart. Find the gravitational force between them, in units of 10⁻⁸ N. (G = 6.67 × 10⁻¹¹ N m² kg⁻²)',
  value: K.N1_M, tol: 0.01, unit: '× 10⁻⁸ N',
  sol: r`$F = \dfrac{G m_1 m_2}{r^2} = \dfrac{6.67 \times 10^{-11} \times 4 \times 25}{0.5^2} = 2.67 \times 10^{-8}$ N, so $F = ${K.N1_M}$ in units of $10^{-8}$ N.`,
  scheme: [['Formula and substitution', 0.5], [`${K.N1_M} × 10⁻⁸ N`, 0.5]],
  d: 2, c: 'application', t: [1],
}), (q) => near(K.pull(4, 25, 0.5), 2.668e-8) && K.N1_M === 2.67 || 'F');
add('num-ships', num({
  stem: 'Two ships of mass 3 × 10⁶ kg and 5 × 10⁶ kg are 100 m apart. Find the gravitational force between them in newton. (G = 6.67 × 10⁻¹¹ N m² kg⁻²)',
  value: K.N2_3, tol: 0.001, unit: 'N',
  sol: r`$F = \dfrac{G m_1 m_2}{r^2} = \dfrac{6.67 \times 10^{-11} \times 3 \times 10^{6} \times 5 \times 10^{6}}{100^2} = ${K.N2_3}$ N.`,
  scheme: [['Formula and substitution', 0.5], [`${K.N2_3} N`, 0.5]],
  d: 3, c: 'application', t: [1],
}), () => near(K.pull(3e6, 5e6, 100), 0.10005) || 'F');
add('num-r3', num({
  stem: 'The gravitational force between two bodies is 36 N. Find the force when the distance between them is tripled, the masses remaining the same.',
  value: K.N3, tol: 0, unit: 'N',
  sol: r`$F_{\text{new}} = 36 \times \dfrac{1}{3^2} = ${K.N3}$ N.`,
  scheme: [['Factor 1/9', 0.5], [`${K.N3} N`, 0.5]],
  d: 1, c: 'application', t: [1],
}), () => K.N3 === 4 || 'F');
add('num-mix', num({
  stem: 'Two bodies attract each other with a force of 18 N. The mass of the first body is doubled, the mass of the second is tripled and the distance between them is doubled. Find the new force.',
  value: K.N4, tol: 0, unit: 'N',
  sol: r`$F_{\text{new}} = 18 \times \dfrac{2 \times 3}{2^2} = 18 \times 1.5 = ${K.N4}$ N.`,
  scheme: [['Factor 6/4', 0.5], [`${K.N4} N`, 0.5]],
  d: 3, c: 'application', t: [1],
}), () => K.N4 === 27 || 'F');

// ---------------------------------------------------------------- t02 gravity and free fall
add('fall-mcq1', mcq({
  stem: 'A cricket ball and a heavier iron ball are dropped together from the same height inside a long evacuated tube. The two balls',
  right: 'reach the bottom at the same moment', wrong: ['reach the bottom at different moments, with the iron ball first because the pull on it is greater', 'reach the bottom at different moments, with the cricket ball first', 'have different accelerations because their masses differ'],
  sol: 'With no air, both have the acceleration g, option (@K).',
  d: 1, c: 'understanding', t: [2],
}));
add('fall-mcq2', mcq({
  stem: 'A pebble is dropped from rest from a bridge. Taking g = 10 m s⁻², its speed after 6 s is',
  right: `${K.F6[0]} m s⁻¹`, wrong: [`${K.F6[1]} m s⁻¹`, `${K.F6[2]} m s⁻¹`, '10 m s⁻¹'],
  sol: r`$v = g t = 10 \times 6 = ${K.F6[0]}$ m s⁻¹, option (@K).`,
  d: 2, c: 'application', t: [2],
}), () => K.F6[0] === 60 || 'v');
add('fall-mcq3', mcq({
  stem: 'A coin and a crumpled paper ball reach the floor almost together, but a flat sheet of paper dropped with them drifts down slowly. The main reason is that',
  right: 'air resistance acts much more strongly on the flat sheet', wrong: ['the Earth pulls the flat sheet with a smaller acceleration', 'the mass of the flat sheet becomes less as it falls', 'the flat sheet has no weight'],
  sol: 'The large area of the flat sheet makes the air resistance large compared with its weight, option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('fall-mcq4', mcq({
  stem: 'A ball thrown vertically upwards is momentarily at rest at its highest point. The acceleration of the ball at that instant is',
  right: 'about 10 m s⁻², directed downwards', wrong: ['zero, because the ball is at rest', 'about 10 m s⁻², directed upwards', 'less than 10 m s⁻², directed downwards'],
  sol: 'Gravity alone acts all through the flight, so the acceleration is g downwards even at the top, option (@K).',
  d: 3, c: 'analysis', t: [2],
}));
add('fall-mcq5', mcq({
  stem: 'The acceleration of a freely falling body does not depend on its mass because',
  right: 'the pull of the Earth is proportional to the mass, so the mass cancels when force is divided by mass', wrong: ['the Earth pulls all bodies with the same force', 'heavier bodies are slowed more by the air', 'the acceleration depends only on the shape of the body'],
  sol: 'a = m g / m = g for every body, option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('ar-fall', ar({
  a: 'In a vacuum, a heavy stone falls faster than a light stone.',
  r: 'The Earth pulls a heavy stone with a greater force than it pulls a light stone.',
  key: 'b',
  sol: '(A) is false because both stones have the acceleration g in a vacuum; (R) is true, but the larger pull is balanced by the larger mass, option (b).',
  d: 3, c: 'analysis', t: [2],
}));
add('fill-free', fill({
  marks: 3,
  stem: 'A body that moves under gravity alone is said to be in ___. All such bodies, whatever their ___, have the same ___.',
  acc: [['free fall', 'freefall'], ['mass', 'masses'], ['acceleration']],
  sol: 'Free fall; mass; acceleration.',
  d: 1, c: 'recall', t: [2],
}));
add('free-term', term({
  stem: 'Define free fall.',
  model: 'The motion of a body under the action of **gravity alone**.', sol: 'Motion under gravity alone.', sch: 'Gravity alone',
  d: 1, c: 'recall', t: [2],
}));
add('fall-short2a', short({
  marks: 2, wl: null,
  stem: 'A coin and a flat sheet of paper are dropped together from a height. State which lands first and why. What would happen in a vacuum?',
  model: 'The **coin** lands first, because **air resistance** slows the sheet of paper far more than the coin. In a vacuum there is no air, so the two would land **together**.',
  sol: 'Coin first due to air resistance; together in a vacuum.',
  scheme: [['Coin first because of air resistance', 1], ['Together in a vacuum', 1]],
  d: 2, c: 'application', t: [2],
}));
add('fall-short2b', short({
  marks: 2, wl: null,
  stem: 'Define free fall and state the value of g in SI units that is used when a question gives no other value.',
  model: 'Free fall is motion in which **gravity is the only force** on the body. Near the Earth, **g = 9.8 m s⁻²**.',
  sol: 'Gravity alone; 9.8 m s⁻².',
  scheme: [['Definition', 1], ['9.8 m s⁻²', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('fall-short3', short({
  marks: 3, wl: null,
  stem: `A ball is dropped from the top of a tower ${K.S3_FALL_H} m high. Find (a) the time it takes to reach the ground and (b) its speed just before it lands. (g = 10 m s⁻²)`,
  model: r`**(a)** $s = \tfrac{1}{2} g t^2$, so $80 = \tfrac{1}{2} \times 10 \times t^2$ and $t^2 = 16$, giving $t = ${K.S3_FALL_T}$ s.` + '\n\n' + r`**(b)** $v = g t = 10 \times ${K.S3_FALL_T} = ${K.S3_FALL_V}$ m s⁻¹.`,
  sol: '4 s; 40 m s⁻¹.',
  scheme: [['Formula s = ½ g t² with substitution', 1], ['t = 4 s', 1], ['v = 40 m s⁻¹', 1]],
  d: 3, c: 'application', t: [2],
}), () => K.S3_FALL_T === 4 && K.S3_FALL_V === 40 || 'fall');
add('num-v', num({
  stem: 'A stone is dropped from rest from the edge of a cliff. Find its speed after 2.5 s. (g = 10 m s⁻²)',
  value: K.N8, tol: 0, unit: 'm s⁻¹',
  sol: r`$v = g t = 10 \times 2.5 = ${K.N8}$ m s⁻¹.`,
  scheme: [['v = g t with substitution', 0.5], [`${K.N8} m s⁻¹`, 0.5]],
  d: 1, c: 'application', t: [2],
}), () => K.N8 === 25 || 'v');
add('num-s', num({
  stem: 'A coin released from rest falls freely for 1.5 s. Find the distance it falls. (g = 10 m s⁻²)',
  value: K.N9, tol: 0.01, unit: 'm',
  sol: r`$s = \tfrac{1}{2} g t^2 = \tfrac{1}{2} \times 10 \times 1.5^2 = ${K.N9}$ m.`,
  scheme: [['s = ½ g t² with substitution', 0.5], [`${K.N9} m`, 0.5]],
  d: 2, c: 'application', t: [2],
}), () => K.N9 === 11.25 || 's');
add('num-t', num({
  stem: 'A ball is dropped from a building 125 m high. Find the time it takes to reach the ground. (g = 10 m s⁻²)',
  value: K.N10_T, tol: 0, unit: 's',
  sol: r`$s = \tfrac{1}{2} g t^2$, so $125 = \tfrac{1}{2} \times 10 \times t^2$, $t^2 = 25$ and $t = ${K.N10_T}$ s.`,
  scheme: [['Substitution in s = ½ g t²', 0.5], [`${K.N10_T} s`, 0.5]],
  d: 3, c: 'application', t: [2],
}), () => K.N10_T === 5 || 't');
add('num-g', num({
  stem: 'A body of mass 2.5 kg is pulled by the Earth with a force of 24.5 N. Find the acceleration due to gravity at that place.',
  value: K.N11, tol: 0.01, unit: 'm s⁻²',
  sol: r`$g = \dfrac{W}{m} = \dfrac{24.5}{2.5} = ${K.N11}$ m s⁻².`,
  scheme: [['g = W / m with substitution', 0.5], [`${K.N11} m s⁻²`, 0.5]],
  d: 2, c: 'application', t: [2, 3],
}), () => K.N11 === 9.8 || 'g');

// ---------------------------------------------------------------- t03 mass and weight
add('wt-mcq1', mcq({
  stem: 'The SI unit of weight is',
  right: 'newton', wrong: ['kilogram', 'joule', 'pascal'],
  sol: 'Weight is a force, so its SI unit is the newton, option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('wt-mcq2', mcq({
  stem: 'The instrument that is used to measure the weight of a body is a',
  right: 'spring balance', wrong: ['beam balance', 'measuring cylinder', 'metre scale'],
  sol: 'A spring balance reads the force of gravity on the body, option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('wt-mcq3', mcq({
  stem: 'A sealed packet of food is carried from the Earth to the Moon. Compared with its values on the Earth, on the Moon the packet has',
  right: 'the same mass and a smaller weight', wrong: ['a smaller mass and the same weight', 'the same mass and the same weight', 'a smaller mass and a smaller weight'],
  sol: 'Mass is the amount of matter and does not change; weight falls because g is smaller there, option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('wt-mcq4', mcq({
  stem: 'The weight of a body of mass 3 kg is (g = 10 m s⁻²)',
  right: `${K.W3} N`, wrong: ['0.3 N', '3 N', '300 N'],
  sol: r`$W = m g = 3 \times 10 = ${K.W3}$ N, option (@K).`,
  d: 1, c: 'application', t: [3],
}), () => K.W3 === 30 || 'W');
add('wt-mcq5', mcq({
  stem: 'One kilogram force (1 kgf) is equal to',
  right: '9.8 N', wrong: ['1 N', '0.98 N', '98 N'],
  sol: 'It is the weight of a one-kilogram mass, 1 × 9.8 N, option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('wt-mcq6', mcq({
  stem: 'Which pair correctly describes mass and weight?',
  right: 'Mass is a scalar and weight is a vector', wrong: ['Mass is a vector and weight is a scalar', 'Both are scalars', 'Both are vectors'],
  sol: 'Weight is a force and has a direction; mass has only magnitude, option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('wt-mcq7', mcq({
  stem: 'A body weighs 196 N at a place where g = 9.8 m s⁻². Its mass is',
  right: `${K.M196} kg`, wrong: [`${K.M196_BAD[0]} kg`, `${K.M196_BAD[1]} kg`, '2 kg'],
  sol: r`$m = \dfrac{W}{g} = \dfrac{196}{9.8} = ${K.M196}$ kg, option (@K).`,
  d: 2, c: 'application', t: [3],
}), () => K.M196 === 20 || 'm');
add('ar-wt', ar({
  a: 'The mass of a body remains the same when it is taken to the Moon.',
  r: 'The weight of a body on the Moon is less than its weight on the Earth.',
  key: 'd',
  sol: 'Both statements are true, but the change in weight does not explain why the mass is unchanged (mass is the amount of matter), option (d).',
  d: 2, c: 'understanding', t: [3],
}));
add('wt-tf', tf({
  stem: 'The weight of a body is a force and is directed towards the centre of the Earth.',
  key: 't',
  sol: 'True. Weight is the pull of the Earth, a force acting downwards.',
  d: 1, c: 'understanding', t: [3],
}));
add('g-tf', tf({
  stem: 'The universal gravitational constant G and the acceleration due to gravity g are the same quantity.',
  key: 'f',
  sol: 'False. G is a constant of the law for any two bodies; g is the acceleration near the Earth.',
  d: 2, c: 'understanding', t: [2, 3],
}));
add('kgf-fill', fill({
  stem: 'To change a weight from kgf to newton, multiply it by ___.',
  acc: [['9.8']],
  sol: 'Multiply by **9.8**.',
  d: 1, c: 'recall', t: [3],
}));
add('weight-term', term({
  stem: 'Define the weight of a body.',
  model: 'The **force with which the Earth attracts the body**.', sol: 'The pull of the Earth on the body.', sch: 'Force of attraction by the Earth',
  d: 1, c: 'recall', t: [3],
}));
add('units-match', match({
  marks: 5,
  stem: 'Match each quantity in Column A with its SI unit or instrument in Column B.',
  pairs: [
    ['Mass', 'kilogram'],
    ['Weight', 'newton'],
    ['Universal gravitational constant', 'N m² kg⁻²'],
    ['Acceleration due to gravity', 'm s⁻²'],
    ['Instrument that measures mass', 'beam balance'],
  ],
  order: [3, 1, 0, 4, 2],
  sol: 'Mass: kilogram; weight: newton; G: N m² kg⁻²; g: m s⁻²; mass is measured on a beam balance.',
  d: 1, c: 'recall', t: [1, 2, 3],
}));
add('wt-short2a', short({
  marks: 2, wl: null,
  stem: 'State two differences between mass and weight.',
  model: '**Mass** is the quantity of matter, a scalar, measured in kilogram on a beam balance and unchanged by place. **Weight** is a force (a vector), measured in newton on a spring balance and changes from place to place. (Any two.)',
  sol: 'Any two of: quantity of matter against force; scalar against vector; kg against N; beam against spring balance; fixed against place-dependent.',
  scheme: [['First difference', 1], ['Second difference', 1]],
  d: 1, c: 'recall', t: [3],
}));
add('wt-short2b', short({
  marks: 2, wl: null,
  stem: 'An astronaut of mass 72 kg stands on the Moon. State her mass there and say whether her weight is more or less than on the Earth, with a reason.',
  model: 'Her mass is still **72 kg**. Her weight is **less** than on the Earth, because **g on the Moon is smaller** than g on the Earth.',
  sol: '72 kg; less, since g is smaller on the Moon.',
  scheme: [['Mass 72 kg', 1], ['Less, because g is smaller', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('wt-short2c', short({
  marks: 2, wl: null,
  stem: 'Using 1 kgf = 9.8 N, convert (a) 20 kgf into newton and (b) 245 N into kgf.',
  model: r`**(a)** $20 \times 9.8 = ${K.S2_CONV}$ N.` + '\n\n' + r`**(b)** $\dfrac{245}{9.8} = ${K.S2_BACK}$ kgf.`,
  sol: '196 N; 25 kgf.',
  scheme: [['196 N', 1], ['25 kgf', 1]],
  d: 2, c: 'application', t: [3],
}), () => K.S2_CONV === 196 && K.S2_BACK === 25 || 'conv');
add('wt-short3a', short({
  marks: 3, wl: null,
  stem: 'A man has a mass of 62 kg. Taking g = 9.8 m s⁻², find (a) his weight in newton, (b) his weight in kgf and (c) the mass of a body that weighs 441 N.',
  model: r`**(a)** $W = m g = 62 \times 9.8 = ${K.S3_W_N}$ N.` + `\n\n**(b)** Weight in kgf = mass in kg = **${K.S3_W_KGF} kgf**.\n\n` + r`**(c)** $m = \dfrac{W}{g} = \dfrac{441}{9.8} = ${K.S3_M_FROM}$ kg.`,
  sol: '607.6 N; 62 kgf; 45 kg.',
  scheme: [['607.6 N', 1], ['62 kgf', 1], ['45 kg', 1]],
  d: 2, c: 'application', t: [3],
}), () => K.S3_W_N === 607.6 && K.S3_M_FROM === 45 || 'weight');
add('wt-short3b', short({
  marks: 3, wl: null,
  stem: 'A spring balance and a beam balance are each used to weigh the same body, first on the Earth and then at a place where g is smaller. Say which balance gives a different reading at the second place, and explain why the other does not.',
  model: 'The **spring balance** shows a **smaller** reading, because it measures the weight, which falls when g is smaller. The **beam balance** compares the body with standard masses that are pulled by the same smaller g, so the **two pans stay balanced** and it still gives the same mass.',
  sol: 'Spring balance changes; beam balance compares masses so it does not.',
  scheme: [['Spring balance named, smaller reading', 1], ['It measures weight, which depends on g', 1], ['Beam balance compares masses, so unchanged', 1]],
  d: 3, c: 'analysis', t: [3],
}));
add('num-w54', num({
  stem: 'Find the weight, in newton, of a student of mass 54 kg. (g = 10 m s⁻²)',
  value: K.N5, tol: 0, unit: 'N',
  sol: r`$W = m g = 54 \times 10 = ${K.N5}$ N.`,
  scheme: [['W = m g with substitution', 0.5], [`${K.N5} N`, 0.5]],
  d: 1, c: 'application', t: [3],
}), () => K.N5 === 540 || 'W');
add('num-kgf', num({
  stem: 'A bag of vegetables weighs 8.5 kgf. Express its weight in newton. (1 kgf = 9.8 N)',
  value: K.N6, tol: 0.05, unit: 'N',
  sol: r`$W = 8.5 \times 9.8 = ${K.N6}$ N.`,
  scheme: [['8.5 × 9.8', 0.5], [`${K.N6} N`, 0.5]],
  d: 2, c: 'application', t: [3],
}), () => K.N6 === 83.3 || 'W');
add('num-mass', num({
  stem: 'A parcel weighs 735 N at a place where g = 9.8 m s⁻². Find its mass in kilogram.',
  value: K.N7, tol: 0, unit: 'kg',
  sol: r`$m = \dfrac{W}{g} = \dfrac{735}{9.8} = ${K.N7}$ kg.`,
  scheme: [['m = W / g with substitution', 0.5], [`${K.N7} kg`, 0.5]],
  d: 2, c: 'application', t: [3],
}), () => K.N7 === 75 || 'm');

// ---------------------------------------------------------------- 10-mark structured questions
add('long-pair', long({
  marks: 10, wl: null,
  stem: 'The figure shows two heavy spherical bodies in a model of the gravitational pull between two bodies. Its parts are lettered A to E.\n\n(a) Name the parts A, B, C, D and E. [3]\n\n(b) State the universal law of gravitation and write its equation, naming each symbol. [3]\n\n(c) Compare C and D in magnitude and direction, and say why the two do not cancel each other. [2]\n\n' + `(d) The force between the bodies is ${K.LF0} N. Find the new force if the mass of A is doubled and the distance between the centres is also doubled. [2]`,
  model: '**(a)** **A** is the first body, of mass m₁; **B** is the second body, of mass m₂; **C** is the force exerted by B on A (towards B); **D** is the force exerted by A on B (towards A); **E** is the distance between the centres of the bodies.\n\n**(b)** The force of attraction between two bodies is proportional to the **product of their masses** and inversely proportional to the **square of the distance between their centres**. ' + r`$F = \dfrac{G m_1 m_2}{r^2}$, where $G$ is the universal gravitational constant, $m_1$ and $m_2$ are the masses and $r$ the distance between the centres.` + '\n\n**(c)** C and D are **equal in magnitude and opposite in direction**. They act on **different bodies** (C on A, D on B), so they cannot cancel.\n\n' + r`**(d)** Factor $= \dfrac{2 \times 1}{2^2} = 0.5$, so the new force $= ${K.LF0} \times 0.5 = ${K.LF_NEW}$ N.`,
  sol: 'A, B bodies; C, D forces; E distance; law and equation; equal and opposite on different bodies; 0.30 N.',
  scheme: [['A and B named', 1], ['C and D named', 1], ['E named', 1], ['Product of the masses', 1], ['Inverse square of the distance, between the centres', 1], ['Equation with symbols named', 1], ['Equal and opposite', 1], ['Different bodies', 1], ['Factor 1/2', 1], [`${K.LF_NEW} N`, 1]],
  d: 2, c: 'application', t: [1],
  assets: [pairFig],
}), () => K.LF_NEW === 0.3 || 'F');
add('long-girls', long({
  marks: 10, wl: null,
  stem: 'Two girls of mass 48 kg and 52 kg stand 2.0 m apart, the distance being measured between their centres. (G = 6.67 × 10⁻¹¹ N m² kg⁻²; g = 10 m s⁻²)\n\n(a) Write the equation for the gravitational force between two bodies. [2]\n\n(b) Calculate the force of attraction between the girls, in units of 10⁻⁸ N. [3]\n\n(c) Find the force when they move to 1.0 m apart, using the ratio method. [2]\n\n(d) The weight of the 48 kg girl is 480 N. Say about how many times this is larger than the pull in (b), and why the girls do not feel that pull. [3]',
  model: r`**(a)** $F = \dfrac{G m_1 m_2}{r^2}$.` + '\n\n' + r`**(b)** $F = \dfrac{6.67 \times 10^{-11} \times 48 \times 52}{2^2} = ${K.GIRL_FM} \times 10^{-8}$ N.` + '\n\n' + r`**(c)** The distance is halved, so the factor is $\dfrac{1}{(1/2)^2} = 4$ and $F = 4 \times ${K.GIRL_FM} \times 10^{-8} = ${K.GIRL_F2M} \times 10^{-8}$ N.` + '\n\n' + r`**(d)** $\dfrac{480}{${K.GIRL_FM} \times 10^{-8}}$ is about $1.2 \times 10^{10}$, so the weight is **about ten billion times larger**. The pull is far too small to notice beside the pull of the Earth and the friction at their feet, because G is tiny and their masses are small.`,
  sol: 'F = G m₁ m₂ / r²; 4.16 × 10⁻⁸ N; 16.6 × 10⁻⁸ N; about 10¹⁰ times, so the pull is negligible.',
  scheme: [['Equation', 1], ['Equation with the symbols named', 1], ['Substitution', 1], ['Working', 1], [`${K.GIRL_FM} × 10⁻⁸ N`, 1], ['Factor 4', 1], [`${K.GIRL_F2M} × 10⁻⁸ N`, 1], ['About 10¹⁰ times', 1], ['G tiny, small masses', 1], ['Earth pull and friction dominate', 1]],
  d: 3, c: 'application', t: [1],
}), () => K.GIRL_FM === 4.16 && K.GIRL_F2M === 16.6 && K.GIRL_TIMES === 1.2e10 || 'girls');
add('long-table', long({
  marks: 10, wl: null,
  stem: `A student drops a ball from a tower and records its distance fallen, s, at several times, t:\n\n| t (s) | ${K.TAB_T.join(' | ')} |\n|---|---|---|---|---|\n| s (m) | ${K.TAB_S.join(' | ')} |\n\n(a) Work out s ÷ t² for each reading and state what you notice. [3]\n\n(b) Using s = ½ g t², find the value of g from your answer. [2]\n\n(c) Find the speed of the ball at the end of 2 s. [2]\n\n(d) State the shape of a graph of s against t², and say what its gradient represents. [3]`,
  model: r`**(a)** $s \div t^2$ is ${K.TAB_K.join(', ')}, that is **${K.TAB_K[0]} m s⁻² every time**. The ratio is constant.` + '\n\n' + r`**(b)** $s = \tfrac{1}{2} g t^2$, so $\dfrac{s}{t^2} = \dfrac{g}{2}$ and $g = 2 \times ${K.TAB_K[0]} = ${K.TAB_G}$ m s⁻².` + '\n\n' + r`**(c)** $v = g t = 10 \times 2 = ${K.TAB_V2}$ m s⁻¹.` + '\n\n' + r`**(d)** A **straight line through the origin**, because $s$ is proportional to $t^2$. Its gradient is $\tfrac{1}{2} g$, which is ${K.TAB_K[0]} m s⁻².`,
  sol: 's/t² = 5 each time; g = 10 m s⁻²; 20 m s⁻¹; straight line through the origin with gradient g/2.',
  scheme: [['Working of s ÷ t²', 1], ['All equal to 5', 1], ['Constant ratio stated', 1], ['s/t² = g/2', 1], ['g = 10 m s⁻²', 1], ['v = g t with substitution', 1], ['20 m s⁻¹', 1], ['Straight line through the origin', 1], ['s proportional to t²', 1], ['Gradient is g/2', 1]],
  d: 3, c: 'application', t: [2],
}), () => K.TAB_G === 10 && K.TAB_V2 === 20 || 'g');
add('long-tube', long({
  marks: 10, wl: null,
  stem: 'A long glass tube contains a coin of mass 5 g and a small feather of mass 0.5 g. (g = 10 m s⁻²)\n\n(a) The tube, full of air, is turned upside down quickly. State which object reaches the other end first and why. [2]\n\n(b) The air is now pumped out and the tube is turned upside down again. State what is seen and what it shows. [2]\n\n(c) Find the pull of the Earth on the coin and on the feather, and the ratio of the two pulls. Why are the two accelerations still equal? [3]\n\n' + `(d) The tube is ${K.TUBE_L} m long. In the vacuum, find the time the coin takes to fall through it and its speed on reaching the bottom. [3]`,
  model: '**(a)** The **coin** reaches the bottom first, because the **air resistance** on the feather is large compared with its tiny weight.\n\n**(b)** The coin and the feather reach the bottom **together**. This shows that, without air, **all bodies fall with the same acceleration**.\n\n' + r`**(c)** Pull on the coin $= 0.005 \times 10 = ${sig(K.COIN_W, 2)}$ N; on the feather $= 0.0005 \times 10 = ${sig(K.FEATHER_W, 2)}$ N; ratio $= ${K.PULL_RATIO}$. The coin has ten times the pull but also ten times the mass, so $a = \dfrac{mg}{m} = g$ for both.` + '\n\n' + r`**(d)** $s = \tfrac{1}{2} g t^2$: $0.8 = \tfrac{1}{2} \times 10 \times t^2$, $t^2 = 0.16$ and $t = ${sig(K.TUBE_T, 2)}$ s. Speed $v = g t = 10 \times 0.4 = ${sig(K.TUBE_VEL, 2)}$ m s⁻¹.`,
  sol: 'Coin first (air resistance); together in vacuum; 0.05 N, 0.005 N, ratio 10, same g; 0.4 s and 4 m s⁻¹.',
  scheme: [['Coin first', 1], ['Air resistance on the feather', 1], ['Together in vacuum', 1], ['All bodies fall with the same acceleration', 1], ['Both pulls', 1], ['Ratio 10', 1], ['Mass cancels, a = g', 1], ['t = 0.4 s with working', 1], ['v = g t', 1], ['4 m s⁻¹', 1]],
  d: 3, c: 'application', t: [2],
}), () => sig(K.TUBE_T, 2) === 0.4 && sig(K.TUBE_VEL, 2) === 4 || 'tube');
add('long-sack', long({
  marks: 10, wl: null,
  stem: 'A shopkeeper finds with a beam balance that a sack of rice has a mass of 2.5 kg.\n\n(a) State the weight of the sack in kgf. [1]\n\n(b) Find its weight in newton (i) taking g = 10 m s⁻² and (ii) taking 1 kgf = 9.8 N. [3]\n\n(c) The sack is taken to the Moon. State how (i) its mass and (ii) its weight change. [2]\n\n(d) Give three differences between mass and weight, other than the places they are measured. [3]\n\n(e) Name the balance whose reading would change on the Moon. [1]',
  model: `**(a)** **${K.SH_M} kgf**, the same number as the mass.\n\n` + r`**(b)** (i) $W = m g = 2.5 \times 10 = ${K.SH_N}$ N. (ii) $W = 2.5 \times 9.8 = ${K.SH_N98}$ N.` + '\n\n**(c)** (i) The mass is **unchanged**. (ii) The weight becomes **smaller**, because g is smaller on the Moon.\n\n**(d)** Mass is the quantity of matter and weight is a force; mass is a scalar and weight a vector; the SI unit of mass is the kilogram and of weight the newton. (Any three, including the instruments if wished.)\n\n**(e)** The **spring balance**.',
  sol: '2.5 kgf; 25 N and 24.5 N; mass same, weight less; three differences; spring balance.',
  scheme: [['2.5 kgf', 1], ['25 N with working', 1], ['24.5 N with working', 2], ['Mass unchanged', 1], ['Weight smaller, with reason', 1], ['First difference', 1], ['Second difference', 1], ['Third difference', 1], ['Spring balance', 1]],
  d: 2, c: 'application', t: [3],
}), () => K.SH_N === 25 && K.SH_N98 === 24.5 || 'rice');
add('long-mango', long({
  marks: 10, wl: null,
  stem: 'A mango of mass 0.15 kg falls from a tree. (g = 10 m s⁻²; mass of the Earth = 6 × 10²⁴ kg)\n\n(a) Find the force with which the Earth pulls the mango. [2]\n\n(b) State the magnitude and direction of the force with which the mango pulls the Earth. [2]\n\n(c) Find the acceleration that this force gives the Earth, and say how many times smaller it is than the acceleration of the mango. [3]\n\n(d) Why is the motion of the Earth never noticed? [1]\n\n(e) Explain why a mango of twice the mass would fall with the same acceleration. [2]',
  model: r`**(a)** $F = m g = 0.15 \times 10 = ${K.APPLE_W}$ N.` + '\n\n' + `**(b)** **${K.APPLE_W} N**, directed **upwards**, towards the mango, as the forces of a pair are equal and opposite.\n\n` + r`**(c)** $a = \dfrac{F}{M} = \dfrac{1.5}{6 \times 10^{24}} = 2.5 \times 10^{-25}$ m s⁻². The mango's acceleration is 10 m s⁻², which is about $4 \times 10^{25}$ times larger.` + '\n\n**(d)** The acceleration of the Earth is **absurdly small**, because its mass is enormous.\n\n**(e)** The pull doubles but so does the mass, so the **mass cancels** in $a = \\dfrac{mg}{m}$ and the acceleration stays equal to g.'.replace('\\\\dfrac', '\\dfrac'),
  sol: '1.5 N; 1.5 N upwards; 2.5 × 10⁻²⁵ m s⁻², 4 × 10²⁵ times smaller; huge mass; mass cancels.',
  scheme: [['Formula with substitution', 1], ['1.5 N', 1], ['1.5 N', 1], ['Upwards, equal and opposite', 1], ['a = F / M with substitution', 1], ['2.5 × 10⁻²⁵ m s⁻²', 1], ['4 × 10²⁵ times smaller', 1], ['Huge mass of the Earth', 1], ['Pull doubles with the mass', 1], ['Mass cancels, a = g', 1]],
  d: 4, c: 'analysis', t: [1, 2],
}), () => K.APPLE_W === 1.5 && sig(K.EARTH_A, 2) === 2.5e-25 && K.A_RATIO === 4e25 || 'earth');
