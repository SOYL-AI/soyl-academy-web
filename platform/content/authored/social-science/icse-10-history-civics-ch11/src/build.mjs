// Build ICSE 10 History & Civics ch11 Mahatma Gandhi and the Mass Movements. Run from platform/:
//   npx tsx content/authored/social-science/icse-10-history-civics-ch11/src/build.mjs
// Clauses of the Simon Commission and of the Cripps proposals are removed from the syllabus and appear nowhere.
import path from 'node:path';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build } from '../../icse-10-history-civics-ch01/src/lib.mjs';

setUnit('icse-10-history-civics-ch11', 'social-science');
const { timelineSvg, dandiSvg, EVENTS, DANDI_DAYS, yearsBetween } = await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- figures
const TL_ALT = 'Timeline from 1918 to 1944 marking: 1919 Rowlatt Act and Jallianwala Bagh, 1920 Non-Cooperation begins, 1922 Chauri Chaura and movement suspended, 1928 Simon Commission boycotted, 1929 Lahore and Purna Swaraj, 1930 Dandi March, 1931 Gandhi-Irwin Pact, 1932 movement renewed, 1934 movement withdrawn, 1942 Quit India Resolution';
const vTimeline = timelineSvg(TL_ALT, 'Schematic timeline drawn by SOYL; label positions are for legibility only.');
const vDandi = dandiSvg(`Schematic sketch, not a map: a dashed line from a point labelled Sabarmati Ashram, Ahmedabad, start 12 March 1930, to a point labelled Dandi on the coast, where the salt law was broken on 6 April 1930; a note reads about 385 km on foot in ${DANDI_DAYS} days`, 'The Salt March as a schematic line (not a map, not to scale).');
const vRoute1 = flow('LR', ['Three causes of 1919', 'The programme', 'The movement spreads', 'Chauri Chaura', 'Impact'], 'Route map of Part 1: the three causes of 1919, the programme, the spread of the movement, the Chauri Chaura incident and the impact of Non-Cooperation', 'Part 1 at a glance');
const vRoute2 = flow('LR', ['Simon and Lahore', 'Dandi', 'Programme and impact', 'Pact and London', 'Quit India'], 'Route map of Part 2: the Simon Commission and the Lahore session, the Dandi March, the programme and impact of Civil Disobedience, the Gandhi-Irwin Pact and the London conference, and the Quit India Movement', 'Part 2 at a glance');
const vCauses = table(['Cause', 'Year', 'Why it mattered'], [
  ['Khilafat issue', '1919–20', 'Muslim anger at the treatment of Turkey; chance for joint action'],
  ['Rowlatt Act', 'March 1919', 'Detention without trial; nationwide hartal'],
  ['Jallianwala Bagh', '13 April 1919', 'Firing on an unarmed crowd; loss of faith in British justice'],
], 'Table of three causes of Non-Cooperation: the Khilafat issue of 1919 to 1920, the Rowlatt Act of March 1919 and the Jallianwala Bagh tragedy of 13 April 1919, with why each mattered', 'Three causes, one movement.');
const vRowlatt = flow('TB', ['March 1919: Rowlatt Act passed', 'Detention without trial allowed', 'Gandhiji calls for satyagraha', '6 April 1919: nationwide hartal', 'Protests in Punjab and elsewhere'], 'Flow: in March 1919 the Rowlatt Act is passed, allowing detention without trial; Gandhiji calls for satyagraha; a nationwide hartal is held on 6 April 1919; protests follow in Punjab and elsewhere', 'From a law to a protest.');
const vAmritsar = table(['Point', 'Fact'], [
  ['Date', '13 April 1919 (Baisakhi)'],
  ['Place', 'Jallianwala Bagh, Amritsar'],
  ['Officer in command', 'General Reginald Dyer'],
  ['Government inquiry', 'Hunter Committee'],
  ['A protest', 'Rabindranath Tagore renounced his knighthood'],
], 'Table of facts about Jallianwala Bagh: 13 April 1919, Baisakhi day, at Amritsar; General Reginald Dyer in command; the Hunter Committee inquiry; Rabindranath Tagore renounced his knighthood', 'Estimates of the dead differ widely; we give no single figure.');
const vProgramme = table(['Boycott (negative) items', 'Constructive (positive) items'], [
  ['Surrender of titles and honorary posts', 'National schools and colleges'],
  ['Boycott of government schools and colleges', 'Khadi and the charkha'],
  ['Boycott of law courts', 'Panchayats to settle disputes'],
  ['Boycott of councils and foreign goods', 'Hindu-Muslim unity; removing untouchability'],
], 'Table of the Non-Cooperation programme: boycott items such as surrender of titles, boycott of government schools, law courts, councils and foreign goods; constructive items such as national schools, khadi and the charkha, panchayats, Hindu-Muslim unity and removing untouchability', 'Approved at Calcutta (September 1920), confirmed at Nagpur (December 1920).');
const vSortNcm = table(['Imagined action, 1921', 'Boycott or constructive?'], [
  ['A lawyer closes his practice in the British courts', 'Boycott'],
  ['A town opens a national school', 'Constructive'],
  ['A family burns its foreign cloth', 'Boycott'],
  ['A village sets up a panchayat to settle quarrels', 'Constructive'],
], 'Worked example table sorting four imagined actions of 1921: closing a law practice and burning foreign cloth are boycott items; opening a national school and setting up a panchayat are constructive items', 'Imagined actions written by SOYL. Ask: does it refuse, or does it build?');
const vChauri = flow('TB', ['5 February 1922: violence at Chauri Chaura', 'Police station set on fire; policemen killed', 'Gandhiji: the struggle must stay non-violent', 'Bardoli resolution suspends the movement', 'Some leaders disagree; Swaraj Party formed later'], 'Flow: violence at Chauri Chaura on 5 February 1922, a police station set on fire and policemen killed; Gandhiji holds that the struggle must stay non-violent; the Bardoli resolution suspends the movement; some leaders disagree and later form the Swaraj Party', 'Why the movement stopped.');
const vNcmImpact = table(['Gains', 'Limits'], [
  ['Congress became a mass organisation', 'Swaraj was not won within a year'],
  ['People lost the fear of jail', 'Hindu-Muslim unity faded after the Khilafat issue ended'],
  ['Khadi and national education spread', 'Violence at Chauri Chaura showed the need for discipline'],
], 'Table of the impact of Non-Cooperation: gains such as making the Congress a mass organisation, removing the fear of jail and spreading khadi and national education; limits such as swaraj not won within a year, unity fading after the Khilafat issue, and the lesson of Chauri Chaura', 'Weigh both columns in a 4-mark answer.');
const vPlan = table(['Part', 'Marks', 'What to write'], [
  ['(i) Facts', '3', 'Three separate facts, one per mark'],
  ['(ii) Explanation', '3', 'Cause and effect in three short sentences'],
  ['(iii) Evaluation', '4', 'Two gains, one limit, one judgement'],
], 'Worked example table planning a ten-mark answer in three parts: three separate facts for three marks, a cause-and-effect explanation for three marks, and for four marks two gains, one limit and a judgement', 'Plan before you write.');
const vLahore = table(['Point', 'Fact'], [
  ['Session', 'Lahore, December 1929'],
  ['President', 'Jawaharlal Nehru'],
  ['Goal declared', 'Purna Swaraj (complete independence)'],
  ['Independence Day', '26 January 1930'],
  ['Next step', 'Working Committee authorised to start civil disobedience'],
], 'Table of facts about the Lahore session: December 1929, presided over by Jawaharlal Nehru, declared Purna Swaraj, fixed 26 January 1930 as Independence Day and authorised civil disobedience');
const vCdmProg = flow('TB', ['Make salt from sea water', 'Boycott foreign cloth; picket shops', 'Refuse taxes and land revenue (some areas)', 'Break forest laws (some areas)', 'Resign from government posts'], 'Flow of the Civil Disobedience programme: making salt from sea water, boycotting foreign cloth and picketing shops, refusing taxes in some areas, breaking forest laws in some areas, and resigning from government posts', 'Programme of Civil Disobedience.');
const vCompare = table(['', 'Non-Cooperation', 'Civil Disobedience', 'Quit India'], [
  ['Years', '1920–22', '1930–34', '1942'],
  ['Aim', 'Swaraj', 'Purna Swaraj', 'British to leave at once'],
  ['Main method', 'Withdraw cooperation', 'Break chosen laws', 'Mass struggle, leaders jailed'],
  ['How it ended', 'Suspended after Chauri Chaura', 'Withdrawn in 1934', 'Suppressed; aim met in 1947'],
], 'Table comparing the three movements: Non-Cooperation 1920 to 1922, aim swaraj, method withdrawing cooperation, suspended after Chauri Chaura; Civil Disobedience 1930 to 1934, aim Purna Swaraj, method breaking chosen laws, withdrawn in 1934; Quit India 1942, aim the British leaving at once, a mass struggle with leaders jailed, suppressed but the aim met in 1947', 'Three movements side by side.');
const vPact = table(['The government agreed to', 'The Congress agreed to'], [
  ['Release political prisoners not charged with violence', 'Suspend Civil Disobedience'],
  ['Withdraw its special ordinances', 'Attend the Second Round Table Conference'],
  ['Allow salt-making for personal use near the coast', ''],
], 'Table of the Gandhi-Irwin Pact of 5 March 1931: the government agreed to release political prisoners not charged with violence, withdraw its ordinances and allow salt-making for personal use near the coast; the Congress agreed to suspend Civil Disobedience and attend the Second Round Table Conference', 'Signed 5 March 1931.');
const vRenew = flow('TB', ['1931: Second Round Table Conference, London', 'Talks fail over representation of minorities', 'January 1932: movement renewed', 'Arrests and bans under Lord Willingdon', '1934: movement withdrawn'], 'Flow: the Second Round Table Conference in London in 1931; talks fail over representation of minorities; the movement is renewed in January 1932; arrests and bans follow under Lord Willingdon; the movement is withdrawn in 1934', 'From London to withdrawal.');
const vQuitCauses = table(['Cause', 'What happened'], [
  ['Failure of the Cripps Mission (1942)', 'Its offer did not give real power during the war'],
  ['Japanese threat', 'Japanese forces had reached Burma'],
  ['Wartime hardship', 'Rising prices and shortages'],
], 'Table of three causes of the Quit India Movement: the failure of the Cripps Mission in 1942, the Japanese threat after Japan reached Burma, and wartime hardship of rising prices and shortages', 'The clauses of the Cripps offer are not in the syllabus.');
const vQuitCourse = flow('TB', ['8 August 1942: resolution at Gowalia Tank, Bombay', '9 August: leaders arrested before dawn', 'Strikes and protests spread on their own', 'Underground leaders and a secret radio', 'Parallel governments: Ballia, Tamluk, Satara'], 'Flow of the Quit India Movement: the resolution at Gowalia Tank on 8 August 1942; leaders arrested before dawn on 9 August; strikes and protests spread on their own; underground leaders and a secret radio; parallel governments at Ballia, Tamluk and Satara', 'Course of the movement.');
const vSum1 = flow('TB', ['1919: Khilafat, Rowlatt Act, Jallianwala Bagh', '1920: programme approved (Calcutta, Nagpur)', 'Boycott and constructive work spread', '1922: Chauri Chaura; Bardoli resolution', 'Impact: a mass movement'], 'Summary flow of Part 1: the causes of 1919, the programme approved in 1920 at Calcutta and Nagpur, the spread of boycott and constructive work, Chauri Chaura and the Bardoli resolution in 1922, and the impact as a mass movement', 'Part 1 in five lines.');
const vSum2 = flow('TB', ['1928–29: Simon boycott; Purna Swaraj at Lahore', '1930: Dandi March; Civil Disobedience', '1931: Gandhi-Irwin Pact; London conference', '1932–34: renewal and withdrawal', '1942: Quit India'], 'Summary flow of Part 2: the Simon boycott and Purna Swaraj in 1928 and 1929, the Dandi March and Civil Disobedience in 1930, the Gandhi-Irwin Pact and the London conference in 1931, renewal and withdrawal in 1932 to 1934, and Quit India in 1942', 'Part 2 in five lines.');
assert.equal(DANDI_DAYS, 24);
assert.ok(EVENTS.some(([y]) => y === 1942));
assert.equal(yearsBetween(1930, 1942), 12);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Gandhiji and the Mass Movements — Part 1: Non-Cooperation',
  goals: [
    'Explain how the Khilafat issue, the Rowlatt Act and Jallianwala Bagh led to Non-Cooperation',
    'List the boycott and constructive items of the Non-Cooperation programme',
    'Explain why the movement was suspended after Chauri Chaura and assess its impact',
  ],
  slides: [
    sl('title', 'From protest to a mass movement', {
      b: 'Part 1 — the **causes** of 1919, the **programme**, **Chauri Chaura** and the **impact**.',
      v: vRoute1,
      n: 'In the years after the First World War, the freedom struggle changed its character. Under Gandhiji, millions of ordinary people joined it for the first time. In this part we study three events of nineteen nineteen that led to the Non-Cooperation Movement, the programme of the movement, the incident at Chauri Chaura that ended it, and what it achieved.',
    }),
    sl('diagram', 'The road from 1919 to 1942', {
      b: 'Three mass movements in **twenty-three years**.',
      v: vTimeline,
      n: 'This timeline shows the whole chapter. Non-Cooperation began in nineteen twenty and was suspended in nineteen twenty-two. Civil Disobedience began with the Dandi March in nineteen thirty and was withdrawn in nineteen thirty-four. The Quit India Resolution came in nineteen forty-two. Keep these three movements and their dates clearly apart.',
    }),
    sl('concept', 'Three causes of Non-Cooperation', {
      b: 'The **Khilafat** issue, the **Rowlatt Act** and **Jallianwala Bagh**.',
      v: vCauses,
      n: 'Three causes came together. Indian Muslims were angered by the treatment of Turkey and its Sultan after the war, which gave rise to the Khilafat Movement. The Rowlatt Act allowed detention without trial. And the firing at Jallianwala Bagh shook the faith of many Indians in British justice.',
    }),
    sl('two-column', 'The Khilafat Movement', {
      cols: ['**The issue**\n\n- After the war, harsh terms for **Turkey**\n- Its **Sultan** was regarded as the **Caliph** by many Muslims\n- Protest led by the **Ali brothers**', '**Why it mattered**\n\n- Gandhiji **supported** it\n- A chance for **Hindu-Muslim unity**\n- Khilafat and swaraj joined in **one programme**'],
      n: 'Many Indian Muslims regarded the Sultan of Turkey as the Caliph, a religious head. When the victorious powers imposed harsh terms on Turkey after the war, the Ali brothers, Muhammad Ali and Shaukat Ali, led a protest. Gandhiji supported them, and for a few years Hindus and Muslims worked together in one movement.',
    }),
    sl('diagram', 'The Rowlatt Act, 1919', {
      b: '**Detention without trial** led to a **nationwide hartal**.',
      v: vRowlatt,
      n: 'In March nineteen nineteen the government passed the Rowlatt Act, which allowed people to be arrested and held in prison without a trial. Indians felt this took away a basic right. Gandhiji called for satyagraha, and on the sixth of April shops and offices across India closed in a hartal.',
    }),
    sl('check', 'Quick check: the commander', {
      b: 'The troops at Jallianwala Bagh were commanded by General ___.',
      chk: 'fb_dyer',
      n: 'Recall the name of the officer who gave the order to fire at Amritsar.',
    }),
    sl('diagram', 'Jallianwala Bagh, 13 April 1919', {
      b: 'An **unarmed crowd** fired upon in an **enclosed** garden at **Amritsar**.',
      v: vAmritsar,
      n: 'On the Baisakhi day of thirteenth April nineteen nineteen, a crowd had gathered in the walled garden of Jallianwala Bagh in Amritsar. Troops under General Dyer entered and fired on them. Hundreds were killed, though the estimates differ widely. Rabindranath Tagore gave up his knighthood in protest, and the Hunter Committee was appointed to inquire.',
    }),
    sl('example', 'Worked example 1: three causes in a 3-mark answer', {
      b: 'Explain how **three events of 1919–20** led to Non-Cooperation.',
      bl: ['Step 1: name **three different** causes.', 'Step 2: give **one detail** for each (a date, a name, a feature).', 'Step 3: link each to the **decision** to stop cooperating.'],
      v: vCauses,
      n: 'Here is how to plan a three-mark answer on the causes. First, choose three different causes: the Khilafat issue, the Rowlatt Act and Jallianwala Bagh. Next, add one detail to each, such as the date of the firing or the feature of the Act. Finally, show how each one pushed Gandhiji towards non-cooperation.',
    }),
    sl('diagram', 'The programme of Non-Cooperation', {
      b: '**Boycott** what is British; **build** what is Indian.',
      v: vProgramme,
      n: 'The Congress approved the programme at a special session in Calcutta in September nineteen twenty and confirmed it at Nagpur in December. The boycott side asked people to give up titles and to leave government schools, courts and councils, and to reject foreign goods. The constructive side built national schools, khadi, panchayats and unity.',
    }),
    sl('check', 'Quick check: build or boycott?', {
      b: 'Which action fits the **constructive** side of the programme?',
      chk: 'm_positive_item',
      n: 'Ask whether each action refuses something British or builds something Indian.',
    }),
    sl('example', 'Worked example 2: sorting actions', {
      b: 'Sort four **imagined** actions of 1921.',
      bl: ['A **boycott** item **refuses** a British institution, title or product.', 'A **constructive** item **builds** an Indian alternative.', 'Write the category **and** the reason.'],
      v: vSortNcm,
      n: 'Let us sort four imagined actions from nineteen twenty-one. A lawyer closing his practice in the British courts and a family burning foreign cloth are refusing something, so they are boycott items. A town opening a national school and a village setting up a panchayat are building something Indian, so they are constructive items.',
    }),
    sl('concept', 'The movement spreads', {
      b: '**Students**, **lawyers**, **peasants** and **workers** joined; **khadi** became a symbol.',
      v: vProgramme,
      n: 'Between nineteen twenty and nineteen twenty-two the movement spread across India. Students left government colleges, some lawyers gave up their practice, and foreign cloth was burnt in public. Peasants and workers took part in many regions. For the first time the freedom struggle reached the villages on a large scale.',
    }),
    sl('diagram', 'Chauri Chaura, February 1922', {
      b: 'Violence at **Chauri Chaura**; the movement is **suspended**.',
      v: vChauri,
      n: 'On the fifth of February nineteen twenty-two, at Chauri Chaura in the Gorakhpur district, a crowd clashed with the police and set fire to the police station, and policemen died. Gandhiji held that the struggle had to remain non-violent, and the Congress Working Committee at Bardoli suspended the movement.',
    }),
    sl('check', 'Quick check: the resolution', {
      b: 'The resolution that suspended the movement is named after which place?',
      chk: 'm_check_bardoli',
      n: 'The violence happened in one place, but the decision was taken in another. Which?',
    }),
    sl('diagram', 'Impact of Non-Cooperation', {
      b: 'A **mass movement**, with **gains** and **limits**.',
      v: vNcmImpact,
      n: 'Although it was suspended, the movement changed Indian politics. The Congress became a mass organisation, people lost their fear of jail, and khadi and national education spread. But swaraj was not won within a year as promised, and the unity of the Khilafat years did not last. Weigh both sides in an answer.',
    }),
    sl('check', 'Quick check: non-violence', {
      b: 'True or false: Non-Cooperation was planned as an armed uprising.',
      chk: 'tf_ncm_violent',
      n: 'Think about why Gandhiji stopped the movement after Chauri Chaura.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSum1,
      n: 'To sum up Part 1. Three causes came together in nineteen nineteen. The programme of boycott and constructive work was approved in nineteen twenty. The movement spread widely until violence at Chauri Chaura led to its suspension in nineteen twenty-two. Its lasting result was a mass national movement.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['Keep the **three causes** separate: Khilafat, Rowlatt, Jallianwala Bagh.', 'Give the dates **13 April 1919** and **5 February 1922** correctly.', 'Sort programme items into **boycott** and **constructive**.', 'In impact answers, give **gains and a limit**.'],
      v: vPlan,
      n: 'A few tips. Keep the three causes separate and give a detail for each. Learn the date of the firing at Amritsar and the date of Chauri Chaura. When asked about the programme, sort the items into boycott and constructive. And when asked about impact, give both gains and at least one limit.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Gandhiji and the Mass Movements — Part 2: Civil Disobedience and Quit India',
  goals: [
    'Explain the causes of Civil Disobedience and the significance of the Dandi March',
    'State the terms of the Gandhi-Irwin Pact and explain why the movement was renewed',
    'Explain the causes and evaluate the significance of the Quit India Movement',
  ],
  slides: [
    sl('title', 'From salt to Quit India', {
      b: 'Part 2 — **Civil Disobedience** (1930–34) and **Quit India** (1942).',
      v: vRoute2,
      n: 'In this part we follow Gandhiji from the boycott of the Simon Commission to the Dandi March, the agreement with Lord Irwin, the conference in London and the renewal of the struggle. Then we turn to the final mass movement, Quit India, launched in nineteen forty-two.',
    }),
    sl('concept', 'The Simon Commission', {
      b: 'An **all-British** commission met with **black flags**.',
      v: vTimeline,
      n: 'In nineteen twenty-seven the government appointed a commission under John Simon to review the working of the reforms. Not one of its members was Indian. When it arrived in nineteen twenty-eight it was met with protests and black flags. Lala Lajpat Rai was injured in a lathi charge at Lahore and died soon after.',
    }),
    sl('diagram', 'Lahore, 1929: Purna Swaraj', {
      b: '**Complete independence** becomes the goal.',
      v: vLahore,
      n: 'At the Lahore session in December nineteen twenty-nine, under Jawaharlal Nehru, the Congress declared complete independence, Purna Swaraj, as its goal. The twenty-sixth of January nineteen thirty was observed as Independence Day, and the Working Committee was authorised to begin civil disobedience.',
    }),
    sl('check', 'Quick check: the goal', {
      b: 'At Lahore the Congress declared ___ as its goal.',
      chk: 'fb_purna',
      n: 'Recall the term for complete independence adopted at Lahore.',
    }),
    sl('diagram', 'The Dandi March, 1930', {
      b: `**Sabarmati** to **Dandi**, about **385 km** in **${DANDI_DAYS} days**.`,
      v: vDandi,
      n: 'On the twelfth of March nineteen thirty, Gandhiji set out from Sabarmati Ashram with a small band of followers. They walked to Dandi on the coast, reaching it in twenty-four days. On the morning of the sixth of April he picked up salt from the shore, breaking the salt law. The sketch is schematic and not to scale.',
    }),
    sl('example', 'Worked example 1: counting the days', {
      b: 'How long was the march from **12 March** to **5 April 1930**?',
      bl: ['Days left in March after the 12th: **19**.', 'Days in April up to the 5th: **5**.', `Total: 19 + 5 = **${DANDI_DAYS} days**; the salt law was broken the next morning.`],
      v: vDandi,
      n: 'Let us check the length of the march. From the twelfth to the end of March is nineteen days. Add five days of April, up to the fifth, and we get twenty-four days. The salt law was broken the next morning, on the sixth of April.',
    }),
    sl('check', 'Quick check: the length of the march', {
      b: 'About how many days did the march to Dandi take?',
      chk: 'm_check_dandi_days',
      n: 'Use the start and arrival dates on the sketch.',
    }),
    sl('diagram', 'Programme of Civil Disobedience', {
      b: 'From **salt** to **boycott**, **taxes** and **forest laws**.',
      v: vCdmProg,
      n: 'After Dandi the movement spread quickly. People made salt from sea water, boycotted foreign cloth and picketed shops selling it and liquor. In some areas peasants refused to pay taxes and land revenue, and forest laws were broken. Some officials resigned from government posts.',
    }),
    sl('two-column', 'Who took part', {
      cols: ['**New participants**\n\n- **Women** made salt and picketed shops\n- **Peasants** refused revenue in some areas\n- **Traders** joined the boycott', '**New regions**\n\n- The **Frontier**: Khudai Khidmatgars under **Khan Abdul Ghaffar Khan**\n- Coastal villages making salt\n- Towns across India'],
      v: vCdmProg,
      n: 'Civil Disobedience drew in people who had stayed out before. Women came out in large numbers to make salt and picket shops. Peasants and traders joined. In the North-West Frontier Province, the Khudai Khidmatgars led by Khan Abdul Ghaffar Khan joined the struggle non-violently.',
    }),
    sl('diagram', 'The Gandhi-Irwin Pact, 1931', {
      b: 'A **truce** signed on **5 March 1931**.',
      v: vPact,
      n: 'In March nineteen thirty-one Gandhiji and the Viceroy, Lord Irwin, reached an agreement. The government agreed to release prisoners not charged with violence, withdraw its special ordinances and allow people near the coast to make salt for their own use. The Congress agreed to suspend the movement and attend the next conference in London.',
    }),
    sl('check', 'Quick check: London', {
      b: 'Who was the only Congress representative at the Second Round Table Conference?',
      chk: 'm_rtc_rep',
      n: 'The Congress sent just one person to London in nineteen thirty-one.',
    }),
    sl('diagram', 'From London to withdrawal', {
      b: '**Failure** in London, **renewal** in 1932, **withdrawal** in 1934.',
      v: vRenew,
      n: 'At the conference in London the talks broke down mainly over the representation of minorities. Gandhiji returned empty-handed in December nineteen thirty-one, and the movement was renewed in January. The new Viceroy, Lord Willingdon, arrested leaders and banned the Congress, and the movement was finally withdrawn in nineteen thirty-four.',
    }),
    sl('example', 'Worked example 2: comparing three movements', {
      b: 'Compare **aim**, **method** and **ending** of the three movements.',
      bl: ['Use **one row per point** of comparison.', 'Fill **every cell** before writing sentences.', 'End with a **judgement**: what did all three share?'],
      v: vCompare,
      n: 'Here is a way to compare the three movements. Make a table with one row for the aim, one for the method and one for how each ended. Fill every cell. Then write your answer from the table, and end with a judgement, such as the mass participation of ordinary people that all three shared.',
    }),
    sl('diagram', 'Causes of Quit India', {
      b: '**Cripps**, **Japan** and **hardship**.',
      v: vQuitCauses,
      n: 'By nineteen forty-two three things had come together. The Cripps Mission had failed to offer real power during the war. Japanese forces had reached Burma, close to India. And the war had brought rising prices and shortages. The clauses of the Cripps offer are not in your syllabus; learn only why its failure mattered.',
    }),
    sl('diagram', 'Course of the Quit India Movement', {
      b: '**Resolution** on 8 August; **arrests** on 9 August; a **spontaneous** upsurge.',
      v: vQuitCourse,
      n: 'On the eighth of August nineteen forty-two the Congress committee passed the Quit India Resolution at Gowalia Tank in Bombay, with the slogan Do or Die. Before dawn the next day the leaders were arrested. Protests then spread on their own, guided by underground leaders and a secret radio, and parallel governments appeared in some places.',
    }),
    sl('check', 'Quick check: the flag', {
      b: 'Who hoisted the flag at Gowalia Tank on 9 August 1942?',
      chk: 'm_aruna',
      n: 'Recall the leader who raised the flag after the arrests.',
    }),
    sl('concept', 'Significance of Quit India', {
      b: 'Freedom became the demand of **every class**.',
      v: vCompare,
      n: 'The government suppressed the movement, but it showed that the desire for freedom had reached ordinary people everywhere, even without their leaders. It made clear that British rule could not last long against such feeling, and India became independent five years later.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSum2,
      n: 'To sum up Part 2. The Simon boycott and the Lahore resolution led to the Dandi March and Civil Disobedience. The Gandhi-Irwin Pact brought a truce, but the London conference failed and the movement was renewed and later withdrawn. In nineteen forty-two, Quit India became the final mass movement.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['Lahore **1929**; Independence Day **26 January 1930**; Dandi **12 March – 6 April 1930**.', 'Gandhi-Irwin Pact **5 March 1931**; Quit India **8 August 1942**.', 'Do not list **clauses** of the Simon Commission or the Cripps offer.', 'Quit India: explain why it continued **without leaders**.'],
      v: vPlan,
      n: 'Some tips for Part 2. Learn the key dates: Lahore, the first Independence Day, the Dandi March, the Pact and the Quit India Resolution. Do not list the clauses of the Simon Commission or the Cripps offer, which are not in your syllabus. And in Quit India answers, explain why the movement continued after the leaders were arrested.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Mahatma Gandhi and the Mass Movements — notes',
  sections: [
    {
      h: '1. Causes of the Non-Cooperation Movement',
      t: 1,
      b: '- **Khilafat Movement (1919–24):** many Indian Muslims protested against the harsh peace terms imposed on **Turkey**, whose **Sultan** they regarded as the **Caliph**. The **Ali brothers** (Muhammad Ali and Shaukat Ali) led it; Gandhiji supported it.\n- **Rowlatt Act (March 1919):** permitted **arrest without warrant** and **imprisonment without trial**. Gandhiji called for **satyagraha**; a nationwide **hartal** was held on **6 April 1919**.\n- **Jallianwala Bagh (13 April 1919):** troops under **General Dyer** opened fire on an unarmed gathering in a walled garden at **Amritsar** on Baisakhi day; hundreds died, with estimates differing widely. The **Hunter Committee** inquired; **Tagore** returned his knighthood.',
      terms: [['Satyagraha', 'Gandhiji\'s method of non-violent resistance based on truth.'], ['Hartal', 'A general closure of shops and work as a protest.']],
      v: vCauses,
      vs: [vRowlatt, vAmritsar],
    },
    {
      h: '2. Programme of the Non-Cooperation Movement',
      t: 1,
      b: '- **Approved:** special session at **Calcutta, September 1920**; confirmed at **Nagpur, December 1920**.\n- **Boycott side:** give up **titles** and honorary posts; leave **government schools and colleges**; boycott **law courts**, the **councils** and **foreign goods**.\n- **Constructive side:** **national schools and colleges**; **khadi** and the **charkha**; **panchayats**; **Hindu-Muslim unity**; work against **untouchability**.',
      terms: [['Khadi', 'Hand-spun, hand-woven cloth, a symbol of self-reliance.']],
      v: vProgramme,
      vs: [vSortNcm],
    },
    {
      h: '3. Suspension and impact of Non-Cooperation',
      t: 2,
      b: '- **Chauri Chaura (5 February 1922),** Gorakhpur district: a crowd burnt the police station and policemen died.\n- Gandhiji insisted on **non-violence**; the **Bardoli** resolution of the Working Committee **suspended** the movement. **C. R. Das** and **Motilal Nehru** later formed the **Swaraj Party** (1923).\n- **Impact:** the Congress turned into a **mass organisation**; fear of the government and of jail declined; **khadi** and **national education** spread. **Limits:** swaraj was not won within a year, and unity faded after the Khilafat issue ended.',
      terms: [['Bardoli resolution', 'The 1922 decision of the Congress Working Committee to suspend Non-Cooperation.']],
      v: vChauri,
      vs: [vNcmImpact],
    },
    {
      h: '4. Causes of Civil Disobedience and the Dandi March',
      t: 3,
      b: `- **Simon Commission:** appointed in **1927**, it had **no Indian member**; it was boycotted on arrival in **1928**. (Its clauses are not in the syllabus.)\n- **Lahore, December 1929:** under **Jawaharlal Nehru**, the Congress adopted **Purna Swaraj**; **26 January 1930** became Independence Day.\n- **Dandi March:** from **Sabarmati Ashram** on **12 March 1930** to **Dandi** (about 385 km, ${DANDI_DAYS} days); the **salt law** was broken on **6 April 1930**.\n- **Programme:** making salt; boycott and **picketing**; **non-payment of taxes** and breaking **forest laws** in some areas; resignations.`,
      terms: [['Purna Swaraj', 'Complete independence, the goal adopted at Lahore in 1929.'], ['Picketing', 'Peacefully standing outside shops to persuade people not to buy certain goods.']],
      v: vDandi,
      vs: [vLahore, vCdmProg],
    },
    {
      h: '5. Gandhi-Irwin Pact, the Round Table Conference and renewal',
      t: 4,
      b: '- **Gandhi-Irwin Pact (5 March 1931):** release of prisoners not charged with violence, withdrawal of ordinances, salt for personal use near the coast; the Congress to suspend the movement and go to London.\n- **Second Round Table Conference (London, 1931):** Gandhiji was the **sole Congress representative**; no agreement on the **representation of minorities**.\n- **Renewal (January 1932):** arrests and bans under **Lord Willingdon**; the movement was **withdrawn in 1934**.\n- **Impact of Civil Disobedience:** wide participation of **women**, peasants and traders; boycott hurt **British trade**; new regions such as the **Frontier** joined.',
      terms: [['Round Table Conference', 'Meetings in London (1930–32) between the British government and Indian representatives on constitutional reform.']],
      v: vPact,
      vs: [vRenew],
    },
    {
      h: '6. The Quit India Movement',
      t: 5,
      b: '- **Causes:** failure of the **Cripps Mission** (1942); the **Japanese** advance to **Burma**; wartime **prices and shortages**. (The clauses of the Cripps offer are not in the syllabus.)\n- **8 August 1942:** the **Quit India Resolution** at **Gowalia Tank, Bombay**; slogan **Do or Die**. **9 August:** leaders arrested.\n- **Course:** spontaneous strikes and protests; **Aruna Asaf Ali** raised the flag at Gowalia Tank; underground leaders and a secret radio; **parallel governments** at Ballia, Tamluk and Satara.\n- **Significance:** freedom became the demand of every class; British rule could not continue long.',
      terms: [['Parallel government', 'A local administration set up by the people in place of the British administration for a time.']],
      v: vQuitCourse,
      vs: [vQuitCauses, vCompare],
    },
  ],
  tips: '**Common mistakes**\n- Mixing up **6 April 1919** (hartal) with **13 April 1919** (Jallianwala Bagh), and **6 April 1930** (Dandi).\n- Calling Non-Cooperation violent: it was meant to be **non-violent**.\n- Listing the **clauses** of the Simon Commission or the Cripps offer, which are not required.\n- Forgetting that the Congress **boycotted** the first Round Table Conference.\n\n**How marks are usually awarded**\n- 1-mark items: one correct option or term.\n- 2 marks: two clear points.\n- 10 marks (3 + 3 + 4): facts for (i), explanation for (ii), and for (iii) a balanced evaluation with a judgement.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['Khilafat Movement', 'Protest (1919–24) by Indian Muslims over the treatment of **Turkey** and its **Sultan-Caliph**; led by the **Ali brothers**.', 'fact', 1],
  ['Rowlatt Act', '**March 1919**; arrest without warrant and **detention without trial**.', 'fact', 1],
  ['Date of the Rowlatt hartal', '**6 April 1919**.', 'fact', 1],
  ['Jallianwala Bagh', '**13 April 1919**, **Amritsar**; troops under **General Dyer** fired on an unarmed crowd.', 'fact', 1],
  ['Government inquiry into the Punjab events', 'The **Hunter Committee**.', 'fact', 1],
  ['Who renounced his knighthood?', '**Rabindranath Tagore**.', 'fact', 1],
  ['NCM programme approved and confirmed', '**Calcutta** (Sept 1920); **Nagpur** (Dec 1920).', 'fact', 1],
  ['Two boycott items', 'Government **schools** and **law courts** (also titles, councils, foreign goods).', 'concept', 1],
  ['Two constructive items', '**National schools** and **khadi** (also panchayats, unity).', 'concept', 1],
  ['Chauri Chaura', '**5 February 1922**, Gorakhpur district; police station burnt.', 'fact', 2],
  ['Why was NCM suspended?', 'Gandhiji insisted on **non-violence**.', 'concept', 2],
  ['Bardoli resolution', 'Working Committee decision suspending the movement (1922).', 'fact', 2],
  ['Swaraj Party', '**C. R. Das** and **Motilal Nehru**, 1923.', 'fact', 2],
  ['Main gain of NCM', 'The Congress became a **mass** movement.', 'concept', 2],
  ['Simon Commission', 'Appointed **1927**; **no Indian member**; boycotted **1928**.', 'fact', 3],
  ['Lahore session, 1929', '**Jawaharlal Nehru**; **Purna Swaraj**.', 'fact', 3],
  ['First Independence Day', '**26 January 1930**.', 'fact', 3],
  ['Dandi March', `**12 March – 6 April 1930**; Sabarmati to Dandi; about ${DANDI_DAYS} days on foot.`, 'fact', 3],
  ['Why salt?', 'Used by **everyone**; the tax touched rich and poor; easy to break **peacefully**.', 'concept', 3],
  ['CDM vs NCM', 'CDM **broke laws**; NCM **withdrew cooperation**.', 'exam-tip', 3],
  ['Khudai Khidmatgars', 'Non-violent body of the Frontier led by **Khan Abdul Ghaffar Khan**.', 'fact', 3],
  ['Gandhi-Irwin Pact', '**5 March 1931**; prisoners released; Congress to attend London talks.', 'fact', 4],
  ['Second Round Table Conference', 'London, **1931**; Gandhiji the **sole** Congress representative.', 'fact', 4],
  ['Why did the London talks fail?', 'No agreement on the **representation of minorities**.', 'concept', 4],
  ['Renewal and end of CDM', 'Renewed **January 1932**; withdrawn **1934**.', 'fact', 4],
  ['Three causes of Quit India', '**Cripps** failure, **Japanese** threat, wartime **hardship**.', 'concept', 5],
  ['Quit India Resolution', '**8 August 1942**, **Gowalia Tank, Bombay**; slogan **Do or Die**.', 'fact', 5],
  ['Flag at Gowalia Tank, 9 August 1942', '**Aruna Asaf Ali**.', 'fact', 5],
  ['Parallel governments', '**Ballia**, **Tamluk**, **Satara**.', 'fact', 5],
  ['Why did Quit India continue after 9 August?', 'It became **spontaneous**, with **underground** leaders.', 'exam-tip', 5],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'icse-10-history-civics-chapter-test-short',
  title: 'Chapter test (short) — Mahatma Gandhi and the Mass Movements',
  duration: 30,
  sections: [
    { id: 'I', title: 'Part I — Compulsory (10 marks)', instr: 'Attempt all questions. Questions 1–6 carry 1 mark each; questions 7 and 8 carry 2 marks each.', items: ['m_khilafat_issue', 'm_jallianwala_date', 'm_suspend_reason', 'm_salt_choice', 'm_quit_place', 'ar_rowlatt', 's_rowlatt_two', 's_dandi_two'] },
    { id: 'II', title: 'Part II — Structured question (10 marks)', instr: 'Attempt any ONE of the two questions. Each is in three parts (3 + 3 + 4 marks).', items: [{ attempt: 1, keys: ['l_ncm_causes', 'l_cdm_causes'] }] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'icse-10-history-civics-chapter-test-long',
  title: 'Chapter test (long) — Mahatma Gandhi and the Mass Movements',
  duration: 60,
  sections: [
    { id: 'I', title: 'Part I — Compulsory (20 marks)', instr: 'Attempt all questions. Questions 1–10 carry 1 mark each; questions 11–15 carry 2 marks each.', items: ['m_rowlatt_feature', 'm_ncm_sessions', 'm_negative_item', 'm_ncm_mass', 'm_simon_boycott', 'm_lahore_president', 'm_pact_term', 'm_rtc_fail', 'm_japan', 'ar_quit', 's_khilafat_two', 's_chauri_why', 's_lahore_two', 's_pact_two', 's_quit_two'] },
    { id: 'II', title: 'Part II — Structured questions (20 marks)', instr: 'Attempt any TWO of the three questions. Each is in three parts (3 + 3 + 4 marks).', items: [{ attempt: 2, keys: ['l_chauri_impact', 'l_pact_rtc', 'l_quit_india'] }] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t05 of icse-10-history-civics-ch11 only (causes and programme of Non-Cooperation; suspension and impact; causes, Dandi and programme of Civil Disobedience; Pact, London conference and renewal; Quit India); clauses of the Simon Commission and the Cripps offer not taught or tested',
    originality: 'every letter, diary and quiz scenario is imagined and written by SOYL (labelled); no textbook text or exercise and no specimen or board-paper item reused (D-036); no historical person quoted (the 1942 slogan is named only); no casualty figure given for Jallianwala Bagh',
    data: `event years asserted in date order (${EVENTS.map(([y]) => y).join(', ')}); Dandi March 12 March to 5 April 1930 = ${DANDI_DAYS} days (computed from dates)`,
    facts: 'Khilafat 1919–24 (Ali brothers); Rowlatt Act March 1919, hartal 6 April 1919; Jallianwala Bagh 13 April 1919 (Dyer; Hunter Committee; Tagore); NCM approved Calcutta Sept 1920, confirmed Nagpur Dec 1920; Chauri Chaura 5 Feb 1922, Bardoli resolution; Swaraj Party 1923 (C. R. Das, Motilal Nehru); Simon Commission 1927/1928; Lahore Dec 1929 (J. Nehru, Purna Swaraj), 26 Jan 1930; Dandi 12 Mar–6 Apr 1930; Khudai Khidmatgars (Khan Abdul Ghaffar Khan); Gandhi-Irwin Pact 5 Mar 1931; 2nd RTC London 1931; renewal Jan 1932 (Willingdon), withdrawal 1934; Cripps 1942; Quit India Resolution 8 Aug 1942 at Gowalia Tank, arrests 9 Aug; Aruna Asaf Ali; parallel governments Ballia, Tamluk, Satara',
    gate: 'schema, content lint (lintExemplar), deterministic verify, originality pre-check and the editorial counts run clean on this chapter',
  },
});
