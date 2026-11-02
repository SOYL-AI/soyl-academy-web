// ICSE 9 History & Civics, ch04 The State Legislature — question bank.
// Every State, constituency, member, newspaper, school note and letter below is imagined by SOYL and labelled as
// imagined; no textbook text, box or exercise and no specimen or board-paper item is reused (D-036); no person is
// quoted, no Article is quoted (elementary study) and no current office-holder or current political position appears.
// Facts are stable provisions: unicameral and bicameral State legislatures; six States with a Legislative Council
// as of 2024; Assembly of 60 to 500 members, 5-year term, minimum age 25; Council of at most one-third of the
// Assembly and at least 40 members, 6-year term, one-third retiring every two years, minimum age 30;
// composition of the Council in twelfths; ordinary-bill delay 3 months then 1 month; money bill held 14 days.
import assert from 'node:assert/strict';
import { Q, mcq, ar, tf, fb, match, ord, short, long, source, child, Svg } from '../../icse-9-history-civics-ch01/src/lib.mjs';

const S2 = [25, 45];
const S3 = [40, 70];
const L10 = [120, 220];
const IMAG = '*(Imagined document written by SOYL for practice; the people and places in it are not real.)*';

// ---------------------------------------------------------------- shared figures and asserted figures
// Council composition in twelfths: elected by MLAs 4, local bodies 4, graduates 1, teachers 1, nominated 2.
export const COUNCIL_TWELFTHS = { mlas: 4, localBodies: 4, graduates: 1, teachers: 1, nominated: 2 };
assert.equal(Object.values(COUNCIL_TWELFTHS).reduce((a, b) => a + b, 0), 12);
export const ASSEMBLY = { min: 60, max: 500, term: 5, minAge: 25 };
export const COUNCIL = { min: 40, term: 6, minAge: 30, retireEvery: 2 };
assert.equal(COUNCIL.term / COUNCIL.retireEvery, 3); // one-third retire at each two-year mark

/** Unicameral and bicameral legislatures drawn as two panels. */
export function unicamFigure(alt, caption) {
  const s = new Svg(720, 250);
  s.rect(15, 15, 270, 220, { rx: 10, fill: 'muted', fillOpacity: 0.12, color: 'muted', sw: 1.6 });
  s.text(150, 40, 'Unicameral: one House', { size: 15, bold: true });
  s.rect(40, 85, 220, 90, { rx: 8, fill: 'accent', fillOpacity: 0.18, color: 'accent', sw: 1.8 });
  s.text(150, 120, 'Legislative Assembly', { size: 14, bold: true });
  s.text(150, 148, 'directly elected', { size: 12 });
  s.rect(315, 15, 390, 220, { rx: 10, fill: 'blue', fillOpacity: 0.1, color: 'blue', sw: 1.6 });
  s.text(510, 40, 'Bicameral: two Houses', { size: 15, bold: true });
  s.rect(345, 62, 330, 62, { rx: 8, fill: 'blue', fillOpacity: 0.18, color: 'blue', sw: 1.8 });
  s.text(510, 86, 'Legislative Council (upper House)', { size: 14, bold: true });
  s.text(510, 108, 'mostly indirectly elected', { size: 12 });
  s.rect(345, 152, 330, 62, { rx: 8, fill: 'accent', fillOpacity: 0.18, color: 'accent', sw: 1.8 });
  s.text(510, 176, 'Legislative Assembly (lower House)', { size: 14, bold: true });
  s.text(510, 198, 'directly elected', { size: 12 });
  return s.visual(alt, caption);
}

/** How the members of a Legislative Council are chosen, drawn as one bar split into twelfths. */
export function compositionFigure(alt, caption) {
  const s = new Svg(720, 230);
  const x0 = 20;
  const w = 680;
  const unit = w / 12;
  const parts = [
    ['1/3', 4, 'accent', 'Elected by MLAs', 'a'],
    ['1/3', 4, 'green', 'Elected by local bodies', 'b'],
    ['1/12', 1, 'blue', 'Graduates', 'c'],
    ['1/12', 1, 'accent', 'Teachers', 'd'],
    ['1/6', 2, 'muted', 'Nominated by the Governor', 'e'],
  ];
  let x = x0;
  parts.forEach(([frac, n, col, label, id]) => {
    const wd = n * unit;
    s.rect(x, 30, wd, 70, { rx: 4, fill: col, fillOpacity: 0.22, color: col, sw: 1.6 });
    s.text(x + wd / 2, 65, frac, { size: 15, bold: true });
    const cx = x + wd / 2;
    const ly = id === 'd' ? 168 : id === 'c' ? 132 : 132;
    s.line(cx, 100, cx, ly - 12, { sw: 1, color: 'muted' });
    s.text(cx, ly, label, { size: 12 });
    x += wd;
  });
  s.text(360, 210, 'Whole Council = 12 twelfths (schematic, not to scale)', { size: 11, muted: true });
  return s.visual(alt, caption);
}

/** Three overlapping six-year terms starting two years apart: the Council never dissolves. */
export function rotationFigure(alt, caption) {
  const s = new Svg(720, 230);
  const X = (yr) => 50 + yr * 62;
  s.arrow(X(0), 190, X(10) + 30, 190, { sw: 1.6 });
  [0, 2, 4, 6, 8, 10].forEach((yr) => {
    s.line(X(yr), 186, X(yr), 194, { sw: 1.2 });
    s.text(X(yr), 208, `Year ${yr}`, { size: 11 });
  });
  const rows = [
    ['First third: years 0 to 6', 0, 'accent'],
    ['Second third: years 2 to 8', 2, 'green'],
    ['Third third: years 4 to 10', 4, 'blue'],
  ];
  rows.forEach(([label, start, col], i) => {
    const y = 30 + i * 46;
    s.rect(X(start), y, 6 * 62, 32, { rx: 6, fill: col, fillOpacity: 0.2, color: col, sw: 1.6 });
    s.text(X(start) + 3 * 62, y + 16, label, { size: 12 });
  });
  s.text(360, 20, 'Two years apart, one third retires and one third is newly chosen', { size: 11, muted: true });
  return s.visual(alt, caption);
}

// ================================================================ t01 Unicameral and bicameral legislatures
Q('m_uni_def', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'A State whose legislature consists of a Legislative Assembly alone, with no second House, has a legislature that is called',
  opts: ['unicameral', 'bicameral', 'confederal', 'tricameral'],
  sol: 'One House means unicameral. Bicameral means two Houses. Confederal describes a loose union of states, and tricameral (three Houses) is not the pattern of any Indian State.',
}));
Q('m_council_states', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'As of 2024, which of these States has a Legislative Council in addition to its Legislative Assembly?',
  opts: ['Karnataka', 'Punjab', 'Gujarat', 'Kerala'],
  sol: 'Karnataka is among the six States with a Council (the others being Andhra Pradesh, Bihar, Maharashtra, Telangana and Uttar Pradesh). Punjab, Gujarat and Kerala have a single House.',
}));
Q('m_council_create', mcq({
  t: 1, d: 3, c: 'understanding',
  stem: 'How can a State that has only an Assembly come to have a Legislative Council?',
  opts: [
    'Parliament makes a law after the State Assembly passes a resolution by a special majority',
    'The Governor issues an order on the advice of the Chief Minister alone',
    'The Election Commission decides after a general election',
    'The Supreme Court orders it when asked by a citizen',
  ],
  sol: 'The process starts in the State Assembly, which passes a resolution by a special majority, and ends with a law of Parliament. The Governor, the Election Commission and the courts have no power to create a Council by themselves.',
}));
Q('m_no_council', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'A student making a chart of bicameral State legislatures, as of 2024, must leave out one of these States because it has only an Assembly. Which one?',
  opts: ['Goa', 'Bihar', 'Maharashtra', 'Uttar Pradesh'],
  sol: 'Goa has a unicameral legislature. Bihar, Maharashtra and Uttar Pradesh each have a Legislative Council, so they belong on the chart.',
}));
Q('m_why_second', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: 'People who favour a second House in a State give several reasons. Which one is a reason in favour of a Legislative Council?',
  opts: [
    'It can give a second look to a bill and bring in experienced people who might not win a direct election',
    'It makes the budget pass faster because two Houses vote on it',
    'It allows the Council to remove the Council of Ministers',
    'It makes the cost of running the legislature lower',
  ],
  sol: 'A revising role and the entry of persons with special knowledge are the usual arguments. Two Houses tend to slow, not speed, a bill; the Council of Ministers answers to the Assembly alone; and a second House adds to expense, which is an argument against it.',
}));
Q('mt_houses', match({
  t: [1, 2, 3], d: 2, c: 'recall', marks: 2,
  stem: 'Match each House with its description.',
  pairs: [
    ['Legislative Assembly', 'Lower House, members elected directly by voters'],
    ['Legislative Council', 'Upper House, a permanent body that is never dissolved'],
    ['Unicameral legislature', 'A legislature with a single House'],
    ['Bicameral legislature', 'A legislature with two Houses'],
  ],
  sol: 'The Assembly is the directly elected lower House, the Council is the permanent upper House, unicameral means one House and bicameral means two.',
}));
Q('tf_assent', tf({
  t: [1, 4], d: 2, c: 'understanding', ans: true,
  stem: 'True or false? Even in a unicameral State such as the imagined Tamrapur, a bill that the Assembly has passed does not become a law until the Governor gives assent.',
  sol: 'The Governor\'s assent is the last step in making a State law, whether the legislature has one House or two.',
}));
Q('s_uni_bi', short({
  t: 1, d: 1, c: 'understanding', marks: 2, wl: S2,
  stem: 'Explain the terms unicameral and bicameral as used for State legislatures.',
  model: 'A **unicameral** legislature has **one House**, the Legislative Assembly, as in most States. A **bicameral** legislature has **two Houses**, the Legislative Assembly and the Legislative Council, as in the few States that have a Council.',
  sol: 'One House versus two Houses, with the names of the Houses.',
  scheme: [['Unicameral: one House', 1], ['Bicameral: Assembly and Council', 1]],
}));
Q('s_create_council', short({
  t: 1, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: 'In the imagined State of Sindhuvan the Assembly wants a second House. State the steps by which a Legislative Council can be created.',
  model: 'First the **Sindhuvan Assembly** passes a **resolution** by a **special majority** asking for a Council. Then **Parliament** passes a **law** creating it. A Council can be abolished in the same way.',
  sol: 'Assembly resolution by special majority, then a law of Parliament.',
  scheme: [['Assembly resolution by a special majority', 1], ['Law of Parliament', 1]],
}));
Q('s3_why_council', short({
  t: 1, d: 3, c: 'evaluation', marks: 3, wl: S3,
  stem: 'Give two points in favour of a Legislative Council and one point against it.',
  model: '1. A Council gives a **second look** to hasty bills passed by the Assembly.\n2. It brings in **experienced persons**, such as teachers and nominated experts, who may not contest elections.\n3. Against: it **adds to the cost** and can **delay** lawmaking, although the Assembly\'s view finally prevails.',
  sol: 'Two reasons for, one against.',
  scheme: [['First reason in favour', 1], ['Second reason in favour', 1], ['A point against', 1]],
}));

// ================================================================ t02 The Legislative Assembly
Q('m_assembly_members', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'How are most members of a State Legislative Assembly chosen?',
  opts: [
    'They are directly elected by voters in territorial constituencies',
    'They are nominated by the Governor',
    'They are elected by members of the Legislative Council',
    'They are chosen by the Chief Minister',
  ],
  sol: 'Voters in each territorial constituency elect one member directly. The Governor does not nominate the members, the Council does not elect them, and the Chief Minister does not choose them.',
}));
Q('m_assembly_strength', mcq({
  t: 2, d: 2, c: 'recall',
  stem: 'Within which limits does the number of members of a State Legislative Assembly normally lie?',
  opts: ['Not more than 500 and not less than 60', 'Not more than 250 and not less than 100', 'Not more than 545 and not less than 100', 'Not more than 100 and not less than 40'],
  sol: 'An Assembly may have at most 500 and normally at least 60 members. A few small States have fewer by special provision. Figures such as 250 and 545 belong to other Houses, and 40 is the minimum of a Legislative Council.',
}));
Q('m_dissolve', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Before its full term ends, a State Legislative Assembly can be dissolved by',
  opts: [
    'the Governor, usually on the advice of the Chief Minister',
    'the Speaker, on a vote of the Council',
    'the Rajya Sabha, by a simple resolution',
    'the Chief Justice of the High Court',
  ],
  sol: 'The Governor dissolves the Assembly, acting in practice on the advice of the Chief Minister. The Speaker, the Rajya Sabha and the Chief Justice have no such power.',
}));
Q('m_emergency_ext', mcq({
  t: 2, d: 3, c: 'recall',
  stem: 'While a national emergency is in operation, the usual five-year term of a State Legislative Assembly can be lengthened by',
  opts: [
    'Parliament, one year at a time',
    'The Governor, by up to five years at once',
    'The Chief Minister, by a cabinet decision',
    'The Speaker, by a ruling',
  ],
  sol: 'Parliament may extend the term, one year at a time, while a national emergency lasts. The Governor, the Chief Minister and the Speaker have no power to lengthen the term.',
}));
Q('m_age_assembly', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'Meenal Rao of the imagined State of Kolahar is an Indian citizen, is on the voters\' list and holds no office of profit, but she is 24 years old. Can she contest for the Legislative Assembly?',
  opts: [
    'No, because a candidate must be at least 25 years old',
    'Yes, because citizens above 18 can contest any election',
    'No, because only members of the Council may contest',
    'Yes, because the age rule applies only to Parliament',
  ],
  sol: 'The minimum age to be a member of an Assembly is 25 years, which Meenal has not reached. The age to vote is not the age to contest, and members of the Council do not have the exclusive right to stand.',
}));
Q('m_office_profit', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'Raghav Iyer of the imagined State of Harsilla is a citizen, 40 years old and on the voters\' list, but he is a paid officer of the State government. Why can he not contest for the Legislative Assembly as things stand?',
  opts: [
    'He holds an office of profit under the government',
    'He is older than the maximum age for members',
    'He is not a citizen of the State by birth',
    'He has not been a member of the Council',
  ],
  sol: 'Holding an office of profit disqualifies a person from being a member. There is no maximum age, a person need not be born in the State, and Council membership is not a condition.',
}));
Q('m_speaker_scn', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'Members in the imagined Kesarpur Assembly are shouting and the debate has stopped. Which officer will restore order and decide who may speak?',
  opts: ['The Speaker', 'The Governor', 'The Chief Minister', 'The Chairman of the Council'],
  sol: 'The Speaker presides over the Assembly and keeps order. The Governor is not a member of the House, the Chief Minister is the leader of the government, and the Chairman presides over the Council, a different House.',
}));
Q('m_small_state', mcq({
  t: 2, d: 3, c: 'understanding',
  stem: 'A student notices that a few small States have Assemblies with fewer than 60 members. How is this explained?',
  opts: [
    'A special provision of the Constitution allows a smaller Assembly for a few small States',
    'These States have no elections and the members are nominated',
    'The limit of 60 applies only to Legislative Councils',
    'The Governor of those States may reduce the number each year',
  ],
  sol: 'The Constitution makes special provision for a few small States. Elections are held there too; the figure of 60 is for Assemblies, not Councils; and a Governor cannot change the number at will.',
}));
Q('m_assembly_wrong', mcq({
  t: 2, d: 2, c: 'analysis',
  stem: 'A quiz sheet lists four statements about the Legislative Assembly. Which statement is incorrect?',
  opts: [
    'Its members are nominated by the Governor',
    'Its normal term is five years',
    'It is presided over by the Speaker',
    'Its members are elected from territorial constituencies',
  ],
  sol: 'The members of the Assembly are elected by voters, not nominated by the Governor (the Governor nominates only some members of a Council). The other three statements are correct.',
}));
Q('fb_term', fb({
  t: 2, d: 1, c: 'recall',
  stem: 'The normal term of a State Legislative Assembly is ___ years.',
  acc: [['5', 'five', 'Five']],
  sol: 'The normal term is five years.',
}));
Q('ar_dissolve', ar({
  t: 2, d: 3, c: 'analysis', verdict: 'A-true-R-false',
  a: 'A State Legislative Assembly can be dissolved before it has completed five years.',
  r: 'No authority can shorten the term of an Assembly once it has been elected.',
  sol: 'A is true: the Governor may dissolve the Assembly early, usually on the Chief Minister\'s advice. R is false for the same reason: an early dissolution is a recognised way of shortening the term.',
}));
Q('s_assembly_term_dissolve', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State the normal term of a State Legislative Assembly and say how it can be cut short or extended.',
  model: 'The normal term is **five years**. The **Governor** can **dissolve** it earlier, usually on the Chief Minister\'s advice. While a **national emergency** lasts, **Parliament** can lengthen the term, **one year at a time**.',
  sol: 'Five years, early dissolution, extension in emergency.',
  scheme: [['Five years and early dissolution by the Governor', 1], ['Extension by Parliament in an emergency', 1]],
}));
Q('s_speaker', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Who presides over a State Legislative Assembly? State how the presiding officer is chosen and one duty of the office.',
  model: 'The **Speaker** presides. The Speaker is **elected by the members** of the Assembly from among themselves, with a **Deputy Speaker** to help. One duty is to **maintain order** and conduct the proceedings of the House.',
  sol: 'Speaker, election by members, one duty.',
  scheme: [['Speaker, elected by the members', 1], ['One duty of the Speaker', 1]],
}));
Q('s_scn_mem', short({
  t: 2, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'Two persons wish to contest the Assembly seat of Nirmal Vale, an imagined constituency: Arvind is 31, a citizen and on its voters\' list; Bhavna is 22 and also a citizen on the voters\' list. State who is eligible, with a reason.',
  model: '**Arvind** is eligible: he is a **citizen**, over **25 years** and **on the electoral roll**. **Bhavna** is not eligible, because she is **below 25 years**, the minimum age for an Assembly member.',
  sol: 'Arvind eligible; Bhavna too young.',
  scheme: [['Arvind eligible with a reason', 1], ['Bhavna not eligible with a reason', 1]],
}));
Q('s3_assembly_qual', short({
  t: 2, d: 2, c: 'recall', marks: 3, wl: S3,
  stem: 'List three conditions a person must meet to be a member of a State Legislative Assembly, and explain one of them in a line.',
  model: '1. The person must be a **citizen of India**.\n2. The person must be **at least 25 years old**.\n3. The person must be **on the electoral roll** and must **not hold an office of profit**; holding a paid government post would create a conflict between duty to the government and duty to the House.',
  sol: 'Three conditions with a short explanation of one.',
  scheme: [['First condition', 1], ['Second condition', 1], ['Third condition with a line of explanation', 1]],
}));

// ================================================================ t03 The Legislative Council
Q('m_council_age', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'What is the minimum age for a member of a State Legislative Council?',
  opts: ['30 years', '25 years', '35 years', '21 years'],
  sol: 'A Council member must be at least 30 years old. Twenty-five is the age for the Assembly, 35 is the age for some higher offices, and 21 is not the age rule for either House.',
}));
Q('m_council_retire', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'In a State Legislative Council, a fixed share of members retires at regular intervals. Which statement is correct?',
  opts: [
    'One-third of the members retire every two years',
    'Half of the members retire every year',
    'All members retire together every five years',
    'One-sixth of the members retire every month',
  ],
  sol: 'A member serves for six years and one-third of the members retire every second year, so the House continues. Half-yearly or all-at-once retirement describes other bodies, and a monthly retirement has no basis in the Constitution.',
}));
Q('m_council_comp', mcq({
  t: 3, d: 3, c: 'recall',
  stem: 'Which two groups each elect about one-third of the members of a State Legislative Council?',
  opts: [
    'The members of the Legislative Assembly, and members of local bodies such as municipalities and district boards',
    'Graduates, and teachers',
    'The Governor, and the Chief Minister',
    'Members of the Rajya Sabha, and the voters of the State',
  ],
  sol: 'About one-third are elected by the MLAs and about one-third by members of local bodies. Graduates and teachers elect one-twelfth each, and the Governor nominates about one-sixth.',
}));
Q('m_nominated', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'Lakshmi Devi, an imagined organiser who has built cooperative societies across Dhavalpur for thirty years, has never contested an election. Through which route could she most suitably enter the Legislative Council?',
  opts: [
    'Nomination by the Governor of a person with special knowledge of the cooperative movement',
    'Election by the graduates of the State',
    'Election by the teachers of the State',
    'Direct election in a territorial constituency',
  ],
  sol: 'About one-sixth of the Council is nominated by the Governor from persons with special knowledge of fields such as the cooperative movement and social service. The other routes depend on being a graduate, being a teacher, or contesting an election.',
}));
Q('m_teacher_share', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'In the imagined State of Mayurgarh the Council has 96 members. About how many of them are elected by the teachers\' constituencies, if the Constitution\'s share is followed?',
  opts: ['8', '12', '16', '32'],
  sol: 'Teachers elect one-twelfth of the Council, and 96 divided by 12 is 8. The figure 12 would be one-eighth, 16 would be one-sixth (the nominated share), and 32 would be one-third.',
}));
Q('m_permanent', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Why is the Legislative Council described as a permanent House?',
  opts: [
    'It is never dissolved as a whole, because a part of its members retire every two years',
    'Its members are chosen for life',
    'It cannot be abolished by any law',
    'It meets every day of the year',
  ],
  sol: 'The Council is not dissolved; as one-third of the members retire at intervals, the House carries on. Members have a six-year term, not life; a Council can be abolished by Parliament on the Assembly\'s resolution; and it does not meet every day.',
}));
Q('m_council_size', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'The Assembly of the imagined State of Girivan has 240 members. What is the largest number of members its Legislative Council may have?',
  opts: ['80', '60', '120', '240'],
  sol: 'The Council may have at most one-third of the Assembly, and 240 divided by 3 is 80. The figure 60 is a quarter, 120 is a half, and 240 would make the Council as large as the Assembly.',
}));
Q('fb_council_term', fb({
  t: 3, d: 1, c: 'recall',
  stem: 'A member of a Legislative Council is chosen for a term of ___ years.',
  acc: [['6', 'six']],
  sol: 'The term of a Council member is six years.',
}));
Q('tf_council_dissolve', tf({
  t: 3, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? When the Governor dissolves a State Legislative Assembly, the Legislative Council is dissolved along with it.',
  sol: 'The Council is a permanent House and is not dissolved, even though the Assembly can be dissolved.',
}));
Q('mt_council_numbers', match({
  t: [2, 3, 4], d: 2, c: 'recall', marks: 2,
  stem: 'Match each item with the number that goes with it.',
  pairs: [
    ['Minimum age of a Council member', '30 years'],
    ['Minimum age of an Assembly member', '25 years'],
    ['Term of a Council member', '6 years'],
    ['Days a Council may hold a money bill', '14 days'],
  ],
  sol: 'Council: age 30 and term 6 years; Assembly: age 25; a money bill may be held for 14 days.',
}));
Q('ar_perm', ar({
  t: 3, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'The Legislative Council of a State is called a permanent House.',
  r: 'One-third of its members retire every two years and are replaced, so the whole House is never dissolved at one time.',
  sol: 'Both are true, and the staggered retirement of members is exactly why the Council continues without dissolution.',
}));
Q('s_council_perm', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Why is the Legislative Council not dissolved like the Assembly? Explain what keeps it going.',
  model: 'The Council is a **permanent House**. Members serve **six years**, and **one-third retire every second year**, with new members taking their place. Hence at no time is the whole House **dissolved or empty**.',
  sol: 'Permanent House; staggered retirement.',
  scheme: [['Council is a permanent House, six-year term', 1], ['One-third retire every two years', 1]],
}));
Q('s_council_size', short({
  t: 3, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'State the limits on the size of a Legislative Council. If the Assembly of the imagined State of Dhavalpur has 210 members, what is the greatest possible size of its Council?',
  model: 'A Council may have **at most one-third** of the Assembly\'s strength and **not fewer than 40** members. For 210 members the largest Council is **210 divided by 3, which is 70**.',
  sol: 'One-third of the Assembly, minimum 40; 70 for 210.',
  scheme: [['Limits: one-third and not below 40', 1], ['70 members', 1]],
}));
Q('s3_council_comp', short({
  t: 3, d: 2, c: 'recall', marks: 3, wl: S3,
  stem: 'How are the members of a State Legislative Council elected or nominated? Give the share of each group.',
  model: '1. About **one-third** are elected by the **MLAs** and about **one-third** by members of **local bodies**.\n2. **One-twelfth** are elected by **graduates** and **one-twelfth** by **teachers**.\n3. About **one-sixth** are **nominated by the Governor** from persons with special knowledge.',
  sol: 'Five groups and their shares.',
  scheme: [['MLAs and local bodies', 1], ['Graduates and teachers', 1], ['Governor\'s nominees', 1]],
}));

// ================================================================ t04 Powers and functions
Q('m_ordinary_bill', mcq({
  t: 4, d: 3, c: 'recall',
  stem: 'The Assembly of a bicameral State passes an ordinary bill and sends it to the Council. For how long can the Council delay it the first time?',
  opts: ['Up to three months', 'Up to one year', 'Up to fourteen days', 'It can reject the bill for good'],
  sol: 'On the first occasion the Council can hold or reject an ordinary bill for up to three months. A year is too long, fourteen days is the limit for a money bill, and the Council has no power to defeat a bill finally.',
}));
Q('m_money_bill', mcq({
  t: 4, d: 1, c: 'recall',
  stem: 'In which House of a bicameral State legislature can a money bill be introduced?',
  opts: ['Only in the Legislative Assembly', 'Only in the Legislative Council', 'In either House', 'In neither; it is introduced by the Governor'],
  sol: 'Money bills can be introduced only in the Assembly. The Council cannot introduce them, a choice of either House is not allowed, and the Governor does not introduce a bill.',
}));
Q('m_no_confidence', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'A motion of no confidence that can bring down a State government can be passed only in',
  opts: ['the Legislative Assembly', 'the Legislative Council', 'either House with equal effect', 'the Governor\'s office'],
  sol: 'The ministry is responsible to the Assembly, so only the Assembly can defeat it by a no-confidence motion. The Council can question and debate but cannot remove the ministry.',
}));
Q('m_resp_who', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'To which House is the State Council of Ministers collectively responsible?',
  opts: ['The Legislative Assembly', 'The Legislative Council', 'Both Houses equally', 'The Governor alone'],
  sol: 'The Council of Ministers answers to the directly elected Assembly. It is not responsible to the Council, to both Houses equally, or to the Governor alone.',
}));
Q('m_electoral', mcq({
  t: 4, d: 3, c: 'recall',
  stem: 'Which members of a State legislature take part in electing the President of India?',
  opts: ['The elected members of the Legislative Assembly', 'All members of the Legislative Council', 'The Speaker alone', 'The nominated members of the Council'],
  sol: 'The elected members of each State Assembly are part of the electoral college for the President. Members of the Council do not vote in this election, and the Speaker votes as an elected member, not alone.',
}));
Q('m_scn_bill', mcq({
  t: 4, d: 4, c: 'analysis',
  stem: 'The Assembly of the imagined State of Dhavalpur passes an ordinary bill on regulating weekly markets. The Council rejects it. The Assembly passes the same bill again, and the Council again rejects it or lets a month pass without passing it. What is the position of the bill?',
  opts: [
    'It is treated as passed by both Houses in the form the Assembly passed it',
    'It lapses, because the Council has refused it twice',
    'It goes to the Governor, who must pass it into law as if both Houses had agreed',
    'It must be put before a joint sitting of both Houses',
  ],
  sol: 'On the second passage the Assembly\'s view prevails: after the Council rejects or delays the bill again, it is deemed passed, and then goes for the Governor\'s assent. It does not lapse, and a State legislature has no joint sitting to settle such a dispute.',
}));
Q('m_scn_money', mcq({
  t: 4, d: 4, c: 'analysis',
  stem: 'The Council of the imagined State of Kesarpur keeps a money bill passed by the Assembly for twenty days without returning it. What is the result?',
  opts: [
    'The bill is deemed passed by both Houses in the form the Assembly passed it',
    'The bill is dead because the Council did not return it in time',
    'The Assembly must wait until the Council passes it',
    'The Governor sends it to the High Court',
  ],
  sol: 'The Council may hold a money bill for only fourteen days. After that, the bill is deemed passed in the form the Assembly passed it. The Council cannot kill it, the Assembly need not wait, and no court is involved.',
}));
Q('m_scn_motion', mcq({
  t: 4, d: 3, c: 'application',
  stem: 'In the imagined State of Sindhuvan a member of the Legislative Council wants to put a question to a minister about village roads. Which statement is correct?',
  opts: [
    'The member can ask the question in the Council, since both Houses can question ministers, but only the Assembly can remove the ministry',
    'The member cannot ask any question, because only the Assembly may question ministers',
    'The member can move a no-confidence motion against the minister in the Council',
    'The question can be asked only if the Governor permits it',
  ],
  sol: 'Questions and discussion are part of the control that both Houses have over the executive, but the ministry\'s survival depends on the Assembly alone. The Council can neither move a motion that removes the government nor needs the Governor\'s permission to put a question.',
}));
Q('ar_money', ar({
  t: 4, d: 3, c: 'analysis', verdict: 'A-true-R-false',
  a: 'In a bicameral State, the Legislative Council has very little power over a money bill.',
  r: 'A money bill can be introduced only in the Legislative Council.',
  sol: 'A is true, since the Council can only hold the bill for fourteen days and make recommendations. R is false, because a money bill can be introduced only in the Assembly.',
}));
Q('ar_nocon', ar({
  t: 4, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'A no-confidence motion can bring down a State government only if it is passed in the Legislative Assembly.',
  r: 'The Council of Ministers is collectively responsible to the Legislative Assembly.',
  sol: 'Both are true, and R explains A: because the ministry answers to the Assembly, only that House can withdraw its confidence.',
}));
Q('ar_delay', ar({
  t: 4, d: 4, c: 'analysis', verdict: 'both-true-explains',
  a: 'When the Council delays an ordinary bill, the final decision rests with the Legislative Assembly.',
  r: 'The Council can delay such a bill for three months the first time and one month the second time, after which the Assembly\'s view prevails.',
  sol: 'Both are true. The limited delay in R is the very reason that the Assembly has the last word, as stated in A.',
}));
Q('tf_resp', tf({
  t: 4, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? A minister of a State government may be a member of the Legislative Council, but the Council of Ministers is still responsible to the Legislative Assembly.',
  sol: 'A minister can come from either House, but the collective responsibility of the ministry is to the Assembly.',
}));
Q('mt_powers', match({
  t: 4, d: 3, c: 'application', marks: 2,
  stem: 'Match each type of power of a State legislature with an example of it.',
  pairs: [
    ['Legislative power', 'Making laws on a State List subject such as agriculture'],
    ['Financial power', 'Passing the State budget and money bills'],
    ['Control over the executive', 'Passing a no-confidence motion in the Assembly'],
    ['Electoral power', 'Voting in the election of the Rajya Sabha members of the State'],
  ],
  sol: 'Lawmaking on State subjects is legislative; the budget is financial; a no-confidence motion is control over the executive; voting for Rajya Sabha members is electoral.',
}));
Q('ord_bill', ord({
  t: 4, d: 3, c: 'application', marks: 2,
  stem: 'Arrange the steps of an ordinary bill that the Council opposes twice, in the order in which they happen.',
  items: [
    'The Assembly passes the bill and sends it to the Council',
    'The Council rejects the bill or delays it for three months',
    'The Assembly passes the bill a second time and sends it again to the Council',
    'The Council again rejects it, or takes no action for a month',
    'The bill is treated as passed and goes to the Governor for assent',
  ],
  sol: 'Assembly passes; Council delays up to three months; Assembly passes again; Council opposes or delays for a month; the bill is treated as passed and goes for assent.',
}));
Q('s_delay', short({
  t: 4, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: 'How far can the Legislative Council delay an ordinary bill passed by the Assembly?',
  model: 'On the **first** passage the Council can delay the bill for up to **three months**. If the Assembly passes it again and the Council again rejects it or takes no action for **one month**, the bill is **treated as passed**: the Assembly prevails.',
  sol: 'Three months, then one month; the Assembly prevails.',
  scheme: [['First delay of three months', 1], ['Second delay of one month; Assembly prevails', 1]],
}));
Q('s_money_role', short({
  t: 4, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'What is the role of the Legislative Council in the passing of a money bill?',
  model: 'A money bill **starts only in the Assembly**. The Council can **hold it for fourteen days** and make recommendations, which the Assembly may accept or reject. After the period the bill is **treated as passed**.',
  sol: 'Introduced in the Assembly; Council holds it fourteen days.',
  scheme: [['Introduced only in the Assembly', 1], ['Council holds it for fourteen days with recommendations', 1]],
}));
Q('s_noconf', short({
  t: 4, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Explain why a no-confidence motion has meaning only in the Legislative Assembly.',
  model: 'The **Council of Ministers is responsible to the Assembly**. If the Assembly passes a **no-confidence motion**, the ministry must **resign**. The Council has **no such power**, as the ministry does not answer to it.',
  sol: 'Responsibility to the Assembly; resignation of the ministry.',
  scheme: [['Ministry responsible to the Assembly', 1], ['Defeat means resignation; Council has no such power', 1]],
}));
Q('s_amend', short({
  t: 4, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: 'What part do the State legislatures play in amending the Constitution?',
  model: 'Certain amendments, such as those affecting the **federal structure**, must be **ratified by the legislatures of at least half of the States**, after Parliament has passed them. A State legislature **cannot start** such an amendment.',
  sol: 'Ratification by at least half the States.',
  scheme: [['Ratification by at least half of the State legislatures', 1], ['Only after Parliament passes it; cannot start it', 1]],
}));
Q('s_scn_classify', short({
  t: 4, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'In the imagined State of Harsilla (a) the Assembly passes a law about local fairs and (b) the Assembly passes a no-confidence motion against the ministry. Name the power of the State legislature shown in each case.',
  model: '(a) A **legislative power**: the Assembly makes a law on a **State List** subject.\n(b) **Control over the executive**: the ministry is **responsible to the Assembly**, which can force it to resign.',
  sol: 'Legislative power; control over the executive.',
  scheme: [['(a) Legislative power', 1], ['(b) Control over the executive', 1]],
}));
Q('s3_financial', short({
  t: 4, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: 'Describe the financial powers of the Legislative Assembly, and say how the Council\'s part in money matters differs.',
  model: '1. A **money bill** can be introduced only in the **Assembly**, and the Assembly alone votes on the **demands for grants** in the budget.\n2. The **Council** can only **discuss** the budget and **hold a money bill for fourteen days**, making recommendations.\n3. The Assembly may **accept or reject** those recommendations, so its view finally prevails.',
  sol: 'Assembly controls money; Council limited.',
  scheme: [['Money bills only in the Assembly; grants voted there', 1], ['Council holds a money bill fourteen days', 1], ['Assembly may accept or reject recommendations', 1]],
}));
Q('s3_exec', short({
  t: 4, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain three ways in which the State legislature controls the executive.',
  model: '1. Members put **questions** to ministers and demand answers about their departments.\n2. They bring **motions and debates**, such as **adjournment motions**, to draw attention to the government\'s actions.\n3. The **Assembly** can pass a **no-confidence motion** and make the **Council of Ministers resign**.',
  sol: 'Questions; motions; no-confidence.',
  scheme: [['Questions', 1], ['Motions and debates', 1], ['No-confidence motion in the Assembly', 1]],
}));
Q('s3_diff_houses', short({
  t: 4, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Give three reasons why the Legislative Assembly is a more powerful House than the Legislative Council.',
  model: '1. The Assembly alone can **introduce money bills**; the Council can only hold them for 14 days.\n2. On ordinary bills the Council can only **delay**, and the **Assembly\'s view prevails**.\n3. The **Council of Ministers is responsible to the Assembly**, so only the Assembly can remove a ministry.',
  sol: 'Money bills, ordinary bills, responsibility of the ministry.',
  scheme: [['Money bills', 1], ['Ordinary bills', 1], ['Responsibility of the ministry', 1]],
}));
Q('s3_scn', short({
  t: [3, 4], d: 4, c: 'application', marks: 3, wl: S3,
  stem: 'The Assembly of the imagined State of Kolahar passes a bill raising taxes on weekly markets. The Council, which has a majority from the opposite side, wishes to stop it. What can it do and what can it not do? Give your reasoning.',
  model: '1. If the bill is a **money bill**, the Council can only **hold it for fourteen days** and make recommendations.\n2. If it is an **ordinary bill**, the Council can **delay it** for three months and then one month more.\n3. It **cannot stop the bill for good**, as the **Assembly\'s view finally prevails**.',
  sol: 'Money versus ordinary bill; delay only.',
  scheme: [['Money bill: fourteen days', 1], ['Ordinary bill: delay', 1], ['Cannot stop it finally', 1]],
}));

// ================================================================ long answers (10 marks, 3 + 3 + 4)
Q('l_unibi', long({
  t: 1, d: 2, c: 'understanding', marks: 10, wl: L10,
  stem: 'Some State legislatures have two Houses and others have one.\n\n(i) Explain the terms unicameral and bicameral, naming the Houses of a bicameral State. **[3]**\n(ii) Name any three States that have a Legislative Council (as of 2024) and say how a State can get or lose a Council. **[3]**\n(iii) Give two arguments for and two against having a Legislative Council. **[4]**',
  model: '(i) A **unicameral** legislature has one House, the **Legislative Assembly**. A **bicameral** legislature has two Houses, the **Legislative Assembly** (lower House) and the **Legislative Council** (upper House).\n\n(ii) As of 2024, **Andhra Pradesh, Bihar and Karnataka** (also Maharashtra, Telangana and Uttar Pradesh) have a Council. The **State Assembly** passes a **resolution by a special majority**, and **Parliament** then makes a **law** to create or abolish the Council.\n\n(iii) For: it gives a **second look** at hasty bills; it brings in **experienced people**. Against: it is an **extra cost**; it can **delay** lawmaking, and it is not directly elected.',
  sol: 'Meaning and Houses; States and procedure; arguments for and against.',
  scheme: [['(i) Unicameral and bicameral', 1.5], ['(i) Houses named', 1.5], ['(ii) Three States', 1.5], ['(ii) Procedure', 1.5], ['(iii) Two arguments for', 2], ['(iii) Two arguments against', 2]],
}));
Q('l_assembly', long({
  t: 2, d: 3, c: 'understanding', marks: 10, wl: L10,
  stem: 'The Legislative Assembly is the more important House of a State legislature.\n\n(i) Explain its composition and how its members are elected. **[3]**\n(ii) State its term, and explain how the term may be shortened or lengthened. **[3]**\n(iii) State four qualifications for membership of the Legislative Assembly. **[4]**',
  model: '(i) The Assembly has **not more than 500 and not less than 60 members** (a few small States have fewer). They are **directly elected** by the voters from **territorial constituencies**, with seats **reserved** for the Scheduled Castes and Scheduled Tribes. It is presided over by the **Speaker**.\n\n(ii) The normal term is **five years**. The **Governor** may **dissolve** it earlier, usually on the **Chief Minister\'s advice**. While a **national emergency** lasts, **Parliament** can lengthen the term, **one year at a time**.\n\n(iii) A member must be a **citizen of India**, at least **25 years old**, **registered as a voter** on the electoral roll, and must **not hold an office of profit** under the government.',
  sol: 'Composition and election; term and its change; four qualifications.',
  scheme: [['(i) Strength', 1], ['(i) Direct election from constituencies', 1], ['(i) Reserved seats or Speaker', 1], ['(ii) Five-year term', 1], ['(ii) Early dissolution', 1], ['(ii) Extension in emergency', 1], ['(iii) Four qualifications, one mark each', 4]],
}));
Q('l_council', long({
  t: 3, d: 3, c: 'understanding', marks: 10, wl: L10,
  stem: 'A few States have a Legislative Council, the upper House of the State legislature.\n\n(i) Explain how its members are elected or nominated, naming any three groups with their shares. **[3]**\n(ii) State the minimum age of a member, the term of office and the limits on the size of the Council. **[3]**\n(iii) Why is the Legislative Council called a permanent House? How does this differ from the Assembly? **[4]**',
  model: '(i) **One-third** are elected by the **MLAs**, **one-third** by members of **local bodies**, **one-twelfth** by **graduates**, **one-twelfth** by **teachers**, and about **one-sixth** are **nominated by the Governor** from persons with special knowledge.\n\n(ii) A member must be at least **30 years old**. The term is **six years**. The Council can have **not more than one-third** of the Assembly\'s strength and **not fewer than 40** members.\n\n(iii) The Council is **never dissolved as a whole**. **One-third** of the members **retire every two years** and new members take their place, so there is always a House. The **Assembly**, in contrast, serves a **five-year term** and may be **dissolved** by the Governor.',
  sol: 'Composition; age, term and size; permanent House.',
  scheme: [['(i) Three groups named', 1.5], ['(i) Shares correctly given', 1.5], ['(ii) Age', 1], ['(ii) Term', 1], ['(ii) Size limits', 1], ['(iii) Permanent because of retirement by thirds', 2], ['(iii) Contrast with the Assembly', 2]],
}));
Q('l_powers', long({
  t: 4, d: 3, c: 'understanding', marks: 10, wl: L10,
  stem: 'The State legislature has a wide range of powers.\n\n(i) Explain its legislative powers. **[3]**\n(ii) Describe the financial powers of the State legislature, with special reference to a money bill. **[3]**\n(iii) Explain its control over the executive and its electoral functions. **[4]**',
  model: '(i) The legislature makes laws on the subjects of the **State List** and the **Concurrent List**. A bill is passed by the Assembly (and by the Council, where there is one) and becomes law with the **Governor\'s assent**. The Council can only **delay** an ordinary bill.\n\n(ii) A **money bill** can start only in the **Assembly**; the Assembly alone votes on the **demands for grants**. The Council can only **keep a money bill for fourteen days**, with recommendations.\n\n(iii) Members ask **questions**, move **motions** and the **Assembly** can pass a **no-confidence motion**, as the ministry is **responsible to it**. The elected **MLAs** take part in electing the **President** and elect the State\'s **Rajya Sabha** members. State legislatures also **ratify certain amendments**.',
  sol: 'Legislative; financial; executive control and electoral.',
  scheme: [['(i) State and Concurrent Lists', 1.5], ['(i) Passage of a bill and Governor\'s assent', 1.5], ['(ii) Money bill and grants in the Assembly', 1.5], ['(ii) Council holds fourteen days', 1.5], ['(iii) Control: questions, motions, no confidence', 2], ['(iii) Electoral functions', 2]],
}));
Q('l_compare', long({
  t: [2, 3, 4], d: 3, c: 'analysis', marks: 10, wl: L10,
  stem: 'A bicameral State legislature has an Assembly and a Council.\n\n(i) Distinguish the two Houses in the way their members come to the House. **[3]**\n(ii) Distinguish them in term of office and minimum age. **[3]**\n(iii) Explain, with two reasons, why the Assembly is more powerful than the Council. **[4]**',
  model: '(i) **Assembly** members are **directly elected** by voters from constituencies. **Council** members are **indirectly elected** by MLAs, local bodies, graduates and teachers, and about one-sixth are **nominated by the Governor**.\n\n(ii) The Assembly has a **five-year term** and a minimum age of **25**; it can be **dissolved**. The Council has a **six-year term** for each member, a minimum age of **30**, and is a **permanent House**.\n\n(iii) First, the **money bill** begins only in the Assembly and the Council can only hold it for **fourteen days**. Second, the ministry is **responsible to the Assembly**, which alone can pass a **no-confidence motion**. Besides, on ordinary bills the Council can only delay and the Assembly finally prevails.',
  sol: 'Composition; term and age; reasons for the Assembly\'s greater power.',
  scheme: [['(i) Assembly: direct election', 1.5], ['(i) Council: indirect election and nomination', 1.5], ['(ii) Term', 1.5], ['(ii) Minimum age', 1.5], ['(iii) First reason', 2], ['(iii) Second reason', 2]],
}));
Q('l_vaidhara', long({
  t: [3, 4], d: 4, c: 'application', marks: 10, wl: L10,
  stem: 'The imagined State of Vaidhara has a bicameral legislature and its Assembly has 150 members. The Assembly passes (1) a money bill on a levy for local fairs and (2) an ordinary bill on the registration of weekly markets, which the Council rejects. A group of members from the Assembly also wishes to remove the ministry.\n\n(i) What is the greatest number of members the Vaidhara Council may have? Show your working. **[3]**\n(ii) What can the Council do with each of the two bills, and what is the final result? **[3]**\n(iii) In which House can the removal of the ministry be attempted, and why not in the other? **[4]**',
  model: '(i) The Council may have **at most one-third** of the Assembly\'s members. One-third of **150** is **50**, which is above the minimum of **40**, so the greatest number is **50**.\n\n(ii) The **money bill** can be **held for only fourteen days**, after which it is treated as passed in the form the Assembly passed it. The **ordinary bill** can be **delayed three months** on the first occasion; if the Assembly passes it again and the Council again opposes it for a month, the bill is **treated as passed**. The **Assembly prevails** in both cases.\n\n(iii) The attempt can be made only in the **Assembly**, through a **no-confidence motion**, because the **Council of Ministers is responsible to the Assembly**. The Council can **question** and **debate**, but has **no power to remove** the government.',
  sol: 'Maximum Council size; fate of each bill; where the ministry can be removed.',
  scheme: [['(i) One-third rule', 1.5], ['(i) Correct working and answer 50', 1.5], ['(ii) Money bill', 1.5], ['(ii) Ordinary bill and final result', 1.5], ['(iii) Assembly and no-confidence motion', 2], ['(iii) Why not the Council', 2]],
}));
Q('l_abolish', long({
  t: [1, 4], d: 4, c: 'evaluation', marks: 10, wl: L10,
  stem: 'The Assembly of the imagined State of Mayurgarh is debating whether to ask for its Legislative Council to be abolished.\n\n(i) Explain the steps by which a Council can be abolished. **[3]**\n(ii) Give one argument for keeping the Council and one argument for abolishing it. **[3]**\n(iii) Evaluate which House\'s view prevails in a disagreement, and state whether you think the Council should be kept, giving a reason. **[4]**',
  model: '(i) The **State Assembly** passes a **resolution** by a **special majority**, asking for abolition. Then **Parliament** passes a **law** abolishing the Council. The process is the same as the creation of a Council.\n\n(ii) **For keeping:** the Council gives a **second look** to bills and brings in **experienced members**. **For abolishing:** it **adds to the cost**, may **delay** useful laws, and **does not answer directly** to the voters.\n\n(iii) The **Assembly\'s view prevails**: the Council can delay an ordinary bill for only a limited time and has little say over a money bill. A balanced view is that a Council is useful for **careful revision**, but because its power is limited its value depends on the **quality of its members**; whichever view is taken, a reasoned answer is needed.',
  sol: 'Procedure; arguments; evaluation.',
  scheme: [['(i) Assembly resolution by special majority', 1.5], ['(i) Law of Parliament', 1.5], ['(ii) Argument for keeping', 1.5], ['(ii) Argument for abolishing', 1.5], ['(iii) Assembly prevails with reason', 2], ['(iii) Reasoned personal view', 2]],
}));

// ================================================================ source-based items (imagined documents)
Q('sb_herald', source({
  t: [2, 3, 4], d: 3, c: 'application', origin: 'soyl-original',
  stem: `Read the imagined newspaper report and answer the questions that follow. ${IMAG}`,
  passage: '**The Girivan Herald, State page (imagined)**\n\nThe Girivan Assembly met on Tuesday under the Speaker and passed a bill on school buses. The bill went to the Legislative Council, which returned it within three days with a few suggestions. The Assembly then passed the Finance Bill, a money bill, and the Council kept it for fourteen days before returning it. Meanwhile, a member of the opposition moved a motion of no confidence in the ministry in the Assembly; it was defeated. A newly nominated member of the Council, a retired science teacher chosen by the Governor, took her seat on the same day.',
  parts: [
    child('a', short({ t: 2, d: 1, c: 'recall', marks: 1, stem: 'Who presided over the sitting of the Assembly?', model: 'The **Speaker**.', sol: 'The Speaker presides over the Assembly.', scheme: [['Speaker', 1]] })),
    child('b', short({ t: 3, d: 2, c: 'application', marks: 1, stem: 'Under which category of members does the retired science teacher enter the Council?', model: 'A **nominated member**, chosen by the **Governor** for special knowledge of **science**.', sol: 'Nomination by the Governor.', scheme: [['Nominated by the Governor', 1]] })),
    child('c', short({ t: 4, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Why did the Council hold the Finance Bill for fourteen days, and why was the opposition\'s no-confidence motion moved in the Assembly?', model: 'The **Finance Bill** is a **money bill**, which the Council may **hold for only fourteen days**. The motion was moved in the **Assembly** because the **ministry is responsible to it**.', sol: 'Money bill limit; responsibility to the Assembly.', scheme: [['Money bill held fourteen days', 1], ['Ministry responsible to the Assembly', 1]] }), [
      short({ t: 4, d: 3, c: 'understanding', marks: 2, stem: '**Or** (ii): Explain the two kinds of powers shown in the report by the Assembly and the Council.', model: 'The Assembly shows **legislative power** by passing a **bill**, and its **control over the executive** by the **no-confidence motion**. The Council shows a **limited role**, **suggesting changes** and **holding** a money bill for fourteen days.', sol: 'Legislative power and control; limited Council role.', scheme: [['Assembly: legislation and control', 1], ['Council: limited role', 1]] }),
    ]),
  ],
}));
Q('sb_notes', source({
  t: [2, 3], d: 4, c: 'analysis', origin: 'soyl-original',
  stem: `Read the imagined school notes and answer the questions that follow. ${IMAG}`,
  passage: '**Revision notes of Kavya, Class IX, Tamrapur (imagined)**\n\n1. The Legislative Assembly has members who are directly elected, and its normal term is six years.\n2. The Speaker is nominated by the Governor.\n3. The Legislative Council is a permanent House; its members must be at least thirty years old.\n4. One-third of the members of the Council retire every two years.\n\nKavya\'s teacher has marked two of these statements as incorrect.',
  parts: [
    child('a', short({ t: 2, d: 2, c: 'analysis', marks: 1, stem: 'Which numbered statement gives the wrong term of the Assembly?', model: 'Statement **1**: the normal term is **five years**, not six.', sol: 'The term of the Assembly is five years.', scheme: [['Statement 1', 1]] })),
    child('b', short({ t: 2, d: 2, c: 'analysis', marks: 1, stem: 'Which numbered statement is wrong about how the Speaker is chosen?', model: 'Statement **2**: the Speaker is **elected by the members** of the Assembly, not nominated.', sol: 'The Speaker is elected by the members.', scheme: [['Statement 2', 1]] })),
    child('c', short({ t: 3, d: 3, c: 'evaluation', marks: 2, stem: '**Either** (i): Explain why statements 3 and 4 are correct and how they are linked.', model: 'A member of the Council must be at least **30**, and **one-third retire every two years**, which keeps the House going. That is why the Council is a **permanent House**: the two statements are linked.', sol: 'Retirement by thirds makes it permanent.', scheme: [['Both statements confirmed', 1], ['Link: staggered retirement makes it permanent', 1]] }), [
      short({ t: 3, d: 3, c: 'understanding', marks: 2, stem: '**Or** (ii): Rewrite statement 1 correctly and say how the Assembly\'s term can be changed.', model: 'The Assembly has a **normal term of five years**. It can be **dissolved earlier** by the Governor and, in a **national emergency**, **extended** by Parliament one year at a time.', sol: 'Corrected term with ways of changing it.', scheme: [['Five years', 1], ['Dissolution or extension', 1]] }),
    ]),
  ],
}));
Q('sb_letter', source({
  t: [1, 4], d: 3, c: 'evaluation', origin: 'soyl-original',
  stem: `Read the imagined letter and answer the questions that follow. ${IMAG}`,
  passage: '**A letter from Mr Joshi, a teacher in Sindhuvan, to his niece (imagined)**\n\nDear Asha, you asked why our State has only an Assembly, while your State has a Council as well. Ours is a one-House legislature, so every bill is passed by the Assembly alone before it reaches the Governor. In your State, the Council can slow a bill down, but the Assembly has the last word. Some people in our State want a Council created, others think it would only add expense. Please tell me what you think.',
  parts: [
    child('a', short({ t: 1, d: 1, c: 'understanding', marks: 1, stem: 'What is the term for a legislature with one House, as in Mr Joshi\'s State?', model: '**Unicameral**.', sol: 'One House is unicameral.', scheme: [['Unicameral', 1]] })),
    child('b', short({ t: 4, d: 2, c: 'understanding', marks: 1, stem: 'Which House has the last word in a disagreement, according to the letter?', model: 'The **Legislative Assembly**.', sol: 'The Assembly prevails.', scheme: [['Legislative Assembly', 1]] })),
    child('c', short({ t: 1, d: 3, c: 'evaluation', marks: 2, stem: '**Either** (i): Give one reason in favour of creating a Council in Sindhuvan and one against.', model: '**For:** a Council gives a **second look** to bills and brings in **experienced persons**. **Against:** it **adds expense** and can **delay** lawmaking.', sol: 'One reason each side.', scheme: [['One reason in favour', 1], ['One reason against', 1]] }), [
      short({ t: 1, d: 3, c: 'application', marks: 2, stem: '**Or** (ii): Describe the steps by which Sindhuvan could create a Council.', model: 'The **Sindhuvan Assembly** must pass a **resolution** by a **special majority**. **Parliament** then passes a **law** to create the Council.', sol: 'Resolution by special majority; law of Parliament.', scheme: [['Assembly resolution by special majority', 1], ['Law of Parliament', 1]] }),
    ]),
  ],
}));

// ================================================================ extra scenario items (application and above)
Q('m_scn_retire', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'The Legislative Council of the imagined State of Harsilla has 60 members. How many members retire at the end of each two-year interval, if the usual pattern is followed?',
  opts: ['20', '10', '30', '12'],
  sol: 'One-third of the members retire every second year, and 60 divided by 3 is 20. The number 10 would be one-sixth, 30 would be half, and 12 would be one-fifth, none of which is the pattern.',
}));
Q('m_scn_term', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'The Governor of the imagined State of Mayurgarh dissolved the Assembly two years after it was elected, and fresh elections were held. What is the normal term of the newly elected Assembly?',
  opts: ['A fresh term of five years', 'The remaining three years of the old term', 'Six years, like the Council', 'Two years, to make up the time lost'],
  sol: 'A newly elected Assembly has its own full term of five years. It does not inherit the unused part of the old term, and the six-year term belongs to Council members, not the Assembly.',
}));
Q('m_scn_dissolved', mcq({
  t: [2, 3], d: 3, c: 'application',
  stem: 'In the imagined bicameral State of Girivan the Governor has just dissolved the Assembly. What is the position of the Legislative Council?',
  opts: [
    'It continues, because it is a permanent House that is never dissolved',
    'It is dissolved along with the Assembly',
    'It becomes the only House, and all its members retire at once',
    'It is suspended until the Chief Minister is re-elected',
  ],
  sol: 'The Council is a permanent House and is not affected by the dissolution of the Assembly. It is not dissolved, its members do not all retire together, and it is not suspended.',
}));
Q('m_scn_intro', mcq({
  t: 4, d: 3, c: 'application',
  stem: 'A member of the Legislative Council of the imagined State of Dhavalpur tries to introduce the State\'s Finance Bill in the Council. What is the position?',
  opts: [
    'It cannot be done, because a money bill can be introduced only in the Legislative Assembly',
    'It can be done, because either House may introduce a money bill',
    'It can be done if the Chairman permits it',
    'It can be done if the Governor was a member of the Council',
  ],
  sol: 'A money bill begins only in the Assembly. Neither the Chairman\'s permission nor the Governor\'s background can change this, and the Council cannot take the first step on a money bill.',
}));
Q('m_scn_nominee_age', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'The Governor of the imagined State of Nirmal Vale wishes to nominate Rekha, a 28-year-old celebrated social worker and a citizen, to the Legislative Council. What is the position?',
  opts: [
    'She cannot be nominated yet, because a Council member must be at least 30 years old',
    'She can be nominated, because social workers are exempt from the age rule',
    'She can be nominated, because the minimum age for the Council is 25',
    'She can be nominated only by the Chief Minister, not the Governor',
  ],
  sol: 'A member of the Council must be at least 30 years old, whatever the route of entry, so a 28-year-old cannot be nominated. There is no exemption for any field, 25 is the age for the Assembly, and nomination is by the Governor.',
}));
Q('s3_ministry_scn', short({
  t: 4, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'In the imagined State of Kolahar a ministry loses a vote of confidence in the Council but keeps the support of the Assembly. Does it have to resign? Explain, and say what the Council can still do about the ministry.',
  model: '1. The ministry **need not resign**, since it is **responsible to the Assembly**, which still supports it.\n2. The Council has **no power** to pass a motion that removes a ministry.\n3. It can still **question ministers**, **debate** their policies and **criticise** their work, and so make the government answer.',
  sol: 'Responsible to the Assembly; Council cannot remove; Council can question.',
  scheme: [['No resignation: responsible to the Assembly', 1], ['Council cannot remove the ministry', 1], ['Council can question and debate', 1]],
}));
