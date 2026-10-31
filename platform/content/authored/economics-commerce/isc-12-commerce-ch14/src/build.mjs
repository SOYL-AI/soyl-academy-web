// Build ISC 12 Commerce ch14 Marketing Mix: Product and Price. Run from platform/:
//   npx tsx content/authored/economics-commerce/isc-12-commerce-ch14/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from './lib.mjs';

setUnit('isc-12-commerce-ch14', 'economics-commerce');
await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- visuals
const vRoute1 = flow('LR', ['The marketing mix', 'What a product is', 'Consumer and industrial goods', 'Goods versus services'], 'Route map of Part 1: the marketing mix and its four elements, the meaning of product, types of goods, and how services differ from goods', 'Part 1 at a glance');
const vRoute2 = flow('LR', ['Branding', 'Labelling and packaging', 'Factors in pricing', 'Pricing strategies'], 'Route map of Part 2: branding, labelling and packaging, the factors that determine price, and five pricing strategies', 'Part 2 at a glance');

const v4P = (() => {
  const s = new Svg(560, 320);
  const boxes = [['Product', 'what we offer', 20, 20, 'blue'], ['Price', 'what buyers pay', 300, 20, 'green'], ['Place', 'where they buy', 20, 200, 'yellow'], ['Promotion', 'how they hear of it', 300, 200, 'red']];
  for (const [h, sub, x, y, col] of boxes) {
    s.rect(x, y, 240, 100, { fill: col, fillOpacity: 0.14, color: col, sw: 1.5, rx: 10 });
    s.text(x + 120, y + 40, h, { size: 16, bold: true });
    s.text(x + 120, y + 66, sub, { size: 12 });
  }
  s.parts.push('<circle cx="280" cy="160" r="62" fill="var(--diagram-accent)" fill-opacity="0.15" stroke="var(--diagram-accent)" stroke-width="2"/>');
  s.text(280, 152, 'Target', { size: 14, bold: true });
  s.text(280, 172, 'buyers', { size: 14, bold: true });
  return s.visual('Four boxes around a central circle labelled target buyers: product, what we offer; price, what buyers pay; place, where they buy; promotion, how they hear of it', 'The four Ps are built around the target buyers and must fit together.');
})();
const vMixFit = table(
  ['Element', 'Low-cost family pack (imagined namkeen)', 'Premium gift box'],
  [
    ['Product', 'Large plain pack', 'Small tin, assorted flavours'],
    ['Price', 'Low', 'High'],
    ['Place', 'Neighbourhood grocers', 'Sweet shops, online gifting'],
    ['Promotion', 'Value-for-money posters', 'Festival gifting campaign'],
  ],
  'Table showing two consistent marketing mixes for an imagined namkeen maker: a low-cost family pack and a premium gift box, with product, price, place and promotion for each',
  'Each column hangs together; mixing the columns would confuse buyers.',
);
const vGoods = table(
  ['Type', 'Bought for', 'Examples'],
  [
    ['Convenience goods', 'Quick, frequent buying nearby', 'Bread, matchboxes, newspapers'],
    ['Shopping goods', 'Buying after comparing', 'Refrigerators, wedding clothes'],
    ['Specialty goods', 'Special effort; no substitute', 'Hand-spun shawls, rare instruments'],
    ['Industrial: raw materials and components', 'Becoming part of a product', 'Copper wire, bearings'],
    ['Industrial: capital items', 'Making other goods for years', 'Moulding machines'],
    ['Industrial: supplies', 'Keeping operations running', 'Lubricants, cleaning materials'],
  ],
  'Table of consumer goods (convenience, shopping, specialty) and industrial goods (raw materials and components, capital items, supplies) with what each is bought for and examples',
);
const vGoodsEx = table(
  ['Imagined purchase', 'Type'],
  [
    ['Biscuits picked up at a station stall', 'Convenience'],
    ['Washing machine after comparing three dealers', 'Shopping'],
    ['A rare shawl for which buyers travel to Leh', 'Specialty'],
    ['Copper wire for winding motors', 'Industrial (raw material)'],
  ],
  'Worked table classifying four imagined purchases as convenience, shopping, specialty or industrial goods',
  'Ask: who buys it, for what use, and how much effort goes into buying?',
);
const vService = table(
  ['Basis', 'Goods (a woollen jacket)', 'Services (a guided trek)'],
  [
    ['Tangibility', 'Can be seen and touched', 'Intangible; judged by experience'],
    ['Perishability', 'Can be stored', 'Unused capacity is lost'],
    ['Inseparability', 'Made first, used later', 'Produced and used together'],
    ['Variability', 'Uniform from a machine', 'Varies with who provides it'],
    ['Ownership', 'Passes to the buyer', 'Only the use or experience is bought'],
  ],
  'Table distinguishing goods from services on tangibility, perishability, inseparability, variability and ownership, using a jacket and a trek as examples',
);
const vServiceEx = table(
  ['At an imagined desert camp', 'Feature of services'],
  [
    ['Guests judge it only from reviews before booking', 'Intangibility'],
    ['Staff serve dinner while guests are present', 'Inseparability'],
    ['An empty tent tonight cannot be sold tomorrow', 'Perishability'],
    ['The evening depends on which guide is on duty', 'Variability'],
  ],
  'Worked table: four facts about an imagined desert camp matched with the feature of services each shows',
  'Find the clue: cannot touch, made while used, cannot store, or depends on the person.',
);
const vBrand = table(
  ['Term', 'Meaning', 'Imagined example'],
  [
    ['Brand', 'Name, sign or design that identifies a seller\'s product', 'Japfu Pickles with its chilli mark'],
    ['Brand name', 'The part that can be spoken', 'Japfu Pickles'],
    ['Brand mark', 'The part recognised by sight', 'Red chilli in a circle'],
    ['Trademark', 'A brand registered for legal protection', 'The registered name and chilli mark'],
  ],
  'Table of brand, brand name, brand mark and trademark with meanings and an imagined example of each',
);
const vBrandMerits = table(
  ['Merits to the seller', 'Merits to the consumer'],
  [
    ['Sets the product apart', 'Easy to identify and ask for'],
    ['Builds loyalty and repeat sales', 'Assurance of steady quality'],
    ['Eases new product launches', 'Some status and satisfaction'],
    ['Allows a fair price premium', 'Easier to complain and get redress'],
  ],
  'Table of merits of branding to the seller and to the consumer',
);
const vLabel = table(
  ['Function of a label', 'Example on an oil tin'],
  [
    ['Describes the product', 'Contents, nutrition, uses'],
    ['Identifies the brand', 'Name and design on the front'],
    ['Grades the product', 'Refined or cold-pressed'],
    ['Promotes the product', 'Bright design, a short claim'],
    ['Gives legal information', 'Net quantity, price, dates, maker\'s address'],
  ],
  'Table of five functions of a label with an example of each on an oil tin',
);
const vPackLevels = (() => {
  const s = new Svg(560, 300);
  s.rect(20, 20, 520, 260, { fill: 'brown', fillOpacity: 0.08, color: 'brown', sw: 1.6, rx: 10 });
  s.text(280, 44, 'Transportation package: carton of twenty boxes', { size: 13, bold: true });
  s.rect(110, 70, 340, 180, { fill: 'blue', fillOpacity: 0.1, color: 'blue', sw: 1.5, rx: 10 });
  s.text(280, 94, 'Secondary package: printed box', { size: 13, bold: true });
  s.rect(190, 120, 180, 100, { fill: 'accent', fillOpacity: 0.16, color: 'accent', sw: 1.6, rx: 10 });
  s.text(280, 152, 'Primary package', { size: 13, bold: true });
  s.text(280, 176, 'foil pouch', { size: 12 });
  s.text(280, 196, 'touches the coffee', { size: 12, muted: true });
  return s.visual('Three nested boxes: innermost the primary package, a foil pouch that touches the coffee; around it the secondary package, a printed box; outermost the transportation package, a carton of twenty boxes', 'Three levels of packaging for an imagined packed coffee.');
})();
const vPackFeatures = table(
  ['Feature of good packaging', 'Why it matters'],
  [
    ['Protects the product', 'No breakage, leakage or spoilage'],
    ['Convenient to handle', 'Easy to carry, open, store and reuse'],
    ['Attractive', 'Catches the eye on a crowded shelf'],
    ['Informative', 'Carries brand, contents and instructions'],
    ['Economical and eco-friendly', 'Cost in proportion; less waste'],
  ],
  'Table of five features of good packaging and why each matters',
);
const vPackEx = table(
  ['Need of an imagined coir doormat', 'Packaging choice', 'Feature met'],
  [
    ['Coir soaks up moisture', 'Moisture-proof wrap', 'Protection'],
    ['Shoppers carry it home', 'Light pack with a handle', 'Convenience'],
    ['Many mats on one shelf', 'Bright picture of the mat in use', 'Attraction'],
    ['Buyers ask about size', 'Size and care printed clearly', 'Information'],
  ],
  'Worked table: four needs of an imagined coir doormat, the packaging choice for each, and the feature of good packaging it meets',
  'Start from the product\'s problem; the pack should solve it.',
);
const vPriceRange = (() => {
  const s = new Svg(560, 320);
  s.rect(200, 20, 160, 280, { fill: 'blue', fillOpacity: 0.07, color: 'blue', sw: 1.4, rx: 8 });
  s.rect(200, 20, 160, 46, { fill: 'green', fillOpacity: 0.2, color: 'green', sw: 1.4, rx: 8 });
  s.text(280, 38, 'Upper limit', { size: 13, bold: true });
  s.text(280, 56, 'value to buyers, demand', { size: 11 });
  s.rect(200, 254, 160, 46, { fill: 'red', fillOpacity: 0.18, color: 'red', sw: 1.4, rx: 8 });
  s.text(280, 272, 'Lower limit', { size: 13, bold: true });
  s.text(280, 290, 'cost', { size: 11 });
  s.text(280, 140, 'Price is set', { size: 13, bold: true });
  s.text(280, 160, 'somewhere here', { size: 13, bold: true });
  const left = [['Competition', 110], ['Government rules', 160], ['Marketing methods', 210]];
  for (const [t, y] of left) { s.text(30, y, t, { size: 12, anchor: 'start' }); s.arrow(150, y, 196, y, { sw: 1.2, color: 'muted' }); }
  const right = [['Pricing objectives', 120], ['Product life stage', 170]];
  for (const [t, y] of right) { s.text(530, y, t, { size: 12, anchor: 'end' }); s.arrow(410, y, 364, y, { sw: 1.2, color: 'muted' }); }
  return s.visual('A tall price band. At the bottom, the lower limit set by cost; at the top, the upper limit set by value to buyers and demand. Price is set somewhere between. Arrows from the left show competition, government rules and marketing methods pushing on it; arrows from the right show pricing objectives and the stage of the product\'s life', 'Cost sets the floor, value to buyers the ceiling; other factors decide where between.');
})();
const vFactors = table(
  ['Factor', 'How it affects price'],
  [
    ['Cost', 'Sets the lower limit in the long run'],
    ['Demand and utility', 'Sets the upper limit buyers will pay'],
    ['Competition', 'Keeps price close to rivals\''],
    ['Government regulation', 'Caps or controls some prices'],
    ['Marketing methods', 'Services, outlets and promotion change cost and value'],
    ['Pricing objectives', 'Share, profit, image or survival'],
  ],
  'Table of six factors that determine price and how each affects it',
);
const vPriceEx = table(
  ['Item at an imagined craft unit', 'Cost', 'Mark-up (one-quarter)', 'Price'],
  [
    ['Cushion cover', '₹400', '₹100', '₹500'],
    ['Wall hanging', '₹1,200', '₹300', '₹1,500'],
    ['Table runner', '₹240', '₹60', '₹300'],
  ],
  'Worked table of cost-plus pricing at an imagined craft unit: three items with cost, a mark-up of one-quarter of cost, and the resulting price',
  'Mark-up is one-quarter of cost; price is cost plus mark-up.',
);
const vStrategies = table(
  ['Strategy', 'Meaning (in one line)'],
  [
    ['Cost-plus', 'Cost of a unit plus a fixed mark-up'],
    ['Competitive (going-rate)', 'Price in line with rivals'],
    ['Skimming', 'High at launch; lowered later'],
    ['Penetration', 'Low at launch to win share fast'],
    ['Value-based', 'Set by the value buyers perceive'],
  ],
  'Table of five pricing strategies with a one-line meaning for each',
);
const vStrategyEx = table(
  ['Imagined launch', 'Strategy'],
  [
    ['First foldable cooktop in the region, priced high', 'Skimming'],
    ['Orange juice launched cheap in a crowded market', 'Penetration'],
    ['Tyre dealer matches the dealers next door', 'Competitive'],
    ['Single-estate coffee priced by what cafés feel it is worth', 'Value-based'],
  ],
  'Worked table: four imagined launches and the pricing strategy each uses',
  'Ask: what is the starting price, and what is it based on?',
);
const vSummary1 = table(
  ['Idea', 'Key point'],
  [
    ['Marketing mix', 'Product, price, place, promotion, working together'],
    ['Product', 'A bundle of benefits, tangible and intangible'],
    ['Types of goods', 'Consumer (convenience, shopping, specialty) and industrial'],
    ['Services', 'Intangible, perishable, inseparable, variable'],
  ],
  'Summary table of Part 1: marketing mix, product, types of goods and features of services',
);
const vSummary2 = table(
  ['Idea', 'Key point'],
  [
    ['Branding', 'Name, mark, trademark; helps seller and buyer'],
    ['Labelling and packaging', 'Inform, identify, protect, promote'],
    ['Price factors', 'Cost floor, value ceiling; competition, rules, methods, objectives'],
    ['Strategies', 'Cost-plus, competitive, skimming, penetration, value-based'],
  ],
  'Summary table of Part 2: branding, labelling and packaging, price factors and pricing strategies',
);
const vCaseSteps = flow('LR', ['Quote the clue', 'Name the type, factor or strategy', 'Explain it'], 'Three steps for case questions: quote the clue, name the type, factor or strategy, and explain it');

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Marketing Mix — Part 1: The Mix and the Product',
  goals: [
    'Explain the marketing mix and how the four Ps work together',
    'Classify goods into consumer and industrial goods with examples',
    'Distinguish products from services on tangibility, perishability and inseparability',
  ],
  slides: [
    sl('title', 'Marketing Mix: Product and Price', {
      b: 'Part 1: the **marketing mix**, what a **product** is, **consumer and industrial goods**, and how **services** differ from goods.',
      v: vRoute1,
      n: 'A firm that knows its buyers must still decide what to offer, what to charge, where to sell and how to tell people about it. These decisions make up the marketing mix. In this part we meet the mix and then look closely at the first element, the product, including services.',
    }),
    sl('diagram', 'The marketing mix', {
      b: 'The **marketing mix** is the combination of **product, price, place and promotion** decisions a firm uses to satisfy its target buyers.',
      v: v4P,
      n: 'The four elements are often called the four Ps. Product is what we offer. Price is what buyers pay. Place is where and through whom they buy. Promotion is how they hear about it. All four are built around the target buyers.',
    }),
    sl('concept', 'The four Ps must fit together', {
      v: vMixFit,
      n: 'The four Ps must send one message. A low-cost family pack goes with a low price, neighbourhood shops and value posters. A premium gift box goes with a high price, sweet shops and a festival campaign. Mixing the two, such as a premium product at a bargain price, confuses buyers.',
    }),
    sl('check', 'Quick check: the four Ps', {
      b: 'True or false: promotion is one of the four elements of the marketing mix.',
      chk: 'tf_mix',
      n: 'Recall the four Ps.',
    }),
    sl('concept', 'What is a product?', {
      b: 'A **product** is anything offered to satisfy a need: a **bundle of benefits**, physical and non-physical.',
      v: table(['What the buyer of a desert-camp package gets', 'Kind of benefit'], [['Tent and bedding', 'Tangible'], ['Meals', 'Tangible'], ['Camel ride', 'Service'], ['The guide\'s stories', 'Experience']], 'Table of four parts of an imagined desert-camp package and the kind of benefit each gives'),
      n: 'Buyers do not just buy objects. A traveller buying a desert-camp package pays for the tent and meals, but also for the camel ride and the guide\'s stories. So a product is a bundle of benefits, tangible and intangible, that together satisfy a need.',
    }),
    sl('concept', 'Types of goods', {
      v: vGoods,
      n: 'Consumer goods are bought for personal use. Convenience goods are bought often and quickly, nearby. Shopping goods are bought after comparing. Specialty goods are unique, and buyers make a special effort for them. Industrial goods are bought to make other goods: raw materials and components, capital items, and supplies.',
    }),
    sl('example', 'Worked example 1: classify the goods', {
      b: 'Four imagined purchases.',
      bl: ['Step 1: ask **who buys** and **for what use**.', 'Step 2: for consumer goods, ask **how much effort** goes into buying.', 'Step 3: name the type.'],
      v: vGoodsEx,
      n: 'Biscuits picked up at a station stall are convenience goods. A washing machine bought after comparing dealers is a shopping good. A rare shawl for which buyers travel to Leh is a specialty good. Copper wire bought to wind motors is an industrial good, a raw material.',
    }),
    sl('check', 'Quick check: little effort', {
      b: 'A commuter quickly buys a newspaper, water and biscuits at a station stall. These are…',
      chk: 'm_convenience',
      n: 'How much comparing does the commuter do?',
    }),
    sl('two-column', 'Goods and services', {
      cols: ['**Goods**\n\nTangible, storable, made before use, uniform, ownership passes.', '**Services**\n\nIntangible, perishable, produced and used together, variable, no ownership passes.'],
      v: vService,
      n: 'Services differ from goods. They are intangible, so buyers cannot touch them first. They are perishable, so unused capacity is lost. They are inseparable, made and used at the same time. They vary with who provides them. And the buyer gets an experience, not ownership.',
    }),
    sl('example', 'Worked example 2: features of a service', {
      b: 'An imagined desert camp in Jaisalmer.',
      bl: ['Step 1: read each fact.', 'Step 2: find the **clue**: touch, store, made while used, or depends on the person.', 'Step 3: name the feature.'],
      v: vServiceEx,
      n: 'Guests judge the camp only from reviews, which shows intangibility. Staff serve dinner while guests are there, which shows inseparability. An empty tent tonight cannot be sold tomorrow, which shows perishability. And the evening depends on which guide is on duty, which shows variability.',
    }),
    sl('check', 'Quick check: empty seats', {
      b: 'Unsold seats on a bus that leaves half-empty cannot be sold the next day. Which feature of services is this?',
      chk: 'm_service_perish',
      n: 'Can a service be kept in a store room?',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up Part 1. The marketing mix combines product, price, place and promotion, and all four must fit together. A product is a bundle of benefits. Consumer goods are convenience, shopping or specialty goods; industrial goods are used to make other goods. Services are intangible, perishable, inseparable and variable.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['Name all **four Ps** and show how they **fit together**.', 'Classify goods by **use** first, then by **buying effort**.', 'For services, link each feature to a **fact in the case**.', 'Use a **pair of examples** when distinguishing goods and services.'],
      v: vCaseSteps,
      n: 'Some tips. When asked about the mix, name all four Ps and show that they support each other. To classify goods, decide the use first, then the buying effort. For services, tie each feature to a fact in the case. A pair of contrasting examples makes differences clear.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Marketing Mix — Part 2: Branding, Labelling, Packaging and Price',
  goals: [
    'Explain the merits of branding and labelling, and state the features of good packaging',
    'Explain factors such as cost, demand, competition and government regulation that affect pricing',
    'Identify the pricing strategy used in a given product launch',
  ],
  slides: [
    sl('title', 'Branding, Packaging and Price', {
      b: 'Part 2: **branding**, **labelling** and **packaging**, the **factors** that decide price, and five **pricing strategies**.',
      v: vRoute2,
      n: 'In Part 2 we finish the product by looking at its name, its label and its pack. Then we turn to price: what decides it, and the strategies firms use when they launch a product.',
    }),
    sl('concept', 'Brand, brand name, brand mark, trademark', {
      v: vBrand,
      n: 'A brand is a name, sign or design that identifies a seller\'s product. The part you can say aloud is the brand name. The part you recognise by sight, such as a symbol, is the brand mark. When the brand is registered under the law, it becomes a trademark, which no other firm may use.',
    }),
    sl('two-column', 'Why brand a product?', {
      cols: ['**For the seller**\n\nDifferentiation, loyalty, easier launches, a fair premium.', '**For the consumer**\n\nEasy identification, steady quality, satisfaction, easier redress.'],
      v: vBrandMerits,
      n: 'Branding helps the seller stand apart, build loyal buyers, launch new products more easily and charge a fair premium. It helps consumers identify products quickly, trust their quality and know whom to approach if something goes wrong. A good brand name is short, easy to say and remember, and distinctive.',
    }),
    sl('check', 'Quick check: the chilli symbol', {
      b: 'A red chilli inside a circle appears beside the printed name on a pickle jar. The symbol is the…',
      chk: 'm_brand_mark',
      n: 'Can you say it aloud, or only recognise it?',
    }),
    sl('concept', 'Labelling', {
      b: 'A **label** is the information printed on, or attached to, a product or its pack.',
      v: vLabel,
      n: 'A label describes the product, identifies the brand, may grade the product, helps promote it, and carries information the law requires, such as net quantity, price, dates and the maker\'s address. For buyers, the label is often the only salesperson on the shelf.',
    }),
    sl('diagram', 'Levels of packaging', {
      v: vPackLevels,
      n: 'Packaging has three levels. The primary package touches the product, like a foil pouch of coffee. The secondary package holds it, like a printed box. The transportation package, such as a carton, carries many boxes safely to shops.',
    }),
    sl('concept', 'Features of good packaging', {
      v: vPackFeatures,
      n: 'Good packaging protects the product. It is convenient to carry, open and store. It is attractive enough to stand out on a crowded shelf. It informs buyers about the brand and contents. And its cost and waste are kept in proportion. In self-service stores, the pack sells itself.',
    }),
    sl('example', 'Worked example 1: designing a pack', {
      b: 'An imagined coir doormat needs a new pack.',
      bl: ['Step 1: list the product\'s **problems**.', 'Step 2: choose a **packaging answer** for each.', 'Step 3: name the **feature** met.'],
      v: vPackEx,
      n: 'Coir soaks up moisture, so a moisture-proof wrap gives protection. Shoppers must carry the mat home, so a light pack with a handle gives convenience. Many mats sit on one shelf, so a bright picture attracts. And buyers ask about size, so printed size and care details inform.',
    }),
    sl('diagram', 'What decides price?', {
      v: vPriceRange,
      n: 'Think of price inside a band. Cost sets the floor, because in the long run price must cover cost. What buyers feel the product is worth, and how much they want it, sets the ceiling. Competition, government rules, marketing methods, pricing objectives and the product\'s stage of life decide where in between the price falls.',
    }),
    sl('concept', 'Factors affecting price', {
      v: vFactors,
      n: 'In detail, cost sets the lower limit. Demand and utility set the upper limit. Competition keeps price close to rivals. Government may cap some prices. Better outlets and services raise both cost and value. And the firm\'s objective, whether market share, profit or image, also shapes the price.',
    }),
    sl('check', 'Quick check: the price floor', {
      b: 'A mill spends ₹92 a kilo on dal. Why can it not sell at ₹85 for long?',
      chk: 'm_cost_floor',
      n: 'Which factor sets the lowest price a firm can live with?',
    }),
    sl('concept', 'Pricing strategies', {
      v: vStrategies,
      n: 'We need only the meaning of five strategies. Cost-plus adds a mark-up to cost. Competitive pricing follows rivals. Skimming starts high and comes down later. Penetration starts low to win share quickly. Value-based pricing is set by what buyers feel the product is worth.',
    }),
    sl('example', 'Worked example 2: cost-plus and strategies', {
      b: 'An imagined craft unit adds a mark-up of one-quarter of cost; four imagined launches use other strategies.',
      bl: ['Step 1: mark-up is one-quarter of cost.', 'Step 2: price is cost plus mark-up.', 'Step 3: for a launch, ask whether the price starts **high, low, level with rivals** or by **value**.'],
      v: vPriceEx,
      n: 'A cushion cover costing four hundred rupees gets a mark-up of one hundred, so it sells for five hundred. For launches, a high price lowered later is skimming, a low price to win share is penetration, matching rivals is competitive pricing, and pricing by what cafés feel a coffee is worth is value-based.',
    }),
    sl('check', 'Quick check: an analogy', {
      b: 'Complete: high launch price, lowered later : Skimming :: low launch price to win share quickly : ___',
      chk: 'fb_strategy',
      n: 'One word for getting into the market fast.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up Part 2. A brand has a name and a mark, and becomes a trademark when registered; it helps both seller and buyer. Labels inform and identify, and good packaging protects, attracts and informs. Cost sets the price floor and value the ceiling. The five strategies are cost-plus, competitive, skimming, penetration and value-based.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['Keep **brand name**, **brand mark** and **trademark** distinct.', 'For packaging, give features **with reasons**.', 'Say **cost is the floor** and **value the ceiling**.', 'For strategies, look at the **starting price** and its **basis**.'],
      v: v4P,
      n: 'Final tips. Keep brand name, brand mark and trademark distinct. Give each packaging feature with a reason. In price questions, say that cost sets the floor and value the ceiling. To spot a strategy, look at the launch price and what it is based on, and remember that only the meaning of each strategy is needed.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Marketing Mix: Product and Price — notes',
  sections: [
    {
      h: '1. The marketing mix',
      t: 1,
      b: 'The **marketing mix** is the set of controllable decisions a firm combines to satisfy its target buyers: the **four Ps**.\n- **Product** — what is offered, including design, brand, label and pack.\n- **Price** — what buyers pay, including discounts and credit.\n- **Place** — channels and physical distribution.\n- **Promotion** — advertising, sales promotion, personal selling and publicity.\n\nThe four Ps are **interdependent**: each must support the others and match the target buyers, or the message to buyers becomes confused.',
      terms: [['Marketing mix', 'Combination of product, price, place and promotion decisions.'], ['Four Ps', 'Product, price, place, promotion.']],
      v: v4P,
      vs: [vMixFit],
    },
    {
      h: '2. Product: goods and services',
      t: 2,
      b: 'A **product** is anything offered to satisfy a need: a **bundle of utilities**, tangible and intangible.\n\n**Consumer goods** (for personal use):\n- **Convenience goods** — bought often, quickly, nearby; low price.\n- **Shopping goods** — bought after comparing quality, style and price.\n- **Specialty goods** — unique; buyers make a special effort and accept no substitute.\nThey may also be **durable** or **non-durable**.\n\n**Industrial goods** (for producing other goods): raw materials and components; capital items (installations and equipment); supplies and business services.\n\n**Services vs goods:** services are **intangible**, **perishable**, **inseparable** (produced and consumed together), **variable**, and involve **no transfer of ownership**.',
      terms: [['Convenience goods', 'Goods bought often and quickly with little effort.'], ['Specialty goods', 'Unique goods for which buyers make a special effort.'], ['Industrial goods', 'Goods bought to produce other goods or run a business.'], ['Perishability', 'Services cannot be stored; unused capacity is lost.']],
      v: vGoods,
      vs: [vService],
    },
    {
      h: '3. Branding, labelling and packaging',
      t: 3,
      b: '**Brand:** a name, term, sign, symbol or design that identifies a seller\'s product. **Brand name** — the spoken part; **brand mark** — the part recognised by sight; **trademark** — a brand given legal protection by registration.\n\n**Merits of branding:** to sellers — differentiation, loyalty, easier launches, some price premium; to consumers — easy identification, assurance of quality, satisfaction, easier redress.\n\n**A good brand name** is short, easy to pronounce and remember, distinctive, suggestive of benefits and capable of registration.\n\n**Labelling:** describes the product, identifies the brand, grades, promotes, and carries legally required details.\n\n**Packaging levels:** primary (touches the product), secondary (holds the primary pack), transportation (for shipping). **Features of good packaging:** protection, convenience, attraction, information, reasonable cost and care for the environment. In self-service stores, the pack acts as a silent salesman.',
      terms: [['Brand mark', 'The symbol or design part of a brand.'], ['Trademark', 'A brand registered for legal protection.'], ['Primary package', 'The container in direct contact with the product.']],
      v: vBrand,
      vs: [vLabel, vPackLevels, vPackFeatures],
    },
    {
      h: '4. Price: factors determining price',
      t: 4,
      b: '**Price** is the amount a buyer pays for a product.\n\n**Factors:**\n- **Cost** — sets the **lower limit** in the long run.\n- **Demand and utility** — what buyers are willing to pay sets the **upper limit**.\n- **Competition** — close rivals keep the price near theirs.\n- **Government regulation** — some prices are capped or controlled.\n- **Marketing methods** — outlets, services, credit and promotion change cost and value.\n- **Pricing objectives** — market share, profit, image or survival.',
      terms: [['Price floor', 'The lowest price a firm can sustain, set by cost.'], ['Price ceiling', 'The highest price buyers will pay, set by demand and value.']],
      v: vPriceRange,
      vs: [vFactors],
    },
    {
      h: '5. Pricing strategies (meaning only)',
      t: 5,
      b: '- **Cost-plus pricing** — cost per unit plus a fixed mark-up.\n- **Competitive (going-rate) pricing** — price in line with rivals.\n- **Skimming pricing** — a high price at launch for a new product, lowered later as rivals enter.\n- **Penetration pricing** — a low price at launch to win a large share quickly.\n- **Value-based pricing** — price set by the value customers perceive.',
      terms: [['Skimming', 'Launching high and lowering the price later.'], ['Penetration', 'Launching low to win market share quickly.'], ['Value-based pricing', 'Pricing by the value the buyer perceives.']],
      v: vStrategies,
      vs: [vPriceEx, vStrategyEx],
    },
  ],
  tips: '**Common mistakes**\n- Calling a symbol the brand name, or any brand a trademark before registration.\n- Classifying a good as shopping or convenience without looking at buying effort.\n- Saying demand sets the lower limit of price (cost does).\n- Confusing skimming (start high) with penetration (start low).\n\n**How marks are usually awarded**\n- 1 mark: correct type, term, factor or strategy.\n- 2–3 marks: each point named and explained, tied to the case.\n- 5 marks: parts answered separately; factors applied to the firm; a strategy choice backed by two reasons.\n- Case questions: quote the clue, name the idea, explain it.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['**Marketing mix**', 'Product, price, place and promotion decisions combined to satisfy target buyers.', 'definition', 1],
  ['Why must the four Ps fit together?', 'Mismatched elements send confusing signals to buyers.', 'concept', 1],
  ['**Product**', 'A bundle of tangible and intangible benefits that satisfies a need.', 'definition', 2],
  ['**Convenience goods**', 'Bought often, quickly, nearby, with little comparing.', 'definition', 2],
  ['**Shopping goods**', 'Bought after comparing quality, style and price.', 'definition', 2],
  ['**Specialty goods**', 'Unique; buyers make a special effort and accept no substitute.', 'definition', 2],
  ['Types of industrial goods', 'Raw materials and components, capital items, supplies.', 'exam-tip', 2],
  ['Features of services', 'Intangible, perishable, inseparable, variable, no ownership passes.', 'exam-tip', 2],
  ['**Inseparability**', 'A service is produced and consumed at the same time.', 'definition', 2],
  ['**Perishability**', 'A service cannot be stored; unused capacity is lost.', 'definition', 2],
  ['**Brand name**', 'The part of a brand that can be spoken.', 'definition', 3],
  ['**Brand mark**', 'The symbol or design part of a brand, recognised by sight.', 'definition', 3],
  ['**Trademark**', 'A brand registered for legal protection.', 'definition', 3],
  ['A good brand name is…', 'Short, easy to say and remember, distinctive, registrable.', 'exam-tip', 3],
  ['Merits of branding to consumers', 'Easy identification, assured quality, easier redress.', 'fact', 3],
  ['Functions of a label', 'Describe, identify, grade, promote, give legal information.', 'exam-tip', 3],
  ['Three levels of packaging', 'Primary, secondary, transportation.', 'fact', 3],
  ['Features of good packaging', 'Protection, convenience, attraction, information, sensible cost.', 'exam-tip', 3],
  ['Packaging as a silent salesman', 'In self-service stores, an attractive pack sells itself.', 'concept', 3],
  ['What sets the lower limit of price?', 'Cost.', 'fact', 4],
  ['What sets the upper limit of price?', 'Demand and the value buyers see.', 'fact', 4],
  ['Factors affecting price', 'Cost, demand, competition, government, marketing methods, objectives.', 'exam-tip', 4],
  ['Cost ₹400, mark-up one-quarter of cost', 'Price ₹500.', 'fact', 4],
  ['**Cost-plus pricing**', 'Cost plus a fixed mark-up.', 'definition', 5],
  ['**Competitive pricing**', 'Price kept in line with rivals.', 'definition', 5],
  ['**Skimming pricing**', 'High at launch, lowered later.', 'definition', 5],
  ['**Penetration pricing**', 'Low at launch to win share quickly.', 'definition', 5],
  ['**Value-based pricing**', 'Price set by the value buyers perceive.', 'definition', 5],
  ['Skimming suits…', 'A new, unique product with eager buyers and few rivals.', 'concept', 5],
  ['Case routine', 'Quote the clue, name the type, factor or strategy, explain it.', 'exam-tip', 4],
]);

// ---------------------------------------------------------------- tests (ISC class defaults, item for item)
const T_SHORT = test({
  kind: 'short',
  blueprint: 'isc-12-default-chapter-test-short',
  title: 'Chapter test (short) — Marketing Mix: Product and Price',
  duration: 50,
  sections: [
    { id: 'A', title: 'Section A - Objective (5 marks)', instr: 'Answer all questions. Multiple-choice and assertion-reason items carry 1 mark each.', items: ['m_shopping', 'm_trademark', 'm_competition', 'm_penetration', 'ar_pack'] },
    { id: 'B', title: 'Section B - Short answer (4 marks)', instr: 'Answer both questions. Internal choice in the second question.', items: ['s_branding_merits', { attempt: 1, keys: ['s_mix', 's_strategies2'] }] },
    { id: 'C', title: 'Section C - Short answer (6 marks)', instr: 'Answer both questions. Internal choice in the second question.', items: ['s3_price_factors', { attempt: 1, keys: ['s3_services', 's3_strategies'] }] },
    { id: 'D', title: 'Section D - Long answer (5 marks)', instr: 'Answer the question. It is set in parts.', items: ['l_blp'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'isc-12-default-chapter-test-long',
  title: 'Chapter test (long) — Marketing Mix: Product and Price',
  duration: 100,
  sections: [
    { id: 'A', title: 'Section A - Objective (12 marks)', instr: 'Answer all questions. Multiple-choice and assertion-reason items carry 1 mark each.', items: ['m_mix_p', 'm_product_def', 'm_specialty', 'm_industrial', 'm_service_insep', 'm_label_function', 'm_pack_promo', 'm_govt', 'm_price_calc', 'm_value', 'ar_mix', 'ar_skim'] },
    { id: 'B', title: 'Section B - Short answer (6 marks)', instr: 'Answer all three questions. Internal choice in the last question.', items: ['s_product_service', 's_price_factors2', { attempt: 1, keys: ['s_consumer_industrial', 's_label_functions'] }] },
    { id: 'C', title: 'Section C - Short answer (12 marks)', instr: 'Answer all four questions. Internal choice in the last question.', items: ['s3_mix', 's3_consumer_types', 's3_packaging', { attempt: 1, keys: ['s3_brand_label', 's3_price_govt_mm'] }] },
    { id: 'D', title: 'Section D - Long answer (10 marks)', instr: 'Answer both questions. Internal choice in the second question. Each is set in parts.', items: ['l_mix', { attempt: 1, keys: ['l_product', 'l_price'] }] },
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
    syllabus: 'topics t01–t05 of isc-12-commerce-ch14 (marketing mix and the four Ps; product: goods and services, types of goods, product versus service; branding, labelling and packaging; factors determining price; pricing strategies, meaning only)',
    originality: 'every firm, person and case is imagined and written by SOYL and labelled; no ISC or CBSE textbook text, illustration or exercise and no CISCE specimen or board item reused (D-036); firms, places and set-ups differ from the CBSE 12 Business Studies chapter on marketing',
    data: 'cost-plus figures are imagined; each price is cost plus a mark-up of one-quarter of cost, checked by hand',
    facts: 'stable textbook concepts only; no dated figures',
    gate: 'schema, pipeline lint, deterministic verify, word limits, narration and answer-leak checks run clean in this build',
  },
});
