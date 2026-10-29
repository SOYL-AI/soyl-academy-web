// Build CBSE 12 Political Science ch04 International Organisations. Run from platform/:
//   npx tsx content/authored/social-science/cbse-12-political-science-ch04/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from './lib.mjs';

setUnit('cbse-12-political-science-ch04', 'social-science');
const { SC, SC_ELECTED_EACH_YEAR, VOTE1, VOTE1_PASSES, VOTE2, VOTE2_PASSES, VOTE3, VOTE3_SHORT } = await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const yesNo = (b) => (b ? 'Adopted' : 'Not adopted');

// ---------------------------------------------------------------- visuals
const vOrgans = (() => {
  const s = new Svg(660, 330);
  const W = 190, H = 56;
  const top = [[15, 'General Assembly', 'all members, one vote each'], [235, 'Security Council', '15 members, 5 with a veto'], [455, 'ECOSOC', 'economic and social work']];
  const bottom = [[15, 'Court of Justice (ICJ)', 'legal disputes, The Hague'], [235, 'Secretariat', 'administration, New York'], [455, 'Trusteeship Council', 'inactive since 1994']];
  s.rect(210, 137, 240, 56, { color: 'accent', fill: 'fill', sw: 2.4 });
  s.text(330, 157, 'United Nations Charter', { bold: true, size: 15 });
  s.text(330, 177, 'signed 1945', { size: 13, muted: true });
  for (const [x, a, b] of top) {
    s.line(330, 137, x + W / 2, 20 + H, { sw: 1.4, color: 'muted' });
    s.rect(x, 20, W, H, { sw: 1.8 });
    s.text(x + W / 2, 40, a, { bold: true, size: 14 });
    s.text(x + W / 2, 60, b, { size: 12, muted: true });
  }
  for (const [x, a, b] of bottom) {
    s.line(330, 193, x + W / 2, 254, { sw: 1.4, color: 'muted' });
    s.rect(x, 254, W, H, { sw: 1.8, dash: a.startsWith('Trusteeship') });
    s.text(x + W / 2, 274, a, { bold: true, size: 14 });
    s.text(x + W / 2, 294, b, { size: 12, muted: true });
  }
  return s.visual(
    'Diagram of the six principal organs of the United Nations around the UN Charter of 1945: General Assembly, Security Council and Economic and Social Council above; International Court of Justice, Secretariat and the Trusteeship Council, inactive since 1994, below',
    'The six principal organs set up by the Charter.',
  );
})();

const vSeats = (() => {
  const s = new Svg(640, 170);
  for (let i = 0; i < SC.members; i++) {
    const x = 40 + i * 40;
    if (i < SC.permanent) s.parts.push(`<circle cx="${x}" cy="60" r="15" fill="var(--diagram-accent)" stroke="currentColor" stroke-width="1.5"/>`);
    else s.parts.push(`<circle cx="${x}" cy="60" r="15" fill="none" stroke="var(--diagram-muted)" stroke-width="2"/>`);
  }
  s.text(120, 100, 'Permanent five (veto)', { size: 13, bold: true });
  s.text(420, 100, `Ten elected members, ${SC.termYears}-year terms, ${SC_ELECTED_EACH_YEAR} elected each year`, { size: 13 });
  s.text(320, 140, `Substantive decision: at least ${SC.needed} of ${SC.members} votes, and no permanent member votes against`, { size: 13, muted: true });
  return s.visual(
    `Fifteen seats of the Security Council: five filled seats for the permanent members with a veto, and ten open seats for elected members on two-year terms, five elected each year; a substantive decision needs at least ${SC.needed} votes and no negative vote from a permanent member`,
    'The Security Council at a glance.',
  );
})();

const vRoute1 = flow('LR', ['Why international organisations', 'From the League to the UN', 'Aims of the UN', 'Six principal organs', 'Security Council voting', 'Specialised agencies'], 'Route map of Part 1: why international organisations, from the League to the UN, aims, six principal organs, Security Council voting, specialised agencies', 'Part 1 at a glance');
const vRoute2 = flow('LR', ['Why reform after the Cold War', 'Two kinds of reform', 'Criteria and the veto debate', 'India and UN reform', 'IMF, World Bank, WTO, IAEA', 'Human rights NGOs'], 'Route map of Part 2: why reform after the Cold War, two kinds of reform, criteria and the veto debate, India and UN reform, IMF, World Bank, WTO and IAEA, and human rights NGOs', 'Part 2 at a glance');
const vNeed = table(
  ['Shared problem', 'Why one state cannot solve it alone', 'How an organisation helps'],
  [
    ['Epidemics', 'Diseases cross borders quickly', 'Early warning and common health standards'],
    ['War and conflict', 'Each side distrusts the other', 'A forum for talks and peacekeeping'],
    ['Trade and money', 'Rules must be the same for all', 'Agreed rules and a place to settle disputes'],
    ['Climate and environment', 'Pollution has no passport', 'Joint targets and shared information'],
  ],
  'Table of four shared problems (epidemics, war, trade and money, climate) with why one state cannot solve each alone and how an international organisation helps',
);
const vRoad = flow('LR', ['League of Nations, 1920', 'Second World War', 'Atlantic Charter, 1941', 'San Francisco Charter, June 1945', 'UN begins, 24 October 1945'], 'Flow from the League of Nations in 1920, through the Second World War and the Atlantic Charter of 1941, to the Charter signed at San Francisco in June 1945 and the UN beginning on 24 October 1945', 'From the League to the UN');
const vChrono = table(
  ['Event', 'Year', 'Clue for ordering'],
  [
    ['League of Nations begins work', '1920', 'After the First World War'],
    ['Atlantic Charter', '1941', 'During the Second World War'],
    ['UN Charter signed; UN begins', '1945', 'End of the Second World War'],
    ['IAEA set up', '1957', 'Atoms for peace, Cold War years'],
    ['WTO replaces GATT', '1995', 'After the Cold War'],
  ],
  'Chronology table: League of Nations 1920, Atlantic Charter 1941, UN Charter and UN 1945, IAEA 1957, WTO 1995',
  'Anchor each event to a war or era before you memorise the year.',
);
const vAims = flow('TB', ['Keep international peace and security', 'Develop friendly relations among nations', 'Cooperate on economic, social and humanitarian problems', 'Promote respect for human rights'], 'Flow listing the aims of the UN: peace and security, friendly relations, cooperation on economic, social and humanitarian problems, and respect for human rights', 'Aims of the UN (in brief)');
const vGA = table(
  ['General Assembly', 'Detail'],
  [
    ['Members', `All member states (51 in 1945, 193 today)`],
    ['Voting', 'One state, one vote; important questions need a two-thirds majority'],
    ['Work', 'Debates world issues, approves the budget, elects non-permanent Council members'],
    ['Nature of resolutions', 'Mostly recommendations'],
  ],
  'Table on the General Assembly: all member states, one state one vote, debates issues, approves the budget, elects non-permanent members, resolutions mostly recommendations',
);
const vVote = table(
  ['Draft resolution', 'Yes', 'No', 'Abstain', 'Permanent member voting no?', 'Result'],
  [
    ['A: ceasefire', String(VOTE1.yes), String(VOTE1.no), String(VOTE1.abstain), VOTE1.permanentNo ? 'Yes' : 'No', yesNo(VOTE1_PASSES)],
    ['B: aid corridor', String(VOTE2.yes), String(VOTE2.no), String(VOTE2.abstain), VOTE2.permanentNo ? 'Yes' : 'No', yesNo(VOTE2_PASSES)],
    ['C: sanctions', String(VOTE3.yes), String(VOTE3.no), String(VOTE3.abstain), VOTE3.permanentNo ? 'Yes' : 'No', `Not adopted (${VOTE3_SHORT} vote short)`],
  ],
  `Worked example table of three imagined votes in a 15-member Council: A has ${VOTE1.yes} yes but a permanent member votes no, so it is not adopted; B has ${VOTE2.yes} yes and no permanent no, so it is adopted; C has only ${VOTE3.yes} yes, ${VOTE3_SHORT} short of nine, so it is not adopted`,
  'Imagined votes. Two tests: at least nine yes, and no permanent member voting no.',
);
const vOtherOrgans = table(
  ['Organ', 'Main work', 'Remember'],
  [
    ['Economic and Social Council', 'Coordinates economic, social and humanitarian work with the agencies', 'Link to the specialised agencies'],
    ['International Court of Justice', 'Settles legal disputes between states; advisory opinions', 'Sits at The Hague'],
    ['Secretariat', 'Daily administration; headed by the Secretary-General', 'Staff serve the UN, not their own states'],
    ['Trusteeship Council', 'Supervised trust territories', 'Suspended work in 1994'],
  ],
  'Table of four principal organs: ECOSOC coordinates economic and social work, the ICJ settles legal disputes at The Hague, the Secretariat runs daily administration under the Secretary-General, and the Trusteeship Council suspended work in 1994',
);
const vAgencies = table(
  ['Specialised agency', 'Field'],
  [
    ['World Health Organization (WHO)', 'Health standards, epidemics, vaccination'],
    ['International Labour Organization (ILO)', 'Workers\' rights and labour standards'],
    ['Food and Agriculture Organization (FAO)', 'Food security and farming'],
    ['UNESCO', 'Education, science and culture'],
  ],
  'Table of four specialised agencies and their fields: WHO health, ILO labour, FAO food and farming, UNESCO education, science and culture',
  'Agencies are separate bodies linked to the UN and coordinated through ECOSOC.',
);
const vSummary1 = table(
  ['Idea', 'Key point'],
  [
    ['Why organisations', 'Cross-border problems need cooperation; a forum lowers suspicion'],
    ['Birth of the UN', 'After the League failed; UN begins 24 October 1945 with 51 members'],
    ['Principal organs', 'Assembly, Security Council, ECOSOC, ICJ, Secretariat, Trusteeship Council'],
    ['Security Council', '15 members; five permanent with a veto; nine votes for a decision'],
  ],
  'Summary table of Part 1: why organisations, birth of the UN, the six principal organs, and Security Council voting',
);
const vWhyReform = table(
  ['Then (1945)', 'Now'],
  [
    ['51 members', '193 members, many from Asia, Africa and Latin America'],
    ['Cold War rivalry ahead', 'Cold War over; new powers and new economies'],
    ['Main worry: wars between states', 'Also terrorism, civil wars, climate, disease'],
    ['Permanent five chosen by the winners of the war', 'Same permanent five today'],
  ],
  'Table comparing 1945 and now: 51 against 193 members, Cold War against a changed world, war between states against new threats, and the same permanent five',
);
const vTwoKinds = table(
  ['Kind of reform', 'Meaning', 'Example'],
  [
    ['Structures and processes', 'How the UN is organised and decides', 'Changing Security Council membership or the veto'],
    ['Jurisdiction', 'Which issues the UN should deal with', 'Terrorism, development, human rights'],
  ],
  'Table of the two kinds of UN reform: structures and processes, for example Security Council membership and the veto; and jurisdiction, for example terrorism, development and human rights',
);
const vCriteria = table(
  ['Proposed criterion', 'What it tries to measure'],
  [
    ['Major economic power', 'Capacity to contribute and influence'],
    ['Major military power', 'Capacity to keep peace'],
    ['Substantial contributor to the UN budget', 'Commitment to the organisation'],
    ['Large population', 'Weight of people represented'],
    ['Respects democracy and human rights', 'Values of the Charter'],
    ['Adds regional and cultural diversity', 'Representation of the whole world'],
  ],
  'Table of six proposed criteria for new permanent members: economic power, military power, budget contribution, large population, democracy and human rights, regional and cultural diversity',
  'Proposals made in the reform debate; no criterion has been formally adopted.',
);
const vVeto = table(
  ['Keep the veto', 'Limit or end the veto'],
  [
    ['Keeps major powers inside the UN', 'Lets one state block the will of the majority'],
    ['Decisions backed by the strong are easier to enforce', 'Leaves the Council silent in some crises'],
    ['Avoids the fate of the League', 'Reflects 1945 power, not today\'s world'],
  ],
  'Table of arguments to keep the veto (keeps major powers in, easier enforcement, avoids the League\'s fate) and to limit it (one state blocks the majority, Council silent in crises, reflects 1945)',
);
const vCandidate = table(
  ['Criterion', 'Imagined state Varunadesh', 'Meets it?'],
  [
    ['Economic power', 'Tenth-largest economy (imagined)', 'Yes'],
    ['Budget contribution', 'Among the top fifteen payers (imagined)', 'Yes'],
    ['Population', 'About 9 crore people (imagined)', 'Partly'],
    ['Democracy and rights', 'Regular elections, free press (imagined)', 'Yes'],
    ['Regional balance', 'Its region already has a permanent member', 'No'],
  ],
  'Worked example table rating an imagined state, Varunadesh, against five criteria: economic power yes, budget contribution yes, population partly, democracy yes, regional balance no',
  'Imagined state. Weigh the criteria; do not just count ticks.',
);
const vIndia = table(
  ['Arguments made for India', 'Objections raised by some states'],
  [
    ['One of the two most populous countries and the largest democracy', 'Possession of nuclear weapons'],
    ['Long record in UN peacekeeping', 'Disputes with some neighbours'],
    ['Large, growing economy; regular UN contributions', 'Doubt whether one state can speak for a whole region'],
    ['Voice for developing countries', 'Some states oppose any new permanent seats'],
  ],
  'Table of arguments made for India\'s permanent seat (population and democracy, peacekeeping, economy and contributions, voice for developing countries) and objections raised by some states (nuclear weapons, disputes with neighbours, regional representation, opposition to new permanent seats)',
  'Stated as the views of different states, not as verdicts.',
);
const vFour = table(
  ['Organisation', 'Set up', 'Main role'],
  [
    ['International Monetary Fund', '1945 (planned at Bretton Woods, 1944)', 'Global financial system; help in payments crises'],
    ['World Bank', '1945 (planned at Bretton Woods, 1944)', 'Loans and grants for development'],
    ['World Trade Organization', '1995 (after GATT, 1948)', 'Rules of world trade; trade disputes'],
    ['International Atomic Energy Agency', '1957', 'Peaceful nuclear energy; safeguard inspections'],
  ],
  'Table of the IMF and World Bank (planned at Bretton Woods in 1944), the WTO (1995, after GATT) and the IAEA (1957) with their main roles',
);
const vBW = table(
  ['', 'IMF', 'World Bank'],
  [
    ['Focus', 'Stability of the financial system', 'Long-term development'],
    ['Typical help', 'Short-term loans in payments crises; policy advice', 'Loans and grants for roads, schools, health, farming'],
    ['Voting', 'Weighted by contribution (quota)', 'Weighted by contribution'],
    ['Common criticism', 'Strict conditions on borrowers', 'Projects and conditions shaped by rich members'],
  ],
  'Comparison table of the IMF and World Bank: focus, typical help, weighted voting, and common criticisms',
);
const vWtoIaea = table(
  ['', 'WTO', 'IAEA'],
  [
    ['Purpose', 'Rules for international trade', 'Peaceful use of nuclear energy'],
    ['How it works', 'Negotiated agreements; dispute settlement', 'Technical help; inspections and safeguards'],
    ['Debate', 'Developing states say big economies set the agenda', 'Inspections need the consent of states'],
  ],
  'Comparison table of the WTO (trade rules, dispute settlement, debate about big economies) and the IAEA (peaceful nuclear energy, inspections, need for consent)',
);
const vWhich = table(
  ['Imagined need', 'Organisation to approach', 'Why'],
  [
    ['Reserves cover only one month of imports', 'IMF', 'Short-term help in a payments crisis'],
    ['Loan for hill roads and village schools', 'World Bank', 'Development finance'],
    ['A partner breaks agreed tariff rules', 'WTO', 'Trade dispute settlement'],
    ['Proof that a reactor is peaceful', 'IAEA', 'Safeguard inspections'],
    ['Journalists held without trial', 'Amnesty International or Human Rights Watch', 'Research, reports and campaigns'],
  ],
  'Worked example table matching five imagined needs to the IMF, World Bank, WTO, IAEA and human rights NGOs, with reasons',
  'Imagined needs. Match the problem to the field of the organisation.',
);
const vNgo = table(
  ['', 'Amnesty International', 'Human Rights Watch'],
  [
    ['Type', 'Non-governmental organisation', 'Non-governmental organisation'],
    ['Methods', 'Research, reports, letters and campaigns', 'Investigation, reports, media and lobbying'],
    ['Examples of concern', 'Prisoners of conscience, torture, death penalty', 'Child soldiers, landmines, abuses in conflicts'],
    ['Power', 'No power to enforce; influence through publicity', 'No power to enforce; influence through publicity'],
  ],
  'Comparison table of Amnesty International and Human Rights Watch: both NGOs, their methods, examples of their concerns, and their lack of enforcement power',
);
const vSummary2 = table(
  ['Idea', 'Key point'],
  [
    ['Why reform', 'Membership and the world changed; the permanent five did not'],
    ['Two kinds', 'Structures and processes; jurisdiction'],
    ['India', 'Seeks a permanent seat; works with Brazil, Germany and Japan; faces objections'],
    ['Other bodies', 'IMF, World Bank, WTO, IAEA; NGOs Amnesty and HRW'],
  ],
  'Summary table of Part 2: why reform, two kinds of reform, India\'s claim, and other organisations',
);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'International Organisations — Part 1: Why They Matter and How the UN Works',
  goals: [
    'Explain why states need international organisations',
    'Trace the evolution of the UN from the League of Nations',
    'Describe the six principal organs and the specialised agencies',
    'Apply the voting rules of the Security Council',
  ],
  slides: [
    sl('title', 'International Organisations', {
      b: 'Part 1 — why states create organisations, and how the **United Nations** is built.',
      v: vRoute1,
      n: 'Think about an outbreak of a new disease, a war on a border, or a dispute over trade. None of these stops at a national boundary. In this chapter we ask why states build international organisations, how the United Nations came to be, and how its main parts work. In the second part we look at calls for reform, India\'s place in that debate, and other important organisations.',
    }),
    sl('concept', 'Why international organisations?', {
      b: 'Some problems are too big for any one state.',
      v: vNeed,
      n: 'Look at the table. Diseases spread quickly across borders. Wars begin when states distrust each other. Trade needs rules that are the same for everybody. Pollution does not respect boundaries. In each case, a body where states meet regularly, share information and agree on rules makes cooperation easier and cheaper. That is the basic reason why international organisations exist.',
    }),
    sl('concept', 'Not a world government', {
      bl: [
        'Created by **states**, through agreement; works through their **consent**.',
        'Has **no army of its own**; depends on members for troops and money.',
        'Helps states **talk, cooperate and settle disputes**, but cannot guarantee peace.',
      ],
      n: 'A common mistake is to think of the United Nations as a world government. It is not. States create it, pay for it and send it soldiers when they choose. It cannot arrest leaders or abolish war. What it can do is give every state a place to talk, a set of rules and a way to act together when they agree.',
    }),
    sl('check', 'Quick check', {
      b: 'True or false? The United Nations is a world government above all sovereign states.',
      chk: 'tf_world_govt',
      n: 'Pause and decide. Remember who creates the organisation and whose consent it needs.',
    }),
    sl('diagram', 'From the League to the UN', {
      v: vRoad,
      n: 'The League of Nations began work in 1920 after the First World War, but it could not stop the Second World War. During that war the allies planned a stronger body. The Atlantic Charter of 1941 set out shared aims. In June 1945 the Charter was signed at San Francisco, and the United Nations came into existence on the twenty fourth of October 1945 with fifty one members.',
    }),
    sl('example', 'Worked example 1: ordering events', {
      b: 'Arrange five events in order without memorising every date.',
      bl: [
        'Step 1 — Anchor each event to a **war or era**: First World War, Second World War, Cold War, after the Cold War.',
        'Step 2 — Place the League first and the UN at the end of the Second World War.',
        'Step 3 — Cold War institutions such as the **IAEA** come next; the **WTO** comes after the Cold War.',
      ],
      v: vChrono,
      n: 'Chronology questions become easy if you hang each event on a big peg. The League follows the First World War. The Atlantic Charter and the UN belong to the Second World War. The IAEA, set up in 1957, belongs to the Cold War years. The WTO, from 1995, comes after the Cold War. Use the eras first, then the years.',
    }),
    sl('concept', 'Aims of the UN', {
      v: vAims,
      n: 'The Charter gives the UN a few broad aims. The first is to keep international peace and security. Others are to develop friendly relations among nations, to cooperate in solving economic, social and humanitarian problems, and to promote respect for human rights. Every organ we study next serves one or more of these aims.',
    }),
    sl('check', 'Quick check', {
      b: 'On which date did the United Nations come into existence?',
      chk: 'm_un_founded',
      n: 'Think about the difference between signing the Charter and the organisation actually beginning.',
    }),
    sl('diagram', 'Six principal organs', {
      v: vOrgans,
      n: 'The Charter set up six principal organs. Above the Charter in this diagram are the General Assembly, the Security Council and the Economic and Social Council. Below are the International Court of Justice, the Secretariat and the Trusteeship Council. The Trusteeship Council is drawn with a dashed line because it suspended its work in 1994, when the last trust territory became independent.',
    }),
    sl('concept', 'The General Assembly', {
      v: vGA,
      n: 'The General Assembly is the one place where every member sits. Each state has one vote, whether it is large or small, rich or poor. It debates world issues, approves the budget and elects the non permanent members of the Security Council. Most of its resolutions are recommendations, which carry moral and political weight but are not orders.',
    }),
    sl('diagram', 'The Security Council', {
      v: vSeats,
      n: 'The Security Council has fifteen members. Five are permanent: the United States, the United Kingdom, France, Russia and China. Each of them holds a veto. The other ten are elected by the General Assembly for two year terms, five each year. A substantive decision needs at least nine votes in favour and no vote against from a permanent member.',
    }),
    sl('example', 'Worked example 2: will the resolution pass?', {
      b: 'Apply two tests to each imagined vote.',
      bl: [
        `Test 1 — Are there at least **${SC.needed}** votes in favour?`,
        'Test 2 — Did any **permanent member vote no**? If yes, it is a veto.',
        'An **abstention** by a permanent member is not treated as a veto.',
      ],
      v: vVote,
      n: 'Let us apply the rules. Resolution A has eleven votes in favour, but a permanent member voted against, so it fails. Resolution B has exactly nine votes in favour and no permanent member voted no, so it passes. Resolution C has eight votes in favour and nobody voted no, but it is still one vote short of nine, so it fails.',
    }),
    sl('check', 'Quick check', {
      b: 'What is the minimum number of votes in favour that a substantive resolution needs?',
      chk: 'n_votes_needed',
      n: 'Use the rule from the worked example and remember the size of the Council.',
    }),
    sl('concept', 'The other principal organs', {
      v: vOtherOrgans,
      n: 'The Economic and Social Council coordinates work on economic and social questions and links the UN with its specialised agencies. The International Court of Justice at The Hague settles legal disputes between states. The Secretariat, headed by the Secretary General, runs the daily work. The Trusteeship Council once supervised trust territories and has been inactive since 1994.',
    }),
    sl('concept', 'Specialised agencies', {
      v: vAgencies,
      n: 'Around the principal organs is a family of specialised agencies. Each is a separate organisation with its own members and budget, linked to the UN by agreement. The World Health Organization works on health, the International Labour Organization on workers, the Food and Agriculture Organization on food and farming, and UNESCO on education, science and culture.',
    }),
    sl('check', 'Quick check', {
      b: 'Which principal organ does an official who runs the daily administration of the UN work for?',
      chk: 'm_secretariat',
      n: 'Think about which organ is made up of staff rather than member states.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up. Shared problems push states to cooperate through organisations. The UN replaced the failed League in 1945 with fifty one members. It has six principal organs, of which the Trusteeship Council is now inactive. The Security Council has fifteen members, five permanent with a veto, and needs nine votes for a decision.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Do not call the UN a **world government**: it works through member states.',
        'Write the full **six** organs; mention that the Trusteeship Council is **inactive since 1994**.',
        'For voting questions, apply **two tests**: nine votes, and no permanent member voting no.',
        'Assembly = **one state, one vote**; IMF and World Bank = **weighted** votes.',
        'Marks: 2 marks = two points; 3 marks = three points on clear bases; 5 marks = five organs or points.',
      ],
      n: 'A few tips. Never describe the UN as a world government. When asked for the principal organs, give all six and note that the Trusteeship Council is inactive. For voting questions, check both conditions: nine votes and no veto. Do not mix up the equal vote in the General Assembly with the weighted votes in the financial institutions. Match the number of points to the marks.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'International Organisations — Part 2: Reform, India and Other Organisations',
  goals: [
    'Explain why the UN needs reform after the Cold War and the two kinds of reform',
    'Evaluate proposals for Security Council reform, including the veto',
    'Describe India\'s position on UN reform, with arguments and objections',
    'State the roles of the IMF, World Bank, WTO, IAEA, Amnesty International and Human Rights Watch',
  ],
  slides: [
    sl('title', 'Reform, India and other organisations', {
      b: 'Part 2 — why the UN is being asked to **change**, where **India** stands, and the work of **other organisations**.',
      v: vRoute2,
      n: 'The UN of 1945 was built for the world of 1945. Since then, the number of states has grown nearly fourfold, the Cold War has ended and new problems have appeared. In this part we look at why reform is demanded, what kinds of reform are proposed, India\'s claim to a permanent seat, and the work of other important organisations.',
    }),
    sl('concept', 'Why reform after the Cold War?', {
      v: vWhyReform,
      n: 'Compare 1945 with today. The UN began with fifty one members; today it has one hundred and ninety three, many from Asia, Africa and Latin America. The Cold War is over, new economies have risen, and threats now include terrorism, civil wars, climate change and disease. Yet the same five permanent members sit on the Security Council. This gap is the heart of the reform debate.',
    }),
    sl('concept', 'Two kinds of reform', {
      v: vTwoKinds,
      n: 'Reform is discussed under two heads. The first is reform of structures and processes: how the UN is organised and how it decides, for example who sits on the Security Council and whether the veto should change. The second is jurisdiction: which issues the UN should take up, such as terrorism, development or human rights.',
    }),
    sl('check', 'Quick check', {
      b: 'Name the two broad parts of the UN reform debate.',
      chk: 'm_reform_two',
      n: 'One part is about how the UN is organised; the other is about what it deals with.',
    }),
    sl('concept', 'Criteria for new permanent members', {
      v: vCriteria,
      n: 'If new permanent members are added, who should they be? Proposals in the debate include being a major economic or military power, contributing substantially to the UN budget, having a large population, respecting democracy and human rights, and adding to the regional and cultural diversity of the Council. None of these has been formally adopted, and each is disputed.',
    }),
    sl('concept', 'The veto debate', {
      v: vVeto,
      n: 'The veto is the most argued feature of the Council. Supporters say it keeps the major powers inside the organisation and makes decisions easier to enforce, avoiding the fate of the League. Critics say it lets one state block the wishes of the majority and reflects the power balance of 1945. Changing it would itself need the agreement of the permanent members.',
    }),
    sl('example', 'Worked example 1: weighing a candidate', {
      b: 'Rate an imagined state against the proposed criteria.',
      bl: [
        'Step 1 — List each criterion and the evidence for the state.',
        'Step 2 — Mark **yes, partly or no**.',
        'Step 3 — **Weigh** them: some states stress regional balance, others economic weight.',
        'Step 4 — Conclude with reasons, not just a count of ticks.',
      ],
      v: vCandidate,
      n: 'Here is an imagined state, Varunadesh. It has a large economy, pays a lot into the UN budget and holds regular elections. Its population is moderate, and its region already has a permanent member. A good answer does not just count ticks. It explains which criteria matter more and why, and admits that other states may weigh them differently.',
    }),
    sl('concept', 'India and UN reform', {
      v: vIndia,
      n: 'India supports a more representative Security Council and seeks a permanent seat. Arguments made for it include its very large population and democracy, its long record in peacekeeping, its growing economy and its regular contributions. India works with Brazil, Germany and Japan, who seek seats too. Some states raise objections, and some oppose any new permanent seats, so the debate continues.',
    }),
    sl('check', 'Quick check', {
      b: 'Which reason is most consistent with the view of states that oppose any new permanent members?',
      chk: 'm_objection',
      n: 'Think about what a new permanent seat, especially with a veto, would do to equality among members.',
    }),
    sl('concept', 'The UN and a dominant power', {
      bl: [
        'After the Cold War, one power had unmatched military and economic strength.',
        'A **large budget share** and a **veto** give a powerful member leverage.',
        'Yet the UN remains the main **forum where all states can speak**, and powers often seek its approval.',
      ],
      n: 'After the Cold War, some observers worried that a single dominant power could bend the UN to its will, since it paid a large share of the budget and held a veto. Others pointed out that even a powerful state values the legitimacy the UN provides. For smaller states, the UN remains the main place where their voice can be heard.',
    }),
    sl('diagram', 'Other international organisations', {
      v: vFour,
      n: 'Beyond the principal organs, four organisations appear often in your syllabus. The International Monetary Fund and the World Bank were planned at Bretton Woods in 1944. The World Trade Organization was set up in 1995, following the earlier GATT framework. The International Atomic Energy Agency was set up in 1957 to promote peaceful nuclear energy.',
    }),
    sl('concept', 'IMF and World Bank', {
      v: vBW,
      n: 'The IMF looks after the stability of the global financial system and lends to countries in a payments crisis, often with conditions. The World Bank finances long term development such as roads, schools and health. In both, votes are weighted by each member\'s financial contribution, so rich members have more say. This is a common criticism from developing countries.',
    }),
    sl('concept', 'WTO and IAEA', {
      v: vWtoIaea,
      n: 'The World Trade Organization sets the rules of international trade and settles trade disputes. Developing countries often say that big economies set its agenda. The International Atomic Energy Agency helps countries use nuclear technology for power, medicine and farming, and its inspectors check that nuclear material is not turned into weapons.',
    }),
    sl('example', 'Worked example 2: which organisation?', {
      b: 'Match each imagined need to the right organisation.',
      bl: [
        'Step 1 — Identify the **field**: money, development, trade, nuclear or rights.',
        'Step 2 — Recall the organisation for that field.',
        'Step 3 — Give a one-line reason.',
      ],
      v: vWhich,
      n: 'Here are five imagined needs. A country whose reserves cover only a month of imports goes to the IMF. One that wants a loan for hill roads goes to the World Bank. A dispute over tariff rules goes to the WTO. Proof that a reactor is peaceful comes from the IAEA. Journalists held without trial attract the attention of human rights NGOs.',
    }),
    sl('concept', 'Human rights NGOs', {
      v: vNgo,
      n: 'Amnesty International and Human Rights Watch are not part of the UN and are not run by governments. They are non governmental organisations. They investigate abuses, publish reports, work with the media and lobby governments. They cannot enforce anything, but their publicity can put strong pressure on governments to change.',
    }),
    sl('check', 'Quick check', {
      b: 'Which organisation best fits this description: an NGO that researches abuses such as the use of child soldiers and lobbies governments?',
      chk: 'm_hrw',
      n: 'Look for the clue that it is a non governmental organisation based in New York.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up. The world has changed since 1945 but the permanent five have not, so reform is demanded in structures and in jurisdiction. Proposals for new permanent members and the veto are disputed. India seeks a permanent seat and faces objections from some states. The IMF, World Bank, WTO and IAEA have specialised roles, while NGOs work through publicity.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'For reform, name **both kinds**: structures and processes, and jurisdiction.',
        'For evaluation questions, give **both sides** and a reasoned view; any side is accepted with reasons.',
        'India\'s case: population and democracy, peacekeeping, economy, contributions; add the objections raised.',
        'Do not call Amnesty or HRW **UN bodies**: they are **NGOs**.',
        'IMF = financial stability; World Bank = development; WTO = trade rules; IAEA = nuclear safeguards.',
      ],
      n: 'Some final tips. When asked about reform, name both kinds. In evaluation questions, examiners reward balance: give arguments for and against, then a reasoned view. For India\'s claim, list the grounds and also mention the objections. Never call Amnesty International or Human Rights Watch part of the UN. And keep the four organisations\' fields clearly separate.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'International Organisations — Notes',
  sections: [
    {
      h: '1. Why international organisations?',
      t: 1,
      b: 'An **international organisation** is a body set up by **states, through agreement**, to help them cooperate. It is **not a world government**: it acts through the consent of its members and has no army of its own.\n\n**Why needed:**\n- Many problems (epidemics, conflict, trade, climate) **cross borders**.\n- A permanent body gives **rules, information and a meeting place**, which lowers distrust and the cost of each negotiation.\n- It offers **smaller states a voice**.\n\nThey cannot abolish war, but they make cooperation and peaceful settlement more likely.',
      terms: [
        ['International organisation', 'A body created by agreement among states to help them cooperate on shared problems.'],
        ['Sovereign state', 'A state with supreme authority over its own territory, which joins organisations by its own choice.'],
      ],
      v: vNeed,
    },
    {
      h: '2. Evolution of the UN',
      t: 2,
      b: '- The **League of Nations** (1920) was formed after the First World War but failed to prevent the Second.\n- During that war the allies planned a new body; the **Atlantic Charter** (1941) set out common aims.\n- The **UN Charter** was signed at the **San Francisco** conference in **June 1945**.\n- The UN came into existence on **24 October 1945** (UN Day) with **51** members; today it has **193**.\n- **India** was one of the founding members.\n\n**Aims:** maintain international peace and security; develop friendly relations among nations; cooperate on economic, social and humanitarian problems; promote human rights.',
      terms: [
        ['League of Nations', 'The organisation set up after the First World War; it failed to stop the Second World War.'],
        ['UN Charter', 'The founding treaty of the UN, signed at San Francisco in June 1945.'],
      ],
      v: vRoad,
      vs: [vChrono],
    },
    {
      h: '3. Principal organs and specialised agencies',
      t: 2,
      b: '1. **General Assembly:** all members; **one state, one vote**; debates, budget, elections; resolutions mostly **recommendations**.\n2. **Security Council:** **15 members**: **5 permanent** (USA, UK, France, Russia, China) with a **veto**, **10 non-permanent** elected by the Assembly for **two-year terms** (five each year). A substantive decision needs **9 votes** and **no negative vote** by a permanent member; an abstention is not a veto.\n3. **Economic and Social Council (ECOSOC):** economic and social cooperation; coordinates specialised agencies.\n4. **International Court of Justice:** at **The Hague**; legal disputes between states; advisory opinions.\n5. **Secretariat:** administration; headed by the **Secretary-General**, appointed by the Assembly on the Council\'s recommendation.\n6. **Trusteeship Council:** supervised trust territories; **suspended operations in 1994**.\n\n**Specialised agencies** (WHO, ILO, FAO, UNESCO and others) are separate organisations linked to the UN and coordinated through ECOSOC.',
      terms: [
        ['Veto', 'The power of each permanent member to block a substantive Security Council decision by voting against it.'],
        ['Specialised agency', 'An autonomous organisation working in one field, linked to the UN by agreement.'],
      ],
      v: vOrgans,
      vs: [vSeats, vAgencies],
    },
    {
      h: '4. Reform of the UN after the Cold War',
      t: 3,
      b: '**Why:** membership has grown from 51 to 193; the Cold War is over; new powers and new threats (terrorism, civil wars, climate, disease) have emerged; but the **permanent five** remain those of 1945.\n\n**Two kinds of reform:**\n- **Structures and processes:** membership of the Security Council, the veto, working methods.\n- **Jurisdiction:** which issues the UN should take up.\n\n**Proposed criteria for new permanent members** (debated, none adopted): major economic power; major military power; substantial budget contribution; large population; respect for democracy and human rights; adding regional and cultural diversity.\n\n**The veto:** supporters say it keeps great powers committed and makes action enforceable; critics call it undemocratic and outdated. Changing the Charter needs the agreement of the permanent members.\n\n**A dominant power:** after the Cold War, concern grew that one powerful member could shape the UN through its budget share and veto; yet the UN remains the main forum for all states.',
      terms: [
        ['Jurisdiction', 'The range of issues on which an organisation may act.'],
        ['Permanent member', 'One of five states with a permanent Security Council seat and a veto.'],
      ],
      v: vTwoKinds,
      vs: [vCriteria, vVeto],
    },
    {
      h: '5. India and UN reform',
      t: 3,
      b: 'India supports a **stronger, more representative UN** with an **expanded Security Council** in both categories, and seeks a **permanent seat**. It works with **Brazil, Germany and Japan** (the G4), which also seek seats.\n\n**Grounds put forward:** one of the two most populous countries and the largest democracy; long participation in **UN peacekeeping**; a large and growing economy and regular contributions; a voice for developing countries; it has served as an **elected member several times** (most recently 2021–22).\n\n**Objections raised by some states:** possession of nuclear weapons; disputes with neighbours; doubts about regional representation; and a group of states that opposes **any** new permanent seats and prefers more elected seats.\n\nThese are positions held by different states; examiners expect both sides.',
      terms: [
        ['G4', 'Brazil, Germany, India and Japan, which support each other\'s bids for permanent seats.'],
      ],
      v: vIndia,
      vs: [vCandidate],
    },
    {
      h: '6. Other international organisations',
      t: 4,
      b: '- **IMF:** planned at **Bretton Woods (1944)**; oversees the international financial system, advises on policy and lends in **payments crises**; votes weighted by **quota**.\n- **World Bank:** also from Bretton Woods; loans and grants for **development** (infrastructure, education, health, agriculture, environment, governance); criticised for conditions.\n- **WTO:** set up in **1995** as the successor to **GATT (1948)**; rules of world trade and **dispute settlement**; developing countries say major economies dominate.\n- **IAEA:** set up in **1957**; promotes **peaceful nuclear energy** and runs **safeguard inspections**.\n- **Amnesty International:** an **NGO** that researches abuses, publishes reports and campaigns for human rights.\n- **Human Rights Watch:** an **NGO** based in New York; investigation, media and lobbying, for example against **child soldiers and landmines**.\n\nNGOs have **no enforcement power**; their influence comes from publicity.',
      terms: [
        ['Bretton Woods institutions', 'The IMF and the World Bank, planned at the 1944 Bretton Woods conference.'],
        ['NGO', 'A non-governmental organisation, independent of states, working through research and advocacy.'],
      ],
      v: vFour,
      vs: [vBW, vWtoIaea, vNgo],
    },
  ],
  tips: '**Common mistakes**\n- Calling the UN a world government, or saying it has its own army.\n- Listing five organs and forgetting the **Trusteeship Council** (inactive since 1994).\n- Saying an abstention by a permanent member is a veto: it is **not**.\n- Treating General Assembly resolutions as binding orders.\n- Calling Amnesty International or Human Rights Watch UN agencies: they are **NGOs**.\n- Giving only one side in reform and veto questions.\n\n**How marks are usually awarded**\n- 1 mark: one correct option or term.\n- 2 marks: two points, or one argument on each side.\n- 3 marks: three points on clear bases (membership, voting, powers).\n- 5 marks: five points, with both sides and a reasoned conclusion where asked.\n- Source-based: quote or point to the line, then explain.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['What is an **international organisation**?', 'A body set up by **states through agreement** to help them cooperate; not a world government.', 'definition', 1],
  ['Two reasons states need international organisations', 'Cross-border problems need joint action; a forum with rules lowers distrust.', 'concept', 1],
  ['Does the UN have its own army?', '**No**: peacekeepers are troops **sent by member states**.', 'fact', 1],
  ['Predecessor of the UN', 'The **League of Nations** (1920), which failed to prevent the Second World War.', 'fact', 2],
  ['Where and when was the UN Charter signed?', 'At **San Francisco**, in **June 1945**.', 'fact', 2],
  ['When did the UN come into existence?', '**24 October 1945** (UN Day).', 'fact', 2],
  ['Founding and present members', '**51** in 1945; **193** today.', 'fact', 2],
  ['The six principal organs', 'General Assembly, Security Council, ECOSOC, ICJ, Secretariat, Trusteeship Council.', 'fact', 2],
  ['Voting in the General Assembly', '**One state, one vote**; resolutions mostly recommendations.', 'concept', 2],
  ['Composition of the Security Council', '15 members: **5 permanent** with veto, **10 elected** for two-year terms.', 'fact', 2],
  ['The permanent five', 'USA, UK, France, Russia, China.', 'fact', 2],
  ['Votes needed for a substantive Council decision', '**9 of 15**, with no permanent member voting against.', 'concept', 2],
  ['Is an abstention by a permanent member a veto?', '**No** (by practice).', 'exam-tip', 2],
  ['Where does the ICJ sit?', '**The Hague**; it settles legal disputes between states.', 'fact', 2],
  ['Why is the Trusteeship Council inactive?', 'The last trust territory became independent in **1994**.', 'fact', 2],
  ['Who heads the Secretariat?', 'The **Secretary-General**.', 'fact', 2],
  ['Two specialised agencies and their fields', 'WHO: health. ILO: labour. (Also FAO: food; UNESCO: education, science, culture.)', 'example', 2],
  ['Two kinds of UN reform', '**Structures and processes**; **jurisdiction** (issues dealt with).', 'concept', 3],
  ['Main reason for demanding Council reform', 'Membership grew from 51 to 193, but the **permanent five** are unchanged since 1945.', 'concept', 3],
  ['Three proposed criteria for new permanent members', 'Economic power; budget contribution; democracy and human rights (also population, military power, diversity).', 'concept', 3],
  ['One argument for and one against the veto', 'For: keeps great powers in. Against: one state can block the majority.', 'concept', 3],
  ['India\'s partners in seeking permanent seats', '**Brazil, Germany and Japan** (the G4).', 'fact', 3],
  ['Grounds for India\'s claim', 'Population and democracy; peacekeeping record; economy and contributions; voice of developing countries.', 'concept', 3],
  ['Objections raised to India\'s claim', 'Nuclear weapons; disputes with neighbours; regional representation; opposition to any new permanent seats.', 'concept', 3],
  ['IMF: role', 'Stability of the financial system; loans in **payments crises**; votes weighted by quota.', 'definition', 4],
  ['World Bank: role', 'Loans and grants for **development** projects.', 'definition', 4],
  ['Bretton Woods institutions', 'The **IMF** and the **World Bank** (conference of 1944).', 'fact', 4],
  ['WTO', 'Set up in **1995**, successor to **GATT**; trade rules and disputes.', 'fact', 4],
  ['IAEA', 'Set up in **1957**; peaceful nuclear energy and **safeguard inspections**.', 'fact', 4],
  ['Amnesty International and Human Rights Watch', '**NGOs** that research, report and campaign on human rights; no enforcement power.', 'definition', 4],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-12-political-science-chapter-test-short',
  title: 'Chapter test (short) — International Organisations',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_io_why', 'm_veto', 'm_wb', 'ar_reform'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and the 3-mark question in about 50–80 words.', items: ['s_sc_comp', 's_imf_wb', 's3_ga_sc'] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer any ONE of the two questions in about 80–120 words.', items: [{ attempt: 1, keys: ['l_un_organs', 'l_other_orgs'] }] },
    { id: 'D', title: 'Section D — Source-based (4 marks)', instr: 'Read the source and answer all parts. Part (c) has an internal choice.', items: ['sb_mun_vote'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-12-political-science-chapter-test-long',
  title: 'Chapter test (long) — International Organisations',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_io_meaning', 'm_league', 'm_icj', 'm_reform_why', 'm_criteria', 'm_india_claim', 'm_wto', 'm_iaea', 'ar_league_failed', 'ar_ngo'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and 3-mark questions in about 50–80 words. Questions 13 and 15 have an internal choice.', items: ['s_why_io', 's_reform_two', { attempt: 1, keys: ['s_veto_for', 's_ngo_role'] }, 's3_india_case', { attempt: 1, keys: ['s3_wto', 's3_criteria'] }] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer question 16, and any ONE of questions 17 and 18, in about 80–120 words each.', items: ['l_reform_debate', { attempt: 1, keys: ['l_un_success', 'l_india_reform'] }] },
    { id: 'D', title: 'Section D — Source-based (4 marks each)', instr: 'Read each source and answer all parts. Part (c) of each has an internal choice.', items: ['sb_editorial', 'sb_delegate_diary'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t04 of cbse-12-political-science-ch04 only (meaning of international organisations; evolution and organs of the UN; reform and India; IMF, World Bank, WTO, IAEA, Amnesty International, Human Rights Watch)',
    originality: 'every source, scenario and imagined state written by SOYL and labelled; no NCERT text, box, cartoon or exercise and no board or sample-paper item reused (D-036)',
    data: `Security Council arithmetic computed in the build: ${SC.permanent} + ${SC.elected} = ${SC.members}; ${SC.elected} ÷ ${SC.termYears} = ${SC_ELECTED_EACH_YEAR} elected each year; imagined votes ${VOTE1.yes}/${VOTE1.no}/${VOTE1.abstain} with a permanent no (fails), ${VOTE2.yes}/${VOTE2.no}/${VOTE2.abstain} (passes), ${VOTE3.yes}/${VOTE3.no}/${VOTE3.abstain} (${VOTE3_SHORT} short)`,
    facts: 'stable facts only: League 1920, Atlantic Charter 1941, Charter June 1945, UN 24 October 1945, 51 and 193 members, six organs, Trusteeship Council suspended 1994, Bretton Woods 1944, WTO 1995 after GATT 1948, IAEA 1957; no current office-holder or statistic',
    gate: 'schema, pipeline lint, deterministic verify, word limits, narration and answer-leak checks run clean in this build',
  },
});
