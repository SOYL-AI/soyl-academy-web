// ISC 12 Chemistry ch19 Amines — two decks: Part 1 (t01–t04) classification, structure, nomenclature, preparation,
// physical properties and basicity; Part 2 (t05–t06) alkylation and acylation with mechanism, nitrous acid,
// carbylamine and Hinsberg tests, and aniline (preparation, reactions, electrophilic substitution, tests, uses).
import { sl, deck, table, flow, svgV, r } from './lib.mjs';
import { PYRAMID, ANILINE } from './svgs.mjs';

export const V = {
  pyramid: svgV(PYRAMID, 'Pyramidal trimethylamine with an sp³ nitrogen, a lone pair at the top and a C–N–C angle of about 108 degrees'),
  aniline: svgV(ANILINE, 'Three resonance structures of aniline showing the nitrogen lone pair delocalised into the ring, with negative charge at the ortho and para carbons'),
};

export const deck1 = deck({
  part: 1,
  title: 'Amines — Part 1: Structure, preparation, properties and basicity',
  goals: [
    'Classify and name primary, secondary and tertiary amines and describe the amino group',
    'Write equations for preparing amines from alcohols, alkyl halides, cyanides, amides, nitro compounds and by Gabriel synthesis',
    'Compare boiling points of amines with each other and with alcohols',
    'Arrange amines in order of basic strength and explain why aniline is a weak base',
  ],
  slides: [
    sl('title', 'Amines', {
      b: 'Part 1 — derivatives of ammonia in which alkyl or aryl groups replace hydrogen.',
      v: table(['Amine', 'Where you meet it'], [['Trimethylamine', 'Smell of fish'], ['Putrescine, cadaverine', 'Smell of decaying flesh'], ['Aniline', 'Dyes, drugs, rubber chemicals'], ['Adrenaline (an amine)', 'Hormone of “fight or flight”'], ['Histamine', 'Allergic reactions']], 'Table of familiar amines'),
      n: 'Namaste! The smell of fish, many dyes and drugs, and the hormone adrenaline all contain nitrogen joined to carbon groups: they are amines, organic relatives of ammonia. In this part we classify and name amines, see how they are made, compare their physical properties with alcohols, and find out what makes some amines stronger bases than others.',
    }),
    sl('concept', 'Classification and general formula', {
      b: 'Replacing one, two or three H of NH₃ gives **primary (1°) RNH₂**, **secondary (2°) R₂NH** and **tertiary (3°) R₃N** amines; R₄N⁺X⁻ are **quaternary ammonium salts**. Saturated aliphatic amines: CₙH₂ₙ₊₃N. **Aliphatic** (N on alkyl C) and **aromatic** (N on ring C: aryl amines).',
      v: table(['Class', 'Example', 'Formula'], [['Primary', 'Propan-1-amine', 'CH₃CH₂CH₂NH₂'], ['Secondary', 'N-Methylethanamine', 'CH₃CH₂NHCH₃'], ['Tertiary', 'N,N-Dimethylethanamine', 'CH₃CH₂N(CH₃)₂'], ['Quaternary salt', 'Tetramethylammonium chloride', '(CH₃)₄N⁺Cl⁻'], ['Aryl amine', 'Aniline (benzenamine)', 'C₆H₅NH₂']], 'Table classifying amines'),
      n: 'Amines are classified by how many hydrogens of ammonia have been replaced by carbon groups: one for primary, two for secondary, three for tertiary. Note the difference from alcohols: here we count the groups on nitrogen, not on the carbon. If nitrogen carries four groups and a positive charge, we have a quaternary ammonium salt. When nitrogen is bonded to a benzene ring, the amine is aromatic.',
    }),
    sl('diagram', 'Structure of the amino group', {
      b: 'Nitrogen is **sp³** with a **lone pair** in one hybrid orbital: amines are **pyramidal**, with C–N–C angles of about 108°. The lone pair makes amines **bases** and **nucleophiles**. In aniline the lone pair is partly delocalised into the ring.',
      v: V.pyramid,
      n: 'In an amine the nitrogen atom is sp three hybridised. Three of its hybrid orbitals form bonds and the fourth holds a lone pair, so the molecule is pyramidal, like ammonia, with angles of about one hundred and eight degrees. That lone pair is the key to amine chemistry: it accepts protons, making amines bases, and attacks electron-poor carbons, making them nucleophiles.',
    }),
    sl('concept', 'Nomenclature', {
      b: 'IUPAC: replace -e of the alkane by **-amine** (propan-2-amine); extra groups on N use the prefix **N-** (N-methylpropan-1-amine). Common names: alkyl groups + amine. Aniline is **benzenamine**.',
      v: table(['Structure', 'Common name', 'IUPAC name'], [['CH₃CH(NH₂)CH₃', 'Isopropylamine', 'Propan-2-amine'], ['(CH₃)₂NH', 'Dimethylamine', 'N-Methylmethanamine'], ['CH₃CH₂CH₂NHCH₃', 'Methylpropylamine', 'N-Methylpropan-1-amine'], ['(C₂H₅)₃N', 'Triethylamine', 'N,N-Diethylethanamine'], ['H₂N(CH₂)₆NH₂', 'Hexamethylenediamine', 'Hexane-1,6-diamine'], ['C₆H₅N(CH₃)₂', 'N,N-Dimethylaniline', 'N,N-Dimethylbenzenamine']], 'Table of amine names'),
      n: 'For IUPAC names, take the longest carbon chain attached to nitrogen, replace the final e by amine, and show other groups on nitrogen with the prefix N. So dimethylamine is N-methylmethanamine and triethylamine is N,N-diethylethanamine. Hexamethylenediamine, used to make nylon, is hexane-one-six-diamine, and aniline is benzenamine.',
    }),
    sl('example', 'Worked example: naming and classifying', {
      b: r`**Problem.** Name and classify: (a) $\ce{CH3CH2CH(NH2)CH3}$; (b) $\ce{(CH3)2CHNHCH3}$; (c) $\ce{CH3CH2N(CH3)CH2CH3}$; (d) $\ce{CH3C6H4NH2}$ (para).

**(a)** Butan-2-amine — primary.

**(b)** N-Methylpropan-2-amine — secondary.

**(c)** N-Ethyl-N-methylethanamine — tertiary.

**(d)** 4-Methylaniline (4-methylbenzenamine, p-toluidine) — primary aryl amine.`,
      v: flow('LR', [['a', 'Count C groups on N'], ['b', '1 → 1°, 2 → 2°, 3 → 3°'], ['c', 'Longest chain on N → alkanamine'], ['d', 'Other groups: N-prefix']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow for naming and classifying amines'),
      n: 'First count the carbon groups attached to nitrogen to classify the amine. Then name it from the longest chain on nitrogen, adding N prefixes for the other groups. Butan-two-amine has one group, so it is primary, even though the carbon carrying nitrogen is secondary. The last example is a primary aromatic amine, four-methylaniline.',
    }),
    sl('check', 'Quick check: classification and names', {
      b: 'Classify or name an amine.',
      n: 'Quick check. Count the carbon groups attached to nitrogen, not to the carbon.',
      chk: 'class-mcq',
    }),
    sl('concept', 'Preparation from alcohols, alkyl halides, cyanides and nitro compounds', {
      b: '**Alcohols:** vapour + NH₃ over Al₂O₃ at 633 K (mixture). **Alkyl halides:** heat with alcoholic NH₃ in a sealed tube (ammonolysis); gives 1°, 2°, 3° and quaternary products — excess NH₃ favours 1°. **Cyanides:** reduction (H₂/Ni, LiAlH₄, Na/ethanol) → **RCH₂NH₂** (one C more). **Nitro compounds:** Sn/HCl, Fe/HCl or H₂/Ni → amines.',
      m: [r`\ce{CH3CH2OH + NH3 ->[Al2O3][633 K] CH3CH2NH2 + H2O}`, r`\ce{CH3CH2CN + 2H2 ->[Ni] CH3CH2CH2NH2}`, r`\ce{C6H5NO2 + 3H2 ->[Ni] C6H5NH2 + 2H2O}`],
      v: table(['Starting compound', 'Reagent', 'Product'], [['Propan-1-ol', 'NH₃, Al₂O₃, 633 K', 'Propan-1-amine (+ 2°, 3°)'], ['1-Bromobutane', 'Excess alcoholic NH₃, sealed tube', 'Butan-1-amine'], ['Propanenitrile', 'LiAlH₄ or H₂/Ni', 'Propan-1-amine'], ['Nitrobenzene', 'Sn/HCl, then NaOH', 'Aniline']], 'Table of preparations'),
      n: 'Amines can be made from alcohols by passing their vapour with ammonia over hot alumina, and from alkyl halides by heating with ammonia in a sealed tube, though both give mixtures because the amine formed can react again. Reducing a nitrile gives a primary amine with one more carbon than the alkyl halide used. Reducing nitro compounds, especially nitrobenzene, gives aromatic amines such as aniline.',
    }),
    sl('concept', 'Hofmann degradation and Gabriel synthesis', {
      b: '**Hofmann bromamide degradation:** amide + Br₂ + KOH → **1° amine with one carbon fewer**. **Gabriel phthalimide synthesis:** phthalimide + KOH → potassium phthalimide; + RX (SN2) → N-alkylphthalimide; hydrolysis (or hydrazine) → **pure 1° amine**. Gabriel cannot make aryl amines (aryl halides do not undergo SN2).',
      m: [r`\ce{CH3CH2CONH2 + Br2 + 4KOH -> CH3CH2NH2 + K2CO3 + 2KBr + 2H2O}`],
      v: flow('LR', [['a', 'Phthalimide'], ['b', 'Potassium phthalimide (KOH)'], ['c', 'N-Alkylphthalimide (+ RX)'], ['d', 'RNH₂ + phthalic acid (hydrolysis)']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow of the Gabriel synthesis'),
      n: 'In the Hofmann bromamide degradation, an amide is warmed with bromine and potassium hydroxide; the carbonyl carbon is lost as carbonate, giving a primary amine with one carbon fewer. In the Gabriel synthesis, the potassium salt of phthalimide is alkylated by an alkyl halide, and hydrolysis releases a pure primary amine; only one alkyl group can be attached, so no secondary or tertiary amines form.',
    }),
    sl('example', 'Worked example: choosing a preparation', {
      b: r`**Problem.** Prepare (a) pure ethanamine from bromoethane; (b) propan-1-amine from bromoethane (one carbon more); (c) ethanamine from propanamide; (d) 4-methylaniline from 4-nitrotoluene.

**(a)** Gabriel synthesis: potassium phthalimide + C₂H₅Br, then hydrolysis.

**(b)** KCN → propanenitrile; then LiAlH₄ (or H₂/Ni).

**(c)** Br₂ + KOH (Hofmann).

**(d)** Sn/HCl (or H₂/Ni), then NaOH.`,
      v: table(['Change', 'Method', 'Carbon count'], [['RX → RNH₂ (pure)', 'Gabriel', 'Same'], ['RX → RCH₂NH₂', 'KCN, then reduction', '+1'], ['RCONH₂ → RNH₂', 'Hofmann', '−1'], ['ArNO₂ → ArNH₂', 'Reduction', 'Same']], 'Table of preparation choices'),
      n: 'Pick the method by the change in carbon count and the purity needed. For a pure primary amine with the same number of carbons, use Gabriel. To add a carbon, go through the nitrile and reduce it. To remove a carbon, use the Hofmann degradation of the amide. And to make an aromatic amine, reduce the nitro compound.',
    }),
    sl('check', 'Quick check: preparation', {
      b: 'Choose a method that gives a particular amine.',
      n: 'Quick check. Hofmann removes a carbon; nitrile reduction adds one; Gabriel gives only primary amines.',
      chk: 'prep-mcq',
    }),
    sl('concept', 'Physical properties', {
      b: 'Lower aliphatic amines are gases or volatile liquids with a fishy smell; aniline is a liquid that darkens in air. 1° and 2° amines form **N–H···N hydrogen bonds** (weaker than O–H···O, since N is less electronegative), so they boil **lower than alcohols** of similar mass; 3° amines cannot hydrogen-bond with each other. B.p. of isomers: **1° > 2° > 3°**. Lower amines are water-soluble (H-bonding with water).',
      v: table(['Compound (M ≈ 59–60)', 'b.p. / K'], [['Trimethylamine (3°)', '276'], ['N-Methylethanamine (2°)', '310'], ['Propan-1-amine (1°)', '321'], ['Propan-1-ol', '370']], 'Table of boiling points'),
      n: 'Primary and secondary amines form hydrogen bonds between their molecules, but nitrogen is less electronegative than oxygen, so these bonds are weaker than in alcohols, and amines boil lower than alcohols of similar mass. Tertiary amines have no hydrogen on nitrogen and cannot hydrogen-bond with each other, so among isomers they boil lowest. Small amines dissolve in water because water hydrogen-bonds to them.',
    }),
    sl('concept', 'Basic character', {
      b: r`$\ce{RNH2 + H2O <=> RNH3+ + OH-}$; larger $K_b$ (smaller pKb) → stronger base. **Gas phase:** 3° > 2° > 1° > NH₃ (+I effect). **Water:** (CH₃)₂NH > CH₃NH₂ > (CH₃)₃N > NH₃ and (C₂H₅)₂NH > (C₂H₅)₃N > C₂H₅NH₂ > NH₃: a balance of **+I effect**, **solvation (H-bonding) of the cation** and **steric hindrance**.`,
      v: table(['Base', 'pKb'], [['(C₂H₅)₂NH', '3.00'], ['(C₂H₅)₃N', '3.25'], ['(CH₃)₂NH', '3.27'], ['C₂H₅NH₂', '3.29'], ['CH₃NH₂', '3.38'], ['(CH₃)₃N', '4.22'], ['NH₃', '4.75'], ['C₆H₅NH₂', '9.38']], 'Table of pKb values of amines'),
      n: 'Amines are bases because the nitrogen lone pair accepts a proton. Alkyl groups push electrons towards nitrogen, so in the gas phase basicity simply increases with the number of alkyl groups. In water, the ammonium ion formed is also stabilised by hydrogen bonding to water, which is best with more N–H bonds; bulky groups also hinder solvation. The balance gives the orders shown, with secondary amines usually strongest.',
    }),
    sl('diagram', 'Why aniline is a weak base', {
      b: 'In aniline the N lone pair is **delocalised into the ring** (resonance), so it is less available for protonation; the anilinium ion has no such resonance. Also the sp² ring carbon withdraws electrons. Aniline (pKb 9.38) is far weaker than NH₃ (4.75). **Substituents:** electron-donating groups (–CH₃, –OCH₃) at para **increase** basicity; electron-withdrawing groups (–NO₂, –Cl) **decrease** it.',
      v: V.aniline,
      n: 'In aniline the nitrogen lone pair spreads into the benzene ring, as these resonance structures show, so it is much less available to accept a proton. Protonating aniline destroys this extra stability, so aniline is a much weaker base than ammonia or alkyl amines. Groups that push electrons into the ring, like methyl, make it slightly stronger; groups that pull electrons, like nitro, make it weaker still.',
    }),
    sl('example', 'Worked example: ranking basicity', {
      b: r`**Problem.** Arrange in increasing basic strength: aniline, 4-nitroaniline, 4-methylaniline, benzylamine (C₆H₅CH₂NH₂), ammonia. (pKb: 9.38, 13.0, 8.92, 4.70, 4.75)

**Step 1.** 4-Nitroaniline: –NO₂ withdraws electrons and extends delocalisation — weakest.

**Step 2.** Aniline < 4-methylaniline (+I of CH₃).

**Step 3.** Benzylamine: N on an sp³ CH₂, no delocalisation — about as strong as NH₃ (slightly stronger).

**Order:** 4-nitroaniline < aniline < 4-methylaniline < ammonia < benzylamine.`,
      v: table(['Base', 'pKb', 'Reason'], [['4-Nitroaniline', '13.0', '−R, −I of NO₂'], ['Aniline', '9.38', 'Lone pair delocalised'], ['4-Methylaniline', '8.92', '+I of CH₃'], ['Ammonia', '4.75', 'Reference'], ['Benzylamine', '4.70', 'No delocalisation']], 'Table ranking five bases'),
      n: 'Rank by how available the nitrogen lone pair is. In four-nitroaniline the nitro group pulls the lone pair even further into the ring, so it is the weakest base. A methyl group pushes electrons in and makes four-methylaniline slightly stronger than aniline. In benzylamine the nitrogen is attached to a CH two group, not to the ring, so its lone pair is not delocalised and it behaves like an alkyl amine.',
    }),
    sl('check', 'Quick check: basicity', {
      b: 'Choose the stronger or weaker base.',
      n: 'Quick check. Consider the inductive effect, solvation, steric hindrance and delocalisation into a ring.',
      chk: 'base-mcq',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        '1° RNH₂, 2° R₂NH, 3° R₃N; IUPAC -amine with N-prefixes; N sp³, pyramidal, lone pair.',
        'Preparation: ROH + NH₃ (Al₂O₃); RX + NH₃; RCN reduction (+1 C); Hofmann (−1 C); nitro reduction; Gabriel (pure 1°).',
        'B.p.: 1° > 2° > 3°; amines < alcohols (weaker N–H···N).',
        'Basicity in water: 2° > 1° ≈ 3° > NH₃ (inductive, solvation, steric); aniline ≪ NH₃ (delocalisation).',
        'EDG increase, EWG decrease basicity of aniline.',
      ],
      v: table(['Method', 'Carbon change'], [['Nitrile reduction', '+1'], ['Hofmann', '−1'], ['Gabriel', '0 (pure 1°)']], 'Summary table of preparations'),
      n: 'Let us sum up Part 1. Amines are primary, secondary or tertiary according to the groups on nitrogen, which carries a lone pair. They are made from alcohols, alkyl halides, nitriles, amides and nitro compounds, and by the Gabriel synthesis. Their hydrogen bonds are weaker than those of alcohols. Alkyl amines are stronger bases than ammonia, while aniline is much weaker because its lone pair is delocalised.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'Classify amines by groups on N (butan-2-amine is 1°).',
        'State the carbon change for Hofmann and nitrile reduction.',
        'In basicity answers, mention +I effect, solvation and steric hindrance.',
        'Explain aniline’s weak basicity with resonance.',
      ],
      v: table(['Slip', 'Fix'], [['(CH₃)₃N strongest base in water', '(CH₃)₂NH strongest'], ['Gabriel makes aniline', 'Cannot (aryl halides inert)'], ['Amines boil higher than alcohols', 'Lower']], 'Table of three common slips in Part 1 and fixes'),
      n: 'Some tips. Classify amines by counting groups on nitrogen. Say whether a preparation adds or removes a carbon. In basicity questions, discuss the inductive effect, solvation and steric hindrance together. And explain the weakness of aniline as a base by resonance.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Amines — Part 2: Reactions, tests and aniline',
  goals: [
    'Write alkylation and acylation reactions with mechanisms',
    'Use nitrous acid, the carbylamine reaction and Hinsberg’s test to distinguish 1°, 2° and 3° amines',
    'Write the preparation and reactions of aniline, including electrophilic substitution, and explain why it is acetylated before nitration',
  ],
  slides: [
    sl('title', 'Reactions of amines', {
      b: 'Part 2 — the lone pair at work: nucleophilic reactions, tests and the chemistry of aniline.',
      v: flow('LR', [['a', 'N lone pair'], ['b', 'Nucleophile: alkylation, acylation, sulphonylation'], ['c', 'Tests: HNO₂, carbylamine, Hinsberg'], ['d', 'Aniline: ring substitution']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow of the topics in Part 2'),
      n: 'The lone pair on nitrogen makes amines nucleophiles as well as bases. They attack alkyl halides, acid chlorides and sulphonyl chlorides. Differences in how primary, secondary and tertiary amines react give us useful tests. Finally, in aniline, the amino group powerfully activates the benzene ring, which explains its distinctive chemistry.',
    }),
    sl('concept', 'Alkylation with mechanism', {
      b: 'The N lone pair attacks the carbon of an alkyl halide (**SN2**), displacing X⁻; loss of H⁺ gives the next amine. Repeated alkylation leads to 2°, 3° amines and finally a **quaternary ammonium salt**.',
      m: [r`\ce{CH3CH2NH2 + CH3I -> CH3CH2NHCH3 + HI}`, r`\ce{(CH3)3N + CH3I -> (CH3)4N+I-}`],
      v: flow('LR', [['a', 'RNH₂ (lone pair)'], ['b', 'Attacks R′–X (SN2)'], ['c', 'RNH₂R′⁺ X⁻'], ['d', 'Lose H⁺ → RNHR′'], ['e', '… → R₄N⁺X⁻']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']], 'Flow of the alkylation mechanism'),
      n: 'In alkylation the nitrogen lone pair attacks the carbon of an alkyl halide from the back, pushing out the halide ion. The ammonium ion formed loses a proton to give an amine with one more alkyl group, which can react again. With excess alkyl halide the reaction continues until a quaternary ammonium salt forms, with four groups on a positively charged nitrogen.',
    }),
    sl('concept', 'Acylation with mechanism', {
      b: '1° and 2° amines react with **acid chlorides**, **anhydrides** or esters to give **amides** (nucleophilic acyl substitution): the N lone pair adds to the C=O carbon, then Cl⁻ is lost and H⁺ removed (pyridine takes up HCl). 3° amines (no N–H) are not acylated. **Benzoylation** with C₆H₅COCl (Schotten–Baumann, in NaOH) gives benzamides.',
      m: [r`\ce{CH3CH2NH2 + CH3COCl -> CH3CH2NHCOCH3 + HCl}`, r`\ce{C6H5NH2 + C6H5COCl -> C6H5NHCOC6H5 + HCl}`],
      v: flow('LR', [['a', 'RNH₂ attacks C=O of CH₃COCl'], ['b', 'Tetrahedral intermediate'], ['c', 'Cl⁻ leaves'], ['d', 'Lose H⁺ → amide']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow of the acylation mechanism'),
      n: 'In acylation the amine attacks the carbonyl carbon of an acid chloride, forming a tetrahedral intermediate. The chloride ion leaves, re-forming the carbonyl group, and a proton is lost from nitrogen, giving an amide. A base such as pyridine removes the hydrogen chloride. Tertiary amines have no hydrogen on nitrogen to lose, so they do not form amides.',
    }),
    sl('example', 'Worked example: alkylation and acylation products', {
      b: r`**Problem.** Give the products: (a) N-methylethanamine + excess CH₃I; (b) propan-1-amine + ethanoyl chloride; (c) aniline + ethanoic anhydride; (d) triethylamine + ethanoyl chloride.

**(a)** Ethyltrimethylammonium iodide, $\ce{C2H5N(CH3)3+I-}$.

**(b)** N-Propylethanamide, $\ce{CH3CONHCH2CH2CH3}$.

**(c)** Acetanilide (N-phenylethanamide).

**(d)** No amide (3° amine has no N–H).`,
      v: table(['Reactants', 'Product'], [['2° amine + excess CH₃I', 'Quaternary salt'], ['1° amine + CH₃COCl', 'N-Alkylethanamide'], ['Aniline + (CH₃CO)₂O', 'Acetanilide'], ['3° amine + CH₃COCl', 'No amide']], 'Table of products'),
      n: 'With excess iodomethane, the secondary amine is alkylated twice, giving a quaternary ammonium iodide. Primary amines and aniline are acylated to amides, propan-one-amine giving N-propylethanamide and aniline giving acetanilide. Triethylamine has no hydrogen on nitrogen, so it cannot form an amide.',
    }),
    sl('check', 'Quick check: alkylation and acylation', {
      b: 'Predict the product of an amine with an alkyl halide or acid chloride.',
      n: 'Quick check. Excess alkyl halide gives a quaternary salt; only amines with an N–H form amides.',
      chk: 'acyl-mcq',
    }),
    sl('concept', 'Nitrous acid and the carbylamine reaction', {
      b: 'HNO₂ (NaNO₂ + HCl): **1° aliphatic** → alcohol + **N₂ gas**; **1° aromatic** (273–278 K) → **diazonium salt**; **2°** → yellow oily **N-nitrosamine**; **3° aliphatic** → soluble salt (no visible change). **Carbylamine test:** only **1° amines** (aliphatic and aromatic) + CHCl₃ + alcoholic KOH → foul-smelling **isocyanide**.',
      m: [r`\ce{CH3CH2NH2 + HNO2 -> CH3CH2OH + N2 + H2O}`, r`\ce{(CH3)2NH + HNO2 -> (CH3)2NN=O + H2O}`, r`\ce{C6H5NH2 + CHCl3 + 3KOH -> C6H5NC + 3KCl + 3H2O}`],
      v: table(['Amine', 'HNO₂', 'Carbylamine'], [['1° aliphatic', 'N₂ bubbles; alcohol', 'Foul smell'], ['1° aromatic (cold)', 'Diazonium salt', 'Foul smell'], ['2°', 'Yellow oil (nitrosamine)', 'No'], ['3°', 'No visible change', 'No']], 'Table of nitrous acid and carbylamine results'),
      n: 'Nitrous acid, made in the cold from sodium nitrite and hydrochloric acid, reacts differently with each class. Primary aliphatic amines release nitrogen gas and give alcohols; aniline gives a diazonium salt in the cold. Secondary amines give yellow oily nitrosamines. Tertiary aliphatic amines simply form salts. The carbylamine test, with chloroform and alcoholic potassium hydroxide, gives a foul smell only with primary amines.',
    }),
    sl('concept', 'Hinsberg’s test', {
      b: 'Shake the amine with **benzenesulphonyl chloride** (C₆H₅SO₂Cl, Hinsberg’s reagent) and aqueous KOH. **1°:** sulphonamide C₆H₅SO₂NHR has an **acidic N–H** → **dissolves in KOH** (reprecipitates with acid). **2°:** C₆H₅SO₂NR₂ (no N–H) → **insoluble** in KOH. **3°:** **no reaction**.',
      m: [r`\ce{C6H5SO2Cl + CH3CH2NH2 -> C6H5SO2NHCH2CH3 + HCl}`, r`\ce{C6H5SO2Cl + (CH3CH2)2NH -> C6H5SO2N(CH2CH3)2 + HCl}`],
      v: table(['Amine', 'Product with C₆H₅SO₂Cl', 'In KOH'], [['1°', 'N-Alkylsulphonamide', 'Dissolves'], ['2°', 'N,N-Dialkylsulphonamide', 'Insoluble'], ['3°', 'No reaction', '—']], 'Table of Hinsberg results'),
      n: 'In Hinsberg’s test, benzenesulphonyl chloride reacts with primary and secondary amines to form sulphonamides. The product from a primary amine still has a hydrogen on nitrogen, made acidic by the sulphonyl group, so it dissolves in potassium hydroxide. The product from a secondary amine has no such hydrogen and stays insoluble. Tertiary amines do not react at all.',
    }),
    sl('example', 'Worked example: identifying amines', {
      b: r`**Problem.** Three isomers C₄H₁₁N: P gives N₂ with HNO₂; Q gives a yellow oil with HNO₂ and an alkali-insoluble Hinsberg product; R does not react with C₆H₅SO₂Cl. Suggest structures.

**P:** a 1° aliphatic amine, e.g. butan-1-amine.

**Q:** a 2° amine, e.g. N-ethylethanamine (diethylamine).

**R:** a 3° amine, e.g. N,N-dimethylethanamine.`,
      v: table(['Compound', 'Evidence', 'Class'], [['P', 'N₂ with HNO₂', '1°'], ['Q', 'Yellow oil; Hinsberg product insoluble in KOH', '2°'], ['R', 'No Hinsberg reaction', '3°']], 'Table of deductions'),
      n: 'Use the tests in turn. Nitrogen gas with nitrous acid shows a primary aliphatic amine, so P could be butan-one-amine. A yellow oil and an alkali-insoluble sulphonamide show a secondary amine, such as diethylamine. No reaction with benzenesulphonyl chloride shows a tertiary amine, such as N,N-dimethylethanamine. All three have the formula C four H eleven N.',
    }),
    sl('check', 'Quick check: tests', {
      b: 'Use nitrous acid, the carbylamine test or Hinsberg’s test to classify an amine.',
      n: 'Quick check. Only primary amines give the carbylamine smell; secondary amines give alkali-insoluble Hinsberg products.',
      chk: 'test-mcq',
    }),
    sl('concept', 'Aniline: preparation and reactions of –NH₂', {
      b: '**Preparation:** nitrobenzene + **Sn (or Fe) and conc. HCl** → anilinium chloride; NaOH liberates aniline (steam distilled). Industrially Fe/HCl or H₂/Ni. **–NH₂ reactions:** salts with acids (C₆H₅NH₃⁺Cl⁻); acetylation → acetanilide; benzoylation → benzanilide; alkylation → N-methylaniline etc.; carbylamine → phenyl isocyanide; **diazotisation** (NaNO₂/HCl, 273–278 K) → benzenediazonium chloride.',
      m: [r`\ce{C6H5NO2 + 3Sn + 7HCl -> C6H5NH3Cl + 3SnCl2 + 2H2O}`, r`\ce{C6H5NH3Cl + NaOH -> C6H5NH2 + NaCl + H2O}`, r`\ce{C6H5NH2 + NaNO2 + 2HCl ->[273-278 K] C6H5N2Cl + NaCl + 2H2O}`],
      v: table(['Reagent', 'Product'], [['HCl', 'Anilinium chloride'], ['(CH₃CO)₂O', 'Acetanilide'], ['C₆H₅COCl/NaOH', 'Benzanilide'], ['CH₃I', 'N-Methylaniline (→ further)'], ['NaNO₂/HCl, cold', 'Benzenediazonium chloride']], 'Table of reactions of the amino group of aniline'),
      n: 'Aniline is made by reducing nitrobenzene with tin or iron and hydrochloric acid, which gives anilinium chloride; adding sodium hydroxide releases aniline, which is separated by steam distillation. Its amino group forms salts with acids, is acetylated and benzoylated to amides, is alkylated, gives the carbylamine test, and in the cold with nitrous acid forms benzenediazonium chloride.',
    }),
    sl('concept', 'Electrophilic substitution in aniline', {
      b: '–NH₂ strongly **activates** the ring (o/p). **Bromine water** → white ppt of **2,4,6-tribromoaniline** at once. **Nitration:** direct nitration oxidises aniline and, in acid, the **anilinium ion** (meta director) forms, giving much meta product; so –NH₂ is first **acetylated** (moderates activation, protects from oxidation) → nitrate → **4-nitroacetanilide** → hydrolyse → **4-nitroaniline**. **Sulphonation** → **sulphanilic acid** (zwitter ion). No Friedel–Crafts (–NH₂ binds AlCl₃).',
      m: [r`\ce{C6H5NH2 + 3Br2 -> C6H2Br3NH2 + 3HBr}`, r`\ce{C6H5NH2 + (CH3CO)2O -> C6H5NHCOCH3 + CH3COOH}`],
      v: flow('LR', [['a', 'Aniline'], ['b', 'Acetanilide ((CH₃CO)₂O)'], ['c', '4-Nitroacetanilide (HNO₃/H₂SO₄)'], ['d', '4-Nitroaniline (hydrolysis)']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow of controlled nitration of aniline'),
      n: 'The amino group makes the ring so reactive that bromine water gives tribromoaniline immediately. For controlled substitution, the amino group is first acetylated: the acetyl group draws the nitrogen lone pair partly away from the ring, so only one group goes in, mainly para, and the ring is protected from oxidation. Hydrolysis then restores the amino group. Sulphonation gives sulphanilic acid, which exists as a zwitter ion.',
    }),
    sl('example', 'Worked example: making 4-bromoaniline', {
      b: r`**Problem.** Show how aniline can be converted into 4-bromoaniline, and explain why aniline is not simply treated with bromine water.

**Step 1.** Acetylate: aniline + (CH₃CO)₂O → acetanilide.

**Step 2.** Brominate: Br₂ in ethanoic acid → 4-bromoacetanilide (mainly para).

**Step 3.** Hydrolyse (H⁺ or OH⁻, heat) → 4-bromoaniline.

**Reason:** with bromine water the strongly activated ring gives 2,4,6-tribromoaniline immediately.`,
      v: table(['Step', 'Product'], [['Acetylation', 'Acetanilide'], ['Bromination', '4-Bromoacetanilide'], ['Hydrolysis', '4-Bromoaniline']], 'Table of the three steps'),
      n: 'Bromine water would substitute all three activated positions at once. Acetylating the amino group reduces its activating power, so bromination stops at a single bromine, mainly at the para position because the acetamido group is bulky. Hydrolysing the amide then gives back the free amino group in four-bromoaniline.',
    }),
    sl('concept', 'Tests for aniline and uses', {
      b: '**Tests:** carbylamine (foul smell); **azo dye test** — diazotise in the cold, add alkaline 2-naphthol: **orange-red dye**; bleaching powder solution → violet colour; bromine water → white ppt. **Uses:** dyes (azo dyes), drugs (sulpha drugs, paracetamol intermediates), rubber accelerators, polyurethanes.',
      v: table(['Test', 'Aniline', 'Ethanamine'], [['Diazotise (cold) + alkaline 2-naphthol', 'Orange-red dye', 'No dye (N₂ evolved)'], ['Bromine water', 'White ppt', 'No ppt'], ['Carbylamine', 'Foul smell', 'Foul smell'], ['Bleaching powder', 'Violet colour', 'No colour']], 'Table of tests distinguishing aniline from ethanamine'),
      n: 'Aniline and ethanamine are both primary amines, so both give the carbylamine test. To tell them apart, diazotise in the cold and add alkaline two-naphthol: aniline gives an orange-red azo dye, while ethanamine just releases nitrogen. Aniline also gives a white precipitate with bromine water and a violet colour with bleaching powder. Aniline is used to make dyes, drugs and rubber chemicals.',
    }),
    sl('check', 'Quick check: aniline', {
      b: 'Predict a product or test result for aniline.',
      n: 'Quick check. Bromine water gives the tribromo product; acetylation controls substitution; aromatic diazonium salts form in the cold.',
      chk: 'aniline-mcq',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'Alkylation (SN2) → 2°, 3°, quaternary salts; acylation (addition–elimination) → amides (1°, 2° only).',
        'HNO₂: 1° aliphatic → ROH + N₂; aniline → diazonium (cold); 2° → yellow nitrosamine; 3° → salt.',
        'Carbylamine: 1° only; Hinsberg: 1° product soluble in KOH, 2° insoluble, 3° no reaction.',
        'Aniline: from C₆H₅NO₂ (Sn/HCl, then NaOH); Br₂(aq) → tribromoaniline; acetylate before nitration; sulphanilic acid.',
        'Azo dye test (2-naphthol) distinguishes aniline from aliphatic amines.',
      ],
      v: table(['Test', '1°', '2°', '3°'], [['Carbylamine', '+', '−', '−'], ['Hinsberg product in KOH', 'Soluble', 'Insoluble', 'No reaction'], ['HNO₂ (aliphatic)', 'N₂', 'Yellow oil', 'Salt']], 'Summary table of amine tests'),
      n: 'Let us sum up Part 2. Amines are alkylated to higher amines and quaternary salts, and primary and secondary amines are acylated to amides. Nitrous acid, the carbylamine reaction and Hinsberg’s test distinguish primary, secondary and tertiary amines. Aniline is made from nitrobenzene; its strongly activated ring is brominated at once, so it is acetylated before controlled substitution.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'For Hinsberg, explain why the 1° sulphonamide dissolves in KOH (acidic N–H).',
        'State temperature 273–278 K for diazotising aniline.',
        'Give two reasons for acetylating aniline before nitration.',
        'Carbylamine works for 1° aromatic and aliphatic amines.',
      ],
      v: table(['Slip', 'Fix'], [['2° amines give carbylamine', 'Only 1°'], ['Nitration of aniline gives only para', 'Much meta (anilinium) unless protected'], ['3° amines form amides', 'No N–H: no amide']], 'Table of three common slips in Part 2 and fixes'),
      n: 'Final tips. In the Hinsberg test, explain the solubility using the acidic hydrogen on nitrogen. Give the temperature for diazotisation. When asked why aniline is acetylated before nitration, mention both protection from oxidation and control of the substitution. And remember the carbylamine test is given only by primary amines.',
    }),
  ],
});
