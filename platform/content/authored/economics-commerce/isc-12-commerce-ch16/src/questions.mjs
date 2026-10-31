// ISC 12 Commerce, ch16 Consumer Protection — question bank. Every firm, brand, person and situation is imagined and
// written by SOYL and labelled as such; no ISC or CBSE textbook illustration or exercise and no CISCE specimen or
// board item is reused (D-036). Firms, people and set-ups differ from the CBSE 12 Business Studies chapter on
// consumer protection. Legal figures: pecuniary limits as notified in December 2021 (District up to ₹50 lakh; State
// above ₹50 lakh and up to ₹2 crore; National above ₹2 crore); 1986 Act limits ₹20 lakh / ₹1 crore; CCPA penalty for
// a false or misleading advertisement up to ₹10 lakh, and up to ₹50 lakh for a subsequent contravention.
import { Q, mcq, ar, tf, fb, match, short, long, caseQ, child } from './lib.mjs';

const S2 = [30, 50];
const S3 = [50, 75];
const L5 = [100, 150];

// ================================================================ t01 Need for consumer protection; methods
Q('m_need', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Raghav, a farmer in an imagined village near Mandsaur, bought a sprayer from a large company that broke within a week. The dealer ignored him, and Raghav could not afford to fight the company alone. This shows that consumers need protection mainly because',
  opts: ['individual consumers are unorganised and weaker than large sellers', 'sellers always cheat consumers', 'consumers never read labels', 'the law forbids buying farm equipment'],
  sol: 'A lone consumer has little information, money or bargaining power compared with a big seller; protection corrects this imbalance.',
}));
Q('m_selfhelp', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Before buying an air purifier, Ms Tirkey of Bokaro compares models, checks the certification mark, reads the warranty terms and insists on a proper bill. Which method of consumer protection is she using?',
  opts: ['Self-help', 'Legislation', 'A consumer association', 'Government price control'],
  sol: 'A consumer protecting herself through her own awareness and care is self-help.',
}));
Q('m_legislation', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'The Consumer Protection Act, 2019, together with the laws on weights and measures and on food safety, is an example of which method of consumer protection?',
  opts: ['Legislation', 'Self-help', 'Consumer associations', 'Advertising'],
  sol: 'Protecting consumers through laws passed by the government is legislation.',
}));
Q('m_ngo', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'An imagined consumer association in Purulia runs a free helpdesk at the weekly market, where buyers learn how to check expiry dates and how to file a complaint online. Which method of consumer protection is this?',
  opts: ['Consumer associations and NGOs', 'Legislation', 'Self-help alone', 'Sales promotion'],
  sol: 'Voluntary bodies that educate and help consumers are consumer associations and NGOs.',
}));
Q('ar_need', ar({
  t: 1, d: 3, c: 'understanding',
  a: 'Competition among sellers alone does not fully protect consumers.',
  r: 'Individual consumers are usually unorganised and have far less information than large sellers.',
  key: 'a',
  sol: 'Both are true, and the reason explains the assertion: without organisation and information, consumers cannot rely on competition alone.',
}));
Q('tf_methods', tf({
  t: 1, d: 1, c: 'understanding',
  stem: 'Consumer protection is the job of the government alone.',
  ans: false,
  sol: 'False. Consumers themselves (self-help), consumer associations and NGOs also protect consumers, alongside laws.',
}));
Q('fb_methods', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'Protection that a consumer gives herself by staying alert, checking quality marks and keeping bills is called ___.',
  acc: [['self-help', 'self help']],
  sol: 'This is self-help.',
}));
Q('s_need', short({
  t: 1, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'With reference to Raghav (imagined), whose new sprayer broke within a week, give two reasons why consumers need protection.',
  model: '1. **Unequal strength:** a single farmer has **little money or bargaining power** against a large company and its dealer.\n2. **Lack of information:** Raghav could not judge the **quality** of the sprayer before buying, and may not know his **rights or where to complain**.',
  sol: 'Two reasons (unorganised, ill-informed, unequal power, unfair practices, unsafe goods) linked to the case.',
  scheme: [['First reason', 1], ['Second reason', 1]],
}));
Q('s_methods', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Distinguish between self-help and legislation as methods of consumer protection.',
  model: '**Self-help** means consumers **protect themselves** through awareness: checking quality marks, reading labels and keeping bills. **Legislation** means the government **passes laws**, such as the Consumer Protection Act, 2019, that give consumers rights and **remedies** enforced by commissions.',
  sol: 'Each method explained to show the difference.',
  scheme: [['Self-help', 1], ['Legislation', 1]],
}));
Q('s3_methods', short({
  t: 1, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain the three methods of consumer protection: self-help, legislation, and consumer associations and NGOs.',
  model: '1. **Self-help:** an **alert consumer** checks marks and labels, insists on a bill and complains when cheated.\n2. **Legislation:** **laws** such as the Consumer Protection Act, 2019, give consumers rights and set up commissions and an authority to enforce them.\n3. **Consumer associations and NGOs:** **voluntary bodies** educate consumers, test products, publish findings and help or represent consumers in filing complaints.',
  sol: 'Each method explained.',
  scheme: [['Self-help', 1], ['Legislation', 1], ['Associations and NGOs', 1]],
}));
Q('l_need_methods', long({
  t: 1, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: '(a) Explain three reasons why consumers need protection. [3]\n(b) Compare self-help with consumer associations as methods of consumer protection. [2]',
  model: '(a) 1. **Unorganised and weak:** individual consumers are **scattered**, while sellers are large and organised, so consumers have little bargaining power.\n2. **Lack of information:** consumers often cannot judge **quality, safety or true price** and may not know their rights.\n3. **Unfair practices:** some sellers use **adulteration, short weights, false claims** or unsafe goods, which consumers cannot fight alone.\n\n(b) **Self-help** depends on the **individual consumer\'s own alertness**, such as checking marks and keeping bills; it costs nothing but helps only that consumer. **Consumer associations** are **organised groups** that educate many consumers, test products and file complaints on their behalf, giving them **collective strength**.',
  sol: 'Three reasons; comparison of the two methods.',
  scheme: [['(a) Three reasons', 3], ['(b) Comparison', 2]],
}));

// ================================================================ t02 Consumer under the 2019 Act; rights and responsibilities
Q('m_consumer_who', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'Which of these imagined buyers is a **consumer** under the Consumer Protection Act, 2019?',
  opts: ['Anita, who buys a sewing machine to stitch clothes herself and earn her living', 'A trader who buys fifty ceiling fans to resell in his shop', 'A person who receives a free sample with no payment at all', 'A large factory that buys a machine for mass commercial production'],
  sol: 'Goods bought for resale or for a commercial purpose are excluded, and a consumer must pay or promise consideration. Use of goods bought only to earn one\'s livelihood by self-employment is not a commercial purpose, so Anita is a consumer.',
}));
Q('m_consumer_online', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Under the Consumer Protection Act, 2019, the definition of a consumer covers purchases made',
  opts: ['both offline and online, including teleshopping, direct selling and multi-level marketing', 'only in shops with a physical address', 'only through government outlets', 'only for goods, never for services'],
  sol: 'The 2019 Act expressly covers offline and online transactions, teleshopping, direct selling and multi-level marketing, for goods and services.',
}));
Q('m_right_safety', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'The battery of an imagined e-bike brand, "Zoomvolt", catches fire while charging because it lacks a protection circuit. Which consumer right has been violated?',
  opts: ['Right to safety', 'Right to choose', 'Right to be heard', 'Right to consumer awareness'],
  sol: 'A product that can catch fire endangers life and property, so the buyer\'s right to safety is violated.',
}));
Q('m_right_info', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'An imagined loan app shows only the monthly instalment and reveals the processing fee and the total interest payable only after the loan is taken. Which consumer right is violated?',
  opts: ['Right to be informed', 'Right to safety', 'Right to seek redressal', 'Right to consumer awareness'],
  sol: 'Consumers have the right to be told about the quality, quantity, price and terms of goods and services before they buy.',
}));
Q('m_right_choose', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'In an imagined hill town, the only cable operator withdraws all cheaper channel packs, so viewers must take its costliest bundle or nothing. Which consumer right is affected?',
  opts: ['Right to choose', 'Right to safety', 'Right to be heard', 'Right to seek redressal'],
  sol: 'The right to choose means access to a variety of goods and services at competitive prices; forcing one costly option denies it.',
}));
Q('m_right_heard', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'An imagined state government invites consumer associations to sit on the committee that sets safety standards for school buses, so that parents\' concerns are considered. Which consumer right does this support?',
  opts: ['Right to be heard', 'Right to safety only', 'Right to choose', 'Right to seek redressal'],
  sol: 'The right to be heard means consumers\' interests receive due consideration at appropriate forums, such as committees that set standards.',
}));
Q('m_resp_genuine', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'Mehul (imagined) drops his new phone into a bucket of water and then files a complaint claiming it was defective, hoping for a free replacement. Which consumer responsibility does he ignore?',
  opts: ['To file only genuine complaints', 'To insist on a bill', 'To look for standard quality marks', 'To compare prices before buying'],
  sol: 'Consumers must complain only about genuine defects or deficiencies; false complaints waste the commission\'s time and are unfair to sellers.',
}));
Q('ar_consumer', ar({
  t: 2, d: 3, c: 'analysis',
  a: 'A person who buys a sewing machine to earn her own living by stitching at home is a consumer under the 2019 Act.',
  r: 'Anyone who buys goods for any commercial purpose is a consumer under the Act.',
  key: 'c',
  sol: 'The assertion is true: use for earning a livelihood by self-employment is not a commercial purpose. The reason is false: buyers for resale or commercial purposes are excluded.',
}));
Q('ar_rights', ar({
  t: 2, d: 3, c: 'analysis',
  a: 'Consumers have the right to be protected against goods that are hazardous to life and property.',
  r: 'Consumers have a responsibility to insist on a bill for every purchase.',
  key: 'b',
  sol: 'Both statements are true, but the duty to take a bill does not explain the right to safety; they are separate parts of consumer protection.',
}));
Q('tf_free', tf({
  t: 2, d: 2, c: 'understanding',
  stem: 'A person who gets goods entirely free of cost is a consumer under the Consumer Protection Act, 2019.',
  ans: false,
  sol: 'False. A consumer must pay, or promise to pay, a consideration; goods obtained wholly free are not covered.',
}));
Q('fb_rights', fb({
  t: 2, d: 1, c: 'recall',
  stem: 'The right to acquire the knowledge and skills needed to be an informed consumer throughout life is the right to consumer ___.',
  acc: [['awareness', 'education']],
  sol: 'This is the right to consumer awareness (consumer education).',
}));
Q('mt_rights', match({
  t: 2, d: 3, c: 'application', marks: 2,
  stem: 'Match each imagined complaint with the consumer right it mainly involves.',
  pairs: [
    ['An e-bike battery catches fire while charging', 'Right to safety'],
    ['A loan app hides its fees until after the loan', 'Right to be informed'],
    ['The only cable operator scraps all cheap packs', 'Right to choose'],
    ['A commission orders a sagging mattress replaced', 'Right to seek redressal'],
  ],
  sol: 'Hazard is safety; hidden fees are information; one forced option is choice; a remedy from a commission is redressal.',
}));
Q('s_consumer', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Who is a consumer under the Consumer Protection Act, 2019? Name one kind of buyer who is not a consumer.',
  model: 'A **consumer** is a person who **buys goods or hires services for a consideration** (paid, promised or partly paid), offline or online, including a **user with the buyer\'s approval**. A person who buys goods **for resale or a commercial purpose** is **not** a consumer.',
  sol: 'Meaning with consideration and users; one excluded buyer.',
  scheme: [['Meaning', 1], ['Excluded buyer', 1]],
}));
Q('s_rights2', short({
  t: 2, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'Identify the consumer right violated in each imagined case, with a reason: (i) a loan app hides its fees until after the loan; (ii) an e-bike battery catches fire while charging.',
  model: '(i) **Right to be informed:** buyers must know the **full price and terms** before they decide.\n(ii) **Right to safety:** consumers must be protected from goods **hazardous to life and property**.',
  sol: 'Each right named with a reason.',
  scheme: [['(i) Right to be informed', 1], ['(ii) Right to safety', 1]],
}));
Q('s_resp', short({
  t: 2, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'State two responsibilities that Yamini (imagined), a first-time earner in Durg, should keep in mind while buying a television online.',
  model: '1. **Get a proper invoice and warranty card**, and keep them safely, as proof if she needs to complain.\n2. **Read the product details, return policy and seller information** before paying, and check for a **standard quality mark**.',
  sol: 'Any two responsibilities (awareness, bill, marks, reading labels and terms, genuine complaints, use as instructed) applied.',
  scheme: [['First responsibility', 1], ['Second responsibility', 1]],
}));
Q('s3_rights', short({
  t: 2, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'Explain three rights of consumers, with an imagined example of a violation of each.',
  model: '1. **Right to safety:** protection from **hazardous goods**; violated when an **e-bike battery** catches fire for want of a safety circuit.\n2. **Right to be informed:** knowing **price, quality and terms** before buying; violated when a **loan app hides fees**.\n3. **Right to choose:** access to **variety at competitive prices**; violated when a town\'s only **cable operator** scraps all cheaper packs.',
  sol: 'Three rights, each with a violation example.',
  scheme: [['First right', 1], ['Second right', 1], ['Third right', 1]],
}));
Q('s3_resp', short({
  t: 2, d: 2, c: 'application', marks: 3, wl: S3,
  stem: 'Yamini (imagined), Durg, is buying a second-hand scooter and a motor insurance policy online. Explain three responsibilities she should follow as a consumer.',
  model: '1. **Be aware and careful:** check the scooter\'s **papers and condition**, and read the **policy terms** on cover and exclusions.\n2. **Insist on documents:** get a **written sale agreement, receipt and policy document**, and keep them safely.\n3. **Act fairly and file genuine complaints:** use the scooter as advised, give **true facts** when buying insurance, and complain only about **real deficiencies**.',
  sol: 'Three responsibilities applied to the purchases.',
  scheme: [['First responsibility', 1], ['Second responsibility', 1], ['Third responsibility', 1]],
}));
Q('l_rights', long({
  t: 2, d: 3, c: 'application', marks: 5, wl: L5,
  stem: '(a) Who is a consumer under the Consumer Protection Act, 2019? [1]\n(b) Explain four rights of consumers, giving an imagined example of a violation of each. [4]',
  model: '(a) A **consumer** is a person who **buys goods or avails services for a consideration**, offline or online, including a user with the buyer\'s approval, but **not** one who buys for **resale or a commercial purpose**.\n\n(b) 1. **Right to safety:** protection from **hazardous goods**; violated by an e-bike battery that catches fire for lack of a safety circuit.\n2. **Right to be informed:** facts on **price, quality and terms**; violated by a loan app that hides its fees.\n3. **Right to choose:** **variety at competitive prices**; violated when a town\'s only cable operator scraps all cheaper packs.\n4. **Right to seek redressal:** a **fair remedy** for loss; denied when a seller refuses to replace a mattress that sagged within a month.',
  sol: 'Meaning of consumer; four rights with violations.',
  scheme: [['(a) Meaning of consumer', 1], ['(b) Four rights with examples', 4]],
}));

// ================================================================ t03 Commissions and pecuniary jurisdiction
Q('m_district', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'Rekha (imagined) paid ₹42 lakh for a flat to live in, and the builder has not fixed serious leaks for a year. Under the limits notified in 2021, where should she file her complaint?',
  opts: ['District Commission', 'State Commission', 'National Commission', 'Supreme Court directly'],
  sol: 'A value paid of up to ₹50 lakh falls within the District Commission\'s limit.',
}));
Q('m_state', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'The Bhattacharya family (imagined) paid ₹1.4 crore for a house to live in, which developed cracks within months. Under the limits notified in 2021, which body hears their complaint?',
  opts: ['State Commission', 'District Commission', 'National Commission', 'Central Consumer Protection Authority'],
  sol: 'A value paid above ₹50 lakh and up to ₹2 crore falls within the State Commission\'s limit.',
}));
Q('m_national', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'Mr Kohli (imagined) paid ₹2.4 crore for an apartment for his own family, and the builder failed to deliver it. Under the limits notified in 2021, where should he file his complaint?',
  opts: ['National Commission', 'State Commission', 'District Commission', 'Any civil court only'],
  sol: 'A value paid above ₹2 crore falls within the National Commission\'s limit.',
}));
Q('m_value_paid', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: 'Ishita (imagined) paid ₹30 lakh for interior work on her home, which was badly done. She claims ₹80 lakh as compensation. Under the 2019 Act and the limits notified in 2021, which commission hears her complaint?',
  opts: ['District Commission, because the value paid decides the limit', 'State Commission, because the compensation claimed exceeds ₹50 lakh', 'National Commission, because the claim is large', 'None, because services are not covered'],
  sol: 'Under the 2019 Act the limit depends on the value of goods or services paid as consideration (₹30 lakh here), not on the compensation claimed.',
}));
Q('m_appeal', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'A complaint filed before a State Commission has been decided, and the consumer is not satisfied. Where can she appeal?',
  opts: ['National Commission', 'District Commission', 'Central Consumer Protection Authority', 'The seller\'s grievance cell'],
  sol: 'Appeals lie from a District Commission to the State Commission, from a State Commission to the National Commission, and from the National Commission to the Supreme Court.',
}));
Q('m_where_file', mcq({
  t: 3, d: 3, c: 'understanding',
  stem: 'Under the Consumer Protection Act, 2019, a consumer who bought a phone online from a seller based in another state may file her complaint in the commission where',
  opts: ['she lives or works, among other places', 'the seller\'s head office is, and nowhere else', 'the phone was manufactured, and nowhere else', 'the Supreme Court sits'],
  sol: 'The 2019 Act lets a complainant file where she resides or personally works for gain, besides where the opposite party is or where the cause of action arose.',
}));
Q('m_mediation', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'At the first hearing, Ms Lyngdoh (imagined) and the furniture shop she complained against both agree to try to settle their dispute through the consumer mediation cell attached to the commission. This option was introduced by the',
  opts: ['Consumer Protection Act, 2019', 'Consumer Protection Act, 1986', 'Companies Act', 'Sale of Goods Act only'],
  sol: 'The 2019 Act provides for mediation, through mediation cells attached to the commissions, when both parties agree.',
}));
Q('ar_juris', ar({
  t: 3, d: 3, c: 'understanding',
  a: 'A complaint about goods for which ₹75 lakh was paid is filed before the State Commission.',
  r: 'As notified in 2021, the State Commission hears complaints where the value paid is above ₹50 lakh and up to ₹2 crore.',
  key: 'a',
  sol: 'Both are true, and the reason explains the assertion: ₹75 lakh lies within the State Commission\'s range.',
}));
Q('ar_juris_false', ar({
  t: 3, d: 3, c: 'analysis',
  a: 'The National Commission hears every complaint where the value paid exceeds ₹50 lakh.',
  r: 'Under the 2019 Act, the amount of compensation claimed decides which commission hears a complaint.',
  key: 'd',
  sol: 'Both statements are false. Above ₹50 lakh and up to ₹2 crore is the State Commission\'s range, and the value paid as consideration, not the compensation claimed, decides the forum.',
}));
Q('tf_juris', tf({
  t: 3, d: 1, c: 'understanding',
  stem: 'Under the limits notified in 2021, a District Commission can hear a complaint about goods for which ₹45 lakh was paid.',
  ans: true,
  sol: 'True. The District Commission hears complaints where the value paid does not exceed ₹50 lakh.',
}));
Q('fb_juris', fb({
  t: 3, d: 1, c: 'recall',
  stem: 'Under the limits notified in 2021, complaints where the value of goods or services paid exceeds ₹2 crore are filed before the ___ Commission.',
  acc: [['National', 'National Consumer Disputes Redressal']],
  sol: 'They go to the National Commission.',
}));
Q('mt_commission', match({
  t: 3, d: 3, c: 'application', marks: 2,
  stem: 'Match each imagined complaint or appeal with the body that hears it, using the limits notified in 2021.',
  pairs: [
    ['A ₹18 lakh home-interiors contract badly done', 'District Commission'],
    ['A ₹95 lakh house with major defects', 'State Commission'],
    ['A ₹3 crore apartment never delivered', 'National Commission'],
    ['An appeal against the National Commission\'s order on a complaint filed before it', 'Supreme Court'],
  ],
  sol: 'Up to ₹50 lakh: District; above ₹50 lakh to ₹2 crore: State; above ₹2 crore: National; an appeal from the National Commission\'s original order goes to the Supreme Court.',
}));
Q('s_choose', short({
  t: 3, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'Using the limits notified in 2021, name the commission that will hear each imagined complaint, with a reason: (i) a ₹48 lakh solar-roof contract for a home; (ii) a ₹2.3 crore flat never delivered.',
  model: '(i) **District Commission:** the value paid, **₹48 lakh**, does **not exceed ₹50 lakh**.\n(ii) **National Commission:** the value paid, **₹2.3 crore**, is **above ₹2 crore**.',
  sol: 'Correct commission with the limit for each case.',
  scheme: [['(i) District with reason', 1], ['(ii) National with reason', 1]],
}));
Q('s3_tier', short({
  t: 3, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain the three-tier machinery for redressal of consumer disputes under the 2019 Act, stating the pecuniary limit of each tier as notified in 2021 and the route of appeal.',
  model: '1. **District Commission:** in each district; hears complaints where the value paid is **up to ₹50 lakh**.\n2. **State Commission:** in each state; hears complaints **above ₹50 lakh and up to ₹2 crore**, and appeals from District Commissions.\n3. **National Commission:** at New Delhi; hears complaints **above ₹2 crore** and appeals from State Commissions; appeals from its original orders go to the **Supreme Court**.',
  sol: 'Each tier with its limit, and the appeal route.',
  scheme: [['District', 1], ['State', 1], ['National and appeal route', 1]],
}));
Q('s3_new', short({
  t: 3, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'Priyanka (imagined) lives in Bilaspur and bought a faulty laptop online from a seller in Bengaluru. Explain three provisions of the 2019 Act that make it easier for her to seek redressal.',
  model: '1. **Filing where she lives:** she can complain to the **commission in Bilaspur**, where she resides, instead of travelling to Bengaluru.\n2. **E-filing:** she can **file her complaint online** and pay fees electronically, without visiting an office.\n3. **Mediation:** if both sides agree, the dispute can go to the **mediation cell** for a quicker, friendly settlement.',
  sol: 'Three provisions (residence-based filing, e-filing, mediation, online purchases covered) applied.',
  scheme: [['First provision', 1], ['Second provision', 1], ['Third provision', 1]],
}));
Q('l_commission', long({
  t: 3, d: 3, c: 'application', marks: 5, wl: L5,
  stem: '(a) Describe the three-tier machinery for consumer redressal under the Consumer Protection Act, 2019, with the pecuniary limit of each tier as notified in 2021. [3]\n(b) Ms Lalnunmawii (imagined) paid ₹60 lakh for a home that leaks, and claims ₹1.5 crore as compensation. Name the commission that will hear her complaint, and say where she can appeal if she is not satisfied. [2]',
  model: '(a) 1. **District Commission:** set up in each district; hears complaints where the **value of goods or services paid does not exceed ₹50 lakh**.\n2. **State Commission:** in each state; hears complaints where the value paid is **above ₹50 lakh and up to ₹2 crore**, and **appeals** against District Commission orders.\n3. **National Commission:** hears complaints where the value paid is **above ₹2 crore**, and appeals against State Commission orders; appeals against its own original orders go to the **Supreme Court**.\n\n(b) The **State Commission**, because the **value paid (₹60 lakh)** decides the limit, not the ₹1.5 crore claimed. If not satisfied, she can **appeal to the National Commission**.',
  sol: 'Three tiers with limits; the correct forum by value paid; the appeal route.',
  scheme: [['(a) Three tiers with limits', 3], ['(b) Correct commission with reason', 1], ['(b) Appeal route', 1]],
}));

// ================================================================ t04 Misleading advertisements; latest provisions
Q('m_misleading', mcq({
  t: 4, d: 2, c: 'application',
  stem: 'A television advertisement for an imagined health drink, "TallMax", says it guarantees two inches of extra height in three months, though no study supports the claim. Under the 2019 Act, this is',
  opts: ['a misleading advertisement, because it gives a false guarantee', 'a lawful advertisement, since all advertisements exaggerate', 'publicity, because it is on television', 'a sales promotion offer'],
  sol: 'An advertisement that falsely describes a product or gives a false guarantee likely to mislead buyers is misleading.',
}));
Q('m_ccpa', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'Under the Consumer Protection Act, 2019, which body can direct a manufacturer to withdraw or modify a false or misleading advertisement and impose a penalty?',
  opts: ['Central Consumer Protection Authority', 'District Commission only', 'Advertising agency of the firm', 'The consumer\'s bank'],
  sol: 'The Central Consumer Protection Authority (CCPA) can order discontinuation or modification of misleading advertisements and impose penalties.',
}));
Q('m_penalty', mcq({
  t: 4, d: 2, c: 'recall',
  stem: 'For a first false or misleading advertisement, the Central Consumer Protection Authority may impose on a manufacturer or endorser a penalty of up to',
  opts: ['₹10 lakh', '₹50 lakh', '₹1 lakh', '₹1 crore'],
  sol: 'The penalty may extend to ₹10 lakh, and up to ₹50 lakh for every subsequent contravention.',
}));
Q('m_endorser', mcq({
  t: 4, d: 3, c: 'analysis',
  stem: 'A film actor endorses an imagined "fat-burning tea" on social media without checking whether its claims are true. The claims turn out to be false. Under the 2019 Act,',
  opts: ['the actor may be penalised, unless he had exercised due diligence to verify the claims', 'only the tea maker can be penalised', 'endorsers are never responsible for advertisements', 'the buyers are responsible for believing the advertisement'],
  sol: 'The Act holds endorsers liable for false or misleading advertisements, but an endorser who has done due diligence to verify the claims is not penalised.',
}));
Q('m_product_liability', mcq({
  t: 4, d: 3, c: 'application',
  stem: 'A child is hurt when the front wheel of an imagined toy cycle, "Pedalo", comes off because of a manufacturing defect. Under the product liability provisions of the 2019 Act, the family can claim compensation from',
  opts: ['the manufacturer, for harm caused by the defective product', 'nobody, as toys are not covered', 'only the child\'s school', 'the advertising agency alone'],
  sol: 'Product liability makes the manufacturer (and, in some cases, the service provider or seller) liable to compensate for harm caused by a defective product.',
}));
Q('m_concealment', mcq({
  t: 4, d: 3, c: 'analysis',
  stem: 'An advertisement for an imagined home-loan scheme shows "zero interest" in large print, and mentions only in tiny letters that heavy processing fees apply. Why is it misleading?',
  opts: ['It deliberately conceals important information', 'It uses large print', 'It advertises a financial service', 'It names the bank'],
  sol: 'An advertisement that deliberately hides important information, giving a false overall impression, is misleading.',
}));
Q('ar_ccpa', ar({
  t: 4, d: 3, c: 'understanding',
  a: 'The CCPA can act against a misleading advertisement even if no consumer has filed a case before a commission.',
  r: 'The CCPA protects and enforces the rights of consumers as a class.',
  key: 'a',
  sol: 'Both are true, and the reason explains the assertion: because it protects consumers as a class, the CCPA can act on its own or on information received.',
}));
Q('tf_endorser', tf({
  t: 4, d: 1, c: 'understanding',
  stem: 'Under the Consumer Protection Act, 2019, a celebrity who endorses a product can never be penalised for a misleading advertisement.',
  ans: false,
  sol: 'False. The CCPA may penalise an endorser of a false or misleading advertisement, unless the endorser had exercised due diligence.',
}));
Q('s_misleading', short({
  t: 4, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'What is a misleading advertisement? State one action a consumer can take against it.',
  model: 'A **misleading advertisement** **falsely describes** a product or service, gives a **false guarantee**, or **hides important information**, so that buyers are deceived. A consumer can **report it to the CCPA**, or seek relief, such as a **corrective advertisement**, from a consumer commission.',
  sol: 'Meaning plus one action.',
  scheme: [['Meaning', 1], ['Action', 1]],
}));
Q('s3_misleading_case', short({
  t: 4, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'The imagined health drink "TallMax" advertises a guaranteed two-inch gain in height in three months, with no proof. Explain (i) why the advertisement is misleading, (ii) what the CCPA can do, and (iii) what a buyer who was misled can do.',
  model: '(i) It gives a **false guarantee** about the drink\'s effect, which is likely to **deceive** buyers.\n(ii) The **CCPA** can order the maker to **stop or modify** the advertisement and impose a **penalty up to ₹10 lakh** (up to ₹50 lakh for a repeat).\n(iii) The buyer can **complain to the CCPA** or file a complaint before a **consumer commission** for a refund, compensation or a corrective advertisement.',
  sol: 'All three parts answered.',
  scheme: [['(i) Why misleading', 1], ['(ii) CCPA action', 1], ['(iii) Buyer\'s remedy', 1]],
}));
Q('s3_new_provisions', short({
  t: 4, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain three important provisions introduced by the Consumer Protection Act, 2019: the Central Consumer Protection Authority, product liability, and coverage of e-commerce.',
  model: '1. **Central Consumer Protection Authority:** a regulator that **protects consumers as a class**; it can investigate, **order recalls and refunds**, and act against **misleading advertisements**.\n2. **Product liability:** manufacturers, service providers and sellers can be made to **compensate for harm** caused by defective products or deficient services.\n3. **E-commerce:** buyers **online, by teleshopping, direct selling** or multi-level marketing are covered as consumers.',
  sol: 'Each provision explained.',
  scheme: [['CCPA', 1], ['Product liability', 1], ['E-commerce', 1]],
}));
Q('l_misleading', long({
  t: 4, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: '(a) State two ways in which an advertisement can be misleading under the Consumer Protection Act, 2019. [2]\n(b) Explain the powers of the Central Consumer Protection Authority to act against misleading advertisements, including the penalties it may impose. [3]',
  model: '(a) 1. It **falsely describes** a product or service, or gives a **false guarantee** about its quality, quantity or effect.\n2. It **deliberately hides important information**, such as charges or risks, so that buyers form a false impression.\n\n(b) The **CCPA** can **investigate** a complaint or act on its own. It can **direct the trader, manufacturer, endorser or publisher** to **discontinue or modify** the advertisement. It may impose a **penalty of up to ₹10 lakh** on a manufacturer or endorser, and **up to ₹50 lakh** for every subsequent contravention. It can also **bar an endorser** from endorsing products for a period, unless the endorser exercised **due diligence** in checking the claims.',
  sol: 'Two ways an advertisement misleads; CCPA powers with penalties.',
  scheme: [['(a) Two ways', 2], ['(b) Directions to stop or modify', 1], ['(b) Penalties stated correctly', 1], ['(b) Endorser liability', 1]],
}));

// ================================================================ t05 Consumer Protection Act, 1986 versus 2019
Q('m_1986_limit', mcq({
  t: 5, d: 2, c: 'recall',
  stem: 'Under the Consumer Protection Act, 1986, the District Forum could hear complaints where the value of goods or services and compensation claimed did not exceed',
  opts: ['₹20 lakh', '₹50 lakh', '₹1 crore', '₹2 crore'],
  sol: 'Under the 1986 Act the District Forum\'s limit was ₹20 lakh; the State Commission heard cases above ₹20 lakh and up to ₹1 crore; the National Commission, above ₹1 crore.',
}));
Q('m_1986_new', mcq({
  t: 5, d: 2, c: 'understanding',
  stem: 'Which of the following was introduced by the Consumer Protection Act, 2019 and did **not** exist under the 1986 Act?',
  opts: ['A Central Consumer Protection Authority', 'A three-tier redressal machinery', 'The right to safety', 'Consumer protection councils'],
  sol: 'The three tiers, consumer rights and protection councils existed under the 1986 Act; the CCPA is new in the 2019 Act.',
}));
Q('m_basis_change', mcq({
  t: 5, d: 3, c: 'analysis',
  stem: 'Under the 1986 Act, the forum for a complaint depended on the value of goods or services and the compensation claimed. Under the 2019 Act, it depends on',
  opts: ['the value of goods or services paid as consideration', 'the compensation claimed alone', 'the seller\'s annual turnover', 'the consumer\'s income'],
  sol: 'The 2019 Act uses the value paid as consideration, so a large compensation claim cannot by itself move a case to a higher commission.',
}));
Q('ar_1986', ar({
  t: 5, d: 3, c: 'analysis',
  a: 'The 2019 Act expressly covers goods and services bought online.',
  r: 'The 1986 Act set up District Forums, State Commissions and a National Commission.',
  key: 'b',
  sol: 'Both are true, but the structure set up by the 1986 Act does not explain why the 2019 Act covers online buying; that reflects the growth of e-commerce.',
}));
Q('tf_1986', tf({
  t: 5, d: 1, c: 'recall',
  stem: 'The 2019 Act renamed the District Forum of the 1986 Act as the District Commission.',
  ans: true,
  sol: 'True. Under the 2019 Act, all three tiers are called Consumer Disputes Redressal Commissions.',
}));
Q('s_1986', short({
  t: 5, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State two differences between the Consumer Protection Act, 1986 and the Consumer Protection Act, 2019.',
  model: '1. **Regulator:** the 1986 Act had **no central authority**; the 2019 Act set up the **Central Consumer Protection Authority**.\n2. **Coverage:** the 1986 Act did not expressly mention **online buying**; the 2019 Act covers **e-commerce, teleshopping, direct selling** and multi-level marketing.',
  sol: 'Any two valid differences (CCPA, e-commerce, product liability, limits, basis of limits, filing where consumer lives, e-filing, mediation, misleading ads).',
  scheme: [['First difference', 1], ['Second difference', 1]],
}));
Q('s3_1986', short({
  t: 5, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Compare the Consumer Protection Act, 1986 with the Consumer Protection Act, 2019 on these bases: (i) pecuniary limits of the lowest tier, (ii) basis for deciding jurisdiction, and (iii) where a complaint can be filed.',
  model: '(i) **Limits:** the District Forum could hear cases up to **₹20 lakh** (1986); the District Commission hears cases up to **₹50 lakh**, as notified in 2021.\n(ii) **Basis:** 1986 used the **value of goods and compensation claimed**; 2019 uses the **value paid as consideration**.\n(iii) **Place:** under 1986, generally where the **opposite party** was or the cause arose; 2019 also allows filing **where the consumer lives or works**.',
  sol: 'All three bases correctly compared.',
  scheme: [['(i) Limits', 1], ['(ii) Basis', 1], ['(iii) Place of filing', 1]],
}));
Q('l_compare', long({
  t: [5, 4], d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: '(a) Compare the Consumer Protection Act, 1986 with the Consumer Protection Act, 2019 on any four bases. [4]\n(b) In your view, which change in the 2019 Act helps an online shopper most? Give a reason. [1]',
  model: '(a) 1. **Regulator:** no central authority in 1986; the 2019 Act set up the **CCPA** to protect consumers as a class.\n2. **E-commerce:** online buying was not expressly covered in 1986; the 2019 Act covers **online, teleshopping, direct selling** and multi-level marketing.\n3. **Pecuniary limits and basis:** 1986 limits were **₹20 lakh and ₹1 crore**, based on value plus compensation claimed; as notified in 2021, the limits are **₹50 lakh and ₹2 crore**, based on **value paid**.\n4. **New remedies:** the 2019 Act added **product liability**, **mediation**, **e-filing** and **penalties on misleading advertisements**, including on endorsers.\n\n(b) **Filing where the consumer lives, along with e-filing**, helps most: an online shopper can complain **from home** even when the seller is in another state.',
  sol: 'Four bases correctly compared; a reasoned judgement.',
  scheme: [['(a) Four bases', 4], ['(b) Judgement with reason', 1]],
}));

// ================================================================ case-based
Q('cb_rights', caseQ({
  t: [2, 3], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the passage and answer the questions that follow. *(Imagined people, brand and figures, written by SOYL for practice.)*',
  passage: '**The Barua family, Nagaon (imagined)**\n\nMr Barua bought an imagined brand of inverter, "Powerjyoti", for ₹38,000 and kept the bill and warranty card. Within a month the inverter overheated and melted its plastic casing. The manual had given no warning about ventilation. The dealer refused to replace it and stopped taking his calls. Mr Barua then filed a complaint online.',
  parts: [
    child('a', mcq({ t: 2, d: 2, c: 'application', stem: 'The overheating inverter that melted its casing mainly violates the', opts: ['right to safety', 'right to choose', 'right to consumer awareness', 'right to be heard'], sol: 'A product that can cause fire or burns endangers life and property: the right to safety.' })),
    child('b', short({ t: 3, d: 2, c: 'application', marks: 1, stem: 'Before which commission should Mr Barua\'s complaint be filed, using the limits notified in 2021?', model: 'The **District Commission** (value paid ₹38,000, within ₹50 lakh).', sol: 'Value paid is far below ₹50 lakh: District Commission.', scheme: [['District Commission', 1]] })),
    child('c', short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Identify one more right violated, and one consumer responsibility Mr Barua fulfilled.', model: '**Right to be informed:** the manual gave **no ventilation warning**. **Responsibility:** he **kept the bill and warranty card** as proof.', sol: 'Right to information; keeping the bill.', scheme: [['Right', 1], ['Responsibility', 1]] }), [
      short({ t: 3, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Name two provisions of the 2019 Act that helped Mr Barua file his complaint easily.', model: '**E-filing** of complaints online, and filing in the commission **where he lives**.', sol: 'E-filing and residence-based filing.', scheme: [['First provision', 1], ['Second provision', 1]] }),
    ]),
  ],
}));
Q('cb_misleading', caseQ({
  t: [4, 5], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the passage and answer the questions that follow. *(Imagined firm, people and figures, written by SOYL for practice.)*',
  passage: '**"GlowPure" cream (imagined), Katni**\n\nThe makers of GlowPure, a skin cream, ran advertisements in which a well-known singer said the cream "removes all scars in seven days, guaranteed". The singer had never used the cream or asked for any proof. Many buyers saw no change. A consumer group sent the advertisement to the Central Consumer Protection Authority.',
  parts: [
    child('a', mcq({ t: 4, d: 2, c: 'application', stem: 'The advertisement is misleading mainly because it', opts: ['gives a false guarantee about the cream\'s effect', 'features a singer', 'is shown on television', 'mentions the price'], sol: 'A false guarantee about results is a misleading claim.' })),
    child('b', short({ t: 4, d: 2, c: 'application', marks: 1, stem: 'What is the highest penalty the CCPA may impose on the maker for this first contravention?', model: 'Up to **₹10 lakh**.', sol: 'Up to ₹10 lakh for a first contravention.', scheme: [['₹10 lakh', 1]] })),
    child('c', short({ t: 4, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Can the singer be penalised? Give a reason.', model: '**Yes.** An **endorser** of a misleading advertisement may be penalised; the singer did **no due diligence**, as she never checked any proof.', sol: 'Endorser liability; no due diligence.', scheme: [['Yes, as endorser', 1], ['No due diligence', 1]] }), [
      short({ t: 5, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): State two ways in which the 1986 Act would have given buyers weaker protection against this advertisement.', model: 'The 1986 Act had **no CCPA** to act for consumers as a class, and it had **no penalty on endorsers** of misleading advertisements.', sol: 'No CCPA; no endorser penalties.', scheme: [['No CCPA', 1], ['No endorser penalty', 1]] }),
    ]),
  ],
}));
