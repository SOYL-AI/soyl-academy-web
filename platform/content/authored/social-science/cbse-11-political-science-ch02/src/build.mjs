// Build CBSE 11 Political Science ch02 Rights in the Indian Constitution. Run from platform/:
//   npx tsx content/authored/social-science/cbse-11-political-science-ch02/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from '../../cbse-11-political-science-ch01/src/lib.mjs';

setUnit('cbse-11-political-science-ch02', 'social-science');
await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- SVG helpers
function timeline(events, alt, caption, { w = 760, h = 230 } = {}) {
  const s = new Svg(w, h);
  const y = h / 2, x0 = 95, x1 = w - 95;
  s.arrow(x0 - 50, y, x1 + 60, y, { sw: 2 });
  const step = (x1 - x0) / (events.length - 1);
  events.forEach(([year, label], i) => {
    const x = x0 + i * step;
    const up = i % 2 === 0;
    s.dot(x, y, 6, 'accent');
    s.line(x, y, x, up ? y - 34 : y + 34, { sw: 1.2, color: 'muted' });
    s.text(x, up ? y - 46 : y + 46, String(year), { bold: true, size: 15, color: 'accent' });
    const lines = Array.isArray(label) ? label : [label];
    lines.forEach((ln, j) => s.text(x, up ? y - 66 - 16 * (lines.length - 1 - j) : y + 66 + 16 * j, ln, { size: 12 }));
  });
  return s.visual(alt, caption);
}

const vSix = (() => {
  const s = new Svg(760, 300);
  const cats = [
    ['Right to Equality', 'Articles 14 to 18', ['equality before law', 'untouchability abolished'], 'blue'],
    ['Right to Freedom', 'Articles 19 to 22', ['speech, assembly, movement', 'life, liberty, education'], 'green'],
    ['Right against Exploitation', 'Articles 23 and 24', ['no forced labour', 'no hazardous child work'], 'red'],
    ['Freedom of Religion', 'Articles 25 to 28', ['conscience and worship', 'no compulsion in religion'], 'brown'],
    ['Cultural and Educational', 'Articles 29 and 30', ['minorities protect culture', 'run their own schools'], 'yellow'],
    ['Constitutional Remedies', 'Article 32', ['go to court to enforce', 'Supreme and High Courts'], 'accent'],
  ];
  cats.forEach(([name, arts, gist, col], i) => {
    const x = 20 + (i % 3) * 245, y = 20 + Math.floor(i / 3) * 140;
    s.rect(x, y, 230, 120, { color: col, sw: 2 });
    s.text(x + 115, y + 26, name, { bold: true, size: 15, color: col });
    s.text(x + 115, y + 52, arts, { size: 13, muted: true });
    s.text(x + 115, y + 78, gist[0], { size: 12 });
    s.text(x + 115, y + 98, gist[1], { size: 12 });
  });
  return s.visual('Chart of the six categories of Fundamental Rights with their Articles: Right to Equality, Articles 14 to 18; Right to Freedom, 19 to 22; Right against Exploitation, 23 and 24; Right to Freedom of Religion, 25 to 28; Cultural and Educational Rights, 29 and 30; Right to Constitutional Remedies, Article 32', 'The six categories of Fundamental Rights in Part III.');
})();

const vCompare = (() => {
  const s = new Svg(760, 300);
  s.text(145, 24, 'Fundamental Rights', { bold: true, size: 16, color: 'blue' });
  s.text(615, 24, 'Directive Principles', { bold: true, size: 16, color: 'green' });
  const rows = [
    ['Part', 'Part III', 'Part IV'],
    ['Enforceable in court?', 'Yes, justiciable', 'No, non-justiciable'],
    ['Role towards government', 'Restrain it', 'Direct it'],
    ['What they protect', 'Individuals', 'Welfare of society'],
    ['Nature', 'Claims of citizens', 'Guidelines for policy'],
  ];
  rows.forEach(([label, l, r], i) => {
    const y = 48 + i * 48;
    s.rect(20, y, 250, 38, { color: 'blue', sw: 1.5, rx: 6 });
    s.rect(280, y, 200, 38, { color: 'muted', sw: 1.5, rx: 6 });
    s.rect(490, y, 250, 38, { color: 'green', sw: 1.5, rx: 6 });
    s.text(145, y + 19, l, { size: 13 });
    s.text(380, y + 19, label, { size: 13, muted: true });
    s.text(615, y + 19, r, { size: 13 });
  });
  return s.visual('Comparison chart of Fundamental Rights and Directive Principles: Part III against Part IV; justiciable against non-justiciable; restrain the government against direct it; protect individuals against promote the welfare of society; claims of citizens against guidelines for policy', 'Rights restrain, principles direct.');
})();

const vWrits = (() => {
  const s = new Svg(760, 215);
  s.text(380, 20, 'Writs issued by the Supreme Court (Article 32) and the High Courts (Article 226)', { bold: true, size: 14 });
  const writs = [
    ['Habeas corpus', ['have the body', 'produce a detained', 'person in court'], 'blue'],
    ['Mandamus', ['we command', 'official must do', 'a legal duty'], 'green'],
    ['Prohibition', ['stop a lower court', 'going beyond its', 'power'], 'red'],
    ['Quo warranto', ['by what authority', 'tests a claim to', 'a public office'], 'brown'],
    ['Certiorari', ['quash an order', 'a lower body made', 'without authority'], 'accent'],
  ];
  writs.forEach(([name, lines, col], i) => {
    const x = 6 + i * 150;
    s.rect(x, 45, 142, 150, { color: col, sw: 2 });
    s.text(x + 71, 70, name, { bold: true, size: 14, color: col });
    lines.forEach((ln, j) => s.text(x + 71, 108 + j * 24, ln, { size: 12 }));
  });
  return s.visual('Chart of the five writs: habeas corpus, to have the body, produce a detained person in court; mandamus, we command, an official must do a legal duty; prohibition, stop a lower court going beyond its power; quo warranto, by what authority, tests a claim to a public office; certiorari, quash an order a lower body made without authority', 'The five writs at a glance.');
})();

const vTimeline = timeline(
  [[1950, ['Constitution in force;', 'Parts III and IV']], [1976, ['42nd Amendment:', 'Fundamental Duties']], [1978, ['44th Amendment:', 'property right removed']], [1993, ['National Human', 'Rights Commission']], [2002, ['86th Amendment:', 'Article 21A, 11th duty']]],
  'Timeline: 1950 the Constitution comes into force with Parts III and IV; 1976 the 42nd Amendment adds Fundamental Duties; 1978 the 44th Amendment removes the property right from Part III; 1993 the National Human Rights Commission is set up; 2002 the 86th Amendment adds Article 21A and the eleventh duty',
  'Five dates, equally spaced (not to scale).',
);

// ---------------------------------------------------------------- tables and flows
const vWhat = table(
  ['Term', 'Meaning'],
  [
    ['Right', 'A claim recognised by society and by law'],
    ['Bill of rights', 'A list of rights in a constitution that the government cannot violate'],
    ['Fundamental Rights', 'The rights in Part III of the Constitution'],
    ['Justiciable', 'Enforceable by a court of law'],
  ],
  'Table of terms: a right is a claim recognised by society and law; a bill of rights is a list of rights in a constitution the government cannot violate; Fundamental Rights are in Part III; justiciable means enforceable by a court',
);
const vEquality = table(
  ['Article', 'What it provides'],
  [
    ['14', 'Equality before law and equal protection of the laws'],
    ['15', 'No discrimination by religion, race, caste, sex or place of birth'],
    ['16', 'Equality of opportunity in public employment'],
    ['17', 'Abolition of untouchability'],
    ['18', 'Abolition of titles'],
  ],
  'Table of the Right to Equality: Article 14 equality before law; 15 no discrimination on grounds of religion, race, caste, sex or place of birth; 16 equal opportunity in public employment; 17 abolition of untouchability; 18 abolition of titles',
);
const vFreedom = table(
  ['Freedom under Article 19', 'Example in daily life'],
  [
    ['Speech and expression', 'A student writes a letter to a newspaper'],
    ['Assembly (peaceful, unarmed)', 'Residents meet in a hall to discuss a road'],
    ['Association', 'Workers form a union or a club'],
    ['Movement and residence', 'A family moves to another state'],
    ['Profession', 'A woman opens her own bakery'],
  ],
  'Table of Article 19 freedoms with daily-life examples: speech and expression, peaceful assembly, association, movement and residence, and profession; all subject to reasonable restrictions',
  'All subject to reasonable restrictions such as public order.',
);
const vLife = table(
  ['Article', 'What it protects'],
  [
    ['20', 'Protection in respect of conviction for offences'],
    ['21', 'Protection of life and personal liberty'],
    ['21A', 'Free and compulsory education for children aged 6 to 14 (86th Amendment, 2002)'],
    ['22', 'Protection against arbitrary arrest and detention, including rules on preventive detention'],
  ],
  'Table of Articles 20 to 22: protection in respect of conviction, protection of life and personal liberty, education for children aged 6 to 14 added in 2002, and protection against arbitrary arrest and detention',
);
const vArrestSteps = table(
  ['Step', 'Safeguard in Article 22'],
  [
    ['1', 'Tell the person the grounds of the arrest'],
    ['2', 'Allow the person to consult a lawyer of choice'],
    ['3', 'Produce the person before a magistrate within 24 hours, excluding travel time'],
    ['4', 'No longer detention without the magistrate\'s order'],
  ],
  'Worked example table of safeguards on arrest: grounds told, a lawyer of choice, production before a magistrate within twenty-four hours excluding travel time, and no longer detention without the magistrate\'s order',
  'Applied to an imagined arrest in the town of Nandanpur.',
);
const vExploit = table(
  ['Article', 'Prohibition'],
  [
    ['23', 'Traffic in human beings and forced labour (begar)'],
    ['24', 'Employing children below 14 in factories, mines and hazardous work'],
  ],
  'Table of the Right against Exploitation: Article 23 prohibits traffic in human beings and forced labour; Article 24 prohibits employing children below fourteen in factories, mines and hazardous work',
);
const vRelCult = table(
  ['Right', 'Key points'],
  [
    ['Freedom of Religion (25 to 28)', 'Profess, practise, propagate; manage religious affairs; no tax for a religion; no compulsory religious instruction in a fully State-funded institution'],
    ['Cultural and Educational (29 and 30)', 'Any section may protect its language, script and culture; minorities may set up and run educational institutions'],
  ],
  'Table of two rights: Freedom of Religion, Articles 25 to 28, with practice, management of affairs and no compulsion; Cultural and Educational Rights, Articles 29 and 30, with protection of language and culture and the minorities\' right to run institutions',
);
const vRemedy = flow('LR', ['A Fundamental Right is violated', 'Person moves the Supreme Court (Article 32) or a High Court (Article 226)', 'Court issues a writ', 'The authority must obey'], 'Flow: a Fundamental Right is violated, the person moves the Supreme Court under Article 32 or a High Court under Article 226, the court issues a writ, and the authority must obey', 'How the remedy works');
const vWritCase = table(
  ['Situation (imagined)', 'Writ'],
  [
    ['A man is held at a police post for two days with no charge', 'Habeas corpus'],
    ['A clerk refuses to issue a ration card the law requires him to give', 'Mandamus'],
    ['A tribunal starts hearing a case outside its powers', 'Prohibition'],
    ['A person holds a post without the required qualification', 'Quo warranto'],
    ['A lower body has passed an order without authority', 'Certiorari'],
  ],
  'Worked example table matching situations to writs: detention without charge to habeas corpus; a clerk refusing his duty to mandamus; a tribunal beyond its powers to prohibition; a post held without qualification to quo warranto; an order passed without authority to certiorari',
  'Match the situation to the writ.',
);
const vProperty = flow('LR', ['Property is a Fundamental Right', 'Land reform laws are challenged', 'The 44th Amendment, 1978, removes it from Part III', 'Now a legal right under Article 300A'], 'Flow: property was a Fundamental Right, land reform laws were challenged, the 44th Amendment of 1978 removed it from Part III, and it is now a legal right under Article 300A', 'The right to property');
const vNHRC = table(
  ['Point', 'National Human Rights Commission'],
  [
    ['Set up', '1993'],
    ['Does', 'Inquires into violations of human rights, recommends action, spreads awareness'],
    ['Cannot do', 'Punish; punishment is for the courts'],
  ],
  'Table about the National Human Rights Commission: set up in 1993; it inquires into violations, recommends action and spreads awareness; it cannot punish',
);
const vSum1 = table(
  ['Topic', 'Key points'],
  [
    ['Meaning', 'Rights are claims; Part III rights are justiciable'],
    ['Six categories', 'Equality, Freedom, Exploitation, Religion, Cultural and Educational, Remedies'],
    ['Remedy', 'Article 32 and Article 226; five writs'],
    ['Other', 'Property is now Article 300A; NHRC set up in 1993'],
  ],
  'Summary table of Part 1: meaning of rights, six categories, remedies through Articles 32 and 226 and five writs, property under Article 300A and the Commission of 1993',
);
const vTips1 = table(
  ['Common mistake', 'Write instead'],
  [
    ['Property is a Fundamental Right today', 'Property is a legal right under Article 300A since 1978'],
    ['Habeas corpus and mandamus mean the same', 'Habeas corpus: produce the detained person; mandamus: do a duty'],
    ['Article 21A covers all children', 'Article 21A covers ages 6 to 14'],
  ],
  'Table of common mistakes in Part 1 and what to write instead',
);

const vDP = table(
  ['Point', 'Directive Principles'],
  [
    ['Where', 'Part IV of the Constitution, Articles 36 to 51'],
    ['What', 'Guidelines for the government in making laws and policies'],
    ['Force', 'Non-justiciable: courts cannot enforce them'],
    ['Importance', 'Fundamental in the governance of the country'],
  ],
  'Table of Directive Principles: in Part IV, Articles 36 to 51; guidelines for laws and policies; non-justiciable; fundamental in governance',
);
const vGroups = table(
  ['Group', 'Examples'],
  [
    ['Goals', 'Welfare of the people; justice; better living standards; fair distribution of resources; international peace'],
    ['Policies', 'Uniform civil code; prohibition of intoxicants; cottage industries; care of useful cattle; village panchayats'],
    ['Non-justiciable rights', 'Adequate livelihood; equal pay for equal work; right to work; early childhood care below six'],
  ],
  'Table of the commonly taught groups of Directive Principles: goals, policies and non-justiciable rights, with examples of each',
);
const vGoalsPol = table(
  ['Article', 'Principle'],
  [
    ['39', 'Adequate livelihood and equal pay for equal work, fair distribution of resources'],
    ['40', 'Village panchayats as units of self-government'],
    ['41', 'Work, education and public assistance'],
    ['43', 'Cottage industries in rural areas'],
    ['44', 'A uniform civil code (listed as one of the principles)'],
    ['45', 'Early childhood care and education for children below six'],
    ['51', 'Promotion of international peace'],
  ],
  'Table of Directive Principles by Article: 39 livelihood, equal pay and fair distribution; 40 village panchayats; 41 work, education and assistance; 43 cottage industries; 44 a uniform civil code; 45 early childhood care below six; 51 international peace',
);
const vClassify = table(
  ['Imagined item', 'Kind'],
  [
    ['The state of Marenpur frees a student detained without being told why', 'Fundamental Right (Article 22)'],
    ['The state plans centres to train women in cottage industries', 'Directive Principle'],
    ['A student cleans the riverbank near her school', 'Fundamental Duty'],
    ['A court orders a clerk to issue a certificate', 'Writ under Article 32 or 226'],
  ],
  'Worked example table classifying imagined items: freeing a person detained without grounds is a Fundamental Right; training centres for cottage industries is a Directive Principle; cleaning a riverbank is a Fundamental Duty; a court ordering a clerk is a writ',
  'Ask: who is addressed, and can a court enforce it?',
);
const vConflict = flow('LR', ['Directive Principle goal: fair distribution of land', 'Land reform laws passed', 'Challenged as violating the right to property', 'Amendments followed; the 44th Amendment in 1978'], 'Flow: a Directive Principle goal of fair land distribution led to land reform laws, which were challenged as violating the then right to property, and amendments followed, including the 44th Amendment in 1978', 'Where the two parts met in conflict');
const vHarmony = table(
  ['View', 'Meaning'],
  [
    ['Conflict', 'A right and a principle appear to pull in different directions'],
    ['Harmony', 'Courts try to read the two together so that neither is wholly ignored'],
    ['Minerva Mills (1980)', 'A case cited for this balanced approach'],
  ],
  'Table about conflict and harmony between Fundamental Rights and Directive Principles: conflict when they pull apart, harmony when read together, and the Minerva Mills case of 1980 cited for this approach',
);
const vDuties = table(
  ['Duty (in brief)', 'Example'],
  [
    ['Respect the Constitution, the National Flag and the Anthem', 'Standing in respect at a school assembly'],
    ['Protect and improve the natural environment', 'Planting saplings near the school'],
    ['Safeguard public property and give up violence', 'Not damaging benches in a park'],
    ['Develop scientific temper and humanism', 'Asking for evidence before believing a rumour'],
    ['Parent or guardian to provide education to a child aged 6 to 14', 'Sending a child to school (the 11th duty, 2002)'],
  ],
  'Table of Fundamental Duties with examples: respecting the Constitution and national symbols, protecting the environment, safeguarding public property, developing scientific temper, and a parent or guardian providing education to a child aged 6 to 14',
  'Article 51A; ten duties in 1976 and an eleventh in 2002 (as of 2024, eleven).',
);
const vFiveMark = table(
  ['Point', 'Fundamental Rights versus Directive Principles'],
  [
    ['1', 'Part III against Part IV'],
    ['2', 'Justiciable against non-justiciable'],
    ['3', 'Restrain the government against direct it'],
    ['4', 'Individuals against welfare of society'],
    ['5', 'Conflict and harmony: property and Minerva Mills'],
  ],
  'Worked example table planning a five-mark comparison: Part III against Part IV, justiciable against non-justiciable, restrain against direct, individuals against society, and conflict and harmony',
  'Five points of about 20 words each.',
);
const vSum2 = table(
  ['Topic', 'Key points'],
  [
    ['Directive Principles', 'Part IV; non-justiciable; goals, policies, non-justiciable rights'],
    ['Relation', 'Rights restrain, principles direct; conflict over property; read in harmony'],
    ['Fundamental Duties', 'Article 51A; 42nd Amendment 1976; eleventh duty in 2002; not enforceable like rights'],
  ],
  'Summary table of Part 2: Directive Principles, their relation to rights, and Fundamental Duties',
);
const vTips2 = table(
  ['Common mistake', 'Write instead'],
  [
    ['Directive Principles can be enforced by courts', 'They are non-justiciable but fundamental in governance'],
    ['Duties were added in 1978', 'Duties were added in 1976 by the 42nd Amendment'],
    ['Article 21A and early childhood care are the same', 'Article 21A is a right for 6 to 14; early childhood care below six is a Directive Principle'],
  ],
  'Table of common mistakes in Part 2 and what to write instead',
);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Rights in the Indian Constitution, Part 1: Fundamental Rights',
  goals: [
    'Define a right, a bill of rights and justiciable',
    'Explain the six categories of Fundamental Rights and their Articles',
    'Explain Article 32 and the five writs',
    'State the position of the right to property and the role of the National Human Rights Commission',
  ],
  slides: [
    sl('title', 'Fundamental Rights', {
      b: 'Part 1: what **rights** are, the **six categories** of Fundamental Rights, and the **writs** that protect them.',
      v: flow('LR', ['What is a right', 'Six categories', 'Constitutional remedies', 'Writs', 'Property and the Commission'], 'Route map of Part 1: what is a right, six categories, constitutional remedies, writs, and property and the Commission', 'Part 1 at a glance'),
      n: 'A right is only worth something if it can be claimed. In this part we meet the Fundamental Rights of the Indian Constitution, look at the six categories one by one, and see how a citizen can go to court when a right is violated. We also look at the right to property and at the National Human Rights Commission.',
    }),
    sl('concept', 'What is a right?', {
      v: vWhat,
      n: 'A right is a claim that society and the law recognise. A bill of rights is a list of such rights in a constitution which the government is not allowed to violate. In India, this list is called the Fundamental Rights and is found in Part three of the Constitution. These rights are justiciable, which means that a court can enforce them.',
    }),
    sl('diagram', 'The six categories', {
      v: vSix,
      n: 'The Fundamental Rights fall into six groups. Equality covers Articles fourteen to eighteen. Freedom covers nineteen to twenty two. Exploitation is twenty three and twenty four. Religion is twenty five to twenty eight. Cultural and educational rights are twenty nine and thirty. The last group, constitutional remedies, is Article thirty two, which lets people go to court.',
    }),
    sl('concept', 'Right to Equality', {
      v: vEquality,
      n: 'Article fourteen says everyone is equal before the law and has equal protection of the laws. Article fifteen bars discrimination on grounds of religion, race, caste, sex or place of birth. Article sixteen gives equal opportunity in public employment. Article seventeen abolishes untouchability, and Article eighteen abolishes titles. Special provisions for women, children and backward groups are allowed.',
    }),
    sl('check', 'Quick check: which right?', {
      b: 'A restaurant owner refuses to serve a customer because of caste. Which right is violated?',
      chk: 'm_hotel',
      n: 'Think about which category deals with discrimination on grounds such as caste.',
    }),
    sl('concept', 'Right to Freedom: Article 19', {
      v: vFreedom,
      n: 'Article nineteen gives citizens six freedoms: speech and expression, peaceful assembly without arms, forming associations, moving freely and living in any part of the country, and following a profession. They are not absolute. The State may place reasonable restrictions, for example for public order or the security of the State, so that one person\'s freedom does not harm others.',
    }),
    sl('concept', 'Articles 20, 21, 21A and 22', {
      v: vLife,
      n: 'Article twenty protects a person from unfair punishment for an offence. Article twenty one protects life and personal liberty. Article twenty one A, added by the eighty sixth Amendment in two thousand two, gives children aged six to fourteen free and compulsory education. Article twenty two protects against arbitrary arrest and detention, with special rules for preventive detention.',
    }),
    sl('example', 'Worked example 1: applying Article 22', {
      b: 'Kavita\'s brother is arrested in the imagined town of Nandanpur. List the safeguards that must be followed.',
      bl: ['**Grounds** must be told to him', 'He may **consult a lawyer** of choice', 'He must be **produced before a magistrate within 24 hours**'],
      v: vArrestSteps,
      n: 'Let us apply Article twenty two to an imagined arrest. First, the police must tell the person why he is arrested. Second, he may consult a lawyer of his choice. Third, he must be produced before a magistrate within twenty four hours, not counting travel time. Without the magistrate\'s order he cannot be held longer. Preventive detention follows special rules.',
    }),
    sl('concept', 'Right against Exploitation', {
      v: vExploit,
      n: 'Article twenty three prohibits traffic in human beings and forced labour, called begar. Someone made to work without pay because of a debt is a victim of this wrong. Article twenty four prohibits employing children below fourteen years in factories, mines and other hazardous work. Together the two Articles protect the weakest from being treated as goods.',
    }),
    sl('concept', 'Religion, culture and education', {
      v: vRelCult,
      n: 'Articles twenty five to twenty eight protect freedom of religion. A person may profess, practise and propagate a religion, subject to public order, morality and health. No one can be forced to pay tax for a religion, or to join religious worship in an institution funded wholly by the State. Articles twenty nine and thirty protect language and culture, and let minorities run their own educational institutions.',
    }),
    sl('check', 'Quick check: match the Articles', {
      b: 'Match each group of Articles with the right it forms.',
      chk: 'mt_cats',
      n: 'Recall the six categories and the numbers of the Articles in each.',
    }),
    sl('diagram', 'Right to Constitutional Remedies', {
      v: vRemedy,
      n: 'A right without a remedy is only words. Article thirty two lets a person go straight to the Supreme Court when a Fundamental Right is violated, and Article two twenty six gives the High Courts a similar power. Dr Ambedkar regarded Article thirty two as the most important Article, because it makes the other rights real. The court issues writs to enforce rights.',
    }),
    sl('diagram', 'The five writs', {
      v: vWrits,
      n: 'A writ is a written order of a court. Habeas corpus orders that a detained person be produced before the court. Mandamus orders an official to do a legal duty. Prohibition stops a lower court from going beyond its power. Quo warranto asks by what authority someone holds a public office. Certiorari quashes an order that a lower body passed without authority.',
    }),
    sl('check', 'Quick check: which writ?', {
      b: 'A mother says her son is held in an unknown place with no charge. Which writ should she seek?',
      chk: 'm_habeas',
      n: 'Think about the writ that asks the court to see the person held.',
    }),
    sl('example', 'Worked example 2: matching writs', {
      b: 'Match each imagined situation to the writ the court would use.',
      v: vWritCase,
      n: 'Read each situation and ask what the court needs to do. If a person is held without charge, the court asks for the person: habeas corpus. If an official ignores a duty, it commands him: mandamus. If a tribunal goes beyond its powers, the court stops it: prohibition. If a post is held without qualification, the court questions the holder: quo warranto. If an order is bad, it quashes it: certiorari.',
    }),
    sl('diagram', 'The right to property', {
      v: vProperty,
      n: 'The Constitution first listed the right to property among the Fundamental Rights. Land reform laws, which aimed at fairer distribution of land, were challenged as violating this right. The forty fourth Amendment of nineteen seventy eight removed it from Part three. Today it is a legal, or constitutional, right under Article three hundred A: property can be taken only by authority of law.',
    }),
    sl('concept', 'The National Human Rights Commission', {
      v: vNHRC,
      n: 'The National Human Rights Commission was set up in nineteen ninety three. It inquires into complaints of violation of human rights, recommends action to the authorities, and works to spread awareness. It cannot itself punish anyone; punishing is the work of the courts. It supports, but does not replace, the remedies in Articles thirty two and two twenty six.',
    }),
    sl('check', 'Quick check: put the steps in order', {
      b: 'Arrange the steps that follow the violation of a Fundamental Right.',
      chk: 'ord_remedy',
      n: 'Start with the violation and end with the authority obeying the order.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSum1,
      n: 'To sum up. Rights are claims recognised by society and law, and the Fundamental Rights of Part three are justiciable. There are six categories. Citizens can go to the Supreme Court under Article thirty two and to the High Courts under Article two twenty six, and the courts issue five writs. Property is now a legal right, and the Commission of nineteen ninety three recommends action on violations.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['Give the **Article number** with each right', 'Define each writ in **one line**, then give a situation', 'Property: **44th Amendment, 1978; Article 300A**', 'Support each point with an example'],
      v: vTips1,
      n: 'A few tips. Always give the Article number with each right. Define each writ in one line and then give a situation that shows it. For property, remember the forty fourth Amendment of nineteen seventy eight and Article three hundred A. And in longer answers, support each point with a short example.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Rights in the Indian Constitution, Part 2: Directive Principles and Fundamental Duties',
  goals: [
    'Explain the Directive Principles and why they are non-justiciable',
    'Describe the groups of Directive Principles with examples',
    'Relate Fundamental Rights and Directive Principles',
    'State the Fundamental Duties and how they were added',
  ],
  slides: [
    sl('title', 'Directive Principles and Duties', {
      b: 'Part 2: the **Directive Principles** of Part IV, how they relate to **rights**, and the **Fundamental Duties**.',
      v: flow('LR', ['What the principles are', 'Groups and examples', 'Rights and principles', 'Conflict and harmony', 'Fundamental Duties'], 'Route map of Part 2: what the principles are, groups and examples, rights and principles, conflict and harmony, and Fundamental Duties', 'Part 2 at a glance'),
      n: 'Rights protect individuals. But a country also needs goals to work for. In this part we study the Directive Principles of State Policy, which guide the government. We compare them with Fundamental Rights, see how conflict and harmony between them developed, and finish with the Fundamental Duties of citizens.',
    }),
    sl('concept', 'What are the Directive Principles?', {
      v: vDP,
      n: 'The Directive Principles are in Part four of the Constitution, from Article thirty six to fifty one. They are guidelines that the government is expected to follow in making laws and policies. They are non justiciable: a court cannot enforce them. Even so, the Constitution calls them fundamental in the governance of the country.',
    }),
    sl('concept', 'Groups of Directive Principles', {
      v: vGroups,
      n: 'Textbooks usually place the principles in three groups. Goals are broad aims, such as the welfare of the people, justice, a better standard of living, fair distribution of resources and international peace. Policies guide laws, for example a uniform civil code, village panchayats and cottage industries. The third group, non justiciable rights, includes an adequate livelihood, equal pay for equal work and the right to work.',
    }),
    sl('check', 'Quick check: spot the principle', {
      b: 'A state passes a law to give village councils powers of self-government. What kind of provision is this?',
      chk: 'm_panchayat',
      n: 'Think about whether it is a right of individuals, a duty, or a guideline to the government.',
    }),
    sl('concept', 'Some principles by Article', {
      v: vGoalsPol,
      n: 'Here are some principles by Article. Article thirty nine covers an adequate livelihood, equal pay for equal work for men and women, and fair distribution of resources. Article forty is about village panchayats, and Article forty three about cottage industries. Article forty four lists a uniform civil code as one principle. Article forty five covers care and education for children below six, and Article fifty one covers international peace.',
    }),
    sl('example', 'Worked example 1: classify the item', {
      b: 'Decide whether each imagined item is a **right**, a **principle**, a **duty** or a **writ**.',
      bl: ['Who is addressed: the State or the citizen?', 'Can a court enforce it directly?'],
      v: vClassify,
      n: 'To classify, ask two questions. Who is addressed, the State or the citizen? And can a court enforce it directly? Freeing a person held without being told why is the Fundamental Right of Article twenty two. Training centres for cottage industries is a Directive Principle. A student cleaning a riverbank acts on a Fundamental Duty. A court ordering a clerk is a writ.',
    }),
    sl('diagram', 'Rights and principles compared', {
      v: vCompare,
      n: 'Compare the two parts. Fundamental Rights are in Part three and are justiciable. Directive Principles are in Part four and are not. Rights restrain the government: they say what it may not do. Principles direct the government: they say what it should work for. Rights protect individuals, while principles aim at the welfare of society as a whole.',
    }),
    sl('diagram', 'Where rights and principles met in conflict', {
      v: vConflict,
      n: 'Sometimes a right and a principle pulled in different directions. Fair distribution of land is a goal of the principles. But land reform laws were challenged as violating the then Fundamental Right to property. Such conflicts led to amendments, and in nineteen seventy eight the forty fourth Amendment removed property from the Fundamental Rights.',
    }),
    sl('check', 'Quick check: early childhood', {
      b: 'A state opens free play-and-learn centres for children below six. What does this carry out?',
      chk: 'm_ecce',
      n: 'Recall which age group Article twenty one A covers.',
    }),
    sl('concept', 'Reading the two in harmony', {
      v: vHarmony,
      n: 'Courts have tried to avoid choosing one part over the other. They have preferred to read the Fundamental Rights and the Directive Principles in harmony, so that neither is wholly ignored. The Minerva Mills case of nineteen eighty is often named in this connection. Remember its name and year; you are not asked for the details.',
    }),
    sl('diagram', 'Rights, duties and the Commission: key dates', {
      v: vTimeline,
      n: 'Here are the key dates. The Constitution came into force in nineteen fifty with Parts three and four. In nineteen seventy six the forty second Amendment added the Fundamental Duties. In nineteen seventy eight the forty fourth Amendment removed the property right from Part three. The Human Rights Commission followed in nineteen ninety three, and in two thousand two the eighty sixth Amendment added Article twenty one A and an eleventh duty.',
    }),
    sl('concept', 'Fundamental Duties: Article 51A', {
      v: vDuties,
      n: 'Fundamental Duties are obligations of citizens, set out in Article fifty one A. The forty second Amendment of nineteen seventy six added ten of them. The eighty sixth Amendment of two thousand two added an eleventh: a parent or guardian must provide opportunities for education to a child aged six to fourteen. Examples include respecting the Constitution and the Flag, protecting the environment and safeguarding public property. Unlike rights, duties are not enforceable in the same way.',
    }),
    sl('check', 'Quick check: which Amendment?', {
      b: 'Fill in: the ___ Amendment of 1976 added the Fundamental Duties.',
      chk: 'fb_42',
      n: 'The same Amendment passed in the middle of the nineteen seventies.',
    }),
    sl('example', 'Worked example 2: a five-mark answer', {
      b: 'Question: *Compare the Fundamental Rights and the Directive Principles.* Plan five points of about 20 words each.',
      v: vFiveMark,
      n: 'For a five mark comparison, give five points with one idea each. First, the part: Part three against Part four. Second, enforceability: justiciable against non justiciable. Third, role: rights restrain, principles direct. Fourth, aim: individuals against the welfare of society. Fifth, relation: conflict over property and the courts reading them in harmony. Bold the key word of each point.',
    }),
    sl('check', 'Quick check: order the developments', {
      b: 'Arrange four developments in the order in which they took place.',
      chk: 'ord_timeline',
      n: 'Use the timeline you have just seen.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSum2,
      n: 'To sum up. The Directive Principles in Part four guide the government and are non justiciable, but fundamental in governance. They fall into goals, policies and non justiciable rights. Rights restrain the government and principles direct it. Conflicts arose, as over property, and courts read the two in harmony. The Fundamental Duties of Article fifty one A were added in nineteen seventy six, with an eleventh in two thousand two.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['Directive Principles are **non-justiciable**: say so in every answer', 'Fundamental Duties: **42nd Amendment, 1976**; eleventh in **2002**', 'Compare in a **table of points**: part, enforceability, role, aim', 'Use **imagined examples** to show application'],
      v: vTips2,
      n: 'A few tips. In every answer on the Directive Principles, say that they are non justiciable. Remember the forty second Amendment of nineteen seventy six for the duties, and two thousand two for the eleventh. For comparisons, give separate points for part, enforceability, role and aim. And use a short example to show that you can apply the idea.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Rights in the Indian Constitution: Notes',
  sections: [
    {
      h: '1. Rights and the Fundamental Rights',
      t: 1,
      b: 'A **right** is a claim that is recognised by society and by law. A **bill of rights** is a list of rights set out in a constitution, which the government cannot violate. In India, the **Fundamental Rights** are found in **Part III** of the Constitution (Articles 12 to 35).\n\nThey are **justiciable**: a person whose right is violated can go to a court, and the court can enforce the right. They restrain the government and protect individuals.',
      terms: [
        ['Right', 'A claim recognised by society and protected by law.'],
        ['Bill of rights', 'A list of rights in a constitution which the government is not allowed to violate.'],
        ['Justiciable', 'Capable of being enforced by a court of law.'],
      ],
      v: vWhat,
    },
    {
      h: '2. The six categories',
      t: 1,
      b: '- **Right to Equality (14 to 18):** equality before law and equal protection of the laws; no discrimination on grounds of religion, race, caste, sex or place of birth; equality of opportunity in public employment; abolition of untouchability; abolition of titles.\n- **Right to Freedom (19 to 22):** Article 19 freedoms of speech and expression, assembly, association, movement, residence and profession, subject to reasonable restrictions; protection in respect of conviction (20); protection of life and personal liberty (21); education for children aged 6 to 14 (21A, 86th Amendment, 2002); protection against arbitrary arrest and detention (22), including preventive detention.\n- **Right against Exploitation (23 and 24):** prohibition of traffic in human beings and forced labour (begar); prohibition of employing children below 14 in factories, mines and hazardous work.\n- **Right to Freedom of Religion (25 to 28):** freedom to profess, practise and propagate religion, subject to public order, morality and health; management of religious affairs; no tax for a religion; no compulsory religious instruction in a fully State-funded institution.\n- **Cultural and Educational Rights (29 and 30):** protection of language, script and culture; the right of minorities to establish and administer educational institutions.\n- **Right to Constitutional Remedies (32):** the right to approach the Supreme Court for enforcement of the other rights.',
      terms: [
        ['Preventive detention', 'Detention of a person on suspicion that he or she may act in a way harmful to security or public order, in order to prevent the act rather than to punish it.'],
        ['Begar', 'Forced labour without payment.'],
        ['Reasonable restrictions', 'Limits placed by law on a freedom, for example for public order, so that one person\'s freedom does not harm others.'],
      ],
      v: vSix,
      vs: [vEquality],
    },
    {
      h: '3. Constitutional remedies and writs',
      t: 1,
      b: 'Under **Article 32** a person may go straight to the **Supreme Court**, and under **Article 226** to a **High Court**, when a Fundamental Right is violated. Dr Ambedkar regarded Article 32 as the most important Article, because without a remedy the other rights would have little meaning.\n\nThe courts issue **writs**, which are written orders. The five writs are shown below.',
      terms: [
        ['Writ', 'A written order of a court directing a person or authority to act or not to act.'],
        ['Habeas corpus', 'A writ, meaning to have the body, ordering that a detained person be produced before the court so the legality of the detention can be examined.'],
        ['Mandamus', 'A writ, meaning we command, ordering a public official or body to perform a legal duty.'],
        ['Prohibition', 'A writ by which a higher court stops a lower court or tribunal from acting beyond its jurisdiction.'],
        ['Quo warranto', 'A writ, meaning by what authority, asking a person to show the legal authority to hold a public office.'],
        ['Certiorari', 'A writ by which a higher court quashes an order that a lower court or tribunal passed without authority.'],
      ],
      v: vWrits,
      vs: [vRemedy],
    },
    {
      h: '4. Property and the Human Rights Commission',
      t: 1,
      b: 'The right to property was at first a Fundamental Right. Land reform laws were challenged as violating it. The **44th Amendment (1978)** removed it from Part III. It is now a **legal (constitutional) right** under **Article 300A**: no person can be deprived of property except by authority of law.\n\nThe **National Human Rights Commission** was set up in **1993**. It inquires into violations of human rights and recommends action. It cannot punish; punishment is for the courts.',
      terms: [
        ['Article 300A', 'The provision under which a person cannot be deprived of property except by authority of law.'],
        ['National Human Rights Commission', 'A statutory body set up in 1993 that inquires into violations of human rights and recommends action.'],
      ],
      v: vProperty,
      vs: [vNHRC],
    },
    {
      h: '5. Directive Principles of State Policy',
      t: 2,
      b: 'The **Directive Principles** are in **Part IV** (Articles 36 to 51). They are guidelines for the government in making laws and policies. They are **non-justiciable**: courts cannot enforce them. They are, however, fundamental in the governance of the country.\n\n- **Goals:** welfare of the people; social, economic and political justice; a higher standard of living; fair distribution of resources; international peace.\n- **Policies:** a uniform civil code (listed as one principle); prohibition of intoxicants; cottage industries; care of useful cattle; village panchayats.\n- **Non-justiciable rights:** adequate livelihood; equal pay for equal work for men and women; protection against economic exploitation; the right to work; early childhood care and education for children below six.',
      terms: [
        ['Directive Principles of State Policy', 'Guidelines in Part IV for the government in making laws and policies; they cannot be enforced by courts.'],
        ['Non-justiciable', 'Not enforceable by a court of law.'],
      ],
      v: vGroups,
    },
    {
      h: '6. Rights, principles and duties',
      t: 2,
      b: '**Rights restrain** the government; **principles direct** it. Rights protect **individuals**; principles promote the **welfare of society**. Conflicts arose, for example over **property and land reform**, and amendments followed. Courts have tried to read the two in **harmony**; the **Minerva Mills** case (1980) is cited in this connection.\n\n**Fundamental Duties (Article 51A):** added by the **42nd Amendment (1976)**, with ten duties. The **86th Amendment (2002)** added an eleventh: a parent or guardian to provide opportunities for education to a child aged 6 to 14. Examples: respect the Constitution, the National Flag and the Anthem; protect and improve the natural environment; safeguard public property; develop scientific temper. Duties are not enforceable in the way rights are. (As of 2024, there are eleven duties.)',
      terms: [
        ['Fundamental Duties', 'Obligations of citizens listed in Article 51A of the Constitution; they are not enforceable in the way rights are.'],
        ['Harmonious reading', 'The approach of courts that reads the Fundamental Rights and the Directive Principles together, so that neither is wholly ignored.'],
      ],
      v: vCompare,
      vs: [vTimeline],
    },
  ],
  tips: '**Common mistakes**\n- Calling property a Fundamental Right today: since 1978 it is a legal right under Article 300A.\n- Mixing up the writs: habeas corpus (produce the person), mandamus (do the duty), prohibition (stop), quo warranto (by what authority), certiorari (quash).\n- Saying Directive Principles are enforceable: they are non-justiciable.\n- Writing that the Fundamental Duties were added in 1978: it was 1976.\n\n**Tips:** give the Article number with each right; define each key term in one line; for a five-mark comparison give five separate points; use a short imagined example to show application.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['What is a **right**?', 'A claim recognised by society and by law.', 'definition', 1],
  ['What is a **bill of rights**?', 'A list of rights in a constitution which the government cannot violate.', 'definition', 1],
  ['Where are the **Fundamental Rights** placed?', '**Part III** of the Constitution.', 'fact', 1],
  ['What does **justiciable** mean?', 'Enforceable by a court of law.', 'definition', 1],
  ['**Right to Equality**: Articles?', '**14 to 18**', 'fact', 1],
  ['**Right to Freedom**: Articles?', '**19 to 22**', 'fact', 1],
  ['**Right against Exploitation**: Articles?', '**23 and 24**', 'fact', 1],
  ['**Freedom of Religion**: Articles?', '**25 to 28**', 'fact', 1],
  ['**Cultural and Educational Rights**: Articles?', '**29 and 30**', 'fact', 1],
  ['**Constitutional Remedies**: Article?', '**Article 32** (and Article 226 for High Courts)', 'fact', 1],
  ['What does Article 17 do?', 'Abolishes **untouchability**.', 'fact', 1],
  ['Name the freedoms in **Article 19**.', 'Speech and expression, assembly, association, movement, residence, profession; subject to reasonable restrictions.', 'concept', 1],
  ['What is **Article 21A**?', 'Free and compulsory education for children aged **6 to 14**; added by the **86th Amendment, 2002**.', 'fact', 1],
  ['What is **preventive detention**?', 'Detention on suspicion of a future act harmful to security or public order, to prevent it rather than punish it.', 'definition', 1],
  ['Safeguards on arrest (**Article 22**)', 'Told the grounds; a lawyer of choice; produced before a magistrate within **24 hours** (excluding travel).', 'concept', 1],
  ['What is **begar**?', 'Forced labour without payment; prohibited by Article 23.', 'definition', 1],
  ['What does **Article 24** prohibit?', 'Employing children **below 14** in factories, mines and hazardous work.', 'fact', 1],
  ['Why is Article 32 called the most important right by Dr Ambedkar?', 'Without a remedy, the other rights would be only declarations; Article 32 makes them enforceable.', 'concept', 1],
  ['**Habeas corpus**', 'Produce a detained person before the court.', 'definition', 1],
  ['**Mandamus**', 'Orders an official to perform a legal duty.', 'definition', 1],
  ['**Prohibition**', 'A higher court stops a lower court acting beyond its power.', 'definition', 1],
  ['**Quo warranto**', 'By what authority? Tests the claim to a public office.', 'definition', 1],
  ['**Certiorari**', 'A higher court quashes an order passed without authority.', 'definition', 1],
  ['Status of the **right to property** today', 'A legal right under **Article 300A**; removed from Part III by the **44th Amendment (1978)**.', 'fact', 1],
  ['**National Human Rights Commission**', 'Set up in **1993**; inquires into violations and recommends action; cannot punish.', 'fact', 1],
  ['What are the **Directive Principles**?', 'Guidelines in **Part IV** for the government; **non-justiciable** but fundamental in governance.', 'definition', 2],
  ['Three groups of Directive Principles', 'Goals; policies; non-justiciable rights.', 'concept', 2],
  ['Give two non-justiciable rights among the principles', 'Equal pay for equal work for men and women; the right to work (also adequate livelihood).', 'concept', 2],
  ['Rights versus principles: role', 'Rights **restrain** the government; principles **direct** it.', 'concept', 2],
  ['A case cited for reading the two in harmony', 'Minerva Mills (1980), named only.', 'fact', 2],
  ['When were the **Fundamental Duties** added?', '**42nd Amendment, 1976**: Article 51A, ten duties; the 86th Amendment (2002) added an eleventh.', 'fact', 2],
  ['The **eleventh duty**', 'A parent or guardian to provide opportunities for education to a child aged 6 to 14.', 'fact', 2],
  ['Are Fundamental Duties enforceable like rights?', 'No; they are obligations of citizens that are not enforceable in the same way.', 'concept', 2],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-11-default-chapter-test-short',
  title: 'Chapter test (short): Rights in the Indian Constitution',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A: Objective (1 mark each)', instr: 'Questions 1 to 4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_bill', 'm_prayer', 'm_dp_nature', 'ar_justiciable'] },
    { id: 'B', title: 'Section B: Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30 to 50 words and the 3-mark question in about 50 to 80 words.', items: ['s_exploit', 's_dp_def', 's3_arrest'] },
    { id: 'C', title: 'Section C: Long answer (5 marks)', instr: 'Answer any ONE of the two questions in about 80 to 120 words.', items: [{ attempt: 1, keys: ['l_freedom', 'l_fr_dp'] }] },
    { id: 'D', title: 'Section D: Case-based (4 marks)', instr: 'Read the passage and answer all parts. Part (c) has an internal choice.', items: ['c_kiln'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-11-default-chapter-test-long',
  title: 'Chapter test (long): Rights in the Indian Constitution',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A: Objective (1 mark each)', instr: 'Questions 1 to 10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_part3', 'm_minority', 'm_mandamus', 'm_property', 'm_nhrc', 'm_fr_dp', 'm_duty_enf', 'm_court_dp', 'ar_dp_force', 'ar_property'] },
    { id: 'B', title: 'Section B: Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30 to 50 words and 3-mark questions in about 50 to 80 words. Questions 13 and 15 have an internal choice.', items: ['s_duties_two', 's_property', { attempt: 1, keys: ['s_21a_when', 's_restrict'] }, 's3_equality', { attempt: 1, keys: ['s3_dp_groups', 's3_conflict'] }] },
    { id: 'C', title: 'Section C: Long answer (5 marks)', instr: 'Answer question 16, and any ONE of questions 17 and 18, in about 80 to 120 words each.', items: ['l_writs', { attempt: 1, keys: ['l_dp_kinds', 'l_duties_eval'] }] },
    { id: 'D', title: 'Section D: Case-based (4 marks each)', instr: 'Read each passage and answer all parts. Part (c) of each has an internal choice.', items: ['c_debate', 'c_letter'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01 and t02 of cbse-11-political-science-ch02 only (Fundamental Rights, writs, property, NHRC; Directive Principles, their relation to rights, Fundamental Duties)',
    originality: 'every passage (newspaper report, school debate, letter, notice board) is imagined, written by SOYL and labelled; no NCERT text, boxed source or cartoon, no Constitution text, judgment text or board item reused (D-036)',
    facts: 'stable facts only: Part III, Part IV, Articles 14 to 32, 51A, 226 and 300A; 42nd Amendment 1976; 44th Amendment 1978; NHRC 1993; 86th Amendment 2002; Minerva Mills 1980 by name only; eleven duties as of 2024',
    neutrality: 'a uniform civil code, prohibition of intoxicants and care of cattle are listed only as principles; no pending case or current dispute is discussed',
    gate: 'schema, content lint (lintExemplar) and the deterministic verify checks run clean on this chapter',
  },
});
