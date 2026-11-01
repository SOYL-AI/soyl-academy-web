// Build ICSE 10 History & Civics ch10 The Muslim League and the Lucknow Pact. Run from platform/:
//   npx tsx content/authored/social-science/icse-10-history-civics-ch10/src/build.mjs
import path from 'node:path';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build } from '../../icse-10-history-civics-ch01/src/lib.mjs';

setUnit('icse-10-history-civics-ch10', 'social-science');
const { timelineSvg, pactSvg, EVENTS, LEAGUE_FOUNDED, PACT_YEAR, yearsBetween } = await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- figures
const TL_ALT = 'Timeline from 1870 to 1920 marking: 1875 MAO College at Aligarh, 1885 Congress founded, 1905 Partition of Bengal, October 1906 Simla Deputation, December 1906 Muslim League, 1909 Morley-Minto Reforms, 1911 partition annulled, 1913 League adopts self-rule aim and 1916 Lucknow Pact';
const vTimeline = timelineSvg(TL_ALT, 'Schematic timeline drawn by SOYL; label positions are for legibility only.');
const vPact = pactSvg('Diagram: two boxes, the Indian National Congress (Lucknow session, 1916) and the All India Muslim League (Lucknow session, 1916), with arrows to a central box labelled joint scheme of reforms: common demand for self-government, separate electorates accepted, seat shares fixed by province', 'The Lucknow Pact as a joint scheme (schematic).');
const vRoute1 = flow('LR', ['Background', 'Partition of Bengal', 'Simla Deputation', 'Founding at Dacca', 'Objectives'], 'Route map of Part 1: the background, the Partition of Bengal, the Simla Deputation, the founding of the League at Dacca and its objectives', 'Part 1 at a glance');
const vRoute2 = flow('LR', ['Separate electorates, 1909', 'Annulment, 1911', 'New aim, 1913', 'Lucknow, 1916', 'Impact'], 'Route map of Part 2: separate electorates in 1909, the annulment of the partition in 1911, the League\'s new aim in 1913, the Lucknow Pact of 1916 and its impact', 'Part 2 at a glance');
const vFactors = table(['Factor (as commonly taught)', 'What it means'], [
  ['British policy of "divide and rule" (nationalist view)', 'Encouraging separate interests so communities would not unite'],
  ['Educational and economic backwardness', 'Sections of Muslims felt left behind in education and jobs'],
  ['Influence of Sir Syed Ahmad Khan', 'Modern education at Aligarh; advice to keep away from the Congress'],
  ['Partition of Bengal and the agitation against it', 'A Muslim-majority province some welcomed; fear of its undoing'],
  ['Simla Deputation, October 1906', 'A favourable hearing encouraged a permanent body'],
], 'Table of five factors commonly linked with the founding of the Muslim League: the British policy of divide and rule as nationalists saw it, educational and economic backwardness, the influence of Sir Syed Ahmad Khan, the Partition of Bengal and the agitation against it, and the Simla Deputation of October 1906', 'Factors as listed in most ICSE lessons; give two sides where views differ.');
const vPartition = flow('TB', ['1905: Curzon divides Bengal', 'Eastern Bengal and Assam: a Muslim-majority province', 'Some Muslim leaders welcome it', 'Strong agitation to undo it (boycott, swadeshi)', 'These leaders feel the need for their own body'], 'Flow: in 1905 Curzon divides Bengal, creating Eastern Bengal and Assam with a Muslim majority; some Muslim leaders welcome it; a strong agitation seeks to undo it; these leaders feel they need their own organisation', 'One link between 1905 and 1906.');
const vSimla = table(['Point', 'Fact'], [
  ['Date', 'October 1906'],
  ['Place', 'Simla'],
  ['Led by', 'Aga Khan III'],
  ['Met', 'Viceroy Lord Minto'],
  ['Main demand', 'Separate electorates and fair representation in councils'],
], 'Table of facts about the Simla Deputation: October 1906, at Simla, led by Aga Khan III, met Viceroy Lord Minto, demanded separate electorates and fair representation in councils');
const vFounding = table(['Point', 'Fact'], [
  ['Date', `30 December ${LEAGUE_FOUNDED}`],
  ['Place', 'Dacca (Dhaka)'],
  ['Occasion', 'Meeting during the All India Muhammadan Educational Conference'],
  ['Host', 'Nawab Salimullah of Dacca'],
  ['First President', 'Aga Khan III'],
], `Table of facts about the founding of the Muslim League: 30 December ${LEAGUE_FOUNDED}, at Dacca, during the All India Muhammadan Educational Conference, hosted by Nawab Salimullah, with Aga Khan III as first President`);
const vObjectives = flow('TB', ['Loyalty to the British government', 'Protect and advance Muslims\' political rights', 'Place Muslims\' needs before the government', 'Prevent hostility towards other communities'], 'Flow of the League\'s objectives in 1906: loyalty to the British government, protecting and advancing Muslims\' political rights, placing their needs before the government, and preventing hostility towards other communities', 'Objectives at the founding (paraphrased).');
const vSort = table(['Imagined statement in a quiz', 'Factor or objective?'], [
  ['"We must keep good relations with the government."', 'Objective (loyalty)'],
  ['"Our young people lag behind in colleges and offices."', 'Factor (backwardness)'],
  ['"The protests in Calcutta may undo our new province."', 'Factor (partition)'],
  ['"We should speak for our community\'s needs."', 'Objective (political rights)'],
], 'Worked example table sorting four imagined statements: keeping good relations with the government and speaking for the community\'s needs are objectives; lagging behind in colleges and fear of undoing the new province are factors', 'Imagined statements written by SOYL. Ask: is it a cause, or an aim?');
const vElectorates = table(['Joint electorate', 'Separate electorate'], [
  ['All voters of a constituency choose the member together', 'Only voters of one community choose members reserved for it'],
  ['Candidates appeal to every community', 'Candidates appeal to their own community'],
], 'Table comparing joint and separate electorates: in a joint electorate all voters choose together and candidates appeal to everyone; in a separate electorate only one community\'s voters choose members reserved for it', 'Separate electorates came with the Indian Councils Act, 1909.');
const vChange = flow('LR', ['1906: loyalty and separate representation', '1909: separate electorates won', '1911: partition annulled, trust shaken', '1913: aim of self-government', '1916: joint scheme with the Congress'], 'Flow of how the League changed: loyalty and separate representation in 1906, separate electorates won in 1909, trust shaken by the annulment of 1911, the aim of self-government in 1913, and the joint scheme with the Congress in 1916', 'From loyalty to cooperation.');
const vReunion = table(['Event', 'Year', 'Place'], [
  ['Congress splits into Moderates and Assertive Nationalists', '1907', 'Surat'],
  ['The two groups come together again', '1916', 'Lucknow'],
], 'Table: the Congress split into Moderates and Assertive Nationalists at Surat in 1907 and reunited at Lucknow in 1916', `Nine years apart (${yearsBetween(1907, PACT_YEAR)}).`);
const vTerms = table(['Term (paraphrased)', 'What it meant'], [
  ['Joint demand for self-government', 'Both bodies asked for Indian control over government'],
  ['Enlarged councils with an elected majority', 'Most council members to be elected, not nominated'],
  ['Separate electorates accepted by the Congress', 'Muslims to elect their own representatives'],
  ['Seat shares fixed province by province', 'Muslim seats in each provincial council settled in advance'],
], 'Table of the main terms of the Lucknow Pact, paraphrased: a joint demand for self-government, enlarged councils with an elected majority, separate electorates accepted by the Congress, and seat shares fixed province by province', 'Paraphrased; no text of the Pact is reproduced.');
const vImpact = table(['Short-term gains', 'Long-term debate'], [
  ['Congress and League made one demand', 'Some historians: separate electorates entrenched community politics'],
  ['Moderates and Assertives reunited', 'Others: a necessary price for unity in 1916'],
  ['More pressure for self-government during the war', 'Both views are taught; give reasons for yours'],
], 'Table of the impact of the Lucknow Pact: short-term gains were one joint demand, the reunion of the Congress groups and more pressure for self-government; the long-term debate is whether accepting separate electorates entrenched community politics or was a necessary price for unity', 'Present both views.');
const vPlan = table(['Part', 'Marks', 'What to write'], [
  ['(i) When, where, who', '3', 'Three separate facts, one per mark'],
  ['(ii) Terms', '3', 'Three terms, each in one clear line'],
  ['(iii) Impact', '4', 'Two short-term effects and a balanced long-term point'],
], 'Worked example table planning a ten-mark answer on the Lucknow Pact in three parts: three facts for when, where and who; three terms; and for four marks two short-term effects and a balanced long-term point', 'Plan before you write.');
const vSum1 = flow('TB', ['Background: divide and rule (nationalist view), backwardness, Aligarh', 'Partition of Bengal, 1905', 'Simla Deputation, October 1906', `Muslim League, Dacca, 30 December ${LEAGUE_FOUNDED}`, 'Objectives: loyalty, rights, harmony'], `Summary flow of Part 1: the background, the Partition of Bengal in 1905, the Simla Deputation in October 1906, the founding of the League at Dacca on 30 December ${LEAGUE_FOUNDED}, and its objectives of loyalty, rights and harmony`, 'Part 1 in five lines.');
const vSum2 = flow('TB', ['1909: separate electorates', '1911: annulment', '1913: new aim', `${PACT_YEAR}: Lucknow Pact and Congress reunion`, 'Impact: unity now, debate later'], `Summary flow of Part 2: separate electorates in 1909, the annulment in 1911, the League's new aim in 1913, the Lucknow Pact and Congress reunion in ${PACT_YEAR}, and its impact`, 'Part 2 in five lines.');
assert.equal(yearsBetween(LEAGUE_FOUNDED, PACT_YEAR), 10);
assert.ok(EVENTS.some(([y]) => y === PACT_YEAR));

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'The Muslim League — Part 1: Background, Formation and Objectives',
  goals: [
    'State when and where the Muslim League was formed and name leaders linked with its founding',
    'Explain the factors commonly linked with its formation',
    'State the League\'s objectives at its formation',
  ],
  slides: [
    sl('title', 'A new political body in 1906', {
      b: 'Part 1 — the **background**, the **Simla Deputation**, the **founding at Dacca** and the **objectives**.',
      v: vRoute1,
      n: 'By the early nineteen hundreds the Indian National Congress was twenty years old. In December nineteen oh six a new political organisation was formed at Dacca: the All India Muslim League. In this part we look at the background to its formation, the deputation that met the Viceroy at Simla, the founding meeting itself, and the aims the League set for itself.',
    }),
    sl('diagram', 'Dates to remember', {
      b: 'From **Aligarh (1875)** to **Lucknow (1916)**.',
      v: vTimeline,
      n: 'This timeline shows the main dates of the chapter. The college at Aligarh was founded in eighteen seventy-five and the Congress in eighteen eighty-five. Bengal was partitioned in nineteen oh five. The Simla Deputation met the Viceroy in October nineteen oh six, and the League was founded that December. Separate electorates came in nineteen oh nine, and the Lucknow Pact in nineteen sixteen.',
    }),
    sl('concept', 'Factors behind the League', {
      b: 'Historians link **several factors** with the League\'s formation; where views differ, learn both sides.',
      v: vFactors,
      n: 'Several factors are commonly linked with the founding of the League. Nationalists blamed a British policy of divide and rule. Sections of Muslims felt they lagged behind in education and jobs. Sir Syed Ahmad Khan\'s work at Aligarh shaped many leaders. The Partition of Bengal and the agitation against it mattered. And the Simla Deputation showed what an organised body could achieve.',
    }),
    sl('check', 'Quick check: the Viceroy of 1905', {
      b: 'Under which Viceroy was Bengal partitioned?',
      chk: 'm_curzon_partition',
      n: 'The partition came in nineteen oh five. Which Viceroy carried it out?',
    }),
    sl('diagram', 'The Partition of Bengal', {
      b: 'A **Muslim-majority** new province, and an agitation to undo it.',
      v: vPartition,
      n: 'In nineteen oh five Lord Curzon divided Bengal. The new province of Eastern Bengal and Assam had a Muslim majority, and some Muslim leaders welcomed it as an opportunity for their community. The strong agitation against the partition, with boycott and swadeshi, worried them. They began to feel that they needed an organisation of their own to protect what they saw as their interests.',
    }),
    sl('two-column', 'Divide and rule, and backwardness', {
      cols: ['**"Divide and rule" (nationalist view)**\n\n- Government accused of encouraging **separate interests**\n- Aim, as critics saw it: keep communities from **uniting**', '**Sense of backwardness**\n\n- Sections of Muslims behind in **English education**\n- Fewer **government jobs** and **professions**\n- Wish for a body to **speak for** them'],
      n: 'Two factors are often paired. Nationalists accused the government of divide and rule: encouraging separate interests so that communities would not unite against it. At the same time, sections of Muslims felt they had fallen behind in English education, government jobs and the professions, and wanted an organisation that would speak for them. Remember to present the divide and rule idea as a view.',
    }),
    sl('diagram', 'Sir Syed Ahmad Khan and Aligarh', {
      b: '**Muhammadan Anglo-Oriental College**, Aligarh, **1875**.',
      v: vFactors,
      n: 'Sir Syed Ahmad Khan founded the Muhammadan Anglo-Oriental College at Aligarh in eighteen seventy-five to spread modern education among Muslims. He advised Muslims to keep away from the Congress at that stage and to concentrate on education. Many leaders of the next generation came from this background, which is why his work is often mentioned in the story of the League.',
    }),
    sl('diagram', 'The Simla Deputation, October 1906', {
      b: 'Led by **Aga Khan III**; met **Lord Minto**; asked for **separate electorates**.',
      v: vSimla,
      n: 'In October nineteen oh six a group of Muslim leaders led by Aga Khan the Third met the Viceroy, Lord Minto, at Simla. They asked that Muslims be given separate representation in elected councils, in keeping with what they saw as their political importance. The Viceroy gave them a sympathetic hearing, which encouraged the same leaders to form a permanent body.',
    }),
    sl('check', 'Quick check: which came first?', {
      b: 'True or false: the Simla Deputation met the Viceroy after the League was founded.',
      chk: 'tf_minto_dacca',
      n: 'Both events happened in nineteen oh six. Which came first?',
    }),
    sl('diagram', 'Founding at Dacca', {
      b: `**30 December ${LEAGUE_FOUNDED}**, **Dacca**; host **Nawab Salimullah**; first President **Aga Khan III**.`,
      v: vFounding,
      n: 'Leaders who had gathered at Dacca for the All India Muhammadan Educational Conference stayed on and, on the thirtieth of December nineteen oh six, founded the All India Muslim League. The meeting was hosted by Nawab Salimullah of Dacca. Aga Khan the Third, who had led the Simla Deputation, became its first President.',
    }),
    sl('example', 'Worked example 1: a 3-mark answer on factors', {
      b: 'Explain **three factors** behind the League\'s formation.',
      bl: ['Step 1: pick **three different** factors, not three versions of one.', 'Step 2: one **clear line** each, with a **detail** (a date or a name).', 'Step 3: where a factor is a **view**, say so ("nationalists argue …").'],
      v: vFactors,
      n: 'For a three-mark question on factors, choose three different ones. For example, the partition of nineteen oh five with the new Muslim-majority province, the sense of backwardness in education and jobs, and the Simla Deputation that encouraged organisation. Give each one a detail. If you mention divide and rule, present it as the nationalist view, not as a settled fact.',
    }),
    sl('diagram', 'Objectives in 1906', {
      b: '**Loyalty**, **political rights** and **harmony** (paraphrased).',
      v: vObjectives,
      n: 'At its founding the League set out three objectives. First, to promote loyalty among Muslims to the British government. Second, to protect and advance the political rights of Muslims and place their needs before the government. Third, to prevent hostility among Muslims towards other communities. Learn these in your own words; no exact wording is needed.',
    }),
    sl('check', 'Quick check: an objective', {
      b: 'One of the first objectives was to promote ___ towards the British government.',
      chk: 'fb_obj_loyalty',
      n: 'The first objective concerned the League\'s attitude to the government. Which word completes it?',
    }),
    sl('example', 'Worked example 2: factor or objective?', {
      b: 'Sort imagined statements into **causes** and **aims**.',
      bl: ['A **factor** explains **why** the League was formed.', 'An **objective** states what the League **wanted to do**.', 'Check the tense: worries about the past or present are often factors; plans are aims.'],
      v: vSort,
      n: 'Exam questions often mix up factors and objectives, so practise telling them apart. In these imagined statements, keeping good relations with the government is an objective, and so is speaking for the community\'s needs. Lagging behind in colleges and offices is a factor, and so is the fear that protests might undo the new province.',
    }),
    sl('diagram', 'Order of events', {
      b: 'Simla (October) came **before** Dacca (December).',
      v: vTimeline,
      n: 'Look again at the timeline. The partition of nineteen oh five came first. The Simla Deputation followed in October nineteen oh six, and the League was founded in December of the same year. Keeping this order clear helps you explain how one event led to the next.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSum1,
      n: 'To sum up Part One. Nationalists blamed divide and rule; sections of Muslims felt left behind; Aligarh shaped many leaders. The partition of nineteen oh five and the agitation against it, and the Simla Deputation of October nineteen oh six, led to the founding of the League at Dacca on the thirtieth of December nineteen oh six. Its aims were loyalty, the protection of political rights, and harmony with other communities.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['Give the **full date**: 30 December 1906, **Dacca**.', 'Do not mix up **Salimullah** (host) and **Aga Khan III** (first President, Simla leader).', 'Present "divide and rule" as a **view**.', 'The League\'s first aims did **not** include independence.', 'Two-mark answers: **two distinct points**.'],
      v: vFounding,
      n: 'A few tips. Give the full date and place of the founding. Keep the host, Nawab Salimullah, apart from the first President, Aga Khan the Third. Present divide and rule as the nationalist view. Remember that independence was not one of the League\'s first aims. In two-mark answers, write two distinct points.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'The Muslim League — Part 2: From Separate Electorates to the Lucknow Pact',
  goals: [
    'Explain separate electorates and how the League\'s aims changed by 1913',
    'Name the parties to the Lucknow Pact and state its main terms',
    'Evaluate the impact of the Lucknow Pact, giving more than one view',
  ],
  slides: [
    sl('title', 'From Dacca to Lucknow', {
      b: 'Part 2 — **1909**, **1911**, **1913** and the **Lucknow Pact of 1916**.',
      v: vRoute2,
      n: 'In Part Two we follow the League over the next ten years. Separate electorates came in nineteen oh nine. The partition of Bengal was undone in nineteen eleven. In nineteen thirteen the League adopted a new aim. And in nineteen sixteen it agreed on a joint scheme with the Congress at Lucknow. We end by weighing the impact of that agreement.',
    }),
    sl('diagram', 'Separate electorates, 1909', {
      b: 'The **Indian Councils Act, 1909** (Morley-Minto Reforms) gave Muslims **separate electorates**.',
      v: vElectorates,
      n: 'The Indian Councils Act of nineteen oh nine, known as the Morley-Minto Reforms, enlarged the legislative councils. It also gave Muslims separate electorates: in seats reserved for Muslims, only Muslim voters chose the member. This met the main demand of the Simla Deputation. Compare it with a joint electorate, in which all voters of a constituency choose together.',
    }),
    sl('diagram', 'How the League changed', {
      b: 'From **loyalty** in 1906 to **cooperation** in 1916.',
      v: vChange,
      n: 'The League changed over these years. In nineteen eleven the partition of Bengal was annulled, which disappointed leaders who had trusted the government. Younger leaders favoured working with the Congress. In nineteen thirteen the League adopted the goal of self-government suited to India, an aim close to that of the Congress. By nineteen sixteen the two could agree on a joint scheme.',
    }),
    sl('check', 'Quick check: a bridge between two bodies', {
      b: 'Why was Jinnah well placed to help bring about the Pact?',
      chk: 'm_jinnah_both',
      n: 'One leader belonged to both organisations at the time. Why did that matter?',
    }),
    sl('diagram', 'The Congress reunites', {
      b: 'Split at **Surat, 1907**; together again at **Lucknow, 1916**.',
      v: vReunion,
      n: 'The Lucknow session of nineteen sixteen was important for the Congress itself. The Moderates and the Assertive Nationalists, who had split at Surat in nineteen oh seven, came together again. A reunited Congress could negotiate with the League as one body. Remember that this reunion and the Pact happened at the same time but are two different events.',
    }),
    sl('diagram', 'The Lucknow Pact, December 1916', {
      b: 'The **Congress** and the **League** agree on a **joint scheme**.',
      v: vPact,
      n: 'In December nineteen sixteen the Congress and the Muslim League both met at Lucknow and agreed on a joint scheme of reforms. Bal Gangadhar Tilak, for the Congress, and Muhammad Ali Jinnah, for the League, are the leaders most associated with it. Ambika Charan Mazumdar presided over the Congress session that year.',
    }),
    sl('check', 'Quick check: the city', {
      b: 'In which city did the two bodies agree in 1916?',
      chk: 'm_pact_city',
      n: 'The Pact is named after the city where both bodies met. Which city was it?',
    }),
    sl('diagram', 'Main terms', {
      b: '**Self-government**, an **elected majority**, **separate electorates** and **fixed seat shares**.',
      v: vTerms,
      n: 'The main terms, in our own words, were these. The two bodies made a joint demand for self-government. Councils were to be enlarged, with most members elected. The Congress accepted separate electorates for Muslims. And the number of Muslim seats in each provincial council was fixed in advance. Learn these as ideas; no exact wording is needed.',
    }),
    sl('example', 'Worked example 3: planning a 10-mark answer', {
      b: 'Plan a **3 + 3 + 4** answer on the Lucknow Pact.',
      bl: ['(i) **When, where, who:** December 1916, Lucknow, Congress and League; Tilak and Jinnah.', '(ii) **Terms:** joint demand; elected majority; separate electorates with seat shares.', '(iii) **Impact:** unity and reunion now; the electorates debate later.'],
      v: vPlan,
      n: 'Let us plan a ten-mark answer. For part one, give three facts: the date and place, the two organisations, and the leaders. For part two, give three terms, each in one line. Part three carries four marks, so give two short-term effects, unity and the reunion, and then a balanced point about separate electorates.',
    }),
    sl('diagram', 'Impact: two views', {
      b: '**Unity in 1916**; a **debate** about the long term.',
      v: vImpact,
      n: 'In the short term the Pact showed that the Congress and the League could make one demand, and the Congress was reunited, so the call for self-government grew stronger during the war. In the long term historians differ. Some say accepting separate electorates entrenched politics by community. Others say it was the price of unity in nineteen sixteen. Learn both views.',
    }),
    sl('check', 'Quick check: who were the parties?', {
      b: 'True or false: the Viceroy was a party to the Lucknow Pact.',
      chk: 'tf_pact_viceroy',
      n: 'The Pact was an agreement between whom? Was the government part of it?',
    }),
    sl('example', 'Worked example 4: a balanced 2-mark answer', {
      b: 'One argument **for** and one **against** accepting separate electorates.',
      bl: ['**For:** a practical **compromise** that made a **united demand** possible.', '**Against:** it **recognised** politics organised by **community**.', 'Keep the tone **neutral**: "some historians argue …".'],
      v: vImpact,
      n: 'When a question asks for both sides, give one clear point for each and keep the tone neutral. For: accepting separate electorates was a practical compromise that won the League\'s trust and made a united demand possible. Against: it gave formal recognition to politics organised by community. Say that historians differ, rather than declaring one side simply right.',
    }),
    sl('diagram', 'Ten years, two bodies', {
      b: `From Dacca (${LEAGUE_FOUNDED}) to Lucknow (${PACT_YEAR}): **${yearsBetween(LEAGUE_FOUNDED, PACT_YEAR)} years**.`,
      v: vTimeline,
      n: 'Look at the decade as a whole. In ten years the League moved from loyalty to the goal of self-government. Separate electorates were introduced. The Congress split and reunited. And the two organisations made a joint demand. This decade shows how quickly political aims could change in response to events.',
    }),
    sl('check', 'Quick check: match the years', {
      b: 'Match each event with its year.',
      chk: 'match_ch10',
      v: vChange,
      n: 'Try matching four events with their years: the Simla Deputation, the Indian Councils Act, the annulment of the partition, and the Lucknow agreement.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSum2,
      n: 'To sum up Part Two. Separate electorates came in nineteen oh nine. The annulment of nineteen eleven shook the League\'s trust in the government, and in nineteen thirteen it adopted self-government as its aim. In nineteen sixteen, at Lucknow, the Congress reunited and agreed a joint scheme with the League. The Pact brought unity at the time, but its acceptance of separate electorates is still debated.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['Lucknow Pact: **December 1916**, **Congress and League**; **Tilak** and **Jinnah**.', 'Do not confuse the **reunion** of the Congress with the **Pact** itself.', 'Separate electorates: **introduced in 1909**, **accepted by the Congress in 1916**.', 'For impact, give **short-term** effects and a **balanced** long-term view.'],
      v: vTerms,
      n: 'Final tips. The Pact was agreed in December nineteen sixteen between the Congress and the League, with Tilak and Jinnah most associated with it. Do not confuse the Congress reunion with the Pact itself. Separate electorates were introduced in nineteen oh nine and accepted by the Congress in nineteen sixteen. For impact, give short-term effects and a balanced view of the long term.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'The Muslim League and the Lucknow Pact — notes',
  sections: [
    {
      h: '1. Background: factors commonly linked with the League',
      t: 1,
      b: '- **"Divide and rule":** nationalists argued that the government encouraged **separate interests** among communities so that they would not unite against British rule. Present this as a **view**.\n- **Backwardness:** sections of Muslims felt they lagged behind in **English education**, **government jobs** and the **professions**.\n- **Sir Syed Ahmad Khan:** founded the **Muhammadan Anglo-Oriental College, Aligarh (1875)**; urged modern education and advised Muslims to keep away from the **Congress** at that stage.',
      terms: [['Divide and rule', 'A policy, as nationalists described it, of encouraging differences between communities so that they would not unite.']],
      v: vFactors,
    },
    {
      h: '2. The Partition of Bengal and the Simla Deputation',
      t: 1,
      b: '- **1905:** **Lord Curzon** partitioned Bengal; the new province of **Eastern Bengal and Assam** had a **Muslim majority**, and some Muslim leaders welcomed it.\n- The strong **agitation** against the partition (boycott, swadeshi) made these leaders feel they needed their **own organisation**.\n- **Simla Deputation, October 1906:** led by **Aga Khan III**, met the Viceroy **Lord Minto**; asked for **separate electorates** and fair representation in councils. The sympathetic hearing encouraged the founding of a permanent body.',
      terms: [['Simla Deputation', 'Muslim leaders led by Aga Khan III who met Lord Minto at Simla in October 1906 to ask for separate representation.']],
      v: vPartition,
      vs: [vSimla],
    },
    {
      h: '3. Formation of the Muslim League, 1906',
      t: 1,
      b: `- **Date and place:** **30 December ${LEAGUE_FOUNDED}**, **Dacca (Dhaka)**.\n- **Occasion:** a meeting held when leaders gathered for the **All India Muhammadan Educational Conference**.\n- **Host:** **Nawab Salimullah** of Dacca.\n- **First President:** **Aga Khan III**.`,
      terms: [['All India Muslim League', `The political organisation founded at Dacca on 30 December ${LEAGUE_FOUNDED}.`]],
      v: vFounding,
      vs: [vTimeline],
    },
    {
      h: '4. Objectives of the League (paraphrased)',
      t: 2,
      b: '1. To promote **loyalty** among Muslims to the **British government**.\n2. To defend and promote the **political rights** of Muslims and make their **needs** known to the government.\n3. To prevent the growth among Muslims of **hostility towards other communities**.\n\n**Separate electorates:** the **Indian Councils Act, 1909** (Morley-Minto Reforms) enlarged the councils and gave Muslims separate electorates.\n\n**Change by 1913:** the **annulment of the partition (1911)** shook trust in the government; younger leaders such as **Muhammad Ali Jinnah** (joined the League in **1913**) favoured cooperation; the League adopted the goal of **self-government suited to India**.',
      terms: [['Separate electorate', 'An arrangement in which only voters of one community choose the members reserved for that community.']],
      v: vObjectives,
      vs: [vElectorates, vChange],
    },
    {
      h: '5. The Lucknow Pact, 1916',
      t: 3,
      b: `- **When and where:** **December ${PACT_YEAR}**, **Lucknow**, where both the **Congress** and the **League** held their sessions.\n- **Parties:** the **Indian National Congress** and the **All India Muslim League**; leaders most associated: **Bal Gangadhar Tilak** and **Muhammad Ali Jinnah**. **Ambika Charan Mazumdar** presided over the Congress session.\n- **Congress reunion:** the **Moderates** and **Assertive Nationalists**, split at **Surat (1907)**, came together again at the same session.\n- **Main terms (paraphrased):** a **joint demand for self-government**; **enlarged councils** with an **elected majority**; **separate electorates accepted** by the Congress; **Muslim seat shares fixed province by province**.`,
      terms: [['Lucknow Pact', `The agreement of December ${PACT_YEAR} between the Congress and the Muslim League on a joint scheme of reforms.`]],
      v: vPact,
      vs: [vTerms, vReunion],
    },
    {
      h: '6. Impact of the Lucknow Pact',
      t: 3,
      b: '- **Unity:** the two main organisations made **one demand**, showing **Hindu-Muslim cooperation**.\n- **A stronger Congress:** the reunion meant the Congress spoke with **one voice**.\n- **Pressure for self-government** during the **First World War**.\n- **Long-term debate:** some historians argue that accepting **separate electorates** entrenched politics by **community**; others see it as the **necessary price** of unity in 1916. Give both views.',
      terms: [['Joint demand', 'A demand placed before the government by two organisations together.']],
      v: vImpact,
      vs: [vPlan],
    },
  ],
  tips: '**Common mistakes**\n- Giving 1905 or 1909 as the year the League was founded (it was **30 December 1906**).\n- Confusing **Nawab Salimullah** (host) with **Aga Khan III** (first President).\n- Saying independence was a 1906 objective.\n- Treating the Congress **reunion** and the **Pact** as the same event.\n- Saying the Congress **rejected** separate electorates in 1916 (it **accepted** them).\n- Presenting "divide and rule" as settled fact rather than a view.\n\n**How marks are usually awarded**\n- 1-mark items: one correct option or term.\n- 2 marks: two distinct points.\n- 10-mark questions in 3 + 3 + 4 parts: one point per mark; the 4-mark part often asks for impact or a balanced view.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['When and where was the Muslim League founded?', `**30 December ${LEAGUE_FOUNDED}**, **Dacca**.`, 'fact', 1],
  ['Host of the Dacca meeting', '**Nawab Salimullah** of Dacca.', 'fact', 1],
  ['First President of the League', '**Aga Khan III**.', 'fact', 1],
  ['Occasion of the founding meeting', 'The **All India Muhammadan Educational Conference** at Dacca.', 'fact', 1],
  ['Simla Deputation', '**October 1906**; led by **Aga Khan III**; met **Lord Minto**.', 'fact', 1],
  ['Main demand at Simla', '**Separate electorates** and fair representation.', 'fact', 1],
  ['Partition of Bengal', '**1905**, **Curzon**; Eastern Bengal and Assam had a Muslim majority.', 'fact', 1],
  ['Partition annulled', '**1911**.', 'fact', 1],
  ['"Divide and rule"', 'Nationalist view: the government encouraged separate interests among communities.', 'concept', 1],
  ['Sir Syed Ahmad Khan', '**MAO College, Aligarh (1875)**; modern education; advised keeping away from the Congress.', 'fact', 1],
  ['Backwardness as a factor', 'Sections of Muslims felt left behind in education and jobs.', 'concept', 1],
  ['Objective 1 (1906)', 'Promote **loyalty** to the British government.', 'fact', 2],
  ['Objective 2 (1906)', 'Protect and advance Muslims\' **political rights**.', 'fact', 2],
  ['Objective 3 (1906)', 'Prevent **hostility** towards other communities.', 'fact', 2],
  ['Was independence a 1906 aim?', '**No.**', 'exam-tip', 2],
  ['Indian Councils Act, 1909', 'Morley-Minto Reforms; **separate electorates** for Muslims.', 'fact', 2],
  ['Separate electorate', 'Only one community\'s voters choose members reserved for it.', 'definition', 2],
  ['League\'s new aim, 1913', '**Self-government suited to India**.', 'fact', 2],
  ['Jinnah joined the League', '**1913**, while still in the Congress.', 'fact', 2],
  ['Lucknow Pact: year and place', `**December ${PACT_YEAR}**, **Lucknow**.`, 'fact', 3],
  ['Parties to the Pact', 'The **Congress** and the **Muslim League**.', 'fact', 3],
  ['Leaders associated with the Pact', '**Tilak** (Congress) and **Jinnah** (League).', 'fact', 3],
  ['Congress President, 1916', '**Ambika Charan Mazumdar**.', 'fact', 3],
  ['Congress reunion', 'Split at **Surat 1907**; reunited at **Lucknow 1916**.', 'fact', 3],
  ['Main terms of the Pact', 'Joint demand for self-government; elected majority; separate electorates; seat shares by province.', 'concept', 3],
  ['Short-term impact', 'Hindu-Muslim cooperation; Congress reunited; stronger demand.', 'concept', 3],
  ['Long-term debate', 'Entrenched community politics, or a necessary price for unity? Give both views.', 'exam-tip', 3],
  ['Was the Viceroy a party to the Pact?', '**No**; it was between two Indian organisations.', 'exam-tip', 3],
  ['Years from Dacca to Lucknow', `**${yearsBetween(LEAGUE_FOUNDED, PACT_YEAR)}** (1906 to 1916).`, 'fact', 3],
  ['Factor or objective?', 'A factor explains why; an objective says what the League wanted to do.', 'exam-tip', 2],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'icse-10-history-civics-chapter-test-short',
  title: 'Chapter test (short) — The Muslim League and the Lucknow Pact',
  duration: 30,
  sections: [
    { id: 'I', title: 'Part I — Compulsory (10 marks)', instr: 'Attempt all questions. Questions 1–6 carry 1 mark each; questions 7 and 8 carry 2 marks each.', items: ['m_league_year', 'm_simla_dep', 'm_obj_loyalty', 'm_pact_parties', 'm_electorates_accept', 'ar_simla_league', 's_factors_two', 's_pact_terms_two'] },
    { id: 'II', title: 'Part II — Structured question (10 marks)', instr: 'Attempt any ONE of the two questions. Each is in three parts (3 + 3 + 4 marks).', items: [{ attempt: 1, keys: ['l_formation', 'l_pact_terms'] }] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'icse-10-history-civics-chapter-test-long',
  title: 'Chapter test (long) — The Muslim League and the Lucknow Pact',
  duration: 60,
  sections: [
    { id: 'I', title: 'Part I — Compulsory (20 marks)', instr: 'Attempt all questions. Questions 1–10 carry 1 mark each; questions 11–15 carry 2 marks each.', items: ['m_league_city', 'm_first_president', 'm_viceroy_1906', 'm_partition_view', 'm_sir_syed', 'm_obj_1913', 'm_pact_leaders', 'm_reunion', 'm_pact_criticism', 'ar_pact_electorates', 's_simla_two', 's_partition_link', 's_objectives_two', 's_pact_signatories', 's_pact_long_term'] },
    { id: 'II', title: 'Part II — Structured questions (20 marks)', instr: 'Attempt any TWO of the three questions. Each is in three parts (3 + 3 + 4 marks).', items: [{ attempt: 2, keys: ['l_objectives', 'l_pact_evaluate', 'l_compare_1906_1916'] }] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t03 of icse-10-history-civics-ch10 only (formation and factors; objectives; the Lucknow Pact)',
    originality: 'every letter, diary, quiz and scenario is imagined and written by SOYL (labelled); no textbook text or exercise and no specimen or board-paper item reused (D-036); no historical person quoted, ideas paraphrased and attributed',
    data: `event years asserted in date order (${EVENTS.map(([y]) => Math.floor(y)).join(', ')}); ${PACT_YEAR} − ${LEAGUE_FOUNDED} = ${yearsBetween(LEAGUE_FOUNDED, PACT_YEAR)}; 1911 − 1905 = ${yearsBetween(1905, 1911)}; 1916 − 1907 = ${yearsBetween(1907, PACT_YEAR)}`,
    facts: `League founded 30 December ${LEAGUE_FOUNDED}, Dacca (Muhammadan Educational Conference; host Nawab Salimullah; first President Aga Khan III); Simla Deputation October 1906 (Aga Khan III, Lord Minto); Partition of Bengal 1905 (Curzon), annulled 1911; Indian Councils Act 1909 (separate electorates); MAO College 1875; League aim of self-government 1913; Jinnah joined 1913; Lucknow Pact December ${PACT_YEAR} (Tilak, Jinnah; Congress President A. C. Mazumdar; Congress reunion after Surat 1907)`,
    gate: 'schema, content lint (lintExemplar), deterministic verify, originality pre-check and the editorial counts run clean on this chapter',
  },
});
