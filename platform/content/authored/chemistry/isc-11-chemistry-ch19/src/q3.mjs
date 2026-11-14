// ch19 question bank, part 3: t04 Carius method, Rf numerical, and the long items for t01, t02 and t04.
import { mk, add, r, near } from './lib.mjs';
import { A, MM, pctFrom, f } from './data.mjs';

const { mcq, ar, num, short, long } = mk;

// ---------------------------------------------------------------- t01 Rf numerical
{
  const d = 3.9;
  const L = 7.5;
  const rf = d / L;
  add('rf-num', num({
    stem: `In a paper chromatography experiment with vegetable dyes, the solvent front is ${f(L, 1)} cm above the start line and the spot of one dye is ${f(d, 1)} cm above it. Find the Rf value of the dye.`,
    value: 0.52, tol: 0.005, unit: null,
    sol: r`$R_f = \dfrac{\text{distance moved by the spot}}{\text{distance moved by the solvent front}} = \dfrac{${f(d, 1)}}{${f(L, 1)}} = ${f(rf, 2)}$ (no unit).`,
    scheme: [['Rf = d ÷ L', 0.5], ['0.52 with no unit', 0.5]],
    d: 1, c: 'understanding', t: [1],
  }), () => near(rf, 0.52, 0.001) || 'rf');
}

// ---------------------------------------------------------------- t04 Carius
add('tube-mcq', mcq({
  stem: 'In the Carius method, the organic compound is heated with fuming nitric acid in a sealed thick-walled glass tube because this:',
  right: 'oxidises the compound completely at a high temperature and pressure, converting the halogen, sulphur or phosphorus into ions or acids',
  wrong: ['reduces the compound to its elements so that they can be weighed directly', 'converts the carbon and hydrogen into silver halides', 'removes the halogen as a gas that is collected over water'],
  sol: 'Fuming HNO₃ in a sealed tube at high temperature oxidises the compound fully: C and H leave as CO₂ and H₂O, while halogen, sulphur and phosphorus become halide ions, sulphuric acid and phosphoric acid — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('carius-p-mcq', mcq({
  stem: 'In a Carius estimation of phosphorus in a pesticide, the phosphorus is oxidised to phosphoric acid, precipitated by magnesia mixture and finally weighed after ignition as:',
  right: 'magnesium pyrophosphate, Mg₂P₂O₇',
  wrong: ['magnesium oxide, MgO', 'barium phosphate, Ba₃(PO₄)₂', 'silver phosphate, Ag₃PO₄'],
  sol: 'MgNH₄PO₄ formed with magnesia mixture is ignited to Mg₂P₂O₇, which is weighed; %P $= \\dfrac{62}{222} \\times \\dfrac{m_1}{m} \\times 100$ — option (@K).',
  d: 2, c: 'recall', t: [4],
}));
{
  const m = 0.1;
  const pct = 80.0;
  const mBr = (m * pct) / 100;
  const mAgBr = (mBr * MM.AgBr) / A.Br;
  add('agbr-mcq', mcq({
    stem: `In a Carius estimation, ${f(m, 4)} g of an organic bromide containing ${f(pct, 1)}% bromine by mass is heated with fuming nitric acid and excess silver nitrate (Br = 80, Ag = 108). The expected mass of silver bromide is:`,
    right: `${f(mAgBr, 3)} g`,
    wrong: ['0.080 g', '0.376 g', '0.094 g'],
    sol: `Mass of Br = 0.1000 × 0.800 = 0.0800 g. AgBr (188 g mol⁻¹) contains 80 g of Br per mole, so m(AgBr) = 0.0800 × 188 ÷ 80 = ${f(mAgBr, 3)} g — option (@K). The value 0.080 g (@1) is the bromine alone, 0.376 g (@2) doubles the mass, and 0.094 g (@3) halves it.`,
    d: 3, c: 'application', t: [4],
  }), () => near(mAgBr, 0.188, 0.001) || 'agbr');
}
add('carius-ar', ar({
  a: 'In the Carius method for sulphur, the sulphur is finally weighed as barium sulphate.',
  r: 'Chlorine is a greenish-yellow gas at room temperature.',
  key: 'b',
  sol: 'Both statements are true: sulphur is oxidised to sulphuric acid and precipitated with BaCl₂ as BaSO₄, and chlorine is a greenish-yellow gas. The reason has nothing to do with the assertion — option (b).',
  d: 2, c: 'understanding', t: [4],
}));
{
  const m = 0.142;
  const p = 0.287;
  const v = pctFrom(A.Cl, MM.AgCl, p, m);
  add('cl-num', num({
    stem: `In a Carius estimation, ${f(m, 4)} g of an organic chloride was heated with fuming HNO₃ and AgNO₃ and gave ${f(p, 4)} g of silver chloride (Ag = 108, Cl = 35.5). Find the percentage of chlorine.`,
    value: 50.0, tol: 0.1, unit: '%',
    sol: r`Molar mass of AgCl $= 143.5$. $\%\,\text{Cl} = \dfrac{35.5}{143.5} \times \dfrac{${f(p, 4)}}{${f(m, 4)}} \times 100 = ${f(v, 2)}\%$.`,
    scheme: [['Uses 35.5/143.5 × (mass of AgCl ÷ mass of compound) × 100', 0.5], ['50.0%', 0.5]],
    d: 1, c: 'understanding', t: [4],
  }), () => near(v, 50.0, 0.001) || 'cl');
}
{
  const m = 0.3;
  const p = 0.699;
  const v = pctFrom(A.S, MM.BaSO4, p, m);
  add('s-num', num({
    stem: `A sulphur compound weighing ${f(m, 4)} g is oxidised in a Carius tube and the sulphuric acid formed is precipitated as barium sulphate, ${f(p, 4)} g after drying (Ba = 137, S = 32, O = 16). What is the percentage of sulphur?`,
    value: 32.0, tol: 0.1, unit: '%',
    sol: r`Molar mass of $\ce{BaSO4} = 233$. $\%\,\text{S} = \dfrac{32}{233} \times \dfrac{${f(p, 4)}}{${f(m, 4)}} \times 100 = ${f(v, 2)}\%$.`,
    scheme: [['Uses 32/233 × (mass of BaSO₄ ÷ mass of compound) × 100', 0.5], ['32.0%', 0.5]],
    d: 1, c: 'understanding', t: [4],
  }), () => near(v, 32.0, 0.001) || 's');
}
{
  const m = 0.31;
  const p = 0.222;
  const v = pctFrom(2 * A.P, MM.Mg2P2O7, p, m);
  add('p-num', num({
    stem: `A phosphorus compound weighing ${f(m, 4)} g is oxidised in a Carius tube, and the phosphoric acid is precipitated as MgNH₄PO₄ and ignited to ${f(p, 4)} g of Mg₂P₂O₇ (Mg = 24, P = 31, O = 16). Find the percentage of phosphorus.`,
    value: 20.0, tol: 0.1, unit: '%',
    sol: r`Molar mass of $\ce{Mg2P2O7} = 222$, containing $62$ g of P. $\%\,\text{P} = \dfrac{62}{222} \times \dfrac{${f(p, 4)}}{${f(m, 4)}} \times 100 = ${f(v, 2)}\%$.`,
    scheme: [['Uses 62/222 × (mass of Mg₂P₂O₇ ÷ mass of compound) × 100', 0.5], ['20.0%', 0.5]],
    d: 2, c: 'understanding', t: [4],
  }), () => near(v, 20.0, 0.001) || 'p');
}
{
  const m = 0.239;
  const Mr = A.C + A.H + 3 * A.Cl; // CHCl3 = 119.5
  const mCl = (3 * A.Cl * m) / Mr;
  const mAgCl = (mCl * MM.AgCl) / A.Cl;
  add('agclrev-num', num({
    stem: `Chloroform, CHCl₃ (C = 12, H = 1, Cl = 35.5, Ag = 108), of mass ${f(m, 4)} g is analysed by the Carius method, and all its chlorine is precipitated with silver nitrate. What mass of silver chloride, in g, is expected?`,
    value: 0.861, tol: 0.002, unit: 'g',
    sol: r`Molar mass of $\ce{CHCl3} = 119.5$, so $n = ${f(m, 4)} \div 119.5 = 2.00 \times 10^{-3}$ mol, which holds $6.00 \times 10^{-3}$ mol of Cl. Each Cl gives one AgCl (143.5 g mol⁻¹): $m(\ce{AgCl}) = 6.00 \times 10^{-3} \times 143.5 = ${f(mAgCl, 3)}\ \text{g}$.`,
    scheme: [['Moles of CHCl₃ and of Cl (×3)', 0.5], ['Mass of AgCl 0.861 g', 0.5]],
    d: 3, c: 'application', t: [4],
  }), () => near(mAgCl, 0.861, 0.001) || 'agclrev');
}
add('carius-short', short({
  marks: 2,
  stem: 'A student estimates bromine in an organic compound by the Carius method. Why is silver nitrate added with the fuming nitric acid inside the tube, and why is the precipitate washed and dried to constant mass before weighing?',
  model: 'Silver nitrate is added so that the halogen, once converted to bromide ions by oxidation of the compound, is precipitated at once as silver bromide in the tube. The precipitate is washed to remove soluble impurities and dried to constant mass so that the weighed mass is that of pure, dry AgBr, with no water or adhering salts.',
  sol: 'Precipitate AgBr in the tube; washing and drying.',
  scheme: [['Role of AgNO₃: precipitate the halide as AgX', 1], ['Washing and drying to constant mass for an accurate weight', 1]],
  d: 2, c: 'understanding', t: [4],
}));
{
  const m = 0.376;
  const p = 0.752;
  const Mr = 188;
  const v = pctFrom(A.Br, MM.AgBr, p, m);
  const atoms = (v * Mr) / (100 * A.Br);
  add('br-short3', short({
    marks: 3,
    stem: `A bromine compound of molar mass ${Mr} g mol⁻¹ (given) weighing ${f(m, 4)} g gives ${f(p, 4)} g of AgBr in a Carius estimation (Br = 80, Ag = 108). Find the percentage of bromine and the number of bromine atoms in a molecule.`,
    model: r`Molar mass of AgBr $= 188$. $\%\,\text{Br} = \dfrac{80}{188} \times \dfrac{0.7520}{0.3760} \times 100 = 85.1\%$. Mass of Br in one mole $= \dfrac{85.1}{100} \times 188 = 160$ g, so the number of Br atoms $= 160 \div 80 = 2$.`,
    sol: '85.1%; two bromine atoms.',
    scheme: [['Percentage formula with 80/188', 1], ['85.1%', 1], ['Two Br atoms per molecule', 1]],
    d: 3, c: 'application', t: [4],
  }), () => near(v, 85.106, 0.001) && Math.abs(atoms - 2) < 0.01 || 'br');
}
{
  const m = 0.496;
  const p = 0.444;
  const v = pctFrom(2 * A.P, MM.Mg2P2O7, p, m);
  add('cariusp-short3', short({
    marks: 3,
    stem: `Describe how phosphorus in an organic compound is estimated by the Carius method, writing the equation for the ignition of magnesium ammonium phosphate, and find %P if ${f(m, 4)} g of the compound gives ${f(p, 4)} g of Mg₂P₂O₇ (Mg = 24, P = 31, O = 16).`,
    model: r`The compound is heated with fuming HNO₃ in a sealed tube, which oxidises its phosphorus to phosphoric acid. Magnesia mixture ($\ce{MgCl2}$, $\ce{NH4Cl}$ and ammonia) precipitates $\ce{MgNH4PO4}$, which is filtered, washed and ignited: $\ce{2MgNH4PO4 -> Mg2P2O7 + 2NH3 + H2O}$. The pyrophosphate is weighed. $\%\,\text{P} = \dfrac{62}{222} \times \dfrac{0.4440}{0.4960} \times 100 = 25.0\%$.`,
    sol: 'Oxidation to H₃PO₄; precipitation; ignition equation; 25.0%.',
    scheme: [['Oxidation to phosphoric acid; magnesia mixture gives MgNH₄PO₄', 1], ['Ignition equation, balanced', 1], ['62/222 × (0.4440 ÷ 0.4960) × 100 = 25.0%', 1]],
    d: 3, c: 'application', t: [4],
  }), () => near(v, 25.0, 0.001) || 'cariusp');
}
// ---------------------------------------------------------------- long items
add('purify-long', long({
  stem: '(a) A research student has three samples: (i) aniline contaminated with a non-volatile tar, (ii) crude benzoic acid containing a little insoluble dirt, (iii) a miscible mixture of hexane (bp 342 K) and heptane (bp 372 K). Name the most suitable purification method for each and give one reason. [3]\n\n(b) Describe the set-up of steam distillation and say how the condition that the compound is steam-volatile and immiscible with water makes the method work. [2]',
  model: '(a) (i) Steam distillation: aniline is steam-volatile and immiscible with water, and the tar stays behind. (ii) Crystallisation: dissolve in hot water, filter off the dirt, cool to crystallise the acid. (iii) Fractional distillation: the boiling points differ by only 30 K, so a fractionating column is needed. (b) Steam from a steam generator is passed into a flask containing the compound and water; the vapour of water and the compound goes into a condenser and the distillate collects in a receiver, where the two liquids form separate layers. The mixture boils when the sum of the two vapour pressures equals atmospheric pressure, which is below 373 K, so the compound distils without decomposing.',
  sol: 'Three methods with reasons; steam distillation set-up and principle.',
  scheme: [['(a) steam distillation with reason', 1], ['(a) crystallisation with reason', 1], ['(a) fractional distillation with reason', 1], ['(b) set-up: steam generator, flask, condenser, receiver', 1], ['(b) sum of vapour pressures below 373 K', 1]],
  d: 3, c: 'application', t: [1],
}));
add('lass-long', long({
  stem: '(a) How is the sodium fusion extract prepared? [1]\n\n(b) Write the balanced equations for the confirmation of nitrogen as Prussian blue, starting from NaCN, with iron(II) sulphate and then iron(III) chloride. [2]\n\n(c) A fusion extract of a compound gives no Prussian blue and no black precipitate with lead acetate, but gives a blood-red colour with iron(III) chloride after acidifying with HCl. Name the elements present and give the equation for the red colour. [2]',
  model: r`(a) The compound is heated strongly with a small piece of sodium in a fusion tube until red hot; the tube is plunged into distilled water, boiled and filtered to give the extract. (b) $\ce{FeSO4 + 6NaCN -> Na4Fe(CN)6 + Na2SO4}$; $\ce{3Na4Fe(CN)6 + 4FeCl3 -> Fe4[Fe(CN)6]3 + 12NaCl}$. (c) Nitrogen and sulphur are both present: they form NaSCN in the fusion, which gives $\ce{3NaSCN + FeCl3 -> Fe(SCN)3 + 3NaCl}$, the blood-red iron(III) thiocyanate.`,
  sol: 'Fusion and extract; two equations; NaSCN and the red equation.',
  scheme: [['(a) fusion with sodium, plunge into water, boil, filter', 1], ['(b) two balanced equations (1 each)', 2], ['(c) nitrogen and sulphur named', 1], ['(c) balanced equation for Fe(SCN)₃', 1]],
  d: 3, c: 'application', t: [2],
}));
{
  const m = 0.265;
  const p = 0.574;
  const v = pctFrom(A.Cl, MM.AgCl, p, m);
  add('carius-long', long({
    stem: `(a) Outline the Carius method for estimating chlorine in an organic compound: the reagents, the treatment of the tube and what is weighed. [2]\n\n(b) Name the compound that is weighed in the Carius estimation of phosphorus and write the formula of the percentage. [1]\n\n(c) ${f(m, 4)} g of an organic chloride gave ${f(p, 4)} g of AgCl. Find the percentage of chlorine. (Ag = 108, Cl = 35.5) [2]`,
    model: r`(a) The compound is heated with fuming HNO₃ and AgNO₃ in a sealed hard-glass tube in a furnace; the carbon and hydrogen go to CO₂ and H₂O and the chlorine forms AgCl. The tube is cooled and opened, and the precipitate is filtered, washed, dried and weighed. (b) Magnesium pyrophosphate, Mg₂P₂O₇; $\%\,\text{P} = \dfrac{62}{222} \times \dfrac{m_1}{m} \times 100$. (c) $\%\,\text{Cl} = \dfrac{35.5}{143.5} \times \dfrac{0.5740}{0.2650} \times 100 = 53.6\%$.`,
    sol: 'Method; Mg₂P₂O₇ and formula; 53.6%.',
    scheme: [['(a) fuming HNO₃ and AgNO₃, sealed tube and furnace', 1], ['(a) filter, wash, dry, weigh AgCl', 1], ['(b) Mg₂P₂O₇ and 62/222 formula', 1], ['(c) 35.5/143.5 × (0.5740 ÷ 0.2650) × 100', 1], ['(c) 53.6%', 1]],
    d: 3, c: 'application', t: [4],
  }), () => near(v, 53.58, 0.001) || 'carius-long');
}
