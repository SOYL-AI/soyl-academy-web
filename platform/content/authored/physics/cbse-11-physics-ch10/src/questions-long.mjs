// ch10 question bank, part 4: long answers (5 marks) and case-based items (4 marks: 1 + 1 + 2 with an either/or part (c)).
import { mk, add, r, dec, near } from '../../cbse-11-physics-ch01/src/lib.mjs';
import { CW, CICE, LF, LV, ALPHA, heatBetween, mixTemp, seriesTwo, coolNumeric } from './phys.mjs';

const { mcq, num, short, long, part } = mk;
const v3 = (x) => Number(dec(x, 3));

// ================================================================ long answers
const lx = { a: ALPHA.aluminium, L: 80.0, W: 50.0, T1: 20, T2: 120, d: 4.0 };
lx.dT = lx.T2 - lx.T1;
lx.A0 = lx.L * lx.W;
lx.dA = 2 * lx.a * lx.A0 * lx.dT;
lx.dd = lx.a * lx.d * lx.dT;
lx.d2 = lx.d + lx.dd;
add('expan-long', long({
  stem: '(a) Define the coefficient of linear expansion α and give its SI unit. (b) Show that the coefficient of area expansion of an isotropic solid is β = 2α. (c) A rectangular aluminium sheet 80.0 cm by 50.0 cm at 20 °C is heated to 120 °C. Taking α = 2.3 × 10⁻⁵ K⁻¹, find the increase in its area. (d) The sheet has a circular hole of diameter 4.00 cm. Find the diameter of the hole at 120 °C and say whether the hole has become larger or smaller.',
  model: r`(a) $\alpha$ is the fractional change in length per unit rise of temperature, $\alpha = \dfrac{\Delta L}{L_0\,\Delta T}$; its SI unit is K$^{-1}$.

(b) For a square of side $L_0$ the new side is $L_0(1 + \alpha\Delta T)$, so the new area is $A_0(1 + \alpha\Delta T)^2 \approx A_0(1 + 2\alpha\Delta T)$ because $\alpha\Delta T$ is very small. Comparing with $\Delta A = \beta A_0 \Delta T$ gives $\beta = 2\alpha$.

(c) $A_0 = ${lx.L} \times ${lx.W} = ${lx.A0}$ cm$^2$ and $\Delta T = ${lx.dT}$ K, so $\Delta A = 2\alpha A_0 \Delta T = 2(2.3 \times 10^{-5})(${lx.A0})(${lx.dT}) = ${dec(lx.dA, 3)}$ cm$^2$.

(d) The hole expands like a disc of aluminium: $\Delta d = \alpha d \Delta T = (2.3 \times 10^{-5})(${lx.d})(${lx.dT}) = ${dec(lx.dd, 2)}$ cm, so the diameter becomes $${dec(lx.d2, 5)}$ cm. The hole has become larger.`,
  sol: 'α definition; β = 2α; ΔA = 18.4 cm²; hole diameter 4.0092 cm, larger.',
  scheme: [['α = ΔL/(L₀ΔT), unit K⁻¹', 1], ['A₀(1 + αΔT)² ≈ A₀(1 + 2αΔT), so β = 2α', 1], [`ΔA = 2αA₀ΔT = ${dec(lx.dA, 3)} cm²`, 1], [`Δd = αdΔT = ${dec(lx.dd, 2)} cm; new diameter ${dec(lx.d2, 5)} cm`, 1], ['The hole becomes larger: it expands like a disc of the same metal', 1]],
  d: 3, c: 'application', t: [1], wl: null,
}), () => near((lx.L * (1 + lx.a * lx.dT)) * (lx.W * (1 + lx.a * lx.dT)) - lx.A0, lx.dA, 2e-3) && near(lx.d * (1 + lx.a * lx.dT), lx.d2, 1e-9) && near(lx.dA, 18.4, 1e-9) || 'expan-long');
const hl = { m: 0.3, T0: -25, T1: 80, P: 750 };
hl.q1 = hl.m * CICE * -hl.T0;
hl.q2 = hl.m * LF;
hl.q3 = hl.m * CW * hl.T1;
hl.q = hl.q1 + hl.q2 + hl.q3;
hl.t1 = hl.q1 / hl.P;
hl.t2 = hl.q2 / hl.P;
hl.t3 = hl.q3 / hl.P;
hl.t = hl.q / hl.P;
hl.flat = (hl.t2 / hl.t) * 100;
add('heating-long', long({
  stem: '(a) What is meant by the latent heat of fusion? (b) A 0.30 kg block of ice at −25 °C is heated by a steady 750 W source, with no loss of heat, until it is water at 80 °C. Taking c = 2100 J kg⁻¹ K⁻¹ for ice, 4200 J kg⁻¹ K⁻¹ for water and L_f = 3.34 × 10⁵ J kg⁻¹, find the heat and the time for each of the three stages. (c) Sketch (in words) the temperature–time graph and find the percentage of the total time for which the temperature stays constant.',
  model: r`(a) The latent heat of fusion is the heat needed to change 1 kg of a solid into liquid at its melting point, with no change of temperature.

(b) Stage 1, ice from −25 °C to 0 °C: $Q_1 = mc\Delta T = ${hl.m} \times ${CICE} \times ${-hl.T0} = ${hl.q1}$ J, taking $${hl.q1}/${hl.P} = ${dec(hl.t1, 3)}$ s. Stage 2, melting: $Q_2 = mL_f = ${hl.m} \times ${LF} = ${hl.q2}$ J, taking $${dec(hl.t2, 4)}$ s. Stage 3, water from 0 °C to 80 °C: $Q_3 = ${hl.m} \times ${CW} \times ${hl.T1} = ${hl.q3}$ J, taking $${dec(hl.t3, 4)}$ s. Total $= ${hl.q}$ J in $${dec(hl.t, 4)}$ s.

(c) The graph rises steeply from −25 °C to 0 °C, is flat at 0 °C for ${dec(hl.t2, 4)} s, then rises to 80 °C with a gentler slope, because water has a larger specific heat than ice. The flat part is ${dec(hl.t2, 4)}/${dec(hl.t, 4)} $= ${dec(hl.flat, 3)}$ % of the time.`,
  sol: 'Q₁ = 15750 J (21 s); Q₂ = 100200 J (133.6 s); Q₃ = 100800 J (134.4 s); flat 46.2 %.',
  scheme: [['Definition of latent heat of fusion', 1], [`Stage 1: ${hl.q1} J, ${dec(hl.t1, 3)} s; stage 2: ${hl.q2} J, ${dec(hl.t2, 4)} s`, 1], [`Stage 3: ${hl.q3} J, ${dec(hl.t3, 4)} s; total ${hl.q} J in ${dec(hl.t, 4)} s`, 1], ['Graph: flat at 0 °C; gentler slope for water than for ice', 1], [`Flat part = ${dec(hl.flat, 3)} % of the total time`, 1]],
  d: 3, c: 'application', t: [2], wl: null,
}), () => near(heatBetween(hl.m, hl.T0, hl.T1), hl.q, 1e-9) && near(hl.t, 289, 1e-9) && near(hl.t1, 21, 1e-9) && near(hl.t2, 133.6, 1e-9) || 'heating-long');
const sm = { mw: 1.5, Tw: 20, Tf: 50 };
sm.per = LV + CW * (100 - sm.Tf);
sm.ms = (sm.mw * CW * (sm.Tf - sm.Tw)) / sm.per;
sm.gain = sm.mw * CW * (sm.Tf - sm.Tw);
sm.total = sm.mw + sm.ms;
add('steam-long', long({
  stem: '(a) State the principle of calorimetry. (b) Steam at 100 °C is passed into 1.5 kg of water at 20 °C in a well-insulated vessel of negligible heat capacity until the temperature of the water is 50 °C. Taking L_v = 2.26 × 10⁶ J kg⁻¹ and the specific heat of water as 4200 J kg⁻¹ K⁻¹, (i) write the heat-balance equation, (ii) find the mass of steam condensed and (iii) find the total mass of water in the vessel at the end.',
  model: r`(a) In an insulated system the heat lost by the hotter bodies equals the heat gained by the cooler bodies; this expresses conservation of energy.

(b)(i) Let the mass of steam be $m$. Heat lost by the steam = heat released on condensing + heat released by the condensed water cooling from 100 °C to 50 °C $= mL_v + mc(100 - 50)$. Heat gained by the cold water $= ${sm.mw} \times ${CW} \times (${sm.Tf} - ${sm.Tw}) = ${sm.gain}$ J. So $m(${LV} + ${CW} \times ${100 - sm.Tf}) = ${sm.gain}$.

(ii) $m = \dfrac{${sm.gain}}{${sm.per}} = ${dec(sm.ms, 3)}$ kg, about ${dec(sm.ms * 1000, 3)} g.

(iii) Total mass of water $= ${sm.mw} + ${dec(sm.ms, 3)} = ${dec(sm.total, 4)}$ kg.`,
  sol: 'm(L_v + c × 50) = 1.5 c × 30; m = 0.0765 kg; total 1.577 kg.',
  scheme: [['Principle: heat lost = heat gained (conservation of energy)', 1], ['Heat lost by steam = mL_v + mc(100 − 50)', 1], [`Heat gained by water = ${sm.gain} J`, 1], [`m = ${sm.gain}/${sm.per} = ${dec(sm.ms, 3)} kg`, 1], [`Total mass ${dec(sm.total, 4)} kg`, 1]],
  d: 3, c: 'application', t: [2], wl: null,
}), () => {
  const res = mixTemp([{ m: sm.ms, T: 100.0000001 }, { m: sm.mw, T: sm.Tw }]);
  return near(res.T, sm.Tf, 2e-3) || 'steam-long';
});
const dg = { A: 1.5, Ti: 22, To: 6, Lg: 0.004, Kg: 0.8, La: 0.008, Ka: 0.025 };
dg.dT = dg.Ti - dg.To;
dg.Rg = dg.Lg / dg.Kg;
dg.Ra = dg.La / dg.Ka;
dg.H1 = (dg.A * dg.dT) / dg.Rg;
dg.Rt = 2 * dg.Rg + dg.Ra;
dg.H2 = (dg.A * dg.dT) / dg.Rt;
dg.q = dg.H2 / dg.A;
dg.Tmid = dg.Ti - dg.q * dg.Rg;
dg.ratio = dg.H1 / dg.H2;
add('glaze-long', long({
  stem: '(a) Define thermal conductivity and give its SI unit. (b) Show that for slabs in series in steady state the thermal resistances L/K per unit area add. (c) A window of area 1.5 m² has a single glass pane 4.0 mm thick (K = 0.8 W m⁻¹ K⁻¹), with 22 °C inside and 6 °C outside. Find the heat current through it. (d) The pane is replaced by double glazing: two such panes separated by an air gap 8.0 mm thick (K = 0.025 W m⁻¹ K⁻¹), with the same temperatures. Find the new heat current and the temperature of the outer face of the inner pane.',
  model: r`(a) Thermal conductivity $K$ is the heat that flows per second through unit area when the temperature gradient is one kelvin per metre: $H = KA\,\Delta T/L$; its unit is W m$^{-1}$ K$^{-1}$.

(b) In steady state each slab carries the same $H$, so $\Delta T_1 = H L_1/(K_1A)$ and $\Delta T_2 = H L_2/(K_2A)$. Adding, $\Delta T = \dfrac{H}{A}\left(\dfrac{L_1}{K_1} + \dfrac{L_2}{K_2}\right)$: the quantities $L/K$ add.

(c) $\dfrac{L}{K} = \dfrac{${dg.Lg}}{${dg.Kg}} = ${dg.Rg}$ m$^2$ K W$^{-1}$, so $H = \dfrac{A\,\Delta T}{L/K} = \dfrac{${dg.A} \times ${dg.dT}}{${dg.Rg}} = ${dg.H1}$ W.

(d) The air gap has $L/K = \dfrac{${dg.La}}{${dg.Ka}} = ${dg.Ra}$, so the total is $${dg.Rg} + ${dg.Ra} + ${dg.Rg} = ${dec(dg.Rt, 4)}$. $H = \dfrac{${dg.A} \times ${dg.dT}}{${dec(dg.Rt, 4)}} = ${dec(dg.H2, 4)}$ W, about ${dec(dg.ratio, 3)} times smaller. The drop across the inner pane is $\dfrac{H}{A}\dfrac{L}{K} = ${dec(dg.q * dg.Rg, 3)}$ K, so the outer face of the inner pane is at $22 - ${dec(dg.q * dg.Rg, 3)} = ${dec(dg.Tmid, 4)}$ °C.`,
  sol: 'K definition; resistances add; 4800 W; 72.7 W (66 times less); 21.76 °C.',
  scheme: [['Definition of K and unit W m⁻¹ K⁻¹', 1], ['Same H in both slabs; ΔT = (H/A)(L₁/K₁ + L₂/K₂)', 1], [`Single pane: H = ${dg.H1} W`, 1], [`Double glazing: total L/K = ${dec(dg.Rt, 4)}; H = ${dec(dg.H2, 4)} W`, 1], [`Temperature of the inner pane’s outer face ≈ ${dec(dg.Tmid, 4)} °C`, 1]],
  d: 3, c: 'application', t: [3], wl: null,
}), () => {
  const eq = { K: (2 * dg.Lg + dg.La - dg.Lg) / (dg.Ra + dg.Rg), L: dg.La + dg.Lg }; // air gap and second pane as one equivalent slab
  const s = seriesTwo({ K: dg.Kg, L: dg.Lg }, eq, dg.A, dg.Ti, dg.To);
  return near(s.H, dg.H2, 1e-9) && near(s.Ti, dg.Tmid, 1e-9) && near(dg.H1, 4800, 1e-9) || 'glaze-long';
});
const cl = { T1: 100, T0: 20, t1: 4.0, T2: 70, t: 10, Tt: 40 };
cl.k = Math.log((cl.T1 - cl.T0) / (cl.T2 - cl.T0)) / cl.t1;
cl.Tt10 = cl.T0 + (cl.T1 - cl.T0) * Math.exp(-cl.k * cl.t);
cl.tt = Math.log((cl.T1 - cl.T0) / (cl.Tt - cl.T0)) / cl.k;
add('cooling-long', long({
  stem: '(a) State Newton’s law of cooling and write it as a differential equation. (b) Integrate it to obtain T(t) for a body at temperature T₁ at t = 0 in surroundings at T₀. (c) A steel tiffin of food cools from 100 °C to 70 °C in 4.0 minutes in a room at 20 °C. Assuming the law holds, find the cooling constant k, the temperature of the food 10 minutes after the start, and the time taken to reach 40 °C.',
  model: r`(a) The rate of fall of temperature of a body is proportional to the excess of its temperature over that of its surroundings, for a small excess: $\dfrac{dT}{dt} = -k(T - T_0)$.

(b) Separating variables, $\dfrac{dT}{T - T_0} = -k\,dt$. Integrating, $\ln\dfrac{T - T_0}{T_1 - T_0} = -kt$, so $T = T_0 + (T_1 - T_0)e^{-kt}$.

(c) $70 - 20 = (100 - 20)e^{-4.0k}$ gives $k = \dfrac{1}{4.0}\ln\dfrac{${cl.T1 - cl.T0}}{${cl.T2 - cl.T0}} = ${dec(cl.k, 3)}$ min$^{-1}$. At 10 min: $T = 20 + 80\,e^{-${dec(cl.k, 3)} \times 10} = ${dec(cl.Tt10, 3)}$ °C. For 40 °C: $t = \dfrac{1}{k}\ln\dfrac{80}{20} = \dfrac{\ln 4}{${dec(cl.k, 3)}} = ${dec(cl.tt, 3)}$ min.`,
  sol: 'k = 0.1175 per min; T(10 min) = 44.7 °C; t(40 °C) = 11.8 min.',
  scheme: [['Statement and dT/dt = −k(T − T₀)', 1], ['Separation and integration; T = T₀ + (T₁ − T₀)e^(−kt)', 1], [`k = ln(80/50)/4.0 = ${dec(cl.k, 3)} min⁻¹`, 1], [`T(10 min) = ${dec(cl.Tt10, 3)} °C`, 1], [`t(40 °C) = ${dec(cl.tt, 3)} min`, 1]],
  d: 4, c: 'application', t: [4], wl: null,
}), () => near(coolNumeric(cl.T1, cl.T0, cl.k, cl.t), cl.Tt10, 1e-4) && near(coolNumeric(cl.T1, cl.T0, cl.k, cl.tt), cl.Tt, 1e-4) && near(cl.k, Math.log(1.6) / 4, 1e-12) || 'cooling-long');

// ================================================================ case-based (4 marks: 1 + 1 + 2)
const bv = { L: 30.0, T1: 5, T2: 55, a: ALPHA.steel, aAl: ALPHA.aluminium, L2: 45.0 };
bv.dT = bv.T2 - bv.T1;
bv.dL = bv.a * bv.L * bv.dT * 1000;
bv.dLal = bv.aAl * bv.L * bv.dT * 1000;
bv.dLlong = bv.a * bv.L2 * bv.dT * 1000;
add('viaduct-case', mk.case({
  passage: 'The deck of a metro viaduct in Hyderabad is built from steel girders, each 30.0 m long. The girders are expected to range in temperature from 5 °C on a winter night to 55 °C on a summer afternoon. For steel, α = 1.2 × 10⁻⁵ K⁻¹; for aluminium, α = 2.3 × 10⁻⁵ K⁻¹.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'A small gap is left between neighbouring girders mainly so that',
      right: 'the girders can lengthen on hot days without pressing against each other',
      wrong: ['heat cannot pass from one girder to the next', 'the girders can contract to less than their original length in winter', 'the girders lose heat by radiation across the gap'],
      sol: 'On heating, each girder lengthens by ΔL = αL₀ΔT. Without gaps, the girders would press on each other and could buckle — option (@K).',
      d: 1, c: 'understanding', t: [1],
    })),
    part('b', num({
      stem: 'Find the total change in the length of one steel girder between the coldest and the hottest temperatures, in mm.',
      value: v3(bv.dL), tol: 0.1, unit: 'mm',
      sol: r`$\Delta T = ${bv.T2} - ${bv.T1} = ${bv.dT}$ K. $\Delta L = \alpha L_0\Delta T = (1.2 \times 10^{-5})(${bv.L})(${bv.dT}) = ${dec(bv.dL / 1000, 3)}$ m $= ${dec(bv.dL, 3)}$ mm.`,
      scheme: [[`ΔL = αL₀ΔT = ${dec(bv.dL, 3)} mm`, 1]],
      d: 2, c: 'application', t: [1],
    })),
    part('c', short({
      marks: 2,
      stem: 'The designer considers aluminium girders of the same length instead. Find the change in length over the same range of temperature and say which metal needs the wider gap.',
      model: r`For aluminium, $\Delta L = (2.3 \times 10^{-5})(${bv.L})(${bv.dT}) = ${dec(bv.dLal / 1000, 3)}$ m $= ${dec(bv.dLal, 3)}$ mm, compared with ${dec(bv.dL, 3)} mm for steel. Aluminium has the larger coefficient of expansion, so it needs the wider gap, about ${dec(bv.dLal / bv.dL, 3)} times as much.`,
      sol: 'ΔL(Al) = 34.5 mm > 18.0 mm.',
      scheme: [[`ΔL(Al) = ${dec(bv.dLal, 3)} mm`, 1], ['Aluminium needs the wider gap because its α is larger', 1]],
      d: 3, c: 'application', t: [1],
    }), [
      short({
        marks: 2,
        stem: 'A colleague says that a 45.0 m steel girder, in the same temperature range, needs the same gap as the 30.0 m girder because the temperature range is unchanged. Evaluate this claim.',
        model: r`The claim is **wrong**. The change in length $\Delta L = \alpha L_0\Delta T$ is proportional to the length as well as to the temperature range. For 45.0 m it is $(1.2 \times 10^{-5})(${bv.L2})(${bv.dT}) = ${dec(bv.dLlong / 1000, 3)}$ m $= ${dec(bv.dLlong, 3)}$ mm, which is ${dec(bv.dLlong / bv.dL, 3)} times the 30.0 m value.`,
        sol: 'ΔL ∝ L₀: 27.0 mm.',
        scheme: [['Claim wrong: ΔL is proportional to L₀ as well', 1], [`ΔL(45 m) = ${dec(bv.dLlong, 3)} mm`, 1]],
        d: 4, c: 'evaluation', t: [1],
      }),
    ]),
  ],
}), () => near(bv.dL, 18, 1e-9) && near(bv.dLal, 34.5, 1e-9) && near(bv.dLlong, 27, 1e-9) || 'viaduct');
const kc = { m: 1.5, T0: 28, P: 3000, mb: 0.3 };
kc.Q = kc.m * CW * (100 - kc.T0);
kc.t = kc.Q / kc.P;
kc.tb = (kc.m * LV) / kc.P;
kc.tb1 = (kc.mb * LV) / kc.P;
add('kettle-case', mk.case({
  passage: 'A tea stall in Pune uses a 3.0 kW electric kettle. The kettle holds 1.5 kg of water at 28 °C. Assume all the heat from the element goes into the water. Take the specific heat of water as 4200 J kg⁻¹ K⁻¹ and the latent heat of vaporisation as 2.26 × 10⁶ J kg⁻¹.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'The heat needed to raise the temperature of the water in the kettle by one kelvin is called its',
      right: 'heat capacity, equal to m c',
      wrong: ['latent heat, equal to m L', 'specific heat capacity, equal to c', 'thermal conductivity, equal to K A/L'],
      sol: 'Heat per kelvin for the whole body is its heat capacity C = m c; specific heat capacity c is per kilogram — option (@K).',
      d: 1, c: 'understanding', t: [2],
    })),
    part('b', num({
      stem: 'Find the time taken for the water to reach 100 °C, in seconds.',
      value: kc.t, tol: 0.5, unit: 's',
      sol: r`$Q = mc\Delta T = ${kc.m} \times ${CW} \times ${100 - kc.T0} = ${kc.Q}$ J. $t = \dfrac{Q}{P} = \dfrac{${kc.Q}}{${kc.P}} = ${kc.t}$ s.`,
      scheme: [[`Q = ${kc.Q} J; t = Q/P = ${kc.t} s`, 1]],
      d: 2, c: 'application', t: [2],
    })),
    part('c', short({
      marks: 2,
      stem: 'The kettle is not switched off at 100 °C. Find how long it takes to boil away 0.30 kg of water at 100 °C.',
      model: r`Heat needed to vaporise 0.30 kg at 100 °C is $mL_v = ${kc.mb} \times ${LV} = ${kc.mb * LV}$ J. The element supplies 3000 J every second, so the time is $t = \dfrac{${kc.mb * LV}}{${kc.P}} = ${kc.tb1}$ s, a little under four minutes. During this time the temperature stays at 100 °C, because the heat supplied is latent heat.`,
      sol: 'm L_v / P = 226 s.',
      scheme: [[`Q = mL_v = ${kc.mb * LV} J`, 1], [`t = Q/P = ${kc.tb1} s`, 1]],
      d: 3, c: 'application', t: [2],
    }), [
      short({
        marks: 2,
        stem: 'A customer says that boiling away all 1.5 kg of the water will take about as long as it took to heat it to 100 °C. Evaluate this claim.',
        model: r`The claim is **wrong**. Heating to 100 °C took ${kc.t} s. Boiling away all the water needs $${kc.m} \times ${LV} = ${kc.m * LV}$ J, which takes $\dfrac{${kc.m * LV}}{${kc.P}} = ${kc.tb}$ s, about ${dec(kc.tb / kc.t, 3)} times longer, because $L_v$ is much larger than $c\,\Delta T$.`,
        sol: '1130 s against 151.2 s.',
        scheme: [['Claim wrong: latent heat is much larger than the heat to warm', 1], [`Boiling away takes ${kc.tb} s against ${kc.t} s`, 1]],
        d: 4, c: 'evaluation', t: [2],
      }),
    ]),
  ],
}), () => near(heatBetween(kc.m, kc.T0, 100) / kc.P, kc.t, 1e-6) && near(kc.tb1, 226, 1e-9) && near(kc.tb, 1130, 1e-9) || 'kettle-case');
const hd = { K: 50, L: 0.25, A: 1.5e-4, Th: 100, Tc: 40, Tc2: 0, Kw: 0.12 };
hd.H = (hd.K * hd.A * (hd.Th - hd.Tc)) / hd.L;
hd.Hw = (hd.Kw * hd.A * (hd.Th - hd.Tc)) / hd.L;
hd.H2 = (hd.K * hd.A * (hd.Th - hd.Tc2)) / hd.L;
add('ladle-case', mk.case({
  passage: 'At a roadside dhaba in Amritsar a cook leaves an iron ladle in a pot of boiling dal. Treat the handle as a lagged solid steel rod 0.25 m long and 1.5 cm² in cross-section (K = 50 W m⁻¹ K⁻¹). In steady state the end in the dal is at 100 °C and the free end that the cook holds is at 40 °C.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'The chief mode by which heat travels along the metal handle is',
      right: 'conduction, with energy passed from particle to particle',
      wrong: ['convection, with the metal itself flowing towards the cool end', 'radiation, with no medium needed', 'evaporation of the metal at the hot end'],
      sol: 'A solid cannot flow; energy is passed on by vibrating atoms and free electrons without bulk motion of the metal, which is conduction — option (@K).',
      d: 1, c: 'understanding', t: [3],
    })),
    part('b', num({
      stem: 'Find the heat current along the handle, in W.',
      value: v3(hd.H), tol: 0.02, unit: 'W',
      sol: r`$A = 1.5\ \text{cm}^2 = ${hd.A}\ \text{m}^2$. $H = \dfrac{KA(T_1 - T_2)}{L} = \dfrac{${hd.K} \times ${hd.A} \times ${hd.Th - hd.Tc}}{${hd.L}} = ${dec(hd.H, 3)}$ W.`,
      scheme: [[`H = KAΔT/L = ${dec(hd.H, 3)} W`, 1]],
      d: 2, c: 'application', t: [3],
    })),
    part('c', short({
      marks: 2,
      stem: 'The steel handle is replaced by a wooden one of the same size (K = 0.12 W m⁻¹ K⁻¹), with the same end temperatures. Find the new heat current and compare it with the steel handle.',
      model: r`With the same size and end temperatures, $H \propto K$, so the wooden handle carries $H_\text{wood} = \dfrac{0.12 \times ${hd.A} \times ${hd.Th - hd.Tc}}{${hd.L}} = ${dec(hd.Hw, 3)}$ W. The ratio $\dfrac{H_\text{steel}}{H_\text{wood}} = \dfrac{${hd.K}}{${hd.Kw}} \approx ${dec(hd.K / hd.Kw, 3)}$: the wooden handle conducts about ${dec(hd.K / hd.Kw, 3)} times less heat, which is why its free end stays cool.`,
      sol: 'H(wood) = 0.00432 W; ratio 417.',
      scheme: [[`H(wood) = ${dec(hd.Hw, 3)} W`, 1], [`Steel conducts ${dec(hd.K / hd.Kw, 3)} times more`, 1]],
      d: 3, c: 'application', t: [3],
    }), [
      short({
        marks: 2,
        stem: 'A friend says that if the free end were held in ice water at 0 °C instead of 40 °C, the heat current along the steel handle would double. Evaluate this claim.',
        model: r`The claim is **wrong**. $H \propto (T_1 - T_2)$: the temperature difference changes from ${hd.Th - hd.Tc} K to ${hd.Th - hd.Tc2} K, a factor of $\dfrac{${hd.Th - hd.Tc2}}{${hd.Th - hd.Tc}} \approx ${dec((hd.Th - hd.Tc2) / (hd.Th - hd.Tc), 3)}$. The new heat current is ${dec(hd.H2, 3)} W, not twice ${dec(hd.H, 3)} W.`,
        sol: 'H ∝ ΔT: 3.0 W is 1.67 times 1.8 W.',
        scheme: [['Claim wrong: H is proportional to the temperature difference', 1], [`New H = ${dec(hd.H2, 3)} W, ${dec((hd.Th - hd.Tc2) / (hd.Th - hd.Tc), 3)} times the old value`, 1]],
        d: 4, c: 'evaluation', t: [3],
      }),
    ]),
  ],
}), () => near(hd.H, 1.8, 1e-9) && near(hd.H2, 3, 1e-9) && near(hd.Hw, 0.00432, 1e-9) || 'ladle-case');
const tc = { T1: 90, T0: 30, t1: 6.0, T2: 66, t: 12, Tt: 40 };
tc.k = Math.log((tc.T1 - tc.T0) / (tc.T2 - tc.T0)) / tc.t1;
tc.T12 = tc.T0 + (tc.T1 - tc.T0) * Math.exp(-tc.k * tc.t);
tc.tt = Math.log((tc.T1 - tc.T0) / (tc.Tt - tc.T0)) / tc.k;
tc.drop1 = tc.T1 - tc.T2;
tc.drop2 = tc.T2 - tc.T12;
add('tea-case', mk.case({
  passage: 'At a roadside tea stall in Kolkata tea is served at 90 °C in a room at 30 °C. A customer notes that the tea cools to 66 °C in the first 6.0 minutes. Assume that Newton’s law of cooling holds for the tea.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'According to Newton’s law of cooling, the tea loses temperature fastest',
      right: 'at the start, when its excess temperature over the room is greatest',
      wrong: ['at the end, when the tea is nearly at room temperature', 'at a constant rate throughout', 'when it is at the room temperature'],
      sol: 'The rate of cooling is proportional to the excess T − T₀, which is largest at the start — option (@K).',
      d: 1, c: 'understanding', t: [4],
    })),
    part('b', num({
      stem: 'Find the temperature of the tea 12 minutes after it was served, in °C.',
      value: v3(tc.T12), tol: 0.1, unit: '°C',
      sol: r`The excess falls by the same factor in equal times: in the first 6.0 min it went from $${tc.T1 - tc.T0}$ K to $${tc.T2 - tc.T0}$ K, a factor $${dec((tc.T2 - tc.T0) / (tc.T1 - tc.T0), 3)}$. After 12 min the excess is $${tc.T1 - tc.T0} \times (${dec((tc.T2 - tc.T0) / (tc.T1 - tc.T0), 3)})^2 = ${dec((tc.T12 - tc.T0), 4)}$ K, so $T = ${tc.T0} + ${dec(tc.T12 - tc.T0, 4)} = ${dec(tc.T12, 4)}$ °C.`,
      scheme: [['Excess multiplied by 36/60 = 0.6 every 6.0 min', 1]],
      d: 3, c: 'application', t: [4],
    })),
    part('c', short({
      marks: 2,
      stem: 'Find the time from the start for the tea to cool to 40 °C, in minutes, and say how it is obtained.',
      model: r`The first reading gives the cooling constant from the fall of the excess temperature from ${tc.T1 - tc.T0} K to ${tc.T2 - tc.T0} K in 6.0 min: $k = \dfrac{1}{6.0}\ln\dfrac{${tc.T1 - tc.T0}}{${tc.T2 - tc.T0}} = ${dec(tc.k, 3)}$ min$^{-1}$. For 40 °C the excess is ${tc.Tt - tc.T0} K, so the time from the start is $t = \dfrac{1}{k}\ln\dfrac{${tc.T1 - tc.T0}}{${tc.Tt - tc.T0}} = \dfrac{\ln 6}{${dec(tc.k, 3)}} = ${dec(tc.tt, 3)}$ min, about 21 minutes.`,
      sol: 'k = 0.0851 per min; t = 21.0 min.',
      scheme: [[`k = ln(60/36)/6.0 = ${dec(tc.k, 3)} min⁻¹`, 1], [`t = ln(60/10)/k = ${dec(tc.tt, 3)} min`, 1]],
      d: 3, c: 'application', t: [4],
    }), [
      short({
        marks: 2,
        stem: 'The tea fell by 24 K in the first 6.0 minutes. A customer says it will keep falling by 24 K every 6.0 minutes and so reach the room temperature after 15 minutes. Evaluate this claim.',
        model: r`The claim is **wrong**. By Newton’s law the tea loses the same **fraction** of its excess, not the same number of kelvin, in equal times. In the second 6.0 min it falls only ${dec(tc.drop2, 3)} K (to ${dec(tc.T12, 4)} °C), and it approaches 30 °C ever more slowly without reaching it.`,
        sol: 'Falls by a fixed fraction: 14.4 K in the next 6 min.',
        scheme: [['Claim wrong: equal fractions, not equal drops, in equal times', 1], [`Second 6.0 min: fall of ${dec(tc.drop2, 3)} K, to ${dec(tc.T12, 4)} °C`, 1]],
        d: 4, c: 'evaluation', t: [4],
      }),
    ]),
  ],
}), () => near(coolNumeric(tc.T1, tc.T0, tc.k, tc.t), tc.T12, 1e-4) && near(tc.T12, 51.6, 1e-9) && near(tc.drop1, 24, 1e-9) && near(tc.drop2, 14.4, 1e-9) && near(coolNumeric(tc.T1, tc.T0, tc.k, tc.tt), tc.Tt, 1e-4) || 'tea-case');
