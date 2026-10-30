// ch11 Dual Nature of Radiation and Matter — question bank. Numbers are computed here (h = 6.63 × 10⁻³⁴ J s,
// e = 1.6 × 10⁻¹⁹ C, c = 3.0 × 10⁸ m s⁻¹, mₑ = 9.1 × 10⁻³¹ kg, m_p = 1.67 × 10⁻²⁷ kg) and re-checked by `check` functions.
// AR keys planned: a c a b a c d.
import { mk, add, r, sci, dec, near } from '../../cbse-12-physics-ch01/src/lib.mjs';
import { H, QE, CL, ME, MP, HC } from './decks.mjs';

const { mcq, ar, tf, fill, match, num, short, long, part } = mk;
const eV = (lamNm) => HC / lamNm; // photon energy in eV for a wavelength in nm
const dB = (m, K) => H / Math.sqrt(2 * m * K); // de Broglie wavelength, K in joules

// ================================================================ t01 photoelectric effect: observations
add('hallwachs-mcq', mcq({
  stem: 'An uncharged zinc plate, insulated from the ground, is exposed to ultraviolet light for some time. The plate becomes',
  right: 'positively charged, because it loses electrons',
  wrong: ['negatively charged, because it gains electrons from the light', 'positively charged, because it gains protons', 'still uncharged, because light carries no charge'],
  sol: 'Ultraviolet light ejects photoelectrons from zinc; losing negative charge leaves the plate positive — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('wf-fill', fill({
  stem: 'The minimum energy needed to remove an electron from the surface of a metal is called its work ___.',
  acc: [['function']],
  sol: 'The work **function** φ₀, usually given in electronvolts.',
  d: 1, c: 'recall', t: [1],
}));
const zj = 4.3 * QE;
add('evJ-num', num({
  stem: 'The work function of zinc is 4.3 eV. Express it in joules, in units of 10⁻¹⁹ J (3 significant figures).',
  value: Number(dec(zj / 1e-19, 3)), tol: 0.02, unit: '× 10⁻¹⁹ J',
  sol: r`$\varphi_0 = 4.3 \times 1.6 \times 10^{-19} = ${sci(zj, 3)}$ J, i.e. $\dfrac{${sci(zj, 3)}}{10^{-19}} = ${dec(zj / 1e-19, 3)}$.`,
  scheme: [['4.3 × 1.6 × 10⁻¹⁹ = 6.88 × 10⁻¹⁹ J', 1]],
  d: 1, c: 'understanding', t: [1],
}), (q) => near(zj, 6.88e-19) && near(q.answer.value, 6.88) || 'zj');
add('history-match', match({
  stem: 'Match each scientist in Column A with the observation or idea in Column B.',
  pairs: [['Hertz', 'Ultraviolet light helped sparks jump across a gap'], ['Hallwachs', 'A negatively charged zinc plate lost its charge in ultraviolet light'], ['Lenard', 'Light on the emitter of an evacuated tube produced a current'], ['Einstein', 'Light energy is absorbed in packets of size hν']],
  order: [2, 0, 3, 1],
  sol: 'Hertz → sparks (1 → r); Hallwachs → zinc plate (2 → p); Lenard → current in an evacuated tube (3 → s); Einstein → packets hν (4 → q).',
  d: 1, c: 'recall', t: [1, 3],
}));
add('alkali-mcq', mcq({
  stem: 'Which of these metals can emit photoelectrons when lit by ordinary visible light?',
  right: 'Potassium',
  wrong: ['Zinc', 'Copper', 'Platinum'],
  sol: 'Alkali metals such as potassium have work functions near 2 eV, within the energy of visible photons; zinc, copper and platinum need ultraviolet — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('hertz-tf', tf({
  stem: 'Hertz found that sparks jumped across a gap more easily when the electrodes were lit by ultraviolet light.',
  key: 't',
  sol: 'True. This 1887 observation was the first sign of the photoelectric effect.',
  d: 1, c: 'recall', t: [1],
}));
add('positive-ar', ar({
  a: 'A positively charged zinc plate does not lose its charge when exposed to ultraviolet light.',
  r: 'Any photoelectrons emitted from a positively charged plate are attracted back to it.',
  key: 'a',
  sol: 'Both true, and R explains A: the positive plate pulls the ejected electrons back, so it keeps its charge — option (a).',
  d: 3, c: 'understanding', t: [1],
}));
add('tube-short', short({
  marks: 2,
  stem: 'In the photoelectric experiment, why is the tube containing the emitter and collector evacuated, and why is its window made of quartz?',
  model: 'The tube is **evacuated** so that photoelectrons travel from emitter to collector **without colliding** with gas molecules, which would slow or stop them and produce ions. The window is made of **quartz** because ordinary glass **absorbs ultraviolet** light, which many metals need for emission; quartz lets it through.',
  sol: 'No collisions; quartz transmits UV.',
  scheme: [['Vacuum: no collisions with gas molecules', 1], ['Quartz transmits ultraviolet', 1]],
  d: 2, c: 'understanding', t: [1, 2],
}));

// ================================================================ t02 experimental study
add('brighter-mcq', mcq({
  stem: 'Light of a fixed frequency above the threshold falls on a photocell. If its intensity is doubled,',
  right: 'the saturation current doubles and the stopping potential is unchanged',
  wrong: ['the saturation current and the stopping potential both double', 'the stopping potential doubles and the saturation current is unchanged', 'neither the saturation current nor the stopping potential changes'],
  sol: 'Twice as many photons free twice as many electrons, but each photon has the same energy, so K_max and V₀ do not change — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('slope-mcq', mcq({
  stem: 'Graphs of stopping potential against frequency are drawn for two different metals. The two lines',
  right: 'are parallel, with slope h/e, but cut the frequency axis at different points',
  wrong: ['have different slopes but the same intercept', 'coincide', 'are parallel to the frequency axis'],
  sol: 'V₀ = (h/e)ν − φ₀/e: the slope h/e is universal; the intercept ν₀ = φ₀/h depends on the metal — option (@K).',
  d: 2, c: 'understanding', t: [2, 3],
}));
add('threshold-ar', ar({
  a: 'Light of frequency below the threshold frequency cannot eject photoelectrons, however intense it is.',
  r: 'The maximum kinetic energy of photoelectrons increases with the intensity of the light.',
  key: 'c',
  sol: 'A is true. R is false: K_max depends on the frequency, not on the intensity — option (c).',
  d: 2, c: 'understanding', t: [2],
}));
const vm = { V0: 2.0 };
vm.v = Math.sqrt((2 * vm.V0 * QE) / ME);
add('vmax-num', num({
  stem: 'The stopping potential for photoelectrons from a metal is 2.0 V. Find the maximum speed of the photoelectrons, in units of 10⁵ m s⁻¹ (3 significant figures).',
  value: Number(dec(vm.v / 1e5, 3)), tol: 0.05, unit: '× 10⁵ m s⁻¹',
  sol: r`$\tfrac{1}{2}m v_\text{max}^2 = eV_0$, so $v_\text{max} = \sqrt{\dfrac{2eV_0}{m}} = \sqrt{\dfrac{2 \times 1.6 \times 10^{-19} \times 2.0}{9.1 \times 10^{-31}}} \approx ${sci(vm.v, 3)}$ m s$^{-1}$, i.e. $\dfrac{${sci(vm.v, 3)}}{10^{5}} = ${dec(vm.v / 1e5, 3)}$.`,
  scheme: [['½mv² = eV₀', 1], ['v ≈ 8.39 × 10⁵ m s⁻¹', 1]],
  marks: 2, d: 2, c: 'application', t: [2],
}), (q) => near(vm.v / 1e5, q.answer.value) && near(vm.v, 8.39e5) || `vm ${vm.v}`);
const kv = 0.75 * QE;
add('KfromV-num', num({
  stem: 'Photoelectrons are just stopped by a retarding potential of 0.75 V. Find their maximum kinetic energy, in units of 10⁻¹⁹ J.',
  value: kv / 1e-19, tol: 0.01, unit: '× 10⁻¹⁹ J',
  sol: r`$K_\text{max} = eV_0 = 1.6 \times 10^{-19} \times 0.75 = ${sci(kv, 2)}$ J, i.e. $\dfrac{${sci(kv, 2)}}{10^{-19}} = ${dec(kv / 1e-19, 2)}$.`,
  scheme: [['K_max = eV₀ = 1.2 × 10⁻¹⁹ J', 1]],
  d: 1, c: 'understanding', t: [2],
}), (q) => near(kv / 1e-19, q.answer.value) || 'kv');
add('curves-mcq', mcq({
  stem: 'Two curves of photocurrent against collector potential are obtained with light of the same intensity but different frequencies. The curve for the higher frequency',
  right: 'reaches the same saturation current but cuts the potential axis at a more negative value',
  wrong: ['reaches a higher saturation current and the same stopping potential', 'reaches a lower saturation current and the same stopping potential', 'cuts the potential axis at a less negative value'],
  sol: 'Same intensity gives the same saturation current (idealised); higher frequency gives larger K_max and so a larger stopping potential — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('stopdouble-tf', tf({
  stem: 'For light of a fixed frequency above the threshold, doubling the intensity doubles the stopping potential.',
  key: 'f',
  sol: 'False. The stopping potential depends only on the frequency (and the metal); intensity changes only the number of photoelectrons.',
  d: 1, c: 'understanding', t: [2],
}));
add('lag-mcq', mcq({
  stem: 'When light of frequency above the threshold first falls on a metal, photoelectric emission begins',
  right: 'almost at once, within about 10⁻⁹ s, even in very dim light',
  wrong: ['only after a delay that is longer for dimmer light', 'after about one second, whatever the intensity', 'only once the metal has warmed up'],
  sol: 'There is no measurable time lag; each photon gives its energy to an electron at once — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('wavefail-short3', short({
  marks: 3,
  stem: 'State three observations of the photoelectric effect that cannot be explained by the wave theory of light, giving for each what the wave theory would predict.',
  model: '(1) **K_max is independent of intensity**; a wave of greater intensity should give electrons more energy. (2) There is a **threshold frequency** below which no emission occurs, however intense the light; on the wave theory any frequency should work if the light is bright enough. (3) Emission is **instantaneous**; a wave spreads its energy thinly, so in dim light an electron should need a **long time** to gather enough energy.',
  sol: 'Intensity, threshold, time lag.',
  scheme: [['K_max independent of intensity, with wave prediction', 1], ['Threshold frequency, with wave prediction', 1], ['No time lag, with wave prediction', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('graphs-short3', short({
  marks: 3,
  stem: 'Sketch (describe) the graph of photocurrent against collector potential (a) for two intensities I₁ < I₂ of light of the same frequency, (b) for two frequencies ν₁ < ν₂ of light of the same intensity. Point out what is common in each case.',
  model: '(a) Both curves start from zero at the **same stopping potential** $-V_0$, rise, and level off; the I₂ curve levels off at a **higher saturation current**. Common: the **stopping potential**. (b) Both curves level off at the **same saturation current**, but the ν₂ curve starts from a **more negative** stopping potential. Common: the **saturation current**.',
  sol: 'Intensity changes saturation; frequency changes stopping potential.',
  scheme: [['(a) same −V₀, higher saturation for I₂', 1], ['(b) same saturation, larger V₀ for ν₂', 1], ['Common quantity named in each case', 1]],
  d: 3, c: 'understanding', t: [2],
}));
add('saturation-short', short({
  marks: 2,
  stem: 'Why does the photocurrent stop increasing (saturate) when the collector potential is made more and more positive?',
  model: 'The number of electrons **emitted per second** is fixed by the **intensity** of the light. Once the collector is positive enough to collect **all** of them, a higher potential cannot increase the number arriving per second, so the current stays at its **saturation** value.',
  sol: 'All emitted electrons already collected.',
  scheme: [['Emission rate fixed by intensity', 1], ['All electrons collected: current cannot rise further', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('gradual-short', short({
  marks: 2,
  stem: 'As the retarding potential on the collector is increased from zero, the photocurrent falls gradually rather than suddenly. Explain.',
  model: 'Photoelectrons leave the metal with a **range of kinetic energies**, from zero up to $K_\\text{max}$, because electrons from below the surface lose different amounts of energy on the way out. A small retarding potential turns back only the **slowest** electrons; larger potentials stop more of them, until at $V_0$ even the **fastest** are stopped.',
  sol: 'Spread of electron energies.',
  scheme: [['Electrons emitted with a range of energies up to K_max', 1], ['Increasing potential stops more of them, all at V₀', 1]],
  d: 3, c: 'understanding', t: [2],
}));
const tl = { I: 2.0e-6, A: 1.0e-19, phi: 2.3 };
tl.t = (tl.phi * QE) / (tl.I * tl.A);
tl.days = tl.t / 86400;
add('timelag-num', num({
  stem: 'Suppose light were a classical wave. Light of intensity 2.0 × 10⁻⁶ W m⁻² falls on a metal of work function 2.3 eV, and each electron can absorb energy only over an area of about 1.0 × 10⁻¹⁹ m². Estimate how long, in days, an electron would take to gather enough energy to escape (3 significant figures). (In experiments, emission is immediate.)',
  value: Number(dec(tl.days, 3)), tol: 0.3, unit: 'days',
  sol: r`Power per electron $= IA = 2.0 \times 10^{-6} \times 1.0 \times 10^{-19} = 2.0 \times 10^{-25}$ W. Energy needed $= 2.3 \times 1.6 \times 10^{-19} = ${sci(tl.phi * QE, 3)}$ J. Time $t = \dfrac{${sci(tl.phi * QE, 3)}}{2.0 \times 10^{-25}} = ${sci(tl.t, 3)}$ s, i.e. $\dfrac{${sci(tl.t, 3)}}{86400} = ${dec(tl.days, 3)}$ days.`,
  scheme: [['Power per electron 2.0 × 10⁻²⁵ W', 1], ['t ≈ 1.84 × 10⁶ s ≈ 21.3 days', 1]],
  marks: 2, d: 4, c: 'analysis', t: [2],
}), (q) => near(tl.days, q.answer.value) && near(tl.t, 1.84e6) || `tl ${tl.days}`);
const hd = { n1: 9.0e14, V1: 1.62, n2: 6.0e14, V2: 0.38 };
hd.slope = (hd.V1 - hd.V2) / (hd.n1 - hd.n2);
hd.h = QE * hd.slope;
add('hdata-num', num({
  stem: 'In a photoelectric experiment, light of frequency 9.0 × 10¹⁴ Hz gives a stopping potential of 1.62 V and light of 6.0 × 10¹⁴ Hz gives 0.38 V. Find Planck’s constant from these data, in units of 10⁻³⁴ J s (3 significant figures).',
  value: Number(dec(hd.h / 1e-34, 3)), tol: 0.03, unit: '× 10⁻³⁴ J s',
  sol: r`$e(V_1 - V_2) = h(\nu_1 - \nu_2)$, so $h = \dfrac{1.6 \times 10^{-19} \times (1.62 - 0.38)}{9.0 \times 10^{14} - 6.0 \times 10^{14}} = \dfrac{1.6 \times 10^{-19} \times 1.24}{3.0 \times 10^{14}} \approx ${sci(hd.h, 3)}$ J s, i.e. $\dfrac{${sci(hd.h, 3)}}{10^{-34}} = ${dec(hd.h / 1e-34, 3)}$.`,
  scheme: [['Subtract the two Einstein equations: e ΔV₀ = h Δν', 1], ['h ≈ 6.61 × 10⁻³⁴ J s', 1]],
  marks: 2, d: 4, c: 'application', t: [2, 3],
}), (q) => near(hd.h / 1e-34, q.answer.value) && near(hd.h, 6.61e-34, 0.002) || `hd ${hd.h}`);

// ================================================================ t03 Einstein's photoelectric equation
add('kmax-num', num({
  stem: 'Photons of energy 4.0 eV fall on a metal whose work function is 2.5 eV. Find the maximum kinetic energy of the photoelectrons, in eV.',
  value: 1.5, tol: 0.01, unit: 'eV',
  sol: r`$K_\text{max} = h\nu - \varphi_0 = 4.0 - 2.5 = 1.5$ eV.`,
  scheme: [['K_max = 1.5 eV', 1]],
  d: 1, c: 'understanding', t: [3],
}));
const p620 = eV(620);
add('photonE-num', num({
  stem: 'Find the energy of a photon of red light of wavelength 620 nm, in eV (3 significant figures). (h = 6.63 × 10⁻³⁴ J s, c = 3.0 × 10⁸ m s⁻¹, e = 1.6 × 10⁻¹⁹ C.)',
  value: Number(dec(p620, 3)), tol: 0.02, unit: 'eV',
  sol: r`$E = \dfrac{hc}{\lambda} = \dfrac{6.63 \times 10^{-34} \times 3.0 \times 10^{8}}{620 \times 10^{-9}} \approx ${sci(p620 * QE, 3)}$ J, i.e. $\dfrac{${sci(p620 * QE, 3)}}{1.6 \times 10^{-19}} = ${dec(p620, 3)}$ eV.`,
  scheme: [['E = hc/λ ≈ 2.01 eV', 1]],
  d: 1, c: 'understanding', t: [3],
}), (q) => near(p620, q.answer.value) || 'p620');
const tf0 = (2.0 * QE) / H;
add('nu0-num', num({
  stem: 'The work function of a metal is 2.0 eV. Find its threshold frequency, in units of 10¹⁴ Hz (3 significant figures).',
  value: Number(dec(tf0 / 1e14, 3)), tol: 0.03, unit: '× 10¹⁴ Hz',
  sol: r`$\nu_0 = \dfrac{\varphi_0}{h} = \dfrac{2.0 \times 1.6 \times 10^{-19}}{6.63 \times 10^{-34}} \approx ${sci(tf0, 3)}$ Hz, i.e. $\dfrac{${sci(tf0, 3)}}{10^{14}} = ${dec(tf0 / 1e14, 3)}$.`,
  scheme: [['ν₀ = φ₀/h', 1], ['≈ 4.83 × 10¹⁴ Hz', 1]],
  marks: 2, d: 2, c: 'application', t: [3],
}), (q) => near(tf0 / 1e14, q.answer.value) || 'tf0');
const l0 = HC / 3.0;
add('lam0-num', num({
  stem: 'A metal has a work function of 3.0 eV. Find its threshold wavelength, in nm (3 significant figures). (Take hc = 1243 eV nm.)',
  value: Number(dec(l0, 3)), tol: 2, unit: 'nm',
  sol: r`$\lambda_0 = \dfrac{hc}{\varphi_0} = \dfrac{1243}{3.0} \approx ${dec(l0, 3)}$ nm.`,
  scheme: [['λ₀ = hc/φ₀', 1], ['≈ 414 nm', 1]],
  marks: 2, d: 2, c: 'application', t: [3],
}), (q) => near(l0, q.answer.value) || 'l0');
const s250 = { E: eV(250), phi: 4.2 };
s250.V = s250.E - s250.phi;
add('V0-num', num({
  stem: 'Ultraviolet light of wavelength 250 nm falls on a metal of work function 4.2 eV. Find the stopping potential, in volts (2 significant figures). (hc = 1243 eV nm.)',
  value: Number(s250.V.toPrecision(2)), tol: 0.02, unit: 'V',
  sol: r`$h\nu = \dfrac{1243}{250} \approx ${dec(s250.E, 3)}$ eV; $eV_0 = h\nu - \varphi_0 = ${dec(s250.E, 3)} - 4.2 = ${dec(s250.V, 2)}$ eV, so $V_0 \approx ${dec(s250.V, 2)}$ V.`,
  scheme: [['hν ≈ 4.97 eV', 1], ['V₀ ≈ 0.77 V', 1]],
  marks: 2, d: 2, c: 'application', t: [3],
}), (q) => near(s250.V, q.answer.value, 0.02) || `s250 ${s250.V}`);
const pf = { E: eV(300), V0: 1.4 };
pf.phi = pf.E - pf.V0;
add('phi-num', num({
  stem: 'When light of wavelength 300 nm falls on a metal, the stopping potential is 1.4 V. Find the work function of the metal, in eV (3 significant figures). (hc = 1243 eV nm.)',
  value: Number(dec(pf.phi, 3)), tol: 0.02, unit: 'eV',
  sol: r`$h\nu = \dfrac{1243}{300} \approx ${dec(pf.E, 3)}$ eV; $\varphi_0 = h\nu - eV_0 = ${dec(pf.E, 3)} - 1.4 = ${dec(pf.phi, 3)}$ eV.`,
  scheme: [['hν ≈ 4.14 eV', 1], ['φ₀ ≈ 2.74 eV', 1]],
  marks: 2, d: 3, c: 'application', t: [3],
}), (q) => near(pf.phi, q.answer.value) || 'pf');
const na = { P: 10, lam: 589e-9 };
na.E = (H * CL) / na.lam;
na.N = na.P / na.E;
add('photons-num', num({
  stem: 'A sodium street lamp radiates 10 W of yellow light of wavelength 589 nm. How many photons does it emit per second? Give the answer in units of 10¹⁹ (3 significant figures).',
  value: Number(dec(na.N / 1e19, 3)), tol: 0.03, unit: '× 10¹⁹ s⁻¹',
  sol: r`$E = \dfrac{hc}{\lambda} = \dfrac{6.63 \times 10^{-34} \times 3.0 \times 10^{8}}{589 \times 10^{-9}} \approx ${sci(na.E, 3)}$ J. $N = \dfrac{P}{E} = \dfrac{10}{${sci(na.E, 3)}} \approx ${sci(na.N, 3)}$ s$^{-1}$, i.e. $\dfrac{${sci(na.N, 3)}}{10^{19}} = ${dec(na.N / 1e19, 3)}$.`,
  scheme: [['Photon energy ≈ 3.38 × 10⁻¹⁹ J', 1], ['N ≈ 2.96 × 10¹⁹ s⁻¹', 1]],
  marks: 2, d: 2, c: 'application', t: [3],
}), (q) => near(na.N / 1e19, q.answer.value) || 'na');
add('brightphoton-tf', tf({
  stem: 'A brighter beam of light of the same colour consists of photons of greater energy.',
  key: 'f',
  sol: 'False. Every photon of a given frequency has energy hν; a brighter beam simply carries more photons per second.',
  d: 1, c: 'understanding', t: [3],
}));
const pm = H / 500e-9;
add('pmom-num', num({
  stem: 'Find the momentum of a photon of wavelength 500 nm, in units of 10⁻²⁷ kg m s⁻¹ (3 significant figures).',
  value: Number(dec(pm / 1e-27, 3)), tol: 0.01, unit: '× 10⁻²⁷ kg m s⁻¹',
  sol: r`$p = \dfrac{h}{\lambda} = \dfrac{6.63 \times 10^{-34}}{500 \times 10^{-9}} = ${sci(pm, 3)}$ kg m s$^{-1}$, i.e. $\dfrac{${sci(pm, 3)}}{10^{-27}} = ${dec(pm / 1e-27, 3)}$.`,
  scheme: [['p = h/λ ≈ 1.33 × 10⁻²⁷ kg m s⁻¹', 1]],
  d: 1, c: 'understanding', t: [3],
}), (q) => near(pm / 1e-27, q.answer.value) || 'pm');
const ne = eV(600);
add('noemit-mcq', mcq({
  stem: 'Very intense orange light of wavelength 600 nm falls on a metal of work function 2.5 eV. Which statement is correct?',
  right: 'No photoelectrons are emitted, because each photon has only about 2.1 eV',
  wrong: ['Photoelectrons are emitted because the light is very intense', 'Photoelectrons are emitted after a short delay', 'Photoelectrons are emitted with zero kinetic energy'],
  sol: 'hν = 1243/600 ≈ 2.07 eV < 2.5 eV: no single photon can free an electron, whatever the intensity — option (@K).',
  d: 2, c: 'application', t: [3],
}), () => (ne < 2.5 && near(ne, 2.07)) || 'ne');
const dn = { phi: 2.0, E: 3.0 };
dn.K1 = dn.E - dn.phi;
dn.K2 = 2 * dn.E - dn.phi;
add('doublenu-mcq', mcq({
  stem: 'Light of frequency ν ejects photoelectrons from a metal. If the frequency is doubled (still with the same metal), the maximum kinetic energy of the photoelectrons becomes',
  right: 'more than double its earlier value',
  wrong: ['exactly double', 'less than double but more than before', 'unchanged'],
  sol: 'K₁ = hν − φ₀; K₂ = 2hν − φ₀ = 2K₁ + φ₀ > 2K₁ — option (@K).',
  d: 4, c: 'analysis', t: [3],
}), () => (dn.K2 > 2 * dn.K1) || 'dn');
add('twometals-mcq', mcq({
  stem: 'The same ultraviolet light falls on caesium (φ₀ ≈ 2.1 eV) and on zinc (φ₀ ≈ 4.3 eV), and both emit photoelectrons. Which gives the larger stopping potential?',
  right: 'Caesium, because its work function is smaller',
  wrong: ['Zinc, because its work function is larger', 'Both the same, because the light is the same', 'Zinc, because zinc needs ultraviolet light'],
  sol: 'eV₀ = hν − φ₀; with the same hν, the smaller φ₀ leaves more kinetic energy — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('einstein-ar', ar({
  a: 'The maximum kinetic energy of photoelectrons does not depend on the intensity of the incident light.',
  r: 'Each photoelectron is ejected by absorbing a single photon, whose energy depends only on the frequency of the light.',
  key: 'a',
  sol: 'Both true, and R explains A: one photon per electron, and every photon of frequency ν has energy hν — option (a).',
  d: 2, c: 'understanding', t: [3],
}));
add('irrelevant-ar', ar({
  a: 'The stopping potential for a given frequency of light is different for different metals.',
  r: 'The momentum of a photon is h/λ.',
  key: 'b',
  sol: 'Both are true, but R does not explain A; A follows from eV₀ = hν − φ₀ with φ₀ depending on the metal — option (b).',
  d: 2, c: 'understanding', t: [3],
}));
add('einstein-short3', short({
  marks: 3,
  stem: 'Use Einstein’s photoelectric equation to explain (a) the existence of a threshold frequency, (b) why the maximum kinetic energy does not depend on intensity, (c) why there is no time lag.',
  model: 'Einstein: $K_\\text{max} = h\\nu - \\varphi_0$, one photon per electron. (a) $K_\\text{max}$ cannot be negative, so emission needs $h\\nu \\ge \\varphi_0$, i.e. $\\nu \\ge \\nu_0 = \\varphi_0/h$. (b) Intensity changes only the **number** of photons; each still gives $h\\nu$, so $K_\\text{max}$ is unchanged. (c) A photon gives all its energy to one electron **at once**, so emission starts immediately.',
  sol: 'Apply K_max = hν − φ₀ with one photon per electron.',
  scheme: [['Threshold from hν ≥ φ₀', 1], ['Intensity = number of photons', 1], ['Energy delivered in one event: no lag', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('lines-short', short({
  marks: 2,
  stem: 'Graphs of stopping potential against frequency for two metals are parallel straight lines. What does the common slope give, and what does the intercept on the frequency axis give?',
  model: 'From $eV_0 = h\\nu - \\varphi_0$, $V_0 = \\dfrac{h}{e}\\nu - \\dfrac{\\varphi_0}{e}$. The **slope** is $h/e$, the same for all metals, so it gives **Planck’s constant**. The **intercept** on the ν axis is the **threshold frequency** $\\nu_0 = \\varphi_0/h$, which differs because the metals have different work functions.',
  sol: 'Slope h/e; intercept ν₀.',
  scheme: [['Slope = h/e (gives h)', 1], ['Intercept = threshold frequency, differs with φ₀', 1]],
  d: 3, c: 'understanding', t: [2, 3],
}));
const ks = { lam: 330, lam0: 550 };
ks.phi = HC / ks.lam0;
ks.E = HC / ks.lam;
ks.K = ks.E - ks.phi;
ks.v = Math.sqrt((2 * ks.K * QE) / ME);
add('kmax-short3', short({
  marks: 3,
  stem: 'The threshold wavelength of a metal is 550 nm. Ultraviolet light of wavelength 330 nm falls on it. Find (a) the work function, (b) the stopping potential, (c) the maximum speed of the photoelectrons. (hc = 1243 eV nm, mₑ = 9.1 × 10⁻³¹ kg.)',
  model: r`(a) $\varphi_0 = \dfrac{hc}{\lambda_0} = \dfrac{1243}{550} \approx ${dec(ks.phi, 3)}$ eV.
(b) $h\nu = \dfrac{1243}{330} \approx ${dec(ks.E, 3)}$ eV; $K_\text{max} = ${dec(ks.E, 3)} - ${dec(ks.phi, 3)} \approx ${dec(ks.K, 3)}$ eV, so $V_0 \approx ${dec(ks.K, 3)}$ V.
(c) $v_\text{max} = \sqrt{\dfrac{2K_\text{max}}{m}} = \sqrt{\dfrac{2 \times ${dec(ks.K, 3)} \times 1.6 \times 10^{-19}}{9.1 \times 10^{-31}}} \approx ${sci(ks.v, 3)}$ m s$^{-1}$.`,
  sol: 'φ₀ = hc/λ₀; K = hν − φ₀; v = √(2K/m).',
  scheme: [['φ₀ ≈ 2.26 eV', 1], ['V₀ ≈ 1.51 V', 1], ['v ≈ 7.28 × 10⁵ m s⁻¹', 1]],
  d: 3, c: 'application', t: [3], wl: null,
}), () => near(ks.phi, 2.26) && near(ks.K, 1.507) && near(ks.v, 7.28e5) || `ks ${ks.K} ${ks.v}`);
const sp = { phi: 1.8, l1: 400, l2: 600 };
sp.K1 = eV(sp.l1) - sp.phi;
sp.K2 = eV(sp.l2) - sp.phi;
sp.ratio = Math.sqrt(sp.K1 / sp.K2);
add('speedratio-num', num({
  stem: 'Light of wavelength 400 nm and then of 600 nm falls on a metal of work function 1.8 eV. Find the ratio of the maximum speeds of the photoelectrons in the two cases, v₄₀₀/v₆₀₀ (3 significant figures). (hc = 1243 eV nm.)',
  value: Number(dec(sp.ratio, 3)), tol: 0.03, unit: '',
  sol: r`$K_{400} = \dfrac{1243}{400} - 1.8 \approx ${dec(sp.K1, 3)}$ eV; $K_{600} = \dfrac{1243}{600} - 1.8 \approx ${dec(sp.K2, 3)}$ eV. Since $v \propto \sqrt{K}$, $\dfrac{v_{400}}{v_{600}} = \sqrt{\dfrac{${dec(sp.K1, 3)}}{${dec(sp.K2, 3)}}} = ${dec(sp.ratio, 3)}$.`,
  scheme: [['K at each wavelength', 1], ['Ratio √(K₁/K₂) ≈ 2.19', 1]],
  marks: 2, d: 4, c: 'analysis', t: [3],
}), (q) => near(sp.ratio, q.answer.value) && near(sp.ratio, 2.19) || `sp ${sp.ratio}`);
add('number-short', short({
  marks: 2,
  stem: 'Using the photon picture, explain why doubling the intensity of light of a fixed frequency (above threshold) doubles the photocurrent.',
  model: 'For a fixed frequency every photon has the same energy $h\\nu$, so doubling the intensity means **twice as many photons** strike the metal each second. Each photon can free **one** electron, so about **twice as many photoelectrons** are emitted per second, and the photocurrent doubles.',
  sol: 'Intensity ∝ number of photons.',
  scheme: [['Doubling intensity doubles the photon rate', 1], ['One photon frees one electron: current doubles', 1]],
  d: 2, c: 'understanding', t: [3],
}));

// ================================================================ t04 matter waves
add('quadruple-mcq', mcq({
  stem: 'The potential difference that accelerates an electron from rest is made four times as large. Its de Broglie wavelength becomes',
  right: 'half as large',
  wrong: ['one quarter as large', 'twice as large', 'four times as large'],
  sol: 'λ = h/√(2meV) ∝ 1/√V; √4 = 2, so λ halves — option (@K).',
  d: 2, c: 'application', t: [4],
}));
const e400 = dB(ME, 400 * QE);
add('e400-num', num({
  stem: 'Find the de Broglie wavelength of an electron accelerated from rest through 400 V, in picometres (3 significant figures).',
  value: Number(dec(e400 * 1e12, 3)), tol: 0.3, unit: 'pm',
  sol: r`$\lambda = \dfrac{h}{\sqrt{2m eV}} = \dfrac{6.63 \times 10^{-34}}{\sqrt{2 \times 9.1 \times 10^{-31} \times 1.6 \times 10^{-19} \times 400}} \approx ${sci(e400, 3)}$ m, i.e. $${sci(e400, 3)} \times 10^{12} = ${dec(e400 * 1e12, 3)}$ pm.`,
  scheme: [['λ = h/√(2meV)', 1], ['≈ 61.4 pm', 1]],
  marks: 2, d: 2, c: 'application', t: [4],
}), (q) => near(e400 * 1e12, q.answer.value) && near(e400, 6.14e-11) || `e400 ${e400}`);
const pr = H / (MP * 2.0e5);
add('proton-num', num({
  stem: 'A proton (mass 1.67 × 10⁻²⁷ kg) moves at 2.0 × 10⁵ m s⁻¹. Find its de Broglie wavelength, in picometres (3 significant figures).',
  value: Number(dec(pr * 1e12, 3)), tol: 0.02, unit: 'pm',
  sol: r`$\lambda = \dfrac{h}{mv} = \dfrac{6.63 \times 10^{-34}}{1.67 \times 10^{-27} \times 2.0 \times 10^{5}} \approx ${sci(pr, 3)}$ m, i.e. $${sci(pr, 3)} \times 10^{12} = ${dec(pr * 1e12, 3)}$ pm.`,
  scheme: [['λ = h/mv ≈ 1.99 pm', 1]],
  d: 2, c: 'understanding', t: [4],
}), (q) => near(pr * 1e12, q.answer.value) || 'pr');
add('equalK-mcq', mcq({
  stem: 'An electron, a proton and an alpha particle have the same kinetic energy. Which has the longest de Broglie wavelength?',
  right: 'The electron',
  wrong: ['The proton', 'The alpha particle', 'All have the same wavelength'],
  sol: 'λ = h/√(2mK): for equal K, the lightest particle has the longest wavelength — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('equalp-ar', ar({
  a: 'An electron and a proton moving with the same momentum have the same de Broglie wavelength.',
  r: 'The de Broglie wavelength λ = h/p depends only on the momentum of the particle.',
  key: 'a',
  sol: 'Both true, and R explains A: equal p gives equal h/p, whatever the masses — option (a).',
  d: 2, c: 'understanding', t: [4],
}));
add('ball-mcq', mcq({
  stem: 'We do not observe wave effects such as diffraction for a moving cricket ball because',
  right: 'its de Broglie wavelength is far smaller than any object or opening it meets',
  wrong: ['it has no de Broglie wavelength because it is not charged', 'its de Broglie wavelength is far larger than the ball', 'only particles moving near the speed of light have a wavelength'],
  sol: 'λ = h/mv is about 10⁻³⁴ m for a ball: far too small for any diffraction to be seen — option (@K).',
  d: 1, c: 'understanding', t: [4],
}));
const vf = H ** 2 / (2 * ME * QE * (0.1e-9) ** 2);
add('Vfind-num', num({
  stem: 'Through what potential difference must an electron, starting from rest, be accelerated so that its de Broglie wavelength is 0.10 nm? Give the answer in volts (3 significant figures).',
  value: Number(dec(vf, 3)), tol: 1.5, unit: 'V',
  sol: r`$\lambda = \dfrac{h}{\sqrt{2meV}} \Rightarrow V = \dfrac{h^2}{2me\lambda^2} = \dfrac{(6.63 \times 10^{-34})^2}{2 \times 9.1 \times 10^{-31} \times 1.6 \times 10^{-19} \times (1.0 \times 10^{-10})^2} \approx ${dec(vf, 3)}$ V.`,
  scheme: [['V = h²/(2meλ²)', 1], ['≈ 151 V', 1]],
  marks: 2, d: 3, c: 'application', t: [4],
}), (q) => near(vf, q.answer.value) && near(vf, 151) || `vf ${vf}`);
const ap = Math.sqrt((4 * MP * 2) / (MP * 1));
add('alpha-num', num({
  stem: 'A proton and an alpha particle (mass 4m_p, charge 2e) are each accelerated from rest through the same potential difference. Find the ratio of their de Broglie wavelengths, λ_p/λ_α (3 significant figures).',
  value: Number(dec(ap, 3)), tol: 0.02, unit: '',
  sol: r`$K = qV$, so $\lambda = \dfrac{h}{\sqrt{2mqV}}$ and $\dfrac{\lambda_p}{\lambda_\alpha} = \sqrt{\dfrac{m_\alpha q_\alpha}{m_p q_p}} = \sqrt{4 \times 2} = ${dec(ap, 3)}$.`,
  scheme: [['λ = h/√(2mqV)', 1], ['Ratio √8 ≈ 2.83', 1]],
  marks: 2, d: 4, c: 'analysis', t: [4],
}), (q) => near(ap, 2.83) && near(q.answer.value, 2.83) || 'ap');
const pe = { lam: 1.0e-9 };
pe.Eph = HC / 1.0;
pe.Ke = (H / pe.lam) ** 2 / (2 * ME) / QE;
pe.ratio = pe.Eph / pe.Ke;
add('photonelectron-num', num({
  stem: 'A photon and an electron both have a wavelength of 1.0 nm. Find the ratio of the photon’s energy to the electron’s kinetic energy (3 significant figures). (hc = 1243 eV nm; h = 6.63 × 10⁻³⁴ J s; mₑ = 9.1 × 10⁻³¹ kg.)',
  value: Number(pe.ratio.toPrecision(3)), tol: 8, unit: '',
  sol: r`Photon: $E = \dfrac{hc}{\lambda} = \dfrac{1243}{1.0} = 1243$ eV. Electron: $p = \dfrac{h}{\lambda} = 6.63 \times 10^{-25}$ kg m s$^{-1}$, $K = \dfrac{p^2}{2m} = \dfrac{(6.63 \times 10^{-25})^2}{2 \times 9.1 \times 10^{-31}} \approx ${sci(pe.Ke * QE, 3)}$ J $= \dfrac{${sci(pe.Ke * QE, 3)}}{1.6 \times 10^{-19}} \approx ${dec(pe.Ke, 3)}$ eV. Ratio $= \dfrac{1243}{${dec(pe.Ke, 3)}} \approx ${dec(pe.ratio, 3)}$.`,
  scheme: [['Photon 1243 eV; electron K = p²/2m ≈ 1.51 eV', 1], ['Ratio ≈ 824', 1]],
  marks: 2, d: 5, c: 'analysis', t: [3, 4],
}), (q) => near(pe.ratio, q.answer.value, 0.01) && near(pe.Ke, 1.51) || `pe ${pe.ratio}`);
add('dual-short', short({
  marks: 2,
  stem: 'What is meant by the dual nature of radiation? State de Broglie’s hypothesis.',
  model: 'Radiation shows **wave** properties (interference, diffraction) in some experiments and **particle** properties (photons in the photoelectric effect) in others: this is its **dual nature**. **de Broglie** proposed that moving **material particles** also have a wave nature, with wavelength $\\lambda = h/p = h/mv$.',
  sol: 'Wave and particle; λ = h/p for matter.',
  scheme: [['Dual nature of radiation explained', 1], ['de Broglie: λ = h/p for particles', 1]],
  d: 1, c: 'recall', t: [4],
}));
const nt = { K: 0.025 * QE };
nt.lam = dB(MP, nt.K);
add('neutron-num', num({
  stem: 'A slow neutron (mass 1.67 × 10⁻²⁷ kg) has a kinetic energy of 0.025 eV. Find its de Broglie wavelength, in nm (3 significant figures).',
  value: Number(dec(nt.lam * 1e9, 3)), tol: 0.003, unit: 'nm',
  sol: r`$K = 0.025 \times 1.6 \times 10^{-19} = 4.0 \times 10^{-21}$ J. $\lambda = \dfrac{h}{\sqrt{2mK}} = \dfrac{6.63 \times 10^{-34}}{\sqrt{2 \times 1.67 \times 10^{-27} \times 4.0 \times 10^{-21}}} \approx ${sci(nt.lam, 3)}$ m, i.e. $${sci(nt.lam, 3)} \times 10^{9} = ${dec(nt.lam * 1e9, 3)}$ nm.`,
  scheme: [['K in joules; λ = h/√(2mK)', 1], ['≈ 0.181 nm', 1]],
  marks: 2, d: 3, c: 'application', t: [4],
}), (q) => near(nt.lam * 1e9, q.answer.value) && near(nt.lam, 1.81e-10) || `nt ${nt.lam}`);
const eqL = { ratio: MP / ME };
add('samelam-short3', short({
  marks: 3,
  stem: 'An electron and a proton have the same de Broglie wavelength. Compare (a) their momenta, (b) their speeds, (c) their kinetic energies.',
  model: r`(a) $\lambda = h/p$, so equal $\lambda$ means **equal momenta**.
(b) $v = p/m$, so $\dfrac{v_e}{v_p} = \dfrac{m_p}{m_e} \approx ${dec(eqL.ratio, 4)}$: the electron is about 1835 times faster.
(c) $K = \dfrac{p^2}{2m}$, so $\dfrac{K_e}{K_p} = \dfrac{m_p}{m_e} \approx 1835$: the electron has the greater kinetic energy.`,
  sol: 'Equal p; v and K ∝ 1/m.',
  scheme: [['Equal momenta', 1], ['v_e/v_p = m_p/m_e ≈ 1835', 1], ['K_e/K_p = m_p/m_e ≈ 1835', 1]],
  d: 4, c: 'analysis', t: [4], wl: null,
}), () => near(eqL.ratio, 1835) || `eqL ${eqL.ratio}`);
add('lamgraph-mcq', mcq({
  stem: 'For electrons accelerated from rest through a potential difference V, a graph of de Broglie wavelength λ against 1/√V is',
  right: 'a straight line through the origin',
  wrong: ['a parabola', 'a straight line parallel to the 1/√V axis', 'a curve that falls as 1/√V increases'],
  sol: 'λ = h/√(2meV) = (h/√(2me)) × (1/√V): λ is proportional to 1/√V — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));

// ================================================================ long answers (5 marks)
const pl = { lam: 450, phi: 2.3 };
pl.E = eV(pl.lam);
pl.K = pl.E - pl.phi;
add('photo-long', long({
  stem: '(a) Describe an experimental arrangement to study the photoelectric effect. (b) Describe, with graphs (described in words), how the photocurrent depends on (i) the intensity of light, (ii) the collector potential, and (iii) the frequency of light. (c) State two observations that show light cannot be treated only as a wave.',
  model: '(a) An evacuated glass tube with a quartz window contains a photosensitive emitter plate C and a collector plate A. Light of known frequency and intensity falls on C. A battery with a reversing key and a potential divider sets the potential of A relative to C (read on a voltmeter), and a microammeter in series measures the photocurrent.\n\n(b)(i) Photocurrent against intensity: a **straight line through the origin**. (ii) Photocurrent against collector potential: rises to a **saturation** value for positive potentials and falls to zero at the **stopping potential** $-V_0$; higher intensity gives a higher saturation current but the **same** $V_0$. (iii) Higher frequency at the same intensity: same saturation current, **larger** $V_0$; $V_0$ against ν is a **straight line** meeting the ν axis at the threshold $\\nu_0$.\n\n(c) Any two: $K_\\text{max}$ is independent of intensity; no emission below $\\nu_0$ however intense the light; emission is instantaneous.',
  sol: 'Set-up; three dependences; failures of the wave theory.',
  scheme: [['Arrangement with emitter, collector, variable potential, meters', 1], ['Current ∝ intensity', 1], ['Saturation and stopping potential; same V₀ for different intensities', 1], ['Effect of frequency: V₀ rises linearly, threshold ν₀', 1], ['Two observations against the wave picture', 1]],
  d: 3, c: 'understanding', t: [2], wl: null,
}), () => near(pl.K, 0.462, 0.01) || `pl ${pl.K}`);
const el = { lam: 450, phi: 2.3 };
el.E = eV(el.lam);
el.K = el.E - el.phi;
el.lam0 = HC / el.phi;
el.nu0 = (el.phi * QE) / H;
add('einstein-long', long({
  stem: '(a) Write Einstein’s photoelectric equation and explain each term. (b) Use it to show that the graph of stopping potential against frequency is a straight line, and state what its slope and its intercept on the frequency axis represent. (c) Blue light of wavelength 450 nm falls on a surface of work function 2.3 eV. Find the maximum kinetic energy of the photoelectrons, the stopping potential, the threshold frequency and the threshold wavelength. (hc = 1243 eV nm, h = 6.63 × 10⁻³⁴ J s.)',
  model: r`(a) $h\nu = \varphi_0 + K_\text{max}$: $h\nu$ is the energy of one absorbed photon, $\varphi_0$ the work function (least energy to free an electron), $K_\text{max}$ the maximum kinetic energy of the emitted electron.

(b) With $K_\text{max} = eV_0$: $V_0 = \dfrac{h}{e}\nu - \dfrac{\varphi_0}{e}$, of the form $y = mx + c$, so a straight line. Slope $= h/e$ (the same for all metals); intercept on the ν axis $= \nu_0 = \varphi_0/h$, the threshold frequency.

(c) $h\nu = \dfrac{1243}{450} \approx ${dec(el.E, 3)}$ eV; $K_\text{max} = ${dec(el.E, 3)} - 2.3 \approx ${dec(el.K, 2)}$ eV; $V_0 \approx ${dec(el.K, 2)}$ V. $\nu_0 = \dfrac{2.3 \times 1.6 \times 10^{-19}}{6.63 \times 10^{-34}} \approx ${sci(el.nu0, 3)}$ Hz; $\lambda_0 = \dfrac{1243}{2.3} \approx ${dec(el.lam0, 3)}$ nm.`,
  sol: 'Einstein; V₀–ν line; numbers.',
  scheme: [['Equation with terms explained', 1], ['Straight line: slope h/e', 1], ['Intercept ν₀ = φ₀/h', 1], ['K_max ≈ 0.46 eV, V₀ ≈ 0.46 V', 1], ['ν₀ ≈ 5.55 × 10¹⁴ Hz, λ₀ ≈ 540 nm', 1]],
  d: 3, c: 'application', t: [3], wl: null,
}), () => near(el.K, 0.462, 0.01) && near(el.nu0, 5.55e14) && near(el.lam0, 540) || `el ${el.K} ${el.nu0} ${el.lam0}`);
const dl = { phi: 2.3, lams: [300, 350, 400, 450] };
dl.V = dl.lams.map((l) => Number((eV(l) - dl.phi).toFixed(2)));
dl.nu = dl.lams.map((l) => CL / (l * 1e-9));
dl.slope = (dl.V[0] - dl.V[3]) / (dl.nu[0] - dl.nu[3]);
dl.h = dl.slope * QE;
dl.nu0 = dl.nu[3] - dl.V[3] / dl.slope;
dl.phiOut = (dl.h * dl.nu0) / QE;
add('data-long', long({
  stem: `A student measures the stopping potential for light of four wavelengths falling on one metal: 300 nm → ${dl.V[0].toFixed(2)} V; 350 nm → ${dl.V[1].toFixed(2)} V; 400 nm → ${dl.V[2].toFixed(2)} V; 450 nm → ${dl.V[3].toFixed(2)} V. (a) Convert each wavelength to a frequency. (b) Explain why a graph of V₀ against ν should be a straight line. (c) Using the first and last readings, find the slope, Planck’s constant, the threshold frequency and the work function. (d) Predict the stopping potential for 500 nm light.`,
  model: r`(a) $\nu = c/\lambda$: $${sci(dl.nu[0], 3)}$, $${sci(dl.nu[1], 3)}$, $${sci(dl.nu[2], 3)}$, $${sci(dl.nu[3], 3)}$ Hz.

(b) $eV_0 = h\nu - \varphi_0$ gives $V_0 = (h/e)\nu - \varphi_0/e$: linear in ν.

(c) Slope $= \dfrac{${dl.V[0].toFixed(2)} - ${dl.V[3].toFixed(2)}}{${sci(dl.nu[0], 3)} - ${sci(dl.nu[3], 3)}} \approx ${sci(dl.slope, 3)}$ V s. $h = e \times \text{slope} \approx ${sci(dl.h, 3)}$ J s. $\nu_0 = ${sci(dl.nu[3], 3)} - \dfrac{${dl.V[3].toFixed(2)}}{${sci(dl.slope, 3)}} \approx ${sci(dl.nu0, 3)}$ Hz. $\varphi_0 = h\nu_0 \approx ${dec(dl.phiOut, 3)}$ eV.

(d) $h\nu = \dfrac{1243}{500} \approx 2.49$ eV, so $V_0 \approx 2.49 - ${dec(dl.phiOut, 3)} \approx ${dec(eV(500) - dl.phiOut, 2)}$ V.`,
  sol: 'ν = c/λ; slope h/e; extrapolate to V₀ = 0.',
  scheme: [['Frequencies', 1], ['Linear from Einstein’s equation', 1], ['Slope ≈ 4.14 × 10⁻¹⁵ V s, h ≈ 6.6 × 10⁻³⁴ J s', 1], ['ν₀ ≈ 5.56 × 10¹⁴ Hz, φ₀ ≈ 2.3 eV', 1], ['V₀ ≈ 0.19 V at 500 nm', 1]],
  d: 4, c: 'analysis', t: [2, 3], wl: null,
}), () => near(dl.h, 6.62e-34, 0.01) && near(dl.phiOut, 2.3, 0.01) && near(eV(500) - dl.phiOut, 0.19, 0.06) || `dl ${dl.h} ${dl.phiOut}`);
const db = { V: 150 };
db.lam = dB(ME, db.V * QE);
db.lamP = dB(MP, db.V * QE);
add('debroglie-long', long({
  stem: '(a) State de Broglie’s relation. (b) Show that the de Broglie wavelength of a particle of mass m and charge q accelerated from rest through a potential difference V is λ = h/√(2mqV), and hence that for an electron λ ≈ 1.227/√V nm. (c) Find the wavelength of an electron accelerated through 150 V, and of a proton accelerated through the same potential difference. (d) Why can electrons of this energy be diffracted by crystals while protons of the same energy are much harder to diffract?',
  model: r`(a) A particle of momentum $p$ has wavelength $\lambda = \dfrac{h}{p} = \dfrac{h}{mv}$.

(b) Gain in kinetic energy $K = qV = \dfrac{p^2}{2m}$, so $p = \sqrt{2mqV}$ and $\lambda = \dfrac{h}{\sqrt{2mqV}}$. For an electron: $\dfrac{6.63 \times 10^{-34}}{\sqrt{2 \times 9.1 \times 10^{-31} \times 1.6 \times 10^{-19}}} \approx 1.23 \times 10^{-9}$ m V$^{1/2}$, so $\lambda \approx \dfrac{1.227}{\sqrt{V}}$ nm.

(c) Electron: $\lambda = \dfrac{h}{\sqrt{2m_e eV}} \approx ${sci(db.lam, 3)}$ m (about 0.100 nm). Proton: $\lambda = \dfrac{h}{\sqrt{2m_p eV}} \approx ${sci(db.lamP, 3)}$ m, about 43 times smaller.

(d) The electron’s wavelength (about 0.1 nm) is comparable to the spacing of atoms in a crystal, so the crystal acts as a diffraction grating; the proton’s wavelength is about 43 times smaller, so diffraction effects are far weaker.`,
  sol: 'λ = h/p, K = qV.',
  scheme: [['de Broglie relation', 1], ['Derivation of h/√(2mqV)', 1], ['Electron 1.227/√V nm', 1], ['Electron ≈ 0.100 nm, proton ≈ 2.34 pm', 1], ['Comparison with atomic spacing', 1]],
  d: 3, c: 'application', t: [4], wl: null,
}), () => near(db.lam, 1.0e-10, 0.005) && near(db.lamP, 2.34e-12) || `db ${db.lam} ${db.lamP}`);
const ph = { P: 5.0e-3, lam: 650e-9, phi: 2.0 };
ph.E = (H * CL) / ph.lam;
ph.N = ph.P / ph.E;
ph.EeV = ph.E / QE;
ph.K = ph.EeV - ph.phi;
add('photon-long', long({
  stem: '(a) State four properties of photons. (b) A 5.0 mW red laser emits light of wavelength 650 nm. Find the energy of each photon (in J and eV) and the number of photons emitted per second. (c) The beam falls on a surface of work function 2.0 eV. Will photoelectrons be emitted? If so, find their maximum kinetic energy. (d) How would the photocurrent and the maximum kinetic energy change if a 10 mW laser of the same wavelength were used?',
  model: r`(a) Any four: energy $E = h\nu$; momentum $p = h/\lambda$; speed $c$ in vacuum; zero rest mass; no charge; intensity of light ∝ number of photons per second; energy and momentum conserved in collisions.

(b) $E = \dfrac{hc}{\lambda} = \dfrac{6.63 \times 10^{-34} \times 3.0 \times 10^{8}}{650 \times 10^{-9}} \approx ${sci(ph.E, 3)}$ J $\approx ${dec(ph.EeV, 3)}$ eV. $N = \dfrac{P}{E} = \dfrac{5.0 \times 10^{-3}}{${sci(ph.E, 3)}} \approx ${sci(ph.N, 3)}$ s$^{-1}$.

(c) **No.** Each photon has only about $${dec(ph.EeV, 3)}$ eV, less than the work function of 2.0 eV, and one photon must free one electron, so no photoelectrons are emitted.

(d) A 10 mW laser sends **twice as many** photons per second, but each still has about $${dec(ph.EeV, 3)}$ eV, below 2.0 eV. There is **still no emission**: the photocurrent stays zero and there is no kinetic energy to speak of. Only light of shorter wavelength (below $1243/2.0 \approx 622$ nm) would work.`,
  sol: 'E = hc/λ; N = P/E; Einstein.',
  scheme: [['Four properties', 1], ['E ≈ 3.06 × 10⁻¹⁹ J ≈ 1.91 eV', 1], ['N ≈ 1.63 × 10¹⁶ s⁻¹', 1], ['1.91 eV < 2.0 eV: no emission', 1], ['10 mW: more photons but still no emission; need λ < 622 nm', 1]],
  d: 4, c: 'analysis', t: [3], wl: null,
}), () => near(ph.EeV, 1.91) && near(ph.N, 1.63e16) && ph.K < 0 || `ph ${ph.EeV} ${ph.N}`);

// ================================================================ case-based (4 marks: 1 + 1 + 2)
const st = { phi: 2.1 };
st.lam0 = HC / st.phi;
add('streetlight-case', mk.case({
  passage: 'Streetlights along a road in Lucknow switch on automatically at dusk. Each has a small photocell with a caesium-coated emitter (work function about 2.1 eV). While daylight falls on it, the photocurrent holds a relay open; as the light fades the current falls, the relay closes and the lamp comes on. An engineer considers replacing the emitter with zinc (work function about 4.3 eV) because zinc is cheaper.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'As daylight fades in the evening (its colour changing little), what happens in the photocell?',
      right: 'Fewer photoelectrons are emitted, so the photocurrent falls',
      wrong: ['The photoelectrons come out more slowly but in the same numbers', 'Emission stops only when the light becomes red', 'The work function of caesium increases'],
      sol: 'Lower intensity means fewer photons per second and so fewer photoelectrons; their maximum energy is unchanged — option (@K).',
      d: 2, c: 'understanding', t: [2, 3],
    })),
    part('b', num({
      stem: 'Find the threshold wavelength of caesium, in nm (3 significant figures). (hc = 1243 eV nm.)',
      value: Number(dec(st.lam0, 3)), tol: 2, unit: 'nm',
      sol: r`$\lambda_0 = \dfrac{hc}{\varphi_0} = \dfrac{1243}{2.1} \approx ${dec(st.lam0, 3)}$ nm.`,
      scheme: [['λ₀ = hc/φ₀ ≈ 592 nm', 1]],
      d: 2, c: 'application', t: [3],
    })),
    part('c', short({
      marks: 2,
      stem: 'Explain why caesium is a suitable emitter for this photocell.',
      model: 'Its threshold wavelength, about **592 nm**, lies **in the visible** range, so ordinary daylight (violet to yellow) has photons energetic enough to free electrons. A photocell meant to respond to **daylight** needs a metal with a **low work function** like this.',
      sol: 'Threshold in the visible.',
      scheme: [['λ₀ ≈ 592 nm, within the visible', 1], ['Daylight photons can free electrons', 1]],
      d: 2, c: 'application', t: [3],
    }), [
      short({
        marks: 2,
        stem: 'Evaluate the engineer’s plan to use zinc instead of caesium.',
        model: 'It would **not work**. Zinc’s threshold wavelength is $1243/4.3 \\approx 289$ nm, in the **ultraviolet**. Most of the Sun’s ultraviolet is absorbed by the atmosphere, and visible photons (below about 3.1 eV) cannot free electrons from zinc, so there would be almost **no photocurrent** even in daylight and the lamps would stay on.',
        sol: 'Zinc needs UV.',
        scheme: [['Zinc threshold ≈ 289 nm (UV)', 1], ['Visible daylight cannot eject electrons: plan fails', 1]],
        d: 3, c: 'evaluation', t: [3],
      }),
    ]),
  ],
}), (q) => near(st.lam0, 592) && near(q.children[1].answer.value, 592, 0.005) || `st ${st.lam0}`);

const em = { V: 50e3 };
em.lam = dB(ME, em.V * QE);
add('microscope-case', mk.case({
  passage: 'A transmission electron microscope in a Bengaluru research laboratory accelerates electrons from rest through 50 kV to image viruses and the arrangement of atoms in thin samples. Visible light, with wavelengths of 400–700 nm, cannot show details much smaller than about 200 nm. (Ignore relativistic effects.)',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'Why can the electron microscope show much finer detail than a light microscope?',
      right: 'The de Broglie wavelength of the fast electrons is far shorter than the wavelength of visible light',
      wrong: ['Electrons travel faster than light', 'Electrons are charged, so they stick to fine details', 'Electrons have a longer wavelength, so they bend round small objects'],
      sol: 'The finest detail a microscope can show is limited by the wavelength used; 50 kV electrons have λ of a few picometres — option (@K).',
      d: 2, c: 'understanding', t: [4],
    })),
    part('b', num({
      stem: 'Find the de Broglie wavelength of the electrons, in picometres (3 significant figures).',
      value: Number(dec(em.lam * 1e12, 3)), tol: 0.03, unit: 'pm',
      sol: r`$\lambda = \dfrac{h}{\sqrt{2meV}} = \dfrac{6.63 \times 10^{-34}}{\sqrt{2 \times 9.1 \times 10^{-31} \times 1.6 \times 10^{-19} \times 5.0 \times 10^{4}}} \approx ${sci(em.lam, 3)}$ m, i.e. $${sci(em.lam, 3)} \times 10^{12} = ${dec(em.lam * 1e12, 3)}$ pm.`,
      scheme: [['λ ≈ 5.49 pm', 1]],
      d: 3, c: 'application', t: [4],
    })),
    part('c', short({
      marks: 2,
      stem: 'How would the wavelength change if the accelerating voltage were raised to 200 kV? Explain.',
      model: r`$\lambda \propto \dfrac{1}{\sqrt{V}}$. Raising V from 50 kV to 200 kV multiplies it by **4**, so λ is **halved**, to about 2.7 pm (ignoring relativity). Shorter wavelength allows even **finer detail**.`,
      sol: 'λ ∝ 1/√V.',
      scheme: [['λ ∝ 1/√V', 1], ['Four times V: λ halves to ≈ 2.7 pm', 1]],
      d: 3, c: 'application', t: [4], wl: null,
    }), [
      short({
        marks: 2,
        stem: 'A student claims that protons accelerated through the same 50 kV would have a LONGER wavelength than the electrons, because protons are bigger. Evaluate the claim.',
        model: 'The claim is **wrong**. With the same charge and voltage, both gain the same kinetic energy $eV$, and $\\lambda = h/\\sqrt{2mK}$. The proton is about 1835 times **heavier**, so its wavelength is about $\\sqrt{1835} \\approx 43$ times **shorter**, not longer. Size does not enter the de Broglie relation; momentum does.',
        sol: 'Same K; λ ∝ 1/√m.',
        scheme: [['Same K; λ ∝ 1/√m', 1], ['Proton λ ≈ 43 times shorter: claim wrong', 1]],
        d: 4, c: 'evaluation', t: [4],
      }),
    ]),
  ],
}), (q) => near(em.lam, 5.49e-12) && near(q.children[1].answer.value, 5.49) || `em ${em.lam}`);

const lb = { lam: 470, V0: 0.62 };
lb.E = eV(lb.lam);
lb.phi = lb.E - lb.V0;
lb.red = eV(650);
add('led-case', mk.case({
  passage: 'Students in a Guwahati school laboratory shine LEDs of different colours on the emitter of a photocell and measure the stopping potential. With a blue LED (wavelength 470 nm) the stopping potential is 0.62 V. With a red LED (wavelength 650 nm) the microammeter shows no current at all, even when the LED is at full brightness.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'What does the stopping potential measured with the blue LED tell the students directly?',
      right: 'The maximum kinetic energy of the photoelectrons, in eV',
      wrong: ['The number of photons per second from the LED', 'The work function of the emitter, in eV', 'The intensity of the blue light'],
      sol: 'eV₀ = K_max: a stopping potential of 0.62 V means K_max = 0.62 eV — option (@K).',
      d: 1, c: 'understanding', t: [2],
    })),
    part('b', num({
      stem: 'Find the work function of the emitter, in eV (2 decimal places). (hc = 1243 eV nm.)',
      value: Number(lb.phi.toFixed(2)), tol: 0.02, unit: 'eV',
      sol: r`$h\nu = \dfrac{1243}{470} \approx ${dec(lb.E, 3)}$ eV; $\varphi_0 = h\nu - eV_0 = ${dec(lb.E, 3)} - 0.62 = ${lb.phi.toFixed(2)}$ eV.`,
      scheme: [['φ₀ = hν − eV₀ ≈ 2.02 eV', 1]],
      d: 3, c: 'application', t: [3],
    })),
    part('c', short({
      marks: 2,
      stem: 'Explain why the red LED produces no current at all.',
      model: r`A red photon has energy $\dfrac{1243}{650} \approx ${dec(lb.red, 3)}$ eV, **less** than the work function of about 2.02 eV. One photon frees one electron, so **no single photon** can eject an electron, and no current flows.`,
      sol: 'Red photon energy below φ₀.',
      scheme: [['Red photon ≈ 1.91 eV < φ₀', 1], ['One photon per electron: no emission', 1]],
      d: 3, c: 'application', t: [3], wl: null,
    }), [
      short({
        marks: 2,
        stem: 'One student suggests using a much brighter red LED to obtain a current. Evaluate this suggestion.',
        model: 'It will **not work**. A brighter red LED emits **more photons** per second, but each still has only about 1.9 eV, below the work function. Energy cannot be **added up** from several photons by one electron in ordinary light, so there is still **no emission**. Only a **shorter wavelength** (below about 615 nm) would produce a current.',
        sol: 'Intensity cannot beat the threshold.',
        scheme: [['More photons, same energy each', 1], ['Still below threshold: no current; need shorter λ', 1]],
        d: 3, c: 'evaluation', t: [3],
      }),
    ]),
  ],
}), (q) => near(lb.phi, 2.02, 0.005) && near(q.children[1].answer.value, 2.02) && lb.red < lb.phi || `lb ${lb.phi} ${lb.red}`);

// ================================================================ further items (type and key balance)
const xr = HC / 0.1;
add('xray-mcq', mcq({
  stem: 'An X-ray photon has a wavelength of 0.10 nm. Its energy is about',
  right: '12 keV',
  wrong: ['12 eV', '1.2 eV', '120 keV'],
  sol: 'E = hc/λ = 1243 eV nm ÷ 0.10 nm ≈ 12 400 eV ≈ 12 keV — option (@K).',
  d: 2, c: 'application', t: [3],
}), () => near(xr, 12431) || `xr ${xr}`);
add('faster-ar', ar({
  a: 'The de Broglie wavelength of an electron becomes longer when it is accelerated through a larger potential difference.',
  r: 'The de Broglie wavelength of a particle is λ = h/p.',
  key: 'd',
  sol: 'R is true. A is false: a larger potential difference gives a larger momentum, so λ = h/p becomes SHORTER — option (d).',
  d: 2, c: 'understanding', t: [4],
}));
