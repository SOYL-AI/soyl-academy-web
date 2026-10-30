// CBSE 12 Political Science, ch12 Challenges to and Restoration of the Congress System — question bank.
// Every source, state, assembly and speaker is imagined and written by SOYL (labelled as such); no NCERT
// text, box, cartoon or exercise and no board/sample-paper item is reused (D-036). Real-world facts are
// limited to stable, verifiable ones (Nehru's death 1964, Shastri, the 1965 war, Tashkent 1966, Indira
// Gandhi as Prime Minister 1966, devaluation 1966, the 1967 election and SVD governments, the 1969
// presidential election and split, bank nationalisation 1969, privy purses 1971, the 1971 election).
// Real results are stated only broadly. Nothing after 2024 is stated; no real person is quoted.
import assert from 'node:assert/strict';
import { Q, mcq, ar, tf, fb, match, ord, num, short, long, source, child } from './lib.mjs';

const S2 = [30, 50];
const S3 = [50, 80];
const L5 = [80, 120];
const IMAG = '*(Imagined document written by SOYL for practice; the people and places in it are not real.)*';

// ---------------------------------------------------------------- defection arithmetic (imagined, computed)
// Imagined state Sonbhadra: a 60-member assembly after the 1967-style election.
export const HOUSE = { seats: 60, front: 33, defectors: 4 };
export const MAJORITY = Math.floor(HOUSE.seats / 2) + 1; // 31
export const FRONT_AFTER = HOUSE.front - HOUSE.defectors; // 29
export const SHORT_BY = MAJORITY - FRONT_AFTER; // 2
export const OPP_AFTER = HOUSE.seats - FRONT_AFTER; // 31
assert.equal(MAJORITY, 31);
assert.equal(FRONT_AFTER, 29);
assert.equal(SHORT_BY, 2);
assert.equal(OPP_AFTER, 31);
// Imagined front surplus before the defections.
export const SURPLUS = HOUSE.front - MAJORITY; // 2
assert.equal(SURPLUS, 2);

// ================================================================ t01 Political succession
Q('m_nehru_death', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'In which year did Jawaharlal Nehru die in office, raising the question of who would succeed him?',
  opts: ['1964', '1962', '1966', '1967'],
  sol: 'Nehru died in May 1964. 1962 was the year of the war with China, 1966 the year Indira Gandhi became Prime Minister and 1967 the fourth general election.',
}));
Q('m_shastri_pm', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Who became Prime Minister of India in June 1964?',
  opts: ['Lal Bahadur Shastri', 'Morarji Desai', 'K. Kamaraj', 'Gulzarilal Nanda as an elected successor'],
  sol: 'Lal Bahadur Shastri was chosen unanimously by the Congress parliamentary party. Gulzarilal Nanda was acting Prime Minister only for a short interim; Kamaraj was Congress president, and Morarji Desai was a rival aspirant.',
}));
Q('m_kamaraj_role', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'What role did the Congress president K. Kamaraj play in the 1964 succession?',
  opts: [
    'He consulted party leaders and MPs and helped build a consensus on Shastri',
    'He became Prime Minister himself',
    'He was appointed by the President to choose the Prime Minister alone',
    'He called a fresh general election',
  ],
  sol: 'As party president, Kamaraj sounded out leaders and Congress MPs so that a successor could be chosen smoothly. He did not become Prime Minister, the choice was not his alone, and there was no fresh election.',
}));
Q('m_succession_fear', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Why were many observers worried about what would happen in India after Nehru?',
  opts: [
    'Many new nations had slipped into military or one-person rule after their founding leaders',
    'The Constitution had no provision for choosing a new Prime Minister',
    'India had no elected Parliament in 1964',
    'The Congress had already split into two parties',
  ],
  sol: 'In several newly independent countries, democracy did not survive the passing of the founding leader. The Constitution and Parliament were in place, and the Congress split came only in 1969.',
}));
Q('m_shastri_war', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'During Lal Bahadur Shastri\'s term as Prime Minister, India fought a war with which country?',
  opts: ['Pakistan, in 1965', 'China, in 1962', 'Pakistan, in 1971', 'China, in 1967'],
  sol: 'The India–Pakistan war of 1965 took place under Shastri. The war with China was in 1962 under Nehru; the 1971 war came under Indira Gandhi.',
}));
Q('m_tashkent', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'Lal Bahadur Shastri died in January 1966 in Tashkent. Why was he there?',
  opts: [
    'To sign an agreement with Pakistan ending the 1965 war',
    'To attend a Commonwealth summit',
    'To sign a trade treaty with China',
    'To attend the United Nations General Assembly',
  ],
  sol: 'Tashkent, then in the Soviet Union, hosted the talks between India and Pakistan that produced the Tashkent Declaration after the 1965 war. Shastri died there soon after signing it.',
}));
Q('m_indira_contest', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'How was Indira Gandhi chosen as leader of the Congress parliamentary party in January 1966?',
  opts: [
    'She defeated Morarji Desai in a secret ballot of Congress MPs',
    'She was nominated by the outgoing Prime Minister in his will',
    'She won a nationwide direct election for Prime Minister',
    'She was chosen unanimously without any rival',
  ],
  sol: 'Unlike 1964, the 1966 succession was contested: Congress MPs voted by secret ballot, and Indira Gandhi defeated Morarji Desai. India has no direct election of the Prime Minister.',
}));
Q('m_syndicate_meaning', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'In Congress politics of the 1960s, the term "Syndicate" referred to',
  opts: [
    'a group of senior Congress leaders who had strong control over the party organisation',
    'an alliance of opposition parties against the Congress',
    'a committee of the Election Commission',
    'a group of industrialists who funded the Planning Commission',
  ],
  sol: 'The Syndicate was an informal group of powerful Congress organisational leaders, such as K. Kamaraj, S. K. Patil, S. Nijalingappa, N. Sanjiva Reddy and Atulya Ghosh. It was not an opposition alliance or an official body.',
}));
Q('m_smooth_transfer', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: 'Two successions took place within twenty months (1964 and 1966). What do they together show about Indian democracy?',
  opts: [
    'Power changed hands peacefully through the ruling party\'s democratic procedures, even when the choice was contested',
    'The army decided who would lead the country',
    'Succession was settled by a public referendum',
    'Only members of one family could become Prime Minister',
  ],
  sol: 'In 1964 there was consensus and in 1966 a contest, but both times the Congress parliamentary party chose the leader and power passed peacefully. The army played no role and there was no referendum.',
}));
Q('ar_succession', ar({
  t: 1, d: 3, c: 'analysis', key: 'a',
  a: 'The transfer of power after Nehru\'s death took place smoothly.',
  r: 'The Congress settled the succession within the party through consultation, and the new leader was accepted by the party\'s MPs.',
  sol: 'Both are true, and R explains A: the smooth transition came from the party\'s internal process of consultation and acceptance by its MPs.',
}));
Q('ar_syndicate_choice', ar({
  t: 1, d: 3, c: 'analysis', key: 'b',
  a: 'Indira Gandhi had the support of the Syndicate when she became Prime Minister in 1966.',
  r: 'Indira Gandhi had earlier served as a minister in Shastri\'s cabinet.',
  sol: 'Both statements are true, but R does not explain A. The Syndicate backed her for its own reasons, including the expectation that it could guide her; her earlier ministerial post is not the reason for that support.',
}));
Q('tf_nanda', tf({
  t: 1, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? After Nehru\'s death, Gulzarilal Nanda served a full five-year term as Prime Minister.',
  sol: 'Nanda was only acting (interim) Prime Minister for a short time after Nehru\'s death, and again after Shastri\'s death, until the Congress parliamentary party chose a leader.',
}));
Q('fb_tashkent', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'The agreement signed by India and Pakistan in January 1966 after the 1965 war is called the ___ Declaration.',
  acc: [['Tashkent']],
  sol: 'It is the Tashkent Declaration, signed in Tashkent in the Soviet Union in January 1966.',
}));
Q('ord_succession', ord({
  t: 1, d: 2, c: 'understanding', marks: 1,
  stem: 'Arrange these events of 1964–66 in the order in which they happened.',
  items: [
    'Death of Jawaharlal Nehru',
    'Lal Bahadur Shastri becomes Prime Minister',
    'War between India and Pakistan',
    'Tashkent Declaration and Shastri\'s death',
    'Indira Gandhi becomes Prime Minister',
  ],
  sol: 'May 1964 Nehru dies; June 1964 Shastri takes office; 1965 war; January 1966 Tashkent and Shastri\'s death; later in January 1966 Indira Gandhi becomes Prime Minister.',
}));
Q('mt_people', match({
  t: [1, 3], d: 2, c: 'understanding',
  stem: 'Match each person with the role they played in the period 1964–71.',
  pairs: [
    ['K. Kamaraj', 'Congress president who helped settle the 1964 succession'],
    ['Morarji Desai', 'Lost the 1966 leadership contest in the Congress parliamentary party'],
    ['V. V. Giri', 'Won the 1969 presidential election as an independent candidate'],
    ['Ram Manohar Lohia', 'Socialist leader associated with the strategy of non-Congressism'],
  ],
  sol: 'Kamaraj managed the 1964 consultations; Desai lost to Indira Gandhi in 1966; Giri won the 1969 presidential election; Lohia argued that opposition parties should unite against the Congress.',
}));
Q('s_why_worry', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Why was the question of succession after Nehru seen as a test for Indian democracy? Give two reasons.',
  model: '1. Nehru had led the country since 1947, and many doubted whether **anyone else could hold it together**.\n2. In many newly independent countries the end of the first leader had brought **military or one-person rule**, so India\'s ability to change leaders **peacefully** was being watched.',
  sol: 'One reason about Nehru\'s long dominance and one about the experience of other new nations.',
  scheme: [['Nehru\'s long leadership and doubts about a successor', 1], ['Experience of other new nations', 1]],
}));
Q('s_shastri_challenges', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State two major challenges India faced during Lal Bahadur Shastri\'s brief term as Prime Minister.',
  model: '1. A **war with Pakistan in 1965**, which strained the economy and ended with talks at Tashkent.\n2. A serious **food shortage** after the failure of the monsoons, which forced the country to depend on grain imports.',
  sol: 'Two challenges: the 1965 war and the food crisis (drought).',
  scheme: [['The 1965 war', 1], ['The food crisis', 1]],
}));
Q('s_1966_contest', short({
  t: 1, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: 'How did the succession of 1966 differ from that of 1964?',
  model: 'In **1964** the party reached a **consensus**: leaders were consulted and Shastri was accepted without a vote. In **1966** there was an open **contest**: Congress MPs voted by **secret ballot**, and Indira Gandhi defeated Morarji Desai.',
  sol: 'Contrast consensus with contest.',
  scheme: [['1964: consensus', 1], ['1966: contest by secret ballot', 1]],
}));
Q('s3_two_successions', short({
  t: 1, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'The two successions of 1964 and 1966 are often cited as proof of the maturity of Indian democracy. Explain three points in support.',
  model: '1. Power passed **peacefully** both times, with no role for the army or street violence.\n2. The choice was made through the **ruling party\'s procedures** and approved by elected MPs, so it rested on Parliament\'s confidence.\n3. Even when the choice was **contested** in 1966, the losing side accepted the result and the government continued, showing that disagreement could be settled democratically.',
  sol: 'Peaceful transfer, parliamentary procedure, acceptance of a contested result.',
  scheme: [['Peaceful transfer', 1], ['Choice through MPs and party procedure', 1], ['Acceptance of the contested 1966 result', 1]],
}));
Q('s3_indira_early', short({
  t: 1, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: 'Describe three difficulties Indira Gandhi faced in her first year as Prime Minister (1966–67).',
  model: '1. **Economic crisis:** drought and food shortages after poor monsoons, with rising prices.\n2. **Devaluation of the rupee (1966):** a controversial step taken partly under foreign pressure that was criticised inside and outside the party.\n3. **Weak position in the party:** senior organisational leaders (the Syndicate) expected to guide her, and she had to face the 1967 election within a year.',
  sol: 'Economy and food, the devaluation decision, and her position within the party and the coming election.',
  scheme: [['Economic and food crisis', 1], ['Devaluation and its criticism', 1], ['Position within the party / coming election', 1]],
}));
Q('l_succession', long({
  t: 1, d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: 'Describe the process of political succession from Nehru to Indira Gandhi (1964–66). What did it reveal about the Congress and Indian democracy?',
  model: '1. **1964:** Nehru died in May; after a short interim under Gulzarilal Nanda, the Congress president **K. Kamaraj** consulted leaders and MPs, and **Lal Bahadur Shastri** was chosen without a contest.\n2. **Shastri\'s term:** the **1965 war** with Pakistan and a **food crisis**; he died in **Tashkent** in January 1966 after signing the agreement with Pakistan.\n3. **1966:** a **contest** in the Congress parliamentary party; **Indira Gandhi defeated Morarji Desai** in a secret ballot, with the backing of the Syndicate.\n4. **What it showed about the Congress:** the party could settle leadership through **consultation or voting** and keep its members together.\n5. **What it showed about democracy:** power changed hands **peacefully** twice in under two years, unlike in many other new nations.',
  sol: 'Narrate the two successions, then draw conclusions about the party and about democracy.',
  scheme: [['1964 succession', 1], ['Shastri\'s term and death', 1], ['1966 contest', 1], ['Conclusion about the Congress', 1], ['Conclusion about democracy', 1]],
}));
Q('l_syndicate', long({
  t: [1, 3], d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: 'Who were the "Syndicate"? Explain how their relationship with Indira Gandhi changed between 1966 and 1969.',
  model: '1. **Who:** an informal group of senior Congress **organisational leaders**, including K. Kamaraj, S. K. Patil, S. Nijalingappa, N. Sanjiva Reddy and Atulya Ghosh.\n2. **1966:** they **supported** Indira Gandhi\'s election as leader, partly expecting that she would rely on their advice.\n3. **Growing distance:** she began to take decisions with a **small group of advisers** outside the Syndicate and to adopt a more **radical economic programme**.\n4. **1969 clash:** the two sides backed **different candidates** in the presidential election; the official candidate, N. Sanjiva Reddy, lost to V. V. Giri.\n5. **Result:** the party **split** in 1969 into the Congress (O), led by the Syndicate, and the Congress (R), led by Indira Gandhi, which later proved the stronger.',
  sol: 'Identify the group, then trace support, distance, clash and split.',
  scheme: [['Who the Syndicate were', 1], ['Support in 1966', 1], ['Growing distance', 1], ['1969 presidential election', 1], ['The split and its outcome', 1]],
}));

// ================================================================ t02 The fourth general election 1967 and coalitions
Q('m_1967_context', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Which set of conditions formed the background to the fourth general election of 1967?',
  opts: [
    'Drought, food shortage, rising prices, devaluation of the rupee and public protests',
    'Rapid economic growth and record harvests',
    'A long period of military rule',
    'The Emergency and the suspension of fundamental rights',
  ],
  sol: 'The mid-1960s saw drought, food scarcity, inflation, the 1966 devaluation and frequent agitations. Record harvests came later with the Green Revolution, and the Emergency was in 1975–77.',
}));
Q('m_earthquake', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Why are the results of the 1967 election often described as a "political earthquake"?',
  opts: [
    'The Congress lost power in many states and its majority in the Lok Sabha shrank sharply',
    'The Congress lost its majority in the Lok Sabha and went into opposition at the Centre',
    'Elections were cancelled in several states',
    'A single opposition party won a majority in the Lok Sabha',
  ],
  sol: 'The Congress kept a narrow majority at the Centre but lost in several states, which was a shock after twenty years of dominance. It did not lose power at the Centre, and no single opposition party won a Lok Sabha majority.',
}));
Q('m_non_congressism', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'The strategy of "non-Congressism" associated with Ram Manohar Lohia meant that',
  opts: [
    'opposition parties with different programmes should come together to defeat the Congress',
    'all members of the Congress should leave politics',
    'the Congress should be banned by law',
    'voters should boycott elections',
  ],
  sol: 'Lohia argued that the Congress could be defeated only if the opposition stopped splitting the anti-Congress vote. It did not mean banning the Congress or boycotting elections.',
}));
Q('m_dmk', mcq({
  t: 2, d: 2, c: 'recall',
  stem: 'In which state did a regional party, the DMK, win a majority on its own in 1967?',
  opts: ['Madras (now Tamil Nadu)', 'Kerala', 'Punjab', 'West Bengal'],
  sol: 'The DMK won a clear majority in Madras state, helped by the anti-Hindi agitation and food issues. Kerala, Punjab and West Bengal had coalition governments of several parties.',
}));
Q('m_svd', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'In an imagined state in 1967, a government is formed by a joint legislature party of the Jana Sangh, two socialist parties, a communist party and some independents, all elected against the Congress. Such a government was then known as an SVD government. What best describes it?',
  opts: [
    'Coalitions of several, often ideologically different, parties and some independents',
    'Governments run directly by the President',
    'Single-party governments of the Communist Party',
    'Governments of nominated experts',
  ],
  sol: 'SVD stands for Samyukt Vidhayak Dal, a joint legislature party. These coalitions often brought together parties with very different programmes. President\'s Rule and nominated governments are different things.',
}));
Q('m_aya_gaya', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'An imagined MLA, elected in 1967 on the ticket of one party, joins a rival party within a week, returns to his old party a few days later and then crosses over again. Which phrase from the politics of that time describes such behaviour?',
  opts: [
    '"Aya Ram, Gaya Ram": frequent defection by legislators',
    '"Garibi hatao": a programme to remove poverty',
    '"Non-Congressism": opposition unity against the Congress',
    '"Conscience vote": voting by personal judgement in a party election',
  ],
  sol: 'The phrase came from an MLA in Haryana who changed parties three times in a fortnight in 1967, and it describes frequent defection. The other phrases describe a 1971 campaign promise, the 1967 opposition strategy and the 1969 presidential vote.',
}));
Q('m_lohia_logic', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'In an imagined constituency in 1962, the Congress won with 42% of the votes while three opposition parties shared the remaining 58%. Which strategy did Lohia argue would change such results?',
  opts: [
    'Non-Congressism: the opposition parties putting up one common candidate',
    'Each opposition party contesting alone and working harder',
    'Opposition parties boycotting the election',
    'Asking the Election Commission to declare the runner-up elected',
  ],
  sol: 'Under first-past-the-post a divided opposition lets the largest party win. Lohia\'s answer was to unite the anti-Congress vote behind one candidate. Boycotts and changes to the counting rule were not his proposals.',
}));
Q('m_coalition_problem', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'Which of the following best explains why many of the state coalition governments formed in 1967 did not last long?',
  opts: [
    'Their partners had very different ideologies, and defections changed majorities quickly',
    'The Constitution did not allow coalition governments in states',
    'The Election Commission dissolved them',
    'They had won a majority of more than three-quarters of the seats',
  ],
  sol: 'Coalitions of left and right parties found it hard to agree, and frequent defections removed their majorities. The Constitution permits coalitions, the Election Commission does not dissolve governments, and large majorities would have made them more stable, not less.',
}));
Q('ar_1967_centre', ar({
  t: 2, d: 3, c: 'analysis', key: 'c',
  a: 'The Congress was able to form the government at the Centre after the 1967 election.',
  r: 'The Congress won a majority of the seats in every state assembly in 1967.',
  sol: 'A is true: it kept a narrow majority in the Lok Sabha. R is false: it lost its majority in several states.',
}));
Q('ar_defection', ar({
  t: 2, d: 3, c: 'analysis', key: 'a',
  a: 'Defections played a big part in making and unmaking state governments after 1967.',
  r: 'Many state governments depended on narrow majorities, so a few legislators changing sides could topple them.',
  sol: 'Both are true, and R explains A: with thin majorities, a handful of defections was enough to bring a government down.',
}));
Q('tf_1967_lok_sabha', tf({
  t: 2, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? In 1967 the Congress retained a majority in the Lok Sabha, though a reduced one.',
  sol: 'The Congress won a narrow majority at the Centre while losing power in several states.',
}));
Q('fb_lohia', fb({
  t: 2, d: 1, c: 'recall',
  stem: 'The socialist leader who gave the call for "non-Congressism" before the 1967 election was Ram Manohar ___.',
  acc: [['Lohia']],
  sol: 'Ram Manohar Lohia argued that the opposition should unite against the Congress.',
}));
Q('n_majority_mark', num({
  t: 2, d: 2, c: 'application', marks: 1, value: MAJORITY, unit: 'seats',
  stem: `The imagined state of Sonbhadra has a ${HOUSE.seats}-member assembly. How many seats does a government need for a simple majority?`,
  sol: `Step 1: A simple majority is more than half of the seats.\nStep 2: Half of ${HOUSE.seats} is ${HOUSE.seats / 2}, so the majority mark is ${HOUSE.seats / 2} + 1 = ${MAJORITY}.`,
}));
Q('n_defect_short', num({
  t: 2, d: 3, c: 'application', marks: 2, value: SHORT_BY, unit: 'seats',
  stem: `In the imagined ${HOUSE.seats}-member Sonbhadra assembly, a coalition government has ${HOUSE.front} members. If ${HOUSE.defectors} of its members defect to the opposition, by how many seats will it fall short of a simple majority?`,
  sol: `Step 1: Majority mark = ${HOUSE.seats / 2} + 1 = ${MAJORITY}.\nStep 2: Members left = ${HOUSE.front} − ${HOUSE.defectors} = ${FRONT_AFTER}.\nStep 3: Shortfall = ${MAJORITY} − ${FRONT_AFTER} = ${SHORT_BY} seats.`,
  scheme: [['Majority mark found', 1], ['Correct shortfall', 1]],
}));
Q('s_why_1967_loss', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Give two reasons why the Congress did badly in many states in the 1967 election.',
  model: '1. **Economic distress:** drought, food shortages, price rise and the 1966 devaluation made voters unhappy with the government.\n2. **Opposition unity:** under non-Congressism, opposition parties **avoided splitting** the anti-Congress vote in many seats.',
  sol: 'One economic reason and one political reason.',
  scheme: [['Economic discontent', 1], ['Opposition unity / non-Congressism', 1]],
}));
Q('s_svd_nature', short({
  t: 2, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: 'Explain why the coalition governments formed in states after 1967 are described as ideologically unusual.',
  model: 'Several of them brought together parties from **opposite ends** of the spectrum, for example the **Jana Sangh and the communists** in the same front in some states. What united them was **opposition to the Congress**, not a shared programme.',
  sol: 'Left and right together; the common ground was anti-Congress.',
  scheme: [['Partners from opposite ideologies', 1], ['Common ground: anti-Congress', 1]],
}));
Q('s_defection_meaning', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'What is meant by "defection"? Why did it become a serious problem after 1967?',
  model: '**Defection** means an elected legislator **leaving the party** on whose ticket he or she won and joining another. After 1967 many states had **narrow or coalition majorities**, so frequent defections **toppled governments** and made state politics unstable.',
  sol: 'Define defection; link to narrow majorities and instability.',
  scheme: [['Meaning of defection', 1], ['Why it mattered after 1967', 1]],
}));
Q('s3_earthquake', short({
  t: 2, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Explain three changes in Indian politics that the 1967 election brought about.',
  model: '1. The Congress lost its **dominance in the states**: non-Congress governments were formed in several states, some by coalitions and one (Madras) by a regional party alone.\n2. **Coalition politics** began in the states, bringing together very different parties.\n3. **Defection** became common, making many state governments **unstable**; voters also showed that the dominant party could be defeated.',
  sol: 'Loss of state dominance, coalitions, defections and instability.',
  scheme: [['Loss of Congress dominance in states', 1], ['Rise of coalitions', 1], ['Defection and instability', 1]],
}));
Q('s3_lohia_strategy', short({
  t: 2, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'Explain the logic of non-Congressism. How did it link the Congress\'s dominance to the electoral system?',
  model: '1. The Congress had been winning many seats with **less than half of the votes**, because the opposition votes were **divided** among several parties.\n2. Under **first-past-the-post**, the candidate with the most votes wins, so a divided opposition helps the largest party.\n3. Lohia therefore argued that the opposition should **come together**, at least in seat adjustments, so that anti-Congress votes would not be wasted.',
  sol: 'Vote share vs seats, the effect of first-past-the-post, and the remedy of uniting.',
  scheme: [['Seats won on minority votes', 1], ['Role of first-past-the-post', 1], ['The remedy: unite the opposition', 1]],
}));
Q('l_1967', long({
  t: 2, d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: 'Why is the 1967 election regarded as a turning point in Indian politics? Explain with reference to its background and results.',
  model: '1. **Background:** drought, **food shortages**, rising prices and the **1966 devaluation** caused widespread discontent and protests.\n2. **New leadership:** the Congress faced the voters under a new Prime Minister, with its senior organisational leaders divided.\n3. **Opposition strategy:** under **non-Congressism**, opposition parties reduced the splitting of anti-Congress votes.\n4. **Results:** the Congress kept a **narrow majority** in the Lok Sabha but **lost power in several states**; in Madras the DMK won a majority on its own.\n5. **Consequences:** **coalition** governments (SVD) and frequent **defections** began in the states, ending the era of easy Congress dominance.',
  sol: 'Background, the opposition\'s approach, the results and the consequences.',
  scheme: [['Economic background', 1], ['Political context', 1], ['Opposition strategy', 1], ['Results at Centre and in states', 1], ['Coalitions and defections', 1]],
}));
Q('l_coalitions', long({
  t: 2, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: 'Evaluate the coalition governments formed in the states after 1967. Give arguments on both sides.',
  model: '1. **Positive:** they showed that the **Congress could be defeated** and gave voters a real alternative in the states.\n2. **Positive:** they gave **regional and opposition parties** experience of government and widened representation.\n3. **Negative:** partners with **opposite ideologies** found it hard to agree on policy.\n4. **Negative:** frequent **defections** made many of them **short-lived**, and some states saw President\'s Rule.\n5. **Conclusion:** they were **unstable** in the short run but marked a lasting change: **competition** replaced one-party dominance in many states.',
  sol: 'Two strengths, two weaknesses and a balanced conclusion.',
  scheme: [['First positive point', 1], ['Second positive point', 1], ['First negative point', 1], ['Second negative point', 1], ['Balanced conclusion', 1]],
}));

// ================================================================ t03 The Congress split and the 1971 election
Q('m_1969_president', mcq({
  t: 3, d: 2, c: 'recall',
  stem: 'Who won the presidential election of 1969 as an independent candidate, defeating the official Congress candidate?',
  opts: ['V. V. Giri', 'N. Sanjiva Reddy', 'Zakir Husain', 'S. Nijalingappa'],
  sol: 'V. V. Giri, the Vice-President, contested as an independent and won. N. Sanjiva Reddy was the official Congress candidate; the election was held after the death of President Zakir Husain; Nijalingappa was Congress president.',
}));
Q('m_conscience_vote', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'In the 1969 presidential election, Indira Gandhi called for a "conscience vote". This meant that',
  opts: [
    'Congress MPs and MLAs should vote as they personally judged right, not by the party\'s official decision',
    'only MPs with a clean record could vote',
    'the election should be decided by a public referendum',
    'Congress members should abstain from voting',
  ],
  sol: 'The call freed Congress legislators from the official choice, which helped V. V. Giri. It did not restrict voting, call a referendum or ask for abstention.',
}));
Q('m_o_and_r', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'After the split of November 1969, the two Congress parties were known as',
  opts: [
    'Congress (O), led by the Syndicate, and Congress (R), led by Indira Gandhi',
    'Congress (O), led by Indira Gandhi, and Congress (R), led by the Syndicate',
    'Congress (I) and Congress (S)',
    'Congress (Left) and Congress (Right)',
  ],
  sol: 'O stood for "Organisation" (the Syndicate side) and R for "Requisitionists" (Indira Gandhi\'s side). Congress (I) was a later name, from the late 1970s.',
}));
Q('m_bank_nat', mcq({
  t: 3, d: 2, c: 'recall',
  stem: 'Which step, taken in July 1969, was part of Indira Gandhi\'s new economic programme?',
  opts: ['Nationalisation of fourteen major private banks', 'Devaluation of the rupee', 'Abolition of the Planning Commission', 'Introduction of electronic voting machines'],
  sol: 'Fourteen major banks were nationalised in July 1969. Devaluation took place in 1966, the Planning Commission was replaced in 2015, and voting machines came much later.',
}));
Q('m_privy', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'What were "privy purses", abolished by a constitutional amendment in 1971?',
  opts: [
    'Annual payments and privileges guaranteed to former rulers of princely states',
    'Secret funds of political parties',
    'Salaries of Members of Parliament',
    'Loans given by banks to farmers',
  ],
  sol: 'At integration, former princes were promised annual sums and privileges. Ending them was presented as a step towards equality; they had nothing to do with party funds, MPs\' salaries or farm loans.',
}));
Q('m_grand_alliance', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'In the 1971 Lok Sabha election, the "Grand Alliance" was',
  opts: [
    'an alliance of non-communist, non-Congress (R) parties, including the Congress (O), Jana Sangh, Swatantra and the Samyukta Socialist Party',
    'an alliance of the Congress (R) and the communists',
    'a coalition of regional parties from the south only',
    'a group of independent candidates supported by the Election Commission',
  ],
  sol: 'The Grand Alliance brought together the main opposition parties against Indira Gandhi. The Congress (R) had separate understandings with parties such as the CPI.',
}));
Q('m_garibi', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'In 1971 one side campaigned mainly on removing a leader, while the other promised to remove poverty. Which slogan captured the Congress (R) campaign?',
  opts: ['Garibi hatao', 'Jai jawan, jai kisan', 'Non-Congressism', 'Aya Ram, Gaya Ram'],
  sol: 'The Congress (R) campaigned on "garibi hatao" (remove poverty). "Jai jawan, jai kisan" is linked to Shastri in 1965; non-Congressism was the 1967 opposition strategy; "Aya Ram, Gaya Ram" refers to defections.',
}));
Q('m_1971_result', mcq({
  t: 3, d: 2, c: 'recall',
  stem: 'What was the outcome of the 1971 Lok Sabha election?',
  opts: [
    'The Congress (R) won a large majority, about two-thirds of the seats',
    'The Grand Alliance formed the government',
    'No party won a majority and a coalition was formed',
    'The Congress (O) emerged as the largest party',
  ],
  sol: 'The Congress (R) won a decisive victory, with roughly two-thirds of the Lok Sabha seats (figure rounded). The Grand Alliance and the Congress (O) did poorly.',
}));
Q('m_restored_diff', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: 'How was the Congress system "restored" after 1971 different from the Congress of the Nehru years?',
  opts: [
    'It depended more on the popular appeal of one leader and less on a party organisation that held many factions together',
    'It had become a party of only the rich and landlords',
    'It no longer contested elections',
    'It had merged with all opposition parties',
  ],
  sol: 'The restored Congress rested on the leader\'s direct appeal to voters, especially the poor, rather than on a federation of factions and strong local bosses. It kept contesting elections and did not merge with the opposition.',
}));
Q('m_split_reason', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'A newspaper in 1969 described the Congress quarrel as "the leader of the government versus the leaders of the party organisation". Which event brought this quarrel to an open split?',
  opts: [
    'The presidential election of 1969, in which the two sides backed different candidates',
    'The 1967 Lok Sabha election results',
    'The Tashkent Declaration',
    'The war of 1965',
  ],
  sol: 'The 1969 presidential election, with the official candidate Sanjiva Reddy against V. V. Giri, turned the conflict into an open split. The other events came earlier and did not divide the party.',
}));
Q('ar_split_left_right', ar({
  t: 3, d: 3, c: 'analysis', key: 'b',
  a: 'The Congress split of 1969 was presented by Indira Gandhi\'s supporters as a conflict between socialists and conservatives.',
  r: 'Fourteen major private banks were nationalised in July 1969.',
  sol: 'Both statements are true, but R does not explain A. Bank nationalisation was one of the measures used to present her side as pro-poor, but the fact of nationalisation is not itself the reason the split was described in ideological terms.',
}));
Q('ar_1971_win', ar({
  t: 3, d: 3, c: 'analysis', key: 'a',
  a: 'The Congress (R) won a decisive victory in the 1971 Lok Sabha election.',
  r: 'Its campaign offered a positive programme of removing poverty, while the opposition alliance had no common programme beyond removing Indira Gandhi.',
  sol: 'Both are true, and R explains A: a clear, positive agenda appealed to voters more than an alliance united mainly by opposition to one leader.',
}));
Q('ar_privy_purse', ar({
  t: 3, d: 3, c: 'analysis', key: 'd',
  a: 'Privy purses were abolished by the Constituent Assembly in 1949.',
  r: 'Former rulers of princely states had been given privy purses when their states were integrated into India.',
  sol: 'A is false: privy purses were abolished by a constitutional amendment in 1971, after an earlier attempt in 1970 failed. R is true.',
}));
Q('tf_reddy', tf({
  t: 3, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? N. Sanjiva Reddy won the presidential election of 1969 as the official Congress candidate.',
  sol: 'Reddy was the official candidate but lost; V. V. Giri, contesting as an independent, won the 1969 election.',
}));
Q('ord_1969_71', ord({
  t: 3, d: 3, c: 'understanding', marks: 1,
  stem: 'Arrange these events in the correct chronological order.',
  items: [
    'Fourth general election shakes Congress dominance',
    'Nationalisation of fourteen banks',
    'V. V. Giri elected President',
    'Formal split into Congress (O) and Congress (R)',
    'Congress (R) wins the Lok Sabha election with a large majority',
  ],
  sol: '1967 election; July 1969 bank nationalisation; August 1969 Giri elected; November 1969 split; March 1971 election victory.',
}));
Q('mt_terms', match({
  t: 3, d: 2, c: 'understanding',
  stem: 'Match each term from Congress politics of 1967–71 with its meaning.',
  pairs: [
    ['Congress (O)', 'The party of the organisational leaders after the 1969 split'],
    ['Congress (R)', 'The party led by Indira Gandhi after the 1969 split'],
    ['Grand Alliance', 'The 1971 front of the main non-communist opposition parties'],
    ['Privy purse', 'Payment to a former princely ruler, abolished in 1971'],
  ],
  sol: 'O stood for "Organisation" and R for "Requisitionists"; the Grand Alliance was the 1971 opposition front; privy purses were payments to former princes.',
}));
Q('s_conscience', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'What happened in the presidential election of 1969? How did it lead to the Congress split?',
  model: 'The official Congress candidate **N. Sanjiva Reddy** was opposed by **V. V. Giri**, an independent. Indira Gandhi called for a **conscience vote**, and Giri **won**. The Congress president then **expelled** her from the party, which split in **November 1969**.',
  sol: 'The two candidates, the conscience vote, the result and the expulsion that formalised the split.',
  scheme: [['Candidates and conscience vote', 1], ['Result and the split', 1]],
}));
Q('s_garibi', short({
  t: 3, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: 'How did the slogan "garibi hatao" help the Congress (R) in 1971?',
  model: 'It offered a **positive programme** of removing poverty, and appealed to the **landless, Dalits, Adivasis, minorities, women and the unemployed**. It contrasted with the opposition alliance, which was seen as having **no common programme**.',
  sol: 'Positive programme, appeal to the poor and disadvantaged, contrast with the opposition.',
  scheme: [['Appeal to the poor and disadvantaged', 1], ['Contrast with the opposition', 1]],
}));
Q('s_bank_privy', short({
  t: 3, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'Name two policy steps taken in 1969–71 that were presented as part of a pro-poor programme.',
  model: '1. **Nationalisation of fourteen major banks** (July 1969), to extend credit to farmers and small businesses.\n2. **Abolition of privy purses** of former princes, finally achieved by a constitutional amendment in **1971**.',
  sol: 'Bank nationalisation and the end of privy purses; land-reform and land-ceiling laws are also acceptable.',
  scheme: [['First step with its aim', 1], ['Second step with its aim', 1]],
}));
Q('s3_restored', short({
  t: 3, d: 4, c: 'evaluation', marks: 3, wl: S3,
  stem: 'Was the Congress system after 1971 the same as before? Give three points of difference.',
  model: '1. **Leadership:** the restored Congress depended on the **popular appeal of one leader**, while the older party drew strength from many regional leaders.\n2. **Organisation:** the old system **accommodated factions** and differences inside the party; after 1971 there was **less room for internal rivals**.\n3. **Social support:** the new party appealed more directly to the **poor, women, Dalits, Adivasis and minorities**, rather than relying on local notables to deliver votes.',
  sol: 'Leadership, organisation and social base, each contrasted with the earlier period.',
  scheme: [['Leadership', 1], ['Organisation and factions', 1], ['Social support', 1]],
}));
Q('s3_why_split', short({
  t: 3, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Explain three causes of the split in the Congress in 1969.',
  model: '1. **Power struggle:** a conflict between the **Prime Minister** and the **party organisation** (the Syndicate) over who would control the party and government.\n2. **Policy differences:** a dispute over economic direction, with Indira Gandhi backing **bank nationalisation** and other radical steps, which some senior leaders opposed.\n3. **Presidential election:** the two sides backed **different candidates** in 1969, and the defeat of the official candidate made the break **formal**.',
  sol: 'Leadership conflict, ideological framing and the immediate trigger.',
  scheme: [['Power struggle', 1], ['Policy differences', 1], ['The 1969 presidential election as trigger', 1]],
}));
Q('l_split_1971', long({
  t: 3, d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: 'Describe the events from the Congress split of 1969 to the election of 1971. Why did the Congress (R) win in 1971?',
  model: '1. **1969 clash:** the Prime Minister and the Syndicate backed **different presidential candidates**; V. V. Giri won after the call for a **conscience vote**.\n2. **Split:** in November 1969 the party divided into the **Congress (O)** and the **Congress (R)**; the government survived with support from other parties.\n3. **Radical steps:** **bank nationalisation** (1969) and moves to end **privy purses** gave the Congress (R) a pro-poor image.\n4. **1971 campaign:** the Lok Sabha was dissolved early; the **Grand Alliance** opposed Indira Gandhi, while the Congress (R) campaigned on **garibi hatao**.\n5. **Why it won:** a **positive programme**, a direct appeal to the poor and disadvantaged, and an opposition with no common agenda gave it about **two-thirds of the seats**.',
  sol: 'Narrate clash, split, policies and campaign, then explain the victory.',
  scheme: [['1969 presidential election', 1], ['The split', 1], ['Radical policies', 1], ['The 1971 campaign', 1], ['Reasons for victory', 1]],
}));
Q('l_restoration', long({
  t: [3, 2], d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: '"The Congress system was restored in 1971, but on a different basis." Evaluate this statement.',
  model: '1. **Restored:** after the setbacks of 1967, the Congress (R) won about **two-thirds of Lok Sabha seats** in 1971 and soon regained power in most states in 1972.\n2. **Different leadership:** victory rested on the **personal popularity** of Indira Gandhi rather than on a federation of strong regional leaders.\n3. **Different organisation:** the old practice of **accommodating factions** inside the party gave way to a more centralised party.\n4. **Different social base:** support came directly from the **poor and disadvantaged groups**, attracted by a programme of removing poverty.\n5. **Conclusion:** the statement is largely valid: **dominance** returned, but the **coalition-of-factions** character of the old Congress system did not.',
  sol: 'Show that dominance returned, then three differences, then a judgement.',
  scheme: [['Evidence of restoration', 1], ['Leadership', 1], ['Organisation', 1], ['Social base', 1], ['Judgement', 1]],
}));

// ================================================================ source-based
Q('sb_secretariat', source({
  t: 1, d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the source from an imagined diary of a junior official in New Delhi in 1964–66 and answer the questions that follow. ${IMAG}`,
  passage: '**Diary of a junior official, New Delhi (imagined), 1964–66**\n\nMay 1964. The radio announced that the Prime Minister has died. In the office everyone asked the same question: who now? My uncle says that in other new countries such a moment brought soldiers into the streets.\n\nJune 1964. The party president spent days meeting senior leaders and MPs. Today the parliamentary party chose a quiet, soft-spoken minister from Uttar Pradesh. No vote was needed.\n\nJanuary 1966. Sad news from Tashkent. This time two names went to a secret ballot of the MPs, and the result was announced the same evening. The loser congratulated the winner.',
  parts: [
    child('a', short({ t: 1, d: 1, c: 'recall', marks: 1, stem: 'Name the leader chosen by the parliamentary party in June 1964.', model: '**Lal Bahadur Shastri**.', sol: 'The successor chosen without a vote in June 1964 was Shastri.', scheme: [['Lal Bahadur Shastri', 1]] })),
    child('b', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'Which line shows that the 1966 succession was contested?', model: '"This time **two names went to a secret ballot** of the MPs."', sol: 'A secret ballot between two names shows a contest.', scheme: [['Correct line', 1]] })),
    child('c', short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Using the source, explain why these two successions were seen as a success for Indian democracy.', model: 'The uncle feared **soldiers in the streets**, as in other new nations, but leaders were chosen through **consultation in 1964** and a **secret ballot in 1966**, and the **loser congratulated the winner**. Power changed hands peacefully through democratic procedure.', sol: 'Contrast the fear with the peaceful procedures described.', scheme: [['The fear expressed', 1], ['Peaceful democratic procedure', 1]] }), [
      short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Identify the "party president" of 1964 and explain the role he played, as described in the source.', model: 'He was **K. Kamaraj**, the Congress president. He spent days **meeting senior leaders and MPs** to build agreement, so that the parliamentary party could choose a successor **without a contest**.', sol: 'Name Kamaraj and describe consultation leading to consensus.', scheme: [['K. Kamaraj', 1], ['Role: consultation and consensus', 1]] }),
    ]),
  ],
}));
Q('sb_sonbhadra', source({
  t: 2, d: 3, c: 'application', origin: 'soyl-original',
  stem: `Read the imagined news report from the state of Sonbhadra, 1967, and answer the questions that follow. ${IMAG}`,
  passage: `**"Front government falls after four days of drama" — report in an imagined newspaper, Sonbhadra (imagined state), 1967**\n\nThe united front of five parties, which took office in March with ${HOUSE.front} members in the ${HOUSE.seats}-member assembly, has lost its majority. ${HOUSE.defectors} of its legislators crossed over to the Congress benches on Thursday. One of them had changed sides twice since March. The front had brought together a party of the right and a communist party; its leaders admitted that they had agreed on little except removing the Congress. The Governor is expected to invite the new majority to form a government.`,
  parts: [
    child('a', num({ t: 2, d: 2, c: 'application', marks: 1, value: FRONT_AFTER, unit: 'members', stem: 'How many members did the front have after the legislators crossed over?', sol: `Step 1: Members before = ${HOUSE.front}; defectors = ${HOUSE.defectors}.\nStep 2: ${HOUSE.front} − ${HOUSE.defectors} = ${FRONT_AFTER} members.` })),
    child('b', short({ t: 2, d: 2, c: 'understanding', marks: 1, stem: 'Which term describes legislators "crossing over" in this way?', model: '**Defection** (the "Aya Ram, Gaya Ram" phenomenon).', sol: 'Changing party after election is defection.', scheme: [['Defection', 1]] })),
    child('c', short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Identify two features of post-1967 state politics shown in this report.', model: '(1) **Coalition governments** of parties with very different ideologies ("a party of the right and a communist party"). (2) **Instability through defection**: a few legislators changing sides **toppled** the government.', sol: 'Ideologically mixed coalitions and defection-driven instability.', scheme: [['First feature with evidence', 1], ['Second feature with evidence', 1]] }), [
      short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): What held the front together, according to the report, and why did that make it fragile?', model: 'Only the aim of **removing the Congress** held it together; its partners **agreed on little else**. Without a shared programme and with a thin majority, a few **defections** were enough to break it.', sol: 'Common anti-Congress aim, no shared programme, thin majority.', scheme: [['What held it together', 1], ['Why that made it fragile', 1]] }),
    ]),
  ],
}));
Q('sb_rally', source({
  t: 2, d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the imagined notes of a college student who attended an opposition rally in 1966 and answer the questions that follow. ${IMAG}`,
  passage: '**Notes of a college student, Patna (imagined), December 1966**\n\nThe speaker at today\'s rally said that in the last election the ruling party got far fewer than half the votes in our district, yet won almost every seat. "We fight each other, and they win," he said. He asked the socialist, the conservative and the regional parties to agree on one candidate in each seat next year. Prices of rice and kerosene have doubled since the rains failed, and many in the crowd said they would vote for change.',
  parts: [
    child('a', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Name the strategy the speaker is proposing.', model: '**Non-Congressism** (opposition unity against the Congress).', sol: 'One opposition candidate per seat against the Congress is non-Congressism.', scheme: [['Non-Congressism', 1]] })),
    child('b', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Which line shows the economic background of the 1967 election?', model: '"**Prices of rice and kerosene have doubled since the rains failed**."', sol: 'The line on prices and failed rains shows the drought and inflation.', scheme: [['Correct line', 1]] })),
    child('c', short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Why could the ruling party win "almost every seat" with "far fewer than half the votes"?', model: 'Under **first-past-the-post**, the candidate with the **most votes** wins. With the opposition **split** among several parties, the ruling party could top the poll in most seats with **well under half** the votes.', sol: 'Plurality rule plus a divided opposition.', scheme: [['First-past-the-post', 1], ['Divided opposition', 1]] }), [
      short({ t: 2, d: 4, c: 'evaluation', marks: 2, stem: '**Or** (ii): Do you think an alliance of socialist, conservative and regional parties could govern well together? Give one argument for and one against.', model: '**For:** it gives voters a **real alternative** and can end one-party dominance. **Against:** partners with **opposite ideas** may disagree on policy and fall apart through **defections**, as many 1967 coalitions did.', sol: 'One balanced argument each way.', scheme: [['Argument for', 1], ['Argument against', 1]] }),
    ]),
  ],
}));
Q('sb_split_letter', source({
  t: 3, d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the imagined letter from a Congress worker in Mysore to his brother in 1969 and answer the questions that follow. ${IMAG}`,
  passage: '**Letter from a Congress worker, Mysore (imagined), December 1969**\n\nDear brother, our district office now has two signboards. Since November, half the members follow the old party leaders and call themselves the real organisation; the other half follow the Prime Minister. It started with the vote for the President in August, when our MLA voted by his conscience and not by the party\'s list. In July the banks were taken over by the government, and the young workers say this proves which side stands for the poor. The old leaders say the party has been broken for one person\'s ambition. I have not decided which signboard to stand under.',
  parts: [
    child('a', short({ t: 3, d: 2, c: 'application', marks: 1, stem: 'What are the two "signboards" called?', model: '**Congress (O)** (the organisation) and **Congress (R)** (led by the Prime Minister).', sol: 'The two parties after the November 1969 split.', scheme: [['Both names', 1]] })),
    child('b', short({ t: 3, d: 2, c: 'understanding', marks: 1, stem: 'Which event of August 1969 is the writer referring to?', model: 'The **presidential election**, in which **V. V. Giri** defeated the official candidate after a **conscience vote**.', sol: 'The presidential election of 1969.', scheme: [['Presidential election (Giri vs Reddy)', 1]] })),
    child('c', short({ t: 3, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): The young workers and the old leaders explain the split differently. State both explanations as given in the source.', model: 'The **young workers** see it as an **ideological** split: bank takeover shows the Prime Minister\'s side **stands for the poor**. The **old leaders** see it as a **power struggle** caused by **one person\'s ambition**.', sol: 'Ideology versus personal power, both from the source.', scheme: [['Young workers\' view', 1], ['Old leaders\' view', 1]] }), [
      short({ t: 3, d: 3, c: 'application', marks: 2, stem: '**Or** (ii): Which policy step mentioned in the source was used to present the Prime Minister\'s side as pro-poor? How?', model: '**Bank nationalisation** (July 1969). It was presented as a way to **take credit to farmers, small traders and the poor**, so it gave her side a **socialist, pro-poor image**.', sol: 'Name bank nationalisation and its intended purpose.', scheme: [['Bank nationalisation', 1], ['Why it suggested a pro-poor stand', 1]] }),
    ]),
  ],
}));
Q('sb_1971_voter', source({
  t: 3, d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the imagined interview notes of a researcher who spoke to voters in a village in 1971 and answer the questions that follow. ${IMAG}`,
  passage: '**Field notes of a researcher, a village in Rajasthan (imagined), March 1971**\n\nA landless labourer told me he had always voted the way the village headman told him. This time he voted on his own, for the party that promised to remove poverty. A woman who sells vegetables said she liked the Prime Minister because she "speaks to people like us directly". The headman supported the alliance of opposition parties, but admitted that his own family did not listen to him. "They only say one thing — remove her," a schoolteacher said of the alliance. "What will they do after that?"',
  parts: [
    child('a', short({ t: 3, d: 1, c: 'recall', marks: 1, stem: 'What was the main slogan of the party "that promised to remove poverty"?', model: '**Garibi hatao**.', sol: 'The Congress (R) slogan of 1971.', scheme: [['Garibi hatao', 1]] })),
    child('b', short({ t: 3, d: 2, c: 'application', marks: 1, stem: 'Name the "alliance of opposition parties" of 1971.', model: 'The **Grand Alliance**.', sol: 'The non-communist, non-Congress (R) front of 1971.', scheme: [['Grand Alliance', 1]] })),
    child('c', short({ t: 3, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): How do the notes show a change in the way the Congress won votes in 1971 compared with the 1950s?', model: 'Earlier, local notables such as the **headman** delivered votes. In 1971 the labourer and the vegetable seller voted **on their own**, drawn by the leader\'s **direct appeal** and a **pro-poor programme**, even against the headman\'s choice.', sol: 'From votes through local notables to direct appeal to the poor.', scheme: [['Earlier pattern', 1], ['New pattern in 1971', 1]] }), [
      short({ t: 3, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): What weakness of the opposition alliance does the schoolteacher point out? Why did it matter?', model: 'The alliance had **no common programme** beyond removing the Prime Minister. Voters were offered **no positive alternative**, while the Congress (R) offered a clear promise, which helped it win decisively.', sol: 'No positive programme; contrast with garibi hatao.', scheme: [['The weakness', 1], ['Why it mattered', 1]] }),
    ]),
  ],
}));

// ================================================================ extra objective items (deck checks and practice)
Q('m_quiz_card', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'A history quiz card reads: "Became Prime Minister in January 1966 after winning a secret ballot of Congress MPs against a senior rival." Whom does the card describe?',
  opts: ['Indira Gandhi', 'Lal Bahadur Shastri', 'Morarji Desai', 'Gulzarilal Nanda'],
  sol: 'Indira Gandhi won the 1966 contest against Morarji Desai, who lost. Shastri was chosen without a contest in 1964, and Nanda was only acting Prime Minister.',
}));
Q('m_nijalingappa_mp', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'An imagined MP in 1970 says: "I stayed with the party president S. Nijalingappa and the senior organisational leaders when the party divided." Which party did he belong to?',
  opts: ['Congress (O)', 'Congress (R)', 'Swatantra Party', 'Samyukta Socialist Party'],
  sol: 'The organisational leaders, including the party president Nijalingappa and the Syndicate, formed the Congress (O). The followers of Indira Gandhi formed the Congress (R); Swatantra and the SSP were separate opposition parties.',
}));
Q('m_devaluation', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'In which year was the Indian rupee devalued, a decision widely criticised before the fourth general election?',
  opts: ['1966', '1969', '1971', '1962'],
  sol: 'The rupee was devalued in June 1966, partly under pressure from foreign lenders. 1969 was the year of bank nationalisation, 1971 the year of the fifth general election and 1962 the war with China.',
}));
Q('m_sonbhadra_check', mcq({
  t: 2, d: 3, c: 'application',
  stem: `In the imagined Sonbhadra assembly of ${HOUSE.seats} members, the majority mark is ${MAJORITY}. A front holds ${HOUSE.front} seats. What is the smallest number of its members whose defection would bring it below the majority mark?`,
  opts: [String(SURPLUS + 1), String(SURPLUS), String(HOUSE.defectors), String(SURPLUS + 3)],
  sol: `The front is ${SURPLUS} seats above the majority mark (${HOUSE.front} − ${MAJORITY} = ${SURPLUS}). Losing ${SURPLUS} would leave exactly ${MAJORITY}, still a majority; losing ${SURPLUS + 1} leaves ${HOUSE.front - SURPLUS - 1}, below the mark.`,
}));
Q('m_1967_states', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'A student says, "In 1967 the Congress lost power both at the Centre and in the states." Which correction is accurate?',
  opts: [
    'It kept a narrow majority at the Centre but lost power in several states',
    'It lost the Centre but kept every state',
    'It won every state and lost only in Parliament',
    'It did not contest the 1967 election',
  ],
  sol: 'The 1967 shock was mainly in the states; at the Centre the Congress continued in government with a reduced majority.',
}));
Q('tf_congress_i', tf({
  t: 3, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? The two parties formed after the 1969 split were called the Congress (I) and the Congress (S).',
  sol: 'They were the Congress (O) and the Congress (R). Names such as Congress (I) came later, at the end of the 1970s.',
}));
Q('fb_banks', fb({
  t: 3, d: 1, c: 'recall',
  stem: 'In July 1969, ___ major private banks were nationalised.',
  acc: [['fourteen', '14']],
  sol: 'Fourteen (14) major private banks were nationalised in July 1969.',
}));
