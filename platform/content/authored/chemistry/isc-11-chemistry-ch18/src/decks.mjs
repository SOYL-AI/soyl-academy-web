// ch18 Isomerism — two decks. Part 1 (t01–t02): structural isomerism (chain, position, functional, metamerism, tautomerism) and
// geometrical isomerism (cis-trans, syn-anti). Part 2 (t03–t04): optical isomerism, polarimeter, specific rotation, chirality,
// d and l forms, racemic and meso forms, lactic and tartaric acid.
import { sl, deck, table, flow, svgV, r, dec } from './lib.mjs';
import { STRUCT4, ISO7, TAUTO, GEOM, OXIME, NICOL, POLARIMETER, CHIRAL, LACTIC, FISCHER, COMPENSATE } from './svgs.mjs';

export const V = {
  struct4: svgV(STRUCT4, 'Four pairs of structural isomers: chain isomers butane and 2-methylpropane, position isomers butan-1-ol and butan-2-ol, functional isomers ethanol and methoxymethane, metamers ethoxyethane and 1-methoxypropane'),
  iso7: svgV(ISO7, 'The seven structural isomers of C4H10O: four alcohols and three ethers', 'Four alcohols and three ethers.'),
  tauto: svgV(TAUTO, 'Propanone (keto form) and prop-1-en-2-ol (enol form) in equilibrium by a shift of one hydrogen atom'),
  geom: svgV(GEOM, 'Cis and trans but-2-ene shown beside but-1-ene and 2-methylpropene, which show no cis-trans isomerism'),
  oxime: svgV(OXIME, 'Syn and anti forms of ethanal oxime, differing in the side of the C=N bond on which the hydroxyl group lies'),
  nicol: svgV(NICOL, 'Nicol prism: unpolarised light splits into an ordinary ray, which is absorbed, and an extraordinary ray, which emerges plane polarised'),
  polar: svgV(POLARIMETER, 'Polarimeter: sodium lamp, polariser, tube with an optically active solution, analyser and eye, with the angle of rotation read from the analyser'),
  chiral: svgV(CHIRAL, 'Chiral carbons marked with an asterisk in butan-2-ol, 2-aminopropanoic acid and 3-methylhexane; propan-2-ol has none'),
  lactic: svgV(LACTIC, 'The two mirror image forms of lactic acid, drawn with wedge and dash bonds'),
  fischer: svgV(FISCHER, 'Fischer projections of the two enantiomers of tartaric acid and of meso-tartaric acid with its internal mirror plane'),
  comp: svgV(COMPENSATE, 'External compensation in a racemic mixture compared with internal compensation in a meso compound'),
};

// worked-example numbers (computed once, printed to the right number of significant figures)
const GLU = 52.7; // specific rotation of glucose, degrees dm⁻¹ (g mL⁻¹)⁻¹ (standard value)
const exMass = 5.0;
const exVol = 50.0;
const exL = 2.0;
const exC = exMass / exVol; // 0.100 g mL⁻¹
const exAlpha = GLU * exL * exC; // 10.54
const ex2Alpha = 4.22; // measured rotation, degrees
const ex2L = 2.0;
const ex2C = ex2Alpha / (GLU * ex2L); // 0.04003

export const deck1 = deck({
  part: 1,
  title: 'Isomerism — Part 1: Structural and geometrical isomerism',
  goals: [
    'Define isomerism and identify chain, position, functional, metamerism and tautomerism among structural isomers',
    'Draw and name the structural isomers of a formula such as C4H10O',
    'State the conditions for geometrical isomerism and draw cis and trans forms of but-2-ene',
    'Distinguish syn and anti forms of oximes',
  ],
  slides: [
    sl('title', 'One formula, many compounds', {
      b: '**Isomers** are compounds with the **same molecular formula** but **different properties**, because their atoms are arranged differently. Part 1 covers **structural** isomers (different connectivity) and **geometrical** isomers (different arrangement in space about a double bond).',
      v: table(['Formula C₂H₆O', 'Ethanol', 'Methoxymethane'], [['State at 298 K', 'Liquid', 'Gas'], ['Boiling point', '351 K', '249 K'], ['With sodium', 'Gives hydrogen', 'No reaction'], ['Functional group', '–OH', '–O–']], 'Table comparing ethanol and methoxymethane, two isomers of C2H6O, in state, boiling point, reaction with sodium and functional group'),
      n: 'Namaste! Two compounds can share a molecular formula and still be very different. Ethanol is a liquid that reacts with sodium. Methoxymethane, with the same atoms, is a gas that does not react with sodium. Such compounds are called isomers, and in this part we classify the ways in which isomers can differ.',
    }),
    sl('concept', 'Types of isomerism', {
      b: '**Structural isomerism:** the atoms are joined in a different order (chain, position, functional group, metamerism, tautomerism). **Stereoisomerism:** the order is the same but the arrangement in space differs (geometrical and optical).',
      v: flow('LR', [['i', 'Isomerism'], ['s', 'Structural: chain, position, functional, metamerism, tautomerism'], ['t', 'Stereo: geometrical and optical']], [['i', 's'], ['i', 't']], 'Flow chart dividing isomerism into structural and stereoisomerism'),
      n: 'Isomerism is divided into two broad classes. In structural isomerism the atoms are joined in a different order. There are five kinds: chain, position, functional group, metamerism and tautomerism. In stereoisomerism the atoms are joined in the same order but are arranged differently in space. The two kinds are geometrical and optical isomerism.',
    }),
    sl('diagram', 'Chain, position, functional and metamerism', {
      b: '**Chain:** different carbon skeletons. **Position:** the same skeleton, a group or bond in a different place. **Functional:** different functional groups. **Metamerism:** different alkyl groups on either side of the same functional group (ethers, ketones, amines).',
      v: V.struct4,
      n: 'Here are four kinds of structural isomers. Butane and two methylpropane differ in the carbon chain. Butan one ol and butan two ol have the hydroxyl group in different places. Ethanol and methoxymethane have different functional groups, an alcohol and an ether. Ethoxyethane and one methoxypropane are both ethers with different alkyl groups on the two sides of the oxygen, which is metamerism.',
    }),
    sl('concept', 'How to recognise each type', {
      b: 'Ask in turn: (1) same functional group? (2) same carbon skeleton? (3) same position of the group? Metamerism needs the same group between different alkyl groups, and is found in compounds with a polyvalent atom or group such as –O–, >C=O or >NH.',
      v: table(['Type', 'What differs', 'Example pair'], [['Chain', 'Carbon skeleton', 'Pentane and 2,2-dimethylpropane'], ['Position', 'Place of group or bond', 'But-1-ene and but-2-ene'], ['Functional', 'Functional group', 'Propanal and propanone'], ['Metamerism', 'Alkyl groups round the group', 'Ethoxyethane and 1-methoxypropane']], 'Table of four types of structural isomerism with what differs and an example pair'),
      n: 'To identify the type of isomerism, ask a few questions in order. Do the two compounds have the same functional group? If not, they are functional isomers. If yes, is the carbon skeleton the same? If not, they are chain isomers. If the skeleton is the same but the group sits in a different place, they are position isomers. And if the same group has different alkyl groups on its two sides, they are metamers.',
    }),
    sl('check', 'Quick check: the type of isomerism', {
      b: 'Identify the type of isomerism between two given compounds.',
      n: 'Quick check. Work through the questions: group, skeleton, position, and alkyl groups either side.',
      chk: 'type-mcq',
    }),
    sl('diagram', 'All the isomers of C₄H₁₀O', {
      b: 'To list isomers without missing any: (1) fix the functional group family (alcohol or ether); (2) draw each possible carbon skeleton; (3) move the group to every different position; (4) remove duplicates. Here this gives **4 alcohols** and **3 ethers**.',
      v: V.iso7,
      n: 'This is how to find all the isomers of a formula. Take alcohols first. Butane gives butan one ol and butan two ol, and two methylpropane gives two methylpropan one ol and two methylpropan two ol: four alcohols. Then ethers: methoxy propane, ethoxyethane and two methoxypropane, three ethers. In total seven structural isomers.',
    }),
    sl('example', 'Worked example: classifying pairs of isomers', {
      b: '**Problem.** State the type of isomerism in each pair: (a) pentane and 2,2-dimethylpropane; (b) pent-1-ene and pent-2-ene; (c) propanal and propanone; (d) ethoxyethane and 1-methoxypropane.\n\n**Answer.** (a) chain; (b) position (same skeleton, C=C in different places); (c) functional (aldehyde and ketone, both C₃H₆O); (d) metamerism (both ethers, C₄H₁₀O).',
      v: table(['Pair', 'Same formula', 'Type'], [['Pentane / 2,2-dimethylpropane', 'C₅H₁₂', 'Chain'], ['Pent-1-ene / pent-2-ene', 'C₅H₁₀', 'Position'], ['Propanal / propanone', 'C₃H₆O', 'Functional'], ['Ethoxyethane / 1-methoxypropane', 'C₄H₁₀O', 'Metamerism']], 'Table of four pairs of isomers with their formulas and the type of isomerism'),
      n: 'Check each pair. Pentane and dimethylpropane have different carbon skeletons: chain isomers. The two pentenes keep the same skeleton but move the double bond: position isomers. Propanal is an aldehyde and propanone a ketone: functional isomers. And ethoxyethane and methoxypropane are both ethers with different alkyl groups: metamers.',
    }),
    sl('concept', 'Tautomerism', {
      b: '**Tautomerism** is a special type of functional isomerism in which two isomers, the **tautomers**, are in **rapid dynamic equilibrium**, usually through the shift of a hydrogen atom. In **keto–enol tautomerism** the carbonyl compound with an α-hydrogen (keto form) shifts a hydrogen from carbon to oxygen to give the enol form (C=C and –OH).',
      v: V.tauto,
      n: 'Tautomers are isomers that change into each other quickly and exist together in equilibrium. In keto enol tautomerism, a hydrogen atom moves from the carbon next to the carbonyl group to the oxygen atom, and the double bond moves from carbon oxygen to carbon carbon. For propanone, the keto form overwhelmingly predominates, but the enol form is always present in a tiny amount.',
    }),
    sl('concept', 'Which compounds show keto–enol tautomerism?', {
      b: 'A compound must have **at least one α-hydrogen**, that is a hydrogen on a carbon next to the C=O group. Ethanal and propanone qualify; methanal (HCHO) and benzaldehyde (C₆H₅CHO) have no α-hydrogen and do not. In ethyl 3-oxobutanoate (ethyl acetoacetate) the enol form is present in a measurable amount.',
      v: table(['Compound', 'α-hydrogen?', 'Keto–enol tautomerism?'], [['Propanone, CH₃COCH₃', 'Yes (6)', 'Yes'], ['Ethanal, CH₃CHO', 'Yes (3)', 'Yes'], ['Methanal, HCHO', 'No', 'No'], ['Benzaldehyde, C₆H₅CHO', 'No', 'No'], ['2,2-Dimethylpropanal, (CH₃)₃CCHO', 'No', 'No']], 'Table showing which carbonyl compounds have an alpha hydrogen and can show keto-enol tautomerism'),
      n: 'Not every carbonyl compound shows this. It needs an alpha hydrogen, a hydrogen on the carbon next to the carbonyl group. Propanone has six and ethanal has three. Methanal, benzaldehyde and dimethylpropanal have none, so they cannot form an enol and show no tautomerism. Ethyl acetoacetate is a famous case where the enol form is easily detected.',
    }),
    sl('check', 'Quick check: tautomerism', {
      b: 'Decide which compound can form an enol, or identify the enol form of a given ketone.',
      n: 'Quick check. Look for an alpha hydrogen, and remember that the enol has a carbon double bond and a hydroxyl group.',
      chk: 'tauto-mcq',
    }),
    sl('concept', 'Geometrical isomerism: the conditions', {
      b: 'Geometrical (cis–trans) isomerism arises from **restricted rotation** about a double bond (or in a ring). It needs **two different atoms or groups on each doubly bonded carbon**. In the **cis** form the like groups are on the same side; in the **trans** form on opposite sides. The isomers cannot interconvert at room temperature without breaking the π bond.',
      v: V.geom,
      n: 'Because the pi bond stops rotation about a double bond, the groups attached to it are held in place. If each doubly bonded carbon carries two different groups, two arrangements are possible. When the like groups are on the same side, the isomer is cis. When they are on opposite sides, it is trans. The alkene with the double bond at position one in butene has two hydrogens on one carbon, so it has no cis or trans form.',
    }),
    sl('concept', 'Cis and trans isomers differ in properties', {
      b: 'Geometrical isomers are different compounds with different physical properties. The **cis** form of a 1,2-disubstituted alkene is usually **more polar** (the bond dipoles add) and has the **higher boiling point**; the **trans** form is more symmetrical, packs better and usually has the **higher melting point**.',
      v: table(['Property', 'cis-1,2-dichloroethene', 'trans-1,2-dichloroethene'], [['Dipole moment', 'About 1.9 D', 'Zero'], ['Boiling point', 'About 333 K', 'About 321 K'], ['Polarity', 'Polar', 'Non-polar']], 'Table comparing cis and trans 1,2-dichloroethene in dipole moment, boiling point and polarity'),
      n: 'In cis one comma two dichloroethene the two carbon chlorine dipoles point to the same side and add up, so the molecule is polar and has the higher boiling point, about three hundred and thirty three kelvin. In the trans form, the dipoles cancel and the dipole moment is zero. The trans isomer boils lower, near three hundred and twenty one kelvin.',
    }),
    sl('example', 'Worked example: which alkenes show cis–trans isomerism?', {
      b: '**Problem.** Which of pent-2-ene, but-1-ene, 2-methylbut-2-ene and 1,2-dibromoethene show geometrical isomerism?\n\n**Method.** Check the groups on each doubly bonded carbon. Pent-2-ene: C-2 has H and CH₃, C-3 has H and C₂H₅ — **yes**. But-1-ene: C-1 has two H — **no**. 2-Methylbut-2-ene: C-2 has two CH₃ — **no**. 1,2-Dibromoethene: H and Br on each carbon — **yes**.',
      v: table(['Compound', 'Groups on C=C carbons', 'cis–trans?'], [['Pent-2-ene', 'H, CH₃ / H, C₂H₅', 'Yes'], ['But-1-ene', 'H, H / H, C₂H₅', 'No'], ['2-Methylbut-2-ene', 'CH₃, CH₃ / H, CH₃', 'No'], ['1,2-Dibromoethene', 'H, Br / H, Br', 'Yes']], 'Table of four alkenes with the groups on the double bond carbons and whether they show cis-trans isomerism'),
      n: 'For each alkene, look at the two groups on each doubly bonded carbon. Pent two ene has a hydrogen and a methyl on one carbon, and a hydrogen and an ethyl on the other, so it has cis and trans forms. But one ene has two hydrogens on one carbon, and two methylbut two ene has two methyl groups on one carbon, so neither does. One two dibromoethene does.',
    }),
    sl('concept', 'Syn and anti isomerism in oximes', {
      b: 'Rotation about the **C=N** bond of an oxime is also restricted, so oximes show geometrical isomerism. In an **aldoxime** (R–CH=N–OH), the **syn** isomer has the H and OH on the **same side** of C=N; in the **anti** isomer they are on **opposite sides**. (Cis–trans labels are used for C=C; syn–anti for C=N.)',
      v: V.oxime,
      n: 'The carbon nitrogen double bond in oximes also prevents free rotation. In an aldoxime the nitrogen carries a hydroxyl group, and the carbon carries a hydrogen. If the hydrogen and the hydroxyl group lie on the same side, we call it the syn form. If they lie on opposite sides, it is the anti form. We use syn and anti for the carbon nitrogen bond and cis and trans for the carbon carbon double bond.',
    }),
    sl('check', 'Quick check: geometrical isomerism', {
      b: 'Decide which compound can show cis–trans isomerism, or name the condition.',
      n: 'Quick check. Each doubly bonded carbon must carry two different groups.',
      chk: 'geomcond-mcq',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Isomers: same molecular formula, different structures and properties.',
        'Structural: chain, position, functional, metamerism, tautomerism. C₄H₁₀O has 7 structural isomers.',
        'Tautomers (keto and enol) are in dynamic equilibrium and need an α-hydrogen.',
        'Geometrical isomerism needs restricted rotation and two different groups on each double-bond carbon.',
        'Oximes show syn and anti isomerism about C=N.',
      ],
      v: table(['Isomerism', 'Key idea'], [['Chain', 'Different carbon skeleton'], ['Position', 'Group in a different place'], ['Functional', 'Different functional group'], ['Metamerism', 'Different alkyl groups round one group'], ['Geometrical', 'Same side (cis) or opposite sides (trans)']], 'Summary table of the types of isomerism in Part 1'),
      n: 'To sum up Part 1. Isomers share a molecular formula but differ in structure. Structural isomerism has five kinds: chain, position, functional, metamerism and tautomerism. Tautomers exist in equilibrium and need an alpha hydrogen. Geometrical isomerism needs restricted rotation and two different groups on each doubly bonded carbon. Oximes show syn and anti forms.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'To list isomers, work systematically: functional group family, then skeleton, then position.',
        'Write both the structure and the IUPAC name when asked for isomers.',
        'Name the type of isomerism between each pair, not just the formula.',
        'For cis–trans, check each double-bond carbon separately for two different groups.',
      ],
      v: table(['Slip', 'Fix'], [['Butan-1-ol and butan-2-ol are chain isomers', 'Same skeleton: position isomers'], ['Propanal and propanone are metamers', 'Different groups: functional isomers'], ['But-1-ene shows cis–trans', 'C-1 has two H: no']], 'Table of three common slips in structural and geometrical isomerism and corrections'),
      n: 'A few tips for the exam. Work systematically when listing isomers, starting from the functional group family, then the skeleton, then the position. Write names as well as structures. Name the type of isomerism for each pair. And for cis trans isomerism, test each doubly bonded carbon on its own.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Isomerism — Part 2: Optical isomerism',
  goals: [
    'Describe plane-polarised light, the Nicol prism and the polarimeter',
    'Calculate specific rotation and related quantities from α = [α] × l × c',
    'Identify chiral carbon atoms and explain optical activity',
    'Explain d and l forms, racemic and meso forms, external and internal compensation, using lactic and tartaric acid',
  ],
  slides: [
    sl('title', 'Compounds that turn light', {
      b: 'Part 2 — some compounds rotate the plane of polarised light. This **optical activity** is explained by the **three-dimensional shape** of the molecule.',
      v: table(['Light type', 'Vibrations'], [['Ordinary (unpolarised)', 'In every plane at right angles to the ray'], ['Plane polarised', 'In one plane only'], ['After an optically active solution', 'Same single plane, turned by an angle α']], 'Table of ordinary light, plane polarised light and light after an optically active solution'),
      n: 'Namaste! Ordinary light vibrates in every plane at right angles to its path. Plane polarised light vibrates in one plane only. When plane polarised light passes through some solutions, such as sugar, the plane is turned through an angle. That property is called optical activity, and it tells us about molecular shape.',
    }),
    sl('diagram', 'The Nicol prism', {
      b: 'A **Nicol prism** is a crystal of **calcite** cut along a diagonal and cemented with **Canada balsam**. Unpolarised light splits into an **ordinary (o) ray** and an **extraordinary (e) ray**. The o-ray is **totally reflected** at the balsam layer and absorbed by the blackened face; only the **e-ray**, plane polarised, passes out.',
      v: V.nicol,
      n: 'A Nicol prism is made of a crystal of calcite, cut in two along a diagonal and cemented back with Canada balsam. When unpolarised light enters, it splits into two rays. The ordinary ray strikes the balsam layer, is totally reflected, and is absorbed by the blackened side. The extraordinary ray passes straight through and emerges as plane polarised light.',
    }),
    sl('diagram', 'The polarimeter', {
      b: 'A **polarimeter** measures the **angle of rotation α**. Light from a monochromatic source (sodium D line, 589 nm) passes through the **polariser**, the tube of solution and the **analyser**. With the empty tube the analyser is set for the field at its darkest or brightest; with the solution, it must be **turned through α** to restore this setting.',
      v: V.polar,
      n: 'In the polarimeter, light from a sodium lamp passes through a fixed polariser, which gives plane polarised light. This passes through a tube holding the solution. An optically active solution turns the plane through an angle alpha. A second Nicol prism, the analyser, is then turned until the original brightness is restored, and the angle read from the circular scale is the angle of rotation.',
    }),
    sl('concept', 'Dextro- and laevorotatory; specific rotation', {
      b: 'A substance that turns the plane **clockwise** is **dextrorotatory (d or +)**; **anticlockwise** is **laevorotatory (l or −)**. The observed rotation depends on length of tube, concentration, temperature and wavelength, so chemists quote the **specific rotation** $[\\alpha]$: the rotation by a solution of concentration 1 g mL⁻¹ in a tube 1 dm long.',
      m: [r`[\alpha] = \frac{\alpha}{l \times c} \qquad (l \text{ in dm},\ c \text{ in g mL}^{-1})`],
      v: table(['Substance', 'Specific rotation (D line, about 293 K), given'], [['Sucrose', '+66.5°'], ['Glucose', '+52.7°'], ['Fructose', '−92.4°']], 'Table of specific rotations of sucrose, glucose and fructose'),
      n: 'If the plane turns clockwise, as seen looking towards the source, the substance is dextrorotatory, marked d or plus. If it turns anticlockwise, it is laevorotatory, marked l or minus. Because the angle depends on tube length and concentration, we quote the specific rotation, the angle for a one decimetre tube and a concentration of one gram per millilitre.',
    }),
    sl('example', 'Worked example: observed rotation', {
      b: `**Problem.** ${dec(exMass, 3)} g of glucose ([α] = +${GLU}°) is dissolved in water to make ${dec(exVol, 3)} mL of solution, which is placed in a ${dec(exL, 3)} dm tube. Find the observed rotation.\n\n**Step 1.** $c = ${dec(exMass, 3)} \\div ${dec(exVol, 3)} = ${dec(exC, 3)}\\ \\text{g mL}^{-1}$.\n\n**Step 2.** $\\alpha = [\\alpha] \\times l \\times c = ${GLU} \\times ${dec(exL, 3)} \\times ${dec(exC, 3)} = ${exAlpha.toFixed(2)}$, so $\\alpha \\approx +${dec(exAlpha, 3)}^\\circ$.`,
      v: table(['Quantity', 'Value'], [['c', `${dec(exC, 3)} g mL⁻¹`], ['l', `${dec(exL, 3)} dm`], ['α', `+${dec(exAlpha, 3)}°`]], 'Table of concentration, tube length and observed rotation for the glucose example'),
      n: 'First find the concentration in grams per millilitre: five grams in fifty millilitres is nought point one grams per millilitre. Then multiply the specific rotation by the tube length in decimetres and by the concentration. Fifty two point seven times two times nought point one gives about ten point five degrees, positive because glucose is dextrorotatory.',
    }),
    sl('check', 'Quick check: specific rotation', {
      b: 'Use [α] = α / (l × c) with the tube length in decimetres.',
      n: 'Quick check. Convert the tube length to decimetres and the concentration to grams per millilitre before using the formula.',
      chk: 'spec-mcq',
    }),
    sl('example', 'Worked example: concentration from rotation', {
      b: `**Problem.** A solution of glucose in a ${dec(ex2L, 3)} dm tube rotates the plane by +${ex2Alpha.toFixed(2)}°. Find its concentration, with [α] = +${GLU}°.\n\n**Solution.** $c = \\dfrac{\\alpha}{[\\alpha] \\times l} = \\dfrac{${ex2Alpha.toFixed(2)}}{${GLU} \\times ${dec(ex2L, 3)}} = ${ex2C.toFixed(5)}$, so $c \\approx ${dec(ex2C, 3)}\\ \\text{g mL}^{-1}$, that is ${dec(ex2C * 100, 3)} g in 100 mL.`,
      v: table(['Given', 'Found'], [[`α = +${ex2Alpha.toFixed(2)}°, l = ${dec(ex2L, 3)} dm`, `c = ${dec(ex2C, 3)} g mL⁻¹`], [`[α] = +${GLU}°`, `${dec(ex2C * 100, 3)} g in 100 mL`]], 'Table of the given rotation and tube length and the concentration found'),
      n: 'The same formula can be turned round to find the concentration. Divide the observed rotation by the product of the specific rotation and the tube length. Four point two two divided by fifty two point seven times two gives about nought point zero four zero zero grams per millilitre, or four grams in a hundred millilitres.',
    }),
    sl('concept', 'Chirality and the asymmetric carbon', {
      b: 'A molecule is optically active when it is **chiral**: it cannot be superimposed on its mirror image, as a left hand cannot be superimposed on a right hand. The usual cause is an **asymmetric (chiral) carbon atom**, one bonded to **four different atoms or groups**, marked with an asterisk. A molecule with a plane or centre of symmetry is achiral and inactive.',
      v: V.chiral,
      n: 'A chiral molecule cannot be placed on top of its mirror image, like your left and right hands. The common cause is a carbon bonded to four different groups, called an asymmetric or chiral carbon. Butan two ol has one, because its second carbon carries hydrogen, hydroxyl, methyl and ethyl. Propan two ol does not, because it has two identical methyl groups on that carbon.',
    }),
    sl('diagram', 'Lactic acid: a pair of enantiomers', {
      b: 'In **2-hydroxypropanoic acid (lactic acid)**, C-2 carries CH₃, COOH, OH and H. There are two arrangements in space that are mirror images and cannot be superimposed: **enantiomers**. They have identical melting points and boiling points, but rotate plane-polarised light by **equal angles in opposite directions**.',
      v: V.lactic,
      n: 'Lactic acid has one chiral carbon, with methyl, carboxyl, hydroxyl and hydrogen. The two ways of arranging these four groups in space give two molecules that are mirror images and cannot be superimposed, called enantiomers. They have the same melting and boiling points, but one turns the plane of polarised light clockwise and the other turns it anticlockwise by the same angle.',
    }),
    sl('check', 'Quick check: spotting a chiral carbon', {
      b: 'Find the carbon bonded to four different groups.',
      n: 'Quick check. Write down the four groups on each carbon and see whether any two are the same.',
      chk: 'chiral-mcq',
    }),
    sl('concept', 'd and l forms and the racemic mixture', {
      b: 'The **d form** and **l form** rotate by equal angles in opposite directions. An **equimolar mixture** of d and l forms is a **racemic mixture** ((±) or dl). It is **optically inactive by external compensation**: the rotation by the d molecules is cancelled by the l molecules, which are **separate molecules**. It can be separated into the two forms (resolution).',
      v: table(['Form', 'Rotation', 'Notation'], [['d form', 'Clockwise, +α', 'd or (+)'], ['l form', 'Anticlockwise, −α', 'l or (−)'], ['Racemic mixture', 'Zero (external compensation)', '(±) or dl']], 'Table of the d form, l form and racemic mixture with rotation and notation'),
      n: 'The d and l forms rotate the plane by equal angles in opposite directions. If we mix equal numbers of d and l molecules we get a racemic mixture. Its net rotation is zero, because the rotation caused by the d molecules is cancelled by the l molecules. This is called external compensation, because the cancelling happens between separate molecules.',
    }),
    sl('diagram', 'Tartaric acid: three stereoisomers', {
      b: '**Tartaric acid**, HOOC–CH(OH)–CH(OH)–COOH, has **two chiral carbons** but the two are **identical** in kind. There are only **three** stereoisomers: the **d(+)** and **l(−)** forms (enantiomers) and the **meso** form, which is optically inactive.',
      v: V.fischer,
      n: 'Tartaric acid has two chiral carbons, and each carries the same set of groups. With two chiral carbons you might expect four stereoisomers, but there are only three. Two are mirror images, the d plus and l minus forms, which are optically active. The third is the meso form, in which the two hydroxyl groups are on the same side, and the molecule is optically inactive.',
    }),
    sl('concept', 'Meso form and internal compensation', {
      b: 'A **meso compound** has chiral carbons but also an **internal plane of symmetry**, so it is **achiral** and **optically inactive**. This is **internal compensation**: the rotation by one half of the molecule is cancelled by the other half **in the same molecule**. A meso compound cannot be resolved into optically active forms.',
      v: V.comp,
      n: 'In a meso compound the molecule itself has a plane of symmetry that divides it into two halves that are mirror images. One half would rotate the plane clockwise and the other anticlockwise by the same amount, so the molecule is inactive. This is internal compensation. Unlike a racemic mixture, a meso compound is a single compound and cannot be separated into optically active forms.',
    }),
    sl('check', 'Quick check: the meso form', {
      b: 'Explain why a molecule with chiral carbons can still be inactive.',
      n: 'Quick check. Look for an internal plane of symmetry that makes one half the mirror image of the other.',
      chk: 'meso-mcq',
    }),
    sl('concept', 'How many stereoisomers?', {
      b: 'A molecule with **n different chiral carbons** (no symmetry) has **2ⁿ** optical isomers, in n pairs of enantiomers. If the molecule is **symmetrical**, as in tartaric acid, meso forms appear and the number is smaller.',
      v: table(['Compound type', 'Chiral carbons', 'Stereoisomers'], [['Lactic acid', '1', '2 (d, l)'], ['2,3-Dibromopentane (unlike ends)', '2', '4 (two pairs)'], ['Tartaric acid (like ends)', '2', '3 (d, l, meso)'], ['Three different chiral carbons', '3', '8']], 'Table of the number of stereoisomers for compounds with one, two and three chiral carbons'),
      n: 'With one chiral carbon there are two stereoisomers. If there are two different chiral carbons, with different groups at the two ends, there are four stereoisomers. But if the two ends are the same, as in tartaric acid, a meso form appears and there are only three. With three different chiral carbons there are two to the power three, that is eight.',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'Plane-polarised light is obtained from ordinary light with a Nicol prism; a polarimeter measures the angle of rotation α.',
        r`Specific rotation $[\alpha] = \alpha / (l \times c)$, with $l$ in dm and $c$ in g mL⁻¹.`,
        'A chiral molecule (usually with an asymmetric carbon) is optically active; mirror images are enantiomers.',
        'Racemic mixture: equal d and l, inactive by external compensation. Meso: inactive by internal compensation.',
        'Tartaric acid has three stereoisomers; lactic acid has two.',
      ],
      v: table(['Term', 'Meaning'], [['Enantiomers', 'Non-superimposable mirror images'], ['Racemic mixture', 'Equimolar d and l: external compensation'], ['Meso form', 'Chiral carbons plus a plane of symmetry: internal compensation']], 'Summary table of enantiomers, racemic mixture and meso form'),
      n: 'Let us sum up Part 2. A Nicol prism gives plane polarised light, and a polarimeter measures the rotation. The specific rotation is the observed rotation divided by tube length in decimetres and concentration in grams per millilitre. Chiral molecules are optically active. A racemic mixture is inactive because of external compensation, and a meso compound because of internal compensation.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'Convert the tube length to dm and the concentration to g mL⁻¹ before using the formula.',
        'Mark each asymmetric carbon with an asterisk and list its four different groups.',
        'Never say that a meso compound is a mixture; it is one compound.',
        'Compare external and internal compensation: separate molecules against one molecule.',
      ],
      v: table(['Slip', 'Fix'], [['Tube 10 cm used as 10', 'Use 1.0 dm'], ['Racemic mixture is a meso compound', 'Racemic: two forms mixed; meso: one compound'], ['Tartaric acid has 4 isomers', '3: d, l and meso']], 'Table of three common slips in optical isomerism and corrections'),
      n: 'Some tips. Always convert the tube length to decimetres. Mark each asymmetric carbon and check its four groups. A meso compound is a single compound, not a mixture, so do not confuse it with a racemic mixture. And remember that tartaric acid has three stereoisomers, not four.',
    }),
  ],
});
