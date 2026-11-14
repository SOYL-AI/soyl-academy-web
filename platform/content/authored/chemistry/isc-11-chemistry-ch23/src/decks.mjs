// ch23 Alkynes — two decks. Part 1 (t01–t03): nomenclature, the triple bond, isomerism, physical properties, preparation (calcium carbide,
// natural gas, dehydrohalogenation, Kolbe's method), acidity and acetylides. Part 2 (t04–t05): addition of H2, X2, HX and water, oxidation,
// ozonolysis, polymerisation, uses and the distinguishing tests.
import { sl, deck, table, flow, chem, svgV } from './lib.mjs';
import { TRIPLE, SCHARACTER, CARBIDE, HYDRATION, REDUCE, POLY } from './svgs.mjs';

export const V = {
  triple: svgV(TRIPLE, 'Ethyne drawn as a straight line with bond angle 180 degrees, and an end-on view showing the two perpendicular pi electron clouds round the sigma bond axis'),
  schar: svgV(SCHARACTER, 'Bar chart of the s character of the carbon orbital in the C-H bond of ethane, ethene and ethyne with approximate pKa values'),
  carbide: svgV(CARBIDE, 'Three steps from limestone to ethyne: lime, then calcium carbide in an electric furnace, then ethyne from carbide and water'),
  hydration: svgV(HYDRATION, 'Hydration of ethyne to ethanal and of propyne to propanone through an unstable enol'),
  reduce: svgV(REDUCE, 'But-2-yne reduced to cis-but-2-ene with Lindlar catalyst, to trans-but-2-ene with sodium in liquid ammonia, and to butane with excess hydrogen and nickel'),
  poly: svgV(POLY, 'Cyclic polymerisation of ethyne to benzene in a red-hot iron tube, and linear polymerisation to vinylacetylene and polyacetylene'),
};

// worked example 1: calcium carbide (computed once)
const mC = 6.4; // g pure CaC2
const nC = mC / 64;
const vE = nC * 22.4;
const mCa = nC * 74;
// worked example 2: gas mixture (computed once)
const vMix = 60.0;
const vRem = 38.0;
const vYne = vMix - vRem;
const pcYne = (vYne / vMix) * 100;
const vH2 = 2 * vYne + vRem;

export const deck1 = deck({
  part: 1,
  title: 'Alkynes — Part 1: Structure, preparation and acidity',
  goals: [
    'Name alkynes and describe the sp hybridised, linear triple bond of ethyne',
    'Prepare ethyne from calcium carbide and from natural gas, and alkynes by dehydrohalogenation and Kolbe electrolysis',
    'Explain the acidic character of terminal alkynes and write the formation of acetylides',
  ],
  slides: [
    sl('title', 'Alkynes: hydrocarbons with a C≡C bond', {
      b: '**Alkynes** are unsaturated hydrocarbons that contain **one carbon–carbon triple bond**; general formula **CₙH₂ₙ₋₂**. The first member, ethyne, is also called **acetylene**. Alkynes are more unsaturated than alkenes (two π bonds) but, as we shall see, react more slowly with electrophiles.',
      v: table(['Alkyne', 'Formula', 'Boiling point (°C)', 'State at 298 K'], [['Ethyne', 'C₂H₂', '−84 (sublimes)', 'Gas'], ['Propyne', 'C₃H₄', '−23.2', 'Gas'], ['But-1-yne', 'C₄H₆', '8.1', 'Gas'], ['But-2-yne', 'C₄H₆', '27.0', 'Liquid'], ['Pent-1-yne', 'C₅H₈', '40.2', 'Liquid']], 'Table of five alkynes with formula, boiling point in degrees Celsius and state at 298 kelvin'),
      n: 'Welcome to the chapter on alkynes. Alkynes are hydrocarbons with one carbon carbon triple bond. Their general formula is C n H two n minus two, which is two hydrogens fewer than the alkene with the same number of carbons. The simplest alkyne, ethyne, is also called acetylene. The first three members are gases and the higher ones are liquids. In this part we study structure, preparation and the acidic character of the terminal hydrogen.',
    }),
    sl('concept', 'Naming alkynes', {
      b: '(1) Choose the **longest chain that contains the triple bond**; change **-ane to -yne**. (2) Number from the end that gives the **triple bond the lowest locant**. (3) Write the locant before "-yne". (4) Name and number the substituents as for alkanes. A compound with both bonds is an **-en-yne**: give the lowest locants to the multiple bonds together, and the double bond the lower number if there is a choice. Alkynes with a **terminal** ≡C–H are called terminal alkynes.',
      v: table(['Structure', 'IUPAC name'], [['HC≡CH', 'Ethyne'], ['CH₃C≡CH', 'Propyne'], ['CH₃CH₂C≡CH', 'But-1-yne'], ['CH₃C≡CCH₃', 'But-2-yne'], ['(CH₃)₂CHC≡CH', '3-Methylbut-1-yne'], ['CH₃C≡CCH(CH₃)CH₂CH₃', '4-Methylhex-2-yne'], ['CH₂=CHC≡CH', 'But-1-en-3-yne']], 'Table of seven alkynes with their structural formula and IUPAC name'),
      n: 'To name an alkyne, take the longest chain that includes the triple bond and change the ending from ane to yne. Number the chain so that the triple bond gets the lowest possible number. For example, the four carbon alkyne with the bond at the end is but one yne, and with the bond in the middle is but two yne. A compound with both a double and a triple bond is named as an ene yne, and the double bond gets the lower number if there is a choice.',
    }),
    sl('diagram', 'Structure of the triple bond in ethyne', {
      b: 'Each carbon of ethyne is **sp hybridised**: two sp orbitals (50% s character) form σ bonds, one to the other carbon and one to hydrogen, on a **straight line (H–C–C = 180°)**. The two remaining **p orbitals** on each carbon overlap sideways in two perpendicular planes to give **two π bonds**. So $\\ce{C#C}$ is **one σ + two π**; the molecule has **3 σ and 2 π bonds**. **C≡C is 120 pm** (C=C 134 pm, C–C 154 pm), C–H is 106 pm.',
      v: V.triple,
      n: 'In ethyne each carbon atom is sp hybridised. The two hybrid orbitals make sigma bonds, one to hydrogen and one to the other carbon, and they point in opposite directions, so the molecule is a straight line with a bond angle of one hundred and eighty degrees. The two unhybridised p orbitals on each carbon overlap sideways in two planes at right angles, forming two pi bonds. The triple bond is therefore one sigma and two pi bonds, and it is very short.',
    }),
    sl('concept', 'Isomerism in alkynes', {
      b: 'Alkynes show **position isomerism** (but-1-yne and but-2-yne) and **chain isomerism** (pent-1-yne and 3-methylbut-1-yne). **No cis–trans isomerism** occurs about C≡C: each triple-bonded carbon has only one other group, on a straight line. C₄H₆ has **2** alkynes and C₅H₈ has **3**. Alkynes are also **functional isomers** of alkadienes and cycloalkenes (C₄H₆: buta-1,3-diene and cyclobutene).',
      v: table(['Formula', 'Alkyne isomers', 'Other isomers of the same formula'], [['C₄H₆', 'But-1-yne, but-2-yne', 'Buta-1,3-diene, cyclobutene'], ['C₅H₈', 'Pent-1-yne, pent-2-yne, 3-methylbut-1-yne', 'Penta-1,3-diene, cyclopentene'], ['C₆H₁₀', 'Seven alkynes', 'Dienes, cycloalkenes']], 'Table of alkyne isomers and other isomers for the formulae C4H6, C5H8 and C6H10'),
      n: 'Alkynes show position isomerism, as in but one yne and but two yne, and chain isomerism, as in pent one yne and three methylbut one yne. They do not show cis trans isomerism, because each carbon of the triple bond carries only one other group and the four atoms lie on a straight line. Four carbon alkynes number two and five carbon alkynes number three. Alkynes are also functional isomers of dienes and of cyclic alkenes.',
    }),
    sl('check', 'Quick check: naming an alkyne', {
      b: 'Longest chain containing the triple bond; lowest locant for it.',
      n: 'Quick check. Choose the longest chain that contains the triple bond and number it so that the triple bond gets the lowest possible number.',
      chk: 'name-mcq',
    }),
    sl('concept', 'Physical properties of alkynes', {
      b: 'Alkynes are **colourless**, non-polar or very weakly polar, **insoluble in water** but soluble in organic solvents (ethyne dissolves well in propanone, so cylinders hold it dissolved in propanone). Their **boiling points are a little higher than those of the alkene and alkane with the same carbon number**: the linear shape packs closely and the π electrons are easily polarised. Pure ethyne is almost odourless; the garlic-like smell of the carbide gas is due to traces of phosphine.',
      v: table(['Carbons', 'Alkane bp (°C)', 'Alkene bp (°C)', 'Alkyne bp (°C)'], [['4', 'Butane −0.5', 'But-1-ene −6.3', 'But-1-yne 8.1'], ['5', 'Pentane 36.1', 'Pent-1-ene 30.0', 'Pent-1-yne 40.2'], ['6', 'Hexane 68.7', 'Hex-1-ene 63.5', 'Hex-1-yne 71.3']], 'Table comparing boiling points of alkane, alkene and alkyne with four, five and six carbons'),
      n: 'Alkynes are colourless and almost non polar, so they do not dissolve in water but dissolve in organic solvents. Ethyne is very soluble in propanone, and welding cylinders contain it dissolved in propanone for safety. The boiling points of alkynes are slightly higher than those of the alkene and the alkane with the same number of carbons, because the straight molecules pack closely and the pi electrons are easily polarised.',
    }),
    sl('concept', 'Preparation of alkynes: the main routes', {
      b: 'Ethyne is made industrially from **calcium carbide** and from **natural gas (methane)**. Alkynes are made in the laboratory by **double dehydrohalogenation** of vicinal or geminal dihalides with alcoholic KOH (then NaNH₂) and, for ethyne, by **Kolbe electrolysis** of potassium maleate or fumarate.',
      v: table(['Route', 'Reagent and conditions', 'Product'], [['Calcium carbide', 'CaC₂ + cold water', 'Ethyne'], ['Natural gas', 'Methane at about 1773 K, quenched; or partial oxidation', 'Ethyne'], ['Vicinal dihalide', 'Alcoholic KOH, heat (twice)', 'Alkyne'], ['Geminal dihalide', 'Alcoholic KOH, heat (twice)', 'Alkyne'], ['Kolbe electrolysis', 'Aqueous potassium fumarate or maleate', 'Ethyne']], 'Table of five routes to ethyne and alkynes with reagents and products'),
      n: 'Here are the main routes. Industrially ethyne comes from calcium carbide and water, and from methane in natural gas. In the laboratory a dihalide, with halogens on neighbouring carbons or on the same carbon, loses two molecules of hydrogen halide with alcoholic potassium hydroxide, and the product is an alkyne. Ethyne can also be made by the Kolbe electrolysis of potassium fumarate or maleate.',
    }),
    sl('diagram', 'Ethyne from calcium carbide', {
      b: 'Limestone gives lime; lime and coke in an **electric arc furnace (about 2273 K)** give **calcium carbide**; carbide reacts with cold water to give **ethyne** and slaked lime. $\\ce{CaC2 + 2H2O -> C2H2 + Ca(OH)2}$. Commercial ethyne contains traces of H₂S, PH₃ and NH₃ from impurities in the coke; they are removed by washing with acidified copper(II) sulphate solution.',
      v: V.carbide,
      n: 'Limestone is heated to give lime. Lime is heated with coke in an electric arc furnace at about two thousand two hundred and seventy three kelvin to give calcium carbide and carbon monoxide. When calcium carbide meets water, ethyne gas bubbles out and slaked lime remains. Traces of hydrogen sulphide, phosphine and ammonia come from impurities in the coke, and they are removed by washing the gas with acidified copper sulphate solution.',
    }),
    sl('example', 'Worked example: ethyne from carbide', {
      b: `**Problem.** A volunteer drops ${mC.toFixed(2)} g of pure calcium carbide into excess water. Find the volume of ethyne at STP and the mass of calcium hydroxide formed. (Ca = 40, C = 12, O = 16, H = 1; molar volume 22.4 L.)\n\n**Solution.** $\\ce{CaC2 + 2H2O -> C2H2 + Ca(OH)2}$. M(CaC₂) = 64 g mol⁻¹, so n = ${mC.toFixed(2)} ÷ 64 = ${nC.toFixed(3)} mol. The ratio is 1 : 1 : 1, so V(C₂H₂) = ${nC.toFixed(3)} × 22.4 = **${vE.toFixed(2)} L**, and m[Ca(OH)₂] = ${nC.toFixed(3)} × 74 = **${mCa.toFixed(2)} g**.`,
      v: table(['Quantity', 'Value'], [['n(CaC₂)', `${nC.toFixed(3)} mol`], ['V(C₂H₂) at STP', `${vE.toFixed(2)} L`], ['m(Ca(OH)₂)', `${mCa.toFixed(2)} g`]], 'Table of moles of calcium carbide, volume of ethyne at STP and mass of calcium hydroxide'),
      n: 'Write the balanced equation first. One mole of calcium carbide gives one mole of ethyne and one mole of calcium hydroxide. The molar mass of calcium carbide is sixty four grams per mole, so six point four grams is point one zero zero mole. That mole amount of ethyne occupies point one zero zero times twenty two point four litres at standard temperature and pressure, and the same amount of calcium hydroxide has a mass found by multiplying by its molar mass of seventy four.',
    }),
    sl('concept', 'Natural gas, dihalides and Kolbe electrolysis', {
      b: '**Natural gas:** methane heated in an electric arc to about 1773 K for a fraction of a second, then quenched: $\\ce{2CH4 -> C2H2 + 3H2}$; or by **partial oxidation** with oxygen: $\\ce{6CH4 + O2 -> 2C2H2 + 2CO + 10H2}$. **Dihalides:** $\\ce{CH2BrCH2Br + 2KOH -> HC#CH + 2KBr + 2H2O}$ (alcoholic KOH; the second HBr often needs NaNH₂). A **geminal** dihalide such as $\\ce{CH3CHBr2}$ reacts in the same way.',
      v: table(['Starting material', 'Reagent', 'Product'], [['Methane', 'Electric arc, 1773 K, quench', 'Ethyne + H₂'], ['1,2-Dibromoethane', 'Alcoholic KOH, then NaNH₂', 'Ethyne'], ['1,1-Dibromoethane', 'Alcoholic KOH, heat', 'Ethyne'], ['1,2-Dibromopropane', 'Alcoholic KOH, heat', 'Propyne']], 'Table of starting materials, reagents and alkyne products for natural gas and dihalide routes'),
      n: 'In the natural gas route, methane is heated in an electric arc to about one thousand seven hundred and seventy three kelvin for a very short time and then cooled quickly, and ethyne and hydrogen form. Partial oxidation with a limited supply of oxygen gives ethyne too. In the laboratory, a dihalide loses two molecules of hydrogen halide. The halogens can be on neighbouring carbons, which is vicinal, or on the same carbon, which is geminal.',
    }),
    sl('diagram', "Kolbe's electrolysis of potassium fumarate", {
      b: 'Electrolysis of a concentrated aqueous solution of **potassium maleate or fumarate** gives **ethyne at the anode**: each carboxylate loses CO₂ and the two remaining CH carbons join by a triple bond. $\\ce{KOOCCH=CHCOOK + 2H2O -> HC#CH + 2CO2 + H2 + 2KOH}$. At the cathode, hydrogen is liberated and the solution becomes alkaline. (Potassium succinate gives ethene in the same way.)',
      v: chem('KOOCCH=CHCOOK + 2H2O -> HC#CH + 2CO2 + H2 + 2KOH', 'Electrolysis of aqueous potassium fumarate gives ethyne and carbon dioxide at the anode, and hydrogen and potassium hydroxide at the cathode', 'Kolbe electrolysis giving ethyne'),
      n: 'In the Kolbe method, a concentrated solution of potassium fumarate or potassium maleate is electrolysed. At the anode the two carboxylate groups are lost as carbon dioxide and the two carbons left behind join by a triple bond, so ethyne is liberated. At the cathode, hydrogen is given off and potassium hydroxide builds up in the solution. Potassium succinate, with a saturated chain, gives ethene by the same change.',
    }),
    sl('check', 'Quick check: preparing ethyne', {
      b: 'Match the starting material to the route.',
      n: 'Quick check. Identify the starting material and the reagent that give ethyne in each route.',
      chk: 'prep-mcq',
    }),
    sl('diagram', 'Why terminal alkynes are acidic', {
      b: 'The C–H bond of ethyne uses an **sp orbital (50% s character)**, compared with 33% in ethene and 25% in ethane. An s orbital is nearer the nucleus, so an sp carbon is **more electronegative** and holds the bonding pair more tightly: the hydrogen is released as H⁺ more easily and the **acetylide ion HC≡C⁻** is stabilised. Ethyne is a weak acid (pKa about 25), far stronger than ethene (about 44) and ethane (about 50), but it is **weaker than water**.',
      v: V.schar,
      n: 'The carbon hydrogen bond in ethyne uses an sp orbital, which has fifty percent s character, against thirty three percent in ethene and twenty five percent in ethane. An s orbital lies closer to the nucleus, so the carbon holds the bonding pair more tightly and behaves as though it were more electronegative. The hydrogen is lost as a proton more easily, and the acetylide ion is stabilised. So ethyne is a much stronger acid than ethene or ethane, although it is still weaker than water.',
    }),
    sl('concept', 'Formation of acetylides', {
      b: 'Terminal alkynes (≡C–H) form **metal acetylides**; internal alkynes (no ≡C–H) do not. **Sodium:** $\\ce{2HC#CH + 2Na -> 2HC#CNa + H2}$. **Sodium amide** (liquid NH₃): $\\ce{HC#CH + NaNH2 -> HC#CNa + NH3}$. **Ammoniacal silver nitrate** gives a **white precipitate** of silver acetylide and **ammoniacal cuprous chloride** a **red precipitate** of copper acetylide: $\\ce{HC#CH + 2AgNO3 + 2NH4OH -> AgC#CAg + 2NH4NO3 + 2H2O}$. Dry heavy-metal acetylides explode on shock; dilute HNO₃ regenerates the alkyne.',
      v: table(['Reagent', 'Terminal alkyne (ethyne)', 'Internal alkyne (but-2-yne)'], [['Na or NaNH₂', 'Sodium acetylide', 'No reaction'], ['Ammoniacal AgNO₃', 'White precipitate', 'No reaction'], ['Ammoniacal Cu₂Cl₂', 'Red precipitate', 'No reaction']], 'Table comparing the reactions of a terminal alkyne and an internal alkyne with sodium, ammoniacal silver nitrate and ammoniacal cuprous chloride'),
      n: 'A terminal alkyne, with a hydrogen on the triple bonded carbon, loses that hydrogen to a strong base or to a metal. Sodium or sodium amide gives sodium acetylide. Ammoniacal silver nitrate gives a white precipitate of silver acetylide, and ammoniacal cuprous chloride gives a red precipitate of copper acetylide. An internal alkyne has no such hydrogen and gives no precipitate. Dry heavy metal acetylides explode on shock, so they are destroyed with dilute nitric acid.',
    }),
    sl('example', 'Worked example: which alkynes form acetylides?', {
      b: '**Problem.** Pent-1-yne, pent-2-yne and 3-methylbut-1-yne are tested with ammoniacal silver nitrate. Which give a precipitate, and why?\n\n**Solution.** A precipitate needs a **≡C–H** group. Pent-1-yne, $\\ce{CH3CH2CH2C#CH}$, and 3-methylbut-1-yne, $\\ce{(CH3)2CHC#CH}$, are **terminal** alkynes and give a **white precipitate**. Pent-2-yne, $\\ce{CH3C#CCH2CH3}$, has no hydrogen on a triple-bonded carbon and gives **none**. The test therefore separates terminal from internal alkynes, not one terminal alkyne from another.',
      v: table(['Alkyne', 'Has ≡C–H?', 'Ammoniacal AgNO₃'], [['Pent-1-yne', 'Yes', 'White precipitate'], ['3-Methylbut-1-yne', 'Yes', 'White precipitate'], ['Pent-2-yne', 'No', 'No precipitate']], 'Table of three C5H8 alkynes showing whether each has a terminal hydrogen and whether it gives a precipitate with ammoniacal silver nitrate'),
      n: 'Look for a hydrogen on a triple bonded carbon. Pent one yne and three methylbut one yne both end in a triple bond with a hydrogen, so both give a white precipitate with ammoniacal silver nitrate. Pent two yne has the triple bond inside the chain, with no such hydrogen, so nothing happens. The test tells terminal alkynes from internal ones, but it cannot tell two terminal alkynes apart.',
    }),
    sl('check', 'Quick check: acidity of alkynes', {
      b: 'Link the acidity to the s character of the carbon orbital.',
      n: 'Quick check. Think about the s character of the orbital that carries the hydrogen in each compound.',
      chk: 'acid-mcq',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Alkynes: CₙH₂ₙ₋₂, one C≡C (sp, linear, 180°; one σ and two π; 120 pm).',
        'Isomerism: position and chain; no cis–trans.',
        'Preparation: calcium carbide + water; methane at about 1773 K; alcoholic KOH on dihalides; Kolbe electrolysis of potassium fumarate.',
        'Terminal alkynes are acidic (sp, 50% s) and form acetylides with Na, NaNH₂, ammoniacal AgNO₃ (white) and Cu₂Cl₂ (red).',
      ],
      v: table(['Property', 'Ethane', 'Ethene', 'Ethyne'], [['Hybridisation', 'sp³', 'sp²', 'sp'], ['% s character', '25', '33.3', '50'], ['C–C length (pm)', '154', '134', '120'], ['Approximate pKa', '50', '44', '25']], 'Summary table comparing hybridisation, s character, carbon-carbon bond length and acidity of ethane, ethene and ethyne'),
      n: 'To sum up Part one. Alkynes have the formula C n H two n minus two and a linear triple bond made of one sigma and two pi bonds on sp hybridised carbons. They show position and chain isomerism. Ethyne is made from calcium carbide and water or from methane, and alkynes are made by double dehydrohalogenation of dihalides. Terminal alkynes are acidic because of the fifty percent s character, and they form acetylides.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'In names, the triple bond gets the lowest locant; no cis–trans labels are needed for a triple bond.',
        'Quote 50% s character, not "sp is more electronegative" alone, when explaining acidity.',
        'Write both steps of a double dehydrohalogenation, or give the overall equation with two KOH.',
        'Name the reagent and its colour result: white with silver, red with copper.',
      ],
      v: table(['Slip', 'Fix'], [['Triple bond is one σ and one π', 'One σ and two π'], ['Ethyne is bent like ethene', 'Linear, 180°'], ['But-2-yne gives a precipitate with silver nitrate', 'Only terminal alkynes do']], 'Table of three common slips about alkynes with corrections'),
      n: 'Tips for the exam. Give the triple bond the lowest number when naming. When explaining acidity, state the fifty percent s character of the sp orbital. In dehydrohalogenation, remember that two molecules of hydrogen halide are lost, so two moles of alkali are needed. And for the silver and copper tests, name the reagent and the colour of the precipitate, and remember that only terminal alkynes respond.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Alkynes — Part 2: Reactions, polymerisation, uses and tests',
  goals: [
    'Write the products of addition of H₂, X₂, HX and H₂O to ethyne and propyne',
    'Predict the products of oxidation, ozonolysis and polymerisation of alkynes',
    'Distinguish ethane, ethene and ethyne, and terminal from internal alkynes, by chemical tests',
  ],
  slides: [
    sl('title', 'Addition reactions of alkynes', {
      b: 'The triple bond has **two π bonds**, so an alkyne can add **two molecules** of a reagent: first it becomes an alkene derivative, then a saturated compound. Alkynes are attacked by **electrophiles**, though more slowly than alkenes because the sp carbons hold the π electrons more tightly and the intermediate (a vinyl cation) is less stable.',
      v: table(['Reagent (1 mol)', 'First product from ethyne', 'With excess reagent'], [['H₂', 'Ethene', 'Ethane'], ['Br₂', '1,2-Dibromoethene', '1,1,2,2-Tetrabromoethane'], ['HCl', 'Chloroethene', '1,1-Dichloroethane'], ['H₂O', 'Ethenol → ethanal', '–']], 'Table of the first and second addition products of ethyne with hydrogen, bromine, hydrogen chloride and water'),
      n: 'An alkyne has two pi bonds, so it can add two molecules of a reagent. The first addition gives an alkene derivative, and the second gives a saturated compound. Alkynes react with electrophiles, but more slowly than alkenes, because the sp hybridised carbons hold the pi electrons more tightly. In this part we study addition of hydrogen, halogens, hydrogen halides and water, then oxidation, polymerisation, uses and tests.',
    }),
    sl('diagram', 'Addition of hydrogen', {
      b: 'With **H₂ and Ni (or Pt, Pd)** an alkyne is reduced fully to the alkane: $\\ce{HC#CH + 2H2 -> CH3CH3}$. To **stop at the alkene**, use **Lindlar\'s catalyst** (Pd on CaCO₃, poisoned with lead acetate and quinoline), which gives the **cis** alkene by syn addition, or **sodium in liquid ammonia**, which gives the **trans** alkene by anti addition.',
      v: V.reduce,
      n: 'With hydrogen and nickel, platinum or palladium, an alkyne takes up two molecules of hydrogen and becomes an alkane. To stop at the alkene, the catalyst must be chosen. Lindlar catalyst is palladium on calcium carbonate, poisoned with lead acetate and quinoline. It adds both hydrogens on the same side and gives the cis alkene. Sodium in liquid ammonia adds the hydrogens on opposite sides and gives the trans alkene.',
    }),
    sl('concept', 'Addition of halogens', {
      b: '**Bromine or chlorine** adds twice. Ethyne with bromine in CCl₄ gives **1,2-dibromoethene** and then **1,1,2,2-tetrabromoethane**: $\\ce{HC#CH + 2Br2 -> CHBr2CHBr2}$. The **red-brown colour of bromine water is lost**, a test for unsaturation (the decolourisation is slower than with alkenes). Chlorine with ethyne is explosive unless a catalyst such as FeCl₃ or a solvent is used.',
      v: chem('HC#CH + Br2 -> CHBr=CHBr', 'Ethyne with one mole of bromine gives 1,2-dibromoethene', 'Step 1 of the double addition; step 2 gives CHBr₂CHBr₂'),
      n: 'Bromine adds to ethyne in two steps. The first mole gives one two dibromoethene, and the second mole gives one one two two tetrabromoethane. The red brown colour of bromine is lost, which is the usual test for unsaturation, although the colour fades more slowly than with an alkene. Chlorine reacts violently with ethyne unless a catalyst or a solvent is used to moderate the reaction.',
    }),
    sl('concept', "Addition of hydrogen halides: Markownikoff's rule twice", {
      b: 'HX adds in two steps, each following **Markownikoff\'s rule**, so the second halogen goes on the **same carbon** as the first (a **geminal** dihalide). $\\ce{HC#CH + HCl -> CH2=CHCl}$ (HgCl₂, 333–343 K; chloroethene, the monomer of PVC), then $\\ce{CH2=CHCl + HCl -> CH3CHCl2}$. Propyne with excess HBr gives **2,2-dibromopropane**.',
      v: table(['Alkyne', 'Reagent', 'Product'], [['Ethyne', '1 mol HCl', 'Chloroethene'], ['Ethyne', '2 mol HCl', '1,1-Dichloroethane'], ['Propyne', '1 mol HBr', '2-Bromopropene'], ['Propyne', '2 mol HBr', '2,2-Dibromopropane'], ['But-1-yne', '2 mol HBr', '2,2-Dibromobutane']], 'Table of the products of adding one and two moles of hydrogen halide to ethyne, propyne and but-1-yne'),
      n: 'Hydrogen halides add to an alkyne in two steps, and each step follows Markownikoff rule. Ethyne with one mole of hydrogen chloride gives chloroethene, the monomer of polyvinyl chloride. A second mole adds to the same carbon, giving one one dichloroethane, a geminal dihalide. In the same way propyne with excess hydrogen bromide gives two two dibromopropane, with both bromines on the middle carbon.',
    }),
    sl('check', 'Quick check: hydrogen halide and an alkyne', {
      b: 'Apply Markownikoff\'s rule twice; both halogens end up on one carbon.',
      n: 'Quick check. Add the first molecule by Markownikoff rule, then add the second to the carbon that already carries the halogen.',
      chk: 'hx-mcq',
    }),
    sl('diagram', 'Addition of water: hydration', {
      b: 'Alkynes add water in the presence of **HgSO₄ and dilute H₂SO₄ (about 333 K)**. The first product is an **enol** (OH on a C=C), which is unstable and shifts at once to the **carbonyl** form (**tautomerism**). Ethyne gives **ethanal**; **propyne** gives **propanone**, because OH adds by Markownikoff\'s rule to the carbon with fewer hydrogens. **Every alkyne except ethyne therefore gives a ketone.**',
      v: V.hydration,
      n: 'In hydration, water adds to the alkyne in the presence of mercuric sulphate and dilute sulphuric acid. The first product is an enol, a compound with a hydroxyl group on a double bonded carbon. An enol is unstable and shifts at once to the carbonyl form, which is called tautomerism. Ethyne gives ethanal, which is an aldehyde. Propyne gives propanone, because the hydroxyl goes to the carbon with fewer hydrogens. Every other alkyne gives a ketone.',
    }),
    sl('example', 'Worked example: predicting the hydration product', {
      b: '**Problem.** Give the product of hydration of (a) but-1-yne and (b) but-2-yne, using HgSO₄ and dilute H₂SO₄.\n\n**Solution.** (a) OH goes to C-2 (the carbon with fewer H): the enol $\\ce{CH2=C(OH)CH2CH3}$ becomes **butanone**, $\\ce{CH3COCH2CH3}$. (b) But-2-yne is symmetrical, so both carbons are alike: the enol $\\ce{CH3CH=C(OH)CH3}$ also becomes **butanone**. Both alkynes give the **same ketone**; the carbonyl carbon is the one that held the OH.',
      v: table(['Alkyne', 'Enol', 'Final product'], [['But-1-yne', 'CH₂=C(OH)CH₂CH₃', 'Butanone'], ['But-2-yne', 'CH₃CH=C(OH)CH₃', 'Butanone'], ['Ethyne', 'CH₂=CHOH', 'Ethanal']], 'Table of the enol and final carbonyl product from the hydration of but-1-yne, but-2-yne and ethyne'),
      n: 'Put the hydroxyl group on the carbon that has fewer hydrogens. In but one yne that is carbon two, so the enol shifts to butanone. But two yne is symmetrical, so either carbon receives the hydroxyl, and the enol again shifts to butanone. The two different alkynes therefore give the same ketone. Only ethyne, which has no carbon with fewer hydrogens to choose, gives an aldehyde.',
    }),
    sl('check', 'Quick check: hydration of an alkyne', {
      b: 'Work out the enol, then the carbonyl compound.',
      n: 'Quick check. Add the hydroxyl group by Markownikoff rule, then let the enol shift to the carbonyl form.',
      chk: 'hydr-mcq',
    }),
    sl('concept', 'Oxidation: combustion and potassium permanganate', {
      b: '**Combustion:** $\\ce{2C2H2 + 5O2 -> 4CO2 + 2H2O}$; the **oxy-acetylene flame** reaches about 3000 °C and is used for welding and cutting steel. **Hot alkaline or acidified KMnO₄** cleaves the triple bond: $\\ce{R-C#C-R}$ gives **2 RCOOH**; a terminal alkyne gives RCOOH and CO₂. The purple colour of cold dilute permanganate is also lost with alkynes, which is why Baeyer\'s test cannot separate alkenes from alkynes.',
      v: table(['Alkyne', 'Hot KMnO₄ (cleavage)'], [['Ethyne', 'CO₂ and H₂O'], ['Propyne', 'Ethanoic acid + CO₂'], ['But-2-yne', '2 Ethanoic acid'], ['Hex-3-yne', '2 Propanoic acid']], 'Table of products of oxidation of four alkynes with hot potassium permanganate'),
      n: 'Alkynes burn to carbon dioxide and water. Ethyne burnt in oxygen gives the oxy acetylene flame, one of the hottest chemical flames, at about three thousand degrees Celsius, used to weld and cut steel. Hot potassium permanganate breaks the triple bond, and each carbon of the triple bond becomes a carboxylic acid group. A terminal alkyne also gives carbon dioxide from the end carbon. Cold dilute permanganate is also decolourised by alkynes.',
    }),
    sl('concept', 'Ozonolysis of alkynes', {
      b: 'Ozone adds to the triple bond; the ozonide, on hydrolysis, gives **1,2-dicarbonyl compounds** (or, with oxidising work-up, **carboxylic acids**). Ethyne gives **glyoxal (ethanedial)**, OHC–CHO. Working back from the products, the two carbons that were bonded by the triple bond are the carbonyl carbons that were **joined to each other**.',
      v: table(['Alkyne', 'Ozonolysis (reductive work-up)', 'Hot KMnO₄'], [['Ethyne', 'Glyoxal, OHC–CHO', 'CO₂'], ['But-2-yne', 'Butane-2,3-dione, CH₃COCOCH₃', '2 CH₃COOH'], ['Hex-3-yne', 'Hexane-3,4-dione', '2 CH₃CH₂COOH']], 'Table of ozonolysis and permanganate products of ethyne, but-2-yne and hex-3-yne'),
      n: 'Ozone adds across the triple bond, and the ozonide formed is split by water. Ethyne gives glyoxal, which is the dialdehyde ethanedial. An internal alkyne gives a one two diketone, and with an oxidising work up or with hot permanganate the product is a pair of carboxylic acids. To find an alkyne from such products, join the two carbonyl carbons that were linked, and remove the oxygen atoms.',
    }),
    sl('diagram', 'Polymerisation of ethyne', {
      b: '**Cyclic polymerisation:** ethyne passed through a **red-hot iron tube (873 K)** trimerises to **benzene**: $\\ce{3C2H2 -> C6H6}$. Propyne gives 1,3,5-trimethylbenzene. **Linear polymerisation:** two molecules with Cu₂Cl₂/NH₄Cl give **vinylacetylene**, used for neoprene rubber; many molecules give **polyacetylene**, a conducting polymer.',
      v: V.poly,
      n: 'When ethyne is passed through a red hot iron tube at about eight hundred and seventy three kelvin, three molecules join to form a ring of benzene. This is cyclic polymerisation. Propyne treated in the same way gives one three five trimethylbenzene. Linear polymerisation is also possible. Two molecules with cuprous chloride and ammonium chloride give vinylacetylene, used to make neoprene, and many molecules give polyacetylene, a polymer that conducts electricity.',
    }),
    sl('concept', 'Uses of alkynes and the flame test', {
      b: 'Ethyne is used for **oxy-acetylene welding and cutting**, and as the starting material for **ethanal and ethanoic acid**, **chloroethene (PVC)**, **neoprene**, and the solvent 1,1,2,2-tetrachloroethane. It burns with a **sooty, luminous flame in air** because its carbon content is high: the percentage of carbon is **92.3% in ethyne**, 85.7% in ethene and 80.0% in ethane.',
      v: table(['Compound', 'Formula', '% carbon', 'Flame in air'], [['Ethane', 'C₂H₆', '80.0', 'Almost non-luminous'], ['Ethene', 'C₂H₄', '85.7', 'Luminous, slightly smoky'], ['Ethyne', 'C₂H₂', '92.3', 'Very sooty']], 'Table of percentage of carbon and flame appearance for ethane, ethene and ethyne'),
      n: 'Ethyne is used in oxy acetylene welding and cutting, and as a raw material for ethanal, ethanoic acid, chloroethene for polyvinyl chloride, neoprene rubber and the solvent tetrachloroethane. In air it burns with a sooty luminous flame, because the share of carbon is very high, about ninety two percent. Ethene has less carbon and burns with a smoky flame, and ethane burns with an almost clear flame.',
    }),
    sl('diagram', 'Distinguishing ethane, ethene and ethyne', {
      b: 'Two reagents are enough. **Ammoniacal AgNO₃ (or Cu₂Cl₂)** gives a precipitate **only with a terminal alkyne**. **Bromine water** (or Baeyer\'s reagent) is decolourised by **both alkenes and alkynes** but not by alkanes. So: pass the gas through ammoniacal silver nitrate (precipitate = ethyne); then test the rest with bromine water (decolourised = ethene; no change = ethane).',
      v: flow('TB', [['g', 'Unknown gas: ethane, ethene or ethyne'], ['a', 'Pass into ammoniacal silver nitrate'], ['p', 'White precipitate: ethyne'], ['b', 'No precipitate: shake with bromine water'], ['d', 'Colour lost: ethene'], ['n', 'No change: ethane']], [['g', 'a'], ['a', 'p', 'precipitate'], ['a', 'b', 'none'], ['b', 'd', 'decolourised'], ['b', 'n', 'unchanged']], 'Decision tree for telling ethane, ethene and ethyne apart: silver nitrate first, then bromine water'),
      n: 'To tell ethane, ethene and ethyne apart, use two reagents in order. First pass the gas through ammoniacal silver nitrate. A white precipitate shows ethyne, because only a terminal alkyne has an acidic hydrogen. If there is no precipitate, shake the gas with bromine water. If the colour is lost, the gas is ethene, and if nothing happens it is ethane. Bromine water or Baeyer reagent alone cannot separate an alkene from an alkyne.',
    }),
    sl('example', 'Worked example: analysing a gas mixture', {
      b: `**Problem.** ${vMix.toFixed(1)} mL of a mixture of ethene and ethyne is shaken with ammoniacal silver nitrate. The volume of gas left is ${vRem.toFixed(1)} mL. Find the percentage of ethyne by volume, and the volume of H₂ needed to hydrogenate the original mixture fully (Ni, excess H₂).\n\n**Solution.** Only ethyne forms a precipitate, so V(ethene) = ${vRem.toFixed(1)} mL and V(ethyne) = ${vMix.toFixed(1)} − ${vRem.toFixed(1)} = **${vYne.toFixed(1)} mL**, i.e. ${vYne.toFixed(1)} ÷ ${vMix.toFixed(1)} × 100 = **${pcYne.toFixed(1)}%**. Ethene takes 1 H₂ and ethyne takes 2 H₂: V(H₂) = ${vRem.toFixed(1)} + 2 × ${vYne.toFixed(1)} = **${vH2.toFixed(1)} mL**.`,
      v: table(['Gas', 'Volume (mL)', 'H₂ needed per volume', 'H₂ needed (mL)'], [['Ethene', vRem.toFixed(1), '1', vRem.toFixed(1)], ['Ethyne', vYne.toFixed(1), '2', (2 * vYne).toFixed(1)], ['Total', vMix.toFixed(1), '–', vH2.toFixed(1)]], 'Table of the volumes of ethene and ethyne in the mixture and the volume of hydrogen each needs for complete hydrogenation'),
      n: 'The silver nitrate absorbs only ethyne, so the gas that remains is ethene. The difference between the original volume and the remaining volume is the ethyne. Dividing by the original volume and multiplying by one hundred gives the percentage of ethyne. For hydrogenation, ethene needs one volume of hydrogen for each volume, and ethyne needs two, so the total is the ethene volume plus twice the ethyne volume.',
    }),
    sl('check', 'Quick check: choosing a test', {
      b: 'Decide which reagent separates the pair.',
      n: 'Quick check. Decide which property of the pair of compounds a single reagent can detect.',
      chk: 'test-mcq',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'Addition: H₂ (Ni) to the alkane; H₂ with Lindlar gives cis, Na in liquid NH₃ gives trans; X₂ and HX add twice (Markownikoff, geminal dihalide).',
        'Hydration (HgSO₄, H₂SO₄): enol then carbonyl; ethyne gives ethanal, all others give ketones.',
        'Oxidation: hot KMnO₄ cleaves C≡C to acids; ozonolysis gives 1,2-dicarbonyls; combustion in oxygen gives the oxy-acetylene flame.',
        'Polymerisation: 3 C₂H₂ to benzene (873 K, iron tube); linear to vinylacetylene and polyacetylene.',
        'Tests: ammoniacal AgNO₃ or Cu₂Cl₂ for ≡C–H; bromine water or Baeyer\'s reagent for unsaturation.',
      ],
      v: table(['Test', 'Ethane', 'Ethene', 'Ethyne'], [['Bromine water', 'No change', 'Decolourised', 'Decolourised'], ['Baeyer\'s reagent', 'No change', 'Decolourised', 'Decolourised'], ['Ammoniacal AgNO₃', 'No change', 'No change', 'White precipitate']], 'Summary table of the results of three tests on ethane, ethene and ethyne'),
      n: 'To sum up Part two. Alkynes add hydrogen, halogens, hydrogen halides and water, taking two molecules of a reagent unless a poisoned catalyst stops the reaction at the alkene. Hydration gives a carbonyl compound through an enol. Hot permanganate cleaves the triple bond to acids. Ethyne trimerises to benzene in a red hot iron tube. Ammoniacal silver nitrate identifies a terminal alkyne, and bromine water identifies unsaturation.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'State the catalyst with every hydrogenation: Lindlar for cis, Na in liquid NH₃ for trans, Ni for the alkane.',
        'For HX and X₂ addition, say how many moles are needed and name the geminal or tetrahalo product.',
        'In hydration, show the enol and say it rearranges; remember that only ethyne gives an aldehyde.',
        'In test questions, give the reagent, the observation and the conclusion for each gas.',
      ],
      v: table(['Slip', 'Fix'], [['Bromine water separates ethene from ethyne', 'Both decolourise it; use ammoniacal AgNO₃'], ['Propyne hydrates to propanal', 'Propanone (Markownikoff)'], ['Lindlar gives the trans alkene', 'Lindlar gives cis; Na/NH₃ gives trans']], 'Table of three common slips about alkyne reactions with corrections'),
      n: 'Tips for Part two. Always name the catalyst in a hydrogenation, because Lindlar gives the cis alkene, sodium in liquid ammonia gives the trans alkene, and nickel gives the alkane. For hydrogen halides and halogens, state how many moles add. In hydration, show the enol, and remember that only ethyne gives an aldehyde. In test questions, give the reagent, the observation and the conclusion for each gas.',
    }),
  ],
});
