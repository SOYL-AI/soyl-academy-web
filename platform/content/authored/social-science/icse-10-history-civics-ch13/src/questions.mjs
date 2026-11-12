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
  t: 1, d: 3, c: 'application',
  stem: 'An imagined province in 1946 plans two things: a free primary-school scheme, and a treaty with a neighbouring country to run a through railway line. Under the Cabinet Mission Plan, how would the two plans be treated?',
  opts: ['The school scheme would be for the province to decide; the railway treaty would fall to the Union, which held foreign affairs and communications', 'Both would be for the province alone, because every subject not named for the Union stayed with the provinces', 'Both would need the Union, because the Union was to look after anything that affected the unity of India', 'The school scheme would go to the group (Section) as a whole, and the treaty to the British Parliament'],
  sol: 'Education was not among the three Union subjects, so it stayed with the province. A treaty with another country is foreign affairs and a through railway is communications, so the Union would act. The residuary rule explains why the school scheme was the province\'s, but it cannot cover the treaty; the Union had no general power over "unity"; and groups dealt only with provincial subjects, never with foreign treaties.',
}));
Q('m_cm_residuary', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'Imagine that in 1950 a disease spreads across several provinces and calls for one common rule on quarantine, a matter named in none of the plan\'s lists. Under the Cabinet Mission Plan, what difficulty would the Union face?',
  opts: ['It would have no power of its own to act, because the matter was not one of its three subjects and residuary powers lay with the provinces', 'It could act only after the British Parliament passed a law for it', 'It could act freely, since residuary powers lay with the Union', 'It would have to deal with the three Section heads, because the Sections controlled every subject not given to the Union'],
  sol: 'The Union was limited to defence, foreign affairs and communications, and residuary powers stayed with the provinces, so on a new matter the Union could only persuade the provinces to cooperate or ask for a change in the arrangements. The British Parliament no longer had a role in such matters; the Union did not hold residuary powers; and the Sections were groups of provinces that acted only on provincial subjects the provinces chose to share, not a layer above the provinces.',
}));
Q('m_cm_section_b', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'Which provinces formed Section B in the Cabinet Mission\'s grouping scheme?',
  opts: ['Punjab, the North-West Frontier Province and Sind', 'Bengal and Assam', 'Madras, Bombay and the United Provinces', 'Bihar, Orissa and the Central Provinces'],
  sol: 'Section B was the north-western provinces: Punjab, the NWFP and Sind. Bengal and Assam formed Section C; Madras, Bombay, UP, Bihar, CP and Orissa formed Section A.',
}));
Q('m_cm_pakistan', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: 'An imagined commentator in May 1946 says that because the Mission rejected a sovereign Pakistan, the League\'s concerns received nothing. Which is the fairest assessment of the plan?',
  opts: ['It refused a sovereign Pakistan but offered groups of provinces with their own executives and legislatures, meeting part of the concern within one Union', 'The commentator is right: the plan left the Muslim-majority provinces under a strong centre, with no groups', 'The commentator is wrong: the plan accepted Pakistan as a dominion, with the boundary to be settled later', 'The commentator is wrong: the plan promised a referendum in the Muslim-majority provinces on Pakistan'],
  sol: 'The plan refused a fully sovereign Pakistan, so the commentator is half right, but it also set up groups with their own executives and legislatures under a weak Union, which met part of the concern. A strong centre without groups was not the plan; the acceptance of two dominions belongs to the plan of June 1947; and the referendums of 1947 were limited to the NWFP and Sylhet.',
}));
Q('m_cm_ca_election', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'How were the members from the British Indian provinces to be chosen for the Constituent Assembly under the Cabinet Mission Plan?',
  opts: ['By the elected provincial legislative assemblies, seats being shared among communities by population', 'By direct election by all adult citizens', 'By nomination by the Viceroy', 'By the rulers of the princely states'],
  sol: 'Provincial assemblies were to elect the members by proportional representation, with seats divided among the General, Muslim and Sikh communities roughly by population. There was no direct adult-franchise election.',
}));
Q('m_cm_states', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'An imagined ruler in 1946 wants his state to enter the Union but to keep control of its own police, its courts and its own post and telegraph service. How does the plan\'s division of subjects affect him?',
  opts: ['He could keep the police and courts, but the post and telegraph service would come under the Union, which was given communications', 'He could keep all three, because states kept every subject unless they chose to hand it over', 'He would have to hand over all three, because the Union was to have power over every subject of the states', 'He could keep none of them, because a state entering the Union lost its own government'],
  sol: 'The states were to keep every subject not ceded to the Union, so police and courts stayed with him. But communications, which covered posts and telegraphs, was one of the three Union subjects for the whole Union, states included. The second option is half right, because it forgets that communications was a Union subject; the third and fourth overstate the Union\'s power, which was limited to three subjects.',
}));
Q('m_cm_scenario_province', mcq({
  t: 1, d: 2, c: 'recall',
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
  t: 1, d: 3, c: 'analysis',
  stem: 'In an imagined debate of 1946 a speaker says: "Once Bengal and Assam sit together in Section C, Assam can never leave it." What is the best assessment of this claim under the plan?',
  opts: ['Partly right: Assam would stay in the group at first, but could come out of it after the first general election under the new constitution', 'Entirely right: the plan fixed every province in its Section permanently', 'Wrong: any province could leave its Section at any time by a vote of its legislature', 'Wrong: only the Section as a whole could decide to dissolve, never a single province'],
  sol: 'The plan did let a province come out of its group, but only after the first general election under the new constitution, so the speaker is right about the early period and wrong about "never". The claim of permanence ignores the provision; the claim of leaving at any time ignores the waiting period; and the plan gave the right of withdrawal to a province, not only to a whole Section.',
}));
Q('ar_cm_weak_centre', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'Under the Cabinet Mission Plan, a Muslim-majority province in Section B would have had more say over its own affairs than it would have had under a Union with a strong centre.',
  r: 'The plan left residuary powers with the provinces and gave the Union only three subjects.',
  sol: 'Both are true, and R explains A: because the Union held only defence, foreign affairs and communications and all other powers stayed with the provinces, a province (and its group) kept control of most subjects, which a strong centre would not have allowed.',
}));
Q('ar_cm_direct_election', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'A-false-R-true',
  a: 'Because the Constituent Assembly under the plan was elected through the provincial assemblies, its members were in effect chosen by every adult in British India.',
  r: 'The provincial assemblies of 1946 had themselves been elected on a limited franchise.',
  sol: 'A is false: the voters of 1946 were only a fraction of the adult population, and the Assembly\'s members were chosen by the assemblies those voters had elected, so the Assembly could not be said to represent every adult directly. R is true and is the reason A fails.',
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
  t: 1, d: 2, c: 'recall',
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
  t: 1, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: 'Under the 1946 plan the Constituent Assembly was elected through the provincial assemblies, not by a new nationwide vote. Give one effect this had on who sat in it, and one advantage of the method for the Mission.',
  model: 'Its members reflected the **provincial assemblies** chosen in 1946 on a **limited franchise**, so not every adult had a say in choosing them. The method was **quick**, since no new country-wide election was needed.',
  sol: 'Limited franchise reflected; speed.',
  scheme: [['Effect on who sat in it', 1], ['Advantage of the method', 1]],
}));
Q('s_interim_two', short({
  t: 1, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: 'An imagined newspaper of 3 September 1946 reports that Indian leaders have taken charge of the Viceroy\'s council departments, but that no member of the Muslim League is among them. What does this absence show about the state of the plan, and what changed in October?',
  model: 'The League had **withdrawn** its acceptance in **July** and stayed out, so the plan\'s idea of a joint government was already **in doubt**. The League **joined** in **October 1946**, but **distrust** inside the government continued.',
  sol: 'League out after withdrawal; joined in October, distrust.',
  scheme: [['Absence linked to the League\'s withdrawal', 1], ['October entry and continuing distrust', 1]],
}));
Q('s_dad_two', short({
  t: 1, d: 2, c: 'analysis', marks: 2, wl: S2,
  stem: 'An imagined commentator says the Cabinet Mission Plan broke down because of the events of 16 August 1946. Another says the break had begun earlier. Which view fits the dates better? Give evidence.',
  model: 'The second view. The League had already **withdrawn** its acceptance in **July**, before **Direct Action Day** on **16 August 1946**, because the two parties read the **grouping** clauses differently. The August violence deepened **distrust** but followed the breakdown.',
  sol: 'Withdrawal in July predates 16 August; grouping dispute; violence followed.',
  scheme: [['Withdrawal in July came before 16 August', 1], ['Dispute over grouping as the earlier cause', 1]],
}));
Q('s_cm_why_groups', short({
  t: 1, d: 3, c: 'evaluation', marks: 2, wl: S2,
  stem: 'A student says the Section scheme gave the Muslim-majority provinces everything the League wanted. Assess this view with one feature that served them and one that fell short.',
  model: 'Only partly. The groups let provinces act together on many subjects under a weak **Union**, which met some concerns. But the plan refused a **sovereign Pakistan** and kept **one Union**, so the League\'s main demand was not met.',
  sol: 'Partly right: groups served; no sovereign Pakistan.',
  scheme: [['A feature that served them', 1], ['A feature that fell short, with a judgement', 1]],
}));
Q('s3_cm_three_clauses', short({
  t: 1, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Describe three clauses of the Cabinet Mission Plan other than those about the Constituent Assembly.',
  model: '1. **Union of India** of British India and the states, for **defence, foreign affairs and communications**.\n2. **Groups:** provinces placed in **Sections A, B and C**, free to form groups with their own executives and legislatures.\n3. **Interim government** of Indian leaders, and **rejection** of a fully sovereign **Pakistan**.',
  sol: 'Three distinct clauses.',
  scheme: [['First clause', 1], ['Second clause', 1], ['Third clause', 1]],
}));
Q('s3_cm_fail', short({
  t: 1, d: 4, c: 'understanding', marks: 3, wl: S3,
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
    child('b', short({ t: 1, d: 2, c: 'recall', marks: 1, stem: 'In which Section of the plan would the colleague\'s province "sit with Sind and the Frontier"?', model: '**Section B** (Punjab, the NWFP and Sind).', sol: 'Section B.', scheme: [['Section B', 1]] })),
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
  t: 2, d: 3, c: 'application',
  stem: 'Suppose that in some province under the 3 June plan the members from the Muslim-majority districts voted for division and those from the other districts voted against. What would follow?',
  opts: ['The province would be divided, and a boundary commission would then mark the line', 'The province would stay whole, because the two parts disagreed', 'The matter would go to a referendum of the whole province, as in Sylhet', 'The province would be divided, and each part would then choose its dominion by referendum'],
  sol: 'A vote for division by either part was enough to divide the province, and the boundary commission would then draw the line. A split vote did not keep the province whole; a referendum was used only in the NWFP and Sylhet; and the two parts of a divided province did not hold referendums of their own.',
}));
Q('m_mb_referendum', mcq({
  t: 2, d: 2, c: 'recall',
  stem: 'In which two areas did the 3 June 1947 plan provide for a referendum to decide which dominion they would join?',
  opts: ['The North-West Frontier Province and the Sylhet district of Assam', 'Punjab and Bengal', 'Hyderabad and Kashmir', 'Sind and Baluchistan'],
  sol: 'Referendums were held in the NWFP and in Sylhet. Punjab and Bengal decided through their assemblies; Sind through its assembly; princely states such as Hyderabad and Kashmir were left to choose.',
}));
Q('m_mb_boundary', mcq({
  t: 2, d: 3, c: 'understanding',
  stem: 'An imagined district officer in 1947 knows of a village with a Muslim majority that is surrounded on every side by districts with a non-Muslim majority. How was the commission set up under the 3 June plan to treat such a case?',
  opts: ['It was to mark the line by contiguous majority areas but also weigh other factors, so a village was not settled by its own majority alone', 'Every village would go to the dominion in which its own community was in a majority', 'The village would be asked to vote in a referendum of its own', 'The Viceroy would decide each such village case by case'],
  sol: 'The commission was to demarcate the two parts of each divided province on the basis of contiguous majority areas, taking other factors into account too, so an isolated village could not be decided by its own majority alone. Village-by-village allocation, a separate village referendum and a Viceroy\'s ruling on each case were not part of the plan.',
}));
Q('m_mb_states', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'In July 1947 the imagined dewan of a princely state that lies wholly inside the territory of the coming India, with no border with Pakistan, asks what the plan announced in June leaves his ruler. Which answer is most accurate?',
  opts: ['He was legally free to join either dominion, though geography made India the practical choice', 'He was bound to join India, because the plan required each state to join the dominion surrounding it', 'He had to remain under British protection until the two Constituent Assemblies had met', 'His subjects would decide by referendum, as in the Frontier province'],
  sol: 'The plan left the states free to join either dominion, but a state with no link to Pakistan had little practical option except India. The plan did not compel a state to join the dominion around it, did not keep British protection after 15 August, and provided referendums only in the NWFP and Sylhet.',
}));
Q('m_mb_scenario_sylhet', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'An imagined student asks why Sylhet, a district of Assam, was given a referendum when Punjab and Bengal were left to their assemblies. Which explanation fits the plan best?',
  opts: ['Assam as a whole was not being divided by an assembly vote; the only question was whether this one Muslim-majority district should leave it, so its own voters were asked', 'The Punjab and Bengal assemblies had already met in two parts', 'Sylhet had a Muslim majority', 'A referendum had also been held in the NWFP'],
  sol: 'Punjab and Bengal were divided by their assemblies, but Assam\'s assembly was not asked to divide the province, so the one question was whether Sylhet should leave Assam, and its people were asked directly. The other three options are true facts but do not explain the method: the assemblies of Punjab and Bengal did meet in two parts, Sylhet did have a Muslim majority, and the NWFP did hold a referendum, yet none of these says why Sylhet needed one.',
}));
Q('m_mb_reason_violence', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'In 1947 an imagined Congress member argues that accepting the plan of 3 June, though it divides provinces, is better than waiting for a united settlement. Which fact from the preceding months most strongly supports this argument?',
  opts: ['Violence had spread in several places and the interim government was deadlocked, so a long delay risked more disorder', 'The Cabinet Mission had proposed a single Union in 1946', 'Attlee\'s statement of February 1947 had set June 1948 as the latest date for the transfer', 'The Constituent Assembly had held its first meeting in December 1946'],
  sol: 'The member\'s case is that delay is costly, and spreading violence together with a deadlocked government is the fact that shows the cost. The Mission\'s offer of a single Union supports the opposite side; the June 1948 deadline and the December 1946 meeting are true but do not show that waiting would be harmful.',
}));
Q('m_mb_advance', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'An imagined analyst asks why the date for the transfer of power, set in February 1947 for June 1948, was brought forward to 15 August 1947 in the June plan. Which fact from the first half of 1947 best supports the change?',
  opts: ['The main parties had agreed to the principle of partition, so the question that had held up a settlement was answered and waiting longer risked more unrest', 'The Cabinet Mission Plan had just been announced', 'Direct Action Day had just been observed', 'Attlee had set June 1948 as the latest date, and Britain wished to keep to it'],
  sol: 'Once the main parties accepted the plan, there was no constitutional question left to wait for, and delay would only prolong uncertainty and unrest. The Cabinet Mission Plan (May 1946) and Direct Action Day (August 1946) belong to the year before; and Attlee\'s deadline of June 1948 explains the original date, not the advance.',
}));
Q('m_mb_dominion', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'In what form was power to be transferred under the 3 June plan?',
  opts: ['To two dominions, India and Pakistan', 'To one federation including all princely states', 'To the provinces separately', 'To the United Nations for a period of trust'],
  sol: 'Power was to pass to two dominions, India and Pakistan, each with its own Constituent Assembly. The other options do not describe the plan.',
}));
Q('ar_mb_assemblies', ar({
  t: 2, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'Under the 3 June plan the assembly of Bengal could be made to divide the province even if a majority of the whole assembly was against division.',
  r: 'The plan provided that a vote for division by either of the two parts of the assembly was enough to partition the province.',
  sol: 'Both are true, and R explains A: because either part\'s vote sufficed, the members of one part could carry the decision for division even when they were outnumbered in the assembly as a whole.',
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
  t: 2, d: 2, c: 'recall', marks: 1,
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
  t: 2, d: 3, c: 'evaluation', marks: 2, wl: S2,
  stem: 'An imagined analyst says the statement of 20 February 1947 did nothing to hasten the transfer, since it named a date as far off as June 1948. Assess this claim, using what happened later.',
  model: 'Partly true: it set only a **latest** date. But it made the British **departure certain** and pressed the parties to settle, and power in fact passed on **15 August 1947**, ten months **earlier**.',
  sol: 'Latest date only; pressure to settle; actual transfer earlier.',
  scheme: [['What the statement set, and its limit', 1], ['Its effect, with the actual date', 1]],
}));
Q('s_mb_reasons_two', short({
  t: 2, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: 'An imagined Congress member in June 1947 says accepting the plan is painful but that delay would cost more. Give one consideration that supports this view and one that a critic would raise against it.',
  model: '**For:** spreading **violence** and a deadlocked **interim government** made an early transfer seem the **lesser evil**.\n**Against:** the plan **divided** provinces and communities and gave up the ideal of a **united** country.',
  sol: 'One for, one against.',
  scheme: [['A consideration in favour', 1], ['A consideration against', 1]],
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
    child('b', short({ t: 2, d: 2, c: 'recall', marks: 1, stem: 'What is the "commission" that will "draw the line through the villages"?', model: 'The **boundary commission** (headed by **Radcliffe**) that would mark the new border in **Punjab**.', sol: 'Boundary commission.', scheme: [['Boundary commission', 1]] })),
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
  t: 3, d: 3, c: 'analysis',
  stem: 'On 15 August 1947 an imagined student writes in her diary: "Today India became fully independent, a republic with its own President." What is the best correction according to the Indian Independence Act?',
  opts: ['Right about independence, wrong about the form: India became a dominion with a Governor-General, and a republic only when its own constitution came into force in 1950', 'Wrong about independence: the Act left the British Parliament free to make laws for India until 1950', 'Right on both points: the Constituent Assembly had already declared a republic', 'Wrong on both points: independence was to come only in June 1948, as Attlee had said'],
  sol: 'The Act created independent dominions on 15 August 1947, with a Governor-General as head, and India became a republic only on 26 January 1950, so the diary is right on independence and wrong on the republic. The 1935 Act did continue to be used, which may tempt the second option, but the British Parliament lost its power to legislate; June 1948 was the latest date in Attlee\'s statement, later replaced by 15 August 1947.',
}));
Q('m_iia_paramountcy', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'A historian notes that the Indian Independence Act ended British paramountcy but did not say which dominion any state belonged to. What consequence followed for the states?',
  opts: ['Each state had to settle its own position, in practice by accession to India or Pakistan, now that the Crown\'s protection was withdrawn', 'Each state passed automatically to the dominion nearest to it', 'Each state stayed under the Crown\'s protection until the new constitutions were ready', 'Each state became a province of the Government of India Act, 1935'],
  sol: 'With paramountcy lapsed and no state assigned to a dominion, every ruler had to decide his state\'s future, in practice by accession. Automatic transfer to the nearest dominion, continued protection and conversion into provinces were not provided by the Act.',
}));
Q('m_iia_sos', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Which British office concerned with India was abolished by the Indian Independence Act?',
  opts: ['The Secretary of State for India', 'The Prime Minister of Britain', 'The Governor-General', 'The Speaker of the House of Commons'],
  sol: 'The office of the Secretary of State for India was abolished. Each dominion kept a Governor-General, and the British offices of Prime Minister and Speaker were not affected.',
}));
Q('m_iia_ca_role', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'In late 1947 an imagined journalist sees the Constituent Assembly pass an ordinary law one day and debate the draft constitution the next. Which fact best explains why the Act needed to give the Assembly this second role?',
  opts: ['The British Parliament could no longer legislate for India, so an Indian body with full law-making power was needed at once, while the new constitution was still being prepared', 'The Government of India Act, 1935 stayed in force as adapted', 'Each dominion was to have a Governor-General', 'The office of Secretary of State for India was abolished'],
  sol: 'From 15 August 1947 the British Parliament had no power to make laws for the dominions, and elections under a new constitution were still some way off, so the Assembly was made the legislature as well. The other three options are true provisions of the Act, but none of them supplies a law-making body.',
}));
Q('m_iia_interim_law', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'In September 1947 an imagined clerk says that since the British Parliament has lost its power over India, the Government of India Act, 1935 must have ended too, leaving no law to run the government. What is the best response?',
  opts: ['The 1935 Act remained the working framework, with adaptations, until the new constitution came into force; what ended was Britain\'s power to legislate, not the framework', 'The clerk is right, because the Independence Act repealed the 1935 Act on 15 August', 'The government is run under the Cabinet Mission Plan of 1946 until the constitution is ready', 'The Constitution of 1950 already applies, since the Assembly has begun its work'],
  sol: 'The Independence Act kept the 1935 Act in use, as adapted, because no new constitution was yet ready. Ending Britain\'s power to make laws for India is a different matter from ending the Act. The Mission Plan was a set of proposals, not a law, and the Constitution came into force only in 1950.',
}));
Q('m_iia_gg', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: 'An imagined student argues: "Each dominion had a Governor-General appointed by the Crown, so the British cabinet still chose who ruled India." What is the best assessment?',
  opts: ['Partly right: the Crown made the appointment, but on the advice of the dominion\'s own cabinet, so India\'s ministers decided who it would be', 'Right: the British Prime Minister selected the Governor-General of each dominion', 'Wrong: the Governor-General of each dominion was elected by its Constituent Assembly', 'Wrong: the post of Governor-General was abolished together with that of the Secretary of State'],
  sol: 'The formal appointment was by the Crown, but it followed the advice of the dominion\'s own cabinet, so the argument is only half right. The Governor-General was neither chosen by the British Prime Minister nor elected by the Assembly, and the post continued; it was the Secretary of State\'s office that was abolished.',
}));
Q('m_iia_parliament', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: 'An imagined student claims the Act ended British legal authority simply by naming two dominions and a date. Which further provision shows that more than that was needed?',
  opts: ['The British Parliament lost its power to make laws for the dominions', 'The Government of India Act, 1935 stayed in force as adapted', 'Each dominion received a Governor-General', 'The two dominions could share one Governor-General if they agreed'],
  sol: 'Naming the dominions did not by itself stop Parliament in London from legislating for them; the clause that took that power away is what ended British legal authority. The other three are true provisions, but they describe continuing machinery of government, not the end of Britain\'s authority.',
}));
Q('ar_iia_paramountcy', ar({
  t: 3, d: 3, c: 'analysis', verdict: 'both-true-not-explains',
  a: 'The Government of India Act, 1935 continued to be used in India after 15 August 1947.',
  r: 'The Indian Independence Act ended the power of the British Parliament to make laws for the dominions.',
  sol: 'Both are true, but R does not explain A. The 1935 Act stayed in use, as adapted, because no new constitution was ready yet; ending Parliament\'s power to legislate for India does not by itself say anything about which Act governed the working of the government.',
}));
Q('ar_iia_republic', ar({
  t: 3, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'India was a dominion, not a republic, on 15 August 1947.',
  r: 'The head of each dominion was a Governor-General who represented the Crown and acted on the advice of the dominion\'s own ministers.',
  sol: 'Both are true, and R explains A: a republic has a head of state who does not derive office from the Crown, whereas the Governor-General represented the Crown, so India stayed a dominion until its own constitution made it a republic in 1950.',
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
  stem: 'An imagined clerk in a London ministry learns in August 1947 that his India department will close, while the post of Governor-General in Delhi continues. Explain why one office ended and the other did not.',
  model: 'The **Secretary of State\'s** office existed to supervise India from London; with British authority over India ended, it had no work left. The **Governor-General** stayed as the dominion\'s head, but now on the advice of its own **cabinet**.',
  sol: 'Supervision from London ended; Governor-General continued on cabinet advice.',
  scheme: [['Why the Secretary of State\'s office ended', 1], ['Why the Governor-General continued, and on whose advice', 1]],
}));
Q('s_iia_apply', short({
  t: 3, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'An imagined ruler in August 1947 hopes to stay apart from both dominions, saying the Act has ended British paramountcy. His adviser calls this argument only half right. Explain what the Act did and did not change for him.',
  model: 'The Act **ended paramountcy**, so the Crown no longer protected the state and its treaties lapsed. But it created only **two dominions**, giving no separate place to a state, so in practice the ruler had to decide on **accession** to **India or Pakistan**.',
  sol: 'Paramountcy lapsed; no separate place; accession in practice.',
  scheme: [['What the Act changed: paramountcy lapsed', 1], ['What it did not change: no place outside the two dominions', 1]],
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
    child('b', short({ t: 3, d: 2, c: 'recall', marks: 1, stem: 'Which office is "the old minister in London who supervised India"?', model: 'The **Secretary of State for India**, abolished by the Act.', sol: 'Secretary of State.', scheme: [['Secretary of State for India', 1]] })),
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
  t: 1, d: 2, c: 'recall', ans: false,
  stem: 'True or false? In the 1946 grouping scheme, Punjab was placed in Section C.',
  sol: 'False. Punjab was in Section B, with the NWFP and Sind; Section C was Bengal and Assam.',
}));
Q('m_chk_two_parts', mcq({
  t: 2, d: 2, c: 'recall',
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
