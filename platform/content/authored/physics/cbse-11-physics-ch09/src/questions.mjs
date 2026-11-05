// ch09 question bank, part 1: t01 (pressure, depth, atmospheric and gauge pressure, Pascal's law) and t02 (continuity, Bernoulli, efflux, Venturi, lift).
// Every numerical is computed here and re-solved by an independent `check`; solutions and schemes print the computed values.
// AR keys planned across the chapter: a (pascal), b (barometer), d (hose), c (range), a (terminal speed), b (capillary rise).
import { mk, add, r, dec, sci, near } from '../../cbse-11-physics-ch01/src/lib.mjs';
import { g, RHO, RHO_HG, PATM, integ, root, deriv } from './phys.mjs';

const { mcq, ar, tf, fill, match, num, short } = mk;
const v3 = (x) => Number(dec(x, 3));
const v2 = (x) => Number(dec(x, 2));
const A = (rad) => Math.PI * rad * rad;

// ================================================================ t01 pressure, depth, atmosphere, Pascal's law
add('scalar-mcq', mcq({
  stem: 'A diver at 12 m depth in a quarry lake in Goa notices that the water presses on her suit. The force due to the water pressure on a small flat patch of the suit acts',
  right: 'at right angles to the patch, whatever its orientation',
  wrong: ['along the patch, in the direction in which the diver is moving', 'vertically downwards on every patch', 'vertically upwards on every patch'],
  sol: 'Pressure in a fluid at rest is a scalar: it acts equally in all directions at a point, and the force it produces on any surface is normal to that surface — option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
add('shape-mcq', mcq({
  stem: 'A tall narrow tube, a wide jar and a conical flask have flat bases of the same area and are filled with the same liquid to the same height above their bases. The pressure at the base is',
  right: 'the same in all three vessels',
  wrong: ['greatest in the wide jar, which holds the most liquid', 'greatest in the narrow tube, where the liquid is packed most closely', 'least in the conical flask, because its sides slope'],
  sol: 'P = P₀ + ρgh depends only on the depth, the density and g, not on the shape or the amount of liquid — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
const ab = { h: 12 };
ab.gauge = RHO * g * ab.h;
ab.abs = PATM + ab.gauge;
add('abs-mcq', mcq({
  stem: 'A freshwater storage tank in a Nagpur factory, open to the air, is 12 m deep. Take ρ = 1000 kg m⁻³, g = 9.8 m s⁻² and atmospheric pressure 1.013 × 10⁵ Pa. The absolute pressure at the bottom of the tank is closest to',
  right: `$${sci(ab.abs, 3)}$ Pa`,
  wrong: [`$${sci(ab.gauge, 3)}$ Pa`, `$${sci(PATM, 3)}$ Pa`, `$${sci(PATM + 2 * ab.gauge, 3)}$ Pa`],
  sol: r`Gauge pressure $\rho g h = 1000 \times 9.8 \times ${ab.h} = ${sci(ab.gauge, 4)}$ Pa. Absolute pressure $= 1.013 \times 10^{5} + ${sci(ab.gauge, 4)} = ${sci(ab.abs, 4)}$ Pa $\approx ${sci(ab.abs, 3)}$ Pa — option (@K). Option (@1) is the gauge pressure alone.`,
  d: 2, c: 'application', t: [1],
}), () => near(ab.abs, 218900, 1e-9) || 'ab');
add('tilt-mcq', mcq({
  stem: 'In a mercury barometer in a laboratory the tube is slowly tilted, with its open end staying under the mercury in the trough. For the mercury column in the tube',
  right: 'the vertical height stays the same and the length along the tube increases',
  wrong: ['the vertical height falls and the length along the tube stays the same', 'both the vertical height and the length along the tube stay the same', 'the vertical height rises because more mercury is pushed in'],
  sol: 'The column is held up by the atmosphere, so its vertical height P₀/(ρg) is fixed (about 760 mm). When the tube is tilted, the same vertical height needs a longer length of tube — option (@K).',
  d: 3, c: 'understanding', t: [1],
}));
const hp = { A1: 5.0e-4, A2: 2.0e-2, F1: 80, rise: 0.010 };
hp.k = hp.A2 / hp.A1;
hp.F2 = hp.F1 * hp.k;
hp.d1 = hp.k * hp.rise;
add('lift-mcq', mcq({
  stem: 'In a hydraulic press at a workshop in Rajkot the narrow piston has area 5.0 cm² and the wide piston 200 cm². A force of 80 N acts on the narrow piston. The force on the wide piston, and the distance the narrow piston moves when the wide piston rises by 1.0 cm, are',
  right: `${hp.F2} N and ${hp.d1 * 100} cm`,
  wrong: [`${hp.F2} N and ${dec(0.01 / hp.k * 100, 2)} cm`, `${dec(hp.F1 / hp.k, 2)} N and ${hp.d1 * 100} cm`, `${hp.F2} N and 1.0 cm`],
  sol: `Area ratio = 200/5.0 = ${hp.k}, so F₂ = 80 × ${hp.k} = ${hp.F2} N. The liquid volume is conserved, so the narrow piston moves ${hp.k} times as far: ${hp.k} × 1.0 cm = ${hp.d1 * 100} cm — option (@K).`,
  d: 2, c: 'application', t: [1],
}), () => hp.k === 40 && hp.F2 === 3200 && near(hp.d1, 0.4, 1e-9) || 'hp');
add('pascal-ar', ar({
  a: 'When the plunger of a sealed syringe full of water is pushed in, the pressure rises at once at every point of the water.',
  r: 'A pressure change applied to an enclosed, almost incompressible fluid is transmitted undiminished to every point of the fluid.',
  key: 'a',
  sol: 'Both statements are true, and R is Pascal’s law, which is exactly why the pressure rises everywhere — option (a).',
  d: 2, c: 'understanding', t: [1],
}));
add('baro-ar', ar({
  a: 'The atmosphere supports a column of mercury about 760 mm high in a barometer.',
  r: 'Mercury is a liquid metal that does not wet glass.',
  key: 'b',
  sol: 'A is true: the column’s pressure ρgh equals the atmospheric pressure. R is also true, but it does not explain the height; the height is fixed by the atmospheric pressure and the density of mercury — option (b).',
  d: 3, c: 'understanding', t: [1],
}));
add('gauge-tf', tf({
  stem: 'A gas pumped down in a vessel at a Pune laboratory has an absolute pressure of 0.40 atm while the surrounding air is at 1.0 atm. Its gauge pressure is then negative.',
  key: 't',
  sol: 'True. Gauge pressure = absolute − atmospheric = 0.40 − 1.0 = −0.60 atm, which is negative because the gas is below atmospheric pressure.',
  d: 2, c: 'understanding', t: [1],
}));
add('gauge-fill', fill({
  stem: 'A tyre gauge at a petrol pump in Chennai reads the amount by which the pressure inside the tyre exceeds the pressure of the surrounding air. This excess is called the ___ pressure.',
  acc: [['gauge']],
  sol: 'The excess over the atmosphere is the **gauge** pressure; absolute pressure = gauge + atmospheric.',
  d: 1, c: 'recall', t: [1],
}));
const dn = { h: 24 };
dn.p = RHO * g * dn.h;
add('depth-num', num({
  stem: 'Water in an open overhead tank at a Hyderabad apartment block stands 24 m above a ground-floor tap. Taking ρ = 1000 kg m⁻³ and g = 9.8 m s⁻², find the gauge pressure at the tap, in kPa.',
  value: Number(dec(dn.p / 1000, 4)), tol: 0.5, unit: 'kPa',
  sol: r`Gauge pressure $= \rho g h = 1000 \times 9.8 \times ${dn.h} = ${dec(dn.p / 1000, 4)} \times 10^{3}$ Pa $= ${dec(dn.p / 1000, 4)}$ kPa.`,
  scheme: [[`ρ g h = 1000 × 9.8 × ${dn.h} = ${dn.p} Pa = ${dec(dn.p / 1000, 4)} kPa`, 1]],
  d: 1, c: 'application', t: [1],
}), (q) => near(integ(() => RHO * g, 0, dn.h) / 1000, q.answer.value, 1e-6) || 'dn');
const sea = { rho: 1030, h: 30 };
sea.gauge = sea.rho * g * sea.h;
sea.abs = PATM + sea.gauge;
add('sea-num', num({
  stem: 'A research diver works 30 m below the surface of the sea off Visakhapatnam. Sea water has density 1030 kg m⁻³; take g = 9.8 m s⁻² and atmospheric pressure 1.013 × 10⁵ Pa. Find the absolute pressure on the diver, in kPa.',
  value: v3(sea.abs / 1000), tol: 0.5, unit: 'kPa',
  sol: r`Gauge pressure $= \rho g h = 1030 \times 9.8 \times 30 = ${sea.gauge}$ Pa. Absolute pressure $= ${PATM} + ${sea.gauge} = ${sea.abs}$ Pa $= ${dec(sea.abs / 1000, 4)}$ kPa.`,
  scheme: [[`ρ g h = 1030 × 9.8 × 30 = ${sea.gauge} Pa`, 1], [`Add atmosphere: ${sea.abs} Pa = ${dec(sea.abs / 1000, 4)} kPa`, 1]],
  marks: 2, d: 3, c: 'application', t: [1],
}), (q) => near(PATM + integ(() => sea.rho * g, 0, sea.h), q.answer.value * 1000, 1e-3) || 'sea');
const gb = { rho: 1260 };
gb.h = PATM / (gb.rho * g);
add('glyc-baro-num', num({
  stem: 'A student proposes a barometer filled with glycerine, of density 1260 kg m⁻³, instead of mercury (assume its vapour pressure is negligible). Atmospheric pressure is 1.013 × 10⁵ Pa and g = 9.8 m s⁻². Find the height of the glycerine column, in m.',
  value: v3(gb.h), tol: 0.02, unit: 'm',
  sol: r`In a barometer $P_0 = \rho g h$, so $h = \dfrac{P_0}{\rho g} = \dfrac{${PATM}}{1260 \times 9.8} = ${dec(gb.h, 3)}$ m.`,
  scheme: [['P₀ = ρ g h', 1], [`h = ${PATM}/(1260 × 9.8) = ${dec(gb.h, 3)} m`, 1]],
  marks: 2, d: 3, c: 'application', t: [1],
}), (q) => near(root((h) => gb.rho * g * h - PATM, 0, 50), q.answer.value, 1e-3) || 'gb');
const pr = { m: 2000, r2: 0.2, r1: 0.04 };
pr.W = pr.m * g;
pr.k = (pr.r2 / pr.r1) ** 2;
pr.F1 = pr.W / pr.k;
add('press-num', num({
  stem: 'A truck of mass 2000 kg stands on the wide piston, of radius 20 cm, of a garage lift. The narrow piston has radius 4.0 cm. Take g = 9.8 m s⁻². Find the force that must act on the narrow piston to hold the truck, in N.',
  value: pr.F1, tol: 1, unit: 'N',
  sol: r`$W = mg = 2000 \times 9.8 = ${pr.W}$ N. Area ratio $= (20/4.0)^2 = ${pr.k}$. Equal pressure gives $F_1 = \dfrac{W}{${pr.k}} = \dfrac{${pr.W}}{${pr.k}} = ${pr.F1}$ N.`,
  scheme: [[`Area ratio = (20/4.0)² = ${pr.k}`, 1], [`F₁ = ${pr.W}/${pr.k} = ${pr.F1} N`, 1]],
  marks: 2, d: 2, c: 'application', t: [1],
}), (q) => near((pr.W / A(pr.r2)) * A(pr.r1), q.answer.value, 1e-9) || 'pr');
const bk = { F: 400, Am: 2.0e-4, As: 8.0e-4 };
bk.P = bk.F / bk.Am;
bk.Fs = bk.P * bk.As;
add('brake-num', num({
  stem: 'In a hydraulic brake of a bus, a force of 400 N acts on a master piston of area 2.0 cm². Each slave piston at a wheel has area 8.0 cm². Find the force on one slave piston, in N.',
  value: bk.Fs, tol: 2, unit: 'N',
  sol: r`Pressure $P = \dfrac{F}{A} = \dfrac{400}{2.0 \times 10^{-4}} = ${sci(bk.P, 3)}$ Pa, the same at every slave piston (Pascal’s law). $F_s = P A_s = ${sci(bk.P, 3)} \times 8.0 \times 10^{-4} = ${bk.Fs}$ N.`,
  scheme: [[`P = 400/(2.0 × 10⁻⁴) = ${bk.P} Pa`, 1], [`F = P A = ${bk.P} × 8.0 × 10⁻⁴ = ${bk.Fs} N`, 1]],
  marks: 2, d: 3, c: 'application', t: [1],
}), (q) => near(bk.F * (bk.As / bk.Am), q.answer.value, 1e-9) && bk.Fs === 1600 || 'bk');
const mn = { h: 0.38 };
mn.P = RHO_HG * g * mn.h;
add('manom-num', num({
  stem: 'A U-tube manometer containing mercury (13 600 kg m⁻³) is joined to a gas cylinder in a laboratory. The mercury stands 38 cm higher in the arm open to the air. With g = 9.8 m s⁻², find the gauge pressure of the gas, in kPa.',
  value: v3(mn.P / 1000), tol: 0.2, unit: 'kPa',
  sol: r`Gauge pressure $= \rho g h = 13600 \times 9.8 \times 0.38 = ${dec(mn.P, 5)}$ Pa $= ${dec(mn.P / 1000, 3)}$ kPa.`,
  scheme: [[`ρ g h = 13600 × 9.8 × 0.38 = ${dec(mn.P / 1000, 3)} kPa`, 1]],
  d: 2, c: 'application', t: [1],
}), (q) => near(integ(() => RHO_HG * g, 0, mn.h) / 1000, q.answer.value, 1e-3) || 'mn');
const gt = { w: 2.0, hh: 3.0 };
gt.F = RHO * g * (gt.hh / 2) * gt.w * gt.hh;
add('gate-num', num({
  stem: 'A vertical rectangular sluice gate in a canal at Mysuru is 2.0 m wide and 3.0 m high. Water stands up to its top edge on one side, with air at atmospheric pressure on the other side and above the water. Take ρ = 1000 kg m⁻³ and g = 9.8 m s⁻². Because the gauge pressure grows uniformly from zero at the top to ρgH at the bottom, its average value is ρg(H/2). Find the net force of the water on the gate, in kN.',
  value: v3(gt.F / 1000), tol: 0.2, unit: 'kN',
  sol: r`The atmosphere acts on both sides, so only the gauge pressure matters. Average gauge pressure $= \rho g \dfrac{H}{2} = 1000 \times 9.8 \times 1.5 = ${1000 * g * 1.5}$ Pa. Area $= 2.0 \times 3.0 = 6.0$ m$^2$, so $F = ${1000 * g * 1.5} \times 6.0 = ${gt.F}$ N $= ${dec(gt.F / 1000, 3)}$ kN.`,
  scheme: [['Average gauge pressure = ρ g H/2 = 14 700 Pa', 1], ['Area 6.0 m²', 1], [`F = 14 700 × 6.0 = ${gt.F} N = ${dec(gt.F / 1000, 3)} kN`, 1]],
  marks: 3, d: 4, c: 'analysis', t: [1],
}), (q) => near(integ((z) => RHO * g * z * gt.w, 0, gt.hh) / 1000, q.answer.value, 1e-4) || 'gt');
add('pascal-short', short({
  marks: 2,
  stem: 'State Pascal’s law and name one device that works on it.',
  model: 'Pascal’s law: a pressure change applied to an **enclosed fluid** is transmitted **undiminished** to every point of the fluid and to the walls of the container. A hydraulic lift (or hydraulic brake or press) works on it: a small force on a narrow piston gives a large force on a wide piston.',
  sol: 'Statement; one device.',
  scheme: [['Statement: pressure change in an enclosed fluid transmitted undiminished everywhere', 1], ['A correct device, e.g. hydraulic lift or brake', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('dam-short', short({
  marks: 2,
  stem: 'Why is the wall of a water-storage dam built much thicker at its base than near its top?',
  model: 'The pressure of the water increases with depth, $P = P_0 + \\rho g h$, so the horizontal force on the wall per unit area is greatest at the base. A thicker base is needed to withstand the larger force there, while the top, at small depth, needs far less strength.',
  sol: 'Pressure grows with depth.',
  scheme: [['Pressure increases with depth (ρ g h)', 1], ['Larger force at the base, so a thicker wall is needed there', 1]],
  d: 2, c: 'understanding', t: [1],
}));
const tg = { gauge: 220, atm: PATM / 1000 };
tg.abs = tg.gauge + tg.atm;
add('gauge-short', short({
  marks: 3,
  stem: 'Distinguish between gauge pressure and absolute pressure. A scooter tyre gauge reads 220 kPa when the atmospheric pressure is 101.3 kPa: find the absolute pressure of the air in the tyre.',
  model: r`**Absolute pressure** is the total pressure at a point, including the atmosphere. **Gauge pressure** is only the excess over the atmospheric pressure, which is what a tyre gauge shows, so absolute pressure = gauge pressure + atmospheric pressure. Here the absolute pressure of the air in the tyre is $220 + 101.3 = ${dec(tg.abs, 4)}$ kPa.`,
  sol: 'Definitions; 220 + 101.3 = 321.3 kPa.',
  scheme: [['Gauge pressure = excess over atmosphere', 1], ['Absolute = gauge + atmospheric', 1], [`220 + 101.3 = ${dec(tg.abs, 4)} kPa`, 1]],
  d: 2, c: 'application', t: [1],
}), () => near(tg.abs, 321.3, 1e-9) || 'tg');
add('brake-short', short({
  marks: 3,
  stem: 'Explain, using Pascal’s law, how one push on the brake pedal of a car brings equal braking force to the pistons at all four wheels, and why the brake fluid must be free of air bubbles.',
  model: 'The pedal pushes a piston in the master cylinder, raising the pressure of the enclosed brake fluid. By **Pascal’s law** this pressure rise reaches every slave cylinder undiminished, so equal pistons receive equal forces. Air is compressible: a bubble would absorb part of the push by shrinking, so the pressure would not be fully transmitted and the pedal would feel soft.',
  sol: 'Pascal’s law; air is compressible.',
  scheme: [['Pressure rise in the enclosed fluid is transmitted undiminished to all slave pistons', 1], ['Equal pistons get equal force', 1], ['Air is compressible and absorbs the pressure change', 1]],
  d: 3, c: 'understanding', t: [1],
}));

// ================================================================ t02 continuity, Bernoulli, efflux, Venturi, dynamic lift
add('contin-mcq', mcq({
  stem: 'Water flows steadily through a pipe whose diameter falls from 6.0 cm to 3.0 cm. The speed of the water in the narrow part is',
  right: '4 times the speed in the wide part',
  wrong: ['2 times the speed in the wide part', '8 times the speed in the wide part', 'one quarter of the speed in the wide part'],
  sol: 'A ∝ d², so halving the diameter makes the area one quarter. Continuity, A₁v₁ = A₂v₂, then makes the speed 4 times as large — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('bern-mcq', mcq({
  stem: 'Water flows steadily through a horizontal pipe that is narrower at one section than at another. Compared with the wide section, in the narrow section the water',
  right: 'moves faster and has lower pressure',
  wrong: ['moves faster and has higher pressure', 'moves slower and has lower pressure', 'moves slower and has higher pressure'],
  sol: 'Continuity: the narrow section has a smaller area, so the speed is larger. Bernoulli: at the same height a larger speed means a lower pressure — option (@K).',
  d: 1, c: 'understanding', t: [2],
}));
add('tor-mcq', mcq({
  stem: 'Two identical open tanks stand on a bench, one filled with water and the other with kerosene (density 800 kg m⁻³). A small hole is made 1.0 m below the surface in each. The kerosene leaves its hole',
  right: 'at the same speed as the water',
  wrong: ['faster than the water, because kerosene is lighter', 'slower than the water, because kerosene is less dense', 'faster than the water, because kerosene is less viscous'],
  sol: 'The speed of efflux v = √(2gh) does not contain the density (it cancels in Bernoulli’s equation), so both jets leave at √(2 × 9.8 × 1.0) ≈ 4.4 m s⁻¹ — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('magnus-mcq', mcq({
  stem: 'A cricket ball bowled in a Chennai nets session spins about a vertical axis as it moves forward, dragging a layer of air round with its surface. On one side the surface moves with the oncoming air, so the air there flows faster relative to the ball. The ball swerves',
  right: 'towards the side where the air is faster, because the pressure there is lower',
  wrong: ['towards the side where the air is faster, because the pressure there is higher', 'away from the side where the air is faster, because the pressure there is lower', 'in a straight line, because the pressure is the same on both sides'],
  sol: 'Faster air has lower pressure (Bernoulli), so the higher pressure on the slow side pushes the ball towards the fast side — option (@K).',
  d: 3, c: 'understanding', t: [2],
}));
const vm = { k: 16 };
add('venturi-mcq', mcq({
  stem: 'In a Venturi meter in a water main the diameter of the throat is half the diameter of the pipe. The speed of the water in the pipe is v and the density of water is ρ. The pressure in the pipe exceeds the pressure in the throat by',
  right: `$7.5\\,\\rho v^2$`,
  wrong: [r`$0.5\,\rho v^2$`, r`$1.5\,\rho v^2$`, r`$15\,\rho v^2$`],
  sol: r`Halving the diameter makes the area one quarter, so the throat speed is $4v$. Then $\Delta P = \tfrac{1}{2}\rho\,[(4v)^2 - v^2] = \tfrac{1}{2}\rho \times 15 v^2 = 7.5\,\rho v^2$ — option (@K). Option (@3) forgets the factor ½; option (@2) takes the throat speed as $2v$.`,
  d: 3, c: 'application', t: [2],
}), () => near(0.5 * (16 - 1), 7.5, 1e-12) || 'vm');
add('hose-ar', ar({
  a: 'Putting a thumb over the open end of a garden hose decreases the speed with which the water leaves the hose.',
  r: 'By the equation of continuity, a smaller exit area for the same volume flow rate gives a larger exit speed.',
  key: 'd',
  sol: 'A is false: the speed of the water leaving the hose increases when the exit area is reduced. R is true (A v = constant) and is the very reason the speed rises — option (d).',
  d: 2, c: 'understanding', t: [2],
}));
add('range-ar', ar({
  a: 'In an open tank of depth H standing on the ground, a hole at depth h and a hole at depth H − h below the surface give jets with the same horizontal range.',
  r: 'The speed of efflux from the two holes is the same.',
  key: 'c',
  sol: 'A is true: R = 2√(h(H − h)) is unchanged when h and H − h are swapped. R is false: the speeds are √(2gh) and √(2g(H − h)), which differ; the faster jet falls through less height — option (c).',
  d: 4, c: 'analysis', t: [2],
}));
add('bern-tf', tf({
  stem: 'Bernoulli’s equation can be used to calculate the pressure drop along a long pipe in which oil flows turbulently at high speed with large viscous losses.',
  key: 'f',
  sol: 'False. Bernoulli’s equation assumes steady, non-viscous, incompressible flow along a streamline; with large viscous losses and turbulence the quantity P + ½ρv² + ρgh is not conserved.',
  d: 2, c: 'understanding', t: [2],
}));
const hs = { v1: 1.5, r1: 0.02, r2: 0.01 };
hs.v2 = hs.v1 * (hs.r1 / hs.r2) ** 2;
add('hose-num', num({
  stem: 'Water moves at 1.5 m s⁻¹ along a pipe of radius 2.0 cm in a Kochi water-treatment plant and enters a joint where the pipe radius is 1.0 cm. Find its speed in the narrow pipe, in m s⁻¹.',
  value: hs.v2, tol: 0.05, unit: 'm s⁻¹',
  sol: r`Continuity: $v_2 = v_1 \dfrac{A_1}{A_2} = 1.5 \times \left(\dfrac{2.0}{1.0}\right)^2 = ${hs.v2}$ m s$^{-1}$.`,
  scheme: [[`v₂ = v₁(r₁/r₂)² = 1.5 × 4 = ${hs.v2} m s⁻¹`, 1]],
  d: 1, c: 'application', t: [2],
}), (q) => near((hs.v1 * A(hs.r1)) / A(hs.r2), q.answer.value, 1e-9) || 'hs');
const ef = { rho: 800, h: 3.2 };
ef.v = Math.sqrt(2 * g * ef.h);
add('efflux-num', num({
  stem: 'A tall open tank of kerosene (density 800 kg m⁻³) in a depot has a small hole 3.2 m below the surface of the kerosene. Take g = 9.8 m s⁻² and neglect viscosity. Find the speed of the kerosene leaving the hole, in m s⁻¹ (3 significant figures).',
  value: v3(ef.v), tol: 0.02, unit: 'm s⁻¹',
  sol: r`Bernoulli between the surface (speed $\approx 0$) and the hole, both at atmospheric pressure: $\tfrac{1}{2}\rho v^2 = \rho g h$, so $v = \sqrt{2gh} = \sqrt{2 \times 9.8 \times ${ef.h}} = \sqrt{${dec(2 * g * ef.h, 4)}} = ${dec(ef.v, 3)}$ m s$^{-1}$. The density cancels.`,
  scheme: [['v = √(2gh)', 1], [`√(2 × 9.8 × ${ef.h}) = ${dec(ef.v, 3)} m s⁻¹`, 1]],
  marks: 2, d: 2, c: 'application', t: [2],
}), (q) => near(g * Math.sqrt((2 * ef.h) / g), q.answer.value, 3e-3) || 'ef');
const rg = { H: 1.6, h: 0.4 };
rg.v = Math.sqrt(2 * g * rg.h);
rg.t = Math.sqrt((2 * (rg.H - rg.h)) / g);
rg.R = rg.v * rg.t;
add('range-num', num({
  stem: 'A water tank at a school in Madurai, open at the top, stands on level ground and is filled to a depth of 1.6 m. A small hole is made 0.40 m below the water surface. Take g = 9.8 m s⁻². Find the horizontal distance from the tank at which the jet reaches the ground, in m.',
  value: v3(rg.R), tol: 0.02, unit: 'm',
  sol: r`Speed $v = \sqrt{2gh} = \sqrt{2 \times 9.8 \times 0.40} = ${dec(rg.v, 3)}$ m s$^{-1}$. The hole is $1.6 - 0.40 = 1.2$ m above the ground, so $t = \sqrt{\dfrac{2 \times 1.2}{9.8}} = ${dec(rg.t, 3)}$ s. Range $= vt = ${dec(rg.v, 3)} \times ${dec(rg.t, 3)} = ${dec(rg.R, 3)}$ m.`,
  scheme: [[`v = √(2 × 9.8 × 0.40) = ${dec(rg.v, 3)} m s⁻¹`, 1], [`Fall time from 1.2 m: t = ${dec(rg.t, 3)} s`, 1], [`Range = v t = ${dec(rg.R, 3)} m`, 1]],
  marks: 3, d: 3, c: 'application', t: [2],
}), (q) => near(2 * Math.sqrt(rg.h * (rg.H - rg.h)), q.answer.value, 6e-3) || 'rg');
const vn = { d1: 0.10, d2: 0.05, dP: 12000 };
vn.k = (vn.d1 / vn.d2) ** 4;
vn.v1 = Math.sqrt((2 * vn.dP) / (RHO * (vn.k - 1)));
vn.Q = A(vn.d1 / 2) * vn.v1;
add('venturi-num', num({
  stem: 'A Venturi meter in a pipe of diameter 10 cm at a Pune pumping station has a throat of diameter 5.0 cm. The pressure in the throat is 12 kPa lower than in the pipe. For water of density 1000 kg m⁻³, find the volume flow rate, in litres per second.',
  value: v3(vn.Q * 1000), tol: 0.05, unit: 'L s⁻¹',
  sol: r`$\dfrac{A_1}{A_2} = \left(\dfrac{10}{5.0}\right)^2 = 4$, so $v_2 = 4v_1$. Bernoulli: $12000 = \tfrac{1}{2} \times 1000\,(16 - 1)\,v_1^2 = 7500\,v_1^2$, so $v_1 = \sqrt{1.6} = ${dec(vn.v1, 4)}$ m s$^{-1}$. $Q = A_1 v_1 = \pi (0.050)^2 \times ${dec(vn.v1, 4)} = ${sci(vn.Q, 4)}$ m$^3$ s$^{-1}$ $= ${dec(vn.Q * 1000, 4)}$ L s$^{-1}$.`,
  scheme: [['Area ratio 4, so v₂ = 4v₁', 1], [`ΔP = ½ρ(v₂² − v₁²): v₁ = ${dec(vn.v1, 4)} m s⁻¹`, 1], [`Q = A₁v₁ = ${dec(vn.Q * 1000, 3)} L s⁻¹`, 1]],
  marks: 3, d: 3, c: 'application', t: [2],
}), (q) => {
  const f = (v1) => 0.5 * RHO * ((v1 * (vn.d1 / vn.d2) ** 2) ** 2 - v1 ** 2) - vn.dP;
  return near(A(vn.d1 / 2) * root(f, 0, 10) * 1000, q.answer.value, 3e-3) || 'vn';
});
const wg = { S: 16, vu: 70, vl: 60, rho: 1.2 };
wg.dP = 0.5 * wg.rho * (wg.vu ** 2 - wg.vl ** 2);
wg.F = wg.dP * wg.S;
add('wing-num', num({
  stem: 'Air flows over a small aircraft wing of area 16 m². The air speed is 70 m s⁻¹ over the upper surface and 60 m s⁻¹ under the lower surface. Taking the density of air as 1.2 kg m⁻³ and ignoring the change of height, find the upward lift force on the wing, in kN (3 significant figures).',
  value: v3(wg.F / 1000), tol: 0.05, unit: 'kN',
  sol: r`Bernoulli at the same height: $P_{\text{below}} - P_{\text{above}} = \tfrac{1}{2}\rho\,(v_u^2 - v_l^2) = 0.5 \times 1.2 \times (4900 - 3600) = ${wg.dP}$ Pa. Lift $= \Delta P \times A = ${wg.dP} \times 16 = ${wg.F}$ N $= ${dec(wg.F / 1000, 3)}$ kN.`,
  scheme: [[`ΔP = ½ρ(v_u² − v_l²) = ${wg.dP} Pa`, 1], [`Lift = ΔP × A = ${wg.F} N = ${dec(wg.F / 1000, 3)} kN`, 1]],
  marks: 2, d: 3, c: 'application', t: [2],
}), (q) => near(0.6 * (70 * 70 - 60 * 60) * 16 / 1000, q.answer.value, 3e-3) || 'wg');
const rs = { v1: 2.0, P1: 3.0e5, h: 5.0, ratio: 2 };
rs.v2 = rs.v1 * rs.ratio;
rs.P2 = rs.P1 + 0.5 * RHO * (rs.v1 ** 2 - rs.v2 ** 2) - RHO * g * rs.h;
add('rise-num', num({
  stem: 'Water flows through a pipe at ground level in a Bengaluru building with speed 2.0 m s⁻¹ and gauge pressure 3.0 × 10⁵ Pa. The pipe then rises 5.0 m to the top floor, where its cross-sectional area is half as large. Take ρ = 1000 kg m⁻³ and g = 9.8 m s⁻². Find the gauge pressure on the top floor, in kPa.',
  value: rs.P2 / 1000, tol: 0.5, unit: 'kPa',
  sol: r`Continuity: $v_2 = 2.0 \times 2 = ${rs.v2}$ m s$^{-1}$. Bernoulli: $P_2 = P_1 + \tfrac{1}{2}\rho(v_1^2 - v_2^2) - \rho g h = 300000 + 500\,(4 - 16) - 1000 \times 9.8 \times 5.0 = 300000 - 6000 - 49000 = ${rs.P2}$ Pa $= ${rs.P2 / 1000}$ kPa.`,
  scheme: [[`v₂ = ${rs.v2} m s⁻¹ from A₁v₁ = A₂v₂`, 1], ['Bernoulli: P₂ = P₁ + ½ρ(v₁² − v₂²) − ρgh', 1], [`P₂ = ${rs.P2} Pa = ${rs.P2 / 1000} kPa`, 1]],
  marks: 3, d: 4, c: 'application', t: [2],
}), (q) => {
  const E = (P, v, h) => P + 0.5 * RHO * v * v + RHO * g * h;
  return near(root((P2) => E(P2, rs.v2, rs.h) - E(rs.P1, rs.v1, 0), 0, 1e6) / 1000, q.answer.value, 1e-6) || 'rs';
});
add('cont-short', short({
  marks: 2,
  stem: 'State the equation of continuity for the steady flow of an incompressible fluid, and use it to explain why the stream of water from a tap gets narrower as it falls.',
  model: 'For an incompressible fluid the volume flowing per second is the same at every cross-section: $A_1 v_1 = A_2 v_2$. As the water falls its speed increases, so to keep $A v$ constant the cross-sectional area of the stream must decrease: the stream narrows.',
  sol: 'A v constant; speed rises as it falls.',
  scheme: [['A₁v₁ = A₂v₂ (volume flow rate constant)', 1], ['Speed increases on falling, so the area decreases', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('aero-short', short({
  marks: 2,
  stem: 'Explain how the wing of an aircraft gets an upward lift force from the air flowing past it.',
  model: 'The wing’s shape and tilt make the air move **faster over the upper surface** than under the lower surface. By Bernoulli’s principle the pressure is lower above the wing than below, and this pressure difference acting over the wing area gives a net upward force, the **dynamic lift**.',
  sol: 'Faster air above, lower pressure above, net upward force.',
  scheme: [['Air is faster above the wing', 1], ['Lower pressure above, so a net upward force (lift)', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('venturi-short', short({
  marks: 2,
  stem: 'Why does the liquid stand lower in the open tube over the throat of a Venturi meter than in the tube over the wide part?',
  model: 'In the narrow throat the speed is larger because $A v$ is constant. By Bernoulli’s principle, at the same height a larger speed means a lower pressure, so the throat pressure is lower and the liquid in the open tube above it stands at a smaller height.',
  sol: 'Speed larger in throat; pressure lower.',
  scheme: [['Smaller area gives a higher speed in the throat (continuity)', 1], ['Higher speed gives lower pressure, so a lower liquid column (Bernoulli)', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('bern-short', short({
  marks: 3,
  stem: 'State Bernoulli’s principle for the flow of a liquid, write its equation and give the conditions under which it holds.',
  model: r`For steady flow of an incompressible, non-viscous fluid, the sum of the pressure, the kinetic energy per unit volume and the potential energy per unit volume is constant along a streamline: $P + \tfrac{1}{2}\rho v^2 + \rho g h = \text{constant}$. It requires **steady (non-turbulent) flow**, **negligible viscosity** and **incompressible** fluid, applied along one streamline.`,
  sol: 'Statement and equation; three conditions.',
  scheme: [['Statement: pressure + kinetic + potential energy per unit volume constant along a streamline', 1], ['P + ½ρv² + ρgh = constant', 1], ['Conditions: steady, non-viscous, incompressible', 1]],
  d: 2, c: 'recall', t: [2],
}));
add('tor-short', short({
  marks: 3,
  stem: 'Using Bernoulli’s equation, show that the speed of efflux of a liquid through a small hole at depth h below the open surface of a large tank is √(2gh).',
  model: r`Compare the surface (pressure $P_0$, speed $\approx 0$ since the tank is large) with the hole (pressure $P_0$, speed $v$, a depth $h$ lower). Bernoulli gives $P_0 + \rho g h = P_0 + \tfrac{1}{2}\rho v^2$, so $v^2 = 2gh$ and $v = \sqrt{2gh}$. This equals the speed a body would gain in falling freely through $h$ (Torricelli’s result).`,
  sol: 'Bernoulli between surface and hole.',
  scheme: [['Surface and hole both at P₀; surface speed negligible', 1], ['ρgh = ½ρv²', 1], ['v = √(2gh), the free-fall speed', 1]],
  d: 3, c: 'application', t: [2],
}));

// ================================================================ matching across topics
add('device-match', match({
  stem: 'Match each device or observation in Column A with the idea that explains it in Column B.',
  pairs: [
    ['A scooter’s brake lever pushes both brake shoes with equal force', 'Pascal’s law for an enclosed liquid'],
    ['The pressure drop at the throat of a water-main flow meter', 'Bernoulli’s principle with the equation of continuity'],
    ['A raindrop falling at a constant speed', 'Balance of weight, upthrust and viscous drag'],
    ['Kerosene climbing the thin wick of a lamp', 'Surface tension with an acute angle of contact'],
  ],
  order: [2, 0, 3, 1],
  marks: 2,
  sol: 'Equal brake force: pressure is transmitted undiminished (Pascal). Throat pressure drop: higher speed gives lower pressure (Bernoulli with continuity). Constant raindrop speed: terminal velocity, weight = upthrust + drag. Wick: capillary rise from surface tension with an acute angle of contact.',
  d: 2, c: 'understanding', t: [1, 2, 3, 4],
}));
void deriv;
