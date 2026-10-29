// ch03 Current Electricity — question bank. Every numerical value is computed here from the givens and re-checked by
// the `check` functions; circuits are solved by script. AR keys planned: a c d a a b c.
import { mk, add, r, QE, ME, sci, dec, near } from '../../cbse-12-physics-ch01/src/lib.mjs';

const { mcq, ar, tf, fill, match, num, short, long, part } = mk;
/** Two cells with series resistors in parallel branches joined by R3 (node method). */
function twoLoop(E1, R1, E2, R2, R3) {
  const V = (E1 / R1 + E2 / R2) / (1 / R1 + 1 / R2 + 1 / R3);
  return { V, I1: (E1 - V) / R1, I2: (E2 - V) / R2, I3: V / R3 };
}

// ================================================================ t01 current, drift velocity, mobility
add('drift-mcq', mcq({
  stem: 'A copper wire has a thick section of cross-section $2A$ joined to a thin section of cross-section $A$, and carries a steady current. Compared with the thick section, the drift speed in the thin section is',
  right: 'twice as large',
  wrong: ['half as large', 'the same', 'four times as large'],
  sol: r`$I = n e A v_d$ with the same $I$ and $n$: $v_d \propto 1/A$, so halving the area doubles $v_d$ — option (@K).`,
  d: 2, c: 'understanding', t: [1],
}));
const vd2 = { I: 3.0, n: 8.0e28, A: 2.0e-6 };
vd2.v = vd2.I / (vd2.n * QE * vd2.A);
add('vd-num', num({
  stem: 'A wire of cross-section 2.0 mm² carries 3.0 A. The free-electron density is 8.0 × 10²⁸ m⁻³. Find the drift speed, in mm s⁻¹.',
  value: Number(dec(vd2.v * 1e3, 3)), tol: 0.005, unit: 'mm s⁻¹',
  sol: r`$v_d = \dfrac{I}{n e A} = \dfrac{3.0}{8.0 \times 10^{28} \times 1.6 \times 10^{-19} \times 2.0 \times 10^{-6}} = ${sci(vd2.v, 3)}$ m s$^{-1}$. In mm s$^{-1}$: $${sci(vd2.v, 3)} \times 10^{3} = ${dec(vd2.v * 1e3, 3)}$.`,
  scheme: [['v_d = I/(n e A) ≈ 0.117 mm s⁻¹', 1]],
  d: 2, c: 'understanding', t: [1],
}), (q) => near(vd2.v * 1e3, q.answer.value, 0.03) || 'vd');
add('mobility-mcq', mcq({
  stem: 'The SI unit of mobility of charge carriers is',
  right: 'm² V$^{-1}$ s$^{-1}$',
  wrong: ['m s$^{-1}$', 'V m$^{-1}$', 'm² s$^{-1}$'],
  sol: 'Mobility is drift speed per unit field: (m s$^{-1}$)/(V m$^{-1}$) = m² V$^{-1}$ s$^{-1}$ — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
const tau = ME / (8.5e28 * QE ** 2 * 1.7e-8);
add('tau-num', num({
  stem: 'Copper has resistivity 1.7 × 10⁻⁸ Ω m and 8.5 × 10²⁸ free electrons per m³. Estimate the relaxation time of its electrons, in femtoseconds (1 fs = 10⁻¹⁵ s). (mₑ = 9.1 × 10⁻³¹ kg)',
  value: Number(dec(tau * 1e15, 3)), tol: 0.5, unit: 'fs',
  sol: r`$\rho = \dfrac{m}{n e^2\tau}$, so $\tau = \dfrac{m}{n e^2\rho} = \dfrac{9.1 \times 10^{-31}}{8.5 \times 10^{28} \times (1.6 \times 10^{-19})^2 \times 1.7 \times 10^{-8}} = ${sci(tau, 3)}$ s. In fs: $${sci(tau, 3)} \times 10^{15} = ${dec(tau * 1e15, 3)}$.`,
  scheme: [['τ = m/(ne²ρ)', 1], ['τ ≈ 2.5 × 10⁻¹⁴ s = 24.6 fs', 1]],
  marks: 2, d: 3, c: 'application', t: [1, 2],
}), (q) => near(tau * 1e15, q.answer.value, 0.01) || `tau ${tau}`);
add('vdV-mcq', mcq({
  stem: 'The potential difference across a metal wire is doubled, its temperature staying the same. The drift speed of its electrons',
  right: 'doubles',
  wrong: ['halves', 'stays the same', 'becomes four times'],
  sol: r`$E = V/l$ doubles, and $v_d = eE\tau/m$ is proportional to $E$ — option (@K).`,
  d: 2, c: 'understanding', t: [1],
}));
add('length-mcq', mcq({
  stem: 'A fixed potential difference is applied across a wire. If the wire is replaced by one of the same material and thickness but twice as long, the drift speed',
  right: 'halves',
  wrong: ['doubles', 'stays the same', 'becomes one quarter'],
  sol: r`The field $E = V/l$ halves, so $v_d = eE\tau/m$ halves. (The current also halves, consistent with $I = n e A v_d$.) — option (@K).`,
  d: 3, c: 'application', t: [1],
}));
add('speed-tf', tf({
  stem: 'The drift speed of free electrons in a current-carrying copper wire is close to the speed of light.',
  key: 'f',
  sol: 'False. Drift speeds are about $10^{-4}$ m s$^{-1}$. It is the electric field (the signal) that travels at nearly the speed of light.',
  d: 1, c: 'understanding', t: [1],
}));
add('conv-fill', fill({
  stem: 'In a metal wire, the direction of conventional current is opposite to the direction of motion of the ___.',
  acc: [['electrons', 'free electrons', 'electron']],
  sol: 'Of the free **electrons**, which carry negative charge.',
  d: 1, c: 'recall', t: [1],
}));
add('signal-short', short({
  marks: 2,
  stem: 'Electrons in a wire drift at only about 0.1 mm s⁻¹, yet a lamp several metres from the switch lights almost instantly. Explain.',
  model: 'Closing the switch sets up an **electric field** along the whole wire almost at the **speed of light**. Free electrons are already present **everywhere** in the wire, including the lamp filament, so they all start drifting **at once**. No electron has to travel from the switch to the lamp.',
  sol: 'Separate the speed of the field from the drift speed of electrons.',
  scheme: [['Field established along the wire almost at the speed of light', 1], ['Electrons everywhere start drifting together', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('drift-short', short({
  marks: 3,
  stem: 'Derive the relation $I = n e A v_d$ between the current in a conductor and the drift velocity of its electrons. Hence define current density.',
  model: r`Let the conductor have cross-section $A$ and $n$ free electrons per unit volume, each drifting with speed $v_d$. In time $\Delta t$ each electron moves $v_d\Delta t$, so all electrons within a length $v_d\Delta t$ behind a cross-section cross it. Their number is $nAv_d\Delta t$ and their charge is $\Delta q = n e A v_d\Delta t$. Hence $I = \dfrac{\Delta q}{\Delta t} = n e A v_d$. **Current density** is current per unit area normal to the flow: $j = I/A = n e v_d$ (A m$^{-2}$).`,
  sol: 'Count the electrons in a cylinder of length v_d Δt.',
  scheme: [['Cylinder of length v_d Δt and number nAv_dΔt', 1], ['Charge and I = n e A v_d', 1], ['j = I/A = n e v_d', 1]],
  d: 3, c: 'understanding', t: [1], wl: null,
}));
add('drift-ar', ar({
  a: 'The drift velocity of free electrons in a metal is very small compared with their random thermal speeds.',
  r: 'Free electrons in a metal do not move at all between collisions.',
  key: 'c',
  sol: 'A is true. R is false: electrons move very fast between collisions, but in random directions; the field only adds a small average drift — option (c).',
  d: 2, c: 'understanding', t: [1],
}));

// ================================================================ t02 Ohm's law, resistivity, temperature
add('thicker-mcq', mcq({
  stem: 'Wires P and Q are of the same metal and the same length, at the same temperature. On a graph of current (y-axis) against voltage (x-axis), the line for P is steeper than the line for Q. Which is correct?',
  right: 'P is thicker than Q',
  wrong: ['Q is thicker than P', 'P and Q have the same thickness', 'P has the larger resistivity'],
  sol: 'A steeper I–V line means a larger $1/R$, so P has the smaller resistance. With the same $\\rho$ and $l$, $R = \\rho l/A$ is smaller for the larger area: P is thicker — option (@K).',
  d: 3, c: 'application', t: [2],
}));
add('stretch-mcq', mcq({
  stem: 'A wire of resistance 2 Ω is stretched uniformly to three times its length. Its new resistance is',
  right: '18 Ω',
  wrong: ['6 Ω', '2 Ω', '0.67 Ω'],
  sol: r`Volume is constant, so $A$ falls to $A/3$ while $l$ becomes $3l$: $R = \rho l/A$ rises $9$ times, $2 \times 9 = 18$ Ω — option (@K).`,
  d: 2, c: 'application', t: [2],
}), () => near(2 * 9, 18) || 'stretch');
add('rho-fill', fill({
  stem: 'The SI unit of resistivity is the ohm ___.',
  acc: [['metre', 'meter', 'm']],
  sol: 'Ohm **metre** (Ω m), from $\\rho = RA/l$.',
  d: 1, c: 'recall', t: [2],
}));
const rn = (1.0e-6 * 2.0) / 0.5e-6;
add('R-num', num({
  stem: 'A nichrome wire is 2.0 m long with a cross-section of 0.50 mm². Nichrome has resistivity 1.0 × 10⁻⁶ Ω m. Find its resistance, in ohms.',
  value: Number(dec(rn, 2)), tol: 0.05, unit: 'Ω',
  sol: r`$R = \dfrac{\rho l}{A} = \dfrac{1.0 \times 10^{-6} \times 2.0}{0.50 \times 10^{-6}} = ${dec(rn, 2)}$ Ω.`,
  scheme: [['R = ρl/A = 4.0 Ω', 1]],
  d: 1, c: 'understanding', t: [2],
}), (q) => near(rn, q.answer.value) || 'R');
const tn = { R0: 20, R: 24, a: 4.0e-3, T0: 20 };
tn.T = Math.round(tn.T0 + (tn.R / tn.R0 - 1) / tn.a);
add('temp-num', num({
  stem: 'A copper coil has a resistance of 20.0 Ω at 20 °C. At what temperature will its resistance be 24.0 Ω? Take α = 4.0 × 10⁻³ °C⁻¹. Give the answer in °C.',
  value: tn.T, tol: 1, unit: '°C',
  sol: r`$R_T = R_0[1 + \alpha(T - T_0)]$: $\dfrac{24.0}{20.0} - 1 = 0.20 = 4.0 \times 10^{-3}(T - 20)$, so $T - 20 = 50$ and $T = ${tn.T}$ °C.`,
  scheme: [['Correct use of R_T = R₀[1 + α(T − T₀)]', 1], ['T = 70 °C', 1]],
  marks: 2, d: 3, c: 'application', t: [2],
}), (q) => near(tn.T, q.answer.value) || 'T');
add('semi-ar', ar({
  a: 'The resistance of a pure semiconductor decreases when it is heated.',
  r: 'Heating increases the number of charge carriers in a semiconductor far more than it reduces the time between collisions.',
  key: 'a',
  sol: 'Both true; with $\\rho = m/n e^2\\tau$, the large rise in $n$ outweighs the fall in $\\tau$, which explains A — option (a).',
  d: 3, c: 'understanding', t: [2],
}));
add('ohmic-mcq', mcq({
  stem: 'For an ohmic conductor at constant temperature, the graph of current against voltage is',
  right: 'a straight line through the origin',
  wrong: ['a straight line that cuts the current axis above the origin', 'a curve bending towards the voltage axis', 'a horizontal line'],
  sol: 'Ohmic means $I \\propto V$: a straight line through the origin with slope $1/R$ — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('lamp-mcq', mcq({
  stem: 'The current–voltage graph of a filament lamp bends towards the voltage axis at higher voltages because',
  right: 'the filament gets hotter, so its resistance increases',
  wrong: ['the filament gets hotter, so its resistance decreases', 'the lamp obeys Ohm’s law exactly', 'the number of free electrons in the filament falls to zero'],
  sol: 'A hotter metal filament has larger resistivity, so each extra volt gives less extra current — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('manganin-mcq', mcq({
  stem: 'Standard resistance coils are usually made of manganin because it has',
  right: 'a very small temperature coefficient of resistivity',
  wrong: ['a very low resistivity', 'a negative temperature coefficient like a semiconductor', 'a very low melting point'],
  sol: 'Its resistance hardly changes with temperature, so the coil keeps its value — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('metal-ar', ar({
  a: 'The resistivity of a metal increases with temperature.',
  r: 'The number of free electrons per unit volume in a metal increases greatly with temperature.',
  key: 'c',
  sol: 'A is true. R is false: $n$ is nearly constant in a metal; the rise in $\\rho$ comes from more frequent collisions (smaller $\\tau$) — option (c).',
  d: 2, c: 'understanding', t: [2],
}));
add('ohm-tf', tf({
  stem: 'Ohm’s law holds for every conductor under all conditions.',
  key: 'f',
  sol: 'False. Filament lamps, diodes and many semiconductor devices are non-ohmic; even a metal obeys it only at constant temperature.',
  d: 1, c: 'understanding', t: [2],
}));
add('vi-match', match({
  stem: 'Match each device in Column A with the feature of its V–I characteristic in Column B.',
  pairs: [['Metal resistor at constant temperature', 'Straight line through the origin'], ['Filament lamp', 'Slope falls as the voltage rises'], ['Diode', 'Large current for one polarity only'], ['Gallium arsenide device', 'More than one voltage for the same current']],
  order: [3, 1, 0, 2],
  sol: 'Resistor → straight line (1 → s); lamp → falling slope (2 → q); diode → one polarity (3 → p); GaAs → more than one V for an I (4 → r).',
  d: 2, c: 'understanding', t: [2],
}));
add('slopeT-mcq', mcq({
  stem: 'I–V graphs of the same metal wire are drawn at two temperatures, T₁ and T₂. The graph at T₁ is steeper. Which is correct?',
  right: '$T_1 < T_2$',
  wrong: ['$T_1 > T_2$', '$T_1 = T_2$', 'The temperatures cannot be compared'],
  sol: 'On an I–V graph the slope is $1/R$. Steeper means smaller $R$, and a metal has smaller $R$ at lower temperature — option (@K).',
  d: 3, c: 'analysis', t: [2],
}));
add('vi-short', short({
  marks: 2,
  stem: 'Distinguish between linear and non-linear V–I characteristics, giving one example of each.',
  model: 'In a **linear** characteristic the current is proportional to the voltage: the graph is a straight line through the origin, the same in both directions (a metal wire at constant temperature). In a **non-linear** one, $I$ is not proportional to $V$ or depends on its sign: a filament lamp curves as it heats; a diode conducts only one way.',
  sol: 'Contrast proportional and non-proportional behaviour with examples.',
  scheme: [['Linear: straight line through origin, example', 1], ['Non-linear: curve or polarity dependence, example', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('tempdep-short', short({
  marks: 3,
  stem: 'Using $\\rho = \\dfrac{m}{n e^2\\tau}$, explain why the resistivity of a metal increases with temperature, while that of a semiconductor decreases.',
  model: 'In a **metal**, $n$ is large and almost **independent** of temperature. Heating makes the ions vibrate more, so electrons collide **more often** and $\\tau$ **decreases**: $\\rho$ rises. In a **semiconductor**, heating frees many more electrons (and holes), so $n$ **increases sharply**. Although $\\tau$ also decreases, the rise in $n$ dominates, so $\\rho$ **falls**.',
  sol: 'Track n and τ separately for each material.',
  scheme: [['Metal: n constant, τ decreases', 1], ['So ρ of a metal increases', 1], ['Semiconductor: n rises much more, ρ decreases', 1]],
  d: 3, c: 'understanding', t: [2],
}));

// ================================================================ t03 electrical energy and power
add('fuse-mcq', mcq({
  stem: 'A room circuit on a 220 V supply is protected by a 5 A fuse. What is the largest number of 100 W bulbs that can be switched on together without blowing the fuse?',
  right: '11',
  wrong: ['5', '22', '10'],
  sol: r`The fuse allows at most $P = VI = 220 \times 5 = 1100$ W, i.e. $1100/100 = 11$ bulbs — option (@K).`,
  d: 2, c: 'application', t: [3],
}), () => Math.floor((220 * 5) / 100) === 11 || 'fuse');
add('twoheaters-mcq', mcq({
  stem: 'Two identical heaters, each rated 1000 W at 220 V, are connected in series across a 220 V supply. The total power drawn is',
  right: '500 W',
  wrong: ['2000 W', '1000 W', '250 W'],
  sol: r`Each has $R = 220^2/1000 = 48.4$ Ω; in series $R = 96.8$ Ω, so $P = 220^2/96.8 = 500$ W — option (@K).`,
  d: 2, c: 'application', t: [3],
}), () => near(220 ** 2 / (2 * (220 ** 2 / 1000)), 500) || 'P');
add('bulbs-mcq', mcq({
  stem: 'Bulbs rated 100 W, 220 V and 60 W, 220 V are connected in series across a 220 V supply. Which bulb glows brighter?',
  right: 'The 60 W bulb',
  wrong: ['The 100 W bulb', 'Both equally', 'Neither; both fuse'],
  sol: r`$R = V^2/P$: the 60 W bulb has the larger resistance ($807$ Ω vs $484$ Ω). In series the current is the same, so $P = I^2R$ is larger for the 60 W bulb — option (@K).`,
  d: 3, c: 'application', t: [3],
}), () => (220 ** 2 / 60 > 220 ** 2 / 100) || 'bulbs');
const pw = 12 ** 2 / 4 + 12 ** 2 / 6;
add('power-num', num({
  stem: 'Resistors of 4 Ω and 6 Ω are connected in parallel across a 12 V supply of negligible internal resistance. Find the total power dissipated, in watts.',
  value: pw, tol: 0.5, unit: 'W',
  sol: r`Each has 12 V across it: $\dfrac{12^2}{4} = 36$ W and $\dfrac{12^2}{6} = 24$ W. Total $= 36 + 24 = ${pw}$ W.`,
  scheme: [['Power in each resistor', 1], ['Total 60 W', 1]],
  marks: 2, d: 2, c: 'application', t: [3],
}), (q) => near(pw, q.answer.value) || 'P');
const kwh = 1.5 * 2 * 30;
add('kwh-num', num({
  stem: 'A 1.5 kW geyser is used for 2 hours every day. How many kilowatt hours (units) does it use in 30 days?',
  value: kwh, tol: 0.5, unit: 'kWh',
  sol: r`$E = Pt = 1.5 \times 2 \times 30 = ${kwh}$ kWh.`,
  scheme: [['E = 90 kWh', 1]],
  d: 1, c: 'understanding', t: [3],
}), (q) => near(kwh, q.answer.value) || 'kwh');
add('halfcoil-mcq', mcq({
  stem: 'The coil of a heater is cut to half its length and the remaining half is used on the same supply voltage. The heater’s power',
  right: 'doubles',
  wrong: ['halves', 'stays the same', 'becomes four times'],
  sol: r`$R$ halves, and $P = V^2/R$ at fixed $V$ doubles — option (@K). (The coil runs much hotter.)`,
  d: 3, c: 'application', t: [3],
}));
add('parallelP-tf', tf({
  stem: 'Of two resistors connected in parallel across a supply, the one with the smaller resistance dissipates more power.',
  key: 't',
  sol: 'True. Both have the same voltage, and $P = V^2/R$ is larger for the smaller $R$.',
  d: 2, c: 'understanding', t: [3],
}));
add('rating-ar', ar({
  a: 'A 100 W, 220 V bulb has a larger resistance than a 60 W, 220 V bulb.',
  r: 'For appliances rated at the same voltage, $P = V^2/R$.',
  key: 'd',
  sol: 'R is true. A is false: from $R = V^2/P$, the 100 W bulb has the smaller resistance (484 Ω against 807 Ω) — option (d).',
  d: 2, c: 'application', t: [3],
}));
const tl = { P: 100e3, R: 5 };
tl.l1 = (tl.P / 1e3) ** 2 * tl.R;
tl.l10 = (tl.P / 10e3) ** 2 * tl.R;
add('transmission-short', short({
  marks: 3,
  stem: 'A power station sends 100 kW to a village through lines of total resistance 5.0 Ω. Find the power lost in the lines if the power is sent (a) at 1.0 kV, (b) at 10 kV. What do you conclude?',
  model: r`(a) $I = P/V = 100\,000/1000 = 100$ A; loss $= I^2R = 100^2 \times 5.0 = ${tl.l1}$ W (half the power!).
(b) $I = 100\,000/10\,000 = 10$ A; loss $= 10^2 \times 5.0 = ${tl.l10}$ W.
**Conclusion:** raising the voltage 10 times cuts the current 10 times and the line loss 100 times, so power is transmitted at high voltage.`,
  sol: 'Find I = P/V, then I²R for each voltage.',
  scheme: [['(a) I = 100 A, loss 50 kW', 1], ['(b) I = 10 A, loss 500 W', 1], ['Conclusion: high voltage reduces I²R loss', 1]],
  d: 3, c: 'application', t: [3], wl: null,
}), () => near(tl.l1, 50000) && near(tl.l10, 500) || 'lines');
add('heater-short', short({
  marks: 2,
  stem: 'Give two reasons why nichrome, rather than copper, is used for the heating element of an electric iron.',
  model: 'Nichrome has a much **higher resistivity**, so a short, convenient length gives the resistance needed for the required heating. It also has a **high melting point** and does **not oxidise** easily when red-hot, whereas copper would need a very long wire and would oxidise.',
  sol: 'Compare resistivity and behaviour at high temperature.',
  scheme: [['Higher resistivity', 1], ['High melting point / does not oxidise when hot', 1]],
  d: 2, c: 'understanding', t: [2, 3],
}));
add('cold-short', short({
  marks: 2,
  stem: 'A student measures the resistance of a 60 W, 220 V bulb with a multimeter at room temperature and finds about 70 Ω, not the 807 Ω given by $V^2/P$. She concludes the bulb is faulty. Evaluate her conclusion.',
  model: 'Her conclusion is **wrong**. $V^2/P$ gives the resistance of the filament when it is **white-hot** (about 2500 °C). Tungsten’s resistivity rises strongly with temperature, so the **cold** filament has a much **smaller** resistance. A reading of about one tenth of the hot value is normal for a working bulb.',
  sol: 'Relate the rated resistance to the operating temperature.',
  scheme: [['V²/P is the hot (operating) resistance', 1], ['Resistance of a cold metal filament is much lower; bulb not faulty', 1]],
  d: 3, c: 'evaluation', t: [2, 3],
}));

// ================================================================ t04 cells
add('lostvolts-mcq', mcq({
  stem: 'A high-resistance voltmeter across a cell reads 1.5 V. When a 4.0 Ω resistor is connected across the cell, the reading falls to 1.2 V. The internal resistance of the cell is',
  right: '1.0 Ω',
  wrong: ['0.30 Ω', '4.0 Ω', '0.25 Ω'],
  sol: r`$E = 1.5$ V. With the load, $I = V/R = 1.2/4.0 = 0.3$ A, and $Ir = 1.5 - 1.2 = 0.3$ V, so $r = 0.3/0.3 = 1$ Ω — option (@K).`,
  d: 3, c: 'application', t: [4],
}), () => near((1.5 - 1.2) / (1.2 / 4), 1) || 'r');
add('parallel-num', num({
  stem: 'Four identical cells, each of emf 1.5 V and internal resistance 2.0 Ω, are connected in parallel. Find the internal resistance of the combination, in ohms.',
  value: 0.5, tol: 0.01, unit: 'Ω',
  sol: r`For $n$ identical cells in parallel, $r_\text{eq} = r/n = 2.0/4 = 0.5$ Ω (emf stays 1.5 V).`,
  scheme: [['r/n = 0.5 Ω', 1]],
  d: 1, c: 'understanding', t: [4],
}), (q) => near(2 / 4, q.answer.value) || 'r');
add('terminal-mcq', mcq({
  stem: 'A cell of emf 2.0 V and internal resistance 0.50 Ω is connected to a 3.5 Ω resistor. The terminal voltage is',
  right: '1.75 V',
  wrong: ['2.0 V', '0.25 V', '1.5 V'],
  sol: r`$I = \dfrac{2.0}{3.5 + 0.5} = 0.5$ A; $V = E - Ir = 2.0 - 0.5 \times 0.5 = 1.75$ V — option (@K).`,
  d: 2, c: 'understanding', t: [4],
}), () => near(2 - (2 / 4) * 0.5, 1.75) || 'V');
add('charging-mcq', mcq({
  stem: 'A battery of emf 10 V and internal resistance 1.0 Ω is being charged with a current of 2.0 A. The potential difference across its terminals is',
  right: '12 V',
  wrong: ['8 V', '10 V', '2 V'],
  sol: r`While charging, current enters at the positive terminal: $V = E + Ir = 10 + 2.0 \times 1.0 = 12$ V — option (@K).`,
  d: 3, c: 'application', t: [4],
}), () => near(10 + 2, 12) || 'charge');
const gr = { V1: 1.4, I1: 0.2, V2: 1.1, I2: 0.8 };
gr.r = (gr.V1 - gr.V2) / (gr.I2 - gr.I1);
gr.E = gr.V1 + gr.I1 * gr.r;
add('graphE-num', num({
  stem: 'A cell’s terminal voltage is 1.4 V when it supplies 0.20 A and 1.1 V when it supplies 0.80 A. Find its internal resistance and emf. Enter the emf, in volts.',
  value: Number(dec(gr.E, 2)), tol: 0.02, unit: 'V',
  sol: r`$V = E - Ir$ at both points: $r = \dfrac{1.4 - 1.1}{0.80 - 0.20} = ${dec(gr.r, 2)}$ Ω. Then $E = 1.4 + 0.20 \times 0.50 = ${dec(gr.E, 2)}$ V.`,
  scheme: [['r = 0.50 Ω from the change in V and I', 1], ['E = 1.5 V', 1]],
  marks: 2, d: 3, c: 'application', t: [4],
}), (q) => near(gr.E, q.answer.value) && near(gr.r, 0.5) || 'E');
add('reversed-mcq', mcq({
  stem: 'Four cells, each of emf 1.5 V and internal resistance 0.10 Ω, are connected in series, but one of them is put in the wrong way round. The combination has',
  right: 'emf 3.0 V and internal resistance 0.40 Ω',
  wrong: ['emf 6.0 V and internal resistance 0.40 Ω', 'emf 3.0 V and internal resistance 0.20 Ω', 'emf 4.5 V and internal resistance 0.30 Ω'],
  sol: 'The reversed cell subtracts its emf: $1.5 + 1.5 + 1.5 - 1.5 = 3.0$ V. Internal resistances always add: $4 \\times 0.10 = 0.40$ Ω — option (@K).',
  d: 3, c: 'application', t: [4],
}));
const pu = { E1: 2, r1: 1, E2: 1, r2: 1 };
pu.r = 1 / (1 / pu.r1 + 1 / pu.r2);
pu.E = (pu.E1 / pu.r1 + pu.E2 / pu.r2) * pu.r;
add('unequal-mcq', mcq({
  stem: 'A cell of emf 2.0 V and internal resistance 1.0 Ω is connected in parallel (positive to positive) with a cell of emf 1.0 V and internal resistance 1.0 Ω. The equivalent emf and internal resistance are',
  right: '1.5 V and 0.5 Ω',
  wrong: ['3.0 V and 2.0 Ω', '1.5 V and 2.0 Ω', '2.0 V and 0.5 Ω'],
  sol: r`$\dfrac{1}{r} = 1 + 1$, so $r = 0.5$ Ω; $\dfrac{E}{r} = \dfrac{2.0}{1.0} + \dfrac{1.0}{1.0} = 3$, so $E = 3 \times 0.5 = 1.5$ V — option (@K).`,
  d: 3, c: 'application', t: [4],
}), () => near(pu.E, 1.5) && near(pu.r, 0.5) || 'pu');
add('greater-tf', tf({
  stem: 'The potential difference across the terminals of a cell can be greater than its emf.',
  key: 't',
  sol: 'True. When the cell is being charged, current enters at its positive terminal and $V = E + Ir > E$.',
  d: 2, c: 'understanding', t: [4],
}));
add('emf-ar', ar({
  a: 'The terminal voltage of a cell supplying current is less than its emf.',
  r: 'Part of the emf is used to drive the current through the internal resistance of the cell.',
  key: 'a',
  sol: 'Both true; the "lost volts" $Ir$ inside the cell are exactly why $V = E - Ir < E$ — option (a).',
  d: 2, c: 'understanding', t: [4],
}));
add('best-short', short({
  marks: 3,
  stem: 'Two identical cells, each of emf $E$ and internal resistance $r$, are to drive current through an external resistance $R$. Find the current when they are joined (a) in series, (b) in parallel. Show that the series arrangement gives more current when $R > r$.',
  model: r`(a) Series: emf $2E$, resistance $2r$: $I_s = \dfrac{2E}{R + 2r}$.
(b) Parallel: emf $E$, resistance $r/2$: $I_p = \dfrac{E}{R + r/2} = \dfrac{2E}{2R + r}$.
$I_s > I_p$ when $R + 2r < 2R + r$, that is when $R > r$. (For $R < r$ the parallel arrangement is better; for $R = r$ they are equal.)`,
  sol: 'Write both currents with the same numerator 2E and compare denominators.',
  scheme: [['I_s = 2E/(R + 2r)', 1], ['I_p = 2E/(2R + r)', 1], ['Comparison gives R > r', 1]],
  d: 4, c: 'analysis', t: [4], wl: null,
}), () => { const E = 1; const rr = 1; const R = 3; return (2 * E) / (R + 2 * rr) > (2 * E) / (2 * R + rr) || 'best'; });

// ================================================================ t05 Kirchhoff's rules
add('branchV-mcq', mcq({
  stem: 'In part of a circuit, a current of 1.0 A flows from point A through a 2.0 Ω resistor and then through a 3.0 V cell (entering at its negative terminal) to point B. The potential difference $V_A - V_B$ is',
  right: '−1.0 V',
  wrong: ['+1.0 V', '+5.0 V', '−5.0 V'],
  sol: r`From A to B: across the resistor along the current the potential falls by $1.0 \times 2.0 = 2$ V; through the cell from − to + it rises by 3.0 V. So $V_B = V_A - 2 + 3$, giving $V_A - V_B = -1$ V — option (@K).`,
  d: 3, c: 'application', t: [5],
}), () => near(2 - 3, -1) || 'VAB');
add('junction-num', num({
  stem: 'Four wires meet at a junction. Currents of 3.0 A and 2.0 A flow into it along two wires, and 4.0 A flows out along the third. Find the current in the fourth wire, in amperes (it flows out of the junction).',
  value: 1, tol: 0.01, unit: 'A',
  sol: r`Junction rule: in $=$ out, $3.0 + 2.0 = 4.0 + I$, so $I = 3.0 + 2.0 - 4.0 = 1$ A, flowing out.`,
  scheme: [['Junction rule gives 1.0 A out', 1]],
  d: 1, c: 'understanding', t: [5],
}), (q) => near(3 + 2 - 4, q.answer.value) || 'I');
const k2 = twoLoop(10, 1, 5, 1, 2);
add('kirch-num', num({
  stem: 'Two branches are joined between points A and B: one has a 10 V cell in series with 1.0 Ω, the other a 5.0 V cell in series with 1.0 Ω (both cells with their positive terminals towards A, internal resistances included in these values). A 2.0 Ω resistor is also connected between A and B. Find the current in the 2.0 Ω resistor, in amperes.',
  value: Number(dec(k2.I3, 2)), tol: 0.05, unit: 'A',
  sol: r`Let $V_A - V_B = V$. Junction A: $\dfrac{10 - V}{1} + \dfrac{5 - V}{1} = \dfrac{V}{2}$, so $15 = 2.5V$ and $V = ${dec(k2.V, 2)}$ V. Current in the 2.0 Ω resistor $= V/2 = ${dec(k2.I3, 2)}$ A (the cell currents are ${dec(k2.I1, 2)} A and ${dec(k2.I2, 2)} A).`,
  scheme: [['Junction and loop equations set up', 1], ['I = 3.0 A', 1]],
  marks: 2, d: 3, c: 'application', t: [5],
}), (q) => near(k2.I3, q.answer.value) && near(k2.I1 + k2.I2, k2.I3) || 'k2');
add('against-mcq', mcq({
  stem: 'When applying Kirchhoff’s loop rule, you move through a resistor $R$ in the direction OPPOSITE to the current $I$ in it. The potential change you write is',
  right: '$+IR$',
  wrong: ['$-IR$', 'zero', '$-I/R$'],
  sol: 'Current flows from higher to lower potential through a resistor, so going against it you climb by $IR$ — option (@K).',
  d: 2, c: 'understanding', t: [5],
}));
add('basis-mcq', mcq({
  stem: 'Kirchhoff’s junction rule is a statement of the conservation of',
  right: 'charge',
  wrong: ['energy', 'momentum', 'mass'],
  sol: 'Charge cannot accumulate at a junction in a steady state — option (@K).',
  d: 1, c: 'recall', t: [5],
}));
add('loop-ar', ar({
  a: 'Kirchhoff’s loop rule is a consequence of the conservation of energy.',
  r: 'The electrostatic force is conservative, so the net work done on a charge taken round a closed loop is zero.',
  key: 'a',
  sol: 'Both true; because the work round a closed path is zero, the potential changes round any loop must add to zero — option (a).',
  d: 3, c: 'understanding', t: [5],
}));
add('rules-short', short({
  marks: 2,
  stem: 'State Kirchhoff’s two rules for electric circuits and the conservation law on which each is based.',
  model: '**Junction rule:** at any junction, the sum of currents entering equals the sum leaving — **conservation of charge**. **Loop rule:** the algebraic sum of the changes in potential round any closed loop is zero — **conservation of energy**.',
  sol: 'State each rule with its basis.',
  scheme: [['Junction rule with charge conservation', 1], ['Loop rule with energy conservation', 1]],
  d: 1, c: 'recall', t: [5],
}));
const k3 = { E1: 9, E2: 3, R: 6 };
add('oppose-short', short({
  marks: 3,
  stem: 'A 9.0 V cell and a 3.0 V cell (negligible internal resistances) are connected in series with a 2.0 Ω and a 4.0 Ω resistor, with the cells OPPOSING each other. Use the loop rule to find the current and the potential difference across the 4.0 Ω resistor. Which cell is being charged?',
  model: r`Take the current in the direction driven by the 9.0 V cell. Loop rule: $9.0 - 3.0 - 2.0I - 4.0I = 0$, so $I = \dfrac{6.0}{6.0} = 1$ A. P.d. across 4.0 Ω $= 1 \times 4.0 = 4$ V. The current enters the **3.0 V cell at its positive terminal**, so the **3.0 V cell is being charged**.`,
  sol: 'Write the loop equation with opposing emfs.',
  scheme: [['Loop equation 9 − 3 − 6I = 0', 1], ['I = 1.0 A and 4.0 V', 1], ['3.0 V cell is charged', 1]],
  d: 3, c: 'application', t: [5], wl: null,
}), () => near((k3.E1 - k3.E2) / k3.R, 1) || 'oppose');

// ================================================================ t06 Wheatstone and metre bridge
add('swap-mcq', mcq({
  stem: 'In a metre bridge, the balance point is 40 cm from the left end. The resistors in the two gaps are now interchanged. The new balance point is',
  right: '60 cm from the left end',
  wrong: ['40 cm from the left end', '20 cm from the left end', '50 cm from the left end'],
  sol: r`Before: $X/R = 40/60$. After swapping, $R/X = l/(100 - l) = 60/40$, so $l = 60$ cm — option (@K).`,
  d: 2, c: 'application', t: [6],
}), () => near(60 / 40, 1 / (40 / 60)) || 'swap');
add('series10-mcq', mcq({
  stem: 'In a metre bridge, an unknown X in the left gap balances a 10 Ω resistor in the right gap at 50.0 cm. A further 10 Ω resistor is then connected in series with X. The new balance point is about',
  right: '66.7 cm from the left end',
  wrong: ['33.3 cm from the left end', '50.0 cm from the left end', '75.0 cm from the left end'],
  sol: r`First balance: $X = 10$ Ω. Now the left gap has 20 Ω: $\dfrac{20}{10} = \dfrac{l}{100 - l}$, so $l = 200/3 \approx 66.7$ cm — option (@K).`,
  d: 3, c: 'application', t: [6],
}), () => near((2 * 100) / 3, 66.7, 0.001) || 'l');
add('bridgeS-num', num({
  stem: 'In a Wheatstone bridge, P = 10 Ω, Q = 20 Ω and R = 15 Ω. Find the value of S, in ohms, for which the galvanometer shows no deflection.',
  value: 30, tol: 0.1, unit: 'Ω',
  sol: r`Balance: $\dfrac{P}{Q} = \dfrac{R}{S}$, so $S = \dfrac{RQ}{P} = \dfrac{15 \times 20}{10} = 30$ Ω.`,
  scheme: [['S = RQ/P = 30 Ω', 1]],
  d: 1, c: 'understanding', t: [6],
}), (q) => near((15 * 20) / 10, q.answer.value) || 'S');
const mb = { R: 6, l: 60 };
mb.X = (mb.R * mb.l) / (100 - mb.l);
add('metre-num', num({
  stem: 'In a metre bridge with an unknown resistance X in the left gap and 6.0 Ω in the right gap, the balance point is 60.0 cm from the left end. Find X, in ohms.',
  value: mb.X, tol: 0.05, unit: 'Ω',
  sol: r`$\dfrac{X}{R} = \dfrac{l}{100 - l}$: $X = 6.0 \times \dfrac{60}{40} = ${mb.X}$ Ω.`,
  scheme: [['X = R l/(100 − l) = 9.0 Ω', 1]],
  d: 2, c: 'understanding', t: [6],
}), (q) => near(mb.X, q.answer.value) || 'X');
add('emfbridge-mcq', mcq({
  stem: 'A Wheatstone bridge is balanced. The cell is replaced by one with twice the emf. The bridge',
  right: 'stays balanced',
  wrong: ['becomes unbalanced, with current from B to D', 'becomes unbalanced, with current from D to B', 'stays balanced only if the galvanometer is also changed'],
  sol: 'The balance condition $P/Q = R/S$ does not involve the emf; all potentials scale together, so B and D stay at equal potential — option (@K).',
  d: 2, c: 'understanding', t: [6],
}));
add('extra-mcq', mcq({
  stem: 'A Wheatstone bridge is balanced. A 5 Ω resistor is now connected directly between points B and D (in parallel with the galvanometer). The galvanometer reading',
  right: 'stays zero',
  wrong: ['becomes non-zero, because current now flows through the 5 Ω resistor', 'doubles', 'reverses'],
  sol: 'At balance B and D are at the same potential, so no current flows through anything joined between them; nothing changes — option (@K).',
  d: 4, c: 'analysis', t: [6],
}));
add('bridge-ar', ar({
  a: 'A balanced Wheatstone bridge stays balanced if the cell and the galvanometer are interchanged.',
  r: 'At balance, no current flows through the galvanometer.',
  key: 'b',
  sol: 'Both are true, but R does not explain A. A follows because the balance condition $P/Q = R/S$ is the same as $P/R = Q/S$, the condition for the interchanged arrangement — option (b).',
  d: 4, c: 'analysis', t: [6],
}));
add('middle-short', short({
  marks: 2,
  stem: 'Why is it best to choose the known resistance in a metre bridge experiment so that the balance point is near the middle of the wire?',
  model: 'Near the middle, both lengths $l$ and $100 - l$ are large, so a fixed **reading error** (say ±0.1 cm) is a **small fraction** of each. The **end resistances** (contacts and copper strips) are also small compared with the resistance of each part of the wire. So the result is most accurate.',
  sol: 'Consider percentage errors in l and 100 − l and end resistances.',
  scheme: [['Small percentage error in both lengths', 1], ['End resistances less important', 1]],
  d: 2, c: 'understanding', t: [6],
}));

// ================================================================ long answers (5 marks)
const ld = { I: 1.5, A: 1.0e-6, n: 8.5e28 };
ld.v = ld.I / (ld.n * QE * ld.A);
add('drift-long', long({
  stem: '(a) Define drift velocity and relaxation time. (b) Derive the expression for the drift velocity of electrons in terms of the applied field. (c) Use it to show that the resistivity of a metal is $\\rho = \\dfrac{m}{n e^2\\tau}$. (d) Find the drift speed when 1.5 A flows through a copper wire of cross-section 1.0 mm² ($n = 8.5 \\times 10^{28}$ m⁻³).',
  model: r`(a) **Drift velocity:** average velocity acquired by free electrons in a conductor due to an applied field. **Relaxation time** $\tau$: average time between successive collisions of an electron.

(b) Each electron has acceleration $\vec a = -e\vec E/m$. Just after a collision its velocity is random, $\vec v_0$, averaging to zero. After time $t_i$: $\vec v_i = \vec v_{0i} - \dfrac{e\vec E}{m}t_i$. Averaging over all electrons, the average of $t_i$ is $\tau$: $\vec v_d = -\dfrac{e\vec E}{m}\tau$.

(c) $I = n e A v_d = n e A\dfrac{eE\tau}{m}$ with $E = V/l$: $I = \dfrac{n e^2\tau A}{ml}V$. Comparing with $V = IR = I\rho\dfrac{l}{A}$ gives $\rho = \dfrac{m}{n e^2\tau}$.

(d) $v_d = \dfrac{I}{n e A} = \dfrac{1.5}{8.5 \times 10^{28} \times 1.6 \times 10^{-19} \times 1.0 \times 10^{-6}} = ${sci(ld.v, 2)}$ m s$^{-1}$.`,
  sol: 'Average the velocities after collisions; then compare I = n e A v_d with Ohm’s law.',
  scheme: [['Definitions', 1], ['Velocity after time t and averaging', 1], ['v_d = −eEτ/m', 1], ['ρ = m/(ne²τ) from I = n e A v_d', 1], ['v_d ≈ 1.1 × 10⁻⁴ m s⁻¹', 1]],
  d: 3, c: 'understanding', t: [1, 2], wl: null,
}), () => near(ld.v, 1.1e-4, 0.02) || `v ${ld.v}`);
const lc = { E: 1.5, r: 0.2 };
lc.Is = (3 * lc.E) / (6 + 3 * lc.r);
lc.Ip = lc.E / (6 + lc.r / 3);
add('cells-long', long({
  stem: '(a) Distinguish between the emf and the terminal voltage of a cell, and derive $V = E - Ir$. (b) Three cells, each of emf 1.5 V and internal resistance 0.20 Ω, are used to drive current through a 6.0 Ω resistor. Find the current when the cells are joined (i) in series, (ii) in parallel. (c) Which arrangement gives the larger current here, and why?',
  model: r`(a) **EMF** is the p.d. across the terminals when no current flows (the work done per unit charge by the cell). **Terminal voltage** is the p.d. across the terminals when current flows. With current $I$: $E = I(R + r)$, so $V = IR = E - Ir$: the "lost volts" $Ir$ are used inside the cell.

(b)(i) Series: emf $4.5$ V, internal resistance $0.60$ Ω: $I = \dfrac{4.5}{6.0 + 0.60} = ${dec(lc.Is, 3)}$ A.
(ii) Parallel: emf $1.5$ V, internal resistance $0.20/3$ Ω: $I = \dfrac{1.5}{6.0 + 0.0667} \approx ${dec(lc.Ip, 3)}$ A.

(c) **Series** gives about three times the current, because the external resistance (6.0 Ω) is much larger than the internal resistance (0.20 Ω): adding emfs matters more than reducing internal resistance.`,
  sol: 'Combine the cells first, then I = E_eq/(R + r_eq).',
  scheme: [['EMF vs terminal voltage, V = E − Ir', 1], ['Series E and r', 1], ['Series current ≈ 0.682 A', 1], ['Parallel current ≈ 0.247 A', 1], ['Series better since R ≫ r', 1]],
  d: 3, c: 'application', t: [4], wl: null,
}), () => near(lc.Is, 0.6818, 0.002) && near(lc.Ip, 0.2473, 0.003) || `cells ${lc.Is} ${lc.Ip}`);
const lk = twoLoop(8, 2, 4, 4, 4);
add('kirch-long', long({
  stem: '(a) State Kirchhoff’s rules. (b) Two branches are connected between points A and B: branch 1 has an 8.0 V cell and a 2.0 Ω resistor, branch 2 has a 4.0 V cell and a 4.0 Ω resistor (both cells with their positive terminals towards A, negligible internal resistance), and a third branch is a 4.0 Ω resistor. Find the current in each branch and the potential difference between A and B. State which cell, if any, is being charged.',
  model: r`(a) **Junction rule:** the sum of currents into a junction equals the sum out (charge conservation). **Loop rule:** the algebraic sum of potential changes round any closed loop is zero (energy conservation).

(b) Let $I_1$ and $I_2$ flow up through the cell branches into A and $I_3$ flow from A to B through the 4.0 Ω resistor. Junction A: $I_1 + I_2 = I_3$.
Loop 1: $8.0 - 2.0I_1 - 4.0I_3 = 0$. Loop 2: $4.0 - 4.0I_2 - 4.0I_3 = 0$.
Solving: $I_1 = ${dec(lk.I1, 3)}$ A, $I_2 = ${dec(lk.I2, 2)}$ A, $I_3 = ${dec(lk.I3, 3)}$ A, and $V_A - V_B = 4.0I_3 = ${dec(lk.V, 3)}$ V.
$I_2$ is ${lk.I2 < 0 ? 'negative, so 0.25 A flows down through the 4.0 V cell, entering at its positive terminal: the **4.0 V cell is being charged**' : 'positive, so neither cell is charged'}.`,
  sol: 'Junction rule at A, then two independent loops.',
  scheme: [['Statement of both rules', 1], ['Junction equation', 1], ['Two loop equations', 1], ['Currents I₁ = 1.5 A, I₂ = −0.25 A, I₃ = 1.25 A', 1], ['V_AB = 5.0 V and the 4.0 V cell is charged', 1]],
  d: 4, c: 'application', t: [5], wl: null,
}), () => near(lk.I1, 1.5) && near(lk.I2, -0.25) && near(lk.I3, 1.25) && near(lk.V, 5) || `lk ${JSON.stringify(lk)}`);
const lb = { R: 5, l1: 37.5 };
lb.X1 = (lb.R * lb.l1) / (100 - lb.l1);
add('bridge-long', long({
  stem: '(a) Using Kirchhoff’s rules, derive the condition for balance of a Wheatstone bridge. (b) Describe how a metre bridge uses this principle. (c) With a 5.0 Ω resistor in the right gap of a metre bridge, the balance point is 37.5 cm from the left end. Find the unknown resistance in the left gap and the new balance point if the two resistors are interchanged.',
  model: r`(a) Arms: P (A–B), Q (B–C), R (A–D), S (D–C); galvanometer B–D; cell across A–C. At balance $I_g = 0$, so the current $I_1$ in P also flows through Q, and $I_2$ in R also flows through S. Loop ABDA: $-I_1P + I_2R = 0$. Loop BCDB: $-I_1Q + I_2S = 0$. Dividing: $\dfrac{P}{Q} = \dfrac{R}{S}$.

(b) In a metre bridge, P and Q are the unknown X and a known R in two gaps, and the other two arms are the lengths $l$ and $100 - l$ of a uniform wire, whose resistances are proportional to length. A jockey is slid along the wire until the galvanometer reads zero: $\dfrac{X}{R} = \dfrac{l}{100 - l}$.

(c) $X = 5.0 \times \dfrac{37.5}{62.5} = ${dec(lb.X1, 2)}$ Ω. After interchanging, $\dfrac{R}{X} = \dfrac{l'}{100 - l'}$, so $l' = 62.5$ cm.`,
  sol: 'Zero galvanometer current; two loops; divide. Then X/R = l/(100 − l).',
  scheme: [['Currents at balance (same I₁ in P and Q, I₂ in R and S)', 1], ['Two loop equations', 1], ['P/Q = R/S', 1], ['Metre bridge principle', 1], ['X = 3.0 Ω and new balance at 62.5 cm', 1]],
  d: 3, c: 'understanding', t: [6], wl: null,
}), () => near(lb.X1, 3) || 'X');
const lr = { R0: 2.5, a: 4.3e-3, T0: 27, R: 2.7 };
lr.T = lr.T0 + (lr.R / lr.R0 - 1) / lr.a;
add('temp-long', long({
  stem: '(a) Sketch and explain how the resistivity of (i) a metal, (ii) an alloy such as nichrome, (iii) a semiconductor varies with temperature. (b) A silver wire has resistance 2.5 Ω at 27 °C. Its temperature coefficient of resistivity is 4.3 × 10⁻³ °C⁻¹. At what temperature is its resistance 2.7 Ω? (c) Why is a metal resistance thermometer possible but a nichrome one is not practical?',
  model: r`(a)(i) **Metal:** $\rho$ rises almost linearly, $\rho_T = \rho_0[1 + \alpha(T - T_0)]$ — ions vibrate more, collisions are more frequent, $\tau$ falls. (ii) **Nichrome:** high $\rho$ that changes very little ($\alpha$ about ten times smaller than copper’s). (iii) **Semiconductor:** $\rho$ falls steeply — the number of charge carriers rises sharply with temperature.

(b) $\dfrac{2.7}{2.5} - 1 = 0.08 = 4.3 \times 10^{-3}(T - 27)$, so $T - 27 \approx ${dec(lr.T - lr.T0, 3)}$ and $T \approx ${dec(lr.T, 3)}$ °C.

(c) A thermometer needs a resistance that changes **noticeably and predictably** with temperature. A metal such as platinum has a sizeable $\alpha$; nichrome’s resistance hardly changes, so temperature changes would be too small to measure.`,
  sol: 'Describe the three curves with reasons; then rearrange R_T = R₀[1 + α(T − T₀)].',
  scheme: [['Metal curve with reason', 1], ['Alloy curve', 1], ['Semiconductor curve with reason', 1], ['T ≈ 45.6 °C', 1], ['Thermometer needs a sizeable α', 1]],
  d: 3, c: 'application', t: [2], wl: null,
}), () => near(lr.T, 45.6, 0.002) || `T ${lr.T}`);

// ================================================================ case-based (4 marks: 1 + 1 + 2)
const ec = { rho: 1.7e-8, L: 20, A: 1.5e-6, I: 10 };
ec.R = (ec.rho * ec.L) / ec.A;
ec.P = ec.I ** 2 * ec.R;
add('cord-case', mk.case({
  passage: 'A family in Lucknow plugs a 2.2 kW room heater into a 10 m extension cord. The cord has two copper conductors (out and back), each of cross-section 1.5 mm². Copper has resistivity 1.7 × 10⁻⁸ Ω m. After an hour the cord feels warm, and the label on it says “maximum 6 A”.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'The current drawn by the heater on a 220 V supply is about',
      right: '10 A',
      wrong: ['6 A', '2.2 A', '100 A'],
      sol: r`$I = P/V = 2200/220 = 10$ A — option (@K).`,
      d: 1, c: 'understanding', t: [3],
    })),
    part('b', num({
      stem: 'Find the total resistance of the two copper conductors (20 m in all), in ohms.',
      value: Number(dec(ec.R, 2)), tol: 0.01, unit: 'Ω',
      sol: r`$R = \dfrac{\rho l}{A} = \dfrac{1.7 \times 10^{-8} \times 20}{1.5 \times 10^{-6}} = ${dec(ec.R, 3)}$ Ω.`,
      scheme: [['R ≈ 0.23 Ω', 1]],
      d: 2, c: 'application', t: [2],
    })),
    part('c', short({
      marks: 2,
      stem: 'Find the power wasted as heat in the cord, and explain why the cord gets warm.',
      model: r`$P = I^2R = 10^2 \times ${dec(ec.R, 3)} \approx ${dec(ec.P, 2)}$ W, released along the cord’s small volume, so it warms up. The current (10 A) is well above the cord’s 6 A rating, so the heating is more than it was designed for.`,
      sol: 'Use P = I²R for the cord.',
      scheme: [['P = I²R ≈ 23 W', 1], ['Explanation: current above the rating heats the cord', 1]],
      d: 3, c: 'application', t: [3], wl: null,
    }), [
      short({
        marks: 2,
        stem: 'Evaluate whether the family should keep using this cord for the heater, and suggest what cord they need.',
        model: 'They **should not**. The heater draws about 10 A, nearly twice the 6 A rating; the extra $I^2R$ heating can melt the insulation and cause a fire. They need a cord rated for at least 10 A (thicker conductors, e.g. 2.5 mm²), which has **lower resistance** and so heats far less.',
        sol: 'Compare the current with the rating and relate thickness to resistance.',
        scheme: [['Unsafe: current exceeds rating, fire risk', 1], ['Thicker (lower R) cord rated ≥ 10 A', 1]],
        d: 3, c: 'evaluation', t: [2, 3],
      }),
    ]),
  ],
}), (q) => near(ec.R, 0.2267, 0.002) && near(q.children[1].answer.value, 0.23) || 'cord');

const cb = { E: 12.6, r: 0.02, I: 150 };
cb.V = cb.E - cb.I * cb.r;
cb.Pin = cb.I ** 2 * cb.r;
add('starter-case', mk.case({
  passage: `A car battery has an emf of 12.6 V and an internal resistance of 0.020 Ω. When the driver turns the key, the starter motor draws about 150 A for a few seconds. The driver notices that the headlights, which were already on, dim sharply while the engine is being started.`,
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'While the starter motor runs, the terminal voltage of the battery is about',
      right: `${dec(cb.V, 2)} V`,
      wrong: ['12.6 V', '3.0 V', '15.6 V'],
      sol: r`$V = E - Ir = 12.6 - 150 \times 0.020 = ${dec(cb.V, 2)}$ V — option (@K).`,
      d: 2, c: 'application', t: [4],
    })),
    part('b', num({
      stem: 'Find the power wasted inside the battery while the starter runs, in watts.',
      value: cb.Pin, tol: 2, unit: 'W',
      sol: r`$P = I^2r = 150^2 \times 0.020 = ${cb.Pin}$ W.`,
      scheme: [['P = I²r = 450 W', 1]],
      d: 2, c: 'application', t: [3, 4],
    })),
    part('c', short({
      marks: 2,
      stem: 'Explain why the headlights dim while the starter motor runs.',
      model: r`The headlights are connected across the battery terminals. The very large starter current causes a large "lost voltage" $Ir = 3.0$ V inside the battery, so the **terminal voltage falls** from about 12.6 V to 9.6 V. With less voltage across them, the lamps draw less current and their power $V^2/R$ falls, so they **dim**.`,
      sol: 'Terminal voltage falls by Ir.',
      scheme: [['Large Ir drop reduces terminal voltage', 1], ['Lower V across lamps, so less power', 1]],
      d: 3, c: 'analysis', t: [4], wl: null,
    }), [
      short({
        marks: 2,
        stem: 'A mechanic suggests a new battery with the same emf but internal resistance 0.010 Ω. Evaluate whether this would help.',
        model: r`Yes. The lost voltage would be $150 \times 0.010 = 1.5$ V, so the terminal voltage stays near $11.1$ V instead of $9.6$ V: the lamps dim much less and the starter gets more power. The heat wasted inside the battery would also halve, to about 225 W.`,
        sol: 'Recompute Ir and I²r with the new internal resistance.',
        scheme: [['Terminal voltage ≈ 11.1 V', 1], ['Less dimming and less internal heating: helpful', 1]],
        d: 3, c: 'evaluation', t: [4], wl: null,
      }),
    ]),
  ],
}), (q) => near(cb.V, 9.6) && near(q.children[1].answer.value, 450) || 'starter');

const pb = { Ec: 5.2, rc: 0.1, Eb: 3.7, rb: 0.05, rw: 0.15 };
pb.I = (pb.Ec - pb.Eb) / (pb.rc + pb.rb + pb.rw);
pb.Vb = pb.Eb + pb.I * pb.rb;
add('powerbank-case', mk.case({
  passage: 'A phone charger can be modelled as a source of emf 5.2 V with internal resistance 0.10 Ω. It charges a phone battery of emf 3.7 V and internal resistance 0.050 Ω through a USB cable whose two wires together have a resistance of 0.15 Ω. The charger’s positive terminal is connected to the battery’s positive terminal.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'In which direction does current flow through the phone battery?',
      right: 'Into its positive terminal, so the battery is being charged',
      wrong: ['Out of its positive terminal, so the battery is discharging', 'No current flows, because the cells oppose each other', 'It alternates direction'],
      sol: 'The larger emf (5.2 V) wins, driving current into the 3.7 V battery’s positive terminal — option (@K).',
      d: 2, c: 'application', t: [4, 5],
    })),
    part('b', num({
      stem: 'Use the loop rule to find the charging current, in amperes.',
      value: Number(dec(pb.I, 2)), tol: 0.05, unit: 'A',
      sol: r`Loop: $5.2 - 3.7 - I(0.10 + 0.050 + 0.15) = 0$, so $I = \dfrac{1.5}{0.30} = ${dec(pb.I, 2)}$ A.`,
      scheme: [['Loop equation and I = 5.0 A', 1]],
      d: 3, c: 'application', t: [5],
    })),
    part('c', short({
      marks: 2,
      stem: 'Find the terminal voltage of the phone battery while it charges, and explain why it is more than 3.7 V.',
      model: r`$V = E + Ir = 3.7 + 5.0 \times 0.050 = ${dec(pb.Vb, 3)}$ V. While charging, current is forced **into** the positive terminal against the emf, so the p.d. must also drive it through the internal resistance: $V = E + Ir > E$.`,
      sol: 'Charging: V = E + Ir.',
      scheme: [['V = 3.95 V', 1], ['Reason: charging, V = E + Ir', 1]],
      d: 3, c: 'application', t: [4], wl: null,
    }), [
      short({
        marks: 2,
        stem: 'A cheaper, thinner cable has a resistance of 0.45 Ω. Predict the charging current with it and comment on the result.',
        model: r`$I = \dfrac{1.5}{0.10 + 0.050 + 0.45} = \dfrac{1.5}{0.60} = 2.5$ A, **half** the current, so charging takes about twice as long. More of the charger’s power is also wasted as heat in the cable.`,
        sol: 'Recompute the loop with the new cable resistance.',
        scheme: [['I = 2.5 A', 1], ['Slower charging and more cable loss', 1]],
        d: 3, c: 'evaluation', t: [5], wl: null,
      }),
    ]),
  ],
}), (q) => near(pb.I, 5) && near(q.children[1].answer.value, 5) && near(1.5 / 0.6, 2.5) || 'pb');

const mbd = [[2, 60], [3, 50], [4, 42.9]].map(([R, l]) => ({ R, l, X: (R * l) / (100 - l) }));
add('metre-case', mk.case({
  passage: `In a school laboratory in Bhubaneswar, a student used a metre bridge to find an unknown resistance X placed in the left gap. She put three different known resistances R in the right gap and recorded the balance lengths l from the left end.

| R (Ω) | l (cm) |
|---|---|
| ${mbd.map((e) => `${e.R} | ${e.l}`).join(' |\n| ')} |`,
  d: 3, c: 'analysis',
  children: [
    part('a', mcq({
      stem: 'From the second reading (R = 3 Ω, l = 50 cm), the unknown resistance is',
      right: '3.0 Ω',
      wrong: ['1.5 Ω', '6.0 Ω', '50 Ω'],
      sol: r`Balance at the middle means $X = R$: $X = 3 \times \dfrac{50}{50} = 3$ Ω — option (@K).`,
      d: 2, c: 'application', t: [6],
    })),
    part('b', num({
      stem: 'Find X from the first reading (R = 2 Ω, l = 60 cm), in ohms.',
      value: mbd[0].X, tol: 0.05, unit: 'Ω',
      sol: r`$X = R\dfrac{l}{100 - l} = 2 \times \dfrac{60}{40} = ${mbd[0].X}$ Ω.`,
      scheme: [['X = 3.0 Ω', 1]],
      d: 2, c: 'understanding', t: [6],
    })),
    part('c', short({
      marks: 2,
      stem: 'All three readings give X ≈ 3 Ω. Which reading is likely to be the most reliable, and why?',
      model: r`The **second** reading (balance at 50 cm). Near the middle both lengths are large, so a fixed reading error is the **smallest percentage** of each length, and end resistances matter least. (The third reading also gives $4 \times 42.9/57.1 \approx ${dec(mbd[2].X, 3)}$ Ω.)`,
      sol: 'Balance near the middle gives the smallest percentage error.',
      scheme: [['Chooses the balance at 50 cm', 1], ['Reason: smallest percentage error, end effects least', 1]],
      d: 3, c: 'analysis', t: [6], wl: null,
    }), [
      short({
        marks: 2,
        stem: 'Her partner suggests replacing the galvanometer with a more sensitive one to change the value of X found. Evaluate this suggestion.',
        model: 'A more sensitive galvanometer does **not change** the balance condition $X/R = l/(100 - l)$, so X itself is unchanged. It only lets the balance point be located **more precisely**, reducing the error in $l$. So it improves precision, not the value.',
        sol: 'The balance condition does not involve the galvanometer.',
        scheme: [['Balance condition independent of the galvanometer', 1], ['Only improves precision of locating l', 1]],
        d: 3, c: 'evaluation', t: [6],
      }),
    ]),
  ],
}), (q) => near(mbd[0].X, 3) && near(mbd[1].X, 3) && near(mbd[2].X, 3.0035, 0.002) && near(q.children[1].answer.value, 3) || 'mb');
