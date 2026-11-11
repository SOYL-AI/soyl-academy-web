// ISC 11 ch07 Circular Motion — two decks. Part 1 (t01, t02): angular displacement, velocity and acceleration with v = r omega and
// a_t = r alpha; uniform circular motion, centripetal acceleration derived from the change in velocity, centripetal force as the name of
// a direction. Part 2 (t03, t04): a vehicle on a level road, banking of roads and railway tracks, motion in a vertical circle.
// Every number and every graph is computed here from stated data.
import { sl, deck, table, svgV, plot, r, dec } from '../../isc-11-physics-ch01/src/lib.mjs';
import { g, rad, deg, R6, TAU } from './phys.mjs';
import { W, N } from './words.mjs';
import * as G from './svgs.mjs';

const f = (x, n = 3) => dec(x, n);
const SUP = { '-': '⁻', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
/** Plain-text scientific notation: 7.27 × 10⁻⁵ */
const e10 = (x, n = 3) => { const k = Math.floor(Math.log10(Math.abs(x))); let m = Number((x / 10 ** k).toPrecision(n)); let kk = k; if (m >= 10) { m /= 10; kk += 1; } return `${m.toFixed(n - 1)} × 10${[...String(kk)].map((c) => SUP[c]).join('')}`; };

// ---------------------------------------------------------------- worked-example numbers
// the arc of the figure: r = 2.0 m, theta = 0.9 rad in 0.6 s
const A0 = G.ANG_DATA;
// potter's wheel: 75 rev/min, radius 0.30 m
const pot = { rpm: 75, R: 0.3, r2: 0.1 };
pot.w = (pot.rpm * TAU) / 60;
pot.T = 60 / pot.rpm;
pot.v = pot.w * pot.R;
pot.v2 = pot.w * pot.r2;
// fan blade tip: from rest, alpha = 2.5 rad/s^2 for 8 s, radius 0.60 m
const fan = { alpha: 2.5, t: 8, R: 0.6 };
fan.w = fan.alpha * fan.t;
fan.th = 0.5 * fan.alpha * fan.t * fan.t;
fan.turns = fan.th / TAU;
fan.at = fan.R * fan.alpha;
fan.ac = fan.w * fan.w * fan.R;
fan.a = Math.hypot(fan.at, fan.ac);
// cyclist on a roundabout: 6.0 m/s on r = 12 m, mass 70 kg (rider and cycle)
const cyc = { v: 6, R: 12, m: 70 };
cyc.a = (cyc.v * cyc.v) / cyc.R;
cyc.w = cyc.v / cyc.R;
cyc.F = cyc.m * cyc.a;
// stone on a smooth horizontal table: 0.25 kg on 0.80 m string, 2.0 rev/s; string breaks at 50 N
const stn = { m: 0.25, R: 0.8, f: 2.0, Tbreak: 50 };
stn.w = TAU * stn.f;
stn.v = stn.w * stn.R;
stn.T = stn.m * stn.w * stn.w * stn.R;
stn.wmax = Math.sqrt(stn.Tbreak / (stn.m * stn.R));
stn.fmax = stn.wmax / TAU;
// level road: dry mu = 0.70, wet 0.35, icy 0.10 on r = 45 m
const lv = { R: 45, dry: 0.7, wet: 0.35, icy: 0.1 };
const vmax = (mu, R) => Math.sqrt(mu * R * g);
lv.vd = vmax(lv.dry, lv.R);
lv.vw = vmax(lv.wet, lv.R);
lv.vi = vmax(lv.icy, lv.R);
// banking: the figure (800 kg, 20 m/s, r = 100 m)
const B = G.BANK_DATA;
const bk = { ...B, kmh: B.v * 3.6 };
bk.tan = Math.tan(rad(B.th));
// railway: figure
const Rl = G.RAIL_DATA;
const rail = { ...Rl, kmh: Rl.v * 3.6 };
rail.tan = Math.tan(rad(Rl.th));
rail.happrox = Rl.l * rail.tan;
// vertical circle: the figure (0.5 kg, r = 0.90 m)
const Vv = G.VERT_DATA;
// bucket on a rope at a well: 2.0 kg, r = 1.6 m, top speed 5.0 m/s
const bkt = { m: 2.0, R: 1.6, v: 5.0 };
bkt.vtop = Math.sqrt(g * bkt.R);
bkt.vbot = Math.sqrt(5 * g * bkt.R);
bkt.Tbot = 6 * bkt.m * g;
bkt.Ttop = bkt.m * ((bkt.v * bkt.v) / bkt.R - g);
bkt.vb2 = Math.sqrt(bkt.v * bkt.v + 4 * g * bkt.R);
bkt.Tb2 = bkt.m * ((bkt.vb2 * bkt.vb2) / bkt.R + g);

export const EX = { A0, pot, fan, cyc, stn, lv, bk, rail, Vv, bkt };

// ---------------------------------------------------------------- visuals
export const V = {
  ang: svgV(G.ANG, 'A particle on a circle of radius 2.0 metres turns through 0.9 radians from A to B in 0.6 seconds: the arc is 1.8 metres, the angular speed 1.5 radians per second and the velocity 3.0 metres per second along the tangent', 'Arc s = rθ, speed v = rω, velocity along the tangent.'),
  vtri: svgV(G.VTRI, 'Velocity vectors at two points of a circle and the triangle that gives the change in velocity, which points towards the centre', 'The change of velocity points to the centre; its size is 2v sin(Δθ/2).'),
  who: svgV(G.WHO, 'A stone on a string, a coin on a turntable and a satellite, each with the force that points to the centre drawn in red', 'Tension, friction or gravity: whichever points to the centre is the centripetal force.'),
  level: svgV(G.LEVEL, 'A 1200 kilogram car on a level curve of radius 60 metres: normal reaction up, weight down and friction towards the centre of the curve', 'On a level road friction supplies the centripetal force.'),
  bank: svgV(G.BANK, 'A car on a road banked at 22.2 degrees with its weight, the normal reaction and the horizontal net force, and the force triangle that gives tan theta equals v squared over r g', 'N cos θ = mg and N sin θ = mv²/r give tan θ = v²/(rg).'),
  rail: svgV(G.RAIL, 'Cross-section of a railway track with the outer rail 0.136 metres above the inner rail over a gauge of 1.676 metres, drawn to scale', 'Raising the outer rail by h = l sin θ banks the track.'),
  vert: svgV(G.VERT, 'A 0.5 kilogram ball on a 0.9 metre string in a vertical circle at the least speeds: at the top 2.97 metres per second with no tension, at the bottom 6.64 metres per second with tension 29.4 newtons', 'Least speeds: √(gr) at the top, √(5gr) at the bottom.'),
};

const ax = (label, min, max) => ({ label, min, max });
// omega against t for the fan (alpha = 2.5 rad/s^2)
export const plotW = plot(
  {
    x: ax('time t (s)', 0, 8),
    y: ax('angular speed ω (rad s⁻¹)', 0, 24),
    functions: [{ expr: `${fan.alpha}*x`, label: `ω = αt with α = ${fan.alpha} rad s⁻²`, domain: [0, 8] }],
    points: [{ at: [fan.t, R6(fan.w)], label: `t = ${fan.t} s: ω = ${f(fan.w, 3)} rad s⁻¹` }],
  },
  `Angular speed against time for a fan starting from rest with angular acceleration 2.5 radians per second squared: a straight line through the origin reaching 20 radians per second at 8 seconds; the area under the line is the angular displacement, 80 radians`,
  'The slope of the ω–t line is α; the area under it is θ.',
);
// a against r: v = 6 m/s constant (hyperbola) and omega = 2 rad/s constant (line)
const pv = 6;
const pw = 2;
const rx = pv / pw;
export const plotAc = plot(
  {
    x: ax('radius r (m)', 1, 10),
    y: ax('centripetal acceleration a (m s⁻²)', 0, 40),
    functions: [
      { expr: `${pv * pv}/x`, label: `v = ${pv} m s⁻¹ fixed: a = v²/r`, domain: [1, 10] },
      { expr: `${pw * pw}*x`, label: `ω = ${pw} rad s⁻¹ fixed: a = ω²r`, domain: [1, 10] },
    ],
    points: [{ at: [rx, R6((pv * pv) / rx)], label: `r = ${rx} m: both give ${f((pv * pv) / rx, 3)} m s⁻²` }],
  },
  'Centripetal acceleration against radius: at a fixed speed of 6 metres per second it falls as a hyperbola 36 over r, and at a fixed angular speed of 2 radians per second it rises along the straight line 4r; the curves cross at r equal to 3 metres where both give 12 metres per second squared',
  'Fixed v: a falls as 1/r. Fixed ω: a rises in proportion to r.',
);
// banking angle against speed on r = 100 m
const rB = 100;
const thB = (v) => deg(Math.atan((v * v) / (rB * g)));
export const plotBank = plot(
  {
    x: ax('design speed v (m s⁻¹)', 0, 30),
    y: ax('banking angle θ (degrees)', 0, 50),
    functions: [{ expr: `180*atan(x^2/${rB * g})/pi`, label: `tan θ = v²/(rg), r = ${rB} m`, domain: [0, 30] }],
    points: [{ at: [20, R6(thB(20))], label: `${f(thB(20), 3)}° at 20 m s⁻¹` }, { at: [10, R6(thB(10))], label: `${f(thB(10), 3)}° at 10 m s⁻¹` }],
  },
  'Banking angle against design speed for a curve of radius 100 metres: the angle rises from zero, reaching 5.8 degrees at 10 metres per second and 22.2 degrees at 20 metres per second, and grows steeply at higher speed',
  'Doubling the speed far more than doubles the angle needed: tan θ ∝ v².',
);
// tension (in units of mg) around the circle for the least speed at the bottom: T/mg = 3(1 + cos phi), phi from the lowest point
const tN = (ph) => 3 * (1 + Math.cos(rad(ph)));
export const plotT = plot(
  {
    x: ax('angle φ from the lowest point (degrees)', 0, 180),
    y: ax('tension T (in units of mg)', 0, 7),
    functions: [{ expr: '3*(1+cos(pi*x/180))', label: 'least speed at the bottom: T = 3mg(1 + cos φ)', domain: [0, 180] }],
    points: [{ at: [0, 6], label: 'bottom: 6 mg' }, { at: [90, R6(tN(90))], label: 'level with the centre: 3 mg' }, { at: [180, 0], label: 'top: 0' }],
  },
  'Tension in the string in units of m g against the angle from the lowest point when the ball has the least speed at the bottom: 6 m g at the bottom, 3 m g level with the centre and zero at the top',
  'The tension falls smoothly from 6mg at the bottom to zero at the top.',
);

// ---------------------------------------------------------------- tables
const T_RAD = table(
  ['Angle', 'In degrees', 'In radians'],
  [
    ['One full turn', '360°', `2π = ${f(TAU, 4)}`],
    ['Half a turn', '180°', `π = ${f(Math.PI, 4)}`],
    ['Quarter turn', '90°', `π/2 = ${f(Math.PI / 2, 4)}`],
    ['One radian', `${f(deg(1), 4)}°`, '1 (arc = radius)'],
    ['Angle for an arc of 1.8 m on r = 2.0 m', `${f(deg(A0.th), 3)}°`, `${A0.th} (= s/r)`],
  ],
  'Table of angles in degrees and radians: full turn, half turn, quarter turn, one radian, and the angle for an arc of 1.8 metres on a circle of radius 2.0 metres',
);
const T_EVERY = table(
  ['Rotation', 'Period', 'ω = 2π/T (rad s⁻¹)'],
  [
    ['Second hand of a clock', '60 s', f(TAU / 60, 3)],
    ['Minute hand', '3600 s', `${e10(TAU / 3600, 3)}`],
    ['Hour hand', '12 h = 43 200 s', `${e10(TAU / 43200, 3)}`],
    ['Earth about its axis', '24 h = 86 400 s', `${e10(TAU / 86400, 3)}`],
    ['Moon about the Earth', '27.3 days', `${e10(TAU / (27.3 * 86400), 3)}`],
  ],
  'Table of angular speeds in radians per second for the second, minute and hour hands of a clock, the rotation of the Earth and the revolution of the Moon, each from 2 pi over the period',
);
const wT = 0.8;
const T_TURN = table(
  ['Seat distance r (m)', 'ω (rad s⁻¹)', 'Speed v = rω (m s⁻¹)', 'a = ω²r (m s⁻²)'],
  [1.0, 2.0, 3.0].map((rr) => [f(rr, 2), f(wT, 2), f(rr * wT, 3), f(wT * wT * rr, 3)]),
  'Table for three seats on a merry-go-round turning at 0.80 radians per second: the angular speed is the same for all, while the speed and the centripetal acceleration grow with the distance from the axis',
);
const T_POT = table(
  ['Step', 'Working', 'Result'],
  [
    ['Angular speed', `${pot.rpm} × 2π / 60`, `${f(pot.w, 4)} rad s⁻¹`],
    ['Period', `60 / ${pot.rpm}`, `${f(pot.T, 3)} s`],
    [`Rim speed (r = ${pot.R} m)`, `${f(pot.w, 4)} × ${pot.R}`, `${f(pot.v, 4)} m s⁻¹`],
    [`Speed at ${pot.r2} m from the axis`, `${f(pot.w, 4)} × ${pot.r2}`, `${f(pot.v2, 4)} m s⁻¹`],
  ],
  'Table of the working for a potter wheel at 75 revolutions per minute: angular speed, period, rim speed and speed nearer the axis',
);
const T_LIN = table(
  ['Quantity', 'Angular', 'Linear', 'Relation'],
  [
    ['Displacement', 'θ (rad)', 's (m)', 's = rθ'],
    ['Velocity', 'ω (rad s⁻¹)', 'v (m s⁻¹)', 'v = rω'],
    ['Tangential acceleration', 'α (rad s⁻²)', 'a_t (m s⁻²)', 'a_t = rα'],
    ['Radial (centripetal) acceleration', 'uses ω', 'a_c (m s⁻²)', 'a_c = ω²r = v²/r'],
  ],
  'Table linking angular and linear quantities: displacement, velocity, tangential acceleration and radial acceleration with the relations s equals r theta, v equals r omega, tangential a equals r alpha and centripetal a equals omega squared r',
);
const T_FAN = table(
  ['Quantity', 'Working', 'Result'],
  [
    ['Angular speed after 8 s', `${fan.alpha} × ${fan.t}`, `${f(fan.w, 3)} rad s⁻¹`],
    ['Angular displacement', `½ × ${fan.alpha} × ${fan.t}²`, `${f(fan.th, 3)} rad = ${f(fan.turns, 3)} turns`],
    ['Tangential acceleration', `${fan.R} × ${fan.alpha}`, `${f(fan.at, 3)} m s⁻²`],
    ['Centripetal acceleration', `${f(fan.w, 3)}² × ${fan.R}`, `${f(fan.ac, 4)} m s⁻²`],
    ['Total acceleration', `√(${f(fan.at, 3)}² + ${f(fan.ac, 4)}²)`, `${f(fan.a, 5)} m s⁻²`],
  ],
  'Table of the working for a fan blade tip of radius 0.60 metres starting from rest with angular acceleration 2.5 radians per second squared for 8 seconds: angular speed, angular displacement, tangential, centripetal and total acceleration',
);
const T_COMP = table(
  ['', 'Uniform circular motion', 'Non-uniform circular motion'],
  [
    ['Angular speed ω', 'constant', 'changing, α ≠ 0'],
    ['Speed v = rω', 'constant', 'changing'],
    ['Tangential acceleration a_t = rα', 'zero', 'not zero, along the tangent'],
    ['Centripetal acceleration ω²r', 'constant in size, to the centre', 'changes with ω, to the centre'],
    ['Total acceleration', 'to the centre', '√(a_t² + a_c²), not to the centre'],
  ],
  'Table comparing uniform and non-uniform circular motion: angular speed, speed, tangential acceleration, centripetal acceleration and total acceleration',
);
const T_ROUND = table(
  ['Quantity', 'Working', 'Result'],
  [
    ['Centripetal acceleration', `${cyc.v}² / ${cyc.R}`, `${f(cyc.a, 3)} m s⁻²`],
    ['Check with ω', `ω = ${cyc.v}/${cyc.R} = ${f(cyc.w, 3)} rad s⁻¹; ω²r`, `${f(cyc.w * cyc.w * cyc.R, 3)} m s⁻²`],
    [`Force on rider and cycle (${cyc.m} kg)`, `${cyc.m} × ${f(cyc.a, 3)}`, `${f(cyc.F, 3)} N, to the centre`],
  ],
  'Table of the working for a cyclist at 6 metres per second on a roundabout of radius 12 metres: centripetal acceleration, a check using angular speed, and the force needed',
);
const T_STONE = table(
  ['Quantity', 'Working', 'Result'],
  [
    ['Angular speed', `2π × ${stn.f}`, `${f(stn.w, 4)} rad s⁻¹`],
    ['Speed of the stone', `${f(stn.w, 4)} × ${stn.R}`, `${f(stn.v, 4)} m s⁻¹`],
    ['Tension', `${stn.m} × ${f(stn.w, 4)}² × ${stn.R}`, `${f(stn.T, 4)} N`],
    [`Greatest ω for ${stn.Tbreak} N`, `√(${stn.Tbreak} / (${stn.m} × ${stn.R}))`, `${f(stn.wmax, 4)} rad s⁻¹`],
    ['Greatest frequency', `${f(stn.wmax, 4)} / 2π`, `${f(stn.fmax, 4)} rev s⁻¹`],
  ],
  'Table of the working for a 0.25 kilogram stone whirled on a 0.80 metre string at 2 revolutions per second: angular speed, speed, tension, and the greatest angular speed and frequency before a 50 newton string breaks',
);
const T_WHO = table(
  ['Situation', 'Force that supplies the centripetal force'],
  [
    ['Stone whirled on a string', 'Tension in the string'],
    ['Coin on a turning turntable', 'Static friction from the turntable'],
    ['Satellite in a circular orbit', 'Gravitational pull of the Earth'],
    ['Car on a level curve', 'Static friction of the road on the tyres'],
    ['Car on a banked road at the design speed', 'Horizontal component of the normal reaction'],
    ['Ball at the top of a vertical circle', 'Tension and weight together'],
  ],
  'Table naming the real force that supplies the centripetal force for a whirled stone, a coin on a turntable, a satellite, a car on a level curve, a car on a banked road and a ball at the top of a vertical circle',
);
const T_VMAX = table(
  ['Road surface', 'μ', `v_max = √(μrg), r = ${lv.R} m (m s⁻¹)`, 'In km h⁻¹'],
  [['Dry tarmac', lv.dry, lv.vd], ['Wet tarmac', lv.wet, lv.vw], ['Icy patch', lv.icy, lv.vi]].map(([n, mu, v]) => [n, f(mu, 2), f(v, 4), f(v * 3.6, 3)]),
  'Table of the greatest safe speed on a level curve of radius 45 metres for dry, wet and icy road with coefficients of friction 0.70, 0.35 and 0.10',
);
const T_LSTEPS = table(
  ['Step', 'Equation', 'Reason'],
  [
    ['Vertical balance', 'N = mg', 'no vertical acceleration'],
    ['Needed inward force', 'f = mv²/r', 'centripetal force'],
    ['Friction limit', 'f ≤ μN = μmg', 'static friction has a maximum'],
    ['Combine', 'mv²/r ≤ μmg', 'f cannot exceed the limit'],
    ['Result', 'v ≤ √(μrg)', 'mass cancels'],
  ],
  'Table of the steps for the greatest speed on a level curve: vertical balance, needed inward force, friction limit, combining them and the result v at most the square root of mu r g',
);
const T_BSTEPS = table(
  ['Step', 'Equation'],
  [
    ['Vertical: no acceleration', 'N cos θ = mg'],
    ['Horizontal: towards the centre', 'N sin θ = mv²/r'],
    ['Divide', 'tan θ = v²/(rg)'],
    ['Design speed for a given θ', 'v = √(rg tan θ)'],
    [`Figure: v = ${bk.v} m s⁻¹, r = ${bk.r} m`, `tan θ = ${f(bk.tan, 3)}, θ = ${f(bk.th, 3)}°`],
  ],
  'Table of the steps for the banking angle: vertical balance, horizontal equation, dividing to get tan theta equals v squared over r g, the design speed and the numbers for 20 metres per second on a curve of radius 100 metres',
);
const T_BEX = table(
  ['Quantity', 'Working', 'Result'],
  [
    ['tan θ', `${bk.v}² / (${bk.r} × 9.8)`, f(bk.tan, 4)],
    ['θ', `tan⁻¹(${f(bk.tan, 4)})`, `${f(bk.th, 4)}°`],
    ['N', `${bk.m} × 9.8 / cos ${f(bk.th, 3)}°`, `${f(bk.N, 4)} N`],
    ['Check: N sin θ', `${f(bk.N, 4)} × sin ${f(bk.th, 3)}°`, `${f(bk.N * Math.sin(rad(bk.th)), 4)} N = mv²/r`],
    ['Speed in km h⁻¹', `${bk.v} × 3.6`, `${f(bk.kmh, 3)}`],
  ],
  'Table of the working for the banking angle of a curve of radius 100 metres at 20 metres per second: tan theta, theta, the normal reaction for an 800 kilogram car and a check',
);
const T_RAILEX = table(
  ['Quantity', 'Working', 'Result'],
  [
    ['tan θ', `${rail.v}² / (${rail.r} × 9.8)`, f(rail.tan, 4)],
    ['sin θ', `sin(tan⁻¹ ${f(rail.tan, 4)})`, f(Math.sin(rad(rail.th)), 5)],
    ['h = l sin θ', `${rail.l} × ${f(Math.sin(rad(rail.th)), 5)}`, `${f(rail.h, 4)} m = ${f(rail.h * 1000, 4)} mm`],
    ['h ≈ l tan θ', `${rail.l} × ${f(rail.tan, 4)}`, `${f(rail.happrox, 4)} m`],
  ],
  'Table of the working for the raised outer rail on a curve of radius 500 metres for 20 metres per second and a gauge of 1.676 metres: tan theta, sin theta, h equal to l sin theta and the approximation l tan theta',
);
const T_TENS = table(
  ['Position', 'Speed²', 'Tension T', `Value (m = ${Vv.m} kg, r = ${Vv.r} m)`],
  [
    ['Top (least speed)', 'gr', 'mv²/r − mg = 0', '0 N'],
    ['Level with the centre', '3gr', 'mv²/r = 3mg', `${f(3 * Vv.W, 3)} N`],
    ['Bottom', '5gr', 'mv²/r + mg = 6mg', `${f(6 * Vv.W, 3)} N`],
  ],
  'Table of speed squared and tension at the top, level with the centre and at the bottom of a vertical circle for the least speed at the top',
);
const T_VCRIT = table(
  ['Quantity', 'Result'],
  [
    ['Least speed at the top (string just taut)', 'v = √(gr)'],
    ['Least speed at the bottom to complete the circle', 'v = √(5gr)'],
    ['Tension at the top', 'T = mv²/r − mg'],
    ['Tension at the bottom', 'T = mv²/r + mg'],
    ['Difference, bottom minus top', '6mg, for any speed'],
  ],
  'Table of the results for a ball on a string in a vertical circle: least speeds at the top and bottom, tension at the top and bottom, and the difference of 6 m g',
);
const T_BUCKET = table(
  ['Quantity', 'Working', 'Result'],
  [
    ['Least speed at the top', `√(9.8 × ${bkt.R})`, `${f(bkt.vtop, 4)} m s⁻¹`],
    ['Least speed at the bottom', `√(5 × 9.8 × ${bkt.R})`, `${f(bkt.vbot, 4)} m s⁻¹`],
    ['Tension at the bottom, least speed', `6 × ${bkt.m} × 9.8`, `${f(bkt.Tbot, 4)} N`],
    [`Tension at the top at ${bkt.v} m s⁻¹`, `${bkt.m} × (${bkt.v}²/${bkt.R} − 9.8)`, `${f(bkt.Ttop, 4)} N`],
  ],
  'Table of the working for a 2 kilogram bucket on a 1.6 metre rope: least speeds at the top and bottom, tension at the bottom for the least speed, and tension at the top at 5 metres per second',
);
export const TABLES = { T_RAD, T_EVERY, T_TURN, T_POT, T_LIN, T_FAN, T_COMP, T_ROUND, T_STONE, T_WHO, T_VMAX, T_LSTEPS, T_BSTEPS, T_BEX, T_RAILEX, T_TENS, T_VCRIT, T_BUCKET };

// ================================================================ DECK 1
export const deck1 = deck({
  part: 1,
  title: 'Circular Motion — Part 1: Angular quantities and centripetal acceleration',
  goals: [
    'Define angular displacement, angular velocity and angular acceleration, and use s = rθ, v = rω and a_t = rα',
    'Explain why a body moving on a circle at constant speed is accelerated',
    'Derive a = v²/r = ω²r from the change in velocity, and show that it points to the centre',
    'Treat centripetal force as the name of a direction, and name the real force that supplies it',
  ],
  slides: [
    sl('title', 'Circular Motion', {
      b: 'Part 1 — how to describe motion on a circle with angles, and why that motion always needs an inward acceleration.',
      v: V.ang,
      n: 'A ceiling fan, a potter wheel and a satellite all go round in circles. How fast is a point on the blade going, and why does a stone on a string pull on your hand? In this part we describe motion on a circle using angles, link them to ordinary speed, and then find the acceleration that every circular motion needs.',
    }),
    sl('concept', 'Angular displacement and the radian', {
      b: r`The **angular displacement** $\theta$ of a body on a circle is the angle swept by the line joining it to the centre. The SI unit is the **radian**: the angle at the centre for an arc equal in length to the radius.`,
      m: [r`\theta = \dfrac{s}{r}, \qquad s = r\theta`],
      ul: [
        r`A full turn is $2\pi$ rad $= 360^\circ$, so $1\ \text{rad} = ${f(deg(1), 4)}^\circ$. The radian is a ratio of two lengths, so it has no dimensions.`,
        r`In the first figure, on the title slide, $r = ${A0.r}$ m and $\theta = ${A0.th}$ rad, so the arc is $s = ${A0.r} \times ${A0.th} = ${f(A0.s, 3)}$ m.`,
        'Anticlockwise turning is taken as positive. The angular displacement is a vector along the axis, found by the right-hand rule.',
      ],
      v: T_RAD,
      n: 'Angular displacement is the angle swept by the line from the centre to the body. Its unit is the radian, the angle for which the arc is as long as the radius. So the arc length equals the radius times the angle in radians. One full turn is two pi radians, which is three hundred and sixty degrees. In the first figure, an arc of one point eight metres on a circle of radius two metres is point nine radians.',
    }),
    sl('concept', 'Angular velocity', {
      b: r`The **angular velocity** is the rate of change of angular displacement. For a steady turn at frequency $f$, or period $T$:`,
      m: [r`\omega = \dfrac{\Delta\theta}{\Delta t}\ \ \left(\text{or } \dfrac{d\theta}{dt}\right), \qquad \omega = \dfrac{2\pi}{T} = 2\pi f`],
      ul: [
        r`Unit: rad s$^{-1}$. In the first figure, $\omega = ${A0.th}/${A0.t} = ${f(A0.w, 3)}$ rad s$^{-1}$.`,
        'Direction: along the axis, by the right-hand rule: curl the fingers the way the body turns and the thumb gives the direction of $\\omega$.',
        'Revolutions per minute convert as $\\omega = 2\\pi \\times \\text{rpm}/60$.',
      ],
      v: T_EVERY,
      n: 'Angular velocity is how fast the angle changes. For a steady turn it is two pi divided by the period, or two pi times the frequency. Its unit is radians per second, and its direction is along the axis, given by the right hand rule. To convert revolutions per minute, multiply by two pi and divide by sixty. The table shows some familiar rotations, from the second hand of a clock to the Earth.',
    }),
    sl('concept', 'Linear speed and angular speed: v = rω', {
      b: r`In a time $\Delta t$ the body moves along an arc $\Delta s = r\Delta\theta$. Dividing by $\Delta t$:`,
      m: [r`v = \dfrac{\Delta s}{\Delta t} = r\,\dfrac{\Delta\theta}{\Delta t} \quad\Rightarrow\quad v = r\omega`],
      ul: [
        'The velocity is along the **tangent**, perpendicular to the radius.',
        'Every point of a rotating rigid body has the **same** $\\omega$, but the speed $v = r\\omega$ grows with the distance from the axis.',
        'On a merry-go-round the child on the outer seat travels faster, yet turns through the same angle in the same time.',
      ],
      v: T_TURN,
      n: 'From the arc length, divide the arc covered by the time taken. The arc is r times the angle, so the speed is r times the angular velocity. The velocity points along the tangent. Every point of a rotating body has the same angular velocity, but points farther from the axis move faster. On a merry go round, all the seats turn through the same angle, but the outer seat covers a longer path.',
    }),
    sl('check', 'Quick check: same ω, different speeds', {
      b: 'Choose the correct option.',
      v: T_TURN,
      chk: 'vr-mcq',
      n: 'Think about which quantity is shared by all the seats.',
    }),
    sl('example', 'Worked example 1: a potter’s wheel', {
      b: r`A potter’s wheel of radius $${pot.R}$ m turns at $${pot.rpm}$ revolutions per minute. Find its angular speed, the period, and the speed of a point on the rim and of a point $${pot.r2}$ m from the axis.`,
      ul: [
        r`$\omega = \dfrac{2\pi \times ${pot.rpm}}{60} = ${f(pot.w, 4)}$ rad s$^{-1}$ and $T = \dfrac{60}{${pot.rpm}} = ${f(pot.T, 3)}$ s.`,
        r`Rim: $v = r\omega = ${pot.R} \times ${f(pot.w, 4)} = ${f(pot.v, 4)}$ m s$^{-1}$.`,
        r`Nearer the axis: $v = ${pot.r2} \times ${f(pot.w, 4)} = ${f(pot.v2, 4)}$ m s$^{-1}$: one third of the radius, one third of the speed.`,
      ],
      v: T_POT,
      n: `Seventy five revolutions per minute is seventy five times two pi over sixty, which is ${N(pot.w, 4)} radians per second. The period is point eight seconds. The rim, at point three metres, moves at ${N(pot.v, 4)} metres per second. A point at point one metre moves at ${N(pot.v2, 4)} metres per second, one third as fast, because its radius is one third.`,
    }),
    sl('concept', 'Angular acceleration', {
      b: r`The **angular acceleration** is the rate of change of angular velocity, $\alpha = \Delta\omega/\Delta t$ (or $d\omega/dt$). Unit: rad s$^{-2}$. For constant $\alpha$:`,
      m: [r`\omega = \omega_0 + \alpha t, \qquad \theta = \omega_0 t + \tfrac{1}{2}\alpha t^2`],
      ul: [
        r`On an $\omega$–$t$ graph the **slope** is $\alpha$ and the **area** under the line is $\theta$.`,
        r`A fan starting from rest with $\alpha = ${fan.alpha}$ rad s$^{-2}$ reaches $\omega = ${f(fan.w, 3)}$ rad s$^{-1}$ in $${fan.t}$ s, having turned through $\theta = ${f(fan.th, 3)}$ rad.`,
        'If $\\omega$ is steady, $\\alpha = 0$ and the circular motion is uniform.',
      ],
      v: plotW,
      n: `Angular acceleration is the rate of change of angular velocity, in radians per second squared. For a constant value, the angular velocity grows as alpha times t, and the angle turned is half alpha t squared when starting from rest. On the graph, the slope is alpha and the area is the angle. A fan with two point five radians per second squared reaches twenty radians per second in eight seconds.`,
    }),
    sl('concept', 'Tangential acceleration: a_t = rα', {
      b: r`Differentiating $v = r\omega$ with $r$ fixed gives the rate at which the **speed** changes along the circle:`,
      m: [r`a_t = \dfrac{dv}{dt} = r\,\dfrac{d\omega}{dt} = r\alpha`],
      ul: [
        'This acceleration is along the **tangent**; it changes the speed, not the direction.',
        'It is zero in uniform circular motion. The other part, $a_c = \\omega^2 r$, always points to the centre and is the subject of the next slides.',
      ],
      v: T_LIN,
      n: 'Taking the rate of change of v equals r omega, the rate of change of speed is r times alpha. This is the tangential acceleration. It acts along the tangent and changes the speed, not the direction. In uniform circular motion it is zero. A second acceleration, always pointing to the centre, is needed to turn the velocity, and we study it next.',
    }),
    sl('example', 'Worked example 2: a fan blade tip', {
      b: r`A fan blade tip is $${fan.R}$ m from the axis. The fan starts from rest and speeds up with $\alpha = ${fan.alpha}$ rad s$^{-2}$ for $${fan.t}$ s. Find $\omega$, the angle turned, the tangential acceleration and the centripetal acceleration of the tip at the end of this time.`,
      ul: [
        r`$\omega = \alpha t = ${fan.alpha} \times ${fan.t} = ${f(fan.w, 3)}$ rad s$^{-1}$. $\theta = \tfrac12 \alpha t^2 = ${f(fan.th, 3)}$ rad $= ${f(fan.turns, 3)}$ turns.`,
        r`$a_t = r\alpha = ${fan.R} \times ${fan.alpha} = ${f(fan.at, 3)}$ m s$^{-2}$.`,
        r`$a_c = \omega^2 r = ${f(fan.w, 3)}^2 \times ${fan.R} = ${f(fan.ac, 4)}$ m s$^{-2}$, far larger; the total is $\sqrt{a_t^2 + a_c^2} = ${f(fan.a, 5)}$ m s$^{-2}$.`,
      ],
      v: T_FAN,
      n: `After eight seconds the angular speed is ${N(fan.w, 3)} radians per second and the angle turned is ${N(fan.th, 3)} radians, about ${N(fan.turns, 3)} turns. The tangential acceleration is point six times two point five, one point five metres per second squared. The centripetal acceleration is ${N(fan.ac, 4)} metres per second squared, which is far larger, so the total is almost the same as the centripetal part.`,
    }),
    sl('check', 'Quick check: tangential acceleration', {
      b: 'Choose the correct option.',
      v: T_FAN,
      chk: 'at-mcq',
      n: 'Remember that the tangential acceleration is the radius times alpha.',
    }),
    sl('concept', 'Uniform circular motion is accelerated', {
      b: 'In **uniform circular motion** the speed is constant, $\\alpha = 0$ and $a_t = 0$. Yet the body is **accelerated**.',
      ul: [
        'Velocity is a vector. Its **direction** keeps changing as the body goes round, so the velocity changes.',
        'A change of velocity means an acceleration, even when the speed is steady.',
        'Which way does that acceleration point, and how big is it? The velocity triangle on the next slides answers both.',
      ],
      v: T_COMP,
      n: 'In uniform circular motion the speed is steady, so there is no tangential acceleration. But velocity is a vector, and its direction keeps changing. A change in velocity is an acceleration, even when the speed does not change. So the body is accelerated. Which way does this acceleration point, and how large is it? The velocity triangle answers both questions.',
    }),
    sl('concept', 'The change in velocity: a triangle', {
      b: r`Take two points P and Q, a small angle $\Delta\theta$ apart. The speed $v$ is the same at both, but the velocities $\vec v_1$ and $\vec v_2$ are tangents at different directions.`,
      ul: [
        r`Draw $\vec v_1$ and $\vec v_2$ from one point. The angle between them is $\Delta\theta$, the angle POQ, because each is perpendicular to its radius.`,
        r`The change in velocity $\Delta\vec v = \vec v_2 - \vec v_1$ closes the triangle. It is the base of an **isosceles triangle** with two sides of length $v$.`,
        r`For the figure, $v = 5$ m s$^{-1}$ and $\Delta\theta = 50^\circ$ give $|\Delta v| = 2v\sin(\Delta\theta/2) = 4.23$ m s$^{-1}$, pointing from the chord midpoint towards O.`,
      ],
      v: V.vtri,
      n: 'Take two points on the circle, a small angle apart. The speeds are equal, but the velocities point in different directions along the tangents. Draw both from one point. The angle between them equals the angle at the centre, because each is perpendicular to its radius. The change in velocity joins their tips, the base of an isosceles triangle, and it points towards the centre.',
    }),
    sl('concept', 'Derivation: a = v²/r', {
      b: r`For a very small $\Delta\theta$ the base of the isosceles triangle equals the arc of radius $v$: $|\Delta v| \approx v\,\Delta\theta$.`,
      m: [r`a = \dfrac{|\Delta v|}{\Delta t} = v\,\dfrac{\Delta\theta}{\Delta t} = v\omega, \qquad a = v\omega = \dfrac{v^2}{r} = \omega^2 r`],
      ul: [
        r`As $\Delta\theta \to 0$, the angles at the base of the triangle approach $90^\circ$, so $\Delta\vec v$ becomes perpendicular to $\vec v$, that is **along the radius, towards the centre**.`,
        r`This is the **centripetal acceleration**: constant in size, but changing in direction as the body goes round.`,
        r`Using $\omega = 2\pi/T$: $a = 4\pi^2 r/T^2$.`,
      ],
      v: V.vtri,
      n: 'For a very small angle, the base of the triangle is nearly an arc of radius v, so the size of the change in velocity is v times the small angle. Divide by the small time, and the angle over time is omega. So the acceleration is v omega, which is v squared over r, which is omega squared r. As the angle shrinks to zero, the change in velocity points along the radius, towards the centre.',
    }),
    sl('concept', 'How the centripetal acceleration scales', {
      b: r`Because $a = v^2/r = \omega^2 r$, what is held fixed matters.`,
      ul: [
        r`At **fixed $r$**: doubling $v$ makes $a$ four times larger.`,
        r`At **fixed $v$**: $a \propto 1/r$. A sharper bend (smaller $r$) needs a larger acceleration.`,
        r`At **fixed $\omega$**: $a \propto r$. Points far from the axis of a spinning disc accelerate more.`,
        r`In the graph the two curves cross where $v = \omega r$.`,
      ],
      v: plotAc,
      n: 'Because the acceleration is v squared over r and also omega squared r, it depends on what you keep fixed. At the same radius, doubling the speed makes it four times larger. At fixed speed, a sharper bend needs more acceleration. At fixed angular velocity, it grows in proportion to the radius. In the graph the two curves meet where the speed equals omega times r.',
    }),
    sl('check', 'Quick check: doubling the speed', {
      b: 'Choose the correct option.',
      v: plotAc,
      chk: 'ac-double-mcq',
      n: 'Use the fact that the force needed is proportional to the square of the speed.',
    }),
    sl('example', 'Worked example 3: a cyclist on a roundabout', {
      b: r`A cyclist and cycle of total mass $${cyc.m}$ kg go round a circular roundabout of radius $${cyc.R}$ m at a steady $${f(cyc.v, 2)}$ m s$^{-1}$. Find the centripetal acceleration and the force towards the centre.`,
      ul: [
        r`$a = \dfrac{v^2}{r} = \dfrac{${cyc.v}^2}{${cyc.R}} = ${f(cyc.a, 3)}$ m s$^{-2}$, towards the centre.`,
        r`Check: $\omega = v/r = ${f(cyc.w, 3)}$ rad s$^{-1}$ and $\omega^2 r = ${f(cyc.w * cyc.w * cyc.R, 3)}$ m s$^{-2}$.`,
        r`$F = ma = ${cyc.m} \times ${f(cyc.a, 3)} = ${f(cyc.F, 3)}$ N, directed to the centre. It is supplied by friction between the tyres and the road.`,
      ],
      v: T_ROUND,
      n: `The centripetal acceleration is the speed squared over the radius, thirty six over twelve, which is ${N(cyc.a, 3)} metres per second squared. Using angular velocity, point five radians per second, gives the same result. The force towards the centre is seventy times three, which is ${N(cyc.F, 3)} newtons. Friction between the tyres and the road supplies it.`,
    }),
    sl('concept', 'Centripetal force: a name for a direction', {
      b: r`By Newton’s second law, a body with centripetal acceleration $v^2/r$ needs a **net force towards the centre** of size $F = mv^2/r = m\omega^2 r$.`,
      ul: [
        '**Centripetal force** is not a new kind of force. It is the **name of a direction**: it describes whichever real force, or combination of forces, points to the centre.',
        'On a free-body diagram show only the real forces: tension, friction, gravity, normal reaction. **Never add a separate arrow** called centripetal force.',
        'The sum of the real forces towards the centre must equal $mv^2/r$.',
        'It is perpendicular to the velocity, so it changes the direction of motion and does no work on the body.',
      ],
      v: V.who,
      n: 'By Newton second law, a body needing an inward acceleration needs a net inward force, m v squared over r. Centripetal force is not a new kind of force. It is the name for the direction of the real force or forces that point to the centre, such as tension, friction or gravity. On a free body diagram, draw only the real forces, never a separate centripetal arrow.',
    }),
    sl('example', 'Worked example 4: a stone on a table', {
      b: r`A stone of mass $${stn.m}$ kg is whirled on a smooth horizontal table by a string of length $${stn.R}$ m at $${stn.f}$ revolutions per second. Find the tension. What is the greatest frequency if the string breaks at $${stn.Tbreak}$ N?`,
      ul: [
        r`$\omega = 2\pi f = ${f(stn.w, 4)}$ rad s$^{-1}$, so $v = r\omega = ${f(stn.v, 4)}$ m s$^{-1}$.`,
        r`The tension is the only horizontal force, so $T = m\omega^2 r = ${stn.m} \times ${f(stn.w, 4)}^2 \times ${stn.R} = ${f(stn.T, 4)}$ N.`,
        r`At the limit, $\omega_{\max} = \sqrt{T/(mr)} = ${f(stn.wmax, 4)}$ rad s$^{-1}$, so $f_{\max} = ${f(stn.fmax, 4)}$ rev s$^{-1}$.`,
      ],
      v: T_STONE,
      n: `Two revolutions per second is ${N(stn.w, 4)} radians per second. The string tension is the only force along the radius, so it equals mass times omega squared times radius, ${N(stn.T, 4)} newtons. A string that breaks at fifty newtons allows an angular velocity of ${N(stn.wmax, 4)} radians per second, which is ${N(stn.fmax, 4)} revolutions per second.`,
    }),
    sl('check', 'Quick check: which force?', {
      b: 'Choose the correct option.',
      v: T_WHO,
      chk: 'who-mcq',
      n: 'Look for the real force that points to the centre.',
    }),
    sl('summary', 'Summary — Part 1', {
      b: 'Key results:',
      v: table(
        ['Idea', 'Result'],
        [
          ['Angular displacement', 'θ = s/r, in radians; 2π rad = 360°'],
          ['Angular velocity', 'ω = Δθ/Δt = 2π/T = 2πf'],
          ['Linear and angular speed', 'v = rω, along the tangent'],
          ['Angular acceleration', 'α = Δω/Δt; a_t = rα'],
          ['Centripetal acceleration', 'a = v²/r = ω²r = vω = 4π²r/T², to the centre'],
          ['Derivation', '|Δv| ≈ vΔθ in the velocity triangle'],
          ['Centripetal force', 'F = mv²/r: the name of a direction, supplied by a real force'],
        ],
        'Summary table of the key results of Part 1: angular displacement, angular velocity, v equals r omega, angular acceleration, centripetal acceleration and centripetal force',
      ),
      n: 'To sum up. Angular displacement is s over r in radians. Angular velocity is two pi over the period. The speed is r times omega, along the tangent, and the tangential acceleration is r times alpha. A body in uniform circular motion has a centripetal acceleration of v squared over r towards the centre. Centripetal force names that direction; a real force such as tension, friction or gravity supplies it.',
    }),
    sl('exam-tips', 'Exam tips — Part 1', {
      ul: [
        'Convert revolutions per minute to rad s⁻¹ by multiplying by $2\\pi/60$ before using $v = r\\omega$.',
        'For the derivation of $a = v^2/r$ draw both velocity vectors from one point, mark the angle $\\Delta\\theta$, show $|\\Delta v| \\approx v\\Delta\\theta$ and say the direction is towards the centre as $\\Delta\\theta \\to 0$.',
        'Name the real force that supplies the centripetal force; never draw "centripetal force" as an extra arrow on the free-body diagram.',
        'Centripetal acceleration is $v^2/r$, tangential acceleration is $r\\alpha$: do not mix them up, and add them as vectors at right angles.',
        'Common mistakes: using degrees in $s = r\\theta$; saying the acceleration is zero because the speed is constant; saying centripetal force does work on the body.',
      ],
      v: T_LIN,
      n: 'Convert revolutions per minute to radians per second before using v equals r omega. In the derivation, draw both velocities from one point, show the change as v times the small angle, and give its direction as towards the centre. Always name the real force supplying the centripetal force. Do not confuse the centripetal and tangential accelerations. Do not use degrees in the arc formula, and do not say the acceleration is zero.',
    }),
  ],
});

// ================================================================ DECK 2
export const deck2 = deck({
  part: 2,
  title: 'Circular Motion — Part 2: Roads, rails and vertical circles',
  goals: [
    'Show that a car on a level road has v_max = √(μrg), with friction as the centripetal force',
    'Derive tan θ = v²/(rg) for a banked road and the raised outer rail of a railway track',
    'Find the least speeds √(gr) at the top and √(5gr) at the bottom of a vertical circle on a string',
    'Calculate the tension at the top and at the bottom of the circle',
  ],
  slides: [
    sl('title', 'Roads, Rails and Vertical Circles', {
      b: 'Part 2 — real forces at work: friction on a bend, the normal reaction on a banked track, tension and weight in a vertical loop.',
      v: V.level,
      n: 'Why does a car skid on a wet bend? Why are expressway curves tilted, and why is the outer rail of a railway curve higher? And how can a bucket of water be swung over your head without spilling? In this part we use the centripetal force idea for roads, tracks and vertical circles.',
    }),
    sl('concept', 'A vehicle on a level curve', {
      b: 'On a **level** road the only horizontal force on the car is the **friction** between the tyres and the road. It points to the centre of the curve and **is** the centripetal force.',
      ul: [
        'The tyres grip without sliding sideways, so this is **static** friction, with a largest value $\\mu N$.',
        'There is no vertical acceleration, so $N = mg$.',
        'If the friction needed, $mv^2/r$, would exceed $\\mu mg$, the car skids outwards along the tangent.',
      ],
      v: V.level,
      n: 'On a level bend the only horizontal force on the car is friction between the tyres and the road. It points to the centre, so friction supplies the centripetal force. It is static friction, because the tyres do not slide sideways, and it has a largest value, mu times N. The normal reaction equals the weight. If more friction is needed than the road can give, the car skids outwards.',
    }),
    sl('concept', 'The greatest safe speed: v_max = √(μrg)', {
      b: r`At the limit, the friction needed equals the greatest friction available:`,
      m: [r`\dfrac{mv_{\max}^2}{r} = \mu N = \mu mg \quad\Rightarrow\quad v_{\max} = \sqrt{\mu r g}`],
      ul: [
        r`The **mass cancels**: a loaded truck and a small car on the same road have the same $v_{\max}$ (the greatest friction and the needed force are both proportional to $m$).`,
        r`A larger $\mu$ or a larger radius allows a higher speed; a **wet** road (smaller $\mu$) lowers it.`,
      ],
      v: T_LSTEPS,
      n: 'At the limit, the friction needed, m v squared over r, equals the greatest friction available, mu times m g. The mass cancels, so the greatest safe speed is the square root of mu r g. A truck and a car on the same bend have the same limit. A bigger radius or a larger coefficient allows a higher speed, and a wet road with a smaller coefficient lowers it.',
    }),
    sl('example', 'Worked example 1: a bend in the rain', {
      b: r`A bend of radius $${lv.R}$ m is level. Find the greatest safe speed on a dry road ($\mu = ${lv.dry}$) and on a wet road ($\mu = ${lv.wet}$). Take $g = 9.8$ m s$^{-2}$.`,
      ul: [
        r`Dry: $v = \sqrt{${lv.dry} \times ${lv.R} \times 9.8} = ${f(lv.vd, 4)}$ m s$^{-1}$ $= ${f(lv.vd * 3.6, 3)}$ km h$^{-1}$.`,
        r`Wet: $v = \sqrt{${lv.wet} \times ${lv.R} \times 9.8} = ${f(lv.vw, 4)}$ m s$^{-1}$ $= ${f(lv.vw * 3.6, 3)}$ km h$^{-1}$.`,
        r`$\mu$ halved, so $v_{\max}$ falls by the factor $\sqrt{1/2} = 0.707$, not by one half.`,
      ],
      v: T_VMAX,
      n: `On the dry road, the greatest speed is the square root of zero point seven times forty five times nine point eight, which is ${N(lv.vd, 4)} metres per second. On the wet road, with the coefficient halved, it is ${N(lv.vw, 4)} metres per second. Halving the coefficient reduces the greatest speed by the square root of one half, about seventy one per cent of the dry value.`,
    }),
    sl('check', 'Quick check: a wetter road', {
      b: 'Choose the correct option.',
      v: T_VMAX,
      chk: 'wet-mcq',
      n: 'The greatest speed depends on the square root of the coefficient.',
    }),
    sl('concept', 'Why bank the road?', {
      b: 'Friction is limited, wears the tyres and nearly vanishes on a wet or oily road. A **banked** road tilts towards the **inside** of the bend (the outer edge is higher), so the **normal reaction** itself has a horizontal part pointing to the centre.',
      ul: [
        'The normal reaction is perpendicular to the **road**, not to the ground, so it leans towards the centre.',
        'Its vertical part balances the weight; its horizontal part is the centripetal force.',
        'At the **design speed** no friction is needed at all.',
      ],
      v: V.bank,
      n: 'Friction is limited and nearly disappears on a wet road. So bends are banked, with the outer edge higher. The normal reaction is perpendicular to the road, so it leans towards the centre of the bend. Its vertical part balances the weight, and its horizontal part supplies the centripetal force. At the design speed, no friction is needed at all.',
    }),
    sl('concept', 'Derivation: tan θ = v²/(rg)', {
      b: r`A car of mass $m$ moves at speed $v$ on a bend of radius $r$, banked at angle $\theta$, with no friction needed.`,
      m: [r`N\cos\theta = mg, \qquad N\sin\theta = \dfrac{mv^2}{r} \quad\Rightarrow\quad \tan\theta = \dfrac{v^2}{rg}`],
      ul: [
        r`Divide the second equation by the first: $N$ and $m$ cancel, so the angle depends only on $v$ and $r$.`,
        r`The **design speed** for a given $\theta$ is $v = \sqrt{rg\tan\theta}$.`,
        r`The mass does not appear: heavy and light vehicles need the same banking.`,
      ],
      v: T_BSTEPS,
      n: 'Resolve the normal reaction. Its vertical part balances the weight, N cos theta equals m g. Its horizontal part gives the centripetal force, N sin theta equals m v squared over r. Divide the second equation by the first. The normal reaction and the mass cancel, leaving tan theta equal to v squared over r g. The mass does not appear, so all vehicles use the same banking.',
    }),
    sl('example', 'Worked example 2: an expressway curve', {
      b: r`A curve of radius $${bk.r}$ m is to be banked for $${bk.v}$ m s$^{-1}$ ($${f(bk.kmh, 3)}$ km h$^{-1}$). Find the angle of banking, and the normal reaction on a car of mass $${bk.m}$ kg moving at that speed. ($g = 9.8$ m s$^{-2}$.)`,
      ul: [
        r`$\tan\theta = \dfrac{v^2}{rg} = \dfrac{${bk.v}^2}{${bk.r} \times 9.8} = ${f(bk.tan, 4)}$, so $\theta = ${f(bk.th, 4)}^\circ$.`,
        r`$N = \dfrac{mg}{\cos\theta} = \dfrac{${bk.m} \times 9.8}{\cos ${f(bk.th, 3)}^\circ} = ${f(bk.N, 4)}$ N.`,
        r`Check: $N\sin\theta = ${f(bk.N * Math.sin(rad(bk.th)), 4)}$ N $= mv^2/r = ${f(bk.Fc, 4)}$ N.`,
      ],
      v: T_BEX,
      n: `The tangent of the angle is the speed squared over r g, four hundred over nine hundred and eighty, which is ${N(bk.tan, 4)}. So the angle is ${N(bk.th, 4)} degrees. The normal reaction is the weight divided by the cosine, ${N(bk.N, 4)} newtons. As a check, its horizontal part is ${N(bk.Fc, 4)} newtons, equal to m v squared over r.`,
    }),
    sl('concept', 'Railway tracks: raise the outer rail', {
      b: 'On a railway curve the **outer rail is raised** above the inner rail, so the track is banked. The flanges of the wheels then need not press sideways on the rails at the design speed.',
      ul: [
        r`If the gauge (distance between the rails, measured along the sleeper) is $l$ and the outer rail is $h$ higher, $\sin\theta = h/l$.`,
        r`$\theta$ is small, so $\sin\theta \approx \tan\theta$ and $h \approx l\,\dfrac{v^2}{rg}$.`,
        'Too fast: the train presses on the outer rail. Too slow: on the inner rail. Either wears the rail and the wheel flange.',
      ],
      v: V.rail,
      n: 'On a railway curve, the outer rail is raised above the inner rail. If the gap between the rails is l and the height difference is h, then sine theta is h over l. For a small angle, sine and tangent are almost equal, so h is about l times v squared over r g. At the design speed the wheels do not push sideways on either rail. A faster or slower train presses on one rail.',
    }),
    sl('example', 'Worked example 3: raising the outer rail', {
      b: r`A curve of radius $${rail.r}$ m on a broad-gauge line ($l = ${rail.l}$ m) is designed for $${rail.v}$ m s$^{-1}$ ($${f(rail.kmh, 3)}$ km h$^{-1}$). By how much must the outer rail be raised?`,
      ul: [
        r`$\tan\theta = \dfrac{${rail.v}^2}{${rail.r} \times 9.8} = ${f(rail.tan, 4)}$, so $\theta = ${f(rail.th, 4)}^\circ$.`,
        r`$h = l\sin\theta = ${rail.l} \times ${f(Math.sin(rad(rail.th)), 5)} = ${f(rail.h, 4)}$ m, about $${f(rail.h * 1000, 3)}$ mm.`,
        r`The approximation $h \approx l\tan\theta = ${f(rail.happrox, 4)}$ m differs by less than one per cent.`,
      ],
      v: T_RAILEX,
      n: `The tangent of the angle is ${N(rail.tan, 4)}, so the angle is about ${N(rail.th, 3)} degrees. The height is the gauge, one point six seven six metres, times the sine of the angle, which is ${N(rail.h, 4)} metres, about ${N(rail.h * 1000, 3)} millimetres. The approximation using the tangent gives almost the same, ${N(rail.happrox, 4)} metres.`,
    }),
    sl('concept', 'Other speeds on a banked track', {
      b: r`The banking angle is built for **one** design speed. The graph shows how steeply the angle rises with $v$.`,
      ul: [
        'Above the design speed the vehicle tends to move **outwards** and up the slope; friction, or the outer rail, must supply the extra inward force.',
        'Below it the vehicle tends to slide **inwards** and down the slope; friction, or the inner rail, holds it.',
        r`Because $\tan\theta \propto v^2$, doubling the speed on the same curve needs about four times the value of $\tan\theta$.`,
      ],
      v: plotBank,
      n: 'A banked track is built for one design speed. Above that speed, a vehicle tends to move outwards and up the slope, so friction or the outer rail supplies the extra inward force. Below it, the vehicle tends to slide inwards and down. Because tan theta grows as the square of the speed, doubling the speed needs about four times the tangent of the angle.',
    }),
    sl('check', 'Quick check: finding the angle', {
      b: 'Choose the correct option.',
      v: plotBank,
      chk: 'bankang-mcq',
      n: 'Use tan theta equals v squared over r g.',
    }),
    sl('concept', 'Motion in a vertical circle', {
      b: 'A ball on a string moves in a **vertical** circle. Gravity speeds it up as it falls and slows it as it rises, so this motion is **not uniform**: the speed is least at the top and greatest at the bottom.',
      ul: [
        'The weight acts downwards throughout; the tension acts along the string, **towards the centre**.',
        r`At every point, (force towards the centre) $= mv^2/r$.`,
        'At the **top** both $T$ and $mg$ point to the centre; at the **bottom** $T$ points to the centre and $mg$ points away.',
      ],
      v: V.vert,
      n: 'In a vertical circle, gravity speeds the ball up as it falls and slows it as it rises, so the speed is least at the top and greatest at the bottom. The weight always acts downwards and the tension acts along the string towards the centre. At every point the net force towards the centre is m v squared over r. At the top, tension and weight both point to the centre. At the bottom, only the tension does.',
    }),
    sl('concept', 'The least speed at the top: √(gr)', {
      b: r`At the **top**, $T$ and $mg$ both point to the centre:`,
      m: [r`T + mg = \dfrac{mv_{\text{top}}^2}{r} \quad\Rightarrow\quad T = \dfrac{mv_{\text{top}}^2}{r} - mg`],
      ul: [
        r`A string can only pull, so $T \ge 0$. The **least speed** has $T = 0$: the weight alone supplies the centripetal force.`,
        r`$mg = \dfrac{mv_{\min}^2}{r} \Rightarrow v_{\text{top,min}} = \sqrt{gr}$.`,
        r`Slower than this, the string goes slack and the ball leaves the circle and falls inside it.`,
      ],
      v: V.vert,
      n: 'At the top, the tension and the weight both point to the centre. A string can only pull, so the tension cannot be negative. The least speed is when the tension is zero, and the weight alone supplies the centripetal force. Then g equals v squared over r, so the least speed at the top is the square root of g r. Slower than this, the string goes slack.',
    }),
    sl('concept', 'The least speed at the bottom: √(5gr)', {
      b: r`From the top to the bottom the ball falls through $2r$. Mechanical energy is conserved (gravity is the only force that does work; the tension is perpendicular to the motion):`,
      m: [r`\tfrac12 mv_{\text{bot}}^2 = \tfrac12 mv_{\text{top}}^2 + mg(2r) \;\Rightarrow\; v_{\text{bot}}^2 = v_{\text{top}}^2 + 4gr`],
      ul: [
        r`With the least top speed $v_{\text{top}}^2 = gr$: $v_{\text{bot}}^2 = 5gr$, so $v_{\text{bot,min}} = \sqrt{5gr}$.`,
        r`For the figure, $r = ${Vv.r}$ m: $\sqrt{gr} = ${f(Vv.vTop, 3)}$ m s$^{-1}$ and $\sqrt{5gr} = ${f(Vv.vBot, 3)}$ m s$^{-1}$.`,
        'A ball launched from the bottom slower than $\\sqrt{5gr}$ cannot complete the circle.',
      ],
      v: T_VCRIT,
      n: 'From top to bottom the ball falls a height of two r. Mechanical energy is conserved, because only gravity does work. So the speed squared at the bottom is the speed squared at the top plus four g r. With the least top speed, speed squared at the top is g r, so the bottom speed squared is five g r. The least speed at the bottom is the square root of five g r.',
    }),
    sl('concept', 'Tension at the bottom and at the top', {
      b: r`At the **bottom**, $T$ points to the centre and $mg$ points away:`,
      m: [r`T_{\text{bot}} - mg = \dfrac{mv_{\text{bot}}^2}{r}, \qquad T_{\text{top}} + mg = \dfrac{mv_{\text{top}}^2}{r}`],
      ul: [
        r`Subtract and use $v_{\text{bot}}^2 = v_{\text{top}}^2 + 4gr$: $T_{\text{bot}} - T_{\text{top}} = 6mg$ **for any speed**.`,
        r`At the least speed: $T_{\text{top}} = 0$ and $T_{\text{bot}} = 6mg$. For the figure that is $${f(6 * Vv.W, 3)}$ N.`,
        'The string is most likely to snap at the **bottom**, where the tension is greatest.',
      ],
      v: T_TENS,
      n: 'At the bottom, the tension points to the centre and the weight points away, so tension minus m g equals m v squared over r. At the top, tension plus m g equals m v squared over r. Subtracting, and using the energy result, the bottom tension is always six m g more than the top tension. At the least speed the top tension is zero and the bottom tension is six m g.',
    }),
    sl('check', 'Quick check: the speed at the bottom', {
      b: 'Choose the correct option.',
      v: T_TENS,
      chk: 'bottom-min-mcq',
      n: 'The least speed at the bottom is the square root of five g r.',
    }),
    sl('example', 'Worked example 4: a bucket of water at a well', {
      b: r`A bucket and water of total mass $${bkt.m}$ kg is whirled on a rope of length $${bkt.R}$ m in a vertical circle. Find the least speed at the top and at the bottom, the rope tension at the bottom for that case, and the tension at the top when the speed there is $${f(bkt.v, 2)}$ m s$^{-1}$. ($g = 9.8$ m s$^{-2}$.)`,
      ul: [
        r`$v_{\text{top,min}} = \sqrt{gr} = ${f(bkt.vtop, 4)}$ m s$^{-1}$ and $v_{\text{bot,min}} = \sqrt{5gr} = ${f(bkt.vbot, 4)}$ m s$^{-1}$.`,
        r`Least-speed case: $T_{\text{bot}} = 6mg = 6 \times ${bkt.m} \times 9.8 = ${f(bkt.Tbot, 4)}$ N.`,
        r`At $${f(bkt.v, 2)}$ m s$^{-1}$ at the top: $T = m\left(\dfrac{v^2}{r} - g\right) = ${bkt.m}\left(\dfrac{${bkt.v}^2}{${bkt.R}} - 9.8\right) = ${f(bkt.Ttop, 4)}$ N, a pull, so the rope is taut and the water stays in.`,
      ],
      v: T_BUCKET,
      n: `The least speed at the top is the square root of g r, ${N(bkt.vtop, 4)} metres per second. At the bottom it is the square root of five g r, ${N(bkt.vbot, 4)} metres per second. The rope tension at the bottom for that case is six m g, ${N(bkt.Tbot, 4)} newtons. At five metres per second at the top, the tension is ${N(bkt.Ttop, 4)} newtons, still a pull, so the water stays in.`,
    }),
    sl('concept', 'Going further (not examined): tension around the circle', {
      b: r`For the least speed at the bottom, the tension at an angle $\varphi$ from the lowest point is $T = mv^2/r + mg\cos\varphi$ with $v^2 = 5gr - 2gr(1 - \cos\varphi)$, which simplifies to:`,
      m: [r`T = 3mg\,(1 + \cos\varphi)`],
      ul: [
        r`At $\varphi = 0$ (bottom): $6mg$. Level with the centre ($90^\circ$): $3mg$. At the top ($180^\circ$): zero.`,
        'The tension falls steadily all the way up, and reaches zero only at the top, exactly when the speed is the least possible.',
        'Not examined: the ISC syllabus asks for the top and the bottom only. This curve just shows how those two results join up.',
      ],
      v: plotT,
      n: 'For the least speed at the bottom, the tension around the circle follows three m g times one plus the cosine of the angle from the lowest point. It is six m g at the bottom, three m g level with the centre, and zero at the top. The tension falls steadily on the way up and reaches zero only at the top, exactly when the speed is the least that keeps the string taut. This is for interest only: the examination asks about the top and the bottom.',
    }),
    sl('summary', 'Summary — Part 2', {
      b: 'Key results:',
      v: table(
        ['Idea', 'Result'],
        [
          ['Level road', 'friction supplies mv²/r; v_max = √(μrg), independent of mass'],
          ['Banked road', 'N cos θ = mg and N sin θ = mv²/r, so tan θ = v²/(rg)'],
          ['Railway track', 'outer rail raised by h = l sin θ ≈ l v²/(rg)'],
          ['Vertical circle, top', 'T + mg = mv²/r; least speed √(gr) with T = 0'],
          ['Vertical circle, bottom', 'T − mg = mv²/r; least speed √(5gr)'],
          ['Tensions', 'T_bottom − T_top = 6mg; least-speed case: 0 at the top, 6mg at the bottom'],
        ],
        'Summary table of the key results of Part 2: level road, banked road, railway track, and the top and bottom of a vertical circle with the least speeds and tensions',
      ),
      n: 'To sum up. On a level bend, friction supplies the force and the greatest speed is the square root of mu r g, whatever the mass. On a banked road, tan theta is v squared over r g, and a railway outer rail is raised by l sin theta. In a vertical circle, the least speed is root g r at the top and root five g r at the bottom, and the bottom tension is six m g more than the top.',
    }),
    sl('exam-tips', 'Exam tips — Part 2', {
      ul: [
        'Start with a free-body diagram of the **real** forces; then write one equation along the radius (towards the centre) and one perpendicular to it.',
        'On a level road use $N = mg$ and $f = mv^2/r$; show that $m$ cancels in $v_{\\max}$.',
        'For banking write both equations, $N\\cos\\theta = mg$ and $N\\sin\\theta = mv^2/r$, and divide; mention that the normal reaction is perpendicular to the **road**.',
        'In the vertical circle write the radial equation at the top and at the bottom, and use energy conservation between them.',
        'Common mistakes: using $\\sqrt{gr}$ for the speed at the bottom; writing $T + mg$ at the bottom (there the weight points away from the centre, so $T - mg = mv^2/r$); forgetting to convert km h⁻¹ to m s⁻¹.',
      ],
      v: T_VCRIT,
      n: 'Draw the real forces first, then write one equation along the radius towards the centre. On a level road the mass cancels in the greatest speed. For banking, write both equations and divide, and say the normal reaction is perpendicular to the road. In the vertical circle, write the radial equation at the top and at the bottom and use energy conservation between them. Convert kilometres per hour to metres per second.',
    }),
  ],
});
