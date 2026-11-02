// ICSE 10 Geography ch06 Climate of India — notes and flashcards.
import { T, table, unit, PROV } from './lib.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Climate of India — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Factors affecting India’s climate',
      `- **Latitude:** Tropic of Cancer divides India into a tropical south and sub-tropical north.
- **Altitude:** temperature falls with height (hill stations cool).
- **Distance from the sea:** coastal places equable (small range, e.g. Mumbai), interior places extreme (large range, e.g. Delhi).
- **Monsoon winds:** seasonal reversal → wet summers, dry winters.
- **Himalayas:** block cold Central Asian winds; make monsoon winds rise and rain over the plains.
- **Jet streams:** westerly jet in winter steers western disturbances; changes in the jets help the monsoon set in.
- **El Niño:** warm eastern Pacific → often a weak monsoon and drought in India.`,
      [kt('Equable climate', 'A climate with a small difference between summer and winter temperatures, typical of coastal places.'), kt('El Niño', 'An occasional warming of the eastern Pacific Ocean that tends to weaken the Indian monsoon.')],
      [],
      table(['Factor', 'Effect'], [['Distance from sea', 'Range of temperature'], ['Himalayas', 'Barrier and relief rain'], ['El Niño', 'Weak monsoon']], 'Table of three factors and their effects'),
      [1],
    ),
    sec(
      '2. Summer and winter patterns',
      `| Feature | Summer (Mar–May) | Winter (Dec–Feb) |
|---|---|---|
| Temperature | Rises northward; highest in NW | Falls northward; coldest in NW |
| Pressure over NW India | Low | High |
| Winds | Hot dry winds (loo); onshore later | Dry offshore NE winds |
| Rain | Pre-monsoon showers | Western disturbances (NW); Tamil Nadu coast |`,
      [kt('Loo', 'A hot, dry, strong afternoon wind of the northern plains in May and June.')],
      [],
      table(['Season', 'Coldest or hottest area'], [['Summer', 'North-west plains (hottest)'], ['Winter', 'North-west and hills (coldest)']], 'Table of extreme areas in each season'),
      [2],
    ),
    sec(
      '3. The monsoon and its mechanism',
      `- **Monsoon:** seasonal reversal of winds (Arabic *mausim*, season).
- **Mechanism:** differential heating in summer → low pressure over NW India, high pressure over the Indian Ocean; ITCZ shifts north; SE trades cross the Equator, are deflected right (Coriolis) → moist **SW monsoon**.
- **Onset:** Kerala about 1 June (“burst”); covers India by mid-July.
- **Arabian Sea branch:** heavy rain on windward Western Ghats; rain-shadow on the leeward Deccan.
- **Bay of Bengal branch:** heavy rain in the north-east (Meghalaya); deflected west along the Ganga plain, rain decreasing westward.
- **Winter:** pressure reverses; dry NE monsoon from land to sea.`,
      [kt('Rain-shadow area', 'An area on the leeward side of mountains that receives little rain.'), kt('Burst of the monsoon', 'The sudden onset of heavy monsoon rain, usually on the Kerala coast around 1 June.')],
      [],
      table(['Branch', 'Heavy rain'], [['Arabian Sea', 'Western Ghats, west coast'], ['Bay of Bengal', 'North-east India']], 'Table of monsoon branches'),
      [3],
    ),
    sec(
      '4. The four seasons',
      `1. **Hot weather (Mar–May):** rising temperatures, low pressure in NW, local storms.
2. **SW monsoon (Jun–Sep):** 75–90% of annual rain; uncertain, uneven, with breaks.
3. **Retreating monsoon (Oct–Nov):** withdrawal; “October heat”; NE winds over the Bay bring heavy rain to the Tamil Nadu coast; cyclones on the east coast.
4. **Cold weather (Dec–Feb):** clear, cool, dry; frost in NW; snow in the Himalayas; western disturbances.

The Tamil Nadu coast lies in the rain-shadow of the SW monsoon and gets most rain from the retreating/NE monsoon.`,
      [kt('Retreating monsoon', 'The withdrawal of the south-west monsoon in October and November, when north-east winds over the Bay of Bengal bring rain to the Tamil Nadu coast.')],
      [],
      table(['Season', 'Months'], [['Hot weather', 'Mar–May'], ['SW monsoon', 'Jun–Sep'], ['Retreating monsoon', 'Oct–Nov'], ['Cold weather', 'Dec–Feb']], 'Table of the four seasons'),
      [4],
    ),
    sec(
      '5. Local winds and seasonal weather',
      `| Name | When | Where | Effect |
|---|---|---|---|
| Loo | May–June | Northern plains | Hot, dry; heatstroke |
| Mango showers | Apr–May | Kerala, coastal Karnataka | Ripening of mangoes |
| Blossom showers | Apr–May | Karnataka | Coffee flowering |
| Kalbaisakhi | Apr–May | West Bengal, Assam | Violent storms; helps tea, jute, rice |
| Western disturbances | Winter | NW India | Rain for wheat; Himalayan snow |`,
      [kt('Western disturbances', 'Low-pressure systems from the Mediterranean region that bring winter rain to north-west India.'), kt('Kalbaisakhi', 'Violent evening thunderstorms of West Bengal and Assam in April and May.')],
      [],
      table(['Local weather', 'Region'], [['Loo', 'Northern plains'], ['Kalbaisakhi', 'Bengal, Assam']], 'Table of two local weather types and regions'),
      [5],
    ),
    sec(
      '6. Interpreting climate data',
      `- **Annual range** = highest monthly mean temperature − lowest monthly mean temperature.
- **Total rainfall** = sum of the 12 monthly totals.
- Small range (under about 8 °C) → coastal or southern; large range (over about 15 °C) → interior, northern.
- Rain peak Jun–Sep → SW monsoon region; peak Oct–Dec → Tamil Nadu coast; some Jan–Feb rain → NW India (western disturbances).
- Very heavy Jun–Sep rain with a small range → west coast or north-east hills.`,
      [kt('Annual range of temperature', 'The difference between the mean temperatures of the hottest and coldest months.')],
      [],
      table(['Clue', 'Meaning'], [['Small range', 'Coastal'], ['Large range', 'Interior'], ['Winter rain in SE', 'Tamil Nadu coast']], 'Table of climate-data clues'),
      [6],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Saying winds blow from low to high pressure.
- Placing the rain-shadow on the windward side.
- Attributing Tamil Nadu’s winter rain to the south-west monsoon.
- Computing annual range from rainfall figures.

**How marks are usually awarded**
- Reasons (1 mark each): name the factor and how it acts, with a named place.
- Monsoon mechanism (3 marks): differential heating; pressure difference; wind direction and deflection.
- Climate data (2–3 marks): working shown for range and total; inference with a reason.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Type of climate of India?', 'Tropical monsoon.', 'fact', 1),
    fc(2, 'Line dividing tropical and sub-tropical India?', 'Tropic of Cancer.', 'fact', 1),
    fc(3, 'Why is Mumbai’s range small?', 'Nearness to the sea (equable climate).', 'concept', 1),
    fc(4, 'Two roles of the Himalayas in climate?', 'Block cold winds; cause monsoon rain.', 'concept', 1),
    fc(5, 'Effect of El Niño?', 'Often weakens the monsoon.', 'fact', 1),
    fc(6, 'Pressure over NW India in summer?', 'Low.', 'fact', 2),
    fc(7, 'Coldest region in winter?', 'North-west India and the Himalayas.', 'fact', 2),
    fc(8, 'Meaning of monsoon?', 'Seasonal reversal of winds.', 'definition', 3),
    fc(9, 'Cause of the SW monsoon?', 'Differential heating of land and sea; low pressure over land.', 'concept', 3),
    fc(10, 'Why “south-west”?', 'SE trades deflected right after crossing the Equator.', 'concept', 3),
    fc(11, 'Onset date in Kerala?', 'About 1 June.', 'fact', 3),
    fc(12, 'Rain-shadow area?', 'Leeward side of mountains with little rain.', 'definition', 3),
    fc(13, 'Wettest region of India?', 'Meghalaya (Mawsynram, Cherrapunji).', 'fact', 3),
    fc(14, 'Four seasons?', 'Hot weather, SW monsoon, retreating monsoon, cold weather.', 'fact', 4),
    fc(15, 'Share of rain in SW monsoon?', '75–90% of annual rain.', 'fact', 4),
    fc(16, 'October heat?', 'Hot, humid weather as the monsoon retreats.', 'definition', 4),
    fc(17, 'Why does Chennai get winter rain?', 'NE winds over the Bay of Bengal in Oct–Dec.', 'concept', 4),
    fc(18, 'Breaks in the monsoon?', 'Dry spells within the rainy season.', 'definition', 4),
    fc(19, 'Loo?', 'Hot dry wind of the northern plains, May–June.', 'definition', 5),
    fc(20, 'Mango showers?', 'Pre-monsoon showers in Kerala and coastal Karnataka.', 'definition', 5),
    fc(21, 'Kalbaisakhi?', 'Evening thunderstorms in Bengal and Assam.', 'definition', 5),
    fc(22, 'Blossom showers help?', 'Coffee flowering in Karnataka.', 'fact', 5),
    fc(23, 'Western disturbances?', 'Winter low-pressure systems from the Mediterranean; rain in NW.', 'definition', 5),
    fc(24, 'Crop helped by western disturbances?', 'Wheat.', 'fact', 5),
    fc(25, 'Annual range?', 'Hottest month mean − coldest month mean.', 'formula', 6),
    fc(26, 'Small range suggests?', 'Coastal location.', 'concept', 6),
    fc(27, 'Rain peak Oct–Dec suggests?', 'Tamil Nadu coast.', 'concept', 6),
    fc(28, 'Some Jan–Feb rain in the north suggests?', 'Western disturbances (NW India).', 'concept', 6),
    fc(29, 'Total rainfall?', 'Sum of 12 monthly totals.', 'formula', 6),
    fc(30, 'Exam tip: monsoon', 'Heating → pressure → winds → deflection.', 'exam-tip', 3),
  ],
  status: 'draft',
  provenance: PROV,
};
