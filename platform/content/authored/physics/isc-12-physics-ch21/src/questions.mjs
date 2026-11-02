// ISC 12 Physics ch21 Semiconductor Electronics — question bank part 1 (t01 energy bands, t02 intrinsic and extrinsic
// semiconductors, t03 the p-n junction diode), ISC style. Constants as stated in the stems: hc = 1240 eV nm, e = 1.6 × 10⁻¹⁹ C,
// forward drops 0.7 V (silicon) and 0.3 V (germanium) in the diode-circuit items. Numbers computed here and re-solved
// independently (wavelengths from h, c and e; circuits from a Kirchhoff loop with a conduction test; fields from V/d).
// Energy bands are examined qualitatively only (ISC): band-gap items use photon energies, not band theory.
import { mk, add, r, dec, sci, near } from '../../isc-12-physics-ch01/src/lib.mjs';
import { HC, GAPS, VSI, VGE, QE, cutoff, photonEv, seriesI } from './svgs.mjs';

const { mcq, ar, tf, fill, match, num, short, long } = mk;
const HCTXT = '(hc = 1240 eV nm)';

/** Independent photon energy (eV) of a wavelength in nm from h, c and e. */
const photonEvHCE = (nm) => (6.626e-34 * 2.998e8) / (nm * 1e-9) / 1.602e-19;
/** Independent series-loop solution: unknown current from the loop equation with a conduction test for each diode. */
function loop(E, R, forwardDrops) {
  const drop = forwardDrops.reduce((a, b) => a + b, 0);
  return E > drop ? (E - drop) / R : 0;
}

// ================================================================ t01 energy bands in solids
add('bands-mcq', mcq({
  stem: 'When N identical atoms are brought together to form a crystal, each sharp energy level of an isolated atom becomes a band of N closely spaced levels. This happens because',
  right: 'the electrons of neighbouring atoms interact, and no two electrons may occupy the same state',
  wrong: ['the nuclei of the atoms are displaced from their positions by the lattice vibrations', 'each atom gives up all its electrons to the other atoms of the crystal', 'the temperature of the crystal rises as the atoms come closer together'],
  sol: 'In the crystal the outer electrons of neighbouring atoms influence one another, and the exclusion principle does not allow N electrons to share one state, so each atomic level spreads into N slightly different levels that form a band — option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
add('clear-mcq', mcq({
  stem: 'Visible photons carry between about 1.8 eV (red) and 3.1 eV (violet). A pure crystal whose forbidden gap is 5.5 eV will therefore',
  right: 'be transparent and colourless, because no visible photon has enough energy to lift an electron across the gap',
  wrong: ['look black, because it absorbs every visible photon', 'conduct well at room temperature, because visible light excites its electrons', 'absorb only the violet end of the spectrum and look yellowish'],
  sol: r`Photon energy is $\dfrac{1240}{\lambda}$ eV: 700 nm gives ${dec(photonEv(700), 3)} eV and 400 nm gives ${dec(photonEv(400), 3)} eV, both below 5.5 eV. No visible photon can raise an electron from the full valence band to the empty conduction band, so the light passes through unabsorbed — option (@K).`,
  d: 3, c: 'analysis', t: [1],
}), () => photonEv(700) < 5.5 && photonEv(400) < 5.5 && near(photonEv(400), 3.1, 0.01) || 'clear');
const GEL = [1064, 1550, 2000];
add('gedetect-mcq', mcq({
  stem: 'A germanium detector (forbidden gap 0.7 eV) is illuminated in turn by infrared lasers of wavelength 1064 nm, 1550 nm and 2000 nm, each of the same power. Using hc = 1240 eV nm, the radiation that can lift electrons across the gap is',
  right: '1064 nm and 1550 nm only',
  wrong: ['1064 nm only', 'all three wavelengths', '1550 nm and 2000 nm only'],
  sol: r`Photon energy $\dfrac{1240}{\lambda}$: ${GEL.map((l) => `${l} nm → ${dec(photonEv(l), 3)} eV`).join('; ')}. A photon must carry at least 0.7 eV, so 1064 nm and 1550 nm work but 2000 nm (0.62 eV) does not — option (@K).`,
  d: 3, c: 'analysis', t: [1],
}), () => GEL.map((l) => photonEvHCE(l) >= 0.7).join() === 'true,true,false' || 'gedetect');
add('temp-mcq', mcq({
  stem: 'A thin wafer of pure silicon is warmed from 300 K to 350 K. Its electrical resistance',
  right: 'falls, because more electrons are lifted across the gap and more electron–hole pairs are formed',
  wrong: ['rises, because the lattice vibrations scatter the carriers more, as in a metal', 'does not change, because the forbidden gap of silicon has a fixed value', 'rises, because electrons are removed from the conduction band by the heat'],
  sol: 'In a pure semiconductor heating creates many more free electrons and holes, and this increase of the number of carriers far outweighs the extra scattering by the lattice, so the resistance falls (a negative temperature coefficient) — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('gegap-tf', tf({
  stem: 'Germanium has a larger forbidden gap than silicon, so it takes more energy to release an electron from a bond in germanium than in silicon.',
  key: 'f',
  sol: 'False. The gap of germanium (about 0.7 eV) is smaller than that of silicon (about 1.1 eV), so less energy is needed to free an electron in germanium.',
  d: 1, c: 'understanding', t: [1],
}), () => GAPS.ge < GAPS.si || 'gegap');
add('gap-fill', fill({
  stem: 'The band of energies lying between the top of the valence band and the bottom of the conduction band, in which a perfect crystal has no electron states, is called the forbidden ___.',
  acc: [['gap', 'energy gap', 'band gap']],
  sol: 'The **forbidden gap** (energy gap, band gap) Eg.',
  d: 1, c: 'understanding', t: [1],
}));
add('si-ar', ar({
  a: 'Pure silicon is almost an insulator at very low temperatures, but it conducts slightly at room temperature.',
  r: 'At room temperature thermal energy lifts a few electrons from the valence band across the 1.1 eV gap into the conduction band.',
  key: 'a',
  sol: 'Both are true, and R explains A: near 0 K the valence band is full and the conduction band empty, so there is no conduction; at room temperature a few thermally excited electrons (and the holes they leave) can carry a small current — option (a).',
  d: 2, c: 'understanding', t: [1],
}));
const sw = { Eg: GAPS.si };
sw.lam = cutoff(sw.Eg);
add('siwave-num', num({
  stem: `Silicon has a forbidden gap of 1.1 eV. Find the longest wavelength of light that can lift an electron across this gap, in nm, to 3 significant figures. ${HCTXT}`,
  value: Number(dec(sw.lam, 3)), tol: 5, unit: 'nm',
  sol: r`$\lambda_{max} = \dfrac{hc}{E_g} = \dfrac{1240}{1.1} = ${dec(sw.lam, 4)}$ nm $\approx ${dec(sw.lam, 3)}$ nm, in the infrared.`,
  scheme: [['λ = hc/Eg = 1240/1.1', 1], ['λ = 1.13 × 10³ nm (1130 nm, infrared)', 1]],
  marks: 2, d: 2, c: 'application', t: [1],
}), (q) => near(photonEvHCE(q.answer.value) , 1.1, 0.01) || `siwave ${sw.lam}`);
const dm = { Eg: GAPS.diamond };
dm.lam = cutoff(dm.Eg);
add('diamond-num', num({
  stem: `The forbidden gap of diamond is 5.5 eV. What is the longest wavelength, in nm, that can lift an electron across the gap (3 significant figures)? ${HCTXT}`,
  value: Number(dec(dm.lam, 3)), tol: 2, unit: 'nm',
  sol: r`$\lambda_{max} = \dfrac{1240}{5.5} = ${dec(dm.lam, 3)}$ nm, in the ultraviolet (below 400 nm): visible light is not absorbed.`,
  scheme: [['λ = 1240/5.5 = 225 nm', 1]],
  d: 2, c: 'application', t: [1],
}), (q) => near(photonEvHCE(q.answer.value), 5.5, 0.01) && q.answer.value < 400 || `diamond ${dm.lam}`);
add('diamond-short2', short({
  marks: 2,
  stem: 'Thermal energy at room temperature is only about 0.026 eV. Explain, in terms of the forbidden gap, why silicon (gap 1.1 eV) still conducts slightly at room temperature while diamond (gap 5.5 eV) is an excellent insulator.',
  model: 'Electrons gain energies spread around the thermal value, and a few in the high-energy tail have enough to cross a gap. The number that do so falls extremely fast as the gap grows. For the 1.1 eV gap of silicon enough electrons cross to give a small conductivity; for the 5.5 eV gap of diamond practically none do, so its conduction band stays empty.',
  sol: 'Number of electrons promoted falls extremely fast with the gap.',
  scheme: [['A few electrons gain enough energy to cross a gap; the number falls very rapidly with the gap', 1], ['Si: enough electrons cross; diamond: practically none, so it is an insulator', 1]],
  d: 3, c: 'analysis', t: [1], wl: null,
}));
add('bands-short3', short({
  marks: 3,
  stem: 'With the help of simple energy-band diagrams, distinguish between a conductor, an insulator and a semiconductor.',
  model: '**Conductor:** the valence and conduction bands overlap (or the conduction band is part-filled), so there is no gap and many electrons are free at all temperatures. **Insulator:** the valence band is full and the conduction band empty, separated by a large gap (more than about 3 eV, 5.5 eV for diamond), so no electron can reach the conduction band at room temperature. **Semiconductor:** the same arrangement but with a small gap (0.7 eV for Ge, 1.1 eV for Si); it is an insulator at 0 K, but at room temperature a few electrons cross the gap, and the conductivity rises with temperature.',
  sol: 'Overlap / large gap / small gap, with their consequences.',
  scheme: [['Conductor: bands overlap, no gap, free electrons', 1], ['Insulator: full valence band, large gap (> 3 eV), empty conduction band', 1], ['Semiconductor: small gap (Ge 0.7 eV, Si 1.1 eV); some electrons cross at room temperature', 1]],
  d: 2, c: 'understanding', t: [1], wl: null,
}));

// ================================================================ t02 intrinsic and extrinsic semiconductors
add('donor-mcq', mcq({
  stem: 'A very small amount of which element, added to pure silicon, makes it an n-type semiconductor?',
  right: 'Antimony, which has five valence electrons',
  wrong: ['Aluminium, which has three valence electrons', 'Gallium, which has three valence electrons', 'Carbon, which has four valence electrons'],
  sol: 'An n-type semiconductor needs a pentavalent (group 15) donor: four of its five valence electrons fill the bonds with neighbouring silicon atoms and the fifth is almost free. Aluminium and gallium are trivalent and give p-type material — option (@K).',
  d: 1, c: 'understanding', t: [2],
}));
add('holeconduct-mcq', mcq({
  stem: 'When a battery is connected across a bar of p-type silicon, the current is carried mainly by',
  right: 'holes, as bonding electrons hop into neighbouring vacancies, so the vacancy drifts along the field',
  wrong: ['free electrons drifting through the acceptor atoms', 'the positive acceptor ions moving along the field', 'positive silicon ions moving towards the negative terminal'],
  sol: 'In p-type silicon the majority carriers are holes. A bonding electron jumps into a nearby vacancy under the field, so the vacancy appears to move in the direction of the field, like a positive charge. The ions stay fixed in the lattice — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('neutral-mcq', mcq({
  stem: 'A bar of n-type silicon is made by doping pure silicon with phosphorus. Which statement about its overall electric charge is correct?',
  right: 'It is electrically neutral, because each free electron is balanced by the fixed positive phosphorus ion it left behind',
  wrong: ['It is negatively charged, because its majority carriers are electrons', 'It is positively charged, because phosphorus nuclei have more protons than silicon', 'Its charge is proportional to the number of free electrons per cubic metre'],
  sol: 'Phosphorus atoms are neutral. When one gives up its extra electron it becomes a fixed positive ion, so for every free electron there is a fixed positive charge: the bar as a whole stays neutral — option (@K).',
  d: 2, c: 'analysis', t: [2],
}));
add('minority-mcq', mcq({
  stem: 'A sample of p-type silicon is warmed by 40 K. Which statement about its carriers is most nearly correct?',
  right: 'The number of minority electrons rises steeply, while the number of majority holes, fixed by the acceptors, hardly changes',
  wrong: ['The numbers of holes and electrons both double', 'The number of holes falls as the number of electrons rises, keeping the total constant', 'Only the majority holes are affected, because the electrons are bound to their atoms'],
  sol: 'The holes of p-type silicon come mostly from the acceptors, which are already ionised at room temperature, so their number is nearly fixed. Heating breaks more bonds and creates electron–hole pairs, which adds mainly to the (very few) minority electrons, whose number grows rapidly — option (@K).',
  d: 3, c: 'analysis', t: [2],
}));
add('hole-tf', tf({
  stem: 'A hole is a real positively charged particle, like a proton, that could be taken out of the crystal and studied on its own.',
  key: 'f',
  sol: 'False. A hole is a vacancy in a covalent bond. It behaves as a carrier of charge +e inside the crystal, but it exists only as the absence of an electron and cannot be removed from the lattice.',
  d: 1, c: 'understanding', t: [2],
}));
add('acceptor-fill', fill({
  stem: 'An indium atom has three valence electrons. When it takes the place of a silicon atom, one bond is left short of an electron, so indium is called an ___ impurity.',
  acc: [['acceptor']],
  sol: 'An **acceptor** impurity: it accepts an electron from a neighbouring bond, creating a hole, and becomes a fixed negative ion.',
  d: 1, c: 'understanding', t: [2],
}));
add('ntype-ar', ar({
  a: 'A bar of n-type silicon carries a net negative charge.',
  r: 'The majority carriers in n-type silicon are electrons.',
  key: 'd',
  sol: 'A is false: each free electron is balanced by a fixed positive donor ion, so the bar is neutral. R is true: electrons are the majority carriers — option (d).',
  d: 2, c: 'understanding', t: [2],
}));
add('carriers-match', match({
  stem: 'Match each semiconductor sample in Column A with the statement that describes it in Column B.',
  pairs: [
    ['Silicon doped with antimony', 'The majority carriers are electrons'],
    ['Silicon doped with indium', 'The majority carriers are holes'],
    ['Pure germanium at room temperature', 'Electrons and holes are present in equal numbers'],
    ['The antimony atoms in the first sample', 'Donors that become fixed positive ions'],
  ],
  order: [1, 2, 0, 3],
  sol: 'Antimony (pentavalent) gives n-type: electrons are the majority carriers (1 → q); indium (trivalent) gives p-type: holes (2 → r); pure germanium is intrinsic: equal numbers (3 → p); the antimony atoms are donors that become fixed positive ions (4 → s).',
  d: 2, c: 'understanding', t: [2],
}));
const dp = { N: 5.0e28, frac: 1e-7 };
dp.n = dp.N * dp.frac;
add('dopant-num', num({
  stem: 'Silicon has 5.0 × 10²⁸ atoms per cubic metre. If one atom in every 10⁷ is replaced by a phosphorus atom that donates one free electron, how many free electrons per cubic metre does the doping add? Give the answer in units of 10²¹ m⁻³.',
  value: Number(dec(dp.n / 1e21, 2)), tol: 0, unit: '× 10²¹ m⁻³',
  sol: r`Donor atoms per m³ $= 5.0 \times 10^{28} \times 10^{-7} = ${sci(dp.n, 2)}$; each gives one electron, so the doping adds $${sci(dp.n, 2)}$ free electrons per m³. In units of $10^{21}$ m⁻³: $n = ${dec(dp.n / 1e21, 2)}$.`,
  scheme: [['n = 5.0 × 10²⁸ × 10⁻⁷ = 5.0 × 10²¹ m⁻³', 1]],
  d: 2, c: 'application', t: [2],
}), (q) => near(q.answer.value * 1e21, 5.0e28 / 1e7, 1e-9) || 'dopant');
const sg = { n: 5.0e21, mu: 0.135 };
sg.sigma = sg.n * QE * sg.mu;
sg.rho = 1 / sg.sigma;
add('sigma-num', num({
  stem: 'An n-type silicon bar has 5.0 × 10²¹ free electrons per cubic metre; the hole contribution can be ignored. The electron mobility is 0.135 m² V⁻¹ s⁻¹. Find the resistivity of the bar, in units of 10⁻³ Ω m, to 2 significant figures. (σ = n e μ, e = 1.6 × 10⁻¹⁹ C)',
  value: Number(dec(sg.rho * 1000, 2)), tol: 0.2, unit: '× 10⁻³ Ω m',
  sol: r`$\sigma = n e \mu = 5.0 \times 10^{21} \times 1.6 \times 10^{-19} \times 0.135 = ${dec(sg.sigma, 3)}$ S m⁻¹, so $\rho = \dfrac{1}{\sigma} = ${sci(sg.rho, 2)}$ Ω m. In units of $10^{-3}$ Ω m: $\rho = ${dec(sg.rho * 1000, 2)}$.`,
  scheme: [['σ = n e μ = 108 S m⁻¹', 1], ['ρ = 1/σ = 9.3 × 10⁻³ Ω m', 1]],
  marks: 2, d: 3, c: 'application', t: [2],
}), (q) => near(1 / (q.answer.value * 1e-3 * 5.0e21 * 1.6e-19), 0.135, 0.02) || `sigma ${sg.rho}`);
const ni = { n: 1.5e16, mue: 0.135, muh: 0.048, nd: 5.0e21 };
ni.si = ni.n * QE * (ni.mue + ni.muh);
ni.sd = ni.nd * QE * ni.mue;
ni.ratio = ni.sd / ni.si;
add('ratio-num', num({
  stem: 'In intrinsic silicon at 300 K the electron and hole densities are each 1.5 × 10¹⁶ per cubic metre, with mobilities 0.135 and 0.048 m² V⁻¹ s⁻¹ respectively. By what factor does the conductivity rise when the silicon is doped n-type to 5.0 × 10²¹ electrons per cubic metre (electron mobility 0.135 m² V⁻¹ s⁻¹, hole contribution then negligible)? Give the factor in units of 10⁵, to 2 significant figures. (e = 1.6 × 10⁻¹⁹ C)',
  value: Number(dec(ni.ratio / 1e5, 2)), tol: 0.06, unit: '× 10⁵',
  sol: r`Intrinsic: $\sigma_i = n_i e(\mu_e + \mu_h) = 1.5 \times 10^{16} \times 1.6 \times 10^{-19} \times 0.183 = ${sci(ni.si, 3)}$ S m⁻¹. Doped: $\sigma = n e \mu_e = 5.0 \times 10^{21} \times 1.6 \times 10^{-19} \times 0.135 = ${dec(ni.sd, 3)}$ S m⁻¹. Ratio $= ${sci(ni.ratio, 2)}$, about a quarter of a million times: one impurity atom in 10⁷ transforms the conductivity. In units of $10^{5}$: factor $= ${dec(ni.ratio / 1e5, 2)}$.`,
  scheme: [['σ_i = n_i e (μe + μh) = 4.39 × 10⁻⁴ S m⁻¹', 1], ['σ_doped = n e μe = 108 S m⁻¹; ratio = 2.5 × 10⁵', 1]],
  marks: 2, d: 4, c: 'analysis', t: [2],
}), (q) => near(q.answer.value * 1e5, 5.0e21 * 0.135 / (1.5e16 * (0.135 + 0.048)), 0.03) || `ratio ${ni.ratio}`);
add('ntype-short2', short({
  marks: 2,
  stem: 'Describe how an n-type semiconductor is made from pure silicon, naming a suitable impurity, and state its majority and minority carriers.',
  model: 'A very small amount of a pentavalent impurity, such as phosphorus or arsenic, is added to molten silicon (doping). Each impurity atom replaces a silicon atom, uses four of its five valence electrons in bonds and gives the fifth as a free electron. The majority carriers are electrons; the minority carriers are holes.',
  sol: 'Pentavalent donor; electrons majority, holes minority.',
  scheme: [['Pentavalent impurity (P, As or Sb) replaces silicon atoms; its fifth electron is free', 1], ['Majority: electrons; minority: holes', 1]],
  d: 1, c: 'understanding', t: [2], wl: null,
}));
add('evalp-short2', short({
  marks: 2,
  stem: 'A student says: “A p-type crystal must be positively charged, because its majority carriers are holes and holes are positive.” Evaluate this statement.',
  model: 'The statement is wrong. The crystal is made of neutral atoms. When a trivalent acceptor atom captures an electron it becomes a fixed negative ion, and that creates one mobile hole. The negative ions balance the positive holes, so the p-type crystal as a whole is electrically neutral.',
  sol: 'Holes are balanced by the fixed negative acceptor ions: neutral overall.',
  scheme: [['Statement is wrong: the crystal is neutral', 1], ['Each hole is balanced by a fixed negative acceptor ion', 1]],
  d: 3, c: 'evaluation', t: [2], wl: null,
}));
add('ptype-short3', short({
  marks: 3,
  stem: 'Explain, using the covalent-bond picture, how a p-type semiconductor is obtained from pure silicon. Say why the crystal remains neutral and name the majority carriers.',
  model: 'A trivalent impurity such as boron or indium replaces a few silicon atoms. It has only three valence electrons, so one of its four bonds with neighbouring silicon atoms is short of an electron: a **hole**. A neighbouring bonding electron can fill it, so the hole moves through the crystal. The impurity atom becomes a fixed negative ion, which balances the positive hole, so the crystal stays neutral. The majority carriers are holes.',
  sol: 'Trivalent acceptor, one bond short, hole; neutral; holes majority.',
  scheme: [['Trivalent impurity leaves one bond short of an electron: a hole', 1], ['Acceptor becomes a fixed negative ion, balancing the hole: crystal neutral', 1], ['Majority carriers are holes', 1]],
  d: 2, c: 'understanding', t: [2], wl: null,
}));

// ================================================================ t03 the p-n junction diode
add('depletion-mcq', mcq({
  stem: 'The depletion region of an unbiased p-n junction is a thin layer that contains',
  right: 'fixed negative ions on its p side and fixed positive ions on its n side, with practically no mobile carriers',
  wrong: ['equal numbers of free electrons and holes, recombining continuously', 'free electrons on the p side and free holes on the n side only', 'a large number of mobile ions that move across the junction under the built-in field'],
  sol: 'Electrons diffuse from the n side and holes from the p side, and recombine near the junction. That uncovers fixed donor ions (positive) on the n side and fixed acceptor ions (negative) on the p side, a layer with almost no mobile carriers — option (@K).',
  d: 1, c: 'understanding', t: [3],
}));
add('fwd-mcq', mcq({
  stem: 'When a p-n junction diode is forward biased, the height of its potential barrier and the width of its depletion region, respectively,',
  right: 'decrease and decrease',
  wrong: ['increase and increase', 'decrease and increase', 'increase and decrease'],
  sol: 'The applied voltage opposes the built-in potential difference, so the barrier falls from V₀ to V₀ − V; a smaller barrier needs fewer uncovered ions, so the depletion region narrows — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('revcur-mcq', mcq({
  stem: 'At 25 °C a silicon diode carries a reverse current of 3 nA when the reverse voltage is 5 V. At a reverse voltage of 15 V, still well below breakdown, the current will be',
  right: 'about 3 nA, because it is carried by thermally generated minority carriers whose number does not depend on the voltage',
  wrong: ['about 9 nA, because the current is proportional to the voltage', 'about 1 nA, because the depletion region is wider', 'zero, because no current can pass in reverse bias'],
  sol: 'The reverse current is the drift of minority carriers that are generated thermally; once the field is strong enough to sweep them all across, raising the voltage does not increase their number, so the current is nearly constant (the reverse saturation current) — option (@K).',
  d: 3, c: 'analysis', t: [3],
}));
add('bias-mcq', mcq({
  stem: 'In a circuit the p side of a germanium diode is at +1.5 V and its n side is at +1.1 V. The diode starts to conduct at about 0.3 V. Which description is correct?',
  right: 'It conducts, because the p side is 0.4 V above the n side, which exceeds its 0.3 V threshold',
  wrong: ['It does not conduct, because both sides are at positive voltages', 'It does not conduct, because 0.4 V is less than the 0.7 V needed to overcome the barrier', 'It does not conduct, because the p side is at the higher voltage'],
  sol: r`What matters is the difference of voltage between the two sides, not their values. $V_p - V_n = 1.5 - 1.1 = 0.4$ V with the p side higher, so the diode is forward biased by 0.4 V, more than the 0.3 V threshold given for germanium (0.7 V is the figure for silicon) — option (@K).`,
  d: 3, c: 'application', t: [3],
}), () => near(1.5 - 1.1, 0.4, 1e-9) && 0.4 > VGE || 'bias');
add('reverse-tf', tf({
  stem: 'When a p-n junction is reverse biased, its depletion region becomes narrower and the potential barrier becomes lower.',
  key: 'f',
  sol: 'False. In reverse bias the applied voltage adds to the built-in potential difference, so the barrier rises to V₀ + V and the depletion region becomes wider.',
  d: 1, c: 'understanding', t: [3],
}));
add('barrier-fill', fill({
  stem: 'The potential difference that builds up between the n side and the p side of an unbiased junction and stops further net diffusion of the majority carriers is called the ___ potential.',
  acc: [['barrier', 'junction', 'contact']],
  sol: 'The **barrier** potential V₀ (about 0.7 V for silicon, 0.3 V for germanium).',
  d: 1, c: 'understanding', t: [3],
}));
add('revgap-ar', ar({
  a: 'The reverse current of a silicon diode hardly changes when the reverse voltage is raised from 2 V to 10 V.',
  r: 'Silicon has a forbidden gap of 1.1 eV.',
  key: 'b',
  sol: 'Both statements are true, but R does not explain A. The reverse current is nearly constant because it is carried by thermally generated minority carriers that are all swept across at quite a low voltage; the value of the gap is not the reason — option (b).',
  d: 3, c: 'analysis', t: [1, 3],
}));
const fl = { V0: 0.7, w: 0.5e-6 };
fl.E = fl.V0 / fl.w;
add('field-num', num({
  stem: 'A silicon p-n junction has a barrier potential of 0.70 V across a depletion region 0.50 μm wide. Treating the field as uniform, find the electric field in the depletion region, in units of 10⁶ V m⁻¹.',
  value: fl.E / 1e6, tol: 0.02, unit: '× 10⁶ V m⁻¹',
  sol: r`$E = \dfrac{V_0}{d} = \dfrac{0.70}{0.50 \times 10^{-6}} = ${sci(fl.E, 2)}$ V m⁻¹, a very strong field, directed from the n side to the p side. In units of $10^{6}$ V m⁻¹: $E = ${dec(fl.E / 1e6, 2)}$.`,
  scheme: [['E = V₀/d = 0.70/(0.50 × 10⁻⁶)', 1], ['E = 1.4 × 10⁶ V m⁻¹', 1]],
  marks: 2, d: 2, c: 'application', t: [3],
}), (q) => near(q.answer.value * 1e6 * 0.5e-6, 0.7, 0.02) || 'field');
const s1 = { E: 9.0, R: 470 };
s1.I = seriesI(s1.E, s1.R, VSI) * 1000;
add('series1-num', num({
  stem: 'A silicon diode (forward drop 0.7 V) and a 470 Ω resistor are connected in series across a 9.0 V battery, with the diode forward biased. Find the current in the circuit in mA, to 3 significant figures.',
  value: Number(dec(s1.I, 3)), tol: 0.1, unit: 'mA',
  sol: r`The diode drops 0.7 V, so the resistor has $9.0 - 0.7 = 8.3$ V across it: $I = \dfrac{8.3}{470} = ${dec(s1.I / 1000, 3)}$ A $= ${dec(s1.I, 3)}$ mA.`,
  scheme: [['Voltage across R = 9.0 − 0.7 = 8.3 V', 1], ['I = 8.3/470 = 17.7 mA', 1]],
  marks: 2, d: 1, c: 'application', t: [3],
}), (q) => near(loop(9.0, 470, [0.7]) * 1000, q.answer.value, 0.01) || 'series1');
const pr = { E: 12, R1: 330, R2: 220 };
pr.I = seriesI(pr.E, pr.R1, VSI) * 1000;
add('parallel-num', num({
  stem: 'A 12 V battery feeds two parallel branches. Branch 1 is a silicon diode D₁ (forward drop 0.7 V), forward biased, in series with 330 Ω. Branch 2 is a silicon diode D₂, reverse biased, in series with 220 Ω. Taking the reverse current as negligible, find the current drawn from the battery, in mA (3 significant figures).',
  value: Number(dec(pr.I, 3)), tol: 0.2, unit: 'mA',
  sol: r`D₂ is reverse biased and blocks, so branch 2 carries no current. In branch 1: $I = \dfrac{12 - 0.7}{330} = ${dec(pr.I / 1000, 3)}$ A $= ${dec(pr.I, 3)}$ mA. This is the total current.`,
  scheme: [['Branch 2 blocked: no current', 1], ['I = (12 − 0.7)/330 = 34.2 mA', 1]],
  marks: 2, d: 3, c: 'analysis', t: [3],
}), (q) => near(loop(12, 330, [0.7]) * 1000 + loop(12, 220, [Infinity]) * 1000, q.answer.value, 0.01) || 'parallel');
const dr = { dV: 0.73 - 0.70, dI: 10.0e-3 - 4.0e-3 };
dr.r = dr.dV / dr.dI;
add('dynres-num', num({
  stem: 'The forward current of a diode is 4.0 mA at 0.70 V and 10.0 mA at 0.73 V. Find the dynamic (a.c.) resistance of the diode over this range, in ohm.',
  value: Number(dec(dr.r, 2)), tol: 0.1, unit: 'Ω',
  sol: r`$r_d = \dfrac{\Delta V}{\Delta I} = \dfrac{0.73 - 0.70}{(10.0 - 4.0) \times 10^{-3}} = \dfrac{0.03}{6.0 \times 10^{-3}} = ${dec(dr.r, 2)}$ Ω. (The static resistance V/I at 10 mA is about 73 Ω, much larger.)`,
  scheme: [['r = ΔV/ΔI = 0.03 V / 6.0 mA', 1], ['r = 5.0 Ω', 1]],
  marks: 2, d: 2, c: 'application', t: [3],
}), (q) => near(0.03 / 0.006, q.answer.value, 0.01) || 'dynres');
const gs = { E: 5.0, R: 400 };
gs.I = seriesI(gs.E, gs.R, VGE + VSI) * 1000;
add('gese-num', num({
  stem: 'A germanium diode (forward drop 0.3 V) and a silicon diode (forward drop 0.7 V) are connected in series, both forward biased, with a 400 Ω resistor and a 5.0 V battery. Find the current in mA.',
  value: gs.I, tol: 0.1, unit: 'mA',
  sol: r`The two diodes together drop $0.3 + 0.7 = 1.0$ V, leaving $5.0 - 1.0 = 4.0$ V across the resistor: $I = \dfrac{4.0}{400} = 0.010$ A $= ${dec(gs.I, 3)}$ mA.`,
  scheme: [['Total diode drop 1.0 V; voltage across R = 4.0 V', 1], ['I = 4.0/400 = 10 mA', 1]],
  marks: 2, d: 2, c: 'application', t: [3],
}), (q) => near(loop(5.0, 400, [0.3, 0.7]) * 1000, q.answer.value, 0.01) || 'gese');
add('barrier-short2', short({
  marks: 2,
  stem: 'Explain how the potential barrier arises across a p-n junction.',
  model: 'Electrons diffuse from the n side to the p side and holes from the p side to the n side, and they recombine near the junction. This leaves positive donor ions on the n side and negative acceptor ions on the p side. These ions set up an electric field and so a potential difference V₀ across the junction, which opposes further diffusion; this is the potential barrier.',
  sol: 'Diffusion and recombination uncover fixed ions: they create a field and a potential difference V₀.',
  scheme: [['Diffusion and recombination leave fixed positive and negative ions near the junction', 1], ['These ions give a field and potential difference V₀ that opposes further diffusion', 1]],
  d: 2, c: 'understanding', t: [3], wl: null,
}));
add('revwhy-short2', short({
  marks: 2,
  stem: 'A reverse-biased silicon diode carries only a few nanoamperes, and this hardly changes when the reverse voltage is doubled. Explain both observations.',
  model: 'In reverse bias the barrier is higher, so the majority carriers cannot cross, and the current is carried only by the very few minority carriers (thermally generated electrons on the p side and holes on the n side), which the field sweeps across the junction. Their number depends on temperature and not on the voltage, so once they are all swept across, doubling the voltage leaves the current almost unchanged.',
  sol: 'Only minority carriers; their number is fixed by temperature.',
  scheme: [['Current is only that of minority carriers, which are very few', 1], ['Their number is set by temperature, not by the voltage, so the current is nearly constant', 1]],
  d: 3, c: 'analysis', t: [3], wl: null,
}));
add('junction-short3', short({
  marks: 3,
  stem: 'Describe how the depletion region and the potential barrier are formed when a p-type and an n-type semiconductor are joined, and state the direction of the built-in electric field.',
  model: 'Electrons diffuse from the n side into the p side and holes diffuse the other way, because of the difference of concentrations. They recombine near the junction, leaving a thin layer of fixed positive donor ions on the n side and fixed negative acceptor ions on the p side with no mobile carriers: the **depletion region**. The ions produce a built-in field directed from the n side to the p side and a potential barrier V₀ that stops further diffusion.',
  sol: 'Diffusion, recombination, fixed ions, field from n to p, barrier.',
  scheme: [['Diffusion of electrons and holes across the junction, and recombination', 1], ['Layer of fixed ions with no mobile carriers: the depletion region', 1], ['Built-in field from n side to p side and barrier V₀', 1]],
  d: 2, c: 'understanding', t: [3], wl: null,
}));
add('vichar-short3', short({
  marks: 3,
  stem: 'Describe the forward and reverse V–I characteristics of a silicon p-n junction diode, stating what the knee voltage is and why the reverse current is small.',
  model: '**Forward:** the current is negligible until the applied voltage nearly cancels the barrier; beyond the **knee voltage** (about 0.7 V for silicon, 0.3 V for germanium) it rises very rapidly (exponentially), so the diode drops about 0.7 V while it conducts. **Reverse:** only a tiny current (nanoamperes for silicon) flows, nearly independent of the voltage, because it is carried by minority carriers, until breakdown occurs at a large reverse voltage.',
  sol: 'Forward: knee then steep rise; reverse: tiny constant minority-carrier current.',
  scheme: [['Forward: negligible current up to the knee voltage (about 0.7 V for Si), then a rapid rise', 1], ['Reverse: very small, almost constant current, carried by minority carriers', 1], ['Breakdown at a large reverse voltage; knee voltage defined as the forward voltage at which the current rises sharply', 1]],
  d: 2, c: 'understanding', t: [3], wl: null,
}));
const dl = { E: 5.2, R: 330 };
dl.I = seriesI(dl.E, dl.R, VSI) * 1000;
add('diode-long', long({
  stem: `(a) Explain how the depletion region and the potential barrier are formed in a p-n junction. [2] (b) State and explain what happens to the width of the depletion region and the height of the barrier in (i) forward bias and (ii) reverse bias. [2] (c) A silicon diode (forward drop 0.7 V) is connected in series with a 330 Ω resistor across a 5.2 V battery so that it is forward biased. Find the current. [1]`,
  model: r`(a) Electrons diffuse from the n side to the p side and holes the other way, and recombine near the junction. This leaves fixed positive ions on the n side and fixed negative ions on the p side with no mobile carriers: the depletion region. The ions give a field (n to p) and a barrier V₀ that stops further diffusion.

(b) (i) In forward bias the applied voltage opposes V₀: the barrier falls to V₀ − V and the depletion region narrows, so majority carriers cross easily and a large current flows. (ii) In reverse bias the applied voltage adds to V₀: the barrier rises to V₀ + V and the region widens, so only a tiny minority-carrier current flows.

(c) $I = \dfrac{5.2 - 0.7}{330} = ${dec(dl.I / 1000, 3)}$ A $= ${dec(dl.I, 3)}$ mA.`,
  sol: 'Formation of the barrier; effect of bias; I = (E − 0.7)/R.',
  scheme: [['Diffusion, recombination and fixed ions form the depletion region', 1], ['Field and barrier V₀ stop further diffusion', 1], ['Forward bias: barrier falls, region narrows, large current', 1], ['Reverse bias: barrier rises, region widens, tiny current', 1], ['I = (5.2 − 0.7)/330 = 13.6 mA', 1]],
  d: 3, c: 'application', t: [3], wl: null,
}), () => near(loop(5.2, 330, [0.7]) * 1000, 13.636, 0.001) || 'diodelong');
const vc = { V1: 0.71, V2: 0.74, I1: 5.0e-3, I2: 13.0e-3 };
vc.r = (vc.V2 - vc.V1) / (vc.I2 - vc.I1);
add('vi-long', long({
  stem: '(a) Draw the circuit with which the forward and reverse V–I characteristics of a p-n junction diode can be plotted, naming the meters and how the diode is connected in each case. [2] (b) Sketch the characteristic and mark the knee voltage and the reverse saturation current. [2] (c) In a forward-bias test the current rises from 5.0 mA to 13.0 mA as the voltage rises from 0.71 V to 0.74 V. Find the dynamic resistance of the diode. [1]',
  model: r`(a) A battery feeds a potentiometer (rheostat) used as a voltage divider; the diode is connected across the variable output through a series protective resistor. For forward bias the diode's p side is joined to the positive side, with a voltmeter across the diode and a milliammeter in series. For reverse bias the connections to the diode are reversed and a microammeter replaces the milliammeter (the voltmeter is placed across the diode).

(b) (Described in words.) Forward: the current is almost zero up to the knee at about 0.7 V (Si), then rises very steeply. Reverse: a tiny, nearly constant current (the reverse saturation current, nA to μA) until breakdown at a large reverse voltage.

(c) $r_d = \dfrac{\Delta V}{\Delta I} = \dfrac{0.74 - 0.71}{(13.0 - 5.0) \times 10^{-3}} = \dfrac{0.03}{8.0 \times 10^{-3}} = ${dec(vc.r, 3)}$ Ω.`,
  sol: 'Circuit and meters; curve with knee and I_s; r_d = ΔV/ΔI.',
  scheme: [['Voltage-divider circuit with the diode and a series resistor', 1], ['Forward: milliammeter, p side to +; reverse: connections reversed with a microammeter', 1], ['Forward curve: negligible until the knee (about 0.7 V), then steep', 1], ['Reverse curve: tiny, almost constant current up to breakdown', 1], ['r = 0.03/(8.0 × 10⁻³) = 3.75 Ω', 1]],
  d: 3, c: 'application', t: [3], wl: null,
}), () => near(vc.r, 3.75, 1e-9) || 'vilong');
