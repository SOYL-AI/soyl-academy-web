// ch04 The d- and f-Block Elements — two decks: Part 1 (t01–t02) position, configuration and general properties;
// Part 2 (t03–t05) potassium dichromate and permanganate, lanthanoids and actinoids, applications.
import { sl, deck, table, flow, svgV, plot, chem, r } from './lib.mjs';
import { BLOCKS, CHROMATE, MANGANATE } from './svgs.mjs';

export const V = {
  blocks: svgV(BLOCKS, 'Periodic table outline showing the s-block on the left, the p-block on the right, the d-block in the middle of periods 4 to 7, and the f-block as two separate rows at the bottom', 'Schematic: element symbols are left out so that the blocks stand out.'),
  chromate: svgV(CHROMATE, 'Structures of the tetrahedral chromate ion and of the dichromate ion, two tetrahedra sharing one oxygen atom with a Cr–O–Cr angle of about 126 degrees'),
  manganate: svgV(MANGANATE, 'Tetrahedral structures of the green, paramagnetic manganate ion and the purple, diamagnetic permanganate ion'),
};

// Metallic radii of the 3d series (pm), Sc → Zn.
export const RADII_3D = [['Sc', 164], ['Ti', 147], ['V', 135], ['Cr', 129], ['Mn', 137], ['Fe', 126], ['Co', 125], ['Ni', 125], ['Cu', 128], ['Zn', 137]];
export const radiiPlot = plot(
  {
    x: { min: 21, max: 30, label: 'Atomic number (Sc = 21 to Zn = 30)' },
    y: { min: 100, max: 180, label: 'Metallic radius (pm)' },
    series: [{ label: 'Metallic radius, 3d series', kind: 'line', points: RADII_3D.map(([, rr], i) => [21 + i, rr]) }],
  },
  'Metallic radii of the 3d series from scandium to zinc: a sharp fall from 164 picometres at scandium to about 129 at chromium, then nearly constant around 125 to 137 in the middle and end of the series',
  'Approximate values. Radii fall at first, then stay almost constant because added 3d electrons shield the outer electrons poorly but also repel one another.',
);
// Ionic radii of Ln³⁺ (pm, approximate) showing lanthanoid contraction.
export const lnPlot = plot(
  {
    x: { min: 57, max: 71, label: 'Atomic number (La = 57 to Lu = 71)' },
    y: { min: 80, max: 110, label: 'Radius of M³⁺ ion (pm)' },
    series: [{ label: 'Ln³⁺ ionic radius', kind: 'line', points: [[57, 103], [60, 98], [64, 94], [66, 91], [68, 89], [71, 86]] }],
  },
  'Radius of the tripositive lanthanoid ions falling steadily from about 103 picometres for lanthanum to about 86 for lutetium',
  'Approximate values: the steady decrease is the lanthanoid contraction.',
);

export const deck1 = deck({
  part: 1,
  title: 'The d- and f-Block Elements — Part 1: Transition elements and their properties',
  goals: [
    'Locate the d- and f-block elements in the periodic table and define a transition element',
    'Write the electronic configurations of 3d elements and their ions, explaining the chromium and copper anomalies',
    'Explain the trends in radius, ionisation enthalpy, oxidation states and E° values across the 3d series',
    'Calculate spin-only magnetic moments and explain colour, catalytic activity, interstitial compounds and alloy formation',
  ],
  slides: [
    sl('title', 'The d- and f-Block Elements', {
      b: 'Part 1 — the metals in the middle of the periodic table: why they are hard, coloured, magnetic and good catalysts.',
      v: V.blocks,
      n: 'Namaste! Iron in bridges, copper in wires, titanium in aircraft, chromium on taps and platinum in car exhausts: the metals in the middle of the periodic table build the modern world. These are the d-block elements, and below the main table sit the f-block elements. In this part we study their electronic configurations and the special properties that come from partly filled d orbitals.',
    }),
    sl('concept', 'Where are the d- and f-block elements?', {
      b: 'The **d-block** fills groups 3–12 in periods 4–7, giving the **3d, 4d, 5d and 6d series**. A **transition element** has an **incompletely filled d subshell** in the atom or in one of its common ions. Zinc, cadmium and mercury have full $d^{10}$ shells in the atom and in their common ions, so they are not regarded as transition elements, though they are d-block elements.',
      v: table(['Series', 'Period', 'Elements', 'd orbitals filled'], [['3d', '4', 'Sc to Zn', '3d'], ['4d', '5', 'Y to Cd', '4d'], ['5d', '6', 'La, Hf to Hg', '5d'], ['6d', '7', 'Ac, Rf to Cn', '6d']], 'Table of the four d-series with their period, first and last elements and the d orbitals being filled'),
      n: 'The d-block sits between the s-block and the p-block, in groups three to twelve. Each period from four to seven gives one series. A transition element is defined by an incomplete d subshell, either in the atom or in a common ion. Copper counts, because its common ion has nine d electrons. Zinc does not, because both the atom and its ion have a full set of ten.',
    }),
    sl('concept', 'Electronic configurations of the 3d series', {
      b: r`General configuration: $(n-1)d^{1\text{–}10}\, ns^{1\text{–}2}$. Chromium and copper are exceptions: a **half-filled** ($d^5$) or **completely filled** ($d^{10}$) d subshell has extra stability, and the 3d and 4s energies are very close.`,
      v: table(['Element', 'Configuration', 'Element', 'Configuration'], [['Sc', r`$[\text{Ar}]3d^1 4s^2$`, 'Fe', r`$[\text{Ar}]3d^6 4s^2$`], ['Ti', r`$[\text{Ar}]3d^2 4s^2$`, 'Co', r`$[\text{Ar}]3d^7 4s^2$`], ['V', r`$[\text{Ar}]3d^3 4s^2$`, 'Ni', r`$[\text{Ar}]3d^8 4s^2$`], ['Cr', r`$[\text{Ar}]3d^5 4s^1$`, 'Cu', r`$[\text{Ar}]3d^{10} 4s^1$`], ['Mn', r`$[\text{Ar}]3d^5 4s^2$`, 'Zn', r`$[\text{Ar}]3d^{10} 4s^2$`]], 'Table of the electronic configurations of the 3d elements from scandium to zinc, with chromium 3d5 4s1 and copper 3d10 4s1'),
      n: 'Across the three d series, electrons go into the three d orbitals while the four s holds one or two. Two elements break the simple pattern. Chromium is three d five, four s one, not three d four, four s two; copper is three d ten, four s one. A half-filled or completely filled d subshell is especially stable, and because three d and four s are so close in energy, one electron shifts to achieve it.',
    }),
    sl('example', 'Worked example: configurations of ions', {
      b: r`**Rule.** When a 3d atom forms a cation, the **4s electrons are removed first**, then 3d.

**Problem.** Write the configurations of $\ce{Fe^2+}$, $\ce{Fe^3+}$, $\ce{Cu+}$ and $\ce{Mn^2+}$ (Fe = 26, Cu = 29, Mn = 25).

**Step 1.** Fe $[\text{Ar}]3d^6 4s^2$ → $\ce{Fe^2+}$ $[\text{Ar}]3d^6$ → $\ce{Fe^3+}$ $[\text{Ar}]3d^5$.

**Step 2.** Cu $[\text{Ar}]3d^{10} 4s^1$ → $\ce{Cu+}$ $[\text{Ar}]3d^{10}$; Mn $[\text{Ar}]3d^5 4s^2$ → $\ce{Mn^2+}$ $[\text{Ar}]3d^5$.`,
      v: table(['Ion', 'Configuration', 'Unpaired electrons'], [[r`$\ce{Fe^2+}$`, r`$3d^6$`, '4'], [r`$\ce{Fe^3+}$`, r`$3d^5$`, '5'], [r`$\ce{Cu+}$`, r`$3d^{10}$`, '0'], [r`$\ce{Mn^2+}$`, r`$3d^5$`, '5']], 'Table of the configurations and numbers of unpaired electrons of iron two plus, iron three plus, copper one plus and manganese two plus'),
      n: 'The rule that trips up many students: the four s electrons leave first, even though they went in first. Iron loses its two four s electrons to become iron two plus, three d six, and then one three d electron to become iron three plus, three d five. Copper one plus is three d ten. Manganese two plus is three d five, a half-filled set with five unpaired electrons.',
    }),
    sl('check', 'Quick check: configuration of an ion', {
      b: 'Choose the correct configuration of a 3d ion, remembering which electrons are removed first.',
      n: 'Quick check. Write the atom’s configuration first, then remove the four s electrons before touching the three d electrons.',
      chk: 'ion-config-mcq',
    }),
    sl('concept', 'Physical properties and metallic bonding', {
      b: 'Transition metals are hard, dense, lustrous and good conductors, with high melting points (except zinc, cadmium and mercury). **Unpaired d electrons take part in metallic bonding**, so bonding is strongest, and the **enthalpy of atomisation** highest, near the middle of each series.',
      v: table(['Property', 'Trend in the 3d series', 'Reason'], [['Melting point', 'Rises to a maximum near V–Cr, then falls; Zn lowest', 'More unpaired d electrons, stronger metallic bonding'], ['Enthalpy of atomisation', 'Highest in the middle', 'Same reason'], ['Hardness', 'Generally high', 'Strong metallic bonding'], ['Zn, Cd, Hg', 'Soft, low melting (Hg liquid)', 'Full d¹⁰: d electrons not used in bonding']], 'Table of trends in melting point, enthalpy of atomisation and hardness across the 3d series, with zinc, cadmium and mercury as exceptions'),
      n: 'Why are transition metals so hard and strong? Besides the outer s electrons, their unpaired d electrons join in the metallic bonding. More unpaired electrons means stronger bonding, so melting points and enthalpies of atomisation rise towards the middle of the series and then fall. Zinc, cadmium and mercury, with full d subshells, have weak metallic bonding; mercury is even a liquid.',
    }),
    sl('diagram', 'Atomic radius across the 3d series', {
      b: 'Radii fall quickly at the start of the series, then stay **almost constant**: each added electron goes into the inner 3d subshell, whose **poor shielding** is balanced by **repulsion** between d electrons. Similar sizes let transition metals form **alloys** easily.',
      v: radiiPlot,
      n: 'Across the 3d series the nuclear charge rises by one each time, but the new electron goes into an inner d orbital, not the outer shell. At first the radius shrinks quickly, from scandium to chromium. After that, the extra pull is balanced by repulsion between the growing number of d electrons, so the radius hardly changes. Atoms of similar size can replace each other in a metal lattice, which is why these metals form so many alloys.',
    }),
    sl('concept', 'Ionisation enthalpy', {
      b: r`First ionisation enthalpies rise only slowly and irregularly across the series, because the shielding by added 3d electrons almost balances the extra nuclear charge. Some **second ionisation enthalpies are unusually high**: removing the second electron from $\ce{Cr+}$ ($3d^5$) or $\ce{Cu+}$ ($3d^{10}$) breaks a stable configuration.`,
      v: table(['Observation', 'Reason'], [['Small, irregular rise in first IE', 'Shielding by 3d electrons nearly cancels the rise in nuclear charge'], ['High second IE of Cr and Cu', 'Breaks the stable d⁵ or d¹⁰ configuration of the M⁺ ion'], ['Low third IE of Fe', 'Removing it gives the stable d⁵ Fe³⁺'], ['High third IE of Mn and Zn', 'Mn²⁺ (d⁵) and Zn²⁺ (d¹⁰) are stable']], 'Table of observations about ionisation enthalpies in the 3d series and their reasons, based on the stability of d5 and d10 configurations'),
      n: 'Ionisation enthalpies of the 3d metals rise only a little across the series, and not smoothly. The useful idea is again the stability of half-filled and filled d subshells. Pulling the second electron out of chromium one plus or copper one plus destroys a stable set, so it costs a lot. Pulling a third electron out of manganese two plus, which is d five, is also unusually hard.',
    }),
    sl('concept', 'Variable oxidation states', {
      b: 'Because 3d and 4s electrons have similar energies, transition elements show **several oxidation states**, usually differing by one. The number rises to a maximum at **manganese (+7)**, then falls. Higher states are found in oxides and fluorides; low states in complexes with ligands such as CO.',
      v: table(['Element', 'Common oxidation states', 'Highest'], [['Sc', '+3', '+3'], ['Ti', '+2, +3, +4', '+4'], ['V', '+2, +3, +4, +5', '+5'], ['Cr', '+2, +3, +6', '+6'], ['Mn', '+2, +3, +4, +6, +7', '+7'], ['Fe', '+2, +3', '+6 (rare)'], ['Co', '+2, +3', '+4 (rare)'], ['Ni', '+2', '+4 (rare)'], ['Cu', '+1, +2', '+2'], ['Zn', '+2', '+2']], 'Table of the common and highest oxidation states of the 3d elements, rising to plus 7 at manganese and then falling'),
      n: 'Iron can be iron two or iron three; manganese can range from plus two to plus seven. Because the three d and four s electrons are close in energy, different numbers of them can be used in bonding. Up to manganese, the highest state equals the total number of three d and four s electrons. After manganese, pairing makes the electrons harder to use, and the highest states fall again.',
    }),
    sl('concept', 'Standard electrode potentials of the 3d metals', {
      b: r`$E^\circ(\ce{M^2+/M})$ values reflect the energy needed to atomise and ionise the metal and the hydration energy of the ion. Copper alone has a **positive** value, so it does **not** release hydrogen from dilute acids.`,
      v: table(['Couple', r`$E^\circ$ / V`, 'Couple', r`$E^\circ$ / V`], [[r`$\ce{Ti^2+/Ti}$`, r`$-1.63$`, r`$\ce{Co^2+/Co}$`, r`$-0.28$`], [r`$\ce{V^2+/V}$`, r`$-1.18$`, r`$\ce{Ni^2+/Ni}$`, r`$-0.25$`], [r`$\ce{Cr^2+/Cr}$`, r`$-0.90$`, r`$\ce{Cu^2+/Cu}$`, r`$+0.34$`], [r`$\ce{Mn^2+/Mn}$`, r`$-1.18$`, r`$\ce{Zn^2+/Zn}$`, r`$-0.76$`], [r`$\ce{Fe^2+/Fe}$`, r`$-0.44$`, r`$\ce{Mn^3+/Mn^2+}$`, r`$+1.57$`], [r`$\ce{Fe^3+/Fe^2+}$`, r`$+0.77$`, r`$\ce{Co^3+/Co^2+}$`, r`$+1.97$`]], 'Table of standard electrode potentials of the 3d metals for the M2+/M couples and some M3+/M2+ couples'),
      n: 'The electrode potentials of the three d metals are mostly negative, so most of these metals release hydrogen from acids. Copper is the exception, with a positive value: the energy needed to turn copper metal into hydrated ions is not paid back by hydration. Notice also the large positive values for manganese three plus and cobalt three plus going to the two plus ions: those three plus ions are strong oxidising agents.',
    }),
    sl('example', 'Worked example: why Cr²⁺ reduces and Mn³⁺ oxidises', {
      b: r`**Problem.** Both $\ce{Cr^2+}$ and $\ce{Mn^3+}$ are $d^4$ ions. Why is $\ce{Cr^2+}$ a reducing agent while $\ce{Mn^3+}$ is an oxidising agent?

**Step 1.** $\ce{Cr^2+ -> Cr^3+ + e-}$ gives $d^3$, a stable configuration with three half-filled $t_{2g}$ orbitals; $E^\circ(\ce{Cr^3+/Cr^2+}) = -0.41\ \text{V}$, so $\ce{Cr^2+}$ readily gives an electron.

**Step 2.** $\ce{Mn^3+ + e- -> Mn^2+}$ gives the extra-stable half-filled $d^5$; $E^\circ(\ce{Mn^3+/Mn^2+}) = +1.57\ \text{V}$, so $\ce{Mn^3+}$ readily takes an electron.`,
      v: flow('LR', [['a', 'Cr²⁺ (d⁴)'], ['b', 'loses e⁻ → Cr³⁺ (d³, stable): reducing agent'], ['c', 'Mn³⁺ (d⁴)'], ['d', 'gains e⁻ → Mn²⁺ (d⁵, stable): oxidising agent']], [['a', 'b'], ['c', 'd']], 'Flow: chromium two plus loses an electron to become stable chromium three plus, so it reduces; manganese three plus gains an electron to become stable manganese two plus, so it oxidises'),
      n: 'Here is a favourite reasoning question. Both ions have four d electrons, yet they behave oppositely. Chromium two plus gets to a more stable arrangement by losing an electron, so it gives electrons away: it is a reducing agent. Manganese three plus gets to the half-filled d five arrangement by gaining an electron, so it takes electrons: it is an oxidising agent. The electrode potentials confirm both.',
    }),
    sl('check', 'Quick check: highest oxidation state', {
      b: 'Decide which 3d element shows the highest oxidation state.',
      n: 'Quick check. Count three d plus four s electrons along the series, and remember where the maximum oxidation state occurs.',
      chk: 'max-ox-mcq',
    }),
    sl('concept', 'Magnetic properties', {
      b: r`Ions with **unpaired electrons** are **paramagnetic** (attracted by a magnet); those with all electrons paired are **diamagnetic**. The **spin-only magnetic moment**, in Bohr magnetons (BM), depends on the number of unpaired electrons $n$:`,
      m: [r`\mu = \sqrt{n(n+2)}\ \text{BM}`],
      v: table(['Unpaired electrons n', 'μ (spin-only) / BM', 'Example ion'], [['0', '0', r`$\ce{Zn^2+}$, $\ce{Sc^3+}$`], ['1', '1.73', r`$\ce{Cu^2+}$, $\ce{Ti^3+}$`], ['2', '2.83', r`$\ce{Ni^2+}$, $\ce{V^3+}$`], ['3', '3.87', r`$\ce{Cr^3+}$, $\ce{Co^2+}$`], ['4', '4.90', r`$\ce{Fe^2+}$, $\ce{Cr^2+}$`], ['5', '5.92', r`$\ce{Mn^2+}$, $\ce{Fe^3+}$`]], 'Table of spin-only magnetic moments for zero to five unpaired electrons with example ions'),
      n: 'Each unpaired electron behaves like a tiny magnet. Ions with unpaired electrons are drawn into a magnetic field: they are paramagnetic. The spin-only formula gives the magnetic moment in Bohr magnetons as the square root of n times n plus two, where n is the number of unpaired electrons. So a measured moment tells us how many unpaired electrons an ion has.',
    }),
    sl('example', 'Worked example: magnetic moment of an ion', {
      b: r`**Problem.** Calculate the spin-only magnetic moment of $\ce{Fe^2+}$ (Fe = 26) and of $\ce{Cu^2+}$ (Cu = 29).

**Step 1.** $\ce{Fe^2+}$ is $3d^6$: five orbitals, one paired and four single, so $n = 4$: $\mu = \sqrt{4 \times 6} = \sqrt{24} \approx 4.90\ \text{BM}$.

**Step 2.** $\ce{Cu^2+}$ is $3d^9$: $n = 1$, $\mu = \sqrt{1 \times 3} = \sqrt{3} \approx 1.73\ \text{BM}$.`,
      v: table(['Ion', 'd electrons', 'n', 'μ / BM'], [[r`$\ce{Fe^2+}$`, '6', '4', '4.90'], [r`$\ce{Cu^2+}$`, '9', '1', '1.73']], 'Table of iron two plus with six d electrons, four unpaired, 4.90 Bohr magnetons, and copper two plus with nine, one unpaired, 1.73'),
      n: 'First find the d count of the ion, then the number of unpaired electrons by filling five d orbitals singly before pairing. Iron two plus has six d electrons: five go in singly and one pairs up, leaving four unpaired, so the moment is the square root of twenty four, about four point nine. Copper two plus, with nine, has just one unpaired electron, about one point seven three.',
    }),
    sl('concept', 'Colour of transition metal ions', {
      b: 'In a complex or hydrated ion, the five d orbitals split into groups of slightly different energy. An electron can jump between them (**d–d transition**) by absorbing part of visible light; the ion shows the **complementary colour**. Ions with $d^0$ or $d^{10}$ configurations are colourless.',
      v: table(['Ion (aqueous)', 'Configuration', 'Colour'], [[r`$\ce{Sc^3+}$`, r`$3d^0$`, 'Colourless'], [r`$\ce{Ti^3+}$`, r`$3d^1$`, 'Purple'], [r`$\ce{V^3+}$`, r`$3d^2$`, 'Green'], [r`$\ce{Cr^3+}$`, r`$3d^3$`, 'Violet'], [r`$\ce{Mn^2+}$`, r`$3d^5$`, 'Very pale pink'], [r`$\ce{Fe^2+}$`, r`$3d^6$`, 'Pale green'], [r`$\ce{Co^2+}$`, r`$3d^7$`, 'Pink'], [r`$\ce{Ni^2+}$`, r`$3d^8$`, 'Green'], [r`$\ce{Cu^2+}$`, r`$3d^9$`, 'Blue'], [r`$\ce{Zn^2+}$`, r`$3d^{10}$`, 'Colourless']], 'Table of colours of hydrated 3d ions from colourless scandium three plus through purple, green, violet, pink and blue to colourless zinc two plus'),
      n: 'Why is copper sulfate solution blue? In the hydrated copper ion the d orbitals are split slightly in energy. A d electron absorbs orange-red light to jump up, and we see what is left: blue. Ions with no d electrons, like scandium three plus, or a full set, like zinc two plus, have no such jump available, so their solutions are colourless.',
    }),
    sl('concept', 'Complexes, catalysts, interstitial compounds and alloys', {
      b: 'Transition metals form many **complexes** (small, highly charged ions with vacant d orbitals). They are good **catalysts**, using variable oxidation states and their surfaces. They trap small atoms (H, C, N) in their lattices as **interstitial compounds**, and form **alloys** because their atoms are similar in size.',
      v: table(['Property', 'Example', 'Reason'], [['Catalysis', 'Iron in the Haber process; V₂O₅ in the contact process; nickel in hydrogenation of oils', 'Variable oxidation states; surface adsorption'], ['Interstitial compounds', 'TiC, Mn₄N, Fe₃H', 'Small atoms in lattice holes; hard, high melting, chemically inert'], ['Alloys', 'Brass (Cu–Zn), bronze (Cu–Sn), stainless steel (Fe–Cr–Ni)', 'Similar atomic radii'], ['Complexes', r`$[\ce{Cu(NH3)4}]^{2+}$, $[\ce{Fe(CN)6}]^{4-}$`, 'Small, charged ions with vacant d orbitals']], 'Table of examples and reasons for catalytic activity, interstitial compounds, alloys and complex formation by transition metals'),
      n: 'Transition metals are the world’s favourite catalysts: iron in ammonia manufacture, vanadium pentoxide in sulfuric acid manufacture and nickel in making vanaspati from oils. They can switch between oxidation states and hold reactant molecules on their surfaces. Small atoms like carbon and nitrogen fit into the gaps of their lattices, giving very hard interstitial compounds. And similar atomic sizes make alloys such as brass and stainless steel easy to form.',
    }),
    sl('check', 'Quick check: colour and magnetism', {
      b: 'Pick the ion that is both colourless and diamagnetic.',
      n: 'Quick check. Both properties need the same thing: think about which d configurations leave no unpaired electron and no possible d–d jump.',
      chk: 'colourless-mcq',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Transition element: incomplete d subshell in the atom or a common ion; Zn, Cd, Hg are d-block but not transition elements.',
        r`3d configurations $3d^{1\text{–}10}4s^{1\text{–}2}$; Cr $3d^5 4s^1$ and Cu $3d^{10} 4s^1$; ions lose 4s electrons first.`,
        'Radii fall then level off; melting point and atomisation enthalpy peak mid-series.',
        'Oxidation states vary, maximum +7 at Mn; stability of d⁵ and d¹⁰ explains many E° and IE anomalies.',
        r`$\mu = \sqrt{n(n+2)}$ BM; colour from d–d transitions; $d^0$ and $d^{10}$ ions are colourless.`,
        'Catalysts, interstitial compounds, alloys and complexes are typical of transition metals.',
      ],
      v: table(['Property', 'Key idea'], [['Configuration', 'd⁵ and d¹⁰ extra stable'], ['Oxidation states', 'Maximum +7 at Mn'], ['Magnetism', 'μ = √(n(n+2)) BM'], ['Colour', 'd–d transitions']], 'Summary table of the key ideas for configuration, oxidation states, magnetism and colour'),
      n: 'Let us sum up Part 1. Transition elements have incomplete d subshells. Chromium and copper have special configurations, and ions lose their four s electrons first. The extra stability of half-filled and filled d subshells explains many trends in ionisation enthalpy, oxidation state and electrode potential. Unpaired d electrons give magnetism and colour, and these metals are excellent catalysts and form alloys and interstitial compounds.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'For ions, remove 4s electrons before 3d: Fe²⁺ is 3d⁶, not 3d⁴4s².',
        'Count unpaired electrons by filling five d orbitals singly first.',
        'Give the reason with every anomaly: half-filled d⁵ or filled d¹⁰ stability.',
        'Zinc is not a transition element: say why (d¹⁰ in atom and ion).',
        'For colour, mention d–d transition and absorption of visible light; for magnetism, unpaired electrons.',
      ],
      v: table(['Slip', 'Fix'], [['Fe²⁺ written 3d⁴4s²', 'Remove 4s first: 3d⁶'], ['μ in BM without √', 'μ = √(n(n+2))'], ['"Zn is a transition metal"', 'd¹⁰ in atom and ion']], 'Table of three common slips in Part 1 and their fixes'),
      n: 'Some exam tips. When writing ions, take electrons from four s first. When counting unpaired electrons, fill all five d orbitals singly before pairing. Every anomaly answer should mention the special stability of half-filled or filled d subshells. Explain why zinc is not a transition element. And for colour, always mention d to d transitions and the absorption of visible light.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'The d- and f-Block Elements — Part 2: Dichromate, permanganate, lanthanoids and actinoids',
  goals: [
    'Describe the preparation and structure of potassium dichromate and potassium permanganate',
    'Write ionic equations for their oxidising reactions and use them in titration calculations',
    'Explain the lanthanoid contraction and its consequences, and compare lanthanoids with actinoids',
    'State important applications of d- and f-block elements',
  ],
  slides: [
    sl('title', 'Two famous oxidising agents and the inner transition elements', {
      b: 'Part 2 — orange dichromate and purple permanganate in the laboratory, and the f-block elements at the foot of the periodic table.',
      v: flow('LR', [['a', 'Potassium dichromate'], ['b', 'Potassium permanganate'], ['c', 'Lanthanoids'], ['d', 'Actinoids'], ['e', 'Applications']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']], 'Flow of the topics in Part 2: potassium dichromate, potassium permanganate, lanthanoids, actinoids and applications'),
      n: 'In Part 2 we meet two compounds you will use in the practical laboratory: orange potassium dichromate and deep purple potassium permanganate. Both are powerful oxidising agents. Then we move to the f-block: the lanthanoids, whose steadily shrinking size has surprising consequences, and the actinoids, which include uranium and plutonium. We finish with uses of these elements in everyday life and industry.',
    }),
    sl('concept', 'Making potassium dichromate', {
      b: r`From **chromite ore** ($\ce{FeCr2O4}$): (1) fuse with sodium carbonate in air to give sodium chromate; (2) acidify to give sodium dichromate; (3) add potassium chloride; the less soluble potassium dichromate crystallises.`,
      m: [r`\ce{4FeCr2O4 + 8Na2CO3 + 7O2 -> 8Na2CrO4 + 2Fe2O3 + 8CO2}`, r`\ce{2Na2CrO4 + 2H+ -> Na2Cr2O7 + 2Na+ + H2O}`, r`\ce{Na2Cr2O7 + 2KCl -> K2Cr2O7 + 2NaCl}`],
      v: flow('LR', [['a', 'Chromite ore FeCr₂O₄'], ['b', 'Fuse with Na₂CO₃ in air → Na₂CrO₄ (yellow)'], ['c', 'Acidify → Na₂Cr₂O₇ (orange)'], ['d', 'Add KCl → K₂Cr₂O₇ crystals']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow for making potassium dichromate: chromite ore fused with sodium carbonate in air to sodium chromate, acidified to sodium dichromate, then potassium chloride added'),
      n: 'Potassium dichromate is made from chromite, an ore of iron and chromium. Heating the ore with sodium carbonate in air oxidises chromium to yellow sodium chromate. Adding acid turns the chromate into orange dichromate. Finally, potassium chloride is added: potassium dichromate is less soluble than the sodium salt, so it crystallises out as orange crystals.',
    }),
    sl('diagram', 'Chromate and dichromate: structures and pH', {
      b: r`Chromate is tetrahedral; dichromate is two tetrahedra sharing a corner oxygen. They interconvert with pH: acid turns **yellow chromate into orange dichromate**; alkali does the reverse. Chromium is **+6** in both.`,
      v: V.chromate,
      m: [r`\ce{2CrO4^2- + 2H+ <=> Cr2O7^2- + H2O}`],
      n: 'Look at the shapes. The chromate ion is a tetrahedron of four oxygen atoms around chromium. In dichromate, two such tetrahedra share one corner oxygen. In solution the two ions are in equilibrium. Add acid, and yellow chromate turns orange as dichromate forms; add alkali, and the orange turns yellow again. Chromium is in the plus six state in both, so this is not a redox change.',
    }),
    sl('concept', 'Dichromate as an oxidising agent', {
      b: r`In acid, dichromate is a strong oxidising agent ($E^\circ = +1.33\ \text{V}$). Each dichromate ion accepts **six electrons**, and orange $\ce{Cr2O7^2-}$ becomes green $\ce{Cr^3+}$.`,
      m: [r`\ce{Cr2O7^2- + 14H+ + 6e- -> 2Cr^3+ + 7H2O}`],
      v: table(['Reducing agent', 'Product', 'Ionic equation (acid)'], [['Iron(II)', 'Iron(III)', r`$\ce{Cr2O7^2- + 14H+ + 6Fe^2+ -> 2Cr^3+ + 6Fe^3+ + 7H2O}$`], ['Iodide', 'Iodine', r`$\ce{Cr2O7^2- + 14H+ + 6I- -> 2Cr^3+ + 3I2 + 7H2O}$`], ['Hydrogen sulfide', 'Sulfur', r`$\ce{Cr2O7^2- + 8H+ + 3H2S -> 2Cr^3+ + 3S + 7H2O}$`], ['Tin(II)', 'Tin(IV)', r`$\ce{Cr2O7^2- + 14H+ + 3Sn^2+ -> 2Cr^3+ + 3Sn^4+ + 7H2O}$`]], 'Table of the ionic equations for acidified dichromate oxidising iron two, iodide, hydrogen sulfide and tin two'),
      n: 'Acidified dichromate grabs six electrons per ion, and each chromium drops from plus six to plus three, turning the solution from orange to green. It oxidises iron two plus to iron three plus, iodide to iodine, hydrogen sulfide to sulfur and tin two plus to tin four plus. The colour change from orange to green was used in early breath tests for alcohol.',
    }),
    sl('example', 'Worked example: a dichromate titration', {
      b: r`**Problem.** $25.0\ \text{mL}$ of $0.020\ \text{M}$ potassium dichromate exactly oxidises the iron(II) in a sample. How many moles of $\ce{Fe^2+}$ were present?

**Step 1.** Moles of dichromate $= 0.020 \times 0.0250 = 5.0 \times 10^{-4}$.

**Step 2.** From the equation, $1\ \ce{Cr2O7^2-}$ reacts with $6\ \ce{Fe^2+}$: moles of $\ce{Fe^2+} = 6 \times 5.0 \times 10^{-4} = 3.0 \times 10^{-3}$.

**Step 3.** Mass of iron $= 3.0 \times 10^{-3} \times 56 = 0.168\ \text{g}$.`,
      v: table(['Quantity', 'Value'], [['Dichromate used', r`$5.0 \times 10^{-4}\ \text{mol}$`], ['Mole ratio Cr₂O₇²⁻ : Fe²⁺', '1 : 6'], ['Iron(II)', r`$3.0 \times 10^{-3}\ \text{mol}$ (0.168 g)`]], 'Table of the titration results: moles of dichromate, the 1 to 6 ratio and moles and mass of iron two'),
      n: 'In titrations, the balanced ionic equation is everything. First find the moles of dichromate from its volume in litres and molarity: five ten-thousandths of a mole. The equation shows that each dichromate oxidises six iron two plus ions, so there were three thousandths of a mole of iron, or about one hundred and sixty eight milligrams.',
    }),
    sl('check', 'Quick check: chromate to dichromate', {
      b: 'Decide what happens when acid is added to a yellow solution of potassium chromate.',
      n: 'Quick check. Recall the chromate–dichromate equilibrium and whether the oxidation state of chromium changes.',
      chk: 'chromate-acid-mcq',
    }),
    sl('concept', 'Making potassium permanganate', {
      b: r`**Pyrolusite** ($\ce{MnO2}$) is fused with potassium hydroxide and an oxidant (air or potassium nitrate) to give dark green **potassium manganate**. In neutral or acid solution, manganate **disproportionates** to permanganate and $\ce{MnO2}$; industrially it is oxidised electrolytically.`,
      m: [r`\ce{2MnO2 + 4KOH + O2 -> 2K2MnO4 + 2H2O}`, r`\ce{3MnO4^2- + 4H+ -> 2MnO4- + MnO2 + 2H2O}`],
      v: flow('LR', [['a', 'Pyrolusite MnO₂'], ['b', 'Fuse with KOH + O₂ → K₂MnO₄ (green, Mn +6)'], ['c', 'Acid: disproportionation, or electrolytic oxidation'], ['d', 'KMnO₄ (purple, Mn +7)']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow for making potassium permanganate from pyrolusite through green potassium manganate'),
      n: 'Potassium permanganate starts from pyrolusite, manganese dioxide. Fusing it with potassium hydroxide in air gives dark green potassium manganate, with manganese in the plus six state. In acid, manganate disproportionates: some manganese goes up to plus seven as purple permanganate, and some goes down to plus four as manganese dioxide. Industry instead oxidises manganate electrolytically, wasting none of it.',
    }),
    sl('diagram', 'Manganate and permanganate', {
      b: 'Both ions are tetrahedral. **Manganate** ($\\ce{MnO4^2-}$, Mn +6, $d^1$) is green and paramagnetic; **permanganate** ($\\ce{MnO4-}$, Mn +7, $d^0$) is purple and diamagnetic. The intense purple comes from charge transfer, not a d–d transition.',
      v: V.manganate,
      n: 'Manganate and permanganate look alike: four oxygen atoms around manganese, arranged tetrahedrally. The difference is one electron. Manganate has one d electron, so it is paramagnetic and green. Permanganate has none, so it is diamagnetic. Its deep purple colour cannot come from a d to d jump; instead, light moves charge from oxygen to manganese, which is called charge transfer.',
    }),
    sl('concept', 'Permanganate as an oxidising agent', {
      b: r`In **acid**, each permanganate gains **five** electrons and becomes nearly colourless $\ce{Mn^2+}$ ($E^\circ = +1.52\ \text{V}$); this is why it acts as its own indicator in titrations. In **neutral or faintly alkaline** solution it gains **three** electrons and gives brown $\ce{MnO2}$.`,
      m: [r`\text{Acid: } \ce{MnO4- + 8H+ + 5e- -> Mn^2+ + 4H2O}`, r`\text{Neutral: } \ce{MnO4- + 2H2O + 3e- -> MnO2 + 4OH-}`],
      v: table(['Reducing agent (acid)', 'Ionic equation'], [['Iron(II)', r`$\ce{MnO4- + 5Fe^2+ + 8H+ -> Mn^2+ + 5Fe^3+ + 4H2O}$`], ['Oxalate', r`$\ce{2MnO4- + 5C2O4^2- + 16H+ -> 2Mn^2+ + 10CO2 + 8H2O}$`], ['Iodide', r`$\ce{2MnO4- + 10I- + 16H+ -> 2Mn^2+ + 5I2 + 8H2O}$`]], 'Table of ionic equations for acidified permanganate oxidising iron two, oxalate and iodide'),
      n: 'Permanganate is even more powerful than dichromate. In acid each ion takes five electrons and becomes the almost colourless manganese two plus ion. So in a titration the first extra drop leaves a permanent pink colour, and no other indicator is needed. In neutral solution it takes only three electrons and gives a brown precipitate of manganese dioxide. Hydrochloric acid is never used to acidify it, because chloride would be oxidised.',
    }),
    sl('example', 'Worked example: a permanganate titration', {
      b: r`**Problem.** What volume of $0.020\ \text{M}$ $\ce{KMnO4}$ is needed to oxidise $25.0\ \text{mL}$ of $0.10\ \text{M}$ iron(II) sulfate in acid?

**Step 1.** Moles of $\ce{Fe^2+} = 0.10 \times 0.0250 = 2.5 \times 10^{-3}$.

**Step 2.** $1\ \ce{MnO4-}$ oxidises $5\ \ce{Fe^2+}$: moles of $\ce{MnO4-} = \dfrac{2.5 \times 10^{-3}}{5} = 5.0 \times 10^{-4}$.

**Step 3.** Volume $= \dfrac{5.0 \times 10^{-4}}{0.020} = 0.025\ \text{L} = 25.0\ \text{mL}$.`,
      v: table(['Quantity', 'Value'], [['Iron(II)', r`$2.5 \times 10^{-3}\ \text{mol}$`], ['Ratio MnO₄⁻ : Fe²⁺', '1 : 5'], ['Permanganate', r`$5.0 \times 10^{-4}\ \text{mol}$`], ['Volume of 0.020 M KMnO₄', '25.0 mL']], 'Table of the permanganate titration: moles of iron two, the 1 to 5 ratio, moles of permanganate and the volume of 25.0 millilitres'),
      n: 'Start from the solution you know completely: twenty five millilitres of zero point one molar iron two plus is two and a half thousandths of a mole. One permanganate ion oxidises five iron ions, so we need one fifth as many moles of permanganate. Dividing by its molarity gives twenty five millilitres. In the laboratory, the end point is the first permanent pale pink.',
    }),
    sl('check', 'Quick check: electrons gained', {
      b: 'Decide how many electrons one permanganate ion gains in acidic solution.',
      n: 'Quick check. Work out the oxidation state of manganese in permanganate and in the product formed in acid.',
      chk: 'mno4-electrons-mcq',
    }),
    sl('concept', 'The f-block: lanthanoids and actinoids', {
      b: 'The **lanthanoids** (Ce to Lu, after La) fill the 4f orbitals; the **actinoids** (Th to Lr, after Ac) fill 5f. Together they are the **inner transition elements**. The common oxidation state of lanthanoids is **+3**; Ce⁴⁺ is a good oxidant and Eu²⁺ and Yb²⁺ are reductants, because of empty, half-filled or full f subshells.',
      m: [r`\text{Lanthanoids: } [\text{Xe}]4f^{1\text{–}14}5d^{0\text{–}1}6s^2`],
      v: table(['Ion', 'Configuration', 'Why it forms'], [[r`$\ce{Ce^4+}$`, r`$4f^0$`, 'Noble-gas configuration; strong oxidant'], [r`$\ce{Eu^2+}$`, r`$4f^7$`, 'Half-filled f; reductant'], [r`$\ce{Tb^4+}$`, r`$4f^7$`, 'Half-filled f; oxidant'], [r`$\ce{Yb^2+}$`, r`$4f^{14}$`, 'Filled f; reductant']], 'Table of lanthanoid ions in unusual oxidation states, cerium four plus, europium two plus, terbium four plus and ytterbium two plus, and their configurations'),
      n: 'The f-block elements are placed below the main table. In the lanthanoids, electrons fill the four f orbitals, buried deep inside the atom; in the actinoids they fill five f. Lanthanoids are mostly plus three. A few show plus two or plus four when that gives an empty, half-filled or full f subshell: cerium four plus is an oxidising agent, europium two plus a reducing agent.',
    }),
    sl('diagram', 'The lanthanoid contraction', {
      b: 'From lanthanum to lutetium, atomic and ionic radii **decrease steadily**. Each added electron goes into the **4f** subshell, which shields the outer electrons very poorly from the rising nuclear charge.',
      v: lnPlot,
      n: 'Across the lanthanoids, the size of the tripositive ion shrinks steadily, from about one hundred and three picometres for lanthanum to about eighty six for lutetium. This is the lanthanoid contraction. The four f electrons are spread out awkwardly and shield the outer electrons poorly, so as protons are added, the outer shell is pulled in a little more each time.',
    }),
    sl('concept', 'Consequences of the lanthanoid contraction', {
      b: 'The contraction cancels the size increase expected from the 4d to the 5d series, so **second and third series elements in a group have almost equal radii** and very similar properties.',
      v: table(['Consequence', 'Example'], [['4d and 5d elements of a group are almost the same size', r`Zr $160\ \text{pm}$, Hf $159\ \text{pm}$`], ['They occur together and are very hard to separate', 'Zirconium and hafnium'], ['Basicity of hydroxides decreases from La to Lu', r`$\ce{La(OH)3}$ most basic, $\ce{Lu(OH)3}$ least`], ['Lanthanoids are hard to separate from one another', 'Need ion exchange or repeated crystallisation']], 'Table of the consequences of the lanthanoid contraction: equal sizes of zirconium and hafnium, difficulty of separation and the fall in basicity of lanthanoid hydroxides'),
      n: 'The lanthanoid contraction has surprising effects outside the f-block. Normally atoms grow down a group, but hafnium, which comes just after the lanthanoids, is almost exactly the same size as zirconium above it. So the two have nearly identical chemistry, occur together in nature and are very hard to separate. Within the series, the smaller ions hold hydroxide more tightly, so the hydroxides become less basic.',
    }),
    sl('two-column', 'Lanthanoids and actinoids compared', {
      b: 'Both fill f orbitals and show a contraction, but the **5f orbitals are less deeply buried** than 4f, so actinoids are more varied.',
      cols: [
        '**Lanthanoids (4f)**\n\n- Mostly +3; a few +2 and +4\n- Mostly not radioactive (except promethium)\n- Contraction smaller\n- Less tendency to form complexes',
        '**Actinoids (5f)**\n\n- Many states, up to +7 (e.g. Np, Pu)\n- All radioactive; many made artificially\n- Contraction greater (poorer 5f shielding)\n- Greater tendency to form complexes; e.g. uranyl ion',
      ],
      v: table(['Feature', 'Lanthanoids', 'Actinoids'], [['Orbitals filled', '4f', '5f'], ['Oxidation states', 'Mainly +3', '+3 to +7'], ['Radioactivity', 'Only Pm', 'All'], ['Complex formation', 'Less', 'More']], 'Table comparing lanthanoids and actinoids by orbitals filled, oxidation states, radioactivity and complex formation'),
      n: 'Lanthanoids and actinoids are cousins, but the actinoids are more adventurous. Their five f orbitals reach further out and are closer in energy to the six d and seven s orbitals, so many more electrons can be used in bonding, giving oxidation states up to plus seven. All actinoids are radioactive, and those after uranium are mostly made in nuclear reactors. They also form complexes more readily.',
    }),
    sl('check', 'Quick check: lanthanoid contraction', {
      b: 'Identify a consequence of the lanthanoid contraction.',
      n: 'Quick check. Think about what happens to the sizes of the second and third transition series in the same group.',
      chk: 'contraction-mcq',
    }),
    sl('concept', 'Uses of d- and f-block elements', {
      b: 'From kitchens to space, these elements are everywhere.',
      v: table(['Element or compound', 'Use'], [['Iron, chromium, nickel, manganese', 'Steels and stainless steel for construction, tools and utensils'], ['Titanium', 'Light, strong, corrosion-resistant parts for aircraft and implants'], [r`$\ce{V2O5}$, iron, nickel`, 'Catalysts for sulfuric acid, ammonia and hydrogenation of oils'], ['Copper, silver, gold', 'Coins, jewellery, electrical wiring'], ['Silver bromide', 'Traditional photographic film'], ['Mischmetall (lanthanoids with about 5% iron)', 'Flints for lighters; alloy for steel'], ['Lanthanoid oxides', 'Phosphors in screens and LED lamps'], ['Uranium, plutonium', 'Nuclear fuel']], 'Table of uses of d- and f-block elements: steels, titanium alloys, catalysts, coinage metals, silver bromide, mischmetall, lanthanoid phosphors and nuclear fuels'),
      n: 'The uses are endless. Iron, chromium and nickel give us stainless steel utensils. Titanium makes light, strong aircraft parts and hip implants. Vanadium pentoxide, iron and nickel are industrial catalysts. Copper, silver and gold carry electricity and make jewellery. Mischmetall, mostly lanthanoids with some iron, makes lighter flints. Lanthanoid compounds glow in screens and lamps, and uranium fuels nuclear power stations.',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'K₂Cr₂O₇: chromite → Na₂CrO₄ → Na₂Cr₂O₇ → K₂Cr₂O₇; chromate (yellow) ⇌ dichromate (orange) with pH; acid dichromate takes 6 e⁻ → 2Cr³⁺.',
        'KMnO₄: MnO₂ + KOH + O₂ → K₂MnO₄ (green) → KMnO₄ (purple); acid: MnO₄⁻ + 5e⁻ → Mn²⁺; neutral: → MnO₂.',
        'Titrations: use mole ratios 1 : 6 (Cr₂O₇²⁻ : Fe²⁺) and 1 : 5 (MnO₄⁻ : Fe²⁺).',
        'Lanthanoids mostly +3; lanthanoid contraction from poor 4f shielding; Zr and Hf almost equal in size.',
        'Actinoids: more oxidation states, all radioactive, more complex formation.',
      ],
      v: table(['Oxidant (acid)', 'Electrons gained', 'Colour change'], [['Dichromate', '6 per ion', 'Orange → green'], ['Permanganate', '5 per ion', 'Purple → almost colourless']], 'Summary table of dichromate and permanganate as oxidising agents with electrons gained and colour changes'),
      n: 'Let us sum up Part 2. Potassium dichromate and permanganate are made from their ores through chromate and manganate, and both are strong oxidising agents in acid, taking six and five electrons per ion. Mole ratios from their ionic equations drive every titration calculation. In the f-block, the lanthanoid contraction makes heavy transition metals almost the same size as those above them, and actinoids show a wider range of chemistry.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'Balance ionic equations for atoms and charge; check that electrons lost equal electrons gained.',
        'Chromate ⇌ dichromate is not a redox change: Cr stays +6.',
        'Never acidify permanganate with HCl: chloride is oxidised to chlorine.',
        'For the lanthanoid contraction, give the cause (poor shielding by 4f) and one consequence (Zr–Hf).',
        'In titrations, convert mL to L before multiplying by molarity.',
      ],
      v: table(['Slip', 'Fix'], [['Calling chromate → dichromate a reduction', 'Cr is +6 in both'], ['5 e⁻ for permanganate in neutral solution', 'Neutral: 3 e⁻, gives MnO₂'], ['Volume in mL in n = MV', 'Use litres']], 'Table of three common slips in Part 2 and their fixes'),
      n: 'Some final tips. Balance every ionic equation for both atoms and charge. Remember that turning chromate into dichromate is not a redox reaction. Never use hydrochloric acid with permanganate. For the lanthanoid contraction, write both the cause and a consequence. And in titrations, convert millilitres to litres before you multiply by molarity.',
    }),
  ],
});
