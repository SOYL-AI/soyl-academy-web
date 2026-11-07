// ICSE 10 Geography ch15 Manufacturing Industries: Classification and Agro-based Industries — question bank (ICSE 2027
// specimen style). Data items use the ILLUSTRATIVE district, site-scoring, sugar-delay and silk figures exported by svgs.mjs, and
// every computed answer is asserted. MCQ keys are placed by the builder.
import { mk, add } from './lib.mjs';
import { DIST, distTotal, pct, FACTORS, SITES, score, DELAY, sugarFrom, SILK } from './svgs.mjs';

const { mcq, ar, tf, fill, match, num, short, long } = mk;
const delayText = DELAY.map((d) => `${d.h} hours ${d.rec}%`).join(', ');
const rawText = DIST.raw.map((r) => `${r.k.toLowerCase()} ${r.n}`).join(', ');
const ownText = DIST.own.map((r) => `${r.k.toLowerCase()} ${r.n}`).join(', ');

// ---------------------------------------------------------------- t01 importance
add('imp-chk', mcq({
  stem: 'Garment factories in Tiruppur sell most of their knitwear to buyers in Europe and the USA. For India, the most direct benefit of this is that it:',
  right: 'earns foreign exchange that helps pay for imports such as crude oil',
  wrong: ['reduces the need for cotton farming', 'increases imports of garments', 'lowers employment in Tamil Nadu'],
  sol: 'Exports bring in foreign exchange — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('selfrel-mcq', mcq({
  stem: 'India once imported most of its fertilisers and much of its machinery. Building its own fertiliser and machine-tool plants mainly helped the country to:',
  right: 'become more self-reliant and save on imports',
  wrong: ['reduce its farm output', 'stop all foreign trade', 'move workers back into farming'],
  sol: 'Home production reduces dependence on imports — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('surplus-mcq', mcq({
  stem: 'A district in Bihar where most people depend on small farms gets a new food-processing park. Which effect is most likely?',
  right: 'Some surplus farm workers find jobs, and farmers get a nearby buyer for their produce',
  wrong: ['Farm output falls because land is no longer needed', 'All farmers stop growing crops', 'Imports of food rise sharply'],
  sol: 'Manufacturing absorbs surplus labour and links with agriculture — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('ar-imp', ar({
  a: 'Agro-based industries help to raise farmers’ incomes.',
  r: 'Such industries buy farm produce such as cane, cotton and cocoons as their raw material.',
  key: 'c',
  sol: 'Both are true, and R explains A — option (c).',
  d: 2, c: 'understanding', t: [1, 2],
}));
add('tf-imp', tf({
  stem: 'Manufacturing belongs to the primary sector of the economy.',
  key: 'f',
  sol: 'False: it belongs to the secondary sector.',
  d: 1, c: 'recall', t: [1],
}));
add('fill-sector', fill({
  stem: 'Processing raw materials into finished goods belongs to the ___ sector of the economy.',
  acc: [['secondary']],
  sol: '**Secondary** sector.',
  d: 1, c: 'recall', t: [1],
}));
add('imp-short2', short({
  marks: 2,
  stem: 'Explain two ways in which the steel and fertiliser plants built after independence helped India become self-reliant.',
  model: 'They reduced the need to import steel and fertilisers, saving foreign exchange for other needs. They supplied home-made steel for railways, machines and defence, and fertilisers for the Green Revolution, so the country did not depend on other nations for these essentials.',
  sol: 'Fewer imports; home supply of essentials.',
  scheme: [['Imports reduced', 1], ['Essential supplies at home', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('imp-short3', short({
  marks: 3,
  stem: 'Explain how manufacturing industries contribute to (a) employment, (b) exports and (c) the development of agriculture.',
  model: '(a) Factories, workshops and their transport and trade employ millions, taking surplus workers away from overcrowded farms. (b) Manufactured goods such as garments, steel, medicines and vehicles are sold abroad and earn foreign exchange. (c) Industry supplies tractors, pumps, fertilisers and pesticides, while agro-based industries buy cane, cotton and silk cocoons and so raise farmers’ incomes.',
  sol: 'Employment; exports; links with agriculture.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 2, c: 'understanding', t: [1],
}));

// ---------------------------------------------------------------- t02 classification and location
add('class-chk', mcq({
  stem: 'A dairy in Anand is owned by thousands of milk producers who supply it and share its profits. On the basis of ownership it belongs to the:',
  right: 'cooperative sector',
  wrong: ['public sector', 'private sector', 'joint sector'],
  sol: 'Owned by the producers who supply the raw material — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('size-mcq', mcq({
  stem: 'Which of these is a small-scale industry?',
  right: 'A powerloom unit in Bhiwandi with a dozen looms and twenty workers',
  wrong: ['An integrated steel plant at Rourkela', 'An oil refinery at Jamnagar', 'A large cotton mill complex with thousands of workers'],
  sol: 'Little capital and few workers — option (@K).',
  d: 1, c: 'understanding', t: [2],
}));
add('agro-mcq', mcq({
  stem: 'Which group lists only agro-based industries?',
  right: 'Sugar, cotton textiles, silk',
  wrong: ['Cement, sugar, steel', 'Aluminium, silk, petrochemicals', 'Iron and steel, cement, aluminium'],
  sol: 'All three use farm produce — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('public-mcq', mcq({
  stem: 'Bharat Heavy Electricals Limited (BHEL), owned and managed by the Government of India, is an example of a:',
  right: 'public sector industry',
  wrong: ['private sector industry', 'cooperative sector industry', 'cottage industry'],
  sol: 'Option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('loc-chk', mcq({
  stem: 'Which industry is most strongly pulled towards the place where its raw material is produced?',
  right: 'A sugar mill, because cane is bulky and spoils soon after cutting',
  wrong: ['A software company, because code is heavy', 'A jewellery workshop, because gold is bulky', 'A printing press, because paper spoils in a day'],
  sol: 'Bulky, perishable raw material → location at the source — option (@K).',
  d: 2, c: 'understanding', t: [2, 3],
}));
add('district-mcq', mcq({
  stem: `An imagined district has ${distTotal} factories: by raw material ${rawText}; by ownership ${ownText} (illustrative). Which statement is correct?`,
  right: `Half of the factories are agro-based, and ${pct('own', 'Private')}% are privately owned`,
  wrong: ['Most of the factories are in the public sector', 'Mineral-based factories outnumber agro-based ones', 'Cooperatives are the largest ownership group'],
  sol: `Agro-based $= \\frac{${DIST.raw[0].n}}{${distTotal}} \\times 100 = ${pct('raw', 'Agro-based')}$%; private $= \\frac{${DIST.own[0].n}}{${distTotal}} \\times 100 = ${pct('own', 'Private')}$% — option (@K).`,
  d: 3, c: 'analysis', t: [2],
}), () => (pct('raw', 'Agro-based') === 50 && pct('own', 'Private') === 70) || 'district');
add('ar-class', ar({
  a: 'The Bhilai steel plant is a mineral-based industry.',
  r: 'The Bhilai steel plant is in the private sector.',
  key: 'a',
  sol: 'A is true; R is false: Bhilai belongs to the Steel Authority of India, a public sector company — option (a).',
  d: 2, c: 'understanding', t: [2],
}));
add('tf-class', tf({
  stem: 'A sugar mill owned by the cane growers who supply it is an example of a cooperative-sector industry.',
  key: 't',
  sol: 'True.',
  d: 1, c: 'understanding', t: [2],
}));
add('fill-agro', fill({
  stem: 'Industries that use farm produce such as cane, cotton or silk cocoons as raw material are called ___ industries.',
  acc: [['agro-based', 'agro based', 'agrobased', 'agricultural']],
  sol: '**Agro-based** industries.',
  d: 1, c: 'recall', t: [2],
}));
add('s1-public', short({
  marks: 1,
  stem: 'Name one public sector industrial company of India.',
  model: 'Steel Authority of India Limited (SAIL) (BHEL is also accepted).',
  sol: 'SAIL.',
  scheme: [['SAIL / BHEL / any correct', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('match-class', match({
  marks: 2,
  stem: 'Match each unit in Column A with its correct class in Column B.',
  pairs: [
    ['Rourkela steel plant', 'Public sector, mineral-based'],
    ['A cane growers’ sugar mill near Sangli', 'Cooperative sector, agro-based'],
    ['A family handloom in Varanasi', 'Cottage industry, agro-based'],
    ['A company-owned refinery at Jamnagar', 'Private sector, mineral-based'],
  ],
  order: [3, 1, 0, 2],
  sol: 'Rourkela → public, mineral-based; Sangli cooperative → cooperative, agro-based; Varanasi handloom → cottage, agro-based; Jamnagar refinery → private, mineral-based.',
  d: 2, c: 'application', t: [2],
}));
add('class-short2', short({
  marks: 2,
  stem: 'Classify (a) the Tata Steel works at Jamshedpur and (b) a cooperative sugar mill in Kolhapur on the basis of raw material and ownership.',
  model: '(a) Tata Steel: mineral-based; private sector. (b) Kolhapur sugar mill: agro-based; cooperative sector, owned by the cane growers.',
  sol: 'Mineral-based private; agro-based cooperative.',
  scheme: [['(a)', 1], ['(b)', 1]],
  d: 2, c: 'application', t: [2],
}));
add('sector-short2', short({
  marks: 2,
  stem: 'Distinguish between large-scale and small-scale industries, giving one example of each from India.',
  model: 'Large-scale industries need very large capital, thousands of workers and heavy machinery, for example the Rourkela steel plant. Small-scale industries need little capital and few workers and use simple machines, for example a powerloom unit in Bhiwandi or a sports-goods unit in Jalandhar.',
  sol: 'Capital, workers, machinery, with examples.',
  scheme: [['Large-scale with example', 1], ['Small-scale with example', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('loc-short3', short({
  marks: 3,
  stem: 'Explain how (a) raw material, (b) market and (c) power influence the location of industries, with an Indian example of each.',
  model: '(a) Industries using bulky or perishable raw material are built near the source, as sugar mills stand among the cane fields of Maharashtra. (b) Industries whose products are fragile or costly to transport, or that need customers close by, locate near big cities, as bakeries and consumer-goods plants cluster around Delhi. (c) Industries using huge amounts of electricity locate near cheap power, as aluminium smelters near Hirakud and Renukoot.',
  sol: 'Raw material; market; power — with examples.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 2, c: 'application', t: [2],
}));
const sP = score('P');
const sQ = score('Q');
add('site-num', num({
  stem: `Two illustrative sites are scored out of 10 for a sugar mill on ${FACTORS.map((f) => `${f.f.toLowerCase()} (weight ${f.w})`).join(', ')}. Site Q scores ${SITES.Q.s.join(', ')} in that order. What is its weighted score?`,
  value: sQ, tol: 0.01, unit: null,
  sol: `Score $= ${FACTORS.map((f, i) => `${f.w} \\times ${SITES.Q.s[i]}`).join(' + ')} = ${sQ}$.`,
  scheme: [[`${sQ}`, 1]],
  d: 3, c: 'application', t: [2],
}), () => sQ === 6.65 || `Q ${sQ}`);
const cpShare = pct('own', 'Cooperative');
add('coop-num', num({
  stem: `In an imagined district, ${DIST.own.find((r) => r.k === 'Cooperative').n} of its ${distTotal} factories are cooperatives (illustrative). What percentage of the factories are cooperatives?`,
  value: cpShare, tol: 0.1, unit: '%',
  sol: `Share $= \\frac{${DIST.own.find((r) => r.k === 'Cooperative').n}}{${distTotal}} \\times 100 = ${cpShare}$, so ${cpShare}%.`,
  scheme: [[`${cpShare}%`, 1]],
  d: 2, c: 'application', t: [2],
}), () => cpShare === 15 || `coop ${cpShare}`);

// ---------------------------------------------------------------- t03 sugar
add('sugar-chk', mcq({
  stem: 'A sugar company plans a new mill in western Uttar Pradesh. Its engineers insist the mill must be within about 30 km of the cane farms supplying it. The main reason is that:',
  right: 'cut cane is bulky and loses its sucrose if it is not crushed within about a day',
  wrong: ['sugar cannot be carried by road or rail', 'cane is very light and blows away during transport', 'sugar mills need no electricity'],
  sol: 'Cane is bulky and perishable — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('states-mcq', mcq({
  stem: 'Which two states were the leading producers of sugar in India in the early 2020s?',
  right: 'Uttar Pradesh and Maharashtra',
  wrong: ['Punjab and Kerala', 'Rajasthan and Assam', 'West Bengal and Odisha'],
  sol: 'Option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('shift-mcq', mcq({
  stem: 'A sugar mill near Kolhapur can crush cane for more months of the year than a mill near Gorakhpur. The main reason is that:',
  right: 'the frost-free tropical climate of the south lets cane be harvested over a longer season',
  wrong: ['Kolhapur has snow in winter', 'Gorakhpur grows no sugarcane', 'cane in Kolhapur needs no water'],
  sol: 'A longer season comes from the warmer climate — option (@K).',
  d: 3, c: 'analysis', t: [3],
}));
add('molasses-mcq', mcq({
  stem: 'A distillery is built next to a sugar mill in Uttar Pradesh. Which by-product of the mill does it mainly use?',
  right: 'Molasses, to make industrial alcohol (ethanol)',
  wrong: ['Bagasse, to make cement', 'Press mud, to make petrol', 'Cane leaves, to make steel'],
  sol: 'Molasses is fermented into alcohol — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('seasonal-mcq', mcq({
  stem: 'A sugar mill near Meerut employs about 800 workers from November to April but keeps only a small staff for the rest of the year. This happens because:',
  right: 'cane is harvested and crushed only in a particular season',
  wrong: ['sugar is produced only in the monsoon', 'mills crush cotton in the off-season', 'cane can be stored for years'],
  sol: 'The sugar industry is seasonal — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('ar-sugar', ar({
  a: 'Sugar recovery is generally higher in Maharashtra and Karnataka than in Bihar.',
  r: 'Cane grown in the warm, frost-free peninsula usually has a higher sucrose content.',
  key: 'c',
  sol: 'Both are true, and R explains A — option (c).',
  d: 3, c: 'analysis', t: [3],
}));
add('tf-sugar', tf({
  stem: 'Bagasse, the fibre left after crushing cane, can be used as fuel in the mill’s own boilers.',
  key: 't',
  sol: 'True: it is also used to make paper and boards.',
  d: 1, c: 'recall', t: [3],
}));
add('s1-sugar', short({
  marks: 1,
  stem: 'Name the by-product of the sugar industry from which industrial alcohol is made.',
  model: 'Molasses.',
  sol: 'Molasses.',
  scheme: [['Molasses', 1]],
  d: 1, c: 'recall', t: [3],
}));
add('sugar-short2', short({
  marks: 2,
  stem: 'A sugar mill near Gorakhpur, built about seventy years ago, makes losses although cane is grown all around it. State two problems of the sugar industry in the northern plains that probably explain this.',
  model: 'Many mills are old and small, with outdated machinery, so their costs are high and recovery is low. Cane yield per hectare and sucrose content are lower than in the south, and the crushing season is short, so mills stand idle for much of the year (also delayed payments to farmers, competition from gur and khandsari).',
  sol: 'Old mills; low yield and short season.',
  scheme: [['First problem', 1], ['Second problem', 1]],
  d: 2, c: 'application', t: [3],
}));
add('shift-short3', short({
  marks: 3,
  stem: 'A planner compares a cooperative sugar mill near Sangli in Maharashtra with an older mill near Gorakhpur in Uttar Pradesh. Explain three reasons why the Sangli mill is likely to be more productive.',
  model: 'Cane in the warm, frost-free peninsula has a higher sucrose content and a higher yield per hectare, so each tonne crushed gives more sugar. The crushing season is longer because cane can be harvested over more months, so machinery and workers are used for longer. Maharashtra’s cooperative mills are owned by the cane growers, are well managed and have invested in newer, larger machinery, while many northern mills are old and small.',
  sol: 'Sucrose and yield; longer season; cooperative, modern mills.',
  scheme: [['Sucrose and yield', 1], ['Longer season', 1], ['Cooperatives, modern machinery', 1]],
  d: 3, c: 'application', t: [3],
}));
const LOT = 1000;
const lost48 = Math.round((sugarFrom(LOT, 0) - sugarFrom(LOT, 48)) * 10) / 10;
add('delay-num', num({
  stem: `Illustrative sugar recoveries by delay between cutting and crushing are: ${delayText}. How many tonnes of sugar are lost if ${LOT} t of cane is crushed after 48 hours instead of at once?`,
  value: lost48, tol: 0, unit: 't',
  sol: `At once $= \\frac{${DELAY[0].rec}}{100} \\times ${LOT} = ${sugarFrom(LOT, 0)}$ t; after 48 h $= \\frac{${DELAY[2].rec}}{100} \\times ${LOT} = ${sugarFrom(LOT, 48)}$ t; loss $= ${sugarFrom(LOT, 0)} - ${sugarFrom(LOT, 48)} = ${lost48}$ t.`,
  scheme: [[`${lost48} t`, 1]],
  d: 3, c: 'application', t: [3],
}), () => lost48 === 12 || `lost ${lost48}`);
const LOT2 = 2500;
const s24 = sugarFrom(LOT2, 24);
add('recovery-num', num({
  stem: `Using the illustrative recovery of ${DELAY[1].rec}% for cane crushed 24 hours after cutting, how many tonnes of sugar does ${LOT2} t of such cane give?`,
  value: s24, tol: 0.1, unit: 't',
  sol: `Sugar $= \\frac{${DELAY[1].rec}}{100} \\times ${LOT2} = ${s24}$ t.`,
  scheme: [[`${s24} t`, 1]],
  d: 2, c: 'application', t: [3],
}), () => s24 === 262.5 || `s24 ${s24}`);

// ---------------------------------------------------------------- t04 cotton textiles
add('cotton-chk', mcq({
  stem: 'Which group of factors favoured the early growth of cotton mills in Mumbai?',
  right: 'Humid climate, a port, merchant capital and raw cotton from the Deccan by rail',
  wrong: ['Cold climate, iron-ore mines and coalfields nearby', 'Desert climate, oilfields and pipelines', 'Snow-fed rivers, tea gardens and forests'],
  sol: 'Option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('humid-mcq', mcq({
  stem: 'Early cotton mills preferred places with a humid climate, such as coastal Mumbai, mainly because:',
  right: 'moist air stops cotton yarn from breaking during spinning',
  wrong: ['humid air makes cotton grow inside the mill', 'dry air is needed to dye cloth', 'humidity reduces the need for workers'],
  sol: 'Humidity keeps the fibres supple — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('ahmedabad-mcq', mcq({
  stem: 'Which advantage did Ahmedabad have over Mumbai in obtaining raw cotton for its mills?',
  right: 'It lay in the midst of the cotton fields of Gujarat',
  wrong: ['It had a larger harbour than Mumbai', 'It received heavier monsoon rain', 'It had hydroelectric stations of the Western Ghats beside it'],
  sol: 'Nearness to the raw material — option (@K).',
  d: 3, c: 'analysis', t: [4],
}));
add('coimbatore-mcq', mcq({
  stem: 'The textile city of Tamil Nadu often called the "Manchester of South India" is:',
  right: 'Coimbatore',
  wrong: ['Madurai', 'Kanchipuram', 'Chennai'],
  sol: 'Option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('problem-mcq', mcq({
  stem: 'Several old cotton mills in central Mumbai closed down after they could no longer sell their cloth profitably. Which problem of the industry does this best show?',
  right: 'Obsolete machinery and competition from powerlooms and synthetic fabrics',
  wrong: ['Too much long-staple cotton grown in Mumbai', 'Lack of any market for cloth in India', 'Excessively cheap electricity'],
  sol: 'Old mills lost out to cheaper, newer producers — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('ar-cotton', ar({
  a: 'Some cotton mills in India import long-staple cotton.',
  r: 'Much of the cotton grown in India is short-staple, while fine cloth needs long fibres.',
  key: 'c',
  sol: 'Both are true, and R explains A — option (c).',
  d: 3, c: 'analysis', t: [4],
}));
add('ar-mumbai', ar({
  a: 'Mumbai was an early centre of cotton mills.',
  r: 'Mumbai is surrounded by large coalfields.',
  key: 'a',
  sol: 'A is true; R is false: Mumbai has no coalfields; its mills used hydel power from the Western Ghats — option (a).',
  d: 2, c: 'understanding', t: [4],
}));
add('tf-cotton', tf({
  stem: 'Ahmedabad is often called the "Manchester of India".',
  key: 't',
  sol: 'True.',
  d: 1, c: 'recall', t: [4],
}));
add('fill-cotton', fill({
  stem: 'Because of its many cotton mills, Mumbai was once known as the ___ of India.',
  acc: [['Cottonopolis', 'cottonopolis']],
  sol: '**Cottonopolis**.',
  d: 1, c: 'recall', t: [4],
}));
add('match-centre', match({
  marks: 2,
  stem: 'Match each textile centre in Column A with its description in Column B.',
  pairs: [
    ['Ahmedabad', 'Manchester of India, amid Gujarat’s cotton fields'],
    ['Coimbatore', 'Manchester of South India'],
    ['Tiruppur', 'Knitwear made for export'],
    ['Surat', 'Centre of synthetic fabrics'],
  ],
  order: [2, 0, 3, 1],
  sol: 'Ahmedabad → Manchester of India; Coimbatore → Manchester of South India; Tiruppur → knitwear exports; Surat → synthetic fabrics.',
  d: 2, c: 'understanding', t: [4],
}));
add('cotton-short2', short({
  marks: 2,
  stem: 'A cotton mill in central Mumbai, set up a century ago, now struggles to sell its cloth. State two problems of the cotton textile industry that probably explain this.',
  model: 'Many mills use old, obsolete machinery, which lowers output and quality and raises costs. The mills face strong competition from powerlooms and synthetic fabrics at home and from other countries abroad (also power shortage, shortage of long-staple cotton).',
  sol: 'Obsolete machinery; competition.',
  scheme: [['First problem', 1], ['Second problem', 1]],
  d: 2, c: 'application', t: [4],
}));
add('mumbai-short3', short({
  marks: 3,
  stem: 'Explain three factors that helped Mumbai become the first major centre of cotton mills in India.',
  model: 'Its humid coastal climate kept the yarn from breaking during spinning. Its port allowed machinery to be imported from Britain and cloth to be exported, and its cotton merchants had capital to invest. Railways brought raw cotton from the black-soil belt of Maharashtra and Gujarat, cheap labour came from the Konkan and Deccan, and hydroelectricity came from the Western Ghats.',
  sol: 'Climate; port and capital; raw cotton, labour and power.',
  scheme: [['Climate', 1], ['Port and capital', 1], ['Cotton, labour or power', 1]],
  d: 2, c: 'understanding', t: [4],
}));

// ---------------------------------------------------------------- t05 silk
add('silk-chk', mcq({
  stem: 'A weaver in Sualkuchi, Assam, works with a naturally golden silk produced only in that state. This silk is:',
  right: 'muga',
  wrong: ['eri', 'tasar', 'mulberry'],
  sol: 'Option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('eri-mcq', mcq({
  stem: 'Silkworms reared on castor leaves in Assam and Meghalaya produce:',
  right: 'eri silk',
  wrong: ['muga silk', 'tasar silk', 'mulberry silk'],
  sol: 'Option (@K).',
  d: 1, c: 'recall', t: [5],
}));
add('tasar-mcq', mcq({
  stem: 'Bhagalpur in Bihar is best known for weaving which kind of silk?',
  right: 'Tasar',
  wrong: ['Muga', 'Eri', 'Mulberry only'],
  sol: 'Option (@K).',
  d: 2, c: 'recall', t: [5],
}));
add('karnataka-mcq', mcq({
  stem: 'Farmers around Ramanagara in Karnataka can rear five or more crops of silkworms a year. The main reason is that:',
  right: 'the plateau’s mild temperature all year lets mulberry grow continuously',
  wrong: ['heavy snow keeps the worms cool', 'mulberry grows only in deserts', 'silkworms there need no leaves'],
  sol: 'An equable climate gives fresh mulberry leaves throughout the year — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('ar-silk', ar({
  a: 'Karnataka is the leading producer of mulberry silk in India.',
  r: 'Muga silk is produced only in Assam.',
  key: 'd',
  sol: 'Both are true, but the location of muga does not explain Karnataka’s lead in mulberry silk — option (d).',
  d: 3, c: 'analysis', t: [5],
}));
add('tf-silk', tf({
  stem: 'Tasar silkworms feed mainly on mulberry leaves.',
  key: 'f',
  sol: 'False: tasar worms feed on arjun, asan and sal (or oak) leaves.',
  d: 1, c: 'recall', t: [5],
}));
add('fill-seri', fill({
  stem: 'The rearing of silkworms for the production of silk is called ___.',
  acc: [['sericulture']],
  sol: '**Sericulture**.',
  d: 1, c: 'recall', t: [5],
}));
add('s1-silk', short({
  marks: 1,
  stem: 'Name the Tamil Nadu town famous for silk sarees.',
  model: 'Kanchipuram.',
  sol: 'Kanchipuram.',
  scheme: [['Kanchipuram', 1]],
  d: 1, c: 'recall', t: [5],
}));
add('silk-short2', short({
  marks: 2,
  stem: 'Name the four kinds of silk produced in India, with the food plant of the silkworm for any two of them.',
  model: 'Mulberry, tasar, eri and muga. Mulberry silkworms feed on mulberry leaves; eri silkworms on castor leaves (tasar on arjun, asan or sal; muga on som and soalu).',
  sol: 'Four kinds; two food plants.',
  scheme: [['Four kinds', 1], ['Two food plants', 1]],
  d: 1, c: 'recall', t: [5],
}));
add('silk-short3', short({
  marks: 3,
  stem: 'Give three reasons why Karnataka leads India in the production of mulberry silk.',
  model: 'Its plateau has an equable climate with moderate temperature all year, so mulberry grows without a break and farmers can rear five or more crops of cocoons a year. Red loamy soils with irrigation suit mulberry bushes. Long traditions of rearing and reeling, government research and training, and organised cocoon markets such as Ramanagara support the farmers.',
  sol: 'Climate; soil and irrigation; skills, support and markets.',
  scheme: [['Climate', 1], ['Soil or water', 1], ['Skills, support or markets', 1]],
  d: 2, c: 'understanding', t: [5],
}));
const CO = 400;
const rawSilk = CO / SILK.cocoonPerKg;
add('cocoon-num', num({
  stem: `If about ${SILK.cocoonPerKg} kg of cocoons give 1 kg of raw silk (illustrative), how many kg of raw silk can be reeled from ${CO} kg of cocoons?`,
  value: rawSilk, tol: 0, unit: 'kg',
  sol: `Raw silk $= \\frac{${CO}}{${SILK.cocoonPerKg}} = ${rawSilk}$ kg.`,
  scheme: [[`${rawSilk} kg`, 1]],
  d: 2, c: 'application', t: [5],
}), () => rawSilk === 50 || `silk ${rawSilk}`);
const yrK = SILK.cropsKarnataka * SILK.cocoonPerCrop;
const yrC = SILK.cropsCool * SILK.cocoonPerCrop;
add('crops-num', num({
  stem: `An acre of mulberry gives about ${SILK.cocoonPerCrop} kg of cocoons per rearing (illustrative). A farmer near Mysuru rears ${SILK.cropsKarnataka} crops a year; a farmer in a cooler hill area rears ${SILK.cropsCool}. How many more kg of cocoons does the Mysuru farmer get from an acre in a year?`,
  value: yrK - yrC, tol: 0, unit: 'kg',
  sol: `Mysuru $= ${SILK.cropsKarnataka} \\times ${SILK.cocoonPerCrop} = ${yrK}$ kg; hill area $= ${SILK.cropsCool} \\times ${SILK.cocoonPerCrop} = ${yrC}$ kg; difference $= ${yrK} - ${yrC} = ${yrK - yrC}$ kg.`,
  scheme: [[`${yrK - yrC} kg`, 1]],
  d: 3, c: 'analysis', t: [5],
}), () => yrK - yrC === 360 || 'crops');

// ---------------------------------------------------------------- 10-mark structured questions
add('long-imp', long({
  stem: '(a) Give two reasons why manufacturing industries are important for India. [2]\n\n(b) Distinguish between agro-based and mineral-based industries, with one example of each. [2]\n\n(c) Explain the classification of industries on the basis of ownership, giving an Indian example of each type. [3]\n\n(d) Classify the following on all three bases (size, raw material, ownership): (i) the Rourkela steel plant, (ii) a family silk-weaving unit in Kanchipuram, (iii) a cane growers’ sugar mill near Kolhapur. [3]',
  model: '(a) They create jobs and take surplus workers off the land; they earn foreign exchange through exports and make the country self-reliant (also add value, modernise farming).\n\n(b) Agro-based industries use farm produce as raw material, for example sugar mills; mineral-based industries use minerals, for example iron and steel plants.\n\n(c) Public sector — owned by the government, for example the Steel Authority of India; private sector — owned by individuals or companies, for example Tata Steel; joint sector — owned by the government and private firms together; cooperative sector — owned by the producers who supply raw material, for example sugar cooperatives of Maharashtra or Amul.\n\n(d) (i) Large-scale, mineral-based, public sector. (ii) Small-scale or cottage, agro-based, private sector. (iii) Large-scale, agro-based, cooperative sector.',
  sol: 'Importance; agro and mineral; ownership types; three classifications.',
  scheme: [['(a)', 2], ['(b)', 2], ['(c)', 3], ['(d)', 3]],
  d: 2, c: 'application', t: [1, 2],
}));
const L2 = 3000;
const lostL = Math.round((sugarFrom(L2, 0) - sugarFrom(L2, 72)) * 10) / 10;
add('long-sugar', long({
  stem: `(a) Name the two leading sugar-producing states of India. [2]\n\n(b) Name two by-products of the sugar industry and state one use of each. [2]\n\n(c) Explain three reasons why the sugar industry has grown faster in Maharashtra and Karnataka than in the northern plains. [3]\n\n(d) Illustrative recoveries by delay in crushing are: ${delayText}. Calculate the sugar lost when ${L2} t of cane is crushed 72 hours after cutting instead of at once, and use your answer to explain why sugar mills are located near cane fields. [3]`,
  model: `(a) Uttar Pradesh and Maharashtra (as of the early 2020s).\n\n(b) Bagasse — fuel for the mill’s boilers or raw material for paper; molasses — industrial alcohol (ethanol) (press mud — manure).\n\n(c) Cane in the warm, frost-free peninsula has more sucrose and a higher yield per hectare; the crushing season is longer; well-run cooperative mills with newer machinery are common in Maharashtra.\n\n(d) At once $= \\frac{${DELAY[0].rec}}{100} \\times ${L2} = ${sugarFrom(L2, 0)}$ t; after 72 h $= \\frac{${DELAY[3].rec}}{100} \\times ${L2} = ${sugarFrom(L2, 72)}$ t; loss $= ${lostL}$ t. Cane loses sucrose rapidly after cutting and is bulky to carry, so mills are built among the cane fields to crush it quickly and cheaply.`,
  sol: `States; by-products; reasons; loss ${lostL} t and location.`,
  scheme: [['(a)', 2], ['(b)', 2], ['(c)', 3], ['(d)', 3]],
  d: 4, c: 'analysis', t: [3],
}), () => lostL === 60 || `lostL ${lostL}`);
add('long-cotton', long({
  stem: '(a) Name two cotton textile centres in Tamil Nadu or Uttar Pradesh. [2]\n\n(b) Why did early cotton mills prefer a humid climate? Name a humid coastal centre. [2]\n\n(c) Explain three factors that favoured the cotton textile industry in Ahmedabad. [3]\n\n(d) Describe three problems faced by the cotton textile industry of India today. [3]',
  model: '(a) Coimbatore and Madurai (Tamil Nadu), or Kanpur (Uttar Pradesh) — any two (Tiruppur also accepted).\n\n(b) Moist air keeps cotton yarn supple so it does not break during spinning; Mumbai.\n\n(c) It lies amid the cotton fields of Gujarat, so raw cotton is close; local merchant families invested capital in mills; cheap labour from nearby villages, a large market in western India, and rail links with ports.\n\n(d) Many mills have obsolete machinery, so output and quality are low; power shortages and high power costs; competition from powerlooms, synthetic fabrics and foreign producers, and a shortage of long-staple cotton that has to be imported.',
  sol: 'Centres; humidity; Ahmedabad factors; problems.',
  scheme: [['(a)', 2], ['(b)', 2], ['(c)', 3], ['(d)', 3]],
  d: 2, c: 'understanding', t: [4],
}));
const CO2 = 1200;
add('long-silk', long({
  stem: `(a) Name the four kinds of silk produced in India. [2]\n\n(b) Name one centre each famous for (i) silk sarees and (ii) tasar silk. [2]\n\n(c) Explain three reasons why Karnataka leads India in mulberry silk. [3]\n\n(d) If about ${SILK.cocoonPerKg} kg of cocoons give 1 kg of raw silk (illustrative), how much raw silk can be reeled from ${CO2} kg of cocoons? Why are reeling units usually located close to the cocoon-rearing villages? [3]`,
  model: `(a) Mulberry, tasar, eri and muga.\n\n(b) (i) Kanchipuram (or Varanasi, Dharmavaram); (ii) Bhagalpur.\n\n(c) An equable plateau climate lets mulberry grow all year, so five or more crops of cocoons are possible; red loamy soils and irrigation suit mulberry; long traditions, government research and support, and organised cocoon markets such as Ramanagara.\n\n(d) Raw silk $= \\frac{${CO2}}{${SILK.cocoonPerKg}} = ${CO2 / SILK.cocoonPerKg}$ kg. Most of the cocoon’s weight is lost in reeling, and live pupae must be killed and the cocoons reeled soon after harvest, so reeling is done near the rearing villages.`,
  sol: `Four silks; centres; Karnataka; ${CO2 / SILK.cocoonPerKg} kg.`,
  scheme: [['(a)', 2], ['(b)', 2], ['(c)', 3], ['(d)', 3]],
  d: 3, c: 'application', t: [5],
}), () => CO2 / SILK.cocoonPerKg === 150 || 'silk');
add('long-loc', long({
  stem: `(a) Name four factors that influence the location of an industry. [2]\n\n(b) Why is a sugar mill pulled towards its raw material while a bakery is pulled towards its market? [2]\n\n(c) Two illustrative sites are scored out of 10 for a sugar mill on ${FACTORS.map((f) => `${f.f.toLowerCase()} (weight ${f.w})`).join(', ')}. Site P scores ${SITES.P.s.join(', ')}; site Q scores ${SITES.Q.s.join(', ')}. Calculate the weighted score of each site and choose one. [3]\n\n(d) Site Q scored higher on market, power and transport. Explain why it still loses, and suggest one change that would make Q suitable for a different industry. [3]`,
  model: `(a) Raw material, power, labour, market (also transport, water, capital, climate, government policy).\n\n(b) Cane is bulky and loses sucrose soon after cutting, so the mill goes to the cane; bread is perishable and needed fresh by many customers, so the bakery goes to the market.\n\n(c) P $= ${FACTORS.map((f, i) => `${f.w} \\times ${SITES.P.s[i]}`).join(' + ')} = ${sP}$; Q $= ${FACTORS.map((f, i) => `${f.w} \\times ${SITES.Q.s[i]}`).join(' + ')} = ${sQ}$. Choose site P.\n\n(d) For sugar, the raw-material factor carries the highest weight (${FACTORS[0].w}) because cane is bulky and perishable; Q’s low raw-material score (${SITES.Q.s[0]}) outweighs its other advantages. Q would suit a market-oriented industry, such as electronics assembly or food packaging for the city, for which market and transport would carry the greatest weights.`,
  sol: `Factors; pull of raw material and market; P ${sP}, Q ${sQ}; weights explain the choice.`,
  scheme: [['(a)', 2], ['(b)', 2], ['(c)', 3], ['(d)', 3]],
  d: 4, c: 'analysis', t: [2, 3],
}), () => (sP === 7 && sQ === 6.65) || 'scores');
