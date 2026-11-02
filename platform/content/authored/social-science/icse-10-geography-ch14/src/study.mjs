// ICSE 10 Geography ch14 Cash Crops: Sugarcane, Oilseeds, Cotton, Jute and Tea — notes and flashcards.
import { T, table, unit, PROV } from './lib.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Cash Crops: Sugarcane, Oilseeds, Cotton, Jute and Tea — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Sugarcane',
      `- **Climate:** tropical and sub-tropical; about 21–27 °C; no frost; about 75–150 cm of rain or irrigation; long growing period of ten to eighteen months.
- **Soil:** deep, fertile, well-drained alluvial or black soil; heavy manuring.
- **Planting:** from **setts** (stem pieces with buds) in furrows.
- **Ratooning:** stubble left after harvest sprouts into a second (ratoon) crop — saves setts, ploughing and time, but yields fall and pests build up.
- **Yields higher in the peninsula** (Maharashtra, Tamil Nadu, Karnataka): tropical, frost-free climate; longer season; higher sugar content; black soil and irrigation; cooperative mills. The north has cold winters, frost and loo.
- **Leading states:** Uttar Pradesh (a leading producer — largest as of the early 2020s), Maharashtra, Karnataka, Tamil Nadu.
- **Products:** sugar, gur, khandsari; by-products bagasse (fuel, paper) and molasses (alcohol).`,
      [kt('Sett', 'A piece of sugarcane stem with buds, planted to grow a new crop.'), kt('Ratooning', 'Letting the stubble of a harvested sugarcane crop sprout again to give another crop without replanting.')],
      [],
      table(['Region', 'Yield', 'Reason'], [['Peninsula', 'Higher', 'Frost-free, longer season'], ['Northern plains', 'Lower', 'Cold winters, frost, loo']], 'Table comparing sugarcane yields in the peninsula and the northern plains'),
      [1],
    ),
    sec(
      '2. Oilseeds',
      `| Oilseed | Season | Requirements | A leading state (early 2020s) |
|---|---|---|---|
| Groundnut | Mainly kharif | 20–30 °C; 50–75 cm; loose sandy loam (pods form underground) | Gujarat |
| Mustard | Rabi | Cool; about 25–40 cm; loam | Rajasthan |
| Soya bean | Kharif | Warm; moderate rain; well-drained black soil | Madhya Pradesh |

Oilcake left after pressing is used as cattle feed and manure.`,
      [kt('Oilcake', 'The solid residue left after oil is pressed out of seeds, used as cattle feed and manure.')],
      [],
      table(['Oilseed', 'Season'], [['Groundnut', 'Kharif'], ['Mustard', 'Rabi'], ['Soya bean', 'Kharif']], 'Table of three oilseeds and their seasons'),
      [2],
    ),
    sec(
      '3. Cotton',
      `- **Season:** kharif.
- **Climate:** about 21–30 °C; about 210 frost-free days; 50–100 cm of rain; bright, dry weather when the bolls open (rain stains the fibre).
- **Soil:** black soil (regur) of the Deccan — retains moisture, rich in lime, potash and magnesium; irrigated alluvium in Punjab, Haryana, Rajasthan.
- **Cultivation:** bolls picked by hand in several rounds; **ginning** separates fibre from seed; fibre baled for mills; seed gives oil and cattle feed.
- **Leading states:** Gujarat and Maharashtra (as of the early 2020s), Telangana, Haryana, Rajasthan, Punjab, Karnataka.`,
      [kt('Regur', 'The black soil of the Deccan, also called black cotton soil, which holds moisture well.'), kt('Ginning', 'Separating cotton fibre from the seeds.')],
      [],
      table(['Need', 'Value'], [['Frost-free days', 'About 210'], ['Rainfall', 'About 50–100 cm'], ['Soil', 'Black (regur)']], 'Table of three needs of cotton'),
      [3],
    ),
    sec(
      '4. Jute',
      `- **Season:** kharif; called the golden fibre.
- **Climate:** hot, above about 25 °C; heavy rain about 150–250 cm; high humidity.
- **Soil:** floodplain loam renewed each year by fresh silt.
- **Retting:** stalks cut and bundled → soaked in ponds or slow streams for about two to three weeks → bacteria loosen the fibre → fibre stripped, washed, dried, baled.
- **Why the Ganga–Brahmaputra delta:** hot, humid, rainy climate; flood silt; plenty of water for retting; cheap labour; Hooghly mills and Kolkata port nearby.
- **Leading states:** West Bengal (a leading producer — largest as of the early 2020s), Bihar, Assam, Odisha, Meghalaya.
- **Uses and outlook:** gunny bags, ropes, carpets; competition from synthetics; promoted as a biodegradable alternative to plastic.`,
      [kt('Retting', 'Soaking bundles of jute stalks in water so that bacteria loosen the fibre from the stem.')],
      [],
      table(['Step', 'What happens'], [['Soaking', 'Bundles under water two to three weeks'], ['Stripping', 'Fibre pulled from stalks'], ['Drying', 'Fibre washed and sun-dried']], 'Table of three steps of retting and fibre preparation'),
      [4],
    ),
    sec(
      '5. Tea',
      `- **Climate:** about 20–30 °C; frost-free; heavy rain about 150–250 cm, well distributed; frequent light showers.
- **Soil:** deep, fertile, well-drained, slightly acidic, rich in humus and iron.
- **Relief:** hill slopes — water drains away and does not collect around roots; shade trees protect bushes.
- **Labour:** large, skilled labour force for plucking.
- **Plucking:** two leaves and a bud, every one to two weeks.
- **Processing:** withering → rolling (or CTC) → fermentation → drying → grading and packing; green tea is not fermented.
- **Leading states:** Assam (a leading producer — largest as of the early 2020s), West Bengal (Darjeeling, Dooars), Tamil Nadu (Nilgiris), Kerala.`,
      [kt('Withering', 'Spreading freshly plucked tea leaves to lose moisture and become soft before rolling.'), kt('Fermentation (tea)', 'Allowing rolled tea leaves to oxidise until they turn copper-brown, before drying.')],
      [],
      table(['Stage', 'Order'], [['Withering', '1'], ['Rolling', '2'], ['Fermentation', '3'], ['Drying', '4']], 'Table of the order of tea processing stages'),
      [5],
    ),
    sec(
      '6. Working with crop figures',
      `- **Yield** = production ÷ area.
- **Percentage difference** = (higher − lower) ÷ lower × 100.
- **Sugar produced** = cane crushed × recovery rate ÷ 100.
- **Made tea** = green leaf ÷ (kg of leaf needed for 1 kg of tea).
- State whether figures are illustrative; give units with every answer.`,
      [kt('Sugar recovery', 'The percentage of the weight of crushed cane that is obtained as sugar.')],
      [],
      table(['Measure', 'Formula'], [['Yield', 'Production ÷ area'], ['Sugar', 'Cane × recovery ÷ 100']], 'Table of two formulas for crop figures'),
      [1, 5],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Calling mustard a kharif crop or soya bean a rabi crop.
- Saying ratoon crops give higher yields than the planted crop.
- Saying tea needs waterlogged soil, or jute grows in dry areas.
- Putting fermentation before rolling in tea processing.

**How marks are usually awarded**
- Requirements (2–3 marks): temperature, rainfall and soil with values.
- Processes (2–3 marks): ratooning, ginning, retting or tea processing in the correct order.
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
    fc(1, 'Temperature and rain for sugarcane?', 'About 21–27 °C; about 75–150 cm or irrigation.', 'fact', 1),
    fc(2, 'Sett?', 'Stem piece with buds used to plant sugarcane.', 'definition', 1),
    fc(3, 'Ratooning?', 'Stubble sprouts into a second crop without replanting.', 'definition', 1),
    fc(4, 'One drawback of ratooning?', 'Yields fall and pests build up.', 'concept', 1),
    fc(5, 'Why are southern cane yields higher?', 'Frost-free tropical climate, longer season, black soil, irrigation.', 'concept', 1),
    fc(6, 'Why are sugar mills near cane fields?', 'Cut cane loses sugar within a day and is bulky.', 'concept', 1),
    fc(7, 'Two by-products of sugar mills?', 'Bagasse and molasses.', 'fact', 1),
    fc(8, 'Groundnut season and soil?', 'Mainly kharif; loose sandy loam.', 'fact', 2),
    fc(9, 'Why loose soil for groundnut?', 'Pods form underground.', 'concept', 2),
    fc(10, 'Mustard season?', 'Rabi.', 'fact', 2),
    fc(11, 'A leading soya bean state (early 2020s)?', 'Madhya Pradesh.', 'fact', 2),
    fc(12, 'Oilcake used for?', 'Cattle feed and manure.', 'fact', 2),
    fc(13, 'Frost-free days for cotton?', 'About 210.', 'fact', 3),
    fc(14, 'Why black soil suits cotton?', 'Holds moisture; rich in lime, potash, magnesium.', 'concept', 3),
    fc(15, 'Why dry weather at boll opening?', 'Rain stains and spoils the fibre.', 'concept', 3),
    fc(16, 'Ginning?', 'Separating cotton fibre from seed.', 'definition', 3),
    fc(17, 'Leading cotton states (early 2020s)?', 'Gujarat and Maharashtra.', 'fact', 3),
    fc(18, 'Jute temperature and rain?', 'Above about 25 °C; about 150–250 cm; humid.', 'fact', 4),
    fc(19, 'Retting?', 'Soaking stalk bundles two to three weeks so bacteria loosen fibre.', 'definition', 4),
    fc(20, 'Why does flood silt matter for jute?', 'It renews soil fertility that jute exhausts.', 'concept', 4),
    fc(21, 'A leading jute state (early 2020s)?', 'West Bengal.', 'fact', 4),
    fc(22, 'Where are most jute mills?', 'Along the Hooghly near Kolkata.', 'fact', 4),
    fc(23, 'Why is jute promoted today?', 'Biodegradable substitute for plastic.', 'concept', 4),
    fc(24, 'Tea temperature and rain?', 'About 20–30 °C; about 150–250 cm, well spread.', 'fact', 5),
    fc(25, 'Why tea on slopes?', 'Good drainage; water must not collect at roots.', 'concept', 5),
    fc(26, 'What is plucked?', 'Two leaves and a bud.', 'fact', 5),
    fc(27, 'Tea processing order?', 'Withering, rolling, fermentation, drying, grading.', 'diagram', 5),
    fc(28, 'A leading tea state (early 2020s)?', 'Assam.', 'fact', 5),
    fc(29, 'Sugar produced?', 'Cane crushed × recovery ÷ 100.', 'formula', 1),
    fc(30, 'Yield?', 'Production ÷ area.', 'formula', 1),
    fc(31, 'Exam tip: rankings', 'Write a leading producer, as of the early 2020s.', 'exam-tip', 5),
  ],
  status: 'draft',
  provenance: PROV,
};
