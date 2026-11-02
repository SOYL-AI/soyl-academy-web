// Build ICSE 9 History & Civics ch01 Our Constitution: Meaning, Adoption and Salient Features. Run from platform/:
//   npx tsx content/authored/social-science/icse-9-history-civics-ch01/src/build.mjs
import path from 'node:path';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from './lib.mjs';

setUnit('icse-9-history-civics-ch01', 'social-science');
const { GAP_DAYS, VOTE_OLD, VOTE_NEW, DUTIES_1976, DUTIES_NOW, FR_NOW } = await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- figures
const vRoute1 = flow('LR', ['Meaning and need of a constitution', 'Adoption and enforcement', 'Single citizenship', 'Universal adult franchise'], 'Route map of Part 1: the meaning and need of a constitution, adoption and enforcement, single citizenship, and universal adult franchise', 'Part 1 at a glance');
const vRoute2 = flow('LR', ['What makes a right fundamental', 'The six categories', 'Constitutional Remedies', 'Fundamental Duties'], 'Route map of Part 2: what makes a right fundamental, the six categories, Constitutional Remedies and the Fundamental Duties', 'Part 2 at a glance');

/** Timeline of the Constituent Assembly years, positions computed from the dates (months since January 1946). */
const vTimeline = (() => {
  const s = new Svg(720, 190);
  const L = 40, W = 640, SPAN = 52;
  const mo = (y, m, d) => (y - 1946) * 12 + (m - 1) + d / 31;
  const X = (t) => L + (t / SPAN) * W;
  s.arrow(L - 10, 100, L + W + 20, 100, { sw: 1.6 });
  [1946, 1947, 1948, 1949, 1950].forEach((y) => {
    s.line(X(mo(y, 1, 1)), 94, X(mo(y, 1, 1)), 106, { sw: 1.2, color: 'muted' });
    s.text(X(mo(y, 1, 1)), 120, String(y), { size: 12, muted: true });
  });
  const ev = [
    [mo(1946, 12, 9), 'First meeting, 9 Dec 1946', 'above', 'start'],
    [mo(1949, 11, 26), 'Adopted, 26 Nov 1949', 'above', 'end'],
    [mo(1950, 1, 26), 'In force, 26 Jan 1950', 'below', 'end'],
  ];
  ev.forEach(([t, label, pos, anchor]) => {
    const x = X(t);
    s.dot(x, 100, 5, 'accent');
    const y = pos === 'above' ? 56 : 156;
    s.line(x, 100, x, pos === 'above' ? y + 10 : y - 10, { sw: 1, color: 'muted' });
    s.text(x + (anchor === 'start' ? -4 : 4), y, label, { anchor, size: 13, bold: true });
  });
  return s.visual('Timeline from 1946 to 1950 with three marked events: the first meeting of the Constituent Assembly on 9 December 1946, the adoption of the Constitution on 26 November 1949 and its coming into force on 26 January 1950', 'The Assembly years (positions drawn to scale by month).');
})();
assert.ok(GAP_DAYS === 61);

const vCitizen = (() => {
  const s = new Svg(720, 230);
  s.text(180, 24, 'India', { size: 16, bold: true });
  s.rect(80, 50, 200, 60, { rx: 6, fill: 'accent', fillOpacity: 0.35, color: 'accent', sw: 1.5 });
  s.text(180, 80, 'Citizen of India', { size: 14, bold: true });
  s.text(180, 140, 'One citizenship', { size: 13, muted: true });
  s.line(360, 20, 360, 210, { sw: 1, color: 'muted', dash: true });
  s.text(540, 24, 'United States', { size: 16, bold: true });
  s.rect(440, 50, 200, 50, { rx: 6, fill: 'blue', fillOpacity: 0.35, color: 'blue', sw: 1.5 });
  s.text(540, 75, 'Citizen of the nation', { size: 14, bold: true });
  s.rect(440, 110, 200, 50, { rx: 6, fill: 'yellow', fillOpacity: 0.35, color: 'yellow', sw: 1.5 });
  s.text(540, 135, 'Citizen of a State', { size: 14, bold: true });
  s.text(540, 190, 'Dual citizenship', { size: 13, muted: true });
  return s.visual('Schematic comparison: in India a person is a citizen of India only, shown as one box; in the United States a person is a citizen of the nation and also of a State, shown as two boxes', 'Single and dual citizenship (schematic, not to scale).');
})();

const bars = ({ w = 640, h = 230, a, b, aLabel, bLabel, arrowLabel, unit, scale }) => {
  const s = new Svg(w, h);
  const base = 190;
  const bar = (x, v, label, col) => {
    const ht = v * scale;
    s.rect(x, base - ht, 120, ht, { rx: 4, fill: col, fillOpacity: 0.4, color: col, sw: 1.5 });
    s.text(x + 60, base - ht + 22, `${v} ${unit}`, { size: 14, bold: true });
    s.text(x + 60, base + 18, label, { size: 13, muted: true });
  };
  bar(120, a, aLabel, 'muted');
  bar(400, b, bLabel, 'accent');
  s.arrow(250, 100, 390, 100, { sw: 2 });
  s.text(320, 22, arrowLabel, { size: 13, bold: true });
  return s;
};
assert.equal(VOTE_OLD, 21);
assert.equal(VOTE_NEW, 18);
const vVote = bars({ a: VOTE_OLD, b: VOTE_NEW, aLabel: 'Before 1989', bLabel: 'From 1989', arrowLabel: '61st Amendment, 1988', unit: 'years', scale: 6 })
  .visual('Two bars: the voting age was 21 years before 1989 and 18 years from 1989, after the 61st Amendment passed in 1988', 'Voting age, drawn to scale (6 pixels per year).');
assert.equal(DUTIES_1976, 10);
assert.equal(DUTIES_NOW, 11);
const vDuties = bars({ a: DUTIES_1976, b: DUTIES_NOW, aLabel: 'Added in 1976', bLabel: 'Since 2002', arrowLabel: '86th Amendment, 2002', unit: 'duties', scale: 12 })
  .visual('Two bars: ten Fundamental Duties when they were added in 1976 by the 42nd Amendment, and eleven since the 86th Amendment of 2002', 'Number of Fundamental Duties, drawn to scale.');

const vSix = (() => {
  const s = new Svg(720, 250);
  const boxes = [
    ['Equality', 'Equal before the law', 'accent'],
    ['Freedom', 'Speech and expression', 'blue'],
    ['Against Exploitation', 'No forced labour', 'yellow'],
    ['Freedom of Religion', 'Practise any faith', 'accent'],
    ['Cultural and Educational', 'Minorities run schools', 'blue'],
    ['Constitutional Remedies', 'Go to court', 'yellow'],
  ];
  boxes.forEach(([name, ex, col], i) => {
    const x = 20 + (i % 3) * 235;
    const y = 30 + Math.floor(i / 3) * 105;
    s.rect(x, y, 210, 80, { rx: 8, fill: col, fillOpacity: 0.3, color: col, sw: 1.5 });
    s.text(x + 105, y + 28, name, { size: 14, bold: true });
    s.text(x + 105, y + 54, ex, { size: 12, muted: true });
  });
  assert.equal(boxes.length, FR_NOW);
  return s.visual('Six boxes naming the six categories of Fundamental Rights with a short example under each: Equality, Freedom, against Exploitation, Freedom of Religion, Cultural and Educational, and Constitutional Remedies', 'The six categories of Fundamental Rights (as of 2024).');
})();

const vWhatIs = table(['A constitution…', 'In simple words'], [
  ['sets up', 'the organs of government: who makes, carries out and judges the laws'],
  ['limits', 'the power of every office, so no ruler can do as he or she pleases'],
  ['protects', 'the rights of the people against misuse of power'],
  ['settles', 'disputes by giving all a common set of rules'],
], 'Table of four jobs of a constitution: it sets up the organs of government, limits their power, protects rights and settles disputes');
const vNeed = flow('LR', ['No written rules', 'Rulers decide everything', 'Rights are unsafe', 'A constitution is needed'], 'Flow showing why a constitution is needed: with no written rules rulers decide everything, so rights are unsafe and a constitution is needed', 'Why a country needs a constitution.');
const vAssembly = table(['Who or what', 'Role'], [
  ['Constituent Assembly', 'Framed the Constitution; first met on 9 December 1946'],
  ['Dr Rajendra Prasad', 'President of the Assembly'],
  ['Dr B. R. Ambedkar', 'Chairman of the Drafting Committee'],
  ['Drafting Committee', 'Prepared the draft that the Assembly discussed and adopted'],
], 'Table of the Constituent Assembly with its first meeting, its President, the chairman of the Drafting Committee and the work of that committee');
const vPurna = flow('LR', ['Purna Swaraj declared as the goal', '26 January 1930 observed as Independence Day', '26 January 1950: the Constitution comes into force'], 'Flow: Purna Swaraj declared as the goal, 26 January 1930 observed as Independence Day, and 26 January 1950 chosen for the Constitution to come into force', 'Why 26 January was chosen.');
const vAnswer1 = table(['Part', 'Marks', 'Points to include'], [
  ['(i)', '3', 'Definition of a constitution + two reasons'],
  ['(ii)', '3', 'President, Drafting Committee chairman, 9 December 1946'],
  ['(iii)', '4', 'Both dates + the Purna Swaraj reason'],
], 'Table planning a three-part ten-mark answer on the Constitution: part (i) three marks, part (ii) three marks, part (iii) four marks, with the points for each part');
const vSingle = table(['Question', 'Answer for India'], [
  ['Is there a State citizenship?', 'No: only one citizenship, of India'],
  ['If I move to another State?', 'My citizenship does not change'],
  ['What does it promote?', 'National unity and a common identity'],
  ['Is OCI dual citizenship?', 'No: privileges only, no vote'],
], 'Table of four questions about single citizenship and the answers for India, including that Overseas Citizenship of India is not dual citizenship');
const vMeera = flow('LR', ['Identify the system', 'Single or dual?', 'Apply to the person', 'State the conclusion'], 'Flow of the method for citizenship problems: identify the system, decide single or dual, apply it to the person and state the conclusion', 'Method for citizenship problems.');
const vFranchise = table(['', 'Limited franchise (imagined kingdom)', 'Universal adult franchise'], [
  ['Who votes', 'Only property-owning men', 'Every adult citizen'],
  ['Conditions', 'Land, tax or literacy', 'Citizenship and age only'],
  ['Value of a vote', 'Unequal', 'Equal: one adult, one vote'],
], 'Table comparing a limited franchise in an imagined kingdom with universal adult franchise: who votes, the conditions and the value of a vote');
const vRoll = table(['Name', 'Age', 'Eligible?', 'Reason'], [
  ['Kavita', '18', 'Yes', 'At the voting age'],
  ['Gopal', '52', 'Yes', 'Literacy and property do not matter'],
  ['Ravi', '17', 'No', 'Below 18'],
], 'Table applying the voting rules to three imagined people: Kavita aged 18 and Gopal aged 52 are eligible, Ravi aged 17 is not');
const vD1Sum = flow('LR', ['Constitution: basic law', 'Adopted 26 Nov 1949', 'In force 26 Jan 1950', 'Single citizenship', 'Vote at 18'], 'Summary flow of Part 1: the constitution as basic law, adopted on 26 November 1949, in force on 26 January 1950, single citizenship and the vote at 18', 'Part 1 in five steps.');
const vD1Tips = table(['Common slip', 'Correct version'], [
  ['Adopted and enforced on one day', '26 Nov 1949 and 26 Jan 1950 are two events'],
  ['India has State citizenship', 'India has single citizenship'],
  ['Voting needs education or property', 'Citizenship and age 18 only'],
], 'Table of three common slips in Part 1 and the correct version of each');
const vFund = table(['', 'Fundamental Right', 'Ordinary legal right'], [
  ['Source', 'Guaranteed by the Constitution', 'Created by a law of the legislature'],
  ['Enforcement', 'Directly in the Supreme Court or a High Court', 'Through ordinary courts under that law'],
  ['Change', 'Only by constitutional amendment', 'By ordinary law'],
], 'Table comparing a Fundamental Right with an ordinary legal right by source, enforcement and how it can be changed');
const vCatTable = table(['Category', 'Example'], [
  ['Equality', 'No discrimination on grounds of caste or sex; untouchability abolished'],
  ['Freedom', 'Speech and expression, peaceful assembly, forming associations, movement'],
  ['Against Exploitation', 'Ban on forced labour and on child labour in hazardous work'],
  ['Freedom of Religion', 'Freedom to profess, practise and spread one\'s faith'],
  ['Cultural and Educational', 'Minorities may conserve their script and run schools'],
  ['Constitutional Remedies', 'The right to move the courts to enforce the other rights'],
], 'Table of the six categories of Fundamental Rights with an example of each');
const vSort = flow('LR', ['Read the situation', 'Find the right at stake', 'Name the category', 'Give a reason'], 'Flow of the method for classifying a case: read the situation, find the right at stake, name the category and give a reason', 'Method for case questions.');
const vRemedy = flow('LR', ['A Fundamental Right is violated', 'Citizen moves the Supreme Court or a High Court', 'Court hears the case', 'Court orders the right to be enforced'], 'Flow of the Right to Constitutional Remedies: a right is violated, the citizen moves a court, the court hears the case and orders enforcement', 'Why rights are justiciable.');
const vThenNow = table(['Period', 'Categories of Fundamental Rights', 'Note'], [
  ['In 1950', 'Seven (including the right to property)', 'Original list'],
  ['Since 1978', `${FR_NOW === 6 ? 'Six' : ''} (property removed)`, '44th Amendment; as of 2024'],
], 'Table: seven categories of Fundamental Rights in 1950 including the right to property, and six since the 44th Amendment of 1978, as of 2024');
const vLimits = table(['Claim', 'Verdict'], [
  ['Rights are absolute', 'No: reasonable restrictions apply, such as public order'],
  ['Only courts can protect rights', 'No: but courts give the final remedy'],
  ['Rights apply only to adults', 'No: every person has them'],
], 'Table of three claims about Fundamental Rights and the verdict on each');
const vDutyTable = table(['Duty (in short)', 'Example'], [
  ['Respect the Constitution, flag and anthem', 'Standing for the anthem'],
  ['Cherish the ideals of the freedom struggle', 'Learning about it'],
  ['Uphold sovereignty, unity and integrity', 'Rejecting divisive acts'],
  ['Defend the country and render national service when called', 'Joining relief work when asked'],
  ['Promote harmony; give up practices that demean women', 'Treating all with respect'],
  ['Value the heritage of a composite culture', 'Protecting monuments'],
  ['Protect the environment; have compassion for living creatures', 'Planting trees'],
  ['Develop scientific temper, humanism, inquiry and reform', 'Testing claims'],
  ['Safeguard public property; give up violence', 'Not damaging a library'],
  ['Strive for excellence in individual and collective work', 'Doing a task well'],
  ['Parents and guardians to give schooling to a child of six to fourteen', 'Sending a child to school'],
], 'Table of the eleven Fundamental Duties in paraphrase with a short example of each');
const vDutyMatch = table(['Action', 'Duty fulfilled'], [
  ['Cleaning the school pond', 'Protect the environment'],
  ['Running a science club activity', 'Scientific temper'],
  ['Repairing a damaged bench in the hall', 'Safeguard public property'],
], 'Table matching three imagined actions with the duty each fulfils: cleaning a pond, a science club and repairing a bench');
const vBalance = flow('LR', ['My right', 'Others respect it', 'My duty to respect theirs', 'Rights stay safe for all'], 'Flow showing that rights and duties are two sides: my right, others respect it, my duty to respect theirs, and rights stay safe for all', 'Rights and duties go together.');
const vAnswer2 = table(['Part', 'Marks', 'Points to include'], [
  ['(i)', '3', '1976, 42nd Amendment, Swaran Singh Committee, eleven'],
  ['(ii)', '3', 'Four duties, one line each'],
  ['(iii)', '4', 'The eleventh duty (2002) + how duties complement rights'],
], 'Table planning a three-part ten-mark answer on the Fundamental Duties with marks and points for each part');
const vD2Sum = flow('LR', ['Fundamental Rights: justiciable', 'Six categories as of 2024', 'Remedies: go to court', 'Duties added 1976', 'Eleven duties since 2002'], 'Summary flow of Part 2: Fundamental Rights are justiciable, six categories as of 2024, the remedy of going to court, duties added in 1976 and eleven duties since 2002', 'Part 2 in five steps.');
const vD2Tips = table(['Common slip', 'Correct version'], [
  ['Seven Fundamental Rights today', 'Six (right to property removed, 1978)'],
  ['Duties are enforceable like rights', 'No direct court remedy for duties'],
  ['Ten duties today', 'Eleven since the 86th Amendment, 2002'],
], 'Table of three common slips in Part 2 and the correct version of each');

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Our Constitution — Part 1: Meaning, Adoption, Citizenship and Voting',
  goals: [
    'Define a constitution and explain why a country needs one',
    'State the dates of adoption and enforcement and explain why 26 January was chosen',
    'Explain single citizenship and contrast it with dual citizenship in the United States',
    'Explain universal adult franchise and the minimum voting age',
  ],
  slides: [
    sl('title', 'Our Constitution: Meaning, Adoption and Salient Features', {
      b: 'Part 1 — what a **constitution** is, when ours was **adopted** and **enforced**, and how it gives every adult one **citizenship** and one **vote**.',
      v: vRoute1,
      n: 'Every country runs on rules. In this chapter we study the rulebook of India, our Constitution. In this first part we ask what a constitution is and why a country needs one, when ours was adopted and when it came into force, why Indians have one citizenship only, and how every adult citizen gets a vote.',
    }),
    sl('concept', 'What is a constitution?', {
      b: 'A **constitution** is the **fundamental law** of a country: the basic rulebook for the government and the people.',
      v: vWhatIs,
      n: 'A constitution is the basic law of a country. It does four jobs. It sets up the organs of government, the bodies that make, carry out and judge the laws. It limits the power of each office. It protects the rights of the people. And it gives everyone a common set of rules to settle disputes.',
    }),
    sl('diagram', 'Why does a country need a constitution?', {
      b: 'Think of a game with no written rules: whoever holds the ball decides everything.',
      v: vNeed,
      n: 'Imagine a game with no written rules. The strongest player would decide everything. A country without a constitution is like that. Rulers could decide everything, and the rights of the people would be unsafe. A constitution makes the rules known to all, so that power is limited and rights are protected, and the country can stay stable.',
    }),
    sl('example', 'Worked example 1: the island of Tarangia', {
      b: 'In the imagined island state of Tarangia the ruler alone decides how long he rules and whom to punish.',
      bl: [
        'Step 1 — Spot the problem: no limits on power.',
        'Step 2 — Link to a need: a constitution must limit rulers.',
        'Step 3 — Add a second need: it must protect the rights of the people.',
        'Step 4 — Conclude: Tarangia needs a written constitution.',
      ],
      v: table(['Situation in Tarangia', 'Need of a constitution'], [['Ruler sets his own term', 'Limit the power of rulers'], ['People punished without a fair rule', 'Protect rights and give a fair process']], 'Table linking two situations in the imagined island of Tarangia to the needs of a constitution: limiting power and protecting rights'),
      n: 'Let us apply this to an imagined island called Tarangia. The ruler decides how long he stays in power and whom he will punish. First, spot the problem: nothing limits his power. Second, link it to a need: a constitution must limit rulers. Third, add that it must protect rights. So we conclude that Tarangia needs a written constitution.',
    }),
    sl('concept', 'The Constituent Assembly', {
      b: 'The **Constituent Assembly** framed our Constitution. It first met on **9 December 1946**.',
      v: vAssembly,
      n: 'The Constitution was framed by a body called the Constituent Assembly. It first met on 9 December 1946. Doctor Rajendra Prasad was its President. A Drafting Committee, chaired by Doctor Bhimrao Ambedkar, prepared the draft, which the Assembly discussed in detail over nearly three years before adopting it.',
    }),
    sl('diagram', 'From the first meeting to the Republic', {
      b: 'Adoption and enforcement are **two events** about two months apart.',
      v: vTimeline,
      n: 'Look at the timeline. The Assembly first met in December 1946. It adopted the Constitution on 26 November 1949, a day now observed as Constitution Day. But the Constitution came into force only on 26 January 1950, about two months later. Adoption means the Assembly accepted the text; enforcement means it began to apply.',
    }),
    sl('check', 'Quick check: the first meeting', {
      b: 'In which year did the Constituent Assembly first meet?',
      chk: 'm_assembly_first',
      n: 'Remember the timeline. The first meeting came before independence.',
    }),
    sl('concept', 'Why 26 January?', {
      b: 'The date **26 January 1950** was chosen to recall **26 January 1930**, observed as **Independence Day** after the call for **Purna Swaraj** (complete independence).',
      v: vPurna,
      n: 'Why did the framers wait until 26 January? In 1930 the nation had demanded Purna Swaraj, which means complete independence, and had observed 26 January as Independence Day. By bringing the Constitution into force on the same date in 1950, the framers honoured that pledge. Note that independence itself came earlier, in 1947.',
    }),
    sl('check', 'Quick check: adopted or enforced?', {
      b: 'True or false: adopted and enforced on one day.',
      chk: 'tf_adopt_enforce',
      n: 'Ask yourself whether adoption and enforcement were the same event.',
    }),
    sl('example', 'Worked example 2: planning a 10-mark answer', {
      b: 'Question: (i) What is a constitution? Give two reasons for it. [3] (ii) Name the President of the Assembly, the Drafting Committee chairman and the first meeting date. [3] (iii) Give both dates and explain 26 January. [4]',
      bl: [
        '(i) Definition + two needs.',
        '(ii) Two names with posts + 9 December 1946.',
        '(iii) 26 November 1949 and 26 January 1950 + the Purna Swaraj link.',
        'Write one clear point for every mark.',
      ],
      v: vAnswer1,
      n: 'Here is how to plan a ten mark answer in three parts. For part one, give the definition and two needs. For part two, name the President of the Assembly and the chairman of the Drafting Committee, and add the date of the first meeting. For part three, give both dates and explain the choice of 26 January. Write one clear point for every mark.',
    }),
    sl('diagram', 'Single citizenship', {
      b: 'In India every citizen is a citizen of **India only**. The United States has **dual** citizenship: the nation and a State.',
      v: vCitizen,
      n: 'India is a federation of States, yet a citizen of India belongs to the nation alone. There is no separate State citizenship. In the United States it is different. A person is a citizen of the nation and also a citizen of the State in which he or she lives. That is called dual citizenship.',
    }),
    sl('concept', 'Single citizenship builds unity', {
      bl: [
        'Same **status** wherever a citizen lives.',
        'A common **national identity** above regional identities.',
        'Easier **movement and settlement** across States.',
        'Note: Overseas Citizenship of India is **not** dual citizenship: it gives privileges but no vote.',
      ],
      v: vSingle,
      n: 'Single citizenship supports unity. A citizen has the same status in every State, so nobody is an outsider in another part of the country. It builds a common national identity above regional ones, and it makes it easy to move and settle anywhere. One more point: Overseas Citizenship of India is not dual citizenship. It gives privileges, but not the vote.',
    }),
    sl('example', 'Worked example 3: Meera moves to Gujarat', {
      b: 'Meera, born in Assam, takes a job in Gujarat. What is her citizenship?',
      bl: [
        'Step 1 — Identify the system: India.',
        'Step 2 — Single or dual? Single citizenship.',
        'Step 3 — Apply: no Assam or Gujarat citizenship exists.',
        'Step 4 — Conclude: she is a citizen of India, nothing more and nothing less.',
      ],
      v: vMeera,
      n: 'Try this method. Meera, born in Assam, takes a job in Gujarat. First identify the system: India. Second, is it single or dual? It is single. Third, apply it: there is no Assam citizenship and no Gujarat citizenship to gain or lose. So Meera is simply a citizen of India, wherever she lives.',
    }),
    sl('check', 'Quick check: put the events in order', {
      b: 'Arrange the four events in the order in which they took place.',
      chk: 'ord_timeline',
      n: 'Start from the first meeting of the Assembly and move forward to the Fundamental Duties.',
    }),
    sl('concept', 'Universal adult franchise', {
      b: '**Universal adult franchise**: every adult citizen has the right to vote, whatever their caste, religion, sex, education or wealth.',
      v: vFranchise,
      n: 'Universal adult franchise means that every adult citizen has the right to vote. It does not matter whether the person is rich or poor, educated or not, man or woman, or of any caste or religion. Compare this with an imagined kingdom in which only property owning men could vote. Here, one adult has one vote of equal value.',
    }),
    sl('diagram', 'The voting age: 21 to 18', {
      b: 'The **61st Amendment** (1988) lowered the minimum voting age from **21** to **18** years; it took effect in **1989**.',
      v: vVote,
      n: 'At first the minimum voting age was twenty one. In 1988 the sixty first Amendment lowered it to eighteen years, and the change took effect in 1989. Young adults, many of them students or first time workers, gained a voice in choosing their government. Remember, an eligible citizen must also be registered on the electoral roll.',
    }),
    sl('example', 'Worked example 4: reading a voters list', {
      b: 'An imagined voters list names Kavita (18), Gopal (52, landless, cannot read) and Ravi (17). Who is eligible?',
      bl: [
        'Step 1 — Check citizenship and age only.',
        'Step 2 — Kavita is 18: eligible.',
        'Step 3 — Gopal is an adult: eligible, since education and property do not matter.',
        'Step 4 — Ravi is 17: not yet eligible.',
      ],
      v: vRoll,
      n: 'Let us read an imagined voters list. The test is simple: citizenship and age. Kavita is eighteen, so she can vote. Gopal is fifty two. He owns no land and cannot read, but that does not matter, so he can vote. Ravi is seventeen, so he must wait until he turns eighteen.',
    }),
    sl('check', 'Quick check: which amendment?', {
      b: 'Which amendment lowered the voting age?',
      chk: 'm_vote_age_change',
      n: 'Remember the year, nineteen eighty eight, and which amendment number belongs to the voting age.',
    }),
    sl('summary', 'Summary of Part 1', {
      bl: [
        'A **constitution** sets up, limits and protects; it is needed to control power and safeguard rights.',
        '**Adopted** 26 November 1949; **in force** 26 January 1950 (Purna Swaraj link).',
        '**Single citizenship**: India only; the United States has dual citizenship.',
        '**Universal adult franchise**: every adult citizen votes; age 18 since 1989 (61st Amendment).',
      ],
      v: vD1Sum,
      n: 'To sum up. A constitution is the basic law that sets up, limits and protects. Ours was adopted on 26 November 1949 and came into force on 26 January 1950. India has single citizenship, unlike the dual citizenship of the United States. And every adult citizen has a vote, with the minimum age at eighteen since 1989.',
    }),
    sl('exam-tips', 'Exam tips for Part 1', {
      bl: [
        'Keep **adoption** (26 November 1949) apart from **enforcement** (26 January 1950).',
        'Never write that India has State citizenship.',
        'Do not add education or property conditions to the vote.',
        'Mention **Purna Swaraj** when explaining 26 January.',
        'In 3 + 3 + 4 questions give one clear point for each mark.',
      ],
      v: vD1Tips,
      n: 'Some common slips. Do not mix up adoption and enforcement; they are two events about two months apart. Never say that India has State citizenship. The vote does not depend on education or property. And when you explain why 26 January was chosen, always mention Purna Swaraj. In structured questions, write one clear point for each mark.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Our Constitution — Part 2: Fundamental Rights and Fundamental Duties',
  goals: [
    'Explain what makes a right fundamental and why such rights are justiciable',
    'Name the six categories of Fundamental Rights with an example of each',
    'State when and how the Fundamental Duties were added and list five of them',
    'Explain how duties complement rights',
  ],
  slides: [
    sl('title', 'Fundamental Rights and Fundamental Duties', {
      b: 'Part 2 — the **rights** the Constitution guarantees, how they are **enforced**, and the **duties** that go with them.',
      v: vRoute2,
      n: 'In this part we study two of the best known features of the Constitution. First, the Fundamental Rights: what makes a right fundamental, the six categories and how courts protect them. Then the Fundamental Duties: when they were added, what they ask of us, and how they go hand in hand with our rights.',
    }),
    sl('concept', 'What makes a right fundamental?', {
      b: 'A **Fundamental Right** is guaranteed by the Constitution itself and is **justiciable**: a court can enforce it.',
      v: vFund,
      n: 'A right is fundamental when the Constitution itself guarantees it. Ordinary legal rights are created by laws, and a later law can change them. Fundamental Rights can be changed only by a constitutional amendment. They are also justiciable, which means that if one is violated a citizen can go straight to the Supreme Court or a High Court.',
    }),
    sl('diagram', 'The six categories', {
      b: `There are **${FR_NOW}** categories as of 2024.`,
      v: vSix,
      n: 'There are six categories of Fundamental Rights today. They are the Right to Equality, the Right to Freedom, the Right against Exploitation, the Right to Freedom of Religion, Cultural and Educational Rights, and the Right to Constitutional Remedies. Each protects a different part of life, as you can see from the example under each name.',
    }),
    sl('diagram', 'An example for each category', {
      v: vCatTable,
      n: 'Learn one clear example for each category. Under Equality, no discrimination on grounds of caste or sex. Under Freedom, speech and expression. Under the Right against Exploitation, a ban on forced labour and on child labour in hazardous work. Under Freedom of Religion, the freedom to practise one faith. Under Cultural and Educational Rights, minorities may run schools. And the Right to Constitutional Remedies lets people go to court.',
    }),
    sl('example', 'Worked example 1: which category?', {
      b: 'In the imagined village of Barauli, children of one hamlet are not allowed to use the common well because of their caste.',
      bl: [
        'Step 1 — Read the situation: unequal treatment because of caste.',
        'Step 2 — Find the right at stake: equal treatment in public places.',
        'Step 3 — Name the category: Right to Equality.',
        'Step 4 — Give the reason: discrimination on grounds of caste is prohibited.',
      ],
      v: vSort,
      n: 'Here is a method for case questions. In the imagined village of Barauli, children of one hamlet are not allowed to use the common well because of their caste. First read the situation. Then find the right at stake, which is equal treatment. Name the category, the Right to Equality, and give the reason: discrimination on grounds of caste is not allowed.',
    }),
    sl('check', 'Quick check: match the cases', {
      b: 'Match each situation with its category.',
      chk: 'mt_fr_cases',
      n: 'For each case, find the right at stake and then name the category.',
    }),
    sl('concept', 'Right to Constitutional Remedies', {
      b: 'A citizen whose right is violated can **move the Supreme Court or a High Court**; the court can order the right to be enforced.',
      v: vRemedy,
      n: 'What good is a right if nobody can enforce it? The Right to Constitutional Remedies answers this. A citizen whose Fundamental Right is violated can move the Supreme Court or a High Court. The court hears the case and can order that the right be enforced. This is why Fundamental Rights are called justiciable.',
    }),
    sl('check', 'Quick check: the way to court', {
      b: 'Which right lets a person approach a court to enforce others?',
      chk: 'm_fr_remedies',
      n: 'Look for the right that gives the way to enforce all the others.',
    }),
    sl('concept', 'Rights have limits, and the list has changed', {
      b: 'Rights are subject to **reasonable restrictions**. The **right to property** was removed from the list by the **44th Amendment (1978)**.',
      v: vThenNow,
      n: 'Fundamental Rights are not absolute. They can be limited by reasonable restrictions, for example in the interest of public order. The list itself has also changed. The right to property was originally included, but the forty fourth Amendment of 1978 removed it. So, as of 2024, there are six categories, not seven.',
    }),
    sl('example', 'Worked example 2: is freedom unlimited?', {
      b: 'In a debate at the imagined Riverside School, Anita says her freedom of speech is absolute.',
      bl: [
        'Step 1 — State the claim: rights are absolute.',
        'Step 2 — Test it: reasonable restrictions exist.',
        'Step 3 — Give a reason: public order and the rights of others.',
        'Step 4 — Conclude: freedom is real but not unlimited.',
      ],
      v: vLimits,
      n: 'Let us test a claim. In a debate at the imagined Riverside School, Anita says her freedom of speech is absolute. Step one, state the claim. Step two, test it: the Constitution allows reasonable restrictions. Step three, give a reason, such as public order and the rights of others. So her freedom is real, but not unlimited.',
    }),
    sl('concept', 'Fundamental Duties: how they came', {
      b: 'Added in **1976** by the **42nd Amendment** on the recommendation of the **Swaran Singh Committee**; **eleven** since the **86th Amendment (2002)**.',
      v: vDuties,
      n: 'The original Constitution did not list duties. In 1976 the forty second Amendment added a list of Fundamental Duties, on the recommendation of the Swaran Singh Committee. There were ten at first. In 2002 the eighty sixth Amendment added an eleventh, so as of 2024 there are eleven.',
    }),
    sl('diagram', 'The eleven duties in short', {
      v: vDutyTable,
      n: 'Here are the eleven duties in short. Respect the Constitution, the flag and the anthem. Cherish the ideals of the freedom struggle. Uphold unity and integrity. Defend the country. Promote harmony and respect for women. Value our heritage. Protect the environment. Develop scientific temper. Safeguard public property. Strive for excellence. And the eleventh: parents and guardians give schooling to children aged six to fourteen. Learn them in your own words.',
    }),
    sl('example', 'Worked example 3: which duty?', {
      b: 'Match three imagined actions with the duty each fulfils.',
      bl: [
        'Step 1 — Read the action.',
        'Step 2 — Find the matching duty.',
        'Step 3 — Cleaning the pond protects the environment.',
        'Step 4 — A science club builds scientific temper; repairing a bench safeguards public property.',
      ],
      v: vDutyMatch,
      n: 'Apply the duties to actions. Cleaning the school pond protects the environment. Running a science club activity builds scientific temper. Repairing a damaged bench in the hall safeguards public property. For each case, read the action, find the matching duty, and say why in one line.',
    }),
    sl('check', 'Quick check: the eleventh duty', {
      b: 'What does the eleventh duty, added in 2002, concern?',
      chk: 'm_fd_eleventh',
      n: 'Remember that it came with the eighty sixth Amendment and concerns children between six and fourteen.',
    }),
    sl('concept', 'Duties complement rights', {
      b: 'My **right** is safe only if others respect it, so I have a **duty** to respect theirs. The duties have **no direct court remedy** like rights.',
      v: vBalance,
      n: 'Rights and duties are two sides of one coin. My right is safe only if other people respect it, and theirs is safe only if I respect it. So the duties remind us that rights come with responsibilities. One difference: a citizen cannot go to court to enforce a duty in the way that a right is enforced.',
    }),
    sl('check', 'Quick check: rights and duties', {
      b: 'Decide whether the reason explains the assertion.',
      chk: 'ar_rights_duties',
      n: 'Ask whether the reason explains why duties complement rights.',
    }),
    sl('example', 'Worked example 4: planning a 10-mark answer', {
      b: 'Question: (i) When and how were the duties added? How many now? [3] (ii) Four duties. [3] (iii) The eleventh duty and how duties complement rights. [4]',
      bl: [
        '(i) 1976, 42nd Amendment, Swaran Singh Committee, eleven.',
        '(ii) Four duties, one line each.',
        '(iii) The 2002 duty on education + the link with rights.',
        'Give the reason in the last part to earn the final marks.',
      ],
      v: vAnswer2,
      n: 'Here is how to plan a ten mark question on the duties. Part one needs the year, the amendment, the committee and the number. Part two asks for four duties, one line each. Part three needs the eleventh duty and an explanation of how duties complement rights. The reason in the last part earns the final marks.',
    }),
    sl('summary', 'Summary of Part 2', {
      bl: [
        'Fundamental Rights are **guaranteed** and **justiciable**; six categories as of 2024.',
        'The **Right to Constitutional Remedies** lets citizens move the courts.',
        'Rights have **reasonable restrictions**; the right to property was removed in 1978.',
        '**Duties:** 1976, 42nd Amendment, Swaran Singh Committee; eleven since 2002.',
      ],
      v: vD2Sum,
      n: 'To sum up. Fundamental Rights are guaranteed by the Constitution and enforced by courts. There are six categories as of 2024, and the right to property was removed in 1978. The Right to Constitutional Remedies takes us to court. The duties were added in 1976 and are eleven today, and they complement our rights.',
    }),
    sl('exam-tips', 'Exam tips for Part 2', {
      bl: [
        'Write **six** categories, and name the right to property as the one removed.',
        'Do not say duties are enforceable like rights.',
        'Give a **rule** or reason when you classify a case.',
        'Learn the order: 1976, 1978, 1988 (effective 1989), 2002.',
        'Paraphrase duties in your own words; do not try to copy the text.',
      ],
      v: vD2Tips,
      n: 'Watch out for these slips. There are six categories today, and the right to property is the one that was removed. Duties are not enforceable in court the way rights are. When you classify a case, always give the reason. Learn the order of the amendments, and write the duties in your own words rather than trying to copy the text.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Our Constitution: Meaning, Adoption and Salient Features — notes',
  sections: [
    {
      h: '1. Meaning and need of a constitution',
      t: 1,
      b: '- A **constitution** is the **fundamental law** of a country.\n- It **sets up** the organs of government, **limits** their powers, **protects** the rights of the people and gives common rules for settling disputes.\n- Without one, rulers could decide everything and rights would be unsafe.\n- India\'s Constitution was framed by the **Constituent Assembly**, whose President was **Dr Rajendra Prasad**; the **Drafting Committee** was chaired by **Dr B. R. Ambedkar**.',
      terms: [['Constitution', 'The fundamental law that sets up and limits government and protects rights.'], ['Drafting Committee', 'The committee of the Constituent Assembly that prepared the draft of the Constitution.']],
      v: vWhatIs,
      vs: [vNeed],
    },
    {
      h: '2. Adoption and enforcement',
      t: 1,
      b: '- The Assembly **first met on 9 December 1946**.\n- The Constitution was **adopted on 26 November 1949** (now observed as **Constitution Day**).\n- It **came into force on 26 January 1950**, observed as Republic Day, about two months after adoption.\n- **Why 26 January?** On 26 January 1930 Independence Day had been observed after the call for **Purna Swaraj** (complete independence); the framers chose the same date to honour that pledge.',
      terms: [['Adoption', 'Acceptance of the final text by the Constituent Assembly (26 November 1949).'], ['Enforcement', 'The date from which the Constitution began to apply (26 January 1950).']],
      v: vTimeline,
      vs: [vPurna],
    },
    {
      h: '3. Single citizenship',
      t: 2,
      b: '- Every citizen of India is a citizen of **India only**; there is **no separate State citizenship**.\n- In a federation like the **United States**, a person is a citizen of the nation and of the State of residence: **dual citizenship**.\n- Single citizenship promotes **unity**: one status for all, a common national identity and easy movement across States.\n- **Optional note:** Overseas Citizenship of India is a special status with privileges; it is **not** dual citizenship and does not carry the vote.',
      terms: [['Single citizenship', 'One citizenship, of the nation, for every citizen of a federation.'], ['Dual citizenship', 'Citizenship of both the nation and a State, as in the United States.']],
      v: vCitizen,
      vs: [vSingle],
    },
    {
      h: '4. Universal adult franchise',
      t: 3,
      b: '- **Universal adult franchise:** every adult citizen can vote, without discrimination of caste, religion, sex, education or wealth.\n- The **minimum voting age is 18**. The **61st Amendment (1988)** lowered it from 21, with effect from 1989.\n- A voter must also be on the **electoral roll**.\n- **Why it strengthens democracy:** political equality (one adult, one vote), a government answerable to all, participation and legitimacy.',
      terms: [['Franchise', 'The right to vote.'], ['Electoral roll', 'The list of eligible voters of an area.']],
      v: vVote,
      vs: [vFranchise],
    },
    {
      h: '5. Fundamental Rights',
      t: 4,
      b: '- **Fundamental** because guaranteed by the Constitution and essential for a person\'s development; **justiciable**, so courts enforce them.\n- **Six categories (as of 2024):** Equality; Freedom; against Exploitation; Freedom of Religion; Cultural and Educational Rights; Constitutional Remedies.\n- The **right to property** was removed from the list by the **44th Amendment (1978)**.\n- Rights are subject to **reasonable restrictions**, for example in the interest of public order.\n- **Constitutional Remedies:** a citizen can move the Supreme Court or a High Court to enforce the other rights.',
      terms: [['Justiciable', 'Capable of being enforced by a court.'], ['Constitutional Remedies', 'The right to approach the courts to enforce Fundamental Rights.']],
      v: vSix,
      vs: [vCatTable, vThenNow],
    },
    {
      h: '6. Fundamental Duties',
      t: 5,
      b: '- Added in **1976** by the **42nd Amendment** on the recommendation of the **Swaran Singh Committee**.\n- **Eleven** duties as of 2024; the eleventh (parents and guardians to provide education to a child aged **six to fourteen**) was added by the **86th Amendment (2002)**.\n- Examples (in paraphrase): respect the Constitution, flag and anthem; protect the environment; safeguard public property; develop scientific temper; promote harmony.\n- Duties have **no direct court remedy** like rights, but they **complement** rights: rights are safe only when everyone respects them.',
      terms: [['Fundamental Duties', 'Civic obligations listed in the Constitution for every citizen.'], ['Swaran Singh Committee', 'The committee whose recommendation led to the addition of the duties.']],
      v: vDuties,
      vs: [vDutyTable, vBalance],
    },
  ],
  tips: '**Common mistakes**\n- Writing that the Constitution was adopted and enforced on one day.\n- Saying that Indians hold State citizenship.\n- Adding education or property to the conditions for voting.\n- Giving seven Fundamental Rights, or ten duties, without a date.\n- Saying that duties are enforced by courts in the same way as rights.\n\n**How marks are usually awarded**\n- 1-mark items: one correct option or term.\n- 2 and 3 marks: one clear point per mark.\n- 10-mark questions in 3 + 3 + 4 parts: one clear point per mark; the last part usually needs a reason or an evaluation.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['What is a constitution?', 'The **fundamental law** of a country.', 'definition', 1],
  ['Four jobs of a constitution', 'Sets up government, **limits** power, **protects** rights, settles disputes.', 'concept', 1],
  ['First meeting of the Constituent Assembly', '**9 December 1946**.', 'fact', 1],
  ['President of the Constituent Assembly', '**Dr Rajendra Prasad**.', 'fact', 1],
  ['Chairman of the Drafting Committee', '**Dr B. R. Ambedkar**.', 'fact', 1],
  ['Date of adoption', '**26 November 1949** (Constitution Day).', 'fact', 1],
  ['Date of enforcement', '**26 January 1950**.', 'fact', 1],
  ['Why 26 January?', 'It recalled **26 January 1930** and the **Purna Swaraj** pledge.', 'concept', 1],
  ['Gap between adoption and enforcement', 'About **two months** (61 days).', 'fact', 1],
  ['Single citizenship', 'A citizen of **India only**; no State citizenship.', 'definition', 2],
  ['Dual citizenship: an example', 'The **United States**: nation and State.', 'example', 2],
  ['Main benefit of single citizenship', 'It promotes **unity** and a common identity.', 'concept', 2],
  ['Overseas Citizenship of India', 'Privileges only; **not** dual citizenship; no vote.', 'fact', 2],
  ['Universal adult franchise', 'Every **adult citizen** may vote, whatever caste, religion, sex, education or wealth.', 'definition', 3],
  ['Minimum voting age', '**18 years** (since 1989).', 'fact', 3],
  ['Amendment that lowered the voting age', '**61st Amendment**, 1988; from 21 to 18.', 'fact', 3],
  ['Two reasons UAF strengthens democracy', 'Political **equality**; government **answerable to all**.', 'exam-tip', 3],
  ['What is needed besides age and citizenship to vote?', 'Name on the **electoral roll**.', 'concept', 3],
  ['Fundamental Right: meaning', 'Guaranteed by the Constitution and **justiciable**.', 'definition', 4],
  ['Justiciable', 'Can be **enforced by a court**.', 'definition', 4],
  ['Six categories of Fundamental Rights', 'Equality; Freedom; against Exploitation; Religion; Cultural and Educational; Constitutional Remedies.', 'fact', 4],
  ['Right removed from the list', '**Right to property**, by the **44th Amendment**, 1978.', 'fact', 4],
  ['Right against Exploitation: examples', 'Ban on **forced labour** and child labour in hazardous work.', 'example', 4],
  ['Cultural and Educational Rights: example', 'Minorities may run their **own schools** and keep their script.', 'example', 4],
  ['Right to Constitutional Remedies', 'Move the **Supreme Court or a High Court** to enforce rights.', 'definition', 4],
  ['Are Fundamental Rights absolute?', 'No: **reasonable restrictions** apply.', 'concept', 4],
  ['When were Fundamental Duties added?', '**1976**, by the **42nd Amendment**.', 'fact', 5],
  ['Committee behind the duties', 'The **Swaran Singh Committee**.', 'fact', 5],
  ['How many duties today?', '**Eleven** (as of 2024).', 'fact', 5],
  ['The eleventh duty', 'Parents and guardians provide **education** to a child aged six to fourteen (86th Amendment, 2002).', 'fact', 5],
  ['Rights and duties', 'They **complement** each other: rights are safe when all respect them.', 'exam-tip', 5],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'icse-9-default-chapter-test-short',
  title: 'Chapter test (short) — Our Constitution: Meaning, Adoption and Salient Features',
  duration: 30,
  sections: [
    { id: 'A', title: 'Section A — Compulsory (10 marks)', instr: 'Attempt all questions. Questions 1–5 carry 1 mark each; question 6 carries 2 marks and question 7 carries 3 marks.', items: ['m_const_meaning', 'm_meera_gujarat', 'm_vote_age', 'm_mill_workers', 'ar_property', 's_single_dual', 's3_fd_five'] },
    { id: 'B', title: 'Section B — Structured question (10 marks)', instr: 'Attempt any ONE of the two questions. Each is in three parts (3 + 3 + 4 marks).', items: [{ attempt: 1, keys: ['l_fr_cats', 'l_uaf'] }] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'icse-9-default-chapter-test-long',
  title: 'Chapter test (long) — Our Constitution: Meaning, Adoption and Salient Features',
  duration: 60,
  sections: [
    { id: 'A', title: 'Section A — Compulsory (20 marks)', instr: 'Attempt all questions. Questions 1–8 carry 1 mark each; questions 9–11 carry 2 marks each; questions 12 and 13 carry 3 marks each.', items: ['m_adoption_date', 'm_why_26jan', 'm_usa_contrast', 'm_chandanpur_list', 'm_fr_count', 'm_fd_amendment', 'm_library_walls', 'ar_fd_enforce', 's_const_need', 's_fr_meaning', 's_uaf', 's3_single_unity', 's3_fr_six'] },
    { id: 'B', title: 'Section B — Structured questions (20 marks)', instr: 'Attempt any TWO of the three questions. Each is in three parts (3 + 3 + 4 marks).', items: [{ attempt: 2, keys: ['l_const', 'l_citizenship', 'l_fd'] }] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t05 of icse-9-history-civics-ch01 only (meaning of a constitution, adoption and enforcement; single citizenship; universal adult franchise; Fundamental Rights; Fundamental Duties); elementary study, no Article text quoted',
    originality: 'every scenario, school gazette, voters list and letter is imagined and written by SOYL (labelled); no textbook text or exercise and no specimen or board-paper item reused (D-036); no person quoted; no current office-holder named',
    data: `adoption to enforcement ${GAP_DAYS} days computed; voting age ${VOTE_OLD} to ${VOTE_NEW}; duties ${DUTIES_1976} to ${DUTIES_NOW}; six categories of Fundamental Rights asserted`,
    facts: 'Constituent Assembly first met 9 December 1946; Dr Rajendra Prasad President; Dr B. R. Ambedkar chaired the Drafting Committee; adopted 26 November 1949; in force 26 January 1950 (Purna Swaraj, 26 January 1930); single citizenship vs dual in the USA; voting age 18 by the 61st Amendment (1988, effective 1989); six categories of Fundamental Rights as of 2024, right to property removed by the 44th Amendment (1978); Fundamental Duties by the 42nd Amendment (1976) on the Swaran Singh Committee, eleventh by the 86th Amendment (2002)',
    gate: 'schema, content lint (lintExemplar), deterministic verify, originality pre-check and the editorial counts run clean on this chapter',
  },
});
