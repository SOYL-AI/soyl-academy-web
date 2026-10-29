// CBSE 12 Business Studies, ch12 Consumer Protection — question bank. Every consumer, seller, brand and
// situation is imagined and written by SOYL; no NCERT example, exercise or board/sample-paper item is
// reused (D-036). Cases follow the board pattern (identify the right, responsibility, forum or remedy
// from the lines and explain). Pecuniary limits follow the 2021 jurisdiction rules (see README).
import { Q, mcq, ar, tf, fb, match, ord, num, short, long, caseQ, child } from './lib.mjs';

const S2 = [30, 50];
const S3 = [50, 75];
const L5 = [100, 150];

// ---------------------------------------------------------------- pecuniary jurisdiction (computed)
// Value of goods or services PAID as consideration decides the forum (2019 Act; limits as revised in 2021).
export const LAKH = 100000;
export const CRORE = 100 * LAKH;
export const LIMIT_DISTRICT = 50 * LAKH;
export const LIMIT_STATE = 2 * CRORE;
export const forum = (v) => (v <= LIMIT_DISTRICT ? 'District Commission' : v <= LIMIT_STATE ? 'State Commission' : 'National Commission');
export const inr = (v) => `₹${v.toLocaleString('en-IN')}`;
function assert(cond, msg) { if (!cond) throw new Error(`figure check failed: ${msg}`); }

// Numerical: an office's purchase of laptops and printers.
export const LAPTOPS = { n: 12, price: 42500 };
export const PRINTERS = { n: 3, price: 18000 };
export const OFFICE_TOTAL = LAPTOPS.n * LAPTOPS.price + PRINTERS.n * PRINTERS.price;
assert(OFFICE_TOTAL === 564000, 'office total');
assert(forum(OFFICE_TOTAL) === 'District Commission', 'office forum');

// Hospital case: surgery package plus room charges.
export const HOSP = { pkg: 62 * LAKH, room: 6 * LAKH };
export const HOSP_TOTAL = HOSP.pkg + HOSP.room;
assert(HOSP_TOTAL === 68 * LAKH && forum(HOSP_TOTAL) === 'State Commission', 'hospital');

// Forum MCQs.
export const BUS_FLEET = { n: 4, price: 85 * LAKH }; // 3.4 crore -> National
assert(BUS_FLEET.n * BUS_FLEET.price === 340 * LAKH && forum(340 * LAKH) === 'National Commission', 'bus fleet');
export const TRACTOR = 9 * LAKH + 40000; // 9.4 lakh -> District
assert(forum(TRACTOR) === 'District Commission', 'tractor');
export const GENSET = { n: 3, price: 24 * LAKH }; // 72 lakh -> State
assert(GENSET.n * GENSET.price === 72 * LAKH && forum(72 * LAKH) === 'State Commission', 'genset');

// Coaching case: fees paid.
export const COACH = { fee: 1.2 * LAKH, years: 2 };
export const COACH_TOTAL = COACH.fee * COACH.years;
assert(COACH_TOTAL === 240000 && forum(COACH_TOTAL) === 'District Commission', 'coaching');

// ================================================================ t01 Importance of consumer protection
Q('m_unorganised', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'From the **consumer\'s** point of view, which reason best explains why a single buyer of a defective pressure cooker needs the protection of law?',
  opts: [
    'Consumers are scattered and unorganised, so one buyer has little bargaining power against a large seller',
    'Consumers always buy in bulk, so sellers depend on them',
    'Sellers are legally barred from earning profit on household goods',
    'Consumers are organised in strong unions that negotiate prices',
  ],
  sol: 'Individual consumers are unorganised and buy in small quantities, so they cannot bargain with big sellers; the law makes up for this weakness. Bulk buying and strong unions describe the opposite situation, and profit is not banned.',
}));
Q('m_long_term', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Tarang Electricals (an imagined fan maker in Coimbatore) replaces any faulty fan within a week without argument. Its owner says, "A satisfied buyer comes back and brings two neighbours." Which point of view on consumer protection does this reflect?',
  opts: [
    'Long-term interest of business: satisfied customers mean repeat sales and goodwill',
    'Government intervention: the firm fears being taken over by the state',
    'Consumer ignorance: buyers do not know their rights',
    'Widespread exploitation: sellers cheat buyers in many ways',
  ],
  sol: 'The owner protects buyers because it pays in the long run: repeat customers and word-of-mouth goodwill. The other options are reasons from the consumer\'s side or a different business reason.',
}));
Q('m_society_resources', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'At a trade association meeting in Ludhiana (imagined), a speaker said: "We use the country\'s water, power, roads and skilled people. We owe society goods that are safe and fairly priced." This argument for consumer protection is best described as',
  opts: ['use of society\'s resources', 'moral justification only', 'government intervention', 'consumer ignorance'],
  sol: 'Business draws its resources from society, so it has a duty to supply goods in the public interest. Moral justification is a related but separate point about ethics; the speaker\'s reason is the resources used.',
}));
Q('m_govt_interv', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Why is it in a business firm\'s own interest to avoid unfair trade practices, apart from ethics?',
  opts: [
    'A business that exploits buyers invites government action, which can damage its image and freedom to operate',
    'Unfair practices are always more costly than fair ones in the short run',
    'Consumers cannot complain against private firms under the law',
    'The government pays bonuses to firms that never receive complaints',
  ],
  sol: 'If firms exploit consumers, the government steps in with penalties and regulation, which hurts the firm\'s reputation and freedom. Unfair practices may pay in the short run; consumers can complain against private firms; there is no such bonus scheme.',
}));
Q('ar_ignorance', ar({
  t: 1, d: 2, c: 'analysis', key: 'a',
  a: 'Consumer protection is needed even though laws exist to safeguard buyers.',
  r: 'Many consumers do not know their rights and the remedies available to them.',
  sol: 'Both are true, and R explains A: a law helps only those who know about it, so awareness and protection are needed alongside the law.',
}));
Q('ar_social_resp', ar({
  t: 1, d: 3, c: 'analysis', key: 'b',
  a: 'Protecting consumers is part of the social responsibility of business.',
  r: 'Consumers are only one of the many groups, such as owners, workers and government, with whom a business deals.',
  sol: 'Both statements are true. But R only lists the interest groups of a business; the reason why protecting consumers is a social responsibility is that business depends on society and owes it fair dealing. So R does not explain A.',
}));
Q('tf_moral', tf({
  t: 1, d: 1, c: 'understanding', ans: true,
  stem: 'True or false? Avoiding adulteration, short weighing and misleading claims is a moral duty of business, not merely a legal one.',
  sol: 'Fair dealing with consumers is a moral obligation of business (moral justification); the law only adds enforcement.',
}));
Q('s_consumer_view', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Give two reasons why consumer protection is important from the point of view of consumers.',
  model: '1. **Consumer ignorance:** most buyers do not know their rights or how to seek relief, so they must be made aware.\n2. **Unorganised consumers:** buyers are scattered and act alone, so they cannot stand up to large sellers without protection.',
  sol: 'Any two of: ignorance, unorganised consumers, widespread exploitation (adulteration, short weight, false claims).',
  scheme: [['First reason explained', 1], ['Second reason explained', 1]],
}));
Q('s3_business_view', short({
  t: 1, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain three reasons why a business should itself take care of the interests of its customers.',
  model: '1. **Long-term interest:** satisfied customers return and recommend the firm, so sales and goodwill grow.\n2. **Society\'s resources:** a firm uses land, power and talent that belong to society, so it should supply goods that serve the public.\n3. **Government intervention:** a firm that cheats buyers invites strict action and loses its public image, so fair dealing protects the firm itself.',
  sol: 'Three distinct business-side reasons, each with a line of explanation (others: social responsibility, moral justification).',
  scheme: [['First reason explained', 1], ['Second reason explained', 1], ['Third reason explained', 1]],
}));
Q('l_importance', long({
  t: 1, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Explain the importance of consumer protection from the point of view of business. (Any five points)',
  model: '1. **Long-term interest of business:** a firm earns lasting profit only by keeping customers satisfied; happy buyers return and spread good word, so protecting them builds goodwill.\n2. **Use of society\'s resources:** business works with resources supplied by society, such as land, water, power and trained people, so it should offer goods and services that serve the public.\n3. **Social responsibility:** a business has duties towards many groups, and consumers are among the most important of them.\n4. **Moral justification:** honest dealing is an ethical duty; adulteration, black-marketing and false claims are wrong in themselves.\n5. **Government intervention:** if firms exploit consumers, the government steps in with penalties and controls, which harm the firm\'s image and freedom; self-discipline avoids this.',
  sol: 'Five business-side reasons, each named and explained in a line or two.',
  scheme: [['Long-term interest', 1], ['Use of society\'s resources', 1], ['Social responsibility', 1], ['Moral justification', 1], ['Government intervention', 1]],
}));

// ================================================================ t02 Consumer Protection Act 2019: consumer, rights, responsibilities
Q('m_who_consumer', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'Under the Consumer Protection Act 2019, which of these imagined buyers is a **consumer**?',
  opts: [
    'Salma, who buys a sewing machine to stitch blouses at home and earn her living by self-employment',
    'A wholesaler in Indore who buys 200 sewing machines to resell to shops',
    'A garment exporter who buys 50 industrial machines for its factory to produce for profit',
    'A shopkeeper who buys 40 sewing machines to display and sell',
  ],
  sol: 'Goods bought for resale or for a commercial purpose are excluded, but use for earning one\'s livelihood by **self-employment** is not treated as commercial. So Salma is a consumer; the wholesaler, the exporter and the shopkeeper are not.',
}));
Q('m_online', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Kiran (imagined) buys a smartwatch through a shopping app and it stops working in a week. Under the Consumer Protection Act 2019, Kiran',
  opts: [
    'is a consumer, because the Act covers goods bought online as well as offline',
    'is not a consumer, because the Act covers only purchases made in a shop',
    'can complain only to the app company and nowhere else',
    'is a consumer only if he paid in cash',
  ],
  sol: 'The 2019 Act expressly includes transactions made online (e-commerce), by teleshopping, direct selling or multi-level marketing. The mode of payment does not matter.',
}));
Q('m_right_safety', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'A newly bought electric geyser in an imagined Shimla home overheats and bursts because its thermostat is faulty. Which consumer right has been violated most directly?',
  opts: ['Right to safety', 'Right to choose', 'Right to consumer education', 'Right to be heard'],
  sol: 'The right to safety protects consumers against goods and services that are hazardous to life and property. The faulty geyser endangered the family.',
}));
Q('m_right_info', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'A packet of spice mix sold in an imagined Lucknow market shows neither the date of manufacture nor the list of ingredients. Which right of the consumer is denied?',
  opts: ['Right to be informed', 'Right to safety', 'Right to seek redressal', 'Right to be heard'],
  sol: 'Consumers have the right to full information about the quality, quantity, purity, price and date of a product. Missing dates and ingredients deny this right.',
}));
Q('m_right_choose', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'A dealer of the imagined Veer Bikes tells buyers that they must also buy a helmet, a cover and an insurance policy only from him to get delivery of a motorcycle. Which right is affected?',
  opts: ['Right to choose', 'Right to consumer education', 'Right to safety', 'Right to be heard'],
  sol: 'Forcing the buyer to take other products from the same seller denies the right to choose from a variety of goods at competitive prices.',
}));
Q('m_right_heard', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'Nidhi (imagined) has written four times to the grievance cell of an imagined internet provider about a wrong bill, but each time her complaint is closed without any reply. Which right is ignored?',
  opts: ['Right to be heard', 'Right to choose', 'Right to safety', 'Right to be informed'],
  sol: 'The right to be heard means that consumers\' complaints and views must be considered; many firms set up grievance cells for this purpose. Closing complaints unanswered denies it.',
}));
Q('m_right_education', mcq({
  t: 2, d: 1, c: 'understanding',
  stem: 'A state government runs radio talks and school clubs that teach young people how to read labels and where to complain. These activities support the consumer\'s right to',
  opts: ['consumer education', 'safety', 'choose', 'seek redressal'],
  sol: 'Teaching consumers about their rights, product information and remedies throughout life is the right to consumer education.',
}));
Q('m_hallmark', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'Before buying a gold chain, a careful consumer should look for which standardisation mark?',
  opts: ['Hallmark', 'Agmark', 'ISI mark', 'FSSAI licence number'],
  sol: 'Hallmark certifies the purity of gold and silver jewellery. Agmark is for agricultural produce, the ISI mark for industrial and electrical goods, and the FSSAI number appears on packaged food.',
}));
Q('m_agmark', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'Which mark should a consumer look for on a pack of pulses or honey as a sign of graded agricultural produce?',
  opts: ['Agmark', 'Hallmark', 'ISI mark', 'Eco-mark on electrical cables'],
  sol: 'Agmark is the grading mark for agricultural products such as pulses, spices and honey. Hallmark is for precious-metal jewellery and the ISI mark for industrial goods.',
}));
Q('m_resp_bill', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'Arjun (imagined) bought a refrigerator but refused the bill because the shopkeeper offered him ₹500 off without it. When the compressor failed, he could not prove the purchase. Which responsibility of a consumer did Arjun neglect?',
  opts: ['Asking for a cash memo or bill for every purchase', 'Learning about the risks of using the product', 'Forming consumer societies', 'Avoiding wastage and pollution'],
  sol: 'A consumer should insist on a cash memo; it is proof of purchase needed to claim repair, replacement or relief. Arjun gave it up for a small discount.',
}));
Q('m_not_file', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'Which of the following is **NOT** entitled to file a complaint under the Consumer Protection Act 2019?',
  opts: [
    'A rival seller who wants to damage a competitor\'s reputation in the market',
    'A registered voluntary consumer association',
    'The legal heir of a consumer who has died',
    'The Central or a State Government',
  ],
  sol: 'The Act allows a consumer, a registered consumer association, the Central or State Government, one or more consumers on behalf of many with the same interest, and the legal heir or representative of a deceased consumer. A rival business acting for its own gain is not a complainant under the Act.',
}));
Q('m_resp_standard', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'Before buying an electric iron, Rekha (imagined) checks for the ISI mark and reads the safety instructions. She is fulfilling her responsibility to',
  opts: ['buy only standardised goods and learn about the risks of a product', 'seek redressal for a genuine grievance', 'form consumer societies', 'avoid black-marketing and hoarding'],
  sol: 'Looking for a quality-certification mark and reading instructions are responsibilities of a careful consumer before purchase.',
}));
Q('ar_resale', ar({
  t: 2, d: 2, c: 'analysis', key: 'a',
  a: 'A trader who buys 100 mobile phones to sell in his shop is not a consumer under the Consumer Protection Act 2019.',
  r: 'A person who buys goods for resale or for a commercial purpose is excluded from the meaning of consumer.',
  sol: 'Both are true, and R explains A: the trader buys for resale, which the Act excludes.',
}));
Q('ar_heir', ar({
  t: 2, d: 3, c: 'analysis', key: 'c',
  a: 'The legal heir of a consumer who has died can file a complaint about a defective product the consumer had bought.',
  r: 'Only the person who actually paid for the goods can ever file a complaint under the Act.',
  sol: 'A is true: a legal heir or legal representative of a deceased consumer may complain. R is false: associations, governments and others may also file.',
}));
Q('ar_choose', ar({
  t: 2, d: 3, c: 'analysis', key: 'd',
  a: 'The right to choose means a consumer can demand any product at whatever price she wishes to pay.',
  r: 'The right to choose means access to a variety of goods at competitive prices.',
  sol: 'A is false: the right does not let a consumer fix prices. R is true and gives the correct meaning of the right.',
}));
Q('tf_no_resp', tf({
  t: 2, d: 1, c: 'understanding', ans: false,
  stem: 'True or false? Only sellers have duties in consumer protection; consumers have rights but no responsibilities.',
  sol: 'Consumers also have responsibilities, such as buying standardised goods, reading labels, asking for a bill, filing genuine complaints and avoiding waste and pollution.',
}));
Q('tf_online_consumer', tf({
  t: 2, d: 2, c: 'application', ans: true,
  stem: 'True or false? A student who pays for an online coding course and receives poor, incomplete classes is a consumer of a service under the 2019 Act.',
  sol: 'Hiring a service for consideration makes the student a consumer, and online transactions are covered by the Act.',
}));
Q('fb_heard', fb({
  t: 2, d: 1, c: 'recall',
  stem: 'The right to be ___ means that consumers\' complaints and opinions must be given due consideration at appropriate forums.',
  acc: [['heard']],
  sol: 'This is the right to be heard; firms set up grievance cells and consumer forums give it effect.',
}));
Q('fb_isi', fb({
  t: 2, d: 1, c: 'recall',
  stem: 'The ___ mark on electrical goods such as irons and heaters shows that they meet the standards set by the Bureau of Indian Standards.',
  acc: [['ISI']],
  sol: 'The ISI mark is the quality-certification mark for industrial and electrical goods.',
}));
Q('mt_rights', match({
  t: 2, d: 2, c: 'application',
  stem: 'Match each imagined complaint from a Pune consumer helpdesk log with the consumer right it involves.',
  pairs: [
    ['A toy for toddlers has small detachable parts that can be swallowed', 'Right to safety'],
    ['A medicine strip carries no expiry date', 'Right to be informed'],
    ['A gas dealer insists on selling his own brand of stove with every new connection', 'Right to choose'],
    ['A bank keeps closing a customer\'s complaint without a reply', 'Right to be heard'],
  ],
  sol: 'Hazard to life is safety; missing date is information; tied purchase is choice; ignored complaint is the right to be heard.',
}));
Q('s_consumer_meaning', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Who is a consumer under the Consumer Protection Act 2019? State the two cases it covers.',
  model: '1. A person who **buys goods** for a consideration (paid, promised or partly paid), including any user with the buyer\'s approval, but **not for resale or a commercial purpose**.\n2. A person who **hires or avails of services** for a consideration, including any beneficiary with approval. Online purchases are covered.',
  sol: 'Goods and services, each with the condition of consideration and the exclusion of resale or commercial purpose.',
  scheme: [['Buyer of goods with conditions', 1], ['Hirer of services with conditions', 1]],
}));
Q('s_info_choose', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Explain the right to be informed and the right to choose.',
  model: '1. **Right to be informed:** the consumer must get full details of a product (ingredients, quantity, price, date of manufacture and expiry, directions for use) so that she can decide wisely.\n2. **Right to choose:** the consumer should have access to a variety of goods at competitive prices and freedom to pick any of them.',
  sol: 'Meaning of each right in one or two lines.',
  scheme: [['Right to be informed', 1], ['Right to choose', 1]],
}));
Q('s_who_file', short({
  t: 2, d: 1, c: 'recall', marks: 2, wl: S2,
  stem: 'Name any four parties who can file a complaint under the Consumer Protection Act 2019.',
  model: '1. Any **consumer**.\n2. A **registered voluntary consumer association**.\n3. The **Central Government or a State Government**.\n4. The **legal heir or representative** of a deceased consumer (also: one or more consumers on behalf of many with the same interest).',
  sol: 'Any four of the complainants listed in the Act, half a mark each.',
  scheme: [['Any two parties', 1], ['Any two more parties', 1]],
}));
Q('s3_responsibilities', short({
  t: 2, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain any three responsibilities of a consumer while buying and using goods.',
  model: '1. **Buy standardised goods:** look for the ISI mark on electrical items, Agmark on food grains and Hallmark on jewellery.\n2. **Read labels and learn the risks:** check price, net weight, dates and safety instructions before use.\n3. **Ask for a cash memo:** keep the bill as proof of purchase, so that a complaint can be filed if the product is defective.',
  sol: 'Three responsibilities, each with a brief explanation (others: be honest, file genuine complaints, form consumer societies, avoid waste and pollution).',
  scheme: [['First responsibility explained', 1], ['Second responsibility explained', 1], ['Third responsibility explained', 1]],
}));
Q('s3_rights_case', short({
  t: 2, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'Meenu (imagined) bought a hair dryer whose box listed no warnings. Its cord melted on first use and burnt her hand. Her complaint to the company was ignored. Identify three consumer rights violated and give the reason for each.',
  model: '1. **Right to safety:** the melting cord made the product **hazardous** and caused injury.\n2. **Right to be informed:** the box carried **no warnings or safety instructions** for use.\n3. **Right to be heard:** the company **ignored her complaint** instead of considering it.',
  sol: 'Three rights, each tied to a fact of the situation.',
  scheme: [['Safety with reason', 1], ['Information with reason', 1], ['Being heard with reason', 1]],
}));
Q('l_rights', long({
  t: 2, d: 2, c: 'understanding', marks: 5, wl: L5,
  stem: 'Explain any five rights of consumers under the Consumer Protection Act 2019.',
  model: '1. **Right to safety:** to be protected against goods and services that are hazardous to life, health and property, such as sub-standard electrical goods.\n2. **Right to be informed:** to have complete information about quality, quantity, purity, price and date of a product before buying.\n3. **Right to choose:** to have access to a variety of goods at competitive prices and to pick freely among them.\n4. **Right to be heard:** to have complaints and views considered; firms set up grievance cells and consumer forums give a hearing.\n5. **Right to seek redressal:** to get relief against unfair practices, such as replacement, removal of defects or compensation for loss.\n(Also: **right to consumer education**, to learn about rights and remedies.)',
  sol: 'Five rights, each named and explained in one or two lines with a suitable example.',
  scheme: [['First right explained', 1], ['Second right explained', 1], ['Third right explained', 1], ['Fourth right explained', 1], ['Fifth right explained', 1]],
}));
Q('l_responsibilities', long({
  t: 2, d: 4, c: 'application', marks: 5, wl: L5,
  stem: 'Ishaan (imagined), a first-time earner in Bengaluru, is about to buy a laptop, a gas stove and groceries for his flat. Advise him on five responsibilities he should keep in mind as a consumer.',
  model: '1. **Know the market:** compare features, prices and after-sales service of laptops from several sellers before deciding.\n2. **Buy standardised goods:** choose a gas stove with the **ISI mark** and groceries with **Agmark** or a food-licence number.\n3. **Read labels and instructions:** check net weight, price, dates and safety directions, especially for the gas stove.\n4. **Ask for a bill and warranty card:** keep the cash memo and warranty safe, as proof for any repair or complaint.\n5. **Assert yourself and complain genuinely:** if the laptop is defective, approach the seller and, if needed, the consumer commission; also avoid wasting resources and polluting.',
  sol: 'Five responsibilities, each applied to Ishaan\'s purchases.',
  scheme: [['First responsibility applied', 1], ['Second responsibility applied', 1], ['Third responsibility applied', 1], ['Fourth responsibility applied', 1], ['Fifth responsibility applied', 1]],
}));

// ================================================================ t03 Redressal machinery and remedies
Q('m_tractor_forum', mcq({
  t: 3, d: 2, c: 'application',
  stem: `Harpreet (imagined) paid ${inr(TRACTOR)} for a tractor whose gearbox failed within a month. Where should she file her complaint?`,
  opts: ['District Commission', 'State Commission', 'National Commission', 'Supreme Court directly'],
  sol: `The value paid, ${inr(TRACTOR)}, is within ₹50 lakh, so the District Commission hears the complaint.`,
}));
Q('m_genset_forum', mcq({
  t: 3, d: 3, c: 'application',
  stem: `A housing society in Nashik (imagined) paid for ${GENSET.n} generator sets at ${inr(GENSET.price)} each to supply backup power to its residents; all of them proved defective. Which body has jurisdiction over the complaint?`,
  opts: ['State Commission', 'District Commission', 'National Commission', 'Central Consumer Protection Authority only'],
  sol: `Total value paid = ${GENSET.n} × ${inr(GENSET.price)} = ${inr(GENSET.n * GENSET.price)}, which is above ₹50 lakh but not above ₹2 crore, so the State Commission.`,
}));
Q('m_bus_forum', mcq({
  t: 3, d: 3, c: 'application',
  stem: `A cooperative housing society in Thane (imagined) paid ${inr(BUS_FLEET.price)} each for ${BUS_FLEET.n} lifts for its towers; the lifts keep stopping between floors. Which commission will hear the society's complaint?`,
  opts: ['National Commission', 'State Commission', 'District Commission', 'Any commission the trust prefers'],
  sol: `Total value paid = ${BUS_FLEET.n} × ${inr(BUS_FLEET.price)} = ${inr(BUS_FLEET.n * BUS_FLEET.price)}, above ₹2 crore, so the National Commission.`,
}));
Q('m_basis', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Under the Consumer Protection Act 2019, which amount decides whether a complaint goes to the District, State or National Commission?',
  opts: [
    'The value of the goods or services paid as consideration',
    'The amount of compensation the consumer claims',
    'The annual turnover of the seller',
    'The income of the consumer',
  ],
  sol: 'The 2019 Act links pecuniary jurisdiction to the value paid for the goods or services, not to the compensation claimed, the seller\'s turnover or the consumer\'s income.',
}));
Q('m_appeal_state', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'A consumer is not satisfied with the order of a District Commission. Where can she appeal?',
  opts: ['State Commission', 'National Commission', 'Supreme Court', 'Central Consumer Protection Authority'],
  sol: 'An appeal against a District Commission\'s order lies with the State Commission (within 45 days of the order).',
}));
Q('m_appeal_sc', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Against an order of the National Commission passed on a complaint filed before it, an aggrieved party may appeal to the',
  opts: ['Supreme Court', 'State Commission', 'District Commission', 'High Court of its state only'],
  sol: 'The Supreme Court is the final appellate body above the National Commission (appeal within 30 days).',
}));
Q('m_corrective_ad', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'An imagined drink maker advertised that its juice "cures diabetes". The commission found the claim false. Which relief is most suited to undo the harm done to the public?',
  opts: [
    'An order to issue a corrective advertisement',
    'An order to replace one bottle for the complainant',
    'An order to remove a manufacturing defect',
    'An order to pay the consumer\'s electricity bill',
  ],
  sol: 'When a misleading advertisement has misinformed the public, the commission can order the trader to issue a corrective advertisement to neutralise its effect.',
}));
Q('m_punitive', mcq({
  t: 3, d: 3, c: 'understanding',
  stem: 'In which situation is a commission most likely to order **punitive damages**?',
  opts: [
    'When a large number of consumers have suffered and the seller acted with gross negligence',
    'When a single bottle of jam is slightly underweight by mistake',
    'When the consumer lost the bill',
    'When the product was bought for resale',
  ],
  sol: 'Punitive damages punish serious or widespread wrongdoing, such as gross negligence affecting many consumers. A minor slip, a lost bill or a purchase for resale do not call for them.',
}));
Q('ar_basis', ar({
  t: 3, d: 3, c: 'analysis', key: 'c',
  a: 'Under the Consumer Protection Act 2019, a complaint about a car worth ₹12 lakh is filed before the District Commission.',
  r: 'The compensation claimed by the consumer decides which commission will hear the complaint.',
  sol: 'A is true: ₹12 lakh paid is within the District Commission\'s limit of ₹50 lakh. R is false: the value paid for the goods or services, not the compensation claimed, decides the forum.',
}));
Q('ar_supreme', ar({
  t: 3, d: 2, c: 'analysis', key: 'b',
  a: 'A party not satisfied with the National Commission\'s order on a complaint filed before it can appeal to the Supreme Court.',
  r: 'The redressal machinery under the Act has commissions at the district, state and national levels.',
  sol: 'Both are true, but R only describes the three tiers; it does not explain why the appeal goes to the Supreme Court, which is the highest appellate court above the National Commission.',
}));
Q('tf_state_limit', tf({
  t: 3, d: 2, c: 'recall', ans: false,
  stem: 'True or false? A State Commission hears complaints where the value of goods or services paid is more than ₹2 crore.',
  sol: 'Above ₹2 crore is the National Commission. The State Commission hears cases above ₹50 lakh and up to ₹2 crore.',
}));
Q('fb_district', fb({
  t: 3, d: 1, c: 'recall',
  stem: 'Complaints where the value of goods or services paid does not exceed ₹50 lakh are filed before the ___ Commission.',
  acc: [['District']],
  sol: 'The District Commission is the first tier, for values up to ₹50 lakh.',
}));
Q('n_office', num({
  t: 3, d: 2, c: 'application', marks: 2, value: OFFICE_TOTAL, unit: '₹',
  stem: `The imagined Shanti Nagar residents' welfare association in Kochi bought ${LAPTOPS.n} CCTV cameras at ${inr(LAPTOPS.price)} each and ${PRINTERS.n} video recorders at ${inr(PRINTERS.price)} each for the colony's security. All the cameras proved defective. Find the total value paid for this purchase (in ₹), the figure that decides the forum if the whole purchase is in dispute.`,
  sol: `Step 1: Cameras = ${LAPTOPS.n} × ${LAPTOPS.price.toLocaleString('en-IN')} = ${(LAPTOPS.n * LAPTOPS.price).toLocaleString('en-IN')}.\nStep 2: Recorders = ${PRINTERS.n} × ${PRINTERS.price.toLocaleString('en-IN')} = ${(PRINTERS.n * PRINTERS.price).toLocaleString('en-IN')}.\nStep 3: Total = ${OFFICE_TOTAL.toLocaleString('en-IN')}, i.e. ${inr(OFFICE_TOTAL)}, within ₹50 lakh, so the District Commission.`,
  scheme: [['Values of laptops and printers', 1], [`Total ${inr(OFFICE_TOTAL)}`, 1]],
}));
Q('ord_appeal', ord({
  t: 3, d: 2, c: 'understanding', marks: 1,
  stem: 'A consumer\'s case about a ₹3 lakh washing machine goes up through every level of appeal. Arrange the bodies in the order in which the case reaches them.',
  items: ['District Commission', 'State Commission', 'National Commission', 'Supreme Court'],
  sol: 'A ₹3 lakh complaint starts at the District Commission; appeals go to the State Commission, then the National Commission, then the Supreme Court.',
}));
Q('mt_remedies', match({
  t: 3, d: 2, c: 'application',
  stem: 'Match each imagined finding of a consumer commission in Jaipur with the most suitable relief.',
  pairs: [
    ['A new mixer grinder has a loose blade that can be fixed', 'Remove the defect'],
    ['A refrigerator keeps failing even after three repairs', 'Replace it with a new, defect-free product'],
    ['A courier lost a parcel and the sender suffered a loss', 'Pay compensation for the loss suffered'],
    ['A misleading claim was printed on lakhs of packets', 'Issue a corrective advertisement'],
  ],
  sol: 'Fixable fault: remove defect; repeated failure: replace; loss suffered: compensation; misleading publicity: corrective advertisement.',
}));
Q('s_tiers', short({
  t: 3, d: 2, c: 'recall', marks: 2, wl: S2,
  stem: 'State the pecuniary limits of the three consumer commissions under the Consumer Protection Act 2019.',
  model: '1. **District Commission:** value of goods or services paid **up to ₹50 lakh**.\n2. **State Commission:** **above ₹50 lakh and up to ₹2 crore**.\n3. **National Commission:** **above ₹2 crore**.',
  sol: 'The three tiers with their limits, based on the value paid.',
  scheme: [['District and State limits', 1], ['National limit', 1]],
}));
Q('s_remedies_two', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State any two reliefs a consumer commission can order when it is satisfied that the complaint is genuine.',
  model: '1. **Replace** the defective product with a new one free from defect, or **refund** the price paid.\n2. **Pay compensation** for loss or injury suffered by the consumer due to the seller\'s negligence.',
  sol: 'Any two reliefs: remove defect, replace, refund, compensation, punitive damages, discontinue unfair practice, withdraw hazardous goods, corrective advertisement, costs.',
  scheme: [['First relief', 1], ['Second relief', 1]],
}));
Q('s3_machinery', short({
  t: 3, d: 4, c: 'application', marks: 3, wl: S3,
  stem: `Three imagined buyers want to complain: Ravi paid ${inr(9 * LAKH)} for a family car, the Sen family paid ${inr(1.5 * CRORE)} for a villa to live in, and Dr Nair paid ${inr(3 * CRORE)} to a builder for a penthouse for her own residence. Name the commission for each and give the reason.`,
  model: `The forum depends on the value paid for the goods or services, not on the compensation each buyer may claim.\n1. **Ravi:** ${inr(9 * LAKH)} paid for the car is within ₹50 lakh, so he files before the **District Commission**.\n2. **Sen family:** ${inr(1.5 * CRORE)} is above ₹50 lakh but not above ₹2 crore, so the **State Commission** hears it.\n3. **Dr Nair:** ${inr(3 * CRORE)} is above ₹2 crore, so the case goes to the **National Commission**.`,
  sol: 'Compare each value paid with the limits: up to ₹50 lakh District, up to ₹2 crore State, above that National.',
  scheme: [['Ravi: District with reason', 1], ['Hotel: State with reason', 1], ['Hospital: National with reason', 1]],
}));
Q('s3_appeals', short({
  t: 3, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain how appeals move through the consumer redressal machinery, from a District Commission\'s order upwards.',
  model: '1. A party not satisfied with a **District Commission** order may appeal to the **State Commission**, within 45 days.\n2. Against a **State Commission** order, an appeal lies with the **National Commission**, within 30 days.\n3. Against a **National Commission** order, the party may finally appeal to the **Supreme Court**, within 30 days.',
  sol: 'Each step of appeal with the body it goes to (time limits add value).',
  scheme: [['District to State', 1], ['State to National', 1], ['National to Supreme Court', 1]],
}));
Q('l_machinery', long({
  t: 3, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Describe the three-tier redressal machinery under the Consumer Protection Act 2019, stating the jurisdiction of each tier and the route of appeal.',
  model: '1. **Three tiers:** quasi-judicial commissions at the district, state and national levels hear consumer complaints; the Central Government sets up the National Commission, and state governments set up the State and District Commissions.\n2. **District Commission:** hears complaints where the value of goods or services paid is **up to ₹50 lakh**.\n3. **State Commission:** hears complaints **above ₹50 lakh and up to ₹2 crore**, and appeals against District Commission orders.\n4. **National Commission:** hears complaints **above ₹2 crore**, and appeals against State Commission orders.\n5. **Appeals:** District to State (45 days), State to National (30 days), National to the **Supreme Court** (30 days). Complaints may also be filed online, and mediation is available where both sides agree.',
  sol: 'Structure, the three jurisdictions by value paid, and the chain of appeal.',
  scheme: [['Three-tier structure', 1], ['District Commission jurisdiction', 1], ['State Commission jurisdiction', 1], ['National Commission jurisdiction', 1], ['Route of appeal', 1]],
}));
Q('l_remedies', long({
  t: 3, d: 2, c: 'understanding', marks: 5, wl: L5,
  stem: 'Explain any five reliefs that a consumer commission may grant when it upholds a complaint.',
  model: '1. **Remove the defect** in the goods or the deficiency in the service.\n2. **Replace** the defective product with a new one free from defect, or **return the price** paid along with charges.\n3. **Pay compensation** for any loss or injury suffered because of the seller\'s negligence; **punitive damages** may be added in serious cases.\n4. **Discontinue** an unfair or restrictive trade practice and **not repeat** it; **withdraw** hazardous goods from sale and stop offering them.\n5. **Issue a corrective advertisement** to neutralise the effect of a misleading one, and **pay adequate costs** of the case to the complainant.',
  sol: 'Five reliefs, each explained in a line.',
  scheme: [['First relief explained', 1], ['Second relief explained', 1], ['Third relief explained', 1], ['Fourth relief explained', 1], ['Fifth relief explained', 1]],
}));

// ================================================================ t04 Consumer organisations and NGOs
Q('m_ngo_testing', mcq({
  t: 4, d: 2, c: 'application',
  stem: 'The imagined Saksham Grahak Manch in Nagpur sends ten brands of packaged honey to a laboratory and publishes which ones are adulterated. Which role of consumer organisations does this show?',
  opts: [
    'Testing products and publishing comparative results',
    'Providing legal help to an individual consumer',
    'Organising protests against exploitation',
    'Filing complaints in the Supreme Court',
  ],
  sol: 'Laboratory testing of competing brands and publishing the results helps consumers choose wisely; it is one of the main roles of consumer organisations.',
}));
Q('m_ngo_legal', mcq({
  t: 4, d: 2, c: 'application',
  stem: 'An imagined NGO in Guwahati helps a daily-wage worker draft her complaint about a defective gas cylinder and sends a volunteer lawyer with her to the District Commission. This role is',
  opts: ['providing legal assistance to consumers', 'testing products in laboratories', 'publishing consumer magazines', 'encouraging protests'],
  sol: 'Helping a consumer prepare and pursue a case is legal assistance, especially important for consumers who cannot afford a lawyer.',
}));
Q('m_ngo_info', mcq({
  t: 4, d: 1, c: 'understanding',
  stem: 'A consumer group prints a monthly magazine on product safety, legal remedies and recent commission orders. Its main purpose is to',
  opts: ['collect and spread information on consumer problems and remedies', 'sell goods at the lowest price', 'replace the consumer commissions', 'fix prices for sellers'],
  sol: 'Collecting and disseminating information through magazines, journals and meetings is a key role of consumer organisations.',
}));
Q('ar_ngo', ar({
  t: 4, d: 2, c: 'analysis', key: 'a',
  a: 'Consumer organisations often publish comparative test results of different brands of the same product.',
  r: 'Such results help consumers make informed choices and push makers to improve quality.',
  sol: 'Both are true, and R explains A: the purpose of publishing test results is to inform buyers and pressure producers to improve.',
}));
Q('tf_ngo_only_educate', tf({
  t: 4, d: 1, c: 'understanding', ans: false,
  stem: 'True or false? Consumer organisations can only educate consumers; they can never file complaints on behalf of consumers.',
  sol: 'A registered voluntary consumer association can file complaints before the commissions on behalf of consumers, besides educating them.',
}));
Q('s_ngo_two', short({
  t: 4, d: 1, c: 'recall', marks: 2, wl: S2,
  stem: 'State any two functions performed by consumer organisations and NGOs in India.',
  model: '1. **Educating consumers** about their rights through talks, workshops and campaigns.\n2. **Filing complaints** before consumer commissions on behalf of consumers and giving them legal help.',
  sol: 'Any two functions: education, information, testing, protests, legal help, filing complaints, representation on government bodies.',
  scheme: [['First function', 1], ['Second function', 1]],
}));
Q('s3_ngo_three', short({
  t: 4, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'Residents of an imagined Bhopal colony face adulterated milk, overcharging by water-tanker suppliers and short-weight gas cylinders. Suggest three ways in which a local consumer organisation could help them.',
  model: '1. **Test milk samples** in a laboratory and publish the results to warn residents and shame the sellers.\n2. **Organise protests and awareness drives** against overcharging tanker suppliers, and teach residents to check gas-cylinder weight.\n3. **File a complaint** before the District Commission on behalf of the residents and give them **legal help**.',
  sol: 'Three roles, each applied to one of the residents\' problems.',
  scheme: [['First way applied', 1], ['Second way applied', 1], ['Third way applied', 1]],
}));
Q('l_ngo', long({
  t: 4, d: 2, c: 'understanding', marks: 5, wl: L5,
  stem: 'Explain the role of consumer organisations and NGOs in protecting and promoting the interests of consumers. (Any five points)',
  model: '1. **Educating the public:** they run workshops, school clubs and campaigns so that consumers learn their rights and responsibilities.\n2. **Collecting and spreading information:** they publish journals and reports on product safety, legal changes and important commission orders.\n3. **Testing products:** they get competing brands tested in laboratories and publish comparative results, which helps buyers choose.\n4. **Encouraging protest:** they organise consumers to protest and take action against exploitative and unfair practices of sellers.\n5. **Legal help and complaints:** they give legal assistance and file complaints in consumer commissions on behalf of consumers; they also take part in government bodies that frame consumer policy.',
  sol: 'Five roles, each named and explained.',
  scheme: [['First role explained', 1], ['Second role explained', 1], ['Third role explained', 1], ['Fourth role explained', 1], ['Fifth role explained', 1]],
}));

// ================================================================ case-based
Q('cb_geyser', caseQ({
  t: [2, 3], d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the case of the Dhingra family\'s bursting geyser and answer the questions that follow. *(Imagined people, brand and figures, written by SOYL for practice.)*',
  passage: `**The Dhingra family, Shimla (imagined)**\n\nMr Dhingra bought a 25-litre geyser of the imagined brand Garamjal for ${inr(14500)} and kept the bill and warranty card. The box gave no instructions on earthing or on the safe temperature setting. Three weeks later the geyser burst at night and flooded the bathroom. His e-mails to the company were closed with an automatic message. He learnt from a newspaper column that he could approach a consumer commission himself, without hiring a lawyer.`,
  parts: [
    child('a', mcq({ t: 2, d: 1, c: 'application', stem: 'The burst geyser most directly violated the family\'s', opts: ['right to safety', 'right to choose', 'right to consumer education', 'right to be heard'], sol: 'A product that bursts threatens life and property: right to safety.' })),
    child('b', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Quote the words that show a responsibility the consumer fulfilled.', model: '"**kept the bill and warranty card**" — keeping proof of purchase.', sol: 'The words about the bill and warranty.', scheme: [['Correct words quoted', 1]] })),
    child('c', short({ t: 3, d: 3, c: 'application', marks: 2, stem: '**Either** (i): Name the commission where Mr Dhingra should file his complaint and two reliefs he may ask for.', model: `The **District Commission**, since ${inr(14500)} is within ₹50 lakh. He may ask for **replacement** of the geyser (or refund) and **compensation** for the damage caused by the flood.`, sol: 'Forum by value paid, plus two suitable reliefs.', scheme: [['District Commission with reason', 1], ['Two suitable reliefs', 1]] }), [
      short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Identify two rights other than safety that were also denied, with the words that show each.', model: '1. **Right to be informed:** "no instructions on earthing or on the safe temperature setting".\n2. **Right to be heard:** his e-mails "were closed with an automatic message".', sol: 'Two further rights, each with its words.', scheme: [['Information with words', 1], ['Being heard with words', 1]] }),
    ]),
  ],
}));
Q('cb_coaching', caseQ({
  t: [2, 3], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the case of the Shikhar Coaching advertisement in Kota and answer the questions that follow. *(Imagined institute, people and figures, written by SOYL for practice.)*',
  passage: `**Shikhar Coaching Classes, Kota (imagined)**\n\nShikhar\'s hoardings promised "100 per cent selection guaranteed" and "classes by former toppers". Aman paid ${inr(COACH.fee)} a year for ${COACH.years} years. Halfway through, the institute merged batches of 300 students, and most teachers turned out to be recent graduates. When Aman asked for the faculty list, he was told it was "confidential". Several parents met a registered consumer association in the city, which agreed to take up the matter for all of them.`,
  parts: [
    child('a', mcq({ t: 2, d: 2, c: 'application', stem: 'Aman is a consumer of', opts: ['a service hired for consideration', 'goods bought for resale', 'goods bought for a commercial purpose', 'nothing, as education is not covered'], sol: 'Coaching is a service hired for a fee, so Aman is a consumer of services.' })),
    child('b', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Quote the words that show the denial of the right to be informed.', model: '"**he was told it was \'confidential\'**" — refusal to give information about the faculty.', sol: 'The words about the refused faculty list.', scheme: [['Correct words quoted', 1]] })),
    child('c', short({ t: 3, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Can the consumer association file the complaint? Name the commission and one relief suited to the hoardings.', model: `**Yes:** a registered consumer association may complain on consumers\' behalf. Aman paid ${inr(COACH_TOTAL)} in all, within ₹50 lakh, so the **District Commission**; it may order a **corrective advertisement** against the misleading claims.`, sol: 'Eligibility of the association, forum by value, and a relief matched to false advertising.', scheme: [['Association can file; District Commission', 1], ['Corrective advertisement (or discontinue unfair practice)', 1]] }), [
      short({ t: 1, d: 3, c: 'evaluation', marks: 2, stem: '**Or** (ii): How would honest advertising have served Shikhar\'s own long-term interest?', model: 'Honest claims build **trust and goodwill**; satisfied students recommend the institute, bringing **steady admissions**. Misleading hoardings bring short-term fees but invite **complaints, penalties and a bad name**.', sol: 'Link fair dealing to goodwill and lasting business.', scheme: [['Goodwill and repeat admissions', 1], ['Cost of misleading claims', 1]] }),
    ]),
  ],
}));
Q('cb_hospital', caseQ({
  t: 3, d: 4, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the case of the Mehta family\'s surgery bill at an imagined Ahmedabad hospital and answer the questions that follow. *(Imagined hospital, people and figures, written by SOYL for practice.)*',
  passage: `**Sanjivani Super-Speciality Hospital, Ahmedabad (imagined)**\n\nThe Mehta family paid ${inr(HOSP.pkg)} for a heart-surgery package and ${inr(HOSP.room)} for a private room. After the operation, an infection spread because instruments were not properly sterilised, and the patient needed a second surgery elsewhere. The family claimed ${inr(3 * CRORE)} as compensation. The hospital argued that the case must go to the National Commission because of the size of the claim.`,
  parts: [
    child('a', num({ t: 3, d: 2, c: 'application', marks: 1, value: HOSP_TOTAL, unit: '₹', stem: 'What is the total value of services paid for by the family (in ₹)?', sol: `Step 1: Package + room = ${HOSP.pkg.toLocaleString('en-IN')} + ${HOSP.room.toLocaleString('en-IN')}.\nStep 2: Total = ${HOSP_TOTAL.toLocaleString('en-IN')}, i.e. ${inr(HOSP_TOTAL)}.` })),
    child('b', short({ t: 3, d: 3, c: 'analysis', marks: 1, stem: 'Which commission has jurisdiction, and is the hospital\'s argument correct?', model: `The **State Commission**, because the value paid (${inr(HOSP_TOTAL)}) is above ₹50 lakh but not above ₹2 crore. The hospital is **wrong**: the forum depends on value paid, not on compensation claimed.`, sol: 'Forum by value paid; reject the claim-based argument.', scheme: [['State Commission with correct basis', 1]] })),
    child('c', short({ t: 3, d: 4, c: 'evaluation', marks: 2, stem: '**Either** (i): If the State Commission rules against the family, what can they do next, and where?', model: 'They can **appeal** to the **National Commission** within 30 days of the order; if still dissatisfied, a further appeal lies with the **Supreme Court**.', sol: 'State the next appeal and the final one.', scheme: [['Appeal to National Commission', 1], ['Further appeal to Supreme Court', 1]] }), [
      short({ t: 3, d: 4, c: 'evaluation', marks: 2, stem: '**Or** (ii): Suggest two reliefs the commission could grant if it finds the hospital negligent, and justify one.', model: '1. **Compensation** for the cost of the second surgery and suffering.\n2. **Punitive damages**, justified because careless sterilisation is **gross negligence** that can endanger many patients.', sol: 'Two reliefs; justify one by the seriousness of the lapse.', scheme: [['Two suitable reliefs', 1], ['Justification', 1]] }),
    ]),
  ],
}));
Q('cb_manch', caseQ({
  t: [4, 2], d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the case of the Jagruk Grahak Samiti\'s work in Varanasi and answer the questions that follow. *(Imagined organisation and people, written by SOYL for practice.)*',
  passage: '**Jagruk Grahak Samiti, Varanasi (imagined)**\n\nThe Samiti, a registered consumer association, held Sunday camps where volunteers showed women how to check the expiry date and net weight on packets. It sent samples of six brands of mustard oil to a laboratory and printed the results in its newsletter. When a sweet shop kept using a faulty weighing scale, members gathered outside the shop with placards. The Samiti also helped a retired teacher take his complaint about a defective hearing aid to the District Commission.',
  parts: [
    child('a', mcq({ t: 4, d: 1, c: 'application', stem: 'Gathering outside the sweet shop with placards is an example of', opts: ['encouraging consumers to protest against exploitation', 'testing products', 'publishing information', 'legal assistance'], sol: 'Organised protest against an unfair practice.' })),
    child('b', short({ t: 4, d: 2, c: 'application', marks: 1, stem: 'Quote the words that show the Samiti testing products.', model: '"**sent samples of six brands of mustard oil to a laboratory**".', sol: 'The words about laboratory testing.', scheme: [['Correct words quoted', 1]] })),
    child('c', short({ t: [4, 2], d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Identify two other roles of the Samiti, with the words that show them.', model: '1. **Educating consumers:** "showed women how to check the expiry date and net weight".\n2. **Legal assistance:** "helped a retired teacher take his complaint".', sol: 'Two roles with matching words.', scheme: [['First role with words', 1], ['Second role with words', 1]] }), [
      short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Which consumer right do the Sunday camps promote, and which consumer responsibility do they build?', model: 'They promote the **right to consumer education**, and build the responsibility of **reading labels** (dates, weight, price) before buying.', sol: 'One right and one responsibility linked to the camps.', scheme: [['Right to consumer education', 1], ['Responsibility to read labels', 1]] }),
    ]),
  ],
}));
Q('cb_tarang', caseQ({
  t: [1, 2], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the case of the two kitchenware makers at a Rajkot trade fair and answer the questions that follow. *(Imagined firms, written by SOYL for practice.)*',
  passage: '**Two kitchenware makers, Rajkot (imagined)**\n\nNirmal Steel prints full details on every pressure cooker box, carries the ISI mark and replaces defective gaskets free for a year. Its repeat buyers now bring most of its sales. A rival, Chamak Ware, sold cookers without safety valves at a lower price. After several accidents, the authorities ordered it to withdraw the cookers and stop sales, and newspapers carried the story for weeks. Chamak\'s sales collapsed.',
  parts: [
    child('a', mcq({ t: 1, d: 2, c: 'application', stem: 'Nirmal Steel\'s growing repeat sales show which reason why business should protect consumers?', opts: ['Long-term interest of business', 'Consumer ignorance', 'Unorganised consumers', 'Widespread exploitation'], sol: 'Fair dealing brings repeat buyers and goodwill: long-term interest.' })),
    child('b', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'Quote the words that show what happens to a firm that ignores consumers, as an argument for consumer protection.', model: '"**the authorities ordered it to withdraw the cookers and stop sales**" — government intervention.', sol: 'The words about the official order.', scheme: [['Correct words quoted', 1]] })),
    child('c', short({ t: [2, 1], d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Identify two consumer rights that Nirmal Steel respects, with the words that show them.', model: '1. **Right to be informed:** "prints full details on every pressure cooker box".\n2. **Right to safety:** "carries the ISI mark", showing certified, safe quality.', sol: 'Two rights with matching words.', scheme: [['First right with words', 1], ['Second right with words', 1]] }), [
      short({ t: 1, d: 3, c: 'evaluation', marks: 2, stem: '**Or** (ii): Chamak Ware gained sales at first by selling cheaper. Why did this strategy fail?', model: 'Unsafe goods caused **accidents**, which led to **government action** and wide **bad publicity**. Consumers lost trust, so the short-term price advantage turned into a **collapse of sales**.', sol: 'Link unsafe goods to intervention, lost trust and falling sales.', scheme: [['Accidents and government action', 1], ['Loss of trust and sales', 1]] }),
    ]),
  ],
}));
