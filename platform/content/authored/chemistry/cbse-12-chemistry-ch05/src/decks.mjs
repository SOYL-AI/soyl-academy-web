// ch05 Coordination Compounds — two decks: Part 1 (t01–t03) Werner's theory, terms, nomenclature and isomerism;
// Part 2 (t04–t05) valence bond theory, crystal field theory, colour, metal carbonyls and applications.
import { sl, deck, table, flow, svgV, r } from './lib.mjs';
import { CHELATE, CISTRANS, SPLIT, SYNERGIC } from './svgs.mjs';

export const V = {
  chelate: svgV(CHELATE, 'A metal ion with two separate ammonia ligands compared with the same ion bound by both nitrogen atoms of one ethane-1,2-diamine molecule, closing a five-membered chelate ring'),
  cistrans: svgV(CISTRANS, 'Cis and trans isomers of square planar diamminedichloridoplatinum(II) and of the octahedral tetraamminedichloridocobalt(III) ion', 'Chlorine atoms are drawn green and nitrogen-bonded ligands blue; the dashed bond points away from the viewer.'),
  split: svgV(SPLIT, 'Splitting of the five d orbitals: in an octahedral field into a lower t2g set and an upper eg set separated by delta-o; in a tetrahedral field into a lower e set and an upper t2 set separated by a smaller delta-t', 'Schematic energy levels; delta-t is about four-ninths of delta-o.'),
  synergic: svgV(SYNERGIC, 'Synergic bonding in a metal carbonyl: sigma donation from carbon monoxide to the metal and pi back-donation from a filled metal d orbital into the empty antibonding orbital of carbon monoxide'),
};

export const deck1 = deck({
  part: 1,
  title: 'Coordination Compounds — Part 1: Werner’s theory, naming and isomerism',
  goals: [
    'Explain Werner’s primary and secondary valencies and use precipitation data to write the formula of a complex',
    'Define ligand, coordination number, denticity, chelate, ambidentate ligand and related terms',
    'Name mononuclear coordination compounds by IUPAC rules and write formulas from names',
    'Identify structural and stereoisomers (geometrical and optical) of coordination compounds',
  ],
  slides: [
    sl('title', 'Coordination Compounds', {
      b: 'Part 1 — compounds in which a metal ion is surrounded by a set of molecules or ions held by coordinate bonds.',
      v: table(['Compound', 'Where you meet it'], [['Haemoglobin (iron complex)', 'Carries oxygen in blood'], ['Chlorophyll (magnesium complex)', 'Photosynthesis in leaves'], ['Vitamin B12 (cobalt complex)', 'Prevents anaemia'], ['Cisplatin (platinum complex)', 'Cancer treatment'], ['EDTA complexes', 'Testing hardness of water']], 'Table of five familiar coordination compounds and where they are met: haemoglobin, chlorophyll, vitamin B12, cisplatin and EDTA complexes'),
      n: 'Namaste! The red of blood, the green of leaves and the blue of copper sulfate all come from coordination compounds. In these, a central metal atom or ion is surrounded by molecules or ions that donate pairs of electrons to it. In this part we learn how Alfred Werner first explained them, the words chemists use to describe them, how to name them, and the many ways their atoms can be arranged.',
    }),
    sl('concept', 'Double salts and complexes', {
      b: 'A **double salt** exists only in the solid; in water it gives all its ions (Mohr’s salt gives Fe²⁺, NH₄⁺ and SO₄²⁻). A **coordination compound** keeps its **complex ion** intact in water.',
      v: table(['Compound', 'Type', 'Ions in water'], [['FeSO₄·(NH₄)₂SO₄·6H₂O (Mohr’s salt)', 'Double salt', r`$\ce{Fe^2+}$, $\ce{NH4+}$, $\ce{SO4^2-}$`], ['KCl·MgCl₂·6H₂O (carnallite)', 'Double salt', r`$\ce{K+}$, $\ce{Mg^2+}$, $\ce{Cl-}$`], [r`$\ce{K4[Fe(CN)6]}$`, 'Complex', r`$\ce{K+}$ and $\ce{[Fe(CN)6]^4-}$ only (no free $\ce{Fe^2+}$ or $\ce{CN-}$)`], [r`$\ce{[Cu(NH3)4]SO4}$`, 'Complex', r`$\ce{[Cu(NH3)4]^2+}$ and $\ce{SO4^2-}$`]], 'Table contrasting double salts, which give all their simple ions in water, with complexes, which keep the complex ion intact'),
      n: 'Mohr’s salt and potassium ferrocyanide both contain iron, but they behave very differently in water. Mohr’s salt falls apart completely into iron two plus, ammonium and sulfate ions, so it is a double salt. Potassium ferrocyanide gives potassium ions and the complex ion, but no free iron or cyanide ions, which is why it is not poisonous like simple cyanides. Only the second is a coordination compound.',
    }),
    sl('concept', 'Werner’s theory', {
      b: 'Werner (1898) proposed that a metal shows two kinds of valency. **Primary valency**: ionisable, satisfied by negative ions; equals the oxidation state. **Secondary valency**: non-ionisable, satisfied by ligands; equals the **coordination number** and is fixed in direction, giving a definite shape.',
      v: table(['Compound', 'Moles of AgCl per mole with AgNO₃', 'Werner formula'], [['CoCl₃·6NH₃ (yellow)', '3', r`$\ce{[Co(NH3)6]Cl3}$`], ['CoCl₃·5NH₃ (purple)', '2', r`$\ce{[CoCl(NH3)5]Cl2}$`], ['CoCl₃·4NH₃ (green or violet)', '1', r`$\ce{[CoCl2(NH3)4]Cl}$`]], 'Table of three cobalt chloride ammonia compounds, the moles of silver chloride each precipitates per mole and their Werner formulas'),
      n: 'Werner studied cobalt chloride compounds with different numbers of ammonia molecules. Silver nitrate precipitates only the chloride ions that are free in solution. With six ammonias, all three chlorides precipitate; with five, two; with four, only one. Werner explained this with two valencies: chlorides outside the brackets are ionisable, while ligands inside the brackets are held in fixed positions. Here the coordination number is always six.',
    }),
    sl('example', 'Worked example: formula from a precipitation test', {
      b: r`**Problem.** A solution containing $0.005\ \text{mol}$ of $\ce{PtCl4.5NH3}$ gives $0.015\ \text{mol}$ of AgCl with excess silver nitrate. Platinum has coordination number 6. Write the Werner formula.

**Step 1.** Moles of free $\ce{Cl-}$ per mole $= \dfrac{0.015}{0.005} = 3$.

**Step 2.** So 1 Cl is inside the coordination sphere with 5 NH₃: $5 + 1 = 6$, the coordination number.

**Step 3.** Formula: $\ce{[PtCl(NH3)5]Cl3}$; it gives 4 ions in solution.`,
      v: flow('LR', [['a', 'Moles AgCl ÷ moles complex'], ['b', '= ionisable Cl⁻'], ['c', 'Remaining Cl⁻ inside the sphere'], ['d', 'Check: ligands = coordination number']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow for deducing a Werner formula: divide moles of silver chloride by moles of complex, the rest of the chloride is inside the sphere, then check the coordination number'),
      n: 'Divide the moles of silver chloride by the moles of the compound: three chloride ions per formula are free. The fourth chloride must be inside the coordination sphere, where silver ions cannot reach it. Five ammonias plus one chloride make six ligands, matching platinum’s coordination number. So the formula is pentaamminechloridoplatinum four chloride, which gives four ions in water.',
    }),
    sl('concept', 'The language of complexes', {
      b: r`In $\ce{K3[Fe(CN)6]}$: **central atom** Fe; **ligands** $\ce{CN-}$; **coordination number** 6 (number of donor atoms bonded); **coordination sphere** the bracketed part; **counter ions** $\ce{K+}$; **coordination polyhedron** octahedron; **oxidation number** of Fe = +3.`,
      v: table(['Term', 'Meaning', 'Example'], [['Ligand', 'Ion or molecule donating an electron pair to the metal', r`$\ce{NH3}$, $\ce{H2O}$, $\ce{Cl-}$, $\ce{CN-}$`], ['Coordination number', 'Number of ligand donor atoms bonded to the metal', r`6 in $\ce{[Co(NH3)6]^3+}$`], ['Coordination polyhedron', 'Shape formed by the donor atoms', 'Octahedral, square planar, tetrahedral'], ['Homoleptic', 'Only one kind of ligand', r`$\ce{[Co(NH3)6]^3+}$`], ['Heteroleptic', 'More than one kind of ligand', r`$\ce{[CoCl2(NH3)4]+}$`]], 'Table of key terms: ligand, coordination number, coordination polyhedron, homoleptic and heteroleptic complexes, with examples'),
      n: 'Let us learn the vocabulary using potassium ferricyanide. Iron is the central atom. The six cyanide ions are ligands, each donating a pair of electrons, so the coordination number is six. The part in square brackets is the coordination sphere; the potassium ions outside are counter ions. The six donor atoms sit at the corners of an octahedron. Complexes with one kind of ligand are homoleptic; with several kinds, heteroleptic.',
    }),
    sl('concept', 'Ligands: denticity, chelates and ambidentate ligands', {
      b: 'A ligand bonding through one donor atom is **unidentate**; through two, **didentate**; through several, **polydentate**. A di- or polydentate ligand that forms a ring with the metal is a **chelating** ligand; chelate complexes are especially stable. An **ambidentate** ligand can bind through either of two different atoms.',
      v: table(['Ligand', 'Denticity', 'Donor atoms'], [['Ammonia, water, chloride', 'Unidentate', 'N, O, Cl'], ['Ethane-1,2-diamine (en)', 'Didentate', '2 N'], ['Oxalate', 'Didentate', '2 O'], ['EDTA⁴⁻', 'Hexadentate', '2 N, 4 O'], [r`$\ce{NO2-}$ / $\ce{ONO-}$`, 'Ambidentate', 'N or O'], [r`$\ce{SCN-}$ / $\ce{NCS-}$`, 'Ambidentate', 'S or N']], 'Table of ligands with their denticity and donor atoms, including ethane-1,2-diamine, oxalate, EDTA and the ambidentate nitrite and thiocyanate'),
      n: 'Ligands differ in how many arms they have. Ammonia holds the metal with one nitrogen, so it is unidentate. Ethane-1,2-diamine has two nitrogens and grips the metal like a crab’s claw: the word chelate comes from the Greek for claw. EDTA wraps around a metal with six donor atoms. Nitrite and thiocyanate are ambidentate: they can attach through either of two different atoms.',
    }),
    sl('diagram', 'A chelate ring', {
      b: 'When ethane-1,2-diamine binds through both nitrogens it closes a **five-membered ring** with the metal. Rings make complexes more stable than those with comparable unidentate ligands (the **chelate effect**).',
      v: V.chelate,
      n: 'Compare the two pictures. On the left, two separate ammonia molecules each hold the metal by one bond. On the right, one ethane-1,2-diamine molecule holds it by two bonds, closing a ring of five atoms: metal, nitrogen, carbon, carbon, nitrogen. To pull such a ligand away, both bonds must break at once, so chelate complexes are more stable. This is why EDTA is used to trap metal ions.',
    }),
    sl('check', 'Quick check: denticity and coordination number', {
      b: 'Use the denticity of each ligand to find the coordination number of the metal.',
      n: 'Quick check. Count donor atoms, not ligands: a didentate ligand supplies two donor atoms.',
      chk: 'cn-en-mcq',
    }),
    sl('example', 'Worked example: oxidation number and coordination number', {
      b: r`**Problem.** Find the oxidation number and coordination number of the metal in $\ce{K3[Fe(C2O4)3]}$ and in $\ce{[Co(en)2Cl2]Cl}$.

**Step 1.** $\ce{K3[Fe(C2O4)3]}$: $3(+1) + x + 3(-2) = 0$, so $x = +3$; oxalate is didentate, so CN $= 3 \times 2 = 6$.

**Step 2.** $\ce{[Co(en)2Cl2]Cl}$: en is neutral, so $x + 2(-1) + (-1) = 0$, giving $x = +3$; CN $= 2 \times 2 + 2 = 6$.`,
      v: table(['Complex', 'Oxidation number', 'Coordination number'], [[r`$\ce{K3[Fe(C2O4)3]}$`, '+3', '6'], [r`$\ce{[Co(en)2Cl2]Cl}$`, '+3', '6']], 'Table of results: iron plus three with coordination number six, and cobalt plus three with coordination number six'),
      n: 'For the oxidation number, add up the charges so that the whole compound is neutral. Three potassium ions give plus three, three oxalate ions give minus six, so iron must be plus three. For the coordination number, count donor atoms: each oxalate binds through two oxygens, so three oxalates give six. In the cobalt complex, two ethane-1,2-diamines give four and two chlorides give two more: six again.',
    }),
    sl('concept', 'Naming coordination compounds: the rules', {
      b: 'IUPAC rules (2005): (1) cation first, then anion; (2) in the complex, **ligands in alphabetical order**, then the metal; (3) number prefixes di-, tri-, tetra- (or bis-, tris- for names already containing a number); (4) anionic ligands end in **-o**; (5) metal oxidation state in Roman numerals; (6) in an **anionic complex** the metal name ends in **-ate**.',
      v: table(['Metal in an anionic complex', 'Name used'], [['Iron', 'ferrate'], ['Copper', 'cuprate'], ['Silver', 'argentate'], ['Gold', 'aurate'], ['Lead', 'plumbate'], ['Tin', 'stannate'], ['Cobalt, nickel, platinum', 'cobaltate, nickelate, platinate']], 'Table of metal names used in anionic complexes, with Latin-based names for iron, copper, silver, gold, lead and tin'),
      n: 'Naming follows a fixed order. Name the cation first and the anion second, just as in sodium chloride. Inside the complex, list the ligands alphabetically, ignoring number prefixes, then name the metal with its oxidation state in Roman numerals. If the whole complex is a negative ion, the metal name ends in ate, and some metals use their Latin roots, such as ferrate for iron and argentate for silver.',
    }),
    sl('concept', 'Names of common ligands', {
      b: 'Anionic ligands end in **-ido** or **-o**; neutral ligands keep their names, except water (**aqua**), ammonia (**ammine**), carbon monoxide (**carbonyl**) and nitrogen monoxide (**nitrosyl**).',
      v: table(['Ligand', 'Name', 'Ligand', 'Name'], [[r`$\ce{Cl-}$`, 'chlorido', r`$\ce{H2O}$`, 'aqua'], [r`$\ce{CN-}$`, 'cyanido', r`$\ce{NH3}$`, 'ammine'], [r`$\ce{OH-}$`, 'hydroxido', 'CO', 'carbonyl'], [r`$\ce{NO2-}$ (N-bonded)`, 'nitrito-N', 'en', 'ethane-1,2-diamine'], [r`$\ce{ONO-}$ (O-bonded)`, 'nitrito-O', r`$\ce{C2O4^2-}$`, 'oxalato'], [r`$\ce{SCN-}$ (S-bonded)`, 'thiocyanato-S', r`$\ce{S2O3^2-}$`, 'thiosulfato']], 'Table of the IUPAC names of common ligands, anionic and neutral'),
      n: 'Learn the common ligand names. Chloride becomes chlorido and cyanide cyanido. Water is aqua and ammonia is ammine, spelt with two m’s. Carbon monoxide is carbonyl. For ambidentate ligands, the donor atom is added at the end: nitrito N when nitrogen is bonded, nitrito O when oxygen is bonded. Ethane-1,2-diamine, abbreviated en, keeps its full name.',
    }),
    sl('example', 'Worked example: naming complexes', {
      b: r`**Name these.**

(a) $\ce{[CoCl2(NH3)4]Cl}$ → tetraamminedichloridocobalt(III) chloride

(b) $\ce{K3[Fe(CN)6]}$ → potassium hexacyanidoferrate(III)

(c) $\ce{[Ni(CO)4]}$ → tetracarbonylnickel(0)

(d) $\ce{[Pt(NH3)2Cl(NO2)]}$ → diamminechloridonitrito-N-platinum(II)

(e) $\ce{[Co(en)3]Cl3}$ → tris(ethane-1,2-diamine)cobalt(III) chloride`,
      v: flow('LR', [['a', 'Cation or anion?'], ['b', 'Ligands A→Z with prefixes'], ['c', 'Metal (+ ate if anionic)'], ['d', 'Oxidation state in Roman numerals'], ['e', 'Counter ion']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']], 'Flow for naming a complex: decide whether it is a cation or anion, list ligands alphabetically with prefixes, name the metal (with ate if anionic), give its oxidation state, then the counter ion'),
      n: 'Work through each name in order. In the first, ammine comes before chlorido alphabetically, and the prefixes tetra and di are ignored when ordering. In the second, the complex is an anion, so iron becomes ferrate. In the carbonyl, nickel is in the zero oxidation state. In the last, ethane-1,2-diamine already contains numbers, so three of them are written tris, with brackets.',
    }),
    sl('example', 'Worked example: formula from a name', {
      b: r`**Write formulas.**

(a) Pentaamminechloridocobalt(III) chloride: complex $\ce{[CoCl(NH3)5]}$; charge $= +3 - 1 = +2$, so $\ce{[CoCl(NH3)5]Cl2}$.

(b) Potassium tetrachloridonickelate(II): charge $= +2 - 4 = -2$, so $\ce{K2[NiCl4]}$.

(c) Diamminesilver(I) dicyanidoargentate(I): $\ce{[Ag(NH3)2][Ag(CN)2]}$.`,
      v: table(['Name', 'Charge on complex', 'Formula'], [['Pentaamminechloridocobalt(III) chloride', '+2', r`$\ce{[CoCl(NH3)5]Cl2}$`], ['Potassium tetrachloridonickelate(II)', '−2', r`$\ce{K2[NiCl4]}$`], ['Diamminesilver(I) dicyanidoargentate(I)', '+1 and −1', r`$\ce{[Ag(NH3)2][Ag(CN)2]}$`]], 'Table of three names, the charges on their complex ions and their formulas'),
      n: 'To go from a name to a formula, first build the complex ion and work out its charge: the metal’s oxidation state plus the charges of the ligands. In the cobalt example, plus three and one chloride give plus two, so two chloride counter ions are needed. In the nickel example, plus two and four chlorides give minus two, so two potassium ions balance it.',
    }),
    sl('check', 'Quick check: naming', {
      b: 'Choose the correct IUPAC name of a complex.',
      n: 'Quick check. Check three things: alphabetical order of ligands, the ate ending for anionic complexes, and the oxidation state of the metal.',
      chk: 'name-mcq',
    }),
    sl('concept', 'Isomerism in coordination compounds', {
      b: '**Isomers** have the same formula but different arrangements. **Structural** isomers differ in which atoms are bonded; **stereoisomers** have the same bonds but different spatial arrangements.',
      v: flow('TB', [['i', 'Isomerism'], ['s', 'Structural'], ['t', 'Stereo'], ['a', 'Ionisation'], ['b', 'Linkage'], ['c', 'Coordination'], ['d', 'Solvate (hydrate)'], ['g', 'Geometrical (cis/trans, fac/mer)'], ['o', 'Optical']], [['i', 's'], ['i', 't'], ['s', 'a'], ['s', 'b'], ['s', 'c'], ['s', 'd'], ['t', 'g'], ['t', 'o']], 'Tree of isomerism: structural isomerism divides into ionisation, linkage, coordination and solvate; stereoisomerism into geometrical and optical'),
      n: 'Coordination compounds show a remarkable variety of isomers. In structural isomers, the atoms are connected differently: a ligand may swap places with a counter ion, or bind through a different atom. In stereoisomers, the same atoms are bonded to the metal but arranged differently in space: two chlorides may be next to each other or opposite, or two arrangements may be mirror images.',
    }),
    sl('concept', 'Structural isomers', {
      b: 'Four kinds are common.',
      v: table(['Type', 'Cause', 'Example pair'], [['Ionisation', 'Ligand and counter ion exchange places', r`$\ce{[Co(NH3)5(SO4)]Br}$ and $\ce{[CoBr(NH3)5]SO4}$`], ['Linkage', 'Ambidentate ligand binds through a different atom', r`$\ce{[Co(NH3)5(NO2)]Cl2}$ (N) and $\ce{[Co(NH3)5(ONO)]Cl2}$ (O)`], ['Coordination', 'Ligands exchange between cationic and anionic complexes', r`$\ce{[Co(NH3)6][Cr(CN)6]}$ and $\ce{[Cr(NH3)6][Co(CN)6]}$`], ['Solvate (hydrate)', 'Water inside or outside the sphere', r`$\ce{[Cr(H2O)6]Cl3}$ (violet) and $\ce{[CrCl(H2O)5]Cl2.H2O}$ (grey-green)`]], 'Table of ionisation, linkage, coordination and solvate isomerism with their causes and example pairs'),
      n: 'Ionisation isomers give different ions in water: one gives bromide, the other sulfate, which can be told apart with silver nitrate and barium chloride. Linkage isomers arise with ambidentate ligands such as nitrite. Coordination isomers swap ligands between a complex cation and a complex anion. Hydrate isomers differ in whether water is a ligand or water of crystallisation, and often differ in colour.',
    }),
    sl('diagram', 'Geometrical isomers', {
      b: '**Geometrical (cis–trans) isomers** occur in square planar complexes $\\ce{[MX2L2]}$ and octahedral complexes $\\ce{[MX2L4]}$: in the **cis** form identical ligands are adjacent; in the **trans** form they are opposite. Octahedral $\\ce{[MA3B3]}$ shows **fac** and **mer** isomers. Tetrahedral complexes show no geometrical isomerism.',
      v: V.cistrans,
      n: 'In square planar diamminedichloridoplatinum, the two chlorides can sit side by side, the cis isomer, or across from each other, the trans isomer. The cis isomer is cisplatin, an anticancer drug; the trans isomer is not active. Octahedral complexes with two chlorides and four ammonias also have cis and trans forms. Tetrahedral complexes cannot, because every corner of a tetrahedron is next to every other.',
    }),
    sl('concept', 'Optical isomers', {
      b: '**Optical isomers** (enantiomers) are non-superimposable mirror images; they rotate plane-polarised light in opposite directions (d and l). They are common in octahedral complexes with didentate ligands.',
      v: table(['Complex', 'Geometrical isomers', 'Optically active?'], [[r`$\ce{[Co(en)3]^3+}$`, 'None', 'Yes: d and l forms'], [r`cis-$\ce{[CoCl2(en)2]+}$`, 'cis', 'Yes: d and l forms'], [r`trans-$\ce{[CoCl2(en)2]+}$`, 'trans', 'No: has a mirror plane'], [r`$\ce{[PtCl2(NH3)2]}$`, 'cis, trans', 'No (square planar)']], 'Table of complexes showing which have geometrical isomers and which are optically active, including the tris and bis ethane-1,2-diamine cobalt complexes'),
      n: 'Some complexes are like your left and right hands: mirror images that cannot be placed on top of each other. With three ethane-1,2-diamine rings around cobalt, the rings can twist like a left-handed or a right-handed propeller. The cis form of the bis complex with two chlorides is also chiral, but the trans form has a mirror plane and is not. In total, that complex has three stereoisomers.',
    }),
    sl('check', 'Quick check: isomers', {
      b: 'Decide which complex can show geometrical isomerism.',
      n: 'Quick check. Geometrical isomers need at least two identical ligands that can be adjacent or opposite, in a square planar or octahedral complex.',
      chk: 'geo-isomer-mcq',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Werner: primary valency = oxidation state (ionisable); secondary valency = coordination number (directional).',
        'AgNO₃ precipitates only Cl⁻ outside the coordination sphere.',
        'Coordination number = number of donor atoms; denticity, chelates (extra stable) and ambidentate ligands.',
        'IUPAC: cation first; ligands alphabetical; -o for anionic ligands; Roman numeral oxidation state; -ate for anionic complexes.',
        'Structural isomers: ionisation, linkage, coordination, solvate. Stereoisomers: geometrical (cis/trans, fac/mer) and optical.',
      ],
      v: table(['Term', 'Example'], [['Primary valency of Co in [Co(NH₃)₆]Cl₃', '3'], ['Coordination number', '6'], ['Chelating ligand', 'en, oxalate, EDTA'], ['Linkage isomers', 'Nitrito-N / nitrito-O']], 'Summary table of key terms with examples'),
      n: 'Let us sum up Part 1. Werner’s two valencies explain why only some chlorides are precipitated by silver nitrate. The coordination number counts donor atoms, and chelating ligands form especially stable rings. IUPAC names follow a fixed order with alphabetical ligands and the ate ending for complex anions. And coordination compounds show both structural isomers and stereoisomers, including mirror-image pairs.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'Count donor atoms, not ligands, for the coordination number (en and oxalate count 2 each).',
        'Ignore multiplying prefixes when arranging ligands alphabetically ("tetraammine" files under a).',
        'Use bis/tris with brackets for ligands like ethane-1,2-diamine.',
        'Spell "ammine" (NH₃) with two m’s, and use "-ate" only for anionic complexes.',
        'cis-[MCl₂(en)₂] is optically active; trans is not.',
      ],
      v: table(['Slip', 'Fix'], [['CN of [Co(en)₃]³⁺ = 3', 'CN = 6 (en is didentate)'], ['"cobaltate" in a cationic complex', 'Use "cobalt"'], ['Ligands ordered by charge', 'Order alphabetically']], 'Table of three common slips in Part 1 and their fixes'),
      n: 'Some exam tips. The coordination number counts donor atoms, so each ethane-1,2-diamine counts as two. Arrange ligands alphabetically and ignore prefixes like tetra while doing so. Use bis and tris, with brackets, for ligands whose names contain numbers. Spell ammine with two m’s, and use the ate ending only when the complex is an anion.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Coordination Compounds — Part 2: Bonding, colour, carbonyls and uses',
  goals: [
    'Use valence bond theory to predict hybridisation, shape and magnetic behaviour of complexes',
    'Explain crystal-field splitting in octahedral and tetrahedral fields, high-spin and low-spin complexes, and the spectrochemical series',
    'Explain the colour of complexes and the limitations of the bonding theories',
    'Describe synergic bonding in metal carbonyls and state uses of coordination compounds',
  ],
  slides: [
    sl('title', 'Bonding in coordination compounds', {
      b: 'Part 2 — why some complexes are magnetic and others not, why they are coloured, and how carbon monoxide bonds to metals.',
      v: flow('LR', [['a', 'Valence bond theory: hybridisation and shape'], ['b', 'Crystal field theory: d-orbital splitting'], ['c', 'Magnetism and colour'], ['d', 'Metal carbonyls'], ['e', 'Applications']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']], 'Flow of the topics in Part 2: valence bond theory, crystal field theory, magnetism and colour, metal carbonyls and applications'),
      n: 'Why is the hexaamminecobalt three plus ion diamagnetic while the hexafluorocobaltate ion is strongly magnetic, although both contain cobalt three plus? Why is one nickel complex green and another violet? In this part we use two theories to answer such questions: valence bond theory, which uses hybrid orbitals, and crystal field theory, which looks at how ligands split the energies of the d orbitals.',
    }),
    sl('concept', 'Valence bond theory: hybridisation and shape', {
      b: 'The metal provides **empty hybrid orbitals** that accept electron pairs from the ligands. The hybridisation fixes the shape. Strong-field ligands such as $\\ce{CN-}$, CO and $\\ce{NH3}$ (for Co³⁺) can force d electrons to pair, freeing inner d orbitals.',
      v: table(['Coordination number', 'Hybridisation', 'Shape', 'Example'], [['4', r`$sp^3$`, 'Tetrahedral', r`$\ce{[NiCl4]^2-}$, $\ce{[Ni(CO)4]}$`], ['4', r`$dsp^2$`, 'Square planar', r`$\ce{[Ni(CN)4]^2-}$`], ['6', r`$d^2sp^3$ (inner orbital)`, 'Octahedral', r`$\ce{[Co(NH3)6]^3+}$, $\ce{[Fe(CN)6]^3-}$`], ['6', r`$sp^3d^2$ (outer orbital)`, 'Octahedral', r`$\ce{[CoF6]^3-}$, $\ce{[FeF6]^3-}$`]], 'Table of hybridisations for coordination numbers four and six with the shapes and example complexes'),
      n: 'Valence bond theory pictures each ligand donating an electron pair into an empty hybrid orbital of the metal. Four sp three orbitals point to the corners of a tetrahedron; four d s p two orbitals lie in a square. For six ligands, the metal uses either two inner three d orbitals, giving an inner-orbital complex, or two outer four d orbitals, giving an outer-orbital complex. Both are octahedral.',
    }),
    sl('example', 'Worked example: two cobalt(III) complexes', {
      b: r`**Problem.** Explain why $\ce{[Co(NH3)6]^3+}$ is diamagnetic but $\ce{[CoF6]^3-}$ is paramagnetic.

**Step 1.** $\ce{Co^3+}$ is $3d^6$. Ammonia acts as a strong-field ligand here: the six d electrons pair into three orbitals, leaving two 3d orbitals empty → $d^2sp^3$, inner-orbital, **no unpaired electrons**: diamagnetic.

**Step 2.** Fluoride is weak-field: no pairing; four unpaired electrons remain; 4s, 4p and two 4d orbitals are used → $sp^3d^2$, outer-orbital, **4 unpaired electrons**: $\mu = \sqrt{24} \approx 4.90$ BM.`,
      v: table(['Complex', 'Hybridisation', 'Unpaired electrons', 'Magnetic behaviour'], [[r`$\ce{[Co(NH3)6]^3+}$`, r`$d^2sp^3$`, '0', 'Diamagnetic'], [r`$\ce{[CoF6]^3-}$`, r`$sp^3d^2$`, '4', 'Paramagnetic (4.90 BM)']], 'Table comparing the two cobalt three plus complexes: inner-orbital diamagnetic with ammonia, outer-orbital paramagnetic with fluoride'),
      n: 'Both complexes contain cobalt three plus with six d electrons. With ammonia, the electrons pair up in three of the d orbitals, leaving two inner d orbitals free for bonding: the complex is inner-orbital and has no unpaired electrons. With fluoride, no pairing happens, so outer d orbitals are used and four electrons stay unpaired. A magnet tells the two apart instantly.',
    }),
    sl('example', 'Worked example: two nickel(II) complexes', {
      b: r`**Problem.** $\ce{[Ni(CN)4]^2-}$ is diamagnetic, but $\ce{[NiCl4]^2-}$ is paramagnetic. Explain, and give their shapes.

**Step 1.** $\ce{Ni^2+}$ is $3d^8$ with two unpaired electrons.

**Step 2.** $\ce{CN-}$ (strong) pairs them, freeing one 3d orbital: $dsp^2$, **square planar**, diamagnetic.

**Step 3.** $\ce{Cl-}$ (weak) does not: 4s and 4p are used, $sp^3$, **tetrahedral**, 2 unpaired electrons, $\mu = \sqrt{8} \approx 2.83$ BM.`,
      v: table(['Complex', 'Hybridisation', 'Shape', 'μ / BM'], [[r`$\ce{[Ni(CN)4]^2-}$`, r`$dsp^2$`, 'Square planar', '0'], [r`$\ce{[NiCl4]^2-}$`, r`$sp^3$`, 'Tetrahedral', '2.83']], 'Table comparing the two nickel complexes: square planar and diamagnetic with cyanide, tetrahedral and paramagnetic with chloride'),
      n: 'Nickel two plus has eight d electrons, two of them unpaired. Cyanide is a strong ligand and forces these two to pair, freeing one inner d orbital; d s p two hybridisation gives a square planar, diamagnetic ion. Chloride is weak, so the two electrons stay unpaired and the metal uses s and p orbitals; sp three hybridisation gives a tetrahedral ion with a moment of about two point eight three.',
    }),
    sl('check', 'Quick check: hybridisation', {
      b: 'Predict the hybridisation and magnetic behaviour of a complex from its ligands.',
      n: 'Quick check. Write the d count of the metal ion, decide whether the ligand pairs electrons, then count the empty orbitals available.',
      chk: 'vbt-mcq',
    }),
    sl('concept', 'Limitations of valence bond theory', {
      b: 'VBT explains shapes and magnetism simply, but it cannot explain **colour**, it makes no quantitative prediction of magnetic data, it cannot predict whether a 4-coordinate complex will be tetrahedral or square planar, and it does not distinguish weak and strong ligands.',
      v: table(['VBT explains', 'VBT cannot explain'], [['Shape from hybridisation', 'Colour of complexes'], ['Diamagnetic vs paramagnetic', 'Temperature dependence of magnetism'], ['Inner vs outer orbital complexes', 'Why some ligands are strong and others weak']], 'Table of what valence bond theory explains and what it cannot'),
      n: 'Valence bond theory is a good start, but it leaves important questions open. It says nothing about why complexes are coloured. It cannot tell in advance whether a four-coordinate complex will be tetrahedral or square planar, and it cannot explain why cyanide pairs electrons while fluoride does not. Crystal field theory answers these questions.',
    }),
    sl('diagram', 'Crystal field theory: splitting of d orbitals', {
      b: r`Ligands are treated as **point charges** that repel the metal’s d electrons. In an **octahedral** field, the $d_{x^2-y^2}$ and $d_{z^2}$ orbitals point at the ligands and rise in energy ($e_g$); the other three lie between them and fall ($t_{2g}$). The gap is the **crystal-field splitting** $\Delta_o$. In a **tetrahedral** field the order is reversed and $\Delta_t \approx \tfrac{4}{9}\Delta_o$.`,
      v: V.split,
      n: 'Crystal field theory treats ligands as negative charges. In an octahedral complex, the six ligands sit on the x, y and z axes. Two d orbitals point straight at them and are pushed up in energy; the other three point between them and drop. The energy gap is called delta o. In a tetrahedral complex, no orbital points directly at a ligand, so the splitting is reversed and much smaller.',
    }),
    sl('concept', 'The spectrochemical series', {
      b: 'Ligands can be ranked by the splitting they cause, from **weak-field** to **strong-field**:',
      m: [r`\ce{I-} < \ce{Br-} < \ce{SCN-} < \ce{Cl-} < \ce{S^2-} < \ce{F-} < \ce{OH-} < \ce{C2O4^2-} < \ce{H2O} < \ce{NCS-} < \text{edta}^{4-} < \ce{NH3} < \text{en} < \ce{CN-} < \ce{CO}`],
      v: table(['If…', 'Electrons fill', 'Complex is'], [[r`$\Delta_o < P$ (weak-field ligand)`, r`$e_g$ before pairing in $t_{2g}$`, 'High spin (more unpaired)'], [r`$\Delta_o > P$ (strong-field ligand)`, r`$t_{2g}$ pairs before $e_g$`, 'Low spin (fewer unpaired)'], [r`$d^4$ example, weak field`, r`$t_{2g}^3e_g^1$`, '4 unpaired'], [r`$d^4$ example, strong field`, r`$t_{2g}^4e_g^0$`, '2 unpaired']], 'Table showing that when the splitting is less than the pairing energy the complex is high spin, and when greater it is low spin, with the d4 example'),
      n: 'Experiments let us rank ligands by how strongly they split the d orbitals: iodide at the weak end, then bromide and chloride, water in the middle, ammonia and ethane-1,2-diamine higher, and cyanide and carbon monoxide at the strong end. A fourth d electron must choose: pair up in the lower set, costing the pairing energy P, or go up into the upper set, costing delta o. Whichever is cheaper wins.',
    }),
    sl('example', 'Worked example: high spin and low spin iron(II)', {
      b: r`**Problem.** Write the $t_{2g}/e_g$ configurations and count the unpaired electrons for $\ce{[Fe(H2O)6]^2+}$ and $\ce{[Fe(CN)6]^4-}$.

**Step 1.** $\ce{Fe^2+}$ is $d^6$.

**Step 2.** Water is weak-field ($\Delta_o < P$): high spin $t_{2g}^4e_g^2$, **4 unpaired**, paramagnetic.

**Step 3.** Cyanide is strong-field ($\Delta_o > P$): low spin $t_{2g}^6e_g^0$, **0 unpaired**, diamagnetic.`,
      v: table(['Complex', 'Configuration', 'Unpaired electrons'], [[r`$\ce{[Fe(H2O)6]^2+}$`, r`$t_{2g}^4e_g^2$`, '4'], [r`$\ce{[Fe(CN)6]^4-}$`, r`$t_{2g}^6e_g^0$`, '0']], 'Table of the high-spin aqua and low-spin cyanido iron two plus complexes with their configurations and unpaired electrons'),
      n: 'Iron two plus has six d electrons. With water, a weak ligand, the splitting is small, so electrons spread out: four in the lower set and two in the upper, leaving four unpaired. With cyanide, a strong ligand, the splitting is large, so all six pair up in the lower set and none are unpaired. Same metal ion, completely different magnetism, decided by the ligand.',
    }),
    sl('concept', 'Tetrahedral complexes', {
      b: r`In a tetrahedral field the **e** set is lower and the **t₂** set higher, and $\Delta_t \approx \tfrac{4}{9}\Delta_o$. Because $\Delta_t$ is small, it is almost always less than the pairing energy, so **tetrahedral complexes are high spin**.`,
      v: table(['Feature', 'Octahedral', 'Tetrahedral'], [['Lower set', r`$t_{2g}$ (3 orbitals)`, 'e (2 orbitals)'], ['Upper set', r`$e_g$ (2 orbitals)`, r`$t_2$ (3 orbitals)`], ['Size of splitting', r`$\Delta_o$`, r`$\Delta_t \approx \tfrac{4}{9}\Delta_o$`], ['Spin state', 'High or low spin', 'Almost always high spin']], 'Table comparing octahedral and tetrahedral splitting: order of sets, size of splitting and spin state'),
      n: 'With only four ligands, none pointing straight at any d orbital, the tetrahedral splitting is upside down compared with the octahedral one and only about four ninths as large. Such a small gap is almost never larger than the pairing energy, so electrons prefer to spread out. That is why tetrahedral complexes are practically always high spin.',
    }),
    sl('concept', 'Colour of complexes', {
      b: 'An electron jumps from the lower set to the upper set by absorbing light whose energy equals the splitting; we see the **complementary colour**. Changing the ligand changes the splitting, and so the colour. Without ligands there is no splitting: anhydrous copper sulfate is white, hydrated copper sulfate is blue.',
      v: table(['Complex', 'Light absorbed', 'Colour seen'], [[r`$\ce{[Ti(H2O)6]^3+}$`, 'Blue-green (about 498 nm)', 'Violet'], [r`$\ce{[Ni(H2O)6]^2+}$`, 'Red', 'Green'], [r`$\ce{[Ni(en)3]^2+}$`, 'Yellow-green (higher energy)', 'Violet'], [r`$\ce{[Cu(H2O)4]^2+}$ in hydrated $\ce{CuSO4}$`, 'Orange-red', 'Blue'], [r`$\ce{CuSO4}$ (anhydrous)`, 'No d–d absorption in the visible', 'White']], 'Table of complexes with the light they absorb and the colour seen, including the titanium aqua ion, nickel aqua and ethane-1,2-diamine complexes and copper sulfate'),
      n: 'The colours of complexes come straight from the d orbital splitting. The violet colour of the titanium aqua ion appears because it absorbs blue-green light to promote its single d electron. Replace water around nickel by the stronger ligand ethane-1,2-diamine, and the splitting grows, so higher-energy light is absorbed and the colour changes from green to violet. Remove the water from copper sulfate and the blue disappears.',
    }),
    sl('check', 'Quick check: spectrochemical series', {
      b: 'Use the spectrochemical series to predict which complex is low spin.',
      n: 'Quick check. Find where each ligand sits in the series, then decide whether its splitting is likely to beat the pairing energy.',
      chk: 'low-spin-mcq',
    }),
    sl('concept', 'Limitations of crystal field theory', {
      b: 'CFT treats ligands as **point charges** and the metal–ligand bond as purely ionic. So it cannot explain why neutral ligands such as **CO** and $\\ce{NH3}$ cause larger splitting than anions such as $\\ce{F-}$ and $\\ce{Cl-}$; the **covalent** character of bonding must be considered.',
      v: table(['Assumption of CFT', 'Problem'], [['Ligands are point charges', 'Anions should then split most, but halides are weak-field'], ['Bonding is purely ionic', 'Ignores covalent overlap, especially π bonding with CO and CN⁻']], 'Table of two assumptions of crystal field theory and the problems they cause'),
      n: 'Crystal field theory is powerful but simplified. If ligands were only point charges, negatively charged ions like fluoride and chloride should split the d orbitals most strongly. In fact neutral carbon monoxide is the strongest ligand of all. To explain this, we must accept that metal ligand bonds have covalent character, which leads us to the bonding in metal carbonyls.',
    }),
    sl('concept', 'Metal carbonyls', {
      b: 'Metal carbonyls contain only carbon monoxide ligands. Their shapes follow the number of CO groups.',
      v: table(['Carbonyl', 'Metal oxidation state', 'Shape'], [[r`$\ce{[Ni(CO)4]}$`, '0', 'Tetrahedral'], [r`$\ce{[Fe(CO)5]}$`, '0', 'Trigonal bipyramidal'], [r`$\ce{[Cr(CO)6]}$`, '0', 'Octahedral'], [r`$\ce{[Mn2(CO)10]}$`, '0', 'Two square pyramids joined by an Mn–Mn bond'], [r`$\ce{[Co2(CO)8]}$`, '0', 'Co–Co bond bridged by two CO groups']], 'Table of metal carbonyls with the metal oxidation state and shape: nickel tetracarbonyl tetrahedral, iron pentacarbonyl trigonal bipyramidal, chromium hexacarbonyl octahedral'),
      n: 'Carbon monoxide forms neutral compounds with metals in the zero oxidation state. Tetracarbonylnickel is tetrahedral, pentacarbonyliron is a trigonal bipyramid and hexacarbonylchromium is octahedral. Some carbonyls contain two metal atoms joined by a metal–metal bond. Tetracarbonylnickel is volatile, and this is used to purify nickel in the Mond process.',
    }),
    sl('diagram', 'Synergic bonding in carbonyls', {
      b: 'The M–CO bond has two parts: a **σ bond** from the lone pair on carbon into an empty metal orbital, and a **π back-bond** from a filled metal d orbital into the empty antibonding π* orbital of CO. Each strengthens the other (**synergic** bonding): the M–C bond is strengthened and the C–O bond weakened.',
      v: V.synergic,
      n: 'Carbon monoxide bonds to metals in two directions at once. Its carbon lone pair forms a sigma bond into an empty metal orbital. Then a filled d orbital of the metal pushes electron density back into an empty antibonding orbital of carbon monoxide. The more the ligand gives, the more the metal can give back, and the other way round: a synergic bond. Back-donation weakens the carbon–oxygen bond slightly.',
    }),
    sl('concept', 'Uses of coordination compounds', {
      b: 'Complexes matter in analysis, metallurgy, industry, biology and medicine.',
      v: table(['Use', 'Complex involved'], [['Hardness of water (titration)', r`EDTA forms stable complexes with $\ce{Ca^2+}$ and $\ce{Mg^2+}$`], ['Extraction of silver and gold', r`Cyanide complexes $\ce{[Ag(CN)2]-}$, $\ce{[Au(CN)2]-}$`], ['Purification of nickel (Mond process)', r`$\ce{[Ni(CO)4]}$ forms and then decomposes`], ['Catalysis', r`Wilkinson’s catalyst $\ce{[RhCl(PPh3)3]}$ for hydrogenation`], ['Photography', r`Unexposed AgBr dissolves as $\ce{[Ag(S2O3)2]^3-}$`], ['Medicine', 'Cisplatin against cancer; EDTA to remove lead'], ['Biology', 'Chlorophyll (Mg), haemoglobin (Fe), vitamin B12 (Co)']], 'Table of uses of coordination compounds in analysis, metallurgy, catalysis, photography, medicine and biology'),
      n: 'Coordination compounds are everywhere. EDTA titrations measure the hardness of tap water. Gold and silver are leached from ores as cyanide complexes. Nickel is purified through its volatile carbonyl. Wilkinson’s rhodium catalyst hydrogenates alkenes. In photography, hypo dissolves unexposed silver bromide as a thiosulfato complex. Cisplatin treats cancer, and life itself depends on chlorophyll, haemoglobin and vitamin B twelve.',
    }),
    sl('check', 'Quick check: carbonyls and uses', {
      b: 'Identify the effect of back-donation on the C–O bond in a metal carbonyl.',
      n: 'Quick check. Think about which orbital of carbon monoxide receives electrons from the metal and what that does to the bond between carbon and oxygen.',
      chk: 'backbond-mcq',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'VBT: sp³ tetrahedral, dsp² square planar, d²sp³ (inner, low spin) and sp³d² (outer, high spin) octahedral.',
        'CFT: octahedral t₂g below e_g (Δo); tetrahedral e below t₂, Δt ≈ (4/9)Δo; tetrahedral complexes high spin.',
        'Spectrochemical series: I⁻ < … < H₂O < … < NH₃ < en < CN⁻ < CO; Δo > P gives low spin.',
        'Colour: d–d transitions; the complementary colour is seen; stronger ligands absorb higher-energy light.',
        'Carbonyls: σ donation + π back-donation (synergic); M–C strengthened, C–O weakened.',
        'Uses: EDTA, metallurgy of Ag, Au, Ni; catalysts; cisplatin; biological complexes.',
      ],
      v: table(['Complex', 'Hybridisation / configuration', 'Magnetism'], [[r`$\ce{[Co(NH3)6]^3+}$`, r`$d^2sp^3$, $t_{2g}^6$`, 'Diamagnetic'], [r`$\ce{[CoF6]^3-}$`, r`$sp^3d^2$, $t_{2g}^4e_g^2$`, '4 unpaired'], [r`$\ce{[Ni(CN)4]^2-}$`, r`$dsp^2$`, 'Diamagnetic'], [r`$\ce{[NiCl4]^2-}$`, r`$sp^3$`, '2 unpaired']], 'Summary table of four key complexes with their hybridisation or configuration and magnetism'),
      n: 'Let us sum up Part 2. Valence bond theory links hybridisation to shape and magnetism. Crystal field theory explains the splitting of d orbitals, high-spin and low-spin complexes and the spectrochemical series, and it explains colour. Metal carbonyls are held by synergic bonding. And coordination compounds have important uses in analysis, metallurgy, industry, medicine and living things.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'Always start from the d count of the metal ion, not the atom.',
        'State the ligand’s place in the spectrochemical series when deciding high or low spin.',
        'For VBT answers, show the box diagram or state which orbitals hybridise, the shape and the magnetism.',
        'Colour is the complementary colour of the light absorbed, not the colour absorbed.',
        'In carbonyls, name both components: σ donation and π back-donation.',
      ],
      v: table(['Slip', 'Fix'], [['Using Co (3d⁷4s²) instead of Co³⁺ (3d⁶)', 'Find the oxidation state first'], ['[NiCl₄]²⁻ called square planar', 'Cl⁻ is weak: tetrahedral'], ['Saying CO is a σ donor only', 'Add π back-bonding']], 'Table of three common slips in Part 2 and their fixes'),
      n: 'Some final tips. Begin every bonding question by finding the oxidation state and the d count of the metal ion. Say where the ligand sits in the spectrochemical series. In valence bond answers, name the orbitals used, the shape and the magnetic behaviour. Remember that the colour seen is complementary to the colour absorbed. And for carbonyls, mention both sigma donation and pi back-donation.',
    }),
  ],
});
