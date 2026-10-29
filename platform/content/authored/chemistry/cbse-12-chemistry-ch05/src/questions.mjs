// ch05 Coordination Compounds — question bank. MCQ keys are placed by the builder (balanced); AR keys planned: a a a b c d.
// Every numerical is re-solved by the check function passed to add().
import { mk, add, r } from './lib.mjs';

const { mcq, ar, tf, fill, match, num, short, long, part } = mk;
const near = (a, b, rel = 0.005) => Math.abs(a - b) <= Math.max(1e-9, Math.abs(b) * rel);
const mu = (n) => Math.sqrt(n * (n + 2));

// ---------------------------------------------------------------- t01 Werner's theory and terms
add('cn-en-mcq', mcq({
  stem: r`The coordination number of cobalt in $\ce{[CoCl2(en)2]+}$ is (en = ethane-1,2-diamine):`,
  right: '6',
  wrong: ['4', '3', '2'],
  sol: 'Each en binds through two nitrogen atoms: 2 × 2 = 4 donor atoms, plus 2 chlorides = 6 — option (@K). (@1) counts ligands instead of donor atoms.',
  d: 2, c: 'understanding', t: [1],
}));
add('werner-mcq', mcq({
  stem: r`How many ions are produced in water by one formula unit of $\ce{[CoCl(NH3)5]Cl2}$?`,
  right: '3',
  wrong: ['4', '6', '1'],
  sol: r`It dissociates as $\ce{[CoCl(NH3)5]^2+}$ + $2\ce{Cl-}$: three ions — option (@K). The chloride inside the coordination sphere is not released (@1 counts it).`,
  d: 2, c: 'application', t: [1],
}));
add('double-salt-mcq', mcq({
  stem: 'Which of these is a double salt rather than a coordination compound?',
  right: 'Potash alum, K₂SO₄·Al₂(SO₄)₃·24H₂O',
  wrong: [r`$\ce{K4[Fe(CN)6]}$`, r`$\ce{[Cu(NH3)4]SO4}$`, r`$\ce{[Ni(CO)4]}$`],
  sol: 'Potash alum dissolves to give K⁺, Al³⁺ and SO₄²⁻ ions — all its simple ions — so it is a double salt — option (@K). The others keep their complex entities intact.',
  d: 1, c: 'understanding', t: [1],
}));
add('denticity-mcq', mcq({
  stem: 'The ethylenediaminetetraacetate ion (EDTA⁴⁻) is a:',
  right: 'hexadentate ligand, binding through two nitrogen and four oxygen atoms',
  wrong: ['tetradentate ligand, binding through four oxygen atoms only', 'didentate ligand, binding through its two nitrogen atoms', 'unidentate ligand'],
  sol: 'EDTA⁴⁻ has two amine N atoms and four carboxylate O atoms that can all bind: hexadentate — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('ambi-mcq', mcq({
  stem: 'Which ligand is ambidentate?',
  right: r`$\ce{SCN-}$`,
  wrong: [r`$\ce{NH3}$`, r`$\ce{C2O4^2-}$`, 'ethane-1,2-diamine'],
  sol: r`Thiocyanate can bond through S (thiocyanato-S) or N (thiocyanato-N) — option (@K). Oxalate and en are didentate, using two atoms at once, not either of two.`,
  d: 1, c: 'understanding', t: [1],
}));
add('chelate-ar', ar({
  a: r`$\ce{[Ni(en)3]^2+}$ is more stable than $\ce{[Ni(NH3)6]^2+}$.`,
  r: 'Ethane-1,2-diamine is a chelating ligand that forms five-membered rings with the metal ion.',
  key: 'a',
  sol: 'Both are true; ring formation (the chelate effect) makes the en complex more stable, so R explains A — option (a).',
  d: 2, c: 'understanding', t: [1],
}));
add('werner-tf', tf({
  stem: 'According to Werner, the secondary valency of a metal is ionisable and is satisfied only by negative ions.',
  key: 'f',
  sol: 'False. Secondary valency is non-ionisable and is satisfied by ligands (neutral molecules or anions); it equals the coordination number. Primary valency is the ionisable one.',
  d: 1, c: 'recall', t: [1],
}));
add('cn-fill', fill({
  stem: r`The coordination number of iron in $\ce{K4[Fe(CN)6]}$ is ___.`,
  acc: [['6', 'six']],
  sol: 'Six cyanide ions are bonded to iron, so the coordination number is **6**.',
  d: 1, c: 'recall', t: [1],
}));
add('terms-match', match({
  stem: 'Match each term with the correct example.',
  pairs: [
    ['Didentate ligand', 'Oxalate ion'],
    ['Ambidentate ligand', 'Nitrite ion'],
    ['Homoleptic complex', r`$\ce{[Co(NH3)6]^3+}$`],
    ['Counter ion', r`$\ce{K+}$ in $\ce{K3[Fe(CN)6]}$`],
  ],
  order: [1, 3, 0, 2],
  sol: 'Oxalate binds through two O atoms; nitrite through N or O; hexaamminecobalt(III) has one kind of ligand; K⁺ lies outside the coordination sphere.',
  d: 2, c: 'understanding', t: [1],
}));
add('agcl-num', num({
  stem: r`What amount of AgCl, in moles, is precipitated when excess silver nitrate is added to a solution containing $0.010\ \text{mol}$ of $\ce{[CoCl(NH3)5]Cl2}$?`,
  value: 0.02, tol: 0.0001, unit: 'mol',
  sol: r`Only the two chloride ions outside the coordination sphere are free: moles of AgCl $= 2 \times 0.010 = 0.02$, so $0.020\ \text{mol}$.`,
  scheme: [['Two ionisable Cl⁻; 0.020 mol AgCl', 1]],
  d: 2, c: 'application', t: [1],
}), () => near(2 * 0.01, 0.02) || 'AgCl');
add('oxno-num', num({
  stem: r`What is the oxidation number of cobalt in $\ce{[CoCl(NH3)4(H2O)]Cl2}$? (Give the number.)`,
  value: 3, tol: 0, unit: null,
  sol: r`Ammonia and water are neutral. $x + (-1) + 2(-1) = 0$, so $x = 3$: cobalt is $+3$.`,
  scheme: [['x − 1 − 2 = 0, x = +3', 1]],
  d: 2, c: 'understanding', t: [1],
}), () => near(1 + 2, 3) || 'ox');
add('ligand-short', short({
  marks: 2,
  stem: 'What is meant by (a) a chelating ligand and (b) an ambidentate ligand? Give one example of each.',
  model: '(a) A chelating ligand has two or more donor atoms that bind the same metal ion, forming a ring; for example ethane-1,2-diamine or oxalate. (b) An ambidentate ligand has two different donor atoms but bonds through only one of them at a time; for example nitrite, which bonds through N or O.',
  sol: 'Definitions with one example each.',
  scheme: [['(a) Definition and example', 1], ['(b) Definition and example', 1]],
  d: 2, c: 'recall', t: [1],
}));
add('werner-short3', short({
  marks: 3, wl: null,
  stem: 'Three platinum(IV) compounds have the formulas PtCl₄·6NH₃, PtCl₄·4NH₃ and PtCl₄·2NH₃. Platinum(IV) has a coordination number of 6. Write the Werner formula of each, and state how many moles of AgCl each would give per mole with excess silver nitrate.',
  model: r`PtCl₄·6NH₃: $\ce{[Pt(NH3)6]Cl4}$ — all four Cl⁻ outside, **4 mol AgCl** (5 ions in solution).

PtCl₄·4NH₃: $\ce{[PtCl2(NH3)4]Cl2}$ — two Cl inside to make 6, **2 mol AgCl** (3 ions).

PtCl₄·2NH₃: $\ce{[PtCl4(NH3)2]}$ — all four Cl inside, **0 mol AgCl** (a non-electrolyte).`,
  sol: 'Fill the six coordination positions with NH₃ first, then with Cl; the remaining Cl⁻ is ionisable.',
  scheme: [['First formula and 4 mol AgCl', 1], ['Second formula and 2 mol AgCl', 1], ['Third formula and 0 mol AgCl', 1]],
  d: 3, c: 'application', t: [1, 2],
}));

// ---------------------------------------------------------------- t02 nomenclature
add('name-mcq', mcq({
  stem: r`The IUPAC name of $\ce{K2[NiCl4]}$ is:`,
  right: 'potassium tetrachloridonickelate(II)',
  wrong: ['potassium tetrachloridonickel(II)', 'potassium tetrachloridonickelate(IV)', 'dipotassium nickel tetrachloride'],
  sol: r`The complex $\ce{[NiCl4]^2-}$ is an anion, so nickel becomes nickelate; $x - 4 = -2$ gives Ni(II) — option (@K). (@1) misses the -ate ending; (@2) has the wrong oxidation state.`,
  d: 2, c: 'understanding', t: [2],
}));
add('name2-mcq', mcq({
  stem: r`The IUPAC name of $\ce{[Co(NH3)5(NO2)]Cl2}$, in which the nitrite ligand is bonded through nitrogen, is:`,
  right: 'pentaamminenitrito-N-cobalt(III) chloride',
  wrong: ['pentaamminenitrito-O-cobalt(III) chloride', 'nitritopentaamminecobalt(II) chloride', 'pentaamminenitrito-N-cobaltate(III) chloride'],
  sol: 'Ligands alphabetically: ammine before nitrito; N-bonded nitrite is nitrito-N; x − 1 = +2 gives Co(III); the complex is a cation, so no -ate — option (@K).',
  d: 3, c: 'application', t: [2],
}));
add('formula-mcq', mcq({
  stem: 'The formula of tetraamminediaquacobalt(III) chloride is:',
  right: r`$\ce{[Co(NH3)4(H2O)2]Cl3}$`,
  wrong: [r`$\ce{[Co(NH3)4(H2O)2]Cl2}$`, r`$\ce{[CoCl2(NH3)4(H2O)2]Cl}$`, r`$\ce{[Co(NH3)4(H2O)2]}$`],
  sol: 'Ammine and aqua are neutral, so the complex has the charge of Co(III), +3, and needs three chloride counter ions — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('name3-mcq', mcq({
  stem: r`In photography, unexposed silver bromide dissolves in hypo to form $\ce{Na3[Ag(S2O3)2]}$. Its IUPAC name is:`,
  right: 'sodium bis(thiosulfato)argentate(I)',
  wrong: ['sodium dithiosulfatosilver(I)', 'sodium bis(thiosulfato)argentate(III)', 'trisodium silver thiosulfate'],
  sol: 'The complex [Ag(S₂O₃)₂]³⁻ is an anion, so silver becomes argentate; x − 4 = −3 gives Ag(I); "thiosulfato" takes the prefix bis with brackets — option (@K).',
  d: 3, c: 'application', t: [2, 5],
}));
add('name-tf', tf({
  stem: 'When ammonia is a ligand, it is named "amine" in the name of the complex.',
  key: 'f',
  sol: 'False. NH₃ as a ligand is named **ammine** (two m’s); "amine" refers to organic compounds.',
  d: 1, c: 'recall', t: [2],
}));
add('naming-short3', short({
  marks: 3, wl: null,
  stem: r`Write the IUPAC names of (a) $\ce{[Pt(NH3)4][PtCl4]}$, (b) $\ce{[CoCl2(en)2]Cl}$, (c) $\ce{K3[Cr(C2O4)3]}$.`,
  model: '(a) Tetraammineplatinum(II) tetrachloridoplatinate(II).\n\n(b) Dichloridobis(ethane-1,2-diamine)cobalt(III) chloride.\n\n(c) Potassium trioxalatochromate(III).',
  sol: 'Cation first; ligands alphabetical (chlorido before ethane-1,2-diamine); -ate for anionic complexes; oxidation states from charge balance.',
  scheme: [['(a) correct', 1], ['(b) correct', 1], ['(c) correct', 1]],
  d: 3, c: 'application', t: [2],
}));
add('formula-short', short({
  marks: 2, wl: null,
  stem: 'Write the formulas of (a) hexaamminecobalt(III) sulfate and (b) potassium tetracyanidonickelate(II).',
  model: r`(a) $\ce{[Co(NH3)6]2(SO4)3}$ — the complex is +3 and sulfate −2, so two complex ions balance three sulfates.

(b) $\ce{K2[Ni(CN)4]}$ — the complex is $+2 - 4 = -2$, balanced by two potassium ions.`,
  sol: 'Find the charge on the complex, then balance with counter ions.',
  scheme: [['(a) correct with charge balance', 1], ['(b) correct', 1]],
  d: 3, c: 'application', t: [2],
}));

// ---------------------------------------------------------------- t03 isomerism
add('geo-isomer-mcq', mcq({
  stem: 'Which complex can show geometrical (cis–trans) isomerism?',
  right: r`$\ce{[PtCl2(NH3)2]}$ (square planar)`,
  wrong: [r`$\ce{[NiCl4]^2-}$ (tetrahedral)`, r`$\ce{[Co(NH3)6]^3+}$`, r`$\ce{[Ni(CO)4]}$`],
  sol: 'Square planar [MX₂L₂] can have the two Cl adjacent (cis) or opposite (trans) — option (@K). Tetrahedral complexes and homoleptic complexes cannot.',
  d: 2, c: 'application', t: [3],
}));
add('linkage-mcq', mcq({
  stem: 'Which pair are linkage isomers?',
  right: r`$\ce{[Co(NH3)5(NO2)]Cl2}$ and $\ce{[Co(NH3)5(ONO)]Cl2}$`,
  wrong: [r`$\ce{[Co(NH3)5Br]SO4}$ and $\ce{[Co(NH3)5(SO4)]Br}$`, r`$\ce{[Cr(H2O)6]Cl3}$ and $\ce{[CrCl(H2O)5]Cl2.H2O}$`, r`$\ce{[Co(NH3)6][Cr(CN)6]}$ and $\ce{[Cr(NH3)6][Co(CN)6]}$`],
  sol: 'Nitrite bonds through N in one and O in the other: linkage isomers — option (@K). (@1) are ionisation, (@2) hydrate and (@3) coordination isomers.',
  d: 2, c: 'understanding', t: [3],
}));
add('ionisation-mcq', mcq({
  stem: r`Solution X of a cobalt complex gives a white precipitate with barium chloride but none with silver nitrate; solution Y of an isomer gives a pale yellow precipitate with silver nitrate but none with barium chloride. X and Y could be:`,
  right: r`X $\ce{[CoBr(NH3)5]SO4}$, Y $\ce{[Co(NH3)5(SO4)]Br}$`,
  wrong: [r`X $\ce{[Co(NH3)5(SO4)]Br}$, Y $\ce{[CoBr(NH3)5]SO4}$`, r`X $\ce{[Co(NH3)5(NO2)]Cl2}$, Y $\ce{[Co(NH3)5(ONO)]Cl2}$`, r`X cis-$\ce{[CoCl2(NH3)4]Cl}$, Y trans-$\ce{[CoCl2(NH3)4]Cl}$`],
  sol: 'X has free sulfate (BaSO₄ precipitate) and bromide inside the sphere; Y has free bromide (pale yellow AgBr) and sulfate inside — ionisation isomers — option (@K). (@1) swaps them.',
  d: 4, c: 'analysis', t: [3],
}));
add('optical-mcq', mcq({
  stem: 'Which of these complex ions is optically active?',
  right: r`cis-$\ce{[CoCl2(en)2]+}$`,
  wrong: [r`trans-$\ce{[CoCl2(en)2]+}$`, r`cis-$\ce{[PtCl2(NH3)2]}$`, r`$\ce{[Co(NH3)6]^3+}$`],
  sol: 'The cis isomer with two chelating en rings has no plane of symmetry and exists as d and l forms — option (@K). The trans form has a mirror plane, and square planar complexes are planar.',
  d: 3, c: 'application', t: [3],
}));
add('fac-mer-mcq', mcq({
  stem: r`$\ce{[Co(NH3)3Cl3]}$ (octahedral) shows which type of isomerism?`,
  right: 'Facial (fac) and meridional (mer) geometrical isomerism',
  wrong: ['Ionisation isomerism', 'Linkage isomerism', 'Optical isomerism only'],
  sol: 'Octahedral [MA₃B₃] can place the three Cl on one face (fac) or around a meridian (mer) — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('isomer-ar', ar({
  a: 'Tetrahedral complexes do not show geometrical isomerism.',
  r: 'In a tetrahedron every corner is adjacent to every other corner, so relative positions of two ligands cannot differ.',
  key: 'a',
  sol: 'Both are true, and R explains A: with all positions equivalent and mutually adjacent, no cis/trans difference is possible — option (a).',
  d: 2, c: 'understanding', t: [3],
}));
add('count-num', num({
  marks: 2,
  stem: r`How many stereoisomers does the octahedral ion $\ce{[CoCl2(en)2]+}$ have in total?`,
  value: 3, tol: 0, unit: null,
  sol: 'The two chlorides can be trans (one isomer, with a mirror plane) or cis; the cis form is chiral and exists as a d and an l form. Total = 1 + 2 = 3.',
  scheme: [['trans isomer optically inactive; cis isomer as an enantiomeric pair', 1], ['Total 3 stereoisomers', 1]],
  d: 4, c: 'analysis', t: [3],
}));
add('isomer-match', match({
  stem: 'Match each pair of compounds with the type of isomerism it shows.',
  pairs: [
    [r`$\ce{[Co(NH3)5(SO4)]Br}$ / $\ce{[CoBr(NH3)5]SO4}$`, 'Ionisation'],
    [r`$\ce{[Co(NH3)6][Cr(CN)6]}$ / $\ce{[Cr(NH3)6][Co(CN)6]}$`, 'Coordination'],
    [r`$\ce{[Cr(H2O)6]Cl3}$ / $\ce{[CrCl(H2O)5]Cl2.H2O}$`, 'Solvate (hydrate)'],
    [r`$\ce{[Mn(CO)5(SCN)]}$ / $\ce{[Mn(CO)5(NCS)]}$`, 'Linkage'],
  ],
  order: [0, 2, 3, 1],
  sol: 'Ligand/counter ion swap: ionisation; ligand swap between metals: coordination; water inside/outside: hydrate; S- vs N-bonded thiocyanate: linkage.',
  d: 2, c: 'understanding', t: [3],
}));
add('ionisation-short', short({
  marks: 2,
  stem: r`How would you distinguish chemically between $\ce{[Co(NH3)5Cl]SO4}$ and $\ce{[Co(NH3)5(SO4)]Cl}$? Name the type of isomerism.`,
  model: 'They are ionisation isomers. Add barium chloride: the first gives a white precipitate of barium sulfate (free sulfate), the second does not. Add silver nitrate: the second gives a white precipitate of silver chloride (free chloride), the first does not.',
  sol: 'Test for the free counter ion in each.',
  scheme: [['Ionisation isomerism named', 0.5], ['BaCl₂ and AgNO₃ tests with correct results', 1.5]],
  d: 3, c: 'application', t: [3],
}));
add('isomer-short3', short({
  marks: 3,
  stem: r`(a) Draw or describe the geometrical isomers of $\ce{[CoCl2(NH3)4]+}$. (b) How many stereoisomers does $\ce{[CoCl2(en)2]+}$ have, and which of them is optically active? (c) Why does $\ce{[CoCl2(NH3)4]+}$ show no optical isomerism?`,
  model: '(a) Two isomers: cis, with the two Cl on adjacent corners of the octahedron, and trans, with the two Cl on opposite corners. (b) Three: the trans isomer and the two mirror-image forms (d and l) of the cis isomer; only the cis forms are optically active. (c) Both isomers of the tetraammine complex have a plane of symmetry, so each is superimposable on its mirror image.',
  sol: 'cis/trans; chirality from the two chelate rings in the cis form.',
  scheme: [['(a) cis and trans described', 1], ['(b) three stereoisomers, cis optically active', 1], ['(c) plane of symmetry', 1]],
  d: 4, c: 'analysis', t: [3],
}));

// ---------------------------------------------------------------- t04 bonding: VBT and CFT
add('vbt-mcq', mcq({
  stem: r`For $\ce{[Fe(CN)6]^3-}$, which description is correct? (Fe, Z = 26)`,
  right: r`$d^2sp^3$, inner-orbital, one unpaired electron`,
  wrong: [r`$sp^3d^2$, outer-orbital, five unpaired electrons`, r`$d^2sp^3$, inner-orbital, no unpaired electrons`, r`$dsp^2$, square planar, one unpaired electron`],
  sol: r`$\ce{Fe^3+}$ is $3d^5$. Strong-field $\ce{CN-}$ pairs four of the electrons into three orbitals, leaving two 3d orbitals empty: $d^2sp^3$ with one unpaired electron — option (@K). (@1) is $\ce{[FeF6]^3-}$.`,
  d: 3, c: 'application', t: [4],
}));
add('low-spin-mcq', mcq({
  stem: 'Which octahedral complex is low spin?',
  right: r`$\ce{[Fe(CN)6]^4-}$`,
  wrong: [r`$\ce{[Fe(H2O)6]^2+}$`, r`$\ce{[CoF6]^3-}$`, r`$\ce{[FeF6]^3-}$`],
  sol: r`$\ce{CN-}$ is near the strong end of the spectrochemical series, so $\Delta_o > P$ and $\ce{Fe^2+}$ ($d^6$) becomes $t_{2g}^6$ — option (@K). Water and fluoride are weak-field.`,
  d: 2, c: 'application', t: [4],
}));
add('shape-mcq', mcq({
  stem: r`The hybridisation and shape of $\ce{[Ni(CO)4]}$ are:`,
  right: r`$sp^3$, tetrahedral`,
  wrong: [r`$dsp^2$, square planar`, r`$d^2sp^3$, octahedral`, r`$sp^3d$, trigonal bipyramidal`],
  sol: r`Ni(0) is $3d^8 4s^2$; CO causes pairing to $3d^{10}$, leaving 4s and 4p for $sp^3$: tetrahedral and diamagnetic — option (@K).`,
  d: 3, c: 'application', t: [4, 5],
}));
add('mu-mcq', mcq({
  stem: r`The spin-only magnetic moment of the tetrahedral ion $\ce{[MnCl4]^2-}$ is about (Mn, Z = 25):`,
  right: '5.92 BM',
  wrong: ['1.73 BM', '3.87 BM', '0 BM'],
  sol: r`$\ce{Mn^2+}$ is $3d^5$; tetrahedral complexes are high spin, so $n = 5$ and $\mu = \sqrt{35} \approx 5.92$ BM — option (@K). (@1) assumes low spin.`,
  d: 3, c: 'application', t: [4],
}), () => near(mu(5), 5.92, 0.002) || 'mu');
add('colour-mcq', mcq({
  stem: 'A complex absorbs light mainly in the yellow region of the visible spectrum. Its solution appears:',
  right: 'violet (the complementary colour of yellow)',
  wrong: ['yellow', 'colourless', 'white'],
  sol: 'We see the light that is not absorbed: the complementary colour of yellow, violet — option (@K).',
  d: 1, c: 'understanding', t: [4],
}));
add('en-colour-mcq', mcq({
  stem: r`When ethane-1,2-diamine is added to green $\ce{[Ni(H2O)6]^2+}$, violet $\ce{[Ni(en)3]^2+}$ forms. What happens to the crystal-field splitting and the light absorbed?`,
  right: 'Δo increases, so light of higher energy (shorter wavelength) is absorbed',
  wrong: ['Δo decreases, so light of lower energy is absorbed', 'Δo is unchanged; only the shape changes', 'Δo becomes zero, so no light is absorbed'],
  sol: 'en lies above water in the spectrochemical series, so Δo grows and the absorption moves to higher energy; the observed colour shifts from green to violet — option (@K).',
  d: 3, c: 'application', t: [4],
}));
add('delta-mcq', mcq({
  stem: r`For the same metal ion, ligands and metal–ligand distance, the tetrahedral splitting $\Delta_t$ is related to the octahedral splitting $\Delta_o$ by:`,
  right: r`$\Delta_t \approx \tfrac{4}{9}\Delta_o$`,
  wrong: [r`$\Delta_t \approx \tfrac{9}{4}\Delta_o$`, r`$\Delta_t = \Delta_o$`, r`$\Delta_t \approx 2\Delta_o$`],
  sol: 'Fewer ligands, none pointing directly at a d orbital, give a smaller splitting: about four-ninths of Δo — option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('spectro-mcq', mcq({
  stem: 'Which ligand produces the largest crystal-field splitting with a given metal ion?',
  right: r`$\ce{CN-}$`,
  wrong: [r`$\ce{F-}$`, r`$\ce{H2O}$`, r`$\ce{Cl-}$`],
  sol: r`In the spectrochemical series $\ce{Cl-} < \ce{F-} < \ce{H2O} < \ldots < \ce{CN-}$; cyanide is strongest of these — option (@K).`,
  d: 1, c: 'recall', t: [4],
}));
add('cft-config-mcq', mcq({
  stem: r`The configuration of a $d^6$ ion in a strong octahedral field ($\Delta_o > P$) is:`,
  right: r`$t_{2g}^6e_g^0$`,
  wrong: [r`$t_{2g}^4e_g^2$`, r`$t_{2g}^3e_g^3$`, r`$e^3t_2^3$`],
  sol: r`When $\Delta_o > P$, electrons pair in the lower $t_{2g}$ set before entering $e_g$: $t_{2g}^6$ — option (@K). (@1) is the weak-field (high-spin) configuration.`,
  d: 2, c: 'understanding', t: [4],
}));
add('cft-ar', ar({
  a: r`$\ce{[Fe(CN)6]^4-}$ is diamagnetic.`,
  r: r`$\ce{CN-}$ is a strong-field ligand, so the six d electrons of $\ce{Fe^2+}$ pair up in the $t_{2g}$ orbitals.`,
  key: 'a',
  sol: 'Both are true, and the low-spin t₂g⁶ configuration (no unpaired electrons) explains the diamagnetism — option (a).',
  d: 2, c: 'understanding', t: [4],
}));
add('zn-ar', ar({
  a: 'Complexes of Zn²⁺ are colourless.',
  r: 'Complexes of Zn²⁺ are diamagnetic.',
  key: 'b',
  sol: 'Both are true. But the colourlessness is due to the full 3d¹⁰ set, which allows no d–d transition; diamagnetism is a separate consequence of the same configuration, not the explanation — option (b).',
  d: 3, c: 'understanding', t: [4],
}));
add('cft-limit-ar', ar({
  a: 'Carbon monoxide is a strong-field ligand.',
  r: 'Carbon monoxide carries a negative charge, so it repels the metal d electrons strongly.',
  key: 'c',
  sol: 'A is true. R is false: CO is neutral. Its strong field comes from π back-bonding — a covalent effect that crystal field theory, with point-charge ligands, cannot explain — option (c).',
  d: 3, c: 'understanding', t: [4, 5],
}));
add('vbt-ar', ar({
  a: r`$\ce{[NiCl4]^2-}$ is diamagnetic.`,
  r: r`$\ce{Cl-}$ is a weak-field ligand.`,
  key: 'd',
  sol: r`A is false: with weak-field chloride, the two unpaired 3d electrons of $\ce{Ni^2+}$ stay unpaired ($sp^3$, tetrahedral), so it is paramagnetic. R is true — option (d).`,
  d: 3, c: 'application', t: [4],
}));
add('tetra-tf', tf({
  stem: 'Low-spin tetrahedral complexes are rarely observed.',
  key: 't',
  sol: 'True. Δt (about 4/9 of Δo) is almost always smaller than the pairing energy, so electrons occupy the upper set before pairing.',
  d: 2, c: 'understanding', t: [4],
}));
add('mu-num', num({
  stem: r`Calculate the spin-only magnetic moment, in BM, of $\ce{[Cr(NH3)6]^3+}$ (Cr, Z = 24).`,
  value: 3.87, tol: 0.01, unit: 'BM',
  sol: r`$\ce{Cr^3+}$ is $3d^3$: $t_{2g}^3$, $n = 3$. $\mu = \sqrt{3 \times 5} = \sqrt{15} \approx 3.87$, in BM.`,
  scheme: [['n = 3, μ ≈ 3.87 BM', 1]],
  d: 2, c: 'application', t: [4],
}), () => near(mu(3), 3.87, 0.002) || 'mu');
add('unpaired-num', num({
  stem: r`How many unpaired electrons are present in the low-spin octahedral ion $\ce{[Mn(CN)6]^3-}$? (Mn, Z = 25)`,
  value: 2, tol: 0, unit: null,
  sol: r`$\ce{Mn^3+}$ is $3d^4$. Low spin: all four in $t_{2g}$, i.e. $t_{2g}^4$ — one pair and $4 - 2 = 2$ single electrons. So 2 unpaired electrons.`,
  scheme: [['t₂g⁴: 2 unpaired electrons', 1]],
  d: 3, c: 'application', t: [4],
}), () => near(4 - 2, 2) || 'n');
add('delta-num', num({
  stem: r`For a metal ion and ligand, $\Delta_o = 18000\ \text{cm}^{-1}$. Estimate $\Delta_t$, in $\text{cm}^{-1}$, for the corresponding tetrahedral complex.`,
  value: 8000, tol: 10, unit: 'cm⁻¹',
  sol: r`$\Delta_t \approx \dfrac{4}{9} \times 18000 = 8000$, in $\text{cm}^{-1}$.`,
  scheme: [['Δt = (4/9) × 18000 = 8000 cm⁻¹', 1]],
  d: 2, c: 'understanding', t: [4],
}), () => near((4 / 9) * 18000, 8000) || 'dt');
add('colour-short', short({
  marks: 2,
  stem: r`$\ce{[Ti(H2O)6]^3+}$ is violet, but when its solid salt is heated strongly so that the water ligands are lost, the colour disappears. Explain.`,
  model: 'Ti³⁺ has one 3d electron. In the aqua complex the d orbitals are split, and this electron absorbs blue-green light to move from t₂g to e_g, so the complementary violet is seen. Without the water ligands there is no crystal-field splitting in the visible range, so no d–d transition occurs and the solid is colourless.',
  sol: 'Colour needs ligand-induced splitting and a d–d transition.',
  scheme: [['d–d transition of the single electron gives violet', 1], ['Without ligands no splitting, so no colour', 1]],
  d: 3, c: 'application', t: [4],
}));
add('vbt-limit-short', short({
  marks: 2,
  stem: 'State two limitations of valence bond theory for coordination compounds.',
  model: 'It does not explain the colour of complexes, and it cannot predict whether a four-coordinate complex will be tetrahedral or square planar. It also makes no distinction between weak and strong ligands and gives no quantitative account of magnetic data.',
  sol: 'Any two valid limitations.',
  scheme: [['Limitation 1', 1], ['Limitation 2', 1]],
  d: 2, c: 'recall', t: [4],
}));
add('vbt-short3', short({
  marks: 3,
  stem: r`Using valence bond theory, compare $\ce{[Fe(CN)6]^3-}$ and $\ce{[FeF6]^3-}$ in terms of hybridisation, type of complex (inner or outer orbital) and magnetic moment. (Fe, Z = 26)`,
  model: r`Both contain $\ce{Fe^3+}$, $3d^5$. With strong-field $\ce{CN-}$, four electrons pair, leaving two 3d orbitals empty: $d^2sp^3$, **inner-orbital**, one unpaired electron, $\mu \approx 1.73$ BM. With weak-field $\ce{F-}$, no pairing: 4s, 4p and two 4d orbitals are used, $sp^3d^2$, **outer-orbital**, five unpaired electrons, $\mu \approx 5.92$ BM.`,
  sol: 'Same d⁵ ion; ligand strength decides pairing.',
  scheme: [['Cyanide complex: d²sp³, inner, 1.73 BM', 1.5], ['Fluoride complex: sp³d², outer, 5.92 BM', 1.5]],
  d: 3, c: 'application', t: [4],
}), () => (near(mu(1), 1.73, 0.002) && near(mu(5), 5.92, 0.002)) || 'mu');
add('cft-short3', short({
  marks: 3,
  stem: r`$\ce{Cr^2+}$ and $\ce{Mn^3+}$ are both $d^4$ ions. Write the $t_{2g}/e_g$ configuration and the number of unpaired electrons for (a) $\ce{[Cr(H2O)6]^2+}$ (weak field) and (b) $\ce{[Mn(CN)6]^3-}$ (strong field). (c) Which has the larger magnetic moment?`,
  model: r`(a) Weak field, $\Delta_o < P$: the fourth electron enters $e_g$: $t_{2g}^3e_g^1$, 4 unpaired electrons (high spin). (b) Strong field, $\Delta_o > P$: the fourth electron pairs in $t_{2g}$: $t_{2g}^4e_g^0$, 2 unpaired electrons (low spin). (c) The aqua chromium(II) complex, with more unpaired electrons (about 4.90 BM against 2.83 BM).`,
  sol: 'Compare Δo with P for the fourth electron.',
  scheme: [['(a) t₂g³e_g¹, 4 unpaired', 1], ['(b) t₂g⁴, 2 unpaired', 1], ['(c) Cr(II) aqua complex larger', 1]],
  d: 3, c: 'application', t: [4],
}), () => (near(mu(4), 4.9, 0.002) && near(mu(2), 2.83, 0.002)) || 'mu');

// ---------------------------------------------------------------- t05 carbonyls and applications
add('backbond-mcq', mcq({
  stem: 'In a metal carbonyl, π back-donation from the metal to CO:',
  right: 'weakens the C–O bond and strengthens the M–C bond',
  wrong: ['strengthens the C–O bond and weakens the M–C bond', 'has no effect on either bond', 'breaks the C–O bond completely'],
  sol: 'Electron density goes into the antibonding π* orbital of CO, lowering the C–O bond order, while the M–C bond gains π character — option (@K).',
  d: 2, c: 'understanding', t: [5],
}));
add('carbonyl-shape-mcq', mcq({
  stem: 'The shape of pentacarbonyliron(0), [Fe(CO)₅], is:',
  right: 'trigonal bipyramidal',
  wrong: ['square pyramidal', 'octahedral', 'tetrahedral'],
  sol: 'Five CO ligands around iron are arranged as a trigonal bipyramid — option (@K).',
  d: 1, c: 'recall', t: [5],
}));
add('uses-mcq', mcq({
  stem: 'A water-testing laboratory needs to find the total concentration of calcium and magnesium ions in a sample. Which method uses a coordination compound most directly?',
  right: 'Titration with EDTA, which forms stable chelate complexes with Ca²⁺ and Mg²⁺',
  wrong: ['Titration with potassium permanganate', 'Adding silver nitrate and weighing the precipitate', 'Measuring the pH with a meter'],
  sol: 'EDTA binds Ca²⁺ and Mg²⁺ 1 : 1 as hexadentate chelates, so the volume of EDTA needed gives the hardness — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('uses-match', match({
  stem: 'Match each application with the coordination compound involved.',
  pairs: [
    ['Treatment of some cancers', 'cis-[PtCl₂(NH₃)₂] (cisplatin)'],
    ['Purification of nickel', '[Ni(CO)₄]'],
    ['Hydrogenation of alkenes', 'Wilkinson’s catalyst, [RhCl(PPh₃)₃]'],
    ['Oxygen transport in blood', 'Haemoglobin (iron complex)'],
  ],
  order: [2, 0, 3, 1],
  sol: 'Cisplatin: cancer; tetracarbonylnickel: Mond process; Wilkinson’s catalyst: hydrogenation; haemoglobin: oxygen transport.',
  d: 1, c: 'recall', t: [5],
}));
add('carbonyl-short', short({
  marks: 2,
  stem: 'Explain the nature of bonding between a metal and carbon monoxide in metal carbonyls.',
  model: 'The metal–carbon bond has both σ and π character. The carbon of CO donates its lone pair into a vacant metal orbital (σ bond), and a filled metal d orbital donates electrons back into the vacant antibonding π* orbital of CO (π back-bond). The two effects reinforce each other (synergic bonding), strengthening the M–C bond.',
  sol: 'σ donation plus π back-donation, synergic.',
  scheme: [['σ donation from CO to the metal', 1], ['π back-donation into CO π*, synergic', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('uses-short', short({
  marks: 2,
  stem: 'Give one use of coordination compounds in (a) metallurgy and (b) medicine, naming the complex involved.',
  model: '(a) Gold and silver are extracted from their ores by dissolving them as cyanide complexes such as [Au(CN)₂]⁻ and [Ag(CN)₂]⁻, from which the metal is recovered with zinc. (b) Cisplatin, cis-[PtCl₂(NH₃)₂], is used to treat some cancers; EDTA is used to remove lead from the body.',
  sol: 'One correct use with the complex for each.',
  scheme: [['(a) metallurgy example', 1], ['(b) medicine example', 1]],
  d: 2, c: 'recall', t: [5],
}));

// ---------------------------------------------------------------- long answers
add('werner-long', long({
  stem: '(a) State the main postulates of Werner’s theory of coordination compounds.\n\n(b) CoCl₃·5NH₃ gives 2 mol of AgCl per mole with excess silver nitrate. Write its Werner formula and IUPAC name, and state its primary and secondary valencies.\n\n(c) Define coordination number and denticity, and give an example of a didentate and a hexadentate ligand.',
  model: '(a) A metal shows a primary (ionisable) valency, equal to its oxidation state and satisfied by anions, and a secondary (non-ionisable) valency, equal to its coordination number and satisfied by ligands. Secondary valencies are directed in space, giving definite shapes such as octahedral. (b) Two chlorides are free, so the formula is [CoCl(NH₃)₅]Cl₂, pentaamminechloridocobalt(III) chloride. Primary valency 3 (oxidation state +3); secondary valency 6. (c) Coordination number is the number of ligand donor atoms bonded to the metal; denticity is the number of donor atoms through which one ligand binds. Didentate: ethane-1,2-diamine or oxalate. Hexadentate: EDTA⁴⁻.',
  sol: 'Postulates, deduction from AgCl data, definitions with examples.',
  scheme: [['(a) Postulates', 1.5], ['(b) Formula and name', 1.5], ['(b) Valencies', 0.5], ['(c) Definitions and examples', 1.5]],
  d: 3, c: 'application', t: [1, 2],
}));
add('isomerism-long', long({
  stem: '(a) Name and explain four types of structural isomerism in coordination compounds, with one example of each.\n\n(b) What is geometrical isomerism? Show it with a square planar and an octahedral example.\n\n(c) Explain why [Co(en)₃]³⁺ is optically active.',
  model: 'Ionisation isomers interchange a ligand and a counter ion, e.g. [Co(NH₃)₅(SO₄)]Br and [CoBr(NH₃)₅]SO₄. Linkage isomers have an ambidentate ligand bonded through different atoms, e.g. nitrito-N and nitrito-O complexes. Coordination isomers interchange ligands between complex cation and anion, e.g. [Co(NH₃)₆][Cr(CN)₆] and [Cr(NH₃)₆][Co(CN)₆]. Hydrate isomers differ in water inside or outside the sphere, e.g. violet [Cr(H₂O)₆]Cl₃ and grey-green [CrCl(H₂O)₅]Cl₂·H₂O. Geometrical isomers differ in the relative positions of ligands: cis and trans [PtCl₂(NH₃)₂] (square planar), and cis and trans [CoCl₂(NH₃)₄]⁺ (octahedral). [Co(en)₃]³⁺ has three chelate rings arranged like a propeller with no plane of symmetry, so its mirror images are non-superimposable (d and l forms).',
  sol: 'Four structural types with examples; cis/trans with both geometries; chirality of the tris-chelate.',
  scheme: [['(a) Four types with examples', 2], ['(b) Definition and two examples', 2], ['(c) No plane of symmetry; d and l forms', 1]],
  d: 3, c: 'understanding', t: [3],
}));
add('vbt-long', long({
  wl: null,
  stem: r`(a) Using valence bond theory, predict the hybridisation, shape and magnetic behaviour of $\ce{[Ni(CN)4]^2-}$, $\ce{[NiCl4]^2-}$ and $\ce{[Ni(CO)4]}$. (Ni, Z = 28)

(b) Calculate the spin-only magnetic moment of the paramagnetic one.

(c) State two limitations of valence bond theory.`,
  model: r`(a) $\ce{Ni^2+}$ is $3d^8$ (two unpaired). In $\ce{[Ni(CN)4]^2-}$ strong-field $\ce{CN-}$ pairs them, freeing one 3d orbital: $dsp^2$, **square planar, diamagnetic**. In $\ce{[NiCl4]^2-}$ weak-field $\ce{Cl-}$ does not: $sp^3$, **tetrahedral, paramagnetic** (2 unpaired). In $\ce{[Ni(CO)4]}$, Ni(0) $3d^8 4s^2$ becomes $3d^{10}$ with CO: $sp^3$, **tetrahedral, diamagnetic**.

(b) $\ce{[NiCl4]^2-}$: $n = 2$, $\mu = \sqrt{8} \approx 2.83$ BM.

(c) It cannot explain colour, and it cannot predict whether a four-coordinate complex will be tetrahedral or square planar (or distinguish weak and strong ligands).`,
  sol: 'Start from the d count; decide pairing from ligand strength.',
  scheme: [['(a) [Ni(CN)₄]²⁻ dsp², square planar, diamagnetic', 1], ['(a) [NiCl₄]²⁻ sp³, tetrahedral, paramagnetic', 1], ['(a) [Ni(CO)₄] sp³, tetrahedral, diamagnetic', 1], ['(b) 2.83 BM', 1], ['(c) Two limitations', 1]],
  d: 4, c: 'application', t: [4],
}), () => near(mu(2), 2.83, 0.002) || 'mu');
add('cft-long', long({
  wl: null,
  stem: r`(a) Draw the crystal-field splitting diagram for a metal ion in an octahedral field and label $t_{2g}$, $e_g$ and $\Delta_o$.

(b) Explain, with the $d^6$ ion $\ce{Fe^2+}$, how the relative sizes of $\Delta_o$ and the pairing energy P decide whether $\ce{[Fe(H2O)6]^2+}$ and $\ce{[Fe(CN)6]^4-}$ are high spin or low spin, and give their magnetic behaviour.

(c) Explain why $\ce{[Fe(H2O)6]^2+}$ is coloured.`,
  model: r`(a) Five degenerate d orbitals split: $e_g$ ($d_{x^2-y^2}$, $d_{z^2}$) rise by $0.6\Delta_o$, $t_{2g}$ ($d_{xy}$, $d_{yz}$, $d_{xz}$) fall by $0.4\Delta_o$; the gap is $\Delta_o$.

(b) Water is weak-field: $\Delta_o < P$, so electrons enter $e_g$ before pairing: $t_{2g}^4e_g^2$, high spin, 4 unpaired, paramagnetic ($\mu \approx 4.90$ BM). Cyanide is strong-field: $\Delta_o > P$, so all pair in $t_{2g}$: $t_{2g}^6e_g^0$, low spin, diamagnetic.

(c) A $t_{2g}$ electron absorbs visible light of energy $\Delta_o$ and is promoted to $e_g$ (d–d transition); the complementary colour (pale green) is seen.`,
  sol: 'Splitting diagram, Δo versus P, d–d transition.',
  scheme: [['(a) Labelled diagram', 1.5], ['(b) Aqua complex high spin, paramagnetic', 1], ['(b) Cyanido complex low spin, diamagnetic', 1], ['(c) d–d transition and complementary colour', 1.5]],
  d: 4, c: 'application', t: [4],
}), () => near(mu(4), 4.9, 0.002) || 'mu');
add('carbonyl-uses-long', long({
  stem: '(a) Give the shapes of [Ni(CO)₄], [Fe(CO)₅] and [Cr(CO)₆], and the oxidation state of the metal in each.\n\n(b) Explain synergic bonding in metal carbonyls and its effect on the C–O bond.\n\n(c) Describe two applications of coordination compounds in analysis or metallurgy and one in biology.',
  model: '[Ni(CO)₄] is tetrahedral, [Fe(CO)₅] trigonal bipyramidal and [Cr(CO)₆] octahedral; the metal is in the zero oxidation state in all three. In the M–CO bond, carbon donates its lone pair into an empty metal orbital (σ bond), and a filled metal d orbital donates back into the empty π* orbital of CO (π back-bond); each effect strengthens the other, so the M–C bond is strengthened while electron density in π* weakens the C–O bond. Applications: EDTA titration measures the hardness of water by forming stable chelates with Ca²⁺ and Mg²⁺; gold and silver are extracted as cyanide complexes; nickel is purified via volatile [Ni(CO)₄] in the Mond process. In biology, haemoglobin (an iron complex) carries oxygen and chlorophyll (a magnesium complex) absorbs light for photosynthesis.',
  sol: 'Shapes and oxidation states; σ + π synergic bonding; three applications.',
  scheme: [['(a) Three shapes and zero oxidation state', 1.5], ['(b) σ donation and π back-donation', 1.5], ['(b) Effect on C–O bond', 0.5], ['(c) Three applications', 1.5]],
  d: 3, c: 'understanding', t: [5],
}));

// ---------------------------------------------------------------- case-based
add('hardness-case', mk.case({
  passage: r`A municipal laboratory in Bengaluru measures the total hardness of tap water. A $50.0\ \text{mL}$ sample, buffered at pH 10 with a few drops of an indicator, needs $12.0\ \text{mL}$ of $0.0100\ \text{M}$ disodium EDTA to reach the end point. EDTA reacts with $\ce{Ca^2+}$ and $\ce{Mg^2+}$ in a 1 : 1 ratio. Hardness is reported as mg of $\ce{CaCO3}$ per litre (ppm), taking every hardness ion as if it were $\ce{CaCO3}$ ($M = 100\ \text{g mol}^{-1}$).`,
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'Why does EDTA form such stable complexes with Ca²⁺ and Mg²⁺?',
      right: 'It is a hexadentate ligand that wraps around the ion and forms several chelate rings.',
      wrong: ['It is a unidentate ligand with a very small size.', 'It forms ionic precipitates that settle out.', 'It oxidises Ca²⁺ and Mg²⁺ to higher oxidation states.'],
      sol: 'Six donor atoms bind the same ion, forming five-membered chelate rings — the chelate effect gives great stability — option (@K).',
      d: 2, c: 'understanding', t: [1, 5],
    })),
    part('b', num({
      stem: 'Calculate the hardness of the water in ppm (mg of CaCO₃ per litre).',
      value: 240, tol: 1, unit: 'ppm',
      sol: r`Moles of EDTA $= 0.0100 \times 0.0120 = 1.2 \times 10^{-4}$ = moles of hardness ions in 50.0 mL. Per litre: $1.2 \times 10^{-4} \times 20 = 0.0024$ mol, i.e. $0.0024 \times 100 = 0.24$ g $= 240$ mg of $\ce{CaCO3}$; so $240$ ppm.`,
      scheme: [['Moles in sample, scaled to 1 L, converted to mg CaCO₃: 240 ppm', 1]],
      d: 3, c: 'application', t: [5],
    })),
    part('c', short({
      marks: 2,
      stem: 'A technician suggests using ammonia instead of EDTA because ammonia also forms complexes with metal ions. Evaluate this suggestion.',
      model: 'The suggestion is poor. Ammonia is unidentate and does not form chelates, so its complexes with Ca²⁺ and Mg²⁺ are weak and do not form in a fixed 1 : 1 ratio; no sharp end point would be obtained. EDTA forms very stable 1 : 1 chelates, which is what a titration needs.',
      sol: 'Stability and fixed 1 : 1 ratio are essential for a titration.',
      scheme: [['Ammonia unidentate, weak complexes with Ca²⁺/Mg²⁺', 1], ['No fixed ratio or sharp end point; EDTA gives stable 1 : 1 chelates', 1]],
      d: 4, c: 'evaluation', t: [1, 5],
    }), [
      short({
        marks: 2,
        stem: 'Why is the titration done at a fixed pH (about 10) using a buffer?',
        model: 'EDTA is a weak acid; at low pH its donor groups are protonated and cannot bind the metal ions strongly. At about pH 10 it is mostly deprotonated, so it forms stable complexes with Ca²⁺ and Mg²⁺, and the indicator gives a clear colour change. A buffer keeps the pH constant during the titration.',
        sol: 'Deprotonated EDTA binds strongly; buffer keeps conditions constant.',
        scheme: [['At low pH EDTA is protonated and binds weakly', 1], ['Buffer keeps pH ≈ 10 for strong 1 : 1 complexation and a clear end point', 1]],
        d: 4, c: 'analysis', t: [5],
      }),
    ]),
  ],
}), () => near(0.01 * 0.012 * (1000 / 50) * 100 * 1000, 240) || 'hardness');
add('cisplatin-case', mk.case({
  passage: 'In 1965, researchers studying the effect of electric current on bacteria noticed that the bacteria stopped dividing. The cause turned out to be a platinum complex formed from the electrodes: cis-diamminedichloridoplatinum(II), now called cisplatin. Its trans isomer has almost no anticancer activity. Cisplatin is believed to work by binding to two neighbouring nitrogen atoms on the DNA of a cancer cell.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'What is the formula of cisplatin?',
      right: r`$\ce{[PtCl2(NH3)2]}$ with the two Cl adjacent`,
      wrong: [r`$\ce{[PtCl2(NH3)2]}$ with the two Cl opposite`, r`$\ce{[Pt(NH3)4]Cl2}$`, r`$\ce{K2[PtCl4]}$`],
      sol: 'Diammine + dichlorido + Pt(II), neutral; "cis" means the two chlorido ligands are adjacent — option (@K).',
      d: 2, c: 'application', t: [2, 3],
    })),
    part('b', short({
      marks: 1,
      stem: 'Name the type of isomerism shown by cisplatin and its trans form.',
      model: 'Geometrical (cis–trans) isomerism.',
      sol: 'Same bonds, different relative positions.',
      wl: null,
      scheme: [['Geometrical isomerism', 1]],
      d: 1, c: 'recall', t: [3],
    })),
    part('c', short({
      marks: 2,
      stem: 'Suggest why only the cis isomer can bind to two neighbouring nitrogen atoms on DNA.',
      model: 'In the cis isomer the two chlorido ligands, which are replaced when the drug binds, are on adjacent positions about 90° apart, so the two vacated sites point towards two neighbouring nitrogen atoms on the DNA. In the trans isomer the two sites are on opposite sides of the platinum, 180° apart, and cannot both reach neighbouring atoms.',
      sol: 'Geometry of the leaving groups: adjacent vs opposite.',
      scheme: [['cis: leaving groups adjacent (90°)', 1], ['trans: opposite (180°), cannot reach neighbouring N atoms', 1]],
      d: 4, c: 'analysis', t: [3],
    }), [
      short({
        marks: 2,
        stem: 'Cisplatin is square planar and diamagnetic. Explain using valence bond theory. (Pt, Z = 78; Pt²⁺ is 5d⁸)',
        model: 'Pt²⁺ is 5d⁸. For heavy 5d metals the ligand field is large, so the eight d electrons pair in four 5d orbitals, leaving one 5d orbital empty. One 5d, one 6s and two 6p orbitals form dsp² hybrids, giving a square planar complex with no unpaired electrons: diamagnetic.',
        sol: 'Pairing of 5d⁸ frees one d orbital for dsp².',
        scheme: [['Pairing of the 5d⁸ electrons, one d orbital free', 1], ['dsp²: square planar, diamagnetic', 1]],
        d: 4, c: 'application', t: [4],
      }),
    ]),
  ],
}));
add('nickel-colour-case', mk.case({
  passage: r`In a school laboratory, a student dissolves green nickel(II) sulfate in water. Adding excess ammonia solution turns it blue-violet, as $\ce{[Ni(NH3)6]^2+}$ forms. Adding ethane-1,2-diamine to a fresh nickel solution gives a violet colour, as $\ce{[Ni(en)3]^2+}$ forms. All three complexes are octahedral. (Ni, Z = 28)`,
  d: 3, c: 'analysis',
  children: [
    part('a', mcq({
      stem: 'Which order of crystal-field splitting is consistent with these observations?',
      right: r`$\ce{[Ni(H2O)6]^2+} < \ce{[Ni(NH3)6]^2+} < \ce{[Ni(en)3]^2+}$`,
      wrong: [r`$\ce{[Ni(en)3]^2+} < \ce{[Ni(NH3)6]^2+} < \ce{[Ni(H2O)6]^2+}$`, r`$\ce{[Ni(NH3)6]^2+} < \ce{[Ni(H2O)6]^2+} < \ce{[Ni(en)3]^2+}$`, 'All three are equal, since the metal ion is the same'],
      sol: 'Spectrochemical series H₂O < NH₃ < en: the splitting increases in this order, and the absorbed light moves to higher energy — option (@K).',
      d: 2, c: 'application', t: [4],
    })),
    part('b', short({
      marks: 1,
      stem: 'How many unpaired electrons does each of these octahedral nickel(II) complexes have?',
      model: 'Two in each: Ni²⁺ is d⁸, t₂g⁶e_g², whatever the ligand.',
      sol: 'Octahedral d⁸ always has two electrons in e_g.',
      scheme: [['Two unpaired electrons (t₂g⁶e_g²)', 1]],
      d: 3, c: 'application', t: [4],
    })),
    part('c', short({
      marks: 2,
      stem: 'Explain why the colour changes from green to violet as water is replaced by ethane-1,2-diamine.',
      model: 'Ethane-1,2-diamine is a stronger-field ligand than water, so Δo increases. The d–d transition then needs light of higher energy (shorter wavelength) to be absorbed, so the complementary colour that we see shifts from green towards violet.',
      sol: 'Larger Δo, higher-energy absorption, different complementary colour.',
      scheme: [['en stronger field, Δo larger', 1], ['Higher-energy light absorbed, so the observed colour changes', 1]],
      d: 3, c: 'application', t: [4],
    }), [
      short({
        marks: 2,
        stem: 'A classmate predicts that the en complex will be diamagnetic because en is a strong-field ligand. Evaluate this prediction.',
        model: 'The prediction is wrong. In an octahedral field, d⁸ Ni²⁺ must place six electrons in t₂g and two in e_g, one in each orbital, whatever the size of Δo. So all three complexes have two unpaired electrons and are paramagnetic; a stronger ligand changes the colour but not the number of unpaired electrons.',
        sol: 'For octahedral d⁸ the spin state does not depend on Δo.',
        scheme: [['Octahedral d⁸ always t₂g⁶e_g², 2 unpaired', 1], ['So it is paramagnetic; prediction wrong', 1]],
        d: 4, c: 'evaluation', t: [4],
      }),
    ]),
  ],
}));
add('mond-case', mk.case({
  passage: r`Impure nickel is purified by the Mond process. Carbon monoxide is passed over the impure metal at about 330–350 K, forming volatile tetracarbonylnickel, $\ce{Ni + 4CO -> Ni(CO)4}$. The vapour is led to another chamber at about 450–470 K, where it decomposes back to very pure nickel and carbon monoxide, which is recycled. (Ni = 58.7, C = 12, O = 16)`,
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'What is the oxidation state of nickel in tetracarbonylnickel?',
      right: '0',
      wrong: ['+2', '+4', '−4'],
      sol: 'CO is a neutral ligand and the complex is neutral, so nickel is in the zero oxidation state — option (@K).',
      d: 1, c: 'understanding', t: [5],
    })),
    part('b', num({
      stem: r`What mass of carbon monoxide, in grams, is needed to convert $5.87\ \text{g}$ of nickel into tetracarbonylnickel?`,
      value: 11.2, tol: 0.05, unit: 'g',
      sol: r`Moles of Ni $= \dfrac{5.87}{58.7} = 0.1$; CO needed $= 4 \times 0.1 = 0.4$ mol; mass $= 0.4 \times 28 = 11.2$, so $11.2\ \text{g}$.`,
      scheme: [['0.4 mol CO, 11.2 g', 1]],
      d: 2, c: 'application', t: [5],
    })),
    part('c', short({
      marks: 2,
      stem: 'Describe the bonding between nickel and carbon monoxide in this compound.',
      model: 'Each CO donates the lone pair on carbon into an empty orbital of nickel, forming a σ bond. Nickel then donates electron density from its filled d orbitals into the empty π* orbitals of CO (π back-bonding). The two effects reinforce each other (synergic bonding), making the Ni–C bonds strong.',
      sol: 'σ donation and π back-donation.',
      scheme: [['σ donation from C to Ni', 1], ['π back-donation, synergic', 1]],
      d: 2, c: 'understanding', t: [5],
    }), [
      short({
        marks: 2,
        stem: 'Predict the shape and magnetic behaviour of tetracarbonylnickel using valence bond theory.',
        model: 'Ni(0) is 3d⁸4s². CO causes the 4s electrons to pair into 3d, giving 3d¹⁰. The empty 4s and three 4p orbitals form sp³ hybrids that accept four CO lone pairs: a tetrahedral, diamagnetic molecule.',
        sol: '3d¹⁰ after pairing; sp³.',
        scheme: [['3d¹⁰ after pairing, sp³', 1], ['Tetrahedral and diamagnetic', 1]],
        d: 3, c: 'application', t: [4, 5],
      }),
    ]),
  ],
}), () => near((5.87 / 58.7) * 4 * 28, 11.2) || 'CO');
