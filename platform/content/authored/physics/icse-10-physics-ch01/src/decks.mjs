// ICSE 10 Physics ch01 Force: Turning Effect and Circular Motion — two decks: Part 1 (t01–t02) translational and rotational
// motion, moment of a force, clockwise and anticlockwise moments; Part 2 (t03–t05) equilibrium and the principle of moments,
// centre of gravity, uniform circular motion, centripetal and centrifugal force.
import { sl, deck, table, flow, svgV, r } from './lib.mjs';
import { METRE_RULE, SPANNER, CIRCLE, CG } from './svgs.mjs';

const V = {
  spanner: svgV(SPANNER, 'A spanner on a nut with a downward force at the end of the handle and the perpendicular distance from the nut to the line of action marked'),
  rule: svgV(METRE_RULE, 'A metre rule balanced at 50 centimetres with 40 gram-force at 30 centimetres and 20 gram-force at 90 centimetres'),
  circle: svgV(CIRCLE, 'A body in uniform circular motion with velocity arrows along the tangent and force arrows towards the centre'),
  cg: svgV(CG, 'Centre of gravity of a rod, a ring and a triangle, and the plumb-line method for an irregular lamina'),
};

export const deck1 = deck({
  part: 1,
  title: 'Force — Part 1: Turning effect of a force',
  goals: [
    'Distinguish translational and rotational motion',
    'Calculate the moment of a force in N m and in dyne cm',
    'Explain why handles are placed far from the axis of rotation',
    'Find the resultant moment of several forces with a sign convention',
  ],
  slides: [
    sl('title', 'Push, pull — or turn?', {
      b: 'Part 1 — a force can move a body along, or make it turn about a fixed point. The turning effect depends on where the force acts.',
      v: table(['Everyday action', 'Effect of the force'], [['Pushing a trolley', 'Moves it along (translation)'], ['Opening a door', 'Turns it about the hinges (rotation)'], ['Tightening a nut', 'Turns it about its axis'], ['A rolling ball', 'Both translation and rotation']], 'Table of everyday actions and whether the force translates or rotates the body'),
      n: 'Namaste! When you push a trolley, it moves along the floor. When you push a door, it swings round its hinges. The same kind of push can move a body along or turn it, depending on how the body is held. In this part we learn how to measure the turning effect of a force.',
    }),
    sl('concept', 'Translational and rotational motion', {
      b: 'In **translational motion** every particle of the body moves through the same distance in the same direction (a car on a straight road). In **rotational motion** the body turns about a fixed axis, and each particle moves in a circle about that axis (a fan blade, a door). A force applied to a body **pivoted** at a point produces **rotation**; a force on a **free** body through its centre of gravity produces **translation**.',
      v: table(['Motion', 'What happens', 'Example'], [['Translational', 'All points move the same distance in the same direction', 'A lift going up'], ['Rotational', 'Body turns about a fixed axis', 'A ceiling fan'], ['Both', 'Turns while moving along', 'A rolling wheel']], 'Table comparing translational and rotational motion with examples'),
      n: 'In translational motion every part of the body moves the same distance in the same direction, like a lift rising. In rotational motion the body turns about a fixed line called the axis, and each part travels round a circle, like a ceiling fan. A wheel rolling along the road does both at once.',
    }),
    sl('diagram', 'Moment of a force', {
      b: r`The turning effect of a force is called its **moment** (or **torque**): $\text{moment} = F \times d$, where $d$ is the **perpendicular distance** from the axis of rotation to the line of action of the force. SI unit: **newton metre (N m)**; cgs unit: **dyne centimetre (dyne cm)**; $1\ \text{N m} = 10^{5}\ \text{dyne} \times 10^{2}\ \text{cm} = 10^{7}\ \text{dyne cm}$. A larger moment comes from a **larger force** or a **larger perpendicular distance**.`,
      v: V.spanner,
      n: 'The turning effect of a force is called its moment, or torque. It equals the force multiplied by the perpendicular distance from the axis to the line along which the force acts. In SI units it is measured in newton metres; in the older system, in dyne centimetres. One newton metre equals ten million dyne centimetres.',
    }),
    sl('example', 'Worked example: tightening a nut', {
      b: r`**Problem.** A mechanic applies a force of 50 N at right angles to a spanner, 0.25 m from the centre of a nut. (a) Find the moment. (b) What force would give the same moment at 0.10 m? (c) Express the moment in dyne cm.

**(a)** $\text{moment} = F \times d = 50 \times 0.25 = 12.5\ \text{N m}$.

**(b)** $F = 12.5 \div 0.10 = 125\ \text{N}$.

**(c)** $12.5 \times 10^{7} = 1.25 \times 10^{8}\ \text{dyne cm}$.`,
      v: table(['Quantity', 'Value'], [['Force', '50 N'], ['Perpendicular distance', '0.25 m'], ['Moment', '12.5 N m'], ['Force needed at 0.10 m', '125 N']], 'Table of the values in the spanner example'),
      n: 'The moment is the force times the perpendicular distance: fifty newtons times a quarter of a metre gives twelve and a half newton metres. Holding the spanner closer, at a tenth of a metre, you would need a hundred and twenty five newtons for the same turning effect. That is why long spanners make nuts easier to turn.',
    }),
    sl('check', 'Quick check: moment of a force', {
      b: 'Calculate or compare moments.',
      n: 'Quick check. Moment equals force times perpendicular distance from the axis.',
      chk: 'moment-mcq',
    }),
    sl('concept', 'Why handles are far from the axis', {
      b: 'For the same moment, **force × distance** is fixed, so a **larger distance needs a smaller force**. That is why door handles are fixed near the edge **away from the hinges**, a spanner has a **long handle**, and the steering wheel of a bus is **large**. If the force passes **through the axis** (d = 0), it produces **no turning effect** at all, however large it is.',
      v: table(['Device', 'How it gains a large moment'], [['Door handle', 'Placed far from the hinges'], ['Spanner', 'Long handle'], ['Bus steering wheel', 'Large radius'], ['Hand flour mill (chakki)', 'Handle near the rim']], 'Table of devices that use a large perpendicular distance to gain turning effect'),
      n: 'Because moment is force times distance, the same turning effect can come from a small force applied far from the axis. That is why door handles are put at the edge farthest from the hinges, spanners have long handles and buses have large steering wheels. A push through the hinge line, however hard, will never open the door.',
    }),
    sl('concept', 'Clockwise and anticlockwise moments', {
      b: 'A moment that turns a body **clockwise** is taken as **negative**, and one that turns it **anticlockwise** as **positive** (a common convention). When several forces act, the **resultant moment** is the algebraic sum: if anticlockwise and clockwise moments are unequal, the body turns in the sense of the larger one.',
      v: table(['Force', 'Distance from pivot', 'Sense', 'Moment (N m)'], [['6 N', '0.5 m', 'Anticlockwise', '+3.0'], ['4 N', '0.5 m', 'Clockwise', '−2.0'], ['Resultant', '', 'Anticlockwise', '+1.0']], 'Table showing two moments of opposite sense and their resultant'),
      n: 'A moment can turn a body clockwise or anticlockwise. We give the two senses opposite signs, usually taking anticlockwise as positive and clockwise as negative. When several forces act, we add their moments with signs. The body turns in the direction of the larger total, and the size of the result tells us how strong the turning effect is.',
    }),
    sl('example', 'Worked example: a resultant moment', {
      b: r`**Problem.** A see-saw is pivoted at its centre. A boy pushes down with 300 N at 1.5 m to the left of the pivot; a girl pushes down with 250 N at 2.0 m to the right. Find the resultant moment and the direction of turning.

**Anticlockwise (left side down):** $300 \times 1.5 = 450\ \text{N m}$.

**Clockwise (right side down):** $250 \times 2.0 = 500\ \text{N m}$.

**Resultant** $= 500 - 450 = 50\ \text{N m}$, **clockwise**: the girl’s side goes down.`,
      v: flow('LR', [['a', 'Anticlockwise 450 N m'], ['b', 'Clockwise 500 N m'], ['c', 'Resultant 50 N m clockwise']], [['a', 'c'], ['b', 'c']], 'Flow combining an anticlockwise and a clockwise moment into a resultant'),
      n: 'Work out each moment. The boy gives four hundred and fifty newton metres anticlockwise. The girl, although she pushes with less force, sits farther out and gives five hundred newton metres clockwise. The difference, fifty newton metres, is clockwise, so the girl’s end of the see-saw goes down.',
    }),
    sl('check', 'Quick check: resultant moment', {
      b: 'Decide which way a body turns.',
      n: 'Quick check. Add the moments in each sense and compare.',
      chk: 'resultant-mcq',
    }),
    sl('concept', 'Couple: two equal and opposite forces', {
      b: 'Two **equal and opposite parallel forces** whose lines of action do not coincide form a **couple**. A couple produces **rotation only** (no translation). Its moment = **one force × perpendicular distance between the two forces** (the arm of the couple). Examples: turning a tap, a steering wheel with both hands, winding a key.',
      v: table(['Example', 'Forces', 'Effect'], [['Turning a water tap', 'Finger and thumb push opposite ways', 'Rotation only'], ['Steering wheel', 'Both hands, opposite directions', 'Rotation only'], ['Winding a clock key', 'Opposite pushes on the key', 'Rotation only']], 'Table of everyday couples'),
      n: 'Sometimes two equal forces act in opposite directions on either side of an axis. Such a pair is called a couple. Because the forces are equal and opposite, they cannot move the body along, but they turn it strongly. The moment of a couple equals one force times the perpendicular distance between them. Turning a tap uses a couple.',
    }),
    sl('check', 'Quick check: couples', {
      b: 'Recognise a couple and its effect.',
      n: 'Quick check. Two equal and opposite parallel forces turn a body without moving it along.',
      chk: 'couple-mcq',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Translational motion: every point moves the same way; rotational: turning about an axis.',
        'Moment of a force = F × perpendicular distance from the axis; units N m and dyne cm (1 N m = 10⁷ dyne cm).',
        'Larger distance → smaller force needed for the same moment.',
        'Anticlockwise moments positive, clockwise negative; the resultant is their algebraic sum.',
        'A couple: two equal, opposite, parallel forces; rotation only.',
      ],
      v: table(['Quantity', 'Formula', 'SI unit'], [['Moment of a force', 'F × d', 'N m'], ['Moment of a couple', 'F × arm', 'N m']], 'Summary table of moment formulae'),
      n: 'Let us sum up Part 1. A force can move a body along or turn it. The turning effect, called the moment, equals force times perpendicular distance from the axis and is measured in newton metres. A small force far from the axis can match a large force near it. Clockwise and anticlockwise moments are added with opposite signs.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'Use the perpendicular distance, not the length along the body, when the force is slanted.',
        'Convert cm to m before giving a moment in N m.',
        'State the sense (clockwise or anticlockwise) with every resultant moment.',
        'Remember 1 N m = 10⁷ dyne cm.',
      ],
      v: table(['Slip', 'Fix'], [['Moment = F × distance along the rod', 'F × perpendicular distance'], ['50 N at 25 cm = 1250 N m', '50 × 0.25 = 12.5 N m'], ['Resultant without a sense', 'Say clockwise or anticlockwise']], 'Table of three common slips in Part 1 and their fixes'),
      n: 'Some tips. Always use the perpendicular distance from the axis to the line of the force. Change centimetres to metres before giving an answer in newton metres. Say whether a resultant moment is clockwise or anticlockwise. And remember that one newton metre is ten million dyne centimetres.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Force — Part 2: Equilibrium, centre of gravity and circular motion',
  goals: [
    'State the conditions of equilibrium and the principle of moments',
    'Use the principle of moments to find an unknown force or distance',
    'Locate the centre of gravity of regular bodies and an irregular lamina',
    'Explain uniform circular motion and distinguish centripetal from centrifugal force',
  ],
  slides: [
    sl('title', 'Balance and going round', {
      b: 'Part 2 — when do forces cancel so that a body stays at rest, where does the weight of a body act, and why does circling at constant speed still need a force?',
      v: table(['Situation', 'Idea used'], [['A balanced see-saw', 'Principle of moments'], ['A book resting on a table', 'Equilibrium of forces'], ['Balancing a ruler on one finger', 'Centre of gravity'], ['A stone whirled on a string', 'Centripetal force']], 'Table of everyday situations and the idea each illustrates'),
      n: 'In this part we look at balance. A see-saw stays level when the turning effects on both sides are equal. A ruler balances on your finger only at one special point, its centre of gravity. And a stone whirled on a string keeps going round only because the string pulls it towards the centre.',
    }),
    sl('concept', 'Conditions of equilibrium', {
      b: 'A body is in **equilibrium** when it stays at rest (static) or moves with constant velocity without turning (dynamic). Two conditions: (1) **the resultant force is zero** — no translational acceleration; (2) **the resultant moment about any point is zero** — sum of anticlockwise moments = sum of clockwise moments, so no rotational acceleration. Static examples: a book on a table, a balanced see-saw; dynamic: a raindrop falling at constant (terminal) speed.',
      v: table(['Condition', 'Prevents', 'Equation'], [['Resultant force = 0', 'Translation', 'Upward forces = downward forces'], ['Resultant moment = 0', 'Rotation', 'Anticlockwise moments = clockwise moments']], 'Table of the two conditions of equilibrium'),
      n: 'A body is in equilibrium when it stays still or moves steadily without speeding up or turning faster. Two conditions must hold. The forces on it must add up to zero, so it does not start moving along. And the moments must add up to zero, so it does not start turning. A balanced see-saw meets both conditions.',
    }),
    sl('diagram', 'The principle of moments', {
      b: '**Principle of moments:** when a body is in equilibrium under several forces, **the sum of the anticlockwise moments about any point equals the sum of the clockwise moments** about that point. **Verification:** balance a metre rule on a knife edge, hang weights on both sides, adjust until the rule is horizontal, and compare W₁ × d₁ with W₂ × d₂. In the figure, 40 gf × 20 cm = 20 gf × 40 cm = 800 gf cm.',
      v: V.rule,
      n: 'The principle of moments says that when a body is balanced, the total anticlockwise moment about any point equals the total clockwise moment. You can check it with a metre rule on a knife edge. Hang forty gram force at twenty centimetres on one side and twenty gram force at forty centimetres on the other, and the rule stays level, because both moments are eight hundred.',
    }),
    sl('example', 'Worked example: finding an unknown weight', {
      b: r`**Problem.** A uniform metre rule is balanced at its 50 cm mark. A 60 gf weight hangs at the 20 cm mark. Where must a 90 gf weight hang to balance it, and what force does the fulcrum exert?

**Step 1.** Anticlockwise moment $= 60 \times (50 - 20) = 1800\ \text{gf cm}$.

**Step 2.** Clockwise: $90 \times x = 1800$, so $x = 20\ \text{cm}$: the weight hangs at the **70 cm** mark.

**Step 3.** Fulcrum reaction (resultant force zero, rule’s own weight included): $60 + 90 + W_{rule}$ upwards.`,
      v: table(['Load', 'Position', 'Distance from 50 cm', 'Moment (gf cm)'], [['60 gf', '20 cm', '30 cm', '1800 anticlockwise'], ['90 gf', '70 cm', '20 cm', '1800 clockwise']], 'Table of loads, positions and moments for the balanced metre rule'),
      n: 'Take moments about the fulcrum, so its own push has no moment. Sixty gram force at thirty centimetres gives eighteen hundred anticlockwise. The ninety gram force must give the same clockwise, so its distance is eighteen hundred divided by ninety, which is twenty centimetres, at the seventy centimetre mark. Because the rule is uniform and pivoted at its middle, its own weight has no moment.',
    }),
    sl('check', 'Quick check: principle of moments', {
      b: 'Find an unknown distance or force on a balanced rule.',
      n: 'Quick check. Set anticlockwise moments equal to clockwise moments.',
      chk: 'balance-mcq',
    }),
    sl('diagram', 'Centre of gravity', {
      b: 'The **centre of gravity (G)** of a body is the point through which the **whole weight of the body acts**, in every position. **Regular bodies:** rod — mid-point; ring — centre of the ring (outside the material); circular disc — centre; triangular lamina — point where the **medians meet**; rectangle — where the diagonals meet. **Irregular lamina:** hang it freely from a hole, draw the plumb line; repeat from a second hole; G is where the lines cross.',
      v: V.cg,
      n: 'The centre of gravity is the point where the whole weight of a body seems to act. For a uniform rod it is at the middle, for a ring at its centre, which is in empty space, and for a triangle where the medians meet. For an irregular sheet, hang it from two different holes and draw the vertical line through each with a plumb line. The lines cross at the centre of gravity.',
    }),
    sl('example', 'Worked example: a rule not pivoted at its centre', {
      b: r`**Problem.** A uniform metre rule weighing 100 gf is balanced at the 40 cm mark by a weight W hung at the 10 cm mark. Find W.

**Step 1.** The rule’s weight acts at its centre of gravity, the **50 cm mark**, 10 cm right of the fulcrum: clockwise moment $= 100 \times 10 = 1000\ \text{gf cm}$.

**Step 2.** W is 30 cm left: anticlockwise moment $= W \times 30$.

**Step 3.** $W \times 30 = 1000$, so $W = 33.3\ \text{gf}$.`,
      v: table(['Force', 'Acts at', 'Distance from 40 cm', 'Sense'], [['Weight of rule, 100 gf', '50 cm (G)', '10 cm', 'Clockwise'], ['W', '10 cm', '30 cm', 'Anticlockwise']], 'Table of forces on the metre rule pivoted at 40 centimetres'),
      n: 'When a rule is not pivoted at its middle, its own weight must be included. The weight of a uniform rule acts at its centre of gravity, the fifty centimetre mark. That is ten centimetres from the fulcrum, giving a thousand gram force centimetres clockwise. The unknown weight, thirty centimetres on the other side, must balance this, so it is about thirty three gram force.',
    }),
    sl('check', 'Quick check: centre of gravity', {
      b: 'Locate the centre of gravity of a regular body.',
      n: 'Quick check. For a ring the centre of gravity is at the centre, where there is no material.',
      chk: 'cg-mcq',
    }),
    sl('diagram', 'Uniform circular motion', {
      b: 'In **uniform circular motion** a body moves in a circle at **constant speed**, but its **direction keeps changing** — the velocity is along the **tangent** at every point. A change in velocity means **acceleration**, so uniform circular motion is **accelerated motion**. The acceleration is directed **towards the centre**, and so is the force needed to produce it.',
      v: V.circle,
      n: 'A body going round a circle at steady speed is still accelerating, because the direction of its velocity changes all the time. At each instant the velocity points along the tangent to the circle. The change in velocity is always towards the centre, so a force towards the centre is needed to keep the body on its circular path.',
    }),
    sl('concept', 'Centripetal and centrifugal force', {
      b: '**Centripetal force** is the force **towards the centre** that keeps a body moving in a circle: the tension in a string for a whirled stone, the gravitational pull of the Earth on the Moon, friction between tyres and road for a car turning a corner. **Centrifugal force** is the apparent outward force felt by a body **in the rotating frame** (for example, a passenger pressed outward on a turning bus); it is a **fictitious** force, equal in size and opposite in direction to the centripetal force. If the centripetal force stops, the body flies off **along the tangent**.',
      v: table(['Feature', 'Centripetal force', 'Centrifugal force'], [['Direction', 'Towards the centre', 'Away from the centre'], ['Nature', 'Real force (tension, gravity, friction)', 'Fictitious (felt in the rotating frame)'], ['Example', 'String pulling a whirled stone', 'Passenger pushed outward on a turning bus']], 'Table comparing centripetal and centrifugal force'),
      n: 'The force that keeps a body moving in a circle always points to the centre and is called the centripetal force. It is a real force, such as the tension in a string or friction on car tyres. Centrifugal force is the outward push you seem to feel when a bus turns sharply. It is not a real force but appears only in the turning frame. If the string breaks, the stone flies off along the tangent.',
    }),
    sl('example', 'Worked example: what supplies the centripetal force?', {
      b: '**Problem.** Name the force that provides the centripetal force in each case: (a) a stone whirled on a string; (b) the Moon going round the Earth; (c) a cyclist rounding a bend; (d) an electron round the nucleus (Bohr model). (e) In which direction does the stone move if the string snaps?\n\n**(a)** Tension in the string. **(b)** Gravitational attraction of the Earth. **(c)** Friction between tyres and road. **(d)** Electrostatic attraction of the nucleus. **(e)** Along the **tangent** at the point where it was released.',
      v: table(['Case', 'Centripetal force supplied by'], [['Stone on a string', 'Tension'], ['Moon round the Earth', 'Gravity'], ['Cyclist on a bend', 'Friction'], ['Electron round the nucleus', 'Electrostatic attraction']], 'Table of four circular motions and the force that supplies the centripetal force'),
      n: 'Centripetal force is not a new kind of force; it is a job done by some real force. For a stone on a string, it is the tension. For the Moon, it is the Earth’s gravity. For a cyclist on a bend, it is friction from the road. For an electron in the Bohr model, it is the attraction of the nucleus. If the string snaps, the stone shoots off along the tangent.',
    }),
    sl('check', 'Quick check: circular motion', {
      b: 'Identify the direction of velocity or force in circular motion.',
      n: 'Quick check. Velocity is along the tangent; centripetal force is towards the centre.',
      chk: 'circle-mcq',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'Equilibrium: resultant force zero and resultant moment zero.',
        'Principle of moments: sum of anticlockwise moments = sum of clockwise moments about any point.',
        'Centre of gravity: point where the whole weight acts; rod mid-point, ring centre, triangle median point; plumb line for irregular laminae.',
        'Uniform circular motion: constant speed, changing velocity, so accelerated.',
        'Centripetal force acts towards the centre (real); centrifugal force is an apparent outward force in the rotating frame.',
      ],
      v: table(['Idea', 'Key statement'], [['Principle of moments', 'ACW = CW'], ['Centre of gravity', 'Weight acts here'], ['Centripetal force', 'Towards the centre']], 'Summary table of three key ideas from Part 2'),
      n: 'Let us sum up Part 2. A body is in equilibrium when the forces and the moments on it both add up to zero. The principle of moments lets us find unknown weights and distances. The centre of gravity is where the whole weight acts. A body moving in a circle at steady speed is accelerating towards the centre, and the force that does this is the centripetal force.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'Take moments about the fulcrum so the unknown reaction has no moment.',
        'Include the weight of a non-uniform or off-centre rule, acting at its centre of gravity.',
        'Say “uniform circular motion is accelerated because the direction of velocity changes”.',
        'Centrifugal force is not real in the ground frame; do not draw it on a free-body diagram.',
      ],
      v: table(['Slip', 'Fix'], [['Forgetting the rule’s weight', 'Put it at the 50 cm mark of a uniform rule'], ['Velocity towards the centre', 'Velocity along the tangent'], ['Speed constant, so no acceleration', 'Direction changes, so it accelerates']], 'Table of three common slips in Part 2 and their fixes'),
      n: 'Final tips. Take moments about the fulcrum to remove the unknown reaction force. Remember to include the weight of the rule when it is not pivoted at its middle. Explain that circular motion is accelerated because the direction of velocity keeps changing. And do not draw centrifugal force on a diagram of the forces acting on a body.',
    }),
  ],
});
