// ch10 question bank, part 2: t03 conduction, convection, radiation, series slabs and the vacuum flask.
import { mk, add, r, dec, near } from '../../cbse-11-physics-ch01/src/lib.mjs';
import { LF, root, seriesTwo } from './phys.mjs';

const { mcq, ar, tf, fill, num, short } = mk;
const v3 = (x) => Number(dec(x, 3));

add('gate-mcq', mcq({
  stem: 'On a winter morning in Shimla an iron gate and a wooden door are both at the same low temperature, yet the iron feels much colder when touched. The reason is that',
  right: 'iron has a much larger thermal conductivity, so it carries heat away from the hand faster',
  wrong: ['iron is at a lower temperature than wood', 'iron has a larger specific heat capacity than wood, so it takes more heat', 'wood radiates more heat to the hand than iron does'],
  sol: 'The temperatures are equal. Iron conducts heat from the hand far faster than wood, so the skin loses heat quickly and the gate feels colder — option (@K).',
  d: 1, c: 'understanding', t: [3],
}));
add('tank-mcq', mcq({
  stem: 'In a water tank an immersion heater is fixed near the bottom rather than near the top. This is because heating at the bottom',
  right: 'sets up convection currents that circulate the heated water through the whole tank',
  wrong: ['stops all convection, so heat is stored at the bottom', 'makes the water a better conductor of heat', 'prevents the water from radiating heat'],
  sol: 'Water near the heater expands, becomes less dense and rises while cooler water sinks, so the whole tank is warmed by convection. A heater at the top would warm only the top layer — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('scalerod-mcq', mcq({
  stem: 'Two lagged copper rods are connected between the same hot and cold reservoirs. The second rod is twice as long as the first and also has twice its cross-sectional area. In steady state the heat current through the second rod is',
  right: 'the same as through the first rod',
  wrong: ['half of that through the first rod', 'twice that through the first rod', 'four times that through the first rod'],
  sol: r`$H = \dfrac{KA(T_1 - T_2)}{L} \propto \dfrac{A}{L}$, and $\dfrac{A}{L}$ is unchanged when both $A$ and $L$ are doubled — option (@K).`,
  d: 2, c: 'application', t: [3],
}), () => near((2 * 1) / 2, 1) || 'scalerod');
add('flask-mcq', mcq({
  stem: 'The double glass walls of a vacuum flask are separated by a vacuum. This mainly reduces heat loss by',
  right: 'conduction and convection across the gap',
  wrong: ['radiation alone', 'evaporation of the liquid alone', 'radiation and evaporation, but not conduction'],
  sol: 'A vacuum contains no particles, so there is nothing to conduct heat or to move as a convection current. Radiation is reduced separately by the silvered surfaces — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('cans-mcq', mcq({
  stem: 'Two identical cans, one painted dull black and the other polished silver, are filled with the same mass of boiling water and left in a room. After 10 minutes the water in the black can is cooler, because a dull black surface',
  right: 'is a better emitter of thermal radiation than a shiny one',
  wrong: ['is a poorer conductor of heat than a shiny one', 'absorbs less heat from the room than a shiny one', 'reflects most of the radiation falling on it'],
  sol: 'Dull black surfaces are good absorbers and therefore good emitters; the shiny can radiates much less, so its contents lose heat more slowly — option (@K).',
  d: 2, c: 'application', t: [3],
}));
const jn = { K1: 3, K2: 1, L: 1, Th: 100, Tc: 0 };
jn.Ti = seriesTwo({ K: jn.K1, L: jn.L }, { K: jn.K2, L: jn.L }, 1, jn.Th, jn.Tc).Ti;
add('junction-mcq', mcq({
  stem: 'Two lagged rods of the same length and area are joined end to end. The thermal conductivity of rod 1 is three times that of rod 2. The free end of rod 1 is held at 100 °C and the free end of rod 2 at 0 °C. In steady state the temperature of the junction is',
  right: `${Math.round(jn.Ti)} °C`,
  wrong: ['25 °C', '50 °C', '66.7 °C'],
  sol: r`Equal heat currents: $3K(100 - T) = K(T - 0)$, so $300 - 3T = T$ and $T = ${Math.round(jn.Ti)}$ °C. The poorer conductor (rod 2) takes the larger drop, 75 K — option (@K).`,
  d: 3, c: 'application', t: [3],
}), () => near(jn.Ti, 75, 1e-9) || 'junction');
add('wallthick-ar', ar({
  a: 'Doubling the thickness of a wall made of one material, with the same area and the same two face temperatures, halves the steady heat current through it.',
  r: 'The thermal conductivity of a material is halved when its thickness is doubled.',
  key: 'c',
  sol: 'A is true, since H = KA(T₁ − T₂)/L ∝ 1/L. R is false: K is a property of the material and does not depend on the thickness — option (c).',
  d: 3, c: 'understanding', t: [3],
}));
add('glaze-tf', tf({
  stem: 'A sealed layer of still air between two glass panes reduces the heat lost through a window mainly because air is a poor conductor of heat.',
  key: 't',
  sol: 'True. Air has a very small thermal conductivity (about 0.025 W m⁻¹ K⁻¹), and a thin sealed gap leaves too little room for strong convection.',
  d: 2, c: 'understanding', t: [3],
}));
add('cond-fill', fill({
  stem: 'The property of a material that tells how readily it conducts heat, with the SI unit W m⁻¹ K⁻¹, is called its thermal ___.',
  acc: [['conductivity']],
  sol: 'Thermal **conductivity** K in H = KA(T₁ − T₂)/L.',
  d: 1, c: 'recall', t: [3],
}));
const ar1 = { K: 205, L: 1.5, A: 2.0e-4, Th: 90, Tc: 15 };
ar1.H = (ar1.K * ar1.A * (ar1.Th - ar1.Tc)) / ar1.L;
add('alrod-num', num({
  stem: 'A lagged aluminium rod 1.5 m long and of cross-section 2.0 cm² conducts heat between two reservoirs at 90 °C and 15 °C. Taking K = 205 W m⁻¹ K⁻¹, find the heat current in steady state, in W.',
  value: v3(ar1.H), tol: 0.02, unit: 'W',
  sol: r`$A = 2.0\ \text{cm}^2 = ${ar1.A}\ \text{m}^2$. $H = \dfrac{KA(T_1 - T_2)}{L} = \dfrac{${ar1.K} \times ${ar1.A} \times ${ar1.Th - ar1.Tc}}{${ar1.L}} = ${dec(ar1.H, 3)}$ W.`,
  scheme: [['A = 2.0 × 10⁻⁴ m²', 1]],
  d: 1, c: 'application', t: [3],
}), (q) => near(((ar1.Th - ar1.Tc) / ar1.L) * ar1.K * ar1.A, q.answer.value, 1e-3) || 'alrod');
const wn = { w: 1.2, h: 0.8, L: 0.004, K: 0.8, Ti: 24, To: 10 };
wn.A = wn.w * wn.h;
wn.H = (wn.K * wn.A * (wn.Ti - wn.To)) / wn.L;
add('window-num', num({
  stem: 'A single glass window pane in a Chennai flat measures 1.2 m by 0.80 m and is 4.0 mm thick. The inner face is at 24 °C and the outer face at 10 °C. Taking K for glass as 0.8 W m⁻¹ K⁻¹, find the rate of heat flow through the pane in steady state, in W.',
  value: wn.H, tol: 1, unit: 'W',
  sol: r`$A = ${wn.w} \times ${wn.h} = ${dec(wn.A, 3)}$ m$^2$ and $L = 4.0$ mm $= ${wn.L}$ m. $H = \dfrac{KA(T_1 - T_2)}{L} = \dfrac{${wn.K} \times ${dec(wn.A, 3)} \times ${wn.Ti - wn.To}}{${wn.L}} = ${wn.H}$ W.`,
  scheme: [[`A = ${dec(wn.A, 3)} m², L = ${wn.L} m`, 1], [`H = KAΔT/L = ${wn.H} W`, 1]],
  marks: 2, d: 2, c: 'application', t: [3],
}), (q) => near(wn.K * wn.A * (wn.Ti - wn.To) / wn.L, q.answer.value, 1e-6) || 'window');
const cj = { K1: 385, L1: 0.4, K2: 50, L2: 0.25, Th: 100, Tc: 0, A: 2.0e-4 };
cj.sol = seriesTwo({ K: cj.K1, L: cj.L1 }, { K: cj.K2, L: cj.L2 }, cj.A, cj.Th, cj.Tc);
cj.R1 = cj.L1 / cj.K1;
cj.R2 = cj.L2 / cj.K2;
cj.Tj = cj.Th - (cj.Th - cj.Tc) * (cj.R1 / (cj.R1 + cj.R2));
add('junction-num', num({
  stem: 'A lagged copper rod (K = 385 W m⁻¹ K⁻¹, length 40 cm) and a lagged steel rod (K = 50 W m⁻¹ K⁻¹, length 25 cm), of equal cross-section, are joined end to end. The free end of the copper rod is held at 100 °C and the free end of the steel rod at 0 °C. Find the temperature of the junction in steady state, in °C.',
  value: v3(cj.Tj), tol: 0.1, unit: '°C',
  sol: r`Equal heat currents: $\dfrac{385(100 - T)}{0.40} = \dfrac{50(T - 0)}{0.25}$, i.e. $${dec(cj.K1 / cj.L1, 5)}(100 - T) = ${cj.K2 / cj.L2}\,T$. So $T = \dfrac{${dec((cj.K1 / cj.L1) * 100, 5)}}{${dec(cj.K1 / cj.L1 + cj.K2 / cj.L2, 5)}} = ${dec(cj.Tj, 4)}$ °C.`,
  scheme: [['Same heat current: K₁(100 − T)/L₁ = K₂(T − 0)/L₂', 1], [`T = ${dec(cj.Tj, 4)} °C`, 1]],
  marks: 2, d: 3, c: 'application', t: [3],
}), (q) => near(cj.sol.Ti, q.answer.value, 3e-3) || 'junction-num');
const ib = { A: 1.2, L: 0.04, K: 0.035, To: 32, Ti: 0, hours: 6 };
ib.H = (ib.K * ib.A * (ib.To - ib.Ti)) / ib.L;
ib.Q = ib.H * ib.hours * 3600;
ib.m = ib.Q / LF;
add('icebox-num', num({
  stem: 'The walls of a thermocol box for carrying fish ice from a Kochi harbour have a total area of 1.2 m² and thickness 4.0 cm; K for thermocol is 0.035 W m⁻¹ K⁻¹. The outside is at 32 °C and the ice inside at 0 °C. Taking L_f = 3.34 × 10⁵ J kg⁻¹, find the mass of ice that melts in 6.0 hours, in kg.',
  value: v3(ib.m), tol: 0.02, unit: 'kg',
  sol: r`$H = \dfrac{KA(T_1 - T_2)}{L} = \dfrac{0.035 \times 1.2 \times 32}{0.040} = ${ib.H}$ W. In $6.0 \times 3600 = ${ib.hours * 3600}$ s: $Q = Ht = ${dec(ib.Q, 6)}$ J. $m = \dfrac{Q}{L_f} = \dfrac{${dec(ib.Q, 6)}}{${LF}} = ${dec(ib.m, 3)}$ kg.`,
  scheme: [[`H = KAΔT/L = ${ib.H} W`, 1], [`Q = Ht = ${dec(ib.Q, 6)} J in ${ib.hours * 3600} s`, 1], [`m = Q/L_f = ${dec(ib.m, 3)} kg`, 1]],
  marks: 3, d: 3, c: 'application', t: [2, 3],
}), (q) => near(root((m) => m * LF - ((ib.K * ib.A * ib.To) / ib.L) * 21600, 0, 10), q.answer.value, 3e-3) || 'icebox');
const rs = { L: 0.05, A: 0.6, K: 0.04, dT: 25 };
rs.R = rs.L / (rs.K * rs.A);
rs.H = rs.dT / rs.R;
add('resist-num', num({
  stem: 'A slab of insulating foam is 5.0 cm thick, has an area of 0.60 m² and a thermal conductivity of 0.040 W m⁻¹ K⁻¹. Find its thermal resistance R = L/(KA), in K W⁻¹.',
  value: v3(rs.R), tol: 0.01, unit: 'K W⁻¹',
  sol: r`$R = \dfrac{L}{KA} = \dfrac{0.050}{0.040 \times 0.60} = ${dec(rs.R, 3)}$ K W$^{-1}$.`,
  scheme: [['R = L/(KA) with L in metres', 1]],
  d: 2, c: 'application', t: [3],
}), (q) => near(rs.dT / (rs.K * rs.A * rs.dT / rs.L), q.answer.value, 2e-3) || 'resist');
const ins = { K1: 0.6, L1: 0.1, K2: 0.04, Th: 35, Tc: 5, A: 1 };
ins.H0 = (ins.A * (ins.Th - ins.Tc)) / (ins.L1 / ins.K1);
ins.L2 = (ins.L1 / ins.K1) * ins.K2; // R2 = R1 doubles the resistance, halving H
add('insul-num', num({
  stem: 'A brick wall 10 cm thick (K = 0.6 W m⁻¹ K⁻¹) in a Nagpur cold store is to be lined on the inside with foam (K = 0.04 W m⁻¹ K⁻¹) so that, for the same face temperatures, the heat flow through the wall is halved. What thickness of foam is needed, in mm?',
  value: v3(ins.L2 * 1000), tol: 0.05, unit: 'mm',
  sol: r`For a fixed temperature difference, $H \propto 1/R_\text{total}$. Halving $H$ doubles the resistance, so the foam must add a resistance equal to that of the brick: $\dfrac{L_2}{K_2} = \dfrac{L_1}{K_1} = \dfrac{0.10}{0.6} = ${dec(ins.L1 / ins.K1, 4)}$. $L_2 = ${dec(ins.L1 / ins.K1, 4)} \times 0.04 = ${dec(ins.L2, 3)}$ m $= ${dec(ins.L2 * 1000, 3)}$ mm.`,
  scheme: [['H ∝ 1/R_total; halving H doubles R', 1], ['L₂/K₂ = L₁/K₁', 1], [`L₂ = ${dec(ins.L2 * 1000, 3)} mm`, 1]],
  marks: 3, d: 4, c: 'analysis', t: [3],
}), (q) => {
  const H = (L2) => seriesTwo({ K: ins.K1, L: ins.L1 }, { K: ins.K2, L: L2 }, ins.A, ins.Th, ins.Tc).H;
  return near(H(q.answer.value / 1000), ins.H0 / 2, 3e-3) || 'insul';
});
add('modes-short2', short({
  marks: 2,
  stem: 'Name the chief mode of heat transfer in each case and say what carries the energy: (a) the handle of a steel ladle left in boiling dal becomes hot; (b) smoke from an incense stick rises in still air.',
  model: '(a) Conduction: the vibrating atoms and free electrons of the steel pass energy along the handle from particle to particle, with no bulk movement of the metal. (b) Convection: the air heated by the stick expands, becomes less dense and rises, carrying the smoke and energy with it.',
  sol: '(a) conduction; (b) convection.',
  scheme: [['(a) Conduction, energy passed on by particles without bulk motion', 1], ['(b) Convection, bulk motion of the heated air', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('heater-short2', short({
  marks: 2,
  stem: 'A room heater is kept near the floor of a room, while an air-conditioner is fixed high on the wall. Explain both placements.',
  model: 'Air heated at the floor expands, becomes less dense and rises, while cooler air sinks to replace it, so the heater sets up a circulation that warms the whole room. Air cooled near the ceiling is denser and sinks, again setting up a convection current that cools the room.',
  sol: 'Hot air rises, cold air sinks.',
  scheme: [['Heated air rises and sets up a convection current: heater low', 1], ['Cooled air sinks and circulates: cooler high', 1]],
  d: 2, c: 'application', t: [3],
}));
add('colour-short2', short({
  marks: 2,
  stem: 'Explain why wearing white or light-coloured clothes in a hot Rajasthan summer is more comfortable than dark clothes in the open.',
  model: 'Sunlight and the radiation from the hot ground fall on the clothes. Dull white or light surfaces reflect most of this radiation and absorb little, so they stay cooler. Dark surfaces are good absorbers: they take in more radiation, warm up and feel hotter to the wearer.',
  sol: 'Light colours reflect radiation; dark colours absorb it.',
  scheme: [['Light surfaces reflect most radiation and absorb little', 1], ['Dark surfaces are good absorbers, so they warm up more', 1]],
  d: 2, c: 'application', t: [3],
}));
add('series-short3', short({
  marks: 3,
  stem: 'Two slabs of the same area A, thicknesses L₁ and L₂ and conductivities K₁ and K₂, are in contact, with outer faces at T₁ and T₂ (T₁ > T₂). Derive the temperature T of their interface in steady state.',
  model: 'In steady state the same heat current flows through both slabs: K₁A(T₁ − T)/L₁ = K₂A(T − T₂)/L₂. Cancelling A and collecting the terms in T gives T(K₁/L₁ + K₂/L₂) = K₁T₁/L₁ + K₂T₂/L₂. So T = (K₁T₁/L₁ + K₂T₂/L₂)/(K₁/L₁ + K₂/L₂).',
  sol: 'Equal H, solve for T.',
  scheme: [['Same heat current through both slabs in steady state', 1], ['K₁A(T₁ − T)/L₁ = K₂A(T − T₂)/L₂', 1], ['Solve: T = (K₁T₁/L₁ + K₂T₂/L₂)/(K₁/L₁ + K₂/L₂)', 1]],
  d: 3, c: 'understanding', t: [3],
}), () => {
  const T = (K1, L1, K2, L2, T1, T2) => (K1 * T1 / L1 + K2 * T2 / L2) / (K1 / L1 + K2 / L2);
  const s = seriesTwo({ K: 0.6, L: 0.1 }, { K: 0.04, L: 0.04 }, 1, 35, 5);
  return near(T(0.6, 0.1, 0.04, 0.04, 35, 5), s.Ti, 1e-9) || 'series-short3';
});
add('flask-short3', short({
  marks: 3,
  stem: 'Describe the construction of a vacuum flask and explain how it reduces heat transfer by each of the three modes.',
  model: 'A flask has a double-walled glass vessel with a vacuum between the walls, silvered on the facing surfaces, held in an outer casing by cork supports. The vacuum prevents conduction and convection across the gap. The silvering reflects radiation back and emits little. The cork parts, which are poor conductors, reduce the heat leaking through the neck and base.',
  sol: 'Vacuum, silvering, cork.',
  scheme: [['Double walls with vacuum: no conduction or convection across the gap', 1], ['Silvered surfaces reflect radiation', 1], ['Cork stopper and supports are poor conductors', 1]],
  d: 2, c: 'understanding', t: [3],
}));
void ar;
void tf;
void fill;
