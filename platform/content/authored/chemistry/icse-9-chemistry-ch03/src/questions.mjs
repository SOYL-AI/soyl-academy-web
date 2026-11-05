// ICSE 9 Chemistry ch03 Chemical Changes and Reactions — question bank in ICSE school-examination style
// (balanced equations, observations, identification, predictions, 10-mark structured questions in parts).
// AR keys use the ICSE option order: a = A true R false, b = A false R true, c = both true and R explains, d = both true and R does not explain.
import { mk, add, svgV, r } from '../../icse-9-chemistry-ch01/src/lib.mjs';
import { displaces, TEMPS, H2_VOL_30, eq } from './calc.mjs';
import { ELECTROLYSIS_LETTERED, PPT_LETTERED } from './svgs.mjs';

const { mcq, ar, tf, fill, num, short, long, match } = mk;
const elecFig = svgV(ELECTROLYSIS_LETTERED, 'Apparatus for the electrolysis of acidified water with five parts lettered A to E');
const pptFig = svgV(PPT_LETTERED, 'Three test tubes A, B and C, each holding a precipitate formed on mixing two solutions');
const term = (o) => short({ marks: 1, wl: null, scheme: [[o.sch ?? 'Correct answer', 1]], ...o });

// ---------------------------------------------------------------- deck-check items (not used in tests)
add('chk-comb', mcq({
  stem: 'Zinc powder is heated with sulphur and forms zinc sulphide. This is a',
  right: 'direct combination reaction', wrong: ['decomposition reaction', 'displacement reaction', 'double decomposition reaction'],
  sol: 'Two elements unite to form one product, option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
add('chk-electro', mcq({
  stem: 'In the electrolysis of acidified water, the gas collected in the larger volume is',
  right: 'hydrogen, at the cathode', wrong: ['hydrogen, at the anode', 'oxygen, at the cathode', 'oxygen, at the anode'],
  sol: 'Hydrogen is twice the volume of oxygen and is collected at the cathode, option (@K).',
  d: 2, c: 'recall', t: [2],
}));
add('chk-thermal', mcq({
  stem: 'Zinc carbonate is heated strongly in a dry test tube. The correct statement is',
  right: 'Zinc oxide is left, yellow when hot and white when cold', wrong: ['Zinc is left as a silvery bead', 'Brown fumes are given off', 'Copper(II) oxide, a black solid, is left'],
  sol: 'Zinc carbonate gives zinc oxide, which is yellow when hot and white when cold, with carbon dioxide, option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('chk-displace', mcq({
  stem: 'A strip of magnesium is placed in iron(II) sulphate solution. The pale green colour fades because',
  right: 'magnesium displaces iron from the solution', wrong: ['iron displaces magnesium from the solution', 'magnesium and iron do not react', 'iron sulphate loses water'],
  sol: 'Magnesium is more reactive than iron, so it displaces iron, option (@K).',
  d: 2, c: 'application', t: [3],
}), () => displaces('Mg', 'Fe') || 'mgfe');
add('chk-ppt', mcq({
  stem: 'Lead nitrate solution is added to potassium iodide solution. A',
  right: 'yellow precipitate forms', wrong: ['white precipitate forms', 'white curdy precipitate forms', 'brown gas is given off'],
  sol: 'Lead iodide is a yellow precipitate, option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('chk-dd', mcq({
  stem: r`In $\ce{Na2SO4 + BaCl2 -> BaSO4 + 2NaCl}$ the number 2 in front of NaCl is needed because`,
  right: 'there are two chlorine atoms in BaCl₂', wrong: ['sodium sulphate has two oxygen atoms', 'barium sulphate is a precipitate', 'sodium has a valency of 2'],
  sol: 'Two chloride ions on the left need two NaCl on the right, option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('chk-energy', mcq({
  stem: 'Plants make glucose from carbon dioxide and water using sunlight. Photosynthesis is',
  right: 'endothermic, because it takes in light energy', wrong: ['exothermic, because it gives out light energy', 'exothermic, because it gives out heat', 'neither, because no heat is involved'],
  sol: 'Energy is absorbed from sunlight, so the reaction is endothermic, option (@K).',
  d: 2, c: 'understanding', t: [5],
}));

// ---------------------------------------------------------------- t01 direct combination
add('comb-mcq1', mcq({
  stem: 'Which of these is a direct combination reaction?',
  right: r`$\ce{2Na + Cl2 -> 2NaCl}$`, wrong: [r`$\ce{CaCO3 -> CaO + CO2}$`, r`$\ce{Zn + CuSO4 -> ZnSO4 + Cu}$`, r`$\ce{AgNO3 + NaCl -> AgCl + NaNO3}$`],
  sol: 'Two elements unite to form a single product in sodium with chlorine, option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('comb-mcq2', mcq({
  stem: 'A mixture of iron filings and sulphur powder is drawn to a magnet, but the black solid left after the mixture is strongly heated is not. The best explanation is that',
  right: 'a new substance, iron(II) sulphide, has formed', wrong: ['the sulphur has evaporated', 'the iron has lost its magnetism by heating', 'the mixture has become a solution'],
  sol: 'Iron and sulphur have combined chemically, and the compound does not show the magnetic property of iron, option (@K).',
  d: 3, c: 'analysis', t: [1],
}));
add('comb-mcq3', mcq({
  stem: 'A strip of magnesium burns in air with a dazzling white flame. The white powder left is',
  right: 'magnesium oxide', wrong: ['magnesium carbonate', 'magnesium hydroxide', 'magnesium chloride'],
  sol: 'Magnesium combines with the oxygen of the air to form magnesium oxide, option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('comb-mcq4', mcq({
  stem: 'Glass rods dipped in concentrated ammonia and in concentrated hydrochloric acid are brought close together. Dense white fumes appear. The fumes are',
  right: 'ammonium chloride', wrong: ['ammonium nitrate', 'hydrogen chloride', 'ammonium sulphate'],
  sol: 'Ammonia and hydrogen chloride gases combine directly to form solid ammonium chloride, option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('ar-comb', ar({
  a: 'A mixture of iron and sulphur can be separated with a magnet, but iron(II) sulphide cannot.',
  r: 'In iron(II) sulphide the iron and sulphur are chemically combined.',
  key: 'c',
  sol: 'Chemical combination gives a new substance with its own properties, which explains why the magnet cannot separate it, option (c).',
  d: 2, c: 'analysis', t: [1],
}));
add('comb-tf', tf({
  stem: 'Only elements can take part in a direct combination reaction.',
  key: 'f',
  sol: 'False. Compounds can combine too, for example quicklime with water.',
  d: 2, c: 'understanding', t: [1],
}));
add('comb-fill', fill({
  stem: 'A reaction in which two or more substances unite to form a single product is called a direct ___ reaction.',
  acc: [['combination', 'union']],
  sol: 'A direct **combination** reaction.',
  d: 1, c: 'recall', t: [1],
}));
add('comb-term', term({
  stem: 'Write the balanced equation for the direct combination of ammonia and hydrogen chloride.',
  model: r`$\ce{NH3 + HCl -> NH4Cl}$`, sol: 'One ammonia molecule and one hydrogen chloride give one ammonium chloride.', sch: 'Balanced equation',
  d: 1, c: 'application', t: [1],
}));
add('comb-short2', short({
  marks: 2,
  stem: 'State two differences between a mixture of iron filings and sulphur powder and the compound iron(II) sulphide.',
  wl: null,
  model: 'The **mixture is attracted by a magnet** but the compound is **not**. In the mixture the iron and sulphur keep their own properties, while the compound is **a new black substance** with different properties (and the components can be separated only in the mixture by simple means).',
  sol: 'Magnet attracts the mixture only; compound has new properties.',
  scheme: [['Magnet test', 1], ['New substance with new properties', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('comb-short2b', short({
  marks: 2,
  stem: 'State two observations when a strip of magnesium is burnt in air, and name the product.',
  wl: null,
  model: 'The ribbon burns with a **dazzling white flame** and leaves a **white ash**, which is **magnesium oxide**.',
  sol: 'Dazzling white flame; white ash of magnesium oxide.',
  scheme: [['Dazzling white flame', 1], ['White ash named as magnesium oxide', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('comb-short3', short({
  marks: 3,
  stem: 'Write balanced equations for the direct combination of (a) carbon with oxygen, (b) nitrogen with oxygen in an electric spark, and (c) hydrogen with chlorine.',
  wl: null,
  model: r`**(a)** $\ce{C + O2 -> CO2}$` + '\n\n' + r`**(b)** $\ce{N2 + O2 -> 2NO}$` + '\n\n' + r`**(c)** $\ce{H2 + Cl2 -> 2HCl}$`,
  sol: 'CO₂; 2NO; 2HCl.',
  scheme: [['(a) balanced', 1], ['(b) balanced', 1], ['(c) balanced', 1]],
  d: 2, c: 'application', t: [1],
}));

// ---------------------------------------------------------------- t02 decomposition
add('dec-mcq1', mcq({
  stem: 'A green powder turns black when heated strongly, and the gas given off turns lime water milky. The powder is',
  right: 'copper(II) carbonate', wrong: ['zinc carbonate', 'copper(II) sulphate crystals', 'calcium carbonate'],
  sol: 'Green copper(II) carbonate gives black copper(II) oxide and carbon dioxide, option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('dec-mcq2', mcq({
  stem: 'A white solid gives off brown fumes on heating and leaves a residue that is yellow when hot and white when cold. The solid is',
  right: 'zinc nitrate', wrong: ['zinc carbonate', 'calcium carbonate', 'potassium chlorate'],
  sol: 'Brown fumes show nitrogen dioxide from a nitrate, and a residue that is yellow hot and white cold is zinc oxide, option (@K).',
  d: 3, c: 'analysis', t: [2],
}));
add('dec-mcq3', mcq({
  stem: 'Silver chloride is stored in a dark bottle because it',
  right: 'decomposes in light', wrong: ['reacts with air', 'melts easily', 'dissolves in the glass'],
  sol: 'Light splits silver chloride into silver and chlorine, so it is kept in the dark, option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('dec-mcq4', mcq({
  stem: `In an experiment on the electrolysis of acidified water, ${H2_VOL_30} cm³ of hydrogen is collected. The volume of oxygen collected at the same time is`,
  right: `${H2_VOL_30 / 2} cm³`, wrong: ['30 cm³', '60 cm³', '10 cm³'],
  sol: `The volumes are in the ratio 2 : 1, so oxygen is ${H2_VOL_30} ÷ 2 = ${H2_VOL_30 / 2} cm³, option (@K).`,
  d: 2, c: 'application', t: [2],
}));
add('dec-mcq5', mcq({
  stem: 'During the electrolysis of acidified water a gas collected over one electrode burns with a small pop when a lighted splint is brought near. It was collected over the',
  right: 'cathode', wrong: ['anode', 'both electrodes', 'neither electrode'],
  sol: 'Hydrogen burns with a pop and is collected at the cathode, option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('dec-mcq6', mcq({
  stem: 'Molten lead(II) bromide is electrolysed. The substance formed at the cathode is',
  right: 'lead', wrong: ['bromine', 'oxygen', 'hydrogen'],
  sol: 'The positive lead ions gain electrons at the cathode and form lead, option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('ar-dec', ar({
  a: 'Calcium carbonate decomposes on strong heating.',
  r: 'Calcium oxide and water are the products of its decomposition.',
  key: 'a',
  sol: 'The products are calcium oxide and carbon dioxide, not water; (A) is true and (R) is false, option (a).',
  d: 2, c: 'analysis', t: [2],
}));
add('dec-tf', tf({
  stem: 'The electrolysis of acidified water gives hydrogen and oxygen in equal volumes.',
  key: 'f',
  sol: 'False. Hydrogen is formed in twice the volume of oxygen.',
  d: 1, c: 'recall', t: [2],
}));
add('dec-fill', fill({
  stem: 'The decomposition of a compound by passing an electric current through it is called ___.',
  acc: [['electrolysis', 'electrolytic decomposition']],
  sol: '**Electrolysis**.',
  d: 1, c: 'recall', t: [2],
}));
add('dec-term1', term({
  stem: 'Write the balanced equation for the thermal decomposition of calcium carbonate.',
  model: r`$\ce{CaCO3 ->[\Delta] CaO + CO2}$`, sol: 'Calcium oxide and carbon dioxide.', sch: 'Balanced equation',
  d: 1, c: 'application', t: [2],
}));
add('dec-term2', term({
  stem: 'Write the balanced equation for the decomposition of silver bromide in sunlight.',
  model: r`$\ce{2AgBr ->[light] 2Ag + Br2}$`, sol: 'Silver and bromine.', sch: 'Balanced equation',
  d: 2, c: 'application', t: [2],
}));
add('dec-term3', term({
  stem: 'Name the colour change seen when copper(II) carbonate is heated strongly.',
  model: '**Green to black.**', sol: 'Green to black.', sch: 'Green to black',
  d: 1, c: 'recall', t: [2],
}));
add('dec-num1', num({
  stem: 'In the electrolysis of acidified water, 12 cm³ of oxygen is collected at the anode. What volume of hydrogen is collected at the cathode?',
  value: 24, tol: 0, unit: 'cm³',
  sol: 'Hydrogen is twice the volume of oxygen: 2 × 12 = 24 cm³.',
  scheme: [['Ratio 2 : 1', 0.5], ['24 cm³', 0.5]],
  d: 2, c: 'application', t: [2],
}), () => eq(2 * 12, 24, 'h2') === 24);
add('dec-short2a', short({
  marks: 2,
  stem: 'Name two compounds that decompose in sunlight, and state one use of this property.',
  wl: null,
  model: '**Silver chloride** and **silver bromide**. They are used in **photographic film and paper**, where light forms silver.',
  sol: 'Silver chloride and silver bromide; photography.',
  scheme: [['Two compounds', 1], ['One use', 1]],
  d: 2, c: 'recall', t: [2],
}));
add('dec-short2b', short({
  marks: 2,
  stem: 'Explain why a little acid is added to the water in the electrolysis of water.',
  wl: null,
  model: 'Pure water is a **very poor conductor** of electricity. The acid provides **ions** which let the current pass.',
  sol: 'Pure water conducts poorly; acid supplies ions.',
  scheme: [['Pure water is a poor conductor', 1], ['Acid provides ions to carry current', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('dec-short3', short({
  marks: 3,
  stem: 'Write balanced equations for the thermal decomposition of (a) zinc carbonate, (b) potassium chlorate in the presence of manganese dioxide and (c) lead(II) nitrate.',
  wl: null,
  model: r`**(a)** $\ce{ZnCO3 ->[\Delta] ZnO + CO2}$` + '\n\n' + r`**(b)** $\ce{2KClO3 ->[\Delta] 2KCl + 3O2}$` + '\n\n' + r`**(c)** $\ce{2Pb(NO3)2 ->[\Delta] 2PbO + 4NO2 + O2}$`,
  sol: 'ZnO + CO₂; 2KCl + 3O₂; 2PbO + 4NO₂ + O₂.',
  scheme: [['(a) balanced', 1], ['(b) balanced', 1], ['(c) balanced', 1]],
  d: 3, c: 'application', t: [2],
}));

// ---------------------------------------------------------------- t03 displacement
add('disp-mcq1', mcq({
  stem: 'Which metal will displace copper from copper(II) sulphate solution but will NOT displace zinc from zinc sulphate solution?',
  right: 'Iron', wrong: ['Magnesium', 'Aluminium', 'Silver'],
  sol: 'Iron lies between zinc and copper in the series, so it displaces copper only, option (@K).',
  d: 3, c: 'analysis', t: [3],
}), () => displaces('Fe', 'Cu') && !displaces('Fe', 'Zn') && displaces('Mg', 'Zn') && displaces('Al', 'Zn') && !displaces('Ag', 'Cu') || 'series');
add('disp-mcq2', mcq({
  stem: 'A clean iron nail is kept in blue copper(II) sulphate solution for half an hour. The nail becomes',
  right: 'coated with reddish-brown copper, and the solution turns paler', wrong: ['coated with silvery zinc, and the solution turns darker blue', 'bright and shiny, and the solution turns black', 'coated with a white solid, and the solution stays blue'],
  sol: 'Iron displaces copper, so copper coats the nail and the blue colour fades to pale green, option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('disp-mcq3', mcq({
  stem: 'Colourless silver nitrate solution is poured into a copper bowl. After some time the solution turns blue because',
  right: 'copper displaces silver and copper nitrate forms', wrong: ['silver displaces copper and copper nitrate forms', 'water in the solution turns blue', 'silver nitrate decomposes to copper'],
  sol: 'Copper is above silver in the series, so it goes into solution as blue copper nitrate, option (@K).',
  d: 3, c: 'application', t: [3],
}));
add('disp-mcq4', mcq({
  stem: 'Which of these metals is the most reactive?',
  right: 'Zinc', wrong: ['Iron', 'Lead', 'Copper'],
  sol: 'The order is zinc, iron, lead, copper, option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('disp-mcq5', mcq({
  stem: 'Which pair will NOT show a reaction?',
  right: 'Silver wire and copper(II) sulphate solution', wrong: ['Zinc and lead(II) nitrate solution', 'Magnesium and iron(II) sulphate solution', 'Aluminium and copper(II) sulphate solution'],
  sol: 'Silver is below copper, so it cannot displace it; the other metals are above the metal in the salt, option (@K).',
  d: 2, c: 'application', t: [3],
}), () => !displaces('Ag', 'Cu') && displaces('Zn', 'Pb') && displaces('Mg', 'Fe') && displaces('Al', 'Cu') || 'series');
add('ar-disp', ar({
  a: 'Copper displaces zinc from zinc sulphate solution.',
  r: 'Copper is less reactive than zinc.',
  key: 'b',
  sol: 'Because copper is less reactive, it cannot displace zinc: (A) is false and (R) is true, option (b).',
  d: 2, c: 'analysis', t: [3],
}), () => !displaces('Cu', 'Zn') || 'cuzn');
add('disp-tf', tf({
  stem: 'Lead can displace zinc from a solution of zinc sulphate.',
  key: 'f',
  sol: 'False. Lead is below zinc in the activity series.',
  d: 2, c: 'application', t: [3],
}));
add('disp-fill', fill({
  stem: 'A metal that is higher in the activity series displaces a ___ reactive metal from a solution of its salt.',
  acc: [['less', 'lesser']],
  sol: 'A **less** reactive metal.',
  d: 1, c: 'recall', t: [3],
}));
add('disp-term1', term({
  stem: 'Write the balanced equation for the reaction of zinc with lead(II) nitrate solution.',
  model: r`$\ce{Zn + Pb(NO3)2 -> Zn(NO3)2 + Pb}$`, sol: 'Zinc displaces lead.', sch: 'Balanced equation',
  d: 2, c: 'application', t: [3],
}));
add('disp-term2', term({
  stem: 'State the colour of the metal that coats an iron nail kept in copper(II) sulphate solution.',
  model: '**Reddish brown** (copper).', sol: 'Reddish brown.', sch: 'Reddish brown',
  d: 1, c: 'recall', t: [3],
}));
add('disp-short2a', short({
  marks: 2,
  stem: 'Predict, with a reason, whether a reaction occurs when (a) an iron nail is placed in zinc sulphate solution and (b) zinc is placed in lead(II) nitrate solution.',
  wl: null,
  model: '**(a)** **No reaction**, because iron is **below** zinc in the activity series.\n\n**(b)** **Yes**, because zinc is **above** lead and displaces it.',
  sol: 'No, iron is below zinc; yes, zinc is above lead.',
  scheme: [['(a) no reaction with a reason', 1], ['(b) reaction with a reason', 1]],
  d: 2, c: 'application', t: [3],
}));
add('disp-short2b', short({
  marks: 2,
  stem: 'Why is a displacement of copper from copper(II) sulphate not carried out by dropping sodium into the solution?',
  wl: null,
  model: 'Sodium is **so reactive that it reacts with the water first**, giving hydrogen and sodium hydroxide, so it does not simply displace copper from its salt.',
  sol: 'Sodium reacts with water before it can displace copper.',
  scheme: [['Sodium reacts with water', 1], ['Hydrogen and sodium hydroxide form, not copper displaced', 1]],
  d: 3, c: 'analysis', t: [3],
}));
add('disp-short3', short({
  marks: 3,
  stem: 'A student tries each metal in each salt solution. Zinc displaces iron from iron(II) sulphate and copper from copper(II) sulphate. Iron displaces copper but not zinc. Copper displaces neither. (a) Arrange zinc, iron and copper in decreasing order of reactivity. (b) Write the balanced equation for iron with copper(II) sulphate. (c) State one observation for the reaction in (b).',
  wl: null,
  model: r`**(a)** **Zinc > iron > copper.**` + '\n\n' + r`**(b)** $\ce{Fe + CuSO4 -> FeSO4 + Cu}$` + '\n\n**(c)** The blue solution turns **pale green** and **reddish-brown copper** is deposited.',
  sol: 'Zn > Fe > Cu; Fe + CuSO₄ → FeSO₄ + Cu; colour change.',
  scheme: [['Correct order', 1], ['Balanced equation', 1], ['Observation', 1]],
  d: 3, c: 'application', t: [3],
}));

// ---------------------------------------------------------------- t04 double decomposition
add('dd-mcq1', mcq({
  stem: 'Which pair of solutions gives a yellow precipitate when mixed?',
  right: 'Lead nitrate and potassium iodide', wrong: ['Silver nitrate and sodium chloride', 'Sodium sulphate and barium chloride', 'Lead nitrate and potassium nitrate'],
  sol: 'Lead iodide is yellow and insoluble; potassium nitrate and the others do not give a yellow solid, option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('dd-mcq2', mcq({
  stem: 'A white curdy precipitate that slowly turns grey on exposure to sunlight is',
  right: 'silver chloride', wrong: ['barium sulphate', 'lead iodide', 'sodium chloride'],
  sol: 'Silver chloride is curdy and darkens as silver forms in light, option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('dd-mcq3', mcq({
  stem: 'When barium chloride solution is added to sodium sulphate solution, the white precipitate formed is',
  right: 'barium sulphate', wrong: ['sodium chloride', 'barium oxide', 'sodium sulphate'],
  sol: 'The partners are exchanged and barium sulphate is insoluble, option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('dd-mcq4', mcq({
  stem: r`When the skeletal equation $\ce{Pb(NO3)2 + KI -> PbI2 + KNO3}$ is balanced, the coefficients of KI and KNO₃ are`,
  right: '2 and 2', wrong: ['1 and 1', '2 and 1', '1 and 2'],
  sol: 'Two iodine atoms in PbI₂ need 2KI, and two nitrate groups give 2KNO₃, option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('dd-mcq5', mcq({
  stem: 'Lead nitrate solution added to solution Z gives a yellow precipitate. Solution Z contains',
  right: 'iodide ions', wrong: ['chloride ions', 'sulphate ions', 'nitrate ions'],
  sol: 'Lead iodide is the yellow lead precipitate, so Z contains iodide ions, option (@K).',
  d: 3, c: 'analysis', t: [4],
}));
add('ar-ppt', ar({
  a: 'A yellow solid appears when lead nitrate solution is mixed with potassium iodide solution.',
  r: 'Potassium nitrate is soluble in water.',
  key: 'd',
  sol: 'Lead iodide is the insoluble yellow product, and potassium nitrate stays dissolved; both statements are true but (R) does not explain the yellow colour, option (d).',
  d: 3, c: 'analysis', t: [4],
}));
add('dd-tf', tf({
  stem: 'The precipitate formed in a double decomposition reaction is the product that does not dissolve in water.',
  key: 't',
  sol: 'True. An insoluble product separates as a solid.',
  d: 1, c: 'understanding', t: [4],
}));
add('dd-fill', fill({
  stem: 'Silver nitrate solution reacts with sodium chloride solution to form a white curdy precipitate of silver ___.',
  acc: [['chloride']],
  sol: 'Silver **chloride**.',
  d: 1, c: 'recall', t: [4],
}));
add('dd-term1', term({
  stem: 'Write the balanced equation for the reaction between sodium sulphate solution and barium chloride solution.',
  model: r`$\ce{Na2SO4 + BaCl2 -> BaSO4 + 2NaCl}$`, sol: 'Barium sulphate precipitates.', sch: 'Balanced equation',
  d: 2, c: 'application', t: [4],
}));
add('dd-term2', term({
  stem: 'State the colour of the precipitate of lead iodide.',
  model: '**Yellow.**', sol: 'Yellow.', sch: 'Yellow',
  d: 1, c: 'recall', t: [4],
}));
add('dd-short2a', short({
  marks: 2,
  stem: 'Define a precipitate and name the precipitate formed when silver nitrate solution is added to sodium chloride solution.',
  wl: null,
  model: 'A precipitate is an **insoluble solid** formed when two solutions are mixed. Here it is **silver chloride**.',
  sol: 'Insoluble solid from solutions; silver chloride.',
  scheme: [['Definition', 1], ['Silver chloride', 1]],
  d: 1, c: 'recall', t: [4],
}));
add('dd-short2b', short({
  marks: 2,
  stem: 'State two differences between a displacement reaction and a double decomposition reaction.',
  wl: null,
  model: 'In a **displacement** reaction an **element** takes the place of another element in a compound; in **double decomposition** **two compounds** exchange their parts. A displacement reaction produces **one new element**, whereas double decomposition gives **two new compounds**, often with a precipitate.',
  sol: 'Element against two compounds; one element formed against two compounds, often a precipitate.',
  scheme: [['Reactants differ: element and compound against two compounds', 1], ['Products differ: new element against two new compounds', 1]],
  d: 2, c: 'understanding', t: [3, 4],
}));
add('dd-short3', short({
  marks: 3,
  stem: 'Write the balanced equation and the colour of the precipitate for the reaction of (a) sodium sulphate with barium chloride, (b) silver nitrate with sodium chloride, (c) lead nitrate with potassium iodide.',
  wl: null,
  model: r`**(a)** $\ce{Na2SO4 + BaCl2 -> BaSO4 + 2NaCl}$; white.` + '\n\n' + r`**(b)** $\ce{AgNO3 + NaCl -> AgCl + NaNO3}$; white, curdy.` + '\n\n' + r`**(c)** $\ce{Pb(NO3)2 + 2KI -> PbI2 + 2KNO3}$; yellow.`,
  sol: 'Three equations with white, white curdy and yellow.',
  scheme: [['(a) equation and colour', 1], ['(b) equation and colour', 1], ['(c) equation and colour', 1]],
  d: 3, c: 'application', t: [4],
}));

// ---------------------------------------------------------------- t05 energy changes
add('en-mcq1', mcq({
  stem: 'Which of these changes is endothermic?',
  right: 'Photosynthesis in green leaves', wrong: ['Burning of magnesium in air', 'Neutralisation of an acid by an alkali', 'Respiration in living cells'],
  sol: 'Photosynthesis takes in light energy; the others give out energy, option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('en-mcq2', mcq({
  stem: `Two solutions are mixed in a polystyrene cup and the temperature rises from ${TEMPS[1].start} °C to ${TEMPS[1].end} °C. The reaction is`,
  right: 'exothermic', wrong: ['endothermic', 'a decomposition', 'a displacement'],
  sol: `A rise of ${TEMPS[1].dT} °C shows that heat is given out, option (@K).`,
  d: 2, c: 'application', t: [5],
}), () => TEMPS[1].dT === 6 || 'dT');
add('en-mcq3', mcq({
  stem: 'A reaction that absorbs electrical energy is',
  right: 'the electrolysis of water', wrong: ['the burning of a candle', 'the working of a dry cell', 'respiration'],
  sol: 'Electrolysis takes in electrical energy to split water, option (@K).',
  d: 2, c: 'understanding', t: [5],
}));
add('en-mcq4', mcq({
  stem: 'In a dry cell used in a torch, the chemical reaction',
  right: 'gives out electrical energy', wrong: ['takes in electrical energy', 'takes in heat', 'neither gives nor takes energy'],
  sol: 'A cell converts the energy of a chemical reaction into electricity, option (@K).',
  d: 2, c: 'understanding', t: [5],
}));
add('en-mcq5', mcq({
  stem: 'Which reaction gives out light as well as heat?',
  right: r`$\ce{2Mg + O2 -> 2MgO}$`, wrong: [r`$\ce{CaCO3 -> CaO + CO2}$`, r`$\ce{2H2O -> 2H2 + O2}$`, r`$\ce{6CO2 + 6H2O -> C6H12O6 + 6O2}$`],
  sol: 'Magnesium burns with a dazzling white flame, so light is evolved, option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('en-tf', tf({
  stem: 'Respiration is an endothermic reaction.',
  key: 'f',
  sol: 'False. Respiration gives out energy, so it is exothermic.',
  d: 1, c: 'recall', t: [5],
}));
add('en-fill', fill({
  stem: 'A reaction that takes in heat from its surroundings is called ___.',
  acc: [['endothermic']],
  sol: '**Endothermic**.',
  d: 1, c: 'recall', t: [5],
}));
add('en-term1', term({
  stem: 'Name the form of energy, other than heat, that is given out when magnesium burns.',
  model: '**Light.**', sol: 'Light.', sch: 'Light',
  d: 1, c: 'recall', t: [5],
}));
add('en-term2', term({
  stem: 'Name the kind of reaction in which the temperature of the surrounding liquid falls.',
  model: '**Endothermic.**', sol: 'Endothermic.', sch: 'Endothermic',
  d: 1, c: 'understanding', t: [5],
}));
add('en-num', num({
  stem: `A student stirs quicklime into water in a polystyrene cup. The temperature goes from ${TEMPS[0].start} °C to ${TEMPS[0].end} °C. By how many degrees does it rise?`,
  value: TEMPS[0].dT, tol: 0, unit: '°C',
  sol: `${TEMPS[0].end} − ${TEMPS[0].start} = ${TEMPS[0].dT} °C.`,
  scheme: [['Subtraction', 0.5], [`${TEMPS[0].dT} °C`, 0.5]],
  d: 1, c: 'application', t: [5],
}));
add('en-short2a', short({
  marks: 2,
  stem: 'Distinguish between an exothermic and an endothermic reaction, giving one example of each.',
  wl: null,
  model: 'An **exothermic** reaction **gives out** energy, for example burning of carbon. An **endothermic** reaction **takes in** energy, for example heating of calcium carbonate.',
  sol: 'Gives out against takes in, with examples.',
  scheme: [['Exothermic with example', 1], ['Endothermic with example', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('en-short2b', short({
  marks: 2,
  stem: 'Give one example of a reaction that evolves electricity and one that absorbs electricity.',
  wl: null,
  model: 'A **dry cell** (or a zinc and copper cell) **evolves** electricity. The **electrolysis of water** **absorbs** electricity.',
  sol: 'Cell evolves; electrolysis absorbs.',
  scheme: [['Evolves electricity: a cell', 1], ['Absorbs electricity: electrolysis', 1]],
  d: 2, c: 'recall', t: [5],
}));
add('en-short3', short({
  marks: 3,
  stem: 'Classify each as exothermic or endothermic, with a reason: (a) burning of carbon in oxygen, (b) heating of calcium carbonate to give quicklime, (c) the reaction of quicklime with water.',
  wl: null,
  model: '**(a)** **Exothermic**: heat and light are given out.\n\n**(b)** **Endothermic**: continuous heating is needed.\n\n**(c)** **Exothermic**: the mixture becomes very hot.',
  sol: 'Exothermic; endothermic; exothermic.',
  scheme: [['(a) with a reason', 1], ['(b) with a reason', 1], ['(c) with a reason', 1]],
  d: 2, c: 'application', t: [5],
}));
add('type-match', match({
  marks: 5,
  stem: 'Match each type of reaction in Column A with its example in Column B.',
  pairs: [
    ['Direct combination', '2Mg + O₂ → 2MgO'],
    ['Thermal decomposition', 'CuCO₃ → CuO + CO₂'],
    ['Photo decomposition', '2AgBr → 2Ag + Br₂'],
    ['Displacement', 'Fe + CuSO₄ → FeSO₄ + Cu'],
    ['Double decomposition', 'Na₂SO₄ + BaCl₂ → BaSO₄ + 2NaCl'],
  ],
  order: [3, 0, 4, 1, 2],
  sol: 'Direct combination: magnesium burning; thermal decomposition: copper carbonate; photo decomposition: silver bromide; displacement: iron with copper sulphate; double decomposition: the precipitate of barium sulphate.',
  d: 2, c: 'application', t: [1, 2, 3, 4],
}));

// ---------------------------------------------------------------- 10-mark structured questions
add('iron-sulphur-long', long({
  marks: 10, wl: null,
  stem: 'A teacher mixes iron filings with sulphur powder, tests the mixture with a magnet, and then heats the mixture in a hard glass test tube. Once the mixture begins to glow red, the flame is removed, but the glow spreads through the mixture.\n\n(a) State two observations made on heating the mixture. [2]\n\n(b) Name the product and write the balanced equation. [2]\n\n(c) State how the product differs from the original mixture when a magnet is brought near each, and explain. [2]\n\n(d) What does the glow continuing after the flame is removed tell you about the energy change? [2]\n\n(e) Write the balanced equation for another direct combination of two elements. [2]',
  model: r`**(a)** The mixture **glows red** and a **black solid** is left.` + '\n\n' + r`**(b)** The product is **iron(II) sulphide**: $\ce{Fe + S -> FeS}$.` + '\n\n**(c)** The mixture is **attracted** by the magnet, but the product is **not**, because iron and sulphur are now **chemically combined** into a new substance.\n\n**(d)** The reaction is **exothermic**: it gives out enough heat to keep itself going.\n\n' + r`**(e)** For example $\ce{2Mg + O2 -> 2MgO}$ (or $\ce{Zn + S -> ZnS}$, or $\ce{C + O2 -> CO2}$).`,
  sol: 'Red glow and black solid; FeS; magnet attracts mixture only; exothermic; another combination.',
  scheme: [['Red glow', 1], ['Black solid', 1], ['Iron(II) sulphide', 1], ['Balanced equation', 1], ['Magnet attracts the mixture only', 1], ['Chemically combined', 1], ['Exothermic', 1], ['Heat given out keeps it going', 1], ['Reactants and product correct', 1], ['Balanced', 1]],
  d: 3, c: 'application', t: [1, 5],
}));
add('electrolysis-long', long({
  marks: 10, wl: null,
  stem: 'The diagram shows the apparatus for the electrolysis of acidified water. Its parts are lettered A to E.\n\n(a) Name the parts C, D and E. [3]\n\n(b) Name the gases collected in tubes A and B and give a test for each. [3]\n\n(c) Why is a little acid added to the water? [1]\n\n(d) Write the balanced equation for the decomposition of water. [1]\n\n(e) If 24 cm³ of gas is collected in tube A, what volume of gas is collected in tube B at the same time? [2]',
  model: r`**(a)** **C** is the **acidified water**; **D** is the **cathode** (negative electrode); **E** is the **battery**.` + '\n\n**(b)** **A** holds **hydrogen**, which burns with a **pop** near a flame. **B** holds **oxygen**, which **relights a glowing splint**.\n\n**(c)** Pure water is a poor conductor; the acid supplies **ions** so that the current can pass.\n\n' + r`**(d)** $\ce{2H2O ->[electricity] 2H2 + O2}$` + '\n\n**(e)** Hydrogen is twice the volume of oxygen, so tube B holds **12 cm³** (24 ÷ 2).',
  sol: 'Acidified water, cathode, battery; hydrogen and oxygen with tests; ions; equation; 12 cm³.',
  scheme: [['C acidified water', 1], ['D cathode', 1], ['E battery', 1], ['A hydrogen with its test', 1.5], ['B oxygen with its test', 1.5], ['Acid gives ions', 1], ['Balanced equation', 1], ['Ratio 2 : 1', 1], ['12 cm³', 1]].map(([a, b]) => [a, b]),
  d: 3, c: 'application', t: [2],
  assets: [elecFig],
}));
add('displacement-long', long({
  marks: 10, wl: null,
  stem: 'A student places strips of zinc, iron and copper in solutions of zinc sulphate, iron(II) sulphate and copper(II) sulphate. A tick shows that a reaction occurred and a cross shows no reaction.\n\n| Metal | Zinc sulphate | Iron(II) sulphate | Copper(II) sulphate |\n|---|---|---|---|\n| Zinc | not used | ✓ | ✓ |\n| Iron | ✗ | not used | ✓ |\n| Copper | ✗ | ✗ | not used |\n\n(a) Arrange the three metals in decreasing order of reactivity, with a reason. [2]\n\n(b) Write the balanced equation for iron with copper(II) sulphate and state one observation. [3]\n\n(c) Predict, with a reason, whether silver would displace copper from copper(II) sulphate solution. [2]\n\n(d) Write the balanced equation for zinc with iron(II) sulphate solution and name the metal deposited. [3]',
  model: r`**(a)** **Zinc > iron > copper.** Zinc displaces both others, iron displaces only copper, and copper displaces neither.` + '\n\n' + r`**(b)** $\ce{Fe + CuSO4 -> FeSO4 + Cu}$; the **blue solution turns pale green** and **reddish-brown copper** is deposited on the iron.` + '\n\n**(c)** **No**, because silver is **below copper** in the activity series.\n\n' + r`**(d)** $\ce{Zn + FeSO4 -> ZnSO4 + Fe}$` + '; **iron** is deposited.',
  sol: 'Zn > Fe > Cu; Fe + CuSO₄ with colour change; silver does not displace copper; Zn + FeSO₄ → ZnSO₄ + Fe.',
  scheme: [['Order stated', 1], ['Reason from the table', 1], ['Balanced equation', 2], ['Observation', 1], ['No reaction', 1], ['Silver below copper', 1], ['Balanced equation', 2], ['Iron named', 1]],
  d: 3, c: 'application', t: [3],
}), () => displaces('Zn', 'Fe') && displaces('Zn', 'Cu') && displaces('Fe', 'Cu') && !displaces('Fe', 'Zn') && !displaces('Cu', 'Fe') && !displaces('Ag', 'Cu') || 'table');
add('ppt-long', long({
  marks: 10, wl: null,
  stem: 'Test tubes A, B and C hold the precipitates formed when the following pairs of solutions are mixed, in some order: sodium sulphate with barium chloride; silver nitrate with sodium chloride; lead nitrate with potassium iodide. The precipitate in tube C is yellow. The precipitate in tube B is curdy and turns grey when left in sunlight. The precipitate in tube A is a fine white powder.\n\n(a) Identify the pair of solutions used and the precipitate formed in each tube. [3]\n\n(b) Write the balanced equation for the reaction in tube C. [2]\n\n(c) Write the balanced equation for the reaction in tube A. [2]\n\n(d) Name the type of these three reactions. [1]\n\n(e) Explain why the precipitate in tube B turns grey in sunlight. [2]',
  model: r`**(a)** **A**: sodium sulphate with barium chloride, giving **barium sulphate**. **B**: silver nitrate with sodium chloride, giving **silver chloride**. **C**: lead nitrate with potassium iodide, giving **lead iodide**.` + '\n\n' + r`**(b)** $\ce{Pb(NO3)2 + 2KI -> PbI2 + 2KNO3}$` + '\n\n' + r`**(c)** $\ce{Na2SO4 + BaCl2 -> BaSO4 + 2NaCl}$` + '\n\n**(d)** **Double decomposition** (double displacement).\n\n**(e)** Silver chloride is **decomposed by light** to **silver**, which is grey (with chlorine given off).',
  sol: 'A BaSO₄; B AgCl; C PbI₂; two equations; double decomposition; light splits AgCl to silver.',
  scheme: [['Tube A identified', 1], ['Tube B identified', 1], ['Tube C identified', 1], ['Pb(NO₃)₂ + 2KI → PbI₂ + 2KNO₃', 2], ['Na₂SO₄ + BaCl₂ → BaSO₄ + 2NaCl', 2], ['Double decomposition', 1], ['Light decomposes silver chloride', 1], ['Silver is formed', 1]],
  d: 4, c: 'analysis', t: [4, 2],
  assets: [pptFig],
}));
add('energy-long', long({
  marks: 10, wl: null,
  stem: `Three reactions are carried out in a polystyrene cup, each with 50 cm³ of liquid. Reaction P: quicklime is stirred into water (${TEMPS[0].start} °C to ${TEMPS[0].end} °C). Reaction Q: dilute hydrochloric acid is mixed with sodium hydroxide solution (${TEMPS[1].start} °C to ${TEMPS[1].end} °C). Reaction R: baking soda is stirred into citric acid solution (${TEMPS[2].start} °C to ${TEMPS[2].end} °C).\n\n(a) Classify P, Q and R as exothermic or endothermic and give a reason for each. [3]\n\n(b) Write the balanced equation for reaction P. [1]\n\n(c) Give one example each of a reaction that evolves light and a reaction that evolves electricity. [2]\n\n(d) Write a balanced equation for one reaction that absorbs light and one that absorbs electricity. [4]`,
  model: r`**(a)** **P** is **exothermic** (temperature rises by ${TEMPS[0].dT} °C). **Q** is **exothermic** (rises by ${TEMPS[1].dT} °C). **R** is **endothermic** (falls by ${-TEMPS[2].dT} °C): heat is taken from the liquid.` + '\n\n' + r`**(b)** $\ce{CaO + H2O -> Ca(OH)2}$` + '\n\n**(c)** **Light:** magnesium burning in air. **Electricity:** a dry cell (or a zinc and copper cell).\n\n' + r`**(d)** **Light absorbed:** $\ce{6CO2 + 6H2O ->[light] C6H12O6 + 6O2}$ (photosynthesis). **Electricity absorbed:** $\ce{2H2O ->[electricity] 2H2 + O2}$.`,
  sol: 'P and Q exothermic, R endothermic; slaked lime; magnesium and a cell; photosynthesis and electrolysis.',
  scheme: [['P classified with reason', 1], ['Q classified with reason', 1], ['R classified with reason', 1], ['Balanced equation for P', 1], ['Light evolved', 1], ['Electricity evolved', 1], ['Photosynthesis equation', 2], ['Electrolysis equation', 2]],
  d: 3, c: 'application', t: [5],
}), () => TEMPS.map((t) => t.kind).join() === 'exothermic,exothermic,endothermic' || 'temps');
add('decomp-long', long({
  marks: 10, wl: null,
  stem: 'A teacher demonstrates three decompositions: (i) green copper(II) carbonate is heated in a dry test tube; (ii) white silver chloride is left in sunlight; (iii) molten lead(II) bromide is electrolysed.\n\n(a) Write a balanced equation for each reaction. [3]\n\n(b) State one observation for each reaction. [3]\n\n(c) Name the form of energy that causes each decomposition. [2]\n\n(d) Name the substance formed at the cathode and at the anode in (iii). [2]',
  model: r`**(a)** (i) $\ce{CuCO3 ->[\Delta] CuO + CO2}$` + '\n\n' + r`(ii) $\ce{2AgCl ->[light] 2Ag + Cl2}$` + '\n\n' + r`(iii) $\ce{PbBr2 ->[electricity] Pb + Br2}$` + '\n\n**(b)** (i) the green powder turns **black**; (ii) the white solid turns **grey**; (iii) a **silvery-grey bead of lead** forms and **reddish-brown fumes** of bromine appear.\n\n**(c)** (i) **heat**; (ii) **light**; (iii) **electricity**.\n\n**(d)** **Lead** at the cathode and **bromine** at the anode.',
  sol: 'Three equations; green to black, white to grey, lead and bromine; heat, light, electricity; lead and bromine.',
  scheme: [['Equation (i)', 1], ['Equation (ii)', 1], ['Equation (iii)', 1], ['Observation (i)', 1], ['Observation (ii)', 1], ['Observation (iii)', 1], ['Heat', 0.5], ['Light', 0.5], ['Electricity', 1], ['Lead at the cathode', 1], ['Bromine at the anode', 1]].map(([a, b]) => [a, b]),
  d: 3, c: 'application', t: [2],
}));
