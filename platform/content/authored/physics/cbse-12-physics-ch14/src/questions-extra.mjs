// ch14 further application items added in the verifier pass (competency balance and bank size). Imported last.
import { mk, add, r, sci, dec, near } from '../../cbse-12-physics-ch01/src/lib.mjs';
import { HC } from './decks.mjs';

const { mcq, num, match } = mk;

const ge = HC / 0.7;
add('ge-num', num({
  stem: 'Germanium has a band gap of 0.70 eV. Find the longest wavelength of light that can create an electron–hole pair in germanium, in nm (3 significant figures). (hc = 1243 eV nm.)',
  value: Number(dec(ge, 3)), tol: 3, unit: 'nm',
  sol: r`$\lambda_\text{max} = \dfrac{hc}{E_g} = \dfrac{1243}{0.70} \approx ${dec(ge, 3)}$ nm (infrared).`,
  scheme: [['λ = hc/E_g', 1], ['≈ 1780 nm', 1]],
  marks: 2, d: 2, c: 'application', t: [1],
}), (q) => near(ge, q.answer.value) || 'ge');
const led = HC / 650;
add('redled-num', num({
  stem: 'A red light-emitting diode gives out light of wavelength 650 nm when electrons fall across its band gap. Estimate the band gap of its semiconductor, in eV (3 significant figures). (hc = 1243 eV nm.)',
  value: Number(dec(led, 3)), tol: 0.02, unit: 'eV',
  sol: r`$E_g \approx \dfrac{hc}{\lambda} = \dfrac{1243}{650} \approx ${dec(led, 3)}$ eV.`,
  scheme: [['E_g = hc/λ', 1], ['≈ 1.91 eV', 1]],
  marks: 2, d: 2, c: 'application', t: [1],
}), (q) => near(led, q.answer.value) || 'led');
const gd = { N: 4.4e28, frac: 1e-6, ni: 2.4e19 };
gd.ND = gd.N * gd.frac;
gd.nh = gd.ni ** 2 / gd.ND;
add('gedoped-num', num({
  stem: 'Germanium has 4.4 × 10²⁸ atoms m⁻³ and an intrinsic carrier density of 2.4 × 10¹⁹ m⁻³. It is doped with 1 arsenic atom per 10⁶ germanium atoms. Find the hole density, in units of 10¹⁶ m⁻³ (3 significant figures).',
  value: Number(dec(gd.nh / 1e16, 3)), tol: 0.02, unit: '× 10¹⁶ m⁻³',
  sol: r`$n_e \approx N_D = \dfrac{4.4 \times 10^{28}}{10^{6}} = ${sci(gd.ND, 2)}$ m$^{-3}$; $n_h = \dfrac{n_i^2}{n_e} = \dfrac{(2.4 \times 10^{19})^2}{${sci(gd.ND, 2)}} \approx ${sci(gd.nh, 3)}$ m$^{-3}$, i.e. $\dfrac{${sci(gd.nh, 3)}}{10^{16}} = ${dec(gd.nh / 1e16, 3)}$.`,
  scheme: [['n_e ≈ N_D = 4.4 × 10²² m⁻³', 1], ['n_h ≈ 1.31 × 10¹⁶ m⁻³', 1]],
  marks: 2, d: 3, c: 'application', t: [2],
}), (q) => near(gd.nh / 1e16, q.answer.value) || `gd ${gd.nh}`);
const rs = (9 - 0.7) / 0.015;
add('chooseR-num', num({
  stem: 'A silicon diode (0.7 V drop when conducting) is to carry a forward current of 15 mA from a 9.0 V battery. What series resistance is needed, in ohms (3 significant figures)?',
  value: Number(dec(rs, 3)), tol: 3, unit: 'Ω',
  sol: r`$R = \dfrac{9.0 - 0.7}{15 \times 10^{-3}} = \dfrac{8.3}{0.015} \approx ${dec(rs, 3)}$ Ω.`,
  scheme: [['Voltage across R = 8.3 V', 1], ['R ≈ 553 Ω', 1]],
  marks: 2, d: 3, c: 'application', t: [3],
}), (q) => near(rs, q.answer.value) || 'rs');
add('lampdiode-mcq', mcq({
  stem: 'A filament lamp is run from the AC mains, first directly and then with a silicon diode in series. With the diode in place the lamp',
  right: 'glows less brightly, because current flows only in alternate half-cycles',
  wrong: ['does not glow at all, because a diode blocks AC', 'glows more brightly, because the diode adds energy', 'glows equally brightly, because the diode has no resistance'],
  sol: 'The diode conducts only in the half-cycles when it is forward biased, so the lamp receives about half the power — option (@K).',
  d: 3, c: 'application', t: [4],
}));
const pf = 6 * Math.SQRT2 - 0.7;
add('peakfull-num', num({
  stem: 'In a centre-tap full-wave rectifier, each half of the secondary gives 6.0 V rms. With silicon diodes (0.7 V drop), find the peak voltage across the load, in volts (3 significant figures).',
  value: Number(dec(pf, 3)), tol: 0.05, unit: 'V',
  sol: r`$V_0 = \sqrt{2} \times 6.0 \approx ${dec(6 * Math.SQRT2, 3)}$ V; peak across the load $= ${dec(6 * Math.SQRT2, 3)} - 0.7 = ${dec(pf, 3)}$ V.`,
  scheme: [['V₀ ≈ 8.49 V', 1], ['Minus 0.7 V ≈ 7.79 V', 1]],
  marks: 2, d: 2, c: 'application', t: [4],
}), (q) => near(pf, q.answer.value) || 'pf');
add('reversedrop-mcq', mcq({
  stem: 'A silicon diode is reverse biased in series with a 1 kΩ resistor across a 5.0 V battery (well below breakdown). The voltage across the diode is about',
  right: '5.0 V, because almost no current flows, so almost no voltage is lost across the resistor',
  wrong: ['0.7 V, the barrier potential', '0 V, because the diode blocks', '2.5 V, shared equally with the resistor'],
  sol: 'The reverse current is only microamperes, so the resistor drop (IR) is negligible and nearly the whole 5.0 V appears across the diode — option (@K).',
  d: 4, c: 'analysis', t: [3],
}));
const cr = Math.exp((0.8 - 0.7) / 0.05);
add('currentratio-num', num({
  stem: 'Near its knee, the forward current of a silicon diode follows I = I₁ e^((V − 0.70 V)/0.050 V), where I₁ is the current at 0.70 V. By what factor does the current increase when the voltage rises from 0.70 V to 0.80 V (3 significant figures)?',
  value: Number(dec(cr, 3)), tol: 0.05, unit: '',
  sol: r`$\dfrac{I(0.80)}{I(0.70)} = e^{(0.80 - 0.70)/0.050} = e^{2} \approx ${dec(cr, 3)}$.`,
  scheme: [['Exponent 0.10/0.050 = 2', 1], ['Factor e² ≈ 7.39', 1]],
  marks: 2, d: 4, c: 'analysis', t: [3],
}), (q) => near(cr, q.answer.value) || 'cr');
add('pulsegap-num', num({
  stem: 'A full-wave rectifier is fed from 50 Hz mains. Find the time between successive output pulses, in milliseconds.',
  value: 10, tol: 0.1, unit: 'ms',
  sol: r`Output pulse frequency $= 2 \times 50 = 100$ Hz, so the interval $= \dfrac{1}{100} = 0.010$ s, i.e. $0.010 \times 10^{3} = 10$ ms.`,
  scheme: [['Output frequency 100 Hz', 1], ['Interval 10 ms', 1]],
  marks: 2, d: 2, c: 'application', t: [4],
}));
add('doubledoping-mcq', mcq({
  stem: 'The donor concentration in a piece of n-type silicon is doubled (it is still much larger than nᵢ). The hole density',
  right: 'is halved',
  wrong: ['is doubled', 'is unchanged', 'becomes four times as large'],
  sol: 'n_e roughly doubles and n_e n_h = n_i² stays fixed, so n_h halves — option (@K).',
  d: 3, c: 'application', t: [2],
}));
add('carrier-match', match({
  stem: 'Match each silicon sample in Column A with the description of its charge carriers in Column B.',
  pairs: [['Silicon doped with phosphorus', 'Electrons in the majority'], ['Silicon doped with boron', 'Holes in the majority'], ['Pure silicon at room temperature', 'Equal numbers of free electrons and holes'], ['Pure silicon near 0 K', 'Practically no free carriers']],
  order: [1, 3, 0, 2],
  sol: 'Phosphorus (donor) → electrons in the majority (1 → q); boron (acceptor) → holes in the majority (2 → s); pure Si at room temperature → equal numbers (3 → p); pure Si near 0 K → no free carriers (4 → r).',
  d: 2, c: 'application', t: [2],
}));
