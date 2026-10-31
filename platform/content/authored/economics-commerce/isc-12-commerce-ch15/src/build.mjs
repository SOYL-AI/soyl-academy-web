// Build ISC 12 Commerce ch15 Marketing Mix: Place and Promotion. Run from platform/:
//   npx tsx content/authored/economics-commerce/isc-12-commerce-ch15/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from './lib.mjs';

setUnit('isc-12-commerce-ch15', 'economics-commerce');
await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- visuals
const vRoute1 = flow('LR', ['Channels of distribution', 'Zero, one and two levels', 'Choosing a channel', 'Physical distribution'], 'Route map of Part 1: channels of distribution, zero-, one- and two-level channels, factors in choosing a channel, and the elements of physical distribution', 'Part 1 at a glance');
const vRoute2 = flow('LR', ['Promotion mix', 'Advertising', 'Sales promotion and personal selling', 'Publicity and choosing a tool'], 'Route map of Part 2: the promotion mix, advertising, sales promotion, personal selling, publicity, and choosing the right tool', 'Part 2 at a glance');

const vChannels = (() => {
  const s = new Svg(560, 330);
  const rows = [
    ['Zero-level', ['Manufacturer', 'Consumer']],
    ['One-level', ['Manufacturer', 'Retailer', 'Consumer']],
    ['Two-level', ['Manufacturer', 'Wholesaler', 'Retailer', 'Consumer']],
  ];
  rows.forEach(([name, nodes], r) => {
    const y = 40 + r * 100;
    s.text(14, y + 18, name, { size: 13, bold: true, anchor: 'start' });
    const w = 92, x0 = 112, step = 112;
    nodes.forEach((n, i) => {
      const last = i === nodes.length - 1;
      const x = last ? x0 + 3 * step : x0 + i * step;
      const col = i === 0 ? 'blue' : last ? 'green' : 'yellow';
      s.rect(x, y, w, 36, { fill: col, fillOpacity: 0.15, color: col, sw: 1.4, rx: 8 });
      s.text(x + w / 2, y + 18, n, { size: 11 });
      if (!last) {
        const nx = i + 1 === nodes.length - 1 ? x0 + 3 * step : x0 + (i + 1) * step;
        s.arrow(x + w + 2, y + 18, nx - 4, y + 18, { sw: 1.4, color: 'muted' });
      }
    });
    s.text(112 + 3 * 112 + 46, y + 54, r === 0 ? 'no middleman' : r === 1 ? 'one middleman' : 'two middlemen', { size: 11, muted: true });
  });
  return s.visual('Three rows of boxes joined by arrows. Zero-level: manufacturer to consumer, no middleman. One-level: manufacturer to retailer to consumer, one middleman. Two-level: manufacturer to wholesaler to retailer to consumer, two middlemen', 'The level of a channel is the number of middlemen in it.');
})();
const vChannelEx = table(
  ['Imagined firm', 'Route of goods', 'Level'],
  [
    ['Jaggery maker selling at its farm-gate shop', 'Maker → consumer', 'Zero'],
    ['Saree weaver selling through city boutiques', 'Maker → retailer → consumer', 'One'],
    ['Macaroon bakery using district stockists', 'Maker → stockist → sweet shop → consumer', 'Two'],
  ],
  'Worked table: three imagined firms, the route their goods take, and the level of channel',
  'Count the middlemen between the maker and the consumer.',
);
const vFactors = table(
  ['Factor', 'Points towards a short channel when…', 'Points towards a long channel when…'],
  [
    ['Product', 'Perishable, costly, technical or made to order', 'Durable, cheap, standard'],
    ['Market', 'Few, large buyers close together', 'Many small buyers spread widely'],
    ['Company', 'Strong finances; wants control', 'Limited funds and staff'],
    ['Competition', 'Rivals sell direct', 'Rivals use dealers and shops'],
  ],
  'Table of four groups of factors in choosing a channel, showing when each points towards a short channel and when towards a long one',
);
const vFactorEx = table(
  ['Imagined situation', 'Factor', 'Channel suggested'],
  [
    ['Coconut water spoils in two days', 'Product', 'Short'],
    ['Twelve buyer mills in one town', 'Market', 'Direct'],
    ['New firm, little capital, no sales staff', 'Company', 'Through middlemen'],
    ['Rivals all sell in hotel gift shops', 'Competition', 'Hotel gift shops too'],
  ],
  'Worked table: four imagined situations, the factor each shows, and the channel suggested',
  'Name the factor first, then say which way it pushes the channel.',
);
const vPd = flow('LR', ['Order processing', 'Warehousing', 'Inventory control', 'Transportation'], 'Four elements of physical distribution: order processing, warehousing, inventory control and transportation', 'Physical distribution gets goods to buyers at the right place and time.');
const vPdTable = table(
  ['Element', 'Meaning', 'Imagined example'],
  [
    ['Order processing', 'Receiving, checking and preparing orders', 'Invoice raised and cartons packed the same day'],
    ['Transportation', 'Moving goods to buyers', 'Refrigerated vans for chocolates'],
    ['Warehousing', 'Storing goods near markets', 'Godowns in Delhi and Kolkata'],
    ['Inventory control', 'Keeping the right level of stock', 'Minimum and maximum stock for each size'],
  ],
  'Table of the four elements of physical distribution with their meanings and an imagined example of each',
);
const vPromoRoles = flow('LR', ['Inform', 'Persuade', 'Remind'], 'Three roles of promotion: inform, persuade and remind', 'New products need informing; rival products need persuading; familiar products need reminding.');
const vPromoGrid = (() => {
  const s = new Svg(560, 320);
  const x0 = 120, y0 = 50, w = 210, h = 120;
  s.rect(x0, y0, w, h, { fill: 'blue', fillOpacity: 0.12, color: 'blue', sw: 1.4, rx: 6 });
  s.rect(x0 + w, y0, w, h, { fill: 'green', fillOpacity: 0.14, color: 'green', sw: 1.4, rx: 6 });
  s.rect(x0, y0 + h, w, h, { fill: 'yellow', fillOpacity: 0.16, color: 'yellow', sw: 1.4, rx: 6 });
  s.rect(x0 + w, y0 + h, w, h, { fill: 'fill', color: 'muted', sw: 1.2, rx: 6 });
  s.text(x0 + w / 2, y0 + 44, 'Advertising', { size: 14, bold: true });
  s.text(x0 + w / 2, y0 + 70, 'Sales promotion', { size: 14, bold: true });
  s.text(x0 + w / 2, y0 + 94, '(short-term incentives)', { size: 11, muted: true });
  s.text(x0 + 1.5 * w, y0 + 52, 'Personal selling', { size: 14, bold: true });
  s.text(x0 + 1.5 * w, y0 + 76, 'face to face, two-way', { size: 11, muted: true });
  s.text(x0 + w / 2, y0 + h + 52, 'Publicity', { size: 14, bold: true });
  s.text(x0 + w / 2, y0 + h + 76, 'news; not controlled', { size: 11, muted: true });
  s.text(x0 + 1.5 * w, y0 + h + 60, 'not a firm\'s tool', { size: 11, muted: true });
  s.text(x0 + w / 2, y0 - 16, 'Impersonal', { size: 12, muted: true });
  s.text(x0 + 1.5 * w, y0 - 16, 'Personal', { size: 12, muted: true });
  s.text(x0 - 12, y0 + h / 2, 'Paid', { size: 12, muted: true, anchor: 'end' });
  s.text(x0 - 12, y0 + 1.5 * h, 'Unpaid', { size: 12, muted: true, anchor: 'end' });
  return s.visual('Two-by-two grid. Columns: impersonal and personal. Rows: paid and unpaid. Paid and impersonal: advertising, and sales promotion with short-term incentives. Paid and personal: personal selling, face to face and two-way. Unpaid and impersonal: publicity, news that the firm does not control. Unpaid and personal: not a firm\'s tool', 'Sorting the four promotion tools by payment and by personal contact.');
})();
const vTools = table(
  ['Tool', 'Meaning', 'Typical example'],
  [
    ['Advertising', 'Paid, impersonal message by an identified sponsor', 'A television film or magazine page'],
    ['Sales promotion', 'Short-term incentives to buy now', 'Coupons, free samples, buy-two-get-one'],
    ['Personal selling', 'Face-to-face, two-way presentation to buyers', 'An engineer demonstrating a machine'],
    ['Publicity', 'Unpaid, non-personal coverage in the media', 'A newspaper feature on the firm'],
  ],
  'Table of the four promotion tools with the meaning of each and a typical example',
);
const vAdvPs = table(
  ['Basis', 'Advertising', 'Personal selling'],
  [
    ['Contact', 'Impersonal', 'Face to face'],
    ['Communication', 'One-way', 'Two-way'],
    ['Reach', 'Very many people', 'Few people at a time'],
    ['Cost per person', 'Low', 'High'],
    ['Flexibility', 'Same message for all', 'Adapted to each buyer'],
  ],
  'Table distinguishing advertising from personal selling on contact, communication, reach, cost per person and flexibility',
);
const vSpPub = table(
  ['Basis', 'Sales promotion', 'Publicity'],
  [
    ['Payment', 'Paid by the firm', 'Unpaid'],
    ['Control', 'Firm controls it', 'Media control it'],
    ['Purpose', 'Immediate sales', 'Awareness and credibility'],
    ['Duration', 'Short-term', 'Longer-lasting'],
  ],
  'Table distinguishing sales promotion from publicity on payment, control, purpose and duration',
);
const vToolEx = table(
  ['Imagined case', 'Suitable tool', 'Why'],
  [
    ['Costly custom gears for a few tractor makers', 'Personal selling', 'Technical; few buyers; needs negotiation'],
    ['New macaroon flavour for a whole state', 'Advertising', 'Large, scattered audience; low cost per person'],
    ['Last season\'s bedsheets to clear quickly', 'Sales promotion', 'Short-term push to sales'],
    ['A lodge with a good green story', 'Publicity', 'Credible news at no cost'],
  ],
  'Worked table: four imagined cases, the most suitable promotion tool for each and the reason',
  'Ask: how many buyers, how technical the product, and how quickly sales are needed.',
);
const vSummary1 = table(
  ['Idea', 'Key point'],
  [
    ['Channel of distribution', 'Route of goods from maker to buyer, with middlemen'],
    ['Levels', 'Zero (direct), one (retailer), two (wholesaler and retailer)'],
    ['Choosing a channel', 'Product, market, company and competitive factors'],
    ['Physical distribution', 'Order processing, transportation, warehousing, inventory control'],
  ],
  'Summary table of Part 1: channels, levels, factors in choosing a channel and physical distribution',
);
const vSummary2 = table(
  ['Idea', 'Key point'],
  [
    ['Promotion mix', 'Advertising, sales promotion, personal selling, publicity'],
    ['Roles', 'Inform, persuade, remind'],
    ['Key differences', 'Paid or unpaid; personal or impersonal; short or long term'],
    ['Choosing a tool', 'Number of buyers, technical nature, urgency of sales'],
  ],
  'Summary table of Part 2: the promotion mix, its roles, key differences between tools and choosing a tool',
);
const vCaseSteps = flow('LR', ['Quote the clue', 'Name the channel, element or tool', 'Explain or recommend'], 'Three steps for case questions: quote the clue, name the channel, element or tool, and explain or recommend');

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Place and Promotion — Part 1: Channels and Physical Distribution',
  goals: [
    'Draw zero-, one- and two-level channels of distribution',
    'Explain the product, market, company and competitive factors affecting the choice of channel',
    'Name the elements of physical distribution: order processing, transportation, warehousing and inventory control',
  ],
  slides: [
    sl('title', 'Marketing Mix: Place and Promotion', {
      b: 'Part 1: **channels of distribution**, their **levels**, how to **choose** one, and **physical distribution**.',
      v: vRoute1,
      n: 'A good product at the right price is of no use if buyers cannot find it. Place, the third P, is about getting goods to buyers. In this part we look at channels of distribution, how to choose one, and the physical tasks of moving goods.',
    }),
    sl('concept', 'What is a channel of distribution?', {
      b: 'A **channel of distribution** is the route through which goods pass from the **producer to the final buyer**, with the **middlemen** involved.',
      v: table(['Middleman', 'What it does'], [['Wholesaler', 'Buys in bulk, stores, sells in smaller lots to retailers'], ['Retailer', 'Sells to final consumers in small quantities'], ['Agent or stockist', 'Holds stock or arranges sales in an area']], 'Table of three kinds of middlemen and what each does'),
      n: 'Goods often pass through middlemen on their way to buyers. Wholesalers buy in bulk, store goods and sell smaller lots to retailers. Retailers sell to final consumers. Middlemen break bulk, give credit and spread goods widely, so they perform useful functions, not just add cost.',
    }),
    sl('diagram', 'Levels of channels', {
      v: vChannels,
      n: 'The level of a channel is the number of middlemen in it. A zero-level channel has none: the maker sells directly. A one-level channel has a retailer. A two-level channel has a wholesaler and a retailer, and suits goods bought often by many buyers.',
    }),
    sl('example', 'Worked example 1: count the middlemen', {
      b: 'Three imagined firms.',
      bl: ['Step 1: trace the **route** of the goods.', 'Step 2: **count** the middlemen.', 'Step 3: name the level.'],
      v: vChannelEx,
      n: 'A jaggery maker selling at its own farm-gate shop has no middleman, so it is zero-level. A saree weaver selling through city boutiques has one, the retailer, so it is one-level. A bakery whose macaroons go to stockists and then sweet shops has two, so it is two-level.',
    }),
    sl('check', 'Quick check: zero-level', {
      b: 'True or false: in a zero-level channel, goods pass through one retailer.',
      chk: 'tf_channel',
      n: 'How many middlemen does zero-level mean?',
    }),
    sl('concept', 'Choosing a channel', {
      v: vFactors,
      n: 'Four groups of factors guide the choice. Product: perishable, costly or technical goods need short channels. Market: a few large buyers close together can be served directly. Company: a firm with strong finances can sell directly, while a small firm relies on middlemen. Competition: firms often use the channels their rivals use.',
    }),
    sl('example', 'Worked example 2: which factor?', {
      b: 'Four imagined situations.',
      bl: ['Step 1: decide which **group** the fact belongs to.', 'Step 2: say whether it pushes towards a **short or long** channel.', 'Step 3: suggest the channel.'],
      v: vFactorEx,
      n: 'Coconut water that spoils in two days is a product factor, calling for a short channel. Twelve buyer mills in one town is a market factor, allowing direct selling. A new firm with little capital is a company factor, so it uses middlemen. Rivals in hotel gift shops is a competitive factor.',
    }),
    sl('check', 'Quick check: direct selling', {
      b: 'A jaggery maker sells only at its own farm-gate shop and from its own van. Which channel is this?',
      chk: 'm_zero',
      n: 'Is there anyone between the maker and the buyer?',
    }),
    sl('diagram', 'Physical distribution', {
      b: '**Physical distribution** covers the activities that move goods physically from the producer to buyers at the **right place and time**.',
      v: vPd,
      n: 'Choosing a channel decides who handles the goods. Physical distribution is about actually moving them. Orders must be processed, goods stored in warehouses near markets, the right stock kept, and goods transported to buyers. We need only the meaning of each element.',
    }),
    sl('concept', 'Elements of physical distribution', {
      v: vPdTable,
      n: 'Order processing means receiving, checking and preparing orders. Transportation means moving goods to buyers. Warehousing means storing them near markets. Inventory control means keeping the right level of stock, neither so little that sales are lost nor so much that money is locked up.',
    }),
    sl('check', 'Quick check: storing near markets', {
      b: 'Fill in the blank: keeping goods in godowns near markets until needed is called ___.',
      chk: 'fb_pd',
      n: 'One word, one of the four elements.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up Part 1. A channel of distribution is the route of goods from maker to buyer. Zero-level has no middleman, one-level has a retailer, and two-level has a wholesaler and a retailer. Product, market, company and competitive factors guide the choice. Physical distribution covers order processing, transportation, warehousing and inventory control.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['**Draw** each channel as a flow with arrows.', 'The level equals the **number of middlemen**.', 'Name the **factor group** before explaining it.', 'For physical distribution, the **meaning** of each element is enough.'],
      v: vCaseSteps,
      n: 'Some tips. Draw channels as simple flows with arrows. Remember that the level is the number of middlemen. When explaining factors, say whether each is a product, market, company or competitive factor. For physical distribution, a clear meaning of each element is enough.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Place and Promotion — Part 2: The Promotion Mix',
  goals: [
    'Explain the promotion mix and its role in informing and persuading customers',
    'Compare advertising with personal selling, and sales promotion with publicity',
    'Recommend a suitable promotion element for a given product and market',
  ],
  slides: [
    sl('title', 'The Promotion Mix', {
      b: 'Part 2: the **promotion mix**, its **roles**, the four **tools**, how they **differ**, and how to **choose** among them.',
      v: vRoute2,
      n: 'Promotion is the fourth P. It is how a firm tells buyers about its product and persuades them to buy. In this part we meet the four tools of promotion, see how they differ, and learn how to choose the right one.',
    }),
    sl('concept', 'Promotion mix and its roles', {
      b: 'The **promotion mix** is the combination of **advertising, sales promotion, personal selling and publicity** a firm uses.',
      v: vPromoRoles,
      n: 'Promotion has three roles. For a new product, it informs buyers that it exists and what it does. Where rivals compete, it persuades buyers to choose this product. For a familiar product, it reminds buyers so that it stays in their minds.',
    }),
    sl('check', 'Quick check: four tools together', {
      b: 'A firm uses advertisements, a festival discount, salespeople at exhibitions and a news story. Together these are its…',
      chk: 'm_promo_mix',
      n: 'Which mix combines all four tools?',
    }),
    sl('concept', 'The four tools', {
      v: vTools,
      n: 'Advertising is a paid, impersonal message from an identified sponsor. Sales promotion offers short-term incentives such as coupons and free samples. Personal selling is a face-to-face, two-way presentation to buyers. Publicity is unpaid coverage in the media, which the firm does not control.',
    }),
    sl('diagram', 'Sorting the tools', {
      v: vPromoGrid,
      n: 'Here is a simple way to sort the tools. Advertising and sales promotion are paid and impersonal. Personal selling is paid and personal. Publicity is unpaid, and the firm cannot control what the media say.',
    }),
    sl('two-column', 'Advertising versus personal selling', {
      cols: ['**Advertising**\n\nImpersonal, one-way, reaches many, low cost per person.', '**Personal selling**\n\nFace to face, two-way, reaches few, high cost per person, flexible.'],
      v: vAdvPs,
      n: 'Advertising sends one message to very many people at a low cost per person, but cannot answer questions. Personal selling talks to a few people at a time, at a high cost per person, but it is two-way and can be adapted to each buyer.',
    }),
    sl('check', 'Quick check: an analogy', {
      b: 'Face-to-face, two-way : Personal selling :: Paid, impersonal, one-way, identified sponsor : ___',
      chk: 'fb_adv',
      n: 'Which tool sends one message to many?',
    }),
    sl('two-column', 'Sales promotion versus publicity', {
      cols: ['**Sales promotion**\n\nPaid and controlled by the firm; short-term push to sales.', '**Publicity**\n\nUnpaid; controlled by the media; builds credibility over time.'],
      v: vSpPub,
      n: 'Sales promotion is paid for and controlled by the firm, and it aims at quick sales through offers. Publicity costs nothing, but the media decide what to say. Because it comes from an independent source, buyers often find it more believable.',
    }),
    sl('example', 'Worked example 1: name the tool', {
      b: 'An imagined jungle lodge uses all four tools.',
      bl: ['Step 1: ask whether it is **paid**.', 'Step 2: ask whether it is **personal**.', 'Step 3: ask whether it is a **short-term incentive**.'],
      v: table(['What the imagined lodge did', 'Tool'], [['Paid pages in two travel magazines', 'Advertising'], ['Free third night in summer', 'Sales promotion'], ['Manager met travel agents one by one', 'Personal selling'], ['A wildlife channel filmed its solar cottages, unpaid', 'Publicity']], 'Worked table: four promotion activities of an imagined jungle lodge and the tool each represents', 'Paid, personal, short-term: three questions sort the tools.'),
      n: 'Paid pages in travel magazines are advertising. A free third night in summer is a short-term incentive, so sales promotion. The manager meeting agents one by one is personal selling. And a wildlife channel filming the lodge at no cost is publicity.',
    }),
    sl('example', 'Worked example 2: recommend a tool', {
      b: 'Four imagined cases need different tools.',
      bl: ['Step 1: how **many** buyers, and how **spread out**?', 'Step 2: how **technical** or costly is the product?', 'Step 3: how **quickly** are sales needed?'],
      v: vToolEx,
      n: 'Costly custom gears for a few tractor makers need personal selling. A new flavour for a whole state needs advertising, to reach many quickly. Old bedsheets that must be cleared need sales promotion, for a quick push. A lodge with a good green story can seek publicity.',
    }),
    sl('check', 'Quick check: buy two, get one', {
      b: 'True or false: a buy-two-get-one-free offer on doormats is sales promotion.',
      chk: 'tf_sp',
      n: 'Is it a short-term incentive to buy now?',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up Part 2. The promotion mix combines advertising, sales promotion, personal selling and publicity to inform, persuade and remind buyers. Advertising is impersonal and wide-reaching; personal selling is face to face; sales promotion gives a short-term push; publicity is unpaid news. The right tool depends on the buyers and the product.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['Use three questions: **paid? personal? short-term?**', 'Compare tools on clear **bases**.', 'When recommending, give a **reason** tied to the case.', 'Do not call publicity **paid**.'],
      v: vPromoGrid,
      n: 'Final tips. To identify a tool, ask whether it is paid, whether it is personal, and whether it is a short-term incentive. Compare tools on clear bases. When recommending a tool, give a reason from the case. And remember that publicity is never paid for.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Marketing Mix: Place and Promotion — notes',
  sections: [
    {
      h: '1. Channels of distribution',
      t: 1,
      b: 'A **channel of distribution** is the route, with its **middlemen**, through which goods pass from the producer to the final buyer. Middlemen (wholesalers, retailers, agents) break bulk, store, give credit, assemble assortments and reach scattered buyers.\n\n**Levels:**\n- **Zero-level (direct):** Manufacturer → Consumer (own shops, door-to-door, own website).\n- **One-level:** Manufacturer → Retailer → Consumer.\n- **Two-level:** Manufacturer → Wholesaler → Retailer → Consumer.\n\n**Factors in choosing a channel:**\n- **Product** — perishability, unit value, technical nature, standard or made to order.\n- **Market** — number and size of buyers, their location, size of orders, consumer or industrial buyers.\n- **Company** — financial strength, desire for control, own sales staff.\n- **Competition** — channels used by rivals.',
      terms: [['Channel of distribution', 'Route of goods from producer to buyer, with middlemen.'], ['Zero-level channel', 'Direct sale from producer to consumer.'], ['Two-level channel', 'Producer → wholesaler → retailer → consumer.']],
      v: vChannels,
      vs: [vFactors],
    },
    {
      h: '2. Physical distribution (meaning only)',
      t: 2,
      b: '**Physical distribution** covers the activities involved in moving goods physically from the producer to buyers at the right place and time.\n\n**Elements:**\n- **Order processing** — receiving, checking and preparing orders for dispatch.\n- **Transportation** — moving goods to where buyers are.\n- **Warehousing** — storing goods, often near markets, until needed.\n- **Inventory control** — maintaining the right level of stock: enough to meet orders without locking up too much money.',
      terms: [['Physical distribution', 'Moving goods physically to buyers at the right place and time.'], ['Inventory control', 'Keeping stock at the right level.']],
      v: vPd,
      vs: [vPdTable],
    },
    {
      h: '3. Promotion mix',
      t: 3,
      b: '**Promotion** is communication by a firm to inform, persuade and remind buyers about its products. The **promotion mix** is the combination of **advertising, sales promotion, personal selling and publicity** (public relations).\n\n**Roles:** **inform** (new products), **persuade** (choose this over rivals), **remind** (keep a known product in mind).',
      terms: [['Promotion mix', 'Advertising, sales promotion, personal selling and publicity combined.']],
      v: vPromoRoles,
      vs: [vPromoGrid],
    },
    {
      h: '4. The four promotion tools and their differences',
      t: 4,
      b: '**Advertising** — a paid, impersonal form of communication about a product by an **identified sponsor**. Features: paid, impersonal, one-way, wide reach, low cost per person. Objectives: inform, persuade, remind, build image, support salespeople.\n\n**Sales promotion** — **short-term incentives** to encourage immediate buying: discounts, coupons, free samples, contests, quantity offers, gifts. It supplements advertising and personal selling.\n\n**Personal selling** — **face-to-face, two-way** presentation to prospective buyers to make a sale. Features: personal contact, flexibility, relationship building, immediate feedback; high cost per buyer.\n\n**Publicity** — **unpaid, non-personal** coverage of a firm or product in the media; not controlled by the firm but highly credible.\n\n**Choosing a tool:** few buyers or technical, costly products → personal selling; a large, scattered market → advertising; quick sales or clearing stock → sales promotion; a newsworthy story → publicity.',
      terms: [['Advertising', 'Paid, impersonal communication by an identified sponsor.'], ['Sales promotion', 'Short-term incentives to buy now.'], ['Personal selling', 'Face-to-face, two-way selling.'], ['Publicity', 'Unpaid media coverage the firm does not control.']],
      v: vTools,
      vs: [vAdvPs, vSpPub, vToolEx],
    },
  ],
  tips: '**Common mistakes**\n- Counting the manufacturer or the consumer as a level of a channel.\n- Calling a channel with only a retailer two-level.\n- Calling publicity paid, or calling a free sample advertising.\n- Recommending a tool without a reason from the case.\n\n**How marks are usually awarded**\n- 1 mark: correct channel, element or tool.\n- 2–3 marks: each point named and explained, or each basis of difference stated for both tools.\n- 5 marks: parts answered separately; factors applied to the firm; tools applied with examples.\n- Case questions: quote the clue, name the idea, explain or recommend.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['**Channel of distribution**', 'Route of goods from producer to buyer, with its middlemen.', 'definition', 1],
  ['**Zero-level channel**', 'Manufacturer → consumer; no middleman.', 'definition', 1],
  ['**One-level channel**', 'Manufacturer → retailer → consumer.', 'definition', 1],
  ['**Two-level channel**', 'Manufacturer → wholesaler → retailer → consumer.', 'definition', 1],
  ['Level of a channel', 'The number of middlemen in it.', 'fact', 1],
  ['Functions of middlemen', 'Break bulk, store, give credit, reach scattered buyers.', 'concept', 1],
  ['Four groups of channel factors', 'Product, market, company, competition.', 'exam-tip', 1],
  ['Perishable goods need…', 'Short channels.', 'fact', 1],
  ['A few large buyers in one place suit…', 'Direct selling.', 'fact', 1],
  ['A small firm with little capital usually uses…', 'Middlemen (indirect channels).', 'fact', 1],
  ['**Physical distribution**', 'Moving goods physically to buyers at the right place and time.', 'definition', 2],
  ['Four elements of physical distribution', 'Order processing, transportation, warehousing, inventory control.', 'exam-tip', 2],
  ['**Order processing**', 'Receiving, checking and preparing orders for dispatch.', 'definition', 2],
  ['**Inventory control**', 'Keeping the right level of stock.', 'definition', 2],
  ['**Promotion mix**', 'Advertising, sales promotion, personal selling, publicity.', 'definition', 3],
  ['Three roles of promotion', 'Inform, persuade, remind.', 'exam-tip', 3],
  ['**Advertising**', 'Paid, impersonal message by an identified sponsor.', 'definition', 4],
  ['**Sales promotion**', 'Short-term incentives to buy now.', 'definition', 4],
  ['**Personal selling**', 'Face-to-face, two-way presentation to buyers.', 'definition', 4],
  ['**Publicity**', 'Unpaid media coverage, not controlled by the firm.', 'definition', 4],
  ['Advertising vs personal selling', 'Impersonal, one-way, cheap per person vs face to face, two-way, costly per person.', 'concept', 4],
  ['Sales promotion vs publicity', 'Paid, controlled, short-term vs unpaid, media-controlled, credible.', 'concept', 4],
  ['Examples of sales promotion', 'Coupons, free samples, discounts, contests, quantity offers.', 'fact', 4],
  ['Best tool for costly technical goods sold to a few buyers', 'Personal selling.', 'exam-tip', 4],
  ['Best tool for reaching a large, scattered market fast', 'Advertising.', 'exam-tip', 4],
  ['Best tool for clearing old stock quickly', 'Sales promotion.', 'exam-tip', 4],
  ['Why is publicity credible?', 'It comes from independent media, not the firm.', 'concept', 4],
  ['Three questions to sort promotion tools', 'Paid? Personal? Short-term incentive?', 'exam-tip', 4],
  ['Case routine', 'Quote the clue, name the channel, element or tool, explain or recommend.', 'exam-tip', 1],
]);

// ---------------------------------------------------------------- tests (ISC class defaults, item for item)
const T_SHORT = test({
  kind: 'short',
  blueprint: 'isc-12-default-chapter-test-short',
  title: 'Chapter test (short) — Marketing Mix: Place and Promotion',
  duration: 50,
  sections: [
    { id: 'A', title: 'Section A - Objective (5 marks)', instr: 'Answer all questions. Multiple-choice and assertion-reason items carry 1 mark each.', items: ['m_one', 'm_pd_order', 'm_publicity', 'm_sp', 'ar_channel'] },
    { id: 'B', title: 'Section B - Short answer (4 marks)', instr: 'Answer both questions. Internal choice in the second question.', items: ['s_adv_ps', { attempt: 1, keys: ['s_channel_types', 's_pd'] }] },
    { id: 'C', title: 'Section C - Short answer (6 marks)', instr: 'Answer both questions. Internal choice in the second question.', items: ['s3_ps_features', { attempt: 1, keys: ['s3_channel_levels', 's3_promo_roles'] }] },
    { id: 'D', title: 'Section D - Long answer (5 marks)', instr: 'Answer the question. It is set in parts.', items: ['l_channel'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'isc-12-default-chapter-test-long',
  title: 'Chapter test (long) — Marketing Mix: Place and Promotion',
  duration: 100,
  sections: [
    { id: 'A', title: 'Section A - Objective (12 marks)', instr: 'Answer all questions. Multiple-choice and assertion-reason items carry 1 mark each.', items: ['m_two', 'm_product_factor', 'm_market_factor', 'm_company_factor', 'm_pd_warehouse', 'm_pd_inventory', 'm_promo_remind', 'm_ps', 'm_adv_vs_ps', 'm_recommend', 'ar_middlemen', 'ar_publicity'] },
    { id: 'B', title: 'Section B - Short answer (6 marks)', instr: 'Answer all three questions. Internal choice in the last question.', items: ['s_channel_factor_product', 's_sp_publicity', { attempt: 1, keys: ['s_promo_mix', 's_recommend'] }] },
    { id: 'C', title: 'Section C - Short answer (12 marks)', instr: 'Answer all four questions. Internal choice in the last question.', items: ['s3_channel_factors', 's3_pd', 's3_recommend3', { attempt: 1, keys: ['s3_adv_objectives', 's3_compare'] }] },
    { id: 'D', title: 'Section D - Long answer (10 marks)', instr: 'Answer both questions. Internal choice in the second question. Each is set in parts.', items: ['l_adv_ps', { attempt: 1, keys: ['l_promo', 'l_place'] }] },
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
    syllabus: 'topics t01–t04 of isc-12-commerce-ch15 (channels of distribution, their levels and the factors in choosing one; physical distribution and its elements, meaning only; the promotion mix; advertising, sales promotion, personal selling and publicity: meaning, features, objectives and differences)',
    originality: 'every firm, person and case is imagined and written by SOYL and labelled; no ISC or CBSE textbook text, illustration or exercise and no CISCE specimen or board item reused (D-036); firms, places and set-ups differ from the CBSE 12 Business Studies chapter on marketing',
    data: 'no computed figures; all examples are imagined and labelled',
    facts: 'stable textbook concepts only; no dated figures',
    gate: 'schema, pipeline lint, deterministic verify, word limits, narration and answer-leak checks run clean in this build',
  },
});
