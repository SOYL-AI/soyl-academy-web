// ISC 12 Chemistry ch07 Transition (d-Block) Elements — question bank (ISC style). Stems name their own ions,
// compounds or data. MCQ keys are placed by the builder; AR keys planned: a b d a c. Numericals re-solved.
import { mk, add, r } from './lib.mjs';

const { mcq, ar, tf, fill, match, num, short, long } = mk;
const near = (a, b, rel = 0.005) => Math.abs(a - b) <= Math.max(1e-9, Math.abs(b) * rel);
const mu = (n) => Math.sqrt(n * (n + 2));

// ---------------------------------------------------------------- t01 position, occurrence, configuration
add('ion-mcq', mcq({
  stem: 'Mohr’s salt, used as a primary standard in titrations, contains the Fe²⁺ ion (Fe, Z = 26). Its electronic configuration is:',
  right: '[Ar]3d⁶',
  wrong: ['[Ar]3d⁴4s²', '[Ar]3d⁵4s¹', '[Ar]3d⁵'],
  sol: 'Fe is [Ar]3d⁶4s²; the two 4s electrons are lost first, giving [Ar]3d⁶ — option (@K). [Ar]3d⁵ is Fe³⁺ (@3).',
  d: 2, c: 'application', t: [1],
}));
add('transition-mcq', mcq({
  stem: 'Cadmium, scandium, copper and iron all lie in the d-block. Which of them is NOT a transition element by the strict definition?',
  right: 'Cadmium',
  wrong: ['Scandium', 'Copper', 'Iron'],
  sol: 'Cd is 4d¹⁰5s² and Cd²⁺ is 4d¹⁰: no incomplete d subshell — option (@K). Sc (3d¹), Cu²⁺ (3d⁹) and Fe (3d⁶) all qualify.',
  d: 2, c: 'understanding', t: [1],
}));
add('pd-mcq', mcq({
  stem: 'Palladium (Z = 46), used in catalytic converters, has an unusual ground-state configuration. It is:',
  right: '[Kr]4d¹⁰',
  wrong: ['[Kr]4d⁸5s²', '[Kr]4d⁹5s¹', '[Kr]4d¹⁰5s²'],
  sol: 'Palladium has no 5s electron: [Kr]4d¹⁰ — option (@K).',
  d: 2, c: 'recall', t: [1],
}));
add('position-mcq', mcq({
  stem: 'The 4d transition series runs from yttrium to cadmium in period 5. In which groups of the periodic table do the d-block elements lie?',
  right: 'Groups 3 to 12',
  wrong: ['Groups 1 and 2', 'Groups 13 to 18', 'Groups 3 to 10 only'],
  sol: 'The d-block fills groups 3–12 between the s- and p-blocks — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('ti-ion-mcq', mcq({
  stem: 'Titanium dioxide, the white pigment in paints, contains the Ti⁴⁺ ion (Ti, Z = 22). How many 3d electrons does Ti⁴⁺ have?',
  right: '0',
  wrong: ['2', '4', '1'],
  sol: 'Ti [Ar]3d²4s² loses all four outer electrons: Ti⁴⁺ is [Ar]3d⁰ — option (@K). This is why TiO₂ is white.',
  d: 2, c: 'application', t: [1],
}));
add('zn-ar', ar({
  a: 'Zinc, the metal used to galvanise iron, is not regarded as a typical transition element.',
  r: 'Zinc has a completely filled 3d subshell in both its atom and its Zn²⁺ ion.',
  key: 'a',
  sol: 'Both are true, and the filled d subshell in the atom and the ion is exactly why zinc is not a typical transition element — option (a).',
  d: 2, c: 'understanding', t: [1],
}));
add('cr-fill', fill({
  stem: 'In its ground state, the chromium atom (Z = 24, configuration [Ar]3d⁵4s¹) has ___ unpaired electrons.',
  acc: [['6', 'six']],
  sol: 'Five 3d electrons and one 4s electron are all unpaired: **6**.',
  d: 2, c: 'application', t: [1],
}));
add('ore-match', match({
  stem: 'Match each 3d metal with the ore from which it is mainly extracted.',
  pairs: [
    ['Iron', 'Haematite, Fe₂O₃'],
    ['Chromium', 'Chromite, FeCr₂O₄'],
    ['Manganese', 'Pyrolusite, MnO₂'],
    ['Titanium', 'Ilmenite, FeTiO₃'],
  ],
  order: [1, 3, 0, 2],
  sol: 'Iron → haematite; chromium → chromite; manganese → pyrolusite; titanium → ilmenite.',
  d: 1, c: 'recall', t: [1],
}));
add('zn-short', short({
  marks: 2,
  stem: 'Zinc, cadmium and mercury are placed in the d-block but are not regarded as typical transition elements. Explain, giving the configurations of the zinc atom and the Zn²⁺ ion.',
  model: 'They are in the d-block because their last electrons enter an (n−1)d subshell. Zn is [Ar]3d¹⁰4s² and Zn²⁺ is [Ar]3d¹⁰; Cd and Hg are similar. Neither the atoms nor their common ions have an incompletely filled d subshell, so they lack typical transition properties (their compounds are white and diamagnetic, and they show essentially one oxidation state).',
  sol: 'd-block position; d¹⁰ in atom and ion.',
  scheme: [['d-block: (n−1)d subshell filled', 1], ['d¹⁰ in atom and ion, so not transition', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('agcu-short', short({
  marks: 2,
  stem: 'Silver (Z = 47) has the configuration [Kr]4d¹⁰5s¹, yet it is counted as a transition element. Explain, with reference to silver(II) fluoride, AgF₂.',
  model: 'A transition element needs an incomplete d subshell in the atom or in one of its ions. The silver atom has a full 4d¹⁰ set, but in AgF₂ silver is Ag²⁺, with configuration [Kr]4d⁹ — an incompletely filled d subshell. Hence silver is a transition element.',
  sol: 'Ag²⁺ is 4d⁹.',
  scheme: [['Definition applied to ions', 1], ['Ag²⁺ in AgF₂ is 4d⁹', 1]],
  d: 3, c: 'analysis', t: [1],
}));
add('w-short', short({
  marks: 2,
  stem: 'Molybdenum (Z = 42) and tungsten (Z = 74) lie in the same group as chromium. Write their ground-state configurations and comment on the difference between them.',
  model: 'Mo: [Kr]4d⁵5s¹, which resembles Cr (3d⁵4s¹) — a half-filled d subshell. W: [Xe]4f¹⁴5d⁴6s², which does not follow the d⁵s¹ pattern. In the heavier series the (n−1)d and ns energies are so close that configurations do not follow a simple rule.',
  sol: 'Mo 4d⁵5s¹; W 5d⁴6s².',
  scheme: [['Both configurations', 1], ['Comment on d/s energies', 1]],
  d: 3, c: 'analysis', t: [1],
}));
add('ions-short3', short({
  marks: 3,
  stem: 'Write the electronic configurations of V³⁺ (V, Z = 23), Mn⁴⁺ (Mn, Z = 25) and Cu²⁺ (Cu, Z = 29), and state the number of unpaired electrons in each.',
  model: 'V [Ar]3d³4s² → V³⁺ [Ar]3d²: 2 unpaired. Mn [Ar]3d⁵4s² → Mn⁴⁺ [Ar]3d³: 3 unpaired. Cu [Ar]3d¹⁰4s¹ → Cu²⁺ [Ar]3d⁹: 1 unpaired.',
  sol: '3d², 2; 3d³, 3; 3d⁹, 1.',
  scheme: [['V³⁺ 3d², 2 unpaired', 1], ['Mn⁴⁺ 3d³, 3 unpaired', 1], ['Cu²⁺ 3d⁹, 1 unpaired', 1]],
  d: 2, c: 'application', t: [1],
}));

// ---------------------------------------------------------------- t02 metallic character, radii, ionisation enthalpy
add('trend-mcq', mcq({
  stem: 'The first ionisation enthalpy of zinc (906 kJ mol⁻¹) is much higher than that of copper (745 kJ mol⁻¹). The best explanation is:',
  right: 'zinc loses an electron from a completely filled 4s² subshell lying outside a full 3d¹⁰ set',
  wrong: ['zinc has a larger atomic radius than copper', 'zinc has fewer protons than copper', 'zinc’s outermost electron is in a 4p orbital'],
  sol: 'Zn is 3d¹⁰4s²: filled subshells are particularly stable, so ionisation needs more energy — option (@K).',
  d: 3, c: 'understanding', t: [2],
}));
add('mp-mcq', mcq({
  stem: 'Among vanadium, chromium, copper and zinc, which metal has the lowest melting point, and why?',
  right: 'Zinc, because its filled 3d subshell takes no part in metallic bonding',
  wrong: ['Vanadium, because it has the fewest d electrons', 'Chromium, because its d subshell is half-filled', 'Copper, because it is a good conductor of electricity'],
  sol: 'Zn (3d¹⁰4s²) bonds only through its 4s electrons, so its metallic bonding is weak (m.p. about 420 °C) — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('density-mcq', mcq({
  stem: 'The density of the 3d metals rises from about 3.0 g cm⁻³ for scandium to about 8.9 g cm⁻³ for copper. The main reason is that:',
  right: 'atomic mass increases while the atomic radius falls or stays nearly constant',
  wrong: ['the number of 4s electrons increases steadily', 'the metals become more reactive along the series', 'the atomic radius increases sharply along the series'],
  sol: 'More mass packed into a similar or smaller volume gives a higher density — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('ie2-mcq', mcq({
  stem: 'Of zinc, manganese, iron and copper, which has the highest second ionisation enthalpy?',
  right: 'Copper',
  wrong: ['Zinc', 'Manganese', 'Iron'],
  sol: 'Cu⁺ is 3d¹⁰; the second electron must come from a filled d subshell (ΔiH₂ about 1958 kJ mol⁻¹) — option (@K).',
  d: 3, c: 'application', t: [2],
}));
add('ionic-radius-mcq', mcq({
  stem: 'Which of the ions Mn²⁺, Fe²⁺, Co²⁺ and Ni²⁺ (high-spin, in aqueous solution) has the smallest radius?',
  right: 'Ni²⁺',
  wrong: ['Mn²⁺', 'Fe²⁺', 'Co²⁺'],
  sol: 'For ions of the same charge the radius decreases gradually as the nuclear charge increases: Ni²⁺ (about 69 pm) is smallest — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('radius-ar', ar({
  a: 'Zirconium (160 pm) and hafnium (159 pm) have almost the same atomic radius.',
  r: 'Hafnium atoms have one more electron shell than zirconium atoms.',
  key: 'b',
  sol: 'Both statements are true, but an extra shell would make hafnium larger; the similar size is due to the lanthanoid contraction, so R does not explain A — option (b).',
  d: 3, c: 'analysis', t: [2],
}));
add('hg-tf', tf({
  stem: 'Mercury is a liquid at room temperature because its filled 5d¹⁰6s² electrons take very little part in metallic bonding.',
  key: 't',
  sol: 'True. With no unpaired d electrons, the metallic bonding in mercury is very weak.',
  d: 2, c: 'understanding', t: [2],
}));
add('ie-num', num({
  marks: 2,
  stem: r`The first and second ionisation enthalpies of copper are $745\ \text{kJ mol}^{-1}$ and $1958\ \text{kJ mol}^{-1}$. Calculate the energy, in kJ, needed to convert $0.50\ \text{mol}$ of gaseous copper atoms into gaseous Cu²⁺ ions.`,
  value: 1351.5, tol: 1, unit: 'kJ',
  sol: r`Energy per mole $= 745 + 1958 = 2703\ \text{kJ}$; for 0.50 mol: $E = 0.50 \times 2703 = 1351.5\ \text{kJ}$.`,
  scheme: [['Sum of ionisation enthalpies 2703 kJ/mol', 1], ['× 0.50 = 1351.5 kJ', 1]],
  d: 2, c: 'application', t: [2],
}), () => near(0.5 * (745 + 1958), 1351.5) || 'ie');
add('radius-short', short({
  marks: 2,
  stem: 'The metallic radii of chromium, iron, cobalt, nickel and copper all lie between 125 and 129 pm. Explain why they are so similar.',
  model: 'Across the series each added electron enters the inner 3d subshell while the nuclear charge rises by one. The 3d electrons shield the outer 4s electrons and repel one another, so the increased attraction is almost cancelled. The effective pull on the outer electrons hardly changes, and the radius stays nearly constant.',
  sol: 'Extra charge balanced by 3d shielding and repulsion.',
  scheme: [['Electron added to inner 3d', 1], ['Shielding/repulsion balances nuclear charge', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('hardness-short', short({
  marks: 2,
  stem: 'Explain why transition metals such as vanadium and chromium are hard with high enthalpies of atomisation, and why these values are highest near the middle of each series.',
  model: 'Besides the ns electrons, unpaired (n−1)d electrons take part in metallic bonding, giving strong bonds, hardness and high enthalpies of atomisation. The number of unpaired d electrons is largest near the middle of the series (about d⁵), so bonding — and the enthalpy of atomisation — is greatest there; it falls as d electrons pair up.',
  sol: 'Unpaired d electrons in bonding; maximum mid-series.',
  scheme: [['d electrons join metallic bonding', 1], ['Most unpaired d electrons mid-series', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('ie-short3', short({
  marks: 3,
  stem: 'The first ionisation enthalpies (kJ mol⁻¹) of Cr, Mn and Fe are 653, 717 and 762; their second ionisation enthalpies are 1592, 1509 and 1561. Explain (a) why the second ionisation enthalpy of Cr is higher than that of Mn, and (b) why the first values rise only slowly.',
  model: '(a) Cr⁺ is 3d⁵: removing a second electron breaks a stable half-filled subshell, which needs extra energy. Mn⁺ is 3d⁵4s¹: its second electron comes from 4s and leaves the stable 3d⁵ set, so ΔiH₂ is lower. (b) As the nuclear charge rises by one, the added electron goes into the inner 3d subshell and shields the 4s electrons, so the effective nuclear charge on the outer electron increases only slightly.',
  sol: 'Cr⁺ d⁵ broken; Mn⁺ loses 4s; shielding.',
  scheme: [['(a) Cr⁺ 3d⁵ broken', 1], ['(a) Mn⁺ loses 4s, leaves 3d⁵', 1], ['(b) Shielding by 3d electrons', 1]],
  d: 3, c: 'analysis', t: [2],
}));
add('lanth-short3', short({
  marks: 3,
  stem: 'The atomic radii of titanium, zirconium and hafnium are 147, 160 and 159 pm. Explain the change from titanium to zirconium and from zirconium to hafnium, and state one consequence for zirconium and hafnium.',
  model: 'Ti to Zr: zirconium has an extra electron shell, so it is larger. Zr to Hf: between them come the fourteen lanthanoids, whose 4f electrons shield poorly; the steady increase in effective nuclear charge (lanthanoid contraction) cancels the effect of the extra shell, so Hf is the same size as Zr. Consequence: Zr and Hf have very similar chemical properties and occur together, so they are very hard to separate.',
  sol: 'Extra shell; lanthanoid contraction; hard to separate.',
  scheme: [['Ti → Zr: extra shell', 1], ['Zr ≈ Hf: lanthanoid contraction', 1], ['Consequence', 1]],
  d: 3, c: 'analysis', t: [2],
}));

// ---------------------------------------------------------------- t03 oxidation states
add('oxstate-mcq', mcq({
  stem: 'Scandium shows only the +3 oxidation state in its compounds, such as ScCl₃. The best reason is that:',
  right: 'Sc³⁺ has the stable noble-gas configuration of argon',
  wrong: ['Sc³⁺ has a half-filled 3d subshell', 'scandium has three unpaired 3d electrons', 'the 4s electrons of scandium cannot be removed'],
  sol: 'Sc [Ar]3d¹4s² loses all three outer electrons to reach [Ar] — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('ni-co-mcq', mcq({
  stem: 'In nickel tetracarbonyl, Ni(CO)₄, formed in the Mond process for purifying nickel, the oxidation state of nickel is:',
  right: '0',
  wrong: ['+2', '+4', '−4'],
  sol: 'CO is a neutral ligand and the compound is neutral, so nickel is in the zero state — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('cr-states-mcq', mcq({
  stem: 'Blue solutions of chromium(II) salts quickly turn green on standing in air. This shows that:',
  right: 'Cr²⁺ is a reducing agent that is oxidised to the more stable Cr³⁺ (3d³)',
  wrong: ['Cr²⁺ is an oxidising agent that is reduced to chromium metal', 'Cr³⁺ is less stable than Cr²⁺ in water', 'chromium shows only one oxidation state in water'],
  sol: 'Cr²⁺ (3d⁴) loses an electron to oxygen to form green Cr³⁺ (stable 3d³) — option (@K).',
  d: 3, c: 'application', t: [3],
}));
add('fluoride-mcq', mcq({
  stem: 'Why does the highest oxidation state of a 3d metal often appear in an oxide or fluoride, such as VF₅ or Mn₂O₇?',
  right: 'Oxygen and fluorine are small and highly electronegative, so they stabilise high oxidation states',
  wrong: ['Oxygen and fluorine are good reducing agents', 'Oxides and fluorides are always ionic', 'Oxygen and fluorine have vacant d orbitals'],
  sol: 'Small, very electronegative atoms (and multiple bonding by oxygen) stabilise high states — option (@K).',
  d: 3, c: 'understanding', t: [3],
}));
add('cu1-mcq', mcq({
  stem: 'In water, Cu⁺ disproportionates into Cu and Cu²⁺ although Cu⁺ has a stable 3d¹⁰ configuration. The main reason is that:',
  right: 'the much larger hydration enthalpy of Cu²⁺ more than compensates for the second ionisation enthalpy of copper',
  wrong: ['Cu²⁺ has a completely filled 3d subshell', 'Cu⁺ is a stronger reducing agent than copper metal', 'Cu²⁺ is smaller and so cannot be hydrated'],
  sol: 'Small, doubly charged Cu²⁺ is strongly hydrated; this energy outweighs ΔiH₂ — option (@K).',
  d: 4, c: 'analysis', t: [3],
}));
add('mn-ar', ar({
  a: 'Manganese(III) acetate acts as a strong oxidising agent in aqueous solution.',
  r: 'Mn³⁺ readily gains an electron to reach the stable half-filled 3d⁵ configuration of Mn²⁺.',
  key: 'a',
  sol: 'Both are true; the drive to reach d⁵ Mn²⁺ explains why Mn³⁺ oxidises — option (a).',
  d: 3, c: 'analysis', t: [3],
}));
add('oxide-tf', tf({
  stem: 'Manganese(II) oxide, MnO, is basic, while manganese(VII) oxide, Mn₂O₇, is acidic.',
  key: 't',
  sol: 'True. Oxides in low oxidation states are basic; those in high oxidation states are acidic.',
  d: 2, c: 'understanding', t: [3],
}));
add('mn-max-fill', fill({
  stem: 'The highest oxidation state of manganese, found in the purple permanganate ion, is +___.',
  acc: [['7', 'seven']],
  sol: 'Manganese uses all five 3d and two 4s electrons: **+7**.',
  d: 1, c: 'recall', t: [3],
}));
add('vanadate-num', num({
  marks: 1,
  stem: r`Calculate the oxidation state of vanadium in the orthovanadate ion, VO₄³⁻.`,
  value: 5, tol: 0, unit: null,
  sol: r`Let the oxidation state be $x$: $x + 4(-2) = -3$, so $x = -3 + 8 = 5$. Vanadium is in the +5 state.`,
  scheme: [['+5', 1]],
  d: 1, c: 'application', t: [3],
}), () => near(-3 + 8, 5) || 'ox');
add('fe-short', short({
  marks: 2,
  stem: 'Pale green iron(II) sulfate solution slowly turns yellow-brown when left open to the air. Explain using electronic configurations.',
  model: 'Fe²⁺ is [Ar]3d⁶ and Fe³⁺ is [Ar]3d⁵. Fe³⁺, with a half-filled d subshell, is more stable, so atmospheric oxygen oxidises Fe²⁺ to Fe³⁺; the yellow-brown colour is that of iron(III) species.',
  sol: 'Fe²⁺ d⁶ oxidised to more stable d⁵ Fe³⁺.',
  scheme: [['Configurations d⁶ and d⁵', 1], ['d⁵ more stable, so oxidised', 1]],
  d: 2, c: 'application', t: [3],
}));
add('states-short3', short({
  marks: 3,
  stem: 'Explain (a) why transition elements show variable oxidation states, (b) why the number of oxidation states in the 3d series rises up to manganese and then falls, and (c) why MnO is basic but Mn₂O₇ is acidic.',
  model: '(a) The (n−1)d and ns electrons have similar energies, so different numbers of them can be used in bonding. (b) Up to Mn the maximum state equals the total of 3d and 4s electrons (Mn +7); after Mn the d electrons are increasingly paired and held more strongly, so fewer are available and the maximum falls. (c) In MnO (+2) the metal behaves like a typical metal ion, giving a basic oxide; in Mn₂O₇ (+7) the highly charged centre forms covalent bonds with oxygen and the oxide reacts with water to give an acid (HMnO₄).',
  sol: 'Close energies; pairing after Mn; low state basic, high state acidic.',
  scheme: [['(a) Close d and s energies', 1], ['(b) Total electrons up to Mn; pairing after', 1], ['(c) Low state basic, high state acidic', 1]],
  d: 3, c: 'understanding', t: [3],
}));
add('stability-short3', short({
  marks: 3,
  stem: 'Using electronic configurations, explain: (a) Mn²⁺ salts are more stable than Mn³⁺ salts; (b) iron(III) chloride is more stable than iron(II) chloride in air; (c) titanium(IV) chloride is colourless. (Z: Ti 22, Mn 25, Fe 26)',
  model: '(a) Mn²⁺ is 3d⁵ (half-filled, extra stable); Mn³⁺ is 3d⁴ and tends to gain an electron. (b) Fe³⁺ is 3d⁵ (half-filled) while Fe²⁺ is 3d⁶, so Fe²⁺ is oxidised to Fe³⁺. (c) Ti⁴⁺ is 3d⁰: with no d electrons there is no d–d transition, so no visible light is absorbed.',
  sol: 'd⁵ stability twice; d⁰ colourless.',
  scheme: [['(a) Mn²⁺ d⁵', 1], ['(b) Fe³⁺ d⁵', 1], ['(c) Ti⁴⁺ d⁰, no d–d transition', 1]],
  d: 3, c: 'application', t: [3, 4],
}));

// ---------------------------------------------------------------- t04 colour and magnetism
add('colour-mcq', mcq({
  stem: 'Four aqueous solutions contain Sc³⁺, Zn²⁺, V³⁺ and Ti⁴⁺ respectively. Which solution is coloured, and why?',
  right: 'The V³⁺ solution, because its two 3d electrons can undergo d–d transitions',
  wrong: ['The Zn²⁺ solution, because zinc has ten 3d electrons', 'The Sc³⁺ solution, because the ion has a high charge', 'The Ti⁴⁺ solution, because the ion is very small'],
  sol: 'Only V³⁺ (3d²) has a partly filled d subshell; Sc³⁺ and Ti⁴⁺ are d⁰ and Zn²⁺ is d¹⁰ — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('mu-fe2-mcq', mcq({
  stem: 'Which of the ions Fe²⁺, V³⁺, Cu²⁺ and Mn²⁺ has a spin-only magnetic moment of 4.90 BM? (Z: V 23, Mn 25, Fe 26, Cu 29)',
  right: 'Fe²⁺',
  wrong: ['V³⁺', 'Cu²⁺', 'Mn²⁺'],
  sol: '4.90 BM = √24, so n = 4. Fe²⁺ (3d⁶) has four unpaired electrons — option (@K). V³⁺ has 2, Cu²⁺ 1, Mn²⁺ 5.',
  d: 3, c: 'application', t: [4],
}));
add('complementary-mcq', mcq({
  stem: 'Aqueous Ti³⁺ ions absorb green-yellow light near 500 nm and appear purple. The colour arises because:',
  right: 'the single 3d electron is promoted to a higher set of d orbitals and the light not absorbed is seen',
  wrong: ['the ion emits purple light when heated', 'the 4s electron is removed by light', 'the ion reflects all wavelengths equally'],
  sol: 'A d–d transition absorbs part of the visible spectrum; we see the complementary colour — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('ferro-mcq', mcq({
  stem: 'A piece of cobalt is strongly attracted by a magnet and stays magnetised after the magnet is removed. This behaviour is called:',
  right: 'ferromagnetism',
  wrong: ['diamagnetism', 'weak paramagnetism', 'antiferromagnetism'],
  sol: 'Fe, Co and Ni show permanent magnetisation from aligned domains — option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('sc-ar', ar({
  a: 'Aqueous solutions of scandium(III) sulfate are coloured.',
  r: 'The Sc³⁺ ion has no d electrons.',
  key: 'd',
  sol: 'A is false: Sc³⁺ salts are colourless. R is true, and it explains why no d–d transition is possible — option (d).',
  d: 2, c: 'understanding', t: [4],
}));
add('cu1-tf', tf({
  stem: 'Copper(I) iodide is white because the Cu⁺ ion has a completely filled 3d subshell.',
  key: 't',
  sol: 'True. Cu⁺ is 3d¹⁰, so no d–d transition can occur.',
  d: 2, c: 'understanding', t: [4],
}));
add('bm-fill', fill({
  stem: 'Spin-only magnetic moments of ions such as Cr³⁺ are expressed in Bohr ___.',
  acc: [['magnetons', 'magneton']],
  sol: 'Bohr **magnetons** (BM).',
  d: 1, c: 'recall', t: [4],
}));
add('colour-match', match({
  stem: 'Match each hydrated 3d ion with the colour of its dilute aqueous solution.',
  pairs: [
    ['Cu²⁺', 'Blue'],
    ['Ni²⁺', 'Green'],
    ['Co²⁺', 'Pink'],
    ['Ti³⁺', 'Purple'],
  ],
  order: [3, 1, 0, 2],
  sol: 'Cu²⁺ blue; Ni²⁺ green; Co²⁺ pink; Ti³⁺ purple.',
  d: 1, c: 'recall', t: [4],
}));
add('mn3-num', num({
  marks: 2,
  stem: r`Manganese(III) acetate is used as an oxidant in organic synthesis. Calculate the spin-only magnetic moment of the Mn³⁺ ion (Mn, Z = 25), in BM.`,
  value: 4.90, tol: 0.02, unit: 'BM',
  sol: r`Mn³⁺ is [Ar]3d⁴: four unpaired electrons, $n = 4$. $\mu = \sqrt{4 \times 6} = \sqrt{24} \approx 4.90\ \text{BM}$.`,
  scheme: [['n = 4', 1], ['μ ≈ 4.90 BM', 1]],
  d: 2, c: 'application', t: [4],
}), () => near(mu(4), 4.90, 0.002) || 'mu');
add('cuso4-num', num({
  marks: 2,
  stem: r`Blue crystals of copper(II) sulfate pentahydrate are weakly attracted by a strong magnet. Calculate the spin-only magnetic moment of the Cu²⁺ ion (Cu, Z = 29), in BM.`,
  value: 1.73, tol: 0.01, unit: 'BM',
  sol: r`Cu²⁺ is [Ar]3d⁹: one unpaired electron, $n = 1$. $\mu = \sqrt{1 \times 3} = \sqrt{3} \approx 1.73\ \text{BM}$.`,
  scheme: [['n = 1', 1], ['μ ≈ 1.73 BM', 1]],
  d: 2, c: 'application', t: [4],
}), () => near(mu(1), 1.73, 0.002) || 'mu');
add('unpaired-num', num({
  marks: 2,
  stem: r`A violet salt of vanadium has a measured magnetic moment of $3.87\ \text{BM}$. Using the spin-only formula, find the number of unpaired electrons in the vanadium ion.`,
  value: 3, tol: 0, unit: null,
  sol: r`$\sqrt{n(n+2)} = 3.87$, so $n(n+2) \approx 15$, i.e. $n^2 + 2n - 15 = 0$. Then $n = \dfrac{-2 + \sqrt{4 + 60}}{2} = \dfrac{-2 + 8}{2} = 3$. Three unpaired electrons (V²⁺, 3d³).`,
  scheme: [['n(n+2) = 15', 1], ['n = 3', 1]],
  d: 3, c: 'application', t: [4],
}), () => near((-2 + Math.sqrt(4 + 60)) / 2, 3) || 'n');
add('mu-short', short({
  marks: 2,
  stem: 'A salt of cobalt has a measured magnetic moment of 3.87 BM. Find the number of unpaired electrons and decide whether the cobalt is present as Co²⁺ or as high-spin Co³⁺. (Co, Z = 27)',
  model: 'μ = √(n(n+2)) = 3.87 gives n(n+2) = 15, so n = 3. Co²⁺ is 3d⁷ (five orbitals singly filled, two paired): 3 unpaired. High-spin Co³⁺ is 3d⁶: 4 unpaired (4.90 BM). The salt contains Co²⁺.',
  sol: 'n = 3; Co²⁺.',
  scheme: [['n = 3', 1], ['Co²⁺ (3d⁷) not Co³⁺ (3d⁶, 4 unpaired)', 1]],
  d: 3, c: 'analysis', t: [4],
}));
add('cuso4-short', short({
  marks: 2,
  stem: 'Anhydrous copper(II) sulfate is a white powder, but it turns blue when water is added to it. Explain.',
  model: 'In the hydrate, water molecules act as ligands around Cu²⁺ (3d⁹) and split the d orbitals into sets of different energy. A d electron absorbs red-orange light and is promoted (d–d transition), so the complementary blue colour is seen. Without water ligands the splitting is not suitable for absorbing visible light, so the anhydrous salt is white.',
  sol: 'Water ligands split d orbitals; d–d transition.',
  scheme: [['Water ligands split d orbitals', 1], ['d–d transition; complementary colour', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('mu-short3', short({
  marks: 3,
  stem: 'Calculate the spin-only magnetic moments of Cr³⁺ (Z = 24), Fe²⁺ (Z = 26) and Cu⁺ (Z = 29). Which of these ions would be weakly repelled by a magnet?',
  model: 'Cr³⁺ 3d³, n = 3: μ = √15 ≈ 3.87 BM. Fe²⁺ 3d⁶, n = 4: μ = √24 ≈ 4.90 BM. Cu⁺ 3d¹⁰, n = 0: μ = 0. Cu⁺ is diamagnetic, so it is weakly repelled.',
  sol: '3.87; 4.90; 0, Cu⁺ diamagnetic.',
  scheme: [['Cr³⁺ 3.87 BM', 1], ['Fe²⁺ 4.90 BM', 1], ['Cu⁺ 0, diamagnetic', 1]],
  d: 2, c: 'application', t: [4],
}));
add('colour-short3', short({
  marks: 3,
  stem: 'A solution of hydrated Ni²⁺ ions looks green. (a) What happens to the d electrons of Ni²⁺ when white light passes through the solution? (b) Why is the colour seen different from the colour absorbed? (c) Why does a solution of zinc sulfate show no colour?',
  model: '(a) Water ligands split the 3d orbitals of Ni²⁺ (3d⁸); an electron absorbs light of a particular visible wavelength and is promoted to the higher set (d–d transition). (b) The light that is not absorbed passes through; we see this transmitted, complementary colour (green), not the absorbed colour (red/violet). (c) Zn²⁺ is 3d¹⁰: the d orbitals are full, so no d–d transition is possible and no visible light is absorbed.',
  sol: 'd–d transition; complementary colour; Zn²⁺ d¹⁰.',
  scheme: [['(a) d–d transition', 1], ['(b) Complementary colour seen', 1], ['(c) Zn²⁺ d¹⁰', 1]],
  d: 3, c: 'application', t: [4],
}));

// ---------------------------------------------------------------- t05 catalysis, complexes, interstitial compounds, alloys
add('catalysis-mcq', mcq({
  stem: 'A few drops of iron(III) solution greatly speed up the reaction between iodide and peroxodisulfate ions. The iron ions act mainly by:',
  right: 'switching between the +3 and +2 states, carrying electrons from iodide to peroxodisulfate',
  wrong: ['adsorbing iodine molecules on their surface', 'raising the temperature of the mixture', 'forming an alloy with iodine'],
  sol: 'Fe³⁺ oxidises I⁻ and is reduced to Fe²⁺, which peroxodisulfate re-oxidises — option (@K).',
  d: 3, c: 'application', t: [5],
}));
add('haber-mcq', mcq({
  stem: 'Which catalyst is used in the Haber process for N₂ + 3H₂ ⇌ 2NH₃?',
  right: 'Iron, with molybdenum as promoter',
  wrong: ['Vanadium pentoxide', 'Finely divided nickel', 'Platinum–rhodium gauze'],
  sol: 'Iron (promoted by Mo) — option (@K). V₂O₅ is for the contact process (@1).',
  d: 1, c: 'recall', t: [5],
}));
add('interstitial-mcq', mcq({
  stem: 'Titanium carbide, TiC, used to coat cutting tools, is an interstitial compound. Which property would you expect it to have?',
  right: 'A very high melting point and great hardness',
  wrong: ['A low melting point and softness', 'High solubility in water as an ionic salt', 'No electrical conductivity at all'],
  sol: 'Small carbon atoms in the lattice holes make the solid harder and higher-melting, while it keeps metallic conductivity — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('stainless-mcq', mcq({
  stem: 'Stainless steel, used for surgical instruments, resists rusting. Besides iron, its main alloying metals are:',
  right: 'chromium and nickel',
  wrong: ['copper and zinc', 'copper and tin', 'lead and tin'],
  sol: 'Stainless steel contains Cr (and Ni) — option (@K); Cu/Zn is brass (@1).',
  d: 1, c: 'recall', t: [5],
}));
add('alloy-ar', ar({
  a: 'Transition metals readily form alloys such as brass and nichrome with one another.',
  r: 'All transition metals have the same number of d electrons.',
  key: 'c',
  sol: 'A is true; R is false — the d electron count varies. Alloys form because the atomic radii are similar — option (c).',
  d: 2, c: 'understanding', t: [5],
}));
add('interstitial-tf', tf({
  stem: 'Interstitial compounds such as Mn₄N are softer and lower-melting than the pure metal.',
  key: 'f',
  sol: 'False. They are harder and have higher melting points than the parent metal.',
  d: 1, c: 'understanding', t: [5],
}));
add('brass-num', num({
  marks: 1,
  stem: r`A brass tap has a mass of $250\ \text{g}$ and contains 35% zinc by mass; the rest is copper. Calculate the mass of copper in the tap, in grams.`,
  value: 162.5, tol: 0.5, unit: 'g',
  sol: r`Copper is $100 - 35 = 65\%$: mass $= 250 \times 0.65 = 162.5\ \text{g}$.`,
  scheme: [['162.5 g', 1]],
  d: 1, c: 'application', t: [5],
}), () => near(250 * 0.65, 162.5) || 'brass');
add('catalyst-short', short({
  marks: 2,
  stem: 'Nickel is used to hydrogenate vegetable oil into vanaspati, while vanadium pentoxide catalyses the oxidation of sulfur dioxide in the contact process. State the property of each catalyst that explains its action.',
  model: 'Nickel: its finely divided surface adsorbs hydrogen and the oil molecules, weakening their bonds and bringing them together, which lowers the activation energy. V₂O₅: vanadium changes oxidation state — V₂O₅ oxidises SO₂ and is reduced to V₂O₄, which air re-oxidises — so it works through variable oxidation states.',
  sol: 'Ni: surface adsorption; V₂O₅: variable oxidation states.',
  scheme: [['Ni: adsorption on surface', 1], ['V₂O₅: variable oxidation states', 1]],
  d: 2, c: 'application', t: [5],
}));
add('interstitial-short3', short({
  marks: 3,
  stem: 'What are interstitial compounds of transition metals? Give two examples and three of their characteristic properties.',
  model: 'They form when small atoms such as H, B, C or N occupy the holes (interstices) in the crystal lattice of a transition metal. Examples: TiC, Mn₄N, Fe₃H, VH₀.₅₆. Properties (any three): high melting points, higher than the pure metal; very hard; retain metallic conductivity; chemically inert; often non-stoichiometric.',
  sol: 'Definition; TiC, Mn₄N; hard, high-melting, conducting.',
  scheme: [['Definition', 1], ['Two examples', 1], ['Three properties', 1]],
  d: 1, c: 'recall', t: [5],
}));
add('alloy-short3', short({
  marks: 3,
  stem: 'Explain why transition metals readily form alloys. Name one alloy of copper and one alloy of nickel, giving the composition and one use of each.',
  model: 'Transition metal atoms have similar atomic radii and similar metallic bonding, so atoms of one metal can take the place of another in the crystal lattice. Copper: brass (Cu and Zn), used for taps and fittings — or bronze (Cu and Sn), for statues and medals. Nickel: nichrome (Ni and Cr), used for heating elements — or stainless steel (Fe, Cr, Ni), for cutlery.',
  sol: 'Similar radii; brass; nichrome.',
  scheme: [['Similar radii, substitution', 1], ['Copper alloy with composition and use', 1], ['Nickel alloy with composition and use', 1]],
  d: 2, c: 'understanding', t: [5],
}));

// ---------------------------------------------------------------- long answers
add('config-long', long({
  stem: '(a) Define a transition element. Is copper a transition element? Give a reason. [1]\n\n(b) Write the ground-state configurations of chromium (Z = 24) and molybdenum (Z = 42), and explain why each has only one outer s electron. [2]\n\n(c) Explain the variation of atomic radius across the 3d series, and why the 4d and 5d elements of a group have almost the same radius. [2]',
  model: '(a) An element with an incompletely filled d subshell in its atom or in a common ion. Copper is one: the atom is 3d¹⁰4s¹ but Cu²⁺ is 3d⁹.\n\n(b) Cr: [Ar]3d⁵4s¹; Mo: [Kr]4d⁵5s¹. The (n−1)d and ns levels are very close in energy, and a half-filled d⁵ subshell has extra stability (exchange energy), so one s electron moves into the d subshell.\n\n(c) The radius falls at first as the nuclear charge increases, then stays almost constant because each added 3d electron shields the outer electrons and repels the other d electrons, balancing the extra nuclear charge. In a group, the 5d elements come after the lanthanoids; the poor shielding of 4f electrons causes the lanthanoid contraction, which cancels the expected increase in size, so 4d and 5d radii are almost equal (Zr 160 pm, Hf 159 pm).',
  sol: 'Definition; Cr and Mo d⁵s¹; radii trend and lanthanoid contraction.',
  scheme: [['(a) Definition and Cu²⁺ 3d⁹', 1], ['(b) Both configurations', 1], ['(b) Stability of d⁵, close energies', 1], ['(c) Trend across series', 1], ['(c) Lanthanoid contraction', 1]],
  d: 3, c: 'understanding', t: [1, 2],
}));
add('ie-long', long({
  stem: '(a) Explain why the first ionisation enthalpies of the 3d elements increase only slightly from scandium to copper. [1]\n\n(b) The third ionisation enthalpy of manganese (3248 kJ mol⁻¹) is higher than that of iron (2957 kJ mol⁻¹). Explain. [2]\n\n(c) Melting points (°C): Ti 1668, V 1910, Cr 1907, Mn 1246, Fe 1538, Zn 420. Explain the high values for V and Cr and the low value for Zn. [2]',
  model: '(a) Each additional electron enters the inner 3d subshell and shields the outer 4s electrons, almost cancelling the increase in nuclear charge, so the effective nuclear charge on the 4s electron rises only slightly.\n\n(b) Mn²⁺ is 3d⁵ (half-filled, extra stable); removing a third electron breaks this arrangement and needs more energy. Fe²⁺ is 3d⁶; removing one electron gives the stable 3d⁵ Fe³⁺, so less energy is needed.\n\n(c) V (3d³4s²) and Cr (3d⁵4s¹) have many unpaired d electrons that take part in metallic bonding, so bonding is strong and melting points are high. Zn (3d¹⁰4s²) has no unpaired d electrons; only the 4s electrons bond, so its metallic bonding is weak and the melting point is low. (Mn is lower than expected because of its stable d⁵ arrangement and complex structure.)',
  sol: 'Shielding; Mn²⁺ d⁵ vs Fe²⁺ d⁶; unpaired d electrons in bonding.',
  scheme: [['(a) Shielding by 3d electrons', 1], ['(b) Mn²⁺ d⁵ broken', 1], ['(b) Fe²⁺ → d⁵ Fe³⁺', 1], ['(c) V, Cr: unpaired d electrons', 1], ['(c) Zn: d¹⁰, weak bonding', 1]],
  d: 4, c: 'analysis', t: [2],
}));
add('ox-long', long({
  stem: '(a) List the oxidation states shown by manganese and explain why +7 is the maximum. [1½]\n\n(b) Cu⁺ has a stable 3d¹⁰ configuration, yet Cu²⁺ is the more stable ion in aqueous solution. Explain. [2]\n\n(c) Of Ti²⁺, Ti³⁺ and Ti⁴⁺ (Ti, Z = 22), which is most stable, and which gives a colourless solution? Give reasons. [1½]',
  model: '(a) +2, +3, +4, +5, +6 and +7. Mn is 3d⁵4s²: using all seven 3d and 4s electrons gives +7, so no higher state is possible.\n\n(b) Although forming Cu²⁺ needs the large second ionisation enthalpy, Cu²⁺ is small and doubly charged, so its hydration enthalpy is much more negative than that of Cu⁺. This extra hydration energy outweighs the ionisation energy, so Cu²⁺(aq) is more stable and Cu⁺(aq) disproportionates: 2Cu⁺ → Cu²⁺ + Cu.\n\n(c) Ti⁴⁺ (3d⁰, the noble-gas configuration of argon) is the most stable. It is also colourless, because with no d electrons no d–d transition can occur.',
  sol: '+2 to +7; hydration enthalpy; Ti⁴⁺.',
  scheme: [['(a) States and reason for +7', 1.5], ['(b) Hydration enthalpy of Cu²⁺', 1], ['(b) Outweighs ΔiH₂; disproportionation', 1], ['(c) Ti⁴⁺ most stable and colourless, d⁰', 1.5]],
  d: 4, c: 'analysis', t: [3, 4],
}));
add('magcol-long', long({
  stem: '(a) Distinguish between paramagnetic and diamagnetic substances and write the spin-only formula for magnetic moment. [1]\n\n(b) Calculate the spin-only magnetic moments of V²⁺ (V, Z = 23) and Cr²⁺ (Cr, Z = 24). [2]\n\n(c) Explain why aqueous Ti³⁺ is purple but aqueous Ti⁴⁺ is colourless. [2]',
  model: '(a) Paramagnetic substances have unpaired electrons and are attracted into a magnetic field; diamagnetic substances have all electrons paired and are weakly repelled. μ = √(n(n+2)) BM.\n\n(b) V²⁺: 3d³, n = 3, μ = √15 ≈ 3.87 BM. Cr²⁺: 3d⁴, n = 4, μ = √24 ≈ 4.90 BM.\n\n(c) Ti³⁺ is 3d¹. Water ligands split the d orbitals; the single d electron absorbs green-yellow light and is promoted (d–d transition), so the complementary purple colour is seen. Ti⁴⁺ is 3d⁰ — no d electron to promote — so no visible light is absorbed and the solution is colourless.',
  sol: 'Definitions and formula; 3.87 and 4.90 BM; d¹ vs d⁰.',
  scheme: [['(a) Definitions and formula', 1], ['(b) V²⁺ 3.87 BM', 1], ['(b) Cr²⁺ 4.90 BM', 1], ['(c) Ti³⁺ d¹: d–d transition', 1], ['(c) Ti⁴⁺ d⁰: colourless', 1]],
  d: 3, c: 'application', t: [4],
}));
add('props-long', long({
  stem: '(a) Iron(III) ions catalyse the oxidation of iodide ions by peroxodisulfate ions. Write the two ionic equations for the catalysed path and name the property of transition metals it shows. Give one other reason why transition metals are good catalysts. [2]\n\n(b) Why do transition metal ions form a large number of complexes? Give one example. [1½]\n\n(c) What are interstitial compounds? State two of their properties. [1½]',
  model: r`(a) $\ce{2Fe^3+ + 2I^- -> 2Fe^2+ + I2}$ and $\ce{S2O8^2- + 2Fe^2+ -> 2SO4^2- + 2Fe^3+}$. This shows variable oxidation states (Fe³⁺/Fe²⁺). Another reason: transition metals provide a surface on which reactants are adsorbed, weakening their bonds (for example nickel in hydrogenation).

(b) The ions are small and highly charged, so they attract ligand lone pairs strongly, and they have vacant d orbitals of suitable energy to accept the lone pairs. Example: the deep blue tetraamminecopper(II) ion formed from Cu²⁺ and ammonia.

(c) Compounds formed when small atoms (H, B, C, N) occupy holes in the metal lattice, e.g. TiC. Properties (any two): very hard; high melting points; metallic conductivity; chemically inert.`,
  sol: 'Two equations; variable states and adsorption; small charged ions with vacant d orbitals; interstitial compounds.',
  scheme: [['(a) Two balanced equations', 1], ['(a) Variable states; adsorption', 1], ['(b) Reasons and example', 1.5], ['(c) Definition and two properties', 1.5]],
  d: 3, c: 'application', t: [5],
}));
