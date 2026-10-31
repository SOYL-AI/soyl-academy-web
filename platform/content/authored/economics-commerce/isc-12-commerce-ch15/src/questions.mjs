// ISC 12 Commerce, ch15 Marketing Mix: Place and Promotion — question bank. Every firm, person and situation is
// imagined and written by SOYL and labelled as such; no ISC or CBSE textbook illustration or exercise and no CISCE
// specimen or board item is reused (D-036). Firms, places and set-ups differ from the CBSE 12 Business Studies
// chapter on marketing.
import { Q, mcq, ar, tf, fb, match, short, long, caseQ, child } from './lib.mjs';

const S2 = [30, 50];
const S3 = [50, 75];
const L5 = [100, 150];

// ================================================================ t01 Channels of distribution
Q('m_channel_def', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Kolar Silk Reelers, an imagined firm in Kolar, asks which route its silk yarn should take, and through which middlemen, to reach the weavers who use it. It is choosing its',
  opts: ['channel of distribution', 'promotion mix', 'pricing strategy', 'brand mark'],
  sol: 'The route, with any middlemen, by which goods pass from producer to user is the channel of distribution.',
}));
Q('m_zero', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Shimsha Jaggery Works, an imagined producer in Mandya, sells its jaggery blocks only at its own farm-gate shop and from its own van that goes door to door. Its channel of distribution is',
  opts: ['zero-level (direct)', 'one-level', 'two-level', 'three-level'],
  sol: 'With no middleman between producer and consumer, the channel is zero-level, or direct.',
}));
Q('m_one', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Pratishthan Paithani, an imagined saree weaver in Aurangabad, sells its sarees to boutique owners in Pune and Mumbai, who sell them to their customers. Its channel is',
  opts: ['one-level', 'zero-level', 'two-level', 'direct marketing'],
  sol: 'One middleman (the retailer) between producer and consumer makes a one-level channel.',
}));
Q('m_two', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Each carton of Pearl City Macaroons, an imagined bakery in Thoothukudi, passes from the bakery to a district stockist, then to a sweet shop, and finally to the customer. This is a',
  opts: ['two-level channel', 'one-level channel', 'zero-level channel', 'direct channel'],
  sol: 'Two middlemen, a wholesaler (stockist) and a retailer, make a two-level channel.',
}));
Q('m_product_factor', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: 'Aliyar Coconut Water, an imagined firm in Pollachi, bottles tender-coconut water that spoils within two days. Which channel suits it best, and why?',
  opts: ['A short channel, because the product is highly perishable', 'A long channel, because the product is cheap', 'A long channel, because buyers are few', 'Any channel, because the product does not affect the choice'],
  sol: 'Perishable products must reach buyers quickly, so they need short channels with few middlemen.',
}));
Q('m_market_factor', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: 'Kolar Silk Reelers (imagined) sells all its yarn to twelve large weaving mills located in one town. Which factor most supports selling directly to them?',
  opts: ['Market factor: a few large buyers concentrated in one place', 'Product factor: the yarn is perishable', 'Company factor: the firm is very small', 'Competitive factor: rivals use long channels'],
  sol: 'When buyers are few, large and close together, direct selling is cheap and practical; this is a market-related factor.',
}));
Q('m_company_factor', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'A new, small imagined snack maker has little capital and no sales staff of its own. Which channel is it most likely to prefer?',
  opts: ['An indirect channel using wholesalers and retailers', 'Its own chain of retail shops', 'Direct selling through its own sales force across the state', 'No channel at all'],
  sol: 'A firm with limited funds and staff relies on middlemen; financial strength is a company-related factor.',
}));
Q('m_competition_factor', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'All the rival chocolate makers in Ooty sell through hotel gift shops, so Doddabetta Chocolates, an imagined chocolatier there, also places its chocolates in those shops. Which factor influenced its choice of channel?',
  opts: ['Competition', 'Perishability of the product', 'Government regulation', 'Size of the order'],
  sol: 'Following the channels that rivals use, so as to be found where buyers look, is a competitive factor.',
}));
Q('m_middlemen', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'A wholesaler buys bedsheets in bulk from Amaravathi Home Linen, an imagined maker in Karur, stores them, sells them in small lots to shops and gives the shops credit. These services show that middlemen',
  opts: ['perform useful functions in distribution', 'only add to the price', 'are needed only for perishable goods', 'replace the need for promotion'],
  sol: 'Middlemen break bulk, store, finance and spread goods widely; they perform useful functions.',
}));
Q('ar_channel', ar({
  t: 1, d: 3, c: 'understanding',
  a: 'Perishable goods generally need short channels of distribution.',
  r: 'Each extra middleman adds time before goods reach the consumer.',
  key: 'a',
  sol: 'Both are true, and the reason explains the assertion: fewer middlemen mean quicker delivery, which perishables need.',
}));
Q('ar_middlemen', ar({
  t: 1, d: 3, c: 'analysis',
  a: 'A small firm with limited funds often uses wholesalers and retailers to sell its goods.',
  r: 'Middlemen add only cost and perform no useful function.',
  key: 'c',
  sol: 'The assertion is true. The reason is false: middlemen store goods, break bulk, give credit and reach many buyers.',
}));
Q('tf_channel', tf({
  t: 1, d: 1, c: 'understanding',
  stem: 'In a zero-level channel, goods pass through one retailer before reaching the consumer.',
  ans: false,
  sol: 'False. A zero-level channel has no middleman; one retailer makes it a one-level channel.',
}));
Q('fb_channel', fb({
  t: 1, d: 3, c: 'analysis',
  stem: 'Complete the analogy. Manufacturer to consumer directly : Zero-level channel :: Manufacturer to retailer to consumer : ___',
  acc: [['One-level channel', 'one-level', 'one level', 'one level channel']],
  sol: 'No middleman makes a zero-level channel; one middleman, the retailer, makes a one-level channel.',
}));
Q('mt_factors', match({
  t: 1, d: 3, c: 'application', marks: 2,
  stem: 'Match each imagined situation with the factor that most affects the choice of channel.',
  pairs: [
    ['Coconut water that spoils in two days', 'Product factor'],
    ['Twelve buyer mills, all in one town', 'Market factor'],
    ['A new firm with little capital and no sales staff', 'Company factor'],
    ['Every rival sells through hotel gift shops', 'Competitive factor'],
  ],
  sol: 'Perishability is about the product; few concentrated buyers are a market factor; funds and staff are company factors; rivals\' channels are competitive factors.',
}));
Q('s_channel_types', short({
  t: 1, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'Show a zero-level and a two-level channel of distribution as simple flows, with an imagined example of each.',
  model: '**Zero-level:** Manufacturer → Consumer, as when a **jaggery maker** sells from its own farm-gate shop.\n**Two-level:** Manufacturer → Wholesaler → Retailer → Consumer, as when a **macaroon bakery** supplies stockists, who supply sweet shops.',
  sol: 'Both flows shown correctly with examples.',
  scheme: [['Zero-level with example', 1], ['Two-level with example', 1]],
}));
Q('s_channel_factor_product', short({
  t: 1, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'Explain two product-related factors that Aliyar Coconut Water (imagined), Pollachi, should consider while choosing its channel of distribution.',
  model: '1. **Perishability:** the water **spoils in two days**, so it needs a **short channel** and quick delivery.\n2. **Unit value and bulk:** bottles are **cheap and bulky**, so selling each one directly is costly; nearby **retailers** can carry them.',
  sol: 'Two product factors (perishability, unit value, bulk, technical nature, standard or custom) applied.',
  scheme: [['First factor', 1], ['Second factor', 1]],
}));
Q('s3_channel_factors', short({
  t: 1, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'Hampi Denim, an imagined jeans maker in Ballari, wants to sell across South India. Explain one product factor, one market factor and one company factor it should consider while choosing its channel.',
  model: '1. **Product:** jeans are **durable, standard and low in unit value**, so they can pass through **wholesalers and retailers** without harm.\n2. **Market:** buyers are **many and spread over five states**, so a **longer channel** reaches them more cheaply than direct selling.\n3. **Company:** if the firm has **limited funds** and no sales force, it should rely on **middlemen** rather than open its own shops.',
  sol: 'One product, one market and one company factor, each applied.',
  scheme: [['Product factor', 1], ['Market factor', 1], ['Company factor', 1]],
}));
Q('s3_channel_levels', short({
  t: 1, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Describe zero-level, one-level and two-level channels of distribution, showing the flow of goods in each.',
  model: '1. **Zero-level (direct):** Manufacturer → Consumer. The producer sells **without any middleman**, through its own shop, agents or website.\n2. **One-level:** Manufacturer → Retailer → Consumer. **One middleman**, the retailer, sells to consumers.\n3. **Two-level:** Manufacturer → Wholesaler → Retailer → Consumer. **Two middlemen**; usual for goods bought often by many buyers.',
  sol: 'Each channel described with its flow.',
  scheme: [['Zero-level', 1], ['One-level', 1], ['Two-level', 1]],
}));
Q('l_channel', long({
  t: 1, d: 3, c: 'application', marks: 5, wl: L5,
  stem: '(a) What is a channel of distribution? [1]\n(b) Doddabetta Chocolates (imagined), Ooty, makes hand-made chocolates that melt in heat, sells mainly to tourists, is a small family firm and faces rivals who all use hotel gift shops. Explain four factors that should guide its choice of channel. [4]',
  model: '(a) A **channel of distribution** is the **route through which goods pass** from the producer to the final buyer, together with the **middlemen** involved.\n\n(b) 1. **Product:** the chocolates **melt in heat** and are fragile, so a **short channel** with careful handling is needed.\n2. **Market:** buyers are **tourists in and around Ooty**, a concentrated market that the firm\'s own shop and nearby outlets can reach.\n3. **Company:** as a **small family firm** with limited funds, it cannot run many shops, so it needs a few **trusted retailers**.\n4. **Competition:** rivals sell in **hotel gift shops**, where tourists look for chocolates, so it should be present there too.',
  sol: 'Meaning; product, market, company and competitive factors applied.',
  scheme: [['(a) Meaning', 1], ['(b) Four factors applied', 4]],
}));

// ================================================================ t02 Physical distribution (meaning only)
Q('m_pd_meaning', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Taking an order, storing goods, keeping the right stock and moving goods to buyers at Amaravathi Home Linen (imagined) are together called',
  opts: ['physical distribution', 'sales promotion', 'channel of distribution', 'market research'],
  sol: 'Activities that physically move goods from producer to buyer make up physical distribution.',
}));
Q('m_pd_order', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'When a sweet shop in Madurai sends an order, staff at Pearl City Macaroons (imagined) check stock, raise the invoice, pack the cartons and confirm the dispatch date. Which element of physical distribution is this?',
  opts: ['Order processing', 'Warehousing', 'Inventory control', 'Promotion'],
  sol: 'Receiving, checking and preparing an order for dispatch is order processing.',
}));
Q('m_pd_warehouse', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'Amaravathi Home Linen (imagined), Karur, keeps finished bedsheets in rented godowns in Delhi and Kolkata so that northern and eastern dealers get supplies quickly. Which element of physical distribution is this?',
  opts: ['Warehousing', 'Order processing', 'Transportation', 'Personal selling'],
  sol: 'Holding goods in storage near markets until needed is warehousing.',
}));
Q('m_pd_inventory', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'Hampi Denim (imagined) kept running out of popular sizes while unpopular sizes piled up. It now fixes a minimum and a maximum stock level for each size. Which element of physical distribution has it improved?',
  opts: ['Inventory control', 'Transportation', 'Order processing', 'Advertising'],
  sol: 'Deciding and maintaining the right level of stock for each item is inventory control.',
}));
Q('m_pd_transport', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Doddabetta Chocolates (imagined) sends its chocolates to Chennai in refrigerated vans instead of ordinary trucks. This decision concerns which element of physical distribution?',
  opts: ['Transportation', 'Inventory control', 'Warehousing', 'Order processing'],
  sol: 'Choosing how goods are moved, by which means and in what conditions, is transportation.',
}));
Q('ar_pd', ar({
  t: 2, d: 3, c: 'understanding',
  a: 'Good inventory control avoids both running out of stock and holding too much stock.',
  r: 'Too much stock locks up money, while too little loses sales.',
  key: 'a',
  sol: 'Both are true, and the reason explains the assertion: inventory control balances the cost of excess stock against the loss from stock-outs.',
}));
Q('tf_pd', tf({
  t: 2, d: 1, c: 'recall',
  stem: 'The elements of physical distribution include order processing, transportation, warehousing and inventory control.',
  ans: true,
  sol: 'True. These are the four elements of physical distribution.',
}));
Q('fb_pd', fb({
  t: 2, d: 1, c: 'recall',
  stem: 'Keeping goods in godowns near markets until they are needed is the element of physical distribution called ___.',
  acc: [['warehousing', 'storage', 'warehouse']],
  sol: 'This is warehousing.',
}));
Q('s_pd', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'What is meant by physical distribution? Name its four elements.',
  model: '**Physical distribution** covers all the activities needed to **move goods physically** from the producer to the buyer, at the **right place and time**. Its elements are **order processing, transportation, warehousing and inventory control**.',
  sol: 'Meaning plus the four elements.',
  scheme: [['Meaning', 1], ['Four elements', 1]],
}));
Q('s3_pd', short({
  t: 2, d: 2, c: 'application', marks: 3, wl: S3,
  stem: 'Explain any three elements of physical distribution, with an example of each from Amaravathi Home Linen (imagined), Karur.',
  model: '1. **Order processing:** dealers\' **orders are checked, invoiced and packed** quickly, so supplies leave on time.\n2. **Warehousing:** **godowns in Delhi and Kolkata** hold stock near dealers, cutting delivery time.\n3. **Inventory control:** the firm keeps the **right number of each design** in stock, avoiding both shortages and piles of unsold sheets.',
  sol: 'Any three elements with examples (meaning-level explanation).',
  scheme: [['First element', 1], ['Second element', 1], ['Third element', 1]],
}));
Q('l_place', long({
  t: [1, 2], d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: '(a) Explain zero-level, one-level and two-level channels of distribution, with an imagined example of each. [3]\n(b) Name the four elements of physical distribution and state the meaning of any two. [2]',
  model: '(a) 1. **Zero-level:** the producer sells **directly** to the consumer, as a jaggery maker selling from its **own farm-gate shop**.\n2. **One-level:** one middleman, the **retailer**, as a saree weaver selling through **boutiques** in big cities.\n3. **Two-level:** a **wholesaler and a retailer**, as a bakery whose macaroons go to **district stockists** and then to sweet shops.\n\n(b) The elements are **order processing, transportation, warehousing and inventory control**. **Transportation** means **moving goods** from where they are made to where buyers are. **Inventory control** means keeping the **right level of stock**, neither too much nor too little.',
  sol: 'Three channels with examples; four elements named with two meanings.',
  scheme: [['(a) Three channels with examples', 3], ['(b) Four elements named', 1], ['(b) Two meanings', 1]],
}));

// ================================================================ t03 Promotion mix
Q('m_promo_mix', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Pedana Kalamkari Prints, an imagined textile firm in Machilipatnam, uses newspaper advertisements, a festival discount, salespeople at craft exhibitions and a news story about its artisans. Together these make up its',
  opts: ['promotion mix', 'channel of distribution', 'physical distribution', 'product mix'],
  sol: 'The combination of advertising, sales promotion, personal selling and publicity used to inform and persuade buyers is the promotion mix.',
}));
Q('m_promo_remind', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'Bekal Beach Resort, an imagined resort in Kasaragod, sends every past guest a short message each monsoon with a photo of the beach, so that its name stays in their minds. The main role of this promotion is to',
  opts: ['remind', 'inform about a new product', 'set the price', 'distribute the service'],
  sol: 'Keeping an existing product in the minds of past buyers is the reminding role of promotion.',
}));
Q('m_promo_inform', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'Eluru Agro Sprayers, an imagined firm in Eluru, launches a battery-powered sprayer that local farmers have never seen. At this stage, the main role of its promotion is to',
  opts: ['inform farmers that the product exists and what it does', 'remind farmers of a product they already use', 'reduce the price of the sprayer', 'replace the dealers'],
  sol: 'For a new product, promotion first informs buyers about it and its uses.',
}));
Q('ar_promo', ar({
  t: 3, d: 3, c: 'understanding',
  a: 'Even a good product at a fair price needs promotion.',
  r: 'Buyers cannot buy a product they do not know about.',
  key: 'a',
  sol: 'Both are true, and the reason explains the assertion: promotion makes buyers aware of the product and persuades them to try it.',
}));
Q('tf_promo', tf({
  t: 3, d: 1, c: 'understanding',
  stem: 'Publicity is one of the elements of the promotion mix.',
  ans: true,
  sol: 'True. The promotion mix comprises advertising, sales promotion, personal selling and publicity (public relations).',
}));
Q('fb_promo', fb({
  t: 3, d: 1, c: 'recall',
  stem: 'Promotion has three roles: to inform buyers, to persuade them and to ___ them about products they already know.',
  acc: [['remind', 'reminding']],
  sol: 'The three roles are to inform, persuade and remind.',
}));
Q('s_promo_mix', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'What is meant by the promotion mix? Name its elements.',
  model: 'The **promotion mix** is the **combination of tools** a firm uses to **inform, persuade and remind** buyers about its products. Its elements are **advertising, sales promotion, personal selling and publicity** (public relations).',
  sol: 'Meaning plus the four elements.',
  scheme: [['Meaning', 1], ['Elements', 1]],
}));
Q('s3_promo_roles', short({
  t: 3, d: 2, c: 'application', marks: 3, wl: S3,
  stem: 'Explain the three roles of promotion — informing, persuading and reminding — with an example of each from Bekal Beach Resort (imagined), Kasaragod.',
  model: '1. **Informing:** telling people that the resort has **opened a new ayurveda wing** and what it offers.\n2. **Persuading:** showing **guest reviews and a monsoon package** to convince families to book now rather than elsewhere.\n3. **Reminding:** sending **past guests a beach photo** each year so the resort stays in their minds for the next holiday.',
  sol: 'Each role explained with a resort example.',
  scheme: [['Informing', 1], ['Persuading', 1], ['Reminding', 1]],
}));

// ================================================================ t04 Advertising, sales promotion, personal selling, publicity
Q('m_adv', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'Meenachil Rubber Mats, an imagined firm in Kottayam, pays a television channel to show a short film about its mats, with the firm\'s name shown at the end. This promotion tool is',
  opts: ['advertising', 'publicity', 'personal selling', 'sales promotion'],
  sol: 'A paid, impersonal message about a product by an identified sponsor is advertising.',
}));
Q('m_sp', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'During the Onam fair, every buyer of a Meenachil mat (imagined brand) gets a coupon worth ₹100 off the next purchase. This is',
  opts: ['sales promotion', 'advertising', 'publicity', 'personal selling'],
  sol: 'Short-term incentives such as coupons that encourage buying now are sales promotion.',
}));
Q('m_sp_sample', mcq({
  t: 4, d: 2, c: 'application',
  stem: 'At a food fair, Pearl City Macaroons (imagined) hands out small free packs of a new cashew flavour so that visitors can taste it. Which tool, and which technique, is this?',
  opts: ['Sales promotion, through free samples', 'Advertising, through a paid message', 'Publicity, through a news story', 'Personal selling, through a sales call'],
  sol: 'Free samples given to induce trial are a sales promotion technique.',
}));
Q('m_ps', mcq({
  t: 4, d: 2, c: 'application',
  stem: 'A sales engineer of Eluru Agro Sprayers (imagined) visits each farmers\' cooperative, shows the sprayer working in a field, answers questions and books orders on the spot. This promotion tool is',
  opts: ['personal selling', 'advertising', 'publicity', 'sales promotion'],
  sol: 'Face-to-face, two-way presentation to prospective buyers with the aim of making a sale is personal selling.',
}));
Q('m_publicity', mcq({
  t: 4, d: 3, c: 'application',
  stem: 'A national newspaper, on its own initiative, publishes a feature on the women artisans of Pedana Kalamkari Prints (imagined). The firm paid nothing and did not control what was written. This is',
  opts: ['publicity', 'advertising', 'sales promotion', 'personal selling'],
  sol: 'Unpaid, non-personal coverage in the media that the firm does not control is publicity.',
}));
Q('m_adv_vs_ps', mcq({
  t: 4, d: 3, c: 'analysis',
  stem: 'A student compares the television film of Meenachil Rubber Mats (imagined) with the field visits of the Eluru Agro Sprayers engineer. Which difference is correct?',
  opts: ['Advertising is impersonal and one-way; personal selling is face-to-face and two-way', 'Advertising is face-to-face; personal selling is impersonal', 'Both are unpaid forms of promotion', 'Personal selling reaches millions at a low cost per person'],
  sol: 'Advertising sends one message to many without dialogue; personal selling allows conversation and immediate feedback, at a high cost per buyer.',
}));
Q('m_recommend', mcq({
  t: 4, d: 3, c: 'analysis',
  stem: 'Hosur Precision Gears, an imagined firm, sells costly gears made to each buyer\'s drawings to a few tractor makers. Which promotion element suits it best?',
  opts: ['Personal selling', 'Television advertising', 'Coupons and contests', 'Free samples at fairs'],
  sol: 'Technical, costly, custom products sold to a few buyers need explanation and negotiation, which personal selling provides.',
}));
Q('m_recommend2', mcq({
  t: 4, d: 3, c: 'analysis',
  stem: 'Pearl City Macaroons (imagined) wants lakhs of buyers across Tamil Nadu to learn about its new flavour within a month. Which promotion element suits this aim best?',
  opts: ['Advertising', 'Personal selling', 'Publicity alone', 'Waiting for word of mouth'],
  sol: 'Advertising reaches a large, scattered audience quickly at a low cost per person.',
}));
Q('ar_ps', ar({
  t: 4, d: 3, c: 'analysis',
  a: 'Personal selling is costly for each buyer reached.',
  r: 'Advertising carries the name of an identified sponsor.',
  key: 'b',
  sol: 'Both are true, but the identified sponsor in advertising has nothing to do with why personal selling is costly; that is because a salesperson meets buyers one at a time.',
}));
Q('ar_publicity', ar({
  t: 4, d: 3, c: 'analysis',
  a: 'Publicity is a paid form of promotion that the firm fully controls.',
  r: 'Sales promotion aims mainly at long-term brand building rather than immediate sales.',
  key: 'd',
  sol: 'Both statements are false. Publicity is unpaid and not controlled by the firm; sales promotion offers short-term incentives to boost immediate sales.',
}));
Q('tf_sp', tf({
  t: 4, d: 1, c: 'understanding',
  stem: 'A "buy two, get one free" offer on doormats is an example of sales promotion.',
  ans: true,
  sol: 'True. It is a short-term incentive to buy now, which is sales promotion.',
}));
Q('tf_publicity', tf({
  t: 4, d: 1, c: 'understanding',
  stem: 'Publicity is always paid for by the firm that it describes.',
  ans: false,
  sol: 'False. Publicity is unpaid; the media cover the firm because the story is newsworthy.',
}));
Q('fb_adv', fb({
  t: 4, d: 3, c: 'analysis',
  stem: 'Complete the analogy. Face-to-face, two-way communication with buyers : Personal selling :: Paid, impersonal, one-way message by an identified sponsor : ___',
  acc: [['Advertising', 'advertisement']],
  sol: 'Personal selling is face-to-face and two-way; advertising is paid, impersonal and one-way, with an identified sponsor.',
}));
Q('mt_tools', match({
  t: 4, d: 2, c: 'application', marks: 2,
  stem: 'Match each activity of imagined firms with the promotion tool it represents.',
  pairs: [
    ['A paid film about rubber mats on television', 'Advertising'],
    ['A ₹100 coupon on the next purchase', 'Sales promotion'],
    ['An engineer demonstrating a sprayer to a cooperative', 'Personal selling'],
    ['An unpaid newspaper feature on artisans', 'Publicity'],
  ],
  sol: 'A paid impersonal message is advertising; a short-term incentive is sales promotion; a face-to-face demonstration is personal selling; unpaid media coverage is publicity.',
}));
Q('s_adv_ps', short({
  t: 4, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Distinguish between advertising and personal selling on the basis of (i) nature of communication and (ii) cost per buyer reached.',
  model: '(i) **Advertising** is **impersonal and one-way**, a single message to many; **personal selling** is **face-to-face and two-way**, so doubts are answered at once.\n(ii) Advertising has a **low cost per buyer** reached; personal selling has a **high cost per buyer**, as each meeting needs a salesperson\'s time.',
  sol: 'Both bases correctly contrasted.',
  scheme: [['(i) Nature of communication', 1], ['(ii) Cost per buyer', 1]],
}));
Q('s_sp_publicity', short({
  t: 4, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Distinguish between sales promotion and publicity on the basis of (i) payment and control and (ii) purpose.',
  model: '(i) **Sales promotion** is **paid for and controlled** by the firm; **publicity** is **unpaid**, and the firm cannot control what the media say.\n(ii) Sales promotion aims at **immediate sales** through short-term incentives; publicity builds **awareness and credibility** through news.',
  sol: 'Both bases correctly contrasted.',
  scheme: [['(i) Payment and control', 1], ['(ii) Purpose', 1]],
}));
Q('s_recommend', short({
  t: 4, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: 'Recommend a suitable promotion element, with one reason, for (i) Hosur Precision Gears (imagined), selling custom gears to a few tractor makers, and (ii) Pearl City Macaroons (imagined), launching a new flavour for buyers across the state.',
  model: '(i) **Personal selling:** custom, **technical** gears for **a few buyers** need explanation and negotiation face to face.\n(ii) **Advertising:** it reaches a **large, scattered audience** quickly at a **low cost per person**.',
  sol: 'A suitable element with a sound reason for each.',
  scheme: [['(i) Personal selling with reason', 1], ['(ii) Advertising with reason', 1]],
}));
Q('s3_adv_objectives', short({
  t: 4, d: 2, c: 'application', marks: 3, wl: S3,
  stem: 'Explain three objectives of advertising, with an example of each from Doddabetta Chocolates (imagined), Ooty.',
  model: '1. **To inform:** tell tourists about a **new sugar-free chocolate** and where it is sold.\n2. **To persuade:** show why its **hand-made chocolates** are better than factory bars, so visitors choose them.\n3. **To build the brand and remind:** keep the **Doddabetta name** in buyers\' minds so they order online after going home.',
  sol: 'Three objectives (inform, persuade, remind, build image, support salespeople) with examples.',
  scheme: [['First objective', 1], ['Second objective', 1], ['Third objective', 1]],
}));
Q('s3_ps_features', short({
  t: 4, d: 2, c: 'application', marks: 3, wl: S3,
  stem: 'Explain three features of personal selling, using the sales engineer of Eluru Agro Sprayers (imagined) as an example.',
  model: '1. **Personal, two-way contact:** the engineer **talks face to face** with farmers and answers their doubts on the spot.\n2. **Flexibility:** he **adapts his demonstration** to each cooperative\'s crops and budget.\n3. **Relationship and immediate result:** he builds **trust over repeat visits** and can **book orders** at once.',
  sol: 'Three features (personal contact, two-way, flexibility, relationship, focus on prospects, immediate feedback) applied.',
  scheme: [['First feature', 1], ['Second feature', 1], ['Third feature', 1]],
}));
Q('s3_compare', short({
  t: 4, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Compare advertising, sales promotion and publicity on three bases: whether paid, how long the effect lasts, and the firm\'s control over the message.',
  model: '1. **Payment:** advertising and sales promotion are **paid** by the firm; publicity is **unpaid**.\n2. **Duration:** sales promotion gives a **short-term** push to sales; advertising and publicity build awareness over a **longer** period.\n3. **Control:** the firm **controls** the message in advertising and sales promotion, but **not** in publicity, which the media write.',
  sol: 'All three tools compared on each basis.',
  scheme: [['Payment', 1], ['Duration', 1], ['Control', 1]],
}));
Q('s3_recommend3', short({
  t: 4, d: 4, c: 'evaluation', marks: 3, wl: S3,
  stem: 'Recommend the most suitable promotion element, with a reason, for each imagined case: (i) a costly custom gear for a few tractor makers; (ii) a new macaroon flavour for buyers across a state; (iii) last season\'s bedsheet designs that must be cleared before new stock arrives.',
  model: '(i) **Personal selling:** a **technical, costly** product for **few buyers** needs face-to-face explanation and negotiation.\n(ii) **Advertising:** it informs a **large, scattered** market quickly at a **low cost per person**.\n(iii) **Sales promotion:** short-term offers such as **discounts or buy-two-get-one** move **old stock quickly**.',
  sol: 'A suitable element with a sound reason for each case.',
  scheme: [['(i) Personal selling with reason', 1], ['(ii) Advertising with reason', 1], ['(iii) Sales promotion with reason', 1]],
}));
Q('l_promo', long({
  t: [3, 4], d: 3, c: 'application', marks: 5, wl: L5,
  stem: '(a) What is meant by the promotion mix? [1]\n(b) Pedana Kalamkari Prints (imagined), Machilipatnam, wants to sell more of its hand-printed fabrics. Explain the four elements of the promotion mix, with a way the firm could use each. [4]',
  model: '(a) The **promotion mix** is the combination of **advertising, sales promotion, personal selling and publicity** a firm uses to **inform, persuade and remind** buyers.\n\n(b) 1. **Advertising:** a **paid, impersonal** message by an identified sponsor; for example, advertisements in **lifestyle magazines and online** showing its prints.\n2. **Sales promotion:** **short-term incentives** to buy now; for example, a **festival discount** or a free cushion cover with every bedspread.\n3. **Personal selling:** **face-to-face** presentation; for example, staff explaining the **hand-printing process** to buyers at craft exhibitions.\n4. **Publicity:** **unpaid** media coverage; for example, inviting journalists to meet the **women artisans**, which may lead to news features.',
  sol: 'Meaning; four elements explained and applied.',
  scheme: [['(a) Meaning', 1], ['(b) Four elements applied', 4]],
}));
Q('l_adv_ps', long({
  t: 4, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: '(a) Distinguish between advertising and personal selling on any three bases. [3]\n(b) Distinguish between sales promotion and publicity on any two bases. [2]',
  model: '(a) 1. **Nature:** advertising is **impersonal**; personal selling is **face-to-face**.\n2. **Flow of communication:** advertising is **one-way**; personal selling is **two-way**, so objections are answered at once.\n3. **Reach and cost:** advertising reaches **many people at a low cost per person**; personal selling reaches **few at a high cost per person**.\n\n(b) 1. **Payment and control:** sales promotion is **paid for and controlled** by the firm; publicity is **unpaid** and controlled by the media.\n2. **Purpose and duration:** sales promotion gives a **short-term push** to sales through incentives; publicity builds **credibility and awareness** through news over a longer time.',
  sol: 'Three bases for (a); two bases for (b).',
  scheme: [['(a) Three bases', 3], ['(b) Two bases', 2]],
}));

// ================================================================ case-based
Q('cb_place', caseQ({
  t: [1, 2], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the passage and answer the questions that follow. *(Imagined firm and people, written by SOYL for practice.)*',
  passage: '**Sirumalai Banana Chips (imagined), Dindigul**\n\nThe firm fries banana chips that stay crisp for about a month. It sells through stockists in each district, who supply bakeries and grocery shops. Its manager, Mr Pandian, has set up a small godown in Coimbatore, and now keeps a fixed reorder level for each pack size so that shops never run short and old stock does not go stale.',
  parts: [
    child('a', mcq({ t: 1, d: 2, c: 'application', stem: 'The firm\'s channel of distribution is', opts: ['two-level', 'zero-level', 'one-level', 'direct'], sol: 'Stockist (wholesaler) and shop (retailer): two middlemen, a two-level channel.' })),
    child('b', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Name the element of physical distribution shown by the Coimbatore godown.', model: '**Warehousing.**', sol: 'Holding stock near the market is warehousing.', scheme: [['Warehousing', 1]] })),
    child('c', short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Identify the element of physical distribution shown by the fixed reorder level, and state its purpose.', model: '**Inventory control.** It keeps **enough stock** to avoid shortages, but **not so much** that chips go stale.', sol: 'Inventory control with its purpose.', scheme: [['Element', 1], ['Purpose', 1]] }), [
      short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Explain one product factor that makes this channel workable for the firm.', model: 'The chips **stay crisp for a month** (fairly durable) and are **cheap**, so they can pass through **two middlemen** without spoiling.', sol: 'Product factor linked to the channel.', scheme: [['Product factor', 1], ['Linked to two-level channel', 1]] }),
    ]),
  ],
}));
Q('cb_promo', caseQ({
  t: [3, 4], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the passage and answer the questions that follow. *(Imagined firm and people, written by SOYL for practice.)*',
  passage: '**Erai Valley Lodges (imagined), Chandrapur**\n\nThe lodge runs jungle stays near a tiger reserve. It placed paid advertisements in two travel magazines. In the slow summer months it offered a free third night for every two nights booked. Its manager, Ms Wankhede, met travel agents in Nagpur one by one to explain the packages. A wildlife channel later filmed a programme on the lodge\'s solar-powered cottages, for which it paid nothing.',
  parts: [
    child('a', mcq({ t: 4, d: 2, c: 'application', stem: 'The free third night offered in summer is an example of', opts: ['sales promotion', 'publicity', 'advertising', 'personal selling'], sol: 'A short-term incentive to book now is sales promotion.' })),
    child('b', short({ t: 4, d: 2, c: 'application', marks: 1, stem: 'Which promotion tool is shown by the wildlife channel\'s programme?', model: '**Publicity.**', sol: 'Unpaid media coverage is publicity.', scheme: [['Publicity', 1]] })),
    child('c', short({ t: 4, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Identify the promotion tool used by Ms Wankhede and state one of its merits.', model: '**Personal selling.** **Merit:** two-way talk lets her **answer agents\' questions** and adapt packages on the spot.', sol: 'Personal selling with a merit.', scheme: [['Tool', 1], ['Merit', 1]] }), [
      short({ t: 3, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Name the four elements of the promotion mix used by the lodge, with the line that shows each.', model: '**Advertising** (travel magazines), **sales promotion** (free third night), **personal selling** (agents in Nagpur), **publicity** (wildlife programme).', sol: 'All four elements with evidence.', scheme: [['Two elements with evidence', 1], ['Other two with evidence', 1]] }),
    ]),
  ],
}));
