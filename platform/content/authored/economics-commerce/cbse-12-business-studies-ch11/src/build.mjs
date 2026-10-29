// Build CBSE 12 Business Studies ch11 Marketing Management. Run from platform/:
//   npx tsx content/authored/economics-commerce/cbse-12-business-studies-ch11/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from './lib.mjs';

setUnit('cbse-12-business-studies-ch11', 'economics-commerce');
const { COOKER, COOKER_TOTAL, COOKER_UNIT_COST, COOKER_PRICE, CHAIN, CHAIN_WHOLESALE, CHAIN_RETAIL } = await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const inr = (n) => n.toLocaleString('en-IN');

// ---------------------------------------------------------------- worked example: an imagined tiffin-box maker's price
const TIFFIN = { cost: 160, rivalLow: 190, rivalHigh: 230, ceiling: 260 };
const TIFFIN_PRICE = 210; // chosen inside the competition band, above cost, below ceiling
if (!(TIFFIN.cost < TIFFIN.rivalLow && TIFFIN_PRICE >= TIFFIN.rivalLow && TIFFIN_PRICE <= TIFFIN.rivalHigh && TIFFIN.rivalHigh < TIFFIN.ceiling)) throw new Error('tiffin price band check failed');
const TIFFIN_MARGIN = TIFFIN_PRICE - TIFFIN.cost; // 50
if (TIFFIN_MARGIN !== 50) throw new Error('tiffin margin check failed');

// ---------------------------------------------------------------- visuals
const vRoute1 = flow('LR', ['Market and marketing', 'Marketing vs selling', 'Functions of marketing', 'Five philosophies', 'Marketing mix', 'Product, branding, packaging, labelling'], 'Route map of Part 1: market and marketing, marketing versus selling, functions, five philosophies, the marketing mix, and product, branding, packaging and labelling', 'Part 1 at a glance');
const vRoute2 = flow('LR', ['Price and its factors', 'Channels of distribution', 'Physical distribution', 'Promotion mix', 'Advertising and its critics', 'Personal selling, sales promotion, PR'], 'Route map of Part 2: price and its factors, channels of distribution, physical distribution, the promotion mix, advertising and its critics, and personal selling, sales promotion and public relations', 'Part 2 at a glance');

const vMarketTerms = table(
  ['Term', 'Meaning today', 'Imagined example'],
  [
    ['Market', 'All actual and potential buyers of a product', 'Every family in Bhopal that may buy a water purifier'],
    ['Marketer', 'The party that takes the initiative to create an exchange', 'A purifier company that studies needs and persuades buyers'],
    ['Marketing', 'A social process of identifying needs and creating and exchanging products of value to satisfy them', 'Designing, pricing, distributing and promoting the purifier'],
  ],
  'Table of three terms: market means all actual and potential buyers; the marketer is the party that takes the initiative in the exchange; marketing is the process of identifying needs and creating and exchanging products of value',
);
const vExchange = flow('LR', ['Two or more parties', 'Something of value on each side', 'Communication between them', 'Freedom to accept or reject', 'Exchange takes place'], 'Flow of the conditions for an exchange: two or more parties, something of value on each side, communication, freedom to accept or reject, and then the exchange', 'Conditions for an exchange');
const vMktSell = table(
  ['Basis', 'Selling', 'Marketing'],
  [
    ['Scope', 'Only transfer of title', 'Wide: needs, design, price, place, promotion, service'],
    ['Starts', 'After production', 'Before production, continues after sale'],
    ['Focus', 'The product and its sale', 'The customer and their satisfaction'],
    ['Profit through', 'Volume of sales', 'Customer satisfaction'],
  ],
  'Table comparing selling and marketing: selling is only transfer of title, starts after production, focuses on the product and earns profit through sales volume; marketing is wide, starts before production, focuses on the customer and earns profit through satisfaction',
);
const vFunctions = table(
  ['Group', 'Functions of marketing'],
  [
    ['Finding out', 'Gathering and analysing market information; marketing planning'],
    ['Making it right', 'Product designing and development; standardisation and grading'],
    ['Presenting it', 'Packaging and labelling; branding'],
    ['Selling it', 'Pricing; promotion; customer support services'],
    ['Moving it', 'Physical distribution; transportation; storage and warehousing'],
  ],
  'Table grouping the functions of marketing: finding out (market information, planning), making it right (product design, standardisation and grading), presenting it (packaging, labelling, branding), selling it (pricing, promotion, customer support) and moving it (physical distribution, transport, warehousing)',
  'Grouped for memory; the board asks for the functions themselves.',
);
const vFnExample = table(
  ['Line from the imagined Jharna Fans case', 'Function'],
  [
    ['"asked 800 shoppers which features they wanted"', 'Gathering market information'],
    ['"set a goal of 15 per cent of the city\'s fan sales in two years"', 'Marketing planning'],
    ['"every fan is tested to the same speed and noise standard"', 'Standardisation'],
    ['"a toll-free line arranges a mechanic within 48 hours"', 'Customer support services'],
  ],
  'Worked example table: four lines from an imagined fan company matched to functions: asking shoppers is gathering market information; setting a sales goal is marketing planning; testing every fan to one standard is standardisation; arranging a mechanic is customer support',
  'Quote the line, then name the function.',
);
const vPhil = table(
  ['Philosophy', 'Belief', 'Main tool'],
  [
    ['Production', 'Buyers want cheap, available products', 'Mass production, wide distribution'],
    ['Product', 'Buyers want the best quality and features', 'Product improvement'],
    ['Selling', 'Buyers will not buy enough unless persuaded', 'Aggressive selling and promotion'],
    ['Marketing', 'Satisfy customer needs better than rivals', 'Integrated marketing'],
    ['Societal marketing', 'Satisfy needs and protect society\'s welfare', 'Integrated marketing with responsibility'],
  ],
  'Table of the five marketing philosophies with their belief and main tool: production (cheap and available; mass production), product (best quality; product improvement), selling (persuasion needed; aggressive selling), marketing (satisfy needs; integrated marketing) and societal marketing (needs plus social welfare)',
);
const vSocietal = flow('LR', ['Customer needs', 'Company profit', 'Society\'s long-term welfare', 'Societal marketing balances all three'], 'Flow showing that societal marketing balances customer needs, company profit and the long-term welfare of society', 'Three interests in balance');
const vMix = flow('LR', ['Product: what is offered', 'Price: what the buyer pays', 'Place: how it reaches the buyer', 'Promotion: how buyers learn of it'], 'Flow of the four Ps of the marketing mix: product, price, place and promotion', 'The marketing mix (4 Ps)');
const vProductClass = table(
  ['Class', 'Bought how', 'Imagined example'],
  [
    ['Convenience products', 'Often, quickly, from the nearest shop', 'Matchbox, biscuits, toothpaste'],
    ['Shopping products', 'After comparing quality, style and price', 'School blazer, sofa, saree'],
    ['Speciality products', 'Special effort for unique features', 'A hand-made sitar from a master craftsman'],
    ['Industrial products', 'Bought by firms to make other goods', 'Lathe machine, raw cotton'],
  ],
  'Table of product classes: convenience products bought often from the nearest shop; shopping products bought after comparison; speciality products bought with special effort; industrial products bought by firms for production',
);
const vBrand = table(
  ['Term', 'Meaning', 'Can it be spoken?'],
  [
    ['Brand', 'A name, term, sign, symbol or design that identifies a seller\'s product', 'Partly'],
    ['Brand name', 'The part of a brand that can be spoken', 'Yes'],
    ['Brand mark', 'The symbol or design that is recognised by sight', 'No'],
    ['Trade mark', 'A brand or part of it given legal protection by registration', 'Depends on the part'],
  ],
  'Table of branding terms: brand identifies a seller\'s product; brand name is the part that can be spoken; brand mark is the symbol recognised by sight; trade mark is a registered, legally protected brand',
);
const vPackLevels = flow('LR', ['Primary package: the bottle', 'Secondary package: the box around it', 'Transportation package: the carton of boxes'], 'Flow of the three levels of packaging for an imagined hair oil: the bottle is the primary package, the box is the secondary package and the carton is the transportation package', 'Levels of packaging');
const vLabelEx = table(
  ['What the imagined Sona Ghee label says', 'Function of the label'],
  [
    ['"Ingredients: cow milk fat. Net weight 500 g"', 'Describes the product and its contents'],
    ['"Grade A: Special"', 'Grades the product'],
    ['"Store below 25 °C after opening"', 'Gives instructions for use and storage'],
    ['"Date of packing, MRP and the maker\'s address"', 'Meets legal requirements'],
  ],
  'Worked example table of an imagined ghee label: the ingredient and weight line describes the product; the grade line grades it; the storage line gives instructions; the date, price and address meet legal requirements',
);
const vSummary1 = table(
  ['Idea', 'Remember'],
  [
    ['Marketing vs selling', 'Wider; starts before production; satisfaction, not volume'],
    ['Functions', 'Information, planning, design, standards and grading, packaging, branding, support, price, promotion, distribution'],
    ['Philosophies', 'Production → product → selling → marketing → societal'],
    ['Product', 'Convenience, shopping, speciality; brand, brand name, brand mark, trade mark'],
    ['Packaging and labelling', 'Three levels of package; label describes, identifies, grades, promotes, informs by law'],
  ],
  'Summary table of Part 1: marketing versus selling, the functions, the five philosophies, product classes and branding terms, and packaging levels and label functions',
);

// Price band SVG: cost floor, competition band, ceiling set by utility and demand (₹ per tiffin box).
const vPriceBand = (() => {
  const s = new Svg(520, 300);
  const c = s.chart({ x0: 0, x1: 10, y0: 0, y1: 300, left: 70, top: 30, width: 380, height: 220, yLabel: 'Price per box (₹)' });
  // floor and ceiling lines
  s.line(c.X(0), c.Y(TIFFIN.cost), c.X(10), c.Y(TIFFIN.cost), { color: 'red', sw: 2, dash: true });
  s.line(c.X(0), c.Y(TIFFIN.ceiling), c.X(10), c.Y(TIFFIN.ceiling), { color: 'green', sw: 2, dash: true });
  s.rect(c.X(0.3), c.Y(TIFFIN.rivalHigh), c.X(9.7) - c.X(0.3), c.Y(TIFFIN.rivalLow) - c.Y(TIFFIN.rivalHigh), { fill: 'accent', fillOpacity: 0.2, color: 'accent', sw: 1.5, rx: 4 });
  s.line(c.X(0.3), c.Y(TIFFIN_PRICE), c.X(9.7), c.Y(TIFFIN_PRICE), { color: 'accent', sw: 3 });
  c.yTick(TIFFIN.cost, String(TIFFIN.cost)).yTick(TIFFIN.rivalLow, String(TIFFIN.rivalLow)).yTick(TIFFIN.rivalHigh, String(TIFFIN.rivalHigh)).yTick(TIFFIN.ceiling, String(TIFFIN.ceiling));
  s.text(c.X(5), c.Y(TIFFIN.cost) + 14, 'Floor: total cost per box', { size: 12, color: 'red' });
  s.text(c.X(5), c.Y(TIFFIN.ceiling) - 12, 'Ceiling: what buyers will pay (utility and demand)', { size: 12, color: 'green' });
  s.text(c.X(5), c.Y(TIFFIN_PRICE) - 10, `Chosen price ₹${TIFFIN_PRICE}`, { size: 12, bold: true });
  s.text(c.X(5), c.Y(TIFFIN.rivalLow) + 12, 'Competitors\' price range', { size: 11, muted: true });
  return s.visual(
    `Price band for an imagined steel tiffin box: total cost of ${TIFFIN.cost} rupees sets the floor, what buyers will pay, ${TIFFIN.ceiling} rupees, sets the ceiling, competitors charge between ${TIFFIN.rivalLow} and ${TIFFIN.rivalHigh} rupees, and the firm chooses ${TIFFIN_PRICE} rupees inside that range`,
    'Imagined figures. Cost sets the floor, utility and demand the ceiling; competition decides where in between.',
  );
})();
const vPriceFactors = table(
  ['Factor', 'Effect on price'],
  [
    ['Product cost', 'Sets the floor: fixed, variable and semi-variable costs must be covered in the long run'],
    ['Utility and demand', 'Sets the ceiling; inelastic demand allows a higher price'],
    ['Extent of competition', 'Close substitutes keep price near rivals\''],
    ['Government and legal regulations', 'Notified or capped prices for essential goods'],
    ['Pricing objectives', 'Profit, market share, survival or quality leadership'],
    ['Marketing methods used', 'Service, credit, packaging and promotion change cost and value'],
  ],
  'Table of six factors affecting price: product cost sets the floor; utility and demand set the ceiling; competition keeps price near rivals; government may cap prices; pricing objectives; and marketing methods used',
);
const vCostPlus = table(
  ['Step', 'Working (imagined pressure cookers)', 'Result'],
  [
    ['Total cost', `${inr(COOKER.fixed)} + ${COOKER.variablePerUnit} × ${inr(COOKER.units)}`, `₹${inr(COOKER_TOTAL)}`],
    ['Cost per cooker', `${inr(COOKER_TOTAL)} ÷ ${inr(COOKER.units)}`, `₹${COOKER_UNIT_COST}`],
    ['Profit on cost', `${COOKER.markupPct} per cent of ${COOKER_UNIT_COST}`, `₹${COOKER_PRICE - COOKER_UNIT_COST}`],
    ['Price', `${COOKER_UNIT_COST} + ${COOKER_PRICE - COOKER_UNIT_COST}`, `₹${COOKER_PRICE}`],
  ],
  `Worked example table: total cost ${inr(COOKER_TOTAL)} rupees, cost per cooker ${COOKER_UNIT_COST} rupees, profit of ${COOKER.markupPct} per cent adds ${COOKER_PRICE - COOKER_UNIT_COST}, so the price is ${COOKER_PRICE} rupees`,
  'Then check the price against demand and competitors before fixing it.',
);
const vChannels = (() => {
  const s = new Svg(560, 300);
  const rows = [
    ['Zero level', ['Maker', 'Consumer']],
    ['One level', ['Maker', 'Retailer', 'Consumer']],
    ['Two level', ['Maker', 'Wholesaler', 'Retailer', 'Consumer']],
    ['Three level', ['Maker', 'Agent', 'Wholesaler', 'Retailer', 'Consumer']],
  ];
  rows.forEach(([name, boxes], r) => {
    const y = 30 + r * 68;
    s.text(12, y + 16, name, { anchor: 'start', size: 13, bold: true });
    const bw = 76, gap = 14, x0 = 110;
    boxes.forEach((b, i) => {
      const x = x0 + i * (bw + gap);
      const ends = i === 0 || i === boxes.length - 1;
      s.rect(x, y, bw, 32, { fill: ends ? 'accent' : 'fill', fillOpacity: ends ? 0.2 : undefined, color: ends ? 'accent' : 'muted', sw: 1.5, rx: 6 });
      s.text(x + bw / 2, y + 16, b, { size: 12 });
      if (i < boxes.length - 1) s.arrow(x + bw + 1, y + 16, x + bw + gap - 1, y + 16, { sw: 1.4, size: 6 });
    });
  });
  return s.visual('Diagram of four channels of distribution: zero level, maker to consumer; one level, maker to retailer to consumer; two level, maker to wholesaler to retailer to consumer; three level, maker to agent to wholesaler to retailer to consumer', 'Count the middlemen to name the level.');
})();
const vChannelFactors = table(
  ['Factor', 'Leads to a short channel when', 'Leads to a long channel when'],
  [
    ['Product', 'Perishable, costly, technical or made to order', 'Low-priced, standard, durable'],
    ['Market', 'Few, large or nearby buyers', 'Many, scattered buyers buying small amounts'],
    ['Company', 'Large capital, need for close control', 'Little capital, wants others to carry stock'],
    ['Competition and environment', 'Rivals sell direct; tight economy', 'Rivals use dealers; wide reach needed'],
  ],
  'Table of factors in choosing a channel: product, market, company, and competition and environment, showing when each leads to a short or a long channel',
);
const vPDComponents = flow('LR', ['Order processing', 'Transportation: place utility', 'Warehousing: time utility', 'Inventory control: how much stock'], 'Flow of the four components of physical distribution: order processing, transportation which creates place utility, warehousing which creates time utility, and inventory control', 'Components of physical distribution');
const vChainEx = table(
  ['Stage (imagined shoe pair)', 'Adds (₹)', 'Price to next buyer (₹)'],
  [
    ['Maker sells to wholesaler', '—', String(CHAIN.factory)],
    ['Wholesaler sells to retailer', String(CHAIN.wholesalerMargin), String(CHAIN_WHOLESALE)],
    ['Retailer sells to consumer', String(CHAIN.retailerMargin), String(CHAIN_RETAIL)],
  ],
  `Worked example table for a two-level channel: the maker sells at ${CHAIN.factory} rupees, the wholesaler adds ${CHAIN.wholesalerMargin} to sell at ${CHAIN_WHOLESALE}, the retailer adds ${CHAIN.retailerMargin} to sell at ${CHAIN_RETAIL}`,
  'Each middleman is paid for storing, carrying risk and bringing goods closer to buyers.',
);
const vPromoMix = table(
  ['Tool', 'Paid?', 'Personal?', 'Typical aim'],
  [
    ['Advertising', 'Yes', 'No, mass media', 'Inform and persuade many buyers'],
    ['Personal selling', 'Yes (salespeople)', 'Yes, face to face', 'Persuade and serve individual buyers'],
    ['Sales promotion', 'Yes', 'No', 'Short-term push to buy now'],
    ['Public relations', 'Partly', 'No', 'Build and protect image and goodwill'],
  ],
  'Table of the promotion mix: advertising is paid and impersonal; personal selling is face to face; sales promotion is a short-term incentive; public relations builds image and goodwill',
);
const vAdv = table(
  ['Features', 'Merits', 'Limitations'],
  [
    ['Paid form', 'Mass reach', 'Less forceful than a salesperson'],
    ['Impersonal', 'Builds customer confidence', 'No immediate feedback'],
    ['Identified sponsor', 'Expressive (sound, colour, images)', 'Inflexible: one message for all'],
    ['Usually mass media', 'Low cost per person reached', 'Much of it reaches non-buyers'],
  ],
  'Table of advertising: features (paid, impersonal, identified sponsor, mass media), merits (mass reach, customer confidence, expressiveness, low cost per person) and limitations (less forceful, no feedback, inflexible, wasted reach)',
);
const vObjections = table(
  ['Objection', 'Usual reply'],
  [
    ['Adds to the cost of products', 'Higher demand allows large-scale production, lowering cost per unit'],
    ['Undermines social values', 'It informs people of products; buying remains their choice'],
    ['Confuses buyers with similar claims', 'Buyers can compare and choose; information widens choice'],
    ['Encourages sale of inferior goods', 'Repeat sales need satisfaction; laws punish false claims'],
    ['Some advertisements are in bad taste', 'Taste differs; self-regulation codes check offensive content'],
  ],
  'Table of five objections to advertising and the usual replies: adds to cost, undermines social values, confuses buyers, encourages inferior goods and bad taste, each with the defence commonly given',
);
const vPS = table(
  ['Feature of personal selling', 'Why it matters'],
  [
    ['Face-to-face presentation', 'Can demonstrate and show the product working'],
    ['Two-way communication', 'Doubts are cleared on the spot'],
    ['Flexible', 'Message adjusted to each buyer'],
    ['Builds relationships', 'Leads to repeat purchases'],
    ['Costly per buyer reached', 'Best for technical, costly or new products'],
  ],
  'Table of features of personal selling: face to face, two-way communication, flexible, builds relationships, and costly per buyer so best for technical or costly products',
);
const vSP = table(
  ['Activity', 'Imagined example'],
  [
    ['Rebate or discount', '15 per cent off on school bags for one week'],
    ['Refund', 'Return the empty jar and get ₹10 back'],
    ['Product combination', 'A free mug with a jar of coffee'],
    ['Quantity gift', '20 per cent extra soap in the same pack'],
    ['Instant draw or lucky draw', 'Scratch card or draw on every purchase'],
    ['Usable benefit', 'Shop for ₹2,000 and get a ₹200 voucher'],
    ['Full finance at zero per cent', 'Pay for a fridge in six instalments, no interest'],
    ['Sampling and contests', 'Free sachets; a recipe contest for buyers'],
  ],
  'Table of sales promotion activities with imagined examples: discount, refund, product combination, quantity gift, instant or lucky draw, usable benefit, full finance at zero per cent, and sampling and contests',
);
const vPR = flow('LR', ['Press relations', 'Product publicity', 'Corporate communication', 'Lobbying', 'Counselling management', 'Goodwill and trust'], 'Flow of the roles of public relations: press relations, product publicity, corporate communication, lobbying and counselling management, leading to goodwill and trust', 'Roles of public relations');
const vPromoEx = table(
  ['What the imagined Ruchi Spices did', 'Tool'],
  [
    ['Paid for a radio jingle on five city stations', 'Advertising'],
    ['Sent cooks to demonstrate recipes in supermarkets', 'Personal selling'],
    ['Gave a free recipe booklet with every 500 g pack', 'Sales promotion (product combination)'],
    ['Issued a statement and a factory tour after a false rumour', 'Public relations'],
  ],
  'Worked example table classifying four actions of an imagined spice firm: a paid radio jingle is advertising; demonstrations in supermarkets are personal selling; a free booklet with a pack is sales promotion; a statement and factory tour after a rumour is public relations',
);
const vSummary2 = table(
  ['Idea', 'Remember'],
  [
    ['Price', 'Cost = floor, utility and demand = ceiling, competition decides; also law, objectives, marketing methods'],
    ['Channels', 'Zero, one, two and three level; choose by product, market, company, environment'],
    ['Physical distribution', 'Order processing, transportation, warehousing, inventory control'],
    ['Promotion mix', 'Advertising, personal selling, sales promotion, public relations'],
    ['Advertising', 'Paid, impersonal, identified sponsor; objections have replies'],
  ],
  'Summary table of Part 2: price factors, channels, physical distribution components, the promotion mix and advertising',
);
const vTips = table(
  ['Mistake', 'Fix'],
  [
    ['Calling grading "standardisation"', 'Grading sorts natural produce into classes; standardisation fixes standards before production'],
    ['Confusing brand mark and trade mark', 'Brand mark = symbol; trade mark = legally registered'],
    ['Counting the maker as a level', 'Count only the middlemen'],
    ['Naming a gift of another product a quantity gift', 'Another product = product combination; more of the same = quantity gift'],
    ['Writing only the concept in a case', 'Name it, quote the line, then explain'],
  ],
  'Exam tips table of common mistakes and fixes: grading versus standardisation, brand mark versus trade mark, counting channel levels, product combination versus quantity gift, and answering case questions by naming, quoting and explaining',
);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Marketing Management — Part 1: Marketing, Philosophies and Product',
  goals: [
    'Explain market, marketer and marketing, and distinguish marketing from selling',
    'Identify the functions of marketing in business situations',
    'Compare the five marketing management philosophies',
    'Explain product classes, branding, packaging and labelling',
  ],
  slides: [
    sl('title', 'Marketing Management', {
      b: 'Part 1: **marketing** and **selling**, the **functions** of marketing, the five **philosophies**, the **marketing mix** and the **product**.',
      v: vRoute1,
      n: 'Think of the last snack you bought. Someone decided what flavour to make, what to call it, how to pack it, what to charge and which shop should stock it. All these decisions are marketing. In this part we see what marketing means, what marketers do, the different philosophies firms follow, and how a product is branded, packed and labelled.',
    }),
    sl('concept', 'Market, marketer and marketing', {
      b: 'A **market** today means all the actual and potential buyers of a product, not just a place.',
      v: vMarketTerms,
      n: 'Long ago a market meant a place, like a weekly bazaar. Today it means all the people who buy or may buy a product, wherever they are. The marketer is the side that takes the trouble to create the exchange: studying needs, designing and persuading. Marketing is the whole social process of finding needs and creating and exchanging products of value to meet them.',
    }),
    sl('concept', 'When does an exchange happen?', {
      b: 'Marketing is about **exchange**: each side gives something of value to get something it values more.',
      v: vExchange,
      n: 'An exchange needs at least two parties. Each must offer something the other values, such as money for a product. They must be able to communicate, and each must be free to accept or reject the offer. Distance does not matter; online buyers and sellers never meet, yet exchange still happens.',
    }),
    sl('check', 'Quick check: who is the marketer?', { b: 'Read the situation and choose.', chk: 'm_marketer', n: 'Ask yourself which side is making the effort to create the exchange. That side is the marketer.' }),
    sl('two-column', 'Marketing is wider than selling', {
      cols: [
        'Selling: transfer of title; starts after production; profit through **volume**.',
        'Marketing: needs, design, price, place, promotion and service; starts **before** production; profit through **satisfaction**.',
      ],
      v: vMktSell,
      n: 'Students often use selling and marketing as if they meant the same thing. They do not. Selling is only one step, the transfer of ownership, and it starts after the product is ready. Marketing starts before production by finding out what people need, and continues after the sale with service. Selling chases volume; marketing earns profit by satisfying customers.',
    }),
    sl('diagram', 'Functions of marketing', {
      v: vFunctions,
      n: 'Here are the functions a marketer performs, grouped so you can remember them. First find out: gather market information and plan. Then make the product right: design it, and standardise or grade it. Present it: package, label and brand it. Sell it: price, promote and support customers. Finally move it: distribute, transport and store it. In the exam, write each function with a line of explanation.',
    }),
    sl('example', 'Worked example 1: spotting functions in a case', {
      b: 'An imagined company, Jharna Fans, is launching a new ceiling fan in Jaipur.',
      bl: ['Step 1: Read each line and ask what the firm is doing.', 'Step 2: Match the action to a function.', 'Step 3: Quote the exact words in your answer.'],
      v: vFnExample,
      n: 'Let us read four lines from an imagined fan company. Asking shoppers what features they want is gathering market information. Setting a target share of city sales is marketing planning. Testing every fan to the same speed and noise standard is standardisation. Arranging a mechanic within two days is customer support. Notice that each answer names the function and quotes the line.',
    }),
    sl('diagram', 'Five marketing philosophies', {
      v: vPhil,
      n: 'Firms differ in what they believe brings success. The production concept says make it cheap and available. The product concept says make it better. The selling concept says push it hard. The marketing concept says find out what customers need and satisfy them. The societal marketing concept adds care for society and the environment. In cases, look for the belief behind the firm\'s action.',
    }),
    sl('concept', 'Production and product concepts: the risks', {
      bl: [
        '**Production concept:** works when demand exceeds supply; fails when buyers want more than low price.',
        '**Product concept:** a better product may still fail if needs have changed (marketing myopia).',
        '**Selling concept:** pushes what the firm has made; buyers may feel pressured and not return.',
      ],
      n: 'Each of the older philosophies has a weakness. Cheap mass production works only while people are happy with any basic product. Focusing only on quality can blind a firm to what customers now want. Pushing sales hard may sell once, but unhappy buyers do not come back. These weaknesses led firms towards the marketing concept.',
    }),
    sl('check', 'Quick check: name the philosophy', { b: 'Choose the philosophy shown.', chk: 'm_phil_selling', n: 'Look for the firm\'s belief. Is it about cost, quality, pushing sales, customer needs, or society as well?' }),
    sl('concept', 'Societal marketing', {
      b: 'Satisfy customers **and** protect the long-term welfare of **society**, while earning profit.',
      v: vSocietal,
      n: 'Satisfying a want can sometimes harm society: think of plastic waste or junk food. The societal marketing concept asks firms to balance three interests: what customers want, the profit the firm needs, and the long-term welfare of society. Recycling schemes, safer ingredients and honest labels are examples of this philosophy at work.',
    }),
    sl('check', 'Quick check: true or false?', { b: 'Decide whether the statement is true.', chk: 'tf_myopia', n: 'Think about a firm that keeps polishing its product while customers move on to something different.' }),
    sl('diagram', 'The marketing mix', {
      v: vMix,
      n: 'The marketing mix is the set of four tools a marketer controls, called the four Ps. Product is what is offered. Price is what the buyer pays. Place is how the product reaches the buyer, through channels and physical distribution. Promotion is how buyers come to know about it and are persuaded. A good mix fits the target market.',
    }),
    sl('concept', 'Classifying products', {
      b: 'A **product** is anything of value offered to satisfy a need: a good, a service or both.',
      v: vProductClass,
      n: 'Consumer products are grouped by how people buy them. Convenience products are bought often and quickly from the nearest shop. Shopping products are compared on quality and price first. Speciality products have unique features that buyers make a special effort to get. Industrial products are bought by firms to produce other goods.',
    }),
    sl('concept', 'Brand, brand name, brand mark, trade mark', {
      b: 'A good brand name is **short, easy to say and remember, suggestive, distinctive** and **registrable**.',
      v: vBrand,
      n: 'A brand identifies a seller\'s product. The part you can say aloud is the brand name. The symbol or design you recognise by sight is the brand mark. When the brand is registered and protected by law, it becomes a trade mark. Branding helps the firm stand out and launch new products, and helps buyers recognise quality.',
    }),
    sl('check', 'Quick check: which branding term?', { b: 'Choose the correct term.', chk: 'm_brand_mark', n: 'Can the part be spoken aloud, or only recognised by sight? That decides the answer.' }),
    sl('diagram', 'Levels of packaging', {
      b: 'Packaging has grown in importance with **self-service shops**, **health standards** and the need to **stand out**.',
      v: vPackLevels,
      n: 'Packaging has three levels. The primary package is the immediate container, such as the oil bottle. The secondary package is the extra layer, such as the box around it. The transportation package is the carton that carries many boxes to shops. In supermarkets the package has to attract the shopper and protect the product without any salesperson.',
    }),
    sl('example', 'Worked example 2: what does this label do?', {
      b: 'Read the label of an imagined ghee brand and name each function.',
      bl: ['Step 1: Read one line at a time.', 'Step 2: Ask whether it describes, grades, instructs or meets the law.', 'Step 3: Write the function with the line.'],
      v: vLabelEx,
      n: 'Here is an imagined ghee label. The ingredients and weight describe the product. The grade line grades it. The storage temperature instruction tells the buyer how to use and store it. The packing date, maximum retail price and address are legal requirements. A label can also promote, for example by announcing an offer.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'Let us sum up. Marketing is wider than selling and starts before production. The marketer gathers information, plans, designs, standardises, packs, brands, prices, promotes, distributes and supports. Five philosophies run from production to societal marketing. Products are convenience, shopping or speciality goods. Brands, packages and labels identify, protect and describe them.',
    }),
    sl('exam-tips', 'Exam tips for Part 1', {
      bl: [
        'Differences: state **both sides** for each basis (scope, start, focus, profit).',
        'Philosophies in a case: name the concept, quote the line, give the belief.',
        'Do not mix up **grading** (sorting produce) and **standardisation** (fixed standards).',
        'Trade mark = **registered** brand; brand mark = **symbol**.',
      ],
      v: vTips,
      n: 'Here is how marks are won. For a difference, write both sides for each basis. In a case on philosophies, name the concept, quote the words, and explain the belief behind them. Keep grading and standardisation apart, and remember that a trade mark is a registered brand while a brand mark is its symbol.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Marketing Management — Part 2: Price, Place and Promotion',
  goals: [
    'Explain the factors that affect price determination',
    'Identify channels of distribution and the components of physical distribution',
    'Compare advertising, personal selling, sales promotion and public relations',
    'Evaluate the common objections to advertising',
  ],
  slides: [
    sl('title', 'Price, Place and Promotion', {
      b: 'Part 2: the **price** decision, **channels** and **physical distribution**, and the **promotion mix**.',
      v: vRoute2,
      n: 'In Part 1 we looked at the product. Now we study the other three Ps. How does a firm decide its price? How does the product travel from the factory to your neighbourhood shop? And how does the firm tell people about it and persuade them to buy? Let us start with price.',
    }),
    sl('diagram', 'Where does the price lie?', {
      v: vPriceBand,
      n: 'Look at this imagined tiffin box. Its total cost per box sets the floor: in the long run the firm cannot sell below cost. What buyers are willing to pay sets the ceiling. Competitors charge somewhere in between, and the firm usually chooses a price inside their range, here two hundred and ten rupees, leaving a margin of fifty rupees over cost.',
    }),
    sl('diagram', 'Six factors affecting price', {
      v: vPriceFactors,
      n: 'Six factors shape the price. Product cost sets the lower limit. Utility and demand set the upper limit. The extent of competition decides how much freedom the firm has. The government may cap prices of essential goods. The firm\'s pricing objective, such as profit or market share, matters. And the marketing methods used, such as free service or heavy advertising, change both cost and value.',
    }),
    sl('example', 'Worked example 1: a cost-based price', {
      b: 'An imagined Rajkot firm adds a profit of 20 per cent on cost to price its pressure cookers.',
      bl: ['Step 1: Total cost = fixed cost + variable cost per unit × units.', 'Step 2: Divide by units for cost per cooker.', 'Step 3: Add the profit on cost.', 'Step 4: Check the price against demand and rivals.'],
      v: vCostPlus,
      n: 'Here is how a simple cost-based price is worked out. Fixed costs of two lakh rupees plus one hundred and fifty rupees for each of two thousand cookers make five lakh rupees in total. That is two hundred and fifty rupees per cooker. Adding twenty per cent profit on cost gives a price of three hundred rupees. Finally the firm checks that buyers and competitors make this price possible.',
    }),
    sl('check', 'Quick check: which price factor?', { b: 'Read the situation and choose the factor.', chk: 'm_price_govt', n: 'Who is limiting the price here: buyers, rivals, the firm itself, or the government?' }),
    sl('diagram', 'Channels of distribution', {
      b: 'A **channel** is the route, through middlemen if any, by which goods pass from the maker to the consumer.',
      v: vChannels,
      n: 'Goods reach buyers through channels. In a zero level channel the maker sells directly, perhaps through its own shop or website. One level adds a retailer. Two level adds a wholesaler before the retailer, the usual route for everyday goods. Three level adds an agent or distributor as well. To name the level, simply count the middlemen.',
    }),
    sl('check', 'Quick check: count the levels', { b: 'Name the channel.', chk: 'm_zero_level', n: 'Count only the middlemen between the producer and the consumer.' }),
    sl('concept', 'Choosing a channel', {
      v: vChannelFactors,
      n: 'How does a firm choose its channel? Perishable, costly or technical products need short channels, while cheap standard goods go through long ones. Many scattered buyers need many middlemen. A firm with plenty of capital that wants control may sell directly. And what competitors do, and the state of the economy, also matter.',
    }),
    sl('diagram', 'Physical distribution', {
      b: '**Physical distribution** moves goods from the place of production to the place of sale, at the right time.',
      v: vPDComponents,
      n: 'Physical distribution has four components. Order processing handles orders quickly and accurately. Transportation moves goods to where buyers are, creating place utility. Warehousing stores goods until they are needed, creating time utility. Inventory control decides how much stock to hold, so that orders are met without locking up too much money.',
    }),
    sl('example', 'Worked example 2: price through a two-level channel', {
      b: 'An imagined shoe maker sells through wholesalers and retailers.',
      bl: ['Step 1: Start with the maker\'s price to the wholesaler.', 'Step 2: Add the wholesaler\'s margin.', 'Step 3: Add the retailer\'s margin to get the consumer price.'],
      v: vChainEx,
      n: 'Follow one pair of shoes. The maker sells it to a wholesaler for two hundred rupees. The wholesaler adds twenty rupees and sells to a retailer for two hundred and twenty. The retailer adds thirty and the consumer pays two hundred and fifty. These margins pay the middlemen for storing goods, carrying risk and bringing shoes close to buyers.',
    }),
    sl('check', 'Quick check: a channel price', { b: 'Work out the price paid by the consumer.', chk: 'num_channel_price', n: 'Add each middleman\'s margin, one at a time, to the maker\'s price.' }),
    sl('diagram', 'The promotion mix', {
      v: vPromoMix,
      n: 'Promotion means informing and persuading buyers. The promotion mix has four tools. Advertising is a paid message through mass media. Personal selling is face to face. Sales promotion gives short-term incentives to buy now. Public relations builds and protects the firm\'s image. Firms combine the four to suit their product and market.',
    }),
    sl('concept', 'Advertising: features, merits and limitations', {
      b: 'Advertising is a **paid**, **impersonal** form of communication by an **identified sponsor**.',
      v: vAdv,
      n: 'Advertising is paid for, impersonal because it uses mass media, and its sponsor is identified. Its merits are huge reach, low cost per person reached, expressiveness, and the confidence it gives buyers. Its limits are that it is less forceful than a salesperson, gives no immediate feedback, cannot be adjusted for each buyer, and much of it reaches people who will never buy.',
    }),
    sl('concept', 'Objections to advertising, and the replies', {
      v: vObjections,
      n: 'Advertising has critics. They say it adds to cost, spreads materialism, confuses buyers, helps inferior goods and is sometimes in bad taste. Each objection has a common reply. Advertising raises demand, which can lower cost per unit. People still choose what to buy. Repeat sales need real satisfaction, and laws and self-regulation check false or offensive claims. In the exam, give both sides.',
    }),
    sl('concept', 'Personal selling', {
      v: vPS,
      n: 'In personal selling a salesperson meets buyers face to face. Communication flows both ways, so doubts are cleared at once and the message can be adjusted to each person. It builds lasting relationships. But it is costly for each buyer reached, so it suits technical, expensive or new products, not low-priced goods sold to millions.',
    }),
    sl('diagram', 'Sales promotion activities', {
      b: 'Short-term incentives to **buy now**: useful for launches and clearing stock, but overuse can cheapen a brand.',
      v: vSP,
      n: 'Sales promotion gives buyers a short-term reason to buy now. Common activities are discounts, refunds, a free product along with the main one, extra quantity in the same pack, scratch cards and lucky draws, vouchers for a minimum purchase, interest-free instalments, free samples and contests. Used too often, they can make buyers wait for the next offer.',
    }),
    sl('check', 'Quick check: which offer?', { b: 'Name the sales promotion technique.', chk: 'm_sp_quantity', n: 'Is the extra the same product, or a different product?' }),
    sl('concept', 'Public relations', {
      b: 'PR manages the firm\'s **image and goodwill** with customers, media, government and the community.',
      v: vPR,
      n: 'Public relations looks after the firm\'s reputation. It handles the press, publicises new products, communicates with the public, presents the firm\'s view to the government, and advises managers on public issues. When a harmful rumour spreads, good public relations responds quickly and honestly, protecting the trust that the firm has built.',
    }),
    sl('example', 'Worked example 3: which promotion tool?', {
      b: 'Classify four actions of an imagined spice company.',
      bl: ['Step 1: Is it a paid mass-media message? Advertising.', 'Step 2: Face to face? Personal selling.', 'Step 3: A short-term incentive? Sales promotion.', 'Step 4: About image and goodwill? Public relations.'],
      v: vPromoEx,
      n: 'Let us classify four actions of an imagined spice firm. A paid radio jingle is advertising. Cooks demonstrating recipes to shoppers in person is personal selling. A free recipe booklet with each pack is sales promotion, in fact a product combination. A statement and a factory tour after a false rumour is public relations.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up Part 2. Cost sets the floor of price and demand the ceiling, with competition, the law, objectives and marketing methods deciding the rest. Goods move through zero to three level channels, supported by order processing, transport, warehousing and inventory control. Promotion uses advertising, personal selling, sales promotion and public relations.',
    }),
    sl('exam-tips', 'Exam tips for Part 2', {
      bl: [
        'Price factors: name **six** and explain; cost = floor, demand = ceiling.',
        'Channel level = **number of middlemen**.',
        'Objections to advertising: write the **objection and the reply**, then a short conclusion.',
        'Sales promotion: another product = **product combination**; more of the same = **quantity gift**.',
        'Case answers: **name**, **quote**, **explain**.',
      ],
      v: vTips,
      n: 'For the exam, learn the six price factors and remember the floor and ceiling idea. Count middlemen to name a channel. In a question on advertising objections, write each objection with its reply and finish with a balanced conclusion. In every case question, name the concept, quote the words and explain.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Marketing Management — notes',
  sections: [
    {
      h: '1. Market, marketing and marketing vs selling',
      t: 1,
      b: '- **Market:** all the actual and potential buyers of a product (the old meaning was a place).\n- **Marketer:** the party that takes more initiative in creating the exchange.\n- **Marketing:** a social process of identifying needs and creating, offering and exchanging products of value to satisfy them.\n- **Features:** needs and wants; creating a market offering; customer value; exchange mechanism.\n- **Conditions of exchange:** two or more parties; something of value on each side; communication; freedom to accept or reject.\n\n**Marketing vs selling:** selling is a part of marketing; it starts after production and earns through volume. Marketing starts with needs, includes the whole mix and after-sale service, and earns through satisfaction.',
      terms: [['Market', 'All actual and potential buyers of a product.'], ['Marketer', 'The party that takes the initiative to create an exchange.']],
      v: vMktSell,
    },
    {
      h: '2. Functions of marketing',
      t: 1,
      b: '1. **Gathering and analysing market information** — needs, tastes, buying power, competition.\n2. **Marketing planning** — marketing objectives and the action programme.\n3. **Product designing and development** — features and quality that suit the target buyers.\n4. **Standardisation and grading** — producing to fixed specifications; sorting produce into quality classes.\n5. **Packaging and labelling.**\n6. **Branding.**\n7. **Customer support services** — installation, repairs, complaints, credit.\n8. **Pricing.**\n9. **Promotion.**\n10. **Physical distribution, transportation, storage and warehousing.**',
      terms: [['Grading', 'Sorting products, often natural produce, into classes by quality or size.'], ['Standardisation', 'Producing goods to predetermined standards so that quality is uniform.']],
      v: vFunctions,
    },
    {
      h: '3. Marketing management philosophies',
      t: 1,
      b: '| Philosophy | Starting point | Focus | Means | Ends |\n|---|---|---|---|---|\n| Production | Factory | Quantity, low cost | Mass production, availability | Profit through volume |\n| Product | Factory | Quality, features | Product improvement | Profit through quality |\n| Selling | Factory | Existing product | Aggressive selling | Profit through sales |\n| Marketing | Market | Customer needs | Integrated marketing | Profit through satisfaction |\n| Societal marketing | Market and society | Needs plus social welfare | Integrated, responsible marketing | Profit with social welfare |',
      terms: [['Societal marketing concept', 'Satisfying customers profitably while also protecting the long-term welfare of society.'], ['Marketing myopia', 'Focusing on the product so narrowly that changes in customer needs are missed.']],
      v: vSocietal,
    },
    {
      h: '4. Product: classes, branding, packaging and labelling',
      t: 2,
      b: '**Marketing mix:** product, price, place, promotion.\n\n**Product classes:** consumer products (convenience, shopping, speciality; durable and non-durable) and industrial products.\n\n**Branding.** Brand, brand name (spoken part), brand mark (symbol), trade mark (registered). Advantages to marketers: differentiation, help in advertising, differential pricing, easier launch of new products. To customers: easy identification, assurance of quality, status. A good brand name is short and easy to say and remember, suggestive, distinctive, adaptable and registrable.\n\n**Packaging.** Levels: primary, secondary, transportation. Importance today: health and sanitation standards, self-service retail, innovational opportunity, product differentiation. Functions: identification, protection, convenience, promotion.\n\n**Labelling.** Describes the product and its use, identifies it, grades it, helps promotion, and gives information required by law.',
      terms: [['Trade mark', 'A brand or part of it registered and legally protected.'], ['Primary package', 'The immediate container of a product.']],
      v: vBrand,
      vs: [vPackLevels],
    },
    {
      h: '5. Price and physical distribution',
      t: [3, 4],
      b: '**Factors affecting price:** product cost (floor), utility and demand (ceiling), extent of competition, government and legal regulations, pricing objectives (profit maximisation, market share leadership, surviving competition, product quality leadership), marketing methods used.\n\n**Channels:** zero level (direct), one level (retailer), two level (wholesaler and retailer), three level (agent, wholesaler, retailer). Factors in choice: product, company, competition, market, environment.\n\n**Physical distribution components:** order processing; transportation (place utility); warehousing (time utility); inventory control (level of stock, balancing service and cost).',
      terms: [['Channel of distribution', 'The route through which goods pass from the producer to the consumer.'], ['Inventory control', 'Deciding how much stock to hold to meet orders at reasonable cost.']],
      v: vPriceFactors,
      vs: [vChannels, vPDComponents],
    },
    {
      h: '6. Promotion',
      t: 5,
      b: '**Advertising:** paid, impersonal, identified sponsor. Merits: mass reach, customer confidence, expressiveness, economy per person. Limitations: less forceful, no feedback, inflexible, low effectiveness for some buyers. Objections (cost, social values, confusion, inferior goods, bad taste) each have a reply.\n\n**Personal selling:** face to face, two-way, flexible, builds relationships; suits technical or costly goods. Qualities of a good salesperson include product knowledge, courtesy, persuasiveness and honesty.\n\n**Sales promotion:** short-term incentives such as rebate, discount, refund, product combination, quantity gift, instant or lucky draw, usable benefit, full finance at zero per cent, sampling and contests.\n\n**Public relations:** press relations, product publicity, corporate communication, lobbying and counselling, protecting image and goodwill.',
      terms: [['Advertising', 'A paid, impersonal form of communication by an identified sponsor.'], ['Sales promotion', 'Short-term incentives that encourage immediate purchase.'], ['Public relations', 'Managing the firm\'s image and goodwill with the public.']],
      v: vPromoMix,
      vs: [vSP, vObjections],
    },
  ],
  tips: '**Common mistakes**\n- Writing that marketing and selling are the same.\n- Mixing up grading and standardisation, or brand mark and trade mark.\n- Counting the producer or consumer as a channel level.\n- Calling a free different product a "quantity gift".\n- Listing objections to advertising without the replies.\n\n**How marks are usually awarded**\n- 1 mark: one correct option or term.\n- 2–3 marks: one point per mark, each explained in a line.\n- 5 marks: five explained points, or points plus a conclusion.\n- Cases: name the concept, quote the line, then explain; marks are lost if only the name is written.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['**Market** in modern marketing', 'All **actual and potential buyers** of a product.', 'definition', 1],
  ['**Marketer**', 'The party that takes the **initiative** to create an exchange.', 'definition', 1],
  ['Four conditions of an **exchange**', 'Two or more parties; value on each side; communication; freedom to accept or reject.', 'concept', 1],
  ['Marketing vs selling: starting point', 'Marketing starts **before** production; selling **after**.', 'concept', 1],
  ['Marketing vs selling: profit through', 'Marketing: **customer satisfaction**. Selling: **sales volume**.', 'concept', 1],
  ['**Grading** vs **standardisation**', 'Grading sorts produce into quality classes; standardisation fixes standards before production.', 'concept', 1],
  ['**Production concept**', 'Cheap and available products; mass production.', 'definition', 1],
  ['**Product concept**', 'Best quality and features; product improvement.', 'definition', 1],
  ['**Selling concept**', 'Buyers must be persuaded; aggressive selling.', 'definition', 1],
  ['**Marketing concept**', 'Identify and satisfy customer needs better than rivals.', 'definition', 1],
  ['**Societal marketing concept**', 'Customer satisfaction **plus** long-term welfare of society, with profit.', 'definition', 1],
  ['The **4 Ps**', 'Product, price, place, promotion.', 'fact', 2],
  ['**Convenience** vs **shopping** products', 'Convenience: bought often from the nearest shop. Shopping: compared before buying.', 'concept', 2],
  ['**Brand name** vs **brand mark**', 'Name can be spoken; mark is a symbol recognised by sight.', 'concept', 2],
  ['**Trade mark**', 'A brand or part of it **registered** and legally protected.', 'definition', 2],
  ['Qualities of a good brand name', 'Short, easy to say and remember, suggestive, distinctive, adaptable, registrable.', 'concept', 2],
  ['Three **levels of packaging**', 'Primary (container), secondary (outer layer), transportation (carton).', 'fact', 2],
  ['Why packaging matters more today', 'Health standards, self-service shops, innovation, product differentiation.', 'concept', 2],
  ['Functions of a **label**', 'Describe, identify, grade, promote, give legal information.', 'concept', 2],
  ['What sets the **floor** and **ceiling** of price?', 'Floor: **cost**. Ceiling: **utility and demand**. Competition decides in between.', 'concept', 3],
  ['Six factors affecting price', 'Cost, utility and demand, competition, government regulation, pricing objectives, marketing methods.', 'concept', 3],
  ['A low launch price to grab buyers serves which objective?', '**Market share leadership**.', 'example', 3],
  ['Name the channel: maker → wholesaler → retailer → consumer', '**Two-level** channel.', 'example', 4],
  ['Four components of **physical distribution**', 'Order processing, transportation, warehousing, inventory control.', 'fact', 4],
  ['Transportation and warehousing create which utilities?', 'Transport: **place** utility. Warehousing: **time** utility.', 'concept', 4],
  ['Four tools of the **promotion mix**', 'Advertising, personal selling, sales promotion, public relations.', 'fact', 5],
  ['Three features of **advertising**', 'Paid, impersonal, identified sponsor.', 'fact', 5],
  ['Reply to "advertising adds to cost"', 'Higher demand allows large-scale production, lowering cost per unit.', 'exam-tip', 5],
  ['**Product combination** vs **quantity gift**', 'Another product free vs more of the same product free.', 'exam-tip', 5],
  ['Role of **public relations** in a crisis', 'Respond quickly and honestly to protect image and goodwill.', 'concept', 5],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-12-default-chapter-test-short',
  title: 'Chapter test (short) — Marketing Management',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_phil_production', 'm_pack_level', 'm_inventory', 'ar_competition'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and the 3-mark question in about 50–75 words.', items: ['s_fn_planning', 's_ps_features', 's3_label'] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer any ONE of the two questions in about 120 words.', items: [{ attempt: 1, keys: ['l_functions', 'l_physical_dist'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks)', instr: 'Read the case and answer all parts. Part (c) has an internal choice.', items: ['cb_shakti_mix'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-12-default-chapter-test-long',
  title: 'Chapter test (long) — Marketing Management',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_market_meaning', 'm_selling_vs_mkt', 'm_phil_societal', 'm_fn_grading', 'm_price_demand', 'm_two_level', 'm_personal_selling', 'm_pr', 'ar_mkt_wider', 'ar_ps_all'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and 3-mark questions in about 50–75 words. Questions 13 and 15 have an internal choice.', items: ['s_brand_adv_seller', 's_components', { attempt: 1, keys: ['s_pr_role', 's_adv_merits'] }, 's_mkt_selling', { attempt: 1, keys: ['s3_price_factors', 's3_sp_tools'] }] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer question 16, and any ONE of questions 17 and 18, in about 120 words each.', items: ['l_adv_objections', { attempt: 1, keys: ['l_packaging', 'l_price_factors'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks each)', instr: 'Read each case and answer all parts. Part (c) of each has an internal choice.', items: ['cb_nirmal_philosophy', 'cb_tara_promotion'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t05 of cbse-12-business-studies-ch11 only (concept, functions and philosophies; product, branding, packaging and labelling; price factors; physical distribution; promotion mix)',
    originality: 'every firm, brand, person and case is imagined and written by SOYL; no real brand; no NCERT text, example or exercise and no board or sample-paper item reused (D-036)',
    data: `figures computed in the build: cooker cost-plus price ${inr(COOKER_TOTAL)} ÷ ${inr(COOKER.units)} = ${COOKER_UNIT_COST}, plus ${COOKER.markupPct} per cent = ${COOKER_PRICE}; shoe channel ${CHAIN.factory} + ${CHAIN.wholesalerMargin} + ${CHAIN.retailerMargin} = ${CHAIN_RETAIL}; namkeen quantity gift 90 ÷ 600 × 100 = 15; tiffin price band ${TIFFIN.cost} < ${TIFFIN_PRICE} inside ${TIFFIN.rivalLow}–${TIFFIN.rivalHigh} < ${TIFFIN.ceiling}`,
    facts: 'standard textbook classifications only (philosophies, functions, packaging levels, price factors, channels, promotion tools); no dates or statistics',
    gate: 'schema, pipeline lint, deterministic verify, word limits, narration and answer-leak checks run clean in this build',
  },
});
