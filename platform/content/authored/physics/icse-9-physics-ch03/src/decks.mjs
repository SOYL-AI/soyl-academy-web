// ICSE 9 Physics ch03 Force and Newton's Laws of Motion — Part 1 (t01–t03: kinds and units of force, first law and inertia),
// Part 2 (t04–t05: momentum, second law, third law).
import { sl, deck, table, flow, svgV, r } from '../../icse-9-physics-ch01/src/lib.mjs';
import { FORCES, INV_SQ, COIN, BUS, CATCH, PAIR, ROCKET } from './svgs.mjs';
import * as K from './calc.mjs';

const fig = {
  forces: svgV(FORCES, 'A block pulled along a table with tension, friction, normal reaction and weight shown'),
  isq: svgV(INV_SQ, 'Graph of force against distance following the inverse square law'),
  coin: svgV(COIN, 'A coin on a card over a tumbler dropping into the tumbler when the card is flicked away'),
  bus: svgV(BUS, 'A passenger upright in a moving bus and lurching forward when the bus brakes'),
  catch: svgV(CATCH, 'A fielder catching a ball with hands fixed and with hands drawn back'),
  pair: svgV(PAIR, 'A boy pushing a wall with the action and reaction forces shown'),
  rocket: svgV(ROCKET, 'A rocket with the force on the exhaust gases downward and the force on the rocket upward'),
};

export const deck1 = deck({
  part: 1,
  title: 'Force and Newton’s Laws of Motion — Part 1: Forces, their units and the first law',
  goals: [
    'Classify forces as contact or non-contact and state the inverse square dependence of non-contact forces on distance',
    'Convert between newton, dyne, kgf and gf',
    'State Newton’s first law and explain inertia of rest and of motion',
  ],
  slides: [
    sl('title', 'What is a force?', {
      b: 'Part 1 — a force is a push or a pull. It can start or stop a motion, change its speed or direction, or change the shape of a body.',
      v: flow('LR', [['f', 'Force'], ['c', 'Changes motion or shape'], ['l', 'Laws of motion']], [['f', 'c'], ['c', 'l']], 'Flow: force, changes motion or shape, laws of motion'),
      n: 'A push or a pull is a force. A force can set a body moving, bring it to rest, speed it up, slow it down, turn it, or change its shape. Newton gave three laws that tell us how force and motion are linked.',
    }),
    sl('diagram', 'Contact forces', {
      b: 'A **contact force** acts only when two bodies touch. Examples: **friction** (opposes sliding), **normal reaction** (the support pushing back, at right angles to the surface) and **tension** (the pull of a stretched string).',
      v: fig.forces,
      n: 'A block pulled along a table has four forces on it. Tension pulls it forward, friction opposes the sliding, and the table pushes up with the normal reaction. The weight pulls it down. Tension, friction and normal reaction need contact.',
    }),
    sl('diagram', 'Non-contact forces and the inverse square law', {
      b: 'A **non-contact force** acts without touching: **gravitational**, **electric** and **magnetic** forces. Each weakens as the distance increases. For many of them the force varies as **1 ÷ distance²**: double the distance and the force becomes one quarter.',
      v: fig.isq,
      n: 'Gravity, electric force and magnetic force act across a gap. They get weaker with distance. In the inverse square law, doubling the distance makes the force one quarter, and tripling the distance makes it one ninth.',
    }),
    sl('check', 'Quick check: kinds of force', {
      b: 'Think about whether the bodies must touch.',
      v: table(['Force', 'Touch needed?'], [['Friction', 'yes'], ['Tension', 'yes'], ['Magnetic', '?']], 'Table of three forces and whether contact is needed'),
      chk: 'chk-contact',
      n: 'Which of these forces can act on a body without any contact?',
    }),
    sl('concept', 'Units of force: newton and dyne', {
      b: 'The **newton (N)** is the SI unit: the force that gives a mass of **1 kg** an acceleration of **1 m s⁻²**. The **dyne** is the cgs unit: the force that gives **1 g** an acceleration of **1 cm s⁻²**. **1 N = 10⁵ dyne**.',
      v: table(['System', 'Unit of force', 'Definition'], [['SI', 'newton (N)', '1 kg × 1 m s⁻²'], ['cgs', 'dyne', '1 g × 1 cm s⁻²']], 'Table of the newton and the dyne with their definitions'),
      n: 'One newton is the force that gives one kilogram an acceleration of one metre per second squared. One dyne does the same for one gram and one centimetre per second squared. One newton equals one hundred thousand dynes.',
    }),
    sl('concept', 'Gravitational units: kgf and gf', {
      b: 'The **kilogram-force (kgf)** is the force with which the Earth pulls a mass of 1 kg: **1 kgf = 9.8 N** (10 N if the question says g = 10). **1 gf** is the pull on 1 g: **1 gf = 980 dyne**. Also 1 kgf = 1000 gf.',
      v: table(['Unit', 'Value'], [['1 N', '10⁵ dyne'], ['1 kgf', '9.8 N'], ['1 gf', '980 dyne'], ['1 kgf', '1000 gf']], 'Table of conversions between newton, dyne, kgf and gf'),
      n: 'A kilogram force is the weight of one kilogram, so it equals nine point eight newtons. A gram force is the weight of one gram, which is nine hundred and eighty dynes. These units are used only for conversion here.',
    }),
    sl('example', 'Worked example 1: converting units of force', {
      b: r`**Problem.** Convert (a) 4 kgf to N, (b) 2.5 N to dyne, (c) 250 gf to N. (1 kgf = 9.8 N; 1 N = $10^5$ dyne; 1 gf = 980 dyne)

**Step 1.** $4 \times 9.8 = ${K.U.kgf4}$ N.

**Step 2.** $2.5 \times 10^5 = ${K.U.n25_dyne}$ dyne.

**Step 3.** $250 \times 980 = ${K.U.gf250_dyne}$ dyne $= \dfrac{${K.U.gf250_dyne}}{100000} = ${K.U.gf250_n}$ N.`,
      v: table(['Given', 'Factor', 'Answer'], [['4 kgf', '× 9.8', '39.2 N'], ['2.5 N', '× 10⁵', '250000 dyne'], ['250 gf', '× 980 then ÷ 10⁵', '2.45 N']], 'Table showing three conversions of force units'),
      n: 'Choose the conversion factor and multiply. Four kilogram force is thirty nine point two newtons. Two point five newtons is two hundred and fifty thousand dynes. Two hundred and fifty gram force is two hundred and forty five thousand dynes, or two point four five newtons.',
    }),
    sl('check', 'Quick check: units', {
      b: 'Use 1 N = 10⁵ dyne.',
      v: table(['Force', 'Convert to'], [['5 N', 'dyne']], 'Table giving a force in newton to be converted to dyne'),
      chk: 'chk-units',
      n: 'A force of five newtons is how many dynes?',
    }),
    sl('diagram', 'Newton’s first law and inertia', {
      b: '**Newton’s first law:** a body continues in its state of **rest** or of **uniform motion in a straight line** unless an **external force** acts on it. This tendency to stay as it is is **inertia**; a force is what **changes** this state. **Inertia of rest:** the coin stays when the card is flicked away.',
      v: fig.coin,
      n: 'A body at rest stays at rest and a body moving steadily keeps moving in a straight line, unless a force acts. This is inertia. When the card is flicked away sharply, the coin stays where it was and then drops into the tumbler.',
    }),
    sl('diagram', 'Inertia of motion in everyday life', {
      b: '**Inertia of motion:** a moving body tends to keep moving. When a bus **brakes suddenly**, the passenger’s body **lurches forward**. Other examples: dust leaves a beaten carpet; a rider is thrown forward when a cycle stops suddenly. **Dynamic inertia** is inertia of motion; **static inertia** is inertia of rest.',
      v: fig.bus,
      n: 'When a bus brakes, the feet stop with the bus but the upper body tends to go on moving, so the passenger lurches forward. This is inertia of motion, also called dynamic inertia. Inertia of rest is also called static inertia.',
    }),
    sl('check', 'Quick check: inertia', {
      b: 'Decide whether the body tends to stay at rest or to keep moving.',
      v: table(['Situation', 'Inertia'], [['Passenger lurches forward as the bus brakes', '?']], 'Table giving a situation and asking the kind of inertia'),
      chk: 'chk-inertia',
      n: 'A passenger lurches forward when a moving bus stops suddenly. This is an example of which kind of inertia?',
    }),
    sl('example', 'Worked example 2: the inverse square law', {
      b: r`**Problem.** Two charged balls attract each other with a force of 36 N when they are 1 m apart. Find the force when the distance is made 3 m. (The force varies as $\dfrac{1}{r^2}$.)

**Step 1.** Distance becomes 3 times, so the force becomes $\dfrac{1}{3^2} = \dfrac{1}{9}$ of its value.

**Step 2.** New force $= \dfrac{36}{9} = ${K.ISQ_3}$ N.`,
      v: table(['Distance r', 'Force'], [['1 m', '36 N'], ['2 m', '9 N'], ['3 m', '4 N'], ['4 m', '2.25 N']], 'Table of force at distances of 1, 2, 3 and 4 metres'),
      n: 'If the distance becomes three times, the force becomes one over three squared, which is one ninth. One ninth of thirty six newtons is four newtons.',
    }),
    sl('check', 'Quick check: the inverse square law', {
      b: 'Square the factor by which the distance changes.',
      v: table(['Distance', 'Force'], [['r', 'F'], ['2 r', '?']], 'Table of distance and force when the distance is doubled'),
      chk: 'chk-inv',
      n: 'The distance between two bodies that attract each other is doubled. What happens to the force between them?',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Contact forces: friction, normal reaction, tension. Non-contact forces: gravitational, electric, magnetic (inverse square for many).',
        'Units: 1 N = 10⁵ dyne; 1 kgf = 9.8 N; 1 gf = 980 dyne; 1 kgf = 1000 gf.',
        'First law: a body keeps its state of rest or uniform motion in a straight line unless an external force acts; this property is inertia.',
        'Inertia of rest (static) and inertia of motion (dynamic) explain many everyday events.',
      ],
      v: table(['Force', 'Contact or not'], [['Friction, tension, normal reaction', 'contact'], ['Gravitational, electric, magnetic', 'non-contact']], 'Summary table of contact and non-contact forces'),
      n: 'To sum up. Forces may need contact or not. The newton and the dyne are the absolute units, and the kilogram force and gram force are gravitational units. The first law says a body keeps its state unless a force acts, and that tendency is inertia.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'Say whether a force is contact or non-contact when asked to classify it.',
        'State the conversion factor and which value of g you use for kgf.',
        'Name the kind of inertia (rest or motion) in an explanation and say which part of the body tends to stay as it was.',
        'For the first law, mention both rest and uniform motion in a straight line, and the external force.',
      ],
      v: table(['Slip', 'Fix'], [['Writing 1 kgf = 9.8 dyne', '1 kgf = 9.8 N'], ['Saying a force is needed to keep a body moving steadily', 'No net force is needed; a force changes the motion'], ['Forgetting the straight line in the first law', 'Say uniform motion in a straight line']], 'Table of three common slips in Part 1 and their fixes'),
      n: 'Exam tips. Quote the conversion factor and the value of g. In an explanation say which kind of inertia is involved. And when you state the first law, include rest, uniform motion in a straight line, and the external force.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Force and Newton’s Laws of Motion — Part 2: Momentum and the second and third laws',
  goals: [
    'Define linear momentum and show that force equals the rate of change of momentum, which is ma for constant mass',
    'Solve simple numerical problems combining F = ma with the equations of motion',
    'Identify action-reaction pairs and explain why they do not cancel',
  ],
  slides: [
    sl('title', 'From momentum to force', {
      b: 'Part 2 — heavier and faster bodies are harder to stop. Momentum measures this, and force is how fast momentum changes.',
      v: flow('LR', [['m', 'Momentum'], ['s', 'Second law F = ma'], ['t', 'Third law pairs']], [['m', 's'], ['s', 't']], 'Flow: momentum, second law, third law pairs'),
      n: 'A heavy lorry is harder to stop than a bicycle at the same speed. Momentum measures this. Newton’s second law links force to the rate of change of momentum, and the third law tells us forces come in pairs.',
    }),
    sl('concept', 'Linear momentum', {
      b: '**Linear momentum** is the product of **mass and velocity**: **p = mv**. It is a **vector** in the direction of the velocity. SI unit: **kg m s⁻¹**; cgs unit: g cm s⁻¹.',
      v: table(['Body', 'Mass', 'Velocity', 'Momentum p = mv'], [['Cricket ball', '0.15 kg', '20 m s⁻¹', `${K.BALL_P} kg m s⁻¹`], ['Trolley', '4 kg', '2.5 m s⁻¹', `${K.TROLLEY_P} kg m s⁻¹`]], 'Table of the momentum of a ball and of a trolley'),
      n: 'Momentum is mass times velocity. A cricket ball of zero point one five kilogram at twenty metres per second has a momentum of three kilogram metres per second. Momentum has the direction of the velocity.',
    }),
    sl('concept', 'The second law: F = ma', {
      b: r`**Second law:** the **rate of change of momentum** is proportional to the applied force and takes place in the direction of the force.

For a body of constant mass $m$ whose velocity changes from $u$ to $v$ in time $t$:

$F = \dfrac{mv - mu}{t} = m \dfrac{v - u}{t} = ma$.`,
      v: table(['Unit', 'Definition'], [['1 newton', 'F = 1 kg × 1 m s⁻²'], ['1 dyne', 'F = 1 g × 1 cm s⁻²']], 'Table of the definition of the newton and the dyne from the second law'),
      n: 'Force is the rate of change of momentum. For a body of constant mass, the change in momentum is mass times the change in velocity, so force equals mass times acceleration. This also defines the newton and the dyne.',
    }),
    sl('check', 'Quick check: F = ma', {
      b: 'Divide the force by the mass.',
      v: table(['Force', 'Mass'], [['20 N', '8 kg']], 'Table giving a force and a mass'),
      chk: 'chk-fma',
      n: 'A force of twenty newtons acts on a body of mass eight kilograms. What is the acceleration?',
    }),
    sl('example', 'Worked example 1: F = ma with equations of motion', {
      b: r`**Problem.** A car of mass 800 kg is pushed from rest by a force of 1200 N. Find its speed and the distance covered in 5 s.

**Step 1.** $a = \dfrac{F}{m} = \dfrac{1200}{800} = ${K.CAR_A}$ m s⁻².

**Step 2.** $v = u + at = 0 + ${K.CAR_A} \times 5 = ${K.CAR_V}$ m s⁻¹.

**Step 3.** $S = \dfrac{1}{2}at^2 = \dfrac{1}{2} \times ${K.CAR_A} \times 25 = ${K.CAR_S}$ m.`,
      v: table(['Quantity', 'Value'], [['m', '800 kg'], ['F', '1200 N'], ['a', '1.5 m s⁻²'], ['v after 5 s', '7.5 m s⁻¹'], ['S in 5 s', '18.75 m']], 'Table of the data and answers for the car'),
      n: 'First use the second law to get the acceleration, one point five metres per second squared. Then use the equations of motion from the last chapter for the speed and the distance.',
    }),
    sl('check', 'Quick check: force and motion', {
      b: 'Find the acceleration first, then use an equation of motion.',
      v: table(['Force', 'Mass', 'Start', 'Time'], [['150 N', '50 kg', 'rest', '4 s']], 'Table giving force, mass, starting condition and time'),
      chk: 'chk-eq',
      n: 'A force of one hundred and fifty newtons acts on a body of mass fifty kilograms starting from rest for four seconds. What is its final velocity?',
    }),
    sl('example', 'Worked example 2: force from a change of momentum', {
      b: r`**Problem.** A car of mass 1000 kg moving at 15 m s⁻¹ is brought to rest in 5 s. Find the retarding force and the distance covered.

**Step 1.** $a = \dfrac{0 - 15}{5} = ${K.BRAKE_A}$ m s⁻².

**Step 2.** $F = ma = 1000 \times (${K.BRAKE_A}) = ${K.BRAKE_F}$ N, so the retarding force is 3000 N opposite to the motion.

**Step 3.** $S = \dfrac{u + v}{2} \times t = 7.5 \times 5 = ${K.BRAKE_S}$ m.`,
      v: table(['Quantity', 'Value'], [['Change of momentum', '1000 × 15 = 15000 kg m s⁻¹'], ['Time', '5 s'], ['Force = change ÷ time', '3000 N'], ['Distance', '37.5 m']], 'Table of the change of momentum, time, force and distance of the braking car'),
      n: 'The momentum falls by fifteen thousand kilogram metres per second in five seconds, so the force is three thousand newtons against the motion. The distance is the average velocity times the time, thirty seven point five metres.',
    }),
    sl('diagram', 'Why a fielder draws the hands back', {
      b: 'Stopping a ball of mass 0.16 kg moving at 25 m s⁻¹ means removing a momentum of **4 kg m s⁻¹**. **F = change of momentum ÷ time**: in **0.05 s** the force is **80 N**; in **0.2 s** it is only **20 N**. A longer time means a smaller force, so the hands hurt less.',
      v: fig.catch,
      n: 'The ball has to lose the same momentum either way. If it stops in a very short time, the force is large. If the fielder draws the hands back, the time is longer and the force is four times smaller.',
    }),
    sl('check', 'Quick check: a longer stopping time', {
      b: 'Same change of momentum, longer time.',
      v: table(['Case', 'Time to stop'], [['Hands fixed', 'short'], ['Hands drawn back', 'long']], 'Table comparing the stopping time with hands fixed and hands drawn back'),
      chk: 'chk-catch',
      n: 'A fielder draws the hands back while catching a fast ball. The force on the hands is smaller because',
    }),
    sl('diagram', 'Newton’s third law', {
      b: '**Third law:** to every **action** there is an **equal and opposite reaction**. The two forces act on **different bodies**, at the **same time**, and are of the **same kind**. A boy pushing a wall pushes it forward; the wall pushes him back with an equal force.',
      v: fig.pair,
      n: 'When one body pushes another, the second body pushes back with an equal force in the opposite direction. The two forces act on different bodies. The push on the wall and the push on the boy are one such pair.',
    }),
    sl('diagram', 'Pairs in walking, rowing and rockets', {
      b: '**Walking:** the foot pushes the ground backward; the ground pushes the foot forward. **Rowing:** the oar pushes the water backward; the water pushes the boat forward. **Rocket:** the rocket pushes the gases down; the gases push the rocket up.',
      v: fig.rocket,
      n: 'In walking, the foot pushes the ground back and the ground pushes you forward. A boat moves forward because the oar pushes water back. A rocket burns fuel and throws gas downward, and the gas pushes the rocket upward.',
    }),
    sl('concept', 'Why action and reaction do not cancel', {
      b: 'Two forces cancel only if they act on the **same body**. Action and reaction act on **different bodies**, so each one produces its own effect. Your push on a trolley acts on the trolley; the trolley’s push acts on you.',
      v: table(['Forces on the same body', 'Action-reaction pair'], [['Weight and normal reaction on a book', 'Push of boy on wall and push of wall on boy'], ['Can cancel (balanced)', 'Never cancel, different bodies']], 'Table comparing forces on one body with an action-reaction pair'),
      n: 'Forces cancel only when they act on one body. The action and its reaction act on two different bodies, so they cannot cancel each other, and each causes its own motion.',
    }),
    sl('check', 'Quick check: a pair', {
      b: 'A pair acts on two different bodies.',
      v: table(['Action', 'Reaction'], [['A hammer hits a nail', '?']], 'Table giving an action and asking for its reaction'),
      chk: 'chk-third',
      n: 'A hammer hits a nail. Which force is the reaction to the force of the hammer on the nail?',
    }),
    sl('example', 'Worked example 3: finding a pair in a situation', {
      b: r`**Problem.** A boy of mass 40 kg stands on the ground and pushes a wall with a force of 120 N. (a) Name the reaction. (b) Give its magnitude and direction. (c) Why does the wall not move away even though 120 N acts on it?

**Step 1.** Action: force of the boy on the wall. Reaction: **force of the wall on the boy**.

**Step 2.** Magnitude $= ${K.WALL.F}$ N, opposite in direction to the push on the wall.

**Step 3.** The wall is fixed to the ground; friction at its base balances the push, so the net force on it is zero.`,
      v: table(['Force', 'Acts on', 'Size'], [['Push of boy', 'wall', '120 N'], ['Push of wall', 'boy', '120 N']], 'Table of the action and reaction forces between the boy and the wall'),
      n: 'The reaction to the boy pushing the wall is the wall pushing the boy. It is equal to one hundred and twenty newtons and acts in the opposite direction. The wall stays still because other forces on it balance the push.',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'Momentum p = mv (vector); unit kg m s⁻¹.',
        'Second law: F = rate of change of momentum = ma for constant mass; 1 N = 1 kg m s⁻²; 1 dyne = 1 g cm s⁻².',
        'A longer stopping time means a smaller force for the same change of momentum.',
        'Third law: action and reaction are equal, opposite, act on different bodies and so do not cancel.',
      ],
      v: table(['Law', 'Statement in brief'], [['First', 'no force, no change in the state of motion'], ['Second', 'F = ma'], ['Third', 'equal and opposite forces on different bodies']], 'Summary table of Newton’s three laws'),
      n: 'To sum up. Momentum is mass times velocity. Force equals mass times acceleration, which is the rate of change of momentum. A longer time to stop means a smaller force. And action and reaction are equal and opposite and act on different bodies.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'Convert to SI (kg, m, s) before using F = ma, or use g, cm and dyne together.',
        'Write F = ma, substitute, then use an equation of motion for v or S.',
        'In a pair question say which force acts on which body.',
        'State the reason for a longer stopping time in terms of change of momentum.',
      ],
      v: table(['Slip', 'Fix'], [['Using grams with newtons', 'Convert grams to kilograms first'], ['Saying action and reaction cancel', 'They act on different bodies'], ['Forgetting the sign of a retarding force', 'Say the force is opposite to the motion']], 'Table of three common slips in Part 2 and their fixes'),
      n: 'Exam tips. Convert to SI first. Write the second law, substitute, and then use an equation of motion. Say which force acts on which body in a pair, and never say that action and reaction cancel.',
    }),
  ],
});
