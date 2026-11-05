// ch11 Thermodynamics — question bank, part 4: long answers (5 marks) and case-based items (4 marks: 1 + 1 + 2 with an either/or part (c)).
import { mk, add, r, dec, near } from '../../cbse-11-physics-ch01/src/lib.mjs';
import { R, R6, integ, loopWork } from './phys.mjs';

const { mcq, num, short, long, part } = mk;
const v3 = (x) => Number(dec(x, 3));

// ================================================================ long answers
// three paths between A (1.0 L, 300 kPa) and B (4.0 L, 100 kPa), monatomic ideal gas
const pa = { A: [1.0, 300], B: [4.0, 100] };
pa.dV = pa.B[0] - pa.A[0];
pa.W1 = pa.A[1] * pa.dV;
pa.W2 = pa.B[1] * pa.dV;
pa.W3 = ((pa.A[1] + pa.B[1]) / 2) * pa.dV;
pa.dU = 1.5 * (pa.B[0] * pa.B[1] - pa.A[0] * pa.A[1]);
pa.Q1 = pa.dU + pa.W1;
pa.Q2 = pa.dU + pa.W2;
pa.Q3 = pa.dU + pa.W3;
add('pathlong', long({
  stem: '(a) State the first law of thermodynamics and the sign convention you use. (b) A monatomic ideal gas, for which ΔU = (3/2)Δ(PV), is taken from state A (1.0 L, 300 kPa) to state B (4.0 L, 100 kPa) along three paths: path I expands at constant pressure to 4.0 L and then cools at constant volume to 100 kPa; path II cools at constant volume to 100 kPa and then expands at constant pressure to 4.0 L; path III is a straight line from A to B. Find (i) the work done by the gas along each path, (ii) the change in its internal energy, and (iii) the heat absorbed along each path. (c) What do your results show about W, Q and ΔU?',
  model: r`(a) **First law:** $\Delta U = Q - W$, the heat $Q$ supplied to the system minus the work $W$ done by it equals the increase in internal energy; $Q$ is positive into the system and $W$ is positive when the system does work.

(b)(i) Work = area under the path on the P–V diagram (kPa × L = J). Path I: $W = P\,\Delta V = ${pa.A[1]} \times ${pa.dV} = ${pa.W1}$ J. Path II: $W = ${pa.B[1]} \times ${pa.dV} = ${pa.W2}$ J. Path III: trapezoid, $W = \tfrac{1}{2}(${pa.A[1]} + ${pa.B[1]}) \times ${pa.dV} = ${pa.W3}$ J.

(ii) $\Delta U = \tfrac{3}{2}(P_BV_B - P_AV_A) = \tfrac{3}{2}(${pa.B[0] * pa.B[1]} - ${pa.A[0] * pa.A[1]}) = ${pa.dU}$ J, the same for every path.

(iii) $Q = \Delta U + W$: path I $= ${pa.Q1}$ J, path II $= ${pa.Q2}$ J, path III $= ${pa.Q3}$ J.

(c) $\Delta U$ depends only on the end states, but $W$ and $Q$ depend on the path.`,
  sol: 'First law; W = 900, 300, 600 J; ΔU = 150 J; Q = 1050, 450, 750 J; only ΔU is path independent.',
  scheme: [['First law ΔU = Q − W with the sign convention', 1], [`Work: ${pa.W1} J, ${pa.W2} J and ${pa.W3} J from the areas`, 1], [`ΔU = (3/2)(${pa.B[0] * pa.B[1]} − ${pa.A[0] * pa.A[1]}) = ${pa.dU} J`, 1], [`Heat: Q = ΔU + W = ${pa.Q1} J, ${pa.Q2} J, ${pa.Q3} J`, 1], ['ΔU is path independent; W and Q are not', 1]],
  d: 4, c: 'application', t: [2], wl: null,
}), () => {
  const lin = (v) => pa.A[1] + ((pa.B[1] - pa.A[1]) * (v - pa.A[0])) / pa.dV;
  return near(integ(lin, 1, 4), pa.W3, 1e-9) && pa.W1 === 900 && pa.W2 === 300 && pa.W3 === 600 && pa.dU === 150 && pa.Q1 === 1050 && pa.Q2 === 450 && pa.Q3 === 750 || 'pathlong';
});
const cc = { n: 2.0, T1: 300, T2: 360 };
cc.dT = cc.T2 - cc.T1;
cc.Cv = 2.5 * R;
cc.Cp = cc.Cv + R;
cc.Q = cc.n * cc.Cp * cc.dT;
cc.dU = cc.n * cc.Cv * cc.dT;
cc.W = cc.n * R * cc.dT;
add('cpcvlong', long({
  stem: '(a) Using the first law and the ideal gas equation, derive Cp − Cv = R for one mole of an ideal gas. (b) Two moles of a diatomic ideal gas (Cv = 5R/2, R = 8.314 J mol⁻¹ K⁻¹) are heated at constant pressure from 300 K to 360 K. Find (i) the heat absorbed, (ii) the increase in internal energy and (iii) the work done by the gas.',
  model: r`(a) Heat one mole at constant pressure through $\Delta T$. By the first law, $C_p\Delta T = \Delta U + P\Delta V$. For an ideal gas $\Delta U = C_v\Delta T$ for any process. From $PV = RT$ at constant $P$, $P\Delta V = R\Delta T$. So $C_p\Delta T = C_v\Delta T + R\Delta T$, that is $C_p - C_v = R$.

(b) $C_v = \tfrac{5}{2}R = ${dec(cc.Cv, 5)}$ J mol$^{-1}$ K$^{-1}$, $C_p = C_v + R = ${dec(cc.Cp, 5)}$ J mol$^{-1}$ K$^{-1}$, $\Delta T = ${cc.dT}$ K.

(i) $Q = nC_p\Delta T = ${cc.n} \times ${dec(cc.Cp, 5)} \times ${cc.dT} \approx ${dec(cc.Q, 4)}$ J.

(ii) $\Delta U = nC_v\Delta T = ${cc.n} \times ${dec(cc.Cv, 5)} \times ${cc.dT} \approx ${dec(cc.dU, 4)}$ J.

(iii) $W = nR\Delta T = ${cc.n} \times 8.314 \times ${cc.dT} \approx ${dec(cc.W, 4)}$ J. Check: $Q - W \approx ${dec(cc.Q - cc.W, 4)}$ J $= \Delta U$.`,
  sol: 'Derivation; Cp = 29.10; Q ≈ 3492 J, ΔU ≈ 2494 J, W ≈ 997.7 J.',
  scheme: [['First law at constant pressure: CpΔT = ΔU + PΔV', 1], ['ΔU = CvΔT and PΔV = RΔT give Cp − Cv = R', 1], [`Q = nCpΔT ≈ ${dec(cc.Q, 4)} J`, 1], [`ΔU = nCvΔT ≈ ${dec(cc.dU, 4)} J`, 1], [`W = nRΔT ≈ ${dec(cc.W, 4)} J`, 1]],
  d: 3, c: 'application', t: [2], wl: null,
}), () => near(cc.Q - cc.W, cc.dU, 1e-12) && near(cc.dU / cc.Q, 5 / 7, 1e-12) || 'cpcvlong');
const il = { n: 1.0, T: 300, ratio: 2, gamma: 5 / 3 };
il.nRT = il.n * R * il.T;
il.Wiso = il.nRT * Math.log(il.ratio);
il.T2 = il.T * (1 / il.ratio) ** (il.gamma - 1);
il.Wadi = il.n * 1.5 * R * (il.T - il.T2);
add('isoadlong', long({
  stem: '(a) Show that the work done by n moles of an ideal gas expanding isothermally at temperature T from V₁ to V₂ is nRT ln(V₂/V₁). (b) Show that in an adiabatic expansion the work done is (P₁V₁ − P₂V₂)/(γ − 1). (c) One mole of a monatomic ideal gas (γ = 5/3, Cv = 3R/2, R = 8.314 J mol⁻¹ K⁻¹) at 300 K doubles its volume, once isothermally and once adiabatically. Find the work done in each case and the final temperature in the adiabatic case.',
  model: r`(a) $P = nRT/V$, so $W = \int_{V_1}^{V_2}\dfrac{nRT}{V}\,dV = nRT\ln\dfrac{V_2}{V_1}$.

(b) Along an adiabat $PV^{\gamma} = K$, so $W = \int_{V_1}^{V_2} K V^{-\gamma}\,dV = \dfrac{K}{1-\gamma}\left(V_2^{1-\gamma} - V_1^{1-\gamma}\right) = \dfrac{P_2V_2 - P_1V_1}{1-\gamma} = \dfrac{P_1V_1 - P_2V_2}{\gamma - 1}$.

(c) Isothermal: $nRT = ${dec(il.nRT, 5)}$ J, so $W = ${dec(il.nRT, 5)} \times \ln 2 \approx ${dec(il.Wiso, 4)}$ J.

Adiabatic: $T_2 = T_1\left(\dfrac{V_1}{V_2}\right)^{\gamma-1} = ${il.T} \times \left(\tfrac{1}{2}\right)^{2/3} \approx ${dec(il.T2, 4)}$ K, and $W = nC_v(T_1 - T_2) = \tfrac{3}{2} \times 8.314 \times (${il.T} - ${dec(il.T2, 4)}) \approx ${dec(il.Wadi, 4)}$ J.

The isothermal work is larger: the adiabatic gas cools as it expands.`,
  sol: 'Integrals; W_iso ≈ 1729 J; T₂ ≈ 189.0 K; W_adi ≈ 1384 J.',
  scheme: [['Isothermal: W = ∫(nRT/V)dV = nRT ln(V₂/V₁)', 1], ['Adiabatic: PV^γ = K; W = (P₁V₁ − P₂V₂)/(γ − 1)', 1], [`W_iso = nRT ln 2 ≈ ${dec(il.Wiso, 4)} J`, 1], [`T₂ = 300 × (1/2)^(2/3) ≈ ${dec(il.T2, 4)} K`, 1], [`W_adi = nCv(T₁ − T₂) ≈ ${dec(il.Wadi, 4)} J, less than W_iso`, 1]],
  d: 4, c: 'application', t: [3], wl: null,
}), () => {
  const K = 100 * 1 ** il.gamma; // any state: use P1 V1 = nRT with V1 = 1 L (P1 in kPa = nRT)
  void K;
  const P1 = il.nRT; // kPa for V1 = 1 L
  const adi = (v) => P1 * (1 / v) ** il.gamma;
  const wNum = integ(adi, 1, 2);
  const wIso = integ((v) => il.nRT / v, 1, 2);
  return near(wNum, il.Wadi, 1e-6) && near(wIso, il.Wiso, 1e-6) && il.Wiso > il.Wadi || 'isoadlong';
});
const cl = { A: [1.0, 200], B: [1.0, 500], C: [3.0, 500], D: [3.0, 200] };
cl.W = (cl.B[1] - cl.A[1]) * (cl.C[0] - cl.B[0]);
cl.QAB = 1.5 * (cl.B[0] * cl.B[1] - cl.A[0] * cl.A[1]);
cl.QBC = 2.5 * cl.B[1] * (cl.C[0] - cl.B[0]);
cl.QCD = 1.5 * (cl.D[0] * cl.D[1] - cl.C[0] * cl.C[1]);
cl.QDA = 2.5 * cl.A[1] * (cl.A[0] - cl.D[0]);
cl.Qin = cl.QAB + cl.QBC;
cl.Qout = -(cl.QCD + cl.QDA);
cl.eta = cl.W / cl.Qin;
add('cyclelong', long({
  stem: '(a) What is a cyclic process? State the change in internal energy over a cycle and the relation between the net heat and the net work. (b) A monatomic ideal gas (Cv = 3R/2) is taken round the cycle A→B→C→D→A on a P–V diagram: A (1.0 L, 200 kPa), B (1.0 L, 500 kPa), C (3.0 L, 500 kPa), D (3.0 L, 200 kPa), with AB and CD at constant volume and BC and DA at constant pressure. Find (i) the net work done by the gas, (ii) the heat absorbed, (iii) the heat rejected, and (iv) the efficiency of this engine.',
  model: r`(a) A **cyclic process** returns the system to its initial state. Then $\Delta U = 0$, so the net heat absorbed equals the net work done, which is the area enclosed by the loop on the P–V diagram.

(b)(i) $W = (500 - 200) \times (3.0 - 1.0) = ${cl.W}$ J (the loop is clockwise, so positive).

(ii) AB (constant V): $Q = \tfrac{3}{2}\Delta(PV) = \tfrac{3}{2}(${cl.B[0] * cl.B[1]} - ${cl.A[0] * cl.A[1]}) = ${cl.QAB}$ J. BC (constant P): $Q = \tfrac{5}{2}P\Delta V = \tfrac{5}{2} \times ${cl.B[1]} \times ${cl.C[0] - cl.B[0]} = ${cl.QBC}$ J. Heat absorbed $Q_1 = ${cl.QAB} + ${cl.QBC} = ${cl.Qin}$ J.

(iii) CD: $Q = ${cl.QCD}$ J; DA: $Q = ${cl.QDA}$ J. Heat rejected $Q_2 = ${cl.Qout}$ J. Check: $Q_1 - Q_2 = ${cl.Qin - cl.Qout} = W$.

(iv) $\eta = \dfrac{W}{Q_1} = \dfrac{${cl.W}}{${cl.Qin}} \approx ${dec(cl.eta * 100, 3)}\%$.`,
  sol: 'ΔU = 0 in a cycle; W = 600 J; Q_in = 2950 J; Q_out = 2350 J; η ≈ 20.3%.',
  scheme: [['Cyclic process: ΔU = 0, so net heat = net work = area of the loop', 1], [`Net work = (500 − 200) × (3.0 − 1.0) = ${cl.W} J`, 1], [`Heat absorbed on AB and BC: ${cl.QAB} + ${cl.QBC} = ${cl.Qin} J`, 1], [`Heat rejected on CD and DA = ${cl.Qout} J (Q₁ − Q₂ = W)`, 1], [`η = W/Q₁ = ${cl.W}/${cl.Qin} ≈ ${dec(cl.eta * 100, 3)}%`, 1]],
  d: 4, c: 'application', t: [3, 4], wl: null,
}), () => loopWork([cl.A, cl.B, cl.C, cl.D]) === cl.W && near(cl.Qin - cl.Qout, cl.W, 1e-12) && cl.W === 600 && cl.Qin === 2950 && cl.Qout === 2350 || 'cyclelong');
const ef = { Q2: 840, W: 210, eQ1: 1500, eQ2: 1100 };
ef.cop = ef.Q2 / ef.W;
ef.Q1 = ef.Q2 + ef.W;
ef.eW = ef.eQ1 - ef.eQ2;
ef.eta = R6((ef.eW / ef.eQ1) * 100);
add('engfridge-long', long({
  stem: '(a) State the Kelvin–Planck and Clausius statements of the second law of thermodynamics. (b) A refrigerator removes 840 J of heat from its cold chamber in each cycle while 210 J of work is supplied to it. Find its coefficient of performance and the heat it releases to the surroundings per cycle. (c) A heat engine absorbs 1500 J and rejects 1100 J per cycle. Find its efficiency. (d) Explain why the efficiency of an engine is always less than 1 while the coefficient of performance of a refrigerator can exceed 1.',
  model: r`(a) **Kelvin–Planck:** no cyclic device can absorb heat from a single reservoir and convert all of it into work with no other effect. **Clausius:** no cyclic device can have, as its only result, the transfer of heat from a colder body to a hotter body.

(b) $\text{COP} = \dfrac{Q_2}{W} = \dfrac{${ef.Q2}}{${ef.W}} = ${ef.cop}$. Heat released $Q_1 = Q_2 + W = ${ef.Q2} + ${ef.W} = ${ef.Q1}$ J.

(c) $W = Q_1 - Q_2 = ${ef.eQ1} - ${ef.eQ2} = ${ef.eW}$ J, so $\eta = \dfrac{${ef.eW}}{${ef.eQ1}} \approx ${dec(ef.eta, 3)}\%$.

(d) $\eta = 1 - Q_2/Q_1$ reaches 1 only if $Q_2 = 0$, which Kelvin–Planck forbids. COP $= Q_2/W$ compares the heat moved with the work used, and moving heat takes much less work than the heat moved, so it can exceed 1.`,
  sol: 'Statements; COP = 4.0 and Q₁ = 1050 J; η ≈ 26.7%; η < 1 but COP > 1 possible.',
  scheme: [['Kelvin–Planck and Clausius statements', 1], [`COP = Q₂/W = ${ef.Q2}/${ef.W} = ${ef.cop}`, 1], [`Q₁ = Q₂ + W = ${ef.Q1} J`, 1], [`η = (${ef.eQ1} − ${ef.eQ2})/${ef.eQ1} ≈ ${dec(ef.eta, 3)}%`, 1], ['η = 1 needs Q₂ = 0 (forbidden); COP = Q₂/W has no such bound', 1]],
  d: 3, c: 'application', t: [4], wl: null,
}), () => ef.cop === 4 && ef.Q1 === 1050 && ef.eW === 400 && near(ef.eta, 26.6667, 1e-5) || 'engfridge-long');

// ================================================================ case-based (4 marks: 1 + 1 + 2)
const pu = { n: 0.020, T1: 300, ratio: 6, gamma: 1.4 };
pu.Cv = 2.5 * R;
pu.T2 = pu.T1 * pu.ratio ** (pu.gamma - 1);
pu.W = pu.n * pu.Cv * (pu.T2 - pu.T1);
add('pump-case', mk.case({
  passage: 'A cyclist in Pune pumps up a tyre in a hurry. In one quick stroke, 0.020 mol of air in the pump barrel, initially at 300 K, is compressed to one-sixth of its volume. Treat the air as an ideal diatomic gas (Cv = 5R/2, γ = 1.40, R = 8.314 J mol⁻¹ K⁻¹). The stroke is so fast that no heat escapes from the barrel.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'The compression in the pump barrel is best described as',
      right: 'an adiabatic process, because practically no heat enters or leaves the air',
      wrong: ['an isothermal process, because the air is in a pump', 'an isochoric process, because the barrel does not change', 'an isobaric process, because the cyclist pushes with a steady force'],
      sol: 'The stroke is so fast that Q ≈ 0, which is the definition of an adiabatic process. The volume and pressure both change, and the temperature rises — option (@K).',
      d: 1, c: 'understanding', t: [3],
    })),
    part('b', num({
      stem: 'Find the temperature of the air at the end of the stroke, in K (3 significant figures).',
      value: v3(pu.T2), tol: 1, unit: 'K',
      sol: r`$T_2 = T_1\left(\dfrac{V_1}{V_2}\right)^{\gamma - 1} = ${pu.T1} \times 6^{0.40} = ${pu.T1} \times ${dec(pu.ratio ** 0.4, 4)}$ K, so $T_2 = ${dec(pu.T2, 3)}$ K.`,
      scheme: [[`T₂ = 300 × 6^0.40 = 300 × ${dec(pu.ratio ** 0.4, 4)} = ${dec(pu.T2, 3)} K`, 1]],
      d: 2, c: 'application', t: [3],
    })),
    part('c', short({
      marks: 2,
      stem: 'Find the work done on the air during the stroke.',
      model: r`The stroke is adiabatic, with $Q = 0$, so by the first law all the work done on the air goes into its internal energy: the work done on the air equals the rise in its internal energy, $W_\text{on} = nC_v(T_2 - T_1) = ${pu.n} \times ${dec(pu.Cv, 5)} \times (${dec(pu.T2, 4)} - ${pu.T1}) \approx ${dec(pu.W, 3)}$ J.`,
      sol: 'W_on = nCvΔT ≈ 131 J.',
      scheme: [['Q = 0, so work done on the gas = ΔU = nCvΔT', 1], [`${pu.n} × ${dec(pu.Cv, 5)} × ${dec(pu.T2 - pu.T1, 4)} ≈ ${dec(pu.W, 3)} J`, 1]],
      d: 3, c: 'application', t: [3],
    }), [
      short({
        marks: 2,
        stem: 'A classmate says that if the same compression were done very slowly, with the barrel in good thermal contact with the surrounding air, the final temperature would still be about 614 K. Evaluate this claim.',
        model: r`The claim is **wrong**. A very slow compression in good thermal contact is nearly **isothermal**: the heat produced flows out, so the air stays near 300 K. The 614 K rise happens only because the quick stroke gives the heat no time to escape.`,
        sol: 'Slow compression is isothermal; stays near 300 K.',
        scheme: [['Claim wrong: slow compression in thermal contact is nearly isothermal', 1], ['Heat escapes, so T stays near 300 K; 614 K needs a fast (adiabatic) stroke', 1]],
        d: 4, c: 'evaluation', t: [3],
      }),
    ]),
  ],
}), (q) => near(pu.ratio ** 0.4, 2.0477, 1e-3) && near(q.children[1].answer.value, 614, 0.002) && near(pu.W, 130.65, 0.002) || 'pump');
const st = { A: [2.0, 250], B: [5.0, 250], C: [5.0, 100] };
st.WAB = st.A[1] * (st.B[0] - st.A[0]);
st.dUBC = 1.5 * (st.C[0] * st.C[1] - st.B[0] * st.B[1]);
add('pvstate-case', mk.case({
  passage: 'A monatomic ideal gas (Cv = 3R/2) is held in a cylinder by a light movable piston. It is taken from state A (2.0 L, 250 kPa) to state B (5.0 L, 250 kPa) by heating at constant pressure. It is then cooled at constant volume from B to state C, where the pressure is 100 kPa.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'On a P–V diagram the step B → C is',
      right: 'a vertical line downwards: no work is done and heat leaves the gas',
      wrong: ['a horizontal line to the left: the gas is compressed at constant pressure', 'a curve like an isotherm: the temperature stays constant', 'a vertical line upwards: heat enters the gas'],
      sol: r`B to C is at constant volume (isochoric), so $W = 0$; the pressure falls, so $\Delta U < 0$ and $Q = \Delta U < 0$: heat leaves the gas — option (@K).`,
      d: 1, c: 'understanding', t: [3],
    })),
    part('b', num({
      stem: 'Find the work done by the gas in the step A → B, in J.',
      value: st.WAB, tol: 1, unit: 'J',
      sol: r`At constant pressure $W = P\,\Delta V = ${st.A[1]} \times (${st.B[0]} - ${st.A[0]}) = ${st.WAB}$ J (kPa × L = J).`,
      scheme: [[`W = PΔV = ${st.A[1]} × ${st.B[0] - st.A[0]} = ${st.WAB} J`, 1]],
      d: 2, c: 'application', t: [2],
    })),
    part('c', short({
      marks: 2,
      stem: 'Find the heat that flows into or out of the gas in the step B → C.',
      model: r`In the step B → C the volume is constant, so no work is done and the heat flow equals the change in internal energy: $W = 0$, so $Q = \Delta U = \tfrac{3}{2}(P_CV_C - P_BV_B) = \tfrac{3}{2}(${st.C[0] * st.C[1]} - ${st.B[0] * st.B[1]}) = ${st.dUBC}$ J. The negative sign means that ${-st.dUBC} J of heat leaves the gas.`,
      sol: 'Q = ΔU = −1125 J.',
      scheme: [['W = 0 at constant volume, so Q = ΔU', 1], [`Q = (3/2)(${st.C[0] * st.C[1]} − ${st.B[0] * st.B[1]}) = −${-st.dUBC} J: ${-st.dUBC} J leaves the gas`, 1]],
      d: 3, c: 'application', t: [2, 3],
    }), [
      short({
        marks: 2,
        stem: 'A student says that the gas does negative work in the step B → C because its pressure falls. Evaluate this claim.',
        model: r`The claim is **wrong**. Work is $\int P\,dV$, and in B → C the volume does not change, so $dV = 0$ and $W = 0$ however much the pressure falls. A negative work would need the volume to decrease (compression).`,
        sol: 'W = ∫P dV = 0 since V is constant.',
        scheme: [['Claim wrong: W = ∫P dV and dV = 0', 1], ['Negative work needs a decrease in volume, not a fall in pressure', 1]],
        d: 4, c: 'evaluation', t: [2],
      }),
    ]),
  ],
}), (q) => st.WAB === 750 && st.dUBC === -1125 && q.children[1].answer.value === 750 || 'pvstate');
const sy = { n: 0.0040, T: 300, ratio: 4 };
sy.Q = sy.n * R * sy.T * Math.log(sy.ratio);
add('syringe-case', mk.case({
  passage: 'In a practical, a student traps 0.0040 mol of air (an ideal gas, R = 8.314 J mol⁻¹ K⁻¹) in a syringe at 300 K and compresses it to one-quarter of its volume in two trials. In trial 1 she pushes the plunger very slowly with the syringe standing in a water bath at 300 K. In trial 2 she wraps the syringe in thick foam and pushes the plunger in quickly.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'Which description of the two trials is most appropriate?',
      right: 'Trial 1 is nearly isothermal and trial 2 is nearly adiabatic',
      wrong: ['Trial 1 is nearly adiabatic and trial 2 is nearly isothermal', 'Both trials are isothermal, since the final volume is the same', 'Both trials are adiabatic, since the plunger is pushed in'],
      sol: 'In trial 1 the slow push and the water bath let heat flow out, keeping T fixed (isothermal). In trial 2 the foam and the speed leave no time for heat flow (Q ≈ 0, adiabatic) — option (@K).',
      d: 2, c: 'understanding', t: [3],
    })),
    part('b', num({
      stem: 'Find the heat given out by the air to the water bath in trial 1, in J (3 significant figures).',
      value: v3(sy.Q), tol: 0.1, unit: 'J',
      sol: r`The temperature is constant, so $\Delta U = 0$ and the heat given out equals the work done on the gas: $|Q| = nRT\ln\dfrac{V_1}{V_2} = ${sy.n} \times 8.314 \times ${sy.T} \times \ln ${sy.ratio} = ${dec(sy.n * R * sy.T, 4)} \times ${dec(Math.log(sy.ratio), 4)}$ J, so $|Q| = ${dec(sy.Q, 3)}$ J.`,
      scheme: [['Isothermal: ΔU = 0, so |Q| = |W| = nRT ln(V₁/V₂)', 1]],
      d: 3, c: 'application', t: [3],
    })),
    part('c', short({
      marks: 2,
      stem: 'Explain why the final pressure of the air is higher in trial 2 than in trial 1, although the final volume is the same.',
      model: r`In trial 2 no heat escapes, so the work done on the air raises its internal energy and its temperature. Since $PV = nRT$, the final pressure is higher at the same volume. In trial 1 the temperature stays at 300 K, so the pressure is lower.`,
      sol: 'Adiabatic: T rises; P = nRT/V is higher.',
      scheme: [['Trial 2: Q = 0, so the work done raises the temperature', 1], ['PV = nRT: higher T at the same V means higher P', 1]],
      d: 3, c: 'understanding', t: [3],
    }), [
      short({
        marks: 2,
        stem: 'A student says the gas does the same amount of work in both trials because the change in volume is the same. Evaluate this claim.',
        model: r`The claim is **wrong**. Work is the area under the path on the P–V diagram, and the two paths differ: the adiabat in trial 2 lies above the isotherm of trial 1, so more work must be done on the air. Equal volume change does not mean equal work.`,
        sol: 'Work is the area under the path; paths differ.',
        scheme: [['Claim wrong: work is the area under the path, not just ΔV', 1], ['The adiabatic path lies above the isotherm: more work done on the gas in trial 2', 1]],
        d: 4, c: 'evaluation', t: [3, 2],
      }),
    ]),
  ],
}), (q) => near(integ((x) => (0.004 * R * 300) / x, 1, 0.25), -sy.Q, 1e-6) && near(q.children[1].answer.value, 13.8, 0.005) || 'syringe');
const pl = { Q1: 1500, Pel: 450 };
pl.eta = R6((pl.Pel / pl.Q1) * 100);
pl.Q2 = pl.Q1 - pl.Pel;
add('plant-case', mk.case({
  passage: 'A coal-fired power plant in Odisha receives heat at a rate of 1500 MW from burning coal. The steam cycle works as a heat engine and the plant delivers 450 MW of electrical power. The rest of the heat is carried away by cooling water.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'The plant has to reject heat to cooling water because',
      right: 'no cyclic engine can convert all the heat it absorbs from a hot source into work (Kelvin–Planck statement)',
      wrong: ['the first law of thermodynamics requires part of the energy to be destroyed', 'the cooling water is needed only to stop the turbine blades from overheating', 'the boiler produces more heat than the coal supplies'],
      sol: 'Energy is conserved, so the heat not turned into work must go somewhere. The second law (Kelvin–Planck statement) says some heat must be rejected to a colder body in every cycle — option (@K).',
      d: 2, c: 'understanding', t: [4],
    })),
    part('b', num({
      stem: 'Find the efficiency of the plant, in per cent.',
      value: pl.eta, tol: 0.2, unit: '%',
      sol: r`$\eta = \dfrac{\text{power output}}{\text{heat input rate}} \times 100 = \dfrac{${pl.Pel}}{${pl.Q1}} \times 100 = ${pl.eta}\%$.`,
      scheme: [[`η = ${pl.Pel}/${pl.Q1} × 100 = ${pl.eta}%`, 1]],
      d: 2, c: 'application', t: [4],
    })),
    part('c', short({
      marks: 2,
      stem: 'Find the rate at which heat is rejected to the cooling water.',
      model: r`In a steady cycle the energy balance per second is $W = Q_1 - Q_2$, so the heat that is not delivered as electrical power is carried away by the cooling water, and the rate of heat rejection is $Q_2 = ${pl.Q1} - ${pl.Pel} = ${pl.Q2}$ MW, that is, ${pl.Q2} MJ every second.`,
      sol: 'Q₂ = 1500 − 450 = 1050 MW.',
      scheme: [['W = Q₁ − Q₂ for a steady cycle', 1], [`Q₂ = ${pl.Q1} − ${pl.Pel} = ${pl.Q2} MW`, 1]],
      d: 2, c: 'application', t: [4],
    }), [
      short({
        marks: 2,
        stem: 'An engineer claims that with perfect lubrication and heat insulation the plant could reach an efficiency of 100%. Evaluate this claim.',
        model: r`The claim is **wrong**. Friction and heat leaks lower the efficiency of a real plant, but even without them the Kelvin–Planck statement forbids converting all the heat from the hot source into work. Some heat must be rejected to a colder body, so $\eta < 1$ always.`,
        sol: 'Kelvin–Planck forbids 100%.',
        scheme: [['Claim wrong: friction and leaks are not the only limit', 1], ['The second law requires heat rejection: η < 1 even for an ideal engine', 1]],
        d: 4, c: 'evaluation', t: [4],
      }),
    ]),
  ],
}), (q) => pl.eta === 30 && pl.Q2 === 1050 && q.children[1].answer.value === 30 || 'plant');
