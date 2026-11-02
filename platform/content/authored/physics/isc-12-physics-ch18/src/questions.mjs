// ISC 12 Physics ch18 Dual Nature of Radiation and Matter — question bank (ISC style).
// Constants as stated in the stems: h = 6.6 × 10⁻³⁴ J s, e = 1.6 × 10⁻¹⁹ C, c = 3 × 10⁸ m/s, mₑ = 9.1 × 10⁻³¹ kg,
// mₚ = 1.67 × 10⁻²⁷ kg (hc/e = 1237.5 eV nm). Every number is computed here; the check callbacks re-solve each item in SI
// units from first principles (E = hc/λ in joules, ½mv², p = h/λ, λ = h/p) independently of the eV-nm shortcuts used in
// the answers. The Davisson–Germer experiment is examined qualitatively only (its quantitative treatment is removed in ISC).
import { mk, add, r, dec, sci, near } from '../../isc-12-physics-ch01/src/lib.mjs';
import { H, QE, CL, ME, MP, HC, photonEV, thresholdF, thresholdLam, speedOf, lamElectron, keForLam } from './svgs.mjs';

const { mcq, ar, tf, fill, match, num, short, long } = mk;
/** SI re-solve helpers (joules, metres), independent of the eV nm shortcut. */
const EJ = (lamNm) => (H * CL) / (lamNm * 1e-9);
const vFromJ = (KJ) => Math.sqrt((2 * KJ) / ME);
const CONSTS = '(h = 6.6 × 10⁻³⁴ J s, c = 3 × 10⁸ m s⁻¹, e = 1.6 × 10⁻¹⁹ C)';

// ================================================================ t01 photoelectric effect: observations and facts
add('hertz-mcq', mcq({
  stem: 'In one of Hertz’s experiments, the longest spark the receiver gap could produce became shorter when a sheet of ordinary glass was placed between the transmitter spark and the receiver gap, but not when a sheet of quartz was used instead. The most reasonable conclusion is that',
  right: 'ultraviolet light from the transmitter spark helps charge to escape from the receiver electrodes',
  wrong: ['the glass sheet absorbs the radio waves travelling to the receiver', 'visible light from the transmitter spark heats the receiver electrodes', 'quartz conducts electricity and so completes the receiver circuit'],
  sol: 'Glass absorbs ultraviolet but lets visible light and radio waves through, while quartz transmits ultraviolet. Only blocking the ultraviolet weakened the receiver sparks, so ultraviolet light was helping charges leave the receiver electrodes — the first sign of the photoelectric effect — option (@K).',
  d: 3, c: 'analysis', t: [1],
}));
add('zerov-mcq', mcq({
  stem: 'In Lenard’s apparatus the collector is joined to the emitter through the microammeter alone, so that there is no potential difference between them. With ultraviolet light on the emitter, the microammeter still shows a small current because',
  right: 'some photoelectrons leave the emitter with enough kinetic energy to reach the collector unaided',
  wrong: ['the ultraviolet light ionises gas molecules between the plates', 'the light charges the collector positively', 'photoelectrons are pulled out of the emitter by the microammeter'],
  sol: 'Photoelectrons are emitted with kinetic energies from zero up to K_max; those moving towards the collector reach it even with no accelerating field, so a small current flows at V = 0 (the bulb is evacuated, so there is no gas to ionise) — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('curves-mcq', mcq({
  stem: 'Two curves P and Q of photocurrent against collector potential are recorded for one photocell. Both fall to zero at the same negative potential, but P levels off at three times the current of Q. Compared with the light used for Q, the light used for P has',
  right: 'the same frequency and three times the intensity',
  wrong: ['three times the frequency and the same intensity', 'a higher frequency and a lower intensity', 'the same intensity and a longer wavelength'],
  sol: 'The same stopping potential means the same K_max = hf − W₀, so the same frequency. A saturation current three times as large means three times as many photoelectrons per second, so three times the intensity — option (@K).',
  d: 2, c: 'analysis', t: [1],
}));
add('dist-tf', tf({
  stem: 'A photocell lit by a small ultraviolet lamp is moved from 0.50 m to 1.0 m away from the lamp. Its stopping potential stays the same, while its saturation current falls to about a quarter.',
  key: 't',
  sol: 'True. The frequency of the light is unchanged, so V₀ (set by hf − W₀) is unchanged. The intensity from a small source falls as 1/r², so doubling the distance gives a quarter of the photons per second and about a quarter of the saturation current.',
  d: 2, c: 'application', t: [1],
}), () => near((0.5 / 1.0) ** 2, 0.25) || 'dist');
add('stop-fill', fill({
  stem: 'In Lenard’s experiment the collector is made more and more negative relative to the emitter until the microammeter just reads zero. The magnitude of this collector potential is called the ___ potential.',
  acc: [['stopping', 'cut-off', 'cutoff']],
  sol: 'The stopping (cut-off) potential V₀: at this potential even the fastest photoelectrons are turned back, so eV₀ = K_max.',
  d: 1, c: 'recall', t: [1],
}));
add('spread-ar', ar({
  a: 'When the collector of a photocell is made slightly negative, the photocurrent falls but does not become zero at once.',
  r: 'Photoelectrons leave the emitter with kinetic energies ranging from zero up to a maximum value.',
  key: 'a',
  sol: 'Both are true and R explains A: a small retarding potential turns back only the slower electrons; the current reaches zero only when the potential stops the fastest ones (eV₀ = K_max) — option (a).',
  d: 2, c: 'understanding', t: [1],
}));
add('wave-ar', ar({
  a: 'Photoelectrons are emitted without any measurable delay, even when light just above the threshold frequency is very dim.',
  r: 'In the wave theory, the energy of light is spread continuously over the whole wavefront.',
  key: 'b',
  sol: 'Both statements are true, but R does not explain A: a continuous spread of energy would make each electron wait to gather enough, predicting a delay. A is explained by photons, each absorbed whole by one electron — option (b).',
  d: 3, c: 'understanding', t: [1],
}));
const sc = { I: 4.8e-6 };
sc.n = sc.I / QE;
add('satcount-num', num({
  stem: 'The saturation photocurrent of the photocell in a light meter is 4.8 μA. How many photoelectrons leave its emitter each second? Give the answer in units of 10¹³.',
  value: Number(dec(sc.n / 1e13, 2)), tol: 0.05, unit: null,
  sol: r`At saturation every emitted electron is collected: $n = \dfrac{I}{e} = \dfrac{4.8 \times 10^{-6}}{1.6 \times 10^{-19}} = 3.0 \times 10^{13}$ per second, so $\dfrac{n}{10^{13}} = 3.0$.`,
  scheme: [['n = I/e = 3.0 × 10¹³ per second', 1]],
  d: 2, c: 'application', t: [1],
}), (q) => near(q.answer.value * 1e13 * 1.6e-19, 4.8e-6) || `sc ${sc.n}`);
const sp = { V0: 0.91 };
sp.KJ = sp.V0 * QE;
sp.v = Math.sqrt((2 * sp.KJ) / ME);
add('speed-num', num({
  stem: 'The fastest photoelectrons from a barium emitter are just stopped when the collector is 0.91 V below the emitter. Find their speed, in units of 10⁵ m s⁻¹ (3 significant figures). (mₑ = 9.1 × 10⁻³¹ kg, e = 1.6 × 10⁻¹⁹ C.)',
  value: Number(dec(sp.v / 1e5, 3)), tol: 0.02, unit: null,
  sol: r`$K_{\max} = eV_0 = 1.6 \times 10^{-19} \times 0.91 = 1.456 \times 10^{-19}$ J. $v_{\max} = \sqrt{\dfrac{2K_{\max}}{m}} = \sqrt{\dfrac{2 \times 1.456 \times 10^{-19}}{9.1 \times 10^{-31}}} = \sqrt{3.2 \times 10^{11}} \approx ${sci(sp.v, 3)}$ m s⁻¹, so $\dfrac{v_{\max}}{10^{5}\ \text{m s}^{-1}} = 5.66$.`,
  scheme: [['K_max = eV₀ = 1.456 × 10⁻¹⁹ J', 1], ['v = √(2K/m) = 5.66 × 10⁵ m s⁻¹', 1]],
  marks: 2, d: 2, c: 'application', t: [1, 2],
}), (q) => near(0.5 * ME * (q.answer.value * 1e5) ** 2, 0.91 * QE, 0.005) && q.answer.value === 5.66 || `sp ${sp.v}`);
const tl = { P: 1.0, rr: 3.0, A: 2.0e-20, W: 3.0 };
tl.I = tl.P / (4 * Math.PI * tl.rr ** 2);
tl.p = tl.I * tl.A;
tl.t = (tl.W * QE) / tl.p;
add('timelag-short3', short({
  marks: 3,
  stem: 'A physicist in 1900 argues that a metal plate 3.0 m from a 1.0 W ultraviolet source will start emitting electrons only after a delay. Assume the source radiates uniformly in all directions, each electron absorbs the energy falling on an area of 2.0 × 10⁻²⁰ m², and the metal’s work function is 3.0 eV. Estimate the delay the wave theory predicts, and evaluate the argument in the light of experiment.',
  model: r`Intensity at 3.0 m: $I = \dfrac{P}{4\pi r^2} = \dfrac{1.0}{4\pi \times 3.0^2} \approx ${sci(tl.I, 3)}$ W m⁻². Power reaching one electron: $IA \approx ${sci(tl.p, 3)}$ W. Energy needed: $3.0 \times 1.6 \times 10^{-19} = 4.8 \times 10^{-19}$ J, so $t \approx \dfrac{4.8 \times 10^{-19}}{${sci(tl.p, 3)}} \approx ${sci(tl.t, 2)}$ s, about ${Math.round(tl.t / 60)} minutes.
The argument fails: experiment shows emission within about $10^{-9}$ s, however weak the light (above threshold). Energy arrives in photons, each absorbed whole by one electron, so there is no waiting.`,
  sol: 'I = P/4πr², power on the area, time = W₀/(power); compare with the observed instantaneous emission.',
  scheme: [['I ≈ 8.84 × 10⁻³ W m⁻² and power ≈ 1.77 × 10⁻²² W on the area', 1], ['t ≈ 2.7 × 10³ s (about 45 min)', 1], ['Observed emission is instantaneous; photons explain it, so the argument is rejected', 1]],
  d: 4, c: 'evaluation', t: [1], wl: null,
}), () => near(tl.t, 2714, 0.002) && near((4.8e-19 / (1.0 / (4 * Math.PI * 9)) / 2e-20) / 60, 45.2, 0.01) || `tl ${tl.t}`);
add('lenard-short3', short({
  marks: 3,
  stem: 'Describe Lenard’s arrangement for studying the photoelectric effect, and explain how it is used to measure the stopping potential for light of a given frequency.',
  model: 'Two metal plates, an emitter C and a collector A, are sealed in an evacuated glass bulb with a quartz window, through which monochromatic light falls on C. A battery across a rheostat, with a reversing key, applies a variable potential V between A and C, read on a voltmeter; a microammeter measures the photocurrent. To find the stopping potential, the key is reversed so that A is negative, and the retarding potential is raised until the photocurrent just becomes zero; that potential is V₀.',
  sol: 'Evacuated bulb, emitter, collector, quartz window, potential divider with reversing key, meters; increase the retarding potential until the current is zero.',
  scheme: [['Evacuated bulb with emitter and collector; light through a quartz window', 1], ['Potential divider with reversing key, voltmeter and microammeter', 1], ['Collector made negative and the potential raised until the current just becomes zero: V₀', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('claim-short2', short({
  marks: 2,
  stem: 'A student doubles the brightness of a lamp shining on a photocell and expects the stopping potential to double, because “twice the energy arrives each second”. Evaluate this expectation.',
  model: 'The expectation is wrong. Doubling the intensity doubles the number of photons arriving per second, but each photon still carries the same energy hf. Each electron absorbs one photon, so K_max = hf − W₀ and the stopping potential are unchanged; only the number of photoelectrons, and so the saturation current, doubles.',
  sol: 'Intensity changes the number of photons, not their energy.',
  scheme: [['Each photon still has energy hf, so K_max and V₀ are unchanged', 1], ['Twice the photons: twice the photoelectrons and saturation current', 1]],
  d: 2, c: 'evaluation', t: [1, 2],
}));
const pf = { l1: 480, l2: 240, W: 2.1 };
pf.E1 = photonEV(pf.l1);
pf.E2 = photonEV(pf.l2);
pf.V1 = pf.E1 - pf.W;
pf.V2 = pf.E2 - pf.W;
add('photonflux-short2', short({
  marks: 2,
  stem: 'Two beams of equal intensity (the same power per unit area), of wavelengths 480 nm and 240 nm, fall in turn on the same rubidium emitter (W₀ = 2.1 eV). Assuming each photon has the same chance of freeing an electron, which beam gives (a) the larger saturation current, (b) the larger stopping potential? Explain. (hc = 1237.5 eV nm.)',
  model: r`(a) The 480 nm beam. Its photons carry half the energy ($${dec(pf.E1, 3)}$ eV against $${dec(pf.E2, 3)}$ eV), so at equal intensity twice as many photons arrive per second, freeing twice as many electrons.
(b) The 240 nm beam: $V_0 = ${dec(pf.E2, 3)} - 2.1 \approx ${dec(pf.V2, 3)}$ V, against $${dec(pf.E1, 3)} - 2.1 \approx ${dec(pf.V1, 2)}$ V for 480 nm.`,
  sol: 'Equal power: N ∝ λ; V₀ = hc/λe − W₀/e.',
  scheme: [['(a) 480 nm: half the photon energy, so twice as many photons and twice the current', 1], ['(b) 240 nm: V₀ ≈ 3.06 V against 0.48 V', 1]],
  d: 3, c: 'analysis', t: [1, 2], wl: null,
}), () => near(EJ(480) / EJ(240), 0.5) && near((EJ(240) - 2.1 * QE) / QE, 3.056, 0.001) && near((EJ(480) - 2.1 * QE) / QE, 0.478, 0.002) || `pf ${pf.V2}`);
const lk = { V0: 1.25 };
lk.KJ = lk.V0 * QE;
add('lenard-long', long({
  stem: '(a) Describe, with a labelled diagram (described in words), Lenard’s apparatus for studying the photoelectric effect. [2] (b) Describe how the photocurrent varies with the collector potential for two beams of the same frequency but different intensities, and state what the graphs show about the stopping potential. [2] (c) For one beam the photocurrent just becomes zero when the collector is 1.25 V negative with respect to the emitter. Find the maximum kinetic energy of the photoelectrons in eV and in joules. [1]',
  model: r`(a) An evacuated glass bulb contains a metal emitter C and a collector A. Monochromatic light enters through a quartz window (which transmits ultraviolet) and falls on C. A battery connected across a rheostat (potential divider) with a reversing key applies a variable potential V to A relative to C, measured by a voltmeter; a microammeter in series with A measures the photocurrent.
(b) For each beam a current flows even at V = 0. As V is made positive the current rises to a saturation value, larger for the more intense beam (saturation current ∝ intensity). As V is made negative the current falls and becomes zero at $V = -V_0$; both curves reach zero at the **same** stopping potential, so V₀ (and K_max) does not depend on intensity.
(c) $K_{\max} = eV_0 = 1.25$ eV $= 1.25 \times 1.6 \times 10^{-19} = ${sci(lk.KJ, 2)}$ J.`,
  sol: 'Apparatus; current–potential curves for two intensities; K_max = eV₀.',
  scheme: [['Evacuated bulb, emitter and collector, quartz window', 1], ['Potential divider with reversing key; voltmeter and microammeter', 1], ['Current at V = 0, saturation ∝ intensity', 1], ['Same stopping potential for both intensities', 1], ['K_max = 1.25 eV = 2.0 × 10⁻¹⁹ J', 1]],
  d: 2, c: 'understanding', t: [1], wl: null,
}), () => near(lk.KJ, 2.0e-19) || `lk ${lk.KJ}`);

// ================================================================ t02 photons, Einstein's equation, threshold, work function
const uv = { lam: 375 };
uv.E = photonEV(uv.lam);
add('e375-mcq', mcq({
  stem: `An ultraviolet LED used to check banknotes emits light of wavelength 375 nm. Each of its photons carries an energy of about ${CONSTS}`,
  right: '3.3 eV',
  wrong: ['5.3 eV', '0.33 eV', '2.2 eV'],
  sol: r`$E = \dfrac{hc}{\lambda} = \dfrac{6.6 \times 10^{-34} \times 3 \times 10^{8}}{375 \times 10^{-9}} = 5.28 \times 10^{-19}$ J, which is $\dfrac{5.28 \times 10^{-19}}{1.6 \times 10^{-19}} = 3.3$ eV — option (@K). (5.3 is the energy in units of 10⁻¹⁹ J, not in eV.)`,
  d: 1, c: 'application', t: [2],
}), () => near(EJ(375) / QE, 3.3) || `uv ${uv.E}`);
const gr = { lam: 540 };
gr.E = photonEV(gr.lam);
add('green-mcq', mcq({
  stem: 'Light of wavelength 540 nm from a green LED falls in turn on four clean plates with work functions: rubidium 2.1 eV, calcium 2.9 eV, aluminium 4.1 eV and platinum 5.6 eV. Taking hc = 1237.5 eV nm, photoelectrons are emitted from',
  right: 'rubidium only',
  wrong: ['all four plates', 'rubidium and calcium only', 'none of the plates'],
  sol: r`$E = \dfrac{1237.5}{540} \approx ${dec(gr.E, 3)}$ eV. Only rubidium has a work function below this, so only rubidium emits — option (@K).`,
  d: 2, c: 'application', t: [2],
}), () => { const E = EJ(540) / QE; return (E > 2.1 && E < 2.9) || `gr ${E}`; });
add('kf-mcq', mcq({
  stem: 'A graph of the maximum kinetic energy of photoelectrons (y-axis) against the frequency of the incident light (x-axis) is drawn for a calcium surface. The graph is',
  right: 'a straight line of slope h that cuts the frequency axis at the threshold frequency',
  wrong: ['a straight line through the origin of slope h', 'a curve that rises steeply and then levels off', 'a straight line of slope h/e that cuts the frequency axis at the threshold frequency'],
  sol: 'K_max = hf − W₀: a straight line of slope h, zero at f₀ = W₀/h (and, extended, −W₀ at f = 0). The slope h/e belongs to the stopping potential graph — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('vrise-mcq', mcq({
  stem: 'For a strontium photocathode lit by ultraviolet light, which single change would increase the stopping potential?',
  right: 'Using light of a shorter wavelength',
  wrong: ['Using a brighter lamp of the same wavelength', 'Moving the lamp closer to the photocell', 'Making the collector more positive'],
  sol: 'eV₀ = hc/λ − W₀ rises only if the photon energy rises, i.e. for a shorter wavelength. Brightness and distance change only the number of photons; the collector potential does not change the electrons’ energy at emission — option (@K).',
  d: 1, c: 'understanding', t: [2],
}));
add('twometals-mcq', mcq({
  stem: 'Graphs of maximum kinetic energy against frequency are drawn on the same axes for barium (W₀ = 2.5 eV) and for a second metal of work function 5.0 eV. Compared with the barium line, the line for the second metal',
  right: 'is parallel to it and cuts the frequency axis at twice the frequency',
  wrong: ['is twice as steep and starts at the same frequency', 'is parallel to it and cuts the frequency axis at half the frequency', 'is half as steep and starts at twice the frequency'],
  sol: 'K_max = hf − W₀: the slope h is the same for every metal, so the lines are parallel; the threshold f₀ = W₀/h doubles when W₀ doubles — option (@K).',
  d: 2, c: 'understanding', t: [2, 3],
}), () => near(thresholdF(5) / thresholdF(2.5), 2) || 'tm');
const st = { W: 2.6 };
st.lam0 = thresholdLam(st.W);
add('lam0-num', num({
  stem: `The work function of strontium is 2.6 eV. Find its threshold wavelength, in nm (3 significant figures). ${CONSTS}`,
  value: Number(dec(st.lam0, 3)), tol: 1, unit: 'nm',
  sol: r`$hc = 6.6 \times 10^{-34} \times 3 \times 10^{8} = 1.98 \times 10^{-25}$ J m and $W_0 = 2.6 \times 1.6 \times 10^{-19} = 4.16 \times 10^{-19}$ J, so $\lambda_0 = \dfrac{hc}{W_0} = \dfrac{1.98 \times 10^{-25}}{4.16 \times 10^{-19}} \approx 4.76 \times 10^{-7}$ m, that is $\lambda_0 = ${dec(st.lam0, 3)}$ nm.`,
  scheme: [['λ₀ = hc/W₀ with W₀ in joules', 1], ['λ₀ = 476 nm', 1]],
  marks: 2, d: 2, c: 'application', t: [2],
}), (q) => near(EJ(q.answer.value), 2.6 * QE, 0.002) || `st ${st.lam0}`);
const tg = { W: 4.5 };
tg.f0 = thresholdF(tg.W);
add('f0-num', num({
  stem: 'The work function of tungsten is 4.5 eV. Find its threshold frequency, in units of 10¹⁵ Hz (3 significant figures). (h = 6.6 × 10⁻³⁴ J s, e = 1.6 × 10⁻¹⁹ C.)',
  value: Number(dec(tg.f0 / 1e15, 3)), tol: 0.01, unit: null,
  sol: r`$f_0 = \dfrac{W_0}{h} = \dfrac{4.5 \times 1.6 \times 10^{-19}}{6.6 \times 10^{-34}} \approx ${sci(tg.f0, 3)}$ Hz, i.e. 1.09 in units of $10^{15}$ Hz.`,
  scheme: [['f₀ = W₀/h = 1.09 × 10¹⁵ Hz', 1]],
  d: 2, c: 'understanding', t: [2],
}), (q) => near(H * q.answer.value * 1e15, 4.5 * QE, 0.005) && q.answer.value === 1.09 || `tg ${tg.f0}`);
const cu = { lam: 210, W: 4.7 };
cu.E = photonEV(cu.lam);
cu.V0 = cu.E - cu.W;
add('v0cu-num', num({
  stem: 'Ultraviolet light of wavelength 210 nm falls on a clean copper surface (W₀ = 4.7 eV). Find the stopping potential, in volts (2 significant figures). (Take hc = 1237.5 eV nm.)',
  value: Number(dec(cu.V0, 2)), tol: 0.05, unit: 'V',
  sol: r`$E = \dfrac{1237.5}{210} \approx ${dec(cu.E, 3)}$ eV, so $K_{\max} \approx 5.89 - 4.7 = 1.19$ eV and $V_0 \approx ${dec(cu.V0, 2)}$ V.`,
  scheme: [['Photon energy 5.89 eV', 1], ['V₀ = 5.89 − 4.7 ≈ 1.2 V', 1]],
  marks: 2, d: 2, c: 'application', t: [2],
}), (q) => near((EJ(210) - 4.7 * QE) / QE, q.answer.value, 0.01) || `cu ${cu.V0}`);
const ph = { lam: 275, V0: 1.6 };
ph.E = photonEV(ph.lam);
ph.W = ph.E - ph.V0;
add('phi-num', num({
  stem: 'Light of wavelength 275 nm ejects photoelectrons from a metal surface, and the stopping potential is found to be 1.6 V. Find the work function of the metal, in eV (2 significant figures). (Take hc = 1237.5 eV nm.)',
  value: Number(dec(ph.W, 2)), tol: 0.05, unit: 'eV',
  sol: r`$E = \dfrac{1237.5}{275} = 4.5$ eV, and $W_0 = E - eV_0 = 4.5 - 1.6 = 2.9$ eV.`,
  scheme: [['E = 4.5 eV', 1], ['W₀ = 4.5 − 1.6 = 2.9 eV', 1]],
  marks: 2, d: 2, c: 'application', t: [2],
}), (q) => near(EJ(275) - 1.6 * QE, q.answer.value * QE) || `ph ${ph.W}`);
const hv = { E: 3.0, K: 0.8 };
hv.W = hv.E - hv.K;
hv.K2 = 2 * hv.E - hv.W;
add('halve-num', num({
  stem: 'Photons of energy 3.0 eV free electrons from a surface with a maximum kinetic energy of 0.80 eV. The wavelength of the light is now halved. Find the new maximum kinetic energy of the photoelectrons, in eV.',
  value: Number(dec(hv.K2, 2)), tol: 0.05, unit: 'eV',
  sol: r`Work function: $W_0 = 3.0 - 0.80 = 2.2$ eV. Halving λ doubles the photon energy to 6.0 eV, so $K_{\max} = 6.0 - 2.2 = 3.8$ eV (almost five times as much, not twice).`,
  scheme: [['W₀ = 2.2 eV', 1], ['New K_max = 6.0 − 2.2 = 3.8 eV', 1]],
  marks: 2, d: 3, c: 'analysis', t: [2],
}), (q) => { const lam = (H * CL) / (3.0 * QE); return near((H * CL) / (lam / 2) / QE - 2.2, q.answer.value) || `hv ${hv.K2}`; });
const ld = { P: 12e-3, lam: 365, ratio: 200 };
ld.EJ = (H * CL) / (ld.lam * 1e-9);
ld.N = ld.P / ld.EJ;
ld.I = (ld.N / ld.ratio) * QE;
add('led-num', num({
  stem: `A 12 mW ultraviolet LED of wavelength 365 nm shines all its light on the emitter of a photocell. If one photon in every 200 frees an electron, and every freed electron is collected, find the photocurrent, in μA (3 significant figures). ${CONSTS}`,
  value: Number(dec(ld.I * 1e6, 3)), tol: 0.2, unit: 'μA',
  sol: r`Photon energy $E = \dfrac{hc}{\lambda} = \dfrac{1.98 \times 10^{-25}}{365 \times 10^{-9}} \approx ${sci(ld.EJ, 3)}$ J. Photons per second $N = \dfrac{P}{E} \approx ${sci(ld.N, 3)}$. Electrons per second $\approx ${sci(ld.N / 200, 3)}$, so $I \approx ${sci(ld.N / 200, 3)} \times 1.6 \times 10^{-19} \approx ${sci(ld.I, 3)}$ A, that is ${dec(ld.I * 1e6, 3)} μA.`,
  scheme: [['E = 5.42 × 10⁻¹⁹ J and N = 2.21 × 10¹⁶ s⁻¹', 1], ['I = (N/200) e ≈ 17.7 μA', 1]],
  marks: 2, d: 3, c: 'analysis', t: [1, 2],
}), (q) => near((12e-3 / EJ(365) / 200) * QE * 1e6, q.answer.value, 0.005) || `ld ${ld.I}`);
add('prop-ar', ar({
  a: 'The maximum kinetic energy of photoelectrons from a given metal is directly proportional to the frequency of the incident light.',
  r: 'Each photon of frequency f carries energy hf.',
  key: 'd',
  sol: 'R is true, but A is false: K_max = hf − W₀ increases linearly with f but is not proportional to it (it is zero at f₀, not at f = 0) — option (d).',
  d: 2, c: 'understanding', t: [2],
}));
add('weak-ar', ar({
  a: 'A metal lit by light above its threshold frequency emits photoelectrons even when the light is extremely weak.',
  r: 'The number of photoelectrons emitted per second does not depend on the intensity of the light.',
  key: 'c',
  sol: 'A is true: even a few photons above threshold can each free an electron at once. R is false: the number of photoelectrons per second is proportional to the intensity — option (c).',
  d: 2, c: 'understanding', t: [2],
}));
add('heater-tf', tf({
  stem: 'Each photon from a 1 kW infrared heater carries less energy than each photon from a 1 mW violet laser pointer.',
  key: 't',
  sol: 'True. Photon energy hf depends only on frequency; infrared has a lower frequency than violet. The heater’s much larger power comes from emitting vastly more photons, not more energetic ones.',
  d: 2, c: 'understanding', t: [2],
}));
add('halve-tf', tf({
  stem: 'When the wavelength of the light falling on a photoemissive surface is halved (the light still being above threshold), the maximum kinetic energy of the photoelectrons more than doubles.',
  key: 't',
  sol: 'True. Halving λ doubles the photon energy: the new K_max = 2hf − W₀ = 2(hf − W₀) + W₀, which is twice the old K_max plus W₀.',
  d: 3, c: 'application', t: [2],
}), () => { const W = 2.2; const E = 3; return (2 * E - W > 2 * (E - W)) || 'htf'; });
add('lam0-fill', fill({
  stem: 'Light of wavelength longer than 476 nm cannot free electrons from strontium however bright it is; for strontium, 476 nm is the ___ wavelength.',
  acc: [['threshold', 'cut-off', 'cutoff']],
  sol: 'The threshold (cut-off) wavelength λ₀ = hc/W₀: longer wavelengths have photons with less energy than the work function.',
  d: 1, c: 'recall', t: [2],
}));
add('einstein-match', match({
  stem: 'Match each quantity for a magnesium photocell in Column A with what it depends on, in Column B.',
  pairs: [
    ['Energy of each incident photon', 'The frequency of the light only'],
    ['Work function', 'The metal and the state of its surface'],
    ['Saturation photocurrent (frequency fixed)', 'The intensity of the light'],
    ['Maximum kinetic energy of the photoelectrons', 'Both the frequency of the light and the metal'],
  ],
  order: [2, 0, 3, 1],
  sol: 'hf depends on f only; W₀ is a property of the surface; the saturation current counts photons, so it follows intensity; K_max = hf − W₀ depends on both f and the metal.',
  d: 2, c: 'understanding', t: [2, 1],
}));
const vr = { W: 2.9, lv: 410, lr: 680 };
vr.Ev = photonEV(vr.lv);
vr.Er = photonEV(vr.lr);
add('violetred-short2', short({
  marks: 2,
  stem: 'A faint violet lamp (about 410 nm) makes a calcium plate (W₀ = 2.9 eV) emit electrons at once, while a powerful red lamp (about 680 nm) frees none. Explain both observations using the photon model. (hc = 1237.5 eV nm.)',
  model: r`Violet photons carry $\dfrac{1237.5}{410} \approx ${dec(vr.Ev, 3)}$ eV, more than W₀ = 2.9 eV, so each absorbed photon can free an electron at once, however few photons arrive. Red photons carry only $\approx ${dec(vr.Er, 3)}$ eV, less than W₀; an electron absorbs one photon at a time, so no number of red photons can free it.`,
  sol: 'Compare photon energy with W₀; one photon per electron.',
  scheme: [['Violet photon ≈ 3.02 eV > 2.9 eV: emission at once even in faint light', 1], ['Red photon ≈ 1.82 eV < 2.9 eV: no emission however bright, one photon per electron', 1]],
  d: 2, c: 'application', t: [2], wl: null,
}), () => (EJ(410) > 2.9 * QE && EJ(680) < 2.9 * QE) || 'vr');
const ba = { W: 2.5, lam: 560 };
ba.lam0 = thresholdLam(ba.W);
add('barium-short2', short({
  marks: 2,
  stem: 'For barium (W₀ = 2.5 eV): (a) find the threshold wavelength; (b) state, with a reason, whether yellow light of wavelength 560 nm can eject photoelectrons from it. (hc = 1237.5 eV nm.)',
  model: r`(a) $\lambda_0 = \dfrac{hc}{W_0} = \dfrac{1237.5}{2.5} = ${dec(ba.lam0, 3)}$ nm.
(b) No: 560 nm is longer than the threshold wavelength of 495 nm, so each photon has only $\dfrac{1237.5}{560} \approx ${dec(photonEV(560), 3)}$ eV, less than the work function of 2.5 eV.`,
  sol: 'λ₀ = hc/W₀; compare.',
  scheme: [['λ₀ = 495 nm', 1], ['No: 560 nm > λ₀ (photon 2.21 eV < 2.5 eV)', 1]],
  d: 2, c: 'application', t: [2], wl: null,
}), () => near(thresholdLam(2.5), 495) && EJ(560) < 2.5 * QE || 'ba');
const sf = { lam1: 280, V1: 1.32, lam2: 230 };
sf.W = photonEV(sf.lam1) - sf.V1;
sf.lam0 = thresholdLam(sf.W);
sf.V2 = photonEV(sf.lam2) - sf.W;
add('surface-short3', short({
  marks: 3,
  stem: 'When light of wavelength 280 nm falls on a metal surface, the stopping potential is 1.32 V. Find (a) the work function of the metal, (b) its threshold wavelength, (c) the stopping potential for light of wavelength 230 nm. (hc = 1237.5 eV nm.)',
  model: r`(a) $E = \dfrac{1237.5}{280} \approx ${dec(photonEV(280), 3)}$ eV, so $W_0 = E - eV_0 \approx 4.42 - 1.32 = 3.10$ eV.
(b) $\lambda_0 = \dfrac{1237.5}{${dec(sf.W, 3)}} \approx ${dec(sf.lam0, 3)}$ nm.
(c) $E = \dfrac{1237.5}{230} \approx ${dec(photonEV(230), 3)}$ eV, so $V_0 \approx 5.38 - 3.10 = 2.28$ V.`,
  sol: 'W₀ = hc/λ − eV₀; λ₀ = hc/W₀; then V₀ for the new wavelength.',
  scheme: [['W₀ ≈ 3.10 eV', 1], ['λ₀ ≈ 399 nm', 1], ['V₀ ≈ 2.28 V', 1]],
  d: 3, c: 'application', t: [2], wl: null,
}), () => { const W = EJ(280) - 1.32 * QE; return (near((H * CL) / W * 1e9, 399.2, 0.002) && near((EJ(230) - W) / QE, 2.28, 0.003)) || `sf ${sf.V2}`; });
add('graphs-short3', short({
  marks: 3,
  stem: 'For a given photoemissive surface, describe the shape of each graph and give the reason in each case: (a) saturation photocurrent against intensity of light of fixed frequency; (b) stopping potential against intensity; (c) maximum kinetic energy of the photoelectrons against frequency.',
  model: '(a) A straight line through the origin: the number of photons, and so of photoelectrons, per second is proportional to the intensity. (b) A horizontal straight line: the stopping potential depends on the energy of each photon, not on how many arrive. (c) A straight line of slope h, starting at the threshold frequency f₀ on the frequency axis (no emission below it), because K_max = hf − W₀.',
  sol: 'Current ∝ intensity; V₀ independent of intensity; K_max linear in f with intercept f₀.',
  scheme: [['(a) Straight line through the origin, with reason', 1], ['(b) Horizontal line, with reason', 1], ['(c) Straight line of slope h from f₀, with reason', 1]],
  d: 2, c: 'understanding', t: [2, 1],
}));
const ca = { W: 2.9, lam: 248 };
ca.E = photonEV(ca.lam);
ca.K = ca.E - ca.W;
ca.v = speedOf(ca.K);
add('einstein-long', long({
  stem: '(a) What is meant by the work function of a metal and by its threshold frequency? Write Einstein’s photoelectric equation in terms of them. [1] (b) Use the photon picture to explain why (i) there is a threshold frequency, (ii) emission begins without delay. [2] (c) Calcium has a work function of 2.9 eV. Light of wavelength 248 nm falls on it. Find (i) the maximum kinetic energy of the photoelectrons in eV, (ii) their maximum speed. [2] (hc = 1237.5 eV nm, mₑ = 9.1 × 10⁻³¹ kg, e = 1.6 × 10⁻¹⁹ C.)',
  model: r`(a) The work function W₀ is the least energy needed to remove an electron from the metal surface; the threshold frequency f₀ is the lowest frequency that can eject photoelectrons, with $hf_0 = W_0$. Einstein’s equation: $K_{\max} = hf - W_0 = h(f - f_0)$.
(b)(i) An electron absorbs one whole photon. If $hf < W_0$ it cannot escape, however many photons arrive, so emission needs $f \geq f_0$. (ii) The photon gives all its energy to one electron at once; there is no gradual build-up, so emission starts without delay.
(c)(i) $E = \dfrac{1237.5}{248} \approx ${dec(ca.E, 3)}$ eV, so $K_{\max} \approx 4.99 - 2.9 = 2.09$ eV.
(ii) $v = \sqrt{\dfrac{2 \times 2.09 \times 1.6 \times 10^{-19}}{9.1 \times 10^{-31}}} \approx ${sci(ca.v, 3)}$ m s⁻¹.`,
  sol: 'Definitions; one photon per electron; K_max = hc/λ − W₀; v = √(2K/m).',
  scheme: [['Definitions and K_max = hf − W₀', 1], ['Threshold: one photon must supply W₀', 1], ['No delay: whole photon absorbed at once', 1], ['K_max ≈ 2.09 eV', 1], ['v ≈ 8.57 × 10⁵ m s⁻¹', 1]],
  d: 3, c: 'application', t: [2], wl: null,
}), () => near(vFromJ(EJ(248) - 2.9 * QE), 8.57e5, 0.003) || `ca ${ca.v}`);

// ================================================================ t03 Planck's constant from the V₀–f graph; photon momentum
add('slope-mcq', mcq({
  stem: 'A student plots the stopping potential V₀ (y-axis) against the frequency f (x-axis) for a photocathode and gets a straight line. Multiplying the slope of this line by the electronic charge e gives',
  right: 'Planck’s constant h',
  wrong: ['the work function of the photocathode', 'the threshold frequency of the photocathode', 'the maximum kinetic energy of the photoelectrons'],
  sol: 'V₀ = (h/e)f − W₀/e, so the slope is h/e and e × slope = h — option (@K).',
  d: 1, c: 'understanding', t: [3],
}));
add('intercept-ar', ar({
  a: 'The straight line of stopping potential against frequency for a metal, extended back to zero frequency, meets the stopping-potential axis at −W₀/e.',
  r: 'The slope of this line is h/e for every metal.',
  key: 'b',
  sol: 'Both are true: putting f = 0 in V₀ = (h/e)f − W₀/e gives −W₀/e, and the slope h/e is universal. But the slope being the same for all metals does not explain the value of the intercept — option (b).',
  d: 2, c: 'understanding', t: [3],
}));
const hp = { f1: 7.5e14, V1: 0.62, f2: 11.5e14, V2: 2.27 };
hp.slope = (hp.V2 - hp.V1) / (hp.f2 - hp.f1);
hp.h = QE * hp.slope;
hp.f0 = hp.f1 - hp.V1 / hp.slope;
hp.W = hp.slope * hp.f1 - hp.V1;
add('h2pt-num', num({
  stem: 'For a photocathode, light of frequency 7.5 × 10¹⁴ Hz gives a stopping potential of 0.62 V and light of frequency 1.15 × 10¹⁵ Hz gives 2.27 V. Find Planck’s constant from these readings, in units of 10⁻³⁴ J s (2 significant figures). (e = 1.6 × 10⁻¹⁹ C.)',
  value: Number(dec(hp.h / 1e-34, 2)), tol: 0.05, unit: null,
  sol: r`Slope $= \dfrac{h}{e} = \dfrac{2.27 - 0.62}{(11.5 - 7.5) \times 10^{14}} = 4.125 \times 10^{-15}$ V s, so $h = 1.6 \times 10^{-19} \times 4.125 \times 10^{-15} = 6.6 \times 10^{-34}$ J s, so $\dfrac{h}{10^{-34}\ \text{J s}} = 6.6$.`,
  scheme: [['Slope h/e = 4.125 × 10⁻¹⁵ V s', 1], ['h = 6.6 × 10⁻³⁴ J s', 1]],
  marks: 2, d: 2, c: 'application', t: [3],
}), (q) => { const h = q.answer.value * 1e-34; return (near(h * 11.5e14 - h * 7.5e14, (2.27 - 0.62) * QE, 0.01)) || `hp ${hp.h}`; });
add('phigraph-num', num({
  stem: 'For a photocathode, light of frequency 7.5 × 10¹⁴ Hz gives a stopping potential of 0.62 V and light of frequency 1.15 × 10¹⁵ Hz gives 2.27 V. Without assuming a value of h, find the work function of the photocathode, in eV (3 significant figures).',
  value: Number(dec(hp.W, 3)), tol: 0.02, unit: 'eV',
  sol: r`The line has slope $\dfrac{h}{e} = \dfrac{2.27 - 0.62}{4.0 \times 10^{14}} = 4.125 \times 10^{-15}$ V s. At $f = 7.5 \times 10^{14}$ Hz: $\dfrac{hf}{e} = 4.125 \times 10^{-15} \times 7.5 \times 10^{14} \approx 3.094$ V, so $\dfrac{W_0}{e} = 3.094 - 0.62 = 2.474$ V, giving $W_0 \approx 2.47$ eV (threshold $f_0 = \dfrac{W_0}{h} \approx ${sci(hp.f0, 2)}$ Hz).`,
  scheme: [['Slope h/e from the two readings', 1], ['W₀ = (h/e) f − V₀ ≈ 2.47 eV', 1]],
  marks: 2, d: 3, c: 'analysis', t: [3],
}), (q) => { const s = (2.27 - 0.62) / 4e14; return near(s * (11.5e14) - q.answer.value, 2.27, 0.005) || `hpW ${hp.W}`; });
const pm = { lam: 220 };
pm.p = H / (pm.lam * 1e-9);
add('p220-num', num({
  stem: 'Find the momentum of a photon of ultraviolet light of wavelength 220 nm, in units of 10⁻²⁷ kg m s⁻¹. (h = 6.6 × 10⁻³⁴ J s.)',
  value: Number(dec(pm.p / 1e-27, 2)), tol: 0.05, unit: null,
  sol: r`$p = \dfrac{h}{\lambda} = \dfrac{6.6 \times 10^{-34}}{220 \times 10^{-9}} = 3.0 \times 10^{-27}$ kg m s⁻¹, so $\dfrac{p}{10^{-27}\ \text{kg m s}^{-1}} = 3.0$.`,
  scheme: [['p = h/λ = 3.0 × 10⁻²⁷ kg m s⁻¹', 1]],
  d: 1, c: 'understanding', t: [3],
}), (q) => near(EJ(220) / CL, q.answer.value * 1e-27) || `pm ${pm.p}`);
const pq = { lam: 825 };
pq.p = H / (pq.lam * 1e-9);
pq.v = pq.p / ME;
add('pmatch-num', num({
  stem: 'An electron has the same momentum as a photon of infrared light of wavelength 825 nm. Find the speed of the electron, in m s⁻¹ (3 significant figures). (h = 6.6 × 10⁻³⁴ J s, mₑ = 9.1 × 10⁻³¹ kg.)',
  value: Number(dec(pq.v, 3)), tol: 1, unit: 'm s⁻¹',
  sol: r`$p = \dfrac{h}{\lambda} = \dfrac{6.6 \times 10^{-34}}{825 \times 10^{-9}} = 8.0 \times 10^{-28}$ kg m s⁻¹, so $v = \dfrac{p}{m} = \dfrac{8.0 \times 10^{-28}}{9.1 \times 10^{-31}} \approx 879.1$ m s⁻¹, so to 3 significant figures $v = ${dec(pq.v, 3)}$ m s⁻¹.`,
  scheme: [['Photon momentum 8.0 × 10⁻²⁸ kg m s⁻¹', 1], ['v = p/m ≈ 879 m s⁻¹', 1]],
  marks: 2, d: 2, c: 'application', t: [3, 4],
}), (q) => near(H / (ME * q.answer.value), 825e-9, 0.002) || `pq ${pq.v}`);
const fo = { P: 3.0 };
fo.F = fo.P / CL;
add('force-num', num({
  stem: 'A 3.0 W laser beam falls normally on a black surface that absorbs it completely. Using the momentum carried by the photons, find the force on the surface, in units of 10⁻⁸ N. (c = 3 × 10⁸ m s⁻¹.)',
  value: Number(dec(fo.F / 1e-8, 2)), tol: 0.05, unit: null,
  sol: r`If each photon has wavelength λ, photons arrive at the rate $N = \dfrac{P}{hc/\lambda}$, each bringing momentum $\dfrac{h}{\lambda}$. Force = momentum delivered per second $= N\dfrac{h}{\lambda} = \dfrac{P}{c} = \dfrac{3.0}{3 \times 10^{8}} = 1.0 \times 10^{-8}$ N, whatever the wavelength; $\dfrac{F}{10^{-8}\ \text{N}} = 1.0$.`,
  scheme: [['F = N h/λ with N = Pλ/hc', 1], ['F = P/c = 1.0 × 10⁻⁸ N', 1]],
  marks: 2, d: 3, c: 'analysis', t: [3],
}), (q) => { const lam = 532e-9; const N = 3.0 / ((H * CL) / lam); return near(N * (H / lam), q.answer.value * 1e-8) || `fo ${fo.F}`; });
add('pratio-mcq', mcq({
  stem: 'A photon of X-rays of wavelength 0.11 nm is compared with a photon of green light of wavelength 550 nm. The ratio of the momentum of the X-ray photon to that of the green-light photon is',
  right: '5000',
  wrong: ['0.0002', '71', '1'],
  sol: 'p = h/λ, so the ratio is λ(green)/λ(X-ray) = 550/0.11 = 5000 — option (@K). 0.0002 is the inverse ratio and 71 its square root; photons do not all have the same momentum.',
  d: 2, c: 'application', t: [3],
}), () => near(H / 0.11e-9 / (H / 550e-9), 5000) || 'pr');
add('graphh-short2', short({
  marks: 2,
  stem: 'Explain how a graph of stopping potential against frequency for a photocell can be used to find (a) Planck’s constant, (b) the work function of the emitter.',
  model: 'Einstein’s equation gives V₀ = (h/e)f − W₀/e, a straight line. (a) Measure V₀ for several frequencies, draw the best line and find its slope; h = e × slope. (b) The line meets the frequency axis at the threshold frequency f₀, and W₀ = hf₀ (equivalently, the line extended meets the V₀ axis at −W₀/e).',
  sol: 'Slope h/e; intercept f₀, W₀ = hf₀.',
  scheme: [['h = e × slope of the line', 1], ['f-axis intercept f₀; W₀ = hf₀ (or V₀-intercept −W₀/e)', 1]],
  d: 2, c: 'understanding', t: [3],
}));
const ln = { f0: 8.0e14, f: 1.2e15, V: 1.65 };
ln.slope = ln.V / (ln.f - ln.f0);
ln.h = QE * ln.slope;
ln.WJ = ln.h * ln.f0;
add('line-short3', short({
  marks: 3,
  stem: 'Starting from Einstein’s photoelectric equation, show that the graph of stopping potential V₀ against frequency f is a straight line. For a certain emitter the line cuts the frequency axis at 8.0 × 10¹⁴ Hz and passes through V₀ = 1.65 V at f = 1.2 × 10¹⁵ Hz. Find Planck’s constant and the work function in eV. (e = 1.6 × 10⁻¹⁹ C.)',
  model: r`$eV_0 = hf - W_0$ gives $V_0 = \dfrac{h}{e}f - \dfrac{W_0}{e}$: linear in f with constant slope h/e, i.e. a straight line.
Slope $= \dfrac{1.65}{(12 - 8.0) \times 10^{14}} = ${sci(ln.slope, 4)}$ V s, so $h = 1.6 \times 10^{-19} \times 4.125 \times 10^{-15} = ${sci(ln.h, 2)}$ J s.
$W_0 = hf_0 = 6.6 \times 10^{-34} \times 8.0 \times 10^{14} = ${sci(ln.WJ, 3)}$ J $= ${dec(ln.WJ / QE, 2)}$ eV.`,
  sol: 'V₀ = (h/e)f − W₀/e; slope from intercept and one point; W₀ = hf₀.',
  scheme: [['V₀ = (h/e) f − W₀/e: straight line', 1], ['h = e × slope = 6.6 × 10⁻³⁴ J s', 1], ['W₀ = hf₀ = 5.28 × 10⁻¹⁹ J = 3.3 eV', 1]],
  d: 3, c: 'analysis', t: [3], wl: null,
}), () => near(ln.h, 6.6e-34) && near((ln.h * 1.2e15 - ln.WJ) / QE, 1.65) && near(ln.WJ / QE, 3.3) || `ln ${ln.h}`);
const rf = { P: 8.0e-3, lam: 660 };
rf.p = H / (rf.lam * 1e-9);
rf.E = (H * CL) / (rf.lam * 1e-9);
rf.N = rf.P / rf.E;
rf.F = 2 * rf.N * rf.p;
add('reflect-short3', short({
  marks: 3,
  stem: `An 8.0 mW laser of wavelength 660 nm shines normally on a small mirror that reflects all the light straight back. Find (a) the momentum of each photon, (b) the number of photons striking the mirror per second, (c) the force on the mirror. ${CONSTS}`,
  model: r`(a) $p = \dfrac{h}{\lambda} = \dfrac{6.6 \times 10^{-34}}{660 \times 10^{-9}} = 1.0 \times 10^{-27}$ kg m s⁻¹.
(b) $E = pc = 3.0 \times 10^{-19}$ J, so $N = \dfrac{8.0 \times 10^{-3}}{3.0 \times 10^{-19}} \approx ${sci(rf.N, 3)}$ s⁻¹.
(c) Each reflected photon’s momentum changes by $2p$: $F = 2Np \approx ${sci(rf.F, 3)}$ N (equal to $\dfrac{2P}{c}$).`,
  sol: 'p = h/λ; N = P/E; F = 2Np on reflection.',
  scheme: [['p = 1.0 × 10⁻²⁷ kg m s⁻¹', 1], ['N ≈ 2.67 × 10¹⁶ s⁻¹', 1], ['F = 2Np ≈ 5.33 × 10⁻¹¹ N', 1]],
  d: 3, c: 'analysis', t: [3], wl: null,
}), () => near(rf.F, (2 * rf.P) / CL) && near(rf.N, 2.667e16, 0.001) || `rf ${rf.F}`);
add('metals-tf', tf({
  stem: 'On a graph of stopping potential against frequency, the line for platinum (W₀ = 5.6 eV) lies to the right of the line for barium (W₀ = 2.5 eV) and is steeper.',
  key: 'f',
  sol: 'False. The platinum line does start at a higher threshold frequency (to the right), but both lines have the same slope h/e: they are parallel, not steeper.',
  d: 2, c: 'application', t: [3],
}), () => thresholdF(5.6) > thresholdF(2.5) || 'mt');
const dl = { W: 2.4, f14: [7, 9, 11, 13] };
dl.V0 = dl.f14.map((f) => Number(((H * f * 1e14) / QE - dl.W).toFixed(2)));
dl.slope = (dl.V0[3] - dl.V0[0]) / ((dl.f14[3] - dl.f14[0]) * 1e14);
dl.h = QE * dl.slope;
dl.f0 = 7e14 - dl.V0[0] / dl.slope;
dl.WeV = (dl.h * dl.f0) / QE;
add('data-long', long({
  stem: `(a) Show that, according to Einstein’s equation, the stopping potential varies linearly with frequency, and state what the slope and the frequency-axis intercept of the graph represent. [2] (b) A photocell gives these readings: f = ${dl.f14.map((f) => `${f}.0`).join(', ')} × 10¹⁴ Hz give V₀ = ${dl.V0.map((v) => v.toFixed(2)).join(', ')} V respectively. Using the end points of the best straight line, find Planck’s constant. [2] (c) Find the work function of the emitter in eV. [1] (e = 1.6 × 10⁻¹⁹ C.)`,
  model: r`(a) $eV_0 = hf - W_0$, so $V_0 = \dfrac{h}{e}f - \dfrac{W_0}{e}$: a straight line. Slope $= \dfrac{h}{e}$ (the same for all metals); the intercept on the f axis is the threshold frequency $f_0 = \dfrac{W_0}{h}$.
(b) The points lie on a straight line (successive rises 0.82, 0.83, 0.82 V). Slope $= \dfrac{2.96 - 0.49}{(13 - 7) \times 10^{14}} \approx ${sci(dl.slope, 3)}$ V s, so $h = e \times \text{slope} \approx ${sci(dl.h, 3)}$ J s.
(c) $f_0 = 7.0 \times 10^{14} - \dfrac{0.49}{${sci(dl.slope, 3)}} \approx ${sci(dl.f0, 3)}$ Hz, so $W_0 = hf_0 \approx ${sci(dl.h * dl.f0, 3)}$ J $\approx ${dec(dl.WeV, 3)}$ eV.`,
  sol: 'V₀ = (h/e)f − W₀/e; slope from the end points; intercept → f₀, W₀ = hf₀.',
  scheme: [['V₀ = (h/e) f − W₀/e: a straight line', 1], ['Slope h/e; f-intercept f₀', 1], ['Slope ≈ 4.12 × 10⁻¹⁵ V s', 1], ['h ≈ 6.59 × 10⁻³⁴ J s', 1], ['W₀ ≈ 2.39 eV', 1]],
  d: 4, c: 'analysis', t: [3], wl: null,
}), () => (dl.V0.join() === '0.49,1.31,2.14,2.96' && near(dl.h, 6.59e-34, 0.002) && near(dl.WeV, 2.39, 0.003)) || `dl ${dl.V0} ${dl.h} ${dl.WeV}`);

// ================================================================ t04 wave–particle duality; de Broglie waves
add('samespeed-mcq', mcq({
  stem: 'An electron and a proton move with the same speed. The ratio of the de Broglie wavelength of the electron to that of the proton is about (mₚ = 1.67 × 10⁻²⁷ kg, mₑ = 9.1 × 10⁻³¹ kg)',
  right: '1835',
  wrong: ['1/1835', '43', '1'],
  sol: 'λ = h/(mv): at equal speeds λ ∝ 1/m, so λₑ/λₚ = mₚ/mₑ = 1.67 × 10⁻²⁷/9.1 × 10⁻³¹ ≈ 1835 — option (@K). 43 would be the square root (equal kinetic energies).',
  d: 2, c: 'application', t: [4],
}), () => near(MP / ME, 1835, 0.001) || 'ss');
add('nine-mcq', mcq({
  stem: 'In an electron diffraction tube, the de Broglie wavelength of the electrons must be reduced to one third of its present value. The accelerating potential difference must be',
  right: 'made 9 times as large',
  wrong: ['made 3 times as large', 'made √3 times as large', 'reduced to one ninth of its value'],
  sol: 'λ = h/√(2meV) ∝ 1/√V. To make λ one third, √V must triple, so V must become 9 times as large — option (@K).',
  d: 2, c: 'application', t: [4],
}), () => near(lamElectron(900) / lamElectron(100), 1 / 3) || 'nine');
add('lp-mcq', mcq({
  stem: 'For a moving particle, a graph of its de Broglie wavelength λ (y-axis) against its momentum p (x-axis) is',
  right: 'a rectangular hyperbola, since λp is constant',
  wrong: ['a straight line through the origin', 'a straight line with a negative slope', 'a parabola opening upwards'],
  sol: 'λ = h/p, so λp = h, a constant: the graph is a rectangular hyperbola — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('evidence-mcq', mcq({
  stem: 'Which of these observations shows the wave nature of matter?',
  right: 'Rings formed on a screen when a beam of electrons passes through a thin metal foil',
  wrong: ['Emission of electrons from a metal lit by ultraviolet light', 'Deflection of a beam of electrons by a magnetic field', 'Emission of light by a heated tungsten filament'],
  sol: 'Rings like X-ray diffraction rings show electrons being diffracted, which is wave behaviour. Photoemission shows the particle nature of light; magnetic deflection is particle behaviour of electrons — option (@K).',
  d: 1, c: 'understanding', t: [4, 5],
}));
const e6 = { V: 600 };
e6.lam = lamElectron(e6.V);
add('e600-num', num({
  stem: 'Find the de Broglie wavelength of an electron accelerated from rest through a potential difference of 600 V, in picometres (3 significant figures). (h = 6.6 × 10⁻³⁴ J s, mₑ = 9.1 × 10⁻³¹ kg, e = 1.6 × 10⁻¹⁹ C.)',
  value: Number(dec(e6.lam * 1e12, 3)), tol: 0.2, unit: 'pm',
  sol: r`$\lambda = \dfrac{h}{\sqrt{2meV}} = \dfrac{6.6 \times 10^{-34}}{\sqrt{2 \times 9.1 \times 10^{-31} \times 1.6 \times 10^{-19} \times 600}} \approx ${sci(e6.lam, 3)}$ m, that is 49.9 pm (check: $\dfrac{1.22}{\sqrt{600}} \approx 0.0499$ nm).`,
  scheme: [['λ = h/√(2meV) with the values substituted', 1], ['λ ≈ 49.9 pm', 1]],
  marks: 2, d: 2, c: 'application', t: [4],
}), (q) => { const v = vFromJ(600 * QE); return near(H / (ME * v) * 1e12, q.answer.value, 0.003) || `e6 ${e6.lam}`; });
const k2 = { lam: 0.2e-9 };
k2.K = keForLam(k2.lam);
add('k02-num', num({
  stem: 'What kinetic energy, in eV, must an electron have for its de Broglie wavelength to be 0.20 nm? Give the answer to 3 significant figures. (h = 6.6 × 10⁻³⁴ J s, mₑ = 9.1 × 10⁻³¹ kg, e = 1.6 × 10⁻¹⁹ C.)',
  value: Number(dec(k2.K, 3)), tol: 0.2, unit: 'eV',
  sol: r`$p = \dfrac{h}{\lambda} = \dfrac{6.6 \times 10^{-34}}{0.20 \times 10^{-9}} = 3.3 \times 10^{-24}$ kg m s⁻¹. $K = \dfrac{p^2}{2m} = \dfrac{(3.3 \times 10^{-24})^2}{2 \times 9.1 \times 10^{-31}} \approx ${sci(k2.K * QE, 3)}$ J, which is $\dfrac{5.98 \times 10^{-18}}{1.6 \times 10^{-19}} = ${dec(k2.K, 3)}$ eV.`,
  scheme: [['p = h/λ = 3.3 × 10⁻²⁴ kg m s⁻¹', 1], ['K = p²/2m ≈ 5.98 × 10⁻¹⁸ J ≈ 37.4 eV', 1]],
  marks: 2, d: 2, c: 'application', t: [4],
}), (q) => near(H / Math.sqrt(2 * ME * q.answer.value * QE), 0.2e-9, 0.003) || `k2 ${k2.K}`);
const spr = { m: 66, v: 10 };
spr.lam = H / (spr.m * spr.v);
add('sprinter-num', num({
  stem: 'A 66 kg sprinter runs at 10 m s⁻¹. Find the de Broglie wavelength associated with the sprinter, in units of 10⁻³⁶ m. (h = 6.6 × 10⁻³⁴ J s.)',
  value: Number(dec(spr.lam / 1e-36, 2)), tol: 0.05, unit: null,
  sol: r`$\lambda = \dfrac{h}{mv} = \dfrac{6.6 \times 10^{-34}}{66 \times 10} = 1.0 \times 10^{-36}$ m, so $\dfrac{\lambda}{10^{-36}\ \text{m}} = 1.0$ — far too small to show any wave effect.`,
  scheme: [['λ = h/mv = 1.0 × 10⁻³⁶ m', 1]],
  d: 1, c: 'understanding', t: [4],
}), (q) => near(q.answer.value * 1e-36 * 66 * 10, H) || `spr ${spr.lam}`);
const bo = { v: 2.2e6 };
bo.lam = H / (ME * bo.v);
add('bohr-num', num({
  stem: 'An electron in a vacuum tube moves at 2.2 × 10⁶ m s⁻¹. Find its de Broglie wavelength, in nm (3 significant figures). (h = 6.6 × 10⁻³⁴ J s, mₑ = 9.1 × 10⁻³¹ kg.)',
  value: Number(dec(bo.lam * 1e9, 3)), tol: 0.002, unit: 'nm',
  sol: r`$\lambda = \dfrac{h}{mv} = \dfrac{6.6 \times 10^{-34}}{9.1 \times 10^{-31} \times 2.2 \times 10^{6}} \approx ${sci(bo.lam, 3)}$ m, that is 0.330 nm.`,
  scheme: [['λ = h/mv ≈ 0.330 nm', 1]],
  d: 2, c: 'understanding', t: [4],
}), (q) => near(q.answer.value * 1e-9 * ME * 2.2e6, H, 0.002) || `bo ${bo.lam}`);
add('ratio-num', num({
  stem: 'Electrons accelerated from rest through 50 V and through 800 V are compared. Find the ratio of their de Broglie wavelengths, λ(50 V)/λ(800 V).',
  value: 4, tol: 0.01, unit: null,
  sol: r`$\lambda \propto \dfrac{1}{\sqrt{V}}$, so the ratio is $\sqrt{\dfrac{800}{50}} = \sqrt{16} = 4$.`,
  scheme: [['λ ∝ 1/√V; ratio √(800/50) = 4', 1]],
  d: 2, c: 'application', t: [4],
}), (q) => near(lamElectron(50) / lamElectron(800), q.answer.value) || 'ratio');
add('car-ar', ar({
  a: 'A car driving through a garage doorway shows no diffraction.',
  r: 'The de Broglie wavelength of the car is many orders of magnitude smaller than the width of the doorway.',
  key: 'a',
  sol: 'Both are true and R explains A: a 1000 kg car at a few m/s has λ = h/mv of order 10⁻³⁷ m, and diffraction is noticeable only when the opening is comparable to the wavelength — option (a).',
  d: 2, c: 'understanding', t: [4],
}), () => H / (1000 * 5) < 1e-36 || 'car');
add('photonE-ar', ar({
  a: 'An electron and a photon that have the same wavelength also have the same energy.',
  r: 'An electron and a photon of the same wavelength have the same momentum, h/λ.',
  key: 'd',
  sol: 'R is true (p = h/λ for both), but A is false: the photon’s energy is pc, while the electron’s kinetic energy is p²/2m = (pc)(v/2c), much smaller for a slow electron — option (d).',
  d: 3, c: 'analysis', t: [4],
}), () => { const p = H / 1e-9; return p * CL > p ** 2 / (2 * ME) || 'pe'; });
add('speed-tf', tf({
  stem: 'If the speed of a slow-moving electron is doubled, its de Broglie wavelength is halved.',
  key: 't',
  sol: 'True. λ = h/(mv): for a non-relativistic electron the mass is constant, so doubling v doubles the momentum and halves λ.',
  d: 1, c: 'understanding', t: [4],
}));
add('duality-short2', short({
  marks: 2,
  stem: 'Light produces an interference pattern in Young’s double-slit experiment and ejects electrons in a photocell. Explain how these two experiments together lead to the idea of the dual nature of radiation.',
  model: 'Interference needs overlapping waves from the two slits, so light travels as a wave. Photoemission needs light to deliver energy in packets hf, each absorbed whole by one electron: particle (photon) behaviour. Neither picture explains both, so radiation has a dual nature: wave-like in propagation, particle-like in interaction.',
  sol: 'Interference → wave; photoemission → photons; together → duality.',
  scheme: [['Interference shows wave behaviour; photoemission shows photons', 1], ['Neither alone explains both: dual nature', 1]],
  d: 2, c: 'understanding', t: [4, 1],
}));
add('derive-short3', short({
  marks: 3,
  stem: 'State de Broglie’s relation. Show that the de Broglie wavelength of an electron accelerated from rest through a potential difference V is h/√(2meV), and hence that it is about 1.22/√V nm when h = 6.6 × 10⁻³⁴ J s, mₑ = 9.1 × 10⁻³¹ kg and e = 1.6 × 10⁻¹⁹ C.',
  model: r`A particle of momentum p has an associated wave of wavelength $\lambda = \dfrac{h}{p} = \dfrac{h}{mv}$.
Accelerated from rest through V, the electron gains $eV = \dfrac{1}{2}mv^2 = \dfrac{p^2}{2m}$, so $p = \sqrt{2meV}$ and $\lambda = \dfrac{h}{\sqrt{2meV}}$.
Substituting: $\sqrt{2 \times 9.1 \times 10^{-31} \times 1.6 \times 10^{-19}} \approx 5.40 \times 10^{-25}$, so $\lambda \approx \dfrac{6.6 \times 10^{-34}}{5.40 \times 10^{-25}\sqrt{V}} \approx \dfrac{1.22 \times 10^{-9}}{\sqrt{V}}$ m, i.e. about 1.22/√V nm.`,
  sol: 'λ = h/p; eV = p²/2m; substitute constants.',
  scheme: [['λ = h/p = h/mv', 1], ['p = √(2meV), λ = h/√(2meV)', 1], ['Numerical factor 1.22 × 10⁻⁹ m', 1]],
  d: 2, c: 'understanding', t: [4], wl: null,
}), () => near(lamElectron(1), 1.2231e-9, 0.001) && near(Math.sqrt(2 * ME * QE), 5.40e-25, 0.002) || 'der');
const kv = { E: 2000 };
kv.lamPh = HC / kv.E;
kv.lamE = lamElectron(kv.E) * 1e9;
kv.ratio = kv.lamPh / kv.lamE;
add('kev-short3', short({
  marks: 3,
  stem: `An electron and a photon each have an energy of 2.0 keV. Find the wavelength of each, and say which is longer and by roughly what factor. ${CONSTS.replace(')', ', mₑ = 9.1 × 10⁻³¹ kg)')}`,
  model: r`Photon: $\lambda = \dfrac{hc}{E} = \dfrac{1.98 \times 10^{-25}}{2000 \times 1.6 \times 10^{-19}} \approx ${sci(kv.lamPh * 1e-9, 3)}$ m $= ${dec(kv.lamPh, 3)}$ nm.
Electron: $\lambda = \dfrac{h}{\sqrt{2mK}} = \dfrac{6.6 \times 10^{-34}}{\sqrt{2 \times 9.1 \times 10^{-31} \times 3.2 \times 10^{-16}}} \approx ${sci(kv.lamE * 1e-9, 3)}$ m $\approx ${dec(kv.lamE, 3)}$ nm.
The photon’s wavelength is longer, by a factor of about ${dec(kv.ratio, 2)}: for the same energy the electron has much more momentum.`,
  sol: 'Photon λ = hc/E; electron λ = h/√(2mK); compare.',
  scheme: [['Photon λ ≈ 0.619 nm', 1], ['Electron λ ≈ 0.0273 nm', 1], ['Photon’s longer, by about 23 times', 1]],
  d: 4, c: 'analysis', t: [4, 3], wl: null,
}), () => near((H * CL) / (2000 * QE) / (H / Math.sqrt(2 * ME * 2000 * QE)), kv.ratio, 1e-6) && near(kv.ratio, 22.6, 0.005) || `kv ${kv.ratio}`);
const em = { V: 25000 };
em.lam = lamElectron(em.V);
add('microscope-short2', short({
  marks: 2,
  stem: 'Explain why an electron microscope using electrons accelerated through 25 kV can resolve much finer detail than a light microscope. Support your answer with the electron’s de Broglie wavelength. (Take λ ≈ 1.22/√V nm.)',
  model: r`The finest detail an instrument resolves is limited by the wavelength it uses. The electrons have $\lambda \approx \dfrac{1.22}{\sqrt{25000}} \approx ${dec(em.lam * 1e9, 2)}$ nm (about ${dec(em.lam * 1e12, 2)} pm), nearly $10^{5}$ times shorter than visible light (400–700 nm; about $6.5 \times 10^{4}$ times shorter than 500 nm green light), so the electron microscope can resolve far finer detail.`,
  sol: 'Resolution ∝ wavelength; electron λ ≈ 7.7 pm ≪ 500 nm.',
  scheme: [['Resolution limited by wavelength', 1], ['Electron λ ≈ 7.7 pm, nearly 10⁵ times shorter than light', 1]],
  d: 2, c: 'application', t: [4, 5], wl: null,
}), () => near(em.lam * 1e12, 7.735, 0.002) && near(500e-9 / em.lam, 6.5e4, 0.01) || `em ${em.lam}`);
const tv = { V: 1500 };
tv.lam = lamElectron(tv.V);
add('db-long', long({
  stem: '(a) State de Broglie’s hypothesis. [1] (b) Derive an expression for the de Broglie wavelength of a particle of mass m and charge q accelerated from rest through a potential difference V. [2] (c) The electrons in an old cathode-ray tube are accelerated through 1.5 kV. Find their de Broglie wavelength, in picometres. [1] (d) Explain why such electrons can be diffracted by a crystal but not noticeably by a slit 0.1 mm wide. [1] (h = 6.6 × 10⁻³⁴ J s, mₑ = 9.1 × 10⁻³¹ kg, e = 1.6 × 10⁻¹⁹ C.)',
  model: r`(a) Every moving particle has a wave associated with it; its wavelength is $\lambda = \dfrac{h}{p} = \dfrac{h}{mv}$, where p is its momentum.
(b) Work done by the field: $qV = \dfrac{1}{2}mv^2 = \dfrac{p^2}{2m}$, so $p = \sqrt{2mqV}$ and $\lambda = \dfrac{h}{\sqrt{2mqV}}$.
(c) $\lambda = \dfrac{6.6 \times 10^{-34}}{\sqrt{2 \times 9.1 \times 10^{-31} \times 1.6 \times 10^{-19} \times 1500}} \approx ${sci(tv.lam, 3)}$ m $\approx ${dec(tv.lam * 1e12, 3)}$ pm.
(d) Diffraction is noticeable only when the obstacle or opening is comparable to the wavelength. The spacing of atoms in a crystal (about 0.1–0.3 nm) is of the same order as 0.03 nm, but a 0.1 mm slit is millions of times wider, so the spreading is negligible.`,
  sol: 'λ = h/p; qV = p²/2m; substitute; compare sizes.',
  scheme: [['Statement λ = h/p', 1], ['qV = p²/2m', 1], ['λ = h/√(2mqV)', 1], ['λ ≈ 31.6 pm', 1], ['Crystal spacing comparable to λ; slit far too wide', 1]],
  d: 3, c: 'application', t: [4, 5], wl: null,
}), () => near(H / (ME * vFromJ(1500 * QE)) * 1e12, 31.58, 0.002) || `tv ${tv.lam}`);

// ================================================================ t05 Davisson–Germer and electron diffraction (qualitative)
add('dg-mcq', mcq({
  stem: 'In the Davisson–Germer experiment, a sharp peak in the number of electrons scattered by the nickel crystal was found at one particular angle. This showed that',
  right: 'the electrons were diffracted by the regular arrangement of atoms, as waves would be',
  wrong: ['the electrons were knocking photoelectrons out of the nickel', 'the nickel nuclei repelled the electrons into one direction', 'the electrons lost all their kinetic energy inside the crystal'],
  sol: 'A strong scattered beam in one definite direction is the signature of diffraction by the rows of atoms in a crystal, which only waves show. The wavelength found agreed with h/p — option (@K).',
  d: 1, c: 'understanding', t: [5],
}));
add('crystal-mcq', mcq({
  stem: 'Davisson and Germer used a crystal, rather than a ruled diffraction grating, to diffract their electrons because',
  right: 'the spacing of atoms in a crystal is comparable to the de Broglie wavelength of the electrons',
  wrong: ['a crystal conducts electricity and so removes the charge of the electrons', 'electrons cannot travel through air to reach a grating', 'a ruled grating would absorb the electrons as photons'],
  sol: 'Diffraction is noticeable only when the spacing is comparable to the wavelength. Electrons of tens of eV have λ of about 0.1–0.2 nm, like the spacing of atoms in a crystal, while ruled gratings have spacings of about a micrometre — option (@K).',
  d: 2, c: 'understanding', t: [5],
}));
add('dg-tf', tf({
  stem: 'In the Davisson–Germer experiment, the sharp peak in scattered electrons appeared at the same angle and with the same strength for every accelerating voltage.',
  key: 'f',
  sol: 'False. The peak was sharpest at 54 V, near 50°; at higher and lower voltages it weakened and shifted, because changing V changes the electrons’ wavelength.',
  d: 2, c: 'understanding', t: [5],
}));
add('rings-fill', fill({
  stem: 'When a beam of fast electrons passes through a thin metal foil made of many tiny crystals, the screen beyond it shows a central spot surrounded by concentric ___.',
  acc: [['rings', 'circles', 'circular rings']],
  sol: 'Concentric rings (circles), like the X-ray diffraction rings from the same foil: the electrons are diffracted as waves.',
  d: 1, c: 'recall', t: [5],
}));
add('dg-match', match({
  stem: 'Match each part of the Davisson–Germer apparatus in Column A with its role in Column B.',
  pairs: [
    ['Heated filament', 'Releases electrons'],
    ['Anode at potential V', 'Accelerates the electrons and so fixes their wavelength'],
    ['Nickel crystal', 'Diffracts the electrons with its regular rows of atoms'],
    ['Movable detector', 'Counts the electrons scattered at each angle'],
  ],
  order: [1, 3, 0, 2],
  sol: 'The filament emits electrons; the accelerating potential sets their energy and wavelength; the crystal’s atoms diffract them; the detector, swung round an arc, measures the scattered intensity at each angle.',
  d: 2, c: 'understanding', t: [5],
}));
add('vacuum-short2', short({
  marks: 2,
  stem: 'In the Davisson–Germer experiment, why must (a) the apparatus be evacuated, and (b) all the electrons be accelerated through the same potential difference?',
  model: '(a) In air the electrons would collide with gas molecules, lose energy and be scattered at random, hiding any diffraction peak. (b) The de Broglie wavelength depends on the electrons’ speed, which is fixed by the accelerating potential; a single potential gives a single wavelength and a sharp peak.',
  sol: 'Vacuum avoids collisions; one V gives one wavelength.',
  scheme: [['(a) Avoids collisions with gas molecules that scatter the electrons', 1], ['(b) One potential gives one speed and so one wavelength', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('rings-short3', short({
  marks: 3,
  stem: 'Electrons accelerated through a few thousand volts and X-rays of similar wavelength are sent in turn through the same thin metal foil, and both produce rings of the same size on a screen. (a) What do you conclude about the electrons? (b) How would the rings change if the accelerating potential of the electrons were increased? (c) Why does this behaviour support de Broglie’s hypothesis rather than the idea that the electrons are simply bouncing off atoms?',
  model: '(a) The electrons are diffracted by the crystals of the foil exactly as X-ray waves are, so they behave as waves with a wavelength similar to that of the X-rays. (b) A higher potential gives faster electrons with a shorter wavelength (λ = h/p), so the rings become smaller. (c) Particles bouncing off atoms would spread out smoothly; sharp rings whose size follows h/p show interference of waves, as de Broglie predicted.',
  sol: 'Diffraction like X-rays; higher V, shorter λ, smaller rings; sharp rings need waves.',
  scheme: [['(a) Electrons diffract like X-ray waves', 1], ['(b) Higher V: shorter λ, smaller rings', 1], ['(c) Sharp rings need wave interference; size follows h/p', 1]],
  d: 3, c: 'analysis', t: [5, 4],
}));
add('dg-ar', ar({
  a: 'In the Davisson–Germer experiment, the electron beam had to be accelerated through a precisely known potential difference.',
  r: 'The kinetic energy, and hence the de Broglie wavelength, of the electrons is fixed by the accelerating potential difference.',
  key: 'a',
  sol: 'Both are true and R explains A: to compare the diffraction with de Broglie’s prediction, the electrons’ wavelength must be known, and it is set by eV = p²/2m — option (a).',
  d: 2, c: 'understanding', t: [5],
}));
add('dg-long', long({
  stem: '(a) Draw (describe in words) a labelled diagram of the Davisson–Germer apparatus. [2] (b) State the main observation made with electrons accelerated through 54 V and explain how it shows the wave nature of electrons. [2] (c) Why is a crystal used rather than a narrow slit? [1]',
  model: '(a) Inside a vacuum chamber, an electron gun — a heated filament with an anode at an accelerating potential V — sends a fine beam of electrons normally onto the face of a nickel crystal. A movable detector (collector connected to a galvanometer) can be swung round an arc centred on the crystal to measure the number of electrons scattered at each angle φ to the incident beam.\n(b) The scattered intensity varied smoothly with angle except near 54 V, when a sharp peak appeared at a scattering angle of about 50°; it weakened at higher and lower voltages. A strong beam in one direction is what diffraction of waves by the regular rows of atoms produces, and the wavelength deduced agreed with de Broglie’s λ = h/p, so electrons behave as waves.\n(c) Diffraction is noticeable only when the spacing is comparable to the wavelength; the atomic spacing in a crystal (about 0.1 nm) matches the electrons’ wavelength, while any slit that can be made is far too wide.',
  sol: 'Gun, crystal, movable detector, vacuum; peak at 54 V near 50°; spacing comparable to λ.',
  scheme: [['Electron gun, filament and accelerating anode, nickel crystal, vacuum', 1], ['Movable detector on an arc measuring scattered electrons at each angle', 1], ['Sharp peak at about 50° for 54 V', 1], ['Peak = diffraction by atomic rows; λ agreed with h/p: wave nature', 1], ['Atomic spacing comparable to λ; slits far too wide', 1]],
  d: 2, c: 'understanding', t: [5], wl: null,
}));
