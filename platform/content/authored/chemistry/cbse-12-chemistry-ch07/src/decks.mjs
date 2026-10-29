// ch07 Alcohols, Phenols and Ethers — two decks: Part 1 (t01–t02) classification, naming, structure, preparation;
// Part 2 (t03–t05) properties and reactions of alcohols and phenols, commercial alcohols, ethers.
import { sl, deck, table, flow, svgV, r } from './lib.mjs';
import { ANGLES, HBOND, PHENOXIDE } from './svgs.mjs';

export const V = {
  angles: svgV(ANGLES, 'Bent shapes of methanol, with a C–O–H angle of about 108.9 degrees, and methoxymethane, with a C–O–C angle of about 111.7 degrees'),
  hbond: svgV(HBOND, 'Alcohol molecules joined in a chain by hydrogen bonds between the O–H hydrogen of one molecule and the oxygen of the next'),
  phenoxide: svgV(PHENOXIDE, 'Three resonance structures of the phenoxide ion with the negative charge on oxygen, on an ortho carbon and on the para carbon'),
};

export const deck1 = deck({
  part: 1,
  title: 'Alcohols, Phenols and Ethers — Part 1: Structure, naming and preparation',
  goals: [
    'Classify and name alcohols, phenols and ethers',
    'Describe the structure and bonding of the C–O–H and C–O–C groups',
    'Write methods of preparing alcohols from alkenes, carbonyl compounds and Grignard reagents',
    'Write methods of preparing phenol, including the cumene process and from diazonium salts',
  ],
  slides: [
    sl('title', 'Alcohols, Phenols and Ethers', {
      b: 'Part 1 — compounds with a C–O bond: what they are, how they are named and how they are made.',
      v: table(['Compound', 'Where you meet it'], [['Ethanol', 'Hand sanitiser, fuel blended with petrol'], ['Methanol', 'Industrial solvent; poisonous to drink'], ['Phenol', 'Disinfectants, plastics such as Bakelite'], ['Glycerol', 'Soaps and cosmetics'], ['Methyl tert-butyl ether', 'Additive in some fuels']], 'Table of familiar alcohols, phenols and ethers and where they are met'),
      n: 'Namaste! Sanitiser on your hands, ethanol blended into petrol, the phenol in old carbolic soap and the glycerol in cosmetics all contain a carbon–oxygen single bond. When an O–H group is attached to a saturated carbon we have an alcohol; when it is attached directly to a benzene ring, a phenol; and when oxygen joins two carbon groups, an ether. In this part we learn to classify, name and make them.',
    }),
    sl('concept', 'Classification', {
      b: 'Alcohols are **mono-, di- or trihydric** by the number of –OH groups, and **1°, 2° or 3°** by the carbon carrying –OH. **Allylic** and **benzylic** alcohols have –OH on an sp³ carbon next to C=C or a ring. **Phenols** have –OH on an aromatic carbon. **Ethers** are **symmetrical** (R–O–R) or **unsymmetrical** (R–O–R′).',
      v: table(['Type', 'Example', 'Structure'], [['Primary alcohol', 'Ethanol', r`$\ce{CH3CH2OH}$`], ['Secondary alcohol', 'Propan-2-ol', r`$\ce{(CH3)2CHOH}$`], ['Tertiary alcohol', '2-Methylpropan-2-ol', r`$\ce{(CH3)3COH}$`], ['Dihydric alcohol', 'Ethane-1,2-diol', r`$\ce{HOCH2CH2OH}$`], ['Benzylic alcohol', 'Phenylmethanol', r`$\ce{C6H5CH2OH}$`], ['Phenol', 'Phenol', r`$\ce{C6H5OH}$`], ['Ether', 'Methoxyethane', r`$\ce{CH3OCH2CH3}$`]], 'Table classifying alcohols, a phenol and an ether with examples and structures'),
      n: 'Alcohols are sorted in two ways. By the number of hydroxyl groups they are monohydric, dihydric like ethane-1,2-diol used in antifreeze, or trihydric like glycerol. By the carbon carrying the hydroxyl group they are primary, secondary or tertiary, just like haloalkanes. A phenol has the hydroxyl group directly on a benzene ring, which changes its chemistry a lot. Ethers have oxygen bonded to two carbon groups.',
    }),
    sl('concept', 'Naming', {
      b: 'Alcohols: replace the final **-e** of the alkane by **-ol**, with a locant (propan-2-ol). Phenols: named as derivatives of phenol (2-methylphenol). Ethers: **alkoxyalkanes**, the larger group being the parent (methoxyethane).',
      v: table(['Structure', 'Common name', 'IUPAC name'], [[r`$\ce{CH3CH(OH)CH3}$`, 'Isopropyl alcohol', 'Propan-2-ol'], [r`$\ce{(CH3)3COH}$`, 'tert-Butyl alcohol', '2-Methylpropan-2-ol'], [r`$\ce{HOCH2CH(OH)CH2OH}$`, 'Glycerol', 'Propane-1,2,3-triol'], [r`$\ce{CH3C6H4OH}$ (ortho)`, 'o-Cresol', '2-Methylphenol'], [r`$\ce{C6H4(OH)2}$ (1,2)`, 'Catechol', 'Benzene-1,2-diol'], [r`$\ce{C6H5OCH3}$`, 'Anisole', 'Methoxybenzene'], [r`$\ce{CH3OCH2CH3}$`, 'Ethyl methyl ether', 'Methoxyethane']], 'Table of common and IUPAC names of alcohols, phenols and ethers'),
      n: 'For alcohols, take the name of the longest chain containing the hydroxyl carbon, drop the final e and add ol, with a number for the position: propan-two-ol. Phenols keep the name phenol, with substituents numbered from the hydroxyl carbon: two-methylphenol. Ethers are named as alkoxy alkanes: the smaller group becomes the alkoxy prefix, so ethyl methyl ether is methoxyethane, and anisole is methoxybenzene.',
    }),
    sl('diagram', 'Structure: bond angles at oxygen', {
      b: 'Oxygen is sp³ hybridised with two lone pairs. In methanol the C–O–H angle (108.9°) is slightly less than tetrahedral (lone-pair repulsion); in ethers the C–O–C angle (about 111.7°) is larger because the bulky alkyl groups repel. In phenol the C–O bond (136 pm) is shorter than in methanol (142 pm) — partial double-bond character.',
      v: V.angles,
      n: 'The oxygen atom in alcohols and ethers is sp three hybridised, with two lone pairs. In methanol, the lone pairs squeeze the carbon, oxygen, hydrogen angle slightly below the tetrahedral value, to about one hundred and nine degrees. In ethers, two bulky alkyl groups push each other apart, opening the angle to about one hundred and twelve degrees. In phenol, the oxygen lone pair is shared with the ring, so the carbon–oxygen bond is a little shorter.',
    }),
    sl('example', 'Worked example: naming and classifying', {
      b: r`**Problem.** Name and classify (a) $\ce{CH3CH2C(CH3)2OH}$, (b) $\ce{CH2=CHCH2OH}$, (c) $\ce{C6H5CH(OH)CH3}$, (d) $\ce{(CH3)2CHOCH3}$.

**(a)** 2-Methylbutan-2-ol — tertiary alcohol.

**(b)** Prop-2-en-1-ol — allylic, primary alcohol.

**(c)** 1-Phenylethan-1-ol — benzylic, secondary alcohol.

**(d)** 2-Methoxypropane — unsymmetrical ether.`,
      v: flow('LR', [['a', 'Find the longest chain with the C–OH'], ['b', 'Lowest number to the –OH carbon'], ['c', 'Name: alkan-n-ol'], ['d', 'Classify the C bearing –OH']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow for naming and classifying an alcohol'),
      n: 'In the first example, the carbon carrying the hydroxyl group has three carbon neighbours, so it is tertiary, and the name is two-methylbutan-two-ol. The second has the hydroxyl next to a double bond: an allylic alcohol, named prop-two-en-one-ol. The third is next to a benzene ring, a benzylic secondary alcohol. The last is an ether: the smaller methyl group becomes methoxy and the parent is propane.',
    }),
    sl('check', 'Quick check: classification', {
      b: 'Classify an alcohol by the carbon that carries the –OH group.',
      n: 'Quick check. Count the carbon atoms joined to the carbon that carries the hydroxyl group.',
      chk: 'classify-mcq',
    }),
    sl('concept', 'Alcohols from alkenes', {
      b: '**Acid-catalysed hydration** adds water by Markovnikov’s rule (via a carbocation). **Hydroboration–oxidation** (B₂H₆, then H₂O₂/OH⁻) adds water **anti-Markovnikov**, giving primary alcohols from terminal alkenes.',
      m: [r`\ce{CH3CH=CH2 + H2O ->[H+] CH3CH(OH)CH3}`, r`\ce{CH3CH=CH2 ->[(i) B2H6][(ii) H2O2/OH-] CH3CH2CH2OH}`],
      v: table(['Alkene', 'Method', 'Product'], [['Propene', 'H₂O, H⁺', 'Propan-2-ol'], ['Propene', 'B₂H₆; H₂O₂, OH⁻', 'Propan-1-ol'], ['2-Methylpropene', 'H₂O, H⁺', '2-Methylpropan-2-ol']], 'Table of alkene hydration products by acid-catalysed hydration and hydroboration–oxidation'),
      n: 'Alkenes can be turned into alcohols by adding water across the double bond. With an acid catalyst, the reaction goes through a carbocation, and the hydroxyl group ends up on the more substituted carbon, following Markovnikov’s rule: propene gives propan-two-ol. Hydroboration followed by oxidation does the opposite, putting the hydroxyl group on the end carbon: propene gives propan-one-ol.',
    }),
    sl('concept', 'Alcohols from carbonyl compounds', {
      b: '**Reduction:** aldehydes give 1° alcohols, ketones give 2° alcohols (H₂ with Pd/Pt/Ni, or NaBH₄, LiAlH₄). Acids and esters are reduced to 1° alcohols by LiAlH₄. **Grignard reagents** add to carbonyl compounds; hydrolysis gives alcohols: methanal → 1°, other aldehydes → 2°, ketones → 3°.',
      m: [r`\ce{CH3CHO + H2 ->[Pd] CH3CH2OH}`, r`\ce{CH3COCH3 + H2 ->[Ni] CH3CH(OH)CH3}`],
      v: table(['Grignard + carbonyl', 'After hydrolysis'], [['RMgX + HCHO', 'Primary alcohol RCH₂OH'], ['RMgX + R′CHO', 'Secondary alcohol RR′CHOH'], ['RMgX + R′COR″', 'Tertiary alcohol RR′R″COH']], 'Table showing that Grignard reagents with methanal, other aldehydes and ketones give primary, secondary and tertiary alcohols'),
      n: 'Carbonyl compounds are the other big source of alcohols. Reducing an aldehyde gives a primary alcohol; reducing a ketone gives a secondary alcohol. Grignard reagents are even more useful, because they also make a new carbon–carbon bond. With methanal they give primary alcohols, with other aldehydes secondary alcohols, and with ketones tertiary alcohols, once the magnesium compound is hydrolysed with dilute acid.',
    }),
    sl('example', 'Worked example: planning a Grignard synthesis', {
      b: r`**Problem.** Which carbonyl compound and Grignard reagent would you use to make (a) propan-1-ol, (b) butan-2-ol, (c) 2-methylpropan-2-ol?

**(a)** $\ce{CH3CH2MgBr}$ + methanal (HCHO) → $\ce{CH3CH2CH2OH}$ (1°).

**(b)** $\ce{CH3CH2MgBr}$ + ethanal ($\ce{CH3CHO}$) → $\ce{CH3CH2CH(OH)CH3}$ (2°).

**(c)** $\ce{CH3MgBr}$ + propanone ($\ce{CH3COCH3}$) → $\ce{(CH3)3COH}$ (3°).

Each adduct is hydrolysed with dilute acid.`,
      v: flow('LR', [['a', 'Target alcohol'], ['b', 'Break one C–C bond to the carbinol carbon'], ['c', 'That fragment = R of RMgX'], ['d', 'Rest = carbonyl compound']], [['a', 'b'], ['b', 'c'], ['b', 'd']], 'Flow for planning a Grignard synthesis by breaking a bond to the carbon carrying the hydroxyl group'),
      n: 'Work backwards from the target. Look at the carbon carrying the hydroxyl group and imagine cutting one of its carbon–carbon bonds. The piece you cut off becomes the alkyl group of the Grignard reagent; the rest, with the hydroxyl turned into a carbonyl group, is the carbonyl compound. For two-methylpropan-two-ol, cutting off a methyl group leaves propanone, so methylmagnesium bromide and propanone are needed.',
    }),
    sl('concept', 'Preparation of phenol', {
      b: 'Phenol is made from **haloarenes** (Dow process), **benzenesulfonic acid** (fusion with NaOH), **diazonium salts** (warming with water) and, commercially, from **cumene**.',
      m: [r`\ce{C6H5Cl + 2NaOH ->[623 K, 300 atm] C6H5ONa + NaCl + H2O}`, r`\ce{C6H5SO3Na + 2NaOH -> C6H5ONa + Na2SO3 + H2O}`, r`\ce{C6H5N2Cl + H2O ->[warm] C6H5OH + N2 + HCl}`],
      v: table(['Starting material', 'Conditions', 'Then'], [['Chlorobenzene', 'NaOH, 623 K, 300 atm', 'Acidify sodium phenoxide'], ['Benzenesulfonic acid', 'Fuse with NaOH', 'Acidify'], ['Benzenediazonium chloride', 'Warm with water', 'Phenol forms directly'], ['Cumene', 'Air oxidation, then dilute acid', 'Phenol + propanone']], 'Table of four ways to prepare phenol with conditions'),
      n: 'Phenol cannot be made by simply adding water to benzene, so other routes are used. Chlorobenzene can be forced to react with sodium hydroxide at high temperature and pressure. Sodium benzenesulfonate can be fused with sodium hydroxide. A diazonium salt gives phenol simply on warming with water. In each case the phenoxide salt is acidified to release phenol.',
    }),
    sl('concept', 'The cumene process', {
      b: 'Most phenol is made from **cumene** (isopropylbenzene). Air oxidises it to **cumene hydroperoxide**, which dilute acid splits into **phenol and propanone** — two valuable products.',
      m: [r`\ce{C6H5CH(CH3)2 + O2 -> C6H5C(CH3)2OOH}`, r`\ce{C6H5C(CH3)2OOH ->[H+] C6H5OH + CH3COCH3}`],
      v: flow('LR', [['a', 'Benzene + propene'], ['b', 'Cumene'], ['c', 'Cumene hydroperoxide (air oxidation)'], ['d', 'Phenol + propanone (dilute acid)']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow of the cumene process from benzene and propene through cumene and its hydroperoxide to phenol and propanone'),
      n: 'Industry makes most of its phenol by the cumene process. Benzene and propene combine to give cumene. Air oxidises cumene to a hydroperoxide, which breaks apart in dilute acid into phenol and propanone. The process is economical because both products are useful: propanone, also called acetone, is an important solvent.',
    }),
    sl('example', 'Worked example: phenol from a diazonium salt', {
      b: r`**Problem.** How would you convert aniline into phenol? Give the conditions.

**Step 1.** Diazotise: aniline + $\ce{NaNO2}$ + HCl at 273–278 K gives benzenediazonium chloride.

**Step 2.** Warm the solution: $\ce{C6H5N2Cl + H2O -> C6H5OH + N2 + HCl}$.

**Step 3.** Nitrogen bubbles off; phenol is obtained (steam distillation separates it).`,
      v: table(['Step', 'Reagent', 'Temperature'], [['Diazotisation', 'NaNO₂ + HCl', '273–278 K'], ['Hydrolysis', 'Water', 'Warm']], 'Table of the two steps and conditions for converting aniline into phenol'),
      n: 'This is a common two-step conversion. First, aniline is diazotised with sodium nitrite and hydrochloric acid in an ice bath, because diazonium salts decompose if they get warm. Then the solution is deliberately warmed, so the diazonium group is replaced by a hydroxyl group from water, and nitrogen gas bubbles out.',
    }),
    sl('check', 'Quick check: preparation', {
      b: 'Pick the reagents for a given alcohol or phenol preparation.',
      n: 'Quick check. Decide whether the method must put the hydroxyl group on the more substituted or the end carbon, or which carbonyl compound a Grignard reagent needs.',
      chk: 'grignard-mcq',
    }),
    sl('concept', 'Physical properties', {
      b: 'Alcohols and phenols form **hydrogen bonds**, so they boil much higher than alkanes, haloalkanes or ethers of similar mass. Lower alcohols are **miscible with water** (they hydrogen-bond to it); solubility falls as the hydrocarbon part grows. Boiling point rises with chain length and falls with branching.',
      v: table(['Compound (M ≈ 44–46)', 'Boiling point / K', 'Reason'], [['Ethanol', '351', 'Hydrogen bonding'], ['Methoxymethane', '248', 'Dipole forces only'], ['Propane', '231', 'Weak dispersion forces only']], 'Table comparing boiling points of ethanol, methoxymethane and propane of similar molar mass'),
      n: 'Ethanol, methoxymethane and propane all have molar masses near forty five, yet ethanol boils at three hundred and fifty one kelvin, about a hundred degrees higher than the other two. The difference is hydrogen bonding between ethanol molecules. Ethers have no O–H hydrogen, so they cannot hydrogen-bond to each other. Small alcohols dissolve in water because they hydrogen-bond with water molecules.',
    }),
    sl('diagram', 'Hydrogen bonding in alcohols', {
      b: 'The H of one O–H group is attracted to a lone pair on the O of a neighbouring molecule.',
      v: V.hbond,
      n: 'Here you can see why alcohols are sticky at the molecular level. The hydrogen of each hydroxyl group is attracted to a lone pair on the oxygen of the next molecule, forming hydrogen bonds. To boil the alcohol, these must be broken, which needs extra energy. Alcohol molecules can also form hydrogen bonds with water, which is why ethanol and water mix in all proportions.',
    }),
    sl('check', 'Quick check: boiling points', {
      b: 'Compare the boiling points of an alcohol and an ether of similar molar mass.',
      n: 'Quick check. Ask which molecules can form hydrogen bonds with each other.',
      chk: 'bp-mcq',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Alcohols: 1°, 2°, 3°, allylic, benzylic; mono-, di-, trihydric. Phenols: –OH on an aryl carbon. Ethers: R–O–R′.',
        'Names: alkanol (propan-2-ol); substituted phenols; alkoxyalkanes (methoxyethane).',
        'O is sp³; C–O–H 108.9°, C–O–C 111.7°; C–O in phenol shorter (partial double bond).',
        'Alcohols from alkenes (H⁺ hydration: Markovnikov; hydroboration: anti-Markovnikov), carbonyl reduction and Grignard reagents.',
        'Phenol from chlorobenzene, benzenesulfonate, diazonium salts and cumene.',
        'Hydrogen bonding gives high boiling points and water solubility.',
      ],
      v: table(['Grignard + carbonyl', 'Alcohol'], [['HCHO', '1°'], ['RCHO', '2°'], ['R₂CO', '3°']], 'Summary table of Grignard reactions giving primary, secondary and tertiary alcohols'),
      n: 'Let us sum up Part 1. We classify alcohols by the carbon carrying the hydroxyl group, name them as alkanols, and name ethers as alkoxy alkanes. Oxygen is sp three hybridised. Alcohols come from alkenes, from reduction of carbonyl compounds and from Grignard reagents; phenol comes from chlorobenzene, sulfonates, diazonium salts and cumene. Hydrogen bonding explains their high boiling points and solubility in water.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'Grignard: methanal → 1°, other aldehydes → 2°, ketones → 3° alcohols; always add "then H₃O⁺".',
        'Hydroboration–oxidation is anti-Markovnikov; acid hydration is Markovnikov.',
        'Cumene process: name both products (phenol and propanone).',
        'Diazotisation is done at 273–278 K; warming gives phenol.',
        'Compare boiling points using hydrogen bonding, not just molar mass.',
      ],
      v: table(['Slip', 'Fix'], [['HCHO + RMgX gives 2° alcohol', 'It gives 1°'], ['Ethers H-bond to each other', 'They cannot: no O–H'], ['Phenol from benzene + water', 'Use cumene or chlorobenzene routes']], 'Table of three common slips in Part 1 and their fixes'),
      n: 'Some exam tips. Learn the Grignard pattern by heart: methanal, aldehyde, ketone give primary, secondary, tertiary alcohols. Remember which hydration method puts the hydroxyl group where. In the cumene process, name both products. Keep diazotisation cold. And when comparing boiling points, always discuss hydrogen bonding.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Alcohols, Phenols and Ethers — Part 2: Reactions, uses and ethers',
  goals: [
    'Compare the acidity of alcohols, water and phenols and explain substituent effects',
    'Write reactions of alcohols: with metals, esterification, HX, dehydration and oxidation',
    'Write reactions of phenol: bromination, nitration, Kolbe and Reimer–Tiemann reactions',
    'State uses of methanol and ethanol, and write Williamson synthesis and reactions of ethers',
  ],
  slides: [
    sl('title', 'Reactions of alcohols, phenols and ethers', {
      b: 'Part 2 — acidity, reactions of the O–H and C–O bonds, the activated ring of phenol, and ethers.',
      v: flow('LR', [['a', 'O–H bond breaks'], ['b', 'Acidity, esterification'], ['c', 'C–O bond breaks'], ['d', 'HX, dehydration'], ['e', 'Ring reactions of phenol']], [['a', 'b'], ['c', 'd'], ['b', 'e']], 'Flow of reaction types: breaking the O–H bond gives acidity and esterification; breaking the C–O bond gives reactions with HX and dehydration; phenol also reacts at the ring'),
      n: 'Alcohols and phenols react in two main ways. Some reactions break the oxygen–hydrogen bond, as when they act as acids or form esters. Others break the carbon–oxygen bond, as when they react with hydrogen halides or lose water. Phenol also has a very reactive benzene ring. In this part we compare their acidity, study their reactions, look at two important alcohols and finish with ethers.',
    }),
    sl('concept', 'Acidity of alcohols and phenols', {
      b: r`Alcohols react with active metals to give alkoxides and hydrogen, but are **weaker acids than water**. **Phenol** is much more acidic: it dissolves in NaOH, because the **phenoxide ion is stabilised by resonance**. Neither reacts with $\ce{NaHCO3}$.`,
      m: [r`\ce{2C2H5OH + 2Na -> 2C2H5ONa + H2}`, r`\ce{C6H5OH + NaOH -> C6H5ONa + H2O}`],
      v: table(['Compound', r`$\text{p}K_\text{a}$`], [['Ethanol', '15.9'], ['Water', '15.7'], ['Phenol', '10.0'], ['4-Methylphenol', '10.2'], ['3-Nitrophenol', '8.3'], ['4-Nitrophenol', '7.1'], ['2,4,6-Trinitrophenol', '0.5']], 'Table of pKa values of ethanol, water, phenol and substituted phenols'),
      n: 'Ethanol reacts with sodium, releasing hydrogen, so it is acidic, but only very weakly: even water is a stronger acid. Phenol is about a million times more acidic than ethanol and dissolves in sodium hydroxide solution. Look at the table: a smaller pKa means a stronger acid. Electron-withdrawing nitro groups make phenol more acidic; an electron-releasing methyl group makes it slightly less acidic.',
    }),
    sl('diagram', 'Why phenol is more acidic', {
      b: 'In phenoxide the negative charge is **delocalised** over oxygen and the ortho and para carbons; in ethoxide it stays on oxygen, and the alkyl group even **pushes electrons** towards it (+I). Electron-withdrawing groups at **ortho/para** (–NO₂) spread the charge further and increase acidity.',
      v: V.phenoxide,
      n: 'Why is phenol so much more acidic? When phenol loses a proton, the negative charge on the phenoxide ion spreads into the ring, onto the ortho and para carbons, as these resonance structures show. Spreading charge stabilises an ion. In the ethoxide ion, the charge is stuck on oxygen, and the ethyl group pushes even more electron density onto it. A nitro group at ortho or para spreads the charge still further.',
    }),
    sl('example', 'Worked example: ranking acidity', {
      b: r`**Problem.** Arrange in increasing acidity: ethanol, phenol, 4-nitrophenol, 4-methylphenol, water.

**Step 1.** Ethanol < water (alkyl +I effect destabilises ethoxide).

**Step 2.** Phenols are far more acidic than water (resonance in phenoxide).

**Step 3.** Among phenols: –CH₃ (+I) lowers acidity, –NO₂ at para (–R, –I) raises it.

**Answer.** Ethanol < water < 4-methylphenol < phenol < 4-nitrophenol.`,
      v: table(['Compound', 'pKa', 'Effect'], [['Ethanol', '15.9', 'Alkyl +I'], ['Water', '15.7', '—'], ['4-Methylphenol', '10.2', 'Methyl +I'], ['Phenol', '10.0', 'Resonance'], ['4-Nitrophenol', '7.1', 'Nitro −R, −I']], 'Table ranking ethanol, water, 4-methylphenol, phenol and 4-nitrophenol by pKa with the effect in each'),
      n: 'Rank acidity by thinking about the stability of the ion left after the proton leaves. Ethoxide is destabilised by the ethyl group, so ethanol is the weakest acid, just below water. All phenoxides are stabilised by the ring. A methyl group adds electron density and slightly destabilises the ion, while a nitro group at the para position withdraws electrons and stabilises it most.',
    }),
    sl('concept', 'Reactions of alcohols: esterification, HX and dehydration', {
      b: '**Esterification** (O–H breaks): with carboxylic acids (H⁺ catalyst, reversible), acid chlorides or anhydrides. **With HX** (C–O breaks): reactivity 3° > 2° > 1° (Lucas test). **Dehydration** with conc. H₂SO₄ or H₃PO₄: ethanol gives ethene at 443 K (ether at 413 K); ease 3° > 2° > 1° (carbocation stability).',
      m: [r`\ce{CH3COOH + C2H5OH <=>[H+] CH3COOC2H5 + H2O}`, r`\ce{C2H5OH ->[conc. H2SO4][443 K] CH2=CH2 + H2O}`],
      v: table(['Lucas test (conc. HCl + ZnCl₂, room temperature)', 'Observation'], [['Tertiary alcohol', 'Turbidity at once'], ['Secondary alcohol', 'Turbidity in about five minutes'], ['Primary alcohol', 'No turbidity at room temperature']], 'Table of Lucas test observations for tertiary, secondary and primary alcohols'),
      n: 'With carboxylic acids and a little sulfuric acid, alcohols form sweet-smelling esters; the reaction is reversible. With hydrogen halides, the carbon–oxygen bond breaks. Tertiary alcohols react fastest because they form stable carbocations, which is the basis of the Lucas test: tertiary alcohols turn the reagent cloudy at once, secondary in a few minutes, primary not at all at room temperature. Hot concentrated sulfuric acid removes water to form alkenes.',
    }),
    sl('concept', 'Oxidation of alcohols', {
      b: 'Oxidation removes H from O–H and from the C bearing –OH. **1° alcohols** → aldehydes (PCC, or Cu at 573 K) → carboxylic acids (acidified KMnO₄ or K₂Cr₂O₇). **2° alcohols** → ketones. **3° alcohols** resist oxidation; over hot Cu they dehydrate to alkenes.',
      m: [r`\ce{CH3CH2OH ->[Cu][573 K] CH3CHO + H2}`, r`\ce{(CH3)2CHOH ->[Cu][573 K] CH3COCH3 + H2}`],
      v: table(['Alcohol', 'Product with acidified dichromate', 'Over hot copper (573 K)'], [['Primary', 'Aldehyde, then carboxylic acid', 'Aldehyde'], ['Secondary', 'Ketone', 'Ketone'], ['Tertiary', 'No reaction (mild conditions)', 'Alkene (dehydration)']], 'Table of oxidation products of primary, secondary and tertiary alcohols with dichromate and over hot copper'),
      n: 'Oxidation tells primary, secondary and tertiary alcohols apart. A primary alcohol loses hydrogen to become an aldehyde, which strong oxidants carry on to a carboxylic acid; pyridinium chlorochromate stops at the aldehyde. A secondary alcohol gives a ketone. A tertiary alcohol has no hydrogen on the carbinol carbon, so it resists oxidation; over hot copper it loses water to give an alkene instead.',
    }),
    sl('check', 'Quick check: acidity and reactions', {
      b: 'Use acidity or oxidation behaviour to distinguish alcohols and phenols.',
      n: 'Quick check. Recall which compounds dissolve in sodium hydroxide, and what each class of alcohol gives on oxidation.',
      chk: 'phenol-naoh-mcq',
    }),
    sl('concept', 'Electrophilic substitution in phenol', {
      b: 'The –OH group strongly **activates** the ring and directs to **ortho and para** positions. Phenol reacts with **bromine water** at room temperature to give a white precipitate of **2,4,6-tribromophenol**; in CS₂ at low temperature, mono-bromophenols form. Dilute HNO₃ gives o- and p-nitrophenol; concentrated HNO₃ gives **picric acid**.',
      m: [r`\ce{C6H5OH + 3Br2 -> C6H2Br3OH + 3HBr}`, r`\ce{C6H5OH + 3HNO3 -> C6H2(NO2)3OH + 3H2O}`],
      v: table(['Reagent', 'Conditions', 'Product'], [['Bromine water', 'Room temperature', '2,4,6-Tribromophenol (white precipitate)'], ['Br₂ in CS₂', '273 K', '2- and 4-bromophenol'], ['Dilute HNO₃', '298 K', '2- and 4-nitrophenol (separated by steam distillation)'], ['Conc. HNO₃', '—', '2,4,6-Trinitrophenol (picric acid)']], 'Table of electrophilic substitution reactions of phenol with bromine and nitric acid'),
      n: 'The hydroxyl group pushes electron density into the ring, especially at ortho and para positions, so phenol reacts with electrophiles far faster than benzene. Bromine water instantly gives a white precipitate of tribromophenol, a useful test. In a non-polar solvent at low temperature, only one bromine goes in. Dilute nitric acid gives ortho and para nitrophenols, which can be separated by steam distillation because the ortho isomer has intramolecular hydrogen bonding.',
    }),
    sl('concept', 'Kolbe and Reimer–Tiemann reactions', {
      b: '**Kolbe’s reaction:** sodium phenoxide + CO₂ (about 400 K, 4–7 atm), then acid → **salicylic acid** (2-hydroxybenzoic acid). **Reimer–Tiemann reaction:** phenol + CHCl₃ + aqueous NaOH, then acid → **salicylaldehyde** (2-hydroxybenzaldehyde).',
      m: [r`\ce{C6H5ONa + CO2 -> C6H4(OH)COONa}`, r`\ce{C6H5OH + CHCl3 + 3NaOH -> C6H4(OH)CHO + 3NaCl + 2H2O}`],
      v: table(['Reaction', 'Reagents', 'Product (after acidification)'], [['Kolbe', 'C₆H₅ONa + CO₂, heat, pressure', 'Salicylic acid (used to make aspirin)'], ['Reimer–Tiemann', 'CHCl₃ + aq. NaOH', 'Salicylaldehyde'], ['With zinc dust', 'Heat', 'Benzene'], ['Oxidation', 'Na₂Cr₂O₇, H₂SO₄', 'Benzoquinone']], 'Table of Kolbe, Reimer–Tiemann, zinc dust and oxidation reactions of phenol'),
      n: 'Two named reactions put a new carbon group onto the ring of phenol, at the ortho position. In Kolbe’s reaction, sodium phenoxide is heated with carbon dioxide under pressure, giving salicylic acid, the starting material for aspirin. In the Reimer–Tiemann reaction, phenol is heated with chloroform and sodium hydroxide, giving salicylaldehyde. Phenol is also reduced to benzene by hot zinc dust.',
    }),
    sl('example', 'Worked example: distinguishing tests', {
      b: r`**Problem.** Give a chemical test to distinguish (a) ethanol and phenol; (b) propan-1-ol and 2-methylpropan-2-ol.

**(a)** Add **bromine water**: phenol decolourises it and gives a white precipitate of 2,4,6-tribromophenol; ethanol does not. (Or neutral FeCl₃: violet colour with phenol.)

**(b)** **Lucas reagent** at room temperature: 2-methylpropan-2-ol turns cloudy at once; propan-1-ol stays clear.`,
      v: table(['Pair', 'Test', 'Positive result'], [['Ethanol / phenol', 'Bromine water or neutral FeCl₃', 'Phenol: white precipitate / violet colour'], ['1° / 3° alcohol', 'Lucas reagent', '3°: immediate turbidity']], 'Table of tests distinguishing ethanol from phenol and a primary from a tertiary alcohol'),
      n: 'Distinguishing tests must give a clear, visible difference. Phenol decolourises bromine water and forms a white precipitate, and it gives a violet colour with neutral iron three chloride; ethanol does neither. To tell a primary alcohol from a tertiary one, use Lucas reagent: the tertiary alcohol turns cloudy at once, while the primary alcohol shows no change at room temperature.',
    }),
    sl('concept', 'Methanol and ethanol', {
      b: '**Methanol** is made from synthesis gas, $\\ce{CO + 2H2}$ over ZnO–Cr₂O₃ at high temperature and pressure; it is very poisonous (blindness, death). **Ethanol** is made by **fermentation** of sugars (molasses, starch) using yeast enzymes; denatured alcohol has methanol and a dye added so it cannot be drunk.',
      m: [r`\ce{CO + 2H2 ->[ZnO/Cr2O3] CH3OH}`, r`\ce{C12H22O11 + H2O ->[invertase] C6H12O6 + C6H12O6}`, r`\ce{C6H12O6 ->[zymase] 2C2H5OH + 2CO2}`],
      v: table(['Alcohol', 'Main uses', 'Hazard'], [['Methanol', 'Solvent for paints and varnishes; making methanal', 'Toxic: small amounts cause blindness'], ['Ethanol', 'Solvent, sanitisers, beverages, biofuel blended with petrol', 'Intoxicating; denatured for industrial use']], 'Table of uses and hazards of methanol and ethanol'),
      n: 'Methanol, sometimes called wood spirit, is made from carbon monoxide and hydrogen over a catalyst. It is a useful solvent but highly poisonous: even small amounts can cause blindness. Ethanol is made by fermenting sugars from molasses or starch with yeast, whose enzymes invertase and zymase break sucrose into glucose and then glucose into ethanol and carbon dioxide. India blends ethanol into petrol to reduce oil imports.',
    }),
    sl('check', 'Quick check: phenol reactions', {
      b: 'Predict the product of a reaction of phenol.',
      n: 'Quick check. Remember that the hydroxyl group strongly activates the ortho and para positions of the ring.',
      chk: 'bromine-water-mcq',
    }),
    sl('concept', 'Ethers: preparation', {
      b: '**Williamson synthesis:** an alkoxide or phenoxide reacts with a **primary** alkyl halide by SN2. With tertiary halides elimination dominates, so the tertiary group must be on the alkoxide. **Dehydration** of primary alcohols (conc. H₂SO₄, 413 K) gives symmetrical ethers.',
      m: [r`\ce{C2H5ONa + CH3I -> C2H5OCH3 + NaI}`, r`\ce{2C2H5OH ->[conc. H2SO4][413 K] C2H5OC2H5 + H2O}`],
      v: table(['Target ether', 'Correct choice', 'Wrong choice'], [['tert-Butyl methyl ether', '(CH₃)₃CONa + CH₃Br', '(CH₃)₃CBr + CH₃ONa (gives 2-methylpropene)'], ['Anisole', 'C₆H₅ONa + CH₃I', 'C₆H₅Br + CH₃ONa (aryl halide unreactive)']], 'Table of correct and incorrect Williamson choices for tert-butyl methyl ether and anisole'),
      n: 'The best laboratory route to ethers is Williamson’s synthesis: an alkoxide ion attacks an alkyl halide in an S N two reaction. The alkyl halide should be primary. If you try a tertiary halide, the strongly basic alkoxide pulls off a hydrogen instead and you get an alkene. So to make tert-butyl methyl ether, use sodium tert-butoxide with bromomethane, not the other way round.',
    }),
    sl('concept', 'Ethers: reactions', {
      b: 'Ethers are fairly unreactive. **HI** cleaves the C–O bond: with mixed alkyl ethers, the halide goes to the **smaller** (methyl) group (SN2), or to the **tertiary** group (SN1). Aryl alkyl ethers give **phenol + alkyl iodide**. The –OR group of anisole activates the ring for **o/p electrophilic substitution**.',
      m: [r`\ce{CH3OC2H5 + HI -> CH3I + C2H5OH}`, r`\ce{C6H5OCH3 + HI -> C6H5OH + CH3I}`, r`\ce{C6H5OCH3 + Br2 ->[ethanoic acid] BrC6H4OCH3 + HBr}`],
      v: table(['Reaction of anisole', 'Reagent', 'Main product'], [['Cleavage', 'HI', 'Phenol + iodomethane'], ['Bromination', 'Br₂ in ethanoic acid', '4-Bromoanisole (major)'], ['Nitration', 'Conc. HNO₃ + H₂SO₄', '4-Nitroanisole (major)'], ['Friedel–Crafts', 'CH₃COCl, AlCl₃', '4-Methoxyacetophenone (major)']], 'Table of reactions of anisole: cleavage with HI, bromination, nitration and Friedel–Crafts acylation'),
      n: 'Ethers are good solvents precisely because they are unreactive, but hot hydrogen iodide cleaves them. In methoxyethane, iodide attacks the less hindered methyl carbon, giving iodomethane and ethanol. In anisole, the phenyl–oxygen bond has partial double-bond character, so it is the methyl–oxygen bond that breaks: phenol and iodomethane form. The methoxy group also activates the ring, so anisole undergoes ortho and para substitution.',
    }),
    sl('example', 'Worked example: products of ether cleavage', {
      b: r`**Problem.** Predict the products with excess-free HI (one equivalent): (a) 1-methoxypropane; (b) 2-methoxy-2-methylpropane; (c) ethoxybenzene.

**(a)** $\ce{CH3I}$ + propan-1-ol (SN2 at the less hindered methyl).

**(b)** $\ce{(CH3)3CI}$ + methanol (SN1: stable tertiary carbocation).

**(c)** Phenol + iodoethane (aryl–O bond does not break).`,
      v: table(['Ether', 'Mechanism', 'Products'], [['1-Methoxypropane', 'SN2', 'CH₃I + propan-1-ol'], ['2-Methoxy-2-methylpropane', 'SN1', '(CH₃)₃CI + CH₃OH'], ['Ethoxybenzene', 'SN2 at ethyl', 'C₆H₅OH + C₂H₅I']], 'Table of ether cleavage products by mechanism'),
      n: 'Decide which carbon the iodide attacks. With a methyl and a primary group, the mechanism is S N two, so iodide attacks the smaller methyl carbon. With a tertiary group, the protonated ether breaks to give a stable tertiary carbocation, which picks up iodide, so the iodide ends up on the tertiary carbon. With an aryl ether, the aryl–oxygen bond never breaks, so phenol is always one product.',
    }),
    sl('check', 'Quick check: Williamson synthesis', {
      b: 'Choose the correct reactants for a Williamson ether synthesis.',
      n: 'Quick check. Remember that the alkyl halide must be primary, otherwise elimination wins.',
      chk: 'williamson-mcq',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'Acidity: alcohols < water < phenols; phenoxide resonance-stabilised; –NO₂ (o/p) increases, –CH₃ decreases acidity.',
        'Alcohols: esterification; HX (3° > 2° > 1°, Lucas test); dehydration to alkene (443 K) or ether (413 K); oxidation 1° → aldehyde → acid, 2° → ketone, 3° resists.',
        'Phenol: bromine water → 2,4,6-tribromophenol; nitration; Kolbe → salicylic acid; Reimer–Tiemann → salicylaldehyde.',
        'Methanol from CO + 2H₂ (toxic); ethanol by fermentation (invertase, zymase).',
        'Ethers: Williamson (alkoxide + 1° halide); HI cleavage; anisole o/p-substitution.',
      ],
      v: table(['Test', 'Positive for'], [['Bromine water (white ppt)', 'Phenol'], ['Neutral FeCl₃ (violet)', 'Phenol'], ['Lucas reagent (instant turbidity)', '3° alcohol']], 'Summary table of tests for phenol and tertiary alcohols'),
      n: 'Let us sum up Part 2. Phenols are much more acidic than alcohols because the phenoxide ion is stabilised by resonance. Alcohols form esters, react with hydrogen halides, lose water and are oxidised according to their class. Phenol’s ring is strongly activated, giving tribromophenol, nitrophenols, salicylic acid and salicylaldehyde. Methanol and ethanol are important industrially, and ethers are made by Williamson’s synthesis and cleaved by hydrogen iodide.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'For acidity questions, compare the stability of the anions (resonance, +I, −I, −R).',
        'Name the reagent and the observation in distinguishing tests.',
        'Williamson: alkoxide + primary halide; never a tertiary halide.',
        'HI cleavage of anisole gives phenol + CH₃I, not iodobenzene.',
        'Write "then H₃O⁺" for Kolbe and Reimer–Tiemann reactions.',
      ],
      v: table(['Slip', 'Fix'], [['Phenol reacts with NaHCO₃', 'It does not (weaker than H₂CO₃)'], ['Tertiary alcohols oxidise to ketones', 'They resist oxidation'], ['Anisole + HI → C₆H₅I', 'Gives C₆H₅OH + CH₃I']], 'Table of three common slips in Part 2 and their fixes'),
      n: 'Some final tips. In acidity questions, always talk about the stability of the ion formed. In tests, give both reagent and observation. In Williamson syntheses, the halide must be primary. Remember that anisole and hydrogen iodide give phenol, not iodobenzene. And note that phenol is too weak an acid to react with sodium hydrogencarbonate, which is how phenols are told apart from carboxylic acids.',
    }),
  ],
});
