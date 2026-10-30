// ch14 Semiconductor Electronics — question bank. Numbers are computed here and re-checked by `check` functions.
// Silicon diode drop taken as 0.7 V when conducting. AR keys planned: a a a b d c.
import { mk, add, r, sci, dec, near } from '../../cbse-12-physics-ch01/src/lib.mjs';
import { HC } from './decks.mjs';

const { mcq, ar, tf, fill, match, num, short, long, part } = mk;

// ================================================================ t01 energy bands
add('gap-mcq', mcq({
  stem: 'Which statement about band gaps is correct?',
  right: 'Insulators have the largest band gap and conductors have none (their bands overlap)',
  wrong: ['Conductors have the largest band gap', 'Semiconductors have a larger band gap than insulators', 'All three have the same band gap but different numbers of electrons'],
  sol: 'Conductor: bands overlap; semiconductor: about 1 eV; insulator: more than about 3 eV — option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
add('cb-fill', fill({
  stem: 'In a solid, the energy band in which electrons are free to move through the crystal and carry current is called the ___ band.',
  acc: [['conduction']],
  sol: 'The **conduction** band.',
  d: 1, c: 'recall', t: [1],
}));
add('heat-mcq', mcq({
  stem: 'A piece of pure germanium is warmed from 20 °C to 60 °C. Its electrical resistance',
  right: 'decreases, because more electrons are excited across the band gap',
  wrong: ['increases, because the atoms vibrate more', 'stays the same, because germanium is pure', 'becomes zero'],
  sol: 'In a semiconductor the number of carriers rises steeply with temperature, outweighing the extra collisions — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
const gaas = HC / 1.42;
add('gaas-num', num({
  stem: 'Gallium arsenide has a band gap of 1.42 eV. Find the longest wavelength of light that can create an electron–hole pair in it, in nm (3 significant figures). (hc = 1243 eV nm.)',
  value: Number(dec(gaas, 3)), tol: 2, unit: 'nm',
  sol: r`$\lambda_\text{max} = \dfrac{hc}{E_g} = \dfrac{1243}{1.42} \approx ${dec(gaas, 3)}$ nm (near infrared).`,
  scheme: [['λ = hc/E_g', 1], ['≈ 875 nm', 1]],
  marks: 2, d: 2, c: 'application', t: [1],
}), (q) => near(gaas, q.answer.value) || 'gaas');
const pd = HC / 1650;
add('detector-num', num({
  stem: 'A photodetector made of a certain semiconductor responds to light of wavelengths up to 1.65 μm but not beyond. Estimate its band gap, in eV (3 significant figures). (hc = 1243 eV nm.)',
  value: Number(dec(pd, 3)), tol: 0.01, unit: 'eV',
  sol: r`$E_g = \dfrac{hc}{\lambda_\text{max}} = \dfrac{1243}{1650} \approx ${dec(pd, 3)}$ eV.`,
  scheme: [['E_g = hc/λ_max with λ in nm', 1], ['≈ 0.753 eV', 1]],
  marks: 2, d: 3, c: 'application', t: [1],
}), (q) => near(pd, q.answer.value) || 'pd');
add('overlap-tf', tf({
  stem: 'In an insulator, the valence band and the conduction band overlap.',
  key: 'f',
  sol: 'False. Overlapping bands are characteristic of conductors; insulators have a large band gap (over about 3 eV).',
  d: 1, c: 'understanding', t: [1],
}));
add('bands-short', short({
  marks: 2,
  stem: 'Distinguish between conductors, semiconductors and insulators on the basis of energy bands.',
  model: 'In **conductors** the valence and conduction bands **overlap**, so many electrons are free to conduct. In **semiconductors** a **small** band gap (about 1 eV) separates them, so a few electrons cross at room temperature. In **insulators** the gap is **large** (over about 3 eV), so practically no electrons reach the conduction band.',
  sol: 'Overlap, small gap, large gap.',
  scheme: [['Conductor: overlap; semiconductor: small gap', 1], ['Insulator: large gap', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('diamond-ar', ar({
  a: 'Diamond is transparent to visible light.',
  r: 'The band gap of diamond (about 5.4 eV) is larger than the energy of any visible photon (at most about 3.1 eV).',
  key: 'a',
  sol: 'Both true, and R explains A: visible photons cannot lift electrons across the gap, so they are not absorbed — option (a).',
  d: 3, c: 'understanding', t: [1],
}), () => (HC / 400 < 5.4) || 'dia');
add('solarmat-mcq', mcq({
  stem: 'For a solar cell that must absorb most of the visible spectrum (400–700 nm), which of these materials is most suitable?',
  right: 'Silicon (band gap 1.1 eV)',
  wrong: ['Diamond (band gap 5.4 eV)', 'Zinc sulphide (band gap 3.6 eV)', 'Copper (no band gap)'],
  sol: 'Visible photons have 1.8–3.1 eV, more than 1.1 eV, so silicon absorbs them all; diamond and ZnS gaps are too large, and copper cannot separate charges — option (@K).',
  d: 2, c: 'application', t: [1],
}), () => (HC / 700 > 1.1 && HC / 400 < 3.6) || 'sol');
add('temp-short', short({
  marks: 2,
  stem: 'Why does the resistance of a semiconductor decrease on heating, while that of a metal increases?',
  model: 'In a **metal** the number of free electrons is **fixed**; heating makes the ions vibrate more, increasing **collisions**, so resistance **rises**. In a **semiconductor**, heating excites **many more** electrons across the small band gap (creating electrons and holes); this large rise in the **number of carriers** outweighs the extra collisions, so resistance **falls**.',
  sol: 'Collisions vs carrier number.',
  scheme: [['Metal: fixed carriers, more collisions', 1], ['Semiconductor: many more carriers outweigh collisions', 1]],
  d: 3, c: 'understanding', t: [1],
}));

// ================================================================ t02 intrinsic and extrinsic semiconductors
add('indium-mcq', mcq({
  stem: 'Pure germanium is doped with a small amount of indium (a group 13, trivalent element). The result is',
  right: 'a p-type semiconductor with holes as majority carriers',
  wrong: ['an n-type semiconductor with electrons as majority carriers', 'a p-type semiconductor with electrons as majority carriers', 'an intrinsic semiconductor'],
  sol: 'A trivalent acceptor leaves a hole in a bond: p-type, holes in the majority — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('neutral-ar', ar({
  a: 'An n-type semiconductor is electrically neutral.',
  r: 'The extra free electrons in it are balanced by an equal number of fixed positive donor ions.',
  key: 'a',
  sol: 'Both true, and R explains A: each donor that gives up an electron becomes a fixed positive ion — option (a).',
  d: 2, c: 'understanding', t: [2],
}));
add('hole-fill', fill({
  stem: 'The vacancy left in a covalent bond when an electron is freed, which behaves as a positive charge carrier, is called a ___.',
  acc: [['hole']],
  sol: 'A **hole**.',
  d: 1, c: 'recall', t: [2],
}));
add('donor-mcq', mcq({
  stem: 'A pentavalent impurity such as phosphorus added to silicon is called',
  right: 'a donor, because it supplies a free electron',
  wrong: ['an acceptor, because it accepts an electron', 'a donor, because it supplies a hole', 'an acceptor, because it supplies a free electron'],
  sol: 'Its fifth valence electron is almost free, so it donates an electron — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
const mn = { NA: 1e21, ni: 1.5e16 };
mn.n = mn.ni ** 2 / mn.NA;
add('minority-num', num({
  stem: 'Silicon (nᵢ = 1.5 × 10¹⁶ m⁻³) is doped with 1.0 × 10²¹ acceptor atoms per m³. Find the density of electrons, in units of 10¹¹ m⁻³ (3 significant figures).',
  value: Number(dec(mn.n / 1e11, 3)), tol: 0.02, unit: '× 10¹¹ m⁻³',
  sol: r`$n_h \approx N_A = 1.0 \times 10^{21}$ m$^{-3}$; $n_e = \dfrac{n_i^2}{n_h} = \dfrac{(1.5 \times 10^{16})^2}{1.0 \times 10^{21}} = ${sci(mn.n, 3)}$ m$^{-3}$, i.e. $\dfrac{${sci(mn.n, 3)}}{10^{11}} = ${dec(mn.n / 1e11, 3)}$.`,
  scheme: [['n_h ≈ N_A; n_e n_h = n_i²', 1], ['n_e ≈ 2.25 × 10¹¹ m⁻³', 1]],
  marks: 2, d: 2, c: 'application', t: [2],
}), (q) => near(mn.n / 1e11, q.answer.value) || 'mn');
const nf = { ne: 5e20, nh: 8e11 };
nf.ni = Math.sqrt(nf.ne * nf.nh);
add('ni-num', num({
  stem: 'In a doped semiconductor at room temperature, the electron density is 5.0 × 10²⁰ m⁻³ and the hole density is 8.0 × 10¹¹ m⁻³. Find the intrinsic carrier density, in units of 10¹⁶ m⁻³. Is the material n-type or p-type?',
  value: Number(dec(nf.ni / 1e16, 2)), tol: 0.02, unit: '× 10¹⁶ m⁻³',
  sol: r`$n_i = \sqrt{n_e n_h} = \sqrt{5.0 \times 10^{20} \times 8.0 \times 10^{11}} = \sqrt{4.0 \times 10^{32}} = ${sci(nf.ni, 2)}$ m$^{-3}$, i.e. $\dfrac{${sci(nf.ni, 2)}}{10^{16}} = ${dec(nf.ni / 1e16, 2)}$. Electrons are the majority: n-type.`,
  scheme: [['n_i = √(n_e n_h) = 2.0 × 10¹⁶ m⁻³', 1], ['n-type', 1]],
  marks: 2, d: 3, c: 'application', t: [2],
}), (q) => near(nf.ni, 2e16) && near(q.answer.value, 2) || 'nf');
const rr = { k: 1000 };
rr.ratio = rr.k / (1 / rr.k);
add('ratio-num', num({
  stem: 'A semiconductor is doped so that its electron density is 1000 times its intrinsic carrier density. By what factor does the electron density now exceed the hole density?',
  value: rr.ratio, tol: 1e4, unit: '',
  sol: r`$n_e = 1000n_i$ and $n_h = \dfrac{n_i^2}{n_e} = \dfrac{n_i}{1000}$, so $\dfrac{n_e}{n_h} = \dfrac{1000n_i}{n_i/1000} = 10^{6} = ${rr.ratio}$.`,
  scheme: [['n_h = n_i/1000 from n_e n_h = n_i²', 1], ['Ratio 10⁶', 1]],
  marks: 2, d: 4, c: 'analysis', t: [2],
}), (q) => near(rr.ratio, 1e6) && near(q.answer.value, 1e6) || 'rr');
add('intrinsic-tf', tf({
  stem: 'In an intrinsic semiconductor, the number of free electrons equals the number of holes.',
  key: 't',
  sol: 'True. Each broken bond creates one free electron and one hole, so n_e = n_h = n_i.',
  d: 1, c: 'recall', t: [2],
}));
add('ptype-short', short({
  marks: 2,
  stem: 'Explain, with a labelled sketch (described in words), how a p-type semiconductor is formed from silicon.',
  model: 'A small amount of a **trivalent** impurity (boron, aluminium or indium) replaces some silicon atoms. Each impurity atom forms **three** covalent bonds with its neighbours; the **fourth** bond lacks an electron, leaving a **hole**. Electrons from neighbouring bonds can fill it, so the hole moves: holes become the **majority** carriers.',
  sol: 'Trivalent dopant, missing bond = hole.',
  scheme: [['Trivalent dopant forms three bonds', 1], ['Missing electron = hole; holes majority', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('np-short3', short({
  marks: 3,
  stem: 'Give three differences between n-type and p-type semiconductors.',
  model: '(1) **Dopant:** n-type uses a **pentavalent** donor (P, As, Sb); p-type a **trivalent** acceptor (B, Al, In). (2) **Majority carriers:** **electrons** in n-type, **holes** in p-type (the other carrier is the minority). (3) **Fixed ions:** **positive** donor ions in n-type, **negative** acceptor ions in p-type. (Both are electrically neutral.)',
  sol: 'Dopant, majority carriers, fixed ions.',
  scheme: [['Dopant valency', 1], ['Majority carriers', 1], ['Fixed ions (or donor/acceptor levels)', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('abundant-ar', ar({
  a: 'Adding one arsenic atom per million silicon atoms increases the conductivity of silicon enormously.',
  r: 'Silicon is the second most abundant element in the Earth’s crust.',
  key: 'b',
  sol: 'Both true, but R has nothing to do with A; A is explained by each arsenic atom supplying a free electron, far outnumbering the intrinsic carriers — option (b).',
  d: 2, c: 'understanding', t: [2],
}));
add('holedrift-mcq', mcq({
  stem: 'When an electric field is applied across a semiconductor, the holes',
  right: 'drift in the direction of the field, opposite to the electrons',
  wrong: ['drift opposite to the field, like the electrons', 'stay still, since only electrons move', 'move at right angles to the field'],
  sol: 'Holes act as positive charges, so they move along E; electrons move against E; both add to the current — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));

// ================================================================ t03 p-n junction
add('depletion-mcq', mcq({
  stem: 'The depletion layer of a p-n junction contains',
  right: 'only fixed (immobile) ions and no mobile charge carriers',
  wrong: ['only free electrons', 'only holes', 'equal numbers of free electrons and holes'],
  sol: 'Mobile carriers have diffused and recombined; what remains are fixed donor and acceptor ions — option (@K).',
  d: 1, c: 'understanding', t: [3],
}));
add('reverse-ar', ar({
  a: 'Below breakdown, the reverse current of a p-n junction diode is very small and almost independent of the reverse voltage.',
  r: 'The reverse current is carried by minority carriers, whose number is small and set by temperature, not by the applied voltage.',
  key: 'a',
  sol: 'Both true, and R explains A: once all available minority carriers are swept across, a larger voltage cannot increase the current — option (a).',
  d: 3, c: 'understanding', t: [3],
}));
add('forward-mcq', mcq({
  stem: 'When a p-n junction is forward biased, the barrier potential and the width of the depletion layer',
  right: 'both decrease',
  wrong: ['both increase', 'the barrier increases and the width decreases', 'both stay the same'],
  sol: 'The applied voltage opposes the junction field, lowering the barrier and narrowing the depletion layer — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('field-mcq', mcq({
  stem: 'In the depletion layer of an unbiased p-n junction, the electric field points',
  right: 'from the n-side to the p-side',
  wrong: ['from the p-side to the n-side', 'along the junction plane', 'nowhere: there is no field'],
  sol: 'Positive donor ions on the n-side and negative acceptor ions on the p-side give a field from n to p — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
const sr = (6 - 0.7) / 500;
add('series-num', num({
  stem: 'A silicon diode (0.7 V drop when conducting) is forward biased in series with a 500 Ω resistor across a 6.0 V battery. Find the current, in mA (3 significant figures).',
  value: Number(dec(sr * 1000, 3)), tol: 0.1, unit: 'mA',
  sol: r`$I = \dfrac{6.0 - 0.7}{500} = \dfrac{5.3}{500} = ${sci(sr, 3)}$ A, i.e. $${sci(sr, 3)} \times 10^{3} = ${dec(sr * 1000, 3)}$ mA.`,
  scheme: [['Voltage across R = 5.3 V', 1], ['I = 10.6 mA', 1]],
  marks: 2, d: 2, c: 'application', t: [3],
}), (q) => near(sr * 1000, q.answer.value) || 'sr');
const rd = 0.06 / 0.008;
add('rd-num', num({
  stem: 'In the forward characteristic of a diode, the current rises from 4.0 mA at 0.66 V to 12.0 mA at 0.72 V. Find the dynamic resistance in this range, in ohms.',
  value: rd, tol: 0.1, unit: 'Ω',
  sol: r`$r_d = \dfrac{\Delta V}{\Delta I} = \dfrac{0.72 - 0.66}{(12.0 - 4.0) \times 10^{-3}} = \dfrac{0.06}{0.008} = ${dec(rd, 2)}$ Ω.`,
  scheme: [['r_d = ΔV/ΔI with ΔI in A', 1], ['7.5 Ω', 1]],
  marks: 2, d: 2, c: 'application', t: [3],
}), (q) => near(rd, 7.5) && near(q.answer.value, 7.5) || 'rd');
const tw = (3.0 - 1.4) / 220;
add('twodiode-num', num({
  stem: 'Two silicon diodes (0.7 V each when conducting) are connected in series, both forward biased, with a 220 Ω resistor across a 3.0 V battery. Find the current, in mA (3 significant figures).',
  value: Number(dec(tw * 1000, 3)), tol: 0.1, unit: 'mA',
  sol: r`Voltage across the resistor $= 3.0 - 2 \times 0.7 = 1.6$ V; $I = \dfrac{1.6}{220} \approx ${sci(tw, 3)}$ A, i.e. $${sci(tw, 3)} \times 10^{3} = ${dec(tw * 1000, 3)}$ mA.`,
  scheme: [['Two drops: 1.4 V, leaving 1.6 V', 1], ['I ≈ 7.27 mA', 1]],
  marks: 2, d: 3, c: 'application', t: [3],
}), (q) => near(tw * 1000, q.answer.value) || 'tw');
add('lamps-mcq', mcq({
  stem: 'A 6 V battery has its positive terminal at P. Two branches are connected across it in parallel: branch 1 has a diode with its anode towards P in series with lamp L₁; branch 2 has a diode with its cathode towards P in series with lamp L₂. Which lamp(s) light?',
  right: 'Only L₁',
  wrong: ['Only L₂', 'Both L₁ and L₂', 'Neither'],
  sol: 'The diode in branch 1 has its anode at the positive side, so it is forward biased and conducts; the diode in branch 2 is reverse biased and blocks — option (@K).',
  d: 3, c: 'analysis', t: [3],
}));
add('knee-tf', tf({
  stem: 'The knee (threshold) voltage of a germanium diode is larger than that of a silicon diode.',
  key: 'f',
  sol: 'False. Germanium ≈ 0.3 V, silicon ≈ 0.7 V; germanium’s smaller band gap gives a lower barrier.',
  d: 1, c: 'recall', t: [3],
}));
add('formation-short3', short({
  marks: 3,
  stem: 'Explain how the depletion layer and the barrier potential are formed at a p-n junction.',
  model: 'Electrons are the majority on the n-side and holes on the p-side, so electrons **diffuse** into the p-side and holes into the n-side, where they **recombine**. This leaves a thin region near the junction with **no mobile carriers** but with fixed **negative** acceptor ions on the p-side and **positive** donor ions on the n-side: the **depletion layer**. These ions create an electric field from n to p and a **potential barrier** that opposes further diffusion; equilibrium is reached when the **drift** of minority carriers balances the **diffusion**.',
  sol: 'Diffusion, recombination, fixed ions, field, equilibrium.',
  scheme: [['Diffusion and recombination of majority carriers', 1], ['Fixed ions form depletion layer', 1], ['Field/barrier opposes diffusion; drift balances diffusion', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('width-short', short({
  marks: 2,
  stem: 'How does the width of the depletion layer change when a p-n junction is (a) forward biased, (b) reverse biased? Give reasons.',
  model: '(a) **Forward bias** (p to +): the applied field **opposes** the junction field, so majority carriers are pushed **towards** the junction, neutralising some ions: the layer **narrows**. (b) **Reverse bias** (p to −): the applied field **adds** to the junction field, pulling majority carriers **away** from the junction and exposing more ions: the layer **widens**.',
  sol: 'Opposes vs adds to the junction field.',
  scheme: [['Forward: narrows (field opposed)', 1], ['Reverse: widens (field reinforced)', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('char-short3', short({
  marks: 3,
  stem: 'Sketch (describe) the I–V characteristic of a silicon p-n junction diode and explain its shape in forward and reverse bias.',
  model: '**Forward:** almost **no current** until about 0.6 V; beyond the **knee (≈ 0.7 V)** the current rises **steeply** (mA), because the external voltage has overcome the barrier and majority carriers cross freely. **Reverse:** a **tiny, nearly constant** current (μA) due to **minority carriers** (reverse saturation current); at the **breakdown voltage** it rises sharply. The graph is **not linear**: the diode is non-ohmic. (Forward and reverse current axes use different scales.)',
  sol: 'Knee, saturation, breakdown.',
  scheme: [['Forward: knee ≈ 0.7 V, steep rise', 1], ['Reverse: tiny saturation current of minority carriers', 1], ['Breakdown; non-linear, different scales', 1]],
  d: 3, c: 'understanding', t: [3],
}));
add('nonohmic-mcq', mcq({
  stem: 'A p-n junction diode is described as a non-ohmic device because',
  right: 'its current is not proportional to the voltage across it',
  wrong: ['it has no resistance', 'it obeys Ohm’s law only in reverse bias', 'its resistance is the same in both directions'],
  sol: 'The I–V graph is curved and very different in the two directions, so V/I is not constant — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));

// ================================================================ t04 rectifiers
add('fwfreq-mcq', mcq({
  stem: 'The input to a full-wave rectifier is a 50 Hz alternating voltage. The frequency of the pulses in the output is',
  right: '100 Hz',
  wrong: ['50 Hz', '25 Hz', '200 Hz'],
  sol: 'A full-wave rectifier gives one output pulse in each half-cycle: 2 × 50 = 100 Hz — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('hwfreq-num', num({
  stem: 'A half-wave rectifier is fed with a 60 Hz alternating voltage. What is the frequency of the output pulses, in Hz?',
  value: 60, tol: 0.5, unit: 'Hz',
  sol: r`One pulse per cycle of the input, so the output frequency $= 60$ Hz.`,
  scheme: [['Same as input: 60 Hz', 1]],
  d: 1, c: 'understanding', t: [4],
}));
const pk = 9 * Math.SQRT2 - 0.7;
add('peak-num', num({
  stem: 'A transformer gives 9.0 V rms to a half-wave rectifier with a silicon diode (0.7 V drop). Find the peak voltage across the load, in volts (3 significant figures).',
  value: Number(dec(pk, 3)), tol: 0.1, unit: 'V',
  sol: r`$V_0 = \sqrt{2} \times 9.0 \approx ${dec(9 * Math.SQRT2, 3)}$ V; peak across the load $= ${dec(9 * Math.SQRT2, 3)} - 0.7 = ${dec(pk, 3)}$ V.`,
  scheme: [['V₀ = √2 × 9.0 ≈ 12.7 V', 1], ['Minus 0.7 V ≈ 12.0 V', 1]],
  marks: 2, d: 2, c: 'application', t: [4],
}), (q) => near(pk, q.answer.value) || 'pk');
add('ndiodes-mcq', mcq({
  stem: 'How many diodes are used in a full-wave rectifier with a centre-tapped transformer?',
  right: 'Two',
  wrong: ['One', 'Three', 'Four'],
  sol: 'One diode for each half of the centre-tapped secondary — option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('rect-fill', fill({
  stem: 'The process of converting alternating current into direct current is called ___.',
  acc: [['rectification']],
  sol: '**Rectification**, done by diodes, which conduct in one direction only.',
  d: 1, c: 'recall', t: [4],
}));
add('halfwave-short', short({
  marks: 2,
  stem: 'Explain the working of a half-wave rectifier, with the help of its circuit (described in words).',
  model: 'A transformer secondary is connected through a **diode** to a **load resistor**. When the diode is **forward biased**, current flows through the load; in the next half-cycle it is **reverse biased** and **no current** flows. The output is a series of **one-directional pulses**, one per input cycle.',
  sol: 'Conducts in one half-cycle only.',
  scheme: [['Circuit: transformer, diode, load', 1], ['Conduction only in forward-biased half-cycles', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('filter-short', short({
  marks: 2,
  stem: 'Why is a capacitor connected across the load of a rectifier, and how does it work?',
  model: 'The rectifier output is **pulsating** DC. A large **capacitor** across the load **charges** to nearly the peak voltage during each pulse and then **discharges** slowly through the load while the pulse falls. It fills in the gaps, so the output becomes a **nearly steady** DC voltage with a small ripple.',
  sol: 'Charges at peaks, discharges in gaps.',
  scheme: [['Output is pulsating', 1], ['Capacitor charges at peaks and supplies current between them: smoother DC', 1]],
  d: 3, c: 'understanding', t: [4],
}));
add('fullvhalf-mcq', mcq({
  stem: 'Compared with a half-wave rectifier, a full-wave rectifier',
  right: 'uses both halves of the input cycle and gives an output that is easier to smooth',
  wrong: ['uses only one half of the input cycle', 'gives output pulses at half the input frequency', 'needs no transformer or diodes'],
  sol: 'Both half-cycles drive current through the load in the same direction, doubling the pulse frequency and making filtering easier — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('openD2-mcq', mcq({
  stem: 'In a centre-tap full-wave rectifier working on 50 Hz mains, diode D₂ burns out and becomes an open circuit. The output across the load now',
  right: 'becomes half-wave, with pulses at 50 Hz',
  wrong: ['stays full-wave at 100 Hz', 'becomes zero', 'becomes steady DC'],
  sol: 'Only D₁ can conduct, in alternate half-cycles, so the circuit acts as a half-wave rectifier: one pulse per cycle, 50 Hz — option (@K).',
  d: 4, c: 'analysis', t: [4],
}));
add('steady-ar', ar({
  a: 'Without a filter, the output of a full-wave rectifier is a steady DC voltage.',
  r: 'In a full-wave rectifier, current flows through the load in both half-cycles of the input.',
  key: 'd',
  sol: 'R is true. A is false: the output still rises and falls in pulses (pulsating DC); a filter capacitor is needed to smooth it — option (d).',
  d: 2, c: 'understanding', t: [4],
}));
const mains = 230 * Math.SQRT2;
add('mainspeak-num', num({
  stem: 'Find the peak value of 230 V rms mains voltage, in volts (3 significant figures).',
  value: Number(dec(mains, 3)), tol: 1, unit: 'V',
  sol: r`$V_0 = \sqrt{2}V_\text{rms} = 1.414 \times 230 \approx ${dec(mains, 3)}$ V.`,
  scheme: [['V₀ = √2 × 230 ≈ 325 V', 1]],
  d: 1, c: 'understanding', t: [4],
}), (q) => near(mains, q.answer.value) || 'mains');

// ================================================================ long answers (5 marks)
const bl = { si: HC / 1.1, c: HC / 5.4 };
add('bands-long', long({
  stem: '(a) Explain how energy bands are formed in a solid. (b) With band diagrams (described in words), distinguish between conductors, semiconductors and insulators. (c) The band gaps of silicon and diamond are 1.1 eV and 5.4 eV. Find the longest wavelength each can absorb by exciting electrons across the gap, and use your answers to explain why diamond is transparent while silicon is opaque to visible light. (hc = 1243 eV nm.)',
  model: r`(a) In an isolated atom electrons occupy sharp energy levels. In a crystal, about $10^{28}$ atoms per m³ are so close that their outer levels interact and split into very many closely spaced levels: **bands**. The valence electrons fill the **valence band**; the next band is the **conduction band**; between them is the **band gap**.

(b) Conductor: bands overlap. Semiconductor: small gap (≈ 1 eV), so a few electrons are excited at room temperature. Insulator: large gap (> 3 eV), practically no electrons in the conduction band.

(c) Si: $\lambda_\text{max} = \dfrac{1243}{1.1} \approx ${dec(bl.si, 4)}$ nm; diamond: $\dfrac{1243}{5.4} \approx ${dec(bl.c, 3)}$ nm. Visible light (400–700 nm) has wavelengths shorter than 1130 nm, so silicon absorbs it (opaque); but longer than 230 nm, so diamond cannot absorb it (transparent).`,
  sol: 'Bands from interacting levels; three diagrams; λ = hc/E_g.',
  scheme: [['Formation of bands', 1], ['Conductor and semiconductor diagrams', 1], ['Insulator diagram', 1], ['λ ≈ 1130 nm and ≈ 230 nm', 1], ['Transparency explained', 1]],
  d: 3, c: 'understanding', t: [1], wl: null,
}), () => near(bl.si, 1130) && near(bl.c, 230.2) || `bl ${bl.si} ${bl.c}`);
const dl = { nSi: 5e28, frac: 1e-7, ni: 1.5e16 };
dl.ND = dl.nSi * dl.frac;
dl.nh = dl.ni ** 2 / dl.ND;
add('doping-long', long({
  stem: '(a) What is an intrinsic semiconductor? Explain how electrons and holes are produced in it. (b) Explain, with lattice diagrams (described in words), how n-type and p-type semiconductors are made. (c) Silicon has 5.0 × 10²⁸ atoms m⁻³ and nᵢ = 1.5 × 10¹⁶ m⁻³. It is doped with phosphorus at 1 atom per 10⁷ silicon atoms. Find the densities of electrons and holes, and state the type of semiconductor.',
  model: r`(a) A pure semiconductor (Si, Ge). Thermal energy breaks some covalent bonds: each freed electron leaves a hole, so $n_e = n_h = n_i$.

(b) **n-type:** a pentavalent atom (P, As) uses four electrons in bonds; the fifth is loosely bound and becomes free: donor, electrons in the majority. **p-type:** a trivalent atom (B, Al, In) forms three bonds; the missing electron is a hole: acceptor, holes in the majority. Both remain neutral.

(c) $N_D = \dfrac{5.0 \times 10^{28}}{10^{7}} = ${sci(dl.ND, 2)}$ m$^{-3}$, so $n_e \approx ${sci(dl.ND, 2)}$ m$^{-3}$. $n_h = \dfrac{n_i^2}{n_e} = \dfrac{(1.5 \times 10^{16})^2}{${sci(dl.ND, 2)}} = ${sci(dl.nh, 2)}$ m$^{-3}$. Phosphorus is pentavalent: **n-type**.`,
  sol: 'Intrinsic; doping; mass-action law.',
  scheme: [['Intrinsic semiconductor and pair generation', 1], ['n-type formation', 1], ['p-type formation', 1], ['n_e ≈ 5.0 × 10²¹ m⁻³', 1], ['n_h ≈ 4.5 × 10¹⁰ m⁻³, n-type', 1]],
  d: 3, c: 'application', t: [2], wl: null,
}), () => near(dl.ND, 5e21) && near(dl.nh, 4.5e10) || 'dl');
add('junction-long', long({
  stem: '(a) Explain the formation of the depletion layer and the barrier potential in a p-n junction. (b) Draw (describe) circuits to obtain the forward and reverse characteristics of a p-n junction diode. (c) Sketch (describe) the characteristics and explain the shape of each part. (d) What is meant by the knee voltage and the breakdown voltage?',
  model: '(a) Electrons diffuse from n to p and holes from p to n and recombine, leaving fixed negative acceptor ions on the p-side and positive donor ions on the n-side: the depletion layer. Their field (n → p) gives a barrier potential (≈ 0.7 V for Si) that stops further net diffusion.\n\n(b) Forward: battery with a potential divider, p-side to +, a voltmeter across the diode and a **milliammeter** in series. Reverse: battery reversed (p to −), voltmeter across the diode and a **microammeter** in series.\n\n(c) Forward: almost no current up to about 0.6 V, then a steep rise after the knee, since the barrier is overcome. Reverse: a tiny, nearly constant current of minority carriers, independent of voltage, until breakdown.\n\n(d) **Knee voltage:** the forward voltage beyond which current rises sharply (≈ 0.7 V Si, 0.3 V Ge). **Breakdown voltage:** the reverse voltage at which the reverse current suddenly increases.',
  sol: 'Formation; circuits; characteristics; definitions.',
  scheme: [['Depletion layer and barrier', 1], ['Forward and reverse circuits (mA, μA meters)', 1], ['Forward characteristic explained', 1], ['Reverse characteristic explained', 1], ['Knee and breakdown voltages', 1]],
  d: 3, c: 'understanding', t: [3], wl: null,
}));
const rl = { Vrms: 15, f: 50 };
rl.Vp = rl.Vrms * Math.SQRT2;
rl.Vout = rl.Vp - 0.7;
add('rectifier-long', long({
  stem: '(a) What is rectification? (b) Draw (describe) the circuit of a full-wave rectifier using a centre-tapped transformer and explain its working. (c) Sketch (describe) the input and output waveforms. (d) Each half of the secondary gives 15 V rms at 50 Hz. Find the peak voltage across the load (silicon diodes) and the frequency of the output pulses.',
  model: r`(a) Conversion of alternating current into direct (one-directional) current.

(b) The secondary of a transformer has a centre tap, which is connected to one end of the load resistor. The two ends A and B are connected through diodes D₁ and D₂ to the other end of the load. When A is positive, D₁ is forward biased and conducts while D₂ is reverse biased; when B is positive, D₂ conducts. In both half-cycles the current flows through the load in the **same direction**.

(c) Input: a sine wave. Output: positive humps in **every** half-cycle (like $|\sin\omega t|$).

(d) $V_0 = \sqrt{2} \times 15 \approx ${dec(rl.Vp, 3)}$ V; peak across the load $\approx ${dec(rl.Vp, 3)} - 0.7 \approx ${dec(rl.Vout, 3)}$ V. Output pulse frequency $= 2 \times 50 = 100$ Hz.`,
  sol: 'Definition; centre-tap working; waveforms; numbers.',
  scheme: [['Definition', 1], ['Circuit described', 1], ['Working: alternate diodes, same direction', 1], ['Waveforms', 1], ['≈ 20.5 V peak, 100 Hz', 1]],
  d: 3, c: 'application', t: [4], wl: null,
}), () => near(rl.Vout, 20.5) || `rl ${rl.Vout}`);
const dc = { E: 9, R: 1500, n: 2 };
dc.I = (dc.E - dc.n * 0.7) / dc.R;
add('circuits-long', long({
  stem: 'Answer using silicon diodes (0.7 V drop when conducting). (a) Two diodes in series, both forward biased, are connected with a 1.5 kΩ resistor across a 9.0 V battery. Find the current. (b) What happens if one diode is reversed? (c) A diode’s current rises from 2.0 mA at 0.62 V to 8.0 mA at 0.68 V. Find its dynamic resistance, and explain why it is not the same as V/I. (d) A designer needs current to flow through a load in both half-cycles of an AC supply. Should she use a half-wave or a full-wave rectifier? Give one reason.',
  model: r`(a) $V_R = 9.0 - 2 \times 0.7 = 7.6$ V; $I = \dfrac{7.6}{1500} \approx ${sci(dc.I, 3)}$ A $\approx ${dec(dc.I * 1000, 3)}$ mA.

(b) The reversed diode is reverse biased and blocks: only a tiny reverse saturation current (μA or less) flows; the current is practically zero.

(c) $r_d = \dfrac{0.68 - 0.62}{(8.0 - 2.0) \times 10^{-3}} = \dfrac{0.06}{0.006} = 10$ Ω. The I–V curve is not a straight line through the origin, so the slope $\Delta V/\Delta I$ at a point differs from $V/I$ (for example $0.68/0.008 = 85$ Ω).

(d) A **full-wave** rectifier: it conducts through the load in both half-cycles (output pulses at 2f), making better use of the input and giving an output that is easier to smooth.`,
  sol: 'Series drops; reverse blocks; slope vs ratio; full-wave.',
  scheme: [['I ≈ 5.07 mA', 1], ['Reversed: practically no current', 1], ['r_d = 10 Ω', 1], ['Why r_d ≠ V/I', 1], ['Full-wave with reason', 1]],
  d: 4, c: 'analysis', t: [3, 4], wl: null,
}), () => near(dc.I, 5.07e-3) || `dc ${dc.I}`);

// ================================================================ case-based (4 marks: 1 + 1 + 2)
const ch = { Vrms: 9 };
ch.Vp = ch.Vrms * Math.SQRT2;
add('charger-case', mk.case({
  passage: 'A mobile-phone charger bought in Delhi works from 230 V, 50 Hz mains. Inside, a small transformer steps the voltage down to 9 V rms on each half of a centre-tapped secondary; two silicon diodes form a full-wave rectifier; a large capacitor smooths the output; and a regulator circuit then holds it at a steady 5 V.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'The diodes are needed in the charger because they',
      right: 'let current through in one direction only, turning AC into pulsating DC',
      wrong: ['step the voltage down from 230 V', 'store charge to smooth the output', 'increase the frequency of the mains'],
      sol: 'Diodes rectify; the transformer steps down; the capacitor smooths — option (@K).',
      d: 1, c: 'understanding', t: [4],
    })),
    part('b', num({
      stem: 'Find the peak voltage of the 9 V rms supply on each half of the secondary, in volts (3 significant figures).',
      value: Number(dec(ch.Vp, 3)), tol: 0.1, unit: 'V',
      sol: r`$V_0 = \sqrt{2} \times 9.0 \approx ${dec(ch.Vp, 3)}$ V.`,
      scheme: [['V₀ ≈ 12.7 V', 1]],
      d: 2, c: 'application', t: [4],
    })),
    part('c', short({
      marks: 2,
      stem: 'Explain why the large capacitor is needed before the regulator.',
      model: 'The full-wave output is **pulsating**: it rises to a peak and falls to zero 100 times a second. The capacitor **charges** at each peak and **discharges** slowly through the circuit in between, keeping the voltage **high and nearly steady**, so the regulator can always supply a steady 5 V.',
      sol: 'Smoothing the pulses.',
      scheme: [['Rectified output pulsates (100 Hz)', 1], ['Capacitor charges at peaks, supplies between: nearly steady', 1]],
      d: 2, c: 'understanding', t: [4],
    }), [
      short({
        marks: 2,
        stem: 'A cheaper design uses a single diode (half-wave) instead of the full-wave circuit. Evaluate this change.',
        model: 'It would still give DC, but it is **worse**. A half-wave rectifier uses only **one half** of each cycle, so the gaps between pulses are **twice as long** (50 Hz instead of 100 Hz). The capacitor must supply current for longer, so the **ripple is larger** (or a bigger capacitor is needed), and less power is delivered from the transformer.',
        sol: 'Longer gaps, more ripple.',
        scheme: [['Half-wave: 50 Hz pulses, longer gaps', 1], ['More ripple / bigger capacitor; poorer design', 1]],
        d: 3, c: 'evaluation', t: [4],
      }),
    ]),
  ],
}), (q) => near(ch.Vp, 12.73) && near(q.children[1].answer.value, 12.7) || `ch ${ch.Vp}`);

const sc = { gap: 1.1 };
sc.lam = HC / sc.gap;
add('rooftop-case', mk.case({
  passage: 'Silicon solar panels on a school rooftop in Pune convert sunlight into electricity. A photon can free an electron in silicon (creating an electron–hole pair) only if its energy is at least the band gap, 1.1 eV. Sunlight contains ultraviolet, visible and infrared radiation.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'Which radiation from the Sun can create electron–hole pairs in silicon?',
      right: 'Ultraviolet, visible and near-infrared radiation of wavelength below about 1130 nm',
      wrong: ['Only ultraviolet radiation', 'Only infrared radiation', 'Only radiation of wavelength above 1130 nm'],
      sol: 'Any photon with hν ≥ 1.1 eV, i.e. λ ≤ hc/E_g ≈ 1130 nm, can create a pair — option (@K).',
      d: 2, c: 'understanding', t: [1],
    })),
    part('b', num({
      stem: 'Find the longest wavelength that can create an electron–hole pair in silicon, in nm (3 significant figures). (hc = 1243 eV nm.)',
      value: Number(dec(sc.lam, 3)), tol: 3, unit: 'nm',
      sol: r`$\lambda_\text{max} = \dfrac{1243}{1.1} \approx ${dec(sc.lam, 3)}$ nm.`,
      scheme: [['λ ≈ 1130 nm', 1]],
      d: 2, c: 'application', t: [1],
    })),
    part('c', short({
      marks: 2,
      stem: 'Explain why silicon is a better material for these solar panels than diamond (band gap 5.4 eV).',
      model: 'Diamond’s gap of 5.4 eV means only photons of wavelength below about **230 nm** (far ultraviolet) can create pairs, and very little such light reaches the ground. Silicon’s gap of 1.1 eV lets **all visible** and much near-infrared sunlight create pairs, so it can use **most** of the Sun’s energy.',
      sol: 'Compare usable wavelength ranges.',
      scheme: [['Diamond: only λ < 230 nm, little reaches the ground', 1], ['Silicon absorbs visible and near IR: more energy used', 1]],
      d: 3, c: 'analysis', t: [1], wl: null,
    }), [
      short({
        marks: 2,
        stem: 'A student says that very bright infrared light of wavelength 1500 nm would make the panels produce more current. Evaluate this claim.',
        model: 'The claim is **wrong**. A 1500 nm photon has only $1243/1500 \\approx 0.83$ eV, **less than** the 1.1 eV band gap, so it **cannot** create an electron–hole pair however many photons arrive. Brighter 1500 nm light would mostly just **heat** the panel, which slightly lowers its performance.',
        sol: 'Photon energy below the gap.',
        scheme: [['0.83 eV < 1.1 eV: no pairs', 1], ['Intensity cannot compensate; claim wrong', 1]],
        d: 3, c: 'evaluation', t: [1],
      }),
    ]),
  ],
}), (q) => near(sc.lam, 1130) && near(q.children[1].answer.value, 1130) || `sc ${sc.lam}`);

const mt = { E: 1.5, R: 100 };
mt.I = (mt.E - 0.7) / mt.R;
add('meter-case', mk.case({
  passage: 'In a Chennai school laboratory, students check a silicon diode with a simple tester: a 1.5 V cell in series with a 100 Ω resistor and a milliammeter. Connected one way round, the meter reads several milliamperes; turned the other way round, the meter reads zero. One student concludes that the diode is faulty because it “only works one way”.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'When the meter reads several milliamperes, the diode is',
      right: 'forward biased, with its p-side connected towards the positive terminal of the cell',
      wrong: ['reverse biased, with its p-side towards the negative terminal', 'forward biased, with its n-side towards the positive terminal', 'broken down'],
      sol: 'A large current flows only in forward bias: p-side to the positive terminal — option (@K).',
      d: 1, c: 'understanding', t: [3],
    })),
    part('b', num({
      stem: 'Estimate the forward current, in mA (taking 0.7 V across the conducting diode).',
      value: Number(dec(mt.I * 1000, 2)), tol: 0.1, unit: 'mA',
      sol: r`$I = \dfrac{1.5 - 0.7}{100} = \dfrac{0.8}{100} = ${sci(mt.I, 2)}$ A, i.e. $${sci(mt.I, 2)} \times 10^{3} = ${dec(mt.I * 1000, 2)}$ mA.`,
      scheme: [['I = 8.0 mA', 1]],
      d: 2, c: 'application', t: [3],
    })),
    part('c', short({
      marks: 2,
      stem: 'Explain why the meter reads zero when the diode is turned round.',
      model: 'Turned round, the diode is **reverse biased**: the cell **raises** the barrier and **widens** the depletion layer, so majority carriers cannot cross. Only the tiny **reverse saturation current** of minority carriers (μA or less for silicon) flows, too small to show on a milliammeter.',
      sol: 'Reverse bias: tiny minority current.',
      scheme: [['Reverse biased: barrier raised, layer widens', 1], ['Only μA minority current: reads zero', 1]],
      d: 2, c: 'understanding', t: [3],
    }), [
      short({
        marks: 2,
        stem: 'Evaluate the student’s conclusion that the diode is faulty.',
        model: 'The conclusion is **wrong**. Conducting in **one direction only** is exactly what a healthy diode should do: low resistance in forward bias, very high resistance in reverse bias. A **faulty** diode would read about the same both ways: zero both ways (open) or a large current both ways (short).',
        sol: 'One-way conduction is normal.',
        scheme: [['One-way conduction is normal diode behaviour', 1], ['A faulty diode reads the same both ways', 1]],
        d: 3, c: 'evaluation', t: [3],
      }),
    ]),
  ],
}), (q) => near(mt.I, 8e-3) && near(q.children[1].answer.value, 8) || `mt ${mt.I}`);

// ================================================================ further items (type and key balance)
add('fullwave-short3', short({
  marks: 3,
  stem: 'Explain how a centre-tap full-wave rectifier makes current flow through the load in the same direction in both half-cycles, and describe its input and output waveforms.',
  model: 'In one half-cycle end A of the centre-tapped secondary is **positive**: diode **D₁** is forward biased and conducts, D₂ is reverse biased, and current flows from D₁ through the load back to the centre tap. In the next half-cycle end B is positive: **D₂** conducts and D₁ blocks, and current again passes through the load in the **same direction**. The input is a sine wave; the output is a train of positive humps, one in **every half-cycle**, so its pulse frequency is **twice** the input frequency.',
  sol: 'Alternate diodes, same direction through the load.',
  scheme: [['D₁ conducts when A is positive', 1], ['D₂ conducts when B is positive; same direction through load', 1], ['Waveforms: humps every half-cycle, frequency 2f', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('knee-ar', ar({
  a: 'A forward-biased silicon diode conducts appreciably only when the applied voltage exceeds about 0.7 V.',
  r: 'Forward bias makes the depletion layer of the diode wider.',
  key: 'c',
  sol: 'A is true: the applied voltage must overcome the barrier potential. R is false: forward bias NARROWS the depletion layer — option (c).',
  d: 2, c: 'understanding', t: [3],
}));

await import('./questions-extra.mjs');
