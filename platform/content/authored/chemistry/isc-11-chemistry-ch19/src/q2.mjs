// ch19 question bank, part 2: t03 estimation of carbon, hydrogen (Liebig) and nitrogen (Kjeldahl).
import { mk, add, r, near } from './lib.mjs';
import { A, MM, pctC, pctH, pctN, f } from './data.mjs';

const { mcq, tf, num, short, long } = mk;

add('order-mcq', mcq({
  stem: 'In a Liebig combustion train, the absorber for water is placed before the absorber for carbon dioxide because:',
  right: 'anhydrous calcium chloride takes up water but not CO₂, whereas concentrated KOH solution would take up CO₂ and water vapour together',
  wrong: ['KOH reacts with water to give hydrogen', 'calcium chloride takes up CO₂ more strongly than KOH', 'the CO₂ is formed before the water and must be trapped later'],
  sol: 'If the KOH bulbs came first, they would absorb both gases and the water could not be weighed separately. Anhydrous CaCl₂ absorbs only water, so CO₂ passes on to the KOH — option (@K).',
  d: 3, c: 'analysis', t: [3],
}));
add('cuo-role-mcq', mcq({
  stem: 'In the combustion tube of a Liebig apparatus, a layer of copper(II) oxide granules is kept hot beyond the sample boat so that any carbon monoxide or unburnt vapour is:',
  right: 'oxidised completely to carbon dioxide and water',
  wrong: ['reduced to carbon and hydrogen', 'absorbed as copper carbonate', 'condensed as a liquid before reaching the U-tube'],
  sol: 'Hot CuO oxidises CO to CO₂ and any hydrogen or hydrocarbon vapour to water and CO₂, so all carbon and hydrogen are weighed as CO₂ and H₂O — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('k2so4-mcq', mcq({
  stem: 'During the digestion step of Kjeldahl’s method, potassium sulphate is added to the concentrated sulphuric acid mainly to:',
  right: 'raise the boiling point of the acid so that digestion is faster',
  wrong: ['neutralise the ammonia as soon as it forms', 'oxidise the nitrogen to nitrate', 'act as the indicator for the titration'],
  sol: 'K₂SO₄ raises the boiling temperature of the acid, which speeds the conversion of the nitrogen to ammonium sulphate; CuSO₄ acts as a catalyst — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('kjnot-mcq', mcq({
  stem: 'A fertiliser testing lab uses Kjeldahl’s method on several nitrogen compounds. The method will give an unreliable (low) result for the nitrogen in:',
  right: 'nitrobenzene, C₆H₅NO₂',
  wrong: ['urea, CO(NH₂)₂', 'aniline, C₆H₅NH₂', 'ethanamide, CH₃CONH₂'],
  sol: 'Nitrogen in nitro and azo groups and in a ring (as in pyridine) is not converted completely to ammonium sulphate, so those compounds are not suited — option (@K). Amines and amides (@1, @2, @3) give ammonium sulphate.',
  d: 2, c: 'application', t: [3],
}));
add('kj-tf', tf({
  stem: 'Kjeldahl’s method converts the nitrogen in a compound to ammonium sulphate, and the ammonia is liberated later by heating with excess sodium hydroxide.',
  key: 't',
  sol: 'True. Digestion with concentrated H₂SO₄ gives (NH₄)₂SO₄; boiling with excess NaOH liberates NH₃ for absorption in standard acid.',
  d: 1, c: 'recall', t: [3],
}));

{
  const m = 0.32;
  const mc = 0.528;
  const v = pctC(mc, m);
  add('carbon-num', num({
    stem: `A dairy chemist burns ${f(m, 4)} g of a pure organic compound in a Liebig train. The weighed bulbs of concentrated KOH solution gain ${f(mc, 4)} g of carbon dioxide (C = 12, O = 16). Find the percentage of carbon in the compound.`,
    value: 45.0, tol: 0.1, unit: '%',
    sol: r`$\%\,\text{C} = \dfrac{12}{44} \times \dfrac{${f(mc, 4)}}{${f(m, 4)}} \times 100 = ${f(v, 2)}\%$.`,
    scheme: [['Uses 12/44 × (mass of CO₂ ÷ mass of compound) × 100', 0.5], ['45.0%', 0.5]],
    d: 1, c: 'understanding', t: [3],
  }), () => near(v, 45.0, 0.001) || 'carbon');
}
{
  const m = 0.215;
  const mh = 0.1161;
  const v = pctH(mh, m);
  add('hydrogen-num', num({
    stem: `A student burns ${f(m, 4)} g of a compound and finds that the weighed anhydrous CaCl₂ U-tube gains ${f(mh, 4)} g of water (H = 1, O = 16). What is the percentage of hydrogen in the compound?`,
    value: 6.00, tol: 0.05, unit: '%',
    sol: r`$\%\,\text{H} = \dfrac{2}{18} \times \dfrac{${f(mh, 4)}}{${f(m, 4)}} \times 100 = ${f(v, 2)}\%$.`,
    scheme: [['Uses 2/18 × (mass of H₂O ÷ mass of compound) × 100', 0.5], ['6.00%', 0.5]],
    d: 1, c: 'understanding', t: [3],
  }), () => near(v, 6.0, 0.001) || 'hydrogen');
}
{
  const m = 0.25;
  const Mr = 2 * A.C + 6 * A.H; // ethane, 30
  const mco2 = (m / Mr) * 2 * MM.CO2;
  add('co2-num', num({
    stem: `A sample of ethane gas weighing ${f(m, 3)} g is burnt completely in excess oxygen in a combustion tube (C = 12, H = 1, O = 16). Using the balanced equation $\\ce{2C2H6 + 7O2 -> 4CO2 + 6H2O}$, find the mass of carbon dioxide formed, in g.`,
    value: 0.733, tol: 0.002, unit: 'g',
    sol: r`$n(\ce{C2H6}) = \dfrac{${f(m, 3)}}{30} = 8.33 \times 10^{-3}\ \text{mol}$; the equation gives $2$ mol $\ce{CO2}$ per mol $\ce{C2H6}$, so $n(\ce{CO2}) = 1.67 \times 10^{-2}\ \text{mol}$. $m = 1.667 \times 10^{-2} \times 44 = ${f(mco2, 3)}\ \text{g}$.`,
    scheme: [['Moles of ethane', 0.5], ['Moles of CO₂ from 2 : 4 ratio and mass 0.733 g', 0.5]],
    d: 2, c: 'application', t: [3],
  }), () => near(mco2, 0.7333, 0.001) || 'co2');
}
{
  const m = 0.28;
  const Macid = 0.05;
  const V = 30.0;
  const Nn = 2 * Macid;
  const v = pctN(Nn, V, m);
  const viaMol = ((2 * Macid * (V / 1000) * A.N) / m) * 100;
  add('kj-num', num({
    stem: `In a Kjeldahl estimation of a feed supplement, the ammonia from ${f(m, 4)} g of the sample is absorbed in ${f(V, 1)} mL of ${f(Macid, 4)} mol L⁻¹ H₂SO₄ and exactly neutralises it (N = 14). Find the percentage of nitrogen.`,
    value: 15.0, tol: 0.1, unit: '%',
    sol: r`Normality of the acid $= 2 \times ${f(Macid, 4)} = ${f(Nn, 3)}$ N. $\%\,\text{N} = \dfrac{1.4 \times N \times V}{m} = \dfrac{1.4 \times ${f(Nn, 3)} \times ${f(V, 1)}}{${f(m, 4)}} = ${f(v, 1)}\%$. (Check by moles: $n(\ce{NH3}) = 2 \times ${f(Macid, 4)} \times 0.0300 = 3.00 \times 10^{-3}$ mol, mass of N $= 0.0420$ g.)`,
    scheme: [['Converts molarity to normality (×2)', 0.5], ['15.0%', 0.5]],
    d: 2, c: 'application', t: [3],
  }), () => near(v, 15.0, 0.001) && near(viaMol, v, 0.0001) || 'kj');
}
add('liebig-eq-short', short({
  marks: 2,
  stem: r`In an experiment on a propane sample, the gas is passed over hot copper(II) oxide and the products are weighed. Write the balanced equation for the oxidation of propane by copper(II) oxide, and for the absorption of the carbon dioxide formed in the potassium hydroxide solution.`,
  model: r`$\ce{C3H8 + 10CuO -> 3CO2 + 4H2O + 10Cu}$ and $\ce{CO2 + 2KOH -> K2CO3 + H2O}$.`,
  sol: 'Two balanced equations.',
  scheme: [['Oxidation by CuO balanced', 1], ['CO₂ absorbed in KOH, balanced', 1]],
  d: 2, c: 'application', t: [3],
}));
add('kjeq-short', short({
  marks: 2,
  stem: r`In Kjeldahl’s method the digest, which contains ammonium sulphate, is boiled with excess sodium hydroxide, and the ammonia is passed into standard sulphuric acid. Write the two balanced equations.`,
  model: r`$\ce{(NH4)2SO4 + 2NaOH -> Na2SO4 + 2NH3 + 2H2O}$ and $\ce{2NH3 + H2SO4 -> (NH4)2SO4}$.`,
  sol: 'Two balanced equations.',
  scheme: [['Liberation of ammonia, balanced', 1], ['Absorption in H₂SO₄, balanced', 1]],
  d: 2, c: 'understanding', t: [3],
}));
{
  const m = 0.176;
  const mc = 0.352;
  const mh = 0.144;
  const pc = pctC(mc, m);
  const ph = pctH(mh, m);
  const po = 100 - pc - ph;
  const nc = pc / A.C;
  const nh = ph / A.H;
  const no = po / A.O;
  const mn = Math.min(nc, nh, no);
  const rat = [nc / mn, nh / mn, no / mn];
  add('empirical-short3', short({
    marks: 3,
    stem: `A sample of ${f(m, 4)} g of a compound containing C, H and O only gave ${f(mc, 4)} g of CO₂ and ${f(mh, 4)} g of H₂O on combustion in a Liebig train (C = 12, H = 1, O = 16). Find the percentage of each element and the empirical formula, and then the molecular formula if the molar mass is 88 g mol⁻¹.`,
    model: r`%C $= \dfrac{12}{44} \times \dfrac{0.3520}{0.1760} \times 100 = 54.5$; %H $= \dfrac{2}{18} \times \dfrac{0.1440}{0.1760} \times 100 = 9.09$; %O $= 100 - 54.5 - 9.09 = 36.4$. Mole ratio C : H : O $= 4.54 : 9.09 : 2.27 = 2 : 4 : 1$, so the empirical formula is $\ce{C2H4O}$ (mass 44). Molecular formula $= \ce{C4H8O2}$ since $88 \div 44 = 2$.`,
    sol: 'Percentages; ratio 2 : 4 : 1; molecular formula C₄H₈O₂.',
    scheme: [['%C and %H from CO₂ and H₂O', 1], ['%O by difference; mole ratio and empirical formula C₂H₄O', 1], ['Molecular formula C₄H₈O₂ using n = 2', 1]],
    d: 3, c: 'application', t: [3],
  }), () => near(pc, 54.545, 0.001) && near(ph, 9.0909, 0.001) && Math.abs(rat[0] - 2) < 0.01 && Math.abs(rat[1] - 4) < 0.01 && Math.abs(rat[2] - 1) < 0.01 && 2 * (2 * A.C + 4 * A.H + A.O) === 88 || 'empirical');
}
{
  const m = 0.4;
  const Ma = 0.25; // H2SO4 mol/L
  const Va = 40.0;
  const Mb = 0.2; // NaOH
  const Vb = 30.0;
  const nHacid = 2 * Ma * (Va / 1000);
  const nOH = Mb * (Vb / 1000);
  const nNH3 = nHacid - nOH;
  const v = ((nNH3 * A.N) / m) * 100; // 49.0
  const equivML = Va - (Mb * Vb) / (2 * Ma); // mL of 0.500 N acid used by NH3
  const viaFormula = pctN(2 * Ma, equivML, m);
  add('kjback-short3', short({
    marks: 3,
    stem: `The ammonia from ${f(m, 4)} g of a nitrogen-rich fertiliser additive in a Kjeldahl run is passed into ${f(Va, 1)} mL of ${f(Ma, 3)} mol L⁻¹ H₂SO₄. The acid left over needs ${f(Vb, 1)} mL of ${f(Mb, 3)} mol L⁻¹ NaOH for neutralisation (N = 14). Calculate the percentage of nitrogen.`,
    model: r`Moles of H⁺ in the acid $= 2 \times 0.250 \times 0.0400 = 0.0200$ mol. Moles of H⁺ left over $=$ moles of NaOH $= 0.200 \times 0.0300 = 6.00 \times 10^{-3}$ mol. H⁺ neutralised by $\ce{NH3}$ $= 0.0200 - 0.00600 = 0.0140$ mol $= n(\ce{NH3})$. Mass of N $= 0.0140 \times 14 = 0.196$ g. $\%\,\text{N} = \dfrac{0.196}{0.4000} \times 100 = 49.0\%$.`,
    sol: 'Back titration; moles of NH₃; 49.0%.',
    scheme: [['Moles of acid taken and of NaOH used', 1], ['Moles of NH₃ by difference', 1], ['Mass of N and 49.0%', 1]],
    d: 3, c: 'application', t: [3],
  }), () => near(v, 49.0, 0.001) && near(viaFormula, 49.0, 0.001) || 'kjback');
}
{
  const Mr = 118;
  const m = 0.472;
  const Macid = 0.1;
  const V = 40.0;
  const nNH3 = 2 * Macid * (V / 1000);
  const mN = nNH3 * A.N;
  const v = (mN / m) * 100;
  const atoms = nNH3 / (m / Mr);
  add('kjatoms-short3', short({
    marks: 3,
    stem: `A compound of molar mass ${Mr} g mol⁻¹ (given) contains only C, H and N. In a Kjeldahl determination, the ammonia from ${f(m, 4)} g of it neutralises exactly ${f(V, 1)} mL of ${f(Macid, 3)} mol L⁻¹ H₂SO₄ (N = 14). Find the percentage of nitrogen and the number of nitrogen atoms in one molecule.`,
    model: r`Moles of $\ce{NH3}$ $= 2 \times 0.100 \times 0.0400 = 8.00 \times 10^{-3}$ mol, so mass of N $= 8.00 \times 10^{-3} \times 14 = 0.112$ g. $\%\,\text{N} = \dfrac{0.112}{0.4720} \times 100 = 23.7\%$. Moles of compound $= 0.4720 \div 118 = 4.00 \times 10^{-3}$ mol, so N atoms per molecule $= \dfrac{8.00 \times 10^{-3}}{4.00 \times 10^{-3}} = 2$.`,
    sol: '23.7%; two N atoms.',
    scheme: [['Moles of NH₃ and mass of N', 1], ['23.7%', 1], ['Two N atoms per molecule', 1]],
    d: 4, c: 'analysis', t: [3],
  }), () => near(v, 23.73, 0.001) && Math.abs(atoms - 2) < 1e-9 || 'kjatoms');
}
const lC = pctC(0.66, 0.21);
const lH = pctH(0.27, 0.21);
const lCheck = () => near(lC, 85.714, 0.001) && near(lH, 14.286, 0.001) && Math.abs(lC + lH - 100) < 0.01 || 'liebig-long';
add('liebig-long', long({
  stem: '(a) A student sets up Liebig’s method. Name the absorbers in order, with the substance each contains, and say what each one absorbs. [2]\n\n(b) Write the balanced equation for the oxidation of ethane by copper(II) oxide. [1]\n\n(c) A sample of 0.2100 g of a compound gave 0.6600 g of CO₂ and 0.2700 g of H₂O. Find %C and %H, and show that the sample is a hydrocarbon. (C = 12, H = 1, O = 16) [2]',
  model: r`(a) First a U-tube of anhydrous calcium chloride, which absorbs the water; then bulbs of concentrated KOH solution, which absorb the carbon dioxide (a soda lime guard tube follows). (b) $\ce{C2H6 + 7CuO -> 2CO2 + 3H2O + 7Cu}$. (c) %C $= \dfrac{12}{44} \times \dfrac{0.6600}{0.2100} \times 100 = ${lC.toFixed(1)}$; %H $= \dfrac{2}{18} \times \dfrac{0.2700}{0.2100} \times 100 = ${lH.toFixed(1)}$. The sum is $${(lC + lH).toFixed(1)}\%$, so there is no other element (no oxygen): the sample is a hydrocarbon (C : H $= ${(lC / 12).toFixed(2)} : ${lH.toFixed(1)} = 1 : 2$, empirical formula $\ce{CH2}$).`,
  sol: 'Order of absorbers; equation; %C and %H.',
  scheme: [['(a) CaCl₂ for water, then KOH for CO₂', 2], ['(b) balanced equation', 1], ['(c) %C and %H', 1], ['(c) sum near 100 so a hydrocarbon', 1]],
  d: 3, c: 'application', t: [3],
}), lCheck);
const kv = pctN(0.2, 28.0, 0.35);
const kviaMol = ((2 * 0.1 * 0.028 * A.N) / 0.35) * 100;
add('kj-long', long({
  stem: '(a) Describe the two stages of Kjeldahl’s method for nitrogen, naming the reagents and the catalyst. [2]\n\n(b) Name two kinds of compound for which the method is unsuitable and give the reason. [1]\n\n(c) A compound weighing 0.3500 g gave ammonia that neutralised 28.0 mL of 0.100 mol L⁻¹ H₂SO₄. Find the percentage of nitrogen. (N = 14) [2]',
  model: r`(a) Digestion: the compound is heated with concentrated H₂SO₄, with K₂SO₄ (raises the boiling point) and CuSO₄ (catalyst), converting its nitrogen to ammonium sulphate. Distillation: the digest is boiled with excess NaOH; the NH₃ liberated is absorbed in a measured volume of standard H₂SO₄ and the unused acid is found by titration with standard NaOH. (b) Nitro compounds, azo compounds and compounds with nitrogen in a ring (such as pyridine): the nitrogen is not completely converted to ammonium sulphate. (c) Normality $= 0.200$ N. %N $= \dfrac{1.4 \times 0.200 \times 28.0}{0.3500} = 22.4\%$.`,
  sol: 'Two stages; limitation; 22.4%.',
  scheme: [['(a) digestion with H₂SO₄, K₂SO₄, CuSO₄', 1], ['(a) distillation with NaOH, absorption in standard acid', 1], ['(b) two kinds with reason', 1], ['(c) 1.4 × N × V ÷ m with N = 0.200', 1], ['(c) 22.4%', 1]],
  d: 3, c: 'application', t: [3],
}), () => near(kv, 22.4, 0.001) && near(kviaMol, kv, 0.0001) || 'kj-long');
