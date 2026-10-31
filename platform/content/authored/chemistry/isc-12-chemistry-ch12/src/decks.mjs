// ISC 12 Chemistry ch12 Haloalkanes — two decks: Part 1 (t01–t03) classification, nomenclature, C–X bond,
// preparation (alkanes, alkenes, alcohols, halide exchange, Hunsdiecker) and physical properties; Part 2 (t04–t07)
// SN1/SN2 and optical rotation, substitution with nucleophiles, elimination, Wurtz and Grignard, polyhalogen compounds.
import { sl, deck, table, flow, svgV, r } from './lib.mjs';
import { POLAR, SN2 } from './svgs.mjs';

export const V = {
  polar: svgV(POLAR, 'A polar carbon–halogen bond with a partial positive charge on carbon and a partial negative charge on the halogen, and a nucleophile attacking the carbon'),
  sn2: svgV(SN2, 'SN2 reaction of hydroxide with bromomethane: backside attack, a transition state with the three hydrogens in one plane, and an inverted product with bromide leaving', 'Schematic; the inversion is like an umbrella turning inside out in the wind.'),
};

export const deck1 = deck({
  part: 1,
  title: 'Haloalkanes — Part 1: Naming, the C–X bond, preparation and physical properties',
  goals: [
    'Classify haloalkanes and name mono-, di- and tri-halo derivatives by common and IUPAC systems',
    'Explain the polarity, length and strength of the C–X bond',
    'Write equations for preparing haloalkanes from alkanes, alkenes, alcohols, by halide exchange and by the Hunsdiecker reaction',
    'Explain trends in boiling point and solubility',
  ],
  slides: [
    sl('title', 'Haloalkanes', {
      b: 'Part 1 — alkanes in which halogen atoms replace hydrogen: names, bonds, preparation and physical properties.',
      v: table(['Compound', 'Use'], [['Chloroethane', 'Local anaesthetic spray in sports'], ['Halothane, CF₃CHBrCl', 'Inhaled general anaesthetic'], ['Dichloromethane', 'Paint stripper and solvent'], ['Iodoform', 'Antiseptic'], ['Freons', 'Former refrigerants']], 'Table of familiar haloalkanes and their uses'),
      n: 'Namaste! A cold spray on a footballer’s injured ankle, an anaesthetic in an operating theatre and an old refrigerator coolant all contain carbon bonded to a halogen. When halogen atoms replace hydrogen atoms in an alkane, we get a haloalkane. In this part we name and classify them, look at the carbon–halogen bond, learn several ways to make them, and explain their physical properties.',
    }),
    sl('concept', 'Classification', {
      b: 'By the **number of halogen atoms**: mono-, di- (**geminal**: both on one C; **vicinal**: on adjacent C), tri- and poly-halo compounds. Monohaloalkanes ($\\ce{C_nH_{2n+1}X}$) are classified by the carbon bearing X.',
      v: table(['Class', 'Carbon bearing X', 'Example'], [['Primary (1°)', 'Joined to one other C', 'CH₃CH₂CH₂Cl'], ['Secondary (2°)', 'Joined to two other C', 'CH₃CHBrCH₃'], ['Tertiary (3°)', 'Joined to three other C', '(CH₃)₃CI'], ['Allylic', 'sp³ C next to C=C', 'CH₂=CHCH₂Br'], ['Benzylic', 'sp³ C next to a benzene ring', 'C₆H₅CH₂Cl'], ['gem-Dihalide', 'Two X on one C', 'CH₃CHCl₂'], ['vic-Dihalide', 'X on adjacent C', 'CH₂BrCH₂Br']], 'Table classifying haloalkanes'),
      n: 'Haloalkanes with one halogen have the general formula C n H two n plus one X. We call them primary, secondary or tertiary according to how many carbons are attached to the carbon carrying the halogen. Allylic and benzylic halides have the halogen next to a double bond or a ring. Dihalides are geminal when both halogens are on the same carbon and vicinal when they are on neighbouring carbons.',
    }),
    sl('concept', 'Common and IUPAC names', {
      b: 'IUPAC: halogen as a **prefix** (fluoro, chloro, bromo, iodo) with a locant on the longest chain; prefixes in alphabetical order. Common names: alkyl group + halide.',
      v: table(['Structure', 'Common name', 'IUPAC name'], [['CH₃CH₂CH₂Br', 'n-Propyl bromide', '1-Bromopropane'], ['(CH₃)₂CHCH₂Cl', 'Isobutyl chloride', '1-Chloro-2-methylpropane'], ['(CH₃)₃CBr', 'tert-Butyl bromide', '2-Bromo-2-methylpropane'], ['CH₂Cl₂', 'Methylene chloride', 'Dichloromethane'], ['CHCl₃', 'Chloroform', 'Trichloromethane'], ['CHI₃', 'Iodoform', 'Triiodomethane'], ['CH₃CHBr₂', 'Ethylidene bromide', '1,1-Dibromoethane']], 'Table of common and IUPAC names of haloalkanes'),
      n: 'In IUPAC names the halogen is written as a prefix with a number for its position: one-bromopropane, two-bromo-two-methylpropane. Common names use the name of the alkyl group followed by halide, such as isobutyl chloride. Several polyhalogen compounds keep well-known common names: methylene chloride, chloroform and iodoform are dichloromethane, trichloromethane and triiodomethane.',
    }),
    sl('example', 'Worked example: naming and classifying', {
      b: r`**Problem.** Give IUPAC names and classify: (a) $\ce{(CH3)2CHCH2Br}$; (b) $\ce{(CH3)3CCH2Cl}$; (c) $\ce{CH3CH2C(CH3)2I}$; (d) $\ce{CH2ClCH2Cl}$.

**(a)** 1-Bromo-2-methylpropane — primary (the CH₂Br carbon has one C neighbour).

**(b)** 1-Chloro-2,2-dimethylpropane — primary, although crowded.

**(c)** 2-Iodo-2-methylbutane — tertiary.

**(d)** 1,2-Dichloroethane — vicinal dihalide.`,
      v: flow('LR', [['a', 'Longest chain containing C–X'], ['b', 'Lowest locants'], ['c', 'Prefixes A→Z'], ['d', 'Classify the C bearing X']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow for naming and classifying a haloalkane'),
      n: 'Find the longest chain, number it for the lowest locants, and list prefixes alphabetically. Then look at the carbon carrying the halogen. In the first two examples that carbon has only one carbon neighbour, so both are primary, even though the second is very crowded. In the third, the carbon carrying iodine has three carbon neighbours, so it is tertiary. The last is a vicinal dichloride.',
    }),
    sl('diagram', 'The carbon–halogen bond', {
      b: 'Halogens are more electronegative than carbon, so the C–X bond is **polar**: carbon carries δ+ and is attacked by **nucleophiles**. Carbon is sp³ hybridised.',
      v: V.polar,
      n: 'The halogen pulls the shared pair of electrons towards itself, leaving carbon with a small positive charge and the halogen with a small negative charge. Electron-rich nucleophiles are attracted to that positive carbon. This single fact explains why nucleophilic substitution is the typical reaction of haloalkanes, as we shall see in Part 2.',
    }),
    sl('concept', 'Bond length and bond enthalpy', {
      b: 'From F to I the halogen gets larger, so the C–X bond becomes **longer and weaker**; C–I breaks most easily, so iodoalkanes are the most reactive.',
      v: table(['Bond', 'Length / pm', 'Enthalpy / kJ mol⁻¹'], [['C–F', '139', '452'], ['C–Cl', '178', '351'], ['C–Br', '193', '293'], ['C–I', '214', '234']], 'Table of carbon–halogen bond lengths and bond enthalpies'),
      n: 'Down the halogen group the bond gets longer and much weaker, from about four hundred and fifty kilojoules per mole for carbon–fluorine to about two hundred and thirty for carbon–iodine. So for the same alkyl group, the order of reactivity is iodide, then bromide, then chloride, with fluorides the least reactive.',
    }),
    sl('check', 'Quick check: classification and naming', {
      b: 'Classify or name a haloalkane.',
      n: 'Quick check. Count the carbon neighbours of the carbon carrying the halogen.',
      chk: 'classify-mcq',
    }),
    sl('concept', 'Preparation from alcohols', {
      b: 'The –OH group is replaced by a halogen. **Thionyl chloride** is preferred: its by-products SO₂ and HCl are gases, leaving pure haloalkane.',
      m: [r`\ce{CH3CH2CH2OH + HCl ->[ZnCl2] CH3CH2CH2Cl + H2O}`, r`\ce{3CH3OH + PBr3 -> 3CH3Br + H3PO3}`, r`\ce{CH3CH2OH + PCl5 -> CH3CH2Cl + POCl3 + HCl}`, r`\ce{CH3CH2OH + SOCl2 -> CH3CH2Cl + SO2 + HCl}`],
      v: table(['Reagent', 'Notes'], [['HCl + anhydrous ZnCl₂ (Lucas reagent)', 'Needed for 1° and 2°; 3° react with conc. HCl alone'], ['HBr; HI (from NaBr or KI + acid)', 'Reactivity of HX: HI > HBr > HCl'], ['PCl₃, PCl₅, PBr₃, PI₃ (red P + X₂)', 'Good yields'], ['SOCl₂ (with pyridine)', 'Best: gaseous by-products']], 'Table of reagents for converting alcohols into haloalkanes'),
      n: 'Alcohols are the usual starting point. Hydrogen chloride needs anhydrous zinc chloride to react with primary and secondary alcohols. Phosphorus halides give good yields; phosphorus tribromide and triiodide are made on the spot from red phosphorus and the halogen. Thionyl chloride is best, because sulphur dioxide and hydrogen chloride escape as gases, leaving the chloroalkane almost pure.',
    }),
    sl('concept', 'Preparation from alkanes and alkenes', {
      b: '**Alkanes:** free-radical halogenation in light gives mixtures of isomers. **Alkenes:** add HX by **Markovnikov’s rule**; with HBr and a **peroxide**, anti-Markovnikov addition (Kharasch effect); X₂ gives vic-dihalides.',
      m: [r`\ce{CH4 + Cl2 ->[h\nu] CH3Cl + HCl}`, r`\ce{CH3CH=CH2 + HBr -> CH3CHBrCH3}`, r`\ce{CH3CH=CH2 + HBr ->[(C6H5CO)2O2] CH3CH2CH2Br}`],
      v: table(['Starting material', 'Reagent', 'Product'], [['Ethane', 'Cl₂, light', 'Chloroethane (+ polychloro)'], ['But-1-ene', 'HBr', '2-Bromobutane'], ['But-1-ene', 'HBr + peroxide', '1-Bromobutane'], ['Propene', 'Br₂ in CCl₄', '1,2-Dibromopropane']], 'Table of preparations from alkanes and alkenes'),
      n: 'Chlorinating an alkane in light gives a mixture of products, so it is rarely used for pure compounds. Adding hydrogen bromide to an alkene follows Markovnikov’s rule, putting bromine on the carbon with fewer hydrogens. But with a peroxide present, the addition is reversed and bromine goes to the end carbon. Adding bromine itself gives a vicinal dibromide.',
    }),
    sl('concept', 'Halide exchange and the Hunsdiecker reaction', {
      b: '**Finkelstein:** R–Cl or R–Br + NaI in dry acetone → R–I; NaCl/NaBr precipitate, driving the reaction. **Swarts:** R–Cl/R–Br + AgF, Hg₂F₂, CoF₂ or SbF₃ → R–F. **Hunsdiecker:** the silver salt of a fatty acid with Br₂ in CCl₄ gives an alkyl bromide with **one carbon fewer**.',
      m: [r`\ce{CH3CH2Br + NaI ->[acetone] CH3CH2I + NaBr}`, r`\ce{CH3Cl + AgF -> CH3F + AgCl}`, r`\ce{CH3CH2COOAg + Br2 ->[CCl4][\Delta] CH3CH2Br + CO2 + AgBr}`],
      v: table(['Reaction', 'Reagent', 'Product'], [['Finkelstein', 'NaI, dry acetone', 'Iodoalkane'], ['Swarts', 'AgF, Hg₂F₂, SbF₃', 'Fluoroalkane'], ['Hunsdiecker', 'RCOOAg + Br₂, CCl₄', 'R–Br (one C fewer)']], 'Table of halide exchange and the Hunsdiecker reaction'),
      n: 'Iodo and fluoro compounds are made by swapping halogens. In the Finkelstein reaction, sodium iodide in dry acetone replaces chlorine or bromine, because the sodium chloride or bromide formed is insoluble in acetone and precipitates. In the Swarts reaction, metal fluorides give fluoroalkanes. In the Hunsdiecker reaction, the silver salt of a carboxylic acid is heated with bromine, losing carbon dioxide to give a bromoalkane with one carbon fewer.',
    }),
    sl('example', 'Worked example: choosing a preparation', {
      b: r`**Problem.** Suggest a method: (a) butan-1-ol → pure 1-chlorobutane; (b) but-1-ene → 1-bromobutane; (c) 1-chlorobutane → 1-iodobutane; (d) silver butanoate → a bromoalkane (name it); (e) bromomethane → fluoromethane.

**(a)** SOCl₂ (gaseous by-products). **(b)** HBr with a peroxide. **(c)** NaI in dry acetone (Finkelstein).

**(d)** Br₂ in CCl₄, heat (Hunsdiecker): $\ce{CH3CH2CH2COOAg + Br2 -> CH3CH2CH2Br + CO2 + AgBr}$ — **1-bromopropane**.

**(e)** AgF (Swarts).`,
      v: table(['Conversion', 'Method'], [['ROH → RCl (pure)', 'SOCl₂'], ['Alk-1-ene → 1-bromoalkane', 'HBr + peroxide'], ['RCl → RI', 'Finkelstein'], ['RCOOAg → R–Br', 'Hunsdiecker'], ['RBr → RF', 'Swarts']], 'Table of conversions and methods'),
      n: 'Match the method to the job. Thionyl chloride gives a pure chloroalkane from an alcohol. Hydrogen bromide with peroxide puts bromine on the end carbon of but-1-ene. Sodium iodide in acetone swaps chlorine for iodine. The Hunsdiecker reaction turns silver butanoate, with four carbons, into one-bromopropane, with three. And silver fluoride gives fluoromethane.',
    }),
    sl('check', 'Quick check: preparation', {
      b: 'Choose a reagent or predict the product of a preparation.',
      n: 'Quick check. Remember which reactions add, swap or remove carbon atoms.',
      chk: 'prep-mcq',
    }),
    sl('concept', 'Physical properties', {
      b: 'Lower members (CH₃Cl, CH₃Br, C₂H₅Cl) are gases; higher members are liquids or solids. Haloalkanes are **polar** and heavier than alkanes of similar size, so boiling points are higher. B.p. **rises** with chain length and halogen size (RI > RBr > RCl > RF) and **falls** with branching. Only slightly soluble in water (cannot form strong hydrogen bonds with water); soluble in organic solvents. RBr, RI and polychloro compounds are denser than water.',
      v: table(['Compound', 'Boiling point / K'], [['CH₃Cl', '249'], ['CH₃Br', '277'], ['CH₃I', '315'], ['CH₂Cl₂', '313'], ['CHCl₃', '334'], ['CCl₄', '350']], 'Table of boiling points of halomethanes'),
      n: 'Haloalkanes boil higher than alkanes of similar size because their molecules are polar and heavier. The boiling point rises with chain length and with the size of the halogen, and falls with branching. Notice how adding more chlorine atoms to methane raises the boiling point step by step. Haloalkanes dissolve only slightly in water, because the attractions they form with water cannot repay the hydrogen bonds broken.',
    }),
    sl('example', 'Worked example: boiling points of isomers', {
      b: r`**Problem.** Arrange the $\ce{C5H11Cl}$ isomers 1-chloropentane, 2-chloropentane and 2-chloro-2-methylbutane in order of increasing boiling point.

**Step 1.** Same molar mass, so compare shape.

**Step 2.** More branching → more compact molecules → smaller contact area → weaker van der Waals forces.

**Step 3.** 2-Chloro-2-methylbutane (≈ 358 K) < 2-chloropentane (≈ 370 K) < 1-chloropentane (≈ 381 K).`,
      v: table(['Isomer', 'Branching', 'b.p. / K'], [['2-Chloro-2-methylbutane', 'Most', '≈ 358'], ['2-Chloropentane', 'Some', '≈ 370'], ['1-Chloropentane', 'None', '≈ 381']], 'Table of three chloropentane isomers with branching and boiling points'),
      n: 'The three isomers have the same formula, so the difference comes from shape. The straight chain of one-chloropentane gives the biggest surface for molecules to touch, so its van der Waals forces are strongest and it boils highest. The branched two-chloro-two-methylbutane is compact, touches its neighbours least and boils lowest.',
    }),
    sl('check', 'Quick check: physical properties', {
      b: 'Compare boiling points or solubility of haloalkanes.',
      n: 'Quick check. Consider molar mass, polarity and branching.',
      chk: 'bp-mcq',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Classify by the carbon bearing X (1°, 2°, 3°, allylic, benzylic); gem and vic dihalides.',
        'IUPAC: halogen prefix with locant; CHCl₃ trichloromethane, CHI₃ triiodomethane.',
        'C–X polar (C δ+); bond longer and weaker from F to I.',
        'From alcohols (HX/ZnCl₂, PX₃, PCl₅, SOCl₂ best); alkenes (Markovnikov; peroxide effect with HBr); Finkelstein, Swarts; Hunsdiecker (one C fewer).',
        'B.p. rises with mass, falls with branching; slightly soluble in water.',
      ],
      v: table(['Method', 'Key reagent'], [['ROH → RCl', 'SOCl₂'], ['RCl → RI', 'NaI / acetone'], ['RCOOAg → RBr', 'Br₂ / CCl₄']], 'Summary table of key preparations'),
      n: 'Let us sum up Part 1. Haloalkanes are classified by the carbon bearing the halogen and named with halogen prefixes. The carbon–halogen bond is polar and weakens from fluorine to iodine. They are made from alcohols, alkenes and alkanes, by halide exchange and by the Hunsdiecker reaction. Their boiling points rise with mass and fall with branching.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'Give conditions with every equation (ZnCl₂, dry acetone, peroxide, CCl₄, light).',
        'State why SOCl₂ is preferred and why Finkelstein goes to completion.',
        'In the Hunsdiecker reaction, count carbons: the product has one fewer.',
        'Peroxide effect works only with HBr.',
      ],
      v: table(['Slip', 'Fix'], [['Branching raises b.p.', 'Branching lowers b.p.'], ['Peroxide effect with HCl', 'Only HBr'], ['Hunsdiecker keeps chain length', 'Loses one C as CO₂']], 'Table of three common slips in Part 1 and fixes'),
      n: 'Some tips. Write the conditions with every equation. Explain why thionyl chloride is the best reagent and why the Finkelstein reaction goes to completion. Count carbons carefully in the Hunsdiecker reaction. And remember that the peroxide effect works only with hydrogen bromide.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Haloalkanes — Part 2: Substitution, elimination, metals and polyhalogen compounds',
  goals: [
    'Draw the SN1 and SN2 mechanisms and explain their stereochemical outcomes',
    'Write the products of haloalkanes with common nucleophiles, including KCN/AgCN and KNO₂/AgNO₂',
    'Predict the major alkene using Saytzeff’s rule; write Wurtz and Grignard equations',
    'Describe chloroform, iodoform and other polyhalogen compounds and their environmental effects',
  ],
  slides: [
    sl('title', 'Reactions of haloalkanes', {
      b: 'Part 2 — substitution, elimination, reactions with metals, and some important polyhalogen compounds.',
      v: flow('LR', [['a', 'Haloalkane'], ['b', 'Nucleophilic substitution (SN1, SN2)'], ['c', 'β-Elimination → alkene'], ['d', 'Metals: Wurtz, Grignard']], [['a', 'b'], ['a', 'c'], ['a', 'd']], 'Flow of the reactions of haloalkanes'),
      n: 'The polar carbon–halogen bond makes haloalkanes the workhorses of organic synthesis. A nucleophile can replace the halogen; a base can remove the halogen with a hydrogen to make an alkene; and metals can join chains together or form Grignard reagents. We finish with chloroform, iodoform and the freons that damaged the ozone layer.',
    }),
    sl('concept', 'Substitution by nucleophiles', {
      b: 'A nucleophile replaces the halide: $\\ce{Nu- + R-X -> R-Nu + X-}$. **Ambident** nucleophiles (CN⁻, NO₂⁻) attack through C/O with ionic K salts but through N with covalent Ag salts.',
      v: table(['Reagent', 'Product from R–X'], [['Aqueous NaOH or KOH', 'Alcohol, R–OH'], ['Moist Ag₂O (or boiling water)', 'Alcohol'], ['NaI in acetone', 'Iodoalkane, R–I'], ['NH₃ (excess, alcoholic)', '1° amine, R–NH₂ (further alkylation possible)'], ['R′NH₂', '2° amine, R–NHR′'], ['KCN', 'Nitrile (alkyl cyanide), R–CN'], ['AgCN', 'Isocyanide, R–NC'], ['KNO₂', 'Alkyl nitrite, R–O–N=O'], ['AgNO₂', 'Nitroalkane, R–NO₂'], ['R′COOAg', 'Ester, R′COOR'], ['LiAlH₄', 'Alkane, R–H']], 'Table of substitution products of haloalkanes with nucleophiles'),
      n: 'Here is the toolkit. Aqueous hydroxide gives alcohols; ammonia and amines give amines; sodium iodide gives iodoalkanes. Cyanide and nitrite are ambident: ionic potassium salts attack through carbon or oxygen, giving nitriles and alkyl nitrites, while covalent silver salts attack through nitrogen, giving isocyanides and nitroalkanes. Silver salts of acids give esters, and lithium aluminium hydride replaces the halogen by hydrogen.',
    }),
    sl('concept', 'The SN2 mechanism', {
      b: 'One step: the nucleophile attacks from the side **opposite** the halogen as the C–X bond breaks. Rate $= k[\\ce{RX}][\\ce{Nu-}]$ (second order). Configuration **inverted**. Reactivity: CH₃X > 1° > 2° > 3° (steric hindrance).',
      v: table(['Halide', 'SN2 rate', 'Reason'], [['Methyl', 'Fastest', 'No crowding'], ['Primary', 'Fast', 'Little crowding'], ['Secondary', 'Slow', 'More crowding'], ['Tertiary', 'Very slow', 'Backside blocked']], 'Table of SN2 reactivity'),
      n: 'In the S N two mechanism everything happens in one step. The nucleophile approaches the carbon from the back, directly opposite the leaving halogen, so both species take part and the rate depends on both concentrations. Bulky groups block the backside, so methyl and primary halides react fastest by this route and tertiary halides hardly at all.',
    }),
    sl('diagram', 'SN2: backside attack and inversion', {
      b: 'In the transition state carbon is partly bonded to both nucleophile and leaving group, with the other three groups in a plane. As the halide leaves, the three groups flip over: **Walden inversion**.',
      v: V.sn2,
      n: 'Follow the picture. Hydroxide approaches from the side away from bromine. At the transition state the oxygen to carbon bond is half formed and the carbon to bromine bond half broken, with the three hydrogens flat. Then bromide leaves and the three groups flip over, like an umbrella in the wind. At a chiral carbon, this inverts the configuration.',
    }),
    sl('concept', 'The SN1 mechanism', {
      b: 'Two steps: (1) slow ionisation to a **carbocation**; (2) fast attack by the nucleophile. Rate $= k[\\ce{RX}]$ (first order). Favoured by **3°**, allylic and benzylic halides (stable carbocations) and **polar protic** solvents. Reactivity: 3° > 2° > 1° > CH₃X.',
      v: flow('LR', [['a', 'R–X'], ['b', 'Slow: R⁺ + X⁻'], ['c', 'Fast: R⁺ + Nu⁻ → R–Nu']], [['a', 'b'], ['b', 'c']], 'Flow of the SN1 mechanism'),
      n: 'The S N one mechanism happens in two steps. First the carbon–halogen bond breaks on its own, giving a carbocation; this slow step sets the rate, which depends only on the haloalkane. Then the nucleophile joins the carbocation quickly. Tertiary carbocations are most stable, so tertiary halides react fastest this way, especially in water or alcohols that stabilise the ions.',
    }),
    sl('two-column', 'SN1 versus SN2 and optical rotation', {
      b: 'A carbon with four different groups is **chiral**; its enantiomers rotate plane-polarised light equally in opposite directions (d/+ and l/−). A 50 : 50 mixture is **racemic** (no rotation).',
      cols: [
        '**SN2**\n\n- One step\n- Rate = k[RX][Nu⁻]\n- CH₃X > 1° > 2° > 3°\n- Complete **inversion**: an optically active reactant gives an optically active product of opposite configuration',
        '**SN1**\n\n- Two steps via a planar carbocation\n- Rate = k[RX]\n- 3° > 2° > 1° > CH₃X\n- **Racemisation** (attack on both faces): optical activity largely lost',
      ],
      v: table(['Feature', 'SN1', 'SN2'], [['Kinetics', 'First order', 'Second order'], ['Intermediate', 'Carbocation', 'None'], ['Stereochemistry', 'Racemisation', 'Inversion']], 'Table comparing SN1 and SN2'),
      n: 'Compare the two mechanisms. S N two is one step, second order, fastest for primary halides, and inverts a chiral carbon, so an optically active reactant gives an optically active product of opposite configuration. S N one goes through a flat carbocation, is first order and fastest for tertiary halides; the nucleophile can attack either face, so the product is largely racemic and optical activity is lost.',
    }),
    sl('example', 'Worked example: predicting rates', {
      b: r`**Problem.** Which reacts faster? (a) SN2 with $\ce{OH-}$: 1-chlorobutane or 2-chloro-2-methylpropane. (b) SN1 in water: 2-chloropropane or 2-chloro-2-methylpropane. (c) SN2 with $\ce{CN-}$: 1-bromopentane or 1-iodopentane.

**(a)** 1-Chlorobutane — primary, unhindered backside.

**(b)** 2-Chloro-2-methylpropane — tertiary carbocation is more stable.

**(c)** 1-Iodopentane — the C–I bond is weaker, so I⁻ is the better leaving group.`,
      v: table(['Pair', 'Faster', 'Reason'], [['(a) SN2', '1-Chlorobutane', 'Less steric hindrance'], ['(b) SN1', '2-Chloro-2-methylpropane', 'More stable carbocation'], ['(c) SN2', '1-Iodopentane', 'Weaker C–X bond']], 'Table of three rate comparisons'),
      n: 'First decide which mechanism is asked. For S N two, crowding matters, so the primary chloride wins. For S N one, carbocation stability matters, so the tertiary chloride wins. With the same alkyl group, the leaving group matters: the carbon–iodine bond is the weakest, so the iodide reacts faster than the bromide.',
    }),
    sl('check', 'Quick check: SN1 or SN2', {
      b: 'Identify the mechanism from rate or stereochemical data.',
      n: 'Quick check. Does the rate depend on the nucleophile, and is the configuration inverted or racemised?',
      chk: 'mech-mcq',
    }),
    sl('example', 'Worked example: one haloalkane, many products', {
      b: r`**Problem.** Give the product when 1-bromopropane reacts with (a) KCN, (b) AgCN, (c) KNO₂, (d) AgNO₂, (e) $\ce{CH3COOAg}$, (f) LiAlH₄.

**(a)** $\ce{CH3CH2CH2CN}$, butanenitrile. **(b)** $\ce{CH3CH2CH2NC}$, 1-isocyanopropane.

**(c)** $\ce{CH3CH2CH2ONO}$, propyl nitrite. **(d)** $\ce{CH3CH2CH2NO2}$, 1-nitropropane.

**(e)** $\ce{CH3COOCH2CH2CH3}$, propyl ethanoate. **(f)** $\ce{CH3CH2CH3}$, propane.`,
      v: table(['Reagent', 'Attacking atom', 'Product'], [['KCN', 'C', 'Butanenitrile'], ['AgCN', 'N', '1-Isocyanopropane'], ['KNO₂', 'O', 'Propyl nitrite'], ['AgNO₂', 'N', '1-Nitropropane'], ['CH₃COOAg', 'O', 'Propyl ethanoate'], ['LiAlH₄', 'H⁻', 'Propane']], 'Table of products from 1-bromopropane'),
      n: 'With potassium cyanide, the free cyanide ion attacks through carbon and the chain grows by one carbon to give butanenitrile. Silver cyanide is covalent, so only the nitrogen lone pair is free and an isocyanide forms. In the same way, potassium nitrite gives propyl nitrite while silver nitrite gives one-nitropropane. Silver ethanoate gives an ester, and lithium aluminium hydride gives propane.',
    }),
    sl('check', 'Quick check: nucleophiles', {
      b: 'Predict the product of a haloalkane with a given nucleophile.',
      n: 'Quick check. For cyanide and nitrite, decide whether the potassium or the silver salt is used.',
      chk: 'nuc-mcq',
    }),
    sl('concept', 'β-Elimination and Saytzeff’s rule', {
      b: 'With **alcoholic KOH** and heat, H from a β-carbon and X are removed to give an alkene (dehydrohalogenation). **Saytzeff’s rule:** the **more substituted** (more alkylated) alkene is the major product.',
      m: [r`\ce{CH3CHBrCH2CH2CH3 ->[alc. KOH][\Delta] CH3CH=CHCH2CH3}\ \text{(major)}`],
      v: table(['Haloalkane', 'Major alkene', 'Minor alkene'], [['2-Bromopentane', 'Pent-2-ene', 'Pent-1-ene'], ['2-Chloro-2-methylbutane', '2-Methylbut-2-ene', '2-Methylbut-1-ene'], ['2-Bromo-3-methylbutane', '2-Methylbut-2-ene', '3-Methylbut-1-ene']], 'Table of elimination products by Saytzeff’s rule'),
      n: 'In alcoholic potassium hydroxide, hydroxide acts as a base. It removes a hydrogen from a carbon next to the one carrying the halogen, and the halide leaves, forming a double bond. When more than one alkene can form, the one with more alkyl groups on the double bond is the major product. Aqueous hydroxide favours substitution; alcoholic hydroxide and heat favour elimination, especially for tertiary halides.',
    }),
    sl('concept', 'Reactions with sodium and magnesium', {
      b: '**Wurtz reaction:** two alkyl halides couple with Na in dry ether; best for symmetrical alkanes. **Grignard reagent:** R–X + Mg in dry ether → RMgX, a strong nucleophile and base destroyed by water and other proton sources.',
      m: [r`\ce{2CH3CH2CH2Br + 2Na ->[dry ether] CH3(CH2)4CH3 + 2NaBr}`, r`\ce{CH3CH2CH2Br + Mg ->[dry ether] CH3CH2CH2MgBr}`, r`\ce{CH3CH2CH2MgBr + H2O -> CH3CH2CH3 + Mg(OH)Br}`],
      v: table(['Reaction', 'Reagent', 'Product'], [['Wurtz', '2RX + 2Na, dry ether', 'R–R'], ['Grignard formation', 'RX + Mg, dry ether', 'RMgX'], ['Grignard + water', 'H₂O', 'R–H']], 'Table of reactions with sodium and magnesium'),
      n: 'Sodium in dry ether joins two alkyl groups: the Wurtz reaction, which doubles the chain and works best when both halides are the same. Magnesium in dry ether gives a Grignard reagent, in which carbon is bonded to magnesium and behaves like a carbanion. Grignard reagents are very useful for building carbon chains but are destroyed by even traces of water, which give the alkane.',
    }),
    sl('check', 'Quick check: elimination and metals', {
      b: 'Predict the alkene from an elimination, or the product of a Wurtz or Grignard reaction.',
      n: 'Quick check. Use Saytzeff’s rule for eliminations, and count carbons for the Wurtz reaction.',
      chk: 'elim-mcq',
    }),
    sl('concept', 'Chloroform (trichloromethane)', {
      b: '**Preparation:** ethanol or acetone with bleaching powder (Cl₂ + Ca(OH)₂): chlorination then alkaline cleavage. **Properties:** colourless, sweet-smelling, heavy liquid (b.p. 334 K); slowly oxidised by air in light to poisonous **phosgene**, so stored in **dark, completely filled** bottles (a little ethanol added). Boiled with KOH it gives potassium methanoate; with conc. HNO₃ it gives chloropicrin; with silver powder, ethyne.',
      m: [r`\ce{CH3COCH3 + 3Cl2 -> CCl3COCH3 + 3HCl}`, r`\ce{2CCl3COCH3 + Ca(OH)2 -> 2CHCl3 + (CH3COO)2Ca}`, r`\ce{2CHCl3 + O2 ->[light] 2COCl2 + 2HCl}`, r`\ce{CHCl3 + HNO3 -> CCl3NO2 + H2O}`],
      v: table(['Reagent', 'Product'], [['O₂, light', 'Phosgene, COCl₂ (poisonous)'], ['Conc. HNO₃', 'Chloropicrin, CCl₃NO₂ (tear gas, insecticide)'], ['Hot aqueous KOH', 'Potassium methanoate, HCOOK'], ['Silver powder, heat', 'Ethyne, C₂H₂'], ['1° amine + alc. KOH', 'Isocyanide (carbylamine test)']], 'Table of reactions of chloroform'),
      n: 'Chloroform is made by warming acetone or ethanol with bleaching powder: the methyl group is chlorinated and then split off by the alkali. It is a heavy, sweet-smelling liquid. In light, air slowly oxidises it to phosgene, a deadly gas, so it is stored in dark bottles filled to the brim with a little ethanol added. With nitric acid it gives chloropicrin, and with primary amines and alkali, the foul-smelling isocyanides of the carbylamine test.',
    }),
    sl('concept', 'Iodoform (triiodomethane)', {
      b: '**Preparation:** ethanol or acetone warmed with iodine and NaOH (or Na₂CO₃): a **yellow crystalline precipitate** with a characteristic smell. **Iodoform test:** given by compounds containing **CH₃CO–** or **CH₃CH(OH)–** (ethanol, ethanal, propan-2-ol, acetone) but not by methanol or propan-1-ol. **Use:** antiseptic (liberates iodine).',
      m: [r`\ce{C2H5OH + 4I2 + 6NaOH -> CHI3 + HCOONa + 5NaI + 5H2O}`, r`\ce{CH3COCH3 + 3I2 + 4NaOH -> CHI3 + CH3COONa + 3NaI + 3H2O}`],
      v: table(['Compound', 'Iodoform test'], [['Ethanol', 'Positive'], ['Methanol', 'Negative'], ['Propan-2-ol', 'Positive'], ['Propan-1-ol', 'Negative'], ['Acetone', 'Positive'], ['Ethanal', 'Positive']], 'Table of compounds and the iodoform test'),
      n: 'Warm ethanol or acetone with iodine and sodium hydroxide, and yellow crystals of iodoform appear, with a distinctive medicinal smell. This is the iodoform test, given by compounds with a methyl group next to a carbonyl group, or next to a carbon carrying a hydroxyl group that can be oxidised to one. Ethanol and propan-2-ol give it; methanol and propan-1-ol do not. Iodoform was used as an antiseptic because it releases iodine.',
    }),
    sl('concept', 'Dichloromethane, tetrachloromethane and freons', {
      b: 'Useful polyhalogen compounds carry health and environmental costs.',
      v: table(['Compound', 'Structure', 'Uses', 'Effects'], [['Dichloromethane', 'CH₂Cl₂, tetrahedral', 'Paint remover, solvent, aerosol propellant', 'Harms the central nervous system; irritant'], ['Tetrachloromethane', 'CCl₄, tetrahedral, non-polar', 'Formerly solvent and in making freons', 'Liver damage; reaches stratosphere and depletes ozone'], ['Freons (CFCs), e.g. CCl₂F₂ (freon-12)', 'Chlorofluoromethanes/ethanes', 'Refrigerants, aerosol propellants', 'Stable; in the stratosphere UV releases Cl• which destroys ozone']], 'Table of dichloromethane, tetrachloromethane and freons'),
      m: [r`\ce{CF2Cl2 ->[UV] CF2Cl^. + Cl^.}`, r`\ce{Cl^. + O3 -> ClO^. + O2}`],
      n: 'Dichloromethane is a good solvent and paint remover, but high exposure affects the nervous system. Tetrachloromethane, once a common solvent, damages the liver and helps destroy ozone. Freons, such as dichlorodifluoromethane, were ideal refrigerants because they are unreactive and non-toxic. That very stability lets them drift into the stratosphere, where ultraviolet light releases chlorine atoms, each of which can destroy thousands of ozone molecules.',
    }),
    sl('check', 'Quick check: polyhalogen compounds', {
      b: 'Identify a property, test or environmental effect of a polyhalogen compound.',
      n: 'Quick check. Recall the iodoform test and why chloroform and freons need care.',
      chk: 'poly-mcq',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'Nucleophiles: OH⁻ → ROH; NH₃ → RNH₂; KCN → RCN; AgCN → RNC; KNO₂ → RONO; AgNO₂ → RNO₂; R′COOAg → ester; LiAlH₄ → RH.',
        'SN2: one step, second order, inversion, CH₃X > 1° > 2° > 3°. SN1: carbocation, first order, racemisation, 3° > 2° > 1°.',
        'Alcoholic KOH: β-elimination; Saytzeff: more substituted alkene major.',
        'Wurtz: 2RX + 2Na → R–R; Grignard: RX + Mg → RMgX (dry ether).',
        'CHCl₃ → phosgene in light (dark full bottles); CHI₃ test for CH₃CO–/CH₃CH(OH)–; CFCs destroy ozone.',
      ],
      v: table(['Mechanism', 'Rate law', 'Stereochemistry'], [['SN1', 'k[RX]', 'Racemisation'], ['SN2', 'k[RX][Nu⁻]', 'Inversion']], 'Summary table of SN1 and SN2'),
      n: 'Let us sum up Part 2. Nucleophiles replace the halogen by S N two, in one step with inversion, or by S N one, through a carbocation with racemisation. Alcoholic potassium hydroxide causes elimination following Saytzeff’s rule. Sodium couples haloalkanes and magnesium forms Grignard reagents. Chloroform, iodoform, dichloromethane, tetrachloromethane and freons each have uses, and some serious hazards.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'Specify aqueous KOH (substitution) or alcoholic KOH (elimination).',
        'Give rate law and stereochemistry for each mechanism.',
        'K salts: attack via C (CN⁻) or O (NO₂⁻); Ag salts: via N.',
        'Mention phosgene and dark, full bottles for chloroform storage.',
      ],
      v: table(['Slip', 'Fix'], [['KCN gives isocyanide', 'KCN → nitrile'], ['SN1 gives inversion', 'SN1 → racemisation'], ['Methanol gives iodoform', 'Methanol: negative']], 'Table of three common slips in Part 2 and fixes'),
      n: 'Final tips. Always state aqueous or alcoholic potassium hydroxide. For mechanisms, give the rate law and the stereochemistry. Learn which salts attack through which atom. And for chloroform, mention phosgene and how the bottles are filled and stored.',
    }),
  ],
});
