// ch05 Force and Laws of Motion — two decks: Part 1 (t01–t02) forces, friction, first law and inertia;
// Part 2 (t03–t04) momentum, second law, impulse, third law and its simple consequence for recoil.
import { sl, deck, table, flow, svgV, plot, r, near, dec } from './lib.mjs';
import { BALANCED, UNBALANCED, FRICTION_GRAPH, TABLECLOTH, RECOIL, IMPULSE, PAIRS, TROLLEYS } from './svgs.mjs';

const must = (ok, msg) => {
  if (!ok) throw new Error(`deck check failed: ${msg}`);
};

// ---- worked-example numbers (computed once, then interpolated)
const e1 = (() => {
  const pull = 30, fr = 12;
  return { pull, fr, net: pull - fr, balancedPull: fr };
})();
must(e1.net === 18, 'e1');
const e2 = (() => {
  const m = 2.0, fApplied = 25, fKin = 14;
  const net = fApplied - fKin;
  return { m, net, a: net / m };
})();
must(e2.net === 11 && near(e2.a, 5.5, 1e-9), 'e2');
const mom = [
  ['Cricket ball (0.16 kg) at 25 m/s', 0.16, 25],
  ['Cyclist and cycle (60 kg) at 5.0 m/s', 60, 5.0],
  ['Loaded truck (8000 kg) at 10 m/s', 8000, 10],
  ['Bullet (0.020 kg) at 400 m/s', 0.02, 400],
].map(([n, m, v]) => [n, m * v]);
must(near(mom[0][1], 4.0, 1e-9) && near(mom[1][1], 300, 1e-9) && near(mom[2][1], 80000, 1e-9) && near(mom[3][1], 8.0, 1e-9), 'momentum table');
const e3 = (() => {
  const F = 6.0, m = 1.5;
  return { F, m, a: F / m };
})();
must(near(e3.a, 4.0, 1e-9), 'e3');
const e4 = (() => {
  const m = 0.2, v = 24, t1 = 0.05, t2 = 0.4;
  const dp = m * v;
  return { dp, F1: dp / t1, F2: dp / t2 };
})();
must(near(e4.dp, 4.8, 1e-9) && near(e4.F1, 96, 1e-9) && near(e4.F2, 12, 1e-9), 'e4');
const e5 = (() => {
  const mB = 0.02, vB = 400, mG = 4.0;
  return { p: mB * vB, vG: (mB * vB) / mG };
})();
must(near(e5.p, 8.0, 1e-9) && near(e5.vG, 2.0, 1e-9), 'e5');
const e6 = (() => {
  const m1 = 2.0, m2 = 3.0, v2 = 1.2;
  return { v1: (m2 * v2) / m1, p: m2 * v2 };
})();
must(near(e6.v1, 1.8, 1e-9) && near(e6.p, 3.6, 1e-9), 'e6');

const afPlot = plot(
  {
    x: { min: 0, max: 20, label: 'net force F (N)' },
    y: { min: 0, max: 11, label: 'acceleration a (m/s²)' },
    functions: [
      { expr: 'x/2', label: 'mass 2 kg: a = F/2', domain: [0, 20] },
      { expr: 'x/4', label: 'mass 4 kg: a = F/4', domain: [0, 20] },
    ],
    points: [{ at: [12, 6], label: '12 N on 2 kg gives 6 m/s²' }, { at: [12, 3], label: '12 N on 4 kg gives 3 m/s²' }],
  },
  'Graph of acceleration against net force for a 2 kilogram and a 4 kilogram body: two straight lines through the origin, the lighter body having twice the acceleration for the same force',
  'For the same net force, doubling the mass halves the acceleration.',
);

export const V = {
  balanced: svgV(BALANCED, 'A book on a table and a crate pushed at steady speed: in both cases the forces are balanced and the net force is zero', 'Balanced forces: the net force is zero.'),
  unbalanced: svgV(UNBALANCED, 'A block pulled with 30 newtons against 12 newtons of friction: the net force is 18 newtons in the direction of the pull', 'Unbalanced forces: a net force changes the motion.'),
  friction: svgV(FRICTION_GRAPH, 'Graph of friction against applied force: static friction rises with the applied force to a maximum of 20 newtons, then drops to a sliding value of 14 newtons', 'Sliding friction is smaller than the maximum static friction.'),
  cloth: svgV(TABLECLOTH, 'A coin on a cloth: when the cloth is pulled away with a quick tug the coin stays in place because of its inertia', 'Inertia of rest.'),
  recoil: svgV(RECOIL, 'A gun and bullet: the bullet moves forward with 8.0 kilogram metres per second and the gun recoils backward with an equal momentum', 'Recoil follows from the third law.'),
  impulse: svgV(IMPULSE, 'Force-time sketch: a short large force and a long small force have the same area, which is the change of momentum', 'Area under the force–time graph = change of momentum.'),
  pairs: svgV(PAIRS, 'Action and reaction pairs for a swimmer and for a rocket: equal and opposite forces acting on different bodies', 'The two forces of a pair act on different bodies.'),
  trolleys: svgV(TROLLEYS, 'Two trolleys of 2.0 and 3.0 kilograms pushed apart by a spring move away with equal and opposite momenta', 'Total momentum before and after is zero.'),
  afPlot,
};

export const deck1 = deck({
  part: 1,
  title: 'Force and Laws of Motion — Part 1: Forces, friction and inertia',
  goals: [
    'Identify balanced and unbalanced forces and describe their effects',
    'Explain friction, its role, and ways to increase and reduce it',
    "State Newton's first law and explain inertia with everyday examples",
    'Relate mass to inertia',
  ],
  slides: [
    sl('title', 'Force and Laws of Motion', {
      b: 'Part 1: what forces do to a body, why things stop sliding, and why a body keeps doing what it is doing.',
      v: table(['Effect of a force', 'Example'], [['Starts motion', 'a goalkeeper kicking a stationary ball'], ['Stops motion', 'brakes on a bicycle'], ['Changes speed', 'a cricketer hitting a moving ball'], ['Changes direction', 'a hockey stick turning the ball'], ['Changes shape', 'squeezing a sponge or stretching a spring']], 'Table of five effects of a force with an everyday example of each'),
      n: 'A push or a pull is called a force. A force can start a body moving, stop it, speed it up, slow it down, change its direction or even change its shape. In this part we learn when forces cancel and when they do not, how friction acts as a hidden force on everything that slides, and why a body at rest tends to stay at rest. That idea is called inertia.',
    }),
    sl('concept', 'Force and the newton', {
      b: r`A **force** is a push or a pull. It has a size and a direction, so it is a vector. The SI unit of force is the **newton** (N). Several forces can act on one body together. What matters for its motion is the **net force**, the single force that has the same effect as all of them acting together.`,
      v: table(['Force', 'Who or what exerts it', 'Direction'], [['Weight', 'the Earth', 'vertically downward'], ['Normal reaction', 'the surface', 'perpendicular to the surface, upward on a table'], ['Push or pull', 'a person or a rope', 'along the push or the pull'], ['Friction', 'the rough surfaces in contact', 'opposite to the motion']], 'Table of four common forces, what exerts each and its direction'),
      n: 'A force has both size and direction. Its unit is the newton. A book on a table feels its weight, pulling it down, and a push upward from the table. A person pulling a rope adds a pull, and friction acts against sliding. When many forces act together, we add them with their directions to find the net force. It is the net force that decides how the body moves.',
    }),
    sl('diagram', 'Balanced forces', {
      b: r`Forces are **balanced** when their resultant, the net force, is **zero**. A balanced set of forces does not change the motion: a body at rest stays at rest, and a body moving along a straight line keeps its speed and direction. The book is at rest because its weight is balanced by the normal reaction. The crate moves at **steady speed** because the push equals the friction.`,
      v: V.balanced,
      n: 'Look at the two pictures. A book rests on a table. Its weight pulls it down and the table pushes it up by the same amount, so the forces are balanced and the book stays at rest. On the right, a crate is pushed along a floor. The push to the right equals the friction to the left, so the net force is zero and the crate keeps a steady speed.',
    }),
    sl('diagram', 'Unbalanced forces', {
      b: r`When the forces on a body do **not** cancel, they are **unbalanced** and there is a non-zero net force. The net force changes the velocity of the body: it speeds it up, slows it down or turns it. For forces along one line, subtract the smaller from the larger. Here $30 - 12 = ${e1.net}$ N, in the direction of the pull.`,
      v: V.unbalanced,
      n: 'Now suppose the pull on the block is thirty newtons while friction is only twelve. The two forces are unequal, so they are unbalanced. We find the net force by subtracting the smaller from the larger, which gives eighteen newtons in the direction of the pull. This net force changes the velocity of the block, so the block speeds up.',
    }),
    sl('check', 'Quick check: balanced forces', {
      b: 'Decide what balanced forces do to the motion of a body.',
      n: 'Quick check. Think about what happens to the motion of a body when all the forces on it cancel out.',
      chk: 'chk-bal',
    }),
    sl('example', 'Worked example: net force', {
      b: r`**Problem.** A trolley is pulled along a smooth floor with a force of 30 N. Friction of ${e1.fr} N acts against the motion. (a) Find the net force. (b) What pull would keep the trolley moving at a steady speed?

**Step 1.** Pull and friction act in opposite directions: net force $= 30 - ${e1.fr} = ${e1.net}$ N forward. The forces are unbalanced, so the trolley speeds up.

**Step 2.** For steady speed the net force must be zero, so the pull must equal the friction: ${e1.balancedPull} N.`,
      v: table(['Pull (N)', 'Friction (N)', 'Net force (N)', 'Motion'], [['30', `${e1.fr}`, `${e1.net} forward`, 'speeds up'], [`${e1.balancedPull}`, `${e1.fr}`, '0', 'steady speed'], ['5', `${e1.fr}`, '7 backward (only if already moving)', 'slows down']], 'Table of three cases of pull and friction with the net force and the resulting motion'),
      n: 'Let us work out the net force. The pull is thirty newtons forward and the friction is twelve newtons backward, so the net force is eighteen newtons forward and the trolley speeds up. If we reduce the pull until it equals the friction, the net force becomes zero. Then the trolley moves at a steady speed. And a smaller pull than friction slows a moving trolley down.',
    }),
    sl('concept', 'Friction', {
      b: r`**Friction** is the force that opposes the relative motion, or the tendency of motion, between two surfaces in contact. It arises because surfaces are never perfectly smooth. It acts **opposite** to the motion or attempted motion. There are three kinds: **static friction** (before sliding starts), **sliding friction** (while one surface slides over the other) and **rolling friction** (a wheel rolling). Rolling friction is the smallest.`,
      v: table(['Kind of friction', 'When it acts', 'Relative size'], [['Static', 'surfaces at rest, a push is applied', 'adjusts up to a maximum'], ['Sliding', 'one surface slides on the other', 'smaller than the maximum static'], ['Rolling', 'a wheel or ball rolls', 'smallest']], 'Table of static, sliding and rolling friction with when each acts and relative sizes'),
      n: 'Friction is the force that opposes sliding between two surfaces in contact. It exists because even smooth looking surfaces have tiny bumps that catch on each other. Friction always acts opposite to the motion, or to the attempted motion. Static friction acts before a body slides. Sliding friction acts once it slides. Rolling friction acts on a wheel, and is the smallest of the three.',
    }),
    sl('diagram', 'Friction as the push increases', {
      b: r`Push a heavy block gently. It does not move, because static friction equals your push. Push harder and the friction grows with it, until it reaches a **maximum** value (here 20 N). Beyond that the block starts to slide, and the friction drops to the smaller **sliding** value (here 14 N). That is why it is harder to start moving a heavy box than to keep it moving.`,
      v: V.friction,
      n: 'Here is what happens when you push a heavy block harder and harder. While the block stays at rest, the friction is exactly equal to your push, so the line rises. At a certain value, the maximum static friction, the block starts to slide. After that the friction drops to a smaller steady value. This is why a heavy almirah is hard to start moving but easier to keep moving.',
    }),
    sl('example', 'Worked example: friction and net force', {
      b: r`**Problem.** A 2.0 kg block follows the graph: maximum static friction 20 N, sliding friction 14 N. Find the friction and the net force when the applied push is (a) 8 N, (b) 25 N.

**(a) 8 N.** The block does not move, since 8 N is less than 20 N. Friction equals the push, 8 N, and the net force is 0.

**(b) 25 N.** This is more than 20 N, so the block slides and the friction is 14 N. Net force $= 25 - 14 = ${e2.net}$ N. (By the second law, which we meet in Part 2, the acceleration is $${e2.net} / ${e2.m} = ${dec(e2.a, 2)}\ \text{m s}^{-2}$.)`,
      v: table(['Applied push (N)', 'Does the block move?', 'Friction (N)', 'Net force (N)'], [['8', 'no', '8', '0'], ['20', 'just about to move', '20', '0'], ['25', 'yes, it slides', '14', `${e2.net}`]], 'Table showing friction and net force for pushes of 8, 20 and 25 newtons on a block'),
      n: 'Use the friction graph. For a small push of eight newtons, the block stays at rest and the friction is also eight newtons, so the net force is zero. When the push is twenty-five newtons, which is more than the maximum static friction, the block slides. The friction is now fourteen newtons, so the net force is eleven newtons in the direction of the push.',
    }),
    sl('check', 'Quick check: friction', {
      b: 'A block stays at rest under a small push. How big is the friction?',
      n: 'Quick check. A block does not move when you push it. Think about the size of the friction force at that moment.',
      chk: 'chk-fric',
    }),
    sl('concept', 'Increasing and reducing friction', {
      b: r`Friction is both **useful** and **a nuisance**. We **increase** it where we need grip, and **reduce** it where it wastes energy or causes wear.`,
      v: table(['To increase friction', 'To reduce friction'], [['Grooves in tyres and shoe soles', 'Oil, grease or other lubricants in machine parts'], ['Rough surface on a cricket bat handle', 'Ball bearings in a cycle wheel or a ceiling fan'], ['Sprinkling sand on a wet road', 'Smooth, polished or streamlined surfaces'], ['Pressing surfaces harder together', 'Powder on a carrom board']], 'Table of ways to increase friction and ways to reduce friction'),
      n: 'Friction is helpful when we walk, grip a pencil or brake a bicycle, so we increase it with grooves, rough handles and sand. It is a nuisance in machines, where it wastes energy and wears parts. There we reduce it with oil, grease, ball bearings and smooth surfaces. A carrom board is dusted with powder so the coins slide freely.',
    }),
    sl('diagram', "Newton's first law of motion", {
      b: r`**First law.** A body continues in its state of **rest** or of **uniform motion in a straight line** unless an **unbalanced (net) external force** acts on it. The property of a body to resist any change in its state of rest or of uniform motion is called **inertia**. When the cloth is pulled away quickly, the coin tends to stay at rest, so it stays in place.`,
      v: V.cloth,
      n: 'Newton stated the first law of motion. A body at rest stays at rest, and a body moving in a straight line at steady speed keeps moving in that way, unless an unbalanced force acts on it. This stubborn property is called inertia. A coin on a cloth shows it. When the cloth is tugged away quickly, the coin does not have time to move with it, so it stays in place.',
    }),
    sl('concept', 'Kinds of inertia', {
      b: r`Inertia appears in three ways. **Inertia of rest:** a body at rest stays at rest. **Inertia of motion:** a moving body keeps moving. **Inertia of direction:** a moving body keeps its direction. The **mass** of a body is a measure of its inertia: the greater the mass, the greater the inertia, and the harder it is to start, stop or turn the body.`,
      v: table(['Kind', 'Everyday example', 'Reason'], [['Rest', 'Dust falls out of a carpet beaten with a stick', 'the dust tends to stay at rest while the carpet moves'], ['Motion', 'Passengers lurch forward when a bus brakes', 'their bodies tend to keep moving'], ['Direction', 'Passengers lean outward when a bus turns a corner', 'their bodies tend to go straight on'], ['Mass', 'A loaded truck is harder to stop than a bicycle', 'greater mass means greater inertia']], 'Table of inertia of rest, motion and direction with examples and reasons'),
      n: 'There are three kinds of inertia. A body at rest tends to stay at rest, which is why dust falls out of a carpet when we beat it. A moving body tends to keep moving, which is why you lurch forward when a bus brakes. A moving body tends to keep its direction, so you lean outward at a bend. The greater the mass, the greater the inertia.',
    }),
    sl('example', 'Worked example: explaining with inertia', {
      b: r`**Problem.** Explain, using inertia: (a) a rider on a motorbike jerks backward when the bike suddenly speeds up; (b) a person steps off a moving bus and has to run forward a few steps.

**(a)** The rider's body is at rest, and its inertia of rest makes it **stay behind** when the bike moves forward under it.

**(b)** The person's feet stop on touching the road but the upper body, in **inertia of motion**, tends to keep moving forward, so the person has to run a few steps to avoid falling.`,
      v: table(['Situation', 'Law or idea used', 'What happens'], [['Bike speeds up', 'inertia of rest', 'rider jerks backward'], ['Stepping off a moving bus', 'inertia of motion', 'person lurches forward'], ['Bus takes a sharp turn', 'inertia of direction', 'passengers lean outward']], 'Table of three situations explained by inertia'),
      n: 'To explain with inertia, ask what the body was doing before and which part is forced to change. When the bike speeds up, the rider was at rest, and his body tends to stay at rest, so he jerks backward. When a person steps off a moving bus, her feet stop but her body tends to keep moving forward, so she must run a few steps to stay on her feet.',
    }),
    sl('check', 'Quick check: inertia', {
      b: 'Which body has the greater inertia?',
      n: 'Quick check. Remember that mass is the measure of inertia, and answer.',
      chk: 'chk-inertia',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'A force is a push or a pull; SI unit newton (N). The net force decides the motion.',
        'Balanced forces: net force zero, no change in the state of motion. Unbalanced forces change the velocity.',
        'Friction opposes the relative motion of surfaces: static, sliding and rolling; increase it for grip and reduce it for machines.',
        'First law: a body stays at rest or in uniform straight-line motion unless a net external force acts on it.',
        'Inertia is the resistance to a change in the state of motion; mass measures inertia.',
      ],
      v: table(['Idea', 'Key statement'], [['Net force zero', 'no change in velocity'], ['Net force not zero', 'velocity changes'], ['Inertia', 'greater mass, greater inertia']], 'Table summarising net force and inertia'),
      n: 'To sum up. Balanced forces give a zero net force and no change in motion. Unbalanced forces change the velocity. Friction opposes sliding, and we increase or reduce it as needed. The first law says a body keeps its state of rest or steady straight-line motion unless a net outside force acts on it. That resistance to change is inertia, and mass is its measure.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'State the first law in full: rest or uniform motion in a straight line, unless acted on by a net external force.',
        'Name the kind of inertia (rest, motion, direction) when you explain an everyday example.',
        'Friction acts opposite to the motion; draw it that way in force diagrams.',
        'Say "net force" or "unbalanced force", not just "force", when explaining a change in motion.',
        'For friction, say what it does, then give how to increase or reduce it with a named example.',
      ],
      n: 'Some exam tips. State the first law in full, including the words net external force. When you explain an everyday example, name the kind of inertia involved. Draw friction opposite to the motion. Use the words net force or unbalanced force when you explain a change in motion. And for friction questions, give clear named examples.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Force and Laws of Motion — Part 2: Momentum, the second law and the third law',
  goals: [
    'Define momentum and state the second law, F = ma and F = Δp/Δt',
    'Define the newton and apply the second law',
    'Explain impulse ideas such as catching a cricket ball and airbags',
    "Apply Newton's third law to rockets, guns, swimming and walking, and see recoil as a simple consequence",
  ],
  slides: [
    sl('title', "Newton's second and third laws", {
      b: 'Part 2: how force, mass and acceleration are linked, why a soft landing helps, and why every force has a partner.',
      v: table(['Law', 'In one line'], [['First', 'no net force, no change in the state of motion'], ['Second', 'net force = mass × acceleration'], ['Third', 'every action has an equal and opposite reaction']], 'Table of Newton laws of motion with a one-line statement of each'),
      n: 'In this part we meet the second and third laws of motion. The second law tells us exactly how much a body accelerates when a net force acts on it. It also leads to the idea of momentum, and to why a cricketer pulls his hands back when catching a fast ball. The third law explains rockets, guns, swimming and even walking.',
    }),
    sl('concept', 'Momentum', {
      b: r`The **momentum** of a body is the product of its mass and velocity: $p = mv$. Its SI unit is **kg m s⁻¹**, and it is a vector in the direction of the velocity. A heavy body or a fast body has a large momentum. It is harder to stop a body with a larger momentum.`,
      v: table(['Body', 'Momentum p = m v (kg m/s)'], mom.map(([n, p]) => [n, dec(p, 3)]), 'Table of the momentum of a cricket ball, a cyclist, a loaded truck and a bullet'),
      n: 'Momentum is mass multiplied by velocity. Its unit is kilogram metre per second, and it points in the direction of the velocity. A fast cricket ball has a small momentum because its mass is small, while a slow truck has a huge one. A bullet, with tiny mass but very high speed, has a larger momentum than a cricket ball. The bigger the momentum, the harder the body is to stop.',
    }),
    sl('concept', "Newton's second law", {
      b: r`**Second law.** The rate of change of momentum of a body is proportional to the net force acting on it, and takes place in the direction of the force. For a body of constant mass,
$$F = \dfrac{\Delta p}{\Delta t} = \dfrac{m(v - u)}{t} = ma$$
So **$F = ma$**. One **newton** is the force that gives a mass of 1 kg an acceleration of $1\ \text{m s}^{-2}$: $1\ \text{N} = 1\ \text{kg m s}^{-2}$.`,
      v: flow('LR', [['a', 'Change of momentum: m v − m u'], ['b', 'Divide by time t: F = m (v − u) ÷ t'], ['c', 'a = (v − u) ÷ t'], ['d', 'F = m a']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow showing how the rate of change of momentum leads to F equals m a'),
      n: 'The second law links force and momentum. The net force is the rate of change of momentum, which is the change in momentum divided by the time taken. For a body of constant mass, the change in velocity divided by time is the acceleration, so the force equals mass times acceleration. One newton is the force that gives a mass of one kilogram an acceleration of one metre per second squared.',
    }),
    sl('diagram', 'Acceleration, force and mass', {
      b: r`For the same net force, a **heavier** body accelerates **less**. For the same mass, a **bigger** force gives a **bigger** acceleration. Together, $a = F/m$: acceleration is proportional to the net force and inversely proportional to the mass. This is why an empty trolley is easy to speed up and a loaded one is not.`,
      v: V.afPlot,
      n: 'The graph shows acceleration against net force for two bodies. Both lines are straight, so acceleration is proportional to the net force. The line for the lighter body is steeper. For the same force of twelve newtons, the two kilogram body accelerates at six metres per second squared, while the four kilogram body manages only three. A larger mass means a smaller acceleration.',
    }),
    sl('example', 'Worked example: using F = ma', {
      b: r`**Problem.** A net force of ${e3.F.toFixed(1)} N acts on a trolley of mass ${e3.m.toFixed(1)} kg. Find its acceleration. How much net force would give the same trolley an acceleration of $2.0\ \text{m s}^{-2}$?

**Step 1.** $a = F/m = ${e3.F.toFixed(1)} / ${e3.m.toFixed(1)} = ${dec(e3.a, 2)}\ \text{m s}^{-2}$.

**Step 2.** $F = ma = ${e3.m.toFixed(1)} \times 2.0 = ${dec(e3.m * 2, 2)}$ N.`,
      v: table(['Given', 'Formula', 'Result'], [['F = 6.0 N, m = 1.5 kg', 'a = F ÷ m', `${dec(e3.a, 2)} m/s²`], ['m = 1.5 kg, a = 2.0 m/s²', 'F = m × a', `${dec(e3.m * 2, 2)} N`]], 'Table of two uses of F equals m a for a 1.5 kilogram trolley'),
      n: 'Apply the second law. A net force of six newtons on a trolley of one point five kilograms gives an acceleration of four metres per second squared. To find the force for a different acceleration, multiply mass by acceleration. For two metres per second squared the trolley needs three newtons. Always check that mass is in kilograms and force in newtons.',
    }),
    sl('check', 'Quick check: the newton', {
      b: 'Use F = ma to find a force.',
      n: 'Quick check. Use the second law, with mass in kilograms and acceleration in metres per second squared, to find the force.',
      chk: 'chk-newton',
    }),
    sl('diagram', 'Impulse and the force–time graph', {
      b: r`The **impulse** of a force is the force multiplied by the time for which it acts: $F \times t = \Delta p$. It equals the **change of momentum**, and on a force–time graph it is the **area**. The same change of momentum can come from a **large force for a short time** or a **small force for a long time**.`,
      v: V.impulse,
      n: 'Impulse is force multiplied by the time for which it acts, and it equals the change in momentum. On a force-time graph it is the area. The sketch shows two ways of getting the same change in momentum. A large force for a very short time, or a small force for a long time. Both rectangles have the same area, even though one is tall and thin and the other is low and wide.',
    }),
    sl('example', 'Worked example: catching a cricket ball', {
      b: r`**Problem.** A fielder catches a ${e4.dp / 24} kg ball moving at $24\ \text{m s}^{-1}$. She stops it in (a) 0.05 s with stiff hands and (b) 0.40 s by letting her hands move back. Find the average force each time.

**Change of momentum** $= m(v - u) = 0.20 \times (0 - 24) = -${dec(e4.dp, 2)}\ \text{kg m s}^{-1}$, so $|\Delta p| = ${dec(e4.dp, 2)}$.

**(a)** $F = \Delta p / t = ${dec(e4.dp, 2)} / 0.05 = ${dec(e4.F1, 2)}$ N.

**(b)** $F = ${dec(e4.dp, 2)} / 0.40 = ${dec(e4.F2, 2)}$ N, eight times smaller.`,
      v: table(['Catch', 'Time taken (s)', 'Average force (N)'], [['Stiff hands', '0.05', dec(e4.F1, 2)], ['Hands move back', '0.40', dec(e4.F2, 2)]], 'Table showing that a longer stopping time gives a smaller force when catching a 0.20 kilogram ball moving at 24 metres per second'),
      n: 'The momentum of the ball is its mass times its speed, which is four point eight in the usual units. To stop it, the hands must remove all this momentum. With stiff hands it takes only five hundredths of a second, so the force is large, ninety-six newtons. If she moves her hands back and takes four tenths of a second, the force is only twelve newtons. That is why fielders pull their hands back.',
    }),
    sl('concept', 'Why a longer stopping time helps', {
      b: r`The change of momentum is fixed by the mass and speed, so $F = \Delta p / t$ becomes **smaller when $t$ is longer**. Many safety devices use this idea: they make the stopping time longer.`,
      v: table(['Situation', 'How the time is made longer', 'Benefit'], [['Cricket catch', 'hands move back with the ball', 'less sting'], ['Airbag in a car', 'inflates and cushions the person', 'smaller force on the body'], ['High jump or pole vault landing', 'thick foam mat', 'no injury'], ['Bending the knees on landing', 'legs absorb the landing slowly', 'protects the knees']], 'Table of four situations in which a longer stopping time reduces the force'),
      n: 'The same idea explains several safety devices. A car airbag inflates and slows the passenger over a longer time, so the force on the body is much smaller. A thick foam mat does the same for a high jumper. When we jump down from a wall we bend our knees to lengthen the stopping time. In every case, the change in momentum is the same, but the force is smaller.',
    }),
    sl('check', 'Quick check: impulse', {
      b: 'Compare two stopping times for the same change in momentum.',
      n: 'Quick check. The change in momentum stays the same. Think about what happens to the force when the stopping time changes.',
      chk: 'chk-impulse',
    }),
    sl('diagram', "Newton's third law of motion", {
      b: r`**Third law.** To every **action** there is an **equal and opposite reaction**. When body A exerts a force on body B, body B exerts a force of the **same size in the opposite direction** on body A. The two forces act on **different bodies**, so they never cancel each other. A swimmer pushes the water back, and the water pushes her forward. A rocket pushes hot gas down, and the gas pushes the rocket up.`,
      v: V.pairs,
      n: "Newton's third law says that forces always come in pairs. If one body pushes on another, the second body pushes back on the first with an equal force in the opposite direction. The swimmer pushes the water backward, and the water pushes the swimmer forward. A rocket pushes burning gas downward, and the gas pushes the rocket upward. The two forces act on different bodies, so they do not cancel.",
    }),
    sl('concept', 'The third law in everyday life', {
      b: r`The two forces of a pair have the same size and opposite directions, but because they act on **different bodies**, each body can accelerate. A light body accelerates more than a heavy one for the same force, as the second law shows.`,
      v: table(['Situation', 'Action', 'Reaction'], [['Walking', 'foot pushes the ground backward', 'ground pushes the foot forward'], ['Swimming', 'hands push water backward', 'water pushes the swimmer forward'], ['Rocket', 'rocket pushes gas downward', 'gas pushes the rocket upward'], ['Firing a gun', 'gun pushes the bullet forward', 'bullet pushes the gun backward (recoil)'], ['Rowing a boat', 'oar pushes water backward', 'water pushes the boat forward']], 'Table of five everyday examples of action and reaction pairs'),
      n: 'Here are some everyday pairs. When we walk, our foot pushes the ground backward, and the ground pushes us forward. A swimmer pushes the water back and moves forward. A gun pushes the bullet forward and the bullet pushes the gun backward, which we call recoil. In each pair the two forces are equal and opposite, but they act on different bodies, so each body can still move.',
    }),
    sl('diagram', 'Recoil of a gun', {
      b: r`A gun and bullet are at rest, so the total momentum is zero. When fired, the force on the bullet and the force on the gun are equal and opposite and act for the **same time**. So the two momenta are **equal and opposite** and the total momentum stays zero. This is a simple consequence of the third law: **the momentum gained by one body equals the momentum lost by the other**. Because the gun is heavier, its speed is much smaller.`,
      v: V.recoil,
      n: 'When a gun is fired, the gun pushes the bullet forward and the bullet pushes the gun backward with an equal force, acting for the same time. So the two bodies gain equal and opposite momentum. The total momentum, which was zero at the start, stays zero. Because the gun has a much larger mass than the bullet, it moves back with only a small speed.',
    }),
    sl('example', 'Worked example: recoil of a gun', {
      b: r`**Problem.** A bullet of mass ${0.02} kg leaves a gun of mass 4.0 kg at $400\ \text{m s}^{-1}$. Find the recoil speed of the gun.

**Step 1: momentum of the bullet** $= 0.020 \times 400 = ${dec(e5.p, 2)}\ \text{kg m s}^{-1}$ forward.

**Step 2:** the gun gets an equal momentum backward, so $4.0 \times v = ${dec(e5.p, 2)}$.

**Step 3:** $v = ${dec(e5.p, 2)} / 4.0 = ${dec(e5.vG, 2)}\ \text{m s}^{-1}$ backward.`,
      v: table(['Body', 'Mass (kg)', 'Speed (m/s)', 'Momentum (kg m/s)'], [['Bullet', '0.020', '400 forward', dec(e5.p, 2)], ['Gun', '4.0', `${dec(e5.vG, 2)} backward`, dec(e5.p, 2)]], 'Table showing that the bullet and the gun have equal and opposite momenta of 8.0 kilogram metres per second'),
      n: 'The bullet has a mass of twenty grams and a speed of four hundred metres per second. Its momentum is eight in the usual units. The gun gets the same momentum backward. Dividing by the mass of the gun, four kilograms, gives a recoil speed of two metres per second. A heavier gun would recoil more slowly.',
    }),
    sl('example', 'Worked example: two trolleys pushed apart', {
      b: r`**Problem.** Two trolleys of mass 2.0 kg and 3.0 kg are at rest, touching, with a compressed spring between them. When the spring is released the 3.0 kg trolley moves off at $1.2\ \text{m s}^{-1}$. Find the speed of the 2.0 kg trolley.

**Step 1.** Momentum of the 3.0 kg trolley $= 3.0 \times 1.2 = ${dec(e6.p, 2)}\ \text{kg m s}^{-1}$.

**Step 2.** The forces on the two are equal and opposite for the same time, so the other trolley gets the same momentum the other way: $2.0 \times v = ${dec(e6.p, 2)}$.

**Step 3.** $v = ${dec(e6.v1, 2)}\ \text{m s}^{-1}$ in the opposite direction.`,
      v: V.trolleys,
      n: 'Before the spring is released, both trolleys are at rest, so the total momentum is zero. The spring pushes each trolley with an equal and opposite force for the same time. So the two trolleys gain equal and opposite momenta. The heavier trolley gets three point six in the usual units at one point two metres per second. The lighter one needs a higher speed, one point eight metres per second, to have the same momentum.',
    }),
    sl('check', 'Quick check: the third law', {
      b: 'Think about the two forces in an action–reaction pair.',
      n: 'Quick check. Remember which bodies the two forces of an action and reaction pair act on, and answer.',
      chk: 'chk-third',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        r`Momentum $p = mv$, in kg m s⁻¹, in the direction of the velocity.`,
        r`Second law: $F = \Delta p/\Delta t = ma$; one newton $= 1\ \text{kg m s}^{-2}$.`,
        r`Impulse $F t = \Delta p$ is the area under a force–time graph; a longer stopping time means a smaller force.`,
        'Third law: forces come in equal and opposite pairs acting on different bodies (rocket, gun, swimmer, walking).',
        'As a simple consequence, the momentum gained by one body equals the momentum lost by the other: gun and bullet, two trolleys.',
      ],
      v: table(['Law', 'Formula or statement', 'Example'], [['Second', 'F = m a', 'a loaded trolley accelerates less'], ['Impulse', 'F t = Δp', 'airbag, cricket catch'], ['Third', 'equal and opposite pair', 'rocket, recoil']], 'Table summarising the second law, impulse and the third law with an example for each'),
      n: 'To sum up. Momentum is mass times velocity. The second law says net force equals mass times acceleration, which is also the rate of change of momentum. Impulse is force times time, and a longer stopping time gives a smaller force. The third law says forces come in equal and opposite pairs on different bodies. As a result, in recoil the two bodies gain equal and opposite momenta.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'Convert mass to kg and write the unit of every answer: N, kg m s⁻¹, m s⁻².',
        'Write F = ma or F = Δp/t first, then substitute.',
        'In recoil questions, write that the two momenta are equal and opposite, then divide by the mass.',
        'For the third law, say that the two forces act on different bodies, so they do not cancel.',
        'Name an action and its reaction, with the body that exerts each force.',
      ],
      n: 'Some exam tips. Change grams to kilograms before you substitute. Write the formula first, then put in the numbers with units. In recoil problems, state that the momenta are equal and opposite. For the third law, always say that the action and reaction act on different bodies, so they do not cancel. And name both bodies when you describe a pair of forces.',
    }),
  ],
});
