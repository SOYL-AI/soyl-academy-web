// Build CBSE 12 Political Science ch03 Contemporary South Asia. Run from platform/:
//   npx tsx content/authored/social-science/cbse-12-political-science-ch03/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from './lib.mjs';

setUnit('cbse-12-political-science-ch03', 'social-science');
await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- timeline SVGs (years mapped to pixels)
/** Horizontal regime timeline: rows of [label, [[from, to, kind]…]]; kind 'civ' | 'mil' | 'care'. */
function regimeTimeline(rows, y0, y1, alt, caption) {
  const W = 640, left = 110, right = 620, top = 30, rowH = 46;
  const H = top + rows.length * rowH + 70;
  const s = new Svg(W, H);
  const X = (y) => left + ((y - y0) / (y1 - y0)) * (right - left);
  rows.forEach(([label, spans], i) => {
    const y = top + i * rowH;
    s.text(left - 10, y + 15, label, { anchor: 'end', size: 13, bold: true });
    for (const [a, b, kind] of spans) {
      const fill = kind === 'civ' ? 'green' : kind === 'mil' ? 'red' : 'yellow';
      s.rect(X(a), y, X(b) - X(a), 30, { fill, fillOpacity: 0.55, sw: 1, rx: 2 });
    }
  });
  const axisY = top + rows.length * rowH + 4;
  s.line(left, axisY, right, axisY, { sw: 1.4 });
  for (let yr = y0; yr <= y1; yr += 10) {
    s.line(X(yr), axisY, X(yr), axisY + 5, { sw: 1.2 });
    s.text(X(yr), axisY + 17, String(yr), { size: 12 });
  }
  const ly = axisY + 42;
  s.rect(left, ly - 8, 16, 14, { fill: 'green', fillOpacity: 0.55, sw: 1, rx: 2 }).text(left + 22, ly, 'Elected civilian government', { anchor: 'start', size: 12 });
  s.rect(left + 220, ly - 8, 16, 14, { fill: 'red', fillOpacity: 0.55, sw: 1, rx: 2 }).text(left + 242, ly, 'Military or military-led rule', { anchor: 'start', size: 12 });
  if (rows.some(([, sp]) => sp.some((x) => x[2] === 'care'))) s.rect(left + 440, ly - 8, 16, 14, { fill: 'yellow', fillOpacity: 0.55, sw: 1, rx: 2 }).text(left + 462, ly, 'Caretaker', { anchor: 'start', size: 12 });
  return s.visual(alt, caption);
}
const PAK = [[1947, 1958, 'civ'], [1958, 1971, 'mil'], [1971, 1977, 'civ'], [1977, 1988, 'mil'], [1988, 1999, 'civ'], [1999, 2008, 'mil'], [2008, 2015, 'civ']];
const BD = [[1971, 1975, 'civ'], [1975, 1990, 'mil'], [1991, 2007, 'civ'], [2007, 2009, 'care'], [2009, 2015, 'civ']];
const vRegimes = regimeTimeline(
  [['Pakistan', PAK], ['Bangladesh', BD]],
  1945, 2015,
  'Timeline from 1945 to 2015. Pakistan: elected government 1947 to 1958, military rule 1958 to 1971, elected 1971 to 1977, military 1977 to 1988, elected 1988 to 1999, military 1999 to 2008, elected from 2008. Bangladesh: from 1971 elected government until 1975, military-led rule 1975 to 1990, elected governments from 1991, a military-backed caretaker 2007 to 2008, elected again from 2009',
  'Simplified: the bars show who held power, not every change of government.',
);

/** Event timeline: events above the axis, agreements below. */
function eventTimeline(above, below, y0, y1, alt, caption) {
  const W = 640, H = 230, left = 40, right = 610, axisY = 115;
  const s = new Svg(W, H);
  const X = (y) => left + ((y - y0) / (y1 - y0)) * (right - left);
  s.line(left, axisY, right, axisY, { sw: 2 });
  for (let yr = y0; yr <= y1; yr += 10) s.line(X(yr), axisY - 4, X(yr), axisY + 4, { sw: 1.2 }).text(X(yr), axisY + 16, String(yr), { size: 11, muted: true });
  above.forEach(([yr, label], i) => {
    const h = i % 2 ? 62 : 32;
    s.line(X(yr), axisY, X(yr), axisY - h, { color: 'red', sw: 1.6 }).dot(X(yr), axisY, 4, 'red');
    s.text(X(yr), axisY - h - 10, label, { size: 12, color: 'red' });
  });
  below.forEach(([yr, label], i) => {
    const h = i % 2 ? 72 : 44;
    s.line(X(yr), axisY, X(yr), axisY + h, { color: 'blue', sw: 1.6, dash: true }).dot(X(yr), axisY, 4, 'blue');
    s.text(X(yr), axisY + h + 10, label, { size: 12, color: 'blue' });
  });
  return s.visual(alt, caption);
}
const vIndoPak = eventTimeline(
  [[1948, 'Kashmir war 1947–48'], [1965, 'War 1965'], [1971, 'War 1971'], [1999, 'Kargil 1999']],
  [[1960, 'Indus Waters Treaty 1960'], [1966, 'Tashkent 1966'], [1972, 'Simla 1972'], [1998, 'Nuclear tests 1998']],
  1945, 2005,
  'Timeline of India–Pakistan relations from 1945 to 2005: above the line, conflicts in 1947–48, 1965, 1971 and Kargil in 1999; below the line, the Indus Waters Treaty 1960, the Tashkent Agreement 1966, the Simla Agreement 1972, and nuclear tests by both in 1998',
  'Red above the line: conflicts. Blue below: agreements and turning points.',
);

// ---------------------------------------------------------------- other visuals
const vRoute1 = flow('LR', ['South Asia as a region', 'Pakistan', 'Bangladesh', 'Nepal', 'Sri Lanka'], 'Route map of Part 1: South Asia as a region, then Pakistan, Bangladesh, Nepal and Sri Lanka', 'Part 1 at a glance');
const vRoute2 = flow('LR', ['India and Pakistan', 'India and its other neighbours', 'SAARC and SAFTA', 'Outside powers'], 'Route map of Part 2: India and Pakistan, India and its other neighbours, SAARC and SAFTA, and outside powers', 'Part 2 at a glance');
const vRegion = table(
  ['Country', 'Capital', 'Note'],
  [
    ['India', 'New Delhi', 'Largest in area, population and economy'],
    ['Pakistan', 'Islamabad', 'Democracy interrupted by military rule'],
    ['Bangladesh', 'Dhaka', 'Independent in 1971'],
    ['Nepal', 'Kathmandu', 'Republic since 2008'],
    ['Bhutan', 'Thimphu', 'Constitutional monarchy; first elections 2008'],
    ['Sri Lanka', 'Sri Jayawardenepura Kotte (official); Colombo', 'Independent in 1948'],
    ['Maldives', 'Malé', 'Island republic'],
    ['Afghanistan', 'Kabul', 'Joined SAARC in 2007'],
  ],
  'Table of the eight SAARC members with capitals: India, New Delhi; Pakistan, Islamabad; Bangladesh, Dhaka; Nepal, Kathmandu; Bhutan, Thimphu; Sri Lanka, Sri Jayawardenepura Kotte and Colombo; Maldives, Malé; Afghanistan, Kabul, which joined SAARC in 2007',
  'The seven founders of 1985, and Afghanistan from 2007.',
);
const vPakWhy = flow(
  'TB',
  ['Powerful army with a large say in politics', 'Support at times from religious leaders and big landowners', 'Conflict with India strengthens the security establishment', 'Outside powers often deal with military rulers during the Cold War', 'Democracy remains fragile, though popular demand for it survives'],
  'Flow of reasons for fragile democracy in Pakistan: a powerful army, support from clergy and big landowners, conflict with India strengthening the security establishment, and outside powers dealing with military rulers; democracy remains fragile though demand for it survives',
  'Why democracy struggled in Pakistan',
);
const v1971 = flow(
  'LR',
  ['Grievances: Urdu imposed, unfair share of power', '1970: Awami League wins a majority', 'Power not handed over; army crackdown', 'Liberation struggle; India supports it', 'December 1971: Bangladesh independent'],
  'Flow of the birth of Bangladesh: grievances over Urdu and power, the Awami League majority in 1970, refusal to hand over power and the crackdown, the liberation struggle with India\'s support, and independence in December 1971',
  'From East Pakistan to Bangladesh',
);
const vBdStages = table(
  ['Period', 'What happened'],
  [
    ['1971–75', 'Parliamentary constitution of 1972; changed in 1975 to a presidential, one-party system; Sheikh Mujib killed in August 1975'],
    ['1975–90', 'Military-led rule under Ziaur Rahman (who founded the BNP) and then General Ershad'],
    ['1990–91', 'Mass movement forces Ershad out; elections in 1991'],
    ['Since 1991', 'Multi-party elections; a military-backed caretaker in 2007–08'],
  ],
  'Table of Bangladesh\'s political stages: 1971 to 1975 parliamentary constitution then one-party presidential system; 1975 to 1990 military-led rule under Ziaur Rahman and Ershad; 1990 to 1991 mass movement and elections; since 1991 multi-party elections with a caretaker in 2007 to 2008',
);
const vNepal = flow(
  'LR',
  ['1990: constitutional monarchy', '1996: Maoist insurgency begins', '2005: king takes direct power', '2006: April movement; parliament restored; peace deal', '2008: republic declared', '2015: new constitution'],
  'Flow of Nepal\'s transition: constitutional monarchy in 1990, Maoist insurgency from 1996, the king\'s direct rule in 2005, the April 2006 movement and peace deal, the republic in 2008 and the new constitution in 2015',
  'Nepal: from kingdom to republic',
);
const vNepalForces = table(
  ['Force', 'What it wanted (1996–2006)'],
  [
    ['The king', 'To keep real power, and in 2005 to rule directly'],
    ['Mainstream political parties', 'Parliamentary democracy with a limited role for the king'],
    ['The Maoists', 'An end to the monarchy and a new political and social order; armed struggle until 2006'],
  ],
  'Table of the three forces in Nepal between 1996 and 2006: the king wanted to keep power; the mainstream parties wanted parliamentary democracy; the Maoists wanted to end the monarchy and fought until 2006',
);
const vSriLanka = flow(
  'TB',
  ['1948: independence; Sinhala majority dominates politics', '1956: Sinhala made the only official language', 'Tamil demands for autonomy grow; LTTE formed (1976)', 'Civil war from 1983', '1987: India–Sri Lanka Accord; IPKF sent, withdrawn 1990', '2009: war ends with the defeat of the LTTE'],
  'Flow of the Sri Lankan conflict: independence in 1948, Sinhala as sole official language in 1956, growing Tamil demands and the LTTE formed in 1976, civil war from 1983, the 1987 accord and IPKF withdrawn in 1990, and the end of the war in 2009',
  'Sri Lanka\'s ethnic conflict',
);
const vCompare = table(
  ['', 'Pakistan', 'Bangladesh', 'Nepal', 'Sri Lanka'],
  [
    ['Main challenge to democracy', 'Repeated military takeovers', 'One-party rule, then military-led rule (1975–90)', 'Royal power and an armed insurgency', 'Ethnic conflict and civil war'],
    ['Turning point', 'Return to civilian rule (1988, 2008)', 'Mass movement and elections (1990–91)', 'April 2006 movement; republic (2008)', 'End of the war (2009)'],
    ['Constant feature', 'Popular demand for democracy', 'Popular demand for democracy', 'Popular demand for democracy', 'Elected governments throughout'],
  ],
  'Comparison table: Pakistan faced repeated military takeovers and returned to civilian rule in 1988 and 2008; Bangladesh had one-party then military-led rule until the 1990 to 1991 movement; Nepal faced royal power and an insurgency until 2006 and became a republic in 2008; Sri Lanka faced ethnic conflict until 2009 but kept elected governments throughout',
);
const vWE1 = table(
  ['Step', 'What you do with the timeline'],
  [
    ['1. Read the key', 'Green bars: elected government; red bars: military or military-led rule'],
    ['2. Count the red bars', 'Pakistan has three long red bars: 1958–71, 1977–88, 1999–2008'],
    ['3. Compare rows', 'Bangladesh\'s single red bar ends in 1990; Pakistan\'s last ends in 2008'],
    ['4. Write the point', 'Both saw military rule; Bangladesh returned to elections earlier'],
  ],
  'Worked example table on reading the regime timeline: read the key, count Pakistan\'s three military periods, compare with Bangladesh\'s one ending in 1990, and write a comparison',
);
const vWE2 = table(
  ['Step', 'Applied to a source on Nepal'],
  [
    ['1. Find the date and speaker', 'A student in Kathmandu, 2008'],
    ['2. Decode the clues', '"No more king" points to the republic; "fighters from the hills" to the Maoists'],
    ['3. Match the marks', '1-mark parts: one fact. 2-mark part: fact plus reason'],
    ['4. Use the source and your knowledge', 'Quote a phrase, then add the year or name you know'],
  ],
  'Worked example table on a source-based answer: find the date and speaker, decode clues such as no more king meaning the republic, match the length to the marks, and combine a quoted phrase with your own knowledge',
);
const vNeighbours = table(
  ['Neighbour', 'Cooperation (examples)', 'Issues raised at times'],
  [
    ['Bangladesh', 'Support in 1971; Ganga waters treaty 1996; enclave exchange 2015', 'Sharing of other rivers; movement of people across the border'],
    ['Nepal', 'Open border; 1950 treaty; trade and development projects', 'Trade terms; Nepal\'s ties with other powers'],
    ['Sri Lanka', 'Trade links; free trade agreement (1998)', 'The IPKF episode of 1987–90; fishermen\'s disputes'],
    ['Bhutan', 'Hydroelectric projects; close friendship', 'Few serious issues'],
    ['Maldives', 'Help against the 1988 coup attempt; tourism and trade', 'Occasional political differences'],
  ],
  'Table of India\'s relations with five neighbours: Bangladesh, Nepal, Sri Lanka, Bhutan and Maldives, each with examples of cooperation and the issues raised at times',
);
const vWE3 = table(
  ['Part of answer', 'Content for a 5-mark answer on India–Pakistan'],
  [
    ['Point 1', '1947–48 war over Kashmir; ceasefire line'],
    ['Point 2', '1965 war; Tashkent Agreement 1966'],
    ['Point 3', '1971 war; Simla Agreement 1972 (bilateral, peaceful settlement)'],
    ['Point 4', 'Kargil 1999; Siachen; nuclear tests 1998'],
    ['Point 5', 'Peace efforts: Indus Waters Treaty 1960, bus service 1999, talks'],
  ],
  'Worked example table planning a 5-mark answer on India–Pakistan relations: the 1947–48 war, 1965 and Tashkent, 1971 and Simla, Kargil with Siachen and nuclear tests, and peace efforts such as the Indus Waters Treaty and the 1999 bus service',
);
const vSaarc = flow(
  'LR',
  ['1985: SAARC founded at Dhaka', '1987: secretariat in Kathmandu', '2004: SAFTA signed', '2006: SAFTA in force', '2007: Afghanistan joins', '2014: last summit held (as of 2024)'],
  'Flow of SAARC milestones: founded in Dhaka in 1985, secretariat in Kathmandu in 1987, SAFTA signed in 2004 and in force in 2006, Afghanistan joins in 2007, and the last summit held in 2014 as of 2024',
  'SAARC milestones',
);
const vWE4 = table(
  ['For SAARC', 'Against (limits)'],
  [
    ['Regular contact among officials and leaders', 'India–Pakistan tension delays decisions and summits'],
    ['Cooperation in agriculture, health, disasters', 'Unanimity rule; bilateral issues excluded'],
    ['SAFTA to reduce trade barriers', 'Regional trade still small'],
    ['A forum where rivals can meet', 'Smaller members wary of India\'s size'],
  ],
  'Worked example table weighing SAARC: for it, regular contact, cooperation in many fields, SAFTA and a forum for rivals; against it, India–Pakistan tension, the unanimity rule, small regional trade, and smaller members\' wariness of India',
);
const vOutside = table(
  ['Outside power', 'Role in South Asia (broadly)'],
  [
    ['United States', 'Ties with India and Pakistan; a mediator in crises at times'],
    ['China', 'Trade and infrastructure links with several South Asian states'],
    ['Soviet Union (to 1991)', 'Mediated the Tashkent Agreement (1966)'],
  ],
  'Table of outside powers in South Asia: the United States with ties to India and Pakistan, China with trade and infrastructure links, and the Soviet Union, which mediated the Tashkent Agreement in 1966',
);
const vSummary1 = table(
  ['Country', 'Key points'],
  [
    ['Pakistan', 'Military takeovers 1958, 1977, 1999; civilian rule again in 1988 and 2008'],
    ['Bangladesh', '1971 independence; 1975 one-party change; military-led rule to 1990; elections from 1991'],
    ['Nepal', '1990 constitutional monarchy; 2006 movement; 2008 republic; 2015 constitution'],
    ['Sri Lanka', '1956 language law; LTTE; 1987 Accord and IPKF; war ends 2009'],
  ],
  'Summary table of Part 1: Pakistan\'s takeovers and returns to civilian rule; Bangladesh\'s path from 1971 to 1991; Nepal\'s path from 1990 to 2015; Sri Lanka\'s conflict from the 1956 language law to 2009',
);
const vSummary2 = table(
  ['Theme', 'Key points'],
  [
    ['India–Pakistan', 'Wars 1947–48, 1965, 1971; Kargil 1999; Indus 1960, Tashkent 1966, Simla 1972'],
    ['Other neighbours', 'Cooperation with Bangladesh, Nepal, Sri Lanka, Bhutan, Maldives; some issues'],
    ['SAARC', '1985; secretariat Kathmandu; SAFTA 2004; Afghanistan 2007; limited by tensions'],
  ],
  'Summary table of Part 2: India–Pakistan wars and agreements, India\'s cooperation and issues with other neighbours, and SAARC facts and limits',
);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Contemporary South Asia — Part 1: Democracy in Pakistan, Bangladesh, Nepal and Sri Lanka',
  goals: [
    'Describe South Asia as a region and its member states',
    'Compare the record of democracy in Pakistan and Bangladesh',
    'Explain Nepal\'s change from a kingdom to a democratic republic',
    'Explain the causes and course of Sri Lanka\'s ethnic conflict',
  ],
  slides: [
    sl('title', 'Contemporary South Asia', {
      b: 'Part 1 — the region, and the **story of democracy** in four neighbours of India.',
      v: vRoute1,
      n: 'Namaste! South Asia is home to about a quarter of humanity. Its countries share rivers, mountains, languages and a long history, yet their political journeys have been very different. In this part we look at the region as a whole, and then at how democracy fared in Pakistan, Bangladesh, Nepal and Sri Lanka.',
    }),
    sl('diagram', 'South Asia as a region', {
      b: 'The eight members of **SAARC** form the core of the region.',
      v: vRegion,
      n: 'In this chapter South Asia means the seven countries that founded SAARC in 1985, namely India, Pakistan, Bangladesh, Nepal, Bhutan, Sri Lanka and the Maldives, along with Afghanistan, which joined in 2007. Notice how much larger India is than the others. That difference in size shapes almost every relationship in the region.',
    }),
    sl('concept', 'Unity and diversity', {
      bl: [
        'Shared geography: the Himalayas to the north, the Indian Ocean to the south, great shared rivers.',
        'Shared history and culture, but many languages, religions and political systems.',
        'Political systems range from parliamentary democracy to constitutional monarchy.',
        'Most countries have seen both democratic progress and serious setbacks.',
      ],
      n: 'The region is united by geography and history, but divided by politics. Some countries have been democracies almost throughout, others have seen kings or generals in power. Still, one trend stands out: across the region, ordinary people have repeatedly demanded a say in how they are governed.',
    }),
    sl('diagram', 'Pakistan: generals and elected governments', {
      v: vRegimes,
      n: 'This timeline shows who held power. Pakistan began with elected leaders, but in 1958 General Ayub Khan took over. Civilian rule returned in 1971 under Zulfikar Ali Bhutto, until General Zia ul Haq took charge in 1977. Elections came back in 1988, and in 1999 General Musharraf seized power. An elected government returned in 2008.',
    }),
    sl('example', 'Worked example 1: reading a regime timeline', {
      b: 'Use the timeline to compare Pakistan and Bangladesh in one sentence.',
      v: vWE1,
      n: 'Let us read the timeline like an examiner. First, read the key: green means elected government, red means military rule. Next, count the red bars for Pakistan: there are three long ones. Then compare with Bangladesh, whose single red bar ends in 1990. Now you can write a precise point: both saw military rule, but Bangladesh returned to elections earlier.',
    }),
    sl('diagram', 'Why democracy struggled in Pakistan', {
      v: vPakWhy,
      n: 'Why did generals take over so often in Pakistan? The army has had great social and political weight, and at times it was backed by religious leaders and big landowners. Tension with India strengthened the security establishment, and during the Cold War outside powers often dealt readily with military rulers. Yet the demand for democracy never disappeared.',
    }),
    sl('check', 'Quick check: reading the timeline', {
      b: 'Which army chief took charge in Pakistan in 1977?',
      chk: 'm_zia_1977',
      n: 'Look back at the second red bar on the timeline, and remember which general held power until 1988.',
    }),
    sl('diagram', 'The birth of Bangladesh', {
      v: v1971,
      n: 'From 1947 to 1971, Bangladesh was East Pakistan. Its people resented the imposition of Urdu and the domination of West Pakistan. In 1970 the Awami League, led by Sheikh Mujibur Rahman, won a majority, but power was not handed over. The army cracked down, a liberation struggle followed with India\'s support, and Bangladesh became independent in December 1971.',
    }),
    sl('concept', 'Bangladesh after 1971', {
      v: vBdStages,
      n: 'The new country began as a parliamentary democracy, but in 1975 its constitution was changed to a presidential, one party system, and Sheikh Mujib was killed in a coup. Military led rule followed, first under Ziaur Rahman and then General Ershad. In 1990 a mass movement forced Ershad out, and since 1991 governments have been chosen in multi party elections.',
    }),
    sl('check', 'Quick check: true or false?', {
      b: 'Has Pakistan been under military rule without a break since 1947?',
      chk: 'tf_pak_continuous',
      n: 'Think about the green bars on the timeline before you answer.',
    }),
    sl('diagram', 'Nepal: from kingdom to republic', {
      v: vNepal,
      n: 'Nepal was a kingdom for most of its history. A movement in 1990 produced a constitutional monarchy. From 1996, Maoist insurgents waged an armed struggle, and in 2005 the king took direct power. In April 2006 a huge popular movement forced him to restore parliament. The Maoists joined a peace process, the monarchy was abolished in 2008, and a new constitution came in 2015.',
    }),
    sl('two-column', 'Three forces in Nepal', {
      v: vNepalForces,
      cols: [
        'The **king** and the **parties** competed for power under the 1990 constitution.',
        'The **Maoists** fought the system from 1996, then joined the **peace process** in 2006.',
      ],
      n: 'Between 1996 and 2006, three forces shaped Nepal: the king, the mainstream parties, and the Maoists. When the king took direct power, the parties and the Maoists found common ground against him. That alliance, backed by ordinary people on the streets, is what finally ended the monarchy.',
    }),
    sl('check', 'Quick check: Nepal', {
      b: 'In which year did Nepal become a republic?',
      chk: 'm_nepal_2008',
      n: 'Remember the order: the movement came first, and the elected assembly acted two years later.',
    }),
    sl('diagram', 'Sri Lanka: ethnic conflict', {
      v: vSriLanka,
      n: 'Sri Lanka became independent in 1948 with a Sinhala majority and a large Tamil minority. In 1956 Sinhala was made the only official language, and Tamils felt shut out. Demands for autonomy grew into militancy, and the LTTE fought for a separate Tamil state. Civil war began in 1983. India signed an accord in 1987 and sent the IPKF, which left in 1990. The war ended in 2009.',
    }),
    sl('concept', 'Sri Lanka: democracy despite conflict', {
      bl: [
        'Elections and elected governments continued throughout the conflict.',
        'Relatively high literacy and life expectancy for the region.',
        'An early opening of its economy, in 1977.',
        'The conflict caused great human suffering; lasting peace needs equal treatment of all communities.',
      ],
      v: vCompare,
      n: 'In spite of decades of war, Sri Lanka kept holding elections and is noted for comparatively good literacy and life expectancy. The table compares the four countries: each faced a different challenge to democracy, but in each the demand for a say in government kept coming back.',
    }),
    sl('example', 'Worked example 2: answering a source-based question', {
      b: 'A four-step method for any source in this chapter.',
      v: vWE2,
      n: 'Source questions reward careful reading. First, note the date and who is speaking. Second, decode the clues: no more king points to the republic, and fighters from the hills points to the Maoists. Third, match the length of your answer to the marks. Finally, combine a short phrase from the source with a year or a name from your own knowledge.',
    }),
    sl('check', 'Quick check: Sri Lanka', {
      b: 'What did the LTTE demand?',
      chk: 'm_ltte',
      n: 'Think about what the word Eelam stood for.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up: Pakistan has alternated between generals and elected governments. Bangladesh moved from early democracy to military led rule and back to elections in 1991. Nepal moved from monarchy to a republic through popular movements. Sri Lanka kept its democracy through a long ethnic war that ended in 2009.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Learn the **turning-point years**: 1958, 1971, 1977, 1988, 1999 (Pakistan); 1975, 1990–91 (Bangladesh); 1990, 2006, 2008, 2015 (Nepal); 1956, 1983, 1987, 2009 (Sri Lanka).',
        'Do not mix up **Ziaur Rahman** (Bangladesh) and **Zia-ul-Haq** (Pakistan), or **Tashkent** and **Simla**.',
        'For "compare" questions, give a **common point** and a **difference**.',
        'In source questions, **quote briefly** and add your own knowledge.',
        'Keep your wording **neutral and factual**; marks come from accurate points.',
      ],
      n: 'A few tips. Learn the turning point years, and be careful with similar names, such as Ziaur Rahman of Bangladesh and Zia ul Haq of Pakistan. In comparison questions, always give one similarity and one difference. And write in a calm, factual way; examiners reward accurate points, not strong opinions.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Contemporary South Asia — Part 2: Conflict, Cooperation and SAARC',
  goals: [
    'Analyse the main conflicts and peace efforts between India and Pakistan',
    'Describe India\'s relations of cooperation and disagreement with its other neighbours',
    'Explain the aims, achievements and limits of SAARC and SAFTA',
  ],
  slides: [
    sl('title', 'Conflict and cooperation in South Asia', {
      b: 'Part 2 — **India and Pakistan**, India and its **other neighbours**, and **SAARC**.',
      v: vRoute2,
      n: 'Neighbours cannot choose each other. In this part we look at the relationship between India and Pakistan, marked by both wars and peace efforts, then at India\'s ties with its other neighbours, and finally at SAARC, the region\'s attempt to work together.',
    }),
    sl('diagram', 'India and Pakistan: a timeline', {
      v: vIndoPak,
      n: 'Above the line are the conflicts: the war over Kashmir in 1947 and 1948, the wars of 1965 and 1971, and the Kargil conflict of 1999. Below the line are agreements and turning points: the Indus Waters Treaty of 1960, the Tashkent Agreement of 1966, the Simla Agreement of 1972, and the nuclear tests by both countries in 1998.',
    }),
    sl('concept', 'Kashmir and other issues', {
      bl: [
        '**Kashmir:** the two countries hold conflicting positions on the region; it led to the wars of 1947–48 and 1965.',
        '**Siachen glacier:** both keep troops on this high glacier.',
        '**Sir Creek:** a boundary dispute in the marshes of the Rann of Kutch.',
        '**Arms race:** both became nuclear-armed after the 1998 tests.',
      ],
      v: table(['Issue', 'Type'], [['Kashmir', 'Territory'], ['Siachen', 'Territory'], ['Sir Creek', 'Boundary'], ['Nuclear and arms race', 'Security']], 'Table of India–Pakistan issues: Kashmir and Siachen are territorial, Sir Creek is a boundary dispute, and the nuclear and arms race is a security issue'),
      n: 'Kashmir has been the central issue since 1947, and it led to the first two wars. There are other disputes too: the Siachen glacier, where both countries keep troops, and Sir Creek, a boundary in the marshes of Kutch. Since both tested nuclear weapons in 1998, the stakes of any crisis have become higher.',
    }),
    sl('check', 'Quick check: agreements', {
      b: 'Which agreement followed the 1965 war?',
      chk: 'm_tashkent',
      n: 'Look below the line on the timeline, just after the 1965 war.',
    }),
    sl('concept', 'Efforts for peace', {
      bl: [
        '**Indus Waters Treaty (1960):** World Bank mediation divided the rivers of the Indus system.',
        '**Simla Agreement (1972):** settle differences peacefully and bilaterally.',
        '**Confidence-building measures:** the Delhi–Lahore bus (1999), talks between leaders, trade and people-to-people contacts.',
      ],
      v: flow('LR', ['Talks between leaders', 'Agreements', 'Contacts between people', 'Less suspicion'], 'Flow of confidence building: talks between leaders and agreements, contacts between people, leading to less suspicion', 'How confidence is built'),
      n: 'The relationship is not only about conflict. In 1960 the two countries agreed, with World Bank help, on how to share the rivers of the Indus system. The Simla Agreement of 1972 committed both to peaceful, bilateral settlement. Measures such as the bus service between Delhi and Lahore in 1999 tried to build trust between people.',
    }),
    sl('example', 'Worked example 3: planning a 5-mark answer', {
      b: 'Question: Describe the major conflicts between India and Pakistan and the efforts to settle them.',
      v: vWE3,
      n: 'Here is a plan for a five mark answer. Take the conflicts in order, pairing each with its outcome: 1947 and 1948 with the ceasefire line, 1965 with Tashkent, 1971 with Simla. Then add Kargil, Siachen and the nuclear tests. Finish with peace efforts. Five clear points, each with a date, earn the marks.',
    }),
    sl('check', 'Quick check: put them in order', {
      b: 'Arrange these events in India–Pakistan relations from earliest to latest.',
      chk: 'ord_indopak',
      n: 'Use the timeline: conflicts above the line, agreements below it.',
    }),
    sl('diagram', 'India and its other neighbours', {
      v: vNeighbours,
      n: 'With its other neighbours, India\'s ties mix close cooperation with occasional disagreement. India supported Bangladesh in 1971; the two settled Ganga water sharing in 1996 and exchanged enclaves in 2015. Nepal and India share an open border. India and Bhutan cooperate on hydroelectric power, and India helped the Maldives against a coup attempt in 1988.',
    }),
    sl('concept', 'Why size matters', {
      bl: [
        'India is far larger than all its neighbours put together in area, population and economy.',
        'Neighbours value India\'s support, trade and help in crises.',
        'They can also be wary of being dominated, and seek ties with other powers.',
        'Relations work best through regular dialogue and mutual respect.',
      ],
      v: table(['What neighbours value', 'What makes them cautious'], [['Trade, aid, help in crises', 'Fear of domination by a much larger state'], ['Open borders and cultural ties', 'Wish to keep an independent foreign policy']], 'Table: neighbours value trade, aid, help in crises, open borders and cultural ties, but are cautious about domination and wish to keep an independent foreign policy'),
      n: 'Why do relations swing between warmth and friction? A big reason is size. India is larger than all its neighbours combined. That makes India a valuable partner, but it can also make smaller countries cautious, so they sometimes seek ties with other powers too. Patient dialogue and respect help keep relations steady.',
    }),
    sl('diagram', 'SAARC: milestones', {
      v: vSaarc,
      n: 'SAARC was founded at Dhaka in 1985 by seven countries, with its secretariat in Kathmandu from 1987. In 2004 members signed SAFTA, an agreement to lower trade barriers, which came into force in 2006. Afghanistan joined in 2007. As of 2024, the last summit had been held in 2014.',
    }),
    sl('concept', 'How SAARC works, and SAFTA', {
      bl: [
        'Aims: economic growth, social progress and cultural development through cooperation.',
        'Decisions are **unanimous**; **bilateral and contentious issues** are kept off the agenda.',
        '**SAFTA** aims to reduce tariffs step by step among members.',
        'Some smaller members feared Indian dominance of their markets; some in India felt the gains were small.',
      ],
      v: table(['Feature', 'Effect'], [['Unanimity', 'Any member can block a decision'], ['No bilateral issues', 'Meetings avoid quarrels but disputes stay unsolved'], ['SAFTA', 'Lower tariffs within the region']], 'Table of SAARC features and effects: unanimity lets any member block a decision; excluding bilateral issues avoids quarrels but leaves disputes unsolved; SAFTA lowers tariffs within the region'),
      n: 'SAARC works by consensus, so every member must agree, and its charter keeps bilateral disputes out of its meetings. That avoids quarrels at summits but leaves the biggest problems untouched. SAFTA was designed to lower tariffs. Smaller members worried about Indian firms dominating their markets, while some Indians felt the gains would be small.',
    }),
    sl('check', 'Quick check: SAARC', {
      b: 'In which year was SAARC set up?',
      chk: 'm_saarc_1985',
      n: 'Recall the first box on the milestone chart.',
    }),
    sl('example', 'Worked example 4: evaluating SAARC', {
      b: 'An evaluate question needs both sides and a judgement.',
      v: vWE4,
      n: 'To evaluate SAARC, build two columns. For it: regular contact, cooperation in fields like health and disasters, SAFTA, and a forum where rivals can meet. Against it: India Pakistan tension, the unanimity rule, small regional trade, and smaller members wary of India. Then judge: SAARC built habits of cooperation, but its success depends on political will.',
    }),
    sl('concept', 'Outside powers in South Asia', {
      v: vOutside,
      n: 'Outside powers also matter in South Asia. The United States has ties with both India and Pakistan and has at times helped calm crises. China has growing trade and infrastructure links with several countries in the region. Earlier, the Soviet Union mediated the Tashkent Agreement. Keep such points brief and factual in your answers.',
    }),
    sl('check', 'Quick check: true or false?', {
      b: 'Does SAARC decide by a simple majority vote?',
      chk: 'tf_saarc_vote',
      n: 'Remember the rule that lets any single member block a decision.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up: India and Pakistan have fought over Kashmir and other issues but also signed important agreements. India\'s relations with its other neighbours combine cooperation with occasional friction, shaped by the difference in size. SAARC and SAFTA aim at regional cooperation, but political tensions have limited what they could achieve.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Pair each war with its outcome: **1965 → Tashkent (1966)**, **1971 → Simla (1972)**.',
        'The **Indus Waters Treaty** (1960) was mediated by the **World Bank**, not the UN.',
        'SAARC: **1985**, **Kathmandu**, **SAFTA 2004**, **Afghanistan 2007**, **unanimity**.',
        'In "relations with neighbours" answers, give **cooperation and issues** for each country.',
        'Write about disputes in **neutral** language: state each side\'s position as a position.',
      ],
      n: 'Remember to pair each war with its outcome, and that the World Bank, not the United Nations, helped with the Indus Waters Treaty. For SAARC, learn its key facts. When you write about neighbours, give both cooperation and issues, and describe disputes in calm, neutral language.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Contemporary South Asia — notes',
  sections: [
    {
      h: '1. South Asia as a region',
      t: 4,
      b: 'In this chapter, **South Asia** means the eight members of **SAARC**: India, Pakistan, Bangladesh, Nepal, Bhutan, Sri Lanka and the Maldives (founders, 1985) and **Afghanistan** (member from 2007).\n\n- Shared geography (Himalayas, Indian Ocean, great rivers) and long shared history.\n- Great diversity of languages, religions and political systems.\n- India is much larger than the rest, which shapes regional relations.\n- Across the region, popular demand for democracy has repeatedly returned, even after setbacks.',
      terms: [['South Asia', 'The region formed by the eight SAARC members.'], ['Constitutional monarchy', 'A system with a king as head of state but elected governments that hold real power.']],
      v: vRegion,
    },
    {
      h: '2. Pakistan and Bangladesh',
      t: 1,
      b: '**Pakistan:** elected rule 1947–58; **General Ayub Khan** (1958) and then **Yahya Khan**; civilian rule under **Zulfikar Ali Bhutto** (1971–77); **General Zia-ul-Haq** (1977–88); elected governments 1988–99 (Benazir Bhutto, Nawaz Sharif); **General Pervez Musharraf** (1999–2008); civilian rule again from 2008.\n\n*Why democracy was fragile:* the army\'s weight in society and politics; backing at times from clergy and big landowners; conflict with India; outside powers dealing with military rulers during the Cold War. Demand for democracy nevertheless survived.\n\n**Bangladesh:** East Pakistan resented the imposition of **Urdu** and its weak share of power. The **Awami League** of **Sheikh Mujibur Rahman** won the **1970** elections, power was not transferred, the army cracked down, and a liberation struggle backed by India led to independence in **December 1971**. The **1972** constitution was democratic and secular; in **1975** it became a presidential, one-party system and Mujib was killed. Military-led rule under **Ziaur Rahman** (BNP) and **H. M. Ershad** lasted until a mass movement in **1990**. Multi-party elections since **1991** (a military-backed caretaker in 2007–08).',
      terms: [['Awami League', 'The party of Sheikh Mujibur Rahman that led the movement for Bangladesh.'], ['Military takeover (coup)', 'Seizure of government by the armed forces.']],
      v: vRegimes,
      vs: [v1971],
    },
    {
      h: '3. Nepal: from monarchy to republic',
      t: 2,
      b: '- **1990:** a pro-democracy movement wins a **constitutional monarchy**.\n- **1996:** the **Maoists** begin an armed insurgency.\n- **2005:** the king dismisses the government and rules directly.\n- **April 2006:** a mass movement of parties and people forces him to **restore parliament**; a peace agreement brings the Maoists into politics.\n- **2008:** the elected **Constituent Assembly** abolishes the monarchy.\n- **2015:** a **federal democratic republican** constitution is adopted.',
      terms: [['Maoists (Nepal)', 'Communist insurgents who fought the monarchy from 1996 and joined the peace process in 2006.'], ['Constituent Assembly', 'An elected body that writes a constitution.']],
      v: vNepal,
      vs: [vNepalForces],
    },
    {
      h: '4. Sri Lanka: ethnic conflict and democracy',
      t: 2,
      b: '- Independent in **1948**; politics dominated by the **Sinhala** majority.\n- **1956:** Sinhala made the sole official language; **Tamils** felt discriminated against in language, jobs and education.\n- Demands for autonomy turned into militancy; the **LTTE** sought a separate **Tamil Eelam**; civil war from **1983**.\n- **1987:** India–Sri Lanka Accord; the **IPKF** was sent but became unpopular and left in **1990**.\n- A ceasefire in 2002 broke down; the war ended in **2009** with the LTTE\'s defeat.\n- Sri Lanka kept elected governments throughout and has relatively good literacy and life expectancy; it opened its economy early (1977).',
      terms: [['LTTE', 'Liberation Tigers of Tamil Eelam, the armed group that fought for a separate Tamil state.'], ['IPKF', 'Indian Peace Keeping Force, sent to Sri Lanka in 1987 under the bilateral accord.']],
      v: vSriLanka,
    },
    {
      h: '5. India and Pakistan',
      t: 3,
      b: '**Conflicts:** Kashmir war **1947–48**; war of **1965**; war of **1971** (Bangladesh); **Kargil 1999**. Other issues: **Siachen**, **Sir Creek**, sharing of river waters, an arms race (both nuclear-armed after **1998**).\n\n**Agreements and peace efforts:** **Indus Waters Treaty 1960** (World Bank mediation); **Tashkent Agreement 1966** (Soviet mediation); **Simla Agreement 1972** (peaceful, bilateral settlement); the Delhi–Lahore bus and declaration of **1999**; talks and confidence-building measures.',
      terms: [['Confidence-building measures', 'Steps such as contacts, notifications and talks that reduce suspicion between rivals.'], ['Bilateral', 'Between two countries only, without outside mediation.']],
      v: vIndoPak,
    },
    {
      h: '6. India and its other neighbours',
      t: 3,
      b: '- **Bangladesh:** India supported independence in 1971; **Ganga waters treaty (1996)**; **Land Boundary Agreement** put into effect in **2015**, exchanging enclaves. Issues: other rivers, movement of people.\n- **Nepal:** open border under the **1950 treaty**; trade and development cooperation; differences at times over trade and ties with other powers.\n- **Sri Lanka:** trade links and a free trade agreement (1998); the IPKF episode was a difficult chapter.\n- **Bhutan:** close ties; **hydroelectric** cooperation.\n- **Maldives:** India helped foil a **coup attempt in 1988**.\n\nIndia\'s size makes it a valued partner but also makes smaller neighbours cautious about domination.',
      terms: [['Enclave', 'A small area of one country completely surrounded by another country\'s territory.']],
      v: vNeighbours,
    },
    {
      h: '7. SAARC and SAFTA',
      t: 4,
      b: '- **Founded:** Dhaka, December **1985**; secretariat in **Kathmandu**; **Afghanistan** joined in **2007**.\n- **Aims:** welfare, economic growth, social and cultural development, mutual trust and collective self-reliance.\n- **Rules:** decisions by **unanimity**; bilateral and contentious issues excluded.\n- **SAFTA:** signed **2004** (Islamabad), in force **2006**; aims to cut tariffs among members.\n- **Limits:** India–Pakistan tension, asymmetry of size, low regional trade; no summit since **2014** (as of 2024).\n- **Outside powers:** the United States and China have important ties in the region.',
      terms: [['SAARC', 'South Asian Association for Regional Cooperation, founded in 1985.'], ['SAFTA', 'South Asian Free Trade Area, an agreement to reduce tariffs among SAARC members.']],
      v: vSaarc,
      vs: [vWE4],
    },
  ],
  tips: '**Common mistakes**\n- Mixing up **Tashkent (1966)** and **Simla (1972)**, or **Ziaur Rahman** and **Zia-ul-Haq**.\n- Saying the **UN** brokered the Indus Waters Treaty: it was the **World Bank**.\n- Saying SAARC was formed in 1971 or that its secretariat is in Delhi: **1985, Kathmandu**.\n- Writing that the IPKF was a **SAARC** or **UN** force: it was sent under the **bilateral** 1987 accord.\n- Forgetting that Nepal\'s **republic (2008)** and **constitution (2015)** are different events.\n\n**How marks are usually awarded**\n- 1 mark: one correct option or fact.\n- 2 marks: two points, or a point with explanation (about 40 words).\n- 3 marks: three distinct points (about 60–80 words).\n- 5 marks: five points with dates and examples (about 100–120 words); "evaluate" needs both sides and a judgement.\n- Source-based: quote briefly, then add your own knowledge.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['Members of SAARC', 'India, Pakistan, Bangladesh, Nepal, Bhutan, Sri Lanka, Maldives (1985) and **Afghanistan** (2007).', 'fact', 4],
  ['Pakistan: years of military takeover', '**1958** (Ayub Khan), **1977** (Zia-ul-Haq), **1999** (Musharraf).', 'fact', 1],
  ['Pakistan: returns to civilian rule', '**1971** (Z. A. Bhutto), **1988**, **2008**.', 'fact', 1],
  ['Reasons for fragile democracy in Pakistan', 'Army\'s dominance; support of clergy and landowners; conflict with India; outside powers\' ties with military rulers.', 'concept', 1],
  ['East Pakistan\'s grievances', 'Imposition of **Urdu**; weak share of power despite a larger population.', 'concept', 1],
  ['1970 elections', '**Awami League** (Sheikh Mujibur Rahman) won a majority; power not transferred.', 'fact', 1],
  ['Bangladesh independence', '**December 1971**, after a liberation struggle supported by India.', 'fact', 1],
  ['Bangladesh 1975', 'Presidential, one-party system; Sheikh Mujib killed; military-led rule follows.', 'fact', 1],
  ['Bangladesh 1990–91', 'Mass movement removes **Ershad**; elections in **1991**.', 'fact', 1],
  ['Ziaur Rahman vs Zia-ul-Haq', 'Ziaur Rahman: Bangladesh (founded BNP). Zia-ul-Haq: Pakistan (military ruler 1977–88).', 'exam-tip', 1],
  ['Nepal 1990', 'Popular movement → **constitutional monarchy**.', 'fact', 2],
  ['Nepal\'s Maoists', 'Armed insurgency from **1996**; joined the peace process in **2006**.', 'definition', 2],
  ['Nepal April 2006', 'Mass movement forces the king to **restore parliament**.', 'fact', 2],
  ['Nepal 2008 and 2015', '**2008:** monarchy abolished, republic. **2015:** new federal constitution.', 'fact', 2],
  ['Sri Lanka 1956', 'Sinhala made the **only official language**.', 'fact', 2],
  ['LTTE', 'Liberation Tigers of Tamil Eelam; fought for a separate Tamil state.', 'definition', 2],
  ['India–Sri Lanka Accord', '**1987**; IPKF sent; withdrawn in **1990**.', 'fact', 2],
  ['End of Sri Lanka\'s civil war', '**2009**, with the LTTE\'s military defeat.', 'fact', 2],
  ['Sri Lanka\'s noted features', 'Elected governments throughout; relatively high literacy and life expectancy.', 'concept', 2],
  ['India–Pakistan wars', '**1947–48**, **1965**, **1971**; **Kargil 1999**.', 'fact', 3],
  ['Tashkent Agreement', '**1966**, after the 1965 war; mediated by the Soviet Union.', 'fact', 3],
  ['Simla Agreement', '**1972**; settle differences peacefully and **bilaterally**.', 'fact', 3],
  ['Indus Waters Treaty', '**1960**; mediated by the **World Bank**.', 'fact', 3],
  ['Other India–Pakistan issues', 'Siachen, Sir Creek, river waters, nuclear and arms race.', 'concept', 3],
  ['India–Bangladesh cooperation', 'Ganga waters treaty **1996**; enclave exchange **2015**.', 'example', 3],
  ['India–Nepal link', 'Open border; **1950 Treaty of Peace and Friendship**.', 'fact', 3],
  ['India and the Maldives, 1988', 'India helped foil a **coup attempt** at the government\'s request.', 'example', 3],
  ['SAARC basics', 'Founded **1985** (Dhaka); secretariat **Kathmandu**; decisions by **unanimity**.', 'fact', 4],
  ['SAFTA', 'Signed **2004**, in force **2006**; aims to reduce tariffs among members.', 'definition', 4],
  ['Why SAARC achieved less', 'India–Pakistan tension; unanimity rule; bilateral issues excluded; low regional trade.', 'concept', 4],
]);

// ---------------------------------------------------------------- tests
const BP_SHORT = 'cbse-12-political-science-chapter-test-short';
const BP_LONG = 'cbse-12-political-science-chapter-test-long';
const T_SHORT = test({
  kind: 'short',
  blueprint: BP_SHORT,
  title: 'Chapter test (short) — Contemporary South Asia',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_ayub', 'm_nepal_2006', 'm_simla', 'ar_crackdown'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and the 3-mark question in about 50–80 words.', items: ['s_east_resent', 's_india_nepal', 's3_nepal_steps'] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer any ONE of the two questions in about 80–120 words.', items: [{ attempt: 1, keys: ['l_indopak', 'l_saarc'] }] },
    { id: 'D', title: 'Section D — Source-based (4 marks)', instr: 'Read the source and answer all parts. Part (c) has an internal choice.', items: ['sb_kathmandu'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: BP_LONG,
  title: 'Chapter test (long) — Contemporary South Asia',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_pak_reasons', 'm_awami_1970', 'm_sl_language', 'm_ipkf', 'm_indus', 'm_lba', 'm_safta', 'm_saarc_limit', 'ar_kashmir', 'ar_safta'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and 3-mark questions in about 50–80 words. Questions 13 and 15 have an internal choice.', items: ['s_pak_two', 's_sl_causes', { attempt: 1, keys: ['s_indopak_issues', 's_saarc_limits'] }, 's3_bd_stages', { attempt: 1, keys: ['s3_sl_india', 's3_india_bd'] }] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer question 16, and any ONE of questions 17 and 18, in about 80–120 words each.', items: ['l_pak_bd', { attempt: 1, keys: ['l_nepal', 'l_neighbours'] }] },
    { id: 'D', title: 'Section D — Source-based (4 marks each)', instr: 'Read each source and answer all parts. Part (c) of each has an internal choice.', items: ['sb_dhaka', 'sb_lahore_bus'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t04 of cbse-12-political-science-ch03 only (Pakistan and Bangladesh; Nepal and Sri Lanka; India–Pakistan and India\'s neighbours; SAARC)',
    originality: 'every source, diary, letter, report and scenario is written by SOYL and labelled as imagined; no NCERT text, cartoon or board/sample-paper item reused (D-036)',
    facts: 'stable dates only: Pakistan 1958, 1971, 1977, 1988, 1999, 2008; Bangladesh 1970, 1971, 1972, 1975, 1990–91, 2007–08; Nepal 1990, 1996, 2005, 2006, 2008, 2015; Sri Lanka 1948, 1956, 1976, 1983, 1987, 1990, 2009; India–Pakistan 1947–48, 1960, 1965, 1966, 1971, 1972, 1998, 1999; India–Bangladesh 1996, 2015; Maldives 1988; SAARC 1985, 1987, 2004, 2006, 2007, last summit 2014 (as of 2024); no events after 2015 except that dated note',
    neutrality: 'disputes stated as each side\'s position; no opinion on contested current politics',
    gate: 'schema, pipeline lint, deterministic verify, word limits, narration and answer-leak checks run clean in this build',
  },
});
