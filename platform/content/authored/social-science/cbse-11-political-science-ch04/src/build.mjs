// Build CBSE 11 Political Science ch04 Executive. Run from platform/:
//   npx tsx content/authored/social-science/cbse-11-political-science-ch04/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from '../../cbse-11-political-science-ch01/src/lib.mjs';

setUnit('cbse-11-political-science-ch04', 'social-science');
await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- SVG figures (no maps)
const vTypes = (() => {
  const s = new Svg(760, 300);
  const cols = [
    [160, 'Presidential', 'blue'],
    [360, 'Parliamentary', 'green'],
    [560, 'Semi-presidential', 'brown'],
  ];
  cols.forEach(([x, name, col]) => {
    s.rect(x, 12, 190, 36, { color: col, sw: 2 });
    s.text(x + 95, 30, name, { bold: true, size: 15, color: col });
  });
  const rows = [
    ['Example', 'United States', 'United Kingdom, India', 'France'],
    ['Head of state', 'The President', 'Nominal head', 'Elected President'],
    ['Head of government', 'The President', 'Prime Minister', 'Prime Minister'],
    ['Answerable to', 'Voters, fixed term', 'The legislature', 'PM: the legislature'],
  ];
  rows.forEach(([label, a, b, c], i) => {
    const y = 62 + i * 58;
    s.text(80, y + 24, label, { bold: true, size: 13, muted: true });
    [a, b, c].forEach((txt, j) => {
      const x = cols[j][0];
      s.rect(x, y, 190, 48, { color: 'muted', sw: 1.5, rx: 6 });
      s.text(x + 95, y + 24, txt, { size: 13 });
    });
  });
  s.text(380, 290, 'PM stands for Prime Minister', { size: 11, muted: true });
  return s.visual('Comparison chart of three types of executive. Presidential, for example the United States: the President is head of state and of government and is answerable to voters for a fixed term. Parliamentary, for example the United Kingdom and India: a nominal head of state, a Prime Minister who is answerable to the legislature. Semi-presidential, for example France: an elected President and a Prime Minister who is answerable to the legislature', 'Three types of executive compared.');
})();

const vElection = (() => {
  const s = new Svg(760, 310);
  const left = [
    ['Elected members', 'of the Lok Sabha'],
    ['Elected members', 'of the Rajya Sabha'],
    ['Elected members of the State', 'Legislative Assemblies, with', 'Delhi and Puducherry'],
  ];
  left.forEach((lines, i) => {
    const y = 15 + i * 82;
    s.rect(10, y, 260, 70, { color: 'blue', sw: 2 });
    lines.forEach((ln, j) => s.text(140, y + (lines.length === 2 ? 26 : 17) + j * 19, ln, { size: 13 }));
    s.arrow(270, y + 35, 308, 125, { sw: 1.6 });
  });
  s.rect(310, 90, 140, 70, { color: 'accent', sw: 2.5 });
  s.text(380, 115, 'Electoral', { bold: true, size: 15, color: 'accent' });
  s.text(380, 135, 'college', { bold: true, size: 15, color: 'accent' });
  s.arrow(450, 125, 490, 70, { sw: 1.8 });
  s.rect(490, 20, 260, 80, { color: 'green', sw: 2 });
  ['Secret ballot using', 'proportional representation', 'by single transferable vote'].forEach((ln, j) => s.text(620, 40 + j * 20, ln, { size: 13 }));
  s.arrow(620, 100, 620, 140, { sw: 1.8 });
  s.rect(490, 140, 260, 70, { color: 'brown', sw: 2 });
  s.text(620, 165, 'The President is elected', { bold: true, size: 14, color: 'brown' });
  s.text(620, 188, 'for a term of five years', { size: 13 });
  s.text(380, 280, 'Nominated members of either House do not vote in this election', { size: 13, muted: true });
  return s.visual('Flow of the election of the President of India: the elected members of the Lok Sabha, the elected members of the Rajya Sabha and the elected members of the State Legislative Assemblies, including Delhi and Puducherry, form the electoral college; they vote by secret ballot using proportional representation by single transferable vote; the President is elected for five years; nominated members do not vote', 'How the President is elected.');
})();

const vUnion = (() => {
  const s = new Svg(760, 400);
  s.rect(140, 12, 240, 54, { color: 'brown', sw: 2.5 });
  s.text(260, 30, 'President', { bold: true, size: 15, color: 'brown' });
  s.text(260, 51, 'nominal head of state', { size: 13 });
  s.rect(440, 12, 200, 54, { color: 'muted', sw: 1.5 });
  s.text(540, 30, 'Vice-President', { bold: true, size: 14 });
  s.text(540, 51, 'acts if office is vacant', { size: 12 });
  s.line(380, 39, 440, 39, { sw: 1.4, color: 'muted', dash: true });
  s.arrow(260, 66, 260, 96, { sw: 1.8 });
  s.text(300, 82, 'appoints', { size: 12, muted: true });
  s.rect(140, 96, 240, 54, { color: 'accent', sw: 2.5 });
  s.text(260, 114, 'Prime Minister', { bold: true, size: 15, color: 'accent' });
  s.text(260, 135, 'head of government', { size: 13 });
  s.arrow(260, 150, 260, 172, { sw: 1.8 });
  s.rect(30, 172, 460, 130, { color: 'blue', sw: 2 });
  s.text(260, 190, 'Council of Ministers', { bold: true, size: 15, color: 'blue' });
  [
    [45, 150, ['Cabinet Ministers', 'the inner group']],
    [205, 130, ['Ministers', 'of State']],
    [345, 130, ['Deputy', 'Ministers']],
  ].forEach(([x, w, lines]) => {
    s.rect(x, 212, w, 74, { color: 'muted', sw: 1.5, rx: 6 });
    lines.forEach((ln, j) => s.text(x + w / 2, 236 + j * 22, ln, { size: 13 }));
  });
  s.rect(560, 205, 190, 56, { color: 'green', sw: 2 });
  s.text(655, 224, 'Lok Sabha', { bold: true, size: 15, color: 'green' });
  s.text(655, 245, 'majority support', { size: 13 });
  s.arrow(490, 232, 560, 232, { sw: 1.8 });
  s.text(525, 216, 'answers to', { size: 11, muted: true });
  s.arrow(260, 302, 260, 332, { sw: 1.8 });
  s.text(310, 317, 'implement', { size: 12, muted: true });
  s.rect(80, 332, 360, 54, { color: 'red', sw: 2 });
  s.text(260, 350, 'Ministries and departments', { bold: true, size: 14, color: 'red' });
  s.text(260, 371, 'run by civil servants', { size: 13 });
  return s.visual('Structure chart of the Union executive: the President is the nominal head of state and the Vice-President acts if the office is vacant; the President appoints the Prime Minister, the head of government; the Council of Ministers has Cabinet Ministers, the inner group, Ministers of State and Deputy Ministers and answers to the Lok Sabha; ministries and departments run by civil servants implement policy', 'The Union executive at a glance.');
})();

const vServices = (() => {
  const s = new Svg(760, 330);
  s.rect(230, 12, 300, 46, { color: 'accent', sw: 2.5 });
  s.text(380, 28, 'Civil services', { bold: true, size: 15, color: 'accent' });
  s.text(380, 47, 'the permanent executive', { size: 13 });
  const cols = [
    [15, 'All India Services', 'blue', ['IAS, IPS and others', 'Recruited by the Union', 'Serve in the states']],
    [265, 'Central Services', 'green', ['Foreign and revenue', 'services, for example', 'Serve the Union']],
    [515, 'State Services', 'brown', ['Posts of a state', 'Recruited by the State', 'Public Service Commission']],
  ];
  cols.forEach(([x, name, col, lines]) => {
    s.line(380, 58, x + 115, 100, { sw: 1.5, color: 'muted' });
    s.rect(x, 100, 230, 40, { color: col, sw: 2 });
    s.text(x + 115, 120, name, { bold: true, size: 15, color: col });
    s.rect(x, 140, 230, 90, { color: col, sw: 1.5, rx: 6 });
    lines.forEach((ln, j) => s.text(x + 115, 165 + j * 25, ln, { size: 13 }));
  });
  s.rect(80, 252, 600, 62, { color: 'muted', sw: 1.5, rx: 6 });
  s.text(380, 272, 'Union Public Service Commission: Union and All India Services', { size: 13 });
  s.text(380, 294, 'State Public Service Commissions: state services; members have security of tenure', { size: 13 });
  return s.visual('Structure chart of the civil services: the permanent executive has three categories. All India Services, such as the Indian Administrative Service and the Indian Police Service, are recruited by the Union and serve in the states. Central Services serve the Union government. State Services are recruited by a State Public Service Commission. The Union Public Service Commission recruits for the Union and All India Services; members of the Commissions have security of tenure', 'The three categories of civil services.');
})();

// ---------------------------------------------------------------- tables and flows
const vTerms = table(
  ['Term', 'Meaning'],
  [
    ['Executive', 'The organ of government that implements laws and policies'],
    ['Political executive', 'The elected and temporary part: ministers and the head of government'],
    ['Permanent executive', 'Civil servants, who stay in service when governments change'],
  ],
  'Table of terms: the executive implements laws and policies; the political executive is the elected and temporary ministers and head of government; the permanent executive is the civil servants',
);
const vClassify = table(
  ['Imagined country', 'Features', 'Type'],
  [
    ['Arvelia', 'Directly elected President leads state and government; fixed term', 'Presidential'],
    ['Brendoria', 'Chancellor needs the Assembly majority; ceremonial head of state', 'Parliamentary'],
    ['Calvaris', 'Directly elected President and a Prime Minister answerable to the Council', 'Semi-presidential'],
  ],
  'Worked example table classifying three imagined countries: Arvelia is presidential, Brendoria is parliamentary and Calvaris is semi-presidential',
  'Ask: who is head of government, and to whom is that person answerable?',
);
const vIndiaNominal = flow('LR', ['Executive power is vested in the President', 'It is exercised in the President\'s name', 'In practice the Council of Ministers exercises it', 'The President is the nominal head'], 'Flow: executive power is vested in the President and exercised in the President\'s name, but in practice the Council of Ministers exercises it, so the President is the nominal head', 'Nominal and real executive');
const vCollege = table(
  ['Point', 'President of India'],
  [
    ['Election', 'Indirect, by an electoral college'],
    ['Who votes', 'Elected members of both Houses and of the State Legislative Assemblies, with Delhi and Puducherry'],
    ['Who does not', 'Nominated members; members of Legislative Councils; ordinary voters'],
    ['Method', 'Proportional representation by single transferable vote; secret ballot'],
    ['Term and removal', 'Five years; impeachment for violation of the Constitution'],
  ],
  'Table about the election of the President: indirect election by an electoral college of elected members of both Houses and of State Legislative Assemblies, with Delhi and Puducherry; nominated members and ordinary voters do not vote; proportional representation by single transferable vote; five-year term; impeachment for violating the Constitution',
);
const vPowers = table(
  ['Kind of power', 'Examples'],
  [
    ['Executive', 'Appoints the Prime Minister, judges, Governors and other officials'],
    ['Legislative', 'Gives assent to bills; issues ordinances; addresses Parliament'],
    ['Financial', 'A money bill is introduced only on the President\'s recommendation'],
    ['Emergency', 'Can proclaim an emergency, on the advice of the Council of Ministers'],
  ],
  'Table of the powers of the President: executive, such as appointing the Prime Minister, judges and Governors; legislative, such as assent to bills and ordinances; financial, such as recommending money bills; emergency powers',
  'All exercised on the advice of the Council of Ministers.',
);
const vAdvice = flow('LR', ['1950: the Constitution begins; the President acts on advice in practice', '1976, 42nd Amendment: the advice is binding', '1978, 44th Amendment: the President may return the advice once', 'If it is sent back, the President must act on it'], 'Flow: from 1950 the President acts on advice in practice, the 42nd Amendment in 1976 makes the advice binding, the 44th Amendment in 1978 lets the President return it once, and if it is sent back the President must act on it', 'Advice of the ministers');
const vHungEx = table(
  ['Step in the imagined situation', 'What happens'],
  [
    ['1. Result', 'Three alliances win fewer than half the seats in the Lok Sabha'],
    ['2. Consultation', 'The President meets the leaders and asks for letters of support'],
    ['3. Choice', 'The President invites the leader most likely to command a majority'],
    ['4. Test', 'The new government must prove its majority in the Lok Sabha'],
  ],
  'Worked example table of a hung House: three alliances win fewer than half the seats; the President meets the leaders and asks for letters of support; the President invites the leader most likely to command a majority; the government proves its majority in the Lok Sabha',
  'Discretion is real, but limited by the House.',
);
const vDiscretion = table(
  ['Situation', 'Discretion in practice'],
  [
    ['Advice of the ministers', 'Return it once for reconsideration; then act on it'],
    ['An ordinary bill', 'Delay assent, since no time limit is set (the pocket veto)'],
    ['No clear majority', 'Judge who is most likely to command majority support'],
  ],
  'Table of the three situations of the President\'s discretion in practice: returning the advice once, delaying assent to an ordinary bill (the pocket veto), and choosing a Prime Minister when no party has a clear majority',
);
const vPocket = flow('LR', ['Parliament passes an ordinary bill', 'The bill reaches the President', 'The President neither signs nor returns it; no time limit applies', 'The bill stays pending: a pocket veto'], 'Flow of the pocket veto: Parliament passes an ordinary bill, it reaches the President, the President neither signs nor returns it as no time limit applies, and the bill stays pending', 'The pocket veto');
const vVP = table(
  ['Point', 'Vice-President'],
  [
    ['Election', 'By the members of both Houses of Parliament'],
    ['Term', 'Five years'],
    ['Chair', 'Ex officio Chairman of the Rajya Sabha'],
    ['Other role', 'Acts as President when the office is vacant'],
  ],
  'Table about the Vice-President: elected by the members of both Houses, five-year term, ex officio Chairman of the Rajya Sabha, and acts as President when the office is vacant',
);
const vSum1 = table(
  ['Topic', 'Key points'],
  [
    ['Types', 'Presidential, parliamentary, semi-presidential'],
    ['President', 'Nominal head; electoral college; single transferable vote; five years; impeachment'],
    ['Advice', '42nd Amendment (1976) binding; 44th Amendment (1978) return once'],
    ['Discretion', 'Return advice; pocket veto; choice of Prime Minister in a hung House'],
    ['Vice-President', 'Elected by both Houses; Chairman of the Rajya Sabha; acts as President'],
  ],
  'Summary table of Part 1: three types of executive, the President as nominal head, the amendments on advice, areas of discretion and the Vice-President',
);
const vTips1 = table(
  ['Common mistake', 'Write instead'],
  [
    ['The President is elected by all voters', 'Elected indirectly by an electoral college of elected members'],
    ['Nominated members vote for the President', 'Only elected members vote (nominated members vote for the Vice-President)'],
    ['The President has no discretion at all', 'Limited discretion: return advice, delay assent, choose in a hung House'],
  ],
  'Table of common mistakes in Part 1 and what to write instead',
);

const vPM = table(
  ['Point', 'Prime Minister'],
  [
    ['Appointment', 'By the President'],
    ['Position', 'Leader of the majority in the Lok Sabha'],
    ['Ministers', 'Appointed on the Prime Minister\'s advice'],
    ['Responsible to', 'The Lok Sabha'],
  ],
  'Table about the Prime Minister: appointed by the President, leader of the majority in the Lok Sabha, ministers appointed on the Prime Minister\'s advice, responsible to the Lok Sabha',
);
const vRanks = table(
  ['Rank', 'Role'],
  [
    ['Cabinet Ministers', 'Senior ministers; the inner group that takes major decisions'],
    ['Ministers of State', 'Junior ministers, helping or in charge of some departments'],
    ['Deputy Ministers', 'Assist the senior ministers'],
  ],
  'Table of the three ranks in the Council of Ministers: Cabinet Ministers, the inner group; Ministers of State; and Deputy Ministers who assist',
  'A minister who is not an MP must become one within six months.',
);
const vCollective = flow('LR', ['The Council of Ministers acts as one team', 'It is responsible to the Lok Sabha', 'The Lok Sabha passes a motion of no confidence', 'The whole Council must resign'], 'Flow of collective responsibility: the Council of Ministers acts as one team and is responsible to the Lok Sabha; if the Lok Sabha passes a no-confidence motion, the whole Council must resign', 'Collective responsibility');
const vLimit = table(
  ['Point', '91st Amendment, 2003'],
  [
    ['Limit', '15 per cent of the strength of the Lok Sabha'],
    ['Applies to', 'The Union; a similar limit applies in the states'],
    ['Reason some give', 'To avoid a council that is too large and costly'],
  ],
  'Table about the 91st Amendment of 2003: it limits the Council of Ministers to fifteen per cent of the strength of the Lok Sabha, with a similar limit in the states, so that the council does not grow too large',
);
const vPMRole = table(
  ['Setting', 'Effect on the Prime Minister\'s position'],
  [
    ['One party with a clear majority', 'Fewer partners to satisfy; a firm hold on the House'],
    ['Coalition of several parties', 'Partners must be consulted and kept together'],
    ['Party position', 'Standing within the party shapes influence'],
  ],
  'Table of how the setting shapes the Prime Minister: with a clear majority, fewer partners to satisfy; in a coalition, partners must be consulted; and standing within the party shapes influence',
  'The post is the same; the political setting differs.',
);
const vLimitEx = table(
  ['Step', 'Imagined Assembly of Dharmpal'],
  [
    ['Strength of the Assembly', '200 members'],
    ['Limit: 15 per cent', '15 over 100 times 200 equals 30'],
    ['Ministers named', '27 including the Chief Minister'],
    ['Room left', '3 more can be added'],
  ],
  'Worked example table: an Assembly of 200 members has a limit of 30 ministers; 27 are named, so 3 more can be added',
  'Fifteen per cent of 200 is 30.',
);
const vStates = table(
  ['Union', 'State'],
  [
    ['President (nominal head)', 'Governor (nominal head)'],
    ['Prime Minister', 'Chief Minister'],
    ['Council of Ministers', 'Council of Ministers of the state'],
    ['Responsible to the Lok Sabha', 'Responsible to the Legislative Assembly'],
  ],
  'Table comparing the Union and the states: the President and Governor are nominal heads, the Prime Minister and Chief Minister lead the governments, the Council of Ministers answers to the Lok Sabha in the Union and to the Legislative Assembly in a state',
);
const vPerm = table(
  ['Point', 'Permanent executive'],
  [
    ['Who', 'Civil servants'],
    ['Recruited', 'On merit, through examinations'],
    ['Quality', 'Trained and politically neutral'],
    ['Task', 'Implement policies and advise ministers'],
  ],
  'Table about the permanent executive: civil servants recruited on merit, trained, politically neutral, who implement policies and advise ministers',
);
const vCommissions = table(
  ['Body', 'Work'],
  [
    ['Union Public Service Commission', 'Recruits for the Union services'],
    ['State Public Service Commissions', 'Recruit for the state services'],
    ['Security of tenure', 'Members cannot be removed at will, so they act independently'],
  ],
  'Table of the Public Service Commissions: the Union Commission recruits for the Union services, State Commissions for the state services, and their members have security of tenure so that they can act independently',
);
const vReserv = table(
  ['Group', 'Share in direct recruitment to Union posts, as of 2024'],
  [
    ['Scheduled Castes', '15 per cent'],
    ['Scheduled Tribes', '7.5 per cent'],
    ['Other Backward Classes', '27 per cent'],
  ],
  'Table of reservation in direct recruitment to Union posts as of 2024: Scheduled Castes fifteen per cent, Scheduled Tribes seven and a half per cent, Other Backward Classes twenty-seven per cent',
  'States fix their own reservation for state services.',
);
const vDiaryEx = table(
  ['Who decides, who acts', 'In the imagined district of Sundarpet'],
  [
    ['Political executive', 'The state minister announces the flood-relief plan'],
    ['Permanent executive', 'The Collector and staff carry it out in the villages'],
    ['Advice', 'The Collector sends the Secretary a note on speeding up work'],
    ['Neutrality', 'Postings follow rules, not requests from representatives'],
  ],
  'Worked example table from an imagined district officer\'s diary: the minister announces the plan, the Collector and staff carry it out, the Collector advises the Secretary, and postings follow rules and not requests',
  'Ministers decide policy; officers implement and advise.',
);
const vIssues = table(
  ['Some argue', 'Others argue'],
  [
    ['Political interference affects postings and decisions', 'Security of tenure and rules protect officers'],
    ['Officers are not directly accountable to citizens', 'Accountable to ministers and the legislature'],
    ['Red tape delays work', 'Procedures protect fairness'],
    ['Officers should be more responsive to people', 'Responsiveness must not cost neutrality'],
  ],
  'Table of views on the bureaucracy: some argue there is political interference, weak accountability to citizens, red tape and a need for responsiveness; others argue that tenure and rules protect officers, officers answer to ministers, procedures protect fairness, and responsiveness must not cost neutrality',
);
const vSum2 = table(
  ['Topic', 'Key points'],
  [
    ['Prime Minister', 'Appointed by the President; leader of the majority; responsible to the Lok Sabha'],
    ['Council of Ministers', 'Three ranks; members of Parliament within six months; 15 per cent limit (91st Amendment, 2003)'],
    ['Permanent executive', 'Civil servants: merit, trained, neutral; implement and advise'],
    ['Services', 'All India, Central and State; UPSC and State Public Service Commissions'],
    ['Issues', 'Interference, accountability, red tape, responsiveness'],
  ],
  'Summary table of Part 2: Prime Minister, Council of Ministers, the permanent executive, the services with their Commissions, and the issues',
);
const vTips2 = table(
  ['Common mistake', 'Write instead'],
  [
    ['The Prime Minister is elected by all voters', 'Appointed by the President, as leader of the majority in the Lok Sabha'],
    ['Civil servants change with each government', 'They are the permanent executive and stay in service'],
    ['UPSC recruits for the state services', 'State Public Service Commissions recruit for the state services'],
  ],
  'Table of common mistakes in Part 2 and what to write instead',
);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Executive, Part 1: Types of Executive and the President',
  goals: [
    'Define the executive and distinguish the political and permanent executive',
    'Distinguish presidential, parliamentary and semi-presidential types with examples',
    'Explain how the President is elected, the powers and the term',
    'Explain the advice of ministers, the discretion in practice and the Vice-President',
  ],
  slides: [
    sl('title', 'Executive: Types and the President', {
      b: 'Part 1: what the **executive** is, its **types**, and the **President** and **Vice-President** of India.',
      v: flow('LR', ['What is the executive', 'Types of executive', 'Election of the President', 'Powers and advice', 'Discretion and the Vice-President'], 'Route map of Part 1: what the executive is, types of executive, election of the President, powers and advice, and discretion and the Vice-President', 'Part 1 at a glance'),
      n: 'Laws and policies are only words until someone carries them out. In this part we study the executive, the organ that does this. We compare three types of executive, look at how the President of India is elected, what the office can and cannot do, and the role of the Vice-President.',
    }),
    sl('concept', 'What is the executive?', {
      v: vTerms,
      n: 'The executive is the organ of government that implements laws and policies. It has two parts. The political executive is the elected and temporary part: the ministers and the head of government. The permanent executive is made up of civil servants, who stay in service whichever party governs.',
    }),
    sl('diagram', 'Three types of executive', {
      v: vTypes,
      n: 'Countries organise the executive in different ways. In a presidential system, as in the United States, the President is head of state and head of government. In a parliamentary system, as in the United Kingdom and India, the head of government answers to the legislature, and the head of state is nominal. In a semi presidential system, as in France, there is both an elected President and a Prime Minister.',
    }),
    sl('example', 'Worked example 1: classify the country', {
      b: 'Use the features of three imagined countries to name the type of executive.',
      bl: ['Who is head of government?', 'To whom is that person answerable?'],
      v: vClassify,
      n: 'Let us classify three imagined countries. In Arvelia, a directly elected President leads both state and government for a fixed term, so it is presidential. In Brendoria, the Chancellor needs the Assembly majority and the head of state is ceremonial, so it is parliamentary. Calvaris has an elected President and a Prime Minister answerable to the Council, so it is semi presidential.',
    }),
    sl('check', 'Quick check: match the type', {
      b: 'Match each type of executive with an example.',
      chk: 'mt_types',
      n: 'Recall one country for each of the three types.',
    }),
    sl('diagram', 'India: a nominal head and a real executive', {
      v: vIndiaNominal,
      n: 'India has a parliamentary executive. The Constitution vests executive power in the President, and it is exercised in the President\'s name. But in practice it is exercised by the Council of Ministers. That is why the President is called the nominal or constitutional head, while the Prime Minister and the Council form the real executive.',
    }),
    sl('diagram', 'Election of the President', {
      v: vElection,
      n: 'The President is not elected directly by the voters. The elected members of the Lok Sabha, the Rajya Sabha and the State Legislative Assemblies form an electoral college. The Assemblies of Delhi and Puducherry are included. Members vote by secret ballot, using proportional representation by single transferable vote. Nominated members do not vote in this election.',
    }),
    sl('concept', 'The electoral college, term and removal', {
      v: vCollege,
      n: 'Here are the main points. The election is indirect, held by an electoral college of elected members. The method is proportional representation by single transferable vote. The term is five years. The President can be removed before that only by impeachment, for violating the Constitution. Ordinary voters, nominated members and members of State Legislative Councils do not vote.',
    }),
    sl('check', 'Quick check: who can vote?', {
      b: 'A scientist is nominated to the Rajya Sabha. Can the scientist vote for the President?',
      chk: 'm_nominated',
      n: 'Think about whether the scientist is an elected member.',
    }),
    sl('concept', 'Powers of the President', {
      v: vPowers,
      n: 'The President has four kinds of powers. Executive powers include appointing the Prime Minister, judges and Governors. Legislative powers include giving assent to bills, issuing ordinances and addressing Parliament. Financial powers include recommending money bills. Emergency powers let the President proclaim an emergency. All are exercised on the advice of the Council of Ministers.',
    }),
    sl('diagram', 'Acting on the advice of ministers', {
      v: vAdvice,
      n: 'In practice the President has long acted on the advice of the Council of Ministers. The forty second Amendment of nineteen seventy six made that advice binding. The forty fourth Amendment of nineteen seventy eight lets the President return the advice once for reconsideration. If the Council sends the same advice back, the President must act on it.',
    }),
    sl('example', 'Worked example 2: a hung House', {
      b: 'No party or alliance has a clear majority after an imagined general election. Trace what happens.',
      bl: ['The President **judges** who can command a majority', 'The House **tests** the choice'],
      v: vHungEx,
      n: 'Imagine three alliances, each with fewer than half of the seats. The President meets their leaders and asks for letters of support. Then the President invites the leader who seems most likely to command a majority. The new government must prove its majority in the Lok Sabha. The President\'s discretion is real, but the House has the final word.',
    }),
    sl('concept', 'Discretion in practice', {
      v: vDiscretion,
      n: 'The President has limited discretion in three situations. First, the advice of the ministers can be returned once for reconsideration. Second, assent to an ordinary bill can be delayed, because the Constitution fixes no time limit. Third, when no party or alliance has a clear majority, the President uses judgment in choosing the Prime Minister.',
    }),
    sl('diagram', 'The pocket veto', {
      v: vPocket,
      n: 'The pocket veto is one use of this discretion. Parliament passes an ordinary bill, and it reaches the President. The Constitution sets no time limit for assent. So the President may neither sign nor return the bill, and it stays pending. This practice is called the pocket veto. Different views are held on how far it should be used.',
    }),
    sl('check', 'Quick check: name the practice', {
      b: 'A passed bill is neither signed nor returned and stays with the President for years. What is this called?',
      chk: 'm_pocket',
      n: 'Think of a veto that works by taking no action.',
    }),
    sl('concept', 'The Vice-President', {
      v: vVP,
      n: 'The Vice-President is elected by the members of both Houses of Parliament, for a term of five years. The Vice-President is the ex officio Chairman of the Rajya Sabha, which means the office carries this role automatically. The Vice-President also acts as President when that office is vacant, until the vacancy is filled.',
    }),
    sl('check', 'Quick check: who acts?', {
      b: 'The President resigns. Who acts as President until the vacancy is filled?',
      chk: 'm_vpacts',
      n: 'Recall the second role of the Vice-President.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSum1,
      n: 'To sum up. The executive implements laws and policies. Executives are presidential, parliamentary or semi presidential. In India the President is the nominal head, elected by an electoral college by single transferable vote for five years. The forty second and forty fourth Amendments shape the advice of ministers. The President has limited discretion, and the Vice-President chairs the Rajya Sabha.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['Give an **example** with each type of executive', 'Say **elected members** whenever you describe the electoral college', 'Remember **1976** for binding advice and **1978** for one return', 'Support each point with an example'],
      v: vTips1,
      n: 'A few tips. Give an example country with each type of executive. When you describe the electoral college, always say elected members. Remember nineteen seventy six for binding advice and nineteen seventy eight for one return of the advice. And in longer answers, support each point with a short example.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Executive, Part 2: Prime Minister, Council of Ministers and the Permanent Executive',
  goals: [
    'Explain the appointment and position of the Prime Minister and the Council of Ministers',
    'Explain collective responsibility, the six-month rule and the 91st Amendment limit',
    'Describe the permanent executive and the three categories of civil services',
    'State the role of the Public Service Commissions, reservation and the issues some raise',
  ],
  slides: [
    sl('title', 'Ministers and the Permanent Executive', {
      b: 'Part 2: the **Prime Minister**, the **Council of Ministers** and the **civil services**.',
      v: flow('LR', ['Prime Minister', 'Council of Ministers', 'Responsibility and limits', 'Civil services', 'Issues'], 'Route map of Part 2: Prime Minister, Council of Ministers, responsibility and limits, civil services, and issues', 'Part 2 at a glance'),
      n: 'The real work of the executive is done by the Prime Minister and the Council of Ministers, and by the civil servants who carry out their decisions. In this part we study how the ministers are appointed and held to account, and how the permanent executive is organised and recruited.',
    }),
    sl('concept', 'The Prime Minister', {
      v: vPM,
      n: 'The Prime Minister is appointed by the President and is usually the leader of the majority in the Lok Sabha. The other ministers are appointed on the advice of the Prime Minister. The Prime Minister and the Council of Ministers are responsible to the Lok Sabha, which can remove them if it loses confidence in them.',
    }),
    sl('concept', 'The Council of Ministers', {
      v: vRanks,
      n: 'The Council of Ministers has three ranks. Cabinet Ministers are the senior ministers and form the inner group. Ministers of State are junior ministers, and Deputy Ministers assist. A person who is not a member of Parliament can become a minister, but must become a member of either House within six months.',
    }),
    sl('diagram', 'The Union executive: structure', {
      v: vUnion,
      n: 'This chart brings the Union executive together. At the top is the President, the nominal head, with the Vice-President acting when the office is vacant. The President appoints the Prime Minister, who heads the Council of Ministers. The Council answers to the Lok Sabha. Ministries and departments, run by civil servants, carry out its decisions.',
    }),
    sl('check', 'Quick check: the six-month rule', {
      b: 'A person who is not an MP is invited to join the Union Council of Ministers. What must the person do to continue?',
      chk: 'm_sixmonths',
      n: 'Think about the time allowed to become a member of either House.',
    }),
    sl('diagram', 'Collective responsibility', {
      v: vCollective,
      n: 'The Council of Ministers acts as one team. It is collectively responsible to the Lok Sabha, so all the ministers stand or fall together. If the Lok Sabha passes a motion of no confidence, the whole Council must resign. This is how the Lok Sabha holds the executive to account in a parliamentary system.',
    }),
    sl('check', 'Quick check: no confidence', {
      b: 'The Lok Sabha passes a motion of no confidence against the government. What follows?',
      chk: 'm_noconf',
      n: 'Think about what collective responsibility means.',
    }),
    sl('concept', 'Limit on the size of the Council', {
      v: vLimit,
      n: 'The ninety first Amendment of two thousand three limits the Council of Ministers to fifteen percent of the strength of the Lok Sabha. A similar limit applies in the states. Some give as a reason that this keeps the Council from growing too large and costly. The Council of Ministers includes the Prime Minister.',
    }),
    sl('example', 'Worked example 1: applying the limit', {
      b: 'An imagined state Assembly has 200 members. Find the limit and how many more ministers can be named.',
      bl: ['Limit = 15% of 200 = **30**', 'Named so far: 27 (including the Chief Minister)'],
      v: vLimitEx,
      n: 'Let us apply the limit to an imagined state. The Assembly has two hundred members. Fifteen percent of two hundred is thirty. So the Council of Ministers, including the Chief Minister, can have at most thirty members. If twenty seven are already named, three more can be added without breaking the limit.',
    }),
    sl('concept', 'The Prime Minister in practice', {
      v: vPMRole,
      n: 'The post of Prime Minister is the same for every holder, but the political setting differs. A leader whose party has a clear majority has fewer partners to satisfy. A leader of a coalition must consult and keep together several partners. The standing of the leader within the party also shapes influence. Students should judge this with reasons.',
    }),
    sl('concept', 'The same system in the states', {
      v: vStates,
      n: 'The states have a similar system. The Governor is the nominal head, like the President. The Chief Minister leads the government, with a Council of Ministers that is responsible to the Legislative Assembly, as the Union Council is responsible to the Lok Sabha.',
    }),
    sl('concept', 'The permanent executive', {
      v: vPerm,
      n: 'The permanent executive is made up of civil servants. They are recruited on merit through examinations, trained, and expected to be politically neutral, so that they can serve any government. They implement policies and advise ministers. Ministers decide the policy, while officers work out the details and carry it out.',
    }),
    sl('diagram', 'Categories of civil services', {
      v: vServices,
      n: 'There are three categories. The All India Services, such as the Indian Administrative Service and the Indian Police Service, are recruited by the Union but serve in the states. The Central Services serve the Union government. The State Services serve a state government and are recruited by the State Public Service Commission.',
    }),
    sl('check', 'Quick check: true or false', {
      b: 'An Indian Police Service officer recruited by the Union can be posted to serve in a state.',
      chk: 'tf_ias',
      n: 'Think about what the All India Services are.',
    }),
    sl('concept', 'Public Service Commissions', {
      v: vCommissions,
      n: 'The Union Public Service Commission recruits for the Union services, and the State Public Service Commissions recruit for the state services. Their members have security of tenure, which means they cannot be removed at will by the government. This helps them to select candidates on merit without fear or favour.',
    }),
    sl('check', 'Quick check: which Commission?', {
      b: 'Sulochana wants to join the civil services of the imagined state of Ranmal. Who recruits for it?',
      chk: 'm_psc',
      n: 'Think about services of a state, and not of the Union.',
    }),
    sl('concept', 'Reservation in recruitment', {
      v: vReserv,
      n: 'The Constitution allows reservation of posts in recruitment for Scheduled Castes, Scheduled Tribes and Other Backward Classes. In direct recruitment to Union posts, as of two thousand twenty four, the shares are fifteen percent for Scheduled Castes, seven and a half percent for Scheduled Tribes and twenty seven percent for Other Backward Classes. States fix their own for state services.',
    }),
    sl('example', 'Worked example 2: a district officer\'s day', {
      b: 'Read the imagined diary of a District Collector and sort the entries into decision, action and advice.',
      bl: ['**Decision:** the minister announces the plan', '**Action:** the Collector carries it out', '**Advice:** a note to the Secretary'],
      v: vDiaryEx,
      n: 'Imagine the diary of a District Collector. The state minister announces a flood relief plan: that is a political decision. The Collector and staff carry it out in the villages: that is the work of the permanent executive. At the end of the day the Collector advises the Secretary. And when a representative asks for a transfer, postings follow the rules, not requests.',
    }),
    sl('concept', 'Issues: some argue, others argue', {
      v: vIssues,
      n: 'Several issues are discussed about the bureaucracy. Some argue that political interference affects postings, that officers are not directly accountable to citizens, that red tape delays work and that officers should be more responsive. Others argue that security of tenure and rules protect officers and fairness, and that responsiveness must not cost neutrality. Students should weigh the reasons.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSum2,
      n: 'To sum up. The Prime Minister is appointed by the President as leader of the majority and is responsible to the Lok Sabha along with the Council of Ministers. The ninety first Amendment limits the Council to fifteen percent of the Lok Sabha. The permanent executive is the civil servants, in three categories, recruited by the Public Service Commissions, with reservation, and with some issues that people debate.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['Say **leader of the majority** and **appointed by the President** for the Prime Minister', '**91st Amendment, 2003: 15 per cent**', 'Use **some argue, others argue** for issues', 'Give the **Commission** with each category of services'],
      v: vTips2,
      n: 'A few tips. For the Prime Minister say appointed by the President as leader of the majority. Remember the ninety first Amendment of two thousand three and the fifteen percent limit. For issues about the bureaucracy, give both views with the words some argue and others argue. And name the Commission with each category of civil services.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Executive: Notes',
  sections: [
    {
      h: '1. The executive and its types',
      t: 1,
      b: 'The **executive** is the organ of government that **implements laws and policies**. The **political executive** is elected and temporary: the ministers and the head of government. The **permanent executive** is the civil servants.\n\nThree types are commonly distinguished.\n- **Presidential**, for example the United States: the President is head of state and of government and is elected by the people for a fixed term.\n- **Parliamentary**, for example the United Kingdom and India: the Prime Minister and Cabinet are responsible to the legislature, and the head of state is nominal.\n- **Semi-presidential**, for example France: there is both a directly elected President and a Prime Minister.',
      terms: [
        ['Executive', 'The organ of government that implements laws and policies.'],
        ['Political executive', 'The elected and temporary part of the executive: the ministers and the head of government.'],
        ['Permanent executive', 'The civil servants, who remain in service when governments change.'],
        ['Parliamentary executive', 'A system in which the head of government and the Cabinet are responsible to the legislature and the head of state is nominal.'],
      ],
      v: vTypes,
    },
    {
      h: '2. The President of India',
      t: 1,
      b: 'The President is the **nominal (constitutional) head**: executive power is exercised in the President\'s name, but in practice by the Council of Ministers.\n\n- **Election:** indirect, by an **electoral college** of the elected members of both Houses of Parliament and of the State Legislative Assemblies, including those of Delhi and Puducherry. Voting is by **proportional representation by single transferable vote**.\n- **Term and removal:** five years; **impeachment** for violation of the Constitution.\n- **Powers:** executive (appointing the Prime Minister, judges, Governors), legislative (assent to bills, ordinances, addressing Parliament), financial and emergency powers.',
      terms: [
        ['Nominal head', 'A head in whose name power is exercised, while the real power rests with others.'],
        ['Electoral college', 'The body of elected members that elects the President.'],
        ['Impeachment', 'The process by which the President can be removed for violating the Constitution.'],
        ['Ordinance', 'A law made by the President when Parliament is not in session.'],
      ],
      v: vElection,
      vs: [vPowers],
    },
    {
      h: '3. Advice of ministers and discretion',
      t: 1,
      b: 'The President must act on the **advice of the Council of Ministers**. The **42nd Amendment (1976)** made the advice binding; the **44th Amendment (1978)** allows the President to **return the advice once** for reconsideration, after which the President must act on it.\n\nDiscretion in practice is limited: the President may **return the advice once**, **delay assent to an ordinary bill** (the **pocket veto**, since no time limit is set), and use judgment in **choosing a Prime Minister** when no party or alliance has a clear majority.',
      terms: [
        ['Pocket veto', 'The President\'s keeping an ordinary bill pending, neither signing nor returning it, since the Constitution sets no time limit.'],
        ['Hung House', 'A House in which no party or alliance has a clear majority.'],
      ],
      v: vAdvice,
      vs: [vDiscretion],
    },
    {
      h: '4. Vice-President, Prime Minister and Council of Ministers',
      t: 1,
      b: 'The **Vice-President** is elected by the members of both Houses, serves five years, is **ex officio Chairman of the Rajya Sabha** and **acts as President** when the office is vacant.\n\nThe **Prime Minister** is appointed by the President and is the **leader of the majority in the Lok Sabha**. Ministers must be members of Parliament, or become members **within six months**. The Council is **collectively responsible** to the Lok Sabha; a **no-confidence motion** can remove the government. The **91st Amendment (2003)** limits the Council to **15 per cent** of the strength of the Lok Sabha. The **Cabinet** is the inner group of senior ministers. The influence of a Prime Minister is shaped by party position and by coalition conditions. Governors and Chief Ministers form a similar system in the states.',
      terms: [
        ['Ex officio', 'Holding a position by virtue of holding another office.'],
        ['Collective responsibility', 'The principle that the whole Council of Ministers is jointly responsible to the Lok Sabha and must resign together if it loses confidence.'],
        ['No-confidence motion', 'A motion in the Lok Sabha that, if passed, shows the government has lost the support of the House.'],
        ['Cabinet', 'The smaller inner group of senior ministers who take major policy decisions.'],
      ],
      v: vUnion,
      vs: [vCollective, vLimit],
    },
    {
      h: '5. The permanent executive',
      t: 2,
      b: '**Civil servants** are the permanent executive: recruited on **merit**, trained and **politically neutral**. They **implement policies** and **advise ministers**.\n\nThe services are the **All India Services** (for example the Indian Administrative Service and the Indian Police Service), recruited by the Union but serving in the states; the **Central Services**; and the **State Services**.\n\nThe **Union Public Service Commission** recruits for the Union services and **State Public Service Commissions** for the state services. Their members have **security of tenure**.',
      terms: [
        ['Civil servant', 'A permanent, merit-recruited, politically neutral official who implements policies and advises ministers.'],
        ['All India Services', 'Services such as the IAS and IPS, recruited by the Union but serving in the states.'],
        ['Union Public Service Commission', 'The body that recruits for the Union services.'],
        ['Security of tenure', 'Protection against removal at will, which supports the independence of the Commissions.'],
      ],
      v: vServices,
    },
    {
      h: '6. Reservation and issues',
      t: 2,
      b: 'The Constitution allows **reservation in recruitment** for Scheduled Castes, Scheduled Tribes and Other Backward Classes. In direct recruitment to Union posts the shares are **15, 7.5 and 27 per cent** (as of 2024); states fix their own.\n\nIssues that some people raise, with other views: **political interference** (some argue that pressure affects postings); **accountability to citizens** (some argue that officers are not directly accountable; others reply that they answer to ministers and the legislature); **red tape** (some argue that it delays work; others, that procedures protect fairness); the **need for responsiveness** (some argue for more, others that it must not cost neutrality).',
      terms: [
        ['Reservation', 'A provision under which a share of posts is set aside for specified groups.'],
        ['Red tape', 'Rigid adherence to procedures that causes delay.'],
      ],
      v: vReserv,
      vs: [vIssues],
    },
  ],
  tips: '**Common mistakes**\n- Saying the President is elected by all voters: it is an electoral college of elected members.\n- Letting nominated members vote for the President: they do not.\n- Saying the President has no discretion: it is limited but real.\n- Saying the Prime Minister is elected by the people: the President appoints the leader of the majority.\n- Saying civil servants change with governments: they are permanent.\n\n**Tips:** give an example with each type of executive; remember 1976, 1978 and 2003 for the three amendments; put both views in answers on the issues of the bureaucracy.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['What is the **executive**?', 'The organ of government that implements laws and policies.', 'definition', 1],
  ['What is the **political executive**?', 'The elected and temporary part: ministers and the head of government.', 'definition', 1],
  ['What is the **permanent executive**?', 'The civil servants, who stay in service when governments change.', 'definition', 1],
  ['A **presidential** executive: example and feature', 'United States; the President is head of state and government, elected for a fixed term.', 'concept', 1],
  ['A **parliamentary** executive: example and feature', 'United Kingdom and India; the Prime Minister and Cabinet are responsible to the legislature, and the head of state is nominal.', 'concept', 1],
  ['A **semi-presidential** executive: example and feature', 'France; a directly elected President and a Prime Minister.', 'concept', 1],
  ['Why is the President of India a **nominal head**?', 'Executive power is exercised in the President\'s name but in practice by the Council of Ministers.', 'concept', 1],
  ['Who elects the **President**?', 'An electoral college of the elected members of both Houses and of the State Legislative Assemblies, with Delhi and Puducherry.', 'fact', 1],
  ['Method of voting for the President', 'Proportional representation by single transferable vote; secret ballot.', 'fact', 1],
  ['Do **nominated members** vote for the President?', 'No; only elected members do (they do vote for the Vice-President).', 'fact', 1],
  ['Term of the President; removal', 'Five years; impeachment for violation of the Constitution.', 'fact', 1],
  ['Four kinds of **powers of the President**', 'Executive, legislative, financial and emergency.', 'concept', 1],
  ['What did the **42nd Amendment (1976)** do about advice?', 'It made the ministers\' advice binding on the President.', 'fact', 1],
  ['What did the **44th Amendment (1978)** do about advice?', 'It lets the President return the advice once for reconsideration.', 'fact', 1],
  ['What is the **pocket veto**?', 'The President keeps an ordinary bill pending, neither signing nor returning it, as no time limit is set.', 'definition', 1],
  ['When can the President use discretion in choosing a Prime Minister?', 'When no party or alliance has a clear majority (a hung House).', 'concept', 1],
  ['How is the **Vice-President** elected?', 'By the members of both Houses of Parliament; five-year term.', 'fact', 1],
  ['Two roles of the Vice-President', 'Ex officio Chairman of the Rajya Sabha; acts as President when the office is vacant.', 'fact', 1],
  ['Who appoints the **Prime Minister**?', 'The President, usually the leader of the majority in the Lok Sabha.', 'fact', 1],
  ['A minister who is not a member of Parliament', 'Must become a member of either House within six months.', 'fact', 1],
  ['What is **collective responsibility**?', 'The whole Council of Ministers is jointly responsible to the Lok Sabha and stands or falls together.', 'definition', 1],
  ['Effect of a **no-confidence motion** in the Lok Sabha', 'The Council of Ministers must resign.', 'concept', 1],
  ['**91st Amendment (2003)**', 'Limits the Council of Ministers to 15 per cent of the strength of the Lok Sabha; a similar limit in the states.', 'fact', 1],
  ['The **Cabinet**', 'The inner group of senior ministers who take major decisions.', 'definition', 1],
  ['The system in the states', 'The Governor is the nominal head; the Chief Minister and Council of Ministers are the real executive.', 'fact', 1],
  ['Qualities of **civil servants**', 'Recruited on merit, trained and politically neutral; they implement policies and advise ministers.', 'concept', 2],
  ['Three categories of services', 'All India Services; Central Services; State Services.', 'concept', 2],
  ['**All India Services**', 'For example IAS and IPS: recruited by the Union but serving in the states.', 'fact', 2],
  ['Who recruits for the Union and state services?', 'The Union Public Service Commission for the Union; State Public Service Commissions for the states.', 'fact', 2],
  ['Why do commission members have **security of tenure**?', 'So that they cannot be removed at will and can recruit independently.', 'concept', 2],
  ['Reservation in direct recruitment to Union posts (as of 2024)', 'Scheduled Castes 15, Scheduled Tribes 7.5, Other Backward Classes 27 per cent.', 'fact', 2],
  ['Four issues some raise about the bureaucracy', 'Political interference; accountability to citizens; red tape; the need for responsiveness.', 'concept', 2],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-11-default-chapter-test-short',
  title: 'Chapter test (short): Executive',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A: Objective (1 mark each)', instr: 'Questions 1 to 4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_political', 'm_pmappt', 'm_tenure', 'ar_nominal'] },
    { id: 'B', title: 'Section B: Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30 to 50 words and the 3-mark question in about 50 to 80 words.', items: ['s_nominal', 's_upsc', 's3_services'] },
    { id: 'C', title: 'Section C: Long answer (5 marks)', instr: 'Answer any ONE of the two questions in about 80 to 120 words.', items: [{ attempt: 1, keys: ['l_types', 'l_president'] }] },
    { id: 'D', title: 'Section D: Case-based (4 marks)', instr: 'Read the passage and answer all parts. Part (c) has an internal choice.', items: ['c_press'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-11-default-chapter-test-long',
  title: 'Chapter test (long): Executive',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A: Objective (1 mark each)', instr: 'Questions 1 to 10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_college', 'm_advice', 'm_hung', 'm_collective', 'm_perm', 'm_upsc', 'm_reserv', 'm_brendoria', 'ar_stv', 'ar_civil'] },
    { id: 'B', title: 'Section B: Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30 to 50 words and 3-mark questions in about 50 to 80 words. Questions 13 and 15 have an internal choice.', items: ['s_college', 's_collective', { attempt: 1, keys: ['s_vp', 's_neutral'] }, 's3_pm', { attempt: 1, keys: ['s3_discretion', 's3_issues'] }] },
    { id: 'C', title: 'Section C: Long answer (5 marks)', instr: 'Answer question 16, and any ONE of questions 17 and 18, in about 80 to 120 words each.', items: ['l_pm_council', { attempt: 1, keys: ['l_actual', 'l_bureau'] }] },
    { id: 'D', title: 'Section D: Case-based (4 marks each)', instr: 'Read each passage and answer all parts. Part (c) of each has an internal choice.', items: ['c_diary', 'c_table'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01 and t02 of cbse-11-political-science-ch04 only (types of executive, the President, Vice-President, Prime Minister and Council of Ministers; the permanent executive and the civil services)',
    originality: 'every passage (newspaper report, diary, list of ministers, classroom discussion) and every country, state, district and person is imagined, written by SOYL and labelled; no NCERT text, boxed source or cartoon, no Constitution text, judgment text or board item reused (D-036)',
    facts: 'stable facts only: electoral college and single transferable vote; five-year terms; 42nd Amendment 1976; 44th Amendment 1978; 91st Amendment 2003 (15 per cent); six-month rule; Union Public Service Commission; reservation figures dated as of 2024',
    neutrality: 'no office-holders or governments named; coalition and party position described neutrally; issues about the bureaucracy framed as some argue and others argue',
    gate: 'schema, content lint (lintExemplar) and the deterministic verify checks run clean on this chapter',
  },
});
