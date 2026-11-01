// Build ICSE 10 History & Civics ch13 Independence and Partition of India. Run from platform/:
//   npx tsx content/authored/social-science/icse-10-history-civics-ch13/src/build.mjs
import path from 'node:path';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build } from '../../icse-10-history-civics-ch01/src/lib.mjs';

setUnit('icse-10-history-civics-ch13', 'social-science');
const { timelineSvg, schemeSvg, EVENTS, SECTIONS, CA, CA_TOTAL, monthsBetween, PLAN_3_JUNE, INDEPENDENCE, ATTLEE_DEADLINE } = await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- figures
const TL_ALT = 'Timeline from January 1946 to September 1947 marking: 24 March 1946 Cabinet Mission arrives, 16 May 1946 Cabinet Mission Plan, 16 August 1946 Direct Action Day, 2 September 1946 interim government, 9 December 1946 Constituent Assembly meets, 20 February 1947 Attlee statement, 3 June 1947 Mountbatten Plan, 18 July 1947 royal assent to the Independence Act, 15 August 1947 independence';
const vTimeline = timelineSvg(TL_ALT, 'Schematic timeline drawn by SOYL; label positions are for legibility only.');
const vScheme = schemeSvg('Chart of the Cabinet Mission scheme: at the top, the Union of India of British India and the princely states, handling defence, foreign affairs and communications; below it three sections, A for the Hindu-majority provinces, B for the north-west provinces and C for Bengal and Assam; at the base, provinces with all other subjects and residuary powers, and princely states with all subjects not given to the Union', 'Three-tier scheme of 1946 (schematic, drawn by SOYL; not to scale).');
const vRoute1 = flow('LR', ['Background, 1945–46', 'The Cabinet Mission', 'Union, groups, states', 'Constituent Assembly and interim government', 'Why the plan failed'], 'Route map of Part 1: the background of 1945 and 1946, the Cabinet Mission, its clauses on the Union, the groups and the states, the Constituent Assembly and interim government, and why the plan failed', 'Part 1 at a glance');
const vRoute2 = flow('LR', ['Attlee, February 1947', 'Mountbatten Plan, 3 June', 'Why it was accepted', 'Independence Act, July', '15 August 1947'], 'Route map of Part 2: Attlee\'s statement of February 1947, the Mountbatten Plan of 3 June, why it was accepted, the Independence Act of July, and independence on 15 August 1947', 'Part 2 at a glance');
const vMission = table(['Point', 'Fact'], [
  ['Members', 'Lord Pethick-Lawrence (Secretary of State for India), Sir Stafford Cripps, A. V. Alexander'],
  ['Arrived', 'March 1946'],
  ['Plan announced', '16 May 1946'],
  ['Aim', 'Agree on how Indians would frame a constitution and form a government'],
], 'Table about the Cabinet Mission: members Lord Pethick-Lawrence, Secretary of State for India, Sir Stafford Cripps and A. V. Alexander; arrived March 1946; plan announced 16 May 1946; aim to agree on how Indians would frame a constitution and form a government');
const vSections = table(['Section', 'Provinces'], [
  ['A', SECTIONS.A.join(', ')],
  ['B', SECTIONS.B.join(', ')],
  ['C', SECTIONS.C.join(', ')],
], `Table of the three sections of the 1946 plan: Section A, ${SECTIONS.A.join(', ')}; Section B, ${SECTIONS.B.join(', ')}; Section C, ${SECTIONS.C.join(' and ')}`, 'Grouping as commonly taught.');
const vCa = table(['Part of the Assembly', 'Seats'], [
  ['Provinces of British India', String(CA.provinces)],
  ['Chief Commissioners\' provinces', String(CA.chief)],
  ['Princely states', String(CA.states)],
  ['Total', String(CA_TOTAL)],
], `Table of the Constituent Assembly under the 1946 plan: ${CA.provinces} seats for the provinces of British India, ${CA.chief} for the Chief Commissioners' provinces and ${CA.states} for the princely states, ${CA_TOTAL} in all`, 'Seats in the provinces were shared among communities roughly by population.');
const vInterim = table(['Point', 'Fact'], [
  ['Took office', '2 September 1946'],
  ['Head', 'Jawaharlal Nehru (Vice-President of the Executive Council)'],
  ['Muslim League', 'Joined in October 1946'],
  ['Constituent Assembly', 'First met 9 December 1946; the League stayed away'],
], 'Table about the interim government: took office 2 September 1946, headed by Jawaharlal Nehru as Vice-President of the Executive Council; the Muslim League joined in October 1946; the Constituent Assembly first met on 9 December 1946 and the League stayed away');
const vFail = flow('TB', ['Both parties give a qualified acceptance (June 1946)', 'They read the grouping clauses differently', 'League withdraws acceptance (July 1946)', 'Direct Action Day (16 August 1946) and violence', 'Distrust in the interim government; League stays out of the Assembly'], 'Flow of why the 1946 plan failed: both parties give a qualified acceptance in June 1946; they read the grouping clauses differently; the League withdraws its acceptance in July; Direct Action Day on 16 August 1946 is followed by violence; distrust grows in the interim government and the League stays out of the Assembly', 'From acceptance to deadlock.');
const vPlan10 = table(['Part', 'Marks', 'What to write'], [
  ['(i) Facts', '3', 'Three separate facts: who, when, what'],
  ['(ii) Clauses', '3', 'Three different clauses, one per mark'],
  ['(iii) Explanation', '4', 'Four reasons or clauses, in your own words'],
], 'Worked example table planning a ten-mark answer in three parts: three facts, three different clauses, and four reasons or clauses in your own words', 'Plan before you write.');
const vMb = table(['Clause (paraphrased)', 'What it meant'], [
  ['Two dominions', 'British India divided into India and Pakistan'],
  ['Punjab and Bengal', 'Assemblies vote in two parts on dividing the province'],
  ['Boundary commission', 'Marks the border if a province is divided'],
  ['Sind', 'Assembly decides which dominion to join'],
  ['NWFP and Sylhet', 'Decided by referendum'],
  ['Princely states', 'Free to join either dominion'],
  ['Early transfer', 'Power to pass on 15 August 1947'],
], 'Table of the clauses of the Mountbatten Plan, paraphrased: two dominions, India and Pakistan; Punjab and Bengal assemblies to vote in two parts on division; a boundary commission to mark the border; Sind to decide through its assembly; the North-West Frontier Province and Sylhet by referendum; princely states free to join either dominion; power to pass on 15 August 1947', 'Paraphrased; no text of the plan is reproduced.');
const vTwoParts = flow('TB', ['Assembly of Punjab (or Bengal)', 'Members from Muslim-majority districts vote', 'Members from the other districts vote', 'If either part votes for division, the province is divided', 'Boundary commission marks the line'], 'Flow of the two-part vote: the Punjab or Bengal assembly splits into members from Muslim-majority districts and members from the other districts; each part votes; if either votes for division the province is divided; the boundary commission then marks the line', 'How a province could be divided.');
const vReasons = table(['Reason (paraphrased)', 'Why it mattered'], [
  ['Spreading communal violence', 'Leaders feared a civil war'],
  ['Deadlock in the interim government', 'Ministers could not work as a team'],
  ['Early transfer of power', 'British rule would end in August 1947, not 1948'],
  ['A strong centre for the rest of India', 'No weak federation with groups'],
  ['Lesser evil', 'Many leaders accepted partition reluctantly'],
], 'Table of reasons why the Congress accepted the 1947 plan, paraphrased: spreading communal violence and fear of civil war; deadlock in the interim government; an early transfer of power; a strong centre for the rest of India; and partition seen as the lesser evil, accepted reluctantly', 'Present the reasons neutrally; critics\' concerns are noted in the notes.');
const vIia = table(['Clause (paraphrased)', 'Effect'], [
  ['Two dominions from 15 August 1947', 'India and Pakistan become independent'],
  ['Constituent Assemblies', 'Frame constitutions and act as legislatures'],
  ['Government of India Act, 1935', 'Governs each dominion until its own constitution'],
  ['Governor-General for each dominion', 'Appointed on the advice of its own cabinet'],
  ['Paramountcy lapses', 'Princely states free of British authority'],
  ['Secretary of State abolished', 'No minister in London for India'],
  ['British Parliament', 'No power to legislate for the dominions'],
], 'Table of the clauses of the Indian Independence Act, paraphrased: two dominions from 15 August 1947; Constituent Assemblies to frame constitutions and act as legislatures; the Government of India Act 1935 to govern until new constitutions; a Governor-General for each dominion on its cabinet\'s advice; paramountcy to lapse; the Secretary of State for India abolished; and the British Parliament to lose power to legislate for the dominions', 'Paraphrased; no text of the Act is reproduced.');
const vCompare = table(['', 'Cabinet Mission Plan (1946)', 'Mountbatten Plan (1947)'], [
  ['Unity of India', 'One Union with groups', 'Two dominions'],
  ['Pakistan', 'Not accepted', 'Accepted'],
  ['Punjab and Bengal', 'Kept whole in Sections B and C', 'Could be divided by vote'],
  ['Princely states', 'Join the Union by negotiation', 'Join either dominion'],
], 'Comparison table: the Cabinet Mission Plan of 1946 proposed one Union with groups, did not accept Pakistan, kept Punjab and Bengal whole in Sections B and C, and asked states to join the Union by negotiation; the Mountbatten Plan of 1947 created two dominions, accepted Pakistan, allowed Punjab and Bengal to be divided by vote, and let states join either dominion', 'Two plans, two answers to the same question.');
const vSum1 = flow('TB', ['March 1946: Cabinet Mission arrives', '16 May 1946: plan of one Union with groups', 'Constituent Assembly and interim government', '16 August 1946: Direct Action Day and violence', 'Deadlock: the plan cannot be carried out'], 'Summary flow of Part 1: the Cabinet Mission arrives in March 1946; its plan of 16 May proposes one Union with groups; a Constituent Assembly and an interim government; Direct Action Day on 16 August 1946 and violence; deadlock, so the plan cannot be carried out', 'Part 1 in five lines.');
const vSum2 = flow('TB', ['20 February 1947: British to leave by June 1948', '3 June 1947: plan of two dominions', 'Accepted as the lesser evil', '18 July 1947: Indian Independence Act', '15 August 1947: two dominions'], 'Summary flow of Part 2: on 20 February 1947 Britain announces it will leave by June 1948; on 3 June 1947 the plan of two dominions; accepted as the lesser evil; the Indian Independence Act receives assent on 18 July 1947; two dominions on 15 August 1947', 'Part 2 in five lines.');
assert.equal(monthsBetween(PLAN_3_JUNE, INDEPENDENCE), 2);
assert.equal(monthsBetween(INDEPENDENCE, ATTLEE_DEADLINE), 10);
assert.equal(EVENTS.length, 9);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Independence and Partition — Part 1: The Cabinet Mission, 1946',
  goals: [
    'State the main clauses of the Cabinet Mission Plan',
    'Explain the grouping of provinces into Sections A, B and C',
    'Explain why the plan could not be carried out',
  ],
  slides: [
    sl('title', 'One plan, two hopes', {
      b: 'Part 1 — the **Cabinet Mission** of **1946**, its **clauses**, and why it **failed**.',
      v: vRoute1,
      n: 'After the Second World War, Britain was ready to hand over power, but Indian leaders disagreed about what kind of country should follow. In nineteen forty-six three British ministers came to find a plan both major parties could accept. In this part we study the clauses of their plan, and why it could not be carried out.',
    }),
    sl('diagram', 'Dates to remember', {
      b: 'From the **Mission (March 1946)** to **independence (15 August 1947)**.',
      v: vTimeline,
      n: 'This timeline shows the eighteen months that ended British rule. The Mission arrived in March nineteen forty-six and announced its plan in May. Direct Action Day came in August, and the interim government in September. In nineteen forty-seven came Attlee\'s statement in February, the Mountbatten Plan in June, the Act in July and independence in August.',
    }),
    sl('concept', 'The Cabinet Mission', {
      b: 'Three British **cabinet ministers** came to settle the **constitutional question**.',
      v: vMission,
      n: 'The Mission had three members: Lord Pethick-Lawrence, who was the Secretary of State for India, Sir Stafford Cripps and A. V. Alexander. They reached India in March nineteen forty-six, held long talks with leaders of the Congress and the Muslim League, and announced their own plan on the sixteenth of May.',
    }),
    sl('check', 'Quick check: the year of the Mission', {
      b: 'In which year did the Cabinet Mission come to India?',
      chk: 'm_chk_cm_year',
      n: 'Before we go on, check the year. When did the Cabinet Mission come to India?',
    }),
    sl('diagram', 'A three-tier scheme', {
      b: '**Union** at the top, **groups** in the middle, **provinces** and **states** at the base.',
      v: vScheme,
      n: 'The plan proposed three levels. At the top, a Union of India, including the princely states, would deal with only three subjects: defence, foreign affairs and communications. In the middle, provinces could form groups. At the base, provinces kept all other subjects and the residuary powers, and the states kept everything they did not give to the Union.',
    }),
    sl('diagram', 'Sections A, B and C', {
      b: 'Provinces placed in **three sections**.',
      v: vSections,
      n: 'The provinces were placed in three sections. Section A held the Hindu-majority provinces such as Madras, Bombay and the United Provinces. Section B held the north-western provinces: Punjab, the North-West Frontier Province and Sind. Section C held Bengal and Assam. Provinces in a section could work together as a group with its own legislature.',
    }),
    sl('example', 'Worked example 1: placing provinces', {
      b: 'Place **Sind**, **Assam** and **Orissa** in their sections, with a reason.',
      bl: ['**Sind:** Section **B**, with Punjab and the North-West Frontier Province.', '**Assam:** Section **C**, with Bengal.', '**Orissa:** Section **A**, with the other Hindu-majority provinces.', 'Tip: learn **B** and **C** first; everything else is in **A**.'],
      v: vSections,
      n: 'Let us practise. Sind belongs to Section B, together with Punjab and the North-West Frontier Province. Assam belongs to Section C with Bengal. Orissa belongs to Section A with the other Hindu-majority provinces. A simple trick: learn the two small sections, B and C, and remember that every other province was in A.',
    }),
    sl('check', 'Quick check: where was Punjab?', {
      b: 'True or false: Punjab was placed in Section C.',
      chk: 'tf_chk_section_c',
      v: vSections,
      n: 'Look at the table and decide. Was Punjab in Section C?',
    }),
    sl('diagram', 'Making the constitution', {
      b: 'A **Constituent Assembly** elected by the **provincial assemblies**.',
      v: vCa,
      n: 'A Constituent Assembly would frame the constitution. Its members from the provinces were to be elected by the provincial assemblies, not directly by the people, and seats were shared among the General, Muslim and Sikh communities roughly by population. The princely states would also send members. As commonly taught, the Assembly was to have three hundred and eighty-nine seats.',
    }),
    sl('concept', 'Other clauses', {
      b: 'An **interim government**; **no separate Pakistan**; states free to **negotiate**.',
      v: vScheme,
      n: 'Three more clauses complete the picture. An interim government of Indian leaders would run the country while the constitution was made. The demand for a fully separate Pakistan was not accepted; the groups were offered instead. And the princely states would keep their powers and negotiate their entry into the Union.',
    }),
    sl('diagram', 'The interim government', {
      b: 'Took office on **2 September 1946**, headed by **Jawaharlal Nehru**.',
      v: vInterim,
      n: 'The interim government took office on the second of September nineteen forty-six, with Jawaharlal Nehru at its head as Vice-President of the Viceroy\'s Executive Council. The Muslim League joined it in October. The Constituent Assembly first met on the ninth of December, but the League stayed away from it.',
    }),
    sl('check', 'Quick check: the head of the interim government', {
      b: 'Who headed the interim government formed in September 1946?',
      chk: 'm_chk_interim_head',
      n: 'Who led the interim government that took charge in September nineteen forty-six?',
    }),
    sl('diagram', 'Why the plan failed', {
      b: 'Different **readings**, **withdrawal**, **violence** and **distrust**.',
      v: vFail,
      n: 'At first both parties accepted the plan, each with its own reading of the grouping clauses. Disputes over whether grouping was compulsory led the League to withdraw its acceptance in July and to call for Direct Action Day on the sixteenth of August. Violence followed in Calcutta and other places, and people of every community suffered. Distrust then made the plan unworkable.',
    }),
    sl('example', 'Worked example 2: a 10-mark answer on the Mission', {
      b: 'Plan a **3 + 3 + 4** answer on the Cabinet Mission Plan.',
      bl: ['(i) **Facts:** three members; March 1946; plan of 16 May 1946.', '(ii) **Three clauses:** Union for three subjects; residuary powers with provinces; Sections A, B, C.', '(iii) **Four clauses:** Constituent Assembly; princely states; interim government; no separate Pakistan.'],
      v: vPlan10,
      n: 'Let us plan a ten-mark answer. Part one: three facts, the members and the date. Part two: three clauses on the Union, the residuary powers and the sections. Part three, for four marks: four more clauses, the Constituent Assembly, the princely states, the interim government and the rejection of a separate Pakistan. One clause, one mark.',
    }),
    sl('check', 'Quick check: placing Assam', {
      b: 'In which Section should Assam be placed?',
      chk: 'm_cm_scenario_province',
      v: vSections,
      n: 'One more practice question on the sections. Where should Assam go?',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSum1,
      n: 'To sum up Part One. The Cabinet Mission arrived in March nineteen forty-six and, on the sixteenth of May, proposed one Union with only three subjects, groups of provinces in three sections, a Constituent Assembly and an interim government. Both parties accepted it at first, but different readings, the League\'s withdrawal, Direct Action Day and the violence that followed made it unworkable.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['Plan announced **16 May 1946**.', 'Union: **defence, foreign affairs, communications** only.', 'Section B = **Punjab, NWFP, Sind**; Section C = **Bengal, Assam**.', 'Assembly elected by **provincial assemblies**, not directly.', 'Describe the **violence** of 1946 **humanely**, without blaming any community.'],
      v: vMission,
      n: 'A few tips. Remember the date, the sixteenth of May nineteen forty-six. The Union had only three subjects: defence, foreign affairs and communications. Know Sections B and C by heart. The Assembly was elected by the provincial assemblies, not directly. And when you write about the violence of nineteen forty-six, describe the suffering without blaming any community.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Independence and Partition — Part 2: The Mountbatten Plan and the Independence Act',
  goals: [
    'State the clauses of the Mountbatten Plan of 3 June 1947',
    'Explain why the Congress accepted the plan and partition',
    'State the main clauses of the Indian Independence Act, 1947',
  ],
  slides: [
    sl('title', 'The road to 15 August 1947', {
      b: 'Part 2 — **Attlee\'s statement**, the **Mountbatten Plan**, and the **Independence Act**.',
      v: vRoute2,
      n: 'In Part Two we follow the last months of British rule. In February nineteen forty-seven Britain announced a date for leaving. In June a new plan divided the country into two dominions. In July the British Parliament passed the Act that made it law, and on the fifteenth of August India became independent.',
    }),
    sl('concept', 'Attlee\'s statement, February 1947', {
      b: 'Britain would hand over power by **June 1948**.',
      v: vTimeline,
      n: 'On the twentieth of February nineteen forty-seven the British Prime Minister, Clement Attlee, announced that Britain would transfer power to Indian hands by June nineteen forty-eight at the latest. Lord Mountbatten replaced Lord Wavell as Viceroy in March, with the task of arranging the transfer.',
    }),
    sl('diagram', 'The plan of 3 June 1947', {
      b: 'Two **dominions**, **India** and **Pakistan**.',
      v: vMb,
      n: 'On the third of June nineteen forty-seven Mountbatten announced his plan. The country was to be split into two dominions, called India and Pakistan. Areas would choose between them in different ways, a boundary commission would mark the borders, the princely states could join either dominion, and power would pass much earlier than planned, on the fifteenth of August.',
    }),
    sl('diagram', 'How Punjab and Bengal decided', {
      b: 'Assemblies voted in **two parts**.',
      v: vTwoParts,
      n: 'Punjab and Bengal each had Muslim-majority districts and districts where others were in a majority. So the members of each assembly met in two parts and voted separately. If either part voted to divide the province, it would be divided, and a boundary commission would mark the line between the two new parts.',
    }),
    sl('check', 'Quick check: the two-part vote', {
      b: 'Which two provinces voted in two parts on division?',
      chk: 'm_chk_two_parts',
      v: vTwoParts,
      n: 'Which two provinces decided on division by a vote in two parts?',
    }),
    sl('diagram', 'Other areas', {
      b: '**Sind** by its assembly; **NWFP** and **Sylhet** by **referendum**.',
      v: vMb,
      n: 'Other areas decided in other ways. Sind decided through its whole assembly. The North-West Frontier Province and the Sylhet district of Assam held referendums of their people. The princely states, freed from British control, could join either dominion. In the end each of these areas chose its dominion before or soon after independence.',
    }),
    sl('example', 'Worked example 3: how did each area decide?', {
      b: 'Match each area to its method under the 3 June plan.',
      bl: ['**Punjab, Bengal:** assembly members vote in **two parts**.', '**Sind:** the **whole assembly** decides.', '**NWFP, Sylhet:** a **referendum**.', '**Princely states:** **free to join** either dominion.'],
      v: vMb,
      n: 'Let us sort the areas by method. Punjab and Bengal used a vote in two parts of the assembly. Sind decided through its whole assembly. The North-West Frontier Province and Sylhet held referendums. The princely states were free to choose. Learning the methods this way helps you answer any clause question quickly.',
    }),
    sl('check', 'Quick check: the boundary commission', {
      b: 'The boundary commission was headed by Sir Cyril ___.',
      chk: 'fb_chk_radcliffe',
      n: 'Who headed the commission that drew the new borders in Punjab and Bengal?',
    }),
    sl('diagram', 'Why the plan was accepted', {
      b: 'Accepted **reluctantly**, as the **lesser evil**.',
      v: vReasons,
      n: 'Why did Congress leaders accept a plan that divided the country? Violence was spreading and they feared civil war. The interim government could not work as a team. The plan offered an early transfer of power, in August nineteen forty-seven, and a strong central government for the rest of India. Many accepted it reluctantly, as the lesser of two evils.',
    }),
    sl('two-column', 'Two views of 1947', {
      cols: ['**Supporters said**\n\n- It ended a **deadlock** and gave an **early** transfer of power.\n- It allowed a **strong centre** for the rest of India.', '**Critics said**\n\n- It **divided provinces** and families.\n- It went against the idea of a **united, secular** India.'],
      v: vCompare,
      n: 'Present both views fairly. Supporters said the plan ended the deadlock, brought freedom early and allowed a strong central government. Critics said it divided provinces and families, led to great suffering, and went against the idea of one united, secular India for which the national movement had worked. A good answer gives both sides.',
    }),
    sl('diagram', 'Two plans compared', {
      b: '**One Union** in 1946; **two dominions** in 1947.',
      v: vCompare,
      n: 'Compare the two plans. The Cabinet Mission Plan of nineteen forty-six tried to keep one Union, with groups of provinces, and did not accept Pakistan. The Mountbatten Plan of nineteen forty-seven accepted two dominions and allowed Punjab and Bengal to be divided. The change shows how far the situation had moved in one year.',
    }),
    sl('diagram', 'The Indian Independence Act, 1947', {
      b: 'Royal assent on **18 July 1947**; in force from **15 August 1947**.',
      v: vIia,
      n: 'The British Parliament turned the plan into law through the Indian Independence Act, which received the royal assent on the eighteenth of July nineteen forty-seven. From the fifteenth of August two independent dominions came into being. Each Constituent Assembly would make its constitution and also act as its legislature, and the Government of India Act of nineteen thirty-five would apply meanwhile.',
    }),
    sl('check', 'Quick check: the appointed day', {
      b: 'Which day did the Act fix as the appointed day?',
      chk: 'm_chk_appointed_day',
      n: 'On which day did the two dominions come into being under the Act?',
    }),
    sl('concept', 'More clauses of the Act', {
      b: '**Paramountcy** lapses; the **Secretary of State** goes; London loses power.',
      v: vIia,
      n: 'The Act made other changes. British paramountcy over the princely states lapsed, so they had to decide their future. The Secretary of State for India, the minister in London, lost his office. Each dominion had a Governor-General acting on the advice of its own cabinet. And the British Parliament could no longer make laws for India.',
    }),
    sl('example', 'Worked example 4: a 10-mark answer on the Act', {
      b: 'Plan a **3 + 3 + 4** answer on the Indian Independence Act.',
      bl: ['(i) **Dates:** passed July 1947; assent 18 July; in force 15 August 1947.', '(ii) **Three clauses:** two dominions; Governor-General for each; Constituent Assembly as legislature.', '(iii) **Four clauses:** paramountcy lapses; Secretary of State abolished; 1935 Act meanwhile; British Parliament loses power.'],
      v: vPlan10,
      n: 'Let us plan a ten-mark answer on the Act. Part one: the dates, July for the passing and assent, and the fifteenth of August for its effect. Part two: three clauses on the dominions, the Governors-General and the Constituent Assemblies. Part three: four more clauses, on paramountcy, the Secretary of State, the Act of nineteen thirty-five and the British Parliament.',
    }),
    sl('check', 'Quick check: an abolished office', {
      b: 'True or false: the Act abolished the office of the Secretary of State for India.',
      chk: 'tf_chk_sos',
      n: 'Did the Act abolish the office of the Secretary of State for India? Decide true or false.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSum2,
      n: 'To sum up Part Two. In February nineteen forty-seven Britain said it would leave by June nineteen forty-eight. On the third of June nineteen forty-seven Mountbatten announced two dominions, with Punjab and Bengal voting on division and referendums in the North-West Frontier Province and Sylhet. The Congress accepted it as the lesser evil. The Independence Act made it law, and India became free on the fifteenth of August.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['Attlee: **20 February 1947**, leave by **June 1948**.', 'Mountbatten Plan: **3 June 1947**; know **who decided how**.', 'Reasons for acceptance: **violence**, **deadlock**, **early transfer**, **lesser evil**.', 'Act: assent **18 July**, in force **15 August 1947**; **paramountcy lapses**.', 'Write clauses in **your own words**; never copy a text.'],
      v: vMb,
      n: 'Final tips. Remember Attlee\'s statement of the twentieth of February and its June nineteen forty-eight deadline. For the third of June plan, know which area decided in which way. Give at least four reasons for its acceptance. For the Act, remember the eighteenth of July and the fifteenth of August, and that paramountcy lapsed. Always write clauses in your own words.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Independence and Partition of India — notes',
  sections: [
    {
      h: '1. The Cabinet Mission and its plan',
      t: 1,
      b: '- **Members:** **Lord Pethick-Lawrence** (Secretary of State for India), **Sir Stafford Cripps**, **A. V. Alexander**; arrived **March 1946**; plan announced **16 May 1946**.\n- **Union of India** of British India and the **princely states**, for **defence, foreign affairs and communications**, with power to raise the money these needed.\n- **Residuary powers** and all other subjects with the **provinces**.\n- **Groups:** provinces in **Sections A, B and C**, free to form groups with their own executives and legislatures; a province could leave its group after the **first general election** under the new constitution.\n- A fully sovereign **Pakistan** was **not accepted**.',
      terms: [['Grouping', 'The plan\'s scheme of placing provinces in Sections A, B and C so that provinces could act together on many subjects.']],
      v: vScheme,
      vs: [vSections, vMission],
    },
    {
      h: '2. Constituent Assembly, states and interim government',
      t: 1,
      b: `- **Constituent Assembly:** members from the provinces **elected by the provincial assemblies** by proportional representation, seats shared among the **General, Muslim and Sikh** communities roughly by population; the **princely states** also represented (${CA_TOTAL} seats, as commonly taught).\n- **Princely states** to keep all subjects not ceded to the Union and to **negotiate** their entry.\n- **Interim government** of Indian leaders while the constitution was framed; it took office on **2 September 1946**, headed by **Jawaharlal Nehru**; the League joined in **October 1946**.\n- The **Constituent Assembly** first met on **9 December 1946**; the League stayed away.`,
      terms: [['Interim government', 'The government of Indian leaders, headed by Nehru from 2 September 1946, that ran the country while the constitution was framed.']],
      v: vCa,
      vs: [vInterim],
    },
    {
      h: '3. Why the plan could not be carried out',
      t: 1,
      b: '- Both major parties gave a **qualified acceptance** in **June 1946**, but **read the grouping clauses differently** (compulsory or optional).\n- The **Muslim League** withdrew its acceptance in **July 1946** and called for **Direct Action Day** on **16 August 1946**.\n- **Violence** broke out in **Calcutta** and spread to other places; people of **every community** suffered greatly.\n- **Distrust** in the interim government and the League\'s absence from the Assembly made the plan unworkable.',
      terms: [['Direct Action Day', 'The day, 16 August 1946, called by the Muslim League after it withdrew its acceptance of the Cabinet Mission Plan; it was followed by serious violence.']],
      v: vFail,
    },
    {
      h: '4. Attlee\'s statement and the Mountbatten Plan',
      t: 2,
      b: '- **20 February 1947:** **Attlee** announced that Britain would transfer power by **June 1948**; **Mountbatten** replaced **Wavell** as Viceroy in **March 1947**.\n- **3 June 1947 — clauses (paraphrased):** two **dominions**, **India** and **Pakistan**; **Punjab and Bengal** assemblies to vote in **two parts** on dividing the province; a **boundary commission** (headed by **Sir Cyril Radcliffe**) to mark the borders; **Sind** to decide by its assembly; **referendums** in the **NWFP** and **Sylhet**; **princely states** free to join either dominion; power to pass on **15 August 1947**.',
      terms: [['Dominion', 'A self-governing country within the British Commonwealth, free to make its own laws.']],
      v: vMb,
      vs: [vTwoParts],
    },
    {
      h: '5. Why the Congress accepted the plan',
      t: 2,
      b: '- **Spreading violence** and fear of **civil war**.\n- **Deadlock** in the interim government: ministers of the two parties could not work as a team.\n- An **early transfer** of power, in **August 1947** instead of 1948.\n- A **strong central government** for the rest of India, without the weak Union of 1946.\n- Many leaders saw partition as the **lesser evil** and accepted it **reluctantly**.\n- **Critics** felt it divided provinces and families, caused great suffering and went against the idea of a **united, secular** India. Give both views.',
      terms: [['Lesser evil', 'The idea that partition, though painful, was better than continued violence and deadlock.']],
      v: vReasons,
      vs: [vCompare],
    },
    {
      h: '6. The Indian Independence Act, 1947',
      t: 3,
      b: '- Passed by the **British Parliament**; **royal assent** on **18 July 1947**; in force from **15 August 1947**.\n- **Clauses (paraphrased):** two independent **dominions**, **India** and **Pakistan**; each **Constituent Assembly** to frame a constitution and act as the **legislature**; the **Government of India Act, 1935**, as adapted, to govern meanwhile; a **Governor-General** for each dominion on the advice of its own cabinet (one person could serve both if they agreed); **British paramountcy** over the states to **lapse**; the office of **Secretary of State for India** abolished; the **British Parliament** to have no power to legislate for the dominions.\n- Violence and mass migration accompanied Partition; very large numbers of people were displaced or killed, and estimates vary widely.',
      terms: [['Paramountcy', 'The supreme authority of the British Crown over the princely states, which lapsed on 15 August 1947.']],
      v: vIia,
      vs: [vTimeline],
    },
  ],
  tips: '**Common mistakes**\n- Mixing up the **Cabinet Mission** (1946, one Union) and the **Mountbatten Plan** (1947, two dominions).\n- Putting **Punjab** in Section **C** (it was in **B**).\n- Saying the Constituent Assembly was **directly** elected (it was elected by **provincial assemblies**).\n- Saying **Bengal** held a referendum (only the **NWFP** and **Sylhet** did).\n- Saying India became a **republic** in 1947 (it became a **dominion**; a republic in **1950**).\n\n**How marks are usually awarded**\n- 1-mark items: one correct option or term.\n- 2 marks: two distinct clauses or reasons.\n- 10-mark questions in 3 + 3 + 4 parts: one clause or reason per mark; write in your own words.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['Cabinet Mission: members', '**Pethick-Lawrence**, **Stafford Cripps**, **A. V. Alexander**.', 'fact', 1],
  ['Cabinet Mission: arrival and plan', 'Arrived **March 1946**; plan **16 May 1946**.', 'fact', 1],
  ['Union subjects in the 1946 plan', '**Defence**, **foreign affairs**, **communications**.', 'fact', 1],
  ['Residuary powers in the 1946 plan', 'With the **provinces**.', 'fact', 1],
  ['Section A', 'Hindu-majority provinces: Madras, Bombay, UP, Bihar, CP, Orissa.', 'fact', 1],
  ['Section B', '**Punjab**, **NWFP**, **Sind**.', 'fact', 1],
  ['Section C', '**Bengal** and **Assam**.', 'fact', 1],
  ['How the Constituent Assembly was chosen (1946 plan)', 'Elected by **provincial assemblies**; seats by community and population.', 'concept', 1],
  ['1946 plan and Pakistan', 'A fully sovereign Pakistan was **not accepted**.', 'fact', 1],
  ['Interim government', 'Took office **2 September 1946**; headed by **Nehru**.', 'fact', 1],
  ['Direct Action Day', '**16 August 1946**; followed by violence.', 'fact', 1],
  ['Constituent Assembly first met', '**9 December 1946**.', 'fact', 1],
  ['Why the 1946 plan failed', 'Different readings of grouping; League withdrew; violence; distrust.', 'concept', 1],
  ['Attlee\'s statement', '**20 February 1947**: leave by **June 1948**.', 'fact', 2],
  ['Mountbatten became Viceroy', '**March 1947**, replacing **Wavell**.', 'fact', 2],
  ['Mountbatten Plan', '**3 June 1947**: two dominions, India and Pakistan.', 'fact', 2],
  ['Punjab and Bengal under the 3 June plan', 'Assemblies voted in **two parts** on division.', 'concept', 2],
  ['Referendums in 1947', '**NWFP** and **Sylhet** (Assam).', 'fact', 2],
  ['Boundary commission', 'Headed by **Sir Cyril Radcliffe**.', 'fact', 2],
  ['Princely states under the 3 June plan', 'Free to join **either** dominion.', 'fact', 2],
  ['Reasons the Congress accepted the plan', 'Violence; deadlock; early transfer; strong centre; lesser evil.', 'concept', 2],
  ['A concern of critics in 1947', 'Partition divided provinces and families and went against a united, secular India.', 'concept', 2],
  ['Indian Independence Act: assent', '**18 July 1947**.', 'fact', 3],
  ['Indian Independence Act: in force', '**15 August 1947**.', 'fact', 3],
  ['Constituent Assemblies under the Act', 'Frame constitutions **and** act as **legislatures**.', 'concept', 3],
  ['Provisional constitution after 1947', 'The **Government of India Act, 1935**, as adapted.', 'fact', 3],
  ['Paramountcy under the Act', '**Lapsed**; states had to decide accession.', 'fact', 3],
  ['Office abolished by the Act', '**Secretary of State for India**.', 'fact', 3],
  ['Head of each dominion', 'A **Governor-General**, on the advice of its own cabinet.', 'fact', 3],
  ['1946 plan vs 1947 plan', 'One Union with groups vs two dominions.', 'exam-tip', 2],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'icse-10-history-civics-chapter-test-short',
  title: 'Chapter test (short) — Independence and Partition of India',
  duration: 30,
  sections: [
    { id: 'I', title: 'Part I — Compulsory (10 marks)', instr: 'Attempt all questions. Questions 1–6 carry 1 mark each; questions 7 and 8 carry 2 marks each.', items: ['m_cm_union_subjects', 'm_cm_section_b', 'm_mb_referendum', 'm_mb_states', 'm_iia_paramountcy', 'ar_cm_weak_centre', 's_cm_two_clauses', 's_iia_two_clauses'] },
    { id: 'II', title: 'Part II — Structured question (10 marks)', instr: 'Attempt any ONE of the two questions. Each is in three parts (3 + 3 + 4 marks).', items: [{ attempt: 1, keys: ['l_cm_full', 'l_mb_full'] }] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'icse-10-history-civics-chapter-test-long',
  title: 'Chapter test (long) — Independence and Partition of India',
  duration: 60,
  sections: [
    { id: 'I', title: 'Part I — Compulsory (20 marks)', instr: 'Attempt all questions. Questions 1–10 carry 1 mark each; questions 11–15 carry 2 marks each.', items: ['m_cm_members', 'm_cm_pakistan', 'm_cm_ca_election', 'm_dad_date', 'm_mb_punjab_bengal', 'm_mb_boundary', 'm_mb_reason_violence', 'm_iia_dominions', 'm_iia_sos', 'ar_iia_paramountcy', 's_cm_ca_two', 's_dad_two', 's_mb_reasons_two', 's_attlee_two', 's_iia_ca_two'] },
    { id: 'II', title: 'Part II — Structured questions (20 marks)', instr: 'Attempt any TWO of the three questions. Each is in three parts (3 + 3 + 4 marks).', items: [{ attempt: 2, keys: ['l_cm_aftermath', 'l_mb_choices', 'l_iia_full'] }] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t03 of icse-10-history-civics-ch13 only (the Cabinet Mission Plan; the Mountbatten Plan with reasons for its acceptance; the Indian Independence Act, 1947)',
    originality: 'every diary, letter, minute and quiz scenario is imagined and written by SOYL (labelled); no textbook text or exercise and no specimen or board-paper item reused (D-036); no clause or speech quoted, all paraphrased',
    data: `event dates asserted in order (${EVENTS.map((e) => `${e[2]}/${e[1]}/${e[0]}`).join(', ')}); 3 June to 15 August 1947 = ${monthsBetween(PLAN_3_JUNE, INDEPENDENCE)} months; independence ${monthsBetween(INDEPENDENCE, ATTLEE_DEADLINE)} months before the June 1948 deadline; sections 6 + 3 + 2 = 11 provinces; Constituent Assembly ${CA.provinces} + ${CA.chief} + ${CA.states} = ${CA_TOTAL}`,
    facts: 'Cabinet Mission (Pethick-Lawrence, Cripps, Alexander) arrived March 1946, plan 16 May 1946; Direct Action Day 16 August 1946; interim government 2 September 1946 (Nehru), League joined October 1946; Constituent Assembly first met 9 December 1946; Attlee statement 20 February 1947 (by June 1948); Mountbatten Viceroy March 1947; plan 3 June 1947; Radcliffe boundary commission; Indian Independence Act assent 18 July 1947, in force 15 August 1947',
    gate: 'schema, content lint (lintExemplar), deterministic verify, originality pre-check and the editorial counts run clean on this chapter',
  },
});
