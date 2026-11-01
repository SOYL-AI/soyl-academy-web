// ICSE 10 History & Civics, ch13 Independence and Partition of India — question bank. Every diary, letter, minute
// and quiz scenario is imagined and written by SOYL and labelled as imagined; no textbook text, box or exercise and no
// specimen or board-paper item is reused (D-036). No document of 1946–47 and no speech or writing of any historical
// person is quoted: clauses are paraphrased in our own words. Wording about every leader, party and community is
// neutral; the violence of 1946–47 is described humanely, without figures and without blaming any community. Facts
// are stable, widely taught dates and names, listed for review in the README.
import assert from 'node:assert/strict';
import { Q, mcq, ar, tf, fb, match, ord, short, long, source, child, Svg } from '../../icse-10-history-civics-ch01/src/lib.mjs';

const S2 = [25, 45];
const S3 = [40, 70];
const L10 = [120, 220];
const IMAG = '*(Imagined document written by SOYL for practice; the people in it are not real.)*';

// ---------------------------------------------------------------- dates used in items (asserted in order)
// [year, month (1-12), day or null, label]
export const EVENTS = [
  [1946, 3, 24, 'Cabinet Mission arrives'],
  [1946, 5, 16, 'Cabinet Mission Plan'],
  [1946, 8, 16, 'Direct Action Day'],
  [1946, 9, 2, 'Interim government'],
  [1946, 12, 9, 'Constituent Assembly meets'],
  [1947, 2, 20, 'Attlee statement'],
  [1947, 6, 3, 'Mountbatten Plan'],
  [1947, 7, 18, 'Independence Act (assent)'],
  [1947, 8, 15, 'Independence'],
];
const dateKey = (e) => e[0] * 400 + e[1] * 32 + (e[2] ?? 0);
for (let i = 1; i < EVENTS.length; i++) assert.ok(dateKey(EVENTS[i]) > dateKey(EVENTS[i - 1]), 'events in date order');
export const monthsBetween = (a, b) => (b[0] - a[0]) * 12 + (b[1] - a[1]);
export const PLAN_3_JUNE = EVENTS[6];
export const INDEPENDENCE = EVENTS[8];
export const ATTLEE = EVENTS[5];
assert.equal(monthsBetween(PLAN_3_JUNE, INDEPENDENCE), 2); // June to August 1947: about ten weeks
// Attlee's deadline was June 1948; independence came about ten months earlier.
export const ATTLEE_DEADLINE = [1948, 6, 30];
assert.equal(monthsBetween(INDEPENDENCE, ATTLEE_DEADLINE), 10);
// Cabinet Mission sections (Group A, B, C) as commonly taught.
export const SECTIONS = {
  A: ['Madras', 'Bombay', 'United Provinces', 'Bihar', 'Central Provinces', 'Orissa'],
  B: ['Punjab', 'North-West Frontier Province', 'Sind'],
  C: ['Bengal', 'Assam'],
};
assert.equal(SECTIONS.A.length + SECTIONS.B.length + SECTIONS.C.length, 11);
// Constituent Assembly under the plan: 292 (provinces) + 4 (Chief Commissioners' provinces) + 93 (princely states).
export const CA = { provinces: 292, chief: 4, states: 93 };
export const CA_TOTAL = CA.provinces + CA.chief + CA.states;
assert.equal(CA_TOTAL, 389);

const MONTHS = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
/** A horizontal timeline from January 1946 to September 1947 with labels in lanes (theme colours only). */
export function timelineSvg(alt, caption, events = EVENTS) {
  const W = 780, H = 330, x0 = 40, x1 = 740, y = 165;
  const t = (e) => (e[0] - 1946) * 12 + (e[1] - 1) + ((e[2] ?? 1) - 1) / 31;
  const X = (e) => x0 + (t(e) / 20) * (x1 - x0);
  const s = new Svg(W, H);
  s.line(x0, y, x1, y, { sw: 2 });
  for (const m of [[1946, 1], [1946, 7], [1947, 1], [1947, 7]]) {
    const px = X([m[0], m[1], 1]);
    s.line(px, y - 5, px, y + 5, { sw: 1.2, color: 'muted' });
    s.text(px, y + 18, `${MONTHS[m[1]]} ${m[0]}`, { size: 11, muted: true });
  }
  const lanes = [-40, 44, -76, 80, -112, 116, -40, -148, 44];
  events.forEach((e, i) => {
    const dy = lanes[i % lanes.length];
    const px = X(e);
    s.line(px, y, px, y + dy + (dy < 0 ? 8 : -8), { sw: 1, color: 'muted' });
    s.dot(px, y, 4, i % 2 ? 'blue' : 'accent');
    const anchor = px > 560 ? 'end' : px < 180 ? 'start' : 'middle';
    s.text(px, y + dy, `${e[2] ?? ''} ${MONTHS[e[1]]} ${e[0]}: ${e[3]}`.trim(), { size: 11, color: i % 2 ? 'blue' : 'accent', anchor });
  });
  return s.visual(alt, caption);
}

/** The three-tier scheme of the Cabinet Mission Plan (schematic). */
export function schemeSvg(alt, caption) {
  const s = new Svg(720, 330);
  s.rect(190, 18, 340, 64, { rx: 10, fill: 'accent', fillOpacity: 0.2, color: 'accent', sw: 2 });
  s.text(360, 40, 'Union of India (British India + princely states)', { size: 13, bold: true });
  s.text(360, 62, 'Defence, foreign affairs, communications', { size: 11 });
  const groups = [['Section A', 'Hindu-majority provinces'], ['Section B', 'North-west provinces'], ['Section C', 'Bengal and Assam']];
  groups.forEach(([g, sub], i) => {
    const cx = 130 + i * 230;
    s.arrow(360, 84, cx, 136, { sw: 1.2, color: 'muted' });
    s.rect(cx - 100, 138, 200, 56, { rx: 10, fill: 'blue', fillOpacity: 0.14, color: 'blue', sw: 1.6 });
    s.text(cx, 158, g, { size: 13, bold: true });
    s.text(cx, 178, sub, { size: 11 });
    s.line(cx, 196, cx, 238, { sw: 1, color: 'muted' });
  });
  s.rect(30, 240, 660, 50, { rx: 10, fill: 'fill', color: 'muted', sw: 1.2 });
  s.text(360, 258, 'Provinces: all other subjects and residuary powers', { size: 12 });
  s.text(360, 278, 'Princely states: all subjects not given to the Union', { size: 11, muted: true });
  return s.visual(alt, caption);
}

// ================================================================ t01 The Cabinet Mission Plan (1946)
Q('m_cm_members', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Which three British cabinet members made up the Cabinet Mission that reached India in March 1946?',
  opts: ['Pethick-Lawrence, Stafford Cripps and A. V. Alexander', 'Attlee, Churchill and Wavell', 'Mountbatten, Radcliffe and Linlithgow', 'Simon, Irwin and Willingdon'],
  sol: 'The Mission was Lord Pethick-Lawrence (Secretary of State for India), Sir Stafford Cripps and A. V. Alexander. Attlee was Prime Minister; Mountbatten came as Viceroy in 1947; Simon led the commission of 1927.',
}));
Q('m_cm_date', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'On which date was the Cabinet Mission\'s plan for India\'s constitutional future announced?',
  opts: ['16 May 1946', '3 June 1947', '16 August 1946', '20 February 1947'],
  sol: 'The plan was announced on 16 May 1946. 3 June 1947 is the Mountbatten Plan, 16 August 1946 the Direct Action Day and 20 February 1947 Attlee\'s statement.',
}));
Q('m_cm_union_subjects', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'An imagined official in 1946 sorts government work into piles for the proposed Union of India and for the provinces. Under the Cabinet Mission Plan, which pile belongs to the Union?',
  opts: ['Defence, foreign affairs and communications', 'Education, health and agriculture', 'Land revenue, police and local government', 'All subjects, leaving nothing to the provinces'],
  sol: 'The Union was to deal only with defence, foreign affairs and communications, with power to raise the finances these needed. All other subjects and residuary powers stayed with the provinces.',
}));
Q('m_cm_residuary', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'An imagined provincial minister in 1946 asks which level of government would control a new matter not named in any list, such as a tax on cinema shows. Under the Cabinet Mission Plan, where would this residuary power lie?',
  opts: ['With the provinces', 'With the Union of India', 'With the British Parliament', 'With the princely states alone'],
  sol: 'Residuary powers were to remain with the provinces, keeping the Union weak and limited to three subjects. This was meant to reassure provinces that feared a strong centre.',
}));
Q('m_cm_section_b', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'Which provinces formed Section B in the Cabinet Mission\'s grouping scheme?',
  opts: ['Punjab, the North-West Frontier Province and Sind', 'Bengal and Assam', 'Madras, Bombay and the United Provinces', 'Bihar, Orissa and the Central Provinces'],
  sol: 'Section B was the north-western provinces: Punjab, the NWFP and Sind. Bengal and Assam formed Section C; Madras, Bombay, UP, Bihar, CP and Orissa formed Section A.',
}));
Q('m_cm_pakistan', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'What did the Cabinet Mission Plan propose about the demand for a separate, fully sovereign Pakistan?',
  opts: ['It did not accept it and proposed a single Union with groups of provinces instead', 'It accepted it and drew the boundary at once', 'It left the question to the princely states', 'It asked the United Nations to decide'],
  sol: 'The Mission rejected a fully sovereign Pakistan and offered a loose Union with groups of provinces as a compromise. The boundary of partition came only with the 1947 plan and the boundary commission.',
}));
Q('m_cm_ca_election', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'How were the members from the British Indian provinces to be chosen for the Constituent Assembly under the Cabinet Mission Plan?',
  opts: ['By the elected provincial legislative assemblies, seats being shared among communities by population', 'By direct election by all adult citizens', 'By nomination by the Viceroy', 'By the rulers of the princely states'],
  sol: 'Provincial assemblies were to elect the members by proportional representation, with seats divided among the General, Muslim and Sikh communities roughly by population. There was no direct adult-franchise election.',
}));
Q('m_cm_states', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'The imagined ruler of a small princely state reads the 1946 plan with his adviser. What does the plan allow his state to do?',
  opts: ['They would keep all subjects not handed to the Union and could negotiate their entry', 'They would be abolished and merged with provinces at once', 'They would come under the direct rule of the British Parliament', 'They would form Section C of the scheme'],
  sol: 'The states were to keep every subject and power not ceded to the Union, and to negotiate their place in it. They were not abolished, and Section C was Bengal and Assam.',
}));
Q('m_cm_scenario_province', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'An imagined student sorts provinces for a class chart on the 1946 plan. Into which Section should she place Assam?',
  opts: ['Section C, together with Bengal', 'Section A, with Madras and Bombay', 'Section B, with Punjab and Sind', 'No Section, because Assam was a princely state'],
  sol: 'Assam was grouped with Bengal in Section C. Section A held the Hindu-majority provinces, Section B the north-western provinces, and Assam was a province, not a princely state.',
}));
Q('m_dad_date', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'On which day did the Muslim League observe Direct Action Day after withdrawing its acceptance of the Cabinet Mission Plan?',
  opts: ['16 August 1946', '15 August 1947', '9 December 1946', '2 September 1946'],
  sol: 'Direct Action Day was 16 August 1946. 15 August 1947 is Independence Day, 9 December 1946 the first meeting of the Constituent Assembly and 2 September 1946 the start of the interim government.',
}));
Q('m_interim_formed', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'When was the interim government proposed by the Cabinet Mission sworn in, with Jawaharlal Nehru at its head?',
  opts: ['September 1946', 'March 1946', 'June 1947', 'January 1948'],
  sol: 'The interim government took office on 2 September 1946, with Nehru as Vice-President of the Viceroy\'s Executive Council. The Muslim League joined it in October 1946.',
}));
Q('m_cm_scenario_opt', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'In an imagined debate on the 1946 plan, a speaker says a province placed in a group should be able to leave it later. Which provision of the plan supports this speaker?',
  opts: ['A province could opt out of its group after the first general election under the new constitution', 'A province could leave the Union at any time by a vote of its governor', 'Provinces had no choice once grouped', 'Only princely states could change groups'],
  sol: 'The plan allowed a province to come out of its group after the first general elections under the new constitution. Provinces could not leave the Union at will, and the provision was about provinces, not states.',
}));
Q('ar_cm_weak_centre', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'The Cabinet Mission Plan gave the Union of India only three subjects.',
  r: 'The Mission wanted to reassure provinces that feared a strong central government while keeping India united.',
  sol: 'Both are true, and R explains A: a weak Union with only defence, foreign affairs and communications was the compromise meant to keep the country together without a strong centre.',
}));
Q('ar_cm_direct_election', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'A-false-R-true',
  a: 'Under the Cabinet Mission Plan the Constituent Assembly was to be elected directly by all adult Indians.',
  r: 'The plan provided for an interim government of Indian leaders while the constitution was being made.',
  sol: 'A is false: the provincial assemblies, not the voters directly, were to elect the members. R is true: an interim government of Indian leaders was part of the plan.',
}));
Q('tf_cm_union_three', tf({
  t: 1, d: 1, c: 'recall', ans: true,
  stem: 'True or false? The Cabinet Mission Plan proposed that the Union of India would include both British India and the princely states.',
  sol: 'True. The Union was to embrace both British India and the princely states, dealing with defence, foreign affairs and communications.',
}));
Q('tf_dad_accept', tf({
  t: 1, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? The Muslim League called for Direct Action Day while it still accepted the Cabinet Mission Plan.',
  sol: 'False. The League first accepted the plan, then withdrew its acceptance in July 1946 and called for Direct Action Day on 16 August 1946.',
}));
Q('fb_cm_sections', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'The Cabinet Mission Plan grouped the provinces into ___ sections, named A, B and C.',
  acc: [['three', '3']],
  sol: 'There were three sections: A (Hindu-majority provinces), B (the north-west) and C (Bengal and Assam).',
}));
Q('mt_cm_sections', match({
  t: 1, d: 2, c: 'application',
  stem: 'Match each province with the Section of the 1946 grouping scheme in which it was placed.',
  pairs: [
    ['Bombay', 'Section A'],
    ['Sind', 'Section B'],
    ['Bengal', 'Section C'],
    ['Orissa', 'Section A, with the other Hindu-majority provinces'],
  ],
  sol: 'Bombay and Orissa were in Section A, Sind in Section B (north-west), and Bengal in Section C with Assam.',
}));
Q('s_cm_two_clauses', short({
  t: 1, d: 1, c: 'recall', marks: 2, wl: S2,
  stem: 'State any two clauses of the Cabinet Mission Plan about the structure of the Union.',
  model: '1. A **Union of India** of British India and the **princely states**, handling **defence, foreign affairs and communications**.\n2. **Residuary** and all other powers with the **provinces**, which could form **groups** (Sections A, B and C).',
  sol: 'Any two structural clauses.',
  scheme: [['First clause', 1], ['Second clause', 1]],
}));
Q('s_cm_ca_two', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Give two provisions of the 1946 plan about the body that would frame India\'s constitution.',
  model: '1. A **Constituent Assembly** whose provincial members were **elected by the provincial assemblies** by proportional representation.\n2. Seats shared among the **General, Muslim and Sikh** communities by population, with **princely states** also represented.',
  sol: 'Election by assemblies; seats by community and population; states represented.',
  scheme: [['How members were chosen', 1], ['How seats were shared', 1]],
}));
Q('s_interim_two', short({
  t: 1, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'An imagined newspaper of 3 September 1946 reports that Indian leaders have just taken charge of the government departments. Identify this body and say when it took office.',
  model: 'It was a government of **Indian leaders** holding the portfolios of the Viceroy\'s **Executive Council** while the constitution was framed. It took office on **2 September 1946**, headed by **Jawaharlal Nehru**.',
  sol: 'Meaning and date.',
  scheme: [['Meaning', 1], ['Date and head', 1]],
}));
Q('s_dad_two', short({
  t: 1, d: 2, c: 'analysis', marks: 2, wl: S2,
  stem: 'Explain how the Muslim League\'s response to the Cabinet Mission Plan changed between June and August 1946.',
  model: 'The League first **accepted** the plan in **June 1946**, but after disputes over its meaning it **withdrew** its acceptance in **July** and called for **Direct Action Day** on **16 August 1946**, which was followed by **serious violence**.',
  sol: 'Acceptance, withdrawal, Direct Action Day.',
  scheme: [['Acceptance and withdrawal', 1], ['Direct Action Day and its effect', 1]],
}));
Q('s_cm_why_groups', short({
  t: 1, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: 'Why did the Cabinet Mission propose grouping the provinces into Sections A, B and C?',
  model: 'Grouping let the **Muslim-majority** provinces of the north-west and east act together on many subjects, meeting some of the League\'s concerns, while keeping a **single Union** and so **avoiding partition**.',
  sol: 'Reassure Muslim-majority provinces; keep one Union.',
  scheme: [['Concerns of Muslim-majority provinces', 1], ['Keeping India united', 1]],
}));
Q('s3_cm_three_clauses', short({
  t: 1, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Describe three clauses of the Cabinet Mission Plan other than those about the Constituent Assembly.',
  model: '1. **Union of India** of British India and the states, for **defence, foreign affairs and communications**.\n2. **Groups:** provinces placed in **Sections A, B and C**, free to form groups with their own executives and legislatures.\n3. **Interim government** of Indian leaders, and **rejection** of a fully sovereign **Pakistan**.',
  sol: 'Three distinct clauses.',
  scheme: [['First clause', 1], ['Second clause', 1], ['Third clause', 1]],
}));
Q('s3_cm_fail', short({
  t: 1, d: 4, c: 'evaluation', marks: 3, wl: S3,
  stem: 'Why did the Cabinet Mission Plan, accepted at first by both major parties, fail to settle the future of India? Give three reasons.',
  model: '1. The parties **read the grouping clauses differently**: one saw grouping as **compulsory**, the other as **optional**.\n2. The League **withdrew its acceptance** in **July 1946** and called **Direct Action Day**, after which **violence** spread.\n3. Distrust deepened in the **interim government**, so the plan\'s idea of **one Union** could not be carried out.',
  sol: 'Differing interpretations; withdrawal and violence; distrust.',
  scheme: [['Differing interpretations', 1], ['Withdrawal and violence', 1], ['Distrust in the interim government', 1]],
}));
Q('l_cm_full', long({
  t: 1, d: 3, c: 'understanding', marks: 10, wl: L10,
  stem: 'Answer the following about the Cabinet Mission of 1946.\n\n(i) Who were the members of the Cabinet Mission, and when did it announce its plan? **[3]**\n(ii) State three clauses of the plan about the Union and the provinces. **[3]**\n(iii) State four clauses of the plan about the Constituent Assembly, the princely states and the interim government. **[4]**',
  model: '(i) The Mission was **Lord Pethick-Lawrence**, the Secretary of State for India, **Sir Stafford Cripps** and **A. V. Alexander**. It reached India in **March 1946** and announced its plan on **16 May 1946**.\n\n(ii) A **Union of India** of British India and the **princely states** would handle **defence, foreign affairs and communications**. All other subjects and **residuary powers** would stay with the **provinces**. The provinces were placed in **three sections (A, B, C)** and could form **groups**.\n\n(iii) A **Constituent Assembly** would be elected by the **provincial assemblies**, seats being shared by **community and population**. The **princely states** would also send members and would keep all subjects not given to the Union. An **interim government** of Indian leaders would run the country meanwhile. A fully sovereign **Pakistan** was **not accepted**.',
  sol: 'Members and date; Union and provinces; Assembly, states, interim government.',
  scheme: [['(i) Three members', 2], ['(i) Date of the plan', 1], ['(ii) Three clauses', 3], ['(iii) Four clauses', 4]],
}));
Q('l_cm_aftermath', long({
  t: 1, d: 4, c: 'analysis', marks: 10, wl: L10,
  stem: 'Answer the following about the period after the Cabinet Mission Plan.\n\n(i) How did the two major parties respond to the plan at first? **[3]**\n(ii) Why did the Muslim League withdraw its acceptance, and what did it call for? **[3]**\n(iii) Explain how the events of August–December 1946 made the plan harder to carry out. **[4]**',
  model: '(i) Both parties gave a **qualified acceptance**. The **Muslim League** accepted the plan in **June 1946**, seeing the groups as a step towards its aims. The **Congress** accepted the plan for the **Constituent Assembly**, but with its own reading of the **grouping** clauses.\n\n(ii) After statements suggesting the Assembly would not be bound by the grouping scheme, the League feared its interests would not be protected. In **July 1946** it **withdrew** its acceptance and called for **Direct Action Day** on **16 August 1946**.\n\n(iii) **Violence** broke out in **Calcutta** and spread to other places, causing great suffering to people of **all communities**. The **interim government** took office in **September** without the League, which joined only in **October** amid distrust. The League **boycotted** the **Constituent Assembly** when it met on **9 December 1946**, so the idea of one agreed Union faded.',
  sol: 'Responses; withdrawal and Direct Action; violence, distrust and boycott.',
  scheme: [['(i) League response', 1.5], ['(i) Congress response', 1.5], ['(ii) Reason for withdrawal', 1.5], ['(ii) Direct Action Day', 1.5], ['(iii) Violence', 1], ['(iii) Interim government distrust', 1.5], ['(iii) Boycott of the Assembly', 1.5]],
}));
Q('l_cm_scheme_chart', long({
  t: 1, d: 3, c: 'application', marks: 10, wl: L10,
  stem: 'Study the chart of the three-tier scheme drawn by SOYL (shown with this question) and answer the following.\n\n(i) Name the three subjects given to the top tier and say what it included. **[3]**\n(ii) Name the provinces placed in Sections B and C. **[3]**\n(iii) Explain how the scheme tried to satisfy both the Congress and the Muslim League. **[4]**',
  model: '(i) The top tier was the **Union of India**, which would include both **British India** and the **princely states**. It was given only three subjects: **defence**, **foreign affairs** and **communications**, with the power to raise the money needed for them.\n\n(ii) **Section B** grouped the north-western provinces: **Punjab**, the **North-West Frontier Province** and **Sind**. **Section C** grouped the eastern provinces of **Bengal** and **Assam**. Both sections had Muslim majorities or large Muslim populations.\n\n(iii) For the **Congress**, the scheme kept **one Union** of the whole country, **rejected partition**, and gave India a single **Constituent Assembly** to frame its constitution. For the **League**, the **weak centre** with only three subjects, the **residuary powers** left with the provinces, and the right of Muslim-majority provinces to act together in **groups** with their own legislatures offered **protection** that came close to its demand, without dividing the country.',
  sol: 'Read the chart: top tier; sections; balance.',
  scheme: [['(i) Union and what it included', 1], ['(i) Three subjects', 2], ['(ii) Section B', 1.5], ['(ii) Section C', 1.5], ['(iii) For the Congress', 2], ['(iii) For the League', 2]],
  assets: [schemeSvg('Chart of the Cabinet Mission scheme: at the top, the Union of India of British India and the princely states, handling defence, foreign affairs and communications; below it three sections, A for the Hindu-majority provinces, B for the north-west provinces and C for Bengal and Assam; at the base, provinces with all other subjects and residuary powers, and princely states with all subjects not given to the Union', 'Schematic drawn by SOYL; not to scale.')],
}));
Q('sb_cm_diary', source({
  t: 1, d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the extract from the imagined diary of a junior clerk in Delhi and answer the questions that follow. ${IMAG}`,
  passage: '**Diary of an imagined clerk in a government office, New Delhi, 1946**\n\n17 May. Everyone in the office is reading the newspapers about the plan of the three visiting ministers. The centre will look after only the army, foreign affairs and the posts and railways; the rest stays with the provinces. My colleague from Lahore says his province will sit with Sind and the Frontier. 3 September. A new Indian council has taken charge of the departments today. 9 December. The assembly that will write the constitution held its first meeting, but many benches were empty.',
  parts: [
    child('a', short({ t: 1, d: 1, c: 'recall', marks: 1, stem: 'Which plan is the clerk reading about on 17 May?', model: 'The **Cabinet Mission Plan** of **16 May 1946**.', sol: 'The Cabinet Mission Plan.', scheme: [['Cabinet Mission Plan', 1]] })),
    child('b', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'In which Section of the plan would the colleague\'s province "sit with Sind and the Frontier"?', model: '**Section B** (Punjab, the NWFP and Sind).', sol: 'Section B.', scheme: [['Section B', 1]] })),
    child('c', short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): What was the "new Indian council" of 3 September, and why was it formed?', model: 'The **interim government** headed by **Jawaharlal Nehru**, which took office on **2 September 1946**. The plan provided for Indian leaders to run the government **while the constitution was being framed**.', sol: 'Interim government; purpose.', scheme: [['Interim government named', 1], ['Why it was formed', 1]] }), [
      short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Why might "many benches" have been empty at the meeting of 9 December 1946?', model: 'The **Muslim League** had withdrawn its acceptance of the plan and **boycotted** the **Constituent Assembly**, so its elected members did not attend the **first meeting**.', sol: 'League boycott.', scheme: [['League had withdrawn acceptance', 1], ['Boycott of the Assembly', 1]] }),
    ]),
  ],
}));

// ================================================================ t02 The Mountbatten Plan: clauses and acceptance
Q('m_attlee_deadline', mcq({
  t: 2, d: 2, c: 'recall',
  stem: 'In February 1947, by which date did the British Prime Minister say power would be transferred to Indian hands?',
  opts: ['June 1948', 'August 1947', 'January 1950', 'December 1946'],
  sol: 'Attlee\'s statement of 20 February 1947 set June 1948 as the latest date. Power was in fact transferred earlier, on 15 August 1947.',
}));
Q('m_mb_date', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'On which date was the plan of Lord Mountbatten for the transfer of power announced?',
  opts: ['3 June 1947', '16 May 1946', '18 July 1947', '20 February 1947'],
  sol: 'The Mountbatten Plan was announced on 3 June 1947. 16 May 1946 is the Cabinet Mission Plan, 18 July 1947 the royal assent to the Independence Act and 20 February 1947 Attlee\'s statement.',
}));
Q('m_mb_punjab_bengal', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'How was the question of dividing Punjab and Bengal to be decided under the 3 June plan?',
  opts: ['Members of each provincial assembly would meet in two parts, by Muslim-majority and other districts, and vote', 'The Viceroy would decide alone', 'A referendum of all adults in India would decide', 'The princely states would decide'],
  sol: 'Each assembly was to meet in two parts, representing the Muslim-majority districts and the rest; if either part voted for partition, the province would be divided. No all-India referendum was held.',
}));
Q('m_mb_referendum', mcq({
  t: 2, d: 2, c: 'recall',
  stem: 'In which two areas did the 3 June 1947 plan provide for a referendum to decide which dominion they would join?',
  opts: ['The North-West Frontier Province and the Sylhet district of Assam', 'Punjab and Bengal', 'Hyderabad and Kashmir', 'Sind and Baluchistan'],
  sol: 'Referendums were held in the NWFP and in Sylhet. Punjab and Bengal decided through their assemblies; Sind through its assembly; princely states such as Hyderabad and Kashmir were left to choose.',
}));
Q('m_mb_boundary', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'After the Punjab assembly votes for division in June 1947, an imagined district officer asks who will decide which villages go to which dominion. What does the 3 June plan provide?',
  opts: ['A boundary commission to mark the new borders', 'A new Cabinet Mission', 'A Round Table Conference', 'An election commission for the princely states'],
  sol: 'A boundary commission was to demarcate the border within Punjab and Bengal; it was headed by Sir Cyril Radcliffe. The other bodies played no part in drawing the boundary.',
}));
Q('m_mb_states', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'In July 1947 the imagined dewan of a princely state asks what choice the plan announced in June leaves his ruler. What is the answer?',
  opts: ['They could join either India or Pakistan', 'They had to join India', 'They had to join Pakistan', 'They would stay under British rule'],
  sol: 'With British paramountcy ending, the princely states were free to join either dominion. In practice they were advised to join the one to which they were geographically linked.',
}));
Q('m_mb_scenario_sylhet', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'An imagined teacher in Shillong in July 1947 tells her class that people in one district of their province will vote on which country to join. Which district is she describing?',
  opts: ['Sylhet', 'Lahore', 'Dacca', 'Peshawar'],
  sol: 'Sylhet, a Muslim-majority district of Assam, decided by referendum. Lahore was in Punjab, Dacca in Bengal and Peshawar in the NWFP, which held its own referendum but is not in Assam.',
}));
Q('m_mb_reason_violence', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'Which reason best explains why many Congress leaders agreed to the partition plan of 1947?',
  opts: ['Widespread communal violence and a deadlocked interim government made an early, agreed transfer seem the lesser evil', 'They believed partition would be reversed within a year', 'The princely states had demanded partition', 'The British had refused to leave India without it'],
  sol: 'Leaders accepted partition reluctantly because violence was spreading and the interim government could not work as a team, so an early, agreed transfer of power seemed better than continued conflict. The other options are not supported.',
}));
Q('m_mb_advance', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'An imagined news-sheet of June 1947 reports that the date for handing over power has been brought forward. To which date was it brought forward?',
  opts: ['15 August 1947', '30 June 1948', '26 January 1950', '1 April 1947'],
  sol: 'The transfer was advanced from June 1948 to 15 August 1947. 26 January 1950 is when the Constitution came into force.',
}));
Q('m_mb_dominion', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'In what form was power to be transferred under the 3 June plan?',
  opts: ['To two dominions, India and Pakistan', 'To one federation including all princely states', 'To the provinces separately', 'To the United Nations for a period of trust'],
  sol: 'Power was to pass to two dominions, India and Pakistan, each with its own Constituent Assembly. The other options do not describe the plan.',
}));
Q('ar_mb_assemblies', ar({
  t: 2, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'Under the 3 June plan the Punjab and Bengal assemblies met in two parts to vote on partition.',
  r: 'Each of these provinces had Muslim-majority districts and districts where others were in a majority.',
  sol: 'Both are true, and R explains A: because each province had districts of both kinds, its assembly was split into two parts so that each could decide whether to divide the province.',
}));
Q('ar_mb_gandhi', ar({
  t: 2, d: 3, c: 'analysis', verdict: 'both-true-not-explains',
  a: 'The transfer of power was advanced from June 1948 to August 1947.',
  r: 'Lord Mountbatten replaced Lord Wavell as Viceroy in March 1947.',
  sol: 'Both are true, but R does not explain A. The date was advanced because of the worsening situation and the need for an early settlement; the change of Viceroy is a separate fact.',
}));
Q('tf_mb_referendum_bengal', tf({
  t: 2, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? The 3 June plan provided for a referendum of all the people of Bengal on partition.',
  sol: 'False. In Bengal and Punjab the decision lay with the assembly members voting in two parts; referendums were held only in the NWFP and Sylhet.',
}));
Q('fb_mb_viceroy', fb({
  t: 2, d: 1, c: 'recall',
  stem: 'Lord ___ was the Viceroy who announced the plan of 3 June 1947 for the transfer of power.',
  acc: [['Mountbatten', 'Louis Mountbatten']],
  sol: 'Lord Mountbatten, who became Viceroy in March 1947, announced the plan; it is named after him.',
}));
Q('ord_1946_47', ord({
  t: 2, d: 2, c: 'application', marks: 1,
  stem: 'Arrange these events of 1946–47 in the order in which they happened.',
  items: ['The Cabinet Mission Plan is announced', 'Direct Action Day', 'Attlee announces the British will leave by June 1948', 'The Mountbatten Plan is announced'],
  sol: 'May 1946 plan, August 1946 Direct Action Day, February 1947 Attlee\'s statement, June 1947 Mountbatten Plan.',
}));
Q('s_mb_two_clauses', short({
  t: 2, d: 1, c: 'recall', marks: 2, wl: S2,
  stem: 'State any two clauses of the Mountbatten Plan of 3 June 1947.',
  model: '1. British India would be **divided** into two **dominions**, **India** and **Pakistan**.\n2. The **Punjab and Bengal** assemblies would meet in **two parts** and vote on **partitioning** their provinces.',
  sol: 'Any two clauses.',
  scheme: [['First clause', 1], ['Second clause', 1]],
}));
Q('s_attlee_two', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'What did the British Prime Minister announce on 20 February 1947, and why was it important?',
  model: 'He announced that Britain would **transfer power** to Indian hands by **June 1948**. It made the British **departure certain** and pressed Indian parties to reach a **settlement** quickly.',
  sol: 'Announcement and importance.',
  scheme: [['Announcement', 1], ['Importance', 1]],
}));
Q('s_mb_reasons_two', short({
  t: 2, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: 'Give two reasons why the Congress accepted the plan of 3 June 1947.',
  model: '1. **Communal violence** was spreading and leaders feared **civil war**.\n2. The **interim government** could not work as a team, so an **early, agreed transfer** of power seemed the lesser evil.',
  sol: 'Any two reasons.',
  scheme: [['First reason', 1], ['Second reason', 1]],
}));
Q('s_mb_nwfp_sylhet', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'How were the futures of the North-West Frontier Province and the Sylhet district to be settled under the 1947 plan?',
  model: 'Both were to decide by a **referendum** of their people. The **NWFP** voted to join **Pakistan**, and **Sylhet**, a district of **Assam**, also voted to join **Pakistan**.',
  sol: 'Referendum; outcomes.',
  scheme: [['Referendum', 1], ['Outcomes', 1]],
}));
Q('s3_mb_three_clauses', short({
  t: 2, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Describe three clauses of the Mountbatten Plan about how areas would choose between India and Pakistan.',
  model: '1. **Punjab and Bengal:** assembly members of Muslim-majority districts and of the others would vote **separately**; a vote for division by either part would **partition** the province.\n2. **Sind** would decide through its assembly; the **NWFP** and **Sylhet** through **referendums**.\n3. **Princely states** were free to join **either dominion**.',
  sol: 'Three distinct clauses.',
  scheme: [['Punjab and Bengal', 1], ['Sind, NWFP and Sylhet', 1], ['Princely states', 1]],
}));
Q('l_mb_full', long({
  t: 2, d: 3, c: 'understanding', marks: 10, wl: L10,
  stem: 'Answer the following about the plan of 3 June 1947.\n\n(i) What had the British Prime Minister announced in February 1947, and who became Viceroy soon after? **[3]**\n(ii) State three clauses of the Mountbatten Plan. **[3]**\n(iii) Give four reasons why the Congress accepted the plan. **[4]**',
  model: '(i) On **20 February 1947** **Attlee** announced that Britain would **transfer power** by **June 1948**. Soon after, in **March 1947**, **Lord Mountbatten** took over from **Lord Wavell** as the new Viceroy.\n\n(ii) British India would be divided into **two dominions**, **India** and **Pakistan**. The **Punjab and Bengal** assemblies would vote in **two parts** on **partition**, and a **boundary commission** would mark the borders. **Referendums** would be held in the **NWFP** and **Sylhet**, and **princely states** could join **either** dominion.\n\n(iii) **Communal violence** was spreading, and leaders feared **civil war**. The **interim government** could not function as a team. An **early transfer** of power, on **15 August 1947**, would end British rule quickly. Many leaders saw partition as the **lesser evil** that would leave a strong, united India in the rest of the country.',
  sol: 'Background; clauses; reasons for acceptance.',
  scheme: [['(i) Attlee statement', 2], ['(i) Mountbatten as Viceroy', 1], ['(ii) Three clauses', 3], ['(iii) Four reasons', 4]],
}));
Q('l_mb_choices', long({
  t: 2, d: 4, c: 'evaluation', marks: 10, wl: L10,
  stem: 'Answer the following about the decisions of 1947.\n\n(i) Explain how the plan of 3 June 1947 differed from the Cabinet Mission Plan on the unity of India. **[3]**\n(ii) Explain the role of the boundary commission. **[3]**\n(iii) "Partition was accepted as the lesser of two evils." Give two arguments that support this view and two concerns raised by its critics. **[4]**',
  model: '(i) The **Cabinet Mission Plan** proposed **one Union** with groups of provinces and **rejected** a separate Pakistan. The **3 June plan** accepted **partition** into **two dominions**, with Punjab and Bengal also divided if their assemblies so voted.\n\n(ii) Once **Punjab** and **Bengal** chose division, a **boundary commission** headed by **Sir Cyril Radcliffe** was to mark the new **borders** between the dominions, district by district, on the basis of **contiguous majority areas** and other factors.\n\n(iii) **Support:** it offered an **early, peaceful transfer** of power when violence was spreading; and it ended the **deadlock** in the interim government, allowing a **strong central government** in India. **Concerns:** it **divided provinces** and families and led to **mass migration** and **suffering**; and many felt it went against the idea of a **united, secular** India for which the national movement had worked.',
  sol: 'Contrast; boundary commission; balanced evaluation.',
  scheme: [['(i) Cabinet Mission position', 1.5], ['(i) 3 June plan position', 1.5], ['(ii) When and who', 1.5], ['(ii) What it did', 1.5], ['(iii) Two supporting arguments', 2], ['(iii) Two concerns', 2]],
}));
Q('sb_mb_letter', source({
  t: 2, d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the extract from an imagined letter and answer the questions that follow. ${IMAG}`,
  passage: '**Letter from an imagined schoolteacher in Amritsar to her brother in Bombay, June 1947**\n\nBrother, the radio has given the news we feared. The country will become two, and our own province may be cut in two as well: the members of our assembly will sit in two groups and vote. Some say a commission will then draw the line through the villages. Our neighbours of every faith are anxious. The leaders say it is better to end the fighting and the quarrels in Delhi and take freedom now than to wait another year. I am not sure what to think.',
  parts: [
    child('a', short({ t: 2, d: 1, c: 'recall', marks: 1, stem: 'Which plan of June 1947 is the "news we feared" in the letter?', model: 'The **Mountbatten Plan** of **3 June 1947**.', sol: 'The Mountbatten Plan.', scheme: [['Mountbatten Plan', 1]] })),
    child('b', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'What is the "commission" that will "draw the line through the villages"?', model: 'The **boundary commission** (headed by **Radcliffe**) that would mark the new border in **Punjab**.', sol: 'Boundary commission.', scheme: [['Boundary commission', 1]] })),
    child('c', short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Which two reasons for accepting the plan does the letter mention?', model: 'To **end the fighting**, that is the **communal violence**; and to end the **quarrels in Delhi**, meaning the **deadlock** in the **interim government**, so that freedom could come **early**.', sol: 'Violence; deadlock and early freedom.', scheme: [['End the violence', 1], ['End the deadlock and take freedom early', 1]] }), [
      short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Explain the procedure by which "our own province may be cut in two".', model: 'The **Punjab assembly** would meet in **two parts**, members from **Muslim-majority districts** and the **rest**. If **either part** voted for division, the province would be **partitioned**.', sol: 'Two parts; either votes for division.', scheme: [['Assembly in two parts', 1], ['Effect of the vote', 1]] }),
    ]),
  ],
}));

// ================================================================ t03 The Indian Independence Act, 1947
Q('m_iia_assent', mcq({
  t: 3, d: 2, c: 'recall',
  stem: 'In which month of 1947 did the Indian Independence Act, passed by the British Parliament, receive the royal assent?',
  opts: ['July', 'March', 'June', 'October'],
  sol: 'The Act received the royal assent on 18 July 1947 and took effect on 15 August 1947. The plan it put into law had been announced in June.',
}));
Q('m_iia_dominions', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'On 15 August 1947 an imagined student writes in her diary what the new law from London has just created. Which entry is correct according to the Indian Independence Act?',
  opts: ['Two independent dominions, India and Pakistan', 'A single federation of India and the states', 'An Indian republic with an elected President', 'A British-controlled interim council'],
  sol: 'Two independent dominions came into being on 15 August 1947. India became a republic only on 26 January 1950.',
}));
Q('m_iia_paramountcy', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'What did the Indian Independence Act provide about British paramountcy over the princely states?',
  opts: ['It would lapse, ending British authority over them', 'It would pass to the Government of India', 'It would pass to the Government of Pakistan', 'It would continue until 1950'],
  sol: 'Paramountcy lapsed on 15 August 1947; it was not transferred to either dominion. The states then decided on accession.',
}));
Q('m_iia_sos', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Which British office concerned with India was abolished by the Indian Independence Act?',
  opts: ['The Secretary of State for India', 'The Prime Minister of Britain', 'The Governor-General', 'The Speaker of the House of Commons'],
  sol: 'The office of the Secretary of State for India was abolished. Each dominion kept a Governor-General, and the British offices of Prime Minister and Speaker were not affected.',
}));
Q('m_iia_ca_role', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'In late 1947 an imagined journalist notices that the body writing India\'s constitution is also passing ordinary laws. Which provision of the Indian Independence Act explains this?',
  opts: ['It could frame the constitution and also act as the dominion\'s legislature', 'It could only advise the Governor-General', 'It could only choose the Prime Minister', 'It had no power until the British Parliament approved its laws'],
  sol: 'Each Constituent Assembly was to frame a constitution and also act as the legislature, with full power to make laws. The British Parliament lost its authority over the dominions.',
}));
Q('m_iia_interim_law', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'An imagined official in Delhi in September 1947 needs to know which law still governs the working of the new government until India\'s own constitution is ready. What should she consult?',
  opts: ['The Government of India Act, 1935, as adapted', 'The Cabinet Mission Plan of 1946', 'The Queen\'s Proclamation of 1858', 'The Constitution of 1950'],
  sol: 'Until new constitutions were made, each dominion was governed by the Government of India Act, 1935, with necessary changes. The plan of 1946 was not a law, and the Constitution came only in 1950.',
}));
Q('m_iia_gg', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'An imagined student says that after 15 August 1947 the head of state of each new dominion was a Governor-General. Which provision of the Act is she describing?',
  opts: ['Each dominion would have a Governor-General appointed by the Crown on the advice of its own cabinet', 'The British Prime Minister would govern both dominions', 'The Secretary of State for India would remain head of both', 'The President of the Constituent Assembly would be head of state'],
  sol: 'The Act provided a Governor-General for each dominion, appointed on the advice of that dominion\'s cabinet. The Secretary of State\'s office was abolished.',
}));
Q('m_iia_parliament', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: 'Why is the Indian Independence Act seen as ending Britain\'s legal authority over India?',
  opts: ['After 15 August 1947 no law of the British Parliament would apply to the dominions unless they adopted it', 'It made the British monarch the President of India', 'It placed India under the League of Nations', 'It kept the Secretary of State in charge of foreign affairs'],
  sol: 'From the appointed day, the British Parliament could no longer legislate for the dominions, and their own legislatures became sovereign. The other options are wrong.',
}));
Q('ar_iia_paramountcy', ar({
  t: 3, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'After 15 August 1947 the princely states had to decide their future relationship with the dominions.',
  r: 'The Indian Independence Act provided that British paramountcy over the states would lapse.',
  sol: 'Both are true, and R explains A: with paramountcy lapsing, the states were no longer tied to the British Crown and had to choose accession to India or Pakistan.',
}));
Q('ar_iia_republic', ar({
  t: 3, d: 2, c: 'analysis', verdict: 'A-true-R-false',
  a: 'The Indian Independence Act came into force on 15 August 1947.',
  r: 'The Act made India a republic on the same day.',
  sol: 'A is true. R is false: India became a dominion on 15 August 1947 and a republic only on 26 January 1950.',
}));
Q('tf_iia_one_gg', tf({
  t: 3, d: 3, c: 'understanding', ans: true,
  stem: 'True or false? The Indian Independence Act allowed the same person to be Governor-General of both dominions if they so agreed.',
  sol: 'True. The Act permitted a common Governor-General if both dominions wished; in practice India and Pakistan had separate Governors-General.',
}));
Q('fb_iia_date', fb({
  t: 3, d: 1, c: 'recall',
  stem: 'The Indian Independence Act fixed ___ August 1947 as the day on which the two dominions came into being.',
  acc: [['15', 'fifteenth', '15th']],
  sol: 'The appointed day was 15 August 1947.',
}));
Q('s_iia_two_clauses', short({
  t: 3, d: 1, c: 'recall', marks: 2, wl: S2,
  stem: 'State any two clauses of the Indian Independence Act, 1947.',
  model: '1. From **15 August 1947** two independent **dominions**, **India** and **Pakistan**, would come into being.\n2. **British paramountcy** over the **princely states** would **lapse**.',
  sol: 'Any two clauses.',
  scheme: [['First clause', 1], ['Second clause', 1]],
}));
Q('s_iia_ca_two', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'What two roles did the Indian Independence Act give the Constituent Assembly of India?',
  model: '1. To **frame the constitution** of the dominion.\n2. To act as its **legislature** (Parliament), with **full power** to make laws, until the new constitution came into force.',
  sol: 'Constitution-making; legislature.',
  scheme: [['Constitution-making', 1], ['Legislature', 1]],
}));
Q('s_iia_offices_two', short({
  t: 3, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'An imagined clerk in a London ministry learns in August 1947 that his department is closing. Name the office that ended under the Indian Independence Act, and the office that would head each new dominion.',
  model: 'The office of the **Secretary of State for India** was **abolished**. Each dominion would have a **Governor-General**, appointed on the advice of its own **cabinet**.',
  sol: 'Abolished office; kept office.',
  scheme: [['Secretary of State abolished', 1], ['Governor-General for each dominion', 1]],
}));
Q('s_iia_apply', short({
  t: 3, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'An imagined ruler of a small princely state asks his adviser in August 1947 whether the British Crown still protects his state. What should the adviser reply, using the Indian Independence Act?',
  model: 'The adviser should say **no**: the Act ended **British paramountcy** on **15 August 1947**, so the state must now decide whether to **join India or Pakistan**.',
  sol: 'Paramountcy lapsed; choice of accession.',
  scheme: [['Paramountcy lapsed', 1], ['Must choose accession', 1]],
}));
Q('s3_iia_three', short({
  t: 3, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Describe three clauses of the Indian Independence Act other than the creation of two dominions.',
  model: '1. **British paramountcy** over the **princely states** would **lapse**.\n2. Each **Constituent Assembly** would frame a constitution and act as the **legislature**; until then the **Government of India Act, 1935** would apply as adapted.\n3. The office of **Secretary of State for India** would be **abolished**, and each dominion would have a **Governor-General**.',
  sol: 'Three clauses.',
  scheme: [['First clause', 1], ['Second clause', 1], ['Third clause', 1]],
}));
Q('l_iia_full', long({
  t: 3, d: 3, c: 'understanding', marks: 10, wl: L10,
  stem: 'Answer the following about the Indian Independence Act, 1947.\n\n(i) When was the Act passed, and from what date did it take effect? **[3]**\n(ii) State three clauses of the Act about the dominions and their governments. **[3]**\n(iii) State four other clauses of the Act. **[4]**',
  model: '(i) The **British Parliament** passed the Act in **July 1947**, and it received the **royal assent** on **18 July 1947**. It took effect on **15 August 1947**, the appointed day.\n\n(ii) Two independent **dominions**, **India** and **Pakistan**, would come into being. Each would have a **Governor-General** appointed on the advice of its own **cabinet**. The **Constituent Assembly** of each would frame its **constitution** and act as its **legislature**.\n\n(iii) **British paramountcy** over the **princely states** would **lapse**. The office of **Secretary of State for India** would be **abolished**. Until new constitutions were ready, each dominion would be governed by the **Government of India Act, 1935**, as **adapted**. The **British Parliament** would have no power to make laws for the dominions after the appointed day.',
  sol: 'Dates; dominions and governments; other clauses.',
  scheme: [['(i) Passing and assent', 2], ['(i) Date of effect', 1], ['(ii) Three clauses', 3], ['(iii) Four clauses', 4]],
}));
Q('l_iia_compare', long({
  t: 3, d: 4, c: 'analysis', marks: 10, wl: L10,
  stem: 'Answer the following.\n\n(i) How did the Indian Independence Act give legal effect to the plan of 3 June 1947? **[3]**\n(ii) Explain what the Act meant for the princely states. **[3]**\n(iii) Explain why the Act is seen as the legal end of British rule in India. **[4]**',
  model: '(i) The **3 June plan** was a political scheme. The Act turned it into **law**: it created the **two dominions**, fixed the appointed day as **15 August 1947**, and provided for the **boundaries** of Punjab and Bengal to be settled by the **boundary commission**.\n\n(ii) The Act ended **British paramountcy**, so the treaties binding the states to the Crown **lapsed**. The states had to decide on their **accession**, and most chose to join **India** or **Pakistan** by signing an **Instrument of Accession**.\n\n(iii) From the appointed day the **British Parliament** could no longer make laws for the dominions. The **Secretary of State for India** disappeared, and power passed to the **Constituent Assemblies** and to **cabinets** responsible to them. The **Governor-General** acted on the advice of Indian ministers, so authority now rested with the **people of India**.',
  sol: 'Legal effect; states; end of British authority.',
  scheme: [['(i) Plan into law', 1], ['(i) Dominions, date, boundaries', 2], ['(ii) Paramountcy lapses', 1.5], ['(ii) Accession', 1.5], ['(iii) Parliament loses power', 1.5], ['(iii) Indian institutions in charge', 2.5]],
}));
Q('sb_iia_minutes', source({
  t: 3, d: 3, c: 'application', origin: 'soyl-original',
  stem: `Read the extract from the imagined minutes of a debating club and answer the questions that follow. ${IMAG}`,
  passage: '**Minutes of an imagined college debating club, Lucknow, August 1947**\n\nThe motion was that the law passed in London last month has truly ended foreign rule. The first speaker noted that from the fifteenth of this month two new countries exist, each with its own assembly to make laws and write a constitution. The second speaker reminded us that the old minister in London who supervised India no longer holds office. A third speaker asked what would happen to the rulers of the states, now that the Crown\'s protection has ended. The motion was carried.',
  parts: [
    child('a', short({ t: 3, d: 1, c: 'recall', marks: 1, stem: 'Name the "law passed in London last month".', model: 'The **Indian Independence Act, 1947**.', sol: 'The Act.', scheme: [['Indian Independence Act', 1]] })),
    child('b', short({ t: 3, d: 2, c: 'application', marks: 1, stem: 'Which office is "the old minister in London who supervised India"?', model: 'The **Secretary of State for India**, abolished by the Act.', sol: 'Secretary of State.', scheme: [['Secretary of State for India', 1]] })),
    child('c', short({ t: 3, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Answer the third speaker\'s question using the provisions of the Act.', model: 'The Act ended **British paramountcy**, so the rulers lost the Crown\'s protection and had to decide their **future**, in practice by **acceding** to **India** or **Pakistan**.', sol: 'Paramountcy lapsed; accession.', scheme: [['Paramountcy ended', 1], ['Decision on accession', 1]] }), [
      short({ t: 3, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Which two clauses of the Act did the first speaker refer to?', model: '1. Two independent **dominions**, India and Pakistan, from **15 August 1947**.\n2. Each **Constituent Assembly** would act as the **legislature** and frame the **constitution**.', sol: 'Two clauses.', scheme: [['Two dominions', 1], ['Constituent Assembly as legislature', 1]] }),
    ]),
  ],
}));

// ================================================================ deck check items (not used in tests)
Q('m_chk_cm_year', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'In which year did the Cabinet Mission come to India?',
  opts: ['1946', '1942', '1947', '1945'],
  sol: 'The Mission arrived in March 1946 and announced its plan in May 1946. 1942 is the Cripps Mission; 1947 the Mountbatten Plan.',
}));
Q('tf_chk_section_c', tf({
  t: 1, d: 2, c: 'application', ans: false,
  stem: 'True or false? In the 1946 grouping scheme, Punjab was placed in Section C.',
  sol: 'False. Punjab was in Section B, with the NWFP and Sind; Section C was Bengal and Assam.',
}));
Q('m_chk_two_parts', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'Under the 3 June 1947 plan, an assembly met in two parts to vote on dividing its province. Which pair of provinces did this apply to?',
  opts: ['Punjab and Bengal', 'Bombay and Madras', 'Sind and the NWFP', 'Assam and Orissa'],
  sol: 'The two-part vote applied to Punjab and Bengal, which had both Muslim-majority and other districts. Sind decided through its whole assembly and the NWFP by referendum.',
}));
Q('fb_chk_radcliffe', fb({
  t: 2, d: 2, c: 'recall',
  stem: 'The boundary commission that drew the line in Punjab and Bengal was headed by Sir Cyril ___.',
  acc: [['Radcliffe']],
  sol: 'Sir Cyril Radcliffe headed the boundary commissions; the award was announced just after independence.',
}));
Q('m_chk_appointed_day', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'Which day did the Indian Independence Act fix as the appointed day for the new dominions?',
  opts: ['15 August 1947', '26 January 1950', '3 June 1947', '18 July 1947'],
  sol: 'The appointed day was 15 August 1947. 3 June is the plan, 18 July the royal assent and 26 January 1950 the Constitution.',
}));
Q('tf_chk_sos', tf({
  t: 3, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? The Indian Independence Act abolished the office of the Secretary of State for India.',
  sol: 'True. With the end of British authority, the office of the Secretary of State for India was abolished.',
}));
Q('m_chk_interim_head', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'Who headed the interim government that took office in September 1946?',
  opts: ['Jawaharlal Nehru', 'Lord Wavell', 'Lord Mountbatten', 'Lord Pethick-Lawrence'],
  sol: 'Jawaharlal Nehru headed the interim government as Vice-President of the Executive Council; Wavell was Viceroy at the time, Mountbatten came in 1947 and Pethick-Lawrence led the Cabinet Mission.',
}));
Q('m_chk_1935_act', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Until India\'s new constitution was ready, which earlier Act was to govern the dominion, with changes?',
  opts: ['The Government of India Act, 1935', 'The Indian Councils Act, 1909', 'The Government of India Act, 1858', 'The Rowlatt Act, 1919'],
  sol: 'The Government of India Act, 1935, as adapted, served as the provisional constitution. The other Acts belonged to earlier periods.',
}));
