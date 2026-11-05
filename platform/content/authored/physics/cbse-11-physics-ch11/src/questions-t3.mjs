// ch11 Thermodynamics — question bank, part 2: t03 thermodynamic processes (isochoric, isobaric, isothermal, adiabatic, cyclic, quasi-static).
import { mk, add, r, dec, near } from '../../cbse-11-physics-ch01/src/lib.mjs';
import { R, integ, loopWork } from './phys.mjs';

const { mcq, ar, tf, fill, match, num, short } = mk;
const v3 = (x) => Number(dec(x, 3));

add('proc-mcq', mcq({
  stem: 'On the P–V diagram of a gas, a process is drawn as a vertical straight line running downwards. The process is',
  right: 'an isochoric one in which the pressure falls: no work is done and heat flows out of the gas',
  wrong: ['an isobaric compression, since the pressure changes', 'an isothermal expansion, since the line is straight', 'an adiabatic expansion, since no volume change takes place'],
  sol: r`A vertical line has $\Delta V = 0$, so $W = \int P\,dV = 0$ and $Q = \Delta U$. The pressure (and for an ideal gas the temperature) falls, so $\Delta U < 0$ and heat leaves the gas — option (@K).`,
  d: 2, c: 'understanding', t: [3],
}));
add('steep-mcq', mcq({
  stem: 'An ideal gas expands from the same initial state to the same final volume, once isothermally and once adiabatically. Which statement about the final states is correct?',
  right: 'The final pressure is lower in the adiabatic case, because the gas also cools down',
  wrong: ['Both final pressures are equal, because the final volume is the same', 'The final pressure is lower in the isothermal case, because it absorbs heat', 'The final pressure is higher in the adiabatic case, because no heat escapes'],
  sol: r`Isothermal: $P_2 = P_1V_1/V_2$. Adiabatic: $P_2 = P_1(V_1/V_2)^{\gamma}$ with $\gamma > 1$, which is smaller. The gas does work at the cost of its internal energy and cools — option (@K).`,
  d: 4, c: 'analysis', t: [3],
}));
add('adiabtemp-mcq', mcq({
  stem: 'A cyclist inflates a tyre with a hand pump, working vigorously, and finds that the lower end of the pump barrel becomes warm. The best explanation is that',
  right: 'the air is compressed so quickly that little heat escapes, so the work done on it raises its internal energy and temperature',
  wrong: ['heat flows into the air from the cyclist’s warm hand', 'the pressure of the air rises, and by Boyle’s law that alone raises its temperature', 'compressing a gas never changes its temperature; only friction in the barrel does'],
  sol: r`A fast compression is nearly adiabatic: $Q \approx 0$, so $\Delta U = -W > 0$ because $W$ (done by the gas) is negative. The air’s temperature rises — option (@K).`,
  d: 2, c: 'understanding', t: [3],
}));
add('free-mcq', mcq({
  stem: 'Removing a partition lets an ideal gas rush from one half of an insulated, rigid box into the empty other half (free expansion). The temperature of the gas',
  right: 'does not change, because Q = 0 and W = 0, so ΔU = 0',
  wrong: ['falls, because the gas expands', 'rises, because the pressure drops suddenly', 'falls, because the gas does work against the empty half'],
  sol: r`The box is insulated ($Q = 0$) and rigid with nothing to push against ($W = 0$), so $\Delta U = 0$. The internal energy of an ideal gas depends only on temperature, so $T$ is unchanged — option (@K).`,
  d: 3, c: 'understanding', t: [3],
}));
add('cyc-mcq', mcq({
  stem: 'A gas goes round a closed loop on a P–V diagram in the anticlockwise direction. For one complete loop',
  right: 'net work is done on the gas, and an equal net amount of heat leaves the gas',
  wrong: ['net work is done by the gas, and an equal net amount of heat enters the gas', 'the net work is zero, because the gas returns to its initial state', 'the internal energy of the gas decreases by an amount equal to the area of the loop'],
  sol: r`After a full loop $\Delta U = 0$, so $Q_\text{net} = W_\text{net}$. An anticlockwise loop has negative net work by the gas (work is done on it), so the net heat is negative: heat leaves — option (@K).`,
  d: 3, c: 'application', t: [3],
}));
add('isoth-ar', ar({
  a: 'In an isothermal expansion of an ideal gas, the work done by the gas comes from a decrease in its internal energy.',
  r: 'During an isothermal expansion, the gas absorbs from its surroundings an amount of heat equal to the work it does.',
  key: 'd',
  sol: 'R is true: Q = W. A is false: for an ideal gas ΔU = 0 at constant temperature, so the work does not come from the internal energy — option (d).',
  d: 3, c: 'understanding', t: [3],
}));
add('adiab-tf', tf({
  stem: 'When an ideal gas is compressed adiabatically, the work done on it appears entirely as an increase in its internal energy.',
  key: 't',
  sol: 'True. With Q = 0 the first law gives ΔU = −W, and W (done by the gas) is negative in compression, so ΔU is positive.',
  d: 1, c: 'understanding', t: [3],
}));
add('adiabatic-fill', fill({
  stem: 'A student seals a syringe, wraps it in thick foam so that no heat can pass in or out, and pushes the plunger in quickly. A process in which Q = 0 is called an ___ process.',
  acc: [['adiabatic']],
  sol: 'A process with no heat exchange is **adiabatic**; here ΔU = −W.',
  d: 1, c: 'recall', t: [3],
}));
add('proc-match', match({
  stem: 'Match each thermodynamic process of a gas in Column A with what the first law says about it in Column B.',
  pairs: [
    ['Isothermal expansion of an ideal gas', 'ΔU = 0, so Q = W'],
    ['Adiabatic compression of a gas', 'No heat enters or leaves, so ΔU = −W'],
    ['Heating a gas in a sealed rigid cylinder', 'No work is done, so Q = ΔU'],
    ['Heating a gas under a freely moving piston at steady pressure', 'W = PΔV and Q = nCpΔT'],
  ],
  order: [2, 0, 1, 3],
  marks: 2,
  sol: 'Isothermal: ΔU = 0 so Q = W (r). Adiabatic: Q = 0 so ΔU = −W (p). Rigid cylinder (isochoric): W = 0 so Q = ΔU (q). Steady pressure (isobaric): W = PΔV and Q = nCpΔT (s).',
  d: 2, c: 'understanding', t: [3],
}));
const it = { n: 0.8, T: 320, ratio: 2.5 };
it.W = it.n * R * it.T * Math.log(it.ratio);
add('isoth-num', num({
  stem: 'A sample of 0.80 mol of an ideal gas at 320 K expands isothermally until its volume is 2.5 times the initial volume. Take R = 8.314 J mol⁻¹ K⁻¹. Find the work done by the gas, in J (3 significant figures).',
  value: v3(it.W), tol: 5, unit: 'J',
  sol: r`$W = nRT\ln\dfrac{V_2}{V_1} = ${it.n} \times 8.314 \times ${it.T} \times \ln ${it.ratio} = ${dec(it.n * R * it.T, 5)} \times ${dec(Math.log(it.ratio), 4)}$ J, so $W = ${dec(it.W, 3)}$ J.`,
  scheme: [[`W = nRT ln(V₂/V₁), nRT = ${dec(it.n * R * it.T, 5)} J`, 1], [`ln 2.5 = ${dec(Math.log(it.ratio), 4)}; W = ${dec(it.W, 3)} J`, 1]],
  marks: 2, d: 3, c: 'application', t: [3],
}), (q) => {
  const nRT = 0.8 * R * 320;
  return near(integ((x) => nRT / x, 1, 2.5), q.answer.value, 0.003) || 'isoth';
});
const at = { T1: 300, ratio: 8, gamma: 1.4 };
at.T2 = at.T1 * at.ratio ** (at.gamma - 1);
add('adiabT-num', num({
  stem: 'Air (treated as an ideal gas with γ = 1.40) at 300 K is compressed adiabatically to one-eighth of its volume. Find its final temperature, in K (3 significant figures).',
  value: v3(at.T2), tol: 1, unit: 'K',
  sol: r`$T_1V_1^{\gamma - 1} = T_2V_2^{\gamma - 1}$, so $T_2 = T_1\left(\dfrac{V_1}{V_2}\right)^{\gamma - 1} = ${at.T1} \times 8^{0.40} = ${at.T1} \times ${dec(at.ratio ** 0.4, 4)}$ K, so $T_2 = ${dec(at.T2, 3)}$ K.`,
  scheme: [['T₂ = T₁(V₁/V₂)^(γ−1) with V₁/V₂ = 8', 1], [`8^0.40 = ${dec(at.ratio ** 0.4, 4)}; T₂ = ${dec(at.T2, 3)} K`, 1]],
  marks: 2, d: 3, c: 'application', t: [3],
}), (q) => {
  // independent route: P V^gamma = const and T = P V / (nR) at a common n
  const P1 = 100;
  const V1 = 8;
  const V2 = 1;
  const P2 = P1 * (V1 / V2) ** 1.4;
  return near(300 * ((P2 * V2) / (P1 * V1)), q.answer.value, 0.003) || 'adiabT';
});
const aw = { n: 1.0, T1: 400, T2: 300 };
aw.W = aw.n * 1.5 * R * (aw.T1 - aw.T2);
add('adiabW-num', num({
  stem: 'One mole of a monatomic ideal gas (Cv = 3R/2, R = 8.314 J mol⁻¹ K⁻¹) at 400 K expands adiabatically until its temperature is 300 K. Find the work done by the gas, in J (nearest joule).',
  value: Math.round(aw.W), tol: 1, unit: 'J',
  sol: r`$Q = 0$, so $W = -\Delta U = nC_v(T_1 - T_2) = ${aw.n} \times \tfrac{3}{2} \times 8.314 \times (${aw.T1} - ${aw.T2}) = ${dec(aw.W, 4)}$ J, so $W = ${Math.round(aw.W)}$ J.`,
  scheme: [['Q = 0 so W = −ΔU = nCv(T₁ − T₂)', 1], [`W = 1.0 × 12.471 × 100 = ${Math.round(aw.W)} J`, 1]],
  marks: 2, d: 2, c: 'application', t: [3],
}), (q) => near(1.5 * R * 100, q.answer.value, 0.002) || 'adiabW');
const ac = { n: 0.5, T1: 300, ratio: 4, gamma: 1.4 };
ac.Cv = 2.5 * R;
ac.T2 = ac.T1 * ac.ratio ** (ac.gamma - 1);
ac.Won = ac.n * ac.Cv * (ac.T2 - ac.T1);
add('adiabcomp-num', num({
  stem: 'Air in a pump (0.50 mol, treated as a diatomic ideal gas with Cv = 5R/2 and γ = 1.40) at 300 K is compressed adiabatically to one-quarter of its volume. Find the work done on the gas, in J (3 significant figures).',
  value: v3(ac.Won), tol: 10, unit: 'J',
  sol: r`$T_2 = T_1 \times 4^{0.40} = ${ac.T1} \times ${dec(ac.ratio ** 0.4, 4)} = ${dec(ac.T2, 4)}$ K. Work done on the gas $= \Delta U = nC_v(T_2 - T_1) = ${ac.n} \times ${dec(ac.Cv, 5)} \times ${dec(ac.T2 - ac.T1, 4)} = ${dec(ac.Won, 4)}$ J, so $W_\text{on} = ${dec(ac.Won, 3)}$ J.`,
  scheme: [[`T₂ = 300 × 4^0.40 = ${dec(ac.T2, 4)} K`, 1], ['Q = 0: work done on the gas = ΔU = nCvΔT', 1], [`W_on = ${dec(ac.Won, 3)} J`, 1]],
  marks: 3, d: 3, c: 'application', t: [3],
}), (q) => {
  // independent route: (P1 V1 - P2 V2)/(gamma - 1) with P1 V1 = nRT1 and P2 V2 = P1 V1 * 4^(gamma-1)
  const P1V1 = 0.5 * R * 300;
  const P2V2 = P1V1 * 4 ** 0.4;
  return near((P2V2 - P1V1) / 0.4, q.answer.value, 0.003) || 'adiabcomp';
});
const ap = { P1: 100, ratio: 5, gamma: 1.4 };
ap.P2 = ap.P1 * ap.ratio ** ap.gamma;
add('adiabP-num', num({
  stem: 'Air (γ = 1.40) at 100 kPa is compressed adiabatically to one-fifth of its volume. Find the final pressure, in kPa (3 significant figures).',
  value: v3(ap.P2), tol: 1, unit: 'kPa',
  sol: r`$P_1V_1^{\gamma} = P_2V_2^{\gamma}$, so $P_2 = P_1\left(\dfrac{V_1}{V_2}\right)^{\gamma} = ${ap.P1} \times 5^{1.40} = ${ap.P1} \times ${dec(ap.ratio ** ap.gamma, 4)}$ kPa, so $P_2 = ${dec(ap.P2, 3)}$ kPa.`,
  scheme: [[`P₂ = P₁(V₁/V₂)^γ = 100 × 5^1.40 = 100 × ${dec(ap.ratio ** ap.gamma, 4)}`, 1]],
  d: 2, c: 'application', t: [3],
}), (q) => near(Math.exp(Math.log(100) + 1.4 * Math.log(5)), q.answer.value, 0.003) || 'adiabP');
const cy = { A: [1.0, 100], B: [1.0, 250], C: [4.0, 100] };
cy.W = loopWork([cy.A, cy.B, cy.C]);
add('cyc-num', num({
  stem: 'A gas is taken round the triangular loop A → B → C → A on a P–V diagram, with A (1.0 L, 100 kPa), B (1.0 L, 250 kPa) and C (4.0 L, 100 kPa), A to B being vertical and C to A horizontal. Find the net work done by the gas in one loop, in J.',
  value: cy.W, tol: 1, unit: 'J',
  sol: r`The net work is the area of the triangle: base $= (4.0 - 1.0)$ L $= 3.0$ L, height $= (250 - 100)$ kPa $= 150$ kPa. Area $= \tfrac{1}{2} \times 3.0 \times 150 = ${cy.W}$ J. The loop A→B→C→A runs clockwise, so the net work done by the gas is positive: $W = +${cy.W}$ J.`,
  scheme: [['Net work = area enclosed: ½ × base × height', 1], [`½ × 3.0 × 150 = ${cy.W} J, positive for a clockwise loop`, 1]],
  marks: 2, d: 3, c: 'application', t: [3],
}), (q) => near(0.5 * (4 - 1) * (250 - 100), q.answer.value, 1e-9) && loopWork([cy.A, cy.B, cy.C]) > 0 || 'cyc');
const ic = { n: 2.0, dT: 25 };
ic.Q = ic.n * 2.5 * R * ic.dT;
add('isochq-num', num({
  stem: 'A diatomic gas (Cv = 5R/2, R = 8.314 J mol⁻¹ K⁻¹) in a sealed rigid cylinder, 2.0 mol, is heated through 25 K. Find the heat absorbed, in J (3 significant figures).',
  value: v3(ic.Q), tol: 5, unit: 'J',
  sol: r`The volume is fixed, so $W = 0$ and $Q = \Delta U = nC_v\Delta T = ${ic.n} \times \tfrac{5}{2} \times 8.314 \times ${ic.dT} = ${dec(ic.Q, 4)}$ J, so $Q = ${dec(ic.Q, 3)}$ J.`,
  scheme: [['V constant: W = 0, so Q = nCvΔT', 1]],
  d: 2, c: 'application', t: [3],
}), (q) => near(2 * 2.5 * R * 25, q.answer.value, 0.005) || 'isochq');
const ik = { n: 0.25, T: 350, ratio: 3 };
ik.W = ik.n * R * ik.T * Math.log(1 / ik.ratio);
ik.Qout = -ik.W;
add('isothcomp-num', num({
  stem: 'A sample of 0.25 mol of an ideal gas at 350 K is compressed isothermally to one-third of its volume (R = 8.314 J mol⁻¹ K⁻¹). Find the heat given out by the gas to its surroundings, in J (3 significant figures).',
  value: v3(ik.Qout), tol: 3, unit: 'J',
  sol: r`$\Delta U = 0$, so $Q = W = nRT\ln\dfrac{V_2}{V_1} = ${ik.n} \times 8.314 \times ${ik.T} \times \ln\dfrac{1}{3} = ${dec(ik.n * R * ik.T, 5)} \times (-${dec(Math.log(3), 4)}) = ${dec(ik.W, 4)}$ J. The negative sign means heat leaves the gas, so the heat given out is $-Q = ${dec(ik.Qout, 3)}$ J.`,
  scheme: [['ΔU = 0, so Q = W = nRT ln(V₂/V₁)', 1], [`ln(1/3) = −${dec(Math.log(3), 4)}; Q = ${dec(ik.W, 4).replace("-", "−")} J, so heat given out = ${dec(ik.Qout, 3)} J`, 1]],
  marks: 2, d: 3, c: 'application', t: [3],
}), (q) => near(-integ((x) => (0.25 * R * 350) / x, 1, 1 / 3), q.answer.value, 0.003) && near(-integ((x) => (0.25 * R * 350) / x, 1, 1 / 3), q.answer.value, 0.003) || 'isothcomp');
const tb = { n: 0.20, P: 300, V: 4.0 };
tb.T = (tb.P * 1e3 * tb.V * 1e-3) / (tb.n * R);
add('tB-num', num({
  stem: 'At state B of a cycle, 0.20 mol of an ideal gas has pressure 300 kPa and volume 4.0 L. Using PV = nRT with R = 8.314 J mol⁻¹ K⁻¹, find its temperature at B, in K (3 significant figures).',
  value: v3(tb.T), tol: 2, unit: 'K',
  sol: r`$T = \dfrac{PV}{nR} = \dfrac{(300 \times 10^3)(4.0 \times 10^{-3})}{${tb.n} \times 8.314} = \dfrac{1200}{${dec(tb.n * R, 4)}}$ K, so $T = ${dec(tb.T, 3)}$ K.`,
  scheme: [['P = 300 × 10³ Pa, V = 4.0 × 10⁻³ m³, so PV = 1200 J', 1], [`T = PV/(nR) = ${dec(tb.T, 3)} K`, 1]],
  marks: 2, d: 2, c: 'application', t: [3],
}), (q) => near(1200 / (0.2 * R), q.answer.value, 0.003) || 'tB');
add('quasi-short', short({
  marks: 2,
  stem: 'What is meant by a quasi-static process? Why can the expansion of a gas be drawn as a curve on a P–V diagram only if it is quasi-static?',
  model: 'A **quasi-static** process is carried out so slowly that the system is in thermal and mechanical equilibrium at every stage. Only then do P, V and T have single, definite values at each instant, so each intermediate state is a point and the whole path can be drawn as a curve on a P–V diagram.',
  sol: 'Equilibrium at each stage; definite P, V, T give points on the curve.',
  scheme: [['Quasi-static: so slow that the system is in equilibrium at every stage', 1], ['Only then are P, V and T defined at each instant, giving a curve of points', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('cyc-short', short({
  marks: 2,
  stem: 'A gas goes through a complete cycle and returns to its initial state. State, with reasons, the change in its internal energy and the relation between the net heat absorbed and the net work done.',
  model: r`Internal energy is a state function, so after a full cycle $\Delta U = 0$. The first law then gives $Q_\text{net} = W_\text{net}$: the net heat absorbed by the gas in the cycle equals the net work it does, which is the area enclosed by the loop on the P–V diagram.`,
  sol: 'ΔU = 0, so Q = W.',
  scheme: [['ΔU = 0 over a cycle because U is a state function', 1], ['First law: net heat = net work (area of the loop)', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('isoad-short3', short({
  marks: 3,
  stem: 'An ideal gas expands from the same initial state to the same final volume, once isothermally and once adiabatically. Compare (a) the final temperatures and (b) the work done, giving a reason for each.',
  model: r`(a) Isothermally the temperature stays the same. Adiabatically $Q = 0$, the gas does work at the cost of its internal energy and cools, so its final temperature is lower. (b) The adiabat is steeper than the isotherm on the P–V diagram, so the area under it is smaller: the gas does less work in the adiabatic expansion.`,
  sol: 'Final T lower for adiabat; steeper curve, smaller area, less work.',
  scheme: [['Isothermal: T unchanged; adiabatic: Q = 0 and the gas cools', 1], ['Adiabat is steeper than the isotherm through the same point', 1], ['Smaller area under the adiabat: less work done', 1]],
  d: 3, c: 'analysis', t: [3],
}));
void ar;
void tf;
