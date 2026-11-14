// ISC 11 ch08 Work, Energy and Power — two decks. Part 1 (t01, t02, t03): work by constant and variable forces, kinetic energy and the
// work–energy theorem, potential energy, work in stretching a spring (U = ½kx²), conservative and non-conservative forces. Part 2 (t04,
// t05): conservation of mechanical energy (free fall, pendulum, roller coaster), the oscillating spring with energy graphs, E = mc² as a
// statement, power P = W/t and P = F·v. Every number and every graph is computed here from stated data. Collisions are chapter 9.
import { sl, deck, table, svgV, plot, r, dec } from '../../isc-11-physics-ch01/src/lib.mjs';
import { g, c, rad, R6 } from './phys.mjs';
import { W, N } from './words.mjs';
import * as G from './svgs.mjs';

const f = (x, n = 3) => dec(x, n);
const SUPD = { 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹', '-': '⁻' };
/** Plain-text scientific notation with superscript exponent, e.g. 9.0 × 10¹⁰. */
export const sciT = (x, n = 2) => {
  const e = Math.floor(Math.log10(Math.abs(x)));
  let m = Number((x / 10 ** e).toPrecision(n));
  let k = e;
  if (m >= 10) {
    m /= 10;
    k += 1;
  }
  return `${m.toFixed(n - 1)} × 10${String(k).split('').map((ch) => SUPD[ch]).join('')}`;
};

// ---------------------------------------------------------------- worked-example numbers
// work at an angle: the luggage trolley of the figure
const tow = { ...G.TOW_DATA };
tow.Wflat = tow.F * tow.S; // if the strap were horizontal
// variable force: the handcart of the figure
const vf = { pts: G.FX_DATA.pts, areas: G.FX_DATA.areas, W: G.FX_DATA.W };
// stopping distance: a car of 1200 kg, constant braking force 6000 N
const stop = { m: 1200, F: 6000, v1: 20, v2: 30 };
stop.K1 = 0.5 * stop.m * stop.v1 ** 2;
stop.K2 = 0.5 * stop.m * stop.v2 ** 2;
stop.s1 = stop.K1 / stop.F;
stop.s2 = stop.K2 / stop.F;
stop.k = stop.m / (2 * stop.F); // s = k v^2
// gravitational potential energy: a water can, and a 2 kg ball with two reference levels
const can = { m: 25, h: 6 };
can.U = can.m * g * can.h;
const ref = { m: 2, hShelf: 1.5, hTable: 0.8 };
ref.Ushelf = ref.m * g * ref.hShelf;
ref.Utable = ref.m * g * ref.hTable;
ref.diff = ref.Ushelf - ref.Utable;
ref.relTable = ref.m * g * (ref.hShelf - ref.hTable);
// spring: the stiffness and extension of the figures, a 0.04 m to 0.12 m stretch
const sp = { k: G.SPR_DATA.k, x1: 0.04, x2: 0.12, xm: 0.08 };
sp.U1 = 0.5 * sp.k * sp.x1 ** 2;
sp.Um = 0.5 * sp.k * sp.xm ** 2;
sp.U2 = 0.5 * sp.k * sp.x2 ** 2;
sp.W = sp.U2 - sp.U1;
sp.F2 = sp.k * sp.x2;
// two paths: a 12 kg load raised 5 m (vertically, or up a 13 m smooth ramp), and a crate dragged against 40 N of friction
const pth = { m: 12, h: 5, base: 12, ramp: 13, f: 40, straight: 13, legs: [5, 12] };
pth.Wg = -pth.m * g * pth.h;
pth.Wf1 = -pth.f * pth.straight;
pth.Wf2 = -pth.f * (pth.legs[0] + pth.legs[1]);
// free fall: the stone of the figure
const fl = { ...G.FALL_DATA, h1: 15 };
fl.v1 = Math.sqrt(2 * g * (fl.H - fl.h1));
fl.U1 = fl.m * g * fl.h1;
fl.K1 = fl.E - fl.U1;
fl.vg = Math.sqrt(2 * g * fl.H);
// pendulum
const pd = { ...G.PEND_DATA };
pd.th2 = 30;
pd.h2 = pd.L * (1 - Math.cos(rad(pd.th2)));
pd.v2 = Math.sqrt(2 * g * (pd.h - pd.h2));
pd.K2 = 0.5 * pd.m * pd.v2 ** 2;
pd.U2 = pd.m * g * pd.h2;
// roller coaster
const co = { ...G.COAST_DATA };
// oscillating spring
const os = { ...G.OSC_DATA, x: 0.05 };
os.U = 0.5 * os.k * os.x ** 2;
os.K = os.E - os.U;
os.v = Math.sqrt((2 * os.K) / os.m);
os.xeq = os.A / Math.sqrt(2);
os.w = Math.sqrt(os.k / os.m);
os.T = (2 * Math.PI) / os.w;
// mass-energy
const em = { dm: 2.5e-6, P: 100 };
em.E = em.dm * c * c;
em.years = em.E / em.P / (365 * 24 * 3600);
// power
const lift = { M: 1000, v: 1.5 };
lift.P = lift.M * g * lift.v;
const pump = { m: 1500, h: 20, t: 600 };
pump.W = pump.m * g * pump.h;
pump.P = pump.W / pump.t;
const car = { v: 25, F: 1400 };
car.P = car.F * car.v;
car.v2 = 30;
car.P2 = car.F * car.v2;
const kwh = { P: 100, hours: 10 };
kwh.E = (kwh.P * kwh.hours) / 1000; // kW h
kwh.J = kwh.P * kwh.hours * 3600;

export const EX = { tow, vf, stop, can, ref, sp, pth, fl, pd, co, os, em, lift, pump, car, kwh };

// ---------------------------------------------------------------- visuals
export const V = {
  tow: svgV(G.TOW, 'A luggage trolley pulled by a strap of 90 newtons at 35 degrees above the direction of motion, with the components 73.7 newtons along and 51.6 newtons across the motion and the displacement of 12 metres', 'Only F cos θ is along the displacement: W = F S cos θ.'),
  fx: svgV(G.FXAREA, 'A force against displacement graph for a handcart: a rise to 30 newtons over 2 metres, a steady 30 newtons to 6 metres and a fall to 10 newtons at 9 metres; the area under it, 30 plus 120 plus 60, is the work of 210 joules', 'Work is the area under the F–S graph.'),
  spa: svgV(G.SPRING_AREA, 'The graph of spring force against extension, a straight line of slope 500 newtons per metre; the triangle under it up to 0.12 metres has an area of 3.6 joules, which is the energy stored', 'U = area of the triangle = ½ k x².'),
  spring: svgV(G.SPRING, 'A block on a smooth table joined to a wall by a spring of stiffness 500 newtons per metre, shown relaxed, compressed by 0.12 metres and stretched by 0.12 metres, with the force and energy for each', 'The force opposes the displacement; the energy is ½kx² either way.'),
  fall: svgV(G.FALL, 'A 2 kilogram stone falling from 40 metres, shown at five heights with bars for potential and kinetic energy whose total stays 784 joules', 'PE falls and KE rises by the same amount.'),
  pend: svgV(G.PEND, 'A pendulum of length 1.5 metres released from 50 degrees: at the ends of the swing all the energy is potential, 2.10 joules, and at the lowest point it is all kinetic with a speed of 3.24 metres per second', 'Energy swings between potential and kinetic; the total is constant.'),
  coaster: svgV(G.COASTER, 'A roller-coaster track with points A at 30 metres, B at 5 metres, C at 18 metres and D at 2 metres and the speed at each found from energy conservation', 'Speed depends only on the drop below the starting level.'),
  osc: svgV(G.OSC, 'A block of 0.4 kilogram on a spring of stiffness 250 newtons per metre at four positions with energy bars: the total of 0.8 joules is shared between potential and kinetic energy', 'U + K = E at every position.'),
};

const ax = (label, min, max) => ({ label, min, max });
export const plotStop = plot(
  {
    x: ax('initial speed v (m s⁻¹)', 0, 30),
    y: ax('stopping distance s (m)', 0, 100),
    functions: [{ expr: `${R6(stop.k)}*x^2`, label: `s = ½mv²/F = ${f(stop.k, 2)} v² (1200 kg, braking force 6000 N)`, domain: [0, 30] }],
    points: [
      { at: [10, R6(stop.k * 100)], label: `${f(stop.k * 100, 3)} m at 10 m s⁻¹` },
      { at: [20, R6(stop.s1)], label: `${f(stop.s1, 3)} m at 20 m s⁻¹` },
      { at: [30, R6(stop.s2)], label: `${f(stop.s2, 3)} m at 30 m s⁻¹` },
    ],
  },
  'Stopping distance against initial speed for a 1200 kilogram car braked by a constant force of 6000 newtons: a parabola, 10 metres at 10 metres per second, 40 metres at 20 and 90 metres at 30',
  'Stopping distance grows as the square of the speed.',
);
const Ee = os.E;
export const plotEx = plot(
  {
    x: ax('displacement x (m)', -0.1, 0.1),
    y: ax('energy (J)', 0, 1),
    functions: [
      { expr: `${R6(0.5 * os.k)}*x^2`, label: 'potential energy U = ½kx²', domain: [-os.A, os.A] },
      { expr: `${R6(Ee)}-${R6(0.5 * os.k)}*x^2`, label: 'kinetic energy K = E − ½kx²', domain: [-os.A, os.A] },
    ],
    hlines: [{ y: R6(Ee), label: `total energy E = ${f(Ee, 2)} J`, dashed: true }],
    points: [
      { at: [0, R6(Ee)], label: `x = 0: K = ${f(Ee, 2)} J (maximum)` },
      { at: [os.A, R6(Ee)], label: `x = A: U = ${f(Ee, 2)} J` },
      { at: [R6(os.xeq), R6(Ee / 2)], label: `U = K = ${f(Ee / 2, 2)} J at x = ±${f(os.xeq, 3)} m` },
      { at: [R6(-os.xeq), R6(Ee / 2)], label: 'U = K again' },
    ],
  },
  'Energies against displacement for a 0.4 kilogram block on a 250 newton per metre spring with amplitude 0.08 metres: the potential energy is an upward parabola from zero at the centre to 0.8 joules at each end, the kinetic energy is the downward parabola from 0.8 joules at the centre to zero at the ends, and the total is the horizontal line at 0.8 joules',
  'U is a parabola, K an inverted parabola, E a horizontal line.',
);
export const plotEt = plot(
  {
    x: ax('time t (s)', 0, 0.26),
    y: ax('energy (J)', 0, 1),
    functions: [
      { expr: `${R6(Ee)}*cos(${f(os.w, 4)}*x)*cos(${f(os.w, 4)}*x)`, label: 'potential energy U', domain: [0, R6(os.T)] },
      { expr: `${R6(Ee)}*sin(${f(os.w, 4)}*x)*sin(${f(os.w, 4)}*x)`, label: 'kinetic energy K', domain: [0, R6(os.T)] },
    ],
    hlines: [{ y: R6(Ee), label: `E = ${f(Ee, 2)} J`, dashed: true }],
    points: [
      { at: [0, R6(Ee)], label: 'start at x = A: U = E' },
      { at: [R6(os.T / 8), R6(Ee / 2)], label: 'U = K' },
      { at: [R6(os.T / 4), R6(Ee)], label: 'at the centre: K = E' },
      { at: [R6(os.T / 2), R6(Ee)], label: 'other end: U = E' },
    ],
  },
  'Potential and kinetic energy against time for the oscillating block released from the extreme position: each varies between zero and 0.8 joules, the potential energy as cosine squared and the kinetic energy as sine squared, with period 0.251 seconds, and they always add to 0.8 joules',
  'U and K swap twice every period; their sum is steady.',
);
export const plotPv = plot(
  {
    x: ax('speed v (m s⁻¹)', 0, 40),
    y: ax('power P (kW)', 0, 60),
    functions: [{ expr: `${R6(car.F / 1000)}*x`, label: 'P = F v for a steady driving force of 1400 N', domain: [0, 40] }],
    points: [
      { at: [car.v, R6(car.P / 1000)], label: `${f(car.P / 1000, 3)} kW at ${car.v} m s⁻¹` },
      { at: [car.v2, R6(car.P2 / 1000)], label: `${f(car.P2 / 1000, 3)} kW at ${car.v2} m s⁻¹` },
    ],
  },
  'Power against speed for a steady driving force of 1400 newtons: a straight line through the origin, 35 kilowatts at 25 metres per second and 42 kilowatts at 30 metres per second',
  'For a given force the power is proportional to the speed.',
);

// ---------------------------------------------------------------- tables
const cosr = (d) => Math.round(Math.cos(rad(d)) * 1e6) / 1e6;
const s6 = (x) => String(R6(x)).replace('-', '−');
const T_UNITS = table(
  ['Quantity', 'Unit', 'Meaning and relation'],
  [
    ['Work and energy', 'joule (J)', '1 J = 1 N m: the work of a force of 1 N moving its point of application 1 m along the force'],
    ['Work and energy (CGS)', 'erg', '1 erg = 1 dyne cm; 1 J = 10⁷ erg'],
    ['Dimensions of work', '[M L² T⁻²]', 'The same as energy; work is a scalar'],
  ],
  'Table of the units of work and energy: the joule, the erg and the dimensions',
);
const T_SIGN = table(
  ['Angle θ', 'cos θ', 'Work for F = 10 N, S = 5 m', 'Example'],
  [
    ['0°', s6(cosr(0)), `${s6(10 * 5 * cosr(0))} J`, 'A loaded cart pushed straight along its path'],
    ['60°', s6(cosr(60)), `${s6(10 * 5 * cosr(60))} J`, 'An oblique pull on a trolley strap'],
    ['90°', '0', '0', 'The upward force of a porter’s head on a trunk carried along a level platform'],
    ['120°', s6(cosr(120)), `${s6(10 * 5 * cosr(120))} J`, 'A force slanting backwards against the motion'],
    ['180°', '−1', '−50 J', 'Friction, or the brakes, on a moving vehicle'],
  ],
  'Table of the angle between force and displacement, its cosine, the work for a force of 10 newtons and a displacement of 5 metres, and an example: positive up to 90 degrees, zero at 90 degrees, negative beyond',
);
const T_KE = table(
  ['Body', 'Mass', 'Speed', 'Kinetic energy ½mv²'],
  [
    ['Cricket ball in flight', '0.16 kg', '30 m s⁻¹', `${f(0.5 * 0.16 * 900, 3)} J`],
    ['Cyclist with cycle', '80 kg', '5 m s⁻¹', `${f(0.5 * 80 * 25, 4)} J`],
    ['Same cyclist at double the speed', '80 kg', '10 m s⁻¹', `${f(0.5 * 80 * 100, 4)} J (four times)`],
    ['City bus', '8000 kg', '15 m s⁻¹', `${f(0.5 * 8000 * 225, 4)} J`],
  ],
  'Table of the kinetic energy of a cricket ball, a cyclist at two speeds and a city bus, showing that doubling the speed multiplies the kinetic energy by four',
);
const T_PE = table(
  ['Reference level (U = 0)', 'U of the 2 kg ball on the shelf (1.5 m above the floor)', 'U of the ball on the table (0.8 m above the floor)', 'Difference'],
  [
    ['The floor', `${f(ref.Ushelf, 4)} J`, `${f(ref.Utable, 4)} J`, `${f(ref.diff, 4)} J`],
    ['The table top', `${f(ref.relTable, 4)} J (0.7 m above it)`, '0', `${f(ref.relTable, 4)} J`],
  ],
  'Table comparing the potential energy of a 2 kilogram ball on a shelf and on a table when the floor and when the table top is taken as the zero level: the values change but the difference does not',
);
const T_SPR = table(
  ['Extension x', 'Force kx', 'Stored energy ½kx²'],
  [
    [`${sp.x1} m`, `${f(sp.k * sp.x1, 3)} N`, `${f(sp.U1, 3)} J`],
    [`${sp.xm} m (double)`, `${f(sp.k * sp.xm, 3)} N`, `${f(sp.Um, 3)} J (four times)`],
    [`${sp.x2} m (three times)`, `${f(sp.F2, 3)} N`, `${f(sp.U2, 3)} J (nine times)`],
    [`from ${sp.x1} m to ${sp.x2} m`, '', `${f(sp.U2, 3)} − ${f(sp.U1, 3)} = ${f(sp.W, 3)} J of work`],
  ],
  'Table of the force and stored energy for a spring of stiffness 500 newtons per metre at extensions of 0.04, 0.08 and 0.12 metres, and the work to stretch it from 0.04 to 0.12 metres',
);
const T_CONS = table(
  ['', 'Conservative force', 'Non-conservative force'],
  [
    ['Work between two points', 'Does not depend on the path', 'Depends on the path'],
    ['Work around a closed path', 'Zero', 'Not zero'],
    ['Potential energy', 'Can be defined: W = −ΔU', 'Cannot be defined'],
    ['Examples', 'Gravity, the force of a spring, the electrostatic force', 'Friction, air drag, viscous drag'],
    ['Mechanical energy', 'Conserved when only such forces do work', 'Changes into heat and sound'],
  ],
  'Table comparing conservative and non-conservative forces: path dependence, closed path, potential energy, examples and effect on mechanical energy',
);
const T_PATH = table(
  ['Force', 'Path 1', 'Path 2', 'Result'],
  [
    ['Gravity on a 12 kg load raised 5 m', `straight up 5 m: −${f(-pth.Wg, 3)} J`, `up a smooth ramp 13 m long: −${f(-pth.Wg, 3)} J`, 'Same: path independent'],
    ['Friction of 40 N on a dragged crate', `straight 13 m: −${f(-pth.Wf1, 3)} J`, `5 m then 12 m: −${f(-pth.Wf2, 3)} J`, 'Different: path dependent'],
    ['Gravity on the load, up and then back down', `−${f(-pth.Wg, 3)} J + ${f(-pth.Wg, 3)} J`, '', 'Zero round the closed path'],
    ['Friction on the crate, there and back', `−${f(-pth.Wf1, 3)} J − ${f(-pth.Wf1, 3)} J`, '', `−${f(-2 * pth.Wf1, 3)} J: not zero`],
  ],
  'Table of the work of gravity and of friction along two different paths and around a closed path: gravity gives the same work on both paths and zero round a loop, friction does not',
);
const T_TRANSF = table(
  ['Situation', 'Energy change', 'Mechanical energy conserved?'],
  [
    ['Stone falling in vacuum', 'gravitational PE → KE', 'Yes'],
    ['Pendulum bob swinging (ideal)', 'PE ↔ KE', 'Yes'],
    ['Mass on a spring (smooth table)', 'elastic PE ↔ KE', 'Yes'],
    ['Cyclist braking to rest', 'KE → heat at the brake blocks', 'No: friction is non-conservative'],
    ['Water falling in a hydroelectric dam', 'PE → KE → electrical energy', 'Converted by the turbine'],
  ],
  'Table of energy transformations in five situations and whether mechanical energy is conserved: falling stone, pendulum, spring, braking cyclist and a hydroelectric dam',
);
const T_PEND = table(
  ['Position', 'Height above the lowest point', 'PE', 'KE', 'Speed'],
  [
    ['A (released at 50°)', `${f(pd.h, 3)} m`, `${f(pd.E, 3)} J`, '0', '0'],
    [`At ${pd.th2}° from the vertical`, `${f(pd.h2, 3)} m`, `${f(pd.U2, 3)} J`, `${f(pd.K2, 3)} J`, `${f(pd.v2, 3)} m s⁻¹`],
    ['B (lowest point)', '0', '0', `${f(pd.E, 3)} J`, `${f(pd.v, 3)} m s⁻¹`],
  ],
  'Table of the height, potential energy, kinetic energy and speed of the 0.4 kilogram pendulum bob at the release point, at 30 degrees and at the lowest point',
);
const yrs = (kg) => (kg * c * c) / em.P / (365 * 24 * 3600);
const T_EMC = table(
  ['Mass converted', 'Energy E = mc² (c = 3.0 × 10⁸ m s⁻¹)', 'For comparison'],
  [
    ['1 mg (1 × 10⁻⁶ kg)', `${sciT(1e-6 * c * c)} J`, `Runs a 100 W bulb for about ${f(yrs(1e-6), 2)} years`],
    ['1 g (1 × 10⁻³ kg)', `${sciT(1e-3 * c * c)} J`, `Runs a 100 W bulb for about ${f(yrs(1e-3), 2)} years`],
    [`${f(em.dm * 1e6, 2)} mg`, `${sciT(em.E, 3)} J`, `Runs a 100 W bulb for about ${f(em.years, 2)} years`],
  ],
  'Table of the energy equivalent of 1 milligram, 1 gram and 2.5 milligrams of mass using E equals m c squared',
);
const T_POWER = table(
  ['Quantity', 'Unit', 'Relation'],
  [
    ['Power', 'watt (W)', '1 W = 1 J s⁻¹'],
    ['Larger units', 'kilowatt, megawatt', '1 kW = 10³ W; 1 MW = 10⁶ W'],
    ['Engine rating', 'horse power (hp)', '1 hp = 746 W'],
    ['Electrical energy', 'kilowatt hour (kW h)', `1 kW h = 3.6 × 10⁶ J (a ${kwh.P} W bulb for ${kwh.hours} h uses ${f(kwh.E, 2)} kW h)`],
    ['Typical power (approximate)', '—', 'Ceiling fan 75 W; scooter engine 5 kW; small car 60 kW; electric locomotive 4 MW'],
  ],
  'Table of the units of power: watt, kilowatt, megawatt, horse power and kilowatt hour with their relations and some approximate typical powers',
);
const T_LIFT = table(
  ['Machine', 'Working', 'Power'],
  [
    [`Lift: ${lift.M} kg at a steady ${lift.v} m s⁻¹`, `P = F v = ${lift.M} × 9.8 × ${lift.v}`, `${f(lift.P, 4)} W = ${f(lift.P / 1000, 3)} kW`],
    [`Pump: ${pump.m} kg of water raised ${pump.h} m in ${pump.t} s`, `P = mgh / t = ${pump.m} × 9.8 × ${pump.h} / ${pump.t}`, `${f(pump.P, 3)} W`],
    [`Car at a steady ${car.v} m s⁻¹ against ${car.F} N`, `P = F v = ${car.F} × ${car.v}`, `${f(car.P, 4)} W = ${f(car.P / 1000, 3)} kW`],
  ],
  'Table of the power of a lift, a water pump and a car, each worked out from the force and speed or from the work and time',
);
export const TABLES = { T_UNITS, T_SIGN, T_KE, T_PE, T_SPR, T_CONS, T_PATH, T_TRANSF, T_PEND, T_EMC, T_POWER, T_LIFT };

// ================================================================ DECK 1
export const deck1 = deck({
  part: 1,
  title: 'Work, Energy and Power — Part 1: Work, kinetic energy, potential energy and the spring',
  goals: [
    'Calculate the work done by a constant force using W = F·S = FS cos θ, and by a variable force as the area under the F–S graph',
    'Derive the work–energy theorem for a constant force and use it to find the stopping distance of a vehicle',
    'Derive U = ½kx² for a spring by area and by integration, and state what potential energy is',
    'Distinguish conservative from non-conservative forces with examples',
  ],
  slides: [
    sl('title', 'Work, Energy and Power', {
      b: 'Part 1 — work by constant and variable forces, kinetic energy and the work–energy theorem, potential energy, the spring, and conservative forces.',
      v: V.tow,
      n: 'A porter drags a trunk along a platform, and a stone is lifted to a roof. In both, a force acts through a distance. In this part we measure that effort as work, link it to the kinetic energy a body gains, and meet stored energy in a raised stone and a stretched spring.',
    }),
    sl('concept', 'What is work?', {
      b: 'In physics, **work** is done when a force moves the body it acts on. Only the part of the force **along the displacement** counts.',
      ul: [
        'Work is a **scalar**: it has a sign but no direction.',
        r`SI unit: the **joule** (J). $1$ J is the work of a force of $1$ N when the body moves $1$ m along the force, so $1\ \text{J} = 1\ \text{N m}$.`,
        r`Dimensions $[\text{M}\,\text{L}^{2}\,\text{T}^{-2}]$. In the CGS system the unit is the **erg**, and $1\ \text{J} = 10^{7}$ erg.`,
        'Pushing hard against a wall that does not move does no work.',
      ],
      v: T_UNITS,
      n: 'In physics, work is done only when a force moves the body it acts on, and only the part of the force along the displacement counts. Work is a scalar, so it has a sign but no direction. Its unit is the joule, which is one newton metre. In the smaller C G S system the unit is the erg, and one joule is ten million ergs. Pushing a wall that does not move does no work.',
    }),
    sl('concept', 'Work done by a constant force', {
      b: r`A constant force $\vec F$ acts on a body whose displacement is $\vec S$, with angle $\theta$ between them. The work is the **scalar (dot) product**:`,
      m: [r`W = \vec F \cdot \vec S = F\,S\cos\theta`],
      ul: [
        r`$F\cos\theta$ is the component of the force along the displacement; $F\sin\theta$ is perpendicular to it and does **no** work.`,
        r`In the figure a strap pulls a trolley with $${tow.F}$ N at $${tow.th}^\circ$ above the track through $${tow.S}$ m: $W = ${f(tow.Fx)} \times ${tow.S} = ${f(tow.W, 4)}$ J.`,
        r`$S$ is the **displacement** of the body, not the length of the path, and $F$ must stay constant in size and direction.`,
      ],
      v: V.tow,
      n: `When a constant force makes an angle theta with the displacement, the work done is the force times the displacement times the cosine of theta. This is the scalar product of the two vectors. The part of the force across the displacement does no work. In the figure the pull is ${N(tow.F)} newtons at ${N(tow.th)} degrees through ${N(tow.S)} metres, so the work is ${N(tow.W)} joules.`,
    }),
    sl('concept', 'Positive, zero and negative work', {
      b: r`The sign of $W = FS\cos\theta$ is the sign of $\cos\theta$.`,
      ul: [
        r`**Positive** ($0^\circ \le \theta < 90^\circ$): the force has a component along the motion and the body **gains** energy.`,
        r`**Zero** ($\theta = 90^\circ$, or no displacement): the force is perpendicular to the motion, as for the weight of a trunk carried along a level platform.`,
        r`**Negative** ($90^\circ < \theta \le 180^\circ$): the force opposes the motion, as friction or the brakes do; the body **loses** energy.`,
      ],
      v: T_SIGN,
      n: 'The sign of the work follows the sign of the cosine of the angle. If the force has a component along the motion, the work is positive and the body gains energy. If the force is perpendicular to the motion, as the weight of a trunk carried along a level platform, the work is zero. If the force opposes the motion, as friction does, the work is negative and the body loses energy.',
    }),
    sl('check', 'Quick check: the sign of the work', {
      b: 'Choose the correct option.',
      v: T_SIGN,
      chk: 'sign-mcq',
      n: 'Ask which way the force points compared with the motion.',
    }),
    sl('example', 'Worked example 1: pulling a trolley', {
      b: r`A porter pulls a luggage trolley through $${tow.S}$ m along a level platform with a strap that exerts a constant force of $${tow.F}$ N at $${tow.th}^\circ$ above the horizontal. Find the work done by (i) the strap, (ii) the weight and the normal reaction of the platform.`,
      ul: [
        r`(i) $W = FS\cos\theta = ${tow.F} \times ${tow.S} \times \cos ${tow.th}^\circ = ${tow.F} \times ${tow.S} \times ${f(Math.cos(rad(tow.th)), 4)} = ${f(tow.W, 4)}$ J.`,
        r`(ii) Weight and normal reaction are vertical, perpendicular to the displacement: $\cos 90^\circ = 0$, so each does **zero** work.`,
        r`Had the strap been horizontal the work would be $${tow.F} \times ${tow.S} = ${f(tow.Wflat, 4)}$ J: tilting the strap wastes a part of the pull.`,
      ],
      v: V.tow,
      n: `The work done by the strap is the force times the displacement times the cosine of thirty five degrees. That is ${N(tow.F)} times ${N(tow.S)} times ${N(Math.cos(rad(tow.th)), 3)}, which is ${N(tow.W)} joules. The weight and the normal reaction are vertical, at ninety degrees to the motion, so they do no work. A horizontal strap would give ${N(tow.Wflat)} joules.`,
    }),
    sl('concept', 'Work by a variable force: area under the F–S graph', {
      b: r`When the force changes along the path, divide the displacement into thin strips $\Delta S$. In each strip $F$ is nearly constant, so the work is $\Delta W = F\,\Delta S$, the **area of the strip**. Adding all the strips:`,
      m: [r`W = \sum F\,\Delta S \;\longrightarrow\; W = \int_{S_1}^{S_2} F\,dS`],
      ul: [
        '**Work = area under the force–displacement graph** between the two limits.',
        r`For a constant force the area is a rectangle, $W = FS$.`,
        'Area **below** the S-axis (force opposing the displacement) counts as **negative** work.',
      ],
      v: V.fx,
      n: 'If the force changes along the path, cut the displacement into thin strips. In each strip the force is almost constant, so the work is the force times the width, which is the area of the strip. Adding all the strips gives the integral of the force over the displacement. So the work done equals the area under the force displacement graph. Area below the axis counts as negative work.',
    }),
    sl('example', 'Worked example 2: a handcart on a rough track', {
      b: 'The graph shows the force exerted along the track on a loaded handcart as it is pushed through $9$ m. Find the work done.',
      ul: [
        r`From $0$ to $2$ m the force rises from $0$ to $30$ N: a triangle, $\tfrac12 \times 2 \times 30 = ${vf.areas[0]}$ J.`,
        r`From $2$ m to $6$ m it stays at $30$ N: a rectangle, $4 \times 30 = ${vf.areas[1]}$ J.`,
        r`From $6$ m to $9$ m it falls from $30$ N to $10$ N: a trapezium, $\tfrac12 (30 + 10) \times 3 = ${vf.areas[2]}$ J.`,
        r`Total work $= ${vf.areas.join(' + ')} = ${vf.W}$ J.`,
      ],
      v: V.fx,
      n: `Split the area under the graph into three simple shapes. The first two metres give a triangle of ${N(vf.areas[0])} joules. The next four metres give a rectangle of ${N(vf.areas[1])} joules. The last three metres give a trapezium, half of thirty plus ten, times three, which is ${N(vf.areas[2])} joules. The total work done is ${N(vf.W)} joules.`,
    }),
    sl('check', 'Quick check: reading the area', {
      b: 'Choose the correct option.',
      v: V.fx,
      chk: 'area-mcq',
      n: 'Work is the area under the graph.',
    }),
    sl('concept', 'Kinetic energy', {
      b: r`The **kinetic energy** of a body of mass $m$ moving with speed $v$ is the energy it has because of its motion:`,
      m: [r`K = \tfrac{1}{2}\,m\,v^{2}`],
      ul: [
        'It is a **scalar** and never negative; its unit is the joule.',
        'It depends on the **square** of the speed: doubling the speed makes the kinetic energy four times as large.',
        r`In terms of momentum $p = mv$: $K = \dfrac{p^{2}}{2m}$, so for equal momenta the lighter body has the larger kinetic energy.`,
      ],
      v: T_KE,
      n: 'The kinetic energy of a body is half its mass times the square of its speed. It is a scalar, it is never negative, and its unit is the joule. Because the speed is squared, doubling the speed makes the kinetic energy four times as large. In terms of momentum, kinetic energy is the square of the momentum divided by twice the mass.',
    }),
    sl('concept', 'The work–energy theorem', {
      b: r`A constant **net** force $F$ acts on a body of mass $m$ along a straight line and changes its speed from $u$ to $v$ over a displacement $S$.`,
      m: [r`F = ma, \qquad v^{2} - u^{2} = 2aS`, r`W = FS = (ma)S = m\,\dfrac{v^{2}-u^{2}}{2}`, r`\boxed{\,W_{\text{net}} = \tfrac12 mv^{2} - \tfrac12 mu^{2} = K_f - K_i\,}`],
      ul: [
        '**Work–energy theorem:** the net work done on a body equals the change in its kinetic energy.',
        'Positive net work raises the kinetic energy; negative net work lowers it. The theorem also holds when the force varies (stated here without proof).',
      ],
      n: 'Take a constant net force on a body of mass m. Newton\'s second law gives the force as mass times acceleration, and the equation of motion gives the square of the final speed minus the square of the initial speed as twice the acceleration times the displacement. The work, force times displacement, then equals half m v squared minus half m u squared. The net work done equals the change in kinetic energy.',
    }),
    sl('example', 'Worked example 3: stopping distance of a car', {
      b: r`A car of mass $${stop.m}$ kg moving at $${stop.v1}$ m s$^{-1}$ is brought to rest by a constant braking force of $${stop.F}$ N. Find the stopping distance, and the distance if the speed were $${stop.v2}$ m s$^{-1}$.`,
      ul: [
        r`Work done by the brakes $= -Fs$; final $K = 0$. Theorem: $-Fs = 0 - \tfrac12 mv^{2}$, so $s = \dfrac{mv^{2}}{2F}$.`,
        r`At $${stop.v1}$ m s$^{-1}$: $K_i = \tfrac12 \times ${stop.m} \times ${stop.v1}^2 = ${f(stop.K1, 6)}$ J, so $s = ${f(stop.K1, 6)} / ${stop.F} = ${f(stop.s1, 4)}$ m.`,
        r`At $${stop.v2}$ m s$^{-1}$: $s = ${f(stop.s2, 4)}$ m. Speed $\times 1.5$ gives distance $\times 2.25$: **$s \propto v^{2}$**.`,
      ],
      v: plotStop,
      n: `The brakes do negative work, minus the force times the distance. The car ends at rest, so this equals minus the initial kinetic energy. The distance is the kinetic energy divided by the braking force. At twenty metres per second the kinetic energy is ${N(stop.K1, 3)} joules, so the car stops in ${N(stop.s1)} metres. At thirty metres per second it needs ${N(stop.s2)} metres. The distance grows as the square of the speed.`,
    }),
    sl('check', 'Quick check: speed and stopping distance', {
      b: 'Choose the correct option.',
      v: plotStop,
      chk: 'stop-mcq',
      n: 'Use the stopping distance equals kinetic energy over the braking force.',
    }),
    sl('concept', 'Potential energy: gravity', {
      b: r`**Potential energy** is the energy a body has because of its position or configuration in a field of a conservative force.`,
      m: [r`U = mgh`],
      ul: [
        r`Lifting a body slowly through a height $h$ needs a force $mg$, so the agent does $mgh$ of work, which is stored as gravitational potential energy (near the Earth, with $g$ constant).`,
        r`Work done **by gravity** over the same rise is $-mgh$, so $W_{\text{gravity}} = -\Delta U$.`,
        r`The zero of $U$ is chosen freely; only **differences** of $U$ have meaning.`,
        r`A $${can.m}$ kg can of water raised $${can.h}$ m gains $${can.m} \times 9.8 \times ${can.h} = ${f(can.U, 4)}$ J.`,
      ],
      v: T_PE,
      n: `Potential energy is energy stored by position. Lifting a body slowly through a height h needs a force equal to its weight, so the work done is m g h, and that is stored as gravitational potential energy. Gravity itself does minus m g h on the way up. The zero level can be chosen freely, because only differences matter. A twenty five kilogram can raised six metres gains ${N(can.U, 4)} joules.`,
    }),
    sl('concept', 'The spring force', {
      b: r`A spring that is stretched or compressed by $x$ from its natural length pulls or pushes back with a **restoring force** (Hooke's law, within the elastic limit):`,
      m: [r`F = -kx`],
      ul: [
        r`$k$ is the **force constant** (stiffness) of the spring in N m$^{-1}$; the minus sign says the force opposes the displacement.`,
        r`To change the length slowly, the outside agent must apply $+kx$: the force **grows** with the extension, so it is a variable force.`,
        r`For the spring in the figure $k = 500$ N m$^{-1}$: at $x = 0.12$ m the force is $60$ N, towards the relaxed position.`,
      ],
      v: V.spring,
      n: 'A spring that is stretched or compressed pulls or pushes back with a force equal to minus k times the displacement. The constant k, the stiffness, is measured in newtons per metre, and the minus sign says that the force opposes the displacement. To change the length slowly, we must apply a force that grows with the extension. In the figure, stiffness five hundred, a displacement of zero point one two metres gives sixty newtons.',
    }),
    sl('concept', 'Work done in stretching a spring: U = ½kx²', {
      b: r`The applied force grows from $0$ to $kx$, so the work is the **area under the F–x graph**: a triangle of base $x$ and height $kx$.`,
      m: [r`W = \tfrac12 \times x \times kx = \tfrac12 kx^{2}`, r`W = \int_{0}^{x} kx'\,dx' = \Big[\tfrac12 kx'^{2}\Big]_{0}^{x} = \tfrac12 kx^{2}`],
      ul: [
        r`This work is stored as the **elastic potential energy** $U = \tfrac12 kx^{2}$, the same for a stretch or a compression of the same size, since $x^{2}$ is positive.`,
        r`In the figure: $\tfrac12 \times 0.12 \times 60 = ` + f(sp.U2, 3) + r`$ J.`,
      ],
      v: V.spa,
      n: `The applied force grows steadily from zero to k x, so the work is the area under the force extension graph. That is a triangle of base x and height k x, which gives half k x squared. Integrating k x from zero to x gives the same result. This work is stored as elastic potential energy. For stiffness five hundred and extension zero point one two, the energy is ${N(sp.U2)} joules.`,
    }),
    sl('example', 'Worked example 4: stretching a spring further', {
      b: r`A spring of force constant $${sp.k}$ N m$^{-1}$ is stretched from $${sp.x1}$ m to $${sp.x2}$ m. Find the energy stored at each extension and the work done in this stretch.`,
      ul: [
        r`$U_1 = \tfrac12 \times ${sp.k} \times ${sp.x1}^2 = ${f(sp.U1, 3)}$ J and $U_2 = \tfrac12 \times ${sp.k} \times ${sp.x2}^2 = ${f(sp.U2, 3)}$ J.`,
        r`$W = U_2 - U_1 = ${f(sp.U2, 3)} - ${f(sp.U1, 3)} = ${f(sp.W, 3)}$ J.`,
        r`Check with the area: a trapezium of parallel sides $${f(sp.k * sp.x1, 3)}$ N and $${f(sp.F2, 3)}$ N, width $${f(sp.x2 - sp.x1, 2)}$ m: $\tfrac12 (${f(sp.k * sp.x1, 3)} + ${f(sp.F2, 3)}) \times ${f(sp.x2 - sp.x1, 2)} = ${f(sp.W, 3)}$ J.`,
      ],
      v: T_SPR,
      n: `At zero point zero four metres the stored energy is ${N(sp.U1)} joules, and at zero point one two metres it is ${N(sp.U2)} joules. The work done in the extra stretch is the difference, ${N(sp.W)} joules. The area under the graph, a trapezium, gives the same answer. Notice that tripling the extension multiplies the energy by nine.`,
    }),
    sl('concept', 'Conservative and non-conservative forces', {
      b: 'A force is **conservative** if the work it does between two points does not depend on the path, so that the work around any **closed path is zero**.',
      ul: [
        '**Conservative:** gravity, the force of a spring, the electrostatic force. A potential energy can be defined: $W = -\\Delta U$.',
        '**Non-conservative:** friction, air drag, viscous drag. The work depends on the path (and is negative along every part), the work around a closed path is not zero, and no potential energy exists.',
        'Test: is the work the same along every route between the same two points?',
      ],
      v: T_CONS,
      n: 'A force is conservative if the work it does between two points does not depend on the path taken. Then the work around a closed path is zero, and a potential energy can be defined. Gravity, the spring force and the electrostatic force are conservative. Friction and drag are not. Their work depends on the path, is not zero around a loop, and no potential energy can be assigned.',
    }),
    sl('concept', 'Two forces compared on two paths', {
      b: r`A $12$ kg load is raised $5$ m, straight up or up a smooth ramp $13$ m long (base $12$ m). A crate is dragged against a friction force of $40$ N from A to B, straight ($13$ m) or along the two sides of a right angle ($5$ m then $12$ m).`,
      ul: [
        r`Gravity: $-mgh = -` + f(-pth.Wg, 3) + r`$ J on **both** routes (on the ramp, $-mg\sin\theta \times 13 = -mg \times 5$). Conservative.`,
        r`Friction: $-` + f(-pth.Wf1, 3) + r`$ J on one route and $-` + f(-pth.Wf2, 3) + r`$ J on the other. Non-conservative.`,
        'Round trip: gravity gives zero, friction gives double the one-way loss.',
      ],
      v: T_PATH,
      n: `Raise a twelve kilogram load five metres straight up, or up a thirteen metre ramp. Gravity does minus ${N(-pth.Wg, 3)} joules either way. Now drag a crate against forty newtons of friction, straight for thirteen metres, or five metres plus twelve metres. The friction does minus ${N(-pth.Wf1)} joules on one route and minus ${N(-pth.Wf2)} on the other. Gravity is conservative. Friction is not.`,
    }),
    sl('check', 'Quick check: conservative forces', {
      b: 'Choose the correct option.',
      v: T_PATH,
      chk: 'cons-mcq',
      n: 'Think about the work around a closed path.',
    }),
    sl('summary', 'Summary — Part 1', {
      b: 'Key results:',
      v: table(
        ['Idea', 'Result'],
        [
          ['Work, constant force', 'W = F·S = F S cos θ; scalar; joule'],
          ['Work, variable force', 'Area under the F–S graph = ∫F dS'],
          ['Kinetic energy', 'K = ½mv² = p²/2m'],
          ['Work–energy theorem', 'W(net) = K(final) − K(initial)'],
          ['Stopping distance', 's = mv²/2F, proportional to v²'],
          ['Gravitational PE', 'U = mgh; only differences matter'],
          ['Spring', 'F = −kx; U = ½kx² (area of the triangle)'],
          ['Conservative force', 'Work independent of path, zero on a closed path; gravity, spring'],
        ],
        'Summary table of work, kinetic energy, the work–energy theorem, stopping distance, potential energy, the spring and conservative forces',
      ),
      n: 'Work is force times displacement times the cosine of the angle between them, or the area under the force displacement graph. Kinetic energy is half m v squared, and the net work equals the change in kinetic energy. Gravitational potential energy is m g h. A spring stores half k x squared. Conservative forces do path independent work, and gravity and the spring force are the examples.',
    }),
    sl('exam-tips', 'Exam tips — Part 1', {
      ul: [
        r`Name the angle: $\theta$ is between the **force** and the **displacement**. For a body on a slope, check which angle the question gives.`,
        'Work is a scalar: state its sign. Friction and brakes do **negative** work.',
        'For the work–energy theorem write: **net** work $=$ change in kinetic energy, then substitute. For the derivation, quote $F = ma$ and $v^2 - u^2 = 2aS$.',
        r`For $U = \frac12 kx^2$ show **either** the area of the triangle **or** the integral of $kx$ with its limits, and say the work is stored.`,
        r`Common mistakes: using the path length instead of the displacement; writing $\frac12 kx$ instead of $\frac12 kx^2$; forgetting that stopping distance is proportional to the **square** of the speed; calling friction conservative.`,
      ],
      v: T_CONS,
      n: 'Name the angle clearly: it is between the force and the displacement. Give the sign of the work. For the work energy theorem, say net work equals change in kinetic energy, and quote the equations you use in the derivation. For the spring, show the area of the triangle or the integral. Common mistakes are using path length instead of displacement, dropping the square in half k x squared, and calling friction conservative.',
    }),
  ],
});

// ================================================================ DECK 2
export const deck2 = deck({
  part: 2,
  title: 'Work, Energy and Power — Part 2: Conservation of energy, the oscillating spring and power',
  goals: [
    'State and apply the conservation of mechanical energy to free fall, a pendulum and a roller coaster',
    'Show that U + K stays constant for a mass on an oscillating spring and draw the energy graphs',
    'State E = mc² and use it to find the energy equivalent of a small mass',
    'Calculate power from P = W/t and P = F·v for lifts, pumps and vehicles',
  ],
  slides: [
    sl('title', 'Conservation of Energy and Power', {
      b: 'Part 2 — mechanical energy and its conservation, the pendulum, the roller coaster, the oscillating spring, mass–energy and power.',
      v: V.fall,
      n: 'A stone dropped from a tower speeds up as it falls, yet its potential energy and kinetic energy always add up to the same total. In this part we use that idea for a pendulum, a roller coaster and a spring, meet the energy of mass, and then ask how fast work is done, which is power.',
    }),
    sl('concept', 'Mechanical energy and its conservation', {
      b: r`The **mechanical energy** of a body is the sum of its kinetic and potential energies: $E = K + U$.`,
      m: [r`W_{\text{cons}} = \Delta K \quad\text{and}\quad W_{\text{cons}} = -\Delta U \;\Rightarrow\; \Delta K + \Delta U = 0 \;\Rightarrow\; K + U = \text{constant}`],
      ul: [
        '**Law of conservation of mechanical energy:** if only conservative forces do work, the total mechanical energy stays constant; energy changes form but is not lost.',
        'Friction and drag are non-conservative: they turn mechanical energy into heat, but the **total** energy (including heat) is still conserved.',
      ],
      v: T_TRANSF,
      n: 'The mechanical energy of a body is its kinetic energy plus its potential energy. The work done by a conservative force equals the gain in kinetic energy and also the loss in potential energy, so the gain in kinetic energy exactly equals the loss in potential energy. If only conservative forces act, the mechanical energy stays constant. Friction turns it into heat, but the total energy is still conserved.',
    }),
    sl('concept', 'Free fall: energy at every height', {
      b: r`A stone of mass $m$ is released from rest at height $H$. At height $h$ it has fallen $H - h$.`,
      m: [r`mgH = mgh + \tfrac12 mv^{2} \;\Rightarrow\; v^{2} = 2g\,(H - h)`, r`v = \sqrt{2g\,(H-h)} \quad\text{(the mass cancels)}`],
      ul: [
        r`Potential energy falls and kinetic energy rises by the **same** amount (bars in the figure); the total of $` + f(fl.E, 4) + r`$ J never changes.`,
        r`On reaching the ground ($h = 0$): $v = \sqrt{2gH} = ` + f(fl.vg, 3) + r`$ m s$^{-1}$ for $H = ` + fl.H + r`$ m.`,
        'The speed depends only on the **height fallen**, not on the mass.',
      ],
      v: V.fall,
      n: 'Release a stone from rest at height H. At any lower height h, the starting potential energy equals the new potential energy plus the kinetic energy. The mass cancels, and the speed is the square root of two g times the height fallen. The potential energy falls and the kinetic energy rises by the same amount, so the total never changes. The speed depends only on the height fallen, not on the mass.',
    }),
    sl('example', 'Worked example 5: the stone at 15 metres', {
      b: r`The $${fl.m}$ kg stone of the figure is released from rest at $${fl.H}$ m. Taking $g = 9.8$ m s$^{-2}$ and the ground as the zero of $U$, find its kinetic energy and speed at $${fl.h1}$ m, and its speed on reaching the ground.`,
      ul: [
        r`Total $E = mgH = ${fl.m} \times 9.8 \times ${fl.H} = ${f(fl.E, 4)}$ J.`,
        r`At $${fl.h1}$ m: $U = ${fl.m} \times 9.8 \times ${fl.h1} = ${f(fl.U1, 4)}$ J, so $K = ${f(fl.E, 4)} - ${f(fl.U1, 4)} = ${f(fl.K1, 4)}$ J.`,
        r`$v = \sqrt{2K/m} = \sqrt{2 \times ${f(fl.K1, 4)} / ${fl.m}} = ${f(fl.v1, 3)}$ m s$^{-1}$; on the ground $v = \sqrt{2 \times 9.8 \times ${fl.H}} = ${f(fl.vg, 3)}$ m s$^{-1}$.`,
      ],
      v: V.fall,
      n: `The total energy is mass times g times height, ${N(fl.E, 4)} joules. At fifteen metres the potential energy is ${N(fl.U1, 4)} joules, so the kinetic energy is the rest, ${N(fl.K1, 4)} joules. The speed is the square root of two K over m, which is ${N(fl.v1)} metres per second. On reaching the ground the speed is ${N(fl.vg)} metres per second.`,
    }),
    sl('concept', 'The simple pendulum', {
      b: r`A bob of mass $m$ on a string of length $L$ is released from rest at angle $\theta_0$. The tension is always perpendicular to the motion and does **no work**, so only gravity (conservative) does work.`,
      m: [r`h = L(1-\cos\theta_0)`, r`mgh = \tfrac12 mv^{2} \;\Rightarrow\; v = \sqrt{2gL\,(1-\cos\theta_0)}`],
      ul: [
        '**At the ends of the swing:** speed zero, kinetic energy zero, potential energy greatest.',
        '**At the lowest point:** potential energy least (taken as zero), kinetic energy greatest, speed greatest.',
        'Energy changes continually between the two; the total stays constant.',
      ],
      v: V.pend,
      n: 'A pendulum bob swings under gravity and the string tension. The tension is always at right angles to the motion, so it does no work. Only gravity does work, and gravity is conservative. At the ends of the swing the bob is momentarily at rest with the most potential energy. At the lowest point the potential energy is least and the kinetic energy is greatest. The total stays constant.',
    }),
    sl('example', 'Worked example 6: the pendulum bob', {
      b: r`The pendulum of the figure has $L = ${pd.L}$ m, $m = ${pd.m}$ kg and is released from $${pd.th0}^\circ$. Find the speed at the lowest point and at $${pd.th2}^\circ$ from the vertical. ($g = 9.8$ m s$^{-2}$.)`,
      ul: [
        r`Height at release: $h = ${pd.L}(1 - \cos ${pd.th0}^\circ) = ${f(pd.h, 4)}$ m, so $E = mgh = ${f(pd.E, 4)}$ J.`,
        r`Lowest point: $v = \sqrt{2gh} = \sqrt{2 \times 9.8 \times ${f(pd.h, 4)}} = ${f(pd.v, 3)}$ m s$^{-1}$.`,
        r`At $${pd.th2}^\circ$: $h_2 = ${pd.L}(1 - \cos ${pd.th2}^\circ) = ${f(pd.h2, 4)}$ m, drop $= ${f(pd.h - pd.h2, 4)}$ m, so $v = \sqrt{2 \times 9.8 \times ${f(pd.h - pd.h2, 4)}} = ${f(pd.v2, 3)}$ m s$^{-1}$.`,
      ],
      v: T_PEND,
      n: `At release the bob is ${N(pd.h)} metres above the lowest point, so its energy is ${N(pd.E)} joules. At the lowest point all of this is kinetic, and the speed is the square root of two g h, which is ${N(pd.v)} metres per second. At thirty degrees from the vertical the bob has dropped less, so its speed is smaller, ${N(pd.v2)} metres per second.`,
    }),
    sl('check', 'Quick check: pendulum', {
      b: 'Choose the correct option.',
      v: V.pend,
      chk: 'pend-mcq',
      n: 'Where is the kinetic energy of the bob greatest?',
    }),
    sl('concept', 'The roller coaster', {
      b: r`A car on a frictionless track is released from rest at A. Only gravity does work (the normal reaction is perpendicular to the track), so at any point $v = \sqrt{2g\,(\text{drop below A})}$.`,
      ul: [
        r`Speed depends only on the **height**, not on the shape of the track or the mass of the car: ` + co.pts.slice(1).map(([, hh, nm], i) => `${nm} (${hh} m): ${f(co.speeds[i + 1], 3)} m s⁻¹`).join('; ') + '.',
        'The car can **never rise above the level of A**: at that height its kinetic energy would be zero.',
        'In practice friction and air drag are non-conservative, so real cars lose mechanical energy as heat and the first hill must be the highest.',
      ],
      v: V.coaster,
      n: `A coaster car starts from rest at A, thirty metres up. With no friction, its speed anywhere is the square root of two g times the drop below A. At B, only five metres up, it moves at ${N(co.speeds[1])} metres per second. At the crest C it moves at ${N(co.speeds[2])}, and at D at ${N(co.speeds[3])}. It can never rise above the level of A. Real tracks have friction, so the first hill is the highest.`,
    }),
    sl('concept', 'The oscillating spring: U + K = E', {
      b: r`A block of mass $m$ on a smooth horizontal surface is joined to a spring of force constant $k$ and released from rest at $x = A$. Only the spring force (conservative) does work.`,
      m: [r`W_{\text{spring}} = \int_{A}^{x} (-kx')\,dx' = \tfrac12 k\,(A^{2} - x^{2})`, r`\tfrac12 mv^{2} - 0 = \tfrac12 k\,(A^{2} - x^{2}) \;\Rightarrow\; \tfrac12 kx^{2} + \tfrac12 mv^{2} = \tfrac12 kA^{2}`],
      ul: [
        r`The block starts from rest, so by the work–energy theorem the work of the spring equals the kinetic energy gained. $U + K$ has the same value at every $x$.`,
        r`$E = \tfrac12 kA^2$ is fixed by the amplitude. Maximum speed (at $x = 0$): $v_{\max} = A\sqrt{k/m}$.`,
        r`With $m = ` + os.m + r`$ kg, $k = ` + os.k + r`$ N m$^{-1}$, $A = ` + os.A + r`$ m: $E = ` + f(os.E, 3) + r`$ J and $v_{\max} = ` + f(os.vmax, 3) + r`$ m s$^{-1}$.`,
        r`Preview of the Oscillations chapter: with $x = A\cos\omega t$ and $\omega^2 = k/m$, $U = \tfrac12 kA^2\cos^2\omega t$ and $K = \tfrac12 kA^2\sin^2\omega t$ add to the same $\tfrac12 kA^2$.`,
      ],
      v: V.osc,
      n: `A block on a smooth surface is joined to a spring and released from rest at the amplitude A. As it moves in to a displacement x, the spring does work equal to half k times A squared minus x squared. The block started from rest, so this work is its kinetic energy. Adding the stored energy, half k x squared, the total is always half k A squared. The potential and kinetic energies always add up to the same total.`,
    }),
    sl('concept', 'Energy graphs against displacement', {
      b: r`Using $U = \tfrac12 kx^2$ and $K = E - \tfrac12 kx^2$ with $E = \tfrac12 kA^2$:`,
      ul: [
        '**U against x:** an upward parabola, zero at $x = 0$, equal to $E$ at $x = \\pm A$.',
        '**K against x:** the inverted parabola, equal to $E$ at $x = 0$ and zero at the turning points $x = \\pm A$.',
        '**E:** a horizontal line. $U$ and $K$ cross where each is $E/2$, at $x = \\pm A/\\sqrt{2}$ (here $\\pm' + f(os.xeq, 3) + '$ m).',
        'The body can never be found where $U > E$, since that would need negative kinetic energy.',
      ],
      v: plotEx,
      n: 'Plot the energies against the displacement. The potential energy is an upward parabola, zero at the centre and equal to the total at the ends. The kinetic energy is the inverted parabola, equal to the total at the centre and zero at the ends. The total energy is a horizontal line. The two curves cross where each is half the total, at the amplitude divided by the square root of two.',
    }),
    sl('concept', 'Preview: energy graphs against time', {
      b: r`Since $x = A\cos\omega t$: $U = E\cos^{2}\omega t$ and $K = E\sin^{2}\omega t$. Each oscillates between $0$ and $E$, **out of step**.`,
      ul: [
        r`Both repeat twice in every period $T$ of the motion: they change at **twice the frequency** of the block. Here $T = 2\pi/\omega = ` + f(os.T, 3) + r`$ s.`,
        'When $U$ is largest $K$ is zero and the reverse; energy flows back and forth between the spring and the block.',
        r`Their sum, $E = ` + f(os.E, 2) + r`$ J, is a steady horizontal line.`,
        'This uses $x = A\\cos\\omega t$ from the Oscillations chapter; in this chapter the graphs against $x$ are the ones to know.',
      ],
      v: plotEt,
      n: `Plotted against time, the potential energy is E cosine squared omega t and the kinetic energy is E sine squared omega t. They rise and fall out of step, each between zero and the total. Both go through two full cycles in one period of the block, so they vary at twice its frequency. When one is at its largest the other is zero, and their sum is the steady total of ${N(os.E, 2)} joules. This is a preview of the oscillations chapter.`,
    }),
    sl('example', 'Worked example 7: the oscillating block', {
      b: r`A $${os.m}$ kg block on a smooth surface is joined to a spring of $k = ${os.k}$ N m$^{-1}$ and oscillates with amplitude $${os.A}$ m. Find (i) the total energy, (ii) the maximum speed, (iii) $U$, $K$ and the speed at $x = ${os.x}$ m.`,
      ul: [
        r`(i) $E = \tfrac12 kA^2 = \tfrac12 \times ${os.k} \times ${os.A}^2 = ${f(os.E, 3)}$ J.`,
        r`(ii) At $x = 0$ all is kinetic: $\tfrac12 mv_{\max}^2 = E$, so $v_{\max} = \sqrt{2 \times ${f(os.E, 3)} / ${os.m}} = ${f(os.vmax, 3)}$ m s$^{-1}$.`,
        r`(iii) $U = \tfrac12 \times ${os.k} \times ${os.x}^2 = ${f(os.U, 4)}$ J, $K = E - U = ${f(os.K, 4)}$ J, $v = \sqrt{2K/m} = ${f(os.v, 3)}$ m s$^{-1}$.`,
      ],
      v: V.osc,
      n: `The total energy is half k A squared, ${N(os.E, 3)} joules. At the centre it is all kinetic, so the maximum speed is the square root of two E over m, ${N(os.vmax)} metres per second. At a displacement of zero point zero five metres the potential energy is ${N(os.U, 4)} joules, so the kinetic energy is ${N(os.K, 4)} joules, and the speed is ${N(os.v)} metres per second.`,
    }),
    sl('check', 'Quick check: energy of the oscillator', {
      b: 'Choose the correct option.',
      v: plotEx,
      chk: 'osc-mcq',
      n: 'Total energy stays the same at every position.',
    }),
    sl('concept', 'Mass–energy equivalence: E = mc²', {
      b: r`Einstein showed that mass is a form of energy. A mass $m$ (that disappears) is equivalent to an energy:`,
      m: [r`E = mc^{2}, \qquad c = 3.0 \times 10^{8}\ \text{m s}^{-1}`],
      ul: [
        'This is a **statement** here; it is not derived in this course.',
        r`Because $c^2 = 9.0 \times 10^{16}$ m$^2$ s$^{-2}$ is so large, a tiny mass is equivalent to a huge energy.`,
        'In nuclear reactions the total mass of the products is slightly less than that of the reactants; the **mass defect** appears as energy, which powers reactors and the Sun.',
        'In everyday chemical and mechanical processes the change of mass is far too small to notice.',
      ],
      v: T_EMC,
      n: 'Einstein showed that mass is a form of energy. A mass m that disappears is equivalent to an energy m c squared, where c is the speed of light, three times ten to the eighth metres per second. This is stated here, not derived. Because c squared is huge, a tiny mass is worth a vast energy. In nuclear reactions the mass defect appears as energy. In everyday processes the change of mass is too small to notice.',
    }),
    sl('check', 'Quick check: energy from mass', {
      b: 'Choose the correct option.',
      v: T_EMC,
      chk: 'emc-mcq',
      n: 'Multiply the mass by the square of the speed of light.',
    }),
    sl('concept', 'Power', {
      b: r`**Power** is the rate of doing work (or of transferring energy). The **average power** over a time $t$ is:`,
      m: [r`P = \dfrac{W}{t}`],
      ul: [
        r`SI unit: the **watt** (W), $1$ W $= 1$ J s$^{-1}$. Dimensions $[\text{M}\,\text{L}^{2}\,\text{T}^{-3}]$. Power is a scalar.`,
        'Instantaneous power is $P = \\dfrac{dW}{dt}$, the power at a particular instant.',
        r`A **kilowatt hour** is a unit of **energy**: $1$ kW h $= 3.6 \times 10^{6}$ J. A $` + kwh.P + r`$ W bulb used for $` + kwh.hours + r`$ h consumes $` + f(kwh.E, 2) + r`$ kW h, one unit on the electricity bill.`,
      ],
      v: T_POWER,
      n: 'Power is the rate of doing work, the work done divided by the time taken. Its unit is the watt, one joule per second. Instantaneous power is the rate at one instant. A kilowatt hour is a unit of energy, not of power, and it equals three point six million joules. A one hundred watt bulb used for ten hours consumes one unit on the electricity bill.',
    }),
    sl('concept', 'Power and velocity: P = F·v', {
      b: r`A constant force $F$ acting along the displacement $dS$ in a time $dt$ does work $dW = F\,dS$. Dividing by $dt$:`,
      m: [r`P = \dfrac{dW}{dt} = F\,\dfrac{dS}{dt} = \vec F\cdot\vec v = Fv\cos\theta`],
      ul: [
        'For a force along the velocity, $P = Fv$: for a given power, a **greater speed needs a smaller force**, which is why a vehicle climbs a hill in low gear.',
        'At a **constant speed** the driving force equals the resistive force, so $P = F_{\\text{resist}} \\times v$.',
        'Plot: for a steady force the power is a straight line through the origin in $v$.',
      ],
      v: plotPv,
      n: 'A force F acts through a small distance in a small time. Work is force times distance, so dividing by the time, the power equals the force times the velocity. For a given power, a higher speed needs a smaller force, which is why a vehicle climbs a hill in low gear. At constant speed the driving force equals the resistive force, so the power equals that force times the speed.',
    }),
    sl('example', 'Worked example 8: a lift and a water pump', {
      b: r`(i) A lift with its load has a mass of $${lift.M}$ kg and rises at a steady $${lift.v}$ m s$^{-1}$. Find the power of the motor, ignoring friction. (ii) A pump raises $${pump.m}$ kg of water through $${pump.h}$ m in $${pump.t}$ s. Find its average power. ($g = 9.8$ m s$^{-2}$.)`,
      ul: [
        r`(i) At constant speed the cable force equals the weight: $F = Mg = ${lift.M} \times 9.8 = ${f(lift.M * g, 4)}$ N. $P = Fv = ${f(lift.M * g, 4)} \times ${lift.v} = ${f(lift.P, 4)}$ W $= ${f(lift.P / 1000, 3)}$ kW.`,
        r`(ii) Work $= mgh = ${pump.m} \times 9.8 \times ${pump.h} = ${f(pump.W, 5)}$ J. $P = W/t = ${f(pump.W, 5)} / ${pump.t} = ${f(pump.P, 3)}$ W.`,
      ],
      v: T_LIFT,
      n: `At constant speed the cable pulls up with a force equal to the weight, ${N(lift.M * g, 4)} newtons. The power is force times speed, ${N(lift.P, 4)} watts, which is ${N(lift.P / 1000)} kilowatts. For the pump, the work is m g h, ${N(pump.W, 5)} joules. Dividing by six hundred seconds gives an average power of ${N(pump.P)} watts.`,
    }),
    sl('example', 'Worked example 9: a car at constant speed', {
      b: r`A car moves at a steady $${car.v}$ m s$^{-1}$ on a level road against a total resistive force of $${car.F}$ N. Find the power the engine delivers to the wheels, and the power needed for the same force at $${car.v2}$ m s$^{-1}$.`,
      ul: [
        r`Steady speed: driving force $=$ resistive force $= ${car.F}$ N.`,
        r`$P = Fv = ${car.F} \times ${car.v} = ${f(car.P, 5)}$ W $= ${f(car.P / 1000, 3)}$ kW.`,
        r`At $${car.v2}$ m s$^{-1}$ (same force): $P = ${car.F} \times ${car.v2} = ${f(car.P2, 5)}$ W $= ${f(car.P2 / 1000, 3)}$ kW, in proportion to the speed.`,
      ],
      v: plotPv,
      n: `At a steady speed the driving force equals the resistive force, ${N(car.F)} newtons. The power is the force times the speed, ${N(car.P, 5)} watts, or ${N(car.P / 1000)} kilowatts. At thirty metres per second, with the same force, the power rises to ${N(car.P2 / 1000)} kilowatts, because power is proportional to speed.`,
    }),
    sl('check', 'Quick check: power', {
      b: 'Choose the correct option.',
      v: T_LIFT,
      chk: 'pwr-mcq',
      n: 'Use power equals force times velocity.',
    }),
    sl('summary', 'Summary — Part 2', {
      b: 'Key results:',
      v: table(
        ['Idea', 'Result'],
        [
          ['Mechanical energy', 'E = K + U; constant when only conservative forces do work'],
          ['Free fall', 'v = √(2g × height fallen); independent of mass'],
          ['Pendulum', 'v = √(2gL(1 − cos θ₀)) at the lowest point; tension does no work'],
          ['Roller coaster', 'v = √(2g × drop); car cannot rise above its starting level'],
          ['Oscillating spring', '½kx² + ½mv² = ½kA²; U parabola, K inverted parabola, E horizontal'],
          ['Mass–energy', 'E = mc², c = 3.0 × 10⁸ m s⁻¹ (statement)'],
          ['Power', 'P = W/t; watt; kW h = 3.6 × 10⁶ J'],
          ['Power and velocity', 'P = F·v = Fv cos θ'],
        ],
        'Summary table of mechanical energy conservation, free fall, the pendulum, the roller coaster, the oscillating spring, mass-energy equivalence and power',
      ),
      n: 'When only conservative forces do work, the mechanical energy is constant, so a falling body, a pendulum and a roller coaster car all trade potential and kinetic energy. A spring keeps half k x squared plus half m v squared equal to half k A squared. Mass and energy are linked by E equals m c squared. Power is work over time, and the force times the velocity.',
    }),
    sl('exam-tips', 'Exam tips — Part 2', {
      ul: [
        'Choose the **zero of potential energy** first and say so; write the energy at the start and the end, then equate. Remember the string tension and the normal reaction do no work.',
        'For the oscillator, show $U + K = E$ from the work done by the spring, $\\tfrac12 k(A^2 - x^2) = \\tfrac12 mv^2$. Graphs: label axes, mark $E$, $\\pm A$, and the crossing at $E/2$.',
        'Use $E = mc^2$ with $m$ in **kilograms** and $c = 3 \\times 10^8$ m s$^{-1}$; the answer is in joules. Do not derive it.',
        'Power: say whether it is **average** ($W/t$) or **instantaneous** ($Fv$). At constant speed driving force = resistive force. Convert kW h to joules with $3.6 \\times 10^6$.',
        'Common mistakes: using the length of the string instead of the height for the pendulum; forgetting that mechanical energy is lost to heat when friction acts; confusing kilowatt (power) with kilowatt hour (energy).',
      ],
      v: T_POWER,
      n: 'Choose the zero of potential energy first and say so. Equate the total energy at the start and the end, and remember that the string tension and the normal reaction do no work. For the oscillator show that the sum is constant. For mass energy, use kilograms and joules, and do not derive it. For power, say average or instantaneous. Do not confuse a kilowatt with a kilowatt hour.',
    }),
  ],
});
