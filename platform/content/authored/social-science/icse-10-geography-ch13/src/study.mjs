// ICSE 10 Geography ch13 Food Crops: Rice, Wheat, Millets and Pulses — notes and flashcards.
import { T, table, unit, PROV } from './lib.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Food Crops: Rice, Wheat, Millets and Pulses — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Rice: requirements and methods',
      `- **Temperature:** high, over about 22–25 °C during growth.
- **Rainfall:** 100–200 cm or more; standing water for much of the growing period; irrigation where rain is less (Punjab, Haryana).
- **Soil:** clayey or loamy alluvium that holds water; deltas, river valleys, coastal plains.
- **Relief and labour:** flat land or terraces; plentiful cheap labour.
- **Methods:** broadcasting, drilling, dibbling, **transplantation** — seed sown in a nursery → seedlings uprooted after four to six weeks → planted in rows in a puddled, flooded field. The Japanese method adds HYV seeds, heavy manuring and row planting.`,
      [kt('Transplantation', 'Raising rice seedlings in a nursery and planting them in rows in a flooded field after four to six weeks.'), kt('Puddling', 'Ploughing a flooded field into soft mud so that it holds water for transplanted rice.')],
      [],
      table(['Method', 'Feature'], [['Broadcasting', 'Seed scattered by hand'], ['Drilling', 'Seed sown in lines'], ['Transplantation', 'Nursery seedlings planted in flooded rows']], 'Table of three methods of rice cultivation'),
      [1],
    ),
    sec(
      '2. Rice: producing states',
      `- **Leading states:** West Bengal (a leading producer — largest as of the early 2020s), Uttar Pradesh, Punjab, Andhra Pradesh, Telangana, Odisha, Tamil Nadu, Chhattisgarh, Bihar.
- West Bengal can raise three crops a year: **aus** (autumn), **aman** (winter, main crop), **boro** (summer, irrigated).
- Deltas of the Mahanadi, Godavari, Krishna and Cauvery are major rice areas (canals, alluvium, heat).
- Punjab and Haryana grow rice mainly for sale with canal and tube-well irrigation.`,
      [kt('Aman', 'The main winter rice crop of West Bengal, sown with the monsoon and harvested in early winter.')],
      [],
      table(['Region', 'Example states'], [['Delta and east', 'West Bengal, Odisha'], ['Ganga plain', 'Uttar Pradesh, Bihar'], ['Irrigated north-west', 'Punjab, Haryana']], 'Table of rice regions and states'),
      [1],
    ),
    sec(
      '3. Wheat',
      `- **Season:** rabi — sown October–December, harvested March–April.
- **Temperature:** cool and moist while growing (about 10–15 °C); warm, dry and sunny for ripening (about 20–25 °C).
- **Rainfall:** 50–75 cm; light winter rain from **western disturbances** helps in Punjab and Haryana; irrigation elsewhere.
- **Soil:** well-drained loamy alluvium; black soils of Malwa.
- **Dangers:** frost at flowering, hail, a hot spell in March.
- **Leading states:** Uttar Pradesh (a leading producer — largest as of the early 2020s), Punjab, Madhya Pradesh, Haryana, Rajasthan.
- **Two zones:** Ganga–Satluj plains of the north-west; black-soil region of the Deccan and Malwa.`,
      [kt('Rabi crop', 'A crop sown in winter after the monsoon and harvested in spring, such as wheat or gram.'), kt('Western disturbances', 'Winter low-pressure systems from the Mediterranean region that bring light rain to north-west India.')],
      [],
      table(['Stage', 'Weather needed'], [['Growing', 'Cool, moist'], ['Ripening', 'Warm, dry, sunny']], 'Table of the weather needed at two stages of wheat growth'),
      [2],
    ),
    sec(
      '4. Millets',
      `| Millet | Temperature | Rainfall (approx.) | Soil | A leading state (early 2020s) |
|---|---|---|---|---|
| Jowar | 27–32 °C | 50–100 cm | Black, red | Maharashtra |
| Bajra | 25–30 °C | 40–50 cm | Sandy | Rajasthan |
| Ragi | Warm, dry | Moderate | Red, light | Karnataka |

**Why suited to dry areas:** drought tolerance; short growing season; grow on poor, sandy or shallow soils; need few inputs; nutritious (fibre, iron, calcium) and give fodder.`,
      [kt('Nutri-cereals', 'A name for millets that stresses their high fibre, iron and calcium content.')],
      [],
      table(['Millet', 'Soil'], [['Jowar', 'Black'], ['Bajra', 'Sandy'], ['Ragi', 'Red']], 'Table of three millets and the soils that suit them'),
      [3],
    ),
    sec(
      '5. Pulses',
      `- **Kharif pulses:** arhar (tur), moong, urad. **Rabi pulses:** gram (chana), masoor, peas.
- **Needs:** about 20–27 °C; low to moderate rain (roughly 25–60 cm); light loams, black and red soils; mostly rain-fed.
- **Crop rotation:** legumes have root nodules with bacteria that fix atmospheric nitrogen, enriching the soil for the next crop and saving fertiliser.
- **Diet:** the main protein source for a large vegetarian population.
- **Leading states:** Madhya Pradesh (a leading producer — largest as of the early 2020s), Maharashtra, Rajasthan, Uttar Pradesh, Karnataka.
- India still imports some pulses because yields are low and demand is high (as of the early 2020s).`,
      [kt('Legume', 'A plant of the pea family whose root nodules hold nitrogen-fixing bacteria.'), kt('Crop rotation', 'Growing different crops one after another on the same field to keep the soil fertile.')],
      [],
      table(['Season', 'Pulses'], [['Kharif', 'Arhar, moong, urad'], ['Rabi', 'Gram, masoor, peas']], 'Table of kharif and rabi pulses'),
      [4],
    ),
    sec(
      '6. Working with crop data',
      `- **Yield** = production ÷ area.
- **Production** = yield × area.
- **Regional average yield** = total production ÷ total area (not the mean of district yields).
- **Share of area** = district area ÷ total area × 100.
- High yields usually mean assured irrigation, HYV seeds and fertiliser; low yields suggest rain-fed land and poorer soils.`,
      [kt('Yield', 'The amount of crop produced from one unit of land, such as tonnes per hectare.')],
      [],
      table(['Measure', 'Formula'], [['Yield', 'Production ÷ area'], ['Average yield', 'Total production ÷ total area']], 'Table of two crop-data formulas'),
      [1, 3],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Saying rice grows best in sandy soil or wheat needs heavy rain.
- Mixing up kharif and rabi pulses (gram is rabi; arhar is kharif).
- Forgetting the warm, dry ripening period when explaining why wheat is a rabi crop.
- Averaging district yields instead of dividing total production by total area.

**How marks are usually awarded**
- Requirements (2–3 marks): temperature, rainfall and soil with values.
- Methods (3 marks): the three steps of transplantation in order.
- Reasons (1 mark each): a clear geographical cause linked to a named area.
- Data (2–3 marks): working shown, answer with unit.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Rainfall needed by rice?', '100–200 cm or more, or irrigation.', 'fact', 1),
    fc(2, 'Soil for rice?', 'Clayey or loamy alluvium that holds water.', 'fact', 1),
    fc(3, 'Transplantation: three steps?', 'Nursery → uproot after four to six weeks → plant in rows in flooded field.', 'diagram', 1),
    fc(4, 'Broadcasting?', 'Scattering seed by hand over the field.', 'definition', 1),
    fc(5, 'Three rice crops of West Bengal?', 'Aus, aman, boro.', 'fact', 1),
    fc(6, 'A leading rice state (early 2020s)?', 'West Bengal.', 'fact', 1),
    fc(7, 'Why are deltas rice bowls?', 'Heat, rain plus canals, clayey alluvium, flat land, labour.', 'concept', 1),
    fc(8, 'Wheat season?', 'Rabi: sown October–December, harvested March–April.', 'fact', 2),
    fc(9, 'Weather for wheat?', 'Cool, moist growing; warm, dry, sunny ripening.', 'concept', 2),
    fc(10, 'Rainfall for wheat?', 'About 50–75 cm.', 'fact', 2),
    fc(11, 'How does winter rain help wheat?', 'Adds soil moisture in the dry growing season.', 'concept', 2),
    fc(12, 'Source of winter rain in Punjab?', 'Western disturbances.', 'fact', 2),
    fc(13, 'A leading wheat state (early 2020s)?', 'Uttar Pradesh.', 'fact', 2),
    fc(14, 'Two wheat zones?', 'Ganga–Satluj plains; black-soil Deccan and Malwa.', 'fact', 2),
    fc(15, 'Danger to wheat in March?', 'A hot spell that shrivels the grain.', 'concept', 2),
    fc(16, 'Three millets?', 'Jowar, bajra, ragi.', 'fact', 3),
    fc(17, 'Why millets suit dry areas?', 'Drought-tolerant, short season, poor soils, few inputs.', 'concept', 3),
    fc(18, 'Bajra soil and rain?', 'Sandy soil; about 40–50 cm.', 'fact', 3),
    fc(19, 'A leading jowar state (early 2020s)?', 'Maharashtra.', 'fact', 3),
    fc(20, 'A leading bajra state (early 2020s)?', 'Rajasthan.', 'fact', 3),
    fc(21, 'A leading ragi state (early 2020s)?', 'Karnataka.', 'fact', 3),
    fc(22, 'Nutritional value of millets?', 'Rich in fibre, iron and calcium.', 'fact', 3),
    fc(23, 'Kharif pulses?', 'Arhar (tur), moong, urad.', 'fact', 4),
    fc(24, 'Rabi pulses?', 'Gram, masoor, peas.', 'fact', 4),
    fc(25, 'How pulses enrich soil?', 'Root nodule bacteria fix atmospheric nitrogen.', 'concept', 4),
    fc(26, 'Why pulses matter in diet?', 'Main protein source for vegetarians.', 'concept', 4),
    fc(27, 'A leading pulse state (early 2020s)?', 'Madhya Pradesh.', 'fact', 4),
    fc(28, 'Why India imports pulses?', 'Low rain-fed yields; very high demand.', 'concept', 4),
    fc(29, 'Yield?', 'Production ÷ area.', 'formula', 1),
    fc(30, 'Regional average yield?', 'Total production ÷ total area.', 'formula', 1),
    fc(31, 'Exam tip: wheat as rabi', 'Mention cool growing and warm dry ripening.', 'exam-tip', 2),
  ],
  status: 'draft',
  provenance: PROV,
};
