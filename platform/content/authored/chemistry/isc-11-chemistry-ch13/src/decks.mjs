// ISC 11 Chemistry ch13 Chemical Equilibrium: two decks. Part 1 (t01-t02) reversible reactions, physical equilibria, dynamic nature, law of mass action,
// Kc and Kp, the derivation, characteristics of K, ICE calculations; Part 2 (t03-t04) Le Chatelier's principle and the conditions for maximum yield.
import { sl, deck, table, flow, svgV, r } from './lib.mjs';
import { PHYS, BOTH, STRESS, CATALYST, HABER_Y } from './svgs.mjs';
import { RA, esterX, alphaFromKp, near, f0, f1, f2, f3 } from './data.mjs';

export const V = {
  phys: svgV(PHYS, 'A sealed flask with liquid and vapour and a graph of the rates of evaporation and condensation reaching equality', 'Dynamic equilibrium: the two rates are equal, the pressure is constant.'),
  both: svgV(BOTH, 'Concentrations of N2O4 and NO2 against time from two different starting mixtures, levelling off at the same values', 'The same equilibrium is reached from either side.'),
  stress: svgV(STRESS, 'Concentrations of N2O4 and NO2 against time when N2O4 is added and then the volume is halved', 'The system shifts to oppose each disturbance (illustrative kinetic model).'),
  catalyst: svgV(CATALYST, 'Energy profile for a reaction with and without a catalyst; the activation energy falls but the enthalpy change does not', 'A catalyst lowers Ea in both directions.'),
  haber: svgV(HABER_Y, 'Model equilibrium yield of ammonia against pressure at three temperatures', 'Yield rises with pressure and falls as temperature rises (ideal-gas model).'),
};

// ---- worked-example data
const kcNOCl = (0.4 ** 2) / (0.2 ** 2 * 0.1); // 40 L mol-1
const kpNOCl = kcNOCl / (RA * 500);
const xe = esterX(1, 1);
const a1 = alphaFromKp(0.5, 1), a4 = alphaFromKp(0.5, 4), a025 = alphaFromKp(0.5, 0.25);
void near;

export const deck1 = deck({
  part: 1,
  title: 'Chemical Equilibrium — Part 1: Equilibrium, the law of mass action, Kc and Kp',
  goals: [
    'Distinguish reversible and irreversible reactions and explain why physical and chemical equilibria are dynamic',
    'State the law of mass action, write Kc and Kp and their units, and derive Kp = Kc (RT)^Δn',
    'Calculate equilibrium constants and equilibrium amounts, including degree of dissociation, from given data',
  ],
  slides: [
    sl('title', 'When does a change stop changing?', {
      b: 'Part 1: **equilibrium** is the state in which nothing seems to change although both directions of change go on. We meet **reversible** reactions, the **law of mass action**, **Kc** and **Kp**.',
      v: flow('LR', [['a', 'Reversible reactions'], ['b', 'Physical equilibria'], ['c', 'Dynamic nature'], ['d', 'Law of mass action: Kc and Kp'], ['e', 'Kp = Kc (RT)^Δn'], ['f', 'Equilibrium calculations']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e'], ['e', 'f']], 'Flow chart of the topics of Part 1'),
      n: 'Welcome to Part One of chemical equilibrium. Many changes do not go to completion, but settle into a state where nothing seems to change, though changes in both directions carry on. We start with reversible reactions and physical equilibria, then learn the law of mass action, the equilibrium constants, and how to calculate with them.',
    }),
    sl('concept', 'Reversible and irreversible reactions', {
      b: 'An **irreversible** reaction goes (almost) to completion in one direction: magnesium burning in air. A **reversible** reaction can go in both directions, written with **⇌**, and in a **closed vessel** reaches a state in which reactants and products are both present.',
      v: table(['Reaction', 'Type', 'Why'], [['Burning of magnesium in air (open dish)', 'irreversible', 'oxide does not return to the metal; products escape'], ['N₂O₄ ⇌ 2NO₂ in a sealed tube', 'reversible', 'both gases present at all times'], ['Ice ⇌ water at 273 K', 'reversible (physical)', 'melting and freezing both occur'], ['Esterification of ethanoic acid', 'reversible', 'ester and water react to give back the acid']], 'Table of irreversible and reversible changes with reasons'),
      n: 'An irreversible reaction goes to completion in one direction, like magnesium burning in air. A reversible reaction can go both ways. We write it with a double arrow. In a closed vessel such a reaction reaches a state where both reactants and products are present, and they stop changing in amount.',
    }),
    sl('diagram', 'Liquid and vapour in a sealed flask', {
      b: 'Evaporation starts at a **constant rate**. As vapour builds up, **condensation** speeds up. When the two **rates are equal**, the vapour pressure stays **constant**: a **dynamic equilibrium**. Nothing has stopped; molecules keep crossing the surface both ways.',
      v: V.phys,
      n: 'This sealed flask holds a liquid and its vapour. Molecules leave the liquid at a steady rate. As the vapour builds up, more molecules return to the liquid. After some time the rate of leaving equals the rate of returning, the vapour pressure stops changing, and the system is in dynamic equilibrium. Nothing has stopped, both changes go on.',
    }),
    sl('concept', 'Three kinds of physical equilibrium', {
      b: 'A physical equilibrium involves **changes of state** only. Each is established in a **closed system** at **constant temperature**, and a property stays constant: melting point, vapour pressure.',
      v: table(['Equilibrium', 'Example', 'Condition', 'Constant property'], [['Solid ⇌ liquid', 'ice ⇌ water', '273.15 K, 1 atm', 'melting point'], ['Liquid ⇌ vapour', 'water ⇌ water vapour', 'closed vessel, fixed T', 'vapour pressure'], ['Solid ⇌ vapour', 'iodine (or camphor) crystals ⇌ vapour', 'closed flask, fixed T', 'vapour pressure of the solid']], 'Table of solid-liquid, liquid-vapour and solid-vapour equilibria'),
      n: 'There are three kinds of physical equilibrium. Solid and liquid, such as ice and water at the normal melting point. Liquid and vapour in a closed vessel at a fixed temperature. And solid and vapour, as in iodine or camphor in a closed flask. In each case some property, like the vapour pressure, stays constant.',
    }),
    sl('check', 'Quick check: why is the vapour pressure constant?', {
      b: 'Think about both directions of change at the surface of the liquid.',
      n: 'Quick check. Imagine a sealed bottle of ethanol left for a few hours at constant temperature. The vapour pressure stops rising. Decide what is happening at the surface of the liquid at that stage, and choose the explanation that keeps both processes going.',
      chk: 'liqvap-mcq',
    }),
    sl('concept', 'Chemical equilibrium is dynamic', {
      b: 'In a reversible reaction in a **closed system** the **forward rate** falls and the **reverse rate** rises until they are **equal**. Then the concentrations stay constant: the **equilibrium state**. It is **dynamic** because both reactions continue; it can be reached from **either side**; a **catalyst** does not change its position.',
      v: table(['Characteristic', 'Meaning'], [['Closed system, fixed T', 'nothing enters or leaves; temperature constant'], ['Constant properties', 'concentrations, pressure and colour no longer change'], ['Equal rates', 'forward rate = reverse rate (dynamic)'], ['Same state from either side', 'composition depends on T, not on the route'], ['Catalyst', 'reaches equilibrium sooner; position unchanged']], 'Table of the characteristics of a chemical equilibrium'),
      n: 'In a reversible reaction in a closed vessel the forward rate falls and the reverse rate rises until they become equal. The concentrations then stay constant. This state is dynamic, because both reactions continue. The same state is reached from either side, and a catalyst only helps the system get there sooner.',
    }),
    sl('diagram', 'The same equilibrium from both sides', {
      b: 'Start with **pure N₂O₄** or with **pure NO₂** (same total nitrogen): the concentrations move in opposite directions and level off at the **same values**. This is an **illustrative kinetic model** with Kc = 0.50 mol L⁻¹.',
      v: V.both,
      n: 'This graph follows nitrogen tetroxide and nitrogen dioxide. In one run we start with only nitrogen tetroxide, in the other with only nitrogen dioxide, using the same total amount of nitrogen. The curves approach each other and level off at exactly the same values, which shows that equilibrium can be reached from either side.',
    }),
    sl('concept', 'Law of mass action and Kc', {
      b: 'The rate of a reaction is proportional to the product of the **active masses** (molar concentrations) of the reactants. At equilibrium the two rates are equal, so for **aA + bB ⇌ cC + dD**: $K_c = \\dfrac{[C]^c[D]^d}{[A]^a[B]^b}$. Pure **solids and liquids** do not appear. $K_c$ is constant **at a given temperature**.',
      v: table(['Reaction', 'Kc expression'], [['2NO + Cl₂ ⇌ 2NOCl', '[NOCl]² / ([NO]²[Cl₂])'], ['N₂O₄ ⇌ 2NO₂', '[NO₂]² / [N₂O₄]'], ['NH₄Cl(s) ⇌ NH₃ + HCl', '[NH₃][HCl]'], ['C(s) + CO₂ ⇌ 2CO', '[CO]² / [CO₂]']], 'Table of equilibrium constant expressions'),
      n: 'The law of mass action says that the rate of a reaction is proportional to the product of the molar concentrations of the reactants. At equilibrium the forward and reverse rates are equal, so the products of concentrations raised to their coefficients, divided by those of reactants, give a constant at a given temperature. Pure solids and liquids are left out.',
    }),
    sl('example', 'Worked example: calculating Kc', {
      b: r`**Problem.** At equilibrium in a closed vessel at 500 K, $[\text{NO}] = 0.20$, $[\text{Cl}_2] = 0.10$ and $[\text{NOCl}] = 0.40$ mol L⁻¹ for $\ce{2NO(g) + Cl2(g) <=> 2NOCl(g)}$ (given). Find $K_c$ with its unit.

$K_c = \dfrac{[\text{NOCl}]^2}{[\text{NO}]^2[\text{Cl}_2]} = \dfrac{(0.40)^2}{(0.20)^2(0.10)} = ${f0(kcNOCl)}$ L mol⁻¹.`,
      v: table(['Step', 'Working', 'Result'], [['Write expression', '[NOCl]² / ([NO]²[Cl₂])', ''], ['Substitute', '0.16 / (0.040 × 0.10)', '0.16 / 0.0040'], ['Unit', '(mol L⁻¹)⁻¹', 'L mol⁻¹'], ['Kc', '', `${f0(kcNOCl)} L mol⁻¹`]], 'Table of the calculation of Kc for nitrosyl chloride formation'),
      n: 'Write the expression first, with the product concentration squared on top and the reactant concentrations on the bottom. Substituting gives zero point one six divided by zero point zero zero four, which is forty. The unit is litres per mole, because there is one fewer mole of gas on the product side.',
    }),
    sl('concept', 'Kp, and the units of K', {
      b: 'For gases the equilibrium constant can be written with **partial pressures**: $K_p = \\dfrac{p_C^c\\,p_D^d}{p_A^a\\,p_B^b}$. The unit depends on **Δn = (moles of gaseous products) − (moles of gaseous reactants)**: Kc in (mol L⁻¹)^Δn and Kp in (atm)^Δn.',
      v: table(['Reaction', 'Δn', 'Unit of Kc', 'Unit of Kp'], [['N₂ + O₂ ⇌ 2NO', '0', 'none', 'none'], ['N₂O₄ ⇌ 2NO₂', '+1', 'mol L⁻¹', 'atm'], ['2NO + O₂ ⇌ 2NO₂', '−1', 'L mol⁻¹', 'atm⁻¹'], ['N₂ + 3H₂ ⇌ 2NH₃', '−2', 'L² mol⁻²', 'atm⁻²']], 'Table of the units of Kc and Kp for four gaseous reactions'),
      n: 'For gases we can write the constant with partial pressures, giving Kp. The units of both constants depend on the change in the number of moles of gas. If it is zero there is no unit. If it is plus one, Kc has moles per litre and Kp has atmospheres. If it is negative, the units are inverted.',
    }),
    sl('concept', 'Derivation: Kp = Kc (RT)^Δn', {
      b: 'For an ideal gas $pV = nRT$, so **p = (n/V) RT = [gas] RT**. Put $p = [\\,]RT$ for each gas in $K_p$: the **RT** factors give $(RT)^{(c+d)-(a+b)}$, so **$K_p = K_c(RT)^{\\Delta n}$**, with Δn the change in moles of gas.',
      v: flow('LR', [['a', 'pV = nRT, so p = [gas] RT'], ['b', 'Replace each p in Kp by [gas] RT'], ['c', 'Collect: Kp = Kc × (RT)^((c+d) − (a+b))'], ['d', 'Kp = Kc (RT)^Δn']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow chart of the derivation of Kp equals Kc times RT to the power delta n'),
      n: 'Here is the derivation. For an ideal gas the pressure equals the concentration times R T. Replace each partial pressure in the expression for Kp by its concentration times R T. The R T factors collect into R T raised to the number of product moles minus reactant moles. So Kp equals Kc times R T to the power delta n.',
    }),
    sl('check', 'Quick check: units of Kp', {
      b: 'First find Δn for the gases, then raise atm to that power.',
      n: 'Quick check. Count the moles of gas on each side of the equation, and subtract reactants from products to get delta n. The unit of Kp is atmosphere raised to that number. If the number is negative the unit is inverted, if it is zero there is no unit.',
      chk: 'units-mcq',
    }),
    sl('example', 'Worked example: Kp from Kc', {
      b: r`**Problem.** For $\ce{2NO + Cl2 <=> 2NOCl}$ at 500 K, $K_c = ${f0(kcNOCl)}$ L mol⁻¹. Find $K_p$ ($R = 0.0821$ L atm K⁻¹ mol⁻¹).

$\Delta n = 2 - 3 = -1$, so $K_p = K_c(RT)^{-1} = \dfrac{${f0(kcNOCl)}}{0.0821 \times 500} = \dfrac{${f0(kcNOCl)}}{41.05} \approx ${f2(kpNOCl)}$ atm⁻¹.`,
      v: table(['Quantity', 'Value'], [['Δn', '2 − 3 = −1'], ['RT', '0.0821 × 500 = 41.05 L atm mol⁻¹'], ['Kp = Kc / RT', `${f0(kcNOCl)} / 41.05`], ['Kp', `${f2(kpNOCl)} atm⁻¹`]], 'Table of the conversion of Kc to Kp for nitrosyl chloride formation'),
      n: 'Count the moles of gas. Two on the right and three on the left, so delta n is minus one. The relation then divides Kc by R T. At five hundred kelvin, R T is forty one point oh five, so Kp is about zero point nine seven, with the unit inverse atmospheres.',
    }),
    sl('check', 'Quick check: a Kp from partial pressures', {
      b: 'Divide the product of the product pressures by the pressure of the reactant.',
      n: 'Quick check. Write the expression for Kp using partial pressures, with the product pressures multiplied on top and the reactant pressure underneath. Substitute the given pressures in atmospheres and give the answer with its unit.',
      chk: 'kp-num',
    }),
    sl('concept', 'Characteristics of the equilibrium constant', {
      b: '**K depends only on temperature.** It does not depend on starting concentrations, pressure or a catalyst. **Reverse the equation: K → 1/K.** **Multiply the equation by n: K → Kⁿ.** **Add equations: multiply their K values.** A large K means products are favoured; a small K means reactants are favoured. Recap from thermodynamics: $\\Delta G^\\circ = -2.303\\,RT\\log K$.',
      v: table(['Operation on the equation', 'Effect on K'], [['Reverse it', 'K′ = 1 / K'], ['Multiply coefficients by 2', 'K′ = K²'], ['Add two equations', 'K₃ = K₁ × K₂'], ['Change temperature', 'K changes'], ['Add a catalyst or change pressure', 'K unchanged']], 'Table of how the equilibrium constant changes when the equation or conditions are altered'),
      n: 'The equilibrium constant depends only on temperature. Reverse the equation and the constant is inverted. Double all the coefficients and the constant is squared. When two equations are added, their constants multiply. A large constant means the products are favoured, and a catalyst or a pressure change does not alter its value.',
    }),
    sl('example', 'Worked example: equilibrium amounts for an ester', {
      b: r`**Problem.** 1.0 mol of ethanoic acid and 1.0 mol of ethanol are mixed; $K_c = 4.0$ for $\ce{CH3COOH + C2H5OH <=> CH3COOC2H5 + H2O}$. Find the amount of ester at equilibrium.

$K_c = \dfrac{x^2}{(1-x)^2} = 4.0 \Rightarrow \dfrac{x}{1-x} = 2 \Rightarrow x = ${f2(xe)}$ mol.`,
      v: table(['', 'CH₃COOH', 'C₂H₅OH', 'ester', 'H₂O'], [['Initial / mol', '1.0', '1.0', '0', '0'], ['Change / mol', '−x', '−x', '+x', '+x'], ['Equilibrium / mol', '1 − x', '1 − x', 'x', 'x'], ['With x = 0.67', '0.33', '0.33', '0.67', '0.67']], 'ICE table for the esterification of ethanoic acid with ethanol'),
      n: 'Set up the initial, change and equilibrium rows. The amount x of ester formed is also the amount of water formed. Since there is no change in the number of moles, the volume cancels. The constant is x squared over one minus x all squared, equal to four. The square root gives two, so x is two thirds of a mole.',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Reversible reactions in a closed vessel reach a dynamic equilibrium: equal forward and reverse rates, constant properties.',
        'Physical equilibria: solid–liquid, liquid–vapour, solid–vapour.',
        'Kc = [products]^coeff / [reactants]^coeff; pure solids and liquids are omitted; Kp uses partial pressures.',
        'Kp = Kc (RT)^Δn, with Δn the change in moles of gas.',
        'K depends only on temperature; reverse: 1/K; add equations: multiply K.',
      ],
      v: table(['Idea', 'Key fact'], [['Dynamic', 'rates equal, not zero'], ['Kc, Kp', 'expression from the balanced equation'], ['Relation', 'Kp = Kc (RT)^Δn'], ['Depends on', 'temperature only']], 'Summary table of the key ideas of Part 1'),
      n: 'Let us sum up Part One. Reversible reactions in closed vessels reach a dynamic equilibrium with equal forward and reverse rates. The constant Kc is built from the concentrations, Kp from the partial pressures, and they are related through R T raised to delta n. Both depend only on temperature.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'Write the expression from the balanced equation, with coefficients as powers; leave out pure solids and liquids.',
        'In a derivation, start from pV = nRT, give p = [gas]RT, and define Δn.',
        'Use R = 0.0821 L atm K⁻¹ mol⁻¹ with atm and litres; temperature in kelvin.',
        'Divide moles by the volume before substituting in Kc unless the volume cancels.',
        'Always state the unit of K, or write "no unit" when Δn = 0.',
      ],
      v: table(['Slip', 'Fix'], [['Putting solids in K', 'omit pure solids and liquids'], ['Using moles instead of concentration', 'divide by the volume'], ['Forgetting Δn is for gases only', 'count gas moles only'], ['Using °C in RT', 'convert to kelvin']], 'Table of common slips in Part 1 and their fixes'),
      n: 'Some exam tips. Write the expression from the balanced equation and leave out pure solids and liquids. For the derivation start from the ideal gas equation. Use the right value of R with the right units, and temperature in kelvin. Divide moles by volume, and always state the unit of the constant.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: "Chemical Equilibrium — Part 2: Le Chatelier's principle and conditions for maximum yield",
  goals: [
    "State Le Chatelier's principle and predict the effect of concentration, temperature, pressure, a catalyst and an inert gas",
    'Explain why a catalyst does not change K or the equilibrium composition',
    'Justify the conditions used for the Haber process, the contact process, the dissociation of N₂O₄ and ester hydrolysis',
  ],
  slides: [
    sl('title', 'Pushing an equilibrium', {
      b: 'Part 2: what happens when a system at equilibrium is **disturbed**? **Le Chatelier\'s principle** predicts the response, and it guides the choice of conditions in industry.',
      v: flow('LR', [['a', 'Concentration'], ['b', 'Temperature'], ['c', 'Pressure'], ['d', 'Catalyst and inert gas'], ['e', 'Haber and contact processes']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']], 'Flow chart of the topics of Part 2'),
      n: 'Welcome to Part Two. What happens when we disturb a system at equilibrium? Le Chatelier gave a simple rule to predict the response. We apply it to changes of concentration, temperature, pressure, a catalyst and an inert gas, and then use it to choose the best conditions for industrial processes.',
    }),
    sl('concept', "Le Chatelier's principle", {
      b: 'If a system at equilibrium is subjected to a **change** of concentration, temperature or pressure, the equilibrium **shifts** in the direction that **opposes** (reduces) the change. It predicts the **direction** of the shift; only a change of **temperature** alters the value of **K**.',
      v: table(['Change', 'Shift', 'K changes?'], [['Add a reactant', 'forward (uses it up)', 'no'], ['Remove a product', 'forward', 'no'], ['Raise the temperature', 'endothermic direction', 'yes'], ['Raise the pressure', 'fewer moles of gas', 'no'], ['Add a catalyst', 'none (faster approach)', 'no']], 'Table of disturbances, the direction of shift and the effect on K'),
      n: 'The Le Chatelier principle says that when a system at equilibrium is disturbed, it shifts in the direction that reduces the disturbance. Adding a reactant or removing a product shifts the equilibrium forward. A temperature rise favours the endothermic direction. Only a change of temperature alters the value of the constant.',
    }),
    sl('concept', 'Effect of concentration', {
      b: 'Adding a reactant makes **Q < K**, so the net reaction goes **forward** until Q = K again; removing a product does the same. Adding a product, or removing a reactant, makes Q > K and shifts the equilibrium **backward**. **K is unchanged.**',
      v: table(['Disturbance (Fe³⁺ + SCN⁻ ⇌ FeSCN²⁺, red)', 'Shift', 'Observation'], [['Add Fe³⁺', 'right', 'deeper red'], ['Add SCN⁻', 'right', 'deeper red'], ['Remove Fe³⁺ (precipitate as hydroxide)', 'left', 'red fades'], ['Dilute with water', 'left', 'red fades']], 'Table of the effect of changing concentrations on the iron thiocyanate equilibrium'),
      n: 'Adding a reactant makes the reaction quotient smaller than the constant, so the net reaction runs forward until the two are equal again. Removing a product has the same effect. Adding a product, or removing a reactant, pushes the equilibrium backward. The constant itself does not change when concentrations are altered.',
    }),
    sl('diagram', 'Response to added reactant and to compression', {
      b: 'At the first dashed line **N₂O₄ is added**: the equilibrium shifts **forward**. At the second the **volume is halved**: both concentrations double, Q > K, and the system shifts **backward**, towards fewer moles of gas. After each, **Q returns to K**.',
      v: V.stress,
      n: 'In this model, extra nitrogen tetroxide is added at the first line. Its concentration jumps, and then falls as more nitrogen dioxide forms, the shift forward. At the second line the volume is halved, so both concentrations double at once. The system then shifts back towards nitrogen tetroxide, which has fewer moles of gas.',
    }),
    sl('check', 'Quick check: the colour after adding a reactant', {
      b: 'Decide whether Q becomes smaller or larger than K, and which way the net reaction goes.',
      n: 'Quick check. Iron three plus ions and thiocyanate ions make a red complex. If more iron three plus is added, ask whether the quotient becomes smaller or larger than the constant, which way the net reaction then goes, and what that does to the red colour.',
      chk: 'conc-mcq',
    }),
    sl('concept', 'Effect of temperature', {
      b: 'Heat behaves like a **reactant** in an endothermic reaction and like a **product** in an exothermic one. **Raising T** favours the **endothermic** direction and **K changes**: it increases for an endothermic and decreases for an exothermic reaction. Lowering T does the opposite.',
      v: table(['Reaction', 'ΔH', 'Raise T', 'K'], [['N₂O₄ ⇌ 2NO₂', '+57.2 kJ', 'forward (darker brown)', 'increases'], ['CO + 2H₂ ⇌ CH₃OH', '−90.7 kJ', 'backward', 'decreases'], ['N₂ + 3H₂ ⇌ 2NH₃', '−92.4 kJ', 'backward', 'decreases'], ['C(s) + CO₂ ⇌ 2CO', '+172 kJ', 'forward', 'increases']], 'Table of the effect of a temperature rise on four equilibria'),
      n: 'Heat can be thought of as a reactant in an endothermic reaction and a product in an exothermic one. Raising the temperature therefore favours the endothermic direction. This is the only change that alters the value of the equilibrium constant: it increases for an endothermic reaction and decreases for an exothermic one.',
    }),
    sl('concept', 'Effect of pressure', {
      b: 'Compressing a gas mixture favours the side with **fewer moles of gas**; lowering the pressure favours the side with **more**. If **Δn = 0**, there is **no shift**. Solids and liquids hardly respond. K is unchanged.',
      v: table(['Equilibrium', 'Gas moles (left → right)', 'Higher pressure favours'], [['CO + 2H₂ ⇌ CH₃OH', '3 → 1', 'forward'], ['N₂O₄ ⇌ 2NO₂', '1 → 2', 'backward (N₂O₄)'], ['H₂ + Cl₂ ⇌ 2HCl', '2 → 2', 'neither'], ['C(s) + CO₂ ⇌ 2CO', '1 → 2', 'backward (CO₂)'], ['Ice ⇌ water at 273 K', 'volume falls on melting', 'water (liquid)']], 'Table of the effect of pressure on gaseous and physical equilibria'),
      n: 'Raising the pressure on a gas mixture favours the side with fewer moles of gas, and lowering it favours the side with more. If the number of moles of gas does not change there is no shift. Solids and liquids hardly respond. Ice melts under pressure because water takes up less volume than ice.',
    }),
    sl('diagram', 'What a catalyst does', {
      b: 'A catalyst gives the reaction a path with a **lower activation energy** in **both directions equally**, so both rates rise by the same factor. It reaches equilibrium **sooner**, but the **composition**, **ΔH** and **K are unchanged**.',
      v: V.catalyst,
      n: 'This energy profile compares a reaction with and without a catalyst. The catalyst opens a path with a lower peak, so the activation energy falls for the forward and for the reverse reaction by the same amount. The starting and final energy levels are the same, so the enthalpy change and the equilibrium constant do not change.',
    }),
    sl('concept', 'Effect of an inert gas', {
      b: 'An inert gas takes no part in the reaction. **At constant volume** the concentrations of the reacting gases do not change: **no shift**. **At constant pressure** the volume increases, the concentrations fall, and the equilibrium shifts to the side with **more moles of gas**.',
      v: table(['N₂O₄ ⇌ 2NO₂ with argon added', 'Concentrations', 'Result'], [['Constant volume', 'unchanged', 'no shift'], ['Constant total pressure', 'all fall (volume rises)', 'shifts towards NO₂'], ['For H₂ + I₂ ⇌ 2HI at constant pressure', 'all fall equally', 'no shift (Δn = 0)']], 'Table comparing the effect of an inert gas at constant volume and at constant pressure'),
      n: 'An inert gas takes no part in the reaction. If it is added at constant volume, the concentrations of the reacting gases do not change, so nothing shifts. If it is added at constant total pressure, the volume grows, the concentrations fall, and the equilibrium shifts to the side with more moles of gas.',
    }),
    sl('example', 'Worked example: predicting shifts for methanol synthesis', {
      b: r`**Problem.** For $\ce{CO(g) + 2H2(g) <=> CH3OH(g)}$, $\Delta H = -90.7$ kJ, predict the effect on the yield of methanol of each change.`,
      v: table(['Change', 'Shift', 'Yield of CH₃OH', 'Reason'], [['Raise temperature', 'backward', 'decreases', 'exothermic forward reaction'], ['Raise pressure', 'forward', 'increases', '3 mol → 1 mol of gas'], ['Add H₂', 'forward', 'increases', 'reactant added'], ['Remove CH₃OH', 'forward', 'increases', 'product removed'], ['Add catalyst', 'none', 'unchanged', 'equal effect on both rates']], 'Table of predicted effects of five changes on the methanol synthesis equilibrium'),
      n: 'The forward reaction releases heat, so raising the temperature pushes the equilibrium backward and lowers the yield. Raising the pressure favours the side with fewer moles of gas, so the yield rises. Adding hydrogen or removing methanol shifts the equilibrium forward. A catalyst only helps the system reach equilibrium sooner.',
    }),
    sl('check', 'Quick check: compression', {
      b: 'Count the moles of gas on each side before deciding.',
      n: 'Quick check. Compressing a gas mixture favours the side with fewer moles of gas. Count the moles of gas on each side of every equation, and pick the equilibrium in which the product side has fewer moles, so that compression increases the amount of product.',
      chk: 'press-mcq',
    }),
    sl('example', 'Worked example: pressure and the degree of dissociation', {
      b: r`**Problem.** At 330 K, $K_p = 0.50$ atm for $\ce{N2O4 <=> 2NO2}$, with $K_p = \dfrac{4\alpha^2P}{1-\alpha^2}$. Find α at $P = 1.0$ atm and at 4.0 atm.

$\alpha = \sqrt{\dfrac{K_p}{K_p + 4P}}$: at 1.0 atm, $\alpha = \sqrt{0.50/4.50} = ${f3(a1)}$; at 4.0 atm, $\alpha = \sqrt{0.50/16.5} = ${f3(a4)}$.`,
      v: table(['Total pressure / atm', 'α', 'Percentage dissociated'], [['0.25', f3(a025), `${f1(a025 * 100)}`], ['1.0', f3(a1), `${f1(a1 * 100)}`], ['4.0', f3(a4), `${f1(a4 * 100)}`]], 'Table of the degree of dissociation of dinitrogen tetroxide at three pressures'),
      n: 'From the expression for Kp in terms of the degree of dissociation, solve for alpha. At one atmosphere it is one third. When the pressure is raised to four atmospheres the degree of dissociation falls to about seventeen percent, so high pressure keeps more nitrogen tetroxide, as Le Chatelier predicts.',
    }),
    sl('diagram', 'Yield of ammonia against pressure and temperature', {
      b: 'In a model for **N₂ + 3H₂ ⇌ 2NH₃** (ΔH = −92.4 kJ, ideal gases), the yield **rises with pressure** and **falls as temperature rises**. Industry uses about **200 atm** and a compromise temperature. Real gases give lower yields than this model.',
      v: V.haber,
      n: 'This graph shows the model yield of ammonia against pressure for three temperatures. At every temperature the yield rises with pressure, because four moles of gas become two. At every pressure the yield is greater at the lower temperature, because the reaction gives out heat. This pushes us towards high pressure and low temperature.',
    }),
    sl('concept', 'Haber process: conditions', {
      b: '**N₂ + 3H₂ ⇌ 2NH₃, ΔH = −92.4 kJ.** Yield is favoured by **high pressure** (about **200 atm**) and **low temperature**, but a low temperature is too slow. **Compromise: about 700–720 K** with **finely divided iron** and a **molybdenum promoter**. **NH₃ is liquefied and removed**; N₂ and H₂ are **recycled**.',
      v: table(['Factor', 'For yield', 'For rate', 'Chosen'], [['Pressure', 'high', 'high', 'about 200 atm'], ['Temperature', 'low (exothermic)', 'high', 'about 700–720 K (compromise)'], ['Catalyst', 'no effect on yield', 'raises rate', 'Fe with Mo promoter'], ['Removing NH₃', 'raises yield', '—', 'liquefy and recycle']], 'Table of the conditions chosen for the Haber process'),
      n: 'In the Haber process the yield is favoured by high pressure and low temperature, but a low temperature makes the reaction too slow. So a compromise of about seven hundred kelvin is used, with finely divided iron as catalyst and molybdenum as promoter. High pressure is used too, and ammonia is removed as a liquid while the unused gases are recycled.',
    }),
    sl('concept', 'Contact process, N₂O₄ and ester equilibria', {
      b: '**Contact process:** 2SO₂ + O₂ ⇌ 2SO₃, ΔH = −196 kJ: about **720–725 K**, **1–2 atm** (conversion is already high), **V₂O₅** catalyst. **N₂O₄ ⇌ 2NO₂ (endothermic, 1 → 2 mol):** maximum NO₂ at **high T, low P**. **Ester hydrolysis (Δn = 0):** **excess water**, remove a product; **pressure has no effect**.',
      v: table(['Equilibrium', 'Favoured by', 'Notes'], [['2SO₂ + O₂ ⇌ 2SO₃ (exothermic, 3 → 2)', 'lower T (but rate), higher P', 'compromise T; V₂O₅; about 1–2 atm'], ['N₂O₄ ⇌ 2NO₂ (endothermic, 1 → 2)', 'high T, low P', 'also inert gas at constant P'], ['Ester + water ⇌ acid + alcohol (Δn = 0)', 'excess water, product removal', 'pressure irrelevant; acid catalyst'], ['Acid + alcohol ⇌ ester + water', 'excess alcohol, remove water', 'conc. H₂SO₄ dehydrates']], 'Table of the conditions for maximum yield in the contact process, N2O4 dissociation and ester equilibria'),
      n: 'In the contact process the conversion of sulphur dioxide to sulphur trioxide is exothermic and reduces the moles of gas. A temperature of about seven hundred twenty kelvin, one to two atmospheres and vanadium pentoxide catalyst give a high conversion. Dissociation of dinitrogen tetroxide is best at high temperature and low pressure. For esters, use excess of one reactant and remove a product.',
    }),
    sl('check', 'Quick check: conditions for ammonia', {
      b: 'Think about both the yield and the rate, and about the catalyst.',
      n: 'Quick check. For ammonia, a high pressure favours the yield because four moles of gas become two. The reaction is exothermic, but too low a temperature is too slow. Pick the option with a high pressure, a compromise temperature and the iron catalyst with its promoter.',
      chk: 'haber-mcq',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        "Le Chatelier: an equilibrium shifts to oppose a change in concentration, temperature or pressure.",
        'Only temperature changes K; a catalyst changes the rate of approach, not the position.',
        'Higher pressure favours fewer moles of gas; no effect if Δn = 0; inert gas shifts the equilibrium only at constant pressure.',
        'Haber: about 200 atm, about 700 K, Fe with Mo; contact: about 720 K, 1–2 atm, V₂O₅.',
        'Esters: excess reactant and removal of a product; pressure has no effect.',
      ],
      v: table(['Change', 'Effect'], [['Concentration', 'shift, K same'], ['Temperature', 'shift and K changes'], ['Pressure', 'shift if Δn ≠ 0'], ['Catalyst', 'faster, same position']], 'Summary table of the effects of changes on equilibrium'),
      n: 'To sum up Part Two. The Le Chatelier principle says that an equilibrium shifts to oppose a disturbance. Only temperature alters the constant. A catalyst speeds up the approach but not the position. High pressure favours fewer moles of gas. Industrial conditions are a compromise between yield and rate.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'Give the reason with every prediction: ΔH sign for temperature, Δn for pressure.',
        'Say "K is unchanged" for concentration, pressure and catalyst; say K changes only with temperature.',
        'For an inert gas, always state constant volume or constant pressure.',
        'For industrial conditions, discuss yield and rate: a compromise temperature, a catalyst for rate.',
        'Quote the catalyst and promoter: Fe with Mo (Haber), V₂O₅ (contact).',
      ],
      v: table(['Slip', 'Fix'], [['Saying a catalyst raises the yield', 'it only speeds up reaching equilibrium'], ['Pressure effect when Δn = 0', 'there is none'], ['Inert gas shifts the equilibrium (constant volume)', 'no shift at constant V'], ['Saying K changes with pressure', 'only temperature changes K']], 'Table of common slips in Part 2 and their fixes'),
      n: 'Some exam tips. Give a reason with each prediction, using the sign of the enthalpy change for temperature and the change in moles of gas for pressure. State that the constant changes only with temperature. For an inert gas say whether the volume or the pressure is constant, and discuss both yield and rate for industrial processes.',
    }),
  ],
});
