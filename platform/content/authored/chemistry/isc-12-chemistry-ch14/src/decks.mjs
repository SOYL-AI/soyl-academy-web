// ISC 12 Chemistry ch14 Alcohols — two decks: Part 1 (t01–t03) classification, structure, nomenclature,
// preparation (alkenes, Grignard, alkyl halides, carbonyl reduction, primary amines), manufacture of methanol and
// ethanol, physical properties; Part 2 (t04–t06) acidity, reactions, esterification and dehydration mechanisms,
// oxidation, ascent and descent of the series, Lucas test and uses.
import { sl, deck, table, flow, svgV, r } from './lib.mjs';
import { ANGLES, HBOND } from './svgs.mjs';

export const V = {
  angles: svgV(ANGLES, 'Bent shapes of methanol, with a C–O–H angle of about 108.9 degrees, and methoxymethane, with a C–O–C angle of about 111.7 degrees'),
  hbond: svgV(HBOND, 'Alcohol molecules joined in a chain by hydrogen bonds between the O–H hydrogen of one molecule and the oxygen of the next'),
};

export const deck1 = deck({
  part: 1,
  title: 'Alcohols — Part 1: Classification, preparation and physical properties',
  goals: [
    'Classify and name alcohols and compare 1°, 2° and 3° alcohols',
    'Write equations to prepare alcohols from alkenes, Grignard reagents, alkyl halides, carbonyl compounds and primary amines',
    'Outline the manufacture of methanol and ethanol',
    'Explain the boiling points and solubility of alcohols',
  ],
  slides: [
    sl('title', 'Alcohols', {
      b: 'Part 1 — compounds with an –OH group on an sp³ carbon: names, preparation and physical properties.',
      v: table(['Alcohol', 'Where you meet it'], [['Ethanol', 'Hand sanitiser, fuel blended with petrol'], ['Methanol', 'Solvent; poisonous'], ['Propan-2-ol', 'Rubbing alcohol'], ['Ethane-1,2-diol', 'Antifreeze in car radiators'], ['Propane-1,2,3-triol (glycerol)', 'Soaps, cosmetics']], 'Table of familiar alcohols'),
      n: 'Namaste! The sanitiser on your hands, the antifreeze in a car radiator and the glycerol in soap are all alcohols, compounds in which a hydroxyl group is attached to an sp three carbon. In this part we classify and name alcohols, learn several ways to make them, outline how methanol and ethanol are produced industrially, and see how hydrogen bonding controls their physical properties.',
    }),
    sl('concept', 'Classification and general formula', {
      b: 'By the number of –OH groups: **monohydric** (CₙH₂ₙ₊₁OH), **dihydric** (glycols), **trihydric** (glycerol). Monohydric alcohols are **primary**, **secondary** or **tertiary** according to the carbon bearing –OH.',
      v: table(['Class', 'Group', 'Example'], [['Primary (1°)', '–CH₂OH', 'Butan-1-ol, CH₃CH₂CH₂CH₂OH'], ['Secondary (2°)', '>CHOH', 'Butan-2-ol, CH₃CH₂CH(OH)CH₃'], ['Tertiary (3°)', '≡C–OH', '2-Methylpropan-2-ol, (CH₃)₃COH'], ['Dihydric', 'Two –OH', 'Ethane-1,2-diol'], ['Trihydric', 'Three –OH', 'Propane-1,2,3-triol']], 'Table classifying alcohols'),
      n: 'Monohydric alcohols have one hydroxyl group and the general formula C n H two n plus one O H. Dihydric alcohols, or glycols, have two, and trihydric alcohols such as glycerol have three. Like haloalkanes, monohydric alcohols are primary, secondary or tertiary depending on how many carbons are bonded to the carbon carrying the hydroxyl group. The four butanol isomers show all three classes.',
    }),
    sl('concept', 'Nomenclature', {
      b: 'IUPAC: longest chain containing the C–OH; replace **-e** of the alkane by **-ol**; lowest locant to –OH. Diols and triols keep the **-e** (ethane-1,2-diol). Common names: alkyl + alcohol.',
      v: table(['Structure', 'Common name', 'IUPAC name'], [['CH₃OH', 'Methyl alcohol (wood spirit)', 'Methanol'], ['CH₃CH₂CH₂OH', 'n-Propyl alcohol', 'Propan-1-ol'], ['(CH₃)₂CHCH₂OH', 'Isobutyl alcohol', '2-Methylpropan-1-ol'], ['CH₃CH₂CH(OH)CH₃', 'sec-Butyl alcohol', 'Butan-2-ol'], ['(CH₃)₃COH', 'tert-Butyl alcohol', '2-Methylpropan-2-ol'], ['HOCH₂CH₂OH', 'Ethylene glycol', 'Ethane-1,2-diol']], 'Table of common and IUPAC names of alcohols'),
      n: 'To name an alcohol, find the longest chain containing the carbon with the hydroxyl group, number it to give that carbon the lowest number, and change the ending e of the alkane to ol. So isobutyl alcohol is two-methylpropan-one-ol and tert-butyl alcohol is two-methylpropan-two-ol. For diols the e is kept: ethylene glycol is ethane-one-two-diol.',
    }),
    sl('diagram', 'Structure of the –OH group', {
      b: 'Oxygen is **sp³** hybridised with two lone pairs; the C–O–H angle in methanol (108.9°) is slightly less than tetrahedral because lone pairs repel more than bond pairs. The O–H bond is polar: H is δ+ and O is δ−.',
      v: V.angles,
      n: 'In an alcohol the oxygen atom is sp three hybridised. Two of its hybrid orbitals form the bonds to carbon and hydrogen; the other two hold lone pairs. The lone pairs push the bonds slightly closer, so the carbon–oxygen–hydrogen angle is about one hundred and nine degrees, a little less than the tetrahedral value. The very polar O–H bond is the key to hydrogen bonding.',
    }),
    sl('example', 'Worked example: naming and classifying', {
      b: r`**Problem.** Name and classify: (a) $\ce{CH3CH2CH(CH3)CH2OH}$; (b) $\ce{(CH3)2CHCH(OH)CH3}$; (c) $\ce{CH3CH2C(OH)(CH3)CH2CH3}$; (d) $\ce{HOCH2CH(OH)CH3}$.

**(a)** 2-Methylbutan-1-ol — primary.

**(b)** 3-Methylbutan-2-ol — secondary.

**(c)** 3-Methylpentan-3-ol — tertiary.

**(d)** Propane-1,2-diol — dihydric.`,
      v: flow('LR', [['a', 'Longest chain with C–OH'], ['b', 'Lowest locant to –OH'], ['c', 'Alkan-n-ol'], ['d', 'Count C neighbours of C–OH']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow for naming and classifying an alcohol'),
      n: 'Number from the end nearer the hydroxyl group. In the first example the hydroxyl carbon is at the end of the chain with one carbon neighbour, so it is primary. In the second it has two carbon neighbours: secondary. In the third, the hydroxyl carbon has three ethyl or methyl groups: tertiary. The last has two hydroxyl groups, so it is a diol.',
    }),
    sl('check', 'Quick check: classification', {
      b: 'Classify or name an alcohol.',
      n: 'Quick check. Count carbons attached to the carbon bearing the hydroxyl group.',
      chk: 'classify-mcq',
    }),
    sl('concept', 'Preparation from alkenes', {
      b: '**Direct hydration:** H₂O with H⁺ catalyst (Markovnikov). **Indirect hydration:** absorb the alkene in cold conc. H₂SO₄ to give an alkyl hydrogen sulphate, then boil with water. **Hydroboration–oxidation:** B₂H₆, then H₂O₂/OH⁻ — **anti-Markovnikov**, giving 1° alcohols from terminal alkenes.',
      m: [r`\ce{CH2=CH2 + H2SO4 -> CH3CH2OSO3H}`, r`\ce{CH3CH2OSO3H + H2O ->[\Delta] CH3CH2OH + H2SO4}`, r`\ce{CH3CH2CH=CH2 ->[(i) B2H6][(ii) H2O2/OH-] CH3CH2CH2CH2OH}`],
      v: table(['Alkene', 'Method', 'Product'], [['But-1-ene', 'H₂O/H⁺ or H₂SO₄ then H₂O', 'Butan-2-ol'], ['But-1-ene', 'B₂H₆; H₂O₂/OH⁻', 'Butan-1-ol'], ['2-Methylpropene', 'H₂O/H⁺', '2-Methylpropan-2-ol']], 'Table of alcohols from alkenes'),
      n: 'Water can be added across a double bond in three ways. Direct hydration with an acid catalyst and indirect hydration through an alkyl hydrogen sulphate both follow Markovnikov’s rule, putting the hydroxyl group on the more substituted carbon. Hydroboration followed by oxidation with alkaline hydrogen peroxide does the reverse, putting the hydroxyl group on the end carbon: but-one-ene gives butan-one-ol.',
    }),
    sl('concept', 'Other preparations', {
      b: '**Hydrolysis of alkyl halides:** aqueous NaOH/KOH or moist Ag₂O. **Reduction of carbonyl compounds:** aldehydes → 1°, ketones → 2° (H₂/Ni, NaBH₄, LiAlH₄). **Primary amines with nitrous acid** (NaNO₂ + HCl): R–NH₂ → R–OH + N₂. **Grignard reagents:** HCHO → 1°; RCHO → 2°; R₂CO → 3°, after hydrolysis.',
      m: [r`\ce{CH3CH2CH2Br + KOH(aq) -> CH3CH2CH2OH + KBr}`, r`\ce{CH3CH2NH2 + HNO2 -> CH3CH2OH + N2 + H2O}`, r`\ce{CH3CH2CHO + H2 ->[Ni] CH3CH2CH2OH}`],
      v: table(['Grignard + carbonyl', 'Alcohol after hydrolysis'], [['RMgX + HCHO', '1°, RCH₂OH'], ['RMgX + R′CHO', '2°, RR′CHOH'], ['RMgX + R′COR″', '3°, RR′R″COH']], 'Table of Grignard routes to alcohols'),
      n: 'Alcohols also come from alkyl halides boiled with aqueous alkali, from aldehydes and ketones by reduction, and from primary amines treated with nitrous acid, which releases nitrogen gas. Grignard reagents are especially useful because they build a new carbon–carbon bond: methanal gives primary alcohols, other aldehydes give secondary alcohols and ketones give tertiary alcohols.',
    }),
    sl('example', 'Worked example: Grignard planning', {
      b: r`**Problem.** Choose a Grignard reagent and a carbonyl compound to make (a) ethanol, (b) propan-2-ol and (c) 2-methylbutan-2-ol.

**(a)** $\ce{CH3MgI}$ + methanal → $\ce{CH3CH2OH}$ (1°).

**(b)** $\ce{CH3MgI}$ + ethanal → $\ce{CH3CH(OH)CH3}$ (2°).

**(c)** $\ce{CH3CH2MgBr}$ + propanone → $\ce{CH3CH2C(OH)(CH3)2}$ (3°) (or $\ce{CH3MgI}$ + butanone).

Each adduct is hydrolysed with dilute acid.`,
      v: flow('LR', [['a', 'Target alcohol'], ['b', 'Cut one C–C bond at the carbinol carbon'], ['c', 'Cut piece → RMgX'], ['d', 'Rest → carbonyl compound']], [['a', 'b'], ['b', 'c'], ['b', 'd']], 'Flow for planning a Grignard synthesis'),
      n: 'Work backwards from the target. Look at the carbon carrying the hydroxyl group and cut one of its carbon–carbon bonds: the piece cut off becomes the Grignard reagent, and the rest, with the hydroxyl turned into a carbonyl group, is the carbonyl compound. For two-methylbutan-two-ol, cutting off the ethyl group leaves propanone, so ethylmagnesium bromide and propanone are needed.',
    }),
    sl('check', 'Quick check: preparation', {
      b: 'Choose a method or predict the alcohol formed.',
      n: 'Quick check. Remember which methods follow Markovnikov’s rule and which carbonyl compounds give which class of alcohol.',
      chk: 'prep-mcq',
    }),
    sl('concept', 'Manufacture of methanol and ethanol (outline)', {
      b: '**Methanol (Bosch process):** water gas (CO + H₂) from steam over hot coke, enriched with H₂, is passed over ZnO–Cr₂O₃ at about 573–673 K and 200–300 atm. **Ethanol (fermentation):** molasses (sucrose) or starch is fermented by yeast; invertase converts sucrose to glucose and fructose, zymase converts these to ethanol and CO₂ (about 8–10% ethanol).',
      m: [r`\ce{C + H2O ->[1273 K] CO + H2}`, r`\ce{CO + 2H2 ->[ZnO-Cr2O3][573-673 K] CH3OH}`, r`\ce{C12H22O11 + H2O ->[invertase] C6H12O6 + C6H12O6}`, r`\ce{C6H12O6 ->[zymase] 2C2H5OH + 2CO2}`],
      v: table(['Alcohol', 'Raw material', 'Catalyst'], [['Methanol', 'Water gas (CO + H₂)', 'ZnO–Cr₂O₃'], ['Ethanol', 'Molasses or starch', 'Yeast enzymes (invertase, zymase)']], 'Table outlining industrial manufacture of methanol and ethanol'),
      n: 'Methanol is made from water gas, a mixture of carbon monoxide and hydrogen obtained by passing steam over red-hot coke. Extra hydrogen is added and the mixture is passed over zinc oxide and chromium three oxide at high temperature and pressure. Ethanol is made by fermentation: yeast enzymes convert the sucrose in molasses first into glucose and fructose, and then into ethanol and carbon dioxide.',
    }),
    sl('diagram', 'Physical properties: hydrogen bonding', {
      b: 'Alcohols are **associated by hydrogen bonds**, so they boil much higher than alkanes, ethers or haloalkanes of similar mass. B.p. rises with chain length and falls with branching (1° > 2° > 3° isomers). Lower alcohols are **miscible with water** (hydrogen bonding with water); solubility falls as the alkyl group grows.',
      v: V.hbond,
      n: 'Each hydroxyl hydrogen is attracted to a lone pair on the oxygen of a neighbouring molecule. These hydrogen bonds must be broken when the alcohol boils, so alcohols boil far higher than hydrocarbons of similar mass. Methanol, ethanol and propanol mix with water in all proportions because they hydrogen-bond with water, but solubility falls as the hydrocarbon part becomes larger.',
    }),
    sl('example', 'Worked example: boiling points', {
      b: r`**Problem.** Arrange in increasing boiling point and explain: butan-1-ol, 2-methylpropan-2-ol, pentane, ethoxyethane (all $M \approx 72\text{–}74$).

**Step 1.** Pentane (309 K) and ethoxyethane (308 K): no O–H, no hydrogen bonding between molecules.

**Step 2.** The alcohols hydrogen-bond; branching lowers b.p.: 2-methylpropan-2-ol (356 K) < butan-1-ol (391 K).

**Order:** ethoxyethane ≈ pentane < 2-methylpropan-2-ol < butan-1-ol.`,
      v: table(['Compound', 'b.p. / K', 'Main attraction'], [['Ethoxyethane', '308', 'Dipole–dipole'], ['Pentane', '309', 'Dispersion'], ['2-Methylpropan-2-ol', '356', 'H-bonds (branched)'], ['Butan-1-ol', '391', 'H-bonds (unbranched)']], 'Table of boiling points of compounds of similar molar mass'),
      n: 'All four have similar molar masses. Ethoxyethane and pentane cannot form hydrogen bonds between their molecules, so they boil lowest, near three hundred and eight kelvin. Both alcohols hydrogen-bond, so they boil much higher. Between them, the compact, branched two-methylpropan-two-ol has a smaller contact area than straight-chain butan-one-ol, so it boils lower.',
    }),
    sl('check', 'Quick check: physical properties', {
      b: 'Compare boiling points or solubilities of alcohols.',
      n: 'Quick check. Think of hydrogen bonding first, then chain length and branching.',
      chk: 'bp-mcq',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Mono-, di-, trihydric; 1°, 2°, 3°; IUPAC alkan-n-ol.',
        'O sp³; C–O–H ≈ 108.9°; polar O–H.',
        'From alkenes (direct/indirect hydration: Markovnikov; hydroboration–oxidation: anti-Markovnikov), RX + aq. KOH, carbonyl reduction, RNH₂ + HNO₂, Grignard + HCHO/RCHO/R₂CO.',
        'Methanol: CO + 2H₂ over ZnO–Cr₂O₃; ethanol: fermentation (invertase, zymase).',
        'H-bonding: high b.p., water solubility of lower members; branching lowers b.p.',
      ],
      v: table(['Carbonyl + RMgX', 'Alcohol'], [['HCHO', '1°'], ['RCHO', '2°'], ['R₂CO', '3°']], 'Summary table of Grignard routes'),
      n: 'Let us sum up Part 1. Alcohols are classified by the number of hydroxyl groups and by the carbon carrying them, and named with the ending ol. They are made from alkenes, alkyl halides, carbonyl compounds, primary amines and Grignard reagents. Methanol comes from water gas and ethanol from fermentation. Hydrogen bonding gives alcohols high boiling points and makes the smaller ones soluble in water.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'State Markovnikov or anti-Markovnikov for each alkene method.',
        'In Grignard questions, name both the reagent and the carbonyl compound, and mention hydrolysis.',
        'Give enzymes by name in fermentation equations.',
        'Explain b.p. differences with hydrogen bonding and branching.',
      ],
      v: table(['Slip', 'Fix'], [['Hydroboration gives 2° alcohol from alk-1-ene', 'Gives 1° alcohol'], ['HCHO + RMgX gives 2° alcohol', 'Gives 1° alcohol'], ['Ethers boil like alcohols', 'Much lower (no H-bonds)']], 'Table of three common slips in Part 1 and fixes'),
      n: 'Some tips. For each alkene method, say whether it is Markovnikov or anti-Markovnikov. In Grignard questions, name both reactants and remember the hydrolysis step. Name the enzymes in fermentation. And explain boiling points with hydrogen bonding first, then branching.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Alcohols — Part 2: Acidity, reactions, mechanisms and tests',
  goals: [
    'Explain why alcohols are weaker acids than water',
    'Write reactions of alcohols with Na, HX, PCl₃, PCl₅, SOCl₂, acid chlorides and anhydrides; draw the esterification mechanism',
    'Predict oxidation products and draw the dehydration mechanism of ethanol',
    'Convert one alcohol into another and use the Lucas test',
  ],
  slides: [
    sl('title', 'Reactions of alcohols', {
      b: 'Part 2 — reactions breaking the O–H bond, reactions breaking the C–O bond, oxidation, and tests.',
      v: flow('LR', [['a', 'R–O–H'], ['b', 'O–H breaks: Na, esterification, acylation'], ['c', 'C–O breaks: HX, PX₃, PCl₅, SOCl₂, dehydration'], ['d', 'Oxidation at the carbinol carbon']], [['a', 'b'], ['a', 'c'], ['a', 'd']], 'Flow classifying reactions of alcohols'),
      n: 'Alcohol reactions fall into groups. Some break the oxygen–hydrogen bond, as with sodium and in ester formation. Others break the carbon–oxygen bond, as with hydrogen halides, phosphorus halides and thionyl chloride, or in dehydration. A third group oxidises the carbon carrying the hydroxyl group. In this part we study these, with the mechanisms of esterification and dehydration.',
    }),
    sl('concept', 'Acidic nature', {
      b: 'Alcohols react with active metals (Na, K) to give **alkoxides** and H₂, showing weak acidity. They are **weaker acids than water** because the alkyl group (+I) pushes electron density towards O, destabilising the alkoxide ion; alkoxides are strong bases. Acidity: CH₃OH > 1° > 2° > 3°.',
      m: [r`\ce{2CH3CH2CH2OH + 2Na -> 2CH3CH2CH2ONa + H2}`, r`\ce{CH3CH2O- + H2O -> CH3CH2OH + OH-}`],
      v: table(['Compound', 'pKa (approx.)'], [['Water', '15.7'], ['Methanol', '15.5'], ['Ethanol', '15.9'], ['2-Methylpropan-2-ol', '18']], 'Table of pKa values of water and alcohols'),
      n: 'Sodium reacts with alcohols, releasing hydrogen and forming an alkoxide, so alcohols are weak acids. They are weaker even than water, because the alkyl group pushes electrons towards oxygen and makes the alkoxide ion less stable. That is why an alkoxide added to water takes a proton from it and gives back the alcohol and hydroxide. Bulkier alkyl groups make alcohols weaker acids still.',
    }),
    sl('concept', 'Replacement of –OH by halogen', {
      b: 'The C–O bond breaks. Reactivity with HX: **HI > HBr > HCl**; 3° > 2° > 1° (via carbocations). PCl₃, PCl₅ and SOCl₂ (best, gaseous by-products) also convert ROH to RCl.',
      m: [r`\ce{CH3CH2OH + HBr -> CH3CH2Br + H2O}`, r`\ce{3CH3CH2OH + PCl3 -> 3CH3CH2Cl + H3PO3}`, r`\ce{CH3CH2OH + PCl5 -> CH3CH2Cl + POCl3 + HCl}`, r`\ce{CH3CH2OH + SOCl2 -> CH3CH2Cl + SO2 + HCl}`],
      v: table(['Reagent', 'By-products'], [['HX', 'H₂O'], ['PCl₃', 'H₃PO₃'], ['PCl₅', 'POCl₃, HCl (white fumes)'], ['SOCl₂', 'SO₂, HCl (gases)']], 'Table of halogenating reagents and their by-products'),
      n: 'Hydrogen halides replace the hydroxyl group by a halogen; hydrogen iodide reacts fastest and hydrogen chloride needs zinc chloride. Phosphorus trichloride and pentachloride also work; the white fumes of hydrogen chloride given off with phosphorus pentachloride are a test for a hydroxyl group. Thionyl chloride is best for a pure product, because both by-products are gases.',
    }),
    sl('concept', 'Esterification and acylation', {
      b: 'With a **carboxylic acid** and conc. H₂SO₄ (reversible) or with an **acid chloride** or **anhydride** (fast; pyridine removes HCl), the O–H hydrogen of the alcohol is replaced by an acyl group: an **ester** forms.',
      m: [r`\ce{CH3COOH + CH3CH2CH2OH <=>[H+] CH3COOCH2CH2CH3 + H2O}`, r`\ce{CH3COCl + C2H5OH ->[pyridine] CH3COOC2H5 + HCl}`, r`\ce{(CH3CO)2O + C2H5OH -> CH3COOC2H5 + CH3COOH}`],
      v: table(['Acylating agent', 'By-product', 'Reversible?'], [['Carboxylic acid + H⁺', 'H₂O', 'Yes'], ['Acid chloride', 'HCl', 'No'], ['Acid anhydride', 'Carboxylic acid', 'No']], 'Table of acylating agents'),
      n: 'Alcohols react with carboxylic acids in the presence of concentrated sulphuric acid to form esters with fruity smells. The reaction is reversible, so water is removed or one reactant is used in excess. Acid chlorides and anhydrides react faster and completely; pyridine is added with acid chlorides to remove the hydrogen chloride formed.',
    }),
    sl('concept', 'Mechanism of acid-catalysed esterification', {
      b: '(1) H⁺ **protonates the C=O oxygen** of the acid, making the carbon more electrophilic. (2) The alcohol oxygen **attacks** the carbonyl carbon (nucleophilic addition). (3) **Proton transfer** to an –OH group. (4) **Loss of water**. (5) **Loss of H⁺** gives the ester. Isotope labelling (¹⁸O in the alcohol) shows the ester oxygen comes from the **alcohol**: the acid loses –OH, the alcohol loses H.',
      v: flow('LR', [['a', 'Protonate C=O of acid'], ['b', 'R′OH attacks carbonyl C'], ['c', 'Proton transfer'], ['d', 'Lose H₂O'], ['e', 'Lose H⁺ → ester']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']], 'Flow of the esterification mechanism'),
      n: 'The acid catalyst first adds a proton to the carbonyl oxygen of the carboxylic acid, making its carbon more positive. The alcohol’s oxygen lone pair then attacks this carbon. After a proton moves onto one of the hydroxyl groups, water leaves, and finally a proton is lost to give the ester. Experiments with heavy oxygen in the alcohol show that it ends up in the ester, so the water comes from the acid.',
    }),
    sl('example', 'Worked example: esters from alcohols', {
      b: r`**Problem.** Name the ester formed in each case: (a) propan-1-ol + ethanoic acid (H⁺); (b) methanol + ethanoyl chloride; (c) ethanol + ethanoic anhydride. If ethanol labelled with ¹⁸O reacts with ethanoic acid, where is the ¹⁸O found?

**(a)** Propyl ethanoate. **(b)** Methyl ethanoate. **(c)** Ethyl ethanoate (+ ethanoic acid).

**Label:** in the ester, $\ce{CH3CO-^{18}O-C2H5}$; the water formed contains ordinary oxygen.`,
      v: table(['Alcohol', 'Acylating agent', 'Ester'], [['Propan-1-ol', 'CH₃COOH/H⁺', 'Propyl ethanoate'], ['Methanol', 'CH₃COCl', 'Methyl ethanoate'], ['Ethanol', '(CH₃CO)₂O', 'Ethyl ethanoate']], 'Table of esters formed'),
      n: 'Name an ester by giving the alkyl group from the alcohol first, then the acid part ending in oate. Propan-one-ol and ethanoic acid give propyl ethanoate; methanol and ethanoyl chloride give methyl ethanoate. With labelled oxygen in ethanol, the label ends up in the ester, because the alcohol supplies the oxygen that links the two parts, and the acid supplies the hydroxyl that leaves as water.',
    }),
    sl('check', 'Quick check: acidity and esterification', {
      b: 'Answer a question on the acidity of alcohols or on ester formation.',
      n: 'Quick check. Remember the effect of alkyl groups on alkoxide stability, and which bond breaks in esterification.',
      chk: 'acid-mcq',
    }),
    sl('concept', 'Oxidation of alcohols', {
      b: '**1° alcohols** → aldehydes (PCC, or Cu at 573 K) → carboxylic acids (acidified K₂Cr₂O₇ or KMnO₄). **2° alcohols** → ketones. **3° alcohols** resist mild oxidation; over hot Cu they dehydrate to alkenes. With acidified dichromate, 1° and 2° alcohols turn the solution from orange to green.',
      m: [r`\ce{CH3CH2CH2OH ->[Cu][573 K] CH3CH2CHO + H2}`, r`\ce{3CH3CH2OH + 2Cr2O7^2- + 16H+ -> 3CH3COOH + 4Cr^3+ + 11H2O}`],
      v: table(['Alcohol', 'Acidified K₂Cr₂O₇', 'Cu, 573 K'], [['1°', 'Aldehyde → acid', 'Aldehyde'], ['2°', 'Ketone', 'Ketone'], ['3°', 'No reaction (mild)', 'Alkene']], 'Table of oxidation products'),
      n: 'Oxidation removes hydrogen from the oxygen and from the carbon carrying it. A primary alcohol gives an aldehyde, and with excess strong oxidant goes on to a carboxylic acid. A secondary alcohol gives a ketone. A tertiary alcohol has no hydrogen on that carbon, so it resists mild oxidation; over hot copper it loses water instead and gives an alkene. These differences help identify the class of alcohol.',
    }),
    sl('concept', 'Dehydration: conditions and mechanism', {
      b: r`Ethanol with conc. H₂SO₄: **443 K → ethene**; **413 K** (excess alcohol) → ethoxyethane. Ease: 3° > 2° > 1°. **Mechanism:** (1) protonation of –OH: $\ce{CH3CH2OH + H+ -> CH3CH2OH2+}$; (2) loss of water to a carbocation: $\ce{CH3CH2OH2+ -> CH3CH2+ + H2O}$ (slow); (3) loss of H⁺ from the adjacent carbon: $\ce{CH3CH2+ -> CH2=CH2 + H+}$.`,
      m: [r`\ce{C2H5OH ->[conc. H2SO4][443 K] CH2=CH2 + H2O}`, r`\ce{2C2H5OH ->[conc. H2SO4][413 K] C2H5OC2H5 + H2O}`],
      v: flow('LR', [['a', 'Protonated alcohol'], ['b', 'Carbocation + H₂O (slow)'], ['c', 'Loss of β-H⁺ → alkene']], [['a', 'b'], ['b', 'c']], 'Flow of the dehydration mechanism'),
      n: 'Concentrated sulphuric acid removes water from alcohols. With ethanol at four hundred and forty three kelvin, ethene forms; at four hundred and thirteen kelvin with excess ethanol, two molecules combine to give ethoxyethane. The acid first protonates the hydroxyl group, turning it into a good leaving group. Water leaves to give a carbocation, and a hydrogen ion is lost from the next carbon, forming the double bond. Tertiary alcohols dehydrate most easily.',
    }),
    sl('check', 'Quick check: oxidation and dehydration', {
      b: 'Predict the product of oxidising or dehydrating an alcohol.',
      n: 'Quick check. Count hydrogens on the carbinol carbon for oxidation; check the temperature for dehydration.',
      chk: 'oxid-mcq',
    }),
    sl('concept', 'Converting one alcohol into another', {
      b: '**Ascent** (add one carbon): ROH → RCl (SOCl₂) → RMgCl (Mg, ether) → + HCHO, then H₃O⁺ → RCH₂OH. **Descent** (remove one carbon): RCH₂OH → RCOOH (K₂Cr₂O₇/H⁺) → RCONH₂ (NH₃, heat) → RNH₂ (Br₂ + KOH, Hofmann) → ROH (HNO₂).',
      v: table(['Change', 'Sequence'], [['Methanol → ethanol', 'CH₃OH → CH₃Cl → CH₃MgCl → (HCHO, H₃O⁺) CH₃CH₂OH'], ['Ethanol → methanol', 'C₂H₅OH → CH₃COOH → CH₃CONH₂ → CH₃NH₂ → CH₃OH']], 'Table of ascent and descent sequences'),
      n: 'To go up the series by one carbon, turn the alcohol into a chloroalkane, make the Grignard reagent, and add methanal: hydrolysis gives the next higher primary alcohol. To go down, oxidise the alcohol to a carboxylic acid, convert it into an amide with ammonia, use the Hofmann bromamide reaction to lose one carbon as the amine, and treat the amine with nitrous acid to get the alcohol with one carbon fewer.',
    }),
    sl('example', 'Worked example: ascent and descent', {
      b: r`**Problem.** (a) Convert ethanol into propan-1-ol. (b) Convert propan-1-ol into ethanol.

**(a)** $\ce{C2H5OH ->[SOCl2] C2H5Cl ->[Mg][dry ether] C2H5MgCl}$; + HCHO, then $\ce{H3O+}$ → $\ce{CH3CH2CH2OH}$.

**(b)** (skeletal scheme, reagents over the arrows) $\ce{CH3CH2CH2OH ->[K2Cr2O7/H+] CH3CH2COOH ->[NH3][\Delta] CH3CH2CONH2 ->[Br2/KOH] CH3CH2NH2 ->[HNO2] CH3CH2OH}$.`,
      v: table(['Step', 'Ascent (a)', 'Descent (b)'], [['1', 'Chloroethane', 'Propanoic acid'], ['2', 'Ethylmagnesium chloride', 'Propanamide'], ['3', 'Adduct with HCHO', 'Ethanamine'], ['4', 'Propan-1-ol', 'Ethanol']], 'Table of intermediates in ascent and descent'),
      n: 'For the ascent, ethanol becomes chloroethane, then ethylmagnesium chloride; adding methanal and hydrolysing gives propan-one-ol, one carbon longer. For the descent, propan-one-ol is oxidised to propanoic acid, converted into propanamide, and the Hofmann reaction removes one carbon to give ethanamine. Nitrous acid then converts ethanamine into ethanol.',
    }),
    sl('concept', 'Lucas test; uses of methanol and ethanol', {
      b: '**Lucas reagent** (conc. HCl + anhydrous ZnCl₂) at room temperature: **3°** turbid at once; **2°** in about 5 minutes; **1°** no turbidity (only on heating) — the insoluble chloroalkane forms fastest from the most stable carbocation.',
      v: table(['Alcohol', 'Uses', 'Hazard'], [['Methanol', 'Solvent; making methanal; fuel; denaturing ethanol', 'Poisonous: blindness, death'], ['Ethanol', 'Solvent, sanitisers, medicines, beverages, fuel (blended with petrol)', 'Intoxicating; denatured for industry']], 'Table of uses of methanol and ethanol'),
      n: 'The Lucas test distinguishes the three classes. Shake the alcohol with concentrated hydrochloric acid and zinc chloride at room temperature. A tertiary alcohol turns cloudy immediately as the insoluble chloroalkane separates; a secondary one in about five minutes; a primary one stays clear. Methanol is a useful solvent and fuel but is very poisonous, while ethanol is used in medicines, sanitisers and as a petrol additive.',
    }),
    sl('check', 'Quick check: Lucas test and conversions', {
      b: 'Use the Lucas test or plan an ascent or descent.',
      n: 'Quick check. Tertiary alcohols react fastest with Lucas reagent; Grignard plus methanal adds one carbon.',
      chk: 'lucas-mcq',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'Alcohols weaker acids than water (+I); 2ROH + 2Na → 2RONa + H₂.',
        'C–O cleavage: HX (HI > HBr > HCl), PCl₃, PCl₅, SOCl₂.',
        'Esterification: H⁺-catalysed, reversible; mechanism via protonated acid; ester O from alcohol.',
        'Oxidation: 1° → aldehyde → acid; 2° → ketone; 3° resist; Cu at 573 K.',
        'Dehydration: 443 K ethene, 413 K ether; protonation → carbocation → loss of H⁺.',
        'Ascent via Grignard + HCHO; descent via acid → amide → amine (Hofmann) → alcohol; Lucas test 3° > 2° > 1°.',
      ],
      v: table(['Test or reaction', 'Observation'], [['Na', 'H₂ evolved'], ['PCl₅', 'White fumes of HCl'], ['Lucas (3°)', 'Turbid at once'], ['Acidified K₂Cr₂O₇ (1°, 2°)', 'Orange → green']], 'Summary table of tests for alcohols'),
      n: 'Let us sum up Part 2. Alcohols are weak acids, weaker than water. Their hydroxyl group can be replaced by halogens or acylated to give esters by a mechanism in which the alcohol oxygen attacks the protonated acid. Oxidation and the Lucas test distinguish primary, secondary and tertiary alcohols, and acid dehydration gives alkenes or ethers. Alcohols can be stepped up or down the series by known sequences.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'Show all five steps of the esterification mechanism with curly arrows.',
        'For dehydration, give the temperature: 443 K ethene, 413 K ether.',
        'Say why alcohols are weaker acids than water (+I of alkyl).',
        'In conversions, give every reagent and intermediate.',
      ],
      v: table(['Slip', 'Fix'], [['Ester O comes from the acid', 'From the alcohol'], ['3° alcohol oxidised to ketone', 'Resists oxidation'], ['Lucas: 1° turbid at once', '3° turbid at once']], 'Table of three common slips in Part 2 and fixes'),
      n: 'Final tips. Draw every step of the esterification and dehydration mechanisms. State the temperatures for making ethene and ether. Explain weak acidity with the inductive effect of the alkyl group. And in conversion questions, name each reagent and intermediate.',
    }),
  ],
});
