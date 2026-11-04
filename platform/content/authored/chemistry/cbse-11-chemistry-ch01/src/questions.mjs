// ch01 Some Basic Concepts of Chemistry — question bank. MCQ keys are placed by the builder (balanced); AR keys planned: a b c d a c.
// Every numerical is computed here, interpolated into stem and solution, and re-solved by the check passed to add().
import { mk, add, r, near, dec, sci } from './lib.mjs';

const { mcq, ar, tf, fill, match, num, short, long, part } = mk;
const NA = 6.022e23;

// ---------------------------------------------------------------- t01 measurement, significant figures
add('sf-chk', mcq({
  stem: 'A student multiplies a length of 4.56 cm by a width of 1.4 cm. The area should be reported as:',
  right: r`$6.4\ \text{cm}^2$`,
  wrong: [r`$6.38\ \text{cm}^2$`, r`$6.384\ \text{cm}^2$`, r`$6\ \text{cm}^2$`],
  sol: r`In multiplication the answer carries the fewest significant figures of the data. The width 1.4 has two, so $4.56 \times 1.4 = 6.384 \approx 6.4$, in cm² — option (@K). (@1) and (@2) keep too many figures, and (@3) keeps too few.`,
  d: 2, c: 'understanding', t: [1],
}), () => near(4.56 * 1.4, 6.384, 1e-6) || 'area');
add('sf-count-mcq', mcq({
  stem: r`The numbers of significant figures in $0.0305$ and in $1.200 \times 10^{3}$ are, respectively:`,
  right: '3 and 4',
  wrong: ['4 and 4', '3 and 3', '5 and 4'],
  sol: 'Leading zeros of 0.0305 are not significant, but the zero between 3 and 5 is: three significant figures. In 1.200 × 10³ the trailing zeros after the decimal point count, so there are four — option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
add('prec-acc-mcq', mcq({
  stem: 'A student weighs a 5.000 g standard mass four times and records 5.31, 5.30, 5.31 and 5.30 g. The balance readings are:',
  right: 'precise but not accurate',
  wrong: ['accurate but not precise', 'both precise and accurate', 'neither precise nor accurate'],
  sol: 'The four readings agree closely with each other (precise) but all lie about 0.3 g above the true value of 5.000 g (not accurate) — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('prefix-mcq', mcq({
  stem: r`A pipette delivers a volume of $2.50 \times 10^{-5}\ \text{m}^3$. In millilitres this is:`,
  right: r`$25.0\ \text{mL}$`,
  wrong: [r`$2.50\ \text{mL}$`, r`$250\ \text{mL}$`, r`$0.0250\ \text{mL}$`],
  sol: r`$1\ \text{m}^3 = 10^{6}\ \text{mL}$, so $2.50 \times 10^{-5} \times 10^{6} = 25.0$ mL — option (@K).`,
  d: 2, c: 'understanding', t: [1],
}), () => near(2.5e-5 * 1e6, 25.0, 1e-9) || 'prefix');
add('sf-ar', ar({
  a: 'The number 0.0450 has three significant figures.',
  r: 'Zeros that only locate the decimal point at the start of a number are not significant.',
  key: 'a',
  sol: 'Leading zeros are not significant but the 0 after 45 is: 4, 5 and the final 0 are the three significant figures. R is the rule that explains A — option (a).',
  d: 1, c: 'understanding', t: [1],
}));
add('sf-tf', tf({
  stem: 'The number 100.0 has one significant figure.',
  key: 'f',
  sol: 'False. The zeros are trailing zeros after a decimal point, so all four digits are significant: 100.0 has four significant figures.',
  d: 1, c: 'understanding', t: [1],
}));
add('precision-fill', fill({
  stem: 'Closeness of repeated measurements to one another is called ___.',
  acc: [['precision']],
  sol: 'Agreement between repeated readings is **precision**; agreement with the true value is accuracy.',
  d: 1, c: 'recall', t: [1],
}));
add('density-num', (() => {
  const m = 12.5, V = 3.4;
  const rho = m / V;
  const ans = Number(rho.toPrecision(2));
  return num({
    stem: r`A rectangular brass block has a mass of $12.50\ \text{g}$. Its volume, found by water displacement, is $3.4\ \text{cm}^3$. Report its density, in g cm⁻³, to the correct number of significant figures.`,
    value: ans, tol: 0.05, unit: 'g cm⁻³',
    sol: r`$\rho = m / V = 12.50 / 3.4 = ${dec(ans, 2)}$ g cm⁻³ (calculator value ${rho.toFixed(3)}); the volume has only two significant figures, so the answer is quoted to two.`,
    scheme: [['Divides mass by volume', 1], ['Rounds to two significant figures: 3.7 g cm⁻³', 1]],
    marks: 2, d: 2, c: 'application', t: [1],
  });
})(), (q) => near(12.5 / 3.4, 3.676, 0.001) && q.answer.value === 3.7 || 'density');
add('sf-add-short', short({
  marks: 2,
  stem: 'A chemist adds 18.25 g, 4.1 g and 0.378 g of three solids in a beaker. Report the total mass with the correct significant figures and state the rule you used.',
  model: r`The sum is $18.25 + 4.1 + 0.378 = 22.728$ g. In addition, the result keeps as many decimal places as the least precise term; 4.1 g has one decimal place, so the total is reported as **22.7 g**.`,
  sol: 'Sum, then round to the fewest decimal places (one).',
  scheme: [['Correct sum 22.728 g', 1], ['Rounded to 22.7 g with the decimal-place rule', 1]],
  d: 2, c: 'application', t: [1],
}), () => near(18.25 + 4.1 + 0.378, 22.728, 1e-6) || 'sum');
add('precision-acc-short', short({
  marks: 2,
  stem: 'A student weighs a 10.00 g standard three times and gets 9.52 g, 9.51 g and 9.52 g. Is the balance precise? Is it accurate? Explain with reference to the data.',
  model: 'The balance is precise because the three readings agree within 0.01 g. It is not accurate, because the mean of about 9.52 g differs from the true value of 10.00 g by nearly 0.5 g. A consistent error, such as a zero error or a poor calibration, is likely.',
  sol: 'Precision is agreement among readings; accuracy is agreement with the true value.',
  scheme: [['Precise: readings agree closely', 1], ['Not accurate: mean far from 10.00 g', 1]],
  d: 2, c: 'application', t: [1],
}));
add('sf-long', long({
  stem: '(a) Distinguish between accuracy and precision, giving an example for each case: precise but inaccurate, and accurate but imprecise.\n\n(b) State the rules for counting zeros as significant figures, with one example each.\n\n(c) Evaluate $\\dfrac{4.20 \\times 0.0550}{1.8}$ and report the answer with the correct number of significant figures.',
  model: r`Accuracy is closeness to the true value; precision is closeness of repeated readings to each other. Readings 5.31, 5.30, 5.31 g for a 5.000 g mass are precise but inaccurate; readings 4.8, 5.2, 5.0 g are accurate on average but scattered. Zeros between non-zero digits count (2.0305 has five significant figures); leading zeros do not (0.00450 has three); trailing zeros count after a decimal point (12.00 has four) and are ambiguous in a whole number such as 1500. For (c), $4.20 \times 0.0550 = 0.231$ and $0.231 / 1.8 = 0.128$; 1.8 has two significant figures, so the answer is **0.13**.`,
  sol: 'Definitions with examples; three zero rules; the quotient to two significant figures.',
  scheme: [['(a) Two definitions with examples', 1.5], ['(b) Three zero rules with examples', 1.5], ['(c) Correct value 0.128 and rounding to 0.13', 2]],
  d: 3, c: 'application', t: [1],
}), () => near(4.2 * 0.055 / 1.8, 0.1283, 0.001) || 'quotient');

// ---------------------------------------------------------------- t02 laws of chemical combination
add('laws-chk', mcq({
  stem: 'Two samples of copper oxide from different sources are analysed. A 3.97 g sample yields 3.17 g of copper; a 1.19 g sample yields 0.95 g of copper. These data illustrate the law of:',
  right: 'constant proportions',
  wrong: ['multiple proportions', 'conservation of mass', 'gaseous volumes'],
  sol: r`Copper fraction $= 3.17 / 3.97 = 0.798$ and $0.95 / 1.19 = 0.798$: the same composition in two samples of one compound — constant proportions, option (@K). Multiple proportions (@1) needs two different compounds of the same elements.`,
  d: 2, c: 'application', t: [2],
}), () => near(3.17 / 3.97, 0.95 / 1.19, 0.005) || 'fraction');
add('conservation-mcq', mcq({
  stem: 'In an experiment 1.70 g of silver nitrate reacts with 0.585 g of sodium chloride, forming 1.435 g of silver chloride and sodium nitrate. By the law of conservation of mass, the mass of sodium nitrate formed is:',
  right: '0.850 g',
  wrong: ['2.285 g', '3.720 g', '1.115 g'],
  sol: r`Mass of reactants $= 1.70 + 0.585 = 2.285$ g. Mass of products must be the same, so sodium nitrate $= 2.285 - 1.435 = 0.850$ g — option (@K). (@1) is the total mass of reactants; (@2) adds all three given masses.`,
  d: 2, c: 'application', t: [2],
}), () => near(1.7 + 0.585 - 1.435, 0.85, 1e-6) || 'mass');
add('multiple-mcq', mcq({
  stem: 'Copper forms two oxides. In the first, 1.00 g of copper combines with 0.126 g of oxygen; in the second, 1.00 g of copper combines with 0.252 g of oxygen. The ratio of the masses of oxygen, 1 : 2, illustrates the law of:',
  right: 'multiple proportions',
  wrong: ['constant proportions', 'conservation of mass', 'reciprocal proportions'],
  sol: r`With the mass of copper fixed, the oxygen masses $0.126 : 0.252 = 1 : 2$ are in a simple whole-number ratio: law of multiple proportions, option (@K). The two compounds differ (Cu₂O and CuO), so constant proportions (@1) does not apply.`,
  d: 2, c: 'application', t: [2],
}), () => near(0.252 / 0.126, 2, 1e-6) || 'ratio');
add('gaylussac-mcq', mcq({
  stem: r`$\ce{2NO + O2 -> 2NO2}$. 40 mL of nitric oxide is mixed with 40 mL of oxygen and allowed to react completely. All volumes are measured at the same temperature and pressure. The total volume of gas at the end is:`,
  right: '60 mL',
  wrong: ['80 mL', '40 mL', '100 mL'],
  sol: r`By Gay-Lussac's law the volumes react as $2 : 1 : 2$. 40 mL of NO uses 20 mL of O₂ and gives 40 mL of NO₂, leaving $40 - 20 = 20$ mL of O₂. Total $= 40 + 20 = 60$ mL — option (@K).`,
  d: 3, c: 'application', t: [2],
}), () => 40 + (40 - 20) === 60 || 'volume');
add('avogadro-mcq', mcq({
  stem: 'Two flasks of equal volume at the same temperature and pressure contain oxygen (O₂) and ozone (O₃) respectively. Which statement is correct?',
  right: 'They hold the same number of molecules, but the ozone flask has more atoms.',
  wrong: ['They hold the same number of atoms, but the ozone flask has more molecules.', 'They hold the same number of molecules and the same number of atoms.', 'They hold the same mass of gas.'],
  sol: 'By Avogadro’s law equal volumes contain equal numbers of molecules. Each O₃ molecule has three atoms and each O₂ molecule two, so ozone has 1.5 times as many atoms — option (@K). (@3) is wrong because ozone molecules are heavier.',
  d: 3, c: 'analysis', t: [2],
}));
add('laws-match', match({
  stem: 'Match each law of chemical combination with the observation that illustrates it.',
  pairs: [
    ['Law of conservation of mass', 'A sealed tube weighs 4.00 g before and after a reaction in it'],
    ['Law of constant proportions', 'Sodium chloride from sea water and from rock salt both contain 39.3 % sodium'],
    ['Law of multiple proportions', 'Sulfur forms two oxides in which 1.00 g of sulfur combines with 1.00 g and 1.50 g of oxygen'],
    ['Gay-Lussac’s law', '20 mL of carbon monoxide burns in 10 mL of oxygen to give 20 mL of carbon dioxide'],
  ],
  order: [1, 3, 0, 2],
  sol: 'Equal mass before and after is conservation; the same composition in two sources is constant proportions; 1.00 : 1.50 = 2 : 3 is multiple proportions; the volume ratio 2 : 1 : 2 is Gay-Lussac’s law.',
  d: 2, c: 'understanding', t: [2],
}));
add('dalton-short', short({
  marks: 2,
  stem: 'Explain how Dalton’s atomic theory accounts for (a) the law of conservation of mass and (b) the law of constant proportions.',
  model: 'Dalton said atoms cannot be created or destroyed in a reaction but only rearranged, so the total number of atoms, and therefore the total mass, stays the same. He also said a compound forms from atoms in a fixed whole-number ratio; each atom has a fixed mass, so the elements always appear in the same mass ratio.',
  sol: 'Atoms conserved; fixed atom ratio gives fixed mass ratio.',
  scheme: [['Atoms only rearranged: mass conserved', 1], ['Fixed atom ratio gives fixed mass ratio', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('avogadro-short', short({
  marks: 2,
  stem: 'State Avogadro’s law. At a certain temperature and pressure, 2.0 L of argon contains $5.0 \\times 10^{22}$ atoms. How many molecules does 6.0 L of carbon monoxide contain at the same temperature and pressure?',
  model: r`Equal volumes of gases at the same temperature and pressure contain equal numbers of molecules (or atoms for a monatomic gas). The volume is three times as large, so the number of particles is three times as large: $3 \times 5.0 \times 10^{22} = 1.5 \times 10^{23}$ molecules.`,
  sol: 'Statement, then scale the number with the volume.',
  scheme: [['Statement of the law', 1], ['Answer 1.5 × 10²³ with reason', 1]],
  d: 2, c: 'application', t: [2],
}), () => near(3 * 5.0e22, 1.5e23, 1e-9) || 'avogadro');
add('tin-case', mk.case({
  passage: r`A teacher gives the class mass data for two chlorides of tin, X and Y, prepared separately in the laboratory.

| Compound | Mass of tin / g | Mass of chlorine / g |
|---|---|---|
| X | 1.187 | 0.710 |
| Y | 1.187 | 1.420 |

A second sample of compound X prepared by another group contains 2.374 g of tin and 1.420 g of chlorine. (Atomic masses: Sn = 118.7, Cl = 35.5)`,
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'The two compounds X and Y illustrate the law of:',
      right: 'multiple proportions',
      wrong: ['constant proportions', 'conservation of mass', 'Avogadro’s law'],
      sol: r`They are two different compounds of the same elements. For a fixed mass of tin, the masses of chlorine are $0.710 : 1.420 = 1 : 2$ — multiple proportions, option (@K).`,
      d: 2, c: 'application', t: [2],
    })),
    part('b', short({
      marks: 1,
      stem: 'Write the formulae of X and Y.',
      model: 'X is SnCl₂ and Y is SnCl₄.',
      sol: r`$1.187 / 118.7 = 0.0100$ mol Sn; $0.710 / 35.5 = 0.0200$ mol Cl for X and $1.420 / 35.5 = 0.0400$ mol for Y, giving 1 : 2 and 1 : 4.`,
      scheme: [['SnCl₂ and SnCl₄', 1]],
      d: 2, c: 'application', t: [2, 4],
    })),
    part('c', short({
      marks: 2,
      stem: 'Show that the second sample of X obeys the law of constant proportions.',
      model: r`For the first sample, Cl : Sn $= 0.710 / 1.187 = 0.598$. For the second, $1.420 / 2.374 = 0.598$. The two samples of compound X have the same mass ratio, so the law of constant proportions holds.`,
      sol: 'Compare the mass ratios of the two samples.',
      scheme: [['Both ratios worked out (0.598)', 1], ['Conclusion: same ratio, law obeyed', 1]],
      d: 2, c: 'application', t: [2],
    }), [
      short({
        marks: 2, wl: null,
        stem: 'Find the mass of chlorine that would combine with 3.561 g of tin to give compound Y, and state which law you used.',
        model: r`Y has Cl : Sn $= 1.420 / 1.187 = 1.196$ by mass, so 3.561 g of tin combines with $1.196 \times 3.561 = 4.26$ g of chlorine, using the law of constant proportions.`,
        sol: 'Scale the fixed ratio of Y.',
        scheme: [['4.26 g of chlorine', 1], ['Constant proportions named', 1]],
        d: 3, c: 'application', t: [2],
      }),
    ]),
  ],
}), null);
add('laws-long', long({
  stem: '(a) State the law of multiple proportions and the law of constant proportions.\n\n(b) Sulfur forms two oxides. In the first, 2.00 g of sulfur combines with 2.00 g of oxygen; in the second, 2.00 g of sulfur combines with 3.00 g of oxygen. Show that the data obey the law of multiple proportions and identify the formulae of the oxides (S = 32, O = 16).\n\n(c) How does Dalton’s theory explain this law?',
  model: r`Constant proportions: a pure compound always contains the same elements in the same mass ratio. Multiple proportions: when two elements form more than one compound, the masses of one that combine with a fixed mass of the other are in a simple whole-number ratio. In (b) the oxygen masses for 2.00 g of sulfur are 2.00 and 3.00 g, a ratio of $2 : 3$. Moles: $2.00 / 32 = 0.0625$ mol S; $2.00 / 16 = 0.125$ mol O gives SO₂, and $3.00 / 16 = 0.1875$ mol O gives SO₃. Dalton's theory says atoms combine in whole-number ratios, so for one sulfur atom the number of oxygen atoms can only change in whole numbers (two or three), giving a simple mass ratio.`,
  sol: 'Two statements; ratio 2 : 3 and moles of atoms; whole-number atoms explain the law.',
  scheme: [['(a) Both laws stated', 1.5], ['(b) Ratio 2 : 3 and formulae SO₂, SO₃', 2], ['(c) Whole-number atoms explain it', 1.5]],
  d: 3, c: 'application', t: [2],
}), () => near(2 / 32 * 2, 2 / 16, 1e-9) && near(3 / 16, 2 / 32 * 3, 1e-9) || 'sulfur oxides');
add('p-cl-num', (() => {
  const pI = 22.5, pII = 14.9;
  const clI = (100 - pI) / pI;
  const clII = (100 - pII) / pII;
  const ratio = clII / clI;
  return num({
    stem: r`Two chlorides of phosphorus, I and II, contain ${pI} % and ${pII} % phosphorus by mass respectively. Find the ratio of the mass of chlorine that combines with 1.00 g of phosphorus in II to that in I. (Give the ratio as a decimal; it is close to a simple fraction.)`,
    value: Number(ratio.toFixed(2)), tol: 0.02, unit: null,
    sol: r`Chlorine per gram of phosphorus: I $= 77.5 / 22.5 = ${dec(clI, 3)}$ g; II $= 85.1 / 14.9 = ${dec(clII, 3)}$ g. Ratio $= ${dec(clII, 3)} / ${dec(clI, 3)} = ${ratio.toFixed(2)}$, close to $5 : 3 = 1.67$ — a simple ratio, as the law of multiple proportions requires.`,
    scheme: [['Mass of Cl per gram of P in each chloride', 1], ['Ratio 1.66, close to 5 : 3', 1]],
    marks: 2, d: 3, c: 'application', t: [2],
  });
})(), (q) => near((85.1 / 14.9) / (77.5 / 22.5), 1.658, 0.002) && q.answer.value === 1.66 || 'ratio');

// ---------------------------------------------------------------- t03 atomic mass and the mole
add('mole-chk', mcq({
  stem: 'The number of molecules in 3.40 g of hydrogen sulfide, $\\ce{H2S}$ ($M = 34.0$ g mol⁻¹), is:',
  right: r`$6.0 \times 10^{22}$`,
  wrong: [r`$6.0 \times 10^{21}$`, r`$6.0 \times 10^{23}$`, r`$2.0 \times 10^{24}$`],
  sol: r`$n = 3.40 / 34.0 = 0.100$ mol, and $N = 0.100 \times 6.022 \times 10^{23} = 6.0 \times 10^{22}$ — option (@K). (@2) treats 3.40 g as one mole; (@3) multiplies 3.40 by the Avogadro constant.`,
  d: 2, c: 'application', t: [3],
}), () => near(3.4 / 34.0 * NA, 6.0e22, 0.005) || 'molecules');
add('avg-mass-mcq', mcq({
  stem: 'Natural copper has two isotopes: copper-63 (mass 62.93 u, abundance 69.2 %) and copper-65 (mass 64.93 u, abundance 30.8 %). Its average atomic mass is:',
  right: '63.55 u',
  wrong: ['63.93 u', '62.93 u', '64.93 u'],
  sol: r`$0.692 \times 62.93 + 0.308 \times 64.93 = 43.55 + 20.00 = 63.55$ u — option (@K). (@1) is the simple mean of the two masses, which ignores abundance.`,
  d: 3, c: 'application', t: [3],
}), () => near(0.692 * 62.93 + 0.308 * 64.93, 63.55, 0.0005) || 'average');
add('molar-mass-mcq', mcq({
  stem: 'The formula mass of calcium phosphate, $\\ce{Ca3(PO4)2}$ (Ca = 40, P = 31, O = 16), is:',
  right: '310',
  wrong: ['246', '342', '278'],
  sol: r`$3 \times 40 + 2 \times 31 + 8 \times 16 = 120 + 62 + 128 = 310$ — option (@K). (@1) counts only four oxygen atoms instead of eight.`,
  d: 2, c: 'understanding', t: [3],
}), () => 3 * 40 + 2 * 31 + 8 * 16 === 310 || 'mass');
add('atoms-mcq', mcq({
  stem: 'Which of the following samples contains the greatest number of atoms?',
  right: '0.20 mol of ethane, C₂H₆',
  wrong: ['0.30 mol of white phosphorus, P₄', '0.50 mol of sulfur dioxide, SO₂', '1.0 mol of neon'],
  sol: r`Atoms $=$ moles $\times$ atoms per molecule: ethane $0.20 \times 8 = 1.6$ mol; P₄ $0.30 \times 4 = 1.2$ mol; SO₂ $0.50 \times 3 = 1.5$ mol; neon $1.0 \times 1 = 1.0$ mol. The largest is ethane — option (@K).`,
  d: 3, c: 'analysis', t: [3],
}), () => 0.2 * 8 > Math.max(0.3 * 4, 0.5 * 3, 1.0) || 'atoms');
add('mass-unit-ar', ar({
  a: 'The molar mass of a compound in g mol⁻¹ and its molecular mass in u have the same numerical value.',
  r: 'One mole of any substance contains $6.022 \\times 10^{23}$ elementary entities.',
  key: 'b',
  sol: 'Both statements are true, but R is not the reason: the numerical equality arises because 1 u is defined so that one mole of atoms of mass M u weighs M g, not from the number of entities itself — option (b).',
  d: 3, c: 'analysis', t: [3],
}));
add('cl-ar', ar({
  a: 'The average atomic mass of chlorine is not a whole number.',
  r: 'Individual chlorine atoms have fractional masses.',
  key: 'c',
  sol: 'A is true: 35.45 u. R is false: each isotope has a mass very close to a whole number (35 or 37). The average is fractional because it is weighted by the abundance of the two isotopes — option (c).',
  d: 2, c: 'understanding', t: [3],
}));
add('avogadro-fill', fill({
  stem: 'The number of entities in one mole of a substance, $6.022 \\times 10^{23}$, is called the ___ constant.',
  acc: [['Avogadro', 'Avogadro’s', 'Avogadro\'s']],
  sol: 'It is the **Avogadro** constant, $N_\\text{A}$.',
  d: 1, c: 'recall', t: [3],
}));
add('aspirin-num', (() => {
  const mg = 325, M = 180.0;
  const N = (mg / 1000 / M) * NA;
  const ans = Number((N / 1e21).toFixed(2));
  return num({
    stem: r`An aspirin tablet contains $325\ \text{mg}$ of aspirin, $\ce{C9H8O4}$. Calculate the number of molecules of aspirin in the tablet, in units of $10^{21}$. (C = 12.0, H = 1.0, O = 16.0; $N_\text{A} = 6.022 \times 10^{23}\ \text{mol}^{-1}$)`,
    value: ans, tol: 0.01, unit: '× 10²¹ molecules',
    sol: r`$M = 9(12.0) + 8(1.0) + 4(16.0) = 180.0$ g mol⁻¹. $n = 0.325 / 180.0 = ${(mg / 1000 / M * 1e3).toFixed(2)} \times 10^{-3}$ mol. $N = 0.325 / 180.0 \times 6.022 \times 10^{23} = ${ans.toFixed(2)} \times 10^{21}$ molecules, so in units of $10^{21}$ the answer is $N / 10^{21} = ${ans.toFixed(2)}$.`,
    scheme: [['Molar mass 180.0 g mol⁻¹', 1], ['Moles from mass', 1], ['Multiplies by N_A: 1.09 × 10²¹', 1]],
    marks: 3, d: 2, c: 'application', t: [3],
  });
})(), (q) => near(0.325 / 180.0 * NA / 1e21, 1.087, 0.002) && q.answer.value === 1.09 || 'aspirin');
add('weighted-short', short({
  marks: 2,
  stem: 'The three isotopes of magnesium have masses very close to 24, 25 and 26 u, yet the atomic mass of magnesium is 24.3 u. Explain why it is not a whole number and why it lies close to 24.',
  model: 'The atomic mass is the average over the naturally occurring isotopes, weighted by their abundance, so it need not be a whole number. Magnesium-24 is by far the most abundant isotope (about 79 %), so the weighted average lies close to 24 u and not midway between 24 and 26.',
  sol: 'Weighted average; the lightest isotope is most abundant.',
  scheme: [['Weighted average of isotopes', 1], ['Most abundant isotope is magnesium-24', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('mole-short', short({
  marks: 3,
  stem: 'A tablet of sodium hydrogencarbonate, $\\ce{NaHCO3}$ ($M = 84.0$ g mol⁻¹), has a mass of 1.68 g. Calculate (a) the amount in moles, (b) the number of formula units and (c) the number of oxygen atoms. ($N_\\text{A} = 6.022 \\times 10^{23}\\ \\text{mol}^{-1}$)',
  model: r`(a) The amount is the mass divided by the molar mass: $n = 1.68 / 84.0 = 0.0200$ mol. (b) The number of formula units is the amount times the Avogadro constant: $0.0200 \times 6.022 \times 10^{23} = 1.20 \times 10^{22}$. (c) Each formula unit of sodium hydrogencarbonate contains three oxygen atoms, so the number of oxygen atoms is $3 \times 1.20 \times 10^{22} = 3.61 \times 10^{22}$.`,
  sol: 'Moles, then formula units, then atoms per formula unit.',
  scheme: [['(a) 0.0200 mol', 1], ['(b) 1.20 × 10²² formula units', 1], ['(c) 3.61 × 10²² oxygen atoms', 1]],
  d: 2, c: 'application', t: [3],
}), () => near(1.68 / 84.0, 0.02, 1e-9) && near(0.02 * NA, 1.2044e22, 1e-3) && near(3 * 0.02 * NA, 3.613e22, 1e-3) || 'nahco3');

// ---------------------------------------------------------------- t04 composition and formulae
add('emp-chk', mcq({
  stem: 'A compound has the empirical formula $\\ce{NO2}$ and a molar mass of $92.0\\ \\text{g mol}^{-1}$ (N = 14.0, O = 16.0). Its molecular formula is:',
  right: r`$\ce{N2O4}$`,
  wrong: [r`$\ce{NO2}$`, r`$\ce{N2O3}$`, r`$\ce{N4O8}$`],
  sol: r`Empirical formula mass $= 14.0 + 2(16.0) = 46.0$; $n = 92.0 / 46.0 = 2$, so the molecular formula is $\ce{N2O4}$ — option (@K).`,
  d: 2, c: 'application', t: [4],
}), () => near(92.0 / 46.0, 2, 1e-9) || 'n');
add('emp-mcq', mcq({
  stem: 'A salt contains 29.1 % sodium, 40.5 % sulfur and 30.4 % oxygen by mass (Na = 23, S = 32, O = 16). Its empirical formula is:',
  right: r`$\ce{Na2S2O3}$`,
  wrong: [r`$\ce{NaSO}$`, r`$\ce{Na2SO3}$`, r`$\ce{NaSO2}$`],
  sol: r`Moles in 100 g: Na $29.1 / 23 = 1.27$; S $40.5 / 32 = 1.27$; O $30.4 / 16 = 1.90$. Dividing by 1.27 gives $1 : 1 : 1.5$; doubling gives $2 : 2 : 3$, so $\ce{Na2S2O3}$ — option (@K). (@1) rounds 1.5 down to 1 instead of clearing the fraction.`,
  d: 3, c: 'application', t: [4],
}), () => near(29.1 / 23, 40.5 / 32, 0.01) && near(30.4 / 16 / (29.1 / 23), 1.5, 0.01) || 'ratio');
add('empirical-fill', fill({
  stem: 'The formula that shows the simplest whole-number ratio of the atoms in a compound is called its ___ formula.',
  acc: [['empirical']],
  sol: 'That is the **empirical** formula; the molecular formula is a whole-number multiple of it.',
  d: 1, c: 'recall', t: [4],
}));
add('benzene-ar', ar({
  a: 'The empirical formula of benzene is $\\ce{C6H6}$.',
  r: 'The empirical formula shows the simplest whole-number ratio of atoms in a compound.',
  key: 'd',
  sol: 'A is false: benzene has molecular formula C₆H₆ but its empirical formula is CH (ratio 1 : 1). R is true — option (d).',
  d: 2, c: 'understanding', t: [4],
}));
add('ascorbic-num', (() => {
  const pct = { C: 40.9, H: 4.5, O: 54.6 };
  const mol = { C: pct.C / 12.0, H: pct.H / 1.0, O: pct.O / 16.0 };
  const base = mol.O;
  const ratio = { C: Math.round((mol.C / base) * 3), H: Math.round((mol.H / base) * 3), O: 3 };
  const empMass = ratio.C * 12 + ratio.H + ratio.O * 16;
  const n = 176.0 / empMass;
  const Hatoms = n * ratio.H;
  return num({
    stem: r`Vitamin C contains ${pct.C} % carbon, ${pct.H} % hydrogen and ${pct.O} % oxygen by mass, and its molar mass is $176.0\ \text{g mol}^{-1}$ (C = 12.0, H = 1.0, O = 16.0). Find the number of hydrogen atoms in one molecule of vitamin C.`,
    value: Hatoms, tol: 0, unit: 'atoms',
    sol: r`In 100 g: C $40.9 / 12.0 = ${dec(mol.C, 3)}$ mol; H $4.5 / 1.0 = ${dec(mol.H, 2)}$ mol; O $54.6 / 16.0 = ${dec(mol.O, 3)}$ mol. Dividing by 3.41: $1.00 : 1.32 : 1.00$, and multiplying by 3 gives C : H : O $= 3 : 4 : 3$, empirical formula $\ce{C3H4O3}$ (mass $${empMass.toFixed(1)}$). $n = 176.0 / ${empMass.toFixed(1)} = ${n}$, so the molecular formula is $\ce{C6H8O6}$ and one molecule has $4 \times 2 = ${Hatoms}$ hydrogen atoms.`,
    scheme: [['Moles of C, H, O', 1], ['Empirical formula C₃H₄O₃', 1], ['n = 2, molecular formula C₆H₈O₆: 8 H atoms', 1]],
    marks: 3, d: 3, c: 'application', t: [4],
  });
})(), (q) => q.answer.value === 8 || 'vit C');
add('bauxite-num', (() => {
  const kg = 5.0, w = 0.51, Al = 27.0, O = 16.0;
  const M = 2 * Al + 3 * O;
  const mAl = kg * w * (2 * Al) / M;
  return num({
    stem: r`A sample of bauxite ore of mass $5.00\ \text{kg}$ contains $51.0\ \%$ aluminium oxide, $\ce{Al2O3}$, by mass. Calculate the mass of aluminium, in kg, present in the sample. (Al = 27.0, O = 16.0)`,
    value: Number(mAl.toFixed(2)), tol: 0.01, unit: 'kg',
    sol: r`$M(\ce{Al2O3}) = 2(27.0) + 3(16.0) = ${M.toFixed(1)}$ g mol⁻¹. Mass of $\ce{Al2O3} = 5.00 \times 0.510 = ${(kg * w).toFixed(3)}$ kg. Mass of Al $= ${(kg * w).toFixed(3)} \times 54.0 / ${M.toFixed(1)} = ${mAl.toFixed(2)}$ kg.`,
    scheme: [['Mass of Al₂O₃ in the ore', 1], ['Fraction of Al in Al₂O₃ (54.0/102.0)', 1], ['Mass of aluminium 1.35 kg', 1]],
    marks: 3, d: 3, c: 'application', t: [4],
  });
})(), (q) => near(5.0 * 0.51 * 54.0 / 102.0, 1.35, 0.002) && q.answer.value === 1.35 || 'bauxite');
add('percent-short', short({
  marks: 2,
  stem: 'Calculate the mass percent of nitrogen in ammonium nitrate, $\\ce{NH4NO3}$, and state which of the two nitrogen-containing ions contributes equally. (N = 14.0, H = 1.0, O = 16.0)',
  model: r`$M = 2(14.0) + 4(1.0) + 3(16.0) = 80.0$ g mol⁻¹. Nitrogen $= 28.0 / 80.0 \times 100 = 35.0$ %. The ammonium ion and the nitrate ion each contain one nitrogen atom, so each contributes 17.5 % of the mass of the compound.`,
  sol: 'Molar mass 80.0, then 28.0/80.0.',
  scheme: [['Molar mass 80.0 g mol⁻¹', 0.5], ['Nitrogen 35.0 %', 1], ['Equal share by each ion', 0.5]],
  d: 2, c: 'application', t: [4],
}), () => near(28 / 80 * 100, 35.0, 1e-9) || 'N pct');
add('empirical-short', short({
  marks: 3,
  stem: 'Ethyne, benzene and styrene all have the empirical formula CH. (a) What do these molecules have in common, and what differs? (b) How can their molecular formulae be found? (c) Styrene has a molar mass of 104 g mol⁻¹ (C = 12, H = 1). Find its molecular formula.',
  model: r`All have carbon and hydrogen in the ratio 1 : 1, but different numbers of atoms per molecule and hence different molar masses. The molecular formula is found by dividing the molar mass by the empirical formula mass to get $n$ and multiplying the empirical formula by $n$. For styrene the empirical mass is $12 + 1 = 13$, so $n = 104 / 13 = 8$ and the molecular formula is $\ce{C8H8}$.`,
  sol: 'Same ratio, different n; styrene n = 8.',
  scheme: [['(a) Same ratio, different molecular formulae', 1], ['(b) Method with n = M / empirical mass', 1], ['(c) C₈H₈', 1]],
  d: 3, c: 'application', t: [4],
}), () => near(104 / 13, 8, 1e-9) || 'styrene');
add('formula-long', long({
  stem: '(a) List the steps used to find an empirical formula from percentage composition.\n\n(b) Potassium dichromate contains 26.6 % potassium, 35.4 % chromium and 38.0 % oxygen by mass (K = 39.1, Cr = 52.0, O = 16.0). Find its empirical formula.\n\n(c) The molar mass of the compound is 294 g mol⁻¹. Find its molecular formula.',
  model: r`Steps: take 100 g so percentages become grams; divide each mass by the atomic mass to get moles; divide all by the smallest number; multiply by 2 or 3 if any ratio is near a fraction. (b) K $26.6 / 39.1 = 0.680$ mol; Cr $35.4 / 52.0 = 0.681$ mol; O $38.0 / 16.0 = 2.375$ mol. Dividing by 0.680: $1 : 1 : 3.49$, about $1 : 1 : 3.5$; doubling gives $2 : 2 : 7$, so the empirical formula is $\ce{K2Cr2O7}$. (c) Its mass is $2(39.1) + 2(52.0) + 7(16.0) = 294.2$, so $n = 294 / 294.2 \approx 1$ and the molecular formula is $\ce{K2Cr2O7}$.`,
  sol: 'Four steps; ratio 1 : 1 : 3.5 doubled; n = 1.',
  scheme: [['(a) Steps', 1.5], ['(b) Moles and ratio, doubling to 2 : 2 : 7', 2.5], ['(c) n = 1', 1]],
  d: 3, c: 'application', t: [4],
}), () => near(26.6 / 39.1, 35.4 / 52, 0.01) && near(38 / 16 / (26.6 / 39.1), 3.5, 0.01) && near(2 * 39.1 + 2 * 52 + 7 * 16, 294.2, 1e-9) || 'dichromate');
add('student-case', mk.case({
  passage: r`Three students, A, B and C, each weigh a 10.00 g standard mass three times on different balances.

| Student | Reading 1 / g | Reading 2 / g | Reading 3 / g |
|---|---|---|---|
| A | 10.01 | 10.02 | 10.01 |
| B | 9.52 | 9.51 | 9.52 |
| C | 9.8 | 10.3 | 10.1 |`,
  d: 3, c: 'analysis',
  children: [
    part('a', mcq({
      stem: 'Which student’s balance is precise but not accurate?',
      right: 'Student B',
      wrong: ['Student A', 'Student C', 'None of them'],
      sol: 'B’s readings agree with each other (precise) but are all about 0.48 g below the true 10.00 g (not accurate) — option (@K). A is both, and C is scattered.',
      d: 2, c: 'application', t: [1],
    })),
    part('b', short({
      marks: 1,
      stem: 'How many significant figures does each reading of student A have?',
      model: 'Each reading of student A has four significant figures, because zeros between non-zero digits count.',
      sol: 'Digits 1, 0, 0, 1 are all significant: zeros between non-zero digits count.',
      scheme: [['Four', 1]],
      d: 1, c: 'understanding', t: [1],
    })),
    part('c', short({
      marks: 2,
      stem: 'Student A’s three readings are averaged. Report the mean with the correct number of significant figures and say whether A’s balance is accurate.',
      model: r`The mean is $(10.01 + 10.02 + 10.01) / 3 = 10.01$ g, quoted to four significant figures like the data. This is within 0.01 g of the true value of 10.00 g, so A’s balance is both precise and accurate.`,
      sol: 'Average then compare with the true value.',
      scheme: [['Mean 10.01 g', 1], ['Accurate and precise', 1]],
      d: 2, c: 'application', t: [1],
    }), [
      short({
        marks: 2, wl: null,
        stem: 'Suggest the likely cause of the error shown by B, and why repeating the weighing many times does not remove it.',
        model: 'B’s balance probably has a zero error or needs calibration, which adds the same shift to every reading. Repeating the weighing only repeats the same shift, so the average is still wrong; averaging reduces random scatter, not a systematic error.',
        sol: 'Systematic error is not removed by averaging.',
        scheme: [['Systematic error such as miscalibration', 1], ['Averaging does not remove a constant shift', 1]],
        d: 3, c: 'analysis', t: [1],
      }),
    ]),
  ],
}), () => near((10.01 + 10.02 + 10.01) / 3, 10.0133, 1e-4) || 'mean');

// ---------------------------------------------------------------- t05 stoichiometry, limiting reagent, concentration
add('lr-chk', mcq({
  stem: r`$\ce{2Al + 3S -> Al2S3}$. A mixture of 2.70 g of aluminium (27.0 g mol⁻¹) and 3.84 g of sulfur (32.0 g mol⁻¹) is heated. The limiting reagent is:`,
  right: 'sulfur',
  wrong: ['aluminium', 'both are limiting', 'aluminium sulfide'],
  sol: r`$n(\text{Al}) = 2.70 / 27.0 = 0.100$ mol and $n(\text{S}) = 3.84 / 32.0 = 0.120$ mol. Moles ÷ coefficient: Al $0.100 / 2 = 0.0500$; S $0.120 / 3 = 0.0400$. The smaller value is for sulfur — option (@K).`,
  d: 3, c: 'application', t: [5],
}), () => near(0.12 / 3, 0.04, 1e-9) && 0.12 / 3 < 0.1 / 2 || 'limiting');
add('conc-chk', mcq({
  stem: 'A solution is made by dissolving 5.0 g of a solute in 95.0 g of a solvent. The mass percent of the solute is:',
  right: '5.0 %',
  wrong: ['5.3 %', '4.8 %', '0.050 %'],
  sol: r`Mass percent $= \dfrac{5.0}{5.0 + 95.0} \times 100 = 5.0$ % — option (@K). (@1) divides by the mass of the solvent instead of the solution.`,
  d: 2, c: 'understanding', t: [5],
}), () => near(5 / 100 * 100, 5.0, 1e-9) || 'pct');
add('stoich-mcq', mcq({
  stem: r`Iron pyrites is roasted in air: $\ce{4FeS2 + 11O2 -> 2Fe2O3 + 8SO2}$. The amount of sulfur dioxide formed from 0.60 mol of $\ce{FeS2}$ is:`,
  right: '1.2 mol',
  wrong: ['0.60 mol', '2.4 mol', '0.30 mol'],
  sol: r`The ratio $\ce{FeS2} : \ce{SO2}$ is $4 : 8 = 1 : 2$, so $n(\ce{SO2}) = 0.60 \times 2 = 1.2$ mol — option (@K).`,
  d: 2, c: 'understanding', t: [5],
}), () => near(0.6 * 8 / 4, 1.2, 1e-9) || 'ratio');
add('molality-mcq', mcq({
  stem: 'A solution contains 0.500 mol of a solute dissolved in 250 g of water. Its molality is:',
  right: r`$2.00\ \text{mol kg}^{-1}$`,
  wrong: [r`$0.500\ \text{mol kg}^{-1}$`, r`$0.125\ \text{mol kg}^{-1}$`, r`$2.00\ \text{mol L}^{-1}$`],
  sol: r`Molality $= 0.500 / 0.250 = 2.00$ mol per kilogram of solvent — option (@K). (@3) has the right number but the wrong unit: molality is per kilogram of solvent, not per litre of solution.`,
  d: 2, c: 'understanding', t: [5],
}), () => near(0.5 / 0.25, 2.0, 1e-9) || 'molality');
add('dilution-mcq', mcq({
  stem: 'What volume of a 2.50 M stock solution is needed to prepare 250 mL of a 0.100 M solution?',
  right: '10.0 mL',
  wrong: ['25.0 mL', '100 mL', '2.50 mL'],
  sol: r`$c_1 V_1 = c_2 V_2$: $V_1 = 0.100 \times 250 / 2.50 = 10.0$ mL — option (@K).`,
  d: 2, c: 'understanding', t: [5],
}), () => near(0.1 * 250 / 2.5, 10.0, 1e-9) || 'dilution');
add('molefrac-mcq', mcq({
  stem: 'A gas mixture contains 2.0 mol of nitrogen, 3.0 mol of oxygen and 5.0 mol of argon. The mole fraction of oxygen is:',
  right: '0.30',
  wrong: ['0.60', '0.50', '0.20'],
  sol: r`$x(\ce{O2}) = 3.0 / (2.0 + 3.0 + 5.0) = 0.30$ — option (@K). (@1) divides by the amount of the other gases only (3.0 / 5.0).`,
  d: 1, c: 'understanding', t: [5],
}), () => near(3 / 10, 0.3, 1e-9) || 'x');
add('ppm-mcq', mcq({
  stem: 'A sample of drinking water (density 1.0 g mL⁻¹) contains 0.5 mg of fluoride per litre. The concentration in ppm by mass is:',
  right: '0.5 ppm',
  wrong: ['5 ppm', '0.05 ppm', '500 ppm'],
  sol: r`One litre of water has a mass of about 1000 g $= 10^{6}$ mg, so $0.5 / 10^{6} \times 10^{6} = 0.5$ ppm — option (@K).`,
  d: 2, c: 'understanding', t: [5],
}), () => near(0.5 / 1e6 * 1e6, 0.5, 1e-9) || 'ppm');
add('lr-ar', ar({
  a: 'In a reaction, the amount of product formed is decided by the limiting reagent.',
  r: 'The limiting reagent is completely used up when the reaction stops.',
  key: 'a',
  sol: 'Once the limiting reagent is exhausted no more product can form, so it fixes the yield; R explains A — option (a).',
  d: 2, c: 'understanding', t: [5],
}));
add('molality-ar', ar({
  a: 'The molality of a solution does not change when it is heated.',
  r: 'Molality is the number of moles of solute per litre of solution.',
  key: 'c',
  sol: 'A is true: molality uses the mass of solvent, which does not change with temperature. R is false: molality is moles per kilogram of solvent; moles per litre of solution is molarity — option (c).',
  d: 2, c: 'understanding', t: [5],
}));
add('limiting-tf', tf({
  stem: 'The reactant present in the smaller mass is always the limiting reagent.',
  key: 'f',
  sol: 'False. The limiting reagent depends on the amounts in moles and the coefficients, not on mass alone: a small mass of a heavy reactant may still be more moles than needed.',
  d: 2, c: 'understanding', t: [5],
}));
add('temp-tf', tf({
  stem: 'The molarity of an aqueous solution decreases slightly when the solution is warmed, but its molality stays the same.',
  key: 't',
  sol: 'True. On warming the solution expands, so the same number of moles is in a larger volume (molarity falls); the mass of solvent is unchanged (molality is constant).',
  d: 2, c: 'understanding', t: [5],
}));
add('molality-fill', fill({
  stem: 'The concentration term defined as moles of solute per kilogram of solvent is called ___.',
  acc: [['molality']],
  sol: 'That is **molality**, usually written $m$.',
  d: 1, c: 'recall', t: [5],
}));
add('conc-match', match({
  stem: 'A laboratory label can state the strength of a glucose solution in four ways. Match each way of expressing it with what it measures.',
  pairs: [
    ['Molarity', 'Moles of solute per litre of solution'],
    ['Molality', 'Moles of solute per kilogram of solvent'],
    ['Mole fraction of A', 'Moles of A divided by total moles of all components'],
    ['Parts per million', 'Mass of solute divided by mass of solution, times one million'],
  ],
  order: [2, 0, 3, 1],
  sol: 'Molarity uses volume of solution, molality uses mass of solvent, mole fraction uses total moles, ppm uses mass ratio × 10⁶.',
  d: 1, c: 'recall', t: [5],
}));
add('thermite-num', (() => {
  const mFe2O3 = 48.0, M = 160.0, MFe = 56.0;
  const n = mFe2O3 / M;
  const mFe = n * 2 * MFe;
  return num({
    stem: r`In the thermite process, aluminium reduces iron(III) oxide: $\ce{Fe2O3 + 2Al -> Al2O3 + 2Fe}$. Calculate the mass of iron, in g, obtained from $48.0\ \text{g}$ of $\ce{Fe2O3}$ (Fe = 56.0, O = 16.0, Al = 27.0), assuming complete reaction.`,
    value: Number(mFe.toFixed(1)), tol: 0.05, unit: 'g',
    sol: r`$M(\ce{Fe2O3}) = 2(56.0) + 3(16.0) = ${M.toFixed(1)}$ g mol⁻¹, so $n = 48.0 / ${M.toFixed(1)} = ${n.toFixed(3)}$ mol. The ratio $\ce{Fe2O3} : \ce{Fe} = 1 : 2$ gives $0.600$ mol of Fe. Mass $= 0.600 \times 56.0 = ${mFe.toFixed(1)}$ g.`,
    scheme: [['Moles of Fe₂O₃', 1], ['Mole ratio 1 : 2', 1], ['Mass of iron 33.6 g', 1]],
    marks: 3, d: 2, c: 'application', t: [5],
  });
})(), (q) => near(48 / 160 * 2 * 56, 33.6, 1e-6) && q.answer.value === 33.6 || 'thermite');
add('alcl3-num', (() => {
  const nAl = 5.4 / 27.0, nCl = 14.2 / 71.0;
  const ext = Math.min(nAl / 2, nCl / 3);
  const m = ext * 2 * 133.5;
  return num({
    stem: r`Aluminium burns in chlorine: $\ce{2Al + 3Cl2 -> 2AlCl3}$. A student heats $5.40\ \text{g}$ of aluminium with $14.2\ \text{g}$ of chlorine gas. Calculate the mass of aluminium chloride formed, in g. (Al = 27.0, Cl = 35.5)`,
    value: Number(m.toFixed(1)), tol: 0.05, unit: 'g',
    sol: r`$n(\text{Al}) = 5.40 / 27.0 = ${nAl.toFixed(3)}$ mol; $n(\ce{Cl2}) = 14.2 / 71.0 = ${nCl.toFixed(3)}$ mol. Moles ÷ coefficient: Al $= ${(nAl / 2).toFixed(3)}$, $\ce{Cl2} = ${(nCl / 3).toFixed(4)}$; chlorine is limiting. $n(\ce{AlCl3}) = ${nCl.toFixed(3)} \times 2/3 = ${(nCl * 2 / 3).toFixed(4)}$ mol; mass $= ${(nCl * 2 / 3).toFixed(4)} \times 133.5 = ${m.toFixed(1)}$ g.`,
    scheme: [['Moles of both reactants', 1], ['Chlorine identified as limiting', 1], ['Mass of AlCl₃ 17.8 g', 1]],
    marks: 3, d: 3, c: 'application', t: [5],
  });
})(), (q) => near(14.2 / 71 * 2 / 3 * 133.5, 17.8, 0.002) && q.answer.value === 17.8 || 'alcl3');
add('kno3-num', (() => {
  const m = 4.04, M = 101.0, V = 0.250;
  const c = m / M / V;
  return num({
    stem: r`$4.04\ \text{g}$ of potassium nitrate, $\ce{KNO3}$, is dissolved in water and the solution is made up to $250\ \text{mL}$ in a volumetric flask. Calculate the molarity of the solution. (K = 39.0, N = 14.0, O = 16.0)`,
    value: Number(c.toFixed(3)), tol: 0.001, unit: 'mol L⁻¹',
    sol: r`$M = 39.0 + 14.0 + 3(16.0) = ${M.toFixed(1)}$ g mol⁻¹; $n = 4.04 / ${M.toFixed(1)} = ${(m / M).toFixed(3)}$ mol. Molarity $c = n / V = ${(m / M).toFixed(3)} / 0.250 = ${c.toFixed(3)}$ mol L⁻¹.`,
    scheme: [['Moles from mass', 1], ['Divides by volume in litres: 0.160 M', 1]],
    marks: 2, d: 2, c: 'application', t: [5],
  });
})(), (q) => near(4.04 / 101 / 0.25, 0.16, 1e-6) && q.answer.value === 0.16 || 'kno3');
add('hno3-num', (() => {
  const w = 68, rho = 1.41, M = 63.0;
  const c = (10 * w * rho) / M;
  return num({
    stem: r`The label on a bottle of concentrated nitric acid reads 68.0 % $\ce{HNO3}$ by mass, density $1.41\ \text{g mL}^{-1}$. Find the molarity of the acid. (H = 1.0, N = 14.0, O = 16.0)`,
    value: Number(c.toFixed(1)), tol: 0.05, unit: 'mol L⁻¹',
    sol: r`In 1000 mL the mass is $1000 \times 1.41 = 1410$ g, of which $0.680 \times 1410 = ${(0.68 * 1410).toFixed(0)}$ g is $\ce{HNO3}$. $n = ${(0.68 * 1410).toFixed(0)} / 63.0 = ${c.toFixed(1)}$ mol in one litre, so $c = ${c.toFixed(1)}$ mol L⁻¹.`,
    scheme: [['Mass of solution in 1 L', 1], ['Mass of HNO₃ and moles', 1], ['Molarity 15.2 mol L⁻¹', 1]],
    marks: 3, d: 3, c: 'application', t: [5],
  });
})(), (q) => near(10 * 68 * 1.41 / 63, 15.22, 0.002) && q.answer.value === 15.2 || 'hno3');
add('ppm-short', short({
  marks: 3,
  stem: 'A 500 g sample of well water contains 0.20 g of dissolved chloride ions. Express the concentration of chloride as (a) mass percent and (b) ppm, and (c) find the mass of chloride in 2.00 kg of the same water.',
  model: r`(a) Mass percent is the mass of solute divided by the mass of solution, times 100: $0.20 / 500 \times 100 = 0.040$ %. (b) Parts per million uses the same ratio times one million: $0.20 / 500 \times 10^{6} = 400$ ppm. (c) The mass of chloride is proportional to the mass of water taken, so 2.00 kg (2000 g) of water holds $400 \times 10^{-6} \times 2000 = 0.80$ g of chloride.`,
  sol: 'Divide by the mass of solution; scale proportionally.',
  scheme: [['(a) 0.040 %', 1], ['(b) 400 ppm', 1], ['(c) 0.80 g', 1]],
  d: 2, c: 'application', t: [5],
}), () => near(0.2 / 500 * 100, 0.04, 1e-9) && near(0.2 / 500 * 1e6, 400, 1e-9) && near(400e-6 * 2000, 0.8, 1e-9) || 'ppm');
add('dilution-short', short({
  marks: 3,
  stem: 'A stock solution of copper(II) sulfate is 0.800 M. A 25.0 mL portion is diluted with water to a final volume of 400 mL. (a) Calculate the new molarity. (b) How many moles of copper(II) sulfate are in the 25.0 mL portion? (c) Does this amount change on dilution?',
  model: r`(a) On dilution the moles of solute stay the same, so $c_1 V_1 = c_2 V_2$ and $c_2 = 0.800 \times 25.0 / 400 = 0.0500$ M. (b) The moles in the 25.0 mL portion are molarity times volume in litres: $0.800 \times 0.0250 = 0.0200$ mol. (c) No, the amount of solute does not change on dilution; the same moles are only spread through a larger volume, so the concentration falls.`,
  sol: 'c1V1 = c2V2; moles = c × V.',
  scheme: [['(a) 0.0500 M', 1], ['(b) 0.0200 mol', 1], ['(c) Moles unchanged', 1]],
  d: 2, c: 'application', t: [5],
}), () => near(0.8 * 25 / 400, 0.05, 1e-9) && near(0.8 * 0.025, 0.02, 1e-9) || 'dilution');
add('lr-short', short({
  marks: 2,
  stem: 'What is a limiting reagent? A student says the reactant with the smaller mass must be the limiting reagent. Give one reason why the statement may be wrong.',
  model: 'The limiting reagent is the reactant that is completely used up first and so fixes the amount of product. The statement may be wrong because amounts must be compared in moles divided by the coefficient in the balanced equation, and a smaller mass of a light reactant can still be more moles than needed.',
  sol: 'Define it; compare moles ÷ coefficients, not masses.',
  scheme: [['Definition', 1], ['Reason: moles and coefficients, not mass', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('molality-short', short({
  marks: 2,
  stem: 'A chemist studies a solution between 20 °C and 80 °C. Why is molality a better concentration term than molarity for this study?',
  model: 'Molality uses the mass of solvent, which does not change with temperature. Molarity uses the volume of solution, which expands on heating, so the molarity would change even though no solute is added or lost. Molality therefore stays constant over the whole range.',
  sol: 'Mass is independent of temperature; volume is not.',
  scheme: [['Molality uses mass, independent of temperature', 1], ['Molarity changes because volume changes', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('mass-short', short({
  marks: 3,
  stem: r`Zinc sulfide is roasted in air: $\ce{2ZnS + 3O2 -> 2ZnO + 2SO2}$. Calculate the mass of zinc oxide and of sulfur dioxide formed from 19.4 g of zinc sulfide. (Zn = 65.0, S = 32.0, O = 16.0)`,
  model: r`First convert the mass of zinc sulfide to moles. The molar mass of $\ce{ZnS}$ is 97.0 g mol⁻¹, so $n = 19.4 / 97.0 = 0.200$ mol. The coefficients show that $\ce{ZnS}$, $\ce{ZnO}$ and $\ce{SO2}$ are in the ratio $1 : 1 : 1$, so 0.200 mol of each product forms. Converting back to mass, $m(\ce{ZnO}) = 0.200 \times 81.0 = 16.2$ g and $m(\ce{SO2}) = 0.200 \times 64.0 = 12.8$ g.`,
  sol: 'Moles of ZnS, 1 : 1 : 1 ratio, then masses.',
  scheme: [['Moles of ZnS 0.200', 1], ['Mass of ZnO 16.2 g', 1], ['Mass of SO₂ 12.8 g', 1]],
  d: 3, c: 'application', t: [5],
}), () => near(19.4 / 97 * 81, 16.2, 1e-3) && near(19.4 / 97 * 64, 12.8, 1e-3) || 'zns');
add('lr-long', long({
  stem: r`Silicon carbide is made by heating silica with carbon: $\ce{SiO2 + 3C -> SiC + 2CO}$. A furnace is charged with 45.0 g of $\ce{SiO2}$ and 30.0 g of carbon. (Si = 28.0, O = 16.0, C = 12.0)

(a) Identify the limiting reagent.

(b) Calculate the mass of silicon carbide formed.

(c) Calculate the mass of the excess reagent left over.`,
  model: r`(a) Convert both masses to moles: $n(\ce{SiO2}) = 45.0 / 60.0 = 0.750$ mol and $n(\text{C}) = 30.0 / 12.0 = 2.50$ mol. Dividing each amount by its coefficient gives 0.750 for silica and $2.50 / 3 = 0.833$ for carbon. The smaller value belongs to silica, so silica is the limiting reagent. (b) The yield is fixed by the limiting reagent, and the ratio $\ce{SiO2} : \ce{SiC}$ is $1 : 1$, so $n(\ce{SiC}) = 0.750$ mol and $m = 0.750 \times 40.0 = 30.0$ g. (c) Carbon used is $3 \times 0.750 = 2.25$ mol, so $2.50 - 2.25 = 0.25$ mol remains, which is $0.25 \times 12.0 = 3.0$ g of carbon.`,
  sol: 'Moles, divide by coefficients, yield from silica, subtract carbon used.',
  scheme: [['(a) Moles and limiting reagent: SiO₂', 2], ['(b) SiC 30.0 g', 1.5], ['(c) Carbon left 3.0 g', 1.5]],
  d: 4, c: 'application', t: [5],
}), () => near(45 / 60, 0.75, 1e-9) && near(0.75 * 40, 30.0, 1e-9) && near((30 / 12 - 3 * 0.75) * 12, 3.0, 1e-9) || 'sic');
add('conc-long', (() => {
  const w = 28.0, rho = 0.90, MNH3 = 17.0, MH2O = 18.0;
  const c = (10 * w * rho) / MNH3;
  const nN = w / MNH3, mw = 100 - w;
  const molal = nN / (mw / 1000);
  const x = nN / (nN + mw / MH2O);
  return long({
    stem: r`A concentrated ammonia solution is 28.0 % $\ce{NH3}$ by mass and has a density of $0.90\ \text{g mL}^{-1}$. (N = 14.0, H = 1.0)

(a) Define molarity, molality and mole fraction.

(b) Calculate the molarity of the solution.

(c) Calculate its molality and the mole fraction of ammonia.`,
    model: r`Molarity is moles of solute per litre of solution; molality is moles of solute per kilogram of solvent; the mole fraction of a component is its moles divided by the total moles of all components. It is convenient to take 100 g of solution as the basis. Then $n(\ce{NH3}) = 28.0 / 17.0 = ${nN.toFixed(2)}$ mol and the volume is $100 / 0.90 = 111$ mL, so molarity $= ${nN.toFixed(2)} / 0.111 = ${c.toFixed(1)}$ M. The solvent is $72.0$ g $= 0.0720$ kg, so molality $= ${nN.toFixed(2)} / 0.0720 = ${molal.toFixed(1)}$ mol kg⁻¹. The solvent water is $72.0 / 18.0 = 4.00$ mol, so the mole fraction of ammonia is $x = ${nN.toFixed(2)} / (${nN.toFixed(2)} + 4.00) = ${x.toFixed(3)}$, and that of water is 1 minus this value.`,
    sol: 'Basis of 100 g of solution; volume from density; solvent mass for molality.',
    scheme: [['(a) Three definitions', 1.5], ['(b) Molarity 14.8 M', 1.5], ['(c) Molality 22.9 mol/kg and mole fraction 0.292', 2]],
    d: 4, c: 'application', t: [5],
  });
})(), () => {
  const nN = 28 / 17;
  return near(10 * 28 * 0.9 / 17, 14.82, 0.003) && near(nN / 0.072, 22.88, 0.003) && near(nN / (nN + 4), 0.2917, 0.003) || 'ammonia';
});
add('baso4-case', mk.case({
  passage: r`In a gravimetric experiment, a student mixes 25.0 mL of 0.200 M barium chloride solution with 25.0 mL of 0.150 M sodium sulfate solution. A white precipitate of barium sulfate forms: $\ce{BaCl2 + Na2SO4 -> BaSO4 + 2NaCl}$. (Ba = 137, S = 32, O = 16)`,
  d: 4, c: 'application',
  children: [
    part('a', mcq({
      stem: 'The limiting reagent in this experiment is:',
      right: 'sodium sulfate',
      wrong: ['barium chloride', 'sodium chloride', 'barium sulfate'],
      sol: r`$n(\ce{BaCl2}) = 0.200 \times 0.0250 = 5.00 \times 10^{-3}$ mol; $n(\ce{Na2SO4}) = 0.150 \times 0.0250 = 3.75 \times 10^{-3}$ mol. The coefficients are 1 : 1, so the smaller amount, sodium sulfate, is limiting — option (@K).`,
      d: 3, c: 'application', t: [5],
    })),
    part('b', short({
      marks: 1,
      stem: 'Calculate the amount of barium sulfate formed, in mmol.',
      model: 'The amount is 3.75 mmol, equal to that of the limiting reagent, sodium sulfate.',
      sol: r`$n(\ce{BaSO4}) = n(\ce{Na2SO4}) = 0.150 \times 25.0 = 3.75$ mmol.`,
      scheme: [['3.75 mmol', 1]],
      d: 3, c: 'application', t: [5],
    })),
    part('c', short({
      marks: 2,
      stem: 'Calculate the mass of barium sulfate precipitated.',
      model: r`The molar mass of barium sulfate is $137 + 32 + 4(16) = 233$ g mol⁻¹. The mass of precipitate equals the limiting amount times this molar mass: $3.75 \times 10^{-3} \times 233 = 0.874$ g, that is, about 0.87 g of barium sulfate.`,
      sol: 'Limiting amount times molar mass.',
      scheme: [['Molar mass 233 g mol⁻¹', 1], ['Mass 0.874 g', 1]],
      d: 3, c: 'application', t: [5],
    }), [
      short({
        marks: 2, wl: null,
        stem: 'Calculate the molarity of the barium ions that remain unreacted in the final mixture (volume 50.0 mL).',
        model: r`Barium chloride in excess $= 5.00 - 3.75 = 1.25$ mmol. Concentration $= 1.25 / 50.0 = 0.0250$ M.`,
        sol: 'Excess amount over total volume.',
        scheme: [['Excess 1.25 mmol', 1], ['0.0250 M', 1]],
        d: 4, c: 'application', t: [5],
      }),
    ]),
  ],
}), () => near(3.75e-3 * 233, 0.874, 0.001) && near((5.0 - 3.75) / 50.0, 0.025, 1e-9) || 'baso4');
add('acid-case', mk.case({
  passage: r`A laboratory bottle of concentrated hydrochloric acid is labelled: 37.0 % HCl by mass, density 1.19 g mL⁻¹. (H = 1.0, Cl = 35.5)`,
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'What mass of HCl is present in 100 g of this acid?',
      right: '37.0 g',
      wrong: ['63.0 g', '1.19 g', '44.0 g'],
      sol: 'Mass percent means grams of solute per 100 g of solution, so 100 g contains 37.0 g of HCl — option (@K). (@1) is the mass of water.',
      d: 1, c: 'understanding', t: [5],
    })),
    part('b', short({
      marks: 1,
      stem: 'Calculate the molarity of the concentrated acid.',
      model: r`Using $c = 10 w \rho / M$ gives $10 \times 37.0 \times 1.19 / 36.5 = 12.1$ mol L⁻¹.`,
      sol: 'Moles per litre from mass percent and density.',
      scheme: [['12.1 mol L⁻¹', 1]],
      d: 3, c: 'application', t: [5],
    })),
    part('c', short({
      marks: 2,
      stem: 'What volume of the concentrated acid is needed to prepare 250 mL of 1.00 M hydrochloric acid?',
      model: r`Dilution keeps the moles of HCl constant, so $c_1 V_1 = c_2 V_2$ and $V_1 = 1.00 \times 250 / 12.06 = 20.7$ mL. Measure about 20.7 mL of the concentrated acid and make it up to 250 mL with water.`,
      sol: 'Dilution relation with the stock molarity.',
      scheme: [['Uses c₁V₁ = c₂V₂ with the stock molarity', 1], ['20.7 mL', 1]],
      d: 3, c: 'application', t: [5],
    }), [
      short({
        marks: 2, wl: null,
        stem: 'Calculate the molality of the concentrated acid.',
        model: r`In 100 g, $n(\text{HCl}) = 37.0 / 36.5 = 1.014$ mol and the solvent is $63.0$ g $= 0.0630$ kg, so molality $= 1.014 / 0.0630 = 16.1$ mol kg⁻¹.`,
        sol: 'Moles in 100 g over the mass of water in kg.',
        scheme: [['Moles of HCl and mass of water', 1], ['16.1 mol kg⁻¹', 1]],
        d: 3, c: 'application', t: [5],
      }),
    ]),
  ],
}), () => near(10 * 37 * 1.19 / 36.5, 12.06, 0.002) && near(250 / (10 * 37 * 1.19 / 36.5), 20.73, 0.002) && near(37 / 36.5 / 0.063, 16.09, 0.002) || 'hcl');
