// Build ICSE 10 History & Civics ch08 Growth of Nationalism and the Indian National Congress. Run from platform/:
//   npx tsx content/authored/social-science/icse-10-history-civics-ch08/src/build.mjs
import path from 'node:path';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build } from '../../icse-10-history-civics-ch01/src/lib.mjs';

setUnit('icse-10-history-civics-ch08', 'social-science');
const { timelineSvg, factorsSvg, EVENTS, INC_FOUNDED, FIRST_DELEGATES, yearsBetween } = await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- figures
const vRoute1 = flow('LR', ['Drain of wealth', 'Ruin of crafts and peasant distress', 'Lytton\'s measures', 'Ilbert Bill', 'The Press'], 'Route map of Part 1: the drain of wealth, the ruin of crafts and peasant distress, Lord Lytton\'s measures, the Ilbert Bill controversy and the role of the Press', 'Part 1 at a glance');
const vRoute2 = flow('LR', ['Rammohan Roy', 'Jyotiba Phule', 'Dayananda Saraswati', 'Vivekananda', 'Founding of the Congress'], 'Route map of Part 2: four reformers, Raja Rammohan Roy, Jyotiba Phule, Swami Dayananda Saraswati and Swami Vivekananda, and then the founding of the Indian National Congress', 'Part 2 at a glance');
const vFactors = factorsSvg('Hub diagram: the rise of Indian nationalism in the centre, linked to four boxes: economic exploitation (drain, ruined crafts, revenue), repressive policies (Lytton, Press Act, Arms Act), reform movements (self-respect and unity) and the Press (ideas reached many readers)', 'Four streams that fed one national feeling.');
const vDrain = flow('LR', ['Indian revenues and trade', 'Salaries and pensions of British officials', 'Home charges and interest on loans', 'Profits of British firms', 'Wealth reaches Britain without equal return'], 'Flow of the drain of wealth: Indian revenues and trade pay for salaries and pensions of British officials, home charges and interest on loans, and profits of British firms, so wealth reaches Britain without an equal return', 'The drain, as the early nationalists described it.');
const vCrafts = table(['Change', 'Effect on Indian artisans'], [
  ['Cheap machine-made British cloth enters India', 'Local weavers cannot match the price'],
  ['Indian goods face high duties in Britain', 'Export markets are lost'],
  ['Courts and nobles who bought fine crafts decline', 'Home demand for luxury goods falls'],
  ['Artisans move to farming as labourers', 'More pressure on land and more poverty'],
], 'Table of changes and their effects on artisans: cheap British machine cloth undercuts weavers, Indian goods face high duties in Britain, old patrons decline, and artisans move to farm labour, adding pressure on land', 'Imagined classroom summary of a well-known trend.');
const vRevenue = flow('TB', ['Heavy land-revenue demand', 'Payment due even in bad seasons', 'Loans from moneylenders at high interest', 'Loss of land and poverty', 'Famine relief seen as too little'], 'Flow of peasant distress: heavy land revenue due even in bad seasons leads to loans at high interest, loss of land and poverty, and famine relief is seen as too little', 'Why villages grew restless.');
const vLytton = table(['Measure (Lord Lytton, 1876–80)', 'Year', 'Why Indians resented it'], [
  ['Delhi Durbar to proclaim the Queen Empress of India', '1877', 'Lavish spending during a severe famine'],
  ['Vernacular Press Act', '1878', 'Curbed Indian-language papers; English papers left free'],
  ['Arms Act', '1878', 'Licence needed by Indians; Europeans exempt'],
], 'Table of Lord Lytton\'s measures: the Delhi Durbar of 1877 during a famine, the Vernacular Press Act of 1878 that curbed Indian-language papers only, and the Arms Act of 1878 that required Indians but not Europeans to hold licences');
const vIlbert = flow('TB', ['1883: Bill lets Indian judges try Europeans', 'Europeans in India protest loudly', 'Government gives way and dilutes the Bill', 'Indians see racial prejudice', 'Indians learn the value of organised protest'], 'Flow of the Ilbert Bill controversy: in 1883 a Bill to let Indian judges try Europeans meets loud European protest, the government dilutes it, and Indians see racial prejudice and learn the value of organised protest', 'Under Lord Ripon, 1883.');
const vSort = table(['Imagined grievance in a district', 'Kind of cause'], [
  ['A weaver\'s looms stand idle because mill cloth is cheaper', 'Economic'],
  ['A teacher must apply for a licence to keep a gun his European neighbour keeps freely', 'Repressive (Arms Act)'],
  ['A Marathi weekly is warned for criticising famine relief', 'Repressive (Press Act)'],
  ['A farmer borrows to pay revenue after a failed monsoon', 'Economic'],
], 'Worked example table sorting four imagined grievances: idle looms and a farmer borrowing for revenue are economic; a licence for a gun and a warned Marathi weekly are repressive measures', 'Ask: is the cause about money and livelihood, or about a law that treats Indians unequally?');
const vPress = table(['Newspaper', 'Language', 'Linked with'], [
  ['Amrita Bazar Patrika', 'Bengali, then English (1878)', 'Calcutta'],
  ['The Hindu', 'English', 'Madras (founded 1878)'],
  ['Kesari', 'Marathi', 'Bal Gangadhar Tilak'],
  ['The Bengalee', 'English', 'Surendranath Banerjee'],
], 'Table of four nationalist newspapers: Amrita Bazar Patrika of Calcutta, Bengali and then English from 1878; The Hindu of Madras, founded in 1878; Kesari in Marathi linked with Tilak; and The Bengalee linked with Surendranath Banerjee');
const vPressRole = flow('LR', ['Report events and policies', 'Criticise unjust measures', 'Carry leaders\' ideas', 'Link readers across regions', 'Shared national opinion'], 'Flow of the Press\'s role: reporting events, criticising unjust measures, carrying leaders\' ideas and linking readers across regions build a shared national opinion', 'How newspapers built opinion.');
const vSum1 = flow('TB', ['Drain and ruin of crafts', 'Peasant debt and famine', 'Lytton\'s Durbar, Press Act and Arms Act', 'Ilbert Bill: lesson of organised protest', 'Press spreads the message'], 'Summary flow of Part 1: the drain and ruin of crafts, peasant debt and famine, Lytton\'s Durbar, Press Act and Arms Act, the Ilbert Bill as a lesson in organised protest, and the Press spreading the message', 'Part 1 in five lines.');
const vReformers = table(['Reformer', 'Organisation and year', 'Main work'], [
  ['Raja Rammohan Roy', 'Brahmo Samaj, 1828', 'Against sati (banned 1829); modern education; women\'s rights'],
  ['Jyotiba Phule', 'Satyashodhak Samaj, 1873', 'Education of girls and lower castes; against caste discrimination'],
  ['Swami Dayananda Saraswati', 'Arya Samaj, 1875', 'Return to the Vedas; against caste by birth and child marriage'],
  ['Swami Vivekananda', 'Ramakrishna Mission, 1897', 'Chicago address 1893; service to the poor; self-confidence'],
], 'Table of four reformers: Raja Rammohan Roy, Brahmo Samaj 1828, against sati; Jyotiba Phule, Satyashodhak Samaj 1873, education and against caste discrimination; Swami Dayananda Saraswati, Arya Samaj 1875, return to the Vedas; Swami Vivekananda, Ramakrishna Mission 1897, Chicago 1893 and service');
const vTimeline = timelineSvg('Timeline from 1825 to 1900 marking: 1828 Brahmo Samaj, 1873 Satyashodhak Samaj, 1875 Arya Samaj, 1877 Delhi Durbar, 1878 Vernacular Press Act, 1883 Ilbert Bill, 1885 Indian National Congress, 1893 Chicago address and 1897 Ramakrishna Mission', 'Schematic timeline; label positions are for legibility only.');
const vReformLink = flow('TB', ['Attack on social evils', 'Pride in Indian heritage', 'Spread of education and reason', 'Self-respect for women and the oppressed', 'Readiness for a national movement'], 'Flow of how reform fed nationalism: attacks on social evils, pride in heritage, spread of education and reason, and self-respect for women and the oppressed led to readiness for a national movement', 'From social reform to national feeling.');
const vMatch = table(['Imagined description in a quiz', 'Reformer'], [
  ['Opened a girls\' school in Pune with his wife', 'Jyotiba Phule'],
  ['Campaigned until the burning of widows was banned', 'Raja Rammohan Roy'],
  ['Spoke at a world gathering of religions in 1893', 'Swami Vivekananda'],
  ['Asked Hindus to go back to the Vedas', 'Swami Dayananda Saraswati'],
], 'Worked example table matching imagined quiz descriptions to reformers: girls\' school in Pune, Phule; campaign against burning of widows, Roy; world gathering of religions in 1893, Vivekananda; return to the Vedas, Dayananda', 'Look for the one clue that belongs to only one reformer.');
const vInc = table(['Point', 'Fact'], [
  ['Date', `28 December ${INC_FOUNDED}`],
  ['Place', 'Gokuldas Tejpal Sanskrit College, Bombay (moved from Poona)'],
  ['Founder', 'A. O. Hume, a retired Indian Civil Service officer'],
  ['First session President', `W. C. Bonnerjee; ${FIRST_DELEGATES} delegates`],
  ['Second session', 'Calcutta, 1886; President Dadabhai Naoroji'],
], `Table of facts about the Congress: founded on 28 December ${INC_FOUNDED} at the Gokuldas Tejpal Sanskrit College, Bombay, moved from Poona; founder A. O. Hume; first session presided over by W. C. Bonnerjee with ${FIRST_DELEGATES} delegates; second session in Calcutta in 1886 under Dadabhai Naoroji`);
const vObjectives = flow('TB', ['A common platform for nationalists', 'Unity across region, religion and caste', 'Framing demands for the government', 'Training public opinion'], 'Flow of the immediate objectives of the Congress: a common platform for nationalists, unity across region, religion and caste, framing demands for the government, and training public opinion', 'Immediate objectives, 1885.');
const vSafety = table(['View of the Congress\'s origin', 'Main argument'], [
  ['Safety-valve view', 'Hume wanted a peaceful outlet for growing discontent'],
  ['Indian-initiative view', 'Indian leaders, already organising, used Hume\'s help to gain a national platform'],
], 'Table of two views of the Congress\'s origin: the safety-valve view that Hume wanted a peaceful outlet for discontent, and the view that Indian leaders who were already organising used Hume\'s help to win a national platform', 'Two interpretations; give both sides.');
const vBefore = flow('LR', ['Regional associations (e.g. Indian Association, 1876)', 'Common grievances of the 1870s', 'Lesson of the Ilbert Bill', `All-India body, ${INC_FOUNDED}`], `Flow of the road to the Congress: regional associations such as the Indian Association of 1876, common grievances of the 1870s and the lesson of the Ilbert Bill led to an all-India body in ${INC_FOUNDED}`, 'Why 1885?');
const vSum2 = flow('TB', ['Roy, Phule, Dayananda and Vivekananda reform society', 'Pride, unity and education grow', `Congress founded, Bombay, ${INC_FOUNDED}`, 'Sessions under Bonnerjee (1885) and Naoroji (1886)'], `Summary flow of Part 2: four reformers reform society, pride, unity and education grow, the Congress is founded in Bombay in ${INC_FOUNDED}, and its first sessions are under Bonnerjee in 1885 and Naoroji in 1886`, 'Part 2 in four lines.');
assert.equal(yearsBetween(1828, INC_FOUNDED), 57);
assert.ok(EVENTS.some(([y]) => y === INC_FOUNDED));

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Growth of Nationalism — Part 1: Exploitation, Repression and the Press',
  goals: [
    'Explain how the drain of wealth, the ruin of crafts and peasant distress fed nationalism',
    'Describe the Vernacular Press Act, the Arms Act and the Ilbert Bill controversy',
    'Explain how the Press spread political awareness',
  ],
  slides: [
    sl('title', 'Why did Indians begin to feel like one nation?', {
      b: 'Part 1 — **economic exploitation**, **repressive policies** and the **Press**.',
      v: vRoute1,
      n: 'In the second half of the nineteenth century, people in Bengal, Bombay, Madras and Punjab began to think of themselves as Indians with common interests. Why? In this part we look at three streams: economic hardship under colonial rule, laws that treated Indians unequally, and newspapers that carried these grievances to readers across the country.',
    }),
    sl('diagram', 'Four streams, one feeling', {
      b: 'Exploitation, repression, reform and the Press all fed **national feeling**.',
      v: vFactors,
      n: 'This hub diagram shows four streams that flowed into Indian nationalism. Economic exploitation and repressive policies created grievances. Reform movements gave Indians self-respect and unity. The Press carried ideas to readers everywhere. In this part we study exploitation, repression and the Press; reform comes in Part 2.',
    }),
    sl('diagram', 'The drain of wealth', {
      b: 'Wealth flowed to **Britain** without an equal return, as **Dadabhai Naoroji** argued.',
      v: vDrain,
      n: 'Early nationalists, led by Dadabhai Naoroji, argued that India\'s wealth was being drained to Britain. Salaries and pensions of British officials, charges paid in London, interest on loans and the profits of British firms all left the country. Nothing equal came back. This argument turned poverty from a matter of fate into a criticism of colonial rule.',
    }),
    sl('check', 'Quick check: a viceroy\'s years', {
      b: 'When was Lord Lytton Viceroy of India?',
      chk: 'm_lytton_years',
      n: 'Several measures in this chapter belong to one viceroy. Can you place his years in office?',
    }),
    sl('diagram', 'Ruin of handicrafts', {
      b: 'Cheap **machine-made** goods and one-sided duties destroyed **artisan** livelihoods.',
      v: vCrafts,
      n: 'India had been famous for fine cloth. In the nineteenth century, cheap machine-made cloth from British factories entered Indian markets, while Indian goods faced high duties in Britain. Old patrons such as royal courts declined. Many weavers and other artisans lost their work and became farm labourers. Nationalists pointed to this as proof that colonial rule served British interests.',
    }),
    sl('diagram', 'Peasants and famines', {
      b: 'Heavy **land revenue**, **debt** and slow **famine relief**.',
      v: vRevenue,
      n: 'Peasants paid a heavy land revenue, and it fell due even when the rains failed. To pay it, many borrowed from moneylenders at high interest and slowly lost their land. During the great famine of eighteen seventy-six to seventy-eight, relief was widely seen as too little and too late. Rural distress became one more grievance against the government.',
    }),
    sl('example', 'Worked example 1: sorting grievances', {
      b: 'Is each imagined grievance **economic** or caused by a **repressive law**?',
      bl: ['Step 1: does it concern **livelihood, money or land**? Economic.', 'Step 2: does a **law** treat Indians **unequally** or silence them? Repressive.', 'Step 3: name the law where you can.'],
      v: vSort,
      n: 'Let us sort four imagined grievances. A weaver whose looms stand idle because mill cloth is cheaper has an economic grievance. A farmer who borrows to pay revenue after a failed monsoon also has an economic one. A teacher who needs a licence for a gun that his European neighbour keeps freely faces the Arms Act. A Marathi weekly warned for criticising famine relief faces the Press Act.',
    }),
    sl('diagram', 'Lord Lytton\'s measures', {
      b: 'The **Durbar (1877)**, the **Vernacular Press Act (1878)** and the **Arms Act (1878)**.',
      v: vLytton,
      n: 'Lord Lytton was Viceroy from eighteen seventy-six to eighteen eighty. In eighteen seventy-seven he held a grand Durbar in Delhi to proclaim Queen Victoria Empress of India, while millions suffered in a famine. In eighteen seventy-eight came the Vernacular Press Act, which curbed newspapers in Indian languages, and the Arms Act, which required Indians but not Europeans to hold licences for arms.',
    }),
    sl('check', 'Quick check: who introduced the Bill?', {
      b: 'True or false: the Ilbert Bill was introduced under Lord Ripon.',
      chk: 'tf_ilbert_ripon',
      n: 'Lytton was followed by a different viceroy. Was the Ilbert Bill introduced in his time?',
    }),
    sl('diagram', 'The Ilbert Bill controversy, 1883', {
      b: 'A Bill to let **Indian judges** try **Europeans** met fierce European protest.',
      v: vIlbert,
      n: 'Under Lord Ripon, the Ilbert Bill of eighteen eighty-three proposed that qualified Indian judges could try Europeans in criminal cases. Many Europeans in India protested loudly, and the government gave way and diluted the Bill. Indians saw the racial prejudice behind the protest. They also learnt that organised, united agitation could change government policy, a lesson they soon applied themselves.',
    }),
    sl('two-column', 'Why these measures mattered', {
      cols: ['**What Indians felt**\n\n- Racial **inequality** in law\n- Their **voice** being silenced\n- **Indifference** to famine', '**What Indians learnt**\n\n- Grievances were **common** to all regions\n- **Organised protest** could work\n- An **all-India body** was needed'],
      v: vLytton,
      n: 'Look at these measures in two ways. Indians felt that the law treated them as unequal, that their newspapers were being silenced and that their suffering in famine was ignored. They also learnt something. These grievances were shared across every region, and the Ilbert Bill showed that organised protest could succeed. Both feelings pointed towards a national organisation.',
    }),
    sl('diagram', 'The nationalist Press', {
      b: 'Newspapers in **English** and **Indian languages** carried news and criticism far and wide.',
      v: vPress,
      n: 'The second half of the nineteenth century saw a growth of nationalist newspapers. Amrita Bazar Patrika of Calcutta, The Hindu of Madras, Kesari in Marathi linked with Bal Gangadhar Tilak, and The Bengalee of Surendranath Banerjee are four examples. They reported government policies, criticised injustice and published the views of Indian leaders.',
    }),
    sl('check', 'Quick check: why Indian languages?', {
      b: 'Why did newspapers in Indian languages matter so much?',
      chk: 'm_press_language',
      n: 'Only a small number of Indians could read English. What did Indian-language papers add?',
    }),
    sl('diagram', 'How the Press built opinion', {
      b: 'Report, **criticise**, carry ideas, **link regions**.',
      v: vPressRole,
      n: 'The Press worked in several ways at once. It reported events and policies. It criticised measures such as the Press Act and the Durbar. It carried the speeches and writings of leaders to people who never met them. Most important, a reader in Madras could learn about a grievance in Punjab, so people began to see their problems as shared.',
    }),
    sl('example', 'Worked example 2: a 10-mark answer in three parts', {
      b: 'Plan for: Press Act **[3]**, Arms Act **[3]**, Ilbert Bill and nationalism **[4]**.',
      bl: ['Part (i): what the Act did **plus** why Indians objected: three clear points.', 'Part (ii): the rule, who was exempt, the effect on opinion.', 'Part (iii): the proposal, the protest, the outcome, and **two** lessons for nationalism.', 'Use the dates **1878** and **1883**, and name **Lytton** and **Ripon**.'],
      v: vIlbert,
      n: 'Here is how to plan a ten-mark question on repressive measures. Give three clear points for the Press Act: what it did, whom it spared and why Indians objected. Do the same for the Arms Act. For the four-mark part on the Ilbert Bill, state the proposal, the European protest, the outcome, and two lessons Indians drew. Dates and the names of viceroys earn easy marks.',
    }),
    sl('check', 'Quick check: escaping the Act', {
      b: 'True or false: an English-language Indian paper in 1879 was outside the Vernacular Press Act.',
      chk: 'tf_press_english',
      n: 'Think about which newspapers the Press Act covered. Was an English paper among them?',
    }),
    sl('summary', 'Summary of Part 1', {
      bl: ['**Drain of wealth** (Naoroji), **ruin of crafts**, **peasant debt** and **famine**.', '**Lytton:** Durbar 1877, Vernacular Press Act 1878, Arms Act 1878.', '**Ilbert Bill 1883** (Ripon): racial prejudice exposed; lesson of organised protest.', '**Press:** Amrita Bazar Patrika, The Hindu, Kesari, The Bengalee spread awareness.'],
      v: vSum1,
      n: 'To sum up Part 1. The drain of wealth, the ruin of crafts and peasant distress made Indians question colonial rule. Lord Lytton\'s Durbar, Press Act and Arms Act added a sense of humiliation. The Ilbert Bill exposed racial prejudice and showed the power of organised protest. And the Press carried all of this to readers across India.',
    }),
    sl('exam-tips', 'Exam tips for Part 1', {
      bl: [
        'Write **1878** for both the Press Act and the Arms Act; the Durbar was **1877**.',
        'The Press Act hit **Indian-language** papers only; say so.',
        'The Ilbert Bill: **1883**, **Ripon**, Indian judges trying **Europeans**.',
        'For "factors of nationalism", link each factor to **how** it changed Indian feeling.',
      ],
      n: 'Some tips. Remember eighteen seventy-eight for both Acts and eighteen seventy-seven for the Durbar. Say clearly that the Press Act targeted Indian-language newspapers. For the Ilbert Bill, write eighteen eighty-three, Lord Ripon, and Indian judges trying Europeans. And when you list factors of nationalism, always explain how each one changed what Indians felt.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Growth of Nationalism — Part 2: Reform Movements and the Founding of the Congress',
  goals: [
    'State two contributions each of Raja Rammohan Roy, Jyotiba Phule, Swami Dayananda Saraswati and Swami Vivekananda',
    'Explain how reform movements built self-confidence and national consciousness',
    'State the year, founder, objectives and first two sessions of the Indian National Congress',
  ],
  slides: [
    sl('title', 'From reform to an all-India organisation', {
      b: 'Part 2 — four **reformers** and the founding of the **Indian National Congress**.',
      v: vRoute2,
      n: 'Political grievances were only half the story. Reformers were also changing how Indians saw themselves. In this part we meet four of them, Raja Rammohan Roy, Jyotiba Phule, Swami Dayananda Saraswati and Swami Vivekananda, and then see how, in eighteen eighty-five, nationalists from all over India came together in the Indian National Congress.',
    }),
    sl('diagram', 'Four reformers at a glance', {
      b: 'Each founded an organisation and attacked a different weakness of society.',
      v: vReformers,
      n: 'Here are the four reformers. Raja Rammohan Roy founded the Brahmo Samaj in eighteen twenty-eight and fought against sati. Jyotiba Phule founded the Satyashodhak Samaj in eighteen seventy-three and worked for girls and the lower castes. Swami Dayananda Saraswati founded the Arya Samaj in eighteen seventy-five. Swami Vivekananda founded the Ramakrishna Mission in eighteen ninety-seven.',
    }),
    sl('two-column', 'Roy and Phule', {
      cols: ['**Raja Rammohan Roy**\n\n- **Brahmo Samaj**, 1828\n- Campaign against **sati**; banned in **1829**\n- **Modern education**; rights of **women**', '**Jyotiba Phule**\n\n- **Satyashodhak Samaj**, 1873\n- **Girls\' school** in Pune with Savitribai Phule\n- Against **caste discrimination**'],
      v: vReformers,
      n: 'Raja Rammohan Roy, in Bengal, founded the Brahmo Samaj and campaigned until sati was declared illegal in eighteen twenty-nine. He also supported modern education and the rights of women. Jyotiba Phule, in Maharashtra, opened a school for girls in Pune with his wife Savitribai, and founded the Satyashodhak Samaj to fight discrimination against the lower castes.',
    }),
    sl('check', 'Quick check: name the society', {
      b: 'Jyotiba Phule founded the ___ Samaj in 1873.',
      chk: 'fb_satyashodhak',
      n: 'Phule\'s society had a name meaning seekers of truth. Can you write it?',
    }),
    sl('two-column', 'Dayananda and Vivekananda', {
      cols: ['**Swami Dayananda Saraswati**\n\n- **Arya Samaj**, 1875\n- Return to the **Vedas**\n- Against **caste by birth**, **child marriage**; education', '**Swami Vivekananda**\n\n- **Chicago**, 1893\n- **Ramakrishna Mission**, 1897\n- **Service** to the poor; **self-confidence**'],
      v: vTimeline,
      n: 'Swami Dayananda Saraswati founded the Arya Samaj in eighteen seventy-five. He asked Hindus to return to the Vedas and opposed caste by birth and child marriage. Swami Vivekananda won respect for Indian thought at Chicago in eighteen ninety-three and founded the Ramakrishna Mission in eighteen ninety-seven, teaching that service to people is service to God.',
    }),
    sl('example', 'Worked example 3: which reformer?', {
      b: 'Find the **one clue** that belongs to only one reformer.',
      bl: ['Girls\' school in Pune: **Phule**.', 'Banning of sati: **Roy**.', 'Chicago 1893: **Vivekananda**.', 'Back to the Vedas: **Dayananda**.'],
      v: vMatch,
      n: 'In quizzes, each reformer has a clue that belongs to him alone. A girls\' school in Pune with his wife points to Jyotiba Phule. A campaign that ended with sati being banned points to Raja Rammohan Roy. A speech at a world gathering of religions in eighteen ninety-three points to Vivekananda. A call to go back to the Vedas points to Dayananda.',
    }),
    sl('diagram', 'From reform to national feeling', {
      b: 'Reform built **unity**, **pride**, **reason** and **self-respect**.',
      v: vReformLink,
      n: 'How did religious and social reform help nationalism? Attacks on evils such as sati and caste discrimination made society more just and united. Pride in Indian heritage answered claims that Indians were inferior. Education spread a spirit of reason. And women and the oppressed gained self-respect. A people with confidence in itself was ready to ask for its rights.',
    }),
    sl('check', 'Quick check: which society?', {
      b: 'Schools, no caste by birth, study of the Vedas: which organisation?',
      chk: 'm_reform_pick',
      n: 'An imagined society opens schools, rejects caste by birth and studies the Vedas. Which real organisation does it resemble?',
    }),
    sl('diagram', 'The road to 1885', {
      b: 'Regional bodies, **common grievances** and the **Ilbert Bill** lesson.',
      v: vBefore,
      n: 'By the eighteen eighties, Indians already had regional political associations, such as the Indian Association of Calcutta, founded in eighteen seventy-six. Grievances such as the Press Act and the Arms Act were shared everywhere, and the Ilbert Bill showed that organised protest worked. What was missing was one body for the whole country.',
    }),
    sl('diagram', 'The founding of the Congress', {
      b: `**28 December ${INC_FOUNDED}**, Bombay; founder **A. O. Hume**.`,
      v: vInc,
      n: 'The Indian National Congress held its first session on the twenty-eighth of December eighteen eighty-five, at the Gokuldas Tejpal Sanskrit College in Bombay. It had been planned for Poona but was moved because of disease there. The moving spirit was Allan Octavian Hume, who had retired from the civil service. W. C. Bonnerjee presided, and seventy-two delegates attended.',
    }),
    sl('check', 'Quick check: a change of city', {
      b: 'True or false: the first session was planned for Poona but held in Bombay.',
      chk: 'tf_inc_poona',
      n: 'The first session met in Bombay. Was that the original plan?',
    }),
    sl('diagram', 'Immediate objectives', {
      b: 'A **common platform**, **unity**, **demands** and **public opinion**.',
      v: vObjectives,
      n: 'What did the early Congress set out to do? It wanted to give nationalists from every region a common platform, to build unity across region, religion and caste, to frame demands and place them before the government, and to train public opinion. Its methods were peaceful: meetings, resolutions and petitions.',
    }),
    sl('example', 'Worked example 4: the first two sessions', {
      b: 'Learn them as a pair: **1885 Bombay, Bonnerjee**; **1886 Calcutta, Naoroji**.',
      bl: [`First session: Bombay, ${INC_FOUNDED}, **W. C. Bonnerjee**, ${FIRST_DELEGATES} delegates.`, 'Second session: Calcutta, 1886, **Dadabhai Naoroji**.', 'Tip: B for Bombay and Bonnerjee.'],
      v: vInc,
      n: 'Examiners often ask for the first two sessions and their Presidents. Learn them as a pair. The first session met in Bombay in eighteen eighty-five under W. C. Bonnerjee, with seventy-two delegates. The second met in Calcutta in eighteen eighty-six under Dadabhai Naoroji. A simple memory aid: B for Bombay and B for Bonnerjee.',
    }),
    sl('diagram', 'Why did Hume help? Two views', {
      b: 'The **safety-valve** view and the **Indian-initiative** view.',
      v: vSafety,
      n: 'Historians have discussed why Hume helped found the Congress. One view, called the safety-valve theory, says he wanted a peaceful outlet for growing discontent. Another view stresses that Indian leaders were already organising and used Hume\'s help to gain a national platform that the government would tolerate. A good answer presents both views fairly.',
    }),
    sl('check', 'Quick check: a turning point', {
      b: 'Why is the founding of the Congress a turning point?',
      chk: 'm_inc_platform',
      n: 'Before eighteen eighty-five, political bodies were regional. What changed with the Congress?',
    }),
    sl('summary', 'Summary of Part 2', {
      bl: ['**Roy** (Brahmo Samaj 1828), **Phule** (Satyashodhak Samaj 1873), **Dayananda** (Arya Samaj 1875), **Vivekananda** (Ramakrishna Mission 1897).', 'Reform built **unity, pride, reason** and **self-respect**.', `**Congress:** 28 December ${INC_FOUNDED}, Bombay; **A. O. Hume**; **Bonnerjee** (1885), **Naoroji** (1886).`, 'Objectives: platform, unity, demands, public opinion.'],
      v: vSum2,
      n: 'To sum up Part 2. Four reformers, Roy, Phule, Dayananda and Vivekananda, changed how Indians saw themselves and built unity, pride and self-respect. In eighteen eighty-five, the Indian National Congress gave nationalists one all-India platform. A. O. Hume took the lead, W. C. Bonnerjee presided over the first session in Bombay, and Dadabhai Naoroji over the second in Calcutta.',
    }),
    sl('exam-tips', 'Exam tips for Part 2', {
      bl: [
        'Give **two** contributions for each reformer, with the **organisation and year**.',
        'Do not mix up the **Brahmo Samaj** (Roy) and the **Arya Samaj** (Dayananda).',
        `Congress: **${INC_FOUNDED}**, **Bombay**, **Hume**; Presidents **Bonnerjee** then **Naoroji**.`,
        'For the safety-valve theory, give **both** views; do not present one as fact.',
      ],
      n: 'Some tips. For each reformer, give two contributions along with the organisation and its year. Keep the Brahmo Samaj and the Arya Samaj apart. For the Congress, remember eighteen eighty-five, Bombay and Hume, and the Presidents Bonnerjee and then Naoroji. And when you discuss the safety-valve theory, present both views rather than one as settled fact.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Growth of Nationalism and the Indian National Congress — notes',
  sections: [
    {
      h: '1. Economic exploitation',
      t: 1,
      b: '- **Drain of wealth:** salaries and pensions of British officials, home charges, interest on loans and profits of British firms left India without equal return; argued in detail by **Dadabhai Naoroji** (*Poverty and Un-British Rule in India*).\n- **Ruin of handicrafts:** cheap machine-made British goods and high duties on Indian goods in Britain destroyed artisan livelihoods.\n- **Peasants:** heavy **land revenue**, **debt** to moneylenders, loss of land; famines such as **1876–78** with inadequate relief.',
      terms: [['Drain of wealth', 'The flow of India\'s wealth to Britain without an equal return, as described by early nationalists.'], ['Home charges', 'Payments made in Britain from Indian revenues for the administration of India.']],
      v: vDrain,
      vs: [vCrafts, vRevenue],
    },
    {
      h: '2. Repressive and insensitive policies',
      t: 1,
      b: '- **Lord Lytton** (Viceroy 1876–80): **Delhi Durbar, 1877**, to proclaim Queen Victoria Empress of India, held during a famine.\n- **Vernacular Press Act, 1878:** curbed **Indian-language** newspapers; English papers exempt. Repealed by **Lord Ripon** in **1882**.\n- **Arms Act, 1878:** Indians needed a **licence** to keep arms; Europeans **exempt**.\n- **Ilbert Bill, 1883** (Ripon): would let Indian judges try Europeans in criminal cases; European protest forced a compromise; Indians saw **racial prejudice** and the power of **organised agitation**.',
      terms: [['Vernacular', 'In an Indian language rather than English.'], ['Ilbert Bill', 'A Bill of 1883 to let Indian judges try European offenders; diluted after European protest.']],
      v: vLytton,
      vs: [vIlbert, vSort],
    },
    {
      h: '3. Socio-religious reform movements',
      t: 2,
      b: '- **Raja Rammohan Roy:** **Brahmo Samaj (1828)**; campaign against **sati** (banned **1829** under Lord William Bentinck); supported **modern education** and **women\'s rights**.\n- **Jyotiba Phule:** **Satyashodhak Samaj (1873)**; with **Savitribai Phule**, a **school for girls** in Pune; fought **caste discrimination**.\n- **Swami Dayananda Saraswati:** **Arya Samaj (1875)**; return to the **Vedas**; against idol worship, **caste by birth** and **child marriage**; education (later DAV schools).\n- **Swami Vivekananda:** disciple of Ramakrishna Paramahansa; **Chicago, 1893**; **Ramakrishna Mission (1897)**; service to the poor; self-confidence.',
      terms: [['Sati', 'The practice of burning a widow on her husband\'s funeral pyre, banned in 1829.'], ['Satyashodhak Samaj', 'Society of Seekers of Truth, founded by Jyotiba Phule in 1873.']],
      v: vReformers,
      vs: [vMatch],
    },
    {
      h: '4. How reform helped nationalism',
      t: 2,
      b: '- Attacked **social evils**, making society more **just and united**.\n- Revived **pride** in Indian heritage and **self-confidence**.\n- Spread **education** and a spirit of **reason and enquiry**.\n- Gave **self-respect** to women and the oppressed, widening participation in public life.',
      terms: [['National consciousness', 'The feeling among people of different regions that they belong to one nation with common interests.']],
      v: vReformLink,
      vs: [vTimeline],
    },
    {
      h: '5. The Press',
      t: 3,
      b: '- Nationalist papers: **Amrita Bazar Patrika** (Calcutta; Bengali, then English from 1878), **The Hindu** (Madras, 1878), **Kesari** (Marathi; **Tilak**), **The Bengalee** (**Surendranath Banerjee**).\n- Roles: reported and **criticised** government policy; spread **political awareness**; carried leaders\' ideas; **linked regions** into a shared opinion.\n- Indian-language papers reached people who did not read English, which is why the Press Act targeted them.',
      terms: [['Public opinion', 'The views shared by many people on public questions, shaped by debate and the Press.']],
      v: vPress,
      vs: [vPressRole],
    },
    {
      h: '6. Foundation of the Indian National Congress',
      t: 4,
      b: `- **Date and place:** 28 December ${INC_FOUNDED}, Gokuldas Tejpal Sanskrit College, **Bombay** (planned for Poona, moved because of disease).\n- **Founder:** **A. O. Hume**, a retired Indian Civil Service officer.\n- **First session:** President **W. C. Bonnerjee**; **${FIRST_DELEGATES} delegates**.\n- **Second session:** **Calcutta, 1886**; President **Dadabhai Naoroji**.\n- **Immediate objectives:** a common platform for nationalists; unity across region, religion and caste; framing demands; training public opinion.\n- **Earlier bodies:** e.g. the **Indian Association (1876)** of Surendranath Banerjee and Ananda Mohan Bose.\n- **Safety-valve theory:** one view that Hume wanted a peaceful outlet for discontent; another view stresses Indian leaders using his help to build a national platform.`,
      terms: [['Safety-valve theory', 'The view that the Congress was meant to let off Indian discontent peacefully; one interpretation among others.']],
      v: vInc,
      vs: [vObjectives, vSafety, vBefore],
    },
  ],
  tips: '**Common mistakes**\n- Giving 1877 for the Press Act (it was 1878; the Durbar was 1877).\n- Saying the Press Act covered English papers.\n- Confusing the Brahmo Samaj (Roy) with the Arya Samaj (Dayananda).\n- Making Naoroji the first Congress President (it was W. C. Bonnerjee; Naoroji presided in 1886).\n- Presenting the safety-valve theory as settled fact.\n\n**How marks are usually awarded**\n- 1-mark items: one correct option or term.\n- 2 marks: two distinct points (for a reformer, two contributions).\n- 10-mark questions in 3 + 3 + 4 parts: one point per mark; the 4-mark part often asks how a factor helped nationalism or for a balanced view.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['Drain of wealth', 'India\'s wealth flowing to Britain without equal return (Naoroji).', 'definition', 1],
  ['Who set out the drain argument?', '**Dadabhai Naoroji**.', 'fact', 1],
  ['Why did handicrafts decline?', 'Cheap British machine goods; high duties on Indian goods in Britain.', 'concept', 1],
  ['Peasant grievances', 'Heavy land revenue, debt, loss of land, poor famine relief.', 'concept', 1],
  ['Delhi Durbar', '**1877**, under Lytton, during a famine.', 'fact', 1],
  ['Vernacular Press Act', '**1878**; curbed Indian-language papers only.', 'fact', 1],
  ['Who repealed the Press Act?', '**Lord Ripon**, **1882**.', 'fact', 1],
  ['Arms Act, 1878', 'Licence for Indians; Europeans exempt.', 'fact', 1],
  ['Ilbert Bill', '**1883**, Ripon: Indian judges to try Europeans; diluted after protest.', 'fact', 1],
  ['Lesson of the Ilbert Bill', 'Organised, united protest can change policy.', 'exam-tip', 1],
  ['Raja Rammohan Roy', '**Brahmo Samaj, 1828**; against sati; modern education.', 'fact', 2],
  ['Sati banned', '**1829**, under Lord William Bentinck.', 'fact', 2],
  ['Jyotiba Phule', '**Satyashodhak Samaj, 1873**; girls\' school in Pune; against caste discrimination.', 'fact', 2],
  ['Swami Dayananda Saraswati', '**Arya Samaj, 1875**; return to the Vedas.', 'fact', 2],
  ['Swami Vivekananda', '**Chicago 1893**; **Ramakrishna Mission 1897**.', 'fact', 2],
  ['How did reform help nationalism?', 'Unity, pride, education and self-respect.', 'concept', 2],
  ['Kesari', 'Marathi paper linked with **Tilak**.', 'fact', 3],
  ['The Bengalee', 'Linked with **Surendranath Banerjee**.', 'fact', 3],
  ['The Hindu', 'English paper of **Madras**, 1878.', 'fact', 3],
  ['Amrita Bazar Patrika', 'Calcutta; switched from Bengali to English in 1878.', 'fact', 3],
  ['Three roles of the Press', 'Criticise policies; spread awareness; link regions.', 'concept', 3],
  ['Congress founded', `**28 December ${INC_FOUNDED}**, Bombay.`, 'fact', 4],
  ['Founder of the Congress', '**A. O. Hume**, retired ICS officer.', 'fact', 4],
  ['First session President', `**W. C. Bonnerjee**; ${FIRST_DELEGATES} delegates.`, 'fact', 4],
  ['Second session', '**Calcutta, 1886**; **Dadabhai Naoroji**.', 'fact', 4],
  ['Venue of the first session', 'Gokuldas Tejpal Sanskrit College, Bombay.', 'fact', 4],
  ['Immediate objectives of the Congress', 'Common platform; unity; framing demands; public opinion.', 'concept', 4],
  ['Safety-valve theory', 'One view: a peaceful outlet for discontent; give the other view too.', 'exam-tip', 4],
  ['Indian Association', '1876, Calcutta; Surendranath Banerjee and Ananda Mohan Bose.', 'fact', 4],
  ['Brahmo Samaj vs Arya Samaj', 'Brahmo: Roy, 1828. Arya: Dayananda, 1875.', 'exam-tip', 2],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'icse-10-history-civics-chapter-test-short',
  title: 'Chapter test (short) — Growth of Nationalism and the Indian National Congress',
  duration: 30,
  sections: [
    { id: 'I', title: 'Part I — Compulsory (10 marks)', instr: 'Attempt all questions. Questions 1–6 carry 1 mark each; questions 7 and 8 carry 2 marks each.', items: ['m_drain_meaning', 'm_vpa', 'm_brahmo', 'm_kesari', 'm_inc_year', 'ar_vpa_discrimination', 's_roy_two', 's_inc_objectives'] },
    { id: 'II', title: 'Part II — Structured question (10 marks)', instr: 'Attempt any ONE of the two questions. Each is in three parts (3 + 3 + 4 marks).', items: [{ attempt: 1, keys: ['l_economic', 'l_inc'] }] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'icse-10-history-civics-chapter-test-long',
  title: 'Chapter test (long) — Growth of Nationalism and the Indian National Congress',
  duration: 60,
  sections: [
    { id: 'I', title: 'Part I — Compulsory (20 marks)', instr: 'Attempt all questions. Questions 1–10 carry 1 mark each; questions 11–15 carry 2 marks each.', items: ['m_crafts', 'm_arms', 'm_ilbert_aim', 'm_sati', 'm_arya', 'm_chicago', 'm_bengalee', 'm_first_president', 'm_inc_objective', 'ar_inc_independence', 's_drain_two', 's_lytton_two', 's_phule_two', 's_press_two', 's_sessions'] },
    { id: 'II', title: 'Part II — Structured questions (20 marks)', instr: 'Attempt any TWO of the three questions. Each is in three parts (3 + 3 + 4 marks).', items: [{ attempt: 2, keys: ['l_repression', 'l_reformers_b', 'l_inc_why'] }] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t04 of icse-10-history-civics-ch08 only (economic exploitation and repressive policies; four reformers; the Press; foundation of the Congress)',
    originality: 'every letter, diary, quiz and scenario is imagined and written by SOYL (labelled); no textbook text or exercise and no specimen or board-paper item reused (D-036); no historical person quoted, ideas paraphrased and attributed',
    data: `event years asserted in date order (${EVENTS.map(([y]) => y).join(', ')}); ${INC_FOUNDED} − 1828 = ${yearsBetween(1828, INC_FOUNDED)}; Press Act 1878 repealed 1882 (${yearsBetween(1878, 1882)} years)`,
    facts: `drain argument (Naoroji); Lytton 1876–80, Durbar 1877, Vernacular Press Act and Arms Act 1878, repeal 1882 (Ripon); Ilbert Bill 1883; Brahmo Samaj 1828, sati banned 1829, Satyashodhak Samaj 1873, Arya Samaj 1875, Chicago 1893, Ramakrishna Mission 1897; The Hindu 1878, Kesari (Tilak), The Bengalee (Banerjee), Amrita Bazar Patrika; Indian Association 1876; Congress 28 December ${INC_FOUNDED}, Bombay, Hume; Bonnerjee (${FIRST_DELEGATES} delegates) and Naoroji (Calcutta, 1886)`,
    gate: 'schema, content lint (lintExemplar), deterministic verify, originality pre-check and the editorial counts run clean on this chapter',
  },
});
