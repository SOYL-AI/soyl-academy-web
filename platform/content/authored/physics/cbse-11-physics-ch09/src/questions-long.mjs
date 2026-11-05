// ch09 question bank, part 4: long answers (5 marks) and case-based items (4 marks: 1 + 1 + 2 with an either/or part (c)).
import { mk, add, r, dec, sci, near } from '../../cbse-11-physics-ch01/src/lib.mjs';
import { g, RHO, RHO_HG, PATM, integ, root, settleSpeed, capHeight } from './phys.mjs';

const { mcq, num, short, long, part } = mk;
const v3 = (x) => Number(dec(x, 3));
const A = (rad) => Math.PI * rad * rad;

// ================================================================ long answers
const dv = { rho: 1030, h: 25 };
dv.gauge = dv.rho * g * dv.h;
dv.abs = PATM + dv.gauge;
dv.ratio = dv.abs / PATM;
add('depth-long', long({
  stem: '(a) Derive the expression P = P₀ + ρgh for the pressure at a depth h below the free surface of a liquid of density ρ at rest. (b) A diver works 25 m below the surface of sea water of density 1030 kg m⁻³ (g = 9.8 m s⁻², atmospheric pressure 1.013 × 10⁵ Pa). Find the gauge pressure and the absolute pressure on her, and the absolute pressure as a multiple of the atmospheric pressure. (c) Explain why the height of a mercury barometer column does not depend on the width of the tube.',
  model: r`(a) Imagine a vertical cylinder of liquid of base area $A$ stretching from the surface to depth $h$. It is in equilibrium, so the upward force of the liquid below on its base equals the downward force of the atmosphere on its top plus its weight: $PA = P_0 A + \rho A h g$. Hence $P = P_0 + \rho g h$.

(b) Gauge pressure $= \rho g h = 1030 \times 9.8 \times 25 = ${dv.gauge}$ Pa. Absolute pressure $= ${PATM} + ${dv.gauge} = ${dv.abs}$ Pa, which is $\dfrac{${dv.abs}}{${PATM}} = ${dec(dv.ratio, 3)}$ times atmospheric pressure.

(c) The column is held up by the atmosphere, so its pressure at the level of the trough surface must equal $P_0$: $\rho g h = P_0$, so $h = P_0/\rho g$. This involves only $P_0$, $\rho$ and $g$, not the area of the tube: a wider tube holds more mercury, but its weight is spread over a proportionally larger area.`,
  sol: 'Derivation by equilibrium of a column; 252 350 Pa and 353 650 Pa, 3.49 atm; h = P₀/ρg independent of width.',
  scheme: [['Equilibrium of a liquid column: PA = P₀A + ρAhg', 1], ['P = P₀ + ρgh', 1], [`Gauge pressure ρgh = ${dv.gauge} Pa`, 1], [`Absolute pressure = ${dv.abs} Pa = ${dec(dv.ratio, 3)} × atmospheric`, 1], ['h = P₀/ρg is independent of the tube width (weight and area both scale)', 1]],
  d: 3, c: 'application', t: [1], wl: null,
}), () => near(dv.gauge, 252350, 1e-9) && near(dv.abs, 353650, 1e-9) && near(PATM + integ(() => dv.rho * g, 0, dv.h), dv.abs, 1e-6) || 'dv');
const jk = { m: 800, D2: 0.10, D1: 0.02, up: 0.02 };
jk.W = Number((jk.m * g).toPrecision(8));
jk.k = (jk.D2 / jk.D1) ** 2;
jk.F1 = jk.W / jk.k;
jk.d1 = jk.k * jk.up;
jk.work = jk.W * jk.up;
add('jack-long', long({
  stem: '(a) State Pascal’s law. (b) A hydraulic jack has a wide piston and a narrow piston. Derive the relation between the forces on them, and show that the narrow piston must move farther than the wide one and that the work done on both pistons is equal. (c) In a garage jack the pistons have diameters 10 cm and 2.0 cm. Find the force on the narrow piston needed to hold a car of mass 800 kg on the wide piston (g = 9.8 m s⁻²), and the distance the narrow piston moves when the car is raised by 2.0 cm.',
  model: r`(a) A pressure change applied to an enclosed fluid is transmitted undiminished to every point of the fluid and to the walls of the vessel.

(b) The pressure is the same on both pistons: $\dfrac{F_1}{A_1} = \dfrac{F_2}{A_2}$, so $F_2 = F_1\dfrac{A_2}{A_1}$, which is larger than $F_1$ when $A_2 > A_1$. The liquid is incompressible, so the volume displaced is equal: $A_1 d_1 = A_2 d_2$, i.e. $d_1 = d_2 A_2/A_1$: the narrow piston moves farther. Then $F_1 d_1 = F_2 d_2$: the work done on both pistons is equal, so the jack multiplies force, not energy.

(c) Area ratio $= (10/2.0)^2 = ${jk.k}$. $W = 800 \times 9.8 = ${jk.W}$ N, so $F_1 = \dfrac{${jk.W}}{${jk.k}} = ${jk.F1}$ N. The narrow piston moves $d_1 = ${jk.k} \times 2.0 = ${jk.d1 * 100}$ cm. (Check: work $= ${jk.F1} \times ${jk.d1} = ${dec(jk.work, 4)}$ J $= ${jk.W} \times 0.020$ J.)`,
  sol: 'Pascal’s law; F₂ = F₁A₂/A₁, A₁d₁ = A₂d₂, work equal; 313.6 N and 50 cm.',
  scheme: [['Statement of Pascal’s law', 1], ['F₁/A₁ = F₂/A₂, so F₂ = F₁A₂/A₁', 1], ['A₁d₁ = A₂d₂ and F₁d₁ = F₂d₂ (work equal)', 1], [`F₁ = ${jk.W}/${jk.k} = ${jk.F1} N`, 1], [`d₁ = ${jk.k} × 2.0 cm = ${jk.d1 * 100} cm`, 1]],
  d: 3, c: 'application', t: [1], wl: null,
}), () => near(jk.F1 * jk.d1, jk.work, 1e-9) && near((jk.W / A(jk.D2 / 2)) * A(jk.D1 / 2), jk.F1, 1e-9) && jk.d1 === 0.5 || 'jk');
const bl = { H: 1.8, h1: 0.45, h2: 1.35 };
bl.v1 = Math.sqrt(2 * g * bl.h1);
bl.v2 = Math.sqrt(2 * g * bl.h2);
bl.t1 = Math.sqrt((2 * (bl.H - bl.h1)) / g);
bl.t2 = Math.sqrt((2 * (bl.H - bl.h2)) / g);
bl.R1 = bl.v1 * bl.t1;
bl.R2 = bl.v2 * bl.t2;
add('bern-long', long({
  stem: '(a) State Bernoulli’s principle and the conditions under which it applies. (b) Use it to derive the speed of efflux √(2gh) of a liquid from a small hole at depth h below the open surface of a large tank. (c) An open tank 1.8 m deep stands on level ground. Two small holes are made 0.45 m and 1.35 m below the water surface. Find the speed of the water leaving each hole and show that both jets reach the ground at the same distance from the tank (g = 9.8 m s⁻²).',
  model: r`(a) For steady flow of an incompressible, non-viscous fluid, $P + \tfrac{1}{2}\rho v^2 + \rho g h$ is constant along a streamline. It needs steady, non-turbulent flow, negligible viscosity and an incompressible fluid.

(b) Apply it between the surface (pressure $P_0$, speed $\approx 0$) and the hole (pressure $P_0$, speed $v$, a depth $h$ lower): $P_0 + \rho g h = P_0 + \tfrac{1}{2}\rho v^2$, so $v = \sqrt{2gh}$.

(c) Upper hole: $v_1 = \sqrt{2 \times 9.8 \times 0.45} = ${dec(bl.v1, 4)}$ m s$^{-1}$; it is ${dec(bl.H - bl.h1, 3)} m above the ground, so $t_1 = \sqrt{\dfrac{2 \times ${dec(bl.H - bl.h1, 3)}}{9.8}} = ${dec(bl.t1, 4)}$ s and $R_1 = v_1 t_1 = ${dec(bl.R1, 4)}$ m. Lower hole: $v_2 = \sqrt{2 \times 9.8 \times 1.35} = ${dec(bl.v2, 4)}$ m s$^{-1}$, $t_2 = \sqrt{\dfrac{2 \times ${dec(bl.H - bl.h2, 3)}}{9.8}} = ${dec(bl.t2, 4)}$ s and $R_2 = ${dec(bl.R2, 4)}$ m. The ranges are equal (both $2\sqrt{h(H-h)}$): the faster jet falls through less height.`,
  sol: 'Bernoulli; v = √(2gh); 2.97 m/s and 5.14 m/s; both ranges 1.559 m.',
  scheme: [['Statement and conditions of Bernoulli’s principle', 1], ['v = √(2gh) from P₀ + ρgh = P₀ + ½ρv²', 1], [`v₁ = ${dec(bl.v1, 4)} m s⁻¹ and v₂ = ${dec(bl.v2, 4)} m s⁻¹`, 1], [`Fall times ${dec(bl.t1, 4)} s and ${dec(bl.t2, 4)} s`, 1], [`Both ranges = ${dec(bl.R1, 4)} m: equal`, 1]],
  d: 4, c: 'application', t: [2], wl: null,
}), () => near(bl.R1, bl.R2, 1e-9) && near(bl.R1, 2 * Math.sqrt(bl.h1 * bl.h2), 1e-9) || 'bl');
const ls = { r: 0.30e-3, rs: 11300, sg: 1260, eta: 1.4 };
ls.vt = (2 * ls.r ** 2 * (ls.rs - ls.sg) * g) / (9 * ls.eta);
ls.Re = (ls.sg * ls.vt * 2 * ls.r) / ls.eta;
ls.vt2 = ls.vt * 4;
add('stokes-long', long({
  stem: '(a) State Stokes’ law. (b) A sphere of radius r and density ρ falls through a fluid of density σ and viscosity η. By balancing the forces at terminal speed, derive the expression for the terminal speed v_t. (c) A lead pellet of radius 0.30 mm and density 11 300 kg m⁻³ falls in glycerine of density 1260 kg m⁻³ and viscosity 1.4 Pa s (g = 9.8 m s⁻²). Find its terminal speed, and the terminal speed of a pellet of twice the radius.',
  model: r`(a) The viscous drag on a small sphere of radius $r$ moving at speed $v$ through a fluid of viscosity $\eta$ is $F = 6\pi\eta r v$.

(b) The forces are the weight $\tfrac{4}{3}\pi r^3\rho g$ down, and the upthrust $\tfrac{4}{3}\pi r^3\sigma g$ and the drag $6\pi\eta r v$ up. At terminal speed the net force is zero: $\tfrac{4}{3}\pi r^3(\rho - \sigma)g = 6\pi\eta r v_t$, so $v_t = \dfrac{2r^2(\rho - \sigma)g}{9\eta}$.

(c) $v_t = \dfrac{2 \times (0.30 \times 10^{-3})^2 \times ${ls.rs - ls.sg} \times 9.8}{9 \times 1.4} = ${dec(ls.vt * 1000, 3)} \times 10^{-3}$ m s$^{-1}$ $= ${dec(ls.vt * 1000, 3)}$ mm s$^{-1}$ (Reynolds number $\approx ${dec(ls.Re, 2)}$, so Stokes’ law is valid). Since $v_t \propto r^2$, a pellet of twice the radius has $v_t = 4 \times ${dec(ls.vt * 1000, 3)} = ${dec(ls.vt2 * 1000, 3)}$ mm s$^{-1}$.`,
  sol: 'F = 6πηrv; force balance gives v_t; 1.41 mm/s, then 5.62 mm/s.',
  scheme: [['Stokes’ law F = 6πηrv', 1], ['(4/3)πr³(ρ − σ)g = 6πηrv_t', 1], ['v_t = 2r²(ρ − σ)g/(9η)', 1], [`v_t = ${dec(ls.vt * 1000, 3)} mm s⁻¹ for r = 0.30 mm`, 1], [`Twice the radius: 4 × ${dec(ls.vt * 1000, 3)} = ${dec(ls.vt2 * 1000, 3)} mm s⁻¹`, 1]],
  d: 3, c: 'application', t: [3], wl: null,
}), () => near(settleSpeed(ls.r, ls.rs, ls.sg, ls.eta), ls.vt, 1e-4) && near(settleSpeed(2 * ls.r, ls.rs, ls.sg, ls.eta), ls.vt2, 1e-4) || 'ls');
const cl = { S: 0.026, rho: 800, r1: 0.25e-3, r2: 5.0e-3 };
cl.h1 = (2 * cl.S) / (cl.rho * g * cl.r1);
cl.h2 = (2 * cl.S) / (cl.rho * g * cl.r2);
add('cap-long', long({
  stem: '(a) Define angle of contact. (b) By balancing the forces on the liquid column in a narrow tube of radius r, derive the height of capillary rise h = 2S cos θ/(ρgr). (c) Kerosene (surface tension 0.026 N m⁻¹, density 800 kg m⁻³, θ ≈ 0°) is drawn up the glass tube of a lamp wick holder. Find the rise in a tube of radius 0.25 mm and in a tube of radius 5.0 mm (g = 9.8 m s⁻²), and comment on the second answer.',
  model: r`(a) The angle of contact is the angle between the solid surface and the tangent to the liquid surface at the line of contact, measured inside the liquid.

(b) The surface tension acts along the circle of contact, of length $2\pi r$, at angle $\theta$ to the wall, so its upward component is $2\pi r S\cos\theta$. It supports the weight of the column, $\pi r^2 h\rho g$. Equating, $h = \dfrac{2S\cos\theta}{\rho g r}$.

(c) With $\cos\theta = 1$: for $r = 0.25$ mm, $h = \dfrac{2 \times 0.026}{800 \times 9.8 \times 0.25 \times 10^{-3}} = ${dec(cl.h1 * 100, 3)}$ cm. For $r = 5.0$ mm, $h = ${dec(cl.h2 * 1000, 3)}$ mm. The rise falls as $1/r$: in the wide tube it is only about a millimetre, too small to notice.`,
  sol: 'Definition; force balance; 2.65 cm and 1.33 mm.',
  scheme: [['Definition of the angle of contact', 1], ['Upward force 2πrS cos θ balances weight πr²hρg', 1], ['h = 2S cos θ/(ρ g r)', 1], [`r = 0.25 mm: h = ${dec(cl.h1 * 100, 3)} cm`, 1], [`r = 5.0 mm: h = ${dec(cl.h2 * 1000, 3)} mm, negligible because h ∝ 1/r`, 1]],
  d: 4, c: 'application', t: [4], wl: null,
}), () => near(capHeight(cl.S, 0, cl.rho, cl.r1) * 100, cl.h1 * 100, 1e-5) && near(capHeight(cl.S, 0, cl.rho, cl.r2) * 1000, cl.h2 * 1000, 1e-5) || 'cl');

// ================================================================ case-based items
const tw = { h: 30 };
tw.gauge = RHO * g * tw.h;
tw.abs = PATM + tw.gauge;
tw.v = Math.sqrt(2 * g * tw.h);
tw.v4 = Math.sqrt(2 * g * 4 * tw.h);
add('tower-case', mk.case({
  passage: 'A village in the hills near Dehradun gets its water from a large open tank on a hill. The water surface in the tank is 30 m above a tap in the village. Take ρ = 1000 kg m⁻³, g = 9.8 m s⁻² and atmospheric pressure 1.013 × 10⁵ Pa. The tap is closed at first and then opened fully.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'With the tap closed, the gauge pressure of the water at the tap is',
      right: `${dec(tw.gauge / 1000, 3)} kPa`,
      wrong: [`${dec(tw.abs / 1000, 3)} kPa`, `${dec((2 * tw.gauge) / 1000, 3)} kPa`, `${dec(tw.gauge / 10000, 3)} kPa`],
      sol: `Gauge pressure = ρgh = 1000 × 9.8 × 30 = ${tw.gauge} Pa = ${dec(tw.gauge / 1000, 3)} kPa — option (@K). Option (@1) is the absolute pressure.`,
      d: 1, c: 'understanding', t: [1],
    })),
    part('b', num({
      stem: 'Ignoring friction and turbulence, find the speed of the water leaving the open tap, in m s⁻¹ (3 significant figures).',
      value: v3(tw.v), tol: 0.1, unit: 'm s⁻¹',
      sol: r`$v = \sqrt{2gh} = \sqrt{2 \times 9.8 \times 30} = \sqrt{588} = ${dec(tw.v, 3)}$ m s$^{-1}$.`,
      scheme: [[`v = √(2gh) = √588 = ${dec(tw.v, 3)} m s⁻¹`, 1]],
      d: 2, c: 'application', t: [2],
    })),
    part('c', short({
      marks: 2,
      stem: 'In practice the water leaves the tap far more slowly than this. Give two reasons based on the assumptions of Bernoulli’s equation.',
      model: 'Bernoulli’s equation assumes a **non-viscous**, **steady, non-turbulent** flow. A real pipe has viscous friction at its walls and turbulence at bends and valves, which dissipate energy as heat, so less of the pressure energy at the tap becomes kinetic energy and the exit speed is much smaller than $\\sqrt{2gh}$.',
      sol: 'Viscous losses; turbulence.',
      scheme: [['Viscous friction dissipates energy', 1], ['Turbulence at bends and valves dissipates energy; Bernoulli’s assumptions fail', 1]],
      d: 3, c: 'understanding', t: [2],
    }), [
      short({
        marks: 2,
        stem: 'A friend says that if the tank were four times as high above the tap, the water would leave four times as fast. Evaluate this claim.',
        model: r`The claim is **wrong**. The speed is $v = \sqrt{2gh}$, proportional to $\sqrt{h}$, so making $h$ four times as large only doubles the speed: $\sqrt{2 \times 9.8 \times 120} = ${dec(tw.v4, 3)}$ m s$^{-1}$, twice the ${dec(tw.v, 3)} m s$^{-1}$ found above.`,
        sol: 'v ∝ √h: doubles.',
        scheme: [['Claim wrong: v ∝ √h', 1], [`Four times the height gives ${dec(tw.v4, 3)} m s⁻¹, twice as fast`, 1]],
        d: 4, c: 'evaluation', t: [2],
      }),
    ]),
  ],
}), (q) => near(tw.v4 / tw.v, 2, 1e-9) && near(q.children[1].answer.value, Math.sqrt(588), 3e-3) && near(tw.gauge, 294000, 1e-9) || 'tw');
const bk = { F: 90, Am: 1.5e-4, As: 6.0e-4, n: 2 };
bk.P = Number((bk.F / bk.Am).toPrecision(8));
bk.Fs = Number((bk.P * bk.As).toPrecision(8));
bk.ratio = bk.As / bk.Am;
bk.dmaster = bk.n * bk.ratio; // master piston moves this many times as far as one slave piston
add('scooter-case', mk.case({
  passage: 'The hydraulic brake of a scooter in Pune has a master cylinder with a piston of area 1.5 cm². The rider’s hand lever pushes on this piston with a force of 90 N. The brake fluid passes the pressure to the two slave pistons, one at each wheel, each of area 6.0 cm².',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'The pressure transmitted through the brake fluid is',
      right: `${sci(bk.P, 2).replace('\\times', '×').replace('10^{5}', '10⁵')} Pa`,
      wrong: ['6.0 × 10³ Pa', '6.0 × 10⁶ Pa', '1.4 × 10⁻² Pa'],
      sol: r`$P = \dfrac{F}{A} = \dfrac{90}{1.5 \times 10^{-4}} = ${sci(bk.P, 2)}$ Pa — option (@K). Option (@3) comes from multiplying force by area; the other two slip by powers of ten in converting cm² to m².`,
      d: 1, c: 'understanding', t: [1],
    })),
    part('b', num({
      stem: 'Find the force that acts on one slave piston, in N.',
      value: bk.Fs, tol: 1, unit: 'N',
      sol: r`The same pressure acts on each slave piston: $F_s = P A_s = ${sci(bk.P, 2)} \times 6.0 \times 10^{-4} = ${bk.Fs}$ N.`,
      scheme: [[`F = P A = ${bk.P} × 6.0 × 10⁻⁴ = ${bk.Fs} N`, 1]],
      d: 2, c: 'application', t: [1],
    })),
    part('c', short({
      marks: 2,
      stem: 'After repair work, a small air bubble is trapped in the brake fluid and the lever feels “spongy”: it moves farther but the braking is weak. Explain.',
      model: 'Air is **compressible**, unlike the brake fluid. Part of the lever’s motion goes into squeezing the bubble, so the master piston moves farther for a smaller rise of pressure; by Pascal’s law the pressure transmitted to the slave pistons is then smaller and the braking force is weak.',
      sol: 'Compressible air absorbs movement and pressure.',
      scheme: [['Air is compressible and shrinks under the push', 1], ['Pressure transmitted to the slave pistons is reduced, so braking is weak', 1]],
      d: 3, c: 'understanding', t: [1],
    }), [
      short({
        marks: 2,
        stem: 'A learner says that the two slave pistons together push with 720 N, far more than the 90 N at the lever, so the brake gives more energy than the rider supplies. Evaluate this claim.',
        model: r`The claim is **wrong**. A hydraulic brake multiplies force, not energy. The liquid volume is conserved: the master piston moves ${bk.dmaster} times as far as each slave piston, so the work $90 \times d$ at the lever equals $2 \times ${bk.Fs} \times d/${bk.dmaster}$ at the slave pistons (no energy is created; some is lost to friction).`,
        sol: 'Work in = work out; distance ratio.',
        scheme: [['Claim wrong: force is multiplied but energy is not', 1], [`Distance moved is smaller by the factor ${bk.dmaster}; work in = work out`, 1]],
        d: 4, c: 'evaluation', t: [1],
      }),
    ]),
  ],
}), (q) => near(bk.Fs, 360, 1e-9) && near(2 * bk.Fs / bk.dmaster, bk.F, 1e-9) && near(q.children[1].answer.value, 360, 1e-9) || 'bk');
const bb = { r: 1.5e-3, rs: 7800, sg: 880, v: 0.050 };
bb.eta = (2 * bb.r ** 2 * (bb.rs - bb.sg) * g) / (9 * bb.v);
bb.Re = (bb.sg * bb.v * 2 * bb.r) / bb.eta;
add('ball-case', mk.case({
  passage: 'A student at a polytechnic in Coimbatore measures the viscosity of a lubricating oil of density 880 kg m⁻³. She drops a steel ball bearing of radius 1.5 mm (density 7800 kg m⁻³) into a tall, wide jar of the oil. After the first few centimetres the ball falls at a steady 0.050 m s⁻¹. Take g = 9.8 m s⁻².',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'While the ball falls at the steady speed, the forces on it satisfy',
      right: 'weight = upthrust + viscous drag',
      wrong: ['weight = viscous drag', 'upthrust = viscous drag', 'weight = upthrust'],
      sol: 'The speed is steady, so the net force is zero. The weight acts down; the upthrust and the viscous drag act up. The upthrust is not negligible here (oil density is 880 kg m⁻³) — option (@K).',
      d: 2, c: 'understanding', t: [3],
    })),
    part('b', num({
      stem: 'Find the viscosity of the oil, in Pa s (3 significant figures).',
      value: v3(bb.eta), tol: 0.005, unit: 'Pa s',
      sol: r`$\eta = \dfrac{2r^2(\rho - \sigma)g}{9 v_t} = \dfrac{2 \times (1.5 \times 10^{-3})^2 \times ${bb.rs - bb.sg} \times 9.8}{9 \times 0.050} = ${dec(bb.eta, 3)}$ Pa s.`,
      scheme: [[`η = 2r²(ρ − σ)g/(9v_t) = ${dec(bb.eta, 3)} Pa s`, 1]],
      d: 3, c: 'application', t: [3],
    })),
    part('c', short({
      marks: 2,
      stem: 'Why should the experiment use a small ball in a wide jar, and why does she wait until the ball has fallen a few centimetres before timing it?',
      model: 'Stokes’ law holds for a **small sphere at low speed in an unbounded fluid**: a small ball keeps the Reynolds number low (here about ' + dec(bb.Re, 2) + ') and a wide jar keeps the walls from adding extra drag. She waits so that the ball has reached its **terminal speed**, when the net force is zero and the speed is steady.',
      sol: 'Stokes’ law conditions; terminal speed.',
      scheme: [['Small ball and wide jar: Stokes’ law valid, smooth flow, no wall effects', 1], ['Wait for terminal speed, when net force is zero', 1]],
      d: 3, c: 'understanding', t: [3],
    }), [
      short({
        marks: 2,
        stem: 'A friend suggests that a steel ball of twice the radius would fall at the same steady speed, since it is made of the same steel. Evaluate this claim.',
        model: r`The claim is **wrong**. The terminal speed varies as $r^2$: doubling the radius makes the weight larger, and the balance with drag and upthrust gives $v_t$ four times as large, about $${dec(4 * bb.v, 3)}$ m s$^{-1}$. (At such a speed the Reynolds number would be larger, so Stokes’ law becomes less reliable.)`,
        sol: 'v_t ∝ r², four times.',
        scheme: [['Claim wrong: v_t ∝ r²', 1], [`Four times as fast: ${dec(4 * bb.v, 3)} m s⁻¹`, 1]],
        d: 4, c: 'evaluation', t: [3],
      }),
    ]),
  ],
}), (q) => near(root((eta) => settleSpeed(bb.r, bb.rs, bb.sg, eta) - bb.v, 0.01, 10), bb.eta, 1e-4) && bb.Re < 1 && near(q.children[1].answer.value, 0.678, 1e-9) || 'bb');
const cc = { S: 0.072, rs: [0.20e-3, 0.40e-3, 0.80e-3] };
cc.h = cc.rs.map((rad) => (2 * cc.S) / (RHO * g * rad));
cc.rw = 5.0e-3;
cc.hw = (2 * cc.S) / (RHO * g * cc.rw);
add('tubes-case', mk.case({
  passage: 'A physics club in Lucknow dips clean glass capillary tubes of radii 0.20 mm, 0.40 mm and 0.80 mm into a dish of water. The water wets the glass (angle of contact about 0°); its surface tension is 0.072 N m⁻¹, its density 1000 kg m⁻³, and g = 9.8 m s⁻².',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'The water rises highest in the tube of radius 0.20 mm because',
      right: 'the rise is inversely proportional to the radius of the tube',
      wrong: ['the rise is directly proportional to the radius of the tube', 'the thinner tube is longer', 'the rise does not depend on the radius of the tube'],
      sol: 'h = 2S cos θ/(ρ g r) ∝ 1/r, so the narrowest tube gives the largest rise — option (@K).',
      d: 1, c: 'understanding', t: [4],
    })),
    part('b', num({
      stem: 'Find the height of the water in the tube of radius 0.40 mm above the level in the dish, in cm (3 significant figures).',
      value: v3(cc.h[1] * 100), tol: 0.02, unit: 'cm',
      sol: r`$h = \dfrac{2S\cos\theta}{\rho g r} = \dfrac{2 \times 0.072 \times 1}{1000 \times 9.8 \times 0.40 \times 10^{-3}} = ${dec(cc.h[1], 3)}$ m $= ${dec(cc.h[1] * 100, 3)}$ cm.`,
      scheme: [[`h = 2S/(ρgr) = ${dec(cc.h[1], 3)} m = ${dec(cc.h[1] * 100, 3)} cm`, 1]],
      d: 2, c: 'application', t: [4],
    })),
    part('c', short({
      marks: 2,
      stem: 'The club also dips a wide glass tube of radius 5.0 mm into the water. Find the rise, and explain why capillary rise is hardly noticed in wide tubes.',
      model: r`$h = \dfrac{2 \times 0.072}{1000 \times 9.8 \times 5.0 \times 10^{-3}} = ${dec(cc.hw * 1000, 3)}$ mm. Since $h \propto 1/r$, the rise shrinks as the tube widens; in a wide tube it is a few millimetres at most, too small to see against the curvature of the meniscus.`,
      sol: 'h = 2.94 mm; h ∝ 1/r.',
      scheme: [[`h = ${dec(cc.hw * 1000, 3)} mm`, 1], ['h ∝ 1/r, so wide tubes show negligible rise', 1]],
      d: 3, c: 'application', t: [4],
    }), [
      short({
        marks: 2,
        stem: 'A member says that doubling the radius of the tube would double the height to which the water rises. Evaluate this claim.',
        model: r`The claim is **wrong**. The rise is inversely proportional to the radius, so doubling the radius **halves** the rise: from ${dec(cc.h[1] * 100, 3)} cm at 0.40 mm to ${dec(cc.h[2] * 100, 3)} cm at 0.80 mm.`,
        sol: 'h ∝ 1/r: halves.',
        scheme: [['Claim wrong: h ∝ 1/r', 1], [`Rise halves: ${dec(cc.h[1] * 100, 3)} cm to ${dec(cc.h[2] * 100, 3)} cm`, 1]],
        d: 4, c: 'evaluation', t: [4],
      }),
    ]),
  ],
}), (q) => near(capHeight(cc.S, 0, RHO, cc.rs[1]) * 100, q.children[1].answer.value, 3e-3) && near(cc.h[1] / cc.h[2], 2, 1e-9) || 'cc');
void RHO_HG;
void integ;
