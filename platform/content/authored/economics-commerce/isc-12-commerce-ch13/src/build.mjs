// Build ISC 12 Commerce ch13 Marketing: Concept and Functions. Run from platform/:
//   npx tsx content/authored/economics-commerce/isc-12-commerce-ch13/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from './lib.mjs';

setUnit('isc-12-commerce-ch13', 'economics-commerce');
await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- visuals
const vRoute1 = flow('LR', ['What a market is', 'Types of market', 'What marketing is', 'Concepts of marketing'], 'Route map of Part 1: the meaning of market, types of market, the meaning and features of marketing, and the traditional and modern concepts of marketing', 'Part 1 at a glance');
const vRoute2 = flow('LR', ['Objectives', 'Importance', 'Functions of exchange', 'Physical supply and facilitating functions'], 'Route map of Part 2: objectives and importance of marketing, then the functions of marketing grouped as exchange, physical supply and facilitating functions', 'Part 2 at a glance');

const vMarketTree = (() => {
  const s = new Svg(560, 330);
  s.rect(210, 14, 140, 40, { fill: 'accent', fillOpacity: 0.15, color: 'accent', sw: 1.6, rx: 8 });
  s.text(280, 34, 'Markets', { size: 15, bold: true });
  const cols = [
    ['By area', 95, ['Local', 'Regional', 'National', 'International'], 'blue'],
    ['By time', 280, ['Very short period', 'Short period', 'Long period'], 'green'],
    ['By nature of goods', 465, ['Produce', 'Manufactured goods', 'Bullion', 'Stock'], 'yellow'],
  ];
  for (const [head, x, items, col] of cols) {
    s.line(280, 54, x, 92, { sw: 1.4, color: 'muted' });
    s.rect(x - 82, 92, 164, 36, { fill: col, fillOpacity: 0.16, color: col, sw: 1.4, rx: 8 });
    s.text(x, 110, head, { size: 13, bold: true });
    items.forEach((it, i) => {
      s.line(x, 128 + i * 44, x, 146 + i * 44, { sw: 1.2, color: 'muted' });
      s.rect(x - 74, 146 + i * 44, 148, 28, { fill: col, fillOpacity: 0.07, color: col, sw: 1, rx: 6 });
      s.text(x, 160 + i * 44, it, { size: 12 });
    });
  }
  return s.visual('Tree diagram: markets classified three ways. By area: local, regional, national, international. By time: very short period, short period, long period. By nature of goods: produce, manufactured goods, bullion, stock', 'Three ways of classifying markets.');
})();
const vMarketEx = table(
  ['Imagined situation', 'Basis', 'Type'],
  [
    ['Garlands bought only by nearby shops', 'Area', 'Local'],
    ['Glass bangles sold in Africa and Europe', 'Area', 'International'],
    ['A morning fish catch sold within hours', 'Time', 'Very short period'],
    ['Ginning units built up over years', 'Time', 'Long period'],
    ['Dealers trading gold and silver', 'Nature of goods', 'Bullion'],
  ],
  'Worked table classifying five imagined situations by basis (area, time or nature of goods) and type of market',
  'First decide the basis, then the type.',
);
const vTime = table(
  ['Market by time', 'Can supply change?', 'Example'],
  [
    ['Very short period', 'No: supply is fixed', 'Fresh fish, flowers'],
    ['Short period', 'Partly, with existing plants', 'Extra bakery shifts before a festival'],
    ['Long period', 'Fully, even with new plants', 'New ginning units over years'],
  ],
  'Table of markets by time: very short, short and long period, whether supply can change in each, with examples',
);
const vFeatures = table(
  ['Feature of marketing', 'Meaning'],
  [
    ['Needs and wants', 'It starts by finding what people need'],
    ['Market offering', 'A product or service designed to meet those needs'],
    ['Customer value', 'Buyers feel the benefit is worth the price'],
    ['Exchange mechanism', 'Goods or services change hands for money'],
    ['Customer orientation', 'Every activity is built around the buyer'],
    ['Goods and services', 'It applies to both, and to non-business bodies'],
  ],
  'Table of six features of marketing with their meanings',
);
const vConceptFlow = flow('LR', ['Production', 'Product', 'Selling', 'Marketing', 'Societal marketing'], 'Five concepts of marketing in the order they developed: production, product, selling, marketing and societal marketing', 'Traditional concepts on the left, modern on the right.');
const vConcepts = table(
  ['Concept', 'Starts from', 'Main focus', 'Profit through'],
  [
    ['Production', 'Factory', 'Low cost, wide availability', 'Sales volume'],
    ['Product', 'Factory', 'Product quality and features', 'Sales volume'],
    ['Selling', 'Factory', 'Aggressive selling and promotion', 'Sales volume'],
    ['Marketing', 'Market', 'Customer needs', 'Customer satisfaction'],
    ['Societal marketing', 'Market and society', 'Customer needs and social welfare', 'Satisfaction and social welfare'],
  ],
  'Table comparing five concepts of marketing by starting point, main focus and route to profit',
);
const vConceptEx = table(
  ['Imagined firm', 'What it does', 'Concept'],
  [
    ['Cement-sheet maker', 'Cuts cost through huge output; stocks every shop', 'Production'],
    ['Tile maker', 'Perfects a tile nobody now wants', 'Product'],
    ['Furniture store', 'Pushes visitors with today-only offers', 'Selling'],
    ['Bakery', 'Asks customers first, bakes to match', 'Marketing'],
    ['Coconut-oil maker', 'Refillable cans; protects mangroves', 'Societal marketing'],
  ],
  'Worked table: five imagined firms, what each does and the concept of marketing each follows',
  'Ask: where does the firm start, and what does it care about most?',
);
const vSpan = (() => {
  const s = new Svg(560, 230);
  const steps = ['Find needs', 'Design product', 'Fix price', 'Distribute', 'Promote', 'Sell', 'After-sales'];
  const w = 72, gap = 4, x0 = 18;
  steps.forEach((t, i) => {
    const x = x0 + i * (w + gap);
    const sell = t === 'Sell';
    s.rect(x, 90, w, 44, { fill: sell ? 'accent' : 'blue', fillOpacity: sell ? 0.25 : 0.12, color: sell ? 'accent' : 'blue', sw: 1.3, rx: 6 });
    const parts = t.split(' ');
    if (parts.length === 2) { s.text(x + w / 2, 105, parts[0], { size: 11 }); s.text(x + w / 2, 121, parts[1], { size: 11 }); } else s.text(x + w / 2, 112, t, { size: 11 });
  });
  const xEnd = x0 + 7 * (w + gap) - gap;
  s.line(x0, 70, xEnd, 70, { sw: 1.6, color: 'blue' });
  s.line(x0, 64, x0, 76, { sw: 1.6, color: 'blue' });
  s.line(xEnd, 64, xEnd, 76, { sw: 1.6, color: 'blue' });
  s.text((x0 + xEnd) / 2, 50, 'Marketing: from needs to after-sales service', { size: 13, bold: true, color: 'blue' });
  const xs = x0 + 5 * (w + gap);
  s.line(xs, 154, xs + w, 154, { sw: 1.6, color: 'accent' });
  s.line(xs, 148, xs, 160, { sw: 1.6, color: 'accent' });
  s.line(xs + w, 148, xs + w, 160, { sw: 1.6, color: 'accent' });
  s.text(xs + w / 2, 178, 'Selling', { size: 13, bold: true, color: 'accent' });
  s.text(xs + w / 2, 196, 'one part', { size: 11, muted: true });
  return s.visual('Seven boxes in a row: find needs, design product, fix price, distribute, promote, sell, after-sales. A bracket over all seven is labelled marketing, from needs to after-sales service; a short bracket under the sell box alone is labelled selling, one part', 'Marketing spans the whole chain; selling is one link in it.');
})();
const vMvS = table(
  ['Basis', 'Selling', 'Marketing'],
  [
    ['Scope', 'Transfer of ownership only', 'Research, design, price, distribution, promotion, sale, service'],
    ['Focus', 'Seller\'s need to clear stock', 'Buyer\'s needs'],
    ['Begins and ends', 'After production; ends with the sale', 'Before production; continues after the sale'],
    ['Profit through', 'Sales volume', 'Customer satisfaction'],
  ],
  'Table distinguishing selling from marketing on scope, focus, when it begins and ends, and the route to profit',
);
const vObjectives = table(
  ['Objective', 'Imagined example'],
  [
    ['Creating demand', 'Cooking demos for a new fox-nut snack'],
    ['Customer satisfaction', 'Free replacement of a spoiled mango box'],
    ['Increasing market share', 'Aiming to double share of bangle sales'],
    ['Profitable sales volume', 'Selling more at a fair margin'],
    ['Goodwill and image', 'A name that importers trust'],
  ],
  'Table of five objectives of marketing with an imagined example of each',
);
const vImportance = table(
  ['Marketing helps…', 'How'],
  [
    ['The firm', 'More sales and profit; information for decisions; new products'],
    ['Consumers', 'Wider choice, better quality, information, value for money'],
    ['Society', 'Jobs, economic growth, goods reaching every region, higher living standards'],
  ],
  'Table of the importance of marketing to the firm, to consumers and to society',
);
const vImpEx = table(
  ['Effect of marketing fox-nut snacks (imagined)', 'Who gains'],
  [
    ['Sales spread to new cities; profit rises', 'The firm'],
    ['City buyers get a healthy new snack', 'Consumers'],
    ['Pond workers, roasters and drivers find work', 'Society'],
  ],
  'Worked table: three effects of marketing an imagined fox-nut snack and who gains from each',
  'Sort each effect by who gains: the firm, consumers or society.',
);
const vChain = flow('LR', ['Research', 'Buying and assembling', 'Standardisation and grading', 'Storage', 'Transport', 'Selling'], 'Marketing functions in the order goods usually meet them: research, buying and assembling, standardisation and grading, storage, transport and selling', 'Financing and risk bearing support every link.');
const vFunctions = table(
  ['Group', 'Functions', 'Purpose'],
  [
    ['Exchange', 'Buying, assembling, selling', 'Transfer ownership'],
    ['Physical supply', 'Transport, storage', 'Place and time utility'],
    ['Facilitating', 'Standardisation, grading, financing, risk bearing, market research', 'Help the others run smoothly'],
  ],
  'Table grouping marketing functions into exchange, physical supply and facilitating functions, with the purpose of each group',
);
const vStdGrade = table(
  ['', 'Standardisation', 'Grading'],
  [
    ['When', 'Before or during production', 'After production or harvest'],
    ['What', 'Fixes specifications all units must meet', 'Sorts units into classes'],
    ['Imagined example', 'Size and knot count for each carpet design', 'Litchis into export and juice classes'],
  ],
  'Table contrasting standardisation and grading by timing, what each does and an imagined example',
);
const vFnEx = table(
  ['What the imagined ginger group does', 'Function'],
  [
    ['Buys ginger from many small farmers', 'Buying and assembling'],
    ['Sorts it into three sizes', 'Grading'],
    ['Keeps it in a dry godown', 'Storage'],
    ['Traders carry it to Guwahati', 'Transport'],
    ['Insures stock against fire', 'Risk bearing'],
  ],
  'Worked table: five activities of an imagined ginger growers\' group, each matched with a marketing function',
  'Look for the verb: buys, sorts, keeps, carries, insures.',
);
const vSummary1 = table(
  ['Idea', 'Key point'],
  [
    ['Market', 'Actual and potential buyers of a product'],
    ['Types', 'By area, by time, by nature of goods'],
    ['Marketing', 'Finding and satisfying needs through exchange, at a profit'],
    ['Concepts', 'Production, product, selling (traditional); marketing, societal (modern)'],
  ],
  'Summary table of Part 1: market, types of market, marketing and its concepts',
);
const vSummary2 = table(
  ['Idea', 'Key point'],
  [
    ['Objectives', 'Demand, satisfaction, market share, profitable sales, goodwill'],
    ['Importance', 'To the firm, consumers and society'],
    ['Exchange and supply', 'Buying, assembling, selling; transport, storage'],
    ['Facilitating', 'Standardisation, grading, financing, risk bearing, research'],
  ],
  'Summary table of Part 2: objectives, importance and the three groups of marketing functions',
);
const vCaseSteps = flow('LR', ['Quote the clue', 'Name the type, concept or function', 'Explain it'], 'Three steps for case questions: quote the clue, name the type, concept or function, and explain it');

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Marketing — Part 1: Market, Marketing and its Concepts',
  goals: [
    'Classify markets by area, time and nature of goods',
    'Explain the meaning and features of marketing',
    'Contrast the traditional and modern concepts of marketing and distinguish marketing from selling',
  ],
  slides: [
    sl('title', 'Marketing: Concept and Functions', {
      b: 'Part 1: what a **market** is, its **types**, what **marketing** means, and how the **concepts** of marketing changed.',
      v: vRoute1,
      n: 'Every firm must find buyers for what it offers. In this part we ask what a market really is and how markets are classified. Then we see what marketing means, and how firms moved from simply making and pushing goods to starting with the customer, and then with society too.',
    }),
    sl('concept', 'What is a market?', {
      b: 'In marketing, a **market** is the set of **actual and potential buyers** of a product. It need not be a place.',
      v: table(['Old meaning', 'Marketing meaning'], [['A place where buyers and sellers meet', 'All the people who buy, or may buy, a product'], ['A weekly bazaar', 'Buyers reached in shops, by phone and online']], 'Table contrasting the old meaning of market as a place with the marketing meaning as actual and potential buyers'),
      n: 'In everyday speech, a market is a place, like a weekly bazaar. In marketing, it means people: everyone who buys a product, and everyone who might. A perfume house selling online to buyers abroad has a market even though no buyer ever visits its shop.',
    }),
    sl('diagram', 'Types of market', {
      v: vMarketTree,
      n: 'Markets are classified in three ways. By area, they may be local, regional, national or international. By time, they may be very short period, short period or long period. By the nature of goods, there are produce markets, manufactured goods markets, bullion markets for gold and silver, and stock markets for shares.',
    }),
    sl('concept', 'Markets by time', {
      v: vTime,
      n: 'Time is about how far supply can change. In a very short period market, supply is fixed, as with a morning fish catch. In a short period, firms can change supply partly with their existing plant. In a long period, there is time to build new plants and change supply fully.',
    }),
    sl('example', 'Worked example 1: classify the market', {
      b: 'Five imagined situations.',
      bl: ['Step 1: decide the **basis**: area, time or nature of goods.', 'Step 2: name the **type**.', 'Step 3: give the clue in one line.'],
      v: vMarketEx,
      n: 'Garlands bought only nearby are a local market by area. Bangles sold in Africa and Europe are international. A fish catch sold within hours is a very short period market by time. Ginning units built over years point to the long period. Dealers in gold and silver form a bullion market.',
    }),
    sl('check', 'Quick check: is a market a place?', {
      b: 'True or false: in marketing, a market always means a fixed place where buyers and sellers meet.',
      chk: 'tf_market',
      n: 'Think of a firm that sells only online.',
    }),
    sl('concept', 'Marketing and its features', {
      b: '**Marketing** is the process of identifying customer needs and satisfying them through the **exchange** of goods and services, **at a profit**.',
      v: vFeatures,
      n: 'Marketing begins with people\'s needs and wants. The firm designs an offering to meet them and tries to give buyers good value. Goods or services are then exchanged for money. Everything is built around the customer, and marketing applies to services and non-business bodies as much as to goods.',
    }),
    sl('check', 'Quick check: market by area', {
      b: 'Garlands that wilt in a day are bought only by shops a few kilometres away. What kind of market is this?',
      chk: 'm_market_area_local',
      n: 'How far can such goods travel?',
    }),
    sl('concept', 'Concepts of marketing', {
      v: vConceptFlow,
      n: 'The thinking behind marketing has changed over time. The traditional concepts, production, product and selling, start from the factory. The modern concepts, marketing and societal marketing, start from the customer, and the last adds the welfare of society.',
    }),
    sl('concept', 'Comparing the concepts', {
      v: vConcepts,
      n: 'The production concept stresses low cost and wide availability. The product concept stresses quality. The selling concept stresses hard selling. All three seek profit through sales volume. The marketing concept seeks profit through customer satisfaction, and the societal concept adds the long term welfare of society.',
    }),
    sl('example', 'Worked example 2: name the concept', {
      b: 'Five imagined firms, five ways of thinking.',
      bl: ['Step 1: ask where the firm **starts**: factory or customer.', 'Step 2: ask what it cares about **most**.', 'Step 3: name the concept.'],
      v: vConceptEx,
      n: 'A cement-sheet maker cutting cost through huge output follows the production concept. A tile maker perfecting a tile nobody wants follows the product concept. A store pushing today-only offers follows the selling concept. A bakery that asks customers first follows the marketing concept. An oil maker that protects mangroves follows the societal concept.',
    }),
    sl('check', 'Quick check: which concept?', {
      b: 'A firm keeps costs low through huge output and stocks every shop, sure its goods will sell. Which concept?',
      chk: 'm_production_concept',
      n: 'Think about cost and availability.',
    }),
    sl('diagram', 'Marketing versus selling', {
      v: vSpan,
      n: 'Selling and marketing are not the same. Marketing runs from finding needs, through design, pricing, distribution and promotion, to the sale and after-sales service. Selling is only the link where ownership changes hands. Marketing begins before production and continues after the sale.',
    }),
    sl('two-column', 'Differences at a glance', {
      cols: ['**Selling**\n\nSeller-centred; transfers ownership; ends with the sale.', '**Marketing**\n\nBuyer-centred; covers the whole chain; continues after the sale.'],
      v: vMvS,
      n: 'In short, selling looks at the seller\'s need to turn stock into cash, and it ends with the sale. Marketing looks at the buyer\'s needs, starts before the product is made, and continues after the sale, earning profit through satisfaction.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up Part 1. A market is the actual and potential buyers of a product, classified by area, time and nature of goods. Marketing identifies and satisfies needs through exchange, at a profit. The production, product and selling concepts are traditional; the marketing and societal marketing concepts are modern. Marketing is wider than selling.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['Define a market as **buyers**, not a place.', 'For market types, state the **basis** before the type.', 'For concepts, ask where the firm **starts** and what it **focuses** on.', 'Show marketing as **wider** than selling, with bases.'],
      v: vCaseSteps,
      n: 'Some tips. Define a market as people, not a place. When classifying, say whether it is by area, time or nature of goods. To identify a concept, ask where the firm starts and what it cares about most. And when comparing marketing with selling, give clear bases.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Marketing — Part 2: Objectives, Importance and Functions',
  goals: [
    'Explain the objectives of marketing and its importance to firms, consumers and society',
    'Describe the functions of marketing, such as market research, buying, assembling, standardisation, grading, storage, transport, financing, risk bearing and selling',
  ],
  slides: [
    sl('title', 'Objectives, Importance and Functions', {
      b: 'Part 2: what marketing **aims** at, why it **matters**, and the **functions** it performs.',
      v: vRoute2,
      n: 'In Part 2 we look at what marketing tries to achieve and why it matters to firms, consumers and society. Then we follow goods from the producer to the buyer and name each function marketing performs on the way.',
    }),
    sl('concept', 'Objectives of marketing', {
      v: vObjectives,
      n: 'Marketing aims to create demand, so that people want the product. It aims to satisfy customers, so that they come back. It tries to raise the firm\'s share of the market and to earn profit on a growing volume of sales. And it builds goodwill, a name that buyers trust.',
    }),
    sl('concept', 'Importance of marketing', {
      v: vImportance,
      n: 'Marketing matters to three groups. For the firm, it brings sales, profit and information for decisions. For consumers, it brings choice, quality and value. For society, it creates jobs, spreads goods to every region and supports economic growth and better living standards.',
    }),
    sl('example', 'Worked example 1: who gains?', {
      b: 'An imagined firm markets fox-nut snacks from Mithila across India.',
      bl: ['Step 1: list the **effects**.', 'Step 2: decide **who gains**: firm, consumers or society.', 'Step 3: name the point of importance.'],
      v: vImpEx,
      n: 'When the imagined firm spreads its snacks to new cities, its sales and profit rise, which is importance to the firm. City buyers get a healthy new snack, which is importance to consumers. Pond workers, roasters and drivers find work, which is importance to society.',
    }),
    sl('check', 'Quick check: who benefits?', {
      b: 'True or false: marketing benefits only the firm, not consumers or society.',
      chk: 'tf_obj',
      n: 'Think of the shopper and the truck driver.',
    }),
    sl('diagram', 'Following the goods', {
      v: vChain,
      n: 'Follow goods from the producer. First, research shows what buyers want. Goods are bought and assembled from many producers. They are standardised and graded. They are stored until wanted and transported to where buyers are. Finally they are sold. Financing and risk bearing support every step.',
    }),
    sl('concept', 'Three groups of functions', {
      v: vFunctions,
      n: 'The functions fall into three groups. Functions of exchange, buying, assembling and selling, transfer ownership. Functions of physical supply, transport and storage, create place and time utility. Facilitating functions, such as standardisation, grading, financing, risk bearing and market research, help the others run smoothly.',
    }),
    sl('two-column', 'Standardisation and grading', {
      cols: ['**Standardisation**\n\nSets specifications in advance that every unit must meet.', '**Grading**\n\nSorts finished goods or produce into classes of similar quality.'],
      v: vStdGrade,
      n: 'These two are often confused. Standardisation sets specifications in advance, like the size and knot count of each carpet design. Grading sorts goods into classes afterwards, like putting litchis into export and juice classes. Both help buyers trust what they are getting.',
    }),
    sl('check', 'Quick check: sorting produce', {
      b: 'Fill in the blank: sorting farm produce into classes of similar size and quality after harvest is called ___.',
      chk: 'fb_fn',
      n: 'One word, a facilitating function.',
    }),
    sl('concept', 'Storage, transport, financing and risk', {
      bl: ['**Storage:** holds goods until wanted, creating **time utility**.', '**Transport:** moves goods to buyers, creating **place utility**.', '**Financing:** funds for buying, holding and credit to buyers.', '**Risk bearing:** covering losses from damage, delay or price falls.'],
      v: table(['Function', 'Utility or purpose'], [['Storage', 'Time utility'], ['Transport', 'Place utility'], ['Financing', 'Funds for every stage'], ['Risk bearing', 'Protection against loss']], 'Table of storage, transport, financing and risk bearing with the utility or purpose of each'),
      n: 'Storage keeps goods until people want them, giving time utility. Transport carries them to where buyers are, giving place utility. Financing provides money at every stage, including credit to buyers. Risk bearing covers losses from damage, delay or a fall in prices, often through insurance.',
    }),
    sl('example', 'Worked example 2: functions in a case', {
      b: 'An imagined ginger growers\' group in the Garo Hills.',
      bl: ['Step 1: underline each **activity**.', 'Step 2: name the **function**.', 'Step 3: explain how it helps.'],
      v: vFnEx,
      n: 'Look for the verbs. Buying from many small farmers is buying and assembling. Sorting into three sizes is grading. Keeping ginger in a dry godown is storage. Traders carrying it to Guwahati is transport. Insuring the stock against fire is risk bearing.',
    }),
    sl('check', 'Quick check: which utility?', {
      b: 'Trucks carry bananas from Jalgaon to Delhi within two days. What does this function mainly create?',
      chk: 'm_fn_transport',
      n: 'Is the value added by time, or by place?',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up Part 2. Marketing aims at demand, satisfaction, market share, profitable sales and goodwill. It matters to firms, consumers and society. Its functions are exchange functions, physical supply functions and facilitating functions such as standardisation, grading, financing, risk bearing and research.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['For importance, cover **firm, consumers and society**.', 'Keep **standardisation** (before) and **grading** (after) apart.', 'Link storage to **time** utility and transport to **place** utility.', 'In cases, find the **verb** and name the function.'],
      v: vCaseSteps,
      n: 'Final tips. In importance answers, cover the firm, consumers and society. Remember that standardisation comes before and grading after. Tie storage to time utility and transport to place utility. In case questions, find the action word and name the function it shows.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Marketing: Concept and Functions — notes',
  sections: [
    {
      h: '1. Market: meaning and types',
      t: 1,
      b: 'In marketing, a **market** means the **actual and potential buyers** of a product, not just a place.\n\n**By area:** local; regional; national; international (global).\n\n**By time:** **very short period** (supply fixed, e.g. perishables); **short period** (supply can change partly with existing plant); **long period** (supply can change fully, including new plant). Some books add a secular or very long period.\n\n**By nature of goods:** produce (commodity) markets for farm goods; manufactured goods markets (consumer and industrial goods); bullion markets for gold and silver; stock markets for securities.',
      terms: [['Market', 'Actual and potential buyers of a product.'], ['Very short period market', 'A market in which supply is fixed and cannot be changed.'], ['Bullion market', 'A market for gold and silver.']],
      v: vMarketTree,
      vs: [vTime, vMarketEx],
    },
    {
      h: '2. Marketing: meaning and features',
      t: 1,
      b: '**Marketing** is the social and managerial process of finding out what customers need and want, and satisfying those needs through the creation and **exchange** of goods and services, so that the firm earns a **profit**.\n\n**Features:** needs and wants; creating a market offering; customer value; exchange mechanism; customer orientation; it is continuous; it applies to goods, services and non-business bodies alike.',
      terms: [['Marketing', 'Identifying and satisfying customer needs through exchange, at a profit.'], ['Market offering', 'The product or service, with its price and service, offered to meet a need.']],
      v: vFeatures,
    },
    {
      h: '3. Traditional and modern concepts; marketing versus selling',
      t: 2,
      b: '**Traditional concepts** (start from the factory; profit through sales volume):\n- **Production concept** — buyers want cheap, widely available goods; focus on mass output.\n- **Product concept** — buyers want the best quality; focus on perfecting the product (can ignore changing needs).\n- **Selling concept** — buyers will not buy enough unless persuaded; focus on aggressive selling.\n\n**Modern concepts** (start from the market):\n- **Marketing concept** — find needs first, satisfy them better than rivals; profit through satisfaction.\n- **Societal marketing concept** — satisfy customers while protecting the long-term welfare of society and the environment.\n\n**Marketing vs selling:** selling is one part of marketing; it transfers ownership, focuses on the seller\'s need and ends with the sale. Marketing focuses on the buyer, begins before production and continues after the sale.',
      terms: [['Selling concept', 'The view that goods must be pushed through aggressive selling.'], ['Societal marketing concept', 'Customer satisfaction plus the long-term welfare of society.']],
      v: vConcepts,
      vs: [vConceptFlow, vSpan, vMvS],
    },
    {
      h: '4. Objectives and importance of marketing',
      t: 3,
      b: '**Objectives:** creating demand; customer satisfaction; increasing market share; profitable sales volume; building goodwill and image.\n\n**Importance to firms:** higher sales and profit; information for decisions; development of new products.\n\n**Importance to consumers:** wider choice; better quality; information; value for money; higher standard of living.\n\n**Importance to society:** employment in transport, storage, retailing and advertising; economic growth; goods reaching every region; a link between production and consumption.',
      terms: [['Market share', 'A firm\'s sales as a part of the total sales of the industry.'], ['Goodwill', 'The trust and reputation a firm builds with buyers.']],
      v: vImportance,
      vs: [vObjectives, vImpEx],
    },
    {
      h: '5. Functions of marketing',
      t: 4,
      b: '**Functions of exchange:**\n- **Buying** — acquiring goods of the right kind, quality and quantity for resale or use.\n- **Assembling** — gathering goods from scattered producers into one place.\n- **Selling** — transferring ownership to the buyer.\n\n**Functions of physical supply:**\n- **Transport** — moving goods to buyers (place utility).\n- **Storage / warehousing** — holding goods until they are wanted (time utility).\n\n**Facilitating functions:**\n- **Standardisation** — setting specifications in advance.\n- **Grading** — sorting goods into classes after production or harvest.\n- **Financing** — providing funds and credit for marketing activities.\n- **Risk bearing** — covering losses from damage, delay, theft or price changes.\n- **Market research / information** — collecting and analysing data on buyers, demand and rivals.',
      terms: [['Assembling', 'Bringing goods from many producers to one place.'], ['Standardisation', 'Fixing specifications that every unit must meet.'], ['Grading', 'Sorting goods into classes of similar quality.'], ['Time utility', 'Value added by having goods available when wanted.'], ['Place utility', 'Value added by having goods where buyers are.']],
      v: vFunctions,
      vs: [vChain, vStdGrade, vFnEx],
    },
  ],
  tips: '**Common mistakes**\n- Defining a market as a place.\n- Confusing the product concept (quality) with the marketing concept (needs).\n- Saying marketing ends with the sale.\n- Mixing up standardisation and grading, or time and place utility.\n\n**How marks are usually awarded**\n- 1 mark: correct type, concept or function.\n- 2–3 marks: each point named and explained, tied to the case.\n- 5 marks: parts answered separately; classifications give the basis and an example; function answers give an example for each.\n- Case questions: quote the clue, name the idea, explain it.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['**Market** (in marketing)', 'Actual and potential buyers of a product.', 'definition', 1],
  ['Markets by area', 'Local, regional, national, international.', 'exam-tip', 1],
  ['Markets by time', 'Very short period, short period, long period.', 'exam-tip', 1],
  ['Markets by nature of goods', 'Produce, manufactured goods, bullion, stock.', 'exam-tip', 1],
  ['**Very short period market**', 'Supply is fixed; e.g. a morning fish catch.', 'definition', 1],
  ['**Long period market**', 'Supply can change fully, even with new plants.', 'definition', 1],
  ['**Bullion market**', 'A market for gold and silver.', 'definition', 1],
  ['**Marketing**', 'Identifying and satisfying needs through exchange, at a profit.', 'definition', 1],
  ['Features of marketing', 'Needs and wants, market offering, customer value, exchange, customer orientation.', 'exam-tip', 1],
  ['Traditional concepts', 'Production, product, selling: start from the factory; profit through volume.', 'concept', 2],
  ['Modern concepts', 'Marketing, societal marketing: start from the customer; profit through satisfaction.', 'concept', 2],
  ['**Production concept**', 'Cheap, widely available goods through mass output.', 'definition', 2],
  ['**Product concept**', 'Focus on perfecting the product, even if needs change.', 'definition', 2],
  ['**Selling concept**', 'Goods must be pushed by aggressive selling.', 'definition', 2],
  ['**Marketing concept**', 'Find needs first; profit through customer satisfaction.', 'definition', 2],
  ['**Societal marketing concept**', 'Satisfaction plus the long-term welfare of society.', 'definition', 2],
  ['Marketing vs selling', 'Selling is one part; marketing starts before production and continues after the sale.', 'concept', 2],
  ['Objectives of marketing', 'Demand, satisfaction, market share, profitable sales, goodwill.', 'exam-tip', 3],
  ['Marketing helps consumers by…', 'Wider choice, better quality, information, value for money.', 'fact', 3],
  ['Marketing helps society by…', 'Creating jobs and supporting economic growth.', 'fact', 3],
  ['Functions of exchange', 'Buying, assembling, selling.', 'exam-tip', 4],
  ['Functions of physical supply', 'Transport and storage.', 'exam-tip', 4],
  ['Facilitating functions', 'Standardisation, grading, financing, risk bearing, market research.', 'exam-tip', 4],
  ['**Assembling**', 'Gathering goods from many producers into one place.', 'definition', 4],
  ['Standardisation vs grading', 'Standardisation sets specifications first; grading sorts goods into classes after.', 'concept', 4],
  ['Storage creates…', 'Time utility.', 'fact', 4],
  ['Transport creates…', 'Place utility.', 'fact', 4],
  ['**Risk bearing**', 'Covering losses from damage, delay or price falls, e.g. by insurance.', 'definition', 4],
  ['**Financing** (marketing function)', 'Providing funds and credit for marketing activities.', 'definition', 4],
  ['Case routine', 'Quote the clue, name the type, concept or function, explain it.', 'exam-tip', 4],
]);

// ---------------------------------------------------------------- tests (ISC class defaults, item for item)
const T_SHORT = test({
  kind: 'short',
  blueprint: 'isc-12-default-chapter-test-short',
  title: 'Chapter test (short) — Marketing: Concept and Functions',
  duration: 50,
  sections: [
    { id: 'A', title: 'Section A - Objective (5 marks)', instr: 'Answer all questions. Multiple-choice and assertion-reason items carry 1 mark each.', items: ['m_market_area_intl', 'm_selling_concept', 'm_obj_demand', 'm_fn_assembling', 'ar_fn'] },
    { id: 'B', title: 'Section B - Short answer (4 marks)', instr: 'Answer both questions. Internal choice in the second question.', items: ['s_mktg_selling', { attempt: 1, keys: ['s_objectives', 's_fn_std_grading'] }] },
    { id: 'C', title: 'Section C - Short answer (6 marks)', instr: 'Answer both questions. Internal choice in the second question.', items: ['s3_fn_case', { attempt: 1, keys: ['s3_market_time', 's3_importance'] }] },
    { id: 'D', title: 'Section D - Long answer (5 marks)', instr: 'Answer the question. It is set in parts.', items: ['l_functions'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'isc-12-default-chapter-test-long',
  title: 'Chapter test (long) — Marketing: Concept and Functions',
  duration: 100,
  sections: [
    { id: 'A', title: 'Section A - Objective (12 marks)', instr: 'Answer all questions. Multiple-choice and assertion-reason items carry 1 mark each.', items: ['m_market_modern', 'm_market_time_vshort', 'm_market_goods', 'm_product_concept', 'm_societal', 'm_mktg_vs_selling', 'm_obj_share', 'm_imp_society', 'm_fn_storage', 'm_fn_risk', 'ar_selling', 'ar_obj'] },
    { id: 'B', title: 'Section B - Short answer (6 marks)', instr: 'Answer all three questions. Internal choice in the last question.', items: ['s_mktg_meaning', 's_fn_storage_transport', { attempt: 1, keys: ['s_market_local_intl', 's_trad_modern'] }] },
    { id: 'C', title: 'Section C - Short answer (12 marks)', instr: 'Answer all four questions. Internal choice in the last question.', items: ['s3_mktg_features', 's3_myopia', 's3_fn_classify', { attempt: 1, keys: ['s3_objectives3', 's3_fn_risk_fin'] }] },
    { id: 'D', title: 'Section D - Long answer (10 marks)', instr: 'Answer both questions. Internal choice in the second question. Each is set in parts.', items: ['l_concepts', { attempt: 1, keys: ['l_market', 'l_importance'] }] },
  ],
});
if (T_SHORT.total_marks !== 20 || T_LONG.total_marks !== 40) throw new Error(`test marks ${T_SHORT.total_marks} / ${T_LONG.total_marks}`);

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t04 of isc-12-commerce-ch13 (market: meaning and types by area, time and nature of goods; marketing: meaning and features; traditional and modern concepts and marketing versus selling; objectives and importance; functions of marketing)',
    originality: 'every firm, person and case is imagined and written by SOYL and labelled; no ISC or CBSE textbook text, illustration or exercise and no CISCE specimen or board item reused (D-036); firms, places and set-ups differ from the CBSE 12 Business Studies chapter on marketing',
    data: 'no computed figures; all examples are imagined and labelled',
    facts: 'stable textbook concepts only; no dated figures',
    gate: 'schema, pipeline lint, deterministic verify, word limits, narration and answer-leak checks run clean in this build',
  },
});
