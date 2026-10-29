// ch07 Alternating Current — question bank. Every numerical value is computed here and re-checked by the `check`
// functions. LC oscillations are deleted from the 2026-27 syllabus and not used. AR keys planned: d a b a a c a.
import { mk, add, r, sci, dec, near } from '../../cbse-12-physics-ch01/src/lib.mjs';

const { mcq, ar, tf, fill, match, num, short, long, part } = mk;
const W = (f) => 2 * Math.PI * f;

// ================================================================ t01 peak and rms
add('rms-num', num({
  stem: 'An alternating voltage has a peak value of 311 V. Find its rms value, in volts (3 significant figures).',
  value: Number(dec(311 / Math.SQRT2, 3)), tol: 1, unit: 'V',
  sol: r`$V_\text{rms} = \dfrac{V_0}{\sqrt2} = \dfrac{311}{1.414} \approx ${dec(311 / Math.SQRT2, 3)}$ V.`,
  scheme: [['V_rms = V₀/√2 ≈ 220 V', 1]],
  d: 1, c: 'understanding', t: [1],
}), (q) => near(311 / Math.SQRT2, q.answer.value) || 'rms');
add('peak-mcq', mcq({
  stem: 'An AC ammeter reads 5.0 A in a circuit with a sinusoidal current. The peak current is about',
  right: '7.1 A',
  wrong: ['5.0 A', '3.5 A', '10 A'],
  sol: r`Meters read rms, so $I_0 = \sqrt2 \times 5.0 \approx 7.07$ A — option (@K).`,
  d: 1, c: 'understanding', t: [1],
}), () => near(Math.SQRT2 * 5, 7.07) || 'pk');
const ht = 220 ** 2 / 44;
add('heater-num', num({
  stem: 'A heating element of resistance 44 Ω is connected to 220 V rms mains. Find the average power, in watts.',
  value: ht, tol: 5, unit: 'W',
  sol: r`$P = \dfrac{V_\text{rms}^2}{R} = \dfrac{220^2}{44} = ${ht}$ W.`,
  scheme: [['P = V²rms/R = 1100 W', 1]],
  d: 1, c: 'understanding', t: [1],
}), (q) => near(ht, q.answer.value) || 'P');
const bl = (60 / 220) * Math.SQRT2;
add('bulb-mcq', mcq({
  stem: 'A lamp is rated 60 W, 220 V for AC mains. The peak current through it is about',
  right: '0.39 A',
  wrong: ['0.27 A', '0.19 A', '3.7 A'],
  sol: r`$I_\text{rms} = \dfrac{60}{220} \approx 0.273$ A and $I_0 = \sqrt2 \times 0.273 \approx ${dec(bl, 2)}$ A — option (@K).`,
  d: 2, c: 'application', t: [1],
}), () => near(bl, 0.386, 0.01) || 'bl');
add('avg-tf', tf({
  stem: 'Because the average value of an alternating current over a cycle is zero, a heater connected to AC mains produces no heat.',
  key: 'f',
  sol: 'False. The heating depends on i², whose average over a cycle is I₀²/2, not zero. That is why rms values are used.',
  d: 1, c: 'understanding', t: [1],
}));
add('dcequiv-mcq', mcq({
  stem: 'A resistor is heated first by a steady current of 2 A and then by an alternating current whose ammeter reading is 2 A. Compared with the DC case, the heating on AC is',
  right: 'the same',
  wrong: ['half', 'twice', '√2 times'],
  sol: 'An AC meter reads rms, and the rms value is defined as the steady current giving the same heating — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('meter-ar', ar({
  a: 'An AC ammeter connected in a circuit reads the peak value of the current.',
  r: 'For a sinusoidal current, the rms value is the peak value divided by √2.',
  key: 'd',
  sol: 'R is true. A is false: AC meters are calibrated to read rms values — option (d).',
  d: 1, c: 'understanding', t: [1],
}));
add('rmsmeaning-short', short({
  marks: 2,
  stem: 'What is meant by the rms value of an alternating current? Why is it used instead of the average value?',
  model: 'The **rms value** is the steady (DC) current that would produce the **same average heating** in a resistor as the alternating current; for a sinusoid it is $I_0/\\sqrt2$. The **average** value over a full cycle is **zero**, which says nothing about the heating effect, so rms values are used for ratings and meters.',
  sol: 'Define by equal heating; average is zero.',
  scheme: [['Definition by equal heating, I₀/√2', 1], ['Average over a cycle is zero, so not useful', 1]],
  d: 2, c: 'understanding', t: [1],
}));

// ================================================================ t02 R, L, C; reactance; phasors
add('freqX-mcq', mcq({
  stem: 'The frequency of the AC supply is doubled. The inductive reactance of a coil and the capacitive reactance of a capacitor become',
  right: 'doubled and halved respectively',
  wrong: ['halved and doubled respectively', 'both doubled', 'both unchanged'],
  sol: '$X_L = \\omega L \\propto f$ and $X_C = 1/\\omega C \\propto 1/f$ — option (@K).',
  d: 1, c: 'understanding', t: [2],
}));
add('capPhase-ar', ar({
  a: 'In a circuit containing only a capacitor, the current leads the voltage by 90°.',
  r: 'The charging current is largest when the voltage is changing fastest, which is when the voltage passes through zero.',
  key: 'a',
  sol: 'Both true; since $i = C\\,dv/dt$, the current peaks a quarter cycle before the voltage does, which is exactly what R describes — option (a).',
  d: 3, c: 'understanding', t: [2],
}));
const xl = W(50) * 0.2;
add('XL-num', num({
  stem: 'Find the reactance of a 0.20 H inductor at 50 Hz, in ohms (3 significant figures).',
  value: Number(dec(xl, 3)), tol: 0.5, unit: 'Ω',
  sol: r`$X_L = 2\pi fL = 2\pi \times 50 \times 0.20 \approx ${dec(xl, 3)}$ Ω.`,
  scheme: [['X_L = 2πfL ≈ 62.8 Ω', 1]],
  d: 1, c: 'understanding', t: [2],
}), (q) => near(xl, q.answer.value) || 'xl');
const xc = 1 / (W(50) * 50e-6);
add('XC-num', num({
  stem: 'Find the reactance of a 50 μF capacitor at 50 Hz, in ohms (3 significant figures).',
  value: Number(dec(xc, 3)), tol: 0.5, unit: 'Ω',
  sol: r`$X_C = \dfrac{1}{2\pi fC} = \dfrac{1}{2\pi \times 50 \times 50 \times 10^{-6}} \approx ${dec(xc, 3)}$ Ω.`,
  scheme: [['X_C = 1/2πfC ≈ 63.7 Ω', 1]],
  d: 1, c: 'understanding', t: [2],
}), (q) => near(xc, q.answer.value) || 'xc');
const ff = 314 / (2 * Math.PI * 0.1);
add('freqfind-num', num({
  stem: 'At what frequency does a 0.10 H inductor have a reactance of 314 Ω? Answer in hertz (3 significant figures).',
  value: Number(dec(ff, 3)), tol: 2, unit: 'Hz',
  sol: r`$f = \dfrac{X_L}{2\pi L} = \dfrac{314}{2\pi \times 0.10} \approx ${dec(ff, 3)}$ Hz.`,
  scheme: [['f = X_L/2πL', 1], ['≈ 500 Hz', 1]],
  marks: 2, d: 2, c: 'application', t: [2],
}), (q) => near(ff, q.answer.value) || 'ff');
const eqX = 1 / Math.sqrt(1 * 1e-6) / (2 * Math.PI);
add('equalX-mcq', mcq({
  stem: 'At what frequency does a 1.0 H inductor have the same reactance as a 1.0 μF capacitor?',
  right: 'about 159 Hz',
  wrong: ['about 1000 Hz', 'about 50 Hz', 'about 6.3 Hz'],
  sol: r`$\omega L = \dfrac{1}{\omega C}$ gives $\omega = \dfrac{1}{\sqrt{LC}} = 1000$ rad s$^{-1}$, so $f = \dfrac{1000}{2\pi} \approx ${dec(eqX, 3)}$ Hz — option (@K).`,
  d: 3, c: 'application', t: [2, 3],
}), () => near(eqX, 159.2, 0.002) || 'eqX');
add('bulbcap-mcq', mcq({
  stem: 'A lamp is connected in series with a capacitor to a variable-frequency AC supply of fixed voltage. As the frequency is increased, the lamp',
  right: 'glows more brightly',
  wrong: ['glows less brightly', 'is unaffected', 'goes out completely'],
  sol: 'X_C = 1/ωC falls as the frequency rises, so the current, and the brightness, increase — option (@K).',
  d: 3, c: 'application', t: [2],
}));
add('bulbind-mcq', mcq({
  stem: 'A lamp in series with an air-cored coil is connected to AC mains. A soft-iron rod is slid into the coil. The lamp',
  right: 'becomes dimmer',
  wrong: ['becomes brighter', 'is unaffected', 'flickers at twice the mains frequency'],
  sol: 'The iron increases L greatly, so X_L = ωL rises and the current falls — option (@K).',
  d: 3, c: 'application', t: [2],
}));
add('lag-fill', fill({
  stem: 'In a circuit containing only an inductor, the current lags behind the voltage by a phase angle of ___ degrees.',
  acc: [['90', 'ninety', 'π/2']],
  sol: 'By **90** degrees (π/2 radians).',
  d: 1, c: 'recall', t: [2],
}));
add('elements-match', match({
  stem: 'Match each element connected alone to an AC supply (Column A) with its property (Column B).',
  pairs: [['Pure resistor', 'Current in phase with voltage'], ['Pure inductor', 'Reactance proportional to frequency'], ['Pure capacitor', 'Blocks steady (DC) current completely'], ['Series LCR at resonance', 'Impedance equal to R']],
  order: [3, 0, 2, 1],
  sol: 'Resistor → in phase (1 → s); inductor → X ∝ f (2 → p); capacitor → blocks DC (3 → r); resonance → Z = R (4 → q).',
  d: 2, c: 'understanding', t: [2, 3],
}));
add('dc-short', short({
  marks: 2,
  stem: 'Explain why a capacitor blocks a steady (DC) current but allows an alternating current to flow in the circuit.',
  model: 'With DC the capacitor simply **charges up** and then no more charge flows: $X_C = 1/\\omega C$ is **infinite** at ω = 0. With AC the voltage keeps **reversing**, so the capacitor keeps **charging and discharging**, and charge flows back and forth in the wires; $X_C$ is finite and falls as the frequency rises.',
  sol: 'X_C infinite at f = 0, finite for AC.',
  scheme: [['DC: charges once, then no current (X_C infinite)', 1], ['AC: repeated charging/discharging, finite X_C', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('bulbfreq-short', short({
  marks: 2,
  stem: 'Two identical lamps are connected to the same variable-frequency AC supply, one in series with an inductor and the other in series with a capacitor. Predict what happens to each lamp as the frequency is raised, and explain.',
  model: 'The lamp with the **inductor** becomes **dimmer**, because $X_L = \\omega L$ rises with frequency. The lamp with the **capacitor** becomes **brighter**, because $X_C = 1/\\omega C$ falls with frequency. (At one frequency the two lamps are equally bright, when $X_L = X_C$.)',
  sol: 'X_L rises, X_C falls with frequency.',
  scheme: [['Inductor lamp dims (X_L ∝ f)', 1], ['Capacitor lamp brightens (X_C ∝ 1/f)', 1]],
  d: 3, c: 'application', t: [2],
}));
add('indderive-short', short({
  marks: 3,
  stem: 'A voltage $v = V_0\\sin\\omega t$ is applied across a pure inductor $L$. Derive the current, and show that it lags the voltage by π/2. Write the inductive reactance.',
  model: r`The induced emf balances the applied voltage: $L\dfrac{di}{dt} = V_0\sin\omega t$. Integrating, $i = -\dfrac{V_0}{\omega L}\cos\omega t = \dfrac{V_0}{\omega L}\sin\left(\omega t - \dfrac{\pi}{2}\right)$. So $i = I_0\sin(\omega t - \pi/2)$ with $I_0 = \dfrac{V_0}{\omega L}$: the current **lags** the voltage by π/2. The inductive reactance is $X_L = \omega L$.`,
  sol: 'Integrate L di/dt = v.',
  scheme: [['L di/dt = V₀ sin ωt', 1], ['i = (V₀/ωL) sin(ωt − π/2): lags by π/2', 1], ['X_L = ωL', 1]],
  d: 3, c: 'understanding', t: [2], wl: null,
}));

// ================================================================ t03 series LCR, impedance, resonance
add('reson-mcq', mcq({
  stem: 'Which statement about a series LCR circuit at resonance is correct?',
  right: 'The impedance equals R and the current is in phase with the voltage',
  wrong: ['The impedance is zero and the current is infinite', 'The current lags the voltage by 90°', 'The voltages across L and C are both zero'],
  sol: 'At resonance X_L = X_C, so they cancel: Z = R (minimum), I = V/R (maximum) and φ = 0 — option (@K).',
  d: 1, c: 'understanding', t: [3],
}));
const zn = Math.hypot(40, 60 - 30);
add('Z-num', num({
  stem: 'A series circuit has R = 40 Ω, X_L = 60 Ω and X_C = 30 Ω. Find its impedance, in ohms.',
  value: zn, tol: 0.2, unit: 'Ω',
  sol: r`$Z = \sqrt{R^2 + (X_L - X_C)^2} = \sqrt{40^2 + 30^2} = ${zn}$ Ω.`,
  scheme: [['Z = 50 Ω', 1]],
  d: 2, c: 'understanding', t: [3],
}), (q) => near(zn, q.answer.value) || 'Z');
const ic = 200 / Math.hypot(6, 12 - 4);
add('I-num', num({
  stem: 'A series circuit with R = 6.0 Ω, X_L = 12 Ω and X_C = 4.0 Ω is connected to a 200 V rms supply. Find the rms current, in amperes.',
  value: ic, tol: 0.2, unit: 'A',
  sol: r`$Z = \sqrt{6.0^2 + (12 - 4.0)^2} = \sqrt{36 + 64} = 10$ Ω; $I = \dfrac{200}{10} = ${dec(ic, 2)}$ A.`,
  scheme: [['Z = 10 Ω', 1], ['I = 20 A', 1]],
  marks: 2, d: 2, c: 'application', t: [3],
}), (q) => near(ic, q.answer.value) || 'I');
const f0n = 1 / (2 * Math.PI * Math.sqrt(0.5 * 8e-6));
add('f0-num', num({
  stem: 'Find the resonant frequency of a series circuit with L = 0.50 H and C = 8.0 μF, in hertz (3 significant figures).',
  value: Number(dec(f0n, 3)), tol: 0.5, unit: 'Hz',
  sol: r`$\omega_0 = \dfrac{1}{\sqrt{LC}} = \dfrac{1}{\sqrt{0.50 \times 8.0 \times 10^{-6}}} = 500$ rad s$^{-1}$; $f_0 = \dfrac{500}{2\pi} \approx ${dec(f0n, 3)}$ Hz.`,
  scheme: [['ω₀ = 500 rad s⁻¹', 0.5], ['f₀ ≈ 79.6 Hz', 0.5]],
  d: 2, c: 'understanding', t: [3],
}), (q) => near(f0n, q.answer.value) || 'f0');
const ct = 1 / (4 * Math.PI ** 2 * 1e12 * 10e-6);
add('tune-mcq', mcq({
  stem: 'A radio’s tuning circuit has a 10 μH coil. What capacitance tunes it to a station at 1.0 MHz?',
  right: 'about 2.5 nF',
  wrong: ['about 25 nF', 'about 0.25 nF', 'about 2.5 μF'],
  sol: r`$C = \dfrac{1}{4\pi^2 f^2 L} = \dfrac{1}{4\pi^2 \times (1.0 \times 10^{6})^2 \times 10 \times 10^{-6}} \approx ${sci(ct, 2)}$ F — option (@K).`,
  d: 3, c: 'application', t: [3],
}), () => near(ct, 2.53e-9, 0.01) || `ct ${ct}`);
add('phase45-mcq', mcq({
  stem: 'A coil of resistance 100 Ω and inductive reactance 100 Ω is connected to an AC supply. The current',
  right: 'lags the voltage by 45°',
  wrong: ['leads the voltage by 45°', 'lags the voltage by 90°', 'is in phase with the voltage'],
  sol: '$\\tan\\phi = X_L/R = 1$, so φ = 45°, and in an inductive circuit the voltage leads (current lags) — option (@K).',
  d: 2, c: 'application', t: [3],
}));
const vr = { R: 10, X: 100, V: 20 };
vr.I = vr.V / vr.R;
vr.VL = vr.I * vr.X;
add('VLexceeds-mcq', mcq({
  stem: 'A series LCR circuit with R = 10 Ω and X_L = X_C = 100 Ω at the supply frequency is connected to a 20 V rms supply. The rms voltage across the inductor is',
  right: '200 V',
  wrong: ['20 V', '2.0 V', '0 V'],
  sol: r`At resonance $I = V/R = 20/10 = 2$ A, so $V_L = IX_L = 2 \times 100 = 200$ V — ten times the supply voltage; $V_C$ is equal and opposite — option (@K).`,
  d: 4, c: 'analysis', t: [3],
}), () => near(vr.VL, 200) || 'VL');
add('below-mcq', mcq({
  stem: 'A series LCR circuit is driven at a frequency below its resonant frequency. The circuit behaves as',
  right: 'capacitive, with the current leading the voltage',
  wrong: ['inductive, with the current lagging the voltage', 'purely resistive', 'an open circuit'],
  sol: 'Below resonance ωL < 1/ωC, so X_C > X_L and the net reactance is capacitive: current leads — option (@K).',
  d: 3, c: 'analysis', t: [3],
}));
add('sharp-mcq', mcq({
  stem: 'To make a series LCR circuit select one frequency more sharply (a narrower resonance peak), one should',
  right: 'reduce the resistance',
  wrong: ['increase the resistance', 'increase the supply voltage', 'remove the capacitor'],
  sol: 'A smaller R gives a taller, narrower resonance peak — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('res-ar', ar({
  a: 'At resonance, the power factor of a series LCR circuit is 1.',
  r: 'At resonance, the current in a series LCR circuit is maximum.',
  key: 'b',
  sol: 'Both true, but R is not the reason. The power factor is 1 because Z = R (φ = 0); the large current is another consequence of the same condition — option (b).',
  d: 3, c: 'analysis', t: [3, 4],
}));
add('resonance-short', short({
  marks: 2,
  stem: 'Explain how a series LCR circuit in a radio selects one station from the many signals reaching the aerial.',
  model: 'All signals drive the circuit, but the current is large only at the **resonant frequency** $f_0 = 1/2\\pi\\sqrt{LC}$, where $X_L = X_C$ and Z = R is smallest. Turning the tuning knob changes **C** until $f_0$ equals the station’s frequency; signals at other frequencies meet a large impedance and give tiny currents. A small R makes the selection sharp.',
  sol: 'Resonance: large current only at f₀; vary C.',
  scheme: [['Current large only at resonance', 1], ['C adjusted so f₀ matches the station', 1]],
  d: 3, c: 'application', t: [3],
}));
const lc = { R: 8, L: 0.05, C: 100e-6, f: 50, V: 100 };
lc.XL = W(lc.f) * lc.L;
lc.XC = 1 / (W(lc.f) * lc.C);
lc.Z = Math.hypot(lc.R, lc.XL - lc.XC);
lc.I = lc.V / lc.Z;
lc.phi = (Math.atan2(lc.XL - lc.XC, lc.R) * 180) / Math.PI;
add('lcrcalc-short', short({
  marks: 3,
  stem: 'A series circuit has R = 8.0 Ω, L = 50 mH and C = 100 μF, connected to a 100 V rms, 50 Hz supply. Find the reactances, the impedance and the rms current, and state whether the current leads or lags.',
  model: r`$X_L = 2\pi \times 50 \times 0.050 \approx ${dec(lc.XL, 3)}$ Ω; $X_C = \dfrac{1}{2\pi \times 50 \times 100 \times 10^{-6}} \approx ${dec(lc.XC, 3)}$ Ω.
$Z = \sqrt{8.0^2 + (15.7 - 31.8)^2} \approx ${dec(lc.Z, 3)}$ Ω; $I = \dfrac{100}{18.0} \approx ${dec(lc.I, 3)}$ A.
Since $X_C > X_L$ the circuit is capacitive: the current **leads** the voltage (by about ${Math.round(-lc.phi)}°).`,
  sol: 'Reactances, then Z and I.',
  scheme: [['X_L ≈ 15.7 Ω, X_C ≈ 31.8 Ω', 1], ['Z ≈ 18.0 Ω, I ≈ 5.56 A', 1], ['Capacitive: current leads', 1]],
  d: 3, c: 'application', t: [2, 3], wl: null,
}), () => near(lc.Z, 18.0, 0.01) && lc.phi < 0 || `lc ${lc.Z}`);

// ================================================================ t04 power, power factor, wattless current
add('wattless-tf', tf({
  stem: 'A current that is exactly 90° out of phase with the voltage delivers no average power.',
  key: 't',
  sol: 'True. P = V_rms I_rms cos 90° = 0; such a current is called wattless.',
  d: 1, c: 'understanding', t: [4],
}));
const pw = 220 * 5 * 0.5;
add('power-num', num({
  stem: 'A circuit draws 5.0 A rms from a 220 V rms supply, with the current lagging the voltage by 60°. Find the average power, in watts.',
  value: pw, tol: 2, unit: 'W',
  sol: r`$P = VI\cos\phi = 220 \times 5.0 \times 0.5 = ${pw}$ W.`,
  scheme: [['P = VI cos φ = 550 W', 1]],
  d: 1, c: 'understanding', t: [4],
}), (q) => near(pw, q.answer.value) || 'P');
add('pf-num', num({
  stem: 'A series circuit has a resistance of 30 Ω and an impedance of 50 Ω. Find its power factor.',
  value: 0.6, tol: 0.01, unit: null,
  sol: r`$\cos\phi = \dfrac{R}{Z} = \dfrac{30}{50} = 0.6$.`,
  scheme: [['cos φ = R/Z = 0.60', 1]],
  d: 1, c: 'understanding', t: [4],
}), (q) => near(30 / 50, q.answer.value) || 'pf');
add('choke-mcq', mcq({
  stem: 'To limit the current in an AC lamp circuit, an inductor (choke) is preferred to a resistor because',
  right: 'it limits the current while wasting very little power as heat',
  wrong: ['it raises the power factor to exactly 1', 'it works equally well on DC', 'it increases the supply voltage'],
  sol: 'An ideal inductor has reactance but no resistance, so its average power is nearly zero; a resistor would waste I²R as heat — option (@K).',
  d: 3, c: 'application', t: [4],
}));
add('pfimprove-mcq', mcq({
  stem: 'A factory’s large induction motors give it a low (lagging) power factor. The usual way to improve it is to',
  right: 'connect capacitors across the supply to the motors',
  wrong: ['connect extra inductors in series with the motors', 'increase the resistance of the supply cables', 'run the motors on DC'],
  sol: 'Capacitors draw a leading current that cancels much of the motors’ lagging (wattless) current, bringing cos φ towards 1 — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('zeropower-mcq', mcq({
  stem: 'The average power consumed over a cycle by an ideal capacitor connected to an AC supply is',
  right: 'zero',
  wrong: ['V_rms I_rms', 'V_rms I_rms / 2', 'I_rms² X_C'],
  sol: 'The phase difference is 90°, so cos φ = 0; energy stored in one quarter cycle is returned in the next — option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('pf-ar', ar({
  a: 'A low power factor increases the energy wasted in transmission lines for the same power delivered.',
  r: 'For a given power, a smaller cos φ requires a larger current, and line losses are I²R.',
  key: 'a',
  sol: 'Both true; since P = VI cos φ, a smaller cos φ means a larger I for the same P, and so larger I²R losses — option (a).',
  d: 3, c: 'application', t: [4],
}));
add('choke-short', short({
  marks: 2,
  stem: 'Why is a choke coil (an inductor of very low resistance) used, instead of a resistor, to reduce the current in an AC circuit?',
  model: 'A choke limits the current through its **reactance** $X_L = \\omega L$. Because its resistance is very small, the phase difference is close to **90°**, so the power it consumes, $VI\\cos\\phi$, is nearly **zero**. A resistor would limit the current too, but would waste energy as **heat** ($I^2R$).',
  sol: 'Reactance without power loss.',
  scheme: [['Limits current by reactance X_L', 1], ['Power factor ≈ 0: negligible energy loss (vs I²R in a resistor)', 1]],
  d: 3, c: 'application', t: [4],
}));
const wl = { I: 10, phi: 60 };
add('wattless-short', short({
  marks: 3,
  stem: 'Explain what is meant by wattless current, using a phasor diagram. A circuit draws 10 A rms with the current lagging the voltage by 60°. Find the power (active) component and the wattless component of the current.',
  model: r`Resolve the current phasor into a component **along** the voltage, $I\cos\phi$, and one **perpendicular** to it, $I\sin\phi$. Only $I\cos\phi$ contributes to the average power $VI\cos\phi$; the perpendicular component carries no average power and is the **wattless current**.
Active component $= 10\cos 60^\circ = ${dec(wl.I * 0.5, 2)}$ A; wattless component $= 10\sin 60^\circ \approx ${dec(wl.I * Math.sin(Math.PI / 3), 3)}$ A.`,
  sol: 'Resolve I along and perpendicular to V.',
  scheme: [['Resolution of the current phasor', 1], ['Wattless component carries no power', 1], ['5.0 A and 8.66 A', 1]],
  d: 3, c: 'application', t: [4], wl: null,
}), () => near(10 * Math.sin(Math.PI / 3), 8.66) || 'wl');

// ================================================================ t05 generator and transformer
add('dcTrans-ar', ar({
  a: 'A transformer cannot be used to step up a steady DC voltage.',
  r: 'A steady current in the primary produces no change of flux, so no emf is induced in the secondary.',
  key: 'a',
  sol: 'Both true; a transformer works by mutual induction, which needs a changing flux, exactly as R says — option (a).',
  d: 2, c: 'understanding', t: [5],
}));
const gn = 200 * 0.4 * 0.01 * W(25);
add('gen-num', num({
  stem: 'A generator coil of 200 turns and area 0.010 m² rotates at 25 revolutions per second in a uniform field of 0.40 T. Find the peak emf, in volts (3 significant figures).',
  value: Number(dec(gn, 3)), tol: 1, unit: 'V',
  sol: r`$\omega = 2\pi \times 25 \approx 157$ rad s$^{-1}$. $\varepsilon_0 = NBA\omega = 200 \times 0.40 \times 0.010 \times 157 \approx ${dec(gn, 3)}$ V.`,
  scheme: [['ω = 2πf', 0.5], ['ε₀ = NBAω ≈ 126 V', 0.5]],
  d: 2, c: 'understanding', t: [5],
}), (q) => near(gn, q.answer.value) || 'gn');
add('genmax-mcq', mcq({
  stem: 'In an AC generator, the induced emf is largest at the instant when the plane of the rotating coil is',
  right: 'parallel to the magnetic field',
  wrong: ['perpendicular to the magnetic field', 'at 45° to the field', 'the emf is the same at all instants'],
  sol: 'ε = NBAω sin ωt is largest when the flux NBA cos ωt is zero and changing fastest, i.e. with the coil’s plane along B — option (@K).',
  d: 2, c: 'understanding', t: [5],
}));
add('gendouble-mcq', mcq({
  stem: 'The speed of rotation of an AC generator’s coil is doubled. The peak emf and the frequency of the output become',
  right: 'both doubled',
  wrong: ['doubled and unchanged', 'unchanged and doubled', 'four times and doubled'],
  sol: 'ε₀ = NBAω is proportional to ω, and the output frequency equals the rotation frequency — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('trans-num', num({
  stem: 'An ideal transformer has 100 turns on the primary and 2000 turns on the secondary. The primary is connected to 220 V AC. Find the secondary voltage, in volts.',
  value: 220 * 20, tol: 5, unit: 'V',
  sol: r`$V_s = V_p\dfrac{N_s}{N_p} = 220 \times \dfrac{2000}{100} = ${220 * 20}$ V (step-up).`,
  scheme: [['V_s = 4400 V', 1]],
  d: 1, c: 'understanding', t: [5],
}), (q) => near(4400, q.answer.value) || 'Vs');
add('transI-num', num({
  stem: 'An ideal step-down transformer changes 2200 V to 220 V. The secondary supplies 10 A to a load. Find the primary current, in amperes.',
  value: 1, tol: 0.02, unit: 'A',
  sol: r`Power in = power out: $I_p = I_s\dfrac{V_s}{V_p} = 10 \times \dfrac{220}{2200} = 1$ A.`,
  scheme: [['V_pI_p = V_sI_s', 0.5], ['I_p = 1.0 A', 0.5]],
  d: 2, c: 'application', t: [5],
}), (q) => near(1, q.answer.value) || 'Ip');
add('eff-mcq', mcq({
  stem: 'A transformer takes 1000 W from the mains and delivers 920 W to its load. Its efficiency is',
  right: '92%',
  wrong: ['8%', '100%', '109%'],
  sol: 'Efficiency = output/input = 920/1000 = 0.92 — option (@K). The other 80 W is lost as heat in the windings and core.',
  d: 2, c: 'application', t: [5],
}));
add('laminate-mcq', mcq({
  stem: 'The iron core of a transformer is made of thin insulated sheets (laminated) mainly to',
  right: 'reduce energy lost as heat by currents induced in the core',
  wrong: ['increase the turns ratio', 'make the core lighter so it can rotate', 'allow the transformer to work on DC'],
  sol: 'Laminations break the paths of currents induced in the core by the changing flux, reducing heating — option (@K).',
  d: 1, c: 'recall', t: [5],
}));
add('trans-short', short({
  marks: 2,
  stem: 'Why is electric power transmitted over long distances at very high voltages, using step-up and step-down transformers?',
  model: 'For a given power $P = VI$, a **higher voltage** means a **smaller current**. Line losses are $I^2R$, so they fall in proportion to $1/V^2$. Transformers step the voltage **up** at the power station for transmission and **down** near the consumer for safe use; they work efficiently only with AC.',
  sol: 'P = VI fixed; loss I²R.',
  scheme: [['Higher V, smaller I for same power', 1], ['Smaller I²R loss; transformers step up and down', 1]],
  d: 3, c: 'application', t: [5],
}));
add('trans3-short', short({
  marks: 3,
  stem: 'State three sources of energy loss in a real transformer and how each is reduced.',
  model: '(1) **Copper loss:** $I^2R$ heating in the windings — use thick copper wire. (2) **Core heating by induced currents** — use a laminated core of thin insulated sheets. (3) **Hysteresis loss** in repeatedly magnetising the core — use soft iron, which magnetises and demagnetises easily. (Also **flux leakage**, reduced by winding the coils one over the other.)',
  sol: 'Copper, core currents, hysteresis, leakage.',
  scheme: [['First loss with remedy', 1], ['Second loss with remedy', 1], ['Third loss with remedy', 1]],
  d: 2, c: 'understanding', t: [5], wl: null,
}));

// ================================================================ long answers (5 marks)
const cl = { C: 25e-6, f: 50, V: 220 };
cl.XC = 1 / (W(cl.f) * cl.C);
cl.I = cl.V / cl.XC;
add('cap-long', long({
  stem: '(a) A voltage $v = V_0\\sin\\omega t$ is applied across a capacitor $C$. Derive the current and show that it leads the voltage by π/2. (b) Show on a graph or phasor diagram how $v$ and $i$ vary, and explain why the average power is zero. (c) A 25 μF capacitor is connected to 220 V, 50 Hz mains. Find its reactance and the rms current.',
  model: r`(a) The charge is $q = Cv = CV_0\sin\omega t$, so $i = \dfrac{dq}{dt} = \omega CV_0\cos\omega t = \dfrac{V_0}{1/\omega C}\sin\left(\omega t + \dfrac{\pi}{2}\right)$. Thus $I_0 = V_0/X_C$ with $X_C = 1/\omega C$, and the current **leads** the voltage by π/2.

(b) On the phasor diagram the current phasor is 90° ahead (anticlockwise) of the voltage phasor; on a graph the current peaks a quarter cycle before the voltage. The power $vi \propto \sin\omega t\cos\omega t = \tfrac12\sin 2\omega t$ is positive for one quarter cycle (charging) and negative for the next (energy returned), so its average is **zero**.

(c) $X_C = \dfrac{1}{2\pi \times 50 \times 25 \times 10^{-6}} \approx ${dec(cl.XC, 3)}$ Ω; $I = \dfrac{220}{127} \approx ${dec(cl.I, 3)}$ A.`,
  sol: 'i = C dv/dt; average of sin 2ωt is zero.',
  scheme: [['i = C dv/dt and the phase lead π/2', 1], ['X_C = 1/ωC', 1], ['Phasor/graph and zero average power explained', 1], ['X_C ≈ 127 Ω', 1], ['I ≈ 1.73 A', 1]],
  d: 3, c: 'understanding', t: [2, 4], wl: null,
}), () => near(cl.XC, 127.3, 0.002) && near(cl.I, 1.728, 0.003) || `cl ${cl.I}`);
const ll = { R: 60, L: 0.4, C: 50e-6, V: 220, f: 50 };
ll.XL = W(ll.f) * ll.L;
ll.XC = 1 / (W(ll.f) * ll.C);
ll.Z = Math.hypot(ll.R, ll.XL - ll.XC);
ll.I = ll.V / ll.Z;
ll.phi = (Math.atan2(ll.XL - ll.XC, ll.R) * 180) / Math.PI;
ll.f0 = 1 / (2 * Math.PI * Math.sqrt(ll.L * ll.C));
add('lcr-long', long({
  stem: '(a) Draw (describe) the phasor diagram of a series LCR circuit and derive its impedance and phase angle. (b) A series circuit has R = 60 Ω, L = 0.40 H and C = 50 μF, connected to 220 V, 50 Hz. Find the impedance, the current and the phase angle. (c) Find the frequency at which the current would be largest, and that current.',
  model: r`(a) The current $I$ is common, so take it as reference. $V_R = IR$ is along $I$; $V_L = IX_L$ is 90° ahead; $V_C = IX_C$ is 90° behind. Adding: $V^2 = V_R^2 + (V_L - V_C)^2 = I^2[R^2 + (X_L - X_C)^2]$, so $Z = \sqrt{R^2 + (X_L - X_C)^2}$ and $\tan\phi = \dfrac{X_L - X_C}{R}$ (voltage leads by φ if positive).

(b) $X_L = 2\pi \times 50 \times 0.40 \approx ${dec(ll.XL, 3)}$ Ω; $X_C = \dfrac{1}{2\pi \times 50 \times 50 \times 10^{-6}} \approx ${dec(ll.XC, 3)}$ Ω. $Z = \sqrt{60^2 + (126 - 63.7)^2} \approx ${dec(ll.Z, 3)}$ Ω; $I = \dfrac{220}{${dec(ll.Z, 3)}} \approx ${dec(ll.I, 3)}$ A; $\tan\phi = \dfrac{62.0}{60}$, $\phi \approx ${dec(ll.phi, 3)}^\circ$ (voltage leads; inductive).

(c) Resonance: $f_0 = \dfrac{1}{2\pi\sqrt{LC}} = \dfrac{1}{2\pi\sqrt{0.40 \times 50 \times 10^{-6}}} \approx ${dec(ll.f0, 3)}$ Hz; then $Z = R$ and $I = \dfrac{220}{60} \approx ${dec(220 / 60, 3)}$ A.`,
  sol: 'Phasor sum with I as reference; then numbers; then resonance.',
  scheme: [['Phasor diagram and Z, tan φ derived', 1], ['Reactances 126 Ω and 63.7 Ω', 1], ['Z ≈ 86.3 Ω, I ≈ 2.55 A', 1], ['φ ≈ 45.9°, inductive', 1], ['f₀ ≈ 35.6 Hz, I = 3.67 A', 1]],
  d: 4, c: 'application', t: [3], wl: null,
}), () => near(ll.Z, 86.28, 0.001) && near(ll.f0, 35.6, 0.005) && near(ll.phi, 45.9, 0.01) || `ll ${ll.Z} ${ll.phi} ${ll.f0}`);
const pl = { V: 230, R: 40, X: 30 };
pl.Z = Math.hypot(pl.R, pl.X);
pl.I = pl.V / pl.Z;
pl.P = pl.I ** 2 * pl.R;
add('power-long', long({
  stem: '(a) Show that the average power in an AC circuit is $V_\\text{rms}I_\\text{rms}\\cos\\phi$. (b) Explain the terms power factor and wattless current, and why a low power factor is undesirable. (c) A coil of resistance 40 Ω and reactance 30 Ω is connected to a 230 V rms supply. Find the current, the power factor and the average power.',
  model: r`(a) With $v = V_0\sin\omega t$ and $i = I_0\sin(\omega t - \phi)$, the instantaneous power is $vi = V_0I_0\sin\omega t\sin(\omega t - \phi) = \tfrac12 V_0I_0[\cos\phi - \cos(2\omega t - \phi)]$. The second term averages to zero over a cycle, so $\bar P = \tfrac12 V_0I_0\cos\phi = V_\text{rms}I_\text{rms}\cos\phi$.

(b) **Power factor** is $\cos\phi$. **Wattless current** is the component $I\sin\phi$ perpendicular to the voltage, which carries no average power. A low power factor means a large current for the power delivered, so larger $I^2R$ losses in cables and generators.

(c) $Z = \sqrt{40^2 + 30^2} = 50$ Ω; $I = \dfrac{230}{50} = ${dec(pl.I, 2)}$ A; $\cos\phi = \dfrac{40}{50} = 0.8$; $P = I^2R = 4.6^2 \times 40 \approx ${dec(pl.P, 3)}$ W (also $230 \times 4.6 \times 0.8 \approx 846$ W).`,
  sol: 'Average the product of v and i; then Z, I, cos φ, P.',
  scheme: [['Product-to-sum and averaging', 1], ['P = V_rms I_rms cos φ', 1], ['Power factor and wattless current explained', 1], ['I = 4.6 A, cos φ = 0.80', 1], ['P ≈ 846 W', 1]],
  d: 3, c: 'understanding', t: [4], wl: null,
}), () => near(pl.P, 846.4, 0.002) || `pl ${pl.P}`);
const gl = { N: 500, A: 0.03, B: 0.2, rpm: 3000 };
gl.w = (2 * Math.PI * gl.rpm) / 60;
gl.e0 = gl.N * gl.B * gl.A * gl.w;
add('gen-long', long({
  stem: '(a) Explain the principle and working of an AC generator. (b) Derive the expression for the emf induced in its rotating coil. (c) A coil of 500 turns, each of area 0.030 m², rotates at 3000 revolutions per minute in a field of 0.20 T. Find the peak and rms emf and the frequency of the output.',
  model: r`(a) **Principle:** electromagnetic induction — a coil rotating in a magnetic field has a continuously changing flux, so an alternating emf is induced. **Working:** an armature coil is turned (by a turbine) between the poles of a magnet; its ends are connected to **slip rings**, which turn with it and press against fixed carbon **brushes** that lead the current to the external circuit.

(b) If the normal to the coil makes angle $\theta = \omega t$ with $\vec B$, the flux linkage is $N\Phi = NBA\cos\omega t$. So $\varepsilon = -\dfrac{d(N\Phi)}{dt} = NBA\omega\sin\omega t = \varepsilon_0\sin\omega t$, with $\varepsilon_0 = NBA\omega$.

(c) $\omega = \dfrac{2\pi \times 3000}{60} \approx 314$ rad s$^{-1}$; $\varepsilon_0 = 500 \times 0.20 \times 0.030 \times 314 \approx ${dec(gl.e0, 3)}$ V; $\varepsilon_\text{rms} \approx ${dec(gl.e0 / Math.SQRT2, 3)}$ V; frequency 50 Hz.`,
  sol: 'Flux NBA cos ωt; differentiate.',
  scheme: [['Principle and slip rings/brushes', 1], ['Flux linkage NBA cos ωt', 1], ['ε = NBAω sin ωt', 1], ['ε₀ ≈ 942 V, rms ≈ 666 V', 1], ['f = 50 Hz', 1]],
  d: 3, c: 'understanding', t: [5], wl: null,
}), () => near(gl.e0, 942.5, 0.002) || `gl ${gl.e0}`);
const tl = { Vp: 11000, Vs: 220, P: 33000, eta: 0.9 };
tl.ratio = tl.Vp / tl.Vs;
tl.Is = tl.P / tl.Vs;
tl.Pin = tl.P / tl.eta;
tl.Ip = tl.Pin / tl.Vp;
add('transformer-long', long({
  stem: '(a) Explain the principle and working of a transformer and derive $V_s/V_p = N_s/N_p$ for an ideal transformer. (b) A transformer steps 11 000 V down to 220 V and delivers 33 kW to houses. Find the turns ratio and the secondary current. (c) If its efficiency is 90%, find the input power and the primary current.',
  model: r`(a) **Principle:** mutual induction. An alternating current in the primary produces an alternating flux $\Phi$ in the soft-iron core, which links every turn of both coils. The emfs are $\varepsilon_p = -N_p\dfrac{d\Phi}{dt}$ and $\varepsilon_s = -N_s\dfrac{d\Phi}{dt}$. For an ideal transformer (no resistance, no flux leakage) $V_p = \varepsilon_p$ and $V_s = \varepsilon_s$, so $\dfrac{V_s}{V_p} = \dfrac{N_s}{N_p}$; with no losses $V_pI_p = V_sI_s$.

(b) $\dfrac{N_p}{N_s} = \dfrac{11\,000}{220} = ${tl.ratio}$, i.e. 50 : 1. $I_s = \dfrac{33\,000}{220} = ${tl.Is}$ A.

(c) Input power $= \dfrac{33\,000}{0.90} \approx ${dec(tl.Pin, 3)}$ W; $I_p = \dfrac{36\,700}{11\,000} \approx ${dec(tl.Ip, 3)}$ A.`,
  sol: 'Same dΦ/dt per turn in both coils; then ratios and efficiency.',
  scheme: [['Principle: mutual induction, common flux', 1], ['Derivation of V_s/V_p = N_s/N_p', 1], ['Turns ratio 50 : 1', 1], ['I_s = 150 A', 1], ['Input ≈ 36.7 kW, I_p ≈ 3.33 A', 1]],
  d: 3, c: 'application', t: [5], wl: null,
}), () => near(tl.Is, 150) && near(tl.Ip, 3.333, 0.002) || 'tl');

// ================================================================ case-based (4 marks: 1 + 1 + 2)
const rd = { L: 0.5e-3 };
rd.f = (C) => 1 / (2 * Math.PI * Math.sqrt(rd.L * C));
add('radio-case', mk.case({
  passage: `An old valve radio in a family home in Thrissur has a tuning circuit made of a 0.50 mH coil in series with a variable capacitor. Turning the tuning knob changes the capacitance between 50 pF and 500 pF. The circuit picks out the station whose frequency equals its resonant frequency.`,
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'The tuning circuit selects a station by',
      right: 'resonance: the current is largest when the circuit’s resonant frequency equals the station’s frequency',
      wrong: ['blocking all frequencies except DC', 'amplifying every frequency equally', 'changing the frequency of the incoming signal'],
      sol: 'At resonance the impedance is smallest and the current largest; other stations give tiny currents — option (@K).',
      d: 2, c: 'understanding', t: [3],
    })),
    part('b', num({
      stem: 'Find the frequency the radio receives when the capacitance is set to 200 pF, in kilohertz (3 significant figures).',
      value: Number(dec(rd.f(200e-12) / 1e3, 3)), tol: 2, unit: 'kHz',
      sol: r`$f_0 = \dfrac{1}{2\pi\sqrt{LC}} = \dfrac{1}{2\pi\sqrt{0.50 \times 10^{-3} \times 200 \times 10^{-12}}} \approx ${sci(rd.f(200e-12), 3)}$ Hz. In kHz: $${sci(rd.f(200e-12), 3)}/10^{3} = ${dec(rd.f(200e-12) / 1e3, 3)}$.`,
      scheme: [['f₀ ≈ 503 kHz', 1]],
      d: 3, c: 'application', t: [3],
    })),
    part('c', short({
      marks: 2,
      stem: 'Find the range of frequencies the radio can tune, and say which end of the capacitor range gives the higher frequency.',
      model: r`With 500 pF: $f_0 \approx ${dec(rd.f(500e-12) / 1e3, 3)}$ kHz; with 50 pF: $f_0 \approx ${dec(rd.f(50e-12) / 1e3, 3)}$ kHz. So it covers about 318 kHz to 1010 kHz. Since $f_0 \propto 1/\sqrt{C}$, the **smallest capacitance** gives the **highest** frequency.`,
      sol: 'f₀ ∝ 1/√C.',
      scheme: [['Range ≈ 318 kHz to 1010 kHz', 1], ['Smallest C gives highest f', 1]],
      d: 3, c: 'application', t: [3], wl: null,
    }), [
      short({
        marks: 2,
        stem: 'The coil’s resistance increases as it ages, and listeners hear two neighbouring stations at once. Explain.',
        model: 'A larger resistance makes the resonance peak **lower and broader**: the circuit no longer picks out one frequency sharply. A neighbouring station slightly off resonance then also produces a noticeable current, so the two are heard together (poor **selectivity**).',
        sol: 'Larger R broadens the resonance.',
        scheme: [['Larger R: broad, low peak', 1], ['Neighbouring frequency also passes: poor selectivity', 1]],
        d: 3, c: 'analysis', t: [3],
      }),
    ]),
  ],
}), (q) => near(rd.f(200e-12), 503292, 0.002) && near(q.children[1].answer.value, 503) || 'radio');

const fc = { V: 220, I: 10, pf: 0.5 };
fc.P = fc.V * fc.I * fc.pf;
add('factory-case', mk.case({
  passage: 'A small workshop in Ludhiana runs an induction motor from 220 V rms mains. An electrician measures a current of 10 A, and the meter shows a power factor of 0.50 (lagging). The electricity board charges extra when a customer’s power factor is low, and suggests fitting a capacitor bank.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'A lagging power factor of 0.50 means that the current',
      right: 'lags the voltage by 60°',
      wrong: ['leads the voltage by 60°', 'lags the voltage by 30°', 'is in phase with the voltage'],
      sol: 'cos φ = 0.5 gives φ = 60°; lagging means the current is behind the voltage (inductive load) — option (@K).',
      d: 2, c: 'understanding', t: [4],
    })),
    part('b', num({
      stem: 'Find the average power taken by the motor, in watts.',
      value: fc.P, tol: 5, unit: 'W',
      sol: r`$P = VI\cos\phi = 220 \times 10 \times 0.50 = ${fc.P}$ W.`,
      scheme: [['P = 1100 W', 1]],
      d: 2, c: 'application', t: [4],
    })),
    part('c', short({
      marks: 2,
      stem: 'If the capacitor bank raised the power factor to 1, what current would be needed for the same power? Why does the board prefer this?',
      model: r`With cos φ = 1, $I = \dfrac{P}{V} = \dfrac{1100}{220} = 5.0$ A — **half** the current. The board’s cables and transformers then carry less current for the same power, so the $I^2R$ losses in them fall to about **one quarter**.`,
      sol: 'Same P, cos φ = 1.',
      scheme: [['I = 5.0 A', 1], ['Smaller current, losses about one quarter', 1]],
      d: 3, c: 'application', t: [4], wl: null,
    }), [
      short({
        marks: 2,
        stem: 'The workshop owner argues that the capacitor bank is useless because the motor still uses the same 1100 W. Evaluate this argument.',
        model: 'He is right that the **real power** used by the motor is unchanged, but wrong that the capacitors are useless. They supply the motor’s **wattless (reactive) current** locally, so the current drawn from the mains falls from 10 A to about 5 A. This cuts losses in the wiring and the board’s **low-power-factor charges**.',
        sol: 'Real power same; current and losses smaller.',
        scheme: [['Real power unchanged (owner partly right)', 1], ['Current and line losses reduced, so not useless', 1]],
        d: 4, c: 'evaluation', t: [4],
      }),
    ]),
  ],
}), (q) => near(q.children[1].answer.value, 1100) || 'factory');

const ss = { Vp: 11000, Vs: 440, P: 44000 };
ss.ratio = ss.Vp / ss.Vs;
ss.Is = ss.P / ss.Vs;
ss.Ip = ss.P / ss.Vp;
add('substation-case', mk.case({
  passage: 'A distribution transformer on a pole in a Bhopal neighbourhood takes 11 kV from the overhead line and supplies 440 V (between lines) to the houses nearby. On a summer evening it delivers 44 kW. Assume it is ideal.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'The ratio of the number of turns of its primary to its secondary is',
      right: '25 : 1',
      wrong: ['1 : 25', '440 : 11', '5 : 1'],
      sol: 'N_p/N_s = V_p/V_s = 11 000/440 = 25 — option (@K).',
      d: 2, c: 'understanding', t: [5],
    })),
    part('b', num({
      stem: 'Find the current in the secondary, in amperes.',
      value: ss.Is, tol: 1, unit: 'A',
      sol: r`$I_s = \dfrac{P}{V_s} = \dfrac{44\,000}{440} = ${ss.Is}$ A.`,
      scheme: [['I_s = 100 A', 1]],
      d: 2, c: 'application', t: [5],
    })),
    part('c', short({
      marks: 2,
      stem: 'Find the current in the 11 kV primary line and explain why the power is carried at 11 kV rather than at 440 V.',
      model: r`$I_p = \dfrac{44\,000}{11\,000} = ${ss.Ip}$ A, only one twenty-fifth of the secondary current. Carrying the power at **high voltage** means a **small current**, so the $I^2R$ loss in the long overhead line is **625 times** smaller than it would be at 440 V.`,
      sol: 'I_p = P/V_p; losses ∝ I².',
      scheme: [['I_p = 4.0 A', 1], ['Small current, much smaller I²R loss', 1]],
      d: 3, c: 'application', t: [5], wl: null,
    }), [
      short({
        marks: 2,
        stem: 'A resident suggests running the street’s supply from a large DC battery bank through the same transformer. Evaluate the suggestion.',
        model: 'It would **not work**. A transformer needs a **changing** flux, which needs an alternating current in the primary. A steady DC current produces a constant flux, so **no emf** is induced in the secondary (and the primary, with only its small resistance limiting the current, could overheat).',
        sol: 'Transformers need AC.',
        scheme: [['DC gives constant flux, no induced emf', 1], ['Suggestion unworkable (primary may overheat)', 1]],
        d: 3, c: 'evaluation', t: [5],
      }),
    ]),
  ],
}), (q) => near(ss.Is, 100) && near(ss.Ip, 4) && near(q.children[1].answer.value, 100) || 'ss');

const fr = { C: 2.25e-6 };
fr.XC = 1 / (W(50) * fr.C);
add('regulator-case', mk.case({
  passage: 'Older ceiling-fan regulators in Indian homes used a resistor in series with the fan to reduce its speed; they got warm and wasted energy. Modern “electronic” step regulators often use a capacitor in series with the fan instead. On one speed setting, a 2.25 μF capacitor is used on 220 V, 50 Hz mains.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'Why does the capacitor regulator waste almost no energy?',
      right: 'An ideal capacitor takes no average power, because its current is 90° out of phase with its voltage',
      wrong: ['A capacitor has zero reactance at 50 Hz', 'The capacitor stores all the energy permanently', 'A capacitor raises the mains voltage'],
      sol: 'For a pure capacitor cos φ = 0: energy stored in one quarter cycle is returned in the next — option (@K).',
      d: 2, c: 'understanding', t: [4],
    })),
    part('b', num({
      stem: 'Find the reactance of the 2.25 μF capacitor at 50 Hz, in ohms (3 significant figures).',
      value: Number(dec(fr.XC, 3)), tol: 3, unit: 'Ω',
      sol: r`$X_C = \dfrac{1}{2\pi \times 50 \times 2.25 \times 10^{-6}} \approx ${dec(fr.XC, 3)}$ Ω.`,
      scheme: [['X_C ≈ 1410 Ω', 1]],
      d: 2, c: 'understanding', t: [2],
    })),
    part('c', short({
      marks: 2,
      stem: 'Which would give a LOWER fan speed: a larger or a smaller capacitor in series? Explain.',
      model: 'A **smaller** capacitor. Its reactance $X_C = 1/\\omega C$ is **larger**, so it limits the current through the fan more and the fan runs **slower**. A larger capacitor has a smaller reactance and lets the fan run faster.',
      sol: 'X_C ∝ 1/C.',
      scheme: [['Smaller C: larger X_C', 1], ['Less current, lower speed', 1]],
      d: 3, c: 'application', t: [2],
    }), [
      short({
        marks: 2,
        stem: 'Explain why the old resistor regulator became warm while the capacitor regulator stays cool.',
        model: 'The resistor’s current is **in phase** with its voltage, so it dissipates $I^2R$ continuously as **heat**. In the capacitor the current is **90° out of phase**, so the average power is **zero**: it stores and returns energy each cycle and does not heat up (apart from small losses).',
        sol: 'Compare cos φ = 1 and cos φ = 0.',
        scheme: [['Resistor: I²R heat (in phase)', 1], ['Capacitor: zero average power (90°)', 1]],
        d: 3, c: 'application', t: [4],
      }),
    ]),
  ],
}), (q) => near(fr.XC, 1414.7, 0.002) && near(q.children[1].answer.value, 1410, 0.01) || `fr ${fr.XC}`);

await import('./questions-extra.mjs');
