// ICSE 10 Geography ch12 Agriculture in India — notes and flashcards.
import { T, table, unit, PROV } from './lib.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Agriculture in India — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Importance of agriculture',
      `- **Employment:** nearly half of India’s workers depend on farming (as of the early 2020s).
- **Food security:** food grains, pulses, oilseeds, fruit and vegetables for the whole population; buffer stocks.
- **Raw materials:** cotton (textile mills), jute (Kolkata jute mills), sugarcane (sugar mills), oilseeds (oil mills).
- **Exports:** rice, tea, spices, cotton, fruit.
- **Market for industry:** farmers buy fertilisers, pumps, tractors and consumer goods.
- Its share of national income has fallen as industry and services grew, but it remains the base of the rural economy.`,
      [kt('Agro-based industry', 'An industry that uses farm produce as its raw material, such as cotton textiles, jute or sugar.')],
      [],
      table(['Farm product', 'Industry it supplies'], [['Cotton', 'Textile mills'], ['Jute', 'Jute mills'], ['Sugarcane', 'Sugar mills']], 'Table of farm products and the industries they supply'),
      [1],
    ),
    sec(
      '2. Problems and remedies',
      `| Problem | Effect | Remedy |
|---|---|---|
| Small, fragmented holdings | Wasted time; machines and wells hard to use | Consolidation (chakbandi); cooperative farming |
| Dependence on the monsoon | Droughts and floods ruin crops | Irrigation; watershed management; drought-resistant crops |
| Soil degradation | Erosion, lost fertility, waterlogging, salinity | Crop rotation; contour ploughing; balanced fertiliser; drainage |
| Low yields, old methods | Low incomes | Better seeds; training; extension services |
| Lack of cheap credit | Debt to moneylenders | Kisan Credit Card; cooperative and rural banks; crop insurance |
| Poor storage and marketing | Losses; low prices from middlemen | Cold storage; regulated markets; minimum support price |`,
      [kt('Fragmentation of holdings', 'The splitting of a farmer’s land into many small, scattered plots, usually through inheritance.'), kt('Consolidation of holdings', 'Regrouping a farmer’s scattered plots into one compact block of about the same total area.')],
      [],
      table(['Problem', 'Remedy'], [['Fragmented holdings', 'Consolidation'], ['Monsoon dependence', 'Irrigation'], ['Costly credit', 'Kisan Credit Card']], 'Table of three problems and remedies'),
      [1],
    ),
    sec(
      '3. The Green Revolution',
      `- **Meaning:** a sharp rise in the output of food grains (mainly wheat, later rice) from the mid-1960s through a package of modern inputs.
- **Inputs:** HYV seeds; assured irrigation (canals, tube wells); chemical fertilisers; pesticides; farm machines; credit; minimum support prices.
- **Where:** first in Punjab, Haryana and western Uttar Pradesh (irrigated plains).
- **Positive:** self-sufficiency in food grains; buffer stocks; higher farm incomes; growth of agro-industries and rural jobs.
- **Negative:** regional inequality (rain-fed areas left behind); crop inequality (pulses, millets neglected); overuse of groundwater and falling water tables; waterlogging and salinity; pesticide pollution; small farmers gained less.`,
      [kt('Green Revolution', 'The large increase in food-grain production in India from the mid-1960s using HYV seeds, irrigation and fertilisers.'), kt('HYV seeds', 'High-yielding variety seeds that give much larger harvests when given enough water and fertiliser.')],
      [],
      table(['Positive', 'Negative'], [['Food self-sufficiency', 'Regional inequality'], ['Higher incomes', 'Soil and water damage']], 'Table of two positive and two negative effects of the Green Revolution'),
      [2],
    ),
    sec(
      '4. Types of farming',
      `| Type | Key features | Indian example |
|---|---|---|
| Subsistence | Food for family; small plots; family labour | Hill farms of Mizoram, Uttarakhand |
| Commercial | Crops for sale; bought inputs; often one crop | Grapes of Nashik; sugarcane of Maharashtra |
| Intensive | Small farms; much labour per hectare; multiple cropping; high yield per hectare | Ganga delta of West Bengal; coastal Kerala |
| Extensive | Large farms; machines; one crop; low yield per hectare, high output per worker | Uncommon in India |
| Plantation | One cash crop; large estate; capital; hired labour; processing on site | Tea (Assam), coffee (Karnataka), rubber (Kerala) |
| Mixed | Crops plus livestock; dung as manure; fodder from crops | Punjab, Haryana |`,
      [kt('Plantation farming', 'Large-scale growing of a single cash crop on an estate using much capital, hired labour and on-site processing.'), kt('Mixed farming', 'Growing crops and rearing animals together on the same farm.')],
      [],
      table(['Type', 'Example'], [['Plantation', 'Tea in Assam'], ['Intensive', 'Paddy in West Bengal'], ['Mixed', 'Wheat and dairy in Haryana']], 'Table of three farming types with examples'),
      [3],
    ),
    sec(
      '5. Agricultural seasons',
      `| Season | Sown | Harvested | Crops |
|---|---|---|---|
| Kharif | June–July (monsoon onset) | September–October | Rice, jowar, bajra, maize, cotton, groundnut, jute, soya bean |
| Rabi | October–December | March–April | Wheat, gram, mustard, barley, peas |
| Zayad | March | June | Watermelon, muskmelon, cucumber, vegetables, fodder |

Rabi crops benefit from winter rain brought by western disturbances in the north-west. Zayad crops need irrigation.`,
      [kt('Kharif', 'The crop season that begins with the south-west monsoon; crops are sown in June–July and harvested in September–October.'), kt('Rabi', 'The winter crop season; crops are sown in October–December and harvested in March–April.'), kt('Zayad', 'A short summer season between rabi and kharif for quick, irrigated crops such as melons and cucumbers.')],
      [],
      table(['Season', 'Months'], [['Kharif', 'June–October'], ['Rabi', 'October–April'], ['Zayad', 'March–June']], 'Table of the three seasons and their months'),
      [4],
    ),
    sec(
      '6. Working with farm data',
      `- **Yield** = production ÷ area (for example tonnes per hectare).
- **Percentage change** = (new − old) ÷ old × 100.
- **Gross cropped area** = total of the areas sown in all seasons of the year.
- **Cropping intensity** = gross cropped area ÷ net sown area × 100; above 100 means fields carry more than one crop a year.`,
      [kt('Cropping intensity', 'Gross cropped area as a percentage of net sown area; it shows how many crops a field carries in a year.')],
      [],
      table(['Measure', 'Formula'], [['Yield', 'Production ÷ area'], ['Cropping intensity', 'Gross ÷ net × 100']], 'Table of two farm-data formulas'),
      [2, 4],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Writing that the Green Revolution helped all crops and all regions equally.
- Confusing kharif and rabi months.
- Calling mixed farming a mix of crops only (it must include animals).
- Dividing area by production for yield.

**How marks are usually awarded**
- Problems (1 mark each): problem with its effect; remedy that matches.
- Green Revolution (3 marks): inputs, region, crops; or three effects.
- Seasons (2–3 marks): sowing and harvesting months with two crops.
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
    fc(1, 'Share of workers in farming?', 'Nearly half (as of the early 2020s).', 'fact', 1),
    fc(2, 'Two industries that depend on farm raw materials?', 'Cotton textiles and sugar (also jute).', 'example', 1),
    fc(3, 'Fragmentation of holdings?', 'Land split into many small, scattered plots.', 'definition', 1),
    fc(4, 'Remedy for fragmented holdings?', 'Consolidation of holdings (chakbandi).', 'concept', 1),
    fc(5, 'Remedy for dependence on the monsoon?', 'Irrigation and drought-resistant crops.', 'concept', 1),
    fc(6, 'Scheme giving farmers easy bank credit?', 'Kisan Credit Card.', 'fact', 1),
    fc(7, 'Causes of salinity in Punjab and Haryana?', 'Over-irrigation with poor drainage.', 'concept', 1),
    fc(8, 'Green Revolution?', 'Big rise in food-grain output from the mid-1960s using modern inputs.', 'definition', 2),
    fc(9, 'Three inputs of the Green Revolution?', 'HYV seeds, assured irrigation, chemical fertilisers.', 'fact', 2),
    fc(10, 'Crops that gained most?', 'Wheat, later rice.', 'fact', 2),
    fc(11, 'States where it first succeeded?', 'Punjab, Haryana, western Uttar Pradesh.', 'fact', 2),
    fc(12, 'One positive effect?', 'Self-sufficiency in food grains; buffer stocks.', 'concept', 2),
    fc(13, 'Two negative effects?', 'Regional inequality; falling water tables and salinity.', 'concept', 2),
    fc(14, 'Scientist linked with India’s Green Revolution?', 'M. S. Swaminathan.', 'fact', 2),
    fc(15, 'Yield?', 'Production ÷ area.', 'formula', 2),
    fc(16, 'Subsistence farming?', 'Growing crops mainly to feed the family.', 'definition', 3),
    fc(17, 'Commercial farming?', 'Growing crops mainly for sale.', 'definition', 3),
    fc(18, 'Intensive farming?', 'Much labour and inputs per hectare on small farms; high yield per hectare.', 'definition', 3),
    fc(19, 'Extensive farming?', 'Large mechanised farms; low yield per hectare, high output per worker.', 'definition', 3),
    fc(20, 'Plantation farming: three features?', 'One cash crop; large estate with capital and hired labour; processing on site.', 'concept', 3),
    fc(21, 'Plantation crops of India?', 'Tea (Assam), coffee (Karnataka), rubber (Kerala).', 'example', 3),
    fc(22, 'Mixed farming?', 'Crops plus livestock on the same farm.', 'definition', 3),
    fc(23, 'Kharif: sowing and harvesting?', 'Sown June–July; harvested September–October.', 'fact', 4),
    fc(24, 'Two kharif crops?', 'Rice and cotton (also jowar, maize, groundnut, jute).', 'example', 4),
    fc(25, 'Rabi: sowing and harvesting?', 'Sown October–December; harvested March–April.', 'fact', 4),
    fc(26, 'Two rabi crops?', 'Wheat and gram (also mustard, barley).', 'example', 4),
    fc(27, 'Zayad?', 'Short irrigated season, March–June: melons, cucumber, vegetables.', 'definition', 4),
    fc(28, 'What helps rabi crops in the north-west?', 'Winter rain from western disturbances.', 'concept', 4),
    fc(29, 'Cropping intensity?', 'Gross cropped area ÷ net sown area × 100.', 'formula', 4),
    fc(30, 'Crop calendar: read it how?', 'Find the sowing band and the harvest band for each season.', 'diagram', 4),
    fc(31, 'Exam tip: problems', 'Give each problem with a matching remedy.', 'exam-tip', 1),
  ],
  status: 'draft',
  provenance: PROV,
};
