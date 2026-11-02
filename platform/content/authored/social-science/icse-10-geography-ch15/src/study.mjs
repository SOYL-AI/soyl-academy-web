// ICSE 10 Geography ch15 Manufacturing Industries: Classification and Agro-based Industries — notes and flashcards.
import { T, table, unit, PROV } from './lib.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Manufacturing Industries: Classification and Agro-based Industries — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Importance of manufacturing industries',
      `- **Manufacturing:** processing raw materials into goods of higher value (secondary sector).
- **Employment:** jobs in factories and related services; reduces pressure on agriculture.
- **Value addition** and higher national income.
- **Exports:** textiles, garments, steel, chemicals, medicines, vehicles, electronics earn foreign exchange.
- **Self-reliance:** home-made machinery, steel, fertilisers and defence goods reduce imports.
- **Support to agriculture:** tractors, pumps, fertilisers; agro-based industries buy farm produce.
- **Regional development:** industries bring infrastructure and towns to backward areas.`,
      [kt('Manufacturing', 'Converting raw materials into finished goods of higher value.'), kt('Value addition', 'The increase in the worth of a material when it is processed into a product.')],
      [],
      table(['Benefit', 'Example'], [['Jobs', 'Powerlooms of Surat'], ['Exports', 'Garments of Tiruppur'], ['Self-reliance', 'Indian steel and fertilisers']], 'Table of benefits of manufacturing with examples'),
      [1],
    ),
    sec(
      '2. Classification of industries',
      `| Basis | Types | Examples |
|---|---|---|
| Size | Large-scale; small-scale; cottage | Steel plant; powerloom unit; handloom |
| Raw material | Agro-based; mineral-based; forest-based; marine-based | Sugar, cotton, silk; steel, cement, petrochemicals; paper; fish canning |
| Ownership | Public; private; joint; cooperative | SAIL, BHEL; Tata Steel, Reliance; government + private; Kolhapur sugar cooperatives, Amul |

- **Location factors:** raw material, power, water, climate, labour, market, transport, capital, government policy.
- Bulky or perishable raw materials pull industries towards their source; fragile or costly-to-carry products pull them towards markets.`,
      [kt('Agro-based industry', 'An industry that uses farm produce as its raw material, such as sugar or cotton textiles.'), kt('Cooperative sector', 'Industries owned and run by the producers or workers who supply the raw material.'), kt('Public sector', 'Industries owned and managed by the government.')],
      [],
      table(['Ownership', 'Owner'], [['Public', 'Government'], ['Private', 'Individuals or companies'], ['Joint', 'Government and private firms'], ['Cooperative', 'Producers or workers']], 'Table of ownership sectors and their owners'),
      [2],
    ),
    sec(
      '3. Sugar industry',
      `- **Location near cane fields:** cane is heavy and bulky (only about a tenth becomes sugar); sucrose falls soon after cutting, so cane must be crushed within about a day; it cannot be stored.
- **Leading states (as of the early 2020s):** Uttar Pradesh and Maharashtra; also Karnataka, Tamil Nadu, Gujarat, Bihar, Andhra Pradesh.
- **Shift to the peninsula:** higher sucrose content and yield per hectare; longer crushing season in a frost-free climate; well-run cooperatives in Maharashtra; newer, larger mills.
- **By-products:** bagasse (fuel, paper, boards); molasses (industrial alcohol, ethanol); press mud (manure).
- **Problems:** seasonal working; low yields and sucrose in the north; old, small mills; high costs; delayed payments to farmers; competition from gur and khandsari.`,
      [kt('Molasses', 'A thick syrup left after sugar crystals are removed, used to make industrial alcohol.'), kt('Crushing season', 'The months in which a sugar mill crushes cane.')],
      [],
      table(['Head', 'North', 'Peninsula'], [['Sucrose', 'Lower', 'Higher'], ['Season', 'Shorter', 'Longer'], ['Mills', 'Older', 'Newer, cooperative']], 'Table comparing sugar production in the north and the peninsula'),
      [3],
    ),
    sec(
      '4. Cotton textile industry',
      `- **Mumbai:** humid coastal climate; port for machinery and exports; capital of cotton traders; raw cotton from the black-soil cotton belt by rail; cheap labour from the Konkan and Deccan; hydel power from the Western Ghats.
- **Ahmedabad (Manchester of India):** cotton fields of Gujarat nearby; local merchant capital; cheap labour; large market; ports and railways.
- **Other centres:** Coimbatore (Manchester of South India), Kanpur, Surat, Solapur, Nagpur, Indore, Madurai, Tiruppur, Kolkata.
- **Problems:** obsolete machinery; power shortage and cost; competition from synthetic fibres and powerlooms; shortage of long-staple cotton; low productivity; sick mills; foreign competition.`,
      [kt('Cottonopolis of India', 'A name for Mumbai, the first great centre of cotton mills.'), kt('Long-staple cotton', 'Cotton with long fibres, used for fine yarn and cloth.')],
      [],
      table(['Centre', 'Nickname or speciality'], [['Mumbai', 'Cottonopolis'], ['Ahmedabad', 'Manchester of India'], ['Coimbatore', 'Manchester of South India'], ['Tiruppur', 'Knitwear exports']], 'Table of cotton textile centres and their nicknames or specialities'),
      [4],
    ),
    sec(
      '5. Silk textile industry',
      `- **Sericulture:** rearing silkworms for silk; cocoons are boiled and reeled into raw silk (roughly 8 kg of cocoons per kg of raw silk, illustrative).
- **Types:** mulberry (mulberry leaves; Karnataka, Andhra Pradesh, Tamil Nadu, West Bengal); tasar (arjun, asan, sal; oak for temperate tasar; Jharkhand, Chhattisgarh, Bihar); eri (castor; Assam, Meghalaya); muga (golden; som and soalu; Assam only).
- **Centres:** Bengaluru, Mysuru, Ramanagara (cocoon market); Kanchipuram; Dharmavaram; Varanasi; Bhagalpur (tasar); Sualkuchi (Assam); Murshidabad.
- **Karnataka leads in mulberry silk:** equable plateau climate lets mulberry grow all year (five or more cocoon crops a year); suitable red loamy soils and irrigation; traditional skills; government support, research and organised cocoon markets.`,
      [kt('Sericulture', 'The rearing of silkworms for the production of silk.'), kt('Muga', 'A golden silk produced only in Assam.')],
      [],
      table(['Silk', 'Region'], [['Mulberry', 'Karnataka'], ['Tasar', 'Jharkhand, Bhagalpur'], ['Eri', 'Assam'], ['Muga', 'Assam only']], 'Table of the four silks and their regions'),
      [5],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Calling sugar or silk mineral-based.
- Saying sugar mills are located near markets.
- Writing that muga silk is produced in Karnataka.
- Giving only one factor for Mumbai's cotton mills.

**How marks are usually awarded**
- Location questions: 1 mark per factor explained with its effect.
- Classification: correct basis and correct group.
- Silk: kind of silk with region or food plant.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Manufacturing?', 'Turning raw materials into higher-value goods.', 'definition', 1),
    fc(2, 'Two benefits of manufacturing?', 'Jobs; exports earning foreign exchange.', 'fact', 1),
    fc(3, 'How does industry help self-reliance?', 'Fewer imports of machines, steel, fertilisers.', 'concept', 1),
    fc(4, 'Three bases of classification?', 'Size, raw material, ownership.', 'fact', 2),
    fc(5, 'Agro-based industry?', 'Uses farm produce, e.g. sugar.', 'definition', 2),
    fc(6, 'Mineral-based industry?', 'Uses minerals, e.g. steel, cement.', 'definition', 2),
    fc(7, 'Public sector example?', 'Steel Authority of India.', 'example', 2),
    fc(8, 'Private sector example?', 'Tata Steel.', 'example', 2),
    fc(9, 'Cooperative sector example?', 'Sugar cooperatives of Kolhapur; Amul.', 'example', 2),
    fc(10, 'Small-scale industry?', 'Little capital, few workers, e.g. powerlooms.', 'definition', 2),
    fc(11, 'Weighted score?', 'Sum of weight × score for each factor.', 'formula', 2),
    fc(12, 'Why sugar mills near cane fields?', 'Cane is bulky and loses sucrose fast.', 'concept', 3),
    fc(13, 'Two leading sugar states?', 'Uttar Pradesh, Maharashtra (early 2020s).', 'fact', 3),
    fc(14, 'Why the shift south?', 'More sucrose, higher yield, longer season.', 'concept', 3),
    fc(15, 'Bagasse used for?', 'Fuel and paper.', 'fact', 3),
    fc(16, 'Molasses used for?', 'Industrial alcohol (ethanol).', 'fact', 3),
    fc(17, 'One problem of sugar mills?', 'Seasonal working.', 'fact', 3),
    fc(18, 'Sugar from cane?', 'Recovery % ÷ 100 × tonnes of cane.', 'formula', 3),
    fc(19, 'Why humidity for spinning?', 'Yarn does not break easily.', 'concept', 4),
    fc(20, 'Cottonopolis of India?', 'Mumbai.', 'fact', 4),
    fc(21, 'Manchester of India?', 'Ahmedabad.', 'fact', 4),
    fc(22, 'Manchester of South India?', 'Coimbatore.', 'fact', 4),
    fc(23, 'Two problems of cotton mills?', 'Old machinery; competition from synthetics.', 'fact', 4),
    fc(24, 'Four kinds of silk?', 'Mulberry, tasar, eri, muga.', 'fact', 5),
    fc(25, 'Eri silkworm food?', 'Castor leaves.', 'fact', 5),
    fc(26, 'Golden silk of Assam?', 'Muga.', 'fact', 5),
    fc(27, 'Tasar silk city of Bihar?', 'Bhagalpur.', 'fact', 5),
    fc(28, 'Why Karnataka leads in mulberry silk?', 'Equable climate: mulberry all year, many crops.', 'concept', 5),
    fc(29, 'Silk sarees of Tamil Nadu?', 'Kanchipuram.', 'example', 5),
    fc(30, 'Exam tip: sugar location', 'Bulky + perishable → near fields.', 'exam-tip', 3),
  ],
  status: 'draft',
  provenance: PROV,
};
