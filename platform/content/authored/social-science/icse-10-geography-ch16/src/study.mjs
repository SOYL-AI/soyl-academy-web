// ICSE 10 Geography ch16 Mineral-based Industries: Iron and Steel, Petrochemicals and Electronics — notes and flashcards.
import { T, table, unit, PROV } from './lib.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Mineral-based Industries: Iron and Steel, Petrochemicals and Electronics — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Integrated iron and steel plants: raw materials',
      `- **Integrated plant:** all stages at one site — coke ovens, blast furnace, steel melting shop, rolling mills.
- **Raw materials:** iron ore (mainly hematite); coking coal (coke: fuel and reducing agent); limestone and dolomite (flux, removes impurities as slag); manganese (hardens steel); refractories (fire clay, quartzite); water; power.
- **Illustrative needs per tonne of steel:** iron ore 1.6 t, coking coal 0.8 t, limestone and dolomite 0.3 t, manganese ore 0.02 t — about 2.7 t of solids.
- **By-product:** slag, used to make cement.`,
      [kt('Integrated steel plant', 'A plant that carries out every stage of steel making, from raw materials to rolled steel, at one site.'), kt('Flux', 'A substance such as limestone that combines with impurities in the furnace to form slag.'), kt('Coke', 'A hard fuel made by heating coking coal without air; it melts and reduces iron ore.')],
      [],
      table(['Input', 'Role'], [['Iron ore', 'Iron'], ['Coke', 'Fuel, reducing agent'], ['Limestone', 'Flux'], ['Manganese', 'Hardens steel']], 'Table of steel inputs and their roles'),
      [1],
    ),
    sec(
      '2. Location of iron and steel plants',
      `- Raw materials are heavy and bulky and lose weight in smelting, so plants are built where raw materials can be assembled most cheaply.
- **Near coalfields** (Damodar valley), **near iron-ore fields** (Odisha, Chhattisgarh), **between the two** (two-way rail traffic, Jamshedpur), or **at ports** (imported coking coal, exports — Visakhapatnam).
- Also needed: water, railways, labour, market, capital.
- **Tonne-kilometres** = tonnes carried × distance; the lower the total, the cheaper the site.`,
      [kt('Tonne-kilometre', 'A unit of transport work: one tonne carried one kilometre.')],
      [],
      table(['Location type', 'Example'], [['Between coal and ore', 'Jamshedpur'], ['On the ore field', 'Rourkela'], ['At a port', 'Visakhapatnam']], 'Table of location types of steel plants with examples'),
      [1],
    ),
    sec(
      '3. Tata Steel, Rourkela and Visakhapatnam',
      `| Head | Tata Steel, Jamshedpur | Rourkela | Visakhapatnam |
|---|---|---|---|
| State | Jharkhand | Odisha (Sundargarh) | Andhra Pradesh |
| Ownership | Private; founded 1907 | Public (SAIL); German help; 1959 | Public (RINL, as of the early 2020s); early 1990s |
| Iron ore | Noamundi, Joda | Barsua, Kalta, Keonjhar | Bailadila (Chhattisgarh) |
| Coking coal | Jharia, West Bokaro | Jharia, Talcher | Mostly imported via the port |
| Other | Subarnarekha and Kharkai rivers; Kolkata port | Limestone and dolomite from Purnapani and Birmitrapur; Mandira dam; Hirakud power | First shore-based integrated plant; exports by sea |`,
      [kt('SAIL', 'Steel Authority of India Limited, the public sector company that runs Rourkela and other steel plants.'), kt('RINL', 'Rashtriya Ispat Nigam Limited, the public sector company that runs the Visakhapatnam Steel Plant.')],
      [],
      table(['Plant', 'Ownership'], [['Jamshedpur', 'Private'], ['Rourkela', 'Public (SAIL)'], ['Visakhapatnam', 'Public (RINL)']], 'Table of plants and their ownership'),
      [2],
    ),
    sec(
      '4. Petrochemical industry',
      `- **Petrochemicals:** chemicals from crude oil and natural gas; refineries and crackers make ethylene, propylene and benzene, which become polymers and other compounds.
- **Products:** plastics (polyethylene, PVC), synthetic fibres (polyester, nylon, acrylic), synthetic rubber, detergents, paints, solvents, dyes, raw materials for fertilisers and medicines.
- **Centres:** Jamnagar, Vadodara (Koyali), Hazira, Dahej (Gujarat — leading region as of the early 2020s); Mumbai (Trombay), Thane–Belapur; Haldia; Panipat; Mangaluru; Chennai (Manali); Kochi; Barauni; Bongaigaon; Paradip.
- **Relevance:** cheap, light, durable substitutes for wood, metal, glass and natural fibres; uses in farming, health, clothing, transport; jobs and exports.
- **Concern:** plastics are not biodegradable — recycle and reduce.`,
      [kt('Petrochemicals', 'Chemicals and products made from crude oil and natural gas.'), kt('Cracker', 'A plant that breaks oil fractions or gas into small molecules such as ethylene.'), kt('Polymer', 'A long-chain molecule made by joining many small units, such as polyethylene.')],
      [],
      table(['Product', 'Use'], [['Polyethylene', 'Packaging, pipes'], ['Polyester', 'Clothing'], ['Synthetic rubber', 'Tyres'], ['Detergents', 'Cleaning']], 'Table of petrochemical products and uses'),
      [3],
    ),
    sec(
      '5. Electronics industry',
      `- **Products:** mobile phones, computers, TVs, telecom, medical and defence equipment, satellites, components.
- **Relevance:** communication, banking, education, health, governance; defence and space; linked to IT and software; skilled jobs; exports.
- **Footloose industry:** little raw material; needs skills, research, capital and infrastructure.
- **Centres (as of the early 2020s):** Bengaluru (electronic capital: Electronics City, BEL, ITI, HAL, ISRO), Hyderabad, Chennai–Sriperumbudur, Noida–Greater Noida, Pune, Mumbai, Gurugram, Kolkata (Salt Lake), Thiruvananthapuram (Technopark), Gandhinagar, Mohali.
- **Why Bengaluru:** early public sector units; institutes and engineering colleges; moderate, dust-free climate; Electronics City, technology parks, airport, state support; private investment and start-ups.`,
      [kt('Footloose industry', 'An industry that is not tied to raw materials and can locate wherever skills, markets and infrastructure are good.'), kt('Electronic capital of India', 'A name for Bengaluru, the leading electronics centre.')],
      [],
      table(['Factor', 'Bengaluru example'], [['Public sector base', 'BEL, ITI, HAL, ISRO'], ['Skills', 'IISc, engineering colleges'], ['Climate', 'Moderate, dust-free'], ['Policy', 'Electronics City']], 'Table of factors behind Bengaluru as an electronics centre'),
      [4],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Calling limestone a fuel (it is a flux).
- Saying Tata Steel is in the public sector.
- Forgetting that Visakhapatnam imports much of its coking coal.
- Listing natural products such as cotton as petrochemicals.

**How marks are usually awarded**
- Steel plants: state, ownership, raw materials with sources, special advantage (1 mark per correct point).
- Location: factor plus how it reduces cost.
- Petrochemicals and electronics: named products or centres, and factors with explanation.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Integrated steel plant?', 'All stages from raw material to rolled steel at one site.', 'definition', 1),
    fc(2, 'Four raw materials of steel?', 'Iron ore, coking coal, limestone, manganese.', 'fact', 1),
    fc(3, 'Role of coke?', 'Fuel and reducing agent.', 'concept', 1),
    fc(4, 'Role of limestone?', 'Flux: removes impurities as slag.', 'concept', 1),
    fc(5, 'Use of slag?', 'Making cement.', 'fact', 1),
    fc(6, 'Why near raw materials?', 'Inputs heavy, bulky; lose weight in smelting.', 'concept', 1),
    fc(7, 'Why at a port?', 'Import coking coal; export steel.', 'concept', 1),
    fc(8, 'Tonne-km?', 'Tonnes × kilometres carried.', 'formula', 1),
    fc(9, 'Tata Steel: state and owner?', 'Jharkhand; private; 1907.', 'fact', 2),
    fc(10, 'Rivers at Jamshedpur?', 'Subarnarekha and Kharkai.', 'fact', 2),
    fc(11, 'Coal for Jamshedpur?', 'Jharia, West Bokaro.', 'fact', 2),
    fc(12, 'Rourkela: state and owner?', 'Odisha; public (SAIL).', 'fact', 2),
    fc(13, 'Foreign help for Rourkela?', 'Germany.', 'fact', 2),
    fc(14, 'Flux source for Rourkela?', 'Purnapani, Birmitrapur.', 'fact', 2),
    fc(15, 'Visakhapatnam plant owner?', 'RINL (public, early 2020s).', 'fact', 2),
    fc(16, 'Iron ore for Visakhapatnam?', 'Bailadila (Chhattisgarh).', 'fact', 2),
    fc(17, 'Special feature of Visakhapatnam?', 'First shore-based integrated plant.', 'fact', 2),
    fc(18, 'Petrochemicals come from?', 'Crude oil and natural gas.', 'definition', 3),
    fc(19, 'Three petrochemical products?', 'Plastics, polyester, synthetic rubber.', 'fact', 3),
    fc(20, 'Leading petrochemical state?', 'Gujarat (early 2020s).', 'fact', 3),
    fc(21, 'Two Gujarat centres?', 'Jamnagar, Vadodara.', 'fact', 3),
    fc(22, 'Petrochemical centre of West Bengal?', 'Haldia.', 'fact', 3),
    fc(23, 'One concern about petrochemicals?', 'Plastic waste is not biodegradable.', 'concept', 3),
    fc(24, 'Share of a product?', 'Its output ÷ total × 100.', 'formula', 3),
    fc(25, 'Electronic capital of India?', 'Bengaluru.', 'fact', 4),
    fc(26, 'Footloose industry?', 'Not tied to raw materials.', 'definition', 4),
    fc(27, 'Public units in Bengaluru?', 'BEL, ITI, HAL, ISRO.', 'example', 4),
    fc(28, 'Phone-making hubs?', 'Noida, Chennai–Sriperumbudur (early 2020s).', 'fact', 4),
    fc(29, 'Why Bengaluru?', 'Skills, institutes, climate, policy.', 'concept', 4),
    fc(30, 'Exam tip: steel plants', 'State, owner, raw materials, advantage.', 'exam-tip', 2),
  ],
  status: 'draft',
  provenance: PROV,
};
