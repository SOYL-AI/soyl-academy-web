// ICSE 9 Chemistry ch13 notes and flashcards. Time-sensitive points are marked "as of 2026" and listed in the README.
import { T, unit, PROV, r } from '../../icse-9-chemistry-ch01/src/lib.mjs';
import { V } from './decks.mjs';
import * as K from './calc.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Atmospheric and Environmental Chemistry — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Acid rain',
      r`**Acid rain** is rain that is more acidic than normal rain (normal rain is slightly acidic because of dissolved carbon dioxide). It forms when **oxides of sulphur and nitrogen** dissolve in the water droplets of clouds.

**Sources.** Sulphur dioxide: burning fossil fuels (coal, oil) that contain sulphur; roasting sulphide ores; volcanoes. Oxides of nitrogen: the very high temperature inside petrol and diesel engines, furnaces and power stations, where nitrogen and oxygen of the air combine; also lightning.

**Equations (oxides of sulphur):**
- $\ce{S + O2 -> SO2}$
- $\ce{SO2 + H2O -> H2SO3}$ (sulphurous acid)
- $\ce{2SO2 + O2 -> 2SO3}$ (oxidation in air, helped by dust and other pollutants)
- $\ce{SO3 + H2O -> H2SO4}$ (sulphuric acid)

**Equations (oxides of nitrogen):**
- $\ce{N2 + O2 ->[\text{very high temperature}] 2NO}$
- $\ce{2NO + O2 -> 2NO2}$ (brown gas)
- $\ce{4NO2 + O2 + 2H2O -> 4HNO3}$ (nitric acid). Some books write $\ce{3NO2 + H2O -> 2HNO3 + NO}$ instead; both are accepted.

**Effects.** *Soil:* washes out nutrients such as calcium and magnesium, harms plants and soil organisms. *Water bodies:* lakes and rivers become too acidic for fish eggs, fish and many water plants. *Buildings:* marble and limestone are attacked, for example $\ce{CaCO3 + H2SO4 -> CaSO4 + H2O + CO2}$.

**Reducing acid rain:** fuels with less sulphur (as of 2026, Indian petrol and diesel meet the very low sulphur limits of Bharat Stage VI), removing sulphur dioxide from chimney gases, catalytic converters in vehicles, and cleaner energy.`,
      [kt('Acid rain', 'Rain made more acidic by dissolved oxides of sulphur and nitrogen, giving sulphurous, sulphuric and nitric acids.')],
      [fm(r`\ce{SO2 + H2O -> H2SO3}`, 'Sulphurous acid'), fm(r`\ce{SO3 + H2O -> H2SO4}`, 'Sulphuric acid'), fm(r`\ce{4NO2 + O2 + 2H2O -> 4HNO3}`, 'Nitric acid')],
      V.acid,
      [1],
    ),
    sec(
      '2. Global warming: greenhouse gases and their sources',
      r`The **greenhouse effect**: sunlight passes through the atmosphere and warms the ground. The ground gives out heat as **infrared radiation**. **Greenhouse gases** absorb part of it and send some back to the ground, so the Earth is warmer than it would be without them. This natural effect makes life possible. **Global warming** is the extra warming caused by human activities that increase these gases.

| Greenhouse gas | Chief sources |
|---|---|
| Water vapour | Evaporation from oceans, lakes and plants |
| Carbon dioxide | Burning fossil fuels, cement making, clearing forests, respiration and decay |
| Methane | Wetlands, cattle and other grazing animals, coal mining, leaks from natural gas supplies, waste dumps |
| Oxides of nitrogen (nitrous oxide) | Fertilised farmland, burning fuels, vehicle engines |

Burning carbon in fuel: $\ce{C + O2 -> CO2}$. Making cement from limestone: $\ce{CaCO3 ->[\Delta] CaO + CO2}$.

**Measures to reduce emissions:** save energy; use solar, wind and hydro power; use public transport and share journeys; plant trees and stop clearing forests; reduce waste and manage fertiliser and manure use.

**Time-sensitive points (as of 2026):** the carbon dioxide level in the air is above 420 parts per million, compared with about 280 parts per million before the Industrial Revolution; the average surface temperature of the Earth has risen by roughly 1.2 °C or more since the late 1800s. Figures change every year; check the latest scientific reports.`,
      [kt('Greenhouse gas', 'A gas that absorbs infrared radiation from the ground and sends part of it back, warming the Earth.'), kt('Global warming', 'The rise in the average temperature of the Earth caused by increased greenhouse gases.')],
      [fm(r`\ce{C + O2 -> CO2}`, 'Burning carbon in fuel'), fm(r`\ce{CaCO3 ->[\Delta] CaO + CO2}`, 'Making cement from limestone')],
      V.greenhouse,
      [2],
    ),
    sec(
      '3. The ozone layer',
      r`**Ozone** ($\ce{O3}$) is a form of oxygen with three atoms in each molecule. Most of it lies in a band inside the **stratosphere**.

**Formation** (in the upper atmosphere, with ultraviolet radiation):
- $\ce{O2 ->[UV] 2O}$ (oxygen molecules are split into atoms)
- $\ce{O + O2 -> O3}$ (an atom joins an oxygen molecule)
- overall: $\ce{3O2 -> 2O3}$

**Function:** it absorbs the harmful **ultraviolet radiation** of the Sun, so less reaches the ground. Without it there would be more skin cancer and eye cataracts, damage to crops, and harm to plankton.

**Depletion by named chemicals** (only the names are required; their reactions are not part of this course): **chlorofluorocarbons (CFCs)** from old refrigerators, air conditioners, aerosol sprays and foams; **halons** from fire extinguishers; **carbon tetrachloride**; **methyl bromide**. The "ozone hole" is a large seasonal thinning of the layer over Antarctica.

**Time-sensitive point (as of 2026):** under the Montreal Protocol (1987) these chemicals have been phased out and the ozone layer is slowly recovering; full recovery is expected only around the middle of the century. Do not confuse the ozone hole (ultraviolet radiation) with global warming (infrared radiation).`,
      [kt('Ozone layer', 'A band of ozone in the stratosphere that absorbs harmful ultraviolet radiation from the Sun.'), kt('CFCs', 'Chlorofluorocarbons: man-made chemicals that deplete the ozone layer.')],
      [fm(r`\ce{O2 ->[UV] 2O}`, 'Ultraviolet radiation splits oxygen'), fm(r`\ce{O + O2 -> O3}`, 'Ozone forms'), fm(r`\ce{3O2 -> 2O3}`, 'Overall')],
      V.ozone,
      [3],
    ),
    sec(
      '4. Composition of natural water: dissolved oxygen and minerals',
      r`Natural water carries dissolved substances that living things need.

| Dissolved substance | Why it is needed |
|---|---|
| Oxygen | Fish and other water animals breathe it; bacteria use it to break down wastes |
| Carbon dioxide | Water plants use it in photosynthesis |
| Calcium and magnesium salts | Bones, teeth and shells |
| Sodium and potassium salts | Balance of body fluids; working of nerves |
| Nitrates and phosphates, in small amounts | Plant nutrients for water plants |

**Dissolved oxygen falls as water gets warmer**, because gases are less soluble in warm water. Approximate textbook values for fresh water in contact with air at sea-level pressure: ${K.DO.map(([t, d]) => `${d} mg per litre at ${t} °C`).join('; ')}. Many fish need at least about ${K.FISH_MIN} mg per litre (the value depends on the species). Dissolved oxygen is also reduced when bacteria decay large amounts of waste.

Books differ slightly in the solubility values; the trend (a fall with temperature) is what is examined.`,
      [kt('Dissolved oxygen', 'Oxygen gas dissolved in water, needed by aquatic animals and bacteria.')],
      [],
      V.doPlot,
      [4],
    ),
    sec(
      '5. Harmful substances in water: heavy metals, plastics, sewage and pesticides',
      r`**Toxic heavy metals — Minamata disease.** In the 1950s, a factory at Minamata Bay in Japan discharged waste containing **mercury** into the sea. Microbes changed it into **methylmercury**, which is absorbed by plankton and small fish and **builds up along the food chain**, reaching high amounts in large fish and shellfish. People who ate them developed **damage to the nervous system**: numbness, loss of coordination, and trouble with speech, sight and hearing; in severe cases paralysis, and harm to babies before birth. Other toxic heavy metals include lead, cadmium and arsenic. As of 2026, an international treaty (the Minamata Convention on Mercury, in force since 2017) controls mercury.

**Plastics.** They do not rot, so they stay for hundreds of years; they block drains, are swallowed by or tangle round fish, turtles and birds, and break into tiny pieces. As of 2026, India bans a list of single-use plastic items (in force since 2022).

**Sewage.** Untreated sewage carries disease germs and adds **nitrates and phosphates**. These make algae multiply (algal bloom). When the algae die, bacteria decay them and use up the **dissolved oxygen**, so fish and other animals die.

**Pesticides.** Washed from fields, they poison fish and other animals that were not the target, and may build up along food chains.

Exact figures for fish and mercury limits differ between countries; items use imagined figures.`,
      [kt('Minamata disease', 'A nerve disease caused by eating fish and shellfish contaminated with methylmercury from industrial mercury waste.'), kt('Sewage', 'Waste water from homes and towns containing human waste, germs and nutrients.')],
      [],
      null,
      [5],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Writing acid-rain equations that do not balance, or naming **sulphuric** acid for sulphur dioxide plus water (that gives **sulphurous** acid).
- Mixing up the **greenhouse effect** (infrared heat trapped by greenhouse gases) with **ozone depletion** (more ultraviolet radiation).
- Saying that CFCs cause global warming instead of ozone depletion; or that ozone is formed from nitrogen.
- Giving reactions of the ozone-depleting chemicals: only their **names** are needed.
- Saying "mercury" without the food chain in a Minamata answer: it is **methylmercury building up** in fish.
- Forgetting the sequence for sewage: **nutrients, algae, bacteria, low dissolved oxygen, dead fish**.

**How marks are usually awarded**
- 1 mark: a name, a gas, one effect or one equation.
- 2 marks: two effects, two sources, or an equation with a name.
- 3 marks: three equations, or three points with reasons.
- 10-mark structured question: a diagram or data set followed by parts such as equations, names, causes, effects and a calculation.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Which gases cause acid rain?', 'Oxides of sulphur and nitrogen: sulphur dioxide and nitrogen dioxide.', 'fact', 1),
    fc(2, 'Source of sulphur dioxide?', 'Burning coal and oil that contain sulphur; roasting sulphide ores.', 'fact', 1),
    fc(3, 'How do oxides of nitrogen form in engines?', 'Nitrogen and oxygen of the air combine at very high temperature.', 'concept', 1),
    fc(4, 'Sulphur dioxide with water?', 'SO₂ + H₂O → H₂SO₃ (sulphurous acid).', 'formula', 1),
    fc(5, 'Sulphur trioxide with water?', 'SO₃ + H₂O → H₂SO₄ (sulphuric acid).', 'formula', 1),
    fc(6, 'Oxidation of sulphur dioxide in air?', '2SO₂ + O₂ → 2SO₃', 'formula', 1),
    fc(7, 'Formation of nitric oxide?', 'N₂ + O₂ → 2NO (very high temperature).', 'formula', 1),
    fc(8, 'Formation of nitric acid in rain?', '4NO₂ + O₂ + 2H₂O → 4HNO₃', 'formula', 1),
    fc(9, 'Effect of acid rain on soil?', 'Washes out nutrients such as calcium and magnesium; harms plants.', 'fact', 1),
    fc(10, 'Effect of acid rain on lakes?', 'Water becomes too acidic for fish and plants.', 'fact', 1),
    fc(11, 'Why does acid rain damage marble?', 'Calcium carbonate reacts with the acids: CaCO₃ + H₂SO₄ → CaSO₄ + H₂O + CO₂.', 'concept', 1),
    fc(12, 'Name the greenhouse gases.', 'Water vapour, carbon dioxide, methane and oxides of nitrogen.', 'fact', 2),
    fc(13, 'How do greenhouse gases warm the Earth?', 'They absorb infrared radiation from the ground and send part of it back.', 'concept', 2),
    fc(14, 'Main sources of carbon dioxide?', 'Burning fossil fuels, cement making and clearing forests.', 'fact', 2),
    fc(15, 'Sources of methane?', 'Wetlands, cattle, coal mining, natural gas leaks and waste dumps.', 'fact', 2),
    fc(16, 'Source of nitrous oxide?', 'Fertilised farmland and burning fuels.', 'fact', 2),
    fc(17, 'Two ways to reduce greenhouse gases?', 'Use solar or wind power; plant trees (also save energy, use public transport).', 'exam-tip', 2),
    fc(18, 'What is ozone?', 'A form of oxygen with three atoms per molecule, O₃.', 'definition', 3),
    fc(19, 'First step in forming ozone?', 'O₂ → O + O (with ultraviolet radiation).', 'formula', 3),
    fc(20, 'Second step in forming ozone?', 'O + O₂ → O₃', 'formula', 3),
    fc(21, 'Function of the ozone layer?', 'It absorbs harmful ultraviolet radiation from the Sun.', 'fact', 3),
    fc(22, 'Name chemicals that deplete the ozone layer.', 'CFCs, halons, carbon tetrachloride, methyl bromide (names only).', 'fact', 3),
    fc(23, 'One harm from extra ultraviolet radiation?', 'Skin cancer or eye cataracts (also crop damage).', 'fact', 3),
    fc(24, 'Why does water need dissolved oxygen?', 'Fish and other water animals breathe it; bacteria use it.', 'concept', 4),
    fc(25, 'Effect of temperature on dissolved oxygen?', 'Warm water holds less dissolved oxygen.', 'fact', 4),
    fc(26, 'Why are minerals in water useful?', 'Calcium and magnesium build bones, teeth and shells; sodium and potassium balance body fluids.', 'fact', 4),
    fc(27, 'What caused Minamata disease?', 'Methylmercury from mercury waste, built up in fish and shellfish eaten by people.', 'concept', 5),
    fc(28, 'Why are plastics harmful in water?', 'They do not rot, block drains and are swallowed by animals.', 'fact', 5),
    fc(29, 'How does sewage reduce dissolved oxygen?', 'Nutrients make algae grow; dead algae are decayed by bacteria, which use up oxygen.', 'concept', 5),
    fc(30, 'Why are pesticides a danger in water?', 'They poison fish and other animals and build up in food chains.', 'fact', 5),
  ],
  status: 'draft',
  provenance: PROV,
};
