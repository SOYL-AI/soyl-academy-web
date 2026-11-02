// ICSE 9 History & Civics, ch03 Elections and the Election Commission — question bank.
// Every constituency, State, voter, party, report, diary and set of notes below is imagined by SOYL and labelled as
// imagined; no textbook text, box or exercise and no specimen or board-paper item is reused (D-036); no person is
// quoted, no Article is quoted (elementary study: Articles are named, never reproduced) and no current
// office-holder, party or recent election appears. Facts are stable provisions: Article 324, the Commission set up on
// 25 January 1950, three-member Commission since 1993, six-year term or age 65, removal safeguards, the 2023 Act on the
// selection committee (dated "as of 2024"), the Model Code of Conduct, general, mid-term and by-elections.
import assert from 'node:assert/strict';
import { Q, mcq, ar, tf, fb, match, ord, short, long, source, child, Svg } from '../../icse-9-history-civics-ch01/src/lib.mjs';

const S2 = [25, 45];
const S3 = [40, 70];
const L10 = [120, 220];
const IMAG = '*(Imagined document written by SOYL for practice; the people and places in it are not real.)*';

// ---------------------------------------------------------------- shared figures
/** Direct and indirect election as two boxes, each with a mini flow and Indian examples. */
export function directIndirectFigure(alt, caption) {
  const s = new Svg(720, 250);
  s.rect(15, 15, 330, 220, { rx: 10, fill: 'accent', fillOpacity: 0.12, color: 'accent', sw: 1.8 });
  s.text(180, 40, 'Direct election', { size: 15, bold: true });
  s.rect(40, 62, 100, 40, { rx: 6, sw: 1.6 });
  s.text(90, 82, 'Voters', { size: 13 });
  s.arrow(142, 82, 218, 82, { sw: 1.8 });
  s.rect(220, 62, 100, 40, { rx: 6, sw: 1.6 });
  s.text(270, 82, 'Member', { size: 13 });
  ['Lok Sabha', 'Legislative Assembly', 'Panchayat'].forEach((t, k) => s.text(180, 140 + k * 28, t, { size: 13 }));
  s.rect(375, 15, 330, 220, { rx: 10, fill: 'green', fillOpacity: 0.12, color: 'green', sw: 1.8 });
  s.text(540, 40, 'Indirect election', { size: 15, bold: true });
  s.rect(388, 62, 80, 40, { rx: 6, sw: 1.6 });
  s.text(428, 82, 'Voters', { size: 13 });
  s.arrow(470, 82, 500, 82, { sw: 1.8 });
  s.rect(502, 62, 90, 40, { rx: 6, sw: 1.6 });
  s.text(547, 82, 'Electors', { size: 13 });
  s.arrow(594, 82, 624, 82, { sw: 1.8 });
  s.rect(626, 62, 70, 40, { rx: 6, sw: 1.6 });
  s.text(661, 82, 'Member', { size: 13 });
  ['President', 'Vice-President', 'Rajya Sabha (by MLAs)'].forEach((t, k) => s.text(540, 140 + k * 28, t, { size: 13 }));
  return s.visual(alt, caption);
}

/** The Election Commission: the President appoints a Chief Election Commissioner and Election Commissioners. */
export function commissionFigure(alt, caption) {
  const s = new Svg(720, 250);
  s.rect(255, 12, 210, 38, { rx: 8, fill: 'accent', fillOpacity: 0.15, color: 'accent', sw: 1.8 });
  s.text(360, 31, 'President appoints', { size: 14, bold: true });
  s.arrow(360, 52, 360, 84, { sw: 1.8 });
  s.rect(8, 88, 704, 84, { rx: 10, color: 'muted', sw: 1.4 });
  [['Chief Election', 'Commissioner (CEC)'], ['Election', 'Commissioner'], ['Election', 'Commissioner']].forEach(([a, b], i) => {
    const x = 22 + i * 230;
    s.rect(x, 100, 200, 60, { rx: 8, fill: i === 0 ? 'accent' : 'green', fillOpacity: 0.14, color: i === 0 ? 'accent' : 'green', sw: 1.6 });
    s.text(x + 100, 122, a, { size: 13, bold: true });
    s.text(x + 100, 142, b, { size: 13, bold: true });
  });
  s.text(360, 197, 'Since 1993: the CEC and two Election Commissioners', { size: 13 });
  s.text(360, 223, 'Term: six years or until age 65, whichever comes first', { size: 13 });
  return s.visual(alt, caption);
}

/** Even-spaced (not to scale) timeline of the Commission: [yearLabel, line1, line2]. */
export function ecTimelineFigure(events, alt, caption) {
  const s = new Svg(720, 190);
  const n = events.length;
  const gap = 560 / (n - 1);
  s.arrow(30, 80, 700, 80, { sw: 1.8 });
  events.forEach(([year, a, b], i) => {
    const x = 90 + i * gap;
    s.dot(x, 80, 6, 'accent');
    s.text(x, 55, String(year), { size: 15, bold: true });
    s.text(x, 108, a, { size: 12 });
    s.text(x, 126, b, { size: 12 });
  });
  s.text(360, 168, 'Schematic, not to scale', { size: 11, muted: true });
  return s.visual(alt, caption);
}
export const EC_TIMELINE = [
  ['1950', 'Commission set up', '(25 January)'],
  ['1989-90', 'Briefly a', 'multi-member body'],
  ['1993', 'CEC and two', 'Commissioners'],
  ['2023', 'Act on selection', 'committee (as of 2024)'],
];
export const EC_TIMELINE_YEARS = [1950, 1989, 1993, 2023];
assert.deepEqual(EC_TIMELINE_YEARS, [...EC_TIMELINE_YEARS].sort((a, b) => a - b));

/** General, mid-term and by-election as three boxes. */
export function typesFigure(alt, caption) {
  const s = new Svg(720, 250);
  const cols = [
    ['General election', 'accent', ['All seats of the House', 'Held after the full term', 'Whole House renewed', 'Usually every five years', 'for Lok Sabha']],
    ['Mid-term election', 'green', ['Held before the term ends', 'House is dissolved early', 'All seats again', 'New House gets a', 'fresh full term']],
    ['By-election', 'blue', ['Only one seat', 'Seat falls vacant: death,', 'resignation, disqualification', 'Generally held within', 'six months']],
  ];
  cols.forEach(([title, col, lines], i) => {
    const x = 15 + i * 235;
    s.rect(x, 15, 220, 220, { rx: 10, fill: col, fillOpacity: 0.12, color: col, sw: 1.8 });
    s.text(x + 110, 40, title, { size: 15, bold: true });
    s.line(x + 15, 56, x + 205, 56, { sw: 1, color: col });
    lines.forEach((t, k) => s.text(x + 110, 82 + k * 30, t, { size: 12 }));
  });
  return s.visual(alt, caption);
}

// ================================================================ t01 Meaning of election; direct and indirect
Q('m_meaning', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Which statement best describes an election in a democracy?',
  opts: [
    'A process in which voters choose their representatives or office-holders by casting votes',
    'A process in which the oldest member of a community becomes the ruler',
    'A process in which a ruler names a successor from the family',
    'A process in which officials are picked by a draw of lots among all citizens',
  ],
  sol: 'An election is the method by which voters choose representatives or office-holders through voting. Rule by the eldest, by family succession or by a draw of lots does not involve the voters making a choice among candidates.',
}));
Q('m_why_rep', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'In the imagined country of Ardanya the people never vote; their rulers are chosen by one family. Which feature of a representative democracy is missing there?',
  opts: [
    'Elections that let the people choose and change those who make decisions for them',
    'A flag and an anthem',
    'A capital city with a large assembly hall',
    'Taxes collected from citizens',
  ],
  sol: 'In a representative democracy the people rule through chosen representatives, and elections are how they choose them and remove them. A flag, an assembly hall or taxes may exist under any kind of government, so they do not mark out a democracy.',
}));
Q('m_direct_ls', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Which one of the following bodies has its members elected directly by the voters?',
  opts: ['The Lok Sabha', 'The Rajya Sabha (members from the States)', 'The office of the President', 'The office of the Vice-President'],
  sol: 'Lok Sabha members are elected directly by voters in their constituencies. Rajya Sabha members from the States are elected by the elected members of the State Legislative Assemblies, and the President and the Vice-President are elected by electors, so those three are indirect.',
}));
Q('m_village_direct', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'At a polling booth in the imagined village of Kesarwadi, every adult resident marks a ballot paper for one of five candidates for the village panchayat seat of her ward. What kind of election is this?',
  opts: ['A direct election', 'An indirect election', 'A nomination without a vote', 'An election of electors only'],
  sol: 'The voters choose the candidate themselves, with no intermediate electors, so it is a direct election. It is not indirect because no group of electors stands between voters and the winner, and it is not a nomination because a vote takes place.',
}));
Q('m_council_indirect', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'In the imagined district of Ambarpet, voters elect forty ward councillors, and these councillors then vote among themselves to choose the chairperson of the district board. How should the choice of the chairperson be described?',
  opts: ['Indirect election, because the voters\' choice passes through elected councillors', 'Direct election, because voters first elected the councillors', 'Neither, because chairpersons are never elected', 'A general election, because forty seats are involved'],
  sol: 'The chairperson is chosen by elected councillors and not by the voters themselves, so this stage is indirect. The councillors alone were chosen directly. A general election is the renewal of a whole House, not the choice of one office-holder.',
}));
Q('m_classify_row', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: 'A student prepares a table of four imagined entries. Which entry matches a body with the wrong method of election?',
  opts: [
    'Legislative Assembly: indirect election by the Lok Sabha',
    'Lok Sabha: direct election by voters of each constituency',
    'Rajya Sabha (State seats): indirect election by MLAs',
    'Panchayat member: direct election by the voters of a ward',
  ],
  sol: 'Members of a Legislative Assembly are elected directly by the voters of their constituencies, not by the Lok Sabha, so that row is wrong. The other three rows state correct methods.',
}));
Q('tf_panchayat_direct', tf({
  t: 1, d: 2, c: 'application', ans: true,
  stem: 'True or false? When the voters of the imagined ward of Mirzakhel mark a ballot for their own panchayat member, that is an example of direct election.',
  sol: 'Voters choose the member themselves with no electors in between, so the election is direct.',
}));
Q('ar_why_elect', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'Regular elections help citizens of the imagined State of Samudrapur to change a government that has failed them.',
  r: 'In a representative democracy those who govern are chosen by the voters for a fixed term.',
  sol: 'Both are true. Because representatives hold office only for a fixed term and are chosen by voters, the voters get a regular chance to replace a government, which explains the assertion.',
}));
Q('ar_indirect', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'A-true-R-false',
  a: 'The Rajya Sabha members of a State are elected by indirect election.',
  r: 'They are chosen directly by all adult voters of the State.',
  sol: 'A is true: they are elected by the elected MLAs of the State. R is false because adult voters at large do not choose them.',
}));
Q('mt_direct_indirect', match({
  t: 1, d: 2, c: 'recall', marks: 2,
  stem: 'Match each office or body with the method by which it is filled.',
  pairs: [
    ['Lok Sabha member', 'Direct election by voters'],
    ['President', 'Indirect election by electors'],
    ['Rajya Sabha member from a State', 'Elected by the State\'s elected MLAs'],
    ['Panchayat member', 'Direct election by ward voters'],
  ],
  sol: 'The Lok Sabha and the panchayats are directly elected, the President is chosen by electors, and Rajya Sabha members from a State are chosen by that State\'s elected MLAs.',
}));
Q('s_meaning_election', short({
  t: 1, d: 1, c: 'understanding', marks: 2, wl: S2,
  stem: 'What is meant by an election? Why is it needed in a representative democracy?',
  model: 'An **election** is the process in which **voters choose** their representatives by voting. It is needed because in a representative democracy the people **cannot rule directly**, so they elect people to govern on their behalf.',
  sol: 'Meaning, then the need.',
  scheme: [['Meaning: voters choose representatives by voting', 1], ['Need: people rule through representatives', 1]],
}));
Q('s_direct_indirect_diff', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Distinguish between direct and indirect election.',
  model: 'In a **direct election** the **voters themselves** choose the representative, as for the Lok Sabha. In an **indirect election** the voters or members first choose **electors**, who then choose the office-holder, as for the President.',
  sol: 'Contrast with one example each.',
  scheme: [['Direct election with example', 1], ['Indirect election with example', 1]],
}));
Q('s_classify_poll', short({
  t: 1, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'In the imagined Lohitgarh, (a) citizens vote to choose a member for the State Legislative Assembly and (b) the elected assembly members then vote to send a representative to the Rajya Sabha. Name the type of election in each case.',
  model: '(a) A **direct election**, because the citizens choose their member themselves.\n(b) An **indirect election**, because the **elected MLAs** act as electors and choose the Rajya Sabha member.',
  sol: 'Classify each case with its reason.',
  scheme: [['(a) Direct election with reason', 1], ['(b) Indirect election with reason', 1]],
}));
Q('s3_direct_indirect_eg', short({
  t: 1, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'Sort the following into direct and indirect elections and give a reason: (a) members of the Legislative Assembly, (b) the Vice-President, (c) a ward member of a panchayat.',
  model: '(a) **Direct**: voters of each constituency choose the member.\n(b) **Indirect**: an **electoral college** of Members of Parliament chooses the Vice-President.\n(c) **Direct**: the voters of the ward choose the member themselves.',
  sol: 'Each item sorted with a reason.',
  scheme: [['(a) with reason', 1], ['(b) with reason', 1], ['(c) with reason', 1]],
}));
Q('l_election_meaning', long({
  t: 1, d: 2, c: 'understanding', marks: 10, wl: L10,
  stem: 'Elections are the lifeline of a representative democracy.\n\n(i) What is an election, and why is it essential in a representative democracy? **[3]**\n(ii) Distinguish direct election from indirect election. **[3]**\n(iii) Give two examples of each kind of election in India and explain who the voters or electors are in each example. **[4]**',
  model: '(i) An **election** is the process by which voters choose representatives by voting. In a **representative democracy** the people cannot make every decision themselves, so they elect representatives, hold them **answerable**, and can **change** them at the next election.\n\n(ii) In a **direct election** the **voters themselves** choose the representative. In an **indirect election** the voters or members choose **electors** first, and the electors choose the office-holder.\n\n(iii) **Direct:** Lok Sabha members, chosen by the voters of each constituency; panchayat members, chosen by the voters of a ward. **Indirect:** the President, chosen by an **electoral college** of elected members; Rajya Sabha members from a State, chosen by that State\'s **elected MLAs**.',
  sol: 'Meaning and need; contrast; examples with voters or electors.',
  scheme: [['(i) Meaning of election', 1], ['(i) Need in a representative democracy', 2], ['(ii) Direct election', 1.5], ['(ii) Indirect election', 1.5], ['(iii) Two direct examples with voters', 2], ['(iii) Two indirect examples with electors', 2]],
}));

// ================================================================ t02 Election Commission: composition and appointment
Q('m_article324', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'Under which Article of the Constitution of India is the Election Commission set up?',
  opts: ['Article 324', 'Article 352', 'Article 368', 'Article 21'],
  sol: 'The Election Commission derives from Article 324, which places the superintendence, direction and control of elections in it. Article 352 deals with emergencies, Article 368 with amendment of the Constitution and Article 21 with protection of life and personal liberty.',
}));
Q('m_composition', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'How is the Election Commission of India made up?',
  opts: [
    'A Chief Election Commissioner and such other Election Commissioners as the President may fix',
    'A single judge of the Supreme Court',
    'The Prime Minister and the Cabinet',
    'All the Chief Ministers of the States',
  ],
  sol: 'The Commission has a Chief Election Commissioner and such other Election Commissioners as the President may fix from time to time. It is not a single judge, the Cabinet or a council of Chief Ministers.',
}));
Q('m_term_scenario', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'Rao is appointed Chief Election Commissioner in an imagined year when she is exactly 63 years and 6 months old. For how long can she hold the office?',
  opts: ['About one and a half years, until she turns 65', 'Six years, because that is the full term', 'Five years', 'Until the next general election'],
  sol: 'The term is six years or until age 65, whichever is earlier. Age 65 comes after one and a half years, which is before six years, so she retires then. The other options ignore the age limit or tie the term to elections.',
}));
Q('m_removal_cec', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'In what manner can the Chief Election Commissioner be removed from office?',
  opts: ['Only in the manner and on the grounds on which a Judge of the Supreme Court is removed', 'By the Prime Minister at will', 'By the Council of Ministers at any time', 'By a simple order of any High Court'],
  sol: 'The CEC can be removed only like a Judge of the Supreme Court, which needs a special process in Parliament. The Prime Minister, the Council of Ministers or a High Court has no power to dismiss the CEC at will.',
}));
Q('m_ec_removal', mcq({
  t: 2, d: 3, c: 'understanding',
  stem: 'How may an Election Commissioner other than the Chief Election Commissioner be removed?',
  opts: ['Only on the recommendation of the Chief Election Commissioner', 'By the Prime Minister alone', 'By the Chief Minister of any State', 'By the Election Commissioners themselves, by a vote'],
  sol: 'Other Election Commissioners can be removed only on the recommendation of the CEC, which protects them from pressure by the government. The Prime Minister alone, a Chief Minister or the Commissioners voting among themselves cannot remove them.',
}));
Q('m_salary_scn', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'The government of the imagined country of Veluvanam proposes to cut the salary and allowances of its serving Chief Election Commissioner because the Commission refused to postpone a poll. Which safeguard of independence is being tested?',
  opts: [
    'The rule that service conditions cannot be changed to the CEC\'s disadvantage after appointment',
    'The rule that the CEC must be a retired judge',
    'The rule that the CEC is elected by the voters',
    'The rule that Election Commissioners hold office for life',
  ],
  sol: 'A government should not be able to punish a CEC by worsening pay or conditions after appointment, and the safeguard forbids it. The CEC is not required to be a retired judge, is appointed not elected, and Commissioners do not serve for life.',
}));
Q('m_not_safeguard', mcq({
  t: 2, d: 4, c: 'analysis',
  stem: 'A student lists four arrangements about the Election Commission. Which one does NOT help to keep the Commission independent?',
  opts: [
    'The Prime Minister may dismiss the CEC whenever a poll result is disliked',
    'The CEC is removable only like a Supreme Court Judge',
    'Other Commissioners are removable only on the CEC\'s recommendation',
    'Conditions of service cannot be made worse after appointment',
  ],
  sol: 'If the Prime Minister could dismiss the CEC at will, the Commission could be pressed to favour the ruling side, so that arrangement would damage independence (and the Constitution does not provide for it). The other three are real safeguards.',
}));
Q('m_selection2023', mcq({
  t: 2, d: 3, c: 'recall',
  stem: 'As of 2024, under a law passed in 2023, appointments of the Chief Election Commissioner and Election Commissioners are made by the President on the recommendation of which body?',
  opts: [
    'A selection committee of the Prime Minister, a Union Cabinet Minister nominated by the Prime Minister, and the Leader of the Opposition in the Lok Sabha (or leader of the largest opposition party)',
    'A committee made up entirely of retired Chief Election Commissioners',
    'The Council of Ministers of a State',
    'A committee elected by all the voters of India',
  ],
  sol: 'The 2023 Act provides a selection committee of three: the Prime Minister, a Union Cabinet Minister nominated by the Prime Minister, and the Leader of the Opposition (or the leader of the largest opposition party) in the Lok Sabha. The other bodies named have no such role. This describes the position as of 2024.',
}));
Q('fb_art324', fb({
  t: 2, d: 1, c: 'recall',
  stem: 'The Election Commission of India is set up under Article ___ of the Constitution.',
  acc: [['324']],
  sol: 'Article 324 provides for the Election Commission.',
}));
Q('fb_term', fb({
  t: 2, d: 2, c: 'recall',
  stem: 'The Chief Election Commissioner holds office for six years or until the age of ___ years, whichever is earlier.',
  acc: [['65', 'sixty-five', 'sixty five']],
  sol: 'The age limit is 65 years.',
}));
Q('ar_independence', ar({
  t: 2, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'The Chief Election Commissioner of the imagined State of Neelavan can act without fear of the ruling party.',
  r: 'The Chief Election Commissioner can be removed only in the manner of a Judge of the Supreme Court.',
  sol: 'Both are true. Because removal is so difficult, the ruling party cannot easily dismiss the CEC, and this protection explains why the CEC can act without fear.',
}));
Q('ord_ec', ord({
  t: 2, d: 3, c: 'application', marks: 2,
  stem: 'Arrange these developments in the history of the Election Commission in the order in which they happened.',
  items: [
    'The Commission is set up on 25 January 1950',
    'The Commission is briefly made a multi-member body in 1989-90',
    'The Commission becomes a three-member body from 1993',
    'A law of 2023 provides a selection committee for appointments',
  ],
  sol: 'The Commission began in 1950, was briefly multi-member in 1989-90, became three-member from 1993, and the selection committee law came in 2023.',
}));
Q('s_composition', short({
  t: 2, d: 1, c: 'recall', marks: 2, wl: S2,
  stem: 'State the composition of the Election Commission of India and say who appoints its members.',
  model: 'It consists of a **Chief Election Commissioner** and such other **Election Commissioners** as the President fixes; since **1993** it has had two. They are appointed by the **President**.',
  sol: 'Members and the appointing authority.',
  scheme: [['CEC and Election Commissioners (three members since 1993)', 1], ['Appointed by the President', 1]],
}));
Q('s_safeguards', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Mention two provisions that protect the independence of the Election Commission.',
  model: '1. The **Chief Election Commissioner** can be removed only like a **Judge of the Supreme Court**.\n2. Service conditions **cannot be changed to the disadvantage** of the CEC after appointment. (Also: other Commissioners are removable only on the CEC\'s recommendation.)',
  sol: 'Any two safeguards.',
  scheme: [['First safeguard', 1], ['Second safeguard', 1]],
}));
Q('s_why_indep', short({
  t: 2, d: 3, c: 'evaluation', marks: 2, wl: S2,
  stem: 'Why must the Election Commission be independent of the government, even though the President appoints its members?',
  model: 'The **ruling party contests elections too**, so a Commission under its control could not be **fair**. Safeguards such as **difficult removal** and **fixed service conditions** let the Commission act without fear after its members are appointed.',
  sol: 'The need for a neutral umpire; how safeguards help.',
  scheme: [['Ruling party also contests, so neutrality is needed', 1], ['Safeguards free the Commission after appointment', 1]],
}));
Q('s3_independence_scenario', short({
  t: 2, d: 4, c: 'application', marks: 3, wl: S3,
  stem: 'In the imagined country of Veluvanam, a minister says the government will dismiss the Chief Election Commissioner for refusing to postpone a poll. Explain why this would be difficult in India, and what harm it would do if it were easy.',
  model: '1. The **CEC** can be removed only like a **Supreme Court Judge**, through a special process, not at the government\'s wish.\n2. If it were easy, the CEC would **fear** the government and might **favour** the ruling party.\n3. Voters would lose faith in the **fairness** of the election.',
  sol: 'Safeguard; the harm; effect on trust.',
  scheme: [['Difficult removal explained', 1], ['Harm: fear and favour', 1], ['Loss of public faith in fair elections', 1]],
}));
Q('l_ec_composition', long({
  t: 2, d: 2, c: 'understanding', marks: 10, wl: L10,
  stem: 'The Election Commission is the guardian of free and fair elections.\n\n(i) Under which Article is it set up, and when was it set up? **[3]**\n(ii) Describe its composition and how its members are appointed, with the term of the Chief Election Commissioner. **[3]**\n(iii) Explain how the independence of the Commission is protected. **[4]**',
  model: '(i) It is set up under **Article 324** of the Constitution, on **25 January 1950**, a date now observed as **National Voters\' Day**.\n\n(ii) It has a **Chief Election Commissioner** and such other **Election Commissioners** as the President fixes; since **1993** there are two. They are appointed by the **President**; as of 2024 this follows the recommendation of a **selection committee** under a law of 2023. The CEC serves **six years or until age 65**, whichever is earlier.\n\n(iii) The **CEC** can be removed only like a **Supreme Court Judge**. Conditions of service cannot be changed to the CEC\'s **disadvantage** after appointment. Other Commissioners can be removed only on the **CEC\'s recommendation**. These rules keep the Commission free from fear of the government.',
  sol: 'Article and date; composition, appointment and term; safeguards.',
  scheme: [['(i) Article 324', 1.5], ['(i) Date of setting up', 1.5], ['(ii) Composition and appointment', 1.5], ['(ii) Term', 1.5], ['(iii) Removal safeguards', 2], ['(iii) Service conditions and effect', 2]],
}));
Q('l_independence', long({
  t: 2, d: 4, c: 'evaluation', marks: 10, wl: L10,
  stem: 'In the imagined country of Sundarvel, an Election Commission has been newly created, and its members are chosen by the President. Some citizens worry that it may not be fair.\n\n(i) Name the safeguards that Indian law gives to the Chief Election Commissioner. **[3]**\n(ii) Explain how the other Election Commissioners are protected. **[3]**\n(iii) Evaluate how far such safeguards can make a Commission neutral, and what else is needed. **[4]**',
  model: '(i) The **CEC** can be removed only like a **Supreme Court Judge**. The CEC\'s **conditions of service** cannot be altered to disadvantage after appointment. The CEC has a fixed **term**.\n\n(ii) Other Commissioners can be removed only on the **CEC\'s recommendation**, so the government cannot dismiss them directly.\n\n(iii) The safeguards make it hard to **punish** the Commission for firm decisions, so they help neutrality. But the way members are **chosen** matters as well, so a transparent selection and honest **conduct** by the members are needed, together with **public scrutiny**, a free press and courts that can examine disputes.',
  sol: 'Safeguards for the CEC; for other Commissioners; evaluation.',
  scheme: [['(i) Removal like a Judge', 1.5], ['(i) Service conditions and term', 1.5], ['(ii) Removal on CEC\'s recommendation', 3], ['(iii) How the safeguards help', 2], ['(iii) What else is needed', 2]],
}));

// ================================================================ t03 Functions of the Election Commission
Q('m_rolls', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'Which of these is a function of the Election Commission?',
  opts: ['Preparing and revising the electoral rolls', 'Making laws for the country', 'Deciding civil disputes between citizens', 'Commanding the armed forces'],
  sol: 'The Commission is responsible for preparing and revising the electoral rolls, the lists of eligible voters. Making laws is for Parliament, deciding disputes is for the courts and the armed forces are commanded by the President on the advice of the government.',
}));
Q('m_symbol', mcq({
  t: 3, d: 2, c: 'recall',
  stem: 'Which of the following does the Election Commission do for political parties?',
  opts: ['Recognises them and allots election symbols', 'Appoints their presidents', 'Decides their policies', 'Pays the salaries of their members'],
  sol: 'The Commission recognises parties as national or State parties and allots election symbols. It does not appoint party presidents, decide policies or pay salaries.',
}));
Q('m_delimitation', mcq({
  t: 3, d: 3, c: 'understanding',
  stem: 'A student writes that the Election Commission itself redraws the boundaries of constituencies. What is the correction?',
  opts: [
    'A separate Delimitation Commission does this work; the Election Commission conducts the elections',
    'The Supreme Court redraws the boundaries each year',
    'Constituency boundaries never change',
    'The Prime Minister draws the boundaries personally',
  ],
  sol: 'Boundaries are fixed by a separate Delimitation Commission set up by law, while the Election Commission conducts the polls. The boundaries are redrawn from time to time, and neither the Supreme Court each year nor the Prime Minister personally does this work.',
}));
Q('m_mcc_meaning', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'What is the Model Code of Conduct?',
  opts: [
    'A set of guidelines for political parties and candidates to be followed during an election',
    'A code of punishments for every crime',
    'A manual of rules for the working of Parliament',
    'A list of symbols allotted to parties',
  ],
  sol: 'The Model Code of Conduct is a set of guidelines on how parties and candidates should behave during an election. It is not a criminal code, a manual for Parliament or a list of symbols.',
}));
Q('m_mcc_period', mcq({
  t: 3, d: 2, c: 'recall',
  stem: 'During which period does the Model Code of Conduct apply?',
  opts: ['From the announcement of the election schedule until the results are declared', 'Only on the day of polling', 'Throughout the five years between elections', 'Only during the counting of votes'],
  sol: 'The Code applies from the date the schedule is announced until the results are declared. It is not limited to polling day or counting, and it does not apply during the whole term between elections.',
}));
Q('m_mcc_scenario', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'Two days after the Commission announces the schedule for the imagined State of Lohitgarh, a minister inaugurates a new bridge using a government vehicle and announces a new grant for voters of his constituency. What does the Model Code of Conduct expect?',
  opts: [
    'That official machinery and new announcements by the government should not be used to favour any party',
    'Nothing, because ministers are exempt from the Code',
    'That the minister should be allowed to announce more grants on polling day',
    'That the Code applies only to candidates who are not ministers',
  ],
  sol: 'The Code aims to prevent misuse of official machinery and fresh announcements that might sway voters once the schedule is out. Ministers are not exempt, and it applies equally to those in power.',
}));
Q('m_fn_not', mcq({
  t: 3, d: 4, c: 'analysis',
  stem: 'A student lists the work of the Election Commission as: preparing electoral rolls, allotting symbols, appointing observers and choosing the winning candidate in each constituency. Which item is wrongly included?',
  opts: ['Choosing the winning candidate, because the voters decide the winner', 'Preparing electoral rolls', 'Allotting symbols', 'Appointing observers'],
  sol: 'The voters choose the winner by voting; the Commission only conducts the poll and declares the result. The other three are genuine functions of the Commission.',
}));
Q('m_roll_scn', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'Vimal turns eighteen in the imagined town of Harshpura, but before the election he finds that his name is missing from the electoral roll. What is the sensible step for him?',
  opts: [
    'To apply to the electoral authorities of the Commission to have his name added to the roll',
    'To vote with a friend\'s card',
    'To wait for the next general election without doing anything',
    'To ask a political party to vote on his behalf',
  ],
  sol: 'The Commission is responsible for the rolls, so an eligible adult applies to be added. Voting with someone else\'s card is an offence, doing nothing wastes the chance, and no party can vote on a person\'s behalf.',
}));
Q('m_state_commission', mcq({
  t: 3, d: 3, c: 'understanding',
  stem: 'The Election Commission of India conducts elections to Parliament and State Legislatures. Who conducts elections to the panchayats and municipalities?',
  opts: ['The State Election Commissions', 'The Delimitation Commission', 'The Finance Commission', 'The Supreme Court'],
  sol: 'Panchayat and municipal elections are conducted by the State Election Commissions. The Delimitation Commission draws boundaries, the Finance Commission deals with revenue sharing and the Supreme Court is a court.',
}));
Q('fb_mcc', fb({
  t: 3, d: 2, c: 'recall',
  stem: 'The Model Code of ___ is a set of guidelines for parties and candidates during an election.',
  acc: [['Conduct', 'conduct']],
  sol: 'It is called the Model Code of Conduct.',
}));
Q('tf_mcc_after', tf({
  t: 3, d: 2, c: 'application', ans: false,
  stem: 'True or false? In the imagined State of Kaveri Vale, the Model Code of Conduct begins only on polling day, so a party may freely misuse government vehicles for campaigning until then.',
  sol: 'The Code starts when the schedule is announced and lasts until the results, so misuse of government vehicles is covered from the day of announcement.',
}));
Q('tf_delim', tf({
  t: 3, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? Redrawing the boundaries of constituencies is the task of a separate Delimitation Commission and not of the Election Commission.',
  sol: 'A Delimitation Commission set up by law fixes the boundaries, while the Election Commission conducts the polls.',
}));
Q('ar_mcc', ar({
  t: 3, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'The Model Code of Conduct asks the governing party in the imagined State of Ketavar not to use official vehicles for its campaign.',
  r: 'The Code aims to keep elections free and fair by preventing misuse of official machinery.',
  sol: 'Both are true. Using official vehicles for a campaign would give the governing party an unfair advantage, and the Code\'s purpose of preventing misuse of official machinery explains the restriction.',
}));
Q('mt_functions', match({
  t: 3, d: 2, c: 'recall', marks: 2,
  stem: 'Match each task with the body that performs it.',
  pairs: [
    ['Preparing electoral rolls', 'Election Commission'],
    ['Redrawing constituency boundaries', 'Delimitation Commission'],
    ['Panchayat elections', 'State Election Commission'],
    ['Making laws', 'Parliament'],
  ],
  sol: 'The Election Commission prepares rolls; a Delimitation Commission redraws boundaries; State Election Commissions conduct panchayat polls; Parliament makes laws.',
}));
Q('s_mcc_meaning', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'What is the Model Code of Conduct and when does it come into effect?',
  model: 'It is a **set of guidelines** for parties and candidates to keep elections fair. It comes into effect from the **announcement of the election schedule** and lasts until the **results are declared**.',
  sol: 'Meaning and period.',
  scheme: [['Guidelines for parties and candidates', 1], ['From announcement of schedule until results', 1]],
}));
Q('s_delim_confusion', short({
  t: 3, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: 'A student says the Election Commission fixes the boundaries of constituencies. Explain how the statement is wrong.',
  model: 'Boundaries are fixed by a separate **Delimitation Commission** created by law. The **Election Commission** conducts the elections held in constituencies whose boundaries have **already been drawn**.',
  sol: 'Correct body; the Commission\'s actual role.',
  scheme: [['Delimitation Commission fixes boundaries', 1], ['Election Commission conducts the polls', 1]],
}));
Q('s3_mcc_purpose', short({
  t: 3, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain the purpose of the Model Code of Conduct in three points.',
  model: '1. It helps to keep the election **free and fair**.\n2. It prevents the party in power from **misusing official machinery** such as vehicles and staff.\n3. It guides parties and candidates to campaign **without hatred** or false claims, giving all a **level field**.',
  sol: 'Three purposes.',
  scheme: [['Free and fair elections', 1], ['No misuse of official machinery', 1], ['Level field for all parties', 1]],
}));
Q('s3_poll_work', short({
  t: 3, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'The Commission is preparing for a poll in the imagined constituency of Taralpur. Name three tasks it undertakes before voting day and say why each matters.',
  model: '1. **Updating the electoral roll**, so that every eligible voter is listed.\n2. **Fixing the schedule** and supervising **nominations**, so candidates have a fair chance to stand.\n3. **Appointing observers** to watch that rules are followed.',
  sol: 'Three tasks with a reason each.',
  scheme: [['Roll updated with reason', 1], ['Schedule and nominations with reason', 1], ['Observers with reason', 1]],
}));
Q('s3_mcc_scenario', short({
  t: 3, d: 4, c: 'application', marks: 3, wl: S3,
  stem: 'Three things happen after the schedule is announced in the imagined State of Ketavar: (a) a party holds a rally without hurting anyone\'s feelings, (b) the government announces a new scheme for voters in one district, (c) a candidate uses a government office for a campaign meeting. Which of these break the Model Code and why?',
  model: '(a) Does **not** break the Code; fair campaigning is allowed.\n(b) **Breaks** the Code: a **fresh announcement** by the government may influence voters unfairly.\n(c) **Breaks** the Code: it is **misuse of official machinery** or premises for party work.',
  sol: 'Classify each with a reason.',
  scheme: [['(a) allowed', 1], ['(b) breaks, with reason', 1], ['(c) breaks, with reason', 1]],
}));
Q('l_functions', long({
  t: 3, d: 2, c: 'recall', marks: 10, wl: L10,
  stem: 'The Election Commission has wide responsibilities during elections.\n\n(i) State three functions of the Election Commission connected with voters and the electoral roll. **[3]**\n(ii) State three functions connected with political parties and candidates. **[3]**\n(iii) Explain how the Commission conducts the polls and supervises them. **[4]**',
  model: '(i) It **prepares and revises** the electoral rolls, adds eligible new voters and removes names that should not remain, and **issues photo identity cards (EPIC)** to registered voters.\n\n(ii) It **recognises political parties** and **allots symbols**, fixes the **election schedule**, and supervises the **filing and scrutiny of nominations** of candidates.\n\n(iii) It makes arrangements for **polling stations**, deploys staff, uses **electronic voting machines** with a paper trail, appoints **observers**, enforces the **Model Code of Conduct** and sees that votes are counted and results declared properly. A separate Delimitation Commission, not the Election Commission, draws constituency boundaries.',
  sol: 'Functions on voters; on parties and candidates; on conduct of polls.',
  scheme: [['(i) Three functions on voters', 3], ['(ii) Three functions on parties and candidates', 3], ['(iii) Arrangements and staff', 1.5], ['(iii) Observers, Code and counting', 2.5]],
}));
Q('l_mcc', long({
  t: 3, d: 3, c: 'application', marks: 10, wl: L10,
  stem: 'The Model Code of Conduct comes into force as soon as the schedule is announced for the imagined State of Samudrapur.\n\n(i) What is the Model Code of Conduct, and for how long does it apply? **[3]**\n(ii) Give three things that parties and candidates are expected to avoid. **[3]**\n(iii) Explain how the Code helps to make an election free and fair. **[4]**',
  model: '(i) It is a **set of guidelines** that the Commission expects parties and candidates to follow. It applies from the **announcement of the schedule** until the **results are declared**.\n\n(ii) They should avoid **misusing official vehicles, staff or premises** for campaigns; making **new announcements or grants** that may sway voters; and **speech that stirs hatred** or insults on grounds of community or religion.\n\n(iii) The Code gives all parties a **level field**: the party in power cannot use **official machinery** to gain an edge. It keeps campaigns **peaceful**, protects voters from pressure and gifts, and so voters can decide on the merits, which is what **free and fair** means.',
  sol: 'Meaning and period; three things to avoid; how it helps fairness.',
  scheme: [['(i) Meaning', 1.5], ['(i) Period', 1.5], ['(ii) Three things to avoid', 3], ['(iii) Level field and official machinery', 2], ['(iii) Peaceful campaign and voter freedom', 2]],
}));

// ================================================================ t04 General, mid-term and by-election
Q('m_bye_time', mcq({
  t: 4, d: 2, c: 'recall',
  stem: 'Within what period is a by-election to fill a vacant seat generally held?',
  opts: ['Within six months', 'Within six days', 'Within five years', 'Only at the next general election'],
  sol: 'A vacant seat is generally filled by a by-election within six months. Six days is too short, five years is the full term, and waiting for the next general election would leave the seat unfilled for long.',
}));
Q('m_midterm', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'Which of the following describes a mid-term election?',
  opts: ['An election held before the full term of the House ends, after it has been dissolved early', 'An election held for one seat after the death of its member', 'An election held every five years without fail', 'An election for the office of the Vice-President'],
  sol: 'A mid-term election follows early dissolution of a House, before its term ends. The second option is a by-election, the third a general election after the full term, and the fourth is an indirect election to an office.',
}));
Q('m_scn_by', mcq({
  t: 4, d: 3, c: 'application',
  stem: 'The member of the Legislative Assembly for the imagined constituency of Sundarvel dies in office. What kind of election will fill the seat?',
  opts: ['A by-election in Sundarvel alone', 'A general election for the whole Assembly', 'A mid-term election for the whole Assembly', 'No election; the seat stays vacant for the rest of the term'],
  sol: 'A single vacancy caused by death is filled by a by-election in that constituency. The whole Assembly does not have to be re-elected, and the seat is not left empty for the full term.',
}));
Q('m_scn_mid', mcq({
  t: 4, d: 3, c: 'application',
  stem: 'After three years, the Legislative Assembly of the imagined State of Urvanta is dissolved because no party can form a stable government, and fresh polls are held for all seats. What is this election called?',
  opts: ['A mid-term election', 'A by-election', 'A general election after the full term', 'A local body election'],
  sol: 'Elections held for the whole House after early dissolution, before five years are over, are mid-term elections. By-elections fill single seats, a general election after the full term would come at five years, and local body elections concern panchayats and municipalities.',
}));
Q('m_scn_general', mcq({
  t: 4, d: 3, c: 'application',
  stem: 'The Lok Sabha of the imagined country of Aranyapur completes its full five-year term and polls are held for every seat. What is this election called?',
  opts: ['A general election', 'A by-election', 'A mid-term election', 'A nomination round'],
  sol: 'When all seats are filled after the full term, the election is a general election. By-elections concern one seat, mid-term elections follow early dissolution, and nomination is only one step of an election.',
}));
Q('m_classify_three', mcq({
  t: 4, d: 4, c: 'analysis',
  stem: 'An imagined news bulletin lists: (1) polls for one vacant seat in Kesarwadi, (2) polls for all seats after an early dissolution in Lohitgarh, (3) polls for all seats after a full term in Neelavan. Which option names the three correctly in order?',
  opts: [
    'By-election, mid-term election, general election',
    'General election, by-election, mid-term election',
    'Mid-term election, general election, by-election',
    'By-election, general election, mid-term election',
  ],
  sol: 'One seat means a by-election, all seats after early dissolution means a mid-term election, and all seats after a full term means a general election. The other options shuffle these labels.',
}));
Q('fb_bye', fb({
  t: 4, d: 1, c: 'recall',
  stem: 'An election held to fill a single seat that has become vacant is called a ___.',
  acc: [['by-election', 'bye-election', 'by election', 'bye election']],
  sol: 'A by-election fills a single vacant seat.',
}));
Q('ar_mid', ar({
  t: 4, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'A mid-term election may become necessary in the imagined State of Urvanta.',
  r: 'The Assembly can be dissolved before its full term if no stable government can be formed.',
  sol: 'Both are true. Early dissolution ends the House before its term, so fresh elections must be held for all seats, which is a mid-term election.',
}));
Q('ar_bye', ar({
  t: 4, d: 3, c: 'analysis', verdict: 'A-true-R-false',
  a: 'A by-election is held when a seat falls vacant through death, resignation or disqualification of the member.',
  r: 'A by-election is held after the full five-year term of the House has ended.',
  sol: 'A is true. R is false: the end of the full term leads to a general election, not a by-election.',
}));
Q('mt_types', match({
  t: 4, d: 2, c: 'recall', marks: 2,
  stem: 'Match each type of election with its description.',
  pairs: [
    ['General election', 'All seats after the full term'],
    ['Mid-term election', 'All seats after early dissolution'],
    ['By-election', 'One seat that fell vacant'],
    ['Election of the President', 'Indirect, by electors'],
  ],
  sol: 'A general election renews the whole House after the term, a mid-term election follows early dissolution, a by-election fills one vacancy, and the President is chosen indirectly by electors.',
}));
Q('ord_poll_steps', ord({
  t: 4, d: 2, c: 'understanding', marks: 2,
  stem: 'Arrange these steps of an election to an imagined Legislative Assembly in the order in which they happen.',
  items: [
    'The Commission announces the election schedule',
    'Candidates file their nominations',
    'Nominations are scrutinised',
    'Voters cast their votes on polling day',
    'Votes are counted and results are declared',
  ],
  sol: 'The schedule is announced first, then nominations are filed and scrutinised, then polling takes place, and finally the votes are counted and results declared.',
}));
Q('s_bye', short({
  t: 4, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'When is a by-election held? Within what time is it generally held?',
  model: 'A **by-election** is held when a single seat **falls vacant** through the death, resignation or disqualification of a member. It is generally held **within six months**.',
  sol: 'Circumstances and time.',
  scheme: [['Death, resignation or disqualification', 1], ['Within six months', 1]],
}));
Q('s_classify_events', short({
  t: 4, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'In the imagined State of Ambarpura, (a) a member of the Assembly resigns to take up another office, and (b) the Assembly is dissolved two years early. Name the election each will lead to.',
  model: '(a) A **by-election** in the constituency of the member who resigned.\n(b) A **mid-term election**, because the whole Assembly must be elected again before the usual term ends.',
  sol: 'Classify each with a reason.',
  scheme: [['(a) By-election with reason', 1], ['(b) Mid-term election with reason', 1]],
}));
Q('s3_distinguish', short({
  t: 4, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Distinguish a general election, a mid-term election and a by-election.',
  model: '1. A **general election** fills **all seats** of a House after its **full term**.\n2. A **mid-term election** fills **all seats** after the House is **dissolved early**.\n3. A **by-election** fills **one seat** that has fallen **vacant**.',
  sol: 'One point per type.',
  scheme: [['General election', 1], ['Mid-term election', 1], ['By-election', 1]],
}));
Q('s3_bye_causes', short({
  t: 4, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'Three situations arise in the imagined constituency of Mandarvel: (a) the sitting member dies, (b) the sitting member is disqualified by the court, (c) the sitting member resigns. State whether a by-election is needed in each and within what time.',
  model: '(a) **Yes**, because the seat is vacant by **death**.\n(b) **Yes**, because **disqualification** vacates the seat.\n(c) **Yes**, because **resignation** vacates the seat.\nIn each case it is generally held **within six months**.',
  sol: 'Each cause, with the time limit.',
  scheme: [['(a) with reason', 1], ['(b) with reason', 1], ['(c) with reason, and time of six months', 1]],
}));
Q('s3_why_not_always', short({
  t: 4, d: 4, c: 'evaluation', marks: 3, wl: S3,
  stem: 'Some people say a mid-term election is a waste of money; others say it is a democratic remedy. Give one point for each view and one point on what it shows about elections.',
  model: '1. **Waste:** a fresh poll for all seats costs the **public money** and effort.\n2. **Remedy:** when no stable government can be formed, the voters get the chance to **decide again**.\n3. It shows that in a democracy, **authority returns to the people** in a crisis.',
  sol: 'One point each way and one lesson.',
  scheme: [['Argument that it is wasteful', 1], ['Argument that it is a remedy', 1], ['Lesson: authority returns to the people', 1]],
}));
Q('l_types', long({
  t: 4, d: 3, c: 'understanding', marks: 10, wl: L10,
  stem: 'Elections to a legislature are held in different situations.\n\n(i) What is a general election? When is it held? **[3]**\n(ii) Explain a mid-term election and the circumstances in which it is held. **[3]**\n(iii) Explain a by-election, with the causes and the usual time within which it is held. **[4]**',
  model: '(i) A **general election** is one in which **all the seats** of a House are filled. It is held when the House **completes its full term**, which is five years for the Lok Sabha and for a State Legislative Assembly.\n\n(ii) A **mid-term election** is held **before the end of the term**, after the House has been **dissolved early**, for example when no party can form a stable government. All seats are contested again and the new House gets a fresh term.\n\n(iii) A **by-election** fills a **single seat** that has fallen **vacant** through the **death**, **resignation** or **disqualification** of the member. Only the voters of that constituency vote. It is generally held **within six months** of the vacancy.',
  sol: 'General; mid-term; by-election with causes and time.',
  scheme: [['(i) All seats', 1.5], ['(i) After the full term', 1.5], ['(ii) Meaning and early dissolution', 3], ['(iii) Single seat and causes', 2], ['(iii) Within six months', 2]],
}));
Q('l_whole', long({
  t: [1, 4], d: 4, c: 'application', marks: 10, wl: L10,
  stem: 'In the imagined constituency of Taralpur, the member of the State Assembly dies, and the Commission announces a poll. Rahul, who turned eighteen last month, wants to vote.\n\n(i) Name the kind of election that will be held and state when it is generally held. **[3]**\n(ii) What must Rahul do to be able to vote, and which body prepares the electoral roll? **[3]**\n(iii) The schedule has been announced. Explain two ways in which the Model Code of Conduct and the Commission will make the poll fair. **[4]**',
  model: '(i) A **by-election**, since a single seat is vacant by **death**. It is generally held **within six months** of the vacancy.\n\n(ii) Rahul must see that his **name is on the electoral roll**, and apply to be added if it is not; the roll is prepared and revised by the **Election Commission**, which also issues the **EPIC** card.\n\n(iii) The **Model Code of Conduct** applies from the announcement until the result; the governing party cannot misuse **official machinery** or make **fresh announcements** to win votes. The Commission appoints **observers**, supervises nominations and conducts the poll, so voters in Taralpur choose without pressure.',
  sol: 'Kind of election and time; roll and EPIC; Code and Commission.',
  scheme: [['(i) By-election with the cause', 1.5], ['(i) Within six months', 1.5], ['(ii) Name on the roll, apply if missing', 1.5], ['(ii) Election Commission prepares the roll', 1.5], ['(iii) Model Code of Conduct', 2], ['(iii) Observers and supervision', 2]],
}));

// ================================================================ source-based items (imagined documents)
Q('sb_diary', source({
  t: [1, 3], d: 3, c: 'application', origin: 'soyl-original',
  stem: `Read the imagined polling-day diary and answer the questions that follow. ${IMAG}`,
  passage: '**Diary of Meena Kulkarni, a first-time voter in Kesarwadi (imagined)**\n\nThis morning I walked to the school polling booth with my new photo identity card. A queue had formed by seven, and an officer checked my name against the printed list. I pressed the button beside my candidate\'s symbol on the machine, and a small slip showed my choice for a few seconds. Outside, two observers were talking with the booth staff. A poster pinned near the gate said that campaign rallies were not allowed on this day. Next week the village panchayat will choose its chairperson from among the elected members.',
  parts: [
    child('a', short({ t: 3, d: 2, c: 'application', marks: 1, stem: 'Which document did Meena carry to the booth, and which body issues it?', model: 'The **EPIC**, the photo identity card, issued by the **Election Commission**.', sol: 'The EPIC from the Commission.', scheme: [['EPIC and the Commission', 1]] })),
    child('b', short({ t: 1, d: 3, c: 'analysis', marks: 1, stem: 'The panchayat chairperson will be chosen by elected members. Is that a direct or an indirect election?', model: '**Indirect**: the elected members, not the voters, choose the chairperson.', sol: 'Members act as electors.', scheme: [['Indirect, with reason', 1]] })),
    child('c', short({ t: 3, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Identify two arrangements mentioned in the diary that help to make the poll fair.', model: 'The **printed electoral list** to check the voter\'s name, and the **observers** at the booth. The **paper slip** that confirms the voter\'s choice also adds to fairness.', sol: 'Any two arrangements.', scheme: [['First arrangement', 1], ['Second arrangement', 1]] }), [
      short({ t: 3, d: 3, c: 'application', marks: 2, stem: '**Or** (ii): The poster says that rallies are not allowed on polling day. Explain how this fits the Model Code of Conduct.', model: 'The **Model Code of Conduct** asks parties to follow rules of fair campaigning. Stopping rallies on polling day gives voters a **calm atmosphere** to decide without pressure, helping a **free and fair** poll.', sol: 'Link with the Code and fairness.', scheme: [['Link with the Code', 1], ['Calm atmosphere and fair poll', 1]] }),
    ]),
  ],
}));
Q('sb_report', source({
  t: [3, 4], d: 4, c: 'analysis', origin: 'soyl-original',
  stem: `Read the imagined newspaper report and answer the questions that follow. ${IMAG}`,
  passage: '**The Sundarvel Messenger, news desk (imagined)**\n\nThe Assembly seat of Sundarvel fell vacant last month after its member resigned to take up an office in another State. The Commission has announced the poll for next month, and the Model Code of Conduct came into effect from the day of the announcement. A district official said that new road projects had been put on hold for the voters of the constituency, and that observers would visit all booths. Candidates have begun filing their nominations, which will be scrutinised later this week.',
  parts: [
    child('a', short({ t: 4, d: 2, c: 'application', marks: 1, stem: 'What type of election is being held in Sundarvel?', model: 'A **by-election**, since a single seat fell vacant by resignation.', sol: 'One vacant seat.', scheme: [['By-election', 1]] })),
    child('b', short({ t: 3, d: 3, c: 'analysis', marks: 1, stem: 'Why were new road projects put on hold for the voters of the constituency?', model: 'Under the **Model Code of Conduct**, new announcements that might sway voters are avoided.', sol: 'The Code covers the period after the schedule.', scheme: [['Model Code of Conduct reason', 1]] })),
    child('c', short({ t: [3, 4], d: 4, c: 'analysis', marks: 2, stem: '**Either** (i): State two functions of the Election Commission that appear in the report.', model: 'Announcing the **election schedule**, and supervising **nominations** and their scrutiny. It also appoints **observers** and enforces the **Model Code of Conduct**.', sol: 'Any two functions.', scheme: [['First function', 1], ['Second function', 1]] }), [
      short({ t: 4, d: 3, c: 'understanding', marks: 2, stem: '**Or** (ii): Within what period should the seat generally be filled, and how does the report show that this period is being followed?', model: 'A vacancy is generally filled **within six months**. The seat fell vacant **last month** and the poll is announced for **next month**, well within that time.', sol: 'Six months and the dates in the report.', scheme: [['Six months', 1], ['Link to the dates in the report', 1]] }),
    ]),
  ],
}));
Q('sb_notes', source({
  t: [1, 2], d: 3, c: 'evaluation', origin: 'soyl-original',
  stem: `Read the imagined Class IX revision notes and answer the questions that follow. ${IMAG}`,
  passage: '**Revision notes made by Arjun for a unit test (imagined)**\n\n1. Lok Sabha members: elected directly by voters.\n2. President: elected directly by all citizens.\n3. Election Commission: set up under Article 324 on 25 January 1950.\n4. The Chief Election Commissioner is removed at the wish of the government.\n5. A by-election is held for all seats after five years.',
  parts: [
    child('a', short({ t: 1, d: 2, c: 'analysis', marks: 1, stem: 'Which numbered note about direct election contains a mistake?', model: '**Note 2**: the President is elected **indirectly** by electors, not directly by all citizens.', sol: 'The President is chosen by electors.', scheme: [['Note 2', 1]] })),
    child('b', short({ t: 2, d: 3, c: 'analysis', marks: 1, stem: 'Which numbered note is correct about the setting up of the Commission?', model: '**Note 3**: Article 324, on 25 January 1950.', sol: 'This note is accurate.', scheme: [['Note 3', 1]] })),
    child('c', short({ t: [2, 4], d: 4, c: 'evaluation', marks: 2, stem: '**Either** (i): Correct the mistakes in notes 4 and 5.', model: 'Note 4: the CEC can be removed only **like a Supreme Court Judge**, not at the government\'s wish. Note 5: a **by-election** fills a **single vacant seat**, while all seats after the full term are filled in a **general election**.', sol: 'Correct both notes.', scheme: [['Note 4 corrected', 1], ['Note 5 corrected', 1]] }), [
      short({ t: 2, d: 3, c: 'evaluation', marks: 2, stem: '**Or** (ii): Explain why the error in note 4 would be serious if it were true, for the fairness of elections.', model: 'If the government could **dismiss the CEC at will**, the Commission would **fear the ruling party** and might favour it, and voters would lose trust in the **fairness** of elections.', sol: 'The harm of weak removal safeguards.', scheme: [['CEC would fear the government', 1], ['Loss of fairness and trust', 1]] }),
    ]),
  ],
}));
