// Build CBSE 11 Political Science ch08 Local Governments. Run from platform/:
//   npx tsx content/authored/social-science/cbse-11-political-science-ch08/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from '../../cbse-11-political-science-ch01/src/lib.mjs';

setUnit('cbse-11-political-science-ch08', 'social-science');
await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- SVG figures (no maps)
const vTiers = (() => {
  const s = new Svg(760, 380);
  const tier = (y, name, level, note, col) => {
    s.rect(200, y, 360, 62, { color: col, sw: 2.5 });
    s.text(380, y + 22, name, { bold: true, size: 17, color: col });
    s.text(380, y + 46, level, { size: 13 });
    s.text(580, y + 31, note, { anchor: 'start', size: 13 });
  };
  tier(10, 'Zila parishad', 'District level', 'Top tier', 'brown');
  tier(110, 'Panchayat samiti', 'Block or intermediate level', 'Optional if the state', 'green');
  s.text(580, 141 + 18, 'has under 20 lakh people', { anchor: 'start', size: 13 });
  tier(210, 'Gram panchayat', 'Village level', 'Elected every five years', 'blue');
  s.rect(200, 305, 360, 56, { color: 'accent', sw: 2.5 });
  s.text(380, 325, 'Gram sabha', { bold: true, size: 16, color: 'accent' });
  s.text(380, 347, 'All adult voters of the village', { size: 13 });
  s.arrow(380, 210, 380, 172, { sw: 1.8, color: 'muted' });
  s.arrow(380, 110, 380, 72, { sw: 1.8, color: 'muted' });
  s.arrow(380, 305, 380, 272, { sw: 1.8, color: 'muted' });
  s.text(150, 41, '3', { bold: true, size: 20, color: 'brown' });
  s.text(150, 141, '2', { bold: true, size: 20, color: 'green' });
  s.text(150, 241, '1', { bold: true, size: 20, color: 'blue' });
  return s.visual('Structure chart of the three tiers of panchayati raj with the gram sabha at the base. At the top is the zila parishad at district level. In the middle is the panchayat samiti at block or intermediate level, which is optional if the state has under 20 lakh people. Below it is the gram panchayat at village level, elected every five years. At the base is the gram sabha, made up of all adult voters of the village', 'The three tiers of panchayati raj.');
})();

const vCompare = (() => {
  const s = new Svg(760, 400);
  const col = (x, title, sub, rows, c) => {
    s.rect(x, 10, 350, 380, { color: c, sw: 2.5 });
    s.text(x + 175, 38, title, { bold: true, size: 18, color: c });
    s.text(x + 175, 62, sub, { size: 14 });
    s.line(x + 20, 80, x + 330, 80, { sw: 1.2, color: 'muted' });
    rows.forEach(([h, t], i) => {
      const y = 104 + i * 58;
      s.text(x + 175, y, h, { bold: true, size: 14 });
      s.text(x + 175, y + 22, t, { size: 13 });
    });
  };
  col(20, 'Rural bodies', '73rd Amendment', [
    ['Bodies', 'Gram panchayat, panchayat samiti, zila parishad'],
    ['Base', 'Gram sabha of all adult voters'],
    ['Schedule', 'Eleventh Schedule: 29 subjects'],
    ['In force', '24 April 1993'],
    ['Extension', 'PESA 1996: tribal areas'],
  ], 'green');
  col(390, 'Urban bodies', '74th Amendment', [
    ['Bodies', 'Nagar panchayat, council, corporation'],
    ['Base', 'Ward committees in larger municipalities'],
    ['Schedule', 'Twelfth Schedule: 18 subjects'],
    ['In force', '1 June 1993'],
    ['Common', 'Reservation, terms, Commissions'],
  ], 'blue');
  return s.visual('Comparison chart of rural and urban local bodies. Rural bodies, under the 73rd Amendment: gram panchayat, panchayat samiti and zila parishad; the gram sabha of all adult voters as the base; the Eleventh Schedule with 29 subjects; in force on 24 April 1993; extended to Fifth Schedule areas by PESA in 1996. Urban bodies, under the 74th Amendment: nagar panchayat, municipal council and municipal corporation; ward committees in larger municipalities; the Twelfth Schedule with 18 subjects; in force on 1 June 1993. Common to both: reservation, five-year terms, and the State Election Commission and State Finance Commission', 'Rural and urban local bodies compared.');
})();

const vTimeline = (() => {
  const s = new Svg(800, 300);
  const pts = [
    ['1882', 'Ripon\'s resolution', 'local self-government'],
    ['1919', 'Government of India', 'Act: village panchayats'],
    ['1952', 'Community Development', 'Programme'],
    ['1957', 'Balwantrai Mehta', 'Committee: three tiers'],
    ['1986', 'L. M. Singhvi', 'Committee: constitutional status'],
    ['1992', '73rd and 74th', 'Amendments passed'],
    ['1993', 'Amendments', 'come into force'],
    ['1996', 'PESA for', 'Scheduled Areas'],
  ];
  s.arrow(30, 150, 775, 150, { sw: 2.5 });
  pts.forEach(([yr, l1, l2], i) => {
    const x = 70 + i * 96;
    const up = i % 2 === 0;
    s.dot(x, 150, 6, 'accent');
    s.line(x, 150, x, up ? 108 : 192, { sw: 1.3, color: 'muted' });
    s.text(x, up ? 96 : 204, yr, { bold: true, size: 17, color: 'accent' });
    s.text(x, up ? 70 : 228, l1, { size: 12 });
    s.text(x, up ? 52 : 246, l2, { size: 12 });
  });
  return s.visual('Timeline of the growth of local government: 1882, Lord Ripon\'s resolution on local self-government; 1919, the Government of India Act and village panchayats in some provinces; 1952, the Community Development Programme; 1957, the Balwantrai Mehta Committee recommends three tiers; 1986, the L. M. Singhvi Committee recommends constitutional status; 1992, the 73rd and 74th Amendments are passed; 1993, the Amendments come into force; 1996, the Panchayats (Extension to Scheduled Areas) Act', 'From 1882 to 1996.');
})();

const vBars = (() => {
  const s = new Svg(760, 360);
  const items = [
    ['Union grant', 16, 'brown'],
    ['State grant', 18, 'blue'],
    ['Own taxes and fees', 4, 'green'],
    ['Rent and other', 2, 'red'],
  ];
  const left = 90, top = 40, h = 240, w = 560;
  s.arrow(left, top + h, left + w + 20, top + h, { sw: 1.6 });
  s.arrow(left, top + h, left, top - 10, { sw: 1.6 });
  s.text(left, top - 24, 'Income in lakh rupees (imagined, one year)', { anchor: 'start', size: 13 });
  [0, 5, 10, 15, 20].forEach((v) => {
    const y = top + h - (v / 20) * h;
    s.line(left - 5, y, left, y, { sw: 1.2 });
    s.text(left - 10, y, String(v), { anchor: 'end', size: 12 });
    if (v > 0) s.line(left, y, left + w, y, { sw: 0.8, color: 'muted', dash: true });
  });
  items.forEach(([name, v, c], i) => {
    const bw = 90;
    const x = left + 40 + i * 135;
    const bh = (v / 20) * h;
    s.rect(x, top + h - bh, bw, bh, { color: c, sw: 2, rx: 3, fill: c, fillOpacity: 0.35 });
    s.text(x + bw / 2, top + h - bh - 14, String(v), { bold: true, size: 15 });
    s.text(x + bw / 2, top + h + 20, name, { size: 13 });
  });
  s.text(left + w / 2, top + h + 48, 'Grants: 34 of 40 lakh. Own revenue: 6 of 40 lakh.', { size: 13, muted: true });
  return s.visual('Bar chart of the imagined annual income of Madhupur gram panchayat in lakh rupees: Union grant 16, state grant 18, own taxes and fees 4, rent and other income 2. Grants make up 34 of the 40 lakh rupees and own revenue 6 of 40', 'An imagined panchayat budget: income sources.');
})();

// ---------------------------------------------------------------- tables and flows: Part 1
const vWhy = table(
  ['Reason', 'What it means'],
  [
    ['Closeness to the people', 'Decisions about lanes, water and schools are taken near those affected'],
    ['Local knowledge', 'Residents know their own problems and what will work'],
    ['Participation', 'Ordinary citizens can attend meetings, vote and stand for office'],
    ['Grassroots democracy', 'Democracy reaches below the state level, to the village and the ward'],
  ],
  'Table of four reasons for local government: closeness to the people, local knowledge, participation and grassroots democracy',
);
const vEarly = table(
  ['Step', 'What it did'],
  [
    ['1882', 'Lord Ripon\'s resolution encouraged local self-government bodies'],
    ['1919', 'The Government of India Act led to village panchayats in some provinces'],
    ['Result', 'Local bodies existed, but their powers and funds were small'],
  ],
  'Table of early steps: the 1882 resolution of Lord Ripon encouraged local self-government; the Government of India Act 1919 led to village panchayats in some provinces; local bodies had small powers and funds',
);
const vSwaraj = table(
  ['Idea or provision', 'Meaning'],
  [
    ['Gram swaraj (Gandhi)', 'Villages should be largely self-governing communities, running their own affairs'],
    ['Article 40', 'A Directive Principle: the State should take steps to organise village panchayats and give them the powers to work as units of self-government'],
    ['Nature of a Directive Principle', 'Guides the State; it cannot be enforced in a court'],
  ],
  'Table on gram swaraj and Article 40: Gandhi\'s idea that villages should be largely self-governing, and Article 40, a Directive Principle asking the State to organise village panchayats; Directive Principles guide the State and are not enforceable in court',
);
const vCdp = table(
  ['Step', 'What it did'],
  [
    ['1952', 'The Community Development Programme aimed at the all-round development of villages with people\'s participation'],
    ['1957', 'The Balwantrai Mehta Committee studied the programme and recommended a three-tier system of rural local government'],
    ['Result', 'Several states set up panchayats, but powers and elections varied widely'],
  ],
  'Table on the Community Development Programme of 1952 and the Balwantrai Mehta Committee of 1957, which recommended a three-tier system; several states set up panchayats but powers and elections varied widely',
);
const vRoad = flow('LR', ['1986: the L. M. Singhvi Committee recommends constitutional status', '1992: the 73rd and 74th Amendments are passed', '1993: the Amendments come into force'], 'Flow of the road to the Amendments: in 1986 the L. M. Singhvi Committee recommends constitutional status, in 1992 the 73rd and 74th Amendments are passed, and in 1993 they come into force', 'The road to the Amendments');
const vSabha = table(
  ['Body', 'Members', 'Role'],
  [
    ['Gram sabha', 'All adult voters of the village', 'Meets to discuss plans, accounts and needs of the village'],
    ['Gram panchayat', 'Members elected by the voters', 'Runs village affairs and answers to the gram sabha'],
  ],
  'Table comparing the gram sabha, made up of all adult voters of the village and meeting to discuss plans and accounts, with the gram panchayat, whose members are elected and which runs village affairs and answers to the gram sabha',
);
const vSmall = table(
  ['Question about imagined Tarangpur (15 lakh people)', 'Answer'],
  [
    ['Must it have gram panchayats?', 'Yes, at village level'],
    ['Must it have a zila parishad?', 'Yes, at district level'],
    ['Must it have a panchayat samiti?', 'No: states below 20 lakh need not have the intermediate tier'],
    ['If its population were 40 lakh?', 'Yes, all three tiers are needed'],
  ],
  'Worked example table: imagined Tarangpur with 15 lakh people must have gram panchayats and a zila parishad but need not have a panchayat samiti, since states below 20 lakh need not have the intermediate tier; with 40 lakh people all three tiers would be needed',
  'The limit is a population of 20 lakh.',
);
const vElect = table(
  ['Point', 'Provision'],
  [
    ['Method', 'Direct elections at all three levels'],
    ['Term', 'Five years'],
    ['If dissolved', 'Fresh elections within six months'],
    ['Who conducts them', 'The State Election Commission'],
    ['Why it matters', 'No long gaps without elected bodies'],
  ],
  'Table on elections: direct elections at all three levels, a term of five years, fresh elections within six months of dissolution, conducted by the State Election Commission, so that there are no long gaps without elected bodies',
);
const vReserve = table(
  ['Group', 'Reservation in panchayats'],
  [
    ['Scheduled Castes and Scheduled Tribes', 'Seats and chairpersons\' posts in proportion to their population'],
    ['Women', 'At least one-third of seats and chairpersons\' posts; many states provide half'],
    ['Backward classes', 'Left to the states to decide'],
  ],
  'Table on reservation in panchayats: seats and chairpersons\' posts for Scheduled Castes and Scheduled Tribes in proportion to population; at least one-third for women, and many states provide half; reservation for backward classes is left to the states',
);
const vResEx = table(
  ['Step', 'Imagined zila parishad of Varunadesh with 45 seats'],
  [
    ['1. The rule', 'At least one-third of seats for women'],
    ['2. The sum', 'One-third of 45 is 15'],
    ['3. The minimum', 'At least 15 seats for women'],
    ['4. If the state gives half', 'About 23 seats, which is allowed because the Constitution sets a minimum'],
  ],
  'Worked example table: an imagined zila parishad with 45 seats must reserve at least one-third, which is 15 seats, for women; a state that gives half would reserve about 23 seats, which is allowed since one-third is a minimum',
  'One-third is a floor, not a ceiling.',
);
const vFin = table(
  ['Provision', 'What it does'],
  [
    ['State Finance Commission', 'Set up every five years to review panchayat finances and suggest sharing of funds'],
    ['Eleventh Schedule', '29 subjects that may be transferred to panchayats, such as agriculture, drinking water, primary education, roads and markets'],
    ['PESA, 1996', 'Extends the provisions to Fifth Schedule (tribal) areas, with adaptations'],
  ],
  'Table of finance and subjects: the State Finance Commission reviews panchayat finances every five years; the Eleventh Schedule lists 29 subjects that may be transferred to panchayats; PESA of 1996 extends the provisions to Fifth Schedule areas with adaptations',
);
const vSum1 = table(
  ['Topic', 'Key points'],
  [
    ['Why', 'Closeness, local knowledge, participation, grassroots democracy'],
    ['Growth', '1882, 1919, Gandhi, Article 40, 1952, 1957, 1986'],
    ['73rd Amendment', 'Passed 1992; in force 24 April 1993; three tiers; gram sabha'],
    ['Elections and reservation', 'Five years; six months after dissolution; SC and ST; one-third women'],
    ['Finance and subjects', 'State Election and Finance Commissions; 29 subjects; PESA 1996'],
  ],
  'Summary table of Part 1: reasons for local government, growth, the 73rd Amendment, elections and reservation, and finance and subjects',
);
const vTips1 = table(
  ['Common mistake', 'Write instead'],
  [
    ['The gram sabha is the elected panchayat', 'The gram sabha is all adult voters of the village'],
    ['Every state must have three tiers', 'States below 20 lakh people need not have the intermediate tier'],
    ['One-third is the exact share for women', 'One-third is the minimum; many states give half'],
  ],
  'Table of common mistakes in Part 1 and what to write instead',
);

// ---------------------------------------------------------------- tables and flows: Part 2
const vUrban = table(
  ['Census 2011 test for an urban area', 'Requirement'],
  [
    ['Population', 'At least 5,000'],
    ['Male working population', 'At least 75 percent in non-agricultural work'],
    ['Density', 'At least 400 persons per square kilometre'],
  ],
  'Table of the Census 2011 definition of an urban area: a population of at least 5,000; at least 75 percent of the male working population in non-agricultural work; and a density of at least 400 persons per square kilometre',
  'Census 2011 definition; all three tests apply.',
);
const vUrbEx = table(
  ['Imagined settlement', 'Population', 'Non-farm male workers', 'Density per sq km', 'Urban?'],
  [
    ['Sundarpet', '7,500', '80 percent', '520', 'Yes: meets all three tests'],
    ['Mirzapada', '9,000', '60 percent', '600', 'No: fails the 75 percent test'],
    ['Haripur', '4,800', '90 percent', '700', 'No: population below 5,000'],
  ],
  'Worked example table: imagined Sundarpet with 7,500 people, 80 percent non-farm male workers and a density of 520 meets all three tests; Mirzapada fails because only 60 percent work outside farming; Haripur fails because its population is below 5,000',
  'All three tests must be met.',
);
const vForms = table(
  ['Form of municipality', 'Area it serves'],
  [
    ['Nagar panchayat', 'An area in transition from rural to urban'],
    ['Municipal council', 'A smaller urban area'],
    ['Municipal corporation', 'A larger urban area'],
  ],
  'Table of the three forms of municipality: nagar panchayat for an area in transition, municipal council for a smaller urban area, and municipal corporation for a larger urban area',
);
const vMunic = table(
  ['Feature', 'Municipalities under the 74th Amendment'],
  [
    ['Elections', 'Direct elections every five years; within six months if dissolved'],
    ['Reservation', 'As for panchayats: Scheduled Castes and Scheduled Tribes in proportion to population, at least one-third for women'],
    ['Commissions', 'The State Election Commission conducts elections; the State Finance Commission reviews finances'],
  ],
  'Table of features of municipalities: direct elections every five years and within six months if dissolved; reservation as for panchayats; the State Election Commission conducts elections and the State Finance Commission reviews finances',
);
const vTwelfth = table(
  ['Twelfth Schedule: 18 subjects', 'Examples'],
  [
    ['Planning', 'Urban planning and regulation of land use'],
    ['Services', 'Water supply, public health, sanitation and solid waste management, fire services'],
    ['Amenities', 'Street lighting, public conveniences, burial and cremation grounds, parking and bus stops'],
    ['Welfare', 'Slum improvement and urban poverty alleviation'],
  ],
  'Table of examples from the Twelfth Schedule, which has 18 subjects: urban planning; water supply, public health, sanitation and fire services; street lighting, public conveniences and burial grounds; and slum improvement',
);
const vWardCom = table(
  ['Point', 'Ward committees'],
  [
    ['Where', 'In larger municipalities, which have many wards'],
    ['Why', 'To bring decisions closer to residents of a ward'],
    ['What they do', 'Take up local needs such as lighting, water and sanitation with the municipality'],
  ],
  'Table on ward committees: provided in larger municipalities with many wards, to bring decisions closer to residents, taking up needs such as lighting, water and sanitation with the municipality',
);
const vWardFlow = flow('LR', ['Residents of Lakshmanpur colony report broken street lights and garbage', 'The ward committee records the complaints', 'It forwards them to the municipal corporation', 'The corporation repairs and clears, and reports back'], 'Worked example flow: residents of an imagined colony report broken street lights and garbage, the ward committee records the complaints, forwards them to the municipal corporation, which repairs and clears and reports back', 'A ward committee at work');
const vAchieve = table(
  ['Achievement', 'What it means'],
  [
    ['Regular elections', 'Elected local bodies are in place in most states'],
    ['Many representatives', 'A very large number of people hold elected office in villages and wards'],
    ['Women, SC and ST', 'Reservation has brought many women and members of Scheduled Castes and Scheduled Tribes into office'],
    ['Voice at the grassroots', 'Gram sabha and ward meetings let people question plans and spending'],
  ],
  'Table of achievements: regular elections, a large number of elected representatives, women and members of Scheduled Castes and Scheduled Tribes in office, and a voice at the grassroots',
);
const vThreeF = table(
  ['The three Fs', 'The concern'],
  [
    ['Functions', 'Subjects are listed in the Schedules, but states have transferred only some'],
    ['Funds', 'Money for the work often stays with the state'],
    ['Functionaries', 'Staff often report to state departments, not to the local body'],
  ],
  'Table of the three Fs: functions, funds and functionaries; subjects are listed but states have transferred only some, money often stays with the state, and staff often report to state departments',
);
const vProblems = table(
  ['Problem', 'Explanation'],
  [
    ['Dependence on grants', 'Local bodies rely on grants from the state and the Union'],
    ['Low own revenue', 'Taxes, fees and rents raise only a small part of spending'],
    ['Control by state officials', 'Approvals and orders from higher levels can limit elected bodies'],
    ['Proxy representation', 'In some places a relative acts in place of an elected woman'],
  ],
  'Table of problems: dependence on grants, low own revenue, control by state officials, and proxy representation in some places',
);
const vViews = table(
  ['Some argue', 'Others argue'],
  [
    ['Regular elections and reservation have deepened democracy', 'Powers remain limited because few subjects, funds and staff are transferred'],
    ['Gram sabhas give ordinary people a voice', 'Heavy dependence on grants limits real choice'],
    ['Many women and weaker groups have gained experience of office', 'Control by officials and proxy representation weaken the gains'],
  ],
  'Table of the assessment of local governments: some argue that regular elections, reservation and gram sabhas have deepened democracy; others argue that powers remain limited by the limited transfer of subjects, funds and staff, by dependence on grants, and by control by officials and proxy representation',
);
const vSum2 = table(
  ['Topic', 'Key points'],
  [
    ['Urban area', 'Census 2011: 5,000 people; 75 percent non-farm male workers; 400 per sq km'],
    ['74th Amendment', 'In force 1 June 1993; three forms of municipality'],
    ['Provisions', 'Reservation, State Commissions, Twelfth Schedule of 18 subjects, ward committees'],
    ['Achievements', 'Regular elections, many representatives, women, SC and ST, voice'],
    ['Problems and views', 'Three Fs, grants, officials, proxy; some argue, others argue'],
  ],
  'Summary table of Part 2: the urban area definition, the 74th Amendment, its provisions, achievements, and problems with the two views',
);
const vTips2 = table(
  ['Common mistake', 'Write instead'],
  [
    ['The Twelfth Schedule is for panchayats', 'The Eleventh Schedule is for panchayats, the Twelfth for municipalities'],
    ['Local bodies have fully succeeded, or fully failed', 'Give both views: some argue, others argue'],
    ['Proxy representation is found everywhere', 'It is reported from some places; many elected women act independently'],
  ],
  'Table of common mistakes in Part 2 and what to write instead',
);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Local Governments, Part 1: Growth and the 73rd Amendment',
  goals: [
    'Explain why local government matters in a democracy',
    'Trace the growth of local government from 1882 to the Amendments of 1992',
    'Describe the three tiers, the gram sabha, elections and reservation under the 73rd Amendment',
    'Name the State Election Commission, State Finance Commission, Eleventh Schedule and PESA',
  ],
  slides: [
    sl('title', 'Local Governments: Growth and the 73rd Amendment', {
      b: 'Part 1: why we need **local government**, how it **grew**, and what the **73rd Amendment** provides for villages.',
      v: flow('LR', ['Why local government', 'Growth before 1992', 'Three tiers and gram sabha', 'Elections and reservation', 'Finance and subjects'], 'Route map of Part 1: why local government, growth before 1992, three tiers and the gram sabha, elections and reservation, finance and subjects', 'Part 1 at a glance'),
      n: 'Who decides where the village road is repaired, or how a school gets clean drinking water? In a large country, such decisions are best taken near the people. In this part we study why local government matters, how it grew, and what the seventy third Amendment gave to villages.',
    }),
    sl('concept', 'Why local government?', {
      v: vWhy,
      n: 'There are four reasons. First, decisions are taken close to the people affected. Second, residents have local knowledge of their own problems. Third, ordinary citizens can take part by attending meetings, voting and standing for office. Fourth, democracy reaches below the state level, to the village and the ward. This is why local government is called grassroots democracy.',
    }),
    sl('diagram', 'A timeline of local government', {
      v: vTimeline,
      n: 'This timeline runs from eighteen eighty two to nineteen ninety six. It begins with the resolution of Lord Ripon and the Act of nineteen nineteen. It continues through the programme of nineteen fifty two and the two committees of nineteen fifty seven and nineteen eighty six. It ends with the Amendments of nineteen ninety two and nineteen ninety three, and the Act of nineteen ninety six.',
    }),
    sl('concept', 'Early steps: 1882 and 1919', {
      v: vEarly,
      n: 'In eighteen eighty two, a resolution associated with Lord Ripon encouraged local self government bodies in British India. Under the Government of India Act of nineteen nineteen, village panchayats were set up in some provinces. Local bodies existed, but their powers and funds stayed small.',
    }),
    sl('concept', 'Gram swaraj and Article 40', {
      v: vSwaraj,
      n: 'Gandhi spoke of gram swaraj, the idea that villages should be largely self governing communities running their own affairs. The Constitution, in Article forty, a Directive Principle, asks the State to take steps to organise village panchayats. A Directive Principle guides the State, but it cannot be enforced in a court.',
    }),
    sl('check', 'Quick check: Article 40', {
      b: 'Which Article asks the State to take steps to organise village panchayats?',
      chk: 'm_art40',
      n: 'Recall the Directive Principle on village panchayats.',
    }),
    sl('concept', 'The 1950s: development and a three tier plan', {
      v: vCdp,
      n: 'The Community Development Programme began in nineteen fifty two, aiming at the all round development of villages with the participation of the people. In nineteen fifty seven the Balwantrai Mehta Committee studied it and recommended a three tier system of rural local government. Several states set up panchayats, but their powers and elections varied widely.',
    }),
    sl('diagram', 'The road to constitutional status', {
      v: vRoad,
      n: 'By the nineteen eighties, many people felt that local bodies were weak because they had no constitutional protection. In nineteen eighty six the L. M. Singhvi Committee recommended constitutional status. In nineteen ninety two Parliament passed the seventy third and seventy fourth Amendments, and in nineteen ninety three they came into force.',
    }),
    sl('check', 'Quick check: match the years', {
      b: 'Match each year with the step in the growth of local government.',
      chk: 'mt_timeline',
      n: 'Pair each year with its step.',
    }),
    sl('diagram', 'The three tiers of panchayati raj', {
      v: vTiers,
      n: 'The seventy third Amendment provides for three tiers. At the village level is the gram panchayat, at the block or intermediate level the panchayat samiti, and at the district level the zila parishad. A state with a population below twenty lakh need not have the intermediate tier. The base of the system is the gram sabha.',
    }),
    sl('concept', 'The gram sabha', {
      v: vSabha,
      n: 'The gram sabha is the assembly of all adult voters of the village. It meets to discuss plans, accounts and needs. The gram panchayat is different. Its members are elected by the voters, it runs village affairs, and it answers to the gram sabha. The gram sabha is the foundation of the system.',
    }),
    sl('example', 'Worked example 1: a small state', {
      b: 'The imagined state of Tarangpur has fifteen lakh people. Which tiers must it have?',
      bl: ['Village and district tiers: **required**', 'Intermediate tier: **optional below 20 lakh**'],
      v: vSmall,
      n: 'Imagine the state of Tarangpur with fifteen lakh people. It must have gram panchayats at village level and a zila parishad at district level. It need not have a panchayat samiti, because states below twenty lakh people need not have the intermediate tier. If its population were forty lakh, all three tiers would be needed.',
    }),
    sl('check', 'Quick check: order the tiers', {
      b: 'Which is the correct order of the three tiers, from the lowest to the highest?',
      chk: 'm_tiers',
      n: 'Recall the three tiers from village to district.',
    }),
    sl('concept', 'Elections and the State Election Commission', {
      v: vElect,
      n: 'Elections are held directly at all three levels, and the term is five years. If a body is dissolved before its term ends, fresh elections must be held within six months. These elections are conducted by the State Election Commission. The rule prevents long periods without elected local bodies.',
    }),
    sl('concept', 'Reservation in panchayats', {
      v: vReserve,
      n: 'Seats and the posts of chairpersons are reserved for Scheduled Castes and Scheduled Tribes in proportion to their population. At least one third of the seats and chairperson posts are reserved for women, and many states provide half. Reservation for backward classes is left to the states to decide.',
    }),
    sl('example', 'Worked example 2: counting women\'s seats', {
      b: 'An imagined zila parishad of Varunadesh has forty five seats. How many must be reserved for women?',
      bl: ['One-third of 45 is **15**', 'One-third is the **minimum**'],
      v: vResEx,
      n: 'Imagine a zila parishad with forty five seats. The rule is at least one third for women. One third of forty five is fifteen, so at least fifteen seats must be reserved. A state that gives half would reserve about twenty three seats. This is allowed, because the Constitution fixes a minimum and not a maximum.',
    }),
    sl('check', 'Quick check: true or false', {
      b: 'The gram sabha is the same as the elected gram panchayat.',
      chk: 'tf_sabha',
      n: 'Think about who belongs to the gram sabha.',
    }),
    sl('concept', 'Finance, subjects and tribal areas', {
      v: vFin,
      n: 'A State Finance Commission is set up every five years to review the finances of panchayats and suggest how funds should be shared. The Eleventh Schedule lists twenty nine subjects that may be transferred to panchayats, such as agriculture, drinking water and primary education. The Act of nineteen ninety six, called PESA, extends the provisions to Fifth Schedule areas, with adaptations.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSum1,
      n: 'To sum up. Local government brings decisions close to the people. It grew through the steps from eighteen eighty two to nineteen eighty six. The seventy third Amendment provides three tiers, a gram sabha, direct elections every five years, reservation, two State Commissions, the Eleventh Schedule of twenty nine subjects, and the extension to Scheduled Areas in nineteen ninety six.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['Give **dates** with each step: **1882, 1952, 1957, 1986, 1992, 1993**', 'Say the gram sabha is **all adult voters**', 'Write one-third as the **minimum**', 'Name the **State Election Commission** and **State Finance Commission**'],
      v: vTips1,
      n: 'A few tips. Give a date with each step in the growth of local government. Say that the gram sabha is made up of all adult voters. Write one third for women as a minimum. And name both the State Election Commission and the State Finance Commission, with their tasks.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Local Governments, Part 2: Urban Bodies and Implementation',
  goals: [
    'Apply the Census 2011 definition of an urban area',
    'Describe the three forms of municipality, the Twelfth Schedule and ward committees under the 74th Amendment',
    'Compare rural and urban local bodies',
    'Assess the achievements and problems of local governments, giving both views',
  ],
  slides: [
    sl('title', 'Local Governments: Urban Bodies and Implementation', {
      b: 'Part 2: the **74th Amendment**, and how local governments have **worked in practice**.',
      v: flow('LR', ['What is urban', 'Municipalities', 'Ward committees', 'Achievements', 'Problems and views'], 'Route map of Part 2: what is urban, municipalities, ward committees, achievements, problems and views', 'Part 2 at a glance'),
      n: 'Cities and towns need local government too, for water, lighting, sanitation and planning. In this part we study the seventy fourth Amendment for urban areas. Then we ask how local governments have worked in practice, what they have achieved, and what problems they face.',
    }),
    sl('concept', 'What counts as an urban area?', {
      v: vUrban,
      n: 'The Census of twenty eleven defines an urban area by three tests. The population must be at least five thousand. At least seventy five percent of the male working population must be in non agricultural work. And the density must be at least four hundred persons for every square kilometre. All three tests must be met.',
    }),
    sl('example', 'Worked example 1: is it urban?', {
      b: 'Apply the three tests to three imagined settlements.',
      bl: ['Sundarpet meets **all three** tests', 'The others fail **one test** each'],
      v: vUrbEx,
      n: 'Take three imagined settlements. Sundarpet has seven thousand five hundred people, eighty percent of its working men in non farm work, and a good density, so it meets all three tests. Mirzapada fails because only sixty percent of its working men are in non farm work. Haripur fails because its population is below five thousand.',
    }),
    sl('concept', 'Three forms of municipality', {
      v: vForms,
      n: 'The seventy fourth Amendment provides for three kinds of urban local body. A nagar panchayat is for an area in transition from rural to urban. A municipal council is for a smaller urban area. A municipal corporation is for a larger urban area, such as a big city.',
    }),
    sl('check', 'Quick check: match the bodies', {
      b: 'Match each local body with the area it serves or the work it does.',
      chk: 'mt_urban',
      n: 'Pair each body with its area.',
    }),
    sl('diagram', 'Rural and urban bodies compared', {
      v: vCompare,
      n: 'This chart sets the two systems side by side. Rural bodies are governed by the seventy third Amendment, with the gram sabha as the base and the Eleventh Schedule of twenty nine subjects. Urban bodies are governed by the seventy fourth Amendment, with ward committees and the Twelfth Schedule of eighteen subjects. Both have five year terms, reservation and two State Commissions.',
    }),
    sl('concept', 'Elections, reservation and Commissions for municipalities', {
      v: vMunic,
      n: 'Municipalities have direct elections every five years, and within six months if a body is dissolved. Reservation applies as for panchayats, with seats for Scheduled Castes and Scheduled Tribes in proportion to population, and at least one third for women. The State Election Commission conducts the elections and the State Finance Commission reviews finances.',
    }),
    sl('concept', 'The Twelfth Schedule', {
      v: vTwelfth,
      n: 'The Twelfth Schedule lists eighteen subjects that may be given to municipalities. They include urban planning, water supply, public health, sanitation and solid waste management, fire services, street lighting, burial grounds, and the improvement of slums. Like the Eleventh Schedule, it lists subjects that may be transferred, and the state decides how far to do so.',
    }),
    sl('concept', 'Ward committees', {
      v: vWardCom,
      n: 'In larger municipalities, which have many wards, the Amendment provides for ward committees. Their purpose is to bring decisions closer to the residents of a ward. They take up local needs, such as lighting, water and sanitation, with the municipality. In this way even a big city has a forum near the people.',
    }),
    sl('example', 'Worked example 2: a ward committee at work', {
      b: 'Follow a complaint in the imagined city of Ratnavali.',
      bl: ['Residents report **street lights and garbage**', 'The ward committee **forwards** the complaint'],
      v: vWardFlow,
      n: 'Imagine that residents of Lakshmanpur colony in the city of Ratnavali report broken street lights and uncollected garbage. The ward committee records the complaints. It forwards them to the municipal corporation. The corporation repairs the lights, clears the garbage and reports back. Decisions have stayed close to the people.',
    }),
    sl('check', 'Quick check: the date', {
      b: 'On which date did the 74th Amendment come into force?',
      chk: 'm_74',
      n: 'Recall the date of the Amendment on urban local bodies.',
    }),
    sl('concept', 'Achievements of local governments', {
      v: vAchieve,
      n: 'Local governments have several achievements. Elections are held regularly, so elected bodies are in place in most states. A very large number of people hold elected office in villages and wards. Reservation has brought many women and members of Scheduled Castes and Scheduled Tribes into office. And gram sabha and ward meetings give people a voice at the grassroots.',
    }),
    sl('check', 'Quick check: an achievement', {
      b: 'Which of the following is generally counted as an achievement of local governments?',
      chk: 'm_regular',
      n: 'Think about regular elections and wider participation.',
    }),
    sl('diagram', 'Where does the money come from?', {
      v: vBars,
      n: 'This chart shows the imagined income of the gram panchayat of Madhupur in one year. The Union grant is sixteen lakh rupees and the state grant is eighteen lakh. Own taxes and fees bring four lakh, and rent and other income two lakh. Grants make up thirty four of the forty lakh. The panchayat depends heavily on grants.',
    }),
    sl('concept', 'Problems: the three Fs', {
      v: vThreeF,
      n: 'A main concern is about functions, funds and functionaries, called the three Fs. Subjects are listed in the Schedules, but states have transferred only some of them. Money for the work often stays with the state. And staff often report to state departments instead of to the local body.',
    }),
    sl('concept', 'Other problems', {
      v: vProblems,
      n: 'There are other problems. Local bodies depend on grants from the state and the Union. Their own revenue from taxes, fees and rents is low. In some places state officials control what elected bodies may do. And in some places a relative acts in place of an elected woman, which is called proxy representation. Many elected women, however, act independently.',
    }),
    sl('check', 'Quick check: own revenue', {
      b: 'Which step would add directly to the own revenue of a panchayat?',
      chk: 'm_own_rev',
      n: 'Think about what a body raises by itself.',
    }),
    sl('concept', 'Assessing local governments: two views', {
      v: vViews,
      n: 'How should we judge local governments? Some argue that regular elections, reservation and gram sabhas have deepened democracy. Others argue that their powers remain limited, because few subjects, funds and staff are transferred, and grants limit real choice. A good answer gives both views with evidence and then forms a reasoned conclusion.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSum2,
      n: 'To sum up. An urban area is defined by three tests in the Census of twenty eleven. The seventy fourth Amendment, in force from the first of June nineteen ninety three, provides three forms of municipality, reservation, two State Commissions, the Twelfth Schedule and ward committees. Local governments have achieved regular elections and wider participation, but face the three Fs, grants, official control and proxy representation.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['Say **Eleventh Schedule for panchayats, Twelfth for municipalities**', 'Give **all three** Census tests', 'Present both views: **some argue, others argue**', 'Use an **example** for each problem'],
      v: vTips2,
      n: 'A few tips. Say that the Eleventh Schedule is for panchayats and the Twelfth is for municipalities. Give all three Census tests for an urban area. For the assessment, present both views with the words some argue and others argue. And support each problem with an example.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Local Governments: Notes',
  sections: [
    {
      h: '1. Why local government',
      t: 1,
      b: '**Local government** is the government at the level of the village, town and city, closest to the people. Reasons for it: decisions are taken **close to the people**, residents have **local knowledge**, citizens can **participate** directly, and democracy reaches the **grassroots**.',
      terms: [
        ['Local government', 'The level of government closest to the people, in villages (panchayats) and in towns and cities (municipalities).'],
        ['Grassroots democracy', 'Democracy practised at the level of the village and the ward, where ordinary people take part directly.'],
        ['Gram swaraj', 'The idea, associated with Gandhi, that villages should be largely self-governing communities.'],
      ],
      v: vWhy,
    },
    {
      h: '2. Growth of local government before 1992',
      t: 1,
      b: '- **1882:** Lord Ripon\'s resolution encouraged local self-government.\n- **1919:** the Government of India Act led to village panchayats in some provinces.\n- **Article 40:** a Directive Principle asking the State to organise village panchayats.\n- **1952:** the Community Development Programme.\n- **1957:** the Balwantrai Mehta Committee recommended a **three-tier system**.\n- **1986:** the L. M. Singhvi Committee recommended **constitutional status**.',
      terms: [
        ['Directive Principle', 'A guide to the State in making laws and policies, not enforceable in a court.'],
        ['Community Development Programme', 'A programme of 1952 aiming at the all-round development of villages with people\'s participation.'],
        ['Balwantrai Mehta Committee', 'A committee of 1957 that recommended a three-tier system of rural local government.'],
      ],
      v: vTimeline,
      vs: [vEarly, vCdp],
    },
    {
      h: '3. The 73rd Amendment: structure, gram sabha and elections',
      t: 1,
      b: 'The 73rd Amendment was passed in **1992** and came into force on **24 April 1993**, now observed as **National Panchayati Raj Day**. It provides **three tiers**: gram panchayat, panchayat samiti and zila parishad. States with a population below **20 lakh** need not have the intermediate tier. The **gram sabha** is all adult voters of the village.\n\nElections are **direct** at all three levels every **five years**; if a body is dissolved, elections are held within **six months**, conducted by the **State Election Commission**.',
      terms: [
        ['Gram sabha', 'The assembly of all adult voters of the village.'],
        ['Gram panchayat', 'The elected village-level body of the panchayati raj system.'],
        ['Panchayat samiti', 'The elected block-level, or intermediate, body.'],
        ['Zila parishad', 'The elected district-level body.'],
        ['State Election Commission', 'The body that conducts elections to panchayats and municipalities in a state.'],
      ],
      v: vTiers,
      vs: [vSabha, vElect],
    },
    {
      h: '4. Reservation, finance, subjects and PESA',
      t: 1,
      b: '- **Reservation:** seats and chairpersons\' posts for **Scheduled Castes and Scheduled Tribes** in proportion to population; **at least one-third** for women (many states provide half); backward classes left to the states.\n- **State Finance Commission:** reviews panchayat finances every five years.\n- **Eleventh Schedule:** **29 subjects** that may be transferred to panchayats.\n- **PESA (1996):** extends the provisions to **Fifth Schedule (tribal) areas**, with adaptations.',
      terms: [
        ['Reservation', 'A provision under which a fixed share of seats and posts is set aside for particular groups.'],
        ['State Finance Commission', 'A commission set up every five years to review the finances of local bodies and suggest sharing of funds.'],
        ['Eleventh Schedule', 'The schedule listing 29 subjects that may be transferred to panchayats.'],
        ['PESA', 'The Panchayats (Extension to Scheduled Areas) Act 1996, extending the panchayat provisions to Fifth Schedule areas with adaptations.'],
      ],
      v: vReserve,
      vs: [vResEx, vFin],
    },
    {
      h: '5. The 74th Amendment: urban local bodies',
      t: 1,
      b: 'The 74th Amendment came into force on **1 June 1993**. Municipalities take three forms: **nagar panchayat** (area in transition), **municipal council** (smaller urban area) and **municipal corporation** (larger urban area). Reservation, five-year terms, the State Election Commission and the State Finance Commission apply as for panchayats. The **Twelfth Schedule** lists **18 subjects**, and **ward committees** are provided in larger municipalities.\n\nThe **Census 2011** definition of an urban area: population of at least **5,000**; at least **75 percent** of the male working population in non-agricultural work; density of at least **400 persons per square kilometre**.',
      terms: [
        ['Municipality', 'An urban local body: a nagar panchayat, a municipal council or a municipal corporation.'],
        ['Nagar panchayat', 'The urban local body for an area in transition from rural to urban.'],
        ['Twelfth Schedule', 'The schedule listing 18 subjects that may be given to municipalities.'],
        ['Ward committee', 'A committee within a ward of a larger municipality that brings decisions closer to residents.'],
      ],
      v: vCompare,
      vs: [vForms, vUrban, vTwelfth],
    },
    {
      h: '6. Achievements and problems in implementation',
      t: 2,
      b: '**Achievements:** regular elections; a very large number of elected representatives, including many women and members of Scheduled Castes and Scheduled Tribes; a voice for people at the grassroots.\n\n**Problems:** limited transfer of subjects, funds and functionaries (**the three Fs**) by states; dependence on **grants** from the state and the Union; **low own revenue**; **control by state officials**; **proxy representation** in some places, where a relative acts in place of an elected woman.',
      terms: [
        ['Three Fs', 'Functions (subjects), funds and functionaries (staff), which local bodies need and which states have transferred only to a limited extent.'],
        ['Own revenue', 'Income that a local body raises itself, such as taxes, fees and rents, as against grants.'],
        ['Proxy representation', 'A situation, reported from some places, in which a relative acts in place of an elected representative.'],
      ],
      v: vBars,
      vs: [vAchieve, vThreeF, vProblems],
    },
    {
      h: '7. Assessing local governments',
      t: 2,
      b: '**Some argue** that local governments have **deepened democracy**: regular elections, reservation and gram sabhas have brought many people into public life. **Others argue** that their **powers remain limited**: few subjects, funds and staff are transferred, and grants limit real choice. A good answer gives both views with evidence and then a reasoned conclusion.',
      terms: [
        ['Deepening of democracy', 'The spread of participation and accountability to more people and to lower levels of government.'],
      ],
      v: vViews,
    },
  ],
  tips: '**Common mistakes**\n- Saying the gram sabha is the elected panchayat: it is all adult voters.\n- Saying every state must have three tiers: states below 20 lakh need not have the intermediate tier.\n- Treating one-third for women as the exact share: it is the minimum.\n- Mixing the schedules: Eleventh for panchayats (29), Twelfth for municipalities (18).\n- Giving only one view in the assessment: present both.\n\n**Tips:** date every step (1882, 1952, 1957, 1986, 1992, 1993, 1996); name both State Commissions; give all three Census tests; use an example for each problem.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['Why is **local government** important?', 'Decisions are taken close to the people, using local knowledge, with participation: democracy at the grassroots.', 'concept', 1],
  ['What is **gram swaraj**?', 'The idea that villages should be largely self-governing communities running their own affairs.', 'definition', 1],
  ['What does **Article 40** provide?', 'A Directive Principle: the State should take steps to organise village panchayats.', 'fact', 1],
  ['What was **Lord Ripon\'s resolution** (1882)?', 'A resolution that encouraged local self-government bodies.', 'fact', 1],
  ['**Government of India Act 1919** and panchayats', 'It led to village panchayats being set up in some provinces.', 'fact', 2],
  ['**Community Development Programme**', 'Begun in 1952, aiming at all-round development of villages with people\'s participation.', 'fact', 1],
  ['**Balwantrai Mehta Committee** (1957)', 'Recommended a three-tier system of rural local government.', 'fact', 1],
  ['**L. M. Singhvi Committee** (1986)', 'Recommended constitutional status for local self-government bodies.', 'fact', 1],
  ['When was the **73rd Amendment** passed and in force?', 'Passed in 1992; in force 24 April 1993 (National Panchayati Raj Day).', 'fact', 1],
  ['Name the **three tiers** of panchayati raj', 'Gram panchayat (village), panchayat samiti (block) and zila parishad (district).', 'fact', 1],
  ['When may a state skip the **intermediate tier**?', 'When its population is below 20 lakh.', 'fact', 2],
  ['What is the **gram sabha**?', 'The assembly of all adult voters of the village.', 'definition', 1],
  ['How often are **panchayat elections** held?', 'Every five years, by direct election at all three levels.', 'fact', 1],
  ['If a panchayat is **dissolved**, when are elections held?', 'Within six months.', 'fact', 1],
  ['Who conducts local body elections?', 'The State Election Commission.', 'fact', 1],
  ['**Reservation** for SC and ST in panchayats', 'Seats and chairpersons\' posts in proportion to their population.', 'fact', 1],
  ['**Reservation** for women in panchayats', 'At least one-third of seats and chairpersons\' posts; many states provide half.', 'fact', 1],
  ['**Reservation** for backward classes', 'Left to the states to decide.', 'fact', 2],
  ['What does the **State Finance Commission** do?', 'Reviews the finances of local bodies every five years and suggests sharing of funds.', 'definition', 1],
  ['What is the **Eleventh Schedule**?', 'It lists 29 subjects that may be transferred to panchayats.', 'definition', 1],
  ['What is **PESA** (1996)?', 'The Act extending the panchayat provisions to Fifth Schedule (tribal) areas, with adaptations.', 'definition', 2],
  ['When did the **74th Amendment** come into force?', '1 June 1993.', 'fact', 1],
  ['Three forms of **municipality**', 'Nagar panchayat (area in transition), municipal council (smaller urban area), municipal corporation (larger urban area).', 'fact', 1],
  ['What is the **Twelfth Schedule**?', 'It lists 18 subjects that may be given to municipalities.', 'definition', 1],
  ['What are **ward committees**?', 'Committees in larger municipalities that bring decisions closer to residents of a ward.', 'definition', 1],
  ['**Census 2011** definition of an urban area', 'Population of at least 5,000; at least 75 percent of male workers in non-agricultural work; density of at least 400 per square kilometre.', 'fact', 2],
  ['Achievements of **local governments**', 'Regular elections; many representatives including women, SC and ST; a voice at the grassroots.', 'concept', 2],
  ['What are the **three Fs**?', 'Functions, funds and functionaries: what local bodies need and states have transferred only partly.', 'definition', 2],
  ['What is **own revenue**?', 'Income a local body raises itself, such as taxes, fees and rents, as against grants.', 'definition', 1],
  ['Name problems of **local governments**', 'Limited transfer of the three Fs; dependence on grants; low own revenue; control by state officials; proxy representation in some places.', 'concept', 2],
  ['What is **proxy representation**?', 'A relative acting in place of an elected representative, reported from some places.', 'definition', 2],
  ['The two views on **local governments**', 'Some argue they have deepened democracy; others argue their powers remain limited.', 'concept', 2],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-11-default-chapter-test-short',
  title: 'Chapter test (short): Local Governments',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A: Objective (1 mark each)', instr: 'Questions 1 to 4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_dissolve', 'm_urban_def', 'm_threeF', 'ar_funds'] },
    { id: 'B', title: 'Section B: Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30 to 50 words and the 3-mark question in about 50 to 80 words.', items: ['s2_why', 's2_reserve', 's3_73'] },
    { id: 'C', title: 'Section C: Long answer (5 marks)', instr: 'Answer any ONE of the two questions in about 80 to 120 words.', items: [{ attempt: 1, keys: ['l_73', 'l_assess'] }] },
    { id: 'D', title: 'Section D: Case-based (4 marks)', instr: 'Read the passage and answer all parts. Part (c) has an internal choice.', items: ['c_sabha'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-11-default-chapter-test-long',
  title: 'Chapter test (long): Local Governments',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A: Objective (1 mark each)', instr: 'Questions 1 to 10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_ripon', 'm_reserve_women', 'm_sec', 'm_11th', 'm_forms', 'm_ward', 'm_grants', 'm_proxy', 'ar_73', 'ar_corp'] },
    { id: 'B', title: 'Section B: Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30 to 50 words and 3-mark questions in about 50 to 80 words. Questions 13 and 15 have an internal choice.', items: ['s2_sabha', 's2_sec', { attempt: 1, keys: ['s2_threeF', 's2_pesa'] }, 's3_growth', { attempt: 1, keys: ['s3_74', 's3_problems'] }] },
    { id: 'C', title: 'Section C: Long answer (5 marks)', instr: 'Answer question 16, and any ONE of questions 17 and 18, in about 80 to 120 words each.', items: ['l_growth', { attempt: 1, keys: ['l_74', 'l_problems'] }] },
    { id: 'D', title: 'Section D: Case-based (4 marks each)', instr: 'Read each passage and answer all parts. Part (c) of each has an internal choice.', items: ['c_budget', 'c_ward'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01 and t02 of cbse-11-political-science-ch08 only (growth of local government and the 73rd and 74th Amendments; implementation of local governance)',
    originality: 'every passage (gram sabha minutes, budget statement, ward committee note, letter, school debate) and every state, village, city, settlement and person is imagined, written by SOYL and labelled; no NCERT text, boxed source or cartoon, no Constitution text, report text or board item reused (D-036)',
    facts: 'stable facts only: 1882, 1919, 1952, 1957, 1986, 1992, 1993, 1996 steps; Article 40; 73rd Amendment in force 24 April 1993; 74th in force 1 June 1993; three tiers; 20 lakh population limit; five-year terms and six months after dissolution; one-third reservation for women; Eleventh Schedule 29 subjects; Twelfth Schedule 18; Census 2011 urban definition',
    neutrality: 'no office-holders, parties or states named as good or bad; no exact national figures; proxy representation treated neutrally and as occurring in some places; the assessment framed as some argue and others argue',
    gate: 'schema, content lint (lintExemplar) and the deterministic verify checks run clean on this chapter',
  },
});
