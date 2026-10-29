// ch06 Haloalkanes and Haloarenes — two decks: Part 1 (t01–t03) classification, naming, C–X bond, preparation,
// physical properties; Part 2 (t04–t06) SN1/SN2, elimination, metals, haloarenes, polyhalogen compounds.
import { sl, deck, table, flow, svgV, chem, r } from './lib.mjs';
import { POLAR, SN2, RESONANCE } from './svgs.mjs';

export const V = {
  polar: svgV(POLAR, 'A polar carbon–halogen bond with a partial positive charge on carbon and a partial negative charge on the halogen, and a nucleophile attacking the carbon'),
  sn2: svgV(SN2, 'SN2 reaction of hydroxide with bromomethane: backside attack, a transition state with the three hydrogens in one plane, and an inverted product with bromide leaving', 'Schematic; the inversion is like an umbrella turning inside out in the wind.'),
  resonance: svgV(RESONANCE, 'Two resonance structures of chlorobenzene, one with a single carbon–chlorine bond and one with a carbon–chlorine double bond and a negative charge at the ortho carbon'),
};

export const deck1 = deck({
  part: 1,
  title: 'Haloalkanes and Haloarenes — Part 1: Structure, naming, preparation and physical properties',
  goals: [
    'Classify halogen compounds and name them by IUPAC rules',
    'Describe the polarity, length and strength of the C–X bond',
    'Write methods of preparing haloalkanes and haloarenes from alcohols, hydrocarbons and by halogen exchange',
    'Explain trends in boiling point, density and solubility',
  ],
  slides: [
    sl('title', 'Haloalkanes and Haloarenes', {
      b: 'Part 1 — organic compounds in which a halogen atom replaces hydrogen: how they are named, made and how they behave physically.',
      v: table(['Compound', 'Use'], [['Chloroform', 'Solvent; once an anaesthetic'], ['Halothane', 'Inhaled anaesthetic'], ['Chloramphenicol', 'Antibiotic (contains chlorine)'], ['PVC', 'Pipes and cable insulation'], ['Freons', 'Old refrigerants; damage the ozone layer']], 'Table of familiar halogen compounds and their uses'),
      n: 'Namaste! Pipes made of PVC, anaesthetics used in surgery, some antibiotics and the old refrigerants that damaged the ozone layer all contain carbon bonded to a halogen. When a halogen replaces a hydrogen atom of an alkane we get a haloalkane; when it replaces a hydrogen of an aromatic ring, a haloarene. In this part we classify and name them, see how to make them, and explain their physical properties.',
    }),
    sl('concept', 'Classifying halogen compounds', {
      b: 'By the **number of halogen atoms** (mono-, di-, poly-) and by the **type of carbon** bearing the halogen.',
      v: table(['Class', 'C bearing X', 'Example'], [['Primary (1°) alkyl halide', 'sp³ C joined to one other C', r`$\ce{CH3CH2Br}$`], ['Secondary (2°)', 'sp³ C joined to two C', r`$\ce{(CH3)2CHCl}$`], ['Tertiary (3°)', 'sp³ C joined to three C', r`$\ce{(CH3)3CBr}$`], ['Allylic halide', 'sp³ C next to a C=C', r`$\ce{CH2=CHCH2Cl}$`], ['Benzylic halide', 'sp³ C next to a benzene ring', r`$\ce{C6H5CH2Cl}$`], ['Vinylic halide', 'sp² C of a C=C', r`$\ce{CH2=CHCl}$`], ['Aryl halide', 'sp² C of a benzene ring', r`$\ce{C6H5Cl}$`]], 'Table classifying halogen compounds as primary, secondary, tertiary, allylic, benzylic, vinylic and aryl halides with examples'),
      n: 'We sort halogen compounds by the carbon atom that carries the halogen. If it is an sp three carbon, we have alkyl halides, which are primary, secondary or tertiary depending on how many other carbons are attached, as well as allylic and benzylic halides next to a double bond or a ring. If the halogen sits on an sp two carbon of a double bond or a benzene ring, we have vinylic or aryl halides, which behave very differently.',
    }),
    sl('concept', 'Naming halogen compounds', {
      b: 'In IUPAC names the halogen is a **prefix** (fluoro, chloro, bromo, iodo) with a locant on the longest chain. Common names use the alkyl group + halide.',
      v: table(['Structure', 'Common name', 'IUPAC name'], [[r`$\ce{CH3CH2Br}$`, 'Ethyl bromide', 'Bromoethane'], [r`$\ce{(CH3)2CHCl}$`, 'Isopropyl chloride', '2-Chloropropane'], [r`$\ce{(CH3)3CBr}$`, 'tert-Butyl bromide', '2-Bromo-2-methylpropane'], [r`$\ce{CH2=CHCH2Cl}$`, 'Allyl chloride', '3-Chloroprop-1-ene'], [r`$\ce{C6H5CH2Cl}$`, 'Benzyl chloride', '(Chloromethyl)benzene'], [r`$\ce{CH2BrCH2Br}$`, 'Ethylene dibromide (vic)', '1,2-Dibromoethane'], [r`$\ce{CH3CHCl2}$`, 'Ethylidene chloride (gem)', '1,1-Dichloroethane']], 'Table of common and IUPAC names of seven halogen compounds'),
      n: 'In IUPAC names, the halogen is written as a prefix, such as chloro or bromo, with a number showing its position on the longest chain. So isopropyl chloride is two-chloropropane, and tert-butyl bromide is two-bromo-two-methylpropane. When two halogens are on neighbouring carbons they are called vicinal; when both are on the same carbon, geminal. Benzyl chloride is named as chloromethyl benzene.',
    }),
    sl('example', 'Worked example: naming and classifying', {
      b: r`**Problem.** Name and classify (a) $\ce{CH3CH2CH(Cl)CH3}$, (b) $\ce{(CH3)2C(Br)CH2CH3}$, (c) $\ce{CH3CH=CHCH2Br}$, (d) 1,4-dichlorobenzene.

**(a)** 2-Chlorobutane — secondary alkyl halide.

**(b)** 2-Bromo-2-methylbutane — tertiary alkyl halide.

**(c)** 1-Bromobut-2-ene — allylic halide (C–Br carbon next to C=C).

**(d)** 1,4-Dichlorobenzene (p-dichlorobenzene) — aryl dihalide.`,
      v: flow('LR', [['a', 'Find the longest chain containing C–X'], ['b', 'Number to give the halogen (or C=C) the lowest locant'], ['c', 'Prefixes in alphabetical order'], ['d', 'Classify by the carbon bearing X']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow for naming and classifying a halogen compound: longest chain, lowest locants, alphabetical prefixes, then classify the carbon bearing the halogen'),
      n: 'Work step by step. Find the longest carbon chain, number it so the substituents get the lowest numbers, and list prefixes alphabetically. Then look at the carbon carrying the halogen. In the first example, it has two carbon neighbours, so it is secondary. In the second, three, so it is tertiary. In the third, it is next to a double bond, so it is allylic.',
    }),
    sl('diagram', 'The carbon–halogen bond', {
      b: 'Halogens are more electronegative than carbon, so the C–X bond is **polar**: carbon is δ+ and is attacked by **nucleophiles**.',
      v: V.polar,
      n: 'Every chemical property of haloalkanes comes from this bond. The halogen pulls the shared electrons towards itself, so the carbon carries a small positive charge and the halogen a small negative charge. Electron-rich species called nucleophiles are attracted to that positive carbon. That is why the typical reaction of haloalkanes is nucleophilic substitution, which we study in Part 2.',
    }),
    sl('concept', 'Bond length and bond strength', {
      b: 'Down the group the halogen atom gets larger, so the C–X bond becomes **longer and weaker**; C–I bonds break most easily.',
      v: table(['Bond', 'Bond length / pm', 'Bond enthalpy / kJ mol⁻¹', 'Dipole moment of CH₃X / D'], [['C–F', '139', '452', '1.85'], ['C–Cl', '178', '351', '1.86'], ['C–Br', '193', '293', '1.83'], ['C–I', '214', '234', '1.64']], 'Table of carbon–halogen bond lengths, bond enthalpies and dipole moments of the halomethanes'),
      n: 'Look at the trend. From fluorine to iodine, the bond gets longer and much weaker, from about four hundred and fifty to about two hundred and thirty kilojoules per mole. So iodoalkanes react fastest, because their carbon–iodine bond breaks most easily. Dipole moments do not follow electronegativity simply, because longer bonds partly compensate for smaller charges.',
    }),
    sl('check', 'Quick check: classification', {
      b: 'Classify a halogen compound from its structure.',
      n: 'Quick check. Look at the hybridisation of the carbon carrying the halogen, and at what its neighbours are.',
      chk: 'classify-mcq',
    }),
    sl('concept', 'Preparation from alcohols', {
      b: 'The –OH group of an alcohol is replaced by a halogen using HX, phosphorus halides or thionyl chloride. **Thionyl chloride** is preferred: its by-products are gases, leaving pure haloalkane.',
      m: [r`\ce{CH3CH2OH + HCl ->[ZnCl2] CH3CH2Cl + H2O}`, r`\ce{3C2H5OH + PCl3 -> 3C2H5Cl + H3PO3}`, r`\ce{C2H5OH + PCl5 -> C2H5Cl + POCl3 + HCl}`, r`\ce{C2H5OH + SOCl2 -> C2H5Cl + SO2 + HCl}`],
      v: table(['Reagent', 'Notes'], [['HCl with anhydrous ZnCl₂ (Lucas reagent)', '1° and 2° alcohols; 3° react with conc. HCl at room temperature'], ['HBr, HI', 'HI made from KI + H₃PO₄'], ['PCl₃, PCl₅, PBr₃ (red P + Br₂)', 'Good yields'], ['SOCl₂ in pyridine', 'Best: SO₂ and HCl escape as gases']], 'Table of reagents for converting alcohols into haloalkanes with notes on each'),
      n: 'Alcohols are the commonest starting point. Hydrogen chloride needs anhydrous zinc chloride as a catalyst for primary and secondary alcohols, while tertiary alcohols react readily even without it. Phosphorus trichloride and pentachloride also work well. Best of all is thionyl chloride, because its by-products, sulfur dioxide and hydrogen chloride, are gases that simply escape, leaving the chloroalkane almost pure.',
    }),
    sl('concept', 'Preparation from hydrocarbons and diazonium salts', {
      b: '**Alkanes:** free-radical halogenation gives mixtures. **Alkenes:** add HX (Markovnikov’s rule; with HBr and peroxide, anti-Markovnikov) or X₂. **Arenes:** electrophilic substitution with a Lewis acid gives o- and p-isomers. **Diazonium salts:** Sandmeyer reaction.',
      m: [r`\ce{C6H6 + Cl2 ->[FeCl3] C6H5Cl + HCl}`, r`\ce{C6H5N2Cl ->[CuCl/HCl] C6H5Cl + N2}`],
      v: table(['Starting material', 'Reagent', 'Product'], [['Propene', 'HBr', '2-Bromopropane (Markovnikov)'], ['Propene', 'HBr + peroxide', '1-Bromopropane (anti-Markovnikov)'], ['Ethene', 'Br₂ in CCl₄', '1,2-Dibromoethane'], ['Toluene', 'Cl₂, FeCl₃, dark', '2- and 4-chlorotoluene'], ['Benzenediazonium chloride', 'CuCl/HCl or CuBr/HBr', 'Chloro- or bromobenzene']], 'Table of preparations of halogen compounds from alkenes, arenes and diazonium salts'),
      n: 'Hydrocarbons are another source. Halogenating alkanes in light gives messy mixtures, so it is rarely useful. Hydrogen bromide adds to propene to give two-bromopropane, following Markovnikov’s rule, but with peroxide present it gives one-bromopropane instead. Benzene reacts with chlorine only with a Lewis acid catalyst. And aryl halides are neatly made from diazonium salts by the Sandmeyer reaction.',
    }),
    sl('concept', 'Halogen exchange', {
      b: '**Finkelstein reaction:** chloro- or bromoalkanes react with NaI in dry acetone to give iodoalkanes; NaCl and NaBr are insoluble in acetone and precipitate, driving the reaction forward. **Swarts reaction:** heating with AgF, Hg₂F₂ or SbF₃ gives fluoroalkanes.',
      m: [r`\ce{CH3CH2Cl + NaI ->[acetone] CH3CH2I + NaCl}`, r`\ce{CH3Br + AgF -> CH3F + AgBr}`],
      v: table(['Reaction', 'Reagent', 'Product type'], [['Finkelstein', 'NaI in dry acetone', 'Iodoalkane'], ['Swarts', 'AgF, Hg₂F₂, CoF₂ or SbF₃', 'Fluoroalkane']], 'Table of the Finkelstein and Swarts halogen exchange reactions'),
      n: 'Iodo and fluoro compounds are made by swapping halogens. In the Finkelstein reaction, a chloroalkane is stirred with sodium iodide in dry acetone. Sodium chloride does not dissolve in acetone, so it precipitates and pulls the reaction forward. In the Swarts reaction, metal fluorides such as silver fluoride replace chlorine or bromine by fluorine.',
    }),
    sl('example', 'Worked example: choosing a preparation', {
      b: r`**Problem.** Suggest a method for each conversion: (a) propan-2-ol → 2-chloropropane with a pure product; (b) propene → 1-bromopropane; (c) bromoethane → iodoethane; (d) aniline → chlorobenzene.

**(a)** $\ce{SOCl2}$ (by-products are gases).

**(b)** HBr in the presence of a peroxide (anti-Markovnikov).

**(c)** NaI in dry acetone (Finkelstein).

**(d)** $\ce{NaNO2 + HCl}$ at 273–278 K to make the diazonium salt, then CuCl/HCl (Sandmeyer).`,
      v: table(['Conversion', 'Method'], [['Alcohol → chloroalkane', 'SOCl₂'], ['Alkene → 1-bromoalkane', 'HBr + peroxide'], ['Bromoalkane → iodoalkane', 'NaI, acetone'], ['Arylamine → aryl chloride', 'Diazotise, then CuCl/HCl']], 'Table of four conversions and the method chosen for each'),
      n: 'Match the method to the task. For a pure chloroalkane from an alcohol, thionyl chloride is the clean choice. To put bromine on the end carbon of propene, add hydrogen bromide with a peroxide. To make an iodoalkane, use the Finkelstein reaction. And to turn aniline into chlorobenzene, first make the diazonium salt in the cold, then treat it with copper one chloride.',
    }),
    sl('check', 'Quick check: preparation', {
      b: 'Pick the reagent that converts an alcohol to a chloroalkane with only gaseous by-products.',
      n: 'Quick check. Think about which reagent produces sulfur dioxide and hydrogen chloride as by-products.',
      chk: 'socl2-mcq',
    }),
    sl('concept', 'Physical properties', {
      b: 'Haloalkanes are polar, so they have **higher boiling points** than alkanes of similar mass. Boiling point rises with the size of the halogen and the chain length, and falls with **branching** (smaller surface area). Bromo- and iodo-compounds are **denser than water**. They are only slightly soluble in water but dissolve well in organic solvents.',
      v: table(['Compound', 'Boiling point / °C'], [['Fluoromethane', '−78'], ['Chloromethane', '−24'], ['Bromomethane', '4'], ['Iodomethane', '42']], 'Table of boiling points of the halomethanes rising from fluoromethane to iodomethane'),
      n: 'Haloalkanes boil higher than alkanes of similar size, because their molecules are polar and larger. Among halomethanes, boiling point rises from fluoro to iodo as the molecules get heavier and more polarisable. Bromo and iodo compounds sink in water. They dissolve only slightly in water: breaking water’s hydrogen bonds costs more energy than is returned by the weaker attractions to the haloalkane.',
    }),
    sl('example', 'Worked example: boiling points of isomers', {
      b: r`**Problem.** Arrange in order of increasing boiling point: 1-bromobutane, 2-bromobutane, 2-bromo-2-methylpropane.

**Step 1.** All have the formula $\ce{C4H9Br}$, so molar mass is equal.

**Step 2.** More branching → more compact, spherical molecules → smaller contact area → weaker van der Waals forces.

**Step 3.** Order: 2-bromo-2-methylpropane (346 K) < 2-bromobutane (364 K) < 1-bromobutane (375 K).`,
      v: table(['Isomer', 'Branching', 'Boiling point / K'], [['2-Bromo-2-methylpropane', 'Most', '346'], ['2-Bromobutane', 'Some', '364'], ['1-Bromobutane', 'None', '375']], 'Table of three bromobutane isomers with their degree of branching and boiling points'),
      n: 'All three isomers have the same formula and mass, so the difference must come from shape. The straight-chain one-bromobutane has the largest surface for molecules to touch, so the attractions are strongest and it boils highest. The highly branched two-bromo-two-methylpropane is almost spherical, touches its neighbours least, and boils lowest.',
    }),
    sl('concept', 'Melting points of dichlorobenzenes', {
      b: 'The three dichlorobenzenes boil at similar temperatures, but the **para** isomer melts much higher: its symmetrical molecules **pack better** in the crystal.',
      v: table(['Isomer', 'Melting point / K', 'Reason'], [['1,2- (ortho)', '256', 'Less symmetrical, poorer packing'], ['1,3- (meta)', '249', 'Less symmetrical, poorer packing'], ['1,4- (para)', '323', 'Symmetrical, packs closely in the solid']], 'Table of melting points of ortho, meta and para dichlorobenzene showing the much higher melting point of the para isomer'),
      n: 'Melting depends on how well molecules fit together in a crystal. Para-dichlorobenzene is symmetrical, so its molecules stack neatly like bricks, and more energy is needed to break the lattice. It is a solid at room temperature, used in moth balls, while the ortho and meta isomers are liquids.',
    }),
    sl('check', 'Quick check: physical properties', {
      b: 'Predict which of two isomeric halides has the higher boiling point.',
      n: 'Quick check. With equal molar masses, compare how branched, and therefore how compact, the molecules are.',
      chk: 'bp-isomer-mcq',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Classify by the carbon bearing X: 1°, 2°, 3°, allylic, benzylic (sp³); vinylic, aryl (sp²).',
        'IUPAC: halogen as prefix with locant; vic and gem dihalides.',
        'C–X is polar (C δ+); bond length increases and strength decreases from F to I.',
        'From alcohols: HX/ZnCl₂, PCl₃, PCl₅, SOCl₂ (best); from alkenes: HX (Markovnikov, peroxide effect); arenes: X₂/FeX₃; Sandmeyer; Finkelstein and Swarts exchange.',
        'Boiling point rises with mass and falls with branching; RBr and RI are denser than water; slightly soluble in water.',
      ],
      v: table(['Preparation', 'Key reagent'], [['ROH → RCl', 'SOCl₂ (best)'], ['Alkene → RBr (anti-Markovnikov)', 'HBr + peroxide'], ['RCl → RI', 'NaI / acetone'], ['ArNH₂ → ArCl', 'Diazotise + CuCl']], 'Summary table of preparations and key reagents'),
      n: 'Let us sum up Part 1. We classify halogen compounds by the carbon that carries the halogen, and name them with halogen prefixes. The carbon–halogen bond is polar and gets longer and weaker down the group. We can make these compounds from alcohols, alkenes, arenes and diazonium salts, or by halogen exchange. Their boiling points depend on size and branching, and the heavier ones sink in water.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'Write full balanced equations with conditions (ZnCl₂, FeCl₃, dry acetone, peroxide).',
        'Explain why SOCl₂ is preferred: gaseous by-products.',
        'For Finkelstein, mention that NaCl/NaBr precipitate in acetone.',
        'For boiling points of isomers, mention surface area and van der Waals forces.',
        'Do not confuse allylic (next to C=C) with vinylic (on C=C).',
      ],
      v: table(['Slip', 'Fix'], [['Peroxide effect with HCl', 'Only with HBr'], ['Benzene + Cl₂ without catalyst', 'Needs FeCl₃ or AlCl₃'], ['Branching raises bp', 'Branching lowers bp']], 'Table of three common slips in Part 1 and their fixes'),
      n: 'Some exam tips. Always write the conditions with your equations. Give the reason why thionyl chloride is the best reagent. For the Finkelstein reaction, say why it goes to completion. Remember that the peroxide effect works only with hydrogen bromide. And keep allylic and vinylic halides apart: one is next to the double bond, the other is on it.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Haloalkanes and Haloarenes — Part 2: Reactions and polyhalogen compounds',
  goals: [
    'Write products of nucleophilic substitution and explain ambident nucleophiles',
    'Compare SN1 and SN2 mechanisms, their kinetics, stereochemistry and reactivity orders',
    'Predict elimination products by Saytzeff’s rule and write Grignard, Wurtz and Fittig reactions',
    'Explain the low reactivity of haloarenes, their electrophilic substitution, and the uses and hazards of polyhalogen compounds',
  ],
  slides: [
    sl('title', 'Reactions of halogen compounds', {
      b: 'Part 2 — substitution, elimination and reactions with metals, and why aryl halides are so unreactive.',
      v: flow('LR', [['a', 'Haloalkane'], ['b', 'Nucleophilic substitution (SN1, SN2)'], ['c', 'Elimination → alkene'], ['d', 'With metals: Grignard, Wurtz']], [['a', 'b'], ['a', 'c'], ['a', 'd']], 'Flow: a haloalkane can undergo nucleophilic substitution, elimination to an alkene or reaction with metals'),
      n: 'Haloalkanes are the workhorses of organic synthesis. Their polar carbon–halogen bond lets us swap the halogen for almost any group, remove it with a hydrogen to make an alkene, or join carbon chains using metals. In this part we study how these reactions happen, step by step, and why the same halogen on a benzene ring is so much harder to replace.',
    }),
    sl('concept', 'Nucleophilic substitution', {
      b: 'A nucleophile replaces the halogen: $\\ce{Nu- + R-X -> R-Nu + X-}$. **Ambident** nucleophiles such as $\\ce{CN-}$ and $\\ce{NO2-}$ can attack through either of two atoms.',
      m: [r`\ce{CH3CH2Br + KCN -> CH3CH2CN + KBr}`, r`\ce{CH3CH2Br + AgCN -> CH3CH2NC + AgBr}`],
      v: table(['Reagent', 'Nucleophile', 'Product'], [['Aqueous KOH', r`$\ce{OH-}$`, 'Alcohol'], ['Sodium alkoxide', r`$\ce{RO-}$`, 'Ether (Williamson)'], ['KCN (ionic)', r`$\ce{CN-}$ via C`, 'Nitrile (alkyl cyanide)'], ['AgCN (covalent)', 'via N', 'Isocyanide'], ['KNO₂', r`$\ce{NO2-}$ via O`, 'Alkyl nitrite'], ['AgNO₂', 'via N', 'Nitroalkane'], ['NH₃ (excess)', r`$\ce{NH3}$`, 'Amine'], ['LiAlH₄', r`$\ce{H-}$`, 'Alkane']], 'Table of nucleophilic substitution reagents, the attacking nucleophile and the product formed'),
      n: 'In nucleophilic substitution, an electron-rich species pushes out the halide ion and takes its place. Hydroxide gives an alcohol, alkoxide an ether, ammonia an amine. Cyanide is interesting: with ionic potassium cyanide, the carbon end attacks and a nitrile forms; with covalent silver cyanide, the nitrogen end attacks and an isocyanide forms. Nitrite behaves similarly, giving nitrites or nitroalkanes.',
    }),
    sl('concept', 'The SN2 mechanism', {
      b: '**S**ubstitution, **N**ucleophilic, **bi**molecular: one step. The nucleophile attacks from the side **opposite** the halogen while the C–X bond breaks. Rate $= k[\\ce{RX}][\\ce{Nu-}]$ (second order). The configuration is **inverted**. Reactivity: $\\ce{CH3X}$ > 1° > 2° > 3° (bulky groups block the backside).',
      v: table(['Halide', 'Relative SN2 rate', 'Reason'], [['Methyl', 'Fastest', 'No groups to block attack'], ['Primary', 'Fast', 'Little crowding'], ['Secondary', 'Slow', 'More crowding'], ['Tertiary', 'Very slow', 'Backside blocked by three groups']], 'Table of relative SN2 rates for methyl, primary, secondary and tertiary halides with the steric reason'),
      n: 'In the S N two mechanism, everything happens in a single step. The nucleophile must reach the carbon from the back, directly opposite the leaving halogen. Both species are involved in this step, so the rate depends on both concentrations. Bulky groups around the carbon get in the way, so methyl and primary halides react fastest and tertiary halides hardly at all by this route.',
    }),
    sl('diagram', 'SN2: backside attack and inversion', {
      b: 'In the transition state the carbon is partly bonded to both the nucleophile and the leaving group, with the other three groups in a plane. As the halide leaves, the three groups flip over: **Walden inversion**.',
      v: V.sn2,
      n: 'Follow the picture from left to right. Hydroxide approaches the carbon from the side away from bromine. In the middle, the transition state, the oxygen–carbon bond is half formed and the carbon–bromine bond half broken, and the three hydrogens lie flat. Then bromide leaves, and the hydrogens flip to the other side, like an umbrella turned inside out by the wind. If the carbon were chiral, its configuration would be inverted.',
    }),
    sl('concept', 'The SN1 mechanism', {
      b: '**Uni**molecular, two steps: (1) slow ionisation to a **carbocation**; (2) fast attack by the nucleophile. Rate $= k[\\ce{RX}]$ (first order). Favoured for **3°** halides (stable carbocations) and in **polar protic** solvents (water, alcohols). Allylic and benzylic halides also react fast (resonance-stabilised carbocations).',
      v: flow('LR', [['a', 'R–X'], ['b', 'Slow: R⁺ + X⁻ (carbocation)'], ['c', 'Fast: R⁺ + Nu⁻ → R–Nu']], [['a', 'b'], ['b', 'c']], 'Flow of the SN1 mechanism: slow ionisation to a carbocation, then fast attack by the nucleophile'),
      n: 'The S N one mechanism is a two-step process. First, the carbon–halogen bond breaks on its own to give a carbocation; this slow step sets the rate, which depends only on the haloalkane. Then the nucleophile quickly joins the carbocation. Tertiary carbocations are the most stable, so tertiary halides react fastest this way, especially in polar solvents like water that help the ions separate.',
    }),
    sl('two-column', 'SN1 versus SN2', {
      b: 'The two mechanisms differ in every respect.',
      cols: [
        '**SN2**\n\n- One step, no intermediate\n- Rate = k[RX][Nu⁻]\n- Order of reactivity: CH₃X > 1° > 2° > 3°\n- Inversion of configuration\n- Favoured by strong nucleophiles, polar aprotic solvents',
        '**SN1**\n\n- Two steps via a carbocation\n- Rate = k[RX]\n- Order of reactivity: 3° > 2° > 1° > CH₃X\n- Racemisation (mostly) at a chiral centre\n- Favoured by polar protic solvents, stable carbocations',
      ],
      v: table(['Feature', 'SN1', 'SN2'], [['Steps', '2', '1'], ['Kinetics', 'First order', 'Second order'], ['Best substrate', '3°, allylic, benzylic', 'Methyl, 1°'], ['Stereochemistry', 'Racemisation', 'Inversion']], 'Table comparing SN1 and SN2 mechanisms by steps, kinetics, best substrate and stereochemistry'),
      n: 'Put the two mechanisms side by side. S N two is one step, second order, fastest for methyl and primary halides, and inverts the configuration. S N one goes through a carbocation, is first order, fastest for tertiary halides, and because the flat carbocation can be attacked from either face, a chiral starting material gives a nearly racemic product.',
    }),
    sl('concept', 'Stereochemistry: chirality and optical activity', {
      b: 'A carbon with four different groups is **chiral**; such a molecule and its mirror image (**enantiomers**) are non-superimposable and rotate plane-polarised light equally in opposite directions (**dextro** +, **laevo** −). A 1 : 1 mixture (**racemic mixture**) is optically inactive.',
      v: table(['Term', 'Meaning'], [['Chiral centre', 'Carbon with four different groups'], ['Enantiomers', 'Non-superimposable mirror images'], ['Racemic mixture', 'Equal amounts of both enantiomers; no net rotation'], ['Retention', 'Product has the same configuration as the reactant'], ['Inversion', 'Product has the opposite configuration']], 'Table of stereochemical terms: chiral centre, enantiomers, racemic mixture, retention and inversion'),
      n: 'Your hands are mirror images that do not fit on top of each other: they are chiral. A carbon atom with four different groups makes a molecule chiral too. The two mirror-image forms, called enantiomers, rotate polarised light in opposite directions. An equal mixture of both, a racemic mixture, shows no rotation. S N two gives inversion; S N one gives mostly racemisation.',
    }),
    sl('example', 'Worked example: which reacts faster?', {
      b: r`**Problem.** In each pair, which reacts faster in the stated mechanism? (a) SN2: 1-bromobutane or 2-bromobutane; (b) SN1: 2-bromo-2-methylpropane or 2-bromobutane; (c) SN1: $\ce{C6H5CH2Cl}$ or $\ce{C6H5CH(CH3)Cl}$.

**(a)** 1-Bromobutane: primary, less crowded.

**(b)** 2-Bromo-2-methylpropane: tertiary carbocation is more stable.

**(c)** $\ce{C6H5CH(CH3)Cl}$: secondary benzylic carbocation, stabilised by both the ring and the methyl group.`,
      v: table(['Pair', 'Faster', 'Reason'], [['SN2: 1° vs 2°', '1°', 'Less steric hindrance'], ['SN1: 3° vs 2°', '3°', 'More stable carbocation'], ['SN1: benzylic 1° vs 2°', '2° benzylic', 'Resonance + alkyl stabilisation']], 'Table of the three pairs, the faster compound and the reason'),
      n: 'Decide first which mechanism is asked. For S N two, ask how crowded the carbon is: the primary bromide wins. For S N one, ask how stable the carbocation is: the tertiary bromide wins. In the last pair, both give benzylic carbocations stabilised by the ring, but the one with an extra methyl group is more stable still, so it reacts faster.',
    }),
    sl('check', 'Quick check: mechanism', {
      b: 'Identify the mechanism from rate data and stereochemistry.',
      n: 'Quick check. Use two clues: does the rate depend on the nucleophile, and is the configuration inverted or scrambled?',
      chk: 'sn-mechanism-mcq',
    }),
    sl('concept', 'Elimination and Saytzeff’s rule', {
      b: 'With **alcoholic KOH**, a hydrogen from the β-carbon and the halogen are removed to form an alkene (**β-elimination**). **Saytzeff (Zaitsev) rule:** the **more substituted alkene** (fewer H on the double-bond carbons) is the major product.',
      m: [r`\ce{CH3CH2CHBrCH3 ->[alc. KOH][\Delta] CH3CH=CHCH3}\ \text{(major)}`, r`\ce{CH3CH2CHBrCH3 ->[alc. KOH][\Delta] CH2=CHCH2CH3}\ \text{(minor)}`],
      v: table(['Haloalkane', 'Major alkene', 'Minor alkene'], [['2-Bromobutane', 'But-2-ene', 'But-1-ene'], ['2-Bromo-2-methylbutane', '2-Methylbut-2-ene', '2-Methylbut-1-ene']], 'Table of two elimination reactions with the major and minor alkene products by Saytzeff’s rule'),
      n: 'When a haloalkane is heated with potassium hydroxide in alcohol instead of water, the hydroxide acts as a base. It pulls off a hydrogen from the carbon next to the one carrying the halogen, and the halide leaves, forming a double bond. If there is a choice, the more substituted alkene, with more alkyl groups on the double bond, forms in larger amount. This is Saytzeff’s rule.',
    }),
    sl('concept', 'Substitution or elimination?', {
      b: 'Nucleophiles are also bases, so substitution and elimination compete.',
      v: table(['Conditions or substrate', 'Main reaction'], [['Primary halide, aqueous KOH', 'Substitution (alcohol)'], ['Tertiary halide, alcoholic KOH, heat', 'Elimination (alkene)'], ['Strong, bulky base', 'Elimination'], ['Good nucleophile, weak base (e.g. I⁻, CN⁻)', 'Substitution']], 'Table of conditions favouring substitution or elimination'),
      n: 'Because a nucleophile is also a base, substitution and elimination are always in competition. Primary halides with aqueous hydroxide mostly give substitution. Tertiary halides with alcoholic hydroxide and heat mostly give elimination, because the crowded carbon is hard to attack but its hydrogens are easy to remove. Bulky strong bases favour elimination.',
    }),
    sl('concept', 'Reactions with metals', {
      b: '**Grignard reagents** form with Mg in dry ether and are destroyed by water. **Wurtz reaction:** two alkyl halides join with Na in dry ether. **Wurtz–Fittig** joins an aryl and an alkyl halide; **Fittig** joins two aryl halides.',
      m: [r`\ce{CH3CH2Br + Mg ->[dry ether] CH3CH2MgBr}`, r`\ce{CH3CH2MgBr + H2O -> CH3CH3 + Mg(OH)Br}`, r`\ce{2CH3CH2Br + 2Na ->[dry ether] CH3CH2CH2CH3 + 2NaBr}`, r`\ce{C6H5Cl + CH3Cl + 2Na ->[dry ether] C6H5CH3 + 2NaCl}`],
      v: table(['Reaction', 'Reactants', 'Product'], [['Grignard', 'RX + Mg, dry ether', 'RMgX'], ['Wurtz', '2RX + 2Na', 'R–R'], ['Wurtz–Fittig', 'ArX + RX + 2Na', 'Ar–R'], ['Fittig', '2ArX + 2Na', 'Ar–Ar']], 'Table of reactions of halogen compounds with metals: Grignard, Wurtz, Wurtz–Fittig and Fittig'),
      n: 'Haloalkanes react with metals in dry ether. Magnesium gives Grignard reagents, very useful for making new carbon–carbon bonds, but so reactive that even a trace of water destroys them, giving an alkane. Sodium joins two alkyl groups in the Wurtz reaction, an aryl and an alkyl group in the Wurtz–Fittig reaction, or two aryl groups in the Fittig reaction.',
    }),
    sl('diagram', 'Why haloarenes resist nucleophilic substitution', {
      b: 'In chlorobenzene a lone pair on Cl is delocalised into the ring, so the C–Cl bond has **partial double-bond character** and is shorter and stronger. The carbon is **sp²** (more electronegative), the phenyl cation is **unstable**, and the electron-rich ring **repels** nucleophiles.',
      v: V.resonance,
      n: 'Try to replace the chlorine of chlorobenzene with hydroxide in the way that works for chloroethane, and almost nothing happens. One lone pair of chlorine spreads into the ring, as these resonance structures show, so the carbon–chlorine bond is partly double, shorter and harder to break. The phenyl cation would be very unstable, ruling out S N one, and the cloud of ring electrons keeps nucleophiles away, ruling out S N two.',
    }),
    sl('concept', 'Reactions of haloarenes', {
      b: 'Replacement of Cl needs severe conditions, unless **electron-withdrawing groups (–NO₂) at ortho/para** positions help. In **electrophilic substitution**, the halogen is **deactivating** (–I effect) but **ortho/para directing** (+R effect); the para product usually predominates.',
      m: [r`\ce{C6H5Cl + 2NaOH ->[623 K, 300 atm] C6H5ONa + NaCl + H2O}`, r`\ce{C6H5Cl + HNO3 ->[conc. H2SO4] C6H4ClNO2 + H2O}`],
      v: table(['Reaction with chlorobenzene', 'Reagent', 'Products'], [['Nitration', 'conc. HNO₃ + H₂SO₄', '1-Chloro-2-nitro- and 1-chloro-4-nitrobenzene (major)'], ['Halogenation', 'Cl₂, FeCl₃', '1,2- and 1,4-dichlorobenzene'], ['Sulphonation', 'conc. H₂SO₄', '2- and 4-chlorobenzenesulfonic acid'], ['Friedel–Crafts methylation', 'CH₃Cl, AlCl₃', '2- and 4-chlorotoluene']], 'Table of electrophilic substitution reactions of chlorobenzene and their ortho and para products'),
      n: 'Haloarenes do give substitution of the halogen, but only at about six hundred and twenty three kelvin and three hundred atmospheres, as in the old industrial route to phenol. Nitro groups at ortho or para positions make it much easier by pulling electron density away. In electrophilic substitution, chlorine slows the ring down overall but directs the new group to ortho and para positions, with para usually the major product.',
    }),
    sl('example', 'Worked example: predicting products', {
      b: r`**Problem.** Give the main organic product: (a) 1-bromopropane + aqueous KOH; (b) 2-bromopropane + alcoholic KOH, heat; (c) bromobenzene + bromomethane + Na in dry ether; (d) chlorobenzene + Cl₂ with anhydrous FeCl₃; (e) iodomethane + AgNO₂.

**(a)** Propan-1-ol. **(b)** Propene. **(c)** Toluene (methylbenzene). **(d)** 1,4-Dichlorobenzene (major) and 1,2-dichlorobenzene. **(e)** Nitromethane.`,
      v: table(['Reagents', 'Reaction type', 'Product'], [['1-Bromopropane, aq. KOH', 'SN2 substitution', 'Propan-1-ol'], ['2-Bromopropane, alc. KOH', 'Elimination', 'Propene'], ['PhBr + CH₃Br + Na', 'Wurtz–Fittig', 'Toluene'], ['PhCl + Cl₂/FeCl₃', 'Electrophilic substitution', '1,4- (major) and 1,2-dichlorobenzene'], ['CH₃I + AgNO₂', 'Substitution via N', 'Nitromethane']], 'Table of five reactions, their type and product'),
      n: 'First identify the reaction type from the conditions. Aqueous hydroxide on a primary halide gives substitution, so an alcohol. Alcoholic hydroxide with heat gives elimination, so an alkene. Sodium with an aryl and an alkyl halide is the Wurtz–Fittig reaction, giving toluene. Chlorine with a Lewis acid substitutes the ring at ortho and para positions. Silver nitrite attacks through nitrogen, giving a nitroalkane.',
    }),
    sl('check', 'Quick check: haloarene reactivity', {
      b: 'Explain why chlorobenzene is less reactive than chloroethane towards nucleophiles.',
      n: 'Quick check. Think about what resonance does to the carbon–chlorine bond in chlorobenzene.',
      chk: 'haloarene-mcq',
    }),
    sl('concept', 'Polyhalogen compounds', {
      b: 'Compounds with several halogen atoms have important uses, but many are harmful to health or the environment.',
      v: table(['Compound', 'Uses', 'Hazards'], [['Dichloromethane', 'Solvent, paint remover, propellant', 'Harms the nervous system; skin and eye irritant'], ['Chloroform', 'Solvent for fats and alkaloids', 'Air oxidises it to poisonous phosgene; kept in dark, full bottles'], ['Iodoform', 'Antiseptic (releases iodine)', 'Unpleasant smell'], ['Carbon tetrachloride', 'Formerly solvent, refrigerant manufacture', 'Liver damage; depletes ozone'], ['Freons (CFCs)', 'Refrigerants, aerosol propellants', 'Destroy the ozone layer'], ['DDT', 'Insecticide against malaria mosquitoes', 'Persistent; builds up in food chains']], 'Table of six polyhalogen compounds with their uses and hazards'),
      m: [r`\ce{2CHCl3 + O2 ->[light] 2COCl2 + 2HCl}`],
      n: 'Several polyhalogen compounds deserve special mention. Chloroform slowly reacts with air in light to form phosgene, a deadly gas, so it is stored in dark bottles filled to the top. Iodoform is an antiseptic because it releases iodine. Freons are unreactive and non-toxic, which made them popular refrigerants, but in the upper atmosphere they release chlorine atoms that destroy ozone. DDT controls malaria mosquitoes but persists and builds up in food chains.',
    }),
    sl('check', 'Quick check: polyhalogen compounds', {
      b: 'Explain why compounds that are safe to use at ground level can still harm the ozone layer.',
      n: 'Quick check. Think about what happens to a very stable compound that does not break down in the lower atmosphere.',
      chk: 'freon-mcq',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'Nucleophilic substitution: OH⁻ → alcohol, RO⁻ → ether, KCN → nitrile, AgCN → isocyanide, KNO₂ → nitrite, AgNO₂ → nitroalkane.',
        'SN2: one step, second order, inversion, CH₃X > 1° > 2° > 3°. SN1: carbocation, first order, racemisation, 3° > 2° > 1°.',
        'Elimination with alc. KOH; Saytzeff: more substituted alkene is major.',
        'Grignard (Mg, dry ether), Wurtz, Wurtz–Fittig, Fittig.',
        'Haloarenes: C–Cl partial double bond; o/p-directing but deactivating in electrophilic substitution.',
        'Polyhalogen compounds: CH₂Cl₂, CHCl₃ (phosgene), CHI₃, CCl₄, freons (ozone), DDT (persistence).',
      ],
      v: table(['Mechanism', 'Rate law', 'Stereochemistry'], [['SN1', 'k[RX]', 'Racemisation'], ['SN2', 'k[RX][Nu⁻]', 'Inversion']], 'Summary table of the SN1 and SN2 rate laws and stereochemistry'),
      n: 'Let us sum up Part 2. Haloalkanes undergo nucleophilic substitution by two mechanisms: S N two in one step with inversion, favoured for primary halides, and S N one through a carbocation, favoured for tertiary halides. With alcoholic hydroxide they eliminate to alkenes following Saytzeff’s rule. With metals they form Grignard reagents or join up. Haloarenes resist substitution but undergo ortho and para electrophilic substitution, and several polyhalogen compounds are useful but hazardous.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'Say "aqueous KOH" for substitution and "alcoholic KOH" for elimination.',
        'For SN1/SN2 questions, give both the rate law and the stereochemical outcome.',
        'Ambident nucleophiles: K⁺ salts attack through C or O; Ag salts through N.',
        'Explain haloarene inertness with resonance, sp² carbon and phenyl cation instability.',
        'For chloroform storage, mention phosgene and dark, completely filled bottles.',
      ],
      v: table(['Slip', 'Fix'], [['KCN gives isocyanide', 'KCN → nitrile; AgCN → isocyanide'], ['SN1 gives inversion', 'SN1 gives racemisation'], ['Halogen is meta-directing', 'Ortho/para-directing (but deactivating)']], 'Table of three common slips in Part 2 and their fixes'),
      n: 'Some final tips. Always specify aqueous or alcoholic potassium hydroxide, because they give different reactions. In mechanism answers, give both the rate law and the stereochemistry. Learn which salts of cyanide and nitrite attack through which atom. When asked why haloarenes are unreactive, give the resonance argument first. And for chloroform, mention phosgene and how the bottles are stored.',
    }),
  ],
});
