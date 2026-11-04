// ch03 Motion — two decks: Part 1 (t01–t02) distance, displacement, speed, velocity, acceleration and motion graphs;
// Part 2 (t03–t04) equations of motion, free fall and uniform circular motion.
import { sl, deck, table, flow, svgV, plot, r, near, dec } from './lib.mjs';
import { DISPLACEMENT, XT_SHAPES, VT_UNIFORM, SCOOTER_VT, CIRCLE } from './svgs.mjs';

const must = (ok, msg) => {
  if (!ok) throw new Error(`deck check failed: ${msg}`);
};

// ---- worked-example numbers (computed once, then interpolated)
const ex1 = (() => {
  const e = 600, n = 800, t = 600;
  const dist = e + n;
  const disp = Math.hypot(e, n);
  return { e, n, t, dist, disp, spd: dist / t, vel: disp / t, ang: (Math.atan2(n, e) * 180) / Math.PI };
})();
must(ex1.disp === 1000 && near(ex1.spd, 2.333, 0.001) && near(ex1.vel, 1.667, 0.001), 'ex1');
const ex2 = (() => {
  const u = 18 / 3.6, v = 54 / 3.6, t = 5.0;
  return { u, v, t, a: (v - u) / t, brake: (0 - v) / 3.0 };
})();
must(ex2.u === 5 && ex2.v === 15 && near(ex2.a, 2.0, 1e-9) && near(ex2.brake, -5.0, 1e-9), 'ex2');
const ex3 = (() => {
  const x1 = 30, t1 = 2, x2 = 110, t2 = 10;
  return { v: (x2 - x1) / (t2 - t1) };
})();
must(near(ex3.v, 10, 1e-9), 'ex3');
const ex4 = (() => {
  const u = 15, a = -3.0;
  const t = (0 - u) / a;
  const s = (0 - u * u) / (2 * a);
  return { t, s, sCheck: u * t + 0.5 * a * t * t };
})();
must(near(ex4.t, 5.0, 1e-9) && near(ex4.s, 37.5, 1e-9) && near(ex4.sCheck, 37.5, 1e-9), 'ex4');
const ex5 = (() => {
  const u = 19.6, g = 9.8;
  const tUp = u / g;
  const H = (u * u) / (2 * g);
  return { tUp, H, tAll: 2 * tUp, hCheck: u * tUp - 0.5 * g * tUp * tUp };
})();
must(near(ex5.tUp, 2.0, 1e-9) && near(ex5.H, 19.6, 1e-9) && near(ex5.hCheck, 19.6, 1e-9), 'ex5');
const ex6 = (() => {
  const u = 5, a = 0.2, t = 50;
  return { v: u + a * t, s: u * t + 0.5 * a * t * t, sCheck: ((u + (u + a * t)) / 2) * t };
})();
must(ex6.v === 15 && near(ex6.s, 500, 1e-9) && near(ex6.sCheck, 500, 1e-9), 'ex6');
const ex7 = (() => {
  const rr = 3.84e8, T = 27.3 * 24 * 3600;
  return { v: (2 * Math.PI * rr) / T };
})();
must(near(ex7.v, 1023, 0.01), 'ex7 moon');

const xtPlot = plot(
  {
    x: { min: 0, max: 10, label: 'time t (s)' },
    y: { min: 0, max: 70, label: 'position x (m)' },
    functions: [{ expr: '10+5x', label: 'cyclist: x = 10 + 5t', domain: [0, 10] }],
    points: [{ at: [0, 10], label: 'start (0 s, 10 m)' }, { at: [8, 50], label: '(8 s, 50 m)' }],
  },
  'Position-time graph of a cyclist moving at constant velocity: a straight line from 10 metres at time zero to 50 metres at 8 seconds, slope 5 metres per second',
  'Slope = (50 − 10) m ÷ (8 − 0) s = 5 m/s.',
);
const ballPlot = plot(
  {
    x: { min: 0, max: 4, label: 'time t (s)' },
    y: { min: -22, max: 22, label: 'velocity v (m/s)' },
    functions: [{ expr: '19.6-9.8x', label: 'v = 19.6 − 9.8t', domain: [0, 4] }],
    points: [{ at: [0, 19.6], label: 'thrown up at 19.6 m/s' }, { at: [2, 0], label: 'top of flight at 2.0 s' }, { at: [4, -19.6], label: 'back at 4.0 s, 19.6 m/s downward' }],
  },
  'Velocity-time graph of a ball thrown straight up at 19.6 metres per second: a straight line sloping down at 9.8 metres per second every second, crossing zero at 2 seconds and reaching minus 19.6 at 4 seconds',
  'Slope = −9.8 m/s² (g); the line crosses zero at the top of the flight.',
);

export const V = {
  disp: svgV(DISPLACEMENT, 'Map of a walk of 300 metres east and 400 metres north: distance 700 metres, displacement 500 metres at about 53 degrees north of east', 'Distance follows the path; displacement is the straight arrow from start to end.'),
  xtShapes: svgV(XT_SHAPES, 'Three position-time graphs: flat line for rest, straight sloping line for uniform velocity and a steepening curve for speeding up', 'The slope of a position–time graph is the velocity.'),
  vtUniform: svgV(VT_UNIFORM, 'Velocity-time graph of uniform acceleration with the area under it split into a rectangle and a triangle', 'The area under the line is the displacement; the slope is the acceleration.'),
  scooter: svgV(SCOOTER_VT, 'Velocity-time graph of a scooter: rises to 10 metres per second in 5 seconds, steady until 20 seconds, then falls to rest at 30 seconds; areas 25, 150 and 50 metres', 'Add the three areas to get the total displacement.'),
  circle: svgV(CIRCLE, 'A body moving in a circle at constant speed with velocity arrows along the tangent at four points', 'Speed is constant but the direction of velocity changes all the time.'),
  xtPlot,
  ballPlot,
};

export const deck1 = deck({
  part: 1,
  title: 'Motion — Part 1: Displacement, velocity, acceleration and motion graphs',
  goals: [
    'Distinguish distance from displacement and speed from velocity, and give their SI units',
    'Define average and instantaneous velocity and acceleration',
    'Plot and read position–time and velocity–time graphs, using slope and area',
    'Find average velocity and displacement from graphs',
  ],
  slides: [
    sl('title', 'Motion', {
      b: 'Part 1: how we describe where a body is, how fast it goes and how its motion changes, in words, numbers and graphs.',
      v: table(['Quantity', 'Symbol', 'SI unit', 'Scalar or vector'], [['Distance', 's', 'metre (m)', 'scalar'], ['Displacement', 's', 'metre (m)', 'vector'], ['Speed', 'v', r`metre per second ($\text{m s}^{-1}$)`, 'scalar'], ['Velocity', 'v', r`metre per second ($\text{m s}^{-1}$)`, 'vector'], ['Acceleration', 'a', r`metre per second squared ($\text{m s}^{-2}$)`, 'vector']], 'Table of the main quantities used to describe motion, their symbols, SI units and whether they are scalars or vectors'),
      n: 'Everything around us moves. A cyclist on a ghat road, a train leaving a station, a ceiling fan, even the Moon. To describe motion in a clear way, physicists use a few careful words: distance, displacement, speed, velocity and acceleration. In this part we meet each one, learn its unit, and then see how a graph can show the whole story of a journey at a glance.',
    }),
    sl('concept', 'Distance and displacement', {
      b: r`**Distance** is the total length of the path travelled. It has only size, so it is a **scalar**. **Displacement** is the shortest straight-line change of position from the start to the end, with its direction. It is a **vector**. Both are measured in metres (m) in the SI system. Distance is never negative and never decreases; displacement can be smaller than the distance, and it can even be zero.`,
      v: V.disp,
      n: 'Imagine walking from home to school by a road that goes east and then turns north. The distance is the length of the whole road you walked. The displacement is the straight arrow from your home to the school, with a direction. Distance has size only, so it is a scalar. Displacement has size and direction, so it is a vector. Both are measured in metres.',
    }),
    sl('concept', 'Speed and velocity', {
      b: r`**Speed** is the distance covered per unit time: $\text{speed} = \dfrac{\text{distance}}{\text{time}}$. **Velocity** is the displacement per unit time: $\text{velocity} = \dfrac{\text{displacement}}{\text{time}}$. The SI unit of both is metre per second (m s⁻¹). To change km/h to m/s, multiply by $\dfrac{1000}{3600} = \dfrac{1}{3.6}$.`,
      v: table(['Speed', 'Velocity'], [['Uses distance (path length)', 'Uses displacement (straight line)'], ['Scalar: size only', 'Vector: size and direction'], ['Never negative, never zero while moving', 'Can be positive, negative or zero'], ['Speedometer reading', 'Speed together with direction of travel']], 'Table comparing speed and velocity'),
      n: 'Speed tells us how fast a body moves, so it uses distance divided by time. Velocity uses displacement divided by time, so it also tells us the direction. Both are measured in metres per second. A speedometer shows speed only, because it cannot tell you the direction. To change kilometres per hour to metres per second, divide by three point six.',
    }),
    sl('example', 'Worked example: distance, displacement, speed, velocity', {
      b: r`**Problem.** Ravi cycles ${ex1.e} m east and then ${ex1.n} m north. The whole trip takes ${ex1.t} s (10 minutes). Find the distance, the displacement, the average speed and the average velocity.

**Step 1: distance** $= ${ex1.e} + ${ex1.n} = ${ex1.dist}$ m.

**Step 2: displacement.** The two legs are at right angles, so $\sqrt{${ex1.e}^2 + ${ex1.n}^2} = ${ex1.disp}$ m, at about ${Math.round(ex1.ang)}° north of east.

**Step 3: average speed** $= ${ex1.dist} / ${ex1.t} \approx ${dec(ex1.spd, 2)}$ m s⁻¹.

**Step 4: average velocity** $= ${ex1.disp} / ${ex1.t} \approx ${dec(ex1.vel, 2)}$ m s⁻¹ in the direction of the displacement.`,
      v: table(['Quantity', 'Working', 'Result'], [['Distance', `${ex1.e} + ${ex1.n}`, `${ex1.dist} m`], ['Displacement', `√(${ex1.e}² + ${ex1.n}²)`, `${ex1.disp} m, ${Math.round(ex1.ang)}° north of east`], ['Average speed', `${ex1.dist} ÷ ${ex1.t}`, `${dec(ex1.spd, 2)} m/s`], ['Average velocity', `${ex1.disp} ÷ ${ex1.t}`, `${dec(ex1.vel, 2)} m/s`]], 'Worked table for the cyclist: distance 1400 metres, displacement 1000 metres, average speed 2.3 metres per second and average velocity 1.7 metres per second'),
      n: 'Let us work it step by step. The path length is the sum of the two legs, fourteen hundred metres. The legs are at right angles, so the displacement follows from the Pythagoras rule and comes to one thousand metres. Dividing the distance by six hundred seconds gives the average speed. Dividing the displacement by the same time gives the smaller average velocity.',
    }),
    sl('check', 'Quick check: distance and displacement', {
      b: 'Decide which quantity depends only on the start and the end.',
      n: 'Quick check. Think about which quantity depends on the path and which depends only on where you started and where you ended.',
      chk: 'chk-disp',
    }),
    sl('concept', 'Average and instantaneous values', {
      b: r`**Average velocity** over an interval $= \dfrac{\text{total displacement}}{\text{total time}}$. If the velocity changes, the speed shown at one particular moment is the **instantaneous speed**, and with its direction it is the **instantaneous velocity**. When velocity does not change with time, the body has **uniform velocity**. For a body moving in a straight line without turning back, the size of the average velocity equals the average speed.`,
      v: table(['Situation', 'Average over the trip', 'At one instant'], [['Bus on a city road', 'total distance ÷ total time', 'speedometer reading'], ['Cricket ball at its highest point', 'upward and downward parts cancel', 'velocity is momentarily zero'], ['Runner round a 400 m track, one lap', 'average velocity is zero (back at start)', 'speed is not zero'], ['Car on a straight, empty highway at steady speed', 'same as instantaneous velocity', 'same everywhere']], 'Table showing the difference between average and instantaneous values in four situations'),
      n: 'Average velocity is the total displacement divided by the total time. Instantaneous velocity is the velocity at one particular moment, like the reading of a speedometer along with the direction. A runner who completes one lap of a track and returns to the start has zero average velocity, because the displacement is zero, even though her speed was never zero.',
    }),
    sl('concept', 'Acceleration', {
      b: r`**Acceleration** is the rate of change of velocity: $a = \dfrac{v - u}{t}$, where $u$ is the initial velocity, $v$ the final velocity and $t$ the time taken. Its SI unit is metre per second squared ($\text{m s}^{-2}$). Speeding up along the direction of motion gives positive acceleration. Slowing down gives negative acceleration, called **retardation** or deceleration. If the velocity changes by equal amounts in equal times, the acceleration is **uniform**.`,
      v: table(['Motion', 'Velocity', 'Acceleration'], [['Train pulling out of a station', 'increases', 'positive'], ['Cyclist braking at a junction', 'decreases', 'negative (retardation)'], ['Car moving steadily on a straight road', 'constant', 'zero'], ['Ball falling freely', 'increases downward', r`$9.8\ \text{m s}^{-2}$ downward`]], 'Table of four motions with the change in velocity and the sign of the acceleration'),
      n: 'Acceleration tells us how quickly velocity changes. We find it by subtracting the starting velocity from the final velocity and dividing by the time taken. The unit is metre per second squared. A train pulling out of a station has positive acceleration. A cyclist braking has negative acceleration, which we call retardation. A car at steady velocity has no acceleration at all.',
    }),
    sl('example', 'Worked example: acceleration', {
      b: r`**Problem.** An auto-rickshaw speeds up from 18 km/h to 54 km/h in ${ex2.t.toFixed(1)} s. Then the driver brakes and stops in 3.0 s from 54 km/h. Find both accelerations.

**Step 1: convert to SI.** $18\ \text{km/h} = 18/3.6 = ${ex2.u}\ \text{m s}^{-1}$ and $54\ \text{km/h} = ${ex2.v}\ \text{m s}^{-1}$.

**Step 2: speeding up.** $a = \dfrac{v - u}{t} = \dfrac{${ex2.v} - ${ex2.u}}{${ex2.t.toFixed(1)}} = ${dec(ex2.a, 2)}\ \text{m s}^{-2}$.

**Step 3: braking.** $a = \dfrac{0 - ${ex2.v}}{3.0} = ${dec(ex2.brake, 2)}\ \text{m s}^{-2}$. The minus sign shows retardation.`,
      v: table(['Stage', 'u (m/s)', 'v (m/s)', 't (s)', 'a (m/s²)'], [['Speeding up', `${ex2.u}`, `${ex2.v}`, '5.0', dec(ex2.a, 2)], ['Braking', `${ex2.v}`, '0', '3.0', dec(ex2.brake, 2)]], 'Table of the two stages of an auto-rickshaw journey with their accelerations of plus 2.0 and minus 5.0 metres per second squared'),
      n: 'Always convert to SI units first. Eighteen kilometres per hour is five metres per second, and fifty-four is fifteen. While speeding up, the change in velocity is ten metres per second in five seconds, which gives a positive acceleration of two. While braking, the velocity falls by fifteen in three seconds. The answer is negative, which tells us it is a retardation.',
    }),
    sl('diagram', 'Position–time graphs', {
      b: 'In a **position–time graph** the time is on the horizontal axis and the position on the vertical axis. A flat line means the body is at rest. A straight sloping line means uniform velocity. A curve that gets steeper means the body is speeding up.',
      v: V.xtShapes,
      n: 'A position-time graph puts time along the bottom and position up the side. If the line is flat, the position does not change, so the body is at rest. If the line is straight and sloping, the position changes by equal amounts in equal times, which is uniform velocity. If the line curves and gets steeper, the body covers more distance every second, so it is speeding up.',
    }),
    sl('concept', 'Slope of a position–time graph is velocity', {
      b: r`The **slope** of a position–time graph is $\dfrac{\Delta x}{\Delta t}$, and that is exactly the velocity. For a straight line the slope is the same everywhere, so the velocity is uniform. A steeper line means a larger speed, and a line sloping downward means the body is moving in the negative direction. For a curve, the slope of the tangent at a point gives the instantaneous velocity.`,
      v: V.xtPlot,
      n: 'The slope of a position-time graph is the change in position divided by the change in time, and that is the velocity. The line shown rises from ten metres to fifty metres over eight seconds. The slope is therefore forty metres divided by eight seconds, five metres per second. A steeper line would mean a faster body. A line sloping downward would mean motion in the opposite direction.',
    }),
    sl('example', 'Worked example: average velocity from a graph', {
      b: r`**Problem.** The position–time graph of a car on a straight road is a straight line passing through (2 s, 30 m) and (10 s, 110 m). Find its average velocity, and its position at $t = 6$ s.

**Step 1.** Average velocity $= \dfrac{\Delta x}{\Delta t} = \dfrac{110 - 30}{10 - 2} = \dfrac{80}{8} = ${ex3.v}\ \text{m s}^{-1}$.

**Step 2.** The graph is a straight line, so the velocity is uniform. At $t = 6$ s, which is 4 s after the first point, $x = 30 + ${ex3.v} \times 4 = ${30 + ex3.v * 4}$ m.`,
      v: table(['Reading', 't (s)', 'x (m)'], [['First point', '2', '30'], ['Position at t = 6 s', '6', `${30 + ex3.v * 4}`], ['Second point', '10', '110'], ['Slope = velocity', '', `${ex3.v} m/s`]], 'Table of readings from the position-time graph of the car and the slope 10 metres per second'),
      n: 'To find the average velocity from a graph, pick two clear points on the line. The position changes by eighty metres while the time changes by eight seconds. Dividing gives ten metres per second. Because the line is straight, the velocity is uniform, so we can also find the position at any other time. Four seconds after the first point, the car has moved another forty metres.',
    }),
    sl('check', 'Quick check: reading a graph', {
      b: 'Match the shape of a position–time graph to the motion.',
      n: 'Quick check. Look at what the shape of a position-time graph tells you about the motion, and answer.',
      chk: 'chk-xt',
    }),
    sl('concept', 'Velocity–time graphs', {
      b: r`In a **velocity–time graph**, velocity is on the vertical axis and time on the horizontal axis. A horizontal line means uniform velocity (zero acceleration). A straight line sloping up means uniform positive acceleration, and sloping down means uniform retardation. The **slope** of the line is the acceleration: $a = \dfrac{\Delta v}{\Delta t}$.`,
      v: table(['Shape of v–t line', 'What the body is doing', 'Slope (acceleration)'], [['Horizontal, above the axis', 'moves at constant velocity', 'zero'], ['Rising straight line', 'speeds up uniformly', 'positive and constant'], ['Falling straight line', 'slows down uniformly', 'negative and constant'], ['Curve getting steeper', 'acceleration is increasing', 'increasing']], 'Table of four shapes of velocity-time graphs with what each means for the motion'),
      n: 'In a velocity-time graph the height of the line is the velocity. A horizontal line means the velocity is constant, so the acceleration is zero. A straight rising line means the velocity grows by the same amount every second, which is uniform acceleration. A falling line means uniform retardation. In every case, the slope of the line is the acceleration.',
    }),
    sl('diagram', 'Area under a velocity–time graph is displacement', {
      b: r`The area between the velocity–time line and the time axis is the **displacement**. Split a complicated shape into triangles and rectangles, find each area, and add. For a scooter: triangle $\tfrac12 \times 10 \times 5 = 25$ m, rectangle $10 \times 15 = 150$ m, triangle $\tfrac12 \times 10 \times 10 = 50$ m.`,
      v: V.scooter,
      n: 'Here is the velocity-time graph of a scooter. In the first five seconds it speeds up to ten metres per second. Then it moves steadily for fifteen seconds. Finally it slows down to rest in ten seconds. The area under the graph is the displacement. Split it into two triangles and one rectangle, find each area, and add them to get the total distance.',
    }),
    sl('example', 'Worked example: using the scooter graph', {
      b: r`**Problem.** Use the scooter graph to find the total distance, the average speed over 30 s and the acceleration in the first 5 s and in the last 10 s.

**Step 1: distance** $= 25 + 150 + 50 = 225$ m.

**Step 2: average speed** $= 225 / 30 = 7.5\ \text{m s}^{-1}$.

**Step 3: first 5 s.** $a = \dfrac{10 - 0}{5} = 2.0\ \text{m s}^{-2}$.

**Step 4: last 10 s.** $a = \dfrac{0 - 10}{10} = -1.0\ \text{m s}^{-2}$ (retardation).`,
      v: table(['Part of journey', 'How it is found', 'Result'], [['0 to 5 s', 'area of a triangle', '25 m'], ['5 to 20 s', 'area of a rectangle', '150 m'], ['20 to 30 s', 'area of a triangle', '50 m'], ['Whole journey', 'total area ÷ 30 s', 'average speed 7.5 m/s']], 'Table of the areas under the scooter graph and the resulting average speed of 7.5 metres per second'),
      n: 'Reading the graph in parts makes the work easy. The three areas are twenty-five, one hundred and fifty and fifty metres, so the scooter travels two hundred and twenty-five metres. Dividing by the thirty seconds of the journey gives an average speed of seven and a half metres per second. The slopes give the accelerations: two while speeding up and minus one while slowing down.',
    }),
    sl('check', 'Quick check: area under a graph', {
      b: 'Use the area under a velocity–time graph to get the displacement.',
      n: 'Quick check. Remember that the area under a velocity-time graph gives the displacement, and use it to choose the correct option.',
      chk: 'chk-vt',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Distance is the path length (scalar); displacement is the straight-line change of position with direction (vector); both are in metres.',
        r`Speed $=$ distance ÷ time; velocity $=$ displacement ÷ time; the SI unit is m s⁻¹ (divide km/h by 3.6).`,
        r`Acceleration $a = (v - u)/t$ in m s⁻²; it is negative for retardation.`,
        'Position–time graph: slope is velocity; flat means at rest.',
        'Velocity–time graph: slope is acceleration; area under the line is displacement.',
      ],
      v: table(['Graph', 'Slope gives', 'Area gives'], [['Position–time', 'velocity', '(not used)'], ['Velocity–time', 'acceleration', 'displacement']], 'Table of what the slope and the area of position-time and velocity-time graphs give'),
      n: 'Let us sum up. Distance is the path length and displacement is the straight-line change of position with direction. Speed uses distance and velocity uses displacement, both in metres per second. Acceleration is the change in velocity divided by time. On a position-time graph the slope is the velocity. On a velocity-time graph the slope is the acceleration and the area is the displacement.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'Convert km/h to m/s before using any formula (divide by 3.6).',
        'Write the unit in every step, and give a sign or direction for vectors.',
        'On a graph, write down which two points you used for the slope.',
        'For a trapezium or odd shape, split it into rectangles and triangles and show each area.',
        'Average speed is total distance over total time; do not just average the speeds.',
      ],
      n: 'Some exam tips. Change kilometres per hour to metres per second first. Write the unit in every line of your working. When you read a slope from a graph, say which two points you used. Split odd shapes into rectangles and triangles. And remember that average speed is total distance divided by total time, not the plain average of two speeds.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Motion — Part 2: Equations of motion and circular motion',
  goals: [
    'Derive the three equations of motion graphically and algebraically',
    'Apply the equations to braking, free fall and trains',
    'State g = 9.8 m s⁻² and use it for a ball thrown upward',
    'Derive v = 2πr/T for uniform circular motion and use it',
  ],
  slides: [
    sl('title', 'Equations of motion and circular motion', {
      b: 'Part 2: three equations that link velocity, acceleration, time and displacement, and the special case of motion in a circle.',
      v: table(['Equation', 'Links', 'Missing quantity'], [[r`$v = u + at$`, 'v, u, a, t', 's'], [r`$s = ut + \tfrac12 at^2$`, 's, u, a, t', 'v'], [r`$v^2 = u^2 + 2as$`, 'v, u, a, s', 't']], 'Table of the three equations of motion with the quantities they link and the one that is missing'),
      n: 'In this part we meet the three equations of motion. They work whenever a body moves in a straight line with uniform acceleration, such as a braking truck or a ball thrown up. We derive each one from the velocity-time graph and also by simple algebra. Then we turn to motion in a circle, and find a neat formula for the speed.',
    }),
    sl('diagram', 'Uniform acceleration on a v–t graph', {
      b: r`A body starts with velocity $u$. After time $t$ its velocity is $v$. The graph is a straight line AB. The **slope** is the acceleration $a$, and the **area** under AB is the displacement $s$. The area is a rectangle (height $u$, width $t$) plus a triangle (height $v - u$, width $t$).`,
      v: V.vtUniform,
      n: 'Here is the velocity-time graph of a body with uniform acceleration. It starts at the initial velocity and ends at the final velocity after a time. The straight line has a slope equal to the acceleration. The area under the line is the displacement, and it splits neatly into a rectangle and a triangle. These two ideas give us all three equations.',
    }),
    sl('concept', 'First equation: v = u + at', {
      b: r`**Graphical.** Slope of AB $= a = \dfrac{\text{rise}}{\text{run}} = \dfrac{v - u}{t}$. **Algebraic.** By definition, acceleration is the change of velocity per unit time: $a = \dfrac{v - u}{t}$. Rearranging gives
$$v = u + at$$`,
      v: flow('LR', [['a', 'Slope of AB = (v − u) ÷ t'], ['b', 'Slope = a'], ['c', 'at = v − u'], ['d', 'v = u + at']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow showing how the slope of the velocity-time graph leads to v equals u plus a t'),
      n: 'For the first equation, read the slope of the graph. The slope is the rise in velocity divided by the time, and that is the acceleration. Multiply both sides by the time to get the gain in velocity. Add the starting velocity and we have the first equation: the final velocity equals the initial velocity plus the acceleration times the time.',
    }),
    sl('concept', 'Second equation: s = ut + ½at²', {
      b: r`**Graphical.** $s = \text{area of rectangle} + \text{area of triangle} = ut + \tfrac12 (v - u)\,t$. Since $v - u = at$, this becomes
$$s = ut + \tfrac12 at^2$$
**Algebraic.** The average velocity is $\dfrac{u + v}{2}$, so $s = \dfrac{u + v}{2}\,t$. Put $v = u + at$ to get the same result.`,
      v: table(['Step', 'Graphical method', 'Algebraic method'], [['1', 'Area of rectangle = u t', 'Average velocity = (u + v) ÷ 2'], ['2', 'Area of triangle = ½ (v − u) t', 'Displacement s = average velocity × t'], ['3', 'Use v − u = a t', 'Put v = u + a t'], ['4', 's = u t + ½ a t²', 's = u t + ½ a t²']], 'Table comparing the graphical and the algebraic derivation of s equals u t plus half a t squared'),
      n: 'For the second equation, use the area under the graph. The rectangle has an area of initial velocity times time. The triangle has an area of half the gain in velocity times time. Replace the gain in velocity by acceleration times time. Adding the two areas gives the second equation. The algebraic method uses the average velocity and the first equation and reaches the same result.',
    }),
    sl('concept', 'Third equation: v² = u² + 2as', {
      b: r`The area of the trapezium OABD is $s = \dfrac{u + v}{2} \times t$. From the first equation $t = \dfrac{v - u}{a}$. Substituting,
$$s = \dfrac{(u + v)(v - u)}{2a} = \dfrac{v^2 - u^2}{2a}$$
so $2as = v^2 - u^2$, that is
$$v^2 = u^2 + 2as$$`,
      v: flow('LR', [['a', 's = (u + v) t ÷ 2'], ['b', 't = (v − u) ÷ a'], ['c', '2 a s = v² − u²'], ['d', 'v² = u² + 2 a s']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow showing how eliminating time gives v squared equals u squared plus 2 a s'),
      n: 'The third equation does not contain time. Start with the area of the trapezium, which is the average velocity times the time. Then replace the time using the first equation. Multiply out and the two velocities combine into a difference of squares. Rearranging gives the final velocity squared equals the initial velocity squared plus twice the acceleration times the displacement.',
    }),
    sl('check', 'Quick check: choose the equation', {
      b: 'Pick the equation that has the unknown and does not contain a quantity you do not know.',
      n: 'Quick check. Look at what is given and what is asked, and pick the equation that contains exactly those quantities.',
      chk: 'chk-eq',
    }),
    sl('concept', 'Which equation should I use?', {
      b: r`These equations hold only for **uniform acceleration in a straight line**. Write down what is given and what is wanted, then choose the equation that does not contain the quantity you neither know nor need. Take the direction of $u$ as positive; retardation then has a negative $a$.`,
      v: table(['Known quantities', 'To find', 'Use'], [['u, a, t', 'v', r`$v = u + at$`], ['u, a, t', 's', r`$s = ut + \tfrac12 at^2$`], ['u, v, a', 's (no time given)', r`$v^2 = u^2 + 2as$`], ['u, v, s', 'a (no time given)', r`$v^2 = u^2 + 2as$`], ['u, v, t', 's', r`$s = \dfrac{u + v}{2}\,t$`]], 'Table showing which equation of motion to use for different known and unknown quantities'),
      n: 'Choosing the right equation saves time. First write down what is given and what is asked. If time is missing, use the third equation. If the final velocity is missing, use the second. If the displacement is not needed, use the first. Remember that these equations are only for uniform acceleration along a straight line, and take the starting direction as positive.',
    }),
    sl('example', 'Worked example: braking distance', {
      b: r`**Problem.** A car moving at $15\ \text{m s}^{-1}$ is braked with a uniform retardation of $3.0\ \text{m s}^{-2}$. Find the time taken to stop and the braking distance.

**Given.** $u = 15$, $v = 0$, $a = -3.0$ (SI units).

**Step 1: time.** $v = u + at \Rightarrow t = \dfrac{0 - 15}{-3.0} = ${ex4.t.toFixed(1)}$ s.

**Step 2: distance (no time needed).** $v^2 = u^2 + 2as \Rightarrow 0 = 225 + 2(-3.0)s \Rightarrow s = ${dec(ex4.s, 3)}$ m.

**Check.** $s = ut + \tfrac12 at^2 = 15(5.0) - \tfrac12 (3.0)(25) = 75 - 37.5 = 37.5$ m.`,
      v: table(['Quantity', 'Value'], [['u', r`$15\ \text{m s}^{-1}$`], ['v', '0'], ['a', r`$-3.0\ \text{m s}^{-2}$`], ['t (found)', `${ex4.t.toFixed(1)} s`], ['s (found)', `${dec(ex4.s, 3)} m`]], 'Table of the given and found quantities for a car braking from 15 metres per second: time 5.0 seconds and distance 37.5 metres'),
      n: 'Write down what we know. The initial velocity is fifteen, the final velocity is zero and the acceleration is minus three. The first equation gives the time to stop, five seconds. The third equation gives the braking distance directly without using time, thirty-seven point five metres. We can confirm it with the second equation, which gives the same answer.',
    }),
    sl('example', 'Worked example: a ball thrown upward', {
      b: r`**Problem.** A ball is thrown straight up at $19.6\ \text{m s}^{-1}$. Take $g = 9.8\ \text{m s}^{-2}$ downward and ignore air resistance. Find the time to reach the top, the greatest height and the total time in the air.

**Take up as positive:** $u = 19.6$, $a = -9.8$, and $v = 0$ at the top.

**Time to top.** $t = \dfrac{0 - 19.6}{-9.8} = ${ex5.tUp.toFixed(1)}$ s.

**Greatest height.** $s = \dfrac{0 - 19.6^2}{2(-9.8)} = ${dec(ex5.H, 3)}$ m.

**Total time** $= 2 \times ${ex5.tUp.toFixed(1)} = ${ex5.tAll.toFixed(1)}$ s, and it returns with speed $19.6\ \text{m s}^{-1}$.`,
      v: V.ballPlot,
      n: 'When a ball goes up, gravity slows it down by nine point eight metres per second every second. Taking up as positive, the acceleration is minus nine point eight. The ball stops at the top after two seconds, having risen nineteen point six metres. The fall takes another two seconds, so the total time in the air is four seconds. It returns to the hand with the same speed it left with.',
    }),
    sl('check', 'Quick check: a ball thrown up', {
      b: 'Think about the velocity and the acceleration at the top of the flight.',
      n: 'Quick check. Think carefully about what happens to the velocity and the acceleration at the very top of the flight.',
      chk: 'chk-up',
    }),
    sl('example', 'Worked example: a train gaining speed', {
      b: r`**Problem.** A train moving at $5\ \text{m s}^{-1}$ gains speed uniformly at $0.2\ \text{m s}^{-2}$ for 50 s. Find its final speed and the distance covered.

**Step 1.** $v = u + at = 5 + 0.2 \times 50 = ${ex6.v}\ \text{m s}^{-1}$.

**Step 2.** $s = ut + \tfrac12 at^2 = 5 \times 50 + \tfrac12 \times 0.2 \times 50^2 = 250 + 250 = ${ex6.s}$ m.

**Check with the average velocity.** $\dfrac{5 + 15}{2} \times 50 = 10 \times 50 = 500$ m.`,
      v: table(['Method', 'Working', 'Distance'], [['Second equation', '5 × 50 + ½ × 0.2 × 50²', '500 m'], ['Average velocity', '(5 + 15) ÷ 2 × 50', '500 m'], ['Area under v–t graph', 'trapezium', '500 m']], 'Table showing three ways of finding that the train covers 500 metres'),
      n: 'The train starts at five metres per second and gains point two metres per second every second for fifty seconds. The first equation gives a final speed of fifteen. The second equation gives the distance as two hundred and fifty plus another two hundred and fifty, five hundred metres. A good habit is to check with the average velocity, ten metres per second, times fifty seconds.',
    }),
    sl('diagram', 'Uniform circular motion', {
      b: r`When a body moves in a circle at **constant speed**, the motion is called **uniform circular motion**. The speed is constant, but the **direction of the velocity changes at every point**: it is always along the **tangent** to the circle. Examples: a satellite in orbit, the tip of a fan blade, a stone whirled on a string, a merry-go-round.`,
      v: V.circle,
      n: 'Now we turn to circular motion. When a body moves round a circle at constant speed, the motion is called uniform circular motion. The speed does not change, but the velocity does, because its direction keeps changing. At every point the velocity points along the tangent to the circle, at right angles to the radius. A satellite and the tip of a fan blade are both good examples.',
    }),
    sl('concept', 'Deriving v = 2πr / T', {
      b: r`The **period** $T$ is the time for one complete revolution. In one revolution the body covers the circumference $2\pi r$. Since speed is distance divided by time,
$$v = \dfrac{2\pi r}{T}$$
The speed is in m s⁻¹ if $r$ is in metres and $T$ in seconds. If the body makes $f$ revolutions every second, $T = 1/f$ and $v = 2\pi r f$.`,
      v: flow('LR', [['a', 'One round: distance = 2πr'], ['b', 'Time for one round = T'], ['c', 'v = distance ÷ time'], ['d', 'v = 2πr ÷ T']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow from the circumference and the period to the speed v equals 2 pi r over T'),
      n: 'To find the speed in a circle, use the basic idea that speed is distance divided by time. In one full round the body covers the circumference of the circle, two pi times the radius. The time for one round is called the period. Dividing the circumference by the period gives the speed. A larger circle or a shorter period means a greater speed.',
    }),
    sl('example', 'Worked example: the Moon in orbit', {
      b: r`**Problem.** The Moon goes round the Earth in a nearly circular orbit of radius about $3.84 \times 10^{8}$ m, taking about 27.3 days for one revolution. Find its orbital speed.

**Step 1: period in seconds.** $T = 27.3 \times 24 \times 3600 = 2.36 \times 10^{6}$ s.

**Step 2.** $v = \dfrac{2\pi r}{T} = \dfrac{2 \times 3.14 \times 3.84 \times 10^{8}}{2.36 \times 10^{6}} \approx ${dec(ex7.v, 3)}\ \text{m s}^{-1}$, about 1.0 km s⁻¹.`,
      v: table(['Quantity', 'Value (approximate)'], [['Orbit radius r', r`$3.84 \times 10^{8}$ m`], ['Period T', '27.3 days = 2.36 × 10⁶ s'], ['Circumference 2πr', r`$2.41 \times 10^{9}$ m`], ['Speed v', `${dec(ex7.v, 2)} m/s`]], 'Table of the Moon orbit: radius, period, circumference and the speed of about 1000 metres per second'),
      n: 'Let us find how fast the Moon moves. Its orbit has a radius of about three hundred and eighty-four thousand kilometres and one revolution takes about twenty-seven days. First change the period into seconds. Then divide the circumference of the orbit by the period. The Moon moves at about one thousand metres per second, which is about one kilometre every second.',
    }),
    sl('concept', 'Circular motion is accelerated motion', {
      b: 'Even at constant speed, a body in a circle has **changing velocity**, because the direction changes. Changing velocity means **acceleration**. This acceleration points towards the centre of the circle, so we say that uniform circular motion is **accelerated motion**.',
      v: table(['Example', 'What moves in a circle', 'Why the speed is constant'], [['Merry-go-round', 'child on a horse', 'the ride turns at a steady rate'], ['Satellite', 'the satellite round Earth', 'orbit is almost a perfect circle'], ['Ceiling fan', 'tip of a blade', 'fan runs at a steady speed'], ['Stone on a string', 'the stone', 'whirled at a steady rate']], 'Table of four examples of uniform circular motion'),
      n: 'Here is a point that surprises many students. A body in uniform circular motion has constant speed, yet it is accelerating. Acceleration means a change in velocity, and velocity includes direction. In a circle the direction changes at every moment, so the velocity changes. This acceleration is directed towards the centre of the circle.',
    }),
    sl('check', 'Quick check: circular motion', {
      b: 'Apply v = 2πr/T to a body moving in a circle.',
      n: 'Quick check. Use the formula for speed in a circle, or think about what changes when a body moves in a circle.',
      chk: 'chk-circ',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        r`For uniform acceleration in a straight line: $v = u + at$, $s = ut + \tfrac12 at^2$, $v^2 = u^2 + 2as$.`,
        'Derived from the v–t graph: slope is a, area is s (rectangle plus triangle).',
        'Take the starting direction as positive; retardation gives negative a.',
        r`Free fall: $a = g = 9.8\ \text{m s}^{-2}$ downward; a ball thrown up stops at the top and returns with the same speed.`,
        r`Uniform circular motion: constant speed $v = 2\pi r / T$, but the velocity changes direction, so it is accelerated motion.`,
      ],
      v: table(['Situation', 'u', 'v', 'a'], [['Braking to a stop', 'speed before braking', '0', 'negative']  , ['Ball thrown up (to the top)', 'throw speed', '0', '−9.8 m/s²'], ['Dropped from rest', '0', 'speed at the ground', '+9.8 m/s² (down positive)']], 'Table of the values of u, v and a in three common situations'),
      n: 'To sum up. For uniform acceleration in a straight line we have three equations, derived from the area and the slope of the velocity-time graph. The direction of the starting velocity is taken as positive. Free fall has an acceleration of nine point eight metres per second squared downward. In a circle, the speed is the circumference divided by the period, and the velocity keeps changing direction.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'List u, v, a, t and s with signs before choosing an equation.',
        'Say clearly that the equations are for uniform acceleration in a straight line.',
        'For a derivation, draw the v–t graph, label u, v, t, and shade the areas.',
        'For a ball thrown up, state g = 9.8 m s⁻² and which direction you take as positive.',
        'In circular motion, change the period to seconds and the radius to metres before using v = 2πr/T.',
      ],
      n: 'Some exam tips for this part. Write down the known quantities with their signs before you pick an equation. State that the equations hold for uniform acceleration in a straight line. In a derivation, draw and label the graph and shade the areas. For falling bodies, state the value of g and your positive direction. In circular motion, use metres and seconds.',
    }),
  ],
});
