// ISC 12 Chemistry ch10 Coordination Compounds: Terms, Nomenclature and Isomerism — two decks: Part 1 (t01–t02)
// double salts and complexes, Werner's theory, ligands and denticity, coordination number and oxidation state;
// Part 2 (t03–t04) IUPAC nomenclature and isomerism (structural and stereo).
import { sl, deck, table, flow, svgV, r } from './lib.mjs';
import { CHELATE, CISTRANS } from './svgs.mjs';

export const V = {
  chelate: svgV(CHELATE, 'A metal ion with two separate ammonia ligands compared with the same ion bound by both nitrogen atoms of one ethane-1,2-diamine molecule, closing a five-membered chelate ring'),
  cistrans: svgV(CISTRANS, 'Cis and trans isomers of square planar diamminedichloridoplatinum(II) and of the octahedral tetraamminedichloridocobalt(III) ion', 'Chlorine atoms are drawn green and nitrogen-bonded ligands blue; the dashed bond points away from the viewer.'),
};

export const deck1 = deck({
  part: 1,
  title: 'Coordination Compounds: Terms, Nomenclature and Isomerism — Part 1: Werner’s theory and ligands',
  goals: [
    'Distinguish a coordination compound from a double salt using ionisation in water',
    'Explain primary and secondary valencies according to Werner’s theory',
    'Classify ligands by denticity and identify chelating and ambidentate ligands',
    'Calculate the coordination number and oxidation state of the metal in a complex',
  ],
  slides: [
    sl('title', 'Metal ions with company', {
      b: 'Part 1 — compounds in which a central metal is bonded to a set of ions or molecules by coordinate bonds.',
      v: table(['Coordination compound', 'Where it matters'], [['Haemoglobin (Fe)', 'Oxygen transport in blood'], ['Chlorophyll (Mg)', 'Photosynthesis'], ['Na₃[Ag(S₂O₃)₂]', 'Fixing in black-and-white photography'], ['[Ag(CN)₂]⁻, [Au(CN)₂]⁻', 'Extraction of silver and gold'], ['Ca–EDTA', 'Estimating hardness of water']], 'Table of coordination compounds and where they matter'),
      n: 'Namaste! When you add ammonia to pale blue copper sulphate solution and it turns deep blue, a coordination compound has formed. Such compounds are in our blood, in leaves, in photographic film and in gold extraction. In this part we see how they differ from double salts, how Werner explained them, and the vocabulary chemists use to describe them.',
    }),
    sl('concept', 'Double salts and coordination compounds', {
      b: 'Both are made by combining stoichiometric amounts of two or more salts. A **double salt** exists only in the solid and **dissociates completely** into simple ions in water. A **coordination compound** keeps its **complex ion** intact in water, so its constituents do not all give their usual tests.',
      v: table(['Compound', 'Type', 'Ions in water'], [['Potash alum, K₂SO₄·Al₂(SO₄)₃·24H₂O', 'Double salt', 'K⁺, Al³⁺, SO₄²⁻'], ['Carnallite, KCl·MgCl₂·6H₂O', 'Double salt', 'K⁺, Mg²⁺, Cl⁻'], ['K₃[Fe(CN)₆]', 'Coordination compound', 'K⁺ and [Fe(CN)₆]³⁻ only'], ['[Ag(NH₃)₂]Cl', 'Coordination compound', '[Ag(NH₃)₂]⁺ and Cl⁻']], 'Table contrasting double salts with coordination compounds'),
      n: 'Potash alum dissolves to give potassium, aluminium and sulphate ions, each of which gives its usual test, so it is a double salt. Potassium ferricyanide gives only potassium ions and the ferricyanide ion; the solution gives no test for free iron three plus or cyanide ions. The complex ion survives in water, and that is what makes it a coordination compound.',
    }),
    sl('concept', 'Werner’s theory', {
      b: 'Werner (1898): (1) a metal shows **primary valency** (ionisable, satisfied by anions, equal to the oxidation state) and **secondary valency** (non-ionisable, satisfied by ligands, equal to the **coordination number**). (2) Every metal has a fixed secondary valency. (3) Secondary valencies are **directed in space**, giving a definite geometry: 6 → octahedral; 4 → tetrahedral or square planar.',
      v: table(['Werner formula', 'Ions per formula unit', 'Moles AgCl per mole'], [['[Co(NH₃)₆]Cl₃', '4', '3'], ['[CoCl(NH₃)₅]Cl₂', '3', '2'], ['[CoCl₂(NH₃)₄]Cl', '2', '1'], ['[CoCl₃(NH₃)₃]', '0 (non-electrolyte)', '0']], 'Table of cobalt ammine chlorides with ions per formula unit and moles of silver chloride precipitated'),
      n: 'Werner measured how much silver chloride each cobalt ammine chloride precipitated and how well its solution conducted electricity. He concluded that chloride ions outside the coordination sphere are free and ionisable, while ligands inside are held firmly in fixed directions. As ammonia molecules are replaced by chlorides inside the sphere, fewer ions form, and the triammine is a non-electrolyte.',
    }),
    sl('example', 'Worked example: hydrated chromium(III) chloride', {
      b: r`**Problem.** A grey-green form of $\ce{CrCl3.6H2O}$ is dissolved; $0.020\ \text{mol}$ of it gives $0.040\ \text{mol}$ of AgCl with excess silver nitrate. Chromium(III) has coordination number 6. Write its Werner formula and the number of ions it gives in water.

**Step 1.** Free $\ce{Cl-}$ per formula unit $= 0.040 \div 0.020 = 2$.

**Step 2.** One Cl⁻ is a ligand; with CN = 6, five water molecules are also ligands; the sixth water is water of crystallisation.

**Step 3.** $\ce{[CrCl(H2O)5]Cl2.H2O}$: 3 ions in water (one complex cation and two Cl⁻).`,
      v: flow('LR', [['a', 'Moles AgCl ÷ moles compound'], ['b', '= Cl⁻ outside the sphere'], ['c', 'Fill sphere to CN 6'], ['d', 'Rest = water of crystallisation']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow for deducing the Werner formula of a hydrated chloride'),
      n: 'Two moles of silver chloride form per mole of compound, so two chlorides are outside the sphere and one is a ligand. Chromium three plus needs six ligands, so five water molecules join that chloride inside the sphere. The sixth water is not bonded to chromium; it is water of crystallisation. The compound gives three ions in water.',
    }),
    sl('check', 'Quick check: Werner formula', {
      b: 'Use precipitation or conductivity data to choose the Werner formula.',
      n: 'Quick check. Only the chloride outside the square brackets reacts with silver nitrate.',
      chk: 'werner-mcq',
    }),
    sl('concept', 'The language of complexes', {
      b: r`In $\ce{[Co(NH3)5Cl]SO4}$: **central atom** Co; **ligands** five $\ce{NH3}$ and one $\ce{Cl-}$; **coordination number** 6; **coordination sphere** the bracketed cation; **counter ion** $\ce{SO4^2-}$; **coordination polyhedron** octahedron; **oxidation state** of Co $+3$. A ligand is a **Lewis base** (electron-pair donor); the metal is a **Lewis acid**.`,
      v: table(['Term', 'Meaning'], [['Ligand', 'Ion or molecule donating an electron pair to the central atom'], ['Coordination number', 'Number of donor atoms bonded to the central atom'], ['Coordination sphere', 'Central atom with its ligands, written in square brackets'], ['Coordination polyhedron', 'Spatial arrangement of the donor atoms'], ['Homoleptic / heteroleptic', 'One kind / more than one kind of ligand']], 'Table of key terms for coordination compounds'),
      n: 'In pentaamminechloridocobalt three sulphate, cobalt is the central atom. Five ammonia molecules and one chloride ion are ligands, each donating a lone pair, so cobalt acts as a Lewis acid and the ligands as Lewis bases. Six donor atoms means coordination number six and an octahedral shape. Sulphate, outside the brackets, is the counter ion.',
    }),
    sl('concept', 'Ligands by denticity', {
      b: 'Ligands are classified by the number of donor atoms they use: **unidentate**, **didentate**, **tridentate**, **tetradentate**, **pentadentate**, **hexadentate**. Ligands with two or more donor atoms are **polydentate**; when they bind one metal through several atoms they form rings and are called **chelating** ligands. An **ambidentate** ligand can bind through either of two different atoms (NO₂⁻/ONO⁻, SCN⁻/NCS⁻).',
      v: table(['Denticity', 'Example', 'Donor atoms'], [['Unidentate', 'NH₃, H₂O, Cl⁻, CN⁻', '1'], ['Didentate', 'en (ethane-1,2-diamine), C₂O₄²⁻', '2 (N,N or O,O)'], ['Tridentate', 'dien (diethylenetriamine)', '3 N'], ['Tetradentate', 'trien (triethylenetetramine)', '4 N'], ['Pentadentate', 'EDTA³⁻ (one arm free)', '2 N, 3 O'], ['Hexadentate', 'EDTA⁴⁻', '2 N, 4 O']], 'Table of ligands classified by denticity from unidentate to hexadentate'),
      n: 'Ligands can have one arm or many. Ammonia and chloride are unidentate. Ethane-1,2-diamine and oxalate are didentate. Diethylenetriamine has three nitrogen donors, and triethylenetetramine four. EDTA can grip a metal with six donor atoms, two nitrogens and four oxygens. Nitrite and thiocyanate are ambidentate: each can attach through either of two different atoms.',
    }),
    sl('diagram', 'Chelating ligands and the chelate effect', {
      b: 'When ethane-1,2-diamine binds through both N atoms it closes a **five-membered ring** with the metal. Chelate complexes are **more stable** than similar complexes of unidentate ligands (the **chelate effect**): breaking one bond does not release the ligand.',
      v: V.chelate,
      n: 'On the left, two ammonia molecules each hold the metal with a single bond. On the right, one ethane-1,2-diamine molecule holds it with two bonds and closes a five-membered ring. To remove it, both bonds must break, so chelate complexes are much more stable. That is why EDTA can pull calcium and magnesium ions out of hard water so effectively.',
    }),
    sl('check', 'Quick check: denticity', {
      b: 'Classify a ligand by its denticity.',
      n: 'Quick check. Count the donor atoms a ligand can use at the same time.',
      chk: 'dent-mcq',
    }),
    sl('concept', 'Coordination number and oxidation state', {
      b: r`**Coordination number** = total number of **donor atoms** (a didentate ligand counts 2). **Oxidation state** of the metal: charge on the complex ion $=$ oxidation state $+$ sum of ligand charges. Neutral ligands (NH₃, H₂O, CO, en) contribute 0; Cl⁻, CN⁻, OH⁻, NO₂⁻ contribute −1; C₂O₄²⁻ and SO₄²⁻ −2; EDTA⁴⁻ −4.`,
      v: table(['Ligand', 'Charge', 'Donor atoms'], [['NH₃, H₂O, CO', '0', '1'], ['en', '0', '2'], ['Cl⁻, CN⁻, NO₂⁻', '−1', '1'], ['C₂O₄²⁻', '−2', '2'], ['EDTA⁴⁻', '−4', '6']], 'Table of ligand charges and donor atoms'),
      n: 'Two numbers describe the metal in any complex. The coordination number counts donor atoms, so each ethane-1,2-diamine or oxalate counts as two and EDTA as six. The oxidation state comes from charge balance: the charge on the complex equals the metal’s oxidation state plus the charges of all the ligands. Neutral ligands such as ammonia and carbon monoxide add nothing.',
    }),
    sl('example', 'Worked example: oxidation state and coordination number', {
      b: r`**Problem.** Find the oxidation state (OS) and coordination number (CN) of the metal in (a) $\ce{[Pt(en)2Cl2]Cl2}$, (b) $\ce{Na3[Co(NO2)6]}$ and (c) $\ce{[Cu(EDTA)]^2-}$.

**(a)** $x + 0 + 2(-1) = +2$, so $x = +4$; CN $= 2 \times 2 + 2 = 6$.

**(b)** $3(+1) + x + 6(-1) = 0$, so $x = +3$; CN $= 6$.

**(c)** $x + (-4) = -2$, so $x = +2$; CN $= 6$ (EDTA hexadentate).`,
      v: table(['Complex', 'OS', 'CN'], [['[Pt(en)₂Cl₂]Cl₂', '+4', '6'], ['Na₃[Co(NO₂)₆]', '+3', '6'], ['[Cu(EDTA)]²⁻', '+2', '6']], 'Table of oxidation states and coordination numbers for the worked example'),
      n: 'For the platinum complex, the bracketed ion carries plus two because two chlorides lie outside; two chlorides inside give minus two, so platinum is plus four; two ethane-1,2-diamines give four donor atoms and two chlorides two more. In sodium hexanitritocobaltate, cobalt is plus three. In the copper EDTA complex, copper is plus two and EDTA alone supplies six donor atoms.',
    }),
    sl('check', 'Quick check: oxidation state and coordination number', {
      b: 'Find the oxidation state and coordination number of a metal.',
      n: 'Quick check. Balance the charges for the oxidation state; count donor atoms for the coordination number.',
      chk: 'oscn-mcq',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Double salts give all their simple ions in water; complexes keep the complex ion intact.',
        'Werner: primary valency = oxidation state (ionisable); secondary valency = coordination number (directional).',
        'AgNO₃ precipitates only Cl⁻ outside the sphere; number of ions shows in conductivity.',
        'Ligands: uni- to hexadentate; chelates are extra stable; ambidentate ligands bind through either of two atoms.',
        'CN = number of donor atoms; OS from charge balance.',
      ],
      v: table(['Quantity', 'How to find it'], [['Ionisable Cl⁻', 'Moles AgCl ÷ moles complex'], ['CN', 'Count donor atoms'], ['OS', 'Charge balance']], 'Summary table of how to find key quantities'),
      n: 'Let us sum up Part 1. Coordination compounds keep their complex ions in water, unlike double salts. Werner’s primary valency is the ionisable oxidation state and his secondary valency is the directional coordination number. Silver nitrate counts only the chloride outside the brackets. Ligands range from unidentate to hexadentate, and chelates are especially stable.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'Show the division moles AgCl ÷ moles complex before writing a Werner formula.',
        'Count donor atoms, not ligand molecules, for the coordination number.',
        'Include the charges of anionic ligands when finding the oxidation state.',
        'Give one example for each term you define (chelate, ambidentate, homoleptic).',
      ],
      v: table(['Slip', 'Fix'], [['CN of [Pt(en)₂Cl₂]²⁺ = 4', 'CN = 6'], ['Calling alum a complex', 'Alum is a double salt'], ['Secondary valency is ionisable', 'Primary valency is ionisable']], 'Table of three common slips in Part 1 and fixes'),
      n: 'Some tips. When working out a Werner formula, write the division of moles of silver chloride by moles of complex. Count donor atoms for the coordination number. Remember to include the charges of anionic ligands when finding the oxidation state, and support every definition with an example.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Coordination Compounds: Terms, Nomenclature and Isomerism — Part 2: Naming and isomerism',
  goals: [
    'Write IUPAC names of mononuclear coordination compounds and formulae from names',
    'Identify ionisation, linkage, coordination and hydrate isomers',
    'Draw geometrical (cis/trans, fac/mer) and optical isomers of simple octahedral and square planar complexes',
  ],
  slides: [
    sl('title', 'Names and shapes', {
      b: 'Part 2 — how to name complexes by IUPAC rules and how the same formula can give different compounds.',
      v: flow('LR', [['a', 'Formula'], ['b', 'IUPAC name'], ['c', 'Structural isomers'], ['d', 'Stereoisomers']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow of Part 2 topics: formula to name, then structural isomers and stereoisomers'),
      n: 'Coordination chemists needed a precise way to name thousands of complexes, so IUPAC laid down a set of rules. In this part we learn those rules, both from formula to name and from name to formula. Then we see how a single formula can correspond to several different compounds, the isomers, which can differ in bonding, in colour, and even in how they act as medicines.',
    }),
    sl('concept', 'IUPAC rules for naming', {
      b: '(1) **Cation first, then anion**, as in simple salts. (2) Within the complex: **ligands first, in alphabetical order**, then the metal. (3) Prefixes **di-, tri-, tetra-** for simple ligands; **bis-, tris-, tetrakis-** (with brackets) for ligands whose names contain numbers or prefixes. (4) Metal **oxidation state** in Roman numerals in brackets. (5) An **anionic complex** ends in **-ate**, with Latin roots for some metals. (6) Neutral complexes are one word.',
      v: table(['Metal', 'In an anionic complex'], [['Iron', 'ferrate'], ['Copper', 'cuprate'], ['Silver', 'argentate'], ['Gold', 'aurate'], ['Lead', 'plumbate'], ['Tin', 'stannate'], ['Zinc, aluminium, cobalt', 'zincate, aluminate, cobaltate']], 'Table of metal names used in anionic complexes'),
      n: 'Name the cation first and the anion second. Inside a complex, list the ligands alphabetically, ignoring multiplying prefixes, and then name the metal with its oxidation state in Roman numerals. If the complex is an anion, the metal name ends in ate, and iron, copper, silver, gold, lead and tin use their Latin roots. Ligands with numbers already in their names take bis and tris.',
    }),
    sl('concept', 'Names of ligands', {
      b: 'Anionic ligands end in **-o** (chlorido, cyanido, hydroxido, oxalato, sulfato). Neutral ligands keep their names except **aqua** (H₂O), **ammine** (NH₃), **carbonyl** (CO) and **nitrosyl** (NO). For ambidentate ligands, the donor atom is shown: nitrito-N, nitrito-O, thiocyanato-S, thiocyanato-N.',
      v: table(['Ligand', 'Name', 'Ligand', 'Name'], [['F⁻', 'fluorido', 'H₂O', 'aqua'], ['Br⁻', 'bromido', 'NH₃', 'ammine'], ['OH⁻', 'hydroxido', 'CO', 'carbonyl'], ['CN⁻', 'cyanido', 'NO', 'nitrosyl'], ['C₂O₄²⁻', 'oxalato', 'en', 'ethane-1,2-diamine'], ['NO₂⁻ (N)', 'nitrito-N', 'SCN⁻ (S)', 'thiocyanato-S']], 'Table of IUPAC ligand names'),
      n: 'Learn the ligand names well. Negative ligands end in o: fluorido, bromido, hydroxido, cyanido and oxalato. Water is aqua, ammonia is ammine with two m’s, carbon monoxide is carbonyl and nitrogen monoxide is nitrosyl. For ambidentate ligands, add the symbol of the donor atom, as in nitrito N for nitrite bonded through nitrogen.',
    }),
    sl('example', 'Worked example: formula to name', {
      b: r`**Name these.**

(a) $\ce{[CrCl2(H2O)4]Cl}$ → tetraaquadichloridochromium(III) chloride

(b) $\ce{Na2[Zn(OH)4]}$ → sodium tetrahydroxidozincate(II)

(c) $\ce{[Fe(CO)5]}$ → pentacarbonyliron(0)

(d) $\ce{[Co(NH3)5(ONO)]SO4}$ → pentaamminenitrito-O-cobalt(III) sulfate

(e) $\ce{K3[Al(C2O4)3]}$ → potassium trioxalatoaluminate(III)`,
      v: flow('LR', [['a', 'Charge on complex'], ['b', 'Metal oxidation state'], ['c', 'Ligands A→Z with prefixes'], ['d', 'Metal (-ate if anionic)'], ['e', 'Counter ion']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']], 'Flow for naming a complex from its formula'),
      n: 'Start each name by finding the charge on the complex and the metal’s oxidation state. In the chromium complex, aqua comes before chlorido alphabetically. The zinc complex is an anion, so zinc becomes zincate. In iron pentacarbonyl the metal is in the zero state. The nitrite bonded through oxygen is nitrito O. And three oxalates around aluminium in an anion give trioxalatoaluminate.',
    }),
    sl('example', 'Worked example: name to formula', {
      b: r`**Write formulas.**

(a) Hexaaquairon(II) sulfate: $\ce{[Fe(H2O)6]^2+}$ with $\ce{SO4^2-}$ → $\ce{[Fe(H2O)6]SO4}$.

(b) Potassium hexacyanidomanganate(III): charge $= +3 - 6 = -3$ → $\ce{K3[Mn(CN)6]}$.

(c) Tetraamminecopper(II) tetrachloridoplatinate(II): $\ce{[Cu(NH3)4]^2+}$ and $\ce{[PtCl4]^2-}$ → $\ce{[Cu(NH3)4][PtCl4]}$.`,
      v: table(['Name', 'Charge on complex', 'Formula'], [['Hexaaquairon(II) sulfate', '+2', '[Fe(H₂O)₆]SO₄'], ['Potassium hexacyanidomanganate(III)', '−3', 'K₃[Mn(CN)₆]'], ['Tetraamminecopper(II) tetrachloridoplatinate(II)', '+2 and −2', '[Cu(NH₃)₄][PtCl₄]']], 'Table of names, charges and formulas'),
      n: 'To write a formula, build the complex ion and find its charge from the oxidation state and ligand charges. Hexaaquairon two is a plus two cation, balanced by one sulphate. Hexacyanidomanganate three carries minus three, so three potassium ions are needed. When both ions are complexes, write the cation first: tetraamminecopper two with tetrachloridoplatinate two.',
    }),
    sl('check', 'Quick check: naming', {
      b: 'Choose the correct IUPAC name or formula.',
      n: 'Quick check. Look at alphabetical order, the ate ending and the oxidation state.',
      chk: 'naming-mcq',
    }),
    sl('concept', 'Types of isomerism', {
      b: '**Isomers** have the same molecular formula but different arrangements of atoms. **Structural isomers** differ in which atoms are bonded to the metal; **stereoisomers** have the same bonds but different spatial arrangements.',
      v: flow('TB', [['i', 'Isomerism'], ['s', 'Structural'], ['t', 'Stereoisomerism'], ['a', 'Ionisation'], ['b', 'Linkage'], ['c', 'Coordination'], ['d', 'Hydrate'], ['g', 'Geometrical'], ['o', 'Optical']], [['i', 's'], ['i', 't'], ['s', 'a'], ['s', 'b'], ['s', 'c'], ['s', 'd'], ['t', 'g'], ['t', 'o']], 'Tree of isomerism in coordination compounds'),
      n: 'Coordination compounds show two broad kinds of isomerism. In structural isomers, the set of ligands bonded to the metal is different, or a ligand is bonded through a different atom. In stereoisomers, exactly the same atoms are bonded to the metal, but they are arranged differently in space. Each kind has its own sub-types, which we now meet.',
    }),
    sl('concept', 'Structural isomerism', {
      b: 'Four kinds are in the syllabus.',
      v: table(['Type', 'Cause', 'Example pair'], [['Ionisation', 'Ligand and counter ion exchange places', '[Pt(NH₃)₄Cl₂]Br₂ and [Pt(NH₃)₄Br₂]Cl₂'], ['Linkage', 'Ambidentate ligand binds through a different atom', '[Mn(CO)₅(SCN)] and [Mn(CO)₅(NCS)]'], ['Coordination', 'Ligands exchanged between complex cation and anion', '[Cu(NH₃)₄][PtCl₄] and [Pt(NH₃)₄][CuCl₄]'], ['Hydrate', 'Water inside or outside the sphere', '[Cr(H₂O)₆]Cl₃ (violet) and [CrCl(H₂O)₅]Cl₂·H₂O (grey-green)']], 'Table of structural isomerism with causes and example pairs'),
      n: 'Ionisation isomers give different ions in solution: one gives bromide ions, the other chloride ions. Linkage isomers differ in the donor atom of an ambidentate ligand, such as thiocyanate bonded through sulphur or nitrogen. Coordination isomers swap ligands between a complex cation and a complex anion. Hydrate isomers differ in whether water is a ligand or water of crystallisation, and often differ in colour.',
    }),
    sl('example', 'Worked example: naming the isomerism', {
      b: r`**Problem.** Identify the type of isomerism in each pair.

(a) $\ce{[Co(NH3)5(NO3)]SO4}$ and $\ce{[Co(NH3)5(SO4)]NO3}$ → **ionisation** (NO₃⁻ and SO₄²⁻ swap).

(b) $\ce{[Pd(NH3)2(NO2)2]}$ and $\ce{[Pd(NH3)2(ONO)2]}$ → **linkage** (N- vs O-bonded nitrite).

(c) $\ce{[Co(en)3][Cr(CN)6]}$ and $\ce{[Cr(en)3][Co(CN)6]}$ → **coordination**.

(d) $\ce{[CrCl2(H2O)4]Cl.2H2O}$ and $\ce{[CrCl(H2O)5]Cl2.H2O}$ → **hydrate**.`,
      v: table(['Pair', 'What differs', 'Isomerism'], [['(a)', 'Ion outside the sphere', 'Ionisation'], ['(b)', 'Donor atom of NO₂⁻', 'Linkage'], ['(c)', 'Which metal has which ligands', 'Coordination'], ['(d)', 'Number of H₂O ligands', 'Hydrate']], 'Table identifying the isomerism in four pairs'),
      n: 'Ask what has changed. In the first pair, nitrate and sulphate swap between ligand and counter ion: ionisation isomers. In the second, nitrite binds through nitrogen in one and oxygen in the other: linkage. In the third, the two metals exchange their ligand sets: coordination. In the fourth, one water molecule moves from inside to outside the sphere: hydrate isomers.',
    }),
    sl('check', 'Quick check: structural isomers', {
      b: 'Identify the type of structural isomerism.',
      n: 'Quick check. Decide what has moved: a counter ion, a donor atom, a ligand set or a water molecule.',
      chk: 'struct-mcq',
    }),
    sl('diagram', 'Geometrical isomerism', {
      b: '**cis–trans** isomers occur in square planar **[MA₂B₂]** and octahedral **[MA₂B₄]** complexes: identical ligands are **adjacent (cis)** or **opposite (trans)**. Octahedral **[MA₃B₃]** shows **fac** (three A on one face) and **mer** (three A around a meridian) isomers. Tetrahedral complexes cannot show geometrical isomerism.',
      v: V.cistrans,
      n: 'In square planar diamminedichloridoplatinum, the two chlorides can be neighbours, the cis isomer, or opposite each other, the trans isomer; the cis form is the anticancer drug cisplatin. Octahedral complexes with two identical ligands among four others also have cis and trans forms. With three of one ligand and three of another, we get fac and mer isomers. In a tetrahedron every position is next to every other, so there are none.',
    }),
    sl('concept', 'Optical isomerism', {
      b: '**Optical isomers** (enantiomers) are **non-superimposable mirror images**; they rotate plane-polarised light equally in opposite directions (**d** and **l**). Common in octahedral complexes with didentate ligands: **[M(AA)₃]** and **cis-[MA₂(AA)₂]**. Trans isomers have a mirror plane and are optically inactive.',
      v: table(['Complex', 'Geometrical isomers', 'Optical isomers'], [['[Cr(C₂O₄)₃]³⁻', 'None', 'd and l'], ['[CoCl₂(en)₂]⁺', 'cis and trans', 'cis only: d and l'], ['[Pt(en)Cl₂]', 'None (en spans cis positions)', 'None'], ['[Co(NH₃)₃(NO₂)₃]', 'fac and mer', 'None']], 'Table of complexes with their geometrical and optical isomers'),
      n: 'Three oxalate rings around chromium can twist like a left-handed or a right-handed propeller, giving two mirror-image forms that rotate polarised light in opposite directions. The cis form of a bis ethane-1,2-diamine complex with two chlorides is also chiral, but the trans form has a mirror plane. A single ethane-1,2-diamine on square planar platinum must span neighbouring positions, so there is no isomer.',
    }),
    sl('example', 'Worked example: counting stereoisomers', {
      b: r`**Problem.** How many stereoisomers does each have? (a) $\ce{[Co(en)2(NH3)2]^3+}$; (b) $\ce{[Pt(NH3)2(Br)(Cl)]}$ (square planar); (c) $\ce{[Zn(NH3)2Cl2]}$ (tetrahedral).

**(a)** trans (1, optically inactive) + cis (d and l) = **3**.

**(b)** NH₃ groups adjacent (cis) or opposite (trans) = **2**; no optical isomers (planar).

**(c)** Tetrahedral: **none** (only one arrangement).`,
      v: table(['Complex', 'Geometry', 'Stereoisomers'], [['[Co(en)₂(NH₃)₂]³⁺', 'Octahedral', '3 (trans, d-cis, l-cis)'], ['[Pt(NH₃)₂BrCl]', 'Square planar', '2 (cis, trans)'], ['[Zn(NH₃)₂Cl₂]', 'Tetrahedral', '1 (no isomers)']], 'Table counting stereoisomers'),
      n: 'For the cobalt complex, the two ammonias can be opposite, which gives one trans isomer with a mirror plane, or adjacent, which gives a chiral cis form existing as a mirror-image pair: three in all. The square planar platinum complex has cis and trans forms but no optical isomers. The tetrahedral zinc complex has only one arrangement, because all four corners of a tetrahedron are equivalent.',
    }),
    sl('check', 'Quick check: stereoisomers', {
      b: 'Decide which complex shows geometrical or optical isomerism.',
      n: 'Quick check. Look at the geometry first, then at whether a mirror plane is possible.',
      chk: 'stereo-mcq',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'Name: cation then anion; ligands alphabetical; -o for anionic ligands; aqua, ammine, carbonyl; Roman numeral OS; -ate for anionic complexes.',
        'bis/tris/tetrakis for ligands like en.',
        'Structural isomers: ionisation, linkage, coordination, hydrate.',
        'Geometrical: cis/trans (MA₂B₂ planar, MA₂B₄ octahedral), fac/mer (MA₃B₃).',
        'Optical: [M(AA)₃] and cis-[MA₂(AA)₂]; tetrahedral and planar complexes of simple ligands are inactive.',
      ],
      v: table(['Pair', 'Isomerism'], [['NO₂⁻ / ONO⁻', 'Linkage'], ['Cl⁻ inside / outside', 'Ionisation'], ['cis / trans', 'Geometrical'], ['d / l', 'Optical']], 'Summary table of isomer pairs'),
      n: 'Let us sum up Part 2. IUPAC names list the cation first, the ligands alphabetically, then the metal with its oxidation state, using ate for complex anions. Structural isomers differ in what is bonded to the metal; stereoisomers differ in arrangement. Geometrical isomers need square planar or octahedral complexes, and optical isomers are common with chelating ligands.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'Alphabetise by ligand name, not prefix: "tetraaqua" files under a, "dichlorido" under c.',
        'Write "ammine" for NH₃ (not "amine").',
        'Use -ate only when the complex ion is negative.',
        'For stereoisomer counts, check for a mirror plane before calling a complex optically active.',
      ],
      v: table(['Slip', 'Fix'], [['potassium hexacyanidoiron(III)', 'hexacyanidoferrate(III)'], ['Tetrahedral MA₂B₂ has cis/trans', 'No geometrical isomers'], ['trans-[CoCl₂(en)₂]⁺ optically active', 'Inactive (mirror plane)']], 'Table of three common slips in Part 2 and fixes'),
      n: 'Final tips. Arrange ligands by their names, ignoring prefixes. Spell ammine with two m’s. Use the ate ending only for anionic complexes. And before calling a complex optically active, look for a mirror plane; trans isomers usually have one.',
    }),
  ],
});
