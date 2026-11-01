// Build ISC 12 Commerce ch16 Consumer Protection. Run from platform/:
//   npx tsx content/authored/economics-commerce/isc-12-commerce-ch16/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from './lib.mjs';

setUnit('isc-12-commerce-ch16', 'economics-commerce');
await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- visuals
const vRoute1 = flow('LR', ['Why protect consumers', 'Methods of protection', 'Who is a consumer', 'Rights and responsibilities'], 'Route map of Part 1: why consumers need protection, the methods of protection, who is a consumer under the 2019 Act, and consumer rights and responsibilities', 'Part 1 at a glance');
const vRoute2 = flow('LR', ['Three commissions', 'Limits notified in 2021', 'Misleading advertisements', '1986 versus 2019'], 'Route map of Part 2: the three consumer commissions, their pecuniary limits as notified in 2021, misleading advertisements and the CCPA, and the 1986 and 2019 Acts compared', 'Part 2 at a glance');

const vNeed = table(
  ['Why consumers need protection', 'In short'],
  [
    ['Unorganised and weak', 'One buyer against a large, organised seller'],
    ['Lack of information', 'Hard to judge quality, safety and true price'],
    ['Unfair trade practices', 'Adulteration, short weights, false claims'],
    ['Unsafe goods', 'Defective products can harm life and property'],
  ],
  'Table of four reasons why consumers need protection',
);
const vMethods = table(
  ['Method', 'Who acts', 'Example'],
  [
    ['Self-help', 'The consumer', 'Checking marks, keeping bills, complaining'],
    ['Legislation', 'Government, through laws', 'Consumer Protection Act, 2019'],
    ['Consumer associations and NGOs', 'Voluntary groups', 'Helpdesks, product tests, help with complaints'],
  ],
  'Table of three methods of consumer protection, who acts in each and an example',
);
const vConsumer = table(
  ['Imagined buyer', 'Consumer under the 2019 Act?', 'Why'],
  [
    ['Anita buys a sewing machine to earn her living by stitching', 'Yes', 'Livelihood by self-employment is not commercial'],
    ['A trader buys fifty fans to resell', 'No', 'Bought for resale'],
    ['A person gets a free sample, paying nothing', 'No', 'No consideration'],
    ['Lalit uses a fridge his mother bought, with her approval', 'Yes', 'User with the buyer\'s approval'],
    ['A shopper buys a phone online', 'Yes', 'Online purchases are covered'],
  ],
  'Worked table: five imagined buyers, whether each is a consumer under the 2019 Act, and why',
  'Check three things: consideration paid, purpose of purchase, and whether the user had approval.',
);
const vRights = table(
  ['Right', 'Meaning'],
  [
    ['Safety', 'Protection from goods and services hazardous to life and property'],
    ['To be informed', 'Facts on quality, quantity, purity, standard and price'],
    ['To choose', 'Access to a variety of goods at competitive prices'],
    ['To be heard', 'Consumers\' interests considered at appropriate forums'],
    ['To seek redressal', 'Fair settlement against unfair practices and exploitation'],
    ['Consumer awareness', 'Knowledge and skills to be an informed consumer'],
  ],
  'Table of six consumer rights with the meaning of each',
);
const vRightsEx = table(
  ['Imagined situation', 'Right involved'],
  [
    ['An e-bike battery catches fire while charging', 'Safety'],
    ['A loan app hides its fees until after the loan', 'To be informed'],
    ['A town\'s only cable operator scraps all cheap packs', 'To choose'],
    ['Consumer groups sit on a bus-safety committee', 'To be heard'],
  ],
  'Worked table matching four imagined situations with the consumer right each involves',
  'Ask what the consumer lost: safety, facts, options or a voice.',
);
const vResp = table(
  ['Responsibility', 'What it means'],
  [
    ['Be aware', 'Know your rights and read labels and terms'],
    ['Insist on a bill', 'Keep the bill and warranty as proof'],
    ['Look for quality marks', 'Prefer certified goods'],
    ['Use as instructed', 'Follow the maker\'s instructions and warnings'],
    ['Complain genuinely', 'Raise only real defects, with facts'],
  ],
  'Table of five responsibilities of consumers with what each means',
);
const vTiers = (() => {
  const s = new Svg(560, 360);
  const boxes = [
    ['Supreme Court', 'appeals from the National Commission\'s original orders', 'muted', 18],
    ['National Commission', 'value paid above ₹2 crore', 'red', 98],
    ['State Commission', 'above ₹50 lakh, up to ₹2 crore', 'yellow', 178],
    ['District Commission', 'value paid up to ₹50 lakh', 'green', 258],
  ];
  for (const [name, sub, col, y] of boxes) {
    s.rect(90, y, 380, 56, { fill: col === 'muted' ? 'fill' : col, fillOpacity: col === 'muted' ? undefined : 0.16, color: col, sw: 1.5, rx: 8 });
    s.text(280, y + 20, name, { size: 14, bold: true });
    s.text(280, y + 40, sub, { size: 12 });
  }
  for (const y of [258, 178, 98]) s.arrow(500, y + 28, 500, y - 52, { sw: 1.4, color: 'muted' });
  s.text(512, 190, 'appeal', { size: 12, muted: true, anchor: 'start' });
  s.text(280, 342, 'Limits as notified in December 2021', { size: 12, muted: true });
  return s.visual('Four stacked boxes. Bottom: District Commission, value paid up to 50 lakh rupees. Above it: State Commission, above 50 lakh and up to 2 crore rupees. Above that: National Commission, value paid above 2 crore rupees. Top: Supreme Court, for appeals from the National Commission\'s original orders. Arrows on the right show appeals moving up one level. Limits as notified in December 2021', 'Three-tier consumer redressal under the 2019 Act, with appeals moving up.');
})();
const vJurisEx = table(
  ['Imagined complaint', 'Value paid', 'Commission'],
  [
    ['Leaky flat bought for a family', '₹42 lakh', 'District'],
    ['House with cracks; ₹1.5 crore claimed', '₹60 lakh', 'State (value paid decides)'],
    ['Family house with cracks', '₹1.4 crore', 'State'],
    ['Apartment never delivered', '₹2.4 crore', 'National'],
  ],
  'Worked table: four imagined complaints with the value paid and the commission that hears each, using the limits notified in 2021',
  'Use the value paid, never the compensation claimed.',
);
const vNewRedress = table(
  ['Provision of the 2019 Act', 'How it helps the consumer'],
  [
    ['File where you live or work', 'No need to travel to the seller\'s city'],
    ['E-filing', 'Complaint and fees can be submitted online'],
    ['Mediation', 'A quicker, friendly settlement if both agree'],
    ['Product liability', 'Compensation for harm from defective products'],
  ],
  'Table of four provisions of the 2019 Act and how each helps the consumer',
);
const vMisleading = table(
  ['An advertisement is misleading if it…', 'Imagined example'],
  [
    ['Falsely describes the product', 'A cream said to remove all scars'],
    ['Gives a false guarantee', 'A drink guaranteeing two inches of height'],
    ['Deliberately hides important information', 'Zero interest in large print; fees in tiny print'],
    ['Amounts to an unfair trade practice', 'A false claim of a government award'],
  ],
  'Table of four ways an advertisement can be misleading under the 2019 Act, with an imagined example of each',
);
const vCcpa = table(
  ['Power of the CCPA', 'Detail'],
  [
    ['Investigate', 'On a complaint or on its own'],
    ['Stop or modify the advertisement', 'Directions to maker, trader, endorser or publisher'],
    ['Penalty on maker or endorser', 'Up to ₹10 lakh; up to ₹50 lakh for a repeat'],
    ['Bar an endorser', 'From endorsing for a period'],
    ['Recall and refund', 'Order unsafe goods recalled and money refunded'],
  ],
  'Table of the powers of the Central Consumer Protection Authority, including penalties of up to 10 lakh rupees, and up to 50 lakh rupees for a repeat contravention',
  'Penalty figures as in the 2019 Act; an endorser who exercised due diligence is not penalised.',
);
const vAdEx = table(
  ['Question about an imagined height drink advertisement', 'Answer'],
  [
    ['Is it misleading?', 'Yes: a false guarantee with no proof'],
    ['Who can act for all buyers?', 'The CCPA'],
    ['What can the CCPA order?', 'Stop or modify the advertisement; a penalty'],
    ['What can a misled buyer do?', 'Complain to the CCPA or a commission for refund or compensation'],
  ],
  'Worked table answering four questions about an imagined misleading advertisement for a height drink',
  'Name the defect, then the body, then the remedy.',
);
const vCompare = table(
  ['Basis', '1986 Act', '2019 Act'],
  [
    ['Lowest tier', 'District Forum', 'District Commission'],
    ['Limits', '₹20 lakh; ₹1 crore', '₹50 lakh; ₹2 crore (notified 2021)'],
    ['Basis of limits', 'Value plus compensation claimed', 'Value paid as consideration'],
    ['Regulator', 'None', 'Central Consumer Protection Authority'],
    ['Online buying', 'Not expressly covered', 'Covered, with teleshopping and direct selling'],
    ['New remedies', 'None of these', 'Product liability, mediation, e-filing, penalties on misleading advertisements'],
  ],
  'Table comparing the 1986 and 2019 Consumer Protection Acts on lowest tier, limits, basis of limits, regulator, online buying and new remedies',
  'Limits shown as District ceiling; State ceiling.',
);
const vLimitBars = (() => {
  const s = new Svg(560, 300);
  const c = s.chart({ x0: 0, x1: 4, y0: 0, y1: 220, left: 80, top: 30, width: 420, height: 200, xLabel: '', yLabel: 'Upper limit (₹ lakh)' });
  const bars = [[1, 20, 'blue'], [1.6, 50, 'green'], [2.6, 100, 'blue'], [3.2, 200, 'green']];
  for (const [x, v, col] of bars) {
    s.rect(c.X(x - 0.22), c.Y(v), c.X(x + 0.22) - c.X(x - 0.22), c.Y(0) - c.Y(v), { fill: col, fillOpacity: 0.3, color: col, sw: 1.2, rx: 2 });
    s.text(c.X(x), c.Y(v) - 10, String(v), { size: 12, bold: true });
  }
  for (const y of [0, 50, 100, 150, 200]) c.yTick(y, String(y));
  c.xTick(0, '');
  s.text(c.X(1.3), c.Y(0) + 20, 'District', { size: 12 });
  s.text(c.X(2.9), c.Y(0) + 20, 'State', { size: 12 });
  s.rect(150, 36, 14, 14, { fill: 'blue', fillOpacity: 0.3, color: 'blue', sw: 1, rx: 2 });
  s.text(170, 43, '1986 Act', { size: 12, anchor: 'start' });
  s.rect(150, 58, 14, 14, { fill: 'green', fillOpacity: 0.3, color: 'green', sw: 1, rx: 2 });
  s.text(170, 65, '2019 Act, notified 2021', { size: 12, anchor: 'start' });
  return s.visual('Bar chart of upper pecuniary limits in lakh rupees. District tier: 20 under the 1986 Act, 50 under the 2019 Act as notified in 2021. State tier: 100 under the 1986 Act, 200 under the 2019 Act as notified in 2021. Anything above the State ceiling goes to the National Commission', 'Upper limits of the District and State tiers, 1986 and 2019 (as notified in 2021); 100 lakh is 1 crore.');
})();
const vSummary1 = table(
  ['Idea', 'Key point'],
  [
    ['Need', 'Consumers are unorganised, ill-informed and face unfair practices'],
    ['Methods', 'Self-help, legislation, consumer associations and NGOs'],
    ['Consumer', 'Buys or hires for consideration, online or offline; not for resale or commercial use'],
    ['Rights and duties', 'Six rights; matching responsibilities'],
  ],
  'Summary table of Part 1: need, methods, who is a consumer, and rights and responsibilities',
);
const vSummary2 = table(
  ['Idea', 'Key point'],
  [
    ['Commissions', 'District up to ₹50 lakh; State to ₹2 crore; National above (2021)'],
    ['Basis', 'Value paid as consideration'],
    ['Misleading advertisements', 'CCPA can stop them; penalty up to ₹10 lakh, ₹50 lakh for a repeat'],
    ['1986 vs 2019', 'CCPA, e-commerce, product liability, mediation, e-filing, higher limits'],
  ],
  'Summary table of Part 2: commissions and limits, basis of jurisdiction, misleading advertisements and the two Acts compared',
);
const vCaseSteps = flow('LR', ['Quote the clue', 'Name the right, body or rule', 'Apply the limit or remedy'], 'Three steps for case questions: quote the clue, name the right, body or rule, and apply the limit or remedy');

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Consumer Protection — Part 1: Need, Methods, Rights and Responsibilities',
  goals: [
    'Explain why consumers need protection and compare the methods of consumer protection',
    'Decide whether a person is a consumer under the 2019 Act in a given case',
    'Identify the consumer right violated in a situation and state related responsibilities',
  ],
  slides: [
    sl('title', 'Consumer Protection', {
      b: 'Part 1: why consumers need **protection**, the **methods** of protection, **who is a consumer**, and consumer **rights and responsibilities**.',
      v: vRoute1,
      n: 'Every one of us is a consumer, from buying a pencil to booking a train ticket. When something goes wrong, a single buyer is often helpless against a large seller. In this part we see why consumers need protection, how they are protected, who counts as a consumer in law, and what their rights and duties are.',
    }),
    sl('concept', 'Why consumers need protection', {
      v: vNeed,
      n: 'Consumers need protection for four reasons. They are unorganised, each facing a large, organised seller alone. They often lack information about quality, safety and fair price. Some sellers use unfair practices such as adulteration and false claims. And defective goods can harm life and property.',
    }),
    sl('concept', 'Methods of consumer protection', {
      v: vMethods,
      n: 'There are three methods. Self-help, where alert consumers check marks, keep bills and complain. Legislation, where the government passes laws such as the Consumer Protection Act of twenty nineteen. And consumer associations and non-government organisations, which educate consumers, test products and help them complain.',
    }),
    sl('check', 'Quick check: whose job?', {
      b: 'True or false: consumer protection is the job of the government alone.',
      chk: 'tf_methods',
      n: 'Think of all three methods.',
    }),
    sl('concept', 'Who is a consumer?', {
      b: 'Under the **Consumer Protection Act, 2019**, a consumer **buys goods or hires services for a consideration**, offline or online, including a **user with the buyer\'s approval**, but not one who buys **for resale or a commercial purpose**.',
      v: table(['Covered', 'Not covered'], [['Purchases for personal use', 'Goods bought for resale'], ['Online, teleshopping, direct selling', 'Goods bought for a commercial purpose'], ['Use to earn a living by self-employment', 'Goods received wholly free']], 'Table of who is covered as a consumer under the 2019 Act and who is not'),
      n: 'A consumer is someone who buys goods or hires services and pays, or promises to pay, for them. Users with the buyer\'s approval count too, and so do online, teleshopping and direct-selling buyers. People who buy to resell or for a commercial purpose do not, but using goods to earn one\'s own living by self-employment is allowed.',
    }),
    sl('example', 'Worked example 1: consumer or not?', {
      b: 'Five imagined buyers.',
      bl: ['Step 1: was a **consideration** paid or promised?', 'Step 2: was it for **resale or commercial** use?', 'Step 3: is the user acting **with the buyer\'s approval**?'],
      v: vConsumer,
      n: 'Anita, who stitches clothes to earn her living, is a consumer. A trader buying fans to resell is not. Someone receiving a free sample has paid nothing, so is not. Lalit using his mother\'s fridge with her approval is a consumer. And an online shopper is covered by the twenty nineteen Act.',
    }),
    sl('concept', 'Rights of consumers', {
      v: vRights,
      n: 'Consumers have six rights. The right to safety from hazardous goods. The right to be informed about quality and price. The right to choose from a variety at fair prices. The right to be heard at proper forums. The right to seek redressal. And the right to consumer awareness.',
    }),
    sl('example', 'Worked example 2: which right?', {
      b: 'Four imagined situations.',
      bl: ['Step 1: ask what the consumer **lost** or **gained**.', 'Step 2: match it to a **right**.', 'Step 3: explain in one line.'],
      v: vRightsEx,
      n: 'An e-bike battery catching fire threatens safety. A loan app hiding its fees denies the right to be informed. A cable operator scrapping cheap packs takes away choice. And consumer groups sitting on a bus-safety committee shows the right to be heard in action.',
    }),
    sl('check', 'Quick check: a right to learn', {
      b: 'Fill in the blank: the right to gain the knowledge and skills to be an informed consumer is the right to consumer ___.',
      chk: 'fb_rights',
      n: 'One word, the sixth right.',
    }),
    sl('concept', 'Responsibilities of consumers', {
      v: vResp,
      n: 'Rights come with responsibilities. Consumers should be aware of their rights and read labels and terms. They should insist on a bill and keep it. They should prefer goods with quality marks, use products as instructed, and complain only about genuine defects, with facts.',
    }),
    sl('check', 'Quick check: a voice on committees', {
      b: 'Consumer groups are invited onto the committee that sets school-bus safety standards. Which right does this support?',
      chk: 'm_right_heard',
      n: 'Whose views are being considered?',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up Part 1. Consumers need protection because they are unorganised, ill-informed and face unfair practices. Self-help, legislation and consumer associations protect them. Under the twenty nineteen Act, a consumer pays for goods or services, online or offline, but not for resale or commercial use. Six rights come with matching responsibilities.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['To decide **who is a consumer**, check consideration, purpose and approval.', 'Name the **exact right** in a case and quote the clue.', 'Pair each right with a **responsibility** where asked.', 'Use **imagined examples**, not brand names.'],
      v: vCaseSteps,
      n: 'Some tips. To decide whether someone is a consumer, check whether they paid, why they bought, and whether a user had approval. In case questions, name the exact right and quote the clue. Where asked, pair rights with responsibilities.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Consumer Protection — Part 2: Commissions, Misleading Advertisements and the Two Acts',
  goals: [
    'Choose the correct commission for a complaint based on the value of goods or services paid for',
    'Explain what makes an advertisement misleading and the action a consumer can take',
    'List the key differences between the 1986 and 2019 Acts',
  ],
  slides: [
    sl('title', 'Commissions, Advertisements and the Two Acts', {
      b: 'Part 2: the **three commissions** and their **limits**, **misleading advertisements** and the **CCPA**, and the **1986 and 2019 Acts** compared.',
      v: vRoute2,
      n: 'In Part 2 we see where a consumer goes for justice. We meet the three consumer commissions and their money limits, then look at misleading advertisements and the central authority that acts against them, and finally compare the old and new consumer laws.',
    }),
    sl('diagram', 'Three-tier redressal machinery', {
      b: 'Consumer Disputes Redressal **Commissions** at district, state and national level, with limits **as notified in December 2021**.',
      v: vTiers,
      n: 'There are three tiers. The District Commission hears complaints where the value paid is up to fifty lakh rupees. The State Commission hears those above fifty lakh and up to two crore. The National Commission hears those above two crore. Appeals move up one level, and from the National Commission to the Supreme Court. These limits were notified in December twenty twenty one.',
    }),
    sl('example', 'Worked example 1: which commission?', {
      b: 'Four imagined complaints.',
      bl: ['Step 1: find the **value paid**.', 'Step 2: ignore the **compensation claimed**.', 'Step 3: compare with the limits.'],
      v: vJurisEx,
      n: 'A flat bought for forty two lakh goes to the District Commission. A house bought for sixty lakh goes to the State Commission, even if the owner claims one and a half crore, because the value paid decides. A house costing one point four crore also goes to the State. An apartment costing two point four crore goes to the National Commission.',
    }),
    sl('check', 'Quick check: a leaky flat', {
      b: 'Rekha paid ₹42 lakh for a flat that leaks. Where should she file her complaint?',
      chk: 'm_district',
      n: 'Compare the amount with the lowest limit.',
    }),
    sl('concept', 'Easier redress under the 2019 Act', {
      v: vNewRedress,
      n: 'The twenty nineteen Act makes complaining easier. A consumer can file where she lives or works. Complaints can be filed online. If both sides agree, the dispute can go to mediation. And product liability lets consumers claim compensation for harm caused by defective products.',
    }),
    sl('concept', 'Misleading advertisements', {
      b: 'A **misleading advertisement** falsely describes a product, gives a **false guarantee**, or **hides important information**.',
      v: vMisleading,
      n: 'An advertisement is misleading if it falsely describes a product, gives a false guarantee, deliberately hides important information, or amounts to an unfair trade practice. A cream said to remove all scars, or a drink that guarantees extra height, are imagined examples.',
    }),
    sl('concept', 'The Central Consumer Protection Authority', {
      v: vCcpa,
      n: 'The twenty nineteen Act set up the Central Consumer Protection Authority, which protects consumers as a class. It can investigate, order a misleading advertisement to be stopped or changed, and penalise the maker or endorser up to ten lakh rupees, or up to fifty lakh for a repeat. It can also bar an endorser for a period, unless the endorser had checked the claims with due care.',
    }),
    sl('check', 'Quick check: who acts?', {
      b: 'Which body under the 2019 Act can direct a maker to withdraw a misleading advertisement and impose a penalty?',
      chk: 'm_ccpa',
      n: 'It acts for consumers as a class.',
    }),
    sl('example', 'Worked example 2: a misleading advertisement', {
      b: 'An imagined health drink guarantees two inches of extra height in three months.',
      bl: ['Step 1: name the **defect** in the advertisement.', 'Step 2: name the **body** that can act for all buyers.', 'Step 3: state the **remedies**.'],
      v: vAdEx,
      n: 'The advertisement gives a false guarantee, so it is misleading. The Central Consumer Protection Authority can act for all buyers, ordering it to stop or change and imposing a penalty. A misled buyer can complain to the authority or to a commission for a refund or compensation.',
    }),
    sl('concept', 'The 1986 and 2019 Acts compared', {
      v: vCompare,
      n: 'The twenty nineteen Act replaced the Act of nineteen eighty six. Forums became commissions. Limits rose and are now based on the value paid. A central authority was created. Online buying was covered. And new remedies were added: product liability, mediation, e-filing and penalties for misleading advertisements.',
    }),
    sl('diagram', 'Limits then and now', {
      v: vLimitBars,
      n: 'Here are the money limits side by side, in lakh rupees. Under the nineteen eighty six Act, the District Forum went up to twenty lakh and the State Commission up to one crore. Under the twenty nineteen Act, as notified in twenty twenty one, the District Commission goes up to fifty lakh and the State Commission up to two crore.',
    }),
    sl('check', 'Quick check: a new name', {
      b: 'True or false: the 2019 Act renamed the District Forum as the District Commission.',
      chk: 'tf_1986',
      n: 'What are all three tiers called under the new Act?',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up Part 2. As notified in twenty twenty one, District Commissions hear complaints up to fifty lakh, State Commissions up to two crore, and the National Commission above that, based on the value paid. The central authority acts against misleading advertisements with penalties. The twenty nineteen Act added the authority, e-commerce coverage, product liability, mediation and e-filing.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['Always use the **value paid**, not the compensation claimed.', 'Write limits **as notified in 2021**: ₹50 lakh, ₹2 crore.', 'Know the **1986** limits for comparison: ₹20 lakh, ₹1 crore.', 'For misleading advertisements, name the **defect**, the **CCPA** and the **penalty**.'],
      v: vTiers,
      n: 'Final tips. In jurisdiction questions, use the value paid and ignore the compensation claimed. Quote the limits as notified in twenty twenty one, and know the older limits for comparison. For misleading advertisements, name the defect, the authority and the penalty. Check the latest notifications, as limits can be revised.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Consumer Protection — notes',
  sections: [
    {
      h: '1. Need for consumer protection and its methods',
      t: 1,
      b: '**Consumer protection** means safeguarding consumers against unfair trade practices, defective goods and deficient services, and helping them get redress.\n\n**Need:** consumers are unorganised and weak against large sellers; they lack information on quality, safety and price; they face unfair practices such as adulteration, short weighing and false claims; and defective goods can endanger life and property.\n\n**Methods:**\n- **Self-help** — consumers protect themselves through awareness: checking quality marks, reading labels, keeping bills and complaining.\n- **Legislation** — laws such as the Consumer Protection Act, 2019, and laws on weights and measures and food safety.\n- **Consumer associations and NGOs** — voluntary bodies that educate consumers, test products, publish findings and help or represent consumers in complaints.',
      terms: [['Consumer protection', 'Safeguarding consumers against unfair practices and helping them get redress.'], ['Self-help', 'Consumers protecting themselves through their own awareness and care.']],
      v: vNeed,
      vs: [vMethods],
    },
    {
      h: '2. Consumer under the 2019 Act; rights and responsibilities',
      t: 2,
      b: '**Consumer (Consumer Protection Act, 2019):** a person who buys goods or hires or avails services for a **consideration** (paid, promised, partly paid or deferred), including a **user with the buyer\'s approval**. Transactions **offline or online**, through **teleshopping, direct selling or multi-level marketing**, are covered. A person who obtains goods **for resale or for a commercial purpose** is not a consumer, but use of goods bought **exclusively to earn one\'s livelihood by self-employment** is not a commercial purpose.\n\n**Rights:** safety; to be informed; to choose; to be heard; to seek redressal; to consumer awareness.\n\n**Responsibilities:** be aware of rights; read labels and terms; insist on a bill and warranty card; prefer goods with standard quality marks; use goods as instructed; file only genuine complaints; be honest in dealings.',
      terms: [['Consideration', 'The price paid or promised for goods or services.'], ['Right to be heard', 'Consumers\' interests receive due consideration at appropriate forums.'], ['Right to seek redressal', 'The right to a fair settlement of genuine grievances.']],
      v: vRights,
      vs: [vConsumer, vResp],
    },
    {
      h: '3. Consumer Disputes Redressal Commissions',
      t: 3,
      b: 'The 2019 Act sets up a **three-tier** machinery of Consumer Disputes Redressal Commissions. Their **pecuniary limits** were revised by rules **notified in December 2021** and depend on the **value of goods or services paid as consideration**:\n- **District Commission** — up to **₹50 lakh**.\n- **State Commission** — above **₹50 lakh** and up to **₹2 crore**; also hears appeals from District Commissions.\n- **National Commission** — above **₹2 crore**; also hears appeals from State Commissions.\n\nAppeals against the National Commission\'s orders on complaints filed before it lie to the **Supreme Court**.\n\n**Easier redress:** a complaint can be filed where the consumer **lives or works**; complaints can be **filed electronically**; disputes can be referred to **mediation** if both parties agree.\n\n*Dated note: limits are as notified in December 2021; check for later revisions.*',
      terms: [['Pecuniary jurisdiction', 'The money limit of cases a commission can hear.'], ['Mediation', 'Settlement of a dispute with the help of a neutral mediator, if both parties agree.']],
      v: vTiers,
      vs: [vJurisEx, vNewRedress],
    },
    {
      h: '4. Misleading advertisements and the CCPA',
      t: 4,
      b: 'A **misleading advertisement** is one that falsely describes a product or service, gives a false guarantee or is likely to mislead about its nature, quantity or quality, amounts to an unfair trade practice, or deliberately conceals important information.\n\n**Central Consumer Protection Authority (CCPA):** set up under the 2019 Act to protect, promote and enforce the rights of consumers **as a class**. It can investigate, order recall of unsafe goods and refunds, and direct a trader, manufacturer, endorser or publisher to **discontinue or modify** a false or misleading advertisement.\n\n**Penalties:** on a manufacturer or endorser, up to **₹10 lakh**, and up to **₹50 lakh** for every subsequent contravention. The CCPA may also bar an endorser from endorsing for a period. An endorser who exercised **due diligence** to verify the claims is not penalised.\n\n**What a misled consumer can do:** complain to the CCPA, or file a complaint before a commission for refund, compensation or a corrective advertisement.\n\n**Product liability:** a manufacturer, service provider or seller can be held liable to compensate for harm caused by a defective product or deficient service.',
      terms: [['Misleading advertisement', 'An advertisement that deceives by false claims, false guarantees or hidden facts.'], ['CCPA', 'Central Consumer Protection Authority: protects consumers as a class.'], ['Product liability', 'Responsibility to compensate for harm caused by a defective product.']],
      v: vMisleading,
      vs: [vCcpa, vAdEx],
    },
    {
      h: '5. Consumer Protection Act, 1986 versus 2019',
      t: 5,
      b: '- **Redressal bodies:** District Forum, State Commission and National Commission (1986); all three called **Commissions** (2019).\n- **Pecuniary limits:** 1986 — District up to **₹20 lakh**, State above ₹20 lakh and up to **₹1 crore**, National above ₹1 crore; 2019, as notified in 2021 — **₹50 lakh**, **₹2 crore**.\n- **Basis of limits:** value of goods or services **and compensation claimed** (1986); **value paid as consideration** (2019).\n- **Regulator:** none (1986); **CCPA** (2019).\n- **E-commerce:** not expressly covered (1986); online, teleshopping, direct selling and multi-level marketing covered (2019).\n- **Place of filing:** where the opposite party is or the cause arose (1986); also where the **consumer lives or works** (2019).\n- **New in 2019:** product liability, mediation, e-filing, penalties for misleading advertisements including on endorsers.',
      terms: [['District Forum', 'The lowest tier under the 1986 Act, now the District Commission.']],
      v: vCompare,
      vs: [vLimitBars],
    },
  ],
  tips: '**Common mistakes**\n- Using the compensation claimed, rather than the value paid, to choose the commission.\n- Quoting the 1986 limits for a 2019 question, or forgetting that limits were revised in 2021.\n- Calling a buyer for resale a consumer, or forgetting the self-employment exception.\n- Saying that endorsers can never be penalised.\n\n**How marks are usually awarded**\n- 1 mark: correct right, commission, body or figure.\n- 2–3 marks: each point named and explained, tied to the case; limits stated with the year of notification.\n- 5 marks: parts answered separately; comparisons on clear bases; misleading-advertisement answers give the defect, the CCPA\'s powers and the penalty.\n- Case questions: quote the clue, name the right or rule, apply the limit or remedy.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['Why do consumers need protection?', 'Unorganised, ill-informed, unfair practices, unsafe goods.', 'concept', 1],
  ['Three methods of consumer protection', 'Self-help, legislation, consumer associations and NGOs.', 'exam-tip', 1],
  ['**Self-help**', 'Consumers protecting themselves through awareness.', 'definition', 1],
  ['**Consumer** (2019 Act)', 'Buys goods or services for a consideration, offline or online; not for resale or commercial use.', 'definition', 2],
  ['Self-employment exception', 'Goods bought only to earn one\'s living by self-employment are not commercial use.', 'fact', 2],
  ['Is a user with the buyer\'s approval a consumer?', 'Yes.', 'fact', 2],
  ['Six consumer rights', 'Safety, information, choice, be heard, redressal, consumer awareness.', 'exam-tip', 2],
  ['**Right to choose**', 'Access to a variety of goods at competitive prices.', 'definition', 2],
  ['**Right to be heard**', 'Consumers\' interests considered at appropriate forums.', 'definition', 2],
  ['Responsibilities of consumers', 'Be aware, insist on a bill, look for marks, use as instructed, complain genuinely.', 'exam-tip', 2],
  ['District Commission limit (notified 2021)', 'Value paid up to ₹50 lakh.', 'fact', 3],
  ['State Commission limit (notified 2021)', 'Above ₹50 lakh and up to ₹2 crore.', 'fact', 3],
  ['National Commission limit (notified 2021)', 'Above ₹2 crore.', 'fact', 3],
  ['What decides the commission?', 'The value of goods or services paid as consideration.', 'concept', 3],
  ['Appeal from a State Commission goes to…', 'The National Commission.', 'fact', 3],
  ['Appeal from the National Commission\'s original order goes to…', 'The Supreme Court.', 'fact', 3],
  ['Where can a 2019 complaint be filed?', 'Also where the consumer lives or works; online e-filing allowed.', 'fact', 3],
  ['**Mediation**', 'A friendly settlement through a mediation cell, if both agree.', 'definition', 3],
  ['**Misleading advertisement**', 'False description, false guarantee, or hidden important information.', 'definition', 4],
  ['**CCPA**', 'Central Consumer Protection Authority; protects consumers as a class.', 'definition', 4],
  ['CCPA penalty for a misleading advertisement', 'Up to ₹10 lakh; up to ₹50 lakh for a repeat.', 'fact', 4],
  ['Can an endorser be penalised?', 'Yes, unless due diligence was exercised.', 'fact', 4],
  ['**Product liability**', 'Liability to compensate for harm from a defective product.', 'definition', 4],
  ['1986 Act limits', 'District Forum up to ₹20 lakh; State up to ₹1 crore; National above.', 'fact', 5],
  ['1986 basis of limits', 'Value of goods or services plus compensation claimed.', 'fact', 5],
  ['New in the 2019 Act', 'CCPA, e-commerce coverage, product liability, mediation, e-filing.', 'exam-tip', 5],
  ['District Forum is now called…', 'District Commission.', 'fact', 5],
  ['Case routine', 'Quote the clue, name the right, body or rule, apply the limit or remedy.', 'exam-tip', 3],
]);

// ---------------------------------------------------------------- tests (ISC class defaults, item for item)
const T_SHORT = test({
  kind: 'short',
  blueprint: 'isc-12-default-chapter-test-short',
  title: 'Chapter test (short) — Consumer Protection',
  duration: 50,
  sections: [
    { id: 'A', title: 'Section A - Objective (5 marks)', instr: 'Answer all questions. Multiple-choice and assertion-reason items carry 1 mark each.', items: ['m_selfhelp', 'm_right_info', 'm_state', 'm_misleading', 'ar_juris'] },
    { id: 'B', title: 'Section B - Short answer (4 marks)', instr: 'Answer both questions. Internal choice in the second question.', items: ['s_choose', { attempt: 1, keys: ['s_consumer', 's_misleading'] }] },
    { id: 'C', title: 'Section C - Short answer (6 marks)', instr: 'Answer both questions. Internal choice in the second question.', items: ['s3_rights', { attempt: 1, keys: ['s3_tier', 's3_1986'] }] },
    { id: 'D', title: 'Section D - Long answer (5 marks)', instr: 'Answer the question. It is set in parts.', items: ['l_commission'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'isc-12-default-chapter-test-long',
  title: 'Chapter test (long) — Consumer Protection',
  duration: 100,
  sections: [
    { id: 'A', title: 'Section A - Objective (12 marks)', instr: 'Answer all questions. Multiple-choice and assertion-reason items carry 1 mark each.', items: ['m_need', 'm_ngo', 'm_consumer_who', 'm_right_safety', 'm_right_choose', 'm_national', 'm_value_paid', 'm_penalty', 'm_endorser', 'm_basis_change', 'ar_consumer', 'ar_ccpa'] },
    { id: 'B', title: 'Section B - Short answer (6 marks)', instr: 'Answer all three questions. Internal choice in the last question.', items: ['s_need', 's_rights2', { attempt: 1, keys: ['s_resp', 's_1986'] }] },
    { id: 'C', title: 'Section C - Short answer (12 marks)', instr: 'Answer all four questions. Internal choice in the last question.', items: ['s3_methods', 's3_misleading_case', 's3_new', { attempt: 1, keys: ['s3_resp', 's3_new_provisions'] }] },
    { id: 'D', title: 'Section D - Long answer (10 marks)', instr: 'Answer both questions. Internal choice in the second question. Each is set in parts.', items: ['l_rights', { attempt: 1, keys: ['l_misleading', 'l_compare'] }] },
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
    syllabus: 'topics t01–t05 of isc-12-commerce-ch16 (need for consumer protection and its methods; consumer under the 2019 Act, rights and responsibilities; Consumer Disputes Redressal Commissions and their revised pecuniary jurisdiction; misleading advertisements, the CCPA and the latest provisions; the 1986 and 2019 Acts compared)',
    originality: 'every firm, brand, person and case is imagined and written by SOYL and labelled; no ISC or CBSE textbook text, illustration or exercise and no CISCE specimen or board item reused (D-036); firms, people and set-ups differ from the CBSE 12 Business Studies chapter on consumer protection',
    data: 'all purchase values are imagined; each is checked against the pecuniary limits notified in December 2021',
    facts: 'time-sensitive: pecuniary limits as notified in December 2021 (District up to ₹50 lakh; State above ₹50 lakh to ₹2 crore; National above ₹2 crore); 1986 limits ₹20 lakh and ₹1 crore; CCPA penalty up to ₹10 lakh, ₹50 lakh for a subsequent contravention',
    gate: 'schema, pipeline lint, deterministic verify, word limits, narration and answer-leak checks run clean in this build',
  },
});
