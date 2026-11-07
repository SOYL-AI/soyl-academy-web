// ICSE 9 Physics ch02 Motion in One Dimension — question bank in ICSE school-examination style.
// Every number comes from calc.mjs; free-fall stems state g = 10 m s⁻². Motion with non-uniform acceleration is a removed topic and is not asked.
// AR keys: a = (A) true (R) false, b = (A) false (R) true, c = both true and R explains, d = both true and R does not explain.
import { mk, add, svgV, r } from '../../icse-9-physics-ch01/src/lib.mjs';
import * as K from './calc.mjs';
import { DT_FIG, VT_FIG, PATH_PQR, DERIV_LET } from './svgs.mjs';

const { mcq, ar, tf, fill, num, short, long, match } = mk;
const term = (o) => short({ marks: 1, wl: null, scheme: [[o.sch ?? 'Correct answer', 1]], ...o });
const fv = (svg, alt) => svgV(svg, alt);
const sh = (a, b) => (a === b ? true : `got ${a}, expected ${b}`);
const figDT = () => fv(DT_FIG, 'Distance against time for a toy car: O to A rising to 20 m at 4 s, A to B horizontal until 8 s, B to C rising to 60 m at 12 s');
const figVT = () => fv(VT_FIG, 'Velocity against time for a tram: rises from 0 to 12 m/s in 6 s, constant until 10 s, falls to 0 at 13 s');

// ---------------------------------------------------------------- deck-check items (not used in tests)
add('chk-dd', mcq({
  stem: 'A boy walks 40 m north and then 30 m south along the same straight road. His displacement is',
  right: `${K.BOY_DISP} m north`, wrong: ['70 m north', '10 m south', '70 m'],
  sol: r`Displacement $= 40 - 30 = ${K.BOY_DISP}$ m towards north; the distance is 70 m, option (@K).`,
  d: 2, c: 'application', t: [1],
}));
add('chk-speed', mcq({
  stem: 'A runner covers 120 m in 20 s and then 80 m in 30 s. Her average speed is',
  right: `${K.RUN_V} m s⁻¹`, wrong: ['5 m s⁻¹', '5.5 m s⁻¹', '10 m s⁻¹'],
  sol: r`$\dfrac{120 + 80}{20 + 30} = \dfrac{200}{50} = ${K.RUN_V}$ m s⁻¹, option (@K).`,
  d: 2, c: 'application', t: [2],
}));
add('chk-acc', mcq({
  stem: 'The velocity of a car changes from 10 m s⁻¹ to 25 m s⁻¹ in 5 s. Its acceleration is',
  right: `${K.CAR_CHK_A} m s⁻²`, wrong: ['0.33 m s⁻²', '5 m s⁻²', '15 m s⁻²'],
  sol: r`$a = \dfrac{v - u}{t} = \dfrac{25 - 10}{5} = ${K.CAR_CHK_A}$ m s⁻², option (@K).`,
  d: 2, c: 'application', t: [2],
}));
add('chk-graph', mcq({
  stem: 'On a distance-time graph, the slope of the line gives the body’s',
  right: 'speed', wrong: ['acceleration', 'displacement', 'distance travelled'],
  sol: 'Change of distance divided by change of time is the speed, option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('chk-eq', mcq({
  stem: 'A question gives u, v and a and asks for the distance S. The equation to use is',
  right: r`$v^2 = u^2 + 2aS$`, wrong: [r`$v = u + at$`, r`$S = ut + \dfrac{1}{2}at^2$`, r`$S = \dfrac{1}{2}(u + v)t$`],
  sol: 'The time is neither given nor asked, so the equation without t is used, option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('chk-brake', mcq({
  stem: 'A car moving at 10 m s⁻¹ brakes with a uniform retardation of 2.5 m s⁻². It stops after',
  right: `${K.CHK_BRAKE_S} m`, wrong: ['4 m', '10 m', '40 m'],
  sol: r`$0 = 10^2 + 2 \times (-2.5) \times S$, so $S = \dfrac{100}{5} = ${K.CHK_BRAKE_S}$ m, option (@K).`,
  d: 3, c: 'application', t: [4],
}));
add('chk-fall', mcq({
  stem: 'A stone dropped from the top of a tower reaches the ground in 4 s. The height of the tower is (g = 10 m s⁻²)',
  right: `${K.TOWER_H} m`, wrong: ['40 m', '20 m', '160 m'],
  sol: r`$S = \dfrac{1}{2}gt^2 = \dfrac{1}{2} \times 10 \times 16 = ${K.TOWER_H}$ m, option (@K).`,
  d: 2, c: 'application', t: [5],
}));
add('chk-up', mcq({
  stem: 'A ball is thrown vertically upward at 15 m s⁻¹. The time taken to reach the highest point is (g = 10 m s⁻²)',
  right: `${K.T15_UP} s`, wrong: ['0.67 s', '3 s', '15 s'],
  sol: r`At the top $v = 0$: $0 = 15 - 10t$, so $t = ${K.T15_UP}$ s, option (@K).`,
  d: 2, c: 'application', t: [5],
}));

// ---------------------------------------------------------------- t01 scalars, vectors, distance, displacement
add('sv1', mcq({
  stem: 'Which of the following is a scalar quantity?',
  right: 'Speed', wrong: ['Displacement', 'Velocity', 'Acceleration'],
  sol: 'Speed has magnitude only; the other three need a direction, option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('sv2', mcq({
  stem: 'For a body moving along a straight line, the magnitude of its displacement',
  right: 'is never greater than the distance it travels', wrong: ['is always equal to the distance it travels', 'is always greater than the distance it travels', 'is always zero'],
  sol: 'The shortest path between two points is the straight line, so displacement cannot exceed distance, option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('sv3', mcq({
  stem: 'A rickshaw puller starts from P, goes 300 m east to Q and then 500 m west to R, as shown. His displacement from P is',
  right: `${K.PQR_DISP} m west of P`, wrong: ['800 m west of P', '200 m east of P', '800 m east of P'],
  sol: r`East is positive: $+300 - 500 = -200$ m, that is ${K.PQR_DISP} m towards west; the distance is ${K.PQR_DIST} m, option (@K).`,
  d: 2, c: 'application', t: [1],
  assets: [fv(PATH_PQR, 'A number line with P at 0, Q at 300 m east and R at 200 m west')],
}));
add('ar-dd', ar({
  a: 'The displacement of a body can be zero even when the distance travelled by it is not zero.',
  r: 'Displacement depends only on the initial and final positions of the body.',
  key: 'c',
  sol: 'If the body returns to its starting point the two positions coincide, so the displacement is zero; (R) explains (A), option (c).',
  d: 2, c: 'analysis', t: [1],
}));
add('tf-dist', tf({
  stem: 'The distance travelled by a body that has moved can be zero.',
  key: 'f',
  sol: 'False. Distance is the length of the path and is positive for any motion; only the displacement can be zero.',
  d: 1, c: 'understanding', t: [1],
}));
add('term-disp', term({
  stem: 'Define displacement.',
  model: 'The **shortest distance between the initial and final positions of a body, in the direction from the first to the second**.', sol: 'Shortest distance from start to end, with direction.', sch: 'Definition with direction',
  d: 1, c: 'recall', t: [1],
}));
add('s2a', short({
  marks: 2,
  stem: 'Distinguish a scalar quantity from a vector quantity, with one example of each.',
  wl: null,
  model: 'A scalar has **magnitude only** (for example mass); a vector has **magnitude and direction** (for example force).',
  sol: 'Magnitude only against magnitude and direction.',
  scheme: [['Scalar defined with an example', 1], ['Vector defined with an example', 1]],
  d: 1, c: 'understanding', t: [1],
}));
add('s2b', short({
  marks: 2,
  stem: `A girl completes one lap of a circular track of circumference ${K.LAP.c} m in ${K.LAP.t} s. Find her average speed and average velocity for the lap.`,
  wl: null,
  model: `Average speed = ${K.LAP.c} ÷ ${K.LAP.t} = **${K.LAP_V} m s⁻¹**. She returns to the starting point, so the displacement is zero and the average velocity is **zero**.`,
  sol: '4 m/s; zero.',
  scheme: [[`Speed ${K.LAP_V} m s⁻¹`, 1], ['Velocity zero with reason', 1]],
  d: 2, c: 'application', t: [1, 2],
}), () => sh(K.LAP_V, 4));

// ---------------------------------------------------------------- t02 speed, velocity, acceleration
add('sp1', mcq({
  stem: 'A ferry crosses a river 150 m wide in 100 s and returns to the same bank in another 100 s. Its average velocity for the round trip is',
  right: 'zero', wrong: [`${K.FERRY_V} m s⁻¹`, '3 m s⁻¹', '0.67 m s⁻¹'],
  sol: `The ferry ends where it started, so the displacement and hence the average velocity are zero; its average speed is ${K.FERRY_V} m s⁻¹, option (@K).`,
  d: 2, c: 'application', t: [2],
}));
add('sp2', mcq({
  stem: 'A car goes round a circular track at a steady speed of 15 m s⁻¹. Its velocity',
  right: 'keeps changing because its direction keeps changing', wrong: ['is constant because its speed is constant', 'is zero because it returns to the start', 'is 15 m s⁻¹ in one fixed direction'],
  sol: 'Velocity is a vector; a change of direction is a change of velocity even at constant speed, option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('sp3', mcq({
  stem: 'A body is said to have retardation when',
  right: 'its velocity decreases with time', wrong: ['its velocity is zero', 'its speed is constant', 'its displacement is negative'],
  sol: 'Retardation is a negative acceleration: the velocity falls with time, option (@K).',
  d: 1, c: 'understanding', t: [2],
}));
add('sp4', mcq({
  stem: 'A car slows down from 20 m s⁻¹ to 5 m s⁻¹ in 5 s. Its acceleration is',
  right: `${K.SLOW_A} m s⁻²`, wrong: ['+3 m s⁻²', '−15 m s⁻²', '+15 m s⁻²'],
  sol: r`$a = \dfrac{5 - 20}{5} = ${K.SLOW_A}$ m s⁻² (a retardation of 3 m s⁻²), option (@K).`,
  d: 2, c: 'application', t: [2],
}));
add('ar-speed', ar({
  a: 'A car moving round a circular track with constant speed has constant velocity.',
  r: 'Velocity is a vector and changes when the direction of motion changes.',
  key: 'b',
  sol: 'The direction keeps changing, so the velocity is not constant: (A) is false; (R) is true, option (b).',
  d: 2, c: 'analysis', t: [2],
}));
add('ar-ret', ar({
  a: 'Retardation is a negative acceleration.',
  r: 'A body moving with uniform velocity has zero acceleration.',
  key: 'd',
  sol: 'Both statements are true, but the second does not explain the first, option (d).',
  d: 2, c: 'understanding', t: [2],
}));
add('tf-uni', tf({
  stem: 'A body moving with a constant velocity has zero acceleration.',
  key: 't',
  sol: 'True. Acceleration is the rate of change of velocity, which is zero if the velocity does not change.',
  d: 1, c: 'recall', t: [2],
}));
add('fill-uni', fill({
  stem: 'A body that covers equal distances in equal intervals of time is said to move with ___ speed.',
  acc: [['uniform', 'constant']],
  sol: 'Uniform (constant) speed.',
  d: 1, c: 'recall', t: [2],
}));
add('term-unit', term({
  stem: 'State the SI unit in which the area under a velocity-time graph is measured.',
  model: 'The **metre** (m), since the area is a displacement.', sol: 'Metre.', sch: 'Metre',
  d: 1, c: 'recall', t: [2],
}));
add('num-cyc', num({
  stem: 'A cyclist covers 480 m in 60 s and then 720 m in 180 s. Find the average speed for the whole journey in m s⁻¹.',
  value: K.CYC_V, tol: 0, unit: 'm s⁻¹',
  sol: r`$\dfrac{480 + 720}{60 + 180} = \dfrac{1200}{240} = ${K.CYC_V}$ m s⁻¹.`,
  scheme: [['Total distance ÷ total time', 0.5], [`${K.CYC_V} m s⁻¹`, 0.5]],
  d: 2, c: 'application', t: [2],
}), () => sh(K.CYC_V, 5));
add('num-bus', num({
  stem: 'A bus increases its speed from 6 m s⁻¹ to 21 m s⁻¹ in 10 s. Find its acceleration in m s⁻².',
  value: K.BUSA_A, tol: 0, unit: 'm s⁻²',
  sol: r`$a = \dfrac{v - u}{t} = \dfrac{21 - 6}{10} = ${K.BUSA_A}$ m s⁻².`,
  scheme: [['Formula and substitution', 0.5], [`${K.BUSA_A} m s⁻²`, 0.5]],
  d: 1, c: 'application', t: [2],
}), () => sh(K.BUSA_A, 1.5));
add('num-bike', num({
  stem: 'A bike moving at 14 m s⁻¹ is brought to rest uniformly in 7 s. Find its retardation in m s⁻².',
  value: K.BIKE.u / K.BIKE.t, tol: 0, unit: 'm s⁻²',
  sol: r`$a = \dfrac{0 - 14}{7} = -2$ m s⁻², so the retardation $= 2$ m s⁻².`,
  scheme: [['Formula and substitution', 0.5], ['2 m s⁻² (retardation)', 0.5]],
  d: 2, c: 'application', t: [2],
}), () => sh(-K.BIKE_A, 2));
add('s2c', short({
  marks: 2,
  stem: 'What is meant by retardation? Give one everyday situation in which it occurs.',
  wl: null,
  model: 'Retardation is a **negative acceleration**: the velocity of the body **decreases** with time. For example, a car slowing down when the brakes are applied.',
  sol: 'Velocity decreases; a braking car.',
  scheme: [['Negative acceleration, velocity decreasing', 1], ['An example', 1]],
  d: 1, c: 'understanding', t: [2],
}));
add('s3a', short({
  marks: 3,
  stem: `A girl jogs ${K.JOG.east} m east in ${K.JOG.t1} s and then turns round and jogs ${K.JOG.west} m west in ${K.JOG.t2} s. Find (a) her average speed and (b) her average velocity for the whole jog.`,
  wl: null,
  model: `**(a)** Distance = ${K.JOG.east} + ${K.JOG.west} = ${K.JOG_DIST} m; time = ${K.JOG_TIME} s; average speed = ${K.JOG_DIST} ÷ ${K.JOG_TIME} = **${K.JOG_SPEED} m s⁻¹**.\n\n**(b)** Displacement = ${K.JOG.east} − ${K.JOG.west} = ${K.JOG_DISP} m east; average velocity = ${K.JOG_DISP} ÷ ${K.JOG_TIME} = **${K.JOG_VEL} m s⁻¹ towards east**.`,
  sol: '3 m/s; 1 m/s east.',
  scheme: [['Average speed 3 m/s', 1], ['Displacement 100 m east', 1], ['Average velocity 1 m/s east', 1]],
  d: 2, c: 'application', t: [1, 2],
}), () => sh(K.JOG_VEL, 1));
add('s3e', short({
  marks: 3,
  stem: 'State three differences between speed and velocity.',
  wl: null,
  model: '**1.** Speed is the distance covered per unit time; velocity is the **displacement** per unit time.\n\n**2.** Speed is a **scalar**; velocity is a **vector**.\n\n**3.** Speed is **never negative or zero for a moving body** while velocity can be **zero or negative** (for example for a body that returns to its start).',
  sol: 'Distance against displacement; scalar against vector; sign and zero values.',
  scheme: [['Distance against displacement', 1], ['Scalar against vector', 1], ['A third difference', 1]],
  d: 2, c: 'understanding', t: [2],
}));

// ---------------------------------------------------------------- t03 graphs
add('gr1', mcq({
  stem: 'The figure shows the distance-time graph of a toy car. Its speed during the part BC is',
  right: `${K.DT_V.BC} m s⁻¹`, wrong: ['5 m s⁻¹', '20 m s⁻¹', '40 m s⁻¹'],
  sol: r`Speed = slope $= \dfrac{60 - 20}{12 - 8} = ${K.DT_V.BC}$ m s⁻¹, option (@K).`,
  d: 2, c: 'application', t: [3],
  assets: [figDT()],
}));
add('gr2', mcq({
  stem: 'The figure shows the velocity-time graph of a tram. The distance covered in the first 6 s is',
  right: `${K.VT_S1} m`, wrong: ['72 m', '12 m', '6 m'],
  sol: r`Area of the triangle $= \dfrac{1}{2} \times 6 \times 12 = ${K.VT_S1}$ m, option (@K).`,
  d: 2, c: 'application', t: [3],
  assets: [figVT()],
}));
add('gr3', mcq({
  stem: 'A horizontal straight line on a velocity-time graph shows that the body is moving with',
  right: 'uniform velocity', wrong: ['uniform acceleration', 'uniform retardation', 'increasing velocity'],
  sol: 'The velocity does not change with time, so the acceleration is zero, option (@K).',
  d: 1, c: 'understanding', t: [3],
}));
add('gr4', mcq({
  stem: 'A velocity-time line falls steadily from 12 m s⁻¹ to 4 m s⁻¹ in 4 s without touching the time axis. During these 4 s the body is',
  right: 'moving forward and slowing down', wrong: ['moving forward and speeding up', 'at rest', 'moving backward and speeding up'],
  sol: 'The velocity stays positive but decreases, so the body moves forward with retardation, option (@K).',
  d: 3, c: 'analysis', t: [3],
}));
add('ar-vt', ar({
  a: 'On a distance-time graph a steeper straight line shows a greater speed.',
  r: 'The area under a distance-time graph gives the speed of the body.',
  key: 'a',
  sol: 'The slope is the speed, so (A) is true; the speed is not given by the area, so (R) is false, option (a).',
  d: 2, c: 'understanding', t: [3],
}));
add('tf-dt', tf({
  stem: 'A horizontal line on a distance-time graph shows that the body is at rest.',
  key: 't',
  sol: 'True. The distance does not change with time.',
  d: 1, c: 'recall', t: [3],
}));
add('tf-vt', tf({
  stem: 'The slope of a velocity-time graph gives the displacement of the body.',
  key: 'f',
  sol: 'False. The slope gives the acceleration; the area gives the displacement.',
  d: 1, c: 'recall', t: [3],
}));
add('fill-area', fill({
  stem: 'The displacement of a body is obtained from the ___ enclosed between its velocity-time graph and the time axis.',
  acc: [['area']],
  sol: 'The area under the graph.',
  d: 1, c: 'recall', t: [3],
}));
add('term-slope', term({
  stem: 'Name the quantity given by the slope of a velocity-time graph.',
  model: '**Acceleration.**', sol: 'Acceleration.', sch: 'Acceleration',
  d: 1, c: 'recall', t: [3],
}));
add('graph-match', match({
  marks: 5,
  stem: 'Match each item in Column A with how it is found from a graph in Column B.',
  pairs: [
    ['Speed of a body', 'Slope of the distance-time graph'],
    ['Acceleration of a body', 'Slope of the velocity-time graph'],
    ['Displacement of a body', 'Area under the velocity-time graph'],
    ['A body at rest', 'Horizontal line on the distance-time graph'],
    ['Uniform retardation', 'Straight line falling on the velocity-time graph'],
  ],
  order: [0, 1, 2, 3, 4],
  sol: 'Slopes give speed and acceleration; the area gives displacement; a horizontal d-t line is rest; a falling v-t line is retardation.',
  scheme: [['Five pairs', 5]],
  d: 2, c: 'understanding', t: [3],
}));
add('num-dt', num({
  stem: 'The figure shows the distance-time graph of a toy car. Find the average speed of the car for the whole 12 s in m s⁻¹.',
  value: K.DT_AVG, tol: 0, unit: 'm s⁻¹',
  sol: r`Total distance $= 60$ m, total time $= 12$ s, so average speed $= \dfrac{60}{12} = ${K.DT_AVG}$ m s⁻¹.`,
  scheme: [['Total distance ÷ total time', 0.5], [`${K.DT_AVG} m s⁻¹`, 0.5]],
  d: 2, c: 'application', t: [3],
  assets: [figDT()],
}), () => sh(K.DT_AVG, 5));
add('num-vt', num({
  stem: 'The figure shows the velocity-time graph of a tram. Find the distance covered in the first 10 s, in m.',
  value: K.VT_10, tol: 0, unit: 'm',
  sol: r`Area $= \dfrac{1}{2} \times 6 \times 12 + 4 \times 12 = 36 + 48 = ${K.VT_10}$ m.`,
  scheme: [['Triangle and rectangle areas', 0.5], [`${K.VT_10} m`, 0.5]],
  d: 3, c: 'application', t: [3],
  assets: [figVT()],
}), () => sh(K.VT_10, 84));
add('s2d', short({
  marks: 2,
  stem: 'What does the slope of a distance-time graph represent? What does a horizontal line on it show?',
  wl: null,
  model: 'The slope gives the **speed** of the body. A horizontal line shows that the **distance does not change**, so the body is **at rest**.',
  sol: 'Speed; at rest.',
  scheme: [['Slope is speed', 1], ['Horizontal line means at rest', 1]],
  d: 1, c: 'understanding', t: [3],
}));
add('s2e', short({
  marks: 2,
  stem: 'State two quantities that can be found from a velocity-time graph and how each is obtained.',
  wl: null,
  model: '**Acceleration**, from the **slope** of the graph; **displacement**, from the **area** under the graph.',
  sol: 'Slope gives acceleration; area gives displacement.',
  scheme: [['Acceleration from the slope', 1], ['Displacement from the area', 1]],
  d: 1, c: 'recall', t: [3],
}));
add('s3b', short({
  marks: 3,
  stem: 'A car starts from rest and its velocity increases uniformly to 10 m s⁻¹ in 5 s. It then moves at this velocity for 10 s. Find (a) its acceleration in the first 5 s and (b) the total distance covered in 15 s.',
  wl: null,
  model: `**(a)** a = (10 − 0) ÷ 5 = **2 m s⁻²**.\n\n**(b)** Distance in the first 5 s = ½ × 5 × 10 = 25 m; in the next 10 s = 10 × 10 = 100 m; total = 25 + 100 = **125 m**.`,
  sol: '2 m/s²; 25 m + 100 m = 125 m.',
  scheme: [['Acceleration 2 m s⁻²', 1], ['Distance 25 m and 100 m', 1], ['Total 125 m', 1]],
  d: 3, c: 'application', t: [3],
}), () => (0.5 * 5 * 10 + 10 * 10 === 125 ? true : 'area'));

// ---------------------------------------------------------------- t04 equations of motion
add('eq1', mcq({
  stem: 'A scooter starts from rest and moves with a uniform acceleration of 4 m s⁻². The distance it covers in 5 s is',
  right: `${K.REST_S} m`, wrong: ['100 m', '20 m', '25 m'],
  sol: r`$S = ut + \dfrac{1}{2}at^2 = 0 + \dfrac{1}{2} \times 4 \times 25 = ${K.REST_S}$ m, option (@K).`,
  d: 2, c: 'application', t: [4],
}));
add('eq2', mcq({
  stem: 'The equation of motion that gives the displacement without using the final velocity is',
  right: r`$S = ut + \dfrac{1}{2}at^2$`, wrong: [r`$v = u + at$`, r`$v^2 = u^2 + 2aS$`, r`$S = \dfrac{1}{2}(u + v)t$`],
  sol: 'Only S = ut + ½at² has S in terms of u, a and t alone, option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('num-cycs', num({
  stem: 'A cyclist moving at 3 m s⁻¹ accelerates uniformly at 0.5 m s⁻² for 10 s. Find the distance covered in this time in m.',
  value: K.CYCS_S, tol: 0, unit: 'm',
  sol: r`$S = ut + \dfrac{1}{2}at^2 = 3 \times 10 + \dfrac{1}{2} \times 0.5 \times 100 = 30 + 25 = ${K.CYCS_S}$ m.`,
  scheme: [['Substitution', 0.5], [`${K.CYCS_S} m`, 0.5]],
  d: 2, c: 'application', t: [4],
}), () => sh(K.CYCS_S, 55));
add('num-brk', num({
  stem: 'A car moving at 16 m s⁻¹ is brought to rest by a uniform retardation of 4 m s⁻². Find the distance it travels before stopping, in m.',
  value: K.BRK16_S, tol: 0, unit: 'm',
  sol: r`$v^2 = u^2 + 2aS$: $0 = 16^2 + 2 \times (-4) \times S$, so $S = \dfrac{256}{8} = ${K.BRK16_S}$ m.`,
  scheme: [['Equation with signs', 0.5], [`${K.BRK16_S} m`, 0.5]],
  d: 2, c: 'application', t: [4],
}), () => sh(K.BRK16_S, 32));
add('num-avg', num({
  stem: 'A train increases its velocity uniformly from 8 m s⁻¹ to 20 m s⁻¹ in 4 s. Find the distance covered in this time in m.',
  value: K.AVG2_S, tol: 0, unit: 'm',
  sol: r`$S = \dfrac{1}{2}(u + v)t = \dfrac{1}{2}(8 + 20) \times 4 = ${K.AVG2_S}$ m.`,
  scheme: [['Formula and substitution', 0.5], [`${K.AVG2_S} m`, 0.5]],
  d: 2, c: 'application', t: [4],
}), () => sh(K.AVG2_S, 56));
add('tf-eqn', tf({
  stem: 'The equation v = u + at holds for a body moving with a uniform acceleration.',
  key: 't',
  sol: 'True. It follows from the constant slope of the velocity-time graph.',
  d: 1, c: 'recall', t: [4],
}));
add('s3c', short({
  marks: 3,
  stem: 'A body moves along a straight line with uniform acceleration a. Its velocity changes from u to v in time t. Using a velocity-time graph, derive v = u + at.',
  wl: null,
  model: 'On the graph the line starts at height **u** and reaches height **v** after time **t**. Its **slope** is the acceleration: **a = (v − u) ÷ t**. Rearranging, **v − u = at**, so **v = u + at**.',
  sol: 'Slope of the line is a; rearrange.',
  scheme: [['Graph described with u, v and t', 1], ['Slope = acceleration = (v − u) ÷ t', 1], ['Rearranged to v = u + at', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('s3f', short({
  marks: 3,
  stem: 'Derive S = ut + ½at² from the velocity-time graph of a body moving with uniform acceleration a from initial velocity u for time t.',
  wl: null,
  model: 'The **area under the graph** is the displacement. It is a **rectangle** of height u and width t, area **ut**, plus a **triangle** of base t and height (v − u) = at, area **½ × t × at = ½at²**. Adding, **S = ut + ½at²**.',
  sol: 'Rectangle plus triangle.',
  scheme: [['Displacement as the area under the graph', 1], ['Rectangle ut and triangle ½ t (v − u)', 1], ['Substituting v − u = at', 1]],
  d: 3, c: 'understanding', t: [4],
}));
add('s2f', short({
  marks: 2,
  stem: 'A heavy stone and a light stone are released together from the same height in a vacuum chamber. State which reaches the ground first and give the reason.',
  wl: null,
  model: 'They reach the ground **together**, because in the absence of air resistance **every body falls with the same acceleration g**, independent of its mass.',
  sol: 'Together; same acceleration.',
  scheme: [['Reach together', 1], ['Same acceleration g', 1]],
  d: 2, c: 'understanding', t: [5],
}));

// ---------------------------------------------------------------- t05 free fall
add('fall1', mcq({
  stem: 'In the absence of air resistance the acceleration of a freely falling body near the Earth’s surface',
  right: 'is the same for all bodies', wrong: ['is greater for heavier bodies', 'is greater for larger bodies', 'depends on the height of fall only'],
  sol: 'All bodies fall with the same acceleration g, option (@K).',
  d: 1, c: 'recall', t: [5],
}));
add('fall2', mcq({
  stem: 'A coin is dropped from rest from the top of a building. Its speed after 2 s is (g = 10 m s⁻²)',
  right: `${K.DROP2_V} m s⁻¹`, wrong: ['10 m s⁻¹', '5 m s⁻¹', '40 m s⁻¹'],
  sol: r`$v = u + gt = 0 + 10 \times 2 = ${K.DROP2_V}$ m s⁻¹, option (@K).`,
  d: 2, c: 'application', t: [5],
}));
add('fall3', mcq({
  stem: 'A ball thrown vertically upward is momentarily at rest at the top of its path. At that instant it has',
  right: 'zero velocity and an acceleration of 10 m s⁻² downward', wrong: ['zero velocity and zero acceleration', 'a velocity of 10 m s⁻¹ and zero acceleration', 'zero velocity and an acceleration of 10 m s⁻² upward'],
  sol: 'The velocity changes sign at the top, so it is zero there, but gravity still acts downward, option (@K).',
  d: 3, c: 'analysis', t: [5],
}));
add('tf-fall', tf({
  stem: 'In a vacuum a heavy stone falls faster than a light stone dropped from the same height.',
  key: 'f',
  sol: 'False. Both have the same acceleration g and reach the ground together.',
  d: 1, c: 'recall', t: [5],
}));
add('num-well', num({
  stem: 'A coin dropped into a well hits the water after 1.5 s. Find the depth of the water surface below the top in m. (g = 10 m s⁻²)',
  value: K.WELL15_D, tol: 0.01, unit: 'm',
  sol: r`$S = \dfrac{1}{2}gt^2 = \dfrac{1}{2} \times 10 \times 1.5^2 = ${K.WELL15_D}$ m.`,
  scheme: [['Substitution', 0.5], [`${K.WELL15_D} m`, 0.5]],
  d: 2, c: 'application', t: [5],
}), () => sh(K.WELL15_D, 11.25));
add('num-up', num({
  stem: 'A ball is thrown vertically upward at 40 m s⁻¹. Find the maximum height it reaches in m. (g = 10 m s⁻²)',
  value: K.T40_H, tol: 0, unit: 'm',
  sol: r`$v^2 = u^2 - 2gH$: $0 = 40^2 - 2 \times 10 \times H$, so $H = \dfrac{1600}{20} = ${K.T40_H}$ m.`,
  scheme: [['Equation with a = −g', 0.5], [`${K.T40_H} m`, 0.5]],
  d: 2, c: 'application', t: [5],
}), () => sh(K.T40_H, 80));
add('num-flight', num({
  stem: 'A stone is thrown vertically upward at 25 m s⁻¹. Find the total time it stays in the air before returning to the thrower’s hand, in s. (g = 10 m s⁻²)',
  value: K.T25_FLIGHT, tol: 0, unit: 's',
  sol: r`Time to the top $= \dfrac{25}{10} = 2.5$ s; total time $= 2 \times 2.5 = ${K.T25_FLIGHT}$ s.`,
  scheme: [['Time to the top 2.5 s', 0.5], [`${K.T25_FLIGHT} s`, 0.5]],
  d: 3, c: 'application', t: [5],
}), () => sh(K.T25_FLIGHT, 5));
add('num-drop5', num({
  stem: 'A stone is dropped from a cliff and takes 5 s to reach the sea. Find the height of the cliff in m. (g = 10 m s⁻²)',
  value: K.DROP5_H, tol: 0, unit: 'm',
  sol: r`$S = \dfrac{1}{2}gt^2 = \dfrac{1}{2} \times 10 \times 25 = ${K.DROP5_H}$ m.`,
  scheme: [['Substitution', 0.5], [`${K.DROP5_H} m`, 0.5]],
  d: 2, c: 'application', t: [5],
}), () => sh(K.DROP5_H, 125));
add('s3d', short({
  marks: 3,
  stem: 'A ball is thrown vertically upward at 10 m s⁻¹. Taking g = 10 m s⁻², find (a) the time to reach the highest point, (b) the maximum height and (c) the speed with which it returns to the level of throw.',
  wl: null,
  model: `**(a)** At the top v = 0: 0 = 10 − 10t, so t = **${K.T10_UP} s**.\n\n**(b)** H = u² ÷ 2g = 100 ÷ 20 = **${K.T10_H} m**.\n\n**(c)** It returns with the same speed, **10 m s⁻¹**, directed downward.`,
  sol: '1 s; 5 m; 10 m/s.',
  scheme: [['1 s', 1], ['5 m', 1], ['10 m/s downward', 1]],
  d: 3, c: 'application', t: [5],
}), () => sh(K.T10_H, 5));

// ---------------------------------------------------------------- 10-mark structured questions
add('dt-long', long({
  marks: 10, wl: null,
  stem: 'The figure shows the distance-time graph of a toy car. The points O, A, B and C are marked on it.\n\n(a) Name the type of motion of the car in OA, in AB and in BC. [3]\n\n(b) Find the speed of the car in OA and in BC. [2]\n\n(c) Find the average speed of the car for the whole 12 s. [2]\n\n(d) Find the distance travelled between t = 2 s and t = 10 s. [2]\n\n(e) In which part is the speed greatest? Give a reason. [1]',
  model: `**(a)** OA: **uniform speed**; AB: the car is **at rest**; BC: **uniform speed** (greater than in OA).\n\n**(b)** OA: 20 ÷ 4 = **${K.DT_V.OA} m s⁻¹**; BC: (60 − 20) ÷ (12 − 8) = **${K.DT_V.BC} m s⁻¹**.\n\n**(c)** 60 ÷ 12 = **${K.DT_AVG} m s⁻¹**.\n\n**(d)** Distance at 2 s = ${K.DT_2} m; at 10 s = 20 + 10 × 2 = ${K.DT_10} m; distance travelled = ${K.DT_10} − ${K.DT_2} = **${K.DT_BETWEEN} m**.\n\n**(e)** In **BC**, because the line is steepest, so its slope (speed) is greatest.`,
  sol: 'Uniform speed, rest, uniform speed; 5 and 10 m/s; 5 m/s; 30 m; BC.',
  scheme: [['OA uniform speed', 1], ['AB at rest', 1], ['BC uniform speed', 1], ['Speed in OA with working', 1], ['Speed in BC', 1], ['Total distance ÷ total time', 1], ['5 m/s', 1], ['Distances at 2 s and 10 s', 1], ['30 m', 1], ['BC with the steepest line as the reason', 1]],
  d: 3, c: 'application', t: [3],
  assets: [figDT()],
}), () => sh(K.DT_BETWEEN, 30));
add('vt-long', long({
  marks: 10, wl: null,
  stem: 'The figure shows the velocity-time graph of a tram for a journey of 13 s.\n\n(a) Find the acceleration during the first 6 s. [2]\n\n(b) Find the retardation during the last 3 s. [2]\n\n(c) Find the distance covered in the first 6 s. [2]\n\n(d) Find the total distance covered in the 13 s. [2]\n\n(e) Find the average speed for the whole journey, correct to two decimal places. [2]',
  model: `**(a)** a = (12 − 0) ÷ 6 = **${K.VT_A1} m s⁻²**.\n\n**(b)** a = (0 − 12) ÷ 3 = −4 m s⁻², so the retardation is **${-K.VT_A3} m s⁻²**.\n\n**(c)** Area of the triangle = ½ × 6 × 12 = **${K.VT_S1} m**.\n\n**(d)** Distance = ${K.VT_S1} + 4 × 12 + ½ × 3 × 12 = ${K.VT_S1} + ${K.VT_S2} + ${K.VT_S3} = **${K.VT_S} m**.\n\n**(e)** Average speed = ${K.VT_S} ÷ 13 = **${K.VT_AVG} m s⁻¹**.`,
  sol: '2 m/s²; 4 m/s²; 36 m; 102 m; 7.85 m/s.',
  scheme: [['Slope formula', 1], ['2 m s⁻²', 1], ['Slope for the last 3 s', 1], ['Retardation 4 m s⁻²', 1], ['Area of the triangle', 1], ['36 m', 1], ['Three areas', 1], ['102 m', 1], ['Total distance ÷ total time', 1], ['7.85 m s⁻¹', 1]],
  d: 3, c: 'application', t: [3],
  assets: [figVT()],
}), () => sh(K.VT_AVG, 7.85));
add('deriv-long', long({
  marks: 10, wl: null,
  stem: 'The figure shows the velocity-time graph of a body moving with uniform acceleration a. The velocity is u at A at the start and v at B after time t, C is the foot of B on the time axis, D is level with B on the velocity axis and E is the origin.\n\n(a) Using the slope of AB, derive v = u + at. [3]\n\n(b) Name the figure whose area gives the displacement S in time t. [1]\n\n(c) Using this area, derive S = ut + ½at². [3]\n\n(d) A car starts at 4 m s⁻¹ and accelerates uniformly at 1.5 m s⁻² for 6 s. Find S. [3]',
  model: `**(a)** The slope of AB is the acceleration: a = (v − u) ÷ t, so **v − u = at**, that is **v = u + at**.\n\n**(b)** The **trapezium EABC**.\n\n**(c)** Area = ½ × (sum of the parallel sides) × width = ½ (u + v) t. Put v = u + at: S = ½ (2u + at) t = **ut + ½at²**.\n\n**(d)** S = 4 × 6 + ½ × 1.5 × 36 = 24 + 27 = **${K.CAR2_S} m**.`,
  sol: 'a = (v − u)/t; trapezium EABC; ½(u + v)t with v = u + at; 51 m.',
  scheme: [['Slope of AB is the acceleration', 1], ['a = (v − u) ÷ t', 1], ['v = u + at', 1], ['Trapezium EABC', 1], ['Area = ½ (u + v) t', 1], ['Substituting v = u + at', 1], ['S = ut + ½at²', 1], ['Substitution of 4, 1.5 and 6', 1], ['24 + 27', 1], ['51 m', 1]],
  d: 3, c: 'understanding', t: [4],
  assets: [fv(DERIV_LET, 'A velocity-time graph for uniform acceleration with the points A to E lettered')],
}), () => sh(K.CAR2_S, 51));
add('brake-long', long({
  marks: 10, wl: null,
  stem: 'A truck moving at 30 m s⁻¹ on a straight road is brought to rest by its brakes, which give a uniform retardation of 5 m s⁻².\n\n(a) State the value of the acceleration, with its sign, to be used in the equations of motion. [1]\n\n(b) Find the time taken to stop. [2]\n\n(c) Find the stopping distance using v² = u² + 2aS. [3]\n\n(d) Find the average velocity during the stop and use it to check the stopping distance. [2]\n\n(e) Describe the velocity-time graph of the truck during the stop and say what its area gives. [2]',
  model: `**(a)** **a = −5 m s⁻²**.\n\n**(b)** v = u + at: 0 = 30 − 5t, so t = **${K.TRUCK_T} s**.\n\n**(c)** 0 = 30² + 2 × (−5) × S, so S = 900 ÷ 10 = **${K.TRUCK_S} m**.\n\n**(d)** Average velocity = (30 + 0) ÷ 2 = **${K.TRUCK_VAVG} m s⁻¹**; distance = ${K.TRUCK_VAVG} × ${K.TRUCK_T} = **${K.TRUCK_S} m**, which agrees.\n\n**(e)** A **straight line sloping down** from 30 m s⁻¹ at t = 0 to zero at t = 6 s; the **area** under it (a triangle) gives the **stopping distance**.`,
  sol: '−5 m/s²; 6 s; 90 m; 15 m/s and 90 m; falling straight line, area is the distance.',
  scheme: [['−5 m s⁻²', 1], ['Equation v = u + at with the signs', 1], ['6 s', 1], ['Substitution in v² = u² + 2aS', 1], ['900 ÷ 10', 1], ['90 m', 1], ['Average velocity 15 m s⁻¹', 1], ['15 × 6 = 90 m', 1], ['Falling straight line from 30 to 0', 1], ['Area gives the distance', 1]],
  d: 3, c: 'application', t: [4],
}), () => sh(K.TRUCK_S, 90));
add('fall-long', long({
  marks: 10, wl: null,
  stem: 'A boy standing on level ground throws a stone vertically upward at 30 m s⁻¹. Take g = 10 m s⁻² and neglect air resistance.\n\n(a) Find the time taken to reach the highest point. [2]\n\n(b) Find the maximum height reached. [3]\n\n(c) Find the velocity of the stone 4 s after it is thrown, with its direction. [2]\n\n(d) Find the total time for which the stone is in the air. [2]\n\n(e) State the acceleration of the stone at the highest point. [1]',
  model: `**(a)** At the top v = 0: 0 = 30 − 10t, so t = **${K.T30_UP} s**.\n\n**(b)** 0 = 30² − 2 × 10 × H, so H = 900 ÷ 20 = **${K.T30_H} m**.\n\n**(c)** v = u − gt = 30 − 10 × 4 = **${K.T30_4} m s⁻¹**, that is **10 m s⁻¹ downward**.\n\n**(d)** Total time = 2 × ${K.T30_UP} = **${K.T30_FLIGHT} s**.\n\n**(e)** **10 m s⁻² downward** (the acceleration due to gravity).`,
  sol: '3 s; 45 m; 10 m/s downward; 6 s; 10 m/s² downward.',
  scheme: [['v = 0 at the top', 1], ['3 s', 1], ['Equation with a = −g', 1], ['Substitution', 1], ['45 m', 1], ['v = u − gt', 1], ['10 m s⁻¹ downward', 1], ['Time up doubled', 1], ['6 s', 1], ['10 m s⁻² downward', 1]],
  d: 4, c: 'application', t: [5],
}), () => sh(K.T30_4, -10));
add('well-long', long({
  marks: 10, wl: null,
  stem: 'A stone is dropped into a well and the splash is seen 2.0 s later. Ignore the time taken by sound to travel and take g = 10 m s⁻².\n\n(a) What is meant by free fall? [1]\n\n(b) Find the depth of the water surface below the top of the well. [3]\n\n(c) Find the velocity with which the stone reaches the water. [2]\n\n(d) Find the distance fallen in the first second and in the second second. [2]\n\n(e) A stone and a feather are released together in a long vacuum tube. State what is observed and why. [2]',
  model: `**(a)** The motion of a body **under the force of gravity alone**.\n\n**(b)** S = ½gt² = ½ × 10 × 2² = **${K.WELL_D} m**.\n\n**(c)** v = gt = 10 × 2 = **${K.WELL_V} m s⁻¹** downward.\n\n**(d)** First second: ½ × 10 × 1² = **${K.WELL_1} m**; in the first 2 s: ${K.WELL_D} m, so in the second second: ${K.WELL_D} − ${K.WELL_1} = **${K.WELL_2ND} m**.\n\n**(e)** They reach the bottom **together**, because without air resistance **both fall with the same acceleration g**.`,
  sol: 'Motion under gravity alone; 20 m; 20 m/s; 5 m and 15 m; together.',
  scheme: [['Motion under gravity alone', 1], ['Formula S = ½gt² with u = 0', 1], ['Substitution', 1], ['20 m', 1], ['v = gt', 1], ['20 m s⁻¹', 1], ['5 m in the first second', 1], ['15 m in the second second', 1], ['Reach together', 1], ['Same acceleration without air', 1]],
  d: 3, c: 'application', t: [5],
}), () => sh(K.WELL_2ND, 15));
