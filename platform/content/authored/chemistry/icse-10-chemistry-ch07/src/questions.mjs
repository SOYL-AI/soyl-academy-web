// ICSE 10 Chemistry ch07 Electrolysis — question bank (ICSE 2027 specimen style: objective items, 1-mark electrode
// equations / observations / names, bracket completions, matches and 10-mark structured questions). Stems name their own
// electrolytes, electrodes and articles. MCQ keys are placed by the builder; AR keys planned: a c b d a.
import { mk, add, r } from './lib.mjs';

const { mcq, ar, tf, fill, match, num, short, long } = mk;
const near = (a, b, tol = 1e-9) => Math.abs(a - b) <= tol;

// ---------------------------------------------------------------- t01 electrolytes and particles present
add('strong-mcq', mcq({
  stem: 'Which list contains only strong electrolytes?',
  right: 'Sodium hydroxide solution, dilute nitric acid, copper(II) sulphate solution',
  wrong: ['Ethanoic acid, sugar solution, dilute sulphuric acid', 'Ammonium hydroxide solution, carbonic acid, ethanoic acid', 'Alcohol, kerosene, carbon tetrachloride'],
  sol: 'Alkalis such as NaOH, mineral acids such as dilute HNO₃ and salts such as CuSO₄ are almost completely ionised; ethanoic acid, carbonic acid and ammonium hydroxide are weak, and sugar, alcohol and kerosene are non-electrolytes — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('weak-mcq', mcq({
  stem: 'Which solution conducts electricity only weakly because it is only partly ionised?',
  right: 'Ethanoic acid',
  wrong: ['Dilute hydrochloric acid', 'Potassium hydroxide solution', 'Sodium chloride solution'],
  sol: 'Ethanoic acid is a weak electrolyte; the other three are strong electrolytes — option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
add('nonel-mcq', mcq({
  stem: 'Which of these liquids contains molecules only, and so does not conduct electricity?',
  right: 'Kerosene',
  wrong: ['Molten lead bromide', 'Dilute sulphuric acid', 'Ammonium hydroxide solution'],
  sol: 'Kerosene is a non-electrolyte (molecules only); molten lead bromide has ions only; dilute sulphuric acid is a strong electrolyte; ammonium hydroxide has ions and molecules — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('solid-mcq', mcq({
  stem: 'Crystals of sodium chloride do not conduct electricity, but molten sodium chloride does. The reason is that in the crystals:',
  right: 'the ions are held in fixed positions and cannot move',
  wrong: ['there are no ions, only molecules', 'the electrons are held too tightly by the chlorine atoms', 'the ions are too large to carry a current'],
  sol: 'Sodium chloride is ionic in both states, but its ions are free to move only in the melt — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('solid-ar', ar({
  a: 'Solid lead bromide does not conduct electricity.',
  r: 'In solid lead bromide, the Pb²⁺ and Br⁻ ions are held in fixed positions and cannot move.',
  key: 'a',
  sol: 'Both true; with no mobile ions there is no conduction, so R explains A — option (a).',
  d: 2, c: 'understanding', t: [1, 4],
}));
add('sugar-ar', ar({
  a: 'An aqueous solution of glucose does not conduct electricity.',
  r: 'Glucose is an ionic compound.',
  key: 'c',
  sol: 'A is true; R is false: glucose is a covalent compound whose solution contains molecules only — option (c).',
  d: 2, c: 'understanding', t: [1],
}));
add('metal-tf', tf({
  stem: 'When a current passes through a copper wire, the copper undergoes a chemical change.',
  key: 'f',
  sol: 'False: metallic conduction is by electrons and causes no chemical change; electrolytic conduction is by ions and decomposes the electrolyte.',
  d: 1, c: 'understanding', t: [1],
}));
add('weak-fill', fill({
  stem: 'An electrolyte that is only partly ionised in solution, so that its solution contains both ions and molecules, is called a ___ electrolyte.',
  acc: [['weak']],
  sol: 'A **weak** electrolyte (for example ethanoic acid).',
  d: 1, c: 'recall', t: [1],
}));
add('nonel-short1', short({
  marks: 1,
  stem: 'Name one liquid that is a non-electrolyte, and the particles it contains.',
  model: 'Kerosene (or alcohol, carbon tetrachloride): it contains molecules only.',
  sol: 'Non-electrolyte with molecules only.',
  scheme: [['Correct example with "molecules only"', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('strongweak-short2', short({
  marks: 2,
  stem: 'Distinguish between a strong electrolyte and a weak electrolyte, giving one example of each.',
  model: 'A strong electrolyte is almost completely ionised in solution or in the molten state, so it contains ions only and conducts well (for example dilute hydrochloric acid or sodium chloride). A weak electrolyte is only partly ionised, so it contains both ions and molecules and conducts poorly (for example ethanoic acid or ammonium hydroxide).',
  sol: 'Degree of ionisation and particles present.',
  scheme: [['Difference', 1], ['One example of each', 1]],
  d: 2, c: 'understanding', t: [1],
}));

// ---------------------------------------------------------------- t02 terms; oxidation and reduction
add('redox-mcq', mcq({
  stem: r`During an electrolysis, the change $\ce{Cl- -> Cl + e-}$ takes place at one electrode. This change is:`,
  right: 'oxidation, at the anode',
  wrong: ['reduction, at the anode', 'oxidation, at the cathode', 'reduction, at the cathode'],
  sol: 'The chloride ion loses an electron, which is oxidation; anions are oxidised at the anode — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('anode-mcq', mcq({
  stem: 'In an electrolytic cell, the anode is the electrode that is:',
  right: 'joined to the positive terminal, where anions lose electrons',
  wrong: ['joined to the negative terminal, where cations gain electrons', 'joined to the positive terminal, where cations gain electrons', 'joined to the negative terminal, where anions lose electrons'],
  sol: 'Anode: positive terminal, attracts anions, which are oxidised there — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('reduced-mcq', mcq({
  stem: r`At the cathode of a cell containing copper(II) nitrate solution, the change $\ce{Cu^2+ + 2e- -> Cu}$ occurs. The copper(II) ions are:`,
  right: 'reduced, because they gain electrons',
  wrong: ['oxidised, because they gain electrons', 'reduced, because they lose electrons', 'oxidised, because they lose electrons'],
  sol: 'Gain of electrons is reduction — option (@K).',
  d: 1, c: 'understanding', t: [2],
}));
add('cathode-tf', tf({
  stem: 'Reduction always takes place at the cathode during electrolysis.',
  key: 't',
  sol: 'True: cations gain electrons at the cathode, which is reduction.',
  d: 1, c: 'recall', t: [2],
}));
add('define-short1', short({
  marks: 1,
  stem: 'Define electrolysis.',
  model: 'Electrolysis is the decomposition of an electrolyte, in the molten state or in aqueous solution, by passing an electric current through it.',
  sol: 'Definition.',
  scheme: [['Decomposition by electric current, molten or in solution', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('ox-short1', short({
  marks: 1,
  stem: 'Define oxidation in terms of electrons, and name the electrode at which it occurs during electrolysis.',
  model: 'Oxidation is the loss of electrons; it occurs at the anode.',
  sol: 'Loss of electrons; anode.',
  scheme: [['Loss of electrons, at the anode', 1]],
  d: 1, c: 'recall', t: [2],
}));

// ---------------------------------------------------------------- t03 migration and selective discharge
add('discharge-mcq', mcq({
  stem: 'Dilute calcium nitrate solution is electrolysed with platinum electrodes. The product at the cathode is:',
  right: 'hydrogen, because Ca²⁺ ions are harder to discharge than H⁺ ions',
  wrong: ['calcium, because Ca²⁺ ions move to the cathode', 'oxygen, because OH⁻ ions are discharged first', 'nitrogen dioxide, because nitrate ions are reduced'],
  sol: 'Calcium is far above hydrogen in the activity series, so H⁺ is discharged and hydrogen forms — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('series-mcq', mcq({
  stem: 'Dilute solutions of four salts are electrolysed separately with platinum electrodes. In which case is a metal deposited at the cathode?',
  right: 'Copper(II) sulphate',
  wrong: ['Magnesium sulphate', 'Sodium sulphate', 'Potassium nitrate'],
  sol: 'Only copper is below hydrogen in the activity series; Mg, Na and K ions stay in solution and hydrogen forms — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('conc-mcq', mcq({
  stem: 'When concentrated sodium chloride solution is electrolysed with graphite electrodes, chlorine rather than oxygen is given off at the anode. The main reason is that:',
  right: 'chloride ions are present in a much higher concentration than hydroxide ions',
  wrong: ['chloride ions are always discharged before hydroxide ions', 'graphite reacts with oxygen', 'sodium ions are discharged at the anode'],
  sol: 'Normally OH⁻ is discharged more easily, but the very high concentration of Cl⁻ makes it the ion discharged — option (@K).',
  d: 3, c: 'analysis', t: [3],
}));
add('predict-short2', short({
  marks: 2,
  stem: 'Dilute magnesium sulphate solution is electrolysed with platinum electrodes. Name the product at (a) the cathode and (b) the anode, giving a reason for each.',
  model: '(a) Hydrogen: Mg²⁺ is high in the activity series and is not discharged; H⁺ ions from water are discharged instead. (b) Oxygen: OH⁻ ions are discharged in preference to SO₄²⁻ ions.',
  sol: 'Activity series at the cathode; discharge order of anions at the anode.',
  scheme: [['(a) Hydrogen with reason', 1], ['(b) Oxygen with reason', 1]],
  d: 3, c: 'analysis', t: [3],
}));

// ---------------------------------------------------------------- t04 molten lead bromide
add('crucible-mcq', mcq({
  stem: 'Lead bromide is electrolysed in a silica crucible because silica:',
  right: 'is not attacked by molten lead bromide and withstands the high temperature',
  wrong: ['conducts electricity and acts as the cathode', 'reacts with bromine and removes it', 'lowers the melting point of lead bromide'],
  sol: 'Silica is unreactive and heat-resistant — option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('pbanode-mcq', mcq({
  stem: 'During the electrolysis of molten lead bromide with graphite electrodes, the observation at the anode is:',
  right: 'reddish-brown fumes are given off',
  wrong: ['a silvery grey metal is formed', 'colourless bubbles of oxygen are given off', 'the anode dissolves'],
  sol: r`At the anode $\ce{2Br- -> Br2 + 2e-}$: bromine vapour is reddish-brown — option (@K).`,
  d: 1, c: 'recall', t: [4],
}));
add('crucible-fill', fill({
  stem: 'Lead bromide is electrolysed in a crucible made of ___, which is not attacked by the hot melt.',
  acc: [['silica']],
  sol: 'A **silica** crucible.',
  d: 1, c: 'recall', t: [4],
}));
add('pb-num', num({
  stem: 'During the electrolysis of molten lead bromide, 0.05 mol of bromine molecules is given off at the anode. What mass of lead is deposited at the cathode in the same time? (Pb = 207)',
  value: 10.35, tol: 0.05, unit: 'g',
  sol: r`Overall $\ce{PbBr2 -> Pb + Br2}$: 1 mol of lead forms for each mole of bromine, so 0.05 mol of lead. Mass $= 0.05 \times 207 = 10.35$ g.`,
  scheme: [['0.05 mol of lead', 0.5], ['10.35 g', 0.5]],
  d: 3, c: 'application', t: [4],
}), () => near(0.05 * 207, 10.35) || 'mass');
add('ionise-short1', short({
  marks: 1,
  stem: 'Write the equation for the ionisation of lead bromide when it melts.',
  model: r`$\ce{PbBr2 -> Pb^2+ + 2Br-}$`,
  sol: 'Ionisation.',
  scheme: [['Correct ions and charges', 1]],
  d: 1, c: 'application', t: [4],
}));
add('pbcathode-short1', short({
  marks: 1,
  stem: 'Write the equation for the reaction at the cathode during the electrolysis of molten lead bromide.',
  model: r`$\ce{Pb^2+ + 2e- -> Pb}$`,
  sol: 'Reduction of lead ions.',
  scheme: [['Balanced equation with electrons', 1]],
  d: 1, c: 'application', t: [4],
}));
add('pbanode-short1', short({
  marks: 1,
  stem: 'State what you observe at the anode during the electrolysis of molten lead bromide.',
  model: 'Reddish-brown fumes (vapour) of bromine are given off.',
  sol: 'Bromine vapour.',
  scheme: [['Reddish-brown fumes', 1]],
  d: 1, c: 'understanding', t: [4],
}));
add('solidmolten-short2', short({
  marks: 2,
  stem: 'Give a reason why (a) lead bromide must be molten before it is electrolysed and (b) graphite rods are used as electrodes in this electrolysis.',
  model: '(a) In solid lead bromide the ions are held in fixed positions; only in the molten state are the Pb²⁺ and Br⁻ ions free to move to the electrodes. (b) Graphite is inert: it conducts electricity but is not attacked by bromine or by the hot melt.',
  sol: 'Mobile ions; inert electrodes.',
  scheme: [['(a)', 1], ['(b)', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('calc-short3', short({
  marks: 3,
  stem: 'Copper(II) sulphate solution is electrolysed with platinum electrodes until 3.2 g of copper has been deposited on the cathode. Calculate (a) the moles of copper deposited, (b) the moles of electrons that passed and (c) the volume of oxygen given off at the anode, measured at STP. (Cu = 64; 4OH⁻ → 2H₂O + O₂ + 4e⁻)',
  model: r`(a) Moles of copper $= \frac{3.2}{64} = 0.05$. (b) Each Cu²⁺ ion needs 2 electrons, so electrons $= 0.05 \times 2 = 0.1$ mol. (c) Every 4 mol of electrons releases 1 mol of oxygen, so oxygen $= 0.1 \div 4 = 0.025$ mol; volume $= 0.025 \times 22.4 = 0.56$ dm³.`,
  sol: 'Moles of copper, electrons, then oxygen.',
  scheme: [['(a) 0.05 mol', 1], ['(b) 0.1 mol', 1], ['(c) 0.56 dm³', 1]],
  d: 4, c: 'analysis', t: [6],
}), () => near((3.2 / 64) * 2 / 4 * 22.4, 0.56) || 'oxygen');

// ---------------------------------------------------------------- t05 acidified water
add('water-mcq', mcq({
  stem: 'Water acidified with dilute sulphuric acid is electrolysed with platinum electrodes. The gas collected at the anode, and its volume compared with the gas at the cathode, are:',
  right: 'oxygen; half the volume of the gas at the cathode',
  wrong: ['hydrogen; twice the volume of the gas at the cathode', 'oxygen; twice the volume of the gas at the cathode', 'sulphur dioxide; equal to the volume of the gas at the cathode'],
  sol: 'OH⁻ ions are discharged at the anode giving oxygen; hydrogen at the cathode has twice its volume — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('acid-mcq', mcq({
  stem: 'A little dilute sulphuric acid is added to water before it is electrolysed, because:',
  right: 'pure water has very few ions and conducts very poorly',
  wrong: ['the acid is decomposed to give hydrogen and oxygen', 'the acid stops the electrodes from dissolving', 'the acid is needed to produce sulphur dioxide'],
  sol: 'The acid supplies ions so that the current can flow; it is not used up — option (@K).',
  d: 1, c: 'understanding', t: [5],
}));
add('ratio-mcq', mcq({
  stem: 'In the electrolysis of acidified water, the volumes of hydrogen and oxygen collected are in the ratio:',
  right: '2 : 1',
  wrong: ['1 : 2', '1 : 1', '4 : 1'],
  sol: 'Four electrons give two molecules of hydrogen and one of oxygen — option (@K).',
  d: 1, c: 'understanding', t: [5],
}));
add('h2ratio-ar', ar({
  a: 'In the electrolysis of acidified water, the volume of hydrogen collected is twice the volume of oxygen.',
  r: 'Four electrons give two molecules of hydrogen at the cathode but only one molecule of oxygen at the anode.',
  key: 'a',
  sol: 'By Avogadro’s law, twice as many molecules occupy twice the volume, so R explains A — option (a).',
  d: 2, c: 'understanding', t: [5],
}));
add('acidamt-tf', tf({
  stem: 'In the electrolysis of acidified water, the amount of sulphuric acid in the cell stays the same while water is used up.',
  key: 't',
  sol: 'True: H⁺ and OH⁻ from water are discharged; the acid is not used up, so it becomes slowly more concentrated.',
  d: 2, c: 'understanding', t: [5],
}));
add('ratio-num', num({
  stem: '18 cm³ of oxygen collects at the anode during the electrolysis of acidified water. What volume of hydrogen collects at the cathode in the same time, at the same temperature and pressure?',
  value: 36, tol: 0, unit: 'cm³',
  sol: r`Hydrogen and oxygen form in the volume ratio 2 : 1, so hydrogen $= 18 \times 2 = 36$ cm³.`,
  scheme: [['Ratio 2 : 1', 0.5], ['36 cm³', 0.5]],
  d: 1, c: 'application', t: [5],
}), () => 18 * 2 === 36 || 'volume');
add('h2vol-num', num({
  stem: 'During the electrolysis of acidified water, 0.2 mol of electrons passes through the cell. What volume of hydrogen, measured at STP, is formed at the cathode? (2H⁺ + 2e⁻ → H₂)',
  value: 2.24, tol: 0.01, unit: 'dm³',
  sol: r`Two electrons give one molecule of hydrogen, so hydrogen $= 0.2 \div 2 = 0.1$ mol. Volume $= 0.1 \times 22.4 = 2.24$ dm³.`,
  scheme: [['0.1 mol H₂', 0.5], ['2.24 dm³', 0.5]],
  d: 2, c: 'application', t: [5],
}), () => near((0.2 / 2) * 22.4, 2.24) || 'volume');
add('h2cathode-short1', short({
  marks: 1,
  stem: 'Write the equation for the reaction at the cathode during the electrolysis of acidified water.',
  model: r`$\ce{2H+ + 2e- -> H2}$ (or $\ce{4H+ + 4e- -> 2H2}$).`,
  sol: 'Reduction of hydrogen ions.',
  scheme: [['Balanced equation with electrons', 1]],
  d: 1, c: 'application', t: [5],
}));
add('o2anode-short1', short({
  marks: 1,
  stem: 'Write the equation for the reaction at the anode during the electrolysis of acidified water with platinum electrodes.',
  model: r`$\ce{4OH- -> 2H2O + O2 + 4e-}$`,
  sol: 'Discharge of hydroxide ions.',
  scheme: [['Balanced equation with electrons', 1]],
  d: 2, c: 'application', t: [5],
}));
add('pt-short1', short({
  marks: 1,
  stem: 'Why are platinum electrodes, rather than copper electrodes, used for the electrolysis of acidified water?',
  model: 'Platinum is inert: it is not oxidised at the anode, so oxygen is given off. A copper anode would dissolve instead of oxygen being formed.',
  sol: 'Inert electrode.',
  scheme: [['Platinum is inert; copper anode would dissolve', 1]],
  d: 2, c: 'understanding', t: [3, 5],
}));
add('water-short3', short({
  marks: 3,
  stem: 'Water containing a little dilute sulphuric acid is electrolysed with platinum electrodes. (a) Why is the acid added? (b) Write the equations for the reactions at the cathode and the anode. (c) Explain why the volume of hydrogen collected is twice that of oxygen.',
  model: r`(a) Pure water is a very weak electrolyte with very few ions; the acid provides ions so that the solution conducts. (b) Cathode: $\ce{4H+ + 4e- -> 2H2}$. Anode: $\ce{4OH- -> 2H2O + O2 + 4e-}$. (c) The same 4 electrons that release 2 molecules of hydrogen at the cathode release only 1 molecule of oxygen at the anode; by Avogadro's law, 2 molecules occupy twice the volume of 1 molecule at the same temperature and pressure.`,
  sol: 'Ions; electrode equations; electrons and Avogadro’s law.',
  scheme: [['(a)', 1], ['(b) both equations', 1], ['(c)', 1]],
  d: 3, c: 'analysis', t: [5],
}));

// ---------------------------------------------------------------- t06 copper(II) sulphate with copper and with platinum electrodes
add('cuanode-mcq', mcq({
  stem: 'Copper(II) sulphate solution is electrolysed using copper electrodes. What happens at the anode?',
  right: 'Copper atoms lose electrons and dissolve as Cu²⁺ ions, so the anode becomes thinner',
  wrong: ['Oxygen gas is given off from hydroxide ions', 'Copper is deposited and the anode becomes thicker', 'Sulphate ions are discharged to give sulphur dioxide'],
  sol: r`A copper anode is active: $\ce{Cu -> Cu^2+ + 2e-}$; no gas is given off — option (@K).`,
  d: 2, c: 'application', t: [6],
}));
add('colour-mcq', mcq({
  stem: 'When copper(II) sulphate solution is electrolysed with platinum electrodes, the blue colour of the solution gradually fades. This is because:',
  right: 'Cu²⁺ ions are deposited at the cathode and are not replaced at the inert anode',
  wrong: ['the platinum anode dissolves and forms a colourless solution', 'sulphate ions are discharged at the anode', 'hydrogen is given off at the cathode and dilutes the solution'],
  sol: 'Copper is deposited at the cathode while oxygen, not copper ions, forms at the platinum anode — option (@K).',
  d: 3, c: 'analysis', t: [6],
}));
add('cuanode-ar', ar({
  a: 'In the electrolysis of copper(II) sulphate solution with copper electrodes, the copper anode loses mass.',
  r: 'Copper is below hydrogen in the activity series.',
  key: 'b',
  sol: 'Both statements are true, but the anode loses mass because copper atoms of the active anode lose electrons more easily than any anion and dissolve; R explains why copper (not hydrogen) is deposited at the cathode — option (b).',
  d: 3, c: 'analysis', t: [3, 6],
}));
add('blue-tf', tf({
  stem: 'When copper(II) sulphate solution is electrolysed with copper electrodes, its blue colour gradually fades.',
  key: 'f',
  sol: 'False: Cu²⁺ ions removed at the cathode are replaced by Cu²⁺ ions from the dissolving copper anode, so the colour stays the same. It fades only with an inert (platinum) anode.',
  d: 2, c: 'understanding', t: [6],
}));
add('cuelec-num', num({
  stem: 'How many moles of electrons are needed to deposit 6.4 g of copper on the cathode from copper(II) sulphate solution? (Cu = 64; Cu²⁺ + 2e⁻ → Cu)',
  value: 0.2, tol: 0, unit: 'mol',
  sol: r`Moles of copper $= \frac{6.4}{64} = 0.1$. Each Cu²⁺ ion gains 2 electrons, so electrons $= 0.1 \times 2 = 0.2$ mol.`,
  scheme: [['0.1 mol of copper', 0.5], ['0.2 mol of electrons', 0.5]],
  d: 2, c: 'application', t: [6],
}), () => near((6.4 / 64) * 2, 0.2) || 'electrons');
add('cuanode-short1', short({
  marks: 1,
  stem: 'Write the equation for the reaction at the anode when copper(II) sulphate solution is electrolysed with copper electrodes.',
  model: r`$\ce{Cu -> Cu^2+ + 2e-}$ (the copper anode dissolves).`,
  sol: 'Oxidation of the active anode.',
  scheme: [['Balanced equation with electrons', 1]],
  d: 2, c: 'application', t: [6],
}));
add('cucolour-short2', short({
  marks: 2,
  stem: 'Explain why the blue colour of copper(II) sulphate solution fades when it is electrolysed with platinum electrodes, but not when copper electrodes are used.',
  model: 'With platinum electrodes, Cu²⁺ ions are deposited as copper at the cathode, but the inert anode gives oxygen (from OH⁻), so the Cu²⁺ ions are not replaced and the colour fades. With copper electrodes, the copper anode dissolves, putting back one Cu²⁺ ion for every one removed at the cathode, so the concentration of Cu²⁺, and the colour, stay the same.',
  sol: 'Inert versus active anode.',
  scheme: [['Platinum: Cu²⁺ removed, not replaced', 1], ['Copper: anode replaces Cu²⁺', 1]],
  d: 3, c: 'analysis', t: [6],
}));

// ---------------------------------------------------------------- t07 electroplating and electrorefining
add('silver-mcq', mcq({
  stem: 'A silversmith wants to give a brass bowl an even, firmly attached coat of silver. The best choice of electrolyte is:',
  right: 'sodium argentocyanide solution, which releases Ag⁺ ions slowly',
  wrong: ['silver nitrate solution, which supplies many Ag⁺ ions at once', 'copper(II) sulphate solution', 'dilute sulphuric acid'],
  sol: 'A slow, steady supply of Ag⁺ gives a smooth, even, firm coat; silver nitrate deposits silver too fast — option (@K).',
  d: 2, c: 'understanding', t: [7],
}));
add('plate-mcq', mcq({
  stem: 'A steel bicycle bell is to be nickel-plated. The bell should be made the:',
  right: 'cathode, in a solution of a nickel salt, with a nickel anode',
  wrong: ['anode, in a solution of a nickel salt, with a nickel cathode', 'cathode, in dilute sulphuric acid, with a platinum anode', 'anode, in a solution of an iron salt, with a nickel cathode'],
  sol: 'The article is always the cathode; the plating metal is the anode; the electrolyte contains the plating metal’s ions — option (@K).',
  d: 1, c: 'recall', t: [7],
}));
add('refine-mcq', mcq({
  stem: 'In the electrorefining of copper, the electrolyte used is:',
  right: 'copper(II) sulphate solution acidified with dilute sulphuric acid',
  wrong: ['molten copper(II) oxide', 'sodium argentocyanide solution', 'dilute sulphuric acid alone'],
  sol: 'Acidified copper(II) sulphate supplies Cu²⁺ ions — option (@K).',
  d: 1, c: 'recall', t: [7],
}));
add('mud-mcq', mcq({
  stem: 'A block of impure copper containing small amounts of zinc and silver is used as the anode in the electrorefining of copper. At the end:',
  right: 'zinc remains in the solution as Zn²⁺ ions and silver collects below the anode',
  wrong: ['both zinc and silver are deposited on the cathode', 'zinc collects below the anode and silver remains in solution', 'both zinc and silver remain in the solution as ions'],
  sol: 'Zinc is more reactive than copper: it dissolves but its ions are not discharged. Silver is less reactive: it does not dissolve and falls as anode mud — option (@K).',
  d: 3, c: 'application', t: [3, 7],
}));
add('agno3-ar', ar({
  a: 'Silver nitrate solution is the best electrolyte for silver plating.',
  r: 'Silver nitrate solution contains Ag⁺ ions.',
  key: 'd',
  sol: 'A is false: silver nitrate deposits silver too quickly, giving a rough coat; sodium argentocyanide is used. R is true — option (d).',
  d: 2, c: 'understanding', t: [7],
}));
add('plate-fill', fill({
  stem: 'In electroplating, the article to be plated is always made the ___.',
  acc: [['cathode']],
  sol: 'The **cathode**, so that metal ions are reduced and deposited on it.',
  d: 1, c: 'recall', t: [7],
}));
add('nickel-short1', short({
  marks: 1,
  stem: 'Write the equation for the reaction at the cathode when a brass tap is nickel-plated.',
  model: r`$\ce{Ni^2+ + 2e- -> Ni}$`,
  sol: 'Reduction of nickel ions on the tap.',
  scheme: [['Balanced equation with electrons', 1]],
  d: 1, c: 'application', t: [7],
}));
add('agcathode-short1', short({
  marks: 1,
  stem: 'Write the equation for the reaction at the cathode during the silver plating of a spoon.',
  model: r`$\ce{Ag+ + e- -> Ag}$`,
  sol: 'Reduction of silver ions on the spoon.',
  scheme: [['Balanced equation with electrons', 1]],
  d: 1, c: 'application', t: [7],
}));
add('conditions-short2', short({
  marks: 2,
  stem: 'State two conditions needed to obtain a smooth, even and firm coat in electroplating.',
  model: 'Any two: the article must be thoroughly cleaned; a low current should be passed for a longer time; the electrolyte should release the metal ions slowly (for silver, sodium argentocyanide); the article may be rotated so that it is coated evenly.',
  sol: 'Two valid conditions.',
  scheme: [['First condition', 1], ['Second condition', 1]],
  d: 1, c: 'recall', t: [7],
}));
add('refine-short3', short({
  marks: 3,
  stem: 'For the electrorefining of copper, name (a) the anode and the cathode, and (b) the electrolyte. (c) Write the equation for the reaction at the cathode.',
  model: r`(a) Anode: a block of impure copper. Cathode: a thin sheet of pure copper. (b) Copper(II) sulphate solution acidified with dilute sulphuric acid. (c) $\ce{Cu^2+ + 2e- -> Cu}$.`,
  sol: 'Set-up and cathode equation.',
  scheme: [['(a) anode and cathode', 1], ['(b) electrolyte', 1], ['(c) equation', 1]],
  d: 2, c: 'application', t: [7],
}));

// ---------------------------------------------------------------- the 3-blank completion and matches
add('terms-fill', fill({
  stem: 'Complete each sentence by choosing the correct word from the bracket.\n\n(a) The electrode joined to the positive terminal of the battery is the ___ (anode / cathode).\n\n(b) Ions that move towards the cathode are called ___ (anions / cations).\n\n(c) The loss of electrons is called ___ (oxidation / reduction).',
  acc: [['anode'], ['cations'], ['oxidation']],
  sol: '(a) **anode**; (b) **cations**; (c) **oxidation**.',
  d: 1, c: 'recall', t: [2],
}));
add('products-match', match({
  stem: 'Match each electrolysis in Column A with what happens at the anode in Column B.',
  pairs: [
    ['Molten lead bromide, graphite electrodes', 'Reddish-brown bromine vapour'],
    ['Acidified water, platinum electrodes', 'Colourless oxygen gas'],
    ['Copper(II) sulphate solution, copper anode', 'Anode dissolves; no gas'],
    ['Concentrated sodium chloride solution, graphite anode', 'Greenish-yellow chlorine gas'],
    ['Silver plating with a silver anode', 'Silver dissolves as Ag⁺ ions'],
  ],
  order: [2, 4, 0, 3, 1],
  sol: 'Molten lead bromide → bromine; acidified water → oxygen; copper anode in copper(II) sulphate → copper dissolves, no gas; concentrated brine → chlorine; silver anode → silver dissolves.',
  d: 2, c: 'application', t: [4, 5, 6, 7],
}));
add('classify-match', match({
  stem: 'Match each substance in Column A with its behaviour in Column B.',
  pairs: [
    ['Sodium hydroxide solution', 'Strong electrolyte'],
    ['Ethanoic acid solution', 'Weak electrolyte'],
    ['Sugar solution', 'Non-electrolyte'],
    ['Copper wire', 'Metallic conductor'],
  ],
  order: [1, 3, 0, 2],
  sol: 'NaOH solution → strong electrolyte; ethanoic acid → weak electrolyte; sugar solution → non-electrolyte; copper wire → metallic conductor.',
  d: 1, c: 'understanding', t: [1],
}));

// ---------------------------------------------------------------- 10-mark structured questions
add('basics-long', long({
  stem: '(a) Define an electrolyte and a non-electrolyte. [2]\n\n(b) Classify each as a strong electrolyte, a weak electrolyte or a non-electrolyte, and name the particles it contains: (i) dilute sulphuric acid, (ii) ethanoic acid, (iii) alcohol, (iv) molten sodium chloride. [2]\n\n(c) State the three factors that decide which ion is discharged at an electrode. [3]\n\n(d) Name the product at the cathode when each of these is electrolysed with platinum electrodes, giving a reason: (i) silver nitrate solution, (ii) dilute sodium sulphate solution, (iii) copper(II) chloride solution. [3]',
  model: '(a) An electrolyte is a compound that conducts electricity in the molten state or in aqueous solution and is decomposed by it. A non-electrolyte does not conduct in the molten state or in solution (it contains molecules only).\n\n(b) (i) Strong electrolyte: ions only. (ii) Weak electrolyte: ions and molecules. (iii) Non-electrolyte: molecules only. (iv) Strong electrolyte: ions only.\n\n(c) The position of the ion (metal) in the activity series; the concentration of the ion; the nature of the electrode (active or inert).\n\n(d) (i) Silver: Ag⁺ is below hydrogen and is discharged easily. (ii) Hydrogen: Na⁺ is high in the series and is not discharged; H⁺ from water is. (iii) Copper: Cu²⁺ is below hydrogen and is discharged in preference to H⁺.',
  sol: 'Definitions; classification; three factors; activity series.',
  scheme: [['(a) electrolyte', 1], ['(a) non-electrolyte', 1], ['(b) (i) and (ii)', 1], ['(b) (iii) and (iv)', 1], ['(c) activity series', 1], ['(c) concentration', 1], ['(c) nature of electrode', 1], ['(d)(i)', 1], ['(d)(ii)', 1], ['(d)(iii)', 1]],
  d: 3, c: 'application', t: [1, 3],
}));
add('pbbr2-long', long({
  stem: '(a) Give a reason why (i) lead bromide must be molten for electrolysis and (ii) a silica crucible is used. [2]\n\n(b) Write the equations for the reactions at the cathode and at the anode with graphite electrodes. [2]\n\n(c) State the observation at each electrode, and say which electrode reaction is an oxidation, with a reason. [3]\n\n(d) In one experiment, 4.14 g of lead is collected at the cathode. Calculate (i) the moles of lead, (ii) the moles of electrons that passed and (iii) the mass of bromine given off. (Pb = 207, Br = 80) [3]',
  model: r`(a) (i) In the solid the ions are held in fixed positions; in the melt they are free to move. (ii) Silica is not attacked by molten lead bromide and withstands the high temperature.

(b) Cathode: $\ce{Pb^2+ + 2e- -> Pb}$. Anode: $\ce{2Br- -> Br2 + 2e-}$.

(c) Cathode: silvery grey molten lead collects at the bottom. Anode: reddish-brown fumes of bromine. The anode reaction is an oxidation, because bromide ions lose electrons.

(d) (i) Moles of lead $= \frac{4.14}{207} = 0.02$. (ii) Electrons $= 0.02 \times 2 = 0.04$ mol. (iii) Bromine: 1 mol of Br₂ forms per mole of lead, so 0.02 mol; mass $= 0.02 \times 160 = 3.2$ g.`,
  sol: 'Mobile ions; apparatus; electrode equations; mole ratio.',
  scheme: [['(a)(i)', 1], ['(a)(ii)', 1], ['(b) cathode', 1], ['(b) anode', 1], ['(c) cathode observation', 1], ['(c) anode observation', 1], ['(c) oxidation with reason', 1], ['(d)(i) 0.02 mol', 1], ['(d)(ii) 0.04 mol', 1], ['(d)(iii) 3.2 g', 1]],
  d: 3, c: 'application', t: [2, 4],
}), () => near(4.14 / 207, 0.02) && near(0.02 * 160, 3.2) || 'pb');
add('water-long', long({
  stem: '(a) Explain why pure water conducts electricity very poorly and why dilute sulphuric acid is added before electrolysis. [2]\n\n(b) Name the ions present in acidified water, and state which ion is discharged at each electrode. [2]\n\n(c) Write the equations for the reactions at the cathode and at the anode, and give a test for the gas collected at each electrode. [3]\n\n(d) (i) Why are platinum electrodes used? (ii) What happens to the concentration of the sulphuric acid as electrolysis continues? (iii) If 30 cm³ of hydrogen is collected, what volume of oxygen is collected at the same temperature and pressure? [3]',
  model: r`(a) Pure water is a very weak electrolyte: it is ionised only very slightly, so it has very few ions. The acid is a strong electrolyte and supplies many ions, so the solution conducts.

(b) H⁺, OH⁻ and SO₄²⁻. Cathode: H⁺ is discharged. Anode: OH⁻ is discharged in preference to SO₄²⁻.

(c) Cathode: $\ce{4H+ + 4e- -> 2H2}$; hydrogen burns with a pop when a burning splint is brought near. Anode: $\ce{4OH- -> 2H2O + O2 + 4e-}$; oxygen relights a glowing splint.

(d) (i) Platinum is inert: it is not oxidised at the anode or attacked by oxygen. (ii) The acid is not used up while water is removed, so the acid becomes more concentrated. (iii) Oxygen $= 30 \div 2 = 15$ cm³.`,
  sol: 'Ions; selective discharge; tests; ratio 2 : 1.',
  scheme: [['(a) few ions in water', 1], ['(a) acid supplies ions', 1], ['(b) ions present', 1], ['(b) ions discharged', 1], ['(c) cathode equation and test', 1.5], ['(c) anode equation and test', 1.5], ['(d)(i)', 1], ['(d)(ii)', 1], ['(d)(iii) 15 cm³', 1]],
  d: 3, c: 'application', t: [5],
}), () => 30 / 2 === 15 || 'volume');
add('copper-long', long({
  stem: 'Two cells, A and B, each contain copper(II) sulphate solution. Cell A has copper electrodes and cell B has platinum electrodes.\n\n(a) Name the ions present in copper(II) sulphate solution. [2]\n\n(b) Write the cathode reaction, which is the same in both cells, and state what is observed at the cathode. [2]\n\n(c) For cell A, write the anode reaction and state what happens to (i) the mass of the anode and (ii) the colour of the solution. [3]\n\n(d) For cell B, write the anode reaction and state (i) what is observed at the anode, (ii) what happens to the colour of the solution and (iii) what substance is left in the solution at the end. [3]',
  model: r`(a) Cu²⁺ and SO₄²⁻ from the salt; H⁺ and OH⁻ from water.

(b) $\ce{Cu^2+ + 2e- -> Cu}$; a reddish-brown (pink) layer of copper forms on the cathode.

(c) $\ce{Cu -> Cu^2+ + 2e-}$. (i) The anode loses mass (it dissolves). (ii) The blue colour stays the same, because Cu²⁺ ions are replaced as fast as they are removed.

(d) $\ce{4OH- -> 2H2O + O2 + 4e-}$. (i) Bubbles of a colourless gas, oxygen. (ii) The blue colour fades, because Cu²⁺ ions are removed and not replaced. (iii) Sulphuric acid (H⁺ and SO₄²⁻ ions remain).`,
  sol: 'Active anode versus inert anode.',
  scheme: [['(a)', 2], ['(b) equation', 1], ['(b) observation', 1], ['(c) equation', 1], ['(c)(i)', 1], ['(c)(ii)', 1], ['(d) equation', 1], ['(d)(i) and (ii)', 1], ['(d)(iii)', 1]],
  d: 3, c: 'analysis', t: [3, 6],
}));
add('plating-long', long({
  stem: '(a) A brass tap is to be nickel-plated. Name the anode, the cathode and the electrolyte. [3]\n\n(b) For silver plating a spoon: (i) name the electrolyte used and explain why silver nitrate is not used; (ii) write the reactions at the cathode and at the anode. [3]\n\n(c) Impure copper containing zinc, iron, silver and gold is refined by electrolysis. Name the anode, the cathode and the electrolyte, write the anode reaction, and state what happens to (i) the zinc and iron and (ii) the silver and gold. [4]',
  model: r`(a) Anode: a plate of pure nickel. Cathode: the cleaned brass tap. Electrolyte: nickel sulphate solution.

(b) (i) Sodium argentocyanide solution. Silver nitrate supplies many Ag⁺ ions at once, so silver is deposited too fast as a rough, uneven coat that does not stick; the argentocyanide releases Ag⁺ slowly, giving a smooth, even, firm coat. (ii) Cathode: $\ce{Ag+ + e- -> Ag}$. Anode: $\ce{Ag -> Ag+ + e-}$.

(c) Anode: the impure copper; cathode: a thin sheet of pure copper; electrolyte: copper(II) sulphate solution acidified with dilute sulphuric acid. Anode: $\ce{Cu -> Cu^2+ + 2e-}$. (i) Zinc and iron, more reactive than copper, dissolve and remain in the solution as ions (they are not discharged at the cathode). (ii) Silver and gold, less reactive, do not dissolve and collect below the anode as anode mud.`,
  sol: 'Plating rules; argentocyanide; refining and fate of impurities.',
  scheme: [['(a) anode', 1], ['(a) cathode', 1], ['(a) electrolyte', 1], ['(b)(i) electrolyte and reason', 1.5], ['(b)(ii) both reactions', 1.5], ['(c) anode, cathode, electrolyte', 1.5], ['(c) anode reaction', 0.5], ['(c)(i) zinc and iron', 1], ['(c)(ii) silver and gold', 1]],
  d: 3, c: 'application', t: [7],
}));
