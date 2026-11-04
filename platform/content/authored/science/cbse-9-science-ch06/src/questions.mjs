// ch06 Work, Energy and Simple Machines — question bank. MCQ keys are placed by the builder (balanced); AR keys planned: a b c d a c.
// Every numerical is computed here, interpolated into stem and solution, and re-solved by the check passed to add().
import { mk, add, r, near, dec } from './lib.mjs';

const { mcq, ar, tf, fill, match, num, short, long, part } = mk;
const g = 9.8;
const p3 = (x) => Number(x.toPrecision(3));
const p2 = (x) => Number(x.toPrecision(2));

// ---------------------------------------------------------------- t01 work done by a force
add('chk-work', mcq({
  stem: 'A waiter carries a tray of tea horizontally across a hall at a steady speed. The work done on the tray by the upward force of his hand is:',
  right: 'zero, because the force is at right angles to the displacement',
  wrong: ['positive, because he is walking', 'negative, because gravity pulls the tray down', 'equal to the weight of the tray multiplied by the distance walked'],
  sol: 'His hand pushes the tray upward but the tray moves sideways. The angle between force and displacement is 90°, so $\\cos 90^\\circ = 0$ and the work is zero — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('hold-mcq', mcq({
  stem: 'A weightlifter holds a heavy barbell motionless above his head for 5 seconds. The work he does on the barbell during these 5 seconds is:',
  right: 'zero, because the barbell has no displacement',
  wrong: ['equal to the weight of the barbell multiplied by 5', 'positive, because he applies a large force', 'negative, because the barbell is heavy'],
  sol: 'Work needs a displacement. The barbell does not move, so the work done on it is zero however large the force — option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
add('neg-mcq', mcq({
  stem: 'A brake block presses on the rim of a spinning bicycle wheel and slows it down. The work done by the friction force of the block on the rim is:',
  right: 'negative, because the force opposes the motion of the rim',
  wrong: ['positive, because the wheel stops', 'zero, because the rim does not move away', 'positive, because friction is a contact force'],
  sol: 'The friction force acts opposite to the motion of the rim, so the angle is 180° and the work is negative. It takes kinetic energy away from the wheel — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('circ-mcq', mcq({
  stem: 'A stone tied to a string is whirled in a horizontal circle at constant speed. The work done by the pull of the string on the stone in one full turn is:',
  right: 'zero, because the pull is always at right angles to the motion',
  wrong: ['positive, because the string pulls inward', 'negative, because the stone returns to the start', 'equal to the pull multiplied by the circumference of the circle'],
  sol: 'The string pulls towards the centre while the stone moves along the tangent. The angle is 90° at every instant, so the work is zero — option (@K).',
  d: 2, c: 'analysis', t: [1],
}));
add('area-mcq', mcq({
  stem: 'On a graph of force against displacement, a horizontal straight line at 8 N runs from 0 to 5.0 m. The work done is:',
  right: '40 J',
  wrong: ['13 J', '1.6 J', '20 J'],
  sol: r`Work is the area under the graph, a rectangle of height 8 N and width 5.0 m: $8 \times 5.0 = 40$ J — option (@K). (@1) adds the numbers, and (@3) is the area of a triangle.`,
  d: 2, c: 'application', t: [1],
}), () => 8 * 5 === 40 || 'area');
add('work-tf', tf({
  stem: 'Riya pushes a trolley 4 m north and Arjun pushes an identical trolley 4 m east with the same force along the motion. Their works point in different directions, so work is a vector.',
  key: 'f',
  sol: 'False. Both do the same work, because work has only a size (with a sign) and no direction. It is a scalar, although it is found from two vectors, force and displacement.',
  d: 2, c: 'understanding', t: [1],
}));
add('ar-neg', ar({
  a: 'The work done by friction on a sliding box is negative.',
  r: 'The friction force acts in the direction opposite to the displacement of the box.',
  key: 'a',
  sol: 'The angle between the friction force and the displacement is 180°, and $\\cos 180^\\circ = -1$, so the work is negative. R gives exactly this reason — option (a).',
  d: 2, c: 'understanding', t: [1],
}));
add('work-angle-num', (() => {
  const F = 400, s = 25, c = 0.5;
  const W = F * s * c;
  return num({
    stem: r`A farmer pulls a plough with a rope that makes an angle of 60° with the level ground. The pull is ${F} N and the plough moves ${s} m. Using $\cos 60^\circ = 0.50$, find the work done by the pull, in J.`,
    value: W, tol: 5, unit: 'J',
    sol: r`$W = Fs\cos\theta = ${F} \times ${s} \times 0.50 = ${W}$ J.`,
    scheme: [['Uses W = F s cos θ', 1], ['5000 J', 1]],
    marks: 2, d: 2, c: 'application', t: [1],
  });
})(), (q) => 400 * 25 * 0.5 === 5000 && q.answer.value === 5000 || 'angle work');
add('bucket-num', (() => {
  const m = 12, h = 8.5;
  const W = m * g * h;
  return num({
    stem: r`A girl draws a ${m} kg bucket of water up from a well ${h} m deep at a steady speed. Taking $g = ${g}\ \text{m s}^{-2}$, find the work she does on the bucket, in J.`,
    value: p3(W), tol: 2, unit: 'J',
    sol: r`At steady speed the pull equals the weight $mg$. $W = mgh = ${m} \times ${g} \times ${h} = ${dec(W, 4)}$ J.`,
    scheme: [['Pull = weight = mg', 1], ['W = mgh ≈ 1000 J (999.6 J)', 1]],
    marks: 2, d: 2, c: 'application', t: [1],
  });
})(), (q) => near(12 * 9.8 * 8.5, 999.6, 1e-9) && q.answer.value === 1000 || 'bucket');
add('hold-short', short({
  marks: 2,
  stem: 'A student holds a heavy water can still at arm’s length for one minute and feels tired. Has she done any work on the can in the science sense? Explain.',
  model: 'No work is done on the can. Work needs a displacement of the point where the force acts, and the can does not move. She feels tired only because her muscles are using energy inside her body to keep holding the weight, which is not work done on the can.',
  sol: 'No displacement, so no work.',
  scheme: [['No work: the can has no displacement', 1], ['Tiredness is due to muscle effort, not work on the can', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('neg-short', short({
  marks: 2,
  stem: 'A girl pushes a trolley forward along a floor against friction. Explain why her push does positive work and friction does negative work.',
  model: 'Her push acts in the same direction as the displacement, so the angle is 0° and cos 0° is 1, which makes the work positive. Friction acts opposite to the displacement, so the angle is 180° and cos 180° is −1, which makes its work negative.',
  sol: 'Angle 0° gives positive work; angle 180° gives negative work.',
  scheme: [['Push along the motion, angle 0°, positive work', 1], ['Friction opposite to motion, angle 180°, negative work', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('work-long', long({
  stem: '(a) Define work and the joule.\n\n(b) Explain, with a named everyday example each, when the work done by a force is positive, zero and negative.\n\n(c) A force of 50 N moves a block 3.0 m along its own direction while a friction force of 20 N acts against the motion. Find the work done by each force and the net work.',
  model: (() => {
    const F = 50, f = 20, s = 3.0;
    return r`Work is the product of the force and the displacement along the force, $W = Fs\cos\theta$. One joule is the work done when a force of 1 N moves a body 1 m along the force. The work is positive when the force acts with the motion, as when a boy pushes a cart forward. It is zero when there is no displacement or the force is at right angles to the motion, as for a girl carrying a bag along a level road. It is negative when the force opposes the motion, as for friction on a sliding box. In (c) the push does $${F} \times ${s} = ${F * s}$ J and friction does $-${f} \times ${s} = -${f * s}$ J, so the net work is ${F * s - f * s} J.`;
  })(),
  sol: 'Definition; three cases with examples; +150 J, −60 J, net 90 J.',
  scheme: [['(a) Definition of work and of the joule', 1], ['(b) Positive, zero and negative work with examples', 2], ['(c) +150 J, −60 J and net work 90 J', 2]],
  d: 2, c: 'application', t: [1],
}), () => 50 * 3 === 150 && 20 * 3 === 60 && 150 - 60 === 90 || 'work-long');
add('ramp-case', mk.case({
  passage: r`A student pulls a loaded trolley along a level table with a spring balance. The force is kept constant in each stage and read from the balance.

| Stage | Force (N) | Distance moved (m) |
|---|---|---|
| First | 6.0 | 2.0 |
| Second | 3.5 | 4.0 |`,
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'The work done by the pull in the first stage is:',
      right: '12 J',
      wrong: ['8.0 J', '3.0 J', '24 J'],
      sol: r`$W = Fs = 6.0 \times 2.0 = 12$ J, the area of the first rectangle on a force–displacement graph — option (@K).`,
      d: 2, c: 'application', t: [1],
    })),
    part('b', short({
      marks: 1, wl: null,
      stem: 'Find the work done in the second stage, in J.',
      model: r`$W = 3.5 \times 4.0 = 14$ J.`,
      sol: 'W = Fs = 14 J.',
      scheme: [['14 J', 1]],
      d: 2, c: 'application', t: [1],
    })),
    part('c', short({
      marks: 2, wl: null,
      stem: 'Find the total work done over the whole 6.0 m and the average force over this distance.',
      model: r`Total work $= 12 + 14 = 26$ J. Average force $= 26 / 6.0 = 4.3$ N.`,
      sol: 'Total 26 J; average force 26 ÷ 6.0 ≈ 4.3 N.',
      scheme: [['Total work 26 J', 1], ['Average force ≈ 4.3 N', 1]],
      d: 3, c: 'application', t: [1],
    }), [
      short({
        marks: 2, wl: null,
        stem: 'Describe the force–displacement graph for the two stages and say what its total area represents.',
        model: 'The graph is two steps: a rectangle 6.0 N high from 0 to 2.0 m, then a lower rectangle 3.5 N high from 2.0 m to 6.0 m. The total area under both rectangles is the total work done, 26 J.',
        sol: 'Two rectangles; total area is the work.',
        scheme: [['Two rectangular steps of the given heights and widths', 1], ['Total area equals the work done, 26 J', 1]],
        d: 3, c: 'analysis', t: [1],
      }),
    ]),
  ],
}), () => 6 * 2 === 12 && 3.5 * 4 === 14 && near(26 / 6, 4.33, 0.005) || 'ramp-case');

// ---------------------------------------------------------------- t02 kinetic and potential energy; work–energy theorem
add('chk-ke', mcq({
  stem: 'A scooter and its rider speed up from 20 km/h to 40 km/h on a straight road. Their kinetic energy becomes:',
  right: 'four times as large',
  wrong: ['twice as large', 'half as large', 'the same'],
  sol: r`$\text{KE} = \tfrac{1}{2}mv^2$ depends on the square of the speed. Doubling the speed gives $2^2 = 4$ times the KE — option (@K).`,
  d: 2, c: 'application', t: [2],
}));
add('chk-wet', mcq({
  stem: 'While a force acts on a trolley, its kinetic energy rises from 20 J to 50 J. The net work done on the trolley is:',
  right: '30 J',
  wrong: ['70 J', '−30 J', '2.5 J'],
  sol: 'By the work–energy theorem, net work = final KE − initial KE = $50 - 20 = 30$ J — option (@K). (@2) has the wrong sign: the KE increased, so the net work is positive.',
  d: 2, c: 'application', t: [2],
}), () => 50 - 20 === 30 || 'wet');
add('ke-mcq', mcq({
  stem: 'A 1 kg ball and a 4 kg ball have the same kinetic energy. The ratio of the speed of the 1 kg ball to the speed of the 4 kg ball is:',
  right: '2 : 1',
  wrong: ['1 : 2', '4 : 1', '1 : 1'],
  sol: r`$\tfrac{1}{2}m_1v_1^2 = \tfrac{1}{2}m_2v_2^2$, so $v_1/v_2 = \sqrt{m_2/m_1} = \sqrt{4} = 2$. The ratio is 2 : 1 — option (@K).`,
  d: 3, c: 'analysis', t: [2],
}), () => near(Math.sqrt(4 / 1), 2, 1e-9) || 'ke ratio');
add('pe-mcq', mcq({
  stem: r`A coconut of mass 0.50 kg hangs from a branch 8.0 m above the ground. Taking $g = 9.8\ \text{m s}^{-2}$, its potential energy with respect to the ground is:`,
  right: '39.2 J',
  wrong: ['4.0 J', '78.4 J', '3.9 J'],
  sol: r`$\text{PE} = mgh = 0.50 \times 9.8 \times 8.0 = 39.2$ J — option (@K).`,
  d: 2, c: 'application', t: [2],
}), () => near(0.5 * g * 8, 39.2, 1e-9) || 'pe');
add('wet-mcq', mcq({
  stem: 'A trolley of mass 0.50 kg speeds up from 2.0 m s⁻¹ to 6.0 m s⁻¹ on a smooth track. The net work done on it is:',
  right: '8.0 J',
  wrong: ['4.0 J', '1.0 J', '16 J'],
  sol: r`Net work $= \tfrac{1}{2}m(v^2 - u^2) = \tfrac{1}{2} \times 0.50 \times (36 - 4) = 8.0$ J — option (@K). (@1) uses $v - u$ in place of $v^2 - u^2$.`,
  d: 3, c: 'application', t: [2],
}), () => near(0.5 * 0.5 * (36 - 4), 8, 1e-9) || 'wet');
add('lift-mcq', mcq({
  stem: 'A box of mass m is raised slowly, at constant speed, through a height h. The work done by the lifting force is mgh because:',
  right: 'the lifting force is equal to the weight mg and acts along the displacement h',
  wrong: ['the lifting force is much larger than mg during the lift', 'the displacement is at right angles to the weight', 'the kinetic energy of the box increases by mgh'],
  sol: 'At constant speed the net force is zero, so the pull equals the weight $mg$ and points along the displacement $h$: $W = mg \\times h$ — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('ke-tf', tf({
  stem: 'A body of constant mass moving along a straight road at constant velocity has constant kinetic energy.',
  key: 't',
  sol: 'True. Kinetic energy $\\tfrac{1}{2}mv^2$ depends only on the mass and the speed, and both stay constant.',
  d: 1, c: 'understanding', t: [2],
}));
add('ke-fill', fill({
  stem: 'The energy possessed by a body because of its motion is called ___ energy.',
  acc: [['kinetic']],
  sol: 'It is **kinetic** energy, equal to $\\tfrac{1}{2}mv^2$.',
  d: 1, c: 'recall', t: [2],
}));
add('ar-ke', ar({
  a: 'When the speed of a car is doubled, its kinetic energy becomes four times as large.',
  r: 'Kinetic energy is a scalar quantity.',
  key: 'b',
  sol: 'A is true because $\\text{KE} = \\tfrac{1}{2}mv^2$ depends on $v^2$. R is also true, but being a scalar does not explain the factor of four — option (b).',
  d: 3, c: 'analysis', t: [2],
}));
add('ar-pe', ar({
  a: 'The potential energy of a flowerpot on a balcony depends on the level that we choose as the zero level.',
  r: 'The potential energy of every body is zero at all heights.',
  key: 'c',
  sol: 'A is true: $mgh$ is measured from a chosen reference level, so the value changes with that choice. R is false, because the potential energy is zero only at the reference level — option (c).',
  d: 2, c: 'understanding', t: [2],
}));
add('ke-num', (() => {
  const m = 0.16, v = 30;
  const K = 0.5 * m * v * v;
  return num({
    stem: r`A cricket ball of mass ${m} kg leaves the bat at ${v} m s⁻¹. Find its kinetic energy, in J.`,
    value: K, tol: 0.5, unit: 'J',
    sol: r`$\text{KE} = \tfrac{1}{2}mv^2 = \tfrac{1}{2} \times ${m} \times ${v}^2 = ${dec(K, 3)}$ J.`,
    scheme: [['KE = ½mv²', 1], ['72 J', 1]],
    marks: 2, d: 1, c: 'application', t: [2],
  });
})(), (q) => near(0.5 * 0.16 * 900, 72, 1e-9) && q.answer.value === 72 || 'ke');
add('stop-num', (() => {
  const m = 1500, v = 12, F = 6000;
  const K = 0.5 * m * v * v;
  const d = K / F;
  return num({
    stem: r`A car of mass ${m} kg moving at ${v} m s⁻¹ is stopped by a constant braking force of ${F} N. Using the work–energy theorem, find the distance it travels before stopping, in m.`,
    value: d, tol: 0.1, unit: 'm',
    sol: r`Initial KE $= \tfrac{1}{2} \times ${m} \times ${v}^2 = ${K}$ J. The braking work is $-F d$ and equals the change in KE: $-${F} d = -${K}$, so $d = ${K} / ${F} = ${dec(d, 3)}$ m.`,
    scheme: [['Initial KE 108 000 J', 1], ['Fd = KE, so d = 18 m', 1]],
    marks: 2, d: 3, c: 'application', t: [2],
  });
})(), (q) => near((0.5 * 1500 * 144) / 6000, 18, 1e-9) && q.answer.value === 18 || 'stop');
add('speed-short', short({
  marks: 2,
  stem: 'A truck moving at 60 km/h takes a much longer distance to stop than the same truck at 30 km/h with the same brakes. Explain using kinetic energy.',
  model: 'Kinetic energy is one half mv², so doubling the speed from 30 to 60 km/h makes the kinetic energy four times as large. The brakes must do four times as much work, and since the braking force is the same, the stopping distance is four times as long.',
  sol: 'KE is four times larger, so braking work and distance are four times larger.',
  scheme: [['Doubling the speed makes KE four times', 1], ['Four times the work needs four times the distance', 1]],
  d: 3, c: 'application', t: [2],
}));
add('derive-pe-short', short({
  marks: 3,
  stem: 'Show that the gravitational potential energy of a body of mass m raised steadily through a height h is mgh.',
  model: 'To raise the body at constant speed we must pull upward with a force equal to its weight, which is mg. The displacement h is in the direction of this force. The work done is the force multiplied by the displacement, so W equals mg times h. This work is stored in the body, so its potential energy is mgh.',
  sol: 'Force = weight mg, displacement h, so work mgh is stored.',
  scheme: [['Constant speed: the lifting force equals the weight mg', 1], ['Work = force × height = mg × h', 1], ['This work is stored, so PE = mgh', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('wet-short3', short({
  marks: 3,
  stem: 'State the work–energy theorem. Use it to explain why a fast train needs a longer distance to stop than a slow train when the braking force is the same.',
  model: 'The theorem says that the net work done on a body equals the change in its kinetic energy. A train stops when the work done by the brakes removes all its kinetic energy. A faster train has more kinetic energy, so the same braking force must act over a longer distance to do the larger amount of work.',
  sol: 'Net work equals change in KE; more KE needs more braking work, so more distance.',
  scheme: [['Theorem stated', 1], ['Braking work equals the KE removed', 1], ['More KE with the same force needs a longer distance', 1]],
  d: 3, c: 'application', t: [2],
}));
add('ke-long', long({
  stem: '(a) Define kinetic energy.\n\n(b) A net force F gives a body of mass m, starting from rest, a speed v in a distance s. Using F = ma and v² = 2as, derive the expression for its kinetic energy.\n\n(c) The speed of a 0.50 kg ball increases from 4.0 m s⁻¹ to 10 m s⁻¹. Find the work done on the ball.',
  model: (() => {
    const m = 0.5, u = 4, v = 10;
    const W = 0.5 * m * (v * v - u * u);
    return r`Kinetic energy is the energy a body has because it is moving; it is measured in joules. In (b), starting from rest, the third equation of motion $v^2 = 2as$ gives $s = v^2/2a$. The work done by the net force $F = ma$ over this distance is $W = Fs = ma \times v^2/2a = \tfrac{1}{2}mv^2$. The acceleration cancels, and the work done on the body is stored in it as kinetic energy. In (c), by the work–energy theorem, the work done on the ball equals the change in its kinetic energy: $W = \tfrac{1}{2} \times ${m} \times (${v}^2 - ${u}^2) = ${W}$ J. The speed rises, so the work done is positive.`;
  })(),
  sol: 'Definition; derivation KE = ½mv²; change in KE = 21 J.',
  scheme: [['(a) Definition of kinetic energy', 1], ['(b) Derivation using v² = 2as and F = ma', 2], ['(c) Change in KE = 21 J', 2]],
  d: 3, c: 'application', t: [2],
}), () => near(0.5 * 0.5 * (100 - 16), 21, 1e-9) || 'ke-long');
add('swing-case', mk.case({
  passage: r`In a park, a swing carries a child of mass 25 kg. Its highest point is 0.45 m above its lowest point. Ignore friction and air resistance, and take $g = 9.8\ \text{m s}^{-2}$.

| Position | Height above lowest point (m) |
|---|---|
| Highest point | 0.45 |
| Lowest point | 0 |`,
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'At the highest point of the swing, the child has:',
      right: 'maximum potential energy and zero kinetic energy',
      wrong: ['zero potential energy and maximum kinetic energy', 'maximum potential energy and maximum kinetic energy', 'zero potential energy and zero kinetic energy'],
      sol: 'At the highest point the swing stops for an instant, so the KE is zero and the height, hence the PE, is greatest — option (@K).',
      d: 1, c: 'understanding', t: [3],
    })),
    part('b', short({
      marks: 1, wl: null,
      stem: 'Find the potential energy of the child at the highest point relative to the lowest point, in J.',
      model: r`$\text{PE} = mgh = 25 \times 9.8 \times 0.45 = 110$ J.`,
      sol: 'PE = mgh ≈ 110 J.',
      scheme: [['≈ 110 J (110.25 J)', 1]],
      d: 2, c: 'application', t: [2],
    })),
    part('c', short({
      marks: 2, wl: null,
      stem: 'Find the speed of the child at the lowest point, in m s⁻¹.',
      model: r`At the lowest point all the PE has become KE: $\tfrac{1}{2} \times 25 \times v^2 = 110.25$, so $v^2 = 8.82$ and $v \approx 3.0\ \text{m s}^{-1}$.`,
      sol: 'KE at the lowest point = PE at the top, so v ≈ 3.0 m/s.',
      scheme: [['KE at the lowest point = 110 J', 1], ['v ≈ 3.0 m s⁻¹', 1]],
      d: 3, c: 'application', t: [3],
    }), [
      short({
        marks: 2,
        stem: 'A real swing slowly comes to rest unless the child keeps pushing. Explain this using energy.',
        model: 'Some mechanical energy changes into heat because of air resistance and friction at the hooks of the swing. The total mechanical energy therefore decreases, the swing rises less on each side, and it finally stops unless energy is added.',
        sol: 'Energy is lost as heat to friction and air.',
        scheme: [['Air resistance and friction change mechanical energy to heat', 1], ['Mechanical energy decreases, so the swing stops', 1]],
        d: 3, c: 'analysis', t: [3],
      }),
    ]),
  ],
}), () => near(25 * g * 0.45, 110.25, 1e-9) && near(Math.sqrt(2 * g * 0.45), 2.97, 0.005) || 'swing');

// ---------------------------------------------------------------- t03 conservation of energy; power
add('chk-cons', mcq({
  stem: 'A ball is thrown vertically upward. Ignoring air resistance, as it rises:',
  right: 'its kinetic energy decreases and its potential energy increases by the same amount',
  wrong: ['its kinetic energy and potential energy both increase', 'its kinetic energy increases and its potential energy decreases', 'its total mechanical energy decreases steadily'],
  sol: 'The ball slows down as it rises, so KE falls, while its height increases, so PE rises. With no air resistance the total stays constant, so the rise in PE equals the fall in KE — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('chk-power', mcq({
  stem: 'Two students of the same weight climb the same staircase. Rohan takes 20 s and Meena takes 30 s. Which statement is correct?',
  right: 'Rohan develops more power, because he does the same work in less time',
  wrong: ['Meena develops more power, because she takes longer', 'Rohan does more work than Meena', 'Both develop the same power because they do the same work'],
  sol: 'Both lift the same weight through the same height, so the work is the same. Power $= W/t$ is greater for the shorter time — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('cons-mcq', mcq({
  stem: 'At the extreme end of its swing, a pendulum bob has:',
  right: 'maximum potential energy and zero kinetic energy',
  wrong: ['zero potential energy and maximum kinetic energy', 'maximum potential energy and maximum kinetic energy', 'zero potential energy and zero kinetic energy'],
  sol: 'At the extreme end the bob is momentarily at rest and at its greatest height — option (@K).',
  d: 1, c: 'understanding', t: [3],
}));
add('trans-mcq', mcq({
  stem: 'In a hydroelectric power station the correct sequence of energy changes is:',
  right: 'potential energy of stored water → kinetic energy of falling water → kinetic energy of the turbine → electrical energy',
  wrong: ['kinetic energy of the turbine → potential energy of water → electrical energy → heat', 'electrical energy → kinetic energy of water → potential energy of water', 'chemical energy of water → heat → electrical energy'],
  sol: 'Water stored high up has potential energy. As it falls it gains kinetic energy, which turns the turbine, and the generator converts this to electrical energy — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('power-mcq', mcq({
  stem: 'Four motors do work as follows. Motor A: 600 J in 10 s. Motor B: 450 J in 5 s. Motor C: 1000 J in 20 s. Motor D: 300 J in 5 s. The motor with the greatest power is:',
  right: 'Motor B',
  wrong: ['Motor A', 'Motor C', 'Motor D'],
  sol: r`Power $= W/t$: A $= 60$ W, B $= 90$ W, C $= 50$ W, D $= 60$ W. Motor B has the greatest power — option (@K).`,
  d: 3, c: 'application', t: [3],
}), () => [600 / 10, 450 / 5, 1000 / 20, 300 / 5].join() === '60,90,50,60' || 'power');
add('kwh-mcq', mcq({
  stem: 'An electricity meter shows that a school used 0.50 kWh of energy. In joules this is:',
  right: r`$1.8 \times 10^{6}$ J`,
  wrong: [r`$1.8 \times 10^{3}$ J`, r`$7.2 \times 10^{6}$ J`, r`$3.6 \times 10^{6}$ J`],
  sol: r`$1\ \text{kWh} = 3.6 \times 10^6$ J, so $0.50\ \text{kWh} = 0.50 \times 3.6 \times 10^6 = 1.8 \times 10^6$ J — option (@K). (@3) is the energy for 1 kWh.`,
  d: 2, c: 'application', t: [3],
}), () => near(0.5 * 3.6e6, 1.8e6, 1e-9) || 'kwh');
add('ar-fall', ar({
  a: 'A freely falling ball gains kinetic energy as it falls.',
  r: 'The total mechanical energy of the ball increases during the fall.',
  key: 'c',
  sol: 'A is true: the speed grows, so the KE grows. R is false: the KE gained equals the PE lost, so the total mechanical energy stays constant — option (c).',
  d: 2, c: 'understanding', t: [3],
}));
add('energy-match', match({
  stem: 'Match each device or event (Column A) with its main energy change (Column B).',
  pairs: [
    ['A ceiling fan running', 'Electrical energy to kinetic energy'],
    ['A solar cell on a rooftop', 'Light energy to electrical energy'],
    ['A cooking gas burner', 'Chemical energy to heat and light'],
    ['A mango falling from a tree', 'Potential energy to kinetic energy'],
  ],
  order: [0, 1, 2, 3],
  sol: 'Each device changes one form of energy into another.',
  d: 2, c: 'understanding', t: [3],
}));
add('power-fill', fill({
  stem: 'The SI unit of power is the ___.',
  acc: [['watt', 'W']],
  sol: 'The SI unit of power is the **watt**, equal to one joule per second.',
  d: 1, c: 'recall', t: [3],
}));
add('pend-num', (() => {
  const h = 0.80;
  const v = Math.sqrt(2 * g * h);
  return num({
    stem: r`A pendulum bob is released from rest at a height of ${h.toFixed(2)} m above its lowest point. Ignoring air resistance and taking $g = ${g}\ \text{m s}^{-2}$, find its speed at the lowest point, in m s⁻¹.`,
    value: p3(v), tol: 0.03, unit: 'm s⁻¹',
    sol: r`By conservation of mechanical energy, $mgh = \tfrac{1}{2}mv^2$, so $v = \sqrt{2gh} = \sqrt{2 \times ${g} \times ${h.toFixed(2)}} = \sqrt{${dec(2 * g * h, 4)}} = ${dec(v, 3)}\ \text{m s}^{-1}$.`,
    scheme: [['mgh = ½mv², mass cancels', 1], ['v ≈ 3.96 m s⁻¹', 1]],
    marks: 2, d: 3, c: 'application', t: [3],
  });
})(), (q) => near(Math.sqrt(15.68), 3.96, 0.002) && q.answer.value === 3.96 || 'pend');
add('power-num', (() => {
  const m = 15, h = 3.6, t = 12;
  const W = m * g * h;
  const P = W / t;
  return num({
    stem: r`A boy carries ${m} kg of sand up a ladder to a roof ${h} m high in ${t} s. Taking $g = ${g}\ \text{m s}^{-2}$, find the power he develops against gravity, in W.`,
    value: p3(P), tol: 0.3, unit: 'W',
    sol: r`Work $= mgh = ${m} \times ${g} \times ${h} = ${dec(W, 4)}$ J. Power $= W/t = ${dec(W, 4)} / ${t} = ${dec(P, 3)}$ W.`,
    scheme: [['W = mgh = 529.2 J', 1], ['P = W/t = 44.1 W', 1]],
    marks: 2, d: 2, c: 'application', t: [3],
  });
})(), (q) => near((15 * 9.8 * 3.6) / 12, 44.1, 1e-9) && q.answer.value === 44.1 || 'power-num');
add('kwh-num', (() => {
  const tube = 40, fan = 75, nFan = 2, hrs = 6;
  const kwh = ((tube + nFan * fan) * hrs) / 1000;
  return num({
    stem: r`In a classroom one ${tube} W tube light and ${nFan} fans of ${fan} W each are switched on together for ${hrs} hours. Find the electrical energy used, in kWh.`,
    value: kwh, tol: 0.01, unit: 'kWh',
    sol: r`Total power $= ${tube} + ${nFan} \times ${fan} = ${tube + nFan * fan}$ W $= ${(tube + nFan * fan) / 1000}$ kW. Energy $= ${(tube + nFan * fan) / 1000} \times ${hrs} = ${dec(kwh, 3)}$ kWh.`,
    scheme: [['Total power 190 W = 0.19 kW', 1], ['Energy = 0.19 × 6 = 1.14 kWh', 1]],
    marks: 2, d: 2, c: 'application', t: [3],
  });
})(), (q) => near(((40 + 150) * 6) / 1000, 1.14, 1e-9) && q.answer.value === 1.14 || 'kwh-num');
add('conv-short', short({
  marks: 2,
  stem: 'A ball is thrown vertically upward and comes back to the thrower’s hand. Describe the energy changes during the journey, ignoring air resistance.',
  model: 'While the ball rises, its kinetic energy decreases and changes into potential energy, which is greatest at the top where the ball stops for a moment. While it falls, the potential energy changes back into kinetic energy. The total mechanical energy stays constant throughout.',
  sol: 'KE to PE on the way up, PE to KE on the way down; total constant.',
  scheme: [['KE changes to PE on the way up, PE greatest at the top', 1], ['PE changes back to KE on the way down; total constant', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('power-short', short({
  marks: 2,
  stem: 'Two cranes lift the same load through 10 m. Crane P takes 20 s and crane Q takes 40 s. Which crane has the greater power, and why?',
  model: 'Both cranes do the same work, because the load and the height are the same. Power is work divided by time. Crane P takes less time, so it does the work at a faster rate and has twice the power of crane Q.',
  sol: 'Same work, crane P takes less time, so greater power.',
  scheme: [['Both do the same work', 1], ['Crane P has the greater power since P = W/t and its time is less', 1]],
  d: 2, c: 'application', t: [3],
}));
add('transform-short', short({
  marks: 3,
  stem: 'State the energy change that takes place in (i) a ceiling fan, (ii) a solar cell, (iii) a loudspeaker.',
  model: 'In a ceiling fan electrical energy changes into kinetic energy of the rotating blades, with a small part lost as heat in the motor. In a solar cell the energy of sunlight, which is light energy, changes into electrical energy. In a loudspeaker electrical energy changes into the sound energy of the vibrating cone, which spreads through the air.',
  sol: 'Electrical to kinetic; light to electrical; electrical to sound.',
  scheme: [['(i) Electrical to kinetic', 1], ['(ii) Light to electrical', 1], ['(iii) Electrical to sound', 1]],
  d: 1, c: 'recall', t: [3],
}));
add('cons-long', long({
  stem: '(a) State the law of conservation of energy.\n\n(b) A mango falls freely from a branch. Describe how its potential energy and kinetic energy change, and what happens to their sum.\n\n(c) A 2.0 kg brick falls from the top of a house 12 m above the ground. Taking g = 9.8 m s⁻², find its speed when it is 4.0 m above the ground.',
  model: (() => {
    const m = 2.0, H = 12, h = 4.0;
    const v = Math.sqrt(2 * g * (H - h));
    return r`Energy cannot be created or destroyed. It can only change from one form to another, and the total remains constant. As the mango falls, its height decreases, so its potential energy decreases, while its speed increases, so its kinetic energy increases by the same amount; the sum stays constant if there is no air resistance. In (c) the brick has fallen ${H - h} m, so $\tfrac{1}{2}mv^2 = mg(${H} - ${h})$ and the mass cancels. $v = \sqrt{2 \times ${g} \times ${H - h}} = \sqrt{${dec(2 * g * (H - h), 4)}} = ${dec(v, 3)}\ \text{m s}^{-1}$.`;
  })(),
  sol: 'Law; PE falls as KE rises, sum constant; v ≈ 12.5 m/s.',
  scheme: [['(a) Law of conservation of energy', 1.5], ['(b) PE decreases, KE increases, sum constant', 1.5], ['(c) v = √(2 × 9.8 × 8.0) ≈ 12.5 m s⁻¹', 2]],
  d: 4, c: 'application', t: [3],
}), () => near(Math.sqrt(2 * 9.8 * 8), 12.52, 0.002) || 'cons-long');
add('power-long', long({
  stem: '(a) Define power and state its SI unit. Express one kilowatt hour in joules.\n\n(b) A water pump of power 1.5 kW lifts water to a tank 12 m above it. Assuming all the power is used to lift the water, find the mass of water raised in one minute (g = 9.8 m s⁻²).\n\n(c) What is the energy used by this pump in 2 hours, in kWh?',
  model: (() => {
    const P = 1500, t = 60, h = 12;
    const W = P * t;
    const m = W / (g * h);
    return r`Power is the rate of doing work, $P = W/t$, and its SI unit is the watt, one joule per second. One kilowatt hour is $1000 \times 3600 = 3.6 \times 10^6$ J. In (b), in one minute the pump does the work $W = Pt = ${P} \times ${t} = ${W}$ J. Since all of it is used to lift the water, this work equals $mgh$, so $m = ${W} / (${g} \times ${h}) = ${dec(m, 3)}$ kg of water is raised each minute. In (c) the energy used in 2 hours is the power in kilowatts multiplied by the time in hours, $1.5 \times 2 = 3.0$ kWh.`;
  })(),
  sol: 'Power definition and 3.6 × 10⁶ J; m ≈ 765 kg; 3.0 kWh.',
  scheme: [['(a) Definition, unit and 1 kWh = 3.6 × 10⁶ J', 1.5], ['(b) W = Pt = 90 000 J and m = W/gh ≈ 765 kg', 2.5], ['(c) 1.5 kW × 2 h = 3.0 kWh', 1]],
  d: 3, c: 'application', t: [3],
}), () => near(90000 / (9.8 * 12), 765.3, 0.002) && 1.5 * 2 === 3 || 'power-long');
add('power-case', mk.case({
  passage: r`A family in Pune records the use of four appliances in one day.

| Appliance | Power (W) | Time used (h) |
|---|---|---|
| Tube light | 40 | 5.0 |
| Fan | 70 | 8.0 |
| Geyser | 1500 | 0.50 |
| Television | 100 | 4.0 |`,
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'Which appliance uses the most energy in the day?',
      right: 'The geyser, with 0.75 kWh',
      wrong: ['The fan, with 0.56 kWh', 'The television, with 0.40 kWh', 'The tube light, with 0.20 kWh'],
      sol: r`Energy $= P \times t$: tube light $0.040 \times 5.0 = 0.20$ kWh, fan $0.070 \times 8.0 = 0.56$ kWh, geyser $1.5 \times 0.50 = 0.75$ kWh, television $0.100 \times 4.0 = 0.40$ kWh. The geyser is highest — option (@K).`,
      d: 2, c: 'application', t: [3],
    })),
    part('b', short({
      marks: 1, wl: null,
      stem: 'Find the energy used by the fan in the day, in kWh.',
      model: r`$0.070\ \text{kW} \times 8.0\ \text{h} = 0.56$ kWh.`,
      sol: 'E = Pt = 0.56 kWh.',
      scheme: [['0.56 kWh', 1]],
      d: 2, c: 'application', t: [3],
    })),
    part('c', short({
      marks: 2, wl: null,
      stem: 'Find the total energy used by the four appliances in the day, and the cost at ₹7 per kWh (an illustrative rate).',
      model: r`Total $= 0.20 + 0.56 + 0.75 + 0.40 = 1.91$ kWh. Cost $= 1.91 \times 7 = 13.37$ rupees, about ₹13.`,
      sol: 'Total 1.91 kWh; cost about ₹13.4.',
      scheme: [['Total energy 1.91 kWh', 1], ['Cost ≈ ₹13.4', 1]],
      d: 3, c: 'application', t: [3],
    }), [
      short({
        marks: 2,
        stem: 'The geyser has the largest power rating, yet the family’s fan uses nearly as much energy as it does. Explain this using E = P × t, and suggest one way to cut the bill.',
        model: 'Energy used depends on both the power and the time. The geyser has a high power but runs for only half an hour, while the fan has a small power but runs for eight hours. We can cut the bill by reducing the time for which the appliances run, for example by switching them off when they are not needed.',
        sol: 'E = P × t depends on both power and time.',
        scheme: [['Energy depends on power and time, not on power alone', 1], ['A sensible way of saving energy', 1]],
        d: 3, c: 'evaluation', t: [3],
      }),
    ]),
  ],
}), () => near(0.2 + 0.56 + 0.75 + 0.4, 1.91, 1e-9) && near(1.91 * 7, 13.37, 1e-9) || 'power-case');

// ---------------------------------------------------------------- t04 simple machines
add('chk-pulley', mcq({
  stem: 'An ideal block and tackle has 4 strands of rope supporting the load. To raise a load of 800 N, the effort needed is:',
  right: '200 N',
  wrong: ['3200 N', '800 N', '400 N'],
  sol: r`For an ideal system $\text{MA} = $ number of supporting strands $= 4$, so effort $= 800/4 = 200$ N — option (@K).`,
  d: 2, c: 'application', t: [4],
}), () => 800 / 4 === 200 || 'pulley');
add('lever-class-mcq', mcq({
  stem: 'A cook uses a pair of kitchen tongs to pick up a hot chapati. The tongs act as a lever of:',
  right: 'class III, because the effort is applied between the fulcrum and the load',
  wrong: ['class I, because the effort and load are on opposite sides of the fulcrum', 'class II, because the load is between the fulcrum and the effort', 'no class, because tongs are not levers'],
  sol: 'The two arms of the tongs are joined at one end, the fulcrum. The fingers press in the middle (effort) and the chapati is held at the far end (load). The effort lies between fulcrum and load, so it is class III — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('ma-mcq', mcq({
  stem: 'A lever raises a load of 450 N with an effort of 90 N. Its mechanical advantage is:',
  right: '5',
  wrong: ['0.2', '360', '40 500'],
  sol: r`$\text{MA} = \text{load}/\text{effort} = 450/90 = 5$ — option (@K). (@1) inverts the ratio.`,
  d: 1, c: 'application', t: [4],
}), () => 450 / 90 === 5 || 'ma');
add('effic-mcq', mcq({
  stem: 'A machine receives 500 J of work as input and delivers 400 J of useful work. Its efficiency is:',
  right: '80 %',
  wrong: ['125 %', '20 %', '100 %'],
  sol: r`Efficiency $= 400/500 \times 100 = 80\,\%$ — option (@K). (@1) divides the input by the output, which would give more than 100 %, impossible for a real machine.`,
  d: 2, c: 'application', t: [4],
}), () => near((400 / 500) * 100, 80, 1e-9) || 'effic');
add('machine-tf', tf({
  stem: 'A machine with a mechanical advantage of 4 delivers four times as much work as the work put into it.',
  key: 'f',
  sol: 'False. A machine cannot give out more work than it takes in. A mechanical advantage of 4 means a four times smaller effort, which moves through about four times the distance.',
  d: 2, c: 'understanding', t: [4],
}));
add('ma-fill', fill({
  stem: 'For a lever, mechanical advantage equals the effort arm divided by the ___ arm.',
  acc: [['load']],
  sol: 'MA = effort arm ÷ **load** arm.',
  d: 1, c: 'recall', t: [4],
}));
add('ar-eff', ar({
  a: 'A pulley system can have an efficiency of more than 100 % if its mechanical advantage is large.',
  r: 'A machine can never deliver more work than the work supplied to it.',
  key: 'd',
  sol: 'A is false: efficiency is useful output divided by input and cannot exceed 100 %. R is true, and it is the reason why A is false — option (d).',
  d: 3, c: 'analysis', t: [4],
}));
add('ar-pulley', ar({
  a: 'An ideal single movable pulley has a mechanical advantage of 2.',
  r: 'Two strands of rope share the weight of the load in a single movable pulley.',
  key: 'a',
  sol: 'Two strands support the load, so each carries half of it and the effort is half the load, MA $= 2$. R states the reason — option (a).',
  d: 2, c: 'understanding', t: [4],
}));
add('lever-match', match({
  stem: 'Match each tool or device (Column A) with its description (Column B).',
  pairs: [
    ['A seesaw with the pivot at its middle', 'Class I lever'],
    ['A nutcracker', 'Class II lever'],
    ['A fishing rod held in the hands', 'Class III lever'],
    ['A single fixed pulley on a well', 'Mechanical advantage of 1'],
  ],
  order: [0, 1, 2, 3],
  sol: 'The seesaw has its fulcrum between effort and load, the nutcracker has the load between fulcrum and effort, the rod has the effort between fulcrum and load, and a fixed pulley only changes direction.',
  d: 2, c: 'understanding', t: [4],
}));
add('lever-num', (() => {
  const load = 600, lArm = 0.40, eArm = 1.2;
  const ma = eArm / lArm;
  const E = load / ma;
  return num({
    stem: r`In a wheelbarrow the load of ${load} N acts ${lArm.toFixed(2)} m from the axle of the wheel (the fulcrum). The handles are held ${eArm.toFixed(1)} m from the axle. Find the effort needed to lift the load, in N.`,
    value: p3(E), tol: 1, unit: 'N',
    sol: r`$\text{MA} = \text{effort arm}/\text{load arm} = ${eArm} / ${lArm} = ${dec(ma, 3)}$. Effort $= \text{load}/\text{MA} = ${load} / ${dec(ma, 3)} = ${dec(E, 3)}$ N.`,
    scheme: [['MA = 1.2/0.40 = 3.0', 1], ['Effort = 600/3.0 = 200 N', 1]],
    marks: 2, d: 2, c: 'application', t: [4],
  });
})(), (q) => near(600 / (1.2 / 0.4), 200, 1e-9) && q.answer.value === 200 || 'lever-num');
add('eff-num', (() => {
  const n = 4, load = 600, effort = 190;
  const ma = load / effort;
  const eta = (ma / n) * 100;
  return num({
    stem: r`A block and tackle with ${n} strands supporting the load raises a load of ${load} N with an effort of ${effort} N. Taking the velocity ratio as the number of strands, find its efficiency, in per cent.`,
    value: p3(eta), tol: 0.2, unit: '%',
    sol: r`$\text{MA} = ${load} / ${effort} = ${dec(ma, 4)}$ and $\text{VR} = ${n}$. $\eta = \text{MA}/\text{VR} \times 100 = ${dec(ma, 4)} / ${n} \times 100 = ${dec(eta, 3)}\,\%$.`,
    scheme: [['MA = 600/190 and VR = 4', 1], ['η ≈ 78.9 %', 1]],
    marks: 2, d: 4, c: 'application', t: [4],
  });
})(), (q) => near((600 / 190 / 4) * 100, 78.9, 0.002) && q.answer.value === 78.9 || 'eff');
add('lever-short', short({
  marks: 2,
  stem: 'A wheelbarrow is used to carry sand. Name its class of lever, point out the fulcrum, load and effort, and say whether its mechanical advantage is more or less than 1.',
  model: 'A wheelbarrow is a class II lever. The fulcrum is the axle of the wheel, the load is the sand in the tray, which lies between the fulcrum and the handles, and the effort is applied at the handles. The effort arm is longer than the load arm, so the mechanical advantage is more than 1.',
  sol: 'Class II; fulcrum at the wheel axle; MA more than 1.',
  scheme: [['Class II, with fulcrum, load and effort identified', 1], ['Effort arm longer than load arm, so MA > 1', 1]],
  d: 2, c: 'application', t: [4],
}));
add('machine-short', short({
  marks: 2,
  stem: 'A crowbar has a mechanical advantage of 8. Does it give out more work than the work put into it? Explain with distances.',
  model: 'No. The effort needed is one eighth of the load, but the effort has to move through eight times the distance moved by the load. The work done by the effort is the same size as the useful work on the load, apart from some loss due to friction, so no extra work is obtained.',
  sol: 'Small effort moves a larger distance; work out is not more than work in.',
  scheme: [['Effort is smaller but moves a proportionally larger distance', 1], ['Work output is not more than work input', 1]],
  d: 4, c: 'analysis', t: [4],
}));
add('classes-short', short({
  marks: 3,
  stem: 'Distinguish between class I, class II and class III levers by the position of the fulcrum, load and effort. Give one example of each.',
  model: 'In a class I lever the fulcrum lies between the effort and the load, as in a seesaw. In a class II lever the load lies between the fulcrum and the effort, as in a wheelbarrow. In a class III lever the effort lies between the fulcrum and the load, as in a pair of tongs.',
  sol: 'Position of fulcrum, load and effort for each class, with examples.',
  scheme: [['Class I with example', 1], ['Class II with example', 1], ['Class III with example', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('efficiency-short', short({
  marks: 3,
  stem: 'Define the efficiency of a machine. Why is the efficiency of every real machine less than 100 %? Give two causes.',
  model: 'Efficiency is the useful work output divided by the work input, expressed as a percentage. It is less than 100 % because some of the input energy is wasted. One cause is friction between moving parts, which changes some energy into heat. Another is the weight of the moving parts, such as the lower pulley and the rope, which must also be lifted.',
  sol: 'Output over input; friction and weight of parts waste energy.',
  scheme: [['Definition of efficiency', 1], ['Friction changes energy to heat', 1], ['Weight of moving parts uses some of the work', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('machines-long', long({
  stem: '(a) Define mechanical advantage. Write its relation for a lever in terms of the arms.\n\n(b) Name the three classes of lever and give one example of each.\n\n(c) A class I lever raises a load of 750 N with an effort of 150 N. The load arm is 0.20 m. Find the mechanical advantage and the effort arm.',
  model: (() => {
    const L = 750, E = 150, la = 0.2;
    const ma = L / E;
    const ea = ma * la;
    return r`Mechanical advantage is the load divided by the effort. For a lever it equals the effort arm divided by the load arm. In a class I lever the fulcrum is between the effort and the load, as in a seesaw. In class II the load is in the middle, as in a wheelbarrow, and in class III the effort is in the middle, as in tongs. In (c) $\text{MA} = ${L}/${E} = ${ma}$. The effort arm is $\text{MA} \times \text{load arm} = ${ma} \times ${la} = ${ea}$ m.`;
  })(),
  sol: 'MA definition and lever relation; three classes; MA = 5; effort arm 1.0 m.',
  scheme: [['(a) Definition and the relation with the arms', 1.5], ['(b) Three classes with examples', 1.5], ['(c) MA = 5 and effort arm = 1.0 m', 2]],
  d: 3, c: 'application', t: [4],
}), () => 750 / 150 === 5 && near(5 * 0.2, 1.0, 1e-9) || 'machines-long');
add('machine-case', mk.case({
  passage: r`In a school laboratory a student sets up a block and tackle with 3 strands supporting the load. She records:

| Quantity | Value |
|---|---|
| Load | 24 N |
| Effort | 10 N |
| Distance the load rises | 0.30 m |
| Distance the effort moves | 0.90 m |`,
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'The mechanical advantage of this block and tackle is:',
      right: '2.4',
      wrong: ['0.42', '14', '3.0'],
      sol: r`$\text{MA} = \text{load}/\text{effort} = 24/10 = 2.4$ — option (@K). (@3) is the velocity ratio, not the mechanical advantage.`,
      d: 2, c: 'application', t: [4],
    })),
    part('b', short({
      marks: 1, wl: null,
      stem: 'Find the velocity ratio from the distances recorded.',
      model: r`$\text{VR} = 0.90 / 0.30 = 3.0$, equal to the number of strands.`,
      sol: 'VR = effort distance ÷ load distance = 3.0.',
      scheme: [['VR = 3.0', 1]],
      d: 2, c: 'application', t: [4],
    })),
    part('c', short({
      marks: 2, wl: null,
      stem: 'Find the work output, the work input and the efficiency of the machine.',
      model: r`Output $= 24 \times 0.30 = 7.2$ J. Input $= 10 \times 0.90 = 9.0$ J. Efficiency $= 7.2/9.0 \times 100 = 80\,\%$.`,
      sol: 'Output 7.2 J; input 9.0 J; 80 %.',
      scheme: [['Output 7.2 J and input 9.0 J', 1], ['Efficiency 80 %', 1]],
      d: 3, c: 'application', t: [4],
    }), [
      short({
        marks: 2,
        stem: 'The efficiency is less than 100 %. Give two reasons why the student did not get all the input work back as useful work.',
        model: 'Friction between the rope and the pulley wheels changes some of the energy into heat. The lower pulley and its hook also have weight, so part of the effort is used to lift them as well as the load.',
        sol: 'Friction; weight of the moving pulley.',
        scheme: [['Friction in the pulleys', 1], ['Weight of the lower pulley and rope', 1]],
        d: 3, c: 'evaluation', t: [4],
      }),
    ]),
  ],
}), () => near(24 / 10, 2.4, 1e-9) && near(0.9 / 0.3, 3, 1e-9) && near((24 * 0.3) / (10 * 0.9), 0.8, 1e-9) || 'machine-case');
