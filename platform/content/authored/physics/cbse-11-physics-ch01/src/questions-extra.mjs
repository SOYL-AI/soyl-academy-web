// ch01 Units and Measurements — question bank, part 2: t03 (dimensions), the long answers and the case-based items.
// Imported after questions.mjs. Every dimensional formula and exponent is computed with the dimension algebra in calc.mjs.
import { mk, add, r, dec, near } from './lib.mjs';
import { sf, roundSf, pt, sfCount, NV, mean, meanAbsErr, roundDp, Q, M, L, T, D, dmul, ddiv, dpow, deq, derive, dimTxt, dimTex, LY, AU, PARSEC } from './calc.mjs';
import { unitTxt } from './decks.mjs';

const { mcq, ar, tf, fill, match, num, short, long, part } = mk;
const mn = (v) => String(v).replace('-', '−');
const br = (d) => `[${dimTxt(d)}]`;

// ================================================================ t03 dimensions
const dIntensity = ddiv(Q.power, dpow(L, 2));
add('intensity-mcq', mcq({
  stem: 'The intensity of sunlight falling on a rooftop solar panel is the power received per unit area. Its dimensional formula is',
  right: br(dIntensity),
  wrong: [br(ddiv(Q.power, L)), br(Q.power), br(Q.pressure)],
  sol: `Intensity = power ÷ area = ${br(Q.power)} ÷ [L²] = ${br(dIntensity)} — option (@K).`,
  d: 2, c: 'application', t: [3],
}), () => dimTxt(dIntensity) === 'M T⁻³' || 'intensity');
add('homog-mcq', mcq({
  stem: 'A student proposes four formulae for the time period T of a block of mass m on a spring of force constant k, where k is force per unit extension. Which one is dimensionally consistent?',
  right: 'T = 2π √(m/k)',
  wrong: ['T = 2π √(k/m)', 'T = 2π m k', 'T = 2π √(m k)'],
  sol: `${'[k] = [force]/[length] = ' + br(Q.springK)}, so [m/k] = [M] ÷ ${br(Q.springK)} = [T²] and its square root has dimension [T]. The other formulae give [T⁻¹], [M² T⁻²] and [M T⁻¹] — option (@K).`,
  d: 2, c: 'application', t: [3],
}), () => deq(ddiv(M, Q.springK), dpow(T, 2)) || 'homog-mcq');
add('impulse-mcq', mcq({
  stem: 'In a cricket match the impulse (force × time of contact) delivered to the ball by the bat has the same dimensional formula as the ball\'s',
  right: 'linear momentum',
  wrong: ['kinetic energy', 'force', 'power'],
  sol: `[impulse] = [force][time] = ${br(Q.force)}[T] = ${br(Q.momentum)}, the same as momentum — option (@K).`,
  d: 1, c: 'understanding', t: [3],
}), () => deq(dmul(Q.force, T), Q.momentum) || 'impulse');
add('reynolds-mcq', mcq({
  stem: 'In a pipe-flow experiment, the combination ρvd/η is evaluated, where ρ is the density of water, v its speed, d the diameter of the pipe and η the coefficient of viscosity with dimensional formula ' + br(Q.viscosity) + '. The dimensional formula of this combination is',
  right: '[M⁰ L⁰ T⁰], so it is dimensionless',
  wrong: [br(Q.viscosity), br(Q.velocity), br(Q.density)],
  sol: `[ρvd/η] = ${br(Q.density)} ${br(Q.velocity)} [L] ÷ ${br(Q.viscosity)} = [M⁰ L⁰ T⁰] — option (@K).`,
  d: 3, c: 'analysis', t: [3],
}), () => deq(ddiv(dmul(Q.density, Q.velocity, L), Q.viscosity), D()) || 'reynolds');
add('planck-mcq', mcq({
  stem: 'In the relation E = hν for the energy of a photon of frequency ν, the SI unit of the Planck constant h, written in base units, is',
  right: unitTxt(Q.planck),
  wrong: ['kg m² s⁻²', 'kg m s⁻¹', 'kg m⁻² s'],
  sol: `[h] = [E] ÷ [ν] = ${br(Q.energy)} ÷ [T⁻¹] = ${br(Q.planck)}, so the unit is ${unitTxt(Q.planck)} — option (@K).`,
  d: 2, c: 'understanding', t: [3],
}), () => unitTxt(Q.planck) === 'kg m² s⁻¹' || 'planck');
add('omega-mcq', mcq({
  stem: 'A student writes the displacement of a swing as x = x₀ sin(ωt), where x₀ is a length and t is the time. For ωt to be a valid angle, the dimensional formula of ω must be',
  right: '[T⁻¹]',
  wrong: ['[T]', '[L T⁻¹]', '[M⁰ L⁰ T⁰]'],
  sol: 'The argument of a sine must be dimensionless, so [ω][T] = [M⁰ L⁰ T⁰] and [ω] = [T⁻¹] — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('homog-ar', ar({
  a: 'The formula T = 2π √(l/g) for the period of a simple pendulum is dimensionally consistent.',
  r: 'Every dimensionally consistent equation is also physically correct.',
  key: 'c',
  sol: 'A is true: [l/g] = [T²], so its square root has dimension [T]. R is false: for example, E = mv² is dimensionally consistent but wrong by a factor of ½ — option (c).',
  d: 2, c: 'understanding', t: [3],
}), () => deq(ddiv(L, Q.accel), dpow(T, 2)) || 'homog-ar');
add('tf-torque', tf({
  stem: 'In a workshop, the torque of a wrench has the same dimensional formula as the work done by a force.',
  key: 't',
  sol: `True. Torque = force × distance = ${br(Q.energy)}, the same as work, even though the two quantities are different physically.`,
  d: 2, c: 'understanding', t: [3],
}), () => deq(dmul(Q.force, L), Q.energy) || 'torque');
add('fill-pure', fill({
  stem: 'Strain, the ratio of the extension of a stretched wire to its original length, has no units or dimensions, so it is called a ___ quantity.',
  acc: [['dimensionless', 'dimensionless quantity', 'pure number']],
  sol: 'A **dimensionless** quantity.',
  d: 1, c: 'recall', t: [3],
}));
add('match-dim', match({
  stem: 'During a cricket match several physical quantities are involved. Match each quantity in Column A with its dimensional formula in Column B.',
  pairs: [
    ['the momentum of the ball as it leaves the bowler\'s hand', `$${dimTex(Q.momentum)}$`],
    ['the kinetic energy of the ball', `$${dimTex(Q.energy)}$`],
    ['the pressure of the roller on the pitch', `$${dimTex(Q.pressure)}$`],
    ['the frequency of the umpire\'s whistle', `$${dimTex(Q.frequency)}$`],
  ],
  order: [2, 0, 3, 1],
  sol: 'Momentum is mass × velocity; kinetic energy is ½mv²; pressure is force ÷ area; frequency is 1 ÷ period.',
  d: 2, c: 'application', t: [3],
}));

// ---- numericals
const nu = { F: 24, mass: 1 / 100, len: 1 / 10, time: 1 / 60 };
nu.n2 = nu.F * nu.mass ** Q.force[0] * nu.len ** Q.force[1] * nu.time ** Q.force[2];
add('newunit-num', num({
  stem: 'A force is 24 N in SI units. A new system uses a unit of length of 10 m, a unit of mass of 100 kg and a unit of time of 1 minute (60 s). Find the numerical value of the force in the new system (3 significant figures).',
  ...NV(nu.n2, 3), unit: 'new units of force',
  sol: r`Force has dimensions $[\text{M}\,\text{L}\,\text{T}^{-2}]$, so $n_2 = n_1\left[\dfrac{M_1}{M_2}\right]^{1}\left[\dfrac{L_1}{L_2}\right]^{1}\left[\dfrac{T_1}{T_2}\right]^{-2} = 24 \times \dfrac{1}{100} \times \dfrac{1}{10} \times 60^{2} = ${dec(24 * 0.01 * 0.1 * 3600, 3)}$.`,
  scheme: [['Dimensions of force [M L T⁻²] and the conversion formula', 1], [`n₂ = 24 × (1/100)(1/10)(60)² = ${dec(nu.n2, 3)}`, 1]],
  marks: 2, d: 3, c: 'application', t: [3],
}), (q) => near(24 * (1 / 100) * (1 / 10) * 60 ** 2, q.answer.value, 0.01) || 'newunit');
const gc = { G: 6.67e-11, a: Q.G[0], b: Q.G[1], c: Q.G[2] };
gc.n2 = gc.G * 1000 ** gc.a * 100 ** gc.b * 1 ** gc.c;
add('gcgs-num', num({
  stem: 'In SI units the gravitational constant is G = 6.67 × 10⁻¹¹ N m² kg⁻². Using its dimensional formula, find its value in CGS units (cm³ g⁻¹ s⁻²), in units of 10⁻⁸ (3 significant figures). (1 kg = 10³ g, 1 m = 10² cm.)',
  ...NV(gc.n2 / 1e-8, 3), unit: '× 10⁻⁸ cm³ g⁻¹ s⁻²',
  sol: r`$[G] = ${dimTex(Q.G)}$, so $n_2 = 6.67 \times 10^{-11} \times (10^{3})^{-1} \times (10^{2})^{3} \times 1^{-2} = 6.67 \times 10^{-11} \times 10^{3} = ${sf(gc.n2, 3)}$ in CGS units. In units of $10^{-8}$: $G = ${dec(gc.n2 / 1e-8, 3)}$.`,
  scheme: [['[G] = [M⁻¹ L³ T⁻²] and the conversion factors (10³)⁻¹(10²)³', 1], [`n₂ = ${pt(gc.n2, 3)}; in units of 10⁻⁸: ${dec(gc.n2 / 1e-8, 3)}`, 1]],
  marks: 2, d: 4, c: 'application', t: [3],
}), (q) => near(6.67e-11 * 1e3, 6.67e-8) && near(gc.n2 / 1e-8, q.answer.value, 0.01) || 'gcgs');
const ex = derive(Q.frequency, [Q.surfTension, Q.density, L]);
add('exp-num', num({
  stem: 'The frequency f of small oscillations of a liquid drop depends on its radius r, its density ρ and its surface tension S as f = k Sᵃ ρᵇ rᶜ, where k is a pure number. Use dimensions to find the exponent c.',
  value: ex[2], tol: 0.01, unit: null,
  sol: r`$[\text{T}^{-1}] = [\text{M}\,\text{T}^{-2}]^{a}\,[\text{M}\,\text{L}^{-3}]^{b}\,[\text{L}]^{c}$. M: $a + b = 0$; T: $-2a = -1$ so $a = ${dec(ex[0], 2)}$, $b = ${dec(ex[1], 2)}$; L: $-3b + c = 0$, so $c = ${dec(ex[2], 2)}$.`,
  scheme: [['Equate powers of M, L and T', 1], [`a = ${mn(ex[0])}, b = ${mn(ex[1])}, c = ${mn(ex[2])}`, 1]],
  marks: 2, d: 3, c: 'application', t: [3],
}), (q) => near(ex[2], -1.5, 1e-9) && near(q.answer.value, -1.5, 1e-9) || 'exp');
const pn = { g: 9.8, T: 3.0 };
pn.l = (pn.g * pn.T ** 2) / (4 * Math.PI ** 2);
add('pend-num', num({
  stem: 'Dimensional analysis shows T ∝ √(l/g) for a simple pendulum, and experiment gives the constant 2π. A pendulum in a temple hall swings with a period of 3.0 s. Find its length (g = 9.8 m s⁻²), to 2 significant figures.',
  ...NV(pn.l, 2, 0.03), unit: 'm',
  sol: r`$T = 2\pi\sqrt{l/g}$ gives $l = \dfrac{g T^2}{4\pi^2} = \dfrac{9.8 \times (3.0)^2}{4\pi^2} = \dfrac{${dec(9.8 * 9, 3)}}{${dec(4 * Math.PI ** 2, 4)}} = ${dec(pn.l, 4)} \approx ${dec(roundSf(pn.l, 2), 2)}$ m.`,
  scheme: [['l = gT²/4π²', 1], [`l ≈ ${dec(roundSf(pn.l, 2), 2)} m`, 1]],
  marks: 2, d: 2, c: 'application', t: [3],
}), (q) => near(Math.pow(3.0 / (2 * Math.PI), 2) * 9.8, q.answer.value, 0.03) || 'pend');
const wv = { F: 180, mu: 0.02 };
wv.v = Math.sqrt(wv.F / wv.mu);
add('wave-num', num({
  stem: 'Dimensional analysis gives the speed of a wave on a stretched string as v = k√(F/μ), with k = 1, where F is the tension and μ the mass per unit length. Find v for F = 1.80 × 10² N and μ = 2.00 × 10⁻² kg m⁻¹ (3 significant figures).',
  ...NV(wv.v, 3), unit: 'm s⁻¹',
  sol: r`$v = \sqrt{\dfrac{F}{\mu}} = \sqrt{\dfrac{1.80 \times 10^{2}}{2.00 \times 10^{-2}}} = \sqrt{${sf(wv.F / wv.mu, 3)}} \approx ${dec(wv.v, 3)}$ m s$^{-1}$.`,
  scheme: [['Substitute F and μ', 1]],
  marks: 1, d: 2, c: 'understanding', t: [3],
}), (q) => near(Math.sqrt(1.8e2 / 2e-2), q.answer.value, 0.01) || 'wave');

// ---- short answers
const dRho = dmul(Q.density, Q.accel, dpow(L, 2));
add('homog-short', short({
  marks: 2,
  stem: 'A student writes the pressure P at depth h of a liquid of density ρ as P = ρ g h². Use the principle of homogeneity to show that this formula cannot be correct.',
  model: `The principle of homogeneity says both sides of a correct equation have the same dimensions. Here [P] = ${br(Q.pressure)}, but [ρ g h²] = ${br(dRho)}. The two differ by one power of length, so the formula is wrong; the correct one is P = ρ g h.`,
  sol: 'Compare the dimensions of both sides.',
  scheme: [[`[P] = ${br(Q.pressure)}`, 1], [`[ρ g h²] = ${br(dRho)} ≠ [P]`, 1]],
  d: 2, c: 'application', t: [3],
}), () => !deq(dRho, Q.pressure) && deq(dmul(Q.density, Q.accel, L), Q.pressure) || 'homog-short');
add('limit-short', short({
  marks: 2,
  stem: 'A friend claims that dimensional analysis proves that the kinetic energy of a body is exactly ½mv². Give two reasons why the claim is wrong.',
  model: 'First, dimensions cannot fix pure numbers: mv² and ½mv² have the same dimensions, so the factor ½ has to come from theory or experiment. Second, a consistent equation is only possibly correct. Dimensional analysis can reject a wrong formula but never prove a formula right.',
  sol: 'Cannot give numerical constants; consistency is not proof.',
  scheme: [['Dimensional analysis cannot give pure numbers such as ½', 1], ['Consistency is necessary but not sufficient', 1]],
  d: 2, c: 'evaluation', t: [3],
}));
const orb = derive(T, [L, M, Q.G]);
add('orbit-short3', short({
  marks: 3,
  stem: 'The period T of a small satellite in a circular orbit of radius r around a planet of mass M may depend on r, M and the gravitational constant G. Use dimensions to deduce the form of T, writing T = k rᵃ Mᵇ Gᶜ.',
  model: `Using [G] = ${br(Q.G)}, equate [T] = [L]ᵃ [M]ᵇ [M⁻¹ L³ T⁻²]ᶜ. Powers of M give b − c = 0, of L give a + 3c = 0 and of T give −2c = 1. Hence c = ${mn(orb[2])}, b = ${mn(orb[1])} and a = ${mn(orb[0])}, so T = k √(r³/(GM)).`,
  sol: 'Equate powers of M, L and T.',
  scheme: [['Dimensional equation with [G] = [M⁻¹ L³ T⁻²]', 1], ['Three equations for a, b, c', 1], [`a = ${mn(orb[0])}, b = ${mn(orb[1])}, c = ${mn(orb[2])}: T = k √(r³/GM)`, 1]],
  d: 3, c: 'application', t: [3],
}), () => near(orb[0], 1.5, 1e-9) && near(orb[1], -0.5, 1e-9) && near(orb[2], -0.5, 1e-9) || 'orbit');
add('consist-short3', short({
  marks: 3,
  stem: 'The elastic energy stored in a stretched spring of force constant k and extension x is given by one of the following: (i) E = ½ k x², (ii) E = ½ k x. Check both for dimensional consistency.',
  model: `The force constant is force per unit extension, so [k] = ${br(Q.springK)}. For (i), [k x²] = ${br(dmul(Q.springK, dpow(L, 2)))}, which is the dimensional formula of energy, so it is consistent. For (ii), [k x] = ${br(dmul(Q.springK, L))}, which is not the formula of energy, so (ii) cannot be correct.`,
  sol: 'Find [k] then test both formulae.',
  scheme: [[`[k] = ${br(Q.springK)}`, 1], [`(i) [k x²] = ${br(dmul(Q.springK, dpow(L, 2)))} = [E], so consistent`, 1], [`(ii) [k x] = ${br(dmul(Q.springK, L))} ≠ [E], so inconsistent`, 1]],
  d: 2, c: 'application', t: [3],
}), () => deq(dmul(Q.springK, dpow(L, 2)), Q.energy) && !deq(dmul(Q.springK, L), Q.energy) || 'consist');

// ================================================================ long answers (5 marks)
const gal = { ly: 2.5e6 };
gal.m = gal.ly * 9.46e15;
gal.pc = gal.m / 3.08e16;
add('units-long', long({
  stem: '(a) List the seven SI base quantities with their units and symbols. (b) Define the radian and the steradian, and show that each is dimensionless. (c) The Andromeda galaxy is about 2.5 × 10⁶ light years away. Express this distance in metre and in parsec. (1 ly = 9.46 × 10¹⁵ m, 1 pc = 3.08 × 10¹⁶ m.)',
  model: `(a) Length: metre (m); mass: kilogram (kg); time: second (s); electric current: ampere (A); thermodynamic temperature: kelvin (K); amount of substance: mole (mol); luminous intensity: candela (cd).

(b) One **radian** is the angle subtended at the centre of a circle by an arc equal in length to the radius: θ = s/r. One **steradian** is the solid angle subtended at the centre of a sphere by a surface area equal to r²: Ω = A/r². Each is a ratio of two like quantities (length ÷ length, area ÷ area), so neither has dimensions.

(c) d = 2.5 × 10⁶ × 9.46 × 10¹⁵ m ≈ ${pt(gal.m, 4)} ≈ ${pt(gal.m, 2)} m. In parsec: ${pt(gal.m, 4)} ÷ 3.08 × 10¹⁶ ≈ ${pt(gal.pc, 2)} pc.`,
  sol: 'Base units; definitions; conversion.',
  scheme: [['Seven base quantities with their units', 1], ['Radian and steradian defined', 1], ['Each shown dimensionless as a ratio of like quantities', 1], [`Distance in metre ≈ ${pt(gal.m, 2)} m`, 1], [`Distance in parsec ≈ ${pt(gal.pc, 2)} pc`, 1]],
  d: 2, c: 'application', t: [1], wl: null,
}), () => near(gal.m, 2.365e22, 0.001) && near(gal.pc, 7.68e5, 0.002) || 'units-long');
const cnt = { a: '0.00370', b: '2.050', c: '4800', d: '4.800e3' };
const sfl = { s: 24.6 + 3.57 + 0.118, p: 3.25 * 4.8 };
sfl.sR = roundDp(sfl.s, 1);
sfl.pR = roundSf(sfl.p, 2);
add('sf-long', long({
  stem: '(a) State the rules for counting significant figures and apply them to 0.00370, 2.050, 4800 and 4.800 × 10³. (b) Round 3.465 and 3.475 to three significant figures, stating the rule you use for a dropped 5. (c) Evaluate 24.6 + 3.57 + 0.118 and 3.25 × 4.8 with the correct number of significant figures.',
  model: `(a) Non-zero digits and zeros between them are significant; leading zeros are not; trailing zeros are significant after a decimal point but not in a number without one. So 0.00370 has ${sfCount(cnt.a)}, 2.050 has ${sfCount(cnt.b)}, 4800 has ${sfCount(cnt.c)} and 4.800 × 10³ has ${sfCount(cnt.d)}.

(b) If the dropped digit is exactly 5 with nothing after it, the last kept digit is made even. So 3.465 → ${dec(roundSf(3.465, 3), 3)} (6 is even, kept) and 3.475 → ${dec(roundSf(3.475, 3), 3)} (7 is odd, raised).

(c) A sum keeps the least decimal places: 24.6 + 3.57 + 0.118 = ${dec(sfl.s, 5)}, so ${dec(sfl.sR, 3)}. A product keeps the least significant figures: 3.25 × 4.8 = ${dec(sfl.p, 3)}, and 4.8 has two, so ${dec(sfl.pR, 2)}.`,
  sol: 'Counting rules; even-digit rounding; decimal places for sums and significant figures for products.',
  scheme: [['Rules for counting significant figures', 1], [`Counts ${sfCount(cnt.a)}, ${sfCount(cnt.b)}, ${sfCount(cnt.c)}, ${sfCount(cnt.d)}`, 1], [`Rounding: ${dec(roundSf(3.465, 3), 3)} and ${dec(roundSf(3.475, 3), 3)}`, 1], [`Sum = ${dec(sfl.sR, 3)}`, 1], [`Product = ${dec(sfl.pR, 2)}`, 1]],
  d: 2, c: 'application', t: [2], wl: null,
}), () => roundSf(3.465, 3) === 3.46 && roundSf(3.475, 3) === 3.48 && sfl.sR === 28.3 && sfl.pR === 16 && sfCount(cnt.a) === 3 && sfCount(cnt.b) === 4 && sfCount(cnt.c) === 2 && sfCount(cnt.d) === 4 || 'sf-long');
const wire = [1.42, 1.45, 1.43, 1.4, 1.45];
const wr = { mean: mean(wire), dm: meanAbsErr(wire) };
wr.rel = wr.dm / wr.mean;
wr.area = 2 * wr.rel;
add('err-long', long({
  stem: '(a) Define absolute error, relative error and percentage error. (b) A screw gauge gives the following readings for the diameter of a wire: 1.42 mm, 1.45 mm, 1.43 mm, 1.40 mm and 1.45 mm. Find the mean diameter, the mean absolute error and the percentage error in the diameter. (c) The area of cross-section is A = πd²/4. Find the percentage error in A.',
  model: `(a) The absolute error of a reading is the magnitude of its difference from the mean value. The relative error is the mean absolute error divided by the mean value, and the percentage error is the relative error multiplied by 100 %.

(b) Mean d = ${dec(wr.mean, 3)} mm. Absolute errors: ${wire.map((v) => Math.abs(wr.mean - v).toFixed(2)).join(', ')} mm, whose mean is ${dec(wr.dm, 2)} mm. Relative error = ${dec(wr.dm, 2)}/${dec(wr.mean, 3)} ≈ ${dec(wr.rel, 3)}, so the percentage error is ≈ ${dec(wr.rel * 100, 3)} %.

(c) A is proportional to d², so its relative error is twice that of d: 2 × ${dec(wr.rel * 100, 3)} % ≈ ${dec(wr.area * 100, 2)} %.`,
  sol: 'Definitions; mean absolute error; the power rule.',
  scheme: [['Three errors defined', 1], [`Mean ${dec(wr.mean, 3)} mm`, 1], [`Mean absolute error ${dec(wr.dm, 2)} mm; percentage error ≈ ${dec(wr.rel * 100, 3)} %`, 1], ['Area depends on d²: factor 2', 1], [`Percentage error in A ≈ ${dec(wr.area * 100, 2)} %`, 1]],
  d: 4, c: 'application', t: [2], wl: null,
}), () => near(wr.mean, 1.43, 1e-9) && near(wr.dm, 0.016, 1e-6) && near(wr.area * 100, 2.238, 0.002) || 'err-long');
const cf = derive(Q.force, [M, Q.velocity, L]);
add('dim-long', long({
  stem: '(a) State the principle of homogeneity of dimensions. (b) Show that the formula T = 2π √(l/g) for a simple pendulum is dimensionally consistent. (c) The centripetal force F on a body of mass m moving with speed v in a circle of radius r is F = k mᵃ vᵇ rᶜ, where k is a pure number. Use dimensions to find a, b and c.',
  model: `(a) In a correct physical equation every term has the same dimensions; only quantities of the same dimensions can be added, subtracted or equated.

(b) [l/g] = [L] ÷ ${br(Q.accel)} = [T²], so [√(l/g)] = [T]. The number 2π has no dimensions. Both sides have dimension [T], so the formula is consistent.

(c) ${br(Q.force)} = [M]ᵃ ${br(Q.velocity)}ᵇ [L]ᶜ. Mass: a = ${mn(cf[0])}. Time: −b = −2, so b = ${mn(cf[1])}. Length: b + c = 1, so c = ${mn(cf[2])}. Therefore F = k m v²/r.`,
  sol: 'Principle; pendulum check; powers of M, L and T.',
  scheme: [['Principle of homogeneity stated', 1], ['[l/g] = [T²] and its root', 1], ['T = T: consistent', 1], ['Equations for a, b and c', 1], [`a = ${mn(cf[0])}, b = ${mn(cf[1])}, c = ${mn(cf[2])}`, 1]],
  d: 4, c: 'application', t: [3], wl: null,
}), () => near(cf[0], 1) && near(cf[1], 2) && near(cf[2], -1) || 'dim-long');
const cv = { E: 1000 * 100 ** 2, P: 1.01e5 * (1000 * 100 ** -1) };
add('conv-long', long({
  stem: '(a) State two uses and two limitations of dimensional analysis. (b) A quantity with dimensions [Mᵃ Lᵇ Tᶜ] has numerical values related by n₂ = n₁ [M₁/M₂]ᵃ [L₁/L₂]ᵇ [T₁/T₂]ᶜ in two systems. Use this to show that 1 J = 10⁷ erg. (c) Convert the standard atmospheric pressure 1.01 × 10⁵ Pa into dyne cm⁻² (1 N = 10⁵ dyne).',
  model: `(a) Uses: checking whether an equation can be correct; deducing a relation among quantities; converting units from one system to another. Limitations: it cannot give numerical constants such as ½ or 2π; it cannot handle sums of terms or trigonometric, logarithmic and exponential functions.

(b) Energy has dimensions ${br(Q.energy)}. From SI (kg, m, s) to CGS (g, cm, s): n₂ = 1 × (10³)¹ × (10²)² × 1⁻² = ${pt(cv.E, 1)}, so 1 J = 10⁷ erg.

(c) Pressure has dimensions ${br(Q.pressure)}, so 1 Pa = (10³)¹ (10²)⁻¹ = 10 dyne cm⁻². Hence 1.01 × 10⁵ Pa = 1.01 × 10⁵ × 10 = ${pt(cv.P, 3)} dyne cm⁻².`,
  sol: 'Uses and limitations; conversion factors from the dimensions.',
  scheme: [['Two uses', 1], ['Two limitations', 1], ['Energy: (10³)(10²)² = 10⁷, so 1 J = 10⁷ erg', 2], [`Pressure: 1 Pa = 10 dyne cm⁻², so ${pt(cv.P, 3)} dyne cm⁻²`, 1]],
  d: 3, c: 'application', t: [3], wl: null,
}), () => near(cv.E, 1e7) && near(cv.P, 1.01e6) || 'conv-long');

// ================================================================ case-based items
const tile = { l: 4.85, b: 3.2 };
tile.area = tile.l * tile.b;
tile.R = roundSf(tile.area, 2);
tile.b3 = 3.2;
const tile2 = 4.85 * 3.2;
const tile3 = roundSf(4.85 * 3.2, 3);
add('tile-case', mk.case({
  passage: 'A contractor in Mumbai measures a room before ordering floor tiles. The length, measured with a long tape, is 4.85 m. The breadth, measured with a shorter tape, is 3.2 m. A calculator gives the product of the two readings as 15.52 m², and the contractor writes 15.52 m² on his order slip.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'Which statement about the significant figures in the area is correct?',
      right: 'The breadth has only 2 significant figures, so the area can be given to only 2 significant figures',
      wrong: ['The length has 3 significant figures, so the area may be given to 3', 'The area has 4 significant figures because the calculator shows four digits', 'The number of significant figures of the area equals the total in both readings, 5'],
      sol: 'In a product the result keeps as many significant figures as the least precise factor. The breadth 3.2 m has 2, so the area is given to 2 — option (@K).',
      d: 2, c: 'understanding', t: [2],
    })),
    part('b', num({
      stem: 'Find the area of the room in m², with the correct number of significant figures.',
      value: tile.R, tol: 0.5, unit: 'm²',
      sol: r`$4.85 \times 3.2 = ${dec(tile.area, 4)}$ m$^2$. The least precise factor has 2 significant figures, so the area is $\approx ${dec(tile.R, 2)}$ m$^2$.`,
      scheme: [[`Area = ${dec(tile.R, 2)} m²`, 1]],
      d: 2, c: 'application', t: [2],
    })),
    part('c', short({
      marks: 2,
      stem: 'Explain why the contractor should not write 15.52 m² on the order slip.',
      model: 'The breadth was measured only to the nearest tenth of a metre, so the product cannot be more precise than two significant figures. Writing 15.52 m² claims a precision of 0.01 m² that the measurements do not support. The area should be written as 16 m².',
      sol: 'Product limited by the least precise factor.',
      scheme: [['Result limited by the less precise breadth (2 significant figures)', 1], ['Claiming 15.52 m² overstates the precision; write 16 m²', 1]],
      d: 2, c: 'understanding', t: [2],
    }), [
      short({
        marks: 2,
        stem: 'The breadth is remeasured with a better tape as 3.20 m. Find the area with the correct number of significant figures and say what has changed.',
        model: `The area is 4.85 m × 3.20 m = ${dec(tile2, 4)} m². Now both factors have three significant figures, so the area is written as ${dec(tile3, 3)} m². The better tape raises the precision of the breadth, so one more significant figure is justified in the area.`,
        sol: 'Both factors have 3 significant figures.',
        scheme: [[`Area ≈ ${dec(tile3, 3)} m² (3 significant figures)`, 1], ['Better breadth measurement allows a more precise area', 1]],
        d: 3, c: 'application', t: [2],
      }),
    ]),
  ],
}), (q) => near(q.children[1].answer.value, 16, 0.04) && tile3 === 15.5 || 'tile-case');

const mars = { dE: 2.2e11, c: 2.998e8, dS: 2.28e11 };
mars.min = mars.dE / mars.c / 60;
mars.au = mars.dS / 1.496e11;
mars.ly = mars.dE / 9.46e15;
add('astro-case', mk.case({
  passage: 'When ISRO\'s Mars Orbiter was far from Earth, commands sent from Bengaluru travelled to it as radio waves at the speed of light, 2.998 × 10⁸ m s⁻¹. At one stage the spacecraft was 2.2 × 10¹¹ m from Earth, and the mean distance of Mars from the Sun is 2.28 × 10¹¹ m. Engineers quote such distances in a convenient practical unit rather than in metre.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'Which unit is most convenient for quoting distances inside the solar system?',
      right: 'The astronomical unit, 1.496 × 10¹¹ m',
      wrong: ['The angstrom, 10⁻¹⁰ m', 'The fermi, 10⁻¹⁵ m', 'The light year, 9.46 × 10¹⁵ m'],
      sol: 'Distances within the solar system are a few times 10¹¹ m, about a few astronomical units; a light year is far too large and the angstrom and fermi are tiny — option (@K).',
      d: 1, c: 'understanding', t: [1],
    })),
    part('b', num({
      stem: 'How long does a command take to reach the spacecraft when it is 2.2 × 10¹¹ m away? Give the answer in minutes to 2 significant figures.',
      ...NV(mars.min, 2), unit: 'min',
      sol: r`$t = \dfrac{d}{c} = \dfrac{2.2 \times 10^{11}}{2.998 \times 10^{8}} \approx ${dec(mars.dE / mars.c, 3)}$ s, and $\dfrac{${dec(mars.dE / mars.c, 3)}}{60} \approx ${dec(roundSf(mars.min, 2), 2)}$ min.`,
      scheme: [[`Delay ≈ ${dec(roundSf(mars.min, 2), 2)} min`, 1]],
      d: 2, c: 'application', t: [1],
    })),
    part('c', short({
      marks: 2,
      stem: 'Express the mean distance of Mars from the Sun in astronomical units and say what the number shows.',
      model: `The distance is 2.28 × 10¹¹ m ÷ 1.496 × 10¹¹ m per AU ≈ ${dec(mars.au, 3)} AU. The number shows that Mars is about one and a half times as far from the Sun as the Earth is, which is a much simpler statement than a number in metre.`,
      sol: 'Divide by the length of 1 AU.',
      scheme: [[`≈ ${dec(mars.au, 3)} AU`, 1], ['Mars is about 1.5 times as far from the Sun as the Earth', 1]],
      d: 2, c: 'application', t: [1],
    }), [
      short({
        marks: 2,
        stem: 'Explain why the light year would be an unsuitable unit for the Earth-to-spacecraft distance of 2.2 × 10¹¹ m, using the value in light years.',
        model: `One light year is 9.46 × 10¹⁵ m, so the distance is 2.2 × 10¹¹ ÷ 9.46 × 10¹⁵ ≈ ${pt(mars.ly, 2)} light years. This is an awkward tiny decimal, so the light year is suited to stars, not to distances within the solar system, where the astronomical unit is the natural choice.`,
        sol: 'Light year too large for this scale.',
        scheme: [[`Distance ≈ ${pt(mars.ly, 2)} ly: a tiny awkward number`, 1], ['The light year suits stellar distances; the AU suits the solar system', 1]],
        d: 3, c: 'evaluation', t: [1],
      }),
    ]),
  ],
}), (q) => near(mars.min, 12.23, 0.005) && near(mars.au, 1.524, 0.002) && near(q.children[1].answer.value, 12, 0.05) || 'astro-case');

const fall = { h: 45, g: 9.8 };
fall.t = Math.sqrt((2 * fall.h) / fall.g);
add('fall-case', mk.case({
  passage: 'A physics club in Nashik wants a formula for the time t taken by a stone to fall from rest through a height h under gravity g. One member proposes t = √(2h/g); another proposes t = √(2g/h). The club then drops a stone from a bridge 45 m above a river, taking g = 9.8 m s⁻².',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'Which proposal is dimensionally consistent?',
      right: 't = √(2h/g), because [h/g] = [T²]',
      wrong: ['t = √(2g/h), because [g/h] = [T²]', 'Both, because the factor 2 has no dimensions', 'Neither, because g and h have different dimensions'],
      sol: `[h/g] = [L] ÷ ${br(Q.accel)} = [T²], so √(2h/g) has dimension [T]. For the other, [g/h] = [T⁻²] and its root has dimension [T⁻¹] — option (@K).`,
      d: 2, c: 'application', t: [3],
    })),
    part('b', num({
      stem: 'Find the time of fall from the 45 m bridge using the consistent formula, in seconds (3 significant figures).',
      ...NV(fall.t, 3), unit: 's',
      sol: r`$t = \sqrt{\dfrac{2h}{g}} = \sqrt{\dfrac{2 \times 45}{9.8}} = \sqrt{${dec((2 * fall.h) / fall.g, 4)}} \approx ${dec(fall.t, 3)}$ s.`,
      scheme: [[`t ≈ ${dec(fall.t, 3)} s`, 1]],
      d: 2, c: 'application', t: [3],
    })),
    part('c', short({
      marks: 2,
      stem: 'Show by dimensions why the second proposal, t = √(2g/h), must be rejected.',
      model: `For the second proposal, [2g/h] = ${br(Q.accel)} ÷ [L] = [T⁻²], so its square root has dimension [T⁻¹], that of a frequency, not of a time. Since the left side t has dimension [T], the equation is not homogeneous and cannot be correct.`,
      sol: 'Compare [t] with [√(g/h)].',
      scheme: [['[g/h] = [T⁻²], so the root has dimension [T⁻¹]', 1], ['Not equal to [T], so the equation is inhomogeneous and rejected', 1]],
      d: 2, c: 'application', t: [3],
    }), [
      short({
        marks: 2,
        stem: 'A member says: "Since t = √(2h/g) passes the dimensional test, it is certainly correct." Evaluate this claim.',
        model: 'The claim is not justified. A dimensional test can only show that a formula is possibly correct. A formula such as t = √(h/g) or t = √(4h/g) would pass the same test, because pure numbers have no dimensions. The factor 2 must come from the equations of motion or from experiment.',
        sol: 'Consistency does not prove correctness.',
        scheme: [['Dimensional consistency is necessary, not sufficient', 1], ['Pure numbers such as 2 cannot be tested; they come from theory or experiment', 1]],
        d: 3, c: 'evaluation', t: [3],
      }),
    ]),
  ],
}), (q) => near(fall.t, 3.03, 0.002) && deq(ddiv(L, Q.accel), dpow(T, 2)) && near(q.children[1].answer.value, 3.03, 0.01) || 'fall-case');

const osc = [36.0, 35.6, 36.4, 35.8, 36.2];
const lb = { mean: mean(osc), dm: meanAbsErr(osc) };
lb.pct = (lb.dm / lb.mean) * 100;
lb.Tpct = lb.pct;
lb.gpct = 0.5 + 2 * lb.pct;
add('lab-case', mk.case({
  passage: 'In a school laboratory in Pune, students find the period of a pendulum of length 0.800 m by timing 20 complete oscillations with a stopwatch. Five students record 36.0 s, 35.6 s, 36.4 s, 35.8 s and 36.2 s. They use the mean time to calculate the period T and then g = 4π²l/T².',
  d: 4, c: 'application',
  children: [
    part('a', mcq({
      stem: 'Timing 20 oscillations instead of one is done mainly to',
      right: 'reduce the percentage error caused by the observer\'s reaction time',
      wrong: ['remove the zero error of the stopwatch', 'make the pendulum swing at a larger amplitude', 'increase the least count of the stopwatch'],
      sol: 'The reaction-time error is about the same for one swing or for twenty, so it is a much smaller fraction of the longer time — option (@K).',
      d: 2, c: 'understanding', t: [2],
    })),
    part('b', num({
      stem: 'Find the percentage error in the mean time for 20 oscillations, using the mean absolute error (3 significant figures).',
      ...NV(lb.pct, 3), unit: '%',
      sol: r`Mean $= ${dec(lb.mean, 3)}$ s. Absolute errors: ${osc.map((v) => `$${Math.abs(lb.mean - v).toFixed(1)}$`).join(', ')} s, with mean $\dfrac{${osc.map((v) => Math.abs(lb.mean - v)).reduce((s, e) => s + e, 0).toFixed(1)}}{5} = ${dec(lb.dm, 2)}$ s. Percentage error $= \dfrac{${dec(lb.dm, 2)}}{${dec(lb.mean, 3)}} \times 100 \approx ${dec(lb.pct, 3)}\ \%$.`,
      scheme: [[`Percentage error ≈ ${dec(lb.pct, 3)} %`, 1]],
      d: 2, c: 'application', t: [2],
    })),
    part('c', short({
      marks: 2,
      stem: `The length 0.800 m is known to 0.50 % and the time of 20 oscillations to ${dec(lb.pct, 3)} %. Find the percentage error in g = 4π²l/T².`,
      model: `Because T appears squared, the relative error in g is 0.50 % + 2 × ${dec(lb.pct, 3)} %. This gives ${dec(0.5 + 2 * lb.pct, 3)} %. The error in the time, counted twice, contributes most.`,
      sol: 'Add the relative error of l and twice that of T.',
      scheme: [['Δg/g = Δl/l + 2ΔT/T', 1], [`Percentage error in g ≈ ${dec(lb.gpct, 3)} %`, 1]],
      d: 3, c: 'application', t: [2],
    }), [
      short({
        marks: 2,
        stem: 'A student suggests timing 40 oscillations instead of 20 would roughly halve the percentage error in the time. Evaluate this suggestion.',
        model: 'The suggestion is reasonable. The reaction-time error in starting and stopping the watch stays about the same, while the total time doubles, so the percentage error in the total time roughly halves. Since g depends on the square of T, a smaller error in T makes g more reliable.',
        sol: 'Same absolute error over twice the time.',
        scheme: [['Absolute reaction-time error stays about the same while the time doubles', 1], ['So the percentage error roughly halves; the suggestion is sound', 1]],
        d: 3, c: 'evaluation', t: [2],
      }),
    ]),
  ],
}), (q) => near(lb.mean, 36.0, 1e-9) && near(lb.dm, 0.24, 1e-6) && near(lb.pct, 0.667, 0.002) && near(lb.gpct, 1.833, 0.002) && near(q.children[1].answer.value, 0.667, 0.01) || 'lab-case');
void [roundDp, sf, PARSEC, LY, AU, D, ar, tf, fill];
