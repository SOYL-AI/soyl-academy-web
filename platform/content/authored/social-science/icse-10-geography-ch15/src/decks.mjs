// ICSE 10 Geography ch15 Manufacturing Industries: Classification and Agro-based Industries — two decks: Part 1 (t01–t02)
// importance and classification of industries, with factors of location; Part 2 (t03–t05) sugar, cotton textile and silk
// industries. ILLUSTRATIVE district, site, sugar-delay and silk figures are computed in svgs.mjs.
import { sl, deck, table, flow, svgV } from './lib.mjs';
import { CLASS_BAR, SITE_SCORE, SUGAR_DELAY, SILK_CYCLE, DIST, distTotal, pct, FACTORS, SITES, score, DELAY, sugarFrom, SILK } from './svgs.mjs';

const V = {
  dist: svgV(CLASS_BAR, 'Two bars dividing the factories of an imagined district by raw material and by ownership'),
  site: svgV(SITE_SCORE, 'Paired bars scoring two sites for a sugar mill on five weighted factors'),
  delay: svgV(SUGAR_DELAY, 'Line graph of sugar recovery falling as crushing is delayed'),
  silk: svgV(SILK_CYCLE, 'Life cycle of the silkworm with reeling of cocoons into raw silk'),
};
const CANE = 2000;
const lostEx = Math.round((sugarFrom(CANE, 0) - sugarFrom(CANE, 72)) * 10) / 10;

export const deck1 = deck({
  part: 1,
  title: 'Manufacturing Industries — Part 1: Importance and classification',
  goals: [
    'Explain how industries contribute to employment, exports and self-reliance',
    'Classify industries by size, raw material and ownership',
    'Weigh the factors that decide where an industry is located',
  ],
  slides: [
    sl('title', 'From raw material to finished goods', {
      b: 'Part 1 — **manufacturing** turns raw materials into goods of higher value: cane into sugar, cotton into cloth, cocoons into silk sarees, iron ore into steel. It is the heart of the **secondary sector**.',
      v: table(['Raw material', 'Manufactured product', 'Example centre'], [['Sugarcane', 'Sugar', 'Kolhapur'], ['Raw cotton', 'Yarn and cloth', 'Ahmedabad'], ['Silk cocoons', 'Silk sarees', 'Kanchipuram'], ['Iron ore', 'Steel', 'Jamshedpur']], 'Table of raw materials, the manufactured products made from them and an example centre'),
      n: 'Namaste! Manufacturing means turning raw materials into finished goods that are worth more. Sugarcane becomes sugar, raw cotton becomes cloth, silk cocoons become sarees, and iron ore becomes steel. Manufacturing belongs to the secondary sector of the economy. In this part we see why it matters so much, how industries are classified, and what decides where a factory is built.',
    }),
    sl('concept', 'Importance of manufacturing: jobs and value', {
      b: '**Employment:** factories, workshops and the services around them employ millions and draw surplus workers away from farming. **Value addition:** processing raises the value of raw materials many times. **Modernising agriculture:** industry supplies tractors, pumps, fertilisers and pesticides, and agro-based industries buy farm produce. **Balanced development:** new industries in backward regions bring roads, power, schools and towns.',
      v: flow('LR', [['a', 'Raw materials from farms and mines'], ['b', 'Factories process them'], ['c', 'Value added, jobs created'], ['d', 'Incomes rise; towns and services grow']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow from raw materials to factories to value addition, jobs and growth'),
      n: 'Why does manufacturing matter? It gives jobs to millions of people and takes pressure off farmland, where too many people already work. It adds value: a tonne of raw cotton becomes cloth worth many times more. It supports farming by making tractors, pumps and fertilisers, and by buying cane, cotton and silk. And new factories bring roads, power and towns to backward areas.',
    }),
    sl('concept', 'Importance of manufacturing: exports and self-reliance', {
      b: '**Exports:** manufactured goods such as textiles, garments, steel, chemicals, medicines, vehicles and electronics earn **foreign exchange**, which pays for imports such as crude oil. **Self-reliance:** making our own machines, steel, fertilisers and defence equipment reduces **dependence on imports** and protects the country in emergencies. **Strength of the economy:** a strong manufacturing base raises national income and the standard of living.',
      v: table(['Benefit', 'Example'], [['Employment', 'Textile mills and powerlooms of Surat'], ['Exports', 'Garments from Tiruppur'], ['Self-reliance', 'Indian-made steel and fertilisers'], ['Linked growth', 'Sugar mills buying cane from farmers']], 'Table of benefits of manufacturing with an example of each'),
      n: 'Factories also earn money from abroad. Garments, cloth, steel, medicines and vehicles are sold to other countries, and the foreign exchange they earn pays for things we must import, such as crude oil. When we make our own machines, steel, fertilisers and defence goods, we depend less on other nations. So a strong manufacturing base makes the whole country stronger and more self reliant.',
    }),
    sl('check', 'Quick check: why industries matter', {
      b: 'Link an industry to a benefit for the country.',
      n: 'Quick check. Exports earn foreign exchange; home production reduces imports.',
      chk: 'imp-chk',
    }),
    sl('concept', 'Classification by size', {
      b: '**Large-scale industries** need huge **capital**, employ thousands of workers, use heavy machinery and produce in bulk — integrated steel plants, cotton mills, oil refineries, fertiliser plants. **Small-scale industries** need less capital and fewer workers, often use family labour and simple machines — handlooms, powerlooms, food processing, toys, sports goods. **Cottage industries** run in homes with traditional skills — pottery, handloom weaving, basket making. Small-scale units create many jobs for each rupee invested.',
      v: table(['Head', 'Large-scale', 'Small-scale'], [['Capital', 'Very large', 'Small'], ['Workers', 'Thousands', 'A few to a few hundred'], ['Machinery', 'Heavy, automated', 'Simple, often power-driven'], ['Example', 'Steel plant, cotton mill', 'Handloom, sports goods, food processing']], 'Table comparing large-scale and small-scale industries'),
      n: 'Industries can be grouped by size. Large scale industries, like steel plants and big cotton mills, need huge amounts of money, thousands of workers and heavy machines. Small scale industries, like powerlooms, food processing and sports goods units, need less money and fewer workers. Cottage industries are run at home by families using traditional skills, such as pottery and handloom weaving.',
    }),
    sl('concept', 'Classification by raw material and by ownership', {
      b: '**By raw material:** **agro-based** industries use farm produce — sugar, cotton textiles, jute, silk, vegetable oil, tea, food processing; **mineral-based** industries use minerals — iron and steel, aluminium, cement, petrochemicals; others are **forest-based** (paper, plywood) or **marine-based** (fish processing). **By ownership:** **public sector** — owned and run by the government (Steel Authority of India, BHEL); **private sector** — owned by individuals or companies (Tata Steel, Reliance Industries); **joint sector** — owned by the government and private firms together; **cooperative sector** — owned by the producers or workers who supply the raw material (sugar cooperatives of Maharashtra, Amul dairy at Anand).',
      v: flow('TB', [['a', 'Industries'], ['b', 'By raw material'], ['c', 'Agro-based: sugar, cotton, silk'], ['d', 'Mineral-based: steel, cement, petrochemicals'], ['e', 'By ownership'], ['f', 'Public, private, joint, cooperative']], [['a', 'b'], ['b', 'c'], ['b', 'd'], ['a', 'e'], ['e', 'f']], 'Tree showing classification of industries by raw material and by ownership'),
      n: 'Industries can also be grouped by the raw material they use. Agro based industries, such as sugar, cotton and silk, use farm produce. Mineral based industries, such as steel, cement and petrochemicals, use minerals. By ownership, public sector industries belong to the government, private sector firms to individuals or companies, joint sector firms to both, and cooperatives to the farmers or workers who supply them.',
    }),
    sl('example', 'Worked example: classifying industries', {
      b: '**Problem.** Classify each industry by raw material and by ownership.\n\n**(a)** A cooperative sugar mill near Kolhapur owned by cane growers → **agro-based; cooperative sector**.\n\n**(b)** The Bhilai steel plant of the Steel Authority of India → **mineral-based; public sector**.\n\n**(c)** A family-owned silk-weaving unit in Kanchipuram → **agro-based; private sector, small-scale**.\n\n**(d)** A company-owned petrochemical complex at Jamnagar → **mineral-based; private sector, large-scale**.\n\n**Method.** Ask two questions: *Where does the raw material come from?* and *Who owns the unit?*',
      v: table(['Industry', 'Raw material', 'Ownership'], [['Kolhapur cooperative sugar mill', 'Agro-based', 'Cooperative'], ['Bhilai steel plant', 'Mineral-based', 'Public'], ['Kanchipuram silk unit', 'Agro-based', 'Private'], ['Jamnagar petrochemicals', 'Mineral-based', 'Private']], 'Table classifying four industries by raw material and ownership'),
      n: 'To classify an industry, ask two questions. Where does its raw material come from, and who owns it? A sugar mill near Kolhapur owned by cane growers is agro based and cooperative. The Bhilai steel plant is mineral based and in the public sector. A family silk unit in Kanchipuram is agro based and private. A company owned petrochemical complex at Jamnagar is mineral based and private.',
    }),
    sl('check', 'Quick check: classification', {
      b: 'Classify an industry by raw material or ownership.',
      n: 'Quick check. Agro based uses farm produce; cooperatives are owned by the producers.',
      chk: 'class-chk',
    }),
    sl('diagram', 'Reading an industrial profile (illustrative)', {
      b: `An imagined district has ${distTotal} factories. By raw material: ${DIST.raw.map((r) => `${r.k.toLowerCase()} ${r.n} (${pct('raw', r.k)}%)`).join(', ')}. By ownership: ${DIST.own.map((r) => `${r.k.toLowerCase()} ${r.n} (${pct('own', r.k)}%)`).join(', ')}. Share = number ÷ total × 100. Half the factories process farm produce, so the district's industry depends closely on its farmers.`,
      v: V.dist,
      n: 'Here is an imagined district with forty factories. Twenty of them, exactly half, are agro based, twelve are mineral based and eight use forest or sea products. Most are privately owned, but six are cooperatives, four belong to the government and two are joint ventures. To find each share, divide the number by forty and multiply by one hundred.',
    }),
    sl('concept', 'Factors of location', {
      b: 'An industry is located where its total costs are lowest. **Physical factors:** **raw material** (especially if bulky or perishable), **power**, **water**, **climate**. **Human and economic factors:** **labour** (cheap or skilled), **market**, **transport** (railways, roads, ports), **capital** and banking, **government policy** (incentives, industrial estates). Industries using **heavy, bulky or perishable** raw materials, such as sugar and steel, are pulled towards the raw material; industries making goods that are fragile or costly to carry are pulled towards the **market**.',
      v: table(['Factor', 'Industry strongly pulled by it'], [['Perishable or bulky raw material', 'Sugar mills near cane fields'], ['Humid climate and port', 'Cotton mills of Mumbai (historically)'], ['Cheap power', 'Aluminium smelters'], ['Skilled labour, market', 'Electronics in Bengaluru']], 'Table of location factors and industries strongly pulled by each'),
      n: 'Where should a factory be built? Owners look for the place where total costs are lowest. They think about raw material, power, water and climate, and also about workers, markets, transport, money and government support. If the raw material is heavy or spoils quickly, as with sugarcane, the factory goes near the raw material. If the product is costly to carry, it goes near the market.',
    }),
    sl('example', 'Worked example: weighing the factors', {
      b: `**Problem.** Two sites are scored out of 10 for a new sugar mill (illustrative). Weights reflect each factor's importance for sugar: ${FACTORS.map((f) => `${f.f.toLowerCase()} ${f.w}`).join(', ')}. Which site should be chosen?\n\n**Step 1.** Site P: ${FACTORS.map((f, i) => `${f.w} × ${SITES.P.s[i]}`).join(' + ')} = **${score('P')}**.\n\n**Step 2.** Site Q: ${FACTORS.map((f, i) => `${f.w} × ${SITES.Q.s[i]}`).join(' + ')} = **${score('Q')}**.\n\n**Step 3. Decide.** Site P wins, although Q scores higher on market, power and transport, because the heavily weighted factor — nearness to cane — matters most for a perishable, bulky raw material.`,
      v: V.site,
      n: 'We can weigh location factors with a simple score. For a sugar mill, nearness to cane gets the biggest weight. Multiply each score by its weight and add them up. The site among the cane fields scores seven, while the site at the edge of the city scores six point six five. Even though the city site is better for markets and power, the cane site wins.',
    }),
    sl('check', 'Quick check: location factors', {
      b: 'Pick the factor that most strongly decides a location.',
      n: 'Quick check. Bulky or perishable raw materials pull factories towards their source.',
      chk: 'loc-chk',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Manufacturing adds value, creates jobs, earns foreign exchange through exports, supports agriculture and builds self-reliance.',
        'By size: large-scale (steel plants, cotton mills) and small-scale or cottage (powerlooms, handlooms, food processing).',
        'By raw material: agro-based (sugar, cotton, silk) and mineral-based (steel, cement, petrochemicals).',
        'By ownership: public, private, joint and cooperative sectors.',
        'Location: raw material, power, water, climate, labour, market, transport, capital and policy.',
      ],
      v: table(['Basis', 'Groups'], [['Size', 'Large-scale, small-scale'], ['Raw material', 'Agro-based, mineral-based'], ['Ownership', 'Public, private, joint, cooperative']], 'Summary table of the bases of classification'),
      n: 'Let us sum up Part 1. Manufacturing adds value, creates jobs, earns foreign exchange and makes the country self reliant. Industries are classified by size into large and small scale, by raw material into agro based and mineral based, and by ownership into public, private, joint and cooperative. Their location depends on raw material, power, labour, markets, transport and policy.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'For importance, give named examples: Tiruppur garments, Kolhapur sugar cooperatives.',
        'Classify each industry on all three bases when asked.',
        'Cooperatives are owned by the producers who supply the raw material.',
        'For location, name the factor and explain how it lowers costs.',
      ],
      v: table(['Slip', 'Fix'], [['Sugar is mineral-based', 'Sugar is agro-based'], ['Cooperative = government-owned', 'Owned by producers or workers'], ['Location: "good place"', 'Name the factor and its effect on cost']], 'Table of three common slips in Part 1 and their fixes'),
      n: 'Some tips. When you explain why industries matter, give named examples. Be ready to classify an industry by size, raw material and ownership. Remember that cooperatives are owned by the producers, not the government. And when you discuss location, name each factor and say how it lowers the cost of production.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Manufacturing Industries — Part 2: Sugar, cotton textiles and silk',
  goals: [
    'Explain why sugar mills are located close to sugarcane fields and why the industry has shifted to peninsular India',
    'Explain the factors that favoured the cotton textile industry in Mumbai and Ahmedabad',
    'Name the types of silk and the major silk centres, and explain why Karnataka leads in mulberry silk',
  ],
  slides: [
    sl('title', 'Industries that begin on the farm', {
      b: 'Part 2 — three great agro-based industries: **sugar**, which must be close to its cane; **cotton textiles**, among the oldest modern industries of India; and **silk**, a craft and an industry that keeps millions of rural families busy.',
      v: table(['Industry', 'Raw material', 'Leading region (early 2020s)'], [['Sugar', 'Sugarcane', 'Uttar Pradesh, Maharashtra, Karnataka'], ['Cotton textiles', 'Raw cotton', 'Gujarat, Maharashtra, Tamil Nadu'], ['Silk', 'Silk cocoons', 'Karnataka (mulberry), Assam, Jharkhand']], 'Table of three agro-based industries with their raw material and leading regions'),
      n: 'In this part we study three industries that begin on the farm. Sugar mills must stand close to the cane fields. Cotton textiles are among the oldest modern industries in India. And silk, from the cocoons of silkworms, supports millions of rural families. For each, we ask where it is found, why it is there, and what problems it faces.',
    }),
    sl('concept', 'Sugar: why mills stand among the cane fields', {
      b: 'Sugarcane is **heavy and bulky** — only about a tenth of its weight becomes sugar — so carrying it far is costly. It is also **perishable**: once cut, its **sucrose content starts falling**, so it must be crushed within about a day. It cannot be stored. So sugar mills are built **in the cane-growing belt**, and farmers bring cane by tractor or bullock cart within a short radius. Mills also need water, cheap labour in the crushing season, and transport for the finished sugar.',
      v: flow('LR', [['a', 'Cane is bulky; little of its weight becomes sugar'], ['b', 'Sucrose falls soon after cutting'], ['c', 'Cane must be crushed quickly'], ['d', 'Mills built in the cane belt']], [['a', 'd'], ['b', 'c'], ['c', 'd']], 'Flow showing why bulky, perishable cane pulls sugar mills into the cane belt'),
      n: 'Sugarcane is heavy and bulky, and only about a tenth of its weight ends up as sugar, so it is expensive to carry far. Worse, once the cane is cut, its sugar starts to break down, so it must be crushed within about a day. It cannot be stored. That is why sugar mills are built right among the cane fields, and farmers bring their cane in by tractor and bullock cart.',
    }),
    sl('diagram', 'Delay costs sugar (illustrative)', {
      b: `The illustrative graph shows sugar recovered from cane falling as crushing is delayed: ${DELAY.map((d) => `${d.h} h — ${d.rec}%`).join('; ')}. A mill that keeps cane waiting loses sugar every hour, which is why mills schedule cutting and crushing together and buy cane only from nearby fields.`,
      v: V.delay,
      n: 'This illustrative graph shows what happens when cane waits. Crushed at once, it gives eleven per cent of its weight as sugar. After a day it gives ten and a half per cent, after two days less than ten, and after three days only nine. Every hour of delay costs sugar, so mills plan cutting and crushing together and take cane only from nearby fields.',
    }),
    sl('check', 'Quick check: sugar mill location', {
      b: 'Explain why sugar mills are located near cane fields.',
      n: 'Quick check. Cane is bulky and loses sucrose quickly after cutting.',
      chk: 'sugar-chk',
    }),
    sl('concept', 'Sugar: distribution and the shift to the peninsula', {
      b: '**Distribution:** **Uttar Pradesh** and **Maharashtra** are the leading producers **(as of the early 2020s)**, followed by **Karnataka**, Tamil Nadu, Gujarat, Bihar and Andhra Pradesh. **Shift to peninsular India:** cane in the warmer south and west has a **higher sucrose content** and a **higher yield per hectare**; the frost-free tropical climate allows a **longer crushing season**; **cooperative mills** in Maharashtra are well managed and invest in modern machinery; newer, larger mills are more efficient than many old mills of the north; coastal and irrigated areas give steady cane supply.',
      v: table(['Head', 'Northern plains (UP, Bihar)', 'Peninsula (Maharashtra, Karnataka)'], [['Sucrose content', 'Lower', 'Higher'], ['Yield per hectare', 'Lower', 'Higher'], ['Crushing season', 'Shorter (cold winter)', 'Longer (frost-free)'], ['Mills', 'Many old, small', 'Newer, cooperative, larger']], 'Table comparing sugar production conditions in the northern plains and the peninsula'),
      n: 'Uttar Pradesh and Maharashtra are the leading sugar producing states, followed by Karnataka and Tamil Nadu. Over the years the industry has grown faster in the peninsula. There, the warm, frost free climate gives cane with more sugar and a bigger harvest per hectare, and mills can crush for more months of the year. Maharashtra’s cooperative mills are also well run and modern.',
    }),
    sl('concept', 'Sugar: process, by-products and problems', {
      b: '**Process:** cane is crushed to extract juice → juice is cleaned → boiled and concentrated → crystallised → separated in centrifuges → sugar. **By-products:** **bagasse** (fibre) is burnt as fuel or made into paper and boards; **molasses** is used to make **industrial alcohol (ethanol)**; **press mud** is used as manure. **Problems:** crushing is **seasonal** (a few months a year), so workers and machines sit idle; **low yield** and low sucrose in the north; **old, small mills**; high cost of production; delays in paying farmers; competition from **gur and khandsari** makers.',
      v: flow('LR', [['a', 'Crush cane'], ['b', 'Clean and boil juice'], ['c', 'Crystallise'], ['d', 'Centrifuge: sugar'], ['e', 'Bagasse: fuel, paper'], ['f', 'Molasses: ethanol']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['a', 'e'], ['c', 'f']], 'Flow of sugar making with by-products bagasse and molasses'),
      n: 'In the mill, cane is crushed for its juice, which is cleaned, boiled and crystallised into sugar. Nothing is wasted: the fibre, called bagasse, is burnt as fuel or made into paper, molasses becomes industrial alcohol, and press mud becomes manure. But the industry has problems. It works only a few months a year, many northern mills are old and small, and costs are high.',
    }),
    sl('example', 'Worked example: what does waiting cost?', {
      b: `**Problem.** Because of a transport strike, ${CANE} t of cane waits 72 hours before crushing instead of being crushed at once. Using the illustrative recoveries, how much sugar is lost?\n\n**Step 1.** Crushed at once: $\\frac{${DELAY[0].rec}}{100} \\times ${CANE} = ${sugarFrom(CANE, 0)}$ t of sugar.\n\n**Step 2.** After 72 hours: $\\frac{${DELAY[3].rec}}{100} \\times ${CANE} = ${sugarFrom(CANE, 72)}$ t.\n\n**Step 3.** Loss $= ${sugarFrom(CANE, 0)} - ${sugarFrom(CANE, 72)} = ${lostEx}$ t — lost to the mill and to the farmers, which is why mills are sited within easy reach of the fields.`,
      v: table(['Delay', 'Recovery', `Sugar from ${CANE} t of cane`], [['0 h', `${DELAY[0].rec}%`, `${sugarFrom(CANE, 0)} t`], ['72 h', `${DELAY[3].rec}%`, `${sugarFrom(CANE, 72)} t`]], 'Table of illustrative sugar obtained with no delay and after three days'),
      n: 'Suppose two thousand tonnes of cane is held up for three days by a strike. Crushed at once, it would give two hundred and twenty tonnes of sugar. After three days it gives only one hundred and eighty. Forty tonnes of sugar are lost, a heavy blow to both the mill and the farmers. That is the cost of distance and delay for a perishable raw material.',
    }),
    sl('concept', 'Cotton textiles: why Mumbai and Ahmedabad', {
      b: '**Mumbai** grew as the first great centre ("Cottonopolis of India"): **humid coastal climate** keeps yarn from breaking during spinning; a **port** to import machinery and export cloth; **capital** from merchants who had traded in raw cotton; raw cotton from the **black-soil cotton belt** of Maharashtra and Gujarat, brought by **railway**; **cheap labour** from the Konkan and Deccan; and **hydroelectric power** from the Western Ghats. **Ahmedabad** ("Manchester of India") had **cotton fields** of Gujarat around it, local merchant **capital**, cheap **labour**, a large **market**, a fairly humid climate, and access to ports.',
      v: table(['Factor', 'Mumbai', 'Ahmedabad'], [['Raw cotton', 'From the Deccan and Gujarat cotton belt', 'From nearby Gujarat fields'], ['Climate', 'Humid, coastal', 'Fairly humid'], ['Port', 'Its own harbour', 'Nearby ports'], ['Capital', 'Cotton traders', 'Local merchant families'], ['Power', 'Hydel from the Western Ghats', 'Thermal power']], 'Table comparing the factors that favoured cotton mills in Mumbai and Ahmedabad'),
      n: 'Why did cotton mills first grow in Mumbai? Its damp sea air stopped the yarn from snapping, its port brought in machines and sent out cloth, and its traders had money to invest. Railways carried raw cotton from the black soil belt, workers came from the Konkan, and hydro power came from the Western Ghats. Ahmedabad had cotton fields all around it, local capital, workers and a big market.',
    }),
    sl('check', 'Quick check: cotton textiles', {
      b: 'Name a factor that favoured cotton mills in Mumbai or Ahmedabad.',
      n: 'Quick check. Humid air, a port, capital and the cotton belt favoured Mumbai.',
      chk: 'cotton-chk',
    }),
    sl('concept', 'Cotton textiles: other centres and problems', {
      b: '**Other centres:** **Coimbatore** ("Manchester of South India") — cotton, cheap power and skilled labour; **Kanpur** in Uttar Pradesh; **Surat** (now mainly synthetic fabrics); Solapur, Nagpur, Indore, Madurai, Tiruppur (knitwear and garments), Kolkata. **Problems:** **old, obsolete machinery** in many mills; **power shortages** and high power cost; **competition from synthetic fibres** and from **powerlooms**; shortage of **long-staple cotton**, part of which is imported; low productivity; many **sick (loss-making) mills** closed in Mumbai; strong **foreign competition** in exports.',
      v: table(['Problem', 'Effect'], [['Obsolete machinery', 'Low output, poor quality'], ['Power shortage', 'Mills stop, costs rise'], ['Synthetic fibres, powerlooms', 'Mill cloth loses market'], ['Short-staple cotton', 'Fine cloth needs imports'], ['Foreign competition', 'Export orders lost']], 'Table of problems of the cotton textile industry and their effects'),
      n: 'Cotton mills later spread to Coimbatore, the Manchester of South India, and to Kanpur, Indore, Nagpur, Solapur and many other towns. Tiruppur makes knitwear for export. But the industry has problems: many mills have old machines, power is short or costly, synthetic fabrics and powerlooms take away buyers, and fine long staple cotton must partly be imported. Many old Mumbai mills have closed.',
    }),
    sl('example', 'Worked example: why Ahmedabad overtook its rivals', {
      b: '**Problem.** Explain why Ahmedabad became one of India’s largest cotton textile centres.\n\n**Step 1. Raw material.** The black soils of Gujarat grow cotton close by, so raw cotton is cheap to bring in.\n\n**Step 2. Capital and enterprise.** Local merchant families invested their trading profits in mills.\n\n**Step 3. Labour and market.** Cheap labour from the surrounding villages; a large market in Gujarat, Rajasthan and beyond.\n\n**Step 4. Transport and climate.** Rail links and nearby ports; a fairly humid climate in the mill season.',
      v: flow('LR', [['a', 'Cotton from Gujarat fields'], ['b', 'Local merchant capital'], ['c', 'Cheap labour, large market'], ['d', 'Rail and ports'], ['e', 'Ahmedabad: Manchester of India']], [['a', 'e'], ['b', 'e'], ['c', 'e'], ['d', 'e']], 'Flow of four factors that made Ahmedabad a great cotton textile centre'),
      n: 'Why did Ahmedabad grow into a great textile city? Cotton grows on the black soils of Gujarat close by. Local merchant families put their trading profits into building mills. Workers came from the surrounding villages, and the cloth found buyers across western India. Railways and nearby ports carried cotton in and cloth out. No wonder it was called the Manchester of India.',
    }),
    sl('diagram', 'Silk: from silkworm to thread', {
      b: `Silk comes from the **cocoons** spun by silkworms. **Sericulture** is the rearing of silkworms. India produces all four commercial kinds of silk: **mulberry** (worms fed on mulberry leaves), **tasar** (on arjun, asan and sal; temperate tasar on oak), **eri** (on castor leaves) and **muga**, the golden silk found only in **Assam** (on som and soalu leaves). At **reeling** units, cocoons are boiled and the thread unwound; roughly ${SILK.cocoonPerKg} kg of cocoons give 1 kg of raw silk (illustrative).`,
      v: V.silk,
      n: 'Silk comes from the cocoons of silkworms, and rearing them is called sericulture. India produces four kinds of silk. Mulberry silk comes from worms fed on mulberry leaves. Tasar comes from worms that eat arjun, asan or sal leaves. Eri worms feed on castor leaves, and golden muga silk is made only in Assam. Cocoons are boiled and unwound into thread; about eight kilograms of cocoons give one kilogram of raw silk.',
    }),
    sl('concept', 'Silk centres and Karnataka’s lead', {
      b: '**Centres:** **Karnataka** — Bengaluru, Mysuru, **Ramanagara** (a huge cocoon market), Kolar, Chikkaballapur; **Kanchipuram** (Tamil Nadu) and **Dharmavaram** (Andhra Pradesh) for silk sarees; **Varanasi** for brocades; **Bhagalpur** (Bihar) for tasar; **Sualkuchi** (Assam) for muga and mulberry weaving; **Murshidabad** (West Bengal); Jharkhand and Chhattisgarh for tasar. **Why Karnataka leads in mulberry silk:** an **equable plateau climate** with moderate temperature all year lets mulberry grow continuously, so farmers rear **five or more crops** of cocoons a year; red loamy soils and irrigation suit mulberry; **traditional skills**; **government support**, research institutes and **organised cocoon markets**.',
      v: table(['Silk', 'Food plant', 'Main region'], [['Mulberry', 'Mulberry', 'Karnataka, Andhra Pradesh, Tamil Nadu'], ['Tasar', 'Arjun, asan, sal; oak', 'Jharkhand, Chhattisgarh, Bihar'], ['Eri', 'Castor', 'Assam, Meghalaya'], ['Muga', 'Som, soalu', 'Assam only']], 'Table of the four kinds of silk with the food plant and main region of each'),
      n: 'Karnataka is the leading producer of mulberry silk, with centres such as Bengaluru, Mysuru and Ramanagara, which has a huge cocoon market. Its plateau has mild temperatures all year, so mulberry grows without a break and farmers can rear five or more crops of cocoons a year. Other centres include Kanchipuram for sarees, Varanasi for brocades, Bhagalpur for tasar and Sualkuchi in Assam for muga.',
    }),
    sl('check', 'Quick check: silk', {
      b: 'Name a type of silk, its region or its food plant.',
      n: 'Quick check. Muga is golden silk from Assam; eri worms feed on castor.',
      chk: 'silk-chk',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'Sugar mills sit in cane belts because cane is bulky and loses sucrose soon after cutting; the industry has shifted towards the peninsula (higher sucrose and yield, longer season, cooperatives).',
        'Sugar problems: seasonal working, low yields in the north, old mills, high costs; by-products bagasse, molasses, press mud.',
        'Cotton textiles: Mumbai (humid, port, capital, cotton belt, hydel power) and Ahmedabad (cotton fields, merchant capital, labour, market); problems of old machinery, power, synthetic competition.',
        'Silk: mulberry, tasar, eri, muga; Karnataka leads in mulberry thanks to its equable climate and many crops a year.',
      ],
      v: table(['Industry', 'Key location factor'], [['Sugar', 'Nearness to cane'], ['Cotton textiles', 'Cotton, humidity, capital, port'], ['Mulberry silk', 'Equable climate for mulberry']], 'Summary table of the key location factor of each industry'),
      n: 'Let us sum up Part 2. Sugar mills stand among the cane fields because cane is bulky and spoils quickly, and the industry has grown fastest in Maharashtra and the south. Cotton mills first grew in Mumbai and Ahmedabad because of cotton, humid air, capital and ports, but they face old machinery and competition. India makes four kinds of silk, and Karnataka leads in mulberry silk.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'Sugar: say both "bulky" and "perishable (sucrose falls)" when explaining location.',
        'For the shift south, give at least three reasons: sucrose, yield, season, cooperatives.',
        'For Mumbai, cover climate, port, capital, raw cotton, labour and power.',
        'Silk: name all four kinds with a region or food plant for each.',
      ],
      v: table(['Slip', 'Fix'], [['Muga is made in Karnataka', 'Muga is made only in Assam'], ['Sugar mills near cities for markets', 'Near cane fields for raw material'], ['Eri worms eat mulberry', 'Eri worms eat castor leaves']], 'Table of three common slips in Part 2 and their fixes'),
      n: 'Final tips. For sugar mills, explain that cane is both bulky and perishable. For the move to the south, give at least three reasons. For Mumbai’s cotton mills, cover climate, port, capital, cotton, labour and power. And for silk, name all four kinds, each with its region or its food plant.',
    }),
  ],
});
