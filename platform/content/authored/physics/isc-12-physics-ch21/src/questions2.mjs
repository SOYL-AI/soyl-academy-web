// ISC 12 Physics ch21 Semiconductor Electronics — question bank part 2 (t04 rectifiers, t05 LED, photodiode and solar cell,
// t06 the Zener diode and its use as a voltage regulator), ISC style. Constants as stated in the stems: hc = 1240 eV nm,
// 1 eV = 1.6 × 10⁻¹⁹ J, silicon diode drop 0.7 V, mains 230 V, 50 Hz. Numbers computed here and re-solved independently:
// rectifier conduction by sampling the waveform, ripple by a constant-current capacitor simulation, the Zener regulator
// by bisection on the output node with a very small Zener slope resistance, photon rates from h, c and e.
// The bridge rectifier (four diodes) is an ISC removed topic and is not examined.
import { mk, add, r, dec, sci, near } from '../../isc-12-physics-ch01/src/lib.mjs';
import { HC, VSI, QE, cutoff, photonEv, zreg, peak, hwFrac, hwOut, fwOut } from './svgs.mjs';

const { mcq, ar, tf, fill, match, num, short, long } = mk;
const HCTXT = '(hc = 1240 eV nm)';

/** Ripple (peak to peak) of a capacitor-input filter with a constant-current load, ideal diodes, by time stepping. */
function ripplePeakToPeak({ Vm, f, I, C, full }) {
  const dt = 2e-6;
  let vc = 0;
  let vmin = Infinity;
  let vmax = 0;
  const T = 1 / f;
  for (let t = 0; t < 12 * T; t += dt) {
    const s = Vm * Math.sin(2 * Math.PI * f * t);
    const src = full ? Math.abs(s) : Math.max(0, s);
    vc = src > vc ? src : Math.max(0, vc - (I / C) * dt);
    if (t > 8 * T) {
      vmin = Math.min(vmin, vc);
      vmax = Math.max(vmax, vc);
    }
  }
  return vmax - vmin;
}
/** Independent Zener-regulator solution: bisection on the output node, the Zener modelled with a tiny slope resistance. */
function zenerNode({ Vin, Rs, Vz, RL }, rz = 0.01) {
  const f = (V) => (Vin - V) / Rs - V / RL - Math.max(0, V - Vz) / rz;
  let lo = 0;
  let hi = Vin;
  for (let i = 0; i < 200; i++) {
    const mid = (lo + hi) / 2;
    if (f(mid) > 0) lo = mid;
    else hi = mid;
  }
  const V = (lo + hi) / 2;
  return { V, Iz: Math.max(0, V - Vz) / rz, IL: V / RL, Is: (Vin - V) / Rs };
}
/** Fraction of a cycle during which a half-wave rectifier conducts, found by sampling the waveform. */
function sampledFraction(Vm, Vd) {
  let n = 0;
  const N = 360000;
  for (let k = 0; k < N; k++) if (Vm * Math.sin((2 * Math.PI * k) / N) > Vd) n++;
  return n / N;
}
const photonRate = (powerW, nm) => powerW / (((6.626e-34 * 2.998e8) / (nm * 1e-9)));

// ================================================================ t04 diode as a rectifier
add('hwfreq-mcq', mcq({
  stem: 'A half-wave rectifier is supplied through a transformer from a function generator set to 40 Hz. The pulsating voltage across the load has a frequency of',
  right: '40 Hz',
  wrong: ['20 Hz', '80 Hz', 'zero, since the output is direct'],
  sol: 'A half-wave rectifier passes one positive half-cycle in each cycle of the input, so it gives one output pulse per input cycle: the pulses repeat at the input frequency, 40 Hz — option (@K). The output is unidirectional but not steady, so its frequency is not zero.',
  d: 2, c: 'understanding', t: [4],
}));
add('fwfreq-mcq', mcq({
  stem: 'The two-diode full-wave rectifier of a bench supply is driven from the same 40 Hz source. The frequency of the ripple in its unfiltered output is',
  right: '80 Hz',
  wrong: ['40 Hz', '20 Hz', '160 Hz'],
  sol: 'Each input cycle has two half-cycles, and the two diodes take them in turn, so the load receives two pulses per input cycle: 2 × 40 = 80 Hz — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('ct-mcq', mcq({
  stem: 'In the two-diode full-wave rectifier, the centre tap of the transformer secondary is needed to',
  right: 'provide two voltages equal in size and opposite in phase, so that each diode conducts in alternate half-cycles',
  wrong: ['reduce the peak voltage of the secondary to half its value', 'allow one diode to do the work of both', 'make the current pass through the load in both directions'],
  sol: 'With respect to the tap, the two ends of the secondary are at equal and opposite voltages. When one end is positive its diode conducts, and in the next half-cycle the other end is positive and the other diode conducts; both send current the same way through the load — option (@K).',
  d: 1, c: 'understanding', t: [4],
}));
add('pivct-mcq', mcq({
  stem: 'Each half of the centre-tapped secondary of a full-wave rectifier gives a peak voltage V_m. Taking the diodes as ideal, the greatest reverse voltage across the diode that is not conducting is',
  right: '$2V_m$',
  wrong: ['$V_m$', '$\\dfrac{V_m}{2}$', '$\\sqrt{2}\\,V_m$'],
  sol: r`When D₁ conducts at the peak, its cathode is at $+V_m$ above the tap (the ideal diode has no drop). The other end of the secondary is at $-V_m$, the anode of D₂, and its cathode is joined to D₁'s cathode at $+V_m$. So D₂ has $V_m - (-V_m) = 2V_m$ across it, in reverse — option (@K).`,
  d: 4, c: 'analysis', t: [4],
}));
add('smooth-mcq', mcq({
  stem: 'A large capacitor is connected across the load of a rectifier. It smooths the output mainly because',
  right: 'it charges to the peak while the diode conducts and supplies the load as it discharges slowly when the diode stops conducting',
  wrong: ['it converts the pulsating voltage into an alternating voltage of higher frequency', 'it raises the output voltage well above the peak of the secondary voltage', 'it makes the diode conduct during the whole of each cycle'],
  sol: 'The capacitor charges up to about the peak voltage while the diode conducts. When the input falls below that, the diode stops conducting and the capacitor keeps supplying the load, discharging only slowly through it until the next peak recharges it — option (@K). Its peak is a little below the secondary peak, not above.',
  d: 2, c: 'understanding', t: [4],
}));
add('reversed-mcq', mcq({
  stem: 'In a half-wave rectifier circuit the diode is accidentally connected the other way round. The output across the load will then be',
  right: 'pulses of opposite polarity, formed from the negative half-cycles of the input',
  wrong: ['zero, since the diode now blocks both half-cycles', 'the same as before, since the transformer supplies alternating current', 'an alternating voltage of the same size as the input'],
  sol: 'A diode conducts when its anode is positive with respect to its cathode. Reversed, it now conducts in the half-cycles for which the secondary terminal is negative, so the load receives the negative half-cycles as unidirectional pulses, with the opposite polarity — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('unfiltered-tf', tf({
  stem: 'The output of a rectifier that has no filter is a steady direct voltage with no variation.',
  key: 'f',
  sol: 'False. The output is unidirectional but pulsating: it falls to zero (or nearly zero) between the pulses, so it needs a filter such as a capacitor to make it nearly steady.',
  d: 1, c: 'understanding', t: [4],
}));
add('ct-fill', fill({
  stem: 'The full-wave circuit that uses two diodes and a transformer whose secondary has a middle terminal joined to the load is called the ___ rectifier.',
  acc: [['centre-tap', 'centre tap', 'center-tap', 'center tap']],
  sol: 'The **centre-tap** full-wave rectifier.',
  d: 1, c: 'understanding', t: [4],
}));
add('fwsmooth-ar', ar({
  a: 'With the same capacitor and the same load current, a full-wave rectifier gives a smaller ripple than a half-wave rectifier.',
  r: 'In a full-wave rectifier the capacitor has only half as long to discharge between successive peaks.',
  key: 'a',
  sol: 'Both are true, and R explains A: the peaks come every 10 ms instead of every 20 ms on 50 Hz mains, so the capacitor loses half as much charge (ΔV = I t/C) before it is topped up — option (a).',
  d: 3, c: 'analysis', t: [4],
}));
const hp = { rms: 9.0 };
hp.Vm = peak(hp.rms);
hp.out = hp.Vm - VSI;
add('hwpeak-num', num({
  stem: 'The secondary of a transformer supplies 9.0 V (r.m.s.) to a half-wave rectifier that has one silicon diode, which drops 0.7 V when it conducts. Find the peak voltage across the load, in V, to 3 significant figures.',
  value: Number(dec(hp.out, 3)), tol: 0.05, unit: 'V',
  sol: r`Peak secondary voltage $V_m = 9.0 \times \sqrt{2} = ${dec(hp.Vm, 4)}$ V. The diode drops 0.7 V, so the peak load voltage is $${dec(hp.Vm, 4)} - 0.7 = ${dec(hp.out, 4)}$ V $\approx ${dec(hp.out, 3)}$ V.`,
  scheme: [['V_m = 9.0 × √2 = 12.73 V', 1], ['Peak load voltage = 12.73 − 0.7 = 12.0 V', 1]],
  marks: 2, d: 2, c: 'application', t: [4],
}), (q) => near(Math.max(...Array.from({ length: 3600 }, (_, k) => hwOut(9.0 * Math.SQRT2 * Math.sin((2 * Math.PI * k) / 3600), 0.7))), q.answer.value, 0.005) || 'hwpeak');
const fp = { rms: 15 };
fp.Vm = peak(fp.rms);
fp.out = fp.Vm - VSI;
add('fwpeak-num', num({
  stem: 'A 15-0-15 V centre-tap transformer (each half of the secondary gives 15 V r.m.s.) feeds a full-wave rectifier with two silicon diodes, each dropping 0.7 V when it conducts. Find the peak voltage across the load, in V (3 significant figures).',
  value: Number(dec(fp.out, 3)), tol: 0.05, unit: 'V',
  sol: r`Only one diode conducts at a time, fed by one half of the secondary: $V_m = 15 \times \sqrt{2} = ${dec(fp.Vm, 4)}$ V. The peak load voltage is $${dec(fp.Vm, 4)} - 0.7 = ${dec(fp.out, 4)}$ V $\approx ${dec(fp.out, 3)}$ V.`,
  scheme: [['One half of the secondary feeds one diode: V_m = 15√2 = 21.2 V', 1], ['Peak load voltage = 21.2 − 0.7 = 20.5 V', 1]],
  marks: 2, d: 3, c: 'application', t: [4],
}), (q) => near(Math.max(...Array.from({ length: 3600 }, (_, k) => fwOut(15 * Math.SQRT2 * Math.sin((2 * Math.PI * k) / 3600), 0.7))), q.answer.value, 0.005) || 'fwpeak');
const rp = { f: 50, I: 0.040, C: 2200e-6 };
rp.dV = rp.I / (2 * rp.f * rp.C);
add('ripple-num', num({
  stem: 'A full-wave rectifier running on 50 Hz mains has a 2200 μF capacitor across its load, which draws a steady 40 mA. Assuming that the capacitor discharges at constant current for the whole interval between successive peaks, find the peak-to-peak ripple voltage, in V (2 significant figures).',
  value: Number(dec(rp.dV, 2)), tol: 0.01, unit: 'V',
  sol: r`The ripple frequency is $2 \times 50 = 100$ Hz, so the capacitor discharges for $t = \dfrac{1}{100} = 0.010$ s. $\Delta V = \dfrac{I t}{C} = \dfrac{0.040 \times 0.010}{2200 \times 10^{-6}} = ${dec(rp.dV, 3)}$ V $\approx ${dec(rp.dV, 2)}$ V.`,
  scheme: [['Discharge time = 1/(2f) = 0.010 s', 1], ['ΔV = I t/C = 0.18 V', 1]],
  marks: 2, d: 3, c: 'application', t: [4],
}), (q) => near(ripplePeakToPeak({ Vm: 12, f: 50, I: 0.04, C: 2200e-6, full: true }), q.answer.value, 0.1) || `ripple ${rp.dV}`);
const tn = { Np: 1840, Vp: 230, Vs: 9 };
tn.Ns = (tn.Np * 2 * tn.Vs) / tn.Vp;
add('turns-num', num({
  stem: 'The primary of a transformer has 1840 turns and is connected to the 230 V mains. How many turns must the whole secondary have to give a 9-0-9 V centre-tap output (9 V r.m.s. on each half)?',
  value: tn.Ns, tol: 0, unit: 'turns',
  sol: r`The whole secondary must give $9 + 9 = 18$ V. $\dfrac{N_s}{N_p} = \dfrac{V_s}{V_p}$, so $N_s = 1840 \times \dfrac{18}{230} = ${tn.Ns}$ turns, 72 on each half, with the tap at the middle.`,
  scheme: [['Whole secondary voltage 18 V', 1], ['N_s = 1840 × 18/230 = 144 turns', 1]],
  marks: 2, d: 2, c: 'application', t: [4],
}), (q) => near(q.answer.value / 1840, 18 / 230, 1e-9) || 'turns');
const cf = { Vm: 14.0, Vd: 0.7 };
cf.frac = hwFrac(cf.Vm, cf.Vd) * 100;
add('conduct-num', num({
  stem: 'The secondary of a transformer gives a peak voltage of 14.0 V to a half-wave rectifier that has one silicon diode. The diode conducts only while the secondary voltage exceeds 0.7 V. For what percentage of each cycle does it conduct? Give the answer to 3 significant figures.',
  value: Number(dec(cf.frac, 3)), tol: 0.1, unit: '%',
  sol: r`The diode starts to conduct when $14.0 \sin\theta = 0.7$, i.e. $\sin\theta = 0.05$, $\theta_0 = ${dec((Math.asin(0.05) * 180) / Math.PI, 3)}^\circ$, and stops at $180^\circ - \theta_0$. It conducts for $180^\circ - 2\theta_0 = ${dec(180 - (2 * Math.asin(0.05) * 180) / Math.PI, 4)}^\circ$ of each $360^\circ$ cycle: $\dfrac{${dec(cf.frac * 3.6, 4)}}{360} \times 100 = ${dec(cf.frac, 3)}$ per cent (a little less than one half).`,
  scheme: [['sin θ₀ = 0.7/14.0 = 0.05, θ₀ = 2.87°', 1], ['Conduction angle 180° − 2θ₀ = 174.3°, which is 48.4% of the cycle', 1]],
  marks: 2, d: 4, c: 'analysis', t: [4],
}), (q) => near(sampledFraction(14.0, 0.7) * 100, q.answer.value, 0.002) || `conduct ${cf.frac}`);
add('hwbad-short2', short({
  marks: 2,
  stem: 'State two disadvantages of a half-wave rectifier compared with a full-wave rectifier.',
  model: 'A half-wave rectifier uses only one half of each input cycle, so half of the input power is wasted and the output is small. Its output is also a series of widely spaced pulses at the input frequency (50 Hz), so it has a large ripple that needs a much bigger filter capacitor to smooth.',
  sol: 'One half-cycle unused; large, low-frequency ripple.',
  scheme: [['Only one half-cycle is used: half the input is wasted, the output is small', 1], ['Large low-frequency ripple, harder to filter', 1]],
  d: 1, c: 'understanding', t: [4], wl: null,
}));
add('ripcmp-short2', short({
  marks: 2,
  stem: 'A half-wave and a full-wave rectifier, both run from 50 Hz mains, use the same capacitor across the same load. State which gives the smaller ripple and give the reason in terms of the time for which the capacitor discharges.',
  model: 'The full-wave rectifier gives the smaller ripple. Its output peaks every 10 ms, so the capacitor is recharged twice as often as in the half-wave circuit, where the peaks are 20 ms apart. In the shorter interval the capacitor loses only half as much charge, since ΔV = I t/C, so the ripple is half as large.',
  sol: 'Full-wave: peaks every 10 ms, not 20 ms; ΔV = It/C is halved.',
  scheme: [['Full-wave rectifier has the smaller ripple', 1], ['Capacitor discharges for 10 ms instead of 20 ms, so ΔV = It/C is half', 1]],
  d: 3, c: 'analysis', t: [4], wl: null,
}));
add('roles-short3', short({
  marks: 3,
  stem: 'State the function of each of the following in a rectifier power supply: (a) the transformer, (b) the diode, (c) the filter capacitor.',
  model: '(a) The **transformer** steps the 230 V a.c. mains down to the small voltage needed (and, with a centre tap, gives two opposite-phase voltages for a full-wave circuit). (b) The **diode** conducts only when forward biased, so it lets current pass in one direction only and turns the alternating voltage into a unidirectional pulsating one. (c) The **filter capacitor** charges at the peaks and discharges slowly through the load, smoothing the pulsations into a nearly steady direct voltage.',
  sol: 'Transformer: suitable a.c. voltage; diode: one-way conduction; capacitor: smoothing.',
  scheme: [['Transformer: steps the mains down to the required a.c. voltage', 1], ['Diode: conducts in one direction only, so rectifies', 1], ['Capacitor: stores charge at the peaks and smooths the pulsating output', 1]],
  d: 2, c: 'understanding', t: [4], wl: null,
}));
add('hwcircuit-short3', short({
  marks: 3,
  stem: 'Draw the circuit diagram of a half-wave rectifier, and with the help of the input and output waveforms explain how it works.',
  model: '**Circuit** (drawn in the answer): the secondary of a transformer connected in series with a diode D and a load resistor R_L. **Working:** in the half-cycle when the secondary terminal joined to the anode is positive, D is forward biased and conducts, so a current flows through R_L and the output follows the input. In the next half-cycle that terminal is negative, D is reverse biased and no current flows, so the output is zero. The output is thus a train of positive pulses, one in each input cycle, with the same frequency as the input.',
  sol: 'Circuit; conducts in positive half-cycles; output pulses at the input frequency.',
  scheme: [['Correct circuit: secondary, diode and load in series', 1], ['Positive half-cycle: diode conducts; negative half-cycle: it blocks', 1], ['Output waveform: positive pulses at the input frequency', 1]],
  d: 2, c: 'understanding', t: [4], wl: null,
}));
add('fw-long', long({
  stem: '(a) Draw the circuit diagram of a full-wave rectifier that uses two diodes and a centre-tapped transformer. [2] (b) With the help of the voltages at the two ends of the secondary and the output waveform, explain how it works. [2] (c) The input is 50 Hz mains. State the ripple frequency of the output and give a reason. [1]',
  model: `(a) (Drawn in the answer.) The two ends A and B of the secondary go to the anodes of diodes D₁ and D₂; the cathodes are joined together to one end of the load R_L; the other end of R_L is joined to the centre tap C of the secondary.

(b) With respect to C, the voltages at A and B are equal and opposite. When A is positive, D₁ is forward biased and conducts while D₂ is reverse biased; current flows from D₁ down through R_L to C. In the next half-cycle B is positive, D₂ conducts and D₁ blocks, and the current again flows down through R_L. So both half-cycles give a current in the same direction: the output is a train of positive pulses, two for every input cycle.

(c) The ripple frequency is 100 Hz, twice the 50 Hz input, because each input cycle gives two output pulses.`,
  sol: 'Circuit; alternate conduction; 100 Hz.',
  scheme: [['Secondary ends to the anodes of D₁ and D₂', 1], ['Cathodes joined to the load, whose other end goes to the centre tap', 1], ['D₁ conducts when A is positive, D₂ when B is positive; current the same way in R_L', 1], ['Output: two positive pulses per input cycle (waveform)', 1], ['Ripple frequency 100 Hz = 2 × 50 Hz', 1]],
  d: 3, c: 'understanding', t: [4], wl: null,
}));
const sp = { rms: 6.0, I: 0.060, C: 1000e-6, f: 50 };
sp.Vm = peak(sp.rms);
sp.out = sp.Vm - VSI;
sp.dVfw = sp.I / (2 * sp.f * sp.C);
sp.dVhw = sp.I / (sp.f * sp.C);
add('supply-long', long({
  stem: 'A small power supply uses a centre-tap transformer that gives 6.0 V r.m.s. on each half of its secondary, two silicon diodes (0.7 V drop each when conducting), 50 Hz mains and a 1000 μF capacitor across the load, which draws a steady 60 mA. Find (a) the peak load voltage, [1] (b) the ripple frequency, [1] (c) the peak-to-peak ripple voltage, taking the capacitor to discharge at constant current between successive peaks, [2] (d) the ripple voltage if half-wave rectification were used instead with the same load and capacitor. [1]',
  model: r`(a) $V_m = 6.0 \times \sqrt{2} = ${dec(sp.Vm, 4)}$ V, so the peak load voltage is $${dec(sp.Vm, 4)} - 0.7 = ${dec(sp.out, 3)}$ V $\approx 7.8$ V.

(b) Full-wave: $2 \times 50 = 100$ Hz.

(c) The capacitor discharges for $\dfrac{1}{100} = 0.010$ s: $\Delta V = \dfrac{I t}{C} = \dfrac{0.060 \times 0.010}{1000 \times 10^{-6}} = ${dec(sp.dVfw, 3)}$ V.

(d) Half-wave: the discharge time is 0.020 s, so $\Delta V = \dfrac{0.060 \times 0.020}{1000 \times 10^{-6}} = ${dec(sp.dVhw, 3)}$ V, twice as large.`,
  sol: 'V_m − 0.7; 2f; ΔV = I/(2fC) and I/(fC).',
  scheme: [['Peak load voltage 6.0√2 − 0.7 = 7.8 V', 1], ['Ripple frequency 100 Hz', 1], ['t = 0.010 s', 1], ['ΔV = It/C = 0.60 V', 1], ['Half-wave: t = 0.020 s, ΔV = 1.2 V', 1]],
  d: 3, c: 'application', t: [4], wl: null,
}), () => near(sp.out, 7.785, 0.001) && near(ripplePeakToPeak({ Vm: 8.5, f: 50, I: 0.06, C: 1000e-6, full: true }), 0.6, 0.15) && near(ripplePeakToPeak({ Vm: 8.5, f: 50, I: 0.06, C: 1000e-6, full: false }), 1.2, 0.15) || 'supply');

// ================================================================ t05 LED, photodiode and solar cell
add('led-mcq', mcq({
  stem: 'A light-emitting diode gives out light when',
  right: 'it is forward biased, so that electrons and holes recombine near the junction',
  wrong: ['it is reverse biased, so that electrons and holes are driven apart', 'it is heated until a thin filament inside it glows', 'light falling on it creates electron–hole pairs in the depletion region'],
  sol: 'In forward bias electrons from the n side and holes from the p side are pushed into the junction region, where they recombine; each recombination releases energy of about the band gap as a photon — option (@K). The last option describes a photodiode or a solar cell.',
  d: 1, c: 'understanding', t: [5],
}));
add('ledcolour-mcq', mcq({
  stem: 'A red LED and a blue LED are made from different semiconductors. Which statement is correct?',
  right: 'The semiconductor of the blue LED has the larger forbidden gap, because each blue photon carries more energy than a red one',
  wrong: ['The semiconductor of the blue LED has the smaller forbidden gap, because blue light has the shorter wavelength', 'Both semiconductors have the same gap; the colour comes only from the tint of the plastic case', 'The blue LED needs the smaller forward voltage, because its photons carry less energy'],
  sol: r`The photon energy is about the band gap, $E = \dfrac{hc}{\lambda}$. Blue light has the shorter wavelength, so a larger photon energy (about 2.7 eV against about 1.9 eV for red), which needs a larger gap — and a larger forward voltage — option (@K).`,
  d: 3, c: 'understanding', t: [5],
}), () => photonEv(460) > photonEv(650) || 'ledcolour');
add('pd-mcq', mcq({
  stem: 'A photodiode used as a light detector is operated in reverse bias because',
  right: 'its reverse current in the dark is tiny, so the extra current produced by light is a large fraction of the total',
  wrong: ['light cannot be absorbed by a forward-biased junction', 'the reverse bias makes the diode emit light that it can then detect', 'a forward-biased photodiode would be destroyed by the light'],
  sol: 'In the dark a reverse-biased diode passes only a very small current (nanoamperes), whereas light creates extra minority carriers that raise this current greatly in proportion. In forward bias the large forward current would hide the small change — option (@K).',
  d: 2, c: 'understanding', t: [5],
}));
add('solar-mcq', mcq({
  stem: 'Which statement about a solar cell is correct?',
  right: 'The built-in field of its p-n junction separates the electron–hole pairs made by light, so it acts as a source of emf with no external bias',
  wrong: ['It must be reverse biased by a battery in order to work', 'It works by the recombination of electron–hole pairs and gives out light', 'It must be forward biased so that the junction can absorb light'],
  sol: 'Light makes electron–hole pairs near the junction; the built-in field sweeps electrons to the n side and holes to the p side, so a potential difference (about 0.5–0.7 V for silicon) appears across the cell and it drives a current through a load without any battery — option (@K).',
  d: 1, c: 'understanding', t: [5],
}));
add('solarbat-tf', tf({
  stem: 'A solar cell has to be connected to a battery before it can deliver current to a load.',
  key: 'f',
  sol: 'False. The built-in field of the junction separates the carriers that light creates, so the cell is itself the source of emf and needs no bias.',
  d: 1, c: 'understanding', t: [5],
}));
add('photon-fill', fill({
  stem: 'The energy of each photon emitted by an LED is approximately equal to the ___ of the semiconductor from which it is made.',
  acc: [['band gap', 'energy gap', 'forbidden gap', 'forbidden energy gap', 'gap']],
  sol: 'The **band gap** (forbidden energy gap): hν ≈ Eg.',
  d: 1, c: 'understanding', t: [5],
}));
add('pdbias-ar', ar({
  a: 'A photodiode is operated in reverse bias when it is used to detect light.',
  r: 'In reverse bias the current in the dark is very small, so the extra current produced by light is a large fraction of the total.',
  key: 'a',
  sol: 'Both are true, and R explains A: a small dark current makes the fractional change caused by light easy to measure — option (a).',
  d: 2, c: 'understanding', t: [5],
}));
add('ledrev-ar', ar({
  a: 'An LED gives out light when it is connected in reverse bias.',
  r: 'Light is emitted when electrons and holes recombine near the junction.',
  key: 'd',
  sol: 'A is false: in reverse bias the electrons and holes are driven away from the junction and hardly recombine, so there is no light. R is true: recombination near the junction produces the photons, which needs forward bias — option (d).',
  d: 2, c: 'understanding', t: [5],
}));
add('special-match', match({
  stem: 'Match each p-n junction device in Column A with how it is used in Column B.',
  pairs: [
    ['Light-emitting diode', 'Forward biased; emits light on recombination'],
    ['Photodiode', 'Reverse biased; its current rises with the light falling on it'],
    ['Solar cell', 'Unbiased; light makes it a source of emf'],
    ['Zener diode', 'Reverse biased in breakdown; holds a steady voltage'],
  ],
  order: [2, 0, 3, 1],
  sol: 'LED → forward bias, light from recombination (1 → r); photodiode → reverse bias, current rises with light (2 → p); solar cell → no bias, light gives an emf (3 → s); Zener diode → reverse breakdown, steady voltage (4 → q).',
  d: 2, c: 'understanding', t: [5, 6],
}));
const lr = { E: 9.0, Vf: 2.0, I: 14e-3 };
lr.R = (lr.E - lr.Vf) / lr.I;
add('ledr-num', num({
  stem: 'A red LED passes 14 mA and drops 2.0 V when it conducts. What series resistor, in Ω, is needed to run it from a 9.0 V battery?',
  value: lr.R, tol: 1, unit: 'Ω',
  sol: r`The resistor must drop $9.0 - 2.0 = 7.0$ V at 14 mA: $R = \dfrac{7.0}{14 \times 10^{-3}} = ${dec(lr.R, 3)}$ Ω.`,
  scheme: [['Voltage across R = 9.0 − 2.0 = 7.0 V', 1], ['R = 7.0/(14 × 10⁻³) = 500 Ω', 1]],
  marks: 2, d: 2, c: 'application', t: [5],
}), (q) => near((9.0 - 2.0) / q.answer.value, 14e-3, 0.002) || 'ledr');
const eb = { nm: 460 };
eb.Eg = photonEv(eb.nm);
add('egblue-num', num({
  stem: `A blue LED emits light of wavelength 460 nm. Estimate the forbidden gap of its semiconductor, in eV, to 2 significant figures. ${HCTXT}`,
  value: Number(dec(eb.Eg, 2)), tol: 0.03, unit: 'eV',
  sol: r`$E_g \approx \dfrac{hc}{\lambda} = \dfrac{1240}{460} = ${dec(eb.Eg, 3)}$ eV $\approx ${dec(eb.Eg, 2)}$ eV.`,
  scheme: [['Eg ≈ hc/λ = 1240/460 = 2.7 eV', 1]],
  d: 2, c: 'understanding', t: [5],
}), (q) => near((6.626e-34 * 2.998e8) / (460e-9) / 1.602e-19, q.answer.value, 0.02) || 'egblue');
const ph = { P: 3.0e-3, nm: 620 };
ph.E = photonEv(ph.nm);
ph.N = ph.P / (ph.E * QE);
add('photons-num', num({
  stem: `An LED emits 3.0 mW of light of wavelength 620 nm. How many photons does it emit each second? Give the answer in units of 10¹⁵ per second (2 significant figures). (hc = 1240 eV nm; 1 eV = 1.6 × 10⁻¹⁹ J)`,
  value: Number(dec(ph.N / 1e15, 2)), tol: 0.2, unit: '× 10¹⁵ s⁻¹',
  sol: r`Photon energy $= \dfrac{1240}{620} = ${dec(ph.E, 3)}$ eV $= ${sci(ph.E * QE, 3)}$ J. Number per second $= \dfrac{3.0 \times 10^{-3}}{${sci(ph.E * QE, 3)}} = ${sci(ph.N, 2)}$ s⁻¹. In units of $10^{15}$ s⁻¹: $N = ${dec(ph.N / 1e15, 2)}$.`,
  scheme: [['Photon energy = 1240/620 = 2.0 eV = 3.2 × 10⁻¹⁹ J', 1], ['N = 3.0 × 10⁻³ / 3.2 × 10⁻¹⁹ = 9.4 × 10¹⁵ s⁻¹', 1]],
  marks: 2, d: 3, c: 'analysis', t: [5],
}), (q) => near(photonRate(3.0e-3, 620), q.answer.value * 1e15, 0.02) || `photons ${ph.N}`);
const sv = { Wold: 36, Wnew: 18, h: 8, days: 300, rate: 8 };
sv.kWh = ((sv.Wold - sv.Wnew) * sv.h * sv.days) / 1000;
sv.rs = sv.kWh * sv.rate;
add('savings-num', num({
  stem: 'A 36 W tubelight is replaced by an 18 W LED batten that gives the same light. It is used for 8 hours a day on 300 days in a year, and electricity costs ₹8 per unit (1 unit = 1 kW h). How many rupees are saved in a year?',
  value: Number(dec(sv.rs, 3)), tol: 1, unit: '₹',
  sol: r`Power saved $= 36 - 18 = 18$ W. Energy saved $= \dfrac{18 \times 8 \times 300}{1000} = ${dec(sv.kWh, 3)}$ kW h. Money saved $= ${dec(sv.kWh, 3)} \times 8 = ${dec(sv.rs, 3)}$ rupees, about ₹346.`,
  scheme: [['Energy saved = 18 W × 8 h × 300 = 43.2 kW h', 1], ['Saving = 43.2 × 8 = ₹346', 1]],
  marks: 2, d: 2, c: 'application', t: [5],
}), (q) => near(((36 - 18) * 8 * 300 * 8) / 1000, q.answer.value, 0.003) || 'savings');
const se = { A: 1.6, G: 800, P: 224 };
se.eff = (se.P / (se.A * se.G)) * 100;
add('solareff-num', num({
  stem: 'A solar panel of area 1.6 m² receives sunlight of intensity 800 W m⁻² and delivers 224 W of electrical power. Find its efficiency as a percentage.',
  value: se.eff, tol: 0.1, unit: '%',
  sol: r`Power received $= 800 \times 1.6 = 1280$ W. Efficiency $= \dfrac{224}{1280} \times 100 = ${dec(se.eff, 3)}\%$.`,
  scheme: [['Input power 800 × 1.6 = 1280 W; efficiency = 224/1280 = 17.5%', 1]],
  d: 1, c: 'application', t: [5],
}), (q) => near((224 / (800 * 1.6)) * 100, q.answer.value, 0.001) || 'solareff');
const pc = { P: 1.0e-6, nm: 850, eta: 0.70 };
pc.I = (pc.eta * pc.P) / (1240 / pc.nm); // A, since P/(E in eV) is in electrons per second times e
add('pdcur-num', num({
  stem: `A silicon photodiode in reverse bias receives 1.0 μW of light of wavelength 850 nm. Each photon creates one electron–hole pair, and a pair is collected as current with probability 0.70. Find the photocurrent, in μA, to 2 significant figures. (hc = 1240 eV nm; e = 1.6 × 10⁻¹⁹ C)`,
  value: Number(dec(pc.I * 1e6, 2)), tol: 0.02, unit: 'μA',
  sol: r`Photon energy $= \dfrac{1240}{850} = ${dec(1240 / 850, 4)}$ eV $= ${sci((1240 / 850) * QE, 3)}$ J. Photons per second $= \dfrac{1.0 \times 10^{-6}}{${sci((1240 / 850) * QE, 3)}} = ${sci((1e-6 / ((1240 / 850) * QE)), 3)}$ s⁻¹. Carriers collected per second $= 0.70 \times ${sci((1e-6 / ((1240 / 850) * QE)), 3)} = ${sci((0.7 * 1e-6) / ((1240 / 850) * QE), 3)}$, so $I = ${sci((0.7 * 1e-6) / ((1240 / 850) * QE), 3)} \times 1.6 \times 10^{-19} = ${sci(pc.I, 2)}$ A $= ${dec(pc.I * 1e6, 2)}$ μA.`,
  scheme: [['Photon energy 1240/850 = 1.46 eV; photons per second = 4.3 × 10¹²', 1], ['I = 0.70 × 4.3 × 10¹² × 1.6 × 10⁻¹⁹ = 0.48 μA', 1]],
  marks: 2, d: 4, c: 'analysis', t: [5],
}), (q) => near(0.7 * photonRate(1e-6, 850) * 1.602e-19 * 1e6, q.answer.value, 0.02) || `pdcur ${pc.I}`);
add('ledsave-short2', short({
  marks: 2,
  stem: 'Give two reasons why replacing filament lamps by LED lamps saves energy and reduces pollution.',
  model: 'An LED changes a much larger fraction of the electrical energy into light, whereas a filament lamp wastes most of it as heat, so an LED needs far less power for the same light, and it also lasts many times longer. The smaller demand for electricity means less coal and oil burnt in power stations, and so less carbon dioxide and other pollutants released.',
  sol: 'Higher efficiency (little heat), longer life; less fuel burnt, less pollution.',
  scheme: [['An LED turns far more of the electrical energy into light (little heat) and lasts longer: less power for the same light', 1], ['Less electricity is needed, so less fuel is burnt and less carbon dioxide is released', 1]],
  d: 2, c: 'understanding', t: [5], wl: null,
}));
add('pdwhy-short2', short({
  marks: 2,
  stem: 'A silicon photodiode (forbidden gap 1.1 eV) gives a strong signal for light of wavelength 850 nm but none at all for light of wavelength 1300 nm, however intense. Use the photon energies to explain this.',
  model: r`The photon energy is $\dfrac{1240}{\lambda}$ eV. At 850 nm it is ${dec(photonEv(850), 3)} eV, which is more than 1.1 eV, so each photon can lift an electron across the gap and make an electron–hole pair. At 1300 nm it is ${dec(photonEv(1300), 3)} eV, less than the gap, so no photon can make a pair, and a brighter beam only supplies more photons that are all too weak.`,
  sol: 'hν must exceed Eg: 1.46 eV works, 0.95 eV does not.',
  scheme: [['850 nm: photon energy 1.46 eV > 1.1 eV, so pairs are made', 1], ['1300 nm: 0.95 eV < 1.1 eV, no pairs however many photons', 1]],
  d: 3, c: 'application', t: [5], wl: null,
}), () => photonEv(850) > 1.1 && photonEv(1300) < 1.1 || 'pdwhy');
add('three-short3', short({
  marks: 3,
  stem: 'Distinguish between an LED, a photodiode and a solar cell in terms of (i) the bias used and (ii) the part played by light.',
  model: '**LED:** forward biased; it gives out light, produced when electrons and holes recombine near the junction. **Photodiode:** reverse biased; it takes in light, which creates electron–hole pairs in the depletion region and so raises the reverse current in proportion to the intensity. **Solar cell:** no bias at all; it takes in light, and the junction field separates the pairs it creates, so the cell is itself a source of emf.',
  sol: 'LED: forward, emits; photodiode: reverse, detects; solar cell: unbiased, generates.',
  scheme: [['LED: forward bias; light is emitted by recombination', 1], ['Photodiode: reverse bias; light creates pairs and raises the reverse current', 1], ['Solar cell: no bias; light creates pairs that the junction field separates, giving an emf', 1]],
  d: 2, c: 'understanding', t: [5], wl: null,
}));
add('solar-short3', short({
  marks: 3,
  stem: 'Explain the working of a solar cell. Why is no battery needed, and why is the junction made with a large area?',
  model: 'A solar cell is a p-n junction (a thin p layer on an n layer). Photons with hν > Eg that reach the depletion region and its neighbourhood create electron–hole pairs. The built-in field sweeps the electrons to the n side and the holes to the p side, so a potential difference appears across the cell (about 0.5 V to 0.7 V for silicon) and current flows through an external load from p to n. The junction field itself separates the charges, so no battery is needed. A large area intercepts more light and so gives a larger current.',
  sol: 'Pairs created by light; junction field separates them; emf; large area for more current.',
  scheme: [['Photons with hν > Eg create electron–hole pairs near the junction', 1], ['The built-in field separates them: electrons to n, holes to p; emf across the cell, so no battery is needed', 1], ['Large area collects more light, giving a larger current', 1]],
  d: 2, c: 'understanding', t: [5], wl: null,
}));
const ll = { Eg: 2.1 };
ll.nm = cutoff(ll.Eg);
add('led-long', long({
  stem: '(a) With the help of a band picture, explain how an LED gives out light and in what kind of bias it is used. [2] (b) An LED is made from a semiconductor of band gap 2.1 eV. Find the wavelength of the light it emits and say whether it is visible. (hc = 1240 eV nm) [2] (c) Give one advantage of an LED lamp over a filament lamp. [1]',
  model: r`(a) The LED is a p-n junction used in forward bias. Electrons from the n side and holes from the p side are pushed into the junction region; there an electron falls from the conduction band into a hole in the valence band (recombination) and the energy of about the band gap leaves as a photon.

(b) $\lambda \approx \dfrac{hc}{E_g} = \dfrac{1240}{2.1} = ${dec(ll.nm, 3)}$ nm, in the visible range (yellow-orange).

(c) An LED lamp gives the same light for much less electrical power, and it lasts much longer.`,
  sol: 'Forward bias, recombination; λ = hc/Eg; advantage.',
  scheme: [['Forward-biased junction: electrons and holes recombine', 1], ['Energy ≈ Eg released as a photon', 1], ['λ = 1240/2.1', 1], ['λ = 590 nm, visible (yellow-orange)', 1], ['Advantage: much lower power for the same light, or a much longer life', 1]],
  d: 3, c: 'application', t: [5], wl: null,
}), () => near(ll.nm, 590.5, 0.001) && ll.nm > 400 && ll.nm < 700 || 'ledlong');

// ================================================================ t06 the Zener diode
add('zener-mcq', mcq({
  stem: 'A Zener diode is used as a voltage regulator by connecting it',
  right: 'in reverse bias, in parallel with the load, with a resistor in series with the supply',
  wrong: ['in forward bias, in series with the load', 'in reverse bias, in series with the load, with no other resistor', 'in forward bias, in parallel with the load, with no series resistor'],
  sol: 'The Zener works in its reverse breakdown region, so it is connected in reverse bias across the load (parallel). The series resistor takes the excess voltage and limits the current so that the diode is not damaged — option (@K).',
  d: 1, c: 'understanding', t: [6],
}));
add('breakdown-mcq', mcq({
  stem: 'In the breakdown region of a Zener diode, when the current through it changes over a wide range, the voltage across it',
  right: 'stays almost constant, at the Zener voltage',
  wrong: ['changes in proportion to the current', 'falls to zero', 'rises steadily above the Zener voltage'],
  sol: 'The reverse characteristic is almost vertical at the Zener voltage V_Z: large changes of current produce only tiny changes of voltage, which is why the diode can hold a voltage steady — option (@K).',
  d: 2, c: 'understanding', t: [6],
}));
add('zload-mcq', mcq({
  stem: 'In a Zener regulator the load resistance is decreased, with the input voltage unchanged and the Zener diode still in breakdown. Which statement is correct?',
  right: 'The load current rises and the Zener current falls by the same amount, while the output voltage stays at the Zener voltage',
  wrong: ['The load current rises and the Zener current rises by the same amount', 'The current in the series resistor increases and the output voltage falls', 'The output voltage rises because the load draws more current'],
  sol: 'With the output fixed at V_Z, the current in the series resistor, (V_in − V_Z)/R_s, is constant. The load current V_Z/R_L rises as R_L falls, so the Zener current, which is the difference, falls by the same amount — option (@K).',
  d: 3, c: 'analysis', t: [6],
}), () => {
  const a = zreg({ Vin: 12, Rs: 100, Vz: 6, RL: 600 });
  const b = zreg({ Vin: 12, Rs: 100, Vz: 6, RL: 400 });
  return near(a.I, b.I) && b.IL > a.IL && b.Iz < a.Iz && near(a.Vout, b.Vout) || 'zload';
});
add('zoff-mcq', mcq({
  stem: 'A 6.0 V Zener diode is fed from a 10 V supply through a 220 Ω series resistor, and a load is connected across the diode. The load resistance is made smaller and smaller, until the load would need more current than the series resistor can supply at 6.0 V. Then',
  right: 'the Zener diode stops conducting and the output voltage falls below 6.0 V',
  wrong: ['the Zener current increases to make up the difference and the output stays at 6.0 V', 'the output voltage rises above 6.0 V', 'the output stays at 6.0 V, because a Zener diode holds the voltage constant whatever the load'],
  sol: r`At 6.0 V the series resistor supplies at most $\dfrac{10 - 6.0}{220} = 18.2 \times 10^{-3}$ A, so the load can take at most that (this is for $R_L \approx 330$ Ω). For a smaller $R_L$ the Zener current would have to be negative; instead it drops to zero, the diode leaves breakdown and the output is just the potential divider voltage $10 \times \dfrac{R_L}{220 + R_L}$, below 6.0 V — option (@K).`,
  d: 4, c: 'analysis', t: [6],
}), () => {
  const z = zreg({ Vin: 10, Rs: 220, Vz: 6, RL: 300 });
  const node = zenerNode({ Vin: 10, Rs: 220, Vz: 6, RL: 300 });
  return !z.on && z.Vout < 6 && node.V < 6.01 && near(z.Vout, node.V, 0.01) || 'zoff';
});
add('zfwd-tf', tf({
  stem: 'In forward bias a Zener diode behaves much like an ordinary silicon diode.',
  key: 't',
  sol: 'True. Its forward characteristic is like that of an ordinary junction diode, with a knee at about 0.7 V; its special behaviour is in reverse breakdown.',
  d: 1, c: 'understanding', t: [6],
}));
add('zcur-ar', ar({
  a: 'A Zener diode in its reverse breakdown region can hold the voltage across a load nearly constant.',
  r: 'In breakdown the current through a Zener diode stays almost constant while the voltage across it changes greatly.',
  key: 'c',
  sol: 'A is true. R is false: it is the other way about. In breakdown the voltage stays almost constant while the current changes over a wide range — option (c).',
  d: 3, c: 'analysis', t: [6],
}));
const rs = { Vin: 12, Vz: 6.8, IL: 20e-3, Izmin: 5.0e-3 };
rs.Rs = (rs.Vin - rs.Vz) / (rs.IL + rs.Izmin);
add('rs-num', num({
  stem: 'A 6.8 V Zener diode is to regulate the voltage across a load that draws up to 20 mA from a 12 V supply, and the Zener diode must carry at least 5.0 mA at all times. Find the largest series resistance, in Ω, that can be used.',
  value: Number(dec(rs.Rs, 3)), tol: 1, unit: 'Ω',
  sol: r`The series resistor carries $I = I_L + I_Z = 20 + 5.0 = 25$ mA at the least, with $12 - 6.8 = 5.2$ V across it: $R_s = \dfrac{5.2}{25 \times 10^{-3}} = ${dec(rs.Rs, 3)}$ Ω. A larger resistance would pass too little current when the load is at its maximum.`,
  scheme: [['I = I_L + I_Z = 25 mA and V across R_s = 5.2 V', 1], ['R_s = 5.2/(25 × 10⁻³) = 208 Ω', 1]],
  marks: 2, d: 2, c: 'application', t: [6],
}), (q) => {
  const z = zenerNode({ Vin: 12, Rs: q.answer.value, Vz: 6.8, RL: 6.8 / 20e-3 });
  return near(z.Iz, 5.0e-3, 0.02) || `rs ${z.Iz}`;
});
const iz = { Vin: 15, Rs: 470, Vz: 9.1, RL: 1000 };
iz.z = zreg(iz);
add('iz-num', num({
  stem: 'In a Zener regulator the input is 15 V, the series resistor is 470 Ω, the Zener voltage is 9.1 V and the load resistance is 1.0 kΩ. Find the current through the Zener diode, in mA (2 significant figures).',
  value: Number(dec(iz.z.Iz * 1000, 2)), tol: 0.1, unit: 'mA',
  sol: r`The output is held at 9.1 V, so the resistor has $15 - 9.1 = 5.9$ V across it: $I = \dfrac{5.9}{470} = ${dec(iz.z.I * 1000, 4)} \times 10^{-3}$ A. Load current $I_L = \dfrac{9.1}{1000} = 9.1 \times 10^{-3}$ A. Zener current $I_Z = I - I_L = ${dec(iz.z.I * 1000, 4)} - 9.1 \approx ${dec(iz.z.Iz * 1000, 2)}$ mA.`,
  scheme: [['I = (15 − 9.1)/470 = 12.55 mA; I_L = 9.1/1000 = 9.1 mA', 1], ['I_Z = I − I_L = 3.5 mA', 1]],
  marks: 2, d: 2, c: 'application', t: [6],
}), (q) => iz.z.on && near(zenerNode(iz).Iz * 1000, q.answer.value, 0.03) || `iz ${iz.z.Iz}`);
const rg = { Vz: 5.1, Rs: 150, RL: 510, Imax: 30e-3, Imin: 2.0e-3 };
rg.IL = rg.Vz / rg.RL;
rg.Vmax = rg.Vz + (rg.IL + rg.Imax) * rg.Rs;
rg.Vmin = rg.Vz + (rg.IL + rg.Imin) * rg.Rs;
add('range-num', num({
  stem: 'A 5.1 V Zener diode, a 150 Ω series resistor and a fixed 510 Ω load form a regulator. The current through the Zener diode must stay between 2.0 mA and 30 mA. Find the largest input voltage that can be used, in V (3 significant figures).',
  value: Number(dec(rg.Vmax, 3)), tol: 0.05, unit: 'V',
  sol: r`Load current $= \dfrac{5.1}{510} = 10 \times 10^{-3}$ A. At the largest input the Zener carries 30 mA, so the series resistor carries $10 + 30 = 40$ mA. $V_{in} = V_Z + I R_s = 5.1 + 0.040 \times 150 = ${dec(rg.Vmax, 3)}$ V. (The smallest input, for 2.0 mA in the Zener, is ${dec(rg.Vmin, 3)} V.)`,
  scheme: [['I_L = 5.1/510 = 10 mA; resistor current 40 mA at the maximum', 1], ['V_in = 5.1 + 0.040 × 150 = 11.1 V', 1]],
  marks: 2, d: 4, c: 'analysis', t: [6],
}), (q) => {
  const z = zenerNode({ Vin: q.answer.value, Rs: 150, Vz: 5.1, RL: 510 });
  return near(z.Iz, 30e-3, 0.02) || `range ${z.Iz}`;
});
const ml = { Vin: 10, Rs: 220, Vz: 6.0, Izmin: 2.0e-3 };
ml.Is = (ml.Vin - ml.Vz) / ml.Rs;
ml.ILmax = ml.Is - ml.Izmin;
ml.RLmin = ml.Vz / ml.ILmax;
add('maxload-num', num({
  stem: 'A regulator has a 10 V input, a 220 Ω series resistor and a 6.0 V Zener diode that must carry at least 2.0 mA to stay in breakdown. Find the smallest load resistance, in Ω, for which the output stays at 6.0 V (3 significant figures).',
  value: Number(dec(ml.RLmin, 3)), tol: 2, unit: 'Ω',
  sol: r`Current in the series resistor $= \dfrac{10 - 6.0}{220} = ${dec(ml.Is * 1000, 4)} \times 10^{-3}$ A. The most the load can take is $${dec(ml.Is * 1000, 4)} - 2.0 = ${dec(ml.ILmax * 1000, 4)}$ mA, so $R_{L,min} = \dfrac{6.0}{${dec(ml.ILmax, 4)}} = ${dec(ml.RLmin, 3)}$ Ω.`,
  scheme: [['I = (10 − 6.0)/220 = 18.2 mA', 1], ['I_L,max = 18.2 − 2.0 = 16.2 mA; R_L,min = 6.0/0.0162 = 371 Ω', 1]],
  marks: 2, d: 4, c: 'analysis', t: [6],
}), (q) => {
  const z = zenerNode({ Vin: 10, Rs: 220, Vz: 6.0, RL: q.answer.value });
  return near(z.Iz, 2.0e-3, 0.03) || `maxload ${z.Iz}`;
});
const dd = { Rs: 180, V1: 12.0, V2: 13.5 };
dd.dI = (dd.V2 - dd.V1) / dd.Rs;
add('delta-num', num({
  stem: 'A Zener regulator has a 180 Ω series resistor. The input rises from 12.0 V to 13.5 V, with the load fixed and the Zener diode in breakdown throughout. By how much does the Zener current increase, in mA (2 significant figures)?',
  value: Number(dec(dd.dI * 1000, 2)), tol: 0.1, unit: 'mA',
  sol: r`The output is held constant, so the whole 1.5 V rise appears across the series resistor and the load current does not change. $\Delta I_Z = \Delta I = \dfrac{1.5}{180} = ${dec(dd.dI * 1000, 3)} \times 10^{-3}$ A; to 2 significant figures $\Delta I_Z = ${dec(dd.dI * 1000, 2)}$ mA.`,
  scheme: [['ΔI = 1.5/180 = 8.3 mA, all of it passing through the Zener', 1]],
  d: 2, c: 'application', t: [6],
}), (q) => {
  const a = zenerNode({ Vin: 12.0, Rs: 180, Vz: 6.8, RL: 680 });
  const b = zenerNode({ Vin: 13.5, Rs: 180, Vz: 6.8, RL: 680 });
  return near((b.Iz - a.Iz) * 1000, q.answer.value, 0.03) || 'delta';
});
add('zvi-short2', short({
  marks: 2,
  stem: 'Describe the reverse V–I characteristic of a Zener diode and show on it the Zener voltage.',
  model: 'In reverse bias the current is very small until the reverse voltage reaches a value V_Z, the Zener voltage. At V_Z the current suddenly rises very steeply, and then changes through a wide range with the voltage across the diode staying almost equal to V_Z (the curve is nearly vertical). In forward bias it behaves like an ordinary diode.',
  sol: 'Tiny current up to V_Z, then a nearly vertical rise.',
  scheme: [['Reverse current is negligible up to the Zener (breakdown) voltage V_Z', 1], ['At V_Z the current rises steeply, the voltage staying almost constant at V_Z', 1]],
  d: 2, c: 'understanding', t: [6], wl: null,
}));
add('zreg-short3', short({
  marks: 3,
  stem: 'Draw the circuit of a Zener diode voltage regulator and explain how it keeps the output voltage constant when the input voltage rises.',
  model: '**Circuit** (drawn in the answer): the supply feeds a series resistor R_s; the Zener diode, connected in reverse (cathode to the positive side), and the load R_L are in parallel across the output. **Action:** the Zener is in breakdown, so its voltage, and so the output, is fixed at V_Z. If the input rises, the current in R_s increases and the extra current flows through the Zener, whose voltage hardly changes; the extra voltage drops across R_s. The output therefore stays at V_Z.',
  sol: 'Circuit; extra current through the Zener; extra voltage across R_s.',
  scheme: [['Circuit: R_s in series, reverse-biased Zener in parallel with the load', 1], ['Zener in breakdown fixes the output at V_Z', 1], ['Input rise: extra current through the Zener, extra voltage across R_s', 1]],
  d: 2, c: 'understanding', t: [6], wl: null,
}));
const zl = { Vz: 6.0, I: 0.030, R1: 600, R2: 400 };
zl.IL1 = zl.Vz / zl.R1;
zl.IL2 = zl.Vz / zl.R2;
zl.Iz1 = zl.I - zl.IL1;
zl.Iz2 = zl.I - zl.IL2;
add('zload-short3', short({
  marks: 3,
  stem: 'A Zener regulator keeps 6.0 V across its load, and the series resistor carries a steady 30 mA. Find the load current and the Zener current when the load resistance is (i) 600 Ω and (ii) 400 Ω, and explain the change.',
  model: r`(i) $I_L = \dfrac{6.0}{600} = ${dec(zl.IL1 * 1000, 3)} \times 10^{-3}$ A, so $I_Z = 30 - ${dec(zl.IL1 * 1000, 3)} = ${dec(zl.Iz1 * 1000, 3)}$ mA. (ii) $I_L = \dfrac{6.0}{400} = ${dec(zl.IL2 * 1000, 3)} \times 10^{-3}$ A, so $I_Z = 30 - ${dec(zl.IL2 * 1000, 3)} = ${dec(zl.Iz2 * 1000, 3)}$ mA. The output stays at 6.0 V, so the current in the series resistor stays 30 mA; when the load takes more, the Zener takes correspondingly less.`,
  sol: 'I_L = V_Z/R_L; I_Z = I − I_L.',
  scheme: [['(i) I_L = 10 mA, I_Z = 20 mA', 1], ['(ii) I_L = 15 mA, I_Z = 15 mA', 1], ['Total current fixed at 30 mA: the Zener current falls as the load current rises', 1]],
  d: 3, c: 'application', t: [6], wl: null,
}), () => near(zl.IL1 + zl.Iz1, 0.03) && near(zl.IL2 + zl.Iz2, 0.03) && near(zenerNode({ Vin: 6.0 + 0.03 * 100, Rs: 100, Vz: 6.0, RL: 400 }).Iz, zl.Iz2, 0.03) || 'zload');
const zr = { Vz: 9.1, Rs: 220, RL: 910, Izmin: 3.0e-3, Izmax: 40e-3 };
zr.IL = zr.Vz / zr.RL;
zr.Vmin = zr.Vz + (zr.IL + zr.Izmin) * zr.Rs;
zr.Vmax = zr.Vz + (zr.IL + zr.Izmax) * zr.Rs;
add('zrange-short3', short({
  marks: 3,
  stem: 'A regulator uses a 9.1 V Zener diode, a 220 Ω series resistor and a fixed 910 Ω load. The Zener current must lie between 3.0 mA and 40 mA. Find (i) the load current, (ii) the smallest and (iii) the largest input voltage that can be used.',
  model: r`(i) $I_L = \dfrac{9.1}{910} = ${dec(zr.IL * 1000, 3)} \times 10^{-3}$ A. (ii) Smallest input: the Zener carries 3.0 mA, so the series resistor carries $10 + 3.0 = 13$ mA and $V_{in} = 9.1 + 0.013 \times 220 = ${dec(zr.Vmin, 4)}$ V $\approx 12.0$ V. (iii) Largest input: the Zener carries 40 mA, so the resistor carries 50 mA and $V_{in} = 9.1 + 0.050 \times 220 = ${dec(zr.Vmax, 3)}$ V.`,
  sol: 'V_in = V_Z + (I_L + I_Z)R_s at the two limits.',
  scheme: [['I_L = 9.1/910 = 10 mA', 1], ['Smallest input = 9.1 + 0.013 × 220 = 11.96 V', 1], ['Largest input = 9.1 + 0.050 × 220 = 20.1 V', 1]],
  d: 3, c: 'application', t: [6], wl: null,
}), () => near(zenerNode({ Vin: zr.Vmin, Rs: 220, Vz: 9.1, RL: 910 }).Iz, 3.0e-3, 0.03) && near(zenerNode({ Vin: zr.Vmax, Rs: 220, Vz: 9.1, RL: 910 }).Iz, 40e-3, 0.03) || 'zrange');
const zl2 = { Vin: 12, Vz: 6.0, RL: 600, Iz: 10e-3 };
zl2.IL = zl2.Vz / zl2.RL;
zl2.I = zl2.IL + zl2.Iz;
zl2.Rs = (zl2.Vin - zl2.Vz) / zl2.I;
zl2.Pz = zl2.Vz * zl2.Iz;
add('zener-long', long({
  stem: '(a) Draw the circuit of a voltage regulator using a Zener diode. [1] (b) Explain how it keeps the output voltage constant when the input voltage rises. [2] (c) A 6.0 V Zener diode regulates the supply to a 600 Ω load from a 12 V source, and is to carry 10 mA. Find the series resistance needed and the power dissipated in the Zener diode. [2]',
  model: r`(a) (Drawn in the answer.) A series resistor R_s joins the 12 V source to the output; the Zener diode, connected in reverse (cathode towards the positive terminal), is in parallel with the load R_L.

(b) The Zener diode works in its reverse breakdown region, where its voltage stays at V_Z for a wide range of currents. If the input voltage rises, the current in R_s rises, and the whole increase flows through the Zener diode while the voltage across it, and so across the load, stays at V_Z; the extra voltage is dropped across R_s.

(c) Load current $I_L = \dfrac{6.0}{600} = ${dec(zl2.IL * 1000, 3)} \times 10^{-3}$ A. Current in R_s $= 10 + 10 = ${dec(zl2.I * 1000, 3)}$ mA. $R_s = \dfrac{12 - 6.0}{${dec(zl2.I, 3)}} = ${dec(zl2.Rs, 3)}$ Ω. Power in the Zener $= V_Z I_Z = 6.0 \times 10 \times 10^{-3} = ${dec(zl2.Pz, 3)}$ W $= ${dec(zl2.Pz * 1000, 3)}$ mW.`,
  sol: 'Circuit; breakdown and extra current; R_s = (V_in − V_Z)/(I_L + I_Z); P = V_Z I_Z.',
  scheme: [['Series resistor with a reverse-biased Zener across the load', 1], ['Zener in breakdown holds the voltage at V_Z over a wide current range', 1], ['Input rise: extra current through the Zener and extra voltage across R_s', 1], ['R_s = (12 − 6.0)/20 mA = 300 Ω', 1], ['P = 6.0 × 10 mA = 60 mW', 1]],
  d: 3, c: 'application', t: [6], wl: null,
}), () => near(zl2.Rs, 300, 1e-9) && near(zenerNode({ Vin: 12, Rs: 300, Vz: 6.0, RL: 600 }).Iz, 10e-3, 0.03) && near(zl2.Pz, 0.06, 1e-9) || 'zenerlong');
void HC;
void sampledFraction;
