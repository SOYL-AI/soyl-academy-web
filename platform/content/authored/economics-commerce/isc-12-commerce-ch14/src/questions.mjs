// ISC 12 Commerce, ch14 Marketing Mix: Product and Price — question bank. Every firm, person and situation is
// imagined and written by SOYL and labelled as such; no ISC or CBSE textbook illustration or exercise and no CISCE
// specimen or board item is reused (D-036). Firms, places and set-ups differ from the CBSE 12 Business Studies
// chapter on marketing.
import { Q, mcq, ar, tf, fb, match, short, long, caseQ, child } from './lib.mjs';

const S2 = [30, 50];
const S3 = [50, 75];
const L5 = [100, 150];

// ================================================================ t01 Marketing mix
Q('m_mix_def', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Hirakud Ikat House, an imagined weaving firm in Sambalpur, decides which sarees to weave, what to charge for them, which boutiques will sell them and how to make them known. Together these decisions make up its',
  opts: ['marketing mix', 'span of control', 'channel of distribution', 'production plan only'],
  sol: 'The set of decisions on product, price, place and promotion is the marketing mix.',
}));
Q('m_mix_p', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Deomali Coffee, an imagined roaster in Koraput, decides to sell its coffee through cafés at railway stations instead of grocery shops. Which element of the marketing mix is it deciding?',
  opts: ['Place', 'Product', 'Price', 'Promotion'],
  sol: 'Decisions about where and through whom the product reaches buyers belong to place (distribution).',
}));
Q('m_mix_together', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: 'An imagined firm launched a premium estate coffee at a bargain price, sold it from roadside stalls and advertised it with "cheapest in town" banners. Sales were poor. What is the most likely reason?',
  opts: ['The four elements of the mix sent conflicting signals instead of supporting one another', 'The coffee had no price', 'The firm used too many elements of the mix', 'Promotion is not part of the marketing mix'],
  sol: 'A premium product needs a price, place and promotion that match its image; inconsistent elements confuse buyers.',
}));
Q('ar_mix', ar({
  t: 1, d: 3, c: 'analysis',
  a: 'The four elements of the marketing mix should be consistent with one another.',
  r: 'A premium product sold at a bargain price through discount stalls sends mixed signals to buyers.',
  key: 'a',
  sol: 'Both are true, and the reason explains the assertion: mismatched elements weaken each other, so they must fit together.',
}));
Q('tf_mix', tf({
  t: 1, d: 1, c: 'recall',
  stem: 'Promotion is one of the four elements of the marketing mix.',
  ans: true,
  sol: 'True. The four elements are product, price, place and promotion.',
}));
Q('fb_mix', fb({
  t: 1, d: 3, c: 'analysis',
  stem: 'Complete the analogy. Deciding the selling price : Price :: Deciding the channel through which goods reach buyers : ___',
  acc: [['Place', 'place mix', 'distribution']],
  sol: 'Price decisions form the price mix; channel decisions belong to place (the place mix).',
}));
Q('s_mix', short({
  t: 1, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'What is meant by the marketing mix? Name its four elements, with one decision under each for Changthang Pashmina, an imagined shawl maker in Leh.',
  model: 'The **marketing mix** is the **combination of decisions** a firm uses to satisfy its target buyers. **Product:** shawl designs; **price:** premium rates; **place:** its own showroom and online store; **promotion:** stories of the herders on social media.',
  sol: 'Meaning plus the four elements with a decision each.',
  scheme: [['Meaning', 1], ['Four elements with decisions', 1]],
}));
Q('s3_mix', short({
  t: 1, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'Kalika Namkeen, an imagined snack maker in Ratlam, wants to sell a low-cost family pack of sev to working families. Explain how its four Ps should support one another.',
  model: '1. **Product and price:** a **large, plain pack** with less costly packaging keeps the **price low**, which suits families on a budget.\n2. **Place:** sell through **neighbourhood grocery shops** where such families shop daily.\n3. **Promotion:** stress **value for money** in local papers and shop posters, matching the low price, so every element sends the **same message**.',
  sol: 'All four Ps covered and shown to fit together.',
  scheme: [['Product and price linked', 1], ['Place linked', 1], ['Promotion linked and consistency shown', 1]],
}));

// ================================================================ t02 Product: goods and services
Q('m_product_def', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'A traveller buying a desert-camp package from Golden Dunes Camps, an imagined firm in Jaisalmer, pays for the tent, the meals, the camel ride and the guide\'s stories. This shows that, in marketing, a product is',
  opts: ['a bundle of tangible and intangible benefits that satisfy a need', 'only a physical object', 'only the brand name', 'whatever the firm finds easiest to make'],
  sol: 'A product is anything offered to satisfy a need: a bundle of physical and service benefits.',
}));
Q('m_convenience', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'At a railway stall, a commuter quickly buys a newspaper, a bottle of water and a pack of biscuits without comparing brands. These are',
  opts: ['convenience goods', 'shopping goods', 'specialty goods', 'industrial goods'],
  sol: 'Low-priced items bought often, quickly and from the nearest outlet are convenience goods.',
}));
Q('m_shopping', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'A family spends two weekends comparing the features, prices and service terms of washing machines at different dealers before buying one. For this family, the washing machine is a',
  opts: ['shopping good', 'convenience good', 'specialty good', 'industrial good'],
  sol: 'Goods bought after comparing quality, price and features across sellers are shopping goods.',
}));
Q('m_specialty', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'Collectors travel all the way to Leh to buy hand-spun Changthang pashmina shawls (imagined brand) and refuse any substitute, however high the price. For them, these shawls are',
  opts: ['specialty goods', 'convenience goods', 'shopping goods', 'industrial goods'],
  sol: 'Goods with unique features for which buyers make a special effort and accept no substitute are specialty goods.',
}));
Q('m_industrial', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Which of the following, bought by Kharkhoda Electricals, an imagined motor maker in Sonipat, is an **industrial** good?',
  opts: ['Copper wire used to wind its motors', 'A television for the owner\'s home', 'Groceries for the owner\'s family', 'A holiday package for the owner'],
  sol: 'Goods bought for use in producing other goods are industrial goods; the rest are for personal consumption.',
}));
Q('m_service_perish', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'A bus run by an imagined travel firm in Pasighat leaves half-empty. Its unsold seats on that trip cannot be kept and sold the next day. Which feature of services does this show?',
  opts: ['Perishability', 'Tangibility', 'Ownership', 'Standardisation'],
  sol: 'Services cannot be stored; capacity not used at the time is lost. This is perishability.',
}));
Q('m_service_insep', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'At an imagined salon in Rewari, a haircut is produced by the stylist and used by the customer at the same time, with the customer present throughout. Which feature of services is this?',
  opts: ['Inseparability', 'Perishability', 'Tangibility', 'Transfer of ownership'],
  sol: 'Production and consumption of a service take place together; they cannot be separated.',
}));
Q('ar_service', ar({
  t: 2, d: 3, c: 'analysis',
  a: 'Services cannot be stored for sale later.',
  r: 'The quality of a service may vary with the person who provides it and the time it is provided.',
  key: 'b',
  sol: 'Both are true, but variability does not explain why services cannot be stored; that is due to their perishability.',
}));
Q('tf_goods', tf({
  t: 2, d: 1, c: 'understanding',
  stem: 'Shopping goods are bought often, with little effort, from the nearest shop.',
  ans: false,
  sol: 'False. That describes convenience goods; shopping goods are bought after comparing quality and price.',
}));
Q('mt_goods', match({
  t: 2, d: 3, c: 'application', marks: 2,
  stem: 'Match each imagined purchase with the type of good it is.',
  pairs: [
    ['A newspaper picked up at a station stall', 'Convenience good'],
    ['A washing machine bought after comparing dealers', 'Shopping good'],
    ['A rare hand-spun shawl for which a buyer travels far', 'Specialty good'],
    ['Copper wire bought to wind electric motors', 'Industrial good'],
  ],
  sol: 'Quick, frequent buys are convenience goods; compared buys are shopping goods; unique, sought-after buys are specialty goods; inputs for production are industrial goods.',
}));
Q('s_product_service', short({
  t: 2, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'Distinguish between a product and a service on the basis of tangibility and perishability, using a woollen jacket and a guided trek as imagined examples.',
  model: '**Tangibility:** the **jacket can be seen and touched** before buying; the **trek cannot**, and is judged only on experience.\n**Perishability:** an unsold jacket can be **stored and sold later**; an unfilled place on today\'s trek is **lost for ever**.',
  sol: 'Both bases contrasted with the examples.',
  scheme: [['Tangibility', 1], ['Perishability', 1]],
}));
Q('s_consumer_industrial', short({
  t: 2, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'Distinguish between consumer goods and industrial goods, with an example of each from the purchases of Kharkhoda Electricals (imagined), Sonipat.',
  model: '**Consumer goods** are bought for **personal or household use**, such as the **television** for the owner\'s home. **Industrial goods** are bought to **produce other goods or run a business**, such as the **copper wire** used to wind motors.',
  sol: 'Each defined with an example from the firm.',
  scheme: [['Consumer goods with example', 1], ['Industrial goods with example', 1]],
}));
Q('s3_consumer_types', short({
  t: 2, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain convenience goods, shopping goods and specialty goods, giving an imagined example of each.',
  model: '1. **Convenience goods:** low-priced items bought **often, quickly and nearby**, with little comparison, such as **matchboxes or bread**.\n2. **Shopping goods:** bought only after **comparing quality, style and price**, such as **a refrigerator or a sari** for a wedding.\n3. **Specialty goods:** have **unique features** for which buyers make a **special effort** and accept no substitute, such as a hand-made violin.',
  sol: 'Each type explained with an example.',
  scheme: [['Convenience goods', 1], ['Shopping goods', 1], ['Specialty goods', 1]],
}));
Q('s3_services', short({
  t: 2, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'Explain three features that distinguish services from goods, with reference to the desert-camp packages of Golden Dunes Camps (imagined), Jaisalmer.',
  model: '1. **Intangibility:** a camp night **cannot be seen or touched** before buying; buyers rely on reviews and photos.\n2. **Inseparability:** the **stay is produced and enjoyed together**, with guests present as staff serve them.\n3. **Perishability:** an **empty tent tonight** cannot be stored and sold tomorrow, so the firm offers off-season discounts.',
  sol: 'Any three features (intangibility, inseparability, perishability, variability, no transfer of ownership), each applied.',
  scheme: [['First feature', 1], ['Second feature', 1], ['Third feature', 1]],
}));
Q('l_product', long({
  t: 2, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: '(a) Distinguish between products and services on any three bases. [3]\n(b) Explain any two types of industrial goods with an example of each. [2]',
  model: '(a) 1. **Tangibility:** products can be **seen and touched**; services are **intangible** and judged by experience.\n2. **Perishability:** products can be **stored** for later sale; unused service capacity is **lost**.\n3. **Inseparability:** products are made first and **consumed later**; services are **produced and consumed together**, usually with the buyer present.\n\n(b) 1. **Raw materials and components:** inputs that become **part of the finished product**, such as **copper wire and bearings** for an electric motor.\n2. **Capital items (installations and equipment):** costly, long-lasting goods used to **make other goods**, such as a **moulding machine** in a plastics factory.',
  sol: 'Three bases of difference; two types of industrial goods with examples.',
  scheme: [['(a) Three bases', 3], ['(b) Two types with examples', 2]],
}));

// ================================================================ t03 Branding, labelling and packaging
Q('m_brand_mark', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'On the jars of Japfu Pickles, an imagined pickle maker in Kohima, a red chilli drawn inside a circle appears beside the printed name. The chilli symbol is the firm\'s',
  opts: ['brand mark', 'brand name', 'label', 'grade'],
  sol: 'The part of a brand that is recognised by sight, such as a symbol or design, is the brand mark; the words are the brand name.',
}));
Q('m_trademark', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Japfu Pickles (imagined) registers its name and chilli symbol under the law so that no other firm may use them. Once registered, the brand is a',
  opts: ['trademark', 'brand mark only', 'grade label', 'generic name'],
  sol: 'A brand or part of it that has legal protection through registration is a trademark.',
}));
Q('m_brand_name_quality', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: 'Kumari Coir Products, an imagined firm in Nagercoil, is choosing a brand name for a new coir doormat. Which choice is best?',
  opts: ['"Kumfy" — short, easy to say and to remember', '"Nagercoil-Superior-Coir-Fibre-Floor-Mat"', '"Xqzr7"', '"Doormat"'],
  sol: 'A good brand name is short, easy to pronounce and remember, distinctive and capable of registration; a long name, a jumble of letters or a common word fails these tests.',
}));
Q('m_label_function', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'The label on Gooty Groundnut Oil, an imagined brand from Anantapur, shows the date of packing, the best-before date, the net volume and the nutrition per serving. The label is mainly',
  opts: ['providing information about the product', 'protecting the oil from leakage', 'transporting the oil to shops', 'fixing the price of the oil'],
  sol: 'Describing contents, dates and quantity is the informing function of a label.',
}));
Q('m_pack_levels', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Deomali Coffee (imagined) sells ground coffee in a foil pouch, which goes into a printed box, and twenty boxes travel in a carton. The foil pouch that holds the coffee is the',
  opts: ['primary package', 'secondary package', 'transportation package', 'label'],
  sol: 'The container in direct contact with the product is the primary package; the box is secondary and the carton is for transport.',
}));
Q('m_pack_feature', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Kumari Coir Products (imagined) is redesigning the pack for its doormats. Which aim reflects a feature of good packaging?',
  opts: ['The pack should protect the mat, be easy to carry and show the brand clearly', 'The pack should cost more than the mat', 'The pack should hide the size and material', 'The pack should be as heavy as possible'],
  sol: 'Good packaging protects the product, is convenient to handle, identifies the brand and informs the buyer, at a sensible cost.',
}));
Q('m_pack_promo', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: 'On a crowded supermarket shelf, the bright, easy-tear pack of Kalika Namkeen (imagined) catches shoppers\' eyes, and many pick it up without any salesperson\'s help. This shows packaging acting as',
  opts: ['a silent salesman that promotes the product', 'a protection against moisture only', 'a legal requirement only', 'a channel of distribution'],
  sol: 'In self-service stores, an attractive, informative pack attracts and persuades buyers by itself.',
}));
Q('ar_brand', ar({
  t: 3, d: 3, c: 'understanding',
  a: 'A well-known brand makes it easier for a firm to launch new products.',
  r: 'Buyers tend to carry their trust in a brand over to new products sold under it.',
  key: 'a',
  sol: 'Both are true, and the reason explains the assertion: existing goodwill gives new products a ready welcome.',
}));
Q('ar_pack', ar({
  t: 3, d: 3, c: 'analysis',
  a: 'Packaging protects a product during storage and transport.',
  r: 'Packaging has no role in promoting a product.',
  key: 'c',
  sol: 'The assertion is true. The reason is false: an attractive, informative pack helps sell the product, especially in self-service stores.',
}));
Q('tf_label', tf({
  t: 3, d: 1, c: 'understanding',
  stem: 'A label may carry information that the law requires, such as the maximum retail price and the net quantity.',
  ans: true,
  sol: 'True. Besides describing the product, labels carry legally required details.',
}));
Q('fb_brand', fb({
  t: 3, d: 3, c: 'analysis',
  stem: 'Complete the analogy. The words of a brand that can be spoken : Brand name :: The symbol or design of a brand that can be recognised : ___',
  acc: [['Brand mark', 'brandmark', 'logo']],
  sol: 'The spoken part is the brand name; the symbol or design is the brand mark.',
}));
Q('s_branding_merits', short({
  t: 3, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'State two advantages that branding gives Japfu Pickles (imagined), Kohima, as a seller.',
  model: '1. **Product differentiation:** the name and chilli mark **set its jars apart** from unbranded pickles on the shelf.\n2. **Customer loyalty and easier launches:** buyers who trust the brand **come back**, and a new chutney under the same name is **accepted faster**.',
  sol: 'Any two advantages to the seller (differentiation, loyalty, easier launches, some price premium, promotion).',
  scheme: [['First advantage', 1], ['Second advantage', 1]],
}));
Q('s_label_functions', short({
  t: 3, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'State two functions performed by the label on Gooty Groundnut Oil (imagined), Anantapur.',
  model: '1. **Describes the product:** it tells buyers the **contents, net volume, nutrition and dates**, so they know what they are buying.\n2. **Identifies and promotes:** the **brand name and design** help buyers spot the oil on the shelf and **attract** them to it.',
  sol: 'Any two functions (describe, identify, grade, promote, legal information).',
  scheme: [['First function', 1], ['Second function', 1]],
}));
Q('s3_packaging', short({
  t: 3, d: 2, c: 'application', marks: 3, wl: S3,
  stem: 'Kumari Coir Products (imagined), Nagercoil, wants new packaging for its doormats. State three features of good packaging it should keep in mind, with a reason for each.',
  model: '1. **Protection:** the pack must keep mats **dry and clean** in storage and transport, since coir absorbs moisture.\n2. **Convenience:** it should be **light and easy to carry**, perhaps with a handle, so shoppers can take it home easily.\n3. **Attraction and information:** a **clear picture, size and brand** help it stand out and inform buyers without a salesperson.',
  sol: 'Three features of good packaging with reasons.',
  scheme: [['First feature', 1], ['Second feature', 1], ['Third feature', 1]],
}));
Q('s3_brand_label', short({
  t: 3, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'Using Japfu Pickles (imagined) as the example, distinguish between a brand name, a brand mark and a trademark.',
  model: '1. **Brand name:** the part that can be **spoken**, the words **Japfu Pickles**.\n2. **Brand mark:** the part that is **recognised by sight** but not spoken, the **red chilli inside a circle**.\n3. **Trademark:** the brand name or mark once **registered under the law**, so that **no other firm** may use it.',
  sol: 'Each term explained with the case.',
  scheme: [['Brand name', 1], ['Brand mark', 1], ['Trademark', 1]],
}));
Q('l_blp', long({
  t: 3, d: 3, c: 'application', marks: 5, wl: L5,
  stem: 'Kalika Namkeen (imagined), Ratlam, sells loose sev in local markets and now plans to sell branded, packed sev in supermarkets across Madhya Pradesh.\n(a) Explain two advantages of branding to the consumers who will buy it. [2]\n(b) Explain three features of good packaging that the firm should build into its new pack. [3]',
  model: '(a) 1. **Easy identification:** buyers can **recognise the brand** at once on a crowded shelf and ask for it by name.\n2. **Assurance of quality:** a brand stands for **consistent taste and quality**, so buyers know what they will get every time.\n\n(b) 1. **Protection:** an **air-tight, moisture-proof pack** keeps the sev crisp until it is eaten.\n2. **Convenience:** **sizes for single use and families**, and an easy-tear or resealable top, suit different buyers.\n3. **Attraction and information:** a **bright design** with the brand, ingredients, date and price helps the pack sell itself in supermarkets.',
  sol: 'Two consumer advantages of branding; three features of good packaging applied to sev.',
  scheme: [['(a) Two advantages to consumers', 2], ['(b) Three features of packaging', 3]],
}));

// ================================================================ t04 Price: factors
Q('m_cost_floor', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'Manjara Dal Mills, an imagined mill in Latur, spends ₹92 to produce and pack a kilo of tur dal. Why can it not keep selling the dal at ₹85 a kilo for long?',
  opts: ['In the long run, price must cover cost; cost sets the lower limit of price', 'Demand sets the lower limit of price', 'The government always fixes the price of dal', 'Competitors never sell below cost'],
  sol: 'Selling below cost brings a loss on each kilo; over time the price must at least cover cost.',
}));
Q('m_demand', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'When the first snowfall brings crowds of tourists to Tawang, an imagined hotel there raises its room rates, and lowers them again in the quiet months. Which factor affecting price is at work?',
  opts: ['Demand for the service', 'Government regulation', 'Cost of production only', 'Pricing by competitors only'],
  sol: 'Higher demand lets the hotel charge more; when demand falls, so do rates.',
}));
Q('m_competition', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'Five shops on one street in an imagined town sell almost identical school bags, so an imagined bag maker supplying one of them cannot charge much more than the others. Which factor limits its price?',
  opts: ['Competition', 'Government regulation', 'Pricing objective of market skimming', 'Packaging'],
  sol: 'When buyers can easily switch to similar products, the firm\'s price is held close to its rivals\'.',
}));
Q('m_govt', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'The state transport authority fixes the highest fare per kilometre that app-based cabs may charge, so an imagined cab firm in Kohima cannot charge more, even on busy evenings. Which factor affects its price?',
  opts: ['Government regulation', 'Cost of production', 'Marketing methods', 'Product differentiation'],
  sol: 'Where the government caps or controls prices, a firm must price within those limits.',
}));
Q('m_marketing_methods', mcq({
  t: 4, d: 3, c: 'analysis',
  stem: 'Mewar Suitings, an imagined cloth seller in Bhilwara, sells through air-conditioned showrooms with free tailoring advice and home delivery, so it charges more than rivals who sell bare cloth from stalls. Which factor explains the higher price?',
  opts: ['The marketing methods used', 'Government price control', 'A fall in demand', 'The perishability of cloth'],
  sol: 'Extra services, better outlets and promotion add cost and value, so they affect the price the firm can charge.',
}));
Q('m_price_calc', mcq({
  t: 4, d: 3, c: 'application',
  stem: 'Thar Applique Works, an imagined craft unit in Barmer, spends ₹400 to make a cushion cover and adds a mark-up of one-quarter of the cost. What price does it charge?',
  opts: ['₹500', '₹425', '₹100', '₹480'],
  sol: 'One-quarter of ₹400 is ₹100. Adding it to the cost of ₹400 gives a price of ₹500.',
}));
Q('ar_price', ar({
  t: 4, d: 3, c: 'understanding',
  a: 'In the long run, a firm must charge a price that at least covers its costs.',
  r: 'A firm that keeps selling below cost will suffer continuing losses.',
  key: 'a',
  sol: 'Both are true, and the reason explains the assertion: price below cost means a loss on every unit.',
}));
Q('tf_price', tf({
  t: 4, d: 1, c: 'understanding',
  stem: 'Government regulation can never affect the price a firm may charge.',
  ans: false,
  sol: 'False. Governments may cap or control prices of essential goods and services, such as notified fares.',
}));
Q('s_price_factors2', short({
  t: 4, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'Explain how (i) demand and (ii) competition affect the room rates of an imagined hotel in Tawang.',
  model: '(i) **Demand:** in the **snow season** many tourists want rooms, so the hotel can **charge more**; in quiet months it must lower rates.\n(ii) **Competition:** if **nearby hotels** offer similar rooms, it cannot charge **much above them**, or guests will move.',
  sol: 'Each factor explained with the hotel.',
  scheme: [['(i) Demand', 1], ['(ii) Competition', 1]],
}));
Q('s3_price_factors', short({
  t: 4, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'Explain three factors that Manjara Dal Mills (imagined), Latur, should consider while fixing the price of its packed tur dal.',
  model: '1. **Cost:** the price must **cover the cost** of dal, milling and packing, or the mill loses money on every kilo.\n2. **Demand:** families buy dal **every week**; if the price rises too much, they shift to loose dal or other pulses.\n3. **Competition:** **other packed brands** set a ceiling, so the mill must stay close to their prices unless its quality is clearly better.',
  sol: 'Any three factors (cost, demand, competition, government regulation, marketing methods, pricing objectives), each applied.',
  scheme: [['First factor', 1], ['Second factor', 1], ['Third factor', 1]],
}));
Q('s3_price_govt_mm', short({
  t: 4, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Explain how (i) government regulation, (ii) marketing methods and (iii) pricing objectives can each affect the price a firm charges, with an imagined example of each.',
  model: '(i) **Government regulation:** a **notified fare cap** stops an imagined cab firm from charging more at peak hours.\n(ii) **Marketing methods:** an imagined cloth seller offering **showrooms, advice and home delivery** can charge more than stall sellers.\n(iii) **Pricing objectives:** a firm seeking a **large market share fast** keeps prices low, while one guarding a **luxury image** keeps them high.',
  sol: 'Each factor explained with an example.',
  scheme: [['(i) Government regulation', 1], ['(ii) Marketing methods', 1], ['(iii) Pricing objectives', 1]],
}));
Q('l_price', long({
  t: [4, 5], d: 3, c: 'application', marks: 5, wl: L5,
  stem: '(a) Mullayanagiri Coffee Estates, an imagined estate in Chikmagalur, is fixing the price of a new packed coffee. Explain four factors it should consider. [4]\n(b) What is meant by cost-plus pricing? [1]',
  model: '(a) 1. **Cost:** the price must cover the **cost of beans, roasting, packing and delivery**; cost sets the lower limit.\n2. **Demand and value to buyers:** coffee lovers who value **single-estate aroma** may pay more; this sets the upper limit.\n3. **Competition:** prices of **other packed coffees** of similar quality limit how far it can go.\n4. **Marketing methods and objectives:** selling through **premium cafés with tastings** adds cost and value and supports a higher price, while a goal of **quick market share** would call for a lower one.\n\n(b) **Cost-plus pricing** fixes the price by **adding a set mark-up**, an amount or percentage, **to the cost** of each unit.',
  sol: 'Four factors applied to the coffee; meaning of cost-plus pricing.',
  scheme: [['(a) Four factors applied', 4], ['(b) Cost-plus pricing', 1]],
}));

// ================================================================ t05 Pricing strategies (meaning only)
Q('m_skimming', mcq({
  t: 5, d: 2, c: 'understanding',
  stem: 'Kharkhoda Electricals (imagined) launches the region\'s first foldable induction cooktop at a high price, planning to lower it once rivals bring out similar models. This pricing strategy is',
  opts: ['skimming pricing', 'penetration pricing', 'competitive pricing', 'cost-plus pricing'],
  sol: 'Starting high for a new product with few rivals and lowering the price later is price skimming.',
}));
Q('m_penetration', mcq({
  t: 5, d: 2, c: 'understanding',
  stem: 'Siang Valley Foods, an imagined juice maker in Pasighat, launches its orange juice at a very low price to win a large share quickly in a market crowded with rival brands. This strategy is',
  opts: ['penetration pricing', 'skimming pricing', 'value-based pricing', 'cost-plus pricing'],
  sol: 'A low entry price to capture a large share quickly is penetration pricing.',
}));
Q('m_cost_plus', mcq({
  t: 5, d: 1, c: 'recall',
  stem: 'Thar Applique Works (imagined) fixes the price of every item by adding a fixed mark-up to its cost. This strategy is called',
  opts: ['cost-plus pricing', 'skimming pricing', 'penetration pricing', 'value-based pricing'],
  sol: 'Cost plus a mark-up is cost-plus pricing.',
}));
Q('m_competitive', mcq({
  t: 5, d: 2, c: 'understanding',
  stem: 'A new tyre dealer in an imagined town sets his prices at the same level as the three established dealers on the same road. This strategy is',
  opts: ['competitive (going-rate) pricing', 'skimming pricing', 'cost-plus pricing', 'value-based pricing'],
  sol: 'Pricing in line with rivals\' prices is competitive or going-rate pricing.',
}));
Q('m_value', mcq({
  t: 5, d: 3, c: 'application',
  stem: 'Mullayanagiri Coffee Estates (imagined) prices its single-estate coffee by what café owners feel it is worth for its aroma and story, rather than by what it costs to produce. This strategy is',
  opts: ['value-based pricing', 'cost-plus pricing', 'penetration pricing', 'competitive pricing'],
  sol: 'Setting price by the value the customer perceives is value-based pricing.',
}));
Q('ar_skim', ar({
  t: 5, d: 3, c: 'analysis',
  a: 'Skimming pricing suits a new product that has few rivals and buyers eager to own it first.',
  r: 'Under skimming pricing, a firm starts with the lowest possible price.',
  key: 'c',
  sol: 'The assertion is true. The reason is false: skimming starts with a high price, which falls later.',
}));
Q('ar_pen', ar({
  t: 5, d: 3, c: 'analysis',
  a: 'Penetration pricing begins with a high price to recover development costs quickly.',
  r: 'Penetration pricing suits buyers who do not care about price.',
  key: 'd',
  sol: 'Both statements are false. Penetration pricing starts low to win share quickly, and it suits price-sensitive buyers.',
}));
Q('tf_value', tf({
  t: 5, d: 1, c: 'understanding',
  stem: 'Value-based pricing fixes the price mainly on the value that customers believe the product gives them.',
  ans: true,
  sol: 'True. It looks at the buyer\'s perceived value rather than at cost or rivals\' prices.',
}));
Q('fb_strategy', fb({
  t: 5, d: 3, c: 'analysis',
  stem: 'Complete the analogy. A high launch price, lowered later : Skimming :: A low launch price to win a large share quickly : ___',
  acc: [['Penetration', 'penetration pricing']],
  sol: 'Starting high and coming down is skimming; starting low to win share is penetration.',
}));
Q('mt_strategies', match({
  t: 5, d: 2, c: 'understanding', marks: 2,
  stem: 'Match each pricing strategy with its meaning.',
  pairs: [
    ['Cost-plus pricing', 'Cost of a unit plus a fixed mark-up'],
    ['Competitive pricing', 'Price kept in line with rivals\' prices'],
    ['Skimming pricing', 'High price at launch, lowered later'],
    ['Penetration pricing', 'Low price at launch to win a large share'],
  ],
  sol: 'Cost-plus adds a mark-up; competitive follows rivals; skimming starts high; penetration starts low.',
}));
Q('s_strategies2', short({
  t: 5, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'Identify the pricing strategy in each case and give a reason: (i) an imagined tyre dealer charges exactly what the dealers next door charge; (ii) an imagined juice brand enters a crowded market at a very low price.',
  model: '(i) **Competitive (going-rate) pricing:** the dealer keeps his price **in line with rivals**.\n(ii) **Penetration pricing:** the brand uses a **low entry price** to win a **large share quickly**.',
  sol: 'Each strategy named with a reason.',
  scheme: [['(i) Competitive pricing', 1], ['(ii) Penetration pricing', 1]],
}));
Q('s3_strategies', short({
  t: 5, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain the meaning of skimming pricing, penetration pricing and value-based pricing.',
  model: '1. **Skimming pricing:** a **new product** is launched at a **high price** to earn well from eager early buyers, and the price is lowered later as rivals enter.\n2. **Penetration pricing:** the product is launched at a **low price** to attract many buyers and **capture a large share** quickly.\n3. **Value-based pricing:** price is set by the **value the customer perceives**, not by cost or rivals.',
  sol: 'Each strategy explained.',
  scheme: [['Skimming', 1], ['Penetration', 1], ['Value-based', 1]],
}));
Q('l_mix', long({
  t: [1, 5], d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: 'Changthang Pashmina (imagined), Leh, plans to launch a new range of hand-spun shawls for buyers in Indian metros.\n(a) Explain the marketing mix and how its four elements should work together for this range. [3]\n(b) Should the firm launch the range with skimming pricing or penetration pricing? Give two reasons for your choice. [2]',
  model: '(a) The **marketing mix** is the combination of **product, price, place and promotion** decisions a firm uses to satisfy target buyers. Here, the **product** is a rare, hand-spun shawl; its **price** should reflect that rarity; **place** should be the firm\'s own showroom, select boutiques and an online store; and **promotion** should tell the **herders\' story** in lifestyle magazines. All four must send one message of **quality and authenticity**.\n\n(b) **Skimming pricing** suits it better. 1. The range is **unique, with few close rivals**, and early buyers are eager and willing to pay a **high price**. 2. A low price would **cheapen the luxury image** and could not cover the cost of hand-spinning in small quantities.',
  sol: 'Marketing mix explained with consistency shown; skimming chosen with two sound reasons.',
  scheme: [['(a) Meaning of marketing mix', 1], ['(a) Four elements working together', 2], ['(b) Strategy chosen with two reasons', 2]],
}));

// ================================================================ case-based
Q('cb_product', caseQ({
  t: [2, 3], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the passage and answer the questions that follow. *(Imagined firm and people, written by SOYL for practice.)*',
  passage: '**Panchmura Terracotta (imagined), Bankura**\n\nThe cooperative makes terracotta horses and lamps. Tourists travel to the village for its large horses, which no one else makes in the same style. Small lamps are bought at fairs by passers-by on impulse. Many pieces broke on the way to city shops, so the cooperative now packs each piece in a moulded paper-pulp case inside a printed box showing the horse logo, the size and care instructions. It has registered its name and logo.',
  parts: [
    child('a', mcq({ t: 2, d: 2, c: 'application', stem: 'For the tourists described, the large terracotta horses are', opts: ['specialty goods', 'convenience goods', 'shopping goods', 'industrial goods'], sol: 'Buyers make a special trip for a unique item with no substitute: specialty goods.' })),
    child('b', short({ t: 3, d: 2, c: 'application', marks: 1, stem: 'What is the cooperative\'s registered name and logo called?', model: 'A **trademark**.', sol: 'A registered brand is a trademark.', scheme: [['Trademark', 1]] })),
    child('c', short({ t: 3, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Identify two functions served by the new packing.', model: '**Protection:** the pulp case stops pieces **breaking in transit**. **Information and identification:** the printed box shows the **logo, size and care** details.', sol: 'Protection and information or identification.', scheme: [['Protection', 1], ['Information or identification', 1]] }), [
      short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Classify the small lamps bought at fairs, and give a reason.', model: '**Convenience goods** (impulse goods): they are **cheap** and bought **on the spot**, without planning or comparing.', sol: 'Convenience goods with reason.', scheme: [['Type', 1], ['Reason', 1]] }),
    ]),
  ],
}));
Q('cb_price', caseQ({
  t: [4, 5], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the passage and answer the questions that follow. *(Imagined firm and people, written by SOYL for practice.)*',
  passage: '**Kali River Fisheries (imagined), Karwar**\n\nThe firm sells frozen fish to restaurants. Its cost, including catching, cleaning and freezing, has risen this year. In the monsoon, when fishing stops, restaurants pay almost any price for its stock. For its new ready-to-cook prawn curry kit, the first of its kind in the area, the manager, Mr Naik, wants to charge a high price at first and lower it when copies appear.',
  parts: [
    child('a', mcq({ t: 5, d: 2, c: 'application', stem: 'Mr Naik\'s plan for the curry kit is an example of', opts: ['skimming pricing', 'penetration pricing', 'cost-plus pricing', 'competitive pricing'], sol: 'A high launch price lowered when rivals come is skimming.' })),
    child('b', short({ t: 4, d: 2, c: 'application', marks: 1, stem: 'Which factor affecting price is shown by restaurants paying almost any price in the monsoon?', model: '**Demand** (strong demand with little supply).', sol: 'High demand raises the price buyers will pay.', scheme: [['Demand', 1]] })),
    child('c', short({ t: 4, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Explain how the rise in cost affects the firm\'s pricing.', model: '**Cost sets the lower limit:** higher catching and freezing costs **raise the minimum price**; if prices are not raised, **margins shrink** or losses arise.', sol: 'Cost as the floor of price.', scheme: [['Cost as floor', 1], ['Effect on price or margin', 1]] }), [
      short({ t: 5, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Why does the curry kit suit the strategy Mr Naik has chosen?', model: 'It is **new, with no rivals yet**, so eager buyers will pay a **high price**; the price can **fall later** as copies appear.', sol: 'New, unique product with few rivals suits skimming.', scheme: [['New product with no rivals', 1], ['Price lowered later', 1]] }),
    ]),
  ],
}));
