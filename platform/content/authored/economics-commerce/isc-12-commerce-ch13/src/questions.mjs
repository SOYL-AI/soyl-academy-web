// ISC 12 Commerce, ch13 Marketing: Concept and Functions — question bank. Every firm, person and situation is
// imagined and written by SOYL and labelled as such; no ISC or CBSE textbook illustration or exercise and no CISCE
// specimen or board item is reused (D-036). Firms, places and set-ups differ from the CBSE 12 Business Studies
// chapter on marketing.
import { Q, mcq, ar, tf, fb, match, short, long, caseQ, child } from './lib.mjs';

const S2 = [30, 50];
const S3 = [50, 75];
const L5 = [100, 150];

// ================================================================ t01 Market: meaning and types; marketing: meaning and features
Q('m_market_modern', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'When the export manager of Gandhsar Attars, an imagined perfume house in Kannauj, says "our market in the Gulf is growing", she is referring to',
  opts: ['the actual and potential buyers of attar in the Gulf region', 'a building in the Gulf where attar is sold', 'the factory where the attar is distilled', 'the rivals who sell perfume in the Gulf'],
  sol: 'In marketing, a market means the set of actual and potential buyers of a product, not a physical place.',
}));
Q('m_market_area_local', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Marigold garlands made by growers near an imagined temple town wilt within a day, so they are bought only by shops a few kilometres away. On the basis of area, this is a',
  opts: ['local market', 'national market', 'international market', 'regional market covering several states'],
  sol: 'Highly perishable goods with buyers close by form a local market.',
}));
Q('m_market_area_intl', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Kanch Kala Bangles, an imagined glass-bangle maker in Firozabad, sells to buyers in Dubai, Nairobi and London as well as in India. On the basis of area, its market is',
  opts: ['international (global)', 'local', 'regional', 'very short period'],
  sol: 'Buyers in several countries make the market international.',
}));
Q('m_market_time_vshort', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'At an imagined fish landing centre in Port Blair, the morning\'s catch must be sold within hours and no more fish can be brought in that day. On the basis of time, this is a',
  opts: ['very short period market', 'short period market', 'long period market', 'secular market'],
  sol: 'When supply is fixed and cannot be changed at all, as with a day\'s perishable catch, the market is a very short period (market period) one.',
}));
Q('m_market_time_long', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'Over several years, Purna Cotton Ginners, an imagined firm in Akola, can build new ginning units and fully change its output to match demand. On the basis of time, this is a',
  opts: ['long period market', 'very short period market', 'short period market', 'local market'],
  sol: 'When there is enough time for supply to adjust fully, including new plants, the market is a long period market.',
}));
Q('m_market_goods', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'A market in which dealers buy and sell gold and silver is classified, on the basis of the nature of goods, as a',
  opts: ['bullion market', 'stock market', 'produce market', 'very short period market'],
  sol: 'Markets dealing in gold and silver are bullion markets.',
}));
Q('m_mktg_features', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'Kasauli Hill Mushrooms, an imagined farm in Solan, first asks hotel chefs what they need, then grows button and oyster mushrooms to their specification and prices them so that chefs feel they get good value. Which feature of marketing is shown most clearly?',
  opts: ['It starts from customer needs and creates value for the customer', 'It is concerned only with transferring ownership', 'It ends when the goods are sold', 'It applies only to manufactured goods'],
  sol: 'Beginning with the buyer\'s needs and building an offering that gives them value is the customer orientation of marketing.',
}));
Q('m_goods_services', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Ekamra Electronics, an imagined firm in Bhubaneswar, uses marketing to sell television sets, and an imagined dance academy in the same city uses it to fill its classes. This shows that marketing',
  opts: ['applies to services as well as goods', 'is useful only to large firms', 'is the same as advertising', 'is needed only for luxury goods'],
  sol: 'Marketing applies to both goods and services, and to non-business bodies too.',
}));
Q('ar_market', ar({
  t: 1, d: 3, c: 'understanding',
  a: 'In marketing, the market for a product includes people who do not yet buy it.',
  r: 'Marketers treat both actual and potential buyers as the market.',
  key: 'a',
  sol: 'Both are true, and the reason explains the assertion: potential buyers are part of the market that marketing tries to win.',
}));
Q('tf_market', tf({
  t: 1, d: 1, c: 'understanding',
  stem: 'In marketing, the word market always means a fixed place where buyers and sellers meet.',
  ans: false,
  sol: 'False. It means the buyers, actual and potential, of a product; trade may happen by phone or online with no meeting place.',
}));
Q('fb_market_time', fb({
  t: 1, d: 3, c: 'analysis',
  stem: 'Complete the analogy. A day\'s catch sold the same morning : Very short period market :: Ginning capacity built up over several years : ___',
  acc: [['Long period market', 'long period', 'long-period market', 'long run market']],
  sol: 'A fixed supply sold at once is a very short period market; supply that can be fully changed over years is a long period market.',
}));
Q('fb_market_goods', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'A market in which shares and other securities of companies are bought and sold is called a ___ market.',
  acc: [['stock', 'capital', 'securities', 'share']],
  sol: 'It is a stock (securities) market.',
}));
Q('mt_market_types', match({
  t: 1, d: 3, c: 'application', marks: 2,
  stem: 'Match each imagined situation with the type of market it shows.',
  pairs: [
    ['Fresh garlands bought only by nearby shops', 'Local market'],
    ['Packed fox nuts sold in every Indian state, none abroad', 'National market'],
    ['Glass bangles shipped to Africa and Europe', 'International market'],
    ['A morning catch that must be sold within hours', 'Very short period market'],
  ],
  sol: 'Nearby buyers make a local market; all of India, a national one; buyers abroad, an international one; a fixed, perishable supply, a very short period market.',
}));
Q('s_market_local_intl', short({
  t: 1, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'Distinguish between a local market and an international market, giving an imagined Indian example of each.',
  model: 'A **local market** has buyers in and around **one place**, usually for perishable or bulky goods, such as fresh paneer sold within a town. An **international market** has buyers in **several countries**, such as hand-knotted carpets exported from an imagined Bhadohi firm.',
  sol: 'Each type explained with a suitable example.',
  scheme: [['Local market with example', 1], ['International market with example', 1]],
}));
Q('s_mktg_meaning', short({
  t: 1, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'Tapi Banana Ripeners, an imagined firm in Jalgaon, studies what fruit shops want, ripens bananas to the right stage and delivers them on time at a fair price. Explain the meaning of marketing with reference to the firm.',
  model: '**Marketing** is the process of **identifying customers\' needs** and **satisfying them** through the exchange of goods or services, **at a profit**. The firm learns what shops need, offers bananas that suit them and earns through their **satisfaction**.',
  sol: 'Meaning of marketing applied to the firm.',
  scheme: [['Meaning', 1], ['Applied to the case', 1]],
}));
Q('s3_market_time', short({
  t: 1, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'Explain the classification of markets on the basis of time into very short period, short period and long period markets, with an imagined example of each.',
  model: '1. **Very short period:** supply is **fixed** and cannot change, as with **fresh fish** landed and sold the same morning.\n2. **Short period:** supply can be changed **partly**, using existing plants, as when a **bakery** runs extra shifts before a festival.\n3. **Long period:** supply can be changed **fully**, including new plants, as when a **cotton ginner** builds new units over years.',
  sol: 'Each type explained with an example.',
  scheme: [['Very short period', 1], ['Short period', 1], ['Long period', 1]],
}));
Q('s3_mktg_features', short({
  t: 1, d: 2, c: 'application', marks: 3, wl: S3,
  stem: 'Explain three features of marketing, with reference to Kasauli Hill Mushrooms (imagined), Solan, which supplies mushrooms to hotels.',
  model: '1. **Needs and wants:** it begins by finding what **hotel chefs need**, such as fresh mushrooms every morning.\n2. **Creating a market offering and value:** it grows the **right varieties** at prices that give chefs good value.\n3. **Exchange mechanism and continuity:** mushrooms are exchanged for payment, and the firm keeps **checking feedback** to serve chefs better.',
  sol: 'Any three features (needs and wants, market offering, customer value, exchange, customer orientation, continuous, goods and services), each applied.',
  scheme: [['First feature', 1], ['Second feature', 1], ['Third feature', 1]],
}));
Q('l_market', long({
  t: 1, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: '(a) What is meant by a market in marketing? [1]\n(b) Classify markets on the basis of area, time and nature of goods, with an example of each type. [4]',
  model: '(a) A **market** is the set of **actual and potential buyers** of a product, wherever they are and however they trade.\n\n(b) **By area:** **local** (fresh flowers sold in one town), **regional** (a snack sold across a few states), **national** (a packed food sold all over India) and **international** (carpets exported to many countries).\n**By time:** **very short period** (a day\'s fish catch, supply fixed), **short period** (supply partly adjustable, such as extra bakery shifts) and **long period** (supply fully adjustable through new plants).\n**By nature of goods:** **produce markets** (wheat, cotton), **manufactured goods markets** (fans, shoes), **bullion markets** (gold, silver) and **stock markets** (shares).',
  sol: 'Meaning; classification by area, time and nature of goods with examples.',
  scheme: [['(a) Meaning', 1], ['(b) By area', 2], ['(b) By time and by nature of goods', 2]],
}));

// ================================================================ t02 Traditional and modern concepts; marketing versus selling
Q('m_production_concept', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Hasdeo Roofing, an imagined maker of cement sheets in Korba, believes that if it keeps costs low through huge output and stocks every hardware shop, its sheets will sell themselves. Which concept of marketing does it follow?',
  opts: ['Production concept', 'Product concept', 'Selling concept', 'Societal marketing concept'],
  sol: 'Focusing on low cost through large-scale output and wide availability is the production concept.',
}));
Q('m_product_concept', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'Athangudi Tile Works, an imagined firm in Karaikudi, spent three years perfecting a hand-made tile that never fades, but sales fell because buyers now want large, plain tiles that are quick to lay. Which concept had the firm followed?',
  opts: ['Product concept', 'Marketing concept', 'Production concept', 'Societal marketing concept'],
  sol: 'Concentrating on perfecting the product without checking what buyers want is the product concept; it can blind a firm to changing needs.',
}));
Q('m_selling_concept', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Gaula Furniture Mart, an imagined store in Haldwani, has a warehouse full of heavy sofas. Its salespeople follow every visitor around the showroom with "today only" offers, believing people will not buy enough unless pushed hard. This is the',
  opts: ['selling concept', 'marketing concept', 'product concept', 'societal marketing concept'],
  sol: 'Relying on aggressive selling and promotion to dispose of what has been made is the selling concept.',
}));
Q('m_marketing_concept', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Before planning its new range, Mandovi Bakeries, an imagined bakery in Panaji, asks regular customers what breads they want, bakes to match, and trains staff to fix any complaint at once, aiming to earn profit through satisfied customers. This is the',
  opts: ['marketing concept', 'selling concept', 'production concept', 'product concept'],
  sol: 'Starting from customer needs and earning profit through customer satisfaction is the marketing concept.',
}));
Q('m_societal', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'Andaman Coconut Products, an imagined firm in Port Blair, sells good coconut oil at fair prices, has moved to refillable steel cans and buys only from farms that protect mangroves. Which concept does it follow?',
  opts: ['Societal marketing concept', 'Selling concept', 'Production concept', 'Product concept'],
  sol: 'Satisfying customers while also caring for the long-term welfare of society and the environment is the societal marketing concept.',
}));
Q('m_mktg_vs_selling', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'The sales head of Ekamra Electronics (imagined) says, "My job ends when the TV is sold." The marketing head replies, "Mine starts before the TV is made and goes on long after it is sold." The difference they describe is that',
  opts: ['marketing is wider; selling is only one part of it, focused on transferring ownership', 'selling is wider than marketing', 'marketing ends with the sale', 'selling begins before production'],
  sol: 'Marketing covers finding needs, designing, pricing, distributing, selling and after-sales service; selling is the part that transfers ownership.',
}));
Q('ar_concepts', ar({
  t: 2, d: 3, c: 'analysis',
  a: 'The societal marketing concept considers the long-term welfare of society.',
  r: 'The production concept assumes that customers prefer products that are cheap and widely available.',
  key: 'b',
  sol: 'Both statements are true, but the assumption of the production concept has nothing to do with why the societal concept looks after society.',
}));
Q('ar_selling', ar({
  t: 2, d: 3, c: 'analysis',
  a: 'Marketing activities begin before a product is produced.',
  r: 'Marketing ends as soon as the product is sold.',
  key: 'c',
  sol: 'The assertion is true: needs are studied and products designed first. The reason is false: marketing continues after the sale through service and feedback.',
}));
Q('tf_concepts', tf({
  t: 2, d: 1, c: 'understanding',
  stem: 'Under the selling concept, a firm\'s main focus is on finding out and satisfying customer needs.',
  ans: false,
  sol: 'False. The selling concept focuses on pushing existing products through aggressive selling; focusing on customer needs is the marketing concept.',
}));
Q('fb_concepts', fb({
  t: 2, d: 3, c: 'analysis',
  stem: 'Complete the analogy. Production concept : Low cost and wide availability :: Societal marketing concept : Customer satisfaction and the long-term welfare of ___',
  acc: [['society', 'the society', 'the public']],
  sol: 'The production concept stresses cost and availability; the societal marketing concept adds the long-term welfare of society to customer satisfaction.',
}));
Q('s_mktg_selling', short({
  t: 2, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'Using Ekamra Electronics (imagined), Bhubaneswar, as an example, give two differences between marketing and selling.',
  model: '1. **Scope:** selling only **transfers the TV** to the buyer; marketing also covers **research, design, pricing, distribution** and after-sales service.\n2. **Focus:** selling stresses the **seller\'s need** to clear stock; marketing stresses the **buyer\'s needs** and satisfaction.',
  sol: 'Two valid differences (scope, focus, start and end, means, aim) with the TV example.',
  scheme: [['First difference', 1], ['Second difference', 1]],
}));
Q('s_trad_modern', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Distinguish between the traditional and the modern concepts of marketing on the basis of (i) starting point and focus, and (ii) the way profit is earned.',
  model: '(i) **Traditional** concepts start from the **product or the factory** and focus on output or selling; **modern** concepts start from the **customer\'s needs**.\n(ii) Traditional concepts earn profit through **sales volume**; modern concepts earn it through **customer satisfaction** (and social welfare).',
  sol: 'Both bases correctly contrasted.',
  scheme: [['(i) Starting point and focus', 1], ['(ii) Way profit is earned', 1]],
}));
Q('s3_myopia', short({
  t: 2, d: 4, c: 'analysis', marks: 3, wl: S3,
  stem: 'Athangudi Tile Works (imagined), Karaikudi, lost sales even though its tiles were the finest in town, because buyers had moved to large, plain tiles. Identify the concept it followed, explain why it failed, and suggest the concept it should adopt.',
  model: '1. **Concept followed: product concept**, which assumes buyers always want the **best-made product**.\n2. **Why it failed:** the firm looked only at its tile and **ignored changing needs**; quality alone could not sell a style buyers no longer wanted.\n3. **Suggested: marketing concept** — study buyers first, then make **large, plain tiles** they want while keeping its quality name.',
  sol: 'Concept identified, failure explained, modern concept suggested.',
  scheme: [['Concept identified', 1], ['Reason for failure', 1], ['Concept suggested with reason', 1]],
}));
Q('l_concepts', long({
  t: 2, d: 3, c: 'application', marks: 5, wl: L5,
  stem: '(a) Distinguish between the traditional and modern concepts of marketing on any two bases. [2]\n(b) Explain the marketing concept and the societal marketing concept, with an imagined Indian example of each. [3]',
  model: '(a) 1. **Starting point:** traditional concepts begin with the **product or factory**; modern concepts begin with the **customer\'s needs**.\n2. **Route to profit:** traditional concepts seek profit through **large sales volume**; modern concepts seek it through **customer satisfaction**.\n\n(b) **Marketing concept:** the firm first learns what customers want and builds its products, prices and service around their **satisfaction**. For example, an imagined bakery that asks customers which breads they want and bakes accordingly.\n**Societal marketing concept:** the firm satisfies customers while also protecting the **long-term welfare of society and the environment**. For example, an imagined oil maker that uses refillable cans and buys only from farms that protect mangroves.',
  sol: 'Two bases; both modern concepts explained with examples.',
  scheme: [['(a) Two bases', 2], ['(b) Marketing concept explained', 1], ['(b) Societal marketing concept explained', 1], ['(b) A suitable example of each', 1]],
}));

// ================================================================ t03 Objectives and importance of marketing
Q('m_obj_satisfaction', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Mahananda Mango Exports, an imagined exporter in Malda, removes bruised fruit, packs each mango in a cushioned tray and replaces any spoiled box free of charge. Which objective of marketing is it mainly pursuing?',
  opts: ['Customer satisfaction', 'Reducing its market share', 'Avoiding competition', 'Cutting the number of products'],
  sol: 'Careful quality and free replacement aim at satisfying customers, a central objective of marketing.',
}));
Q('m_obj_demand', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Mithila Makhana Co., an imagined firm in Darbhanga, runs cooking demonstrations in cities where few people had heard of roasted fox-nut snacks. Which objective of marketing is this?',
  opts: ['Creating demand', 'Customer retention through after-sales service', 'Reducing costs of storage', 'Meeting legal requirements'],
  sol: 'Introducing people to a product and making them want it creates demand.',
}));
Q('m_obj_share', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'Kanch Kala Bangles (imagined) plans to raise its share of the country\'s glass-bangle sales from one-tenth to one-fifth within three years. This objective of marketing is',
  opts: ['increasing market share', 'creating goodwill only', 'reducing output', 'avoiding new markets'],
  sol: 'Aiming at a larger proportion of total industry sales is the objective of increasing market share.',
}));
Q('m_imp_consumers', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'Because many firms market their products in Bhubaneswar, a family there can compare thirty models of ceiling fans at different prices and with different features before buying. This shows the importance of marketing to',
  opts: ['consumers, through wider choice', 'the government, through taxes', 'the firm only, through higher profit', 'rival firms, through lower costs'],
  sol: 'Marketing brings a variety of products, information and choice to consumers.',
}));
Q('m_imp_society', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'As fox-nut snacks from Mithila were marketed across India, new jobs arose for pond workers, roasters, packers, truck drivers and shopkeepers. This shows the importance of marketing to',
  opts: ['society, by creating employment', 'consumers, by lowering quality', 'the firm, by reducing its sales', 'rival firms, by sharing customers'],
  sol: 'The many activities that marketing involves create jobs, which benefits society.',
}));
Q('ar_obj', ar({
  t: 3, d: 3, c: 'understanding',
  a: 'Earning profit through customer satisfaction is a central objective of modern marketing.',
  r: 'Satisfied customers buy again and recommend the product to others.',
  key: 'a',
  sol: 'Both are true, and the reason explains the assertion: repeat buying and recommendations turn satisfaction into lasting profit.',
}));
Q('tf_obj', tf({
  t: 3, d: 1, c: 'understanding',
  stem: 'Marketing benefits only the firm; it does nothing for consumers or society.',
  ans: false,
  sol: 'False. Consumers gain choice, quality and information, and society gains jobs, growth and a better standard of living.',
}));
Q('s_objectives', short({
  t: 3, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'State two objectives of marketing for Mahananda Mango Exports (imagined), Malda, which wants to sell more mangoes abroad.',
  model: '1. **Creating demand:** making buyers in new countries **want Malda mangoes**, for example through tastings at trade fairs.\n2. **Customer satisfaction and goodwill:** delivering **sound, well-packed fruit** so importers reorder and the name earns trust.',
  sol: 'Any two objectives (creating demand, satisfaction, market share, profitable sales, goodwill) linked to the exporter.',
  scheme: [['First objective', 1], ['Second objective', 1]],
}));
Q('s_imp_consumers', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Explain two ways in which marketing benefits consumers.',
  model: '1. **Wider choice:** many firms offer **varieties at different prices**, so buyers can pick what suits them.\n2. **Information and better quality:** promotion tells buyers **about products and their uses**, and competition pushes firms to **improve quality**.',
  sol: 'Any two benefits to consumers (choice, quality, information, availability, standard of living).',
  scheme: [['First benefit', 1], ['Second benefit', 1]],
}));
Q('s3_importance', short({
  t: 3, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'Using Mithila Makhana Co. (imagined), Darbhanga, explain one point of importance of marketing to (i) the firm, (ii) consumers and (iii) society.',
  model: '(i) **Firm:** marketing **raises sales and profit** as fox-nut snacks reach new cities, and gives information for decisions.\n(ii) **Consumers:** city buyers get a **healthy new snack** and more choice.\n(iii) **Society:** demand creates **jobs** for pond workers, roasters and transporters and helps the regional economy grow.',
  sol: 'One correct point for each group, applied to the firm.',
  scheme: [['(i) Firm', 1], ['(ii) Consumers', 1], ['(iii) Society', 1]],
}));
Q('s3_objectives3', short({
  t: 3, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain any three objectives of marketing.',
  model: '1. **Creating demand:** informing and persuading people so that they **want the product**.\n2. **Customer satisfaction:** offering products and service that **meet needs**, which brings repeat buying.\n3. **Market share and profitable sales:** winning a **larger share** of industry sales and earning **profit** through growing, satisfied demand.',
  sol: 'Any three objectives explained.',
  scheme: [['First objective', 1], ['Second objective', 1], ['Third objective', 1]],
}));
Q('l_importance', long({
  t: 3, d: 2, c: 'understanding', marks: 5, wl: L5,
  stem: '(a) State two objectives of marketing. [2]\n(b) Explain the importance of marketing to firms, to consumers and to society, with one point for each. [3]',
  model: '(a) 1. **Creating demand** for the product by informing and persuading buyers.\n2. **Earning profit through customer satisfaction**, so that buyers return and recommend the product.\n\n(b) **To firms:** marketing **raises sales and profit** and gives information on customers and rivals for better **decisions** on products and prices.\n**To consumers:** it offers **wider choice**, better quality and useful information, so buyers get **value for money**.\n**To society:** marketing activities such as transport, storage, retailing and advertising create **jobs**, and wider demand encourages **production and economic growth**, raising the standard of living.',
  sol: 'Two objectives; one point of importance for each group.',
  scheme: [['(a) Two objectives', 2], ['(b) Firms', 1], ['(b) Consumers', 1], ['(b) Society', 1]],
}));

// ================================================================ t04 Functions of marketing
Q('m_fn_research', mcq({
  t: 4, d: 2, c: 'application',
  stem: 'Before choosing which cities to enter, Mithila Makhana Co. (imagined) studied snack-shop sales records, rivals\' prices and festival-season demand in six cities. Which function of marketing is this?',
  opts: ['Market research', 'Grading', 'Risk bearing', 'Assembling'],
  sol: 'Collecting and analysing information about buyers, demand and competitors is market (marketing) research.',
}));
Q('m_fn_assembling', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'Varuna Carpet Weavers, an imagined export house in Bhadohi, collects finished carpets from three hundred home looms in nearby villages and brings them to one central yard for export. Which function of marketing is this?',
  opts: ['Assembling', 'Standardisation', 'Financing', 'Selling'],
  sol: 'Bringing together goods from many scattered producers to one place is assembling.',
}));
Q('m_fn_std', mcq({
  t: 4, d: 3, c: 'analysis',
  stem: 'Varuna Carpet Weavers (imagined) fixes the exact size, colour codes and knot count for each carpet design, so that buyers abroad can order from a catalogue without seeing the carpet. This function is',
  opts: ['standardisation', 'grading', 'assembling', 'storage'],
  sol: 'Laying down fixed specifications that every unit must meet is standardisation; grading sorts goods into classes after they are produced.',
}));
Q('m_fn_grading', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'After picking, Burhi Gandak Litchi Farms, an imagined orchard near Muzaffarpur, places its fruit into an "export class" for a Dubai buyer and a "juice class" for a juice plant. Placing the fruit in these classes is',
  opts: ['grading', 'standardisation', 'financing', 'transport'],
  sol: 'Sorting produce into classes of similar quality after harvest is grading.',
}));
Q('m_fn_storage', mcq({
  t: 4, d: 2, c: 'application',
  stem: 'Kanchenjunga Tea Traders, an imagined firm in Darjeeling, keeps its spring teas in sealed, humidity-controlled godowns until buyers in Europe order them months later. This function creates time utility through',
  opts: ['storage (warehousing)', 'transport', 'grading', 'risk bearing'],
  sol: 'Holding goods from the time they are produced until they are wanted is storage, which creates time utility.',
}));
Q('m_fn_transport', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'Trucks carry bananas from the orchards of Jalgaon to fruit markets in Delhi within two days. This function of marketing mainly creates',
  opts: ['place utility', 'time utility', 'form utility', 'no utility'],
  sol: 'Transport moves goods from where they are produced to where they are wanted, creating place utility.',
}));
Q('m_fn_financing', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'Varuna Carpet Weavers (imagined) allows its foreign importers ninety days to pay and borrows from a bank to pay its weavers meanwhile. Which function of marketing is this?',
  opts: ['Financing', 'Grading', 'Assembling', 'Market research'],
  sol: 'Providing and arranging funds for marketing activities, including credit to buyers, is financing.',
}));
Q('m_fn_risk', mcq({
  t: 4, d: 3, c: 'application',
  stem: 'Mahananda Mango Exports (imagined) insures every shipment against damage in transit and keeps extra cold-chain capacity in case a cargo flight is cancelled. Which function of marketing is it performing?',
  opts: ['Risk bearing', 'Standardisation', 'Selling', 'Assembling'],
  sol: 'Taking steps to cover possible losses from damage, delay or price falls is risk bearing.',
}));
Q('ar_fn', ar({
  t: 4, d: 3, c: 'understanding',
  a: 'Storage creates time utility.',
  r: 'Storage allows goods produced at one time to be used later, when they are wanted.',
  key: 'a',
  sol: 'Both are true, and the reason explains the assertion: holding goods until they are wanted is what gives time utility.',
}));
Q('ar_fn2', ar({
  t: 4, d: 3, c: 'analysis',
  a: 'Grading is done before production begins.',
  r: 'Standardisation means sorting finished goods into classes after production.',
  key: 'd',
  sol: 'Both statements are false. Standardisation lays down specifications in advance; grading sorts goods, especially produce, into classes after production or harvest.',
}));
Q('tf_fn', tf({
  t: 4, d: 1, c: 'understanding',
  stem: 'Transportation creates place utility by moving goods to where they are wanted.',
  ans: true,
  sol: 'True. Goods are worth more where buyers are; moving them there adds place utility.',
}));
Q('fb_fn', fb({
  t: 4, d: 1, c: 'recall',
  stem: 'Sorting farm produce into classes of similar size and quality after harvest is called ___.',
  acc: [['grading']],
  sol: 'This is grading.',
}));
Q('mt_fn', match({
  t: 4, d: 2, c: 'application', marks: 2,
  stem: 'Match each activity of an imagined carpet and tea exporter with the marketing function it represents.',
  pairs: [
    ['Collecting carpets from village looms to one yard', 'Assembling'],
    ['Fixing size and knot-count specifications for each design', 'Standardisation'],
    ['Keeping tea in humidity-controlled godowns', 'Storage'],
    ['Allowing importers ninety days to pay', 'Financing'],
  ],
  sol: 'Bringing goods together is assembling; fixing specifications is standardisation; holding goods is storage; giving credit is financing.',
}));
Q('s_fn_std_grading', short({
  t: 4, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'Distinguish between standardisation and grading, with an example of each from an imagined fruit and carpet business.',
  model: '**Standardisation** fixes **specifications in advance**, such as the size and knot count every carpet design must meet. **Grading** **sorts goods into classes** after production or harvest, such as placing litchis in export and juice classes.',
  sol: 'Each defined with an example; the before/after difference shown.',
  scheme: [['Standardisation with example', 1], ['Grading with example', 1]],
}));
Q('s_fn_storage_transport', short({
  t: 4, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'Explain how storage and transport add value to raisins produced by Krishna Raisin Traders, an imagined firm in Sangli.',
  model: '**Storage** keeps raisins dried in March in **cold stores** until buyers need them later in the year, creating **time utility**. **Transport** moves them from Sangli to **buyers across India**, creating **place utility**.',
  sol: 'Time utility from storage and place utility from transport, applied to raisins.',
  scheme: [['Storage and time utility', 1], ['Transport and place utility', 1]],
}));
Q('s3_fn_classify', short({
  t: 4, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Marketing functions are often grouped as functions of exchange, functions of physical supply and facilitating functions. Explain each group, naming the functions it includes.',
  model: '1. **Functions of exchange:** **buying, assembling and selling**, which bring about the transfer of ownership.\n2. **Functions of physical supply:** **transport and storage**, which move goods to buyers and hold them until wanted.\n3. **Facilitating functions:** **standardisation and grading, financing, risk bearing and market research**, which help the other functions run smoothly.',
  sol: 'Each group explained with its functions.',
  scheme: [['Exchange', 1], ['Physical supply', 1], ['Facilitating', 1]],
}));
Q('s3_fn_case', short({
  t: 4, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Garo Hills Ginger Growers, an imagined group in Tura, buys ginger from small farmers, cleans and sorts it into three sizes, and keeps it in a dry godown until traders from Guwahati collect it. Identify and explain three marketing functions in this case.',
  model: '1. **Buying and assembling:** the group **buys from many small farmers** and gathers the ginger in one place.\n2. **Grading:** ginger is **sorted into three sizes**, so each class can be priced and sold to the right buyer.\n3. **Storage:** the **dry godown** holds ginger until traders collect it, creating time utility.',
  sol: 'Three functions identified from the case and explained.',
  scheme: [['First function', 1], ['Second function', 1], ['Third function', 1]],
}));
Q('s3_fn_risk_fin', short({
  t: 4, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'Explain financing, risk bearing and market research as functions of marketing, with an example of each from an imagined mango exporter.',
  model: '1. **Financing:** arranging **funds** for buying, packing and credit to buyers, such as a **bank loan** to pay growers before importers pay.\n2. **Risk bearing:** covering possible **losses**, such as **insuring shipments** against damage.\n3. **Market research:** gathering information on **demand, prices and rivals**, such as studying which countries pay most for which variety.',
  sol: 'Each function explained with a mango example.',
  scheme: [['Financing', 1], ['Risk bearing', 1], ['Market research', 1]],
}));
Q('l_functions', long({
  t: 4, d: 3, c: 'application', marks: 5, wl: L5,
  stem: 'Mahananda Mango Exports (imagined), Malda, buys mangoes from growers, sorts them, packs them, keeps them cool, flies them abroad and sells them to importers on credit. Explain five functions of marketing that the firm performs, with an example of each from its business.',
  model: '1. **Buying and assembling:** it **buys mangoes from many growers** and collects them at its packing house.\n2. **Grading:** fruit is **sorted by size, colour and ripeness**, so each class goes to a suitable buyer at a suitable price.\n3. **Storage:** **cold rooms** keep the fruit fresh until the cargo flight, creating time utility.\n4. **Transport:** trucks and **cargo flights** carry mangoes to importers abroad, creating place utility.\n5. **Financing and risk bearing:** it gives **importers credit** and insures shipments against damage or delay.\nIt also performs **selling**, as ownership passes to importers.',
  sol: 'Five functions explained, each with an example from the exporter.',
  scheme: [['Five functions with examples, one mark each', 5]],
}));

// ================================================================ case-based
Q('cb_concepts', caseQ({
  t: [2, 3], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the passage and answer the questions that follow. *(Imagined firm and people, written by SOYL for practice.)*',
  passage: '**Bidri Art Works (imagined), Bidar**\n\nFor years the firm made heavy silver-inlaid vases and relied on salesmen who pressed tourists hard at the shop door. Sales kept falling. Its new manager, Zoya, met young buyers and learned that they wanted small, light pieces such as pen stands and earrings that could be gifted or posted. The firm redesigned its range, began selling online and now uses only recycled metal for the base.',
  parts: [
    child('a', mcq({ t: 2, d: 2, c: 'application', stem: 'Pressing tourists hard at the shop door shows which concept?', opts: ['Selling concept', 'Marketing concept', 'Production concept', 'Societal marketing concept'], sol: 'Aggressive persuasion to dispose of existing stock is the selling concept.' })),
    child('b', short({ t: 2, d: 3, c: 'analysis', marks: 1, stem: 'Which concept does the firm move towards when it uses only recycled metal for the base?', model: 'The **societal marketing concept**.', sol: 'Care for the environment beyond customer satisfaction marks the societal concept.', scheme: [['Societal marketing concept', 1]] })),
    child('c', short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Explain how Zoya\'s approach reflects the marketing concept.', model: 'She **began with buyers\' needs** by meeting them, then **redesigned the product** to suit them, aiming at **sales through satisfaction**.', sol: 'Starts from needs; product built around them.', scheme: [['Starts from customer needs', 1], ['Product and sales built on satisfaction', 1]] }), [
      short({ t: 3, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): State two benefits the firm\'s customers gain from its new approach.', model: '**Wider choice** of light, giftable pieces; **convenience** of buying online and having pieces posted.', sol: 'Two consumer benefits from the passage.', scheme: [['First benefit', 1], ['Second benefit', 1]] }),
    ]),
  ],
}));
Q('cb_functions', caseQ({
  t: [4, 1], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the passage and answer the questions that follow. *(Imagined firm and people, written by SOYL for practice.)*',
  passage: '**Kirti Durg Weaves (imagined), Chanderi**\n\nThe cooperative collects sarees from two hundred handloom families, checks that each meets fixed rules on length, thread count and border width, and sorts them into premium and regular lots. It stores them in a dry hall, sends parcels by courier to boutiques in Mumbai, Bengaluru and Singapore, and lets boutiques pay within sixty days.',
  parts: [
    child('a', mcq({ t: 4, d: 2, c: 'application', stem: 'Collecting sarees from two hundred families is the function of', opts: ['assembling', 'grading', 'financing', 'risk bearing'], sol: 'Bringing goods from many producers together is assembling.' })),
    child('b', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'On the basis of area, what kind of market does the cooperative serve?', model: 'An **international** market (buyers in India and Singapore).', sol: 'Buyers in more than one country make it international.', scheme: [['International market', 1]] })),
    child('c', short({ t: 4, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Distinguish the two functions shown by "fixed rules on length, thread count and border width" and "premium and regular lots".', model: 'Fixed rules are **standardisation** (specifications set in advance); premium and regular lots are **grading** (sorting finished sarees into classes).', sol: 'Standardisation versus grading.', scheme: [['Standardisation', 1], ['Grading', 1]] }), [
      short({ t: 4, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Name the utility created by the dry hall and the one created by courier dispatch.', model: '**Dry hall (storage): time utility.** **Courier (transport): place utility.**', sol: 'Storage gives time utility; transport gives place utility.', scheme: [['Time utility', 1], ['Place utility', 1]] }),
    ]),
  ],
}));
