// ICSE 9 Chemistry ch11 Oxidation and Reduction — question bank in ICSE school-examination style
// (substance oxidised and reduced, half-changes with electrons, agents, observations, counts of electrons, 10-mark structured questions in parts).
// AR keys use the ICSE option order: a = A true R false, b = A false R true, c = both true and R explains, d = both true and R does not explain.
import { mk, add, svgV, r } from '../../icse-9-chemistry-ch01/src/lib.mjs';
import { eq, AL5, CU_REDUCED_BY_12MG, O2_6, FE_FROM_AL4, CL2_FOR_10FE2, AL_FE, MG12, HALF, CONFIG } from './calc.mjs';
import { TRANSFER_LETTERED, STRIP_LETTERED } from './svgs.mjs';

const { mcq, ar, tf, fill, num, short, long, match } = mk;
const transferFig = svgV(TRANSFER_LETTERED, 'An electron moves from a sodium atom to a chlorine atom, with five parts lettered A to E');
const stripFig = svgV(STRIP_LETTERED, 'A magnesium ribbon in blue copper(II) sulphate solution, with five parts lettered A to E');
const term = (o) => short({ marks: 1, wl: null, scheme: [[o.sch ?? 'Correct answer', 1]], ...o });

// ---------------------------------------------------------------- deck-check items (not used in tests)
add('chk-og', mcq({
  stem: 'Magnesium burns in carbon dioxide and leaves white magnesium oxide and black carbon. The correct statement is that',
  right: 'magnesium is oxidised and carbon dioxide is reduced', wrong: ['magnesium is reduced and carbon dioxide is oxidised', 'both magnesium and carbon dioxide are oxidised', 'magnesium is oxidised and carbon is oxidised'],
  sol: 'Magnesium gains oxygen and carbon dioxide loses oxygen, option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('chk-elec', mcq({
  stem: 'In the change $\\ce{Cu^2+ + 2e- -> Cu}$ the copper ion is',
  right: 'reduced, because it gains electrons', wrong: ['oxidised, because it gains electrons', 'reduced, because it loses electrons', 'oxidised, because it loses electrons'],
  sol: 'Electrons are on the left, so they are gained, and gain of electrons is reduction, option (@K).',
  d: 1, c: 'understanding', t: [2],
}), () => HALF.cu[0].some((x) => x[1] === 'e') || 'cu half');
add('chk-half', mcq({
  stem: 'Which half-change shows an oxidation?',
  right: r`$\ce{Fe^2+ -> Fe^3+ + e-}$`, wrong: [r`$\ce{Fe^3+ + e- -> Fe^2+}$`, r`$\ce{Cl2 + 2e- -> 2Cl-}$`, r`$\ce{Ag+ + e- -> Ag}$`],
  sol: 'Oxidation puts the electrons on the right-hand side, option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('chk-agent', mcq({
  stem: 'Zinc powder is heated with black copper(II) oxide and reddish-brown copper is formed. The reducing agent is',
  right: 'zinc', wrong: ['copper(II) oxide', 'zinc oxide', 'copper'],
  sol: 'Zinc takes the oxygen from copper(II) oxide, so zinc is oxidised and is the reducing agent, option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('chk-cu', mcq({
  stem: 'A magnesium ribbon is placed in copper(II) sulphate solution. The oxidising agent is',
  right: 'the copper(II) ion', wrong: ['magnesium', 'the magnesium ion', 'the sulphate ion'],
  sol: 'Copper ions gain the electrons given by magnesium; they are reduced and so act as the oxidising agent, option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('chk-redox', mcq({
  stem: 'Which of the following is a redox reaction?',
  right: r`$\ce{Mg + CuO -> MgO + Cu}$`, wrong: [r`$\ce{BaCl2 + Na2SO4 -> BaSO4 + 2NaCl}$`, r`$\ce{CaCO3 -> CaO + CO2}$`, r`$\ce{HCl + NaOH -> NaCl + H2O}$`],
  sol: 'Only in option (@K) does one substance gain oxygen while another loses it.',
  d: 2, c: 'application', t: [3],
}));

// ---------------------------------------------------------------- t01 oxygen and hydrogen transfer
add('og-mcq1', mcq({
  stem: 'Which change is an oxidation?',
  right: 'hydrogen sulphide changing into sulphur by loss of hydrogen', wrong: ['lead(II) oxide changing into lead by loss of oxygen', 'chlorine changing into hydrogen chloride by gain of hydrogen', 'carbon dioxide changing into carbon by loss of oxygen'],
  sol: 'Loss of hydrogen is oxidation; the other three are losses of oxygen or gains of hydrogen, which are reductions, option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('og-mcq2', mcq({
  stem: r`In the reaction $\ce{MnO2 + 4HCl -> MnCl2 + 2H2O + Cl2}$ the hydrochloric acid is`,
  right: 'oxidised, because it loses hydrogen', wrong: ['reduced, because it loses hydrogen', 'oxidised, because it gains oxygen', 'reduced, because it gains hydrogen'],
  sol: 'HCl becomes Cl₂, so hydrogen is removed, which is oxidation, option (@K).',
  d: 3, c: 'application', t: [1],
}));
add('og-mcq3', mcq({
  stem: 'Dry hydrogen is passed over heated lead(II) oxide. The substance that is reduced is',
  right: 'lead(II) oxide', wrong: ['hydrogen', 'lead', 'water'],
  sol: 'Lead(II) oxide loses its oxygen to hydrogen, option (@K).',
  d: 1, c: 'application', t: [1],
}));
add('og-mcq4', mcq({
  stem: 'Carbon monoxide burns in air to form carbon dioxide. Carbon monoxide is',
  right: 'oxidised, because it gains oxygen', wrong: ['reduced, because it gains oxygen', 'oxidised, because it loses oxygen', 'reduced, because it loses hydrogen'],
  sol: 'Gain of oxygen is oxidation, option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
add('og-mcq5', mcq({
  stem: 'Sulphur and hydrogen combine on heating to form hydrogen sulphide. In this change sulphur is',
  right: 'reduced, because it gains hydrogen', wrong: ['oxidised, because it gains hydrogen', 'reduced, because it loses hydrogen', 'oxidised, because it loses oxygen'],
  sol: 'Gain of hydrogen is reduction, option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('og-mcq6', mcq({
  stem: r`Which statement about $\ce{2H2S + O2 -> 2S + 2H2O}$ is correct?`,
  right: 'Hydrogen sulphide is oxidised and oxygen is reduced', wrong: ['Hydrogen sulphide is reduced and oxygen is oxidised', 'Both hydrogen sulphide and oxygen are oxidised', 'Sulphur is the substance that is reduced'],
  sol: 'H₂S loses hydrogen (oxidation) and O₂ gains hydrogen to form water (reduction), option (@K).',
  d: 3, c: 'analysis', t: [1],
}));
add('og-mcq7', mcq({
  stem: 'Magnesium ribbon is heated with black copper(II) oxide, and reddish-brown copper and white magnesium oxide are formed. Magnesium is',
  right: 'oxidised, because it gains oxygen from copper(II) oxide', wrong: ['reduced, because it gains oxygen from copper(II) oxide', 'oxidised, because it loses oxygen', 'unchanged, because it only acts as a catalyst'],
  sol: 'Magnesium takes oxygen from copper(II) oxide and is oxidised, option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('ar-together', ar({
  a: 'Oxidation and reduction always take place together in a chemical reaction.',
  r: 'The electrons lost by one substance are gained by another substance.',
  key: 'c',
  sol: 'Electrons cannot be left free, so a loss by one substance must be matched by a gain by another, which explains why the two changes occur together, option (c).',
  d: 2, c: 'understanding', t: [1, 2],
}));
add('ar-hs', ar({
  a: 'Hydrogen sulphide acts as a reducing agent when chlorine is passed into it.',
  r: 'Hydrogen sulphide gains hydrogen in the reaction.',
  key: 'a',
  sol: 'Hydrogen sulphide loses hydrogen and is oxidised, so it is a reducing agent: (A) is true. (R) is false because hydrogen is lost, not gained, option (a).',
  d: 3, c: 'analysis', t: [1, 3],
}));
add('og-tf', tf({
  stem: 'Removal of hydrogen from a substance is oxidation.',
  key: 't',
  sol: 'True. Oxidation is addition of oxygen or removal of hydrogen.',
  d: 1, c: 'recall', t: [1],
}));
add('og-term1', term({
  stem: 'Write the balanced equation for the burning of carbon monoxide in oxygen.',
  model: r`$\ce{2CO + O2 -> 2CO2}$`, sol: 'Two carbon monoxide molecules gain one oxygen molecule.', sch: 'Balanced equation',
  d: 1, c: 'application', t: [1],
}));
add('og-term2', term({
  stem: 'Name the reducing agent when dry hydrogen is passed over heated lead(II) oxide.',
  model: '**Hydrogen.**', sol: 'Hydrogen removes the oxygen and is itself oxidised.', sch: 'Correct name',
  d: 1, c: 'application', t: [1, 3],
}));
add('og-short2a', short({
  marks: 2,
  stem: 'Dry hydrogen is passed over heated yellow lead(II) oxide in a hard-glass tube. State two observations.',
  wl: null,
  model: 'The yellow solid turns **grey** (silvery lead), and **drops of a colourless liquid (water)** collect at the cooler end of the tube.',
  sol: 'Colour change to grey; water droplets.',
  scheme: [['Colour change', 1], ['Water formed', 1]],
  d: 2, c: 'application', t: [1],
}));
add('og-short2b', short({
  marks: 2,
  stem: r`In $\ce{MnO2 + 4HCl -> MnCl2 + 2H2O + Cl2}$ name the substance oxidised and the substance reduced, with a reason for each.`,
  wl: null,
  model: '**Hydrochloric acid is oxidised**, because it loses hydrogen (and becomes chlorine). **Manganese(IV) oxide is reduced**, because it loses oxygen.',
  sol: 'HCl loses hydrogen; MnO₂ loses oxygen.',
  scheme: [['HCl oxidised with reason', 1], ['MnO₂ reduced with reason', 1]],
  d: 3, c: 'application', t: [1],
}));
add('og-short2c', short({
  marks: 2,
  stem: 'Explain, using a reaction of your choice, why oxidation never occurs without reduction.',
  wl: null,
  model: 'In $\\ce{PbO + H2 -> Pb + H2O}$ the oxygen **lost by lead oxide** (reduction) is **gained by hydrogen** (oxidation). What one substance gives up, the other takes up, so the two changes go together.',
  sol: 'Oxygen leaving one substance goes to another.',
  scheme: [['Suitable reaction with both changes', 1], ['What is lost by one is gained by the other', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('og-short3a', short({
  marks: 3,
  stem: r`In $\ce{2H2S + O2 -> 2S + 2H2O}$, (a) name the substance oxidised and give a reason, (b) name the substance reduced and give a reason, (c) name the yellow solid formed.`,
  wl: null,
  model: '**(a)** **Hydrogen sulphide**, because it **loses hydrogen**.\n\n**(b)** **Oxygen**, because it **gains hydrogen** (to form water).\n\n**(c)** **Sulphur.**',
  sol: 'H₂S oxidised by loss of hydrogen; O₂ reduced by gain of hydrogen; sulphur.',
  scheme: [['(a) oxidised with reason', 1], ['(b) reduced with reason', 1], ['(c) sulphur', 1]],
  d: 2, c: 'application', t: [1],
}));
add('og-short3b', short({
  marks: 3,
  stem: 'Magnesium ribbon is heated with black copper(II) oxide. (a) State the colour change of the black solid. (b) Write the balanced equation. (c) Name the reducing agent.',
  wl: null,
  model: '**(a)** The black solid turns **reddish brown** (copper).\n\n' + r`**(b)** $\ce{Mg + CuO -> MgO + Cu}$` + '\n\n**(c)** **Magnesium.**',
  sol: 'Black to reddish brown; Mg + CuO → MgO + Cu; magnesium.',
  scheme: [['(a) colour change', 1], ['(b) balanced equation', 1], ['(c) reducing agent', 1]],
  d: 2, c: 'application', t: [1, 3],
}));

// ---------------------------------------------------------------- t02 electronic concept
add('el-mcq1', mcq({
  stem: 'Which half-change correctly represents the oxidation of aluminium?',
  right: r`$\ce{Al -> Al^3+ + 3e-}$`, wrong: [r`$\ce{Al + 3e- -> Al^3+}$`, r`$\ce{Al^3+ -> Al + 3e-}$`, r`$\ce{Al -> Al^3+ + e-}$`],
  sol: 'An aluminium atom loses three electrons, which appear on the right, and atoms and charge balance, option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('el-mcq2', mcq({
  stem: 'How many electrons does one oxygen atom gain when it changes into an oxide ion, O²⁻?',
  right: 'two', wrong: ['one', 'four', 'six'],
  sol: 'The charge changes from 0 to −2, so two electrons are gained, option (@K).',
  d: 1, c: 'application', t: [2],
}), () => CONFIG['O2-'].reduce((a, b) => a + b, 0) - CONFIG.O.reduce((a, b) => a + b, 0) === 2 || 'o2');
add('el-mcq3', mcq({
  stem: 'When a sodium atom changes into a sodium ion, its electron arrangement changes from',
  right: '2, 8, 1 to 2, 8', wrong: ['2, 8, 1 to 2, 8, 2', '2, 8, 1 to 2, 7', '2, 8, 1 to 2, 8, 8'],
  sol: 'The single outer electron is lost, leaving the second shell as the outermost, option (@K).',
  d: 2, c: 'recall', t: [2],
}), () => CONFIG['Na+'].join() === '2,8' || 'na');
add('el-mcq4', mcq({
  stem: r`In the reaction $\ce{2Na + Cl2 -> 2NaCl}$, the correct statement is that`,
  right: 'sodium loses electrons and chlorine gains electrons', wrong: ['sodium gains electrons and chlorine loses electrons', 'both sodium and chlorine lose electrons', 'both sodium and chlorine gain electrons'],
  sol: 'Sodium forms Na⁺ by losing an electron; chlorine forms Cl⁻ by gaining one, option (@K).',
  d: 1, c: 'understanding', t: [2],
}));
add('el-mcq5', mcq({
  stem: 'A student writes the oxidation of chloride ions as $\\ce{Cl- -> Cl2 + e-}$. The correct half-change is',
  right: r`$\ce{2Cl- -> Cl2 + 2e-}$`, wrong: [r`$\ce{Cl- -> Cl2 + 2e-}$`, r`$\ce{2Cl- + 2e- -> Cl2}$`, r`$\ce{2Cl- -> Cl2 + e-}$`],
  sol: 'Two chloride ions are needed for one Cl₂ molecule, and two electrons are lost to balance the charge of −2, option (@K).',
  d: 3, c: 'application', t: [2],
}));
add('el-mcq6', mcq({
  stem: 'Which half-change is not balanced for charge?',
  right: r`$\ce{Fe^3+ + e- -> Fe}$`, wrong: [r`$\ce{Zn^2+ + 2e- -> Zn}$`, r`$\ce{Ag+ + e- -> Ag}$`, r`$\ce{Fe^2+ -> Fe^3+ + e-}$`],
  sol: 'In option (@K) the left side has a charge of +2 and the right side has 0; the others balance.',
  d: 3, c: 'analysis', t: [2],
}));
add('el-mcq7', mcq({
  stem: 'A zinc strip is placed in silver nitrate solution and grey crystals of silver form. The half-change at the silver ions is',
  right: r`$\ce{Ag+ + e- -> Ag}$`, wrong: [r`$\ce{Ag -> Ag+ + e-}$`, r`$\ce{Ag+ -> Ag + e-}$`, r`$\ce{Ag + e- -> Ag+}$`],
  sol: 'Silver ions gain one electron each and form silver atoms, option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('el-tf', tf({
  stem: r`In the half-change $\ce{Cl2 + 2e- -> 2Cl-}$ the chlorine is oxidised.`,
  key: 'f',
  sol: 'False. Chlorine gains electrons, so it is reduced.',
  d: 1, c: 'understanding', t: [2],
}));
add('el-fill', fill({
  stem: 'Oxidation is the ___ of electrons and reduction is the ___ of electrons.',
  marks: 2,
  acc: [['loss'], ['gain']],
  sol: 'Oxidation is the **loss** and reduction is the **gain** of electrons.',
  d: 1, c: 'recall', t: [2],
}));
add('el-fill2', fill({
  stem: 'In a half-change that shows oxidation, the electrons appear on the ___ side of the arrow.',
  acc: [['right', 'right-hand']],
  sol: 'The electrons are lost, so they are written on the **right**.',
  d: 1, c: 'recall', t: [2],
}));
add('el-term1', term({
  stem: 'Write the half-change for the oxidation of a zinc atom to a zinc ion.',
  model: r`$\ce{Zn -> Zn^2+ + 2e-}$`, sol: 'Zinc loses two electrons.', sch: 'Correct half-change',
  d: 1, c: 'application', t: [2],
}));
add('el-term2', term({
  stem: 'Write the half-change for the reduction of a bromine molecule to bromide ions.',
  model: r`$\ce{Br2 + 2e- -> 2Br-}$`, sol: 'One bromine molecule gains two electrons to give two bromide ions.', sch: 'Correct half-change',
  d: 2, c: 'application', t: [2],
}));
add('el-term3', term({
  stem: 'Write the half-change for the reduction of a silver ion.',
  model: r`$\ce{Ag+ + e- -> Ag}$`, sol: 'One electron is gained.', sch: 'Correct half-change',
  d: 1, c: 'application', t: [2],
}));
add('el-num1', num({
  stem: `Aluminium atoms change into $\\ce{Al^3+}$ ions. How many electrons are lost when ${5} aluminium atoms react?`,
  value: AL5, tol: 0, unit: 'electrons',
  sol: `Each atom loses three electrons, so 5 × 3 = ${AL5}.`,
  scheme: [['3 electrons per atom', 0.5], [`${AL5} electrons`, 0.5]],
  d: 1, c: 'application', t: [2],
}), () => eq(5 * 3, AL5, 'al') === 15);
add('el-num2', num({
  stem: `Magnesium reacts with copper(II) sulphate solution: $\\ce{Mg + Cu^2+ -> Mg^2+ + Cu}$. How many copper(II) ions are reduced by ${MG12} magnesium atoms?`,
  value: CU_REDUCED_BY_12MG, tol: 0, unit: 'ions',
  sol: `Each magnesium atom gives two electrons and each copper ion takes two, so ${MG12} atoms reduce ${CU_REDUCED_BY_12MG} ions.`,
  scheme: [['Electrons given = electrons taken', 0.5], [`${CU_REDUCED_BY_12MG} ions`, 0.5]],
  d: 2, c: 'application', t: [2],
}), () => eq((MG12 * 2) / 2, CU_REDUCED_BY_12MG, 'cu') === 12);
add('el-num3', num({
  stem: `An oxygen molecule gains four electrons to form two oxide ions: $\\ce{O2 + 4e- -> 2O^2-}$. How many electrons are gained by ${6} oxygen molecules?`,
  value: O2_6, tol: 0, unit: 'electrons',
  sol: `6 × 4 = ${O2_6} electrons.`,
  scheme: [['4 per molecule', 0.5], [`${O2_6} electrons`, 0.5]],
  d: 2, c: 'application', t: [2],
}), () => eq(6 * 4, O2_6, 'o2') === 24);
add('el-short2a', short({
  marks: 2,
  stem: 'Write the electronic configurations of a sodium atom and of a sodium ion, and name the type of change that turns the atom into the ion.',
  wl: null,
  model: 'Sodium atom: **2, 8, 1**; sodium ion: **2, 8**. The change is an **oxidation** (loss of one electron).',
  sol: '2, 8, 1; 2, 8; oxidation.',
  scheme: [['Both configurations', 1], ['Oxidation named', 1]],
  d: 2, c: 'application', t: [2],
}), () => CONFIG.Na.join() === '2,8,1' && CONFIG['Na+'].join() === '2,8' || 'config');
add('el-short2b', short({
  marks: 2,
  stem: 'A magnesium ribbon is placed in pale green iron(II) sulphate solution and grey iron forms. Write the two half-changes.',
  wl: null,
  model: r`Oxidation: $\ce{Mg -> Mg^2+ + 2e-}$` + '\n\n' + r`Reduction: $\ce{Fe^2+ + 2e- -> Fe}$`,
  sol: 'Mg loses two electrons; Fe²⁺ gains two electrons.',
  scheme: [['Oxidation half-change', 1], ['Reduction half-change', 1]],
  d: 2, c: 'application', t: [2],
}));
add('el-short3a', short({
  marks: 3,
  stem: 'Sodium burns in chlorine to form sodium chloride. (a) Write the half-change for sodium. (b) Write the half-change for chlorine. (c) Name the substance that is reduced.',
  wl: null,
  model: r`**(a)** $\ce{Na -> Na+ + e-}$` + '\n\n' + r`**(b)** $\ce{Cl2 + 2e- -> 2Cl-}$` + '\n\n**(c)** **Chlorine** (it gains electrons).',
  sol: 'Na → Na⁺ + e⁻; Cl₂ + 2e⁻ → 2Cl⁻; chlorine.',
  scheme: [['(a) half-change', 1], ['(b) half-change', 1], ['(c) chlorine', 1]],
  d: 2, c: 'application', t: [2],
}));
add('el-short3b', short({
  marks: 3,
  stem: 'Complete each half-change by adding electrons on the correct side, and say whether it is an oxidation or a reduction: (a) Fe²⁺ → Fe³⁺ (b) Br₂ → 2Br⁻ (c) Pb²⁺ → Pb.',
  wl: null,
  model: r`**(a)** $\ce{Fe^2+ -> Fe^3+ + e-}$` + '; **oxidation**.\n\n' + r`**(b)** $\ce{Br2 + 2e- -> 2Br-}$` + '; **reduction**.\n\n' + r`**(c)** $\ce{Pb^2+ + 2e- -> Pb}$` + '; **reduction**.',
  sol: 'Fe²⁺ loses one electron; Br₂ gains two; Pb²⁺ gains two.',
  scheme: [['(a) with type', 1], ['(b) with type', 1], ['(c) with type', 1]],
  d: 3, c: 'application', t: [2],
}));

// ---------------------------------------------------------------- t03 agents and redox reactions
add('ag-mcq1', mcq({
  stem: 'The substance that gains electrons in a redox reaction is called the',
  right: 'oxidising agent', wrong: ['reducing agent', 'catalyst', 'product'],
  sol: 'A substance that gains electrons is itself reduced and so oxidises the other substance, option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('ag-mcq2', mcq({
  stem: 'Zinc reacts with dilute sulphuric acid to give zinc sulphate and hydrogen. The oxidising agent is',
  right: 'the acid, because its hydrogen ions gain electrons', wrong: ['zinc, because it gains electrons', 'the acid, because it loses oxygen', 'zinc sulphate, because it is formed'],
  sol: 'Zinc loses two electrons; hydrogen ions gain them and form hydrogen, so the acid is the oxidising agent, option (@K).',
  d: 3, c: 'analysis', t: [3],
}));
add('ag-mcq3', mcq({
  stem: 'Which of the following is a reducing agent?',
  right: 'hydrogen sulphide', wrong: ['chlorine', 'oxygen', 'nitric acid'],
  sol: 'Hydrogen sulphide readily gives up hydrogen; the other three are oxidising agents, option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('ag-mcq4', mcq({
  stem: 'Which of the following is not a redox reaction?',
  right: r`$\ce{Pb(NO3)2 + 2KI -> PbI2 + 2KNO3}$`, wrong: [r`$\ce{2Na + Cl2 -> 2NaCl}$`, r`$\ce{2H2 + O2 -> 2H2O}$`, r`$\ce{Zn + CuO -> ZnO + Cu}$`],
  sol: 'In option (@K) the ions only swap partners; no electrons, oxygen or hydrogen are transferred.',
  d: 2, c: 'application', t: [3],
}));
add('ag-mcq5', mcq({
  stem: 'Chlorine gas is bubbled through colourless potassium iodide solution, and the solution turns brown. The reducing agent is',
  right: 'potassium iodide', wrong: ['chlorine', 'potassium chloride', 'iodine'],
  sol: 'The iodide ions lose electrons and form brown iodine, so they act as the reducing agent, option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('ag-mcq6', mcq({
  stem: 'Chlorine gas is passed into pale green iron(II) chloride solution. The colour changes to',
  right: 'yellow, because iron(II) is oxidised to iron(III)', wrong: ['blue, because iron(II) is reduced', 'colourless, because iron(II) is reduced to iron', 'pale green, because no reaction takes place'],
  sol: 'Chlorine takes electrons from iron(II) ions, giving yellow iron(III) chloride, option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('ag-mcq7', mcq({
  stem: 'A good reducing agent is a substance that',
  right: 'loses electrons easily', wrong: ['gains electrons easily', 'does not change in the reaction', 'is always a gas'],
  sol: 'A reducing agent supplies electrons, so it loses them easily, option (@K).',
  d: 1, c: 'understanding', t: [3],
}));
add('ar-reduced', ar({
  a: 'A substance that is reduced in a reaction is a reducing agent.',
  r: 'A reducing agent loses electrons and is itself oxidised.',
  key: 'b',
  sol: 'The substance that is reduced is the oxidising agent, so (A) is false; (R) is a correct statement of what a reducing agent does, option (b).',
  d: 2, c: 'analysis', t: [3],
}));
add('ar-nacl', ar({
  a: 'Sodium is oxidised when it burns in chlorine.',
  r: 'Sodium chloride is an ionic compound.',
  key: 'd',
  sol: 'Sodium loses an electron, so (A) is true, and sodium chloride is ionic, so (R) is true; but (R) does not state why sodium is oxidised, option (d).',
  d: 3, c: 'understanding', t: [2, 3],
}));
add('ag-tf1', tf({
  stem: 'An oxidising agent is itself oxidised in a redox reaction.',
  key: 'f',
  sol: 'False. An oxidising agent gains electrons and is itself reduced.',
  d: 1, c: 'understanding', t: [3],
}));
add('ag-tf2', tf({
  stem: 'In a redox reaction the number of electrons lost by the reducing agent equals the number gained by the oxidising agent.',
  key: 't',
  sol: 'True. The electrons are only transferred.',
  d: 2, c: 'understanding', t: [3],
}));
add('ag-fill', fill({
  stem: 'A substance that removes oxygen from another substance acts as a ___ agent.',
  acc: [['reducing']],
  sol: 'It is a **reducing** agent.',
  d: 1, c: 'recall', t: [3],
}));
add('ag-term1', term({
  stem: 'State the colour change when chlorine gas is passed into colourless potassium iodide solution.',
  model: 'The solution turns **brown** (iodine is formed).', sol: 'Chlorine displaces iodine from the iodide.', sch: 'Brown colour',
  d: 1, c: 'recall', t: [3],
}));
add('ag-num1', num({
  stem: `Aluminium reduces iron(II) ions: $\\ce{2Al + 3Fe^2+ -> 2Al^3+ + 3Fe}$. How many iron(II) ions are reduced by ${4} aluminium atoms?`,
  value: FE_FROM_AL4, tol: 0, unit: 'ions',
  sol: `Two Al atoms reduce three Fe²⁺ ions, so 4 × 3 ÷ 2 = ${FE_FROM_AL4}.`,
  scheme: [['Ratio 2 : 3', 0.5], [`${FE_FROM_AL4} ions`, 0.5]],
  d: 3, c: 'application', t: [3],
}), () => eq((4 * 3) / 2, FE_FROM_AL4, 'fe') === 6 && AL_FE.fOx === 2);
add('ag-num2', num({
  stem: `Chlorine oxidises iron(II) ions: $\\ce{2Fe^2+ + Cl2 -> 2Fe^3+ + 2Cl-}$. How many chlorine molecules are needed to oxidise ${10} iron(II) ions?`,
  value: CL2_FOR_10FE2, tol: 0, unit: 'molecules',
  sol: `Two Fe²⁺ react with one Cl₂, so 10 ÷ 2 = ${CL2_FOR_10FE2}.`,
  scheme: [['Ratio 2 : 1', 0.5], [`${CL2_FOR_10FE2} molecules`, 0.5]],
  d: 2, c: 'application', t: [3],
}), () => eq(10 / 2, CL2_FOR_10FE2, 'cl2') === 5);
add('ag-short2a', short({
  marks: 2,
  stem: 'Name the oxidising agent and the reducing agent in $\\ce{Br2 + 2KI -> 2KBr + I2}$.',
  wl: null,
  model: '**Bromine** is the **oxidising agent** (it gains electrons); **potassium iodide** (the iodide ion) is the **reducing agent** (it loses electrons).',
  sol: 'Bromine gains electrons; the iodide ion loses electrons.',
  scheme: [['Oxidising agent', 1], ['Reducing agent', 1]],
  d: 2, c: 'application', t: [3],
}));
add('ag-short2b', short({
  marks: 2,
  stem: 'State two differences between an oxidising agent and a reducing agent in terms of electrons and of what happens to the agent itself.',
  wl: null,
  model: 'An oxidising agent **gains electrons** and is itself **reduced**; a reducing agent **loses electrons** and is itself **oxidised**.',
  sol: 'Gains versus loses electrons; reduced versus oxidised.',
  scheme: [['Electron gain and loss', 1], ['Reduced and oxidised', 1]],
  d: 1, c: 'understanding', t: [3],
}));
add('ag-short3', short({
  marks: 3,
  stem: 'Define an oxidising agent in terms of electrons. Name two oxidising agents and two reducing agents.',
  wl: null,
  model: 'An oxidising agent is a substance that **gains electrons** (it oxidises another substance and is itself reduced). **Oxidising agents:** oxygen and chlorine (also nitric acid). **Reducing agents:** hydrogen and carbon (also carbon monoxide or hydrogen sulphide).',
  sol: 'Gains electrons; two oxidising agents; two reducing agents.',
  scheme: [['Definition', 1], ['Two oxidising agents', 1], ['Two reducing agents', 1]],
  d: 1, c: 'recall', t: [3],
}));

// ---------------------------------------------------------------- match
add('agent-match', match({
  marks: 5,
  stem: 'Match each reaction in Column A with its reducing agent in Column B.',
  pairs: [
    [r`$\ce{2Na + Cl2 -> 2NaCl}$`, 'Sodium'],
    [r`$\ce{PbO + H2 -> Pb + H2O}$`, 'Hydrogen'],
    [r`$\ce{Cl2 + H2S -> 2HCl + S}$`, 'Hydrogen sulphide'],
    [r`$\ce{MnO2 + 4HCl -> MnCl2 + 2H2O + Cl2}$`, 'Hydrochloric acid'],
    [r`$\ce{Mg + CuO -> MgO + Cu}$`, 'Magnesium'],
  ],
  order: [3, 0, 4, 1, 2],
  sol: 'The reducing agent is the substance oxidised: sodium loses electrons; hydrogen gains oxygen; H₂S loses hydrogen; HCl loses hydrogen; magnesium gains oxygen.',
  d: 2, c: 'application', t: [1, 3],
}));

// ---------------------------------------------------------------- 10-mark structured questions
add('ionic-long', long({
  marks: 10, wl: null,
  stem: 'The diagram shows a sodium atom and a chlorine atom. One electron moves from one atom to the other. Its parts are lettered A to E.\n\n(a) Name the parts A, B and C. [3]\n\n(b) Write the half-change for the sodium atom and the half-change for the chlorine atom, and name the type of change in each. [4]\n\n(c) State the electronic configuration of the ion formed from each atom. [2]\n\n(d) Name the oxidising agent and the reducing agent. [1]',
  model: '**(a)** **A** is the **electron** that is transferred; **B** is the **sodium atom**; **C** is the **chlorine atom**.\n\n' + r`**(b)** Sodium: $\ce{Na -> Na+ + e-}$` + ', **oxidation**. ' + r`Chlorine: $\ce{Cl + e- -> Cl-}$` + ', **reduction**.\n\n**(c)** Sodium ion **2, 8**; chloride ion **2, 8, 8**.\n\n**(d)** Oxidising agent: **chlorine**; reducing agent: **sodium**.',
  sol: 'Electron, sodium atom, chlorine atom; two half-changes with types; 2,8 and 2,8,8; chlorine and sodium.',
  scheme: [['A electron', 1], ['B sodium atom', 1], ['C chlorine atom', 1], ['Sodium half-change', 1], ['Oxidation named', 1], ['Chlorine half-change', 1], ['Reduction named', 1], ['Sodium ion', 1], ['Chloride ion', 1], ['Both agents', 1]],
  d: 3, c: 'application', t: [2, 3],
  assets: [transferFig],
}), () => CONFIG['Na+'].join() === '2,8' && CONFIG['Cl-'].join() === '2,8,8' || 'configs');
add('pbo-long', long({
  marks: 10, wl: null,
  stem: 'Dry hydrogen is passed over yellow lead(II) oxide heated in a hard-glass tube, and the gas leaving the tube is burnt at a jet.\n\n(a) State two observations in the tube. [2]\n\n(b) Write the balanced equation for the reaction. [1]\n\n(c) Name the substance oxidised and the substance reduced, with a reason for each in terms of oxygen. [3]\n\n(d) Name the oxidising agent and the reducing agent. [2]\n\n(e) Why is the hydrogen passed through the tube for some time before heating begins? [2]',
  model: '**(a)** The yellow solid turns **grey**, and **drops of water** collect at the cooler end of the tube.\n\n' + r`**(b)** $\ce{PbO + H2 -> Pb + H2O}$` + '\n\n**(c)** **Hydrogen** is oxidised because it **gains oxygen**; **lead(II) oxide** is reduced because it **loses oxygen**.\n\n**(d)** Oxidising agent: **lead(II) oxide**; reducing agent: **hydrogen**.\n\n**(e)** To **drive out the air**: a mixture of hydrogen and air **explodes** when it is heated or lit.',
  sol: 'Grey solid and water; PbO + H₂ → Pb + H₂O; hydrogen oxidised, PbO reduced; agents; air removed to avoid explosion.',
  scheme: [['Colour change', 1], ['Water formed', 1], ['Balanced equation', 1], ['Hydrogen oxidised with reason', 1.5], ['Lead(II) oxide reduced with reason', 1.5], ['Oxidising agent', 1], ['Reducing agent', 1], ['Air driven out', 1], ['Explosive mixture', 1]],
  d: 2, c: 'application', t: [1, 3],
}));
add('disp-long', long({
  marks: 10, wl: null,
  stem: 'The diagram shows a magnesium ribbon in blue copper(II) sulphate solution. Its parts are lettered A to E: D is a magnesium ion and C is a copper(II) ion.\n\n(a) Name the parts A, B and E. [3]\n\n(b) State two observations after some time. [2]\n\n(c) Write the half-change that produces D and the half-change that involves C. [2]\n\n(d) Write the overall ionic equation. [1]\n\n(e) Name the oxidising agent and the reducing agent, with a reason for each. [2]',
  model: '**(a)** **A** is the **magnesium ribbon**; **B** is the **deposit of copper**; **E** is the **(blue) copper(II) sulphate solution**.\n\n**(b)** A **reddish-brown deposit** forms on the ribbon, and the **blue colour of the solution fades** (the ribbon becomes thinner).\n\n' + r`**(c)** $\ce{Mg -> Mg^2+ + 2e-}$` + ' and ' + r`$\ce{Cu^2+ + 2e- -> Cu}$` + '\n\n' + r`**(d)** $\ce{Mg + Cu^2+ -> Mg^2+ + Cu}$` + '\n\n**(e)** Oxidising agent: the **copper(II) ion**, because it **gains electrons**; reducing agent: **magnesium**, because it **loses electrons**.',
  sol: 'Ribbon, copper deposit, solution; deposit and fading colour; two half-changes; ionic equation; agents with reasons.',
  scheme: [['A ribbon', 1], ['B copper deposit', 1], ['E solution', 1], ['First observation', 1], ['Second observation', 1], ['Oxidation half-change', 1], ['Reduction half-change', 1], ['Overall equation', 1], ['Oxidising agent with reason', 1], ['Reducing agent with reason', 1]],
  d: 3, c: 'application', t: [2, 3],
  assets: [stripFig],
}));
add('iron-long', long({
  marks: 10, wl: null,
  stem: 'Chlorine gas is passed into pale green iron(II) chloride solution until the colour changes to yellow.\n\n(a) Name the product formed and write the balanced equation. [2]\n\n(b) Write the half-change for the oxidation and the half-change for the reduction. [2]\n\n(c) Explain, using electrons, why two iron(II) ions are needed for each chlorine molecule. [2]\n\n(d) Name the oxidising agent and the reducing agent. [2]\n\n(e) How many chlorine molecules are needed to oxidise 10 iron(II) ions? Show your working. [2]',
  model: r`**(a)** **Iron(III) chloride**: $\ce{2FeCl2 + Cl2 -> 2FeCl3}$` + '\n\n' + r`**(b)** Oxidation: $\ce{Fe^2+ -> Fe^3+ + e-}$` + '; ' + r`reduction: $\ce{Cl2 + 2e- -> 2Cl-}$` + '\n\n**(c)** One chlorine molecule **gains two electrons**, but each iron(II) ion **loses only one**, so **two** iron(II) ions are needed to supply two electrons.\n\n**(d)** Oxidising agent: **chlorine**; reducing agent: **iron(II) chloride** (the iron(II) ion).\n\n' + `**(e)** Two Fe²⁺ ions per Cl₂, so 10 ÷ 2 = **${CL2_FOR_10FE2}** molecules.`,
  sol: 'FeCl₃ with equation; two half-changes; two electrons needed; agents; 5 molecules.',
  scheme: [['Iron(III) chloride named', 0.5], ['Balanced equation', 1.5], ['Oxidation half-change', 1], ['Reduction half-change', 1], ['Two electrons gained by chlorine', 1], ['One electron lost per iron ion', 1], ['Oxidising agent', 1], ['Reducing agent', 1], ['Ratio 2 : 1', 1], [`${CL2_FOR_10FE2} molecules`, 1]],
  d: 3, c: 'application', t: [2, 3],
}), () => eq(10 / 2, CL2_FOR_10FE2, 'cl2') === 5);
add('h2s-long', long({
  marks: 10, wl: null,
  stem: 'Chlorine gas is passed into a gas jar containing hydrogen sulphide, and a yellow solid forms on the walls. In another experiment hydrogen sulphide is burnt in a limited supply of air: $\\ce{2H2S + O2 -> 2S + 2H2O}$ (the same yellow solid forms).\n\n(a) Name the yellow solid and write the balanced equation for the first experiment. [2]\n\n(b) In the first experiment, name the substance oxidised and the substance reduced, with a reason in terms of hydrogen for each. [2]\n\n(c) Name the oxidising agent and the reducing agent in the first experiment. [2]\n\n(d) In the second experiment, name the substance oxidised and the substance reduced. [2]\n\n(e) What is common to hydrogen sulphide in both experiments? [2]',
  model: '**(a)** **Sulphur.** ' + r`$\ce{Cl2 + H2S -> 2HCl + S}$` + '\n\n**(b)** **Hydrogen sulphide** is oxidised because it **loses hydrogen**; **chlorine** is reduced because it **gains hydrogen**.\n\n**(c)** Oxidising agent: **chlorine**; reducing agent: **hydrogen sulphide**.\n\n**(d)** **Hydrogen sulphide** is oxidised; **oxygen** is reduced (it gains hydrogen to form water).\n\n**(e)** In both it **loses hydrogen** to form sulphur, so it is **oxidised** and acts as a **reducing agent**.',
  sol: 'Sulphur and equation; H₂S oxidised, Cl₂ reduced; agents; H₂S oxidised, O₂ reduced; H₂S loses hydrogen both times.',
  scheme: [['Sulphur', 0.5], ['Balanced equation', 1.5], ['Oxidised with reason', 1], ['Reduced with reason', 1], ['Oxidising agent', 1], ['Reducing agent', 1], ['Second experiment: oxidised', 1], ['Second experiment: reduced', 1], ['Loses hydrogen in both', 1], ['Reducing agent in both', 1]],
  d: 3, c: 'application', t: [1, 3],
}));
add('combine-long', long({
  marks: 10, wl: null,
  stem: 'A piece of aluminium foil is placed in pale green iron(II) sulphate solution, and grey iron slowly forms. The two half-changes are $\\ce{Al -> Al^3+ + 3e-}$ and $\\ce{Fe^2+ + 2e- -> Fe}$.\n\n(a) Name the type of change shown by each half-change. [2]\n\n(b) What are the smallest numbers of aluminium atoms and iron(II) ions that make the electrons lost equal to the electrons gained? Show your working. [2]\n\n(c) Write the overall ionic equation, with the electrons cancelled. [3]\n\n(d) Name the oxidising agent and the reducing agent. [2]\n\n(e) How many iron(II) ions are reduced by 4 aluminium atoms? [1]',
  model: '**(a)** The aluminium half-change is an **oxidation** (electrons lost); the iron half-change is a **reduction** (electrons gained).\n\n' + `**(b)** Aluminium loses 3 and Fe²⁺ gains 2; the smallest common number is ${AL_FE.electrons}. So use **${AL_FE.fOx} aluminium atoms** (${AL_FE.fOx} × 3 = ${AL_FE.electrons}) and **${AL_FE.fRed} iron(II) ions** (${AL_FE.fRed} × 2 = ${AL_FE.electrons}).\n\n` + r`**(c)** $\ce{2Al + 3Fe^2+ -> 2Al^3+ + 3Fe}$` + '\n\n**(d)** Oxidising agent: the **iron(II) ion**; reducing agent: **aluminium**.\n\n' + `**(e)** Two Al reduce three Fe²⁺, so 4 × 3 ÷ 2 = **${FE_FROM_AL4}** ions.`,
  sol: 'Oxidation and reduction; 2 Al and 3 Fe²⁺ with 6 electrons; overall equation; agents; 6 ions.',
  scheme: [['Oxidation named', 1], ['Reduction named', 1], ['Common number of electrons', 1], ['Atoms and ions needed', 1], ['Left side', 1], ['Right side', 1], ['Electrons cancelled', 1], ['Oxidising agent', 1], ['Reducing agent', 1], [`${FE_FROM_AL4} ions`, 1]],
  d: 4, c: 'analysis', t: [2, 3],
}), () => AL_FE.fOx === 2 && AL_FE.fRed === 3 && AL_FE.electrons === 6 && FE_FROM_AL4 === 6 || 'combine');
void O2_6;

// ---------------------------------------------------------------- extra recall and understanding items
add('og-mcq8', mcq({
  stem: 'Oxidation can be described as the',
  right: 'addition of oxygen to a substance', wrong: ['removal of oxygen from a substance', 'addition of hydrogen to a substance', 'gain of electrons by a substance'],
  sol: 'Addition of oxygen (or removal of hydrogen) is oxidation, option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('og-fill', fill({
  stem: 'Reduction is the ___ of hydrogen to a substance.',
  acc: [['addition']],
  sol: 'Reduction is the **addition** of hydrogen.',
  d: 1, c: 'recall', t: [1],
}));
add('og-term3', term({
  stem: 'Name the kind of reaction in which oxidation and reduction take place together.',
  model: 'A **redox reaction.**', sol: 'Redox is short for reduction and oxidation.', sch: 'Redox reaction',
  d: 1, c: 'recall', t: [1],
}));
add('el-mcq8', mcq({
  stem: r`The change $\ce{Mg -> Mg^2+ + 2e-}$ shows that a magnesium atom`,
  right: 'loses two electrons and is oxidised', wrong: ['gains two electrons and is reduced', 'loses two electrons and is reduced', 'gains two electrons and is oxidised'],
  sol: 'The electrons are on the right, so they are lost, and loss of electrons is oxidation, option (@K).',
  d: 1, c: 'understanding', t: [2],
}));
add('ag-mcq8', mcq({
  stem: 'Which of the following is an oxidising agent?',
  right: 'chlorine', wrong: ['hydrogen', 'carbon', 'magnesium'],
  sol: 'Chlorine readily gains electrons; the other three are reducing agents, option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('ag-tf3', tf({
  stem: 'Zinc acts as a reducing agent because it loses electrons easily.',
  key: 't',
  sol: 'True. Metals such as zinc give up electrons and are oxidised.',
  d: 1, c: 'understanding', t: [3],
}));
