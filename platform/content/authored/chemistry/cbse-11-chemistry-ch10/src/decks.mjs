// ch10 s- and p-Block Elements (formative assessment only) — Part 1: general trends, groups 1 and 2; Part 2: groups 13 and 14.
import { sl, deck, table, svgV, r } from './lib.mjs';
import { G1TREND, G13TREND, HYDRATION, CATENATION, DIAGONAL, DATA } from './svgs.mjs';

const D = DATA;
export const V = {
  g1: svgV(G1TREND, 'Line plots of atomic and M plus ionic radius and of first ionisation enthalpy from lithium to caesium', 'Radius rises smoothly and ionisation enthalpy falls smoothly down group 1.'),
  g13: svgV(G13TREND, 'Line plots of atomic and M three plus radius and of first ionisation enthalpy from boron to thallium', 'Group 13 breaks the smooth trend: gallium is smaller than aluminium and the ionisation enthalpies are irregular.'),
  hyd: svgV(HYDRATION, 'Bar chart of the hydration enthalpy of lithium to caesium ions falling as ionic radius increases', 'Values are NCERT-style magnitudes in kJ mol⁻¹.'),
  cat: svgV(CATENATION, 'Bar chart of homonuclear single-bond enthalpy for carbon, silicon, germanium and tin', 'Carbon forms the strongest E–E bond in the group.'),
  diag: svgV(DIAGONAL, 'Periodic table fragment with diagonal arrows from lithium to magnesium, beryllium to aluminium and boron to silicon', 'Red arrows mark the diagonal pairs; the data panel compares sizes and charge per radius.'),
};

const IE_SUM = (a, n) => a.slice(0, n).reduce((s, x) => s + x, 0);
const ie3 = (i) => D.g13.ie1[i] + D.g13.ie2[i] + D.g13.ie3[i];

export const deck1 = deck({
  part: 1,
  title: 's- and p-Block Elements — Part 1: General trends, groups 1 and 2',
  goals: [
    'Write the valence configurations of the s-block and p-block groups',
    'Explain the trends in atomic radius, ionic radius, ionisation enthalpy, hydration enthalpy and reducing power in groups 1 and 2',
    'Name the flame colours of the alkali and alkaline earth metals and explain why beryllium and magnesium give none',
    'Explain the unique behaviour of lithium and beryllium and the diagonal relationships Li–Mg and Be–Al',
  ],
  slides: [
    sl('title', 's- and p-Block Elements', {
      b: 'Part 1 — the general plan of the s-block and p-block, then groups 1 and 2. **This chapter is formative assessment only:** it is not part of the annual theory paper, but it is taught here at textbook depth for school tests.',
      v: table(['Block', 'Groups', 'Valence configuration', 'Examples'], [['s-block', '1 and 2', 'ns¹ and ns²', 'Sodium, calcium'], ['p-block', '13 to 18', 'ns² np¹ to ns² np⁶', 'Aluminium, carbon, chlorine'], ['d-block', '3 to 12', '(n−1)d¹⁻¹⁰ ns¹⁻²', 'Iron, copper'], ['f-block', 'Inner transition', '(n−2)f¹⁻¹⁴ …', 'Cerium, uranium']], 'Table of the four blocks of the periodic table with groups and valence configurations'),
      n: 'Welcome to a short chapter on the s block and the p block. These two blocks hold most of the elements you meet daily: the sodium in salt, the calcium in bones, the aluminium in foil, the carbon in pencils. This chapter is for formative assessment only, so it will not appear in the annual theory paper, but your school tests can ask it. Part one covers general trends and then groups one and two.',
    }),
    sl('concept', 'Valence configurations of the s-block and p-block', {
      b: 'The s-block fills an **ns** subshell; the p-block fills **np** after ns². Every group has the same valence configuration all the way down, so the **properties follow a pattern within the group**.',
      v: table(['Group', 'Valence configuration', 'Family name', 'Common ions'], [['1', 'ns¹', 'Alkali metals', 'M⁺'], ['2', 'ns²', 'Alkaline earth metals', 'M²⁺'], ['13', 'ns² np¹', 'Boron family', 'M³⁺, M⁺'], ['14', 'ns² np²', 'Carbon family', 'M⁴⁺ (covalent), M²⁺'], ['15 to 17', 'ns² np³ to ns² np⁵', 'Nitrogen, oxygen, halogen families', 'Anions'], ['18', 'ns² np⁶', 'Noble gases', 'None (except Xe, Kr compounds)']], 'Table of s-block and p-block groups with valence configuration, family name and common ions'),
      n: 'The s block is made of groups one and two. Their atoms end in an s subshell: one electron in group one, two in group two. The p block is groups thirteen to eighteen, where p electrons are added after the filled s subshell. All members of a group share the same valence shell pattern, which is why they behave alike. The first member of each group is usually the odd one out.',
    }),
    sl('concept', 'Trends down a group: radius and ionisation enthalpy', {
      b: 'Down a group each atom has **one more shell**, so radius rises; the outer electron feels a weaker pull, so **ionisation enthalpy falls**. A cation is smaller than its atom, because it has lost its outer shell and has the same nuclear charge holding fewer electrons.',
      v: table(['Property', 'Li', 'Na', 'K', 'Rb', 'Cs'], [['Atomic radius / pm', ...D.g1.rAtom.map(String)], ['M⁺ radius / pm', ...D.g1.rIon.map(String)], ['IE₁ / kJ mol⁻¹', ...D.g1.ie1.map(String)]], 'Table of atomic radius, ionic radius and first ionisation enthalpy for the alkali metals'),
      n: 'Going down group one, every atom adds a whole new shell. So the radius climbs from lithium to caesium. The outer electron is farther from the nucleus and better screened, so it is easier to remove, and ionisation enthalpy falls. The ions are much smaller than their atoms, because losing the outer shell leaves the same nuclear charge pulling on fewer electrons in a smaller cloud. Look at the numbers in the table.',
    }),
    sl('diagram', 'Group 1 trends as plots', {
      b: 'Both curves are smooth: the radius rises and the first ionisation enthalpy falls from Li to Cs. The M⁺ ion is always smaller than the atom.',
      v: V.g1,
      n: 'Here the same data are plotted. On the left, the blue line shows the atomic radius rising from lithium to caesium, and the red line shows the ion radius rising in the same way but staying far lower. On the right, the first ionisation enthalpy falls steadily. Group one is a very regular family, which is why it is the standard example for periodic trends.',
    }),
    sl('check', 'Quick check: group 1 trend', {
      b: 'Apply the trend to an ionisation enthalpy.',
      n: 'Quick check. Think about which alkali metal holds its outer electron most loosely.',
      chk: 'chk-ie',
    }),
    sl('concept', 'Ionisation enthalpy in groups 1 and 2', {
      b: 'Group 2 atoms have a **higher IE₁** than their group 1 neighbours (greater nuclear charge, smaller size, filled ns²). But the **second** ionisation enthalpy is huge for group 1 (an inner shell is attacked) and moderate for group 2, so they form **M⁺** and **M²⁺** respectively.',
      v: table(['Element', 'IE₁ / kJ mol⁻¹', 'IE₂ / kJ mol⁻¹', 'Ion formed'], [['Na', '496', '4562', 'Na⁺'], ['Mg', String(D.g2.ie1[1]), String(D.g2.ie2[1]), 'Mg²⁺'], ['Be', String(D.g2.ie1[0]), String(D.g2.ie2[0]), 'Be²⁺ (covalent compounds)'], ['Ca', String(D.g2.ie1[2]), String(D.g2.ie2[2]), 'Ca²⁺'], ['Ba', String(D.g2.ie1[4]), String(D.g2.ie2[4]), 'Ba²⁺']], 'Table of first and second ionisation enthalpies of sodium, magnesium, beryllium, calcium and barium'),
      n: 'Compare sodium and magnesium. Magnesium has the higher first ionisation enthalpy because its nucleus carries one more charge and its atom is smaller. But look at the second one. For sodium the second electron comes from a filled inner shell and costs a huge amount, so sodium stops at plus one. For magnesium the second electron is still in the outer shell, so a plus two ion forms readily and its lattice energy pays for the extra cost.',
    }),
    sl('example', 'Worked example: why Na⁺ but Mg²⁺?', {
      b: r`**Problem.** Using IE₁ and IE₂ (kJ mol⁻¹): Na 496, 4562; Mg 737, 1450. Explain why sodium forms $\ce{Na+}$ and magnesium forms $\ce{Mg^2+}$ in compounds.

**Step 1.** Ratio IE₂/IE₁: Na $= 4562 \div 496 = ${(4562 / 496).toFixed(1)}$; Mg $= 1450 \div 737 = ${(1450 / 737).toFixed(2)}$.

**Step 2.** For Na the second electron comes from the **inner 2p shell** (neon core); the jump is about nine-fold, which no lattice enthalpy can repay.

**Step 3.** For Mg the second electron is the other 3s electron; the cost is only about twice IE₁, and the lattice enthalpy of $\ce{MgCl2}$ more than compensates.

**Answer:** Na⁺ (noble-gas core intact) and Mg²⁺ (both ns electrons lost).`,
      v: table(['Element', 'IE₂ ÷ IE₁', 'Electron removed second', 'Common ion'], [['Na', (4562 / 496).toFixed(1), 'From the 2p core', 'Na⁺'], ['Mg', (1450 / 737).toFixed(2), 'Second 3s electron', 'Mg²⁺']], 'Table comparing the ratio of second to first ionisation enthalpy for sodium and magnesium'),
      n: 'Work through it in steps. First, divide the second ionisation enthalpy by the first. For sodium the ratio is about nine point two, a huge jump. For magnesium it is only about one point nine seven. Second, ask where the next electron comes from. In sodium it comes from the neon core, so it is costly. In magnesium it is the second outer electron. So sodium forms a one plus ion and magnesium a two plus ion.',
    }),
    sl('concept', 'Flame colours', {
      b: 'In a flame, heat excites the outer electron of Li, Na, K, Rb, Cs, Ca, Sr and Ba to a higher level; on falling back it **emits visible light** of a characteristic wavelength. The low ionisation enthalpy makes this easy. **Be and Mg** have small atoms with tightly held electrons, so the flame cannot excite them: **no colour**.',
      v: table(['Metal', 'Li', 'Na', 'K', 'Rb', 'Cs', 'Ca', 'Sr', 'Ba'], [['Flame colour', 'Crimson red', 'Golden yellow', 'Violet', 'Red-violet', 'Blue', 'Brick red', 'Crimson', 'Apple green']], 'Table of flame colours of alkali and alkaline earth metals'),
      n: 'A flame test is a quick way to spot a metal. The heat lifts an outer electron to a higher level. When it drops back it gives out light of one particular colour. Sodium gives golden yellow, potassium violet, lithium crimson red, calcium brick red, strontium crimson and barium apple green. Beryllium and magnesium show no colour, because their electrons are held so tightly that an ordinary flame cannot excite them.',
    }),
    sl('diagram', 'Hydration enthalpy of the alkali metal ions', {
      b: 'A smaller ion has a **higher charge density** and attracts more water molecules, so Li⁺ has the **most negative hydration enthalpy**. The magnitude falls steadily to Cs⁺. Hydrated Li⁺ is therefore the biggest ion in water and moves slowest.',
      v: V.hyd,
      n: 'This bar chart shows how much energy is released when each gaseous ion is surrounded by water. Lithium, the smallest ion, has a very high charge density, so it grips many water molecules tightly and releases the most energy. The bars shrink steadily toward caesium. A lithium ion drags a thick shell of water along, so in solution it is the bulkiest alkali ion and conducts least.',
    }),
    sl('check', 'Quick check: hydration', {
      b: 'Link ionic size to hydration.',
      n: 'Quick check. Think about charge density and water molecules.',
      chk: 'chk-hyd',
    }),
    sl('concept', 'Reducing character', {
      b: 'All s-block metals are strong reducing agents (they lose electrons easily); in water the strength is set by IE, sublimation and **hydration enthalpy**. **Li has the most negative E°** of the alkali metals although it has the highest IE₁, because its hydration enthalpy is so large.',
      v: table(['Metal', 'Li', 'Na', 'K', 'Be', 'Mg', 'Ca', 'Ba'], [['E° (M⁺ or M²⁺ / M) / V', '−3.05', '−2.71', '−2.93', '−1.97', '−2.36', '−2.84', '−2.92']], 'Table of standard electrode potentials of selected alkali and alkaline earth metals'),
      n: 'Reducing character means how readily a metal gives up electrons in water. Sodium and potassium follow the ionisation trend, but lithium has the most negative electrode potential of all, minus three point zero five volts. Its first ionisation enthalpy is the highest in group one, yet its very high hydration enthalpy more than makes up for that. In group two the reducing power rises from beryllium to barium. All of them are strong reducing agents.',
    }),
    sl('concept', 'Lithium: the unique first element of group 1', {
      b: 'Li is small, with a high charge density and polarising power, so its compounds show more **covalent character** and it differs from the rest.',
      m: [r`\ce{4Li + O2 -> 2Li2O}`, r`\ce{6Li + N2 -> 2Li3N}`, r`\ce{4LiNO3 -> 2Li2O + 4NO2 + O2}`, r`\ce{2NaNO3 -> 2NaNO2 + O2}`],
      v: table(['Property', 'Lithium', 'Na to Cs'], [['Product in dry air', 'Oxide Li₂O (and Li₃N)', 'Peroxide (Na) or superoxide (K, Rb, Cs)'], ['Reaction with N₂', 'Forms Li₃N', 'No reaction'], ['Nitrate on heating', 'Oxide + NO₂ + O₂', 'Nitrite + O₂'], ['Carbonate on heating', 'Decomposes to Li₂O', 'Stable'], ['Hydrogencarbonate', 'Not isolated as a solid', 'Solid compounds exist'], ['Chloride', 'Deliquescent, soluble in ethanol', 'Not deliquescent; no hydrate in NaCl or KCl']], 'Table comparing lithium with sodium to caesium in oxide, nitride, nitrate, carbonate, hydrogencarbonate and chloride behaviour'),
      n: 'Lithium behaves differently from its group. In air it gives a simple oxide, not a peroxide. It is the only alkali metal to react with nitrogen, forming lithium nitride. Its nitrate breaks down to the oxide, nitrogen dioxide and oxygen, while the others give a nitrite and oxygen. Its carbonate decomposes on heating, and it has no solid hydrogencarbonate. All this comes from its small size and high polarising power.',
    }),
    sl('diagram', 'Diagonal relationships', {
      b: 'Li resembles Mg, Be resembles Al, B resembles Si. Across a period size falls and charge rises; down a group size rises; **diagonally the two effects roughly cancel**, so ions have similar size or charge-to-radius ratio.',
      v: V.diag,
      n: 'Here is the periodic table fragment with the diagonal pairs. Lithium resembles magnesium, beryllium resembles aluminium, and boron resembles silicon. Moving across a period the atoms shrink and carry more charge. Moving down a group they grow. Along a diagonal these effects nearly cancel, so the ions have similar size or similar charge per radius, and the chemistry looks alike.',
    }),
    sl('example', 'Worked example: beryllium, the odd one out of group 2', {
      b: r`**Problem.** Give four ways in which Be differs from the rest of group 2 and two ways in which it resembles Al.

**Differences:** (1) smallest atom, highest IE₁ (899 kJ mol⁻¹) and highest electronegativity (1.5): **covalent compounds**; (2) **no d orbitals**, so maximum covalency 4 (the others reach 6); (3) BeO and Be(OH)₂ are **amphoteric**; (4) Be does not give a flame colour and resists water.

**Resemblance to Al:** (i) both are rendered passive by concentrated nitric acid; (ii) both dissolve in alkali: $\ce{Be + 2OH- + 2H2O -> Be(OH)4^2- + H2}$.

**Answer:** small size and high charge density explain every point.`,
      v: table(['Property', 'Be', 'Mg to Ba', 'Al'], [['Bonding in chlorides', 'Covalent', 'Ionic', 'Covalent (Al₂Cl₆)'], ['Oxide', 'Amphoteric', 'Basic', 'Amphoteric'], ['Maximum covalency', '4', '6', '6'], ['Conc. HNO₃', 'Passive', 'Reacts', 'Passive'], ['Carbide with water', 'Gives methane (Be₂C)', 'Gives ethyne (CaC₂)', 'Gives methane (Al₄C₃)']], 'Table comparing beryllium with the other group 2 metals and with aluminium'),
      n: 'Beryllium is the odd one out of group two for several reasons: it is tiny, it has the highest ionisation enthalpy and electronegativity, so its compounds are covalent. It has no d orbitals, so it can bond to at most four groups. Its oxide is amphoteric, and it dissolves in alkali to give hydrogen. These points are shared with aluminium, as the table shows. Both are made passive by concentrated nitric acid.',
    }),
    sl('check', 'Quick check: diagonal pairs', {
      b: 'Recognise a Li–Mg property.',
      n: 'Quick check. Which property lithium shares with magnesium?',
      chk: 'chk-diag',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Group 1: ns¹, M⁺; group 2: ns², M²⁺. Radius rises and IE₁ falls down a group.',
        'IE₂ is huge for group 1, moderate for group 2.',
        'Flame colours arise from excitation of the outer electron; Be and Mg give none.',
        'Li⁺ has the highest hydration enthalpy and Li the most negative E° in group 1.',
        'Li and Be are anomalous: covalent character, diagonal relationships with Mg and Al.',
      ],
      v: table(['Pair', 'Shared features'], [['Li and Mg', 'Nitride with N₂, carbonate and nitrate decompose on heating, no solid hydrogencarbonate, deliquescent chloride'], ['Be and Al', 'Amphoteric oxide and hydroxide, passive in conc. HNO₃, covalent chloride, carbide gives methane']], 'Table summarising the Li–Mg and Be–Al diagonal pairs'),
      n: 'Let us sum up Part one. Groups one and two give plus one and plus two ions. Radius rises and ionisation enthalpy falls down each group. Flame colours come from excited outer electrons. Lithium has the highest hydration enthalpy and the most negative electrode potential in its group. Lithium and beryllium are the unusual first members, and they resemble magnesium and aluminium through the diagonal relationship.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'When asked why Li has the most negative E°, name hydration enthalpy, not ionisation enthalpy.',
        'Write flame colours with the metal: Ca brick red, Sr crimson, Ba apple green, K violet.',
        'For Li and Be anomalies, argue from small size, high charge density, polarising power and absence of d orbitals.',
        'Quote IE₂ to explain why group 1 forms M⁺ and group 2 forms M²⁺.',
      ],
      v: table(['Slip', 'Fix'], [['Li has the lowest IE₁ in group 1', 'Li has the highest IE₁; it is the lowest in Cs'], ['Be and Mg give flame colours', 'They give none (tightly held electrons)'], ['Li forms a peroxide', 'Li forms the normal oxide Li₂O']], 'Table of three common slips about groups 1 and 2 and their fixes'),
      n: 'Some tips for tests. When asked about the electrode potential of lithium, say hydration enthalpy. Learn flame colours with their metals. Explain the anomalies of lithium and beryllium by their small size, high charge density, polarising power and, for beryllium, the lack of d orbitals. And use the second ionisation enthalpy to explain why group one forms plus one ions and group two forms plus two ions.',
    }),
  ],
});

const sum3 = (i) => ie3(i);
export const deck2 = deck({
  part: 2,
  title: 's- and p-Block Elements — Part 2: Groups 13 and 14',
  goals: [
    'Describe the trends in radius, ionisation enthalpy and electronegativity in groups 13 and 14 and explain the irregularities',
    'Explain the inert pair effect and the oxidation states of the heavier elements',
    'Explain the anomalous behaviour of boron and carbon, and the catenation of carbon',
    'Describe diamond, graphite and fullerene at a general level',
  ],
  slides: [
    sl('title', 'Groups 13 and 14: boron and carbon families', {
      b: 'Part 2 — the p-block elements B, Al, Ga, In, Tl and C, Si, Ge, Sn, Pb. As in Part 1, this chapter is **formative assessment only** and is taught at textbook depth for school tests.',
      v: table(['Element', 'Group', 'Valence configuration', 'Where you meet it'], [['Boron', '13', '2s² 2p¹', 'Borax, glass'], ['Aluminium', '13', '3s² 3p¹', 'Foil, cooking vessels'], ['Carbon', '14', '2s² 2p²', 'Diamond, graphite, all organic compounds'], ['Silicon', '14', '3s² 3p²', 'Sand, chips'], ['Lead', '14', '6s² 6p²', 'Batteries']], 'Table of some elements of groups 13 and 14 with valence configuration and uses'),
      n: 'Part two takes us to the p block: the boron family in group thirteen and the carbon family in group fourteen. You meet them as borax in glass, aluminium in foil, carbon in diamond and pencil lead, silicon in sand and chips, and lead in batteries. As in part one this is for formative assessment only. Watch two ideas as we go: the first member of each group is unusual, and heavier elements prefer the lower oxidation state.',
    }),
    sl('concept', 'Group 13: configuration and data', {
      b: 'Valence configuration **ns² np¹**. The metallic character increases from B (a metalloid) to Tl, but the data are **irregular** because of the poor shielding by inner d electrons from Ga onwards.',
      v: table(['Element', 'B', 'Al', 'Ga', 'In', 'Tl'], [['Atomic radius / pm', ...D.g13.rAtom.map(String)], ['M³⁺ radius / pm', ...D.g13.rIon.map(String)], ['IE₁ / kJ mol⁻¹', ...D.g13.ie1.map(String)], ['Electronegativity', ...D.g13.en.map((x) => x.toFixed(1))]], 'Table of atomic radius, M three plus radius, first ionisation enthalpy and electronegativity for boron to thallium'),
      n: 'Group thirteen atoms have the configuration s two p one. Look at the table. The radius rises from boron to aluminium, but gallium is slightly smaller than aluminium. Gallium comes after the ten d block elements, whose d electrons shield the nucleus poorly, so the outer electrons feel a stronger pull. The same effect makes the ionisation enthalpies irregular, and electronegativity rises from aluminium to thallium.',
    }),
    sl('diagram', 'Group 13 trends as plots', {
      b: 'Unlike group 1, **Ga < Al in size**, and IE₁ rises again at Ga and at Tl. Cause: the ten 3d electrons (and, for Tl, the 4f electrons) shield the extra nuclear charge **poorly**.',
      v: V.g13,
      n: 'The plot shows the irregularity clearly. The blue radius line dips at gallium, and the green ionisation line goes up at gallium and again at thallium. Inner d electrons and, in thallium, f electrons screen the growing nuclear charge poorly, so the outer electrons are held more strongly than a simple trend would predict. This is the opposite of the smooth behaviour of group one.',
    }),
    sl('check', 'Quick check: group 13 radius', {
      b: 'Explain the gallium dip.',
      n: 'Quick check. Think about electrons that screen poorly.',
      chk: 'chk-ga',
    }),
    sl('concept', 'Oxidation states and the inert pair effect', {
      b: 'Group 13 shows **+3** (all three valence electrons) and **+1** (only the np electron). Going down, the **ns² pair becomes reluctant to take part**: this is the **inert pair effect**. Al is almost always +3, but **Tl⁺ is more stable than Tl³⁺**.',
      m: [r`\ce{Tl3+ + 2e- -> Tl+}`],
      v: table(['Element', '+3 state', '+1 state', 'More stable'], [['Al', 'Al³⁺ very common', 'Rare', '+3'], ['Ga', 'Common', 'Uncommon', '+3'], ['In', 'Common', 'Fairly stable', '+3 (just)'], ['Tl', 'Tl³⁺ is oxidising', 'Tl⁺ common, like K⁺', '+1']], 'Table of the stability of the plus three and plus one oxidation states in group 13'),
      n: 'Group thirteen elements can lose all three outer electrons to show plus three, or lose only the p electron to show plus one. Down the group the s pair is held more tightly, because the heavy nucleus is poorly shielded and the s electrons are close to it. This is the inert pair effect. Aluminium is almost always plus three, but thallium plus one is more stable than thallium plus three, which is actually a good oxidising agent.',
    }),
    sl('example', 'Worked example: energy cost of M³⁺', {
      b: r`**Problem.** Using IE₁, IE₂, IE₃ in kJ mol⁻¹ (B: 801, 2427, 3659; Al: 577, 1816, 2744; Tl: 589, 1971, 2878), find the total energy to form the gaseous M³⁺ ion and comment.

**Boron:** $801 + 2427 + 3659 = ${ie3(0)}$ kJ mol⁻¹.

**Aluminium:** $577 + 1816 + 2744 = ${ie3(1)}$ kJ mol⁻¹.

**Thallium:** $589 + 1971 + 2878 = ${ie3(4)}$ kJ mol⁻¹.

**Comment.** B's huge sum (> 6800) cannot be repaid by lattice or hydration enthalpy, so boron forms **covalent compounds**. Tl's sum exceeds Al's, yet its larger size gives weaker bonds, so Tl³⁺ compounds do not repay the cost: Tl(I) is preferred.`,
      v: table(['Element', 'IE₁ + IE₂ + IE₃ / kJ mol⁻¹', 'Result'], [['B', String(sum3(0)), 'Covalent compounds only'], ['Al', String(sum3(1)), 'Al³⁺ in ionic and hydrated forms'], ['Tl', String(sum3(4)), 'Tl⁺ more stable (inert pair)']], 'Table of the sum of first three ionisation enthalpies for boron, aluminium and thallium'),
      n: 'Let us add up the cost of removing three electrons. For boron it is six thousand eight hundred eighty seven kilojoules per mole, far too much for any ionic bonding to repay, so boron makes covalent bonds. For aluminium it is five thousand one hundred thirty seven, which hydration and lattice energy can repay. Thallium costs more than aluminium and its bonds are weaker, so thallium usually stays plus one.',
    }),
    sl('concept', 'Anomalous behaviour of boron', {
      b: 'Boron is a **non-metal**, small, with high ionisation enthalpy and electronegativity, and it has **no d orbitals**, so its maximum covalency is **4**. Its compounds are covalent and **electron-deficient** (BCl₃ has only six electrons around B), so they act as **Lewis acids**.',
      m: [r`\ce{BF3 + F- -> BF4-}`, r`\ce{2AlCl3 -> Al2Cl6}`],
      v: table(['Property', 'Boron', 'Aluminium'], [['Nature', 'Non-metal (metalloid)', 'Metal'], ['Oxide', 'B₂O₃ acidic', 'Al₂O₃ amphoteric'], ['Maximum covalency', '4 (BF₄⁻)', '6 (AlF₆³⁻)'], ['Halide', 'BCl₃ monomeric Lewis acid', 'AlCl₃ dimerises to Al₂Cl₆'], ['Ions in solution', 'No B³⁺', 'Al³⁺ (hydrated)']], 'Table comparing boron and aluminium in nature, oxide, covalency, halide and ions'),
      n: 'Boron differs sharply from the rest of its group. It is a non-metal, its oxide is acidic, and its compounds are covalent. With no d orbitals its covalency stops at four, as in the tetrafluoroborate ion. Boron trichloride has only six electrons around boron, so it eagerly accepts a lone pair and is a Lewis acid. Aluminium, by contrast, is a metal with an amphoteric oxide and can reach a covalency of six.',
    }),
    sl('concept', 'Group 14: configuration and data', {
      b: 'Valence configuration **ns² np²**. Metallic character increases from C and Si (non-metal, metalloid) to Sn and Pb (metals). Covalent radius rises, IE₁ falls (with the small break at Pb), and electronegativity is almost constant from Si to Pb.',
      v: table(['Element', 'C', 'Si', 'Ge', 'Sn', 'Pb'], [['Covalent radius / pm', ...D.g14.rCov.map(String)], ['IE₁ / kJ mol⁻¹', ...D.g14.ie1.map(String)], ['Electronegativity', ...D.g14.en.map((x) => x.toFixed(1))], ['Nature', 'Non-metal', 'Metalloid', 'Metalloid', 'Metal', 'Metal']], 'Table of covalent radius, first ionisation enthalpy, electronegativity and nature for carbon to lead'),
      n: 'In group fourteen the valence configuration is s two p two. Going down, the covalent radius grows and the first ionisation enthalpy falls, though lead is slightly higher than tin. Electronegativity drops sharply from carbon to silicon and then hardly changes. Carbon and silicon are non metal and metalloid, germanium is a metalloid, and tin and lead are metals, so the group shows the whole range of character.',
    }),
    sl('diagram', 'Catenation in group 14', {
      b: '**Catenation** is the self-linking of atoms into chains and rings. **Carbon** is best at it, because the C–C bond is strong (348 kJ mol⁻¹) and almost as strong as C–H and C–O. The E–E bond weakens down the group, so Si, Ge and Sn form only short chains.',
      v: V.cat,
      n: 'Catenation means atoms joining themselves in long chains and rings. Carbon is the champion. The carbon carbon bond is strong, and its strength is close to that of carbon hydrogen and carbon oxygen bonds, so long chains do not fall apart in the presence of water or air. Down the group the self bond becomes weaker, from silicon through germanium to tin, so those elements only form short chains.',
    }),
    sl('check', 'Quick check: catenation', {
      b: 'Identify the reason for carbon’s catenation.',
      n: 'Quick check. Think about bond strengths.',
      chk: 'chk-cat',
    }),
    sl('concept', 'Inert pair effect in group 14', {
      b: 'Group 14 shows **+4** and **+2**. Going down, +2 becomes more stable: **Sn(II) is a reducing agent**, **Pb(IV) is an oxidising agent**, and **Pb(II) is the stable state of lead**.',
      m: [r`\ce{SnCl2 + 2HgCl2 -> SnCl4 + Hg2Cl2}`, r`\ce{PbO2 + 4HCl -> PbCl2 + Cl2 + 2H2O}`],
      v: table(['Element', 'Stable state', 'Behaviour of the other state'], [['C, Si', '+4', '+2 in CO only (reducing)'], ['Ge', '+4', 'Ge²⁺ is a reducing agent'], ['Sn', '+4 (just)', 'Sn²⁺ is a good reducing agent'], ['Pb', '+2', 'Pb⁴⁺ (PbO₂) is a strong oxidising agent']], 'Table of the stable oxidation states of group 14 elements and the behaviour of the other state'),
      n: 'Group fourteen can show plus four or plus two. Carbon, silicon and germanium prefer plus four. Going down, the pair of s electrons becomes inert, so plus two grows more stable. Tin two is a good reducing agent and is easily oxidised to tin four. Lead four is a strong oxidising agent: lead dioxide oxidises hydrochloric acid to chlorine, and lead two is the normal state of lead in its compounds.',
    }),
    sl('concept', 'Anomalous behaviour of carbon', {
      b: 'C is small, highly electronegative and has **no d orbitals** (maximum covalency 4). It forms **pπ–pπ multiple bonds** (C=C, C≡C, C=O) and has unmatched catenation. Si forms none of these and reaches 6 using d orbitals.',
      m: [r`\ce{SiCl4 + 4H2O -> Si(OH)4 + 4HCl}`, r`\ce{SiF4 + 2F- -> SiF6^2-}`],
      v: table(['Property', 'Carbon', 'Silicon'], [['Maximum covalency', '4', '6 (SiF₆²⁻)'], ['Multiple bonds', 'Common (C=C, C≡C, C=O)', 'Not formed'], ['Oxide', 'CO₂ gas, discrete molecule', 'SiO₂ solid, giant network'], ['Tetrachloride and water', 'CCl₄ not hydrolysed', 'SiCl₄ hydrolysed at once'], ['Hydrides', 'Large number (alkanes etc.)', 'Few, less stable (silanes)']], 'Table comparing carbon and silicon in covalency, multiple bonding, oxide, tetrachloride hydrolysis and hydrides'),
      n: 'Carbon is the unusual first member of group fourteen. It is small, so its p orbitals overlap sideways well and it forms double and triple bonds, which silicon cannot. That is why carbon dioxide is a gas of small molecules while silicon dioxide is a giant solid network. Carbon has no d orbitals, so it cannot be attacked by water in carbon tetrachloride, but silicon tetrachloride is hydrolysed at once and silicon reaches covalency six.',
    }),
    sl('example', 'Worked example: CCl₄ and SiCl₄ with water', {
      b: r`**Problem.** CCl₄ does not react with water but SiCl₄ fumes in moist air. Explain, and write the equation for SiCl₄.

**Step 1.** Hydrolysis needs the oxygen lone pair of $\ce{H2O}$ to attack the central atom.

**Step 2.** C has **no vacant d orbitals** and is shielded by four big Cl atoms: attack is impossible.

**Step 3.** Si has vacant 3d orbitals, so it can accept the lone pair and expand to five-coordinate.

$$\ce{SiCl4 + 4H2O -> Si(OH)4 + 4HCl}$$

**Answer:** the difference is the availability of d orbitals on silicon.`,
      v: table(['Compound', 'Central atom orbitals', 'Reaction with water'], [['CCl₄', '2s, 2p only', 'None'], ['SiCl₄', '3s, 3p and vacant 3d', 'Hydrolysed to Si(OH)₄ and HCl']], 'Table contrasting the hydrolysis of carbon tetrachloride and silicon tetrachloride'),
      n: 'Why does carbon tetrachloride ignore water while silicon tetrachloride fumes? To hydrolyse, water must donate a lone pair to the central atom. Carbon has no empty d orbitals and is crowded by four chlorine atoms, so it cannot accept. Silicon has empty three d orbitals and can accept the lone pair, expand its shell and react, giving silicon hydroxide and hydrogen chloride. The difference is the availability of d orbitals.',
    }),
    sl('concept', 'Allotropes of carbon (general)', {
      b: '**Diamond:** each C is sp³ and bonded to four others in a 3D network, hard, insulator. **Graphite:** sp² hexagonal layers held by weak forces, soft, conducts. **Fullerene C₆₀:** sp² cage of 20 hexagons and 12 pentagons, a molecular solid.',
      v: table(['Property', 'Diamond', 'Graphite', 'Fullerene (C₆₀)'], [['Hybridisation', 'sp³', 'sp²', 'sp²'], ['Structure', 'Tetrahedral 3D network', 'Flat hexagonal layers', 'Hollow cage molecule'], ['Hardness', 'Hardest natural substance', 'Soft, slippery', 'Soft solid'], ['Electrical conductivity', 'Insulator', 'Conducts along layers', 'Poor conductor'], ['Density / g cm⁻³', '3.51', '2.26', 'About 1.7']], 'Table comparing diamond, graphite and fullerene in hybridisation, structure, hardness, conductivity and density'),
      n: 'Carbon exists in several forms called allotropes. In diamond every atom is bonded to four others in a rigid network, so it is the hardest natural material and does not conduct. In graphite the atoms lie in flat hexagonal layers with a free electron per atom, so it is soft, slippery and conducts. Fullerene is a hollow cage of sixty carbon atoms with twenty hexagons and twelve pentagons.',
    }),
    sl('check', 'Quick check: allotropes', {
      b: 'Match structure with property.',
      n: 'Quick check. Think about layers and free electrons.',
      chk: 'chk-allo',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'Group 13 (ns² np¹): irregular radii and IE because of poor d and f shielding; Ga is smaller than Al.',
        'Inert pair effect: +1 more stable than +3 for Tl; +2 more stable than +4 for Pb.',
        'Boron: non-metal, covalent, covalency 4, electron-deficient Lewis acids.',
        'Carbon: no d orbitals, pπ–pπ bonds, maximum catenation (C–C 348 kJ mol⁻¹).',
        'Allotropes of carbon: diamond (sp³), graphite (sp²), fullerene (sp² cage).',
      ],
      v: table(['Property', 'First element', 'Heavier members'], [['Oxidation state', 'Fixed by covalent bonding (B +3, C +4)', 'Lower state more stable (Tl +1, Pb +2)'], ['Covalency', 'Maximum 4', 'Up to 6 with d orbitals'], ['Multiple bonds', 'C forms pπ–pπ bonds', 'Si and heavier do not']], 'Table summarising differences between the first element and heavier members of groups 13 and 14'),
      n: 'Let us sum up Part two. In group thirteen, poor shielding by d and f electrons makes the trends irregular, and the inert pair effect favours thallium one. Boron is a non metal and forms electron deficient covalent compounds. In group fourteen, carbon is unique: no d orbitals, multiple bonds, and extensive catenation, while lead prefers plus two. Carbon exists as diamond, graphite and fullerene.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'Explain the Ga < Al dip by poor shielding of 3d electrons, not by a “mistake in the data”.',
        'State the inert pair effect with an example: Tl⁺ over Tl³⁺, Pb²⁺ over Pb⁴⁺.',
        'Give three reasons for carbon’s anomaly: small size, no d orbitals, pπ–pπ bonding.',
        'Compare allotropes by hybridisation first (sp³, sp²), then by property.',
      ],
      v: table(['Slip', 'Fix'], [['Silicon forms stable Si=Si and Si=O molecules', 'It does not; SiO₂ is a network of single bonds'], ['Graphite conducts because it is a metal', 'Delocalised π electrons within layers'], ['PbO₂ is a reducing agent', 'It is a strong oxidising agent']], 'Table of three common slips about groups 13 and 14 and their fixes'),
      n: 'Tips for tests. Explain the gallium dip by the poor shielding of the d electrons. When you state the inert pair effect, give examples: thallium one and lead two. For the anomaly of carbon, give small size, no d orbitals and multiple bonding. For allotropes, begin with hybridisation, sp three for diamond and sp two for graphite and fullerene, and then link it to hardness and conductivity.',
    }),
  ],
});
