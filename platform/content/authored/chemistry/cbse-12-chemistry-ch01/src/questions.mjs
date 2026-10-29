// ch01 Solutions — question bank. MCQ keys are placed by the builder (balanced); AR keys planned: a a b c c d.
// Every numerical is re-solved by the check function passed to add().
import { mk, add, r } from './lib.mjs';

const { mcq, ar, tf, fill, match, num, short, long, part } = mk;
const near = (a, b, rel = 0.005) => Math.abs(a - b) <= Math.max(1e-9, Math.abs(b) * rel);
const KF_W = 1.86;
const KB_W = 0.52;
const KF_BZ = 5.12;
const R = 0.083;

// ---------------------------------------------------------------- t01 concentration
add('temp-indep-mcq', mcq({
  stem: 'A solution is prepared at 20 °C and used later at 40 °C. Which way of expressing its concentration does **not** change between the two temperatures?',
  right: 'Molality',
  wrong: ['Molarity', 'Mass by volume percentage', 'Volume percentage'],
  sol: 'Molality uses the mass of the solvent, and mass does not change with temperature — option (@K). Molarity (@1), mass by volume percentage (@2) and volume percentage (@3) all use a volume, and the volume of a liquid increases on warming.',
  d: 1, c: 'understanding', t: [1],
}));
add('molality-def-mcq', mcq({
  stem: r`$5.85\ \text{g}$ of sodium chloride ($M = 58.5\ \text{g mol}^{-1}$) is dissolved in $500\ \text{g}$ of water. The molality of the solution is:`,
  right: r`$0.2\ \text{mol kg}^{-1}$`,
  wrong: [r`$0.1\ \text{mol kg}^{-1}$`, r`$0.0117\ \text{mol kg}^{-1}$`, r`$2.0\ \text{mol kg}^{-1}$`],
  sol: r`Moles of NaCl $= \dfrac{5.85}{58.5} = 0.1$. Molality $= \dfrac{0.1}{0.500} = 0.2$, so $0.2\ \text{mol kg}^{-1}$ — option (@K). Option (@1) forgets to divide by the mass in kg, (@2) divides grams by grams, and (@3) divides by 0.05 instead of 0.5.`,
  d: 2, c: 'understanding', t: [1],
}), () => near(5.85 / 58.5 / 0.5, 0.2) || 'molality');
add('mole-fraction-mcq', mcq({
  stem: r`A mixture is made from $16\ \text{g}$ of methanol ($\ce{CH3OH}$, $M = 32\ \text{g mol}^{-1}$) and $36\ \text{g}$ of water. The mole fraction of methanol is:`,
  right: r`$0.20$`,
  wrong: [r`$0.25$`, r`$0.80$`, r`$0.31$`],
  sol: r`Moles of methanol $= \dfrac{16}{32} = 0.5$; moles of water $= \dfrac{36}{18} = 2$. $x = \dfrac{0.5}{2.5} = 0.20$ — option (@K). (@1) divides 0.5 by 2 (water only); (@2) is the mole fraction of water; (@3) is the mass fraction $\dfrac{16}{52} \approx 0.31$.`,
  d: 2, c: 'understanding', t: [1],
}), () => near(0.5 / 2.5, 0.2) || 'x');
add('ppm-mcq', mcq({
  stem: r`A $2\ \text{kg}$ sample of well water contains $3\ \text{mg}$ of fluoride ions. Its fluoride content in ppm (by mass) is:`,
  right: '1.5 ppm',
  wrong: ['3 ppm', '0.15 ppm', '1500 ppm'],
  sol: r`ppm $= \dfrac{\text{mass of fluoride}}{\text{mass of sample}} \times 10^{6}$. $\dfrac{3 \times 10^{-3}}{2000} \times 10^{6} = 1.5$, so 1.5 ppm — option (@K). (@1) ignores the 2 kg; (@2) and (@3) slip powers of ten in the mg-to-g or kg-to-g conversions.`,
  d: 2, c: 'application', t: [1],
}), () => near((3e-3 / 2000) * 1e6, 1.5) || 'ppm');
add('molarity-dilution-mcq', mcq({
  stem: r`$50\ \text{mL}$ of $2\ \text{M}$ hydrochloric acid is diluted with water to a final volume of $250\ \text{mL}$. The molarity of the diluted acid is:`,
  right: r`$0.4\ \text{M}$`,
  wrong: [r`$10\ \text{M}$`, r`$0.5\ \text{M}$`, r`$1.6\ \text{M}$`],
  sol: r`Moles of HCl do not change on dilution: $M_1V_1 = M_2V_2$, so $M_2 = \dfrac{2 \times 50}{250} = 0.4$ — option (@K). (@1) inverts the volume ratio, (@2) uses 200 mL of added water as the final volume, and (@3) subtracts 0.4 from 2.`,
  d: 2, c: 'application', t: [1],
}), () => near((2 * 50) / 250, 0.4) || 'dilution');
add('molarity-temp-ar', ar({
  a: 'The molarity of an aqueous solution decreases slightly when it is warmed.',
  r: 'On warming, the volume of the solution increases while the number of moles of solute stays the same.',
  key: 'a',
  sol: 'Both are true. Molarity is moles per litre of solution; warming expands the liquid, so the same moles are spread over a larger volume and the molarity falls. R explains A — option (a).',
  d: 2, c: 'understanding', t: [1],
}));
add('molality-mf-ar', ar({
  a: 'The molality of a solution does not change with temperature.',
  r: 'The mole fraction of a component in a solution does not change with temperature.',
  key: 'b',
  sol: 'Both statements are true, since both quantities are built from masses (moles) only. But the reason molality is constant is that it uses the mass of the solvent, not the fact that mole fraction is constant; R is a separate true fact — option (b).',
  d: 3, c: 'understanding', t: [1],
}));
add('molality-solution-tf', tf({
  stem: 'Molality is the number of moles of solute dissolved in one kilogram of the solution.',
  key: 'f',
  sol: 'False. Molality is moles of solute per kilogram of the **solvent**, not of the solution.',
  d: 1, c: 'recall', t: [1],
}));
add('molarity-num', num({
  stem: r`$4.0\ \text{g}$ of sodium hydroxide ($M = 40\ \text{g mol}^{-1}$) is dissolved in water and the solution is made up to $250\ \text{mL}$. Find its molarity in $\text{mol L}^{-1}$.`,
  value: 0.4, tol: 0.005, unit: 'mol L⁻¹',
  sol: r`Step 1 — Moles of NaOH $= \dfrac{4.0}{40} = 0.1$.

Step 2 — Volume $= 0.250\ \text{L}$, so molarity $= \dfrac{0.1}{0.250} = 0.4$, that is $0.4\ \text{mol L}^{-1}$.`,
  scheme: [['Moles of NaOH = 0.1', 0.5], ['Divides by 0.250 L to get 0.4 M', 0.5]],
  d: 1, c: 'understanding', t: [1],
}), () => near(4 / 40 / 0.25, 0.4) || 'M');
add('molality-num', num({
  marks: 2,
  stem: r`A coolant is made by dissolving $6.2\ \text{g}$ of ethylene glycol ($\ce{C2H6O2}$) in $200\ \text{g}$ of water. Find the molality of the solution in $\text{mol kg}^{-1}$. (C = 12, H = 1, O = 16)`,
  value: 0.5, tol: 0.005, unit: 'mol kg⁻¹',
  sol: r`Step 1 — Molar mass of $\ce{C2H6O2}$ $= 2 \times 12 + 6 \times 1 + 2 \times 16 = 62$, in $\text{g mol}^{-1}$.

Step 2 — Moles $= \dfrac{6.2}{62} = 0.1$.

Step 3 — Molality $= \dfrac{0.1}{0.200} = 0.5$, that is $0.5\ \text{mol kg}^{-1}$.`,
  scheme: [['Molar mass 62 g/mol', 0.5], ['Moles = 0.1', 0.5], ['Molality = 0.1 ÷ 0.200 kg = 0.5 mol/kg', 1]],
  d: 2, c: 'understanding', t: [1],
}), () => near(6.2 / (2 * 12 + 6 + 32) / 0.2, 0.5) || 'm');
add('mass-pct-short', short({
  marks: 2, wl: null,
  stem: 'A sample of a hand-rub liquid is 46% ethanol ($\\ce{C2H5OH}$) by mass in water. Find the mole fraction of ethanol in it.',
  model: r`Take $100\ \text{g}$ of the liquid: $46\ \text{g}$ ethanol and $54\ \text{g}$ water.

Moles of ethanol $= \dfrac{46}{46} = 1$; moles of water $= \dfrac{54}{18} = 3$.

$x_\text{ethanol} = \dfrac{1}{1 + 3} = 0.25$.`,
  sol: 'Assume 100 g of liquid, convert each mass to moles, then divide the ethanol moles by the total.',
  scheme: [['Moles of ethanol (1) and of water (3) from 100 g', 1], ['Mole fraction = 0.25', 1]],
  d: 2, c: 'application', t: [1],
}), () => near(1 / (1 + 54 / 18), 0.25) || 'x');
add('molarity-molality-short', short({
  marks: 2,
  stem: 'Why is molality preferred to molarity for expressing concentration in experiments on boiling and freezing points?',
  model: 'Molarity uses the volume of the solution, and volume changes when a liquid is heated or cooled, so molarity changes with temperature. Molality uses the mass of the solvent, which does not change, so it stays constant over the temperature range of such experiments.',
  sol: 'Contrast the volume basis of molarity with the mass basis of molality.',
  scheme: [['Molarity depends on volume, which changes with temperature', 1], ['Molality depends on mass, which does not', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('urea-short3', short({
  marks: 3, wl: null,
  stem: r`A fertiliser solution is $15\%$ urea ($\ce{NH2CONH2}$, $M = 60\ \text{g mol}^{-1}$) by mass and has a density of $1.05\ \text{g mL}^{-1}$. Calculate (a) its molality, (b) its molarity and (c) the mole fraction of urea.`,
  model: r`Take $100\ \text{g}$ of solution: $15\ \text{g}$ urea $= \dfrac{15}{60} = 0.25\ \text{mol}$; water $= 85\ \text{g} \approx 4.72\ \text{mol}$.

(a) Molality $= \dfrac{0.25}{0.085} \approx 2.94\ \text{mol kg}^{-1}$.

(b) Volume $= \dfrac{100}{1.05} \approx 95.2\ \text{mL}$; molarity $= \dfrac{0.25}{0.0952} \approx 2.63\ \text{mol L}^{-1}$.

(c) $x_\text{urea} = \dfrac{0.25}{0.25 + 4.72} \approx 0.050$.`,
  sol: 'Assume 100 g of solution; use the solvent mass for molality, density for the volume and total moles for the mole fraction.',
  scheme: [['(a) Molality ≈ 2.94 mol/kg (uses 85 g of water)', 1], ['(b) Volume from density, molarity ≈ 2.63 M', 1], ['(c) Mole fraction ≈ 0.050', 1]],
  d: 3, c: 'application', t: [1],
}), () => (near(0.25 / 0.085, 2.94, 0.002) && near(0.25 / (100 / 1.05 / 1000), 2.63, 0.002) && near(0.25 / (0.25 + 85 / 18), 0.0503, 0.01)) || 'urea');
add('conc-match', match({
  stem: 'Match each concentration term with its definition.',
  pairs: [
    ['Molarity', 'Moles of solute per litre of solution'],
    ['Molality', 'Moles of solute per kilogram of solvent'],
    ['Mole fraction', 'Moles of a component divided by total moles'],
    ['Parts per million', 'Parts of a component per $10^{6}$ parts of solution'],
  ],
  order: [2, 0, 3, 1],
  sol: 'Molarity uses litres of solution, molality uses kilograms of solvent, mole fraction is a ratio of moles, and ppm compares parts with a million parts.',
  d: 1, c: 'recall', t: [1],
}));

// ---------------------------------------------------------------- t02 solubility and Henry's law
add('kh-order-mcq', mcq({
  stem: r`Henry’s law constants in water at the same temperature are: gas P $= 0.5\ \text{kbar}$, gas Q $= 30\ \text{kbar}$, gas R $= 75\ \text{kbar}$, gas S $= 145\ \text{kbar}$. At the same partial pressure, which gas is **least** soluble?`,
  right: 'S',
  wrong: ['P', 'Q', 'R'],
  sol: r`From $p = K_\text{H}\,x$, $x = \dfrac{p}{K_\text{H}}$: at equal $p$ the largest $K_\text{H}$ gives the smallest mole fraction. S has the largest constant — option (@K). P (@1) is the most soluble.`,
  d: 2, c: 'understanding', t: [2],
}));
add('gas-temp-mcq', mcq({
  stem: 'On a hot afternoon, fish in a shallow pond swim near the surface and gulp air. The best explanation is that:',
  right: 'the solubility of oxygen in water falls as the temperature rises',
  wrong: ['the solubility of oxygen in water rises as the temperature rises', 'warm water has a higher Henry’s law constant for oxygen, so it holds more oxygen', 'the partial pressure of oxygen in the air falls in the afternoon'],
  sol: r`Dissolving a gas releases heat, and $K_\text{H}$ increases with temperature, so warm water holds less oxygen — option (@K). (@1) reverses the trend; (@2) wrongly links a higher $K_\text{H}$ to higher solubility; (@3) is not true — the air’s oxygen content does not change.`,
  d: 2, c: 'application', t: [2],
}));
add('solid-endo-mcq', mcq({
  stem: 'Dissolving salt X in water absorbs heat, while dissolving salt Y releases heat. What happens to their solubilities when the temperature of the water is raised?',
  right: 'Solubility of X increases; solubility of Y decreases.',
  wrong: ['Both increase.', 'Solubility of X decreases; solubility of Y increases.', 'Neither changes, because pressure is constant.'],
  sol: 'By Le Chatelier’s principle, heating favours the direction that absorbs heat. For X dissolving absorbs heat, so more dissolves; for Y dissolving releases heat, so less dissolves — option (@K).',
  d: 3, c: 'application', t: [2],
}));
add('diver-mcq', mcq({
  stem: 'Why do the air tanks of deep-sea divers contain air diluted with helium?',
  right: 'Helium is much less soluble in blood than nitrogen, so fewer bubbles form when the diver rises.',
  wrong: ['Helium makes the air denser, so the diver sinks faster.', 'Helium reacts with nitrogen to remove it from the blood.', 'Helium is more soluble than nitrogen and dissolves instead of it.'],
  sol: 'Under high pressure, nitrogen dissolves in the blood and bubbles out on rapid ascent (the bends). Helium has a very large Henry’s constant, so little of it dissolves — option (@K). Helium is unreactive (@2), less dense (@1) and less soluble, not more (@3).',
  d: 2, c: 'understanding', t: [2],
}));
add('henry-temp-ar', ar({
  a: 'Aquatic animals are more comfortable in cold water than in warm water.',
  r: 'The Henry’s law constant of oxygen in water decreases as the temperature rises.',
  key: 'c',
  sol: 'A is true: cold water holds more dissolved oxygen. R is false: $K_\\text{H}$ **increases** with temperature, which is why oxygen is less soluble in warm water — option (c).',
  d: 3, c: 'understanding', t: [2],
}));
add('bends-fill', fill({
  stem: 'The painful condition caused when nitrogen dissolved in a diver’s blood forms bubbles during a rapid ascent is called the ___.',
  acc: [['bends', 'the bends']],
  sol: 'Rapid fall in pressure lets dissolved nitrogen escape as bubbles in the blood: the **bends**.',
  d: 1, c: 'recall', t: [2],
}));
add('henry-pressure-num', num({
  stem: r`What partial pressure of carbon dioxide, in **bar**, is needed above water at $298\ \text{K}$ for the mole fraction of dissolved $\ce{CO2}$ to be $1.0 \times 10^{-3}$? ($K_\text{H} = 1.67\ \text{kbar}$)`,
  value: 1.67, tol: 0.01, unit: 'bar',
  sol: r`Step 1 — $K_\text{H} = 1.67\ \text{kbar} = 1670\ \text{bar}$.

Step 2 — $p = K_\text{H}\,x = 1670 \times 1.0 \times 10^{-3} = 1.67$, so the pressure is $1.67\ \text{bar}$.`,
  scheme: [['Converts kbar to bar and uses p = KH x', 0.5], ['p = 1.67 bar', 0.5]],
  d: 2, c: 'understanding', t: [2],
}), () => near(1670 * 1e-3, 1.67) || 'p');
add('henry-applications-short', short({
  marks: 2,
  stem: 'Use Henry’s law to explain (a) why a cold drink bottle fizzes when it is opened, and (b) why climbers at high altitude can feel weak and confused.',
  model: '(a) The drink is sealed under a high pressure of carbon dioxide, so much gas is dissolved. Opening the bottle lowers the pressure, the solubility falls and the extra gas escapes as bubbles. (b) At high altitude the partial pressure of oxygen is low, so less oxygen dissolves in the blood (anoxia).',
  sol: 'Link each effect to a change in partial pressure, which changes the amount of gas dissolved.',
  scheme: [['(a) Pressure falls on opening, so dissolved CO₂ comes out', 1], ['(b) Low partial pressure of oxygen, less dissolves in blood', 1]],
  d: 2, c: 'application', t: [2],
}));
add('solid-temp-short', short({
  marks: 2,
  stem: 'A student says, "Heating always increases the solubility of a solid in water." Is the student right? Explain.',
  model: 'Not always. If dissolving absorbs heat, raising the temperature increases solubility. If dissolving releases heat, raising the temperature shifts the equilibrium back towards the solid, so solubility decreases. The effect depends on the enthalpy of solution, by Le Chatelier’s principle.',
  sol: 'The direction depends on whether dissolving is endothermic or exothermic.',
  scheme: [['States the claim is not always true', 0.5], ['Endothermic: increases; exothermic: decreases, with Le Chatelier', 1.5]],
  d: 3, c: 'evaluation', t: [2],
}));
add('oxygen-short3', short({
  marks: 3, wl: null,
  stem: r`Air at sea level has an oxygen partial pressure of $0.21\ \text{bar}$; at a hill station it is about $0.16\ \text{bar}$. $K_\text{H}$ for oxygen in water is $34.86\ \text{kbar}$ (take it as the same at both places). (a) Find the mole fraction of oxygen in water at sea level. (b) How many millimoles of oxygen dissolve in $1\ \text{L}$ ($1000\ \text{g}$) of water at sea level? (c) By what percentage is the dissolved oxygen lower at the hill station?`,
  model: r`(a) $x = \dfrac{p}{K_\text{H}} = \dfrac{0.21}{34860} \approx 6.02 \times 10^{-6}$.

(b) Moles of water $= \dfrac{1000}{18} \approx 55.6$; $n_{\ce{O2}} \approx 6.02 \times 10^{-6} \times 55.6 \approx 3.35 \times 10^{-4}\ \text{mol} \approx 0.335\ \text{mmol}$.

(c) Dissolved oxygen is proportional to $p$: fall $= \dfrac{0.21 - 0.16}{0.21} \times 100 \approx 23.8\%$ lower.`,
  sol: 'Use x = p/KH with p and KH in bar, multiply by the moles of water, then compare the two pressures.',
  scheme: [['(a) x ≈ 6.0 × 10⁻⁶ with units matched', 1], ['(b) ≈ 0.335 mmol', 1], ['(c) ≈ 24% lower, since x ∝ p', 1]],
  d: 4, c: 'application', t: [2],
}), () => (near(0.21 / 34860, 6.02e-6, 0.002) && near((0.21 / 34860) * (1000 / 18) * 1000, 0.335, 0.003) && near((0.05 / 0.21) * 100, 23.8, 0.002)) || 'oxygen');

// ---------------------------------------------------------------- t03 Raoult's law, deviations, azeotropes
add('deviation-sign-mcq', mcq({
  stem: 'Two liquids warm up when they are mixed, and the volume of the mixture is slightly less than the sum of their separate volumes. The solution:',
  right: 'shows negative deviation from Raoult’s law',
  wrong: ['shows positive deviation from Raoult’s law', 'is an ideal solution', 'must form a minimum-boiling azeotrope'],
  sol: r`Warming means $\Delta_\text{mix}H < 0$ and contraction means $\Delta_\text{mix}V < 0$: new A–B attractions are stronger, molecules escape less easily and the vapour pressure is lower than predicted — option (@K). An ideal solution (@2) has no heat or volume change; a minimum-boiling azeotrope (@3) comes from positive deviation (@1).`,
  d: 2, c: 'application', t: [3],
}));
add('ideal-pair-mcq', mcq({
  stem: 'Which pair of liquids forms a solution that is very nearly ideal?',
  right: 'n-Hexane and n-heptane',
  wrong: ['Chloroform and acetone', 'Ethanol and acetone', 'Nitric acid and water'],
  sol: 'n-Hexane and n-heptane are similar non-polar molecules, so A–B attractions match A–A and B–B attractions — option (@K). Chloroform–acetone (@1) and nitric acid–water (@3) show negative deviation; ethanol–acetone (@2) shows positive deviation.',
  d: 1, c: 'recall', t: [3],
}));
add('vapour-rich-mcq', mcq({
  stem: 'An ideal solution of liquids A and B is in equilibrium with its vapour. Pure A is more volatile than pure B. Which statement is correct?',
  right: 'The mole fraction of A is larger in the vapour than in the liquid.',
  wrong: ['The vapour and the liquid have the same composition.', 'The mole fraction of A is smaller in the vapour than in the liquid.', 'The vapour contains only A.'],
  sol: r`$y_\text{A} = \dfrac{p^\circ_\text{A} x_\text{A}}{p_\text{total}}$, and $p^\circ_\text{A}$ is greater than $p_\text{total}$ because A is the more volatile component, so $y_\text{A} > x_\text{A}$ — option (@K). Equal compositions (@1) occur only at an azeotrope, which an ideal solution never forms.`,
  d: 3, c: 'application', t: [3],
}));
add('azeotrope-mcq', mcq({
  stem: 'Rectified spirit (about 95% ethanol) cannot be turned into pure ethanol by fractional distillation because:',
  right: 'it is a minimum-boiling azeotrope, whose vapour has the same composition as the liquid',
  wrong: ['it is a maximum-boiling azeotrope caused by negative deviation', 'ethanol and water have the same boiling point', 'ethanol and water form an ideal solution'],
  sol: 'Ethanol and water show large positive deviation and form a minimum-boiling azeotrope at about 95% ethanol; at that composition the vapour matches the liquid, so distillation cannot separate them — option (@K). The boiling points differ (@2), the solution is not ideal (@3), and the deviation is positive (@1).',
  d: 2, c: 'understanding', t: [3],
}));
add('raoult-calc-mcq', mcq({
  stem: r`Liquids A ($p^\circ = 24\ \text{kPa}$) and B ($p^\circ = 56\ \text{kPa}$) form an ideal solution. For an equimolar liquid mixture, the mole fraction of B in the vapour is:`,
  right: r`$0.70$`,
  wrong: [r`$0.50$`, r`$0.30$`, r`$0.56$`],
  sol: r`$p_\text{A} = 24 \times 0.5 = 12$, $p_\text{B} = 56 \times 0.5 = 28$, total $40\ \text{kPa}$. $y_\text{B} = \dfrac{28}{40} = 0.70$ — option (@K). (@1) is the liquid composition; (@2) is $y_\text{A}$; (@3) copies the vapour pressure of B.`,
  d: 3, c: 'application', t: [3],
}), () => near((56 * 0.5) / (24 * 0.5 + 56 * 0.5), 0.7) || 'y');
add('ideal-ar', ar({
  a: 'A mixture of chloroform and acetone shows positive deviation from Raoult’s law.',
  r: 'Chloroform molecules form hydrogen bonds with acetone molecules.',
  key: 'd',
  sol: 'R is true: the C–H of chloroform hydrogen-bonds to the oxygen of acetone. These new attractions are stronger, so the mixture shows **negative** deviation; A is false — option (d).',
  d: 3, c: 'understanding', t: [3],
}));
add('raoult-special-tf', tf({
  stem: 'Raoult’s law is a special case of Henry’s law in which the Henry’s law constant equals the vapour pressure of the pure component.',
  key: 't',
  sol: r`True. Both laws have the form $p = (\text{constant}) \times x$; in Raoult’s law the constant is $p^\circ$.`,
  d: 2, c: 'understanding', t: [3],
}));
add('azeo-fill', fill({
  stem: 'A solution showing large negative deviation from Raoult’s law forms a ___-boiling azeotrope.',
  acc: [['maximum', 'maximum boiling', 'high']],
  sol: 'Negative deviation lowers the vapour pressure, so the mixture boils at a temperature above both components: a **maximum**-boiling azeotrope.',
  d: 2, c: 'recall', t: [3],
}));
add('deviation-match', match({
  stem: 'Match each mixture with its behaviour.',
  pairs: [
    ['n-Hexane + n-heptane', 'Nearly ideal'],
    ['Ethanol + acetone', 'Positive deviation'],
    ['Chloroform + acetone', 'Negative deviation through hydrogen bonding'],
    ['Nitric acid (about 68%) + water', 'Maximum-boiling azeotrope'],
  ],
  order: [1, 3, 0, 2],
  sol: 'Similar alkanes are nearly ideal; acetone breaks the hydrogen bonds of ethanol (positive); chloroform hydrogen-bonds to acetone (negative); nitric acid and water form a maximum-boiling azeotrope.',
  d: 2, c: 'understanding', t: [3],
}));
add('raoult-num', num({
  marks: 2,
  stem: r`$2\ \text{mol}$ of liquid A ($p^\circ = 40\ \text{kPa}$) is mixed with $3\ \text{mol}$ of liquid B ($p^\circ = 90\ \text{kPa}$) to form an ideal solution. Find the total vapour pressure in **kPa**.`,
  value: 70, tol: 0.1, unit: 'kPa',
  sol: r`Step 1 — $x_\text{A} = \dfrac{2}{5} = 0.4$, $x_\text{B} = 0.6$.

Step 2 — $p_\text{A} = 40 \times 0.4 = 16$; $p_\text{B} = 90 \times 0.6 = 54$.

Step 3 — Total $= 16 + 54 = 70$, so $70\ \text{kPa}$.`,
  scheme: [['Mole fractions 0.4 and 0.6', 0.5], ['Partial pressures 16 and 54 kPa', 1], ['Total 70 kPa', 0.5]],
  d: 2, c: 'application', t: [3],
}), () => near(40 * 0.4 + 90 * 0.6, 70) || 'p');
add('ideal-nonideal-short', short({
  marks: 2,
  stem: 'Give two differences between an ideal solution and a non-ideal solution showing positive deviation.',
  model: r`An ideal solution obeys Raoult’s law at every composition, while a positive-deviation solution has a vapour pressure higher than predicted. For an ideal solution $\Delta_\text{mix}H = 0$ and $\Delta_\text{mix}V = 0$; for positive deviation both are positive, because A–B attractions are weaker than A–A and B–B.`,
  sol: 'Compare obedience to Raoult’s law and the signs of the enthalpy and volume of mixing.',
  scheme: [['Difference 1: Raoult’s law obeyed vs vapour pressure higher', 1], ['Difference 2: ΔmixH and ΔmixV zero vs positive (weaker A–B forces)', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('deviation-explain-short3', short({
  marks: 3,
  stem: 'Explain, in terms of intermolecular attractions, why (a) a mixture of ethanol and acetone shows positive deviation, and (b) a mixture of chloroform and acetone shows negative deviation. (c) State the sign of the enthalpy of mixing in each case.',
  model: '(a) Pure ethanol is held together by hydrogen bonds. Acetone molecules come between ethanol molecules and break some of these bonds, and the new ethanol–acetone attractions are weaker, so molecules escape more easily and the vapour pressure is higher than predicted. (b) Chloroform’s hydrogen forms a hydrogen bond with acetone’s oxygen; these new attractions are stronger, so molecules escape less easily. (c) Ethanol + acetone: positive (heat absorbed); chloroform + acetone: negative (heat released).',
  sol: 'Weaker A–B attraction means positive deviation and endothermic mixing; stronger means negative deviation and exothermic mixing.',
  scheme: [['(a) Acetone breaks ethanol’s hydrogen bonds, weaker A–B attractions', 1], ['(b) New hydrogen bonds between chloroform and acetone, stronger attractions', 1], ['(c) Positive for ethanol + acetone; negative for chloroform + acetone', 1]],
  d: 3, c: 'understanding', t: [3],
}));

// ---------------------------------------------------------------- t04 colligative properties
add('colligative-def-mcq', mcq({
  stem: 'Which of these is **not** a colligative property?',
  right: 'Vapour pressure of the solution',
  wrong: ['Relative lowering of vapour pressure', 'Depression of freezing point', 'Osmotic pressure'],
  sol: 'The vapour pressure of a solution depends on the nature of the solvent as well, so it is not colligative; the **relative lowering** of vapour pressure depends only on the solute’s mole fraction — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('lowest-fp-mcq', mcq({
  stem: r`Which $0.1\ \text{mol kg}^{-1}$ aqueous solution has the **lowest** freezing point? (Assume complete dissociation of salts.)`,
  right: 'Potassium sulfate',
  wrong: ['Glucose', 'Sodium chloride', 'Urea'],
  sol: r`Depression is proportional to the number of particles, $i\,m$. Glucose and urea give 1 particle ($i = 1$), sodium chloride 2, and potassium sulfate $\ce{K2SO4 -> 2K+ + SO4^2-}$ gives 3, so it shows the largest depression and the lowest freezing point — option (@K).`,
  d: 2, c: 'application', t: [4, 5],
}));
add('hypertonic-mcq', mcq({
  stem: 'A red blood cell is placed in a concentrated salt solution. What happens?',
  right: 'Water leaves the cell by osmosis and the cell shrinks.',
  wrong: ['Water enters the cell and it swells and bursts.', 'Salt enters the cell and it shrinks.', 'Nothing happens, because the cell membrane is semipermeable.'],
  sol: 'The salt solution is hypertonic: water moves from the cell (more dilute inside) to the outside — option (@K). Swelling (@1) happens in a hypotonic solution such as pure water; salt does not cross the membrane (@2); a semipermeable membrane is exactly what allows osmosis (@3).',
  d: 2, c: 'application', t: [4],
}));
add('osmotic-protein-mcq', mcq({
  stem: 'The molar mass of a newly isolated enzyme is best found by measuring:',
  right: 'the osmotic pressure of its dilute solution at room temperature',
  wrong: ['the elevation of boiling point of its aqueous solution', 'the depression of freezing point of its solution in benzene', 'the relative lowering of vapour pressure of its solution'],
  sol: 'Enzymes are damaged by heat, and their huge molar masses give tiny boiling or freezing point changes and vapour pressure lowering. Osmotic pressure is measured at room temperature and is large enough to read even for very dilute solutions — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('kb-units-mcq', mcq({
  stem: r`The SI-based unit of the ebullioscopic constant $K_\text{b}$ is:`,
  right: r`$\text{K kg mol}^{-1}$`,
  wrong: [r`$\text{K mol kg}^{-1}$`, r`$\text{mol kg K}^{-1}$`, r`$\text{K L mol}^{-1}$`],
  sol: r`From $\Delta T_\text{b} = K_\text{b}\,m$, $K_\text{b} = \dfrac{\Delta T_\text{b}}{m}$ has unit $\dfrac{\text{K}}{\text{mol kg}^{-1}} = \text{K kg mol}^{-1}$ — option (@K).`,
  d: 1, c: 'recall', t: [4],
}));
add('colligative-ar', ar({
  a: r`A $0.1\ \text{mol kg}^{-1}$ sodium chloride solution boils at a higher temperature than a $0.1\ \text{mol kg}^{-1}$ glucose solution.`,
  r: 'The elevation of boiling point depends on the chemical nature of the solute.',
  key: 'c',
  sol: 'A is true: sodium chloride gives about twice as many particles. R is false: colligative properties depend on the **number** of particles, not on their nature — option (c).',
  d: 2, c: 'understanding', t: [4, 5],
}));
add('isotonic-tf', tf({
  stem: 'A 0.9% (mass by volume) sodium chloride solution is isotonic with the fluid inside red blood cells.',
  key: 't',
  sol: 'True. This is why “normal saline” drips use about 0.9% sodium chloride; the cells neither shrink nor swell.',
  d: 1, c: 'recall', t: [4],
}));
add('cryo-fill', fill({
  stem: 'The depression of freezing point for a solution of molality one mole per kilogram is called the ___ constant.',
  acc: [['cryoscopic', 'molal depression', 'molal freezing point depression']],
  sol: r`$K_\text{f}$ is the **cryoscopic** (molal depression) constant.`,
  d: 1, c: 'recall', t: [4],
}));
add('semiperm-fill', fill({
  stem: 'A membrane that allows solvent molecules but not solute particles to pass through is called a ___ membrane.',
  acc: [['semipermeable', 'semi-permeable']],
  sol: 'Such a membrane is **semipermeable**; osmosis takes place through it.',
  d: 1, c: 'recall', t: [4],
}));
add('bp-num', num({
  stem: r`$3.0\ \text{g}$ of urea ($M = 60\ \text{g mol}^{-1}$) is dissolved in $250\ \text{g}$ of water. Find the elevation of boiling point in **kelvin**. ($K_\text{b} = 0.52\ \text{K kg mol}^{-1}$)`,
  value: 0.104, tol: 0.001, unit: 'K',
  sol: r`Step 1 — Molality $= \dfrac{3.0/60}{0.250} = 0.2$, in $\text{mol kg}^{-1}$.

Step 2 — $\Delta T_\text{b} = 0.52 \times 0.2 = 0.104$, so the elevation is $0.104\ \text{K}$.`,
  scheme: [['Molality = 0.2 mol/kg', 0.5], ['ΔTb = 0.104 K', 0.5]],
  d: 2, c: 'understanding', t: [4],
}), () => near(KB_W * (3 / 60 / 0.25), 0.104) || 'dTb');
add('fp-molarmass-num', num({
  marks: 2,
  stem: r`$2.5\ \text{g}$ of a non-volatile, non-electrolyte solute dissolved in $100\ \text{g}$ of benzene lowers its freezing point by $0.512\ \text{K}$. Find the molar mass of the solute in $\text{g mol}^{-1}$. ($K_\text{f}$ of benzene $= 5.12\ \text{K kg mol}^{-1}$)`,
  value: 250, tol: 1, unit: 'g mol⁻¹',
  sol: r`Step 1 — $M_2 = \dfrac{K_\text{f} \times 1000 \times w_2}{\Delta T_\text{f} \times w_1}$.

Step 2 — $M_2 = \dfrac{5.12 \times 1000 \times 2.5}{0.512 \times 100} = 250$, so the molar mass is $250\ \text{g mol}^{-1}$.`,
  scheme: [['Correct formula for M₂', 0.5], ['Substitution with masses in grams', 1], ['M₂ = 250 g/mol', 0.5]],
  d: 3, c: 'application', t: [4],
}), () => near((KF_BZ * 1000 * 2.5) / (0.512 * 100), 250) || 'M');
add('osmotic-num', num({
  stem: r`A glucose solution contains $0.02\ \text{mol}$ of glucose per litre. Find its osmotic pressure in **bar** at $300\ \text{K}$. ($R = 0.083\ \text{L bar K}^{-1}\ \text{mol}^{-1}$)`,
  value: 0.498, tol: 0.003, unit: 'bar',
  sol: r`$\pi = CRT = 0.02 \times 0.083 \times 300 = 0.498$, so the osmotic pressure is $0.498\ \text{bar}$.`,
  scheme: [['π = CRT with C = 0.02, T = 300 K, π = 0.498 bar', 1]],
  d: 2, c: 'understanding', t: [4],
}), () => near(0.02 * R * 300, 0.498) || 'pi');
add('kb-define-short', short({
  marks: 2,
  stem: 'Define the molal elevation constant and explain why a solution of a non-volatile solute boils at a higher temperature than the pure solvent.',
  model: 'The molal elevation (ebullioscopic) constant is the elevation of boiling point for a solution of molality one mole per kilogram. The solute lowers the vapour pressure of the solvent, so the solution must be heated to a higher temperature before its vapour pressure equals the atmospheric pressure.',
  sol: 'Define Kb, then link the lower vapour pressure to a higher boiling point.',
  scheme: [['Definition of Kb', 1], ['Lower vapour pressure, reaches atmospheric pressure at a higher temperature', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('hypertonic-short', short({
  marks: 2,
  stem: 'Explain why (a) raw mango slices placed in thick salt solution shrivel, and (b) wilted flowers revive when their stems are placed in fresh water.',
  model: '(a) The salt solution is hypertonic to the mango cells, so water moves out of the cells by osmosis and the slices shrink and shrivel. (b) Fresh water is hypotonic to the cells of the stem and petals, so water enters them by osmosis, the cells become firm again and the flowers revive.',
  sol: 'Water moves by osmosis from the more dilute side into the more concentrated side.',
  scheme: [['(a) Hypertonic outside, water leaves the cells', 1], ['(b) Hypotonic outside, water enters the cells', 1]],
  d: 2, c: 'application', t: [4],
}));
add('rlvp-short3', short({
  marks: 3, wl: null,
  stem: r`At a certain temperature, the vapour pressure of pure water is $3.200\ \text{kPa}$. When $10\ \text{g}$ of a non-volatile, non-electrolyte solute is dissolved in $200\ \text{g}$ of water, the vapour pressure falls to $3.184\ \text{kPa}$. Using the dilute-solution approximation, find the molar mass of the solute.`,
  model: r`Relative lowering $= \dfrac{3.200 - 3.184}{3.200} = 0.005$.

For a dilute solution $\dfrac{\Delta p}{p^\circ} \approx \dfrac{w_2 M_1}{M_2 w_1}$, so $M_2 = \dfrac{w_2 M_1}{w_1 \times 0.005}$.

$M_2 = \dfrac{10 \times 18}{200 \times 0.005} = 180$, so the molar mass is about $180\ \text{g mol}^{-1}$.`,
  sol: 'Relative lowering of vapour pressure equals the mole fraction of the solute; use the dilute form with masses and molar masses.',
  scheme: [['Relative lowering = 0.005', 1], ['Correct dilute-solution relation', 1], ['M₂ = 180 g/mol', 1]],
  d: 3, c: 'application', t: [4],
}), () => near((10 * 18) / (200 * ((3.2 - 3.184) / 3.2)), 180) || 'M');
add('isotonic-short3', short({
  marks: 3, wl: null,
  stem: r`Normal saline contains $9.0\ \text{g}$ of sodium chloride ($M = 58.5\ \text{g mol}^{-1}$) per litre. Assuming complete dissociation, (a) find the total molar concentration of particles, (b) find the mass of glucose ($M = 180\ \text{g mol}^{-1}$) per litre that would give an isotonic solution at the same temperature, and (c) explain why the factor for sodium chloride is taken as 2.`,
  model: r`(a) $\dfrac{9.0}{58.5} \approx 0.154\ \text{mol L}^{-1}$ of NaCl; with $i = 2$, particles $\approx 0.308\ \text{mol L}^{-1}$.

(b) Isotonic solutions have equal $\pi$, so glucose ($i = 1$) must be $0.308\ \text{mol L}^{-1}$: mass $\approx 0.308 \times 180 \approx 55.4\ \text{g}$ per litre (about 5.5% w/v).

(c) Each formula unit gives two ions, $\ce{NaCl -> Na+ + Cl-}$, and osmotic pressure counts particles.`,
  sol: 'Equal osmotic pressure means equal concentration of particles, i × C.',
  scheme: [['(a) 0.154 M NaCl, 0.308 M particles', 1], ['(b) ≈ 55 g of glucose per litre', 1], ['(c) Two ions per formula unit; colligative properties count particles', 1]],
  d: 4, c: 'analysis', t: [4, 5],
}), () => near(2 * (9 / 58.5) * 180, 55.4, 0.003) || 'glucose');

// ---------------------------------------------------------------- t05 van't Hoff factor
add('vant-hoff-ar', ar({
  a: 'The van’t Hoff factor for ethanoic acid dissolved in benzene is less than 1.',
  r: 'In benzene, ethanoic acid molecules pair up into dimers through hydrogen bonding.',
  key: 'a',
  sol: 'Both are true. Dimerisation reduces the number of particles, so the observed colligative effect is smaller than calculated and $i < 1$; R explains A — option (a).',
  d: 2, c: 'understanding', t: [5],
}));
add('vh-k2so4-mcq', mcq({
  stem: 'Assuming complete dissociation, the van’t Hoff factor of potassium sulfate in water is:',
  right: '3',
  wrong: ['2', '7', '1'],
  sol: r`$\ce{K2SO4 -> 2K+ + SO4^2-}$ gives three ions per formula unit, so $i = 3$ — option (@K). (@1) counts kinds of ion, (@2) counts atoms, and (@3) ignores dissociation.`,
  d: 1, c: 'recall', t: [5],
}));
add('abnormal-mass-mcq', mcq({
  stem: r`The molar mass of potassium chloride ($74.5\ \text{g mol}^{-1}$) found from the freezing point of its dilute aqueous solution is close to $40\ \text{g mol}^{-1}$. This is because:`,
  right: 'potassium chloride dissociates into ions, increasing the number of particles',
  wrong: ['potassium chloride associates into pairs, decreasing the number of particles', 'potassium chloride is volatile and escapes from the solution', 'the freezing point method always gives half the true molar mass'],
  sol: r`More particles give a larger depression, which the formula reads as a smaller molar mass: $i \approx \dfrac{74.5}{40} \approx 1.86$, consistent with nearly complete dissociation into two ions — option (@K).`,
  d: 3, c: 'analysis', t: [5],
}));
add('association-i-mcq', mcq({
  stem: 'In benzene, the molar mass of a carboxylic acid found from the depression of freezing point is almost exactly twice the value from its formula. The van’t Hoff factor and the best explanation are:',
  right: '0.5; the acid is almost completely dimerised through hydrogen bonds',
  wrong: ['2; the acid dissociates into two ions in benzene', '0.5; the acid dissociates into two ions in benzene', '2; the acid is almost completely dimerised'],
  sol: r`$i = \dfrac{\text{normal molar mass}}{\text{observed molar mass}} = \dfrac{1}{2} = 0.5$. A value below 1 means fewer particles; for dimers $i = 1 - \dfrac{\alpha}{2}$, so $\alpha \approx 1$ — option (@K). Ions do not form in non-polar benzene, and dissociation would make $i$ greater than 1, not less.`,
  d: 3, c: 'analysis', t: [5],
}));
add('vh-num', num({
  marks: 2,
  stem: r`A $0.10\ \text{mol kg}^{-1}$ aqueous solution of potassium chloride freezes at $-0.348\ ^\circ\text{C}$. Find the van’t Hoff factor. ($K_\text{f} = 1.86\ \text{K kg mol}^{-1}$)`,
  value: 1.87, tol: 0.01, unit: null,
  sol: r`Step 1 — Calculated depression with no dissociation: $1.86 \times 0.10 = 0.186$, in kelvin.

Step 2 — Observed depression $= 0.348\ \text{K}$.

Step 3 — $i = \dfrac{0.348}{0.186} \approx 1.87$.`,
  scheme: [['Calculated ΔTf = 0.186 K', 1], ['i = observed ÷ calculated ≈ 1.87', 1]],
  d: 3, c: 'application', t: [5],
}), () => near(0.348 / (KF_W * 0.1), 1.87, 0.003) || 'i');
add('abnormal-short', short({
  marks: 2,
  stem: 'What is meant by an abnormal molar mass? Name the two processes that cause it and say how each changes the observed molar mass.',
  model: 'An abnormal molar mass is a molar mass found from a colligative property that differs from the formula value. **Dissociation** of the solute into ions increases the number of particles, so the observed molar mass is lower. **Association** of molecules decreases the number of particles, so it is higher.',
  sol: 'Define the term, then link dissociation and association to the change in the number of particles.',
  scheme: [['Definition', 1], ['Dissociation gives lower and association gives higher molar mass', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('vh-alpha-short3', short({
  marks: 3, wl: null,
  stem: r`A $0.010\ \text{mol kg}^{-1}$ aqueous solution of potassium sulfate freezes at $-0.0521\ ^\circ\text{C}$. Calculate (a) the van’t Hoff factor and (b) the degree of dissociation. (c) Why is the degree of dissociation less than 1? ($K_\text{f} = 1.86\ \text{K kg mol}^{-1}$)`,
  model: r`(a) Calculated $\Delta T_\text{f} = 1.86 \times 0.010 = 0.0186\ \text{K}$; $i = \dfrac{0.0521}{0.0186} \approx 2.80$.

(b) $\ce{K2SO4 -> 2K+ + SO4^2-}$, so $n = 3$: $\alpha = \dfrac{2.80 - 1}{3 - 1} = 0.90$.

(c) Oppositely charged ions attract one another and some move together as ion pairs, so the solution behaves as if dissociation were incomplete.`,
  sol: 'Divide observed by calculated depression for i; then use α = (i − 1)/(n − 1) with n = 3.',
  scheme: [['(a) i ≈ 2.80', 1], ['(b) α = 0.90 using n = 3', 1], ['(c) Interionic attraction or ion pairing', 1]],
  d: 4, c: 'application', t: [5],
}), () => near((0.0521 / (KF_W * 0.01) - 1) / 2, 0.9, 0.005) || 'alpha');

// ---------------------------------------------------------------- long answers
add('raoult-long', long({
  wl: null,
  stem: r`(a) State Raoult’s law for a solution of two volatile liquids and derive an expression for the total vapour pressure in terms of the mole fraction of one component.

(b) Sketch the graph of partial and total vapour pressures against composition for an ideal solution.

(c) Liquids X ($p^\circ = 80\ \text{kPa}$) and Y ($p^\circ = 20\ \text{kPa}$) form an ideal solution in which $x_\text{X} = 0.3$. Find the total vapour pressure and the mole fraction of X in the vapour. Comment on your answer.`,
  model: r`(a) For a solution of volatile liquids, the partial vapour pressure of each component is directly proportional to its mole fraction in the solution: $p_1 = p^\circ_1 x_1$, $p_2 = p^\circ_2 x_2$. By Dalton’s law, $p_\text{total} = p^\circ_1 x_1 + p^\circ_2 x_2$; with $x_1 = 1 - x_2$, $p_\text{total} = p^\circ_1 + (p^\circ_2 - p^\circ_1)x_2$.

(b) Mole fraction on the x-axis, vapour pressure on the y-axis: $p_1$ is a straight line falling from $p^\circ_1$ to 0, $p_2$ a straight line rising from 0 to $p^\circ_2$, and $p_\text{total}$ a straight line joining $p^\circ_1$ and $p^\circ_2$.

(c) $p_\text{X} = 80 \times 0.3 = 24\ \text{kPa}$; $p_\text{Y} = 20 \times 0.7 = 14\ \text{kPa}$; total $= 38\ \text{kPa}$. $y_\text{X} = \dfrac{24}{38} \approx 0.63$. The vapour is much richer in X (0.63) than the liquid (0.3), because X is the more volatile liquid.`,
  sol: 'Raoult + Dalton gives the straight-line total pressure; the more volatile component is enriched in the vapour.',
  scheme: [['(a) Statement of Raoult’s law', 1], ['(a) Derivation of the total pressure expression', 1], ['(b) Correctly labelled graph with three straight lines', 1], ['(c) Total pressure 38 kPa', 1], ['(c) y(X) ≈ 0.63 and comment on enrichment', 1]],
  d: 3, c: 'application', t: [3],
}), () => (near(80 * 0.3 + 20 * 0.7, 38) && near(24 / 38, 0.63, 0.005)) || 'raoult');
add('deviation-long', long({
  stem: '(a) What are non-ideal solutions? Explain positive and negative deviations from Raoult’s law with one example of each, giving the signs of the enthalpy and volume of mixing.\n\n(b) Draw a graph of total vapour pressure against composition for each type of deviation.\n\n(c) What is an azeotrope? Which type of azeotrope does each deviation produce?',
  model: 'Non-ideal solutions do not obey Raoult’s law over the whole range of composition. In **positive** deviation, A–B attractions are weaker than A–A and B–B, so the vapour pressure is higher than predicted, mixing absorbs heat and the volume increases; example: ethanol and acetone. In **negative** deviation, A–B attractions are stronger, vapour pressure is lower, mixing releases heat and the volume decreases; example: chloroform and acetone, which hydrogen-bond. On the graph, positive deviation curves above the straight Raoult line and negative deviation below it. An azeotrope boils at constant temperature with identical liquid and vapour composition. Positive deviation gives a minimum-boiling azeotrope; negative gives a maximum-boiling one.',
  sol: 'Link the strength of A–B attractions to vapour pressure, heat and volume; then link the deviation type to the azeotrope type.',
  scheme: [['(a) Definition of non-ideal solution', 0.5], ['(a) Positive deviation: reason, example, signs', 1.5], ['(a) Negative deviation: reason, example, signs', 1], ['(b) Two correct graphs relative to the Raoult line', 1], ['(c) Azeotrope defined, types matched', 1]],
  d: 3, c: 'understanding', t: [3],
}));
add('colligative-long', long({
  wl: null,
  stem: r`(a) What are colligative properties? Name the four colligative properties.

(b) Explain, with reference to vapour pressure, why the freezing point of a solvent is lowered when a non-volatile solute is dissolved in it.

(c) $1.0\ \text{g}$ of a sample of sulfur dissolved in $50\ \text{g}$ of benzene lowers the freezing point of benzene by $0.40\ \text{K}$. Find the molar mass of sulfur in this solution and the number of atoms in each sulfur molecule. ($K_\text{f}$ of benzene $= 5.12\ \text{K kg mol}^{-1}$; S = 32)`,
  model: r`(a) Colligative properties depend only on the number of solute particles in a given amount of solvent, not on their nature: relative lowering of vapour pressure, elevation of boiling point, depression of freezing point and osmotic pressure.

(b) At the freezing point, the liquid solvent and solid solvent have the same vapour pressure. A non-volatile solute lowers the vapour pressure of the liquid, so the two vapour pressures become equal only at a lower temperature; the solution therefore freezes below the pure solvent ($\Delta T_\text{f} = K_\text{f}\,m$).

(c) $M_2 = \dfrac{K_\text{f} \times 1000 \times w_2}{\Delta T_\text{f} \times w_1} = \dfrac{5.12 \times 1000 \times 1.0}{0.40 \times 50} = 256$, in $\text{g mol}^{-1}$. Atoms per molecule $= \dfrac{256}{32} = 8$, so sulfur is present as $\ce{S8}$.`,
  sol: 'Define, explain through equal vapour pressures of solid and liquid, then use the molar-mass form of ΔTf = Kf m.',
  scheme: [['(a) Definition and four properties', 1], ['(b) Vapour pressure explanation of freezing point depression', 1.5], ['(c) Formula and substitution', 1], ['(c) M = 256 g/mol', 1], ['(c) S₈ (8 atoms)', 0.5]],
  d: 4, c: 'analysis', t: [4],
}), () => (near((KF_BZ * 1000 * 1) / (0.4 * 50), 256) && near(256 / 32, 8)) || 'sulfur');
add('osmosis-long', long({
  wl: null,
  stem: r`(a) Define osmosis and osmotic pressure.

(b) Show that the molar mass of a solute can be found from $\pi = CRT$, and give two reasons why this method is preferred for polymers.

(c) $1.5\ \text{g}$ of a polymer is dissolved to make $500\ \text{mL}$ of solution at $27\ ^\circ\text{C}$. The osmotic pressure is $6.225 \times 10^{-4}\ \text{bar}$. Find the molar mass of the polymer. ($R = 0.083\ \text{L bar K}^{-1}\ \text{mol}^{-1}$)`,
  model: r`(a) Osmosis is the net flow of solvent through a semipermeable membrane from pure solvent (or a dilute solution) into a more concentrated solution. Osmotic pressure is the excess pressure that must be applied to the solution to just stop this flow.

(b) $\pi = CRT = \dfrac{n_2}{V}RT = \dfrac{w_2 RT}{M_2 V}$, so $M_2 = \dfrac{w_2 RT}{\pi V}$. Preferred for polymers because it is measured at room temperature (no heat damage), and because it gives large, measurable values even for very dilute solutions of high molar mass solutes.

(c) $T = 300\ \text{K}$, $V = 0.500\ \text{L}$. $M_2 = \dfrac{1.5 \times 0.083 \times 300}{6.225 \times 10^{-4} \times 0.500} = \dfrac{37.35}{3.1125 \times 10^{-4}} = 120000$, so the molar mass is $1.2 \times 10^{5}\ \text{g mol}^{-1}$.`,
  sol: 'Rearrange π = CRT with n = w/M; use V in litres and T in kelvin.',
  scheme: [['(a) Osmosis and osmotic pressure defined', 1], ['(b) Derivation of M₂ = wRT/(πV)', 1], ['(b) Two reasons', 1], ['(c) Substitution with T = 300 K, V = 0.5 L', 1], ['(c) M = 1.2 × 10⁵ g/mol', 1]],
  d: 3, c: 'application', t: [4],
}), () => near((1.5 * R * 300) / (6.225e-4 * 0.5), 120000) || 'polymer');
add('vant-hoff-long', long({
  wl: null,
  stem: r`(a) Define the van’t Hoff factor. Predict its value (greater than, less than or equal to 1) for (i) urea in water, (ii) sodium sulfate in water, (iii) benzoic acid in benzene.

(b) Write the expressions for $i$ in terms of the degree of dissociation (for a solute giving $n$ ions) and the degree of association (for dimers).

(c) $2.44\ \text{g}$ of benzoic acid ($M = 122\ \text{g mol}^{-1}$) in $100\ \text{g}$ of benzene lowers the freezing point by $0.614\ \text{K}$. Find $i$ and the percentage of benzoic acid that is dimerised. ($K_\text{f}$ of benzene $= 5.12\ \text{K kg mol}^{-1}$)`,
  model: r`(a) $i$ is the ratio of the observed colligative property to the value calculated assuming no dissociation or association (equivalently, normal molar mass ÷ abnormal molar mass). (i) Urea: $i = 1$; (ii) sodium sulfate: $i > 1$ (up to 3); (iii) benzoic acid in benzene: $i < 1$.

(b) Dissociation: $i = 1 + (n - 1)\alpha$. Dimerisation: $i = 1 - \dfrac{\alpha}{2}$.

(c) Normal molality $= \dfrac{2.44/122}{0.100} = 0.2\ \text{mol kg}^{-1}$; calculated $\Delta T_\text{f} = 5.12 \times 0.2 = 1.024\ \text{K}$. $i = \dfrac{0.614}{1.024} \approx 0.60$. $\alpha = 2(1 - 0.60) = 0.80$, so about $80\%$ of the acid is dimerised.`,
  sol: 'Compare observed with calculated depression; for dimers α = 2(1 − i).',
  scheme: [['(a) Definition', 1], ['(a) Three predictions', 1], ['(b) Both expressions', 1], ['(c) Calculated ΔTf = 1.024 K and i ≈ 0.60', 1], ['(c) 80% dimerised', 1]],
  d: 4, c: 'application', t: [5],
}), () => (near(0.614 / (KF_BZ * (2.44 / 122 / 0.1)), 0.6, 0.003) && near(2 * (1 - 0.6), 0.8)) || 'benzoic');

// ---------------------------------------------------------------- case-based
add('radiator-case', mk.case({
  passage: r`A car service centre in Shimla prepares coolant for winter by dissolving ethylene glycol ($\ce{C2H6O2}$, $M = 62\ \text{g mol}^{-1}$), a non-volatile, non-electrolyte liquid, in water. Their chart, worked out with $\Delta T_\text{f} = K_\text{f}\,m$ and $K_\text{f} = 1.86\ \text{K kg mol}^{-1}$, gives estimated freezing points for mixtures made with $1\ \text{kg}$ of water:

| Ethylene glycol added to 1 kg water | Molality ($\text{mol kg}^{-1}$) | Estimated freezing point |
|---|---|---|
| 250 g | 4.03 | $-7.5\ ^\circ\text{C}$ |
| 500 g | 8.06 | $-15.0\ ^\circ\text{C}$ |
| 750 g | ? | ? |

The manager notes that such concentrated mixtures are not truly dilute, so real freezing points differ a little from the chart.`,
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'Which property of the coolant does the chart rely on?',
      right: 'Depression of freezing point, which depends on the number of solute particles per kilogram of water',
      wrong: ['Elevation of boiling point, which depends on the molar mass of ethylene glycol', 'Osmotic pressure, which depends on the volume of the radiator', 'Vapour pressure of ethylene glycol, which is higher than that of water'],
      sol: 'The chart uses ΔTf = Kf m: a colligative property that counts particles of solute per kilogram of solvent — option (@K).',
      d: 1, c: 'understanding', t: [4],
    })),
    part('b', num({
      stem: r`Estimate the freezing point, in $^\circ\text{C}$, of the mixture made with $750\ \text{g}$ of ethylene glycol.`,
      value: -22.5, tol: 0.1, unit: '°C',
      sol: r`Molality $\approx \dfrac{750}{62} \approx 12.10\ \text{mol kg}^{-1}$; $\Delta T_\text{f} = 1.86 \times 12.10 \approx 22.5\ \text{K}$. Freezing point $= 0 - 22.5 = -22.5$, in $^\circ\text{C}$.`,
      scheme: [['Molality ≈ 12.1 and ΔTf ≈ 22.5 K, so about −22.5 °C', 1]],
      d: 2, c: 'application', t: [4],
    })),
    part('c', short({
      marks: 2,
      stem: 'A customer suggests using common salt instead, because "salt gives two ions, so it lowers the freezing point more per mole." Evaluate this suggestion.',
      model: 'The chemistry is right: sodium chloride gives about two particles per formula unit, so per mole it lowers the freezing point about twice as much. But salt water is strongly corrosive to the metal parts of the engine and radiator, and salt can crystallise out. Ethylene glycol is non-corrosive and stays dissolved, so it is the better choice.',
      sol: 'Accept the colligative argument but reject the suggestion on practical grounds such as corrosion.',
      scheme: [['Agrees that i ≈ 2 gives more depression per mole', 1], ['Rejects salt because it corrodes metal (or crystallises)', 1]],
      d: 4, c: 'evaluation', t: [4, 5],
    }), [
      short({
        marks: 2, wl: null,
        stem: r`The same coolant protects the engine in summer too. Calculate the boiling point of the 500 g mixture at 1 atm. ($K_\text{b} = 0.52\ \text{K kg mol}^{-1}$; water boils at $100\ ^\circ\text{C}$)`,
        model: r`$m \approx 8.06\ \text{mol kg}^{-1}$; $\Delta T_\text{b} = 0.52 \times 8.06 \approx 4.19\ \text{K}$. Boiling point $\approx 100 + 4.19 \approx 104.2\ ^\circ\text{C}$, so the coolant does not boil away as easily.`,
        sol: 'Use the molality from the chart with ΔTb = Kb m and add the elevation to 100 °C.',
        scheme: [['ΔTb ≈ 4.19 K', 1], ['Boiling point ≈ 104.2 °C', 1]],
        d: 3, c: 'application', t: [4],
      }),
    ]),
  ],
}), () => (near(KF_W * (250 / 62), 7.5, 0.002) && near(KF_W * (500 / 62), 15.0, 0.002) && near(KF_W * (750 / 62), 22.5, 0.002) && near(KB_W * 8.06, 4.19, 0.002)) || 'radiator');
add('ro-plant-case', mk.case({
  passage: r`A coastal desalination plant near Chennai makes drinking water from sea water by reverse osmosis. The sea water contains about $35\ \text{g}$ of dissolved salts per litre, which the engineers treat as about $0.60\ \text{mol L}^{-1}$ of sodium chloride. The water is at about $300\ \text{K}$. Pumps push the sea water against polymer membranes at a pressure of about $60\ \text{bar}$, and roughly 40% of the water fed in comes out as fresh water; the rest leaves as a more concentrated brine.`,
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'What is the job of the membrane in the plant?',
      right: 'To let water molecules pass while holding back the dissolved salts',
      wrong: ['To let salt ions pass while holding back the water', 'To react with the salt and remove it as a precipitate', 'To heat the sea water so that the water evaporates'],
      sol: 'The membrane is semipermeable: it passes the solvent but not the solute particles — option (@K).',
      d: 1, c: 'recall', t: [4],
    })),
    part('b', num({
      stem: r`Estimate the osmotic pressure of the sea water in **bar**, using $\pi = iCRT$ with $i = 2$. ($R = 0.083\ \text{L bar K}^{-1}\ \text{mol}^{-1}$)`,
      value: 29.88, tol: 0.2, unit: 'bar',
      sol: r`$\pi = iCRT = 2 \times 0.60 \times 0.083 \times 300 = 29.88$, so about $30\ \text{bar}$.`,
      scheme: [['π = 2 × 0.60 × 0.083 × 300 ≈ 29.9 bar', 1]],
      d: 3, c: 'application', t: [4, 5],
    })),
    part('c', short({
      marks: 2,
      stem: 'Why must the pumps apply a pressure well above your answer to (b), especially towards the end of the membrane where the brine leaves?',
      model: 'Water flows out of the sea water only when the applied pressure exceeds its osmotic pressure. As fresh water is removed, the remaining brine becomes more concentrated, so its osmotic pressure rises above 30 bar; the pumps work at about 60 bar so that water is still forced through.',
      sol: 'Reverse osmosis needs pressure above π, and π rises as the brine concentrates.',
      scheme: [['Applied pressure must exceed the osmotic pressure', 1], ['Brine becomes more concentrated, so its osmotic pressure rises', 1]],
      d: 4, c: 'analysis', t: [4],
    }), [
      short({
        marks: 2,
        stem: 'One day a pump fails and the pressure on the sea water drops to only 10 bar. Predict what will happen at the membrane and explain.',
        model: 'Ten bar is less than the osmotic pressure of the sea water (about 30 bar), so reverse osmosis stops. Normal osmosis takes over: water moves from the fresh-water side back into the sea water through the membrane, so no drinking water is produced.',
        sol: 'Compare 10 bar with the osmotic pressure.',
        scheme: [['10 bar is below the osmotic pressure, so reverse osmosis stops', 1], ['Water flows back into the sea water by ordinary osmosis', 1]],
        d: 3, c: 'application', t: [4],
      }),
    ]),
  ],
}), () => near(2 * 0.6 * R * 300, 29.88) || 'pi');
add('distillation-case', mk.case({
  passage: r`In a college laboratory, students prepared three liquid mixtures, each containing equal numbers of moles of the two liquids, and measured the total vapour pressure at the same temperature. The table also gives the vapour pressures of the pure liquids at that temperature. (Illustrative values.)

| Mixture | $p^\circ$ of liquid 1 (kPa) | $p^\circ$ of liquid 2 (kPa) | Measured total (kPa) |
|---|---|---|---|
| I: n-hexane + n-heptane | 20.2 | 6.1 | 13.1 |
| II: acetone + chloroform | 46.0 | 39.0 | 34.6 |
| III: acetone + ethanol | 30.8 | 7.9 | 26.0 |`,
  d: 4, c: 'analysis',
  children: [
    part('a', mcq({
      stem: 'Using Raoult’s law, which mixture behaves as a nearly ideal solution?',
      right: 'Mixture I',
      wrong: ['Mixture II', 'Mixture III', 'None of them'],
      key: 'a',
      sol: r`Predicted totals (equal moles) are the averages: I $= 13.15$, II $= 42.5$, III $= 19.35\ \text{kPa}$. Only I (13.1 measured) matches — option (@K).`,
      d: 2, c: 'application', t: [3],
    })),
    part('b', short({
      marks: 1,
      stem: 'Which mixture shows negative deviation? Give the reason at the molecular level.',
      model: 'Mixture II (34.6 kPa, below the predicted 42.5 kPa): chloroform forms hydrogen bonds with acetone.',
      sol: 'The measured value is below the Raoult prediction only for mixture II.',
      scheme: [['Mixture II with hydrogen bonding as the reason', 1]],
      d: 3, c: 'analysis', t: [3],
    })),
    part('c', short({
      marks: 2,
      stem: 'Which mixture could form a maximum-boiling azeotrope if its deviation were large enough? Explain.',
      model: 'Mixture II. It shows negative deviation, so its vapour pressure is lower than predicted and, with a large enough deviation, passes through a minimum; a minimum in vapour pressure means a maximum in boiling point, giving a maximum-boiling azeotrope.',
      sol: 'Negative deviation, minimum vapour pressure, maximum boiling point.',
      scheme: [['Mixture II', 1], ['Negative deviation gives a minimum vapour pressure, so a maximum boiling point', 1]],
      d: 4, c: 'analysis', t: [3],
    }), [
      short({
        marks: 2,
        stem: r`Predict the signs of $\Delta_\text{mix}H$ and $\Delta_\text{mix}V$ for mixture III and justify them from the data.`,
        model: 'Mixture III has a measured pressure (26.0 kPa) well above the prediction (19.35 kPa): positive deviation. Acetone breaks some hydrogen bonds of ethanol and the new attractions are weaker, so mixing absorbs heat (positive enthalpy of mixing) and the volume increases (positive volume of mixing).',
        sol: 'Higher measured pressure means positive deviation; both mixing quantities are positive.',
        scheme: [['Identifies positive deviation from the data', 1], ['ΔmixH > 0 and ΔmixV > 0 with reason', 1]],
        d: 4, c: 'analysis', t: [3],
      }),
    ]),
  ],
}), () => (near((20.2 + 6.1) / 2, 13.15) && near((46 + 39) / 2, 42.5) && near((30.8 + 7.9) / 2, 19.35)) || 'predictions');
add('diving-case', mk.case({
  passage: r`A diving instructor in the Andaman Islands explains to trainees that the pressure on a diver increases by about $1\ \text{bar}$ for every $10\ \text{m}$ of sea water. At the surface the total pressure is about $1\ \text{bar}$; at $20\ \text{m}$ it is about $3\ \text{bar}$. Air is about 79% nitrogen, so the partial pressure of nitrogen is $0.79\ \text{bar}$ at the surface and $2.37\ \text{bar}$ at $20\ \text{m}$. Henry’s law constant for nitrogen in water at $293\ \text{K}$ is $76.48\ \text{kbar}$. Trainees are told to rise slowly and pause during the ascent.`,
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'Why does more nitrogen dissolve in a diver’s blood at 20 m than at the surface?',
      right: 'The partial pressure of nitrogen is higher, and solubility is proportional to partial pressure.',
      wrong: ['The water is colder at depth, so nitrogen reacts with blood.', 'Henry’s law constant of nitrogen becomes larger at depth.', 'The diver breathes more slowly at depth.'],
      sol: r`By Henry’s law, $x = \dfrac{p}{K_\text{H}}$: a threefold partial pressure gives a threefold mole fraction — option (@K).`,
      d: 1, c: 'understanding', t: [2],
    })),
    part('b', num({
      stem: 'How many times more nitrogen (by mole fraction) is dissolved at 20 m than at the surface, at the same temperature?',
      value: 3, tol: 0.01, unit: null,
      sol: r`$\dfrac{x_{20}}{x_0} = \dfrac{2.37}{0.79} = 3$, since $K_\text{H}$ is the same; so 3 times as much.`,
      scheme: [['Ratio of partial pressures = 3', 1]],
      d: 2, c: 'application', t: [2],
    })),
    part('c', short({
      marks: 2,
      stem: 'Explain why rising quickly from 20 m is dangerous, and why pausing during the ascent helps.',
      model: 'On a fast ascent the pressure falls quickly, so the extra nitrogen dissolved at depth comes out of the blood as bubbles, causing the painful and dangerous bends. Pausing lets the pressure fall in steps, so the nitrogen leaves slowly through the lungs instead of forming bubbles.',
      sol: 'Falling pressure lowers solubility; slow decompression lets the gas leave without bubbles.',
      scheme: [['Fast pressure drop releases nitrogen as bubbles (bends)', 1], ['Pausing lets nitrogen leave gradually through the lungs', 1]],
      d: 3, c: 'application', t: [2],
    }), [
      short({
        marks: 2,
        stem: r`Helium has $K_\text{H} \approx 145\ \text{kbar}$ in water. Explain why replacing part of the nitrogen in the tank with helium reduces the risk.`,
        model: 'Helium’s Henry’s constant is about twice that of nitrogen, so at the same partial pressure only about half as much helium dissolves in the blood. Less dissolved gas means fewer bubbles form when the pressure falls, so the risk of the bends is lower.',
        sol: 'Compare the constants: larger KH means lower solubility.',
        scheme: [['Larger KH means lower solubility of helium', 1], ['Less dissolved gas, fewer bubbles on ascent', 1]],
        d: 3, c: 'analysis', t: [2],
      }),
    ]),
  ],
}), () => near(2.37 / 0.79, 3) || 'ratio');
