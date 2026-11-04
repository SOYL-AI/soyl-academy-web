// ch06 Work, Energy and Simple Machines — two decks: Part 1 (t01–t02) work, kinetic and potential energy, work–energy theorem;
// Part 2 (t03–t04) conservation of energy, power, levers, pulleys and efficiency.
import { sl, deck, table, flow, svgV, plot, r, near, dec } from './lib.mjs';
import { WORK_SIGNS, WORK_AREA, FALL_BARS, ROLLER, LEVERS, PULLEYS } from './svgs.mjs';

const must = (ok, msg) => {
  if (!ok) throw new Error(`deck check failed: ${msg}`);
};
const g = 9.8;

// ---- worked-example numbers (computed once, then interpolated)
const e1 = (() => {
  const F = 35, s = 6.0, f = 14;
  const wPush = F * s;
  const wFric = -f * s;
  return { F, s, f, wPush, wFric, net: wPush + wFric, netF: F - f };
})();
must(e1.wPush === 210 && e1.wFric === -84 && e1.net === 126 && e1.netF * e1.s === 126, 'e1');
const e2 = (() => {
  const F = 12, s = 0.4;
  return { F, s, tri: 0.5 * F * s, rect: F * s };
})();
must(near(e2.tri, 2.4, 1e-9) && near(e2.rect, 4.8, 1e-9), 'e2');
const e3 = (() => {
  const m = 70, v1 = 6.0, v2 = 12;
  return { m, v1, v2, k1: 0.5 * m * v1 * v1, k2: 0.5 * m * v2 * v2 };
})();
must(near(e3.k1, 1260, 1e-9) && near(e3.k2, 5040, 1e-9) && near(e3.k2 / e3.k1, 4, 1e-9), 'e3');
const pe = (() => {
  const m = 2.5, h = 1.8;
  return { m, h, U: m * g * h };
})();
must(near(pe.U, 44.1, 1e-9), 'pe');
const e5 = (() => {
  const m = 80, v = 3.0, d = 2.0;
  const ke = 0.5 * m * v * v;
  return { m, v, d, ke, F: ke / d };
})();
must(near(e5.ke, 360, 1e-9) && near(e5.F, 180, 1e-9), 'e5');
const e6 = (() => {
  const h = 2.5;
  const v = Math.sqrt(2 * g * h);
  const u = 14;
  const H = (u * u) / (2 * g);
  return { h, v, u, H };
})();
must(near(e6.v, 7.0, 1e-9) && near(e6.H, 10, 1e-9), 'e6');
const e8 = (() => {
  const m = 24, h = 5.0, t = 40;
  const W = m * g * h;
  return { m, h, t, W, P: W / t };
})();
must(near(e8.W, 1176, 1e-9) && near(e8.P, 29.4, 1e-9), 'e8');
const e9 = (() => {
  const P = 1.5, mins = 20, days = 30, rate = 7;
  const kwh = P * (mins / 60) * days;
  return { P, mins, days, rate, kwh, J: kwh * 3.6e6, cost: kwh * rate };
})();
must(near(e9.kwh, 15, 1e-9) && near(e9.J, 5.4e7, 1e-9) && near(e9.cost, 105, 1e-9), 'e9');
const e10 = (() => {
  const load = 900, eArm = 1.2, lArm = 0.15;
  const ma = eArm / lArm;
  return { load, eArm, lArm, ma, effort: load / ma };
})();
must(near(e10.ma, 8, 1e-9) && near(e10.effort, 112.5, 1e-9), 'e10');
const e11 = (() => {
  const strands = 3, load = 270, effort = 120, up = 0.5;
  const ma = load / effort;
  const wOut = load * up;
  const wIn = effort * strands * up;
  return { strands, load, effort, up, ma, vr: strands, wOut, wIn, eff: (wOut / wIn) * 100, eff2: (ma / strands) * 100 };
})();
must(near(e11.ma, 2.25, 1e-9) && near(e11.eff, 75, 1e-9) && near(e11.eff2, 75, 1e-9) && near(e11.wOut, 135, 1e-9) && near(e11.wIn, 180, 1e-9), 'e11');

const keV = plot(
  {
    x: { min: 0, max: 10, label: 'speed v (m/s)' },
    y: { min: 0, max: 100, label: 'kinetic energy (J)' },
    functions: [{ expr: 'x^2', label: 'mass 2 kg: KE = v²', domain: [0, 10] }],
    points: [{ at: [4, 16], label: '4 m/s gives 16 J' }, { at: [8, 64], label: '8 m/s gives 64 J' }],
  },
  'Graph of kinetic energy against speed for a body of mass 2 kilograms: a curve that rises ever more steeply, passing through 16 joules at 4 metres per second and 64 joules at 8 metres per second',
  'Doubling the speed makes the kinetic energy four times as large.',
);

export const V = {
  signs: svgV(WORK_SIGNS, 'A box moved 4 metres by a force of 30 newtons: work is plus 120 joules when the force is along the motion, zero at right angles and minus 120 joules when the force is against the motion', 'Work can be positive, zero or negative.'),
  area: svgV(WORK_AREA, 'Two force against displacement graphs: a constant force of 12 newtons over 4.0 metres gives a rectangle of area 48 joules, and a force rising from 0 to 12 newtons over 0.40 metres gives a triangle of area 2.4 joules', 'Work = area under the force–displacement graph.'),
  fall: svgV(FALL_BARS, 'Bars for the potential and kinetic energy of a 0.40 kilogram mango falling 5.0 metres: the total stays 19.6 joules at every height', 'PE falls and KE rises by the same amount; the total stays constant.'),
  roller: svgV(ROLLER, 'A roller-coaster track without friction with four marked points: the lower the car, the greater its speed, and the speed does not depend on the mass', 'Lower on the track means faster: PE changes into KE.'),
  levers: svgV(LEVERS, 'The three classes of lever with the fulcrum, load and effort marked and the mechanical advantage worked out: 3.0 for class one, 4.0 for class two and 0.30 for class three', 'Three classes of lever: the position of the fulcrum, load and effort decides the class.'),
  pulleys: svgV(PULLEYS, 'A single fixed pulley with mechanical advantage 1, a single movable pulley with mechanical advantage 2 and a block and tackle with three supporting strands and mechanical advantage 3', 'Mechanical advantage of an ideal pulley = number of strands supporting the load.'),
  keV,
};

export const deck1 = deck({
  part: 1,
  title: 'Work, Energy and Simple Machines — Part 1: Work and energy',
  goals: [
    'Calculate work done and identify positive, negative and zero work',
    'Read work from a force–displacement graph',
    'Derive kinetic energy ½mv² and potential energy mgh',
    'State the work–energy theorem and use it',
  ],
  slides: [
    sl('title', 'Work, Energy and Simple Machines', {
      b: 'Part 1: when a force does work, how much energy a moving body has, and how work changes energy.',
      v: table(['Situation', 'Work in the science sense?'], [['A farmer drags a sack along a lane', 'yes, the force moves the sack'], ['A student holds a bucket still at the well', 'no, nothing moves'], ['A porter walks on a level platform carrying a trunk on his head', 'no, the lift is at right angles to the motion'], ['A girl climbs a flight of steps', 'yes, she works against gravity']], 'Table of four everyday situations and whether work is done in the science sense'),
      n: 'In daily life we say that a person who studies or carries a load is working hard. In science the word work has a special meaning. It needs a force and a movement. In this part we learn how to measure work, what positive and negative work mean, and how work is linked to the energy that moving and raised bodies have.',
    }),
    sl('concept', 'Work done by a force', {
      b: r`When a force $F$ moves a body through a displacement $s$ in the **direction of the force**, the **work done** is
$$W = F \times s$$
The SI unit of work is the **joule** (J): $1\ \text{J} = 1\ \text{N m}$, the work done when a force of 1 N moves a body by 1 m along the force. Work has only a size, no direction, so it is a **scalar**. No displacement means no work, however large the force.`,
      v: table(['Force', 'Displacement', 'Work done'], [['25 N', '0 m (wall does not move)', '0 J'], ['25 N', '2.0 m along the force', '50 J'], ['100 N', '0.50 m along the force', '50 J'], ['100 N', '0 m', '0 J']], 'Table of work done for different forces and displacements'),
      n: 'Work is done when a force moves a body in the direction of the force. It equals the force multiplied by the displacement. Its unit is the joule, which is one newton metre. Work is a scalar, because it has only size. If there is no displacement, no work is done, even if you push very hard. Pushing a wall that does not move is tiring, but it is zero work.',
    }),
    sl('diagram', 'Positive, negative and zero work', {
      b: r`If the force makes an angle $\theta$ with the displacement, the work is $W = F s \cos\theta$. We use only three angles. At $\theta = 0^\circ$, $\cos\theta = 1$ and the work is **positive**: the force helps the motion. At $90^\circ$, $\cos\theta = 0$ and the work is **zero**: the force is at right angles to the motion. At $180^\circ$, $\cos\theta = -1$ and the work is **negative**: the force opposes the motion, as friction does.`,
      v: V.signs,
      n: 'The picture shows a box moved four metres to the right. When the force acts along the motion, the angle is zero and the work is positive, one hundred twenty joules. When the force is at right angles, the angle is ninety degrees, and the work is zero. When the force opposes the motion, like friction, the angle is one hundred eighty degrees, and the work is negative.',
    }),
    sl('example', 'Worked example: work by push and by friction', {
      b: r`**Problem.** A girl pushes a loaded trolley ${e1.s.toFixed(1)} m along a level floor with a horizontal force of ${e1.F} N. Friction of ${e1.f} N acts on the trolley. Find (a) the work done by her push, (b) the work done by friction, (c) the net work.

**(a)** The push is along the displacement ($\theta = 0^\circ$): $W = Fs = ${e1.F} \times ${e1.s.toFixed(1)} = ${e1.wPush}$ J.

**(b)** Friction opposes the motion ($\theta = 180^\circ$): $W = -fs = -${e1.f} \times ${e1.s.toFixed(1)} = ${e1.wFric}$ J.

**(c)** Net work $= ${e1.wPush} + (${e1.wFric}) = ${e1.net}$ J. Check: net force $= ${e1.netF}$ N, and $${e1.netF} \times ${e1.s.toFixed(1)} = ${e1.net}$ J.`,
      v: table(['Force', 'Angle with displacement', 'Work (J)'], [['push 35 N', '0°', `+${e1.wPush}`], ['friction 14 N', '180°', `${e1.wFric}`], ['net', '', `+${e1.net}`]], 'Table of the work done by the push, by friction and the net work on the trolley'),
      n: 'The girl pushes with thirty-five newtons for six metres, so her push does two hundred ten joules of positive work. Friction acts opposite to the motion, so it does negative work of eighty-four joules. Adding them gives a net work of one hundred twenty-six joules. We can check this by multiplying the net force, twenty-one newtons, by the distance.',
    }),
    sl('check', 'Quick check: zero work', {
      b: 'Decide when a force does no work.',
      n: 'Quick check. Think about the angle between the force and the movement of the body, and answer.',
      chk: 'chk-work',
    }),
    sl('diagram', 'Work from a force–displacement graph', {
      b: r`On a graph of force against displacement, the **area under the line** is the work done. For a constant force the area is a rectangle: $12 \times 4.0 = ${e2.F * 4} $ J. When the force rises steadily from zero, as in stretching a rubber cord, the area is a triangle: $\tfrac{1}{2} \times 0.40 \times 12 = ${dec(e2.tri, 2)}$ J.`,
      v: V.area,
      n: 'The area under a force against displacement graph is the work done. On the left the force is constant, so the area is a rectangle of height twelve newtons and width four metres. On the right the force grows steadily from zero as a rubber cord is stretched, so the area is a triangle. Its area is half the base times the height.',
    }),
    sl('example', 'Worked example: stretching a rubber cord', {
      b: r`**Problem.** A rubber cord is stretched 0.40 m by a force that rises steadily from 0 to ${e2.F} N. Find the work done. How much work would a constant force of ${e2.F} N do over the same 0.40 m?

**Step 1.** The graph is a triangle, so $W = \tfrac{1}{2} \times 0.40 \times ${e2.F} = ${dec(e2.tri, 2)}$ J.

**Step 2.** For a constant force the graph is a rectangle: $W = ${e2.F} \times 0.40 = ${dec(e2.rect, 2)}$ J, twice as much.`,
      v: table(['Force', 'Area shape', 'Work (J)'], [['rises from 0 to 12 N', 'triangle', dec(e2.tri, 2)], ['constant 12 N', 'rectangle', dec(e2.rect, 2)]], 'Table comparing the work of a steadily rising force and a constant force over 0.40 metres'),
      n: 'When the cord is stretched, the force grows from zero to twelve newtons. The average force is only half of the final value, so the work is half of twelve newtons times point four metres, which is two point four joules. A constant twelve newtons over the same distance would do twice as much work, four point eight joules.',
    }),
    sl('concept', 'Energy and the joule', {
      b: r`**Energy** is the capacity to do work. It is measured in the same unit as work, the **joule**. When a body does work, it loses energy; when work is done on it, it gains energy. Energy appears in many forms and changes from one form into another.`,
      v: table(['Form of energy', 'Everyday example'], [['Kinetic', 'a moving bus, a flowing river'], ['Potential (gravitational)', 'water in a hill-top tank, a raised hammer'], ['Elastic potential', 'a stretched catapult, a compressed spring'], ['Heat', 'a hot tawa'], ['Sound and light', 'a temple bell, a tube light'], ['Chemical', 'food, cooking gas, a battery'], ['Electrical', 'current in a wire']], 'Table of seven forms of energy with an everyday example of each'),
      n: 'Energy is the capacity to do work, and it is measured in joules, just like work. A body that can do work has energy. When it does work it loses energy, and when work is done on it, it gains energy. Energy comes in many forms such as kinetic, potential, heat, sound, light, chemical and electrical, and it can change from one form to another.',
    }),
    sl('concept', 'Kinetic energy: ½mv² from the equations of motion', {
      b: r`**Kinetic energy** is the energy a body has because it is **moving**. Let a net force $F$ act on a body of mass $m$ starting from rest and give it speed $v$ after a distance $s$. From $v^2 = u^2 + 2as$ with $u = 0$: $s = v^2/2a$. The work done is
$$W = Fs = (ma)\left(\dfrac{v^2}{2a}\right) = \dfrac{1}{2}mv^2$$
This work is stored as kinetic energy: **$\text{KE} = \tfrac{1}{2}mv^2$**.`,
      v: flow('LR', [['a', 'Net force F = m a acts for a distance s'], ['b', 'From rest: v² = 2 a s, so s = v² ÷ 2a'], ['c', 'Work W = F s = m a × v² ÷ 2a'], ['d', 'Kinetic energy = ½ m v²']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow showing how the equations of motion and F equals m a lead to kinetic energy equals half m v squared'),
      n: 'Kinetic energy is the energy of a moving body. Start with a body at rest and apply a net force. By the second law the force is mass times acceleration, and from the third equation of motion the distance is the speed squared divided by twice the acceleration. Multiplying them, the acceleration cancels, and the work done is half the mass times the speed squared. That is the kinetic energy.',
    }),
    sl('diagram', 'Kinetic energy and speed', {
      b: r`Because $\text{KE} = \tfrac{1}{2}mv^2$, the kinetic energy depends on the **square** of the speed. **Doubling the speed makes the kinetic energy four times as large**; doubling the mass only doubles it. This is why a fast vehicle is far more dangerous than a slow one, and why speed limits matter.`,
      v: V.keV,
      n: 'The graph shows kinetic energy against speed for a two kilogram body. The curve rises more and more steeply. At four metres per second the kinetic energy is sixteen joules, but at eight metres per second, double the speed, it is sixty-four joules, which is four times as much. Speed matters more than mass, because it is squared.',
    }),
    sl('example', 'Worked example: kinetic energy of a cyclist', {
      b: r`**Problem.** A cyclist and cycle have a total mass of ${e3.m} kg. Find the kinetic energy at ${e3.v1.toFixed(1)} m s⁻¹ and at ${e3.v2} m s⁻¹.

**Step 1.** $\text{KE}_1 = \tfrac{1}{2} \times ${e3.m} \times ${e3.v1.toFixed(1)}^2 = ${e3.k1}$ J.

**Step 2.** $\text{KE}_2 = \tfrac{1}{2} \times ${e3.m} \times ${e3.v2}^2 = ${e3.k2}$ J.

**Step 3.** The speed doubled and the kinetic energy became $${e3.k2} / ${e3.k1} = ${e3.k2 / e3.k1}$ times as large.`,
      v: table(['Speed (m/s)', 'KE = ½mv² (J)'], [['6.0', `${e3.k1}`], ['12', `${e3.k2}`]], 'Table of the kinetic energy of a 70 kilogram cyclist at 6.0 and 12 metres per second'),
      n: 'A cyclist and cycle together have a mass of seventy kilograms. At six metres per second the kinetic energy is half times seventy times thirty-six, which is one thousand two hundred sixty joules. At twelve metres per second it is five thousand forty joules. The speed doubled, but the kinetic energy became four times as large.',
    }),
    sl('check', 'Quick check: doubling the speed', {
      b: 'How does kinetic energy change when the speed changes?',
      n: 'Quick check. Remember that kinetic energy depends on the square of the speed, and answer.',
      chk: 'chk-ke',
    }),
    sl('concept', 'Potential energy: mgh', {
      b: r`**Potential energy** is the energy a body has because of its **position or condition**. **Gravitational potential energy** is stored when a body is raised. To lift a body of mass $m$ at steady speed we must pull up with a force equal to its weight, $mg$. Raising it through a height $h$, the work done is
$$W = (mg) \times h = mgh$$
This work is stored: **$\text{PE} = mgh$**, measured from the chosen reference level, such as the ground.`,
      v: table(['Body', 'Mass (kg)', 'Height (m)', 'PE = mgh (J)'], [['Earthen pot on a shelf', `${pe.m}`, `${pe.h}`, dec(pe.U, 3)], ['Brick on a wall', '3.0', '2.0', dec(3 * g * 2, 3)], ['Water in a tank', '1000', '10', dec(1000 * g * 10, 4)]], 'Table of the gravitational potential energy of a pot, a brick and the water in a tank'),
      n: 'Potential energy is stored energy. To raise a body at steady speed we pull up with a force equal to its weight, which is mass times g. Over a height h, the work done is mass times g times height. This work is stored as gravitational potential energy. The value depends on the level we choose as zero, usually the ground.',
    }),
    sl('concept', 'The work–energy theorem', {
      b: r`**Work–energy theorem.** The **net work** done on a body equals the **change in its kinetic energy**:
$$W_\text{net} = \tfrac{1}{2}mv^2 - \tfrac{1}{2}mu^2$$
Positive net work **increases** the kinetic energy (the body speeds up). Negative net work **decreases** it (the body slows down, as when friction or brakes act). If the net work is zero, the speed does not change.`,
      v: table(['Net work', 'Change in KE', 'What happens to the body'], [['positive', 'increases', 'speeds up'], ['negative', 'decreases', 'slows down'], ['zero', 'no change', 'speed stays the same']], 'Table linking the sign of the net work to the change in kinetic energy and the motion'),
      n: 'The work energy theorem says that the net work done on a body equals the change in its kinetic energy. If the net work is positive, the kinetic energy increases and the body speeds up. If the net work is negative, as with friction or brakes, the kinetic energy decreases and the body slows down. If the net work is zero, the speed stays the same.',
    }),
    sl('example', 'Worked example: stopping a handcart', {
      b: r`**Problem.** A handcart of mass ${e5.m} kg moving at ${e5.v.toFixed(1)} m s⁻¹ is brought to rest by a steady friction force over ${e5.d.toFixed(1)} m. Find the force.

**Step 1.** Initial kinetic energy $= \tfrac{1}{2} \times ${e5.m} \times ${e5.v.toFixed(1)}^2 = ${e5.ke}$ J. Final kinetic energy $= 0$.

**Step 2.** Net work $=$ change in KE $= 0 - ${e5.ke} = -${e5.ke}$ J. The work of friction is $-F \times ${e5.d.toFixed(1)}$.

**Step 3.** $F \times ${e5.d.toFixed(1)} = ${e5.ke}$, so $F = ${e5.F}$ N.`,
      v: table(['Quantity', 'Value'], [['Initial KE', `${e5.ke} J`], ['Final KE', '0 J'], ['Net work (friction)', `−${e5.ke} J`], ['Stopping distance', `${e5.d.toFixed(1)} m`], ['Friction force', `${e5.F} N`]], 'Table of the energy and force values for stopping an 80 kilogram handcart'),
      n: 'The handcart has kinetic energy of three hundred sixty joules and ends at rest. By the work energy theorem, the net work done on it is minus three hundred sixty joules. This negative work is done by friction over two metres. So friction times two metres equals three hundred sixty joules, which gives a force of one hundred eighty newtons.',
    }),
    sl('check', 'Quick check: work and energy', {
      b: 'Use the work–energy theorem to find a net work.',
      n: 'Quick check. Use the work energy theorem, the net work equals the change in kinetic energy, and answer.',
      chk: 'chk-wet',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        r`Work $W = Fs\cos\theta$: positive at $0^\circ$, zero at $90^\circ$, negative at $180^\circ$. Unit joule (J).`,
        'Area under a force–displacement graph = work done.',
        r`Kinetic energy $\tfrac{1}{2}mv^2$ (derived from $v^2 = 2as$ and $F = ma$); doubling the speed makes KE four times as large.`,
        r`Gravitational potential energy $mgh$ (work done in lifting at steady speed).`,
        'Work–energy theorem: net work = change in kinetic energy.',
      ],
      v: table(['Idea', 'Formula'], [['Work', 'W = F s cos θ'], ['Kinetic energy', 'KE = ½ m v²'], ['Potential energy', 'PE = m g h'], ['Work–energy theorem', 'W net = KE final − KE initial']], 'Table summarising the formulas for work, kinetic energy, potential energy and the work energy theorem'),
      n: 'To sum up. Work is force times displacement along the force. It is positive, zero or negative depending on the angle between them. Kinetic energy is half mass times speed squared, and potential energy near the ground is mass times g times height. The work energy theorem says that the net work done on a body equals the change in its kinetic energy.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'Write the formula first, then substitute with units: J, N, m, kg, m s⁻¹.',
        'Say whether the work is positive, negative or zero, and give the reason (the angle).',
        'For KE questions, square the speed before multiplying by half the mass.',
        'State g = 9.8 m s⁻² when you use mgh.',
        'In stopping-distance problems, use net work = change in KE and keep the sign.',
      ],
      n: 'Some exam tips. Write the formula first and then put in the numbers with units. Say whether the work is positive, negative or zero, and give the angle as the reason. Square the speed first in kinetic energy questions. State the value of g when you use mass times g times height. In stopping problems, use the work energy theorem and keep the sign of the work.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Work, Energy and Simple Machines — Part 2: Conservation, power and machines',
  goals: [
    'Describe energy transformations and apply conservation of mechanical energy',
    'Calculate power in watts and energy in kilowatt hours',
    'Classify levers and calculate mechanical advantage',
    'Calculate mechanical advantage and efficiency of pulley systems',
  ],
  slides: [
    sl('title', 'Conservation, power and simple machines', {
      b: 'Part 2: energy never disappears, how fast work is done, and how machines make jobs easier.',
      v: table(['Idea', 'In one line'], [['Conservation of energy', 'energy changes form but the total stays the same'], ['Power', 'work done per second'], ['Simple machine', 'a device that makes work easier by changing force or direction'], ['Efficiency', 'how much of the input is useful output']], 'Table of four ideas of this part with a one-line statement of each'),
      n: 'In this part we see that energy is never lost, it only changes from one form into another. We learn how to measure how quickly work is done, which is called power, and how to calculate the electrical energy used at home. Then we study simple machines, levers and pulleys, which let a small effort move a large load.',
    }),
    sl('concept', 'Forms and transformations of energy', {
      b: r`**Law of conservation of energy.** Energy can neither be created nor destroyed; it can only change from one form into another. The **total** energy of an isolated system stays constant. Some energy often changes to **heat** that spreads into the surroundings, so we cannot easily use it again.`,
      v: table(['Device or event', 'Energy change'], [['Falling mango', 'potential → kinetic'], ['Ceiling fan', 'electrical → kinetic (and a little heat)'], ['Solar cell on a roof', 'light → electrical'], ['Hydroelectric dam', 'potential of water → kinetic → electrical'], ['Burning cooking gas', 'chemical → heat and light'], ['Rubbing your palms', 'kinetic → heat'], ['Loudspeaker', 'electrical → sound']], 'Table of seven devices or events and the energy change in each'),
      n: 'The law of conservation of energy says energy cannot be created or destroyed. It only changes form. A falling mango turns potential energy into kinetic energy. A fan turns electrical energy into motion, and a little heat. A solar cell turns light into electricity. Burning gas turns chemical energy into heat and light. In every case the total amount of energy stays the same.',
    }),
    sl('diagram', 'Mechanical energy of a falling body', {
      b: r`**Mechanical energy** is the sum of kinetic and potential energy. For a freely falling body, with air resistance ignored, the **total stays constant**: as the height falls, PE falls by exactly the amount KE rises. For the 0.40 kg mango, $\text{PE} + \text{KE} = ${dec(0.4 * g * 5, 3)}$ J at every height. At the ground $\tfrac{1}{2}mv^2 = mgh$, so $v = \sqrt{2gh}$ for a fall from rest.`,
      v: V.fall,
      n: 'This bar chart follows a mango of mass point four kilograms falling from five metres. At the top it has only potential energy, nineteen point six joules. Every metre it falls, the potential energy bar shrinks and the kinetic energy bar grows by the same amount. The total is always nineteen point six joules. Just before it lands, all the energy is kinetic.',
    }),
    sl('concept', 'The simple pendulum', {
      b: r`A pendulum bob swinging in air shows the exchange clearly. At the **extreme positions** the bob stops for an instant: KE is zero and PE is greatest. At the **mean (lowest) position** the bob is fastest: KE is greatest and PE is least. In an ideal pendulum $\text{KE} + \text{PE}$ is the same everywhere. In real life air resistance changes a little of the energy to heat and the swings slowly die away.`,
      v: table(['Position of the bob', 'Height', 'Speed', 'PE', 'KE'], [['Extreme left or right', 'highest', 'zero', 'greatest', 'zero'], ['Midway', 'in between', 'in between', 'in between', 'in between'], ['Mean position (lowest)', 'lowest', 'greatest', 'least', 'greatest']], 'Table of height, speed, potential energy and kinetic energy of a pendulum bob at three positions'),
      n: 'Think of a pendulum bob swinging to and fro. At the two extreme ends it stops for a moment, so its kinetic energy is zero and its potential energy is greatest. As it swings down, potential energy changes to kinetic energy. At the lowest point the bob moves fastest. Then the kinetic energy changes back to potential energy as it rises on the other side.',
    }),
    sl('diagram', 'A roller-coaster track', {
      b: r`On a frictionless roller-coaster that starts from rest at height $H$, the speed at any height $h$ follows from $\tfrac{1}{2}mv^2 = mg(H - h)$, so $v = \sqrt{2g(H - h)}$. The mass cancels. Here $H = 25$ m: at $h = 15$ m, $v = \sqrt{2 \times ${g} \times 10} = ${dec(Math.sqrt(2 * g * 10), 3)}$ m s⁻¹. The car cannot climb higher than its starting height, because it has no extra energy.`,
      v: V.roller,
      n: 'A roller coaster car starts from rest at the top, twenty-five metres high. At each lower point it has less potential energy and more kinetic energy, so it moves faster. At fifteen metres it moves at fourteen metres per second, and at the ground at about twenty-two metres per second. The speed does not depend on the mass. Real tracks have some friction, so the speeds are a little smaller.',
    }),
    sl('example', 'Worked example: a slide and a thrown ball', {
      b: r`**Problem.** (a) A child slides down a smooth slide from a height of ${e6.h} m, starting from rest. Find the speed at the bottom. (b) A ball is thrown vertically upward at ${e6.u} m s⁻¹. How high does it rise? Take $g = ${g}\ \text{m s}^{-2}$.

**(a)** $mgh = \tfrac{1}{2}mv^2$, so $v = \sqrt{2gh} = \sqrt{2 \times ${g} \times ${e6.h}} = \sqrt{${dec(2 * g * e6.h, 3)}} = ${dec(e6.v, 2)}$ m s⁻¹.

**(b)** At the top the ball is at rest: $\tfrac{1}{2}mu^2 = mgH$, so $H = u^2 / 2g = ${e6.u * e6.u} / ${dec(2 * g, 3)} = ${dec(e6.H, 3)}$ m.`,
      v: table(['Case', 'Energy equation', 'Answer'], [['Slide', 'm g h = ½ m v²', `${dec(e6.v, 2)} m/s`], ['Ball thrown up', '½ m u² = m g H', `${dec(e6.H, 3)} m`]], 'Table of the energy equation and answer for the slide and the thrown ball'),
      n: 'For the slide, the potential energy at the top changes into kinetic energy at the bottom, so the speed is the square root of two times g times the height. That gives seven metres per second. For the ball thrown upward, the kinetic energy at the start changes completely into potential energy at the top. This gives a maximum height of ten metres. The mass cancels in both.',
    }),
    sl('check', 'Quick check: conservation of energy', {
      b: 'Think about the energy of a freely falling body.',
      n: 'Quick check. Remember that for a freely falling body the total of kinetic and potential energy stays constant, and answer.',
      chk: 'chk-cons',
    }),
    sl('concept', 'Power and units of energy', {
      b: r`**Power** is the rate of doing work, or the work done in one second:
$$P = \dfrac{W}{t}$$
The SI unit is the **watt** (W): $1\ \text{W} = 1\ \text{J s}^{-1}$. Larger units are the kilowatt, $1\ \text{kW} = 1000\ \text{W}$. For electricity bills we use the **kilowatt hour** (kWh), the energy used by a 1 kW device running for 1 hour: $1\ \text{kWh} = 3.6 \times 10^6\ \text{J}$.`,
      v: table(['Device (typical, approximate)', 'Power'], [['LED bulb', '9 W'], ['Ceiling fan', '70 W'], ['Mixer-grinder', '500 W'], ['Electric geyser', '1500 W'], ['Small car engine at full power', '50 000 W = 50 kW']], 'Table of the approximate power of five common devices'),
      n: 'Power tells us how fast work is done. It is the work divided by the time, and its unit is the watt, which is one joule per second. A kilowatt is one thousand watts. Electricity companies measure energy in kilowatt hours, also called units. One kilowatt hour is the energy used by a one kilowatt device in one hour, which is three point six million joules.',
    }),
    sl('example', 'Worked example: power of a hand pump', {
      b: r`**Problem.** A hand pump on a farm lifts ${e8.m} kg of water through ${e8.h.toFixed(1)} m in ${e8.t} s. Find the power used in lifting the water. Take $g = ${g}\ \text{m s}^{-2}$.

**Step 1.** Work $= mgh = ${e8.m} \times ${g} \times ${e8.h.toFixed(1)} = ${dec(e8.W, 4)}$ J.

**Step 2.** Power $= W/t = ${dec(e8.W, 4)} / ${e8.t} = ${dec(e8.P, 3)}$ W.`,
      v: table(['Quantity', 'Working', 'Value'], [['Work done', 'm g h', `${dec(e8.W, 4)} J`], ['Time taken', 'given', `${e8.t} s`], ['Power', 'W ÷ t', `${dec(e8.P, 3)} W`]], 'Table of the work, time and power for lifting water with a hand pump'),
      n: 'To find the power, first find the work. Lifting twenty-four kilograms of water through five metres takes mass times g times height, which is one thousand one hundred seventy-six joules. This is done in forty seconds. Power is work divided by time, so the pump uses about twenty-nine point four watts for lifting the water.',
    }),
    sl('example', 'Worked example: an electricity bill', {
      b: r`**Problem.** A ${e9.P} kW geyser runs for ${e9.mins} minutes every day for ${e9.days} days. Find the energy used in kWh and in joules, and the cost at ₹${e9.rate} per kWh (an illustrative rate).

**Step 1.** Time per day $= ${e9.mins}/60 = ${dec(e9.mins / 60, 3)}$ h. Energy per day $= ${e9.P} \times ${dec(e9.mins / 60, 3)} = ${dec(e9.P * e9.mins / 60, 3)}$ kWh.

**Step 2.** In ${e9.days} days: $${dec(e9.P * e9.mins / 60, 3)} \times ${e9.days} = ${e9.kwh}$ kWh.

**Step 3.** In joules: $${e9.kwh} \times 3.6 \times 10^6 = 5.4 \times 10^7$ J. Cost $= ${e9.kwh} \times ${e9.rate} = ${e9.cost}$ rupees (₹${e9.cost}).`,
      v: table(['Step', 'Result'], [['Energy per day', `${dec(e9.P * e9.mins / 60, 3)} kWh`], ['Energy in 30 days', `${e9.kwh} kWh`], ['Same energy in joules', '5.4 × 10⁷ J'], ['Cost at ₹7 per unit (illustrative)', `₹${e9.cost}`]], 'Table of the geyser energy per day, over 30 days, in joules and its cost'),
      n: 'A one point five kilowatt geyser running for twenty minutes uses half a kilowatt hour each day. Over thirty days that is fifteen kilowatt hours, or fifteen units on the bill. One unit is three point six million joules, so fifteen units is fifty-four million joules. At seven rupees a unit, which is only an illustrative rate, the cost is one hundred five rupees.',
    }),
    sl('check', 'Quick check: power', {
      b: 'Compare the power of two workers.',
      n: 'Quick check. Remember that power is work divided by time, and answer.',
      chk: 'chk-power',
    }),
    sl('concept', 'Simple machines and mechanical advantage', {
      b: r`A **simple machine** is a device that makes work easier by changing the **size** or the **direction** of a force. We apply an **effort** $E$ to overcome a **load** $L$. The **mechanical advantage** is
$$\text{MA} = \dfrac{\text{load}}{\text{effort}}$$
It has no unit. If $\text{MA} > 1$, a small effort moves a large load, but the effort moves through a **larger distance**. A machine never gives more work than we put in.`,
      v: table(['Mechanical advantage', 'Meaning', 'Example'], [['greater than 1', 'small effort lifts a big load', 'crowbar lifting a stone'], ['equal to 1', 'only the direction changes', 'single fixed pulley'], ['less than 1', 'larger effort, but faster or longer motion', 'tongs, fishing rod']], 'Table of mechanical advantage greater than, equal to and less than one with an example'),
      n: 'A simple machine makes a job easier by changing the size or direction of a force. We apply an effort to move a load. The mechanical advantage is the load divided by the effort. It has no unit. A value above one means a small effort can move a big load, but the effort has to move through a larger distance. A machine can never give out more work than we put in.',
    }),
    sl('diagram', 'Levers and their three classes', {
      b: r`A **lever** is a rigid bar that turns about a fixed point, the **fulcrum**. The **effort arm** and the **load arm** are the distances of the effort and the load from the fulcrum. For a lever
$$\text{MA} = \dfrac{\text{load}}{\text{effort}} = \dfrac{\text{effort arm}}{\text{load arm}}$$
**Class I**: fulcrum between effort and load. **Class II**: load between fulcrum and effort (MA always greater than 1). **Class III**: effort between fulcrum and load (MA always less than 1).`,
      v: V.levers,
      n: 'A lever is a rigid bar that turns about a fixed point called the fulcrum. The mechanical advantage equals the effort arm divided by the load arm. In a class one lever the fulcrum is between the effort and the load. In a class two lever the load is in the middle, so the mechanical advantage is always more than one. In a class three lever the effort is in the middle, so it is always less than one.',
    }),
    sl('example', 'Worked example: a crowbar', {
      b: r`**Problem.** A crowbar is used to lift a stone with a load of ${e10.load} N at a distance of ${e10.lArm} m from the fulcrum. The effort is applied ${e10.eArm} m from the fulcrum. Find the mechanical advantage and the effort needed.

**Step 1.** $\text{MA} = \dfrac{\text{effort arm}}{\text{load arm}} = \dfrac{${e10.eArm}}{${e10.lArm}} = ${e10.ma}$.

**Step 2.** $\text{effort} = \dfrac{\text{load}}{\text{MA}} = \dfrac{${e10.load}}{${e10.ma}} = ${e10.effort}$ N.

The effort is only about one eighth of the load, so a person can lift the stone.`,
      v: table(['Quantity', 'Value'], [['Load', `${e10.load} N`], ['Load arm', `${e10.lArm} m`], ['Effort arm', `${e10.eArm} m`], ['MA', `${e10.ma}`], ['Effort', `${e10.effort} N`]], 'Table of the load, arms, mechanical advantage and effort for the crowbar'),
      n: 'The crowbar has an effort arm of one point two metres and a load arm of fifteen hundredths of a metre. The mechanical advantage is the effort arm divided by the load arm, which is eight. So the effort is the load divided by eight, about one hundred twelve newtons. A person can lift a stone with a load of nine hundred newtons by pushing with only one eighth of that force.',
    }),
    sl('diagram', 'Pulleys', {
      b: r`A **pulley** is a grooved wheel with a rope over it. A **single fixed pulley** only changes the direction of the effort: $\text{MA} = 1$. A **single movable pulley** is carried by the load and supported by two strands: $\text{MA} = 2$. In a **block and tackle**, several pulleys share one rope. For an ideal system (no friction, light pulleys) the mechanical advantage equals the **number of rope strands supporting the load**. In the picture it is 3.`,
      v: V.pulleys,
      n: 'A pulley is a grooved wheel with a rope over it. A single fixed pulley only changes the direction of the pull, so its mechanical advantage is one. A single movable pulley is supported by two strands of rope, so the effort is half the load. In a block and tackle, the mechanical advantage of an ideal system equals the number of strands supporting the load. Here there are three strands, so the effort is one third of the load.',
    }),
    sl('concept', 'Efficiency of a machine', {
      b: r`In a real machine friction and the weight of moving parts waste some energy, so the work we get out is **less** than the work we put in. The **efficiency** is
$$\eta = \dfrac{\text{useful work output}}{\text{work input}} \times 100\,\%$$
The **velocity ratio** (VR) is the distance moved by the effort divided by the distance moved by the load; for a pulley system it equals the number of supporting strands. Then $\eta = \dfrac{\text{MA}}{\text{VR}} \times 100\,\%$. An ideal machine would have $\eta = 100\,\%$; no real machine does.`,
      v: table(['Quantity', 'Formula'], [['Work output', 'load × distance moved by the load'], ['Work input', 'effort × distance moved by the effort'], ['Velocity ratio', 'effort distance ÷ load distance'], ['Efficiency', 'MA ÷ VR × 100 %']], 'Table of work output, work input, velocity ratio and efficiency formulas'),
      n: 'In a real machine, friction wastes some of the energy we supply, so the work we get out is less than the work we put in. The efficiency is the useful work output divided by the work input, as a percentage. For a pulley system, the velocity ratio is the number of supporting strands, and the efficiency equals the mechanical advantage divided by the velocity ratio. No real machine is one hundred percent efficient.',
    }),
    sl('example', 'Worked example: a block and tackle', {
      b: r`**Problem.** A block and tackle with ${e11.strands} supporting strands lifts a load of ${e11.load} N with an effort of ${e11.effort} N. Find the MA, the VR and the efficiency.

**Step 1.** $\text{MA} = ${e11.load}/${e11.effort} = ${dec(e11.ma, 3)}$. $\text{VR} = ${e11.vr}$.

**Step 2.** $\eta = \dfrac{\text{MA}}{\text{VR}} \times 100 = \dfrac{${dec(e11.ma, 3)}}{${e11.vr}} \times 100 = ${e11.eff}\,\%$.

**Check with work.** To lift the load ${e11.up} m the effort moves ${e11.strands * e11.up} m. Output $= ${e11.load} \times ${e11.up} = ${e11.wOut}$ J; input $= ${e11.effort} \times ${e11.strands * e11.up} = ${e11.wIn}$ J; $\eta = ${e11.wOut}/${e11.wIn} = ${e11.eff / 100}$.`,
      v: table(['Quantity', 'Value'], [['Mechanical advantage', dec(e11.ma, 3)], ['Velocity ratio', `${e11.vr}`], ['Work output', `${e11.wOut} J`], ['Work input', `${e11.wIn} J`], ['Efficiency', `${e11.eff} %`]], 'Table of the mechanical advantage, velocity ratio, work output, work input and efficiency of the block and tackle'),
      n: 'The load is two hundred seventy newtons and the effort is one hundred twenty newtons, so the mechanical advantage is two point two five. With three strands the velocity ratio is three. The efficiency is two point two five divided by three, which is seventy-five percent. We can check this with work. The output is one hundred thirty-five joules, and the input is one hundred eighty joules.',
    }),
    sl('check', 'Quick check: pulleys', {
      b: 'Use the number of strands to find an ideal effort.',
      n: 'Quick check. For an ideal pulley system the mechanical advantage equals the number of supporting strands, and answer.',
      chk: 'chk-pulley',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'Energy is conserved: it changes form, but the total stays the same. For free fall or a frictionless slope, KE + PE is constant.',
        r`Power $P = W/t$, unit watt; $1\ \text{kWh} = 3.6 \times 10^6$ J.`,
        r`Mechanical advantage = load ÷ effort. For a lever MA = effort arm ÷ load arm; there are three classes.`,
        'Ideal pulley MA = number of strands supporting the load; fixed pulley MA = 1, movable pulley MA = 2.',
        r`Efficiency $= \dfrac{\text{work output}}{\text{work input}} \times 100\,\%$ and is always below 100 % for a real machine.`,
      ],
      v: table(['Idea', 'Formula or statement'], [['Conservation', 'KE + PE constant (no friction)'], ['Power', 'P = W ÷ t'], ['Lever MA', 'effort arm ÷ load arm'], ['Efficiency', 'output ÷ input × 100 %']], 'Table summarising conservation of energy, power, lever mechanical advantage and efficiency'),
      n: 'To sum up. Energy is never lost, it only changes form. For a frictionless fall, kinetic plus potential energy is constant. Power is work divided by time, and one kilowatt hour is three point six million joules. Mechanical advantage is load divided by effort. For a lever it is the effort arm divided by the load arm. Efficiency compares the useful output with the input, and it is always below one hundred percent.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'For free fall and slides, write mgh = ½mv² and cancel the mass.',
        'Change minutes to hours for kWh, and kW to W before using P = W/t in SI units.',
        'MA = load ÷ effort = effort arm ÷ load arm; name the class from where the fulcrum is.',
        'For pulleys, count only the strands supporting the load.',
        'Efficiency is a percentage and must be below 100 % for a real machine; check your answer.',
      ],
      n: 'Some exam tips. For free fall and slide problems, equate mass times g times height to half mass times speed squared, and cancel the mass. Change minutes to hours for kilowatt hours, and kilowatts to watts for the power formula. For levers, name the class from the position of the fulcrum. For pulleys, count only the strands that support the load. And check that an efficiency is below one hundred percent.',
    }),
  ],
});
