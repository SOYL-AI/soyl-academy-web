// Build CBSE 10 Social Science ch04 The Age of Industrialisation. Run from platform/:
//   npx tsx content/authored/social-science/cbse-10-social-science-ch04/src/build.mjs
// The chapter is board_assessed: false (school periodic assessment only): the decks say so, the
// bank is lighter than a board chapter's, and the two tests are periodic-assessment-style papers.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build } from './lib.mjs';

setUnit('cbse-10-social-science-ch04', 'social-science');
await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- visuals
const vProto = table(
  ['Feature', 'Proto-industrial system (17th–18th centuries)'],
  [
    ['Where', 'Mostly in rural homes, not factories'],
    ['For whom', 'An international market'],
    ['Organised by', 'Town merchants who gave advances and raw materials'],
    ['Done by', 'Peasant and artisan families, using the labour of all members'],
    ['Alongside', 'Farming on small plots'],
  ],
  'Table of features of the proto-industrial system: production mostly in rural homes for an international market, organised by town merchants, done by peasant families with family labour, alongside farming',
);
const vWhyCountry = flow(
  'TB',
  ['World trade and colonies expand: demand for goods rises', 'Town guilds restrict new producers and control prices', 'Merchants turn to the countryside', 'Peasants, short of land after enclosures, take up work at home'],
  'Flow: rising demand from world trade and colonies, restrictions by town guilds, merchants turning to the countryside, and land-short peasants taking up work at home',
  'Why production moved to villages',
);
const vPeasants = table(
  ['Problem of rural families', 'How merchant work helped'],
  [
    ['Common lands enclosed: no free grazing or firewood', 'A new source of cash income'],
    ['Small plots could not feed the family', 'Extra earnings without leaving the village'],
    ['Idle hands in the slack farm season', 'Work for women, children and men at home'],
  ],
  'Table of rural problems and how merchant work helped: enclosure of commons, small plots and idle seasons were offset by cash income, extra earnings at home and work for the whole family',
);
const vNetwork = flow(
  'LR',
  ['Merchant in town buys raw material', 'Rural families spin and weave', 'Finishing workshop in a town', 'Merchant exports the cloth'],
  'Flow of a town-controlled network: a merchant buys raw material, rural families spin and weave, a town workshop finishes the cloth, and the merchant exports it',
  'Controlled from the town, produced in the countryside',
);
const vAnswer = table(
  ['Mark', 'Point to write'],
  [
    ['1', 'Meaning: production for an international market before factories'],
    ['2', 'How: town merchants gave advances and raw material to rural families'],
    ['3', 'Why: guilds in towns; land-short peasants in villages'],
  ],
  'Answer plan for a three-mark question on proto-industrialisation: meaning, how it worked, and why',
  'One mark per distinct point.',
);
const vFactory = table(
  ['Development', 'What changed'],
  [
    ['Earliest English factories (from the 1730s)', 'Few at first; they multiplied only in the late 18th century'],
    ['New machines (carding, twisting, spinning)', 'Each stage of cotton production became faster'],
    ['Richard Arkwright\'s cotton mill', 'Costly machines and all stages under one roof and one management'],
    ['Result', 'Close supervision, quality control and regulation of labour'],
  ],
  'Table of how factories came up in England: early factories from the 1730s, new spinning machines, Arkwright\'s mill bringing all stages under one roof, and closer supervision and quality control',
);
const vPace = table(
  ['Fact', 'What it shows'],
  [
    ['Cotton led until the 1840s; then iron and steel grew with railways', 'Only a few sectors changed fast'],
    ['Most workers stayed in traditional industries (food, building, pottery, glass, tanning, furniture)', 'Change came through small innovations'],
    ['Watt\'s improved steam engine (patented 1781) found few buyers for years', 'New machines were costly and unreliable'],
  ],
  'Table on the slow pace of change: cotton then iron and steel led, most workers stayed in traditional industries, and the steam engine spread slowly because machines were costly and unreliable',
);
const vWorkers = flow(
  'TB',
  ['Poor peasants migrate to cities', 'Jobs found through friends and relatives; many wait for weeks', 'Seasonal work: long spells without income', 'Fear of machines; attacks on the spinning jenny', 'From the 1840s: city building and railways create work'],
  'Flow of workers\' lives: migration to cities, finding jobs through networks, seasonal unemployment, fear of machines and attacks on the spinning jenny, and new work from city building and railways after the 1840s',
  'Life of workers in industrial Britain',
);
const vJenny = table(
  ['Step', 'Reasoning'],
  [
    ['The machine', 'One worker can turn several spindles at once'],
    ['Effect on demand', 'Fewer hand-spinners needed for the same yarn'],
    ['Workers\' fear', 'Women who lived by hand-spinning would lose income'],
    ['Response', 'Some attacked the new machines'],
  ],
  'Table explaining hostility to the spinning jenny: one worker could turn several spindles, fewer hand-spinners were needed, women spinners feared losing income, and some attacked the machines',
);
const vSummary1 = table(
  ['Idea', 'Remember'],
  [
    ['Proto-industrialisation', 'Merchant-organised rural production for world markets, before factories'],
    ['Guilds', 'Town producers\' associations that restricted entry and controlled prices'],
    ['Factories', 'From the 1730s; cotton first; Arkwright\'s mill'],
    ['Slow change', 'Traditional industries dominated; machines costly'],
    ['Hand labour', 'Cheap labour, seasonal trades, taste for handmade goods'],
    ['Workers', 'Hard to find jobs, seasonal work, fear of machines'],
  ],
  'Summary table of Part 1: proto-industrialisation, guilds, factories, slow change, hand labour and workers',
);
const vTextileTrade = table(
  ['Route', 'Ports or path', 'Links'],
  [
    ['Overland', 'From Punjab through mountain passes, by camel', 'Afghanistan, Persia, Central Asia'],
    ['Western sea trade', 'Surat (Gujarat)', 'Gulf and Red Sea ports'],
    ['Eastern sea trade', 'Masulipatnam (Coromandel), Hooghly (Bengal)', 'Southeast Asian ports'],
  ],
  'Table of pre-colonial routes of Indian textile trade: overland from Punjab to Afghanistan, Persia and Central Asia; Surat to the Gulf and Red Sea; Masulipatnam and Hooghly to Southeast Asia',
);
const vExportNet = flow(
  'LR',
  ['Weavers in villages', 'Supply merchants give advances and collect cloth', 'Brokers at the port', 'Export merchants and shippers', 'Overseas buyers'],
  'Flow of the pre-colonial export network: village weavers, supply merchants giving advances, port brokers, export merchants and shippers, and overseas buyers',
  'Financed and run by Indian merchants and bankers',
);
const vShift = table(
  ['Before the 1750s', 'After the 1750s'],
  [
    ['Indian merchants and bankers control the network', 'European companies win concessions, then monopoly rights'],
    ['Surat and Hooghly thrive', 'Surat and Hooghly decline; credit dries up'],
    ['Many old trading houses', 'Bombay and Calcutta grow; trade in European ships'],
  ],
  'Table of the shift after the 1750s: from Indian-controlled trade through Surat and Hooghly to European company control through Bombay and Calcutta',
);
const vCompany = flow(
  'TB',
  ['East India Company gains political power (from the 1760s)', 'Removes old traders and brokers', 'Appoints gomasthas to supervise weavers', 'Advances tie weavers to sell only to the Company', 'Low prices, harassment, loss of bargaining power'],
  'Flow of Company control: political power from the 1760s, removal of traders and brokers, gomasthas supervising weavers, advances tying weavers to the Company, and low prices and loss of bargaining power',
  'How the Company controlled weavers',
);
const vResponses = table(
  ['Weavers\' response', 'What it meant'],
  [
    ['Deserted villages', 'Moved with their looms to villages of relatives'],
    ['Revolts', 'With village traders, opposed the Company and its officials'],
    ['Refused advances', 'Closed workshops; many became agricultural labourers'],
  ],
  'Table of weavers\' responses to Company control: deserting villages, revolting with village traders, and refusing advances to become agricultural labourers',
);
const vManchester = flow(
  'TB',
  ['British cotton industry grows', 'Duties in Britain keep Indian cloth out', 'Manchester cloth sold in India', 'Weavers lose export and home markets', '1860s: American Civil War makes raw cotton scarce and costly', 'Late 19th century: Indian mills add competition'],
  'Flow of the weavers\' troubles: British industry grows, duties keep Indian cloth out of Britain, Manchester cloth is sold in India, weavers lose markets, raw cotton becomes costly in the 1860s, and Indian mills add competition',
  'Manchester comes to India',
);
const vTimeline = table(
  ['When', 'What happened to weavers'],
  [
    ['1760s', 'Company gains political power in Bengal'],
    ['Late 18th century', 'Gomasthas and advances tie weavers'],
    ['Early 19th century', 'British duties and cheap Manchester imports'],
    ['1860s', 'Raw cotton scarce after the American Civil War'],
    ['Late 19th century', 'Machine-made cloth from Indian mills'],
  ],
  'Timeline table of weavers\' troubles from the 1760s to the late nineteenth century: Company power, gomasthas and advances, Manchester imports, scarce raw cotton, and Indian mill cloth',
);
const vMills = table(
  ['Year', 'Factory'],
  [
    ['1854', 'First cotton mill in Bombay'],
    ['1855', 'First jute mill in Bengal'],
    ['1860s', 'Elgin Mill in Kanpur; first cotton mill in Ahmedabad'],
    ['1874', 'First spinning and weaving mill of Madras'],
    ['1912', 'Tata steel production begins at Jamshedpur'],
  ],
  'Table of early factories in India: first cotton mill in Bombay 1854, first jute mill in Bengal 1855, Kanpur and Ahmedabad mills in the 1860s, Madras mill 1874, Tata steel at Jamshedpur 1912',
);
const vCapital = table(
  ['Who', 'How they gathered capital or controlled industry'],
  [
    ['Dwarkanath Tagore (Bengal)', 'Fortune from the China trade; invested in joint-stock companies'],
    ['Parsi merchants of Bombay, e.g. Jamsetji Tata', 'Exports to China and raw cotton shipments to England'],
    ['Seth Hukumchand (Marwari)', 'Set up the first Indian jute mill in Calcutta (1917); China trade'],
    ['European managing agencies (e.g. Andrew Yule)', 'Raised capital and controlled tea, coffee, mining, indigo and jute'],
  ],
  'Table of early industrial capital in India: Dwarkanath Tagore and Parsi merchants from the China and cotton trade, Seth Hukumchand\'s jute mill in 1917, and European managing agencies controlling plantations, mining, indigo and jute',
);
const vJobber = flow(
  'LR',
  ['Peasants and artisans leave villages for mill towns', 'Crowds wait at the mill gate', 'Jobber recruits men from his village', 'Jobber helps them settle but demands gifts and money'],
  'Flow: peasants and artisans move to mill towns, crowds wait at mill gates, the jobber recruits men from his village and helps them but demands gifts and money',
  'Getting a mill job',
);
const vPeculiar = flow(
  'TB',
  ['Late 19th century: Indian mills make coarse yarn for handlooms and China', 'From 1905: swadeshi boycott of foreign cloth', 'From 1906: yarn exports to China fall', 'Mills shift from yarn to cloth', '1914–18: war cuts Manchester imports; Indian mills grow'],
  'Flow of changes in Indian industry: coarse yarn for handlooms and China, swadeshi boycott from 1905, falling yarn exports to China from 1906, a shift from yarn to cloth, and growth during the First World War',
  'How the pattern of industry changed',
);
const vSmall = table(
  ['Fact', 'Meaning'],
  [
    ['Large factories were a small part of industry', 'Most production stayed in small and household units'],
    ['Handloom output expanded in the 20th century', 'Weavers survived, especially in fine and special cloth'],
    ['Fly shuttle', 'Ropes and pulleys pass the weft quickly: more output, wider cloth'],
  ],
  'Table on small-scale industry: large factories were a small part of industry, handloom output expanded in the twentieth century, and the fly shuttle raised weavers\' output',
);
const vAds = table(
  ['Advertising method', 'Message to buyers'],
  [
    ['"Made in Manchester" on cloth labels', 'Trusted quality'],
    ['Images of gods and goddesses', 'The product is blessed and familiar'],
    ['Calendars in homes, shops and offices', 'Seen daily, even by people who cannot read'],
    ['Images of emperors and nawabs', 'Fit for royalty, so worthy of respect'],
    ['Swadeshi slogans of Indian mills', 'Buying Indian goods serves the nation'],
  ],
  'Table of advertising methods in colonial India and their messages: Made in Manchester labels, images of deities, calendars, royal images and swadeshi slogans',
);
const vReadAd = table(
  ['Step', 'Question to ask of an advertisement'],
  [
    ['1', 'Who is selling, and to whom?'],
    ['2', 'What picture and words are used?'],
    ['3', 'What feeling or belief does it appeal to: quality, faith, status, nation?'],
    ['4', 'What does it tell us about the period?'],
  ],
  'Four questions for reading an advertisement as a historical source: seller and buyer, pictures and words, the feeling it appeals to, and what it reveals about the period',
);
const vSummary2 = table(
  ['Idea', 'Remember'],
  [
    ['Indian textiles', 'Dominated world trade before machines; Surat, Masulipatnam, Hooghly'],
    ['Company control', 'Gomasthas and advances; weavers lost bargaining power'],
    ['Decline of weavers', 'Lost markets to Manchester; costly cotton in the 1860s'],
    ['Factories in India', 'Bombay 1854; jute 1855; capital from the China trade'],
    ['Peculiarities', 'Agencies for export; yarn first; swadeshi and the First World War helped'],
    ['Market for goods', 'Labels, calendars, deities, royalty, swadeshi messages'],
  ],
  'Summary table of Part 2: Indian textiles, Company control, decline of weavers, factories in India, peculiarities of growth and the market for goods',
);

// ---------------------------------------------------------------- decks
const PA = '*School periodic assessment only: this chapter is not examined in the CBSE board paper.*';
const part1 = deck({
  part: 1,
  title: 'The Age of Industrialisation — Part 1: Before and During the Industrial Revolution in Britain',
  goals: [
    'Explain proto-industrialisation and the roles of town merchants and rural producers',
    'Describe how factories came up in Britain and why the pace of change was slow',
    'Explain why hand labour persisted and how industrialisation affected workers\' lives',
  ],
  slides: [
    sl('title', 'The Age of Industrialisation', {
      b: `Part 1 — production **before factories**, the **first factories**, and why **hand labour** survived in Britain. ${PA}`,
      v: flow('LR', ['Production before factories', 'Why merchants went to villages', 'The first factories', 'A slow revolution', 'Hand labour and workers\' lives'], 'Route map of Part 1: production before factories, why merchants went to villages, the first factories, a slow revolution, and hand labour and workers\' lives', 'Part 1 at a glance'),
      n: 'Namaste! When we hear the words industrial revolution, we imagine smoking chimneys and huge machines. But the real story is slower and more surprising. Long before factories, villages were already producing goods for distant markets, and even after factories came, hand labour stayed important. Note that your school tests this chapter in periodic assessment; it is not part of the board paper.',
    }),
    sl('concept', 'Production before factories', {
      b: 'Historians call this phase **proto-industrialisation**: large-scale production for world markets, **without factories**.',
      v: vProto,
      n: 'Before factories, Europe already produced goods on a large scale for an international market. But the work happened in village homes. Merchants from towns gave money and raw material to peasant families, who spun and wove at home, using the labour of every family member, while still farming their small plots. Historians call this early phase proto-industrialisation.',
    }),
    sl('diagram', 'Why did merchants go to the villages?', {
      v: vWhyCountry,
      n: 'Why villages? As world trade and colonies grew, demand for goods rose. But in towns, powerful guilds of craftsmen controlled production. They trained workers, fixed prices, limited competition and kept out newcomers, often with special rights from rulers. So merchants could not expand in towns. They turned to the countryside, where poor peasants were looking for extra work.',
    }),
    sl('concept', 'Why did peasants agree?', {
      v: vPeasants,
      n: 'The peasants had their own reasons. Open common lands, where they once grazed animals and gathered firewood, were being enclosed. Their own plots were too small to feed the family. Work from the merchant brought cash income without leaving the village, and it kept women, children and men busy in the slack farm season. So the arrangement suited both sides.',
    }),
    sl('check', 'Quick check: the Taylor family', {
      b: 'A merchant leaves wool with a village family; they spin and weave at home and still farm. What is this?',
      chk: 'm_family',
      n: 'Look at where the work happens, who organises it, and whether there is a factory.',
    }),
    sl('diagram', 'A network controlled from the town', {
      v: vNetwork,
      n: 'Notice how the system worked. The merchant lived in a town, but the work was done in many village homes. He bought raw material, passed it to spinners and then weavers, sent the cloth to a town workshop for finishing, and then sold it abroad. The producers were scattered and many, but the merchant controlled every link in the chain. Town and countryside were tied together.',
    }),
    sl('example', 'Worked example 1: a three-mark answer on proto-industrialisation', {
      b: '*What was proto-industrialisation? Why did it develop?* (3 marks)',
      bl: [
        'Step 1 — Meaning: large-scale production for an **international market**, **before factories**.',
        'Step 2 — How: **town merchants** gave **advances and raw material** to **rural families**.',
        'Step 3 — Why: **guilds** blocked expansion in towns; **land-short peasants** needed income.',
        'Step 4 — Keep to about 60 words: one clear point per mark.',
      ],
      v: vAnswer,
      n: 'Here is how to turn this into a three-mark answer. First, the meaning: production for a world market before factories. Second, how it worked: town merchants and rural families. Third, why it developed: guilds in towns, and poor peasants in villages. Three distinct points, one per mark, in about sixty words. That shape works for most three-mark history questions.',
    }),
    sl('concept', 'The coming of the factory', {
      v: vFactory,
      n: 'The earliest factories in England appeared around the seventeen thirties, but they multiplied only towards the end of that century. Cotton led the way. New machines speeded up every stage of cotton production. Richard Arkwright created the cotton mill, bringing costly machines and all the stages under one roof and one management. Now owners could supervise workers, check quality and control the pace of work.',
    }),
    sl('diagram', 'A slow revolution', {
      v: vPace,
      n: 'Did factories take over overnight? No. Cotton led until the eighteen forties, and then iron and steel grew with the railways. But most workers stayed in traditional industries like food processing, building and pottery, which changed through small improvements. New machines were expensive and often broke down. Even James Watt\'s improved steam engine, patented in seventeen eighty one, found few buyers for years.',
    }),
    sl('check', 'Quick check: the bookbinder', {
      b: 'A London bookbinder has heavy work only before Christmas. Why would he prefer hand labour to machines?',
      chk: 'm_seasonal',
      n: 'Think about how many months a costly machine would actually be used.',
    }),
    sl('two-column', 'Hand labour or machines?', {
      cols: [
        '**Why Britain kept hand labour**\n\n- Plenty of cheap labour from the countryside\n- Seasonal trades needed workers only part of the year\n- Buyers wanted many designs and shapes\n- The rich preferred handmade goods as a mark of class',
        '**Why America mechanised faster**\n\n- Labour was scarce and costly\n- Machines saved money where workers were few\n- Large, uniform markets suited machine-made goods',
      ],
      n: 'Why did many British industrialists stick with hand labour? Workers were plentiful and cheap, so expensive machines made little sense. Many trades were seasonal. Customers wanted many designs and shapes that machines could not easily make, and the rich valued handmade goods as a sign of class. In America, where workers were scarce, machines paid off sooner. The choice depended on the cost of labour.',
    }),
    sl('diagram', 'Life of the workers', {
      v: vWorkers,
      n: 'For workers, life was hard. Poor peasants came to the cities, but finding a job depended on knowing someone inside. Many waited for weeks, sleeping under bridges. Work was often seasonal, so long spells passed without income, and rising prices ate into wages. Fear of losing work made workers hostile to machines. After the eighteen forties, building roads, stations and sewers in cities created more work.',
    }),
    sl('example', 'Worked example 2: why attack a spinning jenny?', {
      b: 'Explain why some women spinners attacked the spinning jenny (James Hargreaves, 1764).',
      bl: [
        'Step 1 — Describe the machine: one worker could turn **several spindles** at once.',
        'Step 2 — Effect: **fewer hand-spinners** were needed.',
        'Step 3 — Link to workers: women who lived by spinning feared **losing their income**.',
        'Step 4 — Conclude: fear of **unemployment** made workers hostile to new technology.',
      ],
      v: vJenny,
      n: 'Cause and effect questions need a chain. The spinning jenny let one worker turn several spindles at once. So fewer spinners were needed for the same yarn. Women who earned their living by spinning by hand saw their income threatened, and some attacked the machines. The general lesson: when jobs were scarce, new technology looked like a threat to workers.',
    }),
    sl('check', 'Quick check: taste for handmade goods', {
      b: 'True or false? In Victorian Britain, the upper classes preferred machine-made goods to handmade ones.',
      chk: 'tf_handmade',
      n: 'Think about what handmade goods signalled about a family\'s status.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'Here is Part 1 in brief. Before factories, merchants organised rural families to produce for world markets: proto-industrialisation. Factories came from the seventeen thirties, led by cotton and Arkwright\'s mill, but change was slow and most work stayed traditional. Cheap labour, seasonal trades and a taste for handmade goods kept hand labour alive, while workers faced scarce jobs and seasonal poverty.',
    }),
    sl('exam-tips', 'Tips for your periodic test: Part 1', {
      bl: [
        'Proto-industrialisation: write **before factories**, **international market**, **merchants and rural families**.',
        'Give **two sides** for why it developed: guilds in towns, land-short peasants.',
        'For "slow pace of change", mention **traditional industries** and **costly machines**.',
        'Hand labour: **cheap labour, seasonal trades, variety, upper-class taste**.',
        'Name inventors correctly: **Arkwright** (mill), **Watt** (steam engine), **Hargreaves** (jenny).',
        'This chapter is tested in **school periodic assessment**, not in the board paper.',
      ],
      n: 'Tips for your school test. For proto-industrialisation, three phrases matter: before factories, an international market, and merchants working with rural families. Explain why from both sides, guilds and peasants. For the slow pace of change, mention traditional industries and costly machines. And keep the inventors straight: Arkwright, the mill; Watt, the steam engine; Hargreaves, the spinning jenny.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'The Age of Industrialisation — Part 2: Industrialisation in India',
  goals: [
    'Explain how British policy and Company control affected Indian weavers',
    'Describe the growth of factories in India and the peculiarities of industrial growth',
    'Explain how advertisements helped create markets for goods',
  ],
  slides: [
    sl('title', 'Industrialisation in the colonies: India', {
      b: `Part 2 — Indian **textiles**, the **weavers** under Company rule, **factories** in India, and the **market for goods**. ${PA}`,
      v: flow('LR', ['The age of Indian textiles', 'Company and the weavers', 'Manchester comes to India', 'Factories in India', 'Small-scale industry', 'Advertising and markets'], 'Route map of Part 2: Indian textiles, the Company and the weavers, Manchester in India, factories in India, small-scale industry, and advertising', 'Part 2 at a glance'),
      n: 'Now we travel to India. Before machines, India was the world\'s great textile producer. Under colonial rule, weavers lost their markets and their freedom, and Manchester cloth flooded in. Yet Indian factories grew, and handloom weavers survived in surprising ways. We end with how sellers used pictures and slogans to win buyers. Again, this is a school periodic assessment chapter.',
    }),
    sl('diagram', 'The age of Indian textiles', {
      v: vTextileTrade,
      n: 'Before machine industry, Indian silk and cotton goods dominated the world\'s textile trade, especially the finer varieties. Bales of cloth went overland from Punjab, on camels through mountain passes, to Afghanistan, Persia and Central Asia. By sea, Surat on the Gujarat coast linked India to the Gulf and the Red Sea, while Masulipatnam and Hooghly traded with Southeast Asia.',
    }),
    sl('concept', 'Who ran the export trade?', {
      v: vExportNet,
      n: 'A whole network of Indian merchants and bankers ran this trade. Supply merchants gave advances to weavers in the villages, collected the woven cloth and carried it to the ports. At the ports, brokers bargained with them on behalf of the big export merchants and shippers. Credit, goods and information flowed through this network, and weavers could sell to more than one buyer.',
    }),
    sl('concept', 'A network breaks down', {
      v: vShift,
      n: 'From the seventeen fifties, this network began to break down. European companies first won trading concessions from local rulers and then monopoly rights. The old ports of Surat and Hooghly declined as their trade shrank and credit dried up. The new ports of Bombay and Calcutta grew, but trade through them was controlled by European companies and carried in European ships.',
    }),
    sl('check', 'Quick check: a western port', {
      b: 'Which pre-colonial port on the Gujarat coast linked India to the Gulf and Red Sea ports?',
      chk: 'm_ports',
      n: 'Look back at the table of routes and ports.',
    }),
    sl('diagram', 'The Company and the weavers', {
      v: vCompany,
      n: 'After the East India Company gained political power in Bengal from the seventeen sixties, it wanted cloth cheaply and without competition. It pushed out the old traders and brokers. It appointed gomasthas, paid servants who supervised weavers and checked the cloth. And it gave advances: once a weaver took the loan, he had to sell his cloth only to the gomastha, at a price the Company fixed.',
    }),
    sl('concept', 'How weavers responded', {
      v: vResponses,
      n: 'Weavers did not simply accept this. Gomasthas were outsiders who often came with armed men and punished weavers for delays. In many villages of the Carnatic and Bengal, weavers left with their looms to settle in the villages of relatives. Elsewhere, they joined village traders in revolts. Over time, many refused advances, closed their workshops and became farm labourers.',
    }),
    sl('diagram', 'Manchester comes to India', {
      v: vManchester,
      n: 'In the early eighteen hundreds, a bigger blow came. As Britain\'s cotton industry grew, it put duties on Indian cloth to keep it out, while Manchester cloth was sold in India. Weavers lost both their export market and much of their home market, because machine-made cloth was cheaper. In the eighteen sixties the American Civil War made raw cotton scarce and costly. Then Indian mills added more competition.',
    }),
    sl('check', 'Quick check: tied by advances', {
      b: 'How did the Company\'s system of advances affect weavers?',
      chk: 'm_advances',
      n: 'Think about what a weaver could no longer do once he had taken the Company\'s money.',
    }),
    sl('example', 'Worked example 1: building a timeline of the weavers\' decline', {
      b: 'Put the weavers\' troubles in order and explain each in one line.',
      bl: [
        'Step 1 — 1760s: the Company gains **political power**.',
        'Step 2 — Late 18th century: **gomasthas and advances** remove bargaining power.',
        'Step 3 — Early 19th century: **British duties** and **Manchester imports**.',
        'Step 4 — 1860s and after: **costly raw cotton**, then **Indian mill cloth**.',
      ],
      v: vTimeline,
      n: 'History answers become easier with a timeline. First, the Company gains power in the seventeen sixties. Then gomasthas and advances take away the weavers\' freedom. In the early nineteenth century, British duties and cheap Manchester cloth take away their markets. In the eighteen sixties raw cotton becomes costly, and finally Indian mills compete too. Each step made the next one worse.',
    }),
    sl('concept', 'Factories come up in India', {
      v: vMills,
      n: 'Indian factories began in the eighteen fifties. The first cotton mill came up in Bombay in eighteen fifty four, and the first jute mill in Bengal a year later. Mills followed in Kanpur and Ahmedabad in the eighteen sixties, and in Madras in eighteen seventy four. In nineteen twelve, steel production began at Jamshedpur. Mill towns grew around these factories.',
    }),
    sl('concept', 'Who invested, and who controlled?', {
      v: vCapital,
      n: 'Where did the money come from? Many early Indian industrialists made fortunes in trade with China. Dwarkanath Tagore of Bengal and Parsi merchants of Bombay such as Jamsetji Tata are examples, and Seth Hukumchand set up the first Indian jute mill in Calcutta in nineteen seventeen. But colonial rule limited Indian merchants, and European managing agencies controlled large sectors, mainly for export.',
    }),
    sl('diagram', 'Where did the workers come from?', {
      v: vJobber,
      n: 'Mill workers came mostly from nearby districts: peasants and artisans who could not find work at home. Many returned to their villages for harvests and festivals. Jobs were scarce, so crowds waited at the gates. Mill owners used jobbers, trusted older workers who brought men from their own villages. The jobber helped newcomers settle, but he also demanded money and gifts, and gained power over their lives.',
    }),
    sl('check', 'Quick check: the man at the mill gate', {
      b: 'An old, trusted worker brings men from his village, finds them jobs and demands gifts. Who is he?',
      chk: 'm_jobber',
      n: 'This person belongs to Indian mill towns, not to the Company\'s weaving villages.',
    }),
    sl('concept', 'The peculiar pattern of growth', {
      v: vPeculiar,
      n: 'Indian industrial growth followed a peculiar path. Early cotton mills made coarse yarn, not cloth, for Indian handloom weavers and for China. From nineteen oh five, the swadeshi movement urged people to boycott foreign cloth. Yarn exports to China fell from nineteen oh six, so mills shifted to making cloth. Then the First World War cut Manchester imports, and Indian mills, with army orders, grew fast.',
    }),
    sl('concept', 'Small-scale industry and the handloom', {
      v: vSmall,
      n: 'Even so, large factories were only a small part of Indian industry. Most production stayed in small workshops and homes, and handloom weaving actually expanded in the twentieth century. New tools helped. The fly shuttle, worked by ropes and pulleys, passed the weft thread quickly, so a weaver could produce more and weave wider cloth. Fine and special saris, which mills could not easily copy, kept weavers going.',
    }),
    sl('diagram', 'Creating a market: advertisements', {
      v: vAds,
      n: 'How do you sell new goods to new buyers? With advertisements. Manchester cloth carried labels saying Made in Manchester, a promise of quality. Labels and calendars showed gods and goddesses, or emperors and nawabs, to make products feel blessed or royal. Calendars hung in homes and tea shops reached even people who could not read. Indian manufacturers answered with a swadeshi message: buy Indian, serve the nation.',
    }),
    sl('example', 'Worked example 2: reading an advertisement as a source', {
      b: 'Use four questions to read any old advertisement, then write a two-mark answer.',
      bl: [
        'Step 1 — Who sells to whom? (a Manchester company to Indian buyers)',
        'Step 2 — What picture and words? (a goddess; "Made in Manchester")',
        'Step 3 — What appeal? (**quality** and **divine approval**)',
        'Step 4 — What period? (foreign cloth competing for **Indian markets**)',
      ],
      v: vReadAd,
      n: 'An advertisement is a historical source. Ask four questions. Who is selling, and to whom? What pictures and words are used? What feeling does it appeal to: quality, faith, status or the nation? And what does it tell us about its time? A Manchester label with a goddess tells us that foreign sellers were working hard to win Indian buyers.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'Here is Part 2 in brief. Indian textiles once led the world. Under the Company, gomasthas and advances took away weavers\' freedom, and Manchester cloth took their markets. Factories grew from eighteen fifty four, financed partly by China-trade fortunes, with jobbers recruiting workers. Swadeshi and the First World War helped Indian industry, handlooms survived, and advertisements shaped what people bought.',
    }),
    sl('exam-tips', 'Tips for your periodic test: Part 2', {
      bl: [
        'Gomasthas, advances, jobbers: define each and say **whom** they served.',
        'Weavers\' decline: give **causes in order** (Company control, Manchester, raw cotton, mills).',
        'Early factories: **Bombay 1854**, **jute in Bengal 1855**, **Madras 1874**, **Jamshedpur 1912**.',
        'First World War: **imports fell**, **war orders** rose, Manchester **never recovered**.',
        'Advertisements: name the **method** and its **message**.',
        'Map practice: Surat, Masulipatnam, Hooghly; Bombay, Ahmedabad, Kanpur.',
      ],
      n: 'Last tips. Do not mix up gomasthas, who served the Company in the eighteenth century, with jobbers, who recruited mill workers later. Give the causes of the weavers\' decline in order. Learn four dates for early factories. For the First World War, three ideas: imports fell, war orders rose, and Manchester never recovered. And for advertisements, always pair the method with its message.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'The Age of Industrialisation — Notes',
  sections: [
    {
      h: '1. Before the industrial revolution: proto-industrialisation',
      t: 1,
      b: '*This chapter is assessed only in school periodic assessment, not in the CBSE board paper.*\n\nEven before factories, England and Europe produced goods on a large scale for an **international market**. This phase is called **proto-industrialisation**.\n\n- **Why merchants went to the countryside:** world trade and colonies raised demand, but in towns, **crafts and trade guilds** (associations of producers that trained craftspeople, controlled production, prices and competition, and kept out newcomers, often with monopoly rights from rulers) blocked expansion.\n- **Why peasants agreed:** with **common lands enclosed** and plots too small, poor peasants needed extra income; they could work at home, use **family labour** and keep farming.\n- **How it worked:** town merchants gave **advances and raw material**; rural households spun and wove; cloth was finished in towns and exported. Production was scattered, but **merchants controlled** the network, tying town and countryside together.',
      terms: [
        ['Proto-industrialisation', 'Large-scale production for an international market, organised by merchants in rural homes, before factories.'],
        ['Guild', 'An association of producers that trained craftspeople and controlled production, prices and entry.'],
        ['Enclosure', 'Fencing of common lands for private use, which took away a resource of poor peasants.'],
      ],
      v: vProto,
      vs: [vWhyCountry],
    },
    {
      h: '2. The coming of the factory and the pace of change',
      t: 2,
      b: 'The earliest factories in England appeared around the **1730s** and multiplied from the late eighteenth century. **Cotton** was the first symbol of the new era. A series of inventions speeded up each stage of production, and **Richard Arkwright** created the **cotton mill**, where costly machines and all processes were brought **under one roof and one management**, allowing supervision, quality control and regulation of labour.\n\n**Change was slower than "revolution" suggests:**\n- cotton led until the 1840s; then **iron and steel** grew with the **railways** (in England from the 1840s, in the colonies from the 1860s);\n- most workers stayed in **traditional industries** (food processing, building, pottery, glass, tanning, furniture), which changed through small innovations;\n- new machines were **expensive, unreliable and costly to repair**: **James Watt** improved Newcomen\'s steam engine and patented it in **1781**, and his partner **Matthew Boulton** manufactured it, but it spread slowly.',
      terms: [
        ['Factory', 'A workplace where machines and workers are brought together under one management.'],
        ['Traditional industries', 'Older trades such as food processing, building and pottery that changed slowly.'],
      ],
      v: vFactory,
      vs: [vPace],
    },
    {
      h: '3. Hand labour, steam power and the life of workers',
      t: 2,
      b: '**Why hand labour persisted in Victorian Britain:** there was **no shortage of labour**, so wages were low and industrialists avoided machines needing large capital; **seasonal trades** (gasworks, breweries, bookbinders, Christmas goods, ship repair in winter) hired hands for the peak; many products needed **varied designs and shapes** that machines could not make; and the **upper classes preferred handmade goods** as a mark of refinement. In **America**, where labour was scarce, industrialists mechanised more eagerly.\n\n**Workers\' lives:** finding a job depended on **networks of friends and kin**; many waited for weeks, sleeping under bridges or in night shelters; **seasonal work** meant long periods without income; prices rose, so wages bought less. **Fear of unemployment** made workers hostile to new technology: when the **spinning jenny** (James Hargreaves, 1764) came into the woollen industry, women who lived by hand-spinning attacked the machines. From the **1840s**, city building (roads, railway stations, tunnels, drains) created more work.',
      terms: [
        ['Spinning jenny', 'A machine devised by James Hargreaves (1764) that let one worker turn several spindles.'],
        ['Seasonal work', 'Work available only in certain months, leaving workers idle for the rest of the year.'],
      ],
      v: vWorkers,
      vs: [vJenny],
    },
    {
      h: '4. Industrialisation in the colonies: the Indian weavers',
      t: 2,
      b: '**The age of Indian textiles:** before machine industry, Indian silk and cotton goods **dominated international trade**. Cloth went overland from Punjab to Afghanistan, Persia and Central Asia, and by sea from **Surat** (to the Gulf and Red Sea) and from **Masulipatnam** and **Hooghly** (to Southeast Asia). A network of Indian **supply merchants, brokers and export merchants** financed and ran the trade.\n\n**Breakdown (from the 1750s):** European companies won concessions and then monopoly rights; **Surat and Hooghly declined**; **Bombay and Calcutta** grew, with trade in European ships.\n\n**The Company and the weavers:** after gaining political power (1760s), the Company removed old traders and brokers, appointed **gomasthas** (paid servants who supervised weavers and checked cloth) and used a system of **advances** that tied weavers to sell only to it, at low prices. Weavers clashed with gomasthas; many **deserted villages**, some **revolted**, others **refused advances** and became agricultural labourers.\n\n**Manchester comes to India:** British duties shut out Indian cloth, and cheap **Manchester cloth** flooded India, so weavers lost both export and local markets. In the **1860s**, the **American Civil War** raised raw cotton exports from India and its price, starving weavers of supplies. By the late nineteenth century, **Indian mills** added competition.',
      terms: [
        ['Gomastha', 'A paid servant of the East India Company who supervised weavers, collected supplies and examined cloth.'],
        ['System of advances', 'Loans to weavers for raw material that obliged them to sell their cloth only to the lender.'],
      ],
      v: vCompany,
      vs: [vManchester],
    },
    {
      h: '5. Factories in India and the peculiarities of industrial growth',
      t: 3,
      b: '**Early factories:** the first **cotton mill in Bombay (1854)**; the first **jute mill in Bengal (1855)**; mills in **Kanpur** (Elgin Mill) and **Ahmedabad** in the 1860s; the first spinning and weaving mill of **Madras (1874)**; **Tata steel at Jamshedpur (1912)**.\n\n**Entrepreneurs:** many made money in the **China trade**: **Dwarkanath Tagore** (Bengal), Parsis of Bombay such as **Dinshaw Petit** and **Jamsetji Tata** (also raw cotton exports to England), **Seth Hukumchand** (first Indian jute mill in Calcutta, 1917). Colonial rule restricted Indian merchants to exporting raw materials, and **European managing agencies** (Bird Heiglers, Andrew Yule, Jardine Skinner) controlled large sectors, especially tea, coffee, mining, indigo and jute for **export**.\n\n**Workers:** mostly from **nearby districts**, moving between village and mill; recruited through **jobbers**, who helped them but demanded money and gifts and gained power over them.\n\n**Peculiarities:** early mills produced **coarse yarn** for handlooms and for **China**; the **swadeshi movement** (from 1905) and the fall of yarn exports to China (from 1906) pushed mills to make **cloth**; the **First World War** cut Manchester imports and brought **war orders**, and Manchester never recovered its position. Yet **small-scale and household units** remained most of industry, and **handloom output expanded**, helped by the **fly shuttle**.',
      terms: [
        ['Jobber', 'A trusted older worker employed by mill owners to recruit workers, who gained power over them.'],
        ['Managing agency', 'A European firm that raised capital, set up companies and took business decisions in colonial India.'],
        ['Fly shuttle', 'A device worked by ropes and pulleys that passes the weft quickly through the warp, raising a weaver\'s output.'],
      ],
      v: vMills,
      vs: [vPeculiar, vSmall],
    },
    {
      h: '6. The market for goods',
      t: 3,
      b: 'New products needed new buyers. **Advertisements** made products seem desirable and necessary and created new needs.\n\n- **Labels** on Manchester cloth said **"Made in Manchester"** to promise quality, and often carried images of **Indian gods and goddesses**, giving the product a sense of divine approval and familiarity.\n- **Calendars** carried advertisements into homes, tea shops and offices, reaching even people who could not read.\n- Images of **emperors and nawabs** lent products royal prestige.\n- Indian manufacturers made advertising a vehicle for **swadeshi**: buying Indian-made goods was presented as serving the nation.',
      terms: [
        ['Advertisement', 'A message that makes a product seem desirable and necessary in order to sell it.'],
        ['Swadeshi', 'The idea of using goods made in one\'s own country, promoted by the national movement.'],
      ],
      v: vAds,
    },
  ],
  tips: '**This chapter is assessed in school periodic assessment only (not in the CBSE board paper).**\n\n**Common mistakes**\n- Calling proto-industrialisation "factory production": it came **before** factories.\n- Saying guilds were in villages: they were **urban** producers\' associations.\n- Mixing up **gomasthas** (Company servants who controlled weavers) and **jobbers** (recruiters for mills).\n- Giving the American Civil War as the reason for cheaper cotton: it made raw cotton **scarcer and dearer** for Indian weavers.\n- Saying handlooms disappeared after mills came: handloom output **expanded** in the twentieth century.\n\n**How marks are usually awarded**\n- 1 mark: one correct option or term.\n- 2 marks: two points (about 40 words); 3 marks: three points (about 60 words).\n- 5 marks: five numbered points (about 120 words); chronology and causes in order earn credit.\n- Map practice: one mark for each place correctly located and labelled.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['**Proto-industrialisation**', 'Large-scale production for world markets in rural homes, organised by merchants, **before factories**.', 'definition', 1],
  ['Why did merchants turn to the countryside?', 'Town **guilds** restricted production; demand from world trade and colonies was rising.', 'concept', 1],
  ['**Guild**', 'An urban association of producers that trained craftspeople and controlled production, prices and entry.', 'definition', 1],
  ['Why did peasants work for merchants?', 'Commons enclosed, plots too small: they needed extra income and could work at home.', 'concept', 1],
  ['Who controlled the proto-industrial network?', '**Town merchants**.', 'fact', 1],
  ['When did the earliest English factories appear?', 'Around the **1730s**; they multiplied from the late 18th century.', 'fact', 2],
  ['First symbol of the factory age', '**Cotton**.', 'fact', 2],
  ['**Richard Arkwright**', 'Created the **cotton mill**: machines and processes under one roof.', 'fact', 2],
  ['**James Watt**', 'Improved Newcomen\'s steam engine; patented it in **1781**; Matthew Boulton made it.', 'fact', 2],
  ['Why did new machines spread slowly?', 'Costly, broke down often, expensive to repair, doubtful gains.', 'concept', 2],
  ['Four reasons hand labour persisted in Britain', 'Cheap labour; seasonal trades; varied designs; upper-class taste for handmade goods.', 'concept', 2],
  ['Why did America mechanise faster?', '**Labour was scarce** and costly.', 'concept', 2],
  ['**Spinning jenny**', 'James Hargreaves, **1764**; one worker turns several spindles; women spinners attacked it.', 'fact', 2],
  ['Workers\' lives in British cities', 'Jobs through networks; long waits; seasonal unemployment; wages buying less.', 'concept', 2],
  ['Pre-colonial textile ports', '**Surat** (Gulf, Red Sea); **Masulipatnam** and **Hooghly** (Southeast Asia).', 'fact', 2],
  ['**Gomastha**', 'Paid Company servant who supervised weavers, collected supplies and checked cloth.', 'definition', 2],
  ['**System of advances**', 'Loans that forced weavers to sell their cloth only to the Company, at low prices.', 'concept', 2],
  ['How did weavers resist the Company?', 'Deserted villages; revolted with village traders; refused advances.', 'concept', 2],
  ['Two problems from Manchester cloth', 'Lost **export** market (British duties) and **home** market (cheap imports).', 'concept', 2],
  ['Effect of the American Civil War on Indian weavers', 'Raw cotton exported to Britain; its price rose; weavers short of supply.', 'concept', 2],
  ['First cotton mill in India', '**Bombay, 1854**.', 'fact', 3],
  ['First jute mill', '**Bengal, 1855**.', 'fact', 3],
  ['Source of early Indian industrial capital', 'Often the **China trade** (Dwarkanath Tagore, Parsi merchants of Bombay).', 'fact', 3],
  ['**Managing agencies**', 'European firms (e.g. Andrew Yule) controlling tea, coffee, mining, indigo, jute.', 'definition', 3],
  ['**Jobber**', 'Trusted worker who recruited mill hands from his village and gained power over them.', 'definition', 3],
  ['Why did mills shift from yarn to cloth?', 'Swadeshi boycott (1905) and falling yarn exports to China (1906).', 'concept', 3],
  ['First World War and Indian industry', 'Manchester imports fell; war orders; Indian mills grew; Manchester never recovered.', 'concept', 3],
  ['**Fly shuttle**', 'Ropes and pulleys pass the weft quickly: more output, wider cloth.', 'definition', 3],
  ['Advertising methods in colonial India', 'Labels of origin, deities, calendars, royal images, swadeshi slogans.', 'concept', 3],
  ['Is this chapter in the board paper?', 'No: it is assessed in **school periodic assessment** only.', 'exam-tip', null],
]);

// ---------------------------------------------------------------- tests (periodic-assessment style)
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-10-social-science-chapter-test-short',
  title: 'Chapter test (short, periodic-assessment style) — The Age of Industrialisation',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_proto_def', 'm_watt', 'm_first_mill', 'ar_handlabour'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 40 words and the 3-mark question in about 60 words.', items: ['s_proto', 's_gomastha', 's3_ww1'] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer any ONE of the two questions in about 120 words.', items: [{ attempt: 1, keys: ['l_proto', 'l_factories'] }] },
    { id: 'D', title: 'Section D — Source-based (4 marks)', instr: 'Read the source and answer all parts. Part (c) has an internal choice.', items: ['sb_mill'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-10-social-science-chapter-test-long',
  title: 'Chapter test (long, periodic-assessment style) — The Age of Industrialisation',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_guilds', 'm_arkwright', 'm_slow_tech', 'm_handmade', 'm_gomastha', 'm_civil_war', 'm_china_trade', 'm_ww1', 'ar_ports', 'ar_ww1'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 40 words and 3-mark questions in about 60 words. Questions 13 and 15 have an internal choice.', items: ['s_hand', 's_jobber', { attempt: 1, keys: ['s_workers', 's_entrepreneurs'] }, 's3_weavers_decline', { attempt: 1, keys: ['s3_proto_benefit', 's3_peculiarities'] }] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer question 16, and any ONE of questions 17 and 18, in about 120 words each.', items: ['l_weavers', { attempt: 1, keys: ['l_market', 'l_compare'] }] },
    { id: 'D', title: 'Section D — Source-based (4 marks each)', instr: 'Read each source and answer all parts. Part (c) of each has an internal choice.', items: ['sb_weaver', 'sb_war'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'cbse-10-social-science-ch04 is board_assessed: false (school periodic assessment only); topics t01–t03; decks, notes and test titles say so',
    originality: 'every source and scenario written for this chapter (imagined petitions, letters, notebooks, reports and advertisements); no NCERT boxed source, picture caption or exercise reused',
    facts: 'factories from the 1730s; Arkwright\'s mill; Watt\'s patent 1781 and Boulton; Hargreaves\' jenny 1764; Surat, Masulipatnam, Hooghly; gomasthas and advances; American Civil War cotton prices; Bombay mill 1854, Bengal jute 1855, Madras 1874, Jamshedpur steel 1912; Hukumchand 1917; swadeshi 1905; yarn exports to China fall from 1906; fly shuttle',
    gate: 'npm test -w @soyl/content-templates, content lint (lintExemplar) and the deterministic verify checks run clean on this chapter',
  },
});
