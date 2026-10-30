// Build CBSE 12 Political Science ch13 The Crisis of Democratic Order. Run from platform/:
//   npx tsx content/authored/social-science/cbse-12-political-science-ch13/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from './lib.mjs';

setUnit('cbse-12-political-science-ch13', 'social-science');
const { EVENTS } = await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// ---------------------------------------------------------------- SVG figures
/** Timeline of [year, month, label] events between `from` and `to`, labels in four lanes. */
function timeline(events, from, to, alt, caption) {
  const s = new Svg(760, 320);
  const X = (y, m) => 80 + ((y + MONTHS.indexOf(m) / 12 - from) / (to - from)) * 600;
  const AX = 160;
  s.arrow(30, AX, 740, AX, { sw: 1.8 });
  for (let yr = Math.ceil(from); yr <= to; yr++) {
    s.line(X(yr, 'January'), AX - 6, X(yr, 'January'), AX + 6, { sw: 1.2, color: 'muted' });
    s.text(X(yr, 'January'), AX + 18, String(yr), { size: 11, muted: true });
  }
  const LANE = [30, 92, 230, 292];
  events.forEach(([y, m, label], i) => {
    const ly = LANE[i % 4];
    const up = ly < AX;
    const x = X(y, m);
    s.dot(x, AX, 5, 'accent');
    s.line(x, AX, x, up ? ly + 22 : ly - 26, { sw: 1.2, color: 'accent' });
    const words = label.split(' ');
    const half = Math.ceil(words.length / 2);
    const l1 = words.length > 3 ? words.slice(0, half).join(' ') : label;
    const l2 = words.length > 3 ? words.slice(half).join(' ') : '';
    s.text(x, ly - (up ? 0 : 12), `${m.slice(0, 3)} ${y}`, { bold: true, size: 12 });
    s.text(x, ly + (up ? 15 : 3), l1, { size: 11 });
    if (l2) s.text(x, ly + (up ? 29 : 17), l2, { size: 11 });
  });
  return s.visual(alt, caption);
}
const EV1 = EVENTS.filter(([y, m]) => y < 1975 || (y === 1975 && m === 'June'));
const EV2 = EVENTS.filter(([y]) => y >= 1975);
const vTime1 = timeline(
  EV1, 1971, 1976,
  'Timeline from 1971 to 1975: Congress wins the Lok Sabha election in March 1971; war and the birth of Bangladesh in December 1971; the Kesavananda Bharati judgment and supersession of judges in April 1973; world oil prices rise in October 1973; the Gujarat movement begins in January 1974 and the Bihar movement in March 1974; the railway strike in May 1974; the Allahabad judgment and the Emergency in June 1975',
  'The road to June 1975',
);
const vTime2 = timeline(
  EV2, 1975, 1980.5,
  'Timeline from 1975 to 1980: the Allahabad judgment and the Emergency in June 1975; the 42nd Amendment in November 1976; the Congress defeated and the Janata government formed in March 1977; the 44th Amendment in December 1978; the Congress returns to power in January 1980',
  'From the Emergency to 1980',
);

const vHub = (() => {
  const s = new Svg(720, 330);
  const cx = 360, cy = 165;
  s.rect(cx - 95, cy - 32, 190, 64, { sw: 2.4, color: 'accent', fill: 'fill' });
  s.text(cx, cy - 8, 'Emergency', { bold: true, color: 'accent' });
  s.text(cx, cy + 14, '1975–77', { size: 12 });
  const boxes = [
    [20, 20, 'Rights', 'Courts closed to rights claims;', 'detention under MISA'],
    [480, 20, 'Press', 'Pre-censorship;', 'blank columns as protest'],
    [20, 240, 'Federalism', 'Union directs states;', 'power at the Centre'],
    [480, 240, 'Parliament and courts', 'Elections postponed;', '42nd Amendment'],
  ];
  for (const [x, y, h, a, b] of boxes) {
    s.rect(x, y, 220, 72, { sw: 1.5 });
    s.text(x + 110, y + 18, h, { bold: true, size: 13 });
    s.text(x + 110, y + 38, a, { size: 11 });
    s.text(x + 110, y + 55, b, { size: 11 });
    const tx = x < cx ? x + 220 : x;
    const ty = y < cy ? y + 72 : y;
    s.arrow(cx + (x < cx ? -95 : 95), cy + (y < cy ? -32 : 32), tx, ty, { sw: 1.4, color: 'muted' });
  }
  return s.visual(
    'Hub diagram: the Emergency of 1975 to 1977 at the centre with four effects — rights (courts closed to rights claims, detention under MISA), press (pre-censorship, blank columns as protest), federalism (Union directs states, power at the Centre), and Parliament and courts (elections postponed, 42nd Amendment)',
    'Four areas where the Emergency changed how democracy worked',
  );
})();

const vScale = (() => {
  const s = new Svg(720, 300);
  s.line(360, 70, 360, 250, { sw: 2 });
  s.line(110, 90, 610, 90, { sw: 2.4, color: 'accent' });
  s.polygon([[330, 250], [390, 250], [360, 220]], { sw: 1.5, fill: 'fill' });
  s.text(360, 40, 'Was the Emergency necessary?', { bold: true });
  const left = ['Agitations threatened order', 'Elected government under siege', 'Pro-poor programme needed speed'];
  const right = ['Protest is a democratic right', 'Courts and laws could handle disorder', 'Timing followed the court verdict'];
  s.text(200, 118, 'Government\'s case', { bold: true, size: 13, color: 'accent' });
  s.text(520, 118, 'Critics\' case', { bold: true, size: 13, color: 'accent' });
  left.forEach((t, i) => { s.rect(80, 135 + i * 46, 240, 36, { sw: 1.2 }); s.text(200, 153 + i * 46, t, { size: 12 }); });
  right.forEach((t, i) => { s.rect(400, 135 + i * 46, 240, 36, { sw: 1.2 }); s.text(520, 153 + i * 46, t, { size: 12 }); });
  return s.visual(
    'Balance diagram titled was the Emergency necessary: on the left the government\'s case (agitations threatened order, an elected government under siege, a pro-poor programme needed speed); on the right the critics\' case (protest is a democratic right, courts and laws could handle disorder, the timing followed the court verdict)',
    'Two sides of the debate, stated neutrally',
  );
})();

// ---------------------------------------------------------------- tables and flows
const vRoute1 = flow('LR', ['Hard times after 1971', 'Students and JP', 'Railway strike', 'Clash with the courts', 'June 1975'], 'Route map of Part 1: hard times after 1971, students and JP, the railway strike, the clash with the courts, and the events of June 1975', 'Part 1 at a glance');
const vRoute2 = flow('LR', ['What changed in 1975–77', 'Press and rights', 'The debate', '1977 election', 'Janata years', 'Lessons'], 'Route map of Part 2: what changed in 1975 to 1977, the press and rights, the debate, the 1977 election, the Janata years and the lessons', 'Part 2 at a glance');
const vEcon = table(
  ['Strain', 'Effect on people'],
  [
    ['Cost of the 1971 war and refugees', 'Heavy public spending'],
    ['Halt in some foreign aid', 'Less money for development'],
    ['World oil prices jump (1973)', 'Fuel and transport dearer'],
    ['Weak monsoons', 'Food scarce and costly'],
    ['Slow industry', 'Fewer jobs, more unemployment'],
  ],
  'Table of economic strains after 1971 and their effects: war and refugee costs meant heavy spending; a halt in some aid reduced development funds; the 1973 oil price rise made fuel dearer; weak monsoons made food scarce; slow industry meant fewer jobs',
);
const vMovements = table(
  ['', 'Gujarat (from January 1974)', 'Bihar (from March 1974)'],
  [
    ['Started by', 'Students', 'Students'],
    ['Issues', 'Prices, food, corruption', 'Prices, food, unemployment, corruption'],
    ['Leadership', 'Students; opposition parties joined', 'Jayaprakash Narayan'],
    ['Outcome', 'President\'s Rule; assembly polls in June 1975', 'Demand to dismiss the state government; call for Total Revolution'],
  ],
  'Comparison table of the Gujarat and Bihar movements of 1974: both started by students over prices and corruption; Gujarat led to President\'s Rule and assembly elections in June 1975; Bihar was led by Jayaprakash Narayan, who demanded the state government\'s dismissal and called for Total Revolution',
);
const vCourts = flow('LR', ['Government amends the Constitution for its programme', 'Court: basic structure cannot be changed (1973)', 'Three senior judges superseded (1973)', 'Debate: should judges share the government\'s outlook?'], 'Flow of the conflict with the judiciary: the government amends the Constitution for its programme; in 1973 the Court rules the basic structure cannot be changed; three senior judges are superseded; a debate follows on whether judges should share the government\'s outlook', 'Government and judiciary');
const vJune = flow('TB', ['12 June: High Court sets aside the 1971 election of the Prime Minister', '24 June: Supreme Court gives a partial stay', '25 June: opposition rally calls for nationwide satyagraha', 'Night of 25 June: Emergency proclaimed under Article 352', '26 June: Cabinet endorses; press censorship begins'], 'Flow of June 1975: on the 12th the High Court sets aside the Prime Minister\'s 1971 election; on the 24th the Supreme Court gives a partial stay; on the 25th an opposition rally calls for satyagraha; that night the Emergency is proclaimed under Article 352; on the 26th the Cabinet endorses it and censorship begins', 'Thirteen days in June 1975');
const vChrono = table(
  ['Event', 'When', 'Link to the next'],
  [
    ['Kesavananda judgment', 'April 1973', 'Friction with the courts grows'],
    ['Gujarat protests', 'January 1974', 'Inspires students in Bihar'],
    ['Railway strike', 'May 1974', 'Labour unrest adds to tension'],
    ['Allahabad verdict', 'June 1975', 'Opposition demands resignation'],
  ],
  'Worked chronology table: Kesavananda judgment April 1973, friction with the courts; Gujarat protests January 1974, inspiring Bihar; railway strike May 1974, adding labour unrest; Allahabad verdict June 1975, followed by the demand for resignation',
  'Put each event on a date, then write how it led to the next.',
);
const vPlan5 = table(
  ['Point', 'Content for a five-mark answer on the background'],
  [
    ['1', 'Economic strain: war costs, oil prices, inflation'],
    ['2', 'Gujarat and Bihar movements; JP and Total Revolution'],
    ['3', 'Railway strike of 1974'],
    ['4', 'Conflict with the judiciary'],
    ['5', 'Trigger: Allahabad verdict and the opposition response'],
  ],
  'Planning table for a five-mark answer on the background: economic strain, the Gujarat and Bihar movements, the railway strike, the conflict with the judiciary, and the trigger in June 1975',
);
const vSum1 = table(
  ['Idea', 'Remember'],
  [
    ['After 1971', 'Big win, then war costs, oil shock, inflation'],
    ['1974', 'Gujarat and Bihar movements; JP; railway strike'],
    ['Courts', 'Basic structure (1973); supersession of judges'],
    ['June 1975', 'Verdict on the 12th; Emergency on the 25th'],
  ],
  'Summary table of Part 1: big win then economic strain after 1971; movements and the railway strike in 1974; the basic structure ruling and supersession; the verdict and the Emergency in June 1975',
);
const vTips1 = table(
  ['Common mistake', 'Write instead'],
  [
    ['"Emergency for external aggression"', 'Proclaimed for internal disturbance (Article 352)'],
    ['"Supreme Court cancelled the election"', 'The Allahabad High Court did; the Supreme Court gave a partial stay'],
    ['"JP was a minister"', 'He held no office; he led a popular movement'],
  ],
  'Exam tips table: the Emergency was for internal disturbance, not external aggression; the High Court, not the Supreme Court, set aside the election; JP held no office',
);
const vProclaim = table(
  ['Question', 'Answer for 1975'],
  [
    ['Article', '352 (national emergency)'],
    ['Ground cited', 'Internal disturbance'],
    ['Signed by', 'President Fakhruddin Ali Ahmed, on the Prime Minister\'s advice'],
    ['Cabinet', 'Informed and endorsed the next morning'],
    ['Lasted until', 'March 1977'],
  ],
  'Table of the proclamation: Article 352; ground internal disturbance; signed by President Fakhruddin Ali Ahmed on the Prime Minister\'s advice; the Cabinet endorsed it the next morning; it lasted until March 1977',
);
const vCensor = table(
  ['Response of the press', 'What it meant'],
  [
    ['Blank columns', 'Silent sign to readers that news was cut'],
    ['Closing down', 'Refusal to work under censorship'],
    ['Printing approved news only', 'Compliance; some praise of the government'],
  ],
  'Table of press responses to censorship: blank columns as a silent sign; closing down as refusal; printing only approved news as compliance',
);
const v42 = table(
  ['42nd Amendment (1976)', 'Later position'],
  [
    ['Term of legislatures: six years', 'Restored to five by the 44th Amendment'],
    ['Preamble: socialist, secular, integrity added', 'Still part of the Preamble'],
    ['Fundamental Duties inserted', 'Still part of the Constitution'],
  ],
  'Table of 42nd Amendment changes and their later position: six-year term restored to five by the 44th Amendment; Preamble words and Fundamental Duties remain',
);
const vExcess = table(
  ['Area', 'What the Shah Commission examined'],
  [
    ['Detentions', 'Thousands held without trial'],
    ['Family planning', 'Targets and complaints of coercion'],
    ['Demolitions', 'Homes and shops in Delhi pulled down'],
    ['Administration', 'Influence of persons without official posts'],
  ],
  'Table of areas examined by the Shah Commission: detentions without trial, coercion in family planning, demolitions in Delhi, and influence of persons without official posts',
  'Commission appointed in 1977, headed by a retired Supreme Court judge.',
);
const vRights = table(
  ['Action in an imagined town, 1975', 'Freedom affected'],
  [
    ['Union leader taken away at night', 'Personal liberty'],
    ['Weekly paper must clear every page', 'Press and expression'],
    ['Meeting in the park banned', 'Assembly'],
    ['Court cannot hear his family\'s petition', 'Right to constitutional remedies'],
  ],
  'Worked example table classifying four imagined actions of 1975: a union leader taken away at night affects personal liberty; a paper clearing every page affects the press; a banned park meeting affects assembly; a court unable to hear a petition affects constitutional remedies',
);
const vJanata = flow('LR', ['Congress (O)', 'Bharatiya Jana Sangh', 'Bharatiya Lok Dal', 'Socialists', 'Janata Party (1977)'], 'Flow: the Congress (O), the Bharatiya Jana Sangh, the Bharatiya Lok Dal and the Socialists come together to form the Janata Party in 1977', 'Opposition unity', [
  { from: 'n1', to: 'n5' }, { from: 'n2', to: 'n5' }, { from: 'n3', to: 'n5' }, { from: 'n4', to: 'n5' },
]);
const v1977 = table(
  ['Region', 'Congress in 1977 (broad pattern)'],
  [
    ['Most of north India', 'Swept out; no seat in several states'],
    ['Southern states', 'Held most of its ground'],
    ['At the Centre', 'Lost power for the first time'],
  ],
  'Table of the broad 1977 pattern: the Congress was swept out in most of north India, held most of its ground in the south, and lost power at the Centre for the first time',
  'Broad pattern only; seat numbers are not needed.',
);
const vJanataYears = flow('LR', ['March 1977: Morarji Desai Prime Minister', 'Shah Commission inquires', 'Splits and defections', '1979: Charan Singh briefly Prime Minister', 'January 1980: Congress returns'], 'Flow of the Janata years: Morarji Desai becomes Prime Minister in March 1977; the Shah Commission inquires; splits and defections follow; Charan Singh is briefly Prime Minister in 1979; the Congress returns in January 1980', 'The Janata years');
const v44 = table(
  ['Before 1978', 'After the 44th Amendment'],
  [
    ['Ground: internal disturbance', 'Ground: armed rebellion'],
    ['Proclaimed on the Prime Minister\'s advice', 'Only on the Cabinet\'s written advice'],
    ['Life and liberty could be suspended', 'Articles 20 and 21 never suspended'],
    ['Simple approval rules', 'Both Houses, special majority, within one month'],
  ],
  'Comparison table of emergency provisions before and after the 44th Amendment: internal disturbance replaced by armed rebellion; written Cabinet advice required; Articles 20 and 21 protected; approval by both Houses by special majority within one month',
);
const vLessons = flow('LR', ['Hard to end democracy in India', 'Clearer emergency rules', 'Alert citizens and civil liberties groups', 'Institutions need vigilance'], 'Flow of the lessons: it is hard to end democracy in India; emergency rules were made clearer; citizens and civil liberties groups became alert; institutions need vigilance', 'Lessons of the Emergency');
const vBoth = table(
  ['Step', 'For a "both sides" answer'],
  [
    ['1', 'State the government\'s case in its own terms'],
    ['2', 'State the critics\' case in their own terms'],
    ['3', 'Use evidence: dates, laws, the Shah Commission, 1977'],
    ['4', 'Conclude with a reasoned view, not a slogan'],
  ],
  'Worked example table for a both-sides answer: state the government\'s case, state the critics\' case, use evidence, and conclude with a reasoned view',
);
const vSum2 = table(
  ['Idea', 'Remember'],
  [
    ['Effects', 'Rights suspended, MISA, censorship, Union power, 42nd Amendment'],
    ['Inquiry', 'Shah Commission (1977)'],
    ['1977', 'Janata Party wins; Morarji Desai Prime Minister'],
    ['After', 'Janata falls 1979; Congress back 1980'],
    ['Safeguards', '44th Amendment (1978)'],
  ],
  'Summary table of Part 2: effects of the Emergency, the Shah Commission, the 1977 result, the fall of the Janata government and the Congress return, and the 44th Amendment safeguards',
);
const vTips2 = table(
  ['How marks are awarded', 'Tip'],
  [
    ['1 mark', 'One correct option, term or date'],
    ['2–3 marks', 'One explained point per mark'],
    ['5 marks', 'Five numbered points; "examine" or "evaluate" needs both sides and a conclusion'],
    ['Source', 'Quote the line, name the concept, explain'],
  ],
  'Exam tips table on how marks are awarded for one-mark, short, five-mark and source questions',
);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'The Crisis of Democratic Order — Part 1: The Road to June 1975',
  goals: [
    'Explain the economic difficulties after 1971 that fed public discontent',
    'Describe the Gujarat and Bihar movements, the role of Jayaprakash Narayan and the railway strike',
    'Explain the conflict between the government and the judiciary',
    'Trace the events of June 1975 that led to the proclamation of the Emergency',
  ],
  slides: [
    sl('title', 'The Crisis of Democratic Order', {
      b: 'Part 1 — how a government with a huge mandate in **1971** came to proclaim an **Emergency** in **1975**.',
      v: vRoute1,
      n: 'In 1971 the Congress won a big victory in the Lok Sabha election. Only four years later, in June 1975, a national Emergency was proclaimed and many freedoms were suspended. How did the country travel from one to the other? In this part we follow the economic troubles, the protest movements, the clash with the courts, and the events of June 1975.',
    }),
    sl('diagram', 'The road to June 1975', {
      v: vTime1,
      n: 'Here is the whole road on one line. After the election and the war of 1971 come the court judgment and an oil price shock in 1973. In 1974 students in Gujarat and then Bihar take to the streets, and railway workers strike. In June 1975 a court verdict is followed by the Emergency. Keep this order in mind as we look at each stop.',
    }),
    sl('concept', 'A big mandate, then hard times', {
      b: 'The 1971 victory came with the slogan **Garibi Hatao**; expectations were high.',
      v: vEcon,
      n: 'The 1971 victory raised hopes that poverty would be tackled quickly. But the war of that year and the care of refugees cost a great deal, some foreign aid stopped, monsoons failed, and in 1973 world oil prices shot up. Prices of food and fuel rose steeply and jobs became scarcer. Hardship of this kind often turns into political anger.',
    }),
    sl('concept', 'Students on the streets: Gujarat and Bihar', {
      b: 'In **1974** student protests over **prices and corruption** grew into mass movements.',
      v: vMovements,
      n: 'In January 1974 students in Gujarat began protesting against rising prices and corruption, and opposition parties joined them. The state came under President’s Rule. In March, students in Bihar began a similar movement. Compare the two columns: same starting point, but Bihar found a leader of national standing.',
    }),
    sl('check', 'Quick check: who led Bihar?', {
      b: 'Which leader agreed to lead the Bihar movement in 1974?',
      chk: 'm_bihar_jp',
      n: 'Think of the senior figure who had stepped away from party politics and returned to guide the students.',
    }),
    sl('concept', 'JP and Total Revolution', {
      b: 'Jayaprakash Narayan called for a **non-violent Total Revolution**: change in **social, economic and political** life.',
      bl: ['Demanded the dismissal of the Bihar government', 'Toured the country; brought opposition parties closer', 'Led a large march to Parliament in March 1975'],
      v: flow('LR', ['Student protest in Bihar', 'JP takes the lead', 'Call for Total Revolution', 'National opposition movement'], 'Flow: student protest in Bihar, JP takes the lead, the call for Total Revolution, and a national opposition movement', 'From a state protest to a national movement'),
      n: 'Jayaprakash Narayan, known as JP, had left party politics long before. In 1974 he agreed to lead the Bihar students and called for a Total Revolution, a peaceful change in society, the economy and politics. He demanded the dismissal of the Bihar government and toured the country, bringing opposition parties closer together. The government saw this as a campaign to unseat elected governments through the street.',
    }),
    sl('concept', 'The railway strike of 1974', {
      b: 'In **May 1974** railway unions, led by **George Fernandes**, struck across the country for better pay and service conditions.',
      bl: ['The government declared the strike illegal', 'Many workers were arrested; the strike ended after about three weeks', 'Labour unrest added to the tension'],
      v: table(['Side', 'View'], [['Unions', 'Pay had not kept up with prices'], ['Government', 'A national lifeline could not be shut down']], 'Table of the two views on the 1974 railway strike: unions said pay had not kept up with prices; the government said a national lifeline could not be shut down'),
      n: 'In May 1974 railway workers across India went on strike, led by a union committee under George Fernandes. They said their pay had not kept pace with prices. The government said the railways were a lifeline that could not stop, declared the strike illegal and arrested many workers. The strike was called off after about three weeks, but it added to the sense of confrontation.',
    }),
    sl('diagram', 'The government and the courts', {
      v: vCourts,
      n: 'At the same time, the government and the judiciary were in conflict. The government wanted to amend the Constitution freely to carry out its programme. In 1973 the Supreme Court ruled that Parliament could amend the Constitution but not its basic structure. Soon after, three senior judges were passed over when a new Chief Justice was appointed. Critics saw a threat to judicial independence; the government spoke of choosing judges in tune with social change.',
    }),
    sl('example', 'Worked example 1: building a chronology', {
      b: 'Put four events in order and link them.',
      bl: [
        'Step 1 — Write a date beside each event.',
        'Step 2 — Order them from earliest to latest.',
        'Step 3 — For each, write one line on how it led to the next.',
        'Step 4 — In an ordering question, check the first and the last before the middle.',
      ],
      v: vChrono,
      n: 'Chronology questions are common in this chapter. First write a date next to each event. Then arrange them. The judgment came in April 1973, the Gujarat protests in January 1974, the railway strike in May 1974, and the Allahabad verdict in June 1975. Finally, link each one to the next. That last step turns a list into an explanation, which is what longer answers need.',
    }),
    sl('check', 'Quick check: order the events', {
      b: 'Arrange the four events on the road to the Emergency.',
      chk: 'ord_road_1975',
      n: 'Use the dates you have just written next to each event.',
    }),
    sl('concept', '12 June 1975: the Allahabad verdict', {
      b: 'On an election petition by **Raj Narain**, the **Allahabad High Court** declared the 1971 election of **Indira Gandhi** from Rae Bareli **void**.',
      bl: ['Ground: corrupt practice, the use of government officials in the campaign', 'She appealed to the Supreme Court'],
      v: table(['Who', 'Role in the case'], [['Raj Narain', 'Lost to her in 1971; filed the petition'], ['Allahabad High Court', 'Set aside her election'], ['Supreme Court', 'Heard her appeal']], 'Table of the people and courts in the 1975 election case: Raj Narain filed the petition after losing in 1971; the Allahabad High Court set aside her election; the Supreme Court heard her appeal'),
      n: 'On the twelfth of June 1975 the Allahabad High Court decided an election petition filed by Raj Narain, who had lost to Indira Gandhi in Rae Bareli in 1971. The court held that her election was void because government officials had been used in her campaign. A Prime Minister’s own election had been set aside, and she appealed to the Supreme Court.',
    }),
    sl('concept', 'The partial stay', {
      b: 'On **24 June** the Supreme Court allowed her to remain an MP and Prime Minister, but **not to vote** in the Lok Sabha, until the appeal was decided.',
      v: table(['Allowed', 'Not allowed'], [['Remain a member of the Lok Sabha', 'Vote in the Lok Sabha'], ['Continue as Prime Minister', '']], 'Table of the partial stay: she could remain a member of the Lok Sabha and continue as Prime Minister, but could not vote in the Lok Sabha'),
      n: 'Twelve days later the Supreme Court gave a partial stay. She could stay a member of the Lok Sabha and continue as Prime Minister while her appeal was heard, but she could not vote in the House. The opposition said that, after such a verdict, she should resign. Her supporters said a High Court ruling under appeal was no reason to quit.',
    }),
    sl('check', 'Quick check: the stay', {
      b: 'What could the Prime Minister still do under the partial stay?',
      chk: 'm_sc_stay',
      n: 'Separate what the order allowed from what it did not.',
    }),
    sl('diagram', 'Thirteen days in June', {
      v: vJune,
      n: 'Now follow the last thirteen days. The verdict on the twelfth, the partial stay on the twenty-fourth. On the twenty-fifth a large opposition rally in Delhi announced a nationwide satyagraha, and JP appealed to the police and officials not to obey orders they believed illegal. That night the Emergency was proclaimed. The Cabinet endorsed it the next morning, and censorship began.',
    }),
    sl('check', 'Quick check: JP’s position', {
      b: 'True or false: JP held a post in the Union Cabinet in 1974.',
      chk: 'tf_jp_post',
      n: 'Remember how he came to lead the Bihar movement.',
    }),
    sl('example', 'Worked example 2: planning a five-mark answer', {
      b: 'Question: explain the background to the Emergency.',
      bl: [
        'Step 1 — Sort causes into economic, popular, institutional and immediate.',
        'Step 2 — Give each a bold heading and one example with a date.',
        'Step 3 — Keep the trigger (June 1975) for the last point.',
        'Step 4 — About twenty words per point; five points in all.',
      ],
      v: vPlan5,
      n: 'For a five-mark answer, plan before you write. Sort the causes into four kinds: economic strain, popular movements, the railway strike, and the clash with the courts. Then add the immediate trigger, the Allahabad verdict and the response to it. Five points, each with a heading and a dated example, is exactly what the marking scheme looks for.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSum1,
      n: 'To sum up Part 1. After the big win of 1971, war costs, an oil shock and poor harvests brought inflation. In 1974 students in Gujarat and Bihar protested, JP called for Total Revolution, and railway workers struck. The government and the courts clashed over the basic structure and the appointment of judges. In June 1975 a court verdict was followed by the Emergency.',
    }),
    sl('exam-tips', 'Exam tips', {
      v: vTips1,
      n: 'Three common slips. The 1975 Emergency was proclaimed for internal disturbance, not external aggression. It was the Allahabad High Court, not the Supreme Court, that set aside the election; the Supreme Court gave a partial stay. And JP held no office; he led a popular movement from outside government. Get these right and you protect easy marks.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'The Crisis of Democratic Order — Part 2: The Emergency and After',
  goals: [
    'Describe how the Emergency was proclaimed and what it changed',
    'Explain its consequences for rights, the press, federalism and the courts',
    'Present the arguments for and against the Emergency',
    'Explain the 1977 election, the Janata government and the lessons of the Emergency',
  ],
  slides: [
    sl('title', 'The Emergency and After', {
      b: 'Part 2 — what the Emergency **changed**, how it **ended**, and what India **learned**.',
      v: vRoute2,
      n: 'From June 1975 to March 1977 India lived under a national Emergency. In this part we look at how it was proclaimed, how it changed rights, the press and the balance of power, how people debated it, how the 1977 election ended it, and what lessons the country drew, including changes to the Constitution itself.',
    }),
    sl('concept', 'The proclamation', {
      b: 'Proclaimed on the night of **25 June 1975** under **Article 352**, citing **internal disturbance**.',
      v: vProclaim,
      n: 'The proclamation was signed by President Fakhruddin Ali Ahmed late on the twenty-fifth of June, on the advice of the Prime Minister, under Article 352. The ground was a threat from internal disturbance. The Cabinet was informed and gave its approval the next morning. The Emergency stayed in force until March 1977.',
    }),
    sl('diagram', 'What the Emergency changed', {
      v: vHub,
      n: 'This diagram shows four areas of change. Citizens could no longer go to court to enforce their fundamental rights, and many were held without trial. The press worked under censorship. Power shifted from the states to the Union. And Parliament postponed elections and passed sweeping amendments. Let us take these one by one.',
    }),
    sl('concept', 'Rights and detention', {
      b: 'The right to move the courts for fundamental rights was **suspended**; thousands were held under **preventive detention**, mainly under **MISA**.',
      bl: ['Opposition leaders and workers arrested on the first night', 'Some organisations were banned', 'In 1976 the Supreme Court accepted that detainees could not seek habeas corpus while the suspension lasted'],
      v: table(['Tool', 'Effect'], [['Suspension of rights enforcement', 'Courts could not help detainees'], ['MISA', 'Detention without trial'], ['Bans', 'Some organisations outlawed']], 'Table of tools used against dissent: suspension of rights enforcement meant courts could not help detainees; MISA allowed detention without trial; some organisations were banned'),
      n: 'On the very first night, many opposition leaders and workers were arrested. The government suspended the right of citizens to approach the courts to enforce their fundamental rights, and used preventive detention laws such as MISA to hold people without trial. In 1976 a majority of the Supreme Court accepted that, while this suspension lasted, detainees could not seek a writ of habeas corpus. One judge dissented.',
    }),
    sl('concept', 'The press under censorship', {
      b: 'Newspapers needed **prior approval** before printing; power to some newspaper offices was cut on the first night.',
      v: vCensor,
      n: 'From the first morning, newspapers had to show their reports to censors before printing. Some editors left a blank space where an editorial should have been, so that readers would know something had been cut. A few journals chose to close rather than accept censorship. Many others simply printed what was approved. Some writers also returned state honours in protest.',
    }),
    sl('check', 'Quick check: a blank editorial', {
      b: 'Why might a newspaper print its editorial column blank in 1975?',
      chk: 'm_blank',
      n: 'Ask what readers would understand when they saw the empty space.',
    }),
    sl('example', 'Worked example 1: which freedom is affected?', {
      b: 'Classify four imagined actions in a town in 1975.',
      bl: [
        'Step 1 — Ask: is a person, a publication, a gathering or a court affected?',
        'Step 2 — Name the matching freedom.',
        'Step 3 — In an answer, give the action as evidence for the freedom.',
      ],
      v: vRights,
      n: 'Let us classify four imagined actions. A union leader taken away at night affects personal liberty. A weekly paper that must clear every page affects freedom of the press. A ban on a meeting in a park affects freedom of assembly. And a court that cannot hear the family’s petition affects the right to constitutional remedies. Naming the freedom and giving the action as evidence earns both marks.',
    }),
    sl('concept', 'Power at the Centre and the 42nd Amendment', {
      b: 'In a national emergency the Union can **direct the states** and Parliament can **legislate on state subjects**.',
      v: v42,
      n: 'A national emergency turns the federal system into an almost unitary one: the Union can direct the states, and Parliament can make laws on state subjects. Lok Sabha elections due in early 1976 were postponed. In 1976 Parliament passed the 42nd Amendment, which extended the term of legislatures to six years and added Fundamental Duties and new words to the Preamble.',
    }),
    sl('concept', 'Controversies and the Shah Commission', {
      b: 'In **1977** the new government appointed a commission under **Justice J. C. Shah** to inquire into the excesses.',
      v: vExcess,
      n: 'Several actions of the period became controversial. Thousands were detained without trial. In the family planning drive, officials were given targets, and there were many complaints of coercion. In Delhi, homes and shops in some areas were demolished at short notice. The Shah Commission, headed by a retired Supreme Court judge, examined these and noted influence by people who held no official post.',
    }),
    sl('diagram', 'Was the Emergency necessary?', {
      v: vScale,
      n: 'People still debate this question, so learn both sides. The government said agitations threatened order, that an elected government was being forced out through the street, and that its economic programme needed to be carried out quickly. Critics said protest is a democratic right, that ordinary laws and courts could deal with disorder, and that the timing, just after the court verdict, raised doubts about the motive.',
    }),
    sl('example', 'Worked example 2: a both-sides answer', {
      b: 'Question: examine whether the Emergency was necessary.',
      bl: [
        'Step 1 — Two points for the government’s case, in its own terms.',
        'Step 2 — Two points for the critics’ case, in their own terms.',
        'Step 3 — Support each with evidence: a date, a law, a finding.',
        'Step 4 — End with a reasoned conclusion, for example what voters decided in 1977.',
      ],
      v: vBoth,
      n: 'When a question says examine or evaluate, the examiner wants both sides. Write two points for the government’s case and two for the critics, each with evidence such as a date, a law or a finding of the Shah Commission. Then conclude. A good conclusion uses what happened next: how voters responded in 1977 and how the Constitution was changed in 1978.',
    }),
    sl('concept', 'January 1977: elections called', {
      b: 'In **January 1977** elections were announced for **March**; leaders were released; the opposition united.',
      v: vJanata,
      n: 'In January 1977 the government announced Lok Sabha elections and released many detained leaders. With little time, the main opposition parties came together as the Janata Party. Jagjivan Ram and other leaders left the Congress, formed the Congress for Democracy, and allied with the Janata Party. The campaign turned on one issue: the Emergency itself.',
    }),
    sl('diagram', 'March 1977: the verdict', {
      v: v1977,
      n: 'The result was a historic first. The Congress lost power at the Centre. In much of north India it did not win a single seat, and Indira Gandhi lost her own seat in Rae Bareli. In the southern states, however, it held most of its ground. Morarji Desai became the first Prime Minister from outside the Congress, and the Emergency was formally lifted.',
    }),
    sl('check', 'Quick check: Rae Bareli', {
      b: 'True or false: Indira Gandhi lost her own Lok Sabha seat in 1977.',
      chk: 'tf_rae_bareli',
      n: 'Recall who the winner was in that constituency, and where you met him earlier in the chapter.',
    }),
    sl('diagram', 'The Janata years', {
      v: vJanataYears,
      n: 'The Janata government set up the Shah Commission and restored civil liberties. But the party had been formed mainly to oppose the Emergency, and its leaders differed on policy and leadership. Splits and defections followed. Morarji Desai resigned in 1979, Charan Singh was Prime Minister for a few months, and in the January 1980 election the Congress returned to power.',
    }),
    sl('concept', 'The 44th Amendment (1978)', {
      b: 'The Janata government **tightened** the emergency provisions.',
      v: v44,
      n: 'The most lasting change came in 1978. The 44th Amendment replaced the vague ground of internal disturbance with armed rebellion. A proclamation now needs the written advice of the Union Cabinet, and approval by both Houses by a special majority within a month. The rights to life and personal liberty in Articles 20 and 21 can never be suspended.',
    }),
    sl('check', 'Quick check: the new rule', {
      b: 'Could a Prime Minister alone now advise a proclamation of emergency?',
      chk: 'm_written_advice',
      n: 'Look at the second row of the table you have just seen.',
    }),
    sl('check', 'Quick check: one word', {
      b: 'Fill in: an internal emergency now needs armed ___.',
      chk: 'fb_armed',
      n: 'This word replaced internal disturbance.',
    }),
    sl('diagram', 'Lessons of the Emergency', {
      v: vLessons,
      n: 'What did India learn? First, it is very hard to end democracy here: within two years voters removed the government that had imposed the Emergency. Second, the rules for emergencies were made clearer and safer. Third, citizens and new civil liberties groups became more alert. And finally, the period showed that institutions can bend under pressure, so they need constant vigilance.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSum2,
      n: 'To sum up Part 2. The Emergency suspended the enforcement of rights, used detention and censorship, concentrated power at the Centre and brought the 42nd Amendment. The Shah Commission later examined its excesses. In 1977 voters brought the Janata Party to power, though it fell in 1979 and the Congress returned in 1980. The 44th Amendment made emergency powers harder to misuse.',
    }),
    sl('exam-tips', 'Exam tips', {
      v: vTips2,
      n: 'For one mark, give one precise answer: an article, a date or a name. For two or three marks, one explained point per mark. For five marks, five numbered points; if the question says examine or evaluate, give both sides and a conclusion. In source questions, quote the exact line, name the concept, and explain the link.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'The Crisis of Democratic Order — notes',
  sections: [
    {
      h: '1. Economic and political setting after 1971',
      t: 1,
      b: 'The Congress won the **1971** Lok Sabha election with a large majority on the slogan **Garibi Hatao**, and the **December 1971** war ended in the birth of **Bangladesh**.\n\nThen came strain:\n- the cost of the war and of caring for refugees;\n- a halt in some foreign aid;\n- the steep rise in **world oil prices in 1973**;\n- poor monsoons and a fall in food output;\n- slow industrial growth and rising unemployment.\n\nThe result was **high inflation**, scarcity and discontent, especially among students and the urban middle class.',
      terms: [['Inflation', 'A general and sustained rise in prices.']],
      v: vEcon,
      vs: [vTime1],
    },
    {
      h: '2. Movements of 1974',
      t: 1,
      b: '**Gujarat (January 1974):** students began protesting over food prices, scarcity and corruption; opposition parties joined; the state came under **President\'s Rule**, and assembly elections were held in **June 1975**.\n\n**Bihar (March 1974):** students again took the lead; **Jayaprakash Narayan** (JP) agreed to guide them, demanded the dismissal of the state government, and gave a call for **Total Revolution** (Sampoorna Kranti), a non-violent transformation of society and politics. He later led a large march to Parliament (March 1975).\n\n**Railway strike (May 1974):** unions led by **George Fernandes** struck nationwide over pay and service conditions; the government declared it illegal and arrested many workers; it ended after about three weeks.',
      terms: [
        ['Total Revolution', 'JP\'s call for a peaceful, all-round change in social, economic and political life.'],
        ['President\'s Rule', 'Central rule in a state under Article 356 when its government is dismissed or suspended.'],
      ],
      v: vMovements,
    },
    {
      h: '3. The government and the judiciary',
      t: 1,
      b: '- The government wanted wide power to amend the Constitution, including fundamental rights, to carry out its programme.\n- In **Kesavananda Bharati (1973)** the Supreme Court held that Parliament can amend the Constitution but **not its basic structure**.\n- In **April 1973** a new Chief Justice was appointed by passing over **three more senior judges**. Critics saw a threat to judicial independence; the government spoke of judges in tune with social change, and the phrase "committed judiciary" entered the debate.\n- On **12 June 1975** the **Allahabad High Court**, on a petition by **Raj Narain**, held Indira Gandhi\'s 1971 election **void** for corrupt practice. On **24 June** the **Supreme Court** granted a **partial stay**.',
      terms: [['Basic structure', 'Core features of the Constitution that cannot be removed by amendment, as held in 1973.']],
      v: vCourts,
      vs: [vJune],
    },
    {
      h: '4. The Emergency (June 1975 – March 1977)',
      t: 2,
      b: '**Proclamation:** late on **25 June 1975**, under **Article 352**, on the ground of **internal disturbance**; signed by President **Fakhruddin Ali Ahmed** on the Prime Minister\'s advice; the Cabinet endorsed it on 26 June.\n\n**What it meant:**\n- **Rights:** enforcement of fundamental rights through courts was suspended; **preventive detention** under laws such as **MISA**; leaders and workers arrested; some organisations banned. In **1976** the Supreme Court majority accepted that detainees could not seek **habeas corpus** during the suspension.\n- **Press:** **pre-censorship**; some papers left blank spaces, a few closed.\n- **Federalism:** the Union could direct states and legislate on state subjects.\n- **Parliament:** elections were postponed; the **42nd Amendment (1976)** extended legislatures\' term to six years and added Fundamental Duties and new Preamble words.\n- **Government\'s programme:** the **Twenty-Point Programme** of economic relief.',
      terms: [
        ['Preventive detention', 'Holding a person to prevent a feared act, without charge or trial.'],
        ['Censorship', 'Official control of what may be published.'],
        ['Habeas corpus', 'A writ asking a court to have a detained person produced and the detention justified.'],
      ],
      v: vHub,
      vs: [vProclaim, vCensor, v42],
    },
    {
      h: '5. Controversies and the debate',
      t: 2,
      b: '**Controversies:** mass detentions; coercion in the family planning drive; demolitions in parts of Delhi; and influence on officials by persons without official posts. The **Shah Commission** (1977), under retired judge **J. C. Shah**, inquired into these.\n\n**Government\'s case:** agitations and appeals to officials to disobey threatened order; an elected government should not be removed by street protest; pro-poor measures needed speed.\n\n**Critics\' case:** protest and movements are democratic rights; the ordinary law could deal with disorder; the timing after the court verdict raised questions about motive; the excesses showed the danger of unchecked power.',
      v: vScale,
      vs: [vExcess],
    },
    {
      h: '6. 1977 and after: lessons',
      t: 3,
      b: '**Elections:** announced in **January 1977**; leaders released; opposition parties formed the **Janata Party**; **Jagjivan Ram** formed the **Congress for Democracy**. In **March 1977** the Congress lost power at the Centre for the first time (routed in the north, steady in the south); **Morarji Desai** became Prime Minister.\n\n**Janata years:** the Shah Commission; liberties restored; but no common programme and rivalry among leaders led to splits. **Charan Singh** was Prime Minister briefly in **1979**; the Congress returned in **January 1980**.\n\n**44th Amendment (1978):** armed rebellion replaced internal disturbance; written advice of the Union Cabinet required; approval by both Houses by special majority within one month; Articles 20 and 21 cannot be suspended.\n\n**Lessons:** democracy proved resilient; constitutional safeguards were strengthened; awareness of civil liberties grew and new civil liberties groups emerged; but institutions need vigilance.',
      terms: [
        ['Janata Party', 'The party formed in 1977 by the coming together of major non-Congress parties.'],
        ['Civil liberties', 'Freedoms of the individual protected against the state, such as speech and personal liberty.'],
      ],
      v: v44,
      vs: [vTime2, vJanataYears, vLessons],
    },
  ],
  tips: '**Common mistakes**\n- Writing external aggression as the ground in 1975: it was **internal disturbance**.\n- Saying the Supreme Court set aside the election: it was the **Allahabad High Court**; the Supreme Court gave a **partial stay**.\n- Mixing up the **42nd** (1976, during the Emergency) and **44th** (1978, Janata government) Amendments.\n- Calling the Shah Commission a court: it was a **commission of inquiry**.\n- Writing one-sided answers to "examine" or "evaluate": give **both sides** and a conclusion.\n\n**How marks are usually awarded**\n- 1 mark: one correct option, term or date.\n- 2–3 marks: one explained point per mark.\n- 5 marks: five numbered points with dates and examples.\n- Source questions: quote the line, name the concept, explain.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['1971 Congress slogan', '**Garibi Hatao** (remove poverty).', 'fact', 1],
  ['Four economic strains after 1971', 'War and refugee costs; halt in some aid; 1973 oil price rise; weak monsoons.', 'concept', 1],
  ['Gujarat movement: when and who', '**January 1974**; started by **students** over prices and corruption.', 'fact', 1],
  ['Bihar movement: leader', '**Jayaprakash Narayan** (JP), from 1974.', 'fact', 1],
  ['**Total Revolution**', 'JP\'s call for non-violent change in social, economic and political life.', 'definition', 1],
  ['Railway strike', '**May 1974**; unions led by **George Fernandes**; declared illegal.', 'fact', 1],
  ['**Basic structure** doctrine', '**Kesavananda Bharati (1973)**: Parliament cannot amend the basic structure.', 'definition', 1],
  ['Supersession of 1973', 'Three senior judges passed over for Chief Justice.', 'fact', 1],
  ['12 June 1975', '**Allahabad High Court** set aside Indira Gandhi\'s 1971 election (petition by **Raj Narain**).', 'fact', 1],
  ['Partial stay (24 June 1975)', 'Could remain MP and PM, but **not vote** in the Lok Sabha.', 'fact', 1],
  ['Article for national emergency', '**Article 352**.', 'fact', 2],
  ['Ground cited in 1975', '**Internal disturbance**.', 'fact', 2],
  ['Date of the proclamation', 'Night of **25 June 1975**.', 'fact', 2],
  ['President in 1975', '**Fakhruddin Ali Ahmed**.', 'fact', 2],
  ['**MISA**', 'Maintenance of Internal Security Act: **preventive detention** without trial.', 'definition', 2],
  ['**Pre-censorship**', 'News had to be **approved** before printing.', 'definition', 2],
  ['Blank editorial', 'A **silent protest** telling readers news was censored.', 'example', 2],
  ['Habeas corpus case (1976)', 'Majority: detainees could not seek habeas corpus while rights were suspended.', 'fact', 2],
  ['42nd Amendment: two changes', 'Legislature term **six years**; **Fundamental Duties** added (and Preamble words).', 'fact', 2],
  ['Twenty-Point Programme', 'Government\'s 1975 programme of **economic relief** (land reform, prices, rural debt).', 'fact', 2],
  ['Shah Commission', '**1977**; Justice **J. C. Shah**; inquiry into Emergency **excesses**.', 'fact', 3],
  ['Three excesses examined', 'Detentions; coercive sterilisation drive; demolitions in Delhi.', 'concept', 2],
  ['**Janata Party**', 'Formed **1977** by non-Congress parties coming together.', 'definition', 3],
  ['Congress for Democracy', 'Formed by **Jagjivan Ram** after leaving the Congress, 1977.', 'fact', 3],
  ['1977 result in brief', 'Congress **lost power** at the Centre; routed in the north, held the south.', 'fact', 3],
  ['First non-Congress Prime Minister', '**Morarji Desai** (1977).', 'fact', 3],
  ['Why the Janata government fell', 'No common programme; rivalry; splits and defections (1979).', 'concept', 3],
  ['44th Amendment: ground', '**Armed rebellion** replaced internal disturbance.', 'fact', 3],
  ['44th Amendment: advice', 'Only on the **written advice** of the Union **Cabinet**.', 'fact', 3],
  ['44th Amendment: rights', 'Articles **20 and 21** cannot be suspended.', 'fact', 3],
  ['Exam trap: 42nd or 44th?', '**42nd** = 1976, during the Emergency. **44th** = 1978, safeguards.', 'exam-tip', 3],
  ['Main lesson of 1977', 'Voters can **remove** a government that curbs liberties: democracy is resilient.', 'concept', 3],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-12-political-science-chapter-test-short',
  title: 'Chapter test (short) — The Crisis of Democratic Order',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_gujarat', 'm_misa', 'm_janata', 'ar_rights'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and the 3-mark question in about 50–80 words.', items: ['s_econ_bg', 's_lessons', 's3_allahabad'] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer any ONE of the two questions in about 80–120 words.', items: [{ attempt: 1, keys: ['l_background', 'l_1977'] }] },
    { id: 'D', title: 'Section D — Source-based (4 marks)', instr: 'Read the source and answer all parts. Part (c) has an internal choice.', items: ['sb_news_desk'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-12-political-science-chapter-test-long',
  title: 'Chapter test (long) — The Crisis of Democratic Order',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_1971_slogan', 'm_total_rev', 'm_kesavananda', 'm_ground', 'm_censorship', 'm_habeas', 'm_1977_result', 'm_44', 'ar_federal', 'ar_referendum'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and 3-mark questions in about 50–80 words. Questions 13 and 15 have an internal choice.', items: ['s_judiciary', 's_rights', { attempt: 1, keys: ['s_42', 's_janata_fall'] }, 's3_govt_reasons', { attempt: 1, keys: ['s3_excesses', 's3_44'] }] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer question 16, and any ONE of questions 17 and 18, in about 80–120 words each.', items: ['l_consequences', { attempt: 1, keys: ['l_debate', 'l_lessons'] }] },
    { id: 'D', title: 'Section D — Source-based (4 marks each)', instr: 'Read each source and answer all parts. Part (c) of each has an internal choice.', items: ['sb_patna_diary', 'sb_lucknow_letter'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t03 of cbse-12-political-science-ch13 only (background to the Emergency; declaration and consequences; lessons and politics after it)',
    originality: 'every source, diary, letter, town and person in the sources is imagined and written by SOYL (labelled); no NCERT text, cartoon, box or exercise and no board or sample-paper item reused (D-036); no quotation of any real person',
    data: `chronology of ${EVENTS.length} events asserted in order (1971 to 1980); no statistics or seat numbers stated`,
    facts: 'Garibi Hatao 1971; 1971 war; 1973 oil price rise; Gujarat (January 1974) and Bihar (March 1974) movements; JP and Total Revolution; railway strike May 1974 (George Fernandes); Kesavananda Bharati 1973; supersession April 1973; Allahabad judgment 12 June 1975 (Raj Narain); partial stay 24 June; proclamation 25 June 1975 under Article 352 for internal disturbance (President Fakhruddin Ali Ahmed); MISA; censorship; habeas corpus case 1976; 42nd Amendment 1976; Shah Commission 1977; elections March 1977; Janata Party; Morarji Desai; Charan Singh 1979; January 1980 election; 44th Amendment 1978',
    neutrality: 'the government\'s stated reasons and the critics\' arguments given side by side; no evaluative adjectives about individuals; nothing after 2024',
    gate: 'schema, content lint (lintExemplar) and the deterministic verify checks run clean on this chapter',
  },
});
