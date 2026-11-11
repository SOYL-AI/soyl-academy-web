// Build CBSE 12 History ch12 Framing the Constitution: The Beginning of a New Era.
// Run from platform/:  npx tsx content/authored/social-science/cbse-12-history-ch12/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from '../../cbse-12-history-ch01/src/lib.mjs';

setUnit('cbse-12-history-ch12', 'social-science');
await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// Helpers: a table or a flow with an alt text built from its own content.
const tb = (headers, rows, caption) => table(headers, rows, `Table, ${caption}. ${rows.map((r) => r.join(': ')).join('; ')}`, caption);
const fl = (labels, caption) => flow('LR', labels, `Flow chart, ${caption}: ${labels.join(', then ')}`, caption);

// ---------------------------------------------------------------- SVG figures (no maps: places are named in words only)
const vTimeline = (() => {
  const s = new Svg(700, 340);
  const X = (y) => 250 + ((y - 1941) / 10) * 420;
  const AX = 296;
  for (let yr = 1942; yr <= 1950; yr += 2) s.line(X(yr), 8, X(yr), AX, { sw: 0.6, dash: true, color: 'muted' });
  s.arrow(244, AX, 690, AX, { sw: 1.8 });
  for (let yr = 1942; yr <= 1950; yr += 2) {
    s.line(X(yr), AX - 5, X(yr), AX + 5, { sw: 1.2 });
    s.text(X(yr), AX + 20, String(yr), { size: 11, muted: true });
  }
  const lane = (i, name) => {
    const y = 22 + i * 28;
    s.text(8, y, name, { anchor: 'start', size: 12 });
    return y;
  };
  const dot = (i, name, yr, label, side = 'right') => {
    const y = lane(i, name);
    s.dot(X(yr), y, 5, 'accent');
    if (side === 'right') s.text(X(yr) + 12, y, label, { anchor: 'start', size: 12 });
    else s.text(X(yr) - 12, y, label, { anchor: 'end', size: 12 });
  };
  const bar = (i, name, a, b, label, side = 'right') => {
    const y = lane(i, name);
    s.rect(X(a), y - 7, Math.max(X(b) - X(a), 5), 14, { rx: 3, fill: 'fill', color: 'accent', sw: 1.6 });
    if (side === 'right') s.text(X(b) + 10, y, label, { anchor: 'start', size: 12 });
    else s.text(X(a) - 10, y, label, { anchor: 'end', size: 12 });
  };
  dot(0, 'Quit India movement', 1942.6, 'August 1942');
  dot(1, 'Naval mutiny', 1946.1, 'early 1946');
  dot(2, 'Communal violence begins', 1946.6, 'August 1946');
  dot(3, 'First session', 1946.94, '9 December 1946');
  dot(4, 'Objectives Resolution', 1946.95, '13 December 1946');
  dot(5, 'Independence, Partition', 1947.62, 'August 1947');
  bar(6, 'Assembly at work', 1946.94, 1949.9, 'December 1946 to November 1949', 'left');
  dot(7, 'Constitution adopted', 1949.9, '26 November 1949', 'left');
  dot(8, 'Constitution in effect', 1950.07, '26 January 1950', 'left');
  s.text(350, 332, 'Years CE. Bars show spans and dots show single events.', { size: 12, muted: true });
  return s.visual('Timeline from 1942 to 1950 CE in nine rows: the Quit India movement in August 1942; the naval mutiny in early 1946; communal violence beginning in August 1946; the first session of the Constituent Assembly on 9 December 1946; the Objectives Resolution on 13 December 1946; independence and Partition in August 1947; the Assembly at work from December 1946 to November 1949; the Constitution adopted on 26 November 1949; and the Constitution in effect on 26 January 1950', 'The chapter in time');
})();

const vProcess = (() => {
  const s = new Svg(700, 380);
  const ys = [12, 84, 156, 228, 300];
  const data = [
    ['The Objectives Resolution', 'Moved by Nehru, 13 December 1946'],
    ['Committees and an adviser', 'Patel chaired the Advisory Committee; B. N. Rau advised'],
    ['The Drafting Committee', 'Chairman Ambedkar; chief draughtsman S. N. Mukherjee'],
    ['The draft debated in the Assembly', 'President Rajendra Prasad; amendments moved'],
    ['The Constitution adopted', '26 November 1949; in effect 26 January 1950'],
  ];
  data.forEach(([title, sub], i) => {
    s.rect(80, ys[i], 540, 56, { sw: 2, color: 'accent', fill: 'fill' });
    s.text(350, ys[i] + 20, title, { bold: true, size: 14 });
    s.text(350, ys[i] + 41, sub, { size: 12 });
    if (i < data.length - 1) s.arrow(350, ys[i] + 56, 350, ys[i + 1] - 1, { sw: 2 });
  });
  s.text(350, 372, 'How the Constitution was made, step by step', { size: 12, muted: true });
  return s.visual('Diagram of five boxes stacked from top to bottom joined by downward arrows: the Objectives Resolution moved by Nehru on 13 December 1946; committees and an adviser, where Patel chaired the Advisory Committee and B. N. Rau advised; the Drafting Committee under Chairman Ambedkar with S. N. Mukherjee as chief draughtsman; the draft debated in the Assembly under President Rajendra Prasad; and the Constitution adopted on 26 November 1949 and in effect on 26 January 1950', 'How the Constitution was made');
})();

const vLists = (() => {
  const s = new Svg(700, 330);
  const xs = [20, 250, 480];
  const top = [['Union List', 'Subjects for the centre', 'The longest of the three'], ['State List', 'Subjects for the states', 'Law-making by the states'], ['Concurrent List', 'Subjects for both', 'Centre and states both']];
  top.forEach(([a, b, c], i) => {
    s.rect(xs[i], 16, 200, 100, { sw: 2, color: 'accent', fill: 'fill' });
    s.text(xs[i] + 100, 42, a, { bold: true, size: 15 });
    s.text(xs[i] + 100, 68, b, { size: 12 });
    s.text(xs[i] + 100, 90, c, { size: 12 });
  });
  const tax = ['Some taxes for the centre', 'Some taxes for the states', 'Some taxes shared'];
  tax.forEach((t, i) => {
    s.arrow(xs[i] + 100, 118, xs[i] + 100, 162, { sw: 1.8 });
    s.rect(xs[i], 166, 200, 52, { sw: 2, color: 'accent' });
    s.text(xs[i] + 100, 192, t, { size: 13 });
  });
  s.rect(20, 244, 660, 50, { sw: 2, color: 'accent', fill: 'fill' });
  s.text(350, 269, 'Article 356: the centre could take over a state\'s administration on a Governor\'s report of breakdown', { size: 12 });
  s.text(350, 316, 'Subjects of law-making above, sharing of taxes below, and one power of the centre', { size: 12, muted: true });
  return s.visual('Diagram with three boxes across the top labelled Union List for the centre and the longest of the three, State List for the states, and Concurrent List for both; arrows lead down to three boxes saying some taxes for the centre, some taxes for the states and some taxes shared; a wide box at the bottom says that under Article 356 the centre could take over a state\'s administration on a Governor\'s report of breakdown', 'Lists, taxes and Article 356');
})();

// ---------------------------------------------------------------- tables and flows: Part 1
const vRoute1 = fl(['A time of upheaval', 'The Assembly is formed', 'The Objectives Resolution', 'Rights and minorities'], 'Part 1 at a glance');
const vUpheaval = tb(['Event or movement', 'Year'], [['Quit India movement', '1942'], ['The INA', 'the war years'], ['Mutiny of Royal Indian Navy ratings, Bombay', '1946'], ['Workers\' and peasants\' movements', 'throughout'], ['Communal violence', 'from August 1946'], ['Partition and millions of refugees', '1947'], ['Joining of the princely states', 'after 1947']], 'Years of upheaval before and during the framing');
const vElect = tb(['Question', 'Answer'], [['Who elected the members?', 'Members of the provincial legislatures, in 1946'], ['Was it a vote of all adults?', 'No, it was indirect'], ['Under what scheme?', 'The Cabinet Mission plan'], ['First session', '9 December 1946']], 'How the Assembly was formed');
const vMembers = tb(['Feature', 'Detail'], [['Largest party', 'The Congress, with a large majority, especially after Partition'], ['Muslim League', 'Boycotted the Assembly before Partition'], ['Members', 'People of many views and many communities'], ['Public', 'Letters, suggestions and newspapers also shaped the debates']], 'Who sat in the Assembly');
const vWork = fl(['Eleven sessions', '165 days of sittings', 'Debates printed', 'Committees prepare drafts'], 'How the Assembly worked');
const vEx1 = tb(['Mark', 'Point for a 5-mark answer on how the Assembly was formed'], [['1', 'The setting: war, upheaval and the end of British rule'], ['2', 'The method: election by provincial legislators in 1946'], ['3', 'The party balance: Congress majority; League boycott'], ['4', 'The variety of members and views'], ['5', 'The opening: 9 December 1946 and the published debates']], 'Planning a five-mark answer');
const vResolution = tb(['Question', 'Answer'], [['Who moved it?', 'Jawaharlal Nehru'], ['When?', '13 December 1946'], ['A new country', 'An independent sovereign republic'], ['For its citizens', 'Justice, equality and freedom'], ['Safeguards for', 'Minorities, backward and tribal areas, depressed and other backward classes']], 'The Objectives Resolution in SOYL\'s words');
const vFigures = tb(['Person', 'Role'], [['Jawaharlal Nehru', 'Moved the Objectives Resolution'], ['Vallabhbhai Patel', 'Worked behind the scenes; chaired committees such as the Advisory Committee on rights and minorities'], ['Rajendra Prasad', 'President of the Assembly'], ['B. R. Ambedkar', 'Chairman of the Drafting Committee; piloted the draft'], ['K. M. Munshi, Alladi Krishnaswamy Aiyar', 'Members of the Drafting Committee'], ['B. N. Rau', 'Constitutional Advisor'], ['S. N. Mukherjee', 'Chief draughtsman']], 'The main figures');
const vSepTwo = tb(['Side', 'Argument'], [['For continuing (B. Pocker Bahadur)', 'Separate electorates were a safeguard for Muslims'], ['Against (Patel, Govind Ballabh Pant)', 'A cause of division in the past and harmful to minorities themselves']], 'Separate electorates, two sides');
const vEx2 = tb(['Step', 'Weighing two arguments on a new case'], [['Imagined claim A', 'A seat kept for a group guarantees its voice'], ['Imagined claim B', 'A seat kept for a group may make others ignore it'], ['Test of A', 'Does it show who actually gets power?'], ['Test of B', 'Does it show candidates ignoring that group?'], ['Verdict', 'Say which evidence would decide, then weigh']], 'Weighing two arguments');
const vOthers = tb(['Member', 'Concern'], [['N. G. Ranga', 'The real minorities are the poor; rights matter only if people can use them'], ['Jaipal Singh', 'Adivasis were dispossessed and marginalised; asked for representation and safeguards'], ['J. Nagappa and other depressed-class members', 'Untouchability and exclusion need more than reserved seats']], 'Other voices on rights');
const vSCST = tb(['Provision', 'Meaning'], [['Article 17', 'Untouchability abolished'], ['Reserved seats', 'In legislatures, for Scheduled Castes and Scheduled Tribes'], ['Reserved posts', 'In government service, for the same groups'], ['Separate electorates', 'Rejected']], 'What was adopted');
const vSum1 = tb(['Idea', 'Remember'], [['Context', 'Upheaval 1942 to 1947; Partition; princely states'], ['Assembly', 'Elected 1946 by provincial legislators; first met 9 December 1946'], ['Resolution', 'Nehru, 13 December 1946'], ['Roles', 'Prasad, Ambedkar, Patel, Rau, Mukherjee'], ['Rights', 'Separate electorates rejected; Article 17; reservation']], 'Summary of Part 1');
const vTips1 = tb(['Mistake to avoid', 'Better'], [['Saying all adults elected the Assembly', 'Say provincial legislators elected it'], ['Saying Ambedkar alone wrote the Constitution', 'Name the team and the Assembly\'s debates'], ['Treating rights as one debate', 'Name each group and its concern'], ['Giving only one side on electorates', 'Give both arguments, then the outcome']], 'Common mistakes in Part 1');

// ---------------------------------------------------------------- tables and flows: Part 2
const vRoute2 = fl(['Powers of the state', 'The language of the nation', 'Debates as sources', 'Reading a record'], 'Part 2 at a glance');
const vWhy = fl(['Violence and Partition, 1946 and 1947', 'Fear of a weak centre', 'Many urge strong central powers', 'States ask for strength too'], 'Why centre and states were debated');
const vTaxes = tb(['Matter', 'Arrangement'], [['Subjects of law-making', 'Three lists: Union, State, Concurrent'], ['The Union List', 'The longest of the three'], ['Taxes', 'Some for the centre, some for the states, some shared'], ['Breakdown in a state', 'The centre could take over on a Governor\'s report (Article 356)']], 'Centre and states in the Constitution');
const vTwoSides = tb(['Side', 'Argument'], [['A strong centre (Nehru, Ambedkar and many others)', 'After the violence and Partition of 1946 and 1947, a weak centre could not hold the country together'], ['Strong states (K. Santhanam of Madras)', 'An over-strong centre would be ill-equipped, and the sharing of finances would make provinces dependent']], 'Centre and states, two sides');
const vEx3 = tb(['Step', 'Reading an imagined count of speeches'], [['Imagined count', '30 speeches on a clause: 18 from one region, 12 from others'], ['What it shows', 'Which region spoke more often'], ['What it does not show', 'How many members held each view, or how they voted'], ['Next', 'Find the votes and the committee papers']], 'Reading a count of speeches');
const vHindustani = tb(['Feature', 'Detail'], [['Hindustani', 'A blend of Hindi and Urdu'], ['Who preferred it', 'Gandhi'], ['Congress position', 'Accepted as the national language in the 1930s'], ['After Partition', 'Hindi and Urdu were growing apart']], 'Hindustani and the Congress');
const vLangVoices = tb(['Member', 'Position'], [['R. V. Dhulekar (United Provinces)', 'Argued strongly for Hindi'], ['G. Durgabai (Madras)', 'Concern that Hindi was being pressed on non-Hindi speakers'], ['T. A. Ramalingam Chettiar', 'Urged caution']], 'Voices in the language debate');
const vCompromise = fl(['Language Committee proposes a compromise', 'Hindi in Devanagari as official language', 'English continues for fifteen years', 'Other languages recognised in a schedule'], 'The compromise on language');
const vOfficialNot = tb(['Said', 'Better'], [['Hindi was made the national language', 'Hindi became the official language'], ['English ended in 1950', 'English continued for fifteen years'], ['Only Hindi was recognised', 'Other languages were recognised in a schedule']], 'Official, not national');
const vDebatesSrc = tb(['Source', 'What it holds'], [['Constituent Assembly Debates', 'Printed records of the discussions, in many volumes'], ['Committee reports', 'Proposals and papers before the House'], ['Newspapers', 'Reports and comment from outside'], ['Public petitions and letters', 'What citizens urged']], 'Sources for the framing');
const vReadDebate = tb(['Strength', 'Limit'], [['Show the arguments members made in public', 'Speeches were made for a public record'], ['Name who spoke and what was proposed', 'Decisions were also shaped in committees and party meetings'], ['Record amendments and outcomes', 'Private talk does not appear']], 'Reading the Debates');
const vEx2b = tb(['Step', 'An imagined source line to read'], [['Source', 'A reporter\'s note: the House seemed strongly in favour'], ['Who wrote it', 'A reporter, from the gallery'], ['What it can show', 'One observer\'s impression of the mood'], ['What it cannot show', 'The count, or the reasons of silent members'], ['Next', 'Compare with the record of votes']], 'Reading an observer\'s impression');
const vEx3b = tb(['Mark', 'Point to write for a source question on the Debates'], [['Part a, 1 mark', 'A fact the passage lets you name'], ['Part b, 1 mark', 'One inference about viewpoint or purpose'], ['Part c, 2 marks', 'Two checks with other evidence, tied to the question']], 'Planning a source question');
const vSum2 = tb(['Idea', 'Remember'], [['Centre and states', 'Three lists; shared taxes; Article 356; Santhanam against over-strong centre'], ['Language', 'Hindustani to a compromise: Hindi official, English for fifteen years'], ['Voices', 'Dhulekar; Durgabai; Ramalingam Chettiar'], ['Sources', 'Debates, committee reports, newspapers, petitions']], 'Summary of Part 2');
const vTips2 = tb(['Mistake to avoid', 'Better'], [['Writing national language', 'Write official language, with English continuing'], ['Quoting a speech', 'Describe the argument in your own words'], ['Treating the Debates as the whole story', 'Add committees, newspapers and petitions'], ['Judging a clause by the length of debate', 'Ask where it was settled']], 'Common mistakes in Part 2');

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Framing the Constitution — Part 1: The Assembly, its voices and the question of rights',
  goals: [
    'Describe the upheavals of 1942 to 1947 and how the Constituent Assembly was formed',
    'Explain the Objectives Resolution and the roles of the main figures',
    'Present the debate on separate electorates and the concerns of other groups, each side in its own terms',
    'Weigh arguments on rights without quoting speeches',
  ],
  slides: [
    sl('title', 'Framing the Constitution', {
      b: 'Part 1: **the Assembly**, its **voices** and the question of **rights**.',
      v: vRoute1,
      n: 'In this chapter we study how the Constitution of India was framed, between 1946 and 1949, by the Constituent Assembly. In this part we begin with the troubled times in which the Assembly met, then look at who sat in it, who led it, and how it debated the rights of minorities and the poor.',
    }),
    sl('concept', 'A tumultuous time', {
      b: 'The Assembly began work amid **upheaval** and **change**.',
      v: vUpheaval,
      n: 'The years before the Assembly were years of great upheaval. There was the Quit India movement in 1942, the INA, and in 1946 the mutiny of Royal Indian Navy ratings in Bombay. Workers and peasants were on the move. Communal violence began in August 1946. Then came Partition in 1947, with millions of refugees, and the joining of the princely states.',
    }),
    sl('diagram', 'The chapter in time', {
      v: vTimeline,
      n: 'This timeline sets out the years. Quit India came in 1942, the naval mutiny in early 1946, and communal violence from August 1946. The Assembly first met on 9 December 1946, and the Objectives Resolution was moved four days later. Independence and Partition followed in 1947. The Constitution was adopted on 26 November 1949 and came into effect on 26 January 1950.',
    }),
    sl('concept', 'How the Assembly was formed', {
      b: 'Members were chosen by the **provincial legislatures**, not by all adults.',
      v: vElect,
      n: 'Under the Cabinet Mission plan, members of the Constituent Assembly were elected in 1946 by the members of the provincial legislatures. This was an indirect election. It was not a vote by all adult men and women. The first session began on 9 December 1946.',
    }),
    sl('check', 'Quick check: the election', {
      b: 'How were most members chosen in 1946?',
      chk: 'm_elected_how',
      n: 'Recall how members of the Assembly were chosen.',
    }),
    sl('concept', 'Who sat in the Assembly', {
      b: 'A **Congress** majority, a **League boycott** and **many views**.',
      v: vMembers,
      n: 'The Congress held a large majority, especially after Partition. The Muslim League boycotted the Assembly before Partition. Yet the members came from many communities and held many views, and public opinion also shaped the discussions, through letters, suggestions and newspapers. We should not say the Assembly spoke with one voice.',
    }),
    sl('concept', 'How the Assembly worked', {
      b: '**Eleven sessions** over **165 days**; debates were **printed**.',
      v: vWork,
      n: 'The Assembly met in eleven sessions, with sittings spread over one hundred sixty five days. Its debates were printed, which is why historians can read them today. Much detailed work was done in committees, which prepared drafts for the whole House to debate.',
    }),
    sl('example', 'Worked example 1: planning a five-mark answer', {
      b: 'Question: **How was the Assembly formed?**',
      bl: [
        'Step 1 — Set the **context**.',
        'Step 2 — Give the **method** of election.',
        'Step 3 — Give the **party balance**.',
        'Step 4 — Note the **variety** of members.',
        'Step 5 — End with the **first session**.',
      ],
      v: vEx1,
      n: 'To plan a five mark answer on how the Assembly was formed, spend one mark on each step. Set the context of upheaval and the end of British rule. Give the method, election by provincial legislators. Give the party balance. Note the variety of members and views. End with the first session and the published debates.',
    }),
    sl('concept', 'The Objectives Resolution', {
      b: 'Moved by **Nehru** on **13 December 1946**.',
      v: vResolution,
      n: 'On 13 December 1946 Jawaharlal Nehru moved the Objectives Resolution. In its aims, India was to be an independent sovereign republic, with justice, equality and freedom for all citizens, and adequate safeguards for minorities, backward and tribal areas, and depressed and other backward classes. It set a direction; the means were left to be debated.',
    }),
    sl('concept', 'The main figures', {
      b: 'Many hands: **Patel**, **Prasad**, **Ambedkar**, **Rau**, **Mukherjee**.',
      v: vFigures,
      n: 'Vallabhbhai Patel worked behind the scenes and chaired committees. Rajendra Prasad was President of the Assembly. B. R. Ambedkar chaired the Drafting Committee and piloted the draft through the House. K. M. Munshi and Alladi Krishnaswamy Aiyar sat on that committee. B. N. Rau was Constitutional Advisor, and S. N. Mukherjee was chief draughtsman.',
    }),
    sl('check', 'Quick check: the posts', {
      b: 'Match each person with the post held.',
      chk: 'mt_roles',
      n: 'Link each name with the correct post.',
    }),
    sl('diagram', 'How the Constitution was made', {
      v: vProcess,
      n: 'This diagram shows the steps. First the Objectives Resolution set the aims. Then committees and an adviser prepared material, and the Drafting Committee prepared the draft. The draft was debated in the Assembly under its President, with amendments moved. Finally the Constitution was adopted on 26 November 1949 and came into effect on 26 January 1950.',
    }),
    sl('concept', 'Separate electorates: two sides', {
      b: 'Should voters of a community choose **only their own** candidates?',
      v: vSepTwo,
      n: 'Separate electorates were hotly debated. B. Pocker Bahadur of Madras argued that they should continue for Muslims, as a safeguard. Most members, among them Sardar Patel and Govind Ballabh Pant, argued against them. They saw them as a cause of division in the past, and as harmful to the minorities themselves. Separate electorates were rejected.',
    }),
    sl('check', 'Quick check: a voice', {
      b: 'Which member from Madras argued for continuing separate electorates?',
      chk: 'm_pocker',
      n: 'Recall the member who made this case.',
    }),
    sl('example', 'Worked example 2: weighing two arguments', {
      b: 'Weigh two imagined claims about **reserved seats**.',
      bl: [
        'Step 1 — State each **claim**.',
        'Step 2 — Say what **evidence** would test each.',
        'Step 3 — Weigh the evidence.',
        'Step 4 — Give a **verdict** with its limit.',
      ],
      v: vEx2,
      n: 'Take two imagined claims about reserved seats. One says a reserved seat guarantees a group a voice. The other says it may let others ignore the group. For each claim, say what evidence would test it. For example, who actually holds power, and whether candidates ignore the group. Then weigh the evidence and give a verdict with its limit.',
    }),
    sl('concept', 'Beyond separate electorates', {
      b: 'The **poor**, **Adivasis** and the **depressed classes** also spoke.',
      v: vOthers,
      n: 'Other members raised other fears. N. G. Ranga, a socialist peasant leader, argued that the real minorities were the poor, and that rights matter only if people can use them. Jaipal Singh argued that Adivasis had been dispossessed and marginalised, and asked for representation and safeguards. Depressed class members, such as J. Nagappa, argued that exclusion needed more than reserved seats.',
    }),
    sl('concept', 'What the Constitution provided', {
      b: 'Untouchability abolished; **seats** and **posts** reserved.',
      v: vSCST,
      n: 'In place of separate electorates, the Constitution abolished untouchability in Article 17. It also reserved seats in legislatures and posts in government service for the Scheduled Castes and Scheduled Tribes. These measures answered some of the concerns raised, though members had spoken of more than seats alone.',
    }),
    sl('check', 'Quick check: the first session', {
      b: 'Fill in the blank: the first session began on ___ December 1946.',
      chk: 'fb_first_session',
      n: 'Recall the date of the first session.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSum1,
      n: 'To sum up. The Assembly met in a time of upheaval and Partition. Provincial legislators elected its members in 1946, and it first met on 9 December. Nehru moved the Objectives Resolution, and a team including Prasad, Ambedkar, Patel, Rau and Mukherjee shaped the Constitution. Separate electorates were rejected, untouchability abolished, and seats and posts reserved.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Say **provincial legislators** elected the Assembly.',
        'Name the **team**, not only Ambedkar.',
        'Give **both sides** of the electorates debate.',
        'Name each group and its **concern**.',
        'Describe arguments in **your own words**.',
      ],
      v: vTips1,
      n: 'Some tips. Say that provincial legislators elected the Assembly. Name the team that framed the Constitution, not only Ambedkar. Give both sides of the debate on separate electorates, then the outcome. Name each group and its concern. And describe arguments in your own words, never as a quotation.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Framing the Constitution — Part 2: The state, the language and the sources',
  goals: [
    'Explain the debate on the powers of the centre and the states and the arrangement adopted',
    'Explain the debate on the language of the nation and why the outcome was a compromise',
    'Describe the Constituent Assembly Debates and the other sources for the framing',
    'Read a record for what it shows and what it leaves out',
  ],
  slides: [
    sl('title', 'The state, the language and the sources', {
      b: 'Part 2: **centre and states**, **language** and **sources**.',
      v: vRoute2,
      n: 'In this part we study two more great debates of the Assembly: how power should be shared between the centre and the states, and which language the nation should use. Then we turn to the sources, and ask how historians use the printed debates and other records.',
    }),
    sl('concept', 'Why the powers of the state were debated', {
      b: 'A **strong centre**, or **strong states**?',
      v: vWhy,
      n: 'After the violence and Partition of 1946 and 1947, many members feared that a weak centre could not hold the country together. Among them were Nehru and Ambedkar. At the same time, others argued that the states must also be strong, so the question was how to divide powers between the centre and the provinces.',
    }),
    sl('concept', 'Lists, taxes and Article 356', {
      b: 'Three **lists**, shared **taxes**, and one power of the **centre**.',
      v: vLists,
      n: 'The Constitution divided subjects of law-making into three lists. The Union List gave the centre its subjects and was the longest. The State List was for the states. On the Concurrent List both could make laws. Taxes were divided too: some for the centre, some for the states, some shared. Under Article 356 the centre could take over a state on a Governor report of breakdown.',
    }),
    sl('check', 'Quick check: Santhanam', {
      b: 'What did K. Santhanam warn about?',
      chk: 'm_santhanam',
      n: 'Recall his argument about the states.',
    }),
    sl('concept', 'Two sides on the centre and the states', {
      b: 'A **strong centre** against **strong states**.',
      v: vTwoSides,
      n: 'Members who favoured a strong centre, such as Nehru and Ambedkar, pointed to the violence and Partition of 1946 and 1947. K. Santhanam of Madras argued that the states needed strength as well. He warned that an over strong centre would be ill equipped, and that the allocation of finances would make provinces dependent. Both sides wanted a united India.',
    }),
    sl('diagram', 'The arrangement at a glance', {
      v: vTaxes,
      n: 'Here is the arrangement. Subjects were sorted into three lists, with the Union List the longest. Taxes were shared out in three ways. The centre could also take over a state, on a Governor report of breakdown. So the balance leaned towards the centre, while leaving states with real subjects and sources of income of their own.',
    }),
    sl('example', 'Worked example 1: reading a count of speeches', {
      b: 'Imagined count: **30 speeches** on a clause; 18 from one region.',
      bl: [
        'Step 1 — Say what the count **shows**.',
        'Step 2 — Say what it does **not show**.',
        'Step 3 — Name the **missing** evidence.',
        'Step 4 — Draw a careful **conclusion**.',
      ],
      v: vEx3,
      n: 'Take an imagined count of thirty speeches on a clause, eighteen from one region. It shows which region spoke more often. It does not show how many members held each view, or how they voted, since some members spoke often and others never did. We need the record of votes and the committee papers before drawing a conclusion.',
    }),
    sl('concept', 'Hindustani and the Congress', {
      b: 'A **blend** of Hindi and Urdu, accepted in the **1930s**.',
      v: vHindustani,
      n: 'In the 1930s the Congress had accepted Hindustani, a blend of Hindi and Urdu, as the national language. Gandhi preferred it. But after Partition, as Hindi and Urdu grew apart, this position became harder to hold, and some members argued strongly for Hindi alone.',
    }),
    sl('concept', 'Voices in the language debate', {
      b: '**Dhulekar** for Hindi; **Durgabai** and **Ramalingam Chettiar** for care.',
      v: vLangVoices,
      n: 'R. V. Dhulekar of the United Provinces argued strongly for Hindi. Members from the south, such as G. Durgabai of Madras, expressed concern that Hindi was being pressed on people who did not speak it. T. A. Ramalingam Chettiar urged caution. Each side had a case, and each was heard.',
    }),
    sl('check', 'Quick check: the speakers', {
      b: 'Match each name or term in the language debate with its description.',
      chk: 'mt_lang',
      n: 'Link each name with its position.',
    }),
    sl('concept', 'The compromise', {
      b: 'Hindi **official**, English for **fifteen years**, other languages **recognised**.',
      v: vCompromise,
      n: 'The Language Committee proposed a compromise. Hindi in the Devanagari script would be the official language, and the change to Hindi would be gradual. English would continue for official purposes for the first fifteen years. Other languages would be recognised in a schedule. This was a compromise, and not a declaration of a national language.',
    }),
    sl('check', 'Quick check: the order', {
      b: 'Arrange the stages of the language question in order.',
      chk: 'ord_language',
      n: 'Place the stages in order, earliest first.',
    }),
    sl('diagram', 'Official, not national', {
      v: vOfficialNot,
      n: 'Be careful with words. The Constitution made Hindi the official language, not a declared national language. English did not end in 1950; it continued for fifteen years. And other languages were not ignored; they were recognised in a schedule. Using the right words shows that you have understood the compromise.',
    }),
    sl('concept', 'The Constituent Assembly Debates', {
      b: 'Printed records of the **discussions**, in many volumes.',
      v: vDebatesSrc,
      n: 'The Constituent Assembly Debates are the printed records of the discussions, in many volumes. Historians also use committee reports, newspapers, and public petitions and letters. Together these show what members argued, what was proposed, and what people outside were saying.',
    }),
    sl('concept', 'Reading a debate with care', {
      b: 'Speeches were made in **public** and for a **record**.',
      v: vReadDebate,
      n: 'The debates show the arguments members made in public, and who made them. But speeches were made in a public forum and for a record. Decisions were also shaped in committees and party meetings, which the speeches may not show. So historians read the debates for arguments and compromises, and look elsewhere for how decisions were reached.',
    }),
    sl('example', 'Worked example 2: reading an observer', {
      b: 'Imagined note: *the House seemed strongly in favour.*',
      bl: [
        'Step 1 — Ask **who** wrote it.',
        'Step 2 — Say what it **can** show.',
        'Step 3 — Say what it **cannot** show.',
        'Step 4 — Find a **check**.',
      ],
      v: vEx2b,
      n: 'Take an imagined reporter note that the House seemed strongly in favour. The reporter watched from the gallery, so the note shows one observer impression of the mood. It cannot show the count, or the reasons of silent members. A good check is the record of votes, and other reports of the same sitting.',
    }),
    sl('check', 'Quick check: English', {
      b: 'True or false? English was to stop being used for official purposes at once.',
      chk: 'tf_english',
      n: 'Judge the statement about English.',
    }),
    sl('example', 'Worked example 3: planning a source question', {
      b: 'A four-mark question on the **Debates**: parts a, b and c.',
      bl: [
        'Step 1 — Part a: **name** what the passage lets you name.',
        'Step 2 — Part b: one **inference**.',
        'Step 3 — Part c: **two checks**.',
        'Step 4 — Tie each to the **question**.',
      ],
      v: vEx3b,
      n: 'In a four mark source question on the debates, part a, one mark, asks you to name a fact. Part b, one mark, asks for an inference about viewpoint or purpose, not a line copied. Part c, two marks, asks for two checks with other evidence. Tie each point to the question asked.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSum2,
      n: 'To sum up. The Constitution used three lists, shared taxes and an emergency power for the centre, balancing a strong centre against Santhanam concern for the states. On language, Hindustani gave way to a compromise: Hindi official, English for fifteen years, other languages recognised. The Debates are a rich source, to be read with committee reports, newspapers and petitions.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Write **official language**, not national language.',
        'Describe arguments **in your own words**.',
        'Say that the Debates need **other sources** beside them.',
        'Ask **where** a decision was settled.',
        'In part b of a source question, make an **inference**.',
      ],
      v: vTips2,
      n: 'Some tips. Write official language, not national language, and mention that English continued. Describe arguments in your own words. Say that the debates need other sources beside them. Ask where a decision was settled, because a short debate may follow a long committee discussion. In part b of a source question, make an inference.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Framing the Constitution — Notes',
  sections: [
    {
      h: '1. A tumultuous time',
      t: 1,
      b: 'The Constitution was framed between **December 1946** and **November 1949**, in years of great upheaval. The **Quit India movement** (1942), the **INA**, the **mutiny of Royal Indian Navy ratings** in Bombay (1946) and the movements of workers and peasants had shaken British rule. **Communal violence** began in August 1946. In **1947** came **Partition**, with the movement of millions of refugees, and the **princely states** had then to be integrated. These events shaped what members feared and hoped for. Partition and its violence are recalled here as facts of the period, without blaming any community.',
      terms: [
        ['Partition', 'The division of British India in 1947 into two countries, with the movement of millions of refugees.'],
        ['Princely states', 'States ruled by princes under British paramountcy, which had to be integrated after 1947.'],
      ],
      v: vUpheaval,
      vs: [vTimeline],
    },
    {
      h: '2. The making of the Constituent Assembly',
      t: 1,
      b: 'Under the **Cabinet Mission plan**, members were elected in **1946** by the members of the **provincial legislatures**. It was an indirect election and not a vote of all adults. The **Congress** held a large majority, particularly after Partition, while the **Muslim League** boycotted the Assembly before Partition. Even so, members came from many communities and held many views. The **first session** began on **9 December 1946**; the Assembly met in **eleven sessions** over **165 days** of sittings, and its **debates were published**. Public opinion also shaped the discussions: letters, suggestions and newspapers were read and discussed.',
      terms: [
        ['Indirect election', 'A method in which voters choose a body, such as the legislatures, which then chooses the members.'],
        ['Cabinet Mission plan', 'The scheme of 1946 under which the Assembly was formed.'],
      ],
      v: vElect,
      vs: [vMembers, vWork, vEx1],
    },
    {
      h: '3. The dominant voices and the Objectives Resolution',
      t: 2,
      b: '**Jawaharlal Nehru** moved the **Objectives Resolution** on **13 December 1946**. In SOYL\'s words: India was to be an independent sovereign republic; all citizens were to enjoy justice, equality and freedom; and adequate safeguards were promised for minorities, backward and tribal areas, and depressed and other backward classes. It gave a direction, not the detailed means.\n\n**Vallabhbhai Patel** worked behind the scenes and chaired committees, among them the Advisory Committee on fundamental rights and minorities. **Rajendra Prasad** was President of the Assembly. **B. R. Ambedkar** was Chairman of the Drafting Committee and piloted the Draft Constitution through the Assembly; **K. M. Munshi** and **Alladi Krishnaswamy Aiyar** were also members of it. **B. N. Rau** was Constitutional Advisor and **S. N. Mukherjee** chief draughtsman. The Constitution was therefore the work of many, debated by the whole Assembly.',
      terms: [
        ['Objectives Resolution', 'The statement of aims moved by Nehru on 13 December 1946.'],
        ['Drafting Committee', 'The committee, chaired by Ambedkar, that prepared the draft for debate.'],
      ],
      v: vResolution,
      vs: [vFigures, vProcess],
    },
    {
      h: '4. Defining rights',
      t: 3,
      b: '**Separate electorates**, in which voters of a community choose only candidates of that community, were debated. **B. Pocker Bahadur** of Madras argued that they should continue for Muslims as a safeguard. Most members, among them **Sardar Patel** and **Govind Ballabh Pant**, argued against them, seeing them as a cause of division in the past and as harmful to the minorities themselves. They were **rejected**.\n\nOther members spoke of other concerns. **N. G. Ranga**, a socialist peasant leader, argued that the real minorities were the poor and downtrodden, and that rights mattered only if people could use them. **Jaipal Singh** argued for the protection of **Adivasis**, who had been dispossessed and marginalised, asking for representation and safeguards. Members from the depressed classes, such as **J. Nagappa**, argued that untouchability and exclusion must be tackled by more than reserved seats.\n\nThe Constitution **abolished untouchability** (Article 17) and provided for **reserved seats in legislatures and reserved posts in government service** for the Scheduled Castes and Scheduled Tribes.',
      terms: [
        ['Separate electorates', 'A system in which voters of a community choose only candidates of that community.'],
        ['Adivasis', 'Tribal peoples, whose protection Jaipal Singh urged.'],
      ],
      v: vSepTwo,
      vs: [vOthers, vSCST, vEx2],
    },
    {
      h: '5. The powers of the state',
      t: 3,
      b: 'Members debated how power should be shared between the centre and the provinces. Many, including **Nehru** and **Ambedkar**, argued for a strong centre, given the violence and Partition of 1946 and 1947. **K. Santhanam** of Madras argued that the states also needed strength, warning that an over-strong centre would be ill-equipped and that the allocation of finances would leave provinces dependent.\n\nThe Constitution divided subjects of law-making into **three lists**: the **Union List**, the **State List** and the **Concurrent List**, with more subjects in the Union List. Taxes were shared: some for the centre, some for the states and some shared (fiscal federalism). The centre could take over a state\'s administration on a Governor\'s report of breakdown (**Article 356**). The Constitution has since been amended.',
      terms: [
        ['Concurrent List', 'The list of subjects on which both the centre and the states may make laws.'],
        ['Fiscal federalism', 'The division of taxes and revenue between the centre and the states.'],
      ],
      v: vLists,
      vs: [vWhy, vTwoSides, vTaxes],
    },
    {
      h: '6. The language of the nation',
      t: 4,
      b: 'In the 1930s the Congress had accepted **Hindustani**, a blend of Hindi and Urdu, as the national language, as **Gandhi** preferred. After Partition, as Hindi and Urdu grew apart, some members, among them **R. V. Dhulekar** of the United Provinces, argued strongly for **Hindi**. Members from the south, such as **G. Durgabai** of Madras, expressed concern that Hindi was being pressed on non-Hindi speakers, and **T. A. Ramalingam Chettiar** urged caution.\n\nThe **Language Committee** proposed a compromise. **Hindi in the Devanagari script** would be the **official language**, with a **gradual transition**; **English** would continue for official purposes for the **first fifteen years**; and other languages were **recognised in a schedule**. It was an official language, not a declared national language.',
      terms: [
        ['Hindustani', 'A blend of Hindi and Urdu, preferred by Gandhi and accepted by the Congress in the 1930s.'],
        ['Official language', 'The language of government business, as distinct from a declared national language.'],
      ],
      v: vHindustani,
      vs: [vLangVoices, vCompromise, vOfficialNot],
    },
    {
      h: '7. Sources: the Constituent Assembly Debates',
      t: 5,
      b: 'The **Constituent Assembly Debates** are the printed records of the discussions, in many volumes. Historians also use **committee reports**, **newspapers** and **public petitions**. They read the debates to understand the arguments made and the compromises reached.\n\nCare is needed. Speeches were made in a **public forum** and **for a record**, and decisions were also shaped in **committees** and **party meetings**, which the speeches may not fully show. So a short debate may follow a long committee discussion, and a count of speeches is not a count of views. In answers, **describe** arguments in your own words; never quote a speech.',
      terms: [
        ['Constituent Assembly Debates', 'The printed records, in many volumes, of the Assembly\'s discussions.'],
        ['Committee report', 'A report of proposals prepared by a committee for the House to consider.'],
      ],
      v: vDebatesSrc,
      vs: [vReadDebate, vEx2b, vEx3b],
    },
  ],
  tips: '**Common mistakes**\n- Writing that all adults elected the Assembly; provincial legislators did.\n- Saying Ambedkar alone wrote the Constitution; name the team and the debates.\n- Giving only one side of the debate on separate electorates.\n- Writing national language when the Constitution made Hindi the official language, with English continuing for fifteen years.\n- Quoting a speech; describe the argument in your own words.\n- Treating the printed Debates as the whole story, or judging a clause by the length of its debate.\n\n**How marks are usually awarded**\n- 1 mark: one correct option.\n- 2 marks: two points, or a point and a reason (30–50 words).\n- 3 marks: three distinct points (50–80 words).\n- 5 marks: five headed points (80–120 words); assess questions need more than one side and a judgement.\n- Source questions (4 marks): parts (a) and (b) one mark each, part (c) two marks with an internal choice.\n\n**Sources in SOYL practice** are imagined documents or SOYL summaries written for practice; the board paper will give its own.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['When was the Constitution framed?', 'Between December 1946 and November 1949, adopted on 26 November 1949 and in effect from 26 January 1950.', 'fact', 1],
  ['Name three upheavals of the years before the Assembly.', 'The Quit India movement (1942), the INA and the naval mutiny of 1946, with workers\' and peasants\' movements.', 'fact', 1],
  ['When did communal violence begin on a large scale?', 'From August 1946; Partition and the movement of millions of refugees followed in 1947.', 'fact', 1],
  ['How were members of the Assembly chosen?', 'In 1946, by the members of the provincial legislatures, under the Cabinet Mission plan; not by all adults.', 'fact', 1],
  ['**Indirect election**', 'Voters choose a body, such as the legislatures, which then chooses the members.', 'definition', 1],
  ['What was the party balance in the Assembly?', 'The Congress held a large majority; the Muslim League boycotted it before Partition; members held many views.', 'concept', 1],
  ['When did the first session begin?', 'On 9 December 1946.', 'fact', 1],
  ['How long did the Assembly sit?', 'Eleven sessions over 165 days of sittings; the debates were printed.', 'fact', 1],
  ['Besides members, what else shaped the discussions?', 'Public opinion: letters, suggestions and newspapers.', 'concept', 1],
  ['Who moved the Objectives Resolution, and when?', 'Jawaharlal Nehru, on 13 December 1946.', 'fact', 2],
  ['What did the Resolution set out, in SOYL\'s words?', 'An independent sovereign republic; justice, equality and freedom for all citizens; adequate safeguards for minorities, tribal areas and depressed classes.', 'concept', 2],
  ['Role of Vallabhbhai Patel', 'Worked behind the scenes and chaired committees such as the Advisory Committee on rights and minorities.', 'fact', 2],
  ['Who was President of the Assembly?', 'Rajendra Prasad.', 'fact', 2],
  ['Role of B. R. Ambedkar', 'Chairman of the Drafting Committee; piloted the Draft Constitution through the Assembly.', 'fact', 2],
  ['Who else sat on the Drafting Committee?', 'K. M. Munshi and Alladi Krishnaswamy Aiyar were members.', 'fact', 2],
  ['Roles of B. N. Rau and S. N. Mukherjee', 'Rau was Constitutional Advisor; Mukherjee was chief draughtsman.', 'fact', 2],
  ['**Separate electorates**', 'A system in which voters of a community choose only candidates of that community.', 'definition', 3],
  ['Who argued for continuing separate electorates?', 'B. Pocker Bahadur of Madras, as a safeguard for Muslims.', 'fact', 3],
  ['Why did most members oppose them?', 'Patel, Pant and others saw them as a cause of division and as harmful to minorities themselves; they were rejected.', 'concept', 3],
  ['What did N. G. Ranga argue?', 'The real minorities were the poor; rights mattered only if people could use them.', 'concept', 3],
  ['What did Jaipal Singh ask for?', 'Representation and safeguards for Adivasis, who had been dispossessed and marginalised.', 'fact', 3],
  ['What did depressed-class members argue?', 'Untouchability and exclusion needed more than reserved seats (for example J. Nagappa).', 'concept', 3],
  ['What did the Constitution provide on untouchability and reservation?', 'Article 17 abolished untouchability; seats and posts were reserved for the Scheduled Castes and Scheduled Tribes.', 'fact', 3],
  ['The three lists of subjects', 'Union, State and Concurrent; more subjects in the Union List.', 'fact', 3],
  ['What was Article 356 about?', 'The centre could take over a state\'s administration on a Governor\'s report of breakdown.', 'fact', 3],
  ['What was K. Santhanam\'s concern?', 'An over-strong centre would be ill-equipped, and the allocation of finances would make provinces dependent.', 'concept', 3],
  ['**Hindustani**', 'A blend of Hindi and Urdu, preferred by Gandhi and accepted by the Congress in the 1930s.', 'definition', 4],
  ['Voices in the language debate', 'R. V. Dhulekar for Hindi; G. Durgabai\'s concern for non-Hindi speakers; Ramalingam Chettiar urged caution.', 'fact', 4],
  ['The compromise on language', 'Hindi in Devanagari as official language; gradual change; English for fifteen years; other languages in a schedule.', 'concept', 4],
  ['Exam tip: language', 'Write official language, not national language, and mention that English continued.', 'exam-tip', 4],
  ['What are the Constituent Assembly Debates?', 'The printed records of the Assembly\'s discussions, in many volumes.', 'definition', 5],
  ['Other sources for the framing', 'Committee reports, newspapers and public petitions.', 'fact', 5],
  ['A limit of the Debates', 'Speeches were made in a public forum and for a record; decisions were also shaped in committees and party meetings.', 'exam-tip', 5],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-12-history-chapter-test-short',
  title: 'Chapter test (short) — Framing the Constitution',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_date_partition', 'm_open_question', 'm_source_fit', 'ar_reserved'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and the 3-mark question in about 50–80 words.', items: ['s_resolution', 's_compromise_view', 's3_centre_args'] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer any ONE of the two questions in about 80–120 words.', items: [{ attempt: 1, keys: ['l_rights_assess', 'l_language'] }] },
    { id: 'D', title: 'Section D — Source-based (4 marks)', instr: 'Read the source and answer all parts. Part (c) has an internal choice.', items: ['sb_notebook'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-12-history-chapter-test-long',
  title: 'Chapter test (long) — Framing the Constitution',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_date_diary', 'm_roles_claim', 'm_electorate_support', 'm_ranga_apply', 'm_fiscal', 'm_claim_fix', 'm_committee', 'm_public_weaken', 'ar_debates', 'ar_conflict'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and 3-mark questions in about 50–80 words. Questions 13 and 15 have an internal choice.', items: ['s_context', 's_tribal', { attempt: 1, keys: ['s_356', 's_debates_reading'] }, 's3_voices', { attempt: 1, keys: ['s3_language_args', 's3_source_plan'] }] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer question 16, and any ONE of questions 17 and 18, in about 80–120 words each.', items: ['l_context', { attempt: 1, keys: ['l_centre', 'l_sources'] }] },
    { id: 'D', title: 'Section D — Source-based (4 marks each)', instr: 'Read each source and answer all parts. Part (c) of each has an internal choice.', items: ['sb_letter', 'sb_language'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t05 of cbse-12-history-ch12 only (the upheavals and the making of the Assembly; the dominant voices and the Objectives Resolution; rights and the powers of the state; the language of the nation; sources: the Constituent Assembly Debates)',
    originality: 'every source is an imagined document or a SOYL summary, labelled as such; nothing from the Constituent Assembly Debates, the text of the Objectives Resolution or the Constitution is quoted, translated or closely paraphrased; members are named and their arguments described without quotation marks; no NCERT text, source box, table, caption, map or exercise and no board or sample-paper item reused (D-036)',
    facts: 'Constitution framed December 1946 to November 1949, adopted 26 November 1949, in effect 26 January 1950; first session 9 December 1946; Objectives Resolution 13 December 1946; eleven sessions over 165 days; members elected by provincial legislatures under the Cabinet Mission plan; roles of Patel, Prasad, Ambedkar, Munshi, Alladi Krishnaswamy Aiyar, Rau and Mukherjee; Pocker Bahadur, Patel, Pant, Ranga, Jaipal Singh and Nagappa on rights; Article 17; the three lists and Article 356; Santhanam; Hindustani, Dhulekar, Durgabai and Ramalingam Chettiar; the language compromise; no maps (OA-23)',
    neutrality: 'debates presented as debates with each side in SOYL\'s own words; Partition and its violence mentioned factually and briefly without blaming any community; no judgement of present-day parties or governments; nothing after 1950 except one neutral line that the Constitution has since been amended',
    gate: 'schema, content lint (lintExemplar) and the deterministic verify checks run clean on this chapter',
  },
});
