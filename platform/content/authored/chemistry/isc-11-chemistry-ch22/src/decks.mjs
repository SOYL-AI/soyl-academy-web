// ch22 Alkenes — two decks. Part 1 (t01–t03): nomenclature, structure of the double bond, isomerism, preparation (dehydration,
// dehydrohalogenation and Saytzeff's rule, vicinal dihalides, Kolbe's method, alkynes), physical properties. Part 2 (t04–t05):
// addition reactions and mechanism, Markownikoff's rule and the peroxide effect, oxidation, ozonolysis, polymerisation, uses.
import { sl, deck, table, flow, chem, svgV } from './lib.mjs';
import { SIGMAPI, ISOMERS, SAYTZEFF, MECH, PEROX, OZONO } from './svgs.mjs';

export const V = {
  sigmapi: svgV(SIGMAPI, 'Ethene drawn from above, with bond angles and lengths, and from the side, showing the pi electron cloud above and below the plane of the molecule'),
  isomers: svgV(ISOMERS, 'The four alkenes of formula C4H8 with their boiling points: but-1-ene, cis-but-2-ene, trans-but-2-ene and 2-methylpropene'),
  saytzeff: svgV(SAYTZEFF, '2-Bromobutane with alcoholic potassium hydroxide gives mainly but-2-ene and a little but-1-ene'),
  mech: svgV(MECH, 'Two-step mechanism of the electrophilic addition of hydrogen bromide to propene with curved arrows, through a secondary carbocation, giving 2-bromopropane'),
  perox: svgV(PEROX, 'Free-radical mechanism of the peroxide effect: initiation, propagation giving 1-bromopropane, and termination'),
  ozono: svgV(OZONO, 'Ozonolysis of 2-methylbut-2-ene gives propanone and ethanal; the C=C bond is cut and each carbon becomes a carbonyl carbon'),
};

// worked example, bromine addition (computed once)
const mAlk = 2.1;
const mBr = 4.0;
const MBR2 = 160;
const nBr = mBr / MBR2; // 0.0250 mol
const Malk = mAlk / nBr; // 84
const nC = Math.round((Malk - 0) / 14); // CnH2n: 14n

export const deck1 = deck({
  part: 1,
  title: 'Alkenes — Part 1: Structure, isomerism, preparation and physical properties',
  goals: [
    'Name alkenes and describe the sigma and pi bonds and sp² hybridisation of ethene',
    'Identify structural and geometrical isomers of alkenes',
    'Prepare alkenes by dehydration, dehydrohalogenation (Saytzeff), from vicinal dihalides, by Kolbe electrolysis and from alkynes',
    'Compare the boiling points and dipole moments of cis and trans isomers',
  ],
  slides: [
    sl('title', 'Alkenes: hydrocarbons with a C=C bond', {
      b: '**Alkenes** are unsaturated hydrocarbons that contain **one carbon–carbon double bond**; general formula **CₙH₂ₙ**. They are also called **olefins** ("oil-forming"). The double bond makes them far more reactive than alkanes.',
      v: table(['Alkene', 'Formula', 'Boiling point (°C)', 'State at 298 K'], [['Ethene', 'C₂H₄', '−103.7', 'Gas'], ['Propene', 'C₃H₆', '−47.4', 'Gas'], ['But-1-ene', 'C₄H₈', '−6.3', 'Gas'], ['Pent-1-ene', 'C₅H₁₀', '30.0', 'Liquid'], ['Hex-1-ene', 'C₆H₁₂', '63.5', 'Liquid']], 'Table of the first five alkenes with formula, boiling point in degrees Celsius and state at 298 kelvin'),
      n: 'Welcome to the chapter on alkenes. Alkenes are hydrocarbons with one carbon carbon double bond, and their general formula is C n H two n. They are unsaturated, which makes them much more reactive than alkanes. The first three members are gases at room temperature, and the next members are liquids. In this part we study their structure, naming, isomerism, preparation and physical properties.',
    }),
    sl('concept', 'Naming alkenes', {
      b: '(1) Choose the **longest chain that contains the double bond**; change **-ane to -ene**. (2) Number from the end that gives the **double bond the lowest locant**. (3) Write the locant before "-ene" (but-1-ene, pent-2-ene). (4) Name and number the substituents as for alkanes. (5) Add **cis** or **trans** where it applies. For two double bonds use **-diene**.',
      v: table(['Structure', 'IUPAC name'], [['CH₂=CH₂', 'Ethene'], ['CH₃CH=CH₂', 'Propene'], ['CH₃CH₂CH=CH₂', 'But-1-ene'], ['CH₃CH=CHCH₃', 'But-2-ene'], ['(CH₃)₂C=CH₂', '2-Methylpropene'], ['(CH₃)₂C=CHCH₃', '2-Methylbut-2-ene']], 'Table of six alkenes with their structural formula and IUPAC name'),
      n: 'To name an alkene, take the longest chain that includes the double bond and change the ending from ane to ene. Number the chain from the end that gives the double bond the lowest number, and write that number before the ending. So the four carbon alkene with the bond at the end is but one ene, and with the bond in the middle is but two ene. Substituents are named and numbered as in alkanes.',
    }),
    sl('diagram', 'Structure of the double bond in ethene', {
      b: 'Each carbon of ethene is **sp² hybridised**: three sp² orbitals form σ bonds (one C–C, two C–H) in one plane at about **120°** (H–C–H 117°, H–C=C 121.5°). The leftover **p orbitals** overlap **sideways** to form the **π bond**, with its electron cloud above and below the plane. **C=C is 134 pm** (shorter than C–C, 154 pm) and ethene has **5 σ bonds and 1 π bond**.',
      v: V.sigmapi,
      n: 'In ethene each carbon atom is sp two hybridised. The three hybrid orbitals make sigma bonds, one to the other carbon and two to hydrogen, all lying in one plane with bond angles close to one hundred and twenty degrees. The unhybridised p orbitals on the two carbons overlap sideways to form a pi bond, whose electron cloud lies above and below the plane. The carbon carbon bond is one hundred and thirty four picometres long.',
    }),
    sl('diagram', 'Isomerism in alkenes', {
      b: 'Alkenes show **chain isomerism** (but-1-ene and 2-methylpropene), **position isomerism** (but-1-ene and but-2-ene) and **geometrical (cis–trans) isomerism**, which needs **two different groups on each doubly bonded carbon**. C₄H₈ has 3 alkenes (4 stereoisomers); C₅H₁₀ has 5 alkenes (6 stereoisomers). Alkenes are also **functional isomers of cycloalkanes** (C₄H₈: cyclobutane).',
      v: V.isomers,
      n: 'Alkenes show several kinds of isomerism. Butene with the bond at the end and two methylpropene are chain isomers. Butene with the bond at the end and butene with the bond in the middle are position isomers. Only but two ene has two different groups on each doubly bonded carbon, so only it has cis and trans forms. Alkenes are also functional isomers of cycloalkanes with the same formula.',
    }),
    sl('check', 'Quick check: naming an alkene', {
      b: 'Longest chain containing the double bond; lowest locant for it.',
      n: 'Quick check. Choose the longest chain that contains the double bond and number it so that the double bond gets the lowest possible number.',
      chk: 'name-mcq',
    }),
    sl('concept', 'Preparation of alkenes: the main routes', {
      b: 'Alkenes are made by **dehydration of alcohols**, **dehydrohalogenation** of alkyl halides, **dehalogenation of vicinal dihalides** with zinc, **Kolbe electrolysis** of potassium salts of dicarboxylic acids, and **partial reduction of alkynes**.',
      v: table(['Route', 'Reagent and conditions', 'Example'], [['Dehydration of alcohol', 'Conc. H₂SO₄, 443 K (or Al₂O₃, 623 K)', 'Ethanol → ethene'], ['Dehydrohalogenation', 'Alcoholic KOH, heat', 'Bromoethane → ethene'], ['Vicinal dihalide', 'Zn dust, ethanol', '1,2-Dibromoethane → ethene'], ['Kolbe electrolysis', 'Aqueous potassium succinate', 'Ethene at the anode'], ['From alkynes', 'H₂/Lindlar (cis); Na/liq. NH₃ (trans)', 'But-2-yne → but-2-ene']], 'Table of five preparations of alkenes with reagents and examples'),
      n: 'Here are the main ways of preparing alkenes. Alcohols lose water when heated with concentrated sulphuric acid. Alkyl halides lose hydrogen halide with alcoholic potassium hydroxide. A vicinal dihalide loses two halogen atoms with zinc dust. Potassium succinate gives ethene on electrolysis. And an alkyne can be partly reduced, to a cis alkene with Lindlar catalyst or to a trans alkene with sodium in liquid ammonia.',
    }),
    sl('diagram', "Dehydrohalogenation and Saytzeff's rule", {
      b: 'Alcoholic KOH removes H and X from adjacent carbons ($\\ce{CH3CH2Br + KOH -> CH2=CH2 + KBr + H2O}$). When more than one alkene can form, **Saytzeff\'s rule** says the **more substituted** (more stable) alkene is the **major product**; the H is taken from the β-carbon with **fewer hydrogens**.',
      v: V.saytzeff,
      n: 'In dehydrohalogenation, alcoholic potassium hydroxide removes a hydrogen and a halogen from neighbouring carbons. If two alkenes are possible, Saytzeff rule tells us the more substituted alkene is the major product. With two bromobutane, hydrogen can leave from carbon three or carbon one. Loss from carbon three gives but two ene, which has two alkyl groups on the double bond and is more stable, so it is the main product.',
    }),
    sl('example', "Worked example: applying Saytzeff's rule", {
      b: '**Problem.** 2-Bromo-2-methylbutane is heated with alcoholic KOH. Name the major and minor alkenes.\n\n**Solution.** The carbon bearing Br is C-2, with β-carbons C-1 (three H, in a CH₃ group) and C-3 (two H, in CH₂). Loss of H from C-3 gives **2-methylbut-2-ene**, (CH₃)₂C=CHCH₃, with **three** alkyl groups on C=C: **major**. Loss from C-1 gives **2-methylbut-1-ene**, CH₂=C(CH₃)CH₂CH₃, with two: **minor**.',
      v: table(['Alkene', 'Alkyl groups on C=C', 'Product'], [['2-Methylbut-2-ene', '3', 'Major'], ['2-Methylbut-1-ene', '2', 'Minor']], 'Table comparing 2-methylbut-2-ene and 2-methylbut-1-ene by number of alkyl groups on the double bond and their role as major or minor product'),
      n: 'Find the carbon with the halogen, then look at the neighbouring carbons. Two methyl butane with bromine on carbon two can lose hydrogen from carbon one, in a methyl group, or from carbon three. Loss from carbon three gives two methylbut two ene, with three alkyl groups on the double bond. That is the more stable alkene and the major product. Loss from carbon one gives two methylbut one ene, the minor product.',
    }),
    sl('check', "Quick check: Saytzeff's rule", {
      b: 'Decide which β-hydrogen is lost to give the more substituted alkene.',
      n: 'Quick check. Look at the carbons next to the one carrying the halogen, and pick the product with more alkyl groups on the double bond.',
      chk: 'saytzeff-mcq',
    }),
    sl('concept', 'Dehydration of alcohols', {
      b: 'Heating an alcohol with **concentrated H₂SO₄ at 443 K** removes water from adjacent carbons ($\\ce{CH3CH2OH -> CH2=CH2 + H2O}$). At a lower temperature (413 K) with excess alcohol an **ether** forms instead. The ease of dehydration is **3° > 2° > 1°** (the order of carbocation stability), and the Saytzeff product predominates.',
      v: chem('CH3CH2OH ->[conc H2SO4][443 K] CH2=CH2 + H2O', 'Dehydration of ethanol with concentrated sulfuric acid at 443 kelvin gives ethene and water', 'Ethanol to ethene'),
      n: 'When ethanol is heated with concentrated sulphuric acid at four hundred and forty three kelvin, a molecule of water is removed from adjacent carbons and ethene is formed. At a lower temperature and with excess alcohol, an ether forms instead, so the temperature must be controlled. Tertiary alcohols dehydrate most easily, then secondary, then primary, following the stability of the carbocation intermediate.',
    }),
    sl('diagram', 'Other preparations: dihalides, Kolbe and alkynes', {
      b: '**Vicinal dihalide:** $\\ce{CH2BrCH2Br + Zn -> CH2=CH2 + ZnBr2}$. **Kolbe:** electrolysis of aqueous potassium succinate gives ethene (with CO₂, H₂ and KOH). **Alkynes:** hydrogen over **Lindlar\'s catalyst** (Pd on CaCO₃, poisoned) gives the **cis** alkene; **Na in liquid NH₃** gives the **trans** alkene.',
      v: chem('CH2BrCH2Br + Zn -> CH2=CH2 + ZnBr2', 'Zinc removes two bromine atoms from 1,2-dibromoethane to give ethene and zinc bromide', 'Dehalogenation of a vicinal dibromide'),
      n: 'Three more routes. A vicinal dibromide, with a bromine on each of two neighbouring carbons, loses both with zinc dust to give an alkene. In Kolbe electrolysis of aqueous potassium succinate, ethene forms at the anode. And alkynes can be reduced to alkenes: hydrogen with Lindlar catalyst gives the cis alkene, while sodium in liquid ammonia gives the trans alkene.',
    }),
    sl('example', 'Worked example: cis or trans?', {
      b: '**Problem.** How can pent-2-yne be converted into (a) cis-pent-2-ene and (b) trans-pent-2-ene?\n\n**Solution.** (a) $\\ce{CH3C#CCH2CH3 + H2 ->[Lindlar] CH3CH=CHCH2CH3}$ (Lindlar catalyst, Pd on CaCO₃, poisoned: both H add on the same face, giving the cis isomer). (b) Sodium in liquid ammonia adds the two H atoms on opposite faces (anti addition) to give **trans-pent-2-ene**.',
      v: table(['Target', 'Reagent', 'Stereochemistry of addition'], [['cis-Pent-2-ene', 'H₂, Lindlar catalyst', 'Syn (same side)'], ['trans-Pent-2-ene', 'Na, liquid NH₃', 'Anti (opposite sides)']], 'Table of reagents for converting pent-2-yne into cis-pent-2-ene and trans-pent-2-ene'),
      n: 'The choice of reagent decides the geometry of the alkene. Pent two yne with hydrogen over Lindlar catalyst, which is palladium on calcium carbonate poisoned to stop further reduction, adds both hydrogens on the same side and gives the cis alkene. Sodium in liquid ammonia adds the hydrogens on opposite sides and gives the trans alkene.',
    }),
    sl('concept', 'Physical properties of alkenes', {
      b: 'Alkenes are **non-polar or weakly polar**, so they are **insoluble in water** but soluble in organic solvents, **less dense than water**, with boiling points close to those of alkanes with the same carbon number (C₂–C₄ gases; C₅ onwards liquids). The boiling point rises with chain length and falls with branching. **cis** isomers are slightly polar and boil higher; **trans** isomers are more symmetrical and melt higher.',
      v: table(['Compound', 'Boiling point (°C)', 'Melting point (°C)', 'Dipole moment (D)'], [['cis-But-2-ene', '3.7', '−138.9', 'About 0.3'], ['trans-But-2-ene', '0.9', '−105.5', '0'], ['cis-1,2-Dichloroethene', '60.3', '−80.5', '1.9'], ['trans-1,2-Dichloroethene', '47.5', '−49.8', '0']], 'Table comparing boiling points, melting points and dipole moments of cis and trans isomers of but-2-ene and 1,2-dichloroethene'),
      n: 'Alkenes are non polar or only weakly polar. They do not dissolve in water, but dissolve in organic solvents, and they are less dense than water. The boiling points are close to those of the alkanes with the same number of carbons. In cis isomers the bond dipoles add up, so the cis form is polar and boils higher. The trans form is symmetrical, has zero dipole moment, and fits better in a crystal, so it melts higher.',
    }),
    sl('check', 'Quick check: cis and trans isomers', {
      b: 'Link the dipole moment, boiling point and melting point to the geometry.',
      n: 'Quick check. Think about whether the bond dipoles add up or cancel in each isomer.',
      chk: 'bpcis-mcq',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Alkenes: CₙH₂ₙ, one C=C (sp², one σ and one π, 134 pm, planar).',
        'Isomerism: chain, position and geometrical (cis–trans).',
        'Preparation: dehydration of alcohols (conc. H₂SO₄, 443 K), alcoholic KOH on alkyl halides (Saytzeff), Zn on vicinal dihalides, Kolbe electrolysis, partial reduction of alkynes.',
        'Cis isomers are polar and boil higher; trans isomers are symmetrical and melt higher.',
      ],
      v: table(['Route', 'Key reagent'], [['Dehydration', 'Conc. H₂SO₄, 443 K'], ['Dehydrohalogenation', 'Alcoholic KOH'], ['Vicinal dihalide', 'Zn dust'], ['Alkyne → cis', 'H₂, Lindlar'], ['Alkyne → trans', 'Na, liquid NH₃']], 'Summary table of preparations of alkenes and their key reagents'),
      n: 'To sum up Part one. Alkenes have the formula C n H two n and one sp two carbon double bond, made of one sigma and one pi bond. They show chain, position and geometrical isomerism. They are prepared by dehydration of alcohols, dehydrohalogenation following Saytzeff rule, dehalogenation of dihalides with zinc, Kolbe electrolysis, and partial reduction of alkynes. Cis isomers are polar and boil higher.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'In names, the double bond gets the lowest locant, even before substituents.',
        'For cis–trans isomerism, check both doubly bonded carbons for two different groups.',
        'In dehydrohalogenation questions, name the major and the minor product and quote Saytzeff\'s rule.',
        'Give the reagent and the temperature or catalyst with every preparation.',
      ],
      v: table(['Slip', 'Fix'], [['Numbering from the end nearer a substituent', 'Number from the end nearer the C=C'], ['Lindlar gives the trans alkene', 'Lindlar gives cis; Na/NH₃ gives trans'], ['Dehydration at 413 K gives ethene', 'Ethene needs 443 K; 413 K gives ether']], 'Table of three common slips about alkene names and preparations, with corrections'),
      n: 'Tips for the exam. In naming, give the double bond the lowest locant. For cis trans isomerism, check each doubly bonded carbon for two different groups. In elimination questions, name the major and the minor product and quote Saytzeff rule. Always give the reagent and the condition: concentrated sulphuric acid at four hundred and forty three kelvin, or Lindlar catalyst, or sodium in liquid ammonia.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Alkenes — Part 2: Addition, oxidation and polymerisation',
  goals: [
    'Write the products of addition of H₂, X₂, HX, H₂SO₄ and H₂O to alkenes',
    "Explain electrophilic addition with carbocations, Markownikoff's rule and the peroxide effect",
    'Predict the products of oxidation with KMnO₄ and of ozonolysis; write the polymerisation of ethene',
  ],
  slides: [
    sl('title', 'Why alkenes undergo addition', {
      b: 'The **π bond** is weaker (about 270 kJ mol⁻¹) than the σ bond (about 350 kJ mol⁻¹) and its electrons are exposed above and below the molecule, so alkenes are attacked by **electrophiles**. In an **addition reaction** the π bond breaks and two new σ bonds form: C=C + X–Y → X–C–C–Y.',
      v: table(['Reagent', 'Product from ethene'], [['H₂ (Ni)', 'Ethane'], ['Br₂ (CCl₄)', '1,2-Dibromoethane'], ['HBr', 'Bromoethane'], ['H₂SO₄ (conc.), then H₂O', 'Ethanol'], ['H₂O (acid catalyst)', 'Ethanol']], 'Table of addition reagents and the product obtained from ethene'),
      n: 'Alkenes are reactive because the pi bond is weaker than a sigma bond and its electrons are exposed above and below the molecule. Attacking species that seek electrons, called electrophiles, add to the double bond. In an addition reaction the pi bond breaks and two new sigma bonds form. In this part we study the addition of hydrogen, halogens, hydrogen halides, sulphuric acid and water.',
    }),
    sl('concept', 'Addition of hydrogen and halogens', {
      b: '**Hydrogenation:** alkene + H₂ with finely divided Ni (473 K) or Pt/Pd (room temperature) gives the alkane. **Halogens:** Br₂ in CCl₄ or Cl₂ adds to give a **vicinal dihalide**; the **red-brown bromine colour is lost**, a test for unsaturation. Iodine adds poorly; fluorine reacts violently.',
      v: chem('CH2=CH2 + Br2 -> CH2BrCH2Br', 'Ethene plus bromine gives 1,2-dibromoethane', 'Bromine is decolourised: test for a C=C bond'),
      n: 'With hydrogen and a nickel catalyst at about four hundred and seventy three kelvin, an alkene is converted to the alkane. Halogens add across the double bond too. When ethene is passed into a solution of bromine in tetrachloromethane, the red brown colour disappears and colourless one two dibromoethane forms. This decolourisation is used as a test for a carbon carbon double bond.',
    }),
    sl('concept', "Addition of HX and Markownikoff's rule", {
      b: 'Ethene + HBr → bromoethane. With **unsymmetrical alkenes**, **Markownikoff\'s rule**: *the negative part of the reagent adds to the carbon with fewer hydrogens* (equivalently, the H adds to the carbon with more hydrogens). So propene + HBr gives mainly **2-bromopropane**.',
      v: table(['Alkene + HX', 'Major product'], [['CH₃CH=CH₂ + HBr', 'CH₃CHBrCH₃ (2-bromopropane)'], ['CH₃CH₂CH=CH₂ + HCl', 'CH₃CH₂CHClCH₃ (2-chlorobutane)'], ['(CH₃)₂C=CH₂ + HBr', '(CH₃)₃CBr (2-bromo-2-methylpropane)']], 'Table of three unsymmetrical alkenes, the hydrogen halide added and the major Markownikoff product'),
      n: 'When a hydrogen halide adds to an unsymmetrical alkene, two products are possible, and Markownikoff rule tells us which is major. The negative part of the reagent goes to the carbon with fewer hydrogens. Propene with hydrogen bromide gives mainly two bromopropane, not one bromopropane. Two methylpropene with hydrogen bromide gives the tertiary bromide.',
    }),
    sl('diagram', 'Mechanism: electrophilic addition of HBr to propene', {
      b: '**Step 1 (slow):** the π electrons attack H⁺ of H–Br; H bonds to C-1 and the **carbocation** forms on C-2. **Step 2 (fast):** Br⁻ attacks the carbocation. The more stable **secondary** carbocation is formed in preference to the primary one, which explains Markownikoff\'s rule.',
      v: V.mech,
      n: 'Here is the mechanism. In step one, the pi electrons of propene attack the hydrogen of hydrogen bromide. The hydrogen bonds to carbon one, the bromine leaves as a bromide ion, and a carbocation forms on carbon two. This step is slow. In step two, the bromide ion quickly attacks the positive carbon and two bromopropane forms. The secondary carbocation is favoured because it is more stable than the primary one.',
    }),
    sl('concept', 'Stability of carbocations', {
      b: 'Alkyl groups release electrons (**+I effect**) and their C–H bonds overlap with the empty p orbital (**hyperconjugation**), spreading the charge. So the stability order is **tertiary > secondary > primary > methyl**. The number of hyperconjugating C–H bonds is 9 for (CH₃)₃C⁺, 6 for (CH₃)₂CH⁺, 3 for CH₃CH₂⁺ and 0 for CH₃⁺.',
      v: table(['Carbocation', 'Type', 'α C–H bonds (hyperconjugation)', 'Relative stability'], [['(CH₃)₃C⁺', 'Tertiary', '9', 'Highest'], ['(CH₃)₂CH⁺', 'Secondary', '6', 'High'], ['CH₃CH₂⁺', 'Primary', '3', 'Low'], ['CH₃⁺', 'Methyl', '0', 'Lowest']], 'Table of carbocations by type with the number of hyperconjugating C–H bonds and relative stability'),
      n: 'The stability of carbocations explains Markownikoff rule. Alkyl groups push electrons towards the positive carbon, and their carbon hydrogen bonds can overlap with the empty p orbital, which is called hyperconjugation. The more alkyl groups, the more the charge is spread out. So a tertiary carbocation is the most stable, then secondary, then primary, and the methyl cation is the least stable.',
    }),
    sl('check', "Quick check: Markownikoff's rule", {
      b: 'Decide where H and Br add on an unsymmetrical alkene.',
      n: 'Quick check. Count the hydrogens on each doubly bonded carbon, and add the negative part of the reagent to the carbon with fewer hydrogens.',
      chk: 'markov-mcq',
    }),
    sl('diagram', 'Peroxide effect: anti-Markownikoff addition of HBr', {
      b: 'In the presence of a **peroxide** (benzoyl peroxide) HBr adds by a **free-radical chain** and the orientation reverses: propene gives **1-bromopropane**. Br• adds first to the carbon with more hydrogens, giving the more stable **secondary radical**. The effect is seen **only with HBr**; HCl (H–Cl too strong) and HI (I• unreactive) do not show it.',
      v: V.perox,
      n: 'In the presence of a peroxide, hydrogen bromide adds to propene in the opposite sense, and the main product is one bromopropane. The peroxide produces bromine atoms, which are radicals. The bromine atom adds first, to the end carbon, to give the more stable secondary radical. This radical takes a hydrogen from hydrogen bromide, forming the product and a new bromine atom. This effect is seen only with hydrogen bromide.',
    }),
    sl('example', 'Worked example: with and without peroxide', {
      b: '**Problem.** Give the major product when 2-methylpropene reacts with HBr (a) in the dark, without peroxide, (b) in the presence of benzoyl peroxide.\n\n**Solution.** (a) Markownikoff: H adds to CH₂, Br to the carbon with no H: $\\ce{(CH3)2C=CH2 + HBr -> (CH3)3CBr}$, **2-bromo-2-methylpropane** (via the tertiary carbocation). (b) Peroxide effect: Br adds to CH₂ and H to the other carbon: **1-bromo-2-methylpropane**, (CH₃)₂CHCH₂Br.',
      v: table(['Conditions', 'Intermediate', 'Major product'], [['HBr, no peroxide', 'Tertiary carbocation', '2-Bromo-2-methylpropane'], ['HBr, peroxide', 'Tertiary radical', '1-Bromo-2-methylpropane']], 'Table comparing the products of addition of HBr to 2-methylpropene with and without peroxide'),
      n: 'Compare the two conditions. Without a peroxide, the ionic mechanism applies. The hydrogen goes to the carbon with more hydrogens, and the bromine ends up on the carbon with none, giving two bromo two methylpropane through a tertiary carbocation. With a peroxide, the radical mechanism applies, bromine adds to the end carbon, and the product is one bromo two methylpropane.',
    }),
    sl('concept', 'Addition of sulphuric acid and water', {
      b: 'Cold conc. H₂SO₄ adds to ethene to give **ethyl hydrogensulphate**, which on warming with water gives **ethanol**: $\\ce{CH2=CH2 + H2SO4 -> CH3CH2OSO3H}$, then $\\ce{CH3CH2OSO3H + H2O -> CH3CH2OH + H2SO4}$. Propene follows Markownikoff\'s rule and gives **propan-2-ol**. Direct **hydration** with water and an acid catalyst (dilute H₂SO₄ or H₃PO₄) does the same.',
      v: chem('CH3CH=CH2 + H2O ->[H+] CH3CH(OH)CH3', 'Acid-catalysed hydration of propene gives propan-2-ol following Markownikoff rule', 'Hydration of propene'),
      n: 'Concentrated sulphuric acid adds to ethene in the cold to give ethyl hydrogensulphate. When this is warmed with water it hydrolyses to ethanol and sulphuric acid is regenerated. Propene follows Markownikoff rule, so the hydrogensulphate group goes to the middle carbon and the final product is propan two ol. Alkenes can also be hydrated directly with water and an acid catalyst.',
    }),
    sl('check', 'Quick check: hydration of an alkene', {
      b: 'Add H and OH according to Markownikoff\'s rule.',
      n: 'Quick check. In hydration the hydroxyl group acts as the negative part of the reagent.',
      chk: 'hydrat-mcq',
    }),
    sl('concept', 'Oxidation: combustion and potassium permanganate', {
      b: '**Combustion:** $\\ce{C2H4 + 3O2 -> 2CO2 + 2H2O}$ (a luminous, smoky flame). **Cold dilute alkaline KMnO₄ (Baeyer\'s reagent):** adds two OH groups, giving a **diol**; the purple colour disappears and a brown precipitate of MnO₂ forms (test for unsaturation). **Hot concentrated KMnO₄** cleaves C=C: =CH₂ → CO₂ + H₂O, =CHR → RCOOH, =CR₂ → R₂C=O.',
      v: table(['Alkene', 'Cold dilute alkaline KMnO₄', 'Hot KMnO₄'], [['Ethene', 'Ethane-1,2-diol', 'CO₂ + H₂O'], ['Propene', 'Propane-1,2-diol', 'Ethanoic acid + CO₂'], ['But-2-ene', 'Butane-2,3-diol', '2 Ethanoic acid'], ['2-Methylpropene', '2-Methylpropane-1,2-diol', 'Propanone + CO₂']], 'Table of products of oxidation of four alkenes with cold dilute alkaline potassium permanganate and with hot potassium permanganate'),
      n: 'Alkenes burn with a luminous smoky flame to give carbon dioxide and water. With cold dilute alkaline potassium permanganate, called Baeyer reagent, two hydroxyl groups add across the double bond to give a diol; the purple colour disappears and a brown precipitate forms. With hot concentrated permanganate the double bond is broken, and the products are carbon dioxide, carboxylic acids or ketones.',
    }),
    sl('diagram', 'Ozonolysis: predicting the products', {
      b: 'An alkene reacts with ozone to form an unstable **ozonide**, which is reduced by **Zn and water** to two carbonyl compounds. The C=C is cut and each carbon gets a C=O: **=CH₂ → methanal; =CHR → aldehyde; =CR₂ → ketone**. 2-Methylbut-2-ene gives propanone and ethanal.',
      v: V.ozono,
      n: 'In ozonolysis, ozone adds to the double bond to form an unstable compound called an ozonide. Treatment with zinc and water breaks it into two carbonyl compounds. The double bond is cut, and each carbon that was part of it now carries a double bonded oxygen. A carbon with two hydrogens gives methanal, one with one hydrogen gives an aldehyde, and one with none gives a ketone.',
    }),
    sl('example', 'Worked example: finding an alkene from its bromine uptake', {
      b: `**Problem.** An alkene of mass ${mAlk.toFixed(2)} g reacts completely with ${mBr.toFixed(2)} g of bromine (Br₂ = ${MBR2} g mol⁻¹). Find its molecular formula.\n\n**Solution.** 1 mol of alkene takes 1 mol of Br₂. n(Br₂) = ${mBr.toFixed(2)} ÷ ${MBR2} = ${nBr.toFixed(4)} mol, so M(alkene) = ${mAlk.toFixed(2)} ÷ ${nBr.toFixed(4)} = ${Malk.toFixed(0)} g mol⁻¹. For CₙH₂ₙ, 14n = ${Malk.toFixed(0)}, so n = ${nC}: **C${'₀₁₂₃₄₅₆₇₈₉'[nC]}H${String(2 * nC).split('').map((d) => '₀₁₂₃₄₅₆₇₈₉'[d]).join('')}** (a hexene).`,
      v: table(['Quantity', 'Value'], [['n(Br₂)', `${nBr.toFixed(4)} mol`], ['M(alkene)', `${Malk.toFixed(0)} g mol⁻¹`], ['n in CₙH₂ₙ', String(nC)]], 'Table of the amount of bromine, the molar mass of the alkene and the number of carbon atoms'),
      n: 'One mole of an alkene adds one mole of bromine, so the moles of bromine equal the moles of alkene. Four grams of bromine is point zero two five moles, since bromine has a molar mass of one hundred and sixty. Dividing the mass of the alkene by this gives a molar mass of eighty four. For C n H two n the molar mass is fourteen n, so n is six. The alkene is a hexene.',
    }),
    sl('concept', 'Polymerisation', {
      b: '**Polymerisation** joins many alkene molecules (monomers) into a long chain. Ethene gives **polythene** (polyethylene): $n\\,\\text{CH}_2\\text{=CH}_2 \\rightarrow (\\text{–CH}_2\\text{–CH}_2\\text{–})_n$. High pressure (1000–2000 atm, 350–570 K, trace O₂) gives low-density polythene; a Ziegler–Natta catalyst at lower pressure gives high-density polythene. Propene gives **polypropene**.',
      v: table(['Monomer', 'Polymer', 'Conditions', 'Uses'], [['Ethene', 'Polythene', '1000–2000 atm, 350–570 K, trace O₂ (low density)', 'Bags, films, cable insulation'], ['Ethene', 'Polythene (high density)', 'Ziegler–Natta catalyst, low pressure', 'Bottles, buckets, pipes'], ['Propene', 'Polypropene', 'Ziegler–Natta catalyst', 'Ropes, crates, fibres']], 'Table of monomers, polymers, conditions and uses for polythene and polypropene'),
      n: 'Polymerisation joins thousands of small molecules into one long chain. Ethene polymerises to polythene. At very high pressure and about five hundred kelvin, with a trace of oxygen, it forms the low density type used for bags and films. With a Ziegler Natta catalyst at lower pressure it forms the high density type used for bottles and pipes. Propene gives polypropene, used for ropes and crates.',
    }),
    sl('concept', 'Uses of alkenes', {
      b: 'Ethene is the most important organic raw material: **polythene, ethanol, ethane-1,2-diol (antifreeze), ethylene oxide, PVC** and **ripening of fruits**. Propene gives polypropene, propan-2-ol and acrylonitrile. Alkenes are also the starting materials for many detergents, solvents and synthetic fibres.',
      v: table(['Alkene', 'Main uses'], [['Ethene', 'Polythene, ethanol, antifreeze, PVC, ripening fruit'], ['Propene', 'Polypropene, propan-2-ol, acrylonitrile'], ['But-1-ene, butadiene', 'Synthetic rubber, polymers']], 'Table of the main uses of ethene, propene and butenes'),
      n: 'Ethene is the most important raw material of the organic chemical industry. It is converted into polythene, ethanol, the antifreeze ethane one two diol, and the monomer for polyvinyl chloride. It is also used to ripen fruit artificially. Propene is the source of polypropene and propan two ol. Many solvents, detergents and synthetic fibres begin with alkenes.',
    }),
    sl('check', 'Quick check: ozonolysis', {
      b: 'Work backwards from the carbonyl products: join the carbonyl carbons by C=C.',
      n: 'Quick check. Remove the oxygen from each carbonyl product and join the two carbons by a double bond.',
      chk: 'ozon-mcq',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'Addition: H₂ (Ni), X₂, HX, H₂SO₄ and H₂O; Br₂ in CCl₄ is decolourised (test).',
        "Markownikoff's rule: the negative part adds to the carbon with fewer hydrogens; electrophilic addition through the more stable carbocation.",
        'Peroxide effect (HBr only): free-radical addition gives the anti-Markownikoff product.',
        'Oxidation: cold dilute alkaline KMnO₄ gives a diol (purple to brown); hot KMnO₄ cleaves C=C; ozonolysis gives aldehydes and ketones.',
        'Ethene polymerises to polythene.',
      ],
      v: table(['Reagent', 'Product from propene'], [['H₂, Ni', 'Propane'], ['HBr', '2-Bromopropane'], ['HBr, peroxide', '1-Bromopropane'], ['H₂O, H⁺', 'Propan-2-ol'], ['O₃ then Zn, H₂O', 'Ethanal + methanal']], 'Summary table of products obtained when propene reacts with different reagents'),
      n: 'To sum up Part two. Alkenes undergo addition with hydrogen, halogens, hydrogen halides, sulphuric acid and water, following Markownikoff rule through the more stable carbocation. In the presence of a peroxide, hydrogen bromide adds the opposite way by a radical chain. Cold alkaline permanganate gives a diol, hot permanganate and ozone cleave the double bond, and ethene polymerises to polythene.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'Draw the curved arrows and the carbocation in the mechanism; mark the slow step.',
        'Always state which carbon receives the halogen, and give the reason in terms of carbocation stability.',
        'Remember that the peroxide effect applies to HBr only.',
        'For ozonolysis, give the products by cutting the C=C; for structure questions, reverse the process.',
      ],
      v: table(['Slip', 'Fix'], [['Peroxide effect with HCl or HI', 'Only HBr shows it'], ['Hot KMnO₄ gives a diol', 'Cold dilute alkaline gives the diol; hot cleaves'], ['Primary carbocation preferred', 'Secondary or tertiary is more stable']], 'Table of three common slips on alkene addition and oxidation, with corrections'),
      n: 'Tips for Part two. In the mechanism, draw the curved arrows, show the carbocation and mark the slow step. State which carbon receives the halogen and explain it by the stability of the carbocation. Remember that the peroxide effect belongs to hydrogen bromide alone. And in ozonolysis questions, cut the double bond to find the products, or join the carbonyl carbons to find the alkene.',
    }),
  ],
});
