// ISC 12 Chemistry ch07 Transition (d-Block) Elements — two decks: Part 1 (t01–t02) position, occurrence,
// configurations of the 3d, 4d and 5d series, metallic character, radii and ionisation enthalpy; Part 2 (t03–t05)
// oxidation states, colour and magnetism, catalysis, complexes, interstitial compounds and alloys.
import { sl, deck, table, flow, svgV, plot, r } from './lib.mjs';
import { BLOCKS } from './svgs.mjs';

export const V = {
  blocks: svgV(BLOCKS, 'Periodic table outline showing the s-block on the left, the p-block on the right, the d-block in the middle of periods 4 to 7, and the f-block as two separate rows at the bottom', 'Schematic: element symbols are left out so that the blocks stand out.'),
};

const RADII_3D = [['Sc', 164], ['Ti', 147], ['V', 135], ['Cr', 129], ['Mn', 137], ['Fe', 126], ['Co', 125], ['Ni', 125], ['Cu', 128], ['Zn', 137]];
export const radiiPlot = plot(
  {
    x: { min: 21, max: 30, label: 'Atomic number (Sc = 21 to Zn = 30)' },
    y: { min: 100, max: 180, label: 'Metallic radius (pm)' },
    series: [{ label: 'Metallic radius, 3d series', kind: 'line', points: RADII_3D.map(([, rr], i) => [21 + i, rr]) }],
  },
  'Metallic radii of the 3d series from scandium to zinc: a sharp fall from 164 picometres at scandium to about 129 at chromium, then nearly constant around 125 to 137 in the middle and end of the series',
  'Approximate values.',
);
// First ionisation enthalpies of the 3d series (kJ/mol, approximate).
export const iePlot = plot(
  {
    x: { min: 21, max: 30, label: 'Atomic number (Sc = 21 to Zn = 30)' },
    y: { min: 600, max: 950, label: 'First ionisation enthalpy (kJ mol⁻¹)' },
    series: [{ label: 'ΔiH₁, 3d series', kind: 'line', points: [[21, 631], [22, 656], [23, 650], [24, 653], [25, 717], [26, 762], [27, 758], [28, 736], [29, 745], [30, 906]] }],
  },
  'First ionisation enthalpies of the 3d elements rising slowly and irregularly from about 630 kilojoules per mole for scandium to about 760 for iron and cobalt, then jumping to about 906 for zinc',
  'Approximate values; the high value for zinc reflects its stable 3d¹⁰4s² configuration.',
);

export const deck1 = deck({
  part: 1,
  title: 'Transition (d-Block) Elements — Part 1: Position, configuration and periodic trends',
  goals: [
    'Locate the d-block in the periodic table, define a transition element and name important ores of 3d metals',
    'Write electronic configurations of 3d elements and their ions, including chromium and copper, and note anomalies in the 4d and 5d series',
    'Explain the trends in metallic character, atomic and ionic radii and ionisation enthalpy across the 3d series',
  ],
  slides: [
    sl('title', 'The transition elements', {
      b: 'Part 1 — where the d-block sits, how its electrons are arranged, and how size and ionisation enthalpy change across a series.',
      v: V.blocks,
      n: 'Namaste! Iron in bridges, copper in wiring, titanium in aircraft, chromium on taps and gold in jewellery are all d-block metals, the elements in the middle of the periodic table. In this part we locate them, write their electronic configurations, and look at how their size and ionisation enthalpy change across the first series.',
    }),
    sl('concept', 'Position and definition', {
      b: 'The **d-block** occupies groups 3–12 in periods 4–7: the **3d** (Sc–Zn), **4d** (Y–Cd), **5d** (La, Hf–Hg) and **6d** (Ac, Rf–Cn) series. A **transition element** has an **incompletely filled d subshell** in its ground state or in one of its common oxidation states. Zn, Cd and Hg (d¹⁰ in atom and common ions) are d-block elements but not typical transition elements.',
      v: table(['Series', 'Period', 'Elements', 'Subshell filled'], [['3d', '4', 'Sc to Zn', '3d'], ['4d', '5', 'Y to Cd', '4d'], ['5d', '6', 'La, Hf to Hg', '5d'], ['6d', '7', 'Ac, Rf to Cn', '6d']], 'Table of the four d-series'),
      n: 'The d-block sits between the s-block and the p-block, in groups three to twelve, with one series in each period from four to seven. A transition element has an incomplete d subshell, either in the atom or in a common ion. Copper qualifies because copper two plus is d nine; zinc does not, because both the atom and its ion have a full set of ten d electrons.',
    }),
    sl('concept', 'Occurrence of the 3d metals', {
      b: 'Most 3d metals occur combined in ores — oxides, sulfides and carbonates. Iron, titanium and manganese are abundant; copper and gold also occur native (free).',
      v: table(['Metal', 'Important ore', 'Formula'], [['Iron', 'Haematite, magnetite', 'Fe₂O₃, Fe₃O₄'], ['Titanium', 'Ilmenite, rutile', 'FeTiO₃, TiO₂'], ['Chromium', 'Chromite', 'FeCr₂O₄'], ['Manganese', 'Pyrolusite', 'MnO₂'], ['Copper', 'Copper pyrites', 'CuFeS₂'], ['Zinc', 'Zinc blende', 'ZnS'], ['Nickel', 'Pentlandite', '(Ni,Fe)₉S₈']], 'Table of ores of 3d metals with their formulae'),
      n: 'Transition metals are usually found combined with oxygen or sulfur. Iron comes from haematite and magnetite, titanium from ilmenite and rutile, chromium from chromite and manganese from pyrolusite, which we meet again when we make potassium permanganate. Copper comes mainly from copper pyrites, though, like gold, it is sometimes found as the free metal.',
    }),
    sl('concept', 'Electronic configurations of the 3d series', {
      b: r`General configuration $(n-1)d^{1\text{–}10}ns^{1\text{–}2}$. **Chromium** and **copper** are exceptions: a half-filled ($d^5$) or completely filled ($d^{10}$) subshell has extra stability (exchange energy and symmetry), and 3d and 4s are close in energy.`,
      v: table(['Element', 'Configuration', 'Element', 'Configuration'], [['Sc', '[Ar]3d¹4s²', 'Fe', '[Ar]3d⁶4s²'], ['Ti', '[Ar]3d²4s²', 'Co', '[Ar]3d⁷4s²'], ['V', '[Ar]3d³4s²', 'Ni', '[Ar]3d⁸4s²'], ['Cr', '[Ar]3d⁵4s¹', 'Cu', '[Ar]3d¹⁰4s¹'], ['Mn', '[Ar]3d⁵4s²', 'Zn', '[Ar]3d¹⁰4s²']], 'Table of the electronic configurations of the 3d elements'),
      n: 'Across the three d series, electrons enter the three d orbitals while the four s holds one or two. Chromium is three d five, four s one, and copper is three d ten, four s one, because a half-filled or completely filled d subshell is especially stable and the three d and four s levels are very close in energy. Learn these two exceptions well.',
    }),
    sl('concept', 'Configurations in the 4d and 5d series', {
      b: 'In the heavier series the (n−1)d and ns energies are even closer, so irregular configurations are more common and do not always follow the d⁵/d¹⁰ rule.',
      v: table(['Element', 'Configuration', 'Note'], [['Mo (42)', '[Kr]4d⁵5s¹', 'Like Cr'], ['Pd (46)', '[Kr]4d¹⁰5s⁰', 'No 5s electron'], ['Ag (47)', '[Kr]4d¹⁰5s¹', 'Like Cu'], ['W (74)', '[Xe]4f¹⁴5d⁴6s²', 'Unlike Cr and Mo'], ['Pt (78)', '[Xe]4f¹⁴5d⁹6s¹', 'Irregular'], ['Au (79)', '[Xe]4f¹⁴5d¹⁰6s¹', 'Like Cu and Ag']], 'Table of some configurations in the 4d and 5d series'),
      n: 'In the second and third series, the d and s levels are so close that several elements have unusual configurations. Molybdenum resembles chromium and silver resembles copper, but palladium has no five s electron at all, and tungsten, in the same group as chromium, keeps two six s electrons. You need not memorise every case, but you should recognise these as exceptions.',
    }),
    sl('example', 'Worked example: configurations of ions', {
      b: r`**Rule.** When a d-block atom forms a cation, the **ns electrons are removed first**.

**Problem.** Write the configurations of Co²⁺ (Co = 27), Cr³⁺ (Cr = 24), Ni²⁺ (Ni = 28) and Ti⁴⁺ (Ti = 22), and state which is a d⁰ ion.

**Step 1.** Co [Ar]3d⁷4s² → Co²⁺ [Ar]3d⁷. Cr [Ar]3d⁵4s¹ → Cr³⁺ [Ar]3d³.

**Step 2.** Ni [Ar]3d⁸4s² → Ni²⁺ [Ar]3d⁸. Ti [Ar]3d²4s² → Ti⁴⁺ [Ar]3d⁰ — the d⁰ ion.`,
      v: table(['Ion', 'Configuration', 'Unpaired electrons'], [['Co²⁺', '3d⁷', '3'], ['Cr³⁺', '3d³', '3'], ['Ni²⁺', '3d⁸', '2'], ['Ti⁴⁺', '3d⁰', '0']], 'Table of ion configurations and unpaired electrons'),
      n: 'The key rule: the four s electrons leave first, even though they were added first. Cobalt loses its two four s electrons to give cobalt two plus, three d seven. Chromium loses its single four s electron and two three d electrons to give three d three. Nickel two plus is three d eight, and titanium four plus has lost all four outer electrons, leaving no d electrons at all.',
    }),
    sl('check', 'Quick check: configuration of an ion', {
      b: 'Choose the correct configuration of a 3d ion.',
      n: 'Quick check. Write the atom first, then remove the four s electrons before any three d electrons.',
      chk: 'ion-mcq',
    }),
    sl('concept', 'Metallic character and physical properties', {
      b: 'All d-block elements are **metals**: lustrous, malleable, ductile, good conductors. Except Zn, Cd and Hg, they are hard with high melting and boiling points, because **unpaired d electrons join in metallic bonding**. Melting points and enthalpies of atomisation peak near the middle of each series.',
      v: table(['Property', 'Trend in 3d series', 'Reason'], [['Melting point', 'Rises to about V–Cr, then falls; Zn low', 'Number of unpaired d electrons in bonding'], ['Enthalpy of atomisation', 'Highest mid-series', 'Strong metallic bonding'], ['Density', 'Increases Sc → Cu', 'Smaller radius, larger mass'], ['Zn, Cd, Hg', 'Soft, low melting; Hg liquid', 'd¹⁰: d electrons not used']], 'Table of physical property trends in the 3d series'),
      n: 'Transition metals are typical metals but unusually hard and strong. Besides the outer s electrons, their unpaired d electrons also take part in metallic bonding, so bonding is strongest, and melting points highest, towards the middle of a series. Zinc, cadmium and mercury, with full d subshells, have weaker bonding; mercury is even a liquid at room temperature.',
    }),
    sl('diagram', 'Atomic and ionic radii', {
      b: 'Across the 3d series radii fall at first and then stay **nearly constant**: each added electron enters the inner 3d subshell, whose poor shielding is balanced by repulsion between d electrons. Ionic radii of M²⁺ ions decrease gradually. Down a group, 4d radii exceed 3d, but **4d and 5d radii are almost equal** (Zr 160 pm, Hf 159 pm) because of the lanthanoid contraction.',
      v: radiiPlot,
      n: 'Across the series the nuclear charge rises by one each time, but the new electron goes into an inner d orbital. At first the radius shrinks quickly; after chromium the extra pull is balanced by repulsion among the d electrons, so the size hardly changes. Down a group the second-row elements are larger, but the third-row elements are almost exactly the same size as the second row, a result of the lanthanoid contraction that we meet in the next chapter.',
    }),
    sl('diagram', 'Ionisation enthalpy', {
      b: 'First ionisation enthalpies rise only slowly and irregularly across the 3d series: the extra nuclear charge is nearly cancelled by shielding from 3d electrons. Zinc’s is high (stable 3d¹⁰4s²). Some second and third ionisation enthalpies are unusually high where a d⁵ or d¹⁰ configuration would be broken (Cr⁺, Cu⁺ → second; Mn²⁺, Zn²⁺ → third).',
      v: iePlot,
      n: 'Across the series the first ionisation enthalpy rises slowly and unevenly, because each new d electron shields the outer electrons and nearly cancels the extra nuclear charge. Zinc stands out with a high value from its filled sub-shells. The second ionisation enthalpies of chromium and copper are unusually high, because removing that electron destroys a half-filled or completely filled d subshell.',
    }),
    sl('example', 'Worked example: explaining ionisation enthalpy anomalies', {
      b: r`**Problem.** Explain why (a) the second ionisation enthalpy of copper (1958 kJ mol⁻¹) is much higher than that of zinc (1733 kJ mol⁻¹), and (b) the third ionisation enthalpy of manganese is unusually high.

**(a)** Cu⁺ is 3d¹⁰ (stable, filled); removing the second electron breaks this. Zn⁺ is 3d¹⁰4s¹; its second electron comes from 4s, leaving stable 3d¹⁰.

**(b)** Mn²⁺ is 3d⁵ (stable, half-filled); removing a third electron destroys the half-filled subshell.`,
      v: flow('LR', [['a', 'Which electron is removed?'], ['b', 'Does removal break d⁵ or d¹⁰?'], ['c', 'Yes → unusually high ΔiH'], ['d', 'No → normal or low ΔiH']], [['a', 'b'], ['b', 'c'], ['b', 'd']], 'Flow for explaining ionisation enthalpy anomalies'),
      n: 'Ask which electron is being removed and what configuration is left. Removing the second electron from copper one plus breaks a completely filled d subshell, which costs a lot of energy. For zinc one plus the second electron comes from the four s, leaving a stable filled d subshell, so it is easier. In manganese two plus, removing a third electron breaks the half-filled d five subshell, so the third ionisation enthalpy is high.',
    }),
    sl('check', 'Quick check: trends', {
      b: 'Explain a trend in radius or ionisation enthalpy across the 3d series.',
      n: 'Quick check. Remember the balance between extra nuclear charge and shielding by 3d electrons, and the special stability of half-filled and completely filled d subshells.',
      chk: 'trend-mcq',
    }),
    sl('check', 'Quick check: transition element or not?', {
      b: 'Decide whether an element counts as a transition element.',
      n: 'Quick check. Look for an incomplete d subshell in the atom or in a common ion.',
      chk: 'transition-mcq',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Transition element: incomplete d subshell in the atom or a common ion; Zn, Cd, Hg are d-block but not typical transition elements.',
        '3d configurations (n−1)d¹⁻¹⁰ns¹⁻²; Cr 3d⁵4s¹ and Cu 3d¹⁰4s¹; ions lose ns electrons first.',
        'Hard, high-melting metals; melting point and atomisation enthalpy peak mid-series.',
        'Radii fall then level off across the series; 4d ≈ 5d because of lanthanoid contraction.',
        'Ionisation enthalpy rises slowly; anomalies where d⁵ or d¹⁰ is broken.',
      ],
      v: table(['Property', 'Key idea'], [['Configuration', 'd⁵ and d¹⁰ extra stable'], ['Radius', 'Nearly constant mid-series'], ['Ionisation enthalpy', 'Slow rise; d⁵/d¹⁰ anomalies']], 'Summary table of Part 1'),
      n: 'Let us sum up Part 1. Transition elements have incomplete d subshells. Chromium and copper have special configurations, and ions lose their outer s electrons first. Strong metallic bonding makes these metals hard and high melting. Across a series, radii level off and ionisation enthalpies rise only slowly, with anomalies wherever a half-filled or filled d subshell is broken.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'For ions, remove ns electrons first: Co²⁺ is 3d⁷, not 3d⁵4s².',
        'Give the reason with every anomaly: stability of d⁵ or d¹⁰.',
        'Explain why Zn is not a typical transition element (d¹⁰ in atom and Zn²⁺).',
        'Mention the lanthanoid contraction for the similar sizes of Zr and Hf.',
      ],
      v: table(['Slip', 'Fix'], [['Cr written 3d⁴4s²', 'Cr is 3d⁵4s¹'], ['Removing 3d before 4s', 'Remove 4s first'], ['Radius keeps falling across the series', 'It levels off mid-series']], 'Table of three common slips in Part 1 and fixes'),
      n: 'Some tips. When writing ions, take electrons from the outer s orbital first. Every anomaly answer should mention the special stability of half-filled or filled d subshells. Explain clearly why zinc is not a typical transition element. And mention the lanthanoid contraction whenever you compare the sizes of second- and third-row transition metals.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Transition (d-Block) Elements — Part 2: Oxidation states, colour, magnetism and other properties',
  goals: [
    'Explain why transition metals show variable oxidation states and identify common states in the 3d series',
    'Relate the colour of transition metal ions to d–d transitions',
    'Calculate spin-only magnetic moments',
    'Explain catalytic activity, complex formation, interstitial compounds and alloy formation',
  ],
  slides: [
    sl('title', 'Characteristic properties', {
      b: 'Part 2 — the properties that make transition metals special.',
      v: flow('LR', [['a', 'Partly filled d orbitals'], ['b', 'Variable oxidation states'], ['c', 'Colour and magnetism'], ['d', 'Catalysis and complexes'], ['e', 'Interstitial compounds and alloys']], [['a', 'b'], ['a', 'c'], ['a', 'd'], ['a', 'e']], 'Flow from partly filled d orbitals to the characteristic properties of transition metals'),
      n: 'Why is copper sulfate blue, why can iron be iron two or iron three, why does a magnet attract some salts, and why are transition metals the best industrial catalysts? Almost every special property of these elements comes from their partly filled d orbitals. In this part we take each property in turn.',
    }),
    sl('concept', 'Variable oxidation states', {
      b: 'Because the (n−1)d and ns electrons have similar energies, transition elements show **several oxidation states**, often differing by one. In the 3d series the maximum rises to **+7 at Mn** (= number of 3d + 4s electrons), then falls. Higher states occur in oxides, fluorides and oxoanions (MnO₄⁻, Cr₂O₇²⁻); low states in complexes with π-acceptor ligands such as CO (Ni(CO)₄, oxidation state 0).',
      v: table(['Element', 'Common oxidation states', 'Most common'], [['Sc', '+3', '+3'], ['Ti', '+2, +3, +4', '+4'], ['V', '+2 to +5', '+5, +4'], ['Cr', '+2, +3, +6', '+3'], ['Mn', '+2 to +7', '+2, +4, +7'], ['Fe', '+2, +3', '+3'], ['Co', '+2, +3', '+2'], ['Ni', '+2', '+2'], ['Cu', '+1, +2', '+2'], ['Zn', '+2', '+2']], 'Table of common oxidation states of the 3d elements'),
      n: 'Iron can be iron two or iron three; manganese ranges from plus two to plus seven. Because the three d and four s electrons are close in energy, different numbers of them can be used in bonding. Up to manganese, the highest state equals the total of three d and four s electrons; after that, pairing makes d electrons harder to use, and the maximum falls again.',
    }),
    sl('example', 'Worked example: stability of oxidation states', {
      b: r`**Problem.** Explain (a) why Fe³⁺ is more stable than Fe²⁺, (b) why Mn²⁺ is more stable than Mn³⁺, and (c) why Sc shows only +3.

**(a)** Fe³⁺ is 3d⁵ (half-filled, extra stable); Fe²⁺ (3d⁶) is easily oxidised to it.

**(b)** Mn²⁺ is 3d⁵; Mn³⁺ (3d⁴) readily gains an electron to reach d⁵, so it is a strong oxidising agent ($E^\circ_{\ce{Mn^3+/Mn^2+}} = +1.57\ \text{V}$).

**(c)** Sc [Ar]3d¹4s² loses all three outer electrons to reach the noble-gas configuration of Sc³⁺.`,
      v: table(['Ion', 'Configuration', 'Stability'], [['Fe³⁺', 'd⁵', 'More stable than Fe²⁺'], ['Mn²⁺', 'd⁵', 'More stable than Mn³⁺'], ['Sc³⁺', 'd⁰ (noble gas)', 'Only stable state']], 'Table of ions and the configurations that explain their stability'),
      n: 'Use the stability of half-filled and empty subshells. Iron three plus has five d electrons, a half-filled set, so iron two plus tends to be oxidised to it. Manganese two plus already has five d electrons, so manganese three plus grabs an electron to reach that state and is a strong oxidising agent. Scandium loses all three outer electrons to reach the configuration of argon, so plus three is its only state.',
    }),
    sl('check', 'Quick check: oxidation states', {
      b: 'Identify the highest oxidation state or the most stable state of a 3d element.',
      n: 'Quick check. Count three d plus four s electrons up to manganese, and look for empty, half-filled or completely filled d subshells.',
      chk: 'oxstate-mcq',
    }),
    sl('concept', 'Magnetic properties', {
      b: r`Substances with **unpaired electrons** are **paramagnetic**; with all electrons paired, **diamagnetic**. A few (Fe, Co, Ni) are **ferromagnetic**. The **spin-only magnetic moment**, in Bohr magnetons (BM): $\mu = \sqrt{n(n+2)}$, where $n$ is the number of unpaired electrons.`,
      m: [r`\mu = \sqrt{n(n+2)}\ \text{BM}`],
      v: table(['n', 'μ / BM', 'Example ions'], [['0', '0', 'Sc³⁺, Ti⁴⁺, Zn²⁺, Cu⁺'], ['1', '1.73', 'Ti³⁺, Cu²⁺'], ['2', '2.83', 'V³⁺, Ni²⁺'], ['3', '3.87', 'Cr³⁺, Co²⁺'], ['4', '4.90', 'Cr²⁺, Fe²⁺'], ['5', '5.92', 'Mn²⁺, Fe³⁺']], 'Table of spin-only magnetic moments for zero to five unpaired electrons'),
      n: 'Each unpaired electron acts like a tiny magnet, so ions with unpaired electrons are attracted into a magnetic field: they are paramagnetic. The spin-only formula gives the magnetic moment as the square root of n times n plus two Bohr magnetons. Turning it around, a measured moment tells us how many unpaired electrons an ion has.',
    }),
    sl('example', 'Worked example: magnetic moments', {
      b: r`**Problem.** Calculate the spin-only magnetic moments of V³⁺ (V = 23) and Co²⁺ (Co = 27). Which is more paramagnetic?

**Step 1.** V³⁺: 3d², $n = 2$, $\mu = \sqrt{2 \times 4} = \sqrt{8} \approx 2.83\ \text{BM}$.

**Step 2.** Co²⁺: 3d⁷ — five singly occupied orbitals, two of them then paired — $n = 3$, $\mu = \sqrt{3 \times 5} = \sqrt{15} \approx 3.87\ \text{BM}$. Co²⁺ is more paramagnetic.`,
      v: table(['Ion', 'd electrons', 'n', 'μ / BM'], [['V³⁺', '2', '2', '2.83'], ['Co²⁺', '7', '3', '3.87']], 'Table of the magnetic moment calculation'),
      n: 'First find the number of d electrons in the ion, then fill the five d orbitals singly before pairing. Vanadium three plus has two d electrons, both unpaired, giving the square root of eight, about two point eight three. Cobalt two plus has seven: five go in singly and two pair up, leaving three unpaired, about three point eight seven. More unpaired electrons means stronger paramagnetism.',
    }),
    sl('concept', 'Coloured ions', {
      b: 'In a hydrated or complex ion, the five d orbitals split into sets of slightly different energy. A d electron can absorb visible light of a particular wavelength and jump to a higher set (**d–d transition**); the ion shows the **complementary colour**. **d⁰** and **d¹⁰** ions are colourless.',
      v: table(['Ion (aqueous)', 'Configuration', 'Colour'], [['Sc³⁺, Ti⁴⁺', 'd⁰', 'Colourless'], ['Ti³⁺', 'd¹', 'Purple'], ['V³⁺', 'd²', 'Green'], ['Cr³⁺', 'd³', 'Violet'], ['Mn²⁺', 'd⁵', 'Very pale pink'], ['Fe²⁺', 'd⁶', 'Pale green'], ['Fe³⁺', 'd⁵', 'Yellow'], ['Co²⁺', 'd⁷', 'Pink'], ['Ni²⁺', 'd⁸', 'Green'], ['Cu²⁺', 'd⁹', 'Blue'], ['Cu⁺, Zn²⁺', 'd¹⁰', 'Colourless']], 'Table of colours of hydrated 3d ions'),
      n: 'Why is copper sulfate solution blue? In the hydrated copper ion the d orbitals are split slightly in energy, and a d electron absorbs orange-red light to jump to the higher set. We see the light that remains, which is blue. Ions with no d electrons, like titanium four plus, or a full set, like zinc two plus, have no such jump available, so they are colourless.',
    }),
    sl('example', 'Worked example: colourless or coloured?', {
      b: r`**Problem.** Predict which of these are coloured in aqueous solution, giving reasons: Ti⁴⁺, Cu⁺, Ni²⁺, Sc³⁺, Fe³⁺. Why is anhydrous CuSO₄ white but CuSO₄·5H₂O blue?

**Step 1.** Ti⁴⁺ (d⁰), Sc³⁺ (d⁰) and Cu⁺ (d¹⁰): colourless — no d–d transition. Ni²⁺ (d⁸) and Fe³⁺ (d⁵): coloured.

**Step 2.** In anhydrous CuSO₄ there are no water ligands to split the d orbitals suitably, so no visible light is absorbed; in the hydrate, water ligands split the d orbitals and a d–d transition absorbs red light.`,
      v: table(['Ion', 'Configuration', 'Coloured?'], [['Ti⁴⁺', 'd⁰', 'No'], ['Cu⁺', 'd¹⁰', 'No'], ['Ni²⁺', 'd⁸', 'Yes'], ['Sc³⁺', 'd⁰', 'No'], ['Fe³⁺', 'd⁵', 'Yes']], 'Table predicting colour from d configuration'),
      n: 'Look at the d count. With no d electrons, or a completely full set, there can be no d to d jump, so the ion is colourless: titanium four plus, scandium three plus and copper one plus. Nickel two plus and iron three plus have partly filled d subshells and are coloured. Anhydrous copper sulfate is white because without water ligands the splitting does not allow absorption of visible light.',
    }),
    sl('check', 'Quick check: colour and magnetism', {
      b: 'Pick the ion that is coloured and paramagnetic, or colourless and diamagnetic.',
      n: 'Quick check. Ions with no d electrons, or with a full set of ten, have no unpaired electrons and no d to d transitions.',
      chk: 'colour-mcq',
    }),
    sl('concept', 'Catalytic properties', {
      b: 'Transition metals and their compounds are excellent **catalysts** because they (i) show **variable oxidation states**, forming unstable intermediates, and (ii) provide a **large surface** on which reactants are **adsorbed**, weakening their bonds and lowering the activation energy.',
      v: table(['Catalyst', 'Process'], [['Fe (with Mo)', 'Haber process: N₂ + 3H₂ ⇌ 2NH₃'], ['V₂O₅', 'Contact process: 2SO₂ + O₂ ⇌ 2SO₃'], ['Ni', 'Hydrogenation of vegetable oils'], ['Pt/Rh', 'Ostwald process (NH₃ → NO); catalytic converters'], ['Fe³⁺', 'Oxidation of I⁻ by S₂O₈²⁻ (via Fe³⁺/Fe²⁺)']], 'Table of transition-metal catalysts and the processes they catalyse'),
      n: 'Transition metals are the world’s favourite catalysts. Iron speeds up ammonia manufacture, vanadium pentoxide sulfuric acid manufacture, and nickel the hardening of oils into vanaspati. They work in two ways: by switching between oxidation states, as iron three and iron two do in the reaction of iodide with peroxodisulfate, and by adsorbing reactants on their surfaces, weakening bonds and lowering the activation energy.',
    }),
    sl('concept', 'Complex formation', {
      b: 'Transition metal ions form a large number of **complexes**, because they are **small**, carry a **high charge** and have **vacant d orbitals** of suitable energy to accept lone pairs from ligands.',
      v: table(['Complex', 'Metal ion', 'Ligand'], [['[Cu(NH₃)₄]²⁺ (deep blue)', 'Cu²⁺', 'NH₃'], ['[Fe(CN)₆]⁴⁻', 'Fe²⁺', 'CN⁻'], ['[Ni(CO)₄]', 'Ni(0)', 'CO'], ['[Co(NH₃)₆]³⁺', 'Co³⁺', 'NH₃']], 'Table of complexes of transition metals'),
      n: 'Add ammonia to blue copper sulfate solution and it turns deep blue as tetraamminecopper two plus forms. Transition metal ions form such complexes readily because they are small and highly charged, so they attract lone pairs strongly, and they have empty d orbitals to accept those lone pairs. We study complexes in detail in chapters ten and eleven.',
    }),
    sl('concept', 'Interstitial compounds and alloys', {
      b: '**Interstitial compounds** form when small atoms (H, B, C, N) occupy the holes in the metal lattice (TiC, Mn₄N, Fe₃H, VH₀.₅₆): they are hard, have high melting points, retain metallic conductivity and are chemically inert; they are often non-stoichiometric. **Alloys** form readily because transition metal atoms have **similar radii** and can replace one another in the lattice.',
      v: table(['Alloy', 'Composition', 'Use'], [['Stainless steel', 'Fe, Cr, Ni', 'Cutlery, surgical instruments'], ['Brass', 'Cu, Zn', 'Taps, fittings'], ['Bronze', 'Cu, Sn', 'Statues, medals'], ['Nichrome', 'Ni, Cr', 'Heating elements']], 'Table of transition-metal alloys and their uses'),
      n: 'Small atoms such as hydrogen, carbon and nitrogen can slip into the gaps in a transition metal lattice, giving interstitial compounds such as titanium carbide, which are very hard and have very high melting points. And because transition metal atoms are similar in size, one can replace another in the lattice, so they form many useful alloys, such as stainless steel and brass.',
    }),
    sl('check', 'Quick check: catalysis and alloys', {
      b: 'Explain why transition metals act as catalysts or form alloys and interstitial compounds.',
      n: 'Quick check. Think of variable oxidation states, surface adsorption and similar atomic sizes.',
      chk: 'catalysis-mcq',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'Variable oxidation states from close (n−1)d and ns energies; maximum +7 at Mn.',
        'Stability of d⁰, d⁵ and d¹⁰ explains many preferred states (Sc³⁺, Fe³⁺, Mn²⁺, Zn²⁺).',
        'μ = √(n(n+2)) BM; paramagnetism from unpaired electrons.',
        'Colour from d–d transitions; d⁰ and d¹⁰ ions colourless.',
        'Catalysts (variable oxidation states, surface adsorption); complexes; interstitial compounds; alloys.',
      ],
      v: table(['Property', 'Cause'], [['Variable oxidation states', 'Close d and s energies'], ['Colour', 'd–d transitions'], ['Paramagnetism', 'Unpaired d electrons'], ['Catalysis', 'Variable states; adsorption'], ['Alloys', 'Similar radii']], 'Summary table of properties and causes'),
      n: 'Let us sum up Part 2. Transition metals show several oxidation states because their d and s electrons are close in energy, and the stability of empty, half-filled and filled d subshells explains which are preferred. Unpaired d electrons give paramagnetism and, with split d orbitals, colour. Their variable oxidation states and surfaces make them good catalysts, and their size lets them form complexes, interstitial compounds and alloys.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'Count unpaired electrons by filling five d orbitals singly before pairing.',
        'For colour, mention d–d transition, absorption of visible light and complementary colour.',
        'Give both reasons for catalytic activity.',
        'For interstitial compounds, give properties (hard, high-melting, inert).',
      ],
      v: table(['Slip', 'Fix'], [['μ = n(n+2)', 'μ = √(n(n+2))'], ['Zn²⁺ is coloured', 'd¹⁰: colourless'], ['Catalysis only by surface area', 'Also variable oxidation states']], 'Table of three common slips in Part 2 and fixes'),
      n: 'Final tips. Fill all five d orbitals singly before pairing when counting unpaired electrons, and remember the square root in the magnetic moment formula. For colour, mention d to d transitions and absorption of visible light. Give both reasons for catalytic activity. And describe interstitial compounds by their properties.',
    }),
  ],
});
