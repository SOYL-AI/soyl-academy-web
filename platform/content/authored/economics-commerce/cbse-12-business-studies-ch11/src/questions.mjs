// CBSE 12 Business Studies, ch11 Marketing Management — question bank. Every firm, brand, person and
// situation is imagined and written by SOYL; no real brand, no NCERT example or exercise and no
// board/sample-paper item is reused (D-036). Cases follow the board pattern: identify the concept
// from the lines, quote them and explain.
import { Q, mcq, ar, tf, fb, match, ord, num, short, long, caseQ, child } from './lib.mjs';

const S2 = [30, 50];
const S3 = [50, 75];
const L5 = [100, 150];

// ---------------------------------------------------------------- computed figures (asserted)
// Cost-plus pricing: an imagined pressure-cooker maker.
export const COOKER = { fixed: 200000, variablePerUnit: 150, units: 2000, markupPct: 20 };
export const COOKER_TOTAL = COOKER.fixed + COOKER.variablePerUnit * COOKER.units; // 5,00,000
export const COOKER_UNIT_COST = COOKER_TOTAL / COOKER.units; // 250
export const COOKER_PRICE = COOKER_UNIT_COST * (1 + COOKER.markupPct / 100); // 300
// Quantity gift: a 500 g pack with 20 per cent extra at the same price.
export const GIFT = { grams: 500, extraPct: 20, price: 90 };
export const GIFT_GRAMS = GIFT.grams * (1 + GIFT.extraPct / 100); // 600
export const GIFT_PER_100_OLD = (GIFT.price / GIFT.grams) * 100; // 18
export const GIFT_PER_100_NEW = (GIFT.price / GIFT_GRAMS) * 100; // 15
// Retail price chain for the two-level channel worked example (₹ per unit).
export const CHAIN = { factory: 200, wholesalerMargin: 20, retailerMargin: 30 };
export const CHAIN_WHOLESALE = CHAIN.factory + CHAIN.wholesalerMargin; // 220
export const CHAIN_RETAIL = CHAIN_WHOLESALE + CHAIN.retailerMargin; // 250
{
  const ok =
    COOKER_TOTAL === 500000 && COOKER_UNIT_COST === 250 && COOKER_PRICE === 300 &&
    GIFT_GRAMS === 600 && GIFT_PER_100_OLD === 18 && GIFT_PER_100_NEW === 15 &&
    CHAIN_WHOLESALE === 220 && CHAIN_RETAIL === 250;
  if (!ok) throw new Error('ch11 figure check failed');
}
const inr = (n) => n.toLocaleString('en-IN');

// ================================================================ t01 Concept, functions and philosophies
Q('m_market_meaning', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'In modern marketing, the word **market** refers mainly to',
  opts: [
    'the set of actual and potential buyers of a product',
    'a fixed place where buyers and sellers meet every week',
    'the factory where goods are made',
    'the government office that fixes prices',
  ],
  sol: 'Today a market means all the actual and potential buyers of a product or service, wherever they are. A physical meeting place is the older, narrower meaning; a factory and a government office are not markets.',
}));
Q('m_marketer', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Nandini, a potter in Khurja (imagined), studies what city buyers want, designs glazed mugs for them and persuades a hotel to buy 500 mugs. In marketing terms, Nandini is the',
  opts: ['marketer', 'consumer', 'intermediary', 'regulator'],
  sol: 'The person who takes more interest in the exchange and makes the effort to create it (study, design, persuasion) is the marketer. The hotel is the buyer; Nandini is not a middleman or a regulator.',
}));
Q('m_exchange', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Which of the following is **NOT** a condition for an exchange to take place?',
  opts: [
    'Both parties must belong to the same city',
    'At least two parties must be involved',
    'Each party must offer something of value to the other',
    'Each party must be free to accept or reject the offer',
  ],
  sol: 'An exchange needs two or more parties, something of value on each side, communication and freedom to accept or reject. The parties can be anywhere: distance is no barrier to exchange.',
}));
Q('m_selling_vs_mkt', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Which statement correctly distinguishes **marketing** from **selling**?',
  opts: [
    'Marketing begins before production by finding customer needs; selling begins after the product is made',
    'Selling is a wider term that includes marketing',
    'Marketing aims only at profit through volume of sales',
    'Selling focuses on satisfying customer needs while marketing focuses on the product',
  ],
  sol: 'Marketing is the wider process: it starts with identifying needs and continues after the sale, aiming at profit through customer satisfaction. Selling is one part of it, starting after production and aiming at transferring title through sales volume.',
}));
Q('m_phil_production', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Mehta Cycles (imagined) believes that buyers in small towns want cycles that are cheap and easily available, so it focuses on mass production to cut cost and on stocking every village shop. Which marketing philosophy is this?',
  opts: ['Production concept', 'Product concept', 'Selling concept', 'Societal marketing concept'],
  sol: 'The production concept assumes that customers prefer products that are available and affordable, so the firm concentrates on low-cost mass production and wide availability. The product concept stresses quality and features; the selling concept stresses aggressive promotion; the societal concept adds the welfare of society.',
}));
Q('m_phil_product', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'A watch company in an imagined town keeps adding more jewels and finer finishing to its watches, believing buyers will always choose the best-made watch, even though its sales are falling. It follows the',
  opts: ['product concept', 'production concept', 'marketing concept', 'selling concept'],
  sol: 'Relying on better quality, performance and features to win buyers is the product concept. Its danger is "marketing myopia": the firm may miss what customers actually want.',
}));
Q('m_phil_selling', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Swift Water Purifiers (imagined) sends salespeople door to door with heavy discounts and pressure tactics, because it believes people will not buy enough purifiers unless they are persuaded hard. The philosophy here is the',
  opts: ['selling concept', 'marketing concept', 'product concept', 'production concept'],
  sol: 'Aggressive selling and promotion, on the belief that customers will not buy enough on their own, marks the selling concept. The marketing concept would start from customer needs instead.',
}));
Q('m_phil_societal', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'Hariyali Packaging (imagined) designs its bags to meet shoppers\' needs and earn profit, but switches to compostable material and runs a plastic take-back scheme in its town. This reflects the',
  opts: ['societal marketing concept', 'selling concept', 'production concept', 'product concept'],
  sol: 'Satisfying customers profitably while also caring for the long-term welfare of society and the environment is the societal marketing concept. None of the other concepts includes concern for society.',
}));
Q('m_fn_info', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Before launching a millet breakfast cereal, Shakti Foods (imagined) surveys 2,000 households about their eating habits, budgets and favourite flavours. Which marketing function is being performed?',
  opts: [
    'Gathering and analysing market information',
    'Standardisation and grading',
    'Physical distribution',
    'Customer support services',
  ],
  sol: 'Collecting and studying information about customers\' needs, preferences and spending is gathering and analysing market information. It comes first, because product design and pricing depend on it.',
}));
Q('m_fn_grading', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'A spice cooperative (imagined) sorts its pepper into three groups by size and aroma and sells each group at a different price. This activity is called',
  opts: ['grading', 'standardisation', 'branding', 'labelling'],
  sol: 'Grading classifies products into groups according to quality or size, often for natural produce. Standardisation fixes standards in advance for producing uniform goods; branding and labelling identify and describe the product.',
}));
Q('m_fn_support', mcq({
  t: 1, d: 1, c: 'understanding',
  stem: 'Handling complaints, installation, repairs and maintenance after a sale come under which marketing function?',
  opts: ['Customer support services', 'Marketing planning', 'Product designing', 'Transportation'],
  sol: 'After-sale services such as installation, repair, complaint handling and credit facilities are customer support services. They build customer satisfaction and repeat purchases.',
}));
Q('ar_mkt_wider', ar({
  t: 1, d: 2, c: 'analysis', key: 'a',
  a: 'Marketing is a wider term than selling.',
  r: 'Marketing includes identifying needs, product design, pricing and after-sale service, of which selling is only one activity.',
  sol: 'Both are true, and R explains A: selling is one part of the marketing process, which begins before production and continues after the sale.',
}));
Q('ar_societal', ar({
  t: 1, d: 3, c: 'analysis', key: 'c',
  a: 'Under the societal marketing concept a firm considers the long-term welfare of society, not only customer satisfaction.',
  r: 'The societal marketing concept ignores profit because profit harms society.',
  sol: 'A is true. R is false: the societal concept still aims at profit, but earned through customer satisfaction and social well-being together.',
}));
Q('tf_myopia', tf({
  t: 1, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? A firm that concentrates only on improving its product\'s quality may fail if customers\' needs have changed.',
  sol: 'This is the main weakness of the product concept: a better product is not enough if customers now want something different.',
}));
Q('mt_philosophies', match({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'Match each marketing philosophy with its main focus, as taught for the marketing chapter.',
  pairs: [
    ['Production concept', 'Availability and affordability through mass production'],
    ['Product concept', 'Quality, performance and features of the product'],
    ['Selling concept', 'Aggressive selling and promotion'],
    ['Marketing concept', 'Customer needs and their satisfaction'],
  ],
  sol: 'Each philosophy is identified by what the firm treats as the key to success: low cost and availability, a better product, hard selling, or customer satisfaction.',
}));
Q('s_mkt_selling', short({
  t: 1, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Give three differences between marketing and selling.',
  model: '1. **Scope:** marketing is a wider process covering need identification, product design, pricing, promotion and after-sale service; selling is only the transfer of title.\n2. **Starting point:** marketing starts **before production** and continues after the sale; selling starts **after** the product is ready.\n3. **Focus:** marketing aims at profit through **customer satisfaction**; selling aims at profit through **sales volume**.',
  sol: 'Any three bases of difference, stating both sides each time.',
  scheme: [['First difference, both sides', 1], ['Second difference, both sides', 1], ['Third difference, both sides', 1]],
}));
Q('s_fn_planning', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Explain "marketing planning" and "product designing and development" as functions of marketing.',
  model: '1. **Marketing planning:** setting marketing objectives such as raising market share, and deciding the action programme to achieve them.\n2. **Product designing and development:** creating a product with the design, features and quality that suit the target buyers and beat competitors.',
  sol: 'One clear explanation for each function.',
  scheme: [['Marketing planning explained', 1], ['Product designing and development explained', 1]],
}));
Q('s3_societal_need', short({
  t: 1, d: 3, c: 'evaluation', marks: 3, wl: S3,
  stem: 'Why do many businesses today find the societal marketing concept more suitable than the plain marketing concept? Give three reasons.',
  model: '1. Satisfying a want can still **harm society**, for example over-packaged goods that add to waste; the societal view checks such harm.\n2. Customers increasingly **prefer responsible firms**, so concern for the environment builds goodwill and loyalty.\n3. **Laws and public opinion** on pollution and health are getting stricter, so long-term survival needs this wider view.',
  sol: 'Three reasons linked to social harm, customer preference and long-term survival.',
  scheme: [['First reason', 1], ['Second reason', 1], ['Third reason', 1]],
}));
Q('l_functions', long({
  t: 1, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Explain any five functions of marketing.',
  model: '1. **Gathering and analysing market information:** studying customers\' needs, tastes and buying power to spot opportunities and threats.\n2. **Marketing planning:** fixing marketing objectives (for example a larger market share) and the programme of action to reach them.\n3. **Product designing and development:** giving the product a design, features and quality that attract target buyers.\n4. **Standardisation and grading:** producing goods to fixed specifications, or sorting produce into quality classes, so that buyers get uniform quality.\n5. **Pricing:** deciding a price that covers cost, suits demand and competition, and meets the firm\'s objectives. (Also: packaging and labelling, branding, customer support, promotion, physical distribution, transportation and warehousing.)',
  sol: 'Five correctly named and explained functions.',
  scheme: [['First function explained', 1], ['Second function explained', 1], ['Third function explained', 1], ['Fourth function explained', 1], ['Fifth function explained', 1]],
}));
Q('l_philosophies', long({
  t: 1, d: 4, c: 'analysis', marks: 5, wl: L5,
  stem: 'Compare the production, product, selling, marketing and societal marketing concepts on the basis of their starting point, main focus and means used.',
  model: '1. **Production concept:** starts from the factory; focus on **availability and low cost**; means: mass production and wide distribution.\n2. **Product concept:** starts from the factory; focus on **quality and features**; means: product improvement.\n3. **Selling concept:** starts from the factory; focus on **selling what is made**; means: aggressive selling and promotion.\n4. **Marketing concept:** starts from the **market**; focus on **customer needs**; means: an integrated marketing effort, with profit through satisfaction.\n5. **Societal marketing concept:** starts from the market and **society**; focus on customer satisfaction plus **social welfare**; means: integrated marketing with social and environmental responsibility.',
  sol: 'All five concepts compared on starting point, focus and means; one mark per concept.',
  scheme: [['Production concept', 1], ['Product concept', 1], ['Selling concept', 1], ['Marketing concept', 1], ['Societal marketing concept', 1]],
}));

// ================================================================ t02 Product, branding, packaging, labelling
Q('m_mix_elements', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'The four elements of the marketing mix are',
  opts: [
    'product, price, place and promotion',
    'planning, pricing, packaging and promotion',
    'product, profit, people and packaging',
    'price, publicity, place and personal selling',
  ],
  sol: 'The marketing mix is the set of four controllable variables, the "4 Ps": product, price, place (physical distribution) and promotion.',
}));
Q('m_convenience', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'Toothpaste, matchboxes and biscuits, which people buy often, with little effort and from the nearest shop, are examples of',
  opts: ['convenience products', 'shopping products', 'speciality products', 'industrial products'],
  sol: 'Consumer goods bought frequently, in small units, with minimum effort and from nearby shops are convenience products. Shopping products are compared before purchase; speciality products have unique features that buyers make a special effort for.',
}));
Q('m_shopping', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'Ritu visits four shops in Indore and compares the fabric, fit and price of school blazers before buying one for her son. The blazer is a',
  opts: ['shopping product', 'convenience product', 'speciality product', 'durable industrial product'],
  sol: 'Products for which buyers compare quality, price and style across shops before buying are shopping products.',
}));
Q('m_brand_mark', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'The part of a brand that can be **recognised but not spoken**, such as a symbol or a distinctive colour design, is called the',
  opts: ['brand mark', 'brand name', 'label', 'trade name'],
  sol: 'A brand mark is the symbol, design or colour scheme of a brand that can be seen and recognised but not pronounced. The brand name is the part that can be spoken.',
}));
Q('m_trademark', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'A brand, or part of it, that is **registered** and so legally protected against use by other firms is a',
  opts: ['trade mark', 'brand mark', 'grade label', 'package'],
  sol: 'When a brand is registered, the firm gets the exclusive legal right to use it, and it becomes a trade mark.',
}));
Q('m_pack_level', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'An imagined perfume comes in a glass bottle, which is kept inside a printed cardboard box; twelve such boxes travel to shops in a large carton. The cardboard box is the',
  opts: ['secondary package', 'primary package', 'transportation package', 'label'],
  sol: 'The primary package is the immediate container (the bottle). The extra layer that protects it and is often thrown away when the product is used is the secondary package (the box). The carton used for storage and transport is the transportation package.',
}));
Q('m_label_fn', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'The label on a packet of imagined Kesari Atta says "Store in a cool, dry place; use within three months of packing." This label is mainly performing the function of',
  opts: [
    'giving information about how to use and store the product',
    'grading the product',
    'helping in promotion through a free gift',
    'stating the brand mark',
  ],
  sol: 'Labels describe the product and give information about its use, storage and precautions. This line is instructions for storage and use, not grading or a sales promotion.',
}));
Q('ar_packaging', ar({
  t: 2, d: 3, c: 'analysis', key: 'b',
  a: 'Packaging has become an important tool of marketing.',
  r: 'Packaging protects a product from damage during transport and storage.',
  sol: 'Both are true. But the reason packaging has become a marketing tool is its role in self-service retail, product differentiation, rising health standards and attracting buyers, not merely protection, which packaging always did. So R does not explain A.',
}));
Q('ar_brand_price', ar({
  t: 2, d: 3, c: 'analysis', key: 'a',
  a: 'A well-known brand can often charge a slightly higher price than unbranded rivals.',
  r: 'Branding builds customer loyalty and assures buyers of consistent quality.',
  sol: 'Both are true, and R explains A: buyers who trust a brand\'s quality are willing to pay a little more, which allows a different (higher) price.',
}));
Q('fb_trademark', fb({
  t: 2, d: 1, c: 'recall',
  stem: 'A brand that has been given legal protection through registration is called a ___.',
  acc: [['trade mark', 'trademark']],
  sol: 'Registration turns the brand into a trade mark, which no other firm may use.',
}));
Q('tf_brandname', tf({
  t: 2, d: 2, c: 'application', ans: false,
  stem: 'True or false? "Bhoomi-Shakti-Agro-Utpadan-Samooh" is a good brand name for a new organic fertiliser because it describes the product fully.',
  sol: 'A good brand name is short, easy to pronounce, spell and remember; this name is long and hard to recall, so it is a poor choice even though it describes the product.',
}));
Q('s_brand_adv_seller', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State two advantages of branding to the marketer.',
  model: '1. **Product differentiation:** the brand separates the firm\'s goods from rivals, which helps it control its market.\n2. **Easier introduction of new products:** a trusted brand name helps new items under it gain acceptance quickly. (Also: help in advertising; differential pricing.)',
  sol: 'Any two advantages to the firm, explained.',
  scheme: [['First advantage', 1], ['Second advantage', 1]],
}));
Q('s3_brand_name', short({
  t: 2, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'Pratap, who is launching a ready-to-cook millet mix in Jaipur (imagined), asks you what a good brand name should be like. Give him three characteristics.',
  model: '1. **Short and easy** to pronounce, spell and remember, so shoppers can ask for it.\n2. **Suggestive** of the product\'s benefit, such as health or quick cooking.\n3. **Distinctive and registrable**, so that it stands apart from rivals and can be protected as a trade mark. (Also: adaptable to new products; translatable; lasting appeal.)',
  sol: 'Three characteristics applied to a food product.',
  scheme: [['First characteristic', 1], ['Second characteristic', 1], ['Third characteristic', 1]],
}));
Q('s3_label', short({
  t: 2, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain any three functions performed by a label.',
  model: '1. **Describes the product and its use:** contents, ingredients, directions and precautions.\n2. **Identifies the product or brand:** the name and logo help a buyer pick it from a crowded shelf.\n3. **Helps in grading and promotion, and meets the law:** a label can show the grade, carry a promotional message and give legally required details such as price and date of packing.',
  sol: 'Three functions, each explained.',
  scheme: [['First function', 1], ['Second function', 1], ['Third function', 1]],
}));
Q('l_packaging', long({
  t: 2, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Explain the three levels of packaging, and state any two reasons why packaging has become so important in recent years.',
  model: '1. **Primary package:** the product\'s **immediate container**, kept until the product is used up, such as a toothpaste tube.\n2. **Secondary package:** an **extra layer** that protects the primary package and is often thrown away on use, such as the box around the tube.\n3. **Transportation package:** packing needed for **storage, identification and transport**, such as a corrugated carton of 50 boxes.\n4. **Rising standards of health and sanitation:** buyers want packed, untouched food and medicines.\n5. **Self-service retailing:** in supermarkets the package must attract and **"sell"** the product without a salesperson. (Also: innovational opportunity; product differentiation.)',
  sol: 'Three levels with examples, and two reasons for importance.',
  scheme: [['Primary package', 1], ['Secondary package', 1], ['Transportation package', 1], ['First reason for importance', 1], ['Second reason for importance', 1]],
}));

// ================================================================ t03 Price
Q('m_price_cost', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Which factor usually sets the **minimum** level, or floor, of a product\'s price in the long run?',
  opts: ['The total cost of the product', 'The price charged by competitors', 'The utility of the product to buyers', 'The firm\'s advertising budget'],
  sol: 'In the long run a firm must recover its full cost (fixed, variable and semi-variable), so cost sets the floor. Utility and demand set the upper limit; competition decides where between them the price can lie.',
}));
Q('m_price_demand', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'Ahead of the Diwali season, demand for decorative lamps made by an imagined Moradabad firm rises sharply, and buyers see few substitutes. The firm can now charge a higher price because of',
  opts: [
    'utility and demand for the product',
    'government regulation of prices',
    'a fall in the cost of production',
    'the entry of many new competitors',
  ],
  sol: 'When demand is strong and inelastic and buyers value the product highly, a firm can charge more: utility and demand set the upper limit of price. More competitors would push the price down, not up.',
}));
Q('m_price_govt', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'A medicine maker in the imagined state of Suryapur cannot charge more than the ceiling price notified by the government for an essential drug. Which factor of price determination is at work?',
  opts: ['Government and legal regulations', 'Pricing objectives', 'Marketing methods used', 'Extent of competition'],
  sol: 'For essential products the government may fix or cap prices to protect the public; this is the factor "government and legal regulations".',
}));
Q('m_price_objective', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'Vega Scooters (imagined) launches a new electric scooter at a low price, accepting little profit for two years, so that it can capture a large share of the market quickly. The pricing objective is',
  opts: ['obtaining market share leadership', 'profit maximisation in the short run', 'surviving a slump in demand', 'charging for product quality leadership'],
  sol: 'A low price to grab a large market share quickly, giving up short-run profit, serves the objective of market share leadership.',
}));
Q('num_cost_plus', num({
  t: 3, d: 3, c: 'application', marks: 2, value: COOKER_PRICE, unit: '₹',
  stem: `An imagined pressure-cooker maker in Rajkot has fixed costs of ₹${inr(COOKER.fixed)} and a variable cost of ₹${COOKER.variablePerUnit} per cooker. It plans to make ${inr(COOKER.units)} cookers and to add a profit of ${COOKER.markupPct} per cent on cost. What should be the price of one cooker (in ₹)?`,
  sol: `Step 1: Total cost = ${inr(COOKER.fixed)} + ${COOKER.variablePerUnit} × ${inr(COOKER.units)} = ${inr(COOKER_TOTAL)}.\nStep 2: Cost per cooker = ${inr(COOKER_TOTAL)} ÷ ${inr(COOKER.units)} = ${COOKER_UNIT_COST}.\nStep 3: Price = ${COOKER_UNIT_COST} + ${COOKER.markupPct}% of ${COOKER_UNIT_COST} = ${COOKER_PRICE}. So ₹${COOKER_PRICE}.`,
  scheme: [['Cost per unit (₹250)', 1], ['Price with profit added (₹300)', 1]],
}));
Q('ar_competition', ar({
  t: 3, d: 2, c: 'analysis', key: 'a',
  a: 'A firm facing many close competitors has little freedom to fix a price much above theirs.',
  r: 'Buyers can easily switch to a competitor\'s similar product if the price is higher.',
  sol: 'Both are true, and R explains A: with close substitutes, a higher price drives buyers away, so the extent of competition limits pricing freedom.',
}));
Q('fb_floor', fb({
  t: 3, d: 2, c: 'understanding',
  stem: 'In price determination, the ___ of the product sets the lower limit of the price, while its utility and demand set the upper limit.',
  acc: [['cost', 'total cost', 'cost of production']],
  sol: 'The cost of the product is the floor; utility and demand form the ceiling; competition decides the actual price between them.',
}));
Q('s_price_methods', short({
  t: 3, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'Explain with an example how the "marketing methods used" by a firm affect the price it can charge.',
  model: 'Price depends on the other elements of the mix. For example, an imagined appliance firm that offers **free home installation, a long warranty and heavy advertising** bears higher costs and gives buyers more value, so it can charge **more** than a rival selling without these services.',
  sol: 'Link distribution, service, packaging or promotion choices to a higher or lower price, with an example.',
  scheme: [['How marketing methods affect price', 1], ['Suitable example', 1]],
}));
Q('s3_price_factors', short({
  t: 3, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain any three factors affecting the determination of the price of a product.',
  model: '1. **Product cost:** total cost (fixed, variable, semi-variable) must be covered in the long run; it sets the lower limit.\n2. **Utility and demand:** the price buyers are willing to pay depends on the product\'s utility and their demand; inelastic demand allows a higher price.\n3. **Extent of competition:** with many close substitutes, the firm must stay near competitors\' prices.',
  sol: 'Any three factors, each explained.',
  scheme: [['First factor', 1], ['Second factor', 1], ['Third factor', 1]],
}));
Q('l_price_factors', long({
  t: 3, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Explain any five factors that a firm considers while fixing the price of its product.',
  model: '1. **Product cost:** fixed, variable and semi-variable costs; in the long run price must cover full cost plus a margin.\n2. **Utility and demand:** buyers pay up to the utility they get; inelastic demand permits a higher price, elastic demand needs a lower one.\n3. **Extent of competition:** close substitutes keep the price near rivals\'; little competition gives more freedom.\n4. **Government and legal regulations:** essential goods may have notified or capped prices to protect the public.\n5. **Pricing objectives:** profit maximisation, market share leadership, surviving competition or quality leadership each lead to different prices. (Also: marketing methods used.)',
  sol: 'Five factors, each explained.',
  scheme: [['First factor', 1], ['Second factor', 1], ['Third factor', 1], ['Fourth factor', 1], ['Fifth factor', 1]],
}));

// ================================================================ t04 Physical distribution
Q('m_zero_level', mcq({
  t: 4, d: 1, c: 'understanding',
  stem: 'When an imagined honey farm in Coorg sells its honey to consumers only through its own website and farm shop, the channel of distribution is',
  opts: ['a zero-level (direct) channel', 'a one-level channel', 'a two-level channel', 'a three-level channel'],
  sol: 'No middleman stands between the producer and the consumer, so this is direct, zero-level distribution.',
}));
Q('m_two_level', mcq({
  t: 4, d: 2, c: 'application',
  stem: 'Kiran Biscuits (imagined) sells to wholesalers in each district, who sell to grocery shops, which sell to families. This is a',
  opts: ['two-level channel', 'one-level channel', 'zero-level channel', 'three-level channel'],
  sol: 'Manufacturer → wholesaler → retailer → consumer has two intermediaries, so it is a two-level channel, the most common one for consumer goods.',
}));
Q('m_channel_factor', mcq({
  t: 4, d: 3, c: 'application',
  stem: 'A maker of costly, made-to-order industrial boilers sells directly to factories instead of through dealers. Which factor most explains this choice of channel?',
  opts: [
    'The product is technical, costly and made to order, and buyers are few',
    'The product is perishable and must reach buyers quickly through many shops',
    'The firm has very little capital',
    'The product is a low-priced convenience good bought daily',
  ],
  sol: 'Technical, high-value, made-to-order products sold to a small number of buyers suit a short or direct channel. Low-priced convenience goods for many buyers need long channels.',
}));
Q('m_inventory', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'Deciding how much stock of finished goods to keep, so that orders are met without locking up too much money, is the component of physical distribution called',
  opts: ['inventory control', 'order processing', 'warehousing', 'transportation'],
  sol: 'Inventory control decides the level of stock, balancing customer service against the cost of holding stock.',
}));
Q('m_warehousing', mcq({
  t: 4, d: 2, c: 'application',
  stem: 'Sunehri Rice Mills (imagined) stores paddy after harvest and releases rice to the market evenly through the year. Which component of physical distribution creates this **time utility**?',
  opts: ['Warehousing', 'Transportation', 'Order processing', 'Branding'],
  sol: 'Storing goods from the time they are produced until they are needed creates time utility; this is warehousing. Transportation creates place utility.',
}));
Q('num_channel_price', num({
  t: 4, d: 2, c: 'understanding', marks: 1, value: CHAIN_RETAIL, unit: '₹',
  stem: `An imagined shoe maker sells a pair to a wholesaler at ₹${CHAIN.factory}. The wholesaler adds a margin of ₹${CHAIN.wholesalerMargin} and the retailer adds a margin of ₹${CHAIN.retailerMargin}. What does the consumer pay for the pair through this two-level channel (in ₹)?`,
  sol: `Step 1: Price to retailer = ${CHAIN.factory} + ${CHAIN.wholesalerMargin} = ${CHAIN_WHOLESALE}.\nStep 2: Price to consumer = ${CHAIN_WHOLESALE} + ${CHAIN.retailerMargin} = ${CHAIN_RETAIL}. So ₹${CHAIN_RETAIL}.`,
}));
Q('ord_order', ord({
  t: 4, d: 2, c: 'understanding', marks: 1,
  stem: 'Arrange these steps by which an imagined paint company handles an order from a dealer in Nagpur, in the correct order.',
  items: [
    'The dealer\'s order is received and checked',
    'Goods are picked from the warehouse stock',
    'The paint is loaded and transported to the dealer',
    'The dealer receives the goods and the invoice',
  ],
  sol: 'Order processing comes first, then the goods are taken out of stock (warehousing and inventory), then transported, and finally delivered with the invoice.',
}));
Q('tf_middlemen', tf({
  t: 4, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? Middlemen only add to the price of goods and perform no useful function.',
  sol: 'Middlemen assemble goods, store them, carry risk, give credit, grade and pack, and make goods available in small quantities near buyers. Without them producers would have to do all this themselves.',
}));
Q('s_components', short({
  t: 4, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Explain "order processing" and "transportation" as components of physical distribution.',
  model: '1. **Order processing:** receiving, checking and executing customers\' orders accurately and quickly; delays lose customers.\n2. **Transportation:** physically moving goods from the place of production to the place of sale, creating **place utility**.',
  sol: 'Explain both components.',
  scheme: [['Order processing explained', 1], ['Transportation explained', 1]],
}));
Q('s3_channel_factors', short({
  t: 4, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'Fresh Fields, an imagined dairy in Pune, sells milk and curd that spoil within two days. Explain three factors it should keep in mind while choosing its channel of distribution.',
  model: '1. **Product:** milk and curd are **perishable**, so a **short channel** with quick movement (direct or one-level) is needed.\n2. **Market:** buyers are many and buy small quantities daily, so it needs **many nearby retail outlets**.\n3. **Company and environment:** its capital, control needed and refrigerated transport available; good cold-chain partners make a slightly longer channel possible.',
  sol: 'Three factors (product, market, company, competition or environment) applied to a perishable product.',
  scheme: [['Product factor applied', 1], ['Market factor applied', 1], ['Company or environmental factor applied', 1]],
}));
Q('l_physical_dist', long({
  t: 4, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'What is physical distribution? Explain its four main components.',
  model: '**Physical distribution** covers all activities needed to move goods physically from the producer to the customer, at the right place and time.\n1. **Order processing:** accurate and fast handling of orders, from receipt to dispatch.\n2. **Transportation:** moving goods to where buyers are; it creates **place utility** and its choice depends on the product, cost and speed.\n3. **Warehousing:** storing goods until they are needed, which creates **time utility**; more warehouses mean faster service but higher cost.\n4. **Inventory control:** deciding the level of stock so that orders are met without locking up too much money; it depends on the service level, demand forecasts and costs.',
  sol: 'Meaning, then the four components explained.',
  scheme: [['Meaning of physical distribution', 1], ['Order processing', 1], ['Transportation', 1], ['Warehousing', 1], ['Inventory control', 1]],
}));

// ================================================================ t05 Promotion
Q('m_adv_paid', mcq({
  t: 5, d: 1, c: 'understanding',
  stem: 'Which feature is true of **advertising**?',
  opts: [
    'It is a paid, impersonal form of communication by an identified sponsor',
    'It is a face-to-face presentation to one buyer',
    'It is unpaid news about the firm published by the media',
    'It is a short-term incentive such as a discount',
  ],
  sol: 'Advertising is paid for, impersonal (mass media, not face to face) and has an identified sponsor. Face-to-face selling is personal selling; unpaid news is publicity; short-term incentives are sales promotion.',
}));
Q('m_personal_selling', mcq({
  t: 5, d: 2, c: 'application',
  stem: 'Salma, a salesperson for an imagined water-heater company, visits a family, listens to their needs, demonstrates two models and answers their doubts on the spot. This tool of promotion is',
  opts: ['personal selling', 'advertising', 'public relations', 'sales promotion'],
  sol: 'An oral, face-to-face presentation to prospective buyers, with two-way communication and immediate feedback, is personal selling.',
}));
Q('m_sp_quantity', mcq({
  t: 5, d: 2, c: 'application',
  stem: 'An imagined detergent brand offers "1 kg + 200 g free" at the price of 1 kg. Which sales promotion technique is this?',
  opts: ['Quantity gift', 'Product combination', 'Refund', 'Lucky draw'],
  sol: 'Giving an extra quantity of the same product free is a quantity gift. A product combination gives a different product as a gift (for example a mug with tea).',
}));
Q('m_sp_combination', mcq({
  t: 5, d: 2, c: 'application',
  stem: 'With every 1 kg pack of imagined Chai Bahar tea, a free steel strainer is given. This is an example of',
  opts: ['product combination', 'rebate', 'quantity gift', 'sampling'],
  sol: 'Offering another product as a gift along with the main product is a product combination.',
}));
Q('m_pr', mcq({
  t: 5, d: 3, c: 'application',
  stem: 'After rumours spread that its bottled water was unsafe, Neer Waters (imagined) invited journalists to tour its plant, published test reports and sponsored clean-water camps in villages. These steps are part of',
  opts: ['public relations', 'personal selling', 'sales promotion', 'packaging'],
  sol: 'Building and protecting the firm\'s image and goodwill with the public, including handling unfavourable rumours and press relations, is public relations.',
}));
Q('m_adv_objection', mcq({
  t: 5, d: 3, c: 'analysis',
  stem: 'Critics say advertising "makes people buy things they do not need". Which is the most commonly given **reply** to this objection?',
  opts: [
    'Advertising informs buyers about products that can satisfy their wants and raises their aspirations to work harder for a better life',
    'Advertising is always free for the consumer',
    'Advertising is regulated, so it never persuades anyone',
    'Advertising is used only for industrial goods',
  ],
  sol: 'The usual defence is that advertising informs people of products that can meet their wants; whether to buy is their choice, and the wish for better products can motivate effort. The other options are false.',
}));
Q('ar_ps_all', ar({
  t: 5, d: 3, c: 'analysis', key: 'd',
  a: 'Personal selling is the most suitable promotion tool for every kind of product.',
  r: 'Personal selling allows two-way communication and immediate feedback from the buyer.',
  sol: 'A is false: personal selling is costly per buyer reached, so it suits technical, costly or new products and few buyers, not low-priced goods bought daily by millions. R is true: face-to-face contact gives instant feedback.',
}));
Q('fb_impersonal', fb({
  t: 5, d: 1, c: 'recall',
  stem: 'Because advertising has no direct face-to-face contact with the buyer, it is called an ___ form of communication.',
  acc: [['impersonal']],
  sol: 'Advertising reaches people through mass media, not face to face, so it is impersonal.',
}));
Q('tf_sampling', tf({
  t: 5, d: 2, c: 'application', ans: true,
  stem: 'True or false? Distributing small free sachets of a new imagined shampoo to households, so that people try it, is a sales promotion activity.',
  sol: 'Free samples are a sales promotion activity: a short-term incentive to try a new product.',
}));
Q('mt_promotion', match({
  t: 5, d: 2, c: 'application', marks: 2,
  stem: 'Match each promotional activity of the imagined firm Sona Electricals with the tool of the promotion mix it belongs to.',
  pairs: [
    ['A thirty-second television spot for its fans', 'Advertising'],
    ['A showroom executive demonstrating a fan to a buyer', 'Personal selling'],
    ['A free extension cord with every fan bought this week', 'Sales promotion'],
    ['A press note about its free wiring checks in flood-hit villages', 'Public relations'],
  ],
  sol: 'Paid mass-media message: advertising. Face-to-face demonstration: personal selling. A short-term gift to push sales: sales promotion. Managing the firm\'s image and press: public relations.',
}));
Q('num_gift', num({
  t: 5, d: 3, c: 'application', marks: 2, value: GIFT_PER_100_NEW, unit: '₹',
  stem: `An imagined namkeen brand sells a ${GIFT.grams} g pack for ₹${GIFT.price}. During a quantity-gift offer it gives ${GIFT.extraPct} per cent extra at the same price. What is the effective price per 100 g during the offer (in ₹)?`,
  sol: `Step 1: Quantity during the offer = ${GIFT.grams} + ${GIFT.extraPct}% of ${GIFT.grams} = ${GIFT_GRAMS} g.\nStep 2: Price per 100 g = ${GIFT.price} ÷ ${GIFT_GRAMS} × 100 = ${GIFT_PER_100_NEW}. So ₹${GIFT_PER_100_NEW} (against ₹${GIFT_PER_100_OLD} before the offer).`,
  scheme: [['Quantity during the offer (600 g)', 1], ['Price per 100 g (₹15)', 1]],
}));
Q('s_ps_features', short({
  t: 5, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State any two features of personal selling.',
  model: '1. **Personal form:** a **face-to-face** presentation to prospective buyers.\n2. **Two-way communication:** the salesperson gets **immediate feedback** and can adjust the message to each buyer\'s needs. (Also: develops relationships; flexibility; reduces wasted effort.)',
  sol: 'Any two features, explained.',
  scheme: [['First feature', 1], ['Second feature', 1]],
}));
Q('s_pr_role', short({
  t: 5, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State two roles of public relations in a business.',
  model: '1. **Press relations and image building:** presenting news about the firm in a positive light and building goodwill.\n2. **Counselling and crisis handling:** advising management on public issues and correcting unfavourable rumours. (Also: corporate communication; product publicity; lobbying.)',
  sol: 'Any two roles, each with a brief explanation.',
  scheme: [['First role', 1], ['Second role', 1]],
}));
Q('s_adv_merits', short({
  t: 5, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Give two merits of advertising as a promotion tool.',
  model: '1. **Mass reach:** one message reaches a very large and scattered audience at once.\n2. **Economical per person:** spread over so many viewers, the cost per person reached is low. (Also: builds customer confidence and satisfaction; expressiveness through sound, colour and images.)',
  sol: 'Any two merits, explained.',
  scheme: [['First merit', 1], ['Second merit', 1]],
}));
Q('s3_sp_tools', short({
  t: 5, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'Pankhudi Sarees (imagined) wants to clear its old stock before the wedding season. Suggest and explain three sales promotion activities it could use.',
  model: '1. **Rebate or discount:** sell old-stock sarees at a reduced price for a limited period, for example 20 per cent off.\n2. **Product combination:** give a free matching blouse piece or stole with each saree.\n3. **Lucky draw or contest:** every buyer gets a coupon for a draw of prizes, which brings people into the shop. (Also: usable benefit vouchers; instant scratch cards; zero per cent instalment plans.)',
  sol: 'Three relevant short-term incentives, each linked to clearing stock.',
  scheme: [['First activity explained', 1], ['Second activity explained', 1], ['Third activity explained', 1]],
}));
Q('l_adv_objections', long({
  t: 5, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: 'Advertising is often criticised. Discuss any four objections to advertising, with the reply usually given to each, and give your conclusion.',
  model: '1. **Adds to cost:** advertising money is added to price. *Reply:* it raises demand, so larger production lowers cost per unit.\n2. **Undermines social values:** it promotes materialism and creates wants. *Reply:* it informs people of products that can improve their life; the choice remains theirs.\n3. **Confuses buyers:** many similar claims confuse people. *Reply:* buyers can compare information and choose sensibly.\n4. **Encourages inferior products:** anything can be advertised. *Reply:* quality is relative; repeat sales depend on satisfaction, and laws punish false claims.\n5. **Conclusion:** many objections are only partly valid; with self-regulation and legal checks, advertising mainly informs and widens choice.',
  sol: 'Four objections, each with its reply, and a balanced conclusion.',
  scheme: [['First objection with reply', 1], ['Second objection with reply', 1], ['Third objection with reply', 1], ['Fourth objection with reply', 1], ['Balanced conclusion', 1]],
}));

// ================================================================ case-based (board pattern)
Q('cb_shakti_mix', caseQ({
  t: [2, 3], d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the case of Shakti Foods, an imagined millet-snack company in Hyderabad, and answer the questions that follow. *(Written by SOYL for practice.)*',
  passage: '**Shakti Foods (imagined), Hyderabad**\n\nShakti Foods makes baked millet chips. It chose the name "Kurkuri" because children found it easy to say and remember, and it registered the name so that no rival could copy it. Each packet shows the ingredients, a nutrition table, the date of packing and the maximum retail price. Because three bigger brands sell similar chips in the same shops, Shakti keeps its price within a rupee of theirs, although its costs are slightly higher.',
  parts: [
    child('a', mcq({ t: 2, d: 1, c: 'application', stem: 'Registering the name "Kurkuri" makes it a', opts: ['trade mark', 'brand mark', 'label', 'grade'], sol: 'A registered, legally protected brand is a trade mark.' })),
    child('b', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Quote the line that shows a function of labelling.', model: '"**Each packet shows the ingredients, a nutrition table, the date of packing and the maximum retail price**" — describing the product and giving legally required information.', sol: 'The line on what the packet shows.', scheme: [['Correct line quoted', 1]] })),
    child('c', short({ t: 3, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Identify the factor affecting price that explains Shakti\'s pricing, and explain it.', model: '**Extent of competition:** three bigger brands sell **similar chips** in the same shops, so buyers can switch easily; Shakti must stay close to their price even though its cost is higher.', sol: 'Name the factor and explain it from the case.', scheme: [['Extent of competition', 1], ['Explanation from the case', 1]] }), [
      short({ t: 2, d: 3, c: 'application', marks: 2, stem: '**Or** (ii): State two characteristics of a good brand name that "Kurkuri" shows, quoting the words that show them.', model: '1. **Easy to pronounce and remember:** "children found it easy to say and remember".\n2. **Capable of legal protection:** "registered the name so that no rival could copy it".', sol: 'Two characteristics with the matching words.', scheme: [['First characteristic with words', 1], ['Second characteristic with words', 1]] }),
    ]),
  ],
}));
Q('cb_nirmal_philosophy', caseQ({
  t: [1, 5], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the case of Nirmal Appliances, an imagined mixer-grinder maker in Coimbatore, and answer the questions that follow. *(Written by SOYL for practice.)*',
  passage: '**Nirmal Appliances (imagined), Coimbatore**\n\nFor years Nirmal made one sturdy model and pushed it through dealers with big discounts and door-to-door salespeople. Sales still fell. The new marketing head spent two months talking to families and found that they wanted quieter, smaller jars for single-person homes. Nirmal redesigned its range to suit these needs, began collecting old appliances for safe recycling, and trained showroom staff to demonstrate each model and answer buyers\' questions patiently.',
  parts: [
    child('a', mcq({ t: 1, d: 2, c: 'application', stem: 'Nirmal\'s approach in the first line of the case reflects the', opts: ['selling concept', 'marketing concept', 'societal marketing concept', 'production concept'], sol: 'Pushing an existing product through discounts and door-to-door selling is the selling concept.' })),
    child('b', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'Quote the line that shows the function of gathering and analysing market information.', model: '"**The new marketing head spent two months talking to families and found that they wanted quieter, smaller jars**".', sol: 'The line on studying families\' needs.', scheme: [['Correct line quoted', 1]] })),
    child('c', short({ t: [1, 5], d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Which marketing philosophy does Nirmal follow now? Give a reason from the case.', model: 'The **societal marketing concept:** Nirmal now designs products for **customers\' needs** ("redesigned its range to suit these needs") **and** cares for society ("collecting old appliances for safe recycling").', sol: 'Societal concept, with both customer and social elements from the case.', scheme: [['Societal marketing concept', 1], ['Reason with both elements', 1]] }), [
      short({ t: 5, d: 3, c: 'application', marks: 2, stem: '**Or** (ii): Identify the promotion tool used by the showroom staff and state one feature of it shown in the case.', model: '**Personal selling:** the staff **demonstrate** each model face to face and **answer buyers\' questions**, showing **two-way communication** with immediate feedback.', sol: 'Personal selling, with one feature from the case.', scheme: [['Personal selling', 1], ['Feature shown in the case', 1]] }),
    ]),
  ],
}));
Q('cb_gramin_channel', caseQ({
  t: 4, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the case of Gramin Pickles, an imagined women\'s enterprise in Nashik, and answer the questions that follow. *(Written by SOYL for practice.)*',
  passage: '**Gramin Pickles (imagined), Nashik**\n\nA group of twelve women make mango and lime pickles. At first they sold jars at their own stall at the weekly market. Now a city distributor buys 500 jars a month and supplies them to wholesalers in four towns, who sell to small grocery shops. The group has rented a cool storeroom to hold mangoes pickled in summer for sale through the year, and it keeps a stock register so that it never holds more than six weeks of jars.',
  parts: [
    child('a', mcq({ t: 4, d: 2, c: 'application', stem: 'Selling at their own stall at the weekly market was a', opts: ['zero-level channel', 'one-level channel', 'two-level channel', 'three-level channel'], sol: 'Producers sold straight to consumers with no middleman: zero-level.' })),
    child('b', mcq({ t: 4, d: 3, c: 'application', stem: 'The present route (group → distributor → wholesaler → grocery shop → consumer) is a', opts: ['three-level channel', 'two-level channel', 'one-level channel', 'zero-level channel'], sol: 'Three intermediaries (distributor or agent, wholesaler, retailer) make it a three-level channel.' })),
    child('c', short({ t: 4, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Identify two components of physical distribution shown in the last line, quoting the words.', model: '1. **Warehousing:** "rented a cool storeroom to hold mangoes pickled in summer for sale through the year".\n2. **Inventory control:** "keeps a stock register so that it never holds more than six weeks of jars".', sol: 'Two components with the matching words.', scheme: [['Warehousing with words', 1], ['Inventory control with words', 1]] }), [
      short({ t: 4, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): What utility does the cool storeroom create? Explain with reference to the case.', model: '**Time utility:** mangoes are pickled in **summer** but buyers want pickle **through the year**; storing the jars bridges this gap in time.', sol: 'Time utility, explained with the case.', scheme: [['Time utility', 1], ['Explanation from the case', 1]] }),
    ]),
  ],
}));
Q('cb_tara_promotion', caseQ({
  t: 5, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the case of Tara Mobiles, an imagined phone retailer in Lucknow, and answer the questions that follow. *(Written by SOYL for practice.)*',
  passage: '**Tara Mobiles (imagined), Lucknow**\n\nTo launch its new store, Tara Mobiles placed a paid advertisement in two city newspapers. Every buyer during the first week could pay for a phone in six monthly instalments with no interest. It also gave a free phone cover to anyone who bought a phone above ₹10,000. When a local channel reported that one phone model had overheated, Tara\'s manager went on air, explained the tests carried out and announced a free inspection camp.',
  parts: [
    child('a', mcq({ t: 5, d: 2, c: 'application', stem: 'The free phone cover with a phone above ₹10,000 is', opts: ['product combination', 'quantity gift', 'refund', 'lucky draw'], sol: 'A different product given free with the main product is a product combination.' })),
    child('b', short({ t: 5, d: 2, c: 'application', marks: 1, stem: 'Name the sales promotion technique shown by the instalment offer.', model: '**Full finance at zero per cent** (easy instalments without interest).', sol: 'Paying in instalments with no interest is full finance at zero per cent.', scheme: [['Full finance at zero per cent', 1]] })),
    child('c', short({ t: 5, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Identify the tool of promotion used by the manager after the news report, and state its role here.', model: '**Public relations:** the manager handled an unfavourable report by explaining the tests and announcing an inspection camp, protecting the store\'s **image and goodwill**.', sol: 'Public relations, with its role in this crisis.', scheme: [['Public relations', 1], ['Role explained from the case', 1]] }), [
      short({ t: 5, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): State two features of advertising shown by the newspaper advertisement.', model: '1. **Paid form:** Tara "placed a **paid** advertisement".\n2. **Impersonal and mass reach:** it reaches many readers through **newspapers**, without face-to-face contact. (Also: identified sponsor — the store.)', sol: 'Two features linked to the case.', scheme: [['First feature', 1], ['Second feature', 1]] }),
    ]),
  ],
}));
Q('cb_vasudha_pack', caseQ({
  t: [2, 1], d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the case of Vasudha Organics, an imagined spice firm in Kochi, and answer the questions that follow. *(Written by SOYL for practice.)*',
  passage: '**Vasudha Organics (imagined), Kochi**\n\nVasudha sells turmeric powder. It found that most buyers now shop in supermarkets, where no salesperson explains products, so it designed a bright resealable pouch that keeps moisture out. Each pouch sits in a printed card sleeve, and 48 sleeves travel in a corrugated carton. Vasudha also tests every batch so that each pouch has the same colour and purity.',
  parts: [
    child('a', mcq({ t: 2, d: 2, c: 'application', stem: 'The corrugated carton holding 48 sleeves is the', opts: ['transportation package', 'primary package', 'secondary package', 'label'], sol: 'Packing used for storage, identification and transport is the transportation package.' })),
    child('b', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Quote the line that gives a reason why packaging has become important.', model: '"**most buyers now shop in supermarkets, where no salesperson explains products**" — growth of self-service retailing.', sol: 'The line on supermarkets and self-service.', scheme: [['Correct line quoted', 1]] })),
    child('c', short({ t: [1, 2], d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Identify the marketing function shown in the last line and explain it.', model: '**Standardisation:** testing every batch so that each pouch has the **same colour and purity** means producing to fixed standards, giving buyers **uniform quality**.', sol: 'Standardisation, explained from the case.', scheme: [['Standardisation', 1], ['Explanation from the case', 1]] }), [
      short({ t: 2, d: 3, c: 'application', marks: 2, stem: '**Or** (ii): State two functions that the resealable pouch performs for Vasudha.', model: '1. **Product protection:** it **keeps moisture out**, so the powder stays fresh.\n2. **Promotion and convenience:** its **bright design** attracts shoppers on the shelf, and resealing makes it easy to use.', sol: 'Two functions of packaging from the case.', scheme: [['First function', 1], ['Second function', 1]] }),
    ]),
  ],
}));
