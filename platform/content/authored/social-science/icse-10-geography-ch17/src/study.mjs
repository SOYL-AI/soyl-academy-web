// ICSE 10 Geography ch17 Transport — notes and flashcards.
import { T, table, unit, PROV } from './lib.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Transport — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Importance and modes of transport',
      `- **Importance:** raw materials to industry; goods to markets; perishables reach distant cities; internal and foreign trade; jobs; tourism; defence and disaster relief; national integration.
- **Modes:** land (roads, railways, pipelines), water (inland, coastal, overseas), air.
- Modes **complement** one another: road → rail → port → ship is a common chain.`,
      [kt('Hinterland', 'The area served by a port or transport centre, from which goods come and to which goods go.')],
      [],
      table(['Mode', 'Types'], [['Land', 'Roads, railways, pipelines'], ['Water', 'Inland, coastal, overseas'], ['Air', 'Domestic, international']], 'Table of modes of transport and their types'),
      [1],
    ),
    sec(
      '2. Roadways',
      `- **Factors:** relief (plains easy; mountains need bends, tunnels, bridges; landslides); climate (heavy rain and floods; snow on high passes); rivers (bridges); soil (mud, shifting sand); population and economic activity; capital.
- **Advantages:** door-to-door; flexible; cheap and quick for short distances; reach hills and villages; good for perishables; feeders to rail, ports and airports; cheaper to build than railways.
- **Disadvantages:** costly for bulky goods over long distances; pollution and noise; accidents and congestion; damaged by rain and floods.
- **Border Roads Organisation** builds strategic roads in border and hill areas.`,
      [kt('Feeder road', 'A road that brings traffic to a railway station, port or airport.')],
      [],
      table(['Advantage', 'Disadvantage'], [['Door-to-door', 'Costly for long bulky hauls'], ['Reaches hills', 'Pollution, accidents']], 'Table of two advantages and two disadvantages of roads'),
      [2],
    ),
    sec(
      '3. Highways and corridors',
      `| Road | Meaning or route | Built by |
|---|---|---|
| Expressway | Multi-lane, access-controlled, no level crossings (Mumbai–Pune, Yamuna, Agra–Lucknow) | Central or State agencies |
| National Highway | Links state capitals, big cities, ports, borders | Central Government (NHAI) |
| Golden Quadrilateral | About 5,800 km joining Delhi, Mumbai, Chennai, Kolkata | NHDP |
| North–South Corridor | Srinagar to Kanyakumari | NHDP |
| East–West Corridor | Silchar to Porbandar | NHDP |

The two corridors cross at **Jhansi**. Importance: faster, safer, cheaper movement; growth of industry and towns along routes; national integration.`,
      [kt('Expressway', 'A wide, multi-lane, access-controlled highway with no level crossings, built for fast traffic.'), kt('Golden Quadrilateral', 'The highway network joining Delhi, Mumbai, Chennai and Kolkata.')],
      [],
      table(['Network', 'Ends'], [['North–South', 'Srinagar, Kanyakumari'], ['East–West', 'Silchar, Porbandar']], 'Table of the two corridors and their ends'),
      [3],
    ),
    sec(
      '4. Railways',
      `- **Dense** in the northern plains: flat land, dense population, farms and industries, low building cost.
- **Sparse** in the Himalayas and the north-east (steep slopes, landslides, heavy rain), the Thar (shifting sand, few people), forests and deltas.
- **Gauges:** broad 1.676 m, metre 1 m, narrow 0.762 m or 0.610 m; **Project Unigauge** converts lines to broad gauge.
- **Advantages:** cheap for bulky goods over long distances; huge capacity; safer; less fuel per tonne-km; national integration.
- **Disadvantages:** fixed routes and timetables; high capital cost; hard in hills and deserts; transshipment.
- **Konkan Railway** (1998): many tunnels and bridges along the Western Ghats coast.`,
      [kt('Gauge', 'The distance between the two rails of a railway track.')],
      [],
      table(['Gauge', 'Width'], [['Broad', '1.676 m'], ['Metre', '1 m'], ['Narrow', '0.762 m or 0.610 m']], 'Table of railway gauges and widths'),
      [4],
    ),
    sec(
      '5. Airways',
      `- **Advantages:** fastest; crosses mountains, deserts, forests and seas; vital for the north-east, Ladakh, Andaman and Nicobar, Lakshadweep; emergencies and defence; perishable and high-value goods; tourism.
- **Disadvantages:** very costly; small capacity for bulky goods; affected by fog and storms; noise and emissions; needs airports.`,
      [kt('Air connectivity', 'Links by air between places, especially important where land routes are long or blocked.')],
      [],
      table(['Remote area', 'Why air matters'], [['North-east hills', 'Steep, landslide-prone roads'], ['Ladakh', 'Passes snowbound in winter'], ['Islands', 'Separated by sea']], 'Table of remote areas and why air transport matters there'),
      [5],
    ),
    sec(
      '6. Waterways and comparing modes',
      `- **Inland:** NW-1 Ganga–Bhagirathi–Hooghly (Prayagraj–Haldia); NW-2 Brahmaputra (Sadiya–Dhubri); NW-3 West Coast Canal (Kollam–Kottapuram). Limitations: low water in the dry season, silting, shifting channels, rapids in peninsular rivers, slow.
- **Coastal:** cargo between Indian ports (coal from Paradip to Tamil Nadu); cheap for bulky goods; needs ports; monsoon storms.
- **Advantages of waterways:** cheapest for heavy, bulky goods; low fuel use and pollution; natural routes.
- **Freight cost** = rate per tonne-km × tonnes × km. **Time** = distance ÷ speed. **Rail density** = track length ÷ area × 1000.`,
      [kt('Coastal shipping', 'Carrying cargo by ship between ports along a country’s own coast.'), kt('Tonne-kilometre', 'One tonne of goods carried one kilometre; used to compare freight costs.')],
      [],
      table(['Mode', 'Relative cost (illustrative)'], [['Waterway', 'Lowest'], ['Rail', 'Low'], ['Road', 'Higher'], ['Air', 'Highest']], 'Table ranking modes by relative freight cost'),
      [6],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Listing Bengaluru instead of Chennai in the Golden Quadrilateral.
- Placing NW-2 on the Ganga (it is on the Brahmaputra).
- Saying roads are cheapest for bulky goods over long distances.
- Calling air transport unimportant because it is costly, without mentioning remote areas.

**How marks are usually awarded**
- Reasons (1 mark each): one clear geographical cause with a named region.
- Advantages or disadvantages (1 mark each): distinct points, not repeats.
- Corridors (2 marks): four cities; or two corridors with their ends.
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
    fc(1, 'Three modes of transport?', 'Land, water, air.', 'fact', 1),
    fc(2, 'Two roles of transport in development?', 'Raw materials to industry; goods to markets (also trade, relief, integration).', 'concept', 1),
    fc(3, 'Hinterland?', 'Area served by a port.', 'definition', 1),
    fc(4, 'Why are mountain roads costly?', 'Bends, tunnels, bridges, retaining walls; landslides.', 'concept', 2),
    fc(5, 'Climate problems for roads?', 'Floods and heavy rain; snow on high passes.', 'concept', 2),
    fc(6, 'Two advantages of roads?', 'Door-to-door; reach hills and villages.', 'concept', 2),
    fc(7, 'Two disadvantages of roads?', 'Costly for long bulky hauls; pollution and accidents.', 'concept', 2),
    fc(8, 'Who builds border roads?', 'Border Roads Organisation.', 'fact', 2),
    fc(9, 'Expressway?', 'Multi-lane, access-controlled highway with no level crossings.', 'definition', 3),
    fc(10, 'First expressway of India?', 'Mumbai–Pune Expressway (2002).', 'fact', 3),
    fc(11, 'Who maintains National Highways?', 'Central Government (NHAI).', 'fact', 3),
    fc(12, 'Golden Quadrilateral cities?', 'Delhi, Mumbai, Chennai, Kolkata.', 'fact', 3),
    fc(13, 'North–South Corridor ends?', 'Srinagar and Kanyakumari.', 'fact', 3),
    fc(14, 'East–West Corridor ends?', 'Silchar and Porbandar.', 'fact', 3),
    fc(15, 'Where do the corridors cross?', 'Jhansi.', 'diagram', 3),
    fc(16, 'Where is the rail network densest?', 'Northern plains.', 'fact', 4),
    fc(17, 'Why are railways sparse in the Thar?', 'Shifting sand; few people.', 'concept', 4),
    fc(18, 'Broad gauge width?', '1.676 m.', 'fact', 4),
    fc(19, 'Project Unigauge?', 'Converting lines to broad gauge.', 'definition', 4),
    fc(20, 'Railway built through the Western Ghats coast?', 'Konkan Railway (1998).', 'fact', 4),
    fc(21, 'Main advantage of railways?', 'Cheap for bulky goods over long distances.', 'concept', 4),
    fc(22, 'Why are airways vital for the north-east?', 'Steep, landslide-prone terrain makes land routes slow.', 'concept', 5),
    fc(23, 'Two disadvantages of air transport?', 'Very costly; affected by fog and storms.', 'concept', 5),
    fc(24, 'NW-1?', 'Ganga–Bhagirathi–Hooghly, Prayagraj to Haldia.', 'fact', 6),
    fc(25, 'NW-2?', 'Brahmaputra, Sadiya to Dhubri.', 'fact', 6),
    fc(26, 'NW-3?', 'West Coast Canal, Kollam to Kottapuram.', 'fact', 6),
    fc(27, 'Two limitations of inland waterways?', 'Low water in dry season; silting.', 'concept', 6),
    fc(28, 'Coastal shipping example?', 'Coal from Paradip to Tamil Nadu power stations.', 'example', 6),
    fc(29, 'Freight cost?', 'Rate per tonne-km × tonnes × km.', 'formula', 6),
    fc(30, 'Breakwater?', 'Wall that shelters a harbour from waves.', 'diagram', 6),
    fc(31, 'Exam tip: corridors', 'Name all four ends and Jhansi.', 'exam-tip', 3),
  ],
  status: 'draft',
  provenance: PROV,
};
