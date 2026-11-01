// ICSE 10 Geography ch07 Soil Resources — notes and flashcards.
import { T, table, unit, PROV } from './lib.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Soil Resources — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Alluvial soil',
      `- **Formation:** deposited by rivers (Indus, Ganga, Brahmaputra systems; east-coast deltas).
- **Distribution:** largest soil group (roughly two-fifths of India) — Punjab, Haryana, Uttar Pradesh, Bihar, West Bengal, Assam valley; deltas of the Mahanadi, Godavari, Krishna, Kaveri; coastal plains.
- **Composition:** sand, silt, clay; generally rich in potash and lime, poor in nitrogen and humus; coarse near the foothills, finer downstream.
- **Khadar:** new alluvium on low floodplains, renewed by floods, light-coloured, very fertile.
- **Bhangar:** old alluvium on higher terraces above flood level, more clayey, less fertile, contains **kankar**.
- **Crops:** wheat, rice, sugarcane, jute (deltas), pulses, oilseeds.`,
      [kt('Khadar', 'New alluvium on the low floodplains of rivers, renewed by floods almost every year.'), kt('Bhangar', 'Old alluvium on higher river terraces, above normal flood level, often containing kankar.'), kt('Kankar', 'Nodules (lumps) of lime found in bhangar soil.')],
      [],
      table(['Head', 'Khadar', 'Bhangar'], [['Age', 'New', 'Old'], ['Position', 'Low floodplain', 'Higher terrace'], ['Floods', 'Renewed often', 'Above flood level'], ['Fertility', 'High', 'Lower'], ['Kankar', 'Absent', 'Present']], 'Table comparing khadar and bhangar'),
      [1],
    ),
    sec(
      '2. Black soil (regur)',
      `- **Formation:** weathering of basalt (Deccan trap lava).
- **Distribution:** Maharashtra, Malwa plateau (Madhya Pradesh), Saurashtra (Gujarat), parts of Karnataka, Telangana, Andhra Pradesh.
- **Characteristics:** fine, clayey; retains moisture; sticky when wet; deep cracks when dry (self-ploughing); rich in lime, iron, magnesia, potash; poor in nitrogen, phosphorus, humus.
- **Crops:** cotton (black cotton soil), sugarcane, jowar, wheat, groundnut, tobacco.`,
      [kt('Regur', 'Another name for the black soil of the Deccan plateau.'), kt('Self-ploughing', 'The turning over of black soil as loose soil falls into the deep cracks that open in the dry season.')],
      [],
      table(['Property', 'Effect for the farmer'], [['Clayey', 'Holds water; sticky when wet'], ['Cracks when dry', 'Aeration, self-ploughing'], ['Rich in lime and potash', 'Good for cotton']], 'Table of black-soil properties and their effects'),
      [2],
    ),
    sec(
      '3. Red soil',
      `- **Formation:** weathering of old crystalline and metamorphic rocks (granite, gneiss) in low to moderate rainfall.
- **Colour:** red from iron oxide spread through the soil; yellow where the oxide is hydrated.
- **Distribution:** Tamil Nadu, Karnataka, Telangana, Andhra Pradesh, Odisha, Chhattisgarh, Chota Nagpur (Jharkhand).
- **Characteristics:** sandy to loamy, porous, light; low water retention; poor in nitrogen, phosphorus, humus.
- **Crops (with fertilisers, irrigation):** ragi, jowar, groundnut, pulses, tobacco; rice in lowlands.`,
      [kt('Iron oxide', 'The compound that gives red soil its colour; it looks yellow when hydrated.')],
      [],
      table(['Feature', 'Red soil'], [['Parent rock', 'Granite, gneiss'], ['Texture', 'Sandy to loamy'], ['Crops', 'Millets, groundnut']], 'Table summarising red soil'),
      [3],
    ),
    sec(
      '4. Laterite soil',
      `- **Formation:** high temperature and heavy rain with alternate wet and dry seasons; **leaching** removes lime and silica, leaving oxides of iron and aluminium. (Latin *later* = brick.)
- **Distribution:** summits of the Western and Eastern Ghats, Kerala, Karnataka, Goa, Odisha hills, Meghalaya.
- **Characteristics:** coarse, acidic, infertile; poor in nitrogen, lime, humus; hardens in air (used as building bricks).
- **Crops (with manure):** cashew, tea, coffee, rubber, coconut.

| Head | Red | Laterite |
|---|---|---|
| Rainfall | Low to moderate | Heavy |
| Process | Weathering | Leaching |
| Fertility | Low | Very low, acidic |
| Crops | Millets, groundnut | Cashew, tea, coffee |`,
      [kt('Leaching', 'The washing down of soluble minerals such as lime and silica by water percolating through soil.')],
      [],
      table(['Step', 'What happens'], [['Heavy rain', 'Water percolates through soil'], ['Leaching', 'Lime and silica removed'], ['Residue', 'Iron and aluminium oxides remain']], 'Table of the steps in laterite formation'),
      [3],
    ),
    sec(
      '5. Soil erosion',
      `- **Soil erosion:** removal of topsoil by natural agents faster than new soil forms.
- **Agents:** running water, wind, waves, glaciers.
- **Sheet erosion:** thin, even layer removed from a wide area by running water.
- **Gully erosion:** deep channels cut by running water; badly gullied land becomes **ravines** (Chambal valley).
- **Wind erosion:** dry, loose, bare soil blown away (western Rajasthan).
- **Human causes:** deforestation, overgrazing, ploughing up and down slopes, shifting cultivation, mining and construction.`,
      [kt('Soil erosion', 'The removal of the top layer of soil by water, wind or other agents faster than it can form.'), kt('Ravines', 'Land cut up by deep, joined gullies, unfit for farming.')],
      [],
      table(['Type', 'Agent', 'Example area'], [['Sheet', 'Running water', 'Gentle slopes'], ['Gully', 'Running water', 'Chambal valley'], ['Wind', 'Wind', 'Western Rajasthan']], 'Table of types of erosion with agent and example area'),
      [4],
    ),
    sec(
      '6. Soil conservation',
      `- **Meaning:** protecting soil from erosion and maintaining its fertility.
- **Importance:** soil forms slowly; agriculture depends on it; eroded silt fills reservoirs and worsens floods; loss of land hurts livelihoods.
- **Terrace farming:** flat steps on **steep slopes** (Himalayas, north-east).
- **Contour ploughing:** furrows across the slope on **gentle slopes**.
- **Strip cropping:** alternate strips of crops and grass.
- **Shelter belts:** rows of trees across the wind in **dry, windy plains** (western Rajasthan).
- **Afforestation:** trees on bare slopes and wasteland.
- **Plugging gullies:** check dams and planting in gullied land (Chambal).
- **Controlled grazing:** pasture rotation.`,
      [kt('Shelter belt', 'Rows of trees planted across the path of the wind to slow it and protect fields from wind erosion.'), kt('Contour ploughing', 'Ploughing across a slope along lines of equal height so that furrows hold back running water.')],
      [],
      table(['Method', 'Suits'], [['Terraces', 'Steep slopes'], ['Contour ploughing', 'Gentle slopes'], ['Shelter belts', 'Windy dry plains'], ['Check dams', 'Gullies']], 'Table of conservation methods and the land they suit'),
      [5],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Calling bhangar new alluvium, or saying khadar contains kankar.
- Saying black soil forms from river silt (it forms from basalt lava).
- Describing laterite as fertile.
- Writing that contour ploughing runs up and down the slope.

**How marks are usually awarded**
- Soil questions: formation, distribution, characteristics and crops (1 mark each point with a named area).
- "Give a geographical reason": the property and how it causes the effect.
- Conservation: method plus the type of land and a named region.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Largest soil group of India?', 'Alluvial soil.', 'fact', 1),
    fc(2, 'Khadar?', 'New alluvium on low floodplains, renewed by floods.', 'definition', 1),
    fc(3, 'Bhangar?', 'Old alluvium on higher terraces, with kankar.', 'definition', 1),
    fc(4, 'Kankar?', 'Lime nodules in bhangar.', 'definition', 1),
    fc(5, 'Two crops of alluvial soil?', 'Wheat and rice (also sugarcane, jute).', 'fact', 1),
    fc(6, 'Alluvial soil is usually poor in?', 'Nitrogen and humus.', 'fact', 1),
    fc(7, 'Parent rock of black soil?', 'Basalt (Deccan trap lava).', 'fact', 2),
    fc(8, 'Another name for black soil?', 'Regur (black cotton soil).', 'fact', 2),
    fc(9, 'Why does black soil suit cotton?', 'Holds moisture; rich in lime and potash.', 'concept', 2),
    fc(10, 'Self-ploughing?', 'Cracks in the dry season turn the soil over.', 'definition', 2),
    fc(11, 'Two states with black soil?', 'Maharashtra and Gujarat (also Madhya Pradesh).', 'fact', 2),
    fc(12, 'Why is red soil red?', 'Iron oxide spread through it.', 'concept', 3),
    fc(13, 'Red soil looks yellow when?', 'Its iron oxide is hydrated.', 'concept', 3),
    fc(14, 'Parent rocks of red soil?', 'Granite and gneiss (crystalline rocks).', 'fact', 3),
    fc(15, 'Crops of red soil?', 'Ragi, jowar, groundnut, pulses.', 'fact', 3),
    fc(16, 'Leaching?', 'Washing down of soluble minerals by percolating water.', 'definition', 3),
    fc(17, 'Laterite comes from the Latin for?', 'Brick.', 'fact', 3),
    fc(18, 'What remains in laterite?', 'Oxides of iron and aluminium.', 'concept', 3),
    fc(19, 'Crops on laterite?', 'Cashew, tea, coffee, rubber.', 'fact', 3),
    fc(20, 'Soil erosion?', 'Removal of topsoil faster than it forms.', 'definition', 4),
    fc(21, 'Sheet erosion?', 'Thin even layer removed by running water.', 'definition', 4),
    fc(22, 'Gully erosion leads to?', 'Ravines (e.g. Chambal valley).', 'example', 4),
    fc(23, 'Where is wind erosion serious?', 'Western Rajasthan.', 'fact', 4),
    fc(24, 'Two human causes of erosion?', 'Deforestation and overgrazing.', 'fact', 4),
    fc(25, 'Terrace farming suits?', 'Steep hill slopes.', 'concept', 5),
    fc(26, 'Contour ploughing?', 'Ploughing across the slope along contours.', 'definition', 5),
    fc(27, 'Shelter belts?', 'Rows of trees that break the wind.', 'definition', 5),
    fc(28, 'Check dams help?', 'Plug gullies and trap silt.', 'concept', 5),
    fc(29, 'Percentage reduction?', '(old − new) ÷ old × 100.', 'formula', 5),
    fc(30, 'Exam tip: conservation', 'Method + type of land + named region.', 'exam-tip', 5),
  ],
  status: 'draft',
  provenance: PROV,
};
