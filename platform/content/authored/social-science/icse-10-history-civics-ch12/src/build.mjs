// Build ICSE 10 History & Civics ch12 Subhas Chandra Bose, the Forward Bloc and the INA. Run from platform/:
//   npx tsx content/authored/social-science/icse-10-history-civics-ch12/src/build.mjs
import path from 'node:path';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build } from '../../icse-10-history-civics-ch01/src/lib.mjs';

setUnit('icse-10-history-civics-ch12', 'social-science');
const { timelineSvg, azadSvg, EVENTS, FB_YEAR, AZAD_HIND, yearsBetween } = await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- figures
const TL_ALT = 'Timeline from 1895 to 1950 marking: 1897 Bose born at Cuttack, 1921 resigns from the ICS, 1938 President at Haripura, 1939 Tripuri and Forward Bloc, 1941 escape from Calcutta, 1942 first INA under Mohan Singh, 1943 Provisional Government at Singapore, 1944 Imphal-Kohima campaign, 1945 reported death and Red Fort trials';
const vTimeline = timelineSvg(TL_ALT, 'Schematic timeline drawn by SOYL; label positions are for legibility only.');
const vAzad = azadSvg('Chart: the Provisional Government of Free India (Singapore, 21 October 1943) at the top, with two bodies below it, the Indian National Army (Supreme Commander Subhas Bose) and the Indian Independence League (civilian support in Southeast Asia); under the army are four units: Gandhi Brigade, Nehru Brigade, Azad Brigade and Rani of Jhansi Regiment', 'Organisation of the Provisional Government and the INA (schematic, drawn by SOYL).');
const vRoute1 = flow('LR', ['Early career', 'Haripura, 1938', 'Tripuri, 1939', 'Resignation', 'Forward Bloc'], 'Route map of Part 1: Bose\'s early career, his presidency at Haripura in 1938, the Tripuri crisis of 1939, his resignation and the formation of the Forward Bloc', 'Part 1 at a glance');
const vRoute2 = flow('LR', ['Escape, 1941', 'First INA, 1942', 'Bose takes command, 1943', 'Campaign, 1944', 'Red Fort trials'], 'Route map of Part 2: Bose\'s escape in 1941, the first INA in 1942, Bose taking command in 1943, the campaign of 1944 and the Red Fort trials', 'Part 2 at a glance');
const vEarly = table(['Year', 'Step'], [
  ['1897', 'Born at Cuttack'],
  ['1920', 'Passes the Indian Civil Service examination'],
  ['1921', 'Resigns from the ICS and joins the national movement'],
  ['1920s–30s', 'Works with C. R. Das in Bengal; youth and labour leader; imprisoned several times'],
], 'Table of Bose\'s early career: born at Cuttack in 1897, passed the ICS examination in 1920, resigned in 1921 to join the national movement, and worked with C. R. Das in Bengal in the 1920s and 1930s', 'Dates widely taught; details in the README.');
const vPresidency = table(['Session', 'Year', 'What happened'], [
  ['Haripura', '1938', 'Bose presides; presses for a firmer struggle; National Planning Committee set up'],
  ['Tripuri', '1939', 'Re-elected over Pattabhi Sitaramayya; senior leaders do not cooperate; resigns'],
], 'Table of Bose\'s two Congress presidencies: Haripura in 1938, where he pressed for a firmer struggle and the National Planning Committee was set up; and Tripuri in 1939, where he was re-elected over Pattabhi Sitaramayya but resigned when senior leaders did not cooperate');
const vCrisis = flow('TB', ['1939 election: Bose defeats Pattabhi Sitaramayya', 'Senior leaders who backed the rival do not join his working committee', 'Differences over the pace of the struggle', 'Bose resigns the presidency', `May ${FB_YEAR}: Forward Bloc formed within the Congress`], `Flow of the Tripuri crisis: Bose defeats Pattabhi Sitaramayya in 1939; senior leaders do not join his working committee; differences over the pace of the struggle; Bose resigns; in May ${FB_YEAR} he forms the Forward Bloc within the Congress`, 'From victory to a new group.');
const vFbObj = table(['Objective (paraphrased)', 'What it meant'], [
  ['Unite radical and anti-imperialist forces', 'Bring together members who wanted a bolder struggle'],
  ['Uncompromising struggle for complete independence', 'No settlement short of full freedom'],
  ['Socialist reorganisation', 'End landlordism; reorganise agriculture and industry'],
  ['Planned development', 'Economic planning for a free India'],
], 'Table of the Forward Bloc\'s objectives, paraphrased: uniting radical and anti-imperialist forces, an uncompromising struggle for complete independence, socialist reorganisation including ending landlordism, and planned development', 'Paraphrased; no text of any programme is reproduced.');
const vRoute = flow('LR', ['Calcutta (house arrest), January 1941', 'Peshawar and Kabul', 'Germany, 1941–43', 'By submarine to Southeast Asia', 'Singapore, 1943'], 'Flow of Bose\'s journey: escape from house arrest in Calcutta in January 1941, through Peshawar and Kabul to Germany, then by submarine to Southeast Asia, reaching Singapore in 1943', 'Journey shown as a sequence, not a map.');
const vFirstIna = table(['Point', 'Fact'], [
  ['Organised by', 'Captain Mohan Singh'],
  ['Year', '1942'],
  ['Soldiers', 'Indian prisoners of war captured by the Japanese in Malaya and Singapore'],
  ['Political base', 'Indian Independence League (Rash Behari Bose)'],
  ['Reorganised by', 'Subhas Chandra Bose, 1943'],
], 'Table about the first INA: organised by Captain Mohan Singh in 1942 from Indian prisoners of war captured in Malaya and Singapore, with the Indian Independence League of Rash Behari Bose as its political base, and reorganised by Subhas Chandra Bose in 1943');
const vInaObj = flow('TB', ['Free India by armed struggle', 'Build a national army above region and religion', 'Win the support of Indians in Southeast Asia', 'Act as the army of a free Indian government'], 'Flow of the INA\'s objectives: freeing India by armed struggle, building a national army above region and religion, winning the support of Indians in Southeast Asia, and acting as the army of a free Indian government', 'Objectives of the INA (paraphrased).');
const vCampaign = table(['Point', 'Fact'], [
  ['When', '1944'],
  ['Where', 'Around Imphal (Manipur) and Kohima; INA flag raised at Moirang'],
  ['With', 'Japanese forces'],
  ['Result', 'Retreat'],
  ['Reasons', 'Supply shortages, disease, the monsoon, stronger Allied forces with air power'],
], 'Table about the campaign of 1944: around Imphal in Manipur and Kohima, with the INA flag raised at Moirang, fought with Japanese forces, ending in retreat because of supply shortages, disease, the monsoon and stronger Allied forces with air power');
const vTrials = table(['Point', 'Fact'], [
  ['Where and when', 'Red Fort, Delhi, 1945–46'],
  ['Accused (first trial)', 'Shah Nawaz Khan, Prem Kumar Sahgal, Gurbaksh Singh Dhillon'],
  ['Defence included', 'Bhulabhai Desai, Jawaharlal Nehru, Tej Bahadur Sapru'],
  ['Outcome', 'Sentences remitted after nationwide protests'],
], 'Table about the INA trials: at the Red Fort in Delhi in 1945 and 1946; the first trial accused Shah Nawaz Khan, Prem Kumar Sahgal and Gurbaksh Singh Dhillon; the defence included Bhulabhai Desai, Jawaharlal Nehru and Tej Bahadur Sapru; the sentences were remitted after nationwide protests');
const vImpact = flow('TB', ['Accused were Hindu, Muslim and Sikh', 'Support across all communities', 'Nationwide meetings and protests', 'Sentences remitted', 'Unrest in the armed forces (naval mutiny, 1946)', 'Greater pressure for a transfer of power'], 'Flow of the impact of the INA trials: the accused were Hindu, Muslim and Sikh, so support came from all communities; nationwide protests followed; the sentences were remitted; unrest spread to the armed forces, as in the naval mutiny of 1946; and pressure for a transfer of power grew', 'Why the trials mattered.');
const vPlan = table(['Part', 'Marks', 'What to write'], [
  ['(i) Facts', '3', 'Three separate facts: who, when, where'],
  ['(ii) Explanation', '3', 'Three linked points, one per mark'],
  ['(iii) Evaluation', '4', 'Two strengths or effects, and a balanced point'],
], 'Worked example table planning a ten-mark answer in three parts: three facts, three explanatory points, and for four marks two effects and a balanced point', 'Plan before you write.');
const vCompare = table(['', 'Forward Bloc', 'Indian National Army'], [
  ['Formed', `May ${FB_YEAR}, in India`, '1942 (Mohan Singh); led by Bose from 1943'],
  ['Kind of body', 'Political group, first within the Congress', 'Army of the Provisional Government'],
  ['Method', 'Political struggle and mass action', 'Armed struggle'],
  ['Aim', 'Complete independence; radical programme', 'Liberation of India by force'],
], `Comparison table: the Forward Bloc, formed in India in May ${FB_YEAR} as a political group first within the Congress, aimed at complete independence through political struggle with a radical programme; the Indian National Army, first formed in 1942 and led by Bose from 1943, was the army of the Provisional Government and aimed to liberate India by armed struggle`, 'Two creations, two methods.');
const vSum1 = flow('TB', ['1921: leaves the ICS', '1938: President at Haripura', '1939: re-elected for Tripuri, then resigns', `May ${FB_YEAR}: Forward Bloc`, 'Aims: unite radicals; complete independence; socialist programme'], `Summary flow of Part 1: leaving the ICS in 1921, presidency at Haripura in 1938, re-election for Tripuri and resignation in 1939, the Forward Bloc in May ${FB_YEAR}, and its aims`, 'Part 1 in five lines.');
const vSum2 = flow('TB', ['1941: escape to Germany', '1942: first INA (Mohan Singh)', `${AZAD_HIND}: Bose takes command; Provisional Government`, '1944: Imphal-Kohima, retreat', '1945–46: Red Fort trials and their impact'], `Summary flow of Part 2: escape to Germany in 1941, the first INA in 1942, Bose taking command and proclaiming the Provisional Government in ${AZAD_HIND}, the Imphal-Kohima campaign and retreat in 1944, and the Red Fort trials of 1945 and 1946`, 'Part 2 in five lines.');
assert.equal(yearsBetween(FB_YEAR, AZAD_HIND), 4);
assert.ok(EVENTS.some(([y]) => y === AZAD_HIND));

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Subhas Chandra Bose — Part 1: Congress President and the Forward Bloc',
  goals: [
    'Describe Bose\'s early career and his two Congress presidencies',
    'Explain why he resigned in 1939 and formed the Forward Bloc',
    'State the objectives of the Forward Bloc',
  ],
  slides: [
    sl('title', 'A leader in a hurry for freedom', {
      b: 'Part 1 — Bose\'s **early career**, **Haripura and Tripuri**, and the **Forward Bloc**.',
      v: vRoute1,
      n: 'Subhas Chandra Bose, remembered as Netaji, wanted India to win full freedom without delay. In this part we follow his early career, his two terms as Congress President, the crisis at Tripuri in nineteen thirty-nine, and the new group he then formed, the Forward Bloc. In Part Two we follow him abroad and to the Indian National Army.',
    }),
    sl('diagram', 'Dates to remember', {
      b: 'From **Cuttack (1897)** to the **Red Fort trials (1945)**.',
      v: vTimeline,
      n: 'This timeline gives the main dates of the chapter. Bose was born in eighteen ninety-seven and left the civil service in nineteen twenty-one. He presided at Haripura in nineteen thirty-eight and formed the Forward Bloc in nineteen thirty-nine. He escaped in nineteen forty-one. The first army came in nineteen forty-two, the Provisional Government in nineteen forty-three, and the Red Fort trials in nineteen forty-five.',
    }),
    sl('concept', 'Early career', {
      b: 'He **passed the ICS** but **resigned** to join the freedom struggle.',
      v: vEarly,
      n: 'Bose was born at Cuttack in eighteen ninety-seven. He passed the Indian Civil Service examination in nineteen twenty, but resigned the next year because he did not wish to serve the colonial government. He joined the national movement in Bengal under C. R. Das, became a leader of the youth, and was imprisoned several times by the British.',
    }),
    sl('check', 'Quick check: his second term', {
      b: 'For which session of 1939 was Bose re-elected President?',
      chk: 'm_chk_tripuri',
      n: 'Bose was elected Congress President two years running. For which session was he re-elected in nineteen thirty-nine?',
    }),
    sl('diagram', 'Haripura and Tripuri', {
      b: '**1938** at Haripura; **1939** re-elected for Tripuri.',
      v: vPresidency,
      n: 'In nineteen thirty-eight Bose presided over the Congress session at Haripura. He pressed for a firmer struggle against British rule, and the National Planning Committee was set up during his term. In nineteen thirty-nine he stood again and defeated Pattabhi Sitaramayya, the candidate backed by Gandhi and many senior leaders. This victory led to a crisis.',
    }),
    sl('diagram', 'The Tripuri crisis', {
      b: 'Re-elected, but **unable to form a team**: he **resigns**.',
      v: vCrisis,
      n: 'After the election, senior leaders who had backed his rival would not join his working committee, and Bose differed with them on how hard to press the British. Unable to function as President, he resigned in nineteen thirty-nine. He then formed a new group, the Forward Bloc, at first within the Congress itself.',
    }),
    sl('example', 'Worked example 1: explaining the resignation', {
      b: 'Explain in **two points** why Bose resigned in 1939.',
      bl: ['Point 1: senior leaders who backed **Pattabhi Sitaramayya** did **not cooperate** in forming a working committee.', 'Point 2: he **differed** with them on the **pace** of the struggle.', 'Tip: keep the tone **neutral**; describe the disagreement, do not take sides.'],
      v: vCrisis,
      n: 'For a two-mark answer on the resignation, give two distinct points. First, the senior leaders who had supported his rival did not cooperate in forming a working committee. Second, he differed with them on how quickly and how firmly to press the British. Notice the neutral tone: describe the disagreement without blaming either side.',
    }),
    sl('diagram', 'The Forward Bloc, May 1939', {
      b: 'A group **within the Congress** to **unite radical** members.',
      v: vFbObj,
      n: 'In May nineteen thirty-nine Bose formed the Forward Bloc. At first it worked within the Congress. Its objectives were to unite all radical and anti-imperialist members, to carry on an uncompromising struggle for complete independence, and to work for a socialist reorganisation, including ending landlordism and planning the economy. Learn these in your own words.',
    }),
    sl('check', 'Quick check: inside or outside?', {
      b: 'True or false: the Forward Bloc began as a party completely separate from the Congress.',
      chk: 'tf_chk_fb_outside',
      n: 'Think about where the Forward Bloc began. Was it inside the Congress or completely outside it?',
    }),
    sl('two-column', 'Two kinds of leadership', {
      cols: ['**Within the Congress (1938–39)**\n\n- President at **Haripura**\n- Pressed for a **firmer struggle**\n- **National Planning Committee**', '**After resigning (1939)**\n\n- Formed the **Forward Bloc**\n- United **radical** members\n- Called for **complete independence**'],
      n: 'Compare Bose\'s two roles in these years. As Congress President he pressed for a firmer struggle and backed economic planning. After resigning, he formed the Forward Bloc to unite those who wanted a bolder fight for complete independence. In both roles his aim was the same: full freedom, won quickly.',
    }),
    sl('diagram', 'Bloc and Army compared', {
      b: 'A **political group** in India; an **army** abroad.',
      v: vCompare,
      n: 'Do not confuse the Forward Bloc with the Indian National Army. The Bloc was a political group formed in India in nineteen thirty-nine. The army was a military force formed abroad in nineteen forty-two and led by Bose from nineteen forty-three. One worked through politics and mass action, the other through armed struggle.',
    }),
    sl('example', 'Worked example 2: a 3-mark answer on the Bloc', {
      b: 'Explain **three objectives** of the Forward Bloc.',
      bl: ['Objective 1: **unite** radical and anti-imperialist members.', 'Objective 2: an **uncompromising** struggle for **complete independence**.', 'Objective 3: a **socialist** programme, such as **ending landlordism** and **planning**.'],
      v: vFbObj,
      n: 'For a three-mark answer, give three different objectives with a short explanation each. The Bloc wanted to unite radical members, to fight without compromise for complete independence, and to reorganise society and the economy on socialist lines. Avoid writing three versions of the same point.',
    }),
    sl('diagram', 'Order of events', {
      b: 'Haripura (1938) → Tripuri (1939) → Forward Bloc (May 1939).',
      v: vTimeline,
      n: 'Look again at the timeline. The presidency at Haripura came first, in nineteen thirty-eight. Re-election for Tripuri, the crisis and resignation followed in nineteen thirty-nine, and the Forward Bloc was formed in May of that year. Keeping this order clear helps you explain why the Bloc was formed.',
    }),
    sl('check', 'Quick check: the first INA', {
      b: 'The first Indian National Army was organised in 1942 by Captain ___.',
      chk: 'fb_chk_mohan',
      n: 'Looking ahead to Part Two: who organised the first army in nineteen forty-two, before Bose arrived?',
    }),
    sl('check', 'Quick check: the women\'s regiment', {
      b: 'Who led the Rani of Jhansi Regiment?',
      chk: 'm_chk_rani_leader',
      v: vAzad,
      n: 'One more look ahead. The army had a regiment of women. Who led it?',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSum1,
      n: 'To sum up Part One. Bose left the civil service in nineteen twenty-one to join the freedom struggle. He presided at Haripura in nineteen thirty-eight and was re-elected for Tripuri in nineteen thirty-nine, but resigned when senior leaders would not work with him. In May nineteen thirty-nine he formed the Forward Bloc to unite radical members in an uncompromising struggle for complete independence.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['Haripura **1938**; Tripuri **1939**; Forward Bloc **May 1939**.', 'Rival in 1939: **Pattabhi Sitaramayya**.', 'The Bloc began **within** the Congress.', 'Do not confuse the **Forward Bloc** with the **INA**.', 'Keep the tone **neutral** about the Tripuri crisis.'],
      v: vPresidency,
      n: 'A few tips. Remember the years: Haripura nineteen thirty-eight, Tripuri and the Forward Bloc nineteen thirty-nine. His rival in nineteen thirty-nine was Pattabhi Sitaramayya. The Bloc began within the Congress. Never confuse the Forward Bloc with the army. And describe the Tripuri crisis neutrally, without blaming either side.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Subhas Chandra Bose — Part 2: The INA, Azad Hind and the Red Fort Trials',
  goals: [
    'Name the founder of the INA and state its objectives',
    'Explain Bose\'s contribution through the INA and the Provisional Government',
    'Assess the impact of the INA trials on the national movement',
  ],
  slides: [
    sl('title', 'From Calcutta to Singapore', {
      b: 'Part 2 — the **escape**, the **INA**, the **Provisional Government** and the **Red Fort trials**.',
      v: vRoute2,
      n: 'In Part Two we follow Bose abroad. He escaped from house arrest in nineteen forty-one, reached Germany, and then travelled to Southeast Asia. There he took over the Indian National Army and proclaimed a provisional government. We end with the trials of army officers at the Red Fort and their effect on India.',
    }),
    sl('diagram', 'The escape, 1941', {
      b: '**Calcutta** → **Peshawar and Kabul** → **Germany** → **Southeast Asia**.',
      v: vRoute,
      n: 'In January nineteen forty-one Bose escaped from house arrest in Calcutta in disguise. He travelled through Peshawar and Kabul and reached Germany, where he organised Indian prisoners of war and broadcast messages to India. In nineteen forty-three he travelled by submarine to Southeast Asia and reached Singapore.',
    }),
    sl('diagram', 'The first INA, 1942', {
      b: 'Organised by **Captain Mohan Singh** from **prisoners of war**.',
      v: vFirstIna,
      n: 'After Japan captured Malaya and Singapore in nineteen forty-two, many Indian soldiers of the British Indian Army became prisoners. Captain Mohan Singh organised the first Indian National Army from them, with Japanese help. The Indian Independence League, led by the revolutionary Rash Behari Bose, gave it a political base among Indians in Southeast Asia.',
    }),
    sl('check', 'Quick check: the city of 1943', {
      b: 'True or false: the Provisional Government of Free India was proclaimed at Tokyo.',
      chk: 'tf_chk_azad_tokyo',
      n: 'Bose proclaimed a provisional government in October nineteen forty-three. Was it in Tokyo, or somewhere else?',
    }),
    sl('diagram', 'Bose takes command, 1943', {
      b: 'The **Provisional Government of Free India**, **Singapore**, **21 October 1943**.',
      v: vAzad,
      n: 'In nineteen forty-three Rash Behari Bose handed over the Indian Independence League to Subhas Bose, who took command of the army and reorganised it. On the twenty-first of October nineteen forty-three he proclaimed the Provisional Government of Free India at Singapore. The army was its army, and the League organised civilian support. Its brigades were named after national leaders.',
    }),
    sl('concept', 'Objectives of the INA', {
      b: 'To **free India by armed struggle**, as a **national** army.',
      v: vInaObj,
      n: 'The army\'s objectives can be put simply. It aimed to free India from British rule by armed struggle. It aimed to be a truly national army, with soldiers of every region and religion serving together. It aimed to win the support of Indians in Southeast Asia. And it served as the army of the provisional government. Its slogan was Delhi Chalo.',
    }),
    sl('diagram', 'The Rani of Jhansi Regiment', {
      b: 'A **women\'s regiment**, led by **Captain Lakshmi Swaminathan**.',
      v: vAzad,
      n: 'The army included a regiment of women, named after Rani Lakshmibai of Jhansi, a leader of eighteen fifty-seven. It was led by Captain Lakshmi Swaminathan, later known as Lakshmi Sahgal. The regiment showed that women could take part in the armed struggle for freedom, and it inspired many Indians at home and abroad.',
    }),
    sl('example', 'Worked example 3: who founded the INA?', {
      b: 'Answer "Who founded the INA?" **fully** for **2 marks**.',
      bl: ['Mark 1: **Captain Mohan Singh** organised the first INA in **1942** from **prisoners of war**, with the **Indian Independence League** of **Rash Behari Bose**.', 'Mark 2: **Subhas Bose** took **command** and **reorganised** it in **1943**.', 'Tip: some books credit **Rash Behari Bose**; naming all three roles is safest.'],
      v: vFirstIna,
      n: 'The question of who founded the army needs care. Captain Mohan Singh organised the first army in nineteen forty-two, with the support of Rash Behari Bose\'s Indian Independence League. Subhas Bose took command and reorganised it in nineteen forty-three. Some books credit Rash Behari Bose, so the safest answer explains all three roles.',
    }),
    sl('diagram', 'The campaign of 1944', {
      b: '**Imphal and Kohima**; flag at **Moirang**; then **retreat**.',
      v: vCampaign,
      n: 'In nineteen forty-four the army, with Japanese forces, advanced into the north-east of India around Imphal and Kohima, and its flag was raised at Moirang in Manipur. But supplies ran short, disease spread, and the heavy monsoon made movement hard, while the Allied forces were stronger and controlled the air. The campaign ended in retreat.',
    }),
    sl('check', 'Quick check: the year of escape', {
      b: 'In which year did Bose escape and leave India?',
      chk: 'm_chk_escape_year',
      n: 'The journey abroad began with an escape from house arrest. In which year was that?',
    }),
    sl('concept', 'The end of the war', {
      b: 'Japan surrendered in **August 1945**; Bose was **reported** to have died in an **air crash** at **Taipei**.',
      v: vTimeline,
      n: 'Japan surrendered in August nineteen forty-five. Bose was reported to have died after an air crash at Taipei that month. The circumstances have been the subject of several inquiries, so school histories describe his death as reported. Many soldiers of his army were taken prisoner and brought back to India.',
    }),
    sl('diagram', 'The Red Fort trials, 1945–46', {
      b: 'Three officers — **Hindu, Muslim and Sikh** — tried together.',
      v: vTrials,
      n: 'In nineteen forty-five the government put officers of the army on trial at the Red Fort in Delhi. In the first trial, Shah Nawaz Khan, Prem Kumar Sahgal and Gurbaksh Singh Dhillon were tried together. They were defended by leading lawyers and leaders, including Bhulabhai Desai, Jawaharlal Nehru and Tej Bahadur Sapru.',
    }),
    sl('check', 'Quick check: the city of the trials', {
      b: 'In which city were the INA officers tried?',
      chk: 'm_chk_trial_place',
      n: 'The trials took place at a famous fort. In which city?',
    }),
    sl('diagram', 'Impact of the trials', {
      b: 'Support **across communities**; unrest in the **armed forces**.',
      v: vImpact,
      n: 'Because the accused were Hindu, Muslim and Sikh, the trials united people of every community. Meetings and protests spread across the country, and the government remitted the sentences. Sympathy also spread to Indians in the armed forces, and unrest such as the naval mutiny of nineteen forty-six followed. Britain could no longer rely on Indian troops.',
    }),
    sl('example', 'Worked example 4: a 10-mark answer on the trials', {
      b: 'Plan a **3 + 3 + 4** answer on the INA trials.',
      bl: ['(i) **Facts:** Red Fort, 1945–46; Shah Nawaz Khan, Sahgal, Dhillon.', '(ii) **Defence and reaction:** Desai, Nehru, Sapru; protests in every community.', '(iii) **Impact:** sentences remitted; armed forces affected; pressure for freedom.'],
      v: vPlan,
      n: 'Let us plan a ten-mark answer on the trials. Part one: three facts, the place and the three officers. Part two: the defence team and the public reaction across communities. Part three, for four marks: the remission of sentences, the effect on the armed forces, and the added pressure on Britain to leave India.',
    }),
    sl('check', 'Quick check: the slogan', {
      b: 'The INA slogan calling its soldiers to march on the capital was "___ Chalo".',
      chk: 'fb_chk_slogan',
      v: vInaObj,
      n: 'The army had a famous two-word slogan calling its soldiers to march on the capital. What was the first word?',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSum2,
      n: 'To sum up Part Two. Bose escaped in nineteen forty-one and worked in Germany. The first army was organised by Mohan Singh in nineteen forty-two. In nineteen forty-three Bose took command and proclaimed the Provisional Government at Singapore. The campaign of nineteen forty-four ended in retreat. The Red Fort trials of nineteen forty-five united India and unsettled the armed forces.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['First INA: **Mohan Singh, 1942**; Bose took command **1943**.', 'Provisional Government: **Singapore, 21 October 1943**.', 'Women\'s regiment: **Rani of Jhansi**, **Lakshmi Swaminathan**.', 'Bose\'s death: say "**reported**".', 'Trials: **Red Fort**; three officers; **remission**; **armed forces**.'],
      v: vTrials,
      n: 'Final tips. The first army was organised by Mohan Singh in nineteen forty-two, and Bose took command in nineteen forty-three. The Provisional Government was proclaimed at Singapore on the twenty-first of October nineteen forty-three. Remember the Rani of Jhansi Regiment and its leader. Describe Bose\'s death as reported. For the trials, know the place, the officers and the impact.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Subhas Chandra Bose, the Forward Bloc and the INA — notes',
  sections: [
    {
      h: '1. Early career and Congress presidencies',
      t: 3,
      b: '- Born at **Cuttack** in **1897**; passed the **ICS** examination in **1920** and **resigned** in **1921** to join the national movement; worked with **C. R. Das** in Bengal.\n- **Haripura, 1938:** Congress President; pressed for a **firmer struggle**; the **National Planning Committee** was set up during his term.\n- **Tripuri, 1939:** re-elected, defeating **Pattabhi Sitaramayya**, who was backed by **Gandhi** and senior leaders.',
      terms: [['Netaji', 'The title by which Subhas Chandra Bose is popularly remembered.']],
      v: vEarly,
      vs: [vPresidency],
    },
    {
      h: '2. The Tripuri crisis and the Forward Bloc',
      t: 1,
      b: `- Senior leaders who had backed his rival **did not cooperate** in forming a **working committee**, and he **differed** with them on the **pace** of the struggle; he **resigned** in **1939**.\n- **Forward Bloc:** formed in **May ${FB_YEAR}**, at first **within the Congress**.\n- **Objectives (paraphrased):** unite all **radical and anti-imperialist** members; an **uncompromising struggle** for **complete independence**; a **socialist** reorganisation, including **ending landlordism**; **planned** development.`,
      terms: [['Forward Bloc', `The group formed by Bose in May ${FB_YEAR}, at first within the Congress, to unite radical members in a firm struggle for complete independence.`]],
      v: vCrisis,
      vs: [vFbObj],
    },
    {
      h: '3. Escape and the first INA',
      t: 2,
      b: '- **January 1941:** escaped from **house arrest** in **Calcutta**; through **Peshawar** and **Kabul** to **Germany**, where he organised Indian prisoners of war and broadcast to India.\n- **1942:** **Captain Mohan Singh** organised the **first INA** with **Japanese** help from Indian **prisoners of war** captured in **Malaya and Singapore**.\n- The **Indian Independence League**, led by **Rash Behari Bose**, gave it a political base among **Indians in Southeast Asia**.\n- Some books credit **Rash Behari Bose** as founder; explain all three roles.',
      terms: [['Indian Independence League', 'The organisation of Indians in Southeast Asia, led by Rash Behari Bose, that supported the INA.']],
      v: vRoute,
      vs: [vFirstIna],
    },
    {
      h: '4. Bose takes command; the Provisional Government',
      t: 2,
      b: `- **${AZAD_HIND}:** Bose reached **Southeast Asia**, took over the **League** and the **INA**, and **reorganised** it.\n- **21 October ${AZAD_HIND}:** proclaimed the **Provisional Government of Free India** (Azad Hind) at **Singapore**; it was recognised by **Japan** and several of its allies.\n- **Units:** **Gandhi**, **Nehru** and **Azad** Brigades; the **Rani of Jhansi Regiment** of women, led by **Captain Lakshmi Swaminathan** (later Sahgal).\n- **Slogan:** "Delhi Chalo".\n- **Objectives (paraphrased):** free India by **armed struggle**; a **national** army above region and religion; win the support of **Indians abroad**.`,
      terms: [['Provisional Government of Free India', `The government proclaimed by Bose at Singapore on 21 October ${AZAD_HIND}, with the INA as its army.`]],
      v: vAzad,
      vs: [vInaObj],
    },
    {
      h: '5. The campaign of 1944 and the end of the war',
      t: 2,
      b: '- **1944:** the INA, with **Japanese** forces, advanced into the **north-east** around **Imphal** and **Kohima**; its flag was raised at **Moirang** (Manipur).\n- **Retreat:** supply shortages, disease, the **monsoon**, and **stronger Allied forces** with air power.\n- **August 1945:** Japan surrendered; Bose was **reported** to have died after an **air crash** at **Taipei**; the circumstances have been the subject of several inquiries.',
      terms: [['Delhi Chalo', 'The slogan of the INA, calling its soldiers to march on the capital.']],
      v: vCampaign,
    },
    {
      h: '6. The INA trials and Bose\'s contribution',
      t: 3,
      b: '- **Red Fort, Delhi, 1945–46:** **Shah Nawaz Khan**, **Prem Kumar Sahgal** and **Gurbaksh Singh Dhillon** tried together; defence included **Bhulabhai Desai**, **Jawaharlal Nehru** and **Tej Bahadur Sapru**.\n- **Impact:** support from **every community**; nationwide protests; sentences **remitted**; unrest in the **armed forces** (naval mutiny, **1946**, as later context); greater pressure for a **transfer of power**.\n- **Contribution of Bose:** radical leadership in the Congress; the **Forward Bloc**; the **INA** and the **Provisional Government**; inspiration of **armed struggle** and **national unity**; a role for **women**. Historians differ on his decision to seek help from the **Axis powers**; give both views.',
      terms: [['INA trials', 'The trials of INA officers at the Red Fort in 1945–46, which stirred nationwide sympathy.']],
      v: vTrials,
      vs: [vImpact, vCompare],
    },
  ],
  tips: '**Common mistakes**\n- Saying Bose founded the first INA in 1942 (it was **Mohan Singh**; Bose took command in **1943**).\n- Confusing the **Forward Bloc** (political, 1939) with the **INA** (military).\n- Placing the Provisional Government at **Tokyo** (it was **Singapore**).\n- Stating Bose\'s death as certain fact (say **reported**).\n- Forgetting why the trials **united** India (the accused were **Hindu, Muslim and Sikh**).\n\n**How marks are usually awarded**\n- 1-mark items: one correct option or term.\n- 2 marks: two distinct points.\n- 10-mark questions in 3 + 3 + 4 parts: one point per mark; the 4-mark part often asks for impact or evaluation.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['Bose\'s popular title', '**Netaji**.', 'fact', 3],
  ['Born', '**Cuttack**, **1897**.', 'fact', 3],
  ['ICS', 'Passed **1920**; **resigned 1921** to join the movement.', 'fact', 3],
  ['First Congress presidency', '**Haripura**, **1938**.', 'fact', 1],
  ['Second Congress presidency', '**Tripuri**, **1939**; defeated **Pattabhi Sitaramayya**.', 'fact', 1],
  ['Why he resigned in 1939', 'Senior leaders did not cooperate; differences on the pace of the struggle.', 'concept', 1],
  ['National Planning Committee', 'Set up in **1938**, during Bose\'s presidency.', 'fact', 1],
  ['Forward Bloc: when?', `**May ${FB_YEAR}**.`, 'fact', 1],
  ['Forward Bloc: where did it begin?', '**Within the Congress**.', 'fact', 1],
  ['Forward Bloc: aims', 'Unite radicals; complete independence; socialist programme.', 'concept', 1],
  ['Escape from house arrest', '**Calcutta**, **January 1941**.', 'fact', 3],
  ['Route abroad', 'Peshawar, Kabul, **Germany**; later by submarine to Southeast Asia.', 'fact', 3],
  ['First INA organised by', '**Captain Mohan Singh**, **1942**.', 'fact', 2],
  ['Soldiers of the first INA', 'Indian **prisoners of war** captured by Japan.', 'fact', 2],
  ['Indian Independence League', 'Led by **Rash Behari Bose**; civilian base in Southeast Asia.', 'fact', 2],
  ['Bose takes command', `**${AZAD_HIND}**, Singapore.`, 'fact', 2],
  ['Provisional Government of Free India', `**Singapore**, **21 October ${AZAD_HIND}**.`, 'fact', 2],
  ['INA slogan', '**Delhi Chalo**.', 'fact', 2],
  ['INA brigades', '**Gandhi**, **Nehru**, **Azad**; plus the **Rani of Jhansi Regiment**.', 'fact', 2],
  ['Rani of Jhansi Regiment', 'Women\'s regiment led by **Captain Lakshmi Swaminathan**.', 'fact', 2],
  ['INA objectives', 'Armed struggle for freedom; national unity; support of Indians abroad.', 'concept', 2],
  ['Campaign of 1944', '**Imphal–Kohima**; flag at **Moirang**; ended in **retreat**.', 'fact', 2],
  ['Why the campaign failed', 'Supplies, disease, monsoon, stronger Allied forces.', 'concept', 2],
  ['Bose\'s death', '**Reported** air crash at **Taipei**, **August 1945**; several inquiries since.', 'exam-tip', 3],
  ['Where were the INA trials?', '**Red Fort**, **Delhi**, **1945–46**.', 'fact', 3],
  ['Three officers in the first trial', '**Shah Nawaz Khan**, **Prem Kumar Sahgal**, **Gurbaksh Singh Dhillon**.', 'fact', 3],
  ['Defence at the trials', '**Bhulabhai Desai**, **Nehru**, **Tej Bahadur Sapru**.', 'fact', 3],
  ['Why the trials united India', 'The accused were **Hindu, Muslim and Sikh**.', 'concept', 3],
  ['Impact of the trials', 'Sentences remitted; unrest in the armed forces; pressure for freedom.', 'concept', 3],
  ['Forward Bloc vs INA', 'Political group in India (1939) vs army abroad (1942–45).', 'exam-tip', 1],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'icse-10-history-civics-chapter-test-short',
  title: 'Chapter test (short) — Subhas Chandra Bose, the Forward Bloc and the INA',
  duration: 30,
  sections: [
    { id: 'I', title: 'Part I — Compulsory (10 marks)', instr: 'Attempt all questions. Questions 1–6 carry 1 mark each; questions 7 and 8 carry 2 marks each.', items: ['m_fb_year', 'm_ina_mohan', 'm_ina_obj', 'm_azad_hind_date', 'm_red_fort', 'ar_fb_radical', 's_fb_obj_two', 's_ina_founder'] },
    { id: 'II', title: 'Part II — Structured question (10 marks)', instr: 'Attempt any ONE of the two questions. Each is in three parts (3 + 3 + 4 marks).', items: [{ attempt: 1, keys: ['l_fb_full', 'l_ina_origin'] }] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'icse-10-history-civics-chapter-test-long',
  title: 'Chapter test (long) — Subhas Chandra Bose, the Forward Bloc and the INA',
  duration: 60,
  sections: [
    { id: 'I', title: 'Part I — Compulsory (20 marks)', instr: 'Attempt all questions. Questions 1–10 carry 1 mark each; questions 11–15 carry 2 marks each.', items: ['m_haripura', 'm_tripuri_rival', 'm_fb_aim_unite', 'm_iil_rash', 'm_pow', 'm_rani_regiment', 'm_retreat', 'm_trial_officers', 'm_trial_impact', 'ar_trials_sympathy', 's_tripuri_crisis', 's_ina_obj_two', 's_azad_two', 's_trials_why', 's_bose_contrib_two'] },
    { id: 'II', title: 'Part II — Structured questions (20 marks)', instr: 'Attempt any TWO of the three questions. Each is in three parts (3 + 3 + 4 marks).', items: [{ attempt: 2, keys: ['l_azad_hind', 'l_contribution', 'l_trials'] }] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t03 of icse-10-history-civics-ch12 only (the Forward Bloc; the INA, its founder and objectives; the contribution of Bose and the INA trials)',
    originality: 'every diary, letter, note and quiz scenario is imagined and written by SOYL (labelled); no textbook text or exercise and no specimen or board-paper item reused (D-036); no historical person quoted, slogans only named, ideas paraphrased and attributed',
    data: `event years asserted in date order (${EVENTS.map(([y]) => y).join(', ')}); ${AZAD_HIND} − ${FB_YEAR} = ${yearsBetween(FB_YEAR, AZAD_HIND)}; 1943 − 1941 = ${yearsBetween(1941, 1943)}`,
    facts: `Bose born Cuttack 1897; ICS 1920, resigned 1921; Congress President Haripura 1938, re-elected for Tripuri 1939 over Pattabhi Sitaramayya, resigned 1939; Forward Bloc May ${FB_YEAR}; escape from Calcutta January 1941, Germany; first INA 1942 (Mohan Singh; Indian Independence League, Rash Behari Bose); Bose takes command ${AZAD_HIND}; Provisional Government Singapore 21 October ${AZAD_HIND}; Rani of Jhansi Regiment (Lakshmi Swaminathan); Imphal-Kohima 1944, Moirang; death reported Taipei August 1945; Red Fort trials 1945–46 (Shah Nawaz Khan, P. K. Sahgal, G. S. Dhillon; defence Desai, Nehru, Sapru); naval mutiny 1946 as later context`,
    gate: 'schema, content lint (lintExemplar), deterministic verify, originality pre-check and the editorial counts run clean on this chapter',
  },
});
