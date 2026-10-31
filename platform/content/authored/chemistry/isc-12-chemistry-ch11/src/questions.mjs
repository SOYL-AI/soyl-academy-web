// ISC 12 Chemistry ch11 Bonding in Coordination Compounds — question bank (ISC style). Stems name their own
// complexes and data. MCQ keys are placed by the builder; AR keys planned: a c b a d. Numericals re-solved.
import { mk, add, r } from './lib.mjs';

const { mcq, ar, tf, fill, match, num, short, long } = mk;
const near = (a, b, rel = 0.005) => Math.abs(a - b) <= Math.max(1e-9, Math.abs(b) * rel);
const NHC = 6.022e23 * 6.626e-34 * 3.0e8;

// ---------------------------------------------------------------- t01 valence bond theory
add('vbt-mcq', mcq({
  stem: 'Using valence bond theory, the hexaamminechromium(III) ion, [Cr(NH₃)₆]³⁺, is best described as (Cr, Z = 24):',
  right: 'd²sp³ hybridised, octahedral and paramagnetic with three unpaired electrons',
  wrong: ['sp³d² hybridised, octahedral and diamagnetic', 'dsp² hybridised, square planar, with three unpaired electrons', 'sp³ hybridised, tetrahedral and diamagnetic'],
  sol: 'Cr³⁺ is 3d³: two 3d orbitals stay empty for d²sp³; the three electrons remain unpaired — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('magnet-mcq', mcq({
  stem: 'Which of the complexes [Co(NH₃)₆]³⁺, [CoF₆]³⁻, [Fe(H₂O)₆]²⁺ and [NiCl₄]²⁻ is diamagnetic?',
  right: '[Co(NH₃)₆]³⁺',
  wrong: ['[CoF₆]³⁻', '[Fe(H₂O)₆]²⁺', '[NiCl₄]²⁻'],
  sol: 'NH₃ pairs the six 3d electrons of Co³⁺ (d²sp³, no unpaired electrons) — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('limit-mcq', mcq({
  stem: 'Which observation about nickel complexes can NOT be explained by valence bond theory?',
  right: 'The green colour of [Ni(H₂O)₆]²⁺',
  wrong: ['The diamagnetism of [Ni(CN)₄]²⁻', 'The octahedral shape of [Ni(NH₃)₆]²⁺', 'The two unpaired electrons in [NiCl₄]²⁻'],
  sol: 'VBT says nothing about electronic transitions, so it cannot explain colour — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('inner-mcq', mcq({
  stem: 'The hexaaquavanadium(III) ion, [V(H₂O)₆]³⁺ (V, Z = 23), is an inner orbital complex. The hybridisation of vanadium is:',
  right: 'd²sp³',
  wrong: ['sp³d²', 'dsp²', 'sp³'],
  sol: 'V³⁺ is 3d², so two 3d orbitals are empty without any pairing: d²sp³ — option (@K).',
  d: 3, c: 'application', t: [1],
}));
add('zn-mcq', mcq({
  stem: 'The tetraamminezinc(II) ion, [Zn(NH₃)₄]²⁺, is tetrahedral. The hybridisation of zinc in it is:',
  right: 'sp³',
  wrong: ['dsp²', 'd²sp³', 'sp³d²'],
  sol: 'Zn²⁺ is 3d¹⁰: no 3d orbital is free, so 4s and 4p are used — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('ag-mcq', mcq({
  stem: 'The diamminesilver(I) ion, [Ag(NH₃)₂]⁺, is linear. According to valence bond theory, silver uses:',
  right: 'sp hybrid orbitals (one 5s and one 5p)',
  wrong: ['sp³ hybrid orbitals', 'dsp² hybrid orbitals', 'two 4d orbitals'],
  sol: 'Two ligands, linear shape: sp — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('inner-ar', ar({
  a: '[Co(NH₃)₆]³⁺ is an inner orbital complex.',
  r: 'In it Co³⁺ uses two 3d, one 4s and three 4p orbitals for bonding.',
  key: 'a',
  sol: 'Both are true; using inner (n−1)d orbitals is what makes it an inner orbital complex — option (a).',
  d: 2, c: 'understanding', t: [1],
}));
add('ni-ar', ar({
  a: 'The [NiCl₄]²⁻ ion is tetrahedral and paramagnetic.',
  r: 'Chloride is a strong-field ligand that pairs the 3d electrons of Ni²⁺.',
  key: 'c',
  sol: 'A is true. R is false: Cl⁻ is weak-field; because it does not pair the electrons, no 3d orbital is free and sp³ is used — option (c).',
  d: 3, c: 'analysis', t: [1],
}));
add('outer-tf', tf({
  stem: 'Outer orbital octahedral complexes such as [CoF₆]³⁻ use 4d orbitals in sp³d² hybridisation and are usually high spin.',
  key: 't',
  sol: 'True.',
  d: 2, c: 'understanding', t: [1],
}));
add('sp3d2-fill', fill({
  stem: 'The hybridisation of iron in the outer orbital complex [FeF₆]³⁻ is ___.',
  acc: [['sp3d2', 'sp³d²', 'sp^3d^2']],
  sol: '**sp³d²**.',
  d: 2, c: 'application', t: [1],
}));
add('hyb-match', match({
  stem: 'Match each complex ion with its hybridisation and shape.',
  pairs: [
    ['[Ag(NH₃)₂]⁺', 'sp, linear'],
    ['[Zn(NH₃)₄]²⁺', 'sp³, tetrahedral'],
    ['[Pt(NH₃)₄]²⁺', 'dsp², square planar'],
    ['[Cr(H₂O)₆]³⁺', 'd²sp³, octahedral'],
  ],
  order: [3, 1, 0, 2],
  sol: 'Ag: sp linear; Zn: sp³ tetrahedral; Pt: dsp² square planar; Cr: d²sp³ octahedral.',
  d: 2, c: 'application', t: [1],
}));
add('fef6-num', num({
  marks: 2,
  stem: r`Calculate the spin-only magnetic moment, in BM, of the outer orbital complex [FeF₆]³⁻. (Fe, Z = 26)`,
  value: 5.92, tol: 0.02, unit: 'BM',
  sol: r`Fe³⁺ is 3d⁵ with no pairing by F⁻: $n = 5$. $\mu = \sqrt{5 \times 7} = \sqrt{35} \approx 5.92\ \text{BM}$.`,
  scheme: [['n = 5', 1], ['5.92 BM', 1]],
  d: 2, c: 'application', t: [1],
}), () => near(Math.sqrt(35), 5.92, 0.002) || 'mu');
add('ferri-num', num({
  marks: 2,
  stem: r`Potassium ferricyanide, K₃[Fe(CN)₆], has a measured magnetic moment of about $1.73\ \text{BM}$. Find the number of unpaired electrons using the spin-only formula.`,
  value: 1, tol: 0, unit: null,
  sol: r`$n(n+2) = 1.73^2 \approx 3$, so $n^2 + 2n - 3 = 0$ and $n = \dfrac{-2 + \sqrt{4 + 12}}{2} = \dfrac{-2 + 4}{2} = 1$.`,
  scheme: [['n(n+2) = 3', 1], ['n = 1', 1]],
  d: 3, c: 'application', t: [1],
}), () => near((-2 + Math.sqrt(16)) / 2, 1) || 'n');
add('cr-short', short({
  marks: 2,
  stem: 'The trioxalatocobaltate(III) ion, [Co(C₂O₄)₃]³⁻, is diamagnetic, while [CoF₆]³⁻ is paramagnetic. Explain using valence bond theory. (Co, Z = 27)',
  model: 'Co³⁺ is 3d⁶. In [Co(C₂O₄)₃]³⁻ the six d electrons pair into three 3d orbitals, leaving two 3d orbitals for d²sp³ hybridisation: inner orbital, no unpaired electrons, diamagnetic. F⁻ is weak-field: no pairing, four unpaired electrons remain, and 4s, 4p and two 4d orbitals give sp³d²: outer orbital, paramagnetic.',
  sol: 'd²sp³ paired vs sp³d² with 4 unpaired.',
  scheme: [['Oxalate: pairing, d²sp³, diamagnetic', 1], ['Fluoride: no pairing, sp³d², paramagnetic', 1]],
  d: 2, c: 'application', t: [1],
}));
add('pt-short', short({
  marks: 2,
  stem: 'The red precipitate of bis(dimethylglyoximato)nickel(II), formed in the test for nickel, is square planar and diamagnetic. Explain using valence bond theory. (Ni, Z = 28)',
  model: 'Ni²⁺ is 3d⁸ with two unpaired electrons. The strong-field dimethylglyoximate ligands pair these electrons, so one 3d orbital becomes empty. One 3d, one 4s and two 4p orbitals form dsp² hybrid orbitals directed to the corners of a square: square planar, with no unpaired electrons — diamagnetic.',
  sol: 'Pairing; dsp²; square planar; diamagnetic.',
  scheme: [['Pairing frees one 3d orbital', 1], ['dsp², square planar, diamagnetic', 1]],
  d: 3, c: 'application', t: [1, 4],
}));
add('zn-short', short({
  marks: 2,
  stem: 'Explain why [Zn(NH₃)₄]²⁺ is tetrahedral and diamagnetic, and why its solution is colourless.',
  model: 'Zn²⁺ is 3d¹⁰: all 3d orbitals are full, so the four NH₃ lone pairs enter sp³ hybrid orbitals (4s + three 4p): tetrahedral. All electrons are paired, so it is diamagnetic. With a full d subshell no d–d transition is possible, so no visible light is absorbed: colourless.',
  sol: 'd¹⁰; sp³; no d–d transition.',
  scheme: [['sp³ tetrahedral, diamagnetic', 1], ['d¹⁰: no d–d transition', 1]],
  d: 2, c: 'understanding', t: [1, 2],
}));
add('vbt-short3', short({
  marks: 3,
  stem: 'Using valence bond theory, predict the hybridisation, shape and spin-only magnetic moment of (a) [Mn(CN)₆]⁴⁻, (b) [CoCl₄]²⁻ and (c) [Ni(NH₃)₆]²⁺. (Z: Mn 25, Co 27, Ni 28)',
  model: '(a) Mn²⁺, 3d⁵; CN⁻ pairs electrons, leaving one unpaired and two 3d free: d²sp³, octahedral, μ = √3 ≈ 1.73 BM. (b) Co²⁺, 3d⁷; Cl⁻ is weak: sp³, tetrahedral, 3 unpaired, μ = √15 ≈ 3.87 BM. (c) Ni²⁺, 3d⁸; even with pairing only one 3d orbital could be freed, so outer 4d orbitals are used: sp³d², octahedral, 2 unpaired, μ = √8 ≈ 2.83 BM.',
  sol: 'd²sp³ 1.73; sp³ 3.87; sp³d² 2.83.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 3, c: 'application', t: [1],
}));
add('fecn-short3', short({
  marks: 3,
  stem: 'Compare K₃[Fe(CN)₆] and K₄[Fe(CN)₆] using valence bond theory: give the oxidation state and d count of iron, the hybridisation and the number of unpaired electrons in each, and say which is attracted by a magnet.',
  model: 'In K₃[Fe(CN)₆], iron is Fe³⁺, 3d⁵; CN⁻ pairs four electrons, one remains unpaired; d²sp³, octahedral; 1 unpaired electron (≈ 1.73 BM) — paramagnetic, attracted. In K₄[Fe(CN)₆], iron is Fe²⁺, 3d⁶; all paired; d²sp³; 0 unpaired — diamagnetic.',
  sol: 'Fe³⁺ d⁵ 1 unpaired; Fe²⁺ d⁶ 0 unpaired; both d²sp³.',
  scheme: [['Oxidation states and d counts', 1], ['Both d²sp³', 1], ['1 vs 0 unpaired; ferricyanide paramagnetic', 1]],
  d: 3, c: 'analysis', t: [1],
}));

// ---------------------------------------------------------------- t02 crystal field theory
add('spin-mcq', mcq({
  stem: 'Which of the cobalt(III) and iron(II) complexes [CoF₆]³⁻, [Co(NH₃)₆]³⁺, [Fe(CN)₆]⁴⁻ and [Co(CN)₆]³⁻ is high spin?',
  right: '[CoF₆]³⁻',
  wrong: ['[Co(NH₃)₆]³⁺', '[Fe(CN)₆]⁴⁻', '[Co(CN)₆]³⁻'],
  sol: 'F⁻ is weak field (Δo < P): t₂g⁴e_g² — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('colour-mcq', mcq({
  stem: 'When excess ammonia is added to pale blue aqueous copper(II) sulphate, the solution turns deep blue-violet. In crystal field terms:',
  right: 'NH₃ is a stronger-field ligand than H₂O, so Δo increases and shorter-wavelength light is absorbed',
  wrong: ['NH₃ is weaker than H₂O, so Δo decreases', 'copper is oxidised to copper(III)', 'the d electrons of Cu²⁺ become paired'],
  sol: 'Larger splitting shifts the absorption to higher energy, changing the complementary colour — option (@K).',
  d: 3, c: 'analysis', t: [2],
}));
add('eg-mcq', mcq({
  stem: 'In an octahedral crystal field, which d orbitals make up the higher-energy e_g set?',
  right: 'd(x²−y²) and d(z²)',
  wrong: ['d(xy) and d(z²)', 'd(xy), d(yz) and d(xz)', 'd(x²−y²) and d(xy)'],
  sol: 'These two point directly at the ligands on the axes — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('energy-mcq', mcq({
  stem: 'Relative to the average energy (barycentre) of the d orbitals, the t₂g orbitals in an octahedral field lie at:',
  right: '−0.4Δo',
  wrong: ['+0.6Δo', '−0.6Δo', '+0.4Δo'],
  sol: 't₂g is lowered by 0.4Δo and e_g raised by 0.6Δo, keeping the average unchanged — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('d8-mcq', mcq({
  stem: 'The crystal field configuration of Ni²⁺ in green hexaaquanickel(II), [Ni(H₂O)₆]²⁺, is:',
  right: 't₂g⁶e_g²',
  wrong: ['t₂g⁴e_g⁴', 't₂g⁸', 't₂g⁵e_g³'],
  sol: 'd⁸: six electrons fill t₂g, two go into e_g (unpaired) — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('series-mcq', mcq({
  stem: 'Arrange F⁻, CN⁻, H₂O and NH₃ in order of increasing crystal field splitting for a given metal ion.',
  right: 'F⁻ < H₂O < NH₃ < CN⁻',
  wrong: ['CN⁻ < NH₃ < H₂O < F⁻', 'H₂O < F⁻ < NH₃ < CN⁻', 'F⁻ < NH₃ < H₂O < CN⁻'],
  sol: 'From the spectrochemical series — option (@K).',
  d: 2, c: 'recall', t: [2],
}));
add('tetra-mcq', mcq({
  stem: 'Tetrahedral complexes such as [CoCl₄]²⁻ are almost always high spin because:',
  right: 'Δt is only about four-ninths of Δo and is smaller than the pairing energy',
  wrong: ['Δt is larger than Δo', 'tetrahedral complexes have no d electrons', 'chloride is a strong-field ligand'],
  sol: 'A small splitting cannot overcome the pairing energy — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('cft-ar', ar({
  a: 'Neutral carbon monoxide is a stronger-field ligand than the fluoride ion.',
  r: 'Crystal field theory treats ligands as point charges, so it would predict anions to cause the largest splitting.',
  key: 'b',
  sol: 'Both statements are true, but R does not explain A — it shows a limitation of CFT, which ignores the covalent (π) character that makes CO strong — option (b).',
  d: 4, c: 'analysis', t: [2],
}));
add('d3-tf', tf({
  stem: 'For a d³ ion such as Cr³⁺, the octahedral configuration is t₂g³ whether the ligand field is weak or strong.',
  key: 't',
  sol: 'True. Three electrons occupy the three t₂g orbitals singly; no choice arises until d⁴.',
  d: 2, c: 'understanding', t: [2],
}));
add('delta-fill', fill({
  stem: 'The energy difference between the t₂g and e_g sets in an octahedral complex is called the crystal field ___ energy.',
  acc: [['splitting']],
  sol: 'Crystal field **splitting** energy, Δo.',
  d: 1, c: 'recall', t: [2],
}));
add('delta-num', num({
  marks: 2,
  stem: r`The hexaamminechromium(III) ion absorbs most strongly at $460\ \text{nm}$. Taking this absorption as $\Delta_o$, calculate $\Delta_o$ in kJ mol⁻¹. ($N_A = 6.022 \times 10^{23}$, $h = 6.626 \times 10^{-34}\ \text{J s}$, $c = 3.0 \times 10^8\ \text{m s}^{-1}$)`,
  value: 260.2, tol: 1, unit: 'kJ/mol',
  sol: r`$\Delta_o = \dfrac{N_A h c}{\lambda} = \dfrac{6.022 \times 10^{23} \times 6.626 \times 10^{-34} \times 3.0 \times 10^{8}}{460 \times 10^{-9}} \approx 2.602 \times 10^{5}\ \text{J mol}^{-1}$; in kJ: $\Delta_o \approx 260.2\ \text{kJ mol}^{-1}$.`,
  scheme: [['Substitution', 1], ['≈ 260 kJ/mol', 1]],
  d: 3, c: 'application', t: [2],
}), () => near(NHC / 460e-9 / 1000, 260.2, 0.002) || 'delta');
add('lowspin-num', num({
  marks: 2,
  stem: r`How many unpaired electrons are present in the low-spin octahedral ion [Co(NO₂)₆]⁴⁻? (Co, Z = 27)`,
  value: 1, tol: 0, unit: null,
  sol: r`Co²⁺ is d⁷. Low spin: $t_{2g}^6e_g^1$, so the unpaired electrons $= 7 - 6 = 1$.`,
  scheme: [['t₂g⁶e_g¹', 1], ['1', 1]],
  d: 3, c: 'application', t: [2],
}), () => near(7 - 6, 1) || 'n');
add('split-short', short({
  marks: 2,
  stem: 'Describe how the five d orbitals split in a tetrahedral crystal field, and state how Δt compares with Δo for the same metal and ligands.',
  model: 'In a tetrahedral field the ligands lie between the axes. d(xy), d(yz) and d(xz) point closer to the ligands and are raised (t₂ set); d(x²−y²) and d(z²) are lowered (e set) — the reverse of the octahedral pattern. Δt ≈ (4/9)Δo, because there are only four ligands and none points directly at any d orbital.',
  sol: 'e below t₂; Δt ≈ 4/9 Δo.',
  scheme: [['e lower, t₂ higher', 1], ['Δt ≈ (4/9)Δo with reason', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('pairing-short', short({
  marks: 2,
  stem: 'Using Δo and the pairing energy P, explain why Co³⁺ has the configuration t₂g⁴e_g² in [CoF₆]³⁻ but t₂g⁶ in [Co(CN)₆]³⁻.',
  model: 'Co³⁺ is d⁶. F⁻ is weak field, so Δo < P: it costs less to put electrons into e_g than to pair them, giving t₂g⁴e_g² (high spin, 4 unpaired). CN⁻ is strong field, so Δo > P: electrons pair in t₂g first, giving t₂g⁶ (low spin, 0 unpaired).',
  sol: 'Δo < P high spin; Δo > P low spin.',
  scheme: [['F⁻: Δo < P, t₂g⁴e_g²', 1], ['CN⁻: Δo > P, t₂g⁶', 1]],
  d: 2, c: 'application', t: [2],
}));
add('colour-short3', short({
  marks: 3,
  stem: '(a) Why is [Sc(H₂O)₆]³⁺ colourless while [Ti(H₂O)₆]³⁺ is violet? (b) Why does the colour of a complex change when one ligand is replaced by another? (c) Predict which of [Co(H₂O)₆]³⁺ and [Co(NH₃)₆]³⁺ absorbs light of shorter wavelength, giving a reason.',
  model: '(a) Sc³⁺ is d⁰: no d electron, no d–d transition, so no visible light is absorbed. Ti³⁺ is d¹: the electron is promoted t₂g → e_g by absorbing blue-green light, and the complementary violet colour is seen. (b) Different ligands produce different Δo, so the energy (wavelength) of light absorbed changes, changing the colour seen. (c) [Co(NH₃)₆]³⁺: NH₃ is a stronger-field ligand than H₂O, so Δo is larger and higher-energy, shorter-wavelength light is absorbed.',
  sol: 'd⁰ vs d¹; Δo changes; ammine complex.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 3, c: 'application', t: [2],
}));
add('cftmag-short3', short({
  marks: 3,
  stem: 'Using crystal field theory, write the t₂g/e_g configuration and number of unpaired electrons for (a) [Cr(H₂O)₆]³⁺, (b) [Fe(CN)₆]³⁻ and (c) [CoF₆]³⁻. (Z: Cr 24, Fe 26, Co 27)',
  model: '(a) Cr³⁺ d³: t₂g³e_g⁰, 3 unpaired. (b) Fe³⁺ d⁵, strong field: t₂g⁵e_g⁰, 1 unpaired. (c) Co³⁺ d⁶, weak field: t₂g⁴e_g², 4 unpaired.',
  sol: 't₂g³ 3; t₂g⁵ 1; t₂g⁴e_g² 4.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 2, c: 'application', t: [2],
}));
add('limitcft-short3', short({
  marks: 3,
  stem: 'State two assumptions of crystal field theory, and describe one observation that shows these assumptions are an over-simplification.',
  model: 'Assumptions (any two): ligands are point charges (anions) or point dipoles (neutral molecules); metal–ligand bonding is purely electrostatic (ionic); the d orbitals are affected only by repulsion from the ligands. Observation: neutral CO and CN⁻ produce larger splitting than F⁻ or Cl⁻, although point-charge anions should split most; this needs covalent (π) bonding to explain.',
  sol: 'Point charges; ionic bonding; CO strongest.',
  scheme: [['Two assumptions', 2], ['Observation showing limitation', 1]],
  d: 3, c: 'understanding', t: [2],
}));

// ---------------------------------------------------------------- t03 stability constants
add('stability-mcq', mcq({
  stem: 'Overall stability constants (log β) are: [Ni(NH₃)₆]²⁺ 8.6, [Ni(en)₃]²⁺ 18.3, [Ni(CN)₄]²⁻ 31.0 and [Ni(C₂O₄)₃]⁴⁻ about 14. Which is the most stable complex?',
  right: '[Ni(CN)₄]²⁻',
  wrong: ['[Ni(NH₃)₆]²⁺', '[Ni(en)₃]²⁺', '[Ni(C₂O₄)₃]⁴⁻'],
  sol: 'Largest β → most stable — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('instab-mcq', mcq({
  stem: 'The instability (dissociation) constant of a complex such as [Cu(NH₃)₄]²⁺ is:',
  right: 'the reciprocal of its overall stability constant',
  wrong: ['equal to its overall stability constant', 'the sum of its stepwise stability constants', 'the logarithm of its stability constant'],
  sol: 'K(instability) = 1/β — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('beta-mcq', mcq({
  stem: 'For the formation of [Zn(NH₃)₄]²⁺, the stepwise constants are K₁, K₂, K₃ and K₄. The overall stability constant β₄ equals:',
  right: 'K₁ × K₂ × K₃ × K₄',
  wrong: ['K₁ + K₂ + K₃ + K₄', 'K₄ only', 'K₁ ÷ K₄'],
  sol: 'β is the product of the stepwise constants — option (@K).',
  d: 1, c: 'understanding', t: [3],
}));
add('chelstab-mcq', mcq({
  stem: 'log β for [Ni(en)₃]²⁺ (18.3) is about ten units larger than for [Ni(NH₃)₆]²⁺ (8.6), although both have six N donor atoms. The main reason is:',
  right: 'the chelate effect: three five-membered rings make the en complex far more stable',
  wrong: ['en is a negatively charged ligand', 'nickel has a higher oxidation state in the en complex', 'NH₃ cannot donate a lone pair'],
  sol: 'Chelation greatly increases stability — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('stab-ar', ar({
  a: 'Silver chloride dissolves in aqueous ammonia.',
  r: 'Ag⁺ forms the stable complex [Ag(NH₃)₂]⁺, which lowers [Ag⁺] so that the ionic product falls below Ksp of AgCl.',
  key: 'a',
  sol: 'Both are true, and R explains A — option (a).',
  d: 3, c: 'analysis', t: [3],
}));
add('beta-tf', tf({
  stem: 'A complex with a larger instability constant is more stable.',
  key: 'f',
  sol: 'False. The instability constant is 1/β; a larger value means a less stable complex.',
  d: 2, c: 'understanding', t: [3],
}));
add('beta-num', num({
  marks: 1,
  stem: r`For the silver–ethane-1,2-diamine system, the overall stability constant is $\beta_2 = 4.5 \times 10^7$ and the first stepwise constant is $K_1 = 1.5 \times 10^4$. Calculate the second stepwise constant $K_2$.`,
  value: 3000, tol: 10, unit: null,
  sol: r`$\beta_2 = K_1 K_2$, so $K_2 = 4.5 \times 10^7 \div (1.5 \times 10^4) = 3000$.`,
  scheme: [['K₂ = 3.0 × 10³', 1]],
  d: 2, c: 'application', t: [3],
}), () => near(4.5e7 / 1.5e4, 3000) || 'k2');
add('logbeta-num', num({
  marks: 2,
  stem: r`For tetraamminecopper(II), $\beta_4 = 1.6 \times 10^{13}$ and the first three stepwise constants are $K_1 = 2.0 \times 10^4$, $K_2 = 4.0 \times 10^3$ and $K_3 = 1.0 \times 10^3$. Calculate the fourth stepwise constant $K_4$.`,
  value: 200, tol: 1, unit: null,
  sol: r`$K_1K_2K_3 = 2.0 \times 10^4 \times 4.0 \times 10^3 \times 1.0 \times 10^3 = 8.0 \times 10^{10}$; $K_4 = 1.6 \times 10^{13} \div (8.0 \times 10^{10}) = 200$.`,
  scheme: [['Product K₁K₂K₃ = 8.0 × 10¹⁰', 1], ['K₄ = 200', 1]],
  d: 3, c: 'application', t: [3],
}), () => near(1.6e13 / (2e4 * 4e3 * 1e3), 200) || 'k4');
add('stab-short', short({
  marks: 2,
  stem: 'What is meant by the overall stability constant of a complex such as [Ni(NH₃)₆]²⁺? How is it related to the stepwise stability constants?',
  model: 'It is the equilibrium constant for the formation of the complex from the hydrated metal ion and ligands: Ni²⁺ + 6NH₃ ⇌ [Ni(NH₃)₆]²⁺, β₆ = [Ni(NH₃)₆²⁺]/([Ni²⁺][NH₃]⁶). It equals the product of the six stepwise constants: β₆ = K₁K₂K₃K₄K₅K₆. A larger β means a more stable complex.',
  sol: 'Formation constant; β = product of K.',
  scheme: [['Definition with expression', 1], ['β = K₁K₂…K₆', 1]],
  d: 1, c: 'understanding', t: [3],
}));
add('stab-short3', short({
  marks: 3,
  stem: 'log β values are: [Ag(NH₃)₂]⁺ 7.2, [Ag(S₂O₃)₂]³⁻ 13.5 and [Ag(CN)₂]⁻ 21.1. (a) Arrange the complexes in order of increasing stability. (b) Predict what happens when sodium thiosulphate is added to a solution of [Ag(NH₃)₂]⁺. (c) Explain why hypo (sodium thiosulphate) can remove unexposed AgBr from photographic film, whereas ammonia does so only poorly.',
  model: '(a) [Ag(NH₃)₂]⁺ < [Ag(S₂O₃)₂]³⁻ < [Ag(CN)₂]⁻. (b) Thiosulphate displaces ammonia, forming the more stable [Ag(S₂O₃)₂]³⁻ (larger β). (c) AgBr has a very small Ksp; only a very stable complex (large β) lowers [Ag⁺] enough to dissolve it. [Ag(S₂O₃)₂]³⁻ is about 10⁶ times more stable than the ammine complex, so hypo dissolves AgBr, but ammonia does not hold Ag⁺ tightly enough.',
  sol: 'Order; displacement; larger β dissolves AgBr.',
  scheme: [['(a) Order', 1], ['(b) Displacement', 1], ['(c) β vs Ksp', 1]],
  d: 4, c: 'analysis', t: [3, 4],
}));
add('factor-short3', short({
  marks: 3,
  stem: 'Explain, with one example each, how the stability of a complex depends on (a) the charge on the metal ion, (b) chelation and (c) the nature of the ligand.',
  model: '(a) Higher charge (and smaller size) on the metal ion attracts ligands more strongly: [Co(NH₃)₆]³⁺ is far more stable than [Co(NH₃)₆]²⁺. (b) Chelating ligands form rings and give more stable complexes: [Ni(en)₃]²⁺ (log β 18.3) vs [Ni(NH₃)₆]²⁺ (8.6). (c) More basic or strong π-accepting ligands form more stable complexes: CN⁻ complexes such as [Fe(CN)₆]³⁻ are very stable.',
  sol: 'Charge; chelate effect; ligand nature.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 2, c: 'understanding', t: [3],
}));

// ---------------------------------------------------------------- t04 importance
add('dmg-mcq', mcq({
  stem: 'In qualitative analysis, nickel(II) ions are confirmed by:',
  right: 'a red precipitate with dimethylglyoxime in ammoniacal solution',
  wrong: ['a blood-red colour with potassium thiocyanate', 'a deep blue colour with excess ammonia', 'a Prussian blue precipitate with potassium ferrocyanide'],
  sol: 'Bis(dimethylglyoximato)nickel(II) is a red chelate — option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('scn-mcq', mcq({
  stem: 'A few drops of potassium thiocyanate added to a salt solution give a blood-red colour. This shows the presence of:',
  right: 'Fe³⁺, forming [Fe(SCN)(H₂O)₅]²⁺',
  wrong: ['Fe²⁺, forming Prussian blue', 'Cu²⁺, forming [Cu(NH₃)₄]²⁺', 'Ni²⁺, forming [Ni(dmg)₂]'],
  sol: 'Thiocyanato complex of iron(III) — option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('gold-mcq', mcq({
  stem: 'In the cyanide process for extracting gold, the metal is first leached from the crushed ore as:',
  right: 'the soluble complex [Au(CN)₂]⁻, from which gold is then displaced by zinc',
  wrong: ['insoluble gold(III) cyanide, which is filtered off', 'volatile Au(CO)₄, which is decomposed by heat', 'gold(I) chloride, which is reduced by hydrogen'],
  sol: 'Au dissolves in aerated NaCN as [Au(CN)₂]⁻ — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('hb-mcq', mcq({
  stem: 'The central metal ions in haemoglobin, chlorophyll and vitamin B12 are, respectively:',
  right: 'iron, magnesium and cobalt',
  wrong: ['magnesium, iron and cobalt', 'iron, cobalt and magnesium', 'cobalt, magnesium and iron'],
  sol: 'Fe in haem, Mg in chlorophyll, Co in cobalamin — option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('mond-mcq', mcq({
  stem: 'In the Mond process, impure nickel is purified by:',
  right: 'forming volatile Ni(CO)₄ with carbon monoxide at about 330–350 K and decomposing it at about 450–470 K',
  wrong: ['dissolving it as [Ni(NH₃)₆]²⁺ and electrolysing the solution', 'precipitating it with dimethylglyoxime', 'leaching it as [Ni(CN)₄]²⁻ and adding zinc'],
  sol: 'The volatile carbonyl separates nickel from impurities — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('hb-ar', ar({
  a: 'Chlorophyll is a coordination compound of iron.',
  r: 'Haemoglobin contains iron(II) at the centre of a porphyrin ring.',
  key: 'd',
  sol: 'A is false: chlorophyll contains magnesium. R is true — option (d).',
  d: 2, c: 'understanding', t: [4],
}));
add('cisplatin-tf', tf({
  stem: 'The anticancer drug cisplatin is the trans isomer of [PtCl₂(NH₃)₂].',
  key: 'f',
  sol: 'False. Cisplatin is the cis isomer; the trans isomer is inactive.',
  d: 1, c: 'recall', t: [4],
}));
add('b12-fill', fill({
  stem: 'Vitamin B12 (cyanocobalamin) is a coordination compound of the metal ___.',
  acc: [['cobalt', 'Co']],
  sol: '**Cobalt**.',
  d: 1, c: 'recall', t: [4],
}));
add('test-match', match({
  stem: 'Match each test reagent with the metal ion it detects in qualitative analysis.',
  pairs: [
    ['Dimethylglyoxime (red precipitate)', 'Ni²⁺'],
    ['Potassium thiocyanate (blood-red colour)', 'Fe³⁺'],
    ['Excess aqueous ammonia (deep blue colour)', 'Cu²⁺'],
    ['Potassium ferricyanide (Turnbull’s blue)', 'Fe²⁺'],
  ],
  order: [1, 3, 0, 2],
  sol: 'dmg → Ni²⁺; SCN⁻ → Fe³⁺; NH₃ → Cu²⁺; K₃[Fe(CN)₆] → Fe²⁺.',
  d: 2, c: 'application', t: [4],
}));
add('gold-num', num({
  marks: 2,
  stem: r`Gold is leached by aerated sodium cyanide: $\ce{4Au + 8CN- + 2H2O + O2 -> 4Au(CN)2^- + 4OH-}$. What mass of NaCN ($M = 49$) is needed to dissolve $0.394\ \text{g}$ of gold (Au = 197)?`,
  value: 0.196, tol: 0.002, unit: 'g',
  sol: r`$n(\text{Au}) = 0.394 \div 197 = 0.0020\ \text{mol}$; $n(\ce{CN-}) = 2 \times 0.0020 = 0.0040\ \text{mol}$; mass $= 0.0040 \times 49 = 0.196\ \text{g}$.`,
  scheme: [['Moles and 1 : 2 ratio', 1], ['0.196 g', 1]],
  d: 3, c: 'application', t: [4],
}), () => near((0.394 / 197) * 2 * 49, 0.196) || 'mass');
add('qual-short', short({
  marks: 2,
  stem: 'Give two examples of the use of complex formation in qualitative analysis, naming the ion detected and the complex formed.',
  model: 'Any two: Ni²⁺ gives a red precipitate of bis(dimethylglyoximato)nickel(II) with dimethylglyoxime; Cu²⁺ gives deep blue [Cu(NH₃)₄]²⁺ with excess ammonia; Fe³⁺ gives blood-red [Fe(SCN)(H₂O)₅]²⁺ with thiocyanate; Fe³⁺ gives Prussian blue, Fe₄[Fe(CN)₆]₃, with potassium ferrocyanide.',
  sol: 'Two examples.',
  scheme: [['Example 1', 1], ['Example 2', 1]],
  d: 1, c: 'recall', t: [4],
}));
add('bio-short', short({
  marks: 2,
  stem: 'Name the metal and state the biological role of (a) haemoglobin and (b) chlorophyll.',
  model: '(a) Haemoglobin: iron(II) in a porphyrin (haem) ring; it binds and carries oxygen in the blood. (b) Chlorophyll: magnesium in a porphyrin-type ring; it absorbs light for photosynthesis in green plants.',
  sol: 'Fe, oxygen transport; Mg, photosynthesis.',
  scheme: [['(a)', 1], ['(b)', 1]],
  d: 1, c: 'recall', t: [4],
}));
add('extract-short3', short({
  marks: 3,
  stem: 'Explain, with equations, how complex formation is used (a) in the extraction of silver from its ore by the cyanide process and (b) in the purification of nickel by the Mond process.',
  model: r`(a) Silver is leached with aerated NaCN: $\ce{4Ag + 8CN- + 2H2O + O2 -> 4Ag(CN)2^- + 4OH-}$; silver is then displaced by zinc: $\ce{2Ag(CN)2^- + Zn -> Zn(CN)4^2- + 2Ag}$. (b) Impure nickel is heated in CO at about 330–350 K: $\ce{Ni + 4CO -> Ni(CO)4}$; the volatile carbonyl is decomposed at about 450–470 K: $\ce{Ni(CO)4 -> Ni + 4CO}$, giving pure nickel.`,
  sol: 'Leach and displace; form and decompose carbonyl.',
  scheme: [['(a) Leaching equation', 1], ['(a) Displacement by Zn', 1], ['(b) Mond equations', 1]],
  d: 2, c: 'application', t: [4],
}));

// ---------------------------------------------------------------- long answers
add('vbt-long', long({
  stem: '(a) State the main ideas of valence bond theory as applied to complexes. [1]\n\n(b) Using valence bond theory, give the hybridisation, shape, type (inner or outer orbital) and spin-only magnetic moment of (i) [Cr(NH₃)₆]³⁺ and (ii) [Fe(H₂O)₆]²⁺. (Z: Cr 24, Fe 26) [3]\n\n(c) State two limitations of valence bond theory. [1]',
  model: '(a) The metal ion provides empty orbitals equal to its coordination number; these hybridise into equivalent directed orbitals; each ligand donates a lone pair into one hybrid orbital; strong-field ligands may pair d electrons.\n\n(b) (i) Cr³⁺ 3d³: two 3d orbitals empty; d²sp³, octahedral, inner orbital; n = 3, μ = √15 ≈ 3.87 BM. (ii) Fe²⁺ 3d⁶ with weak-field H₂O: no pairing; sp³d², octahedral, outer orbital; n = 4, μ = √24 ≈ 4.90 BM.\n\n(c) Any two: cannot explain colour; does not explain why some ligands are strong and others weak; cannot predict tetrahedral vs square planar for CN 4; gives no quantitative interpretation of magnetic data.',
  sol: 'Postulates; d²sp³ 3.87 BM; sp³d² 4.90 BM; limitations.',
  scheme: [['(a) Main ideas', 1], ['(b)(i) Cr complex', 1.5], ['(b)(ii) Fe complex', 1.5], ['(c) Two limitations', 1]],
  d: 3, c: 'application', t: [1],
}));
add('cft-long', long({
  stem: '(a) On the basis of crystal field theory, explain why the five d orbitals of a metal ion no longer have equal energy when six ligands approach along the x, y and z axes. Name the two sets formed and give their energies relative to the barycentre. [2]\n\n(b) Co³⁺ is d⁶. Write its configuration in [CoF₆]³⁻ and in [Co(NH₃)₆]³⁺, and state the magnetic behaviour of each. [2]\n\n(c) Why are low-spin tetrahedral complexes rarely observed? [1]',
  model: '(a) The ligands, treated as point charges, repel the d electrons. d(x²−y²) and d(z²) point directly at the ligands and are raised in energy (e_g, +0.6Δo); d(xy), d(yz) and d(xz) point between the axes and are lowered (t₂g, −0.4Δo). The gap is Δo.\n\n(b) [CoF₆]³⁻: F⁻ weak field, Δo < P: t₂g⁴e_g², 4 unpaired, paramagnetic. [Co(NH₃)₆]³⁺: NH₃ strong field for Co³⁺, Δo > P: t₂g⁶e_g⁰, diamagnetic.\n\n(c) Δt ≈ (4/9)Δo is almost always smaller than the pairing energy, so electrons occupy the upper set rather than pair.',
  sol: 'e_g up, t₂g down; t₂g⁴e_g² vs t₂g⁶; Δt small.',
  scheme: [['(a) Reason and two sets', 2], ['(b) Two configurations', 1], ['(b) Magnetism', 1], ['(c) Δt < P', 1]],
  d: 3, c: 'understanding', t: [2],
}));
add('colour-long', long({
  stem: '(a) Explain how crystal field theory accounts for the colour of transition-metal complexes. [1½]\n\n(b) Hexaaquacopper(II) absorbs most strongly at about 800 nm. Calculate Δo in kJ mol⁻¹. (N_A = 6.022 × 10²³, h = 6.626 × 10⁻³⁴ J s, c = 3.0 × 10⁸ m s⁻¹) [2]\n\n(c) Explain why [Cu(NH₃)₄]²⁺ is a deeper blue-violet than [Cu(H₂O)₆]²⁺. [1½]',
  model: r`(a) Ligands split the d orbitals by Δo. A d electron absorbs visible light whose energy equals Δo and is promoted from t₂g to e_g (d–d transition). The light not absorbed is transmitted, so the complex shows the complementary colour.

(b) $\Delta_o = \dfrac{N_A h c}{\lambda} = \dfrac{6.022 \times 10^{23} \times 6.626 \times 10^{-34} \times 3.0 \times 10^{8}}{800 \times 10^{-9}} \approx 1.50 \times 10^{5}\ \text{J mol}^{-1}$, about 150 kJ mol⁻¹.

(c) NH₃ is a stronger-field ligand than H₂O, so Δo is larger; the absorption moves to higher energy (shorter wavelength, yellow-orange), and the complementary colour seen is a deeper blue-violet.`,
  sol: 'd–d transition; ≈ 150 kJ/mol; larger Δo with NH₃.',
  scheme: [['(a) d–d transition and complementary colour', 1.5], ['(b) Substitution', 1], ['(b) ≈ 150 kJ/mol', 1], ['(c) Stronger field, larger Δo', 1.5]],
  d: 3, c: 'application', t: [2],
}));
add('stab-long', long({
  stem: '(a) Define stepwise and overall stability constants for the formation of [Ni(en)₃]²⁺ from Ni²⁺(aq) and en. [1½]\n\n(b) The stepwise constants are K₁ = 3.3 × 10⁷, K₂ = 1.9 × 10⁶ and K₃ = 3.2 × 10⁴. Calculate β₃ and log β₃, and compare with log β = 8.6 for [Ni(NH₃)₆]²⁺. [2]\n\n(c) State two factors, other than chelation, that increase the stability of a complex. [1½]',
  model: r`(a) Stepwise: $\ce{Ni^2+ + en <=> [Ni(en)]^2+}$, $K_1 = [\ce{Ni(en)^2+}]/([\ce{Ni^2+}][\text{en}])$, and similarly $K_2$, $K_3$ for adding the second and third en. Overall: $\ce{Ni^2+ + 3en <=> [Ni(en)3]^2+}$, $\beta_3 = K_1K_2K_3$.

(b) $\beta_3 = 3.3 \times 10^7 \times 1.9 \times 10^6 \times 3.2 \times 10^4 \approx 2.0 \times 10^{18}$; $\log \beta_3 \approx 18.3$. This is about $10^{10}$ times larger than for the ammine complex: the chelate effect.

(c) Any two: higher charge and smaller size of the metal ion; greater basicity (donor strength) of the ligand; π-acceptor ability of the ligand (CN⁻, CO); a larger crystal field stabilisation.`,
  sol: 'Definitions; β₃ ≈ 2.0 × 10¹⁸, log 18.3; factors.',
  scheme: [['(a) Definitions', 1.5], ['(b) β₃', 1], ['(b) log β₃ and comparison', 1], ['(c) Two factors', 1.5]],
  d: 4, c: 'application', t: [3],
}));
add('import-long', long({
  stem: '(a) Give three examples of the use of complex formation in qualitative analysis. [1½]\n\n(b) Describe, with equations, the extraction of gold by the cyanide process. [2]\n\n(c) Name the metal present in, and the function of, haemoglobin, chlorophyll and vitamin B12. [1½]',
  model: r`(a) Ni²⁺: red precipitate with dimethylglyoxime; Cu²⁺: deep blue [Cu(NH₃)₄]²⁺ with excess NH₃; Fe³⁺: blood-red [Fe(SCN)(H₂O)₅]²⁺ with SCN⁻ (or Prussian blue with K₄[Fe(CN)₆]).

(b) Crushed ore is leached with dilute aerated NaCN: $\ce{4Au + 8CN- + 2H2O + O2 -> 4Au(CN)2^- + 4OH-}$. Gold is then displaced by zinc dust: $\ce{2Au(CN)2^- + Zn -> Zn(CN)4^2- + 2Au}$.

(c) Haemoglobin: iron, carries oxygen in blood. Chlorophyll: magnesium, absorbs light for photosynthesis. Vitamin B12: cobalt, needed for formation of red blood cells (prevents pernicious anaemia).`,
  sol: 'Three tests; leaching and displacement; Fe, Mg, Co.',
  scheme: [['(a) Three examples', 1.5], ['(b) Two equations', 2], ['(c) Three metals and functions', 1.5]],
  d: 2, c: 'application', t: [4],
}));
