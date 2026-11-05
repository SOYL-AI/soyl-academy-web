// ICSE 9 Chemistry ch10 Hydrogen: Position, Sources and Preparation — question bank in ICSE school-examination style
// (balanced equations, observations, identification, set-ups, counts from equations, 10-mark structured questions in parts).
// AR keys use the ICSE option order: a = A true R false, b = A false R true, c = both true and R explains, d = both true and R does not explain.
import { mk, add, svgV, r } from '../../icse-9-chemistry-ch01/src/lib.mjs';
import { eq, givesH2WithAcid, rank, CONFIG, FE_FOR_20, STEAM20, H2_FROM_FE_12, H2_FROM_18HCL, H2_FROM_12AL, C_ATOMS, CO_CHANGED, H2_PARTIAL, CO_LEFT, H2_FROM_C45, C45, H2_AFTER_SHIFT } from './calc.mjs';
import { LAB_H2_LETTERED, STEAM_SET_LETTERED } from './svgs.mjs';

const { mcq, ar, tf, fill, num, short, long, match } = mk;
const labFig = svgV(LAB_H2_LETTERED, 'Apparatus for preparing hydrogen from zinc and dilute acid, with five parts lettered A to E');
const steamFig = svgV(STEAM_SET_LETTERED, 'Apparatus in which steam is passed over a heated metal, with five parts lettered A to E');
const term = (o) => short({ marks: 1, wl: null, scheme: [[o.sch ?? 'Correct answer', 1]], ...o });

// ---------------------------------------------------------------- deck-check items (not used in tests)
add('chk-pos', mcq({
  stem: 'Which feature of the hydrogen atom is a reason for placing hydrogen with the alkali metals?',
  right: 'It has one electron in its outer shell, which it can lose to form a positive ion', wrong: ['It exists as a gas at room temperature', 'It exists as diatomic molecules', 'It needs one more electron to complete its shell'],
  sol: 'One outer electron that can be lost gives H⁺, as sodium gives Na⁺, option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
add('chk-steam', mcq({
  stem: 'Steam is passed over red-hot iron. The products and the nature of the change are',
  right: 'triiron tetroxide and hydrogen; the reaction is reversible', wrong: ['iron(III) oxide and hydrogen; the reaction goes to completion', 'iron(II) hydroxide and hydrogen; the reaction is reversible', 'triiron tetroxide and oxygen; the reaction goes to completion'],
  sol: 'Iron with steam gives the black oxide Fe₃O₄ and hydrogen, and the change can go backwards, option (@K).',
  d: 2, c: 'recall', t: [2],
}));
add('chk-alkali', mcq({
  stem: 'Pieces of zinc are warmed with concentrated sodium hydroxide solution. The correct statement is',
  right: 'hydrogen is given off and sodium zincate is formed', wrong: ['oxygen is given off and zinc hydroxide is formed', 'nothing happens because zinc lies below hydrogen', 'zinc oxide and hydrogen are formed'],
  sol: 'Zinc is one of the metals that react with a strong alkali to give hydrogen and a zincate, option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('chk-funnel', mcq({
  stem: 'In the preparation of hydrogen the lower end of the thistle funnel must dip below the surface of the acid so that',
  right: 'the gas cannot escape through the funnel', wrong: ['the acid cannot touch the zinc', 'the zinc granules stay dry', 'the gas is dried as it passes up the tube'],
  sol: 'Acid forms a liquid seal at the funnel end, so the hydrogen is forced along the delivery tube, option (@K).',
  d: 1, c: 'understanding', t: [4],
}));
add('chk-dry', mcq({
  stem: 'Hydrogen from the flask is first passed through alkali solution and then over anhydrous calcium chloride. The calcium chloride removes',
  right: 'water vapour', wrong: ['acid spray', 'air', 'excess hydrogen'],
  sol: 'A drying agent takes out moisture; the acid gases were already taken out by the alkali, option (@K).',
  d: 1, c: 'understanding', t: [4],
}));
add('chk-bosch', mcq({
  stem: 'In the second stage of the Bosch process the catalyst used, and the substance that carbon monoxide is changed into, are',
  right: 'iron(III) oxide; carbon dioxide', wrong: ['nickel; methane', 'chromium(III) oxide, with iron(III) oxide as the promoter; carbon dioxide', 'iron(III) oxide; carbon'],
  sol: 'Iron(III) oxide is the catalyst, chromium(III) oxide the promoter, and carbon monoxide with steam gives carbon dioxide, option (@K).',
  d: 2, c: 'recall', t: [5],
}));

// ---------------------------------------------------------------- t01 position of hydrogen
add('pos-mcq1', mcq({
  stem: 'Which statement shows that hydrogen resembles the halogens?',
  right: 'It gains one electron to form the hydride ion in sodium hydride', wrong: ['It burns in oxygen to give an oxide', 'It acts as a reducing agent', 'It has a single electron in its outer shell'],
  sol: 'Gaining an electron to form a negative ion is the halogen-like behaviour; the other three resemble the alkali metals, option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('pos-mcq2', mcq({
  stem: 'The electronic configurations of three atoms are P: 1; Q: 2, 8, 1; R: 2, 8, 7. Which statement is correct?',
  right: 'P and Q have the same number of outer electrons, and P and R each need one electron to complete the outer shell', wrong: ['P and R have the same number of outer electrons', 'Q and R each need one electron to complete the outer shell', 'P and Q each need one electron to complete the outer shell'],
  sol: 'P and Q each have one outer electron. P needs one to reach two, and R needs one to reach eight; Q needs seven, option (@K).',
  d: 3, c: 'application', t: [1],
}), () => CONFIG.H.at(-1) === CONFIG.Na.at(-1) && 2 - CONFIG.H[0] === 1 && 8 - CONFIG.Cl.at(-1) === 1 && 8 - CONFIG.Na.at(-1) === 7 || 'configs');
add('pos-mcq3', mcq({
  stem: 'Hydrogen burns in oxygen to form water. This is a point of resemblance between hydrogen and',
  right: 'the alkali metals, which burn in oxygen to form oxides', wrong: ['the halogens, which burn readily in oxygen', 'the noble gases, which burn in oxygen to form oxides', 'the alkali metals, which form hydrides when they burn in oxygen'],
  sol: 'Water is the oxide of hydrogen, just as sodium oxide is the oxide of sodium, option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('ar-pos', ar({
  a: 'Hydrogen is placed at the top of group 1 in the periodic table.',
  r: 'A hydrogen atom has one electron in its outer shell, as the atoms of the alkali metals have.',
  key: 'c',
  sol: 'The number of outer electrons is the reason for the group 1 position, so (R) explains (A), option (c).',
  d: 1, c: 'understanding', t: [1],
}));
add('pos-tf', tf({
  stem: 'Hydrogen is a metal because it is placed in group 1.',
  key: 'f',
  sol: 'False. Hydrogen is a non-metal gas; its group 1 position is due to its single outer electron.',
  d: 1, c: 'understanding', t: [1],
}));
add('pos-fill', fill({
  stem: 'In sodium hydride, hydrogen is present as the negatively charged ___ ion.',
  acc: [['hydride']],
  sol: 'The negative ion of hydrogen is the **hydride** ion.',
  d: 1, c: 'recall', t: [1],
}));
add('pos-term1', term({
  stem: 'Write the balanced equation for the burning of hydrogen in oxygen.',
  model: r`$\ce{2H2 + O2 -> 2H2O}$`, sol: 'Two hydrogen molecules combine with one oxygen molecule.', sch: 'Balanced equation',
  d: 1, c: 'application', t: [1],
}));
add('pos-short2', short({
  marks: 2,
  stem: 'State two points of resemblance between hydrogen and the alkali metals.',
  wl: null,
  model: 'Both have **one electron in the outer shell** and both can **lose it to form a positive ion** (also: both burn in oxygen to form an oxide; both are reducing agents).',
  sol: 'One outer electron; positive ion; oxide on burning; reducing action (any two).',
  scheme: [['First point', 1], ['Second point', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('pos-short2b', short({
  marks: 2,
  stem: 'State two ways in which hydrogen differs from the alkali metals.',
  wl: null,
  model: 'Hydrogen is a **non-metal gas** with no metallic lustre, while the alkali metals are soft, shiny metals. Hydrogen does not form a strongly basic hydroxide as the alkali metals do.',
  sol: 'Gas, not a metal; no basic hydroxide.',
  scheme: [['Non-metal gas', 1], ['No strongly basic hydroxide or other valid difference', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('pos-short3', short({
  marks: 3,
  stem: 'Hydrogen can lose its electron or gain one. (a) Name the ion formed when a hydrogen atom loses its electron. (b) Name the ion formed when it gains an electron. (c) Write the formula of one compound that contains the ion named in (b).',
  wl: null,
  model: '**(a)** The **hydrogen ion** (a proton), H⁺.\n\n**(b)** The **hydride ion**, H⁻.\n\n**(c)** **Sodium hydride, NaH** (or calcium hydride, CaH₂).',
  sol: 'Hydrogen ion; hydride ion; NaH or CaH₂.',
  scheme: [['(a) hydrogen ion', 1], ['(b) hydride ion', 1], ['(c) formula', 1]],
  d: 2, c: 'application', t: [1],
}));

// ---------------------------------------------------------------- t02 water and steam
add('w-mcq1', mcq({
  stem: 'Small pieces of calcium are dropped into cold water. Which observation is correct?',
  right: 'The calcium sinks, steady bubbles of gas form and the water turns milky', wrong: ['The calcium floats and melts into a silvery ball', 'The calcium burns on the surface with a lilac flame', 'Nothing happens until the water is heated'],
  sol: 'Calcium is denser than water and reacts steadily; calcium hydroxide, which is sparingly soluble, turns the water milky, option (@K).',
  d: 2, c: 'recall', t: [2],
}));
add('w-mcq2', mcq({
  stem: 'Of the metals sodium, calcium, magnesium and iron, the one that needs steam passed over the red-hot metal to give hydrogen is',
  right: 'iron', wrong: ['sodium', 'calcium', 'magnesium'],
  sol: 'Iron is the least reactive of the four, so it needs the most severe condition, option (@K).',
  d: 1, c: 'understanding', t: [2],
}), () => rank('Fe') > rank('Mg') && rank('Mg') > rank('Ca') && rank('Ca') > rank('Na') || 'series');
add('w-mcq3', mcq({
  stem: 'Steam is passed over strongly heated zinc. The gas formed and the solid left are',
  right: 'hydrogen and zinc oxide, which is yellow when hot', wrong: ['oxygen and zinc oxide, which is yellow when hot', 'hydrogen and zinc hydroxide, which is white', 'hydrogen and unchanged zinc'],
  sol: 'Zinc takes oxygen from steam to give zinc oxide and hydrogen; zinc oxide is yellow when hot, option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('w-mcq4', mcq({
  stem: 'The mixture of gases obtained by passing steam over red-hot coke is called water gas. It contains',
  right: 'carbon monoxide and hydrogen', wrong: ['carbon dioxide and hydrogen', 'carbon monoxide and steam', 'carbon dioxide and oxygen'],
  sol: 'Carbon takes one oxygen atom from steam, giving carbon monoxide and hydrogen, option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('w-mcq5', mcq({
  stem: 'A metal M gives no hydrogen with cold or hot water but gives hydrogen when steam is passed over it while it is strongly heated. M could be',
  right: 'zinc', wrong: ['sodium', 'calcium', 'magnesium'],
  sol: 'Sodium and calcium react with cold water and magnesium with hot water, so only zinc fits, option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('w-mcq6', mcq({
  stem: 'Which equation correctly represents the reaction of potassium with cold water?',
  right: r`$\ce{2K + 2H2O -> 2KOH + H2}$`, wrong: [r`$\ce{K + H2O -> KOH + H2}$`, r`$\ce{2K + H2O -> K2O + H2}$`, r`$\ce{K + 2H2O -> K(OH)2 + H2}$`],
  sol: 'Only option (@K) has equal numbers of K, O and H on both sides, and potassium gives KOH, not K(OH)₂.',
  d: 2, c: 'application', t: [2],
}));
add('ar-steam', ar({
  a: 'Magnesium reacts with hot water but not appreciably with cold water.',
  r: 'Magnesium is more reactive than sodium.',
  key: 'a',
  sol: 'Magnesium needs hot water, which is true; but sodium is more reactive than magnesium, so (R) is false, option (a).',
  d: 2, c: 'understanding', t: [2],
}), () => rank('Na') < rank('Mg') || 'series');
add('w-tf', tf({
  stem: 'Magnesium reacts vigorously with cold water and gives hydrogen.',
  key: 'f',
  sol: 'False. Magnesium reacts only slowly with hot water; with steam it burns brightly.',
  d: 1, c: 'recall', t: [2],
}));
add('w-fill', fill({
  stem: 'The reaction of iron with steam is ___ and the oxide formed is ___ .',
  marks: 2,
  acc: [['reversible'], ['triiron tetroxide', 'Fe3O4', 'Fe₃O₄', 'iron(II,III) oxide', 'magnetic oxide of iron']],
  sol: 'The reaction is **reversible** and the oxide is **triiron tetroxide**, Fe₃O₄.',
  d: 2, c: 'recall', t: [2],
}));
add('w-term1', term({
  stem: 'Write the balanced equation for the action of steam on heated aluminium.',
  model: r`$\ce{2Al + 3H2O -> Al2O3 + 3H2}$`, sol: 'Two aluminium atoms need three oxygen atoms for one Al₂O₃.', sch: 'Balanced equation',
  d: 2, c: 'application', t: [2],
}));
add('w-term2', term({
  stem: 'Write the balanced equation for the reaction of calcium with cold water.',
  model: r`$\ce{Ca + 2H2O -> Ca(OH)2 + H2}$`, sol: 'Calcium hydroxide needs two hydroxide groups, so two water molecules.', sch: 'Balanced equation',
  d: 2, c: 'application', t: [2],
}));
add('w-num', num({
  stem: `Steam reacts with excess red-hot iron: $\\ce{3Fe + 4H2O <=> Fe3O4 + 4H2}$. How many atoms of iron are used up when ${STEAM20} molecules of steam react?`,
  value: FE_FOR_20, tol: 0, unit: 'atoms',
  sol: `Three iron atoms react with four steam molecules, so ${STEAM20} × 3 ÷ 4 = ${FE_FOR_20} atoms.`,
  scheme: [['Ratio 3 : 4', 0.5], [`${FE_FOR_20} atoms`, 0.5]],
  d: 2, c: 'application', t: [2],
}), () => eq((STEAM20 * 3) / 4, FE_FOR_20, 'iron atoms') === 15);
add('w-short2a', short({
  marks: 2,
  stem: 'A small piece of sodium is dropped into a trough of cold water. State two observations.',
  wl: null,
  model: 'The sodium **floats** and **melts into a silvery ball**, which **darts about on the water with a hissing sound**. (Any two; the solution also turns red litmus blue.)',
  sol: 'Floats, melts to a ball, darts about, hisses.',
  scheme: [['First observation', 1], ['Second observation', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('w-short2b', short({
  marks: 2,
  stem: 'Explain why the action of steam on red-hot iron is said to be reversible, and why steam is passed continuously.',
  wl: null,
  model: 'Hydrogen formed can **reduce the iron oxide back to iron** and steam, so the reaction can go both ways. Passing steam continuously **sweeps the hydrogen away**, so the change goes forward.',
  sol: 'Hydrogen reduces the oxide back; a steady flow of steam removes the hydrogen.',
  scheme: [['Reverse reaction', 1], ['Hydrogen removed by the flow of steam', 1]],
  d: 3, c: 'analysis', t: [2],
}));
add('w-short3', short({
  marks: 3,
  stem: 'Write balanced equations for the action of (a) hot water on magnesium, (b) steam on heated zinc, (c) steam on red-hot carbon.',
  wl: null,
  model: r`**(a)** $\ce{Mg + 2H2O -> Mg(OH)2 + H2}$` + '\n\n' + r`**(b)** $\ce{Zn + H2O -> ZnO + H2}$` + '\n\n' + r`**(c)** $\ce{C + H2O -> CO + H2}$`,
  sol: 'Mg(OH)₂ with H₂; ZnO with H₂; CO with H₂.',
  scheme: [['(a) balanced', 1], ['(b) balanced', 1], ['(c) balanced', 1]],
  d: 2, c: 'application', t: [2],
}));

// ---------------------------------------------------------------- t03 dilute acids and alkalis
add('a-mcq1', mcq({
  stem: 'Which pair of substances does not produce hydrogen?',
  right: 'copper and dilute sulphuric acid', wrong: ['zinc and dilute hydrochloric acid', 'iron and dilute sulphuric acid', 'magnesium and dilute hydrochloric acid'],
  sol: 'Copper lies below hydrogen in the activity series and cannot displace it, option (@K).',
  d: 1, c: 'recall', t: [3],
}), () => !givesH2WithAcid('Cu') && givesH2WithAcid('Zn') && givesH2WithAcid('Fe') && givesH2WithAcid('Mg') || 'series');
add('a-mcq2', mcq({
  stem: 'Aluminium foil is warmed with concentrated sodium hydroxide solution. The gas given off and the salt formed are',
  right: 'hydrogen and sodium aluminate', wrong: ['hydrogen and aluminium hydroxide', 'oxygen and sodium aluminate', 'hydrogen and aluminium oxide'],
  sol: 'Aluminium gives hydrogen and the salt sodium aluminate, with the metal in the negative ion, option (@K).',
  d: 2, c: 'recall', t: [3],
}));
add('a-mcq3', mcq({
  stem: 'Which equation correctly describes the reaction of iron with dilute hydrochloric acid?',
  right: r`$\ce{Fe + 2HCl -> FeCl2 + H2}$`, wrong: [r`$\ce{2Fe + 6HCl -> 2FeCl3 + 3H2}$`, r`$\ce{Fe + HCl -> FeCl + H2}$`, r`$\ce{Fe + 2HCl -> FeCl2 + 2H}$`],
  sol: 'Iron forms iron(II) chloride and hydrogen is released as molecules, option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('a-mcq4', mcq({
  stem: 'Iron nails are dropped into dilute nitric acid, but no hydrogen can be collected. This is because nitric acid',
  right: 'oxidises the hydrogen to water and is itself reduced to oxides of nitrogen', wrong: ['is too weak an acid to displace hydrogen from iron', 'raises iron above hydrogen in the activity series', 'dissolves the hydrogen as soon as it forms'],
  sol: 'Nitric acid is an oxidising agent, so the hydrogen does not escape, option (@K).',
  d: 3, c: 'analysis', t: [3],
}));
add('a-mcq5', mcq({
  stem: 'Which metal gives hydrogen with dilute hydrochloric acid and also with hot concentrated sodium hydroxide solution?',
  right: 'zinc', wrong: ['magnesium', 'iron', 'copper'],
  sol: 'Magnesium and iron do not react with the alkali, and copper does not react with either; zinc does with both, option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('ar-acid', ar({
  a: 'Zinc gives hydrogen when it is dropped into dilute nitric acid.',
  r: 'Dilute nitric acid is an oxidising agent.',
  key: 'b',
  sol: 'Because nitric acid is an oxidising agent the hydrogen is oxidised to water, so (A) is false and (R) is true, option (b).',
  d: 2, c: 'analysis', t: [3],
}));
add('a-tf', tf({
  stem: 'Zinc reacts with potassium hydroxide solution to give potassium zincate and hydrogen.',
  key: 't',
  sol: 'True: Zn + 2KOH → K₂ZnO₂ + H₂.',
  d: 1, c: 'understanding', t: [3],
}));
add('a-term1', term({
  stem: 'Write the balanced equation for the action of hot concentrated potassium hydroxide solution on lead.',
  model: r`$\ce{Pb + 2KOH -> K2PbO2 + H2}$`, sol: 'Lead gives potassium plumbite and hydrogen.', sch: 'Balanced equation',
  d: 2, c: 'application', t: [3],
}));
add('a-term2', term({
  stem: 'Name the salt formed when zinc reacts with sodium hydroxide solution.',
  model: '**Sodium zincate.**', sol: 'The zinc is in the negative ion, so the salt is sodium zincate.', sch: 'Correct name',
  d: 1, c: 'recall', t: [3],
}));
add('a-term3', term({
  stem: 'Write the balanced equation for magnesium with dilute sulphuric acid.',
  model: r`$\ce{Mg + H2SO4 -> MgSO4 + H2}$`, sol: 'Magnesium sulphate and hydrogen.', sch: 'Balanced equation',
  d: 1, c: 'application', t: [3],
}));
add('a-num', num({
  stem: `Excess aluminium is added to dilute hydrochloric acid: $\\ce{2Al + 6HCl -> 2AlCl3 + 3H2}$. How many molecules of hydrogen are formed from ${18} molecules of hydrogen chloride?`,
  value: H2_FROM_18HCL, tol: 0, unit: 'molecules',
  sol: `Six HCl give three H₂, so 18 × 3 ÷ 6 = ${H2_FROM_18HCL} molecules.`,
  scheme: [['Ratio 6 : 3', 0.5], [`${H2_FROM_18HCL} molecules`, 0.5]],
  d: 2, c: 'application', t: [3],
}), () => eq((18 * 3) / 6, H2_FROM_18HCL, 'h2') === 9);
add('a-num2', num({
  stem: `Aluminium reacts with sodium hydroxide solution: $\\ce{2Al + 2NaOH + 2H2O -> 2NaAlO2 + 3H2}$. How many molecules of hydrogen are formed from ${12} atoms of aluminium?`,
  value: H2_FROM_12AL, tol: 0, unit: 'molecules',
  sol: `Two Al give three H₂, so 12 × 3 ÷ 2 = ${H2_FROM_12AL} molecules.`,
  scheme: [['Ratio 2 : 3', 0.5], [`${H2_FROM_12AL} molecules`, 0.5]],
  d: 2, c: 'application', t: [3],
}), () => eq((12 * 3) / 2, H2_FROM_12AL, 'h2') === 18);
add('a-short2a', short({
  marks: 2,
  stem: 'Iron filings are added to dilute hydrochloric acid. Name the two products and state one observation.',
  wl: null,
  model: '**Iron(II) chloride** and **hydrogen** are formed. Bubbles of a colourless gas appear and the solution slowly turns **pale green**.',
  sol: 'Iron(II) chloride and hydrogen; bubbles or a pale green solution.',
  scheme: [['Both products named', 1], ['One observation', 1]],
  d: 2, c: 'application', t: [3],
}));
add('a-short2b', short({
  marks: 2,
  stem: 'Explain why copper does not give hydrogen when it is added to dilute hydrochloric acid.',
  wl: null,
  model: 'Copper is **below hydrogen in the activity series**, so it is less reactive than hydrogen and **cannot displace it** from the acid.',
  sol: 'Copper lies below hydrogen in the series and cannot displace it.',
  scheme: [['Below hydrogen in the series', 1], ['Cannot displace hydrogen', 1]],
  d: 1, c: 'understanding', t: [3],
}));
add('a-short3', short({
  marks: 3,
  stem: 'Give one reason each why hydrogen is not prepared in the laboratory from (a) sodium and dilute hydrochloric acid, (b) silver and dilute hydrochloric acid, (c) zinc and dilute nitric acid.',
  wl: null,
  model: '**(a)** The reaction is **violent and dangerous** (sodium also reacts with the water).\n\n**(b)** Silver is **below hydrogen**, so there is **no reaction**.\n\n**(c)** Nitric acid is an **oxidising agent**; it oxidises the hydrogen to water and gives oxides of nitrogen.',
  sol: 'Violent; no displacement; oxidising agent.',
  scheme: [['(a) violent', 1], ['(b) below hydrogen', 1], ['(c) oxidising agent', 1]],
  d: 2, c: 'application', t: [3],
}));

// ---------------------------------------------------------------- t04 laboratory preparation
add('l-mcq1', mcq({
  stem: 'Granulated zinc, and not zinc powder, is used to prepare hydrogen in the laboratory because granules',
  right: 'react at a moderate, controllable rate', wrong: ['do not react with dilute acids', 'give a larger volume of hydrogen for the same mass', 'become coated with zinc sulphate that stops the reaction'],
  sol: 'Powder has a large surface and reacts too quickly; granules give a steady stream, option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('l-mcq2', mcq({
  stem: 'Hydrogen can be collected over water because it is',
  right: 'almost insoluble in water', wrong: ['lighter than air', 'slightly soluble and forms an acid with water', 'a gas that dissolves to give an alkaline solution'],
  sol: 'Only a gas that hardly dissolves can be collected over water; being lighter than air is a different property, option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('l-mcq3', mcq({
  stem: 'A student lights the first test tube of gas collected in the preparation of hydrogen, and it burns with a loud explosion. The most likely reason is that',
  right: 'the tube contained a mixture of hydrogen and the air that was in the flask', wrong: ['the gas was pure hydrogen', 'the acid was too dilute', 'zinc sulphate had formed in the tube'],
  sol: 'Hydrogen mixed with air explodes; the air in the flask is expelled first, option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('l-mcq4', mcq({
  stem: 'Which of the following is not a precaution in the laboratory preparation of hydrogen?',
  right: 'Heating the flask strongly to speed up the reaction', wrong: ['Making sure all the joints are airtight', 'Keeping all flames away from the apparatus', 'Making the lower end of the thistle funnel dip below the acid'],
  sol: 'Zinc and dilute acid react well at room temperature; strong heating is not needed and is unsafe, option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('l-tf', tf({
  stem: 'Hydrogen collected over water from zinc and dilute acid is completely dry.',
  key: 'f',
  sol: 'False. The gas is in contact with water in the jar, so it is moist.',
  d: 1, c: 'understanding', t: [4],
}));
add('l-fill', fill({
  stem: 'In the laboratory, hydrogen is collected by the downward ___ of ___ .',
  marks: 2,
  acc: [['displacement'], ['water']],
  sol: 'By the downward **displacement** of **water**.',
  d: 1, c: 'recall', t: [4],
}));
add('l-term1', term({
  stem: 'Write the balanced equation for the preparation of hydrogen from zinc and dilute hydrochloric acid.',
  model: r`$\ce{Zn + 2HCl -> ZnCl2 + H2}$`, sol: 'Zinc chloride and hydrogen.', sch: 'Balanced equation',
  d: 1, c: 'application', t: [4],
}));
add('l-term2', term({
  stem: 'Name one substance used to dry hydrogen.',
  model: '**Anhydrous calcium chloride** (or concentrated sulphuric acid).', sol: 'Any drying agent that does not react with hydrogen.', sch: 'Correct name',
  d: 1, c: 'recall', t: [4],
}));
add('l-short2a', short({
  marks: 2,
  stem: 'Why is zinc chosen in preference to magnesium and to iron for the laboratory preparation of hydrogen?',
  wl: null,
  model: '**Magnesium reacts too fast** to control, and **iron reacts too slowly**; zinc reacts at a **moderate, steady rate**.',
  sol: 'Magnesium too fast, iron too slow, zinc moderate.',
  scheme: [['Magnesium too fast and iron too slow', 1], ['Zinc moderate rate', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('l-short2b', short({
  marks: 2,
  stem: 'State two precautions to be taken when hydrogen is prepared in the laboratory, with a reason for each.',
  wl: null,
  model: 'Keep **flames away**, because hydrogen mixed with air explodes. Reject the **first jar of gas**, because it contains air from the flask. (Also: airtight joints so that gas does not leak.)',
  sol: 'Flames away because of explosion; first jar rejected because of air.',
  scheme: [['First precaution with reason', 1], ['Second precaution with reason', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('l-short3', short({
  marks: 3,
  stem: 'In the preparation of hydrogen, give a reason for (a) the lower end of the thistle funnel dipping below the acid, (b) using dilute and not concentrated acid, (c) adding a few drops of copper(II) sulphate solution to pure zinc.',
  wl: null,
  model: '**(a)** The acid seals the funnel, so the **gas cannot escape** through it.\n\n**(b)** Concentrated acid gives **other gases** and the reaction is hard to control (dilute acid gives a steady stream of hydrogen).\n\n**(c)** Zinc becomes coated with copper, which **makes the reaction faster**.',
  sol: 'Liquid seal; other gases from concentrated acid; copper speeds the reaction.',
  scheme: [['(a) seal', 1], ['(b) concentrated acid gives other gases', 1], ['(c) faster reaction', 1]],
  d: 2, c: 'understanding', t: [4],
}));

// ---------------------------------------------------------------- t05 Bosch process
add('b-mcq1', mcq({
  stem: 'In the Bosch process water gas is mixed with steam and passed over a catalyst at a temperature of about',
  right: '450 °C', wrong: ['25 °C', '100 °C', '1500 °C'],
  sol: 'The catalyst chamber is kept at about 450 °C, option (@K).',
  d: 1, c: 'recall', t: [5],
}));
add('b-mcq2', mcq({
  stem: 'The gas mixture that leaves the catalyst chamber of the Bosch process mainly contains',
  right: 'hydrogen and carbon dioxide, with a little carbon monoxide', wrong: ['carbon monoxide and carbon dioxide, with a little hydrogen', 'hydrogen and oxygen only', 'water gas only'],
  sol: 'Carbon monoxide has been changed to carbon dioxide and extra hydrogen; a little remains unchanged, option (@K).',
  d: 2, c: 'understanding', t: [5],
}));
add('b-mcq3', mcq({
  stem: 'In the Bosch process ammoniacal cuprous chloride solution is used to remove',
  right: 'carbon monoxide', wrong: ['carbon dioxide', 'steam', 'hydrogen'],
  sol: 'The last traces of carbon monoxide are absorbed by this solution, option (@K).',
  d: 1, c: 'recall', t: [5],
}));
add('b-mcq4', mcq({
  stem: 'Potassium hydroxide solution can be used to purify the gas from the catalyst chamber because it',
  right: 'absorbs carbon dioxide and forms potassium carbonate', wrong: ['absorbs carbon monoxide and forms potassium carbonate', 'absorbs hydrogen and forms a hydride', 'reacts with steam to form potassium carbonate'],
  sol: 'Carbon dioxide is an acidic oxide, so it reacts with the alkali: CO₂ + 2KOH → K₂CO₃ + H₂O, option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('ar-bosch', ar({
  a: 'The second stage of the Bosch process gives more hydrogen.',
  r: 'Carbon dioxide is more soluble in water at high pressure.',
  key: 'd',
  sol: 'Carbon monoxide reacts with steam to give extra hydrogen, so (A) is true. (R) is also true, but it describes the removal of carbon dioxide and does not explain (A), option (d).',
  d: 3, c: 'analysis', t: [5],
}));
add('b-fill', fill({
  stem: 'In the Bosch process chromium(III) oxide is added to iron(III) oxide as a ___ .',
  acc: [['promoter']],
  sol: 'Chromium(III) oxide acts as a **promoter**.',
  d: 1, c: 'recall', t: [5],
}));
add('b-term1', term({
  stem: 'Write the balanced equation for the reaction of carbon monoxide with steam in the second stage of the Bosch process.',
  model: r`$\ce{CO + H2O <=> CO2 + H2}$`, sol: 'Carbon dioxide and more hydrogen.', sch: 'Balanced equation',
  d: 1, c: 'application', t: [5],
}));
add('b-term2', term({
  stem: 'Write the balanced equation for the absorption of carbon dioxide by potassium hydroxide solution.',
  model: r`$\ce{CO2 + 2KOH -> K2CO3 + H2O}$`, sol: 'Potassium carbonate and water.', sch: 'Balanced equation',
  d: 2, c: 'application', t: [5],
}));
add('b-num', num({
  stem: `In a plant, ${C45} carbon atoms in coke react with steam to give water gas, and all the carbon monoxide then reacts with more steam over the catalyst. How many molecules of hydrogen are present in the final gas, before purification?`,
  value: H2_FROM_C45, tol: 0, unit: 'molecules',
  sol: `${C45} C give ${C45} CO and ${C45} H₂; the ${C45} CO give ${C45} more H₂, so ${C45} + ${C45} = ${H2_FROM_C45} molecules.`,
  scheme: [['Both stages counted', 0.5], [`${H2_FROM_C45} molecules`, 0.5]],
  d: 3, c: 'application', t: [5],
}), () => eq(C45 + C45, H2_FROM_C45, 'h2') === 90);
add('b-short2a', short({
  marks: 2,
  stem: 'Name the catalyst and the promoter used in the second stage of the Bosch process, and state the temperature.',
  wl: null,
  model: 'The catalyst is **iron(III) oxide** and the promoter is **chromium(III) oxide**, at about **450 °C**.',
  sol: 'Iron(III) oxide catalyst; chromium(III) oxide promoter; about 450 °C.',
  scheme: [['Catalyst and promoter', 1], ['Temperature', 1]],
  d: 1, c: 'recall', t: [5],
}));
add('b-short2b', short({
  marks: 2,
  stem: 'Carbon dioxide is washed out of the gas mixture with water under pressure and not at ordinary pressure. Give the reason.',
  wl: null,
  model: 'A gas **dissolves more at high pressure**, so **more carbon dioxide is removed** by the same water.',
  sol: 'Solubility rises with pressure, so more is dissolved.',
  scheme: [['More soluble at high pressure', 1], ['More carbon dioxide removed', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('b-short3', short({
  marks: 3,
  stem: 'Water gas is mixed with steam and passed over a heated catalyst. (a) Write the equation for the main reaction. (b) Name the catalyst. (c) State why this step is carried out.',
  wl: null,
  model: r`**(a)** $\ce{CO + H2O <=> CO2 + H2}$` + '\n\n**(b)** **Iron(III) oxide** (with chromium(III) oxide as promoter).\n\n**(c)** It changes the carbon monoxide of the water gas into carbon dioxide and gives **additional hydrogen**.',
  sol: 'CO + H₂O ⇌ CO₂ + H₂; iron(III) oxide; extra hydrogen.',
  scheme: [['(a) balanced equation', 1], ['(b) catalyst', 1], ['(c) extra hydrogen', 1]],
  d: 2, c: 'application', t: [5],
}));

// ---------------------------------------------------------------- match
add('salt-match', match({
  marks: 5,
  stem: 'Match each reaction in Column A with the product in Column B that contains the metal.',
  pairs: [
    ['Zinc with sodium hydroxide solution', 'Sodium zincate'],
    ['Aluminium with sodium hydroxide solution', 'Sodium aluminate'],
    ['Lead with sodium hydroxide solution', 'Sodium plumbite'],
    ['Iron with steam', 'Triiron tetroxide'],
    ['Zinc with dilute hydrochloric acid', 'Zinc chloride'],
  ],
  order: [2, 0, 4, 1, 3],
  sol: 'The three alkali reactions give zincate, aluminate and plumbite; steam gives the oxide Fe₃O₄; the acid gives a chloride.',
  d: 2, c: 'application', t: [2, 3],
}));

// ---------------------------------------------------------------- 10-mark structured questions
add('steam-long', long({
  marks: 10, wl: null,
  stem: 'The diagram shows the apparatus used to pass steam over a heated metal. Its parts are lettered A to E.\n\n(a) Name the parts A, C and D. [3]\n\n(b) Name the gas collected in E and describe a test for it. [2]\n\n(c) Zinc is the metal at C. Write the balanced equation and state the colour of the residue when hot. [3]\n\n(d) Why should the delivery tube be lifted out of the water before the burner under C is removed? [2]',
  model: '**(a)** **A** is **boiling water** (in a flask); **C** is the **heated metal**; **D** is the **burner**.\n\n**(b)** **Hydrogen**; it **burns with a pop** when a flame is brought near the jar.\n\n' + r`**(c)** $\ce{Zn + H2O -> ZnO + H2}$` + '; the zinc oxide is **yellow when hot**.\n\n**(d)** When the tube cools, the **gas contracts and the steam condenses**, so water would be **sucked back** into the hot glass tube and crack it.',
  sol: 'Boiling water, metal, burner; hydrogen with pop test; Zn + H₂O → ZnO + H₂, yellow; suck-back prevented.',
  scheme: [['A boiling water', 1], ['C heated metal', 1], ['D burner', 1], ['Hydrogen', 1], ['Pop test', 1], ['Balanced equation', 2], ['Yellow when hot', 1], ['Suck-back explained', 2]],
  d: 3, c: 'application', t: [2],
  assets: [steamFig],
}));
add('metal-water-long', long({
  marks: 10, wl: null,
  stem: 'Four metals P, Q, R and S are known to be sodium, calcium, magnesium and iron, in some order. P floats and darts about on cold water, melting to a ball. Q sinks in cold water and gives steady bubbles, and the water turns milky. R gives only a few bubbles in hot water but burns brightly in steam. S gives no gas with cold or hot water, but a black solid forms when steam is passed over the red-hot metal.\n\n(a) Identify P, Q, R and S. [2]\n\n(b) Write the balanced equation for the reaction of Q with cold water. [2]\n\n(c) Write the balanced equation for the reaction of S with steam and explain why it is reversible. [3]\n\n(d) Write the balanced equation for R with steam. [2]\n\n(e) Arrange the four metals in decreasing order of reactivity. [1]',
  model: '**(a)** **P** is sodium; **Q** is calcium; **R** is magnesium; **S** is iron.\n\n' + r`**(b)** $\ce{Ca + 2H2O -> Ca(OH)2 + H2}$` + '\n\n' + r`**(c)** $\ce{3Fe + 4H2O <=> Fe3O4 + 4H2}$` + '; hydrogen can **reduce the oxide back** to iron, so the change runs in both directions.\n\n' + r`**(d)** $\ce{Mg + H2O -> MgO + H2}$` + '\n\n**(e)** **P (sodium) > Q (calcium) > R (magnesium) > S (iron).**',
  sol: 'Na, Ca, Mg, Fe; Ca equation; Fe equation with reason; Mg + steam; order.',
  scheme: [['Four identifications', 2], ['Equation for Q', 2], ['Equation for S', 2], ['Reason for reversibility', 1], ['Equation for R', 2], ['Order', 1]],
  d: 3, c: 'application', t: [2],
}), () => ['Na', 'Ca', 'Mg', 'Fe'].every((m, i, a) => i === 0 || rank(a[i - 1]) < rank(m)) || 'order');
add('acid-long', long({
  marks: 10, wl: null,
  stem: 'Equal masses of four metal powders W, X, Y and Z are added to equal volumes of dilute hydrochloric acid, and the time taken for the bubbling to stop is noted.\n\n| Metal | W | X | Y | Z |\n|---|---|---|---|---|\n| Time for bubbling to stop | 1 minute | 5 minutes | 25 minutes | no bubbles |\n\nThe metals are magnesium, zinc, iron and copper, in some order.\n\n(a) Identify W, X, Y and Z. [2]\n\n(b) Write the balanced equation for X with dilute hydrochloric acid. [2]\n\n(c) Write the balanced equation for Y with dilute sulphuric acid and state the colour of the solution. [3]\n\n(d) Why does Z give no gas? [1]\n\n(e) Write the balanced equation for the reaction of aluminium with hot concentrated sodium hydroxide solution. [2]',
  model: '**(a)** **W** is magnesium; **X** is zinc; **Y** is iron; **Z** is copper.\n\n' + r`**(b)** $\ce{Zn + 2HCl -> ZnCl2 + H2}$` + '\n\n' + r`**(c)** $\ce{Fe + H2SO4 -> FeSO4 + H2}$` + '; the solution is **pale green**.\n\n**(d)** Copper is **below hydrogen** in the activity series, so it cannot displace hydrogen.\n\n' + r`**(e)** $\ce{2Al + 2NaOH + 2H2O -> 2NaAlO2 + 3H2}$`,
  sol: 'Mg, Zn, Fe, Cu; Zn + 2HCl; Fe + H₂SO₄ with pale green; copper below hydrogen; Al with NaOH.',
  scheme: [['Four identifications', 2], ['Equation for X', 2], ['Equation for Y', 2], ['Pale green', 1], ['Copper below hydrogen', 1], ['Aluminium equation', 2]],
  d: 3, c: 'application', t: [3],
}));
add('alkali-long', long({
  marks: 10, wl: null,
  stem: 'Strips of zinc, aluminium and lead are each warmed with concentrated sodium hydroxide solution. In every case a colourless gas is given off that burns with a pop.\n\n(a) Name the gas and the salt formed in the case of zinc. [2]\n\n(b) Write the balanced equation for the reaction of zinc. [2]\n\n(c) Write the balanced equation for the reaction of aluminium. [3]\n\n(d) Write the balanced equation for lead with potassium hydroxide solution and name the salt. [2]\n\n(e) Write the formula of the salt formed when zinc reacts with potassium hydroxide solution. [1]',
  model: '**(a)** The gas is **hydrogen**; the salt is **sodium zincate**.\n\n' + r`**(b)** $\ce{Zn + 2NaOH -> Na2ZnO2 + H2}$` + '\n\n' + r`**(c)** $\ce{2Al + 2NaOH + 2H2O -> 2NaAlO2 + 3H2}$` + '\n\n' + r`**(d)** $\ce{Pb + 2KOH -> K2PbO2 + H2}$` + '; the salt is **potassium plumbite**.\n\n**(e)** **K₂ZnO₂** (potassium zincate).',
  sol: 'Hydrogen and sodium zincate; three balanced equations; K₂ZnO₂.',
  scheme: [['Hydrogen', 1], ['Sodium zincate', 1], ['Zinc equation', 2], ['Aluminium equation', 3], ['Lead equation', 1.5], ['Potassium plumbite', 0.5], ['Formula K₂ZnO₂', 1]],
  d: 3, c: 'application', t: [3],
}));
add('lab-long', long({
  marks: 10, wl: null,
  stem: 'The diagram shows the apparatus used to prepare hydrogen in the laboratory. Its parts are lettered A to E.\n\n(a) Name the parts A, C and E. [3]\n\n(b) Write the balanced equation for the reaction when dilute sulphuric acid is used. [2]\n\n(c) Why must the lower end of A dip below the surface of B? [1]\n\n(d) Name the method of collection of the gas and give two reasons why it is suitable. [2]\n\n(e) State the test for hydrogen. [1]\n\n(f) Name one metal that is too reactive and one that is too slow for this preparation. [1]',
  model: '**(a)** **A** is the **thistle funnel**; **C** is the **zinc granules**; **E** is the **gas jar** (full of hydrogen over water).\n\n' + r`**(b)** $\ce{Zn + H2SO4 -> ZnSO4 + H2}$` + '\n\n**(c)** So that the acid seals the funnel and the **gas cannot escape** through it.\n\n**(d)** **Downward displacement of water.** Hydrogen is **almost insoluble in water**, and you can **see when the jar is full** (and the gas is not mixed with air).\n\n**(e)** It **burns with a pop** when a flame is brought near.\n\n**(f)** Too reactive: **sodium** (or potassium or calcium); too slow: **iron** (or lead).',
  sol: 'Thistle funnel, zinc, gas jar; Zn + H₂SO₄ equation; liquid seal; displacement of water; pop; sodium and iron.',
  scheme: [['A thistle funnel', 1], ['C zinc granules', 1], ['E gas jar', 1], ['Balanced equation', 2], ['Seal', 1], ['Method named', 1], ['Reason for the method', 1], ['Pop test', 1], ['Metals named', 1]],
  d: 3, c: 'application', t: [4],
  assets: [labFig],
}));
add('bosch-long', long({
  marks: 10, wl: null,
  stem: `In a hydrogen plant, ${C_ATOMS} carbon atoms of red-hot coke react with steam to give water gas. The water gas is then mixed with more steam and passed over a heated catalyst, where 80 percent of the carbon monoxide reacts.\n\n(a) Write the equation for the first stage and name the mixture formed. [2]\n\n(b) Write the equation for the catalyst stage and name the catalyst and the temperature. [3]\n\n(c) Calculate the number of hydrogen molecules in the gas that leaves the catalyst chamber, and the number of carbon monoxide molecules left. [3]\n\n(d) Give two ways of removing the carbon dioxide formed. [1]\n\n(e) Name the substance used to remove the carbon monoxide that is left. [1]`,
  model: r`**(a)** $\ce{C + H2O -> CO + H2}$` + '; the mixture is **water gas**.\n\n' + r`**(b)** $\ce{CO + H2O <=> CO2 + H2}$` + '; the catalyst is **iron(III) oxide** (promoter chromium(III) oxide) at about **450 °C**.\n\n' + `**(c)** Stage 1 gives ${C_ATOMS} CO and ${C_ATOMS} H₂. In stage 2, 80% of ${C_ATOMS} = ${CO_CHANGED} CO react, giving ${CO_CHANGED} more H₂. Hydrogen = ${C_ATOMS} + ${CO_CHANGED} = **${H2_PARTIAL}** molecules; CO left = ${C_ATOMS} − ${CO_CHANGED} = **${CO_LEFT}** molecules.\n\n**(d)** Wash with **water under pressure**, or with **potassium hydroxide solution**.\n\n**(e)** **Ammoniacal cuprous chloride.**`,
  sol: 'C + H₂O → CO + H₂, water gas; CO + H₂O ⇌ CO₂ + H₂ with Fe₂O₃ at 450 °C; 54 and 6; water under pressure or KOH; ammoniacal cuprous chloride.',
  scheme: [['Equation stage 1', 1], ['Water gas', 1], ['Equation stage 2', 1], ['Catalyst', 1], ['Temperature', 1], ['Number of CO reacting', 1], ['Hydrogen molecules', 1], ['Carbon monoxide left', 1], ['Removal of carbon dioxide', 1], ['Removal of carbon monoxide', 1]],
  d: 4, c: 'analysis', t: [5],
}), () => eq([CO_CHANGED, H2_PARTIAL, CO_LEFT], [24, 54, 6], 'bosch counts') && true);
void H2_AFTER_SHIFT;
void H2_FROM_FE_12;
