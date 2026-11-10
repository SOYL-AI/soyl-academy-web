// ISC 11 ch06 Friction — two decks. Part 1 (t01, t02): classical and modern views, static friction as a self-adjusting force, limiting,
// kinetic and rolling friction, the laws and coefficients, the friction graph, friction as a non-conservative force. Part 2 (t03, t04):
// a block on a rough incline (up and down), pulling and pushing a roller, angle of friction, angle of repose, reducing friction.
// Every number and every graph is computed here from stated data.
import { sl, deck, table, svgV, plot, r, dec } from '../../isc-11-physics-ch01/src/lib.mjs';
import { g, rad, deg, R6, slope, mn } from './phys.mjs';
import { W, N } from './words.mjs';
import * as G from './svgs.mjs';

const f = (x, n = 3) => dec(x, n);

// ---------------------------------------------------------------- worked-example numbers
// the crate of the figures: 35 kg, mu_s = 0.45, mu_k = 0.30
const crate = { m: G.SELFADJ_DATA.m, mus: G.SELFADJ_DATA.mus, muk: G.SELFADJ_DATA.muk, N: G.SELFADJ_DATA.N, fmax: G.SELFADJ_DATA.fmax, fk: G.SELFADJ_DATA.fk, F1: 60, F2: 120, F3: 180 };
crate.a = (crate.F3 - crate.fk) / crate.m;
// measuring mu: a 3.2 kg block slips at a spring-balance reading of 12.5 N; a 2.0 kg load is added; steady pull 9.4 N
const ex2 = { m1: 3.2, fslip: 12.5, add: 2.0, fsteady: 9.4 };
ex2.N1 = ex2.m1 * g;
ex2.mus = ex2.fslip / ex2.N1;
ex2.N2 = (ex2.m1 + ex2.add) * g;
ex2.f2 = ex2.mus * ex2.N2;
ex2.muk = ex2.fsteady / ex2.N1;
// friction does path-dependent work: 20 kg box, mu_k = 0.25, A to B straight 10 m or round the corner 6 m + 8 m
const ex3 = { m: 20, muk: 0.25, straight: 10, legs: [6, 8] };
ex3.f = ex3.muk * ex3.m * g;
ex3.via = ex3.legs[0] + ex3.legs[1];
ex3.W1 = ex3.f * ex3.straight;
ex3.W2 = ex3.f * ex3.via;
ex3.Wround = 2 * ex3.W1;
// pushing up: 40 kg, 20 degrees, mu = 0.25
const U = G.UP_DATA;
const up = { m: U.m, th: U.th, mu: U.mu, W: U.W, N: U.N, fric: U.fric, along: U.along, P: U.up, a: 0.5 };
up.Pa = up.P + up.m * up.a;
// sliding down: 25 kg, 35 degrees, mu_k = 0.30, from rest over 6 m
const D = G.DOWN_DATA;
const dn = { m: D.m, th: D.th, mu: D.mu, W: D.W, N: D.N, fric: D.fric, along: D.along, a: D.aDown, s: 6 };
dn.net = dn.along - dn.fric;
dn.v = Math.sqrt(2 * dn.a * dn.s);
dn.t = Math.sqrt((2 * dn.s) / dn.a);
dn.hold = dn.along - dn.fric; // minimum force up the slope to stop sliding (mu_s = mu)
dn.Pup = dn.along + dn.fric;
// the roller: 50 kg, mu = 0.3, handle at 40 degrees
const RL = G.ROLLER_DATA;
const rl = { m: RL.m, mu: RL.mu, phi: RL.phi, W: RL.W, pull: RL.pull, push: RL.push, Npull: RL.Npull, Npush: RL.Npush };
rl.fpull = rl.mu * rl.Npull;
rl.fpush = rl.mu * rl.Npush;
rl.ratio = rl.push / rl.pull;
rl.F0 = rl.mu * rl.W; // handle flat on the ground (phi = 0)
// angle of friction and repose: mu_s = 0.5 for the figures
const AN = G.ANGLES_DATA;
const lam = AN.lam;
// plank readings for the repose measurement
const ex4 = { trials: [27.5, 28.0, 28.5] };
ex4.mean = ex4.trials.reduce((a, b) => a + b, 0) / ex4.trials.length;
ex4.mus = Math.tan(rad(ex4.mean));

export const EX = { crate, ex2, ex3, up, dn, rl, ex4, lam };

// ---------------------------------------------------------------- visuals
export const V = {
  contact: svgV(G.CONTACT, 'Two views of friction: meshed teeth in the classical view, and welded junctions at a few touching tips in the modern view', 'Classical view: interlocking. Modern view: adhesion at the real contact points.'),
  selfadj: svgV(G.SELFADJ, 'Four pictures of a 35 kilogram crate with pushes of 0, 60, 120 and 180 newtons: friction equals the push while the crate is at rest, then drops to the kinetic value when it slides', 'Static friction adjusts itself; kinetic friction is smaller and steady.'),
  up: svgV(G.INCL_UP, 'A 40 kilogram block pushed up a rough 20 degree slope at constant speed, with weight, normal reaction, friction down the slope and the push up the slope drawn to scale', 'Pushing up: friction acts down the slope, so P = mg sin θ + μ mg cos θ.'),
  down: svgV(G.INCL_DOWN, 'A 25 kilogram block sliding down a rough 35 degree slope with weight, normal reaction, friction up the slope and the net force down the slope', 'Sliding down: friction acts up the slope, so ma = mg sin θ − μ mg cos θ.'),
  roller: svgV(G.ROLLER, 'A 50 kilogram roller pulled and pushed along a handle at 40 degrees: pulling reduces the normal reaction to 391 newtons and pushing raises it to 655 newtons', 'Pulling lightens the roller on the ground; pushing presses it down.'),
  angles: svgV(G.ANGLES, 'The normal reaction, the limiting friction and their resultant, which is tilted from the normal by the angle of friction of 26.6 degrees', 'tan λ = f(max)/N = μs.'),
  repose: svgV(G.REPOSE, 'A block on a slope at the angle of repose with weight, normal reaction, limiting friction and their resultant, which balances the weight', 'α = λ, and tan α = μs.'),
  bearing: svgV(G.BEARING, 'Cross-section of a ball bearing with seven balls rolling between an inner ring on a shaft and a fixed outer ring', 'Rolling contacts replace sliding contacts.'),
};

const ax = (label, min, max) => ({ label, min, max });
export const plotFric = plot(
  {
    x: ax('applied force F (N)', 0, 200),
    y: ax('friction f (N)', 0, 170),
    series: [{ label: `static (f = F), then kinetic (f = ${f(crate.fk, 4)} N)`, kind: 'line', points: [[0, 0], [R6(crate.fmax), R6(crate.fmax)], [R6(crate.fmax), R6(crate.fk)], [200, R6(crate.fk)]] }],
    hlines: [{ y: R6(crate.fmax), label: `limiting friction ${f(crate.fmax, 4)} N`, dashed: true }, { y: R6(crate.fk), label: `kinetic friction ${f(crate.fk, 4)} N`, dashed: true }],
  },
  'Friction against applied force for a 35 kilogram crate: friction rises along the line f equals F up to the limiting value of 154.4 newtons, then drops to the constant kinetic value of 102.9 newtons once the crate slides',
  'Static friction adjusts to the push up to the limit; kinetic friction is smaller and steady.',
);
const mR = 5;
const musR = 0.5;
const alphaR = deg(Math.atan(musR));
const sinR = (mR * g);
const cosR = musR * mR * g;
export const plotRepose = plot(
  {
    x: ax('slope angle θ (degrees)', 0, 50),
    y: ax('force along the slope (N)', 0, 40),
    functions: [
      { expr: `${R6(sinR)}*sin(pi*x/180)`, label: 'mg sin θ: pull of the weight down the slope (5 kg)', domain: [0, 50] },
      { expr: `${R6(cosR)}*cos(pi*x/180)`, label: 'μs mg cos θ: greatest friction (μs = 0.5)', domain: [0, 50] },
    ],
    points: [{ at: [R6(alphaR), R6(sinR * Math.sin(rad(alphaR)))], label: `slides beyond θ = ${f(alphaR, 3)}°` }],
  },
  'Two curves against the slope angle for a 5 kilogram block with coefficient of static friction 0.5: the weight component down the slope rises while the greatest friction falls, and they cross at 26.6 degrees, the angle of repose',
  'The block slides once mg sin θ exceeds μs mg cos θ: beyond tan θ = μs.',
);
const WR = rl.W;
const fHandle = (phi, s) => (rl.mu * WR) / (Math.cos(rad(phi)) + s * rl.mu * Math.sin(rad(phi)));
const phiMin = deg(Math.atan(rl.mu));
export const plotRoller = plot(
  {
    x: ax('handle angle φ above the ground (degrees)', 0, 40),
    y: ax('force along the handle F (N)', 100, 270),
    functions: [
      { expr: `${R6(rl.mu * WR)}/(cos(pi*x/180)+${rl.mu}*sin(pi*x/180))`, label: 'pulling: F = μW / (cos φ + μ sin φ)', domain: [0, 40] },
      { expr: `${R6(rl.mu * WR)}/(cos(pi*x/180)-${rl.mu}*sin(pi*x/180))`, label: 'pushing: F = μW / (cos φ − μ sin φ)', domain: [0, 40] },
    ],
    points: [
      { at: [0, R6(fHandle(0, 1))], label: `φ = 0: ${f(fHandle(0, 1))} N for both` },
      { at: [R6(phiMin), R6(fHandle(phiMin, 1))], label: `pull is least near φ = ${f(phiMin, 3)}°: ${f(fHandle(phiMin, 1), 4)} N` },
      { at: [40, R6(fHandle(40, 1))], label: `pull at 40°: ${f(fHandle(40, 1))} N` },
      { at: [40, R6(fHandle(40, -1))], label: `push at 40°: ${f(fHandle(40, -1))} N` },
    ],
  },
  'Force along the handle against the handle angle for a 50 kilogram roller with coefficient of friction 0.3: the pulling force dips slightly to 140.8 newtons near 16.7 degrees and then rises to 153.3 newtons at 40 degrees, while the pushing force rises steeply to 256.5 newtons at 40 degrees. The vertical axis starts at 100.',
  'The same angle costs far more when pushing than when pulling.',
);

// ---------------------------------------------------------------- tables
const T_KINDS = table(
  ['Kind', 'What it is', 'Example'],
  [
    ['Static friction', 'Acts between surfaces at rest relative to each other; adjusts itself up to a maximum', 'A scooter parked on a slope'],
    ['Limiting friction', 'The greatest static friction, just before sliding begins', 'The push at which a loaded trolley just starts to move'],
    ['Kinetic (sliding) friction', 'Acts between surfaces sliding over each other; nearly constant, less than limiting friction', 'A brick sliding down a plank'],
    ['Rolling friction', 'Acts on a wheel or ball rolling without slipping; much the smallest', 'A cricket ball rolling over the outfield'],
  ],
  'Table of the four kinds of friction: static, limiting, kinetic and rolling, each with its meaning and an example',
);
const T_VIEWS = table(
  ['', 'Classical view', 'Modern view'],
  [
    ['Cause of friction', 'Interlocking of surface hills and hollows', 'Adhesion (cold welding) at the few points of real contact'],
    ['Area of real contact', 'The whole apparent surface is assumed', 'A tiny fraction of the apparent area'],
    ['Why f(max) grows with N', 'Pressing harder meshes the teeth deeper', 'Greater N flattens the tips: real contact grows in proportion to N'],
    ['Very smooth, clean surfaces', 'Predicts less friction', 'Friction can rise: more atoms come into contact'],
    ['Verdict', 'Useful picture for rough surfaces; incomplete', 'The accepted explanation'],
  ],
  'Table comparing the classical and modern views of friction: cause, area of contact, why limiting friction grows with the normal reaction, very smooth surfaces and the verdict',
);
const T_COEF = table(
  ['Quantity', 'Definition', `Crate of ${crate.m} kg (N = ${f(crate.N, 3)} N)`],
  [
    ['Limiting friction', 'f(max) = μs N', `${f(crate.fmax, 5)} N`],
    ['Coefficient of static friction', 'μs = f(max) / N', f(crate.mus, 2)],
    ['Kinetic friction', 'fk = μk N', `${f(crate.fk, 4)} N`],
    ['Coefficient of kinetic friction', 'μk = fk / N', f(crate.muk, 2)],
  ],
  'Table of limiting friction, coefficient of static friction, kinetic friction and coefficient of kinetic friction with the values for a 35 kilogram crate',
);
const T_ROLL = table(
  ['Surfaces (typical, approximate)', 'μs', 'μk'],
  [
    ['Rubber tyre on dry road', '1.0', '0.8'],
    ['Steel on steel, dry', '0.7', '0.6'],
    ['Wood on wood', '0.5', '0.3'],
    ['Ice on ice', '0.1', '0.03'],
    ['Steel wheel rolling on steel rail', '—', 'rolling: about 0.001'],
  ],
  'Table of typical approximate coefficients of static and kinetic friction for four pairs of surfaces and the much smaller rolling value for a steel wheel on a rail',
);
const T_LAWS = table(
  ['Law', 'Statement'],
  [
    ['Direction', 'Friction acts along the surfaces in contact, opposite to the relative motion or its tendency'],
    ['Normal reaction', 'Limiting friction is proportional to the normal reaction: f(max) = μs N'],
    ['Area', 'Limiting friction does not depend on the apparent area of contact'],
    ['Surfaces', 'It depends on the materials and roughness, through μs'],
    ['Kinetic friction', 'fk = μk N: nearly independent of speed and area, and less than limiting friction'],
  ],
  'Table of the laws of static and kinetic friction: direction, normal reaction, area, surfaces and kinetic friction',
);
const T_MEAS = table(
  ['Step', 'Working', 'Result'],
  [
    ['Normal reaction on the block', `${ex2.m1} × 9.8`, `${f(ex2.N1, 4)} N`],
    ['Coefficient of static friction', `${ex2.fslip} / ${f(ex2.N1, 4)}`, f(ex2.mus, 3)],
    ['Normal reaction with the extra load', `${f(ex2.m1 + ex2.add, 2)} × 9.8`, `${f(ex2.N2, 4)} N`],
    ['Predicted limiting friction', `${f(ex2.mus, 3)} × ${f(ex2.N2, 4)}`, `${f(ex2.f2, 3)} N`],
    ['Coefficient of kinetic friction', `${ex2.fsteady} / ${f(ex2.N1, 4)}`, f(ex2.muk, 3)],
  ],
  'Table of the working for measuring the coefficients of friction of a wooden block: normal reaction, coefficient of static friction, predicted limiting friction with a load and coefficient of kinetic friction',
);
const T_PATHS = table(
  ['Path', 'Distance', `Work against friction (${f(ex3.f, 3)} N × distance)`],
  [
    ['A to B in a straight line', `${ex3.straight} m`, `${f(ex3.W1, 3)} J`],
    [`A to B round the corner (${ex3.legs[0]} m then ${ex3.legs[1]} m)`, `${ex3.via} m`, `${f(ex3.W2, 3)} J`],
    ['A to B and back by the straight line', `${2 * ex3.straight} m`, `${f(ex3.Wround, 3)} J`],
  ],
  'Table of the work done against friction on a 20 kilogram box between two points: straight path, path round a corner and the round trip',
);
const T_RES = table(
  ['Quantity', 'Formula', `${up.m} kg on ${up.th}°, μ = ${up.mu}`],
  [
    ['Weight', 'W = mg', `${f(up.W, 4)} N`],
    ['Component along the slope', 'mg sin θ', `${f(up.along, 4)} N`],
    ['Component perpendicular to the slope (= N)', 'mg cos θ', `${f(up.N, 4)} N`],
    ['Greatest friction', 'μ N = μ mg cos θ', `${f(up.fric, 3)} N`],
  ],
  'Table of the weight, its component along the slope, its component perpendicular to the slope and the greatest friction for a 40 kilogram block on a 20 degree slope',
);
const T_SLOPE4 = table(
  ['Situation', 'Result', `${dn.m} kg, ${dn.th}°, μ = ${dn.mu}`],
  [
    ['Pushed up at constant speed', 'P = mg(sin θ + μ cos θ)', `${f(dn.Pup, 4)} N`],
    ['Held at rest (just stopped from sliding)', 'P = mg(sin θ − μ cos θ)', `${f(dn.hold, 3)} N`],
    ['Sliding freely down', 'a = g(sin θ − μ cos θ)', `${f(dn.a, 3)} m s⁻²`],
    ['Pushed down at constant speed', 'P = mg(μ cos θ − sin θ), only if tan θ < μ', `not needed: tan ${dn.th}° = ${f(Math.tan(rad(dn.th)), 3)} > ${dn.mu}`],
  ],
  'Table of four situations for a block on a rough slope: pushed up at constant speed, held at rest, sliding freely down and pushed down at constant speed, with the formula and the value for a 25 kilogram block on 35 degrees',
);
const T_REP = table(
  ['Trial', 'Angle at which the box slips', 'tan of the angle'],
  [...ex4.trials.map((a, i) => [String(i + 1), `${f(a, 3)}°`, f(Math.tan(rad(a)), 3)]), ['Mean angle', `${f(ex4.mean, 3)}°`, f(ex4.mus, 3)]],
  'Table of three trials of tilting a plank until a box slips, with the tangent of each angle and the mean',
);
const T_REDUCE = table(
  ['Method', 'How it reduces friction', 'Example'],
  [
    ['Lubrication', 'An oil or grease film keeps the solid surfaces apart; sliding solid on solid is replaced by layers of liquid sliding over each other', 'Engine parts, cycle chain, door hinges'],
    ['Ball and roller bearings', 'Rolling contacts replace sliding contacts, and rolling friction is far smaller', 'Wheel hubs, fans, flywheels'],
    ['Streamlining', 'A smooth, tapering shape lets air or water flow past with little drag', 'Cars, trains, aircraft, boats'],
    ['Polishing and wheels', 'Smoother surfaces and wheels cut the sliding; polishing helps up to a limit', 'Skis, luggage trolleys'],
  ],
  'Table of ways to reduce friction: lubrication, ball and roller bearings, streamlining, polishing and wheels, each with how it works and examples',
);
export const TABLES = { T_KINDS, T_VIEWS, T_COEF, T_ROLL, T_LAWS, T_MEAS, T_PATHS, T_RES, T_SLOPE4, T_REP, T_REDUCE };

// ================================================================ DECK 1
export const deck1 = deck({
  part: 1,
  title: 'Friction — Part 1: Origin, kinds, laws and the friction graph',
  goals: [
    'Compare the classical (interlocking) and modern (adhesion, cold welding) views of friction',
    'Explain why static friction is self-adjusting, and distinguish limiting, kinetic and rolling friction',
    'State the laws of friction and use μs = f(max)/N and μk = fk/N',
    'Draw and interpret the graph of friction against applied force, and explain why friction is a non-conservative force',
  ],
  slides: [
    sl('title', 'Friction', {
      b: 'Part 1 — where friction comes from, how it behaves while a body is at rest and while it slides, and what its laws say.',
      v: V.contact,
      n: 'Why does a heavy almirah refuse to move when you push gently, then suddenly slide once you push harder? Why is it easier to keep it sliding than to start it? In this part we look at what friction really is at the surface, how it adjusts itself, and the laws and graph that describe it.',
    }),
    sl('concept', 'What is friction?', {
      b: '**Friction** is the force that opposes the relative motion, or the tendency of relative motion, between two surfaces in contact. It acts **along** the surfaces.',
      ul: [
        'We meet four kinds: static, limiting, kinetic (sliding) and rolling friction.',
        'Friction is useful in walking, braking and holding a nail, and harmful in wearing out machine parts and wasting energy as heat.',
        'It is a contact force, so it always comes together with a normal reaction $N$ from the same surface.',
      ],
      v: T_KINDS,
      n: 'Friction is the force that opposes the sliding, or the attempt to slide, of one surface over another. It acts along the surfaces. We shall meet four kinds: static, limiting, kinetic and rolling. Friction helps us walk and stop a vehicle, but it also wears out machines and turns useful energy into heat. It always comes together with the normal reaction of the same surface.',
    }),
    sl('concept', 'Classical view: interlocking', {
      b: 'Even a polished surface is rough when magnified. The **classical view** says friction arises because the hills of one surface **interlock** with the hollows of the other.',
      ul: [
        'To slide, one surface must be lifted over the hills of the other, or the hills must be sheared off.',
        'Pressing the surfaces together meshes the hills more deeply, so more force is needed: friction grows with $N$.',
        'The view explains why rough surfaces grip well, but it fails for very smooth, clean surfaces.',
      ],
      v: V.contact,
      n: 'Under a microscope even a polished surface looks like a range of hills and hollows. The classical view says that friction comes from these hills fitting into the hollows of the other surface. To slide, the hills must be lifted over each other or broken off. Pressing harder makes them mesh deeper, so friction grows with the normal reaction. But the view fails for very smooth surfaces.',
    }),
    sl('concept', 'Modern view: adhesion and cold welding', {
      b: 'The surfaces touch only at the **tips of the highest hills**, so the real area of contact is a tiny fraction of the apparent area.',
      ul: [
        'At these tips the pressure is enormous: the atoms of the two surfaces come within atomic range and **stick**, a process called **cold welding** (adhesion).',
        'Sliding means breaking these junctions again and again; **friction is the force needed to shear them**.',
        'A larger $N$ flattens more tips, so the real contact area grows in proportion to $N$. That is why friction is proportional to $N$ and nearly independent of the apparent area.',
        'Highly polished, clean surfaces can stick **more**, which the classical view cannot explain.',
      ],
      v: T_VIEWS,
      n: 'The modern view says the surfaces really touch only at the tips of the highest hills. There the pressure is so large that the atoms of the two surfaces stick together, which is called cold welding. Friction is the force needed to break these tiny welds. More pressing flattens more tips, so the real contact grows in proportion to the normal reaction, and that explains the proportionality.',
    }),
    sl('check', 'Quick check: the origin of friction', {
      b: 'Choose the correct option.',
      v: V.contact,
      chk: 'modern-mcq',
      n: 'Think about where the surfaces really touch.',
    }),
    sl('concept', 'Static friction is self-adjusting', {
      b: r`When a body is at rest and a force $F$ tries to move it, **static friction** $f_s$ appears and is equal and opposite to $F$, whatever $F$ is, up to a limit.`,
      ul: [
        r`$F = 0$: friction is zero. Push with $60$ N: friction is $60$ N. Push with $120$ N: friction is $120$ N. The body stays at rest because the two forces balance.`,
        r`Static friction **adjusts itself** to the applied force; it is **not** fixed at $\mu_s N$.`,
        r`The adjustment stops at a maximum value, the **limiting friction** $f_{\max}$. For this crate it is $${f(crate.fmax, 4)}$ N.`,
        r`Beyond that the junctions break, the crate slides and friction falls to the kinetic value $${f(crate.fk, 4)}$ N.`,
      ],
      v: V.selfadj,
      n: `Look at the four pictures of the crate. With no push there is no friction. With a push of sixty newtons, friction is exactly sixty newtons. With one hundred and twenty, friction is one hundred and twenty. Static friction adjusts itself to match the push, so the crate stays at rest. This continues up to a maximum, the limiting friction, ${N(crate.fmax, 4)} newtons here. Beyond it the crate slides.`,
    }),
    sl('concept', 'Limiting, kinetic friction and the coefficients', {
      b: 'The ratios of friction to the normal reaction are constants for a given pair of surfaces. They are **pure numbers** (no unit).',
      m: [r`\mu_s = \dfrac{f_{\max}}{N} \quad (\text{limiting, just about to slide}) \qquad \mu_k = \dfrac{f_k}{N} \quad (\text{sliding})`],
      ul: [
        r`Hence $f_{\max} = \mu_s N$ and $f_k = \mu_k N$. For any pair of surfaces $\mu_k < \mu_s$: it is easier to keep a body sliding than to start it.`,
        r`The inequality $f_s \le \mu_s N$ holds while the body is at rest; the equality holds **only at the point of sliding**.`,
        'Coefficients can exceed 1 for very sticky pairs such as rubber on dry concrete.',
      ],
      v: T_COEF,
      n: 'The coefficient of static friction is the limiting friction divided by the normal reaction. The coefficient of kinetic friction is the sliding friction divided by the normal reaction. Both are pure numbers, and the kinetic one is smaller. So the limiting friction is mu s times N, and the kinetic friction is mu k times N. The equality for static friction holds only at the instant before sliding begins.',
    }),
    sl('example', 'Worked example 1: pushing a crate', {
      b: r`A crate of mass $${crate.m}$ kg stands on a floor with $\mu_s = ${crate.mus}$ and $\mu_k = ${crate.muk}$. Taking $g = 9.8$ m s$^{-2}$, find the friction when it is pushed horizontally with (i) $${crate.F1}$ N, (ii) $${crate.F3}$ N, and the acceleration in case (ii).`,
      ul: [
        r`$N = mg = ${crate.m} \times 9.8 = ${f(crate.N, 4)}$ N, so $f_{\max} = \mu_s N = ${crate.mus} \times ${f(crate.N, 4)} = ${f(crate.fmax, 5)}$ N.`,
        r`(i) $${crate.F1}$ N is below the limit: the crate stays at rest and $f_s = ${crate.F1}$ N.`,
        r`(ii) $${crate.F3}$ N exceeds $${f(crate.fmax, 4)}$ N: the crate slides, $f_k = \mu_k N = ${crate.muk} \times ${f(crate.N, 4)} = ${f(crate.fk, 4)}$ N.`,
        r`$a = \dfrac{F - f_k}{m} = \dfrac{${crate.F3} - ${f(crate.fk, 4)}}{${crate.m}} = ${f(crate.a, 3)}$ m s$^{-2}$.`,
      ],
      v: V.selfadj,
      n: `The normal reaction is thirty five times nine point eight, which is ${N(crate.N)} newtons. The limiting friction is zero point four five times that, ${N(crate.fmax, 4)} newtons. A push of sixty newtons is below it, so the friction is sixty newtons and nothing moves. A push of one hundred and eighty newtons is above it, so the crate slides, with kinetic friction ${N(crate.fk, 4)} newtons. The acceleration is ${N(crate.a)} metres per second squared.`,
    }),
    sl('concept', 'The graph of friction against applied force', {
      b: 'Increase the applied force $F$ slowly from zero and plot the friction $f$.',
      ul: [
        r`**Static part** (a straight line of slope 1): $f = F$, as the crate stays at rest, up to the peak at $f_{\max} = ${f(crate.fmax, 4)}$ N.`,
        r`**The drop:** the instant sliding starts, friction falls from $f_{\max}$ to $f_k = ${f(crate.fk, 4)}$ N, because $\mu_k < \mu_s$.`,
        '**Kinetic part:** a nearly horizontal line: kinetic friction does not change much with the applied force or the speed.',
        'Beyond the peak the net force $F - f_k$ is not zero, so the body accelerates.',
      ],
      v: plotFric,
      n: 'Here is the graph. For small pushes the friction rises along a straight line at forty five degrees, because friction equals the push. The line ends at a peak, the limiting friction. At that point the body starts to slide, and the friction drops to the smaller kinetic value. After that the line is almost flat, because kinetic friction hardly depends on the applied force.',
    }),
    sl('check', 'Quick check: reading the graph', {
      b: 'Choose the correct option.',
      v: plotFric,
      chk: 'graph-mcq',
      n: 'What happens to the friction at the instant sliding starts?',
    }),
    sl('concept', 'Rolling friction', {
      b: '**Rolling friction** opposes the motion of a wheel or ball that rolls without slipping. It is **much smaller** than sliding friction.',
      ul: [
        'The point of the wheel touching the ground is momentarily at rest, so there is no sliding and no junctions are being sheared; the loss comes mainly from the slight flattening of wheel and road, and each flattening is quickly undone.',
        r`In order of size: $\text{rolling} < \text{kinetic} < \text{limiting static}$.`,
        'This is why we put heavy loads on wheels, and why a ball bearing beats a sliding bearing.',
      ],
      v: T_ROLL,
      n: 'Rolling friction acts on a wheel or ball that rolls without slipping. It is much smaller than sliding friction, because the part of the wheel touching the ground is momentarily at rest, so no junctions are torn apart, and the small losses come from the slight flattening of the wheel and the road. In order of size, rolling friction is least, then kinetic, then limiting static friction.',
    }),
    sl('concept', 'Laws of friction', {
      b: 'Experiments on blocks, spring balances and inclined planes give these laws, which hold well for ordinary dry surfaces.',
      v: T_LAWS,
      ul: [
        'Doubling the load on a block doubles $N$, and therefore doubles both $f_{\\max}$ and $f_k$.',
        'Turning a brick from its broad face to its narrow face leaves $f_{\\max}$ unchanged: the real contact area depends on $N$, not on the apparent area.',
        'The laws are approximate: they fail at very high speeds, very high pressures and for very smooth surfaces.',
      ],
      n: 'These are the laws of friction. Friction acts along the surface and opposes the motion or its tendency. Limiting friction is proportional to the normal reaction, does not depend on the apparent area of contact, and depends on the nature of the surfaces. Kinetic friction is also proportional to the normal reaction, nearly independent of speed and area, and smaller than the limiting value. The laws are approximate.',
    }),
    sl('check', 'Quick check: doubling the load', {
      b: 'Choose the correct option.',
      v: T_LAWS,
      chk: 'doubleN-mcq',
      n: 'Limiting friction is proportional to the normal reaction.',
    }),
    sl('example', 'Worked example 2: measuring the coefficients', {
      b: r`A wooden block of mass $${ex2.m1}$ kg on a horizontal board just starts to slide when the spring balance reads $${ex2.fslip}$ N, and keeps moving at constant speed at $${ex2.fsteady}$ N. Find $\mu_s$ and $\mu_k$. If a load of $${ex2.add}$ kg is placed on the block, what is the new limiting friction? ($g = 9.8$ m s$^{-2}$.)`,
      ul: [
        r`$N = ${ex2.m1} \times 9.8 = ${f(ex2.N1, 4)}$ N. $\mu_s = \dfrac{${ex2.fslip}}{${f(ex2.N1, 4)}} = ${f(ex2.mus, 3)}$ and $\mu_k = \dfrac{${ex2.fsteady}}{${f(ex2.N1, 4)}} = ${f(ex2.muk, 3)}$.`,
        r`With the load, $N = ${f(ex2.m1 + ex2.add, 2)} \times 9.8 = ${f(ex2.N2, 4)}$ N.`,
        r`New limiting friction $= \mu_s N = ${f(ex2.mus, 3)} \times ${f(ex2.N2, 4)} = ${f(ex2.f2, 3)}$ N: it grows in the ratio of the normal reactions.`,
      ],
      v: T_MEAS,
      n: `The normal reaction is ${W(ex2.m1)} times nine point eight, about ${N(ex2.N1, 4)} newtons. The static coefficient is twelve point five over that, about ${N(ex2.mus, 3)}, and the kinetic coefficient is nine point four over that, about ${N(ex2.muk, 3)}. Adding two kilograms raises the normal reaction to ${N(ex2.N2, 4)} newtons, so the limiting friction rises to ${N(ex2.f2, 3)} newtons.`,
    }),
    sl('concept', 'Friction is a non-conservative force', {
      b: 'A force is **conservative** if the work it does between two points is the same along every path, so the work around a closed path is zero. Friction fails this test.',
      ul: [
        r`Kinetic friction has the fixed magnitude $\mu_k N$ and **always opposes the displacement**, so the work it does is $-\mu_k N \times (\text{path length})$: it **grows with the path**.`,
        'The work around a closed path is **not zero**: it is negative, however the body returns.',
        'So no potential energy can be defined for friction. The mechanical energy lost is changed into **heat** at the surfaces.',
        'Gravity, by contrast, is conservative: the work depends only on the end points.',
      ],
      v: T_PATHS,
      n: 'A conservative force does the same work between two points along any path, and zero work around a closed path. Friction does not. Kinetic friction always opposes the motion, so the work it does is minus its magnitude times the length of the path travelled. A longer path means more work. Around a closed loop the work is not zero, so friction has no potential energy; the lost energy becomes heat.',
    }),
    sl('example', 'Worked example 3: two routes for a box', {
      b: r`A $${ex3.m}$ kg box is dragged slowly over a rough floor from A to B ($\mu_k = ${ex3.muk}$, $g = 9.8$ m s$^{-2}$). Find the work done against friction along (i) the straight $${ex3.straight}$ m path, (ii) the path round a corner of $${ex3.legs[0]}$ m and $${ex3.legs[1]}$ m, and (iii) a round trip A to B and back by the straight path.`,
      ul: [
        r`$f_k = \mu_k mg = ${ex3.muk} \times ${ex3.m} \times 9.8 = ${f(ex3.f, 3)}$ N, the same on every path.`,
        r`(i) $W = f_k \times ${ex3.straight} = ${f(ex3.W1, 3)}$ J. (ii) $W = f_k \times ${ex3.via} = ${f(ex3.W2, 3)}$ J.`,
        r`(iii) $W = f_k \times ${2 * ex3.straight} = ${f(ex3.Wround, 3)}$ J, **not zero**: friction is non-conservative.`,
        'The box is at the same height and the same place at the start and end of (iii), yet energy has been lost as heat.',
      ],
      v: T_PATHS,
      n: `Kinetic friction is zero point two five times twenty times nine point eight, which is ${N(ex3.f)} newtons, on every path. Along the straight ten metres, the work against it is ${N(ex3.W1)} joules. Round the corner, fourteen metres, it is ${N(ex3.W2)} joules. For the round trip it is ${N(ex3.Wround)} joules, not zero. The same start and end, yet different work, so friction is non-conservative.`,
    }),
    sl('check', 'Quick check: work done by friction', {
      b: 'Choose the correct option.',
      v: T_PATHS,
      chk: 'work-mcq',
      n: 'Friction always opposes the displacement.',
    }),
    sl('summary', 'Summary — Part 1', {
      b: 'Key results:',
      v: table(
        ['Idea', 'Result'],
        [
          ['Classical view', 'Friction from interlocking of hills and hollows'],
          ['Modern view', 'Adhesion (cold welding) at the few points of real contact'],
          ['Static friction', 'Self-adjusting: f = F while at rest, up to f(max) = μs N'],
          ['Kinetic friction', 'fk = μk N, with μk < μs; nearly constant'],
          ['Rolling friction', 'Much the smallest: rolling < kinetic < limiting static'],
          ['Graph of f against F', 'Line of slope 1 to the peak, drop, then nearly flat'],
          ['Work done by friction', 'Depends on the path: non-conservative; energy goes to heat'],
        ],
        'Summary table of the views of friction, static, kinetic and rolling friction, the friction graph and the non-conservative nature of friction',
      ),
      n: 'To sum up. Classically, friction comes from interlocking; in the modern view it comes from adhesion at the few points of real contact. Static friction adjusts itself up to the limiting value, mu s times N. Kinetic friction is mu k times N and smaller. Rolling friction is smallest. The graph rises along a straight line, drops at the peak, and then runs almost flat. Friction is non-conservative.',
    }),
    sl('exam-tips', 'Exam tips — Part 1', {
      ul: [
        'When asked for the friction on a body **at rest**, check first whether it is below the limit: then it equals the applied force (or the balancing component), **not** $\\mu_s N$.',
        'Use $\\mu_s N$ only when the body is just about to slide, and $\\mu_k N$ once it is sliding.',
        'In the graph, label the axes, the peak ($f_{\\max}$), the drop and the kinetic level, and show the first part at 45°.',
        'For the modern view write: real contact only at tips, atoms adhere (cold welding), friction is the force to break the junctions.',
        'Common mistakes: saying friction depends on the area of contact; saying $\\mu$ has a unit; saying friction always opposes **motion** (it opposes relative motion, and may help a walking person move forward).',
      ],
      v: T_COEF,
      n: 'When a body is at rest, check whether the push is below the limit; if so, friction equals the push, not mu s times N. Use mu s N only at the point of sliding, and mu k N while sliding. In the graph, label the peak, the drop and the kinetic level. For the modern view, mention real contact at tips, cold welding, and the force to break the junctions. Do not say friction depends on area.',
    }),
  ],
});

// ================================================================ DECK 2
const tanDn = Math.tan(rad(dn.th));
export const deck2 = deck({
  part: 2,
  title: 'Friction — Part 2: Inclined planes, the roller, angles of friction and repose, reducing friction',
  goals: [
    'Resolve forces on a block on a rough incline and find the force to move it up, hold it, or let it slide down',
    'Explain, with the normal reaction, why pulling a roller is easier than pushing it',
    'Define the angle of friction and the angle of repose, and show that tan α = μs and α = λ',
    'Describe how lubrication, ball bearings and streamlining reduce friction',
  ],
  slides: [
    sl('title', 'Friction on Slopes and Rollers', {
      b: 'Part 2 — a block on a rough incline, pulling and pushing a roller, the angles of friction and repose, and how to reduce friction.',
      v: V.up,
      n: 'How much force does it take to push a loaded trolley up a ramp? Will a box stay put on a tilted plank? Why does a gardener find it easier to pull a lawn roller than to push it? In this part we answer these questions with friction and the normal reaction, and finish with the angles of friction and repose and with ways of reducing friction.',
    }),
    sl('concept', 'Forces on a block on an incline', {
      b: r`A block of mass $m$ on a slope of angle $\theta$ is acted on by its weight $mg$ (down), the normal reaction $N$ (perpendicular to the slope) and friction (along the slope). Resolve the weight:`,
      m: [r`mg\sin\theta \ \text{along the slope} \qquad mg\cos\theta \ \text{perpendicular to the slope}`, r`N = mg\cos\theta \qquad f_{\max} = \mu N = \mu mg\cos\theta`],
      ul: [
        r`The normal reaction on a slope is **less than** $mg$, by the factor $\cos\theta$: do not write $N = mg$.`,
        'The angle between the weight and the perpendicular to the slope equals the slope angle $\\theta$.',
        'Friction acts **along the slope**, opposite to the motion (or its tendency).',
      ],
      v: T_RES,
      n: 'Resolve the weight into two parts. The part m g sine theta acts along the slope, down it. The part m g cosine theta presses the block into the slope and is balanced by the normal reaction. So on a slope the normal reaction is m g cosine theta, less than the weight. The greatest friction is mu times this. Friction acts along the slope, against the motion or its tendency.',
    }),
    sl('concept', 'A block at rest on a slope', {
      b: r`While the block is at rest, static friction balances the pull of the weight down the slope: $f_s = mg\sin\theta$. It can do so only while this does not exceed the limit $\mu_s mg\cos\theta$.`,
      ul: [
        r`Friction on a block at rest is $mg\sin\theta$, **not** $\mu_s mg\cos\theta$: it is self-adjusting, rising as the slope is tilted.`,
        r`The block begins to slide when $mg\sin\theta = \mu_s mg\cos\theta$, that is $\tan\theta = \mu_s$.`,
        r`The mass cancels, so heavy and light blocks slide at the same slope angle.`,
      ],
      v: plotRepose,
      n: 'While the block stays at rest, friction exactly balances the part of the weight along the slope, m g sine theta. As you tilt the plank, this rises, as the first curve shows, while the greatest friction available falls, as the second curve shows. Where the curves cross, the block is about to slide, and there tan theta equals mu s. The mass cancels, so it does not matter how heavy the block is.',
    }),
    sl('concept', 'Sliding down a rough incline', {
      b: r`When the block slides down, kinetic friction $\mu_k N$ acts **up** the slope. Along the slope, taking down as positive:`,
      m: [r`ma = mg\sin\theta - \mu_k mg\cos\theta`, r`\boxed{\,a = g\,(\sin\theta - \mu_k\cos\theta)\,}`],
      ul: [
        r`Perpendicular to the slope there is no acceleration, so $N = mg\cos\theta$.`,
        r`The mass cancels: $a$ does not depend on $m$. For a smooth slope $\mu_k = 0$ and $a = g\sin\theta$.`,
        r`If $\tan\theta \le \mu_k$, the expression is zero or negative: a block already sliding slows down and stops, or slides at constant speed if $\tan\theta = \mu_k$.`,
      ],
      v: V.down,
      n: 'When the block slides down, kinetic friction acts up the slope. Along the slope, the net force down is m g sine theta minus mu k m g cosine theta. Dividing by the mass, the acceleration is g times sine theta minus mu k cosine theta. The mass cancels. On a smooth slope it reduces to g sine theta. If the tangent of the angle equals mu k, the block slides at constant speed.',
    }),
    sl('check', 'Quick check: acceleration down a slope', {
      b: 'Choose the correct option.',
      v: V.down,
      chk: 'down-mcq',
      n: 'Use a equals g times sine theta minus mu k cosine theta.',
    }),
    sl('concept', 'Pushing a block up a rough incline', {
      b: r`To push the block **up** the slope with a force $P$ along the slope, friction acts **down** the slope (against the motion):`,
      m: [r`P - mg\sin\theta - \mu mg\cos\theta = ma`, r`\boxed{\,P = mg\,(\sin\theta + \mu\cos\theta) + ma\,}`],
      ul: [
        r`At **constant speed** $a = 0$ and $P = mg(\sin\theta + \mu\cos\theta)$, the figure with all four forces balanced.`,
        r`Up the slope $P$ must beat **both** the weight component and friction: more than for the same slope without friction, $mg\sin\theta$.`,
        'If the push is horizontal rather than along the slope, the components change and $N$ is no longer $mg\\cos\\theta$.',
      ],
      v: V.up,
      n: 'To push the block up, friction acts down the slope along with the weight component. At constant speed, the push must equal m g sine theta plus mu m g cosine theta. If the block also accelerates, add m a. The push has to beat both the weight component and friction, so it is larger than on a smooth slope. A push that is not along the slope changes the normal reaction.',
    }),
    sl('example', 'Worked example 4: loading a trolley up a ramp', {
      b: r`A $${up.m}$ kg loaded trolley is pushed up a ramp of $${up.th}^\circ$ ($\mu = ${up.mu}$) with a force along the ramp. Find the force for (i) constant speed and (ii) an acceleration of $${up.a}$ m s$^{-2}$. ($g = 9.8$ m s$^{-2}$.)`,
      ul: [
        r`$mg\sin\theta = ${f(up.W, 4)} \times \sin ${up.th}^\circ = ${f(up.along, 4)}$ N and $N = mg\cos\theta = ${f(up.N, 4)}$ N, so $f = \mu N = ${f(up.fric, 3)}$ N.`,
        r`(i) $P = ${f(up.along, 4)} + ${f(up.fric, 3)} = ${f(up.P, 4)}$ N.`,
        r`(ii) $P = ${f(up.P, 4)} + ma = ${f(up.P, 4)} + ${up.m} \times ${up.a} = ${f(up.Pa, 4)}$ N.`,
      ],
      v: V.up,
      n: `The weight component along the ramp is ${N(up.along, 4)} newtons. The normal reaction is ${N(up.N, 4)} newtons, so friction is ${N(up.fric, 3)} newtons. At constant speed the push is the sum, ${N(up.P, 4)} newtons. To accelerate at half a metre per second squared, add forty times zero point five, which is twenty newtons, giving ${N(up.Pa, 4)} newtons.`,
    }),
    sl('example', 'Worked example 5: sliding down', {
      b: r`A $${dn.m}$ kg block is released from rest on a $${dn.th}^\circ$ slope ($\mu_k = ${dn.mu}$, $g = 9.8$ m s$^{-2}$). Find its acceleration, the time to slide $${dn.s}$ m and its speed after sliding $${dn.s}$ m.`,
      ul: [
        r`$a = g(\sin ${dn.th}^\circ - ${dn.mu}\cos ${dn.th}^\circ) = 9.8(${f(Math.sin(rad(dn.th)), 4)} - ${f(dn.mu * Math.cos(rad(dn.th)), 4)}) = ${f(dn.a, 4)}$ m s$^{-2}$.`,
        r`Check with forces: $mg\sin\theta - \mu N = ${f(dn.along, 4)} - ${f(dn.fric, 3)} = ${f(dn.net, 3)}$ N, and $\dfrac{${f(dn.net, 3)}}{${dn.m}} = ${f(dn.a, 4)}$ m s$^{-2}$.`,
        r`$s = \tfrac{1}{2}at^2 \Rightarrow t = \sqrt{\dfrac{2 \times ${dn.s}}{${f(dn.a, 4)}}} = ${f(dn.t, 3)}$ s.`,
        r`$v = \sqrt{2as} = \sqrt{2 \times ${f(dn.a, 4)} \times ${dn.s}} = ${f(dn.v, 3)}$ m s$^{-1}$.`,
      ],
      v: V.down,
      n: `The acceleration is g times sine of thirty five degrees minus zero point three times cosine of thirty five degrees, which is ${N(dn.a, 4)} metres per second squared. Checking with forces, the net force down the slope is ${N(dn.net, 3)} newtons, and dividing by twenty five gives the same. The block takes ${N(dn.t, 3)} seconds to slide six metres and reaches ${N(dn.v, 3)} metres per second.`,
    }),
    sl('concept', 'Holding a block, pushing it down: the four cases', {
      b: 'The same three forces give every case. Always ask which way the block moves, or **tends** to move, and put friction against it.',
      ul: [
        'Block **at rest** and tending to slide down (when $\\tan\\theta > \\mu_s$): the least force up the slope to hold it is $mg(\\sin\\theta - \\mu_s\\cos\\theta)$.',
        'Block that would **not** slide by itself ($\\tan\\theta < \\mu$): to push it **down** at constant speed we need $P = mg(\\mu\\cos\\theta - \\sin\\theta)$ down the slope.',
        'Friction is large enough to hold a block exactly when $\\tan\\theta \\le \\mu_s$.',
      ],
      v: T_SLOPE4,
      n: 'The same three forces cover every case. Decide which way the block moves, or tends to move, and put friction against that. If the slope is steep and the block would slide, the least force to hold it up the slope is m g sine theta minus mu cosine theta times m g. If the block would not slide by itself, pushing it down at constant speed needs mu cosine theta minus sine theta times m g.',
    }),
    sl('concept', 'Pulling or pushing a roller', {
      b: r`A roller of weight $W$ is moved at constant speed by a force $F$ along its handle, at an angle $\varphi$ to the ground. Friction is $f = \mu N$.`,
      ul: [
        r`**Pulling:** the vertical part of $F$ points **up**: $N = W - F\sin\varphi$. The normal reaction **falls**, so friction falls.`,
        r`**Pushing:** the vertical part of $F$ points **down**: $N = W + F\sin\varphi$. The normal reaction **rises**, so friction rises.`,
        r`Horizontally $F\cos\varphi = \mu N$ in both cases.`,
        `For the ${rl.m} kg roller, μ = ${rl.mu}, φ = ${rl.phi}°: pulling needs ${f(rl.pull, 4)} N, pushing needs ${f(rl.push, 4)} N.`,
      ],
      v: V.roller,
      n: `Look at the free body diagrams. When you pull the roller along its handle, part of the force points upward, so the roller is partly lifted and the normal reaction falls. When you push it, part of the force points downward, so the roller is pressed harder into the ground and the normal reaction rises. Friction follows the normal reaction. For this roller, pulling needs ${N(rl.pull, 3)} newtons, but pushing needs ${N(rl.push, 3)}.`,
    }),
    sl('concept', 'Deriving the pull and the push', {
      b: r`Constant speed: horizontally $F\cos\varphi = \mu N$; vertically the normal reaction follows from the force balance.`,
      m: [r`\text{Pull:}\ \ F\cos\varphi = \mu(W - F\sin\varphi) \ \Rightarrow\ \boxed{F = \dfrac{\mu W}{\cos\varphi + \mu\sin\varphi}}`, r`\text{Push:}\ \ F\cos\varphi = \mu(W + F\sin\varphi) \ \Rightarrow\ \boxed{F = \dfrac{\mu W}{\cos\varphi - \mu\sin\varphi}}`],
      ul: [
        r`The pull has the **larger denominator**, so it is **smaller**. At $\varphi = 0$ both equal $\mu W$.`,
        r`The push grows without limit as $\cos\varphi \to \mu\sin\varphi$: a steep handle makes pushing very hard.`,
        'The pulling force falls a little at first and is least near an angle whose tangent is $\\mu$ (the angle of friction), then rises.',
      ],
      v: plotRoller,
      n: 'Write the horizontal and vertical balance. For pulling, F cosine phi equals mu times W minus F sine phi, so F is mu W over cosine phi plus mu sine phi. For pushing the sign changes: F is mu W over cosine phi minus mu sine phi. The pulling denominator is larger, so the pull is smaller. At zero angle both are equal. As the graph shows, the push climbs steeply with the angle.',
    }),
    sl('example', 'Worked example 6: the garden roller', {
      b: r`A garden roller of mass $${rl.m}$ kg is moved at constant speed over a lawn ($\mu = ${rl.mu}$, $g = 9.8$ m s$^{-2}$) with its handle at $${rl.phi}^\circ$ to the ground. Find the force needed to pull it and to push it, and the normal reaction in each case.`,
      ul: [
        r`$W = ${rl.m} \times 9.8 = ${f(rl.W, 4)}$ N, $\mu W = ${f(rl.mu * rl.W, 4)}$ N, $\cos ${rl.phi}^\circ = ${f(Math.cos(rad(rl.phi)), 4)}$, $\sin ${rl.phi}^\circ = ${f(Math.sin(rad(rl.phi)), 4)}$.`,
        r`Pull: $F = \dfrac{${f(rl.mu * rl.W, 4)}}{${f(Math.cos(rad(rl.phi)), 4)} + ${rl.mu} \times ${f(Math.sin(rad(rl.phi)), 4)}} = ${f(rl.pull, 4)}$ N; $N = W - F\sin\varphi = ${f(rl.Npull, 4)}$ N.`,
        r`Push: $F = \dfrac{${f(rl.mu * rl.W, 4)}}{${f(Math.cos(rad(rl.phi)), 4)} - ${rl.mu} \times ${f(Math.sin(rad(rl.phi)), 4)}} = ${f(rl.push, 4)}$ N; $N = W + F\sin\varphi = ${f(rl.Npush, 4)}$ N.`,
        `Pushing needs ${f(rl.ratio, 3)} times the force needed for pulling.`,
      ],
      v: V.roller,
      n: `The weight is ${N(rl.W)} newtons. Pulling at forty degrees needs ${N(rl.pull, 3)} newtons, and the normal reaction falls to ${N(rl.Npull, 3)}. Pushing needs ${N(rl.push, 3)} newtons, and the normal reaction rises to ${N(rl.Npush, 3)}. So pushing takes about one point seven times as much force as pulling.`,
    }),
    sl('check', 'Quick check: pull or push', {
      b: 'Choose the correct option.',
      v: V.roller,
      chk: 'pull-mcq',
      n: 'Compare the normal reaction in the two cases.',
    }),
    sl('concept', 'Angle of friction', {
      b: r`The surface exerts on the block a normal reaction $N$ and a friction $f$. Their resultant $R$ is the **total contact force**. When friction is **limiting**, $R$ makes the largest angle with the normal: the **angle of friction** $\lambda$.`,
      m: [r`\tan\lambda = \dfrac{f_{\max}}{N} = \dfrac{\mu_s N}{N} \quad\Rightarrow\quad \boxed{\,\tan\lambda = \mu_s\,}`],
      ul: [
        r`The **angle of friction** $\lambda$ is the angle between the normal reaction and the resultant of the normal reaction and the limiting friction.`,
        `For μs = ${AN.mus} and a ${AN.m} kg block: N = ${f(AN.N, 3)} N, f(max) = ${f(AN.fmax, 3)} N, R = ${f(AN.R, 4)} N and λ = ${f(lam, 4)}°.`,
        'A larger $\\mu_s$ means a larger angle of friction.',
      ],
      v: V.angles,
      n: `The surface pushes on the block with two forces at right angles: the normal reaction and the friction. Their resultant is the total contact force. When friction is at its limit, this resultant is tilted furthest from the normal, by an angle called the angle of friction. The tangent of that angle is the limiting friction over the normal reaction, which is mu s. Here mu s is a half, so the angle is ${N(lam, 3)} degrees.`,
    }),
    sl('concept', 'Angle of repose, and why it equals the angle of friction', {
      b: r`The **angle of repose** $\alpha$ is the steepest slope at which a body can rest on an inclined plane without sliding down; at $\alpha$ it is just about to slide.`,
      m: [r`\text{Along the slope: } mg\sin\alpha = f_{\max} = \mu_s N \qquad \text{Perpendicular: } N = mg\cos\alpha`, r`\dfrac{mg\sin\alpha}{mg\cos\alpha} = \mu_s \ \Rightarrow\ \boxed{\,\tan\alpha = \mu_s = \tan\lambda \ \Rightarrow\ \alpha = \lambda\,}`],
      ul: [
        r`Because $N$ and $f_{\max}$ together balance the weight, their resultant $R$ is **vertical** and equal to $mg$: the angle between $R$ and $N$ is then the slope angle, so $\lambda = \alpha$.`,
        'Measuring $\\alpha$ on a tilting plank is a simple way to find $\\mu_s$. The result is independent of the mass of the block.',
        'Heaps of sand or grain have an angle of repose, set by the friction between the grains.',
      ],
      v: V.repose,
      n: 'At the angle of repose, friction is just at its limit. Along the slope, m g sine alpha equals mu s N, and perpendicular to the slope N is m g cosine alpha. Dividing, tan alpha equals mu s. But tan lambda is also mu s, so the angle of repose equals the angle of friction. The figure shows why: the normal reaction and friction together balance the weight, so their resultant is vertical.',
    }),
    sl('check', 'Quick check: the angle of repose', {
      b: 'Choose the correct option.',
      v: V.repose,
      chk: 'repose-mcq',
      n: 'Use tan alpha equals mu s.',
    }),
    sl('example', 'Worked example 7: tilting a plank', {
      b: r`A box is placed on a plank which is slowly tilted. In three trials it begins to slip at $${f(ex4.trials[0], 3)}^\circ$, $${f(ex4.trials[1], 3)}^\circ$ and $${f(ex4.trials[2], 3)}^\circ$. Find $\mu_s$ and the angle of friction. Would a box of twice the mass slip at a different angle?`,
      ul: [
        r`Mean angle of repose $\alpha = \dfrac{${f(ex4.trials[0], 3)} + ${f(ex4.trials[1], 3)} + ${f(ex4.trials[2], 3)}}{3} = ${f(ex4.mean, 3)}^\circ$.`,
        r`$\mu_s = \tan\alpha = \tan ${f(ex4.mean, 3)}^\circ = ${f(ex4.mus, 3)}$, and the angle of friction $\lambda = \alpha = ${f(ex4.mean, 3)}^\circ$.`,
        r`No: $\tan\alpha = \mu_s$ does not contain the mass; both $mg\sin\alpha$ and $\mu_s mg\cos\alpha$ are doubled.`,
      ],
      v: T_REP,
      n: `The mean of the three angles is ${N(ex4.mean, 3)} degrees. The coefficient of static friction is the tangent of that angle, ${N(ex4.mus, 3)}, and the angle of friction is the same ${N(ex4.mean, 3)} degrees. A box of twice the mass slips at the same angle, because the mass cancels from the equation: the weight component and the greatest friction both double.`,
    }),
    sl('concept', 'Reducing friction', {
      b: 'In machines and vehicles friction wastes energy and wears parts. We reduce it by these methods.',
      ul: [
        '**Lubrication:** an oil or grease film separates the surfaces; the friction is that of liquid layers sliding over each other, far smaller than solid on solid.',
        '**Ball bearings and rollers:** rolling replaces sliding, so rolling friction (the smallest kind) applies.',
        '**Streamlining:** a smooth tapering shape lets air or water flow past easily, cutting the fluid drag on vehicles, aircraft and boats.',
        'Where grip is needed we do the opposite: rough tyre treads, shoe soles and sand on icy roads **increase** friction.',
      ],
      v: T_REDUCE,
      n: 'In machines and vehicles, friction wastes energy and wears parts away, so we reduce it. Lubrication puts a film of oil or grease between the surfaces, so liquid layers slide instead of solid on solid. Ball bearings replace sliding by rolling, which has far less friction. Streamlining gives vehicles a smooth tapering shape that cuts air or water drag. Where we need grip, we do the opposite and increase friction.',
    }),
    sl('concept', 'Ball bearings: rolling instead of sliding', {
      b: 'A ball bearing holds a shaft in a fixed housing with steel balls between two rings. When the shaft turns, the balls **roll**.',
      ul: [
        'The contact between each ball and a ring is rolling contact, so the friction is a small fraction of that of a plain sliding bearing.',
        'Oil or grease inside the bearing lowers the friction further and keeps out dirt.',
        'Heavy loads are carried by many balls at once, and the balls are held apart by a cage so that they do not rub on one another.',
      ],
      v: V.bearing,
      n: 'A ball bearing keeps a turning shaft inside a fixed housing using steel balls between two rings. When the shaft turns, the balls roll, so the contacts are rolling contacts rather than sliding ones. The friction is only a small fraction of that in a plain bearing. A little grease reduces it still further. Many balls share the load, and a cage keeps them from rubbing against each other.',
    }),
    sl('check', 'Quick check: lubrication', {
      b: 'Choose the correct option.',
      v: T_REDUCE,
      chk: 'lube-mcq',
      n: 'What replaces solid friction when a lubricant is used?',
    }),
    sl('summary', 'Summary — Part 2', {
      b: 'Key results:',
      v: table(
        ['Idea', 'Result'],
        [
          ['On a slope', 'N = mg cos θ; weight component along the slope mg sin θ'],
          ['Sliding down', 'a = g(sin θ − μk cos θ)'],
          ['Pushed up (const. speed)', 'P = mg(sin θ + μ cos θ)'],
          ['Pulling a roller', 'F = μW / (cos φ + μ sin φ): N = W − F sin φ, less friction'],
          ['Pushing a roller', 'F = μW / (cos φ − μ sin φ): N = W + F sin φ, more friction'],
          ['Angle of friction', 'tan λ = μs'],
          ['Angle of repose', 'tan α = μs, so α = λ'],
          ['Reducing friction', 'Lubrication, ball bearings (rolling), streamlining'],
        ],
        'Summary table of the results for slopes, rollers, the angles of friction and repose and ways of reducing friction',
      ),
      n: 'To sum up. On a slope the normal reaction is m g cosine theta. Sliding down, the acceleration is g times sine theta minus mu k cosine theta. Pushing up at constant speed needs m g times sine theta plus mu cosine theta. Pulling a roller lowers the normal reaction and pushing raises it, so pulling is easier. The tangent of the angle of friction and of the angle of repose both equal mu s. Lubrication, bearings and streamlining reduce friction.',
    }),
    sl('exam-tips', 'Exam tips — Part 2', {
      ul: [
        'Draw the free-body diagram first: weight (vertical), $N$ (perpendicular to the surface), friction (along it, **against** the motion or its tendency), applied force.',
        'Resolve **along** and **perpendicular to** the slope. Write $N = mg\\cos\\theta$ only for a block on a slope with no other force having a perpendicular component.',
        'For the roller state clearly: pulling gives $N = W - F\\sin\\varphi$, pushing gives $N = W + F\\sin\\varphi$.',
        'For $\\tan\\alpha = \\mu_s$ show both equations and the division; then say $\\alpha = \\lambda$ because $\\tan\\lambda = \\mu_s$ too.',
        'Common mistakes: friction up the slope when pushing up; using $\\mu_s mg\\cos\\theta$ for a block at rest; forgetting that the mass cancels in $a$ and in $\\alpha$.',
      ],
      v: T_RES,
      n: 'Always begin with a free body diagram: weight, normal reaction, friction against the motion or its tendency, and the applied force. Resolve along and perpendicular to the slope. For the roller, say that pulling lowers the normal reaction and pushing raises it. To show tan alpha equals mu s, write both equations and divide. Common mistakes are friction pointing the wrong way, and forgetting that the mass cancels.',
    }),
  ],
});
