// ch08 Electromagnetic Waves — question bank. Numbers are computed here and re-checked by the `check` functions;
// propagation directions are checked as E × B. AR keys planned: a a c d b a.
import { mk, add, r, sci, dec, near } from '../../cbse-12-physics-ch01/src/lib.mjs';
import { MU0, EPS0, C } from './decks.mjs';

const { mcq, ar, tf, fill, match, num, short, long, part } = mk;
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];

// ================================================================ t01 displacement current
add('dispflow-tf', tf({
  stem: 'The displacement current between the plates of a charging capacitor consists of electrons crossing the gap.',
  key: 'f',
  sol: 'False. No charge crosses the gap. The displacement current, ε₀ dΦE/dt, is due to the changing electric field there.',
  d: 1, c: 'understanding', t: [1],
}));
const idc = 2e-6 * 5e4;
add('IdC-num', num({
  stem: 'The voltage across a 2.0 μF capacitor is rising at 5.0 × 10⁴ V s⁻¹. Find the displacement current between its plates, in amperes.',
  value: idc, tol: 0.002, unit: 'A',
  sol: r`$I_d = \dfrac{dq}{dt} = C\dfrac{dV}{dt} = 2.0 \times 10^{-6} \times 5.0 \times 10^{4} = 0.1$ A, equal to the conduction current in the leads.`,
  scheme: [['I_d = C dV/dt', 0.5], ['0.10 A', 0.5]],
  d: 2, c: 'application', t: [1],
}), (q) => near(idc, q.answer.value) || 'idc');
const ida = EPS0 * 0.05 * 2e11;
add('IdA-num', num({
  stem: 'The electric field between capacitor plates of area 0.050 m² increases at 2.0 × 10¹¹ V m⁻¹ s⁻¹. Find the displacement current, in milliamperes (3 significant figures).',
  value: Number(dec(ida * 1e3, 3)), tol: 0.2, unit: 'mA',
  sol: r`$I_d = \varepsilon_0 A\dfrac{dE}{dt} = 8.85 \times 10^{-12} \times 0.050 \times 2.0 \times 10^{11} \approx ${dec(ida, 3)}$ A, i.e. $${dec(ida, 3)} \times 1000 = ${dec(ida * 1e3, 3)}$ mA.`,
  scheme: [['I_d = ε₀A dE/dt ≈ 88.5 mA', 1]],
  d: 2, c: 'understanding', t: [1],
}), (q) => near(ida * 1e3, q.answer.value) || 'ida');
add('gap-mcq', mcq({
  stem: 'While a parallel-plate capacitor is charging, the magnetic field at a point in the gap between the plates (away from the axis) is',
  right: 'not zero, because of the displacement current in the gap',
  wrong: ['zero, because no charge flows across the gap', 'zero, because the electric field there is uniform', 'infinite, because the gap breaks the circuit'],
  sol: 'The changing electric field in the gap is a displacement current, which produces a magnetic field round it just as a conduction current would — option (@K).',
  d: 3, c: 'application', t: [1],
}));
add('charged-mcq', mcq({
  stem: 'A capacitor connected to a battery has become fully charged, so the current in the leads is zero. The displacement current between its plates is now',
  right: 'zero, because the electric field is no longer changing',
  wrong: ['equal to the charging current it had at the start', 'largest, because the field is now largest', 'equal to the battery voltage divided by the capacitance'],
  sol: 'I_d = ε₀ dΦE/dt: a steady field gives no displacement current — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('maxwell-mcq', mcq({
  stem: 'The term that Maxwell added to Ampere’s circuital law is',
  right: '$\\mu_0\\varepsilon_0\\dfrac{d\\Phi_E}{dt}$',
  wrong: ['$\\mu_0\\dfrac{d\\Phi_B}{dt}$', '$\\varepsilon_0\\dfrac{d\\Phi_B}{dt}$', '$\\mu_0\\varepsilon_0\\Phi_E$'],
  sol: 'The Ampere–Maxwell law reads ∮B·dl = μ₀I_c + μ₀ε₀ dΦE/dt — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('disp-ar', ar({
  a: 'Ampere’s circuital law in its original form gives inconsistent results for a loop round the wire of a charging capacitor.',
  r: 'No conduction current crosses a surface, bounded by the loop, that passes through the gap between the plates.',
  key: 'a',
  sol: 'Both true; a flat surface pierced by the wire gives μ₀I, while a surface through the gap (R) gives zero — that is the inconsistency — option (a).',
  d: 3, c: 'understanding', t: [1],
}));
add('disp-short', short({
  marks: 2,
  stem: 'Explain why Maxwell had to introduce the idea of displacement current.',
  model: 'For a loop round the wire of a **charging capacitor**, Ampere’s law gave $\\mu_0 I$ using a surface pierced by the wire but **zero** using a surface through the **gap**, where no charge flows — a contradiction. Maxwell added the **displacement current** $\\varepsilon_0\\,d\\Phi_E/dt$ due to the **changing electric field** in the gap; it equals I, so both surfaces give the same answer.',
  sol: 'Two surfaces, one loop.',
  scheme: [['The contradiction with two surfaces', 1], ['Displacement current from changing E removes it', 1]],
  d: 2, c: 'understanding', t: [1],
}));
const bg = { R: 0.05, I: 0.2, r: 0.02 };
bg.B = (MU0 * bg.I * bg.r) / (2 * Math.PI * bg.R ** 2);
add('Bgap-short', short({
  marks: 3,
  stem: 'A capacitor with circular plates of radius 5.0 cm is being charged by a current of 0.20 A. Using the Ampere–Maxwell law, find the magnetic field between the plates at 2.0 cm from the axis. (Assume the electric field is uniform between the plates.)',
  model: r`The displacement current is spread uniformly over the plate area and totals 0.20 A. A circle of radius $r$ encloses the fraction $\dfrac{r^2}{R^2}$ of it: $I_\text{enc} = 0.20 \times \dfrac{0.020^2}{0.050^2} = 0.032$ A. Then $B \cdot 2\pi r = \mu_0 I_\text{enc}$, so $B = \dfrac{\mu_0 I_\text{enc}}{2\pi r} = \dfrac{2 \times 10^{-7} \times 0.032}{0.020} = ${sci(bg.B, 2)}$ T.`,
  sol: 'Enclosed displacement current ∝ r²/R², then Ampere–Maxwell.',
  scheme: [['Enclosed I_d = I r²/R² = 0.032 A', 1], ['B·2πr = μ₀ I_enc', 1], ['B = 3.2 × 10⁻⁷ T', 1]],
  d: 4, c: 'application', t: [1], wl: null,
}), () => near(bg.B, 3.2e-7) || `bg ${bg.B}`);

// ================================================================ t02 nature of EM waves
const e0 = C * 3e-8;
add('E0-num', num({
  stem: 'The peak magnetic field of an electromagnetic wave in vacuum is 3.0 × 10⁻⁸ T. Find its peak electric field, in V m⁻¹.',
  value: e0, tol: 0.05, unit: 'V m⁻¹',
  sol: r`$E_0 = cB_0 = 3.0 \times 10^{8} \times 3.0 \times 10^{-8} = 9$ V m$^{-1}$.`,
  scheme: [['E₀ = cB₀ = 9.0 V m⁻¹', 1]],
  d: 1, c: 'understanding', t: [2],
}), (q) => near(e0, q.answer.value) || 'e0');
add('transverse-ar', ar({
  a: 'Electromagnetic waves are transverse waves.',
  r: 'Their electric and magnetic fields are both perpendicular to the direction in which the wave travels.',
  key: 'a',
  sol: 'Both true; “transverse” means the oscillating quantities are perpendicular to the direction of travel, which is exactly R — option (a).',
  d: 1, c: 'understanding', t: [2],
}));
add('speed-mcq', mcq({
  stem: 'In vacuum, radio waves, visible light and X-rays travel',
  right: 'at the same speed',
  wrong: ['faster for higher frequencies', 'faster for longer wavelengths', 'at speeds proportional to their energy'],
  sol: 'All EM waves travel at c = 1/√(μ₀ε₀) in vacuum, whatever their frequency — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('direction-mcq', mcq({
  stem: 'At a certain point, the electric field of an EM wave points along +y and its magnetic field along +z. The wave is travelling along',
  right: '+x',
  wrong: ['−x', '+y', '−z'],
  sol: 'The direction of travel is along E × B = ŷ × ẑ = x̂ — option (@K).',
  d: 3, c: 'application', t: [2],
}), () => (cross([0, 1, 0], [0, 0, 1])[0] > 0) || 'dir');
add('direction2-mcq', mcq({
  stem: 'An EM wave travels along −z. At some instant its electric field points along +x. Its magnetic field at that instant points along',
  right: '−y',
  wrong: ['+y', '+x', '+z'],
  sol: 'E × B must point along −z. With E along x̂: x̂ × (−ŷ) = −ẑ, so B is along −y — option (@K).',
  d: 4, c: 'analysis', t: [2],
}), () => (cross([1, 0, 0], [0, -1, 0])[2] < 0) || 'dir2');
add('source-mcq', mcq({
  stem: 'Which of these produces electromagnetic waves?',
  right: 'An electron oscillating up and down an aerial',
  wrong: ['A charge at rest', 'A charge moving with constant velocity', 'A steady current in a straight wire'],
  sol: 'Only accelerated charges radiate; an oscillating charge is continually accelerated — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('medium-mcq', mcq({
  stem: 'A non-magnetic medium has relative permittivity 4. The speed of EM waves in it is',
  right: '$1.5 \\times 10^{8}$ m s$^{-1}$',
  wrong: ['$7.5 \\times 10^{7}$ m s$^{-1}$', '$3.0 \\times 10^{8}$ m s$^{-1}$', '$6.0 \\times 10^{8}$ m s$^{-1}$'],
  sol: r`$v = \dfrac{1}{\sqrt{\mu_0\varepsilon_0\varepsilon_r}} = \dfrac{c}{\sqrt{4}} = 1.5 \times 10^{8}$ m s$^{-1}$ — option (@K).`,
  d: 3, c: 'application', t: [2],
}), () => near(C / 2, 1.5e8) || 'v');
add('phase-tf', tf({
  stem: 'In an electromagnetic wave travelling in vacuum, the electric and magnetic fields are 90° out of phase.',
  key: 'f',
  sol: 'False. They are in phase: both reach their maximum and zero values at the same places and times.',
  d: 1, c: 'understanding', t: [2],
}));
const kw = { f: 3e9 };
kw.k = (2 * Math.PI) / (C / kw.f);
add('k-num', num({
  stem: 'Find the wavenumber k = 2π/λ of a 3.0 GHz electromagnetic wave in vacuum, in rad m⁻¹ (3 significant figures).',
  value: Number(dec(kw.k, 3)), tol: 0.2, unit: 'rad m⁻¹',
  sol: r`$\lambda = \dfrac{c}{f} = \dfrac{3.0 \times 10^{8}}{3.0 \times 10^{9}} = 0.1$ m; $k = \dfrac{2\pi}{0.1} \approx ${dec(kw.k, 3)}$ rad m$^{-1}$.`,
  scheme: [['λ = 0.10 m', 1], ['k ≈ 62.8 rad m⁻¹', 1]],
  marks: 2, d: 3, c: 'application', t: [2],
}), (q) => near(kw.k, q.answer.value) || 'k');
const b0 = 120 / C;
add('B0-num', num({
  stem: 'The peak electric field of a light wave is 120 V m⁻¹. Find its peak magnetic field, in microtesla.',
  value: Number(dec(b0 * 1e6, 2)), tol: 0.005, unit: 'μT',
  sol: r`$B_0 = \dfrac{E_0}{c} = \dfrac{120}{3.0 \times 10^{8}} = ${sci(b0, 2)}$ T. In μT: $${sci(b0, 2)} \times 10^{6} = ${dec(b0 * 1e6, 2)}$.`,
  scheme: [['B₀ = E₀/c = 0.40 μT', 1]],
  d: 2, c: 'understanding', t: [2],
}), (q) => near(b0 * 1e6, q.answer.value) || 'b0');
add('glass-mcq', mcq({
  stem: 'Light passes from air into glass. Which of its properties stays the same?',
  right: 'Its frequency',
  wrong: ['Its wavelength', 'Its speed', 'Both its speed and its wavelength'],
  sol: 'The frequency is set by the source; in glass the speed falls and so the wavelength λ = v/f becomes shorter — option (@K).',
  d: 3, c: 'application', t: [2],
}));
add('momentum-tf', tf({
  stem: 'Electromagnetic waves carry momentum as well as energy.',
  key: 't',
  sol: 'True. They exert a small pressure (radiation pressure) on surfaces that absorb or reflect them.',
  d: 1, c: 'recall', t: [2],
}));
add('wave-short', short({
  marks: 2,
  stem: 'State four characteristics of electromagnetic waves.',
  model: 'Any four: they are **transverse** (E ⟂ B ⟂ direction of travel); E and B are **in phase**; they need **no medium**; all travel at **c = 1/√(μ₀ε₀) ≈ 3 × 10⁸ m s⁻¹** in vacuum; $E_0 = cB_0$; they carry **energy and momentum**; they are produced by **accelerated charges**.',
  sol: 'List four properties.',
  scheme: [['Two characteristics', 1], ['Two more characteristics', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('accel-short', short({
  marks: 2,
  stem: 'A charge moving with constant velocity does not radiate electromagnetic waves, but an oscillating charge does. Explain.',
  model: 'A charge at constant velocity carries a **steady** field pattern along with it; nothing is sent outwards. An **oscillating** charge is continually **accelerating**, so its electric field keeps **changing**; the changing E produces a changing B and vice versa, and this disturbance travels outwards as an EM wave at the frequency of oscillation.',
  sol: 'Radiation needs acceleration.',
  scheme: [['Constant velocity: steady field, no radiation', 1], ['Acceleration: changing fields regenerate each other and travel out', 1]],
  d: 2, c: 'understanding', t: [2],
}));
const ew = { k: 2e7, w: 6e15, E0: 30 };
ew.lam = (2 * Math.PI) / ew.k;
ew.f = ew.w / (2 * Math.PI);
ew.v = ew.w / ew.k;
ew.B0 = ew.E0 / ew.v;
add('equation-short', short({
  marks: 3,
  stem: 'The electric field of an EM wave in vacuum is $E_y = 30\\sin(2.0 \\times 10^{7}x - 6.0 \\times 10^{15}t)$ in SI units. Find (a) its wavelength, (b) its frequency, (c) its speed and the peak magnetic field, and name the band.',
  model: r`(a) $\lambda = \dfrac{2\pi}{k} = \dfrac{2\pi}{2.0 \times 10^{7}} \approx ${sci(ew.lam, 3)}$ m (about 314 nm).
(b) $f = \dfrac{\omega}{2\pi} = \dfrac{6.0 \times 10^{15}}{2\pi} \approx ${sci(ew.f, 3)}$ Hz.
(c) $v = \dfrac{\omega}{k} = \dfrac{6.0 \times 10^{15}}{2.0 \times 10^{7}} = 3.0 \times 10^{8}$ m s$^{-1}$; $B_0 = \dfrac{E_0}{c} = \dfrac{30}{3.0 \times 10^{8}} = 1.0 \times 10^{-7}$ T, along z. A 314 nm wave is **ultraviolet**.`,
  sol: 'Read k and ω; λ = 2π/k, f = ω/2π, v = ω/k, B₀ = E₀/c.',
  scheme: [['λ ≈ 3.14 × 10⁻⁷ m', 1], ['f ≈ 9.55 × 10¹⁴ Hz', 1], ['v = 3.0 × 10⁸ m s⁻¹, B₀ = 1.0 × 10⁻⁷ T, ultraviolet', 1]],
  d: 3, c: 'application', t: [2, 3], wl: null,
}), () => near(ew.v, 3e8) && near(ew.B0, 1e-7) && near(ew.lam, 3.14e-7, 0.002) || 'ew');
const md = { n: 1.5, f: 5e14 };
md.v = C / md.n;
md.lam = md.v / md.f;
add('medium-short', short({
  marks: 3,
  stem: 'Light of frequency 5.0 × 10¹⁴ Hz enters glass of refractive index 1.5. Find its wavelength in air and in glass, and its speed in glass. Which quantity is unchanged?',
  model: r`In air: $\lambda = \dfrac{c}{f} = \dfrac{3.0 \times 10^{8}}{5.0 \times 10^{14}} = 6.0 \times 10^{-7}$ m (600 nm). In glass: $v = \dfrac{c}{n} = \dfrac{3.0 \times 10^{8}}{1.5} = 2.0 \times 10^{8}$ m s$^{-1}$ and $\lambda' = \dfrac{v}{f} = \dfrac{2.0 \times 10^{8}}{5.0 \times 10^{14}} = 4.0 \times 10^{-7}$ m (400 nm). The **frequency** is unchanged.`,
  sol: 'λ = v/f in each medium; f fixed.',
  scheme: [['λ in air = 600 nm', 1], ['v = 2.0 × 10⁸ m s⁻¹, λ in glass = 400 nm', 1], ['Frequency unchanged', 1]],
  d: 3, c: 'application', t: [2], wl: null,
}), () => near(md.lam, 4e-7) || 'md');

// ================================================================ t03 the electromagnetic spectrum
add('order-mcq', mcq({
  stem: 'Which list is in order of INCREASING frequency?',
  right: 'Radio, microwave, infrared, visible, ultraviolet, X-rays, gamma rays',
  wrong: ['Gamma rays, X-rays, ultraviolet, visible, infrared, microwave, radio', 'Radio, infrared, microwave, visible, X-rays, ultraviolet, gamma rays', 'Microwave, radio, visible, infrared, ultraviolet, gamma rays, X-rays'],
  sol: 'Frequency increases as wavelength decreases, from radio to gamma — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('uses-match', match({
  stem: 'Match each device in Column A with the band of the EM spectrum it uses in Column B.',
  pairs: [['TV remote control', 'Infrared'], ['Kitchen oven that heats food from inside', 'Microwaves'], ['Picture of a broken bone', 'X-rays'], ['Destroying cancer cells', 'Gamma rays']],
  order: [1, 3, 2, 0],
  sol: 'Remote → infrared (1 → q); oven → microwaves (2 → s); bone picture → X-rays (3 → r); cancer therapy → gamma rays (4 → p).',
  d: 2, c: 'understanding', t: [3],
}));
add('ozone-mcq', mcq({
  stem: 'The ozone layer high in the atmosphere protects living things mainly by absorbing',
  right: 'ultraviolet radiation',
  wrong: ['infrared radiation', 'microwaves', 'radio waves'],
  sol: 'Ozone absorbs most of the Sun’s harmful ultraviolet — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('band1-mcq', mcq({
  stem: 'An electromagnetic wave has a wavelength of 2.0 cm. It belongs to the',
  right: 'microwave band',
  wrong: ['infrared band', 'radio band (AM)', 'ultraviolet band'],
  sol: '2.0 cm = 0.020 m lies between 1 mm and 0.1 m: microwaves — option (@K).',
  d: 2, c: 'application', t: [3],
}));
const b2 = C / 5e14;
add('band2-mcq', mcq({
  stem: 'An electromagnetic wave has a frequency of 5.0 × 10¹⁴ Hz. It is',
  right: 'visible light (wavelength 600 nm)',
  wrong: ['infrared (wavelength 6.0 μm)', 'ultraviolet (wavelength 60 nm)', 'microwave (wavelength 6.0 mm)'],
  sol: r`$\lambda = \dfrac{c}{f} = \dfrac{3.0 \times 10^{8}}{5.0 \times 10^{14}} = ${sci(b2, 2)}$ m $= 600$ nm, in the visible range (orange light) — option (@K).`,
  d: 2, c: 'application', t: [3],
}), () => near(b2, 6e-7) || 'b2');
const b3 = C / 3e19;
add('band3-mcq', mcq({
  stem: 'Radiation of frequency 3.0 × 10¹⁹ Hz is produced when very fast electrons strike a tungsten target. It is classed as',
  right: 'X-rays (wavelength about 10 pm)',
  wrong: ['ultraviolet (wavelength about 10 nm)', 'microwaves (wavelength about 1 cm)', 'visible light'],
  sol: r`$\lambda = \dfrac{3.0 \times 10^{8}}{3.0 \times 10^{19}} = ${sci(b3, 2)}$ m = 10 pm, and the way it is made (electrons hitting a metal target) identifies X-rays — option (@K).`,
  d: 3, c: 'application', t: [3],
}), () => near(b3, 1e-11) || 'b3');
const fm = C / 91.1e6;
add('fm-num', num({
  stem: 'Find the wavelength of an FM radio station broadcasting at 91.1 MHz, in metres (3 significant figures).',
  value: Number(dec(fm, 3)), tol: 0.02, unit: 'm',
  sol: r`$\lambda = \dfrac{c}{f} = \dfrac{3.0 \times 10^{8}}{91.1 \times 10^{6}} \approx ${dec(fm, 3)}$ m.`,
  scheme: [['λ = c/f ≈ 3.29 m', 1]],
  d: 1, c: 'understanding', t: [3],
}), (q) => near(fm, q.answer.value) || 'fm');
add('am-num', num({
  stem: 'A medium-wave AM station broadcasts at 1.0 MHz. Find the wavelength of its waves, in metres.',
  value: C / 1e6, tol: 1, unit: 'm',
  sol: r`$\lambda = \dfrac{c}{f} = \dfrac{3.0 \times 10^{8}}{1.0 \times 10^{6}} = ${C / 1e6}$ m.`,
  scheme: [['λ = 300 m', 1]],
  d: 1, c: 'understanding', t: [3],
}), (q) => near(300, q.answer.value) || 'am');
add('greenhouse-mcq', mcq({
  stem: 'The greenhouse effect, which keeps the Earth warmer than it would otherwise be, involves gases in the atmosphere absorbing',
  right: 'infrared radiation given out by the Earth',
  wrong: ['ultraviolet radiation from the Sun', 'microwaves from mobile towers', 'gamma rays from the ground'],
  sol: 'The warm Earth emits infrared; carbon dioxide and water vapour absorb much of it — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('purifier-mcq', mcq({
  stem: 'Many household water purifiers kill germs by exposing the water to',
  right: 'ultraviolet radiation',
  wrong: ['infrared radiation', 'radio waves', 'visible red light'],
  sol: 'Ultraviolet damages the genetic material of micro-organisms — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('radar-mcq', mcq({
  stem: 'Airport radar that tracks aircraft uses',
  right: 'microwaves',
  wrong: ['X-rays', 'gamma rays', 'ultraviolet'],
  sol: 'Radar uses short-wavelength microwaves, which can be sent as narrow beams and reflect from aircraft — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('highest-mcq', mcq({
  stem: 'Of the following, which has the highest frequency: blue light, infrared, gamma rays or microwaves?',
  right: 'gamma rays',
  wrong: ['blue light', 'infrared', 'microwaves'],
  sol: 'Gamma rays have the shortest wavelength and so the highest frequency — option (@K).',
  d: 1, c: 'understanding', t: [3],
}));
add('nightvision-mcq', mcq({
  stem: 'Border security forces use cameras that can “see” people in complete darkness. These cameras detect',
  right: 'infrared radiation emitted by warm bodies',
  wrong: ['ultraviolet radiation emitted by warm bodies', 'microwaves reflected from the people', 'X-rays passing through them'],
  sol: 'Warm bodies emit infrared, which night-vision cameras detect — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('satellite-mcq', mcq({
  stem: 'Microwaves rather than medium-wave radio are used to communicate with satellites because microwaves',
  right: 'pass through the ionosphere, which reflects lower-frequency radio waves back to Earth',
  wrong: ['travel faster than radio waves', 'are absorbed by the atmosphere', 'need no transmitter'],
  sol: 'Lower-frequency radio waves are reflected by the ionosphere; microwaves pass through it to reach satellites — option (@K).',
  d: 3, c: 'application', t: [3],
}));
add('visible-fill', fill({
  stem: 'Visible light has wavelengths from about 400 nm (violet) to about ___ nm (red).',
  acc: [['700', '750', '700 nm']],
  sol: 'About **700** nm for red light.',
  d: 1, c: 'recall', t: [3],
}));
add('xray-fill', fill({
  stem: 'X-rays are produced when fast-moving ___ strike a metal target.',
  acc: [['electrons', 'electron']],
  sol: 'Fast **electrons** striking a heavy-metal target.',
  d: 1, c: 'recall', t: [3],
}));
add('xray-ar', ar({
  a: 'X-rays pass easily through soft tissue but are strongly absorbed by bone.',
  r: 'X-rays have longer wavelengths than visible light.',
  key: 'c',
  sol: 'A is true. R is false: X-rays have much SHORTER wavelengths (about 1 nm or less) than visible light — option (c).',
  d: 2, c: 'understanding', t: [3],
}));
add('uv-ar', ar({
  a: 'Infrared lamps are used in physiotherapy to warm muscles.',
  r: 'Ultraviolet radiation is absorbed by the ozone layer.',
  key: 'b',
  sol: 'Both statements are true, but R has nothing to do with A — option (b).',
  d: 1, c: 'recall', t: [3],
}));
add('xvsgamma-ar', ar({
  a: 'Gamma rays are produced by electrons changing energy levels in the outer parts of atoms.',
  r: 'Gamma rays have the highest frequencies in the electromagnetic spectrum.',
  key: 'd',
  sol: 'R is true. A is false: gamma rays come from changes inside atomic NUCLEI (radioactive decay, nuclear reactions) — option (d).',
  d: 2, c: 'understanding', t: [3],
}));
add('band-short', short({
  marks: 2,
  stem: 'State how X-rays and gamma rays are produced, and give one use of each.',
  model: '**X-rays** are produced when **fast electrons strike a metal target** (an X-ray tube); used for imaging **bones** and teeth (or studying crystals). **Gamma rays** are given out by **radioactive nuclei** (nuclear reactions); used to **destroy cancer cells** (or sterilise medical equipment).',
  sol: 'Source and use for each.',
  scheme: [['X-rays: source and use', 1], ['Gamma rays: source and use', 1]],
  d: 1, c: 'recall', t: [3],
}));
add('welder-short', short({
  marks: 2,
  stem: 'Why do welders wear special dark goggles or face shields while arc welding?',
  model: 'An electric welding arc is extremely hot and gives out intense **ultraviolet** radiation (as well as very bright visible light). UV can **damage the eyes** (and burn skin); the special glass of the goggles **absorbs the UV** and cuts down the glare.',
  sol: 'Welding arc emits strong UV.',
  scheme: [['Arc emits intense UV', 1], ['Goggles absorb UV to protect the eyes', 1]],
  d: 2, c: 'application', t: [3],
}));
add('greenhouse-short', short({
  marks: 2,
  stem: 'Explain how the greenhouse effect warms the Earth, naming the radiation involved.',
  model: 'Sunlight (mostly visible) passes through the atmosphere and warms the ground. The warm Earth re-emits energy as **infrared**, which gases such as **carbon dioxide and water vapour absorb** and partly send back down. Less energy escapes to space, so the surface stays **warmer**.',
  sol: 'Visible in, infrared trapped.',
  scheme: [['Earth emits infrared', 1], ['Absorbed by CO₂/water vapour, trapping heat', 1]],
  d: 3, c: 'application', t: [3],
}));
add('spectrum-short', short({
  marks: 3,
  stem: 'Arrange microwaves, gamma rays, infrared and ultraviolet in order of increasing wavelength, and give one use of each.',
  model: 'Increasing wavelength: **gamma rays < ultraviolet < infrared < microwaves**. Uses: gamma rays — cancer therapy; ultraviolet — sterilising water; infrared — TV remote controls (or night vision); microwaves — radar or cooking.',
  sol: 'Order, then one use each.',
  scheme: [['Correct order', 1], ['Two uses', 1], ['Two more uses', 1]],
  d: 2, c: 'understanding', t: [3], wl: null,
}));

// ================================================================ long answers (5 marks)
const dl = { C: 5e-9, dVdt: 2e6 };
dl.Id = dl.C * dl.dVdt;
add('disp-long', long({
  stem: '(a) Explain, with a diagram (described in words), the inconsistency in Ampere’s circuital law for a charging capacitor. (b) Define displacement current and write the Ampere–Maxwell law. (c) Show that the displacement current between the plates equals the conduction current in the leads. (d) Find the displacement current when the voltage across a 5.0 nF capacitor changes at 2.0 × 10⁶ V s⁻¹.',
  model: r`(a) Take a circular loop round the lead of a charging capacitor. For a flat surface bounded by the loop and crossed by the lead, $\oint \vec B\cdot d\vec l = \mu_0 I$. For a pot-shaped surface with the same rim that passes between the plates, no conduction current crosses it, so the law gives zero. One loop cannot have two values of $\oint \vec B\cdot d\vec l$.

(b) **Displacement current** $I_d = \varepsilon_0\dfrac{d\Phi_E}{dt}$, due to a changing electric flux. Ampere–Maxwell law: $\oint \vec B\cdot d\vec l = \mu_0\left(I_c + \varepsilon_0\dfrac{d\Phi_E}{dt}\right)$.

(c) Between plates of area $A$ carrying charge $q$, $E = \dfrac{q}{\varepsilon_0 A}$, so $\Phi_E = EA = \dfrac{q}{\varepsilon_0}$ and $I_d = \varepsilon_0\dfrac{d\Phi_E}{dt} = \dfrac{dq}{dt} = I$.

(d) $I_d = C\dfrac{dV}{dt} = 5.0 \times 10^{-9} \times 2.0 \times 10^{6} = ${dec(dl.Id, 2)}$ A.`,
  sol: 'Two surfaces; define I_d; Φ_E = q/ε₀; I_d = C dV/dt.',
  scheme: [['Inconsistency with two surfaces', 1], ['Definition of I_d', 1], ['Ampere–Maxwell law', 1], ['I_d = dq/dt = I shown', 1], ['I_d = 0.010 A', 1]],
  d: 3, c: 'understanding', t: [1], wl: null,
}), () => near(dl.Id, 0.01) || 'dl');
const wl2 = { f: 2e10, E0: 48 };
wl2.lam = C / wl2.f;
wl2.B0 = wl2.E0 / C;
wl2.k = (2 * Math.PI) / wl2.lam;
add('wave-long', long({
  stem: '(a) Describe how an oscillating charge produces an electromagnetic wave, and explain why the wave is transverse. (b) Draw (describe) a plane EM wave travelling along x. (c) A microwave beam of frequency 20 GHz has a peak electric field of 48 V m⁻¹. Find its wavelength, wavenumber and peak magnetic field, and write expressions for E and B.',
  model: r`(a) An oscillating charge is continually accelerated, so its electric field keeps changing. A changing E produces a changing B (Ampere–Maxwell) and a changing B produces a changing E (Faraday), so the disturbance regenerates itself and travels outwards at $c$. E and B are both perpendicular to the direction of travel, so the wave is **transverse**.

(b) E oscillates along y and B along z, in phase, with the same wavelength; E × B points along +x.

(c) $\lambda = \dfrac{c}{f} = \dfrac{3.0 \times 10^{8}}{2.0 \times 10^{10}} = ${dec(wl2.lam, 2)}$ m; $k = \dfrac{2\pi}{\lambda} \approx ${dec(wl2.k, 3)}$ rad m$^{-1}$; $B_0 = \dfrac{E_0}{c} = \dfrac{48}{3.0 \times 10^{8}} = ${sci(wl2.B0, 2)}$ T.
$E_y = 48\sin(${dec(wl2.k, 3)}x - 1.26 \times 10^{11}t)$ V m$^{-1}$ and $B_z = ${sci(wl2.B0, 2)}\sin(${dec(wl2.k, 3)}x - 1.26 \times 10^{11}t)$ T, with $\omega = 2\pi f \approx 1.26 \times 10^{11}$ rad s$^{-1}$.`,
  sol: 'Mechanism, transverse nature; λ = c/f, k = 2π/λ, B₀ = E₀/c.',
  scheme: [['Accelerated charge and mutual regeneration of E and B', 1], ['Transverse: E ⟂ B ⟂ x, in phase', 1], ['λ = 0.015 m, k ≈ 419 rad m⁻¹', 1], ['B₀ = 1.6 × 10⁻⁷ T', 1], ['Expressions for E and B', 1]],
  d: 3, c: 'application', t: [2], wl: null,
}), () => near(wl2.lam, 0.015) && near(wl2.B0, 1.6e-7) && near(wl2.k, 418.9, 0.002) || 'wl2');
add('spectrum-long', long({
  stem: 'Name the seven main bands of the electromagnetic spectrum in order of decreasing wavelength. For any four of them, give an approximate wavelength range, how the radiation is produced, and one use.',
  model: 'Order: **radio, microwaves, infrared, visible, ultraviolet, X-rays, gamma rays**.\n\n- **Radio** (> 0.1 m): oscillating currents in aerials; broadcasting and mobile phones.\n- **Microwaves** (0.1 m – 1 mm): magnetron/klystron valves; radar, microwave ovens.\n- **Infrared** (1 mm – 700 nm): hot bodies, vibrating molecules; remote controls, night vision.\n- **Visible** (700 – 400 nm): electron transitions in atoms; seeing, photography.\n- **Ultraviolet** (400 nm – 1 nm): Sun, arc lamps; sterilisation (absorbed by ozone).\n- **X-rays** (1 nm – 1 pm): fast electrons hitting a metal target; medical imaging.\n- **Gamma rays** (below about 1 pm): radioactive nuclei; cancer therapy.',
  sol: 'Order plus range, source and use for four bands.',
  scheme: [['Correct order of seven bands', 1], ['First band: range, source, use', 1], ['Second band', 1], ['Third band', 1], ['Fourth band', 1]],
  d: 2, c: 'understanding', t: [3], wl: null,
}));
const sp = { er: 2.25 };
sp.v = 1 / Math.sqrt(MU0 * EPS0 * sp.er);
sp.n = Math.sqrt(sp.er);
add('speed-long', long({
  stem: '(a) Write the expression for the speed of EM waves in vacuum in terms of μ₀ and ε₀, and evaluate it. (b) Write the speed in a medium of relative permittivity εr and relative permeability μr, and show that the refractive index is n = √(εrμr). (c) For a non-magnetic plastic with εr = 2.25 at optical frequencies, find the speed of light in it and its refractive index. (d) State what happens to the frequency and wavelength of light entering this plastic from air.',
  model: r`(a) $c = \dfrac{1}{\sqrt{\mu_0\varepsilon_0}} = \dfrac{1}{\sqrt{4\pi \times 10^{-7} \times 8.85 \times 10^{-12}}} \approx ${sci(1 / Math.sqrt(MU0 * EPS0), 3)}$ m s$^{-1}$.

(b) $v = \dfrac{1}{\sqrt{\mu\varepsilon}} = \dfrac{1}{\sqrt{\mu_r\mu_0\varepsilon_r\varepsilon_0}} = \dfrac{c}{\sqrt{\mu_r\varepsilon_r}}$, so $n = \dfrac{c}{v} = \sqrt{\varepsilon_r\mu_r}$.

(c) $\mu_r = 1$: $n = \sqrt{2.25} = ${dec(sp.n, 2)}$ and $v = \dfrac{c}{n} \approx ${sci(sp.v, 3)}$ m s$^{-1}$.

(d) The **frequency is unchanged** (set by the source); the **wavelength decreases** by the factor $n$ (to 2/3 of its value in air).`,
  sol: 'v = 1/√(με); n = c/v.',
  scheme: [['c ≈ 3.0 × 10⁸ m s⁻¹', 1], ['v = c/√(μrεr), n = √(εrμr)', 1], ['n = 1.5', 1], ['v ≈ 2.0 × 10⁸ m s⁻¹', 1], ['f unchanged, λ smaller', 1]],
  d: 3, c: 'application', t: [2], wl: null,
}), () => near(sp.v, 2.0e8, 0.002) && near(sp.n, 1.5) || `sp ${sp.v}`);
const idl = [C / 1e9, C / 6e14, 1.5e-10, C / 1e21];
add('identify-long', long({
  stem: 'Identify the band of each of the following, showing your working, and suggest a suitable use or source in each case: (a) f = 1.0 GHz, (b) f = 6.0 × 10¹⁴ Hz, (c) λ = 0.15 nm, (d) f = 1.0 × 10²¹ Hz. (e) Which of these could cause ionisation in living tissue, and why?',
  model: r`(a) $\lambda = \dfrac{3.0 \times 10^{8}}{1.0 \times 10^{9}} = ${dec(idl[0], 2)}$ m: **microwave** (upper radio) — mobile phones, Wi-Fi.
(b) $\lambda = \dfrac{3.0 \times 10^{8}}{6.0 \times 10^{14}} = ${sci(idl[1], 2)}$ m = 500 nm: **visible** (green) — seeing, photography.
(c) 0.15 nm lies between 1 pm and 1 nm: **X-rays** — imaging, crystal structure (from an X-ray tube).
(d) $\lambda = \dfrac{3.0 \times 10^{8}}{1.0 \times 10^{21}} = ${sci(idl[3], 2)}$ m: **gamma rays** — from radioactive nuclei; cancer therapy.
(e) **(c) and (d)**: X-ray and gamma photons carry enough energy to knock electrons out of atoms (ionise), damaging cells; microwaves and visible light do not.`,
  sol: 'Convert each to λ and compare with band limits.',
  scheme: [['(a) 0.30 m, microwave', 1], ['(b) 500 nm, visible', 1], ['(c) X-rays', 1], ['(d) 3.0 × 10⁻¹³ m, gamma', 1], ['(e) X and gamma ionise', 1]],
  d: 4, c: 'analysis', t: [3], wl: null,
}), () => near(idl[0], 0.3) && near(idl[1], 5e-7) && near(idl[3], 3e-13) || 'idl');

// ================================================================ case-based (4 marks: 1 + 1 + 2)
const ov = C / 2.45e9;
add('oven-case', mk.case({
  passage: 'A microwave oven in a Chennai kitchen uses a magnetron to produce electromagnetic waves of frequency 2.45 GHz. The metal walls reflect the waves, and the water molecules in food absorb them strongly, so the food heats up while a dry glass bowl stays fairly cool. The door has a metal mesh with holes a few millimetres across.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'To which band of the EM spectrum do these waves belong?',
      right: 'Microwaves',
      wrong: ['Infrared', 'Radio (AM)', 'Ultraviolet'],
      sol: 'They come from a magnetron and have a wavelength of about 12 cm: microwaves — option (@K).',
      d: 1, c: 'understanding', t: [3],
    })),
    part('b', num({
      stem: 'Find the wavelength of the waves, in centimetres (3 significant figures).',
      value: Number(dec(ov * 100, 3)), tol: 0.1, unit: 'cm',
      sol: r`$\lambda = \dfrac{c}{f} = \dfrac{3.0 \times 10^{8}}{2.45 \times 10^{9}} \approx ${dec(ov, 3)}$ m, i.e. $${dec(ov, 3)} \times 100 = ${dec(ov * 100, 3)}$ cm.`,
      scheme: [['λ ≈ 12.2 cm', 1]],
      d: 2, c: 'application', t: [3],
    })),
    part('c', short({
      marks: 2,
      stem: 'Explain why the mesh in the door keeps the microwaves in but lets you see the food.',
      model: 'The holes (a few mm) are much **smaller than the 12 cm wavelength** of the microwaves, so the metal mesh acts like a solid metal sheet for them and **reflects** them back. Visible light has a wavelength of only about **500 nm**, far smaller than the holes, so it passes through and you can see inside.',
      sol: 'Compare hole size with each wavelength.',
      scheme: [['Holes ≪ microwave wavelength: reflected', 1], ['Light wavelength ≪ holes: passes', 1]],
      d: 3, c: 'analysis', t: [3],
    }), [
      short({
        marks: 2,
        stem: 'A neighbour fears that food cooked in the oven becomes radioactive, “like X-rays”. Evaluate this fear.',
        model: 'The fear is **unfounded**. Microwaves have a frequency about **a billion times lower** than X-rays, so each photon has far too little energy to ionise atoms or affect nuclei. They simply make water molecules rotate and heat the food; nothing becomes radioactive, and heating stops when the oven switches off.',
        sol: 'Compare frequencies and effects.',
        scheme: [['Microwave photons far too weak to ionise', 1], ['Only heating; no radioactivity', 1]],
        d: 3, c: 'evaluation', t: [3],
      }),
    ]),
  ],
}), (q) => near(ov, 0.1224, 0.002) && near(q.children[1].answer.value, 12.2) || 'oven');

const tw = C / 3.5e9;
add('tower-case', mk.case({
  passage: 'A telecom company in Pune installs 5G antennas that transmit at 3.5 GHz, a higher frequency than older 4G bands near 900 MHz. Engineers note that the 5G signals do not travel as far round buildings, so more antennas are needed. Some residents ask whether the new antennas emit “dangerous radiation”.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'The 3.5 GHz waves belong to the',
      right: 'microwave band',
      wrong: ['infrared band', 'ultraviolet band', 'X-ray band'],
      sol: 'Their wavelength is about 8.6 cm, inside the microwave range — option (@K).',
      d: 2, c: 'application', t: [3],
    })),
    part('b', num({
      stem: 'Find the wavelength of the 3.5 GHz waves, in centimetres (3 significant figures).',
      value: Number(dec(tw * 100, 3)), tol: 0.05, unit: 'cm',
      sol: r`$\lambda = \dfrac{3.0 \times 10^{8}}{3.5 \times 10^{9}} \approx ${dec(tw, 3)}$ m, i.e. $${dec(tw, 3)} \times 100 = ${dec(tw * 100, 3)}$ cm.`,
      scheme: [['λ ≈ 8.57 cm', 1]],
      d: 2, c: 'application', t: [3],
    })),
    part('c', short({
      marks: 2,
      stem: 'Explain why higher-frequency 5G signals need more antennas than 900 MHz signals.',
      model: r`A 900 MHz wave has $\lambda \approx 33$ cm, while 3.5 GHz has $\lambda \approx 8.6$ cm. Waves bend (diffract) round obstacles less when their wavelength is **much smaller** than the obstacle, and shorter waves are also absorbed more by walls. So 5G signals are blocked more by buildings and each antenna covers a **smaller area**.`,
      sol: 'Shorter wavelength, less diffraction, more absorption.',
      scheme: [['Shorter wavelength (≈ 8.6 cm vs 33 cm)', 1], ['Less bending round buildings and more absorption: smaller coverage', 1]],
      d: 3, c: 'analysis', t: [3], wl: null,
    }), [
      short({
        marks: 2,
        stem: 'Evaluate the claim that the 5G antennas emit radiation as harmful as the X-rays in a hospital.',
        model: 'The claim is **not correct**. 5G uses microwaves of about **3.5 × 10⁹ Hz**, while X-rays are around **10¹⁸ Hz** — about 10⁸ to 10⁹ times higher. Microwave photons cannot **ionise** atoms; their only established effect is slight heating at high intensity, and antenna emissions are kept far below safe limits. X-rays are ionising and can damage DNA.',
        sol: 'Compare frequency and ionising ability.',
        scheme: [['Frequency far lower than X-rays', 1], ['Non-ionising vs ionising: claim incorrect', 1]],
        d: 4, c: 'evaluation', t: [3],
      }),
    ]),
  ],
}), (q) => near(tw, 0.0857, 0.002) && near(q.children[1].answer.value, 8.57) || 'tower');

const xr = C / 3e18;
add('hospital-case', mk.case({
  passage: 'In the radiology department of a hospital in Patna, an X-ray machine accelerates electrons onto a tungsten target and produces X-rays of frequency up to about 3 × 10¹⁸ Hz to image a patient’s broken arm. The radiographer stands behind a lead-lined screen. In another wing, a cobalt-60 source emits gamma rays that are aimed at a tumour.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'Why does the X-ray image show the bone clearly?',
      right: 'X-rays pass through soft tissue easily but are absorbed much more by bone',
      wrong: ['X-rays are reflected by soft tissue', 'Bone emits X-rays of its own', 'X-rays bend round the bone'],
      sol: 'Denser bone absorbs more X-rays, leaving a shadow on the detector — option (@K).',
      d: 2, c: 'understanding', t: [3],
    })),
    part('b', num({
      stem: 'Find the wavelength of 3.0 × 10¹⁸ Hz X-rays, in nanometres.',
      value: Number(dec(xr * 1e9, 2)), tol: 0.005, unit: 'nm',
      sol: r`$\lambda = \dfrac{3.0 \times 10^{8}}{3.0 \times 10^{18}} = ${sci(xr, 2)}$ m. In nm: $${sci(xr, 2)} \times 10^{9} = ${dec(xr * 1e9, 2)}$.`,
      scheme: [['λ = 0.10 nm', 1]],
      d: 2, c: 'application', t: [3],
    })),
    part('c', short({
      marks: 2,
      stem: 'Explain why the radiographer stands behind a lead screen, although the patient is exposed only briefly.',
      model: 'X-rays are **ionising**: they can damage cells and DNA. A patient receives a small dose occasionally, but the radiographer would be exposed to scattered X-rays **many times a day**, so the dose would build up. Lead, being dense, **absorbs** X-rays strongly and keeps the radiographer’s exposure very low.',
      sol: 'Repeated exposure; lead absorbs.',
      scheme: [['X-rays ionising, doses add up for staff', 1], ['Lead absorbs X-rays strongly', 1]],
      d: 3, c: 'application', t: [3],
    }), [
      short({
        marks: 2,
        stem: 'State how the gamma rays used on the tumour are produced differently from the X-rays, and why gamma rays are suitable for destroying cancer cells.',
        model: 'X-rays come from **fast electrons striking a metal target**, whereas gamma rays come from **changes inside the nuclei** of radioactive atoms such as cobalt-60. Gamma rays are very **energetic and penetrating**, so a carefully aimed beam can reach a deep tumour and **kill the cancer cells** by ionisation.',
        sol: 'Electron impact vs nuclear decay.',
        scheme: [['X-rays from electron impact; gamma from nuclei', 1], ['Energetic, penetrating, kills cells', 1]],
        d: 2, c: 'understanding', t: [3],
      }),
    ]),
  ],
}), (q) => near(xr, 1e-10) && near(q.children[1].answer.value, 0.1) || 'xr');

await import('./questions-extra.mjs');
