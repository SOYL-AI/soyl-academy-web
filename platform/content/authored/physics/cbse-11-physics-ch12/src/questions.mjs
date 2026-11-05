// ch12 Kinetic Theory — question bank, part 1: t01 (equation of state, gas laws) and t02 (kinetic theory, pressure, temperature, rms speed).
// Every numerical is computed here and re-solved by an independent `check`; solutions and schemes print the computed values.
// AR keys across the chapter: a (press), d (samet), a (avog), c (cpcv), b (mayer).
import { mk, add, r, dec, sci, near } from '../../cbse-11-physics-ch01/src/lib.mjs';
import { R, KB, NA, ATM, G, ZERO_C, EV, idealP, vrmsM, vrmsM2, meanOf, rmsOf, wallPressure, v3, tl, sciu } from './phys.mjs';

const { mcq, ar, tf, fill, num, short } = mk;

// ================================================================ t01 equation of state, gas laws
add('isotherm-mcq', mcq({
  stem: 'A sample of 1 mol of an ideal gas is taken along two isotherms on a P–V graph, one at 300 K and one at 400 K. At the same volume, the pressure on the 400 K isotherm is',
  right: '4/3 times the pressure on the 300 K isotherm',
  wrong: ['equal to it, because P V is constant for an ideal gas', 'less than it, because a hotter gas expands', 'greater than it by 100 kPa for every volume'],
  sol: 'At fixed n and V, P = nRT/V is proportional to T, so P(400)/P(300) = 400/300 = 4/3. P V is constant along one isotherm, not between two of them — option (@K).',
  d: 2, c: 'understanding', t: [1],
}), () => near(400 / 300, 4 / 3, 1e-12) || 'iso');
add('pv-mcq', mcq({
  stem: 'A fixed amount of an ideal gas has its volume halved while its absolute temperature is doubled. The pressure becomes',
  right: 'four times the original value',
  wrong: ['twice the original value', 'equal to the original value', 'one quarter of the original value'],
  sol: 'P = nRT/V, so P2/P1 = (T2/T1)(V1/V2) = 2 × 2 = 4 — option (@K).',
  d: 3, c: 'application', t: [1],
}), () => (2 * 1) / 0.5 === 4 && idealP(1, 600, 0.5) / idealP(1, 300, 1) === 4 || 'pv');
add('charles-mcq', mcq({
  stem: 'The volume of a fixed amount of gas is measured at constant pressure at several temperatures. A graph that is a straight line passing through the origin is obtained by plotting the volume against',
  right: 'the temperature on the kelvin scale',
  wrong: ['the temperature on the Celsius scale', 'the reciprocal of the kelvin temperature', 'the pressure of the gas'],
  sol: 'V = (nR/P) T, so V is proportional to the kelvin temperature. On the Celsius scale the line is straight but cuts the axis at −273 °C — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('realgas-mcq', mcq({
  stem: 'A chemical engineer in a fertiliser plant wants to treat ammonia vapour as an ideal gas. Which choice of conditions makes this approximation best?',
  right: 'Low pressure and a temperature well above the boiling point',
  wrong: ['High pressure and a temperature just above the boiling point', 'High pressure and a very low temperature', 'Low pressure and a temperature just above the boiling point'],
  sol: 'A real gas is closest to ideal when the molecules are far apart (low pressure) and move fast (high temperature), so that their size and attractions do not matter — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('celsius-tf', tf({
  stem: 'In P V = n R T the temperature of a sample at 27 °C may be entered directly as T = 27 when P is in pascal, V in cubic metre and R = 8.314 J mol⁻¹ K⁻¹.',
  key: 'f',
  sol: 'False. T must be the absolute temperature: T = 27 + 273 = 300 K. Using 27 would make the pressure about eleven times too small.',
  d: 1, c: 'recall', t: [1],
}));
add('boltz-fill', fill({
  stem: 'Written for N molecules, the gas equation is P V = N k T, where k = R/N_A is a constant named after the Austrian physicist ___.',
  acc: [['Boltzmann', 'Ludwig Boltzmann', 'boltzmann']],
  sol: 'The constant is the **Boltzmann** constant, k_B = 1.38 × 10⁻²³ J K⁻¹.',
  d: 1, c: 'recall', t: [1],
}));
const tank = { n: 2.5, V: 0.02, t: 27 };
tank.T = tank.t + ZERO_C;
tank.P = idealP(tank.n, tank.T, tank.V);
add('tank-num', num({
  stem: 'A steel cylinder of volume 20.0 L holds 2.5 mol of oxygen at 27 °C. Taking R = 8.314 J mol⁻¹ K⁻¹, find the pressure of the gas in kPa (3 significant figures).',
  value: v3(tank.P / 1000), tol: tl(tank.P / 1000), unit: 'kPa',
  sol: r`$T = 27 + 273 = ${tank.T}$ K and $V = 20.0$ L $= ${tank.V}$ m$^3$. $P = \dfrac{n R T}{V} = \dfrac{${tank.n} \times 8.314 \times ${tank.T}}{${tank.V}} = ${dec(tank.P, 6)}$ Pa $= ${dec(tank.P / 1000, 3)}$ kPa.`,
  scheme: [['T = 300 K and V = 0.020 m³ (SI units)', 1], [`P = nRT/V = ${dec(tank.P, 6)} Pa = ${dec(tank.P / 1000, 3)} kPa`, 1]],
  marks: 2, d: 2, c: 'application', t: [1],
}), (q) => near((tank.n * KB * NA * 300) / 0.02 / 1000, q.answer.value, 0.01) || 'tank');
const bal = { P: 1.0e5, V: 25, t: 7, M: 4.0e-3 };
bal.T = bal.t + ZERO_C;
bal.n = (bal.P * bal.V) / (R * bal.T);
bal.m = bal.n * bal.M;
add('balloon-num', num({
  stem: 'A weather balloon of volume 25 m³ is filled with helium (molar mass 4.0 g mol⁻¹) at 1.0 × 10⁵ Pa and 7 °C. Taking R = 8.314 J mol⁻¹ K⁻¹, find the mass of helium in kg (3 significant figures).',
  value: v3(bal.m), tol: tl(bal.m), unit: 'kg',
  sol: r`$T = 7 + 273 = ${bal.T}$ K. $n = \dfrac{P V}{R T} = \dfrac{1.0 \times 10^5 \times 25}{8.314 \times ${bal.T}} = ${dec(bal.n, 4)}$ mol. Mass $= n M = ${dec(bal.n, 4)} \times 4.0 \times 10^{-3} = ${dec(bal.m, 3)}$ kg.`,
  scheme: [['T = 280 K; n = PV/RT', 1], [`n ≈ ${dec(bal.n, 4)} mol`, 1], [`Mass = nM = ${dec(bal.m, 3)} kg`, 1]],
  marks: 3, d: 3, c: 'application', t: [1],
}), (q) => near(((bal.P * bal.V) / (KB * NA * 280)) * 4.0e-3, q.answer.value, 0.01) || 'balloon');
const tyre = { P1: 220, t1: 27, t2: 47 };
tyre.P2 = (tyre.P1 * (tyre.t2 + ZERO_C)) / (tyre.t1 + ZERO_C);
add('tyre-num', num({
  stem: 'The air in a bus tyre is at an absolute pressure of 220 kPa and 27 °C on a cool morning in Jaipur. After a long run the air is at 47 °C. Assuming the volume of the air does not change, find its new pressure in kPa.',
  value: v3(tyre.P2), tol: tl(tyre.P2), unit: 'kPa',
  sol: r`At constant volume and amount, $\dfrac{P_1}{T_1} = \dfrac{P_2}{T_2}$ with $T_1 = ${tyre.t1 + ZERO_C}$ K and $T_2 = ${tyre.t2 + ZERO_C}$ K. $P_2 = 220 \times \dfrac{${tyre.t2 + ZERO_C}}{${tyre.t1 + ZERO_C}} = ${dec(tyre.P2, 3)}$ kPa.`,
  scheme: [['Kelvin temperatures 300 K and 320 K; P/T constant', 1], [`P₂ = ${dec(tyre.P2, 3)} kPa`, 1]],
  marks: 2, d: 2, c: 'application', t: [1],
}), (q) => near(220 * (320 / 300), q.answer.value, 0.005) || 'tyre');
const den = { P: ATM, T: 300, M: 0.028 };
den.rho = (den.P * den.M) / (R * den.T);
add('density-num', num({
  stem: 'Treating nitrogen (molar mass 28 g mol⁻¹) as an ideal gas at 1.013 × 10⁵ Pa and 300 K, find its density in kg m⁻³ (3 significant figures). Use R = 8.314 J mol⁻¹ K⁻¹.',
  value: v3(den.rho), tol: tl(den.rho), unit: 'kg/m³',
  sol: r`With $n = m/M$, $P V = \dfrac{m}{M} R T$, so $\rho = \dfrac{m}{V} = \dfrac{P M}{R T} = \dfrac{1.013 \times 10^5 \times 0.028}{8.314 \times 300} = ${dec(den.rho, 3)}$ kg m$^{-3}$.`,
  scheme: [['ρ = PM/RT from the gas equation with n = m/M', 1], [`ρ = ${dec(den.rho, 3)} kg m⁻³`, 1]],
  marks: 2, d: 3, c: 'application', t: [1],
}), (q) => near((ATM / (KB * 300)) * (0.028 / NA), q.answer.value, 0.01) || 'density');
const cy = { V: 0.03, P1: 1.2e6, P2: 0.8e6, T: 300, M: 0.032 };
cy.dn = ((cy.P1 - cy.P2) * cy.V) / (R * cy.T);
cy.dm = cy.dn * cy.M * 1000;
add('cyl-num', num({
  stem: 'A welder\'s cylinder of volume 30 L holds oxygen (molar mass 32 g mol⁻¹) at 1.2 × 10⁶ Pa and 300 K. After some gas is used, the pressure falls to 0.80 × 10⁶ Pa at the same temperature. Find the mass of oxygen used, in g (3 significant figures; R = 8.314 J mol⁻¹ K⁻¹).',
  value: v3(cy.dm), tol: tl(cy.dm), unit: 'g',
  sol: r`At fixed $V$ and $T$, $n = \dfrac{P V}{R T}$, so the amount used is $\Delta n = \dfrac{(P_1 - P_2) V}{R T} = \dfrac{(1.2 - 0.80) \times 10^6 \times 0.030}{8.314 \times 300} = ${dec(cy.dn, 4)}$ mol. Mass $= \Delta n \times 32$ g mol$^{-1}$ $= ${dec(cy.dm, 3)}$ g.`,
  scheme: [['V = 0.030 m³; n = PV/RT before and after', 1], [`Δn = (P₁ − P₂)V/RT = ${dec(cy.dn, 4)} mol`, 1], [`Mass used = Δn × 32 = ${dec(cy.dm, 3)} g`, 1]],
  marks: 3, d: 4, c: 'application', t: [1],
}), (q) => near(((cy.P1 * cy.V) / (R * cy.T) - (cy.P2 * cy.V) / (R * cy.T)) * 32, q.answer.value, 0.005) || 'cyl');
const bub = { V0: 8.0, h: 15, rho: 1000 };
bub.Pb = ATM + bub.rho * G * bub.h;
bub.Vb = (bub.V0 * ATM) / bub.Pb;
add('bubble-num', num({
  stem: 'An air bubble of volume 8.0 cm³ at the surface of a lake (pressure 1.013 × 10⁵ Pa) sinks to a depth of 15 m. Assuming the temperature of the air in the bubble does not change, find its volume at that depth in cm³. Take the density of water as 1000 kg m⁻³ and g = 9.8 m s⁻².',
  value: v3(bub.Vb), tol: tl(bub.Vb), unit: 'cm³',
  sol: r`Pressure at depth: $P = P_0 + \rho g h = 1.013 \times 10^5 + 1000 \times 9.8 \times 15 = ${dec(bub.Pb, 4)}$ Pa. At constant $T$ and $n$, $P_1 V_1 = P_2 V_2$, so $V_2 = 8.0 \times \dfrac{1.013 \times 10^5}{${dec(bub.Pb, 4)}} = ${dec(bub.Vb, 3)}$ cm$^3$.`,
  scheme: [['Pressure at depth P₀ + ρgh', 1], [`Boyle's law: V₂ = V₁P₁/P₂ = ${dec(bub.Vb, 3)} cm³`, 1]],
  marks: 2, d: 3, c: 'application', t: [1],
}), (q) => near(8.0 / (1 + (1000 * 9.8 * 15) / 1.013e5), q.answer.value, 0.005) || 'bubble');
add('boylecharles-short', short({
  marks: 2,
  stem: 'Show that Boyle\'s law and Charles\' law follow from the ideal gas equation.',
  model: 'The ideal gas equation is **P V = n R T**. For a fixed amount of gas at constant temperature the right-hand side is constant, so **P V = constant** (Boyle). At constant pressure, **V/T = nR/P** is constant, so V is proportional to the absolute temperature (Charles).',
  sol: 'PV = nRT: T fixed gives PV constant; P fixed gives V/T constant.',
  scheme: [['Constant n and T: P V = nRT = constant (Boyle)', 1], ['Constant n and P: V/T = nR/P = constant (Charles), T in kelvin', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('real-short', short({
  marks: 2,
  stem: 'Give two reasons why a real gas deviates from ideal behaviour when it is compressed to a high pressure or cooled to a low temperature.',
  model: 'An ideal gas assumes point molecules with no mutual forces. At **high pressure** the molecules are crowded, so their own volume is no longer negligible compared with the container. At **low temperature** they move slowly, so the **attractive forces** between them matter and the gas may liquefy.',
  sol: 'Finite size of molecules at high pressure; attractions at low temperature.',
  scheme: [['High pressure: molecular volume not negligible', 1], ['Low temperature: intermolecular attractions matter (liquefaction)', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('isotherm-short3', short({
  marks: 3,
  stem: 'Describe the shape of the P–V graph of a fixed amount of an ideal gas at two temperatures T₁ < T₂ drawn on the same axes, and explain how the two curves are placed relative to each other.',
  model: 'Each curve is a **rectangular hyperbola** because P V = nRT is constant at constant temperature, so P falls as V increases and neither axis is cut. Each is called an **isotherm**. At any given volume the pressure P = nRT/V is proportional to T, so the T₂ curve lies **above** the T₁ curve everywhere, and the curves never cross.',
  sol: 'Hyperbolas; hotter isotherm lies higher.',
  scheme: [['Hyperbola: PV = nRT constant on one isotherm', 1], ['P ∝ T at fixed V, so higher T gives the higher curve', 1], ['Curves do not intersect; isotherms never cross', 1]],
  d: 3, c: 'understanding', t: [1],
}));

// ================================================================ t02 kinetic theory
add('assume-mcq', mcq({
  stem: 'Which one of the following is NOT an assumption made in the kinetic theory of an ideal gas?',
  right: 'The molecules attract one another with a force that increases as they come closer',
  wrong: ['Collisions of the molecules with the walls of the vessel are elastic', 'The volume of the molecules is negligible compared with the volume of the container', 'The molecules move at random and no direction of motion is preferred'],
  sol: 'The model assumes no forces between molecules except during collisions. The other three statements are assumptions of the model — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('vsq-mcq', mcq({
  stem: 'A fixed number of molecules of an ideal gas is kept in a closed rigid vessel, and every molecule is made to move twice as fast. The pressure on the walls becomes',
  right: 'four times the original value',
  wrong: ['twice the original value', 'equal to the original value', 'one half of the original value'],
  sol: 'P = (1/3)(N/V) m v̄² with N, V and m fixed, so P is proportional to v̄². Doubling every speed multiplies v̄² by 4 — option (@K).',
  d: 2, c: 'application', t: [2],
}), () => 2 ** 2 === 4 || 'vsq');
add('meanrms-mcq', mcq({
  stem: 'The molecules of a gas in a closed vessel have a range of speeds. If v̄ is the mean speed and v_rms the root-mean-square speed, then',
  right: 'v_rms is greater than v̄ unless all the molecules have the same speed',
  wrong: ['v_rms is always equal to v̄', 'v_rms is always less than v̄', 'v_rms is zero because the molecules move in all directions'],
  sol: 'Squaring gives extra weight to the faster molecules, so the root of the mean of the squares is never less than the mean of the speeds; they are equal only if all speeds are equal. Velocities cancel in direction, speeds do not — option (@K).',
  d: 3, c: 'understanding', t: [2],
}));
add('meanvel-mcq', mcq({
  stem: 'A gas is at rest in a closed cylinder on a table. The mean (vector) velocity of its molecules is',
  right: 'zero, because the molecules move equally in all directions',
  wrong: ['equal to the rms speed of the molecules', 'equal to the mean speed of the molecules', 'one third of the rms speed'],
  sol: 'For every molecule moving one way there is another moving the opposite way on average, so the vector sum of the velocities is zero (the speeds do not cancel) — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('sameke-mcq', mcq({
  stem: 'A sealed bottle contains a mixture of hydrogen and oxygen in thermal equilibrium at 300 K. Compared with an oxygen molecule, the mean translational kinetic energy of a hydrogen molecule is',
  right: 'equal',
  wrong: ['four times as large, since hydrogen molecules are four times as fast', 'sixteen times as large, since hydrogen is sixteen times lighter', 'one quarter as large, since hydrogen is lighter'],
  sol: 'The mean translational energy (3/2)k_B T depends only on temperature, not on the kind of molecule. Hydrogen is faster (by a factor 4) but lighter by the compensating factor 16 — option (@K).',
  d: 3, c: 'understanding', t: [2],
}), () => near(Math.sqrt(32 / 2), 4, 1e-12) || 'ke');
const hd = { t1: 27, t2: 54 };
hd.ratio = Math.sqrt((hd.t2 + ZERO_C) / (hd.t1 + ZERO_C));
add('tempdoub-mcq', mcq({
  stem: 'A gas in a sealed cylinder is heated from 27 °C to 54 °C. The rms speed of its molecules becomes about',
  right: `${dec(hd.ratio, 3)} times the original value`,
  wrong: ['2 times the original value', '1.41 times the original value', 'the same as the original value'],
  sol: r`$v_\text{rms} \propto \sqrt{T}$ with $T$ in kelvin: $\sqrt{327/300} = ${dec(hd.ratio, 3)}$. Doubling the Celsius value does not double the kelvin temperature — option (@K).`,
  d: 3, c: 'application', t: [2],
}), () => near(Math.sqrt(327 / 300), 1.044, 0.001) || 'hd');
add('press-ar', ar({
  a: 'A gas in a closed vessel exerts a steady pressure on the walls even though each molecule strikes a wall only now and then.',
  r: 'The number of molecules is so large that their many small impacts every second average out to a steady force.',
  key: 'a',
  sol: 'Both are true and R explains A: pressure is the average momentum transferred per unit time and area by an enormous number of molecules — option (a).',
  d: 2, c: 'understanding', t: [2],
}));
add('samet-ar', ar({
  a: 'At 300 K the rms speed of hydrogen molecules is the same as that of oxygen molecules.',
  r: 'At a given temperature all ideal gas molecules have the same mean translational kinetic energy.',
  key: 'd',
  sol: 'R is true, but because the molar masses differ, v_rms = √(3RT/M) differs (hydrogen is 4 times faster than oxygen); A is false — option (d).',
  d: 2, c: 'understanding', t: [2],
}));
add('heavy-tf', tf({
  stem: 'At the same temperature, the rms speed of the molecules of the heavier of two ideal gases is smaller than that of the lighter one.',
  key: 't',
  sol: 'True. v_rms = √(3RT/M) decreases as the molar mass M increases at a fixed temperature.',
  d: 1, c: 'understanding', t: [2],
}));
add('rms-fill', fill({
  stem: 'The square root of the average of the squares of the speeds of all the molecules of a gas is called its ___ speed.',
  acc: [['root mean square', 'root-mean-square', 'rms', 'r.m.s.']],
  sol: 'It is the **root-mean-square** (rms) speed.',
  d: 1, c: 'recall', t: [2],
}));
const ar_ = { M: 0.04, T: 300 };
ar_.v = vrmsM(ar_.T, ar_.M);
add('vrms-num', num({
  stem: 'Argon (molar mass 40 g mol⁻¹) fills an electric bulb. Find the rms speed of its atoms at 27 °C, in m s⁻¹ (3 significant figures; R = 8.314 J mol⁻¹ K⁻¹).',
  value: v3(ar_.v), tol: tl(ar_.v), unit: 'm/s',
  sol: r`$v_\text{rms} = \sqrt{\dfrac{3 R T}{M}} = \sqrt{\dfrac{3 \times 8.314 \times ${ar_.T}}{0.040}} = \sqrt{${dec(3 * R * ar_.T / ar_.M, 6)}} = ${dec(ar_.v, 3)}$ m s$^{-1}$.`,
  scheme: [['T = 300 K; v_rms = √(3RT/M) with M in kg', 1], [`v_rms = ${dec(ar_.v, 3)} m/s`, 1]],
  marks: 2, d: 3, c: 'application', t: [2],
}), (q) => near(vrmsM2(300, 0.04 / NA), q.answer.value, 0.005) || 'vrms');
const esc = { M: 2.0e-3, v: 2400 };
esc.T = (esc.M * esc.v ** 2) / (3 * R);
add('escape-num', num({
  stem: 'The escape speed from the Moon\'s surface is 2.4 × 10³ m s⁻¹. At what temperature would the rms speed of hydrogen molecules (molar mass 2.0 g mol⁻¹) equal this speed? Give the answer in K (3 significant figures; R = 8.314 J mol⁻¹ K⁻¹).',
  value: v3(esc.T), tol: tl(esc.T), unit: 'K',
  sol: r`$v_\text{rms}^2 = \dfrac{3 R T}{M}$, so $T = \dfrac{M v_\text{rms}^2}{3 R} = \dfrac{2.0 \times 10^{-3} \times (2400)^2}{3 \times 8.314} = \dfrac{${dec(esc.M * esc.v ** 2, 5)}}{${dec(3 * R, 5)}} = ${dec(esc.T, 3)}$ K.`,
  scheme: [['T = M v²/(3R) with M = 2.0 × 10⁻³ kg mol⁻¹', 1], [`Numerator ${dec(esc.M * esc.v ** 2, 5)} and denominator ${dec(3 * R, 4)}`, 1], [`T = ${dec(esc.T, 3)} K`, 1]],
  marks: 3, d: 3, c: 'application', t: [2],
}), (q) => near(vrmsM(q.answer.value, esc.M), 2400, 0.01) || 'esc');
const pk = { N: 1.0e23, m: 5.0e-26, v: 400, V: 2.0e-3 };
pk.P = (pk.N * pk.m * pk.v ** 2) / (3 * pk.V);
add('pkin-num', num({
  stem: 'A vessel of volume 2.0 L contains 1.0 × 10²³ molecules of a gas, each of mass 5.0 × 10⁻²⁶ kg, with an rms speed of 400 m s⁻¹. Find the pressure of the gas in kPa (3 significant figures).',
  value: v3(pk.P / 1000), tol: tl(pk.P / 1000), unit: 'kPa',
  sol: r`$V = 2.0$ L $= 2.0 \times 10^{-3}$ m$^3$. $P = \dfrac{1}{3}\dfrac{N m \overline{v^2}}{V} = \dfrac{1.0 \times 10^{23} \times 5.0 \times 10^{-26} \times 400^2}{3 \times 2.0 \times 10^{-3}} = ${dec(pk.P, 6)}$ Pa $= ${dec(pk.P / 1000, 3)}$ kPa.`,
  scheme: [['P = N m v²/(3V), V in m³', 1], [`P = ${dec(pk.P, 6)} Pa = ${dec(pk.P / 1000, 3)} kPa`, 1]],
  marks: 2, d: 2, c: 'application', t: [2],
}), (q) => near(wallPressure(2000, pk.m * (pk.N / 2000), pk.v, Math.cbrt(pk.V)) / 1000, q.answer.value, 0.005) || 'pkin');
const ke = { t: 37 };
ke.T = ke.t + ZERO_C;
ke.E = 1.5 * KB * ke.T;
add('ke-num', num({
  stem: 'Gas in the lungs of a healthy person is at body temperature, 37 °C. Find the mean translational kinetic energy of a molecule of an ideal gas at this temperature, in units of 10⁻²¹ J (3 significant figures; k_B = 1.38 × 10⁻²³ J K⁻¹).',
  value: v3(ke.E * 1e21), tol: tl(ke.E * 1e21), unit: '10⁻²¹ J',
  sol: r`$T = 37 + 273 = ${ke.T}$ K. $E = \tfrac{3}{2} k_B T = 1.5 \times 1.38 \times 10^{-23} \times ${ke.T} = ${sci(ke.E, 3)}$ J. In units of $10^{-21}$ J: $E = ${dec(ke.E * 1e21, 3)}$.`,
  scheme: [['T = 310 K; E = (3/2) k_B T', 1], [`E = ${sciu(ke.E, 3)} J`, 1]],
  marks: 2, d: 2, c: 'application', t: [2],
}), (q) => near(1.5 * (R / NA) * ke.T, q.answer.value * 1e-21, 0.005) || 'ke');
const ev = { E: EV };
ev.T = (2 * ev.E) / (3 * KB);
add('ev-num', num({
  stem: 'At what temperature would the mean translational kinetic energy of a gas molecule equal 1.0 eV? Take 1 eV = 1.6 × 10⁻¹⁹ J and k_B = 1.38 × 10⁻²³ J K⁻¹. Give the answer in K (3 significant figures).',
  value: v3(ev.T), tol: tl(ev.T), unit: 'K',
  sol: r`$\tfrac{3}{2} k_B T = 1.6 \times 10^{-19}$ J, so $T = \dfrac{2 \times 1.6 \times 10^{-19}}{3 \times 1.38 \times 10^{-23}} = \dfrac{${sci(2 * ev.E, 3)}}{${sci(3 * KB, 3)}} = ${dec(ev.T, 3)}$ K.`,
  scheme: [['(3/2) k_B T = 1.6 × 10⁻¹⁹ J', 1], [`T = 2E/(3k_B) = ${dec(ev.T, 3)} K`, 1]],
  marks: 2, d: 3, c: 'application', t: [2],
}), (q) => near(1.5 * KB * q.answer.value, EV, 0.005) || 'ev');
const v12 = { t1: -23, k: 1.2 };
v12.T1 = v12.t1 + ZERO_C;
v12.T2 = v12.T1 * v12.k ** 2;
v12.t2 = Math.round((v12.T2 - ZERO_C) * 1e6) / 1e6;
add('vrms12-num', num({
  stem: 'A gas sealed in a flask at −23 °C is warmed until the rms speed of its molecules is 1.2 times its value at −23 °C. Find the new temperature in °C.',
  value: v12.t2, tol: 0.5, unit: '°C',
  sol: r`$T_1 = -23 + 273 = ${v12.T1}$ K. Since $v_\text{rms} \propto \sqrt{T}$, $T_2 = T_1 \times 1.2^2 = ${v12.T1} \times ${dec(v12.k ** 2, 3)} = ${dec(v12.T2, 3)}$ K. In degrees Celsius $t_2 = ${dec(v12.T2, 3)} - 273 = ${v12.t2}$ °C.`,
  scheme: [['T₁ = 250 K; T₂/T₁ = (v₂/v₁)² = 1.44', 1], [`T₂ = ${dec(v12.T2, 3)} K = ${v12.t2} °C`, 1]],
  marks: 2, d: 3, c: 'application', t: [2],
}), (q) => near(vrmsM(q.answer.value + 273, 0.03) / vrmsM(250, 0.03), 1.2, 0.001) || 'v12');
const dl = { n1: 2.0, n2: 3.0, V: 0.05, t: 27 };
dl.T = dl.t + ZERO_C;
dl.P1 = idealP(dl.n1, dl.T, dl.V);
dl.P2 = idealP(dl.n2, dl.T, dl.V);
dl.P = dl.P1 + dl.P2;
add('dalton-num', num({
  stem: 'A rigid vessel of volume 0.050 m³ at 27 °C holds a mixture of 2.0 mol of hydrogen and 3.0 mol of helium. Taking both as ideal gases and R = 8.314 J mol⁻¹ K⁻¹, find the total pressure of the mixture in kPa (3 significant figures).',
  value: v3(dl.P / 1000), tol: tl(dl.P / 1000), unit: 'kPa',
  sol: r`Each gas fills the whole vessel. $P_1 = \dfrac{2.0 \times 8.314 \times ${dl.T}}{0.050} = ${dec(dl.P1, 5)}$ Pa $= ${dec(dl.P1 / 1000, 4)}$ kPa and $P_2 = \dfrac{3.0 \times 8.314 \times ${dl.T}}{0.050} = ${dec(dl.P2, 5)}$ Pa $= ${dec(dl.P2 / 1000, 4)}$ kPa. By Dalton's law $P = P_1 + P_2 = ${dec(dl.P / 1000, 3)}$ kPa.`,
  scheme: [['Partial pressures P₁ and P₂ from P = nRT/V', 1], [`Dalton: total = ${dec(dl.P1 / 1000, 4)} + ${dec(dl.P2 / 1000, 4)} = ${dec(dl.P / 1000, 3)} kPa`, 1]],
  marks: 2, d: 3, c: 'application', t: [2],
}), (q) => near(idealP(5, 300, 0.05) / 1000, q.answer.value, 0.005) || 'dl');
const sr = { v: [300, 400, 500, 600, 700] };
sr.mean = meanOf(sr.v);
sr.rms = rmsOf(sr.v);
add('setrms-num', num({
  stem: 'Five molecules of a gas have speeds of 300, 400, 500, 600 and 700 m s⁻¹. Find their root-mean-square speed in m s⁻¹ (3 significant figures).',
  value: v3(sr.rms), tol: tl(sr.rms), unit: 'm/s',
  sol: r`Mean of the squares $= \dfrac{300^2 + 400^2 + 500^2 + 600^2 + 700^2}{5} = \dfrac{${sr.v.reduce((s, x) => s + x * x, 0)}}{5} = ${sr.v.reduce((s, x) => s + x * x, 0) / 5}$ m$^2$ s$^{-2}$ (the mean speed is only ${sr.mean} m s$^{-1}$). $v_\text{rms} = \sqrt{${sr.v.reduce((s, x) => s + x * x, 0) / 5}} = ${dec(sr.rms, 3)}$ m s$^{-1}$.`,
  scheme: [['Mean of the squared speeds = 270 000 m² s⁻²', 1], [`v_rms = √270000 = ${dec(sr.rms, 3)} m/s`, 1]],
  marks: 2, d: 2, c: 'application', t: [2],
}), (q) => near(Math.sqrt((9 + 16 + 25 + 36 + 49) * 1e4 / 5), q.answer.value, 0.005) && sr.mean === 500 || 'sr');
const pe = { E: 5.4e4, V: 0.3 };
pe.P = (2 * pe.E) / (3 * pe.V);
add('pe-num', num({
  stem: 'The molecules of a gas in a closed tank of volume 0.30 m³ have a total translational kinetic energy of 54 kJ. Find the pressure of the gas in kPa (3 significant figures).',
  value: v3(pe.P / 1000), tol: tl(pe.P / 1000), unit: 'kPa',
  sol: r`From $P = \tfrac{1}{3}\dfrac{N m \overline{v^2}}{V}$ and $E = \tfrac{1}{2} N m \overline{v^2}$: $P = \dfrac{2E}{3V} = \dfrac{2 \times 54\,000}{3 \times 0.30} = ${dec(pe.P, 6)}$ Pa $= ${dec(pe.P / 1000, 3)}$ kPa.`,
  scheme: [['P = 2E/(3V) from P = (1/3)N m v̄²/V and E = (1/2)N m v̄²', 1], [`P = ${dec(pe.P / 1000, 3)} kPa`, 1]],
  marks: 2, d: 3, c: 'application', t: [2],
}), (q) => near((1 / 3) * (2 * pe.E / pe.V) / 1000, q.answer.value, 0.005) || 'pe');
add('assum-short', short({
  marks: 2,
  stem: 'State four assumptions made in the kinetic theory of an ideal gas.',
  model: 'The gas consists of a very large number of identical **molecules in random motion**. The molecular volume is **negligible** compared with that of the container. There are **no forces** between molecules except during collisions. All collisions, with each other and with the walls, are **elastic**, and no direction is preferred.',
  sol: 'Four of the listed assumptions.',
  scheme: [['Any two assumptions', 1], ['Any other two assumptions', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('heat-short', short({
  marks: 2,
  stem: 'Use the kinetic theory to explain why the pressure of a fixed mass of gas in a rigid closed vessel rises when the gas is heated.',
  model: 'Heating raises the **mean kinetic energy** of the molecules, so their rms speed increases. They then strike the walls **more often** and each impact transfers **more momentum**. The force per unit area, the pressure, therefore increases, since P is proportional to v̄² when N and V are fixed.',
  sol: 'Higher speed: more frequent, harder collisions.',
  scheme: [['Higher temperature gives higher mean kinetic energy and speed', 1], ['More frequent impacts with more momentum each, so P rises', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('avgzero-short', short({
  marks: 2,
  stem: 'The mean velocity of the molecules of a gas at rest in a closed box is zero, yet their rms speed is not. Explain how both statements can be true.',
  model: 'Velocity is a **vector**: with no preferred direction, the velocities of the molecules cancel in pairs, so the average velocity is **zero**. The rms speed uses the **squares** of the speeds, which are positive whatever the direction, so their average, and its root, is not zero.',
  sol: 'Vector cancellation versus positive squares.',
  scheme: [['Velocities cancel by direction: mean velocity zero', 1], ['Squares are positive, so rms speed is not zero', 1]],
  d: 3, c: 'understanding', t: [2],
}));
const lt = { MH: 2.0, MO: 32 };
lt.ratio = Math.sqrt(lt.MO / lt.MH);
add('light-short3', short({
  marks: 3,
  stem: 'Explain why, at the same temperature, hydrogen molecules move faster than oxygen molecules, even though both have the same mean translational kinetic energy. Find the ratio of their rms speeds (molar masses 2.0 and 32 g mol⁻¹).',
  model: r`The mean translational kinetic energy $\tfrac{1}{2} m \overline{v^2} = \tfrac{3}{2} k_B T$ is the **same for every ideal gas** at temperature $T$, whatever the mass of its molecules. To carry the same energy, a **lighter** molecule must move faster, because the rms speed $\sqrt{3RT/M}$ varies as $1/\sqrt{M}$. For hydrogen and oxygen the ratio is $\dfrac{v_{H}}{v_{O}} = \sqrt{\dfrac{32}{2.0}} = ${lt.ratio}$, so hydrogen molecules are four times as fast as oxygen molecules.`,
  sol: 'Same energy, smaller mass, larger speed; ratio 4.',
  scheme: [['Same mean KE (3/2)k_B T for all gases at T', 1], ['v_rms ∝ 1/√M: lighter means faster', 1], [`Ratio = √(32/2.0) = ${lt.ratio}`, 1]],
  d: 3, c: 'application', t: [2],
}), () => near(vrmsM(300, 2.0e-3) / vrmsM(300, 32e-3), lt.ratio, 1e-9) && lt.ratio === 4 || 'lt');
const sp3 = { v: [300, 400, 800] };
sp3.mean = meanOf(sp3.v);
sp3.rms = rmsOf(sp3.v);
add('speeds-short3', short({
  marks: 3,
  stem: 'Three molecules of a gas have speeds of 300, 400 and 800 m s⁻¹. Find their mean speed and rms speed, and say which is larger and why.',
  model: r`The mean speed is the sum of the speeds divided by the number of molecules: $\dfrac{300 + 400 + 800}{3} = ${sp3.mean}$ m s$^{-1}$. For the rms speed, square each speed, take the mean of the squares, $\dfrac{9 + 16 + 64}{3} \times 10^4 = ${dec(sp3.v.reduce((s, x) => s + x * x, 0) / 3, 6)}$ m$^2$ s$^{-2}$, and then take the square root: $v_\text{rms} = ${dec(sp3.rms, 3)}$ m s$^{-1}$. The rms speed is the larger of the two, because squaring gives more weight to the fastest molecule.`,
  sol: 'Mean 500, rms 545.',
  scheme: [[`Mean speed = ${sp3.mean} m/s`, 1], [`v_rms = ${dec(sp3.rms, 3)} m/s`, 1], ['rms exceeds mean: squaring weights fast molecules more', 1]],
  d: 3, c: 'application', t: [2],
}), () => near(sp3.mean, 500, 1e-12) && near(Math.sqrt(296666.6667), sp3.rms, 1e-6) && sp3.rms > sp3.mean || 'sp3');
add('dalton-short3', short({
  marks: 3,
  stem: 'State Dalton\'s law of partial pressures and use the kinetic theory to justify it for two ideal gases mixed in one vessel.',
  model: r`**Dalton's law:** the total pressure of a mixture of non-reacting gases is the **sum of the partial pressures**, each being the pressure that gas would exert if it alone filled the vessel. In the kinetic picture the molecules do not interact, so each kind strikes the walls independently with $P_1 = \tfrac{1}{3}(N_1/V) m_1 \overline{v_1^2}$ and $P_2$ likewise. The wall feels the **sum** of the two momentum transfers, so $P = P_1 + P_2$.`,
  sol: 'Independent molecules; impacts add.',
  scheme: [['Statement of Dalton\'s law', 1], ['Molecules do not interact: each gas strikes the walls independently', 1], ['Momentum transfers add: P = P₁ + P₂', 1]],
  d: 3, c: 'understanding', t: [2],
}));

await import('./questions-t3.mjs');
await import('./questions-long.mjs');
