// ch05 Force and Laws of Motion — question bank. MCQ keys are placed by the builder (balanced); AR keys planned: a b c d a c.
// Every numerical is computed here, interpolated into stem and solution, and re-solved by the check passed to add().
import { mk, add, r, near, dec } from './lib.mjs';

const { mcq, ar, tf, fill, match, num, short, long, part } = mk;
const g = 9.8;
const p3 = (x) => Number(x.toPrecision(3));
const p2 = (x) => Number(x.toPrecision(2));

// ---------------------------------------------------------------- t01 balanced and unbalanced forces; friction
add('chk-bal', mcq({
  stem: 'A trolley on a smooth horizontal floor is moving at a steady 2 m/s in a straight line. The net force on it is:',
  right: 'zero, because balanced forces do not change the velocity',
  wrong: ['2 N, in the direction of motion', 'zero, because the trolley is at rest', 'large, because the trolley is moving'],
  sol: 'The velocity is constant in size and direction, so there is no acceleration and the forces are balanced: the net force is zero — option (@K). The trolley is moving, so (@2) is wrong, and a moving body does not need a net force to keep its velocity.',
  d: 2, c: 'understanding', t: [1],
}));
add('net-mcq', mcq({
  stem: 'Two men pull a stuck jeep: one with 500 N towards the east and the other with 350 N towards the west, both along the same line. The net force on the jeep is:',
  right: '150 N towards the east',
  wrong: ['850 N towards the east', '150 N towards the west', 'zero'],
  sol: 'Forces in opposite directions along one line subtract: $500 - 350 = 150$ N, in the direction of the larger force, the east — option (@K). Adding gives (@1), which is the case only when both pull the same way.',
  d: 2, c: 'application', t: [1],
}), () => 500 - 350 === 150 || 'net');
add('chk-fric', mcq({
  stem: 'A girl pushes a heavy almirah with a force of 40 N, but it does not move. The force of friction between the almirah and the floor is:',
  right: '40 N, opposite to her push',
  wrong: ['zero, because nothing moves', 'more than 40 N, in the direction of her push', 'less than 40 N, opposite to her push'],
  sol: 'The almirah stays at rest, so the net force is zero. The static friction must therefore equal her push of 40 N and act opposite to it — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('ball-bearing-mcq', mcq({
  stem: 'The shaft of a ceiling fan turns on small steel balls (ball bearings). This helps because it replaces:',
  right: 'sliding friction by the much smaller rolling friction',
  wrong: ['rolling friction by sliding friction', 'friction by inertia', 'static friction by the weight of the fan'],
  sol: 'Rolling friction is much smaller than sliding friction, so balls between the shaft and its holder reduce friction and wear — option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
add('friction-small-mcq', mcq({
  stem: 'Of static friction, sliding friction and rolling friction on the same surfaces, the smallest is:',
  right: 'rolling friction',
  wrong: ['static friction at its maximum', 'sliding friction', 'all three are equal'],
  sol: 'Rolling friction is the smallest of the three, which is why wheels make it easier to move heavy loads — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('friction-tf', tf({
  stem: 'Friction always acts in the same direction as the motion of a body.',
  key: 'f',
  sol: 'False. Friction acts opposite to the motion, or to the attempted motion, of the surfaces.',
  d: 1, c: 'understanding', t: [1],
}));
add('newton-fill', fill({
  stem: 'The SI unit of force is the ___.',
  acc: [['newton', 'N']],
  sol: 'The SI unit of force is the **newton** (N), equal to 1 kg m s⁻².',
  d: 1, c: 'recall', t: [1, 3],
}));
add('fric-ar', ar({
  a: 'The force of friction between a sliding box and the floor acts opposite to the direction in which the box slides.',
  r: 'Friction is a force that always helps a body to move faster.',
  key: 'c',
  sol: 'A is true: friction opposes the relative motion of the surfaces. R is false, because friction opposes motion and tends to slow a sliding body — option (c).',
  d: 2, c: 'understanding', t: [1],
}));
add('cart-num', (() => {
  const m = 40, pull = 150, fr = 90;
  const net = pull - fr;
  const a = net / m;
  return num({
    stem: r`A farmer in Punjab pulls a loaded cart of mass ${m} kg along a level lane with a horizontal force of ${pull} N. The friction on the cart is ${fr} N. Find the acceleration of the cart, in m s⁻².`,
    value: p2(a), tol: 0.05, unit: 'm s⁻²',
    sol: r`Net force $= ${pull} - ${fr} = ${net}$ N forward. By the second law $a = F/m = ${net} / ${m} = ${dec(a, 2)}\ \text{m s}^{-2}$.`,
    scheme: [['Net force 150 − 90 = 60 N', 1], ['a = F/m = 1.5 m s⁻²', 1]],
    marks: 2, d: 2, c: 'application', t: [1, 3],
  });
})(), (q) => near(60 / 40, 1.5, 1e-9) && q.answer.value === 1.5 || 'cart');
add('almirah-short', short({
  marks: 2,
  stem: 'It is harder to get a heavy almirah to start sliding than to keep it sliding once it is moving. Explain this using the idea of friction.',
  model: 'Before the almirah moves, static friction rises to match the push, up to a maximum value. Once the almirah starts to slide, the friction drops to the smaller sliding friction. So a bigger push is needed to start the motion than to keep it moving at a steady speed.',
  sol: 'Maximum static friction is larger than sliding friction.',
  scheme: [['Static friction rises up to a maximum', 1], ['Sliding friction is smaller, so less force keeps it moving', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('hockey-short', short({
  marks: 2,
  stem: 'A hockey stick hits a ball rolling across the field and sends it off in a new direction at a greater speed. Name two effects of a force that are seen here and say whether the forces on the ball were balanced.',
  model: 'The force of the stick changes the speed of the ball and also changes its direction of motion. These changes of velocity happen only when the forces on a body are unbalanced, so the forces on the ball during the hit were not balanced, and there was a net force on it.',
  sol: 'Speed and direction change; net force not zero.',
  scheme: [['Change of speed and change of direction', 1], ['Unbalanced forces, net force not zero', 1]],
  d: 2, c: 'application', t: [1],
}));
add('rolling-short', short({
  marks: 2,
  stem: 'A football rolling on a grass field slows down and stops although nobody touches it. Name the force responsible and say what this shows about balanced and unbalanced forces.',
  model: 'Friction between the ball and the grass acts opposite to the motion and slows the ball down. This force is not balanced by any other horizontal force, so the net force is not zero and the velocity of the ball keeps changing until it stops.',
  sol: 'Friction acts opposite to motion; unbalanced force changes velocity.',
  scheme: [['Friction opposes the motion', 1], ['Unbalanced force, so the velocity changes', 1]],
  d: 2, c: 'application', t: [1],
}));
add('friction3-short', short({
  marks: 3,
  stem: 'Friction is useful in some places and harmful in others. Give two examples of increasing friction and one example of reducing friction, each with a method.',
  model: 'We increase friction on the soles of shoes and on tyres by cutting grooves, which gives a better grip on the road. We also increase it by sprinkling sand on a wet or oily road so that vehicles do not slip. We reduce friction in a bicycle wheel or a machine by oiling the moving parts or by using ball bearings.',
  sol: 'Grooves, sand; lubricant or ball bearings.',
  scheme: [['Grooves on tyres or shoes', 1], ['Sand on a slippery road', 1], ['Lubricant or ball bearings to reduce friction', 1]],
  d: 2, c: 'application', t: [1],
}));
add('friction-long', long({
  stem: '(a) What is friction? Name its three kinds in order of increasing size, taking the maximum value of static friction.\n\n(b) A block is pushed with a gradually increasing force until it slides. Describe how the friction changes.\n\n(c) State two advantages and two disadvantages of friction.',
  model: 'Friction is the force that opposes the relative motion, or the attempt at motion, between two surfaces in contact. In order of increasing size the kinds are rolling friction, sliding friction and the maximum static friction. In (b) the block at first stays at rest, and the friction is equal to the push and grows with it. At the maximum static value the block begins to slide and the friction falls to the smaller sliding value. In (c) friction lets us walk, grip objects and brake vehicles; but it wears out machine parts and wastes energy as heat.',
  sol: 'Definition and order; static friction rises then falls to sliding value; two advantages and two disadvantages.',
  scheme: [['(a) Definition and the order of the three kinds', 1.5], ['(b) Friction rises with the push, then falls on sliding', 2], ['(c) Two advantages and two disadvantages', 1.5]],
  d: 3, c: 'understanding', t: [1],
}));
add('friction-case', mk.case({
  passage: r`A student pushes a wooden block of mass 4.0 kg along a level table with a spring balance and records what happens.

| Push (N) | 5 | 10 | 15 | 20 |
|---|---|---|---|---|
| State of the block | at rest | at rest | at rest | just about to slide |

Once the block is sliding, a push of 14 N is enough to keep it moving at a steady speed.`,
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'When the push is 10 N and the block is at rest, the friction on the block is:',
      right: '10 N, opposite to the push',
      wrong: ['zero', '20 N, opposite to the push', '14 N, in the direction of the push'],
      sol: 'The block is at rest, so the net force is zero. Static friction equals the push: 10 N, opposite to it — option (@K).',
      d: 2, c: 'application', t: [1],
    })),
    part('b', short({
      marks: 1,
      stem: 'What is the sliding friction on the block?',
      model: 'The sliding friction is 14 N, because at steady speed the push equals the friction.',
      sol: 'Steady speed means zero net force, so friction = push = 14 N.',
      scheme: [['14 N', 1]],
      d: 2, c: 'application', t: [1],
    })),
    part('c', short({
      marks: 2, wl: null,
      stem: 'The block is now pushed with 24 N while sliding. Find its acceleration.',
      model: r`Net force $= 24 - 14 = 10$ N, so $a = F/m = 10 / 4.0 = 2.5\ \text{m s}^{-2}$.`,
      sol: 'Net force 10 N; a = F/m.',
      scheme: [['Net force 10 N', 1], ['a = 2.5 m s⁻²', 1]],
      d: 3, c: 'application', t: [1, 3],
    }), [
      short({
        marks: 2, wl: null,
        stem: 'Suggest two ways to reduce the friction between the block and the table.',
        model: 'Put a layer of oil or powder between the block and the table, or place the block on rollers or small wheels so that rolling friction replaces sliding friction.',
        sol: 'Lubricate, or replace sliding by rolling.',
        scheme: [['A lubricant (oil or powder)', 1], ['Rollers or wheels', 1]],
        d: 2, c: 'application', t: [1],
      }),
    ]),
  ],
}), null);

// ---------------------------------------------------------------- t02 first law and inertia
add('chk-inertia', mcq({
  stem: 'A loaded truck and an empty auto-rickshaw both move at the same speed. Which statement is correct?',
  right: 'The truck has greater inertia, because its mass is greater',
  wrong: ['The auto-rickshaw has greater inertia, because it is lighter', 'Both have the same inertia, because their speeds are equal', 'Inertia depends only on the speed of the body'],
  sol: 'Mass is the measure of inertia, and the truck has the greater mass, so it has the greater inertia and is harder to stop — option (@K). Inertia does not depend on speed.',
  d: 1, c: 'understanding', t: [2],
}));
add('card-mcq', mcq({
  stem: 'A coin is placed on a card resting on a glass tumbler. The card is flicked away sharply with a finger. The coin drops into the tumbler because of:',
  right: 'its inertia of rest, so it does not move with the card',
  wrong: ['the friction between the coin and the card, which pulls it down', 'its inertia of motion, which carries it sideways', 'the force the finger exerts on the coin'],
  sol: 'The coin is at rest and tends to remain at rest when the card moves away quickly. With nothing under it, gravity pulls it into the tumbler — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('steady-mcq', mcq({
  stem: 'A puck slides on very smooth ice at a steady 5 m/s in a straight line. By the first law, the net force on it is:',
  right: 'zero',
  wrong: ['5 N forward', 'equal to the weight of the puck', 'equal to the speed multiplied by the mass'],
  sol: 'A body moves in a straight line at constant velocity only if the net force on it is zero — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('inertia-tf', tf({
  stem: 'A body moving at a constant velocity in a straight line must have a net force acting on it in the direction of motion.',
  key: 'f',
  sol: 'False. By the first law a body continues in uniform straight-line motion when the net force on it is zero. A net force is needed only to change the velocity.',
  d: 2, c: 'understanding', t: [2],
}));
add('inertia-fill', fill({
  stem: 'The property of a body to resist a change in its state of rest or of uniform motion is called ___.',
  acc: [['inertia']],
  sol: 'This property is **inertia**; mass is its measure.',
  d: 1, c: 'recall', t: [2],
}));
add('bus-ar', ar({
  a: 'A passenger standing in a bus tends to fall backward when the bus suddenly starts moving.',
  r: 'The passenger’s feet move forward with the floor, while the upper body tends to remain at rest because of inertia.',
  key: 'a',
  sol: 'The feet are carried forward by the floor but the upper body, with inertia of rest, stays behind, so the person tilts backward. R explains A — option (a).',
  d: 2, c: 'understanding', t: [2],
}));
add('inertia-match', match({
  stem: 'Match each situation (Column A) with the idea of inertia that explains it (Column B).',
  pairs: [
    ['Dust falls out of a carpet beaten with a stick', 'Inertia of rest'],
    ['A rider is thrown forward when a bicycle hits a speed breaker', 'Inertia of motion'],
    ['Water splashes outward from a bucket swung round at a bend in a game', 'Inertia of direction'],
    ['A loaded lorry takes longer to stop than an empty one', 'Greater mass, greater inertia'],
  ],
  order: [0, 1, 2, 3],
  sol: 'The dust stays at rest, the rider keeps moving forward, the water keeps going straight, and more mass means more inertia.',
  d: 2, c: 'understanding', t: [2],
}));
add('cycle-short', short({
  marks: 2,
  stem: 'A cyclist on a flat road stops pedalling and the cycle gradually slows and stops. Does this contradict the first law? Explain.',
  model: 'No. The first law says a body keeps moving at a steady speed only when no net force acts on it. After the cyclist stops pedalling, friction at the wheels and air resistance still act against the motion. They form an unbalanced force that slows the cycle, so the first law is followed.',
  sol: 'Friction and air resistance are unbalanced forces.',
  scheme: [['No, the first law is not contradicted', 0.5], ['Friction and air resistance act as an unbalanced force', 1], ['Net force slows the cycle', 0.5]],
  d: 3, c: 'analysis', t: [2, 1],
}));
add('sand-short', short({
  marks: 2,
  stem: 'A person standing in a moving auto-rickshaw is thrown towards the left when the driver takes a sharp right turn. Explain this with inertia.',
  model: 'Before the turn the person is moving straight ahead with the auto. When the auto turns right, the person’s body tends to keep moving in the original straight direction because of inertia of direction. Relative to the auto, the person is therefore thrown towards the left.',
  sol: 'Inertia of direction.',
  scheme: [['Body tends to keep its straight-line direction', 1], ['So the person moves left relative to the turning auto', 1]],
  d: 2, c: 'application', t: [2],
}));
add('mass-inertia-short', short({
  marks: 3,
  stem: 'State the first law of motion. How is inertia related to mass? Give one example in which a person with a smaller mass is easier to stop than one with a greater mass.',
  model: 'The first law says that a body stays at rest, or keeps moving in a straight line at a steady speed, unless an unbalanced external force acts on it. Inertia is the tendency to resist a change in this state, and mass is its measure: the greater the mass, the greater the inertia. For example, a boy on a bicycle is easier to stop than a loaded truck moving at the same speed.',
  sol: 'First law; mass measures inertia; a lighter body is easier to stop.',
  scheme: [['First law stated in full', 1], ['Mass is the measure of inertia', 1], ['A suitable example', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('inertia-short3', short({
  marks: 3,
  stem: 'Explain, with the kind of inertia involved, (a) why a rider is thrown forward when a scooter hits a speed breaker and stops suddenly, (b) why a tablecloth can be pulled from under plates with a quick tug.',
  model: 'In (a) the rider was moving with the scooter. The scooter stops suddenly but the rider’s body tends to keep moving forward because of inertia of motion, so she is thrown forward. In (b) the plates are at rest on the cloth. A quick tug does not give them time to move, and inertia of rest keeps them in place, so the cloth slides out.',
  sol: 'Inertia of motion for the rider; inertia of rest for the plates.',
  scheme: [['(a) Inertia of motion explains the forward throw', 1.5], ['(b) Inertia of rest keeps the plates in place', 1.5]],
  d: 2, c: 'application', t: [2],
}));
add('inertia-long', long({
  stem: '(a) State the first law of motion and define inertia.\n\n(b) Name the three kinds of inertia and give one everyday example of each.\n\n(c) Why is a loaded truck harder to stop than a motorbike moving at the same speed?',
  model: 'The first law states that a body remains at rest, or in uniform motion along a straight line, unless an unbalanced external force acts on it. Inertia is the property of a body to resist any change in this state. There are three kinds. Inertia of rest: dust falls out of a carpet when it is beaten. Inertia of motion: passengers lurch forward when a bus brakes. Inertia of direction: passengers lean outward when the bus takes a sharp turn. A loaded truck has a much greater mass than a motorbike, and mass is the measure of inertia, so it resists the change in its motion more and needs a greater force or more time to stop.',
  sol: 'First law and inertia; three kinds with examples; mass measures inertia.',
  scheme: [['(a) First law and inertia', 1.5], ['(b) Three kinds with examples', 2], ['(c) Greater mass, greater inertia', 1.5]],
  d: 2, c: 'understanding', t: [2],
}));
add('trolley-case', mk.case({
  passage: r`In a school laboratory two trolleys of mass 2.0 kg and 8.0 kg are pushed on a smooth level track, each starting from rest and each pulled by the same steady net force of 16 N for 3.0 s.

| Trolley | Mass (kg) | Net force (N) |
|---|---|---|
| A | 2.0 | 16 |
| B | 8.0 | 16 |`,
  d: 3, c: 'analysis',
  children: [
    part('a', mcq({
      stem: 'Which trolley has the greater inertia?',
      right: 'Trolley B, because it has the greater mass',
      wrong: ['Trolley A, because it speeds up more', 'Both, because the same force acts on them', 'Neither, because the track is smooth'],
      sol: 'Mass measures inertia, and trolley B has the greater mass — option (@K). Trolley A speeds up more because it has less inertia, not more.',
      d: 2, c: 'understanding', t: [2],
    })),
    part('b', short({
      marks: 1, wl: null,
      stem: 'Find the acceleration of trolley A.',
      model: r`$a = F/m = 16 / 2.0 = 8.0\ \text{m s}^{-2}$.`,
      sol: 'a = F/m.',
      scheme: [['8.0 m s⁻²', 1]],
      d: 2, c: 'application', t: [3],
    })),
    part('c', short({
      marks: 2, wl: null,
      stem: 'Find the speed of trolley B after 3.0 s.',
      model: r`$a = 16 / 8.0 = 2.0\ \text{m s}^{-2}$; from rest $v = at = 2.0 \times 3.0 = 6.0\ \text{m s}^{-1}$.`,
      sol: 'Acceleration then v = at.',
      scheme: [['a = 2.0 m s⁻²', 1], ['v = 6.0 m s⁻¹', 1]],
      d: 3, c: 'application', t: [3],
    }), [
      short({
        marks: 2, wl: null,
        stem: 'Compare the momenta of the two trolleys after 3.0 s.',
        model: r`Trolley A: $v = 8.0 \times 3.0 = 24\ \text{m s}^{-1}$ and $p = 2.0 \times 24 = 48\ \text{kg m s}^{-1}$. Trolley B: $p = 8.0 \times 6.0 = 48\ \text{kg m s}^{-1}$. The momenta are equal, since the same force acted for the same time.`,
        sol: 'Same impulse gives the same momentum.',
        scheme: [['Both momenta found: 48 kg m s⁻¹', 1.5], ['Equal, because the same impulse acts', 0.5]],
        d: 4, c: 'analysis', t: [3],
      }),
    ]),
  ],
}), null);

// ---------------------------------------------------------------- t03 momentum, second law, impulse
add('chk-newton', mcq({
  stem: 'The net force needed to give a 6.0 kg trolley an acceleration of 2.0 m s⁻² is:',
  right: '12 N',
  wrong: ['3.0 N', '8.0 N', '0.33 N'],
  sol: r`$F = ma = 6.0 \times 2.0 = 12$ N — option (@K). (@1) divides mass by acceleration and (@3) divides acceleration by mass.`,
  d: 1, c: 'application', t: [3],
}), () => 6 * 2 === 12 || 'newton');
add('weight-mcq', mcq({
  stem: r`The weight of a 50 kg boy on Earth, taking $g = 9.8\ \text{m s}^{-2}$, is the force that gives him the acceleration of free fall. It is:`,
  right: '490 N',
  wrong: ['50 N', '5.1 N', '4900 N'],
  sol: r`$W = mg = 50 \times 9.8 = 490$ N — option (@K). (@2) divides the mass by $g$.`,
  d: 2, c: 'application', t: [3],
}), () => near(50 * g, 490, 1e-9) || 'weight');
add('momentum-unit-mcq', mcq({
  stem: 'Which of these is the SI unit of momentum?',
  right: 'kg m s⁻¹',
  wrong: ['kg m s⁻²', 'N m', 'kg s m⁻¹'],
  sol: 'Momentum is mass times velocity, so its unit is kg × m s⁻¹ = kg m s⁻¹ — option (@K). The unit in (@1) is the newton.',
  d: 1, c: 'recall', t: [3],
}));
add('ratio-mcq', mcq({
  stem: 'The same net force acts separately on a 2 kg body and a 6 kg body, both starting from rest. The ratio of their accelerations (2 kg body : 6 kg body) is:',
  right: '3 : 1',
  wrong: ['1 : 3', '1 : 1', '9 : 1'],
  sol: r`$a = F/m$, so for the same force $a$ is inversely proportional to $m$: $a_1 : a_2 = 6 : 2 = 3 : 1$ — option (@K).`,
  d: 2, c: 'application', t: [3],
}), () => near((1 / 2) / (1 / 6), 3, 1e-9) || 'ratio');
add('momentum-cmp-mcq', mcq({
  stem: 'A bullet of mass 0.05 kg moves at 300 m s⁻¹ and a person of mass 60 kg walks at 2 m s⁻¹. Compare their momenta.',
  right: 'The walking person has the greater momentum',
  wrong: ['The bullet has the greater momentum', 'Both have equal momentum', 'The person has zero momentum because the speed is small'],
  sol: r`Bullet: $0.05 \times 300 = 15\ \text{kg m s}^{-1}$. Person: $60 \times 2 = 120\ \text{kg m s}^{-1}$. The person has the greater momentum — option (@K).`,
  d: 3, c: 'analysis', t: [3],
}), () => near(0.05 * 300, 15, 1e-9) && 60 * 2 === 120 || 'momcmp');
add('airbag-mcq', mcq({
  stem: 'In a collision the time over which a passenger stops is increased from 0.1 s to 0.5 s by an airbag. The change of momentum is the same. The average force on the passenger becomes:',
  right: 'one fifth of its earlier value',
  wrong: ['five times its earlier value', 'the same as before', 'zero'],
  sol: r`$F = \Delta p / t$, so with the same $\Delta p$ the force is inversely proportional to time. $0.1 / 0.5 = 1/5$ — option (@K).`,
  d: 3, c: 'application', t: [3],
}), () => near(0.1 / 0.5, 0.2, 1e-9) || 'airbag');
add('chk-impulse', mcq({
  stem: 'A fast cricket ball is caught first by a fielder with stiff hands and then by another who draws her hands back. For the second fielder the force on her hands is smaller because:',
  right: 'the ball takes longer to stop, so the same change of momentum takes place over a longer time',
  wrong: ['the ball loses less momentum', 'the ball has a smaller mass', 'the ball has a greater speed'],
  sol: 'The change of momentum is the same in both catches. Force $= \\Delta p / t$, so a longer stopping time means a smaller force — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('second-ar', ar({
  a: 'The same net force gives a smaller acceleration to a heavier body than to a lighter body.',
  r: 'For a given net force, the acceleration of a body is inversely proportional to its mass.',
  key: 'a',
  sol: 'From $a = F/m$ the acceleration falls as the mass rises, which is exactly what A says. R states this relation, so it explains A — option (a).',
  d: 2, c: 'understanding', t: [3],
}));
add('fielder-ar', ar({
  a: 'A fielder draws her hands back while catching a fast ball.',
  r: 'The momentum of a body is the product of its mass and its velocity.',
  key: 'b',
  sol: 'A is true and R is true, but R only defines momentum. It does not explain why the hands are drawn back, which is to increase the stopping time and reduce the force — option (b).',
  d: 3, c: 'analysis', t: [3],
}));
add('momentum-fill', fill({
  stem: 'The momentum of a body is the product of its mass and its ___.',
  acc: [['velocity']],
  sol: 'Momentum $p = mv$ is mass times **velocity**.',
  d: 1, c: 'recall', t: [3],
}));
add('force-num', (() => {
  const m = 1200, a = 2.5;
  const F = m * a;
  return num({
    stem: r`A car of mass ${m} kg pulls away from a traffic light with an acceleration of ${a.toFixed(1)} m s⁻². Find the net force on the car, in N.`,
    value: F, tol: 5, unit: 'N',
    sol: r`$F = ma = ${m} \times ${a} = ${F}$ N.`,
    scheme: [['Uses F = ma', 1], ['3000 N', 1]],
    marks: 2, d: 1, c: 'application', t: [3],
  });
})(), (q) => 1200 * 2.5 === 3000 && q.answer.value === 3000 || 'force');
add('mass-num', (() => {
  const F = 24, a = 0.80;
  const m = F / a;
  return num({
    stem: r`A net force of ${F} N gives a trolley an acceleration of ${a.toFixed(2)} m s⁻². Find the mass of the trolley, in kg.`,
    value: m, tol: 0.5, unit: 'kg',
    sol: r`$m = F/a = ${F} / ${a} = ${dec(m, 3)}$ kg.`,
    scheme: [['m = F/a', 1], ['30 kg', 1]],
    marks: 2, d: 2, c: 'application', t: [3],
  });
})(), (q) => near(24 / 0.8, 30, 1e-9) && q.answer.value === 30 || 'mass');
add('p-num', (() => {
  const m = 0.45, v = 20;
  const p = m * v;
  return num({
    stem: r`A football of mass ${m} kg is kicked and leaves the boot at ${v} m s⁻¹. Find its momentum, in kg m s⁻¹.`,
    value: p, tol: 0.05, unit: 'kg m s⁻¹',
    sol: r`$p = mv = ${m} \times ${v} = ${dec(p, 2)}\ \text{kg m s}^{-1}$.`,
    scheme: [['p = mv', 1], ['9.0 kg m s⁻¹', 1]],
    marks: 2, d: 1, c: 'application', t: [3],
  });
})(), (q) => near(0.45 * 20, 9, 1e-9) && q.answer.value === 9 || 'p');
add('catch-num', (() => {
  const m = 0.15, v = 20, t = 0.030;
  const F = (m * v) / t;
  return num({
    stem: r`A fielder catches a ball of mass ${m} kg moving at ${v} m s⁻¹ and brings it to rest in ${t.toFixed(3)} s. Find the average force on her hands, in N.`,
    value: p3(F), tol: 1, unit: 'N',
    sol: r`Change of momentum $= ${m} \times ${v} = ${dec(m * v, 2)}\ \text{kg m s}^{-1}$. $F = \Delta p / t = ${dec(m * v, 2)} / ${t} = ${dec(F, 3)}$ N.`,
    scheme: [['Change of momentum 3.0 kg m s⁻¹', 1], ['F = Δp/t = 100 N', 1]],
    marks: 2, d: 3, c: 'application', t: [3],
  });
})(), (q) => near((0.15 * 20) / 0.03, 100, 1e-9) && q.answer.value === 100 || 'catch');
add('car-stop-num', (() => {
  const m = 1500, v = 20, t = 4.0;
  const F = (m * v) / t;
  return num({
    stem: r`A car of mass ${m} kg moving at ${v} m s⁻¹ is brought to rest uniformly in ${t.toFixed(1)} s. Find the average braking force, in N.`,
    value: F, tol: 10, unit: 'N',
    sol: r`$a = (0 - ${v}) / ${t} = -${v / t}\ \text{m s}^{-2}$. $F = ma = ${m} \times (-${v / t}) = -${F}$ N, so the braking force is ${F} N. (Check with $\Delta p / t = ${m * v} / ${t} = ${F}$ N.)`,
    scheme: [['Finds a = −5.0 m s⁻² or Δp = 30 000 kg m s⁻¹', 1], ['Braking force 7500 N', 1]],
    marks: 2, d: 3, c: 'application', t: [3],
  });
})(), (q) => near((1500 * 20) / 4, 7500, 1e-9) && q.answer.value === 7500 || 'carstop');
add('impulse-num', (() => {
  const F = 40, t = 0.25, m = 2.0;
  const v = (F * t) / m;
  return num({
    stem: r`A steady force of ${F} N acts for ${t.toFixed(2)} s on a ball of mass ${m.toFixed(1)} kg that is initially at rest. Find the speed of the ball afterwards, in m s⁻¹.`,
    value: v, tol: 0.05, unit: 'm s⁻¹',
    sol: r`Impulse $= Ft = ${F} \times ${t} = ${F * t}\ \text{N s}$ $= \Delta p = mv$, so $v = ${F * t} / ${m} = ${dec(v, 2)}\ \text{m s}^{-1}$.`,
    scheme: [['Impulse Ft = 10 N s', 1], ['v = 10/2.0 = 5.0 m s⁻¹', 1]],
    marks: 2, d: 3, c: 'application', t: [3],
  });
})(), (q) => near((40 * 0.25) / 2, 5, 1e-9) && q.answer.value === 5 || 'impulse');
add('law2-short', short({
  marks: 2,
  stem: 'State the second law of motion and use it to define the newton.',
  model: 'The rate of change of momentum of a body is proportional to the net force on it, and acts in the direction of the force. For constant mass this gives force equal to mass times acceleration. One newton is the force that gives a mass of one kilogram an acceleration of one metre per second squared.',
  sol: 'Law statement; F = ma; definition of the newton.',
  scheme: [['Second law stated', 1], ['Newton defined', 1]],
  d: 1, c: 'recall', t: [3],
}));
add('sand-pit-short', short({
  marks: 2,
  stem: 'Athletes in a long-jump event land in a pit of soft sand and not on hard ground. Explain why, using the idea of change of momentum.',
  model: 'The athlete’s momentum falls to zero on landing, on sand or on hard ground. Soft sand gives way and increases the time taken to stop, so the force on the legs, the change of momentum divided by the time, is much smaller. Hard ground stops the athlete almost at once, giving a large force.',
  sol: 'Same change of momentum, longer time, smaller force.',
  scheme: [['Same change of momentum', 0.5], ['Longer time on sand, so F = Δp/t is smaller', 1], ['Less risk of injury', 0.5]],
  d: 2, c: 'application', t: [3],
}));
add('derive-short', short({
  marks: 3,
  stem: 'A body of mass m changes its velocity from u to v in time t under a constant net force F. Starting from the second law in terms of momentum, show that F = ma.',
  model: r`The initial momentum is $mu$ and the final momentum is $mv$, so the change of momentum is $mv - mu = m(v - u)$. The rate of change of momentum is $\dfrac{m(v - u)}{t}$. By the second law this is proportional to $F$, and with the unit of force chosen as the newton the constant is 1. Since $\dfrac{v - u}{t} = a$, we get $F = ma$.`,
  sol: 'Rate of change of momentum m(v − u)/t = ma.',
  scheme: [['Change of momentum m(v − u)', 1], ['Rate of change = m(v − u)/t, proportional to F', 1], ['(v − u)/t = a, so F = ma', 1]],
  d: 3, c: 'understanding', t: [3],
}));
add('second-long', long({
  stem: '(a) Define momentum and state its SI unit.\n\n(b) State the second law of motion and show that it gives F = ma.\n\n(c) Why does the same net force produce a smaller acceleration in a heavier body? Support your answer with the graph of acceleration against force for two masses.',
  model: r`Momentum is the product of mass and velocity, $p = mv$, with unit kg m s⁻¹. The second law states that the rate of change of momentum is proportional to the net force and acts in its direction. For constant mass, the rate of change is $m(v - u)/t = ma$, so $F = ma$. Since $a = F/m$, for a given force the acceleration is inversely proportional to mass. On the graph of acceleration against force, both masses give straight lines through the origin, but the line for the greater mass is less steep, showing a smaller acceleration for the same force.`,
  sol: 'Momentum and unit; second law and F = ma; a = F/m with graph.',
  scheme: [['(a) Momentum and its unit', 1], ['(b) Second law and the proof of F = ma', 2], ['(c) a = F/m, less steep line for the greater mass', 2]],
  d: 3, c: 'understanding', t: [3],
}));
add('calc-long', long({
  stem: 'A force of 2400 N acts for 5.0 s on a car of mass 800 kg, starting from rest on a smooth level road. Ignore friction.\n\n(a) Find the acceleration of the car.\n\n(b) Find its speed after 5.0 s and its momentum then.\n\n(c) Show that the impulse of the force equals the momentum gained.',
  model: (() => {
    const F = 2400, m = 800, t = 5.0;
    const a = F / m;
    const v = a * t;
    const p = m * v;
    return r`The road is smooth, so the net force on the car is the given force of 2400 N. By the second law, the acceleration of the car is $a = F/m = ${F} / ${m} = ${dec(a, 2)}\ \text{m s}^{-2}$. Starting from rest, the speed after 5.0 s is $v = at = ${dec(a, 2)} \times 5.0 = ${dec(v, 3)}\ \text{m s}^{-1}$. The momentum is $p = mv = ${m} \times ${dec(v, 3)} = ${dec(p, 5)}\ \text{kg m s}^{-1}$. The impulse of the force is $Ft = ${F} \times 5.0 = ${F * t}\ \text{N s}$, the same number as the momentum gained. This is expected, because the car started from rest and the impulse of a force equals the change of momentum that it produces in the body.`;
  })(),
  sol: 'a = 3.0 m/s²; v = 15 m/s; p = 12 000 kg m/s; Ft = 12 000 N s.',
  scheme: [['(a) a = 3.0 m s⁻²', 1.5], ['(b) v = 15 m s⁻¹ and p = 12 000 kg m s⁻¹', 2], ['(c) Impulse 12 000 N s equals the change of momentum', 1.5]],
  d: 3, c: 'application', t: [3],
}), () => near(2400 / 800, 3, 1e-9) && near(3 * 5, 15, 1e-9) && near(800 * 15, 12000, 1e-9) && near(2400 * 5, 12000, 1e-9) || 'calc');
add('airbag-case', mk.case({
  passage: r`In a crash test a dummy of mass 60 kg, moving at 15 m s⁻¹, is brought to rest. Without an airbag it stops in 0.10 s against the hard dashboard. With an airbag it stops in 0.60 s.`,
  d: 4, c: 'analysis',
  children: [
    part('a', mcq({
      stem: 'The change of momentum of the dummy is:',
      right: 'the same in both cases, 900 kg m s⁻¹',
      wrong: ['smaller with the airbag', 'larger with the airbag', '90 kg m s⁻¹ in both cases'],
      sol: r`The momentum falls from $60 \times 15 = 900\ \text{kg m s}^{-1}$ to zero in both cases — option (@K). The airbag changes the time, not the change of momentum.`,
      d: 2, c: 'application', t: [3],
    })),
    part('b', short({
      marks: 1, wl: null,
      stem: 'Find the average force on the dummy without the airbag, in N.',
      model: r`$F = \Delta p / t = 900 / 0.10 = 9000$ N.`,
      sol: r`$900 / 0.10 = 9000$ N.`,
      scheme: [['9000 N', 1]],
      d: 3, c: 'application', t: [3],
    })),
    part('c', short({
      marks: 2, wl: null,
      stem: 'Find the average force with the airbag and compare it with the force without the airbag.',
      model: r`$F = 900 / 0.60 = 1500$ N. This is $9000 / 1500 = 6$ times smaller than without the airbag.`,
      sol: 'F = Δp/t = 1500 N; ratio 6.',
      scheme: [['F = 1500 N', 1], ['Six times smaller', 1]],
      d: 4, c: 'analysis', t: [3],
    }), [
      short({
        marks: 2,
        stem: 'Explain in words how the airbag reduces the risk of injury to a passenger.',
        model: 'The airbag inflates and cushions the passenger, so the passenger comes to rest over a longer time. The change of momentum is the same, but the force on the body is the change of momentum divided by the time, so a longer time means a smaller force and less injury.',
        sol: 'Longer stopping time, smaller force.',
        scheme: [['Stopping time is increased', 1], ['Force = change of momentum ÷ time is smaller', 1]],
        d: 3, c: 'understanding', t: [3],
      }),
    ]),
  ],
}), null);

// ---------------------------------------------------------------- t04 third law
add('chk-third', mcq({
  stem: 'A book rests on a table. The force of the book pressing down on the table is one force of an action–reaction pair. The other force of the pair is:',
  right: 'the upward push of the table on the book',
  wrong: ['the weight of the book acting on the book', 'the downward pull of the Earth on the table', 'the friction between the book and the table'],
  sol: 'The reaction to the book pressing on the table is the table pushing on the book, equal in size and opposite in direction, acting on a different body (the book) — option (@K).',
  d: 3, c: 'analysis', t: [4],
}));
add('pair-mcq', mcq({
  stem: 'A swimmer moves forward through water by pushing the water backward with her hands. The force that moves her forward is exerted by:',
  right: 'the water on her hands',
  wrong: ['her hands on the water', 'the Earth on the swimmer', 'the air above the water'],
  sol: 'Her hands push the water back (action) and the water pushes her hands forward (reaction). The force on the swimmer is the reaction, exerted by the water — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('rocket-mcq', mcq({
  stem: 'A rocket rises in space where there is no air to push against. It moves upward because:',
  right: 'the gas it throws out downward exerts an equal and opposite force upward on the rocket',
  wrong: ['the exhaust gas pushes against the air', 'its weight acts upward in space', 'the rocket is pulled by the Moon'],
  sol: 'The rocket pushes gas downward (action) and the gas pushes the rocket upward (reaction), so no air is needed — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('skater-mcq', mcq({
  stem: 'A light girl and a heavier boy stand on smooth ice, face to face and at rest. They push each other apart. Immediately afterwards:',
  right: 'they move with equal and opposite momenta, and the girl has the greater speed',
  wrong: ['they move with equal speeds in opposite directions', 'the boy has the greater momentum', 'only the girl moves'],
  sol: 'The forces on them are equal and opposite for the same time, so they gain equal and opposite momenta. Since $mv$ is equal and the girl has the smaller mass, her speed is greater — option (@K).',
  d: 3, c: 'analysis', t: [4],
}));
add('pair-ar', ar({
  a: 'The action and reaction forces cancel each other, because they are equal in size and opposite in direction.',
  r: 'The action and the reaction act on different bodies.',
  key: 'd',
  sol: 'A is false: forces cancel only if they act on the same body. R is true and is the reason A is false, because the two forces of a pair act on different bodies — option (d).',
  d: 3, c: 'analysis', t: [4],
}));
add('recoil-ar', ar({
  a: 'A gun recoils when a bullet is fired from it.',
  r: 'The bullet exerts no force on the gun.',
  key: 'c',
  sol: 'A is true. R is false: by the third law the bullet exerts an equal and opposite force on the gun, which produces the recoil — option (c).',
  d: 2, c: 'understanding', t: [4],
}));
add('third-tf', tf({
  stem: 'When a gun is fired, the momentum gained by the bullet is equal in size to the momentum gained by the gun, in the opposite direction.',
  key: 't',
  sol: 'True. The forces on the two bodies are equal and opposite and act for the same time, so their changes of momentum are equal and opposite.',
  d: 2, c: 'understanding', t: [4],
}));
add('third-match', match({
  stem: 'Match each action (Column A) with its reaction (Column B).',
  pairs: [
    ['Foot pushes the ground backward while walking', 'The ground pushes the foot forward'],
    ['Oar pushes water backward in a rowing boat', 'The water pushes the boat forward'],
    ['Rocket pushes exhaust gas downward', 'The gas pushes the rocket upward'],
    ['Gun pushes the bullet forward', 'The bullet pushes the gun backward'],
  ],
  order: [0, 1, 2, 3],
  sol: 'Each action has an equal and opposite reaction acting on the other body.',
  d: 2, c: 'understanding', t: [4],
}));
add('recoil-num', (() => {
  const mB = 0.015, vB = 300, mG = 3.0;
  const vG = (mB * vB) / mG;
  return num({
    stem: r`A rifle of mass ${mG.toFixed(1)} kg fires a bullet of mass ${mB} kg at ${vB} m s⁻¹. Find the recoil speed of the rifle, in m s⁻¹. (The rifle is initially at rest.)`,
    value: p2(vG), tol: 0.05, unit: 'm s⁻¹',
    sol: r`Momentum of the bullet $= ${mB} \times ${vB} = ${dec(mB * vB, 2)}\ \text{kg m s}^{-1}$. The rifle gets an equal momentum backward: $${mG} \times v = ${dec(mB * vB, 2)}$, so $v = ${dec(mB * vB, 2)} / ${mG} = ${dec(vG, 2)}\ \text{m s}^{-1}$.`,
    scheme: [['Bullet momentum 4.5 kg m s⁻¹', 1], ['Recoil speed 1.5 m s⁻¹', 1]],
    marks: 2, d: 3, c: 'application', t: [4],
  });
})(), (q) => near((0.015 * 300) / 3, 1.5, 1e-9) && q.answer.value === 1.5 || 'recoil');
add('skater-num', (() => {
  const mGirl = 40, mBoy = 60, vBoy = 1.0;
  const vGirl = (mBoy * vBoy) / mGirl;
  return num({
    stem: r`Two skaters stand at rest on smooth ice and push each other apart. The boy of mass ${mBoy} kg moves off at ${vBoy.toFixed(1)} m s⁻¹. Find the speed of the girl of mass ${mGirl} kg, in m s⁻¹.`,
    value: p2(vGirl), tol: 0.05, unit: 'm s⁻¹',
    sol: r`The momenta are equal and opposite: $${mGirl} \times v = ${mBoy} \times ${vBoy}$, so $v = ${mBoy * vBoy} / ${mGirl} = ${dec(vGirl, 2)}\ \text{m s}^{-1}$ in the opposite direction.`,
    scheme: [['Equal and opposite momenta: 60 × 1.0 = 60 kg m s⁻¹', 1], ['v = 1.5 m s⁻¹', 1]],
    marks: 2, d: 3, c: 'application', t: [4],
  });
})(), (q) => near((60 * 1.0) / 40, 1.5, 1e-9) && q.answer.value === 1.5 || 'skater');
add('tug-short', short({
  marks: 2,
  stem: 'In a tug of war, the rope pulls team A towards team B with a force of 600 N. What force does the rope exert on team B, and what law tells you? Why do the two forces not cancel?',
  model: 'The rope pulls team B with a force of 600 N in the opposite direction. This follows from Newton’s third law. The two forces do not cancel because they act on different bodies, one on each team, so each team can still move.',
  sol: 'Third law: equal and opposite; different bodies.',
  scheme: [['600 N opposite, by the third law', 1], ['Act on different bodies so they do not cancel', 1]],
  d: 3, c: 'application', t: [4],
}));
add('recoil-short', short({
  marks: 3,
  stem: 'Explain why a gun recoils when it fires a bullet, and why the recoil speed of the gun is much smaller than the speed of the bullet.',
  model: 'The gun exerts a forward force on the bullet. By the third law the bullet exerts an equal and opposite force on the gun, which makes the gun recoil. The two forces act for the same time, so the momentum gained by the gun is equal and opposite to that of the bullet. The gun has a much greater mass, so for the same momentum its speed is much smaller.',
  sol: 'Third law gives recoil; equal and opposite momentum; larger mass means smaller speed.',
  scheme: [['Equal and opposite force on the gun, by the third law', 1], ['Equal and opposite momentum', 1], ['Greater mass, so smaller speed', 1]],
  d: 3, c: 'understanding', t: [4],
}));
add('rocket-short', short({
  marks: 3,
  stem: 'Explain, using the third law, how a rocket moves upward. Say why it can also move in the empty space of the sky.',
  model: 'Burning fuel produces hot gas, and the rocket pushes this gas downward at high speed. By the third law the gas pushes the rocket upward with an equal and opposite force. This force acts on the rocket, which therefore accelerates upward. The reaction comes from the gas itself, not from the air, so the rocket can also move in space where there is no air.',
  sol: 'Rocket pushes gas down; gas pushes rocket up; no air needed.',
  scheme: [['Rocket pushes gas downward', 1], ['Gas pushes the rocket upward, equal and opposite', 1], ['No air is needed', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('walk-short', short({
  marks: 3,
  stem: 'Explain how a person is able to walk forward on the ground using the third law, and say why walking on smooth ice is difficult.',
  model: 'When we walk, the foot pushes the ground backward. By the third law the ground pushes the foot forward with an equal force, and this reaction moves us ahead. The push on the ground needs friction to grip. On smooth ice the friction is very small, so the foot slips, the reaction is small and walking becomes difficult.',
  sol: 'Foot pushes ground back; ground pushes forward; ice has little friction.',
  scheme: [['Foot pushes the ground backward', 1], ['Ground pushes the foot forward, by the third law', 1], ['Ice has little friction so the foot slips', 1]],
  d: 2, c: 'application', t: [4],
}));
add('third-long', long({
  stem: '(a) State Newton’s third law of motion.\n\n(b) Explain how the law works for (i) a swimmer and (ii) a rocket.\n\n(c) A bullet of mass 0.012 kg leaves a gun of mass 3.0 kg at 450 m s⁻¹. Find the speed at which the gun recoils.',
  model: (() => {
    const mB = 0.012, vB = 450, mG = 3.0;
    const p = mB * vB;
    return r`The third law states that to every action there is an equal and opposite reaction; the two forces act on different bodies. A swimmer pushes the water backward and the water pushes her forward. A rocket pushes burning gas downward and the gas pushes the rocket upward. For (c), the momentum of the bullet is $${mB} \times ${vB} = ${dec(p, 2)}\ \text{kg m s}^{-1}$. The gun gets an equal momentum backward, so $${mG} \times v = ${dec(p, 2)}$ and $v = ${dec(p / mG, 2)}\ \text{m s}^{-1}$, directed opposite to the bullet.`;
  })(),
  sol: 'Statement; swimmer and rocket pairs; recoil speed 1.8 m/s.',
  scheme: [['(a) Statement of the law', 1], ['(b) Both examples explained', 2], ['(c) Momentum 5.4 kg m s⁻¹ and recoil speed 1.8 m s⁻¹', 2]],
  d: 3, c: 'application', t: [4],
}), () => near(0.012 * 450, 5.4, 1e-9) && near(5.4 / 3, 1.8, 1e-9) || 'third-long');
add('boat-case', mk.case({
  passage: r`A boy of mass 40 kg stands at the edge of a boat of mass 120 kg floating at rest on still water. He jumps off the boat horizontally with a speed of 3.0 m s⁻¹ relative to the water, towards the shore. Ignore water resistance.`,
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'As the boy jumps towards the shore, the boat:',
      right: 'moves backward, away from the shore',
      wrong: ['moves forward, towards the shore', 'stays exactly at rest', 'moves upward'],
      sol: 'The boy pushes the boat backward and the boat pushes him forward with an equal force (third law), so the boat moves away from the shore — option (@K).',
      d: 2, c: 'application', t: [4],
    })),
    part('b', short({
      marks: 1, wl: null,
      stem: 'Find the speed of the boat after the jump, in m s⁻¹.',
      model: r`$120 \times v = 40 \times 3.0$, so $v = 1.0\ \text{m s}^{-1}$.`,
      sol: 'Equal and opposite momenta: 120 v = 120.',
      scheme: [['1.0 m s⁻¹', 1]],
      d: 3, c: 'application', t: [4],
    })),
    part('c', short({
      marks: 2, wl: null,
      stem: 'The push lasts 0.50 s. Find the average force on the boy.',
      model: r`The momentum gained by the boy is $40 \times 3.0 = 120\ \text{kg m s}^{-1}$, so $F = \Delta p / t = 120 / 0.50 = 240$ N.`,
      sol: 'F = Δp/t.',
      scheme: [['Δp = 120 kg m s⁻¹', 1], ['F = 240 N', 1]],
      d: 3, c: 'application', t: [3, 4],
    }), [
      short({
        marks: 2,
        stem: 'What is the size and direction of the average force on the boat during the push, and which law tells you?',
        model: 'The force on the boat is also 240 N, but directed backward, away from the shore. This follows from the third law: the boy and the boat exert equal and opposite forces on each other during the same time.',
        sol: 'Third law: equal and opposite, 240 N backward.',
        scheme: [['240 N directed backward', 1], ['Third law stated', 1]],
        d: 3, c: 'understanding', t: [4],
      }),
    ]),
  ],
}), null);
