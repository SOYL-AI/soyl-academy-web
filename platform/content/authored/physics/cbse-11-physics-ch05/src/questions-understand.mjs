// ch05 Work, Energy and Power — question bank, part 5: qualitative items (explain, predict, interpret) that need no calculation.
// They replaced eight application items so that the bank keeps an honest balance of understanding and application.
import { mk, add } from '../../cbse-11-physics-ch01/src/lib.mjs';

const { mcq, tf, short } = mk;

add('angle-mcq', mcq({
  stem: 'A farmer drags a loaded sled across a level field with a rope. The pull on the rope and the distance moved stay the same, but he raises his hands so that the rope makes a larger angle with the ground (still below 90°). The work done by the rope on the sled',
  right: 'decreases, because the component of the pull along the ground becomes smaller',
  wrong: ['increases, because the rope is now lifting the sled as well', 'stays the same, because the pull and the distance are unchanged', 'becomes zero, because the rope is no longer along the ground'],
  sol: 'The work is $Fd\\cos\\theta$. For a larger angle below $90^\\circ$ the cosine is smaller, so the same pull over the same distance does less work — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('kegraph-mcq', mcq({
  stem: 'In a laboratory a student measures the speed $v$ of a trolley of fixed mass $m$ at several instants and plots its kinetic energy $K$ against $v^2$. The graph is expected to be',
  right: 'a straight line through the origin, whose slope equals half the mass',
  wrong: ['a straight line through the origin, whose slope equals the mass', 'a parabola opening upward, with $K$ proportional to $v^4$', 'a horizontal line, because the mass does not change'],
  sol: 'Since $K = \\tfrac{1}{2}mv^2$, plotting $K$ against $v^2$ gives a straight line through the origin with slope $m/2$ — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('fxread-mcq', mcq({
  stem: 'A body moves in the +x direction from $x = 2$ m to $x = 5$ m under a force whose F–x graph lies entirely below the x-axis over this interval. During this interval the kinetic energy of the body',
  right: 'decreases, because the area under the graph is negative and so is the net work',
  wrong: ['increases, because the area under the graph is a positive quantity', 'stays constant, because the force is not zero', 'decreases only if the graph is a straight line'],
  sol: 'A force below the axis points in the −x direction, against the displacement, so the work is negative. By the work–energy theorem the kinetic energy falls, whatever the shape of the graph — option (@K).',
  d: 2, c: 'understanding', t: [1, 2],
}));
add('pwr-mcq', mcq({
  stem: 'Two electric hoists raise identical bricks from the ground to the same roof. Hoist A takes 20 s for a load and hoist B takes 30 s for the same load. Which statement is correct?',
  right: 'The work done is the same, but hoist A has the greater power',
  wrong: ['Hoist A does more work and so has the greater power', 'Hoist B does more work because it works for longer', 'The two hoists have equal power because the work is the same'],
  sol: 'The work equals the gain in potential energy, which is the same for both. Power is the rate of doing work, so the hoist that takes less time has more power — option (@K).',
  d: 1, c: 'understanding', t: [4],
}));
add('twod2-mcq', mcq({
  stem: 'Two identical balls collide on a smooth table, one being at rest before the collision. From a photograph it is found that, after the collision, the two balls move along paths exactly at right angles to each other. What can be concluded?',
  right: 'The collision was elastic: kinetic energy was conserved',
  wrong: ['The collision was perfectly inelastic: the balls stuck together', 'Momentum was not conserved in the collision', 'Both balls must have had the same speed after the collision'],
  sol: 'For identical masses, momentum conservation gives $\\vec u = \\vec v_1 + \\vec v_2$. If $\\vec v_1\\cdot\\vec v_2 = 0$ then $u^2 = v_1^2 + v_2^2$, which is the statement that kinetic energy is conserved. Stuck balls would not separate — option (@K).',
  d: 3, c: 'understanding', t: [4],
}));
add('gear-tf', tf({
  stem: 'A car whose engine delivers a fixed power can exert a larger driving force on the road when it is moving slowly than when it is moving fast.',
  key: 't',
  sol: 'True. Power $P = Fv$, so at fixed $P$ the driving force $F = P/v$ is larger at a lower speed; this is why a low gear is used to start and to climb.',
  d: 1, c: 'understanding', t: [4],
}));
add('cliff-short', short({
  marks: 2,
  stem: 'Three stones of the same mass are thrown with the same speed from the top of a cliff: one upward, one horizontally and one downward. Neglecting air resistance, compare the speeds with which they reach the ground and give the reason.',
  model: 'The three stones reach the ground with the same speed. Only gravity does work on each stone, and it is a conservative force, so the work depends only on the height drop and not on the path or direction. By the work–energy theorem each stone gains the same kinetic energy.',
  sol: 'Same speed: work depends only on height drop.',
  scheme: [['All three reach the ground with equal speeds', 1], ['Gravity is conservative: its work depends only on the height drop, so the change in kinetic energy is the same', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('stiff-short', short({
  marks: 2,
  stem: 'Two springs are stretched by the same extension, one of them being twice as stiff as the other. Which one stores more energy, and why? Which one needs more work to stretch it?',
  model: 'The stiffer spring stores more energy. The stored energy is half k x squared, so for the same extension it is proportional to the stiffness; the stiffer spring stores twice as much. Since the energy stored equals the work done in stretching, the stiffer spring also needs twice as much work.',
  sol: 'U = ½ k x², proportional to k at fixed x.',
  scheme: [['The stiffer spring stores more: U = ½ k x² is proportional to k for the same x', 1], ['Work done in stretching equals the energy stored, so the stiffer spring needs more work (twice as much)', 1]],
  d: 2, c: 'understanding', t: [3],
}));
