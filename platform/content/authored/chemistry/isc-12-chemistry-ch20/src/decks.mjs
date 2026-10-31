// ISC 12 Chemistry ch20 Cyanides, Isocyanides and Diazonium Salts — two decks: Part 1 (t01–t02) preparation and
// comparison of cyanides and isocyanides; preparation and stability of diazonium salts; Part 2 (t03–t04) replacement
// reactions (Sandmeyer, Gattermann, Balz–Schiemann, –H, –OH, –NO₂), coupling reactions and synthetic importance.
import { sl, deck, table, flow, r } from './lib.mjs';

export const deck1 = deck({
  part: 1,
  title: 'Cyanides, Isocyanides and Diazonium Salts — Part 1: Cyanides, isocyanides and making diazonium salts',
  goals: [
    'Write equations for preparing alkyl cyanides from alkyl halides and amides',
    'Write equations for preparing isocyanides from alkyl halides and primary amines',
    'Compare cyanides and isocyanides',
    'Write the diazotisation equation and explain why it is carried out at 273–278 K',
  ],
  slides: [
    sl('title', 'C≡N compounds and diazonium salts', {
      b: 'Part 1 — two isomeric functional groups, –C≡N and –N≡C, and the versatile diazonium ion ArN₂⁺.',
      v: table(['Compound', 'Where it matters'], [['Propenenitrile (acrylonitrile)', 'Acrylic fibres (Orlon)'], ['Ethanenitrile', 'Laboratory solvent'], ['Isocyanides', 'Foul smell: test for primary amines'], ['Benzenediazonium salts', 'Azo dyes, synthesis of many aromatic compounds']], 'Table of cyanides, isocyanides and diazonium salts and their uses'),
      n: 'Namaste! Acrylic fibres in sweaters are made from a nitrile, a compound with a carbon–nitrogen triple bond. Its isomer, the isocyanide, has one of the worst smells in chemistry. And diazonium salts, made from aniline in ice, are the gateway to dozens of aromatic compounds and to azo dyes. In this part we prepare and compare these compounds.',
    }),
    sl('concept', 'Structure and names', {
      b: '**Alkyl cyanides (nitriles)** R–C≡N: carbon of the CN group is bonded to R. IUPAC: **alkanenitrile**, counting the CN carbon (CH₃CN ethanenitrile). **Alkyl isocyanides** R–N≡C (R–N⁺≡C⁻): nitrogen bonded to R; named **isocyanoalkanes** (CH₃NC isocyanomethane, methyl isocyanide). They are **functional isomers**.',
      v: table(['Formula', 'Common name', 'IUPAC name'], [['CH₃CN', 'Methyl cyanide', 'Ethanenitrile'], ['CH₃CH₂CN', 'Ethyl cyanide', 'Propanenitrile'], ['C₆H₅CN', 'Phenyl cyanide', 'Benzonitrile'], ['CH₃NC', 'Methyl isocyanide', 'Isocyanomethane'], ['C₂H₅NC', 'Ethyl isocyanide', 'Isocyanoethane'], ['C₆H₅NC', 'Phenyl isocyanide', 'Isocyanobenzene']], 'Table of names of cyanides and isocyanides'),
      n: 'In a nitrile, the alkyl group is attached to the carbon of a carbon–nitrogen triple bond; in an isocyanide, it is attached to the nitrogen. Nitriles are named by counting the nitrile carbon in the chain: methyl cyanide is ethanenitrile. Isocyanides are named as isocyano alkanes. The two are isomers with the same formula but different properties.',
    }),
    sl('concept', 'Preparation of cyanides', {
      b: '**From alkyl halides:** heat with **ethanolic KCN or NaCN** (ionic; attack through C) → nitrile (one more C). **From amides:** dehydration with **P₂O₅** (or SOCl₂, POCl₃) on heating.',
      m: [r`\ce{CH3CH2CH2Br + KCN -> CH3CH2CH2CN + KBr}`, r`\ce{CH3CH2CONH2 ->[P2O5][\Delta] CH3CH2CN + H2O}`],
      v: table(['Starting compound', 'Reagent', 'Product'], [['1-Bromopropane', 'KCN, ethanol, heat', 'Butanenitrile'], ['Propanamide', 'P₂O₅, heat', 'Propanenitrile'], ['Benzamide', 'P₂O₅, heat', 'Benzonitrile'], ['Benzenediazonium chloride', 'CuCN (Sandmeyer)', 'Benzonitrile']], 'Table of preparations of cyanides'),
      n: 'Nitriles are made by heating an alkyl halide with potassium cyanide in ethanol. Cyanide is ambident, but in the ionic salt the carbon end attacks, so a nitrile forms, with one more carbon than the halide. Nitriles are also made by removing water from amides with phosphorus pentoxide. Aromatic nitriles such as benzonitrile come from benzamide or from diazonium salts.',
    }),
    sl('concept', 'Preparation of isocyanides', {
      b: '**From alkyl halides:** heat with **AgCN** (covalent Ag–C bond; attack through N) → isocyanide. **From primary amines:** **carbylamine reaction** — warm with CHCl₃ and alcoholic KOH.',
      m: [r`\ce{CH3CH2I + AgCN -> CH3CH2NC + AgI}`, r`\ce{CH3NH2 + CHCl3 + 3KOH -> CH3NC + 3KCl + 3H2O}`],
      v: table(['Starting compound', 'Reagent', 'Product'], [['Iodoethane', 'AgCN, heat', 'Isocyanoethane'], ['Methanamine', 'CHCl₃ + alc. KOH', 'Isocyanomethane'], ['Aniline', 'CHCl₃ + alc. KOH', 'Isocyanobenzene']], 'Table of preparations of isocyanides'),
      n: 'Isocyanides are formed when an alkyl halide is heated with silver cyanide. The silver–carbon bond is largely covalent, leaving only the nitrogen lone pair free to attack, so the alkyl group ends up on nitrogen. Primary amines, both aliphatic and aromatic, give isocyanides when warmed with chloroform and alcoholic potassium hydroxide: the carbylamine reaction, recognised by its foul smell.',
    }),
    sl('example', 'Worked example: KCN or AgCN?', {
      b: r`**Problem.** 1-Bromobutane is heated separately with (a) ethanolic KCN and (b) AgCN. Name the products and explain the difference. (c) How else could the product of (b) be obtained?

**(a)** $\ce{CH3(CH2)3CN}$, pentanenitrile — ionic CN⁻ attacks through C.

**(b)** $\ce{CH3(CH2)3NC}$, 1-isocyanobutane — in covalent AgCN only the N lone pair is free.

**(c)** Butan-1-amine + CHCl₃ + alcoholic KOH (carbylamine reaction).`,
      v: table(['Reagent', 'Bonding', 'Attacking atom', 'Product'], [['KCN', 'Ionic', 'C', 'Nitrile'], ['AgCN', 'Covalent', 'N', 'Isocyanide']], 'Table comparing KCN and AgCN'),
      n: 'Potassium cyanide is ionic, so the free cyanide ion attacks through carbon, the more nucleophilic end, and pentanenitrile forms. Silver cyanide is largely covalent, with silver bonded to carbon, so only the nitrogen lone pair is available, and one-isocyanobutane forms. The same isocyanide can be made from butan-one-amine by the carbylamine reaction.',
    }),
    sl('check', 'Quick check: cyanide or isocyanide?', {
      b: 'Predict whether a nitrile or an isocyanide forms.',
      n: 'Quick check. Ionic cyanides give nitriles; silver cyanide and the carbylamine reaction give isocyanides.',
      chk: 'kcn-mcq',
    }),
    sl('concept', 'Comparing cyanides and isocyanides', {
      b: 'The two isomers behave differently.',
      m: [r`\ce{CH3CN + 2H2O + HCl -> CH3COOH + NH4Cl}`, r`\ce{CH3NC + 2H2O ->[H+] CH3NH2 + HCOOH}`],
      v: table(['Property', 'Cyanide R–C≡N', 'Isocyanide R–N≡C'], [['Smell', 'Pleasant (lower members)', 'Very unpleasant'], ['Polarity / b.p.', 'More polar, higher b.p.', 'Less polar, lower b.p.'], ['Acid hydrolysis', 'RCOOH + NH₄⁺', 'RNH₂ + HCOOH'], ['Reduction (H₂/Ni, LiAlH₄)', '1° amine RCH₂NH₂', '2° amine RNHCH₃'], ['On heating', 'Stable', 'Isomerises to cyanide']], 'Table comparing cyanides and isocyanides'),
      n: 'Nitriles have pleasant smells and are more polar, so they boil higher than isocyanides, which smell terrible. Their hydrolysis products differ: a nitrile gives a carboxylic acid and ammonium ions, while an isocyanide gives a primary amine and methanoic acid. On reduction, a nitrile gives a primary amine and an isocyanide a secondary amine. On heating, isocyanides rearrange into the more stable nitriles.',
    }),
    sl('example', 'Worked example: hydrolysis and reduction products', {
      b: r`**Problem.** Give the products when (a) propanenitrile and (b) isocyanoethane are each (i) hydrolysed with dilute acid and (ii) reduced with LiAlH₄.

**(a)(i)** Propanoic acid + NH₄⁺. **(a)(ii)** Propan-1-amine, $\ce{CH3CH2CH2NH2}$.

**(b)(i)** Ethanamine + methanoic acid. **(b)(ii)** N-Methylethanamine, $\ce{CH3CH2NHCH3}$.`,
      v: table(['Compound', 'Hydrolysis', 'Reduction'], [['CH₃CH₂CN', 'CH₃CH₂COOH', 'CH₃CH₂CH₂NH₂ (1°)'], ['CH₃CH₂NC', 'CH₃CH₂NH₂ + HCOOH', 'CH₃CH₂NHCH₃ (2°)']], 'Table of products'),
      n: 'Both compounds contain three carbons and one nitrogen, but the products differ because the alkyl group is on carbon in one and on nitrogen in the other. Hydrolysis of the nitrile keeps all three carbons in propanoic acid, while the isocyanide splits into ethanamine and methanoic acid. Reduction gives a primary amine from the nitrile and a secondary amine from the isocyanide.',
    }),
    sl('check', 'Quick check: comparing the isomers', {
      b: 'Identify a property or product that distinguishes a cyanide from an isocyanide.',
      n: 'Quick check. Think of the hydrolysis and reduction products, and the smell.',
      chk: 'compare-mcq',
    }),
    sl('concept', 'Preparation of benzenediazonium chloride', {
      b: r`**Diazotisation:** aniline in excess dilute HCl is treated with cold aqueous **NaNO₂** at **273–278 K** (ice). Nitrous acid is formed in situ and converts –NH₂ into –N₂⁺. Excess nitrous acid is shown by starch–iodide paper turning blue.`,
      m: [r`\ce{NaNO2 + HCl -> HNO2 + NaCl}`, r`\ce{C6H5NH2 + HNO2 + HCl ->[273-278 K] C6H5N2Cl + 2H2O}`],
      v: flow('LR', [['a', 'Aniline + excess HCl (ice bath)'], ['b', 'Add cold NaNO₂ solution slowly'], ['c', 'HNO₂ formed in situ'], ['d', 'C₆H₅N₂⁺Cl⁻ (use at once)']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow of diazotisation'),
      n: 'To make benzenediazonium chloride, aniline is dissolved in excess hydrochloric acid and cooled in ice, and a cold solution of sodium nitrite is added slowly. Nitrous acid forms in the mixture and converts the amino group into the diazonium group. The temperature is kept between two hundred and seventy three and two hundred and seventy eight kelvin, and the solution is used at once.',
    }),
    sl('concept', 'Stability of diazonium salts', {
      b: 'Arenediazonium ions are stabilised by **resonance** with the ring (positive charge delocalised), so they survive in cold solution. Above about 278 K they decompose (giving phenol and N₂); dry salts are **explosive**. Alkanediazonium ions have no such resonance and decompose at once, releasing N₂.',
      v: table(['Ion', 'Stability', 'Reason'], [['C₆H₅N₂⁺ (cold, aqueous)', 'Stable for a short time', 'Resonance with ring'], ['C₆H₅N₂⁺ (warm)', 'Decomposes: phenol + N₂', 'N₂ is a very stable leaving group'], ['CH₃CH₂N₂⁺', 'Decomposes at once', 'No resonance'], ['Dry ArN₂⁺Cl⁻', 'Explosive', 'Never isolated dry']], 'Table of diazonium ion stability'),
      n: 'An aromatic diazonium ion is stabilised because its positive charge can spread into the benzene ring. Even so, it is stable only in cold solution; on warming, nitrogen gas, an extremely stable molecule, is released and phenol forms. Aliphatic diazonium ions have no such stabilisation and break down immediately. Dry diazonium salts can explode, so they are always kept in solution.',
    }),
    sl('check', 'Quick check: diazotisation', {
      b: 'Answer a question about the conditions or stability in diazotisation.',
      n: 'Quick check. Low temperature and use at once; aromatic diazonium ions are stabilised by resonance.',
      chk: 'diazo-mcq',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Nitriles R–C≡N (alkanenitriles); isocyanides R–N≡C (isocyanoalkanes); functional isomers.',
        'Nitriles: RX + KCN; amides + P₂O₅. Isocyanides: RX + AgCN; 1° amines + CHCl₃/KOH.',
        'Hydrolysis: nitrile → acid; isocyanide → amine + HCOOH. Reduction: 1° vs 2° amine.',
        'Diazotisation: ArNH₂ + NaNO₂/HCl at 273–278 K → ArN₂⁺Cl⁻; resonance-stabilised; use at once.',
      ],
      v: table(['Reagent with RX', 'Product'], [['KCN', 'Nitrile'], ['AgCN', 'Isocyanide']], 'Summary table'),
      n: 'Let us sum up Part 1. Nitriles and isocyanides are isomers, differing in which atom carries the alkyl group. Potassium cyanide gives nitriles and silver cyanide gives isocyanides; amides give nitriles on dehydration, and primary amines give isocyanides in the carbylamine reaction. Their hydrolysis and reduction products are different. Aniline is diazotised in the cold to give a diazonium salt that is used at once.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'Count carbons when naming nitriles (CH₃CN is ethanenitrile).',
        'Explain KCN vs AgCN with ionic vs covalent bonding.',
        'Give 273–278 K and the reason (decomposition) for diazotisation.',
        'Isocyanide hydrolysis gives methanoic acid, not ethanoic acid.',
      ],
      v: table(['Slip', 'Fix'], [['CH₃CN = methanenitrile', 'Ethanenitrile'], ['AgCN gives nitrile', 'Gives isocyanide'], ['Diazotise at room temperature', '273–278 K']], 'Table of three common slips in Part 1 and fixes'),
      n: 'Some tips. Count the nitrile carbon when naming. Explain the different products of potassium and silver cyanide by their bonding. Give the temperature and reason for diazotisation. And remember that hydrolysis of an isocyanide gives an amine and methanoic acid.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Cyanides, Isocyanides and Diazonium Salts — Part 2: Reactions of diazonium salts',
  goals: [
    'Write equations for converting benzenediazonium chloride into halobenzenes, phenol, benzene and nitrobenzene',
    'Write equations for azo coupling with phenol and aniline and identify the coloured products',
    'Plan syntheses that use a diazonium salt intermediate',
  ],
  slides: [
    sl('title', 'The diazonium toolkit', {
      b: 'Part 2 — replacing –N₂⁺ by other groups, and coupling to make azo dyes.',
      v: flow('LR', [['a', 'ArNH₂'], ['b', 'ArN₂⁺Cl⁻ (273–278 K)'], ['c', 'Replacement: –Cl, –Br, –I, –F, –CN, –H, –OH, –NO₂'], ['d', 'Coupling: Ar–N=N–Ar′ (azo dyes)']], [['a', 'b'], ['b', 'c'], ['b', 'd']], 'Flow of diazonium reactions'),
      n: 'The diazonium group is a superb leaving group, because it departs as nitrogen gas. That lets us replace it with halogens, a cyanide group, hydrogen, hydroxyl or nitro groups, often giving products that cannot be made directly. Alternatively, the diazonium ion can keep its nitrogens and attack a phenol or an amine, forming brightly coloured azo dyes.',
    }),
    sl('concept', 'Sandmeyer and Gattermann reactions', {
      b: '**Sandmeyer:** copper(I) salts — **CuCl/HCl → ArCl; CuBr/HBr → ArBr; CuCN/KCN → ArCN**. **Gattermann:** freshly prepared **copper powder** with HCl or HBr → ArCl or ArBr (lower yields).',
      m: [r`\ce{C6H5N2Cl ->[CuCl/HCl] C6H5Cl + N2}`, r`\ce{C6H5N2Cl + CuCN -> C6H5CN + N2 + CuCl}`, r`\ce{C6H5N2Cl + HBr ->[Cu] C6H5Br + N2 + HCl}`],
      v: table(['Reagent', 'Product', 'Name'], [['CuCl/HCl', 'Chlorobenzene', 'Sandmeyer'], ['CuBr/HBr', 'Bromobenzene', 'Sandmeyer'], ['CuCN/KCN', 'Benzonitrile', 'Sandmeyer'], ['Cu + HCl', 'Chlorobenzene', 'Gattermann'], ['Cu + HBr', 'Bromobenzene', 'Gattermann']], 'Table of Sandmeyer and Gattermann reactions'),
      n: 'In the Sandmeyer reaction, copper one chloride, bromide or cyanide replaces the diazonium group by chlorine, bromine or a cyanide group. In the Gattermann reaction, copper powder with the hydrogen halide does the same job for chlorine and bromine, usually with lower yields. Nitrogen gas bubbles off in every case.',
    }),
    sl('concept', 'Iodide, fluoride, hydrogen, hydroxyl and nitro groups', {
      b: '**KI:** warm → **iodobenzene**. **Balz–Schiemann:** HBF₄ → ArN₂⁺BF₄⁻ (stable solid), heat → **fluorobenzene** + BF₃ + N₂. **–H:** hypophosphorous acid (H₃PO₂) or ethanol → **benzene**. **–OH:** warm with water → **phenol**. **–NO₂:** ArN₂⁺BF₄⁻ + NaNO₂, Cu, heat → **nitrobenzene**.',
      m: [r`\ce{C6H5N2Cl + KI -> C6H5I + KCl + N2}`, r`\ce{C6H5N2BF4 ->[\Delta] C6H5F + BF3 + N2}`, r`\ce{C6H5N2Cl + H3PO2 + H2O -> C6H6 + N2 + H3PO3 + HCl}`, r`\ce{C6H5N2BF4 + NaNO2 ->[Cu][\Delta] C6H5NO2 + N2 + NaBF4}`],
      v: table(['Reagent', 'Product'], [['KI (warm)', 'Iodobenzene'], ['HBF₄, then heat', 'Fluorobenzene'], ['H₃PO₂ or CH₃CH₂OH', 'Benzene'], ['H₂O, warm', 'Phenol'], ['NaNO₂/Cu on ArN₂BF₄', 'Nitrobenzene']], 'Table of other replacement reactions'),
      n: 'Iodide ions replace the diazonium group simply on warming. Fluorine is introduced by the Balz–Schiemann reaction: the fluoroborate salt is precipitated and then heated. Hypophosphorous acid or ethanol replaces the group by hydrogen, which is useful for removing an amino group after it has done its job. Warming with water gives phenol, and sodium nitrite with copper converts the fluoroborate into nitrobenzene.',
    }),
    sl('example', 'Worked example: replacement products', {
      b: r`**Problem.** 4-Methylbenzenediazonium chloride is treated with (a) CuBr/HBr; (b) HBF₄, then heat; (c) H₃PO₂; (d) warm water; (e) CuCN/KCN. Name the products.

**(a)** 4-Bromotoluene. **(b)** 4-Fluorotoluene. **(c)** Toluene.

**(d)** 4-Methylphenol (p-cresol). **(e)** 4-Methylbenzonitrile.`,
      v: table(['Reagent', 'Group introduced', 'Product'], [['CuBr/HBr', '–Br', '4-Bromotoluene'], ['HBF₄; heat', '–F', '4-Fluorotoluene'], ['H₃PO₂', '–H', 'Toluene'], ['H₂O, warm', '–OH', '4-Methylphenol'], ['CuCN/KCN', '–CN', '4-Methylbenzonitrile']], 'Table of products from 4-methylbenzenediazonium chloride'),
      n: 'In each case the new group takes the exact position of the diazonium group, para to the methyl group. Copper one bromide gives four-bromotoluene; the Balz–Schiemann route gives four-fluorotoluene; hypophosphorous acid removes the group to leave toluene; warm water gives para-cresol; and copper one cyanide gives four-methylbenzonitrile.',
    }),
    sl('check', 'Quick check: replacement reactions', {
      b: 'Choose the reagent that introduces a given group in place of –N₂⁺.',
      n: 'Quick check. Copper salts for chlorine, bromine and cyanide; potassium iodide; fluoroborate for fluorine; hypophosphorous acid for hydrogen.',
      chk: 'replace-mcq',
    }),
    sl('concept', 'Coupling with phenol', {
      b: 'In **mildly alkaline** solution (pH ≈ 9–10), the diazonium ion (a weak electrophile) attacks the strongly activated **phenoxide** ion at the **para** position: **4-hydroxyazobenzene** (orange). With **2-naphthol** an orange-red dye forms (test for aromatic 1° amines).',
      m: [r`\ce{C6H5N2Cl + C6H5OH + NaOH -> HOC6H4N=NC6H5 + NaCl + H2O}`],
      v: table(['Coupling partner', 'Conditions', 'Product', 'Colour'], [['Phenol', 'NaOH, 273–278 K', '4-Hydroxyazobenzene', 'Orange'], ['2-Naphthol', 'NaOH, cold', '1-Phenylazo-2-naphthol', 'Orange-red'], ['Aniline', 'Mildly acidic, cold', '4-Aminoazobenzene', 'Yellow']], 'Table of coupling reactions'),
      n: 'The diazonium ion is only a weak electrophile, so it reacts only with very activated rings. In mildly alkaline solution, phenol is present as the phenoxide ion, which is even more strongly activated, and coupling occurs at the para position to give orange four-hydroxyazobenzene. Two-naphthol gives an orange-red dye, the classic test for aniline.',
    }),
    sl('concept', 'Coupling with aniline', {
      b: 'In **mildly acidic** solution (pH ≈ 4–5), aniline couples at the **para** position to give **4-aminoazobenzene** (yellow; “aniline yellow”). Too acidic: aniline becomes anilinium (deactivated); too alkaline: the diazonium ion is converted to non-electrophilic species. The –N=N– **azo** group links two rings in a conjugated system, which is why azo compounds are **coloured**.',
      m: [r`\ce{C6H5N2Cl + C6H5NH2 -> H2NC6H4N=NC6H5 + HCl}`],
      v: flow('LR', [['a', 'ArN₂⁺ (weak electrophile)'], ['b', 'Attacks para C of activated ring'], ['c', 'Ar–N=N–Ar′ (extended conjugation)'], ['d', 'Absorbs visible light: dye']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow of azo coupling'),
      n: 'Aniline couples with the diazonium ion in slightly acidic solution, again at the para position, giving yellow four-aminoazobenzene. The pH matters: in strong acid, aniline is protonated and its ring deactivated; in strong alkali, the diazonium ion is destroyed. The azo group links two benzene rings in a long conjugated system, which absorbs visible light, so azo compounds are coloured and many are used as dyes.',
    }),
    sl('example', 'Worked example: coupling products', {
      b: r`**Problem.** Give the product and conditions for coupling benzenediazonium chloride with (a) phenol, (b) N,N-dimethylaniline and (c) 2-naphthol. Why does coupling occur at the para position?

**(a)** Alkaline, cold: 4-hydroxyazobenzene (orange).

**(b)** Mildly acidic, cold: 4-(dimethylamino)azobenzene (butter yellow).

**(c)** Alkaline, cold: 1-phenylazo-2-naphthol (orange-red).

**Para:** activated by –OH or –NR₂, and less hindered than ortho.`,
      v: table(['Partner', 'pH', 'Product'], [['Phenol', 'Alkaline', '4-Hydroxyazobenzene'], ['N,N-Dimethylaniline', 'Mildly acidic', '4-(Dimethylamino)azobenzene'], ['2-Naphthol', 'Alkaline', '1-Phenylazo-2-naphthol']], 'Table of coupling products'),
      n: 'Phenols couple in alkaline solution and amines in mildly acidic solution. With phenol and with N,N-dimethylaniline, the azo group enters para to the activating group, because that position is activated and less crowded than the ortho positions. With two-naphthol, coupling occurs at position one, next to the hydroxyl group, giving an orange-red dye.',
    }),
    sl('check', 'Quick check: coupling', {
      b: 'Predict the product or conditions of an azo coupling.',
      n: 'Quick check. Phenols couple in alkali, amines in mild acid; the azo group goes para.',
      chk: 'couple-mcq',
    }),
    sl('concept', 'Importance in synthesis', {
      b: 'Diazonium salts let us introduce groups that **cannot be put directly** on the ring (F, I, CN, OH) and place groups in positions that **direct substitution would not give**: an –NH₂ group is used to direct substitution and then removed (–N₂⁺ → –H).',
      v: table(['Target', 'Route via ArN₂⁺'], [['1,3,5-Tribromobenzene', 'Aniline → Br₂(aq) → 2,4,6-tribromoaniline → diazotise → H₃PO₂'], ['3-Bromotoluene', '4-Methylaniline → acetylate → brominate (ortho to NHCOCH₃) → hydrolyse → diazotise → H₃PO₂'], ['Fluorobenzene', 'Aniline → diazotise → HBF₄ → heat'], ['Benzoic acid', 'Aniline → diazotise → CuCN → hydrolyse']], 'Table of syntheses using diazonium salts'),
      n: 'Diazonium salts make many syntheses possible. Fluorine, iodine and cyanide groups cannot be put on a benzene ring directly, but they can replace a diazonium group. And an amino group can be used as a temporary director: for example, aniline is brominated at all three activated positions, and then the amino group is removed, giving one-three-five-tribromobenzene, a pattern impossible by direct bromination of benzene.',
    }),
    sl('example', 'Worked example: 1,3,5-tribromobenzene from aniline', {
      b: r`**Problem.** Show how 1,3,5-tribromobenzene can be made from aniline.

**Step 1.** Bromine water: $\ce{C6H5NH2 + 3Br2 -> C6H2Br3NH2 + 3HBr}$ (2,4,6-tribromoaniline).

**Step 2.** Diazotise: NaNO₂ + HCl, 273–278 K → 2,4,6-tribromobenzenediazonium chloride.

**Step 3.** H₃PO₂ (or ethanol): –N₂⁺ → –H, giving 1,3,5-tribromobenzene.`,
      v: flow('LR', [['a', 'Aniline'], ['b', '2,4,6-Tribromoaniline'], ['c', 'Diazonium salt'], ['d', '1,3,5-Tribromobenzene']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow of the tribromobenzene synthesis'),
      n: 'The amino group directs the three bromines to the two ortho and the para positions, which are meta to each other. Then the amino group is converted into a diazonium group and removed with hypophosphorous acid, leaving three bromines in the one, three and five positions. Direct bromination of benzene could never give this arrangement.',
    }),
    sl('check', 'Quick check: synthesis', {
      b: 'Choose a diazonium-based route to a target compound.',
      n: 'Quick check. Use the amino group to place substituents, then replace or remove the diazonium group.',
      chk: 'synth-mcq',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'Sandmeyer: CuCl/HCl, CuBr/HBr, CuCN/KCN; Gattermann: Cu + HX.',
        'KI → ArI; HBF₄ then heat → ArF (Balz–Schiemann); H₃PO₂ or ethanol → ArH; H₂O → ArOH; ArN₂BF₄ + NaNO₂/Cu → ArNO₂.',
        'Coupling (para): phenols in alkali → hydroxyazo dyes; amines in mild acid → aminoazo dyes; colour from conjugated –N=N–.',
        'Synthetic value: groups not introducible directly; –NH₂ as removable director.',
      ],
      v: table(['Replacement', 'Reagent'], [['–Cl / –Br', 'CuX/HX'], ['–I', 'KI'], ['–F', 'HBF₄, heat'], ['–H', 'H₃PO₂'], ['–OH', 'H₂O, warm']], 'Summary table of replacements'),
      n: 'Let us sum up Part 2. The diazonium group can be replaced by chlorine, bromine and cyanide using copper salts, by iodine with potassium iodide, by fluorine via the fluoroborate, by hydrogen with hypophosphorous acid, by hydroxyl with warm water and by a nitro group. Or it can couple with phenols and amines to give coloured azo compounds. Together these make diazonium salts essential in aromatic synthesis.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'Distinguish Sandmeyer (Cu(I) salts) from Gattermann (Cu powder).',
        'Give pH conditions for coupling with phenol (alkaline) and aniline (mildly acidic).',
        'For multistep syntheses, give every reagent and intermediate.',
        'Balz–Schiemann needs the fluoroborate salt to be heated.',
      ],
      v: table(['Slip', 'Fix'], [['KI with Cu needed', 'KI alone (warm)'], ['Phenol couples in acid', 'Couples in alkali'], ['H₃PO₂ gives phenol', 'Gives benzene']], 'Table of three common slips in Part 2 and fixes'),
      n: 'Final tips. Keep the Sandmeyer and Gattermann reagents apart. Give the pH for coupling reactions. In multistep syntheses, show every reagent and intermediate. And remember that hypophosphorous acid replaces the diazonium group by hydrogen, while warm water gives phenol.',
    }),
  ],
});
