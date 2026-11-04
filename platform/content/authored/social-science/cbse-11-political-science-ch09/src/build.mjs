// Build CBSE 11 Political Science ch09 Constitution as a Living Document. Run from platform/:
//   npx tsx content/authored/social-science/cbse-11-political-science-ch09/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from '../../cbse-11-political-science-ch01/src/lib.mjs';

setUnit('cbse-11-political-science-ch09', 'social-science');
await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- SVG figures (no maps)
const vScale = (() => {
  const s = new Svg(760, 330);
  s.text(380, 24, 'How easily can a constitution be changed?', { bold: true, size: 16, color: 'accent' });
  s.line(60, 150, 700, 150, { sw: 2.5 });
  s.head(60, 150, -1, 0);
  s.head(700, 150, 1, 0);
  s.text(90, 112, 'Rigid', { bold: true, size: 18, color: 'red' });
  s.text(670, 112, 'Flexible', { bold: true, size: 18, color: 'green' });
  s.dot(130, 150, 8, 'red');
  s.dot(380, 150, 8, 'accent');
  s.dot(630, 150, 8, 'green');
  const lab = (x, head, col, lines) => {
    s.text(x, 188, head, { bold: true, size: 14, color: col });
    lines.forEach((t, j) => s.text(x, 212 + j * 20, t, { size: 13 }));
  };
  lab(130, 'Veldora (imagined)', 'red', ['Change needs a national vote', 'and most provincial councils']);
  lab(380, 'India', 'accent', ['Some parts by simple majority,', 'most by special majority,', 'some also with the states']);
  lab(630, 'Quillan (imagined)', 'green', ['Any part can be changed', 'by an ordinary law']);
  s.text(130, 296, 'Risk: may fall behind new needs', { size: 13, muted: true });
  s.text(630, 296, 'Risk: may be changed too easily', { size: 13, muted: true });
  s.text(380, 296, 'A balance of both', { size: 13, bold: true, color: 'accent' });
  return s.visual('Scale of constitutions from rigid to flexible. On the rigid side the imagined country Veldora needs a national vote and most provincial councils to change its constitution, and the risk is that it may fall behind new needs. On the flexible side the imagined country Quillan can change any part by an ordinary law, and the risk is that it may be changed too easily. India lies in between: some parts are changed by a simple majority, most by a special majority, and some also with the states, which is a balance of both', 'Rigid and flexible constitutions on a scale.');
})();

const vMethods = (() => {
  const s = new Svg(760, 390);
  const col = (x, title, colr, lines) => {
    s.rect(x, 10, 230, 46, { color: colr, sw: 2.5 });
    s.text(x + 115, 33, title, { bold: true, size: 14, color: colr });
    s.rect(x, 56, 230, 254, { color: colr, sw: 1.5, rx: 6 });
    lines.forEach((t, j) => { if (t) s.text(x + 115, 80 + j * 22, t, { size: 13 }); });
  };
  col(10, '1. Simple majority', 'blue', ['Ordinary law of Parliament', 'Majority of members', 'present and voting', '', 'Examples:', 'Article 3: new states', 'Article 169: Legislative', 'Councils', 'Not counted as an', 'Article 368 amendment']);
  col(265, '2. Special majority', 'green', ['Special majority in each House', 'Majority of total membership', 'and two thirds of members', 'present and voting', '', 'Used for most provisions,', 'including the', 'Fundamental Rights']);
  col(520, '3. Special majority + states', 'red', ['Special majority in each House', 'plus ratification by at', 'least half of the states', '', 'Federal matters:', 'Election of the President', 'Executive power of Union, states', 'Supreme Court, High Courts', 'Seventh Schedule lists', 'Representation of states', 'Article 368 itself']);
  s.rect(10, 326, 740, 50, { color: 'accent', sw: 2 });
  s.text(380, 351, 'All amendment bills: either House, no joint sitting, assent of the President obligatory', { size: 13, bold: true, color: 'accent' });
  return s.visual('Chart of the three ways of changing the Constitution. First, a simple majority of Parliament, an ordinary law, used for Article 3 on new states and Article 169 on Legislative Councils, which are not counted as amendments under Article 368. Second, a special majority in each House, a majority of the total membership and two thirds of the members present and voting, used for most provisions including the Fundamental Rights. Third, the special majority plus ratification by at least half of the states, used for federal matters: the election of the President, the executive power of the Union and states, the Supreme Court and High Courts, the Seventh Schedule lists, the representation of states in Parliament and Article 368 itself. For all amendment bills, either House may start, there is no joint sitting, and the assent of the President is obligatory', 'The three ways of changing the Constitution.');
})();

const vProcess = (() => {
  const s = new Svg(760, 450);
  const box = (y, h, text, colr) => { s.rect(100, y, 340, h, { color: colr, sw: 2 }); s.text(270, y + h / 2, text, { size: 13, bold: true, color: colr }); };
  box(15, 46, 'Amendment bill introduced in either House', 'accent');
  s.arrow(270, 61, 270, 100, { sw: 1.8 });
  box(100, 46, 'Passed in each House by the special majority', 'blue');
  s.arrow(270, 146, 270, 190, { sw: 1.8 });
  box(190, 56, 'Does it touch a federal provision?', 'brown');
  s.arrow(440, 218, 520, 218, { sw: 1.8, color: 'red' });
  s.text(480, 202, 'Yes', { size: 13, bold: true, color: 'red' });
  s.rect(520, 185, 230, 66, { color: 'red', sw: 2 });
  s.text(635, 208, 'Ratified by at least half', { size: 13 });
  s.text(635, 230, 'of the State Legislatures', { size: 13 });
  s.arrow(270, 246, 270, 300, { sw: 1.8 });
  s.text(290, 274, 'No', { size: 13, bold: true, anchor: 'start' });
  s.line(635, 251, 635, 323, { sw: 1.8, color: 'red' });
  s.arrow(635, 323, 440, 323, { sw: 1.8, color: 'red' });
  box(300, 46, 'The President gives assent (obligatory)', 'green');
  s.arrow(270, 346, 270, 390, { sw: 1.8 });
  box(390, 46, 'The Constitution stands amended', 'accent');
  return s.visual('Flow of the amendment process. An amendment bill is introduced in either House. It is passed in each House by the special majority. If it touches a federal provision, it must also be ratified by at least half of the State Legislatures; if not, it goes straight on. The President then gives assent, which is obligatory, and the Constitution stands amended', 'The path of an amendment bill.');
})();

const vTime = (() => {
  const s = new Svg(760, 320);
  s.line(30, 180, 730, 180, { sw: 2.5 });
  const ev = [
    ['1950', ['Constitution', 'in force']],
    ['1963', ['15th Amendment:', 'judges retire', 'at age 62']],
    ['1967', ['Golaknath', 'case']],
    ['1971', ['24th Amendment', 'and assent rule']],
    ['1973', ['Kesavananda', 'Bharati case']],
    ['1976', ['42nd Amendment', '(Emergency)']],
    ['1978', ['44th Amendment']],
    ['1980', ['Minerva Mills', 'case']],
    ['1985', ['52nd Amendment:', 'anti-defection']],
    ['1988', ['61st Amendment:', 'voting age 18']],
    ['1992', ['73rd and 74th', 'Amendments:', 'local government']],
  ];
  ev.forEach(([yr, lines], i) => {
    const x = 60 + i * 64;
    const up = i % 2 === 0;
    s.dot(x, 180, 6, 'accent');
    s.text(x, up ? 206 : 154, yr, { bold: true, size: 15, color: 'accent' });
    lines.forEach((ln, j) => s.text(x, up ? 30 + j * 18 : 242 + j * 18, ln, { size: 12 }));
    s.line(x, up ? 92 : 180, x, up ? 174 : 232, { sw: 1.2, color: 'muted', dash: true });
  });
  return s.visual('Timeline of amendments and cases: 1950, the Constitution comes into force; 1963, the 15th Amendment raises the retirement age of High Court judges to 62; 1967, the Golaknath case; 1971, the 24th Amendment and the rule that assent is obligatory; 1973, the Kesavananda Bharati case; 1976, the 42nd Amendment, during the Emergency; 1978, the 44th Amendment; 1980, the Minerva Mills case; 1985, the 52nd Amendment on anti-defection; 1988, the 61st Amendment lowering the voting age to 18; 1992, the 73rd and 74th Amendments on local government', 'Timeline, 1950 to 1992.');
})();

// ---------------------------------------------------------------- tables and flows: Part 1
const vWhy = table(
  ['Idea', 'Meaning'],
  [
    ['Why a constitution changes', 'Society, needs and knowledge change, so a constitution must be able to adapt'],
    ['Rigid constitution', 'One that is difficult to change, because change needs a demanding procedure'],
    ['Flexible constitution', 'One that can be changed easily, in the way an ordinary law is changed'],
    ['The Indian balance', 'Some parts can be changed easily, most need a special majority, and some also need the states'],
  ],
  'Table on why constitutions change: society and needs change so a constitution must adapt; a rigid constitution is difficult to change; a flexible constitution can be changed easily like an ordinary law; the Indian Constitution strikes a balance, with some parts changed easily, most needing a special majority, and some also needing the states',
);
const vArt368 = table(
  ['Point', 'Article 368'],
  [
    ['What it provides', 'The power of Parliament to amend the Constitution and the procedure for doing so'],
    ['Three ways, as commonly taught', 'A simple majority; a special majority; a special majority with ratification by the states'],
    ['Who can start it', 'An amendment bill may be introduced in either House of Parliament'],
    ['Where the bill is passed', 'In each House separately, because there is no joint sitting for amendment bills'],
  ],
  'Table on Article 368: it gives the power of Parliament to amend the Constitution and the procedure; three ways are commonly taught, a simple majority, a special majority, and a special majority with ratification by the states; a bill may be introduced in either House and is passed in each House separately because there is no joint sitting',
);
const vSimple = table(
  ['Matter', 'Detail'],
  [
    ['How it is passed', 'As an ordinary law, by a simple majority of members present and voting'],
    ['Article 3', 'Forming new states, and changing the area, boundaries or names of states'],
    ['Article 169', 'Creating or abolishing a Legislative Council in a state, after a resolution of the state Assembly'],
    ['Status', 'Technically not counted as amendments under Article 368'],
  ],
  'Table on the simple majority: such a change is passed as an ordinary law by a simple majority of members present and voting; examples are Article 3 on forming new states and changing boundaries or names, and Article 169 on creating or abolishing a Legislative Council after a resolution of the state Assembly; technically these are not counted as amendments under Article 368',
);
const vSpecial = table(
  ['Point', 'Special majority'],
  [
    ['Condition 1', 'A majority of the total membership of the House'],
    ['Condition 2', 'Two thirds of the members present and voting'],
    ['Both needed', 'A bill that meets only one of the two conditions fails'],
    ['Used for', 'Most provisions of the Constitution, including the Fundamental Rights'],
  ],
  'Table on the special majority: a majority of the total membership of the House, and two thirds of the members present and voting; both are needed, and a bill meeting only one fails; it is used for most provisions including the Fundamental Rights',
);
const vVotes = table(
  ['Step', 'Imagined House with 540 members in total'],
  [
    ['The imagined bill', 'The 140th Amendment Bill, to widen a Fundamental Right'],
    ['Condition 1', 'More than half of 540 means at least 271 votes for the bill'],
    ['Condition 2', 'With 360 present and voting, two thirds is 240 votes'],
    ['Case A: 300 vote for', '300 is at least 271 and at least 240: the bill passes in this House'],
    ['Case B: 270 vote for', '270 is above 240 but below 271: the bill fails'],
  ],
  'Worked example table on counting votes in an imagined House of 540 members: the imagined 140th Amendment Bill needs at least 271 votes for condition one and, with 360 present and voting, 240 for condition two; in case A, 300 votes pass the bill, and in case B, 270 votes fail it because 270 is below 271',
  'The bill, the House and all numbers are imagined.',
);
const vRatify = table(
  ['Matter affected', 'Why states are involved'],
  [
    ['Election of the President', 'The states take part in the election'],
    ['Executive power of the Union and the states', 'It concerns the division of power between the two levels'],
    ['The Supreme Court and the High Courts', 'The courts serve the Union and the states'],
    ['Lists of the Seventh Schedule', 'They divide subjects between the Union and the states'],
    ['Representation of states in Parliament', 'It concerns how states are heard at the centre'],
    ['Article 368 itself', 'The way of amending must not be changed without the states'],
  ],
  'Table of the matters needing ratification by at least half of the state legislatures: the election of the President, the executive power of the Union and the states, the Supreme Court and the High Courts, the lists of the Seventh Schedule, the representation of states in Parliament, and Article 368 itself, each affecting the federal structure',
);
const vWhich = table(
  ['Imagined bill', 'Method and reason'],
  [
    ['A law forming the imagined state of Tarnia from districts of Merivia', 'Simple majority under Article 3; not an amendment under Article 368'],
    ['The 140th Amendment Bill: widen a Fundamental Right', 'Special majority in each House; no ratification by the states'],
    ['The 141st Amendment Bill: move a subject from the State List to the Union List', 'Special majority plus ratification by at least half of the states'],
    ['The 142nd Amendment Bill: change the way the President is elected', 'Special majority plus ratification; the election of the President is a federal matter'],
  ],
  'Worked example table sorting imagined bills by method: a law forming the imagined state of Tarnia from districts of Merivia needs a simple majority under Article 3; the 140th Amendment Bill on widening a Fundamental Right needs a special majority without ratification; the 141st Amendment Bill moving a subject between lists needs a special majority plus ratification; the 142nd Amendment Bill on the election of the President needs a special majority plus ratification',
  'All the bills and the state are imagined.',
);
const vRules = table(
  ['Rule', 'Detail'],
  [
    ['Where it starts', 'In either House of Parliament; a state legislature cannot begin it'],
    ['Joint sitting', 'None for amendment bills: each House must pass the bill on its own'],
    ['Assent', 'The President must give assent; the 24th Amendment (1971) made this obligatory'],
    ['How many amendments', 'More than one hundred; the 106th, in 2023, is the latest as of 2024'],
  ],
  'Table of rules on amendment bills: a bill starts in either House and a state legislature cannot begin it; there is no joint sitting; the President must give assent, made obligatory by the 24th Amendment of 1971; more than one hundred amendments have been made and the 106th, in 2023, is the latest as of 2024',
);
const vKinds = table(
  ['Kind', 'Example'],
  [
    ['Technical or administrative', 'The 15th Amendment (1963) raised the retirement age of High Court judges from 60 to 62'],
    ['Differing interpretations', 'A disagreement between the judiciary and Parliament, for example over property and the Fundamental Rights'],
    ['Political consensus', 'The 52nd (1985), the 61st (1988), and the 73rd and 74th (1992)'],
    ['Controversial amendments of the 1970s', 'The 42nd Amendment (1976) and the 44th Amendment (1978)'],
  ],
  'Table of kinds of amendments: technical or administrative, such as the 15th Amendment of 1963 raising the retirement age of High Court judges from 60 to 62; differing interpretations between the judiciary and Parliament, for example over property and the Fundamental Rights; political consensus, such as the 52nd, 61st, 73rd and 74th; and the controversial amendments of the 1970s, the 42nd and 44th',
);
const vTechInterp = table(
  ['Kind', 'What it shows'],
  [
    ['Technical or administrative', 'A change of detail, such as an age or a date, that does not alter any policy'],
    ['Differing interpretations', 'When the judiciary and Parliament read a provision differently, Parliament may amend the text'],
    ['A test question', 'Does the change adjust a detail, answer a court reading, or reflect wide agreement?'],
  ],
  'Table on technical amendments and differing interpretations: technical amendments change a detail such as an age or a date without altering policy; when the judiciary and Parliament read a provision differently, Parliament may amend the text; a test question is whether the change adjusts a detail, answers a court reading or reflects wide agreement',
);
const vConsensus = table(
  ['Amendment', 'Year', 'Subject'],
  [
    ['52nd', '1985', 'Defection by elected members (anti-defection)'],
    ['61st', '1988', 'Voting age lowered to 18'],
    ['73rd and 74th', '1992', 'Local government, rural and urban'],
  ],
  'Table of amendments made through political consensus: the 52nd of 1985 on anti-defection; the 61st of 1988 lowering the voting age to 18; the 73rd and 74th of 1992 on rural and urban local government',
);
const vSum1 = table(
  ['Topic', 'Key points'],
  [
    ['Why amend', 'To adapt while staying stable: a balance of rigidity and flexibility'],
    ['Article 368', 'Three ways: simple majority; special majority; special majority plus states'],
    ['Special majority', 'Majority of total membership and two thirds present and voting'],
    ['Rules', 'Either House; no joint sitting; assent obligatory (24th Amendment, 1971)'],
    ['Kinds', 'Technical; differing interpretations; consensus; the 1970s'],
  ],
  'Summary table of Part 1: why amend, Article 368 and the three ways, the special majority, the rules of the procedure, and the kinds of amendments',
);
const vTips1 = table(
  ['Common mistake', 'Write instead'],
  [
    ['Every change needs a special majority', 'Article 3 and Article 169 changes need only a simple majority'],
    ['A special majority means two thirds of the total membership', 'A majority of the total membership and two thirds of those present and voting'],
    ['A joint sitting settles a deadlock on an amendment', 'There is no joint sitting for amendment bills'],
    ['Every amendment needs ratification by the states', 'Only federal matters need ratification by at least half of the states'],
  ],
  'Table of common mistakes in Part 1 and what to write instead',
);

// ---------------------------------------------------------------- tables and flows: Part 2
const v42 = table(
  ['Point', 'The 42nd Amendment, 1976'],
  [
    ['When', 'Passed during the national Emergency (1975 to 1977)'],
    ['Scope', 'Changed many parts of the Constitution in a single amendment'],
    ['Preamble', 'Added the words socialist, secular and integrity'],
    ['Duties', 'Added the Fundamental Duties'],
  ],
  'Table on the 42nd Amendment of 1976: passed during the national Emergency of 1975 to 1977; it changed many parts of the Constitution in a single amendment; it added the words socialist, secular and integrity to the Preamble; and it added the Fundamental Duties',
);
const v44 = table(
  ['Point', 'The 44th Amendment, 1978'],
  [
    ['When', 'Passed in 1978, after the Emergency had ended'],
    ['What it did', 'Restored several provisions that the 42nd Amendment had changed'],
    ['Why they are studied together', 'One amendment changed many parts and a later one restored several of them'],
    ['Lesson', 'The amending power is wide, and its use is a matter for study and judgement'],
  ],
  'Table on the 44th Amendment of 1978: passed after the Emergency had ended; it restored several provisions that the 42nd Amendment had changed; the two are studied together because one amendment changed many parts and a later one restored several; the lesson is that the amending power is wide and its use is a matter for study and judgement',
);
const vGolak = table(
  ['Point', 'Golaknath case, 1967'],
  [
    ['Question', 'Can Parliament amend the Fundamental Rights?'],
    ['Held', 'The Supreme Court held that Parliament cannot amend the Fundamental Rights'],
    ['Why it matters', 'It limited the amending power and set Parliament and the Court at odds'],
  ],
  'Table on the Golaknath case of 1967: the question was whether Parliament can amend the Fundamental Rights; the Supreme Court held that it cannot; it limited the amending power and set Parliament and the Court at odds',
);
const v24 = table(
  ['Point', '24th Amendment, 1971'],
  [
    ['Assertion', 'Parliament asserted its power to amend any part of the Constitution'],
    ['Assent', 'The President must give assent to a duly passed amendment bill'],
    ['Place in the story', 'A response to the position taken in the Golaknath case'],
  ],
  'Table on the 24th Amendment of 1971: Parliament asserted its power to amend any part of the Constitution; it made the assent of the President obligatory; it was a response to the position in the Golaknath case',
);
const vKesav = table(
  ['Point', 'Kesavananda Bharati case, 1973'],
  [
    ['The principle', 'Parliament can amend any part of the Constitution but cannot alter its basic structure'],
    ['The bench', 'A bench of thirteen judges heard the case, the largest in the history of the Court'],
    ['The result', 'The basic structure doctrine, which became the main limit on amendments'],
  ],
  'Table on the Kesavananda Bharati case of 1973: Parliament can amend any part of the Constitution but cannot alter its basic structure; a bench of thirteen judges heard it; the result was the basic structure doctrine, the main limit on amendments',
);
const vChain = flow('LR', ['Golaknath, 1967: the Fundamental Rights cannot be amended', 'The 24th Amendment, 1971: Parliament asserts its power over every part', 'Kesavananda Bharati, 1973: any part may be amended, but not the basic structure', 'Minerva Mills, 1980: the doctrine is reaffirmed'], 'Flow of the development of the doctrine: in the Golaknath case of 1967 the Fundamental Rights cannot be amended; in the 24th Amendment of 1971 Parliament asserts its power over every part; in the Kesavananda Bharati case of 1973 any part may be amended but not the basic structure; in the Minerva Mills case of 1980 the doctrine is reaffirmed', 'From Golaknath to Minerva Mills');
const vElements = table(
  ['Feature, as identified by the courts over time, for example', 'Meaning'],
  [
    ['Supremacy of the Constitution', 'All laws and all organs of government are bound by the Constitution'],
    ['Republican and democratic form of government', 'Rule by elected representatives and a head of state who is not hereditary'],
    ['Secular character', 'The state has no official religion and treats all faiths with respect'],
    ['Separation of powers', 'The legislature, executive and judiciary have their own roles'],
    ['Federal character', 'Power is shared between the Union and the states'],
    ['Judicial review', 'Courts can examine whether laws and amendments follow the Constitution'],
    ['The rule of law', 'Everyone, including the government, is subject to the law'],
  ],
  'Table of features commonly listed as part of the basic structure, as identified by the courts over time, for example: the supremacy of the Constitution, the republican and democratic form of government, the secular character, the separation of powers, the federal character, judicial review and the rule of law, each with a short meaning',
);
const vApply = table(
  ['Question about the imagined 143rd Amendment Act', 'Applying the doctrine'],
  [
    ['The Act says no court may examine laws for accord with the Constitution', 'It touches judicial review, a feature of the basic structure'],
    ['It was passed by the special majority and ratified by the states', 'Procedure alone does not settle whether it is valid'],
    ['A petition challenges it', 'The Court may test whether the Act alters the basic structure'],
    ['If it does alter it', 'The Court may strike the Act down; Parliament cannot alter that core'],
  ],
  'Worked example table applying the basic structure doctrine to the imagined 143rd Amendment Act: it says no court may examine laws, which touches judicial review; passing by the special majority and ratification does not settle its validity; a petition lets the Court test whether it alters the basic structure; if it does, the Court may strike it down',
  'The Act and the petition are imagined.',
);
const vMinerva = table(
  ['Point', 'Minerva Mills case, 1980'],
  [
    ['Doctrine', 'Reaffirmed the basic structure doctrine'],
    ['Balance', 'Stressed the balance between the Fundamental Rights and the Directive Principles'],
    ['Fundamental Rights', 'Rights in Part III that citizens can enforce in the courts'],
    ['Directive Principles', 'Guidelines in Part IV for governments, not enforced by the courts'],
  ],
  'Table on the Minerva Mills case of 1980: it reaffirmed the basic structure doctrine and stressed the balance between the Fundamental Rights, rights in Part III enforceable in courts, and the Directive Principles, guidelines in Part IV for governments not enforced by courts',
);
const vViews = table(
  ['Some argue', 'Others argue'],
  [
    ['Judges are not elected, so the doctrine gives them too much power over Parliament', 'The doctrine protects the core of the Constitution from a passing majority'],
    ['The list of features is not fixed, so judges decide what is basic', 'A fixed list would not meet new situations, and the courts give reasons case by case'],
    ['Elected representatives should have the last word on amendments', 'Some features are so central that no majority should change them'],
  ],
  'Table of two views on the basic structure doctrine: some argue that judges are not elected, that the list of features is not fixed, and that elected representatives should have the last word; others argue that the doctrine protects the core from a passing majority, that a fixed list would not meet new situations, and that some features are so central that no majority should change them',
  'Students should weigh both views with reasons.',
);
const vPlan = table(
  ['Step in planning a five mark answer', 'Imagined question: examine the significance of the doctrine'],
  [
    ['1. Define', 'The doctrine: Parliament can amend any part but cannot alter the basic structure'],
    ['2. Flexibility', 'The wide power to amend lets the Constitution adapt'],
    ['3. Stability', 'The protection of core features keeps it stable'],
    ['4. View one', 'Some argue that judges gain too much power'],
    ['5. View two', 'Others argue that the core is protected'],
  ],
  'Worked example table planning a five mark answer on the significance of the doctrine: define the doctrine; the wide power gives flexibility; protection of core features gives stability; some argue that judges gain too much power; others argue the core is protected',
  'One mark for each step.',
);
const vArt21 = table(
  ['Point', 'Judicial interpretation'],
  [
    ['Meaning', 'Courts explain what a provision means and, over time, can read a wider meaning into it'],
    ['Article 21', 'The right to life and personal liberty'],
    ['Examples', 'Courts have read the right to livelihood and the right to privacy into Article 21'],
    ['Effect', 'Rights widen without any change in the wording of the text'],
  ],
  'Table on judicial interpretation: courts explain what a provision means and can read a wider meaning into it; Article 21 is the right to life and personal liberty; courts have read the right to livelihood and the right to privacy into it; rights widen without any change in the wording',
);
const vConv = table(
  ['Point', 'Political practice and conventions'],
  [
    ['Convention', 'An accepted practice, not written in a law, that guides how political actors behave'],
    ['Imagined example', 'In Pellara the head of state always invites the leader of the largest group to form a government'],
    ['Effect', 'The practice fills a silence in the text and changes how the constitution works'],
    ['Limit', 'A convention cannot override what the written text clearly provides'],
  ],
  'Table on political practice and conventions: a convention is an accepted practice not written in a law that guides political actors; in imagined Pellara the head of state always invites the leader of the largest group to form a government; the practice fills a silence in the text; a convention cannot override what the written text clearly provides',
);
const vTogether = flow('LR', ['Parliament amends the text under Article 368', 'Courts interpret the text and state the basic structure limit', 'Political practice and conventions shape how it works', 'A living Constitution that keeps its core'], 'Flow of how a living Constitution grows: Parliament amends the text under Article 368; courts interpret the text and state the basic structure limit; political practice and conventions shape how it works; the result is a living Constitution that keeps its core', 'How the Constitution stays alive');
const vSum2 = table(
  ['Topic', 'Key points'],
  [
    ['1970s', '42nd (1976) during the Emergency; 44th (1978) restored several provisions'],
    ['Cases', 'Golaknath 1967; 24th Amendment 1971; Kesavananda Bharati 1973; Minerva Mills 1980'],
    ['Basic structure', 'Parliament can amend any part but cannot alter the basic structure'],
    ['Views', 'Some argue judges gain too much power; others argue the core is protected'],
    ['Living document', 'Amendment, interpretation and practice, with a stable core'],
  ],
  'Summary table of Part 2: the 1970s amendments, the four steps from Golaknath to Minerva Mills, the basic structure doctrine, the two views, and the Constitution as a living document',
);
const vTips2 = table(
  ['Common mistake', 'Write instead'],
  [
    ['Kesavananda Bharati stopped all amendments', 'Parliament can amend any part but cannot alter the basic structure'],
    ['The basic structure is a fixed list in the text', 'The courts have identified features over time, for example judicial review'],
    ['The 44th Amendment came before the 42nd', 'The 42nd was 1976 and the 44th was 1978'],
    ['Taking a side on the doctrine without reasons', 'Say some argue, others argue, then give reasons'],
  ],
  'Table of common mistakes in Part 2 and what to write instead',
);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Constitution as a Living Document, Part 1: Amending the Constitution',
  goals: [
    'Explain why a constitution needs an amendment procedure and what rigid and flexible mean',
    'Describe the three ways of changing the Constitution under Article 368 and elsewhere',
    'Define a special majority and apply it to an imagined vote',
    'Explain which matters need ratification by the states',
    'State the other rules of the procedure and the kinds of amendments made',
  ],
  slides: [
    sl('title', 'Amending the Constitution', {
      b: 'Part 1: **why** a constitution changes, **how** it is amended, and the **kinds** of amendments.',
      v: flow('LR', ['Why amend', 'Article 368', 'Three ways', 'Rules of the procedure', 'Kinds of amendments'], 'Route map of Part 1: why amend, Article 368, the three ways, the rules of the procedure, and the kinds of amendments', 'Part 1 at a glance'),
      n: 'A constitution is written once, but a country goes on changing. How can a constitution stay faithful to its first principles and still meet new needs? In this part we study why the Indian Constitution can be amended, the three ways in which it is changed, the rules of the procedure, and the kinds of amendments that have been made.',
    }),
    sl('concept', 'Why a constitution must be able to change', {
      v: vWhy,
      n: 'A constitution must be able to change because society and its needs change. A rigid constitution is difficult to change, because change needs a demanding procedure. A flexible constitution can be changed easily, in the way an ordinary law is changed. The Indian Constitution strikes a balance between the two.',
    }),
    sl('diagram', 'The rigid and flexible scale', {
      v: vScale,
      n: 'This scale shows how easily constitutions can be changed. The imagined country of Veldora is rigid, since change needs a national vote and most provincial councils. The imagined country of Quillan is flexible, since any part can be changed by an ordinary law. India lies in between, with some parts changed by a simple majority, most by a special majority, and some also with the states.',
    }),
    sl('concept', 'Article 368 and the three ways', {
      v: vArt368,
      n: 'Article three hundred and sixty eight gives Parliament the power to amend the Constitution and lays down the procedure. As commonly taught, there are three ways of changing the Constitution. The first is a simple majority, the second a special majority, and the third a special majority with ratification by the states.',
    }),
    sl('diagram', 'The three methods at a glance', {
      v: vMethods,
      n: 'This chart sets the three methods side by side. The first is an ordinary law, used for forming new states and for Legislative Councils. The second is a special majority in each House, used for most provisions, including the Fundamental Rights. The third adds ratification by the states, and is used for federal matters. For all of them, either House may start the bill, and the President must assent.',
    }),
    sl('concept', 'Way one: the simple majority', {
      v: vSimple,
      n: 'Some changes are made as an ordinary law, by a simple majority of members present and voting. Article three allows Parliament to form new states and to change their area, boundaries or names. Article one hundred and sixty nine allows a Legislative Council to be created or abolished in a state. Technically, these are not counted as amendments under Article three hundred and sixty eight.',
    }),
    sl('check', 'Quick check: the Article', {
      b: 'Which Article of the Constitution lays down the procedure for amending it?',
      chk: 'm_art368',
      n: 'Recall the Article on the amending power.',
    }),
    sl('concept', 'Way two: the special majority', {
      v: vSpecial,
      n: 'A special majority has two conditions. First, a majority of the total membership of the House. Second, two thirds of the members present and voting. Both are needed, and a bill that meets only one of them fails. Most provisions of the Constitution, including the Fundamental Rights, are amended in this way.',
    }),
    sl('example', 'Worked example 1: counting the votes', {
      b: 'An imagined House has five hundred and forty members in total. Test two outcomes of a vote on an imagined amendment bill.',
      bl: ['Check **both** conditions', 'Count **two thirds** of those voting'],
      v: vVotes,
      n: 'Imagine a House with five hundred and forty members in total. More than half means at least two hundred and seventy one votes. With three hundred and sixty members present and voting, two thirds is two hundred and forty. If three hundred vote for the bill, both conditions are met. If only two hundred and seventy vote for it, the second condition is met but the first is not, so the bill fails.',
    }),
    sl('concept', 'Way three: ratification by the states', {
      v: vRatify,
      n: 'Some matters affect the federal structure. These are the election of the President, the executive power of the Union and the states, the Supreme Court and the High Courts, the lists of the Seventh Schedule, the representation of states in Parliament, and Article three hundred and sixty eight itself. For these, the special majority is not enough. At least half of the state legislatures must also ratify the amendment.',
    }),
    sl('diagram', 'The path of an amendment bill', {
      v: vProcess,
      n: 'Follow the path of an amendment bill. It is introduced in either House. It is passed in each House by the special majority. If it touches a federal provision, at least half of the State Legislatures must ratify it. Then the President gives assent, which is obligatory, and the Constitution stands amended.',
    }),
    sl('check', 'Quick check: put the steps in order', {
      b: 'Arrange the steps in the passing of an amendment that affects a federal provision.',
      chk: 'ord_process',
      n: 'Think about what comes first, and when the states have their say.',
    }),
    sl('example', 'Worked example 2: which method applies?', {
      b: 'Four imagined bills are before Parliament. Match each with the correct method.',
      bl: ['Is it an **ordinary law** under Article 3?', 'Does it affect the **federal structure**?'],
      v: vWhich,
      n: 'Let us sort four imagined bills. A law forming the imagined state of Tarnia needs a simple majority under Article three. A bill to widen a Fundamental Right needs a special majority, without ratification. A bill to move a subject from the State List to the Union List needs the special majority and ratification by the states. A bill to change the way the President is elected also needs ratification, because it is a federal matter.',
    }),
    sl('concept', 'Other rules of the procedure', {
      v: vRules,
      n: 'An amendment bill can be introduced in either House of Parliament, but not in a state legislature. There is no joint sitting for amendment bills, so each House must pass the bill on its own. The President must give assent, and the twenty fourth Amendment of nineteen seventy one made this obligatory. More than one hundred amendments have been made, and the one hundred and sixth, in two thousand twenty three, is the latest as of two thousand twenty four.',
    }),
    sl('check', 'Quick check: the rules', {
      b: 'Which statement about an amendment bill under Article 368 is correct?',
      chk: 'm_joint',
      n: 'Recall where a bill can start and whether a joint sitting applies.',
    }),
    sl('concept', 'The kinds of amendments', {
      v: vKinds,
      n: 'Amendments can be grouped in four kinds. Technical or administrative amendments change a detail, such as the retirement age of High Court judges in nineteen sixty three. Some arise from differing interpretations between the judiciary and Parliament. Some were made through political consensus. And some, in the nineteen seventies, were controversial.',
    }),
    sl('concept', 'Technical amendments and differing interpretations', {
      v: vTechInterp,
      n: 'A technical or administrative amendment adjusts a detail, such as an age or a date, without altering any policy. When the judiciary and Parliament read a provision differently, for example over property and the Fundamental Rights, Parliament may amend the text. To place an amendment in a group, ask whether it adjusts a detail, answers a court reading, or reflects wide agreement.',
    }),
    sl('check', 'Quick check: match the amendments', {
      b: 'Match each amendment with the description that fits it.',
      chk: 'mt_kinds',
      n: 'Pair each amendment with its subject.',
    }),
    sl('concept', 'Amendments through political consensus', {
      v: vConsensus,
      n: 'Some amendments were made because the political parties agreed on them. The fifty second Amendment of nineteen eighty five dealt with defection by elected members. The sixty first Amendment of nineteen eighty eight lowered the voting age to eighteen. The seventy third and seventy fourth Amendments of nineteen ninety two gave local government in rural and urban areas a constitutional footing.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSum1,
      n: 'To sum up. A constitution must adapt and yet stay stable, so the Indian Constitution balances rigidity and flexibility. Article three hundred and sixty eight gives three ways: a simple majority, a special majority, and a special majority with ratification by the states. A bill may start in either House, there is no joint sitting, and the President must assent. Amendments may be technical, may follow differing interpretations, or may come through consensus.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['Define the **special majority** with both conditions', 'Give an **example** for each method', 'Name the **federal matters** that need the states', 'Date the facts: **1963**, **1985**, **1988**, **1992**'],
      v: vTips1,
      n: 'A few tips. Define the special majority with both of its conditions. Give an example for each of the three methods. Name the federal matters that need ratification by the states. And date your facts, such as nineteen sixty three for the retirement age of judges, and nineteen eighty eight for the voting age.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Constitution as a Living Document, Part 2: The Basic Structure and a Living Constitution',
  goals: [
    'State the main facts of the 42nd and 44th Amendments',
    'Trace the cases and amendments from Golaknath (1967) to Minerva Mills (1980)',
    'Explain the basic structure doctrine and list features identified by the courts',
    'Present both views on the significance of the doctrine',
    'Explain how amendment, interpretation and practice keep the Constitution alive',
  ],
  slides: [
    sl('title', 'The Basic Structure and a Living Constitution', {
      b: 'Part 2: the **amendments of the 1970s**, the **basic structure** doctrine, and a **living** Constitution.',
      v: flow('LR', ['The 1970s amendments', 'From Golaknath to Minerva Mills', 'The basic structure', 'Two views', 'A living Constitution'], 'Route map of Part 2: the 1970s amendments, from Golaknath to Minerva Mills, the basic structure, two views, and a living Constitution', 'Part 2 at a glance'),
      n: 'If Parliament can amend the Constitution, can it amend everything? This question led to some of the most important cases in the history of the Constitution. In this part we study the amendments of the nineteen seventies, the basic structure doctrine, the views on its significance, and the idea of a living Constitution.',
    }),
    sl('concept', 'The 42nd Amendment, 1976', {
      v: v42,
      n: 'The forty second Amendment of nineteen seventy six was passed during the national Emergency, which lasted from nineteen seventy five to nineteen seventy seven. It changed many parts of the Constitution in a single amendment. It added the words socialist, secular and integrity to the Preamble, and it added the Fundamental Duties.',
    }),
    sl('concept', 'The 44th Amendment, 1978', {
      v: v44,
      n: 'The forty fourth Amendment of nineteen seventy eight was passed after the Emergency had ended. It restored several provisions that the forty second Amendment had changed. The two are studied together because one amendment changed many parts and a later one restored several of them. They show how wide the amending power is.',
    }),
    sl('check', 'Quick check: the two amendments', {
      b: 'Which description of the 42nd Amendment (1976) and the 44th Amendment (1978) is correct?',
      chk: 'm_44th',
      n: 'Recall which came first and what the later one did.',
    }),
    sl('diagram', 'Amendments and cases on a timeline', {
      v: vTime,
      n: 'This timeline brings together the landmarks. The Constitution came into force in nineteen fifty. The retirement age of judges was changed in nineteen sixty three. The Golaknath case was in nineteen sixty seven, the twenty fourth Amendment in nineteen seventy one, and Kesavananda Bharati in nineteen seventy three. Then came the forty second and forty fourth Amendments, Minerva Mills in nineteen eighty, and the amendments of nineteen eighty five, nineteen eighty eight and nineteen ninety two.',
    }),
    sl('concept', 'The Golaknath case, 1967', {
      v: vGolak,
      n: 'In nineteen sixty seven the Supreme Court decided the Golaknath case. The question was whether Parliament can amend the Fundamental Rights. The Court held that Parliament cannot. This limited the amending power, and it set Parliament and the Court at odds over how far that power went.',
    }),
    sl('concept', 'The 24th Amendment, 1971', {
      v: v24,
      n: 'In nineteen seventy one Parliament passed the twenty fourth Amendment. It asserted that Parliament has the power to amend any part of the Constitution. It also made it obligatory for the President to give assent to a duly passed amendment bill. It was a response to the position taken in the Golaknath case.',
    }),
    sl('check', 'Quick check: the Golaknath case', {
      b: 'In the Golaknath case (1967), the Supreme Court held that',
      chk: 'm_golak',
      n: 'Recall what the Court said about the Fundamental Rights.',
    }),
    sl('concept', 'The Kesavananda Bharati case, 1973', {
      v: vKesav,
      n: 'In nineteen seventy three came the Kesavananda Bharati case. A bench of thirteen judges heard it. The Court held that Parliament can amend any part of the Constitution, but it cannot alter the basic structure. This is the basic structure doctrine, and it became the main limit on amendments.',
    }),
    sl('diagram', 'From Golaknath to Minerva Mills', {
      v: vChain,
      n: 'See the steps in order. In nineteen sixty seven, Golaknath held that the Fundamental Rights cannot be amended. In nineteen seventy one, Parliament asserted its power over every part of the Constitution. In nineteen seventy three, Kesavananda Bharati held that any part may be amended, but not the basic structure. In nineteen eighty, Minerva Mills reaffirmed the doctrine.',
    }),
    sl('concept', 'What belongs to the basic structure?', {
      v: vElements,
      n: 'The Constitution does not give a fixed list of the basic structure. The courts have identified features over time. For example, they include the supremacy of the Constitution, the republican and democratic form of government, the secular character, the separation of powers, the federal character, judicial review, and the rule of law.',
    }),
    sl('example', 'Worked example 1: testing an imagined amendment', {
      b: 'The imagined 143rd Amendment Act says that no court may examine whether laws follow the Constitution. Apply the doctrine.',
      bl: ['Which **feature** does it touch?', 'Can **procedure alone** make it valid?'],
      v: vApply,
      n: 'Imagine an amendment Act saying that no court may examine whether laws follow the Constitution. This touches judicial review, a feature of the basic structure. It was passed by the special majority and ratified by the states, but procedure alone does not settle whether it is valid. On a petition, the Court may test whether the Act alters the basic structure, and may strike it down if it does.',
    }),
    sl('check', 'Quick check: the basic structure', {
      b: 'True or false: the features of the basic structure are not given in one fixed list in the text, and the courts have identified them over time.',
      chk: 'tf_list',
      n: 'Think about how the features were identified.',
    }),
    sl('concept', 'The Minerva Mills case, 1980', {
      v: vMinerva,
      n: 'The Minerva Mills case of nineteen eighty reaffirmed the basic structure doctrine. It stressed the balance between the Fundamental Rights and the Directive Principles. The Fundamental Rights are rights that citizens can enforce in the courts. The Directive Principles are guidelines for governments, which the courts do not enforce.',
    }),
    sl('concept', 'Significance: two views', {
      v: vViews,
      n: 'The doctrine balances rigidity and flexibility, and it limits the amending power. Some argue that judges are not elected, so the doctrine gives them too much power over Parliament. Others argue that it protects the core of the Constitution from a passing majority. Students should weigh the reasons on each side before they decide.',
    }),
    sl('example', 'Worked example 2: planning a five mark answer', {
      b: 'Plan an answer to: examine the significance of the basic structure doctrine. Give one mark to each step.',
      bl: ['Define, then explain **flexibility** and **stability**', 'Give **both views**'],
      v: vPlan,
      n: 'Plan the answer in five steps, with one mark for each. First, define the doctrine. Second, say that the wide power to amend gives flexibility. Third, say that the protection of core features gives stability. Fourth, state the view that judges gain too much power. Fifth, state the view that the core is protected. Do not take a side without reasons.',
    }),
    sl('concept', 'A living document: judicial interpretation', {
      v: vArt21,
      n: 'A Constitution lives not only through amendments. Courts explain what a provision means and, over time, can read a wider meaning into it. For example, courts have read the right to livelihood and the right to privacy into Article twenty one, the right to life and personal liberty. The rights widened without any change in the wording.',
    }),
    sl('concept', 'A living document: political practice', {
      v: vConv,
      n: 'Political practice also shapes a constitution. A convention is an accepted practice, not written in a law, that guides how political actors behave. In the imagined country of Pellara, the head of state always invites the leader of the largest group to form a government. Such a practice fills a silence in the text, but it cannot override what the written text clearly provides.',
    }),
    sl('diagram', 'How the Constitution stays alive', {
      v: vTogether,
      n: 'Parliament amends the text under Article three hundred and sixty eight. Courts interpret the text and state the basic structure limit. Political practice and conventions shape how it works. Together, these contributions give a living Constitution that grows with society and yet keeps its core.',
    }),
    sl('check', 'Quick check: put the events in order', {
      b: 'Arrange these events in the order in which they happened.',
      chk: 'ord_time',
      n: 'Use the timeline to put the cases and the amendment in order.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSum2,
      n: 'To sum up. The forty second Amendment was passed during the Emergency, and the forty fourth restored several provisions. From Golaknath to Kesavananda Bharati, the Court and Parliament worked out the limit: Parliament can amend any part but cannot alter the basic structure. Minerva Mills reaffirmed it. People hold different views on the doctrine. The Constitution lives through amendment, interpretation and practice, with a stable core.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['Put the **cases in order** with years', 'Say the doctrine in **both parts**: any part, but not the basic structure', 'Give **both views** with reasons', 'Use **imagined bills** or countries for examples'],
      v: vTips2,
      n: 'A few tips. Put the cases in order, with their years. State the doctrine in both parts: Parliament can amend any part, but cannot alter the basic structure. On the significance of the doctrine, give both views with reasons. And for examples you may use imagined bills or imagined countries.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Constitution as a Living Document: Notes',
  sections: [
    {
      h: '1. Why a constitution is amended',
      t: 1,
      b: 'A constitution is written at one time but has to serve later times, so it needs a way of changing. A **rigid constitution** is hard to change; a **flexible constitution** can be changed as easily as an ordinary law. The Indian Constitution is a **balance** of the two: some parts are changed easily, most need a special majority, and some need the states as well.',
      terms: [
        ['Amendment', 'A formal change in the text of the Constitution, made by the procedure that the Constitution itself provides.'],
        ['Rigid constitution', 'A constitution that is difficult to change, because change needs a demanding procedure.'],
        ['Flexible constitution', 'A constitution that can be changed easily, in the way an ordinary law is changed.'],
      ],
      v: vScale,
      vs: [vWhy],
    },
    {
      h: '2. Article 368: the three ways',
      t: 1,
      b: '**Article 368** gives Parliament the power to amend the Constitution and lays down the procedure. As commonly taught, there are three ways:\n\n- **Simple majority:** ordinary laws, such as **Article 3** (new states) and **Article 169** (Legislative Councils), technically not amendments under Article 368.\n- **Special majority in each House:** for most provisions, including the **Fundamental Rights**.\n- **Special majority plus ratification by at least half of the state legislatures:** for federal matters.',
      terms: [
        ['Simple majority', 'More than half of the members present and voting.'],
        ['Special majority', 'A majority of the total membership of a House together with two thirds of the members present and voting.'],
        ['Ratification', 'Formal approval of an amendment by the legislatures of the states, where the Constitution requires it.'],
      ],
      v: vMethods,
      vs: [vSimple, vSpecial],
    },
    {
      h: '3. Federal matters and the rules of the procedure',
      t: 1,
      b: 'The matters that need ratification include the **election of the President**, the **executive power of the Union and the states**, the **Supreme Court and the High Courts**, the **lists of the Seventh Schedule**, the **representation of states in Parliament** and **Article 368** itself.\n\nA bill can start in **either House**; there is **no joint sitting**; the **President must assent** (24th Amendment, 1971). More than a hundred amendments have been made; the 106th, in 2023, is the latest as of 2024.',
      terms: [
        ['Federal provision', 'A provision that affects the division of power between the Union and the states; amending it needs ratification by the states.'],
      ],
      v: vProcess,
      vs: [vRatify, vVotes, vWhich, vRules],
    },
    {
      h: '4. Kinds of amendments and the 1970s',
      t: 1,
      b: 'Amendments are commonly grouped as **technical or administrative** (15th, 1963: retirement age of High Court judges from 60 to 62), those from **differing interpretations** of the judiciary and Parliament, those through **political consensus** (52nd, 1985; 61st, 1988; 73rd and 74th, 1992) and the **controversial amendments of the 1970s**.\n\nThe **42nd Amendment (1976)** was passed during the national Emergency (1975 to 1977); it changed many parts of the Constitution, added socialist, secular and integrity to the Preamble and added the Fundamental Duties. The **44th Amendment (1978)** restored several provisions.',
      terms: [
        ['Anti-defection law', 'The rule, made by the 52nd Amendment in 1985, on the disqualification of elected members who defect from their party.'],
      ],
      v: vTime,
      vs: [vKinds, vTechInterp, vConsensus, v42, v44],
    },
    {
      h: '5. The basic structure doctrine',
      t: 2,
      b: '**Golaknath (1967):** Parliament cannot amend the Fundamental Rights. **24th Amendment (1971):** Parliament asserted its power over every part. **Kesavananda Bharati (1973):** Parliament can amend any part but **cannot alter the basic structure**. **Minerva Mills (1980):** the doctrine was reaffirmed, with the balance between the Fundamental Rights and the Directive Principles.\n\nThe courts have identified features over time, for example: supremacy of the Constitution, the republican and democratic form of government, the secular character, separation of powers, the federal character, judicial review and the rule of law.',
      terms: [
        ['Basic structure', 'The core features of the Constitution that Parliament cannot alter by amendment, as identified by the courts.'],
        ['Judicial review', 'The power of the courts to examine whether laws and amendments follow the Constitution and to strike down those that do not.'],
        ['Fundamental Rights', 'The rights in Part III of the Constitution that citizens can enforce in the courts.'],
        ['Directive Principles', 'Guidelines in Part IV of the Constitution for governments in making policy, which the courts do not enforce.'],
      ],
      v: vChain,
      vs: [vGolak, v24, vKesav, vElements, vMinerva, vApply],
    },
    {
      h: '6. Significance of the doctrine',
      t: 2,
      b: 'The doctrine **balances rigidity and flexibility**: the wide amending power gives flexibility, and the protection of the core gives stability. It **limits the amending power**.\n\n**Some argue** that it gives judges too much power over an elected Parliament. **Others argue** that it protects the core of the Constitution from a passing majority. A good answer presents both and gives reasons.',
      terms: [],
      v: vViews,
      vs: [vPlan],
    },
    {
      h: '7. The Constitution as a living document',
      t: 2,
      b: 'A **living document** grows with society and keeps its core. It changes through **amendments** by Parliament, through **judicial interpretation** (courts have read the right to livelihood and the right to privacy into **Article 21**) and through **political practice and conventions**. Parliament and the judiciary contribute together.',
      terms: [
        ['Living document', 'A constitution that keeps growing and adapting, through amendment, interpretation and practice, while keeping its core.'],
        ['Convention', 'An accepted practice, not written in a law, that guides how political actors behave and fills a silence in the text.'],
      ],
      v: vTogether,
      vs: [vArt21, vConv],
    },
  ],
  tips: '**Common mistakes**\n- Saying every change needs a special majority: Article 3 and Article 169 changes need only a simple majority.\n- Defining the special majority as two thirds of the total membership: it is a majority of the total membership and two thirds of those present and voting.\n- Saying a joint sitting settles a deadlock on an amendment bill: there is no joint sitting for amendment bills.\n- Saying Kesavananda Bharati stopped all amendments: Parliament can amend any part but cannot alter the basic structure.\n- Taking a side on the doctrine without reasons: present both views.\n\n**Tips:** put the cases in order with years (1967, 1971, 1973, 1980); give one example for each method; use imagined bills and countries for examples; date facts (the 106th Amendment, 2023, as of 2024).',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['Why does a constitution need an amendment procedure?', 'So that it can adapt to new needs and still stay stable.', 'concept', 1],
  ['What is a **rigid** constitution?', 'One that is difficult to change, because change needs a demanding procedure.', 'definition', 1],
  ['What is a **flexible** constitution?', 'One that can be changed easily, in the way an ordinary law is changed.', 'definition', 1],
  ['Which Article lays down the amendment procedure?', 'Article 368.', 'fact', 1],
  ['Name the three ways of changing the Constitution', 'A simple majority; a special majority in each House; a special majority plus ratification by at least half of the state legislatures.', 'concept', 1],
  ['What is a **simple majority**?', 'More than half of the members present and voting.', 'definition', 1],
  ['What is a **special majority**?', 'A majority of the total membership of the House and two thirds of the members present and voting.', 'definition', 1],
  ['Which two matters are changed by a simple majority?', 'Forming new states (Article 3) and creating or abolishing a Legislative Council (Article 169).', 'fact', 1],
  ['Which provisions are amended by the special majority alone?', 'Most provisions, including the Fundamental Rights.', 'fact', 1],
  ['What is **ratification**?', 'Formal approval of an amendment by the state legislatures; at least half must ratify a federal amendment.', 'definition', 1],
  ['Name three matters that need ratification by the states', 'For example the election of the President, the Seventh Schedule lists and the representation of states in Parliament.', 'fact', 1],
  ['Where can an amendment bill be introduced?', 'In either House of Parliament.', 'fact', 1],
  ['Is there a joint sitting for an amendment bill?', 'No: each House must pass it on its own.', 'fact', 1],
  ['Who must assent to an amendment bill, and since when is it obligatory?', 'The President; the 24th Amendment (1971) made assent obligatory.', 'fact', 1],
  ['How many amendments have been made?', 'More than one hundred; the 106th, in 2023, is the latest as of 2024.', 'fact', 1],
  ['Give an example of a **technical** amendment', 'The 15th Amendment (1963) raised the retirement age of High Court judges from 60 to 62.', 'fact', 1],
  ['What is an amendment from **differing interpretations**?', 'One that follows a disagreement between the judiciary and Parliament, for example over property and the Fundamental Rights.', 'concept', 1],
  ['Name three amendments made through political consensus', 'The 52nd (1985, anti-defection), the 61st (1988, voting age 18), and the 73rd and 74th (1992, local government).', 'fact', 1],
  ['When was the **42nd Amendment** passed, and what did it add to the Preamble?', 'In 1976, during the national Emergency (1975 to 1977); it added socialist, secular and integrity, and the Fundamental Duties.', 'fact', 1],
  ['What did the **44th Amendment** (1978) do?', 'It restored several provisions that the 42nd Amendment had changed.', 'fact', 1],
  ['**Golaknath case (1967)**', 'The Court held that Parliament cannot amend the Fundamental Rights.', 'fact', 2],
  ['**24th Amendment (1971)**', 'Parliament asserted its power to amend any part of the Constitution; assent made obligatory.', 'fact', 2],
  ['**Kesavananda Bharati case (1973)**', 'Parliament can amend any part of the Constitution but cannot alter its basic structure.', 'fact', 2],
  ['**Minerva Mills case (1980)**', 'Reaffirmed the doctrine and the balance between the Fundamental Rights and the Directive Principles.', 'fact', 2],
  ['What is the **basic structure**?', 'The core features of the Constitution that Parliament cannot alter by amendment, as identified by the courts.', 'definition', 2],
  ['Name four features identified as part of the basic structure, for example', 'Supremacy of the Constitution, the democratic form of government, judicial review, the federal character.', 'fact', 2],
  ['What is **judicial review**?', 'The power of the courts to examine whether laws and amendments follow the Constitution and to strike down those that do not.', 'definition', 2],
  ['Why does the doctrine balance rigidity and flexibility?', 'The wide amending power gives flexibility, and the protection of the core gives stability.', 'concept', 2],
  ['Give the two views on the doctrine', 'Some argue that judges gain too much power; others argue that it protects the core from a passing majority.', 'concept', 2],
  ['What is a **living document**?', 'A constitution that keeps growing through amendment, interpretation and practice, while keeping its core.', 'definition', 2],
  ['How have courts widened rights under Article 21?', 'They have read rights such as livelihood and privacy into the right to life and personal liberty.', 'concept', 2],
].map(([a, b, c, t]) => [a, b, c, t]));

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-11-default-chapter-test-short',
  title: 'Chapter test (short): Constitution as a Living Document',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A: Objective (1 mark each)', instr: 'Questions 1 to 4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_special_app', 'm_ratify_app', 'm_basic_app', 'ar_golak'] },
    { id: 'B', title: 'Section B: Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30 to 50 words and the 3-mark question in about 50 to 80 words.', items: ['s_assent', 's_golak', 's3_methods'] },
    { id: 'C', title: 'Section C: Long answer (5 marks)', instr: 'Answer any ONE of the two questions in about 80 to 120 words.', items: [{ attempt: 1, keys: ['l_procedure', 'l_basic'] }] },
    { id: 'D', title: 'Section D: Case-based (4 marks)', instr: 'Read the passage and answer all parts. Part (c) has an internal choice.', items: ['c_bill'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-11-default-chapter-test-long',
  title: 'Chapter test (long): Constitution as a Living Document',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A: Objective (1 mark each)', instr: 'Questions 1 to 10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_simple_app', 'm_fr_app', 'm_technical_app', 'm_42nd', 'm_elements', 'm_cons_app', 'm_art21_app', 'm_convention_app', 'ar_special', 'ar_basic'] },
    { id: 'B', title: 'Section B: Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30 to 50 words and 3-mark questions in about 50 to 80 words. Questions 13 and 15 have an internal choice.', items: ['s_special', 's_technical', { attempt: 1, keys: ['s_kesav', 's_conv'] }, 's3_kinds', { attempt: 1, keys: ['s3_balance', 's3_together'] }] },
    { id: 'C', title: 'Section C: Long answer (5 marks)', instr: 'Answer question 16, and any ONE of questions 17 and 18, in about 80 to 120 words each.', items: ['l_kinds', { attempt: 1, keys: ['l_balance', 'l_living'] }] },
    { id: 'D', title: 'Section D: Case-based (4 marks each)', instr: 'Read each passage and answer all parts. Part (c) of each has an internal choice.', items: ['c_merivia', 'c_debate'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01 and t02 of cbse-11-political-science-ch09 only (amendment procedure and contents of amendments; the basic structure doctrine and the Constitution as a living document)',
    originality: 'every bill, bulletin, register, report, discussion and project (the imagined 140th to 150th Amendment Bills, Veldora, Quillan, Pellara, Tarnovia, Merivia, Tarnia, Halsey, Harbour Road School) is imagined, written by SOYL and labelled; no NCERT text, boxed source or cartoon, no Constitution text, judgment text or board item reused (D-036)',
    facts: 'stable facts only: Articles 3, 21, 169 and 368; special majority; ratification by at least half of the state legislatures; 24th Amendment 1971 (assent obligatory); 15th (1963), 42nd (1976), 44th (1978), 52nd (1985), 61st (1988), 73rd and 74th (1992), 106th (2023, latest as of 2024); Golaknath 1967, Kesavananda Bharati 1973, Minerva Mills 1980',
    neutrality: 'no map, no party, no current office-holder or present-day proposal named; the 42nd and 44th Amendments stated as facts with no judgement of any person or party; the doctrine framed as some argue and others argue',
    gate: 'schema, content lint (lintExemplar) and the deterministic verify checks run clean on this chapter',
  },
});
