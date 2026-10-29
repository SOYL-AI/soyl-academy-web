// ch07 Alternating Current — two decks: Part 1 (t01–t02) peak and rms values, AC through R, L and C, reactance and
// phasors; Part 2 (t03–t05) series LCR, resonance, power and power factor, the AC generator and the transformer.
// LC oscillations are deleted from the 2026-27 syllabus and not used. Worked-example numbers are computed here.
import { sl, deck, table, flow, svgV, plot, r, sci, dec } from '../../cbse-12-physics-ch01/src/lib.mjs';
import * as G from './svgs.mjs';

const W50 = 2 * Math.PI * 50;
// ---------------------------------------------------------------- worked-example numbers
const ex1 = { Vp: 220 * Math.SQRT2, Irms: 1000 / 220, Ip: (1000 / 220) * Math.SQRT2 };
const ex2 = { XL: W50 * 0.5, XC: 1 / (W50 * 20e-6) };
ex2.IL = 220 / ex2.XL;
ex2.IC = 220 / ex2.XC;
const ex3 = G.LCR_DATA;
const ex4 = (() => {
  const L = 0.1;
  const C = 10e-6;
  const w0 = 1 / Math.sqrt(L * C);
  return { w0, f0: w0 / (2 * Math.PI) };
})();
const ex5 = { P: 220 * ex3.I * (ex3.R / ex3.Z), PR: ex3.I ** 2 * ex3.R, cos: ex3.R / ex3.Z };
const ex6 = { e0: 100 * 0.5 * 0.02 * W50 };
const ex7 = { Vs: 220 / 20, Is: 2.0, Ip: 2.0 / 20 };
export const EX = { ex1, ex2, ex3, ex4, ex5, ex6, ex7 };

export const V = {
  ph3: svgV(G.PHASORS3, 'Phasor diagrams for a resistor, an inductor and a capacitor'),
  lcr: svgV(G.LCR_PHASOR, 'Phasor diagram of a series LCR circuit with the voltage leading the current', 'Drawn to scale from the worked example; angle checked against atan((XL − XC)/R).'),
  tri: svgV(G.IMP_TRIANGLE, 'Impedance triangle with R, XL − XC and Z'),
  gen: svgV(G.GENERATOR, 'AC generator: coil rotating between magnet poles with slip rings and brushes'),
  tr: svgV(G.TRANSFORMER, 'Transformer with primary and secondary coils on a soft-iron core'),
};
export const sinePlot = plot(
  {
    x: { min: 0, max: 12.6, label: 'ωt (rad)' },
    y: { min: -1.6, max: 1.6, label: 'v / V₀' },
    functions: [{ expr: 'sin(x)', label: 'v = V₀ sin ωt' }],
    hlines: [{ y: 0.707, label: 'rms level V₀/√2', dashed: true }],
  },
  'Sinusoidal alternating voltage between plus and minus its peak value, with the rms level at 0.707 of the peak marked',
  'The rms value is 0.707 of the peak for a sinusoidal supply.',
);
export const lagPlot = plot(
  {
    x: { min: 0, max: 12.6, label: 'ωt (rad)' },
    y: { min: -1.4, max: 1.4, label: 'relative value' },
    functions: [
      { expr: 'sin(x)', label: 'voltage across L' },
      { expr: 'sin(x - pi/2)', label: 'current in L (lags by π/2)' },
    ],
  },
  'Voltage and current for a pure inductor: the current reaches each peak a quarter cycle after the voltage',
);
export const resPlot = plot(
  {
    x: { min: 0.3, max: 3, label: 'ω / ω₀' },
    y: { min: 0, max: 5.5, label: 'current (relative)' },
    functions: [
      { expr: '1/sqrt(0.04 + (x - 1/x)^2)', label: 'small R: sharp peak' },
      { expr: '1/sqrt(0.25 + (x - 1/x)^2)', label: 'larger R: broad, lower peak' },
    ],
    vlines: [{ x: 1, label: 'resonance ω = ω₀', dashed: true }],
  },
  'Current against angular frequency for a series LCR circuit: a peak at the resonant frequency, sharp and tall when the resistance is small, broad and low when it is larger',
  'Peak height V/R; sharpness increases as R decreases.',
);

export const deck1 = deck({
  part: 1,
  title: 'Alternating Current — Part 1: rms values, reactance and phasors',
  goals: [
    'Relate the peak and rms values of an alternating current and voltage',
    'Describe the phase relations for AC through a resistor, an inductor and a capacitor using phasors',
    'Calculate inductive and capacitive reactance',
  ],
  slides: [
    sl('title', 'Alternating Current', {
      b: 'Part 1 — voltages and currents that reverse direction many times a second, and how resistors, coils and capacitors respond to them.',
      v: flow('LR', [['a', 'AC supply'], ['r', 'Peak and rms'], ['R', 'Resistor'], ['L', 'Inductor'], ['C', 'Capacitor'], ['p', 'Phasors']], [['a', 'r'], ['r', 'R'], ['R', 'L'], ['L', 'C'], ['C', 'p']], 'Flow of the part: AC supply, peak and rms values, resistor, inductor, capacitor, phasors'),
      n: 'The socket in your home gives alternating current, which reverses fifty times each way every second. AC is used because its voltage is easy to change with transformers. In this part we see how to describe an alternating voltage with peak and rms values, and how a resistor, an inductor and a capacitor each respond to it, using rotating arrows called phasors.',
    }),
    sl('diagram', 'Alternating voltage and current', {
      b: r`A sinusoidal supply gives $v = V_0\sin\omega t$ with $\omega = 2\pi f$. In India $f = 50$ Hz, so $\omega \approx 314$ rad s$^{-1}$. The current in a resistor $R$ is $i = \dfrac{V_0}{R}\sin\omega t = I_0\sin\omega t$.`,
      ul: ['The average of $\\sin\\omega t$ over a cycle is zero, so the average current is zero.', 'The average of $\\sin^2\\omega t$ is 1/2, so the average power is not zero.'],
      v: sinePlot,
      n: 'An alternating voltage swings smoothly between a positive and a negative peak. For Indian mains the frequency is fifty hertz, so omega is about three hundred and fourteen radians per second. Over a full cycle the current averages to zero, because it flows equally in both directions. But the heating does not cancel: the average of sine squared is one half, so power is delivered all the time.',
    }),
    sl('concept', 'Peak and rms values', {
      b: r`The **rms (root-mean-square)** value is the steady (DC) value that would give the same average heating in a resistor:
$$\bar P = I_\text{rms}^2 R = \dfrac{I_0^2 R}{2}\ \Rightarrow\ I_\text{rms} = \dfrac{I_0}{\sqrt2} \approx 0.707I_0,\qquad V_\text{rms} = \dfrac{V_0}{\sqrt2}$$`,
      ul: ['Mains voltage “220 V” is an rms value; the peak is about 311 V.', 'Ammeters and voltmeters for AC read rms values.'],
      v: sinePlot,
      n: 'Because AC keeps changing, we quote an effective value. The rms value is the steady current that would heat a resistor at the same average rate. Average power is I nought squared R over two, so the rms current is the peak divided by root two, about seventy one percent of the peak. The two hundred and twenty volts of Indian mains is an rms value; the voltage actually peaks at about three hundred and eleven volts.',
    }),
    sl('example', 'Worked example 1: a heater on the mains', {
      b: r`A 1000 W heater runs on 220 V (rms), 50 Hz mains. Find the peak voltage, the rms current and the peak current.`,
      ul: [
        r`Step 1 — $V_0 = \sqrt2 \times 220 \approx ${dec(ex1.Vp, 3)}$ V.`,
        r`Step 2 — $I_\text{rms} = \dfrac{P}{V_\text{rms}} = \dfrac{1000}{220} \approx ${dec(ex1.Irms, 3)}$ A.`,
        r`Step 3 — $I_0 = \sqrt2 \times 4.55 \approx ${dec(ex1.Ip, 3)}$ A.`,
      ],
      v: table(['Quantity', 'rms', 'Peak'], [['Voltage', '220 V', `${dec(ex1.Vp, 3)} V`], ['Current', `${dec(ex1.Irms, 3)} A`, `${dec(ex1.Ip, 3)} A`]], 'Worked table: 220 volts rms and 311 volts peak; 4.55 amperes rms and 6.43 amperes peak'),
      n: 'Multiply the rms voltage by root two to get the peak, about three hundred and eleven volts. The power rating uses rms values, so the rms current is one thousand watts divided by two hundred and twenty volts, about four and a half amperes. The current peaks at about six point four amperes. Fuses and wiring must cope with these peaks.',
    }),
    sl('diagram', 'Phasors', {
      b: 'A **phasor** is an arrow rotating anticlockwise at angular speed ω; its projection on the vertical axis gives the instantaneous value. The angle between two phasors is their **phase difference**.',
      v: V.ph3,
      n: 'Phasors make phase relations easy to see. Picture each sinusoidal quantity as an arrow of length equal to its peak, spinning anticlockwise at omega. The vertical projection is the instantaneous value. Arrows that point the same way are in phase; an arrow ahead in the anticlockwise sense leads, and one behind lags. The diagram shows the three basic cases.',
    }),
    sl('concept', 'AC through a pure inductor', {
      b: r`For $v = V_0\sin\omega t$ across an inductor $L$: $L\dfrac{di}{dt} = v$ gives $i = I_0\sin\left(\omega t - \dfrac{\pi}{2}\right)$, with
$$I_0 = \dfrac{V_0}{X_L},\qquad X_L = \omega L = 2\pi fL$$
The current **lags** the voltage by $\pi/2$. $X_L$ (ohm) is the **inductive reactance**.`,
      ul: ['$X_L$ grows with frequency: an inductor blocks high frequencies and passes DC freely.', 'Average power over a cycle is zero.'],
      v: lagPlot,
      n: 'For a pure inductor, the voltage equals L times the rate of change of current. Solving, the current is a sine wave lagging the voltage by a quarter cycle: it peaks a quarter period later. The peak current is the peak voltage divided by omega L, the inductive reactance, measured in ohms. The higher the frequency, the larger the reactance, so a coil lets steady current through but chokes rapid changes.',
    }),
    sl('concept', 'AC through a pure capacitor', {
      b: r`For $v = V_0\sin\omega t$ across a capacitor $C$: $i = \dfrac{dq}{dt} = C\dfrac{dv}{dt}$ gives $i = I_0\sin\left(\omega t + \dfrac{\pi}{2}\right)$, with
$$I_0 = \dfrac{V_0}{X_C},\qquad X_C = \dfrac{1}{\omega C} = \dfrac{1}{2\pi fC}$$
The current **leads** the voltage by $\pi/2$. $X_C$ is the **capacitive reactance**.`,
      ul: ['$X_C$ falls with frequency: a capacitor blocks DC and passes high frequencies.', 'Average power over a cycle is zero.'],
      v: V.ph3,
      n: 'A capacitor charges and discharges as the voltage alternates. The current is C times the rate of change of voltage, which makes it lead the voltage by a quarter cycle: the current is largest when the voltage is passing through zero. The peak current is the peak voltage divided by the capacitive reactance, one over omega C. At high frequency the reactance is small, so a capacitor passes rapid changes but blocks steady DC completely.',
    }),
    sl('example', 'Worked example 2: reactances on the mains', {
      b: r`Find the reactance and the rms current when (a) a 0.50 H inductor, (b) a 20 μF capacitor is connected to 220 V, 50 Hz mains (resistance negligible).`,
      ul: [
        r`(a) $X_L = 2\pi fL = 2\pi \times 50 \times 0.50 \approx ${dec(ex2.XL, 3)}$ Ω; $I = \dfrac{220}{157} \approx ${dec(ex2.IL, 3)}$ A, lagging by 90°.`,
        r`(b) $X_C = \dfrac{1}{2\pi fC} = \dfrac{1}{2\pi \times 50 \times 20 \times 10^{-6}} \approx ${dec(ex2.XC, 3)}$ Ω; $I = \dfrac{220}{159} \approx ${dec(ex2.IC, 3)}$ A, leading by 90°.`,
        'Check — doubling f would double $X_L$ but halve $X_C$.',
      ],
      v: table(['Element', 'Reactance', 'rms current', 'Phase of I'], [['0.50 H', `${dec(ex2.XL, 3)} Ω`, `${dec(ex2.IL, 3)} A`, 'lags 90°'], ['20 μF', `${dec(ex2.XC, 3)} Ω`, `${dec(ex2.IC, 3)} A`, 'leads 90°']], 'Worked table: 157 ohms and 1.40 amperes lagging for the inductor; 159 ohms and 1.38 amperes leading for the capacitor'),
      n: 'At fifty hertz, omega is about three hundred and fourteen. The inductor’s reactance is omega L, about one hundred and fifty seven ohms, so about one point four amperes flows, lagging the voltage. The capacitor’s reactance is one over omega C, about one hundred and fifty nine ohms, so a similar current flows but leading the voltage. Doubling the frequency would double one reactance and halve the other.',
    }),
    sl('check', 'Quick check: frequency and reactance', {
      b: 'Choose how the reactance changes.',
      v: null,
      chk: 'freqX-mcq',
      n: 'Inductive reactance is omega L and capacitive reactance is one over omega C. See how each depends on frequency.',
    }),
    sl('two-column', 'Comparing R, L and C in AC', {
      b: 'Summary of the three basic elements:',
      cols: [
        '**Resistor**\n- Opposition: R (any f)\n- I in phase with V\n- Average power $I_\\text{rms}^2R$\n\n**Inductor**\n- Opposition: $X_L = \\omega L$\n- I lags V by 90°\n- Average power 0',
        '**Capacitor**\n- Opposition: $X_C = 1/\\omega C$\n- I leads V by 90°\n- Average power 0\n\n**DC (f = 0)**\n- Inductor: $X_L = 0$ (short)\n- Capacitor: $X_C = \\infty$ (open)',
      ],
      v: V.ph3,
      n: 'Here are the three elements side by side. A resistor opposes current equally at all frequencies, keeps current in phase, and absorbs power. An inductor’s opposition grows with frequency and its current lags; a capacitor’s opposition falls with frequency and its current leads. Neither of these two absorbs any average power. For steady DC, an ideal inductor is a plain wire and a capacitor is a gap.',
    }),
    sl('check', 'Quick check: phase in a capacitor', {
      b: 'Judge the assertion and the reason.',
      v: V.ph3,
      chk: 'capPhase-ar',
      n: 'Think about when a capacitor’s charging current is largest during a cycle of the voltage.',
    }),
    sl('example', 'Worked example 3: identifying a component', {
      b: 'A sealed box connected to a 50 Hz supply draws a current that leads the voltage by 90°. When the frequency is doubled, keeping the voltage the same, the current doubles. What is in the box?',
      ul: [
        'Step 1 — current leading by 90° means a **pure capacitor** (no resistance).',
        'Step 2 — check: $I = V/X_C = V\\omega C$ is proportional to frequency, so doubling f doubles I. ✓',
        'An inductor would have given a lagging current that halves when f doubles.',
      ],
      v: V.ph3,
      n: 'Use the phase first. A current leading the voltage by exactly ninety degrees can only come from a pure capacitor. Then check with the frequency: for a capacitor the current is V omega C, which is proportional to frequency, so doubling the frequency doubles the current, exactly as observed. An inductor would show the opposite on both counts.',
    }),
    sl('check', 'Quick check: rms value', {
      b: 'Find the rms value.',
      v: sinePlot,
      chk: 'rms-num',
      n: 'For a sinusoidal quantity, divide the peak value by root two.',
    }),
    sl('summary', 'Summary — Part 1', {
      b: 'Key results:',
      v: table(
        ['Idea', 'Result'],
        [
          ['rms values', '$I_\\text{rms} = I_0/\\sqrt2$, $V_\\text{rms} = V_0/\\sqrt2$'],
          ['Resistor', 'I in phase; $V_0 = I_0R$'],
          ['Inductor', '$X_L = \\omega L$; I lags by π/2'],
          ['Capacitor', '$X_C = 1/\\omega C$; I leads by π/2'],
          ['Power in pure L or C', 'Average zero'],
        ],
        'Summary table of rms values and the behaviour of resistors, inductors and capacitors in AC',
      ),
      n: 'To sum up: the rms value of a sinusoidal current or voltage is the peak divided by root two, and it is the value meters read and appliances are rated in. In a resistor the current is in phase with the voltage. In an inductor it lags by a quarter cycle and the reactance is omega L. In a capacitor it leads by a quarter cycle and the reactance is one over omega C. Pure L and C take no average power.',
    }),
    sl('exam-tips', 'Exam tips — Part 1', {
      ul: [
        'Mains values are rms: 220 V rms means about 311 V peak.',
        'Remember **CIVIL**: in a C, I leads V; in an L, V leads I.',
        'Use $\\omega = 2\\pi f$, not f, in reactances.',
        'Derivations: write $v = V_0\\sin\\omega t$, use $L\\,di/dt = v$ or $i = C\\,dv/dt$, then read off the phase.',
      ],
      v: table(['Frequency raised', 'X_L', 'X_C'], [['× 2', '× 2', '÷ 2'], ['→ 0 (DC)', '→ 0', '→ ∞']], 'Table of how inductive and capacitive reactance change when the frequency is doubled or reduced to zero'),
      n: 'Remember that mains figures are rms values. A memory aid for phase is CIVIL: in a capacitor, current leads voltage; in an inductor, voltage leads current. Always use omega, two pi f, in the reactance formulas. And in derivations, start from the voltage as a sine function and differentiate or integrate to find the current and its phase.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Alternating Current — Part 2: LCR circuits, power, generators and transformers',
  goals: [
    'Find the impedance and phase angle of a series LCR circuit using phasors',
    'Explain resonance and calculate the resonant frequency',
    'Calculate average power, explain power factor and wattless current',
    'Explain the working of an AC generator and a transformer',
  ],
  slides: [
    sl('title', 'LCR circuits, power and transformers', {
      b: 'Part 2 — combining R, L and C in series, resonance, the power actually used in AC circuits, and the machines that make and transform AC.',
      v: flow('LR', [['l', 'Series LCR'], ['z', 'Impedance'], ['r', 'Resonance'], ['p', 'Power factor'], ['g', 'Generator'], ['t', 'Transformer']], [['l', 'z'], ['z', 'r'], ['r', 'p'], ['p', 'g'], ['g', 't']], 'Flow of the part: series LCR, impedance, resonance, power factor, generator, transformer'),
      n: 'Real circuits combine resistance, inductance and capacitance. In this part we use phasors to find the total opposition, the impedance, and see how a radio tunes in one station by resonance. Then we find the real power used in AC circuits and why power companies care about power factor. Finally we look at the generator that produces AC and the transformer that changes its voltage.',
    }),
    sl('diagram', 'Series LCR circuit: phasor diagram', {
      b: r`The same current $I$ flows through all three. Take $I$ as reference: $V_R = IR$ in phase, $V_L = IX_L$ ahead by 90°, $V_C = IX_C$ behind by 90°. Adding the phasors:
$$V = \sqrt{V_R^2 + (V_L - V_C)^2} = I\sqrt{R^2 + (X_L - X_C)^2}$$`,
      v: V.lcr,
      n: 'In a series circuit the current is common, so draw it as the reference. The resistor’s voltage is in phase with it, the inductor’s voltage points ninety degrees ahead, and the capacitor’s ninety degrees behind. The inductor and capacitor voltages point in opposite directions, so they partly cancel. The supply voltage is the phasor sum: the square root of V R squared plus V L minus V C squared.',
    }),
    sl('concept', 'Impedance and phase angle', {
      b: r`$$Z = \sqrt{R^2 + (X_L - X_C)^2},\qquad I = \dfrac{V}{Z},\qquad \tan\phi = \dfrac{X_L - X_C}{R}$$
$\phi$ is the angle by which the voltage leads the current.`,
      ul: ['$X_L > X_C$: inductive circuit, V leads I.', '$X_C > X_L$: capacitive circuit, I leads V.', '$X_L = X_C$: resistive, in phase (resonance).'],
      v: V.tri,
      n: 'The total opposition of a series LCR circuit is the impedance Z, the square root of R squared plus X L minus X C squared, which forms the impedance triangle. The current is the voltage divided by Z. The phase angle phi, from tan phi equals X L minus X C over R, tells you whether the circuit behaves inductively, with voltage leading, or capacitively, with current leading.',
    }),
    sl('example', 'Worked example 4: a series LCR circuit', {
      b: r`A series circuit has $R = 30$ Ω, $X_L = 80$ Ω and $X_C = 40$ Ω, connected to 220 V rms. Find Z, the current, the voltage across each element and the phase angle.`,
      ul: [
        r`Step 1 — $Z = \sqrt{30^2 + (80 - 40)^2} = ${ex3.Z}$ Ω; $I = \dfrac{220}{50} = ${dec(ex3.I, 2)}$ A.`,
        r`Step 2 — $V_R = ${dec(ex3.VR, 3)}$ V, $V_L = ${dec(ex3.VL, 3)}$ V, $V_C = ${dec(ex3.VC, 3)}$ V.`,
        r`Step 3 — $\tan\phi = \dfrac{40}{30}$, so $\phi \approx ${dec(ex3.phi, 3)}^\circ$; voltage leads current (inductive).`,
        'Note — $V_L$ alone (352 V) exceeds the supply voltage: phasors, not plain numbers, must add up to 220 V.',
      ],
      v: V.lcr,
      n: 'The net reactance is forty ohms, so with thirty ohms of resistance the impedance is fifty ohms, a three four five triangle, and the current is four point four amperes. The voltages across the parts are one hundred and thirty two, three hundred and fifty two and one hundred and seventy six volts. They add as phasors, not as numbers, to two hundred and twenty volts. The voltage leads by about fifty three degrees.',
    }),
    sl('diagram', 'Resonance', {
      b: r`The current is largest when $X_L = X_C$, i.e. $\omega L = \dfrac{1}{\omega C}$:
$$\omega_0 = \dfrac{1}{\sqrt{LC}},\qquad f_0 = \dfrac{1}{2\pi\sqrt{LC}}$$
At resonance $Z = R$ (minimum), $I = V/R$ (maximum), and V and I are in phase.`,
      ul: ['Smaller R gives a sharper, taller peak: better selection of one frequency.', 'Radio tuning: the capacitor is varied until $f_0$ matches the station.'],
      v: resPlot,
      n: 'As the frequency of the supply changes, X L rises and X C falls. At one frequency they are equal and cancel, leaving only the resistance. This is resonance, at omega nought equal to one over root L C. The current is then as large as it can be and in phase with the voltage. A small resistance gives a tall, sharp peak, which is how a radio picks out one station from many.',
    }),
    sl('example', 'Worked example 5: resonant frequency', {
      b: r`A series circuit has $L = 0.10$ H, $C = 10\,\mu\text{F}$ and $R = 20$ Ω, with a 100 V rms variable-frequency supply. Find the resonant angular frequency, the resonant frequency and the current at resonance.`,
      ul: [
        r`Step 1 — $\omega_0 = \dfrac{1}{\sqrt{LC}} = \dfrac{1}{\sqrt{0.10 \times 10 \times 10^{-6}}} = ${dec(ex4.w0, 3)}$ rad s$^{-1}$.`,
        r`Step 2 — $f_0 = \dfrac{\omega_0}{2\pi} \approx ${dec(ex4.f0, 3)}$ Hz.`,
        r`Step 3 — at resonance $Z = R$: $I = \dfrac{100}{20} = 5$ A.`,
      ],
      v: resPlot,
      n: 'Multiply L and C to get ten to the minus six, take the square root and invert: omega nought is one thousand radians per second. Divide by two pi for the frequency, about one hundred and fifty nine hertz. At resonance the reactances cancel, so only the twenty ohm resistance limits the current: five amperes, the largest the circuit can draw from this supply.',
    }),
    sl('check', 'Quick check: at resonance', {
      b: 'Choose the correct statement about a series LCR circuit at resonance.',
      v: resPlot,
      chk: 'reson-mcq',
      n: 'At resonance the inductive and capacitive reactances are equal. What does that leave for the impedance and the phase?',
    }),
    sl('concept', 'Power in AC circuits', {
      b: r`The average power is
$$P = V_\text{rms}I_\text{rms}\cos\phi$$
$\cos\phi$ is the **power factor** ($= R/Z$ for series LCR).`,
      ul: ['Pure R: $\\cos\\phi = 1$, $P = VI$.', 'Pure L or C: $\\phi = 90^\\circ$, $P = 0$.', 'Only the resistance dissipates power: $P = I_\\text{rms}^2R$.'],
      v: V.tri,
      n: 'In AC the current and voltage may be out of step, so the average power is not simply V times I. It is V rms times I rms times cos phi, and cos phi is called the power factor. For a pure resistor it is one. For a pure inductor or capacitor the phase is ninety degrees, the power factor is zero, and no average power is used: energy is stored and returned each cycle. Only resistance dissipates power.',
    }),
    sl('example', 'Worked example 6: power factor', {
      b: r`Find the power factor and the average power for the circuit of worked example 4 ($R = 30$ Ω, $Z = 50$ Ω, $I = 4.4$ A, 220 V).`,
      ul: [
        r`Step 1 — $\cos\phi = \dfrac{R}{Z} = \dfrac{30}{50} = ${dec(ex5.cos, 2)}$.`,
        r`Step 2 — $P = VI\cos\phi = 220 \times 4.4 \times 0.6 = ${dec(ex5.P, 4)}$ W.`,
        r`Check — $I^2R = 4.4^2 \times 30 = ${dec(ex5.PR, 4)}$ W: the same, since only R dissipates power.`,
      ],
      v: V.tri,
      n: 'The power factor is R over Z, thirty over fifty, zero point six. The apparent power, volts times amperes, is about nine hundred and sixty eight, but only sixty percent of it is real power: about five hundred and eighty one watts. Check with I squared R: four point four squared times thirty gives the same figure, because the coil and capacitor return all the energy they take.',
    }),
    sl('concept', 'Power factor and wattless current', {
      b: 'The current can be split into a part **in phase** with V, $I\\cos\\phi$, which delivers power, and a part **90° out of phase**, $I\\sin\\phi$, which delivers none: the **wattless current**.',
      ul: ['A low power factor means a large current for little power, so large $I^2R$ losses in supply lines.', 'Industries add capacitors to cancel the inductive reactance of motors and raise the power factor towards 1.'],
      v: table(['Load', 'Power factor', 'Comment'], [['Heater, filament lamp', '≈ 1', 'Resistive'], ['Induction motor (light load)', '≈ 0.3 to 0.5', 'Strongly inductive'], ['Motor with correcting capacitor', '≈ 0.9 to 1', 'Reactance cancelled']], 'Table of power factors of typical loads: heaters near one, lightly loaded motors 0.3 to 0.5, motors with correcting capacitors 0.9 to 1'),
      n: 'Think of the current as two parts. The part in step with the voltage, I cos phi, carries the real power. The part a quarter cycle out of step, I sin phi, flows back and forth without delivering any average power, so it is called wattless current. It still heats the supply cables, so a low power factor wastes energy. Factories with big motors add capacitors to improve their power factor.',
    }),
    sl('check', 'Quick check: wattless current', {
      b: 'Decide whether the statement is true or false.',
      v: null,
      chk: 'wattless-tf',
      n: 'Ask whether a current exactly a quarter cycle out of phase with the voltage delivers any average power.',
    }),
    sl('diagram', 'The AC generator', {
      b: r`A coil of $N$ turns and area $A$ rotates with angular speed $\omega$ in a uniform field $B$. The flux is $\Phi = NBA\cos\omega t$, so
$$\varepsilon = -\dfrac{d\Phi}{dt} = NBA\omega\sin\omega t = \varepsilon_0\sin\omega t,\qquad \varepsilon_0 = NBA\omega$$`,
      ul: ['Slip rings and brushes connect the rotating coil to the external circuit.', 'The emf is largest when the plane of the coil is parallel to B (flux changing fastest).'],
      v: V.gen,
      n: 'A generator turns mechanical energy into electrical energy. A coil spins in a magnetic field, so the flux through it rises and falls as N B A cos omega t. By Faraday’s law the emf is N B A omega sine omega t, an alternating emf with peak N B A omega. It is largest when the coil’s plane lies along the field, where the flux is zero but changing fastest. Slip rings and brushes carry the current out.',
    }),
    sl('example', 'Worked example 7: generator emf', {
      b: r`A generator coil has 100 turns of area 0.020 m² and rotates at 50 revolutions per second in a field of 0.50 T. Find the peak and rms emf.`,
      ul: [
        r`Step 1 — $\omega = 2\pi \times 50 \approx 314$ rad s$^{-1}$.`,
        r`Step 2 — $\varepsilon_0 = NBA\omega = 100 \times 0.50 \times 0.020 \times 314 \approx ${dec(ex6.e0, 3)}$ V.`,
        r`Step 3 — $\varepsilon_\text{rms} = \dfrac{\varepsilon_0}{\sqrt2} \approx ${dec(ex6.e0 / Math.SQRT2, 3)}$ V.`,
      ],
      v: V.gen,
      n: 'Fifty revolutions per second means omega is about three hundred and fourteen radians per second. Multiply turns, field, area and omega to get a peak emf of about three hundred and fourteen volts. The rms value is the peak divided by root two, about two hundred and twenty two volts, close to mains voltage. Real power-station generators use many more turns and stronger fields.',
    }),
    sl('diagram', 'The transformer', {
      b: r`Two coils on a common laminated iron core. An alternating current in the primary makes an alternating flux that links the secondary. For an **ideal** transformer:
$$\dfrac{V_s}{V_p} = \dfrac{N_s}{N_p} = \dfrac{I_p}{I_s}$$`,
      ul: ['Step-up: $N_s > N_p$; step-down: $N_s < N_p$.', 'Ideal: power in = power out, $V_pI_p = V_sI_s$.', 'Losses: copper ($I^2R$) in windings, flux leakage, hysteresis and core heating (reduced by laminating the core).', 'Works only with AC: a steady current gives no changing flux.'],
      v: V.tr,
      n: 'A transformer has two coils wound on one iron core. Alternating current in the primary creates an alternating flux in the core, which induces an emf in the secondary. Each turn gets the same emf, so the voltages are in the ratio of the turns. If no energy is lost, power in equals power out, so stepping the voltage up steps the current down. Laminating the core reduces energy losses, and a transformer cannot work with steady DC.',
    }),
    sl('example', 'Worked example 8: a step-down transformer', {
      b: r`An ideal transformer has a turns ratio $N_p : N_s = 20 : 1$ and is connected to 220 V mains. The secondary supplies 2.0 A. Find the secondary voltage and the primary current.`,
      ul: [
        r`Step 1 — $V_s = V_p\dfrac{N_s}{N_p} = \dfrac{220}{20} = ${dec(ex7.Vs, 2)}$ V.`,
        r`Step 2 — power conservation: $I_p = I_s\dfrac{N_s}{N_p} = \dfrac{2.0}{20} = ${dec(ex7.Ip, 2)}$ A.`,
        'Check — power in $220 \\times 0.10 = 22$ W equals power out $11 \\times 2.0 = 22$ W.',
      ],
      v: V.tr,
      n: 'With twenty primary turns for every secondary turn, the voltage is divided by twenty: eleven volts, suitable for a low-voltage device. Because an ideal transformer conserves power, the current is multiplied by the same ratio in the other direction: the primary carries only one tenth of an ampere while the secondary supplies two amperes. Twenty two watts go in and twenty two watts come out.',
    }),
    sl('check', 'Quick check: transformer on DC', {
      b: 'Judge the assertion and the reason.',
      v: V.tr,
      chk: 'dcTrans-ar',
      n: 'A transformer relies on induction. Ask whether a steady current produces a changing flux.',
    }),
    sl('summary', 'Summary — Part 2', {
      b: 'Key results:',
      v: table(
        ['Idea', 'Result'],
        [
          ['Impedance', '$Z = \\sqrt{R^2 + (X_L - X_C)^2}$, $\\tan\\phi = (X_L - X_C)/R$'],
          ['Resonance', '$\\omega_0 = 1/\\sqrt{LC}$; Z = R; I max, in phase'],
          ['Power', '$P = V_\\text{rms}I_\\text{rms}\\cos\\phi$; cos φ = R/Z'],
          ['Wattless current', '$I\\sin\\phi$, delivers no power'],
          ['Generator', '$\\varepsilon = NBA\\omega\\sin\\omega t$'],
          ['Transformer', '$V_s/V_p = N_s/N_p = I_p/I_s$ (ideal)'],
        ],
        'Summary table of impedance, resonance, power, wattless current, generator and transformer',
      ),
      n: 'To sum up: in a series LCR circuit the voltages add as phasors, giving the impedance root R squared plus X L minus X C squared and a phase angle with tan phi equal to the net reactance over R. At resonance the reactances cancel and the current peaks. Average power is V I cos phi; the out-of-phase part of the current is wattless. A generator gives N B A omega sine omega t, and a transformer changes voltage in the ratio of the turns.',
    }),
    sl('exam-tips', 'Exam tips — Part 2', {
      ul: [
        'Draw the phasor diagram with **I as reference** for series circuits.',
        'Voltages across L and C can each exceed the supply voltage; only the phasor sum equals it.',
        'At resonance, say three things: Z = R, I maximum, V and I in phase.',
        'Transformer: voltage ratio = turns ratio; current ratio is the inverse (ideal case); state the losses and how they are reduced.',
      ],
      v: table(['Circuit', 'Power factor'], [['Pure R', '1'], ['Pure L or pure C', '0'], ['LCR at resonance', '1'], ['General LCR', 'R/Z']], 'Table of power factors: 1 for pure resistance and at resonance, 0 for pure inductance or capacitance, R over Z in general'),
      n: 'For series circuits, draw the current as the reference phasor and the element voltages relative to it. Do not be surprised if the voltage across the inductor is bigger than the supply voltage; only the phasor sum must match. At resonance mention the minimum impedance, maximum current and zero phase. For transformers, give the turns-ratio relations and name the energy losses with their remedies.',
    }),
  ],
});
