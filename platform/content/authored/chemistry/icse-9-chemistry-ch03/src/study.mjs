// ICSE 9 Chemistry ch03 notes and flashcards.
import { T, unit, PROV, table } from '../../icse-9-chemistry-ch01/src/lib.mjs';
import { V } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas: [], visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Chemical Changes and Reactions — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Direct combination reactions',
      `In a **direct combination** reaction two or more substances (elements or compounds) unite to form **one** product.

| Reactants | Equation | Condition and observation |
|---|---|---|
| Iron + sulphur | $\\ce{Fe + S -> FeS}$ | Heat; red glow; black iron(II) sulphide, not attracted by a magnet |
| Magnesium + oxygen | $\\ce{2Mg + O2 -> 2MgO}$ | Heat; dazzling white flame; white ash |
| Carbon + oxygen | $\\ce{C + O2 -> CO2}$ | Heat; colourless gas that turns lime water milky |
| Hydrogen + chlorine | $\\ce{H2 + Cl2 -> 2HCl}$ | Sunlight (or burning in chlorine); hydrogen chloride gas |
| Nitrogen + oxygen | $\\ce{N2 + O2 -> 2NO}$ | Electric spark or very high temperature |
| Quicklime + water | $\\ce{CaO + H2O -> Ca(OH)2}$ | Hissing; much heat; slaked lime |
| Ammonia + hydrogen chloride | $\\ce{NH3 + HCl -> NH4Cl}$ | Dense white fumes of ammonium chloride |

The product is a compound in each case; combinations of elements are also called **synthesis**. A mixture of iron and sulphur can be separated with a magnet, but iron(II) sulphide cannot.`,
      [kt('Direct combination', 'A reaction in which two or more substances unite to form a single product.')],
      table(['Reactants', 'Product'], [['Iron + sulphur', 'Iron(II) sulphide'], ['Magnesium + oxygen', 'Magnesium oxide']], 'Table of two combination reactions'),
      [1],
    ),
    sec(
      '2. Decomposition by heat, light and electricity',
      `In a **decomposition** reaction one compound splits into two or more simpler substances. It needs energy.

**Thermal decomposition (heat)**

| Substance | Equation | What is seen |
|---|---|---|
| Copper(II) carbonate | $\\ce{CuCO3 ->[\\Delta] CuO + CO2}$ | Green powder turns black; gas turns lime water milky |
| Zinc carbonate | $\\ce{ZnCO3 ->[\\Delta] ZnO + CO2}$ | Residue yellow when hot, white when cold |
| Calcium carbonate | $\\ce{CaCO3 ->[\\Delta] CaO + CO2}$ | White solid; needs strong heating |
| Zinc nitrate | $\\ce{2Zn(NO3)2 ->[\\Delta] 2ZnO + 4NO2 + O2}$ | Brown fumes; residue yellow hot, white cold |
| Lead(II) nitrate | $\\ce{2Pb(NO3)2 ->[\\Delta] 2PbO + 4NO2 + O2}$ | Crackling; brown fumes; yellow residue |
| Potassium chlorate | $\\ce{2KClO3 ->[\\Delta] 2KCl + 3O2}$ | Oxygen (relights a glowing splint); manganese dioxide speeds it |
| Ammonium chloride | $\\ce{NH4Cl ->[\\Delta] NH3 + HCl}$ | White solid disappears and re-forms on the cool part of the tube |

**Photo decomposition (light):** $\\ce{2AgCl ->[light] 2Ag + Cl2}$; white silver chloride turns grey. Silver bromide behaves in the same way ($\\ce{2AgBr ->[light] 2Ag + Br2}$), so these salts are kept in dark bottles and are used in photographic film.

**Electrolytic decomposition (electricity):** $\\ce{2H2O ->[electricity] 2H2 + O2}$ for acidified water: hydrogen at the cathode and oxygen at the anode in the volume ratio 2 : 1. Molten lead(II) bromide gives lead at the cathode and bromine at the anode.

Mercury(II) oxide breaks down into mercury and oxygen on heating, but mercury is toxic, so it is not done in school laboratories.`,
      [kt('Decomposition', 'A reaction in which one compound breaks down into two or more simpler substances.'), kt('Electrolysis', 'Decomposition of a compound by passing an electric current through it in the molten or dissolved state.')],
      V.elec,
      [2],
    ),
    sec(
      '3. Displacement reactions and reactivity',
      `In a **displacement** reaction a more reactive element takes the place of a less reactive one in a compound. For metals the order of reactivity is the **activity series**:

K, Na, Ca, Mg, Al, Zn, Fe, Pb, (H), Cu, Hg, Ag, Au (most to least reactive).

A metal displaces any metal **below** it from a solution of its salt, and not one above it.

| Metal | Salt solution | Equation and observation |
|---|---|---|
| Zinc | Copper(II) sulphate | $\\ce{Zn + CuSO4 -> ZnSO4 + Cu}$; blue colour fades; reddish-brown copper |
| Iron | Copper(II) sulphate | $\\ce{Fe + CuSO4 -> FeSO4 + Cu}$; blue changes to pale green; copper on the nail |
| Copper | Silver nitrate | $\\ce{Cu + 2AgNO3 -> Cu(NO3)2 + 2Ag}$; silver crystals; solution turns blue |
| Magnesium | Iron(II) sulphate | $\\ce{Mg + FeSO4 -> MgSO4 + Fe}$; pale green fades |
| Copper | Zinc sulphate | No reaction: copper is below zinc |

The more reactive metal goes into solution as its ion; the less reactive metal is deposited. Reactive metals such as sodium and potassium react with water, so they are not used in salt-solution displacement.`,
      [kt('Displacement reaction', 'A reaction in which a more reactive element displaces a less reactive element from its compound.'), kt('Activity series', 'The list of metals in order of their reactivity, from most to least reactive.')],
      V.activity,
      [3],
    ),
    sec(
      '4. Double decomposition (double displacement)',
      `In **double decomposition** two compounds, usually in solution, exchange their positive and negative parts: AB + CD → AD + CB. When one product is **insoluble**, it settles as a **precipitate**.

| Mix | Equation | Precipitate and colour |
|---|---|---|
| Sodium sulphate + barium chloride | $\\ce{Na2SO4 + BaCl2 -> BaSO4 v + 2NaCl}$ | Barium sulphate: **white** |
| Silver nitrate + sodium chloride | $\\ce{AgNO3 + NaCl -> AgCl v + NaNO3}$ | Silver chloride: **white, curdy**; turns grey in light |
| Lead nitrate + potassium iodide | $\\ce{Pb(NO3)2 + 2KI -> PbI2 v + 2KNO3}$ | Lead iodide: **yellow** |

The colour of the precipitate helps to identify the ions: a white precipitate with barium chloride shows sulphate, a white curdy one with silver nitrate shows chloride and a yellow one with lead nitrate shows iodide. Books describe the lead iodide precipitate as bright yellow and the barium sulphate as fine white; both are insoluble in water.`,
      [kt('Precipitate', 'An insoluble solid formed when two solutions are mixed.'), kt('Double decomposition', 'A reaction in which two compounds exchange their positive and negative parts.')],
      V.ppt,
      [4],
    ),
    sec(
      '5. Energy changes in reactions',
      `Every chemical change involves a change of energy.

- An **exothermic** reaction **gives out** energy (heat, light or electricity) to the surroundings: the temperature of the mixture rises.
- An **endothermic** reaction **takes in** energy from the surroundings: the temperature falls, or energy must be supplied.

| Energy | Evolved (exothermic) | Absorbed (endothermic) |
|---|---|---|
| Heat | Burning of carbon and fuels; quicklime with water; acid with alkali (neutralisation); respiration | Heating calcium carbonate; $\\ce{N2 + O2 -> 2NO}$ at a high temperature |
| Light | Burning magnesium (dazzling white light) | Photosynthesis; silver chloride and bromide in sunlight |
| Electricity | A cell, such as a dry cell or a zinc and copper cell | Electrolysis of water or molten lead(II) bromide |

Photosynthesis: $\\ce{6CO2 + 6H2O -> C6H12O6 + 6O2}$ takes in light; respiration: $\\ce{C6H12O6 + 6O2 -> 6CO2 + 6H2O}$ gives out energy. Baking soda with citric acid is a safe endothermic reaction: the cup turns cold.`,
      [kt('Exothermic reaction', 'A reaction that gives out energy (as heat, light or electricity) to the surroundings.'), kt('Endothermic reaction', 'A reaction that takes in energy from the surroundings.')],
      table(['Observation', 'Type'], [['Temperature rises', 'Exothermic'], ['Temperature falls', 'Endothermic']], 'Table linking temperature change with the type of reaction'),
      [5],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Not saying which form of energy (heat, light or electricity) causes a decomposition.
- Writing the precipitate colour wrongly: silver chloride is white and curdy, not yellow; lead iodide is yellow.
- Predicting that a metal displaces one that is higher in the series.
- Forgetting the 2 in 2NaCl, 2KI or 2AgNO₃ when balancing.
- Writing hydrogen at the anode in the electrolysis of acidified water (it is at the cathode).
- Calling a reaction exothermic because it needs heating to start; look at the net energy change.

**How marks are usually awarded**
- 1 mark: a balanced equation, a colour, an observation or a name.
- 2 marks: an equation with one observation, or a prediction with its reason.
- 3 marks: three equations or three observations; a labelled diagram.
- 10-mark structured question: a situation or an experiment with parts of 2 to 4 marks; balanced equations, observations and a diagram.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'What is a direct combination reaction?', 'Two or more substances unite to form a single product.', 'definition', 1),
    fc(2, 'Iron + sulphur on heating: equation and product?', 'Fe + S → FeS; black iron(II) sulphide that a magnet does not attract.', 'example', 1),
    fc(3, 'Magnesium burning in air: equation and observation?', '2Mg + O₂ → 2MgO; dazzling white flame, white ash.', 'example', 1),
    fc(4, 'Hydrogen + chlorine: equation?', 'H₂ + Cl₂ → 2HCl.', 'example', 1),
    fc(5, 'Nitrogen + oxygen: condition and equation?', 'Electric spark; N₂ + O₂ → 2NO.', 'example', 1),
    fc(6, 'Quicklime + water: equation and observation?', 'CaO + H₂O → Ca(OH)₂; hissing and much heat.', 'example', 1),
    fc(7, 'What is a decomposition reaction?', 'One compound splits into two or more simpler substances.', 'definition', 2),
    fc(8, 'Three forms of energy for decomposition?', 'Heat, light and electricity.', 'fact', 2),
    fc(9, 'Heating green copper(II) carbonate: equation and colour change?', 'CuCO₃ → CuO + CO₂; green turns black.', 'example', 2),
    fc(10, 'Heating zinc carbonate or zinc nitrate: the residue?', 'Zinc oxide: yellow when hot, white when cold.', 'fact', 2),
    fc(11, 'Heating lead(II) nitrate: observations?', 'Crackling, brown fumes of nitrogen dioxide, yellow residue of lead(II) oxide.', 'fact', 2),
    fc(12, 'Balanced equation for heating zinc nitrate?', '2Zn(NO₃)₂ → 2ZnO + 4NO₂ + O₂.', 'formula', 2),
    fc(13, 'Photo decomposition of silver chloride: equation and observation?', '2AgCl → 2Ag + Cl₂; white turns grey.', 'example', 2),
    fc(14, 'Why are silver salts kept in dark bottles?', 'Light decomposes them to silver.', 'concept', 2),
    fc(15, 'Electrolysis of acidified water: what collects where?', 'Hydrogen at the cathode, oxygen at the anode, in the volume ratio 2 : 1.', 'fact', 2),
    fc(16, 'What is a displacement reaction?', 'A more reactive element displaces a less reactive element from its compound.', 'definition', 3),
    fc(17, 'Order of reactivity of Zn, Fe, Cu, Ag, Mg?', 'Mg > Zn > Fe > Cu > Ag.', 'fact', 3),
    fc(18, 'Zinc in copper(II) sulphate: equation and observation?', 'Zn + CuSO₄ → ZnSO₄ + Cu; blue fades, reddish-brown copper.', 'example', 3),
    fc(19, 'Copper in silver nitrate: equation and observation?', 'Cu + 2AgNO₃ → Cu(NO₃)₂ + 2Ag; silver crystals, solution turns blue.', 'example', 3),
    fc(20, 'Does copper displace zinc from zinc sulphate?', 'No: copper is below zinc in the activity series.', 'concept', 3),
    fc(21, 'What is double decomposition?', 'Two compounds exchange their positive and negative parts: AB + CD → AD + CB.', 'definition', 4),
    fc(22, 'What is a precipitate?', 'An insoluble solid formed when two solutions are mixed.', 'definition', 4),
    fc(23, 'Sodium sulphate + barium chloride: precipitate and colour?', 'Barium sulphate, white.', 'fact', 4),
    fc(24, 'Silver nitrate + sodium chloride: precipitate and colour?', 'Silver chloride, white and curdy.', 'fact', 4),
    fc(25, 'Lead nitrate + potassium iodide: precipitate and colour?', 'Lead iodide, yellow.', 'fact', 4),
    fc(26, 'Balanced equation: lead nitrate + potassium iodide?', 'Pb(NO₃)₂ + 2KI → PbI₂ + 2KNO₃.', 'formula', 4),
    fc(27, 'Exothermic and endothermic reactions?', 'Exothermic gives out energy; endothermic takes in energy.', 'definition', 5),
    fc(28, 'Two exothermic reactions?', 'Burning carbon, quicklime with water (also neutralisation, respiration).', 'example', 5),
    fc(29, 'Two endothermic reactions?', 'Heating calcium carbonate; photosynthesis (also electrolysis).', 'example', 5),
    fc(30, 'Exam tip: temperature data', 'A rise in temperature means exothermic; a fall means endothermic.', 'exam-tip', 5),
  ],
  status: 'draft',
  provenance: PROV,
};
