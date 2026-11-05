// ch06 System of Particles and Rotational Motion — two decks: Part 1 (t01–t02) centre of mass, torque and angular momentum;
// Part 2 (t03–t04) equilibrium, moment of inertia, rotational energy. Every number is computed in data.mjs.
import { sl, deck, table, svgV, plot, r } from '../../cbse-11-physics-ch01/src/lib.mjs';
import { g, R6, rad, dec, sig, nw, rod, tri, el, sh, sd, tq, pd, ln, st, po, pl, br, tp, sq, dr, gw, ft, MOI } from './data.mjs';
import * as G from './svgs.mjs';

const p3 = (x, n = 3) => String(Number(x.toPrecision(n))); // trimmed significant figures (0.08, 1.2, 3)
const W = (x, n = 3) => nw(sig(x, n)); // words for a rounded value

// ---------------------------------------------------------------- visuals
export const V = {
  cm2: svgV(G.CM2, 'Two masses of 2 and 6 kilograms on a light rod 0.80 metres long balanced on a support at the centre of mass, 0.60 metres from the lighter mass', 'The CM lies nearer the heavier mass; the moments of the weights about it are equal.'),
  lshape: svgV(G.LSHAPE, 'A uniform wire bent into an L with arms 0.60 and 0.40 metres; the centre of mass at 0.18 and 0.08 metres from the corner, off the wire', 'The CM of a body need not lie on the body.'),
  sled: svgV(G.SLED, 'A child walks along a sledge on smooth ice: the sledge slides back 0.60 metres, the child moves 1.80 metres, and the centre of mass of the pair does not move', 'Internal forces cannot move the centre of mass.'),
  torque: svgV(G.TORQUE, 'A bar pivoted at O with a 40 newton force at 30 degrees to the bar at 0.50 metres from O: moment arm 0.25 metres, torque 10 newton metres', 'Torque = force × perpendicular distance from the axis to the line of action.'),
  linel: svgV(G.LINEL, 'A particle moving along a straight line 3 metres from O at three positions: the angular momentum m v d is 12 kilogram metre squared per second at each', 'A free particle has constant angular momentum about any point.'),
  spin: svgV(G.SPIN, 'A person on a rotating stool holding two weights: pulling the weights in lowers I from 2.52 to 0.72 and raises omega from 3.0 to 10.5, so L stays 7.56', 'Smaller I, larger ω: L = I ω is unchanged.'),
  beam: svgV(G.BEAM, 'A uniform plank of 30 kilograms on two end supports with a 50 kilogram person 1 metre from the left end; support forces 514.5 and 269.5 newtons', 'Forces balance and moments balance about any point.'),
  bracket: svgV(G.BRACKET, 'A uniform bar hinged to a wall with a lamp at its end and a cable at 30 degrees: tension 78.4 newtons, hinge force components 67.9 and 19.6 newtons', 'Take moments about the hinge to remove the unknown hinge force.'),
  topple: svgV(G.TOPPLE, 'A tall almirah on a tilting floor, stable at 12 degrees and toppling at 25 degrees, with the plumb line from the centre of gravity', 'It topples when the vertical line through the CG leaves the base.'),
  moi: svgV(G.MOIBARS, 'Bar chart of moments of inertia of a ring, hollow sphere, disc and solid sphere of the same mass and radius', 'I = c M R² with c = 1, 2/3, 1/2, 2/5.'),
  pole: svgV(G.POLE, 'A carrying pole with 18 and 12 kilogram loads balanced on a shoulder 0.60 metres from the heavier load', 'The balance point is the centre of mass of the loads.'),
};

const ax = (label, min, max) => ({ label, min, max });
export const plotShell = plot(
  {
    x: ax('time after the burst t (s)', 0, 4.2),
    y: ax('horizontal distance x (m)', 0, 200),
    functions: [
      { expr: `${sh.v1}*x`, label: `2.0 kg piece: ${sh.v1} t`, domain: [0, 4] },
      { expr: `${sh.u}*x`, label: `centre of mass: ${sh.u} t`, domain: [0, 4] },
      { expr: `${R6(sh.v2)}*x`, label: `3.0 kg piece: ${p3(sh.v2, 3)} t`, domain: [0, 4] },
    ],
    vlines: [{ x: sh.t, label: 't = 3.0 s', dashed: true }],
  },
  'Horizontal distance against time for the two pieces of a shell after it bursts: the 2.0 kg piece at 45 metres per second, the 3.0 kg piece at 3.33 metres per second, and the centre of mass moving steadily at 20 metres per second between them',
  'The CM keeps moving as if no burst had happened.',
);
export const plotOmega = plot(
  {
    x: ax('moment of inertia I (kg m²)', 0.4, 3),
    y: ax('angular speed ω (rad s⁻¹)', 0, 20),
    functions: [{ expr: `${R6(st.L)}/x`, label: `ω = L/I with L = ${p3(st.L)} kg m² s⁻¹`, domain: [0.45, 3] }],
    vlines: [{ x: st.I1, label: `arms out: I = ${p3(st.I1)}`, dashed: true }, { x: st.I2, label: `pulled in: I = ${p3(st.I2)}`, dashed: true }],
  },
  'Angular speed against moment of inertia for constant angular momentum 7.56: a falling curve, 3.0 radians per second at I of 2.52 and 10.5 at I of 0.72',
  'For constant L, ω is inversely proportional to I.',
);
export const plotKE = plot(
  {
    x: ax('angular speed ω (rad s⁻¹)', 0, 80),
    y: ax('kinetic energy K (J)', 0, 800),
    functions: [{ expr: `${0.5 * gw.I}*x^2`, label: `K = ½ I ω², I = ${p3(gw.I)} kg m²`, domain: [0, 76] }],
    vlines: [{ x: gw.w, label: `600 rev/min: ω = ${dec(gw.w, 4)}, K = ${dec(gw.K, 3)} J`, dashed: true }],
  },
  'Kinetic energy of a grinding wheel against angular speed: a parabola, reaching about 474 joules at 62.8 radians per second',
  'Rotational kinetic energy grows as the square of ω.',
);

// ---------------------------------------------------------------- tables
const T_cmshape = table(
  ['Uniform body', 'Where the centre of mass is'],
  [
    ['Thin rod', 'Its midpoint'],
    ['Ring (or hollow cylinder)', 'The centre of the ring; there is no material there'],
    ['Disc, solid cylinder, sphere', 'The geometric centre'],
    ['Rectangular plate', 'Where the two diagonals cross'],
    ['Triangular plate', 'Where the medians meet, one third of the height above the base'],
  ],
  'Table of the position of the centre of mass of uniform bodies: rod, ring, disc, sphere, rectangular plate and triangular plate',
);
const T_tri = table(
  ['Particle', 'm (kg)', 'x (m)', 'y (m)', 'm x (kg m)', 'm y (kg m)'],
  [
    ...tri.m.map((m, i) => [String(i + 1), dec(m, 2), p3(tri.x[i]), p3(tri.y[i]), p3(tri.mx[i]), p3(tri.my[i])]),
    ['Total', dec(tri.M, 3), '', '', p3(tri.mx.reduce((a, b) => a + b, 0)), p3(tri.my.reduce((a, b) => a + b, 0))],
  ],
  'Table of three particles with their masses and coordinates and the sums of mass times x and mass times y',
);
const T_force = table(
  ['Force on the system', 'Can it change the motion of the centre of mass?'],
  [
    ['External (gravity, a push from outside, friction)', 'Yes: M a_cm = F_ext'],
    ['Internal (pairs of equal and opposite forces between parts)', 'No: they cancel in the sum'],
    ['Examples of internal forces', 'An explosion, springs, muscles, a child walking on a sledge'],
  ],
  'Table showing that external forces change the motion of the centre of mass but internal forces do not',
);
const T_crank = table(
  ['Crank angle from the vertical (°)', 'Moment arm r sin θ (m)', 'Torque (N m)'],
  pd.angles.map((a) => [String(a), dec(pd.r * Math.sin(a * rad), 3), dec(pd.tau(a), 3)]),
  'Table of the moment arm and torque of a 300 newton downward pedal force on a crank 0.17 metres long at four crank angles',
);
const T_Lcmp = table(
  ['Linear motion', 'Rotational motion about a point or axis'],
  [
    ['momentum p = m v', 'angular momentum l = r × p, magnitude m v r sin θ'],
    ['force F = dp/dt', 'torque τ = dl/dt'],
    ['no external force: P constant', 'no external torque: L constant'],
  ],
  'Table comparing momentum with angular momentum, force with torque, and the two conservation laws',
);
const T_eq = table(
  ['Kind of equilibrium', 'Condition', 'Meaning'],
  [
    ['Translational', 'Sum of external forces = 0', 'The centre of mass has no acceleration'],
    ['Rotational', 'Sum of external torques = 0 (about any point)', 'The body has no angular acceleration'],
    ['Mechanical equilibrium', 'Both conditions together', 'At rest if it started at rest'],
  ],
  'Table of the conditions for translational, rotational and mechanical equilibrium of a rigid body',
);
const T_couple = table(
  ['', 'Single force', 'Couple (equal, opposite, parallel forces)'],
  [
    ['Net force', 'F', 'Zero'],
    ['Net torque', 'F × d about a point', 'F × (distance between the lines), the same about every point'],
    ['Effect on a free body', 'Moves and turns it', 'Turns it without moving its centre of mass'],
  ],
  'Table comparing a single force with a couple: net force, net torque and effect',
);
const T_I = table(
  ['I depends on', 'I does not depend on'],
  [
    ['The mass of the body', 'The angular speed ω'],
    ['How the mass is distributed (distance from the axis)', 'The torque applied'],
    ['The position and direction of the axis', 'Whether the body is turning at all'],
  ],
  'Table of what the moment of inertia of a body depends on and what it does not depend on',
);
const T_sq = table(
  ['Mass', 'Distance r from the axis (m)', 'r² (m²)', 'm r² (kg m²)'],
  [1, 2, 3, 4].map((i) => [`${i}  (${dec(sq.m, 2)} kg)`, dec(Math.sqrt(sq.r2), 3), dec(sq.r2, 2), dec(sq.m * sq.r2, 2)]).concat([['Total', '', '', dec(sq.I, 2)]]),
  'Table of four equal masses at the corners of a square frame with each distance from the central axis, its square and mass times distance squared, totalling 0.36',
);
const T_disc = table(
  ['Body (M = 8.0 kg, R = 0.25 m)', 'I (kg m²)', 'Radius of gyration k (m)'],
  [['Ring', dec(dr.Ir, 3), dec(dr.kr, 3)], ['Disc', dec(dr.Id, 3), dec(dr.kd, 3)]],
  'Table of the moment of inertia and radius of gyration of a ring and a disc of the same mass and radius',
);
const T_an = table(
  ['Linear', 'Rotation about a fixed axis'],
  [
    ['mass m', 'moment of inertia I'],
    ['velocity v', 'angular velocity ω'],
    ['momentum p = m v', 'angular momentum L = I ω'],
    ['force F = dp/dt', 'torque τ = dL/dt = I α'],
    ['kinetic energy ½ m v²', 'kinetic energy ½ I ω²'],
  ],
  'Table of the correspondence between linear quantities and rotational quantities about a fixed axis',
);
const T_ft = table(
  ['Time t (s)', 'L = τ t (kg m² s⁻¹)', 'ω = L / I (rad s⁻¹)', 'K = ½ I ω² (J)'],
  [1, 2, 3, 4, 5].map((t) => [String(t), p3(ft.tau * t), p3((ft.tau * t) / ft.I), p3(0.5 * ft.I * ((ft.tau * t) / ft.I) ** 2)]),
  'Table of angular momentum, angular speed and kinetic energy of a flywheel under a constant torque of 6.0 newton metres for 1 to 5 seconds',
);
export const TABLES = { T_cmshape, T_tri, T_force, T_crank, T_Lcmp, T_eq, T_couple, T_I, T_sq, T_disc, T_an, T_ft };

// ================================================================ DECK 1
export const deck1 = deck({
  part: 1,
  title: 'System of Particles and Rotational Motion — Part 1: Centre of mass, torque and angular momentum',
  goals: [
    'Locate the centre of mass of simple systems and describe its motion under external forces',
    'Define torque and angular momentum and relate them by τ = dL/dt',
    'Apply conservation of angular momentum to simple situations',
  ],
  slides: [
    sl('title', 'System of Particles and Rotational Motion', {
      b: 'Part 1 — the one point that stands for a whole system, and the turning effect of forces.',
      v: V.cm2,
      n: 'A cricket bat, a spinning skater and a firework shell are all systems of many particles. In this part we find the single point that represents the motion of the whole system, the centre of mass, and then meet torque and angular momentum, the rotational partners of force and momentum.',
    }),
    sl('concept', 'Centre of mass of a system of particles', {
      b: r`For particles of masses $m_1, m_2, \dots$ at positions $x_1, x_2, \dots$ along a line, the **centre of mass** (CM) is the mass-weighted average position.`,
      m: [r`x_\text{cm} = \dfrac{m_1 x_1 + m_2 x_2 + \cdots}{m_1 + m_2 + \cdots} = \dfrac{\sum m_i x_i}{M}`, r`X = \dfrac{\sum m_i x_i}{M}, \qquad Y = \dfrac{\sum m_i y_i}{M}`],
      ul: [
        'For two particles the CM lies on the line joining them, **nearer the heavier one**, and divides the line in the inverse ratio of the masses.',
        'In a plane (or in space) each coordinate is averaged separately.',
        'The CM is a definite point of the system: choosing another origin changes its coordinates, not the point.',
        'The CM need not coincide with any particle, or even with any material of the body.',
      ],
      v: V.cm2,
      n: 'To find the centre of mass, multiply each mass by its position, add these up, and divide by the total mass. It is a weighted average, so it is pulled towards the heavier particles. For two particles it lies on the line joining them, closer to the heavier one. It is a point of the system, whichever origin we choose to measure from.',
    }),
    sl('example', 'Worked example 1: two masses on a rod', {
      b: r`Two small masses of $${dec(rod.m1, 2)}$ kg and $${dec(rod.m2, 2)}$ kg are fixed to the ends of a light rod $${dec(rod.L, 2)}$ m long. Find the centre of mass.`,
      ul: [
        r`Take the origin at the $${dec(rod.m1, 2)}$ kg mass: $x_1 = 0$ and $x_2 = ${dec(rod.L, 2)}$ m.`,
        r`$x_\text{cm} = \dfrac{${dec(rod.m1, 2)} \times 0 + ${dec(rod.m2, 2)} \times ${dec(rod.L, 2)}}{${dec(rod.M, 2)}} = \dfrac{${p3(rod.m2 * rod.L)}}{${dec(rod.M, 2)}} = ${dec(rod.x, 2)}$ m from the lighter mass.`,
        r`It is $${dec(rod.d2, 2)}$ m from the heavier mass: the distances are in the inverse ratio of the masses.`,
        r`Check: the weights balance about the CM, $${dec(rod.w1, 3)} \times ${dec(rod.d1, 2)} = ${dec(rod.w2, 3)} \times ${dec(rod.d2, 2)} \approx ${dec(rod.mom1, 3)}$ N m.`,
      ],
      v: V.cm2,
      n: `Put the origin at the lighter mass. Multiply six kilograms by zero point eight metres to get four point eight, divide by the total mass of eight kilograms, and the centre of mass is zero point six metres from the lighter mass. It is only zero point two metres from the heavier one, so the distances are in the inverse ratio of the masses.`,
    }),
    sl('concept', 'Centre of mass of a rigid body', {
      b: 'A rigid body is a continuous collection of particles, so the sum becomes an integral. For uniform bodies **symmetry** gives the answer directly.',
      ul: [
        'If a uniform body has a centre, an axis or a plane of symmetry, the CM lies on it (at the centre for a rod, disc, sphere or rectangle).',
        'A ring or a hollow shell has its CM at the geometric centre, where there is no material.',
        'A composite body: treat each simple part as a particle at its own CM, with the part’s mass.',
        'Near the Earth’s surface the weight of a body acts through its CM (more on this in Part 2).',
      ],
      v: T_cmshape,
      n: 'For a uniform body with a line or a point of symmetry, the centre of mass lies on that line or at that point. A rod has it at the midpoint, a rectangular plate where the diagonals cross, a ring at its centre where there is no material at all. For a composite body, treat each simple piece as a particle at its own centre of mass.',
    }),
    sl('example', 'Worked example 2: three particles in a plane', {
      b: r`Three small masses of $${dec(tri.m[0], 2)}$, $${dec(tri.m[1], 2)}$ and $${dec(tri.m[2], 2)}$ kg are fixed to a light frame at $(0, 0)$, $(${p3(tri.x[1])}, 0)$ and $(0, ${p3(tri.y[2])})$, in metres. Find the CM.`,
      ul: [
        r`$X = \dfrac{\sum m_i x_i}{M} = \dfrac{${p3(tri.mx.reduce((a, b) => a + b, 0))}}{${p3(tri.M)}} = ${p3(tri.X)}$ m.`,
        r`$Y = \dfrac{\sum m_i y_i}{M} = \dfrac{${p3(tri.my.reduce((a, b) => a + b, 0))}}{${p3(tri.M)}} = ${p3(tri.Y)}$ m.`,
        `The CM is at (${p3(tri.X)} m, ${dec(tri.Y, 2)} m), pulled towards the heaviest particle.`,
      ],
      v: T_tri,
      n: `Work out mass times x and mass times y for each particle and add. The sums are twelve and thirty kilogram metres. Dividing by the total mass of ten kilograms gives the centre of mass at one point two metres along x and three point zero metres along y, pulled towards the heaviest particle.`,
    }),
    sl('example', 'Worked example 3: a bent wire', {
      b: r`A uniform wire is bent into an L with arms of $${dec(el.a, 2)}$ m and $${dec(el.b, 2)}$ m along the x and y axes from the corner. Find its CM.`,
      ul: [
        'The wire is uniform, so the mass of each arm is proportional to its length and acts at its midpoint.',
        r`Arm 1: length $${dec(el.a, 2)}$ m, midpoint $(${p3(el.a / 2)}, 0)$. Arm 2: length $${dec(el.b, 2)}$ m, midpoint $(0, ${p3(el.b / 2)})$.`,
        r`$X = \dfrac{${dec(el.a, 2)} \times ${p3(el.a / 2)} + ${dec(el.b, 2)} \times 0}{${dec(el.a + el.b, 3)}} = ${p3(el.X)}$ m.`,
        r`$Y = \dfrac{${dec(el.a, 2)} \times 0 + ${dec(el.b, 2)} \times ${p3(el.b / 2)}}{${dec(el.a + el.b, 3)}} = ${p3(el.Y)}$ m.`,
        'The point (0.18 m, 0.08 m) is not on the wire: the CM can lie outside the material.',
      ],
      v: V.lshape,
      n: `Each arm acts like a particle at its midpoint with a mass proportional to its length. Averaging with the lengths as weights gives zero point one eight metres along one arm and zero point zero eight metres along the other. That point is not on the wire at all: the centre of mass can lie outside the material of the body.`,
    }),
    sl('check', 'Quick check: where is the centre of mass?', {
      b: 'Choose the correct option.',
      v: V.cm2,
      chk: 'cm2-mcq',
      n: 'Remember that the centre of mass is nearer the heavier particle and that the distances are in the inverse ratio of the masses.',
    }),
    sl('concept', 'Motion of the centre of mass', {
      b: 'Add Newton’s second law for all the particles. The forces between the particles come in equal and opposite pairs and cancel, leaving only external forces.',
      m: [r`M\,\vec a_\text{cm} = \vec F_\text{ext}, \qquad \vec P = M\,\vec v_\text{cm}`],
      ul: [
        'The CM moves as if all the mass were concentrated there and all the external force were applied there.',
        'Internal forces (an explosion, a spring, muscles) cannot change the motion of the CM.',
        'If the net external force is zero, the total momentum $\\vec P$ is constant: the CM stays at rest or moves with constant velocity.',
        'A thrown spanner or a shell bursting in flight: the CM follows the same path as a single particle would.',
      ],
      v: T_force,
      n: 'Adding Newton’s second law for every particle, the internal forces cancel in pairs. What is left says that the centre of mass moves as if all the mass were there and all the external force acted there. An explosion or a spring cannot change this motion. With no external force, the total momentum stays constant.',
    }),
    sl('example', 'Worked example 4: a shell bursts in flight', {
      b: r`A shell of mass $${dec(sh.M, 2)}$ kg moves horizontally at $${sh.u}$ m s$^{-1}$ at the top of its path and bursts into two pieces. The $${dec(sh.m1, 2)}$ kg piece continues horizontally at $${sh.v1}$ m s$^{-1}$. Find the speed of the other piece and describe the CM.`,
      ul: [
        r`The burst forces are internal, so momentum along the horizontal is conserved: $${dec(sh.M, 2)} \times ${sh.u} = ${sh.p}$ kg m s$^{-1}$ before.`,
        r`After: $${sh.p} = ${dec(sh.m1, 2)} \times ${sh.v1} + ${dec(sh.m2, 2)}\,v_2$, so $v_2 = \dfrac{${sh.p - sh.m1 * sh.v1}}{${dec(sh.m2, 2)}} \approx ${dec(sh.v2, 3)}$ m s$^{-1}$, in the same direction.`,
        r`The CM keeps moving at $${sh.u}$ m s$^{-1}$: after $${dec(sh.t, 2)}$ s the pieces are $${sh.x1}$ m and $${dec(sh.x2, 3)}$ m ahead, and $\dfrac{${dec(sh.m1, 2)} \times ${sh.x1} + ${dec(sh.m2, 2)} \times ${dec(sh.x2, 3)}}{${dec(sh.M, 2)}} = ${dec(sh.xc, 3)}$ m $= ${sh.u} \times ${dec(sh.t, 2)}$ m.`,
        'Both pieces start with zero vertical velocity, so they fall together and the CM follows the original parabola.',
      ],
      v: plotShell,
      n: `Momentum is conserved because the burst forces are internal. Before the burst it is one hundred kilogram metres per second. The two kilogram piece carries ninety, so the three kilogram piece carries ten, a speed of about ${W(sh.v2)} metres per second. The centre of mass between them keeps moving at twenty metres per second, exactly as before the burst.`,
    }),
    sl('example', 'Worked example 5: a child walks on a sledge', {
      b: r`A child of $${dec(sd.m, 2)}$ kg stands at one end of a $${dec(sd.L, 2)}$ m long sledge of mass $${dec(sd.M, 2)}$ kg on smooth ice, everything at rest. She walks to the other end. How far does the sledge slide?`,
      ul: [
        'No external horizontal force acts, so the CM of child + sledge stays at the same place.',
        r`Let the sledge slide back by $s$. The child moves $${dec(sd.L, 2)} - s$ relative to the ice.`,
        r`Mass × displacement balances: $${dec(sd.m, 2)}\,(${dec(sd.L, 2)} - s) = ${dec(sd.M, 2)}\,s$, so $s = \dfrac{${dec(sd.m, 2)} \times ${dec(sd.L, 2)}}{${dec(sd.m + sd.M, 3)}} = ${dec(sd.s, 2)}$ m.`,
        r`The child moves $${dec(sd.L, 2)} - ${dec(sd.s, 2)} = ${dec(sd.c, 2)}$ m over the ice. Check: $${dec(sd.m, 2)} \times ${dec(sd.c, 2)} = ${dec(sd.M, 2)} \times ${dec(sd.s, 2)}$.`,
      ],
      v: V.sled,
      n: `No external horizontal force acts on the child and sledge, so their centre of mass cannot move. As the child walks forward the sledge slides back. Thirty kilograms times the child's displacement equals ninety kilograms times the sledge's displacement. The sledge slides zero point six metres and the child moves one point eight metres over the ice.`,
    }),
    sl('concept', 'Torque: the turning effect of a force', {
      b: r`A force $\vec F$ applied at position $\vec r$ from an axis has a **torque** (moment of force) $\vec\tau = \vec r \times \vec F$.`,
      m: [r`\tau = r F \sin\theta = F\,d`],
      ul: [
        r`$\theta$ is the angle between $\vec r$ and $\vec F$; $d = r \sin\theta$ is the **perpendicular distance** from the axis to the line of action of the force.`,
        'Direction: along the axis, by the right-hand rule; for a body turning in a plane, anticlockwise is taken as positive.',
        'SI unit: newton metre (N m). It has the same dimensions as energy but is a different quantity.',
        'The torque is zero if $F = 0$, or if the line of action passes through the axis ($\\theta = 0$ or $180^\\circ$).',
        'Pushing at the end of a long handle, at right angles to it, gives the largest torque for a given force.',
      ],
      v: V.torque,
      n: `Torque is the turning effect of a force about an axis. Its size is the force times the perpendicular distance from the axis to the line of action, which is the same as the distance to the point of application times the force times the sine of the angle between them. A force whose line of action passes through the axis has no turning effect.`,
    }),
    sl('example', 'Worked example 6: a bicycle pedal', {
      b: r`A cyclist pushes a pedal straight down with $${pd.F}$ N. The crank is $${pd.r}$ m long. Find the torque about the axle when the crank makes $60^\circ$ with the vertical, and compare other positions.`,
      ul: [
        r`The angle between the crank ($\vec r$) and the downward force is $\theta = 60^\circ$.`,
        r`$\tau = r F \sin\theta = ${pd.r} \times ${pd.F} \times \sin 60^\circ \approx ${dec(pd.tau(60), 3)}$ N m, with moment arm $d = ${pd.r} \sin 60^\circ \approx ${dec(pd.r * Math.sin(60 * rad), 3)}$ m.`,
        'With the crank vertical (θ = 0) the line of action passes through the axle and the torque is zero; with the crank horizontal (θ = 90°) the torque is greatest.',
      ],
      v: T_crank,
      n: `The crank and the force make an angle of sixty degrees. The torque is the crank length, zero point one seven metres, times the force, three hundred newtons, times the sine of sixty degrees. That is about forty four newton metres. At zero degrees the torque vanishes, and at ninety degrees it reaches its largest value, fifty one newton metres.`,
    }),
    sl('concept', 'Angular momentum and its link with torque', {
      b: r`For a particle of momentum $\vec p$ at position $\vec r$ from a point O, the **angular momentum** is $\vec l = \vec r \times \vec p$, magnitude $m v r \sin\theta = m v d$.`,
      m: [r`\vec\tau = \dfrac{d\vec l}{dt}, \qquad \vec\tau_\text{ext} = \dfrac{d\vec L}{dt}`],
      ul: [
        r`Unit: kg m$^2$ s$^{-1}$. For circular motion about the centre, $l = m v r = m r^2 \omega$.`,
        'For a particle, the torque of the force on it equals the rate of change of its angular momentum; for a system, only **external** torques change the total $\\vec L$ (internal torques cancel in pairs).',
        'The relation is the rotational form of Newton’s second law, just as $\\vec F = d\\vec p/dt$.',
      ],
      v: T_Lcmp,
      n: `The angular momentum of a particle about a point is its position vector crossed with its momentum. Its size is mass times speed times the perpendicular distance from the point to the line of motion. The torque on the particle equals the rate of change of this angular momentum, which is the rotational form of Newton's second law.`,
    }),
    sl('example', 'Worked example 7: a particle on a straight line', {
      b: r`A $${dec(ln.m, 2)}$ kg ball moves at a steady $${dec(ln.v, 2)}$ m s$^{-1}$ along a straight line that passes $${dec(ln.d, 2)}$ m from a point O. Find its angular momentum about O.`,
      ul: [
        r`$L = m v d = ${dec(ln.m, 2)} \times ${dec(ln.v, 2)} \times ${dec(ln.d, 2)} = ${dec(ln.L, 3)}$ kg m$^2$ s$^{-1}$.`,
        r`Where the ball is, it is at a larger distance $r$ from O but the angle changes so that $r\sin\theta$ stays equal to $d$.`,
        'No force acts, so the torque about O is zero and L is the same at every position: A, B or C.',
        'The direction of L is perpendicular to the plane containing O and the line, and does not change.',
      ],
      v: V.linel,
      n: `The perpendicular distance from the point to the line of motion is three metres. Multiply mass, speed and that distance: zero point five times eight times three, which is twelve kilogram metre squared per second. As the ball moves along its line, the distance changes but the product stays the same, so the angular momentum is constant when no force acts.`,
    }),
    sl('check', 'Quick check: torque', {
      b: 'Find the torque.',
      v: V.torque,
      chk: 'kolhu-num',
      n: 'Torque is force times the perpendicular distance, so use the sine of the angle between the pole and the force.',
    }),
    sl('concept', 'Conservation of angular momentum', {
      b: r`If the net external torque on a system is zero, $d\vec L/dt = 0$: the total angular momentum stays **constant**.`,
      m: [r`\tau_\text{ext} = 0 \;\Rightarrow\; L = I\omega = \text{constant}`],
      ul: [
        'When the body can change its shape, a smaller moment of inertia I means a larger angular speed ω, and the reverse.',
        'A skater or dancer pulls the arms in to spin faster; a diver tucks to somersault; a person on a rotating stool pulls weights inward.',
        'A helicopter needs a tail rotor: the main rotor’s angular momentum has to be balanced so that the body does not spin the other way.',
        'The Earth, a planet or a comet moving under a force directed towards the Sun feels no torque about the Sun, so its angular momentum stays constant.',
      ],
      v: V.spin,
      n: `If the net external torque is zero, the total angular momentum does not change. For a body that can alter its shape, a smaller moment of inertia means a faster spin. That is why a dancer pulls her arms in to speed up and a diver tucks into a ball. A helicopter's tail rotor stops the body turning against the main rotor.`,
    }),
    sl('example', 'Worked example 8: a rotating stool', {
      b: r`A student on a frictionless rotating stool holds two $${dec(st.m, 2)}$ kg weights at $${dec(st.r1, 2)}$ m from the axis, turning at $${dec(st.w1, 2)}$ rad s$^{-1}$. Her body and the stool have a moment of inertia $${dec(st.I0, 2)}$ kg m$^2$. She pulls the weights in to $${dec(st.r2, 2)}$ m. Find the new angular speed.`,
      ul: [
        r`$I_1 = ${dec(st.I0, 2)} + 2 \times ${dec(st.m, 2)} \times ${dec(st.r1, 2)}^2 = ${p3(st.I1)}$ kg m$^2$; $I_2 = ${dec(st.I0, 2)} + 2 \times ${dec(st.m, 2)} \times ${dec(st.r2, 2)}^2 = ${p3(st.I2)}$ kg m$^2$.`,
        r`No external torque: $I_1\omega_1 = I_2\omega_2$, so $\omega_2 = \dfrac{${p3(st.I1)} \times ${dec(st.w1, 2)}}{${p3(st.I2)}} = ${p3(st.w2)}$ rad s$^{-1}$.`,
        r`$L = ${p3(st.I1)} \times ${dec(st.w1, 2)} = ${p3(st.L)}$ kg m$^2$ s$^{-1}$ before and after: the spin is about ${dec(st.w2 / st.w1, 2)} times faster.`,
      ],
      v: plotOmega,
      n: `Her moment of inertia is two point five two kilogram metre squared with the weights out and only zero point seven two with them pulled in. The angular momentum is the same before and after, so the new angular speed is two point five two times three, divided by zero point seven two. That is ten point five radians per second, three and a half times faster.`,
    }),
    sl('check', 'Quick check: a diver tucks', {
      b: 'Choose the correct option.',
      v: V.spin,
      chk: 'diver-mcq',
      n: 'Angular momentum stays constant in the air, so think about what happens to the moment of inertia when she tucks.',
    }),
    sl('summary', 'Summary — Part 1', {
      b: 'Key results:',
      v: table(
        ['Idea', 'Result'],
        [
          ['Centre of mass', 'X = Σ m x / M; nearer the heavier mass; may lie outside the body'],
          ['Motion of the CM', 'M a_cm = F_ext; internal forces cannot change it'],
          ['No external force', 'P constant; the CM moves uniformly or stays at rest'],
          ['Torque', 'τ = r × F; magnitude r F sin θ = F d; unit N m'],
          ['Angular momentum', 'l = r × p; magnitude m v d; unit kg m² s⁻¹; τ = dL/dt'],
          ['No external torque', 'L constant: I ω stays the same'],
        ],
        'Summary table of the centre of mass, its motion, torque, angular momentum and the conservation laws',
      ),
      n: `To sum up. The centre of mass is the mass weighted average position of the system. It moves as if all the mass were there and only external forces acted on it. Torque is force times perpendicular distance. The torque on a system equals the rate of change of its angular momentum, and when there is no external torque the angular momentum stays constant.`,
    }),
    sl('exam-tips', 'Exam tips — Part 1', {
      ul: [
        'State the origin and the positive direction before using x_cm = Σ m x / M; give the answer with a distance and where it is measured from.',
        'For internal explosions or walking on a free sledge, use "no external force, so the CM stays put" and write the momentum or CM equation.',
        'For torque always find the perpendicular distance or the angle; say which point or axis the torque is about.',
        'In conservation of angular momentum say "no external torque about the axis" before writing I₁ω₁ = I₂ω₂.',
      ],
      v: T_Lcmp,
      n: `State the origin and positive direction before finding a centre of mass. For explosions or a person walking on a free sledge, say that there is no external force so the centre of mass does not move. For torque, find the perpendicular distance and say which axis you mean. Before using conservation of angular momentum, say that there is no external torque about that axis.`,
    }),
  ],
});

// ================================================================ DECK 2
export const deck2 = deck({
  part: 2,
  title: 'System of Particles and Rotational Motion — Part 2: Equilibrium and moment of inertia',
  goals: [
    'Apply the conditions of translational and rotational equilibrium and the principle of moments',
    'Explain centre of gravity and stability',
    'Use moment of inertia, radius of gyration and rotational kinetic energy for simple bodies',
  ],
  slides: [
    sl('title', 'Equilibrium and Moment of Inertia', {
      b: 'Part 2 — when a rigid body neither accelerates nor turns, and how hard it is to turn.',
      v: V.beam,
      n: 'A plank over a drain, a signboard on a bracket and a spinning grinding wheel all depend on one idea: how forces and torques act on a rigid body. In this part we find when a body stays in equilibrium, then meet the moment of inertia, the rotational counterpart of mass.',
    }),
    sl('concept', 'Equilibrium of a rigid body', {
      b: 'A rigid body is in **mechanical equilibrium** when both its translation and its rotation are unchanging.',
      m: [r`\sum \vec F_\text{ext} = 0 \quad (\text{translational}), \qquad \sum \vec\tau_\text{ext} = 0 \quad (\text{rotational})`],
      ul: [
        'The first condition says the CM has zero acceleration; the second says the angular momentum is not changing.',
        'Each condition can hold without the other: two equal and opposite forces along different lines give zero net force but a torque (a couple).',
        'If the net force is zero, the net torque is the same about every point, so the point for taking moments may be chosen freely.',
        'Choose the point where an unknown force acts: that force then has no moment and drops out of the equation.',
      ],
      v: T_eq,
      n: 'A rigid body is in mechanical equilibrium when the sum of the external forces is zero and the sum of the external torques is zero. Either can hold without the other, for example with two equal and opposite forces along different lines. When the net force is zero, the torque is the same about every point, so we may take moments about whichever point removes an unknown force.',
    }),
    sl('concept', 'Principle of moments', {
      b: 'For a body in rotational equilibrium about a point, the **sum of the clockwise moments equals the sum of the anticlockwise moments** about that point.',
      ul: [
        r`A carrying pole with $${po.m2}$ kg and $${po.m1}$ kg loads balances where $${po.m2}\,g \times x = ${po.m1}\,g \times (${po.L} - x)$, so $x = ${dec(po.x, 2)}$ m from the heavier load.`,
        r`The shoulder then supports the whole weight, $(${po.m1} + ${po.m2}) \times ${g} = ${dec(po.N, 3)}$ N.`,
        'The balance point of loads on a light pole is the centre of mass of the loads.',
        'The principle works for any lever: effort × effort arm = load × load arm, with the arms measured perpendicular to the forces.',
      ],
      v: V.pole,
      n: `The principle of moments says that clockwise moments equal anticlockwise moments about any point of a body in rotational equilibrium. A porter with eighteen and twelve kilogram loads on a light pole must rest it zero point six metres from the heavier load. Then the two moments are equal, and the shoulder carries the whole weight of both loads.`,
    }),
    sl('example', 'Worked example 9: a plank over a drain', {
      b: r`A uniform plank $${dec(pl.L, 2)}$ m long of mass $${dec(pl.Mp, 2)}$ kg rests on supports at its two ends. A person of mass $${dec(pl.Mm, 2)}$ kg stands $${dec(pl.xm, 2)}$ m from the left end. Take $g = ${g}$ m s$^{-2}$. Find the support forces.`,
      ul: [
        r`Weights: plank $${dec(pl.Wp, 3)}$ N at its middle ($${dec(pl.L / 2, 2)}$ m from the left end), person $${dec(pl.Wm, 3)}$ N at $${dec(pl.xm, 2)}$ m.`,
        r`Moments about the left end (this removes $R_L$): $R_R \times ${dec(pl.L, 2)} = ${dec(pl.Wp, 3)} \times ${dec(pl.L / 2, 2)} + ${dec(pl.Wm, 3)} \times ${dec(pl.xm, 2)}$, so $R_R = \dfrac{${dec(pl.Wp * (pl.L / 2), 4)} + ${dec(pl.Wm * pl.xm, 3)}}{${dec(pl.L, 2)}} = ${dec(pl.RR, 4)}$ N.`,
        r`Vertical forces: $R_L = ${dec(pl.Wp + pl.Wm, 4)} - ${dec(pl.RR, 4)} = ${dec(pl.RL, 4)}$ N. The support nearer the person carries more.`,
      ],
      v: V.beam,
      n: `Take moments about the left end so that the unknown force there drops out. The plank's weight acts at its middle, two metres along, and the person's weight at one metre. Dividing by the plank length of four metres gives two hundred and sixty nine point five newtons at the right support. The rest of the total weight, five hundred and fourteen point five newtons, is carried by the left support.`,
    }),
    sl('check', 'Quick check: reaction at a support', {
      b: 'Find the reaction.',
      v: V.beam,
      chk: 'plank-num',
      n: 'Take moments about one support so that its unknown force drops out.',
    }),
    sl('concept', 'Centre of gravity and stability', {
      b: 'The **centre of gravity** (CG) is the point through which the total weight of the body acts; the torque of the weights of all its particles about the CG is zero.',
      ul: [
        'When g is the same at all parts of the body, which is true for ordinary bodies, the CG coincides with the centre of mass.',
        'A body is balanced if it is supported at its CG, or if the support force acts along the vertical line through the CG.',
        'A body is **stable** while the vertical line through its CG falls inside its base; it topples when the line leaves the base.',
        'A low CG and a wide base make a body more stable: a loaded roof rack raises the CG and a lorry topples more easily.',
      ],
      v: V.topple,
      n: `The centre of gravity is the point where the whole weight of a body can be taken to act. For ordinary bodies, where gravity is the same everywhere on them, it coincides with the centre of mass. A body stays stable while the vertical line through this point falls inside its base. A tall almirah on a slope topples when that line leaves the base.`,
    }),
    sl('example', 'Worked example 10: a bar on a bracket', {
      b: r`A uniform bar of mass $${dec(br.M, 2)}$ kg and length $${dec(br.L, 2)}$ m is hinged to a wall and held horizontal by a cable that makes $${br.th}^\circ$ with the bar. A $${dec(br.m, 2)}$ kg lamp hangs at the free end. Find the tension. ($g = ${g}$ m s$^{-2}$)`,
      ul: [
        r`Take moments about the hinge, so the unknown hinge force drops out. Weights: bar $${dec(br.Wb, 3)}$ N at $${dec(br.L / 2, 2)}$ m; lamp $${dec(br.Wl, 3)}$ N at $${dec(br.L, 2)}$ m.`,
        r`The cable’s moment is $T \sin ${br.th}^\circ \times ${dec(br.L, 2)}$, so $T \times ${dec(Math.sin(br.th * rad) * br.L, 2)} = ${dec(br.Wb * (br.L / 2), 4)} + ${dec(br.Wl * br.L, 4)} = ${dec(br.Wb * (br.L / 2) + br.Wl * br.L, 4)}$.`,
        r`$T = \dfrac{${dec(br.Wb * (br.L / 2) + br.Wl * br.L, 4)}}{${dec(Math.sin(br.th * rad) * br.L, 2)}} = ${dec(br.T, 3)}$ N.`,
        r`Hinge force: horizontal $T\cos ${br.th}^\circ \approx ${dec(br.Hx, 3)}$ N away from the wall; vertical $(${dec(br.Wb + br.Wl, 3)} - ${dec(br.T * Math.sin(br.th * rad), 3)}) = ${dec(br.Hy, 3)}$ N upward.`,
      ],
      v: V.bracket,
      n: `Take moments about the hinge. The weights of the bar and the lamp give a total moment of forty seven point zero four newton metres. Only the component of the cable tension at right angles to the bar has a moment, and its lever arm is the full length of the bar. Dividing gives a tension of seventy eight point four newtons, and then the force components at the hinge follow from the balance of forces.`,
    }),
    sl('concept', 'A couple', {
      b: 'Two **equal, opposite and parallel** forces whose lines of action differ form a **couple**.',
      m: [r`\tau_\text{couple} = F \times d`],
      ul: [
        'The net force of a couple is zero, so it cannot accelerate the CM; it only turns the body.',
        'Its torque is the same about every point: $F$ times the perpendicular distance $d$ between the two lines.',
        'Twisting the lid of a jar with two fingers, or turning a key, applies a couple; a single force would also push the body sideways.',
        'To keep a body in equilibrium a couple must be balanced by an equal and opposite couple, not by a single force.',
      ],
      v: T_couple,
      n: 'A couple is a pair of equal and opposite parallel forces that do not lie on the same line. The net force is zero, so the centre of mass does not accelerate, but there is a torque equal to the force times the distance between the lines. That torque is the same about every point. A couple can only be balanced by another couple.',
    }),
    sl('check', 'Quick check: equilibrium conditions', {
      b: 'Choose the correct option.',
      v: T_eq,
      chk: 'eqcond-mcq',
      n: 'Check the sum of the forces and the sum of the torques separately.',
    }),
    sl('concept', 'Moment of inertia', {
      b: 'The **moment of inertia** measures a body’s resistance to a change in its rotation about an axis. For particles it is the sum of mass times the square of the distance from the axis.',
      m: [r`I = \sum m_i r_i^2 \qquad (\text{unit: kg m}^2)`],
      ul: [
        'For a rigid body the sum becomes an integral; the answer depends on the mass, on where the mass is (distance from the axis) and on the axis chosen.',
        'The same body has different values of I about different axes.',
        'It is the rotational counterpart of mass: for a given torque, a larger I gives a smaller angular acceleration.',
        'Mass far from the axis counts for much more than mass near it, because r is squared.',
      ],
      v: T_I,
      n: 'The moment of inertia of a set of particles about an axis is the sum of each mass times the square of its distance from the axis. It depends on the mass, on how that mass is spread out, and on the axis. Mass far from the axis counts much more because the distance is squared. It plays the role that mass plays in linear motion.',
    }),
    sl('example', 'Worked example 11: four masses on a square frame', {
      b: r`Four masses of $${dec(sq.m, 2)}$ kg each are fixed at the corners of a light square frame of side $${dec(sq.a, 2)}$ m. Find the moment of inertia about the axis through the centre perpendicular to the frame, and the radius of gyration.`,
      ul: [
        r`Each corner is at distance $r = \dfrac{${dec(sq.a, 2)}}{\sqrt{2}}$ from the centre, so $r^2 = \dfrac{${dec(sq.a, 2)}^2}{2} = ${dec(sq.r2, 2)}$ m$^2$.`,
        r`$I = \sum m r^2 = 4 \times ${dec(sq.m, 2)} \times ${dec(sq.r2, 2)} = ${dec(sq.I, 2)}$ kg m$^2$.`,
        r`The **radius of gyration** $k$ is defined by $I = M k^2$, with $M = ${dec(sq.M, 2)}$ kg: $k = \sqrt{\dfrac{${dec(sq.I, 2)}}{${dec(sq.M, 2)}}} \approx ${dec(sq.k, 3)}$ m, which here equals $r$ because all the mass is at the same distance.`,
      ],
      v: T_sq,
      n: `Each corner is the same distance from the centre, so the square of that distance is half the square of the side, zero point one eight square metres. Four masses of half a kilogram give a moment of inertia of zero point three six kilogram metre squared. The radius of gyration, found from the moment of inertia divided by the total mass, is about zero point four two four metres.`,
    }),
    sl('concept', 'Moments of inertia of simple bodies, and radius of gyration', {
      b: 'For the standard uniform bodies of mass $M$ and radius $R$, about an axis through the centre, the values (stated, not derived) are $I = c\\,M R^2$.',
      ul: [
        r`Ring or hollow cylinder (about its axis): $c = 1$; hollow sphere (about a diameter): $c = \tfrac{2}{3}$; disc or solid cylinder (about its axis): $c = \tfrac{1}{2}$; solid sphere (about a diameter): $c = \tfrac{2}{5}$.`,
        r`Thin rod of length $L$ about an axis through its centre perpendicular to it: $I = \tfrac{1}{12} M L^2$.`,
        r`**Radius of gyration** $k = \sqrt{I/M}$: the distance at which the whole mass would have to be placed to give the same I. For a ring $k = R$; for a disc $k = R/\sqrt{2}$.`,
        'For the same mass and radius a ring has the largest I of the four because all its mass is at the greatest distance.',
      ],
      v: V.moi,
      n: 'For the same mass and radius, the moment of inertia about the central axis is largest for a ring, two thirds as much for a hollow sphere, half as much for a disc and two fifths for a solid sphere. A thin rod about its centre has one twelfth of mass times length squared. The radius of gyration is the square root of the moment of inertia divided by the mass.',
    }),
    sl('example', 'Worked example 12: a ring and a disc', {
      b: r`A ring and a disc each have mass $${dec(dr.M, 2)}$ kg and radius $${dec(dr.R, 2)}$ m. Find the moment of inertia and the radius of gyration of each about its axis.`,
      ul: [
        r`Ring: $I = M R^2 = ${dec(dr.M, 2)} \times ${dec(dr.R, 2)}^2 = ${dec(dr.Ir, 3)}$ kg m$^2$; $k = R = ${dec(dr.kr, 3)}$ m.`,
        r`Disc: $I = \tfrac{1}{2} M R^2 = \tfrac{1}{2} \times ${dec(dr.M, 2)} \times ${dec(dr.R, 2)}^2 = ${dec(dr.Id, 3)}$ kg m$^2$; $k = \dfrac{R}{\sqrt{2}} \approx ${dec(dr.kd, 3)}$ m.`,
        'The ring has twice the moment of inertia: it is twice as hard to start or stop turning.',
      ],
      v: T_disc,
      n: `For the ring the moment of inertia is mass times radius squared, which is half a kilogram metre squared. The disc has half of that, zero point two five. The radius of gyration of the ring equals its radius, while that of the disc is smaller, about zero point one eight metres. So the ring is twice as hard to start or stop turning.`,
    }),
    sl('concept', 'Rotation about a fixed axis: torque, angular momentum and energy', {
      b: 'For a rigid body turning about a fixed axis with angular velocity $\\omega$, each particle has speed $v = r\\omega$.',
      m: [r`L = I\omega, \qquad \tau = \dfrac{dL}{dt} = I\alpha, \qquad K = \tfrac{1}{2}I\omega^2`],
      ul: [
        r`Angular momentum about the axis: $L = \sum m r^2 \omega = I \omega$.`,
        r`Newton’s second law for rotation: $\tau = I\alpha$ with $\alpha = d\omega/dt$ the angular acceleration; the greater I, the smaller α for the same torque.`,
        r`Kinetic energy: $K = \sum \tfrac{1}{2} m v^2 = \tfrac{1}{2}(\sum m r^2)\omega^2 = \tfrac{1}{2} I \omega^2$, the rotational analogue of $\tfrac{1}{2} m v^2$.`,
        'A flywheel has its mass near the rim so that I is large: it stores more energy at a given ω and smooths the motion.',
      ],
      v: T_an,
      n: 'For a rigid body turning about a fixed axis, each particle moves at its distance times the angular velocity. Adding up gives angular momentum equal to I omega, torque equal to I times angular acceleration, and kinetic energy equal to half I omega squared. Each is the rotational twin of a linear relation, with moment of inertia taking the place of mass.',
    }),
    sl('example', 'Worked example 13: energy in a grinding wheel', {
      b: r`A grinding wheel is a uniform disc of mass $${dec(gw.M, 2)}$ kg and radius $${dec(gw.R, 2)}$ m turning at $${gw.rpm}$ revolutions per minute. Find its kinetic energy.`,
      ul: [
        r`$I = \tfrac{1}{2} M R^2 = \tfrac{1}{2} \times ${dec(gw.M, 2)} \times ${dec(gw.R, 2)}^2 = ${p3(gw.I)}$ kg m$^2$.`,
        r`$\omega = \dfrac{2\pi \times ${gw.rpm}}{60} \approx ${dec(gw.w, 4)}$ rad s$^{-1}$.`,
        r`$K = \tfrac{1}{2} I \omega^2 = \tfrac{1}{2} \times ${p3(gw.I)} \times ${dec(gw.w, 4)}^2 \approx ${dec(gw.K, 3)}$ J.`,
        'Doubling ω would make K four times as large.',
      ],
      v: plotKE,
      n: `First the moment of inertia of the disc: half of twelve times the radius squared, which is zero point two four kilogram metre squared. Six hundred revolutions per minute is about sixty two point eight radians per second. Half I omega squared then gives about four hundred and seventy four joules. Doubling the angular speed would make the energy four times larger.`,
    }),
    sl('example', 'Worked example 14: a constant torque on a flywheel', {
      b: r`A flywheel of moment of inertia $${dec(ft.I, 2)}$ kg m$^2$ starts from rest and a constant torque of $${dec(ft.tau, 2)}$ N m acts on it for $${dec(ft.t, 2)}$ s. Find its angular momentum, angular speed and kinetic energy at the end.`,
      ul: [
        r`$\tau = dL/dt$ is constant, so $L = \tau t = ${dec(ft.tau, 2)} \times ${dec(ft.t, 2)} = ${p3(ft.L)}$ kg m$^2$ s$^{-1}$.`,
        r`$\omega = \dfrac{L}{I} = \dfrac{${p3(ft.L)}}{${dec(ft.I, 2)}} = ${p3(ft.w)}$ rad s$^{-1}$ (the angular acceleration is $\tau/I = ${dec(ft.alpha, 2)}$ rad s$^{-2}$).`,
        r`$K = \tfrac{1}{2} I \omega^2 = \tfrac{1}{2} \times ${dec(ft.I, 2)} \times ${p3(ft.w)}^2 = ${p3(ft.K)}$ J, equal to the work done by the torque.`,
      ],
      v: T_ft,
      n: `A constant torque of six newton metres for five seconds produces an angular momentum of thirty. Dividing by the moment of inertia of two gives an angular speed of fifteen radians per second. The kinetic energy is half of two times fifteen squared, two hundred and twenty five joules, which equals the work done by the torque.`,
    }),
    sl('check', 'Quick check: torque and angular acceleration', {
      b: 'Find the angular acceleration.',
      v: T_an,
      chk: 'alpha-num',
      n: 'Use the rotational form of Newton’s second law: torque equals moment of inertia times angular acceleration.',
    }),
    sl('summary', 'Summary — Part 2', {
      b: 'Key results:',
      v: table(
        ['Idea', 'Result'],
        [
          ['Equilibrium', 'Σ F = 0 and Σ τ = 0 (about any point)'],
          ['Principle of moments', 'clockwise moments = anticlockwise moments'],
          ['Centre of gravity', 'weight acts there; = CM when g is uniform; stable while the plumb line is inside the base'],
          ['Couple', 'net force 0; torque F d, the same about every point'],
          ['Moment of inertia', 'I = Σ m r²; I = M k²; ring M R², disc ½ M R², solid sphere ⅖ M R²'],
          ['Rotation', 'L = I ω; τ = I α; K = ½ I ω²'],
        ],
        'Summary table of equilibrium, the principle of moments, centre of gravity, couples, moment of inertia and rotation about a fixed axis',
      ),
      n: `To sum up. A rigid body is in equilibrium when the external forces add to zero and the external torques add to zero. Clockwise and anticlockwise moments balance. The moment of inertia is the sum of mass times distance squared, and for rotation about a fixed axis the angular momentum is I omega, the torque is I alpha and the kinetic energy is half I omega squared.`,
    }),
    sl('exam-tips', 'Exam tips — Part 2', {
      ul: [
        'For equilibrium write both conditions; take moments about the point where the most unknown forces act.',
        'Resolve the force into components or find the perpendicular distance; do not multiply by the wrong distance.',
        'State the axis for I; the value for a body depends on the axis. Use the standard values only for the axes stated.',
        'In K = ½ I ω² use ω in radians per second: convert revolutions per minute by 2π/60.',
      ],
      v: T_an,
      n: `For equilibrium write both conditions and take moments about the point where the most unknown forces act. Use the perpendicular distance or the right component of the force. Always say which axis the moment of inertia refers to. When you use half I omega squared, convert revolutions per minute to radians per second first.`,
    }),
  ],
});

void MOI;
void tp;
void R6;
