// ICSE 10 Geography ch10 Mineral Resources — notes and flashcards.
import { T, table, unit, PROV } from './lib.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Mineral Resources — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Minerals, ores and grade',
      `- **Mineral:** natural substance with a definite chemical composition.
- **Ore:** rock from which a metal can be extracted profitably.
- **Grade:** share of metal in an ore; high grade → more metal, less waste.
- **Ferrous** (iron ore, manganese) and **non-ferrous** (copper, bauxite) metallic minerals.
- Metal in an ore = grade ÷ 100 × tonnes of ore.`,
      [kt('Ore', 'A mineral or rock from which a metal can be extracted profitably.'), kt('Grade', 'The proportion of metal contained in an ore.')],
      [],
      table(['Ferrous', 'Non-ferrous'], [['Iron ore', 'Copper'], ['Manganese', 'Bauxite']], 'Table classifying the four minerals as ferrous or non-ferrous'),
      [1],
    ),
    sec(
      '2. Iron ore: types and uses',
      `- **Magnetite:** black, magnetic; richest (up to about 70% iron).
- **Hematite:** reddish; about 60–70% iron; most mined in India.
- **Limonite:** yellowish-brown, hydrated; lower grade (about 35–50%).
- **Siderite:** iron carbonate; many impurities; low grade.
- **Uses:** smelted with coke and limestone in a blast furnace → pig iron → steel for railways, bridges, ships, buildings, machinery, vehicles, tools, utensils.
- Grade values are approximate and vary between deposits.`,
      [kt('Hematite', 'A reddish iron ore with a high iron content; the ore most mined in India.'), kt('Magnetite', 'A black, magnetic iron ore with the highest iron content.')],
      [],
      table(['Ore', 'Colour', 'Grade'], [['Magnetite', 'Black', 'Highest'], ['Hematite', 'Reddish', 'High'], ['Limonite', 'Yellow-brown', 'Medium'], ['Siderite', 'Brownish (carbonate)', 'Low']], 'Table of the four iron ores with colour and grade'),
      [1],
    ),
    sec(
      '3. Iron ore: distribution',
      `- **Leading states (as of the early 2020s): Odisha and Chhattisgarh**; also Karnataka and Jharkhand.
- **Odisha:** Keonjhar (Joda, Barbil), Sundargarh (Bonai), Mayurbhanj (Gorumahisani, Badampahar, Sulaipat).
- **Chhattisgarh:** Bailadila range (Dantewada); Dalli-Rajhara (supplies Bhilai).
- **Jharkhand:** Noamundi, Gua (Singhbhum).
- **Karnataka:** Bellary–Hospet (Sandur).
- Mostly **open-cast** mining of thick surface deposits on hill tops.
- Steel plants are built near the mines because iron ore is heavy and bulky (Bhilai, Rourkela).`,
      [kt('Open-cast mining', 'Mining from an open pit after removing the overburden, used where the ore lies near the surface.')],
      [],
      table(['State', 'Mining area'], [['Odisha', 'Keonjhar'], ['Chhattisgarh', 'Bailadila'], ['Jharkhand', 'Noamundi'], ['Karnataka', 'Bellary–Hospet']], 'Table of iron-ore states and a mining area in each'),
      [1],
    ),
    sec(
      '4. Manganese',
      `- **Uses:** steel making (ferro-manganese hardens steel and removes impurities); dry-cell batteries; bleaching powder; insecticides; paints; glass and ceramics.
- **Leading states (as of the early 2020s):** Madhya Pradesh, Maharashtra, Odisha; also Karnataka.
- **Areas:** Balaghat and Chhindwara (Madhya Pradesh); Nagpur and Bhandara (Maharashtra); Keonjhar, Sundargarh, Koraput (Odisha); Sandur (Karnataka).`,
      [kt('Ferro-manganese', 'An alloy of iron and manganese used to harden steel and remove impurities.')],
      [],
      table(['State', 'Manganese area'], [['Madhya Pradesh', 'Balaghat'], ['Maharashtra', 'Nagpur'], ['Odisha', 'Keonjhar']], 'Table of manganese states and areas'),
      [2],
    ),
    sec(
      '5. Copper',
      `- **Properties:** excellent conductor of electricity and heat; ductile; malleable; resists corrosion.
- **Uses:** electrical cables and wires, motors, transformers, generators, electronics, utensils, coins; alloys **brass** (copper + zinc) and **bronze** (copper + tin).
- **Leading states (as of the early 2020s):** Madhya Pradesh and Rajasthan; also Jharkhand.
- **Areas:** Malanjkhand (Balaghat, Madhya Pradesh); Khetri–Singhana (Jhunjhunu, Rajasthan), Alwar; Singhbhum belt — Ghatsila, Mosabani, Rakha (Jharkhand).
- Reserves are limited and low grade, so India imports much copper.`,
      [kt('Brass', 'An alloy of copper and zinc.'), kt('Bronze', 'An alloy of copper and tin.')],
      [],
      table(['State', 'Copper area'], [['Madhya Pradesh', 'Malanjkhand'], ['Rajasthan', 'Khetri'], ['Jharkhand', 'Ghatsila, Mosabani']], 'Table of copper states and areas'),
      [3],
    ),
    sec(
      '6. Bauxite',
      `- **Bauxite:** ore of aluminium (hydrated aluminium oxide), found in laterite areas.
- **Aluminium:** light, strong, good conductor, does not rust; aircraft, vehicles, overhead cables, utensils, foil and cans, window frames. Bauxite also used for cement, abrasives, refractories.
- **Process:** bauxite → **alumina** (refinery, e.g. Damanjodi) → **aluminium** (smelter, e.g. Angul, Hirakud, Renukoot); smelting needs huge amounts of electricity. Rounded ratio about 5 : 2 : 1 by mass.
- **Leading states (as of the early 2020s):** Odisha and Gujarat; also Jharkhand, Chhattisgarh, Maharashtra, Madhya Pradesh.
- **Areas:** Koraput (Panchpatmali), Kalahandi (Odisha); Jamnagar, Kutch, Bhavnagar (Gujarat); Lohardaga (Jharkhand); Mainpat, Amarkantak (Chhattisgarh); Kolhapur, Ratnagiri (Maharashtra).`,
      [kt('Alumina', 'Aluminium oxide, the white powder refined from bauxite and smelted into aluminium.'), kt('Smelter', 'A plant where alumina is turned into aluminium by electrolysis.')],
      [],
      table(['State', 'Bauxite area'], [['Odisha', 'Koraput'], ['Gujarat', 'Jamnagar'], ['Jharkhand', 'Lohardaga']], 'Table of bauxite states and areas'),
      [4],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Calling limonite the richest iron ore (it is magnetite).
- Placing Bailadila in Odisha or Khetri in Madhya Pradesh.
- Writing bronze as copper + zinc (that is brass).
- Saying bauxite is smelted directly (it is first refined to alumina).

**How marks are usually awarded**
- Uses: one mark per specific use (with the property where asked).
- Distribution: state plus a named mining area for each mark.
- Ore calculations: grade ÷ 100 × tonnes, with the unit.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Ore?', 'Rock from which a metal is extracted profitably.', 'definition', 1),
    fc(2, 'Four iron ores, richest first?', 'Magnetite, hematite, limonite, siderite.', 'fact', 1),
    fc(3, 'Iron ore most mined in India?', 'Hematite.', 'fact', 1),
    fc(4, 'Black, magnetic iron ore?', 'Magnetite.', 'fact', 1),
    fc(5, 'Yellow-brown hydrated iron ore?', 'Limonite.', 'fact', 1),
    fc(6, 'Iron ore + coke + limestone in a blast furnace gives?', 'Pig iron (then steel).', 'concept', 1),
    fc(7, 'Two leading iron-ore states?', 'Odisha and Chhattisgarh (early 2020s).', 'fact', 1),
    fc(8, 'Iron-ore centres of Keonjhar?', 'Joda and Barbil.', 'fact', 1),
    fc(9, 'Iron-ore range in Dantewada?', 'Bailadila (Chhattisgarh).', 'fact', 1),
    fc(10, 'Mines that feed Bhilai?', 'Dalli-Rajhara.', 'fact', 1),
    fc(11, 'Iron-ore mine in Singhbhum, Jharkhand?', 'Noamundi (also Gua).', 'fact', 1),
    fc(12, 'Why steel plants near iron-ore mines?', 'Ore is heavy and bulky; costly to carry.', 'concept', 1),
    fc(13, 'Main use of manganese?', 'Hardening steel (ferro-manganese).', 'fact', 2),
    fc(14, 'Two other uses of manganese?', 'Dry-cell batteries, bleaching powder.', 'fact', 2),
    fc(15, 'Manganese districts of Madhya Pradesh?', 'Balaghat and Chhindwara.', 'fact', 2),
    fc(16, 'Manganese areas of Maharashtra?', 'Nagpur and Bhandara.', 'fact', 2),
    fc(17, 'Why copper for wires?', 'Excellent conductor; ductile.', 'concept', 3),
    fc(18, 'Brass?', 'Copper + zinc.', 'definition', 3),
    fc(19, 'Bronze?', 'Copper + tin.', 'definition', 3),
    fc(20, 'Copper mine in Balaghat?', 'Malanjkhand (Madhya Pradesh).', 'fact', 3),
    fc(21, 'Copper complex in Jhunjhunu?', 'Khetri (Rajasthan).', 'fact', 3),
    fc(22, 'Copper belt of Jharkhand?', 'Singhbhum: Ghatsila, Mosabani.', 'fact', 3),
    fc(23, 'Why does India import copper?', 'Limited, low-grade ores; high demand.', 'concept', 3),
    fc(24, 'Bauxite is the ore of?', 'Aluminium.', 'fact', 4),
    fc(25, 'Bauxite → ? → aluminium', 'Alumina.', 'concept', 4),
    fc(26, 'Why are smelters near cheap power?', 'Smelting uses huge amounts of electricity.', 'concept', 4),
    fc(27, 'Two leading bauxite states?', 'Odisha and Gujarat (early 2020s).', 'fact', 4),
    fc(28, 'Bauxite district of Jharkhand?', 'Lohardaga.', 'fact', 4),
    fc(29, 'Two uses of aluminium?', 'Aircraft; overhead power cables.', 'fact', 4),
    fc(30, 'Metal in an ore?', 'Grade ÷ 100 × tonnes of ore.', 'formula', 1),
    fc(31, 'Exam tip: distribution', 'State + named mining area every time.', 'exam-tip', 1),
  ],
  status: 'draft',
  provenance: PROV,
};
