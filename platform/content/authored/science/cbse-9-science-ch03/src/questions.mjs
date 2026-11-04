// ch03 Motion — question bank. MCQ keys are placed by the builder (balanced); AR keys planned: a b c d a c.
// Every numerical is computed here, interpolated into stem and solution, and re-solved by the check passed to add().
import { mk, add, r, near, dec } from './lib.mjs';

const { mcq, ar, tf, fill, match, num, short, long, part } = mk;
const g = 9.8;
const p3 = (x) => Number(x.toPrecision(3));
const p2 = (x) => Number(x.toPrecision(2));

// ---------------------------------------------------------------- t01 distance, displacement, speed, velocity, acceleration
add('chk-disp', mcq({
  stem: 'A cyclist rides once round a circular park of circumference 400 m and stops at the gate where she began. Which of these quantities is zero?',
  right: 'Her displacement',
  wrong: ['The distance she covered', 'Her average speed', 'The time she took'],
  sol: 'She ends where she started, so the straight-line change of position, the displacement, is zero — option (@K). The distance is 400 m, so her average speed is not zero, and the ride took some time.',
  d: 1, c: 'understanding', t: [1],
}));
add('unit-speedo', mcq({
  stem: 'The speedometer of a motorbike on a highway near Nagpur reads 36 km/h. In SI units this speed is:',
  right: r`$10\ \text{m s}^{-1}$`,
  wrong: [r`$36\ \text{m s}^{-1}$`, r`$130\ \text{m s}^{-1}$`, r`$0.6\ \text{m s}^{-1}$`],
  sol: r`$36\ \text{km/h} = 36 \times \dfrac{1000}{3600} = 10\ \text{m s}^{-1}$ — option (@K). Option (@2) multiplies by 3.6 instead of dividing, and (@3) divides by 60.`,
  d: 1, c: 'application', t: [1],
}), () => near(36 / 3.6, 10, 1e-9) && near(36 * 3.6, 129.6, 1e-9) || 'speedo');
add('semi-mcq', mcq({
  stem: r`A boy walks along a semicircular track of diameter 140 m from one end A to the other end B. Take $\pi = 22/7$. The distance he covers and the magnitude of his displacement are:`,
  right: '220 m and 140 m',
  wrong: ['140 m and 220 m', '440 m and 140 m', '220 m and 0 m'],
  sol: r`The path is half a circle of radius 70 m: distance $= \pi r = \dfrac{22}{7} \times 70 = 220$ m. The displacement is the straight line AB, equal to the diameter, 140 m — option (@K).`,
  d: 2, c: 'application', t: [1],
}), () => near((22 / 7) * 70, 220, 1e-9) || 'semi');
add('vector-mcq', mcq({
  stem: 'Which one of these quantities needs a direction, as well as a size, to be described completely?',
  right: 'Velocity',
  wrong: ['Speed', 'Distance', 'Time taken'],
  sol: 'Velocity is displacement per unit time and is a vector, so a direction is needed — option (@K). Speed, distance and time are scalars.',
  d: 1, c: 'recall', t: [1],
}));
add('brake-dir-mcq', mcq({
  stem: 'A cyclist moving towards the east on a straight lane applies the brakes steadily and comes to a stop. The direction of her acceleration is:',
  right: 'towards the west',
  wrong: ['towards the east', 'towards the north', 'there is no direction because it is zero'],
  sol: 'Her velocity decreases while she moves east, so the change of velocity points west and the acceleration is opposite to the motion, a retardation — option (@K). It is not zero because the velocity is changing.',
  d: 2, c: 'application', t: [1],
}));
add('avg-dist-mcq', mcq({
  stem: r`The velocity of a body changes uniformly from $4\ \text{m s}^{-1}$ to $16\ \text{m s}^{-1}$ in 3 s along a straight line. The distance it covers in these 3 s is:`,
  right: '30 m',
  wrong: ['12 m', '48 m', '60 m'],
  sol: r`For uniform acceleration the average velocity is $(4 + 16)/2 = 10\ \text{m s}^{-1}$, so the distance is $10 \times 3 = 30$ m — option (@K). (@1) uses only the starting velocity and (@2) only the final velocity.`,
  d: 2, c: 'application', t: [1, 3],
}), () => near(((4 + 16) / 2) * 3, 30, 1e-9) || 'avgdist');
add('avg-speed-tf', tf({
  stem: 'A body that moves with a constant speed cannot have a changing velocity.',
  key: 'f',
  sol: 'False. Velocity includes direction. A body moving in a circle at constant speed has a velocity that changes direction all the time.',
  d: 2, c: 'understanding', t: [1, 4],
}));
add('accel-fill', fill({
  stem: 'The SI unit of acceleration is ___.',
  acc: [['metre per second squared', 'm s⁻²', 'm/s²', 'm s^-2', 'm per second squared']],
  sol: 'Acceleration is change of velocity (m s⁻¹) per unit time (s), so its unit is **metre per second squared** (m s⁻²).',
  d: 1, c: 'recall', t: [1],
}));
add('rest-ar', ar({
  a: 'A runner who completes exactly one lap of a 400 m track has an average velocity of zero.',
  r: 'Average velocity is the displacement divided by the time taken, and the displacement for a full lap is zero.',
  key: 'a',
  sol: 'Back at the starting point, the displacement is zero, so average velocity $=$ displacement ÷ time is zero although the distance is 400 m. R is the reason for A — option (a).',
  d: 2, c: 'understanding', t: [1],
}));
add('circ-ar', ar({
  a: 'A satellite orbiting the Earth at constant speed has no acceleration.',
  r: 'The direction of the satellite’s velocity changes continuously as it moves along the orbit.',
  key: 'd',
  sol: 'A is false: the changing direction of the velocity means the velocity changes, so the satellite is accelerating. R is true and is exactly why A is false — option (d).',
  d: 2, c: 'analysis', t: [1, 4],
}));

add('bus-num', (() => {
  const d1 = 60, t1 = 1.5, d2 = 40, t2 = 0.5;
  const kmh = (d1 + d2) / (t1 + t2);
  const ms = kmh / 3.6;
  const ans = p3(ms);
  return num({
    stem: r`A bus travels 60 km in the first 1.5 h of a trip and then 40 km in the next 0.5 h on the same road. Find its average speed for the whole trip, in m s⁻¹ (3 significant figures).`,
    value: ans, tol: 0.05, unit: 'm s⁻¹',
    sol: r`Total distance $= ${d1} + ${d2} = ${d1 + d2}$ km; total time $= ${t1} + ${t2} = ${t1 + t2}$ h. Average speed $= ${d1 + d2} / ${t1 + t2} = ${kmh}$ km/h $= ${kmh} / 3.6 = ${dec(ms, 3)}\ \text{m s}^{-1}$.`,
    scheme: [['Total distance over total time = 50 km/h', 1], ['Converted to m/s: 13.9', 1]],
    marks: 2, d: 2, c: 'application', t: [1],
  });
})(), (q) => near((100 / 2) / 3.6, 13.89, 0.001) && q.answer.value === 13.9 || 'bus');
add('jogger-num', (() => {
  const a = 80, b = 60, t = 50;
  const dist = a + b;
  const disp = Math.hypot(a, b);
  const v = disp / t;
  return num({
    stem: r`A jogger starts at corner A of a rectangular park 80 m long and 60 m wide and runs along the two sides to the opposite corner C in ${t} s. Find the magnitude of her average velocity, in m s⁻¹.`,
    value: p2(v), tol: 0.05, unit: 'm s⁻¹',
    sol: r`Displacement = the diagonal $AC = \sqrt{${a}^2 + ${b}^2} = ${disp}$ m (the path length is ${dist} m). Average velocity $= ${disp} / ${t} = ${dec(v, 2)}\ \text{m s}^{-1}$.`,
    scheme: [['Displacement 100 m from the diagonal', 1], ['Divides by 50 s: 2.0 m s⁻¹', 1]],
    marks: 2, d: 2, c: 'application', t: [1],
  });
})(), (q) => near(Math.hypot(80, 60) / 50, 2.0, 1e-9) && q.answer.value === 2 || 'jogger');
add('train-acc-num', (() => {
  const v = 72 / 3.6, t = 40;
  const a = v / t;
  return num({
    stem: r`An electric train leaving Surat station speeds up from rest to 72 km/h in ${t} s along a straight track. Find its average acceleration, in m s⁻².`,
    value: p2(a), tol: 0.005, unit: 'm s⁻²',
    sol: r`$v = 72/3.6 = ${v}\ \text{m s}^{-1}$, $u = 0$. $a = (v - u)/t = ${v} / ${t} = ${dec(a, 2)}\ \text{m s}^{-2}$.`,
    scheme: [['Converts 72 km/h to 20 m/s', 1], ['Uses a = (v − u)/t = 0.50 m s⁻²', 1]],
    marks: 2, d: 2, c: 'application', t: [1],
  });
})(), (q) => near(20 / 40, 0.5, 1e-9) && q.answer.value === 0.5 || 'train acc');
add('stop-short', short({
  marks: 2,
  stem: 'A taxi completes one full round of a circular roundabout of circumference 200 m in 20 s. Find its average speed and its average velocity for this round trip, and say why they are different.',
  model: r`The average speed is distance ÷ time $= 200/20 = 10\ \text{m s}^{-1}$. After a full round the taxi is back at its starting point, so the displacement is zero and the average velocity is zero. They differ because speed uses the path length, whereas velocity uses the displacement.`,
  sol: 'Distance 200 m gives 10 m/s; displacement zero gives zero average velocity.',
  scheme: [['Average speed 10 m s⁻¹ and average velocity 0', 1], ['Reason: distance versus displacement', 1]],
  d: 2, c: 'application', t: [1],
}), () => near(200 / 20, 10, 1e-9) || 'taxi');
add('retard-short', short({
  marks: 2,
  stem: 'The velocity of a car falls uniformly from 20 m s⁻¹ to 10 m s⁻¹ in 5.0 s. Calculate its acceleration and say what the sign of your answer shows.',
  model: r`$a = (v - u)/t = (10 - 20)/5.0 = -2.0\ \text{m s}^{-2}$. The negative sign shows that the acceleration is opposite to the direction of motion, so the car is slowing down: it has a retardation of $2.0\ \text{m s}^{-2}$.`,
  sol: 'Substitute in a = (v − u)/t; negative means retardation.',
  scheme: [['a = −2.0 m s⁻²', 1], ['Negative sign means slowing down', 1]],
  d: 2, c: 'application', t: [1],
}), () => near((10 - 20) / 5, -2, 1e-9) || 'retard');
add('const-speed-short', short({
  marks: 2,
  stem: 'A cyclist rounds a bend in the road at a steady speed of 5 m s⁻¹. Is she accelerating? Give a reason.',
  model: 'Yes. Although her speed is steady, the direction of her motion changes as she goes round the bend. Velocity has both size and direction, so her velocity changes, and a changing velocity means she has an acceleration.',
  sol: 'Acceleration is change of velocity, and velocity includes direction.',
  scheme: [['Yes, she is accelerating', 0.5], ['The direction of velocity changes', 1], ['A change in velocity means acceleration', 0.5]],
  d: 2, c: 'understanding', t: [1],
}));
add('odometer-short', short({
  marks: 3,
  stem: 'A car’s odometer reads 12 560 km at the start and 12 640 km at the end of a 2.0 h trip between two cities. The straight-line distance between the cities is 60 km. Find the average speed and the magnitude of the average velocity in km/h, and explain why they differ.',
  model: r`The distance is $12\,640 - 12\,560 = 80$ km, so the average speed is $80/2.0 = 40$ km/h. The displacement is the straight-line distance of 60 km, so the magnitude of the average velocity is $60/2.0 = 30$ km/h. The values differ because the road is not straight: the path length is greater than the size of the displacement, so speed is greater than the size of the velocity.`,
  sol: 'Distance 80 km gives 40 km/h; displacement 60 km gives 30 km/h; the path is longer than the straight line.',
  scheme: [['Average speed 40 km/h', 1], ['Average velocity 30 km/h', 1], ['Reason: path length is greater than displacement', 1]],
  d: 3, c: 'application', t: [1],
}), () => near((12640 - 12560) / 2, 40, 1e-9) && near(60 / 2, 30, 1e-9) || 'odometer');
add('walk-long', long({
  stem: '(a) Define distance and displacement, stating which is a scalar and which a vector.\n\n(b) A tourist walks 300 m east along a lane and then 400 m north to a temple in 10 minutes. Find the distance, the displacement and the average speed in m s⁻¹.\n\n(c) State one situation in which the distance and the magnitude of the displacement are equal.',
  model: r`Distance is the length of the path travelled, a scalar. Displacement is the shortest straight-line change of position from start to end with direction, a vector. In (b) the distance is $300 + 400 = 700$ m. The displacement is $\sqrt{300^2 + 400^2} = 500$ m, about $53^\circ$ north of east. The time is $10 \times 60 = 600$ s, so the average speed is $700/600 = 1.17\ \text{m s}^{-1}$. In (c), distance equals the magnitude of displacement for motion along a straight line in one direction, such as a car moving straight along an empty road.`,
  sol: 'Definitions; 700 m, 500 m, 1.17 m/s; straight-line motion in one direction.',
  scheme: [['(a) Both definitions with scalar and vector', 1.5], ['(b) Distance, displacement and average speed', 2.5], ['(c) Straight line, one direction', 1]],
  d: 3, c: 'application', t: [1],
}), () => near(Math.hypot(300, 400), 500, 1e-9) && near(700 / 600, 1.1667, 0.001) || 'walk');
add('rest-case', mk.case({
  passage: r`Meera records the position of a cyclist moving on a straight canal road from a marker post. Positions are measured eastward from the post.

| Time t (s) | 0 | 10 | 20 | 30 | 40 |
|---|---|---|---|---|---|
| Position x (m) | 0 | 50 | 50 | 50 | 10 |

The graph of position against time is made of straight-line pieces joining these points.`,
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'During which interval is the cyclist at rest?',
      right: '10 s to 30 s',
      wrong: ['0 s to 10 s', '30 s to 40 s', 'The cyclist is never at rest'],
      sol: 'Between 10 s and 30 s the position stays at 50 m, so the graph is flat and the velocity is zero — option (@K).',
      d: 1, c: 'understanding', t: [2],
    })),
    part('b', short({
      marks: 1,
      stem: 'Find the velocity of the cyclist during the first 10 s.',
      model: 'The velocity is 5.0 m s⁻¹ towards the east.',
      sol: r`$v = (50 - 0)/(10 - 0) = 5.0\ \text{m s}^{-1}$ eastward.`,
      scheme: [['5.0 m s⁻¹ eastward', 1]],
      d: 2, c: 'application', t: [2],
    }), []),
    part('c', short({
      marks: 2, wl: null,
      stem: 'Find the average velocity of the cyclist over the whole 40 s.',
      model: r`The displacement is $10 - 0 = 10$ m eastward, so the average velocity $= 10/40 = 0.25\ \text{m s}^{-1}$ eastward.`,
      sol: 'Displacement divided by total time.',
      scheme: [['Displacement 10 m', 1], ['0.25 m s⁻¹ eastward', 1]],
      d: 3, c: 'application', t: [2],
    }), [
      short({
        marks: 2, wl: null,
        stem: 'Find the distance covered by the cyclist in the 40 s and her average speed.',
        model: r`She goes 50 m east, rests, then comes back 40 m, so the distance is $50 + 40 = 90$ m and the average speed is $90/40 = 2.25\ \text{m s}^{-1}$.`,
        sol: 'Add the lengths of the pieces of the path; divide by 40 s.',
        scheme: [['Distance 90 m', 1], ['Average speed 2.25 m s⁻¹', 1]],
        d: 3, c: 'application', t: [2],
      }),
    ]),
  ],
}), null);

// ---------------------------------------------------------------- t02 graphs
add('chk-xt', mcq({
  stem: 'The position–time graph of a toy car is a straight line that slopes upward. The car is moving with:',
  right: 'uniform velocity',
  wrong: ['zero velocity', 'increasing velocity', 'uniform acceleration'],
  sol: 'A straight line has the same slope everywhere, so the velocity is constant, that is uniform velocity — option (@K). A flat line would mean zero velocity and a steepening curve increasing velocity.',
  d: 1, c: 'understanding', t: [2],
}));
add('chk-vt', mcq({
  stem: r`The velocity–time graph of a trolley is a horizontal line at $6\ \text{m s}^{-1}$ from $t = 0$ to $t = 8$ s. The displacement of the trolley in this time is:`,
  right: '48 m',
  wrong: ['6 m', '14 m', '1.3 m'],
  sol: r`The area of the rectangle under the line is $6 \times 8 = 48$ m — option (@K). (@3) wrongly divides 8 by 6.`,
  d: 1, c: 'application', t: [2],
}), () => 6 * 8 === 48 || 'area');
add('steeper-mcq', mcq({
  stem: 'On the same position–time axes, the line for car A is steeper than the line for car B, and both slope upward. This shows that:',
  right: 'car A has a greater velocity than car B',
  wrong: ['car B has a greater velocity than car A', 'car A and car B have the same velocity', 'car A has acceleration but car B has none'],
  sol: 'The slope of a position–time graph is the velocity, so the steeper line means a greater velocity — option (@K). Two straight lines both mean uniform velocity, so neither car is accelerating.',
  d: 2, c: 'analysis', t: [2],
}));
add('down-line-mcq', mcq({
  stem: 'The velocity–time graph of a train is a straight line that slopes downward but stays above the time axis. During this time the train is:',
  right: 'moving forward and slowing down',
  wrong: ['moving backward and speeding up', 'moving forward and speeding up', 'at rest'],
  sol: 'The line is above the axis, so the velocity is positive (forward). The line slopes down, so the velocity decreases: a uniform retardation — option (@K).',
  d: 3, c: 'analysis', t: [2],
}));
add('xt-neg-tf', tf({
  stem: 'The slope of a position–time graph gives the acceleration of the body.',
  key: 'f',
  sol: 'False. The slope of a position–time graph is the velocity. The slope of a velocity–time graph is the acceleration.',
  d: 1, c: 'recall', t: [2],
}));
add('area-fill', fill({
  stem: 'The area between a velocity–time graph and the time axis gives the ___ of the body.',
  acc: [['displacement', 'distance travelled', 'distance']],
  sol: 'The area under a velocity–time graph is the **displacement** (it is the distance when the body does not turn back).',
  d: 1, c: 'recall', t: [2],
}));
add('slope-ar', ar({
  a: 'The slope of a straight line on a velocity–time graph gives the acceleration.',
  r: 'Acceleration is the change in velocity divided by the time taken.',
  key: 'a',
  sol: 'The slope is rise ÷ run $= \\Delta v / \\Delta t$, which is the definition of acceleration, so R explains A — option (a).',
  d: 1, c: 'understanding', t: [2],
}));
add('graph-match', match({
  stem: 'Match each line on a velocity–time graph (Column A) with the motion it shows (Column B).',
  pairs: [
    ['A horizontal line above the time axis', 'Uniform velocity'],
    ['A straight line rising upward', 'Uniform acceleration'],
    ['A straight line falling towards the time axis', 'Uniform retardation'],
    ['A line lying along the time axis', 'Body at rest'],
  ],
  order: [0, 1, 2, 3],
  sol: 'A horizontal line means constant velocity, a rising line means growing velocity, a falling line means slowing down, and a line on the axis means zero velocity.',
  d: 1, c: 'understanding', t: [2],
}));
add('xt-num', (() => {
  const t1 = 3, x1 = 18, t2 = 11, x2 = 66;
  const v = (x2 - x1) / (t2 - t1);
  return num({
    stem: r`The position–time graph of a tractor is a straight line passing through the points (${t1} s, ${x1} m) and (${t2} s, ${x2} m). Find the velocity of the tractor, in m s⁻¹.`,
    value: p2(v), tol: 0.05, unit: 'm s⁻¹',
    sol: r`Velocity = slope $= \dfrac{x_2 - x_1}{t_2 - t_1} = \dfrac{${x2} - ${x1}}{${t2} - ${t1}} = \dfrac{${x2 - x1}}{${t2 - t1}} = ${dec(v, 2)}\ \text{m s}^{-1}$.`,
    scheme: [['Reads the two points and finds Δx = 48 m and Δt = 8 s', 1], ['Slope = 6.0 m s⁻¹', 1]],
    marks: 2, d: 1, c: 'application', t: [2],
  });
})(), (q) => near((66 - 18) / (11 - 3), 6, 1e-9) && q.answer.value === 6 || 'xt');
add('tractor-num', (() => {
  const v = 4.0, ta = 5, tb = 20, tc = 5;
  const s = 0.5 * v * ta + v * tb + 0.5 * v * tc;
  return num({
    stem: r`The velocity–time graph of a tractor in a field in Punjab is a trapezium. Its velocity rises uniformly from 0 to ${v.toFixed(1)} m s⁻¹ in ${ta} s, stays constant for ${tb} s and then falls uniformly to zero in ${tc} s. Find the total distance it covers, in m.`,
    value: s, tol: 0.5, unit: 'm',
    sol: r`Distance = total area under the graph. First triangle $= \tfrac12 \times ${v} \times ${ta} = ${0.5 * v * ta}$ m; rectangle $= ${v} \times ${tb} = ${v * tb}$ m; last triangle $= \tfrac12 \times ${v} \times ${tc} = ${0.5 * v * tc}$ m. Total $= ${0.5 * v * ta} + ${v * tb} + ${0.5 * v * tc} = ${s}$ m.`,
    scheme: [['Splits the graph into two triangles and a rectangle', 1], ['Areas 10 m, 80 m and 10 m', 0.5], ['Total 100 m', 0.5]],
    marks: 2, d: 2, c: 'application', t: [2],
  });
})(), (q) => near(0.5 * 4 * 5 + 4 * 20 + 0.5 * 4 * 5, 100, 1e-9) && q.answer.value === 100 || 'tractor');
add('vt-short', short({
  marks: 2,
  stem: 'A bullock cart moves at a steady 3 m s⁻¹ for 20 s along a straight road. Draw in words the shape of its velocity–time graph, and use the graph to find the distance covered.',
  model: r`The graph is a horizontal straight line at $3\ \text{m s}^{-1}$ from $t = 0$ to $t = 20$ s. The area of the rectangle under it is the displacement: $3 \times 20 = 60$ m. The slope is zero, which shows there is no acceleration.`,
  sol: 'Horizontal line; area of rectangle 3 × 20 = 60 m.',
  scheme: [['Horizontal line at 3 m s⁻¹', 1], ['Area 60 m', 1]],
  d: 1, c: 'application', t: [2],
}), () => 3 * 20 === 60 || 'cart');
add('xt-short', short({
  marks: 2,
  stem: 'The position–time graph of a bus is a straight line sloping downward. What does this tell you about the motion of the bus? Is the bus accelerating?',
  model: 'A straight line means the velocity is constant, so the bus has uniform velocity and is not accelerating. A downward slope means the position is decreasing with time, so the bus is moving in the negative direction, back towards the reference point.',
  sol: 'Straight line: uniform velocity; negative slope: moving in the negative direction.',
  scheme: [['Uniform velocity, no acceleration', 1], ['Negative slope: moving in the negative direction', 1]],
  d: 2, c: 'analysis', t: [2],
}));
add('compare-long', long({
  stem: 'The velocity–time graph of a cyclist is a trapezium: the velocity rises uniformly from 0 to 8.0 m s⁻¹ in 4.0 s, stays constant for 10 s and then falls uniformly to zero in 6.0 s.\n\n(a) Find the acceleration in the first 4.0 s and the retardation in the last 6.0 s.\n\n(b) Find the total distance covered and the average speed.',
  model: r`The acceleration is the slope of the velocity–time graph. In the first part, $a = (8.0 - 0)/4.0 = 2.0\ \text{m s}^{-2}$. In the last part, $a = (0 - 8.0)/6.0 = -1.33\ \text{m s}^{-2}$, so the retardation is $1.33\ \text{m s}^{-2}$. The distance covered is the area under the graph, which is a trapezium, found by splitting it into parts: first triangle $\tfrac12 \times 8.0 \times 4.0 = 16$ m, rectangle $8.0 \times 10 = 80$ m and last triangle $\tfrac12 \times 8.0 \times 6.0 = 24$ m. The total is $120$ m. The total time is $4.0 + 10 + 6.0 = 20$ s, so the average speed is $120/20 = 6.0\ \text{m s}^{-1}$.`,
  sol: 'Slopes 2.0 and −1.33 m/s²; areas 16 + 80 + 24 = 120 m; 120 ÷ 20 = 6.0 m/s.',
  scheme: [['Acceleration 2.0 m s⁻² from the slope', 1], ['Retardation 1.33 m s⁻²', 1], ['Areas 16, 80 and 24 m, total 120 m', 2], ['Average speed 6.0 m s⁻¹', 1]],
  d: 3, c: 'application', t: [2],
}), () => near(8 / 4, 2, 1e-9) && near(8 / 6, 1.333, 0.001) && near(0.5 * 8 * 4 + 8 * 10 + 0.5 * 8 * 6, 120, 1e-9) && near(120 / 20, 6, 1e-9) || 'cyclist');
add('xt-vt-short', short({
  marks: 3,
  stem: 'Explain how you would find (a) the velocity from a position–time graph and (b) the acceleration and the displacement from a velocity–time graph. Use one example of each.',
  model: r`(a) Pick two points on the straight line, then divide the change in position by the change in time. For (0 s, 10 m) and (5 s, 35 m) the velocity is $25/5 = 5\ \text{m s}^{-1}$. (b) The slope of the velocity–time line is the acceleration: from $2\ \text{m s}^{-1}$ to $8\ \text{m s}^{-1}$ in 3 s gives $2\ \text{m s}^{-2}$. The area under the line is the displacement: $\tfrac12 (2 + 8) \times 3 = 15$ m.`,
  sol: 'Slope of x–t is velocity; slope of v–t is acceleration; area under v–t is displacement.',
  scheme: [['Velocity from the slope of the x–t graph, with an example', 1], ['Acceleration from the slope of the v–t graph, with an example', 1], ['Displacement from the area, with an example', 1]],
  d: 3, c: 'application', t: [2],
}), () => near(25 / 5, 5, 1e-9) && near(0.5 * (2 + 8) * 3, 15, 1e-9) && near((8 - 2) / 3, 2, 1e-9) || 'xtvt');

// ---------------------------------------------------------------- t03 equations of motion
add('chk-eq', mcq({
  stem: 'A cyclist’s initial speed u, final speed v and acceleration a are known, and the distance s covered is wanted. Time is not given. The equation to use is:',
  right: r`$v^2 = u^2 + 2as$`,
  wrong: [r`$v = u + at$`, r`$s = ut + \tfrac12 at^2$`, r`$a = \dfrac{v - u}{t}$`],
  sol: r`The equations in (@1), (@2) and (@3) all contain the unknown time $t$. Only $v^2 = u^2 + 2as$ links $u$, $v$, $a$ and $s$ without $t$ — option (@K).`,
  d: 2, c: 'application', t: [3],
}));
add('chk-up', mcq({
  stem: 'At the highest point of its flight a ball thrown straight up has:',
  right: r`zero velocity and an acceleration of $9.8\ \text{m s}^{-2}$ downward`,
  wrong: ['zero velocity and zero acceleration', r`an acceleration of $9.8\ \text{m s}^{-2}$ upward and zero velocity`, r`a velocity of $9.8\ \text{m s}^{-1}$ and no acceleration`],
  sol: 'At the top the ball turns round, so its velocity is momentarily zero. Gravity still acts, so the acceleration is 9.8 m s⁻² downward — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('derive-eq-mcq', mcq({
  stem: 'Which equation of motion is obtained by finding the area under the velocity–time graph of a body in uniform acceleration?',
  right: r`$s = ut + \tfrac12 at^2$`,
  wrong: [r`$v = u + at$`, r`$v^2 = u^2 + 2as$`, r`$v = \dfrac{2\pi r}{T}$`],
  sol: r`The area is a rectangle $ut$ plus a triangle $\tfrac12 at^2$, giving $s = ut + \tfrac12 at^2$ — option (@K). The first equation comes from the slope.`,
  d: 1, c: 'recall', t: [3],
}));
add('mass-mcq', mcq({
  stem: 'Two iron balls, one of mass 1 kg and one of mass 5 kg, are dropped together from a roof. Ignoring air resistance, the ratio of their accelerations as they fall is:',
  right: '1 : 1',
  wrong: ['1 : 5', '5 : 1', '1 : 25'],
  sol: r`In free fall every body has the same acceleration $g = 9.8\ \text{m s}^{-2}$, whatever its mass, so the ratio is 1 : 1 — option (@K).`,
  d: 2, c: 'understanding', t: [3],
}));
add('flight-mcq', mcq({
  stem: r`A ball is thrown straight up at $4.9\ \text{m s}^{-1}$ and caught at the level of release. Taking $g = 9.8\ \text{m s}^{-2}$, the time for which it is in the air is:`,
  right: '1.0 s',
  wrong: ['0.5 s', '2.0 s', '0.25 s'],
  sol: r`Time to the top $= u/g = 4.9/9.8 = 0.5$ s. The fall takes the same time, so the total is $2 \times 0.5 = 1.0$ s — option (@K). (@1) is only the upward part.`,
  d: 3, c: 'application', t: [3],
}), () => near(2 * 4.9 / g, 1.0, 1e-9) || 'flight');
add('triple-mcq', mcq({
  stem: 'A truck is braked with the same retardation, first from a speed v and then from a speed 3v. Neglecting the driver’s reaction time, the braking distance for the second case is:',
  right: 'nine times that for the first case',
  wrong: ['three times that for the first case', 'six times that for the first case', 'one third of that for the first case'],
  sol: r`With $v_\text{final} = 0$, $s = u^2/(2a)$. Tripling $u$ multiplies $s$ by $3^2 = 9$ — option (@K).`,
  d: 4, c: 'analysis', t: [3],
}));
add('eq-tf', tf({
  stem: 'The three equations of motion can be used for a ball thrown straight up if the acceleration is taken as −9.8 m s⁻² and upward is positive.',
  key: 't',
  sol: 'True. Gravity gives a uniform acceleration of 9.8 m s⁻² downward, which is −9.8 m s⁻² when up is positive, so the equations hold all the way up and down.',
  d: 2, c: 'understanding', t: [3],
}));
add('uniform-ar', ar({
  a: 'The equation v = u + at holds for a body moving along a straight line with uniform acceleration.',
  r: 'The SI unit of acceleration is metre per second squared.',
  key: 'b',
  sol: 'A is true: the equation comes from the definition of uniform acceleration. R is also true but it only states the unit, which does not explain why the equation holds — option (b).',
  d: 2, c: 'understanding', t: [3],
}));
add('dist-ar', ar({
  a: 'The distance travelled by a body between two instants can be greater than the magnitude of its displacement.',
  r: 'Displacement is always greater than the distance travelled.',
  key: 'c',
  sol: 'A is true: on a bent or curved path the path length exceeds the straight-line displacement. R is false, because the displacement is never greater than the distance — option (c).',
  d: 2, c: 'analysis', t: [1],
}));
add('eq-match', match({
  stem: 'A student has to solve four problems. Match each problem (Column A) with the best equation of motion (Column B).',
  pairs: [
    ['A truck brakes to rest from a known speed with a known retardation; find the braking distance', r`$v^2 = u^2 + 2as$`],
    ['Find the speed a car gains in 6 s of uniform acceleration', r`$v = u + at$`],
    ['Find the distance a train covers in 40 s with known u and a', r`$s = ut + \tfrac12 at^2$`],
    ['A satellite’s orbit radius and period are known; find its speed', r`$v = 2\pi r / T$`],
  ],
  order: [0, 1, 2, 3],
  sol: 'Braking distance without time uses v² = u² + 2as; the speed gained uses v = u + at; distance in a given time uses s = ut + ½at²; a speed in a circle uses v = 2πr/T.',
  d: 2, c: 'application', t: [3, 4],
}));
add('brake-num', (() => {
  const u = 90 / 3.6, a = 2.5;
  const s = (u * u) / (2 * a);
  return num({
    stem: r`A truck moving at 90 km/h on a highway near Nagpur is braked with a uniform retardation of ${a.toFixed(1)} m s⁻². Find the distance it travels before stopping, in m.`,
    value: p3(s), tol: 0.5, unit: 'm',
    sol: r`$u = 90/3.6 = ${u}\ \text{m s}^{-1}$, $v = 0$, $a = -${a}\ \text{m s}^{-2}$. From $v^2 = u^2 + 2as$: $0 = ${u}^2 - 2(${a})s$, so $s = \dfrac{${u * u}}{${2 * a}} = ${dec(s, 3)}$ m.`,
    scheme: [['Converts 90 km/h to 25 m s⁻¹', 1], ['Uses v² = u² + 2as with a = −2.5', 1], ['s = 125 m', 1]],
    marks: 3, d: 3, c: 'application', t: [3],
  });
})(), (q) => near(25 * 25 / 5, 125, 1e-9) && q.answer.value === 125 || 'brake');
add('ball-num', (() => {
  const u = 29.4;
  const H = (u * u) / (2 * g);
  return num({
    stem: r`A boy throws a ball vertically upward at ${u} m s⁻¹. Taking $g = 9.8\ \text{m s}^{-2}$ and ignoring air resistance, find the greatest height the ball reaches above his hand, in m.`,
    value: p3(H), tol: 0.05, unit: 'm',
    sol: r`At the top $v = 0$ and $a = -9.8\ \text{m s}^{-2}$. $v^2 = u^2 + 2as$ gives $0 = ${u}^2 - 2(9.8)H$, so $H = \dfrac{${dec(u * u, 4)}}{19.6} = ${dec(H, 3)}$ m.`,
    scheme: [['Takes v = 0 and a = −9.8 m s⁻² at the top', 1], ['Uses v² = u² + 2as', 1], ['H = 44.1 m', 1]],
    marks: 3, d: 3, c: 'application', t: [3],
  });
})(), (q) => near(29.4 * 29.4 / 19.6, 44.1, 1e-6) && q.answer.value === 44.1 || 'ball');
add('train-num', (() => {
  const u = 10, s = 450, t = 30;
  const a = (2 * (s - u * t)) / (t * t);
  return num({
    stem: r`A train moving at ${u} m s⁻¹ gains speed uniformly and covers ${s} m in the next ${t} s. Find its acceleration, in m s⁻² (2 significant figures).`,
    value: p2(a), tol: 0.005, unit: 'm s⁻²',
    sol: r`$s = ut + \tfrac12 at^2$ gives $${s} = ${u}(${t}) + \tfrac12 a (${t})^2 = ${u * t} + ${t * t / 2}a$, so $a = \dfrac{${s - u * t}}{${t * t / 2}} = ${dec(a, 2)}\ \text{m s}^{-2}$.`,
    scheme: [['Substitutes in s = ut + ½at²', 1], ['Solves for a: 0.33 m s⁻²', 1]],
    marks: 2, d: 3, c: 'application', t: [3],
  });
})(), (q) => near((2 * (450 - 300)) / 900, 0.3333, 0.001) && q.answer.value === 0.33 || 'train');
add('derive1-short', short({
  marks: 3,
  stem: 'Draw the velocity–time graph of a body that moves with uniform acceleration a from initial velocity u to final velocity v in time t, and use it to derive v = u + at.',
  model: r`Plot velocity on the vertical axis and time on the horizontal axis. The graph is a straight line AB rising from $u$ at $t = 0$ to $v$ at time $t$. The slope of AB is the acceleration, so $a = \dfrac{v - u}{t}$. Multiplying by $t$ gives $at = v - u$, and therefore $v = u + at$.`,
  sol: 'Draw the line AB; slope = a; rearrange.',
  scheme: [['Straight-line v–t graph from u to v, labelled', 1], ['Slope equals acceleration: a = (v − u)/t', 1], ['Rearranged to v = u + at', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('derive2-short', short({
  marks: 3,
  stem: 'Using the area under the velocity–time graph of a body in uniform acceleration, derive the equation s = ut + ½at².',
  model: r`The displacement $s$ is the area under the line AB. This area is a rectangle of height $u$ and width $t$ plus a triangle of height $v - u$ and base $t$. So $s = ut + \tfrac12 (v - u)t$. Since $v - u = at$ from the first equation, the area of the triangle becomes $\tfrac12 at^2$. Adding the two areas gives $s = ut + \tfrac12 at^2$.`,
  sol: 'Rectangle ut + triangle ½(v − u)t, with v − u = at.',
  scheme: [['Area split into a rectangle and a triangle', 1], ['Areas ut and ½(v − u)t', 1], ['Replaces v − u by at to get the result', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('derive3-short', short({
  marks: 3,
  stem: 'Derive the equation v² = u² + 2as for a body in uniform acceleration, starting from the idea that the displacement equals the average velocity multiplied by the time.',
  model: r`For uniform acceleration the average velocity is $\dfrac{u + v}{2}$, so the displacement is the average velocity multiplied by the time, $s = \dfrac{u + v}{2}\,t$. From the first equation $v = u + at$, the time is $t = \dfrac{v - u}{a}$. Substituting this time into the expression for $s$ gives $s = \dfrac{(u + v)(v - u)}{2a} = \dfrac{v^2 - u^2}{2a}$. Multiplying by $2a$ and rearranging, we get $v^2 = u^2 + 2as$.`,
  sol: 'Eliminate t between s = (u + v)t/2 and t = (v − u)/a.',
  scheme: [['s = average velocity × time', 1], ['t = (v − u)/a substituted', 1], ['(u + v)(v − u) = v² − u² and rearranged', 1]],
  d: 3, c: 'understanding', t: [3],
}));
add('derive-long', long({
  stem: 'A body moves in a straight line with uniform acceleration a. Its velocity changes from u to v in time t and its displacement is s.\n\n(a) Use the velocity–time graph to derive v = u + at and s = ut + ½at².\n\n(b) Derive v² = u² + 2as by algebra.',
  model: r`On the velocity–time graph the straight line AB runs from $u$ to $v$ in time $t$. Its slope is the acceleration: $a = (v - u)/t$, so $v = u + at$. The area under AB is the displacement. It is a rectangle $ut$ plus a triangle $\tfrac12 (v - u)t$, and with $v - u = at$ we get $s = ut + \tfrac12 at^2$. For (b), the average velocity is $(u + v)/2$, so $s = \dfrac{(u + v)}{2}\,t$. Putting in the time $t = (v - u)/a$ from the first equation gives $2as = (u + v)(v - u) = v^2 - u^2$. Hence $v^2 = u^2 + 2as$, an equation that does not contain time.`,
  sol: 'Slope gives the first, area gives the second, elimination of t gives the third.',
  scheme: [['Labelled graph with u, v and t', 1], ['First equation from the slope', 1], ['Second equation from the area', 1.5], ['Third equation by eliminating t', 1.5]],
  d: 3, c: 'understanding', t: [3],
}));
add('cliff-long', long({
  stem: 'A stone is dropped from rest from a cliff and strikes the sea after 4.0 s. Take g = 9.8 m s⁻² and ignore air resistance.\n\n(a) Find the height of the cliff.\n\n(b) Find the speed of the stone just before it hits the water.\n\n(c) Find the distance the stone falls during the last second.',
  model: (() => {
    const t = 4;
    const h = 0.5 * g * t * t;
    const v = g * t;
    const h3 = 0.5 * g * 9;
    return r`The stone starts from rest, so its initial velocity is zero and its acceleration is $9.8\ \text{m s}^{-2}$ downward. (a) The height of the cliff is the distance fallen in 4.0 s: $s = \tfrac12 gt^2 = \tfrac12 (9.8)(16) = ${dec(h, 3)}$ m. (b) The speed on reaching the water is $v = gt = 9.8 \times 4.0 = ${dec(v, 3)}\ \text{m s}^{-1}$. (c) In the first 3.0 s the stone falls $\tfrac12 (9.8)(9) = ${dec(h3, 3)}$ m, so the distance fallen in the last second is the difference, $${dec(h, 3)} - ${dec(h3, 3)} = ${dec(h - h3, 3)}$ m. Notice that this is much more than the 4.9 m fallen in the first second, because the stone keeps speeding up as it falls.`;
  })(),
  sol: 'Height 78.4 m; speed 39.2 m/s; last second 34.3 m.',
  scheme: [['(a) Height 78.4 m using s = ½gt²', 1.5], ['(b) Speed 39.2 m s⁻¹ using v = gt', 1.5], ['(c) Distance in the last second 34.3 m', 2]],
  d: 3, c: 'application', t: [3],
}), () => near(0.5 * g * 16, 78.4, 1e-9) && near(g * 4, 39.2, 1e-9) && near(0.5 * g * 16 - 0.5 * g * 9, 34.3, 1e-9) || 'cliff');
add('well-case', mk.case({
  passage: r`A student drops a stone into a dry well and measures the depth fallen with a rangefinder at three instants. Take $g = 9.8\ \text{m s}^{-2}$ and ignore air resistance.

| Time after release t (s) | 1.0 | 2.0 | 3.0 |
|---|---|---|---|
| Depth fallen (m) | 4.9 | 19.6 | 44.1 |`,
  d: 4, c: 'analysis',
  children: [
    part('a', mcq({
      stem: 'The depths fallen after 1.0 s, 2.0 s and 3.0 s are in the ratio 1 : 4 : 9. This is because the stone:',
      right: 'starts from rest and has a constant acceleration, so s is proportional to t²',
      wrong: ['moves at a constant speed, so s is proportional to t', 'has an acceleration that doubles every second', 'starts with a velocity of 9.8 m s⁻¹'],
      sol: r`From rest, $s = \tfrac12 gt^2$, so s grows as $t^2$: $1 : 4 : 9$ — option (@K). A constant speed would give equal distances in equal times, which the table does not show.`,
      d: 3, c: 'analysis', t: [3],
    })),
    part('b', short({
      marks: 1, wl: null,
      stem: 'Find the speed of the stone 3.0 s after release, in m s⁻¹.',
      model: r`$v = gt = 9.8 \times 3.0 = 29.4\ \text{m s}^{-1}$.`,
      sol: r`From rest $v = u + gt = 0 + 9.8 \times 3.0 = 29.4\ \text{m s}^{-1}$.`,
      scheme: [['29.4 m s⁻¹', 1]],
      d: 2, c: 'application', t: [3],
    })),
    part('c', short({
      marks: 2, wl: null,
      stem: 'A second stone dropped into the well hits the bottom 2.5 s after release. Find the depth of the well.',
      model: r`$s = \tfrac12 gt^2 = \tfrac12 \times 9.8 \times (2.5)^2 = \tfrac12 \times 9.8 \times 6.25 = 30.6$ m (30.625 m).`,
      sol: 'Use s = ½gt² with t = 2.5 s.',
      scheme: [['Uses s = ½gt²', 1], ['Depth 30.6 m', 1]],
      d: 3, c: 'application', t: [3],
    }), [
      short({
        marks: 2, wl: null,
        stem: 'The stone released in the table is let fall for 3.0 s. Use v² = u² + 2as and the depth in the table to find its speed on reaching that depth.',
        model: r`$v^2 = 0 + 2(9.8)(44.1) = 864.4$, so $v = 29.4\ \text{m s}^{-1}$, the same value as from $v = gt$.`,
        sol: 'Substitute u = 0, a = 9.8, s = 44.1.',
        scheme: [['v² = 2 × 9.8 × 44.1 = 864.4', 1], ['v = 29.4 m s⁻¹', 1]],
        d: 3, c: 'application', t: [3],
      }),
    ]),
  ],
}), null);
add('top-short', short({
  marks: 2,
  stem: 'A ball is thrown straight up. Compare the time it takes to rise to its highest point with the time it takes to fall back to the point of release, and state the value of g you use.',
  model: r`Both times are equal. The ball loses $9.8\ \text{m s}^{-1}$ every second on the way up and gains the same amount on the way down, so it returns to the hand with the speed it started with. Here $g = 9.8\ \text{m s}^{-2}$ downward, taken as $-9.8\ \text{m s}^{-2}$ when up is positive.`,
  sol: 'Same acceleration up and down, so equal times.',
  scheme: [['Times are equal, with the reason', 1], ['g = 9.8 m s⁻²', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('trucks-short', short({
  marks: 2,
  stem: 'A truck driver brakes twice with the same retardation, first at 36 km/h and then at 72 km/h. Compare the braking distances and explain your answer using an equation of motion.',
  model: r`From $v^2 = u^2 + 2as$ with $v = 0$, $s = u^2/(2a)$. Doubling the speed from 10 to $20\ \text{m s}^{-1}$ multiplies $u^2$ by 4, so the braking distance at 72 km/h is four times that at 36 km/h.`,
  sol: 's ∝ u² for fixed a, so doubling u gives four times the distance.',
  scheme: [['Braking distance is proportional to the square of the speed', 1], ['Four times, with the numbers 10 and 20 m s⁻¹', 1]],
  d: 3, c: 'analysis', t: [3],
}), () => near((20 * 20) / (10 * 10), 4, 1e-9) || 'trucks');
add('why-eq-short', short({
  marks: 3,
  stem: 'A scooter moving at 6 m s⁻¹ accelerates uniformly at 1.5 m s⁻² for 8 s. Find its final speed and the distance covered, and show that the distance equals average velocity times time.',
  model: (() => {
    const u = 6, a = 1.5, t = 8;
    const v = u + a * t;
    const s = u * t + 0.5 * a * t * t;
    return r`The final speed comes from the first equation: $v = u + at = ${u} + ${a}(${t}) = ${v}\ \text{m s}^{-1}$. The distance comes from the second equation: $s = ut + \tfrac12 at^2 = ${u}(${t}) + \tfrac12 (${a})(${t})^2 = ${u * t} + ${0.5 * a * t * t} = ${s}$ m. For the check, the average velocity is $(${u} + ${v})/2 = ${(u + v) / 2}\ \text{m s}^{-1}$, and the average velocity times the time is $${(u + v) / 2} \times ${t} = ${((u + v) / 2) * t}$ m, which is the same as the value of $s$ found above.`;
  })(),
  sol: 'Final speed 18 m/s; distance 96 m by both methods.',
  scheme: [['v = 18 m s⁻¹', 1], ['s = 96 m from the second equation', 1], ['Average velocity 12 m s⁻¹ × 8 s = 96 m', 1]],
  d: 3, c: 'application', t: [3],
}), () => near(6 + 1.5 * 8, 18, 1e-9) && near(6 * 8 + 0.5 * 1.5 * 64, 96, 1e-9) && near(12 * 8, 96, 1e-9) || 'scooter');

add('brake-case', mk.case({
  passage: r`A school tests the brakes of its bus on a straight, level road. The driver brakes hard at the same spot each time, and the retardation is the same in every trial.

| Speed when braking starts (m s⁻¹) | 10 | 15 | 20 |
|---|---|---|---|
| Braking distance (m) | 10 | 22.5 | 40 |`,
  d: 4, c: 'analysis',
  children: [
    part('a', mcq({
      stem: 'Which statement about the table is correct?',
      right: 'The braking distance is proportional to the square of the starting speed',
      wrong: ['The braking distance is proportional to the starting speed', 'The braking distance does not depend on the starting speed', 'The braking distance is proportional to the square root of the starting speed'],
      sol: 'Doubling the speed from 10 to 20 m s⁻¹ makes the distance four times (10 m to 40 m), and 15 m s⁻¹ gives 2.25 times 10 m. This fits $s = u^2/(2a)$ — option (@K).',
      d: 3, c: 'analysis', t: [3],
    })),
    part('b', short({
      marks: 1,
      stem: 'Use the first column of the table to find the retardation of the bus, in m s⁻².',
      model: r`From $v^2 = u^2 + 2as$ with $v = 0$: $a = -u^2/(2s) = -100/20 = -5.0\ \text{m s}^{-2}$, a retardation of $5.0\ \text{m s}^{-2}$.`,
      sol: r`$0 = 10^2 + 2a(10)$ gives $a = -5.0\ \text{m s}^{-2}$.`,
      scheme: [['Retardation 5.0 m s⁻²', 1]],
      d: 3, c: 'application', t: [3],
    })),
    part('c', short({
      marks: 2, wl: null,
      stem: 'Predict the braking distance of the bus when it brakes from 25 m s⁻¹ on the same road.',
      model: r`The retardation is $5.0\ \text{m s}^{-2}$, so $s = u^2/(2a) = 625/10 = 62.5$ m.`,
      sol: 'Use s = u²/(2a) with a = 5.0.',
      scheme: [['Uses v² = u² + 2as with a = 5.0', 1], ['62.5 m', 1]],
      d: 3, c: 'application', t: [3],
    }), [
      short({
        marks: 2, wl: null,
        stem: 'Find the time the bus takes to stop when it brakes from 20 m s⁻¹.',
        model: r`$t = (v - u)/a = (0 - 20)/(-5.0) = 4.0$ s.`,
        sol: 'Use v = u + at with a = −5.0.',
        scheme: [['Uses v = u + at', 1], ['4.0 s', 1]],
        d: 3, c: 'application', t: [3],
      }),
    ]),
  ],
}), null);

// ---------------------------------------------------------------- t04 uniform circular motion
add('chk-circ', mcq({
  stem: r`A horse on a merry-go-round at a fair moves at a constant $2.0\ \text{m s}^{-1}$ on a circle of radius 3.0 m. The time for one revolution is about:`,
  right: '9.4 s',
  wrong: ['1.5 s', '4.7 s', '19 s'],
  sol: r`$T = 2\pi r / v = 2 \times 3.14 \times 3.0 / 2.0 = 9.4$ s — option (@K). (@1) is $r/v$ and (@2) is only half a revolution.`,
  d: 2, c: 'application', t: [4],
}), () => near((2 * Math.PI * 3) / 2, 9.42, 0.001) || 'chk-circ');
add('changing-mcq', mcq({
  stem: 'A child on a merry-go-round moves at a constant speed along a circle. Which quantity of the child is changing from moment to moment?',
  right: 'The direction of the velocity',
  wrong: ['The speed', 'The time taken for one revolution', 'The radius of the circle'],
  sol: 'The speed, the period and the radius stay the same, but the direction of motion (along the tangent) keeps changing, so the velocity changes — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('period-mcq', mcq({
  stem: 'A wheel makes 20 complete revolutions in 10 s. Its period, the time for one revolution, is:',
  right: '0.5 s',
  wrong: ['2 s', '10 s', '0.05 s'],
  sol: r`$T = \dfrac{\text{time}}{\text{number of revolutions}} = \dfrac{10}{20} = 0.5$ s — option (@K). (@1) is the number of revolutions per second.`,
  d: 2, c: 'application', t: [4],
}), () => near(10 / 20, 0.5, 1e-9) || 'period');
add('circle-fill', fill({
  stem: 'In uniform circular motion, the time taken for one complete revolution is called the ___.',
  acc: [['period', 'time period', 'periodic time']],
  sol: 'The time for one complete revolution is the **period**, $T$.',
  d: 1, c: 'recall', t: [4],
}));
add('radius-ar', ar({
  a: 'Two children on the same merry-go-round, one at twice the distance from the axis as the other, move with speeds in the ratio 2 : 1.',
  r: 'The speed of a body in uniform circular motion is given by 2πr/T, and the period T is the same for both children.',
  key: 'a',
  sol: 'Both children take the same time T for one revolution, and $v = 2\\pi r / T$ is proportional to $r$. Twice the radius gives twice the speed, so R explains A — option (a).',
  d: 3, c: 'analysis', t: [4],
}));
add('area-ar', ar({
  a: 'The area under a velocity–time graph gives the displacement of the body.',
  r: 'The area under a velocity–time graph of a body in uniform motion is its velocity divided by the time.',
  key: 'c',
  sol: 'A is true. R is false: for uniform motion the area of the rectangle is velocity multiplied by time, not divided — option (c).',
  d: 2, c: 'understanding', t: [2],
}));
add('wheel-num', (() => {
  const rr = 4.0, T = 6.0;
  const v = (2 * Math.PI * rr) / T;
  return num({
    stem: r`A merry-go-round at a fair in Hyderabad has a radius of ${rr.toFixed(1)} m. A child riding at its rim goes round once every ${T.toFixed(1)} s. Find the speed of the child, in m s⁻¹ (2 significant figures).`,
    value: p2(v), tol: 0.05, unit: 'm s⁻¹',
    sol: r`$v = \dfrac{2\pi r}{T} = \dfrac{2 \times 3.14 \times ${rr}}{${T}} = ${dec(v, 2)}\ \text{m s}^{-1}$.`,
    scheme: [['Circumference 2πr = 25.1 m', 1], ['Divides by 6.0 s: 4.2 m s⁻¹', 1]],
    marks: 2, d: 2, c: 'application', t: [4],
  });
})(), (q) => near((2 * Math.PI * 4) / 6, 4.19, 0.001) && q.answer.value === 4.2 || 'wheel');
add('derive-circ-short', short({
  marks: 3,
  stem: 'Derive the expression v = 2πr/T for the speed of a body moving in uniform circular motion of radius r with period T. Why is this motion called accelerated although the speed is constant?',
  model: r`In one revolution the body covers the circumference $2\pi r$ in time $T$. Speed is distance divided by time, so $v = \dfrac{2\pi r}{T}$. The speed is constant, but the direction of the velocity, which is along the tangent, changes at every point. A change in direction is a change in velocity, so the motion has acceleration.`,
  sol: 'Circumference over period; changing direction means changing velocity.',
  scheme: [['Distance in one revolution is 2πr, time is T', 1], ['v = 2πr/T', 1], ['Direction of velocity changes, so it is accelerated', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('satellite-long', long({
  stem: '(a) What is uniform circular motion? Give one example.\n\n(b) Derive the formula for the speed of the body in terms of the radius r of the circle and the period T.\n\n(c) A satellite goes round the Earth in a circular orbit of radius 7.2 × 10⁶ m, taking 6.0 × 10³ s for one revolution (illustrative values). Find its speed.',
  model: (() => {
    const rr = 7.2e6, T = 6.0e3;
    const v = (2 * Math.PI * rr) / T;
    return r`Uniform circular motion is motion in a circle at constant speed, like a satellite in a circular orbit or a merry-go-round turning steadily. In one revolution the body covers the circumference $2\pi r$ in one period $T$. Since speed is distance divided by time, its speed is $v = 2\pi r / T$. For the satellite, we substitute the radius and the period in metres and seconds: $v = \dfrac{2 \times 3.14 \times 7.2 \times 10^{6}}{6.0 \times 10^{3}} = ${(v / 1000).toFixed(2)} \times 10^{3}\ \text{m s}^{-1}$, which is about $7.5\ \text{km s}^{-1}$.`;
  })(),
  sol: 'Definition and example; v = 2πr/T; about 7.5 km/s.',
  scheme: [['(a) Definition and example', 1], ['(b) Derivation from circumference and period', 2], ['(c) Substitution and answer about 7.5 km s⁻¹', 2]],
  d: 3, c: 'application', t: [4],
}), () => near((2 * Math.PI * 7.2e6) / 6.0e3, 7540, 0.005) || 'satellite');
add('wheel-case', mk.case({
  passage: r`A giant wheel at a fair in Vijayawada has a radius of 12 m. It turns at a steady rate and takes 48 s for one complete turn. Use $\pi = 3.14$.`,
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'At the top of the wheel, the velocity of a rider is directed:',
      right: 'horizontally, along the tangent to the circle',
      wrong: ['vertically downward, towards the centre', 'vertically upward, away from the centre', 'it is zero because the rider is at the top'],
      sol: 'The velocity of a body in circular motion is always along the tangent. At the top of the circle the tangent is horizontal — option (@K).',
      d: 2, c: 'understanding', t: [4],
    })),
    part('b', short({
      marks: 1, wl: null,
      stem: 'Find the speed of a rider, in m s⁻¹ (2 significant figures).',
      model: r`$v = 2\pi r / T = 2 \times 3.14 \times 12 / 48 = 1.6\ \text{m s}^{-1}$.`,
      sol: r`$v = 75.36 / 48 = 1.57 \approx 1.6\ \text{m s}^{-1}$.`,
      scheme: [['1.6 m s⁻¹', 1]],
      d: 2, c: 'application', t: [4],
    })),
    part('c', short({
      marks: 2,
      stem: 'A rider stays on the wheel for exactly 4.0 minutes. Find the distance the rider travels and the displacement at the end of the ride.',
      model: r`4.0 minutes is 240 s, which is 5 complete turns. The distance is $5 \times 2\pi r = 5 \times 75.4 = 377$ m. After a whole number of turns the rider is back at the starting point, so the displacement is zero.`,
      sol: 'Five turns of 75.4 m each; back at the start so displacement zero.',
      scheme: [['Distance 377 m', 1], ['Displacement zero after complete turns', 1]],
      d: 3, c: 'application', t: [4],
    }), [
      short({
        marks: 2, wl: null,
        stem: 'The wheel runs at a steady speed. Is the acceleration of a rider zero? Explain.',
        model: 'No. The speed is steady, but the direction of the rider’s velocity changes all the time as the rider moves round the circle. A changing velocity means there is an acceleration, directed towards the centre of the wheel.',
        sol: 'Direction changes, so velocity changes, so acceleration is not zero.',
        scheme: [['Not zero', 0.5], ['Direction of velocity changes', 1], ['Changing velocity means acceleration, towards the centre', 0.5]],
        d: 3, c: 'analysis', t: [4],
      }),
    ]),
  ],
}), null);
