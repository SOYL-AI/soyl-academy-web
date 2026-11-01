// ISC 12 Physics ch11 Alternating Current — question bank (ISC style). Numbers computed and re-checked.
// The ISC scope gives bandwidth and the Q factor as formulae (their derivations are removed) and treats LC oscillations
// qualitatively, so no item asks for those derivations or for a quantitative LC oscillation.
import { mk, add, r, sci, dec, near } from '../../isc-12-physics-ch01/src/lib.mjs';
import { W } from './decks.mjs';

const { mcq, ar, tf, fill, match, num, short, long } = mk;
const rad = (d) => (d * Math.PI) / 180;
const deg = (x) => (x * 180) / Math.PI;

// ================================================================ t01 sinusoidal AC; period, frequency, phase; mean and rms values
add('phase-mcq', mcq({
  stem: 'Two voltages displayed on a double-beam oscilloscope are $v_1 = 12\\sin(200\\pi t)$ and $v_2 = 12\\cos(200\\pi t)$, in volts, with $t$ in seconds. Which statement is correct?',
  right: '$v_2$ leads $v_1$ by a quarter of a period, 2.5 ms',
  wrong: ['$v_1$ leads $v_2$ by a quarter of a period, 2.5 ms', '$v_2$ leads $v_1$ by half a period, 5.0 ms', 'they are in phase, because their peak values are equal'],
  sol: r`$\omega = 200\pi$ rad s$^{-1}$, so $f = 100$ Hz and $T = 10$ ms. Since $\cos\theta = \sin(\theta + \pi/2)$, $v_2$ is $v_1$ shifted ahead by $\pi/2$, a quarter of a period: $T/4 = 2.5$ ms — option (@K).`,
  d: 3, c: 'analysis', t: [1],
}), () => near(1 / 100 / 4, 0.0025) || 'phase');
add('meters-mcq', mcq({
  stem: 'A moving-coil ammeter (meant for DC) and a hot-wire ammeter are joined in series in a 50 Hz circuit carrying a sinusoidal current of peak value 2.0 A. Their readings are',
  right: 'zero and about 1.4 A',
  wrong: ['about 1.4 A on both', 'about 1.3 A and 2.0 A', 'zero and 2.0 A'],
  sol: r`The moving-coil meter responds to the average current, which is zero over each cycle (its needle cannot follow 50 Hz). The hot-wire meter responds to the heating, i.e. to the mean of $i^2$, so it reads the rms value $2.0/\sqrt2 \approx 1.4$ A — option (@K).`,
  d: 3, c: 'understanding', t: [1],
}), () => near(2 / Math.SQRT2, 1.414, 0.001) || 'meters');
add('square-mcq', mcq({
  stem: 'A signal generator gives a square-wave voltage that switches between +6.0 V and −6.0 V, spending equal times at each value. Its rms value is',
  right: '6.0 V',
  wrong: ['4.2 V', '3.0 V', 'zero'],
  sol: r`At every instant $v^2 = 36$ V², so the mean of $v^2$ is 36 V² and $V_\text{rms} = 6.0$ V. The rule $V_0/\sqrt2$ (which would give 4.2 V) holds only for sinusoidal waves — option (@K).`,
  d: 4, c: 'analysis', t: [1],
}), () => near(Math.sqrt((36 + 36) / 2), 6) || 'square');
const hp = { e0: 170, w: 120 * Math.PI };
hp.t = Math.asin(85 / 170) / hp.w;
add('halfpeak-num', num({
  stem: 'The emf of a source is $e = 170\\sin(120\\pi t)$ volts. Starting from $t = 0$, how long does the emf take to rise to 85 V for the first time? Give the answer in ms (3 significant figures).',
  value: Number(dec(hp.t * 1e3, 3)), tol: 0.01, unit: 'ms',
  sol: r`$170\sin(120\pi t) = 85$ gives $\sin(120\pi t) = 0.5$, so $120\pi t = \dfrac{\pi}{6}$ and $t = \dfrac{1}{720}$ s $\approx ${sci(hp.t, 3)}$ s, i.e. $${sci(hp.t, 3)} \times 10^{3} = ${dec(hp.t * 1e3, 3)}$ ms.`,
  scheme: [['sin(120πt) = 0.5, so 120πt = π/6', 1], ['t = 1/720 s ≈ 1.39 ms', 1]],
  marks: 2, d: 3, c: 'analysis', t: [1],
}), (q) => near(hp.t, 1 / 720, 1e-9) && q.answer.value === 1.39 || `hp ${hp.t}`);
const hm = { Irms: 3 };
hm.mean = (2 * Math.SQRT2 * hm.Irms) / Math.PI;
add('halfmean-num', num({
  stem: 'A sinusoidal current has an rms value of 3.0 A. Find its mean value over a half cycle, in amperes (3 significant figures).',
  value: Number(dec(hm.mean, 3)), tol: 0.01, unit: 'A',
  sol: r`$I_0 = \sqrt2\,I_\text{rms}$ and $\bar I = \dfrac{2I_0}{\pi} = \dfrac{2\sqrt2}{\pi}I_\text{rms}$, so $\bar I = 0.9003 \times 3.0 = ${dec(hm.mean, 3)}$ A.`,
  scheme: [['Half-cycle mean = (2√2/π) I_rms ≈ 2.70 A', 1]],
  d: 2, c: 'application', t: [1],
}), (q) => near(hm.mean, 2.7009, 1e-4) && q.answer.value === 2.7 || `hm ${hm.mean}`);
const im = { R: 46, V: 230 };
im.I0 = (im.V / im.R) * Math.SQRT2;
add('immersion-num', num({
  stem: 'An immersion heater rod of resistance 46 Ω is connected to 230 V, 50 Hz mains. Find the peak value of the current through it, in amperes (3 significant figures).',
  value: Number(dec(im.I0, 3)), tol: 0.01, unit: 'A',
  sol: r`$I_\text{rms} = \dfrac{230}{46} = 5.0$ A, so $I_0 = \sqrt{2} \times 5.0 = ${dec(im.I0, 3)}$ A.`,
  scheme: [['I_rms = 5.0 A, I₀ = √2 × 5.0 ≈ 7.07 A', 1]],
  d: 2, c: 'application', t: [1],
}), (q) => near(im.I0, 7.0711, 1e-4) && q.answer.value === 7.07 || 'im');
add('mean-ar', ar({
  a: 'Over one complete cycle, the average value of a sinusoidal alternating current is zero.',
  r: 'The heat produced by an alternating current in a resistor is proportional to the square of the current.',
  key: 'b',
  sol: 'Both statements are true, but R does not explain A: the full-cycle mean is zero because the negative half cycle exactly mirrors the positive one; R is about heating, which is why the rms value is used — option (b).',
  d: 2, c: 'understanding', t: [1],
}));
add('rms-tf', tf({
  stem: 'The relation $I_\\text{rms} = I_0/\\sqrt2$ holds for every alternating current, whatever the shape of its waveform.',
  key: 'f',
  sol: 'False. It holds only for sinusoidal currents. A square wave of peak $I_0$, for example, has $I_\\text{rms} = I_0$, because $i^2 = I_0^2$ at every instant.',
  d: 2, c: 'understanding', t: [1],
}));
add('period-fill', fill({
  stem: 'Indian household mains completes 50 cycles every second, reversing its direction 100 times; so each complete cycle of the mains voltage lasts ___ ms.',
  acc: [['20', '20 ms']],
  sol: 'T = 1/f = 1/50 s = 0.020 s, i.e. **20** ms.',
  d: 1, c: 'understanding', t: [1],
}), () => near(1000 / 50, 20) || 'period');
const ms = { Irms: 5 };
ms.I0 = Math.SQRT2 * ms.Irms;
ms.mean = (2 * ms.I0) / Math.PI;
add('mean-short2', short({
  marks: 2,
  stem: 'Why is the mean value of an alternating current quoted over a half cycle rather than over a full cycle? Calculate the half-cycle mean of a sinusoidal current whose rms value is 5.0 A.',
  model: r`Over a full cycle the positive and negative halves cancel, so the mean is always zero and tells us nothing; over a **half cycle** it is $2I_0/\pi$, which measures, for example, the charge sent in one half cycle. Here $I_0 = \sqrt2 \times 5.0 \approx ${dec(ms.I0, 3)}$ A, so $\bar I = \dfrac{2 \times ${dec(ms.I0, 3)}}{\pi} \approx ${dec(ms.mean, 3)}$ A.`,
  sol: 'Full-cycle mean zero; 2I₀/π.',
  scheme: [['Full-cycle mean is zero; half-cycle mean 2I₀/π', 1], ['I₀ ≈ 7.07 A, mean ≈ 4.50 A', 1]],
  d: 2, c: 'application', t: [1],
}), () => near(ms.mean, 4.5016, 1e-4) || `ms ${ms.mean}`);
add('rms-short3', short({
  marks: 3,
  stem: 'Define the rms value of an alternating current. Derive the relation between the rms value and the peak value of a sinusoidal current $i = I_0\\sin\\omega t$. Hence find the peak voltage of 230 V mains.',
  model: r`The **rms value** is the steady current that would produce the same heat in a given resistor in the same time. Heat in time $T$ is $\int_0^T i^2R\,dt$, so $I_\text{rms}^2 = \overline{i^2} = \dfrac{1}{T}\int_0^T I_0^2\sin^2\omega t\,dt = \dfrac{I_0^2}{T}\int_0^T \dfrac{1 - \cos 2\omega t}{2}\,dt = \dfrac{I_0^2}{2}$, since $\cos 2\omega t$ averages to zero over a cycle. Hence $I_\text{rms} = \dfrac{I_0}{\sqrt2}$. For the mains $V_0 = \sqrt2 \times 230 \approx ${dec(230 * Math.SQRT2, 3)}$ V.`,
  sol: 'Mean of sin² over a cycle is 1/2.',
  scheme: [['Definition by equal heating', 1], ['Mean of i² = I₀²/2, so I_rms = I₀/√2', 1], ['V₀ ≈ 325 V', 1]],
  d: 3, c: 'understanding', t: [1], wl: null,
}), () => near(230 * Math.SQRT2, 325.27, 1e-4) || 'rms');

// ================================================================ t02 AC through pure R, L and C; reactances and their graphs
add('Xfreq-mcq', mcq({
  stem: 'A capacitor has a reactance of 90 Ω on a 50 Hz supply. When it is connected instead to a 150 Hz supply, its reactance becomes',
  right: '30 Ω',
  wrong: ['270 Ω', '90 Ω, since reactance does not depend on frequency', '10 Ω'],
  sol: r`$X_C = \dfrac{1}{2\pi fC} \propto \dfrac{1}{f}$. Tripling the frequency divides the reactance by 3: $90/3 = 30$ Ω — option (@K).`,
  d: 2, c: 'understanding', t: [2],
}), () => near(90 * (50 / 150), 30) || 'xf');
add('Cpeak-mcq', mcq({
  stem: 'An ideal capacitor is connected across a sinusoidal supply. At the instant the voltage across it reaches its positive peak, the current in the circuit is',
  right: 'zero, and about to reverse as the capacitor starts to discharge',
  wrong: ['at its positive peak, in step with the voltage', 'at its negative peak', 'half its peak value'],
  sol: r`$i = C\,\dfrac{dv}{dt}$. At the peak of $v$ the slope is zero, so $i = 0$; just afterwards $v$ falls, so $i$ becomes negative and the capacitor discharges. This is the 90° lead of the current — option (@K).`,
  d: 3, c: 'analysis', t: [2],
}), () => (Math.abs(Math.cos(Math.PI / 2)) < 1e-12 && Math.cos(Math.PI / 2 + 0.01) < 0) || 'cpeak');
const xl = { L: 0.08, V: 230 };
xl.X = W(50) * xl.L;
xl.I = xl.V / xl.X;
add('XL-num', num({
  stem: 'A coil of inductance 80 mH and negligible resistance is connected to 230 V, 50 Hz mains. Find the rms current it draws, in amperes (3 significant figures).',
  value: Number(dec(xl.I, 3)), tol: 0.02, unit: 'A',
  sol: r`$X_L = 2\pi fL = 2\pi \times 50 \times 0.080 \approx ${dec(xl.X, 4)}$ Ω; $I = \dfrac{V}{X_L} = \dfrac{230}{${dec(xl.X, 4)}} = ${dec(xl.I, 3)}$ A.`,
  scheme: [['X_L = 2πfL ≈ 25.13 Ω', 1], ['I = V/X_L ≈ 9.15 A', 1]],
  marks: 2, d: 2, c: 'application', t: [2],
}), (q) => near(xl.I, 9.1519, 1e-4) && q.answer.value === 9.15 || `xl ${xl.I}`);
const cv = { X: 400 };
cv.C = 1 / (W(50) * cv.X);
add('Cvalue-num', num({
  stem: 'What capacitance has a reactance of 400 Ω at 50 Hz? Give the answer in μF (3 significant figures).',
  value: Number(dec(cv.C * 1e6, 3)), tol: 0.02, unit: 'μF',
  sol: r`$C = \dfrac{1}{2\pi fX_C} = \dfrac{1}{2\pi \times 50 \times 400} \approx ${sci(cv.C, 3)}$ F, i.e. $${sci(cv.C, 3)} \times 10^{6} = ${dec(cv.C * 1e6, 3)}$ μF.`,
  scheme: [['C = 1/(2πfX_C) ≈ 7.96 μF', 1]],
  d: 2, c: 'application', t: [2],
}), (q) => near(cv.C, 7.9577e-6, 1e-4) && q.answer.value === 7.96 || `cv ${cv.C}`);
add('ship-num', num({
  stem: 'A capacitor draws 0.60 A from a 230 V, 50 Hz supply. On board a ship it is connected to a 230 V, 60 Hz supply instead. What current does it draw now, in amperes?',
  value: 0.72, tol: 0.01, unit: 'A',
  sol: r`$I = \dfrac{V}{X_C} = 2\pi fCV \propto f$ at fixed voltage, so $I = 0.60 \times \dfrac{60}{50} = 0.72$ A.`,
  scheme: [['I ∝ f: 0.60 × 60/50 = 0.72 A', 1]],
  d: 2, c: 'application', t: [2],
}), () => near(0.6 * 60 / 50, 0.72) || 'ship');
const co = { L: 0.05, f: 1000 };
co.C = 1 / (W(co.f) ** 2 * co.L);
add('crossover-num', num({
  stem: 'A loudspeaker crossover network uses a 50 mH coil. What capacitance has the same reactance as this coil at 1.0 kHz? Give the answer in μF (3 significant figures).',
  value: Number(dec(co.C * 1e6, 3)), tol: 0.005, unit: 'μF',
  sol: r`$\omega L = \dfrac{1}{\omega C}$ gives $C = \dfrac{1}{\omega^2L} = \dfrac{1}{(2\pi \times 1000)^2 \times 0.050} \approx ${sci(co.C, 3)}$ F, i.e. $${sci(co.C, 3)} \times 10^{6} = ${dec(co.C * 1e6, 3)}$ μF.`,
  scheme: [['Equal reactances: C = 1/(ω²L)', 1], ['C ≈ 0.507 μF', 1]],
  marks: 2, d: 3, c: 'application', t: [2],
}), (q) => near(co.C, 5.0661e-7, 1e-4) && q.answer.value === 0.507 || `co ${co.C}`);
add('inductor-ar', ar({
  a: 'In a circuit containing only an ideal inductor, the current reaches its maximum a quarter of a cycle after the applied voltage does.',
  r: 'The emf induced in the inductor opposes every change of the current through it.',
  key: 'a',
  sol: 'Both true, and R explains A: because the self-induced emf opposes changes of current, the current builds up only while the voltage acts, reaching its peak when the voltage has fallen to zero — a lag of 90° — option (a).',
  d: 3, c: 'understanding', t: [2],
}));
add('capdc-ar', ar({
  a: 'A lamp in series with a large capacitor glows on 230 V AC mains but stays dark on a 230 V DC supply.',
  r: 'The reactance of a capacitor, $1/(\\omega C)$, becomes infinitely large when $\\omega = 0$.',
  key: 'a',
  sol: 'Both true, and R explains A: a steady supply has zero frequency, so the capacitor offers infinite opposition once it has charged, and no current flows; on AC it charges and discharges continually — option (a).',
  d: 2, c: 'understanding', t: [2],
}));
add('hf-tf', tf({
  stem: 'At very high frequencies an inductor behaves almost like a plain connecting wire, while a capacitor behaves almost like an open switch.',
  key: 'f',
  sol: 'False. It is the other way round: $X_L = 2\\pi fL$ becomes very large (the coil nearly blocks the current), while $X_C = 1/(2\\pi fC)$ becomes very small (the capacitor passes it easily).',
  d: 2, c: 'understanding', t: [2],
}));
add('XC-fill', fill({
  stem: 'For a capacitor on an AC supply, the ratio of the rms voltage across it to the rms current through it, equal to 1/(ωC), is called its capacitive ___.',
  acc: [['reactance']],
  sol: 'Its capacitive **reactance**, measured in ohms.',
  d: 1, c: 'recall', t: [2],
}));
add('graphs-match', match({
  stem: 'Match each graph drawn against the supply frequency f (Column A) with the circuit quantity it describes (Column B).',
  pairs: [
    ['A straight line through the origin, rising with f', 'reactance of a coil, X_L'],
    ['A curve falling as 1/f, very large at low f', 'reactance of a capacitor, X_C'],
    ['A horizontal line, the same at every f', 'resistance of a wire-wound resistor'],
    ['A curve with a minimum at one frequency', 'impedance of a series LCR circuit'],
  ],
  order: [2, 0, 3, 1],
  sol: 'Straight line through the origin → X_L = 2πfL (1 → r); falling as 1/f → X_C = 1/(2πfC) (2 → p); horizontal → R, independent of f (3 → s); minimum at one frequency → Z, least (= R) at resonance (4 → q).',
  d: 2, c: 'understanding', t: [2, 3],
}));
add('crossover-short2', short({
  marks: 2,
  stem: 'In a hi-fi speaker box, the tweeter (for high notes) is fed through a capacitor and the woofer (for low notes) through an inductor. Explain how this sends each range of frequencies to the right speaker.',
  model: 'The capacitor’s reactance $X_C = 1/(2\\pi fC)$ is **small at high frequency** and large at low frequency, so it passes high notes to the tweeter and blocks low ones. The inductor’s reactance $X_L = 2\\pi fL$ is **small at low frequency** and large at high frequency, so it passes low notes to the woofer and chokes high ones.',
  sol: 'X_C falls with f; X_L rises with f.',
  scheme: [['Capacitor: small X_C at high f, passes high notes to the tweeter', 1], ['Inductor: small X_L at low f, passes low notes to the woofer', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('Cderive-short3', short({
  marks: 3,
  stem: 'A capacitor of capacitance C is connected across a source of emf $e = E_0\\sin\\omega t$. Obtain an expression for the current in the circuit and show that it leads the emf by π/2. Write the capacitive reactance and state how it varies with frequency.',
  model: r`The charge on the capacitor follows the emf: $q = Ce = CE_0\sin\omega t$. The current is $i = \dfrac{dq}{dt} = \omega CE_0\cos\omega t = I_0\sin\left(\omega t + \dfrac{\pi}{2}\right)$, with $I_0 = \omega CE_0 = \dfrac{E_0}{1/\omega C}$. So the current reaches each peak a quarter of a cycle **before** the emf: it **leads** by π/2. The capacitive reactance is $X_C = \dfrac{1}{\omega C} = \dfrac{1}{2\pi fC}$, inversely proportional to the frequency (infinite for DC).`,
  sol: 'i = dq/dt = C de/dt.',
  scheme: [['q = CE₀ sin ωt and i = ωCE₀ cos ωt', 1], ['cos ωt = sin(ωt + π/2): leads by π/2', 1], ['X_C = 1/ωC, ∝ 1/f', 1]],
  d: 3, c: 'understanding', t: [2], wl: null,
}));

// ================================================================ t03 series LCR circuit, impedance, phase angle, RL and RC cases, graphs
const ll = { R: 40, XL: 25, XC: 55 };
ll.phi = deg(Math.atan(Math.abs(ll.XL - ll.XC) / ll.R));
add('leadlag-mcq', mcq({
  stem: 'A series AC circuit has R = 40 Ω, X_L = 25 Ω and X_C = 55 Ω. The current in it',
  right: 'leads the supply voltage by about 37°',
  wrong: ['lags behind the supply voltage by about 37°', 'leads the supply voltage by about 53°', 'is in phase with the supply voltage'],
  sol: r`$\tan\phi = \dfrac{X_L - X_C}{R} = \dfrac{25 - 55}{40} = -0.75$, so $|\phi| \approx 36.9^\circ$. Since $X_C > X_L$ the circuit is capacitive and the current leads — option (@K).`,
  d: 3, c: 'application', t: [3],
}), () => near(ll.phi, 36.87, 1e-3) || `ll ${ll.phi}`);
add('Zgraph-mcq', mcq({
  stem: 'The frequency of the supply to a series LCR circuit is raised steadily from well below its resonant frequency to well above it. The impedance of the circuit',
  right: 'falls to a least value equal to R and then rises again',
  wrong: ['rises steadily, because X_L increases with frequency', 'falls steadily, because X_C decreases with frequency', 'stays equal to R throughout'],
  sol: r`$Z = \sqrt{R^2 + (X_L - X_C)^2}$. Below $f_0$, $X_C$ dominates and $Z$ is large; at $f_0$, $X_L = X_C$ and $Z = R$; above $f_0$, $X_L$ dominates and $Z$ rises — option (@K).`,
  d: 2, c: 'understanding', t: [3],
}));
add('RC-mcq', mcq({
  stem: 'In a series RC circuit on an AC supply, ideal voltmeters read 12 V across the resistor and 16 V across the capacitor. The supply voltage and the phase of the current are',
  right: '20 V, with the current leading by about 53°',
  wrong: ['28 V, with the current leading by 90°', '20 V, with the current lagging by about 53°', '4 V, with the current in phase'],
  sol: r`$V_R$ and $V_C$ are at right angles: $V = \sqrt{12^2 + 16^2} = 20$ V. $\tan\phi = \dfrac{16}{12}$ gives $\phi \approx 53.1^\circ$, and in an RC circuit the current leads — option (@K).`,
  d: 3, c: 'application', t: [3],
}), () => near(Math.hypot(12, 16), 20) && near(deg(Math.atan(16 / 12)), 53.13, 1e-3) || 'rc');
const cz = { R: 15, L: 0.064, V: 230 };
cz.X = W(50) * cz.L;
cz.Z = Math.hypot(cz.R, cz.X);
cz.I = cz.V / cz.Z;
add('coil-num', num({
  stem: 'A coil of resistance 15 Ω and inductance 64 mH is connected to 230 V, 50 Hz mains. Find the rms current, in amperes (3 significant figures).',
  value: Number(dec(cz.I, 3)), tol: 0.02, unit: 'A',
  sol: r`$X_L = 2\pi \times 50 \times 0.064 \approx ${dec(cz.X, 4)}$ Ω; $Z = \sqrt{15^2 + ${dec(cz.X, 4)}^2} \approx ${dec(cz.Z, 4)}$ Ω; $I = \dfrac{230}{${dec(cz.Z, 4)}} = ${dec(cz.I, 3)}$ A.`,
  scheme: [['X_L ≈ 20.1 Ω and Z ≈ 25.1 Ω', 1], ['I ≈ 9.17 A', 1]],
  marks: 2, d: 3, c: 'application', t: [3],
}), (q) => near(cz.I, 9.1688, 1e-4) && q.answer.value === 9.17 || `cz ${cz.I}`);
const rcp = { R: 120, C: 15e-6 };
rcp.XC = 1 / (W(50) * rcp.C);
rcp.tan = rcp.XC / rcp.R;
rcp.phi = deg(Math.atan(rcp.tan));
add('RCphase-num', num({
  stem: 'A 120 Ω resistor is joined in series with a 15 μF capacitor across a 50 Hz supply. Find the phase angle between the current and the supply voltage, in degrees (3 significant figures).',
  value: Number(dec(rcp.phi, 3)), tol: 0.2, unit: '°',
  sol: r`$X_C = \dfrac{1}{2\pi \times 50 \times 15 \times 10^{-6}} \approx ${dec(rcp.XC, 4)}$ Ω; $\tan\phi = \dfrac{X_C}{R} = \dfrac{${dec(rcp.XC, 4)}}{120} \approx ${dec(rcp.tan, 4)}$, so $\phi = ${dec(rcp.phi, 3)}$°, the current leading.`,
  scheme: [['X_C ≈ 212 Ω', 1], ['tan φ = X_C/R, φ ≈ 60.5° (current leads)', 1]],
  marks: 2, d: 3, c: 'application', t: [3],
}), (q) => near(rcp.phi, 60.51, 1e-3) && q.answer.value === 60.5 || `rcp ${rcp.phi}`);
add('Vsupply-num', num({
  stem: 'In a series LCR circuit on an AC supply, ideal voltmeters read 60 V across the resistor, 140 V across the inductor and 60 V across the capacitor. Find the rms supply voltage, in volts.',
  value: 100, tol: 0.5, unit: 'V',
  sol: r`$V = \sqrt{V_R^2 + (V_L - V_C)^2} = \sqrt{60^2 + (140 - 60)^2} = \sqrt{3600 + 6400} = 100$ V (not the arithmetic sum, 260 V).`,
  scheme: [['V = √(60² + 80²) = 100 V', 1]],
  d: 3, c: 'application', t: [3],
}), (q) => near(Math.hypot(60, 80), 100) && q.answer.value === 100 || 'vs');
const fl = { Vdc: 12, Idc: 2, Vac: 12, Iac: 1.2 };
fl.R = fl.Vdc / fl.Idc;
fl.Z = fl.Vac / fl.Iac;
fl.X = Math.sqrt(fl.Z ** 2 - fl.R ** 2);
fl.L = fl.X / W(50);
fl.phi = deg(Math.atan(fl.X / fl.R));
add('findL-short3', short({
  marks: 3,
  stem: 'A coil connected to a 12 V DC supply draws 2.0 A. Connected instead to a 12 V (rms), 50 Hz supply, it draws 1.2 A. Find (a) its resistance, (b) its impedance and inductance on AC, (c) the phase angle between the current and the voltage on AC.',
  model: r`(a) On DC there is no reactance: $R = \dfrac{12}{2.0} = 6.0$ Ω.
(b) $Z = \dfrac{12}{1.2} = 10$ Ω, so $X_L = \sqrt{10^2 - 6.0^2} = 8.0$ Ω and $L = \dfrac{X_L}{2\pi f} = \dfrac{8.0}{2\pi \times 50} \approx ${dec(fl.L, 3)}$ H, i.e. about ${dec(fl.L * 1e3, 3)} mH.
(c) $\tan\phi = \dfrac{X_L}{R} = \dfrac{8.0}{6.0}$, so $\phi \approx ${dec(fl.phi, 3)}^\circ$, the current lagging.`,
  sol: 'DC gives R; AC gives Z.',
  scheme: [['R = 6.0 Ω from the DC test', 1], ['Z = 10 Ω, X_L = 8.0 Ω, L ≈ 25.5 mH', 1], ['φ ≈ 53.1°, current lags', 1]],
  d: 4, c: 'analysis', t: [3], wl: null,
}), () => fl.R === 6 && near(fl.Z, 10) && near(fl.X, 8) && near(fl.L, 0.025465, 1e-4) && near(fl.phi, 53.13, 1e-3) || `fl ${fl.L}`);
add('arith-ar', ar({
  a: 'In a series LCR circuit, the rms voltage across the inductor can be larger than the rms voltage of the supply.',
  r: 'The voltages across the inductor and the capacitor are in antiphase, so they partly cancel each other in the phasor sum.',
  key: 'a',
  sol: 'Both true, and R explains A: since $V_L$ and $V_C$ point in opposite directions on the phasor diagram, only their difference adds to $V_R$, so each of them separately can far exceed the supply voltage (most of all at resonance) — option (a).',
  d: 3, c: 'analysis', t: [3, 5],
}));
add('RLRC-short2', short({
  marks: 2,
  stem: 'Taking the current as the reference phasor, describe the phasor diagrams of a series RL circuit and of a series RC circuit. In each, state whether the current leads or lags the supply voltage and write tan φ.',
  model: '**RL:** $V_R$ along $I$, $V_L$ at 90° **ahead**; the supply voltage lies between them, so the current **lags** by φ with $\\tan\\phi = \\omega L/R$. **RC:** $V_R$ along $I$, $V_C$ at 90° **behind**; the supply voltage lies below $V_R$, so the current **leads** by φ with $\\tan\\phi = 1/(\\omega CR)$.',
  sol: 'V_L ahead of I, V_C behind I.',
  scheme: [['RL: V_L 90° ahead of I; current lags; tan φ = ωL/R', 1], ['RC: V_C 90° behind I; current leads; tan φ = 1/ωCR', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('Zderive-short3', short({
  marks: 3,
  stem: 'Using a phasor diagram, derive expressions for the impedance of a series LCR circuit and for the phase angle between the current and the supply voltage. When is such a circuit said to be inductive?',
  model: r`The same current $I$ flows through R, L and C, so take $I$ as reference. $V_R = IR$ is along $I$, $V_L = IX_L$ is 90° ahead and $V_C = IX_C$ is 90° behind. $V_L$ and $V_C$ are opposite, giving a net $V_L - V_C$ at right angles to $V_R$. The supply voltage is the resultant: $V^2 = V_R^2 + (V_L - V_C)^2 = I^2[R^2 + (X_L - X_C)^2]$, so $Z = \dfrac{V}{I} = \sqrt{R^2 + (X_L - X_C)^2}$ and $\tan\phi = \dfrac{V_L - V_C}{V_R} = \dfrac{X_L - X_C}{R}$. It is **inductive** when $X_L > X_C$: the voltage then leads the current.`,
  sol: 'Phasor sum of V_R and V_L − V_C.',
  scheme: [['Phasors: V_R along I, V_L ahead, V_C behind', 1], ['Z = √(R² + (X_L − X_C)²)', 1], ['tan φ = (X_L − X_C)/R; inductive when X_L > X_C', 1]],
  d: 3, c: 'understanding', t: [3], wl: null,
}));
const lc3 = { R: 35, L: 0.18, C: 120e-6, V: 230 };
lc3.XL = W(50) * lc3.L;
lc3.XC = 1 / (W(50) * lc3.C);
lc3.Z = Math.hypot(lc3.R, lc3.XL - lc3.XC);
lc3.I = lc3.V / lc3.Z;
lc3.phi = deg(Math.atan((lc3.XL - lc3.XC) / lc3.R));
add('lcrcalc-short3', short({
  marks: 3,
  stem: 'A 35 Ω resistor, a 0.18 H inductor and a 120 μF capacitor are joined in series across 230 V, 50 Hz mains. Find (a) the reactances, (b) the impedance and the rms current, (c) the phase angle, saying whether the current leads or lags.',
  model: r`(a) $X_L = 2\pi \times 50 \times 0.18 \approx ${dec(lc3.XL, 4)}$ Ω; $X_C = \dfrac{1}{2\pi \times 50 \times 120 \times 10^{-6}} \approx ${dec(lc3.XC, 4)}$ Ω.
(b) $Z = \sqrt{35^2 + (${dec(lc3.XL, 4)} - ${dec(lc3.XC, 4)})^2} \approx ${dec(lc3.Z, 4)}$ Ω; $I = \dfrac{230}{${dec(lc3.Z, 4)}} \approx ${dec(lc3.I, 3)}$ A.
(c) $\tan\phi = \dfrac{X_L - X_C}{R} \approx ${dec((lc3.XL - lc3.XC) / lc3.R, 3)}$, so $\phi \approx ${dec(lc3.phi, 3)}^\circ$; $X_L > X_C$, so the current **lags**.`,
  sol: 'Reactances, then Z = √(R² + (X_L − X_C)²).',
  scheme: [['X_L ≈ 56.5 Ω, X_C ≈ 26.5 Ω', 1], ['Z ≈ 46.1 Ω, I ≈ 4.99 A', 1], ['φ ≈ 40.6°, current lags', 1]],
  d: 3, c: 'application', t: [3], wl: null,
}), () => near(lc3.XL, 56.549, 1e-4) && near(lc3.XC, 26.526, 1e-4) && near(lc3.Z, 46.113, 1e-4) && near(lc3.I, 4.9878, 1e-4) && near(lc3.phi, 40.62, 1e-3) || `lc3 ${lc3.Z} ${lc3.phi}`);
add('freqresp-short3', short({
  marks: 3,
  stem: 'Describe, as you would sketch them on one set of axes, how the reactance of an inductor, the reactance of a capacitor and the impedance of a series LCR circuit containing both vary with the supply frequency. Mark where the impedance is least, and say how the current behaves there.',
  model: 'X_L = 2πfL is a **straight line through the origin**. X_C = 1/(2πfC) is a **rectangular hyperbola**, very large at low f and falling towards zero. Z is large at low f (capacitive), falls to a **least value R** at the frequency where the two reactance graphs **cross** (X_L = X_C, the resonant frequency), and rises again at high f (inductive), approaching the X_L line. Since I = V/Z, the current is **greatest** at that crossing and the circuit behaves as a pure resistance there.',
  sol: 'Line, hyperbola, and a curve with a minimum where they cross.',
  scheme: [['X_L straight line through origin; X_C hyperbola', 1], ['Z large at low and high f, least (= R) where X_L = X_C', 1], ['Current greatest there (I = V/Z)', 1]],
  d: 3, c: 'analysis', t: [2, 3],
}));

// ================================================================ t04 power, power factor, wattless current, choke coil
const pm = { V: 230, R: 100, X: 100 };
pm.PR = pm.V ** 2 / pm.R;
pm.PRL = (pm.V / Math.hypot(pm.R, pm.X)) ** 2 * pm.R;
add('pmax-mcq', mcq({
  stem: 'Each of the following loads is connected in turn to the same 230 V, 50 Hz mains. Which one takes the greatest average power?',
  right: 'a 100 Ω resistor alone',
  wrong: ['an ideal inductor of reactance 100 Ω alone', 'an ideal capacitor of reactance 100 Ω alone', 'the 100 Ω resistor in series with an ideal inductor of reactance 100 Ω'],
  sol: r`The ideal inductor and capacitor have power factor 0 and take no average power. The resistor alone takes $\dfrac{230^2}{100} = 529$ W. With the inductor in series, $Z \approx 141$ Ω, so $I \approx 1.63$ A and $P = I^2R \approx 265$ W, only half as much — option (@K).`,
  d: 2, c: 'understanding', t: [4],
}), () => near(pm.PR, 529) && near(pm.PRL, 264.5) || `pm ${pm.PRL}`);
const ck = { R: 1.5, X: 60 };
ck.pf = ck.R / Math.hypot(ck.R, ck.X);
add('chokepf-mcq', mcq({
  stem: 'A choke coil has a resistance of 1.5 Ω and a reactance of 60 Ω at 50 Hz. Its power factor is closest to',
  right: '0.025',
  wrong: ['0.25', '0.97', '1.0'],
  sol: r`$\cos\phi = \dfrac{R}{Z} = \dfrac{1.5}{\sqrt{1.5^2 + 60^2}} \approx \dfrac{1.5}{60.0} \approx 0.025$: almost all of its current is wattless, which is why a choke wastes so little power — option (@K).`,
  d: 3, c: 'application', t: [4],
}), () => near(ck.pf, 0.025, 0.01) || `ck ${ck.pf}`);
add('power-num', num({
  stem: 'A refrigerator compressor draws 3.2 A (rms) from 230 V mains at a power factor of 0.65. Find the average power it takes, in watts (3 significant figures).',
  value: 478, tol: 1, unit: 'W',
  sol: r`$P = V_\text{rms}I_\text{rms}\cos\phi = 230 \times 3.2 \times 0.65 = 478$ W (to 3 significant figures).`,
  scheme: [['P = VI cos φ ≈ 478 W', 1]],
  d: 2, c: 'application', t: [4],
}), (q) => near(230 * 3.2 * 0.65, 478.4) && q.answer.value === 478 || 'pw');
add('pf-num', num({
  stem: 'A series AC circuit has R = 21 Ω, X_L = 32 Ω and X_C = 12 Ω. Find its power factor (3 significant figures).',
  value: Number(dec(21 / 29, 3)), tol: 0.002, unit: '',
  sol: r`$Z = \sqrt{21^2 + (32 - 12)^2} = \sqrt{441 + 400} = 29$ Ω; $\cos\phi = \dfrac{R}{Z} = \dfrac{21}{29} = 0.724$.`,
  scheme: [['Z = 29 Ω, cos φ = R/Z ≈ 0.724', 1]],
  d: 2, c: 'application', t: [4],
}), (q) => near(Math.hypot(21, 20), 29) && q.answer.value === 0.724 || 'pf');
add('wattless-num', num({
  stem: 'An induction motor draws 8.0 A from the mains at a power factor of 0.60 (lagging). Find the wattless component of its current, in amperes.',
  value: 6.4, tol: 0.05, unit: 'A',
  sol: r`$\sin\phi = \sqrt{1 - 0.60^2} = 0.80$, so the wattless component is $I\sin\phi = 8.0 \times 0.80 = 6.4$ A (the active component is 4.8 A).`,
  scheme: [['sin φ = 0.80; I sin φ = 6.4 A', 1]],
  d: 3, c: 'application', t: [4],
}), () => near(8 * Math.sqrt(1 - 0.36), 6.4) || 'wl');
const pc = { R: 16, XL: 45, XC: 33, V: 120 };
pc.Z = Math.hypot(pc.R, pc.XL - pc.XC);
pc.I = pc.V / pc.Z;
pc.P = pc.I ** 2 * pc.R;
add('Pcircuit-num', num({
  stem: 'A series circuit with R = 16 Ω, X_L = 45 Ω and X_C = 33 Ω is connected to a 120 V rms supply. Find the average power it takes, in watts.',
  value: Number(dec(pc.P, 3)), tol: 2, unit: 'W',
  sol: r`$Z = \sqrt{16^2 + (45 - 33)^2} = \sqrt{256 + 144} = 20$ Ω; $I = \dfrac{120}{20} = 6.0$ A; $P = I^2R = 6.0^2 \times 16 = 576$ W.`,
  scheme: [['Z = 20 Ω, I = 6.0 A', 1], ['P = I²R = 576 W', 1]],
  marks: 2, d: 3, c: 'application', t: [4],
}), (q) => pc.Z === 20 && near(pc.P, 576) && q.answer.value === 576 || `pc ${pc.P}`);
add('wattless-ar', ar({
  a: 'A large wattless current drawn by a factory increases the energy wasted as heat in the supply cables.',
  r: 'Wattless current, being 90° out of phase with the voltage, does no work over a complete cycle.',
  key: 'b',
  sol: 'Both true, but R does not explain A: the cable loss is $I^2R$ for the whole current, wattless part included; R only explains why that part delivers no useful power to the factory — option (b).',
  d: 3, c: 'understanding', t: [4],
}));
add('pf-tf', tf({
  stem: 'As a series LCR circuit is tuned closer and closer to resonance, its power factor rises towards 1.',
  key: 't',
  sol: 'True. $\\cos\\phi = R/Z$, and $Z$ falls towards $R$ as $X_L - X_C$ approaches zero, so the power factor approaches 1.',
  d: 2, c: 'understanding', t: [4, 5],
}));
add('choke-short2', short({
  marks: 2,
  stem: 'Older fluorescent-tube fittings limit the current with a choke (a coil of large inductance and very small resistance) instead of a resistor. Explain why, referring to the power factor of the choke.',
  model: 'A choke’s reactance $\\omega L$ is large while its resistance is tiny, so its power factor $R/Z$ is **almost zero**: the current through it is nearly all **wattless**, and it limits the current while taking **almost no power**. A resistor would limit the current equally but would waste $I^2R$ as heat.',
  sol: 'Power factor near zero.',
  scheme: [['Large X_L, tiny R: power factor nearly zero', 1], ['Limits current with negligible power loss; a resistor wastes I²R', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('wattless-short2', short({
  marks: 2,
  stem: 'What is meant by wattless current? Under what condition is the whole current in an AC circuit wattless, and why is a large wattless current still undesirable for the supply company?',
  model: 'The component $I\\sin\\phi$ of the current at **90° to the voltage** delivers no average power: it is the **wattless current**. The whole current is wattless in a **purely inductive or purely capacitive** circuit (φ = 90°). It still **heats the supply lines** ($I^2R$ loss), so a power factor near 1 is preferred.',
  sol: 'I sin φ; φ = 90°; line loss.',
  scheme: [['I sin φ, in quadrature with V, does no work', 1], ['Wholly wattless for pure L or C; still causes I²R line loss', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('Pavg-short3', short({
  marks: 3,
  stem: 'Show that the average power taken by an AC circuit in which the current lags the voltage by φ is $V_\\text{rms}I_\\text{rms}\\cos\\phi$. Hence state the average power taken by an ideal inductor, giving a reason.',
  model: r`With $v = V_0\sin\omega t$ and $i = I_0\sin(\omega t - \phi)$, the instantaneous power is $p = vi = V_0I_0\sin\omega t\sin(\omega t - \phi) = \dfrac{V_0I_0}{2}[\cos\phi - \cos(2\omega t - \phi)]$. Over a complete cycle $\cos(2\omega t - \phi)$ averages to zero, so $P = \dfrac{V_0I_0}{2}\cos\phi = \dfrac{V_0}{\sqrt2}\dfrac{I_0}{\sqrt2}\cos\phi = V_\text{rms}I_\text{rms}\cos\phi$. For an ideal inductor $\phi = 90^\circ$, so $\cos\phi = 0$ and $P = 0$: the energy it stores in one quarter cycle is returned to the supply in the next.`,
  sol: 'Product-to-sum; the 2ωt term averages to zero.',
  scheme: [['p = vi written as (V₀I₀/2)[cos φ − cos(2ωt − φ)]', 1], ['Average: (V₀I₀/2) cos φ = V_rms I_rms cos φ', 1], ['Ideal inductor: φ = 90°, P = 0, energy returned', 1]],
  d: 3, c: 'understanding', t: [4], wl: null,
}));
const cc = { Vl: 60, I: 3, V: 230 };
cc.Rs = (cc.V - cc.Vl) / cc.I;
cc.waste = cc.I ** 2 * cc.Rs;
cc.Z = cc.V / cc.I;
cc.Rl = cc.Vl / cc.I;
cc.XL = Math.sqrt(cc.Z ** 2 - cc.Rl ** 2);
cc.L = cc.XL / W(50);
add('chokecalc-short3', short({
  marks: 3,
  stem: 'A lamp rated 60 V, 3.0 A is to be run from 230 V, 50 Hz mains. (a) What resistance placed in series would do, and how much power would it waste? (b) What inductance of a pure choke would do instead? (c) Why is the choke preferred?',
  model: r`(a) The resistor must drop $230 - 60 = 170$ V at 3.0 A: $R = \dfrac{170}{3.0} \approx ${dec(cc.Rs, 3)}$ Ω, wasting $I^2R = 3.0^2 \times ${dec(cc.Rs, 4)} \approx ${dec(cc.waste, 3)}$ W.
(b) Lamp resistance $\dfrac{60}{3.0} = 20$ Ω; total $Z = \dfrac{230}{3.0} \approx ${dec(cc.Z, 4)}$ Ω; $X_L = \sqrt{${dec(cc.Z, 4)}^2 - 20^2} \approx ${dec(cc.XL, 3)}$ Ω; $L = \dfrac{X_L}{2\pi \times 50} \approx ${dec(cc.L, 3)}$ H.
(c) A pure choke has power factor zero, so it controls the current while wasting **no power**, unlike the resistor.`,
  sol: 'Series resistor versus choke.',
  scheme: [['R ≈ 56.7 Ω, wasting about 510 W', 1], ['Z ≈ 76.7 Ω, X_L ≈ 74.0 Ω, L ≈ 0.236 H', 1], ['Choke wastes no power (power factor zero)', 1]],
  d: 3, c: 'application', t: [4], wl: null,
}), () => near(cc.Rs, 56.667, 1e-4) && near(cc.waste, 510) && near(cc.XL, 74.012, 1e-4) && near(cc.L, 0.23559, 1e-4) || `cc ${cc.L}`);

// ================================================================ t05 resonance, bandwidth, Q factor, LC oscillations
add('LhalfC-mcq', mcq({
  stem: 'In a series LCR circuit the inductance is doubled and the capacitance halved, the resistance staying the same. The resonant frequency and the Q factor become',
  right: 'unchanged, and twice as large',
  wrong: ['twice as large, and unchanged', 'unchanged, and half as large', 'half as large, and twice as large'],
  sol: r`$f_0 = \dfrac{1}{2\pi\sqrt{LC}}$: the product $LC$ is unchanged, so $f_0$ is unchanged. $Q = \dfrac{1}{R}\sqrt{\dfrac{L}{C}}$: $L/C$ becomes 4 times larger, so $Q$ doubles — option (@K).`,
  d: 4, c: 'analysis', t: [5],
}), () => near(Math.sqrt((2 * 1) / 0.5), 2) || 'lhc');
add('resP-mcq', mcq({
  stem: 'A series LCR circuit containing a 25 Ω resistor is connected to a 50 V rms supply whose frequency is adjusted to resonance. The average power it then takes is',
  right: '100 W',
  wrong: ['50 W', '2.0 W', 'zero, since the reactances cancel'],
  sol: r`At resonance $Z = R = 25$ Ω and the power factor is 1, so $I = \dfrac{50}{25} = 2.0$ A and $P = I^2R = 2.0^2 \times 25 = 100$ W — option (@K).`,
  d: 2, c: 'application', t: [5],
}), () => near((50 / 25) ** 2 * 25, 100) || 'resp');
const f0q = { L: 2.5e-3, C: 0.1e-6 };
f0q.f0 = 1 / (2 * Math.PI * Math.sqrt(f0q.L * f0q.C));
add('f0-num', num({
  stem: 'Find the resonant frequency of a series circuit containing a 2.5 mH inductor and a 0.10 μF capacitor, in kHz (3 significant figures).',
  value: Number(dec(f0q.f0 / 1e3, 3)), tol: 0.05, unit: 'kHz',
  sol: r`$LC = 2.5 \times 10^{-3} \times 0.10 \times 10^{-6} = 2.5 \times 10^{-10}$ s², so $f_0 = \dfrac{1}{2\pi\sqrt{LC}} \approx ${sci(f0q.f0, 3)}$ Hz, i.e. $${sci(f0q.f0, 3)} \times 10^{-3} = ${dec(f0q.f0 / 1e3, 3)}$ kHz.`,
  scheme: [['f₀ = 1/(2π√LC) ≈ 10.1 kHz', 1]],
  d: 2, c: 'application', t: [5],
}), (q) => near(f0q.f0, 10065.9, 1e-4) && q.answer.value === 10.1 || `f0 ${f0q.f0}`);
const tn = { L: 240e-6, f: 702e3 };
tn.C = 1 / (W(tn.f) ** 2 * tn.L);
add('tune-num', num({
  stem: 'The tuning circuit of a medium-wave radio has a coil of inductance 240 μH. What capacitance tunes it to a station broadcasting at 702 kHz? Give the answer in pF (3 significant figures).',
  value: Number(dec(tn.C * 1e12, 3)), tol: 1, unit: 'pF',
  sol: r`At resonance $C = \dfrac{1}{4\pi^2f^2L} = \dfrac{1}{4\pi^2 \times (702 \times 10^{3})^2 \times 240 \times 10^{-6}} \approx ${sci(tn.C, 3)}$ F, i.e. $${sci(tn.C, 3)} \times 10^{12} = ${dec(tn.C * 1e12, 3)}$ pF.`,
  scheme: [['C = 1/(4π²f²L)', 1], ['C ≈ 214 pF', 1]],
  marks: 2, d: 3, c: 'application', t: [5],
}), (q) => near(tn.C, 2.1416e-10, 1e-3) && q.answer.value === 214 || `tn ${tn.C}`);
const qf = { R: 5, L: 0.04, C: 0.25e-6 };
qf.w0 = 1 / Math.sqrt(qf.L * qf.C);
qf.Q = (qf.w0 * qf.L) / qf.R;
add('Q-num', num({
  stem: 'A series LCR circuit has R = 5.0 Ω, L = 40 mH and C = 0.25 μF. Find its Q factor.',
  value: Math.round(qf.Q), tol: 0.5, unit: '',
  sol: r`$\omega_0 = \dfrac{1}{\sqrt{LC}} = \dfrac{1}{\sqrt{0.040 \times 0.25 \times 10^{-6}}} = 10^{4}$ rad s$^{-1}$; $Q = \dfrac{\omega_0L}{R} = \dfrac{10^{4} \times 0.040}{5.0} = 80$.`,
  scheme: [['ω₀ = 10⁴ rad s⁻¹; Q = ω₀L/R = 80', 1]],
  d: 3, c: 'application', t: [5],
}), (q) => near(qf.w0, 1e4) && near(qf.Q, 80) && q.answer.value === 80 || `qf ${qf.Q}`);
add('bw-num', num({
  stem: 'A series resonant circuit has a resonant frequency of 1.2 kHz and a Q factor of 30. Find its bandwidth, in hertz.',
  value: 40, tol: 0.5, unit: 'Hz',
  sol: r`$Q = \dfrac{f_0}{\Delta f}$, so $\Delta f = \dfrac{1200}{30} = 40$ Hz.`,
  scheme: [['Δf = f₀/Q = 40 Hz', 1]],
  d: 2, c: 'application', t: [5],
}), () => near(1200 / 30, 40) || 'bw');
add('resR-ar', ar({
  a: 'The resonant frequency of a series LCR circuit increases when its resistance is reduced.',
  r: 'Reducing the resistance of a series LCR circuit increases the current at resonance.',
  key: 'd',
  sol: 'A is false: $f_0 = 1/(2\\pi\\sqrt{LC})$ does not depend on R. R is true: at resonance $I_0 = V/R$, which rises as R falls (the peak becomes taller and sharper) — option (d).',
  d: 3, c: 'understanding', t: [5],
}));
add('LC-tf', tf({
  stem: 'In an ideal LC circuit, at the instant the capacitor has no charge, the current in the coil is at its greatest.',
  key: 't',
  sol: 'True. When the capacitor is empty all the energy is magnetic, stored in the coil, so the current is at its maximum; it then goes on to charge the capacitor the other way.',
  d: 2, c: 'understanding', t: [5],
}));
add('Q-fill', fill({
  stem: 'For a series LCR circuit, the ratio ω₀/Δω of its resonant angular frequency to its bandwidth, which measures how sharp its resonance is, is called its ___ factor.',
  acc: [['quality', 'Q']],
  sol: 'Its **quality** (Q) factor: $Q = \\omega_0/\\Delta\\omega = \\omega_0L/R$.',
  d: 1, c: 'recall', t: [5],
}));
add('LCosc-short2', short({
  marks: 2,
  stem: 'A charged capacitor is connected across an ideal inductor. Describe qualitatively how energy is exchanged between them during one cycle, and state what the resistance of a real circuit does to the oscillations.',
  model: 'The capacitor discharges through the coil: its **electric** energy becomes **magnetic** energy in the coil, all of it when the capacitor is empty and the current greatest. The coil keeps the current flowing and recharges the capacitor the other way; then the process reverses. Resistance turns some energy into **heat** each cycle, so real oscillations **die away**.',
  sol: 'Electric ⇄ magnetic energy; damping.',
  scheme: [['Electric energy in C passes to magnetic energy in L and back', 1], ['Resistance dissipates energy: oscillations die away', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('sharp-short2', short({
  marks: 2,
  stem: 'Two series LCR circuits, X and Y, have the same L and C, but X has R = 10 Ω and Y has R = 50 Ω. Compare their resonant frequencies, currents at resonance on the same supply, and bandwidths. Which is better for a radio tuner, and why?',
  model: 'Both resonate at the **same** frequency, $1/(2\\pi\\sqrt{LC})$. At resonance $I = V/R$, so X carries **five times** the current of Y. Bandwidth R/L is five times smaller for X, giving a taller, **sharper** peak and a five times larger Q. **X** is better: it picks out one station and rejects its neighbours.',
  sol: 'Same f₀; I = V/R; Δω = R/L.',
  scheme: [['Same f₀; X has five times the current', 1], ['X has one fifth the bandwidth (larger Q): better selectivity', 1]],
  d: 3, c: 'evaluation', t: [5],
}));
const rs = { L: 0.8, C: 5e-6, R: 40, V: 20 };
rs.w0 = 1 / Math.sqrt(rs.L * rs.C);
rs.f0 = rs.w0 / (2 * Math.PI);
rs.I = rs.V / rs.R;
rs.XL = rs.w0 * rs.L;
rs.VL = rs.I * rs.XL;
add('resonance-short3', short({
  marks: 3,
  stem: 'A series circuit with L = 0.80 H, C = 5.0 μF and R = 40 Ω is driven by a 20 V rms source of variable frequency. (a) Find the resonant frequency. (b) Find the current and the voltage across the inductor at resonance. (c) Comment on the result of (b).',
  model: r`(a) $\omega_0 = \dfrac{1}{\sqrt{0.80 \times 5.0 \times 10^{-6}}} = 500$ rad s$^{-1}$, so $f_0 = \dfrac{500}{2\pi} \approx ${dec(rs.f0, 3)}$ Hz.
(b) $I = \dfrac{V}{R} = \dfrac{20}{40} = 0.50$ A; $X_L = \omega_0L = 500 \times 0.80 = 400$ Ω, so $V_L = 0.50 \times 400 = 200$ V.
(c) $V_L$ (and $V_C$) is **ten times** the supply voltage: the two cancel each other, and $Q = \omega_0L/R = 10$ is the voltage magnification at resonance.`,
  sol: 'ω₀ = 1/√LC; I = V/R; V_L = IX_L.',
  scheme: [['f₀ ≈ 79.6 Hz', 1], ['I = 0.50 A, V_L = 200 V', 1], ['V_L = QV, ten times the supply; V_L and V_C cancel', 1]],
  d: 3, c: 'application', t: [5], wl: null,
}), () => near(rs.w0, 500) && near(rs.f0, 79.577, 1e-4) && near(rs.VL, 200) || `rs ${rs.f0}`);

// ================================================================ t06 AC generator; AC and DC
add('fluxemf-mcq', mcq({
  stem: 'At the instant the magnetic flux through the turning coil of an AC generator is greatest, the emf induced in the coil is',
  right: 'zero, because the flux is not changing at that instant',
  wrong: ['greatest, because the flux is greatest', 'half its peak value', 'greatest, because the sides of the coil are then moving along the field'],
  sol: r`$e = -\dfrac{d\Phi}{dt}$. With $\Phi = NBA\cos\omega t$, the flux is greatest when $\cos\omega t = \pm1$, where its rate of change, and so the emf $NBA\omega\sin\omega t$, is zero; the sides of the coil are then moving along the field and cut no lines — option (@K).`,
  d: 2, c: 'understanding', t: [6],
}));
add('halfturns-mcq', mcq({
  stem: 'A generator coil is rewound with half as many turns of the same area and is then turned twice as fast in the same field. Compared with before, its peak emf and the frequency of its output are',
  right: 'unchanged, and doubled',
  wrong: ['doubled, and doubled', 'halved, and unchanged', 'unchanged, and unchanged'],
  sol: r`$e_0 = NBA\omega$: halving $N$ and doubling $\omega$ leaves $e_0$ unchanged. The frequency equals the number of turns of the coil per second, so it doubles — option (@K).`,
  d: 3, c: 'application', t: [6],
}), () => near(0.5 * 2, 1) || 'ht');
add('genfreq-mcq', mcq({
  stem: 'The coil of a two-pole AC generator in a small hydro-power station turns at 3000 revolutions per minute. The frequency of its output is',
  right: '50 Hz',
  wrong: ['3000 Hz', '100 Hz', '314 Hz'],
  sol: r`3000 revolutions per minute is $\dfrac{3000}{60} = 50$ revolutions per second, and the emf goes through one cycle per revolution: 50 Hz — option (@K).`,
  d: 2, c: 'understanding', t: [6],
}), () => near(3000 / 60, 50) || 'gf');
add('ACadv-mcq', mcq({
  stem: 'What is the main reason why electric power is generated and distributed as alternating current rather than direct current?',
  right: 'AC voltages can be stepped up and down efficiently by transformers, so power can be sent at high voltage with small line losses',
  wrong: ['AC is less dangerous than DC at the same rms voltage', 'AC can be stored in batteries more easily than DC', 'AC needs no insulation on its cables'],
  sol: 'Transformers work only with a changing current. Transmitting at high voltage means a small current and small $I^2R$ losses; the voltage is stepped down again near the consumer — option (@K).',
  d: 2, c: 'understanding', t: [6],
}));
const gs = { N: 250, A: 0.012, B: 0.35, e0: 300 };
gs.w = gs.e0 / (gs.N * gs.B * gs.A);
gs.n = gs.w / (2 * Math.PI);
add('genspeed-num', num({
  stem: 'A coil of 250 turns, each of area 0.012 m², turns about an axis perpendicular to a uniform field of 0.35 T. How many revolutions per second must it make to give a peak emf of 300 V? (3 significant figures)',
  value: Number(dec(gs.n, 3)), tol: 0.1, unit: 'rev s⁻¹',
  sol: r`$e_0 = NBA\omega$, so $\omega = \dfrac{e_0}{NBA} = \dfrac{300}{250 \times 0.35 \times 0.012} \approx ${dec(gs.w, 4)}$ rad s$^{-1}$, and $n = \dfrac{\omega}{2\pi} = \dfrac{${dec(gs.w, 4)}}{2\pi} = ${dec(gs.n, 3)}$ revolutions per second.`,
  scheme: [['ω = e₀/NBA ≈ 285.7 rad s⁻¹', 1], ['n = ω/2π ≈ 45.5 rev s⁻¹', 1]],
  marks: 2, d: 3, c: 'analysis', t: [6],
}), (q) => near(gs.w, 285.714, 1e-5) && q.answer.value === 45.5 || `gs ${gs.n}`);
const gr = { N: 60, a: 0.1, b: 0.05, rpm: 1500, B: 0.8 };
gr.A = gr.a * gr.b;
gr.w = (2 * Math.PI * gr.rpm) / 60;
gr.e0 = gr.N * gr.B * gr.A * gr.w;
gr.rms = gr.e0 / Math.SQRT2;
add('genrms-num', num({
  stem: 'A rectangular coil of 60 turns, each 10 cm × 5.0 cm, rotates at 1500 revolutions per minute about an axis perpendicular to a uniform magnetic field of 0.80 T. Find the rms value of the emf induced in it, in volts (3 significant figures).',
  value: Number(dec(gr.rms, 3)), tol: 0.1, unit: 'V',
  sol: r`$A = 0.10 \times 0.050 = 5.0 \times 10^{-3}$ m²; $\omega = 2\pi \times \dfrac{1500}{60} \approx ${dec(gr.w, 4)}$ rad s$^{-1}$; $e_0 = NBA\omega = 60 \times 0.80 \times 5.0 \times 10^{-3} \times ${dec(gr.w, 4)} \approx ${dec(gr.e0, 4)}$ V; $e_\text{rms} = \dfrac{${dec(gr.e0, 4)}}{\sqrt2} = ${dec(gr.rms, 3)}$ V.`,
  scheme: [['e₀ = NBAω ≈ 37.7 V', 1], ['e_rms = e₀/√2 ≈ 26.7 V', 1]],
  marks: 2, d: 3, c: 'application', t: [6],
}), (q) => near(gr.e0, 37.699, 1e-4) && q.answer.value === 26.7 || `gr ${gr.rms}`);
const ins = { e0: 240, plane: 30 };
ins.theta = 90 - ins.plane;
ins.e = ins.e0 * Math.sin(rad(ins.theta));
add('inst-num', num({
  stem: 'The peak emf of an AC generator is 240 V. Find the instantaneous emf at the moment the plane of its coil makes an angle of 30° with the magnetic field, in volts (3 significant figures).',
  value: Number(dec(ins.e, 3)), tol: 1, unit: 'V',
  sol: r`$e = e_0\sin\theta$, where θ is the angle between the **normal** to the coil and the field. With the plane at 30° to the field, the normal is at 60°, so $e = 240 \times 0.866 = ${dec(ins.e, 3)}$ V.`,
  scheme: [['θ (normal to B) = 60°', 1], ['e = 240 sin 60° ≈ 208 V', 1]],
  marks: 2, d: 4, c: 'analysis', t: [6],
}), (q) => near(ins.e, 207.85, 1e-4) && q.answer.value === 208 || `ins ${ins.e}`);
add('gen-ar', ar({
  a: 'The emf of an AC generator with slip rings has a frequency equal to the number of rotations its coil makes each second.',
  r: 'The emf of an AC generator is greatest at the instant the flux through its coil is greatest.',
  key: 'c',
  sol: 'A is true: the emf $NBA\\omega\\sin\\omega t$ goes through one cycle per rotation. R is false: the emf is greatest when the flux is zero (plane along the field), where the flux changes fastest — option (c).',
  d: 3, c: 'understanding', t: [6],
}));
add('ACDC-short2', short({
  marks: 2,
  stem: 'State two differences between alternating current and direct current, and give one advantage of each over the other.',
  model: '(i) AC **reverses direction** periodically (50 times a second in India) and its value keeps changing; DC flows in **one direction**, usually steady. (ii) AC voltage is easily **stepped up or down by transformers**; DC voltage is not. **Advantage of AC:** efficient long-distance transmission at high voltage. **Advantage of DC:** it can **charge batteries** and is used for electroplating.',
  sol: 'Direction; transformability; uses.',
  scheme: [['Two differences (direction, transformers, frequency)', 1], ['One advantage of each', 1]],
  d: 1, c: 'recall', t: [6],
}));
add('gen-short3', short({
  marks: 3,
  stem: 'State the principle of an AC generator. Name its main parts and give the function of the slip rings and the brushes. Explain why the emf it produces alternates.',
  model: '**Principle:** electromagnetic induction — when a coil turns in a magnetic field, the flux linked with it changes and an emf is induced. **Parts:** armature coil, field magnet, slip rings and carbon brushes. The **slip rings**, fixed to the axle and joined to the coil’s ends, turn with it; the **brushes** press on them and connect the turning coil to the external circuit. Every half turn each side of the coil reverses its direction of motion across the field, so the induced emf **reverses**: it varies as NBAω sin ωt.',
  sol: 'EMI; slip rings and brushes; reversal every half turn.',
  scheme: [['Principle: electromagnetic induction in a rotating coil', 1], ['Parts and the function of slip rings and brushes', 1], ['Emf reverses every half turn: sinusoidal', 1]],
  d: 2, c: 'understanding', t: [6],
}));

// ================================================================ 5-mark questions (in parts)
const rl = { C: 25e-6, V: 230 };
rl.XC = 1 / (W(50) * rl.C);
rl.I = rl.V / rl.XC;
rl.I0 = rl.I * Math.SQRT2;
add('rms-long', long({
  stem: '(a) Show that the rms value of a sinusoidal current $i = I_0\\sin\\omega t$ is $I_0/\\sqrt2$. [2] (b) Write the mean value of this current over a half cycle and explain why its mean over a full cycle is not used. [1] (c) A 25 μF capacitor is connected to 230 V, 50 Hz mains. Find its reactance and the rms and peak values of the current. [2]',
  model: r`(a) The rms value is the square root of the mean of $i^2$ over a cycle. $\overline{i^2} = \dfrac{1}{T}\int_0^T I_0^2\sin^2\omega t\,dt = \dfrac{I_0^2}{T}\int_0^T \dfrac{1 - \cos 2\omega t}{2}\,dt = \dfrac{I_0^2}{2}$, because $\cos 2\omega t$ averages to zero over a cycle. So $I_\text{rms} = I_0/\sqrt2$.

(b) $\bar I = 2I_0/\pi \approx 0.637\,I_0$ over a half cycle. Over a full cycle the positive and negative halves cancel, so the mean is always zero and gives no information.

(c) $X_C = \dfrac{1}{2\pi \times 50 \times 25 \times 10^{-6}} \approx ${dec(rl.XC, 4)}$ Ω; $I_\text{rms} = \dfrac{230}{${dec(rl.XC, 4)}} \approx ${dec(rl.I, 3)}$ A; $I_0 = \sqrt2 \times ${dec(rl.I, 3)} \approx ${dec(rl.I0, 3)}$ A.`,
  sol: 'Mean of sin² = 1/2; 2I₀/π; X_C = 1/(2πfC).',
  scheme: [['Mean of i² over a cycle = I₀²/2', 1], ['I_rms = I₀/√2', 1], ['Half-cycle mean 2I₀/π; full-cycle mean zero', 1], ['X_C ≈ 127 Ω', 1], ['I_rms ≈ 1.81 A, I₀ ≈ 2.55 A', 1]],
  d: 3, c: 'application', t: [1, 2], wl: null,
}), () => near(rl.XC, 127.32, 1e-4) && near(rl.I, 1.8064, 1e-4) && near(rl.I0, 2.5546, 1e-4) || `rl ${rl.I0}`);
const lg = { R: 55, L: 0.25, C: 30e-6, V: 230 };
lg.XL = W(50) * lg.L;
lg.XC = 1 / (W(50) * lg.C);
lg.Z = Math.hypot(lg.R, lg.XL - lg.XC);
lg.I = lg.V / lg.Z;
lg.phi = deg(Math.atan(Math.abs(lg.XL - lg.XC) / lg.R));
lg.pf = lg.R / lg.Z;
lg.P = lg.I ** 2 * lg.R;
add('lcr-long', long({
  stem: '(a) Describe the phasor diagram of a series LCR circuit and use it to obtain the impedance of the circuit. [2] (b) A 55 Ω resistor, a 0.25 H inductor and a 30 μF capacitor are joined in series across 230 V, 50 Hz mains. Find (i) the impedance, (ii) the rms current and whether it leads or lags the voltage, (iii) the power factor and the average power. [3]',
  model: r`(a) The current $I$ is common, so it is the reference. $V_R = IR$ lies along $I$, $V_L = IX_L$ is 90° ahead and $V_C = IX_C$ is 90° behind. $V_L$ and $V_C$ combine to $V_L - V_C$ at right angles to $V_R$, so $V^2 = V_R^2 + (V_L - V_C)^2$ and $Z = V/I = \sqrt{R^2 + (X_L - X_C)^2}$, with $\tan\phi = (X_L - X_C)/R$.

(b)(i) $X_L = 2\pi \times 50 \times 0.25 \approx ${dec(lg.XL, 4)}$ Ω, $X_C = \dfrac{1}{2\pi \times 50 \times 30 \times 10^{-6}} \approx ${dec(lg.XC, 4)}$ Ω, so $Z = \sqrt{55^2 + (${dec(lg.XL, 4)} - ${dec(lg.XC, 4)})^2} \approx ${dec(lg.Z, 4)}$ Ω.
(ii) $I = \dfrac{230}{${dec(lg.Z, 4)}} \approx ${dec(lg.I, 3)}$ A. $X_C > X_L$, so the circuit is capacitive and the current **leads**, by $\phi \approx ${dec(lg.phi, 3)}^\circ$.
(iii) $\cos\phi = \dfrac{R}{Z} = \dfrac{55}{${dec(lg.Z, 4)}} \approx ${dec(lg.pf, 3)}$; $P = I^2R \approx ${dec(lg.I, 3)}^2 \times 55 \approx ${dec(lg.P, 3)}$ W.`,
  sol: 'Phasor sum; reactances; Z; I; cos φ = R/Z; P = I²R.',
  scheme: [['Phasor diagram described: V_R along I, V_L ahead, V_C behind', 1], ['Z = √(R² + (X_L − X_C)²) obtained', 1], ['X_L ≈ 78.5 Ω, X_C ≈ 106 Ω, Z ≈ 61.5 Ω', 1], ['I ≈ 3.74 A, leading (capacitive)', 1], ['cos φ ≈ 0.894, P ≈ 769 W', 1]],
  d: 3, c: 'application', t: [3, 4], wl: null,
}), () => near(lg.XL, 78.540, 1e-4) && near(lg.XC, 106.10, 1e-4) && near(lg.Z, 61.522, 1e-4) && near(lg.I, 3.7385, 1e-3) && near(lg.pf, 0.894, 1e-3) && near(lg.P, 768.7, 1e-3) || `lg ${lg.Z} ${lg.P}`);
const cl = { I: 5, V: 230, P: 400 };
cl.pf = cl.P / (cl.V * cl.I);
cl.R = cl.P / cl.I ** 2;
cl.Z = cl.V / cl.I;
cl.XL = Math.sqrt(cl.Z ** 2 - cl.R ** 2);
cl.L = cl.XL / W(50);
add('coil-long', long({
  stem: '(a) Define power factor and wattless current. [1] (b) Why is a choke coil preferred to a resistor for limiting an alternating current? [1] (c) A coil draws 5.0 A from 230 V, 50 Hz mains and consumes 400 W. Find (i) its power factor, (ii) its resistance and impedance, (iii) its inductance. [3]',
  model: r`(a) The power factor is $\cos\phi = P/(V_\text{rms}I_\text{rms})$, equal to $R/Z$ for a series circuit. Wattless current is the component $I\sin\phi$ of the current at 90° to the voltage, which delivers no average power.

(b) A choke has a large reactance and almost no resistance, so its power factor is nearly zero: it limits the current while wasting almost no energy, whereas a resistor wastes $I^2R$ as heat.

(c)(i) $\cos\phi = \dfrac{P}{VI} = \dfrac{400}{230 \times 5.0} \approx ${dec(cl.pf, 3)}$.
(ii) $R = \dfrac{P}{I^2} = \dfrac{400}{25} = 16$ Ω; $Z = \dfrac{230}{5.0} = 46$ Ω.
(iii) $X_L = \sqrt{46^2 - 16^2} = \sqrt{1860} \approx ${dec(cl.XL, 4)}$ Ω, so $L = \dfrac{X_L}{2\pi \times 50} \approx ${dec(cl.L, 3)}$ H.`,
  sol: 'cos φ = P/VI; R = P/I²; Z = V/I; X_L from Z and R.',
  scheme: [['Definitions of power factor and wattless current', 1], ['Choke: power factor nearly zero, negligible loss', 1], ['cos φ ≈ 0.348', 1], ['R = 16 Ω, Z = 46 Ω', 1], ['X_L ≈ 43.1 Ω, L ≈ 0.137 H', 1]],
  d: 4, c: 'analysis', t: [3, 4], wl: null,
}), () => near(cl.pf, 0.34783, 1e-4) && cl.R === 16 && cl.Z === 46 && near(cl.XL, 43.128, 1e-4) && near(cl.L, 0.13728, 1e-4) || `cl ${cl.L}`);
const rz = { L: 0.2, C: 2e-6, R: 25, V: 10 };
rz.w0 = 1 / Math.sqrt(rz.L * rz.C);
rz.f0 = rz.w0 / (2 * Math.PI);
rz.I = rz.V / rz.R;
rz.Q = (rz.w0 * rz.L) / rz.R;
rz.dw = rz.R / rz.L;
rz.df = rz.dw / (2 * Math.PI);
add('resonance-long', long({
  stem: '(a) State the condition for resonance in a series LCR circuit and obtain an expression for its resonant frequency. [1] (b) A circuit with L = 0.20 H, C = 2.0 μF and R = 25 Ω is driven by a 10 V rms source of variable frequency. Find (i) the resonant frequency, (ii) the rms current at resonance, (iii) the Q factor and the bandwidth in hertz. [3] (c) Describe, without equations, what happens to the energy in an LC circuit after its charged capacitor is connected across the coil. [1]',
  model: r`(a) Resonance occurs when $X_L = X_C$, i.e. $\omega L = \dfrac{1}{\omega C}$, giving $\omega_0 = \dfrac{1}{\sqrt{LC}}$ and $f_0 = \dfrac{1}{2\pi\sqrt{LC}}$; then $Z = R$.

(b)(i) $\omega_0 = \dfrac{1}{\sqrt{0.20 \times 2.0 \times 10^{-6}}} \approx ${dec(rz.w0, 4)}$ rad s$^{-1}$, so $f_0 \approx ${dec(rz.f0, 3)}$ Hz.
(ii) $I = \dfrac{V}{R} = \dfrac{10}{25} = 0.40$ A.
(iii) $Q = \dfrac{\omega_0L}{R} \approx \dfrac{${dec(rz.w0, 4)} \times 0.20}{25} \approx ${dec(rz.Q, 3)}$; $\Delta\omega = \dfrac{R}{L} = \dfrac{25}{0.20} = 125$ rad s$^{-1}$, so $\Delta f = \dfrac{125}{2\pi} \approx ${dec(rz.df, 3)}$ Hz.

(c) The capacitor discharges through the coil, so its electric energy turns into magnetic energy in the coil; the coil then recharges the capacitor the opposite way, and the energy keeps passing back and forth, slowly lost as heat in any resistance.`,
  sol: 'X_L = X_C; I = V/R; Q = ω₀L/R; Δω = R/L.',
  scheme: [['X_L = X_C and f₀ = 1/(2π√LC)', 1], ['f₀ ≈ 252 Hz', 1], ['I = 0.40 A', 1], ['Q ≈ 12.6, Δf ≈ 19.9 Hz', 1], ['Energy exchanged between C and L; damped by resistance', 1]],
  d: 3, c: 'application', t: [5], wl: null,
}), () => near(rz.w0, 1581.14, 1e-5) && near(rz.f0, 251.65, 1e-4) && near(rz.Q, 12.649, 1e-4) && near(rz.df, 19.894, 1e-4) || `rz ${rz.Q}`);
const gl = { N: 120, A: 0.025, B: 0.25, n: 50, t: 1 / 600 };
gl.w = 2 * Math.PI * gl.n;
gl.e0 = gl.N * gl.B * gl.A * gl.w;
gl.rms = gl.e0 / Math.SQRT2;
gl.e = gl.e0 * Math.sin(gl.w * gl.t);
add('generator-long', long({
  stem: '(a) Explain, with a labelled diagram (described in words), the construction and working of an AC generator. [2] (b) Derive the expression for the emf induced in its coil as it turns with angular speed ω. [1] (c) A coil of 120 turns, each of area 0.025 m², turns at 50 revolutions per second in a uniform field of 0.25 T. Find the peak and rms emf, and the emf 1/600 s after the plane of the coil is perpendicular to the field. [2]',
  model: r`(a) An armature coil of many turns on a soft-iron core is mounted on an axle between the poles of a strong field magnet, its axis of rotation perpendicular to the field. Its two ends are joined to two slip rings on the axle; carbon brushes press on the rings and lead to the external circuit. A turbine turns the coil, the flux through it changes continuously, and an alternating emf is induced (electromagnetic induction).

(b) If the normal to the coil is along B at $t = 0$, then at time $t$ the angle is $\omega t$ and $\Phi = NBA\cos\omega t$; so $e = -\dfrac{d\Phi}{dt} = NBA\omega\sin\omega t = e_0\sin\omega t$.

(c) $\omega = 2\pi \times 50 \approx 314.2$ rad s$^{-1}$; $e_0 = NBA\omega = 120 \times 0.25 \times 0.025 \times 314.2 \approx ${dec(gl.e0, 4)}$ V; $e_\text{rms} = e_0/\sqrt2 \approx ${dec(gl.rms, 4)}$ V. At $t = \dfrac{1}{600}$ s, $\omega t = \dfrac{2\pi \times 50}{600} = \dfrac{\pi}{6}$, so $e = e_0\sin 30^\circ \approx ${dec(gl.e, 4)}$ V.`,
  sol: 'Construction; Φ = NBA cos ωt; e = NBAω sin ωt.',
  scheme: [['Construction: armature, field magnet, slip rings, brushes', 1], ['Working: rotation changes the flux; alternating emf induced', 1], ['Φ = NBA cos ωt, e = NBAω sin ωt', 1], ['e₀ ≈ 236 V, e_rms ≈ 167 V', 1], ['ωt = π/6, e ≈ 118 V', 1]],
  d: 3, c: 'application', t: [6], wl: null,
}), () => near(gl.e0, 235.62, 1e-4) && near(gl.rms, 166.61, 1e-4) && near(gl.e, 117.81, 1e-4) || `gl ${gl.e0}`);
