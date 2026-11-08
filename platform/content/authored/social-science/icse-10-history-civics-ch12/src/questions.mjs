// ICSE 10 History & Civics, ch12 Subhas Chandra Bose, the Forward Bloc and the INA — question bank.
// Every letter, diary, broadcast note and quiz scenario is imagined and written by SOYL and labelled as imagined; no
// textbook text, box or exercise and no specimen or board-paper item is reused (D-036). No speech or writing of any
// historical person is quoted: ideas are paraphrased and attributed, and slogans are only named. Wording about every
// leader and organisation is neutral and respectful. Facts are stable, widely taught dates and names, listed for review
// in the README.
import assert from 'node:assert/strict';
import { Q, mcq, ar, tf, fb, match, ord, short, long, source, child, Svg } from '../../icse-10-history-civics-ch01/src/lib.mjs';

const S2 = [25, 45];
const S3 = [40, 70];
const L10 = [120, 220];
const IMAG = '*(Imagined document written by SOYL for practice; the people in it are not real.)*';

// ---------------------------------------------------------------- dates used in items (asserted in order)
export const EVENTS = [
  [1897, 'Bose born, Cuttack'],
  [1921, 'Resigns from the ICS'],
  [1938, 'President, Haripura'],
  [1939, 'Tripuri; Forward Bloc (May)'],
  [1941, 'Escape from Calcutta'],
  [1942, 'First INA (Mohan Singh)'],
  [1943, 'Provisional Government, Singapore'],
  [1944, 'Imphal-Kohima campaign'],
  [1945, 'Reported death; Red Fort trials'],
];
for (let i = 1; i < EVENTS.length; i++) assert.ok(EVENTS[i][0] > EVENTS[i - 1][0], 'events in date order');
export const FB_YEAR = 1939;
export const AZAD_HIND = 1943;
export const yearsBetween = (a, b) => b - a;
assert.equal(yearsBetween(FB_YEAR, AZAD_HIND), 4);
assert.equal(yearsBetween(1938, 1939), 1); // two presidential terms in a row
assert.equal(yearsBetween(1941, 1943), 2); // escape to Singapore
assert.equal(yearsBetween(1897, 1938), 41); // age when first elected Congress President (by year)

/** A horizontal timeline from 1895 to 1950 with labels in lanes (theme colours only). */
export function timelineSvg(alt, caption, events = EVENTS) {
  const W = 780, H = 290, x0 = 40, x1 = 740, y = 145, a = 1895, b = 1950;
  const X = (yr) => x0 + ((yr - a) / (b - a)) * (x1 - x0);
  const s = new Svg(W, H);
  s.line(x0, y, x1, y, { sw: 2 });
  for (const yr of [1900, 1910, 1920, 1930, 1940, 1950]) s.line(X(yr), y - 5, X(yr), y + 5, { sw: 1.2, color: 'muted' });
  s.text(X(1900), y + 18, '1900', { size: 11, muted: true });
  s.text(X(1920), y + 18, '1920', { size: 11, muted: true });
  const lanes = [-34, 36, -34, 68, -66, 100, -98, 36, -130];
  events.forEach(([yr, label], i) => {
    const dy = lanes[i % lanes.length];
    const px = X(yr);
    s.line(px, y, px, y + dy + (dy < 0 ? 8 : -8), { sw: 1, color: 'muted' });
    s.dot(px, y, 4, i % 2 ? 'blue' : 'accent');
    const anchor = px > 560 ? 'end' : px < 180 ? 'start' : 'middle';
    s.text(px, y + dy, `${yr} ${label}`, { size: 11, color: i % 2 ? 'blue' : 'accent', anchor });
  });
  return s.visual(alt, caption);
}

/** Organisation of the Provisional Government and the INA (schematic). */
export function azadSvg(alt, caption) {
  const s = new Svg(720, 320);
  s.rect(220, 20, 280, 62, { rx: 10, fill: 'accent', fillOpacity: 0.2, color: 'accent', sw: 2 });
  s.text(360, 42, 'Provisional Government of Free India', { size: 13, bold: true });
  s.text(360, 64, 'Singapore, 21 October 1943', { size: 11 });
  s.arrow(300, 84, 160, 140, { sw: 1.4, color: 'muted' });
  s.arrow(420, 84, 560, 140, { sw: 1.4, color: 'muted' });
  s.rect(30, 142, 260, 62, { rx: 10, fill: 'blue', fillOpacity: 0.15, color: 'blue', sw: 1.6 });
  s.text(160, 164, 'Indian National Army', { size: 13, bold: true });
  s.text(160, 186, 'Supreme Commander: Subhas Bose', { size: 11 });
  s.rect(430, 142, 260, 62, { rx: 10, fill: 'green', fillOpacity: 0.15, color: 'green', sw: 1.6 });
  s.text(560, 164, 'Indian Independence League', { size: 13, bold: true });
  s.text(560, 186, 'Civilian support in Southeast Asia', { size: 11 });
  const units = ['Gandhi Brigade', 'Nehru Brigade', 'Azad Brigade', 'Rani of Jhansi Regiment'];
  units.forEach((u, i) => {
    const cx = 100 + i * 170;
    s.line(160, 206, cx, 250, { sw: 1, color: 'muted' });
    s.rect(cx - 78, 252, 156, 40, { rx: 8, fill: 'fill', color: 'muted', sw: 1.2 });
    s.text(cx, 272, u, { size: 11 });
  });
  return s.visual(alt, caption);
}

// ================================================================ t01 The Forward Bloc
Q('m_fb_year', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'In which year did Subhas Chandra Bose form the Forward Bloc?',
  opts: ['1939', '1938', '1942', '1943'],
  sol: 'The Forward Bloc was formed in May 1939, soon after Bose resigned as Congress President. He became President in 1938, the first INA came in 1942 and the Provisional Government in 1943.',
}));
Q('m_fb_within', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'How did the Forward Bloc first relate to the Indian National Congress when it was formed?',
  opts: ['It began as a group within the Congress meant to unite its radical members', 'It was a rival party set up by the British government', 'It replaced the Congress as the main national body', 'It was a wing of the Muslim League'],
  sol: 'The Forward Bloc began as a group inside the Congress to bring together its left-wing and radical members. It was not set up by the government, it did not replace the Congress, and it had no link with the Muslim League.',
}));
Q('m_haripura', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'At which Congress session of 1938 did Subhas Chandra Bose preside for the first time?',
  opts: ['Haripura', 'Tripuri', 'Lahore', 'Lucknow'],
  sol: 'Bose first presided at the Haripura session in 1938. He was re-elected for the Tripuri session of 1939; Lahore (1929) adopted complete independence; Lucknow is linked with the Pact of 1916.',
}));
Q('m_tripuri_rival', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'Whom did Bose defeat in the contest for the Congress presidency for the Tripuri session of 1939?',
  opts: ['Pattabhi Sitaramayya', 'Rajendra Prasad', 'Jawaharlal Nehru', 'Vallabhbhai Patel'],
  sol: 'Bose defeated Pattabhi Sitaramayya, who had the backing of Gandhi and many senior leaders. Rajendra Prasad became President after Bose resigned later in 1939.',
}));
Q('m_resign_why', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: 'Why did Bose resign as Congress President in 1939, a few weeks after winning the election?',
  opts: ['Differences with Gandhi and senior leaders over the working committee and the pace of the struggle made it hard for him to function', 'He was arrested by the British for the whole year', 'He had decided to leave India for Germany at once', 'The Congress session at Tripuri was cancelled'],
  sol: 'Senior leaders who had backed his opponent did not cooperate in forming a working committee, and Bose differed with them on how hard to press the British, so he resigned. His arrest and departure came later (1940–41), and the Tripuri session was held.',
}));
Q('m_fb_aim_unite', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Which of the following was an objective of the Forward Bloc?',
  opts: ['To bring together all radical and anti-imperialist groups in a firm struggle for complete independence', 'To support British war aims in return for dominion status', 'To keep India out of all political activity during the war', 'To demand separate electorates for each community'],
  sol: 'The Bloc aimed to unite radical and anti-imperialist forces for an uncompromising struggle for complete independence. Supporting war aims, staying out of politics and separate electorates were not its aims.',
}));
Q('m_fb_programme', mcq({
  t: 1, d: 3, c: 'understanding',
  stem: 'Which kind of economic programme did the Forward Bloc stand for, as its objectives are usually summarised?',
  opts: ['A socialist reorganisation, including ending landlordism and planned development', 'A return to rule by the princes', 'Free trade with no role for the state', 'An economy based only on cottage industries run by the British'],
  sol: 'The Bloc favoured a radical, socialist programme: abolishing landlordism, reorganising agriculture and industry, and planning. The other options run against its stated aims.',
}));
Q('ar_fb_radical', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'Bose formed the Forward Bloc in 1939.',
  r: 'He wanted to unite the radical elements in the Congress who favoured a firmer struggle against British rule.',
  sol: 'Both are true, and R explains A: after resigning the presidency, Bose formed the Bloc to bring together members who wanted a stronger, uncompromising struggle.',
}));
Q('ar_fb_british', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'A-false-R-true',
  a: 'The Forward Bloc was formed with the support of the British government.',
  r: 'The Forward Bloc called for an uncompromising struggle against British rule.',
  sol: 'A is false: the Bloc opposed British rule and had no government support. R is true: it stood for a firm struggle for complete independence.',
}));
Q('tf_tripuri_reelect', tf({
  t: 1, d: 1, c: 'recall', ans: true,
  stem: 'True or false? Bose was elected Congress President in two successive years, 1938 and 1939.',
  sol: 'True. He presided at Haripura in 1938 and was re-elected for Tripuri in 1939, though he resigned the same year.',
}));
Q('s_fb_obj_two', short({
  t: 1, d: 1, c: 'recall', marks: 2, wl: S2,
  stem: 'State any two objectives of the Forward Bloc formed in 1939.',
  model: '1. To **unite all radical and anti-imperialist** elements in a firm struggle for **complete independence**.\n2. To work for a **socialist** reorganisation of society and economy, including **ending landlordism** and **planned development**.',
  sol: 'Any two recognised objectives.',
  scheme: [['First objective', 1], ['Second objective', 1]],
}));
Q('s_tripuri_crisis', short({
  t: 1, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: 'Explain why Bose\'s victory in the 1939 presidential election led to a crisis within the Congress.',
  model: 'Bose defeated **Pattabhi Sitaramayya**, who had the support of **Gandhi** and senior leaders. They **did not cooperate** in forming a **working committee** with him, and he **differed** with them on the **pace of the struggle**, so he **resigned**.',
  sol: 'Opposing candidate backed by senior leaders; no cooperation; resignation.',
  scheme: [['Rival backed by senior leaders', 1], ['No cooperation and resignation', 1]],
}));
Q('s_ics_resign', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Why is Bose\'s decision about the Indian Civil Service seen as the start of his political career?',
  model: 'He passed the **ICS examination (1920)** but **resigned in 1921**, refusing to serve the colonial government. He then joined the **national movement**, working with **C. R. Das** in Bengal.',
  sol: 'Passed and resigned; joined the movement.',
  scheme: [['Passed and resigned the ICS', 1], ['Joined the national movement', 1]],
}));
Q('s3_fb_formation', short({
  t: 1, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Explain three developments of 1938–39 that led Bose to form the Forward Bloc.',
  model: '1. **Haripura (1938):** as President he pressed for a **firmer struggle** and **economic planning**.\n2. **Tripuri (1939):** he defeated **Pattabhi Sitaramayya**, the candidate backed by senior leaders, but they **did not cooperate** with him.\n3. **Resignation:** he resigned in **1939** and, in **May 1939**, formed the **Forward Bloc** to unite radical members within the Congress.',
  sol: 'Haripura; Tripuri crisis; resignation and formation.',
  scheme: [['Haripura and his aims', 1], ['Tripuri crisis', 1], ['Resignation and the Bloc', 1]],
}));

// ================================================================ t02 The Indian National Army
Q('m_ina_mohan', mcq({
  t: 2, d: 2, c: 'recall',
  stem: 'Who first organised the Indian National Army in 1942 from Indian soldiers captured in Southeast Asia?',
  opts: ['Captain Mohan Singh', 'Subhas Chandra Bose', 'Shah Nawaz Khan', 'Bhulabhai Desai'],
  sol: 'Captain Mohan Singh organised the first INA in 1942, with Japanese help, from Indian prisoners of war. Bose took command in 1943; Shah Nawaz Khan was an officer later tried at the Red Fort; Bhulabhai Desai was a defence lawyer at the trials.',
}));
Q('m_iil_rash', mcq({
  t: 2, d: 2, c: 'recall',
  stem: 'Which leader headed the Indian Independence League in Southeast Asia before Subhas Chandra Bose took charge?',
  opts: ['Rash Behari Bose', 'Captain Mohan Singh', 'Lakshmi Swaminathan', 'Jawaharlal Nehru'],
  sol: 'Rash Behari Bose, a revolutionary living in Japan, headed the Indian Independence League and handed over its leadership to Subhas Bose in 1943. Mohan Singh led the first INA; Lakshmi Swaminathan led the women\'s regiment; Nehru was in India.',
}));
Q('m_pow', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'From whom were most of the soldiers of the first INA drawn?',
  opts: ['Indian soldiers of the British Indian Army taken prisoner by the Japanese', 'Japanese volunteers', 'Soldiers of the princely states inside India', 'British officers who opposed the war'],
  sol: 'Most were Indian soldiers of the British Indian Army who had been captured by the Japanese in Malaya and Singapore. Indian civilians in Southeast Asia joined later.',
}));
Q('m_command_1943', mcq({
  t: 2, d: 2, c: 'recall',
  stem: 'In which year did Subhas Chandra Bose take over the leadership of the INA in Singapore?',
  opts: ['1943', '1941', '1942', '1945'],
  sol: 'He reached Southeast Asia and took over the INA and the Indian Independence League in 1943. He escaped from India in 1941; the first INA was formed in 1942; the war ended in 1945.',
}));
Q('m_ina_obj', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Which of these was the main objective of the INA?',
  opts: ['To free India from British rule through an armed struggle', 'To help Japan rule India after the war', 'To defend the British Empire in Asia', 'To set up separate states for each community'],
  sol: 'The INA aimed to liberate India by armed struggle. It did not aim to place India under Japan, defend the Empire or divide India.',
}));
Q('m_ina_unity', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'INA units were named after national leaders and drew soldiers from many regions and religions. What does this tell us about the INA\'s aims?',
  opts: ['It aimed to build a sense of national unity above region and religion', 'It recruited only from one province', 'It was organised on the basis of separate electorates', 'It was a purely religious organisation'],
  sol: 'Mixed units and names such as the Gandhi, Nehru and Azad Brigades show an aim of national unity. The INA did not recruit from one province or organise by community or religion.',
}));
Q('m_rani_regiment', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'What was the Rani of Jhansi Regiment of the INA?',
  opts: ['A women\'s regiment led by Captain Lakshmi Swaminathan', 'A cavalry unit from Jhansi', 'A regiment of the British Indian Army', 'A unit made up of Japanese volunteers'],
  sol: 'It was the INA\'s women\'s regiment, led by Captain Lakshmi Swaminathan (later Sahgal). It was not a cavalry unit, a British regiment or a Japanese unit.',
}));
Q('m_azad_hind_date', mcq({
  t: 2, d: 2, c: 'recall',
  stem: 'Where and when did Bose proclaim the Provisional Government of Free India (Azad Hind)?',
  opts: ['Singapore, 21 October 1943', 'Tokyo, 1942', 'Berlin, 1941', 'Rangoon, 1945'],
  sol: 'The Provisional Government was proclaimed at Singapore on 21 October 1943. Bose was in Berlin in 1941; Tokyo and Rangoon were other centres of activity, but not the place of proclamation.',
}));
Q('m_moirang', mcq({
  t: 2, d: 3, c: 'recall',
  stem: 'In which region did the INA, alongside Japanese forces, fight its main campaign on Indian soil in 1944?',
  opts: ['Imphal and Kohima in the north-east', 'Peshawar in the north-west', 'Bombay on the west coast', 'Madras on the east coast'],
  sol: 'The 1944 campaign was fought around Imphal (Manipur) and Kohima (Nagaland region); the INA flag was raised at Moirang in Manipur. The other places were not battlegrounds of this campaign.',
}));
Q('m_retreat', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'Which reasons are usually given for the failure of the INA\'s campaign of 1944?',
  opts: ['Shortage of supplies, the heavy monsoon and stronger Allied forces', 'Lack of support from the Indian Independence League', 'An order from the Congress to stop fighting', 'The death of Bose before the campaign began'],
  sol: 'The campaign failed because of supply shortages, heavy monsoon rains, disease and stronger Allied forces with air power. The League supported the INA, the Congress gave no such order, and Bose was alive until 1945.',
}));
Q('ar_ina_pow', ar({
  t: 2, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'Many soldiers of the first INA had earlier served in the British Indian Army.',
  r: 'The first INA was raised from Indian soldiers taken prisoner by the Japanese in Southeast Asia.',
  sol: 'Both are true, and R explains A: since the INA drew on captured Indian soldiers, most of its men had served in the British Indian Army.',
}));
Q('ar_rani_navy', ar({
  t: 2, d: 3, c: 'analysis', verdict: 'A-true-R-false',
  a: 'The INA included a regiment of women soldiers.',
  r: 'The Rani of Jhansi Regiment was formed by the British to guard Indian ports.',
  sol: 'A is true. R is false: the Rani of Jhansi Regiment was the INA\'s own women\'s regiment, not a British unit.',
}));
Q('ar_campaign_monsoon', ar({
  t: 2, d: 3, c: 'analysis', verdict: 'both-true-not-explains',
  a: 'The INA\'s campaign in the north-east ended in retreat in 1944.',
  r: 'The Provisional Government of Free India was proclaimed at Singapore.',
  sol: 'Both statements are true, but R (where the government was proclaimed) does not explain A (why the campaign ended in retreat).',
}));
Q('tf_ina_first_bose', tf({
  t: 2, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? Subhas Chandra Bose personally recruited the first INA in 1942.',
  sol: 'False. The first INA was organised by Captain Mohan Singh in 1942; Bose took over and reorganised it in 1943.',
}));
Q('s_ina_founder', short({
  t: 2, d: 2, c: 'recall', marks: 2, wl: S2,
  stem: 'Who organised the first INA, and how was it later reorganised?',
  model: '1. **Captain Mohan Singh** organised it in **1942** from Indian prisoners of war, with **Japanese** help and the **Indian Independence League** of **Rash Behari Bose**.\n2. In **1943** **Subhas Chandra Bose** took **command**, **reorganised** it and added new units.',
  sol: 'Mohan Singh in 1942; Bose in 1943.',
  scheme: [['First organiser and year', 1], ['Reorganisation by Bose', 1]],
}));
Q('s_ina_obj_two', short({
  t: 2, d: 1, c: 'recall', marks: 2, wl: S2,
  stem: 'Mention two objectives of the Indian National Army.',
  model: '1. To **free India** from British rule through an **armed struggle**.\n2. To build a **national army** that stood for **unity** across regions and religions. (Also: to **mobilise Indians abroad** for the freedom struggle.)',
  sol: 'Any two objectives.',
  scheme: [['First objective', 1], ['Second objective', 1]],
}));
Q('s_azad_two', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State two facts about the Provisional Government of Free India.',
  model: '1. It was proclaimed by **Subhas Chandra Bose** at **Singapore** on **21 October 1943**.\n2. It was **recognised** by **Japan** and several of its **allies**, and the **INA** was its army.',
  sol: 'Place and date; recognition or link with the INA.',
  scheme: [['Place and date', 1], ['Recognition or link with the INA', 1]],
}));
Q('s_campaign_fail', short({
  t: 2, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: 'Give two reasons why the INA could not succeed in its 1944 campaign.',
  model: '1. **Supply shortages** and **disease**, made worse by the **monsoon**, in difficult hill terrain.\n2. The **Allied forces** were **stronger**, with control of the **air**, while **Japan** was losing the war.',
  sol: 'Any two valid reasons.',
  scheme: [['First reason', 1], ['Second reason', 1]],
}));
Q('s3_ina_obj', short({
  t: 2, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain three objectives of the INA under Subhas Chandra Bose.',
  model: '1. **Armed struggle:** to drive the British out of India by **military action** from the east.\n2. **National unity:** to build an army in which soldiers of every **region and religion** served together, as shown by its **brigade names**.\n3. **Mobilise Indians abroad:** to win the **support, money and recruits** of Indians living in **Southeast Asia** for the freedom struggle.',
  sol: 'Three objectives, each explained.',
  scheme: [['Armed struggle', 1], ['National unity', 1], ['Mobilising Indians abroad', 1]],
}));

// ================================================================ t03 Contribution of Bose; the INA trials
Q('m_escape', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'An imagined police note of 1941 records that a leader placed under house arrest in Calcutta slipped away in January and was next reported at Kabul, travelling towards Europe. Which conclusion best fits the date and the route?',
  opts: ['He was seeking help abroad from powers at war with Britain, because the Second World War had begun in 1939', 'He was on his way to take command of the INA, which was already waiting for him in Singapore', 'He was travelling to preside over the Haripura session of the Congress', 'He was going abroad to defend the INA officers who were about to be tried'],
  sol: 'In January 1941 the Second World War was already two years old, and the route through Peshawar and Kabul towards Europe points to a search for support from powers fighting Britain. The INA was not formed until 1942 and Bose reached Southeast Asia only in 1943. The Haripura session was held in 1938, and the INA trials took place in 1945–46. All three are real events, but none of them can be dated to the journey of 1941.',
}));
Q('m_germany', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: 'An imagined historian says that Bose\'s years in Germany (1941–43) and in Southeast Asia (1943–45) were two phases of one effort. Which pair of facts best supports this view?',
  opts: ['In both phases he worked among Indian prisoners of war and looked for help from a power at war with Britain', 'He was Congress President in both phases', 'He formed the Forward Bloc in both phases', 'He was reported to have died in both phases'],
  sol: 'In Germany he organised Indian prisoners of war and broadcast to India, and in Southeast Asia he took over the INA, which drew its first men from prisoners of war, with Japanese support. Both phases therefore show the same method. The Forward Bloc was formed in 1939 and his Congress presidency was in 1938–39, so both came before either phase. His reported death was in August 1945, at the end of the second phase only. These are true facts about his life, but none of them links the two phases.',
}));
Q('m_netaji', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'By which title is Subhas Chandra Bose popularly known?',
  opts: ['Netaji', 'Lokmanya', 'Deshbandhu', 'Mahatma'],
  sol: 'Bose is popularly known as Netaji. Lokmanya is used for Tilak, Deshbandhu for C. R. Das, and Mahatma for Gandhi.',
}));
Q('m_death_reported', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'How is the end of Bose\'s life usually described in school histories?',
  opts: ['He was reported to have died in an air crash in Taipei in August 1945; the circumstances have been the subject of several inquiries', 'He was executed after the Red Fort trials', 'He died in prison in Mandalay', 'He became the first President of independent India'],
  sol: 'Bose was reported to have died after an air crash at Taipei (Taihoku) in August 1945, and several inquiries have since examined the circumstances. He was not tried at the Red Fort, was not in Mandalay in 1945, and did not hold office in independent India.',
}));
Q('m_red_fort', mcq({
  t: 3, d: 2, c: 'recall',
  stem: 'Where were INA officers put on trial by the British government in 1945–46?',
  opts: ['The Red Fort, Delhi', 'Fort William, Calcutta', 'The Cellular Jail, Port Blair', 'Mandalay Fort'],
  sol: 'The INA trials were held at the Red Fort in Delhi. The other places are not linked with these trials.',
}));
Q('m_trial_officers', mcq({
  t: 3, d: 2, c: 'recall',
  stem: 'Which three INA officers were tried together in the first Red Fort trial?',
  opts: ['Shah Nawaz Khan, Prem Kumar Sahgal and Gurbaksh Singh Dhillon', 'Mohan Singh, Rash Behari Bose and Lakshmi Swaminathan', 'Bhulabhai Desai, Nehru and Tej Bahadur Sapru', 'C. R. Das, Tilak and Gokhale'],
  sol: 'The first Red Fort trial was of Shah Nawaz Khan, Prem Kumar Sahgal and Gurbaksh Singh Dhillon. Bhulabhai Desai, Nehru and Sapru were among the defence team; the others belong to different events or periods.',
}));
Q('m_trial_defence', mcq({
  t: 3, d: 3, c: 'understanding',
  stem: 'Why is the defence of the INA officers at the Red Fort significant for the national movement?',
  opts: ['Leading Congress figures such as Bhulabhai Desai and Nehru defended them, showing nationwide support across political lines', 'The British government paid for the defence to win Indian support', 'The officers refused any defence', 'Only the Muslim League supported the accused'],
  sol: 'Congress leaders, including Bhulabhai Desai and Jawaharlal Nehru, joined the defence, and support came from many parties and communities. The other options are not historical.',
}));
Q('m_trial_impact', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: 'What was the most important effect of the INA trials on public opinion in India?',
  opts: ['They aroused nationwide sympathy for the INA and strengthened the demand for freedom', 'They made people lose interest in the national movement', 'They led directly to the Partition of Bengal', 'They ended the Second World War'],
  sol: 'The trials stirred strong public sympathy across the country and added pressure for independence. They did not reduce interest, and the Partition of Bengal (1905) and the end of the war (1945) were separate events.',
}));
Q('m_armed_forces', mcq({
  t: 3, d: 4, c: 'evaluation',
  stem: 'Historians often say the INA trials worried the British government because of their effect on one group in particular. Which group?',
  opts: ['Indian soldiers, sailors and airmen in the British forces', 'British civilians in India', 'The princes of the princely states', 'Indian students abroad'],
  sol: 'The sympathy for the INA spread to Indians in the armed forces, raising doubts about their loyalty; unrest such as the naval mutiny of 1946 followed. This was a serious concern for a government that depended on Indian soldiers.',
}));
Q('ar_trials_sympathy', ar({
  t: 3, d: 4, c: 'evaluation', verdict: 'both-true-explains',
  a: 'The British government did not carry out the sentences passed at the first Red Fort trial.',
  r: 'The trials had aroused widespread sympathy for the INA across India.',
  sol: 'Both are true, and R explains A: faced with strong public feeling, including among Indian troops, the authorities remitted the sentences of the three officers.',
}));
Q('ar_bose_president', ar({
  t: 3, d: 3, c: 'analysis', verdict: 'A-false-R-true',
  a: 'Subhas Chandra Bose never held the office of Congress President.',
  r: 'Bose resigned the Congress presidency in 1939.',
  sol: 'A is false: Bose was Congress President in 1938 and was re-elected in 1939. R is true: he resigned in 1939.',
}));
Q('tf_trials_secret', tf({
  t: 3, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? The INA trials were held in secret, so the public knew little about them.',
  sol: 'False. The trials at the Red Fort were widely reported and became a focus of nationwide public meetings and protests.',
}));
Q('s_bose_contrib_two', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Mention two contributions of Subhas Chandra Bose to the freedom struggle before 1941.',
  model: '1. As **Congress President** (**1938**), he pressed for a **firmer struggle** and helped set up the **National Planning Committee**.\n2. He formed the **Forward Bloc** (**1939**) to unite **radical** members for an **uncompromising** struggle.',
  sol: 'Any two contributions before 1941.',
  scheme: [['First contribution', 1], ['Second contribution', 1]],
}));
Q('s_trials_why', short({
  t: 3, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: 'Why did the INA trials become a matter of national concern rather than a military affair?',
  model: 'The accused came from **different religions** (**Hindu, Muslim and Sikh**), so the trials **united** people across communities. Leading lawyers and leaders defended them, and the public saw the officers as **patriots**, turning the trials into a **national cause**.',
  sol: 'Mixed backgrounds; defence by leaders; seen as patriots.',
  scheme: [['Unity across communities', 1], ['Seen as a national cause', 1]],
}));
Q('s_trials_impact_two', short({
  t: 3, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: 'Give two ways in which the INA trials affected the course of the freedom struggle.',
  model: '1. They aroused **nationwide sympathy** and **united** people across communities in support of the accused.\n2. They spread **unrest** among Indians in the **armed forces** (for example the **naval mutiny of 1946**), showing the British that they could no longer **rely** on Indian troops.',
  sol: 'Public sympathy; effect on the armed forces.',
  scheme: [['Public sympathy and unity', 1], ['Effect on the armed forces', 1]],
}));
Q('s3_bose_abroad', short({
  t: 3, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Explain three ways in which Bose continued the freedom struggle from outside India.',
  model: '1. **Germany (1941–43):** he organised **Indian prisoners of war** and **broadcast** messages to India.\n2. **Southeast Asia (1943):** he took over the **INA** and the **Indian Independence League**, and proclaimed the **Provisional Government of Free India**.\n3. **Military campaign (1944):** he led the INA, with Japanese forces, into the **north-east** of India around **Imphal and Kohima**.',
  sol: 'Germany; Singapore and the government; the campaign.',
  scheme: [['Work in Germany', 1], ['INA and Provisional Government', 1], ['The 1944 campaign', 1]],
}));
Q('s3_trials_assess', short({
  t: 3, d: 4, c: 'evaluation', marks: 3, wl: S3,
  stem: 'Assess the importance of the INA trials of 1945–46 in three points.',
  model: '1. **Unity:** the accused were **Hindu, Muslim and Sikh**, so support for them **cut across communities**.\n2. **Political pressure:** leaders such as **Bhulabhai Desai** and **Nehru** defended them, and nationwide protests forced the government to **remit the sentences**.\n3. **Armed forces:** sympathy spread to Indian **soldiers and sailors**, and unrest such as the **naval mutiny (1946)** showed that British rule could no longer rely on them, adding to the pressure for **independence**.',
  sol: 'Unity; pressure and remission; armed forces.',
  scheme: [['Unity across communities', 1], ['Pressure and remission', 1], ['Effect on the armed forces', 1]],
}));

// ================================================================ matching and ordering
Q('match_ch12', match({
  t: [1, 2, 3], d: 2, c: 'understanding', marks: 2,
  stem: 'Match each person connected with the story of the INA with the role usually linked to them.',
  pairs: [
    ['Captain Mohan Singh', 'Organised the first INA in 1942'],
    ['Rash Behari Bose', 'Headed the Indian Independence League before 1943'],
    ['Lakshmi Swaminathan', 'Led the Rani of Jhansi Regiment'],
    ['Bhulabhai Desai', 'Defended INA officers at the Red Fort'],
  ],
  sol: 'Mohan Singh organised the first INA; Rash Behari Bose led the Indian Independence League; Lakshmi Swaminathan led the women\'s regiment; Bhulabhai Desai led the defence at the Red Fort trials.',
}));
Q('ord_ch12', ord({
  t: [1, 2, 3], d: 2, c: 'understanding', marks: 1,
  stem: 'Arrange these steps in Bose\'s journey from Congress President to the head of a provisional government in the correct order.',
  items: [
    'Presides over the Haripura session of the Congress',
    'Forms the Forward Bloc',
    'Escapes from house arrest in Calcutta',
    'Takes over the INA in Singapore',
    'Proclaims the Provisional Government of Free India',
  ],
  sol: 'Haripura (1938), Forward Bloc (1939), escape (1941), takes over the INA (1943), Provisional Government (October 1943).',
}));

// ================================================================ long (10-mark, 3 + 3 + 4)
Q('l_fb_full', long({
  t: 1, d: 3, c: 'analysis', marks: 10, wl: L10,
  stem: 'Answer the following about Bose and the Forward Bloc.\n\n(i) Describe Bose\'s presidency of the Congress at Haripura and his re-election for Tripuri. **[3]**\n(ii) Why did he resign as President in 1939? **[3]**\n(iii) When was the Forward Bloc formed, and what were its objectives? **[4]**',
  model: '(i) Bose presided at the **Haripura** session in **1938**, where he urged a **firmer struggle** and **economic planning**; the **National Planning Committee** was set up during his term. In **1939** he was **re-elected**, defeating **Pattabhi Sitaramayya**, the candidate backed by **Gandhi** and senior leaders.\n\n(ii) Senior leaders who had supported his rival **did not cooperate** in forming a **working committee**, and he **differed** with them on the **pace** of the struggle against British rule. Unable to function, he **resigned** in **1939**.\n\n(iii) He formed the **Forward Bloc** in **May 1939**, at first **within the Congress**. Its objectives were to **unite** all **radical and anti-imperialist** elements; to carry on an **uncompromising struggle** for **complete independence**; and to work for a **socialist** reorganisation, including **ending landlordism** and **planned development**.',
  sol: 'Haripura and Tripuri; resignation; formation and objectives.',
  scheme: [['(i) Haripura and his aims', 2], ['(i) Re-election over Sitaramayya', 1], ['(ii) No cooperation', 2], ['(ii) Differences and resignation', 1], ['(iii) Year and formation', 1], ['(iii) Objectives', 3]],
}));
Q('l_ina_origin', long({
  t: 2, d: 3, c: 'analysis', marks: 10, wl: L10,
  stem: 'Answer the following about the Indian National Army.\n\n(i) Who organised the first INA, when, and from whom were its soldiers drawn? **[3]**\n(ii) What part did Rash Behari Bose and the Indian Independence League play? **[3]**\n(iii) Explain how Subhas Chandra Bose reorganised and strengthened the INA after 1943. **[4]**',
  model: '(i) **Captain Mohan Singh** organised the first INA in **1942**, with **Japanese** help, mainly from **Indian soldiers of the British Indian Army** taken prisoner after the fall of **Malaya and Singapore**.\n\n(ii) **Rash Behari Bose**, a revolutionary living in **Japan**, led the **Indian Independence League**, which brought together **Indians in Southeast Asia** in support of the freedom struggle and provided a political base for the INA. In **1943** he **handed over** its leadership to Subhas Bose.\n\n(iii) Subhas Bose took **command** in **1943**, **recruited** Indian **civilians** as well as soldiers, raised the **Rani of Jhansi Regiment** for women, named brigades after **Gandhi, Nehru and Azad** to stress **unity**, gave it the slogan **"Delhi Chalo"**, and placed it under the **Provisional Government of Free India**.',
  sol: 'First INA; League and Rash Behari Bose; reorganisation.',
  scheme: [['(i) Organiser and year', 2], ['(i) Source of soldiers', 1], ['(ii) Role of the League', 2], ['(ii) Handover in 1943', 1], ['(iii) Reorganisation measures', 4]],
}));
Q('l_azad_hind', long({
  t: [2, 3], d: 3, c: 'understanding', marks: 10, wl: L10,
  stem: 'Answer the following about the Provisional Government of Free India.\n\n(i) When and where was it proclaimed, and by whom? **[3]**\n(ii) Explain the link between this government and the INA. **[3]**\n(iii) Describe the INA\'s campaign of 1944 and explain why it ended in retreat. **[4]**',
  model: '(i) It was proclaimed by **Subhas Chandra Bose** at **Singapore** on **21 October 1943**, and was **recognised** by **Japan** and several of its **allies**.\n\n(ii) The **INA** was the **army** of the Provisional Government; Bose was both head of the government and **Supreme Commander** of the army, and the **Indian Independence League** organised **civilian support**, money and recruits.\n\n(iii) In **1944** the INA, with **Japanese** forces, advanced into the **north-east** of India around **Imphal and Kohima**, and its flag was raised at **Moirang** in Manipur. It **retreated** because of **supply shortages**, **disease**, the heavy **monsoon** and the **stronger Allied forces**, which had **control of the air** as Japan began to lose the war.',
  sol: 'Who, when, where; link with the INA; campaign and retreat.',
  scheme: [['(i) Date, place and founder', 3], ['(ii) INA as its army', 2], ['(ii) Role of the League', 1], ['(iii) The campaign', 2], ['(iii) Reasons for retreat', 2]],
}));
Q('l_contribution', long({
  t: 3, d: 3, c: 'evaluation', marks: 10, wl: L10,
  stem: 'Answer the following about the contribution of Subhas Chandra Bose.\n\n(i) Describe three of his contributions within India before 1941. **[3]**\n(ii) Describe three of his contributions abroad between 1941 and 1945. **[3]**\n(iii) Evaluate his overall contribution to India\'s freedom struggle. **[4]**',
  model: '(i) He **resigned from the ICS** (**1921**) to join the movement; as **Congress President** (**1938–39**) he pressed for a **firmer struggle** and **planning**; and he formed the **Forward Bloc** (**1939**) to unite **radical** members.\n\n(ii) In **Germany** he organised **Indian prisoners of war** and **broadcast** to India; in **1943** he took over the **INA** and proclaimed the **Provisional Government of Free India**; in **1944** he led the INA into the **north-east**.\n\n(iii) Although the INA did not win militarily, Bose **inspired** Indians with the idea of **armed struggle** and **national unity** across **religions and regions**, gave a role to **women** in the army, and the **INA trials** that followed his campaign stirred **nationwide sympathy** and unrest in the **armed forces**, adding to the **pressure** on Britain to leave India. Historians differ on the wisdom of seeking help from the **Axis powers**; a balanced answer notes both points.',
  sol: 'Work in India; work abroad; balanced evaluation.',
  scheme: [['(i) Three contributions in India', 3], ['(ii) Three contributions abroad', 3], ['(iii) Inspiration and unity', 2], ['(iii) Effect through the trials and a balanced view', 2]],
}));
Q('l_trials', long({
  t: 3, d: 4, c: 'evaluation', marks: 10, wl: L10,
  stem: 'Answer the following about the INA trials.\n\n(i) Where were the trials held, and name the three officers tried together. **[3]**\n(ii) Who defended them, and how did the public react? **[3]**\n(iii) Assess the impact of the trials on the British government and the freedom struggle. **[4]**',
  model: '(i) The trials were held at the **Red Fort, Delhi**, in **1945–46**. The three officers tried together were **Shah Nawaz Khan**, **Prem Kumar Sahgal** and **Gurbaksh Singh Dhillon**.\n\n(ii) The defence included **Bhulabhai Desai**, **Jawaharlal Nehru** and **Tej Bahadur Sapru**. There were **meetings, processions and protests** all over India; because the accused were **Hindu, Muslim and Sikh**, support came from **every community**.\n\n(iii) Faced with this feeling, the authorities **remitted the sentences** of the three officers. Sympathy spread to Indians in the **armed forces**, and unrest such as the **naval mutiny of 1946** showed that Britain could no longer **rely** on Indian troops. The trials therefore added strong **pressure** for a **transfer of power**.',
  sol: 'Place and officers; defence and reaction; impact.',
  scheme: [['(i) Place', 1], ['(i) Three officers', 2], ['(ii) Defence team', 1], ['(ii) Public reaction across communities', 2], ['(iii) Remission of sentences', 1], ['(iii) Effect on the armed forces and on Britain', 3]],
}));
Q('l_timeline', long({
  t: [1, 2, 3], d: 3, c: 'application', marks: 10, wl: L10,
  stem: 'Study the timeline of events from 1897 to 1945 drawn by SOYL and answer the questions that follow.\n\n(i) Identify three events on the timeline from 1938 to 1941 and state one fact about each. **[3]**\n(ii) How many years separate the formation of the Forward Bloc from the proclamation of the Provisional Government? What happened to Bose in between? **[3]**\n(iii) Using events from 1942 to 1945 on the timeline, explain how the INA\'s story moved from formation to the Red Fort trials. **[4]**',
  model: `(i) **1938:** Bose presides at **Haripura**. **1939:** re-elected for **Tripuri**, resigns, and forms the **Forward Bloc** (May). **1941:** **escapes** from house arrest in **Calcutta**.\n\n(ii) **${yearsBetween(FB_YEAR, AZAD_HIND)} years** (${AZAD_HIND} − ${FB_YEAR}). In between he was **arrested** (1940), **escaped** (1941), worked in **Germany**, and reached **Southeast Asia** in **1943**.\n\n(iii) **1942:** **Mohan Singh** organised the first INA from **prisoners of war**. **1943:** Bose took command and proclaimed the **Provisional Government** at **Singapore**. **1944:** the **Imphal–Kohima** campaign ended in **retreat**. **1945:** Bose was **reported** to have died in an air crash, and INA officers were tried at the **Red Fort**, which stirred **nationwide sympathy**.`,
  sol: 'Three events; the gap; the INA story.',
  scheme: [['(i) Three events with facts', 3], ['(ii) Correct number of years', 1], ['(ii) Events in between', 2], ['(iii) Formation and the Provisional Government', 2], ['(iii) Campaign, end of war and trials', 2]],
  assets: [timelineSvg('Timeline from 1895 to 1950 marking: 1897 Bose born at Cuttack, 1921 resigns from the ICS, 1938 President at Haripura, 1939 Tripuri and Forward Bloc, 1941 escape from Calcutta, 1942 first INA under Mohan Singh, 1943 Provisional Government at Singapore, 1944 Imphal-Kohima campaign, 1945 reported death and Red Fort trials', 'Schematic timeline drawn by SOYL; label positions are for legibility only.')],
}));
Q('l_azad_chart', long({
  t: 2, d: 3, c: 'application', marks: 10, wl: L10,
  stem: 'Study the chart of the Provisional Government and the INA drawn by SOYL and answer the questions that follow.\n\n(i) Name the two bodies shown under the Provisional Government and state the role of each. **[3]**\n(ii) What do the names of the units shown at the bottom of the chart suggest about the INA\'s aims? **[3]**\n(iii) Explain the significance of the Rani of Jhansi Regiment shown in the chart. **[4]**',
  model: '(i) The **Indian National Army**, the **army** of the Provisional Government with **Bose** as **Supreme Commander**; and the **Indian Independence League**, which organised **civilian support**, funds and recruits among Indians in **Southeast Asia**.\n\n(ii) The **Gandhi, Nehru and Azad Brigades** were named after leaders of the **national movement** from **different backgrounds**, showing that the INA saw itself as part of the **national struggle** and stood for **unity** above region and religion.\n\n(iii) It was a regiment of **women soldiers**, led by **Captain Lakshmi Swaminathan**. It showed that women could take part in the **armed struggle** for freedom, **broke** with the idea that soldiering was only for men, and **inspired** Indians at home and abroad; its name recalled **Rani Lakshmibai of Jhansi**, a leader of **1857**.',
  sol: 'Two bodies; unit names; women\'s regiment.',
  scheme: [['(i) Two bodies and roles', 3], ['(ii) Unity and link with the national movement', 3], ['(iii) Women soldiers and leader', 2], ['(iii) Significance', 2]],
  assets: [azadSvg('Chart: the Provisional Government of Free India (Singapore, 21 October 1943) at the top, with two bodies below it, the Indian National Army (Supreme Commander Subhas Bose) and the Indian Independence League (civilian support in Southeast Asia); under the army are four units: Gandhi Brigade, Nehru Brigade, Azad Brigade and Rani of Jhansi Regiment', 'Organisation of the Provisional Government and the INA (schematic, drawn by SOYL).')],
}));

// ================================================================ source-based
Q('sb_tripuri_diary', source({
  t: 1, d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the extract from the imagined diary of a young Congress volunteer and answer the questions that follow. ${IMAG}`,
  passage: '**Diary of an imagined Congress volunteer from Jabalpur, 1939**\n\nThe whole town is talking of the vote. Our President of last year has won again, though the elders had backed the gentleman from the south. At the session the mood was tense: the senior leaders would not sit on his committee, and he could not choose his team. Today we heard he has given up the post. My friend from Calcutta says he will not rest; he wants all of us who favour a bolder fight to stand together in a new group of our own, still inside the Congress.',
  parts: [
    child('a', short({ t: 1, d: 1, c: 'recall', marks: 1, stem: 'Which Congress session of 1939 is the diary describing?', model: 'The **Tripuri** session (**1939**).', sol: 'Tripuri.', scheme: [['Tripuri session', 1]] })),
    child('b', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'Who is "the gentleman from the south" whom the elders had backed?', model: '**Pattabhi Sitaramayya**.', sol: 'The rival candidate.', scheme: [['Pattabhi Sitaramayya', 1]] })),
    child('c', short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Which group does the friend from Calcutta expect the President to form, and what would be two of its aims?', model: 'The **Forward Bloc** (**May 1939**). Aims: to **unite radical** members for a **bolder, uncompromising** struggle, and to work for **complete independence** with a **socialist** programme.', sol: 'Forward Bloc; two aims.', scheme: [['Forward Bloc named', 1], ['Two aims', 1]] }), [
      short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Using the diary, explain two reasons why the President gave up his post.', model: 'The **senior leaders would not sit on his committee**, so he **could not form a working team**; and the **tension** at the session showed **deep differences** with them over the **pace** of the struggle.', sol: 'No committee; differences.', scheme: [['No cooperation on the committee', 1], ['Differences over the struggle', 1]] }),
    ]),
  ],
}));
Q('sb_singapore_letter', source({
  t: 2, d: 3, c: 'application', origin: 'soyl-original',
  stem: `Read the extract from an imagined letter and answer the questions that follow. ${IMAG}`,
  passage: '**Letter from an imagined Indian shopkeeper in Singapore to his sister in Madras, November 1943**\n\nSister, last month our leader announced a government of free India in this very city. I have given a part of my savings to the League office, and your nephew, a former soldier who was captured last year, has joined the army again, this time under an Indian flag. Even the daughters of my neighbour have joined a regiment of women named after a queen of 1857. Every meeting ends with the cry of marching to the capital.',
  parts: [
    child('a', short({ t: 2, d: 1, c: 'recall', marks: 1, stem: 'Name the government announced "in this very city" in October 1943.', model: 'The **Provisional Government of Free India** (Azad Hind), proclaimed at **Singapore** on **21 October 1943**.', sol: 'The Provisional Government.', scheme: [['Provisional Government of Free India', 1]] })),
    child('b', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Name the regiment the neighbour\'s daughters joined.', model: 'The **Rani of Jhansi Regiment**.', sol: 'The women\'s regiment.', scheme: [['Rani of Jhansi Regiment', 1]] })),
    child('c', short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): How does the letter show two different sources of the INA\'s strength?', model: '**Soldiers:** former **prisoners of war** of the British Indian Army, like the nephew, joined it. **Civilians:** Indians in **Southeast Asia** gave **money** (to the **Indian Independence League**) and **recruits**, including **women**.', sol: 'Soldiers and civilians.', scheme: [['Former prisoners of war', 1], ['Civilian support and recruits', 1]] }), [
      short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): What is "the cry of marching to the capital", and what does it show about the INA\'s aim?', model: 'The slogan **"Delhi Chalo"**. It shows that the INA aimed to **advance into India** and **free it** from British rule by **armed struggle**.', sol: 'Slogan and aim.', scheme: [['Slogan named', 1], ['Aim of armed liberation', 1]] }),
    ]),
  ],
}));
Q('sb_red_fort_notes', source({
  t: 3, d: 4, c: 'evaluation', origin: 'soyl-original',
  stem: `Read the extract from the imagined notes of a law student and answer the questions that follow. ${IMAG}`,
  passage: '**Notes of an imagined law student in Delhi, December 1945**\n\nQueued from dawn outside the old fort. Three officers stand accused together: one Hindu, one Muslim, one Sikh. The senior advocate for the defence argued that they had fought as soldiers of a free government, not as rebels. Outside, students from every community shouted the same slogans. My uncle, a havildar in the army, wrote that men in his unit talk of nothing else. I wonder whether the government understands what it has started.',
  parts: [
    child('a', short({ t: 3, d: 1, c: 'recall', marks: 1, stem: 'Name "the old fort" where the trial in the notes was held.', model: 'The **Red Fort**, Delhi.', sol: 'The Red Fort.', scheme: [['Red Fort', 1]] })),
    child('b', short({ t: 3, d: 2, c: 'application', marks: 1, stem: 'Why did the backgrounds of the three accused matter to the public?', model: 'Being **Hindu, Muslim and Sikh**, they made the trial a cause that **united all communities**.', sol: 'Unity across communities.', scheme: [['Unity across communities', 1]] })),
    child('c', short({ t: 3, d: 4, c: 'evaluation', marks: 2, stem: '**Either** (i): What does the uncle\'s letter suggest about the effect of the trials, and why would it worry the government?', model: 'Sympathy for the INA was spreading among **Indian soldiers**. The government depended on **Indian troops** to rule, so doubts about their **loyalty** (later seen in the **naval mutiny of 1946**) weakened its hold.', sol: 'Effect on troops; why worrying.', scheme: [['Effect on Indian soldiers', 1], ['Why it worried the government', 1]] }), [
      short({ t: 3, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): What argument did the defence make, according to the notes, and how did the government finally deal with the three officers?', model: 'The defence argued that they were **soldiers of a free government** (the Provisional Government), **not rebels**. The authorities **remitted their sentences** after nationwide protests.', sol: 'Defence argument; remission.', scheme: [['Defence argument', 1], ['Sentences remitted', 1]] }),
    ]),
  ],
}));

// ================================================================ application items (imagined scenarios)
Q('m_app_fb_member', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: 'An imagined student writes: "Bose formed the Forward Bloc because he lost the 1939 presidential election to Pattabhi Sitaramayya." Which correction is best?',
  opts: ['He won the election, but senior leaders would not work with him on the working committee and he resigned; the Bloc was formed afterwards to unite radical members within the Congress', 'He won the election and formed the Bloc the same day, as a party outside the Congress', 'He won the election and stayed on as President for the rest of 1939, forming the Bloc as a second office', 'He lost the election and resigned, and the Bloc was formed by Rajendra Prasad'],
  sol: 'The student has the result reversed. Bose defeated Pattabhi Sitaramayya, but the senior leaders who had backed his rival did not cooperate over the working committee and he resigned in 1939. The Bloc followed in May 1939, at first within the Congress. The other options repeat slips: forming a party outside the Congress at once, staying on as President, or crediting Rajendra Prasad, who succeeded Bose as President.',
}));
Q('m_app_planning', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'An imagined student says that the economic aims of the Forward Bloc (1939), such as planned development, were new ideas that had nothing to do with Bose\'s earlier career. Which fact best shows the student is mistaken?',
  opts: ['The National Planning Committee had been set up in 1938, during his term as Congress President, so planning was already part of his programme', 'He had passed the ICS examination in 1920', 'He was born at Cuttack in 1897', 'He had been re-elected for the Tripuri session in 1939'],
  sol: 'The student claims there was no earlier link between Bose and economic planning. The National Planning Committee of 1938, set up while he was President, is a direct earlier link. The ICS examination, his birthplace and his re-election are true facts about him, but none concerns economic planning.',
}));
Q('m_app_pow', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'An imagined student claims that a soldier who joined the INA from a prisoner-of-war camp in mid-1942 was serving under Subhas Chandra Bose. Which fact best shows that this is doubtful?',
  opts: ['Bose reached Southeast Asia and took command only in 1943; the INA of 1942 was organised by Captain Mohan Singh', 'Bose had formed the Forward Bloc in 1939', 'Bose had been Congress President in 1938', 'The INA later fought around Imphal and Kohima'],
  sol: 'The claim fails on dates: in mid-1942 Bose was still in Germany, and the first INA was raised by Captain Mohan Singh from prisoners of war. Bose took command in 1943. The Forward Bloc, the presidency of 1938 and the Imphal–Kohima campaign are true facts, but none of them fixes who led the INA in 1942.',
}));
Q('m_app_brigade', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'A visitor to Singapore in 1943 notes that the INA has three brigades named after Gandhi, Nehru and Azad, and a women\'s regiment named after a queen of 1857. Which reading of these names is best?',
  opts: ['The INA presented itself as part of the whole national struggle, from 1857 to the leaders of its own day, above region and religion', 'The INA was an arm of the Congress and took orders from its Working Committee', 'Each brigade recruited only from the home province of the leader it was named after', 'The three leaders named were commanding the brigades'],
  sol: 'Names of leaders from different backgrounds, together with the heroine of 1857, show that the INA claimed the national movement as a whole as its heritage. A name honours a person; it does not mean control by the Congress, recruitment by province or command by the leader. Bose commanded the INA, and these leaders were in India.',
}));
Q('m_app_rani', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'An imagined columnist in 1943 says that the Rani of Jhansi Regiment mattered more as a message than as a fighting force. Which fact best supports this claim?',
  opts: ['Its name recalled a woman who fought in 1857, linking the INA\'s struggle to the earlier revolt, and it showed that women could serve as soldiers for freedom', 'It was led by Captain Lakshmi Swaminathan, later Sahgal', 'It was one of the units shown under the INA in the Provisional Government\'s organisation', 'Many of its recruits were Indian civilians living in Southeast Asia'],
  sol: 'The claim is about symbolic meaning, so the best support is the regiment\'s name and the example of women soldiers. Its commander, its place among the INA units and its recruitment from civilians in Southeast Asia are all true, but they describe how it was organised, not what it stood for.',
}));
Q('m_app_donor', mcq({
  t: 2, d: 3, c: 'understanding',
  stem: 'An imagined student asks why Bose needed the Indian Independence League once the INA already existed. Which answer is best?',
  opts: ['The INA was the fighting force, while the League drew funds, supplies and recruits from Indian civilians in Southeast Asia, which an army far from India could not do without', 'The League commanded the INA in battle, and Bose only held a political office', 'The League replaced the INA after its retreat from Imphal and Kohima', 'The League was the political party that governed India under the British'],
  sol: 'An army operating far from India needed money, supplies and recruits; the League organised them among Indians living in Southeast Asia, while the INA fought. Bose was Supreme Commander of the INA, the League did not command it, it did not replace it, and it was not a party in India.',
}));
Q('m_app_campaign', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'An imagined student says the INA\'s campaign of 1944 failed because the Provisional Government of Free India had not yet been proclaimed. Which correction is best?',
  opts: ['The Government had been proclaimed at Singapore in October 1943; the retreat came from shortages of supplies, disease, the monsoon and stronger Allied forces', 'The Government was proclaimed in 1945, after the retreat, so the student is right', 'The Government had been proclaimed in 1943, and the retreat came because the Congress withdrew its support', 'The Government had been proclaimed in 1942 by Captain Mohan Singh, before the campaign'],
  sol: 'The campaign followed the proclamation of 21 October 1943, so the student\'s reason cannot hold. The causes of the retreat were supply shortages, disease, the heavy monsoon and stronger Allied forces with air power. The Government was not proclaimed in 1945 or 1942, and the Congress did not withdraw support from the campaign.',
}));
Q('m_app_trial_public', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'An imagined official in 1945 argues that trying three INA officers in public will show other soldiers what happens to those who break their oath. Which development shows that the plan did not work as he hoped?',
  opts: ['Joint meetings of every community and unrest among Indian troops, followed by the remission of the sentences', 'The proclamation of the Provisional Government of Free India at Singapore', 'The retreat of the INA from Imphal and Kohima', 'The report of Bose\'s death after an air crash at Taipei'],
  sol: 'The plan failed if the trials won sympathy instead of fear: protests across communities, doubts among Indian soldiers and the remission of the sentences show this. The Singapore proclamation (1943), the retreat (1944) and the reported death (August 1945) are real events, but they came before the trials and say nothing about how the public reacted to them.',
}));
Q('m_app_navy', mcq({
  t: 3, d: 4, c: 'analysis',
  stem: 'In February 1946 ratings of the Royal Indian Navy in Bombay went on strike. Why would the government treat unrest among sailors as more serious than a student procession on the same cause?',
  opts: ['British rule depended on Indian soldiers, sailors and airmen, so doubts about their loyalty threatened the means by which it held the country', 'A strike in a port stops trade, and the government cared about trade more than about politics', 'The sailors had been tried at the Red Fort', 'Student processions were banned by the Cabinet Mission'],
  sol: 'Students could protest, but only the armed forces could be used to keep order, so unrest among Indian service men shook a government that relied on them. A port strike does hurt trade, but that is not why historians stress the mutiny. The sailors were not the accused of the Red Fort trials, and the Cabinet Mission did not ban processions.',
}));
Q('s_app_broadcast', short({
  t: 3, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'An imagined listener\'s log of 1942 notes a radio broadcast from Germany to Indians. The speaker says he left India more than a year ago, that Indian prisoners of war are being gathered where he is, and that India should look for help to those fighting Britain. Using two clues from the log, say who the speaker most likely was, and explain why a speaker with this aim would be in Germany.',
  model: 'Most likely **Subhas Chandra Bose**. Clues: he **left India in January 1941** (more than a year earlier) after **escaping house arrest**, and he **organised Indian prisoners of war** in Germany. Germany was **at war with Britain**, so he hoped for **its help and a platform** for India\'s freedom.',
  sol: 'Bose, with two clues from the log; Germany at war with Britain, so a source of help.',
  scheme: [['Bose identified with two clues from the log', 1], ['Germany was at war with Britain and offered help or a platform', 1]],
}));

// ================================================================ extra objective items for check slides
Q('m_chk_tripuri', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'For which Congress session of 1939 was Bose re-elected President?',
  opts: ['Tripuri', 'Haripura', 'Karachi', 'Faizpur'],
  sol: 'He was re-elected for the Tripuri session of 1939. Haripura (1938) was his first session as President.',
}));
Q('tf_chk_fb_outside', tf({
  t: 1, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? When it was formed in 1939, the Forward Bloc was a party completely separate from the Congress.',
  sol: 'False. It began as a group within the Congress to unite its radical members.',
}));
Q('fb_chk_mohan', fb({
  t: 2, d: 2, c: 'recall',
  stem: 'The first Indian National Army was organised in 1942 by Captain ___.',
  acc: [['Mohan Singh']],
  sol: 'Captain Mohan Singh organised the first INA.',
}));
Q('m_chk_rani_leader', mcq({
  t: 2, d: 2, c: 'recall',
  stem: 'Who led the Rani of Jhansi Regiment of the INA?',
  opts: ['Captain Lakshmi Swaminathan', 'Rash Behari Bose', 'Captain Mohan Singh', 'Gurbaksh Singh Dhillon'],
  sol: 'Captain Lakshmi Swaminathan (later Sahgal) led the women\'s regiment. The others had different roles.',
}));
Q('tf_chk_azad_tokyo', tf({
  t: 2, d: 1, c: 'recall', ans: false,
  stem: 'True or false? The Provisional Government of Free India was proclaimed at Tokyo.',
  sol: 'False. It was proclaimed at Singapore on 21 October 1943.',
}));
Q('m_chk_trial_place', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'In which city were the INA officers tried in 1945–46?',
  opts: ['Delhi', 'Calcutta', 'Singapore', 'Rangoon'],
  sol: 'They were tried at the Red Fort in Delhi.',
}));
Q('m_chk_escape_year', mcq({
  t: 3, d: 2, c: 'recall',
  stem: 'In which year did Bose escape from house arrest and leave India?',
  opts: ['1941', '1939', '1943', '1945'],
  sol: 'He escaped in January 1941. He formed the Forward Bloc in 1939, reached Southeast Asia in 1943, and was reported dead in 1945.',
}));
Q('fb_chk_slogan', fb({
  t: 2, d: 1, c: 'recall',
  stem: 'The INA slogan calling its soldiers to march on the capital was "___ Chalo".',
  acc: [['Delhi']],
  sol: 'The slogan was "Delhi Chalo".',
}));
