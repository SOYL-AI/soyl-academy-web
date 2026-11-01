// ICSE 10 Geography ch08 Natural Vegetation — notes and flashcards.
import { T, table, unit, PROV } from './lib.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Natural Vegetation — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Importance of forests',
      `- **Natural vegetation:** plant cover that grows without being planted by people.
- **Ecological:** oxygen and carbon dioxide balance; moderate temperature and add moisture (help rainfall); roots bind soil, litter slows runoff (less erosion, smaller floods); groundwater recharge; habitat and biodiversity; humus.
- **Economic:** timber, fuelwood, fodder; raw material for paper, plywood, matches, rayon; minor products (lac, gum, resin, honey, cane, tendu leaves, medicinal plants); tribal livelihoods; tourism.`,
      [kt('Natural vegetation', 'Plant cover that grows on its own, without human planting.'), kt('Minor forest products', 'Forest products other than timber, such as lac, gum, honey, cane and tendu leaves.')],
      [],
      table(['Ecological', 'Economic'], [['Check erosion and floods', 'Timber and fuelwood'], ['Recharge groundwater', 'Industrial raw materials'], ['Wildlife habitat', 'Minor forest products']], 'Table contrasting ecological and economic importance of forests'),
      [1],
    ),
    sec(
      '2. Tropical evergreen forests',
      `- **Climate:** over 200 cm rain; hot and humid all year.
- **Distribution:** western slopes of the Western Ghats; north-eastern hills; Andaman and Nicobar Islands.
- **Features:** very dense; several storeys; tall trees; leaves shed at different times (green all year); many species mixed; climbers and undergrowth.
- **Trees:** ebony, mahogany, rosewood, rubber, cinchona; bamboo and canes.
- **Exploitation is difficult:** mixed stands, dense growth, hilly remote land, heavy logs.`,
      [kt('Evergreen', 'Never bare of leaves as a whole, because trees shed leaves at different times.')],
      [],
      table(['Feature', 'Linked to'], [['Dense, storeyed', 'Heavy rain, constant warmth'], ['Green all year', 'No marked dry season'], ['Hard to log', 'Mixed species, terrain']], 'Table linking evergreen forest features to causes'),
      [2],
    ),
    sec(
      '3. Tropical deciduous (monsoon) forests',
      `- **Leaf fall:** trees shed leaves for 6–8 weeks in the dry summer to reduce water loss.
- **Moist deciduous (100–200 cm):** north-east along the foothills, Jharkhand, Odisha, Chhattisgarh, eastern slopes of the Western Ghats; teak, sal, shisham, sandalwood, bamboo, khair, arjun.
- **Dry deciduous (70–100 cm):** drier plateau, plains of Bihar and Uttar Pradesh; teak, sal, peepal, neem; open with grass.
- **Most important commercially:** large area, valuable timber, fairly pure stands, easier access.

| Tree | Use |
|---|---|
| Teak | Furniture, doors, boats |
| Sal | Railway sleepers, building |
| Sandalwood | Carving, perfume oil |
| Bamboo | Paper pulp, building |`,
      [kt('Monsoon forests', 'Another name for tropical deciduous forests, which shed their leaves in the dry season.')],
      [],
      table(['Type', 'Rainfall', 'Trees'], [['Moist deciduous', '100–200 cm', 'Teak, sal, sandalwood'], ['Dry deciduous', '70–100 cm', 'Teak, peepal, neem']], 'Table of moist and dry deciduous forests'),
      [2],
    ),
    sec(
      '4. Tropical desert and littoral vegetation',
      `- **Desert (thorn):** under 70 cm; western Rajasthan, Kutch, Saurashtra, south-west Punjab and Haryana; long roots, small thorny or waxy leaves, fleshy stems; babul, khejri, kikar, ber, cacti, euphorbias.
- **Littoral (tidal) or mangrove:** deltas of the Ganga–Brahmaputra (Sundarbans), Mahanadi, Godavari, Krishna, Kaveri; Andaman and Nicobar; salt-tolerant; **stilt roots** for support; **breathing roots (pneumatophores)** for air; sundari (boat timber), keora, agar, nipa.
- Mangroves protect coasts from storm waves, trap silt and shelter fish and wildlife.`,
      [kt('Pneumatophores', 'Breathing roots that grow upward from the mud and take in air at low tide.'), kt('Littoral forest', 'Forest of tidal coasts and deltas, mainly mangroves.')],
      [],
      table(['Vegetation', 'Adaptation'], [['Desert', 'Deep roots, small leaves'], ['Mangrove', 'Salt tolerance, breathing roots']], 'Table of desert and mangrove adaptations'),
      [3],
    ),
    sec(
      '5. Mountain vegetation',
      `- Temperature falls with altitude (about 6.5 °C per 1000 m), so vegetation changes in belts.
- **Foothills:** tropical moist deciduous (sal).
- **About 1000–2000 m:** wet temperate — oak, chestnut.
- **About 2000–3000 m:** temperate coniferous — pine, deodar, spruce, silver fir, cedar.
- **About 3000–3600 m:** alpine — silver fir, juniper, birch, rhododendron.
- **Above about 3600 m:** alpine meadows (summer grazing); mosses and lichens; then snow.
- Altitudes are approximate and vary from east to west.`,
      [kt('Coniferous trees', 'Cone-bearing trees with needle-shaped leaves, such as pine and deodar.'), kt('Alpine meadows', 'High grasslands above the tree line, used for summer grazing.')],
      [],
      table(['Approx. altitude', 'Vegetation'], [['Below 1000 m', 'Sal'], ['1000–2000 m', 'Oak, chestnut'], ['2000–3000 m', 'Pine, deodar'], ['Above 3600 m', 'Meadows']], 'Table of mountain vegetation belts'),
      [3],
    ),
    sec(
      '6. Forest conservation',
      `- **Threats:** clearing for farms, roads, dams, mines and towns; overgrazing; fuelwood; fires; shifting cultivation.
- **Afforestation:** trees on land without forest (wasteland, dunes).
- **Reforestation:** replanting where forest was cut or burnt.
- **Social forestry:** trees on public and community land (roadsides, canal banks, village commons) for local fuel, fodder and small timber.
- **Agroforestry:** trees grown with crops on the same farmland.
- **Van Mahotsav:** tree-planting festival started in 1950, held every year in the first week of July; aim — awareness of the value of trees and planting saplings.`,
      [kt('Afforestation', 'Planting trees on land that has not carried forest.'), kt('Reforestation', 'Replanting trees on land where forest has been cut or destroyed.'), kt('Social forestry', 'Tree planting on public and community land to meet local needs, with people’s participation.'), kt('Agroforestry', 'Growing trees together with crops on the same farmland.')],
      [],
      table(['Pair', 'Difference'], [['Afforestation / reforestation', 'New forest / restored forest'], ['Social forestry / agroforestry', 'Public land / private farmland']], 'Table of the two pairs of conservation terms'),
      [4],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Saying evergreen trees never shed leaves.
- Calling teak or sal evergreen trees.
- Explaining mountain belts by rainfall instead of temperature.
- Mixing up social forestry (public land) and agroforestry (farmland).

**How marks are usually awarded**
- Forest types: climate, distribution, features, trees with uses (1 mark per correct point with a named area).
- Adaptations: feature plus how it helps.
- Conservation terms: one clear difference, with an example.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Natural vegetation?', 'Plants that grow on their own, unplanted.', 'definition', 1),
    fc(2, 'Two ecological roles of forests?', 'Check soil erosion; recharge groundwater.', 'fact', 1),
    fc(3, 'Two economic uses of forests?', 'Timber; raw material for paper.', 'fact', 1),
    fc(4, 'Tendu leaves are used for?', 'Wrapping bidis.', 'fact', 1),
    fc(5, 'Rainfall for tropical evergreen?', 'Over about 200 cm.', 'fact', 2),
    fc(6, 'Why is the evergreen forest always green?', 'Leaves are shed at different times.', 'concept', 2),
    fc(7, 'Three evergreen trees?', 'Ebony, mahogany, rosewood.', 'fact', 2),
    fc(8, 'Quinine comes from?', 'Cinchona bark.', 'fact', 2),
    fc(9, 'Why are evergreen forests hard to log?', 'Mixed species, dense growth, remote hills.', 'concept', 2),
    fc(10, 'Another name for tropical deciduous forests?', 'Monsoon forests.', 'definition', 2),
    fc(11, 'Why do deciduous trees shed leaves?', 'To reduce water loss in the dry season.', 'concept', 2),
    fc(12, 'Rainfall for moist deciduous?', '100–200 cm.', 'fact', 2),
    fc(13, 'Rainfall for dry deciduous?', '70–100 cm.', 'fact', 2),
    fc(14, 'Use of sal timber?', 'Railway sleepers, building.', 'fact', 2),
    fc(15, 'Sandalwood is found mainly in?', 'Karnataka.', 'fact', 2),
    fc(16, 'Most important forests commercially?', 'Tropical deciduous.', 'fact', 2),
    fc(17, 'Desert plants: two adaptations?', 'Long roots; small thorny leaves.', 'concept', 3),
    fc(18, 'Two desert trees?', 'Babul and khejri.', 'fact', 3),
    fc(19, 'Where are mangroves found?', 'Tidal deltas, e.g. the Sundarbans.', 'example', 3),
    fc(20, 'Pneumatophores?', 'Breathing roots of mangroves.', 'definition', 3),
    fc(21, 'Use of sundari timber?', 'Boat-building.', 'fact', 3),
    fc(22, 'Why do mountain belts form?', 'Temperature falls with altitude.', 'concept', 3),
    fc(23, 'Trees at about 1000–2000 m?', 'Oak and chestnut.', 'fact', 3),
    fc(24, 'Trees at about 2000–3000 m?', 'Pine, deodar, spruce, fir.', 'fact', 3),
    fc(25, 'Above the tree line?', 'Alpine meadows, then mosses and lichens.', 'fact', 3),
    fc(26, 'Afforestation?', 'Planting trees where there was no forest.', 'definition', 4),
    fc(27, 'Reforestation?', 'Replanting where forest was cut or burnt.', 'definition', 4),
    fc(28, 'Social forestry?', 'Trees on public land for local needs.', 'definition', 4),
    fc(29, 'Agroforestry?', 'Trees with crops on the same farm.', 'definition', 4),
    fc(30, 'Van Mahotsav?', 'Tree-planting festival, July, since 1950.', 'fact', 4),
    fc(31, 'Share of a forest type?', 'Its area ÷ total area × 100.', 'formula', 2),
    fc(32, 'Exam tip: adaptations', 'Feature + how it helps.', 'exam-tip', 3),
  ],
  status: 'draft',
  provenance: PROV,
};
