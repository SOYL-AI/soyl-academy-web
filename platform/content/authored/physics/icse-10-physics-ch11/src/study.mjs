// ICSE 10 Physics ch11 Calorimetry — notes and flashcards.
import { T, table, unit, PROV, r } from './lib.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Calorimetry — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Heat, temperature, heat capacity and specific heat capacity',
      r`- **Heat:** energy flowing from hot to cold; unit J (1 cal ≈ 4.2 J). **Temperature:** degree of hotness; unit K (°C in practice; a change of 1 °C = 1 K).
- **Heat capacity** $C$: heat to raise the temperature of a body by 1 K; unit J K⁻¹; depends on mass and material.
- **Specific heat capacity** $c$: heat to raise 1 kg by 1 K; unit J kg⁻¹ K⁻¹; depends only on material. Water 4200, ice 2100, aluminium 900, copper 400.
- $C = mc$; $Q = mc\,\Delta T$.`,
      [kt('Heat capacity', 'The heat required to raise the temperature of a body by one kelvin.'), kt('Specific heat capacity', 'The heat required to raise the temperature of unit mass of a substance by one kelvin.')],
      [fm(r`Q = mc\,\Delta T`, 'Heat for a temperature change'), fm(r`C = mc`, 'Heat capacity')],
      table(['Substance', 'c (J kg⁻¹ K⁻¹)'], [['Water', '4200'], ['Ice', '2100'], ['Copper', '400']], 'Table of specific heat capacities'),
      [1],
    ),
    sec(
      '2. Method of mixtures',
      r`**Principle:** when hot and cold bodies are mixed and no heat is lost to the surroundings, heat lost by the hot body = heat gained by the cold body.

$m_1 c_1 (T_1 - T) = m_2 c_2 (T - T_2)$ (+ $m_{cal} c_{cal} (T - T_2)$ for the calorimeter).

A calorimeter is a thin polished copper vessel (low heat capacity, good conductor, polished to reduce radiation) in an insulating jacket, with stirrer and thermometer.`,
      [kt('Principle of method of mixtures', 'Heat lost by the hot body equals heat gained by the cold body, provided no heat is exchanged with the surroundings.'), kt('Calorimeter', 'A vessel, usually of polished copper in an insulating jacket, used to measure heat exchanged.')],
      [fm(r`m_1 c_1 (T_1 - T) = m_2 c_2 (T - T_2)`, 'Mixtures')],
      table(['Hot body', 'Cold body'], [['Loses heat', 'Gains heat'], ['T₁ → T', 'T₂ → T']], 'Table of the two sides of a mixture'),
      [2],
    ),
    sec(
      '3. High specific heat capacity of water',
      `Water warms and cools slowly. Consequences and uses:
- **Sea breeze** by day (land hotter), **land breeze** at night (sea warmer).
- Coastal climates are moderate; inland deserts have extreme days and nights.
- **Coolant** in car radiators, power stations; **hot-water bottles**.
- **Farmers flood fields** on frosty nights; water gives out heat as it cools.
- Body temperature stays steady (body is mostly water).`,
      [kt('Sea breeze', 'A cool daytime wind blowing from the sea to the land, because land heats faster than water.')],
      [],
      table(['Effect', 'Reason'], [['Sea breeze by day', 'Land heats faster'], ['Land breeze at night', 'Land cools faster'], ['Radiator coolant', 'Absorbs much heat per degree']], 'Table of effects of water’s high specific heat capacity'),
      [3],
    ),
    sec(
      '4. Change of state and latent heat of fusion',
      r`A pure substance changes state at a fixed temperature (ice melts at 0 °C at normal pressure). Heat absorbed during melting separates the molecules and does not raise the temperature.

**Specific latent heat of fusion** $L$: heat to change 1 kg of solid at its melting point into liquid at the same temperature. Ice: $L = 336\,000\ \text{J kg}^{-1}$ (336 J g⁻¹). $Q = mL$.

**Heating curve** (ice → steam): sloping parts $Q = mc\Delta T$; flat parts at 0 °C (melting) and 100 °C (boiling) are latent heat.`,
      [kt('Specific latent heat of fusion', 'The heat required to convert unit mass of a solid at its melting point into liquid at the same temperature.'), kt('Melting point', 'The fixed temperature at which a pure solid changes into liquid at a given pressure.')],
      [fm(r`Q = mL`, 'Heat for melting')],
      table(['Part of curve', 'Formula'], [['Ice warming', 'mc_ice ΔT'], ['Melting', 'mL'], ['Water warming', 'mc_water ΔT']], 'Table of heating curve parts and formulae'),
      [4],
    ),
    sec(
      '5. Everyday effects of latent heat of fusion',
      `- **Ice at 0 °C cools better than water at 0 °C:** each kilogram absorbs 336 000 J to melt before warming.
- **Snow on mountains melts slowly**, so rivers keep flowing in summer.
- **Ponds and lakes freeze slowly**: a lot of heat must be removed first.
- **Frozen food and ice-cream** stay cold longer.
- Freezing water gives out heat: trays of water in a cellar protect stored vegetables from frost.`,
      [kt('Latent heat', 'Heat absorbed or given out during a change of state without any change in temperature.')],
      [],
      table(['Coolant at 0 °C', 'Heat absorbed per kg before warming'], [['Water', '0'], ['Ice', '336 000 J']], 'Table comparing ice and water at zero degrees as coolants'),
      [5],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Using grams with c in J kg⁻¹ K⁻¹.
- Forgetting to warm the melted ice after it melts.
- Saying temperature rises while ice melts.
- Mixing up heat capacity (J K⁻¹) and specific heat capacity (J kg⁻¹ K⁻¹).

**How marks are usually awarded**
- Mixture problems (3–4 marks): heat lost written, heat gained written, equation, answer with unit.
- Explanations (1–2 marks): name specific heat capacity or latent heat and say what it does.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Heat?', 'Energy flowing from a hotter to a colder body.', 'definition', 1),
    fc(2, 'SI unit of temperature?', 'Kelvin.', 'fact', 1),
    fc(3, '1 calorie in joules?', 'About 4.2 J.', 'fact', 1),
    fc(4, 'Heat capacity?', 'Heat to raise a body by 1 K; J K⁻¹.', 'definition', 1),
    fc(5, 'Specific heat capacity?', 'Heat to raise 1 kg by 1 K; J kg⁻¹ K⁻¹.', 'definition', 1),
    fc(6, 'Relation between C and c?', 'C = mc.', 'formula', 1),
    fc(7, 'Heat for a temperature rise?', 'Q = mcΔT.', 'formula', 1),
    fc(8, 'c of water?', '4200 J kg⁻¹ K⁻¹.', 'fact', 1),
    fc(9, 'Principle of mixtures?', 'Heat lost = heat gained (no loss to surroundings).', 'definition', 2),
    fc(10, 'Why is a calorimeter made of copper?', 'Good conductor with low specific heat capacity.', 'concept', 2),
    fc(11, 'Why is a calorimeter polished?', 'To reduce heat loss by radiation.', 'concept', 2),
    fc(12, 'Equal masses of water at 20 °C and 60 °C mixed?', '40 °C.', 'example', 2),
    fc(13, 'Sea breeze blows when?', 'By day, from sea to land.', 'fact', 3),
    fc(14, 'Why do coastal places have mild climates?', 'Sea water heats and cools slowly.', 'concept', 3),
    fc(15, 'Why is water used in car radiators?', 'High specific heat capacity: absorbs much heat.', 'concept', 3),
    fc(16, 'Why do farmers flood fields on frosty nights?', 'Water releases heat as it cools, protecting crops.', 'concept', 3),
    fc(17, 'Latent heat?', 'Heat absorbed or released during a change of state at constant temperature.', 'definition', 4),
    fc(18, 'Specific latent heat of fusion?', 'Heat to melt 1 kg at its melting point.', 'definition', 4),
    fc(19, 'L of ice?', '336 000 J kg⁻¹ (336 J g⁻¹).', 'fact', 4),
    fc(20, 'Heat to melt mass m?', 'Q = mL.', 'formula', 4),
    fc(21, 'Flat parts of a heating curve?', 'Changes of state at constant temperature.', 'concept', 4),
    fc(22, 'Temperature while ice melts?', 'Stays at 0 °C.', 'fact', 4),
    fc(23, 'Unit of specific latent heat?', 'J kg⁻¹.', 'fact', 4),
    fc(24, 'Heat given out when water freezes?', 'Equal to mL.', 'fact', 4),
    fc(25, 'Why does ice at 0 °C cool better than water at 0 °C?', 'It must first absorb latent heat to melt.', 'concept', 5),
    fc(26, 'Why does snow melt slowly?', 'Large latent heat of fusion needed.', 'concept', 5),
    fc(27, 'Why do lakes freeze slowly?', 'Much latent heat must be removed.', 'concept', 5),
    fc(28, 'Heat to melt 10 g of ice?', '3360 J.', 'example', 4),
    fc(29, 'Heat to warm 1 kg water by 10 °C?', '42 000 J.', 'example', 1),
    fc(30, 'Exam tip: ice in water', 'Melt the ice (mL), then warm the melted water (mcT).', 'exam-tip', 4),
  ],
  status: 'draft',
  provenance: PROV,
};
