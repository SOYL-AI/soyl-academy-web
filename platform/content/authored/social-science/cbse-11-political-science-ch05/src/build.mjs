// Build CBSE 11 Political Science ch05 Legislature. Run from platform/:
//   npx tsx content/authored/social-science/cbse-11-political-science-ch05/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from '../../cbse-11-political-science-ch01/src/lib.mjs';

setUnit('cbse-11-political-science-ch05', 'social-science');
await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- SVG figures (no maps)
// 1. Two Houses compared
const vCompare = (() => {
  const s = new Svg(760, 396);
  s.rect(165, 10, 280, 34, { color: 'green', sw: 2 });
  s.text(305, 27, 'Rajya Sabha', { bold: true, size: 15, color: 'green' });
  s.rect(455, 10, 295, 34, { color: 'blue', sw: 2 });
  s.text(602, 27, 'Lok Sabha', { bold: true, size: 15, color: 'blue' });
  const rows = [
    ['Represents', ['The States'], ['The people']],
    ['Strength', ['At most 250: 238 elected,', '12 nominated by the President'], ['Up to 550 elected allowed;', '543 constituencies (as of 2024)']],
    ['How chosen', ['Indirect: State Assembly members', 'vote by single transferable vote'], ['Direct: voters choose by', 'first past the post']],
    ['Term', ['Six years; one-third retire', 'every second year'], ['Five years, unless the House', 'is dissolved earlier']],
    ['Minimum age', ['30 years'], ['25 years']],
    ['Special powers', ['Article 249 and Article 312'], ['Money bills; no-confidence motion']],
  ];
  rows.forEach(([label, a, b], i) => {
    const y = 54 + i * 56;
    s.text(88, y + 26, label, { bold: true, size: 13, muted: true });
    [[165, 280, a], [455, 295, b]].forEach(([x, w, lines]) => {
      s.rect(x, y, w, 52, { color: 'muted', sw: 1.5, rx: 6 });
      if (lines.length === 1) s.text(x + w / 2, y + 26, lines[0], { size: 13 });
      else lines.forEach((ln, j) => s.text(x + w / 2, y + 17 + j * 20, ln, { size: 13 }));
    });
  });
  return s.visual('Comparison chart of the two Houses of Parliament. The Rajya Sabha represents the States, has at most 250 members of whom 238 are elected and 12 nominated by the President, is chosen indirectly by State Assembly members by single transferable vote, has a six year term with one third retiring every second year, a minimum age of 30, and special powers under Article 249 and Article 312. The Lok Sabha represents the people, allows up to 550 elected members with 543 constituencies as of 2024, is chosen directly by first past the post, has a five year term unless dissolved earlier, a minimum age of 25, and special powers over money bills and no-confidence motions', 'The two Houses compared.');
})();

// 2. Bill to law
const vBill = (() => {
  const s = new Svg(760, 300);
  const box = (x, y, l1, l2, col) => {
    s.rect(x, y, 200, 64, { color: col, sw: 2 });
    s.text(x + 100, y + 23, l1, { size: 13 });
    s.text(x + 100, y + 43, l2, { size: 13 });
  };
  box(20, 30, '1. Introduction and', 'first reading', 'blue');
  box(280, 30, '2. Second reading;', 'may go to a committee', 'blue');
  box(540, 30, '3. Consideration, vote', 'and third reading', 'blue');
  box(540, 170, '4. Same stages in the', 'other House', 'green');
  box(280, 170, '5. Assent of the', 'President', 'brown');
  box(20, 170, '6. The bill becomes', 'an Act (a law)', 'accent');
  s.arrow(220, 62, 278, 62, { sw: 1.8 });
  s.arrow(480, 62, 538, 62, { sw: 1.8 });
  s.arrow(640, 94, 640, 168, { sw: 1.8 });
  s.arrow(540, 202, 482, 202, { sw: 1.8 });
  s.arrow(280, 202, 222, 202, { sw: 1.8 });
  s.text(380, 14, 'First House', { size: 13, muted: true });
  s.text(380, 262, 'If the Houses disagree on an ordinary bill: joint sitting (Article 108)', { size: 13, muted: true });
  return s.visual('Flowchart of how an ordinary bill becomes a law: introduction and first reading; second reading, which may involve a committee; consideration, vote and third reading in the first House; the same stages in the other House; assent of the President; the bill becomes an Act. If the Houses disagree on an ordinary bill, a joint sitting is called under Article 108', 'How an ordinary bill becomes a law.');
})();

// 3. Web of control
const vControl = (() => {
  const s = new Svg(760, 340);
  const cx = 380, cy = 170;
  const boxes = [
    [30, 12, ['Question Hour:', 'questions to ministers'], 'blue', 'top'],
    [280, 12, ['Zero Hour and calling', 'attention notices'], 'blue', 'top'],
    [530, 12, ['Adjournment motion on', 'urgent public matters'], 'blue', 'top'],
    [30, 144, ['Approval or refusal', 'of bills'], 'green', 'left'],
    [530, 144, ['No-confidence motion', 'against the Council'], 'red', 'right'],
    [30, 276, ['Budget and demands', 'for grants'], 'brown', 'bottom'],
    [280, 276, ['Public Accounts Committee', 'and audit reports'], 'brown', 'bottom'],
    [530, 276, ['Standing and joint', 'committees'], 'green', 'bottom'],
  ];
  boxes.forEach(([x, y, , , pos]) => {
    const bx = x + 100;
    if (pos === 'top') s.line(cx, cy - 30, bx, y + 52, { sw: 1.4, color: 'muted' });
    else if (pos === 'bottom') s.line(cx, cy + 30, bx, y, { sw: 1.4, color: 'muted' });
    else if (pos === 'left') s.line(cx - 100, cy, x + 200, cy, { sw: 1.4, color: 'muted' });
    else s.line(cx + 100, cy, x, cy, { sw: 1.4, color: 'muted' });
  });
  boxes.forEach(([x, y, lines, col]) => {
    s.rect(x, y, 200, 52, { color: col, sw: 2 });
    lines.forEach((ln, j) => s.text(x + 100, y + 18 + j * 20, ln, { size: 13 }));
  });
  s.rect(cx - 100, cy - 30, 200, 60, { color: 'accent', sw: 2.5 });
  s.text(cx, cy - 10, 'Parliament controls', { bold: true, size: 14, color: 'accent' });
  s.text(cx, cy + 12, 'the executive', { bold: true, size: 14, color: 'accent' });
  return s.visual('Web of the instruments by which Parliament controls the executive: Question Hour, Zero Hour and calling attention notices, the adjournment motion, approval or refusal of bills, the no-confidence motion, the budget and demands for grants, the Public Accounts Committee with audit reports, and standing and joint committees', 'Instruments of parliamentary control.');
})();

// 4. Money bill flow
const vMoney = (() => {
  const s = new Svg(760, 430);
  const box = (x, y, w, lines, col) => {
    s.rect(x, y, w, 64, { color: col, sw: 2 });
    lines.forEach((ln, j) => s.text(x + w / 2, y + 23 + j * 20, ln, { size: 13 }));
  };
  box(15, 15, 230, ['1. Introduced in the', 'Lok Sabha only'], 'blue');
  box(265, 15, 230, ['2. The Speaker certifies', 'it as a money bill'], 'blue');
  box(515, 15, 230, ['3. The Lok Sabha', 'passes the bill'], 'blue');
  s.arrow(245, 47, 263, 47, { sw: 1.8 });
  s.arrow(495, 47, 513, 47, { sw: 1.8 });
  box(515, 130, 230, ['4. Sent to the Rajya Sabha:', 'it has 14 days'], 'green');
  s.arrow(630, 79, 630, 128, { sw: 1.8 });
  box(265, 250, 230, ['5a. Returned with suggestions;', 'Lok Sabha may accept or reject'], 'green');
  box(515, 250, 230, ['5b. No action in 14 days:', 'deemed passed by Parliament'], 'green');
  s.arrow(600, 194, 400, 248, { sw: 1.8 });
  s.arrow(630, 194, 630, 248, { sw: 1.8 });
  box(265, 360, 480, ['6. Assent of the President: the bill becomes an Act', 'No joint sitting is held for a money bill'], 'accent');
  s.arrow(380, 314, 380, 358, { sw: 1.8 });
  s.arrow(630, 314, 630, 358, { sw: 1.8 });
  return s.visual('Flow of a money bill: it is introduced in the Lok Sabha only; the Speaker certifies it as a money bill; the Lok Sabha passes it; it is sent to the Rajya Sabha, which has 14 days; the Rajya Sabha either returns it with suggestions, which the Lok Sabha may accept or reject, or takes no action, in which case it is deemed passed after 14 days; the President gives assent and it becomes an Act; there is no joint sitting for a money bill', 'Path of a money bill.');
})();

// ---------------------------------------------------------------- tables and flows: Part 1
const vFunctions = table(
  ['Function', 'What it means'],
  [
    ['Law-making', 'Debating and passing bills so that they become laws'],
    ['Representation', 'Speaking for the people and for the States'],
    ['Control of the executive', 'Questioning ministers and being able to remove the government'],
    ['Debate', 'A forum where public issues are discussed openly'],
  ],
  'Table of the four functions of Parliament: law-making; representation of the people and the States; control of the executive by questioning ministers and being able to remove the government; and debate on public issues',
);
const vWhyTwo = table(
  ['Reason for two Houses', 'Explanation'],
  [
    ['Two kinds of representation', 'One House for the people, one for the States'],
    ['Reconsideration', 'A bill is studied twice, which checks hasty decisions'],
    ['Federal balance', 'The States are heard in making laws for the Union'],
    ['In the States', 'Most States have one House; six have Legislative Councils (as of 2024)'],
  ],
  'Table of reasons for two Houses: two kinds of representation, reconsideration of bills, federal balance, and in the States most have one House while six have a Legislative Council as of 2024',
);
const vRSComp = table(
  ['Point', 'Rajya Sabha'],
  [
    ['Represents', 'The States'],
    ['Strength', 'At most 250: 238 elected and 12 nominated'],
    ['Nominated', 'For art, literature, science and social service'],
    ['Election', 'Elected members of State Assemblies; single transferable vote'],
    ['Term', 'Six years; a permanent House'],
  ],
  'Table about the Rajya Sabha: it represents the States; at most 250 members, 238 elected and 12 nominated for art, literature, science and social service; elected by the elected members of State Assemblies by the single transferable vote; six year term; a permanent House',
);
const vRSEx = table(
  ['Step in the imagined case of Dr Mehra', 'What happens'],
  [
    ['1. The seat', 'A Rajya Sabha seat from the imagined State of Palmora falls vacant'],
    ['2. Candidates', 'Several candidates are put up for the seat'],
    ['3. Voters', 'Only the elected members of the Palmora Legislative Assembly vote'],
    ['4. Method', 'They vote by single transferable vote, in order of preference'],
    ['5. Result', 'The candidate with the quota of votes is declared elected'],
  ],
  'Worked example table of an imagined Rajya Sabha election from Palmora: a seat falls vacant, candidates are put up, only the elected members of the State Legislative Assembly vote, by single transferable vote in order of preference, and the candidate with the quota is elected',
  'The voters are Assembly members, not the public.',
);
const vBatches = table(
  ['Imagined batch of members', 'Retires'],
  [
    ['Batch A, elected in 2026', '2032'],
    ['Batch B, elected in 2028', '2034'],
    ['Batch C, elected in 2030', '2036'],
    ['In every two years', 'About one-third of the House retires and new members join'],
  ],
  'Table of an imagined cycle of retirement: members elected in 2026 retire in 2032, those elected in 2028 retire in 2034, those elected in 2030 retire in 2036; in every two years about one-third of the House retires and new members join',
  'Members stagger, so the House never dissolves.',
);
const vUnequal = table(
  ['Chamber', 'Seats for each unit'],
  [
    ['United States Senate', 'Two for every State, equal'],
    ['Rajya Sabha', 'Allotted broadly by population, so unequal'],
    ['Imagined Rhenia', 'Three for every province, equal'],
  ],
  'Table comparing second chambers: the United States Senate gives two seats to every State; the Rajya Sabha allots seats broadly by population so it is unequal; imagined Rhenia gives three seats to every province',
  'India differs from an equal-seat second chamber.',
);
const vLSComp = table(
  ['Point', 'Lok Sabha'],
  [
    ['Represents', 'The people'],
    ['Election', 'Directly elected by first past the post'],
    ['Size', 'Up to 550 elected allowed; 543 constituencies (as of 2024)'],
    ['Nominated seats', 'Two Anglo-Indian seats ended by the 104th Amendment (2019, in effect 2020)'],
    ['Term', 'Five years, unless dissolved earlier'],
  ],
  'Table about the Lok Sabha: it represents the people; directly elected by first past the post; the Constitution allows up to 550 elected members with 543 constituencies as of 2024; the two nominated Anglo-Indian seats ended with the 104th Amendment passed in 2019 and in effect from 2020; five year term unless dissolved earlier',
);
const vCommon = table(
  ['Power shared by both Houses', 'Note'],
  [
    ['Ordinary bills', 'A bill must pass both Houses'],
    ['Constitutional amendments', 'Both Houses pass them by a special majority'],
    ['Election of the President', 'Elected members of both Houses vote'],
    ['Election of the Vice-President', 'All members of both Houses vote'],
  ],
  'Table of the powers shared by both Houses: passing ordinary bills, passing constitutional amendments by a special majority, and taking part in the election of the President by elected members and of the Vice-President by all members',
);
const vLevyEx = table(
  ['Day', 'Imagined Coastal Levy Bill'],
  [
    ['Day 1', 'The Speaker certifies it as a money bill; the Lok Sabha passes it'],
    ['Day 2', 'It is sent to the Rajya Sabha, which debates it'],
    ['Day 8', 'The Rajya Sabha returns it with two suggestions'],
    ['Day 9', 'The Lok Sabha rejects both suggestions'],
    ['Result', 'The bill goes on in the form the Lok Sabha passed it'],
  ],
  'Worked example table of the imagined Coastal Levy Bill: on day one the Speaker certifies it as a money bill and the Lok Sabha passes it; on day two it goes to the Rajya Sabha; on day eight the Rajya Sabha returns it with two suggestions; on day nine the Lok Sabha rejects them; the bill goes on in the form the Lok Sabha passed it',
  'A money bill is settled by the Lok Sabha.',
);
const vRSSpecial = table(
  ['Article', 'Special power of the Rajya Sabha'],
  [
    ['Article 249', 'A two-thirds resolution lets Parliament make a law on a State List subject in the national interest'],
    ['Article 312', 'A two-thirds resolution lets Parliament create a new All India Service'],
    ['Why the Rajya Sabha', 'It represents the States, whose subjects and services are affected'],
  ],
  'Table of the special powers of the Rajya Sabha: under Article 249 a two-thirds resolution lets Parliament make a law on a State List subject in the national interest; under Article 312 a two-thirds resolution lets Parliament create a new All India Service; the Rajya Sabha has these because it represents the States',
);
const vSum1 = table(
  ['Topic', 'Key points'],
  [
    ['Functions', 'Law-making, representation, control, debate'],
    ['Why two Houses', 'People and States; reconsideration'],
    ['Rajya Sabha', 'At most 250 (238 + 12); six years; one-third retire every two years'],
    ['Lok Sabha', 'Direct election; up to 550 allowed, 543 seats; five years'],
    ['Special powers', 'Lok Sabha: money bills, no confidence. Rajya Sabha: Articles 249 and 312'],
  ],
  'Summary table of Part 1: functions of Parliament, why two Houses, the Rajya Sabha, the Lok Sabha and the special powers of each House',
);
const vTips1 = table(
  ['Common mistake', 'Write instead'],
  [
    ['The Rajya Sabha is elected by voters', 'Elected indirectly by the elected members of State Assemblies'],
    ['The Rajya Sabha can reject a money bill', 'It can only delay it for 14 days'],
    ['Both Houses can remove the Council of Ministers', 'Only the Lok Sabha can pass a no-confidence motion'],
  ],
  'Table of common mistakes in Part 1 and what to write instead',
);

// ---------------------------------------------------------------- tables and flows: Part 2
const vKinds = table(
  ['Kind of bill', 'Features'],
  [
    ['Government bill', 'Introduced by a minister; carries government policy'],
    ['Private member\'s bill', 'Introduced by a member who is not a minister; rarely passed'],
    ['Ordinary bill', 'Can start in either House; both Houses must pass it'],
    ['Money bill (Article 110)', 'Taxes, borrowing and spending; starts only in the Lok Sabha'],
  ],
  'Table of kinds of bills: government bills introduced by a minister; private member bills introduced by a member who is not a minister; ordinary bills that can start in either House; and money bills under Article 110 about taxes, borrowing and spending that start only in the Lok Sabha',
);
const vStages = table(
  ['Reading', 'What happens'],
  [
    ['First reading', 'The bill is introduced and its aim stated; no detailed debate'],
    ['Second reading', 'The principles and clauses are debated; a committee may study it'],
    ['Consideration', 'Clause-by-clause study and amendments'],
    ['Third reading', 'The final vote on the bill as a whole'],
  ],
  'Table of the readings of a bill: first reading to introduce it, second reading to debate its principles and clauses with a possible committee reference, consideration clause by clause, and third reading for the final vote',
);
const vLibEx = table(
  ['Step', 'Imagined Village Libraries Bill'],
  [
    ['Introduction', 'A minister introduces it in the Lok Sabha and states its aim'],
    ['Second reading', 'Members debate it; a committee studies the clauses and reports'],
    ['Third reading', 'The Lok Sabha votes and passes the bill'],
    ['Other House', 'The Rajya Sabha takes it through the same stages and passes it'],
    ['Assent', 'The President signs; it becomes the Village Libraries Act'],
  ],
  'Worked example table tracing the imagined Village Libraries Bill: introduction in the Lok Sabha; second reading with a committee; third reading and passing; the same stages in the Rajya Sabha; assent of the President so it becomes an Act',
  'Both Houses pass an ordinary bill.',
);
const vAssent = table(
  ['Kind of bill', 'What the President can do'],
  [
    ['Ordinary bill', 'Give assent, or return it once; if passed again, assent must follow'],
    ['Money bill', 'Give assent; it cannot be sent back for reconsideration'],
    ['Delay', 'No time limit is set, which gave rise to the pocket veto'],
  ],
  'Table of the options of the President on a bill: an ordinary bill may be assented to or returned once and if passed again assent must follow; a money bill cannot be returned; no time limit is set, giving rise to the pocket veto',
);
const vJoint = flow('LR', ['An ordinary bill passes one House', 'The other House rejects it, disagrees on changes, or delays it', 'A joint sitting is called (Article 108)', 'The Speaker presides; a majority of those present and voting decides'], 'Flow of a joint sitting: an ordinary bill passes one House; the other House rejects it, disagrees on changes or delays it for over six months; a joint sitting is called under Article 108; the Speaker presides and a majority of those present and voting decides', 'The joint sitting');
const vDeadlockEx = table(
  ['Question about the imagined Coastal Fisheries Bill', 'Answer'],
  [
    ['Is it a money bill?', 'No; it regulates fishing seasons and does not deal only with taxes or spending'],
    ['What did the Rajya Sabha do?', 'Rejected it after the Lok Sabha passed it'],
    ['Is a joint sitting possible?', 'Yes, for an ordinary bill, under Article 108'],
    ['Who presides and who decides?', 'The Speaker; a majority of members present and voting'],
  ],
  'Worked example table on the imagined Coastal Fisheries Bill: it is not a money bill; the Rajya Sabha rejected it; a joint sitting is possible under Article 108; the Speaker presides and a majority of members present and voting decides',
  'Money bills cannot go to a joint sitting.',
);
const vDebate = table(
  ['Instrument', 'What it is'],
  [
    ['Question Hour', 'The first hour of a sitting; members question ministers'],
    ['Zero Hour', 'A practice, not in the rules as such: urgent matters raised without notice'],
    ['Calling attention', 'A member draws a minister\'s attention to a matter of urgent public importance'],
    ['Adjournment motion', 'Sets aside the day\'s business to discuss an urgent public matter (Lok Sabha)'],
  ],
  'Table of the instruments of debate: Question Hour in the first hour of a sitting; Zero Hour, a practice and not in the rules as such, for urgent matters without notice; calling attention to a matter of urgent public importance; and the adjournment motion to set aside the business of the day, in the Lok Sabha',
);
const vBudget = flow('LR', ['The budget is presented in the Lok Sabha', 'The Lok Sabha debates and votes on the demands for grants', 'Money is spent as Parliament allowed', 'The Comptroller and Auditor General audits the accounts', 'The Public Accounts Committee examines the reports'], 'Flow of financial control: the budget is presented in the Lok Sabha; the Lok Sabha debates and votes on demands for grants; money is spent as Parliament allowed; the Comptroller and Auditor General audits the accounts; and the Public Accounts Committee examines the reports', 'Financial control');
const vCommittees = table(
  ['Kind', 'Examples and features'],
  [
    ['Standing committees', 'Permanent; for example the Public Accounts Committee'],
    ['Department-related standing committees', 'Begun in 1993; follow groups of ministries and their budgets'],
    ['Joint parliamentary committees', 'Ad hoc; members of both Houses; formed for a particular bill or matter'],
  ],
  'Table of the kinds of parliamentary committee: standing committees that are permanent such as the Public Accounts Committee; department-related standing committees begun in 1993 that follow groups of ministries; and ad hoc joint parliamentary committees of both Houses for a particular bill or matter',
);
const vWhyCom = table(
  ['Why committees matter', 'Explanation'],
  [
    ['Detail', 'A small group can study clauses that the full House has no time for'],
    ['Experts', 'They can hear experts and groups affected by a bill'],
    ['Cooperation', 'Members of different parties often work together there'],
    ['Continuity', 'They scrutinise the executive through the year'],
  ],
  'Table of why committees matter: detailed study, hearing experts, cooperation among members of different parties, and scrutiny of the executive through the year',
);
const vSelfReg = table(
  ['Who', 'Role in regulating Parliament'],
  [
    ['Speaker', 'Presides over the Lok Sabha; keeps order and discipline; certifies money bills'],
    ['Chairman', 'The Vice-President presides over the Rajya Sabha and keeps order'],
    ['Presiding officer', 'Also decides cases of disqualification for defection'],
  ],
  'Table of how Parliament regulates itself: the Speaker presides over the Lok Sabha, keeps order and certifies money bills; the Chairman, who is the Vice-President, presides over the Rajya Sabha; the presiding officer also decides cases of disqualification for defection',
);
const vDefect = flow('LR', ['1985: the 52nd Amendment adds the Tenth Schedule', 'A member who leaves the party or disobeys the whip may be disqualified', 'The presiding officer decides', '2003: the 91st Amendment removes the split exception'], 'Flow of the anti-defection law: in 1985 the 52nd Amendment adds the Tenth Schedule; a member who leaves the party or disobeys the whip may be disqualified; the presiding officer decides; and in 2003 the 91st Amendment removes the split exception', 'The anti-defection law');
const vDecline = table(
  ['Some argue', 'Others argue'],
  [
    ['Parliament meets for fewer days than in earlier decades', 'Committees study many bills and budgets in detail'],
    ['Disruptions waste time and limit debate', 'Parliament still approves the budget and can remove a government'],
    ['Bills may pass with limited discussion', 'Questions and debates keep ministers accountable'],
  ],
  'Table of views on whether the role of Parliament has declined: some argue it meets for fewer days, disruptions waste time and bills may pass with limited discussion; others argue committees study bills in detail, Parliament still approves the budget and can remove a government, and questions and debates keep ministers accountable',
);
const vSum2 = table(
  ['Topic', 'Key points'],
  [
    ['Bills', 'Government and private member\'s; ordinary and money'],
    ['Passage', 'Three readings, other House, assent'],
    ['Deadlock', 'Joint sitting (Article 108); Speaker presides; none for a money bill'],
    ['Control', 'Questions, budget, Public Accounts Committee, no confidence'],
    ['Committees and discipline', 'Standing and joint committees; Tenth Schedule (1985), split removed (2003)'],
  ],
  'Summary table of Part 2: kinds of bills, passage of a bill, joint sitting, instruments of control, committees and the anti-defection law',
);
const vTips2 = table(
  ['Common mistake', 'Write instead'],
  [
    ['A joint sitting settles money bills too', 'It settles ordinary bills; a money bill has none'],
    ['Zero Hour is in the Constitution', 'It is a practice, not in the rules as such'],
    ['The 91st Amendment introduced the anti-defection law', 'The 52nd (1985) did; the 91st (2003) removed the split exception'],
  ],
  'Table of common mistakes in Part 2 and what to write instead',
);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Legislature, Part 1: Parliament, the Lok Sabha and the Rajya Sabha',
  goals: [
    'Explain why a country needs a parliament and why India has two Houses',
    'Describe the composition, election and term of the Rajya Sabha',
    'Describe the composition, election and term of the Lok Sabha',
    'Compare the powers of the two Houses, including money bills',
  ],
  slides: [
    sl('title', 'Parliament: The Two Houses', {
      b: 'Part 1: why we need a **parliament**, the **Rajya Sabha**, the **Lok Sabha** and their **powers**.',
      v: flow('LR', ['Why a parliament', 'Why two Houses', 'Rajya Sabha', 'Lok Sabha', 'Powers of the Houses'], 'Route map of Part 1: why a parliament, why two Houses, the Rajya Sabha, the Lok Sabha, and the powers of the Houses', 'Part 1 at a glance'),
      n: 'A country with millions of people cannot make every law by a vote of all citizens. It needs a body that speaks for them. In this part we study the Parliament of India, why it has two Houses, how each House is chosen, and what powers each one holds.',
    }),
    sl('concept', 'Why do we need a parliament?', {
      v: vFunctions,
      n: 'A parliament has four main tasks. It makes laws. It represents the people and the States. It controls the executive by questioning ministers and by being able to remove a government that loses support. And it is a forum for open debate on public issues. All four tasks matter in a democracy.',
    }),
    sl('concept', 'Why two Houses?', {
      v: vWhyTwo,
      n: 'Many federal countries have two Houses. One House speaks for the people and the other for the units of the federation. A second House also lets every bill be studied twice, which checks hasty decisions. Most States of India have one House, and only six have a Legislative Council, as of two thousand twenty four.',
    }),
    sl('diagram', 'The two Houses compared', {
      v: vCompare,
      n: 'This chart compares the two Houses. The Rajya Sabha represents the States, has at most two hundred fifty members, and is chosen indirectly. The Lok Sabha represents the people and is chosen directly. The Rajya Sabha members serve six years and one third retire every second year. The Lok Sabha serves five years unless it is dissolved earlier.',
    }),
    sl('concept', 'The Rajya Sabha: composition and election', {
      v: vRSComp,
      n: 'The Rajya Sabha represents the States. It has at most two hundred fifty members, of whom two hundred thirty eight are elected and twelve are nominated by the President for distinction in art, literature, science and social service. The elected members are chosen by the elected members of the State Legislative Assemblies, by the single transferable vote.',
    }),
    sl('example', 'Worked example 1: who votes for Dr Mehra?', {
      b: 'A Rajya Sabha seat from the imagined State of Palmora falls vacant. Trace how it is filled.',
      bl: ['The voters are **Assembly members**', 'The method is **single transferable vote**'],
      v: vRSEx,
      n: 'Imagine that a Rajya Sabha seat from the State of Palmora falls vacant. Several candidates stand. The voters are not the public but only the elected members of the Palmora Legislative Assembly. They vote in order of preference, by the single transferable vote, and the candidate who reaches the quota of votes is declared elected.',
    }),
    sl('check', 'Quick check: nominated members', {
      b: 'How many Rajya Sabha members can the President nominate, and for what?',
      chk: 'm_rs_max',
      n: 'Think about the two numbers in the maximum strength.',
    }),
    sl('diagram', 'A permanent House', {
      v: vBatches,
      n: 'The Rajya Sabha is called a permanent House. It is never dissolved as a whole. Members serve six years, and about one third of them retire every second year. In this imagined cycle the batch elected in two thousand twenty six retires in two thousand thirty two. New members join as others retire, so the House always has sitting members.',
    }),
    sl('concept', 'Unequal representation', {
      v: vUnequal,
      n: 'Seats in the Rajya Sabha are allotted to the States broadly by population, so larger States have more seats. This differs from the Senate of the United States, where every State has two seats. It also differs from the imagined Rhenia, where every province has three. Some argue that equal seats protect small units, while others argue that population should count.',
    }),
    sl('concept', 'The Lok Sabha: composition and term', {
      v: vLSComp,
      n: 'The Lok Sabha is directly elected by first past the post. As of two thousand twenty four, the Constitution allows up to five hundred fifty elected members, and there are five hundred forty three constituencies. The nomination of two Anglo-Indian members ended with the one hundred fourth Amendment, passed in two thousand nineteen. The term is five years, unless the House is dissolved earlier.',
    }),
    sl('check', 'Quick check: dissolution', {
      b: 'The Lok Sabha is dissolved in the third year. What happens to the Rajya Sabha?',
      chk: 'm_ls_dissolve',
      n: 'Recall which House can be dissolved.',
    }),
    sl('concept', 'Powers shared by both Houses', {
      v: vCommon,
      n: 'Both Houses have equal powers in many matters. A bill must pass both Houses to become an ordinary law. Constitutional amendments must pass both by a special majority. The elected members of both Houses take part in electing the President, and all members of both Houses vote for the Vice-President.',
    }),
    sl('diagram', 'Money bills: the Lok Sabha leads', {
      v: vMoney,
      n: 'A money bill deals with taxes, borrowing and spending. It can be introduced only in the Lok Sabha, and the Speaker certifies whether a bill is a money bill. After the Lok Sabha passes it, the Rajya Sabha has only fourteen days. It may return the bill with suggestions, but the Lok Sabha may accept or reject them. If the Rajya Sabha does nothing, the bill is deemed passed.',
    }),
    sl('example', 'Worked example 2: a money bill in practice', {
      b: 'Follow the imagined Coastal Levy Bill, a tax on dried fish exports, through the two Houses.',
      bl: ['The Lok Sabha **decides** a money bill', 'The Rajya Sabha can only **delay** it'],
      v: vLevyEx,
      n: 'Take the imagined Coastal Levy Bill. The Speaker certifies it as a money bill, and the Lok Sabha passes it. The Rajya Sabha debates it and returns it with two suggestions. The Lok Sabha rejects both. The bill then goes on in the form the Lok Sabha passed, since on a money bill the Lok Sabha has the last word.',
    }),
    sl('check', 'Quick check: where does it begin?', {
      b: 'In which House can a money bill be introduced?',
      chk: 'm_money_origin',
      n: 'Think about the House that is directly elected.',
    }),
    sl('concept', 'Special powers of the Rajya Sabha', {
      v: vRSSpecial,
      n: 'The Rajya Sabha has special powers because it represents the States. Under Article two forty nine, if two thirds of the members present and voting pass a resolution in the national interest, Parliament may make a law on a State List subject. Under Article three twelve, a similar resolution lets Parliament create a new All India Service.',
    }),
    sl('check', 'Quick check: no confidence', {
      b: 'Can the Rajya Sabha pass a no-confidence motion against the Council of Ministers?',
      chk: 'm_noconf_rs',
      n: 'Recall to which House the Council of Ministers answers.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSum1,
      n: 'To sum up. Parliament makes laws, represents, controls the executive and debates. India has two Houses so that both the people and the States are heard. The Rajya Sabha has at most two hundred fifty members and serves six years. The Lok Sabha is directly elected for five years. The Lok Sabha leads on money bills and no confidence, while the Rajya Sabha has special powers under two Articles.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['Say **indirectly elected** for the Rajya Sabha', 'Give **238 + 12** for the Rajya Sabha and **543** for the Lok Sabha, with the date', 'Remember **14 days** for a money bill', 'Support each point with an example'],
      v: vTips1,
      n: 'A few tips. Say that the Rajya Sabha is indirectly elected. Give the numbers with the date as of two thousand twenty four. Remember fourteen days for a money bill. Remember that only the Lok Sabha can pass a no confidence motion. And in longer answers, support each point with a short example.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Legislature, Part 2: Law-making, Control of the Executive and Committees',
  goals: [
    'Trace the passage of an ordinary bill and the role of the President',
    'Explain the joint sitting and the special procedure for money bills',
    'Describe the instruments by which Parliament controls the executive',
    'Explain parliamentary committees, the anti-defection law and the debate on the role of Parliament',
  ],
  slides: [
    sl('title', 'Law-making and Control', {
      b: 'Part 2: how a **bill** becomes a **law**, how Parliament **controls** the executive, and how it regulates itself.',
      v: flow('LR', ['Kinds of bills', 'Passage of a bill', 'Joint sitting', 'Control instruments', 'Committees and discipline'], 'Route map of Part 2: kinds of bills, passage of a bill, joint sitting, control instruments, and committees and discipline', 'Part 2 at a glance'),
      n: 'A law begins as a bill, and a government that makes laws must also answer for how it works. In this part we follow a bill through Parliament, look at the tools by which Parliament holds the executive to account, and see how Parliament keeps its own house in order.',
    }),
    sl('concept', 'Kinds of bills', {
      v: vKinds,
      n: 'A government bill is brought by a minister and carries the policy of the government. A private member bill is brought by a member who is not a minister, and is rarely passed. An ordinary bill may start in either House. A money bill, under Article one ten, concerns taxes, borrowing and spending and starts only in the Lok Sabha.',
    }),
    sl('diagram', 'How a bill becomes a law', {
      v: vBill,
      n: 'This flowchart shows the path of an ordinary bill. It is introduced, debated and voted on in the first House. Then the same stages are repeated in the other House. After both Houses pass it, the President gives assent, and the bill becomes an Act. If the Houses disagree, a joint sitting may be called.',
    }),
    sl('concept', 'The readings in detail', {
      v: vStages,
      n: 'At the first reading the bill is introduced and its aim is stated. At the second reading the principles and the clauses are debated, and the House may send the bill to a committee. Then the clauses are taken one by one, and amendments are considered. At the third reading the House takes the final vote on the whole bill.',
    }),
    sl('example', 'Worked example 1: the Village Libraries Bill', {
      b: 'Trace the imagined Village Libraries Bill from introduction to assent.',
      bl: ['Check **both Houses** pass it', 'The **President** gives assent last'],
      v: vLibEx,
      n: 'Follow the imagined Village Libraries Bill. A minister introduces it in the Lok Sabha and states its aim. At the second reading members debate it, and a committee studies the clauses and reports. The Lok Sabha votes and passes it. The Rajya Sabha takes it through the same stages. Finally the President signs, and it becomes law.',
    }),
    sl('check', 'Quick check: which stage?', {
      b: 'A minister introduces a bill and states its aim, and no debate on the clauses follows. Which stage is this?',
      chk: 'm_first',
      n: 'Think about the first of the three readings.',
    }),
    sl('concept', 'The President and assent', {
      v: vAssent,
      n: 'After both Houses pass a bill, it goes to the President. On an ordinary bill the President may give assent, or return it once for reconsideration. If Parliament passes it again, the President must give assent. A money bill cannot be returned. Because no time limit is set, delay in assent has been called the pocket veto.',
    }),
    sl('diagram', 'The joint sitting', {
      v: vJoint,
      n: 'If the two Houses cannot agree on an ordinary bill, a joint sitting may be called under Article one oh eight. This can happen if one House rejects the bill, if they disagree on changes, or if more than six months pass without the other House acting. The Speaker presides, and a majority of members present and voting decides. Since the Lok Sabha is larger, its view is likely to prevail.',
    }),
    sl('example', 'Worked example 2: a deadlock', {
      b: 'The Lok Sabha passes the imagined Coastal Fisheries Bill and the Rajya Sabha rejects it. What can be done?',
      bl: ['First ask: is it a **money bill**?', 'If not, a **joint sitting** is possible'],
      v: vDeadlockEx,
      n: 'The imagined Coastal Fisheries Bill regulates fishing seasons. It is not a money bill, since it does not deal only with taxes or spending. The Lok Sabha passed it and the Rajya Sabha rejected it. So a joint sitting is possible under Article one oh eight. The Speaker presides, and a majority of members present and voting decides.',
    }),
    sl('check', 'Quick check: a money bill returned', {
      b: 'The Lok Sabha rejects every suggestion that the Rajya Sabha makes on a money bill. What happens next?',
      chk: 'm_joint_money',
      n: 'Recall whether money bills have a joint sitting.',
    }),
    sl('diagram', 'Control over the executive', {
      v: vControl,
      n: 'In a parliamentary system the government must answer to the legislature. This chart shows the main tools. Members debate and question ministers, approve or refuse bills, vote on the budget, examine spending through the Public Accounts Committee, study the work of ministries in committees, and the Lok Sabha can pass a motion of no confidence.',
    }),
    sl('concept', 'Question Hour, Zero Hour and more', {
      v: vDebate,
      n: 'Question Hour is the first hour of a sitting, in which members question ministers. Zero Hour follows it. It is a practice and is not in the rules as such, and members use it to raise urgent matters without notice. Calling attention draws a minister to a matter of urgent public importance. An adjournment motion, in the Lok Sabha, sets aside the day business to discuss such a matter.',
    }),
    sl('check', 'Quick check: name the hour', {
      b: 'In the first hour, a member asks a minister about unused cold-storage units and the minister replies. What is this part of the day called?',
      chk: 'm_qhour',
      n: 'Think about questions put to ministers.',
    }),
    sl('diagram', 'Financial control', {
      v: vBudget,
      n: 'The executive cannot spend money without the approval of Parliament. The budget is presented in the Lok Sabha, which debates and votes on the demands for grants. The Rajya Sabha may discuss the budget but does not vote on the grants. Afterwards the Comptroller and Auditor General audits the accounts, and the Public Accounts Committee examines the reports.',
    }),
    sl('concept', 'Parliamentary committees', {
      v: vCommittees,
      n: 'Parliament works through committees. Standing committees are permanent, and include the Public Accounts Committee. The department related standing committees, begun in nineteen ninety three, follow groups of ministries and their budgets. Joint parliamentary committees are ad hoc. They have members of both Houses and are formed for a particular bill or matter.',
    }),
    sl('concept', 'Why committees matter', {
      v: vWhyCom,
      n: 'The full House has little time, and so committees matter. A small group can study the clauses of a bill in detail. It can hear experts and groups who are affected. Members of different parties often cooperate there. And committees scrutinise the executive through the year, and not only when the House is sitting.',
    }),
    sl('concept', 'Parliament regulating itself', {
      v: vSelfReg,
      n: 'Parliament also keeps order in its own work. The Speaker presides over the Lok Sabha, keeps order and discipline, and certifies money bills. The Vice-President is the Chairman of the Rajya Sabha and keeps order there. The presiding officer also decides cases of disqualification under the anti defection law.',
    }),
    sl('diagram', 'The anti-defection law', {
      v: vDefect,
      n: 'The fifty second Amendment of nineteen eighty five added the Tenth Schedule. A member who leaves the party, or who disobeys the party whip without permission and is not forgiven, may be disqualified, and the presiding officer decides. The ninety first Amendment of two thousand three removed the exception for a split, leaving only a merger agreed by two thirds.',
    }),
    sl('check', 'Quick check: the split exception', {
      b: 'Which Amendment removed the exception that let one-third of a party\'s legislators split away?',
      chk: 'm_split',
      n: 'Recall the Amendment of two thousand three.',
    }),
    sl('concept', 'Has Parliament declined?', {
      v: vDecline,
      n: 'People hold different views. Some argue that Parliament meets for fewer days than in earlier decades, that disruptions waste time, and that bills may pass with limited discussion. Others argue that committees study many bills in detail, that Parliament still approves the budget and can remove a government, and that questions keep ministers accountable. Students should weigh the reasons.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSum2,
      n: 'To sum up. Bills may be government or private, ordinary or money. An ordinary bill passes three readings in each House and then gets assent. A joint sitting settles a deadlock on an ordinary bill, but not on a money bill. Parliament controls the executive by questions, the budget, committees and no confidence. The anti defection law dates from nineteen eighty five.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['Name the **three readings** in order', '**Article 108** is for ordinary bills only', 'Zero Hour is a **practice**', 'Use **some argue, others argue** for the decline debate'],
      v: vTips2,
      n: 'A few tips. Name the three readings in order. Remember that Article one oh eight applies to ordinary bills only. Say that Zero Hour is a practice. Give the years nineteen eighty five and two thousand three for the anti defection law. And for the debate on Parliament, give both views with the words some argue and others argue.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Legislature: Notes',
  sections: [
    {
      h: '1. Why a parliament, and why two Houses',
      t: 1,
      b: 'A **legislature** is the organ of government that makes laws. In India it is **Parliament**. Its tasks are **law-making**, **representation** of the people and the States, **control of the executive** and **debate** on public issues.\n\nIndia has a **bicameral** Parliament: the **Lok Sabha** speaks for the people and the **Rajya Sabha** for the States. A second House also allows **reconsideration** of a bill. Most States have a single House, the Legislative Assembly; only **six** have a Legislative Council (as of 2024).',
      terms: [
        ['Legislature', 'The organ of government that makes laws and keeps watch over the executive.'],
        ['Bicameral', 'Having two Houses in the legislature.'],
        ['Federation', 'A system in which power is divided between a Union government and the governments of its units, the States.'],
      ],
      v: vFunctions,
      vs: [vWhyTwo],
    },
    {
      h: '2. The Rajya Sabha',
      t: 1,
      b: 'The **Rajya Sabha** represents the **States**. It has at most **250** members: up to **238 elected** and **12 nominated** by the President for distinction in art, literature, science and social service. (As of 2024 the House has 245 members, of whom 233 are elected, with seats also for Delhi and Puducherry.)\n\nThe elected members are chosen **indirectly** by the elected members of the State Legislative Assemblies, by **proportional representation by the single transferable vote**. Seats are allotted broadly by **population**, so representation is **unequal**, unlike the US Senate.\n\nThe term is **six years**. The House is **permanent**: it is not dissolved, and about **one-third** of members retire every **second year**. The minimum age is **30**. The Vice-President is its ex officio Chairman.',
      terms: [
        ['Rajya Sabha', 'The Council of States: the House of Parliament that represents the States and is a permanent House.'],
        ['Single transferable vote', 'A system of proportional representation in which voters rank candidates and a candidate is elected on reaching a quota.'],
        ['Nominated member', 'A member appointed by the President, not elected.'],
        ['Permanent House', 'A House that is never dissolved as a whole, because its members retire in batches.'],
      ],
      v: vCompare,
      vs: [vBatches],
    },
    {
      h: '3. The Lok Sabha and the powers of the Houses',
      t: 1,
      b: 'The **Lok Sabha** represents the **people** and is **directly elected** by first past the post. The Constitution allows up to **550** elected members; there are **543** constituencies (as of 2024). The nomination of two Anglo-Indian members ended with the **104th Amendment** (passed 2019, in effect 2020). The term is **five years**, unless the House is **dissolved** earlier. The minimum age is **25**. The Speaker presides.\n\n**Shared powers:** both Houses pass **ordinary bills** and **constitutional amendments**, and take part in electing the **President** and the **Vice-President**.\n\n**Lok Sabha:** **money bills** start only here; the Rajya Sabha can only **delay a money bill for 14 days**; the **Speaker certifies** a money bill; only the Lok Sabha can pass a **no-confidence motion**; it votes on the **demands for grants**.\n\n**Rajya Sabha:** under **Article 249**, a resolution by two-thirds of members present and voting lets Parliament make a law on a **State List** subject in the national interest; under **Article 312**, it can authorise a **new All India Service**.',
      terms: [
        ['Lok Sabha', 'The House of the People: the directly elected House of Parliament, to which the Council of Ministers is responsible.'],
        ['Dissolution', 'The ending of the Lok Sabha before or at the end of its term, so that fresh elections are held.'],
        ['Money bill', 'A bill dealing only with matters such as taxes, borrowing and spending, introduced only in the Lok Sabha (Article 110).'],
        ['No-confidence motion', 'A motion that, if passed by the Lok Sabha, shows the government has lost its support and must resign.'],
      ],
      v: vMoney,
      vs: [vLSComp, vRSSpecial],
    },
    {
      h: '4. How a bill becomes a law',
      t: 2,
      b: 'A **government bill** is introduced by a **minister**; a **private member\'s bill** by a member who is not a minister, and it is rarely passed.\n\nAn **ordinary bill** goes through: **introduction and first reading**; **second reading**, with possible reference to a **committee**; **consideration** and voting, then the **third reading**; the **same stages in the other House**; and the **assent of the President**. The President may return an ordinary bill **once**; if it is passed again, assent must follow. A money bill cannot be returned.\n\nIf the Houses disagree on an ordinary bill, a **joint sitting** may be called (**Article 108**), presided over by the **Speaker**; the bill is decided by a majority of members present and voting. A **money bill** (**Article 110**) follows special rules and has **no joint sitting**.',
      terms: [
        ['Bill', 'A proposed law placed before the legislature.'],
        ['Private member\'s bill', 'A bill introduced by a member who is not a minister.'],
        ['Joint sitting', 'A meeting of both Houses together, called to settle a disagreement on an ordinary bill (Article 108).'],
        ['Assent', 'The President\'s approval that turns a bill passed by Parliament into an Act.'],
      ],
      v: vBill,
      vs: [vJoint, vAssent],
    },
    {
      h: '5. Control over the executive',
      t: 2,
      b: 'In a parliamentary system the executive is **answerable** to the legislature. The instruments are:\n- **Deliberation and discussion:** **Question Hour** (the first hour of a sitting), **Zero Hour** (a practice, not in the rules as such, for urgent matters without notice), **calling attention**, and the **adjournment motion**.\n- **Approval or refusal** of laws.\n- **Financial control:** the **budget** and **demands for grants** (voted only in the Lok Sabha); the **Comptroller and Auditor General** audits accounts and reports to Parliament; the **Public Accounts Committee** examines these reports.\n- A **no-confidence motion** in the Lok Sabha.',
      terms: [
        ['Question Hour', 'The first hour of a sitting, in which members question ministers.'],
        ['Zero Hour', 'The practice of raising urgent matters without prior notice, soon after Question Hour.'],
        ['Adjournment motion', 'A motion to set aside the business of the day to discuss a definite matter of urgent public importance.'],
        ['Comptroller and Auditor General', 'The authority that audits government accounts and reports to Parliament.'],
      ],
      v: vControl,
      vs: [vDebate, vBudget],
    },
    {
      h: '6. Committees and Parliament regulating itself',
      t: 2,
      b: '**Standing committees** are permanent (for example the **Public Accounts Committee**) and include the **department-related standing committees**, begun in **1993**. **Joint parliamentary committees** are **ad hoc**, formed for a particular bill or matter, with members of both Houses. Committees matter because they study subjects **in detail**, hear **experts**, foster cooperation across parties and scrutinise the executive **through the year**.\n\nThe **Speaker** (Lok Sabha) and the **Chairman** (Rajya Sabha) **maintain order and discipline**. The **anti-defection law**: the **52nd Amendment (1985)** added the **Tenth Schedule**; a member who **leaves the party** or **disobeys its whip** without permission, and is not forgiven within fifteen days, can be **disqualified**; the **presiding officer decides**. The **91st Amendment (2003)** removed the **split** exception; a **merger** agreed by two-thirds is protected.\n\nSome argue that the role of Parliament has **declined** (fewer sitting days, disruptions); others point to the work of **committees**.',
      terms: [
        ['Standing committee', 'A permanent parliamentary committee, such as the Public Accounts Committee.'],
        ['Joint parliamentary committee', 'An ad hoc committee with members of both Houses, set up for a particular bill or matter.'],
        ['Whip', 'A direction by a party to its members on how to vote in the House.'],
        ['Defection', 'Leaving the party for which a member was elected, or going against its whip, in a way the Tenth Schedule treats as grounds for disqualification.'],
      ],
      v: vCommittees,
      vs: [vDefect, vDecline],
    },
  ],
  tips: '**Common mistakes**\n- Saying the Rajya Sabha is elected by all voters: it is chosen by the elected members of State Assemblies.\n- Saying the Rajya Sabha can reject a money bill: it can only delay it for 14 days.\n- Saying either House can pass a no-confidence motion: only the Lok Sabha.\n- Using a joint sitting for a money bill: it is for ordinary bills only.\n- Calling Zero Hour a rule of the Constitution: it is a practice.\n- Crediting the 91st Amendment with starting the anti-defection law: the 52nd (1985) did.\n\n**Tips:** state the date with any figure that can change ("as of 2024"); name the three readings in order; use some argue, others argue on the decline of Parliament; give an example from an imagined bill in longer answers.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['What is a **legislature**?', 'The organ of government that makes laws and keeps watch over the executive.', 'definition', 1],
  ['Four functions of Parliament', 'Law-making, representation, control of the executive and debate.', 'concept', 1],
  ['What does **bicameral** mean?', 'Having two Houses in the legislature.', 'definition', 1],
  ['Why does India have two Houses?', 'To represent the people and the States, and to allow reconsideration of bills.', 'concept', 1],
  ['How many States have a Legislative Council (as of 2024)?', 'Six; most States have only the Legislative Assembly.', 'fact', 1],
  ['What does the **Rajya Sabha** represent?', 'The States.', 'fact', 1],
  ['Maximum strength of the Rajya Sabha', '250: at most 238 elected and 12 nominated by the President.', 'fact', 1],
  ['Who are the nominated members of the Rajya Sabha?', 'Twelve persons with distinction in art, literature, science and social service.', 'fact', 1],
  ['How are Rajya Sabha members elected?', 'Indirectly, by the elected members of State Assemblies, by single transferable vote.', 'fact', 1],
  ['Term of the Rajya Sabha', 'Six years; a permanent House; about one-third retire every second year.', 'fact', 1],
  ['How is the Rajya Sabha\'s representation different from the US Senate?', 'Seats are allotted broadly by population, so unequal; the Senate has two for every State.', 'concept', 1],
  ['Who is the Chairman of the Rajya Sabha?', 'The Vice-President, ex officio.', 'fact', 1],
  ['How is the Lok Sabha elected?', 'Directly, by first past the post.', 'fact', 1],
  ['Lok Sabha: maximum and actual size (as of 2024)', 'Up to 550 elected members allowed; 543 constituencies.', 'fact', 1],
  ['What ended nomination to the Lok Sabha?', 'The 104th Amendment (passed 2019, in effect 2020) ended two Anglo-Indian nominated seats.', 'fact', 1],
  ['Term of the Lok Sabha', 'Five years, unless dissolved earlier.', 'fact', 1],
  ['Powers shared by both Houses', 'Ordinary bills; constitutional amendments; election of the President and Vice-President.', 'concept', 1],
  ['What is a **money bill**?', 'A bill dealing with taxes, borrowing and spending; introduced only in the Lok Sabha (Article 110).', 'definition', 1],
  ['What can the Rajya Sabha do on a money bill?', 'Only delay it for 14 days or return it with suggestions.', 'fact', 1],
  ['Who certifies a money bill?', 'The Speaker of the Lok Sabha.', 'fact', 1],
  ['Who can pass a **no-confidence motion**?', 'Only the Lok Sabha, which can force the Council of Ministers to resign.', 'fact', 1],
  ['Article 249', 'Rajya Sabha, by two-thirds, authorises Parliament to make a law on a State List subject in the national interest.', 'fact', 1],
  ['Article 312', 'Rajya Sabha, by two-thirds, authorises a new All India Service.', 'fact', 1],
  ['Stages of an ordinary bill', 'First reading, second reading (possible committee), consideration and third reading; other House; assent.', 'concept', 2],
  ['Government bill versus private member\'s bill', 'Introduced by a minister versus by a non-minister, who rarely sees it passed.', 'concept', 2],
  ['What is a **joint sitting**?', 'Both Houses meeting together under Article 108 to settle a disagreement on an ordinary bill; the Speaker presides.', 'definition', 2],
  ['Is there a joint sitting for a money bill?', 'No; the Lok Sabha view prevails.', 'fact', 2],
  ['**Question Hour** and **Zero Hour**', 'Question Hour: questions to ministers in the first hour. Zero Hour: a practice of raising urgent matters without notice.', 'concept', 2],
  ['What is an **adjournment motion**?', 'A motion to set aside the day\'s business to discuss a definite matter of urgent public importance.', 'definition', 2],
  ['Role of the Comptroller and Auditor General and the Public Accounts Committee', 'The auditor audits accounts and reports; the committee examines the reports on spending.', 'concept', 2],
  ['Standing and joint parliamentary committees', 'Standing: permanent, including department-related committees (1993). Joint: ad hoc, both Houses.', 'concept', 2],
  ['Why do committees matter?', 'Detailed study, experts, cooperation across parties, scrutiny through the year.', 'concept', 2],
  ['Anti-defection law', '52nd Amendment (1985), Tenth Schedule: a member who leaves the party or defies the whip can be disqualified; the presiding officer decides.', 'fact', 2],
  ['What did the 91st Amendment (2003) change?', 'Removed the split exception; only a merger agreed by two-thirds is protected.', 'fact', 2],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-11-default-chapter-test-short',
  title: 'Chapter test (short): Legislature',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A: Objective (1 mark each)', instr: 'Questions 1 to 4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_rs_perm', 'm_money_14', 'm_zero', 'ar_bicam'] },
    { id: 'B', title: 'Section B: Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30 to 50 words and the 3-mark question in about 50 to 80 words.', items: ['s_rs_elect', 's_question', 's3_bill'] },
    { id: 'C', title: 'Section C: Long answer (5 marks)', instr: 'Answer any ONE of the two questions in about 80 to 120 words.', items: [{ attempt: 1, keys: ['l_houses', 'l_control'] }] },
    { id: 'D', title: 'Section D: Case-based (4 marks)', instr: 'Read the passage and answer all parts. Part (c) has an internal choice.', items: ['c_bill'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-11-default-chapter-test-long',
  title: 'Chapter test (long): Legislature',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A: Objective (1 mark each)', instr: 'Questions 1 to 10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_why', 'm_certify', 'm_249', 'm_second', 'm_joint_trigger', 'm_pac', 'm_whip', 'm_ls_size', 'ar_perm', 'ar_defect'] },
    { id: 'B', title: 'Section B: Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30 to 50 words and 3-mark questions in about 50 to 80 words. Questions 13 and 15 have an internal choice.', items: ['s_bicam', 's_terms', { attempt: 1, keys: ['s_money', 's_pac'] }, 's3_ls_special', { attempt: 1, keys: ['s3_joint', 's3_committees'] }] },
    { id: 'C', title: 'Section C: Long answer (5 marks)', instr: 'Answer question 16, and any ONE of questions 17 and 18, in about 80 to 120 words each.', items: ['l_bill', { attempt: 1, keys: ['l_powers', 'l_committees'] }] },
    { id: 'D', title: 'Section D: Case-based (4 marks each)', instr: 'Read each passage and answer all parts. Part (c) of each has an internal choice.', items: ['c_transcript', 'c_committee'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01 and t02 of cbse-11-political-science-ch05 only (Parliament, Lok Sabha and Rajya Sabha; law-making, control over the executive, committees, the anti-defection law)',
    originality: 'every passage (newspaper report, Question Hour transcript, committee report, member letter, table of sitting days) and every bill, member, party, newspaper and country other than named real ones is imagined, written by SOYL and labelled; no NCERT text, boxed source or cartoon, no Constitution text, judgment text or board item reused (D-036)',
    facts: 'stable facts only: Rajya Sabha at most 250 (238 + 12), six-year term, one-third retiring every second year; Lok Sabha up to 550 allowed and 543 constituencies (as of 2024), five years; 104th Amendment; money bill 14 days (Articles 109 and 110); Articles 108, 249 and 312; 52nd Amendment 1985 and Tenth Schedule; 91st Amendment 2003; department-related committees from 1993',
    neutrality: 'no office-holders, governments or real parties named; the decline of Parliament framed as some argue and others argue; imagined parties and countries only',
    gate: 'schema, content lint (lintExemplar) and the deterministic verify checks run clean on this chapter',
  },
});
