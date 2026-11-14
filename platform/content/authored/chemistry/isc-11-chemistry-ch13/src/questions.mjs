// ISC 11 Chemistry ch13 Chemical Equilibrium: question bank (ISC style). Constants: R = 0.0821 L atm K⁻¹ mol⁻¹. Data (standard unless marked given):
// esterification Kc = 4.0; Br2 + Cl2 <=> 2BrCl Kc = 7.0 at 400 K; CO + 2H2 <=> CH3OH dH = -90.7 kJ; C(s) + CO2 <=> 2CO dH = +172 kJ;
// N2O4 <=> 2NO2 dH = +57.2 kJ; 2NO + O2 <=> 2NO2 dH = -114 kJ; N2 + 3H2 <=> 2NH3 dH = -92.4 kJ; 2SO2 + O2 <=> 2SO3 dH = -196 kJ.
// Every other number is (given) in its stem. Every numerical is computed in JS and re-solved by a check.
// Assertion-reason keys: a b c d c a.
import { mk, add, r } from './lib.mjs';
import { RA, esterX, brclForward, brclReverse, alphaFromM, alphaFromKp, kpAlpha, near, f0, f1, f2, f3, f4, ex } from './data.mjs';

const { mcq, ar, tf, fill, match, num, short, long } = mk;

// ================================================================ t01 reversible reactions, physical equilibria, dynamic nature
add('irrev-mcq', mcq({
  stem: 'A chemistry teacher shows four changes. Which one is, for practical purposes, irreversible under ordinary laboratory conditions?',
  right: 'a strip of magnesium burning in air in an open dish',
  wrong: ['liquid bromine and its vapour in a stoppered bottle', 'solid iodine and its vapour in a sealed flask', 'brown NO₂ gas and colourless N₂O₄ gas in a closed tube'],
  sol: 'Burning magnesium forms magnesium oxide, which does not turn back to the metal and oxygen under these conditions, and the products escape the system. The other three are changes in closed vessels in which both directions go on — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('sl-mcq', mcq({
  stem: 'Crushed ice and water are kept in a closed insulated flask at 273.15 K and 1 atm until the amount of ice stops changing. At this stage:',
  right: 'ice melts and water freezes at the same rate',
  wrong: ['melting has stopped but freezing continues', 'freezing has stopped but melting continues', 'neither melting nor freezing is taking place'],
  sol: 'A solid–liquid equilibrium is dynamic: the amount of ice stays constant because the rate of melting equals the rate of freezing, not because both processes have stopped — option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
add('liqvap-mcq', mcq({
  stem: 'In a sealed bottle kept at constant temperature, a sample of ethanol and its vapour are left for several hours. The vapour pressure becomes constant because:',
  right: 'the number of molecules leaving the liquid per second equals the number returning to it',
  wrong: ['all the liquid has changed to vapour', 'no more molecules can escape from the liquid', 'the molecules of vapour have stopped moving'],
  sol: 'When the rate of evaporation equals the rate of condensation the vapour pressure stays constant; the equilibrium is dynamic and both processes continue — option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
add('subl-mcq', mcq({
  stem: 'A few crystals of iodine are sealed in a glass flask at 30 °C. After some days a constant violet colour fills the flask and crystals are still present. The system shows:',
  right: 'a solid–vapour equilibrium, with sublimation and deposition at equal rates',
  wrong: ['a liquid–vapour equilibrium, with evaporation and condensation at equal rates', 'a solid–liquid equilibrium, with melting and freezing at equal rates', 'an irreversible change, since the crystals are slowly disappearing'],
  sol: 'Solid iodine changes directly to vapour (sublimation) and the vapour deposits as crystals. The constant colour and the persisting crystals show that both rates are equal, a solid–vapour equilibrium — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('dyn-ar', ar({
  a: 'A few drops of heavy water (D₂O) added to liquid water in a closed vessel at equilibrium are soon found in the vapour, although the vapour pressure does not change.',
  r: 'At equilibrium evaporation and condensation continue at equal rates.',
  key: 'a',
  sol: 'Both statements are true. Molecules keep passing from liquid to vapour and back, so the label appears in the vapour; the pressure stays constant because the two rates are equal. R explains A — option (a).',
  d: 2, c: 'understanding', t: [1],
}));
add('dyn-tf', tf({
  stem: 'A chemical equilibrium can be established only in a closed system, and it can be approached from either the reactant side or the product side.',
  key: 't',
  sol: 'True. In an open vessel products can escape and equilibrium is not reached; in a closed vessel the same equilibrium composition is reached from either side at a given temperature.',
  d: 1, c: 'understanding', t: [1],
}));
add('phys-short2', short({
  marks: 2,
  stem: 'Name the three types of physical equilibrium and give one example of each, with the condition under which it holds.',
  model: 'Solid–liquid: ice ⇌ water at 273.15 K and 1 atm. Liquid–vapour: water ⇌ water vapour in a closed vessel at constant temperature. Solid–vapour: iodine (or camphor) crystals ⇌ vapour in a closed flask at constant temperature.',
  sol: 'Solid–liquid, liquid–vapour, solid–vapour with one example each.',
  scheme: [['Three types named', 1], ['An example with the condition for each', 1]],
  d: 1, c: 'understanding', t: [1],
}));
add('char-short2', short({
  marks: 2,
  stem: 'List four characteristics of a system that has reached chemical equilibrium.',
  model: 'The system must be closed, at constant temperature. The macroscopic properties (concentration, pressure, colour) stay constant. The rate of the forward reaction equals the rate of the reverse reaction, so the equilibrium is dynamic. The same state is reached from either side, and a catalyst does not change the position of equilibrium.',
  sol: 'Closed system; constant properties; equal rates (dynamic); same state from either side; catalyst has no effect on position.',
  scheme: [['Any two characteristics correctly stated', 1], ['Any two more correctly stated', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('vapour-long', long({
  stem: String.raw`A student seals 20 mL of water at 25 °C in a flask and measures the pressure of the vapour above it every ten minutes. The pressure rises at first and then becomes constant.

(a) Explain the rise and then the constant value, in terms of the rates of the two opposing changes. [2]

(b) Name this type of equilibrium and name one more physical equilibrium of the solid–vapour type. [1]

(c) Why is the equilibrium called dynamic? Describe an observation that supports your answer. [2]`,
  model: `(a) At first the rate of evaporation is high and the rate of condensation is almost zero, so the vapour pressure rises. As vapour builds up the rate of condensation rises while evaporation continues at the same rate. When the two rates become equal, the number of molecules in the vapour no longer changes and the pressure is constant.

(b) Liquid–vapour equilibrium. Solid–vapour: iodine or camphor in a closed flask.

(c) Both changes go on at equal rates; nothing has stopped. If a trace of heavy water (or a radioactive tracer) is added to the liquid, it appears in the vapour after a while, although the amount of liquid and the pressure stay constant.`,
  sol: 'Rates equal at the constant pressure; liquid–vapour; dynamic shown by tracer in the vapour.',
  scheme: [['(a) Rising evaporation rate against low condensation rate at first', 1], ['(a) Equal rates give constant pressure', 1], ['(b) Liquid–vapour equilibrium and one solid–vapour example', 1], ['(c) Both processes continue at equal rates', 1], ['(c) Tracer observation', 1]],
  d: 2, c: 'understanding', t: [1],
}));

// ================================================================ t02 law of mass action, Kc and Kp
add('kc-expr-mcq', mcq({
  stem: String.raw`In an industrial reactor all the species of $\ce{4NH3(g) + 5O2(g) <=> 4NO(g) + 6H2O(g)}$ are gases. The expression for $K_c$ is:`,
  right: String.raw`$\dfrac{[\text{NO}]^4[\text{H}_2\text{O}]^6}{[\text{NH}_3]^4[\text{O}_2]^5}$`,
  wrong: [String.raw`$\dfrac{[\text{NH}_3]^4[\text{O}_2]^5}{[\text{NO}]^4[\text{H}_2\text{O}]^6}$`, String.raw`$\dfrac{4[\text{NO}]\times 6[\text{H}_2\text{O}]}{4[\text{NH}_3]\times 5[\text{O}_2]}$`, String.raw`$\dfrac{[\text{NO}]^6[\text{H}_2\text{O}]^4}{[\text{NH}_3]^5[\text{O}_2]^4}$`],
  sol: 'By the law of mass action K_c is the product of the equilibrium concentrations of the products, each raised to its stoichiometric coefficient, divided by the same for the reactants: [NO]⁴[H₂O]⁶ / ([NH₃]⁴[O₂]⁵) — option (@K).',
  d: 1, c: 'understanding', t: [2],
}));
add('units-mcq', mcq({
  stem: String.raw`For $\ce{2NO(g) + Cl2(g) <=> 2NOCl(g)}$ the equilibrium constant $K_p$ is calculated from partial pressures in atm. Its unit is:`,
  right: String.raw`$\text{atm}^{-1}$`,
  wrong: [String.raw`$\text{atm}$`, String.raw`$\text{atm}^{-2}$`, 'no unit'],
  sol: 'Δn_g = 2 − 3 = −1, so K_p = p²(NOCl) / (p²(NO) × p(Cl₂)) has the unit atm² / atm³ = atm⁻¹ — option (@K).',
  d: 1, c: 'understanding', t: [2],
}));
add('kpkc-mcq', mcq({
  stem: 'For which of the following gaseous reactions is the numerical value of Kp equal to that of Kc at the same temperature?',
  right: String.raw`$\ce{N2(g) + O2(g) <=> 2NO(g)}$`,
  wrong: [String.raw`$\ce{2NH3(g) <=> N2(g) + 3H2(g)}$`, String.raw`$\ce{N2O4(g) <=> 2NO2(g)}$`, String.raw`$\ce{2CO(g) + O2(g) <=> 2CO2(g)}$`],
  sol: 'K_p = K_c (RT)^Δn, so K_p = K_c only when Δn_g = 0. N₂ + O₂ ⇌ 2NO has 2 mol of gas on each side (Δn = 0); the others have Δn = +2, +1 and −1 — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('het-mcq', mcq({
  stem: String.raw`Carbon is heated in a closed furnace with carbon dioxide: $\ce{C(s) + CO2(g) <=> 2CO(g)}$. The expression for $K_p$ is:`,
  right: String.raw`$K_p = \dfrac{p_{\text{CO}}^2}{p_{\text{CO}_2}}$`,
  wrong: [String.raw`$K_p = \dfrac{p_{\text{CO}}^2}{p_{\text{C}}\,p_{\text{CO}_2}}$`, String.raw`$K_p = \dfrac{p_{\text{CO}_2}}{p_{\text{CO}}^2}$`, String.raw`$K_p = \dfrac{p_{\text{CO}}}{p_{\text{CO}_2}}$`],
  sol: 'The activity of a pure solid is constant and is not written in the expression. Only the gases appear: K_p = p²(CO) / p(CO₂) — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('recip-mcq', (() => {
  const K = 25;
  return mcq({
    stem: String.raw`At a certain temperature $K_c = 25$ (given) for $\ce{2NO2(g) <=> N2O4(g)}$. The equilibrium constant for $\ce{N2O4(g) <=> 2NO2(g)}$ at the same temperature is:`,
    right: String.raw`$${f2(1 / K)}$`,
    wrong: ['25', '5.0', '0.20'],
    sol: `Reversing an equation inverts K: K′ = 1 / 25 = ${f2(1 / K)} — option (@K).`,
    d: 2, c: 'understanding', t: [2],
  });
})(), () => near(1 / 25, 0.04) || 'recip');
add('sumk-mcq', (() => {
  const K1 = 1.0e-30, K2 = 3.0e12;
  return mcq({
    stem: String.raw`At a given temperature (data given) $\ce{N2 + O2 <=> 2NO}$ has $K_c = 1.0 \times 10^{-30}$ and $\ce{2NO + O2 <=> 2NO2}$ has $K_c = 3.0 \times 10^{12}$. The $K_c$ of $\ce{N2 + 2O2 <=> 2NO2}$ at that temperature is:`,
    right: String.raw`$3.0 \times 10^{-18}$`,
    wrong: [String.raw`$3.0 \times 10^{-42}$`, String.raw`$3.3 \times 10^{17}$`, String.raw`$3.0 \times 10^{18}$`],
    sol: `Adding two equations multiplies their K values: K = K₁ × K₂ = (1.0 × 10⁻³⁰)(3.0 × 10¹²) = ${ex(K1 * K2, 2)} — option (@K).`,
    d: 3, c: 'application', t: [2],
  });
})(), () => near(1.0e-30 * 3.0e12, 3.0e-18) || 'sumk');
add('qdir-mcq', (() => {
  const K = 1.0e-3, q = (0.04 ** 2 * 0.03) / 0.2 ** 2;
  return mcq({
    stem: String.raw`In a closed 1.0 L vessel at 1000 K, $K_c = 1.0 \times 10^{-3}$ mol L⁻¹ (given) for $\ce{2H2S(g) <=> 2H2(g) + S2(g)}$. A mixture is prepared with $[\text{H}_2\text{S}] = 0.20$, $[\text{H}_2] = 0.040$ and $[\text{S}_2] = 0.030$ mol L⁻¹. The mixture will:`,
    right: `move towards H₂S, because the reaction quotient (${ex(q, 2)} mol L⁻¹) is greater than K_c`,
    wrong: ['move towards H₂ and S₂, because the reaction quotient is greater than K_c', 'stay as it is, because the reaction quotient equals K_c', 'move towards H₂ and S₂, because the reaction quotient is less than K_c'],
    sol: `Q = [H₂]²[S₂] / [H₂S]² = (0.040)²(0.030) / (0.20)² = ${ex(q, 2)} mol L⁻¹. Since Q > K_c (${ex(K, 2)}), the net reaction goes backward until Q = K_c — option (@K).`,
    d: 3, c: 'application', t: [2, 3],
  });
})(), () => near((0.04 ** 2 * 0.03) / 0.04, 1.2e-3) || 'qdir');
add('alpha-mcq', (() => {
  const a = alphaFromM(92, 69);
  return mcq({
    stem: String.raw`The molar mass of pure $\ce{N2O4}$ is 92 g mol⁻¹. A sample of $\ce{N2O4(g)}$ in a closed vessel dissociates into $\ce{NO2(g)}$ at 330 K and the average molar mass of the equilibrium mixture is found to be 69 g mol⁻¹. The degree of dissociation of $\ce{N2O4}$ is:`,
    right: f2(a),
    wrong: ['0.25', '0.50', '0.75'],
    sol: `One mole of N₂O₄ gives 1 + α moles of gas, and the mass is unchanged, so M(observed) = 92 / (1 + α). 69 = 92 / (1 + α) gives 1 + α = ${f3(92 / 69)}, so α = ${f2(a)} — option (@K).`,
    d: 3, c: 'application', t: [2],
  });
})(), () => near(alphaFromM(92, 69), 0.3333, 0.001) || 'alpha');
add('est-mcq', (() => {
  const x = esterX(1, 1);
  return mcq({
    stem: String.raw`For $\ce{CH3COOH(l) + C2H5OH(l) <=> CH3COOC2H5(l) + H2O(l)}$, $K_c = 4.0$ at room temperature. One mole of ethanoic acid is mixed with one mole of ethanol and left to reach equilibrium. The amount of ethyl ethanoate formed is:`,
    right: `${f2(x)} mol`,
    wrong: ['1.00 mol', '0.50 mol', '0.80 mol'],
    sol: `Let x mol of ester form. K_c = x² / (1 − x)² = 4.0 (volume cancels because Δn = 0), so x / (1 − x) = 2 and x = ${f2(x)} mol — option (@K).`,
    d: 3, c: 'application', t: [2],
  });
})(), () => near(esterX(1, 1), 2 / 3, 0.001) || 'est');
add('hi-tf', tf({
  stem: String.raw`The equilibrium constant $K_c$ of $\ce{2HI(g) <=> H2(g) + I2(g)}$ has no unit.`,
  key: 't',
  sol: 'True. The number of moles of gas is the same on both sides (Δn = 0), so the concentration units cancel in K_c = [H₂][I₂] / [HI]².',
  d: 1, c: 'understanding', t: [2],
}));
add('fill-kp', fill({
  stem: 'In the expression for Kp the concentrations of the gases are replaced by their ___ at equilibrium.',
  acc: [['partial pressures', 'partial pressure']],
  sol: 'K_p is written with the partial pressures of the gases.',
  d: 1, c: 'recall', t: [2],
}));
add('fill-unit', fill({
  stem: String.raw`The unit of $K_c$ for $\ce{N2(g) + 3H2(g) <=> 2NH3(g)}$ is ___ (write it as L to a power and mol to a power).`,
  acc: [['L² mol⁻²', 'L^2 mol^-2', 'L2 mol-2', 'mol⁻² L²']],
  sol: 'Δn_g = −2, so the unit is (mol L⁻¹)⁻² = L² mol⁻².',
  d: 2, c: 'understanding', t: [2],
}));
add('unit-match', match({
  stem: 'Match each gaseous reaction in Column I with the unit of its Kc in Column II (concentrations in mol L⁻¹).',
  pairs: [[String.raw`$\ce{N2 + O2 <=> 2NO}$`, 'no unit'], [String.raw`$\ce{N2O4 <=> 2NO2}$`, String.raw`$\text{mol L}^{-1}$`], [String.raw`$\ce{2NO + O2 <=> 2NO2}$`, String.raw`$\text{L mol}^{-1}$`], [String.raw`$\ce{N2 + 3H2 <=> 2NH3}$`, String.raw`$\text{L}^2\,\text{mol}^{-2}$`]],
  order: [2, 0, 3, 1],
  sol: 'The unit is (mol L⁻¹)^Δn: Δn = 0 gives no unit, Δn = +1 gives mol L⁻¹, Δn = −1 gives L mol⁻¹ and Δn = −2 gives L² mol⁻².',
  d: 2, c: 'understanding', t: [2],
}));
add('massaction-short2', short({
  marks: 2,
  stem: String.raw`State the law of mass action and use it to write the equilibrium constant expression $K_c$ for the general gaseous reaction $\ce{aA + bB <=> cC + dD}$.`,
  model: String.raw`At a given temperature the rate of a chemical reaction is proportional to the product of the active masses (molar concentrations) of the reactants, each raised to the power of its coefficient. At equilibrium the forward and reverse rates are equal, which gives $K_c = \dfrac{[C]^c[D]^d}{[A]^a[B]^b}$, a constant at a given temperature.`,
  sol: 'Rate ∝ product of active masses; K_c = [C]^c[D]^d / ([A]^a[B]^b).',
  scheme: [['Statement of the law of mass action', 1], ['Expression for K_c', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('nh4cl-het-short2', short({
  marks: 2,
  stem: String.raw`Write $K_c$ and $K_p$ for $\ce{NH4Cl(s) <=> NH3(g) + HCl(g)}$ and explain why the solid is left out of the expressions.`,
  model: 'K_c = [NH₃][HCl] and K_p = p(NH₃) × p(HCl). The concentration of a pure solid is constant at a given temperature (its density divided by its molar mass), so it is taken into the constant and does not appear in the expression.',
  sol: 'K_c = [NH₃][HCl]; K_p = p(NH₃)p(HCl); the activity of a pure solid is constant.',
  scheme: [['K_c and K_p expressions without the solid', 1], ['Reason: constant concentration of a pure solid', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('kchar-short2', short({
  marks: 2,
  stem: 'A student states three facts about an equilibrium constant. Say which factors change K and which do not: (i) the starting concentrations, (ii) the temperature, (iii) the presence of a catalyst, (iv) the total pressure.',
  model: 'Only the temperature (ii) changes the equilibrium constant. The starting concentrations (i), the catalyst (iii) and the pressure (iv) do not change K, although they may change how much of each substance is present or how fast equilibrium is reached.',
  sol: 'Only temperature changes K.',
  scheme: [['Temperature changes K', 1], ['Concentration, catalyst and pressure do not', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('kp-num', (() => {
  const p = (0.2 * 0.2) / 0.8;
  return num({
    stem: String.raw`In a closed furnace at 600 K the equilibrium $\ce{COCl2(g) <=> CO(g) + Cl2(g)}$ has partial pressures 0.80 atm of $\ce{COCl2}$, 0.20 atm of $\ce{CO}$ and 0.20 atm of $\ce{Cl2}$ (given). Calculate $K_p$ in atm.`,
    value: Number(f2(p)), tol: 0.005, unit: 'atm',
    sol: String.raw`$K_p = \dfrac{p_{\text{CO}}\,p_{\text{Cl}_2}}{p_{\text{COCl}_2}} = \dfrac{0.20 \times 0.20}{0.80} = ${f2(p)}$ atm.`,
    scheme: [['K_p = p(CO) p(Cl₂) / p(COCl₂)', 1], ['0.05 atm', 1]],
    marks: 2, d: 2, c: 'understanding', t: [2],
  });
})(), (q) => near(0.2 * 0.2 / 0.8, 0.05) && q.answer.value === 0.05 || 'kp');
add('kc-num', (() => {
  const k = (0.05 ** 2 * 0.025) / 0.25 ** 2;
  return num({
    stem: String.raw`A 2.0 L closed vessel at 1000 K holds, at equilibrium, 0.50 mol $\ce{H2S}$, 0.10 mol $\ce{H2}$ and 0.050 mol $\ce{S2}$ (given), all gases, in the reaction $\ce{2H2S(g) <=> 2H2(g) + S2(g)}$. Calculate $K_c$ in mol L⁻¹.`,
    value: Number(f4(k)), tol: 0.0001, unit: 'mol L⁻¹',
    sol: String.raw`Concentrations: $[\text{H}_2\text{S}] = 0.25$, $[\text{H}_2] = 0.050$, $[\text{S}_2] = 0.025$ mol L⁻¹. $K_c = \dfrac{[\text{H}_2]^2[\text{S}_2]}{[\text{H}_2\text{S}]^2} = \dfrac{(0.050)^2(0.025)}{(0.25)^2} = ${f4(k)}$ mol L⁻¹.`,
    scheme: [['Convert moles to concentrations (÷ 2.0 L)', 1], ['K_c = 0.0010 mol L⁻¹', 1]],
    marks: 2, d: 2, c: 'understanding', t: [2],
  });
})(), (q) => near((0.05 ** 2 * 0.025) / 0.25 ** 2, 1e-3) && q.answer.value === 0.001 || 'kc');
add('kckp-num', (() => {
  const kc = 14.5, T = 500, kp = kc / (RA * T) ** 2;
  return num({
    stem: String.raw`For the methanol synthesis $\ce{CO(g) + 2H2(g) <=> CH3OH(g)}$ at 500 K, $K_c = 14.5$ L² mol⁻² (given). Calculate $K_p$ in atm⁻² ($R = 0.0821$ L atm K⁻¹ mol⁻¹).`,
    value: Number(kp.toPrecision(2)), tol: 0.0002, unit: 'atm⁻²',
    sol: String.raw`$\Delta n_g = 1 - 3 = -2$, so $K_p = K_c(RT)^{\Delta n} = \dfrac{14.5}{(0.0821 \times 500)^2} = \dfrac{14.5}{${f0((RA * T) ** 2)}} = ${kp.toPrecision(2)}$ atm⁻².`,
    scheme: [['Δn_g = −2 and K_p = K_c (RT)^Δn', 1], ['RT = 41.05 L atm mol⁻¹ and K_p = 8.6 × 10⁻³ atm⁻²', 1]],
    marks: 2, d: 3, c: 'application', t: [2],
  });
})(), (q) => near(14.5 / 41.05 ** 2, 8.6e-3, 0.01) && q.answer.value === 0.0086 || 'kckp');
add('nh4hs-short3', (() => {
  const P = 0.66, p = P / 2, kp = p * p, T = 298, kc = kp / (RA * T) ** 2;
  return short({
    marks: 3,
    stem: String.raw`Solid ammonium hydrogensulphide is placed in an evacuated flask at 298 K and decomposes: $\ce{NH4HS(s) <=> NH3(g) + H2S(g)}$. At equilibrium the total pressure is 0.66 atm (given). Calculate $K_p$ and $K_c$ ($R = 0.0821$ L atm K⁻¹ mol⁻¹).`,
    model: `Only the gases appear, and they are formed in equal amounts, so p(NH₃) = p(H₂S) = 0.66 / 2 = ${f2(p)} atm. K_p = p(NH₃) × p(H₂S) = ${f2(p)} × ${f2(p)} = ${f4(kp)} atm². Δn_g = 2, so K_c = K_p / (RT)² = ${f4(kp)} / (0.0821 × 298)² = ${f4(kp)} / ${f1((RA * T) ** 2)} = ${ex(kc, 2)} mol² L⁻².`,
    sol: `K_p = ${f4(kp)} atm²; K_c = ${ex(kc, 2)} mol² L⁻².`,
    scheme: [[`Equal partial pressures ${f2(p)} atm each`, 1], [`K_p = ${f4(kp)} atm²`, 1], [`K_c = ${ex(kc, 2)} mol² L⁻² using (RT)²`, 1]],
    d: 3, c: 'application', t: [2],
  });
})(), () => near(0.33 ** 2, 0.1089, 0.001) && near(0.1089 / (0.0821 * 298) ** 2, 1.82e-4, 0.01) || 'nh4hs');
add('brcl-short3', (() => {
  const { x, brcl, left } = brclForward(0.20);
  return short({
    marks: 3,
    stem: String.raw`Bromine monochloride forms in a sealed 1.0 L vessel at 400 K: $\ce{Br2(g) + Cl2(g) <=> 2BrCl(g)}$, $K_c = 7.0$. The vessel is filled with 0.20 mol of $\ce{Br2}$ and 0.20 mol of $\ce{Cl2}$ only. Calculate the equilibrium concentration of $\ce{BrCl}$.`,
    model: `Let x mol L⁻¹ of Br₂ react. [Br₂] = [Cl₂] = 0.20 − x and [BrCl] = 2x. K_c = (2x)² / (0.20 − x)² = 7.0, so 2x / (0.20 − x) = √7.0 = 2.646. Then 2x = 0.5292 − 2.646x, giving x = ${f4(x)} mol L⁻¹. [BrCl] = 2x = ${f3(brcl)} mol L⁻¹ (and [Br₂] = [Cl₂] = ${f3(left)} mol L⁻¹).`,
    sol: `[BrCl] = ${f3(brcl)} mol L⁻¹.`,
    scheme: [['Equilibrium concentrations 0.20 − x, 0.20 − x, 2x', 1], ['Square root of K_c taken: 2x / (0.20 − x) = 2.646', 1], [`x = ${f4(x)} and [BrCl] = ${f3(brcl)} mol L⁻¹`, 1]],
    d: 3, c: 'application', t: [2],
  });
})(), () => { const { brcl, left } = brclForward(0.2); return near(brcl ** 2 / left ** 2, 7.0, 0.001) || 'brcl'; });
add('brclrev-short3', (() => {
  const { x, brcl } = brclReverse(0.60);
  return short({
    marks: 3,
    stem: String.raw`A different experiment at 400 K starts with 0.60 mol L⁻¹ of $\ce{BrCl}$ alone in a closed vessel, which decomposes to $\ce{Br2}$ and $\ce{Cl2}$ ($K_c = 7.0$ for the formation of BrCl from the elements). Calculate the equilibrium concentrations of all three species.`,
    model: `2BrCl ⇌ Br₂ + Cl₂ has K_c′ = 1 / 7.0 = 0.1429. Let x mol L⁻¹ of Br₂ form: [Br₂] = [Cl₂] = x and [BrCl] = 0.60 − 2x. x² / (0.60 − 2x)² = 1 / 7.0, so x / (0.60 − 2x) = 0.378 and x = ${f4(x)} mol L⁻¹. [Br₂] = [Cl₂] = ${f3(x)} and [BrCl] = ${f3(brcl)} mol L⁻¹.`,
    sol: `[Br₂] = [Cl₂] = ${f3(x)}; [BrCl] = ${f3(brcl)} mol L⁻¹.`,
    scheme: [['Reverse reaction with K_c′ = 1/7.0', 1], ['Equilibrium concentrations x, x and 0.60 − 2x; square root taken', 1], [`x = ${f3(x)}; [BrCl] = ${f3(brcl)} mol L⁻¹`, 1]],
    d: 4, c: 'analysis', t: [2],
  });
})(), () => { const { x, brcl } = brclReverse(0.6); return near(x * x / brcl ** 2, 1 / 7, 0.001) || 'brclrev'; });
add('est-short3', (() => {
  const x = esterX(1, 3);
  const x1 = esterX(1, 1);
  return short({
    marks: 3,
    stem: String.raw`A flask holds 1.0 mol of ethanoic acid and 3.0 mol of ethanol at room temperature, with the equilibrium $\ce{CH3COOH + C2H5OH <=> CH3COOC2H5 + H2O}$, $K_c = 4.0$. Calculate the amount of ester at equilibrium and compare the conversion of the acid with that when 1.0 mol each of acid and alcohol are used (${f2(x1)} mol of ester).`,
    model: `Let x mol of ester form: x² / ((1 − x)(3 − x)) = 4.0, so 3x² − 16x + 12 = 0 and x = ${f3(x)} mol (the other root, 4.43, exceeds the acid present). The conversion of the acid is ${f0(x * 100)}%, against ${f0(x1 * 100)}% with equal amounts. The excess of alcohol drives the equilibrium forward (Le Chatelier).`,
    sol: `x = ${f3(x)} mol; ${f0(x * 100)}% against ${f0(x1 * 100)}%.`,
    scheme: [['Equation x² = 4(1 − x)(3 − x) rearranged to 3x² − 16x + 12 = 0', 1], [`x = ${f3(x)} mol, root less than 1 chosen`, 1], ['Higher conversion with excess alcohol, explained', 1]],
    d: 4, c: 'analysis', t: [2, 3],
  });
})(), () => { const x = esterX(1, 3); return near(x * x / ((1 - x) * (3 - x)), 4, 0.001) || 'est3'; });
add('deriv-long', (() => {
  const kc = 4.6e-3, T = 298, kp = kc * RA * T;
  return long({
    stem: String.raw`(a) For the gaseous equilibrium $\ce{aA + bB <=> cC + dD}$, derive the relation $K_p = K_c(RT)^{\Delta n}$, defining $\Delta n$. [3]

(b) For $\ce{N2O4(g) <=> 2NO2(g)}$, $K_c = 4.6 \times 10^{-3}$ mol L⁻¹ at 298 K (given). Calculate $K_p$ in atm ($R = 0.0821$ L atm K⁻¹ mol⁻¹). [2]`,
    model: String.raw`(a) For an ideal gas $pV = nRT$, so the partial pressure of a gas is $p = \dfrac{n}{V}RT = [\,\text{gas}\,]RT$. Then
$K_p = \dfrac{p_C^c\,p_D^d}{p_A^a\,p_B^b} = \dfrac{([C]RT)^c([D]RT)^d}{([A]RT)^a([B]RT)^b} = \dfrac{[C]^c[D]^d}{[A]^a[B]^b}\,(RT)^{(c+d)-(a+b)}$.
So $K_p = K_c(RT)^{\Delta n}$, where $\Delta n = (c + d) - (a + b)$ is the change in the number of moles of gas on going from reactants to products.

(b) $\Delta n = 2 - 1 = +1$, so $K_p = K_c(RT) = 4.6 \times 10^{-3} \times 0.0821 \times 298 = ${f3(kp)}$ atm.`,
    sol: `(b) K_p = ${f3(kp)} atm.`,
    scheme: [['(a) Partial pressure p = [gas]RT from pV = nRT', 1], ['(a) Substitution in K_p and grouping the RT terms', 1], ['(a) Δn = (c + d) − (a + b), result K_p = K_c (RT)^Δn', 1], ['(b) Δn = +1 and K_p = K_c RT', 1], [`(b) K_p = ${f3(kp)} atm`, 1]],
    d: 3, c: 'understanding', t: [2],
  });
})(), () => near(4.6e-3 * 0.0821 * 298, 0.1125, 0.002) || 'deriv');
add('alpha-long', (() => {
  const Kp = 0.5, P = 2.0, a = alphaFromKp(Kp, P);
  return long({
    stem: String.raw`(a) One mole of $\ce{N2O4}$ dissociates to the extent α at total pressure P: $\ce{N2O4(g) <=> 2NO2(g)}$. Derive $K_p$ in terms of α and P. [3]

(b) At 330 K, $K_p = 0.50$ atm (given). Calculate the degree of dissociation at a total pressure of 2.0 atm. [2]`,
    model: String.raw`(a) Moles at equilibrium: $\ce{N2O4}$: $1 - \alpha$; $\ce{NO2}$: $2\alpha$; total $1 + \alpha$. Mole fractions $\dfrac{1-\alpha}{1+\alpha}$ and $\dfrac{2\alpha}{1+\alpha}$; partial pressures are these times $P$.
$K_p = \dfrac{p_{NO_2}^2}{p_{N_2O_4}} = \dfrac{4\alpha^2P^2/(1+\alpha)^2}{(1-\alpha)P/(1+\alpha)} = \dfrac{4\alpha^2P}{1-\alpha^2}$.

(b) $0.50 = \dfrac{4\alpha^2(2.0)}{1-\alpha^2}$, so $0.50(1-\alpha^2) = 8.0\alpha^2$, $\alpha^2 = \dfrac{0.50}{8.5} = ${f4(0.5 / 8.5)}$ and $\alpha = ${f2(a)}$ (about 24%).`,
    sol: `(b) α² = 0.50 ÷ 8.5 = ${f4(0.5 / 8.5)}; α = ${f2(a)}.`,
    scheme: [['(a) Moles 1 − α, 2α, total 1 + α', 1], ['(a) Partial pressures from mole fractions × P', 1], ['(a) K_p = 4α²P / (1 − α²)', 1], ['(b) Substitution of K_p and P', 1], [`(b) α = ${f2(a)}`, 1]],
    d: 3, c: 'application', t: [2],
  });
})(), () => near(kpAlpha(alphaFromKp(0.5, 2.0), 2.0), 0.5, 0.001) || 'alphalong');
add('kcconc-ar', ar({
  a: 'At a fixed temperature the equilibrium constant of a reaction does not change when more of a reactant is added to the equilibrium mixture.',
  r: 'The equilibrium constant depends on the initial concentrations of the reactants.',
  key: 'c',
  sol: 'A is true: adding a reactant disturbs the equilibrium, which shifts to restore the same K at that temperature. R is false: K does not depend on the initial concentrations; it depends only on temperature — option (c).',
  d: 2, c: 'understanding', t: [2, 3],
}));
add('kpkc-ar', ar({
  a: String.raw`For $\ce{H2(g) + I2(g) <=> 2HI(g)}$ the numerical values of $K_p$ and $K_c$ are equal.`,
  r: 'The total number of moles of gas changes during this reaction.',
  key: 'c',
  sol: 'A is true: Δn_g = 2 − 2 = 0, so K_p = K_c (RT)⁰ = K_c. R is false: the number of moles of gas does not change, which is exactly why they are equal — option (c).',
  d: 2, c: 'application', t: [2],
}));

// ================================================================ t03 Le Chatelier's principle
add('conc-mcq', mcq({
  stem: String.raw`A few drops of iron(III) nitrate and potassium thiocyanate give a red solution in the equilibrium $\ce{Fe^3+(aq) + SCN-(aq) <=> FeSCN^2+(aq)}$. More iron(III) nitrate solution is now added. The red colour:`,
  right: 'becomes deeper, as the equilibrium shifts to the right',
  wrong: ['fades, as the equilibrium shifts to the left', 'is unchanged, as K does not change', 'turns yellow, as thiocyanate is removed completely'],
  sol: 'Adding Fe³⁺ raises a reactant concentration, so the system shifts to the right to use up some of it, forming more of the red complex. K is unchanged but the position of equilibrium moves — option (@K).',
  d: 1, c: 'understanding', t: [3],
}));
add('chromate-mcq', mcq({
  stem: String.raw`Orange potassium dichromate solution contains the equilibrium $\ce{Cr2O7^2-(aq) + H2O(l) <=> 2CrO4^2-(aq) + 2H+(aq)}$ (yellow chromate on the right). A student adds dilute sodium hydroxide dropwise. The colour changes to:`,
  right: 'yellow, because OH⁻ removes H⁺ and the equilibrium shifts to the right',
  wrong: ['deeper orange, because OH⁻ removes H⁺ and the equilibrium shifts to the left', 'yellow, because OH⁻ adds to the chromate and the equilibrium shifts to the left', 'no change, because water is a pure liquid in the expression'],
  sol: 'OH⁻ ions neutralise H⁺ ions, lowering [H⁺]. By Le Chatelier\'s principle the equilibrium shifts to the right to replace H⁺, forming more yellow CrO₄²⁻ — option (@K).',
  d: 3, c: 'application', t: [3],
}));
add('temp-mcq', mcq({
  stem: String.raw`A sealed tube of brown $\ce{NO2}$ and colourless $\ce{N2O4}$ at equilibrium, $\ce{N2O4(g) <=> 2NO2(g)}$ with $\Delta H = +57.2$ kJ, is placed in hot water. The tube:`,
  right: 'darkens, because the endothermic forward reaction is favoured by a rise in temperature',
  wrong: ['becomes paler, because the exothermic reaction is favoured by a rise in temperature', 'darkens, because the value of K decreases', 'is unchanged, because the total pressure is constant'],
  sol: 'Heating shifts the equilibrium in the direction that absorbs heat, the forward (endothermic) reaction. More brown NO₂ forms and the equilibrium constant increases — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('press-mcq', mcq({
  stem: String.raw`In which of the following gaseous equilibria will compressing the mixture at constant temperature increase the amount of product?`,
  right: String.raw`$\ce{CO(g) + 2H2(g) <=> CH3OH(g)}$`,
  wrong: [String.raw`$\ce{N2O4(g) <=> 2NO2(g)}$`, String.raw`$\ce{H2(g) + Cl2(g) <=> 2HCl(g)}$`, String.raw`$\ce{2NH3(g) <=> N2(g) + 3H2(g)}$`],
  sol: 'Compression favours the side with fewer moles of gas. CO + 2H₂ ⇌ CH₃OH goes from 3 mol to 1 mol, so the product increases. N₂O₄ ⇌ 2NO₂ and 2NH₃ ⇌ N₂ + 3H₂ would shift backward, and H₂ + Cl₂ ⇌ 2HCl is unaffected — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('nopress-mcq', mcq({
  stem: 'A sealed container holds an equilibrium mixture of H₂, I₂ and HI gases. Halving the volume of the container at constant temperature will:',
  right: 'double all the concentrations without shifting the position of equilibrium',
  wrong: ['shift the equilibrium towards HI', 'shift the equilibrium towards H₂ and I₂', 'change the value of the equilibrium constant'],
  sol: 'H₂ + I₂ ⇌ 2HI has 2 mol of gas on each side, so pressure does not favour either direction. Halving the volume doubles all the concentrations, and Q stays equal to K — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('cco2-mcq', mcq({
  stem: String.raw`Carbon dioxide passes over red-hot coke in a furnace: $\ce{C(s) + CO2(g) <=> 2CO(g)}$, $\Delta H = +172$ kJ. Which change increases the percentage of $\ce{CO}$ in the gas at equilibrium?`,
  right: 'raising the temperature and lowering the total pressure',
  wrong: ['raising the temperature and raising the total pressure', 'lowering the temperature and lowering the total pressure', 'adding more solid carbon at constant temperature and volume'],
  sol: 'The reaction is endothermic, so a higher temperature favours CO. It increases the moles of gas (1 → 2), so a lower pressure also favours CO. Adding more solid carbon changes nothing, since a pure solid does not appear in K — option (@K).',
  d: 3, c: 'analysis', t: [3],
}));
add('inert-mcq', mcq({
  stem: String.raw`At 330 K and constant total pressure, $\ce{N2O4(g) <=> 2NO2(g)}$ is at equilibrium. Argon is now added so that the pressure stays constant (the volume increases). The amount of $\ce{NO2}$:`,
  right: 'increases, because the partial pressures fall and the side with more moles of gas is favoured',
  wrong: ['decreases, because the total number of moles of gas increases', 'stays the same, because argon takes no part in the reaction', 'decreases, because the volume of the container increases'],
  sol: 'At constant total pressure, adding argon increases the volume, so the partial pressures and concentrations of N₂O₄ and NO₂ all fall. The system behaves as if the pressure were lowered and shifts to the side with more gas moles, producing more NO₂ — option (@K).',
  d: 3, c: 'analysis', t: [3],
}));
add('inert-tf', tf({
  stem: String.raw`Argon is added to the equilibrium mixture in $\ce{N2(g) + 3H2(g) <=> 2NH3(g)}$ at constant volume. The equilibrium shifts towards the side with more moles of gas.`,
  key: 'f',
  sol: 'False. At constant volume the concentrations of the reacting gases do not change when an inert gas is added, so Q stays equal to K and the equilibrium does not shift.',
  d: 2, c: 'understanding', t: [3],
}));
add('cat-mcq', mcq({
  stem: 'Two reactors hold the same gaseous reversible reaction starting from identical mixtures; a catalyst is used in one only. Compared with the uncatalysed reactor, the catalysed reactor:',
  right: 'reaches equilibrium sooner but with the same composition and the same value of K',
  wrong: ['reaches equilibrium sooner and with more product', 'reaches equilibrium at the same time but with more product', 'reaches equilibrium sooner but with a larger value of K'],
  sol: 'A catalyst lowers the activation energy of the forward and the reverse reactions by the same amount, so both rates rise equally. Equilibrium is reached faster, but K and the equilibrium composition are unchanged — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('soda-mcq', mcq({
  stem: String.raw`A sealed bottle of soda contains $\ce{CO2(g) <=> CO2(aq)}$ under pressure. When the cap is opened, gas bubbles out of the drink because:`,
  right: 'the pressure falls and the equilibrium shifts to the side with the gas, so dissolved CO₂ comes out',
  wrong: ['the pressure falls and more CO₂ dissolves to replace the lost gas', 'the temperature falls and CO₂ becomes more soluble', 'the equilibrium constant of dissolution falls to zero'],
  sol: 'Opening the cap lowers the pressure of CO₂ above the liquid. The equilibrium shifts in the direction that raises the gas pressure, so CO₂(aq) changes to CO₂(g) and bubbles form — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('cat-ar', ar({
  a: 'The equilibrium constant of an exothermic reaction decreases when the temperature is raised.',
  r: 'Ice floats on liquid water because ice is less dense than water.',
  key: 'b',
  sol: 'Both statements are true. Raising the temperature favours the endothermic (reverse) direction, so K falls for an exothermic reaction. The density of ice is a true fact about water that has nothing to do with the temperature effect on K, so R does not explain A — option (b).',
  d: 3, c: 'analysis', t: [3],
}));
add('pressure-ar', ar({
  a: String.raw`Increasing the pressure on $\ce{N2O4(g) <=> 2NO2(g)}$ at constant temperature favours the forward reaction.`,
  r: 'The forward reaction decreases the number of moles of gas.',
  key: 'd',
  sol: 'Both statements are false. The forward reaction increases the moles of gas (1 → 2), so a higher pressure favours the reverse reaction, towards N₂O₄ — option (d).',
  d: 3, c: 'analysis', t: [3],
}));
add('ice-ar', ar({
  a: 'Raising the pressure on ice and water at 273 K melts some of the ice.',
  r: 'The volume of a given mass of water is less than that of the same mass of ice, so melting reduces the volume.',
  key: 'a',
  sol: 'Both statements are true. Ice is less dense than water, so melting decreases the volume. By Le Chatelier\'s principle higher pressure favours the change that reduces the volume — option (a).',
  d: 3, c: 'application', t: [3],
}));
add('catalyst-short2', short({
  marks: 2,
  stem: 'A reversible gas-phase reaction in a plant is already at equilibrium when a catalyst is added to the reactor. State and justify what happens to (i) the composition of the mixture and (ii) the value of the equilibrium constant.',
  model: 'Both unchanged. A catalyst lowers the activation energy of the forward and the reverse reactions equally, so it speeds up both rates by the same factor. The rates remain equal, so the composition does not alter, and K, which depends only on temperature, is unchanged. Had equilibrium not been reached, the catalyst would help to reach it sooner.',
  sol: 'No change in composition or K; both rates increase equally.',
  scheme: [['Composition unchanged and K unchanged', 1], ['Reason: both rates increased equally', 1]],
  d: 3, c: 'application', t: [3],
}));
add('inert-short2', short({
  marks: 2,
  stem: String.raw`Explain how adding helium to the equilibrium mixture of $\ce{N2O4(g) <=> 2NO2(g)}$ affects the position of equilibrium (i) at constant volume and (ii) at constant total pressure.`,
  model: '(i) At constant volume the concentrations (partial pressures) of N₂O₄ and NO₂ are unchanged, so there is no shift. (ii) At constant pressure the volume increases, so the concentrations fall, as if the pressure were lowered; the equilibrium shifts to the side with more moles of gas, towards NO₂.',
  sol: 'No shift at constant V; shift towards NO₂ at constant P.',
  scheme: [['(i) No change at constant volume, with reason', 1], ['(ii) Shift towards NO₂ at constant pressure, with reason', 1]],
  d: 3, c: 'analysis', t: [3],
}));
add('tempco-short3', short({
  marks: 3,
  stem: String.raw`Methanol is made in a closed reactor by $\ce{CO(g) + 2H2(g) <=> CH3OH(g)}$, $\Delta H = -90.7$ kJ. Predict, with reasons, the effect on the yield of methanol of (i) raising the temperature, (ii) raising the pressure and (iii) removing methanol as it forms.`,
  model: '(i) The forward reaction is exothermic, so a rise in temperature favours the reverse reaction; K falls and the yield decreases. (ii) The forward reaction reduces the moles of gas (3 → 1), so a higher pressure shifts the equilibrium forward and the yield increases. (iii) Removing the product lowers its concentration below the equilibrium value, so the system shifts forward and more methanol forms.',
  sol: 'Yield: lower with higher T; higher with higher P; higher when methanol is removed.',
  scheme: [['(i) Lower yield, exothermic', 1], ['(ii) Higher yield, 3 mol → 1 mol', 1], ['(iii) Higher yield, product removal shifts forward', 1]],
  d: 3, c: 'application', t: [3],
}));
add('cco-short3', short({
  marks: 3,
  stem: String.raw`Producer gas contains the equilibrium $\ce{C(s) + CO2(g) <=> 2CO(g)}$, $\Delta H = +172$ kJ. State, with reasons, how the amount of $\ce{CO}$ at equilibrium changes when (i) the temperature is raised, (ii) the volume is halved at constant temperature, and (iii) more solid carbon is added.`,
  model: '(i) The forward reaction is endothermic, so higher temperature favours CO: its amount increases. (ii) Halving the volume doubles the pressure; the forward reaction increases the moles of gas (1 → 2), so the equilibrium shifts back and the amount of CO decreases. (iii) No change: pure solid carbon has constant activity and does not appear in K_c, so the position does not alter.',
  sol: 'CO increases with T; decreases on compression; no change with more carbon.',
  scheme: [['(i) Increase, endothermic', 1], ['(ii) Decrease, fewer gas moles on the left', 1], ['(iii) No change, solid not in K', 1]],
  d: 3, c: 'application', t: [3],
}));
add('shift-short3', short({
  marks: 3,
  stem: String.raw`Dilute acid is added dropwise to a yellow solution of chromate ions until the colour turns orange: $\ce{2CrO4^2-(aq) + 2H+(aq) <=> Cr2O7^2-(aq) + H2O(l)}$. Explain the colour change, and say what is seen when sodium hydroxide solution is then added in excess.`,
  model: 'Adding H⁺ raises the concentration of a reactant, so the equilibrium shifts to the right; the yellow CrO₄²⁻ is used up and orange Cr₂O₇²⁻ forms. Adding excess NaOH removes H⁺ (H⁺ + OH⁻ → H₂O), so the equilibrium shifts to the left and the yellow colour returns. K does not change in either case.',
  sol: 'Acid: shift right, orange; alkali: shift left, yellow.',
  scheme: [['Acid shifts the equilibrium right: orange', 1], ['Alkali removes H⁺ and shifts it left: yellow', 1], ['K unchanged; Le Chatelier reasoning', 1]],
  d: 3, c: 'analysis', t: [3],
}));
add('kt-short3', short({
  marks: 3,
  stem: 'The equilibrium constant Kc of a gaseous reaction A ⇌ B was measured (data given): 120 at 300 K, 15 at 400 K and 3.0 at 500 K. Decide whether the forward reaction is exothermic or endothermic, and predict what happens to the percentage of B at equilibrium as the temperature is raised.',
  model: 'K decreases as the temperature rises, so the equilibrium is shifted towards the reactant A. By Le Chatelier\'s principle, a rise in temperature favours the endothermic direction; here that is the reverse direction, so the forward reaction is exothermic (ΔH < 0). The percentage of B in the equilibrium mixture decreases as the temperature is raised, from a high value at 300 K to a much lower value at 500 K.',
  sol: 'K falls with T: exothermic; percentage of B falls.',
  scheme: [['K decreases with temperature', 1], ['Forward reaction exothermic, by Le Chatelier', 1], ['Percentage of B falls', 1]],
  d: 4, c: 'analysis', t: [3],
}));
add('lechat-long', long({
  stem: String.raw`Nitrogen dioxide forms in $\ce{2NO(g) + O2(g) <=> 2NO2(g)}$, $\Delta H = -114$ kJ, in a closed vessel.

(a) State Le Chatelier's principle. [1]

(b) Predict, with reasons, the effect on the amount of $\ce{NO2}$ at equilibrium of lowering the temperature, increasing the pressure and adding a catalyst. [2]

(c) Helium is added to the equilibrium mixture. What happens to the amount of $\ce{NO2}$ (i) at constant volume and (ii) at constant total pressure? [2]`,
  model: `(a) If a system at equilibrium is subjected to a change of concentration, pressure or temperature, the equilibrium shifts in the direction that tends to reduce (oppose) the change.

(b) Lower temperature: the forward reaction is exothermic, so it is favoured; NO₂ increases (K increases). Higher pressure: 3 mol of gas → 2 mol, so the forward reaction is favoured; NO₂ increases. Catalyst: no effect on the amount at equilibrium (it speeds up both reactions equally); equilibrium is reached sooner.

(c) (i) At constant volume the concentrations do not change, so there is no shift and the amount of NO₂ is unchanged. (ii) At constant pressure the volume increases and the concentrations fall; the equilibrium shifts to the side with more moles of gas (towards NO and O₂), so the amount of NO₂ decreases.`,
  sol: 'Principle stated; lower T and higher P increase NO₂, catalyst none; helium: no change at constant V, decrease at constant P.',
  scheme: [['(a) Statement of the principle', 1], ['(b) Lower temperature and higher pressure both increase NO₂, with reasons', 1], ['(b) Catalyst: no change in the amount', 1], ['(c)(i) No shift at constant volume', 1], ['(c)(ii) Shift towards NO and O₂ at constant pressure', 1]],
  d: 3, c: 'application', t: [3],
}));

// ================================================================ t04 conditions for maximum yield
add('haber-mcq', mcq({
  stem: 'The conditions that give a good rate and a satisfactory yield of ammonia in the Haber process are:',
  right: 'about 200 atm, about 700–720 K, and finely divided iron with a molybdenum promoter',
  wrong: ['about 1 atm, about 300 K, and finely divided iron with a molybdenum promoter', 'about 200 atm, about 300 K, and platinum gauze', 'about 1 atm, about 700–720 K, and vanadium(V) oxide'],
  sol: 'High pressure favours NH₃ (4 mol → 2 mol of gas); about 700–720 K is a compromise between yield (exothermic) and rate; iron with Mo as promoter is the catalyst — option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('contact-mcq', mcq({
  stem: String.raw`In the contact process, $\ce{2SO2(g) + O2(g) <=> 2SO3(g)}$ ($\Delta H = -196$ kJ) is carried out at only about 1–2 atm, although high pressure would favour the product. This is because:`,
  right: 'a high conversion is already obtained at this pressure, and high pressure would add cost and corrosion without much gain',
  wrong: ['high pressure would shift the equilibrium towards SO₂ and O₂', 'the catalyst works only at low pressure', 'low pressure increases the value of the equilibrium constant'],
  sol: 'The forward reaction reduces the number of gas moles, so pressure does favour SO₃, but the equilibrium conversion is already high at about 1–2 atm, so costly high-pressure plant is not justified — option (@K).',
  d: 3, c: 'analysis', t: [4],
}));
add('ester-mcq', mcq({
  stem: String.raw`A laboratory prepares ethyl ethanoate from ethanoic acid and ethanol, $\ce{CH3COOH + C2H5OH <=> CH3COOC2H5 + H2O}$. The maximum yield of ester is obtained by:`,
  right: 'using an excess of ethanol and adding concentrated sulphuric acid, which removes water and acts as a catalyst',
  wrong: ['using an excess of water and dilute sulphuric acid as catalyst', 'raising the pressure of the mixture to 200 atm', 'using equal amounts of the reactants and adding a catalyst of iron'],
  sol: 'Excess reactant and removal of a product (water, taken up by conc. H₂SO₄) shift the equilibrium forward. The reaction has Δn_g = 0 and takes place in the liquid phase, so pressure has no effect — option (@K).',
  d: 3, c: 'application', t: [4],
}));
add('n2o4-tf', tf({
  stem: String.raw`The yield of $\ce{NO2}$ from $\ce{N2O4(g) <=> 2NO2(g)}$, $\Delta H = +57.2$ kJ, is greatest at high temperature and low pressure.`,
  key: 't',
  sol: 'True. The forward reaction is endothermic (favoured by high temperature) and increases the number of moles of gas (favoured by low pressure).',
  d: 2, c: 'application', t: [4],
}));
add('haber-short2', short({
  marks: 2,
  stem: 'In the Haber process the gases leaving the reactor are cooled so that ammonia liquefies and is taken out, and the unreacted nitrogen and hydrogen are recycled. Why is this done?',
  model: 'Ammonia liquefies at a much higher temperature than nitrogen and hydrogen, so cooling removes it. Removing the product lowers its concentration and shifts the equilibrium forward (Le Chatelier), so more ammonia can form from the recycled gases, and the overall conversion is high.',
  sol: 'Removing NH₃ shifts equilibrium forward; recycling raises overall conversion.',
  scheme: [['NH₃ removed by liquefaction', 1], ['Shift forward by Le Chatelier; recycling gives high overall yield', 1]],
  d: 3, c: 'application', t: [4],
}));
add('n2o4cond-short2', short({
  marks: 2,
  stem: String.raw`State the temperature and pressure conditions that give the maximum dissociation of $\ce{N2O4}$ into $\ce{NO2}$ and justify them.`,
  model: 'High temperature, because the dissociation N₂O₄ ⇌ 2NO₂ is endothermic (ΔH = +57.2 kJ), and low pressure, because the dissociation increases the number of moles of gas from 1 to 2.',
  sol: 'High temperature (endothermic) and low pressure (more gas moles).',
  scheme: [['High temperature with reason', 1], ['Low pressure with reason', 1]],
  d: 2, c: 'application', t: [4],
}));
add('contact-short3', short({
  marks: 3,
  stem: String.raw`Justify the choice of temperature, pressure and catalyst in the conversion of $\ce{SO2}$ to $\ce{SO3}$ in the contact process, $\ce{2SO2(g) + O2(g) <=> 2SO3(g)}$, $\Delta H = -196$ kJ.`,
  model: 'Temperature about 720–725 K: the reaction is exothermic, so a low temperature gives a higher equilibrium yield, but too low a temperature makes the reaction too slow; this is the compromise. Pressure about 1–2 atm: the forward reaction reduces the moles of gas, so pressure favours SO₃, but the conversion is already high near atmospheric pressure, so high pressure is not needed. Catalyst: vanadium(V) oxide, V₂O₅, speeds up the approach to equilibrium without changing the equilibrium yield.',
  sol: 'About 720 K (compromise), 1–2 atm (high conversion already), V₂O₅ catalyst.',
  scheme: [['Temperature: exothermic reaction, compromise with rate', 1], ['Pressure: favoured but not needed', 1], ['V₂O₅ catalyst speeds up the rate only', 1]],
  d: 3, c: 'analysis', t: [4],
}));
add('haber-short3', short({
  marks: 3,
  stem: 'Explain why very low temperatures are not used in the manufacture of ammonia although the reaction is exothermic, and name the catalyst that makes the chosen temperature workable.',
  model: 'Low temperature gives a higher equilibrium yield of ammonia because the reaction N₂ + 3H₂ ⇌ 2NH₃ is exothermic (ΔH = −92.4 kJ), but the rate becomes far too slow to be useful, since few molecules have the activation energy. A moderately high temperature, about 700–720 K, gives an acceptable rate, and finely divided iron with molybdenum as promoter is used to increase the rate further without a higher temperature. The poorer yield at this temperature is offset by a pressure of about 200 atm and by removing ammonia and recycling the gases.',
  sol: 'Rate too slow at low T; compromise about 700 K; Fe with Mo catalyst; 200 atm offsets the yield.',
  scheme: [['Low T gives better yield but too slow a rate', 1], ['Compromise temperature with iron and molybdenum catalyst', 1], ['High pressure and recycling offset the lower yield', 1]],
  d: 3, c: 'analysis', t: [4],
}));
add('haber-long', long({
  stem: String.raw`Ammonia is made by $\ce{N2(g) + 3H2(g) <=> 2NH3(g)}$, $\Delta H = -92.4$ kJ.

(a) Write the expression for $K_p$ and state its unit. [1]

(b) Using Le Chatelier's principle, state the effect of temperature and of pressure on the equilibrium yield. [2]

(c) State the conditions used in industry and explain how they give a good yield at a good rate. [2]`,
  model: String.raw`(a) $K_p = \dfrac{p_{\text{NH}_3}^2}{p_{\text{N}_2}\,p_{\text{H}_2}^3}$, unit atm⁻².

(b) The forward reaction is exothermic, so a lower temperature gives a higher yield (K increases). It reduces the moles of gas (4 → 2), so a higher pressure gives a higher yield.

(c) About 200 atm and about 700–720 K, with finely divided iron and a molybdenum promoter; the unreacted gases are recycled and ammonia is liquefied and removed. A very low temperature would be too slow, so a moderate temperature is a compromise and the catalyst gives a useful rate; the high pressure raises the yield; removing ammonia shifts the equilibrium forward.`,
  sol: 'Kp = p(NH₃)² / (p(N₂)p(H₂)³), atm⁻²; low T and high P favour yield; industry uses about 200 atm and 700 K with Fe-Mo.',
  scheme: [['(a) K_p expression with unit atm⁻²', 1], ['(b) Low temperature favours the exothermic forward reaction', 1], ['(b) High pressure favours fewer moles of gas', 1], ['(c) Conditions: about 200 atm, about 700 K, Fe with Mo', 1], ['(c) Compromise explained; ammonia removal and recycling', 1]],
  d: 3, c: 'analysis', t: [4],
}));
add('ester-long', long({
  stem: String.raw`Ethyl ethanoate is made from, and hydrolysed back to, ethanoic acid and ethanol: $\ce{CH3COOC2H5 + H2O <=> CH3COOH + C2H5OH}$.

(a) Write the expression for $K_c$ for the hydrolysis (reverse of esterification). [1]

(b) State two ways of increasing the yield of ester in the esterification, with reasons. [2]

(c) State two ways of increasing the yield of ethanoic acid in the hydrolysis, and explain why changing the pressure has no effect on either reaction. [2]`,
  model: String.raw`(a) $K_c = \dfrac{[\text{CH}_3\text{COOH}][\text{C}_2\text{H}_5\text{OH}]}{[\text{CH}_3\text{COOC}_2\text{H}_5][\text{H}_2\text{O}]}$.

(b) Use an excess of one reactant (ethanol), which shifts the equilibrium forward; remove water with concentrated sulphuric acid, or distil off the ester as it forms, so that the equilibrium shifts forward.

(c) Use a large excess of water, and remove ethanoic acid or ethanol as it forms (with dilute acid as catalyst to reach equilibrium sooner). Pressure has no effect because the reaction is in the liquid phase and the number of moles of gas does not change (Δn_g = 0).`,
  sol: 'K_c for hydrolysis; excess reactant and removal of product; excess water; no pressure effect (liquid phase, Δn_g = 0).',
  scheme: [['(a) Correct K_c expression', 1], ['(b) Excess alcohol with reason', 1], ['(b) Removal of water or ester with reason', 1], ['(c) Excess water or removal of a product', 1], ['(c) No pressure effect, with reason', 1]],
  d: 3, c: 'application', t: [4],
}));
