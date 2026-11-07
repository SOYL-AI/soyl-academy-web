// ICSE 9 Physics ch02 Motion in One Dimension — Part 1 (t01–t03: describing motion and its graphs),
// Part 2 (t04–t05: equations of motion derived graphically, free fall).
import { sl, deck, table, flow, svgV, r } from '../../icse-9-physics-ch01/src/lib.mjs';
import { DT_SHAPES, VT_SHAPES, VT_AREAS, DERIV, PATH_BUS, FALL, THROW } from './svgs.mjs';
import * as K from './calc.mjs';

const fig = {
  bus: svgV(PATH_BUS, 'A school bus path 8 km north then 3 km south, with the distance of 11 km and the displacement of 5 km north'),
  dt: svgV(DT_SHAPES, 'Three distance-time graphs: at rest, uniform speed and variable speed'),
  vt: svgV(VT_SHAPES, 'Three velocity-time graphs: uniform velocity, uniform acceleration and uniform retardation'),
  areas: svgV(VT_AREAS, 'Velocity-time graph of a tram split into a triangle, a rectangle and a triangle'),
  der: svgV(DERIV, 'Velocity-time graph for uniform acceleration with the rectangle and triangle under the line'),
  fall: svgV(FALL, 'A ball dropped from rest at 0, 1, 2 and 3 seconds: 0, 5, 20 and 45 metres fallen'),
  up: svgV(THROW, 'A ball thrown up at 20 metres per second with its height and velocity every second'),
};

export const deck1 = deck({
  part: 1,
  title: 'Motion in One Dimension — Part 1: Describing motion and its graphs',
  goals: [
    'Distinguish scalars from vectors and distance from displacement',
    'Calculate average speed, average velocity and acceleration, and explain retardation',
    'Read distance-time and velocity-time graphs for speed, acceleration and displacement',
  ],
  slides: [
    sl('title', 'Describing motion', {
      b: 'Part 1 — to describe a journey we need to say how far, how fast and whether the speed is changing.',
      v: flow('LR', [['d', 'Distance and displacement'], ['s', 'Speed and velocity'], ['a', 'Acceleration'], ['g', 'Graphs']], [['d', 's'], ['s', 'a'], ['a', 'g']], 'Flow: distance and displacement, speed and velocity, acceleration, graphs'),
      n: 'This part builds the vocabulary of motion along a straight line. We separate distance from displacement, speed from velocity, and then read all of it from graphs.',
    }),
    sl('concept', 'Scalars and vectors', {
      b: 'A **scalar** has magnitude only. A **vector** has magnitude **and direction**. A body is **at rest** if its position does not change with time and **in motion** if it does.',
      v: table(['Scalar', 'Vector'], [['Distance', 'Displacement'], ['Speed', 'Velocity'], ['Mass, time', 'Acceleration, force']], 'Table of scalar quantities and the matching vector quantities'),
      n: 'Distance, speed, mass and time are scalars, because a number and a unit describe them fully. Displacement, velocity, acceleration and force are vectors, because the direction matters as well.',
    }),
    sl('diagram', 'Distance and displacement', {
      b: '**Distance** is the **total length of the path** travelled (a scalar). **Displacement** is the **shortest straight-line distance from the start to the end, in the direction from start to end** (a vector). A school bus goes 8 km north and then 3 km back.',
      v: fig.bus,
      n: 'The bus travels eight kilometres north and then three kilometres back south. The distance is the whole path, eleven kilometres. The displacement is only the gap between start and end, five kilometres, and it points north.',
    }),
    sl('check', 'Quick check: displacement', {
      b: 'A boy walks 40 m north and then 30 m south along the same straight road.',
      v: table(['Leg', 'Length'], [['North', '40 m'], ['South', '30 m']], 'Table giving the two legs of a boy’s walk'),
      chk: 'chk-dd',
      n: 'A boy walks forty metres north and then thirty metres south. What is his displacement?',
    }),
    sl('example', 'Worked example 1: distance and displacement', {
      b: r`**Problem.** For the bus journey find the distance, the displacement and the final position from the depot.

**Step 1.** Distance $= 8 + 3 = ${K.BUS_DIST}$ km.

**Step 2.** Displacement $= 8 - 3 = ${K.BUS_DISP}$ km towards north.

**Step 3.** For a body that returns to its starting point, the displacement is zero although the distance is not.`,
      v: table(['Quantity', 'Value', 'Kind'], [['Distance', '11 km', 'scalar'], ['Displacement', '5 km north', 'vector']], 'Table of the distance and displacement of the bus journey'),
      n: 'Add the lengths to get the distance. Subtract the return leg from the outward leg to get the displacement, and state its direction. If a body comes back to its start, its displacement is zero.',
    }),
    sl('concept', 'Speed, velocity and uniform motion', {
      b: '**Speed** = distance ÷ time (scalar); **velocity** = displacement ÷ time (vector). Motion is **uniform** if equal distances are covered in equal intervals of time, however small, and **variable** otherwise. **Average speed** = total distance ÷ total time.',
      v: table(['Quantity', 'Formula', 'SI unit'], [['Speed', 'distance ÷ time', 'm s⁻¹'], ['Velocity', 'displacement ÷ time', 'm s⁻¹'], ['Average speed', 'total distance ÷ total time', 'm s⁻¹']], 'Table of speed, velocity and average speed with their formulae and units'),
      n: 'Speed is distance divided by time and velocity is displacement divided by time. Both are measured in metres per second. When the speed changes, we use the average speed, which is the total distance divided by the total time.',
    }),
    sl('example', 'Worked example 2: average speed', {
      b: r`**Problem.** A delivery rider covers 900 m in 180 s and then 1500 m in 420 s. Find the average speed for the whole journey.

**Step 1.** Total distance $= 900 + 1500 = ${K.RIDER_DIST}$ m.

**Step 2.** Total time $= 180 + 420 = ${K.RIDER_T}$ s.

**Step 3.** Average speed $= \dfrac{${K.RIDER_DIST}}{${K.RIDER_T}} = ${K.RIDER_V}$ m s⁻¹.`,
      v: table(['Part', 'Distance (m)', 'Time (s)'], [['First', '900', '180'], ['Second', '1500', '420'], ['Whole journey', '2400', '600']], 'Table of the distance and time of the two parts of the rider’s journey'),
      n: 'Do not average the two speeds. Add the distances, add the times, and divide the total distance by the total time. Here twenty four hundred metres in six hundred seconds gives four metres per second.',
    }),
    sl('check', 'Quick check: average speed', {
      b: 'Add the distances and the times first.',
      v: table(['Part', 'Distance', 'Time'], [['First', '120 m', '20 s'], ['Second', '80 m', '30 s']], 'Table of two parts of a run'),
      chk: 'chk-speed',
      n: 'A runner covers one hundred and twenty metres in twenty seconds and then eighty metres in thirty seconds. What is the average speed?',
    }),
    sl('concept', 'Acceleration and retardation', {
      b: '**Acceleration** is the **rate of change of velocity**: a = (v − u) ÷ t, in m s⁻². If the velocity falls, the acceleration is **negative** and is called **retardation** (or deceleration).',
      v: table(['Situation', 'u', 'v', 'a = (v − u) ÷ t'], [['Scooter speeds up in 6 s', '5 m/s', '20 m/s', `${K.SCOOTER_A} m s⁻²`], ['Scooter brakes in 8 s', '20 m/s', '0', `${K.BRAKE_A} m s⁻² (retardation ${-K.BRAKE_A})`]], 'Table of the acceleration and retardation of a scooter'),
      n: 'Acceleration tells us how fast the velocity changes. A positive value means speeding up. A negative value means slowing down, and we call its size the retardation.',
    }),
    sl('example', 'Worked example 3: acceleration', {
      b: r`**Problem.** A train starting from rest reaches 30 m s⁻¹ in 2 minutes. Find its acceleration.

**Step 1.** $u = 0$, $v = 30$ m s⁻¹, $t = 2 \times 60 = 120$ s.

**Step 2.** $a = \dfrac{v - u}{t} = \dfrac{30 - 0}{120} = ${K.TRAIN_A}$ m s⁻².`,
      v: table(['Quantity', 'Value'], [['Initial velocity u', '0'], ['Final velocity v', '30 m s⁻¹'], ['Time t', '120 s'], ['Acceleration a', '0.25 m s⁻²']], 'Table of the data and answer for the train'),
      n: 'Convert the time to seconds first. The velocity changes by thirty metres per second in one hundred and twenty seconds, so the acceleration is one quarter of a metre per second squared.',
    }),
    sl('check', 'Quick check: acceleration', {
      b: 'Use the change in velocity divided by the time.',
      v: table(['u', 'v', 't'], [['10 m/s', '25 m/s', '5 s']], 'Table giving initial and final velocity and the time'),
      chk: 'chk-acc',
      n: 'A car changes its velocity from ten to twenty five metres per second in five seconds. What is its acceleration?',
    }),
    sl('diagram', 'Distance-time graphs', {
      b: 'On a **distance-time graph**: a **horizontal line** means the body is **at rest**; a **straight sloping line** means **uniform speed**, and the **slope = speed**; a **curve** means **variable speed**.',
      v: fig.dt,
      n: 'A flat line on a distance time graph means the distance is not changing, so the body is at rest. A straight sloping line means uniform speed, and the steeper it is, the faster the body. A curve means the speed is changing.',
    }),
    sl('diagram', 'Velocity-time graphs', {
      b: 'On a **velocity-time graph**: a horizontal line is **uniform velocity** (a = 0); a straight line sloping up is **uniform acceleration** and its **slope = acceleration**; a straight line sloping down is **uniform retardation**. The **area under the graph = displacement**.',
      v: fig.vt,
      n: 'A flat line on a velocity time graph is uniform velocity. A line sloping upward is uniform acceleration and the slope gives the acceleration. A line sloping downward is retardation. The area under the graph gives the displacement.',
    }),
    sl('example', 'Worked example 4: reading a velocity-time graph', {
      b: r`**Problem.** The graph shows a tram: it speeds up from rest to 12 m s⁻¹ in 6 s, keeps this velocity for 4 s and stops in 3 s. Find the acceleration in the first 6 s and the total distance.

**Step 1.** $a = \dfrac{12 - 0}{6} = ${K.VT_A1}$ m s⁻².

**Step 2.** $S_1 = \dfrac{1}{2} \times 6 \times 12 = ${K.VT_S1}$ m, $S_2 = 4 \times 12 = ${K.VT_S2}$ m, $S_3 = \dfrac{1}{2} \times 3 \times 12 = ${K.VT_S3}$ m.

**Step 3.** Total distance $= ${K.VT_S1} + ${K.VT_S2} + ${K.VT_S3} = ${K.VT_S}$ m.`,
      v: fig.areas,
      n: 'The slope of the first part gives the acceleration, twelve divided by six. For the distance, split the area under the graph into a triangle, a rectangle and a triangle, find each area, and add them.',
    }),
    sl('check', 'Quick check: reading a graph', {
      b: 'Think about what the slope of a distance-time line means.',
      v: table(['Graph', 'Line'], [['Distance-time', 'straight line sloping upward']], 'Table giving the type of graph and its line'),
      chk: 'chk-graph',
      n: 'On a distance time graph, what does the slope of the line give?',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Distance is a scalar; displacement is a vector and never exceeds the distance.',
        'Average speed = total distance ÷ total time; acceleration = (v − u) ÷ t; negative acceleration is retardation.',
        'Slope of a distance-time graph = speed; slope of a velocity-time graph = acceleration.',
        'Area under a velocity-time graph = displacement.',
      ],
      v: table(['Graph', 'Slope gives', 'Area gives'], [['Distance-time', 'speed', '—'], ['Velocity-time', 'acceleration', 'displacement']], 'Summary table of what the slope and area of each graph give'),
      n: 'To sum up. Distance is a scalar and displacement is a vector. Average speed uses total distance and total time. The slope of a distance time graph is speed. The slope of a velocity time graph is acceleration, and its area is displacement.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'Write the direction with every displacement, velocity and acceleration.',
        'Convert km per hour to m per second and minutes to seconds before substituting.',
        'For an area on a graph, split the shape into triangles and rectangles.',
        'Write the unit of every answer.',
      ],
      v: table(['Slip', 'Fix'], [['Averaging two speeds', 'Use total distance ÷ total time'], ['Calling displacement 11 km in the bus example', 'Displacement is 5 km north'], ['Dropping the sign of retardation', 'Say a is negative, or retardation of 2.5 m s⁻²']], 'Table of three common slips in Part 1 and their fixes'),
      n: 'Exam tips. Always give the direction of a vector. Convert units first. Split the area under a graph into simple shapes. And never average two speeds, always use total distance over total time.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Motion in One Dimension — Part 2: Equations of motion and free fall',
  goals: [
    'Derive v = u + at, S = ut + ½at², S = ½(u + v)t and v² = u² + 2aS from a velocity-time graph',
    'Solve simple numerical problems with the equations of motion',
    'Apply the equations with a = g (g = 10 m s⁻²) to bodies dropped or thrown vertically upward',
  ],
  slides: [
    sl('title', 'Equations for uniform acceleration', {
      b: 'Part 2 — one straight line on a velocity-time graph gives all four equations of motion.',
      v: flow('LR', [['g', 'Velocity-time graph'], ['e', 'Four equations'], ['f', 'Free fall']], [['g', 'e'], ['e', 'f']], 'Flow: velocity-time graph, four equations, free fall'),
      n: 'When the acceleration is uniform, the velocity time graph is a straight line. From that single line we can derive every equation of motion. We then use them for bodies falling freely.',
    }),
    sl('concept', 'Derivation 1: v = u + at', {
      b: r`The body starts with velocity $u$ and has velocity $v$ after time $t$. The slope of the line is the acceleration:

$a = \dfrac{v - u}{t}$, so **$v = u + at$**.`,
      v: fig.der,
      n: 'The slope of the line is the change in velocity divided by the time. That is the acceleration. Rearranging gives the first equation, the final velocity equals the initial velocity plus acceleration times time.',
    }),
    sl('concept', 'Derivation 2: S = ut + ½at²', {
      b: r`The distance $S$ is the area under the line: a rectangle $u \times t$ plus a triangle $\dfrac{1}{2} \times t \times (v - u)$.

Since $v - u = at$: **$S = ut + \dfrac{1}{2}at^2$**.`,
      v: fig.der,
      n: 'The distance is the area under the graph. Split it into a rectangle of height u and a triangle on top. The triangle has height v minus u, which is a times t. Adding the areas gives the second equation.',
    }),
    sl('concept', 'Derivation 3: S = ½(u + v)t and v² = u² + 2aS', {
      b: r`The area is a trapezoid: **$S = \dfrac{1}{2}(u + v)t$**.

Replace $t$ by $\dfrac{v - u}{a}$: $S = \dfrac{(u + v)(v - u)}{2a}$, so **$v^2 = u^2 + 2aS$**.`,
      v: fig.der,
      n: 'The whole area is a trapezoid, so the distance is the average of u and v times t. Put t equal to v minus u over a, multiply out, and the time disappears. That gives the fourth equation, which has no t in it.',
    }),
    sl('concept', 'Which equation to use', {
      b: 'Choose the equation that contains the **three known** quantities and the **one unknown**. Take the direction of motion as positive; retardation has a negative sign.',
      v: table(['Equation', 'Does not contain'], [['v = u + at', 'S'], ['S = ut + ½at²', 'v'], ['S = ½(u + v)t', 'a'], ['v² = u² + 2aS', 't']], 'Table of the four equations of motion and the quantity each one does not contain'),
      n: 'Each equation leaves out one quantity. If the question does not mention time, use the fourth equation. If it does not mention the final velocity, use the second. Pick the equation that matches what you know.',
    }),
    sl('check', 'Quick check: choosing an equation', {
      b: 'Find the equation with no time in it.',
      v: table(['Equation', 'Contains'], [['v = u + at', 'v, u, a, t'], ['v² = u² + 2aS', 'v, u, a, S']], 'Table of two equations of motion and their variables'),
      chk: 'chk-eq',
      n: 'A question gives u, v and a and asks for the distance. Which equation should you use?',
    }),
    sl('example', 'Worked example 1: a car speeds up', {
      b: r`**Problem.** A car moving at 5 m s⁻¹ accelerates uniformly at 2 m s⁻² for 8 s. Find its final velocity and the distance covered.

**Step 1.** $v = u + at = 5 + 2 \times 8 = ${K.CAR1_V}$ m s⁻¹.

**Step 2.** $S = ut + \dfrac{1}{2}at^2 = 5 \times 8 + \dfrac{1}{2} \times 2 \times 64 = 40 + 64 = ${K.CAR1_S}$ m.`,
      v: table(['Quantity', 'Value'], [['u', '5 m s⁻¹'], ['a', '2 m s⁻²'], ['t', '8 s'], ['v', '21 m s⁻¹'], ['S', '104 m']], 'Table of the data and answers for the accelerating car'),
      n: 'List what is given. Use the first equation for the final velocity, which is twenty one metres per second. Use the second equation for the distance, forty plus sixty four, which is one hundred and four metres.',
    }),
    sl('example', 'Worked example 2: stopping distance', {
      b: r`**Problem.** A car at 20 m s⁻¹ brakes with a retardation of 5 m s⁻². Find the time and the distance before it stops.

**Step 1.** $v = 0$, $u = 20$, $a = -5$. $t = \dfrac{v - u}{a} = \dfrac{0 - 20}{-5} = ${K.STOP_T}$ s.

**Step 2.** $v^2 = u^2 + 2aS$ gives $0 = 400 - 10S$, so $S = \dfrac{400}{10} = ${K.STOP_S}$ m.`,
      v: table(['Quantity', 'Value'], [['u', '20 m s⁻¹'], ['v', '0'], ['a', '−5 m s⁻²'], ['t', '4 s'], ['S', '40 m']], 'Table of the data and answers for the braking car'),
      n: 'Retardation is a negative acceleration, so a is minus five. The car stops in four seconds. Since time was not asked for the distance, use the equation without time, which gives forty metres.',
    }),
    sl('check', 'Quick check: braking', {
      b: 'The final velocity is zero when the body stops.',
      v: table(['u', 'v', 'a'], [['10 m/s', '0', '−2.5 m/s²']], 'Table giving the data for a braking car'),
      chk: 'chk-brake',
      n: 'A car moving at ten metres per second brakes with a retardation of two point five metres per second squared. How far does it travel before it stops?',
    }),
    sl('diagram', 'Free fall', {
      b: 'A body that falls only under gravity is in **free fall**. Near the Earth’s surface all bodies fall with the **same acceleration g**. In this chapter **g = 10 m s⁻²** (some books use 9.8). For a body dropped from rest, u = 0 and S = ½gt².',
      v: fig.fall,
      n: 'In free fall the only force is gravity, so every body falls with the same acceleration, about ten metres per second squared. A dropped ball has fallen five metres after one second, twenty after two and forty five after three.',
    }),
    sl('example', 'Worked example 3: a dropped stone', {
      b: r`**Problem.** A stone is dropped from a bridge 45 m above a river. Find the time to reach the water and its speed on arrival. (g = 10 m s⁻²)

**Step 1.** $u = 0$, $a = g = 10$. $S = \dfrac{1}{2}gt^2$ gives $45 = 5t^2$, so $t^2 = 9$ and $t = ${K.DROP45_T}$ s.

**Step 2.** $v = u + gt = 0 + 10 \times 3 = ${K.DROP45_V}$ m s⁻¹.`,
      v: table(['Quantity', 'Value'], [['u', '0'], ['g', '10 m s⁻²'], ['S', '45 m'], ['t', '3 s'], ['v', '30 m s⁻¹']], 'Table of the data and answers for the dropped stone'),
      n: 'A dropped body starts from rest. Put the height into the second equation to get the time, three seconds. Then the first equation gives the speed, thirty metres per second.',
    }),
    sl('diagram', 'A body thrown vertically upward', {
      b: 'Going up, the velocity **falls** by 10 m s⁻¹ every second (a = −g). At the **highest point v = 0** but the acceleration is still g **downward**. The body returns to the starting level with the **same speed** it was thrown with, after twice the time taken to rise.',
      v: fig.up,
      n: 'A ball thrown upward at twenty metres per second loses ten metres per second every second. At the top its velocity is zero but gravity still acts. It then speeds up downward and returns with the same speed after four seconds in all.',
    }),
    sl('example', 'Worked example 4: a ball thrown upward', {
      b: r`**Problem.** A ball is thrown vertically upward at 20 m s⁻¹. Find the time to the highest point, the maximum height and the total time of flight. (g = 10 m s⁻²)

**Step 1.** At the top $v = 0$: $0 = 20 - 10t$, so $t = ${K.T20_UP}$ s.

**Step 2.** $0 = 20^2 - 2 \times 10 \times S$, so $S = \dfrac{400}{20} = ${K.T20_H}$ m.

**Step 3.** Time of flight $= 2 \times 2 = ${K.T20_FLIGHT}$ s.`,
      v: table(['Quantity', 'Value'], [['u', '20 m s⁻¹ upward'], ['a', '−10 m s⁻²'], ['Time up', '2 s'], ['Maximum height', '20 m'], ['Total time', '4 s']], 'Table of the data and answers for the ball thrown upward'),
      n: 'Take upward as positive, so a is minus ten. At the top the velocity is zero, which gives two seconds. The fourth equation gives the height, twenty metres. The return takes as long as the rise, so the flight lasts four seconds.',
    }),
    sl('check', 'Quick check: dropped body', {
      b: 'Start from rest and use S = ½gt².',
      v: table(['u', 't', 'g'], [['0', '4 s', '10 m/s²']], 'Table giving the data for a falling stone'),
      chk: 'chk-fall',
      n: 'A stone dropped from the top of a tower reaches the ground in four seconds. How high is the tower?',
    }),
    sl('check', 'Quick check: thrown upward', {
      b: 'At the highest point the velocity is zero.',
      v: table(['u', 'v at the top', 'a'], [['15 m/s', '0', '−10 m/s²']], 'Table giving the data for a ball thrown upward'),
      chk: 'chk-up',
      n: 'A ball is thrown vertically upward at fifteen metres per second. How long does it take to reach the highest point?',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'v = u + at; S = ut + ½at²; S = ½(u + v)t; v² = u² + 2aS, derived from the velocity-time graph.',
        'Retardation is a negative acceleration; v = 0 when a body stops.',
        'Free fall: a = g = 10 m s⁻² (downward); a dropped body has u = 0.',
        'Thrown upward: v = 0 at the top; the time up equals the time down.',
      ],
      v: table(['Case', 'Key facts'], [['Dropped from rest', 'u = 0, S = 5t², v = 10t'], ['Thrown up at u', 'time up = u ÷ 10, height = u² ÷ 20']], 'Summary table for a dropped body and a body thrown upward'),
      n: 'To sum up. The four equations come from one velocity time graph. Pick the equation that leaves out the quantity you do not know. In free fall the acceleration is ten metres per second squared downward, and at the top of a throw the velocity is zero.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'Write the known quantities with signs before choosing an equation.',
        'State g = 10 m s⁻² (or 9.8 if the question says so).',
        'For a derivation, draw the velocity-time graph and label u, v, t and the areas.',
        'Show the formula, the substitution and the unit.',
      ],
      v: table(['Slip', 'Fix'], [['Using g = +10 for a ball going up', 'Take a = −10 when upward is positive'], ['Forgetting the stopping condition', 'v = 0 when the body stops or reaches the top'], ['Using v = u + at with a changing a', 'The equations need constant acceleration']], 'Table of three common slips in Part 2 and their fixes'),
      n: 'Exam tips. Write down what is given, with signs. State the value of g you use. For a derivation, draw the graph and label the areas. Show formula, substitution and unit in every numerical.',
    }),
  ],
});
