// ICSE 10 Geography ch11 Energy Resources — notes and flashcards.
import { T, table, unit, PROV } from './lib.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Energy Resources — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Coal',
      `- **Types (by carbon content):** anthracite (highest; small deposits in Jammu and Kashmir) > bituminous (most used; coking coal for steel) > lignite (brown, moist) > peat (lowest, smoky).
- **Gondwana coal** (over 200 million years old, most of India’s coal): Damodar valley — Jharia, Bokaro, Giridih (Jharkhand), Raniganj (West Bengal); Mahanadi valley — Talcher (Odisha), Korba (Chhattisgarh); Son valley — Singrauli; Godavari valley — Singareni (Telangana).
- **Tertiary coal** (younger, high sulphur): Makum (Assam), Meghalaya, Arunachal Pradesh. **Lignite:** Neyveli (Tamil Nadu), Panandhro (Gujarat), Palana (Rajasthan).
- **Advantages:** large home reserves; steady power in all seasons; coking coal for steel; by-products (coal tar, gas).
- **Disadvantages:** non-renewable; carbon dioxide, sulphur dioxide and fly ash; high ash content of Indian coal; mining damages land and forests; bulky to transport.`,
      [kt('Coking coal', 'Bituminous coal that can be heated to make coke for smelting iron ore.'), kt('Gondwana coal', 'The older coal of the peninsular river valleys that supplies most of India’s coal.')],
      [],
      table(['Valley', 'Coalfields'], [['Damodar', 'Jharia, Bokaro, Raniganj'], ['Mahanadi', 'Talcher, Korba'], ['Godavari', 'Singareni']], 'Table of three coal-bearing valleys and their coalfields'),
      [1],
    ),
    sec(
      '2. Petroleum and natural gas',
      `| Region | Type | Fields |
|---|---|---|
| Assam | Onshore | Digboi, Naharkatiya, Moran |
| Gujarat (Cambay basin) | Onshore | Ankleshwar, Kalol, Lunej, Mehsana |
| Rajasthan | Onshore | Mangala (Barmer) |
| Arabian Sea | Offshore | Mumbai High, Bassein (gas) |
| East coast | Offshore and onshore | Krishna–Godavari basin |

- Petroleum occurs in **sedimentary rocks**, trapped in folds and faults; India imports most of its crude oil (as of the early 2020s).
- **Natural gas** is cleaner than coal: burns almost completely, almost no ash or soot, little sulphur dioxide, less carbon dioxide per unit of heat. Carried by pipelines (HVJ). Uses: power, fertiliser (urea), petrochemicals, piped cooking gas, CNG.`,
      [kt('Offshore oil field', 'An oil field under the sea floor, usually on the continental shelf, such as Mumbai High.'), kt('CNG', 'Compressed natural gas, a cleaner fuel used by buses and autos in many cities.')],
      [],
      table(['Fuel', 'Ash', 'Sulphur dioxide'], [['Coal', 'High', 'Often high'], ['Natural gas', 'Almost none', 'Very low']], 'Table comparing ash and sulphur dioxide from coal and natural gas'),
      [2],
    ),
    sec(
      '3. Hydel power',
      `- **How:** water stored behind a dam falls through a penstock and turns turbines linked to generators.
- **Needs:** perennial river, large head (height of fall), narrow valley with strong rock, demand nearby.
- **Bhakra Nangal:** river **Sutlej**; Bhakra dam in **Himachal Pradesh** (Gobind Sagar reservoir), Nangal dam in **Punjab**. Irrigation for Punjab, Haryana, Rajasthan; power; flood control.
- **Hirakud:** river **Mahanadi**, near **Sambalpur, Odisha**; one of the longest earthen dams. Flood control in the Mahanadi delta; irrigation; power.
- **Advantages over thermal:** renewable; no smoke or ash; low running cost; multipurpose (irrigation, flood control, fishing, tourism).
- **Disadvantages:** high construction cost; displacement of people; submerged forests; less power in drought; silting.`,
      [kt('Multipurpose project', 'A river valley project that serves several aims at once, such as irrigation, power and flood control.'), kt('Head', 'The height through which water falls from the reservoir surface to the turbine.')],
      [],
      table(['Project', 'River', 'State'], [['Bhakra Nangal', 'Sutlej', 'Himachal Pradesh, Punjab'], ['Hirakud', 'Mahanadi', 'Odisha']], 'Table of two hydel projects with river and state'),
      [3],
    ),
    sec(
      '4. Solar, wind and tidal energy',
      `| Source | Important areas | Advantage | Disadvantage |
|---|---|---|---|
| Solar | Bhadla (Rajasthan), Charanka (Gujarat), Pavagada (Karnataka) | No fuel, no smoke | No output at night; land |
| Wind | Muppandal (Tamil Nadu), Kutch coast (Gujarat), Jaisalmer, Satara | Clean, cheap to run | Varies with wind; noise |
| Tidal | Gulfs of Khambhat and Kutch, Sundarbans | Predictable | Very costly; few sites; harms mangroves |

Tidal power needs a **large tidal range** in a **narrow, funnel-shaped** inlet.`,
      [kt('Photovoltaic cell', 'A device that changes sunlight directly into electricity.'), kt('Tidal range', 'The difference in sea level between high tide and low tide.')],
      [],
      table(['Source', 'Leading area'], [['Solar', 'Western Rajasthan'], ['Wind', 'Tamil Nadu'], ['Tidal', 'Gulf of Khambhat']], 'Table of three non-conventional sources and a leading area for each'),
      [4],
    ),
    sec(
      '5. Geothermal, nuclear and biogas',
      `- **Geothermal:** heat from inside the Earth, seen as hot springs — **Puga valley** (Ladakh), **Manikaran** (Himachal Pradesh). Clean and steady but few, remote sites.
- **Nuclear:** uranium from **Jaduguda** (Jharkhand); thorium from monazite sands of Kerala. Stations: Tarapur (Maharashtra), Rawatbhata (Rajasthan), Kalpakkam and Kudankulam (Tamil Nadu), Narora (Uttar Pradesh), Kakrapar (Gujarat), Kaiga (Karnataka). Much power from little fuel, no smoke; but radiation risk, radioactive waste, high cost.
- **Biogas:** dung and water in an airtight digester; bacteria act without air; gas mainly **methane**; slurry becomes manure. Benefits: smokeless fuel, saves firewood, manure, cleaner villages.`,
      [kt('Biogas', 'A fuel gas, mainly methane, made by bacteria breaking down dung or plant waste without air.'), kt('Geothermal energy', 'Energy obtained from the natural heat of the Earth’s interior.')],
      [],
      table(['Station', 'State'], [['Tarapur', 'Maharashtra'], ['Kaiga', 'Karnataka'], ['Kakrapar', 'Gujarat']], 'Table of three nuclear stations and their states'),
      [5],
    ),
    sec(
      '6. Comparing sources and reading energy data',
      `- **Conventional:** coal, petroleum, natural gas, large hydel — long in use, mostly non-renewable (except hydel).
- **Non-conventional:** solar, wind, tidal, geothermal, nuclear, biogas — newer, mostly renewable and cleaner.
- **Share of a source** = (its capacity ÷ total capacity) × 100.
- In a capacity table, add all sources for the total first; then compare renewable and non-renewable shares.`,
      [kt('Installed capacity', 'The maximum electricity that all the power stations of an area can produce, measured in megawatts.')],
      [],
      table(['Group', 'Examples'], [['Conventional', 'Coal, oil, gas, hydel'], ['Non-conventional', 'Solar, wind, tidal, geothermal, nuclear, biogas']], 'Table of conventional and non-conventional sources'),
      [1, 4, 5],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Placing Hirakud on the Sutlej or Bhakra on the Mahanadi.
- Calling Mumbai High an onshore field or placing it in the Bay of Bengal.
- Saying biogas is mainly carbon dioxide (it is mainly methane).
- Writing that tidal power suits any coast.

**How marks are usually awarded**
- Location answers (1 mark each): name the place with its state, river or valley.
- Advantages and disadvantages (1 mark each): one clear, different point each time.
- Process answers (3 marks): biogas or hydel steps in the correct order.
- Data (2–3 marks): total, working and answer with unit.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Coal with the highest carbon content?', 'Anthracite.', 'fact', 1),
    fc(2, 'Most widely used coal in India?', 'Bituminous.', 'fact', 1),
    fc(3, 'Coking coal is used for?', 'Making coke to smelt iron ore in steel plants.', 'concept', 1),
    fc(4, 'Lignite?', 'Brown coal with low carbon and high moisture.', 'definition', 1),
    fc(5, 'Two Damodar valley coalfields?', 'Jharia and Raniganj (also Bokaro).', 'fact', 1),
    fc(6, 'Singareni coalfield lies in which valley?', 'Godavari valley (Telangana).', 'fact', 1),
    fc(7, 'Tertiary coal of Assam?', 'Makum — younger coal with high sulphur.', 'fact', 1),
    fc(8, 'Two disadvantages of coal?', 'Non-renewable; smoke and fly ash pollution.', 'concept', 1),
    fc(9, 'Offshore oil field in the Arabian Sea?', 'Mumbai High.', 'fact', 2),
    fc(10, 'Two onshore oil fields of Gujarat?', 'Ankleshwar and Kalol.', 'fact', 2),
    fc(11, 'Old oil field of Assam with a refinery?', 'Digboi.', 'fact', 2),
    fc(12, 'Why is natural gas cleaner than coal?', 'Burns almost completely: no ash, little sulphur dioxide, less carbon dioxide.', 'concept', 2),
    fc(13, 'HVJ pipeline carries?', 'Natural gas from the west coast to plants in the north.', 'fact', 2),
    fc(14, 'Rock in which petroleum is found?', 'Sedimentary rock.', 'fact', 2),
    fc(15, 'Bhakra dam: river and state?', 'Sutlej; Himachal Pradesh.', 'fact', 3),
    fc(16, 'Reservoir of the Bhakra dam?', 'Gobind Sagar.', 'fact', 3),
    fc(17, 'Hirakud dam: river and state?', 'Mahanadi; Odisha (near Sambalpur).', 'fact', 3),
    fc(18, 'Main aim of Hirakud?', 'Flood control in the Mahanadi delta (also irrigation, power).', 'concept', 3),
    fc(19, 'Two advantages of hydel over thermal power?', 'Renewable; no smoke or ash (also cheap to run, multipurpose).', 'concept', 3),
    fc(20, 'Penstock?', 'The pipe that carries water down from the reservoir to the turbines.', 'diagram', 3),
    fc(21, 'Photovoltaic cell?', 'Changes sunlight directly into electricity.', 'definition', 4),
    fc(22, 'Large solar park in Jodhpur district?', 'Bhadla (Rajasthan).', 'fact', 4),
    fc(23, 'Wind-farm area in Kanyakumari district?', 'Muppandal (Tamil Nadu).', 'fact', 4),
    fc(24, 'Condition for tidal power?', 'Large tidal range in a narrow, funnel-shaped gulf.', 'concept', 4),
    fc(25, 'Two tidal power sites?', 'Gulf of Khambhat and Gulf of Kutch (also Sundarbans).', 'fact', 4),
    fc(26, 'Two geothermal sites?', 'Puga valley (Ladakh) and Manikaran (Himachal Pradesh).', 'fact', 5),
    fc(27, 'Uranium mine in Jharkhand?', 'Jaduguda.', 'fact', 5),
    fc(28, 'Main gas in biogas?', 'Methane.', 'fact', 5),
    fc(29, 'Biogas plant: steps?', 'Dung and water, digester without air, methane collected, slurry used as manure.', 'diagram', 5),
    fc(30, 'Share of a source?', '(Its capacity ÷ total capacity) × 100.', 'formula', 5),
    fc(31, 'Exam tip: dams', 'Always give the river and the state.', 'exam-tip', 3),
  ],
  status: 'draft',
  provenance: PROV,
};
