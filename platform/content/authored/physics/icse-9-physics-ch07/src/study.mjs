// ICSE 9 Physics ch07 Heat and Energy: notes and flashcards.
import { T, table, unit, PROV, r } from '../../icse-9-physics-ch01/src/lib.mjs';
import { V0, V4, V10, D2_ENG } from './calc.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Heat and Energy — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Heat and temperature; the joule and the calorie',
      r`**Heat** is a form of **energy** that flows from a body at a higher temperature to one at a lower temperature. **Temperature** is the **degree of hotness** of a body; it decides the direction of the flow of heat. Two bodies at the same temperature do not exchange heat. A lake and a cup of water at the same temperature are equally hot, but the lake holds far more heat because it has far more mass.

- **SI unit of heat:** joule (J). **Calorie (cal):** the heat needed to raise the temperature of 1 g of water by 1 °C. **1 cal = 4.186 J**. 1 kilocalorie (kcal) $= 1000$ cal $= 4186$ J; the "Calorie" on a food label is the kilocalorie.
- **SI unit of temperature:** kelvin (K); in daily life, degree Celsius (°C). A thermometer measures temperature.
- By the definition of the calorie, heating $m$ grams of water through $\Delta t$ °C needs $m \times \Delta t$ cal (if no heat is lost). Heat capacities and specific heat are taken up in Class X and are not needed here.`,
      [kt('Heat', 'A form of energy that flows from a hotter body to a colder body.'), kt('Temperature', 'The degree of hotness of a body; it decides the direction of heat flow.'), kt('Calorie', 'The heat needed to raise the temperature of 1 g of water by 1 °C; 1 cal = 4.186 J.')],
      [fm(r`1\ \text{cal} = 4.186\ \text{J}`, 'The calorie in joules')],
      table(['', 'Heat', 'Temperature'], [['What it is', 'Energy in transit', 'Degree of hotness'], ['SI unit', 'joule', 'kelvin'], ['Instrument', 'Calorimeter', 'Thermometer']], 'Table comparing heat and temperature'),
      [1],
    ),
    sec(
      '2. Anomalous expansion of water',
      r`Most liquids expand when heated. **Water between 0 °C and 4 °C is an exception:** its volume **decreases** when it is heated from 0 °C to 4 °C, and increases only above 4 °C. This is the **anomalous expansion of water**.

- **At 4 °C** a given mass of water has its **minimum volume** and its **maximum density** (about 1000 kg m⁻³; more exactly 999.97 kg m⁻³).
- **Graphs, 0 °C to 10 °C:** the **volume-temperature** graph is a **dip** with its lowest point at 4 °C; the **density-temperature** graph is a **hump** with its highest point at 4 °C. They are mirror images because density = mass ÷ volume. For 1 kg of water the volume is about ${V0} cm³ at 0 °C, ${V4} cm³ at 4 °C and ${V10} cm³ at 10 °C. The changes are very small, so the vertical scale of the graphs is stretched.
- Water at 0 °C is **less dense than water at 4 °C**, and **ice is less dense than water**, so ice floats.
- The tabulated values differ slightly between books (4 °C is the rounded value of 3.98 °C).`,
      [kt('Anomalous expansion', 'The unusual behaviour of water, which contracts on heating from 0 °C to 4 °C instead of expanding.')],
      [],
      table(['Temperature range', 'On heating, volume', 'Density'], [['0 °C to 4 °C', 'Decreases', 'Increases'], ['At 4 °C', 'Minimum', 'Maximum'], ['Above 4 °C', 'Increases', 'Decreases']], 'Table of the change in the volume and density of water on heating'),
      [2],
    ),
    sec(
      '3. Hope’s experiment and the consequences of anomalous expansion',
      r`**Hope’s experiment** demonstrates that water has its greatest density at 4 °C. A **tall jar of water** has a **trough of freezing mixture** (ice and salt) around its **middle**; one thermometer is placed in the water **above** the trough and one **below** it.

- The water in the middle cools, becomes denser and **sinks**, so the **lower thermometer falls first**; it stops at **4 °C**.
- Water that is colder than 4 °C is **less dense** and stays above, so the **upper thermometer falls later** and finally reaches **0 °C**, when ice forms.

**Consequences**
- **Ponds and lakes in cold regions:** the top layer cools to 0 °C and freezes; ice floats and, being a poor conductor of heat, protects the water below. The water at the bottom stays at about 4 °C, so **fish and plants survive**.
- **Pipes and bottles:** water **expands on freezing** (ice has about 11% more volume than the water it came from), so water in a closed pipe, sealed bottle or rock crack can **burst or crack** it.`,
      [kt('Hope’s experiment', 'An experiment with a tall jar of water cooled in the middle, which shows that water is densest at 4 °C.')],
      [],
      table(['Thermometer', 'Reading in the experiment'], [['Lower', 'Falls first and stops at 4 °C'], ['Upper', 'Falls later and reaches 0 °C']], 'Table of the readings of the two thermometers in Hope’s experiment'),
      [3],
    ),
    sec(
      '4. Greenhouse effect and global warming',
      r`**Greenhouse effect:** sunlight (mainly visible light) passes through the atmosphere and warms the ground. The ground gives out **infrared** radiation. **Greenhouse gases** absorb part of it and **send some back** towards the ground, so the lower atmosphere is warmer than it would otherwise be. **Main greenhouse gases:** carbon dioxide, methane, water vapour, nitrous oxide and the chlorofluorocarbons (CFCs); nitrogen and oxygen are not greenhouse gases.

- The **natural** greenhouse effect is **useful**: without it the average surface temperature would be about −18 °C instead of about 15 °C.
- **Global warming** is the **rise in the average temperature of the Earth** caused by **extra** greenhouse gases added by human activities: burning fossil fuels, deforestation, farming and livestock, rubbish dumps.
- **Impact:** melting of glaciers and polar ice and **rise in sea level**, heat waves, droughts and floods, damage to crops, bleaching of coral reefs, loss of habitats. **Remedies:** less fossil fuel, solar and wind power, saving energy, public transport, planting trees, reducing and recycling waste.
- **As of 2026:** carbon dioxide in the air is above 420 parts per million, and the Earth is roughly 1.1 to 1.3 °C warmer than in the late 1800s. These figures rise with time; check the latest values from a recent source.
- The chemistry of these gases and their sources is dealt with in the ICSE Class 9 Chemistry chapter on the environment; here the emphasis is on the radiation and the energy changes.`,
      [kt('Greenhouse effect', 'The warming of the lower atmosphere because greenhouse gases absorb infrared from the ground and send part of it back.'), kt('Global warming', 'The rise in the average temperature of the Earth caused by extra greenhouse gases from human activities.')],
      [],
      table(['', 'Greenhouse effect', 'Global warming'], [['Nature', 'Natural, always present', 'Caused by extra gases from human activity'], ['Effect', 'Keeps the Earth warm enough for life', 'Raises the average temperature too far']], 'Table comparing the greenhouse effect and global warming'),
      [4],
    ),
    sec(
      '5. Energy degradation',
      r`When energy changes from one form to another, the **total energy is conserved**, but a part of it becomes **heat that spreads into the surroundings** and cannot be fully collected and used again. The energy is **degraded**: still present, but **less useful**.

- **Car engine:** chemical energy of the fuel becomes motion, but also heat and sound. Of ${D2_ENG.in} J from the fuel, only ${D2_ENG.useful} J may become useful work; the other ${D2_ENG.deg} J is degraded.
- **Filament bulb:** most of the electrical energy becomes heat, only a little light.
- **Brakes, friction, a falling stone hitting the ground, rubbing the hands:** motion energy becomes heat that spreads out.
- Degraded energy = energy supplied − useful energy. Heat can be given in J or in cal (1 cal = 4.186 J).`,
      [kt('Energy degradation', 'The change of useful energy into heat spread through the surroundings, from which it cannot be fully recovered.')],
      [fm(r`\text{degraded energy} = \text{energy supplied} - \text{useful energy}`, 'Degraded energy')],
      table(['Device', 'Useful energy', 'Degraded to'], [['Car engine', 'Motion', 'Heat and sound'], ['Filament bulb', 'Light', 'Heat'], ['Brakes', 'Slowing the car', 'Heat']], 'Table of three devices with their useful energy and the form to which the rest is degraded'),
      [5],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Saying "temperature is heat" or measuring heat in °C.
- Forgetting the factor 4.186 in conversions, or multiplying when you should divide (J to cal).
- Saying that water is lightest at 4 °C, or that a pond freezes from the bottom.
- Saying that greenhouse gases trap sunlight (they trap the infrared from the ground), or that the greenhouse effect is harmful in itself.
- Saying that energy is destroyed in a machine: it is only degraded.

**How marks are usually awarded**
- Definitions and differences (2 marks): heat and temperature, calorie, greenhouse effect, energy degradation.
- Graphs (2 to 3 marks): label the axes, and mark 4 °C as the peak (density) or the dip (volume).
- Hope's experiment (3 to 5 marks): apparatus, the two readings, and the reason in terms of density.
- Numericals (1 to 3 marks): formula, substitution and unit; show 1 cal = 4.186 J.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Heat?', 'A form of energy that flows from a hotter to a colder body.', 'definition', 1),
    fc(2, 'Temperature?', 'The degree of hotness of a body.', 'definition', 1),
    fc(3, 'Which way does heat flow?', 'From the higher temperature to the lower temperature.', 'fact', 1),
    fc(4, 'SI unit of heat?', 'Joule (J).', 'fact', 1),
    fc(5, 'Calorie?', 'Heat needed to raise 1 g of water by 1 °C.', 'definition', 1),
    fc(6, '1 cal in joules?', '4.186 J.', 'fact', 1),
    fc(7, '1 kcal in cal?', '1000 cal.', 'fact', 1),
    fc(8, 'Instrument for temperature?', 'Thermometer.', 'fact', 1),
    fc(9, 'Heat to warm m grams of water by Δt °C?', 'm × Δt cal (no heat lost).', 'formula', 1),
    fc(10, 'Anomalous expansion of water?', 'It contracts on heating from 0 °C to 4 °C.', 'definition', 2),
    fc(11, 'Temperature of maximum density of water?', '4 °C.', 'fact', 2),
    fc(12, 'Volume of a fixed mass of water at 4 °C?', 'Minimum.', 'fact', 2),
    fc(13, 'Shape of the volume-temperature graph, 0 to 10 °C?', 'A dip with its lowest point at 4 °C.', 'concept', 2),
    fc(14, 'Shape of the density-temperature graph, 0 to 10 °C?', 'A hump with its highest point at 4 °C.', 'concept', 2),
    fc(15, 'Is water at 0 °C denser than water at 4 °C?', 'No, it is less dense.', 'concept', 2),
    fc(16, 'Does ice float on water?', 'Yes, ice is less dense than water.', 'fact', 2),
    fc(17, 'Hope’s experiment shows that?', 'Water has its greatest density at 4 °C.', 'concept', 3),
    fc(18, 'Hope’s apparatus?', 'Tall jar of water, freezing mixture round the middle, two thermometers.', 'fact', 3),
    fc(19, 'Lower thermometer in Hope’s experiment?', 'Falls first and stops at 4 °C.', 'fact', 3),
    fc(20, 'Upper thermometer in Hope’s experiment?', 'Falls later and reaches 0 °C.', 'fact', 3),
    fc(21, 'Temperature at the bottom of a frozen pond?', 'About 4 °C.', 'fact', 3),
    fc(22, 'Why do water pipes burst in very cold weather?', 'Water expands on freezing and ice has no room.', 'concept', 3),
    fc(23, 'Greenhouse effect?', 'Greenhouse gases absorb the Earth’s infrared and send part of it back, keeping it warm.', 'definition', 4),
    fc(24, 'Radiation trapped by greenhouse gases?', 'Infrared from the ground.', 'fact', 4),
    fc(25, 'Name four greenhouse gases.', 'Carbon dioxide, methane, water vapour, nitrous oxide (also CFCs).', 'fact', 4),
    fc(26, 'Global warming?', 'Rise in the Earth’s average temperature due to extra greenhouse gases.', 'definition', 4),
    fc(27, 'Two effects of global warming?', 'Rising sea level; heat waves, droughts or floods.', 'concept', 4),
    fc(28, 'Energy degradation?', 'Useful energy becoming heat that spreads out and cannot be reused.', 'definition', 5),
    fc(29, 'Is energy destroyed when it is degraded?', 'No, the total is conserved; it becomes less useful.', 'concept', 5),
    fc(30, 'Degraded energy?', 'Energy supplied − useful energy.', 'formula', 5),
  ],
  status: 'draft',
  provenance: PROV,
};
