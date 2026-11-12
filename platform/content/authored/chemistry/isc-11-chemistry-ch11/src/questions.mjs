// ISC 11 Chemistry ch11 Thermochemistry: question bank (ISC style). Constants: specific heat of dilute solutions 4.18 J g⁻¹ K⁻¹ (density 1 g cm⁻³),
// R not needed. Data: standard enthalpies of formation (CO₂ −393.5, H₂O(l) −285.8, H₂O(g) −241.8, CH₄ −74.8, C₂H₄ +52.3, C₂H₂ +226.7, CO −110.5,
// C₃H₈ −103.8, C₂H₅OH(l) −277.7), mean bond enthalpies (H–H 436, O=O 498, Cl–Cl 242, C–H 414, C–C 347, C=C 611, C≡C 837, C–Cl 326, O–H 463, C=O 799)
// and the heat of neutralisation −57.1 kJ mol⁻¹. Every numerical is computed in JS and re-solved by a check. Assertion-reason keys: a c d b a c.
import { mk, add, r } from './lib.mjs';
import { DF, DC, FUEL, NEUT, C_WATER, BE, sumB, dHbond, dHrxn, SUB, IE, WATER, CUSO4, NOX, ETHYNE, DIAMOND, near, r1, f0, f1, f2, f3, sg, tx } from './data.mjs';

const { mcq, ar, tf, fill, match, num, short, long } = mk;
const cv = (id) => FUEL[id].cv;

// ================================================================ t01 heats of reaction, calorific value
add('form-def-mcq', mcq({
  stem: 'A thermochemistry teacher asks the class to pick the equation whose enthalpy change is the standard enthalpy of formation of liquid ethanol. The correct choice is:',
  right: String.raw`$\ce{2C(graphite) + 3H2(g) + 1/2O2(g) -> C2H5OH(l)}$`,
  wrong: [String.raw`$\ce{C2H4(g) + H2O(l) -> C2H5OH(l)}$`, String.raw`$\ce{2CO2(g) + 3H2O(l) -> C2H5OH(l) + 3O2(g)}$`, String.raw`$\ce{2C(g) + 6H(g) + O(g) -> C2H5OH(l)}$`],
  sol: 'The standard enthalpy of formation refers to one mole of the compound formed from its elements in their standard states (graphite, H₂ gas, O₂ gas). Only one option starts from the elements in those states; the others start from compounds or from gaseous atoms — option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
add('comb-h2-mcq', mcq({
  stem: 'A rocket engineer burns hydrogen in oxygen and condenses the product to liquid water. The enthalpy change per mole of hydrogen burnt, −285.8 kJ mol⁻¹, is numerically also the standard enthalpy of:',
  right: 'formation of liquid water',
  wrong: ['formation of water vapour', 'formation of hydrogen peroxide', 'atomisation of hydrogen'],
  sol: String.raw`$\ce{H2(g) + 1/2O2(g) -> H2O(l)}$ is at once the combustion of one mole of H₂ and the formation of one mole of liquid water from its elements, so the two enthalpies are the same — option (@K).`,
  d: 2, c: 'understanding', t: [1],
}));
add('cv-mcq', (() => {
  const a = FUEL.CH4;
  const b = FUEL.C3H8;
  const c = FUEL.C2H5OH;
  return mcq({
    stem: `A school technician compares three fuels. Methane has ΔcH = ${sg(a.dc)} kJ mol⁻¹ (M = ${a.M} g mol⁻¹), propane ${sg(b.dc)} kJ mol⁻¹ (M = ${b.M}) and ethanol ${sg(c.dc)} kJ mol⁻¹ (M = ${c.M}). The fuel with the highest calorific value per gram is:`,
    right: `methane, ${f1(a.cv)} kJ g⁻¹`,
    wrong: [`propane, because it has the largest heat of combustion per mole (${f1(b.cv)} kJ g⁻¹ only)`, `ethanol, ${f1(c.cv)} kJ g⁻¹`, 'all three are equal, since calorific value does not depend on the molar mass'],
    sol: `Calorific value = −ΔcH / M. Methane: ${f1(-a.dc)} / ${a.M} = ${f1(a.cv)} kJ g⁻¹; propane: ${f1(-b.dc)} / ${b.M} = ${f1(b.cv)}; ethanol: ${f1(-c.dc)} / ${c.M} = ${f1(c.cv)}. Methane gives the most heat per gram — option (@K).`,
    d: 2, c: 'application', t: [1],
  });
})(), () => cv('CH4') > cv('C3H8') && cv('C3H8') > cv('C2H5OH') && cv('CH4') === 55.6 || 'cv-mcq');
add('soln-mcq', mcq({
  stem: 'Pellets of ammonium nitrate are dissolved in the water of an instant cold pack for sports injuries. The enthalpy of solution of NH₄NO₃ is +25.7 kJ mol⁻¹ (given). As the pellets dissolve, the pack:',
  right: 'cools, because the dissolution absorbs heat from the water',
  wrong: ['warms, because every dissolution releases heat', 'stays at the same temperature, because the enthalpy change is small', 'warms, because the ions are hydrated by the water'],
  sol: 'A positive enthalpy of solution means the dissolution is endothermic: the energy needed to separate the ions exceeds the energy released on hydration, so heat flows in from the water and the pack cools — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('dil-mcq', mcq({
  stem: 'The heat change when more solvent is added to a solution, lowering its concentration, at constant pressure, is called the enthalpy of:',
  right: 'dilution',
  wrong: ['solution', 'neutralisation', 'sublimation'],
  sol: 'Adding solvent to an existing solution to make it more dilute is dilution, and the heat change is the enthalpy of dilution. Solution refers to dissolving a solute in a solvent — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('cal-def-mcq', mcq({
  stem: 'A cooking-gas supplier quotes the energy content of its product in kJ per kilogram. This quantity is called the:',
  right: 'calorific value',
  wrong: ['enthalpy of formation', 'bond dissociation enthalpy', 'molar heat capacity'],
  sol: 'The calorific value of a fuel is the heat produced by the complete combustion of unit mass of the fuel (kJ g⁻¹ or kJ kg⁻¹) — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('elem-mcq', mcq({
  stem: 'The enthalpy of combustion of graphite is −393.5 kJ mol⁻¹ and that of diamond is −395.4 kJ mol⁻¹. Which statement about their standard enthalpies of formation is correct?',
  right: 'graphite is zero by convention, and diamond is +1.9 kJ mol⁻¹',
  wrong: ['both are zero, since both are forms of carbon', 'graphite is −393.5 kJ mol⁻¹ and diamond is −395.4 kJ mol⁻¹', 'diamond is zero, since it is the harder form'],
  sol: `The standard state of carbon is graphite, the most stable form, so its ΔfH° is zero. For diamond, ΔfH° = ΔcH(graphite) − ΔcH(diamond) = ${tx(DIAMOND.dcGraphite)} − (${tx(DIAMOND.dcDiamond)}) = +${f1(DIAMOND.dH)} kJ mol⁻¹ — option (@K).`,
  d: 3, c: 'application', t: [1, 4],
}), () => DIAMOND.dH === 1.9 || 'elem-mcq');
add('stdstate-mcq', mcq({
  stem: 'A student copying values from a thermochemical data book notices the superscript ° on every enthalpy. The standard state to which these values refer is:',
  right: 'the pure substance at 1 bar pressure and a stated temperature, usually 298 K',
  wrong: ['the substance at 273 K and 1 atm, the conditions called STP', 'the substance cooled to absolute zero', 'a solution of the substance of concentration 1 M at its boiling point'],
  sol: 'Standard enthalpies refer to substances in their standard states: the pure substance (pure solid, pure liquid or ideal gas) at 1 bar, at a temperature that must be stated, usually 298 K. STP (273 K) is a gas-volume convention, not the thermochemical standard state — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('limestone-mcq', mcq({
  stem: 'The heat log of a cement kiln records the decomposition of limestone, $\\ce{CaCO3(s) -> CaO(s) + CO2(g)}$, with ΔH = +178 kJ mol⁻¹. From the sign of ΔH the kiln engineer concludes that the reaction:',
  right: 'absorbs heat, so the kiln must keep supplying energy while it runs',
  wrong: ['releases heat, so the kiln can run once it is started', 'takes place with no exchange of heat with the surroundings', 'gives products whose total enthalpy is lower than that of the reactants'],
  sol: 'A positive ΔH means the products have more enthalpy than the reactants: the reaction is endothermic and draws heat from the surroundings, so the kiln must be heated throughout — option (@K).',
  d: 1, c: 'understanding', t: [1],
}));

// ---- t01 numericals
add('stove-num', (() => {
  const n = 220 / 44;
  const q = n * -DC.C3H8;
  return num({
    stem: `A trekking team's burner uses 220 g of propane (M = 44 g mol⁻¹, ΔcH = ${sg(DC.C3H8)} kJ mol⁻¹). Calculate the heat released, in kJ, when all of it burns completely.`,
    value: r1(q), tol: 1, unit: 'kJ',
    sol: r`Moles $= 220/44 = ${n}$ mol. Heat $= ${n} \times ${f1(-DC.C3H8)} = ${f1(q)}$ kJ.`,
    scheme: [['Moles of propane = 5.0', 0.5], ['5.0 × 2219.9 = 11 099.5 kJ', 0.5]],
    marks: 1, d: 2, c: 'application', t: [1],
  });
})(), (q) => near(5 * 2219.9, q.answer.value, 0.0005) || 'stove-num');
add('calcv-num', (() => {
  const v = -DC.glucose / 180;
  return num({
    stem: `Glucose, C₆H₁₂O₆ (M = 180 g mol⁻¹), is the main fuel of our muscle cells, with ΔcH = ${sg(DC.glucose, 0)} kJ mol⁻¹ (given). Calculate its calorific value in kJ g⁻¹.`,
    value: Number(f2(v)), tol: 0.02, unit: 'kJ g⁻¹',
    sol: r`Calorific value $= \dfrac{-\Delta_cH}{M} = \dfrac{2803}{180} = ${f2(v)}$ kJ g⁻¹.`,
    scheme: [['−ΔcH / M with M = 180', 0.5], ['15.57 kJ g⁻¹', 0.5]],
    marks: 1, d: 1, c: 'understanding', t: [1],
  });
})(), (q) => near(2803 / 180, 15.572, 0.001) && q.answer.value === 15.57 || 'calcv-num');

// ---- t01 true-false, fill, AR
add('cal-tf', tf({
  stem: 'The calorific value of a fuel is normally quoted per mole of the fuel, in kJ mol⁻¹.',
  key: 'f',
  sol: 'False. Calorific value is the heat from burning unit mass of fuel, in kJ g⁻¹ or kJ kg⁻¹; the heat per mole is the enthalpy of combustion.',
  d: 1, c: 'recall', t: [1],
}));
add('comb-fill', fill({
  stem: 'The heat evolved when one mole of a substance burns completely in excess oxygen, with the products in their standard states, is its standard enthalpy of ___.',
  acc: [['combustion', 'Combustion']],
  sol: 'This defines the standard enthalpy of combustion, ΔcH°; it is always negative.',
  d: 1, c: 'recall', t: [1],
}));
add('comb-ar', ar({
  a: 'The enthalpy of combustion of hydrogen gas to liquid water is the same number as the enthalpy of formation of liquid water.',
  r: 'The standard enthalpy of combustion of every substance is negative.',
  key: 'b',
  sol: 'Both statements are true. But the equality of the two numbers arises because the same equation, H₂(g) + ½O₂(g) → H₂O(l), serves for both definitions; the sign of ΔcH does not explain it — option (b).',
  d: 3, c: 'analysis', t: [1],
}));
add('elem-ar', ar({
  a: 'The standard enthalpy of formation of graphite is zero but that of diamond is not.',
  r: 'By convention, the standard enthalpy of formation of the most stable form of an element in its standard state is taken as zero.',
  key: 'a',
  sol: 'Both statements are true. Graphite is the most stable form of carbon under standard conditions, so its ΔfH° is zero by convention; diamond is less stable and its ΔfH° is +1.9 kJ mol⁻¹. R explains A — option (a).',
  d: 2, c: 'understanding', t: [1],
}));
add('fuel-match', match({
  stem: 'Match each fuel with its calorific value, calculated from its enthalpy of combustion.',
  pairs: [['Hydrogen (M = 2)', `${f1(cv('H2'))} kJ g⁻¹`], ['Propane (M = 44)', `${f1(cv('C3H8'))} kJ g⁻¹`], ['Ethanol (M = 46)', `${f1(cv('C2H5OH'))} kJ g⁻¹`], ['Glucose (M = 180)', `${f1(cv('glucose'))} kJ g⁻¹`]],
  order: [1, 3, 0, 2],
  sol: `Calorific value = −ΔcH / M: hydrogen 285.8/2 = ${f1(cv('H2'))}; propane ${f1(-DC.C3H8)}/44 = ${f1(cv('C3H8'))}; ethanol ${f1(-DC.C2H5OH)}/46 = ${f1(cv('C2H5OH'))}; glucose 2803/180 = ${f1(cv('glucose'))} kJ g⁻¹.`,
  d: 3, c: 'application', t: [1],
}));

// ---- t01 short answers
add('def-short2', short({
  marks: 2,
  stem: 'Define the standard enthalpy of formation and the standard enthalpy of combustion of a substance, and write the thermochemical equation for the formation of liquid water.',
  model: 'The standard enthalpy of formation is the enthalpy change when one mole of a compound is formed from its elements in their standard states. The standard enthalpy of combustion is the enthalpy change when one mole of a substance burns completely in excess oxygen, the products being in their standard states. For water: H₂(g) + ½O₂(g) → H₂O(l), ΔfH° = −285.8 kJ mol⁻¹.',
  sol: 'ΔfH°: 1 mol from elements; ΔcH°: 1 mol burnt completely; H₂ + ½O₂ → H₂O(l), −285.8.',
  scheme: [['Both definitions', 1], ['Equation with ΔH = −285.8 kJ mol⁻¹', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('soln-short2', (() => {
  const n = 4.0 / 40;
  const q = n * 44.5;
  return short({
    marks: 2,
    stem: 'Define the enthalpy of solution. A student dissolves 4.0 g of sodium hydroxide (M = 40 g mol⁻¹) in water; the enthalpy of solution of NaOH is −44.5 kJ mol⁻¹ (given). Calculate the heat released.',
    model: `The enthalpy of solution is the enthalpy change when one mole of a substance dissolves in a specified (very large) amount of solvent. Moles of NaOH = 4.0 / 40 = ${n} mol; heat released = ${n} × 44.5 = ${f2(q)} kJ.`,
    sol: `${f2(q)} kJ released.`,
    scheme: [['Definition', 1], [`Moles 0.10 and heat = ${f2(q)} kJ`, 1]],
    d: 2, c: 'application', t: [1],
  });
})(), () => near(0.1 * 44.5, 4.45, 0.001) || 'soln-short2');
add('dil-short2', short({
  marks: 2,
  stem: 'What is meant by the enthalpy of dilution? Why does the solution of a concentrated acid, such as sulfuric acid, become noticeably warm when water is added to it?',
  model: 'The enthalpy of dilution is the heat change when a solution is diluted by adding more solvent at constant pressure. For a concentrated strong acid the ions (and molecules) are more strongly hydrated in the dilute solution, so the energy released in the extra solvation is large and ΔH is negative; the heat is given out and the solution warms.',
  sol: 'Heat change on adding solvent; hydration releases energy, ΔH negative.',
  scheme: [['Definition', 1], ['Extra hydration releases heat: ΔH negative', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('ethyne-short3', (() => {
  const dc = DC.C2H2;
  const v = -dc / 26;
  return short({
    marks: 3,
    stem: `A welder uses ethyne, C₂H₂ (M = 26 g mol⁻¹), for his torch. Using ΔfH values (CO₂ ${sg(DF.CO2)}, H₂O(l) ${sg(DF.H2Ol)}, C₂H₂ ${sg(DF.C2H2)} kJ mol⁻¹) calculate the enthalpy of combustion of ethyne and its calorific value.`,
    model: r`$\ce{C2H2(g) + 5/2O2(g) -> 2CO2(g) + H2O(l)}$. $\Delta_cH = [2(${tx(DF.CO2)}) + (${tx(DF.H2Ol)})] - (+${f1(DF.C2H2)}) = ${tx(dc)}$ kJ mol⁻¹. Calorific value $= 1299.5/26 = ${f1(v)}$ kJ g⁻¹.`,
    sol: r`$\Delta_cH = ${tx(dc)}$ kJ mol⁻¹; calorific value $= ${f1(v)}$ kJ g⁻¹.`,
    scheme: [['Balanced combustion equation', 1], [`ΔcH = ${sg(dc)} kJ mol⁻¹`, 1], [`Calorific value ${f1(v)} kJ g⁻¹`, 1]],
    d: 3, c: 'application', t: [1],
  });
})(), () => dHrxn([[1, 'C2H2']], [[2, 'CO2'], [1, 'H2Ol']]) === -1299.5 && near(1299.5 / 26, 49.98, 0.001) || 'ethyne-short3');
add('cv-short3', (() => {
  const dc = DC.C3H8;
  const per = -dc / 44;
  const heat = 14200 * per;
  return short({
    marks: 3,
    stem: `A cooking-gas cylinder holds 14.2 kg of propane (M = 44 g mol⁻¹). Using ΔfH values (C₃H₈ ${sg(DF.C3H8)}, CO₂ ${sg(DF.CO2)}, H₂O(l) ${sg(DF.H2Ol)} kJ mol⁻¹), find the enthalpy of combustion of propane, its calorific value, and the heat available from one full cylinder.`,
    model: r`$\ce{C3H8(g) + 5O2(g) -> 3CO2(g) + 4H2O(l)}$. $\Delta_cH = [3(${tx(DF.CO2)}) + 4(${tx(DF.H2Ol)})] - (${tx(DF.C3H8)}) = ${tx(dc)}$ kJ mol⁻¹. Calorific value $= 2219.9/44 = ${f2(per)}$ kJ g⁻¹. Heat from 14 200 g $= 14200 \times ${f2(per)} \approx 7.16 \times 10^{5}$ kJ.`,
    sol: r`$\Delta_cH = ${tx(dc)}$ kJ mol⁻¹; ${f2(per)} kJ g⁻¹; about $7.16 \times 10^{5}$ kJ.`,
    scheme: [[`ΔcH = ${sg(dc)} kJ mol⁻¹`, 1], [`Calorific value ${f2(per)} kJ g⁻¹`, 1], ['About 7.16 × 10⁵ kJ per cylinder', 1]],
    d: 3, c: 'application', t: [1],
  });
})(), () => dHrxn([[1, 'C3H8']], [[3, 'CO2'], [4, 'H2Ol']]) === -2219.9 && near(14200 * (2219.9 / 44), 7.164e5, 0.001) || 'cv-short3');
add('solnheat-short3', (() => {
  const n = 5.0 / 80;
  const q = n * 25.7 * 1000;
  const dT = q / (105 * C_WATER);
  return short({
    marks: 3,
    stem: 'A student dissolves 5.0 g of ammonium nitrate (M = 80 g mol⁻¹) in 100 g of water in an insulated cup. The enthalpy of solution is +25.7 kJ mol⁻¹. Taking the specific heat of the solution as 4.18 J g⁻¹ K⁻¹ and its mass as 105 g, calculate the fall in temperature.',
    model: r`Moles $= 5.0/80 = ${f4(n)}$ mol. Heat absorbed $= ${f4(n)} \times 25.7 = ${f3(q / 1000)}$ kJ $= ${f0(q)}$ J. From $q = mc\Delta T$: $\Delta T = ${f0(q)}/(105 \times 4.18) \approx ${f1(dT)}$ K fall.`,
    sol: r`$\Delta T = ${f0(q)}/(105 \times 4.18) \approx ${f1(dT)}$ K.`,
    scheme: [['Moles 0.0625', 0.5], ['Heat absorbed 1606 J', 1], ['ΔT = q / (m c) = 3.7 K, a fall', 1.5]],
    d: 3, c: 'application', t: [1],
  });
})(), () => near(((5 / 80) * 25700) / (105 * 4.18), 3.66, 0.003) || 'solnheat');
function f4(x) {
  return x.toFixed(4);
}

// ================================================================ t02 neutralisation
add('neut-const-mcq', mcq({
  stem: 'A student finds that hydrochloric acid with sodium hydroxide, and nitric acid with potassium hydroxide, each release almost 57 kJ per mole of water formed. This constancy is because:',
  right: 'strong acids and strong bases are completely ionised, so the only net change is H⁺(aq) + OH⁻(aq) → H₂O(l)',
  wrong: ['every acid contains the same number of ions per mole', 'the same mass of water is formed in each case', 'the metal ions react with the acid anions and release equal heat'],
  sol: 'In dilute solution a strong acid and a strong base are fully ionised, so the spectator ions (Na⁺, K⁺, Cl⁻, NO₃⁻) do not change and the common net reaction is the combination of H⁺ and OH⁻ to form water, with ΔH ≈ −57.1 kJ mol⁻¹ — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('neut-h2so4-mcq', (() => {
  const n = 0.1 * 2;
  const q = n * 57.1;
  return mcq({
    stem: `In a dye factory's quality test, 100 cm³ of 1.0 M sulfuric acid is mixed with 200 cm³ of 1.0 M sodium hydroxide. Taking the heat of neutralisation as −57.1 kJ per mole of water, the heat released is about:`,
    right: `${f1(q)} kJ`,
    wrong: [`${f1(q / 2)} kJ`, `${f1(q * 2)} kJ`, '57.1 kJ'],
    sol: `H⁺ from the acid = 2 × 0.100 = 0.200 mol; OH⁻ = 0.200 mol, so 0.200 mol of water forms. Heat = 0.200 × 57.1 = ${f2(q)} kJ ≈ ${f1(q)} kJ — option (@K).`,
    d: 3, c: 'application', t: [2],
  });
})(), () => near(0.2 * 57.1, 11.42, 0.001) || 'neut-h2so4');
add('neut-weak-mcq', (() => {
  const x = -NEUT.strong + NEUT.hcn; // 57.1 − 12.1 = 45.0
  return mcq({
    stem: 'The heat released when hydrogen cyanide solution is neutralised by sodium hydroxide is only 12.1 kJ per mole of water, against 57.1 kJ for hydrochloric acid with sodium hydroxide. Taking the difference as the energy spent in ionising the weak acid, the enthalpy of ionisation of HCN is about:',
    right: `+${f1(x)} kJ mol⁻¹`,
    wrong: [`−${f1(x)} kJ mol⁻¹`, '+12.1 kJ mol⁻¹', `+${f1(57.1 + 12.1)} kJ mol⁻¹`],
    sol: `The weak acid must ionise as the neutralisation proceeds, absorbing energy. Enthalpy of ionisation ≈ 57.1 − 12.1 = +${f1(x)} kJ mol⁻¹ (endothermic) — option (@K).`,
    d: 3, c: 'application', t: [2],
  });
})(), () => near(57.1 - 12.1, 45.0, 0.001) || 'neut-weak');
add('neut-temp-mcq', (() => {
  const nAcid = 0.05;
  const nBase = 0.04;
  const nw = Math.min(nAcid, nBase);
  const q = nw * 57.1 * 1000;
  const dT = q / (130 * C_WATER);
  const wrong = (0.05 * 57.1 * 1000) / (130 * C_WATER);
  return mcq({
    stem: 'In a school experiment, 50 cm³ of 1.0 M nitric acid is mixed with 80 cm³ of 0.50 M potassium hydroxide. Assume a heat of neutralisation of −57.1 kJ per mole of water, a solution density of 1 g cm⁻³ and a specific heat of 4.18 J g⁻¹ K⁻¹. The temperature rise is closest to:',
    right: `${f1(dT)} K`,
    wrong: [`${f1(wrong)} K`, `${f1(dT / 2)} K`, `${f1(dT * 2)} K`],
    sol: `Acid = 0.050 mol H⁺, base = 0.040 mol OH⁻, so the base is limiting: 0.040 mol of water forms. q = 0.040 × 57 100 = ${f0(q)} J. ΔT = q / (m c) = ${f0(q)} / (130 × 4.18) = ${f1(dT)} K — option (@K).`,
    d: 3, c: 'application', t: [2],
  });
})(), () => near((0.04 * 57100) / (130 * 4.18), 4.203, 0.003) || 'neut-temp');
add('neut-cal-num', (() => {
  const n = 0.075;
  const q = 150 * C_WATER * 6.7;
  const h = q / 1000 / n;
  return num({
    stem: 'A student mixes 75 cm³ of 1.0 M nitric acid with 75 cm³ of 1.0 M potassium hydroxide in an insulated cup and records a temperature rise of 6.7 K (given). Taking the density of the solution as 1 g cm⁻³ and its specific heat as 4.18 J g⁻¹ K⁻¹, calculate the heat released per mole of water formed, in kJ mol⁻¹.',
    value: Number(f1(h)), tol: 0.1, unit: 'kJ mol⁻¹',
    sol: r`$q = mc\Delta T = 150 \times 4.18 \times 6.7 = ${f0(q)}$ J $= ${f3(q / 1000)}$ kJ; moles of water $= 0.075 \times 1.0 = 0.075$. Heat per mole $= ${f3(q / 1000)}/0.075 = ${f1(h)}$ kJ mol⁻¹.`,
    scheme: [['q = m c ΔT = 4201 J', 0.5], ['0.075 mol of water', 0.5], ['56.0 kJ mol⁻¹', 1]],
    marks: 2, d: 3, c: 'application', t: [2],
  });
})(), (q) => near((150 * 4.18 * 6.7) / 1000 / 0.075, 56.01, 0.002) && q.answer.value === 56.0 || 'neut-cal-num');
add('neut-tf', tf({
  stem: 'The heat of neutralisation has the same value, about −57.1 kJ per mole of water, for every acid reacting with every base.',
  key: 'f',
  sol: 'False. The value is constant only for a strong acid with a strong base; for a weak acid or weak base part of the energy is used up in ionisation, so less heat is released.',
  d: 1, c: 'understanding', t: [2],
}));
add('neut-fill', fill({
  stem: 'For a strong acid with a strong base in dilute solution, the heat of neutralisation is about ___ kJ per mole of water formed (magnitude).',
  acc: [['57.1', '57', '57.3', '−57.1', '-57.1']],
  sol: 'The net reaction H⁺ + OH⁻ → H₂O releases about 57.1 kJ per mole of water.',
  d: 1, c: 'recall', t: [2],
}));
add('weak-ar', ar({
  a: 'The heat released when ethanoic acid is neutralised by sodium hydroxide is less than 57.1 kJ per mole of water.',
  r: 'Ethanoic acid is completely ionised in dilute aqueous solution.',
  key: 'c',
  sol: 'A is true: about 55.2 kJ mol⁻¹ is released. R is false: ethanoic acid is only slightly ionised, and the energy needed to ionise the remaining acid (about 1.9 kJ mol⁻¹) reduces the heat released — option (c).',
  d: 2, c: 'analysis', t: [2],
}));
add('neut-ar', ar({
  a: 'The heats of neutralisation of hydrochloric acid by sodium hydroxide and of nitric acid by potassium hydroxide are almost equal.',
  r: 'In each case the net change is the combination of one mole of H⁺(aq) with one mole of OH⁻(aq) to form water.',
  key: 'a',
  sol: 'Both statements are true. The other ions are spectators in both reactions, so the heat depends only on H⁺ + OH⁻ → H₂O, and R explains A — option (a).',
  d: 2, c: 'understanding', t: [2],
}));
add('neutconst-short2', short({
  marks: 2,
  stem: 'Write the ionic equation that is common to the neutralisation of every strong acid by every strong base in dilute solution, and state the enthalpy change per mole of water formed.',
  model: 'H⁺(aq) + OH⁻(aq) → H₂O(l), ΔH = −57.1 kJ mol⁻¹. A strong acid and a strong base are completely ionised, so the other ions are spectators and the heat of neutralisation is the same for all such pairs.',
  sol: 'H⁺ + OH⁻ → H₂O(l); −57.1 kJ per mole of water.',
  scheme: [['Ionic equation', 1], ['ΔH = −57.1 kJ mol⁻¹ with the reason (complete ionisation)', 1]],
  d: 1, c: 'understanding', t: [2],
}));
add('weak-short2', (() => {
  const x = -NEUT.strong + NEUT.ethanoic;
  return short({
    marks: 2,
    stem: 'The heat of neutralisation of ethanoic acid by sodium hydroxide is −55.2 kJ mol⁻¹, against −57.1 kJ mol⁻¹ for a strong acid and a strong base. Explain the difference and calculate the enthalpy of ionisation of ethanoic acid.',
    model: `Ethanoic acid is a weak acid and is only partly ionised. As it is neutralised, more molecules must ionise, and this absorbs energy, so less heat is given out. Enthalpy of ionisation ≈ 57.1 − 55.2 = +${f1(x)} kJ mol⁻¹.`,
    sol: `+${f1(x)} kJ mol⁻¹.`,
    scheme: [['Weak acid must ionise, which absorbs energy', 1], [`57.1 − 55.2 = +${f1(x)} kJ mol⁻¹`, 1]],
    d: 2, c: 'application', t: [2],
  });
})(), () => near(57.1 - 55.2, 1.9, 0.001) || 'weak-short2');
add('neutcal-short3', (() => {
  const q = 200 * C_WATER * 3.4;
  const n = 0.100 * 0.5;
  const h = q / 1000 / n;
  return short({
    marks: 3,
    stem: 'In a coffee-cup calorimeter, 100 cm³ of 0.50 M hydrochloric acid at 298.0 K is mixed with 100 cm³ of 0.50 M sodium hydroxide at the same temperature, and the highest temperature reached is 301.4 K. Taking the density of the mixture as 1 g cm⁻³ and its specific heat as 4.18 J g⁻¹ K⁻¹, calculate the heat of neutralisation per mole of water and compare it with the accepted value of −57.1 kJ mol⁻¹.',
    model: r`$\Delta T = 301.4 - 298.0 = 3.4$ K; mass $= 200$ g. $q = mc\Delta T = 200 \times 4.18 \times 3.4 = ${f0(q)}$ J. Moles of water $= 0.100 \times 0.50 = 0.050$. $\Delta H = -${f3(q / 1000)}/0.050 = -${f1(h)}$ kJ mol⁻¹, slightly less in magnitude than −57.1 because a little heat is lost to the surroundings.`,
    sol: r`$q = ${f0(q)}$ J; $\Delta H \approx -${f1(h)}$ kJ mol⁻¹.`,
    scheme: [['q = m c ΔT = 2842 J', 1], ['0.050 mol of water', 0.5], ['ΔH ≈ −56.8 kJ mol⁻¹', 1], ['Comparison: slight heat loss', 0.5]],
    d: 3, c: 'application', t: [2],
  });
})(), () => near((200 * 4.18 * 3.4) / 1000 / 0.05, 56.85, 0.002) || 'neutcal');
add('neutweak-short3', (() => {
  const i1 = -NEUT.strong + NEUT.ethanoic;
  const i2 = -NEUT.strong + NEUT.hcn;
  return short({
    marks: 3,
    stem: 'The heats of neutralisation with sodium hydroxide are: hydrochloric acid −57.1, ethanoic acid −55.2 and hydrogen cyanide −12.1 kJ mol⁻¹. Arrange the three acids in order of increasing strength, and explain the trend by estimating the energy spent in ionising each weak acid.',
    model: `The less heat is released, the weaker the acid, because more energy is needed to ionise it. Order of increasing strength: HCN < CH₃COOH < HCl. Energy spent on ionisation (relative to 57.1): ethanoic acid 57.1 − 55.2 = ${f1(i1)} kJ mol⁻¹; HCN 57.1 − 12.1 = ${f1(i2)} kJ mol⁻¹; HCl about zero, since it is already completely ionised.`,
    sol: `HCN < CH₃COOH < HCl; ionisation ${f1(i1)} and ${f1(i2)} kJ mol⁻¹.`,
    scheme: [['Order HCN < CH₃COOH < HCl', 1], [`Ionisation energies ${f1(i1)} and ${f1(i2)} kJ mol⁻¹`, 1], ['Reason: ionisation absorbs energy', 1]],
    d: 3, c: 'analysis', t: [2],
  });
})(), () => near(57.1 - 55.2, 1.9, 0.001) && near(57.1 - 12.1, 45.0, 0.001) || 'neutweak3');
add('neut-long', (() => {
  const nw = 0.06;
  const q = nw * 57.1 * 1000;
  const dT = q / (100 * C_WATER);
  return long({
    stem: `(a) Explain, with the ionic equation, why the heat of neutralisation of a strong acid by a strong base is nearly constant. [2]

(b) A student mixes 40 cm³ of 1.0 M sulfuric acid with 60 cm³ of 1.0 M potassium hydroxide in an insulated cup. Taking the heat of neutralisation as −57.1 kJ per mole of water, a density of 1 g cm⁻³ and a specific heat of 4.18 J g⁻¹ K⁻¹, calculate the rise in temperature. [3]`,
    model: r`(a) A strong acid and a strong base are completely ionised in dilute solution, so the net reaction is always $\ce{H+(aq) + OH-(aq) -> H2O(l)}$ and the other ions are spectators; the heat released per mole of water is therefore the same, about 57.1 kJ.

(b) H⁺ $= 2 \times 0.040 = 0.080$ mol; OH⁻ $= 0.060$ mol, so the base is limiting and 0.060 mol of water forms. $q = 0.060 \times 57\,100 = ${f0(q)}$ J. $\Delta T = q/(mc) = ${f0(q)}/(100 \times 4.18) = ${f1(dT)}$ K.`,
    sol: r`0.060 mol of water; $\Delta T = ${f1(dT)}$ K.`,
    scheme: [['(a) Complete ionisation; net equation H⁺ + OH⁻ → H₂O', 1], ['(a) Spectator ions, so same heat per mole', 1], ['(b) Limiting reagent: 0.060 mol water', 1], ['(b) q = 3426 J', 1], ['(b) ΔT = 8.2 K', 1]],
    d: 3, c: 'application', t: [2],
  });
})(), () => near((0.06 * 57100) / (100 * 4.18), 8.196, 0.002) || 'neut-long');

// ================================================================ t03 bond, atomisation, sublimation, phase transition, ionisation
add('atom-cl-mcq', mcq({
  stem: String.raw`A student is told that the bond dissociation enthalpy of Cl–Cl is 242 kJ mol⁻¹. The standard enthalpy of atomisation of chlorine, $\ce{1/2Cl2(g) -> Cl(g)}$, is therefore:`,
  right: `+${242 / 2} kJ mol⁻¹`,
  wrong: ['+242 kJ mol⁻¹', `−${242 / 2} kJ mol⁻¹`, '+484 kJ mol⁻¹'],
  sol: 'Atomisation is defined per mole of gaseous atoms formed. Splitting one mole of Cl₂ gives two moles of Cl atoms for 242 kJ, so one mole of Cl atoms needs 242 / 2 = +121 kJ (endothermic, since bonds break) — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('sub-mcq', mcq({
  stem: 'Which equation represents the enthalpy of sublimation of iodine?',
  right: String.raw`$\ce{I2(s) -> I2(g)}$`,
  wrong: [String.raw`$\ce{I2(g) -> 2I(g)}$`, String.raw`$\ce{I2(l) -> I2(g)}$`, String.raw`$\ce{I2(s) -> 2I(g)}$`],
  sol: 'Sublimation is the direct change from solid to vapour. I₂(g) → 2I(g) is bond dissociation, I₂(l) → I₂(g) is vaporisation, and I₂(s) → 2I(g) combines sublimation with dissociation — option (@K).',
  d: 1, c: 'understanding', t: [3],
}));
add('ie-na-mcq', (() => {
  const x = SUB.Na + IE.Na;
  return mcq({
    stem: `For sodium, the enthalpy of sublimation is ${SUB.Na} kJ mol⁻¹ and the first ionisation enthalpy is ${IE.Na} kJ mol⁻¹. The enthalpy change for Na(s) → Na⁺(g) + e⁻ is:`,
    right: `+${f1(x)} kJ mol⁻¹`,
    wrong: [`+${f1(IE.Na - SUB.Na)} kJ mol⁻¹`, `+${IE.Na} kJ mol⁻¹`, `+${f1(2 * SUB.Na + IE.Na)} kJ mol⁻¹`],
    sol: `Na(s) → Na(g) takes ${SUB.Na} kJ; Na(g) → Na⁺(g) + e⁻ takes ${IE.Na} kJ. Total = ${SUB.Na} + ${IE.Na} = ${f1(x)} kJ mol⁻¹ — option (@K).`,
    d: 2, c: 'application', t: [3],
  });
})(), () => near(107.3 + 496, 603.3, 0.0005) || 'ie-na');
add('bond-est-mcq', (() => {
  const dh = dHbond([[1, 'C≡C'], [1, 'H–H']], [[1, 'C=C'], [2, 'C–H']]);
  const wrongA = dHbond([[1, 'C≡C'], [1, 'H–H']], [[1, 'C=C'], [1, 'C–H']]);
  return mcq({
    stem: String.raw`A polymer plant partly hydrogenates ethyne to ethene, $\ce{HC#CH(g) + H2(g) -> H2C=CH2(g)}$. Using C≡C 837, C=C 611, C–H 414 and H–H 436 kJ mol⁻¹, the estimated enthalpy change is:`,
    right: `${sg(dh, 0)} kJ`,
    wrong: [`+${-dh} kJ`, `+${wrongA} kJ`, `−${sumB([[1, 'C=C'], [2, 'C–H']])} kJ`],
    sol: `Bonds broken: C≡C (837) + H–H (436) = ${837 + 436} kJ. Bonds formed: C=C (611) + 2 C–H (2 × 414) = ${sumB([[1, 'C=C'], [2, 'C–H']])} kJ. ΔH = broken − formed = ${837 + 436} − ${sumB([[1, 'C=C'], [2, 'C–H']])} = ${sg(dh, 0)} kJ — option (@K).`,
    d: 2, c: 'application', t: [3],
  });
})(), () => dHbond([[1, 'C≡C'], [1, 'H–H']], [[1, 'C=C'], [2, 'C–H']]) === -166 || 'bond-est-mcq');
add('bond-vs-form-mcq', (() => {
  const f = r1(DF.C2H4 - DF.C2H2);
  return mcq({
    stem: `The hydrogenation of ethyne to ethene is estimated at −166 kJ from bond enthalpies, but it comes to ${sg(f)} kJ from enthalpies of formation. The main reason for the small difference is that:`,
    right: 'bond enthalpies are averages over many compounds, not exact values for these molecules',
    wrong: ['enthalpies of formation are path functions and so vary with the route', 'bond enthalpies refer to the liquid state, but the reaction is in the gas phase', 'the reaction is not exothermic when calculated from bond enthalpies'],
    sol: `From formation data ΔH = ΔfH(C₂H₄) − ΔfH(C₂H₂) = ${f1(DF.C2H4)} − (${f1(DF.C2H2)}) = ${sg(f)} kJ, a state-function calculation. A mean bond enthalpy (for example C–H 414) is the average over many different compounds, so a sum of such values is only an estimate — option (@K).`,
    d: 3, c: 'analysis', t: [3],
  });
})(), () => r1(52.3 - 226.7) === -174.4 || 'bond-vs-form');
add('frost-mcq', mcq({
  stem: 'On a cold, dry morning in Shimla, the frost on a parked car’s windscreen turns straight into water vapour in the sunshine without first melting. The enthalpy change for this change of state is the enthalpy of:',
  right: 'sublimation, and its sign is positive',
  wrong: ['fusion, and its sign is negative', 'vaporisation, and its sign is negative', 'deposition, and its sign is positive'],
  sol: 'Solid changing directly to vapour is sublimation. Molecules must be separated against their attractions, so heat is absorbed and ΔsubH is positive — option (@K). Deposition is the reverse change and is exothermic.',
  d: 1, c: 'understanding', t: [3],
}));
add('atom-fill', fill({
  stem: 'The enthalpy change when one mole of gaseous atoms of an element is formed from the element in its standard state, for example Na(s) → Na(g) or ½Cl₂(g) → Cl(g), is called the enthalpy of ___.',
  acc: [['atomisation', 'atomization', 'Atomisation', 'Atomization']],
  sol: 'This is the enthalpy of atomisation, ΔaH°; it is always positive. For a metal such as sodium it equals the enthalpy of sublimation.',
  d: 1, c: 'recall', t: [3],
}));
add('ie-tf', tf({
  stem: 'The first ionisation enthalpy of a metal used to colour fireworks is the energy needed to remove one mole of electrons from one mole of its isolated gaseous atoms, and it is always positive.',
  key: 't',
  sol: 'True. Removing an electron from a gaseous atom, M(g) → M⁺(g) + e⁻, always needs energy, so ionisation enthalpy is positive.',
  d: 1, c: 'recall', t: [3],
}));
add('ie-sub-num', (() => {
  const x = SUB.Mg + IE.Mg1 + IE.Mg2;
  return num({
    stem: `Magnesium metal is vaporised in a flame and then ionised. Using ΔsubH(Mg) = ${SUB.Mg}, first ionisation enthalpy ${IE.Mg1} and second ionisation enthalpy ${IE.Mg2} kJ mol⁻¹, calculate the enthalpy change for Mg(s) → Mg²⁺(g) + 2e⁻, in kJ mol⁻¹.`,
    value: r1(x), tol: 0.5, unit: 'kJ mol⁻¹',
    sol: r`Steps: $\ce{Mg(s) -> Mg(g)}$ (${SUB.Mg}); $\ce{Mg(g) -> Mg+(g) + e-}$ (${IE.Mg1}); $\ce{Mg+(g) -> Mg^2+(g) + e-}$ (${IE.Mg2}). Total $= ${SUB.Mg} + ${IE.Mg1} + ${IE.Mg2} = ${f1(x)}$ kJ mol⁻¹.`,
    scheme: [['Three steps added', 1], ['2336.7 kJ mol⁻¹', 1]],
    marks: 2, d: 2, c: 'application', t: [3],
  });
})(), (q) => near(147.7 + 738 + 1451, 2336.7, 0.0005) && q.answer.value === 2336.7 || 'ie-sub-num');
add('phase-num', (() => {
  const per = WATER.fus + (WATER.cpWater * 100) / 1000 + WATER.vap;
  const tot = 2 * per;
  return num({
    stem: 'A steam-iron technician heats 36 g of ice at 0 °C until it is all steam at 100 °C. Use ΔfusH = 6.01 kJ mol⁻¹, ΔvapH = 40.7 kJ mol⁻¹ and a molar heat capacity of liquid water of 75.3 J K⁻¹ mol⁻¹ (M of water = 18 g mol⁻¹). Calculate the heat absorbed in kJ.',
    value: r1(tot), tol: 0.2, unit: 'kJ',
    sol: r`Moles $= 36/18 = 2$. Per mole: melt $6.01$; warm $75.3 \times 100 / 1000 = 7.53$; boil $40.7$; total $= ${f2(per)}$ kJ. For 2 mol: $2 \times ${f2(per)} = ${f2(tot)} \approx ${f1(tot)}$ kJ.`,
    scheme: [['Three stages per mole', 1], ['108.5 kJ for 2 mol', 1]],
    marks: 2, d: 3, c: 'application', t: [3],
  });
})(), (q) => near(2 * (6.01 + 7.53 + 40.7), 108.48, 0.001) && q.answer.value === 108.5 || 'phase-num');
add('sub-fill', fill({
  stem: 'The enthalpy change when one mole of a solid changes directly into its vapour, without passing through the liquid state, is the enthalpy of ___.',
  acc: [['sublimation', 'Sublimation']],
  sol: 'A direct solid-to-gas change is sublimation; for example I₂(s) → I₂(g).',
  d: 1, c: 'recall', t: [3],
}));
add('bond-tf', tf({
  stem: 'Breaking a bond in a gaseous molecule is an endothermic process, and the same energy is released when the bond is formed.',
  key: 't',
  sol: 'True. Energy must be supplied to pull the bonded atoms apart (bond dissociation enthalpy, positive) and the same amount is released when they combine.',
  d: 1, c: 'understanding', t: [3],
}));
add('bond-ar', ar({
  a: 'Bond formation is an endothermic process.',
  r: 'Energy must be supplied to bring two atoms together into a bond.',
  key: 'd',
  sol: 'A is false: forming a bond releases energy, so it is exothermic. R is false: energy is released, not supplied, when atoms combine; energy is needed to break the bond — option (d).',
  d: 2, c: 'understanding', t: [3],
}));
add('enth-match', match({
  stem: 'Match each enthalpy change with its equation.',
  pairs: [['Standard enthalpy of formation of ethyne', String.raw`$\ce{2C(graphite) + H2(g) -> C2H2(g)}$`], ['Standard enthalpy of combustion of ethanol', String.raw`$\ce{C2H5OH(l) + 3O2(g) -> 2CO2(g) + 3H2O(l)}$`], ['Enthalpy of fusion of ice', String.raw`$\ce{H2O(s) -> H2O(l)}$`], ['First ionisation enthalpy of magnesium', String.raw`$\ce{Mg(g) -> Mg+(g) + e-}$`]],
  order: [2, 0, 3, 1],
  sol: 'Formation of ethyne: elements → compound (r). Combustion of ethanol: the compound burnt in oxygen (p). Fusion: solid → liquid (s). First ionisation of Mg: Mg(g) → Mg⁺(g) + e⁻ (q).',
  d: 2, c: 'understanding', t: [1, 3],
}));
add('sub-short2', (() => {
  const dsub = 62.4;
  const dbd = 151;
  const tot = dsub + dbd;
  return short({
    marks: 2,
    stem: `Distinguish between the enthalpy of sublimation and the enthalpy of atomisation of iodine. Using ΔsubH(I₂) = ${dsub} kJ mol⁻¹ and the I–I bond dissociation enthalpy of ${dbd} kJ mol⁻¹ (both given), find the enthalpy change for I₂(s) → 2I(g).`,
    model: `Sublimation: I₂(s) → I₂(g), the solid changes directly to vapour. Atomisation: the element in its standard state is converted into gaseous atoms; for iodine, ½I₂(s) → I(g), per mole of atoms. For I₂(s) → 2I(g): ${dsub} + ${dbd} = ${f1(tot)} kJ mol⁻¹ (so ${f1(tot / 2)} kJ per mole of I atoms).`,
    sol: `${f1(tot)} kJ mol⁻¹ for I₂(s) → 2I(g).`,
    scheme: [['Sublimation (solid → vapour) and atomisation (→ gaseous atoms) distinguished', 1], [`${dsub} + ${dbd} = ${f1(tot)} kJ mol⁻¹`, 1]],
    d: 2, c: 'application', t: [3],
  });
})(), () => near(62.4 + 151, 213.4, 0.0005) || 'sub-short2');
add('phase-short2', (() => {
  const n = 90 / 18;
  const q = n * WATER.fus;
  return short({
    marks: 2,
    stem: 'A refrigeration engineer must melt 90 g of ice at 0 °C. Using the enthalpy of fusion of ice, 6.01 kJ mol⁻¹ (M of water = 18 g mol⁻¹), calculate the heat absorbed, and say what happens to the temperature while the ice melts.',
    model: `Moles of ice = 90 / 18 = ${n} mol. Heat absorbed = ${n} × 6.01 = ${f2(q)} kJ. The temperature stays at 0 °C until all the ice has melted, because the heat supplied goes into overcoming the forces holding the molecules in the solid, not into raising the temperature.`,
    sol: `${f2(q)} kJ; temperature constant at 0 °C.`,
    scheme: [[`5 mol × 6.01 = ${f2(q)} kJ`, 1], ['Temperature constant during melting, with a reason', 1]],
    d: 1, c: 'understanding', t: [3],
  });
})(), () => near(5 * 6.01, 30.05, 0.001) || 'phase-short2');
add('bondtrend-short2', short({
  marks: 2,
  stem: 'Give two reasons why an enthalpy of reaction found from bond enthalpies is only an estimate, whereas one found from enthalpies of formation is accurate.',
  model: 'Bond enthalpies are mean values averaged over many compounds, so the C–H bond (for example) is not exactly 414 kJ mol⁻¹ in every molecule; and the method assumes all reactants and products are gases, so any change of state is ignored. Enthalpies of formation are measured values for the actual substances in their states.',
  sol: 'Mean values; gas phase assumed.',
  scheme: [['Mean (average) bond enthalpies', 1], ['Gaseous state assumed; no change of state allowed for', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('bondest-short3', (() => {
  const broken = [[1, 'C=C'], [1, 'Cl–Cl']];
  const formed = [[1, 'C–C'], [2, 'C–Cl']];
  const dh = dHbond(broken, formed);
  return short({
    marks: 3,
    stem: String.raw`A chemist chlorinates ethene in the gas phase, $\ce{C2H4(g) + Cl2(g) -> C2H4Cl2(g)}$, where C₂H₄Cl₂ is 1,2-dichloroethane, Cl–CH₂–CH₂–Cl. Using C=C 611, Cl–Cl 242, C–C 347 and C–Cl 326 kJ mol⁻¹, estimate the enthalpy change and say whether the reaction is exothermic.`,
    model: `Bonds broken: C=C (611) + Cl–Cl (242) = ${sumB(broken)} kJ. Bonds formed: C–C (347) + 2 C–Cl (2 × 326 = 652) = ${sumB(formed)} kJ. ΔH = ${sumB(broken)} − ${sumB(formed)} = ${sg(dh, 0)} kJ mol⁻¹; negative, so the reaction is exothermic.`,
    sol: `ΔH = ${sg(dh, 0)} kJ mol⁻¹, exothermic.`,
    scheme: [[`Bonds broken ${sumB(broken)} kJ`, 1], [`Bonds formed ${sumB(formed)} kJ`, 1], [`ΔH = ${sg(dh, 0)} kJ mol⁻¹, exothermic`, 1]],
    d: 2, c: 'application', t: [3],
  });
})(), () => dHbond([[1, 'C=C'], [1, 'Cl–Cl']], [[1, 'C–C'], [2, 'C–Cl']]) === -146 || 'bondest3');
add('atom-short3', (() => {
  const est = dHbond([[8, 'C–H'], [2, 'C–C']], []);
  const cyc = 3 * SUB.C + 2 * BE['H–H'] - DF.C3H8;
  return short({
    marks: 3,
    stem: `A student estimates the enthalpy of atomisation of propane, C₃H₈(g) → 3C(g) + 8H(g), in two ways. (i) From bond enthalpies C–H 414 and C–C 347 kJ mol⁻¹; (ii) from ΔfH(C₃H₈) = ${sg(DF.C3H8)}, ΔsubH(C) = ${SUB.C} and the H–H bond enthalpy 436 kJ mol⁻¹. Calculate both and comment.`,
    model: `(i) Propane has 8 C–H and 2 C–C bonds: 8 × 414 + 2 × 347 = ${est} kJ mol⁻¹. (ii) Elements → atoms: 3 × ${SUB.C} + 4 × 436 = ${f1(3 * SUB.C + 4 * 436)} kJ; the compound lies ${f1(-DF.C3H8)} kJ below the elements, so ΔatomH = ${f1(3 * SUB.C + 4 * 436)} − (${f1(DF.C3H8)}) = ${f1(cyc)} kJ mol⁻¹. The two values agree to within 0.3 %, since mean bond enthalpies are averages.`,
    sol: `(i) ${est}; (ii) ${f1(cyc)} kJ mol⁻¹; close agreement.`,
    scheme: [[`8 C–H and 2 C–C: ${est} kJ mol⁻¹`, 1], [`Cycle value ${f1(cyc)} kJ mol⁻¹`, 1.5], ['Agreement; mean bond enthalpies', 0.5]],
    d: 4, c: 'application', t: [3],
  });
})(), () => 8 * 414 + 2 * 347 === 4006 && near(3 * 716.7 + 4 * 436 + 103.8, 3997.9, 0.0005) || 'atom3');
add('atomise-long', (() => {
  const direct = 2 * SUB.C + BE['H–H'];
  const cyc = direct - DF.C2H2;
  const est = 2 * BE['C–H'] + BE['C≡C'];
  return long({
    stem: `(a) Define bond dissociation enthalpy and enthalpy of atomisation, with one equation for each. [2]

(b) Calculate the enthalpy of atomisation of ethyne, C₂H₂(g) → 2C(g) + 2H(g), from ΔfH(C₂H₂) = ${sg(DF.C2H2)} kJ mol⁻¹, ΔsubH(C) = ${SUB.C} kJ mol⁻¹ and the H–H bond enthalpy 436 kJ mol⁻¹, and compare it with the value 2 × 414 + 837 from mean bond enthalpies. [3]`,
    model: r`(a) The bond dissociation enthalpy is the enthalpy change when one mole of a particular bond in a gaseous molecule is broken, e.g. $\ce{H2(g) -> 2H(g)}$, +436 kJ mol⁻¹. The enthalpy of atomisation is the enthalpy change when one mole of gaseous atoms is formed from the element (or compound), e.g. $\ce{C(graphite) -> C(g)}$, +716.7 kJ mol⁻¹.

(b) Elements → atoms: $2 \times ${SUB.C} + 436 = ${f1(direct)}$ kJ. Ethyne lies ${f1(DF.C2H2)} kJ above the elements, so $\Delta_{atom}H = ${f1(direct)} - ${f1(DF.C2H2)} = ${f1(cyc)}$ kJ mol⁻¹. The bond-enthalpy estimate is $2 \times 414 + 837 = ${est}$ kJ mol⁻¹, within about 1.4 % of it, because mean bond enthalpies are averages.`,
    sol: r`(b) $\Delta_{atom}H = ${f1(cyc)}$ kJ mol⁻¹ against ${est} from bond enthalpies.`,
    scheme: [['(a) Bond dissociation enthalpy with equation', 1], ['(a) Atomisation enthalpy with equation', 1], ['(b) Elements to atoms 1869.4 kJ', 1], [`(b) ΔatomH = ${f1(cyc)} kJ mol⁻¹`, 1], [`(b) Comparison with ${est}`, 1]],
    d: 4, c: 'application', t: [3],
  });
})(), () => near(2 * 716.7 + 436 - 226.7, 1642.7, 0.0005) && 2 * 414 + 837 === 1665 || 'atomise-long');
add('bond-long', (() => {
  const broken = [[2, 'C–H'], [1, 'C≡C']];
  const bB = sumB(broken) + 2.5 * BE['O=O'];
  const fB = 4 * BE['C=O'] + 2 * BE['O–H'];
  const dh = bB - fB;
  const fData = 2 * DF.CO2 + DF.H2Og - DF.C2H2;
  return long({
    stem: `(a) Estimate the enthalpy of combustion of ethyne gas, C₂H₂(g) + 5/2 O₂(g) → 2CO₂(g) + H₂O(g), from the mean bond enthalpies C–H 414, C≡C 837, O=O 498, C=O 799 and O–H 463 kJ mol⁻¹. [3]

(b) The value from enthalpies of formation (CO₂ ${sg(DF.CO2)}, H₂O(g) ${sg(DF.H2Og)}, C₂H₂ ${sg(DF.C2H2)} kJ mol⁻¹) is also needed: calculate it and suggest a reason for the difference. [2]`,
    model: `(a) Bonds broken: 2 C–H (828) + C≡C (837) + 5/2 O=O (1245) = ${bB} kJ. Bonds formed: 4 C=O (3196) + 2 O–H (926) = ${fB} kJ. ΔH = ${bB} − ${fB} = ${sg(dh, 0)} kJ mol⁻¹.

(b) ΔH = [2(−393.5) + (−241.8)] − (+226.7) = ${sg(fData)} kJ mol⁻¹. The bond-enthalpy estimate is about ${f0(Math.abs(fData - dh))} kJ less negative because it uses mean bond enthalpies (for example, the C=O bond in CO₂ is not exactly 799 kJ mol⁻¹).`,
    sol: `(a) ${sg(dh, 0)} kJ mol⁻¹; (b) ${sg(fData)} kJ mol⁻¹; mean bond enthalpies.`,
    scheme: [['(a) Bonds broken 2910 kJ', 1], ['(a) Bonds formed 4122 kJ and ΔH = −1212 kJ mol⁻¹', 2], [`(b) ΔH = ${sg(fData)} kJ mol⁻¹`, 1], ['(b) Mean bond enthalpies as the reason', 1]],
    d: 4, c: 'analysis', t: [3],
  });
})(), () => (2 * 414 + 837 + 2.5 * 498) - (4 * 799 + 2 * 463) === -1212 && near(2 * -393.5 - 241.8 - 226.7, -1255.5, 0.0005) || 'bond-long');

// ================================================================ t04 Hess's law
add('hess-def-mcq', mcq({
  stem: 'Which statement is Hess’s law of constant heat summation?',
  right: 'the total enthalpy change of a reaction is the same whether it takes place in one step or in several steps',
  wrong: ['the enthalpy change of a reaction depends on the number of steps in which it takes place', 'the heat of a reaction is independent of the temperature', 'the enthalpy change of a reaction doubles when the number of moles of products doubles but not of the reactants'],
  sol: 'Hess’s law states that the overall enthalpy change depends only on the initial and final states, not on the route or the number of steps — option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('hess-state-mcq', mcq({
  stem: 'Hess’s law is a direct consequence of the fact that enthalpy is:',
  right: 'a state function, depending only on the initial and final states',
  wrong: ['a path function, depending on how the change is carried out', 'an extensive property only, with no other special feature', 'measurable only at constant volume'],
  sol: 'Because H is a state function, ΔH for a change depends only on the initial and final states, so the same ΔH results by any route — option (@K).',
  d: 1, c: 'understanding', t: [4],
}));
add('hess-diamond-mcq', mcq({
  stem: `In a jewellery research lab the enthalpies of combustion are measured as ${sg(DIAMOND.dcGraphite)} kJ mol⁻¹ for graphite and ${sg(DIAMOND.dcDiamond)} kJ mol⁻¹ for diamond. The enthalpy change for C(graphite) → C(diamond) is:`,
  right: `+${f1(DIAMOND.dH)} kJ mol⁻¹`,
  wrong: [`−${f1(DIAMOND.dH)} kJ mol⁻¹`, `+${f1(-DIAMOND.dcGraphite - DIAMOND.dcDiamond)} kJ mol⁻¹`, `−${f1(-DIAMOND.dcGraphite - DIAMOND.dcDiamond)} kJ mol⁻¹`],
  sol: `Graphite → CO₂ (${sg(DIAMOND.dcGraphite)}) followed by CO₂ → diamond (reverse of ${sg(DIAMOND.dcDiamond)}, so +${f1(-DIAMOND.dcDiamond)}). Sum = ${sg(DIAMOND.dcGraphite)} + ${f1(-DIAMOND.dcDiamond)} = +${f1(DIAMOND.dH)} kJ mol⁻¹ — option (@K).`,
  d: 2, c: 'application', t: [4],
}), () => DIAMOND.dH === 1.9 || 'hess-diamond');
add('hess-reverse-mcq', (() => {
  const x = -2 * DC.CH4;
  return mcq({
    stem: String.raw`The enthalpy of combustion of methane is ${sg(DC.CH4)} kJ mol⁻¹. For the reverse process in a laboratory model, $\ce{2CO2(g) + 4H2O(l) -> 2CH4(g) + 4O2(g)}$, the enthalpy change is:`,
    right: `+${f1(x)} kJ`,
    wrong: [`+${f1(-DC.CH4)} kJ`, `−${f1(x)} kJ`, `−${f1(-DC.CH4)} kJ`],
    sol: `Reversing a reaction changes the sign of ΔH, and doubling the amounts doubles it: ΔH = −2 × (${sg(DC.CH4)}) = +${f1(x)} kJ — option (@K).`,
    d: 2, c: 'application', t: [4],
  });
})(), () => near(-2 * -890.3, 1780.6, 0.0005) || 'hess-reverse');
add('hess-cuso4-mcq', mcq({
  stem: String.raw`The enthalpy of solution of anhydrous copper(II) sulfate is −66.5 kJ mol⁻¹ and that of the pentahydrate is +11.7 kJ mol⁻¹. The enthalpy change for $\ce{CuSO4(s) + 5H2O(l) -> CuSO4.5H2O(s)}$ is:`,
  right: `${sg(CUSO4.hyd)} kJ mol⁻¹`,
  wrong: [`+${f1(-CUSO4.hyd)} kJ mol⁻¹`, `${sg(CUSO4.solAnhyd + CUSO4.solHydrate)} kJ mol⁻¹`, `+${f1(-(CUSO4.solAnhyd + CUSO4.solHydrate))} kJ mol⁻¹`],
  sol: `Dissolve the anhydrous salt (−66.5), then reverse the dissolution of the hydrate (−11.7): ΔH = −66.5 − 11.7 = ${sg(CUSO4.hyd)} kJ mol⁻¹ — option (@K).`,
  d: 3, c: 'application', t: [4],
}), () => CUSO4.hyd === -78.2 || 'cuso4-mcq');
add('ostwald-mcq', (() => {
  const dh = dHrxn([[4, 'NH3'], [5, 'O2']], [[4, 'NO'], [6, 'H2Og']]);
  return mcq({
    stem: String.raw`In the first step of nitric acid manufacture, $\ce{4NH3(g) + 5O2(g) -> 4NO(g) + 6H2O(g)}$. Using ΔfH (NH₃ −46.1, NO +90.3, H₂O(g) −241.8 kJ mol⁻¹), the enthalpy change is:`,
    right: `${sg(dh)} kJ`,
    wrong: [`+${f1(-dh)} kJ`, `${sg(dh / 4)} kJ`, `${sg(4 * 90.3 + 6 * -241.8)} kJ`],
    sol: `ΔH = Σ ΔfH(products) − Σ ΔfH(reactants) = [4(+90.3) + 6(−241.8)] − [4(−46.1) + 0] = ${f1(4 * 90.3 + 6 * -241.8)} − (${f1(4 * -46.1)}) = ${sg(dh)} kJ — option (@K).`,
    d: 3, c: 'application', t: [4],
  });
})(), () => dHrxn([[4, 'NH3'], [5, 'O2']], [[4, 'NO'], [6, 'H2Og']]) === -905.2 || 'ostwald');
add('hess-nox-num', (() => {
  const x = NOX.total / 2;
  return num({
    stem: 'For a smog-chamber study, N₂(g) + O₂(g) → 2NO(g) has ΔH = +180.6 kJ and 2NO(g) + O₂(g) → 2NO₂(g) has ΔH = −114.2 kJ (both given). Calculate the standard enthalpy of formation of NO₂(g) in kJ mol⁻¹.',
    value: r1(x), tol: 0.1, unit: 'kJ mol⁻¹',
    sol: r`Adding the equations: $\ce{N2(g) + 2O2(g) -> 2NO2(g)}$, $\Delta H = 180.6 + (-114.2) = ${f1(NOX.total)}$ kJ for 2 mol. Per mole of NO₂: $${f1(NOX.total)}/2 = ${f1(x)}$ kJ mol⁻¹.`,
    scheme: [['Add the two equations: +66.4 kJ', 1], ['Divide by 2: +33.2 kJ mol⁻¹', 1]],
    marks: 2, d: 2, c: 'application', t: [4],
  });
})(), (q) => near((180.6 - 114.2) / 2, 33.2, 0.001) && q.answer.value === 33.2 || 'hess-nox-num');
add('hess-tf', tf({
  stem: 'The enthalpy change for converting reactants into products is the same by every route, provided the initial and final states are the same.',
  key: 't',
  sol: 'True. This is Hess’s law, which holds because enthalpy is a state function.',
  d: 1, c: 'recall', t: [4],
}));
add('hess-ar', ar({
  a: 'The enthalpy change for converting graphite to carbon dioxide is the same whether the carbon is burnt directly or first converted to carbon monoxide.',
  r: 'The heat released in a chemical change depends on the path followed between the initial and final states.',
  key: 'c',
  sol: 'A is true by Hess’s law: −393.5 kJ mol⁻¹ either way (−110.5 plus −283.0). R is false: enthalpy is a state function, so the total heat does not depend on the path — option (c).',
  d: 2, c: 'analysis', t: [4],
}));
add('hess-short2', (() => {
  const dh = dHrxn([[1, 'C2H4'], [1, 'H2Ol']], [[1, 'C2H5OHl']]);
  return short({
    marks: 2,
    stem: String.raw`A bio-fuel chemist wants the enthalpy change for the hydration of ethene, $\ce{C2H4(g) + H2O(l) -> C2H5OH(l)}$. Use Hess's law with ΔfH values (C₂H₄ +52.3, H₂O(l) −285.8, C₂H₅OH(l) −277.7 kJ mol⁻¹) to calculate it.`,
    model: r`Route: reactants → elements → product. $\Delta H = \Delta_fH(\text{product}) - \Delta_fH(\text{reactants}) = -277.7 - (+52.3 - 285.8) = -277.7 + 233.5 = ${tx(dh)}$ kJ mol⁻¹.`,
    sol: r`$\Delta H = ${tx(dh)}$ kJ mol⁻¹.`,
    scheme: [['Σ products − Σ reactants set up', 1], [`ΔH = ${sg(dh)} kJ mol⁻¹`, 1]],
    d: 2, c: 'application', t: [4],
  });
})(), () => dHrxn([[1, 'C2H4'], [1, 'H2Ol']], [[1, 'C2H5OHl']]) === -44.2 || 'hess-short2');
add('hessform-short3', (() => {
  const f = 2 * ETHYNE.dcC + ETHYNE.dcH2 - ETHYNE.dcC2H2;
  return short({
    marks: 3,
    stem: `Ethyne cannot be made directly from its elements in a calorimeter. Use Hess's law to find the enthalpy of formation of ethyne from the enthalpies of combustion: C(graphite) ${sg(ETHYNE.dcC)}, H₂(g) ${sg(ETHYNE.dcH2)} and C₂H₂(g) ${sg(ETHYNE.dcC2H2)} kJ mol⁻¹.`,
    model: r`Target: $\ce{2C(graphite) + H2(g) -> C2H2(g)}$. Add: $2 \times$ (C + O₂ → CO₂) $= 2(${tx(ETHYNE.dcC)})$; (H₂ + ½O₂ → H₂O) $= ${tx(ETHYNE.dcH2)}$; reverse of ethyne combustion $= +${f1(-ETHYNE.dcC2H2)}$. $\Delta_fH = -787.0 - 285.8 + 1299.5 = +${f1(f)}$ kJ mol⁻¹.`,
    sol: r`$\Delta_fH = +${f1(f)}$ kJ mol⁻¹.`,
    scheme: [['Target equation and choice of equations', 1], ['Reverse the ethyne combustion; multiply C by 2', 1], [`ΔfH = +${f1(f)} kJ mol⁻¹`, 1]],
    d: 3, c: 'application', t: [4],
  });
})(), () => near(2 * -393.5 - 285.8 + 1299.5, 226.7, 0.001) || 'hessform3');
add('hesscuso4-short3', (() => {
  return short({
    marks: 3,
    stem: String.raw`Anhydrous copper(II) sulfate turns blue as it takes up water. Using the enthalpy of solution of $\ce{CuSO4(s)}$, −66.5 kJ mol⁻¹, and of $\ce{CuSO4.5H2O(s)}$, +11.7 kJ mol⁻¹, draw an enthalpy cycle and calculate the enthalpy of hydration for $\ce{CuSO4(s) + 5H2O(l) -> CuSO4.5H2O(s)}$.`,
    model: r`Cycle: anhydrous salt + 5H₂O → hydrate (ΔH_hyd, unknown) and both → the same aqueous solution of CuSO₄. By Hess's law $\Delta H_{hyd} + (+11.7) = -66.5$, so $\Delta H_{hyd} = -66.5 - 11.7 = ${tx(CUSO4.hyd)}$ kJ mol⁻¹.`,
    sol: r`$\Delta H_{hyd} = ${tx(CUSO4.hyd)}$ kJ mol⁻¹.`,
    scheme: [['Enthalpy cycle drawn with the common solution', 1], ['ΔH_hyd + 11.7 = −66.5', 1], [`ΔH_hyd = ${sg(CUSO4.hyd)} kJ mol⁻¹`, 1]],
    d: 3, c: 'application', t: [4],
  });
})(), () => CUSO4.hyd === -78.2 || 'hesscuso4-3');
add('reform-short3', (() => {
  const dh = dHrxn([[1, 'CH4'], [1, 'H2Og']], [[1, 'CO'], [3, 'H2']]);
  return short({
    marks: 3,
    stem: String.raw`In a hydrogen plant, methane reacts with steam: $\ce{CH4(g) + H2O(g) -> CO(g) + 3H2(g)}$. Calculate the enthalpy change from ΔfH (CH₄ −74.8, H₂O(g) −241.8, CO −110.5 kJ mol⁻¹), say whether the reaction is endothermic or exothermic, and state the effect on the heat needed of making twice as much hydrogen.`,
    model: r`$\Delta H = [-110.5 + 3(0)] - [-74.8 + (-241.8)] = -110.5 + 316.6 = +${f1(dh)}$ kJ mol⁻¹, endothermic. For twice the quantity of reaction, ΔH is doubled: $+${f1(2 * dh)}$ kJ, so the heat required doubles.`,
    sol: r`$\Delta H = +${f1(dh)}$ kJ mol⁻¹, endothermic; heat doubles.`,
    scheme: [[`ΔH = +${f1(dh)} kJ mol⁻¹`, 1.5], ['Endothermic', 0.5], ['Heat doubles for twice the amount', 1]],
    d: 3, c: 'application', t: [4],
  });
})(), () => dHrxn([[1, 'CH4'], [1, 'H2Og']], [[1, 'CO'], [3, 'H2']]) === 206.1 || 'reform3');
add('hess-long', (() => {
  const f = 2 * DC.C + 3 * DC.H2 - -1366.7;
  return long({
    stem: `(a) State Hess's law and explain why it holds. [2]

(b) Calculate the standard enthalpy of formation of liquid ethanol from the enthalpies of combustion of graphite (${sg(DC.C)}), hydrogen (${sg(DC.H2)}) and liquid ethanol (${sg(DC.C2H5OH)} kJ mol⁻¹). Write the target equation and the cycle you use. [3]`,
    model: r`(a) The total enthalpy change of a reaction is the same whether it occurs in one step or in several steps, provided the initial and final states are the same. It holds because enthalpy is a state function.

(b) Target: $\ce{2C(graphite) + 3H2(g) + 1/2O2(g) -> C2H5OH(l)}$. Combine: $2 \times$ (C + O₂ → CO₂) $= 2(${tx(DC.C)})$; $3 \times$ (H₂ + ½O₂ → H₂O(l)) $= 3(${tx(DC.H2)})$; reverse of ethanol combustion $= +${f1(-DC.C2H5OH)}$. $\Delta_fH = -787.0 - 857.4 + 1366.7 = ${tx(f)}$ kJ mol⁻¹.`,
    sol: r`$\Delta_fH = ${tx(f)}$ kJ mol⁻¹.`,
    scheme: [['(a) Statement of Hess’s law', 1], ['(a) State function as the reason', 1], ['(b) Target equation and cycle', 1], ['(b) Correct use of 2, 3 and the reversed combustion', 1], [`(b) ΔfH = ${sg(f)} kJ mol⁻¹`, 1]],
    d: 3, c: 'application', t: [4],
  });
})(), () => near(2 * -393.5 + 3 * -285.8 + 1366.7, -277.7, 0.0005) || 'hess-long');
add('comb-long', (() => {
  const dc = dHrxn([[1, 'CO'], [0.5, 'O2']], [[1, 'CO2']]);
  const v = -dc / 28;
  return long({
    stem: String.raw`(a) Why is the enthalpy of combustion of carbon (graphite) the same number as the enthalpy of formation of carbon dioxide? [2]

(b) Calculate the enthalpy of combustion of carbon monoxide, $\ce{CO(g) + 1/2O2(g) -> CO2(g)}$, from ΔfH (CO −110.5, CO₂ −393.5 kJ mol⁻¹), and the calorific value of carbon monoxide (M = 28 g mol⁻¹) in kJ g⁻¹. [3]`,
    model: r`(a) Burning graphite gives $\ce{C(graphite) + O2(g) -> CO2(g)}$. This is also the reaction that forms one mole of CO₂ from its elements in their standard states (graphite is the standard state of carbon), so the same equation and enthalpy serve for both definitions.

(b) $\Delta_cH = -393.5 - (-110.5) = ${tx(dc)}$ kJ mol⁻¹. Calorific value $= 283.0/28 = ${f1(v)}$ kJ g⁻¹.`,
    sol: r`$\Delta_cH = ${tx(dc)}$ kJ mol⁻¹; ${f1(v)} kJ g⁻¹.`,
    scheme: [['(a) Same equation: C + O₂ → CO₂', 1], ['(a) Graphite is the standard state of carbon', 1], [`(b) ΔcH = ${sg(dc)} kJ mol⁻¹`, 1.5], [`(b) Calorific value ${f1(v)} kJ g⁻¹`, 1.5]],
    d: 3, c: 'application', t: [1, 4],
  });
})(), () => dHrxn([[1, 'CO'], [0.5, 'O2']], [[1, 'CO2']]) === -283 && near(283 / 28, 10.107, 0.001) || 'comb-long');
add('cal-long', (() => {
  const h = cv('H2');
  const e = -DC.C2H5OH / 46;
  const mH = 1000 * h;
  const mE = mH / e;
  return long({
    stem: `(a) Define the calorific value of a fuel and state its unit. [2]

(b) Hydrogen (ΔcH = ${sg(DC.H2)} kJ mol⁻¹, M = 2) is proposed as a bus fuel in place of ethanol (ΔcH = ${sg(DC.C2H5OH)} kJ mol⁻¹, M = 46). Calculate the calorific value of each, and the mass of ethanol that gives the same heat as 1.00 kg of hydrogen. [3]`,
    model: r`(a) The calorific value is the heat produced when unit mass of a fuel is burnt completely; its unit is kJ g⁻¹ (or kJ kg⁻¹).

(b) Hydrogen: $285.8/2 = ${f1(h)}$ kJ g⁻¹. Ethanol: $1366.7/46 = ${f1(e)}$ kJ g⁻¹. Heat from 1.00 kg H₂ $= 1000 \times ${f1(h)} = ${f0(mH)}$ kJ; mass of ethanol $= ${f0(mH)}/${f2(e)} = ${f0(mE)}$ g $\approx ${f2(mE / 1000)}$ kg.`,
    sol: r`${f1(h)} and ${f1(e)} kJ g⁻¹; about ${f2(mE / 1000)} kg of ethanol.`,
    scheme: [['(a) Definition', 1], ['(a) Unit kJ g⁻¹ or kJ kg⁻¹', 1], [`(b) ${f1(h)} and ${f1(e)} kJ g⁻¹`, 1], ['(b) Heat from 1.00 kg H₂ = 142 900 kJ', 1], [`(b) ${f2(mE / 1000)} kg of ethanol`, 1]],
    d: 3, c: 'application', t: [1],
  });
})(), () => near(1000 * 142.9 / (1366.7 / 46), 4809.8, 0.002) || 'cal-long');
