// ch06 question bank, part 2: t02 torque, angular momentum and its conservation (a few items also carry t04).
import { mk, add, r, near } from '../../cbse-11-physics-ch01/src/lib.mjs';
import { dec, v3, rad } from './data.mjs';

const { mcq, ar, tf, fill, num, short, long, part } = mk;
const p3 = (x, n = 3) => String(Number(x.toPrecision(n)));

add('torquezero-mcq', mcq({
  stem: 'A force of 30 N acts on the rim of a bicycle wheel that is free to turn about its axle. The torque of this force about the axle is zero when the force is',
  right: 'directed along a radius, towards or away from the axle',
  wrong: ['along the tangent to the rim', 'at 45° to the radius of the wheel', 'of any direction, if it is large enough'],
  sol: 'Torque = F d, where d is the perpendicular distance from the axle to the line of action. A radial force has a line of action through the axle, so d = 0 — option (@K).',
  d: 1, c: 'understanding', t: [2],
}));

add('unitL-mcq', mcq({
  stem: 'Which of these is the SI unit of the angular momentum of a spinning wheel?',
  right: 'kg m² s⁻¹',
  wrong: ['kg m s⁻¹', 'kg m² s⁻³', 'kg m s⁻²'],
  sol: 'L = m v r has units kg × (m s⁻¹) × m = kg m² s⁻¹ — option (@K).',
  d: 1, c: 'recall', t: [2],
}));

const dv = { I1: 14.0, w1: 1.5, I2: 3.5 };
dv.w2 = (dv.I1 * dv.w1) / dv.I2;
add('diver-mcq', mcq({
  stem: 'A diver leaves the board in the layout position with moment of inertia 14.0 kg m² about her somersault axis and an angular speed of 1.5 rad/s. She tucks, reducing the moment of inertia to 3.5 kg m². Her angular speed in the tuck is',
  right: `${dec(dv.w2, 2)} rad/s`,
  wrong: ['1.5 rad/s, unchanged', '0.38 rad/s', '21 rad/s'],
  sol: `Gravity gives no torque about her CM, so L = I ω is constant: ω₂ = 14.0 × 1.5/3.5 = ${dec(dv.w2, 2)} rad/s — option (@K).`,
  d: 2, c: 'application', t: [2],
}), () => near(dv.w2, 6, 1e-9) || 'dv');

add('lcon-ar', ar({
  a: 'A diver who tucks her body in mid-air spins faster.',
  r: 'The weight of the diver exerts a torque about her centre of mass that increases her angular speed.',
  key: 'c',
  sol: 'A is true: with no external torque L = Iω is constant, and tucking reduces I. R is false: the weight acts at the centre of mass, so its torque about the CM is zero — option (c).',
  d: 3, c: 'analysis', t: [2],
}));

add('lline-tf', tf({
  stem: 'A cricket ball flies in a straight line at constant velocity (air resistance neglected). Its angular momentum about the wicket-keeper’s gloves stays constant.',
  key: 't',
  sol: 'True. No force acts, so the torque about any point is zero and L = m v d is constant: the perpendicular distance d to the line of flight does not change.',
  d: 2, c: 'understanding', t: [2],
}));

add('taumom-tf', tf({
  stem: 'The total angular momentum of a system can change even when the net external torque is zero, because its parts can exert torques on each other.',
  key: 'f',
  sol: 'False. Internal torques occur in equal and opposite pairs and cancel, so only an external torque can change the total angular momentum.',
  d: 2, c: 'understanding', t: [2],
}));

add('tauext-fill', fill({
  stem: 'The rate of change of the total angular momentum of a system about a point equals the net ___ torque on it.',
  acc: [['external']],
  sol: 'Only the **external** torque counts; internal torques cancel in pairs.',
  d: 1, c: 'recall', t: [2],
}));

const ko = { r: 2.5, F: 420, th: 50 };
ko.tau = ko.r * ko.F * Math.sin(ko.th * rad);
add('kolhu-num', num({
  stem: 'A bullock yoked at the end of a 2.5 m long horizontal pole turns a sugar-cane crusher (kolhu). It pulls with 420 N at 50° to the pole. Find the torque about the vertical axis, in N m (3 significant figures).',
  value: v3(ko.tau), tol: 1, unit: 'N m',
  sol: r`$\tau = r F \sin\theta = 2.5 \times 420 \times \sin 50^\circ = ${dec(ko.tau, 3)}$ N m.`,
  scheme: [['τ = r F sin θ with θ = 50°', 1]],
  d: 2, c: 'application', t: [2],
}), (q) => near(ko.F * (ko.r * Math.sin(50 * rad)), q.answer.value, 2e-3) || 'ko');

const lc = { m: 0.25, r: 0.8, v: 6.0 };
lc.L = lc.m * lc.v * lc.r;
add('lcirc-num', num({
  stem: 'A 0.25 kg rubber ball on a 0.80 m string is whirled in a horizontal circle at 6.0 m/s. Find its angular momentum about the centre of the circle, in kg m²/s.',
  value: v3(lc.L), tol: 0.01, unit: 'kg m²/s',
  sol: r`The velocity is perpendicular to the radius, so $L = m v r = 0.25 \times 6.0 \times 0.80 = ${dec(lc.L, 3)}$ kg m$^2$/s.`,
  scheme: [['L = m v r', 1]],
  d: 1, c: 'application', t: [2],
}), (q) => near(lc.m * lc.r ** 2 * (lc.v / lc.r), q.answer.value, 1e-9) || 'lc');

const cb = { m: 0.16, v: 30, d: 1.2 };
cb.L = cb.m * cb.v * cb.d;
add('lline-num', num({
  stem: 'A 0.16 kg cricket ball flies at a steady 30 m/s along a straight line that passes 1.2 m from a point O. Find its angular momentum about O, in kg m²/s (3 significant figures).',
  value: v3(cb.L), tol: 0.01, unit: 'kg m²/s',
  sol: r`$L = m v d = 0.16 \times 30 \times 1.2 = ${dec(cb.L, 3)}$ kg m$^2$/s, the same at every point of its flight.`,
  scheme: [['Perpendicular distance 1.2 m gives L = m v d', 1], [`L = ${dec(cb.L, 3)} kg m²/s`, 1]],
  marks: 2, d: 2, c: 'application', t: [2],
}), (q) => near(cb.m * cb.v * cb.d, q.answer.value, 1e-3) || 'cb');

const dd = { L1: 4.0, L2: 16, t: 3.0 };
dd.tau = (dd.L2 - dd.L1) / dd.t;
add('dldt-num', num({
  stem: 'Under a constant torque the angular momentum of a flywheel about its axle rises from 4.0 kg m²/s to 16 kg m²/s in 3.0 s. Find the torque, in N m.',
  value: dd.tau, tol: 0.01, unit: 'N m',
  sol: r`$\tau = \dfrac{\Delta L}{\Delta t} = \dfrac{16 - 4.0}{3.0} = ${dec(dd.tau, 3)}$ N m.`,
  scheme: [['τ = ΔL/Δt', 1]],
  d: 1, c: 'application', t: [2],
}), (q) => near(dd.tau, q.answer.value, 1e-9) || 'dd');

const sx = { I0: 0.8, m: 2.0, r1: 0.9, r2: 0.3, w1: 2.0 };
sx.I1 = sx.I0 + 2 * sx.m * sx.r1 ** 2;
sx.I2 = sx.I0 + 2 * sx.m * sx.r2 ** 2;
sx.w2 = (sx.I1 * sx.w1) / sx.I2;
add('stool-num', num({
  stem: 'A girl on a frictionless rotating stool holds two 2.0 kg weights 0.90 m from the axis and turns at 2.0 rad/s. Her body and the stool together have a moment of inertia 0.80 kg m². She pulls the weights in to 0.30 m from the axis. Find her new angular speed, in rad/s (3 significant figures).',
  value: v3(sx.w2), tol: 0.02, unit: 'rad/s',
  sol: r`$I_1 = 0.80 + 2 \times 2.0 \times 0.90^2 = ${dec(sx.I1, 3)}$ kg m$^2$ and $I_2 = 0.80 + 2 \times 2.0 \times 0.30^2 = ${dec(sx.I2, 3)}$ kg m$^2$. With no external torque, $I_1\omega_1 = I_2\omega_2$: $\omega_2 = \dfrac{${dec(sx.I1, 3)} \times 2.0}{${dec(sx.I2, 3)}} = ${dec(sx.w2, 3)}$ rad/s.`,
  scheme: [['I₁ = 4.04 and I₂ = 1.16 kg m²', 1], ['I₁ω₁ = I₂ω₂', 1], [`ω₂ = ${dec(sx.w2, 3)} rad/s`, 1]],
  marks: 3, d: 3, c: 'application', t: [2],
}), (q) => near(sx.I1 * sx.w1, sx.I2 * sx.w2, 1e-9) && near(sx.I1, 4.04, 1e-9) && near(q.answer.value, sx.w2, 3e-3) || 'sx');

const wt = { tau: 12, t: 4.0, I: 8.0 };
wt.w = (wt.tau * wt.t) / wt.I;
add('wheel-num', num({
  stem: 'A stationary wheel of moment of inertia 8.0 kg m² about its axle receives a constant torque of 12 N m for 4.0 s. Find its angular speed at the end of that time, in rad/s.',
  value: wt.w, tol: 0.01, unit: 'rad/s',
  sol: r`$L = \tau t = 12 \times 4.0 = ${wt.tau * wt.t}$ kg m$^2$ s$^{-1}$ (starting from zero). $\omega = \dfrac{L}{I} = \dfrac{${wt.tau * wt.t}}{8.0} = ${dec(wt.w, 3)}$ rad/s.`,
  scheme: [['L = τ t = 48 kg m²/s', 1], [`ω = L/I = ${dec(wt.w, 3)} rad/s`, 1]],
  marks: 2, d: 2, c: 'application', t: [2, 4],
}), (q) => near(wt.w, q.answer.value, 1e-9) && near((wt.tau / wt.I) * wt.t, wt.w, 1e-9) || 'wt');

add('law-short', short({
  marks: 2,
  stem: 'State the law of conservation of angular momentum and use it to explain why a Kathak dancer spins faster when she draws her outstretched arms close to her body.',
  model: 'If the net external torque on a system is zero, its total angular momentum stays constant. With the arms drawn in, the moment of inertia I decreases; since $L = I\\omega$ is constant, the angular speed $\\omega$ must increase.',
  sol: 'No external torque: L constant; I down, ω up.',
  scheme: [['Statement: no external torque, L constant', 1], ['I decreases, so ω increases (Iω constant)', 1]],
  d: 2, c: 'understanding', t: [2],
}));

add('tail-short', short({
  marks: 2,
  stem: 'A single-rotor helicopter has a small rotor on its tail. Explain, using angular momentum, why the helicopter would spin without it.',
  model: 'Before take-off the angular momentum is zero. When the engine spins the main rotor one way, the rotor gains angular momentum; with no external torque the total must stay zero, so the body would spin the opposite way. The tail rotor’s thrust gives an opposing torque that stops this.',
  sol: 'Conservation of L: body turns opposite to the rotor.',
  scheme: [['Total L stays zero: rotor turns one way, body the opposite way', 1], ['Tail rotor provides the counter-torque', 1]],
  d: 3, c: 'application', t: [2],
}));

add('dldt-short3', short({
  marks: 3,
  stem: 'For a single particle of momentum $\\vec p$ at position $\\vec r$ from a point O, show that the torque of the force on it about O equals $d\\vec l/dt$, where $\\vec l = \\vec r \\times \\vec p$.',
  model: r`Differentiate $\vec l = \vec r \times \vec p$ with the product rule: $\dfrac{d\vec l}{dt} = \vec v \times \vec p + \vec r \times \dfrac{d\vec p}{dt}$. The first term is zero, because the velocity is parallel to the momentum and a vector crossed with a parallel vector vanishes. In the second term Newton’s second law says that the rate of change of momentum is the force, so it equals $\vec r \times \vec F$, the torque of the force about O. Hence the torque equals the rate of change of the angular momentum.`,
  sol: 'Product rule; v × p = 0; dp/dt = F.',
  scheme: [['Product rule on r × p', 1], ['v × p = 0 because p is parallel to v', 1], ['dp/dt = F gives r × F = τ', 1]],
  d: 3, c: 'understanding', t: [2],
}));

add('stoolke-short3', short({
  marks: 3,
  stem: 'A person on a frictionless rotating stool pulls two held weights towards the axis. State what happens to her angular speed and to the kinetic energy of rotation, and explain the source of any change in energy.',
  model: r`Her angular speed increases, because $I\omega$ is constant while $I$ decreases. The rotational kinetic energy can be written $K = L^2/2I$, so with $L$ constant and $I$ smaller, $K$ increases. The extra energy is not created: it comes from the work done by her muscles as they pull the weights inward against the pull needed to keep them moving in a circle.`,
  sol: 'ω up, K = L²/2I up; energy from muscular work.',
  scheme: [['ω increases: L = Iω constant, I falls', 1], ['K = L²/2I increases', 1], ['Extra energy supplied by her muscles', 1]],
  d: 3, c: 'understanding', t: [2, 4],
}));

const lg = { m: 0.5, v: 6.0, d: 2.0, tau: 4.0, t: 1.5 };
lg.L = lg.m * lg.v * lg.d;
lg.L2 = lg.L + lg.tau * lg.t;
add('ang-long', long({
  stem: '(a) Define the torque of a force about a point and the angular momentum of a particle about a point, giving the SI unit of each. [2] (b) State the law of conservation of angular momentum and the condition for it. [1] (c) A 0.50 kg ball moves at 6.0 m/s along a straight line passing 2.0 m from a point O. Find its angular momentum about O. A constant net torque of 4.0 N m about O, in the sense of the angular momentum, then acts for 1.5 s; find the new angular momentum. [2]',
  model: r`(a) The torque of a force about a point is the cross product $\vec\tau = \vec r \times \vec F$, of magnitude $rF\sin\theta$ and unit newton metre. The angular momentum of a particle is the cross product $\vec l = \vec r \times \vec p$, of magnitude $mvr\sin\theta$ and unit kg m$^2$ s$^{-1}$. (b) When the net external torque on a system is zero, its total angular momentum remains constant. (c) The angular momentum is $L = mvd = 0.50 \times 6.0 \times 2.0 = ${dec(lg.L, 3)}$ kg m$^2$/s. The torque equals the rate of change of angular momentum, so the increase is torque times time, $4.0 \times 1.5 = ${dec(lg.tau * lg.t, 3)}$, and the new value is $${dec(lg.L, 3)} + ${dec(lg.tau * lg.t, 3)} = ${dec(lg.L2, 3)}$ kg m$^2$/s.`,
  sol: 'Definitions; conservation law; L = m v d; ΔL = τ t.',
  scheme: [['(a) Torque definition and unit', 1], ['(a) Angular momentum definition and unit', 1], ['(b) Law with condition', 1], [`(c) L = ${dec(lg.L, 3)} kg m²/s`, 1], [`(c) new L = ${dec(lg.L2, 3)} kg m²/s`, 1]],
  d: 3, c: 'application', t: [2],
}), () => near(lg.L, 6, 1e-9) && near(lg.L2, 12, 1e-9) || 'lg');

const rb = { I: 200, w: 1.5, m: 30, r: 2.0 };
rb.I2 = rb.I + rb.m * rb.r ** 2;
rb.w2 = (rb.I * rb.w) / rb.I2;
rb.K1 = 0.5 * rb.I * rb.w ** 2;
rb.K2 = 0.5 * rb.I2 * rb.w2 ** 2;
rb.loss = rb.K1 - rb.K2;
add('roundabout-case', mk.case({
  passage: 'A playground roundabout in a Bengaluru park has a moment of inertia 200 kg m² about its vertical axle and turns freely at 1.5 rad/s. A 30 kg child, running on the ground and moving radially inwards, steps gently on to the rim, which is 2.0 m from the axle. Treat the child as a point mass and neglect friction at the axle.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'During the child’s landing, the quantity that stays constant for the child + roundabout system is',
      right: 'the angular momentum about the axle, because the only forces are internal or pass through the axle',
      wrong: ['the kinetic energy, because no external force acts', 'the angular speed, because the axle is frictionless', 'the moment of inertia, because the child is light'],
      sol: 'No external torque about the axle acts, so the angular momentum is conserved. The step is inelastic, so the kinetic energy changes — option (@K).',
      d: 2, c: 'understanding', t: [2],
    })),
    part('b', num({
      stem: 'Find the angular speed of the roundabout after the child is on it, in rad/s (2 significant figures).',
      value: Number(dec(rb.w2, 2)), tol: 0.005, unit: 'rad/s',
      sol: r`$I' = 200 + 30 \times 2.0^2 = ${dec(rb.I2, 3)}$ kg m$^2$. $200 \times 1.5 = ${dec(rb.I2, 3)}\,\omega'$, so $\omega' = \dfrac{300}{${dec(rb.I2, 3)}} = ${dec(rb.w2, 2)}$ rad/s.`,
      scheme: [['I′ = 200 + 30 × 4.0 = 320 kg m²', 1]],
      d: 3, c: 'application', t: [2],
    })),
    part('c', short({
      marks: 2,
      stem: 'Find the kinetic energy of rotation before and after the child steps on, and the energy lost.',
      model: r`Before the child steps on, the kinetic energy of rotation is $K_1 = \tfrac{1}{2} \times 200 \times 1.5^2 = ${dec(rb.K1, 3)}$ J. After she is on the rim the moment of inertia is larger and the angular speed smaller, and the kinetic energy is $K_2 = \tfrac{1}{2} \times ${dec(rb.I2, 3)} \times ${dec(rb.w2, 4)}^2 \approx ${dec(rb.K2, 4)}$ J. The roundabout therefore loses about ${dec(rb.loss, 3)} J of kinetic energy, which appears as heat at her feet.`,
      sol: 'K = ½ I ω² before and after.',
      scheme: [[`K₁ = ${dec(rb.K1, 3)} J`, 1], [`K₂ ≈ ${dec(rb.K2, 4)} J; loss ≈ ${dec(rb.loss, 3)} J`, 1]],
      d: 3, c: 'application', t: [2, 4],
    }), [
      short({
        marks: 2,
        stem: 'A student says that since angular momentum is conserved, the kinetic energy of the roundabout must also be unchanged. Evaluate this claim.',
        model: 'The claim is **wrong**. Conservation of angular momentum needs only zero external torque; kinetic energy is conserved only if no energy is dissipated. The child’s feet slip on the rim in an inelastic way, so energy is lost as heat: here the kinetic energy falls from 225 J to about 141 J.',
        sol: 'L conserved; K not, because the interaction is inelastic.',
        scheme: [['Claim wrong: L conservation does not imply K conservation', 1], ['Inelastic step: K falls from 225 J to about 141 J', 1]],
        d: 4, c: 'evaluation', t: [2, 4],
      }),
    ]),
  ],
}), (q) => near(rb.w2, 0.9375, 1e-9) && near(rb.K1, 225, 1e-9) && near(rb.K2, 140.625, 1e-9) && near(q.children[1].answer.value, 0.94, 1e-9) || 'rb');

void p3;
