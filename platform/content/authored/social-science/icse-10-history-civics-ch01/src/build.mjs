// Build ICSE 10 History & Civics ch01 The Union Parliament: Lok Sabha, Rajya Sabha and the Speaker. Run from platform/:
//   npx tsx content/authored/social-science/icse-10-history-civics-ch01/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from './lib.mjs';

setUnit('icse-10-history-civics-ch01', 'social-science');
const { LS, LS_MAX, LS_MAX_OLD, RS, RS_MAX, THEN_MEMBERS, EFFECTIVE_MAJ, VAC } = await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- visuals
const vParliament = (() => {
  const s = new Svg(620, 250);
  s.rect(210, 18, 200, 50, { color: 'accent', fill: 'fill', sw: 2.4 });
  s.text(310, 36, 'Parliament of India', { bold: true, size: 15 });
  s.text(310, 55, 'Article 79', { size: 12, muted: true });
  const boxes = [
    [20, 'President', 'part of Parliament,', 'not a member'],
    [220, 'Rajya Sabha', 'Council of States,', 'permanent House'],
    [420, 'Lok Sabha', 'House of the People,', 'five-year term'],
  ];
  for (const [x, a, b, c] of boxes) {
    s.line(310, 68, x + 90, 140, { sw: 1.4, color: 'muted' });
    s.rect(x, 140, 180, 80, { sw: 1.8 });
    s.text(x + 90, 162, a, { bold: true, size: 14 });
    s.text(x + 90, 184, b, { size: 12, muted: true });
    s.text(x + 90, 202, c, { size: 12, muted: true });
  }
  return s.visual(
    'Organisational chart: the Parliament of India at the top, made up of three parts below it: the President, who is part of Parliament but not a member; the Rajya Sabha, the Council of States, a permanent House; and the Lok Sabha, the House of the People, with a five-year term',
    'Parliament = the President + the Rajya Sabha + the Lok Sabha.',
  );
})();

const vLists = (() => {
  const s = new Svg(640, 230);
  const cols = [
    [20, 'Union List', 'national importance', ['defence', 'foreign affairs', 'railways, banking']],
    [230, 'Concurrent List', 'both may legislate', ['education', 'forests', 'marriage, trade unions']],
    [440, 'State List', 'local importance', ['police, public order', 'agriculture', 'public health']],
  ];
  for (const [x, a, b, items] of cols) {
    s.rect(x, 20, 180, 170, { sw: 1.8, fill: a === 'Concurrent List' ? 'fill' : undefined });
    s.text(x + 90, 42, a, { bold: true, size: 14 });
    s.text(x + 90, 62, b, { size: 12, muted: true });
    items.forEach((t, i) => s.text(x + 90, 100 + i * 26, t, { size: 13 }));
  }
  s.text(320, 214, 'Residuary subjects (in no list): Parliament', { size: 13, color: 'accent' });
  return s.visual(
    'Three boxes for the three lists of the Seventh Schedule. Union List, subjects of national importance such as defence, foreign affairs, railways and banking; Concurrent List, where both may legislate, such as education, forests, marriage and trade unions; State List, subjects of local importance such as police and public order, agriculture and public health. Below: residuary subjects belong to Parliament',
    'Examples only; the lists are much longer.',
  );
})();

const vRotation = (() => {
  const s = new Svg(620, 200);
  const years = [2026, 2028, 2030, 2032];
  years.forEach((y, i) => {
    const x = 70 + i * 160;
    s.line(x, 40, x, 170, { sw: 1, color: 'muted', dash: true });
    s.text(x, 26, String(y), { bold: true, size: 13 });
  });
  const groups = [['Group 1', 0], ['Group 2', 1], ['Group 3', 2]];
  groups.forEach(([g, k], i) => {
    const y = 60 + i * 38;
    const start = 70 + (k - 2) * 160;
    const x0 = Math.max(70, start);
    const x1 = Math.min(550, start + 3 * 160);
    s.rect(x0, y, x1 - x0, 24, { fill: 'fill', sw: 1.4, rx: 4 });
    s.text(x0 + 8, y + 12, `${g}: retires in ${2026 + k * 2}`, { anchor: 'start', size: 12 });
  });
  return s.visual(
    'Schematic timeline from 2026 to 2032 showing three groups of Rajya Sabha members whose six-year terms end in different years, 2026, 2028 and 2030, so that about one-third retire every second year and the House is never empty',
    'Imagined years; schematic, not real batches.',
  );
})();

const vHouses = table(
  ['Feature', 'Lok Sabha', 'Rajya Sabha'],
  [
    ['Also called', 'House of the People', 'Council of States'],
    ['Chosen by', 'voters, by direct election', 'elected MLAs; 12 nominated by the President'],
    ['Maximum size', `${LS_MAX} elected`, `${RS_MAX} (${RS.elected} elected + ${RS.nominated} nominated)`],
    ['Present strength', `${LS.present}`, `${RS.present}`],
    ['Minimum age', `${LS.ageLS}`, `${RS.ageRS}`],
    ['Term', '5 years; can be dissolved', 'permanent; members serve 6 years'],
    ['Presiding officer', 'Speaker (elected by members)', 'Vice-President (ex-officio Chairman)'],
  ],
  'Comparison table of the Lok Sabha and the Rajya Sabha: name, method of choice, maximum size, present strength, minimum age, term and presiding officer',
  'Present strengths as of 2024.',
);
const vSpkRemoval = flow(
  'LR',
  ['At least 14 days\' notice of a resolution', 'Debate: Speaker does not preside', 'Vote: majority of all the then members', 'Office falls vacant'],
  'Flow of the removal of the Speaker: fourteen days\' notice, debate with the Speaker not presiding, vote by a majority of all the then members, then the office falls vacant',
  'Removal of the Speaker',
);
const vSpkElect = flow(
  'LR',
  ['New Lok Sabha meets', 'Members elect a Speaker from among themselves', 'Speaker presides for the life of the House', 'Continues till the next House first meets'],
  'Flow of the Speaker\'s tenure: a new Lok Sabha meets, members elect a Speaker from among themselves, the Speaker presides for the life of the House and continues until the next House first meets',
  'Election and tenure of the Speaker',
);
const vSpkPowers = table(
  ['Function', 'What the Speaker does'],
  [
    ['Presiding', 'conducts business, decides who speaks, keeps order'],
    ['Money Bills', 'certifies whether a bill is a Money Bill; decision final'],
    ['Casting vote', 'votes only to break a tie'],
    ['Joint sitting', 'presides when both Houses sit together'],
    ['Quorum', 'adjourns the House if one-tenth of members are not present'],
  ],
  'Table of five functions of the Speaker: presiding, certifying Money Bills, casting vote, presiding over joint sittings and adjourning the House for want of quorum',
);
const vLsQual = table(
  ['Qualification', 'Lok Sabha', 'Rajya Sabha'],
  [
    ['Citizen of India', 'yes', 'yes'],
    ['Minimum age', `${LS.ageLS} years`, `${RS.ageRS} years`],
    ['No office of profit', 'yes', 'yes'],
    ['Not of unsound mind or insolvent', 'yes', 'yes'],
  ],
  'Table of qualifications: both Houses need citizenship, no office of profit and sound mind; the minimum age is 25 for the Lok Sabha and 30 for the Rajya Sabha',
);
const vTerm = flow(
  'TB',
  ['Normal term: five years from the first meeting', 'Shortened: President dissolves on the Prime Minister\'s advice', 'Extended in a national emergency: one year at a time', 'Limit: not beyond six months after the emergency ends'],
  'Flow of the Lok Sabha term: normally five years, may be shortened by dissolution, may be extended during a national emergency by one year at a time, but not beyond six months after the emergency ends',
  'Term of the Lok Sabha',
);
const vAnswerPlan = table(
  ['Part', 'Marks', 'Plan'],
  [
    ['(i)', '3', 'three facts, one line each'],
    ['(ii)', '3', 'three points; use the key word'],
    ['(iii)', '4', 'four points or two explained points'],
  ],
  'Table planning a ten-mark answer in three parts worth 3, 3 and 4 marks, with one point per mark',
  'One clear point earns one mark.',
);
const vEffMaj = table(
  ['Step', 'Working'],
  [
    ['Seats in the House', String(VAC.seats)],
    ['Vacant seats', String(VAC.vacant)],
    ['All the then members', `${VAC.seats} − ${VAC.vacant} = ${THEN_MEMBERS}`],
    ['Majority needed', `more than half of ${THEN_MEMBERS} = ${EFFECTIVE_MAJ}`],
  ],
  `Worked table: ${VAC.seats} seats minus ${VAC.vacant} vacancies gives ${THEN_MEMBERS} members; a majority of them is ${EFFECTIVE_MAJ}`,
  'Imagined figures.',
);
const vRsChoose = flow(
  'LR',
  ['Voters elect MLAs', 'MLAs elect Rajya Sabha members', 'Proportional representation, single transferable vote', '12 more nominated by the President'],
  'Flow: voters elect MLAs, the elected MLAs elect Rajya Sabha members by proportional representation with the single transferable vote, and the President nominates twelve more',
  'How the Rajya Sabha is chosen',
);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'The Union Parliament — Part 1: Federal Set-up, Lok Sabha and the Speaker',
  goals: [
    'Explain how powers are divided between the Union and the States',
    'Describe the composition, term and qualifications of the Lok Sabha',
    'Explain how the Speaker is elected and removed, and the Speaker\'s functions',
  ],
  slides: [
    sl('title', 'The Union Parliament', {
      b: 'Part 1 — the **federal set-up**, the **Lok Sabha** and its **Speaker**.',
      v: vParliament,
      n: 'Welcome. In this chapter we study the Parliament of India, the body that makes laws for the whole country. Parliament has three parts: the President, the Rajya Sabha and the Lok Sabha. In this first part we see how powers are shared between the Union and the States, how the Lok Sabha is formed, and why its presiding officer, the Speaker, matters so much.',
    }),
    sl('concept', 'A federal set-up', {
      b: 'India has **two levels of government**: the **Union** and the **States**. The **Constitution** divides law-making powers between them, so neither can take away the other\'s powers on its own.',
      bl: ['Written Constitution', 'Division of powers', 'Independent courts to settle disputes'],
      n: 'India is a federation. There is a government for the whole country, called the Union, and a government in each State. The Constitution itself divides the subjects on which each can make laws. Because the division is written down, neither level can simply take over the other\'s work, and the courts can settle disputes between them.',
    }),
    sl('diagram', 'Three lists in the Seventh Schedule', {
      v: vLists,
      n: 'The division is made through three lists in the Seventh Schedule. The Union List has subjects of national importance, such as defence and foreign affairs. The State List has subjects of local importance, such as police and agriculture. On the Concurrent List both may make laws, for example education and forests. Any subject not named in any list is a residuary subject, and Parliament makes laws on it.',
    }),
    sl('check', 'Quick check: which list?', {
      b: 'Kavya\'s town needs more police stations. Whose subject is this?',
      chk: 'm_list_police',
      n: 'Think about whether the subject is national or local. Then pick the list.',
    }),
    sl('concept', 'A strong Centre', {
      b: 'The division of powers **favours the Union**.',
      bl: ['The Union List has the most important subjects', 'Residuary powers belong to the Union', 'On a Concurrent subject, a Union law generally prevails over a conflicting State law'],
      v: table(['Situation', 'Who decides'], [['Unlisted subject', 'Parliament'], ['Clash on a Concurrent subject', 'Union law generally prevails'], ['State subject', 'State legislature']], 'Table of three situations: unlisted subjects are decided by Parliament, a clash on a Concurrent subject is generally won by the Union law, and State subjects by the State legislature'),
      n: 'Although India is federal, the Centre has been made stronger. The most important subjects are in the Union List. Residuary powers belong to the Union. And if a State law and a Union law clash on a Concurrent subject, the Union law generally prevails. This is why India is often described as a federation with a strong Centre.',
    }),
    sl('concept', 'The Lok Sabha: House of the People', {
      b: `Members are **directly elected** by adult citizens. Up to **${LS.states}** from the States and **${LS.uts}** from the Union Territories (maximum **${LS_MAX}**); **${LS.present}** are elected at present.`,
      bl: ['Seats reserved for Scheduled Castes and Scheduled Tribes', `Dated note: two Anglo-Indian members were nominated earlier (old maximum ${LS_MAX_OLD}); this ended with the 104th Amendment in January 2020`],
      v: vHouses,
      n: 'The Lok Sabha is the House of the People. Its members are chosen directly by the voters. Up to five hundred and thirty members come from the States and up to twenty from the Union Territories. At present five hundred and forty-three seats are filled at a general election. Earlier, two members of the Anglo-Indian community were nominated, but that provision ended in January twenty twenty.',
    }),
    sl('concept', 'Who can become a member?', {
      v: vLsQual,
      n: 'To be a member of the Lok Sabha, a person must be a citizen of India and at least twenty-five years old. The person must not hold an office of profit under the government, and must not be of unsound mind or an undischarged insolvent. Notice that the Rajya Sabha needs the same, except that the minimum age there is thirty years.',
    }),
    sl('check', 'Quick check: old enough?', {
      b: 'Ritika was born in 2003. From which year can she contest a Lok Sabha election?',
      chk: 'm_ls_age',
      n: 'Add the minimum age for the Lok Sabha to her year of birth.',
    }),
    sl('diagram', 'The term of the Lok Sabha', {
      v: vTerm,
      n: 'The Lok Sabha normally lasts five years from its first meeting. It can end earlier if the President dissolves it on the advice of the Prime Minister. During a national emergency, Parliament can extend its life by law, one year at a time, but never beyond six months after the emergency is over.',
    }),
    sl('example', 'Worked example 1: dissolution or extension?', {
      b: 'Decide what happens in each imagined case.',
      bl: ['A three-year-old Lok Sabha faces a fresh election → it was **dissolved early**', 'An emergency is in force when the term ends → Parliament may **extend** it by one year', 'The emergency ends; the House is now 6½ years old → it must end **within six months** of the emergency\'s end'],
      v: table(['Case', 'Rule applied'], [['Early election', 'Dissolution by the President on advice'], ['Emergency at term end', 'Extension by law, one year at a time'], ['Emergency over', 'No more than six months beyond it']], 'Worked table of three cases: an early election means dissolution, an emergency at the end of the term allows extension by one year at a time, and after the emergency ends the House can last at most six more months'),
      n: 'Let us apply the rules. If a Lok Sabha only three years old faces an election, it must have been dissolved early. If an emergency is in force when its five years end, Parliament may extend it by one year at a time. Once the emergency is over, the House can continue for at most six more months.',
    }),
    sl('concept', 'The Speaker', {
      b: 'The **presiding officer** of the Lok Sabha. Elected by the **members from among themselves**; holds office for the **life of the House**.',
      v: vSpkElect,
      n: 'The Speaker presides over the Lok Sabha. The members elect the Speaker from among themselves, usually soon after a new House first meets. The Speaker stays in office for the life of that House, and even after the House is dissolved, continues until just before the first meeting of the new Lok Sabha, so the office is never empty.',
    }),
    sl('diagram', 'Removing the Speaker', {
      v: vSpkRemoval,
      n: 'Removing a Speaker is deliberately difficult. Members must give at least fourteen days notice of a resolution. While it is discussed, the Speaker does not preside, though the Speaker may speak and vote. The resolution passes only with a majority of all the then members of the House, which is called an effective majority.',
    }),
    sl('example', 'Worked example 2: an effective majority', {
      b: `The House has ${VAC.seats} seats and ${VAC.vacant} are vacant. How many votes remove the Speaker?`,
      v: vEffMaj,
      n: 'Here is a worked example with imagined figures. Start with the seats, five hundred and forty-three. Subtract the seven vacant seats to get five hundred and thirty-six members. A majority of them is more than half, which is two hundred and sixty-nine votes. Fewer votes than that, even if they outnumber the votes against, do not remove the Speaker.',
    }),
    sl('diagram', 'Functions of the Speaker', {
      v: vSpkPowers,
      n: 'The Speaker conducts the business of the House, decides who speaks and keeps order. The Speaker certifies whether a bill is a Money Bill, and that decision is final. The Speaker votes only to break a tie, presides over joint sittings of both Houses, and adjourns the House if one-tenth of the members are not present.',
    }),
    sl('check', 'Quick check: a tied vote', {
      b: 'A vote in the Lok Sabha is tied. What does the Speaker do?',
      chk: 'm_spk_casting',
      n: 'Remember when the Speaker votes.',
    }),
    sl('check', 'Quick check: after dissolution', {
      b: 'The Lok Sabha is dissolved in March. Who is Speaker in April?',
      chk: 'm_spk_dissolve',
      n: 'Think about why the office should never be empty.',
    }),
    sl('summary', 'Summary of Part 1', {
      bl: ['Federal set-up: three lists; residuary powers with the Union; Union law prevails on Concurrent clashes', `Lok Sabha: directly elected, up to ${LS_MAX}, ${LS.present} at present; age 25; five-year term`, 'Speaker: elected by members; removed by an effective majority after 14 days\' notice; casting vote; certifies Money Bills'],
      v: vParliament,
      n: 'To sum up Part 1. Powers are divided by three lists, and the Centre is stronger. The Lok Sabha is directly elected, has five hundred and forty-three elected members at present, needs a minimum age of twenty-five, and lasts five years. The Speaker is elected by the members, is hard to remove, votes only in a tie and certifies Money Bills.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['Write numbers exactly: 530 + 20, 543, 25 years, 14 days', 'For removal of the Speaker, say "majority of all the then members", not "two-thirds"', 'Give one example for each list when asked about the division of powers', 'In a 10-mark question, match points to marks: 3 + 3 + 4'],
      v: vAnswerPlan,
      n: 'Some tips for the examination. Write the numbers exactly. For the removal of the Speaker, say a majority of all the then members, not two-thirds. When asked about the lists, give an example for each. And in a ten-mark question, plan three, three and four points so that every mark has a matching point.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'The Union Parliament — Part 2: The Rajya Sabha',
  goals: [
    'Describe the composition of the Rajya Sabha and how its members are chosen',
    'Explain why the Rajya Sabha is a permanent House',
    'Compare the two Houses and plan a 10-mark answer',
  ],
  slides: [
    sl('title', 'The Rajya Sabha: Council of States', {
      b: 'Part 2 — composition, election, term and Presiding Officer of the **Rajya Sabha**.',
      v: vHouses,
      n: 'In Part 2 we study the Rajya Sabha, the Council of States. It differs from the Lok Sabha in how its members are chosen, how long they serve, and who presides over it. Keep the comparison table in mind as we go through each point.',
    }),
    sl('concept', 'Composition', {
      b: `Maximum **${RS_MAX}**: up to **${RS.elected}** representatives of the States and Union Territories and **${RS.nominated}** members **nominated by the President**. Present strength **${RS.present}** (as of 2024).`,
      bl: ['Seats are shared among the States roughly by population', 'Nominated members: special knowledge in literature, science, art and social service'],
      v: table(['Part', 'Number'], [['Representatives of States and UTs', `up to ${RS.elected}`], ['Nominated by the President', String(RS.nominated)], ['Maximum', String(RS_MAX)]], `Table: up to ${RS.elected} representatives of States and Union Territories plus ${RS.nominated} nominated, a maximum of ${RS_MAX}`),
      n: 'The Rajya Sabha can have at most two hundred and fifty members. Up to two hundred and thirty-eight represent the States and Union Territories, and twelve are nominated by the President for their special knowledge in literature, science, art and social service. Its present strength is two hundred and forty-five.',
    }),
    sl('diagram', 'How members are chosen', {
      v: vRsChoose,
      n: 'Rajya Sabha members are not chosen by the voters directly. The voters elect members of the State Legislative Assemblies, and these elected members then choose the State\'s representatives in the Rajya Sabha, using proportional representation with the single transferable vote. The President adds twelve nominated members.',
    }),
    sl('check', 'Quick check: how did she get there?', {
      b: 'A classical dancer joins the Rajya Sabha without contesting any election. How?',
      chk: 'm_rs_nominate',
      n: 'Recall who the twelve nominated members are.',
    }),
    sl('concept', 'Qualifications and term', {
      bl: ['Citizen of India', 'At least 30 years of age', 'Six-year term for each member'],
      v: vLsQual,
      n: 'A member of the Rajya Sabha must be a citizen of India and at least thirty years old, with the same disqualifications as for the Lok Sabha. Each member serves for six years, which is one year longer than the normal life of a Lok Sabha.',
    }),
    sl('diagram', 'A permanent House', {
      v: vRotation,
      n: 'The Rajya Sabha is never dissolved. Its members are divided so that about one-third retire every second year, and new members are elected in their place. In this imagined picture, three groups end their terms in different years, so the House always has two-thirds of its members continuing. That is why it is called a permanent House.',
    }),
    sl('example', 'Worked example 3: reading a term', {
      b: 'Meera is elected to the Rajya Sabha in 2026 for a full term. When does it end, and does the Lok Sabha\'s dissolution affect her?',
      bl: ['Step 1: term = 6 years → 2026 + 6 = **2032**', 'Step 2: dissolving the Lok Sabha does **not** affect the Rajya Sabha'],
      v: table(['Question', 'Answer'], [['End of term', '2032'], ['Effect of Lok Sabha dissolution', 'none: the Rajya Sabha is permanent']], 'Worked table: a member elected in 2026 serves until 2032, and the dissolution of the Lok Sabha does not affect the Rajya Sabha'),
      n: 'Here is a quick worked example. Meera is elected in twenty twenty-six for a full term of six years, so her term ends in twenty thirty-two. If the Lok Sabha is dissolved in between, nothing happens to her seat, because the Rajya Sabha is a permanent House that is not dissolved.',
    }),
    sl('concept', 'The Presiding Officer', {
      b: 'The **Vice-President** of India is the **ex-officio Chairman**; a **Deputy Chairman**, elected by the members, presides in the Chairman\'s absence.',
      v: table(['House', 'Presiding officer', 'Deputy'], [['Lok Sabha', 'Speaker', 'Deputy Speaker'], ['Rajya Sabha', 'Vice-President (Chairman)', 'Deputy Chairman']], 'Table: the Lok Sabha has a Speaker and Deputy Speaker; the Rajya Sabha has the Vice-President as Chairman and an elected Deputy Chairman'),
      n: 'The Vice-President of India is the Chairman of the Rajya Sabha by virtue of office. The Vice-President is not a member of the House. When the Chairman is absent, the Deputy Chairman, elected by the members of the Rajya Sabha, presides.',
    }),
    sl('check', 'Quick check: permanent House', {
      b: 'Why is the Rajya Sabha called a permanent House?',
      chk: 'm_rs_retire',
      n: 'Think about dissolution and retirement.',
    }),
    sl('concept', 'Why have a second House?', {
      bl: ['Represents the **States** in Parliament', 'Brings **experts** into debate', 'Re-examines bills: a **check on hasty laws**', 'Gives **continuity** when the Lok Sabha is dissolved'],
      v: flow('TB', ['Lok Sabha passes a bill', 'Rajya Sabha debates it again', 'Changes suggested or agreed', 'Better-considered law'], 'Flow of a bill through both Houses: the Lok Sabha passes it, the Rajya Sabha debates it again, changes are suggested or agreed, and the result is a better-considered law', 'A House of second thoughts'),
      n: 'Why does India need a second House? The Rajya Sabha represents the States, brings experts into Parliament through nomination, and takes a second look at bills passed by the Lok Sabha, which can prevent hasty laws. Because it is never dissolved, it also gives continuity when the Lok Sabha is dissolved.',
    }),
    sl('two-column', 'Comparing the two Houses', {
      cols: ['**Lok Sabha:** direct election; age 25; five-year term; can be dissolved; Speaker presides; ministers responsible to it.', '**Rajya Sabha:** elected by MLAs plus 12 nominated; age 30; members serve six years; permanent; Vice-President presides; can delay a Money Bill only 14 days.'],
      v: vHouses,
      n: 'Let us compare. The Lok Sabha is directly elected, needs an age of twenty-five, lasts five years and can be dissolved. The Rajya Sabha is chosen by State legislators with twelve nominated members, needs an age of thirty, and is permanent. The Council of Ministers answers to the Lok Sabha, which is why it is the more powerful House.',
    }),
    sl('example', 'Worked example 4: planning a 10-mark answer', {
      b: 'Question: (i) composition of the Rajya Sabha [3]; (ii) method of choosing members and term [3]; (iii) why it is permanent and who presides [4].',
      bl: ['(i) 250 maximum; 238 elected; 12 nominated', '(ii) elected by MLAs; proportional representation, single transferable vote; six years', '(iii) not dissolved; one-third retire every two years; Vice-President is Chairman; Deputy Chairman'],
      v: vAnswerPlan,
      n: 'Here is how to plan a ten-mark answer. For part one, worth three marks, write three facts: the maximum of two hundred and fifty, the elected members and the twelve nominated. For part two, three points on election and term. For part three, four points: not dissolved, one-third retire, the Vice-President chairs, and the Deputy Chairman.',
    }),
    sl('check', 'Quick check: reading a picture', {
      b: 'Study the bar picture of Houses P and Q. Which is the Rajya Sabha?',
      chk: 'm_rs_picture',
      n: 'Look for nominated members in the picture.',
    }),
    sl('summary', 'Summary of Part 2', {
      bl: [`Rajya Sabha: maximum ${RS_MAX} (${RS.elected} + ${RS.nominated}); ${RS.present} at present`, 'Elected by MLAs by proportional representation; 12 nominated by the President', 'Age 30; six-year term; one-third retire every two years; never dissolved', 'Vice-President is ex-officio Chairman'],
      v: vRotation,
      n: 'To sum up Part 2. The Rajya Sabha has at most two hundred and fifty members, with twelve nominated by the President. Its elected members are chosen by State legislators. Members must be thirty, serve six years, and one-third retire every two years, so the House is never dissolved. The Vice-President is its Chairman.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['Do not confuse 250 (maximum) with 245 (present)', 'Rajya Sabha members are elected by elected MLAs, not by the people', 'The Vice-President is Chairman but not a member', 'For comparisons, write both sides of every point'],
      v: table(['Common slip', 'Correct form'], [['Rajya Sabha is dissolved every six years', 'Never dissolved; members serve six years'], ['Speaker chairs the Rajya Sabha', 'Vice-President chairs it'], ['Lok Sabha has 552 members today', `${LS.present} elected; maximum ${LS_MAX} since 2020`]], 'Table of three common slips and their corrections: the Rajya Sabha is never dissolved, the Vice-President chairs it, and the Lok Sabha has 543 elected members with a maximum of 550 since 2020'),
      n: 'A few final tips. Two hundred and fifty is the maximum size of the Rajya Sabha, while two hundred and forty-five is its present size. Its members are chosen by elected MLAs, not by the people. The Vice-President chairs it without being a member. And in comparisons, always write both sides of each point.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'The Union Parliament: Lok Sabha, Rajya Sabha and the Speaker — Notes',
  sections: [
    {
      h: '1. Parliament and the federal set-up',
      t: 1,
      b: 'Parliament consists of the **President**, the **Rajya Sabha** and the **Lok Sabha**. India is a **federation**: the Constitution divides law-making powers between the Union and the States through three lists in the **Seventh Schedule**.\n\n- **Union List:** subjects of national importance, e.g. defence, foreign affairs, railways, banking.\n- **State List:** subjects of local importance, e.g. police and public order, agriculture, public health.\n- **Concurrent List:** both may legislate, e.g. education, forests, marriage, trade unions. In a clash, the **Union law generally prevails**.\n- **Residuary powers** (subjects in no list) belong to **Parliament**.',
      terms: [['Federation', 'A system with two levels of government whose powers are divided by a written constitution.'], ['Residuary powers', 'Power to make laws on subjects not mentioned in any list; in India it belongs to Parliament.']],
      v: vLists,
      vs: [vParliament],
    },
    {
      h: '2. The Lok Sabha: composition',
      t: 2,
      b: `The **House of the People**, elected **directly** by adult citizens. Up to **${LS.states}** members from the States and **${LS.uts}** from the Union Territories (maximum **${LS_MAX}**); **${LS.present}** are elected at present. Seats are **reserved** for Scheduled Castes and Scheduled Tribes.\n\n**Dated note:** until January 2020 the President could nominate two members of the Anglo-Indian community, making the maximum ${LS_MAX_OLD}; the 104th Amendment (2020) did not extend this, so no members are nominated now.`,
      terms: [['House of the People', 'The Lok Sabha, so called because its members are elected directly by the people.']],
      v: vHouses,
    },
    {
      h: '3. The Lok Sabha: qualifications and term',
      t: 2,
      b: '**Qualifications:** citizen of India; at least **25 years**; name on an electoral roll; must not hold an **office of profit** under the government; must not be of unsound mind or an undischarged insolvent.\n\n**Term:** five years from the first meeting. It may be **dissolved earlier** by the President on the advice of the Prime Minister. During a **national emergency** Parliament may extend it by law, **one year at a time**, but not beyond **six months after the emergency** ends.',
      terms: [['Office of profit', 'A paid post under the government that disqualifies a person from membership unless exempted by law.'], ['Dissolution', 'Ending the life of the Lok Sabha so that a fresh general election is held.']],
      v: vTerm,
      vs: [vLsQual],
    },
    {
      h: '4. The Speaker',
      t: 3,
      b: '**Election:** by the members of the Lok Sabha from among themselves. **Tenure:** the life of the House; continues after dissolution until just before the first meeting of the new House.\n\n**Removal:** a resolution after at least **14 days\' notice**, passed by a **majority of all the then members** (effective majority); the Speaker does not preside during it but may speak and vote.\n\n**Functions:** presides and keeps order; certifies **Money Bills** (final); **casting vote** in a tie; presides over **joint sittings**; adjourns the House if the **quorum** of one-tenth is not present. The **Deputy Speaker** presides in the Speaker\'s absence.',
      terms: [['Effective majority', 'A majority of all the then members of the House, that is total seats minus vacancies.'], ['Casting vote', 'A vote given by the presiding officer only to break a tie.']],
      v: vSpkRemoval,
      vs: [vSpkPowers, vEffMaj],
    },
    {
      h: '5. The Rajya Sabha',
      t: 4,
      b: `**Composition:** maximum **${RS_MAX}** = up to **${RS.elected}** representatives of the States and Union Territories + **${RS.nominated}** nominated by the President (literature, science, art, social service). Present strength **${RS.present}** (as of 2024).\n\n**Election:** by the **elected members of the State Legislative Assemblies**, by **proportional representation** with the **single transferable vote**.\n\n**Qualifications:** citizen; at least **30 years**; other conditions as for the Lok Sabha. **Term:** six years. It is a **permanent House**: never dissolved; about **one-third retire every second year**.\n\n**Presiding Officer:** the **Vice-President** as ex-officio Chairman; an elected **Deputy Chairman**.`,
      terms: [['Council of States', 'The Rajya Sabha, so called because it represents the States.'], ['Ex-officio', 'By virtue of holding another office; the Vice-President chairs the Rajya Sabha because of being Vice-President.']],
      v: vRsChoose,
      vs: [vRotation],
    },
    {
      h: '6. Comparing the two Houses',
      t: [2, 4],
      b: 'The **Lok Sabha** is more powerful: the Council of Ministers is responsible to it; Money Bills start there and the Rajya Sabha can delay them only 14 days; a no-confidence motion can be moved only there. The **Rajya Sabha** still matters: it represents the States, brings in experts and re-examines bills.',
      v: vHouses,
    },
  ],
  tips: '**Common mistakes**\n- Writing 552 as today\'s Lok Sabha: the maximum is **550** elected since 2020; **543** are elected at present.\n- Saying the Speaker is removed by a two-thirds majority: it is a **majority of all the then members** after **14 days\' notice**.\n- Saying the Rajya Sabha is elected by the people: it is elected by **elected MLAs**.\n- Mixing **250** (maximum) and **245** (present) for the Rajya Sabha.\n\n**How marks are usually awarded**\n- 1 mark: one correct option or term.\n- 2 marks: two clear points.\n- 10 marks: three parts (3 + 3 + 4), one point per mark.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['Three parts of Parliament', 'The **President**, the **Rajya Sabha** and the **Lok Sabha**.', 'fact', 1],
  ['Where are the three lists?', 'In the **Seventh Schedule** of the Constitution.', 'fact', 1],
  ['**Union List**: two examples', 'Defence, foreign affairs (also railways, banking).', 'example', 1],
  ['**State List**: two examples', 'Police and public order, agriculture.', 'example', 1],
  ['**Concurrent List**: two examples', 'Education, forests.', 'example', 1],
  ['**Residuary powers**', 'Subjects in no list; belong to **Parliament**.', 'definition', 1],
  ['Clash on a Concurrent subject', 'The **Union law generally prevails**.', 'concept', 1],
  ['Lok Sabha also called', 'The **House of the People**.', 'fact', 2],
  ['Lok Sabha maximum and present', `Maximum **${LS_MAX}** elected (${LS.states} + ${LS.uts}); **${LS.present}** at present.`, 'fact', 2],
  ['Anglo-Indian nominated seats', 'Ended with the **104th Amendment (2020)**; earlier maximum 552.', 'fact', 2],
  ['Minimum age: Lok Sabha', '**25 years**.', 'fact', 2],
  ['Term of the Lok Sabha', '**Five years** from its first meeting, unless dissolved earlier.', 'fact', 2],
  ['Extension during an emergency', 'By law, **one year at a time**; not beyond **six months** after the emergency ends.', 'fact', 2],
  ['Who dissolves the Lok Sabha?', 'The **President**, on the advice of the **Prime Minister**.', 'fact', 2],
  ['Office of profit', 'A paid government post that **disqualifies** a person from membership.', 'definition', 2],
  ['Who elects the Speaker?', 'The **members of the Lok Sabha**, from among themselves.', 'fact', 3],
  ['Speaker after dissolution', 'Continues **until just before the first meeting** of the new House.', 'fact', 3],
  ['Removal of the Speaker', '**14 days\' notice**; **majority of all the then members**.', 'fact', 3],
  ['**Effective majority**', 'Majority of all the **then members** (seats minus vacancies).', 'definition', 3],
  ['When does the Speaker vote?', 'Only to **break a tie** (casting vote).', 'fact', 3],
  ['Who decides if a bill is a Money Bill?', 'The **Speaker**; the decision is **final**.', 'fact', 3],
  ['Who presides over a joint sitting?', 'The **Speaker** of the Lok Sabha.', 'fact', 3],
  ['Rajya Sabha also called', 'The **Council of States**.', 'fact', 4],
  ['Rajya Sabha maximum', `**${RS_MAX}** = ${RS.elected} elected + ${RS.nominated} nominated.`, 'fact', 4],
  ['Rajya Sabha present strength', `**${RS.present}** (as of 2024).`, 'fact', 4],
  ['Who elects Rajya Sabha members?', '**Elected MLAs**, by proportional representation (single transferable vote).', 'fact', 4],
  ['Minimum age: Rajya Sabha', '**30 years**.', 'fact', 4],
  ['Term of a Rajya Sabha member', '**Six years**; one-third retire every **second year**.', 'fact', 4],
  ['Presiding Officer of the Rajya Sabha', 'The **Vice-President** as ex-officio Chairman.', 'fact', 4],
  ['Why "permanent House"?', 'Never dissolved; members retire in **batches** every two years.', 'exam-tip', 4],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'icse-10-history-civics-chapter-test-short',
  title: 'Chapter test (short) — The Union Parliament',
  duration: 30,
  sections: [
    { id: 'I', title: 'Part I — Compulsory (10 marks)', instr: 'Attempt all questions. Questions 1–6 carry 1 mark each; questions 7 and 8 carry 2 marks each.', items: ['m_fed_feature', 'm_ls_direct', 'm_ls_term', 'm_spk_elect', 'm_rs_chair', 'ar_ls_people', 's_ls_two_qual', 's_spk_two_functions'] },
    { id: 'II', title: 'Part II — Structured question (10 marks)', instr: 'Attempt any ONE of the two questions. Each is in three parts (3 + 3 + 4 marks).', items: [{ attempt: 1, keys: ['l_ls_full', 'l_rs_full'] }] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'icse-10-history-civics-chapter-test-long',
  title: 'Chapter test (long) — The Union Parliament',
  duration: 60,
  sections: [
    { id: 'I', title: 'Part I — Compulsory (20 marks)', instr: 'Attempt all questions. Questions 1–10 carry 1 mark each; questions 11–15 carry 2 marks each.', items: ['m_list_concurrent', 'm_residuary', 'm_ls_dissolve', 'm_ls_qual', 'm_spk_removal', 'm_spk_money', 'm_rs_max', 'm_rs_elected_by', 'm_rs_term', 'ar_spk_vote', 's_fed_lists', 's_ls_composition', 's_spk_removal_vote', 's_rs_permanent', 's_rs_nominated_why'] },
    { id: 'II', title: 'Part II — Structured questions (20 marks)', instr: 'Attempt any TWO of the three questions. Each is in three parts (3 + 3 + 4 marks).', items: [{ attempt: 2, keys: ['l_speaker_full', 'l_federal_full', 'l_compare_houses'] }] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t04 of icse-10-history-civics-ch01 only (federal set-up and the three lists; Lok Sabha composition, term, qualifications; the Speaker; Rajya Sabha composition, qualifications, election, term and Presiding Officer)',
    originality: 'every scenario, document and diagram written for this chapter (imagined people, schools and towns); no textbook text, speech, quotation, specimen or past-paper item reused (D-036)',
    facts: `Constitution as amended to 2024: Lok Sabha up to ${LS.states} + ${LS.uts} = ${LS_MAX} elected, ${LS.present} at present, no nominated members since the 104th Amendment (January 2020; earlier maximum ${LS_MAX_OLD}); age 25; five-year term; emergency extension one year at a time, not beyond six months after; Speaker removed by a majority of all the then members after 14 days' notice; Rajya Sabha maximum ${RS_MAX} (${RS.elected} + ${RS.nominated}), ${RS.present} at present (as of 2024); age 30; six-year term; one-third retire every second year; Vice-President ex-officio Chairman`,
    data: `computed and asserted in questions.mjs: ${VAC.seats} − ${VAC.vacant} = ${THEN_MEMBERS}, effective majority ${EFFECTIVE_MAJ}; 2003 + 25 = 2028; 2026 + 6 = 2032`,
    gate: 'schema, pipeline lint, deterministic verify, narration rules and the answer-leak scan run clean in this build',
  },
});
