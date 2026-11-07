// ICSE 9 Physics ch04 Gravitation. Deck 1: the universal law of gravitation (t01). Deck 2: gravity, free fall, mass and
// weight (t02, t03). Numbers come from calc.mjs; narration carries no digits, symbols or unit abbreviations.
import { sl, deck, table, flow, plot, svgV, r } from '../../icse-9-physics-ch01/src/lib.mjs';
import { PAIR, STROBE, SPRING } from './svgs.mjs';
import { D1_F0, D1_F, ST_F3, GRAPH, TABLE_RATIO, FALL_S, FALL_V, D2_V, D2_S, W_1KG, W_4KG, D2_M, D2_WN, SB_M, SB_N } from './calc.mjs';

export const V = {
  pair: svgV(PAIR, 'Two bodies attract each other with equal and opposite forces along the line joining their centres, a distance r apart'),
  strobe: svgV(STROBE, 'Strobe picture of a ball falling from rest, shown at one-second intervals with distances and speeds'),
  spring: svgV(SPRING, 'A spring balance with a five kilogram body, showing the pointer at five kilogram force and forty-nine newton'),
};

export const deck1 = deck({
  part: 1,
  title: 'Gravitation — Part 1: The universal law of gravitation',
  goals: [
    'State the universal law of gravitation and write its equation',
    'Predict how the gravitational force changes when the masses or the separation change',
    'Describe why the law is called universal and name its important effects',
  ],
  slides: [
    sl('title', 'Why does the apple fall?', {
      b: 'Part 1 — the same pull that drops a ripe mango also keeps the Moon circling the Earth.',
      v: flow('LR', [['a', 'Mango on the tree'], ['b', 'Pulled by the Earth'], ['c', 'Falls to the ground']], [['a', 'b'], ['b', 'c']], 'Flow from a mango on a tree to being pulled by the Earth to falling to the ground'),
      n: 'A ripe mango drops from a branch and lands on the ground. Newton asked why it falls straight down and whether the same pull reaches as far as the Moon. His answer was one law for the whole universe.',
    }),
    sl('concept', 'Every body attracts every other body', {
      b: 'The force of attraction between any two bodies in the universe is called **gravitation**. It acts between a book and a desk, between two cricket balls and between the Sun and the planets. It is always an **attraction**, never a push.',
      v: table(['Pair of bodies', 'Is there gravitational attraction?', 'Can we notice it?'], [['Earth and a falling mango', 'Yes', 'Yes, because the Earth is huge'], ['Two cricket balls on a table', 'Yes', 'No, the force is tiny'], ['Sun and Earth', 'Yes', 'Yes, it keeps the Earth in its orbit']], 'Table of three pairs of bodies and whether the gravitational attraction can be noticed'),
      n: 'Gravitation acts between every pair of bodies, large or small. Two cricket balls on a table do attract each other, but the force is far too small to notice. When one body is as huge as the Earth, the pull becomes obvious.',
    }),
    sl('concept', 'The universal law of gravitation', {
      b: 'The force of attraction between two bodies is **directly proportional to the product of their masses** and **inversely proportional to the square of the distance between their centres**. It acts along the line joining the centres.',
      v: table(['Change', 'Effect on the force'], [['Mass of either body increases', 'Force increases in the same ratio'], ['Distance between the centres increases', 'Force decreases much faster, as the square of the distance'], ['Medium or position of other bodies', 'The pair of bodies is unaffected; the law holds everywhere']], 'Table showing how the gravitational force depends on mass and on distance'),
      m: [r`F = \dfrac{G\, m_1 m_2}{r^{2}}`],
      n: 'Newton stated the law in two parts. The force grows with the product of the two masses. It falls with the square of the distance between their centres. Put both together and you get one equation with a constant called big gee.',
    }),
    sl('concept', 'What each symbol means', {
      b: 'In $F = \\dfrac{G m_1 m_2}{r^2}$ the constant **G** is the same for every pair of bodies anywhere. It is called the **universal gravitational constant**.',
      v: table(['Symbol', 'Meaning', 'SI unit'], [['F', 'Gravitational force', 'newton'], ['m₁, m₂', 'Masses of the two bodies', 'kilogram'], ['r', 'Distance between the centres', 'metre'], ['G', 'Universal gravitational constant, 6.67 × 10⁻¹¹', 'newton metre squared per kilogram squared']], 'Table of the symbols in the law of gravitation with their meanings and SI units'),
      n: 'F is the force in newtons. The two masses are in kilograms and the distance between their centres is in metres. The constant G has a very small value, which is why the force between everyday objects is too small to feel.',
    }),
    sl('check', 'Quick check: the unit of G', {
      b: 'Work out the unit of G from the equation by making G the subject.',
      v: table(['Quantity', 'SI unit'], [['F', 'newton'], ['r', 'metre'], ['m', 'kilogram']], 'Table of the SI units of force, distance and mass'),
      chk: 'chk-G',
      n: 'Rearrange the law to give G in terms of force, distance and mass. Which option is the correct unit of the gravitational constant?',
    }),
    sl('concept', 'A pair of equal and opposite forces', {
      b: 'Body 1 pulls body 2 with force $F$, and body 2 pulls body 1 with the **same** force $F$ in the **opposite** direction. The two forces act on **different bodies**, so they never cancel.',
      v: V.pair,
      n: 'The pull is mutual. The first body attracts the second, and the second attracts the first with exactly the same strength, in the opposite direction. This is the third law of motion at work. Each arrow acts on a different body.',
    }),
    sl('check', 'Quick check: the pull of a mango', {
      b: 'A mango is pulled towards the Earth. Think of the pair of forces.',
      v: table(['Body', 'Pulled by', 'Direction of pull'], [['Mango', 'Earth', 'Down, towards the Earth'], ['Earth', 'Mango', 'Up, towards the mango']], 'Table of the two forces in the mango and Earth pair'),
      chk: 'chk-pair',
      n: 'The Earth pulls the mango downwards. What can you say about the pull of the mango on the Earth?',
    }),
    sl('concept', 'Changing the masses or the distance', {
      b: 'Work with **ratios**. If the masses are multiplied by $a$ and $b$ and the distance by $k$, the new force is $F \\times \\dfrac{ab}{k^{2}}$.',
      v: table(['What happens', 'Force becomes'], [['One mass doubled', `${TABLE_RATIO.m1x2} times the old force`], ['Distance doubled', 'one quarter of the old force'], ['Distance halved', `${TABLE_RATIO.r_half} times the old force`], ['Both masses doubled and distance doubled', 'the same force']], 'Table of how the gravitational force changes when the masses or the distance change'),
      n: 'Do not recalculate from scratch. Double one mass and the force doubles. Double the distance and the force drops to a quarter. Halve the distance and it becomes four times larger. Double both masses and the distance together, and the force stays the same.',
    }),
    sl('example', 'Worked example 1: a ratio problem', {
      b: r`**Problem.** The force between two bodies is ${D1_F0} N. The mass of the second body is doubled and the distance between them is tripled. Find the new force.

**Step 1.** The factor is $\dfrac{1 \times 2}{3^{2}} = \dfrac{2}{9}$.

**Step 2.** New force $= ${D1_F0} \times \dfrac{2}{9} = ${D1_F}$ N.`,
      v: table(['Quantity', 'Factor'], [['First mass', '1'], ['Second mass', '2'], ['Distance', '3, so the force falls by 9'], ['Force overall', 'two ninths of the old force']], 'Table of the factors for each quantity in the ratio problem'),
      n: 'Write the factor for each quantity. The masses give one and two. The distance is tripled, so divide by nine. The overall factor is two ninths. Multiply the old force by it, and the new force is about two point six seven newtons.',
    }),
    sl('check', 'Quick check: two factors at once', {
      b: 'Use the ratio method for two changes together.',
      v: table(['Change', 'Factor'], [['First mass', 'three times'], ['Distance', 'three times']], 'Table of the changes in one mass and in distance'),
      chk: 'chk-ratio',
      n: 'The first mass is made three times larger and the distance is also made three times larger. By what factor does the force change?',
    }),
    sl('concept', 'The graph of force against distance', {
      b: 'For a fixed pair of bodies the force falls steeply as they move apart. Doubling the distance cuts the force to **a quarter**; quadrupling it cuts it to **one-sixteenth**.',
      v: plot({ x: { min: 1, max: 4, label: 'distance r (arbitrary units)' }, y: { min: 0, max: 70, label: 'force F (arbitrary units)' }, functions: [{ expr: '64/x^2', label: 'F is proportional to 1 / r²', domain: [1, 4] }], points: GRAPH.map(([x, y]) => ({ at: [x, y], label: `r = ${x}, F = ${y}` })) }, 'Graph of gravitational force against distance, falling from sixty-four units at one unit of distance to sixteen at two and four at four', 'The inverse-square curve.'),
      n: 'This curve shows a force dropping as the distance grows. From one unit to two units of distance, the force falls from sixty four to sixteen, which is one quarter. At four units it is only four. The curve never reaches zero but gets very small.',
    }),
    sl('example', 'Worked example 2: the pull between two students', {
      b: r`**Problem.** Two students of mass 55 kg and 65 kg sit 1.5 m apart. Find the gravitational force between them. ($G = 6.67 \times 10^{-11}$ N m² kg⁻²)

**Step 1.** $F = \dfrac{G m_1 m_2}{r^{2}} = \dfrac{6.67 \times 10^{-11} \times 55 \times 65}{1.5^{2}}$.

**Step 2.** $F = 1.06 \times 10^{-7}$ N.`,
      v: table(['Quantity', 'Value'], [['m₁', '55 kg'], ['m₂', '65 kg'], ['r', '1.5 m'], ['F', `${String(ST_F3).replace('e-7', '')} × 10⁻⁷ N, about one ten-millionth of a newton`]], 'Table of the data and the answer for the force between two students'),
      n: 'Put the numbers into the law. Multiply the constant by both masses and divide by the square of the distance. The answer is about one ten millionth of a newton, far too small to feel. That is why we do not drift towards each other.',
    }),
    sl('concept', 'Why the law matters', {
      b: 'The law explains many things at once. The same pull of the Earth makes bodies **fall**, makes the **Moon orbit** the Earth, holds the **planets** in orbit round the Sun and causes **tides**.',
      v: table(['Effect', 'Which bodies attract'], [['Objects fall to the ground', 'Earth and the object'], ['The Moon stays in orbit', 'Earth and the Moon'], ['Planets circle the Sun', 'Sun and each planet'], ['Ocean tides', 'Moon and the oceans, with help from the Sun']], 'Table of four effects of gravitation and the bodies that attract'),
      n: 'Newton showed that one law covers falling fruit and orbiting planets. The Earth holds the Moon, the Sun holds the planets, and the Moon lifts the ocean to make tides. Nothing in the sky needs a separate rule.',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Every body attracts every other body; the force acts along the line joining their centres.',
        'The force is proportional to the product of the masses and inversely proportional to the square of the distance.',
        'The equation is F = G m₁ m₂ / r², with G = 6.67 × 10⁻¹¹ N m² kg⁻².',
        'The two forces of a pair are equal, opposite and act on different bodies.',
      ],
      v: table(['Change', 'Force'], [['Mass doubled', 'doubled'], ['Distance doubled', 'one quarter'], ['Distance halved', 'four times']], 'Summary table of the changes in force'),
      n: 'To sum up. Gravitation is a universal attraction. The force rises with the product of the masses and falls with the square of the distance. The forces on the two bodies are equal and opposite. Use ratios for quick answers.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'Measure the distance between the centres, not the surfaces.',
        'For ratio questions, write the factor for each quantity before multiplying.',
        'Write the unit of G when you substitute: N m² kg⁻².',
        'Say that the two forces act on different bodies when asked why they do not cancel.',
      ],
      v: table(['Slip', 'Fix'], [['Forgetting to square the distance', 'Divide by r squared'], ['Using the radius of a body as the distance', 'Use the distance between the centres'], ['Saying the heavier body pulls harder on the lighter one', 'The two pulls are equal']], 'Table of three common slips and their fixes'),
      n: 'Exam tips. Measure from centre to centre. Square the distance, and show the factor for each quantity in ratio problems. Remember that the two pulls of a pair are equal in size, whatever the masses may be.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Gravitation — Part 2: Free fall, mass and weight',
  goals: [
    'Explain why all bodies fall with the same acceleration when air resistance is absent',
    'Compare mass and weight in terms of definition, unit, nature and measuring instrument',
    'Calculate the weight of a body from its mass in newton and kgf',
  ],
  slides: [
    sl('title', 'Dropping things', {
      b: 'Part 2 — gravity pulls every falling body, heavy or light, with the same acceleration.',
      v: flow('LR', [['a', 'Gravity of the Earth'], ['b', 'Body released'], ['c', 'Speed grows every second']], [['a', 'b'], ['b', 'c']], 'Flow from the gravity of the Earth to a body released to speed growing every second'),
      n: 'Drop a stone from a bridge and watch it. It does not move at a steady speed. It speeds up all the way down. In this part we find how fast, and why a feather and a stone can fall together.',
    }),
    sl('concept', 'Gravity and the acceleration due to gravity', {
      b: 'The pull of the **Earth** on a body is called **gravity**. It gives every freely falling body the same acceleration, the **acceleration due to gravity**, $g$. Near the Earth, $g \\approx 9.8$ m s⁻². Many problems use $g = 10$ m s⁻² and say so.',
      v: table(['Term', 'Meaning'], [['Gravitation', 'Attraction between any two bodies'], ['Gravity', 'Attraction by the Earth on a body'], ['g', 'Acceleration of a body falling freely near the Earth, 9.8 m s⁻²']], 'Table distinguishing gravitation, gravity and the acceleration due to gravity'),
      n: 'Gravitation is the attraction between any two bodies. Gravity is the special case in which the Earth is one of the bodies. The acceleration it gives is about nine point eight metres per second every second. Many sums use ten for easy arithmetic.',
    }),
    sl('concept', 'Free fall', {
      b: 'A body is in **free fall** when gravity is the **only force** acting on it. In air, a feather falls slowly because **air resistance** is large for it. In a vacuum, a feather and a coin fall **together**.',
      v: table(['Place', 'Feather and coin released together', 'Reason'], [['Air', 'Coin lands first', 'Air resistance affects the feather far more'], ['Vacuum tube', 'Both land together', 'No air; only gravity acts']], 'Table comparing the fall of a feather and a coin in air and in a vacuum'),
      n: 'In ordinary air the coin beats the feather, not because gravity favours the coin but because the air holds the feather back. Pump the air out of a long tube and both reach the bottom at the same moment.',
    }),
    sl('concept', 'Speed and distance in free fall', {
      b: 'Starting from rest, a falling ball gains speed $g t$ and covers a distance $\\tfrac{1}{2} g t^{2}$ in time $t$ (with $g = 10$ m s⁻²). The gaps between pictures **grow** because the speed keeps increasing.',
      v: V.strobe,
      n: 'In the strobe picture, the ball is photographed once every second. The gaps between positions get bigger and bigger. After one second it has fallen a little, after two seconds much more. Speed grows by the same amount each second.',
    }),
    sl('check', 'Quick check: the strobe picture', {
      b: 'Read the distances in the strobe picture.',
      v: table(['Time', 'Distance fallen'], [['1 s', `${FALL_S[1]} m`], ['2 s', `${FALL_S[2]} m`], ['3 s', `${FALL_S[3]} m`]], 'Table of the times and distances in the strobe picture'),
      chk: 'chk-fall',
      n: 'In the picture, the ball falls a short distance in the first second and a longer distance in each later second. What does this show?',
    }),
    sl('example', 'Worked example 1: speed and distance after two seconds', {
      b: r`**Problem.** A ball is dropped from rest. Find its speed and the distance fallen after ${2} s. ($g = 10$ m s⁻²)

**Step 1.** $v = g t = 10 \times 2 = ${D2_V}$ m s⁻¹.

**Step 2.** $s = \tfrac{1}{2} g t^{2} = \tfrac{1}{2} \times 10 \times 2^{2} = ${D2_S}$ m.`,
      v: table(['Quantity', 'Working', 'Result'], [['Speed', '10 × 2', `${D2_V} m s⁻¹`], ['Distance', '½ × 10 × 2²', `${D2_S} m`]], 'Table of the working for the speed and distance after two seconds'),
      n: 'Speed after two seconds is gee times time, ten times two, which is twenty metres per second. The distance is half of gee times time squared, half of ten times four, which is twenty metres.',
    }),
    sl('concept', 'Why heavy and light bodies fall together', {
      b: 'A body of mass $m$ feels a pull $mg$. The acceleration is force divided by mass: $a = \\dfrac{mg}{m} = g$. The **mass cancels**, so every body has the same acceleration.',
      v: table(['Body', 'Pull of the Earth', 'Acceleration'], [['1 kg', `${W_1KG} N`, 'g'], ['4 kg', `${W_4KG} N`, 'g']], 'Table showing that a one kilogram and a four kilogram body both have acceleration g'),
      n: 'A heavier body is pulled harder, but it also has more mass to move. The two effects cancel exactly. A one kilogram ball and a four kilogram ball have the same acceleration, so they reach the ground together.',
    }),
    sl('concept', 'Mass and weight', {
      b: '**Mass** is the quantity of matter in a body. **Weight** is the force with which the Earth attracts the body: $W = m g$. Mass stays the same everywhere; weight depends on $g$ at the place.',
      v: table(['Property', 'Mass', 'Weight'], [['Meaning', 'Quantity of matter', 'Force of gravity on the body'], ['SI unit', 'kilogram', 'newton'], ['Nature', 'Scalar', 'Vector, directed to the centre of the Earth'], ['Instrument', 'Beam balance', 'Spring balance'], ['Changes with place?', 'No', 'Yes, as g changes']], 'Table comparing mass and weight in meaning, unit, nature, instrument and variation with place'),
      n: 'Mass tells how much matter there is, and it never changes. Weight is a force, and it depends on the place. Mass is measured in kilograms on a beam balance. Weight is measured in newtons on a spring balance.',
    }),
    sl('concept', 'Weight on a spring balance', {
      b: 'A spring balance shows weight. Its scale can be marked in **newton** or in **kilogram force (kgf)**. One kgf is the weight of a one-kilogram mass.',
      v: V.spring,
      n: 'The hanging body stretches the spring, and the pointer moves down to show its weight. The same pointer reads five on the kilogram force scale and forty nine on the newton scale. Both numbers describe one and the same pull.',
    }),
    sl('check', 'Quick check: reading the balance', {
      b: `The pointer stands at ${SB_M} kgf, which is ${SB_N} N.`,
      v: table(['Scale', 'Reading'], [['kgf', `${SB_M}`], ['N', `${SB_N}`]], 'Table of the two readings of the spring balance'),
      chk: 'chk-weight',
      n: 'The body on the balance has a mass of five kilograms. Which statement about it is correct?',
    }),
    sl('concept', 'Newton and kilogram force', {
      b: '$1\\ \\text{kgf} = 9.8$ N. To change kgf to newton, **multiply by 9.8**; to change newton to kgf, **divide by 9.8**. A body of mass $m$ kg weighs $m$ kgf.',
      v: table(['Mass', 'Weight in kgf', 'Weight in N (1 kgf = 9.8 N)'], [['1 kg', '1', '9.8'], ['2 kg', '2', '19.6'], ['10 kg', '10', '98']], 'Table of weights of three masses in kgf and in newton'),
      n: 'The kilogram force is a larger unit than the newton. Multiply by nine point eight to go from kilogram force to newtons, and divide to come back. A mass of so many kilograms always weighs that many kilogram force.',
    }),
    sl('example', 'Worked example 2: weight of a parcel', {
      b: r`**Problem.** A parcel has mass ${D2_M} kg. Find its weight in kgf and in N. ($1$ kgf $= 9.8$ N)

**Step 1.** Weight in kgf $= ${D2_M}$ kgf.

**Step 2.** Weight in N $= ${D2_M} \times 9.8 = ${D2_WN}$ N.`,
      v: table(['Step', 'Working', 'Result'], [['In kgf', 'same number as the mass', `${D2_M} kgf`], ['In N', `${D2_M} × 9.8`, `${D2_WN} N`]], 'Table of the working for the weight of the parcel in kgf and in newton'),
      n: 'In kilogram force the weight has the same number as the mass, seven point five. To get newtons, multiply by nine point eight. That gives seventy three point five newtons.',
    }),
    sl('check', 'Quick check: kgf and newton', {
      b: 'Convert a weight from kgf to newton.',
      v: table(['Weight', 'Unit'], [['3 kgf', '? N']], 'Table asking for three kilogram force in newton'),
      chk: 'chk-kgf',
      n: 'A body weighs three kilogram force. Which of the options gives its weight in newtons?',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'Free fall is motion under gravity alone; all bodies have the same acceleration g, about 9.8 m s⁻².',
        'In air, a light body falls slowly because of air resistance, not because gravity pulls it less.',
        'Weight W = m g is a force in newton; mass is the quantity of matter in kilogram.',
        '1 kgf = 9.8 N; weight changes with place, mass does not.',
      ],
      v: table(['Quantity', 'Unit', 'Measured by'], [['Mass', 'kilogram', 'beam balance'], ['Weight', 'newton or kgf', 'spring balance']], 'Summary table of mass and weight with units and instruments'),
      n: 'To sum up. Freely falling bodies share one acceleration. Weight is mass times gee, a force measured in newtons or kilogram force on a spring balance. Mass is matter, measured in kilograms, and it does not change from place to place.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'State which value of g you use: 9.8 or 10 m s⁻².',
        'Give both the unit and the instrument when comparing mass and weight.',
        'Write kgf to newton as a multiplication by 9.8, with the unit.',
        'Blame air resistance, not a smaller gravity, when a feather falls slowly.',
      ],
      v: table(['Slip', 'Fix'], [['Writing weight in kg', 'Weight is in N or kgf'], ['Saying a heavy body falls faster in a vacuum', 'All bodies fall together'], ['Saying mass changes on another planet', 'Only the weight changes']], 'Table of three common slips and their fixes'),
      n: 'Exam tips. Say which gee you use. Keep mass and weight apart, in meaning, unit and instrument. When a light body is slow, give air resistance as the reason. Mass does not change with place.',
    }),
  ],
});
