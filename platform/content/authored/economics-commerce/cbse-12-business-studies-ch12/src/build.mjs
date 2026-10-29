// Build CBSE 12 Business Studies ch12 Consumer Protection. Run from platform/:
//   npx tsx content/authored/economics-commerce/cbse-12-business-studies-ch12/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from './lib.mjs';

setUnit('cbse-12-business-studies-ch12', 'economics-commerce');
const { forum, inr, LAKH, CRORE } = await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- worked-example figures (computed)
// Deck 2 worked example: four imagined purchases; the forum follows the value paid.
const CASES = [
  { who: 'Asha, Indore: a scooter', qty: 1, price: 1.1 * LAKH },
  { who: 'The Bajwa family, Karnal: 2 air-conditioners', qty: 2, price: 1.35 * LAKH },
  { who: 'A housing society, Madurai: 3 lifts', qty: 3, price: 21 * LAKH },
  { who: 'Ramesh, Patna: a flat to live in', qty: 1, price: 240 * LAKH },
];
const CASE_ROWS = CASES.map((c) => {
  const total = c.qty * c.price;
  return { ...c, total, forum: forum(total) };
});
if (CASE_ROWS.map((r) => r.forum).join('|') !== 'District Commission|District Commission|State Commission|National Commission') throw new Error('forum example check failed');
if (CASE_ROWS[2].total !== 63 * LAKH || CASE_ROWS[3].total !== 240 * LAKH) throw new Error('forum totals check failed');

// ---------------------------------------------------------------- visuals
const vRoute1 = flow('LR', ['Why protect consumers?', 'Why business should care', 'Who is a consumer', 'Six rights', 'Responsibilities', 'Who can complain'], 'Route map of Part 1: why consumers need protection, why business should care, who is a consumer, the six rights, responsibilities, and who can complain', 'Part 1 at a glance');
const vRoute2 = flow('LR', ['Three commissions', 'Which commission?', 'Appeals', 'Filing a complaint', 'Reliefs', 'Consumer organisations'], 'Route map of Part 2: the three commissions, choosing the right commission, appeals, filing a complaint, reliefs, and consumer organisations', 'Part 2 at a glance');

const vConsumerSide = table(
  ['Reason', 'What it means', 'Imagined example'],
  [
    ['Consumer ignorance', 'Most buyers do not know their rights or where to complain', 'A buyer throws away a leaking cooker instead of seeking a replacement'],
    ['Unorganised consumers', 'Buyers act alone and have little bargaining power', 'One tenant cannot make a big builder repair a leaking roof'],
    ['Widespread exploitation', 'Adulteration, short weight, fake goods, false claims', 'Chilli powder mixed with brick dust; 900 g sold as 1 kg'],
  ],
  'Table of three reasons from the consumer side: consumer ignorance, unorganised consumers and widespread exploitation, each with an imagined example',
);
const vBusinessSide = flow('TB', ['Long-term interest: happy buyers return', 'Uses society\'s resources: owes society fair goods', 'Social responsibility towards consumers', 'Moral justification: honesty is a duty', 'Avoids government intervention and bad name'], 'Five reasons from the business side: long-term interest, use of society\'s resources, social responsibility, moral justification, and avoiding government intervention', 'Why business itself should protect consumers');
const vWhoConsumer = table(
  ['Buys or hires…', 'Purpose', 'Consumer?'],
  [
    ['Goods or services for a payment (paid, promised or in instalments)', 'Own use, including the family', 'Yes'],
    ['Goods to earn a living by self-employment', 'Livelihood, not commerce', 'Yes'],
    ['Goods or services online, by teleshopping or direct selling', 'Own use', 'Yes'],
    ['Goods to resell', 'Trade', 'No'],
    ['Goods for a commercial purpose (large-scale production for profit)', 'Business', 'No'],
  ],
  'Table on who is a consumer under the 2019 Act: buying or hiring for payment for own use, for self-employment and online all count; buying for resale or a commercial purpose does not',
  'The test is the purpose of purchase and payment of consideration.',
);
const vConsumerEx = table(
  ['Imagined buyer', 'Purpose', 'Verdict', 'Reason'],
  [
    ['Gita buys a washing machine for home', 'Own use', 'Consumer', 'Paid for, used by the family'],
    ['A dealer buys 30 washing machines', 'Resale', 'Not a consumer', 'Bought to sell'],
    ['Imran buys an auto-rickshaw to drive himself', 'Self-employment', 'Consumer', 'Earns his own living'],
    ['Gita\'s mother uses the machine', 'Own use with approval', 'Consumer', 'User with the buyer\'s approval'],
  ],
  'Worked example table: a home buyer, a person buying an auto-rickshaw to drive himself, and a user with the buyer\'s approval are consumers; a dealer buying 30 machines to sell is not',
  'Imagined buyers. Ask: was it paid for, and why was it bought?',
);

const vRights = (() => {
  const s = new Svg(560, 300);
  const rights = [
    ['Safety', 'from hazardous goods'],
    ['Be informed', 'quality, price, dates'],
    ['Choose', 'variety, fair prices'],
    ['Be heard', 'complaints considered'],
    ['Seek redressal', 'relief for loss'],
    ['Consumer education', 'know rights, remedies'],
  ];
  const w = 160, h = 92, gx = 20, gy = 26, x0 = 30, y0 = 40;
  s.text(280, 18, 'Six rights of consumers', { bold: true, size: 15 });
  rights.forEach(([title, sub], i) => {
    const col = i % 3, row = Math.floor(i / 3);
    const x = x0 + col * (w + gx), y = y0 + row * (h + gy);
    s.rect(x, y, w, h, { fill: 'accent', fillOpacity: 0.14, color: 'accent', sw: 2, rx: 10 });
    s.text(x + w / 2, y + 36, `${i + 1}. ${title}`, { bold: true, size: 13 });
    s.text(x + w / 2, y + 62, sub, { size: 12, muted: true });
  });
  return s.visual('Six boxes showing the rights of consumers: safety from hazardous goods; to be informed about quality, price and dates; to choose among a variety at fair prices; to be heard; to seek redressal for loss; and consumer education about rights and remedies', 'The six consumer rights.');
})();
const vRights13 = table(
  ['Right', 'Meaning', 'Imagined violation'],
  [
    ['Safety', 'Protection against goods and services dangerous to life, health or property', 'A heater without a cut-off switch catches fire'],
    ['Be informed', 'Full details of quality, quantity, purity, price, dates and use', 'A cream with no list of ingredients'],
    ['Choose', 'Access to a variety of goods at competitive prices', 'A dealer forces buyers to take his own brand of accessories'],
  ],
  'Table of the first three rights: safety, to be informed and to choose, with meaning and an imagined violation of each',
);
const vRights46 = table(
  ['Right', 'Meaning', 'Imagined violation'],
  [
    ['Be heard', 'Complaints and views must be given due consideration', 'A call centre closes complaints without reply'],
    ['Seek redressal', 'Relief against unfair practices, such as repair, replacement or compensation', 'A shop refuses to replace a phone that died in a week'],
    ['Consumer education', 'Learning about rights, products and remedies throughout life', 'A village has never heard of consumer commissions'],
  ],
  'Table of the last three rights: to be heard, to seek redressal and consumer education, with meaning and an imagined violation of each',
);
const vSpotRight = table(
  ['Clue in the case', 'Right involved', 'Key words to look for'],
  [
    ['Injury, fire, shock, poisoning', 'Safety', 'hazard, burst, unsafe'],
    ['No label, hidden charges, missing dates', 'Be informed', 'no details, confidential'],
    ['Tied purchase, no other brand allowed', 'Choose', 'must buy only from'],
    ['Complaint ignored or closed', 'Be heard', 'no reply, closed'],
    ['Refusal to repair, replace or refund', 'Seek redressal', 'refused relief'],
  ],
  'Worked example table on spotting the right in a case: injury points to safety, missing labels to information, tied purchase to choice, ignored complaints to being heard, refused relief to redressal',
  'Read the clue, then name the right and quote the words.',
);
const vResp = table(
  ['Responsibility', 'In practice'],
  [
    ['Know the market', 'Compare quality, price, service before buying'],
    ['Buy standardised goods', 'Look for certification marks'],
    ['Learn the risks', 'Read instructions and safety warnings'],
    ['Read labels', 'Check price, net weight, dates, ingredients'],
    ['Ask for a bill', 'Keep the cash memo and warranty as proof'],
    ['Complain, honestly', 'File genuine complaints; avoid false claims'],
    ['Form consumer groups', 'Join or support consumer societies'],
    ['Respect the environment', 'Avoid waste, littering and pollution'],
  ],
  'Table of eight responsibilities of consumers: know the market, buy standardised goods, learn the risks, read labels, ask for a bill, complain honestly, form consumer groups and respect the environment',
);
const vMarks = table(
  ['Mark or number', 'Found on', 'What it tells you'],
  [
    ['ISI mark', 'Electrical and industrial goods (irons, cables, cookers)', 'Meets Bureau of Indian Standards norms'],
    ['Agmark', 'Agricultural produce (pulses, spices, honey)', 'Graded for quality'],
    ['Hallmark', 'Gold and silver jewellery', 'Purity of the precious metal'],
    ['FSSAI licence number', 'Packaged food', 'Maker is licensed by the food safety regulator'],
  ],
  'Table of quality marks: the ISI mark on electrical and industrial goods, Agmark on agricultural produce, Hallmark on gold and silver jewellery, and the FSSAI licence number on packaged food',
);
const vWhoFile = flow('TB', ['A consumer', 'A registered voluntary consumer association', 'The Central Government or a State Government', 'One or more consumers for many with the same interest', 'Legal heir or representative of a deceased consumer'], 'List of who can file a complaint: a consumer, a registered consumer association, the Central or a State Government, one or more consumers on behalf of many with the same interest, and the legal heir or representative of a deceased consumer', 'Who can file a complaint (2019 Act)');
const vSummary1 = table(
  ['Idea', 'Remember'],
  [
    ['Why protect consumers', 'Ignorance, unorganised buyers, exploitation'],
    ['Why business should care', 'Long-term interest, society\'s resources, social responsibility, ethics, avoid intervention'],
    ['Consumer', 'Buys or hires for payment; not for resale or commercial purpose; online included'],
    ['Six rights', 'Safety, information, choice, be heard, redressal, education'],
    ['Responsibilities', 'Standard marks, labels, bill, honest complaints, environment'],
  ],
  'Summary table of Part 1: reasons for consumer protection from both sides, the meaning of consumer, six rights and main responsibilities',
);
const vTips1 = flow('LR', ['Quote the words', 'Name the right or responsibility', 'Explain in one line'], 'Three steps for case answers: quote the words, name the right or responsibility, explain in one line', 'Case routine');

const vTiers = (() => {
  const s = new Svg(560, 330);
  const tiers = [
    ['National Commission', 'value paid above ₹2 crore', 40],
    ['State Commission', 'above ₹50 lakh, up to ₹2 crore', 140],
    ['District Commission', 'value paid up to ₹50 lakh', 240],
  ];
  const widths = [260, 340, 420];
  tiers.forEach(([name, lim, y], i) => {
    const w = widths[i], x = 230 - w / 2 + 50;
    s.rect(x, y, w, 64, { fill: i === 2 ? 'accent' : 'fill', fillOpacity: i === 2 ? 0.16 : undefined, color: i === 2 ? 'accent' : 'muted', sw: 2, rx: 10 });
    s.text(x + w / 2, y + 22, name, { bold: true, size: 15 });
    s.text(x + w / 2, y + 44, lim, { size: 13 });
  });
  s.arrow(500, 238, 500, 152, { sw: 1.8, color: 'muted' });
  s.arrow(500, 138, 500, 52, { sw: 1.8, color: 'muted' });
  s.text(512, 196, 'appeal', { anchor: 'start', size: 12, muted: true });
  s.text(512, 96, 'appeal', { anchor: 'start', size: 12, muted: true });
  s.text(280, 18, 'Supreme Court above: final appeal', { size: 13, muted: true });
  return s.visual('Three stacked tiers of consumer commissions: District Commission at the base for value paid up to 50 lakh rupees, State Commission above 50 lakh and up to 2 crore, National Commission above 2 crore; appeals go upward, with the Supreme Court as the final appeal', 'Limits as revised in 2021; the value paid decides the commission.');
})();
const vBasis = table(
  ['Value of goods or services paid', 'Commission'],
  [
    ['Up to ₹50 lakh', 'District Commission'],
    ['Above ₹50 lakh and up to ₹2 crore', 'State Commission'],
    ['Above ₹2 crore', 'National Commission'],
  ],
  'Table of pecuniary limits: up to 50 lakh rupees, District Commission; above 50 lakh up to 2 crore, State Commission; above 2 crore, National Commission',
  'Not the compensation claimed: the value paid.',
);
const vForumEx = table(
  ['Imagined complainant: purchase', 'Units × price', 'Value paid', 'Commission'],
  CASE_ROWS.map((r) => [r.who, `${r.qty} × ${inr(r.price)}`, inr(r.total), r.forum]),
  `Worked example table: a scooter of ${inr(CASES[0].price)} and two air-conditioners worth ${inr(CASE_ROWS[1].total)} go to the District Commission; three lifts for a housing society worth ${inr(CASE_ROWS[2].total)} go to the State Commission; a flat bought to live in for ${inr(CASE_ROWS[3].total)} goes to the National Commission`,
  'Imagined figures. Multiply, then compare with the limits.',
);
const vAppeal = flow('LR', ['District Commission order', 'State Commission (appeal within 45 days)', 'National Commission (appeal within 30 days)', 'Supreme Court (appeal within 30 days)'], 'Flow of appeals: from a District Commission order to the State Commission within 45 days, then to the National Commission within 30 days, then to the Supreme Court within 30 days', 'Route of appeal');
const vFiling = flow('TB', ['Keep the bill and details of the defect', 'File the complaint (in person or online)', 'Commission sends notice to the seller', 'Both sides give evidence; mediation if both agree', 'Order granting relief, or dismissal', 'Appeal if not satisfied'], 'Flow of a complaint: keep the bill, file in person or online, the commission sends notice to the seller, both sides give evidence or try mediation, the commission passes an order, and an appeal is possible', 'How a complaint moves');
const vReliefs = table(
  ['Relief', 'When it fits'],
  [
    ['Remove defect / deficiency', 'Fault can be repaired; service was poor'],
    ['Replace the product', 'Defect cannot be fixed'],
    ['Refund the price', 'Consumer no longer wants the product'],
    ['Compensation', 'Loss or injury caused by negligence'],
    ['Punitive damages', 'Serious negligence, many consumers hurt'],
    ['Stop the unfair practice', 'Practice continues to harm buyers'],
    ['Withdraw hazardous goods', 'Product is dangerous to life'],
    ['Corrective advertisement', 'A misleading advertisement fooled the public'],
  ],
  'Table of reliefs a commission can order and when each fits: removing defects, replacement, refund, compensation, punitive damages, stopping an unfair practice, withdrawing hazardous goods and a corrective advertisement',
);
const vReliefEx = table(
  ['Imagined finding', 'Best relief', 'Why'],
  [
    ['Laptop keyboard faulty, repairable', 'Remove the defect', 'Simple repair restores it'],
    ['Cooler failed after four repairs', 'Replace or refund', 'The defect keeps returning'],
    ['Wrong blood report led to a needless operation', 'Compensation (and punitive damages)', 'Serious loss from negligence'],
    ['Soap ad claimed to cure skin disease', 'Corrective advertisement', 'Public was misled'],
  ],
  'Worked example table matching findings to reliefs: a repairable fault to removing the defect, a repeatedly failing cooler to replacement or refund, a wrong report causing harm to compensation, a false soap advertisement to a corrective advertisement',
);
const vNgo = table(
  ['Role of consumer organisations', 'Imagined example'],
  [
    ['Educating consumers', 'Weekend camps on reading labels'],
    ['Collecting and spreading information', 'Monthly newsletter on product recalls'],
    ['Testing products', 'Lab tests of five brands of ghee, results published'],
    ['Encouraging protest', 'Residents protest against short-weight cylinders'],
    ['Legal help and filing complaints', 'Volunteer lawyer helps a widow file a case'],
    ['Representing consumers', 'Seats on government consumer councils'],
  ],
  'Table of six roles of consumer organisations with imagined examples: education, information, product testing, protest, legal help and filing complaints, and representation on government bodies',
);
const vNgoFlow = flow('LR', ['Spot the problem (tests, complaints)', 'Inform and educate consumers', 'Protest and press sellers', 'Take the case to a commission'], 'Flow of how a consumer organisation works: spots a problem through tests and complaints, informs and educates consumers, protests and presses sellers, and takes the case to a commission', 'From problem to relief');
const vSummary2 = table(
  ['Idea', 'Remember'],
  [
    ['Three commissions', 'District up to ₹50 lakh; State to ₹2 crore; National above'],
    ['Basis', 'Value of goods or services paid, not compensation claimed'],
    ['Appeals', 'District → State → National → Supreme Court'],
    ['Reliefs', 'Repair, replace, refund, compensation, punitive damages, stop practice, corrective ad'],
    ['Consumer organisations', 'Educate, inform, test, protest, legal help, file complaints'],
  ],
  'Summary table of Part 2: three commissions and their limits, the value-paid basis, the chain of appeals, the reliefs and the roles of consumer organisations',
);
const vTips2 = flow('LR', ['Add up the value paid', 'Compare with ₹50 lakh and ₹2 crore', 'Name the commission and the relief'], 'Three steps for forum questions: add up the value paid, compare with 50 lakh and 2 crore, name the commission and the relief', 'Forum routine');

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Consumer Protection — Part 1: Why It Matters, Consumers, Rights and Responsibilities',
  goals: [
    'Explain the importance of consumer protection from the point of view of consumers and of business',
    'Decide who is a consumer under the Consumer Protection Act 2019',
    'Identify the six consumer rights in business situations',
    'Explain the responsibilities of consumers and who can file a complaint',
  ],
  slides: [
    sl('title', 'Consumer Protection', {
      b: 'Part 1: why consumers need protection, why business should care, **who is a consumer**, the **six rights**, **responsibilities**, and **who can complain**.',
      v: vRoute1,
      n: 'Every one of us is a consumer, from the morning milk packet to the phone recharge at night. Usually things go well. But what if the milk is adulterated, or the phone dies in a week and the shop refuses to help? In this chapter we learn why consumers need protection, what rights the law gives them, and how they can get relief.',
    }),
    sl('concept', 'Why consumers need protection', {
      b: 'From the **consumer\'s** side there are three reasons.',
      v: vConsumerSide,
      n: 'Why should consumers be protected at all? First, many buyers simply do not know their rights or where to complain. Second, consumers are scattered and act alone, so a single buyer cannot stand up to a big seller. Third, exploitation is common: adulteration, short weight, fake goods and false claims. The law tries to balance this unequal relationship.',
    }),
    sl('diagram', 'Why business itself should care', {
      v: vBusinessSide,
      n: 'Consumer protection is not only the government\'s job. Business gains too. Happy customers come back, so it is in the firm\'s long-term interest. Business uses resources that belong to society, so it owes society fair goods. Caring for consumers is part of social responsibility and simple ethics. And firms that cheat buyers invite government action and a bad name.',
    }),
    sl('check', 'Quick check: moral duty or only law?', {
      b: 'Is fair dealing with consumers only a legal duty of business?',
      chk: 'tf_moral',
      n: 'Think about whether a business should be honest only because a law says so, or for another reason as well.',
    }),
    sl('concept', 'Who is a consumer under the 2019 Act?', {
      b: 'The **Consumer Protection Act 2019** protects anyone who **buys goods** or **hires services** for a **consideration**, but **not for resale or a commercial purpose**.',
      v: vWhoConsumer,
      n: 'The Consumer Protection Act of 2019 replaced the older law of 1986. It protects a person who buys goods or hires services in return for payment, whether paid now, promised, or paid in parts. A user with the buyer\'s approval is also covered. But a person who buys to resell, or for a commercial purpose, is not a consumer. Buying online is fully covered.',
    }),
    sl('example', 'Worked example 1: consumer or not?', {
      b: 'Decide for each imagined buyer.',
      bl: ['Step 1: Was a payment made or promised?', 'Step 2: Why was it bought: own use, livelihood, resale or commerce?', 'Step 3: Resale or commerce means **not a consumer**; own use or self-employment means **consumer**.'],
      v: vConsumerEx,
      n: 'Let us test four imagined buyers. Gita buys a washing machine for her home: a consumer. A dealer buys thirty machines to sell: not a consumer, because he bought for resale. Imran buys an auto-rickshaw to drive himself and earn a living: still a consumer, because self-employment is not treated as commercial. And Gita\'s mother, who uses the machine with Gita\'s approval, is also a consumer.',
    }),
    sl('check', 'Quick check: an online course', {
      b: 'Is a student who pays for an online course a consumer?',
      chk: 'tf_online_consumer',
      n: 'Remember two things: services count as well as goods, and buying online is covered by the new law.',
    }),
    sl('diagram', 'The six rights of consumers', {
      v: vRights,
      n: 'The law gives consumers six rights. The right to safety, the right to be informed, the right to choose, the right to be heard, the right to seek redressal, and the right to consumer education. An easy way to remember them is to think of a shopping trip: stay safe, know the facts, pick freely, speak up, get relief, and keep learning.',
    }),
    sl('two-column', 'Rights one to three', {
      cols: ['**Safety:** protection from hazardous goods and services.\n\n**Be informed:** complete facts on the label and from the seller.', '**Choose:** a variety of goods at competitive prices, with no forced bundles.'],
      v: vRights13,
      n: 'The right to safety protects us from dangerous goods, like a heater without a cut-off switch. The right to be informed means we must get complete facts about quality, quantity, purity, price and dates. The right to choose means we should find a variety of goods at fair prices, and no seller can force us to buy only his brand.',
    }),
    sl('concept', 'Rights four to six', {
      b: 'The last three rights help consumers **speak up**, **get relief** and **keep learning**.',
      v: vRights46,
      n: 'The right to be heard means our complaints must be taken seriously, by the firm and by the consumer commissions. The right to seek redressal means we can get relief, such as repair, replacement, refund or compensation. And the right to consumer education means we should learn about our rights and remedies all our lives, through schools, media and consumer groups.',
    }),
    sl('example', 'Worked example 2: which right was violated?', {
      b: 'In a case, find the clue and match it to a right.',
      bl: ['Injury or danger: **safety**.', 'Missing facts: **information**.', 'Forced brand: **choice**.', 'Ignored complaint: **be heard**.', 'Refused repair or refund: **redressal**.'],
      v: vSpotRight,
      n: 'Case questions often ask which right was violated. Look for the clue. If someone is hurt or in danger, think of safety. If facts are missing from the label, think of information. If a seller forces his own brand, think of choice. If complaints are ignored, think of the right to be heard. If repair or refund is refused, it is redressal.',
    }),
    sl('check', 'Quick check: match the complaint to the right', {
      b: 'Match each complaint from a helpdesk log with the right involved.',
      chk: 'mt_rights',
      n: 'Use the clue method from the last slide: danger, missing facts, forced brand, or an ignored complaint.',
    }),
    sl('concept', 'Responsibilities of consumers', {
      b: 'Rights come with **responsibilities**. An alert consumer protects herself first.',
      v: vResp,
      n: 'A careful consumer also has duties. Compare products before buying. Prefer standardised goods. Read the instructions and the label for price, weight and dates. Always ask for a bill and keep the warranty card. Complain when there is a real problem, but never make false claims. Support consumer groups, and do not waste resources or pollute the environment.',
    }),
    sl('diagram', 'Quality marks to look for', {
      v: vMarks,
      n: 'Buying standardised goods is easier when you know the marks. The ISI mark appears on electrical and industrial goods such as irons and cables. Agmark is used for graded farm produce like pulses, spices and honey. Hallmark tells you the purity of gold and silver jewellery. On packaged food, look for the licence number given by the food safety regulator.',
    }),
    sl('check', 'Quick check: buying a gold chain', {
      b: 'Which mark should you look for on a gold chain?',
      chk: 'm_hallmark',
      n: 'Each mark belongs to one kind of product. Which one is meant for jewellery?',
    }),
    sl('diagram', 'Who can file a complaint?', {
      v: vWhoFile,
      n: 'Who can take a complaint to a consumer commission? The consumer, of course. Also a registered voluntary consumer association, the Central Government or a State Government, and one or more consumers acting for many who share the same problem. If the consumer has died, the legal heir or representative can file. A rival business trying to settle scores is not on this list.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'Let us sum up. Consumers need protection because of ignorance, weak bargaining power and exploitation, and business gains from protecting them. A consumer buys goods or hires services for payment, not for resale or commerce, and online purchases count. There are six rights, from safety to education, and consumers have responsibilities too. Several parties, including associations and governments, can file complaints.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['In cases, **quote the words**, then name the right or responsibility.', 'Self-employment use is **not** commercial: the buyer is still a consumer.', 'Do not mix up the two sides of importance: **consumer view** and **business view**.', 'Learn the six rights in order: safety, information, choice, heard, redressal, education.'],
      v: vTips1,
      n: 'Some tips for the exam. In case questions, quote the exact words first, then name the right or responsibility and explain it in a line. Remember that buying for self-employment does not make you a trader. When asked about importance, check whether the question wants the consumer\'s view or the business view. And learn the six rights in a fixed order.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Consumer Protection — Part 2: Redressal Machinery, Reliefs and Consumer Organisations',
  goals: [
    'Describe the three-tier redressal machinery and choose the right commission by the value paid',
    'Trace the route of appeal up to the Supreme Court',
    'Match reliefs to the findings of a commission',
    'Explain the role of consumer organisations and NGOs',
  ],
  slides: [
    sl('title', 'Consumer Protection: getting relief', {
      b: 'Part 2: the **three commissions**, choosing the right one, **appeals**, **reliefs**, and **consumer organisations**.',
      v: vRoute2,
      n: 'Knowing your rights is the first step. The second is knowing where to go when a right is violated. In this part we study the consumer commissions at three levels, how to choose the right one, how appeals work, what relief a commission can give, and how consumer organisations help ordinary people get justice.',
    }),
    sl('diagram', 'Three tiers of consumer commissions', {
      v: vTiers,
      n: 'The Act sets up quasi-judicial commissions at three levels. The District Commission is at the base, the State Commission in the middle and the National Commission at the top. Each hears complaints up to a certain value, and each higher tier also hears appeals from the one below. Above them all, the Supreme Court is the final court of appeal.',
    }),
    sl('concept', 'Which commission? The value paid decides', {
      b: 'Under the 2019 Act, the forum depends on the **value of goods or services paid as consideration**.',
      v: vBasis,
      n: 'How do you know where to file? Look at how much was paid for the goods or services. Up to fifty lakh rupees, go to the District Commission. Above fifty lakh and up to two crore, go to the State Commission. Above two crore, go to the National Commission. The compensation you claim does not decide the forum; the value paid does.',
    }),
    sl('example', 'Worked example 1: choosing the commission', {
      b: 'Four imagined complainants. Find the value paid and the commission.',
      bl: ['Step 1: Multiply units by price to get the value paid.', 'Step 2: Compare with ₹50 lakh and ₹2 crore.', 'Step 3: Name the commission.'],
      v: vForumEx,
      n: 'Try four imagined cases. Asha\'s scooter is far below fifty lakh, so District. Two air-conditioners for the Bajwa family also stay well below fifty lakh, so District again. Three lifts for a housing society at twenty-one lakh each add up to sixty-three lakh, above fifty lakh but below two crore, so State. Ramesh paid two crore forty lakh for a flat to live in, above two crore, so National.',
    }),
    sl('check', 'Quick check: a tractor complaint', {
      b: 'Where should Harpreet file her complaint about a tractor?',
      chk: 'm_tractor_forum',
      n: 'Compare the value paid for the tractor with the first limit of fifty lakh rupees.',
    }),
    sl('diagram', 'The route of appeal', {
      v: vAppeal,
      n: 'If a party is unhappy with an order, it can appeal one step up. From the District Commission, the appeal goes to the State Commission within forty-five days. From the State Commission, it goes to the National Commission within thirty days. And from the National Commission, the final appeal lies with the Supreme Court, again within thirty days.',
    }),
    sl('check', 'Quick check: arrange the appeals', {
      b: 'Put the bodies in the order a case climbs through them.',
      chk: 'ord_appeal',
      n: 'Start where a small complaint is filed, and climb one step at a time to the highest court.',
    }),
    sl('diagram', 'How a complaint moves', {
      v: vFiling,
      n: 'Here is how a complaint moves. Keep your bill and note the defect. File the complaint in person or online, without needing a lawyer. The commission sends a notice to the seller. Both sides present their evidence, and the case can go to mediation if both agree. The commission then passes an order, and either side may appeal if not satisfied.',
    }),
    sl('concept', 'Reliefs a commission can order', {
      b: 'If the complaint is proved, the commission can order one or more **reliefs**.',
      v: vReliefs,
      n: 'What can a commission order? It can direct the seller to remove a defect or a deficiency in service, replace the product, or refund the price. It can award compensation for loss or injury, and even punitive damages for serious negligence. It can stop an unfair practice, withdraw hazardous goods from sale, and order a corrective advertisement to undo a misleading one.',
    }),
    sl('example', 'Worked example 2: matching relief to the finding', {
      b: 'Pick the relief that best fits each imagined finding.',
      bl: ['Repairable fault: **remove the defect**.', 'Repeated failure: **replace or refund**.', 'Serious harm from negligence: **compensation**, perhaps **punitive damages**.', 'Misleading claim to the public: **corrective advertisement**.'],
      v: vReliefEx,
      n: 'Let us match reliefs. A faulty but repairable keyboard needs only the defect removed. A cooler that fails after four repairs should be replaced or refunded. A wrong blood report that led to a needless operation calls for compensation, and perhaps punitive damages. And a soap advertisement that falsely promised to cure skin disease needs a corrective advertisement to inform the public.',
    }),
    sl('check', 'Quick check: match the reliefs', {
      b: 'Match each finding of a commission with the most suitable relief.',
      chk: 'mt_remedies',
      n: 'Ask what would put the consumer, or the public, back in the right position.',
    }),
    sl('concept', 'Consumer organisations and NGOs', {
      b: 'Voluntary groups make the law work for ordinary consumers.',
      v: vNgo,
      n: 'Consumer organisations and NGOs do a lot of the groundwork. They educate people through camps and campaigns, and publish information in newsletters. They test competing brands in laboratories and publish the results. They organise protests against exploitation, give legal help, and file complaints for consumers. Some also represent consumers on government bodies that shape consumer policy.',
    }),
    sl('diagram', 'How an organisation turns a problem into relief', {
      v: vNgoFlow,
      n: 'Here is the usual path. A group spots a problem, through laboratory tests or complaints from members. It informs and educates consumers about it. It protests and puts pressure on the sellers. And if that fails, it takes the case to a consumer commission, as a registered association is allowed to do.',
    }),
    sl('check', 'Quick check: what is this NGO doing?', {
      b: 'An NGO helps a worker draft her complaint and sends a lawyer with her. Which role is this?',
      chk: 'm_ngo_legal',
      n: 'Think about which role helps a consumer pursue a case at a commission.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up Part 2. There are three commissions: District up to fifty lakh rupees, State up to two crore, and National above that, decided by the value paid. Appeals climb one step at a time up to the Supreme Court. Commissions can order repair, replacement, refund, compensation, punitive damages and corrective advertisements. Consumer organisations educate, test, protest and help consumers file complaints.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['Always add up the **value paid** before naming the commission.', 'The **compensation claimed** never decides the forum.', 'Write appeals with the next body: District → State → National → Supreme Court.', 'For reliefs, match the relief to the **harm** in the case.'],
      v: vTips2,
      n: 'Final tips. Before naming a commission, add up the total value paid and compare it with fifty lakh and two crore. Do not be misled by a large compensation claim. In appeal questions, name the next body up the ladder. And when asked for a relief, choose the one that matches the harm described in the case.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Consumer Protection — notes',
  sections: [
    {
      h: '1. Importance of consumer protection',
      t: 1,
      b: '**From the consumer\'s side**\n- **Ignorance:** many buyers are unaware of their rights and of the relief open to them.\n- **Unorganised consumers:** buyers act alone and in small amounts, so they have little bargaining strength.\n- **Widespread exploitation:** adulteration, short weight, duplicate goods, misleading claims, overcharging.\n\n**From the business side**\n- **Long-term interest:** satisfied buyers return and spread goodwill.\n- **Society\'s resources:** firms use resources of society and so owe it safe, fair goods.\n- **Social responsibility** towards consumers as an interest group.\n- **Moral justification:** honest trade is an ethical duty.\n- **Government intervention:** exploitation invites penalties and controls.',
      terms: [['Consumer protection', 'Measures that safeguard buyers against unfair trade practices and help them get relief.'], ['Exploitation', 'Unfair practices such as adulteration, short weight and false claims.']],
      v: vConsumerSide,
      vs: [vBusinessSide],
    },
    {
      h: '2. Who is a consumer (Consumer Protection Act 2019)',
      t: 2,
      b: 'The 2019 Act replaced the Consumer Protection Act 1986 and came into force in 2020. A **consumer** is a person who:\n1. **buys goods** for a consideration (paid, promised, partly paid or under deferred payment), including any user of the goods with the buyer\'s approval; or\n2. **hires or avails of services** for a consideration, including any beneficiary with approval.\n\n**Excluded:** a person who obtains goods **for resale** or for a **commercial purpose**. Using goods to earn one\'s livelihood by **self-employment** is not commercial. Purchases made **online**, by teleshopping, direct selling or multi-level marketing are covered. The Act also set up a **Central Consumer Protection Authority** to act against unfair trade practices that harm consumers as a class.',
      terms: [['Consideration', 'Payment made or promised for goods or services.'], ['Commercial purpose', 'Use of goods in a business for profit, which takes the buyer outside the meaning of consumer.']],
      v: vWhoConsumer,
    },
    {
      h: '3. Rights and responsibilities of consumers',
      t: 2,
      b: '**Six rights:** (1) **safety** against hazardous goods and services; (2) **to be informed** about quality, quantity, purity, standard and price; (3) **to choose** from a variety at competitive prices; (4) **to be heard** in appropriate forums; (5) **to seek redressal** against unfair or restrictive practices; (6) **consumer education**.\n\n**Responsibilities:** know the market; buy standardised goods (ISI, Agmark, Hallmark; food licence number on packaged food); learn the risks and read instructions; read labels (price, net weight, dates); insist on a bill and keep the warranty; assert yourself and complain only genuinely; form or support consumer societies; avoid waste and pollution.',
      terms: [['Right to seek redressal', 'The right to obtain relief, such as repair, replacement or compensation, against unfair practices.'], ['Standardised goods', 'Goods certified to meet quality standards, shown by marks such as ISI or Agmark.']],
      v: vRights,
      vs: [vResp, vMarks],
    },
    {
      h: '4. Who can file a complaint',
      t: 2,
      b: 'Under the 2019 Act a complaint can be filed by:\n- a **consumer**;\n- a **voluntary consumer association** registered under any law;\n- the **Central Government**, the Central Consumer Protection Authority or a **State Government**;\n- **one or more consumers** on behalf of numerous consumers having the same interest;\n- the **legal heir or legal representative** of a consumer who has died (and the parent or guardian of a minor consumer).\n\nComplaints can be filed in person or **online**, and the complainant may argue the case without a lawyer.',
      terms: [['Complainant', 'A person or body entitled by the Act to file a consumer complaint.']],
      v: vWhoFile,
    },
    {
      h: '5. Redressal machinery and reliefs',
      t: 3,
      b: '**Three-tier, quasi-judicial machinery.** Jurisdiction depends on the **value of goods or services paid as consideration** (limits as revised by the 2021 jurisdiction rules):\n- **District Commission:** up to ₹50 lakh.\n- **State Commission:** above ₹50 lakh and up to ₹2 crore; also appeals from District Commissions.\n- **National Commission:** above ₹2 crore; also appeals from State Commissions.\n\n**Appeals:** District → State (45 days) → National (30 days) → **Supreme Court** (30 days). Cases may be referred to **mediation** if both parties agree.\n\n**Reliefs:** removing defects or deficiency; replacing goods; returning the price; compensation for loss or injury; punitive damages in suitable cases; discontinuing unfair or restrictive practices; withdrawing hazardous goods from sale and ceasing to make them; issuing a corrective advertisement; paying adequate costs.',
      terms: [['Pecuniary jurisdiction', 'The money limit within which a commission can hear complaints.'], ['Punitive damages', 'Extra damages ordered to punish serious wrongdoing and deter others.'], ['Corrective advertisement', 'An advertisement ordered to undo the effect of a misleading one.']],
      v: vTiers,
      vs: [vBasis, vAppeal, vReliefs],
    },
    {
      h: '6. Role of consumer organisations and NGOs',
      t: 4,
      b: 'Consumer organisations and NGOs:\n1. **Educate** the public about rights and responsibilities through camps, workshops and campaigns.\n2. **Collect and disseminate information** through journals, newsletters and reports.\n3. **Test products** in laboratories and publish comparative results.\n4. **Encourage protest** and action against exploitation and unfair practices.\n5. Give **legal assistance** and **file complaints** in commissions on behalf of consumers.\n6. **Represent consumers** on government bodies that frame consumer policy, and push for safer products.\n\nNational Consumer Day is observed in India on 24 December and World Consumer Rights Day on 15 March.',
      terms: [['Consumer association', 'A voluntary body that works to protect consumers; if registered, it can file complaints.']],
      v: vNgo,
      vs: [vNgoFlow],
    },
  ],
  tips: '**Common mistakes**\n- Naming the forum from the **compensation claimed** instead of the value paid.\n- Calling a self-employed buyer (a tailor buying one sewing machine) a trader.\n- Writing "right to protest" or "right to compensation" as separate rights: the six rights are safety, information, choice, being heard, redressal and education.\n- Sending an appeal two steps up: it goes only to the **next** commission.\n- Confusing **Agmark** (farm produce) with **Hallmark** (jewellery).\n\n**How marks are usually awarded**\n- 1 mark: the correct option, or a line quoted from the case.\n- 2–3 marks: name each point and explain it in a line; in cases, quote the words.\n- 5 marks: five named points with explanation (about 120 words).\n- Forum questions: show the value paid, compare with the limits, then name the commission.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['Three reasons for consumer protection from the **consumer\'s** side', 'Ignorance, unorganised consumers, widespread exploitation.', 'concept', 1],
  ['Five reasons from the **business** side', 'Long-term interest, society\'s resources, social responsibility, moral justification, government intervention.', 'concept', 1],
  ['"Happy buyers come back" is which business reason?', '**Long-term interest** of business.', 'example', 1],
  ['Who is a **consumer** under the 2019 Act?', 'One who buys goods or hires services for a consideration, not for resale or a commercial purpose.', 'definition', 2],
  ['Is a person buying a machine for **self-employment** a consumer?', '**Yes**: earning a livelihood by self-employment is not a commercial purpose.', 'exam-tip', 2],
  ['Are **online** purchases covered?', '**Yes**: e-commerce, teleshopping, direct selling and multi-level marketing are covered.', 'fact', 2],
  ['Which law replaced the 1986 consumer law?', 'The **Consumer Protection Act 2019**.', 'fact', 2],
  ['The **six** consumer rights', 'Safety, be informed, choose, be heard, seek redressal, consumer education.', 'concept', 2],
  ['**Right to safety**', 'Protection against goods and services hazardous to life, health and property.', 'definition', 2],
  ['**Right to be informed**', 'Full facts on quality, quantity, purity, price, dates and use.', 'definition', 2],
  ['**Right to choose**', 'Access to a variety of goods at competitive prices.', 'definition', 2],
  ['**Right to be heard**', 'Complaints and views must be given due consideration.', 'definition', 2],
  ['A dealer forces buyers to take his own accessories: which right?', '**Right to choose**.', 'example', 2],
  ['Four responsibilities of a consumer', 'Buy standardised goods, read labels, ask for a bill, complain genuinely (also: avoid waste and pollution).', 'concept', 2],
  ['**ISI mark** is for…', 'Electrical and industrial goods.', 'fact', 2],
  ['**Agmark** is for…', 'Graded agricultural produce such as pulses, spices and honey.', 'fact', 2],
  ['**Hallmark** is for…', 'Purity of gold and silver jewellery.', 'fact', 2],
  ['Who can file a complaint?', 'Consumer; registered consumer association; Central or State Government; consumers for many with the same interest; legal heir of a deceased consumer.', 'concept', 2],
  ['What decides the commission?', 'The **value of goods or services paid**, not the compensation claimed.', 'exam-tip', 3],
  ['**District Commission** limit', 'Value paid **up to ₹50 lakh**.', 'fact', 3],
  ['**State Commission** limit', '**Above ₹50 lakh, up to ₹2 crore**.', 'fact', 3],
  ['**National Commission** limit', '**Above ₹2 crore**.', 'fact', 3],
  ['Route of appeal', 'District → State (45 days) → National (30 days) → Supreme Court (30 days).', 'concept', 3],
  ['Three lifts for a housing society at ₹21 lakh each: which commission?', '₹63 lakh paid, so the **State Commission**.', 'example', 3],
  ['**Corrective advertisement**', 'Ordered to neutralise the effect of a misleading advertisement.', 'definition', 3],
  ['**Punitive damages**', 'Extra damages for serious negligence that harms many consumers.', 'definition', 3],
  ['Six reliefs a commission can order', 'Remove defect, replace, refund, compensation, stop unfair practice, corrective advertisement.', 'concept', 3],
  ['Five roles of consumer organisations', 'Educate, spread information, test products, encourage protest, legal help and filing complaints.', 'concept', 4],
  ['Can a registered consumer association file a complaint?', '**Yes**, on behalf of consumers.', 'fact', 4],
  ['National Consumer Day in India', '**24 December** (World Consumer Rights Day is 15 March).', 'fact', 4],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-12-default-chapter-test-short',
  title: 'Chapter test (short) — Consumer Protection',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_long_term', 'm_right_safety', 'm_genset_forum', 'ar_resale'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and the 3-mark question in about 50–75 words.', items: ['s_consumer_meaning', 's_remedies_two', 's3_rights_case'] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer any ONE of the two questions in about 120 words.', items: [{ attempt: 1, keys: ['l_importance', 'l_ngo'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks)', instr: 'Read the case and answer all parts. Part (c) has an internal choice.', items: ['cb_geyser'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-12-default-chapter-test-long',
  title: 'Chapter test (long) — Consumer Protection',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_unorganised', 'm_who_consumer', 'm_right_info', 'm_resp_bill', 'm_not_file', 'm_bus_forum', 'm_appeal_state', 'm_ngo_testing', 'ar_heir', 'ar_basis'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and 3-mark questions in about 50–75 words. Questions 13 and 15 have an internal choice.', items: ['s_consumer_view', 's_who_file', { attempt: 1, keys: ['s_tiers', 's_ngo_two'] }, 's3_responsibilities', { attempt: 1, keys: ['s3_machinery', 's3_business_view'] }] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer question 16, and any ONE of questions 17 and 18, in about 120 words each.', items: ['l_rights', { attempt: 1, keys: ['l_machinery', 'l_remedies'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks each)', instr: 'Read each case and answer all parts. Part (c) of each has an internal choice.', items: ['cb_coaching', 'cb_hospital'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t04 of cbse-12-business-studies-ch12 only (importance; Consumer Protection Act 2019: consumer, rights, responsibilities, who can complain; redressal machinery and reliefs; consumer organisations)',
    originality: 'every consumer, seller, brand and case is imagined and written by SOYL; no NCERT text, example or exercise and no board or sample-paper item reused (D-036)',
    data: `forums computed from the value paid (limits ₹50 lakh / ₹2 crore): CCTV purchase ${inr(564000)}; hospital ${inr(68 * LAKH)}; lifts ${inr(340 * LAKH)}; worked example ${CASE_ROWS.map((r) => inr(r.total)).join(', ')}; ${inr(2 * CRORE)} boundary`,
    facts: 'CPA 2019 (in force 2020): meaning of consumer incl. online and self-employment; six rights; complainants; three-tier commissions with limits as revised by the 2021 jurisdiction rules; appeal periods 45/30/30 days; reliefs; National Consumer Day 24 December, World Consumer Rights Day 15 March',
    gate: 'schema, pipeline lint, deterministic verify, word limits, narration and answer-leak checks run clean in this build',
  },
});
