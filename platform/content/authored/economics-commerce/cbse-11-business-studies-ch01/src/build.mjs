// Build CBSE 11 Business Studies ch01 Nature and Purpose of Business. Run from platform/:
//   npx tsx content/authored/economics-commerce/cbse-11-business-studies-ch01/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from './lib.mjs';

setUnit('cbse-11-business-studies-ch01', 'economics-commerce');
await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// Table helper: the alt text is built from the rows themselves so that it always matches.
const tb = (what, headers, rows, caption) =>
  table(headers, rows, `Table of ${what}. ${rows.map((r) => r.join(', ')).join('; ')}`, caption);

// ---------------------------------------------------------------- SVG figures
const vTree = (() => {
  const s = new Svg(720, 330);
  const box = (cx, cy, w, label, accent) => {
    s.rect(cx - w / 2, cy - 14, w, 28, { fill: accent ? 'accent' : 'fill', fillOpacity: accent ? 0.22 : 0, color: accent ? 'accent' : 'muted', sw: 1.6, rx: 8 });
    s.text(cx, cy, label, { size: 13, bold: true });
  };
  const link = (x1, y1, x2, y2) => s.line(x1, y1, x2, y2, { color: 'muted', sw: 1.4 });
  box(372, 28, 170, 'Business activities', true);
  box(200, 100, 110, 'Industry');
  box(545, 100, 110, 'Commerce');
  link(372, 42, 200, 86);
  link(372, 42, 545, 86);
  [[70, 'Primary'], [200, 'Secondary'], [330, 'Tertiary']].forEach(([x, l]) => { box(x, 170, 110, l); link(200, 114, x, 156); });
  [[475, 'Trade'], [615, 'Auxiliaries']].forEach(([x, l]) => { box(x, 170, 110, l); link(545, 114, x, 156); });
  const leaf = (x, lines) => lines.forEach((t, i) => s.text(x, 206 + i * 18, t, { size: 12, muted: i % 2 === 1 && false }));
  leaf(70, ['Extractive', 'Genetic']);
  leaf(200, ['Manufacturing', 'Construction']);
  leaf(330, ['Services that', 'support trade']);
  leaf(475, ['Internal: wholesale,', 'retail', 'External: import,', 'export, entrepot']);
  leaf(615, ['Transport', 'Banking', 'Insurance', 'Warehousing', 'Advertising']);
  return s.visual('Tree of business activities: business activities divide into industry and commerce; industry has primary (extractive and genetic), secondary (manufacturing and construction) and tertiary (services that support trade); commerce has trade (internal: wholesale and retail; external: import, export, entrepot) and auxiliaries to trade (transport, banking, insurance, warehousing, advertising)', 'Industry makes or provides goods; commerce moves them to buyers.');
})();

const vCompare = (() => {
  const s = new Svg(640, 300);
  const cols = [[130, 'Business'], [290, 'Profession'], [450, 'Employment']];
  const rows = [
    ['Set up by', 'Owner decides', 'Professional body', 'Contract or letter'],
    ['Work', 'Goods and services', 'Expert service', 'As assigned'],
    ['Qualification', 'None prescribed', 'Specified degree', 'As the job needs'],
    ['Reward', 'Profit', 'Fees', 'Wage or salary'],
    ['Capital', 'Considerable', 'Limited', 'None'],
    ['Risk', 'High', 'Some', 'Little'],
    ['Transfer', 'With formalities', 'Not possible', 'Not possible'],
  ];
  cols.forEach(([x, l], i) => {
    s.rect(x, 6, 150, 30, { fill: 'accent', fillOpacity: 0.2, color: 'accent', sw: 1.6, rx: 8 });
    s.text(x + 75, 21, l, { size: 14, bold: true });
  });
  rows.forEach((r, i) => {
    const y = 44 + i * 36;
    s.rect(10, y, 112, 30, { fill: 'fill', color: 'muted', sw: 1.2, rx: 6 });
    s.text(66, y + 15, r[0], { size: 12, bold: true });
    cols.forEach(([x], k) => {
      s.rect(x, y, 150, 30, { fill: 'fill', color: 'muted', sw: 1.2, rx: 6 });
      s.text(x + 75, y + 15, r[k + 1], { size: 12 });
    });
  });
  return s.visual('Comparison chart of business, profession and employment by seven bases: set up by, work, qualification, reward, capital, risk and transfer of interest. Business: owner decides, goods and services, no prescribed qualification, profit, considerable capital, high risk, transfer with formalities. Profession: professional body, expert service, specified degree, fees, limited capital, some risk, no transfer. Employment: contract or appointment letter, work as assigned, qualification as the job needs, wage or salary, no capital, little risk, no transfer', 'Compare the three on the same bases.');
})();

const vAux = (() => {
  const s = new Svg(560, 330);
  s.text(280, 18, 'Auxiliaries to trade and the hindrance each removes', { size: 14, bold: true });
  const rows = [
    ['Transport and communication', 'Place'],
    ['Warehousing', 'Time'],
    ['Banking and finance', 'Finance'],
    ['Insurance', 'Risk'],
    ['Advertising', 'Information'],
  ];
  rows.forEach(([a, h], i) => {
    const y = 40 + i * 56;
    s.rect(20, y, 240, 40, { fill: 'fill', color: 'accent', sw: 1.8, rx: 10 });
    s.text(140, y + 20, a, { size: 14, bold: true });
    s.arrow(262, y + 20, 338, y + 20, { color: 'accent', sw: 2 });
    s.rect(340, y, 190, 40, { fill: 'accent', fillOpacity: 0.18, color: 'accent', sw: 1.6, rx: 10 });
    s.text(435, y + 20, `removes ${h.toLowerCase()}`, { size: 14 });
  });
  return s.visual('Flow from each auxiliary to trade to the hindrance it removes: transport and communication remove place, warehousing removes time, banking and finance remove finance, insurance removes risk, and advertising removes information', 'Each auxiliary clears one hindrance between producer and buyer.');
})();

const vRiskWeb = (() => {
  const s = new Svg(620, 300);
  const corner = (x, y, title, l1, l2) => {
    s.rect(x, y, 240, 80, { fill: 'fill', color: 'accent', sw: 1.8, rx: 12 });
    s.text(x + 120, y + 18, title, { size: 14, bold: true });
    s.text(x + 120, y + 42, l1, { size: 12 });
    s.text(x + 120, y + 62, l2, { size: 12 });
  };
  corner(10, 10, 'Natural causes', 'Floods, earthquakes', 'and other acts of nature');
  corner(370, 10, 'Human causes', 'Dishonest employees, strikes,', 'inefficient management');
  corner(10, 210, 'Economic causes', 'Changes in demand, competition,', 'price changes, new technology');
  corner(370, 210, 'Other causes', 'Political disturbances,', 'exchange-rate changes');
  s.line(250, 90, 270, 125, { color: 'muted', sw: 1.6 });
  s.line(370, 90, 350, 125, { color: 'muted', sw: 1.6 });
  s.line(250, 210, 270, 175, { color: 'muted', sw: 1.6 });
  s.line(370, 210, 350, 175, { color: 'muted', sw: 1.6 });
  s.rect(240, 125, 140, 50, { fill: 'accent', fillOpacity: 0.25, color: 'accent', sw: 2, rx: 12 });
  s.text(310, 150, 'Business risk', { size: 15, bold: true });
  return s.visual('Web of the causes of business risk: business risk at the centre, with natural causes (floods, earthquakes), human causes (dishonest employees, strikes, inefficient management), economic causes (changes in demand, competition, price changes, new technology) and other causes (political disturbances, exchange-rate changes) around it', 'Four groups of causes feed business risk.');
})();

// ---------------------------------------------------------------- tables and flows
const vRoute1 = flow('LR', ['Old trade and banking', 'Economic activities', 'Business: meaning, features', 'Objectives of business'], 'Route map of Part 1: the history of trade, economic activities, the meaning and characteristics of business, and its objectives', 'Part 1 at a glance');
const vRoute2 = flow('LR', ['Industry and commerce', 'Trade and its kinds', 'Auxiliaries to trade', 'Business risk and its causes'], 'Route map of Part 2: industry and commerce, the kinds of trade, auxiliaries to trade, and business risk with its causes', 'Part 2 at a glance');

const vAncient = tb('trade in ancient India', ['Feature', 'What it shows'], [
  ['Indus Valley cities', 'Traded with Mesopotamia'],
  ['Later periods', 'Overland and sea trade flourished'],
  ['Goods', 'Cloth, spices and crafts moved between regions'],
  ['Helpers of trade', 'Bankers, guilds and agents'],
], 'Trade was old, wide and well organised.');
const vRoutes = flow('LR', ['Uttarapatha: northern route', 'Dakshinapatha: southern route', 'Links with the Silk Route', 'Ports on both coasts'], 'Flow of the routes of ancient trade: the northern Uttarapatha, the southern Dakshinapatha, links with the Silk Route and ports on both coasts', 'Routes of trade', [
  { from: 'n1', to: 'n3' }, { from: 'n2', to: 'n3' }, { from: 'n3', to: 'n4' },
]);
const vBank = tb('indigenous banking', ['Item', 'Meaning'], [
  ['Hundi', 'A written order to pay a sum, like a bill of exchange'],
  ['Chitthi', 'A written note used to send credit or money'],
  ['Shroff or seth', 'Indigenous banker who lends, takes deposits, moves money'],
], 'Credit and payment systems grew without coins moving.');
const vGuild = tb('guilds and intermediaries', ['Body', 'Role'], [
  ['Merchant guild (shreni)', 'Traders and artisans who regulated trade and helped members'],
  ['Commission agent', 'Arranges sales for a fee'],
  ['Broker', 'Brings buyers and sellers together'],
  ['Distributor', 'Carries goods from producer to sellers'],
], 'Longer distances created a need for helpers.');
const vEcon = tb('economic and non-economic activities', ['Kind', 'Aim', 'Example'], [
  ['Economic', 'Earn a living', 'Running a shop, practising medicine, working for a salary'],
  ['Non-economic', 'Love, sympathy, religion, patriotism', 'Feeding stray animals, helping at a temple'],
], 'Ask: is it done to earn a living?');
const vThree = tb('business, profession and employment', ['Activity', 'Meaning'], [
  ['Business', 'Producing or buying and selling goods and services for profit'],
  ['Profession', 'Specialised knowledge and skill, regulated by a professional body'],
  ['Employment', 'Work for others for a wage or salary'],
], 'Three kinds of economic activity.');
const vIdentify = tb('imagined people and their activity', ['Imagined person', 'Activity'], [
  ['Asha runs a tailoring shop and keeps the surplus', 'Business'],
  ['Dr. Rao treats patients, registered with a council, charges fees', 'Profession'],
  ['Imran drives a bus for a transport company on a monthly salary', 'Employment'],
  ['Joseph cooks for a village fair as a religious offering', 'Non-economic'],
], 'Look at the reward: profit, fee, salary, or none.');
const vChars = tb('characteristics of business', ['Characteristic', 'Key idea'], [
  ['Economic activity', 'Done to earn a living'],
  ['Production or procurement', 'Goods and services made or bought'],
  ['Sale or exchange', 'Transfer to buyers for value'],
  ['Regular dealings', 'A single sale is not business'],
  ['Profit earning', 'Surplus over costs is the aim'],
  ['Uncertainty of return', 'Profit may rise or fall'],
  ['Element of risk', 'Loss is always possible'],
], 'Seven characteristics of business');
const vNotBus = tb('is it business', ['Imagined case', 'Business?', 'Reason'], [
  ['Leela sells her old fridge once to a neighbour', 'No', 'One sale, not regular'],
  ['Mohan buys and sells vegetables every day', 'Yes', 'Regular, for profit'],
  ['A student gives free tuition to a neighbour', 'No', 'No profit motive'],
], 'Check regularity, profit motive and risk.');
const vObj = tb('objectives of business', ['Objective', 'Idea'], [
  ['Market standing', 'A strong position among competitors'],
  ['Innovation', 'New products and methods'],
  ['Productivity', 'More output from the same resources'],
  ['Physical and financial resources', 'Plant, equipment and funds'],
  ['Earning profits', 'Surplus over costs'],
  ['Manager performance and development', 'Skilled, growing managers'],
  ['Worker performance and attitude', 'Good output and morale'],
  ['Social responsibility', 'Benefit to society'],
], 'Eight objectives of business');
const vProfitFlow = flow('LR', ['Profit pays costs and rewards risk', 'But customers and staff must be kept', 'New ideas keep the firm ahead', 'Society expects fair conduct', 'So many objectives are needed'], 'Flow showing that profit is necessary but customers, staff, new ideas and society also matter, so a business needs many objectives', 'Why profit is not the only objective', [
  { from: 'n1', to: 'n5' }, { from: 'n2', to: 'n5' }, { from: 'n3', to: 'n5' }, { from: 'n4', to: 'n5' },
]);
const vObjEx = tb('lines from imagined cases and the objective shown', ['Line from an imagined case', 'Objective'], [
  ['Padma Plastics launched a dissolving bottle', 'Innovation'],
  ['Delta Cycles aims to be first in its state by sales', 'Market standing'],
  ['Morbipur Tiles cut rejects per batch', 'Productivity'],
  ['A bakery plants trees near its unit', 'Social responsibility'],
], 'Match each line to the need it meets.');
const vSummary1 = tb('Part 1 summary', ['Idea', 'Remember'], [
  ['History', 'Old trade routes, hundis, shroffs, guilds, intermediaries'],
  ['Economic activities', 'Business, profession, employment'],
  ['Characteristics', 'Seven: regular, for profit, uncertain, risky'],
  ['Objectives', 'Eight; profit necessary but not the only one'],
], 'Part 1 in one glance');
const vTips1 = tb('exam tips for Part 1', ['Tip', 'Why'], [
  ['Compare on the same bases', 'Easy marks in the five-mark question'],
  ['Name the reward', 'Profit, fees or salary shows the activity'],
  ['Give an example per objective', 'Shows application'],
], 'Tips for Part 1');

const vIndComm = flow('TB', ['Business activities', 'Industry: makes or provides goods', 'Commerce: trade plus auxiliaries to trade'], 'Flow showing that business activities divide into industry, which makes or provides goods, and commerce, which is trade plus auxiliaries to trade', 'Two branches of business activity', [
  { from: 'n1', to: 'n2' }, { from: 'n1', to: 'n3' },
]);
const vPrimary = tb('primary industries', ['Kind', 'Meaning', 'Examples'], [
  ['Extractive', 'Takes out products provided by nature', 'Mining, fishing, forestry'],
  ['Genetic', 'Breeds and multiplies plants and animals', 'Cattle breeding, nurseries'],
], 'Primary industries use nature directly.');
const vManuf = tb('secondary industries', ['Kind', 'What happens', 'Example'], [
  ['Analytical', 'One material is separated into parts', 'Oil refinery'],
  ['Synthetical', 'Materials are combined into one product', 'Cement'],
  ['Processing', 'Material passes through stages', 'Sugar, paper'],
  ['Assembling', 'Ready parts are fitted together', 'Bicycles, computers'],
  ['Construction', 'Building structures', 'Roads, bridges, dams'],
], 'Manufacturing has four kinds; construction is separate.');
const vClassEx = tb('imagined firms and their industry', ['Imagined firm', 'Type'], [
  ['Kaveri Nursery raises saplings for farmers', 'Primary: genetic'],
  ['Bhima Cement Works combines limestone and clay', 'Secondary: synthetical'],
  ['Annapurna Mills turns sugarcane into sugar in stages', 'Secondary: processing'],
  ['Skyline Builders puts up an office block', 'Secondary: construction'],
], 'Ask: does it take, make, build or serve?');
const vComm = flow('LR', ['Trade: buying and selling', 'Auxiliaries to trade: services that help trade', 'Commerce'], 'Flow showing that trade and auxiliaries to trade together make commerce', 'Commerce equals trade plus auxiliaries', [
  { from: 'n1', to: 'n3' }, { from: 'n2', to: 'n3' },
]);
const vTrade = tb('kinds of trade', ['Kind', 'Meaning'], [
  ['Wholesale', 'Buying in bulk and selling to retailers'],
  ['Retail', 'Selling in small lots to final consumers'],
  ['Import', 'Buying goods from another country'],
  ['Export', 'Selling goods to another country'],
  ['Entrepot', 'Importing goods in order to export them again'],
], 'Internal trade: wholesale and retail. External trade: import, export, entrepot.');
const vAuxTable = tb('auxiliaries to trade', ['Auxiliary', 'Hindrance removed', 'Example'], [
  ['Transport and communication', 'Place', 'Trucks carry goods to a city'],
  ['Warehousing', 'Time', 'A cold room holds fruit till needed'],
  ['Banking and finance', 'Finance', 'A loan to buy stock'],
  ['Insurance', 'Risk', 'A policy against loss by fire'],
  ['Advertising', 'Information', 'A notice about a new product'],
], 'One auxiliary, one hindrance.');
const vSpotAux = tb('imagined needs and the auxiliary used', ['Need of an imagined firm', 'Auxiliary'], [
  ['Hari Hardware must protect its stock against flood loss', 'Insurance'],
  ['Nandpur Dairy sends milk to a distant town every dawn', 'Transport'],
  ['A grain trader needs money to buy before harvest', 'Banking and finance'],
  ['A new tea brand wants shoppers to know it exists', 'Advertising'],
], 'Name the hindrance first, then the auxiliary.');
const vRiskNature = tb('nature of business risk', ['Feature', 'Meaning'], [
  ['Meaning', 'Possibility of inadequate profit or loss from uncertain or unexpected events'],
  ['Arises from uncertainty', 'The future cannot be known'],
  ['Essential part', 'Every business bears it'],
  ['Degree varies', 'Depends on nature and size of business'],
  ['Profit is its reward', 'Bearing risk earns profit'],
], 'Risk and profit go together.');
const vRiskCauses = tb('causes of business risk', ['Group', 'Examples'], [
  ['Natural', 'Floods, earthquakes'],
  ['Human', 'Dishonest employees, strikes, management inefficiency'],
  ['Economic', 'Demand change, competition, price changes, technology'],
  ['Other', 'Political disturbances, exchange-rate changes'],
], 'Four groups of causes');
const vRiskEx = tb('imagined events and their group of cause', ['Imagined event', 'Group'], [
  ['A cyclone damages Coast Textiles\' godown', 'Natural'],
  ['A strike halts production at Eastern Steel Works', 'Human'],
  ['A rival cuts prices and Nandpur Dairy loses buyers', 'Economic'],
  ['A buying country restricts orders from an imagined exporter', 'Other'],
], 'Read the cause, not the loss.');
const vSummary2 = tb('Part 2 summary', ['Idea', 'Remember'], [
  ['Industry', 'Primary, secondary (manufacturing, construction), tertiary'],
  ['Commerce', 'Trade plus auxiliaries to trade'],
  ['Trade', 'Internal: wholesale, retail. External: import, export, entrepot'],
  ['Auxiliaries', 'Place, time, finance, risk, information'],
  ['Risk', 'Uncertainty; four groups of causes; profit is the reward'],
], 'Part 2 in one glance');
const vTips2 = tb('exam tips for Part 2', ['Tip', 'Why'], [
  ['Learn the four manufacturing kinds with examples', 'Frequent two-mark items'],
  ['Link each auxiliary to its hindrance', 'Asked in many forms'],
  ['Quote the line from the case, then name the cause', 'Marks for evidence'],
], 'Tips for Part 2');

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Nature and Purpose of Business: Part 1, History, Concept and Objectives',
  goals: [
    'Describe the main features of trade and indigenous banking in old India',
    'Distinguish business, profession and employment',
    'List and explain the characteristics of business',
    'Explain the objectives of business and why profit alone is not enough',
  ],
  slides: [
    sl('title', 'History, concept and objectives of business', {
      b: 'Part 1: how trade grew in old India, what **business** is, and what it aims to achieve.',
      v: vRoute1,
      n: 'In this part we begin with the story of trade in India. Then we learn what business is, how it differs from a profession and from employment, what its features are and what objectives it pursues. Along the way we meet imagined shopkeepers, doctors and teachers to practise.',
    }),
    sl('concept', 'Trade in ancient India', {
      b: 'Trade and commerce **flourished** in ancient India.',
      v: vAncient,
      n: 'India has a long trading past. The cities of the Indus Valley traded with Mesopotamia. In later ancient times there was trade over land and by sea. Cloth, spices and crafts moved between regions, and bankers, guilds and agents helped to organise this trade.',
    }),
    sl('diagram', 'Trade routes', {
      v: vRoutes,
      n: 'Two great overland routes carried trade. The Uttarapatha ran through the north and the Dakshinapatha towards the south. They joined links such as the Silk Route that reached lands far away. Ports on both coasts sent goods by sea.',
    }),
    sl('check', 'Quick check: the routes', {
      b: 'Choose the pair that correctly describes the two overland routes.',
      v: vRoutes,
      chk: 'm_routes',
      n: 'Think of the direction in each name. One route runs through the north and the other towards the south.',
    }),
    sl('concept', 'Indigenous banking', {
      v: vBank,
      n: 'Before modern banks, indigenous bankers such as shroffs and seths lent money, took deposits and moved money between towns. The hundi was a written order to pay a sum, much like a bill of exchange. The chitthi was a written note used to send credit. Traders could send money without carrying coins.',
    }),
    sl('concept', 'Guilds and intermediaries', {
      v: vGuild,
      n: 'Traders and artisans formed guilds called shrenis. They regulated trade and helped their members. As distances grew, commission agents, brokers and distributors became important, because they linked sellers to buyers and arranged credit and goods. Credit and trade networks spread across the land.',
    }),
    sl('check', 'Quick check: the hundi', {
      b: 'Decide whether the assertion and the reason about hundis are true.',
      v: vBank,
      chk: 'ar_hundi',
      n: 'Remember who wrote hundis. They were written by merchants and indigenous bankers. Check each statement separately before choosing.',
    }),
    sl('concept', 'Economic and non-economic activities', {
      v: vEcon,
      n: 'Human activities are of two kinds. Economic activities are done to earn a living. Non-economic activities are done out of love, sympathy, religion or patriotism, with no aim of earning. A person may do both: the same shopkeeper may run a shop for living and feed stray animals out of sympathy.',
    }),
    sl('concept', 'Business, profession and employment', {
      v: vThree,
      n: 'There are three kinds of economic activity. Business means producing or buying and selling goods and services to earn profit. A profession needs specialised knowledge and skill and is regulated by a professional body. Employment means working for others in return for a wage or salary.',
    }),
    sl('diagram', 'Comparing the three', {
      v: vCompare,
      n: 'Compare them on the same bases. Business is set up by an owner, earns profit, needs capital and bears high risk. A profession needs a set qualification, earns fees and bears some risk. Employment follows a contract, earns a wage or salary, needs no capital and carries little risk.',
    }),
    sl('example', 'Worked example 1: identify the activity', {
      b: 'Imagined people: decide whether each activity is business, profession, employment or non-economic.',
      v: vIdentify,
      n: 'Look at the reward. Asha keeps the surplus from her tailoring shop, so it is business. Dr. Rao charges fees and is registered with a council, so it is a profession. Imran draws a salary from a company, so it is employment. Joseph cooks as a religious offering with no earning, so it is non-economic.',
    }),
    sl('check', 'Quick check: match the reward', {
      b: 'Match each reward with business, profession or employment.',
      v: vCompare,
      chk: 'mt_compare',
      n: 'Say the three rewards aloud: profit, fees, and wages or salary. Then match each with the activity that earns it.',
    }),
    sl('concept', 'Characteristics of business', {
      v: vChars,
      n: 'Business has seven characteristics. It is an economic activity. It involves production or procurement of goods and services. It involves sale or exchange. Dealings are on a regular basis. Profit earning is the aim. The return is uncertain. And there is always an element of risk.',
    }),
    sl('example', 'Worked example 2: is it business?', {
      b: 'Test each imagined case against **regularity, profit motive and risk**.',
      v: vNotBus,
      n: 'Leela sold her old fridge once, so there is no regular dealing and it is not business. Mohan buys and sells vegetables every day for profit, so it is business. A student who teaches a neighbour free has no profit motive. Always test regularity, profit and risk.',
    }),
    sl('check', 'Quick check: a single sale', {
      b: 'Why is a one-time sale of a personal item not business?',
      v: vNotBus,
      chk: 'm_not_char',
      n: 'Which characteristic of business is missing when a person sells something only once?',
    }),
    sl('concept', 'Objectives of business', {
      v: vObj,
      n: 'A business has more than one objective. These are market standing, innovation, productivity, physical and financial resources, earning profits, manager performance and development, worker performance and attitude, and social responsibility. A good business balances all of them.',
    }),
    sl('diagram', 'Why profit is not enough', {
      v: vProfitFlow,
      n: 'Profit is necessary. It pays costs and rewards risk. But a firm also needs satisfied customers, trained workers, new ideas and good conduct towards society. A business that chases only profit may cheat and lose goodwill. So profit is necessary, but not the only objective.',
    }),
    sl('example', 'Worked example 3: name the objective', {
      b: 'Match each line from an imagined case to the objective it shows.',
      v: vObjEx,
      n: 'A new dissolving bottle is innovation. Wanting to be first in the state by sales is market standing. Fewer rejects per batch is productivity. Planting trees near a unit shows social responsibility. Ask yourself what the firm is trying to improve, and name the objective.',
    }),
    sl('check', 'Quick check: innovation', {
      b: 'Identify the objective in an imagined case of a new product and a faster process.',
      v: vObj,
      chk: 'm_innovation',
      n: 'New products and new methods point to one objective. Be careful not to confuse it with market standing.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up. Trade, banking and guilds are old in India. Economic activities are business, profession and employment. Business has seven characteristics and eight objectives. Profit is necessary but cannot be the only objective of a business.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['Compare the three activities on the **same bases**.', 'Name the **reward**: profit, fees or wages.', 'Give **one example** with each objective.'],
      v: vTips1,
      n: 'A few tips. When asked to distinguish, use the same bases for all three activities. In a case, look at the reward first. When writing objectives, add a short example to each; it shows you can apply the idea.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Nature and Purpose of Business: Part 2, Industry, Commerce and Risk',
  goals: [
    'Classify industries into primary, secondary and tertiary with examples',
    'Explain trade and the auxiliaries to trade',
    'Match each auxiliary with the hindrance it removes',
    'Explain business risk, its nature and its causes',
  ],
  slides: [
    sl('title', 'Industry, commerce and business risk', {
      b: 'Part 2: how business activities are **classified**, how goods reach buyers, and why risk is part of every business.',
      v: vRoute2,
      n: 'In this part we classify business activities into industry and commerce. We study the kinds of trade and the services that help it. Finally we look at business risk, why it arises and what causes it.',
    }),
    sl('concept', 'Industry and commerce', {
      b: 'Business activities divide into **industry** and **commerce**.',
      v: vIndComm,
      n: 'Industry covers the activities that make or provide goods. Commerce covers the activities that bring goods to buyers, that is trade and the services that help it. Together they make up the business activities of a country.',
    }),
    sl('diagram', 'Classification of business activities', {
      v: vTree,
      n: 'Here is the whole picture. Industry has primary, secondary and tertiary branches. Commerce has trade and the auxiliaries to trade. Trade is internal or external. Auxiliaries are transport, banking, insurance, warehousing and advertising. Keep this tree in mind for every question on classification.',
    }),
    sl('concept', 'Primary industries', {
      v: vPrimary,
      n: 'Primary industries use nature directly. Extractive industries take out what nature provides, such as mining, fishing and forestry. Genetic industries breed and multiply plants and animals, as in a nursery or a cattle breeding farm.',
    }),
    sl('concept', 'Secondary industries', {
      v: vManuf,
      n: 'Secondary industries turn materials into goods or build structures. Manufacturing has four kinds. Analytical separates one material, as an oil refinery does. Synthetical combines materials, as in cement. Processing passes material through stages, as in sugar and paper. Assembling fits ready parts, as in bicycles. Construction builds roads, bridges and dams.',
    }),
    sl('example', 'Worked example 1: classify the firm', {
      b: 'Decide the type of industry for each imagined firm.',
      v: vClassEx,
      n: 'A nursery raising saplings is genetic, so primary. A cement works combining limestone and clay is synthetical. A mill turning sugarcane into sugar in stages is processing. A builder putting up an office block is in construction. Ask whether the firm takes, makes, builds or serves.',
    }),
    sl('check', 'Quick check: match the industry', {
      b: 'Match each imagined activity with its type of industry.',
      v: vManuf,
      chk: 'mt_industry',
      n: 'Is the activity taking from nature, breeding, splitting a material, or fitting parts together? Decide, then match.',
    }),
    sl('concept', 'Commerce: trade and auxiliaries', {
      v: vComm,
      n: 'Commerce is trade together with the auxiliaries to trade. Trade is buying and selling. Auxiliaries are the services that remove hindrances, such as transport, banking and insurance. Commerce is therefore wider than trade alone.',
    }),
    sl('concept', 'Kinds of trade', {
      v: vTrade,
      n: 'Trade within a country is internal. A wholesaler buys in bulk and sells to retailers; a retailer sells in small lots to final consumers. Trade between countries is external. Import is buying from abroad. Export is selling abroad. Entrepot is importing goods in order to export them again.',
    }),
    sl('check', 'Quick check: entrepot', {
      b: 'Identify the trade of a firm that buys goods abroad and sells them to a third country.',
      v: vTrade,
      chk: 'm_entrepot',
      n: 'The firm never uses the goods at home. It brings them in and sends them out again. What is that trade called?',
    }),
    sl('diagram', 'Auxiliaries remove hindrances', {
      v: vAux,
      n: 'Each auxiliary clears one hindrance. Transport and communication remove the hindrance of place. Warehousing removes the hindrance of time. Banking and finance remove the hindrance of finance. Insurance removes the hindrance of risk. Advertising removes the hindrance of information.',
    }),
    sl('concept', 'Auxiliaries with examples', {
      v: vAuxTable,
      n: 'Trucks carry goods to a city and remove place. A cold room holds fruit until needed and removes time. A loan to buy stock removes finance. A policy against fire covers risk. A notice about a new product gives information. Link each service to its hindrance.',
    }),
    sl('check', 'Quick check: fill the blanks', {
      b: 'Complete the sentence on transport and insurance.',
      v: vAuxTable,
      chk: 'fb_aux',
      n: 'Say the five hindrances aloud: place, time, finance, risk and information. Which two belong to transport and insurance?',
    }),
    sl('example', 'Worked example 2: spot the auxiliary', {
      b: 'Name the auxiliary that meets each imagined need.',
      v: vSpotAux,
      n: 'A hardware store worried about flood loss needs insurance. A dairy sending milk to a distant town needs transport. A grain trader who needs money before harvest needs banking. A tea brand that wants shoppers to know it needs advertising. Always name the hindrance first.',
    }),
    sl('concept', 'What is business risk?', {
      v: vRiskNature,
      n: 'Business risk is the possibility of inadequate profit or of loss because of uncertainties or unexpected events. It arises from uncertainty. It is an essential part of every business. Its degree depends on the nature and size of the business. Profit is the reward for bearing risk.',
    }),
    sl('diagram', 'Causes of business risk', {
      v: vRiskWeb,
      n: 'Risk has four groups of causes. Natural causes include floods and earthquakes. Human causes include dishonest employees, strikes and poor management. Economic causes include changes in demand, competition, price changes and new technology. Other causes include political disturbances and changes in exchange rates.',
    }),
    sl('concept', 'Causes with examples', {
      v: vRiskCauses,
      n: 'Some causes can be foreseen and reduced, such as employee dishonesty through checks. Others, such as a flood, cannot be prevented, only guarded against by insurance. Learn each group with at least two examples, because questions often ask you to identify the group.',
    }),
    sl('check', 'Quick check: human causes', {
      b: 'Identify the group of causes in an imagined shop where a cashier takes cash and the staff go on strike.',
      v: vRiskCauses,
      chk: 'm_risk_human',
      n: 'Who is behind the loss: nature, the market, or people inside the firm? Decide the group of causes.',
    }),
    sl('example', 'Worked example 3: name the cause', {
      b: 'Name the group of cause in each imagined event.',
      v: vRiskEx,
      n: 'A cyclone damaging a godown is a natural cause. A strike halting production is a human cause. A rival cutting prices is an economic cause. A buying country restricting orders is among the other causes. Read the cause, not the loss.',
    }),
    sl('check', 'Quick check: match the cause', {
      b: 'Match each event with the group of cause.',
      v: vRiskCauses,
      chk: 'mt_risk',
      n: 'Natural, human, economic and other. Match each event with the group that fits best.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up. Industry is primary, secondary or tertiary. Commerce is trade plus auxiliaries to trade. Trade is internal or external. Each auxiliary removes one hindrance. Business risk comes from uncertainty and has natural, human, economic and other causes. Profit is the reward for bearing it.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['Learn the four **manufacturing kinds** with one example each.', 'Link each **auxiliary** to its hindrance.', 'In a case, **quote the line**, then name the cause or type.'],
      v: vTips2,
      n: 'Final tips. Learn the four kinds of manufacturing with an example each. Link each auxiliary to its hindrance. In cases, quote the line first, then name the type of industry, trade or cause. That routine earns full marks.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Nature and Purpose of Business: notes',
  sections: [
    {
      h: '1. Trade and commerce in old India',
      t: 1,
      b: 'Trade was old and wide. The cities of the Indus Valley traded with Mesopotamia, and later there was both overland and sea trade.\n\n- **Indigenous banking:** shroffs and seths gave credit, took deposits and transferred money. The **hundi** (a bill of exchange) and the **chitthi** were instruments.\n- **Routes:** the **Uttarapatha** (northern) and **Dakshinapatha** (southern), links with the Silk Route and ports on both coasts.\n- **Merchant guilds (shrenis)** of traders and artisans regulated trade and helped members.\n- **Intermediaries** such as commission agents, brokers and distributors, together with credit and trade networks, grew as distances widened.',
      terms: [['Hundi', 'A written order to pay a stated sum, working like a bill of exchange.'], ['Shreni', 'A merchant guild of traders and artisans that regulated trade and helped its members.'], ['Intermediary', 'A person such as an agent, broker or distributor who links producers and buyers.']],
      v: vBank,
      vs: [vRoutes, vGuild],
    },
    {
      h: '2. Economic and non-economic activities; business, profession, employment',
      t: 2,
      b: 'Activities done to earn a living are **economic**; those done out of love, sympathy, religion or patriotism are **non-economic**. Economic activities are of three kinds.',
      terms: [
        ['Business', 'An economic activity of producing or buying and selling goods and services regularly to earn profit.'],
        ['Profession', 'An occupation that needs specialised knowledge and skill and is regulated by a professional body, in return for fees.'],
        ['Employment', 'Work done for others in return for a wage or salary under a contract of service.'],
      ],
      v: vCompare,
      vs: [vEcon, vThree],
    },
    {
      h: '3. Characteristics of business',
      t: 2,
      b: 'Business is an economic activity involving production or procurement of goods and services, their sale or exchange, dealings on a regular basis, the aim of profit, uncertainty of return and an element of risk. A single sale of a personal item is not business.',
      terms: [['Profit', 'The surplus left when total revenue exceeds total costs; the reward for bearing risk.']],
      v: vChars,
      vs: [vNotBus],
    },
    {
      h: '4. Objectives of business',
      t: 2,
      b: 'A business has many objectives: **market standing, innovation, productivity, physical and financial resources, earning profits, manager performance and development, worker performance and attitude, and social responsibility.**\n\n**Profit is necessary but not the only objective.** It pays costs, rewards risk and funds growth, but a firm also needs customers, trained staff, new ideas and public goodwill to last. Aiming at profit alone can lead to unfair practices.',
      terms: [['Productivity', 'Output obtained from given resources; raising it means producing more with the same inputs.'], ['Social responsibility', 'The duty of a business to act for the benefit of society as well as itself.']],
      v: vObj,
      vs: [vProfitFlow, vObjEx],
    },
    {
      h: '5. Industry and commerce',
      t: 3,
      b: '**Industry** is of three kinds. **Primary:** extractive (mining, fishing, forestry) and genetic (cattle breeding, nurseries). **Secondary:** manufacturing, which is analytical (separating, as in a refinery), synthetical (combining, as in cement), processing (as in sugar, paper) or assembling (as in bicycles, computers); and construction. **Tertiary:** the service industries that act as auxiliaries to trade.\n\n**Commerce = trade + auxiliaries to trade.** Trade is internal (wholesale or retail) or external (import, export, entrepot).',
      terms: [['Industry', 'Activities concerned with producing or providing goods, by extraction, breeding, manufacturing or construction.'], ['Commerce', 'Trade together with the auxiliaries to trade.'], ['Trade', 'The buying and selling of goods and services.'], ['Auxiliaries to trade', 'Services such as transport, banking, insurance, warehousing and advertising that remove hindrances in trade.'], ['Entrepot trade', 'Importing goods in order to export them again.']],
      v: vTree,
      vs: [vPrimary, vManuf, vTrade],
    },
    {
      h: '6. Auxiliaries to trade and business risk',
      t: [3, 4],
      b: '**Auxiliaries:** transport and communication (place), warehousing (time), banking and finance (finance), insurance (risk), advertising (information).\n\n**Business risk** is the possibility of inadequate profit or loss due to uncertainties or unexpected events. It arises from uncertainty, is an essential part of every business, varies with its nature and size, and profit is its reward. **Causes:** natural (floods, earthquakes), human (dishonest employees, strikes, inefficient management), economic (changes in demand, competition, price changes, technology), and other (political disturbances, exchange-rate changes).',
      terms: [['Business risk', 'The possibility of inadequate profit or of loss due to uncertainties or unexpected events.']],
      v: vAux,
      vs: [vRiskWeb, vRiskCauses],
    },
  ],
  tips: '**Common mistakes**\n- Writing profit for a profession or fees for a business: the rewards are profit, fees and wages.\n- Mixing up analytical (separating) and synthetical (combining) manufacturing.\n- Calling insurance the remover of the hindrance of finance; it removes risk.\n- Treating a loss as a cause; name the cause (natural, human, economic or other), not the loss.\n\n**How marks are usually awarded**\n- 1 mark: one correct option or one quoted line.\n- 2 or 3 marks: one point per mark, each with a short example.\n- 5 marks: five labelled points; for distinctions, one basis per mark.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['**Hundi**', 'A written order to pay a stated sum, like a bill of exchange, used in indigenous banking.', 'definition', 1],
  ['**Shroff or seth**', 'An indigenous banker who lent money, took deposits and moved money between towns.', 'definition', 1],
  ['**Uttarapatha** and **Dakshinapatha**', 'The northern and southern overland trade routes of ancient India.', 'fact', 1],
  ['**Shreni**', 'A merchant guild of traders and artisans that regulated trade and helped members.', 'definition', 1],
  ['Why did **intermediaries** rise?', 'Longer distances and wider markets needed agents, brokers and distributors to link sellers and buyers and to arrange credit.', 'concept', 1],
  ['**Economic activity**', 'An activity done to earn a living.', 'definition', 2],
  ['**Non-economic activity**', 'An activity done out of love, sympathy, religion or patriotism.', 'definition', 2],
  ['**Business**', 'Producing or buying and selling goods and services regularly for profit.', 'definition', 2],
  ['**Profession**', 'Specialised knowledge and skill, regulated by a professional body; earns fees.', 'definition', 2],
  ['**Employment**', 'Work for others for a wage or salary.', 'definition', 2],
  ['Reward in business, profession, employment', 'Profit, fees, wages or salary.', 'fact', 2],
  ['Seven **characteristics** of business', 'Economic activity; production or procurement; sale or exchange; regular dealings; profit earning; uncertainty of return; element of risk.', 'fact', 2],
  ['Why is a one-off sale not business?', 'Business needs dealings on a regular basis.', 'exam-tip', 2],
  ['Eight **objectives** of business', 'Market standing, innovation, productivity, physical and financial resources, profits, manager development, worker performance, social responsibility.', 'fact', 2],
  ['Is profit the only objective?', 'No: it is necessary for survival and growth, but customers, staff, ideas and society also matter.', 'exam-tip', 2],
  ['**Extractive industry**', 'Takes out products provided by nature, such as mining, fishing and forestry.', 'definition', 3],
  ['**Genetic industry**', 'Breeds and multiplies plants and animals, such as nurseries and cattle breeding.', 'definition', 3],
  ['Four kinds of **manufacturing**', 'Analytical, synthetical, processing, assembling.', 'fact', 3],
  ['**Analytical** manufacturing', 'Separates one material into several products; an oil refinery.', 'concept', 3],
  ['**Synthetical** manufacturing', 'Combines materials into one product; cement.', 'concept', 3],
  ['**Construction**', 'A secondary industry that builds roads, bridges, dams and buildings.', 'concept', 3],
  ['**Commerce**', 'Trade plus auxiliaries to trade.', 'definition', 3],
  ['**Wholesaler** and **retailer**', 'A wholesaler sells in bulk to traders; a retailer sells in small lots to consumers.', 'concept', 3],
  ['**Entrepot trade**', 'Importing goods in order to export them again.', 'definition', 3],
  ['Hindrances removed by the five **auxiliaries**', 'Transport: place; warehousing: time; banking: finance; insurance: risk; advertising: information.', 'fact', 3],
  ['**Business risk**', 'The possibility of inadequate profit or loss from uncertain or unexpected events.', 'definition', 4],
  ['Nature of business risk', 'Arises from uncertainty; essential part of business; degree varies; profit is the reward.', 'concept', 4],
  ['Four groups of **causes of risk**', 'Natural, human, economic, other.', 'fact', 4],
  ['Examples of each group', 'Floods; strikes; competition; exchange-rate changes.', 'example', 4],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-11-default-chapter-test-short',
  title: 'Chapter test (short): Nature and Purpose of Business',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A: Objective (1 mark each)', instr: 'Questions 1 to 4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_profession_doc', 'm_synthetical', 'm_risk_natural', 'ar_profit'] },
    { id: 'B', title: 'Section B: Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30 to 50 words and the 3-mark question in about 50 to 80 words.', items: ['s_shreni', 's_econ_noneco', 's3_manuf'] },
    { id: 'C', title: 'Section C: Long answer (5 marks)', instr: 'Answer any ONE of the two questions in about 100 words.', items: [{ attempt: 1, keys: ['l_chars', 'l_risk'] }] },
    { id: 'D', title: 'Section D: Case-based (4 marks)', instr: 'Read the case and answer all parts. Part (c) has an internal choice.', items: ['cb_machhuwadi'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-11-default-chapter-test-long',
  title: 'Chapter test (long): Nature and Purpose of Business',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A: Objective (1 mark each)', instr: 'Questions 1 to 10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_shroff', 'm_noneco', 'm_transfer', 'm_uncertain', 'm_wholesaler', 'm_aux_info', 'm_productivity', 'm_risk_econ', 'ar_aux', 'ar_risk'] },
    { id: 'B', title: 'Section B: Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30 to 50 words and 3-mark questions in about 50 to 80 words. Questions 13 and 15 have an internal choice.', items: ['s_indig', 's_two_obj', { attempt: 1, keys: ['s_wh_ret', 's_risk_meaning'] }, 's3_profit', { attempt: 1, keys: ['s3_intermed', 's3_risk_nature'] }] },
    { id: 'C', title: 'Section C: Long answer (5 marks)', instr: 'Answer question 16, and any ONE of questions 17 and 18, in about 100 words each.', items: ['l_compare', { attempt: 1, keys: ['l_objectives', 'l_aux'] }] },
    { id: 'D', title: 'Section D: Case-based (4 marks each)', instr: 'Read each case and answer all parts. Part (c) of each has an internal choice.', items: ['cb_three_people', 'cb_ramesh_risk'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01 to t04 of cbse-11-business-studies-ch01 only (history of trade and commerce in India; concept, characteristics and objectives of business; industry and commerce; business risk)',
    originality: 'every firm, person and case is imagined and written by SOYL; no NCERT text, example or exercise and no board or sample-paper item reused (D-036)',
    facts: 'definitions and classifications as in the README reviewer list; no time-sensitive figures or legal limits are used',
    gate: 'schema, pipeline lint, deterministic verify, word limits, narration and answer-leak checks run clean in this build',
  },
});
