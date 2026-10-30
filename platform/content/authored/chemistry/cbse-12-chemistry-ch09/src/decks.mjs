// ch09 Amines — two decks: Part 1 (t01–t03) structure, classification, naming, preparation, physical properties
// and basicity; Part 2 (t04–t05) reactions of amines and diazonium salts.
import { sl, deck, table, flow, svgV, r } from './lib.mjs';
import { PYRAMID, ANILINE } from './svgs.mjs';

export const V = {
  pyramid: svgV(PYRAMID, 'Pyramidal trimethylamine with an sp³ nitrogen, a lone pair at the top and a C–N–C angle of about 108 degrees'),
  aniline: svgV(ANILINE, 'Three resonance structures of aniline showing the nitrogen lone pair delocalised into the ring, with negative charge at the ortho and para carbons'),
};

export const deck1 = deck({
  part: 1,
  title: 'Amines — Part 1: Structure, preparation and basicity',
  goals: [
    'Classify and name amines and describe the structure of the amino group',
    'Write preparations of amines by reduction, ammonolysis, Gabriel phthalimide synthesis and Hoffmann bromamide degradation',
    'Explain the physical properties of amines',
    'Compare the basic strength of aliphatic and aromatic amines using inductive, solvation, steric and resonance effects',
  ],
  slides: [
    sl('title', 'Amines', {
      b: 'Part 1 — organic relatives of ammonia: what they are, how they are made and why they are bases.',
      v: table(['Compound', 'Where you meet it'], [['Trimethylamine', 'Smell of fish'], ['Putrescine, cadaverine', 'Smell of decaying matter'], ['Adrenaline (an amine)', 'Hormone of the fight-or-flight response'], ['Aniline', 'Starting material for dyes and drugs'], ['Novocaine (procaine)', 'Local anaesthetic']], 'Table of familiar amines and where they are met'),
      n: 'Namaste! The smell of fish, the hormone adrenaline, local anaesthetics used by dentists and the colourful azo dyes in our clothes all involve amines. Amines are derived from ammonia by replacing one, two or three hydrogen atoms with alkyl or aryl groups. In this part we classify and name them, see how they are made, and explain why they behave as bases.',
    }),
    sl('concept', 'Classification and naming', {
      b: 'Replacing one, two or three H of NH₃ gives **primary (RNH₂), secondary (R₂NH)** and **tertiary (R₃N)** amines. IUPAC names: **alkanamine** (ethanamine), with **N-** for groups on nitrogen (N-methylethanamine, N,N-dimethylmethanamine). Aryl amines are named as **benzenamines** (aniline = benzenamine).',
      v: table(['Structure', 'Class', 'IUPAC name'], [[r`$\ce{CH3CH2NH2}$`, 'Primary', 'Ethanamine'], [r`$\ce{CH3NHCH2CH3}$`, 'Secondary', 'N-Methylethanamine'], [r`$\ce{(CH3)3N}$`, 'Tertiary', 'N,N-Dimethylmethanamine'], [r`$\ce{H2NCH2CH2NH2}$`, 'Primary (diamine)', 'Ethane-1,2-diamine'], [r`$\ce{C6H5NH2}$`, 'Primary aryl', 'Benzenamine (aniline)'], [r`$\ce{C6H5N(CH3)2}$`, 'Tertiary', 'N,N-Dimethylbenzenamine']], 'Table of amines with their class and IUPAC name'),
      n: 'Amines are classified by how many carbon groups are attached to nitrogen: one for primary, two for secondary, three for tertiary. Note that this is different from alcohols, where the class depends on the carbon atom. In IUPAC names, the parent chain becomes an alkanamine, and groups attached to nitrogen are shown with a capital N, as in N-methylethanamine. Aniline is named benzenamine.',
    }),
    sl('diagram', 'Structure of amines', {
      b: 'Nitrogen is **sp³** hybridised: three σ bonds and a **lone pair** give a **pyramidal** shape; the C–N–C angle (about 108°) is a little less than tetrahedral. In aniline the lone pair is partly delocalised into the ring.',
      v: V.pyramid,
      n: 'In amines, nitrogen uses four sp three hybrid orbitals: three form bonds and the fourth holds a lone pair. The molecule is therefore a flat-topped pyramid, like ammonia, with angles a little less than tetrahedral because the lone pair pushes the bonds together. That lone pair is the key to amine chemistry: it makes amines bases and nucleophiles.',
    }),
    sl('example', 'Worked example: classify and name', {
      b: r`**Problem.** Classify and name (a) $\ce{CH3CH(NH2)CH3}$, (b) $\ce{(C2H5)2NH}$, (c) $\ce{C6H5NHCH3}$, (d) $\ce{CH3CH2CH2N(CH3)2}$.

**(a)** Propan-2-amine — primary (one C on N).

**(b)** N-Ethylethanamine — secondary.

**(c)** N-Methylbenzenamine — secondary.

**(d)** N,N-Dimethylpropan-1-amine — tertiary.`,
      v: flow('LR', [['a', 'Count carbon groups on N'], ['b', '1 → primary, 2 → secondary, 3 → tertiary'], ['c', 'Longest chain on N → alkanamine'], ['d', 'Other groups on N → N- prefixes']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow for classifying and naming amines'),
      n: 'Count the carbon groups on nitrogen. Propan-two-amine has only one, so it is primary, even though the carbon carrying nitrogen is secondary. Diethylamine has two, so it is secondary: N-ethylethanamine. For the last one, the longest chain on nitrogen is propyl, and the two methyl groups on nitrogen give N,N-dimethylpropan-one-amine, a tertiary amine.',
    }),
    sl('check', 'Quick check: classifying amines', {
      b: 'Classify an amine by the number of carbon groups on nitrogen.',
      n: 'Quick check. Remember: for amines, count groups on the nitrogen, not on the carbon.',
      chk: 'classify-mcq',
    }),
    sl('concept', 'Preparation by reduction', {
      b: '**Nitro compounds** are reduced to amines by H₂/Ni, Pt or Pd, or by **Fe/HCl** (preferred: the FeCl₂ formed is hydrolysed, regenerating HCl, so little acid is needed) or Sn/HCl. **Nitriles** are reduced by LiAlH₄ or H₂/Ni (**one carbon more** than the alkyl halide). **Amides** are reduced by LiAlH₄.',
      m: [r`\ce{C6H5NO2 + 3H2 ->[Ni] C6H5NH2 + 2H2O}`, r`\ce{CH3CN + 2H2 ->[Ni] CH3CH2NH2}`],
      v: table(['Starting compound', 'Reagent', 'Product'], [['Nitrobenzene', 'Fe + HCl (or Sn + HCl), then base', 'Aniline'], ['Ethanenitrile', 'LiAlH₄ or H₂/Ni', 'Ethanamine'], ['Ethanamide', 'LiAlH₄, then H₂O', 'Ethanamine'], ['Benzamide', 'LiAlH₄, then H₂O', 'Phenylmethanamine']], 'Table of reductions giving amines from nitro compounds, nitriles and amides'),
      n: 'Reduction is the commonest route to amines. Nitrobenzene is reduced to aniline by hydrogen over nickel, or more usually by scrap iron and hydrochloric acid; the iron two chloride formed reacts with water to regenerate acid, so only a little acid is needed. Nitriles and amides are reduced by lithium aluminium hydride. Note that reducing a nitrile gives an amine with one more carbon than the alkyl halide used to make the nitrile.',
    }),
    sl('concept', 'Ammonolysis and Gabriel synthesis', {
      b: '**Ammonolysis:** alkyl halides react with ammonia, but the primary amine formed reacts further, giving a **mixture** of 1°, 2°, 3° amines and quaternary salts (excess NH₃ favours 1°). **Gabriel phthalimide synthesis** gives **pure primary aliphatic amines**: phthalimide → potassium phthalimide (KOH) → N-alkylphthalimide (RX) → hydrolysis → RNH₂. It cannot make aryl amines (aryl halides do not react).',
      m: [r`\ce{CH3CH2Br + 2NH3 -> CH3CH2NH2 + NH4Br}`],
      v: flow('LR', [['a', 'Phthalimide'], ['b', 'Potassium phthalimide'], ['c', 'N-Alkylphthalimide'], ['d', 'Primary amine RNH₂ + phthalate']], [['a', 'b', 'KOH (ethanolic)'], ['b', 'c', 'R–X'], ['c', 'd', 'NaOH(aq), heat']], 'Flow of the Gabriel phthalimide synthesis from phthalimide to a primary amine'),
      n: 'Heating an alkyl halide with ammonia gives an amine, but the product is itself a nucleophile and keeps reacting, so a mixture forms. The Gabriel synthesis avoids this. Phthalimide is turned into its potassium salt, which is alkylated once only; hydrolysis then releases a pure primary amine. It does not work for aniline, because aryl halides do not undergo nucleophilic substitution.',
    }),
    sl('concept', 'Hoffmann bromamide degradation', {
      b: 'An **amide** heated with **Br₂ and aqueous NaOH** gives a **primary amine with one carbon fewer** (the carbonyl carbon is lost as carbonate).',
      m: [r`\ce{CH3CONH2 + Br2 + 4NaOH -> CH3NH2 + Na2CO3 + 2NaBr + 2H2O}`],
      v: table(['Amide', 'Amine (one C fewer)'], [['Ethanamide', 'Methanamine'], ['Propanamide', 'Ethanamine'], ['Benzamide', 'Aniline']], 'Table of amides and the amines formed by Hoffmann bromamide degradation'),
      n: 'The Hoffmann bromamide reaction is unusual: it shortens the carbon chain. An amide heated with bromine and sodium hydroxide loses its carbonyl carbon as sodium carbonate, and the alkyl or aryl group moves onto nitrogen. So ethanamide gives methanamine, and benzamide gives aniline. This is a useful way to step down a carbon chain.',
    }),
    sl('example', 'Worked example: choosing a preparation', {
      b: r`**Problem.** How would you make (a) pure propan-1-amine from 1-bromopropane; (b) ethanamine from methyl bromide (one carbon more); (c) methanamine from ethanoic acid (one carbon fewer)?

**(a)** Gabriel synthesis: potassium phthalimide + 1-bromopropane, then NaOH(aq).

**(b)** KCN gives $\ce{CH3CN}$; reduce with LiAlH₄ (or H₂/Ni) → $\ce{CH3CH2NH2}$.

**(c)** $\ce{SOCl2}$, then $\ce{NH3}$ → ethanamide; then $\ce{Br2}$ + NaOH (Hoffmann) → $\ce{CH3NH2}$.`,
      v: table(['Need', 'Method', 'Carbon change'], [['Pure 1° amine', 'Gabriel', 'Same'], ['Ascend one carbon', 'Nitrile, then reduce', '+1'], ['Descend one carbon', 'Amide, then Hoffmann', '−1']], 'Table of choosing a method by the carbon change needed'),
      n: 'Choose the method by what the question demands. For a pure primary amine with the same number of carbons, use the Gabriel synthesis. To add a carbon, make the nitrile with potassium cyanide and reduce it. To remove a carbon, make the amide and carry out the Hoffmann bromamide reaction.',
    }),
    sl('check', 'Quick check: preparation', {
      b: 'Pick the method that gives an amine with one carbon fewer than the starting compound.',
      n: 'Quick check. Which reaction loses the carbonyl carbon of an amide as carbonate?',
      chk: 'hoffmann-mcq',
    }),
    sl('concept', 'Physical properties', {
      b: 'Lower amines are gases or volatile liquids with fishy smells. Primary and secondary amines form **N–H···N hydrogen bonds** (weaker than O–H···O), so they boil higher than alkanes but lower than alcohols of similar mass. Tertiary amines have no N–H, so isomeric amines boil in the order **1° > 2° > 3°**. Lower amines are water-soluble.',
      v: table(['Compound (C₃H₉N)', 'Class', 'Boiling point / K'], [['Propan-1-amine', 'Primary', '321'], ['N-Methylethanamine', 'Secondary', '310'], ['N,N-Dimethylmethanamine', 'Tertiary', '276']], 'Table of boiling points of three isomeric amines with formula C3H9N'),
      n: 'Amines with N–H bonds can hydrogen-bond to one another, though less strongly than alcohols, because nitrogen is less electronegative than oxygen. Primary amines have two N–H hydrogens, secondary amines one and tertiary amines none, so among isomers the boiling point falls from primary to tertiary. Small amines dissolve in water because they hydrogen-bond with it.',
    }),
    sl('concept', 'Basicity of amines', {
      b: r`The lone pair on nitrogen accepts a proton, so amines are **bases**: $\ce{RNH2 + H2O <=> RNH3+ + OH-}$. Smaller $\text{p}K_\text{b}$ means **stronger base**. Alkylamines are stronger bases than ammonia; **aryl amines are much weaker**.`,
      v: table(['Amine', r`$\text{p}K_\text{b}$`], [['Diethylamine', '3.00'], ['Triethylamine', '3.25'], ['Dimethylamine', '3.27'], ['Ethanamine', '3.29'], ['Methanamine', '3.38'], ['Trimethylamine', '4.22'], ['Ammonia', '4.75'], ['Aniline', '9.38']], 'Table of pKb values of amines from diethylamine 3.00 to aniline 9.38'),
      n: 'Amines turn red litmus blue and form salts with acids, because the nitrogen lone pair picks up a proton. The table lists pKb values: the smaller the pKb, the stronger the base. Every alkylamine is a stronger base than ammonia, but aniline is about ten thousand times weaker than ammonia. The order among methyl and ethyl amines is not simple; we explain it on the next slides.',
    }),
    sl('concept', 'Why the order of basicity is not simple', {
      b: 'In the **gas phase**, basicity follows the +I effect: 3° > 2° > 1° > NH₃. In **water**, three effects compete: **+I effect** (raises basicity), **solvation** of the ammonium ion by hydrogen bonding (more N–H, better solvation, raises basicity) and **steric hindrance** (bulky groups hinder solvation and protonation).',
      v: table(['Series (in water)', 'Order of basic strength'], [['Methyl amines', '(CH₃)₂NH > CH₃NH₂ > (CH₃)₃N > NH₃'], ['Ethyl amines', '(C₂H₅)₂NH > (C₂H₅)₃N > C₂H₅NH₂ > NH₃'], ['Gas phase', '3° > 2° > 1° > NH₃']], 'Table of the order of basic strength of methyl and ethyl amines in water and in the gas phase'),
      n: 'Alkyl groups push electrons onto nitrogen, making the lone pair more available, so in the gas phase tertiary amines are strongest. In water, the ammonium ion formed must also be stabilised by hydrogen bonding with water. Tertiary ammonium ions have only one N–H, so they are poorly solvated, and crowding adds to the problem. The balance of these effects gives different orders for methyl and ethyl amines.',
    }),
    sl('diagram', 'Why aniline is a weak base', {
      b: 'In aniline the nitrogen lone pair is **delocalised into the ring** (five resonance structures), so it is less available for a proton. The anilinium ion has no such resonance, so protonation loses stabilisation. Electron-releasing groups (–CH₃, –OCH₃) on the ring increase basicity; electron-withdrawing groups (–NO₂) decrease it.',
      v: V.aniline,
      n: 'Why is aniline such a weak base? Its nitrogen lone pair is shared with the benzene ring, as these resonance structures show. When aniline accepts a proton, that sharing is lost, which costs stabilisation. So aniline holds on to its lone pair less willingly than ammonia does. A nitro group on the ring pulls even more electron density away and makes the amine weaker still.',
    }),
    sl('example', 'Worked example: ranking basic strength', {
      b: r`**Problem.** Arrange in increasing basic strength in water: aniline, ammonia, methanamine, 4-nitroaniline, N-methylmethanamine.

**Step 1.** Aryl amines are weaker than ammonia; –NO₂ weakens further.

**Step 2.** Alkylamines are stronger than ammonia; among methyl amines in water, 2° > 1°.

**Answer.** 4-Nitroaniline < aniline < ammonia < methanamine < N-methylmethanamine.`,
      v: table(['Amine', 'Main effect'], [['4-Nitroaniline', 'Resonance + −R of NO₂'], ['Aniline', 'Lone pair delocalised'], ['Ammonia', 'Reference'], ['Methanamine', '+I of one CH₃'], ['N-Methylmethanamine', '+I of two CH₃, good solvation']], 'Table ranking five amines by basic strength with the main effect'),
      n: 'Start by separating aryl amines from alkylamines. Aryl amines are weaker than ammonia, and a nitro group makes them weaker still. Alkylamines are stronger than ammonia. Among methyl amines in water, the secondary amine is strongest because it combines a good inductive effect with reasonable solvation. That gives the order shown.',
    }),
    sl('check', 'Quick check: basicity', {
      b: 'Choose the strongest or weakest base from a set of amines.',
      n: 'Quick check. Decide first whether the lone pair is delocalised into a ring; then think about inductive and solvation effects.',
      chk: 'basicity-mcq',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        '1°, 2°, 3° by the number of carbon groups on N; names: alkanamines, N- prefixes, benzenamine.',
        'Nitrogen sp³, pyramidal, with a lone pair.',
        'Preparation: reduction of nitro compounds (Fe/HCl), nitriles (+1 C), amides; ammonolysis (mixture); Gabriel (pure 1°, not aryl); Hoffmann bromamide (−1 C).',
        'Hydrogen bonding: bp of isomers 1° > 2° > 3°; lower amines water-soluble.',
        'Basicity: alkylamines > NH₃ > aryl amines; in water order set by +I, solvation and steric effects.',
      ],
      v: table(['Method', 'Carbon change'], [['Nitrile reduction', '+1'], ['Gabriel', '0'], ['Hoffmann bromamide', '−1']], 'Summary table of preparation methods and the change in carbon number'),
      n: 'Let us sum up Part 1. Amines are classified by the number of carbon groups on nitrogen, which is sp three hybridised with a lone pair. They are made by reduction, ammonolysis, the Gabriel synthesis for pure primary amines, and the Hoffmann reaction, which removes a carbon. Hydrogen bonding sets their boiling points. Alkylamines are stronger bases than ammonia, while aniline is much weaker because its lone pair is delocalised.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'Gabriel synthesis cannot make aniline: aryl halides do not react with phthalimide anion.',
        'Hoffmann bromamide: product has one carbon fewer than the amide.',
        'Fe/HCl is preferred for reducing nitrobenzene; mention why.',
        'In water, (CH₃)₂NH > CH₃NH₂ > (CH₃)₃N; explain with +I, solvation and steric effects.',
        'Smaller pKb = stronger base.',
      ],
      v: table(['Slip', 'Fix'], [['Tertiary amine always strongest', 'Not in water (poor solvation)'], ['Aniline stronger than NH₃', 'Weaker: lone pair delocalised'], ['Gabriel gives 2° amines', 'Gives pure 1° amines']], 'Table of three common slips in Part 1 and their fixes'),
      n: 'Some exam tips. Do not use the Gabriel synthesis for aryl amines. Remember that the Hoffmann reaction loses a carbon. When explaining basicity in water, mention all three effects: inductive, solvation and steric. And remember that a smaller pKb means a stronger base.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Amines — Part 2: Reactions of amines and diazonium salts',
  goals: [
    'Write acylation, carbylamine and nitrous acid reactions of amines',
    'Use the Hinsberg test to distinguish 1°, 2° and 3° amines',
    'Explain electrophilic substitution in aniline and why the amino group is protected',
    'Prepare benzenediazonium chloride and write its replacement and coupling reactions and uses in synthesis',
  ],
  slides: [
    sl('title', 'Reactions of amines', {
      b: 'Part 2 — amines as bases and nucleophiles, aniline’s activated ring, and the versatile diazonium salts.',
      v: flow('LR', [['a', 'Amine lone pair'], ['b', 'Base: salts with acids'], ['c', 'Nucleophile: acylation, alkylation, Hinsberg'], ['d', 'Aniline ring: electrophilic substitution'], ['e', 'Diazonium salts: replacement, coupling']], [['a', 'b'], ['a', 'c'], ['a', 'd'], ['d', 'e']], 'Flow of amine reactions from the nitrogen lone pair to acid–base, nucleophilic, ring substitution and diazonium chemistry'),
      n: 'Almost every reaction of amines comes from the nitrogen lone pair. It lets amines act as bases, forming salts, and as nucleophiles, attacking acid chlorides and alkyl halides. In aniline the lone pair also activates the benzene ring. And when aniline reacts with nitrous acid in the cold, it forms a diazonium salt, one of the most useful intermediates in organic synthesis.',
    }),
    sl('concept', 'Salts, alkylation and acylation', {
      b: 'Amines form **salts** with acids (soluble in water; the amine is released by NaOH). They are **alkylated** by alkyl halides (up to quaternary salts). Primary and secondary amines are **acylated** by acid chlorides or anhydrides (pyridine removes HCl), giving **amides**; tertiary amines have no N–H and are not acylated.',
      m: [r`\ce{C2H5NH2 + CH3COCl -> C2H5NHCOCH3 + HCl}`, r`\ce{C6H5NH2 + (CH3CO)2O -> C6H5NHCOCH3 + CH3COOH}`],
      v: table(['Reagent', '1° amine', '2° amine', '3° amine'], [['Acid (HCl)', 'Salt', 'Salt', 'Salt'], ['CH₃COCl', 'N-substituted amide', 'N,N-disubstituted amide', 'No acylation'], ['Excess CH₃I', 'Quaternary salt', 'Quaternary salt', 'Quaternary salt']], 'Table of reactions of primary, secondary and tertiary amines with acid, ethanoyl chloride and excess iodomethane'),
      n: 'With acids, amines form ammonium salts, which dissolve in water; adding alkali gives back the free amine. Alkyl halides add more alkyl groups to nitrogen, eventually giving quaternary ammonium salts. Acid chlorides and anhydrides replace a hydrogen on nitrogen with an acyl group, forming amides. Tertiary amines have no hydrogen on nitrogen, so they cannot be acylated.',
    }),
    sl('concept', 'Carbylamine and nitrous acid reactions', {
      b: '**Carbylamine test:** only **primary** amines (aliphatic and aromatic), warmed with CHCl₃ and ethanolic KOH, give **isocyanides** with a foul smell. **Nitrous acid** (NaNO₂ + HCl): 1° aliphatic amines → alcohols + **N₂** (unstable diazonium); 1° aromatic amines at 273–278 K → **diazonium salts**.',
      m: [r`\ce{C6H5NH2 + CHCl3 + 3KOH -> C6H5NC + 3KCl + 3H2O}`, r`\ce{RNH2 + HNO2 -> ROH + N2 + H2O}`],
      v: table(['Amine', 'With HNO₂ (NaNO₂ + HCl)', 'Carbylamine test'], [['1° aliphatic', 'N₂ evolved, alcohol formed', 'Positive'], ['1° aromatic (cold)', 'Diazonium salt', 'Positive'], ['2° and 3°', 'No N₂ (other products)', 'Negative']], 'Table of the nitrous acid and carbylamine reactions of different classes of amine'),
      n: 'Two tests pick out primary amines. In the carbylamine test, a primary amine warmed with chloroform and alcoholic potassium hydroxide gives an isocyanide, with an unmistakably foul smell. With nitrous acid, made in the cold from sodium nitrite and hydrochloric acid, primary aliphatic amines give off nitrogen gas, while aniline gives a diazonium salt that is stable only in an ice bath.',
    }),
    sl('concept', 'The Hinsberg test', {
      b: '**Hinsberg’s reagent** is benzenesulfonyl chloride (C₆H₅SO₂Cl). **1° amines** give an N-alkylsulfonamide that **dissolves in alkali** (acidic N–H). **2° amines** give an N,N-dialkylsulfonamide, **insoluble in alkali** (no N–H). **3° amines** do not react.',
      m: [r`\ce{C6H5SO2Cl + C2H5NH2 -> C6H5SO2NHC2H5 + HCl}`],
      v: table(['Amine', 'With C₆H₅SO₂Cl', 'Product in KOH'], [['Primary', 'N-Alkylbenzenesulfonamide', 'Dissolves (acidic N–H)'], ['Secondary', 'N,N-Dialkylbenzenesulfonamide', 'Insoluble'], ['Tertiary', 'No reaction', '—']], 'Table of Hinsberg test results for primary, secondary and tertiary amines'),
      n: 'The Hinsberg test sorts amines into three classes in one go. Benzenesulfonyl chloride reacts with primary and secondary amines, but not tertiary ones. The product from a primary amine still has a hydrogen on nitrogen, made acidic by the strongly electron-withdrawing sulfonyl group, so it dissolves in alkali. The product from a secondary amine has no such hydrogen and stays insoluble.',
    }),
    sl('example', 'Worked example: identifying an amine', {
      b: r`**Problem.** Amine X ($\ce{C3H9N}$) reacts with benzenesulfonyl chloride to give a solid insoluble in KOH, and gives no foul smell with CHCl₃/KOH. Identify X.

**Step 1.** Reacts with Hinsberg reagent → 1° or 2°.

**Step 2.** Product insoluble in alkali → 2°; carbylamine negative confirms not 1°.

**Step 3.** The secondary amine $\ce{C3H9N}$ is $\ce{CH3NHCH2CH3}$, **N-methylethanamine**.`,
      v: flow('LR', [['a', 'Reacts with C₆H₅SO₂Cl'], ['b', 'Product insoluble in KOH'], ['c', 'Carbylamine negative'], ['d', 'Secondary amine: N-methylethanamine']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow of deductions from the Hinsberg and carbylamine tests to N-methylethanamine'),
      n: 'Reaction with Hinsberg’s reagent rules out a tertiary amine. The product does not dissolve in alkali, so there is no acidic hydrogen on nitrogen: the amine is secondary. The carbylamine test is negative, confirming that it is not primary. The only secondary amine with three carbons is N-methylethanamine.',
    }),
    sl('check', 'Quick check: tests for amines', {
      b: 'Decide which test distinguishes a primary amine from a secondary amine.',
      n: 'Quick check. Recall which classes give the carbylamine reaction and how their Hinsberg products behave in alkali.',
      chk: 'hinsberg-mcq',
    }),
    sl('concept', 'Electrophilic substitution in aniline', {
      b: 'The –NH₂ group strongly **activates** the ring (o/p-directing). **Bromine water** gives **2,4,6-tribromoaniline** at once. To get a monosubstituted product, the –NH₂ is first **protected by acetylation** (–NHCOCH₃ is less activating), then hydrolysed. **Direct nitration** gives oxidation products and much **meta** product (the anilinium ion is meta-directing). **Sulphonation** gives **sulphanilic acid** (a zwitterion). Aniline does **not** undergo **Friedel–Crafts** reactions (it forms a salt with AlCl₃).',
      m: [r`\ce{C6H5NH2 + 3Br2 -> C6H2Br3NH2 + 3HBr}`],
      v: table(['Reaction', 'Problem', 'Solution or result'], [['Bromination', 'Over-substitution', 'Acetylate first → 4-bromoacetanilide → hydrolyse → 4-bromoaniline'], ['Nitration', 'Oxidation; anilinium ion gives meta product (about 47%)', 'Acetylate first → mainly 4-nitroaniline after hydrolysis'], ['Sulphonation', '—', 'Sulphanilic acid (4-aminobenzenesulfonic acid)'], ['Friedel–Crafts', 'NH₂ binds AlCl₃, deactivating the ring', 'No reaction']], 'Table of electrophilic substitution reactions of aniline, the problems and how they are solved'),
      n: 'The amino group makes aniline’s ring so reactive that bromine water substitutes all three ortho and para positions at once. To stop at one substituent, chemists first convert the amino group to an acetamido group, which is less activating, carry out the substitution, then remove the acetyl group by hydrolysis. Direct nitration is messy: the acid protonates the amine, and the anilinium ion directs to the meta position.',
    }),
    sl('example', 'Worked example: making 4-bromoaniline', {
      b: r`**Problem.** How would you convert aniline into 4-bromoaniline?

**Step 1.** Protect: aniline + ethanoic anhydride → acetanilide ($\ce{C6H5NHCOCH3}$).

**Step 2.** Brominate: $\ce{Br2}$ in ethanoic acid → 4-bromoacetanilide (para, since the bulky group hinders ortho).

**Step 3.** Deprotect: hydrolyse with aqueous acid or alkali → 4-bromoaniline.`,
      v: flow('LR', [['a', 'Aniline'], ['b', 'Acetanilide'], ['c', '4-Bromoacetanilide'], ['d', '4-Bromoaniline']], [['a', 'b', '(CH₃CO)₂O'], ['b', 'c', 'Br₂'], ['c', 'd', 'H₃O⁺ or OH⁻']], 'Flow for converting aniline into 4-bromoaniline by protection, bromination and hydrolysis'),
      n: 'Here is the classic protection strategy. First, acetylate aniline to acetanilide, which reduces the activating effect because the nitrogen lone pair is shared with the carbonyl group. Then brominate: one bromine enters, mainly at the para position, as the bulky group discourages ortho attack. Finally, hydrolyse the amide to remove the acetyl group, giving four-bromoaniline.',
    }),
    sl('check', 'Quick check: aniline and bromine', {
      b: 'Predict the product when aniline is shaken with bromine water.',
      n: 'Quick check. Think about how strongly the amino group activates the ortho and para positions.',
      chk: 'aniline-br-mcq',
    }),
    sl('diagram', 'Diazonium salts', {
      b: r`**Diazotisation:** aniline + $\ce{NaNO2}$ + HCl at **273–278 K** gives **benzenediazonium chloride**, $\ce{C6H5N2+Cl-}$. Aryl diazonium salts are stabilised by resonance with the ring but decompose above about 278 K, so they are used at once in solution. Alkyl diazonium salts are too unstable to isolate.`,
      m: [r`\ce{C6H5NH2 + NaNO2 + 2HCl -> C6H5N2Cl + NaCl + 2H2O}`],
      v: flow('LR', [['a', 'Aniline'], ['b', 'Benzenediazonium chloride (cold)'], ['c', 'Replacement of N₂ (ArCl, ArBr, ArCN, ArI, ArF, ArOH, ArH)'], ['d', 'Coupling (azo dyes)']], [['a', 'b', 'NaNO₂/HCl, 273–278 K'], ['b', 'c'], ['b', 'd']], 'Flow from aniline to benzenediazonium chloride and then to replacement or coupling products'),
      n: 'When aniline is treated with sodium nitrite and hydrochloric acid in an ice bath, it forms benzenediazonium chloride. Aromatic diazonium ions are stabilised by the ring, but they still decompose if warmed, so they are made cold and used straight away. Their value is that the nitrogen group can be swapped for many other groups, or the ion can join to another ring to form brightly coloured azo dyes.',
    }),
    sl('concept', 'Replacement reactions of diazonium salts', {
      b: 'Nitrogen leaves as N₂, a very good leaving group, and is replaced.',
      m: [r`\ce{C6H5N2Cl ->[CuCl/HCl] C6H5Cl + N2}`, r`\ce{C6H5N2Cl + KI -> C6H5I + KCl + N2}`, r`\ce{C6H5N2Cl + H3PO2 + H2O -> C6H6 + N2 + H3PO3 + HCl}`],
      v: table(['Reagent', 'Product', 'Name'], [['CuCl/HCl or CuBr/HBr', 'Chloro- or bromobenzene', 'Sandmeyer'], ['Cu powder + HCl/HBr', 'Chloro- or bromobenzene', 'Gattermann'], ['CuCN/KCN', 'Benzonitrile', 'Sandmeyer'], ['KI', 'Iodobenzene', '—'], ['HBF₄, then heat', 'Fluorobenzene', 'Balz–Schiemann'], ['Warm water', 'Phenol', '—'], ['H₃PO₂ or ethanol', 'Benzene', 'Reduction']], 'Table of replacement reactions of benzenediazonium chloride with reagents, products and names'),
      n: 'The diazonium group is a superb leaving group because it departs as nitrogen gas. Copper one salts replace it by chlorine, bromine or a cyano group in the Sandmeyer reaction; copper powder and acid do the same in the Gattermann reaction. Potassium iodide gives iodobenzene. Fluoroboric acid followed by heating gives fluorobenzene. Warm water gives phenol, and hypophosphorous acid simply replaces it by hydrogen.',
    }),
    sl('concept', 'Coupling reactions and uses', {
      b: 'Diazonium ions are weak electrophiles that attack **activated rings** at the **para** position, forming **azo compounds** (–N=N–) that are brightly coloured **dyes**: with phenol (alkaline) → **4-hydroxyazobenzene** (orange); with aniline (mildly acidic) → **4-aminoazobenzene** (yellow). Diazonium salts let us put groups such as F, I, CN and OH onto a ring where direct substitution fails, and to remove an –NH₂ used as a directing group.',
      v: table(['Coupling partner', 'Condition', 'Product (colour)'], [['Phenol', 'Mildly alkaline', '4-Hydroxyazobenzene (orange)'], ['Aniline', 'Mildly acidic', '4-Aminoazobenzene (yellow)'], ['2-Naphthol', 'Alkaline', 'Red azo dye']], 'Table of coupling reactions of benzenediazonium chloride with phenol, aniline and 2-naphthol'),
      n: 'Diazonium ions can also keep their nitrogen atoms and attack another, activated benzene ring, usually at the para position. The product contains a nitrogen–nitrogen double bond linking two rings: an azo compound. These are intensely coloured, and many textile dyes and food colours are made this way. With phenol in alkali an orange dye forms; with aniline in mild acid, a yellow one.',
    }),
    sl('example', 'Worked example: synthesis via diazonium salts', {
      b: r`**Problem.** Show how to convert (a) aniline → benzonitrile; (b) aniline → fluorobenzene; (c) 4-nitroaniline → nitrobenzene.

**(a)** $\ce{NaNO2}$/HCl, 273–278 K; then CuCN/KCN (Sandmeyer).

**(b)** Diazotise; then $\ce{HBF4}$; heat the dry diazonium fluoroborate (Balz–Schiemann).

**(c)** Diazotise; then $\ce{H3PO2}$ (or ethanol): the –N₂⁺ group is replaced by H.`,
      v: table(['Conversion', 'Second reagent'], [['Ar–NH₂ → Ar–CN', 'CuCN/KCN'], ['Ar–NH₂ → Ar–F', 'HBF₄, heat'], ['Ar–NH₂ → Ar–H', 'H₃PO₂']], 'Table of second-step reagents after diazotisation for three conversions'),
      n: 'Each conversion starts the same way: diazotise the amine in the cold. Then choose the reagent for the group you want. Copper one cyanide gives a nitrile. Fluoroboric acid gives a salt that loses nitrogen and boron trifluoride on heating, leaving fluorobenzene. Hypophosphorous acid replaces the diazonium group by hydrogen, which removes an amino group that was only needed to direct an earlier substitution.',
    }),
    sl('check', 'Quick check: diazonium reactions', {
      b: 'Choose the reagent that converts benzenediazonium chloride into a given product.',
      n: 'Quick check. Match the group you want on the ring with the reagent that supplies it.',
      chk: 'diazo-reagent-mcq',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'Amines form salts; are alkylated; 1° and 2° are acylated (amides), 3° are not.',
        'Carbylamine test (CHCl₃/KOH, foul smell): 1° amines only.',
        'HNO₂: 1° aliphatic → alcohol + N₂; aniline (273–278 K) → diazonium salt.',
        'Hinsberg: 1° product soluble in alkali; 2° insoluble; 3° no reaction.',
        'Aniline: Br₂ water → 2,4,6-tribromoaniline; protect by acetylation for mono-substitution; no Friedel–Crafts.',
        'Diazonium salts: Sandmeyer, Gattermann, KI, HBF₄, H₂O, H₃PO₂ replacements; coupling to azo dyes.',
      ],
      v: table(['Test', '1°', '2°', '3°'], [['Carbylamine', '+', '−', '−'], ['Hinsberg product in KOH', 'Soluble', 'Insoluble', 'No reaction'], ['HNO₂ (aliphatic)', 'N₂', '—', '—']], 'Summary table of tests distinguishing primary, secondary and tertiary amines'),
      n: 'Let us sum up Part 2. Amines act as bases and nucleophiles. The carbylamine and Hinsberg tests distinguish primary, secondary and tertiary amines. Aniline’s ring is so activated that the amino group is often protected by acetylation. And benzenediazonium chloride, made from aniline in the cold, lets us introduce halogens, cyano, hydroxyl or hydrogen in place of nitrogen, or couple to form azo dyes.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'State the temperature for diazotisation: 273–278 K.',
        'Hinsberg: give the solubility of the product in alkali for both 1° and 2°.',
        'Explain why acetylation reduces the activating effect (lone pair shared with C=O).',
        'Aniline gives meta product on direct nitration because it is protonated to anilinium.',
        'Sandmeyer uses Cu(I) salts; Gattermann uses Cu powder with HX.',
      ],
      v: table(['Slip', 'Fix'], [['Tertiary amines give carbylamine test', 'Only primary'], ['Aniline + Br₂ water → 4-bromoaniline', 'Gives 2,4,6-tribromoaniline'], ['Diazonium salts stable at room temperature', 'Keep at 273–278 K']], 'Table of three common slips in Part 2 and their fixes'),
      n: 'Some final tips. Always state the low temperature for diazotisation. In Hinsberg answers, mention what happens in alkali for both primary and secondary products. Explain acetylation by the sharing of the nitrogen lone pair with the carbonyl group. Remember that direct nitration of aniline gives a lot of meta product. And keep Sandmeyer and Gattermann reagents apart.',
    }),
  ],
});
