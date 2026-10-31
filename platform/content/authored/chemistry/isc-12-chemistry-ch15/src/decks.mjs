// ISC 12 Chemistry ch15 Phenols and Ethers — two decks: Part 1 (t01–t03) phenols: classification, preparation,
// acidity and reactions, electrophilic substitution, Kolbe and Reimer–Tiemann, tests and uses; Part 2 (t04–t05)
// aliphatic ethers (Williamson, properties, reactions with Cl₂, O₂, HI, PCl₅) and anisole.
import { sl, deck, table, flow, svgV, r } from './lib.mjs';
import { ANGLES, PHENOXIDE } from './svgs.mjs';

export const V = {
  angles: svgV(ANGLES, 'Bent shapes of methanol, with a C–O–H angle of about 108.9 degrees, and methoxymethane, with a C–O–C angle of about 111.7 degrees'),
  phenoxide: svgV(PHENOXIDE, 'Three resonance structures of the phenoxide ion with the negative charge on oxygen, on an ortho carbon and on the para carbon'),
};

export const deck1 = deck({
  part: 1,
  title: 'Phenols and Ethers — Part 1: Phenols',
  goals: [
    'Classify and name phenols and write equations for preparing phenol by four methods',
    'Explain why phenol is more acidic than ethanol, and write its reactions with NaOH, Na, Zn, acetyl chloride, acetic anhydride and PCl₅',
    'Predict products of electrophilic substitution, Kolbe and Reimer–Tiemann reactions',
    'Describe the ferric chloride and azo dye tests and uses of phenol',
  ],
  slides: [
    sl('title', 'Phenols', {
      b: 'Part 1 — compounds with an –OH group directly on a benzene ring.',
      v: table(['Phenol', 'Where it is used'], [['Phenol (carbolic acid)', 'First surgical antiseptic; Bakelite; drugs'], ['Salicylic acid (from phenol)', 'Aspirin, skin creams'], ['4-Chloro-3,5-dimethylphenol', 'Household disinfectants'], ['Picric acid', 'Dyes; formerly explosives']], 'Table of phenols and their uses'),
      n: 'Namaste! Joseph Lister used phenol, then called carbolic acid, to make surgery safe. Today phenol is used to make plastics like Bakelite, aspirin and disinfectants. In phenols the hydroxyl group is joined directly to a benzene ring, and this makes them quite different from alcohols. In this part we see how phenol is made, why it is acidic, and how it reacts.',
    }),
    sl('concept', 'Classification and nomenclature', {
      b: 'Phenols are **monohydric**, **dihydric** or **trihydric** by the number of –OH groups on the ring. Substituted phenols are named as derivatives of phenol, numbering from the C–OH carbon.',
      v: table(['Structure', 'Common name', 'IUPAC name'], [['C₆H₅OH', 'Phenol (carbolic acid)', 'Phenol'], ['CH₃C₆H₄OH (meta)', 'm-Cresol', '3-Methylphenol'], ['C₆H₄(OH)₂ (1,2)', 'Catechol', 'Benzene-1,2-diol'], ['C₆H₄(OH)₂ (1,3)', 'Resorcinol', 'Benzene-1,3-diol'], ['C₆H₄(OH)₂ (1,4)', 'Quinol (hydroquinone)', 'Benzene-1,4-diol'], ['C₆H₃(OH)₃ (1,2,3)', 'Pyrogallol', 'Benzene-1,2,3-triol']], 'Table of names of phenols'),
      n: 'Phenol itself has one hydroxyl group on the ring. The cresols are methylphenols. Benzene diols have two hydroxyl groups: catechol, resorcinol and quinol, with the groups in the one-two, one-three and one-four positions. Pyrogallol has three. In IUPAC names, numbering starts at the carbon carrying the hydroxyl group.',
    }),
    sl('concept', 'Preparation of phenol', {
      b: 'Four methods: (1) from **benzenediazonium chloride** (warm with water); (2) from **chlorobenzene** (Dow process: NaOH, 623 K, 300 atm); (3) from **benzenesulphonic acid** (sodium salt fused with NaOH, then acid); (4) from **cumene** (industrial).',
      m: [r`\ce{C6H5N2Cl + H2O ->[warm] C6H5OH + N2 + HCl}`, r`\ce{C6H5Cl + 2NaOH ->[623 K, 300 atm] C6H5ONa + NaCl + H2O}`, r`\ce{C6H5SO3Na + 2NaOH ->[573 K] C6H5ONa + Na2SO3 + H2O}`],
      v: table(['Starting material', 'Key reagent and condition'], [['Benzenediazonium chloride', 'Warm with water'], ['Chlorobenzene', 'NaOH, 623 K, 300 atm; then HCl'], ['Sodium benzenesulphonate', 'Fuse with NaOH; then HCl'], ['Cumene', 'O₂ (air); then dilute acid']], 'Table of methods of preparing phenol'),
      n: 'Phenol can be made in four ways. A diazonium salt gives phenol simply on warming with water. Chlorobenzene reacts with sodium hydroxide only at high temperature and pressure. Sodium benzenesulphonate is fused with solid sodium hydroxide. In the last three cases sodium phenoxide is formed first, and acid then releases phenol. Industry uses the cumene process.',
    }),
    sl('concept', 'The cumene process', {
      b: 'Benzene + propene (acid catalyst) → **cumene** (isopropylbenzene); air oxidises it to **cumene hydroperoxide**; dilute acid splits this into **phenol and propanone** (acetone).',
      m: [r`\ce{C6H6 + CH2=CHCH3 ->[H3PO4] C6H5CH(CH3)2}`, r`\ce{C6H5CH(CH3)2 + O2 -> C6H5C(CH3)2OOH}`, r`\ce{C6H5C(CH3)2OOH ->[H+] C6H5OH + CH3COCH3}`],
      v: flow('LR', [['a', 'Benzene + propene'], ['b', 'Cumene'], ['c', 'Cumene hydroperoxide'], ['d', 'Phenol + propanone']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow of the cumene process'),
      n: 'Most phenol is made by the cumene process. Benzene and propene combine to give cumene, which air oxidises to cumene hydroperoxide. Dilute acid then splits the hydroperoxide into phenol and propanone. The process is economical because it uses cheap raw materials and both products are valuable.',
    }),
    sl('example', 'Worked example: phenol from benzene', {
      b: r`**Problem.** Convert benzene into phenol by way of benzenesulphonic acid, giving reagents and conditions.

**Step 1.** Sulphonate: $\ce{C6H6 + H2SO4 ->[\Delta] C6H5SO3H + H2O}$ (conc. or fuming H₂SO₄).

**Step 2.** Neutralise: $\ce{C6H5SO3H + NaOH -> C6H5SO3Na + H2O}$.

**Step 3.** Fuse with NaOH at about 573 K: $\ce{C6H5SO3Na + 2NaOH -> C6H5ONa + Na2SO3 + H2O}$.

**Step 4.** Acidify: $\ce{C6H5ONa + HCl -> C6H5OH + NaCl}$.`,
      v: table(['Step', 'Product'], [['Sulphonation', 'Benzenesulphonic acid'], ['Neutralisation', 'Sodium benzenesulphonate'], ['Fusion with NaOH', 'Sodium phenoxide'], ['Acidification', 'Phenol']], 'Table of intermediates from benzene to phenol'),
      n: 'Benzene is first heated with concentrated sulphuric acid to give benzenesulphonic acid, which is neutralised to its sodium salt. Fusing this salt with solid sodium hydroxide at about five hundred and seventy three kelvin replaces the sulphonate group by an oxide ion, giving sodium phenoxide and sodium sulphite. Finally, acid releases phenol.',
    }),
    sl('check', 'Quick check: preparation', {
      b: 'Identify a method or product in the preparation of phenol.',
      n: 'Quick check. Remember the by-product of the cumene process and the conditions of the Dow process.',
      chk: 'prep-mcq',
    }),
    sl('concept', 'Physical properties', {
      b: 'Phenol is a colourless solid (m.p. 316 K) that turns pink in air; it has a characteristic smell and is **corrosive**. Hydrogen bonding gives phenols higher boiling points than arenes or haloarenes of similar mass; phenol is moderately soluble in water. **2-Nitrophenol** has **intramolecular** hydrogen bonding, so it is more volatile and less soluble than 4-nitrophenol (**intermolecular**) and can be steam distilled.',
      v: table(['Compound', 'b.p. / K', 'H-bonding'], [['Toluene (M = 92)', '384', 'None'], ['Phenol (M = 94)', '455', 'Intermolecular'], ['2-Nitrophenol', '487', 'Intramolecular'], ['4-Nitrophenol', '552 (decomposes)', 'Intermolecular']], 'Table of boiling points showing hydrogen bonding effects'),
      n: 'Phenol is a colourless crystalline solid that slowly turns pink in air. It burns the skin, so it must be handled with care. Its hydrogen bonds give it a much higher boiling point than toluene of almost the same mass. In two-nitrophenol the hydrogen bond forms inside one molecule, so the molecules are not linked to each other: it is more volatile and can be separated from four-nitrophenol by steam distillation.',
    }),
    sl('diagram', 'Acidity of phenol', {
      b: 'Phenol (pKa 10.0) is about 10⁶ times more acidic than ethanol (pKa 15.9): the **phenoxide ion is stabilised by resonance**, the negative charge being delocalised over O and the ortho and para carbons. Electron-withdrawing groups (–NO₂) at o/p increase acidity; electron-donating groups (–CH₃, –OCH₃) decrease it. Phenol dissolves in NaOH but not in NaHCO₃ (weaker than carbonic acid).',
      v: V.phenoxide,
      n: 'When phenol loses a proton, the negative charge on the phenoxide ion spreads into the ring, onto the ortho and para carbons, as these resonance structures show. Spreading the charge stabilises the ion, so phenol is far more acidic than ethanol. Nitro groups at ortho or para positions spread the charge further and increase acidity; methyl and methoxy groups push electrons in and decrease it. Phenol is still weaker than carbonic acid.',
    }),
    sl('example', 'Worked example: ranking acidity', {
      b: r`**Problem.** Arrange in increasing acid strength: cyclohexanol, phenol, 3-nitrophenol, 4-methoxyphenol, 2,4,6-trinitrophenol.

**Step 1.** Cyclohexanol (pKa ≈ 16): no resonance in the alkoxide — weakest.

**Step 2.** 4-Methoxyphenol (10.2): –OCH₃ releases electrons, slightly weaker than phenol (10.0).

**Step 3.** 3-Nitrophenol (8.3): –I effect only from meta.

**Step 4.** 2,4,6-Trinitrophenol (≈ 0.4): three o/p nitro groups.

**Order:** cyclohexanol < 4-methoxyphenol < phenol < 3-nitrophenol < 2,4,6-trinitrophenol.`,
      v: table(['Compound', 'pKa (approx.)'], [['Cyclohexanol', '16'], ['4-Methoxyphenol', '10.2'], ['Phenol', '10.0'], ['3-Nitrophenol', '8.3'], ['2,4,6-Trinitrophenol', '0.4']], 'Table of pKa values'),
      n: 'Compare the stability of each anion. Cyclohexanol has no ring to delocalise the charge, so it is the weakest acid. A methoxy group pushes electrons into the ring and makes phenoxide slightly less stable. A nitro group at the meta position withdraws electrons only inductively, but three nitro groups at ortho and para positions delocalise the charge so well that picric acid is almost as strong as a mineral acid.',
    }),
    sl('check', 'Quick check: acidity', {
      b: 'Compare the acidity of phenols and alcohols.',
      n: 'Quick check. Think about resonance in the phenoxide ion and the effect of substituents at ortho and para positions.',
      chk: 'acid-mcq',
    }),
    sl('concept', 'Reactions of the –OH group', {
      b: 'Phenol reacts with **NaOH** and **Na** (phenoxide), is reduced by hot **zinc dust** to benzene, and is acylated by **acetyl chloride** or **acetic anhydride** to phenyl ethanoate. With **PCl₅** the yield of chlorobenzene is poor (C–O bond has partial double-bond character); triphenyl phosphate forms instead.',
      m: [r`\ce{C6H5OH + NaOH -> C6H5ONa + H2O}`, r`\ce{2C6H5OH + 2Na -> 2C6H5ONa + H2}`, r`\ce{C6H5OH + Zn -> C6H6 + ZnO}`, r`\ce{C6H5OH + CH3COCl -> CH3COOC6H5 + HCl}`],
      v: table(['Reagent', 'Product'], [['NaOH', 'Sodium phenoxide + water'], ['Na', 'Sodium phenoxide + H₂'], ['Zn dust, heat', 'Benzene + ZnO'], ['CH₃COCl or (CH₃CO)₂O', 'Phenyl ethanoate'], ['PCl₅', 'Little chlorobenzene; mainly (C₆H₅O)₃PO']], 'Table of reactions of the –OH group of phenol'),
      n: 'Being acidic, phenol dissolves in sodium hydroxide and reacts with sodium, forming sodium phenoxide. Heated with zinc dust, it loses its oxygen and gives benzene. Acetyl chloride or acetic anhydride converts it into the ester phenyl ethanoate. Unlike alcohols, phenol gives only a poor yield of chlorobenzene with phosphorus pentachloride, because its carbon–oxygen bond is strengthened by resonance.',
    }),
    sl('concept', 'Electrophilic substitution in phenol', {
      b: '–OH strongly **activates** the ring (+R) and directs **ortho/para**. **Bromine water** → white precipitate of **2,4,6-tribromophenol**; Br₂ in CS₂ (low temperature) → 2- and 4-bromophenol. **Dilute HNO₃** → 2- and 4-nitrophenol; **conc. HNO₃** → picric acid. **Conc. H₂SO₄:** 2-hydroxybenzenesulphonic acid at about 290 K, 4-isomer at about 373 K.',
      m: [r`\ce{C6H5OH + 3Br2 -> C6H2Br3OH + 3HBr}`, r`\ce{C6H5OH + 3HNO3 ->[conc. H2SO4] C6H2(NO2)3OH + 3H2O}`],
      v: table(['Reagent', 'Product'], [['Br₂(aq)', '2,4,6-Tribromophenol (white ppt)'], ['Br₂ in CS₂, 273 K', '2- and 4-bromophenol'], ['Dilute HNO₃', '2- and 4-nitrophenol'], ['Conc. HNO₃', '2,4,6-Trinitrophenol'], ['Conc. H₂SO₄', '2- (low T) or 4-hydroxybenzenesulphonic acid (high T)']], 'Table of electrophilic substitution of phenol'),
      n: 'The hydroxyl group feeds electrons into the ring, so phenol reacts with electrophiles far faster than benzene, at ortho and para positions. In water, bromine gives a white precipitate of tribromophenol at once; in a non-polar solvent at low temperature, only one bromine goes in. Dilute nitric acid gives the nitrophenols, concentrated nitric acid gives picric acid, and sulphonation gives the ortho acid at low temperature and the para acid at high temperature.',
    }),
    sl('concept', 'Kolbe and Reimer–Tiemann reactions', {
      b: '**Kolbe:** sodium phenoxide + CO₂ (about 400 K, 4–7 atm), then H⁺ → **salicylic acid** (2-hydroxybenzoic acid). **Reimer–Tiemann:** phenol + CHCl₃ + aqueous NaOH (about 340 K), then H⁺ → **salicylaldehyde** (2-hydroxybenzaldehyde); the electrophile is dichlorocarbene, :CCl₂.',
      m: [r`\ce{C6H5ONa + CO2 -> HOC6H4COONa}`, r`\ce{C6H5OH + CHCl3 + 3NaOH -> HOC6H4CHO + 3NaCl + 2H2O}`],
      v: table(['Reaction', 'Reagents', 'Product'], [['Kolbe', 'C₆H₅ONa + CO₂, 400 K, pressure; H⁺', 'Salicylic acid'], ['Reimer–Tiemann', 'CHCl₃ + NaOH; H⁺', 'Salicylaldehyde']], 'Table of Kolbe and Reimer–Tiemann reactions'),
      n: 'Two named reactions add a carbon group at the ortho position. In the Kolbe reaction, sodium phenoxide is heated with carbon dioxide under pressure, and acidification gives salicylic acid, the starting point for aspirin. In the Reimer–Tiemann reaction, phenol is warmed with chloroform and sodium hydroxide; dichlorocarbene attacks the ring, and after hydrolysis and acidification salicylaldehyde is obtained.',
    }),
    sl('example', 'Worked example: products of phenol', {
      b: r`**Problem.** Name the main product: (a) phenol + bromine water; (b) phenol + Br₂ in CS₂ at 273 K; (c) sodium phenoxide + CO₂, 400 K, then acid; (d) phenol + CHCl₃/NaOH, then acid; (e) phenol + zinc dust, heat.

**(a)** 2,4,6-Tribromophenol. **(b)** 4-Bromophenol (major) and 2-bromophenol.

**(c)** Salicylic acid. **(d)** Salicylaldehyde. **(e)** Benzene.`,
      v: table(['Reagents', 'Product'], [['Br₂(aq)', '2,4,6-Tribromophenol'], ['Br₂/CS₂, 273 K', '4-Bromophenol'], ['Kolbe', 'Salicylic acid'], ['Reimer–Tiemann', 'Salicylaldehyde'], ['Zn dust', 'Benzene']], 'Table of products from phenol'),
      n: 'In water, bromine is strongly polarised and the phenol partly ionised, so all three activated positions are substituted. In carbon disulphide at low temperature the reaction is milder and gives mainly para-bromophenol. The Kolbe reaction gives salicylic acid and the Reimer–Tiemann reaction gives salicylaldehyde, both with the new group ortho to the hydroxyl. Zinc dust strips off the oxygen to give benzene.',
    }),
    sl('concept', 'Tests for phenol and uses', {
      b: '**Ferric chloride test:** neutral FeCl₃ gives a **violet** colour with phenol (alcohols do not). **Azo dye test:** phenol in NaOH couples with benzenediazonium chloride at 273–278 K to give an **orange** dye, 4-hydroxyazobenzene. **Bromine water:** white precipitate. **Uses:** antiseptics and disinfectants, Bakelite (with methanal), salicylic acid and aspirin, picric acid, dyes, nylon intermediates.',
      m: [r`\ce{C6H5N2Cl + C6H5OH + NaOH -> HOC6H4N=NC6H5 + NaCl + H2O}`],
      v: table(['Test', 'Observation with phenol', 'With ethanol'], [['Neutral FeCl₃', 'Violet colour', 'No colour'], ['Bromine water', 'White precipitate', 'No change'], ['Benzenediazonium chloride (alkaline)', 'Orange dye', 'No dye'], ['NaOH(aq)', 'Dissolves', 'No reaction']], 'Table of tests distinguishing phenol from ethanol'),
      n: 'Several simple tests identify phenol. Neutral iron three chloride gives a violet colour. Bromine water gives a white precipitate. In alkaline solution, phenol couples with a cold diazonium salt to form an orange azo dye. Ethanol gives none of these results. Phenol is used to make disinfectants, Bakelite, aspirin and many dyes.',
    }),
    sl('check', 'Quick check: reactions and tests', {
      b: 'Predict a product of phenol or choose a test that distinguishes it from an alcohol.',
      n: 'Quick check. Recall bromine water, ferric chloride, the azo dye test and the named reactions.',
      chk: 'test-mcq',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Phenol from diazonium salts, chlorobenzene (Dow), benzenesulphonate fusion, cumene (with propanone).',
        'Acidic (pKa 10): phenoxide resonance; o/p-NO₂ increase, –CH₃/–OCH₃ decrease acidity; dissolves in NaOH, not NaHCO₃.',
        'NaOH, Na → phenoxide; Zn → benzene; CH₃COCl/(CH₃CO)₂O → phenyl ethanoate; PCl₅ poor.',
        'EAS: Br₂(aq) → tribromophenol; nitration; sulphonation; Kolbe → salicylic acid; Reimer–Tiemann → salicylaldehyde.',
        'Tests: FeCl₃ violet; azo dye orange; bromine water white ppt.',
      ],
      v: table(['Reaction', 'Product'], [['Kolbe', 'Salicylic acid'], ['Reimer–Tiemann', 'Salicylaldehyde'], ['Br₂(aq)', 'Tribromophenol']], 'Summary table of named reactions'),
      n: 'Let us sum up Part 1. Phenol is made from diazonium salts, chlorobenzene, benzenesulphonates and, industrially, from cumene. Resonance in the phenoxide ion makes phenol far more acidic than alcohols. The hydroxyl group activates the ring for ortho and para substitution, and the Kolbe and Reimer–Tiemann reactions add carboxyl and aldehyde groups. Phenol is identified with ferric chloride, bromine water and the azo dye test.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'For acidity, draw the phenoxide resonance structures.',
        'Specify solvent for bromination: water (tribromo) vs CS₂ (mono).',
        'Name the products of Kolbe and Reimer–Tiemann and state they are ortho.',
        'For tests, give reagent, observation for phenol and for the other compound.',
      ],
      v: table(['Slip', 'Fix'], [['Phenol dissolves in NaHCO₃', 'It does not'], ['Bromine water gives monobromophenol', 'Gives 2,4,6-tribromophenol'], ['Kolbe gives benzoic acid', 'Gives salicylic acid']], 'Table of three common slips in Part 1 and fixes'),
      n: 'Some tips. Draw the resonance structures of the phenoxide ion when explaining acidity. State the solvent in bromination. Name the products of the Kolbe and Reimer–Tiemann reactions correctly. And in distinguishing tests, describe what happens with both compounds.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Phenols and Ethers — Part 2: Ethers',
  goals: [
    'Describe the structure of the ether group and name ethers',
    'Choose reactants for Williamson’s synthesis of a given ether',
    'Write reactions of ethers with chlorine, oxygen, HI and PCl₅',
    'Write halogenation, nitration and Friedel–Crafts reactions of anisole, and state uses of ethers',
  ],
  slides: [
    sl('title', 'Ethers', {
      b: 'Part 2 — R–O–R′: structure, preparation, properties and reactions, including anisole.',
      v: flow('LR', [['a', 'Alkoxide or phenoxide'], ['b', '+ primary alkyl halide'], ['c', 'Ether (Williamson)'], ['d', 'Cleavage by HI; anisole substitution']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow of the main ideas about ethers'),
      n: 'Ethers contain an oxygen atom joined to two carbon groups. Diethyl ether was one of the first general anaesthetics and is still a common laboratory solvent, and anisole gives some perfumes their smell. In this part we look at the structure and names of ethers, how they are made, their physical properties and their reactions.',
    }),
    sl('diagram', 'Structure and nomenclature', {
      b: 'The ether oxygen is **sp³** with two lone pairs; the C–O–C angle (about 111.7° in methoxymethane) is larger than tetrahedral because the alkyl groups repel. Ethers are **symmetrical** (R–O–R) or **unsymmetrical** (R–O–R′). IUPAC: **alkoxyalkanes**, the larger group being the parent: CH₃OC₂H₅ methoxyethane; C₂H₅OC₂H₅ ethoxyethane; C₆H₅OCH₃ methoxybenzene (anisole).',
      v: V.angles,
      n: 'In an ether the oxygen atom is sp three hybridised with two lone pairs, like the oxygen in an alcohol, but the two bulky alkyl groups push each other apart, so the angle is about one hundred and twelve degrees. Ethers are named as alkoxy alkanes: the smaller group becomes the alkoxy prefix and the larger group is the parent. Diethyl ether is ethoxyethane and anisole is methoxybenzene.',
    }),
    sl('concept', 'Williamson’s synthesis', {
      b: 'An **alkoxide** (or phenoxide) reacts with a **primary alkyl halide** by **SN2**: R–O⁻Na⁺ + R′–X → R–O–R′ + NaX. With secondary and especially tertiary halides, the strongly basic alkoxide causes **elimination**, so the bulky group must be on the alkoxide. Aryl halides cannot be used (unreactive).',
      m: [r`\ce{CH3CH2ONa + CH3CH2CH2Br -> CH3CH2OCH2CH2CH3 + NaBr}`, r`\ce{(CH3)3CONa + CH3CH2Br -> (CH3)3COCH2CH3 + NaBr}`],
      v: table(['Target', 'Good choice', 'Poor choice (why)'], [['1-Ethoxypropane', 'C₂H₅ONa + 1-bromopropane', '—'], ['2-Ethoxy-2-methylpropane', '(CH₃)₃CONa + C₂H₅Br', '(CH₃)₃CBr + C₂H₅ONa (elimination)'], ['Ethoxybenzene', 'C₆H₅ONa + C₂H₅Br', 'C₆H₅Br + C₂H₅ONa (aryl halide inert)']], 'Table of Williamson choices'),
      n: 'Williamson’s synthesis is the most general way to make ethers. An alkoxide ion attacks a primary alkyl halide from the back and pushes out the halide. If the halide is tertiary, the alkoxide acts as a base instead and an alkene forms. So, to make an ether with a tertiary group, put the tertiary group on the alkoxide. For an aryl ether, use the phenoxide and an alkyl halide.',
    }),
    sl('example', 'Worked example: planning a Williamson synthesis', {
      b: r`**Problem.** Choose reactants for (a) 2-methoxypropane, (b) 2-ethoxy-2-methylbutane and (c) 1-methoxy-4-methylbenzene.

**(a)** Sodium propan-2-oxide + iodomethane: $\ce{(CH3)2CHONa + CH3I -> (CH3)2CHOCH3 + NaI}$.

**(b)** Sodium 2-methylbutan-2-oxide + bromoethane (the tertiary group on the alkoxide).

**(c)** Sodium 4-methylphenoxide + iodomethane.`,
      v: table(['Ether', 'Alkoxide/phenoxide', 'Halide'], [['2-Methoxypropane', '(CH₃)₂CHONa', 'CH₃I'], ['2-Ethoxy-2-methylbutane', 'CH₃CH₂C(CH₃)₂ONa', 'C₂H₅Br'], ['1-Methoxy-4-methylbenzene', 'CH₃C₆H₄ONa', 'CH₃I']], 'Table of reactants for Williamson syntheses'),
      n: 'Look at the two groups on oxygen and put the more hindered one on the alkoxide, leaving the halide as primary or methyl as possible. For two-methoxypropane, use sodium isopropoxide and iodomethane. For the tertiary ether, the tertiary group must be the alkoxide and bromoethane the halide. For an aryl methyl ether, use the sodium phenoxide and iodomethane.',
    }),
    sl('concept', 'Physical properties', {
      b: 'Ethers have **no O–H**, so they cannot hydrogen-bond with each other: b.p. close to alkanes of similar mass and much lower than alcohols. They can accept hydrogen bonds from water, so lower ethers are about as soluble in water as alcohols of similar size. Ethoxyethane is volatile, highly **flammable**, and a good **solvent** for organic compounds.',
      v: table(['Compound (M ≈ 72–74)', 'b.p. / K'], [['Pentane', '309'], ['Ethoxyethane', '308'], ['Butan-1-ol', '391']], 'Table of boiling points'),
      n: 'Ether molecules have no hydrogen on oxygen, so they cannot form hydrogen bonds with each other, and their boiling points are close to those of alkanes. But the ether oxygen can accept a hydrogen bond from water, so small ethers dissolve in water about as well as alcohols of similar size. Ethoxyethane is very volatile and catches fire easily, so it must be kept away from flames.',
    }),
    sl('check', 'Quick check: Williamson synthesis', {
      b: 'Choose the reactants for preparing an ether.',
      n: 'Quick check. The alkyl halide should be primary; any tertiary group belongs on the alkoxide.',
      chk: 'williamson-mcq',
    }),
    sl('concept', 'Reactions with chlorine, oxygen and PCl₅', {
      b: '**Chlorine:** in the dark, α-hydrogens are substituted (1-chloroethoxyethane); in light, all H are replaced (perchlorodiethyl ether). **Oxygen:** on standing in air and light, ethers form **peroxides**, which are explosive on distillation; they are detected with FeSO₄ + KSCN (red colour) and removed by shaking with acidified FeSO₄. **PCl₅:** splits ethers into two chloroalkanes.',
      m: [r`\ce{C2H5OC2H5 + Cl2 ->[dark] CH3CHClOC2H5 + HCl}`, r`\ce{C2H5OC2H5 + 10Cl2 ->[light] C2Cl5OC2Cl5 + 10HCl}`, r`\ce{C2H5OC2H5 + PCl5 ->[\Delta] 2C2H5Cl + POCl3}`],
      v: table(['Reagent', 'Product', 'Note'], [['Cl₂, dark', 'α-Chloroether', 'Substitution next to O'], ['Cl₂, light', 'Perchloroether', 'All H replaced'], ['O₂ (air, light)', 'Peroxide', 'Explosive; store in dark'], ['PCl₅, heat', '2 RCl + POCl₃', 'C–O cleavage']], 'Table of reactions of ethers with chlorine, oxygen and PCl₅'),
      n: 'Ethers are fairly unreactive, which is why they make good solvents, but they do have some reactions. Chlorine substitutes hydrogens next to the oxygen in the dark, and replaces all of them in light. On standing in air and light, ethers slowly form peroxides, which can explode when the ether is distilled, so old ether is tested and treated with iron two sulphate first. Phosphorus pentachloride splits ethers into chloroalkanes.',
    }),
    sl('concept', 'Cleavage by hydrogen iodide', {
      b: 'Cold HI (1 mol): R–O–R′ → R–I + R′–OH; the **smaller** alkyl group gives the iodide (SN2), but a **tertiary** group gives the iodide (SN1). Hot excess HI: both groups → alkyl iodides. **Aryl alkyl ethers** always give **phenol + alkyl iodide** (the Ar–O bond does not break).',
      m: [r`\ce{C2H5OC2H5 + HI ->[cold] C2H5I + C2H5OH}`, r`\ce{C2H5OC2H5 + 2HI ->[hot] 2C2H5I + H2O}`, r`\ce{C6H5OC2H5 + HI -> C6H5OH + C2H5I}`],
      v: table(['Ether', 'Products with 1 mol HI'], [['CH₃OCH₂CH₂CH₃', 'CH₃I + propan-1-ol'], ['(CH₃)₃COCH₃', '(CH₃)₃CI + CH₃OH'], ['C₆H₅OC₂H₅', 'C₆H₅OH + C₂H₅I']], 'Table of products of ether cleavage by HI'),
      n: 'Hydrogen iodide first protonates the ether oxygen. Then iodide attacks a carbon. With methyl and primary groups this is an S N two attack on the less hindered carbon, so the smaller group becomes the iodide. With a tertiary group, a stable carbocation forms and picks up iodide. With aryl ethers, the aryl–oxygen bond has partial double-bond character and never breaks, so phenol is always formed.',
    }),
    sl('example', 'Worked example: products of cleavage', {
      b: r`**Problem.** Give the products with one equivalent of HI: (a) 1-methoxybutane; (b) 2-ethoxy-2-methylpropane; (c) methoxybenzene; (d) ethoxyethane with excess hot HI.

**(a)** Iodomethane + butan-1-ol (SN2 at methyl).

**(b)** 2-Iodo-2-methylpropane + ethanol (SN1 at the tertiary carbon).

**(c)** Phenol + iodomethane.

**(d)** Iodoethane only (2 mol) + water.`,
      v: table(['Ether', 'Mechanism', 'Iodide formed'], [['1-Methoxybutane', 'SN2', 'CH₃I'], ['2-Ethoxy-2-methylpropane', 'SN1', '(CH₃)₃CI'], ['Methoxybenzene', 'SN2 at CH₃', 'CH₃I'], ['Ethoxyethane, hot excess', 'Both C–O break', '2 C₂H₅I']], 'Table of cleavage products'),
      n: 'Identify the two groups on oxygen. Methyl and primary groups react by S N two, so iodide attacks the methyl carbon and butan-one-ol is released. A tertiary group forms a carbocation, so it becomes two-iodo-two-methylpropane and ethanol is released. Methoxybenzene gives phenol and iodomethane. With hot excess hydrogen iodide, the ethanol formed is also converted, so only iodoethane remains.',
    }),
    sl('check', 'Quick check: cleavage by HI', {
      b: 'Predict the products of cleaving an ether with HI.',
      n: 'Quick check. Smaller group or tertiary group becomes the iodide; aryl ethers always give phenol.',
      chk: 'hi-mcq',
    }),
    sl('concept', 'Anisole: preparation and electrophilic substitution', {
      b: '**Preparation** (Williamson): sodium phenoxide + iodomethane (or dimethyl sulphate). The **–OCH₃** group activates the ring (+R) and directs **ortho/para**; para usually predominates.',
      m: [r`\ce{C6H5ONa + CH3I -> C6H5OCH3 + NaI}`, r`\ce{C6H5OCH3 + Br2 ->[CH3COOH] BrC6H4OCH3 + HBr}`, r`\ce{C6H5OCH3 + CH3COCl ->[AlCl3] CH3COC6H4OCH3 + HCl}`],
      v: table(['Reaction of anisole', 'Reagent', 'Major product'], [['Bromination', 'Br₂ in ethanoic acid (no catalyst)', '4-Bromoanisole'], ['Nitration', 'conc. HNO₃ + conc. H₂SO₄', '4-Nitroanisole (with 2-isomer)'], ['FC alkylation', 'CH₃Cl, anhydrous AlCl₃', '4-Methylanisole (with 2-isomer)'], ['FC acylation', 'CH₃COCl, anhydrous AlCl₃', '4-Methoxyacetophenone']], 'Table of electrophilic substitution of anisole'),
      n: 'Anisole is made by Williamson’s synthesis from sodium phenoxide and iodomethane. Its methoxy group pushes electrons into the ring, so anisole is more reactive than benzene and is substituted at ortho and para positions. Bromine reacts even without a catalyst, in ethanoic acid. Nitration and Friedel–Crafts alkylation and acylation give mainly the para products.',
    }),
    sl('example', 'Worked example: products from anisole', {
      b: r`**Problem.** Give the major product of anisole with (a) Br₂ in ethanoic acid; (b) conc. HNO₃/H₂SO₄; (c) CH₃COCl/AlCl₃; (d) excess HI. Why is para favoured over ortho in (a)–(c)?

**(a)** 1-Bromo-4-methoxybenzene. **(b)** 1-Methoxy-4-nitrobenzene. **(c)** 1-(4-Methoxyphenyl)ethan-1-one. **(d)** Phenol + iodomethane.

The –OCH₃ group hinders the adjacent ortho positions, so para substitution is preferred.`,
      v: table(['Reagent', 'Major product'], [['Br₂/CH₃COOH', '4-Bromoanisole'], ['HNO₃/H₂SO₄', '4-Nitroanisole'], ['CH₃COCl/AlCl₃', '4-Methoxyacetophenone'], ['HI', 'Phenol + CH₃I']], 'Table of anisole products'),
      n: 'All three electrophilic substitutions go mainly para to the methoxy group, because the methoxy group crowds the neighbouring ortho positions. Bromination gives four-bromoanisole, nitration four-nitroanisole and acylation four-methoxyacetophenone. Hydrogen iodide is different: it attacks the ether linkage itself and gives phenol and iodomethane.',
    }),
    sl('concept', 'Uses of ethers', {
      b: 'Ethoxyethane: solvent for oils, fats, resins and Grignard reactions; formerly a general anaesthetic. Methoxymethane: refrigerant and aerosol propellant. Anisole: perfumes and as an intermediate. Ethers in general: inert reaction media.',
      v: table(['Ether', 'Use'], [['Ethoxyethane', 'Solvent; Grignard reactions; early anaesthetic'], ['Methoxymethane', 'Refrigerant, propellant'], ['Anisole', 'Perfumes; synthesis intermediate']], 'Table of uses of ethers'),
      n: 'Ethoxyethane is an excellent solvent for fats, oils and resins, and it is the classic solvent for Grignard reactions because it is unreactive and dissolves the reagents. It was once used as a general anaesthetic. Methoxymethane is used as a refrigerant and aerosol propellant, and anisole is used in perfumes and as a starting material for other compounds.',
    }),
    sl('check', 'Quick check: anisole', {
      b: 'Predict a product of electrophilic substitution of anisole.',
      n: 'Quick check. The methoxy group activates the ring and directs ortho and para, mainly para.',
      chk: 'anisole-mcq',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'Ether O sp³, C–O–C ≈ 111.7°; alkoxyalkane names.',
        'Williamson: RONa + primary R′X (SN2); tertiary group on the alkoxide; aryl group on the phenoxide.',
        'B.p. like alkanes (no H-bonds between molecules); soluble like alcohols (accept H-bonds).',
        'Cl₂ (dark: α-substitution; light: perchloro); O₂ → explosive peroxides; PCl₅ → 2RCl.',
        'HI: smaller or tertiary group → iodide; aryl ethers → phenol + RI.',
        'Anisole: o/p activating; bromination, nitration, Friedel–Crafts give mainly para products.',
      ],
      v: table(['Ether', 'HI products'], [['CH₃OR (1°)', 'CH₃I + ROH'], ['R₃COCH₃', 'R₃CI + CH₃OH'], ['ArOR', 'ArOH + RI']], 'Summary table of HI cleavage'),
      n: 'Let us sum up Part 2. Ethers are made by Williamson’s synthesis from an alkoxide and a primary halide. They boil like alkanes but dissolve like alcohols. They react with chlorine, slowly form explosive peroxides in air, and are split by phosphorus pentachloride and hydrogen iodide, with predictable products. Anisole is activated towards ortho and para substitution.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'In Williamson questions, explain why the halide must be primary.',
        'For HI cleavage, state the mechanism (SN1 or SN2) behind your choice.',
        'Mention peroxide hazards when asked about storing or distilling ethers.',
        'Anisole bromination needs no Lewis acid.',
      ],
      v: table(['Slip', 'Fix'], [['(CH₃)₃CBr + CH₃ONa for tert-butyl methyl ether', 'Gives alkene; use (CH₃)₃CONa + CH₃Br'], ['Anisole + HI → iodobenzene', 'Gives phenol + CH₃I'], ['Ethers H-bond with each other', 'No O–H; they cannot']], 'Table of three common slips in Part 2 and fixes'),
      n: 'Final tips. In Williamson questions, explain why the halide should be primary. In cleavage questions, give the mechanism that decides which group becomes the iodide. Mention peroxides when asked about the hazards of ethers. And remember that anisole is so reactive that bromination needs no catalyst.',
    }),
  ],
});
