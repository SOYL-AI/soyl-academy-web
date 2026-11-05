// ch10 Thermal Properties of Matter — question bank, part 1: t01 (temperature, expansion, water) and t02 (specific heat,
// calorimetry, change of state). Every numerical is computed here and re-solved by an independent `check`; solutions and
// schemes print the computed values. AR keys planned across the chapter: a (hole), b (boiling), c (mixing), d (ice/water),
// a (cooling), c (wall thickness).
import { mk, add, r, dec, near } from '../../cbse-11-physics-ch01/src/lib.mjs';
import { CW, CICE, CSTEAM, LF, LV, ALPHA, C_METAL, DENSITY, R6, root, enthalpy, heatBetween, mixTemp } from './phys.mjs';

const { mcq, ar, tf, fill, match, num, short } = mk;
const v3 = (x) => Number(dec(x, 3));
const mn = (x) => String(x).replace('-', '−');

// ================================================================ t01 temperature, expansion, anomalous expansion of water
add('kelvinstep-mcq', mcq({
  stem: 'In a laboratory experiment the temperature of a metal block rises by 25 °C. Expressed as a change of temperature, this rise is',
  right: '25 K, or 45 °F',
  wrong: ['298 K, or 77 °F', '25 K, or 57 °F', '45 K, or 25 °F'],
  sol: 'A rise of 1 °C equals a rise of 1 K and of 1.8 °F, so 25 °C = 25 K and 25 × 1.8 = 45 °F. The other options convert a temperature reading instead of a change — option (@K).',
  d: 2, c: 'understanding', t: [1],
}), () => near(25 * 1.8, 45) || 'kelvinstep');
const leh = { c: -22 };
leh.f = 1.8 * leh.c + 32;
add('leh-num', num({
  stem: 'The overnight low at a Leh airfield in winter is −22 °C. Find this temperature in °F.',
  value: v3(leh.f), tol: 0.05, unit: '°F',
  sol: r`$t_F = \dfrac{9}{5}t_C + 32 = \dfrac{9}{5}(-22) + 32 = -39.6 + 32 = ${dec(leh.f, 2)}$ °F.`,
  scheme: [['t_F = (9/5) t_C + 32', 1]],
  d: 1, c: 'application', t: [1],
}), (q) => near((leh.c / 100) * 180 + 32, q.answer.value, 1e-6) || 'leh');
const xs = { ice: 10, steam: 130, read: 76 };
xs.C = R6(((xs.read - xs.ice) / (xs.steam - xs.ice)) * 100);
add('xscale-num', num({
  stem: 'A school science club marks a thermometer in a new scale “°S” with the ice point at 10 °S and the steam point at 130 °S, divided uniformly. A reading of 76 °S corresponds to what temperature on the Celsius scale, in °C?',
  value: xs.C, tol: 0.1, unit: '°C',
  sol: r`Equal fractions of the fundamental interval: $\dfrac{S - ${xs.ice}}{${xs.steam} - ${xs.ice}} = \dfrac{t_C}{100}$, so $t_C = 100 \times \dfrac{${xs.read} - ${xs.ice}}{${xs.steam - xs.ice}} = ${xs.C}$ °C.`,
  scheme: [['Same fraction of the fundamental interval on both scales', 1], [`t_C = 100 × ${xs.read - xs.ice}/${xs.steam - xs.ice} = ${xs.C} °C`, 1]],
  marks: 2, d: 3, c: 'application', t: [1],
}), (q) => near(((xs.read - xs.ice) * 100) / 120, q.answer.value, 1e-9) && near(xs.ice + 1.2 * q.answer.value, xs.read, 1e-9) || 'xscale');
add('minus40-mcq', mcq({
  stem: 'A tourist weather station in Dras shows a Celsius scale and a Fahrenheit scale on the same dial. At one very low temperature both scales show exactly the same number. That number is',
  right: '−40',
  wrong: ['0', '−17.8', '32'],
  sol: r`Put $t_F = t_C = x$ in $t_F = 1.8\,t_C + 32$: $x = 1.8x + 32$, so $x = -40$ — option (@K).`,
  d: 2, c: 'application', t: [1],
}), () => near(32 / (1 - 1.8), -40, 1e-9) || 'minus40');
const al = { L0: 2.0, dL: 0.0038, dT: 100 };
al.a = al.dL / (al.L0 * al.dT);
add('alpha-num', num({
  stem: 'A brass rod 2.000 m long at room temperature lengthens to 2.0038 m when its temperature is raised by 100 K. Find the coefficient of linear expansion of brass, in units of 10⁻⁵ K⁻¹.',
  value: v3(al.a * 1e5), tol: 0.02, unit: '10⁻⁵ K⁻¹',
  sol: r`$\Delta L = 2.0038 - 2.000 = ${al.dL}$ m. $\alpha = \dfrac{\Delta L}{L_0\,\Delta T} = \dfrac{${al.dL}}{${al.L0} \times ${al.dT}} = ${dec(al.a * 1e5, 3)} \times 10^{-5}$ K$^{-1}$. In units of $10^{-5}$ K$^{-1}$: $\alpha = ${dec(al.a * 1e5, 2)}$.`,
  scheme: [['α = ΔL/(L₀ΔT)', 1], [`α = ${dec(al.a * 1e5, 2)} × 10⁻⁵ K⁻¹`, 1]],
  marks: 2, d: 2, c: 'application', t: [1],
}), (q) => near(ALPHA.brass * al.L0 * al.dT, al.dL, 1e-9) && near(al.a * 1e5, q.answer.value, 1e-3) || 'alpha');
const rl = { L: 20.0, T1: 15, T2: 48, a: ALPHA.steel };
rl.dT = rl.T2 - rl.T1;
rl.one = rl.a * rl.L * rl.dT * 1000; // mm
rl.gap = 2 * rl.one;
add('rail-num', num({
  stem: 'Steel rails 20.0 m long are laid end to end at 15 °C. Two neighbouring rails are anchored at their far ends, so each can expand only into the gap between them. What is the least gap, in mm, that must be left so that they just touch at 48 °C? (α for steel = 1.2 × 10⁻⁵ K⁻¹)',
  value: rl.gap, tol: 0.05, unit: 'mm',
  sol: r`$\Delta T = ${rl.T2} - ${rl.T1} = ${rl.dT}$ K. Each rail lengthens by $\Delta L = \alpha L \Delta T = (1.2 \times 10^{-5})(20.0)(${rl.dT}) = ${dec(rl.one / 1000, 4)}$ m $= ${dec(rl.one, 3)}$ mm. Both rails grow into the gap: gap $= 2 \times ${dec(rl.one, 3)} = ${dec(rl.gap, 4)}$ mm.`,
  scheme: [[`ΔT = ${rl.dT} K; ΔL of one rail = ${dec(rl.one, 3)} mm`, 1], [`Gap = 2 × ΔL = ${dec(rl.gap, 4)} mm`, 1]],
  marks: 2, d: 3, c: 'application', t: [1],
}), (q) => near(2 * rl.L * (1 + rl.a * rl.dT) * 1000 - 2 * rl.L * 1000, q.answer.value, 1e-9) || 'rail');
const pl = { s: 30.0, dT: 80, a: ALPHA.copper };
pl.A0 = pl.s ** 2;
pl.dA = 2 * pl.a * pl.dT * pl.A0;
add('plate-num', num({
  stem: 'A square copper plate of side 30.0 cm is heated by 80 K. Taking α for copper as 1.7 × 10⁻⁵ K⁻¹, find the increase in the area of one face, in cm².',
  value: R6(pl.dA), tol: 0.01, unit: 'cm²',
  sol: r`$\beta = 2\alpha = 3.4 \times 10^{-5}$ K$^{-1}$ and $A_0 = ${pl.s}^2 = ${pl.A0}$ cm$^2$. $\Delta A = \beta A_0 \Delta T = (3.4 \times 10^{-5})(${pl.A0})(${pl.dT}) = ${dec(pl.dA, 4)}$ cm$^2$.`,
  scheme: [['β = 2α', 1], [`ΔA = βA₀ΔT = ${dec(pl.dA, 4)} cm²`, 1]],
  marks: 2, d: 2, c: 'application', t: [1],
}), (q) => near((pl.s * (1 + pl.a * pl.dT)) ** 2 - pl.s ** 2, q.answer.value, 2e-3) || 'plate');
const pt = { V: 40.0, T1: 15, T2: 45, g: 9.5e-4 };
pt.dT = pt.T2 - pt.T1;
pt.dV = pt.g * pt.V * pt.dT;
add('petrol-num', num({
  stem: 'A fuel tank at a Pune depot is filled to the brim with 40.0 L of petrol at 15 °C. The petrol warms to 45 °C in the afternoon sun. Taking γ for petrol as 9.5 × 10⁻⁴ K⁻¹ and ignoring the expansion of the tank, find the extra volume of petrol, in litres, that would spill.',
  value: R6(pt.dV), tol: 0.01, unit: 'L',
  sol: r`$\Delta V = \gamma V_0 \Delta T = (9.5 \times 10^{-4})(${pt.V})(${pt.dT}) = ${dec(pt.dV, 3)}$ L.`,
  scheme: [[`ΔT = ${pt.dT} K`, 1], [`ΔV = γV₀ΔT = ${dec(pt.dV, 3)} L`, 1]],
  marks: 2, d: 2, c: 'application', t: [1],
}), (q) => near(pt.V * ((1 + pt.g * pt.dT) - 1), q.answer.value, 1e-9) || 'petrol');
const dn = { rho: 8960, dT: 500, a: ALPHA.copper };
dn.g = 3 * dn.a;
dn.rho2 = dn.rho / (1 + dn.g * dn.dT);
add('density-num', num({
  stem: 'A copper block has a density of 8960 kg m⁻³ at 20 °C. Find its density at 520 °C, in kg m⁻³, taking α for copper as 1.7 × 10⁻⁵ K⁻¹ and using γ = 3α.',
  value: Math.round(dn.rho2), tol: 3, unit: 'kg m⁻³',
  sol: r`$\gamma = 3\alpha = ${dec(dn.g * 1e5, 3)} \times 10^{-5}$ K$^{-1}$. The mass is fixed while the volume becomes $V(1 + \gamma\Delta T)$, so $\rho' = \dfrac{\rho}{1 + \gamma\Delta T} = \dfrac{${dn.rho}}{1 + (5.1 \times 10^{-5})(${dn.dT})} = \dfrac{${dn.rho}}{${dec(1 + dn.g * dn.dT, 5)}} = ${dec(dn.rho2, 4)}$ kg m$^{-3}$.`,
  scheme: [['Mass constant, V′ = V(1 + γΔT)', 1], ['ρ′ = ρ/(1 + γΔT)', 1], [`ρ′ ≈ ${dec(dn.rho2, 4)} kg m⁻³`, 1]],
  marks: 3, d: 3, c: 'application', t: [1],
}), (q) => near(dn.rho / (1 + dn.a * dn.dT) ** 3, q.answer.value, 5e-4) || 'density');
const sh = { D: 2.000, d: 1.998, T1: 20, a: ALPHA.steel };
sh.dT = (sh.D - sh.d) / (sh.a * sh.d);
sh.T2 = sh.T1 + sh.dT;
add('shrink-num', num({
  stem: 'The inner diameter of an iron tyre is 1.998 m at 20 °C, while the wheel it must fit over has a diameter of 2.000 m. To what temperature, in °C, must the tyre be heated so that it just slips over the wheel? (α for iron = 1.2 × 10⁻⁵ K⁻¹)',
  value: Number(dec(sh.T2, 4)), tol: 0.3, unit: '°C',
  sol: r`Needed increase of diameter $= 2.000 - 1.998 = ${dec(sh.D - sh.d, 2)}$ m $= \alpha d \,\Delta T$, so $\Delta T = \dfrac{0.002}{(1.2 \times 10^{-5})(1.998)} = ${dec(sh.dT, 3)}$ K. Final temperature $= 20 + ${dec(sh.dT, 3)} = ${dec(sh.T2, 4)}$ °C.`,
  scheme: [['Δd needed = 0.002 m = α d ΔT', 1], [`ΔT = ${dec(sh.dT, 3)} K`, 1], [`T = 20 + ΔT ≈ ${dec(sh.T2, 4)} °C`, 1]],
  marks: 3, d: 3, c: 'application', t: [1],
}), (q) => near(sh.d * (1 + sh.a * (q.answer.value - sh.T1)), sh.D, 2e-5) || 'shrink');
const cd = { diff: 15.0, as: ALPHA.steel, aa: ALPHA.aluminium };
cd.Ls = cd.diff / (1 - cd.as / cd.aa);
cd.La = cd.Ls - cd.diff;
add('constdiff-num', num({
  stem: 'A steel rod and an aluminium rod are to be chosen so that the steel rod is always exactly 15.0 cm longer than the aluminium rod, whatever the common temperature. Taking α(steel) = 1.2 × 10⁻⁵ K⁻¹ and α(aluminium) = 2.3 × 10⁻⁵ K⁻¹, find the length of the steel rod, in cm.',
  value: v3(cd.Ls), tol: 0.1, unit: 'cm',
  sol: r`The difference stays constant only if both rods lengthen equally: $\alpha_s L_s \Delta T = \alpha_a L_a \Delta T$, so $L_a = \dfrac{\alpha_s}{\alpha_a}L_s$. With $L_s - L_a = ${cd.diff}$ cm: $L_s\left(1 - \dfrac{1.2}{2.3}\right) = ${cd.diff}$, so $L_s = \dfrac{${cd.diff}}{${dec(1 - cd.as / cd.aa, 4)}} = ${dec(cd.Ls, 4)}$ cm (and $L_a = ${dec(cd.La, 4)}$ cm).`,
  scheme: [['Equal extensions: α_s L_s = α_a L_a', 1], [`L_s − L_a = ${cd.diff} cm`, 1], [`L_s ≈ ${dec(cd.Ls, 4)} cm`, 1]],
  marks: 3, d: 4, c: 'analysis', t: [1],
}), (q) => near(cd.as * q.answer.value, cd.aa * (q.answer.value - cd.diff), 2e-3) || 'constdiff');
add('pondtop-mcq', mcq({
  stem: 'In a cold region the surface of a deep lake starts to freeze while the water near the bottom is still at about 4 °C. The reason is that',
  right: 'water is densest at about 4 °C, so water cooler than that is lighter and stays at the top',
  wrong: ['cold water is always denser, so it sinks and freezes at the bottom first', 'the pressure near the bottom raises the freezing point of the water there', 'the lake bed warms the lower water above 4 °C'],
  sol: 'Surface water cooling to 4 °C sinks. Once the whole lake is at 4 °C, further cooling makes the surface water less dense, so it stays on top and freezes first — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('bimetal-mcq', mcq({
  stem: 'A strip of brass (α = 1.9 × 10⁻⁵ K⁻¹) is riveted firmly to a strip of iron (α = 1.2 × 10⁻⁵ K⁻¹) of the same length and thickness, and the pair is heated evenly. The strip',
  right: 'bends with the brass on the outer (convex) side',
  wrong: ['bends with the iron on the outer (convex) side', 'stays straight, but both metals lengthen equally', 'bends with the brass on the inner (concave) side'],
  sol: 'Brass lengthens more, so it must lie on the longer, outer arc of the curve; the iron is on the inner arc — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('hole-ar', ar({
  a: 'When a flat metal washer is heated evenly, the diameter of its central hole increases.',
  r: 'Every linear dimension of a heated solid, including the diameter of a hole cut in it, increases by the same fraction.',
  key: 'a',
  sol: 'Both statements are true, and R explains A: the hole behaves as a disc of the same metal would, so its diameter grows by α d ΔT — option (a).',
  d: 2, c: 'understanding', t: [1],
}));
add('pond-tf', tf({
  stem: 'On a frozen village pond, the water just below the ice sheet is at about 4 °C and the water at the bottom is at 0 °C.',
  key: 'f',
  sol: 'False. The water just below the ice is at about 0 °C and the densest water, at about 4 °C, collects at the bottom of the pond.',
  d: 2, c: 'understanding', t: [1],
}));
add('bimetal-fill', fill({
  stem: 'When a bonded strip of brass and steel is heated, the metal on the outer (convex) side of the bend is ___.',
  acc: [['brass']],
  sol: 'Brass: its larger coefficient of expansion makes it the longer, outer arc.',
  d: 1, c: 'recall', t: [1],
}));
add('maxdens-fill', fill({
  stem: 'Pure water at one atmosphere has its greatest density at a temperature of about ___ °C.',
  acc: [['4', '3.98', '3.9', '4.0']],
  sol: 'About **4 °C** (3.98 °C).',
  d: 1, c: 'recall', t: [1],
}));
add('bridge-short2', short({
  marks: 2,
  stem: 'One end of a long steel bridge over the Hooghly rests on rollers instead of being bolted down. Explain why, using the idea of thermal expansion.',
  model: 'A long steel span lengthens in summer and shortens in winter by an amount ΔL = αL₀ΔT. If both ends were fixed, the span could not change length and would buckle or crack its supports. Rollers let the free end move, so the girder can expand and contract freely.',
  sol: 'ΔL = αL₀ΔT; rollers allow free movement.',
  scheme: [['Span changes length with temperature, ΔL = αL₀ΔT', 1], ['Rollers let it expand and contract freely, avoiding damage', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('hole-short2', short({
  marks: 2,
  stem: 'A metal plate with a circular hole is heated. Does the hole become larger or smaller? Justify your answer.',
  model: 'The hole becomes larger. Heating makes every linear dimension of the plate grow by the same fraction, so the diameter of the hole increases just as the diameter of a disc of the same metal would: Δd = αdΔT. The metal does not grow inward into the hole.',
  sol: 'Larger; all lengths scale alike.',
  scheme: [['The hole becomes larger', 1], ['All linear dimensions scale by the same fraction (Δd = αdΔT), like a disc of the metal', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('gamma-short3', short({
  marks: 3,
  stem: 'Starting from the definition of the coefficient of linear expansion, show that the coefficient of volume expansion of an isotropic solid is γ = 3α for a small rise of temperature.',
  model: 'For a cube of side L₀ the new side is L₀(1 + αΔT), so the new volume is V₀(1 + αΔT)³ = V₀(1 + 3αΔT + 3α²ΔT² + …). Since αΔT is very small, the squared and cubed terms are neglected: V = V₀(1 + 3αΔT). Comparing with ΔV = γV₀ΔT gives γ = 3α.',
  sol: 'Cube of side L₀: V = V₀(1 + αΔT)³ ≈ V₀(1 + 3αΔT).',
  scheme: [['New side L₀(1 + αΔT), volume V₀(1 + αΔT)³', 1], ['Neglect higher powers of αΔT', 1], ['Compare with ΔV = γV₀ΔT: γ = 3α', 1]],
  d: 3, c: 'understanding', t: [1],
}));
add('pond-short3', short({
  marks: 3,
  stem: 'Describe the anomalous expansion of water and explain how it allows fish to survive in a pond when the air temperature stays below 0 °C for weeks.',
  model: 'Between 0 °C and about 4 °C water contracts on heating, so its density is greatest at about 4 °C. As the pond cools, water at 4 °C sinks, and the rest of the pond becomes 4 °C. Further cooling gives lighter water that stays on top and freezes. The floating ice conducts poorly, so the bottom water stays near 4 °C and fish survive.',
  sol: 'Density maximum at 4 °C; surface freezes; ice insulates.',
  scheme: [['Water contracts from 0 °C to about 4 °C: density greatest at 4 °C', 1], ['Water cooler than 4 °C is lighter and stays on top, freezing first', 1], ['Floating ice insulates; bottom stays near 4 °C', 1]],
  d: 3, c: 'understanding', t: [1],
}));
add('density-short', short({
  marks: 2,
  stem: 'The table of the density of water gives 999.84 kg m⁻³ at 0 °C, 999.97 kg m⁻³ at 4 °C and 999.70 kg m⁻³ at 10 °C. State what this shows about the volume of a fixed mass of water as it is heated from 0 °C to 10 °C.',
  model: 'The density rises from 0 °C to about 4 °C, so the volume of a fixed mass first decreases, reaching a minimum near 4 °C. Above 4 °C the density falls, so the volume increases again. This unusual behaviour is the anomalous expansion of water.',
  sol: 'Volume falls to a minimum at 4 °C, then rises.',
  scheme: [['Density rises to 4 °C: volume decreases to a minimum', 1], ['Above 4 °C density falls: volume increases (anomalous expansion)', 1]],
  d: 3, c: 'analysis', t: [1],
}), () => DENSITY[4][1] > DENSITY[0][1] && DENSITY[10][1] < DENSITY[4][1] || 'density-short');
const WV = { v0: 1e6 / 999.84, v4: 1e6 / 999.97 }; // cm^3 per 1.000 kg
add('waterV-num', num({
  stem: 'Using the table values of the density of water, 999.84 kg m⁻³ at 0 °C and 999.97 kg m⁻³ at 4 °C, find by how many cm³ the volume of 1.000 kg of water decreases as it is warmed from 0 °C to 4 °C.',
  value: 0.13, tol: 0.02, unit: 'cm³',
  sol: r`$V = \dfrac{m}{\rho}$. At 0 °C: $V_0 = \dfrac{1.000}{999.84}\ \text{m}^3 = ${dec(WV.v0, 6)}\ \text{cm}^3$; at 4 °C: $V_4 = \dfrac{1.000}{999.97}\ \text{m}^3 = ${dec(WV.v4, 6)}\ \text{cm}^3$. The decrease is $V_0 - V_4 = ${dec(WV.v0, 6)} - ${dec(WV.v4, 6)} = ${dec(WV.v0 - WV.v4, 2)}$ cm$^3$.`,
  scheme: [['V = m/ρ at each temperature', 1], [`Decrease = ${dec(WV.v0, 6)} − ${dec(WV.v4, 6)} = ${dec(WV.v0 - WV.v4, 2)} cm³`, 1]],
  marks: 2, d: 3, c: 'application', t: [1],
}), (q) => near(1000000 / 999.84 - 1000000 / 999.97, q.answer.value, 0.1) || 'waterV');

// ================================================================ t02 specific heat, calorimetry, change of state
add('flow-mcq', mcq({
  stem: 'When a hot iron nail is dropped into cool water, heat flows from the nail to the water. This happens because',
  right: 'the nail is at a higher temperature than the water',
  wrong: ['the nail has more mass than the water', 'the nail contains more heat than the water', 'the nail has a larger specific heat capacity than the water'],
  sol: 'The direction of heat flow depends only on the temperatures: heat passes from the body at the higher temperature to the one at the lower temperature — option (@K).',
  d: 1, c: 'understanding', t: [2],
}));
add('cunit-mcq', mcq({
  stem: 'The unit of specific heat capacity, J kg⁻¹ K⁻¹, written in terms of base SI units, is equivalent to',
  right: 'm² s⁻² K⁻¹',
  wrong: ['kg m s⁻² K⁻¹', 'm s⁻² K', 'kg m² s⁻² K⁻¹'],
  sol: 'J = kg m² s⁻², so J kg⁻¹ K⁻¹ = (kg m² s⁻²) kg⁻¹ K⁻¹ = m² s⁻² K⁻¹ — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
const rt = { cPb: C_METAL.lead, cAl: C_METAL.aluminium };
rt.ratio = rt.cAl / rt.cPb;
add('ratio-mcq', mcq({
  stem: 'Equal masses of lead (c = 130 J kg⁻¹ K⁻¹) and aluminium (c = 900 J kg⁻¹ K⁻¹) absorb equal amounts of heat. The ratio of the rise of temperature of lead to that of aluminium is about',
  right: '6.9',
  wrong: ['0.14', '1.0', '2.6'],
  sol: r`$Q = mc\Delta T$ with $Q$ and $m$ equal gives $\Delta T \propto 1/c$, so $\dfrac{\Delta T_\text{Pb}}{\Delta T_\text{Al}} = \dfrac{c_\text{Al}}{c_\text{Pb}} = \dfrac{900}{130} = ${dec(rt.ratio, 3)}$ — option (@K).`,
  d: 2, c: 'application', t: [2],
}), () => near(rt.ratio, 6.92, 2e-3) || 'ratio');
add('lost-mcq', mcq({
  stem: 'A student finds the specific heat of a metal by dropping a hot sample into water in a calorimeter, using c = (heat gained by the water) ÷ (m ΔT of the metal). Her value comes out too small. A likely cause is that',
  right: 'some heat escaped to the surroundings while the hot sample was being transferred or the water was warming',
  wrong: ['the final temperature was read before the mixture had been stirred, giving too high a reading', 'the water was stirred, so it warmed more than it should', 'the calorimeter was dry before the water was added'],
  sol: 'If some heat is lost, the water’s rise in temperature is less than it should be, so the heat gained by the water appears smaller and the computed c is too small — option (@K).',
  d: 3, c: 'analysis', t: [2],
}));
add('boil-mcq', mcq({
  stem: 'Water in an open pan boils steadily at 100 °C on a gas stove, with the flame supplying heat all the time. The heat supplied is used mainly to',
  right: 'change liquid into vapour by increasing the potential energy of the molecules',
  wrong: ['raise the average kinetic energy of the water molecules', 'increase the specific heat capacity of the water', 'raise the boiling point of the water'],
  sol: 'At a fixed boiling point the temperature, and hence the average kinetic energy, is constant. The heat is the latent heat of vaporisation, which pulls the molecules apart (potential energy) — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('sublim-mcq', mcq({
  stem: 'A camphor tablet kept in an open dish slowly shrinks and vanishes without leaving any liquid. This change of state is called',
  right: 'sublimation',
  wrong: ['evaporation of a liquid', 'melting followed by boiling', 'condensation'],
  sol: 'A solid that passes directly into vapour without melting undergoes sublimation — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('scald-mcq', mcq({
  stem: 'A cook is scalded much more severely by 10 g of steam at 100 °C than by 10 g of boiling water at 100 °C, because the steam',
  right: 'gives out its latent heat of vaporisation as it condenses on the skin',
  wrong: ['is at a higher temperature than the water', 'has a larger mass of molecules', 'has a smaller specific heat capacity than the water, so it cools slowly'],
  sol: 'Both are at 100 °C, but condensing steam also releases about 2.26 × 10⁶ J per kilogram of latent heat before it cools as water — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('mixequal-ar', ar({
  a: 'When 1 kg of water at 80 °C is mixed with 1 kg of water at 20 °C in an insulated vessel, the final temperature is 50 °C.',
  r: 'The final temperature of a mixture of two water samples is always the arithmetic mean of their temperatures, whatever their masses.',
  key: 'c',
  sol: 'A is true: equal masses give T = (80 + 20)/2 = 50 °C. R is false: for unequal masses the final temperature is the mass-weighted mean, not the arithmetic mean — option (c).',
  d: 3, c: 'understanding', t: [2],
}));
add('boilplateau-ar', ar({
  a: 'The temperature of water boiling steadily in an open pan stays at 100 °C although heat is supplied continuously.',
  r: 'Water has a large specific heat capacity.',
  key: 'b',
  sol: 'Both are true, but the constant temperature is due to the latent heat of vaporisation, not to the specific heat capacity — option (b).',
  d: 3, c: 'understanding', t: [2],
}));
add('iceenergy-ar', ar({
  a: 'Ice at 0 °C and water at 0 °C have the same internal energy per kilogram.',
  r: 'To change 1 kg of ice at 0 °C into water at 0 °C, heat equal to the latent heat of fusion must be supplied.',
  key: 'd',
  sol: 'R is true: 3.34 × 10⁵ J must be supplied per kilogram at constant temperature. Therefore the water has more internal energy than the ice, so A is false — option (d).',
  d: 3, c: 'understanding', t: [2],
}));
add('freeze-tf', tf({
  stem: 'Water at 0 °C releases the same amount of heat per kilogram on freezing as ice at 0 °C absorbs on melting.',
  key: 't',
  sol: 'True. The latent heat of fusion is the same in both directions: 3.34 × 10⁵ J kg⁻¹.',
  d: 2, c: 'understanding', t: [2],
}));
const gy = { m: 15, T1: 21, T2: 56, P: 2000 };
gy.Q = gy.m * CW * (gy.T2 - gy.T1);
gy.t = gy.Q / gy.P;
add('geyser-num', num({
  stem: 'A bathroom geyser of power 2000 W heats 15 kg of water from 21 °C to 56 °C. Taking the specific heat of water as 4200 J kg⁻¹ K⁻¹ and assuming no loss of heat, find the time taken, in minutes.',
  value: v3(gy.t / 60), tol: 0.1, unit: 'min',
  sol: r`$Q = mc\Delta T = ${gy.m} \times ${CW} \times ${gy.T2 - gy.T1} = ${gy.Q}$ J. $t = \dfrac{Q}{P} = \dfrac{${gy.Q}}{${gy.P}} = ${dec(gy.t, 5)}$ s $= \dfrac{${dec(gy.t, 5)}}{60} = ${dec(gy.t / 60, 3)}$ min.`,
  scheme: [[`Q = mcΔT = ${gy.Q} J`, 1], [`t = Q/P = ${dec(gy.t, 5)} s = ${dec(gy.t / 60, 3)} min`, 1]],
  marks: 2, d: 2, c: 'application', t: [2],
}), (q) => near(gy.m * heatBetween(1, gy.T1, gy.T2), gy.Q, 1e-9) && near(q.answer.value, gy.t / 60, 5e-3) || 'geyser');
const op = { P: 300, t: 100, m: 0.8, dT: 20 };
op.c = (op.P * op.t) / (op.m * op.dT);
add('oil-num', num({
  stem: 'A 300 W immersion heater is switched on for 100 s in 0.80 kg of mustard oil in a well-lagged vessel, and the oil warms by 20 K. Find the specific heat capacity of the oil, in J kg⁻¹ K⁻¹. (Ignore the vessel.)',
  value: op.c, tol: 2, unit: 'J kg⁻¹ K⁻¹',
  sol: r`Heat supplied $= Pt = ${op.P} \times ${op.t} = ${op.P * op.t}$ J $= mc\Delta T$, so $c = \dfrac{${op.P * op.t}}{${op.m} \times ${op.dT}} = ${op.c}$ J kg$^{-1}$ K$^{-1}$.`,
  scheme: [[`Q = Pt = ${op.P * op.t} J`, 1], [`c = Q/(mΔT) = ${op.c} J kg⁻¹ K⁻¹`, 1]],
  marks: 2, d: 2, c: 'application', t: [2],
}), (q) => near(op.m * q.answer.value * op.dT, op.P * op.t, 1e-3) || 'oil');
const cm = { mh: 0.15, Th: 90, mc: 0.4, Tc: 20, mk: 0.2, ck: C_METAL.aluminium };
cm.T = (cm.mh * CW * cm.Th + cm.mc * CW * cm.Tc + cm.mk * cm.ck * cm.Tc) / (cm.mh * CW + cm.mc * CW + cm.mk * cm.ck);
add('calmix-num', num({
  stem: 'In a physics lab, 0.15 kg of water at 90 °C is poured into an aluminium calorimeter of mass 0.20 kg (c = 900 J kg⁻¹ K⁻¹) that holds 0.40 kg of water at 20 °C. Taking the specific heat of water as 4200 J kg⁻¹ K⁻¹ and ignoring losses, find the final temperature, in °C.',
  value: v3(cm.T), tol: 0.1, unit: '°C',
  sol: r`Heat lost by hot water $= 0.15 \times ${CW} \times (90 - T)$. Heat gained $= (0.40 \times ${CW} + 0.20 \times ${cm.ck})(T - 20) = ${0.4 * CW + 0.2 * cm.ck}\,(T - 20)$. Equating: $${0.15 * CW}(90 - T) = ${0.4 * CW + 0.2 * cm.ck}(T - 20)$, so $T = \dfrac{${cm.mh * CW * cm.Th + (cm.mc * CW + cm.mk * cm.ck) * cm.Tc}}{${cm.mh * CW + cm.mc * CW + cm.mk * cm.ck}} = ${dec(cm.T, 4)}$ °C.`,
  scheme: [['Heat lost by hot water = 0.15 × 4200 × (90 − T)', 1], ['Heat gained by cold water and calorimeter = (0.40 × 4200 + 0.20 × 900)(T − 20)', 1], [`Solving: T ≈ ${dec(cm.T, 4)} °C`, 1]],
  marks: 3, d: 3, c: 'application', t: [2],
}), (q) => near(mixTemp([{ m: cm.mh, T: cm.Th }, { m: cm.mc, T: cm.Tc }, { m: cm.mk, c: cm.ck, T: cm.Tc }]).T, q.answer.value, 2e-3) || 'calmix');
const sp = { ms: 0.25, Ts: 100.0, mw: 0.4, Tw: 27.0, Tf: 31.5 };
sp.c = (sp.mw * CW * (sp.Tf - sp.Tw)) / (sp.ms * (sp.Ts - sp.Tf));
add('sample-num', num({
  stem: 'A 0.25 kg sample of an alloy is heated to 100.0 °C in boiling water and quickly dropped into 0.40 kg of water at 27.0 °C in a well-insulated calorimeter whose own heat capacity may be ignored. The mixture settles at 31.5 °C. Taking the specific heat of water as 4200 J kg⁻¹ K⁻¹, find the specific heat capacity of the alloy, in J kg⁻¹ K⁻¹.',
  value: Number(dec(sp.c, 4)), tol: 2, unit: 'J kg⁻¹ K⁻¹',
  sol: r`Heat gained by water $= ${sp.mw} \times ${CW} \times ${dec(sp.Tf - sp.Tw, 3)} = ${sp.mw * CW * (sp.Tf - sp.Tw)}$ J. Heat lost by alloy $= ${sp.ms} \times c \times ${dec(sp.Ts - sp.Tf, 3)}$. Equating, $c = \dfrac{${sp.mw * CW * (sp.Tf - sp.Tw)}}{${sp.ms} \times ${dec(sp.Ts - sp.Tf, 3)}} = ${dec(sp.c, 4)}$ J kg$^{-1}$ K$^{-1}$.`,
  scheme: [[`Heat gained by water = ${sp.mw * CW * (sp.Tf - sp.Tw)} J`, 1], [`Heat lost by alloy = 0.25 × c × ${dec(sp.Ts - sp.Tf, 3)}`, 1], [`c ≈ ${dec(sp.c, 4)} J kg⁻¹ K⁻¹`, 1]],
  marks: 3, d: 3, c: 'application', t: [2],
}), (q) => near(mixTemp([{ m: sp.ms, c: q.answer.value, T: sp.Ts }, { m: sp.mw, T: sp.Tw }]).T, sp.Tf, 2e-3) || 'sample');
const pk = { m0: 6.0, Q: 1.5e6 };
pk.melt = pk.Q / LF;
pk.left = pk.m0 - pk.melt;
add('picnic-num', num({
  stem: 'A picnic box holds 6.0 kg of ice at 0 °C. During an afternoon it absorbs 1.5 × 10⁶ J of heat from outside, and its contents stay at 0 °C. Taking the latent heat of fusion of ice as 3.34 × 10⁵ J kg⁻¹, find the mass of ice still unmelted, in kg.',
  value: v3(pk.left), tol: 0.02, unit: 'kg',
  sol: r`Mass melted $= \dfrac{Q}{L_f} = \dfrac{1.5 \times 10^{6}}{3.34 \times 10^{5}} = ${dec(pk.melt, 4)}$ kg. Ice left $= 6.0 - ${dec(pk.melt, 4)} = ${dec(pk.left, 3)}$ kg.`,
  scheme: [[`m_melted = Q/L_f = ${dec(pk.melt, 4)} kg`, 1], [`Left = 6.0 − ${dec(pk.melt, 4)} = ${dec(pk.left, 3)} kg`, 1]],
  marks: 2, d: 2, c: 'application', t: [2],
}), (q) => near(pk.m0 - root((m) => m * LF - pk.Q, 0, 10), q.answer.value, 5e-3) || 'picnic');
const is = { m: 0.1, T0: -10 };
is.q1 = is.m * CICE * 10;
is.q2 = is.m * LF;
is.q3 = is.m * CW * 100;
is.q4 = is.m * LV;
is.Q = is.q1 + is.q2 + is.q3 + is.q4;
add('icesteam-num', num({
  stem: 'Find the total heat, in kJ, needed to convert 0.10 kg of ice at −10 °C into steam at 100 °C. Take the specific heats of ice and water as 2100 and 4200 J kg⁻¹ K⁻¹, and the latent heats of fusion and vaporisation as 3.34 × 10⁵ and 2.26 × 10⁶ J kg⁻¹.',
  value: is.Q / 1000, tol: 0.2, unit: 'kJ',
  sol: r`Ice to 0 °C: $${is.m} \times ${CICE} \times 10 = ${is.q1}$ J. Melting: $${is.m} \times ${LF} = ${is.q2}$ J. Water to 100 °C: $${is.m} \times ${CW} \times 100 = ${is.q3}$ J. Boiling: $${is.m} \times ${LV} = ${is.q4}$ J. Total $= ${is.q1} + ${is.q2} + ${is.q3} + ${is.q4} = ${is.Q}$ J $= ${is.Q / 1000}$ kJ.`,
  scheme: [[`Ice to 0 °C ${is.q1} J and melting ${is.q2} J`, 1], [`Water to 100 °C ${is.q3} J and boiling ${is.q4} J`, 1], [`Total ${is.Q / 1000} kJ`, 1]],
  marks: 3, d: 3, c: 'application', t: [2],
}), (q) => near(heatBetween(is.m, is.T0, 100.0000001), q.answer.value * 1000, 1e-6) || 'icesteam');
const cs = { Q: 1.0e6, T: 60 };
cs.per = LV + CW * (100 - cs.T);
cs.m = cs.Q / cs.per;
add('condense-num', num({
  stem: 'Steam at 100 °C is condensed and the water is cooled to 60 °C, giving out 1.0 × 10⁶ J in all. Taking the latent heat of vaporisation as 2.26 × 10⁶ J kg⁻¹ and the specific heat of water as 4200 J kg⁻¹ K⁻¹, find the mass of steam, in kg.',
  value: v3(cs.m), tol: 0.005, unit: 'kg',
  sol: r`Heat per kg $= L_v + c\,(100 - 60) = ${LV} + ${CW} \times ${100 - cs.T} = ${cs.per}$ J. $m = \dfrac{${cs.Q}}{${cs.per}} = ${dec(cs.m, 3)}$ kg.`,
  scheme: [[`Heat per kg = L_v + cΔT = ${cs.per} J`, 1], [`m = Q/(heat per kg) = ${dec(cs.m, 3)} kg`, 1]],
  marks: 2, d: 3, c: 'application', t: [2],
}), (q) => near(q.answer.value * heatBetween(1, 60, 100.0000001), cs.Q, 3e-3) || 'condense');
const ip = { mi: 0.3, Ti: -10, mw: 0.5, Tw: 20 };
ip.qw = ip.mw * CW * ip.Tw;
ip.qi = ip.mi * CICE * -ip.Ti;
ip.melt = (ip.qw - ip.qi) / LF;
ip.left = ip.mi - ip.melt;
add('icepartial-num', num({
  stem: 'A student drops 0.30 kg of ice at −10 °C into 0.50 kg of water at 20 °C in an insulated vessel (vessel ignored). Take c = 2100 J kg⁻¹ K⁻¹ for ice, 4200 for water and L_f = 3.34 × 10⁵ J kg⁻¹. Find the mass of ice, in g, that remains unmelted once the contents reach thermal equilibrium.',
  value: Number(dec(ip.left * 1000, 4)), tol: 0.5, unit: 'g',
  sol: r`Heat the water can give up in cooling to 0 °C: $${ip.mw} \times ${CW} \times ${ip.Tw} = ${ip.qw}$ J. Heat needed to warm the ice to 0 °C: $${ip.mi} \times ${CICE} \times 10 = ${ip.qi}$ J. The surplus $${ip.qw} - ${ip.qi} = ${ip.qw - ip.qi}$ J melts $m = \dfrac{${ip.qw - ip.qi}}{${LF}} = ${dec(ip.melt, 4)}$ kg, less than 0.30 kg, so the final temperature is 0 °C and ice remains: $${ip.mi} - ${dec(ip.melt, 4)} = ${dec(ip.left, 4)}$ kg $= ${dec(ip.left * 1000, 4)}$ g.`,
  scheme: [[`Water can give ${ip.qw} J; ice needs ${ip.qi} J to reach 0 °C`, 1], [`Surplus ${ip.qw - ip.qi} J melts ${dec(ip.melt, 4)} kg < 0.30 kg: equilibrium at 0 °C`, 1], [`Ice left ≈ ${dec(ip.left * 1000, 4)} g`, 1]],
  marks: 3, d: 4, c: 'analysis', t: [2],
}), (q) => {
  const res = mixTemp([{ m: ip.mi, T: ip.Ti }, { m: ip.mw, T: ip.Tw }]);
  return (res.T === 0 && near((ip.mi + ip.mw - res.melted) * 1000, q.answer.value, 3e-3)) || 'icepartial';
});
const it = { mi: 0.05, mw: 0.25, Tw: 45 };
it.T = (it.mw * CW * it.Tw - it.mi * LF) / (it.mi * CW + it.mw * CW);
add('icetea-num', num({
  stem: 'A chilled-water cooler adds 0.050 kg of ice at 0 °C to 0.25 kg of water at 45 °C in an insulated jug (jug ignored). Taking the specific heat of water as 4200 J kg⁻¹ K⁻¹ and L_f = 3.34 × 10⁵ J kg⁻¹, find the final temperature, in °C (one decimal place).',
  value: Number(dec(it.T, 3)), tol: 0.1, unit: '°C',
  sol: r`The water can give up $${it.mw} \times ${CW} \times ${it.Tw} = ${it.mw * CW * it.Tw}$ J on cooling to 0 °C, more than the $${it.mi} \times ${LF} = ${it.mi * LF}$ J needed to melt the ice, so all the ice melts. Heat lost by water $=$ heat to melt $+$ heat to warm the melt-water: $${it.mw * CW}(${it.Tw} - T) = ${it.mi * LF} + ${it.mi * CW}\,T$, so $T = \dfrac{${it.mw * CW * it.Tw - it.mi * LF}}{${it.mi * CW + it.mw * CW}} = ${dec(it.T, 3)}$ °C.`,
  scheme: [['All ice melts: water can supply more than 0.05 × L_f', 1], ['0.25 × 4200 × (45 − T) = 0.05 × L_f + 0.05 × 4200 × T', 1], [`T ≈ ${dec(it.T, 3)} °C`, 1]],
  marks: 3, d: 3, c: 'application', t: [2],
}), (q) => near(mixTemp([{ m: it.mi, T: 0, solid: true }, { m: it.mw, T: it.Tw }]).T, q.answer.value, 3e-3) || 'icetea');
const kt = { m: 1.2, P: 2000 };
kt.Q = kt.m * LV;
kt.t = kt.Q / kt.P;
add('kettle-num', num({
  stem: 'At a tea stall in Nagpur, 1.2 kg of water in an electric kettle of power 2.0 kW has just reached its boiling point of 100 °C, and the kettle is left on. Taking L_v = 2.26 × 10⁶ J kg⁻¹ and no loss of heat, find how long, in minutes, it takes to boil away all the water.',
  value: v3(kt.t / 60), tol: 0.1, unit: 'min',
  sol: r`Heat to vaporise the water $= mL_v = ${kt.m} \times ${LV} = ${kt.Q}$ J. $t = \dfrac{Q}{P} = \dfrac{${kt.Q}}{${kt.P}} = ${kt.t}$ s $= \dfrac{${kt.t}}{60} = ${dec(kt.t / 60, 3)}$ min.`,
  scheme: [[`Q = mL_v = ${kt.Q} J`, 1], [`t = Q/P = ${kt.t} s = ${dec(kt.t / 60, 3)} min`, 1]],
  marks: 2, d: 2, c: 'application', t: [2],
}), (q) => near(enthalpy(kt.m, 100.0000001) - enthalpy(kt.m, 100), kt.Q, 1e-6) && near(q.answer.value * 60 * kt.P, kt.Q, 2e-3) || 'kettle');
const cv = { m: 0.4, T0: -15, P: 800 };
cv.q = cv.m * CICE * -cv.T0 + cv.m * LF;
cv.t = cv.q / cv.P;
add('meltdone-num', num({
  stem: 'A 0.40 kg block of ice at −15 °C is heated by a steady 800 W source with no loss of heat. Taking c = 2100 J kg⁻¹ K⁻¹ for ice and L_f = 3.34 × 10⁵ J kg⁻¹, find the time, in seconds, after which the ice has just finished melting (the water is at 0 °C).',
  value: cv.t, tol: 0.5, unit: 's',
  sol: r`Heat to warm the ice to 0 °C: $${cv.m} \times ${CICE} \times 15 = ${cv.m * CICE * 15}$ J. Heat to melt it: $${cv.m} \times ${LF} = ${cv.m * LF}$ J. Total $${cv.q}$ J, so $t = \dfrac{${cv.q}}{${cv.P}} = ${cv.t}$ s.`,
  scheme: [[`Warming the ice ${cv.m * CICE * 15} J; melting ${cv.m * LF} J`, 1], [`t = ${cv.q}/${cv.P} = ${cv.t} s`, 1]],
  marks: 2, d: 3, c: 'application', t: [2],
}), (q) => near(heatBetween(cv.m, cv.T0, 0.0000001) / cv.P, q.answer.value, 1e-5) || 'meltdone');
add('calor-short2', short({
  marks: 2,
  stem: 'Hot metal is dropped into cold water in a well-insulated copper vessel. Write the energy balance used to find the final temperature, naming the law it expresses, and state one precaution.',
  model: 'Heat lost by the hot metal = heat gained by the water and the vessel. This expresses the conservation of energy, since nothing is lost to the surroundings. A precaution: transfer the metal quickly and keep the vessel lagged and covered, so that no heat escapes.',
  sol: 'Heat lost = heat gained: conservation of energy.',
  scheme: [['Heat lost by metal = heat gained by water + vessel; conservation of energy', 1], ['A valid precaution (lagging, quick transfer, stirring)', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('cooker-short2', short({
  marks: 2,
  stem: 'Dal cooks faster in a pressure cooker on a hill station like Shimla than in an open pan. Give the physical reason.',
  model: 'The boiling point of water depends on pressure. In the sealed cooker the steam raises the pressure above one atmosphere, so the water boils at a temperature higher than 100 °C. Food therefore cooks at that higher temperature and is ready sooner than in an open pan, where the water cannot be hotter than its boiling point.',
  sol: 'Higher pressure raises boiling point.',
  scheme: [['Boiling point rises with pressure', 1], ['Food cooks at the higher temperature, so faster', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('cC-short2', short({
  marks: 2,
  stem: 'A thin copper wire and a thick copper rod are given the same rise of temperature. Which quantity, the specific heat capacity or the heat capacity, is the same for both? Explain.',
  model: 'The specific heat capacity is the same, because it is a property of the material (copper) and is the heat per kilogram per kelvin. The heat capacity C = mc depends on mass, so the thick rod, which has more mass, has a larger heat capacity and needs more heat for the same rise.',
  sol: 'c is a material property; C = mc depends on mass.',
  scheme: [['Specific heat capacity is the same: a property of copper', 1], ['Heat capacity C = mc is larger for the more massive rod', 1]],
  d: 3, c: 'understanding', t: [2],
}));
const sb = { per: LV + CW * (100 - 37), w: CW * (100 - 37) };
add('steamburn-short3', short({
  marks: 3,
  stem: 'Compare, per kilogram, the heat given to the skin by steam at 100 °C with that given by boiling water at 100 °C when each cools to the skin temperature of 37 °C. Take L_v = 2.26 × 10⁶ J kg⁻¹ and c = 4200 J kg⁻¹ K⁻¹. Which burns more, and why?',
  model: `Boiling water gives only c ΔT = 4200 × 63 = ${sb.w} J per kilogram. Steam gives, in addition, the latent heat released on condensing: ${LV} + ${sb.w} = ${sb.per} J per kilogram, about ${dec(sb.per / sb.w, 2)} times as much. So steam burns far more severely.`,
  sol: `Water: ${sb.w} J kg⁻¹; steam: ${sb.per} J kg⁻¹.`,
  scheme: [[`Boiling water: ${sb.w} J per kg`, 1], [`Steam: ${LV} + ${sb.w} = ${sb.per} J per kg`, 1], ['Steam delivers about 9.5 times more because of the latent heat', 1]],
  d: 3, c: 'application', t: [2],
}), () => near(sb.per / sb.w, 9.54, 2e-3) || 'steamburn');
const hc = EXq();
function EXq() {
  const m = 0.25;
  const P = 500;
  const q = [m * CICE * 20, m * LF, m * CW * 100, m * LV, m * CSTEAM * 20];
  return { m, P, q, t: q.map((x) => x / P) };
}
add('heatcurve-short3', short({
  marks: 3,
  stem: 'A 0.25 kg block of ice at −20 °C is heated at 500 W until it is steam at 120 °C. Using c = 2100, 4200 and 2000 J kg⁻¹ K⁻¹ for ice, water and steam, find the times for the two flat stages of the heating curve and say which is longer and why.',
  model: `Melting at 0 °C needs 0.25 × 3.34 × 10⁵ = ${hc.q[1]} J, taking ${dec(hc.t[1], 4)} s. Boiling at 100 °C needs 0.25 × 2.26 × 10⁶ = ${hc.q[3]} J, taking ${dec(hc.t[3], 4)} s. Boiling is longer because the latent heat of vaporisation is about seven times that of fusion.`,
  sol: `Melting ${dec(hc.t[1], 4)} s; boiling ${dec(hc.t[3], 4)} s.`,
  scheme: [[`Melting: ${hc.q[1]} J, ${dec(hc.t[1], 4)} s`, 1], [`Boiling: ${hc.q[3]} J, ${dec(hc.t[3], 4)} s`, 1], ['Boiling is longer: L_v ≈ 6.8 L_f', 1]],
  d: 3, c: 'application', t: [2],
}), () => near(hc.t[3] / hc.t[1], LV / LF, 1e-9) || 'heatcurve');
add('heatexpr-match', match({
  stem: 'Match each situation in Column A with the expression for the heat or fractional change involved, in Column B.',
  pairs: [
    ['Warming 3 kg of water by 10 K', 'm c ΔT'],
    ['Melting 3 kg of ice that is already at 0 °C', 'm L_f'],
    ['Heat flowing per second through a slab in steady state', 'K A (T₁ − T₂)/L'],
    ['Fractional change in the length of a heated rod', 'α ΔT'],
  ],
  order: [1, 3, 0, 2],
  marks: 2,
  sol: 'Sensible heat: m c ΔT. Melting at constant temperature: m L_f. Steady conduction: K A (T₁ − T₂)/L. Fractional lengthening: ΔL/L₀ = α ΔT.',
  d: 2, c: 'understanding', t: [1, 2, 3],
}));
void root;
void mn;
void v3;

await import('./questions-t3.mjs');
await import('./questions-t4.mjs');
await import('./questions-long.mjs');
