// CBSE 12 Political Science, ch11 India's External Relations — question bank. Every source, diary,
// report and scenario is imagined and written by SOYL (labelled as such); no NCERT text, box, cartoon or
// exercise and no board/sample-paper item is reused (D-036); no real person is quoted. Real-world facts are
// limited to stable, verifiable dates and events (1947–1999). China, Pakistan and all leaders are described
// factually and neutrally. Nothing after 2024 is stated.
import { Q, mcq, ar, tf, fb, match, ord, short, long, source, child } from './lib.mjs';

const S2 = [30, 50];
const S3 = [50, 80];
const L5 = [80, 120];
const IMAG = '*(Imagined document written by SOYL for practice; the people in it are not real, though the events in the background are.)*';

// Chronologies used by the ordering items, the timelines and the notes (order checked here).
export const CHINA = [
  [1949, 'People\'s Republic of China founded; India among the first to recognise it'],
  [1954, 'Panchsheel agreement signed'],
  [1959, 'Dalai Lama given asylum in India'],
  [1962, 'Border war (October–November)'],
  [1976, 'Full diplomatic relations restored'],
  [1988, 'Prime Minister Rajiv Gandhi visits China'],
];
export const PAKISTAN = [
  [1947, 'War over Kashmir begins (1947–48)'],
  [1960, 'Indus Waters Treaty'],
  [1965, 'War; ceasefire in September'],
  [1966, 'Tashkent Agreement (January)'],
  [1971, 'War; Bangladesh becomes independent (December)'],
  [1972, 'Simla Agreement (July)'],
  [1999, 'Kargil conflict (May–July)'],
];
export const NUCLEAR = [
  [1948, 'Atomic Energy Commission set up'],
  [1968, 'NPT opened for signature; India stays out'],
  [1974, 'First nuclear test at Pokhran (May)'],
  [1996, 'India does not sign the CTBT'],
  [1998, 'Nuclear tests at Pokhran (May)'],
];
for (const list of [CHINA, PAKISTAN, NUCLEAR]) for (let i = 1; i < list.length; i++) if (list[i][0] <= list[i - 1][0]) throw new Error('chronology out of order');

// ================================================================ t01 International context and non-alignment
Q('m_nam_founders', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Which group of leaders is usually named as the founders of the Non-Aligned Movement?',
  opts: [
    'Nehru (India), Tito (Yugoslavia), Nasser (Egypt), Sukarno (Indonesia) and Nkrumah (Ghana)',
    'Nehru (India), Churchill (Britain), Roosevelt (USA) and Stalin (USSR)',
    'Nehru (India), Mao (China), Ayub Khan (Pakistan) and Bandaranaike (Sri Lanka)',
    'Nehru (India), de Gaulle (France), Adenauer (West Germany) and Tito (Yugoslavia)',
  ],
  sol: 'NAM grew from newly independent and non-bloc states; its first summit at Belgrade in 1961 was led by these five. The other sets include leaders of the two Cold War blocs or of countries outside the movement\'s founding group.',
}));
Q('m_belgrade', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Where and when was the first summit of the Non-Aligned Movement held?',
  opts: ['Belgrade, 1961', 'Bandung, 1955', 'New Delhi, 1947', 'Cairo, 1964'],
  sol: 'The first NAM summit met in Belgrade in September 1961. The Bandung Conference of 1955 was the Asian-African conference that prepared the ground; New Delhi hosted the Asian Relations Conference in 1947.',
}));
Q('m_bandung', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'The Asian-African conference held at Bandung, Indonesia, in 1955 is remembered mainly because it',
  opts: [
    'brought newly independent Asian and African states together and prepared the ground for the Non-Aligned Movement',
    'set up the United Nations Security Council',
    'created a military alliance of Asian states against the Soviet Union',
    'ended the Korean War by a peace treaty',
  ],
  sol: 'Bandung marked Afro-Asian solidarity against colonialism and racial discrimination and led towards NAM. It created no alliance, had nothing to do with founding the Security Council, and did not end the Korean War.',
}));
Q('m_not_neutral', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Which statement best describes India\'s policy of non-alignment in the 1950s?',
  opts: [
    'Staying out of both Cold War military blocs while taking an active, independent stand on world issues',
    'Staying away from all world affairs, like a country that keeps to itself',
    'Remaining neutral in every dispute, including wars of independence',
    'Joining the US-led bloc for aid and the Soviet bloc for arms at the same time',
  ],
  sol: 'Non-alignment meant not joining either military alliance, but India spoke up actively on decolonisation, disarmament and peace. It was neither isolationism (withdrawal) nor neutrality (staying out of every war), and it did not mean joining both blocs.',
}));
Q('m_nehru_roles', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'Jawaharlal Nehru shaped India\'s early foreign policy because, besides being Prime Minister, he also held the post of',
  opts: ['Foreign Minister', 'President', 'Chief Justice', 'Chief of the Army Staff'],
  sol: 'Nehru was both Prime Minister and Foreign Minister from 1947 until his death in 1964, so he played a central role in setting foreign-policy goals.',
}));
Q('m_goals_nehru', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Which of these was NOT one of the main objectives of India\'s foreign policy under Nehru?',
  opts: [
    'Joining a military alliance to gain quick economic aid',
    'Preserving the sovereignty won after a long struggle',
    'Protecting territorial integrity',
    'Promoting rapid economic development',
  ],
  sol: 'The three objectives usually listed are sovereignty, territorial integrity and economic development, pursued through non-alignment. Joining an alliance is the opposite of non-alignment.',
}));
Q('m_scenario_vote', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'Imagine a newly independent country in 1956 that refuses to join any military pact, criticises one superpower\'s action on one issue and the other superpower\'s action on another, and takes aid from both for its dams and steel plants. Which policy is it following?',
  opts: ['Non-alignment', 'Isolationism', 'Neutrality', 'Membership of a bloc'],
  sol: 'Judging each issue on its merits, keeping out of pacts and dealing with both sides is non-alignment. Isolationism would mean staying out of world affairs; neutrality would mean taking no position; bloc membership would mean joining a pact.',
}));
Q('m_afro_asian', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'India called an Asian Relations Conference in March 1947 and later supported the freedom struggle of Indonesia against Dutch rule. These steps show India\'s commitment to',
  opts: ['Afro-Asian unity and decolonisation', 'joining the Western bloc', 'building a nuclear arsenal', 'a policy of isolation'],
  sol: 'Both steps aimed at solidarity among Asian and African peoples and an end to colonial rule. Neither involved joining a bloc, nuclear weapons or isolation.',
}));
Q('m_janata_policy', mcq({
  t: 1, d: 3, c: 'understanding',
  stem: 'When the Janata Party government came to power in 1977, what did it say about non-alignment?',
  opts: [
    'It would follow genuine non-alignment, correcting what it saw as a tilt towards the Soviet Union',
    'It would give up non-alignment and join a military alliance',
    'It would withdraw India from the United Nations',
    'It would stop all relations with neighbouring countries',
  ],
  sol: 'The Janata government announced "genuine non-alignment", reflecting criticism that earlier policy had leaned towards the USSR; it kept the policy itself. It did not join an alliance, leave the UN or cut off neighbours.',
}));
Q('ar_nonalign_active', ar({
  t: 1, d: 2, c: 'analysis', key: 'a',
  a: 'Non-alignment was not a policy of running away from world affairs.',
  r: 'India took an active part in mediating international disputes and in campaigns against colonialism and for disarmament.',
  sol: 'Both are true, and R explains A: India\'s active role in world affairs is exactly why non-alignment cannot be called "running away".',
}));
Q('ar_two_blocs', ar({
  t: 1, d: 3, c: 'analysis', key: 'b',
  a: 'After independence India received economic help from both the USA and the USSR.',
  r: 'The Non-Aligned Movement held its first summit at Belgrade in 1961.',
  sol: 'Both statements are true, but R does not explain A. India\'s aid from both sides followed from its policy of not joining either bloc; the date and place of the first NAM summit do not explain it.',
}));
Q('tf_nam_isolation', tf({
  t: 1, d: 1, c: 'understanding', ans: false,
  stem: 'True or false? Non-alignment means the same as isolationism.',
  sol: 'Isolationism means keeping away from world affairs. Non-alignment means keeping out of military blocs while playing an active part in world politics.',
}));
Q('fb_bandung', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'The Afro-Asian conference held in 1955, which prepared the ground for the Non-Aligned Movement, met in the Indonesian city of ___.',
  acc: [['Bandung']],
  sol: 'The conference met at Bandung in April 1955.',
}));
Q('mt_events', match({
  t: [1, 3], d: 2, c: 'understanding',
  stem: 'Match each foreign-policy event in India\'s history with the year in which it took place.',
  pairs: [
    ['Asian-African conference at Bandung', '1955'],
    ['First summit of the Non-Aligned Movement', '1961'],
    ['Agreement signed at Tashkent after a war', '1966'],
    ['Treaty of Peace, Friendship and Cooperation with the USSR', '1971'],
  ],
  sol: 'Bandung 1955; Belgrade summit 1961; Tashkent Agreement January 1966; Indo-Soviet Treaty August 1971.',
}));
Q('s_nam_meaning', short({
  t: 1, d: 2, c: 'analysis', marks: 2, wl: S2,
  stem: 'Distinguish between non-alignment and neutrality as foreign-policy positions.',
  model: '1. **Neutrality** means staying **out of wars** and taking **no side** in disputes.\n2. **Non-alignment** means not joining **military blocs**, but taking an **active, independent position** on each issue, and even mediating or helping in crises.',
  sol: 'Define each term and bring out the contrast between passivity and independent activity.',
  scheme: [['Neutrality explained', 1], ['Non-alignment explained as active and independent', 1]],
}));
Q('s_three_objectives', short({
  t: 1, d: 1, c: 'recall', marks: 2, wl: S2,
  stem: 'Name the objectives that Nehru\'s foreign policy aimed to secure, and the means chosen for them.',
  model: '**Objectives:** to preserve the **hard-won sovereignty**, to protect **territorial integrity**, and to promote **rapid economic development**.\n**Means:** the strategy of **non-alignment**, keeping out of the Cold War blocs.',
  sol: 'Three objectives and the strategy of non-alignment.',
  scheme: [['Any two objectives (or all three)', 1], ['Non-alignment as the means', 1]],
}));
Q('s3_why_nonalign', short({
  t: 1, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Why did India choose non-alignment rather than joining one of the Cold War blocs? Give three reasons.',
  model: '1. **Independence of decision:** after a long freedom struggle, India wanted to decide each issue **on its merits**, not on a bloc leader\'s instructions.\n2. **Development needs:** staying out of blocs let India seek **aid and technology from both sides** for its plans.\n3. **Peace:** India believed that blocs and an **arms race** threatened world peace; by staying out it could work for **disarmament** and help mediate between the two sides.',
  sol: 'Three reasons: sovereignty, development, and peace or disarmament.',
  scheme: [['Independence of decision', 1], ['Aid and development from both sides', 1], ['Peace and disarmament', 1]],
}));
Q('s3_nam_relevance', short({
  t: 1, d: 4, c: 'evaluation', marks: 3, wl: S3,
  stem: 'Some argue that non-alignment lost its meaning after the Cold War ended. Give one argument for this view and two against it.',
  model: '**For:** with only **one superpower** after 1991, there were no longer **two blocs** to stay away from.\n**Against:** (1) the core idea, **independent decision-making** in national interest, still applies whatever the balance of power; (2) developing countries still need a **common voice** on trade, debt, climate and reform of international institutions, which a non-aligned grouping can provide.',
  sol: 'A balanced answer: one argument on each side as asked, linked to the end of bipolarity.',
  scheme: [['Argument for the view', 1], ['First argument against', 1], ['Second argument against', 1]],
}));
Q('l_nonalign', long({
  t: 1, d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: 'Explain the main features of India\'s policy of non-alignment under Nehru. How did it serve India\'s interests in the 1950s?',
  model: '1. **Out of military blocs:** India did not join the US-led or the Soviet-led alliances.\n2. **Active, not passive:** it took **independent stands** on each issue and helped **mediate**, so it was not isolationism or neutrality.\n3. **Against colonialism and racism:** it supported **Afro-Asian unity** (Asian Relations Conference 1947, Bandung 1955) and freedom movements.\n4. **Interests served:** it protected **sovereignty** and let India obtain **aid and technology from both sides** for planned development.\n5. **Standing:** it gave a newly independent, militarily weak country a **voice in world affairs**, especially through NAM from 1961.',
  sol: 'Three features and two ways the policy served India, with examples.',
  scheme: [['Out of blocs', 1], ['Active, independent stand', 1], ['Anti-colonialism and Afro-Asian unity', 1], ['Sovereignty and aid from both sides', 1], ['International standing through NAM', 1]],
}));

// ================================================================ t02 Relations with China and the 1962 war
Q('m_panchsheel', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'Two imagined countries sign a pact promising to respect each other\'s territory, never to attack each other, to stay out of each other\'s internal affairs and to live in peaceful coexistence. Which agreement in India\'s history do these terms most closely follow?',
  opts: ['Panchsheel', 'Panchayati Raj', 'the Simla Agreement', 'the Tashkent Declaration'],
  sol: 'These are the five principles of peaceful coexistence agreed by India and China in 1954 (Panchsheel). Panchayati Raj is a local-government system, and Simla and Tashkent were agreements with Pakistan after wars.',
}));
Q('m_tibet', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Which event of 1959 added to tension between India and China?',
  opts: [
    'India gave political asylum to the Dalai Lama',
    'India and China signed the Panchsheel agreement',
    'China joined the Non-Aligned Movement',
    'India tested a nuclear device',
  ],
  sol: 'After an uprising in Tibet in 1959, the Dalai Lama crossed into India and was given asylum; China objected. Panchsheel dates from 1954, China was not a NAM member, and India\'s first test came in 1974.',
}));
Q('m_disputed_areas', mcq({
  t: 2, d: 2, c: 'recall',
  stem: 'The border dispute that led to the 1962 war centred mainly on which two areas?',
  opts: [
    'Aksai Chin in the western sector and the area then called NEFA in the eastern sector',
    'The Rann of Kutch and Sir Creek',
    'Siachen and Kargil',
    'The Andaman Islands and Lakshadweep',
  ],
  sol: 'The two main areas were Aksai Chin (Ladakh region) in the west and the North-East Frontier Agency (today Arunachal Pradesh) in the east. The other places relate to India–Pakistan disputes or to islands with no such dispute.',
}));
Q('m_1962_consequence', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Which of the following was a political consequence of the 1962 war within India?',
  opts: [
    'The Defence Minister resigned and the Nehru government faced its first no-confidence motion in the Lok Sabha',
    'The Congress lost power at the Centre in the next general election',
    'India left the Non-Aligned Movement',
    'India signed a military alliance with China',
  ],
  sol: 'V. K. Krishna Menon left the Defence Ministry and a no-confidence motion was moved in 1963; the government survived it. The Congress kept power in 1967 at the Centre, India stayed in NAM, and there was no alliance with China.',
}));
Q('m_1962_military', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'An imagined student writes: "After 1962 India decided to spend much more on its armed forces and to modernise them." Which lesson of the war does this reflect?',
  opts: [
    'The war exposed weaknesses in military preparedness',
    'The war proved that Panchsheel had been fully successful',
    'The war ended all border disputes for good',
    'The war showed that India needed no army at all',
  ],
  sol: 'The 1962 setback led to a rethink of defence and higher military spending. The war did not show Panchsheel succeeding, did not end the dispute, and pointed to the opposite of needing no army.',
}));
Q('m_cpi_split', mcq({
  t: 2, d: 3, c: 'understanding',
  stem: 'Differences over how to view China after 1962 contributed to a split in which political party in 1964?',
  opts: ['The Communist Party of India', 'The Indian National Congress', 'The Swatantra Party', 'The Bharatiya Jana Sangh'],
  sol: 'The Communist Party of India split in 1964, and the CPI(M) emerged as a separate party; differences over relations with China and the USSR were among the reasons.',
}));
Q('m_normalise', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'An imagined Indian visitor to Beijing in 1977 notes in her diary that the Indian embassy is once again headed by a full ambassador, for the first time in many years. Which development explains this?',
  opts: [
    'India and China had restored full diplomatic relations in 1976',
    'India and China had just signed the Panchsheel agreement',
    'The Simla Agreement had settled the India–China boundary',
    'China had joined the Non-Aligned Movement',
  ],
  sol: 'After the 1962 war, relations were kept at a lower level until full diplomatic relations were restored in 1976. Panchsheel dates from 1954, Simla was an India–Pakistan agreement, and China was not a NAM member.',
}));
Q('m_ceasefire_1962', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'An imagined army officer writes home in late November 1962 that the guns on the frontier have suddenly fallen silent, although no treaty has been signed and no outside force has arrived. What most likely explains this?',
  opts: [
    'China had declared a unilateral ceasefire',
    'A treaty had been signed at Simla',
    'The United Nations had sent peacekeeping forces',
    'Both sides had signed the Tashkent Agreement',
  ],
  sol: 'The 1962 war ended when China announced a ceasefire on its own, without any treaty. Simla (1972) and Tashkent (1966) were India–Pakistan agreements, and no UN force was involved.',
}));
Q('ar_panchsheel', ar({
  t: 2, d: 3, c: 'analysis', key: 'a',
  a: 'The 1962 war was a setback to the spirit of Panchsheel in India–China relations.',
  r: 'Panchsheel had committed both countries to non-aggression and peaceful coexistence.',
  sol: 'Both are true, and R explains A: because Panchsheel promised non-aggression and peaceful coexistence, an armed conflict was a direct blow to it.',
}));
Q('ar_china_recognise', ar({
  t: 2, d: 3, c: 'analysis', key: 'c',
  a: 'India was one of the first countries to recognise the People\'s Republic of China.',
  r: 'India and China had no differences of any kind in the 1950s.',
  sol: 'A is true: India recognised the new government soon after 1949. R is false: differences over Tibet and the boundary already existed in the 1950s.',
}));
Q('tf_ceasefire', tf({
  t: 2, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? The India–China war of 1962 ended when China declared a unilateral ceasefire.',
  sol: 'China announced a unilateral ceasefire in November 1962, and the fighting stopped.',
}));
Q('ord_china', ord({
  t: 2, d: 2, c: 'understanding', marks: 1,
  stem: 'Arrange these events in India–China relations in chronological order.',
  items: CHINA.slice(1, 5).map(([y, e]) => e),
  sol: `Panchsheel ${CHINA[1][0]}, asylum for the Dalai Lama ${CHINA[2][0]}, the border war ${CHINA[3][0]}, and restoration of full relations ${CHINA[4][0]}.`,
}));
Q('s_panchsheel', short({
  t: 2, d: 1, c: 'recall', marks: 2, wl: S2,
  stem: 'What was Panchsheel? Name any two of its principles.',
  model: '**Panchsheel** was the set of **five principles of peaceful coexistence** in the India–China agreement of **1954**. Two principles: **mutual non-aggression** and **non-interference in each other\'s internal affairs** (others: respect for territory and sovereignty, equality and mutual benefit, peaceful coexistence).',
  sol: 'Meaning with the year, then any two principles.',
  scheme: [['Meaning and year', 1], ['Two principles', 1]],
}));
Q('s_tibet_tension', short({
  t: 2, d: 2, c: 'analysis', marks: 2, wl: S2,
  stem: 'How did the Tibet question affect India–China relations in the 1950s?',
  model: 'China took control of **Tibet** in 1950, and India accepted Chinese sovereignty there. When the **Dalai Lama** fled after the 1959 uprising, India gave him **asylum**; China saw this as unfriendly, and it **deepened mistrust** just as the **border dispute** was growing.',
  sol: 'Link the asylum of 1959 to growing mistrust alongside the boundary issue.',
  scheme: [['Background: Tibet and the 1959 asylum', 1], ['Effect: mistrust added to the border dispute', 1]],
}));
Q('s3_1962_effects', short({
  t: 2, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Explain any three effects of the 1962 war on India.',
  model: '1. **National image and self-confidence:** the setback hurt India\'s standing and the prestige of its leadership at home and abroad.\n2. **Defence policy:** India sharply raised **defence spending** and modernised its forces.\n3. **Domestic politics:** the **Defence Minister resigned**, the government faced its **first no-confidence motion** (1963), and differences over China contributed to the **split of the CPI** in 1964.',
  sol: 'Three distinct effects: image, defence and domestic politics.',
  scheme: [['Effect on image and morale', 1], ['Effect on defence', 1], ['Effect on domestic politics', 1]],
}));
Q('l_china', long({
  t: 2, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: '"From Panchsheel to war in eight years." Trace India–China relations from 1949 to 1962 and assess the main reasons for the conflict.',
  model: '1. **Friendly start:** India recognised the **People\'s Republic** early (1949–50) and supported its seat in the UN.\n2. **Panchsheel (1954):** both sides pledged **peaceful coexistence and non-aggression**.\n3. **Tibet:** China\'s control of Tibet and India\'s **asylum to the Dalai Lama (1959)** created mistrust.\n4. **Boundary dispute:** rival claims over **Aksai Chin** and the eastern sector (**NEFA**) hardened after 1957; talks failed.\n5. **Assessment:** the war of **October–November 1962** grew mainly from the **unresolved boundary** and mistrust over Tibet; it showed that goodwill alone could not replace a **settled border** and adequate **defence preparation**.',
  sol: 'Chronology with four stages, then a reasoned judgement on the causes.',
  scheme: [['Early friendship', 1], ['Panchsheel', 1], ['Tibet and the asylum', 1], ['Boundary dispute', 1], ['Assessment of causes', 1]],
}));

// ================================================================ t03 Wars and peace with Pakistan
Q('m_indus', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'An imagined textbook for a foreign university describes "a 1960 agreement in South Asia, reached through an international lending institution, under which two neighbours with a territorial dispute shared the waters of six rivers". Which agreement and which mediator are described?',
  opts: ['The Indus Waters Treaty, mediated by the World Bank', 'The Tashkent Agreement, mediated by the Soviet Union', 'The Simla Agreement, mediated by the United Nations', 'The Panchsheel agreement, mediated by the Commonwealth'],
  sol: 'The Indus Waters Treaty was signed in 1960 by Prime Minister Nehru and President Ayub Khan with the World Bank as mediator. Tashkent (1966) had Soviet mediation; Simla (1972) was bilateral; Panchsheel was with China.',
}));
Q('m_tashkent', mcq({
  t: 3, d: 2, c: 'recall',
  stem: 'The Tashkent Agreement of January 1966 was signed by Prime Minister Lal Bahadur Shastri and General Ayub Khan with the mediation of',
  opts: ['the Soviet Union', 'the United States', 'the United Nations Secretary-General in person', 'Britain'],
  sol: 'Soviet Premier Kosygin mediated the talks at Tashkent, then in the Soviet Union.',
}));
Q('m_1971_cause', mcq({
  t: 3, d: 3, c: 'understanding',
  stem: 'Which development in East Pakistan led to the crisis of 1971?',
  opts: [
    'After the Awami League won the 1970 elections, power was not handed over, and the military crackdown that followed drove millions of refugees into India',
    'East Pakistan voted to join India in a referendum',
    'India and China fought a war over East Pakistan',
    'The United Nations divided Pakistan into two countries',
  ],
  sol: 'The Awami League under Sheikh Mujibur Rahman won the 1970 elections; the crackdown that began in March 1971 and the flood of refugees into India led to war in December. There was no referendum, no India–China war, and no UN decision to divide Pakistan.',
}));
Q('m_1971_result', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'An imagined quiz card lists a sequence of events: "an election result not honoured; a crackdown in March; refugees crossing the border; a treaty in August; war in December". What was the main outcome of this sequence?',
  opts: ['Bangladesh became an independent country', 'Kashmir was divided by a new treaty', 'Pakistan joined the Non-Aligned Movement', 'The Indus Waters Treaty was signed'],
  sol: 'Pakistan\'s forces in the east surrendered in Dhaka on 16 December 1971, and Bangladesh emerged as an independent country.',
}));
Q('m_simla', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'The Simla Agreement of July 1972 between Indira Gandhi and Zulfikar Ali Bhutto committed the two countries to',
  opts: [
    'settle their differences peacefully through bilateral talks',
    'hand over all disputes to the United Nations for decision',
    'form a military alliance against China',
    'merge their armed forces into one',
  ],
  sol: 'At Simla both sides agreed to resolve differences through peaceful, bilateral means and to respect the line of control in Jammu and Kashmir. It did not refer disputes to the UN or create any alliance or joint force.',
}));
Q('m_kargil', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'An imagined soldier\'s diary describes a summer spent recovering high mountain posts near a town in Ladakh after intruders crossed the line of control, a few months after a prime minister\'s bus journey to Lahore. In which year was it written?',
  opts: ['1999', '1965', '1971', '1987'],
  sol: 'The Kargil conflict was fought in the summer of 1999 (May–July), after armed intruders occupied heights on the Indian side of the line of control.',
}));
Q('m_1971_treaty', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: 'In August 1971, months before the war, India signed a 20-year Treaty of Peace, Friendship and Cooperation with the Soviet Union. Which reason best explains the timing?',
  opts: [
    'India wanted diplomatic and military support as tension rose and the USA and China leaned towards Pakistan',
    'India had decided to leave the Non-Aligned Movement',
    'The treaty was needed to settle the border with China',
    'The Soviet Union had asked India to join the Warsaw Pact',
  ],
  sol: 'With the US–Pakistan–China equation developing in 1971, India sought assurance of support from the USSR. India stayed in NAM, the treaty did not settle any border, and India did not join the Warsaw Pact.',
}));
Q('m_shastri_scenario', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'An imagined archive photograph shows two leaders shaking hands in a Central Asian city in January 1966, soon after a war over Kashmir. Which event does it most likely record?',
  opts: ['The Tashkent Agreement', 'The Simla Agreement', 'The Indus Waters Treaty', 'The Panchsheel agreement'],
  sol: 'A Central Asian city, January 1966 and a recent war point to Tashkent, after the 1965 war. Simla is in India (1972), the Indus treaty was signed in Karachi (1960), and Panchsheel was with China (1954).',
}));
Q('m_refugees', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'In 1971 an imagined relief officer in West Bengal reports that camps built for thousands now hold lakhs of people who have crossed from the east. Why did this matter for India\'s decision-making that year?',
  opts: [
    'The huge refugee burden made the crisis in East Pakistan a direct problem for India',
    'It meant India could ignore events in East Pakistan',
    'It forced India to sign the Indus Waters Treaty',
    'It led India to join a military bloc',
  ],
  sol: 'Millions of refugees put heavy economic and social pressure on India, which India cited when it raised the issue internationally and later went to war. The other options do not follow.',
}));
Q('ar_1971', ar({
  t: 3, d: 3, c: 'analysis', key: 'a',
  a: 'The 1971 war changed the map of South Asia.',
  r: 'East Pakistan became the independent state of Bangladesh at the end of that war.',
  sol: 'Both are true, and R explains A: the birth of Bangladesh created a new country in the region.',
}));
Q('ar_kashmir_1965', ar({
  t: 3, d: 3, c: 'analysis', key: 'c',
  a: 'The war of 1965 was followed by an agreement signed at Tashkent.',
  r: 'The Tashkent Agreement transferred the whole of Kashmir to one country.',
  sol: 'A is true. R is false: the agreement provided for withdrawal of forces to pre-war positions and the restoration of normal relations; it did not settle Kashmir.',
}));
Q('tf_simla_un', tf({
  t: 3, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? Under the Simla Agreement of 1972, India and Pakistan agreed to hand their disputes to the United Nations for a decision.',
  sol: 'The agreement committed them to settle differences peacefully through bilateral negotiations.',
}));
Q('fb_simla', fb({
  t: 3, d: 1, c: 'recall',
  stem: 'The agreement signed by Indira Gandhi and Zulfikar Ali Bhutto in July 1972 is called the ___ Agreement.',
  acc: [['Simla', 'Shimla']],
  sol: 'It is the Simla (Shimla) Agreement of 1972.',
}));
Q('ord_pakistan', ord({
  t: 3, d: 2, c: 'understanding', marks: 1,
  stem: 'Arrange these events in India–Pakistan relations in chronological order.',
  items: [PAKISTAN[1][1], PAKISTAN[3][1], PAKISTAN[5][1], PAKISTAN[6][1]],
  sol: `Indus Waters Treaty ${PAKISTAN[1][0]}, Tashkent ${PAKISTAN[3][0]}, Simla ${PAKISTAN[5][0]}, Kargil ${PAKISTAN[6][0]}.`,
}));
Q('mt_agreements', match({
  t: [3, 2], d: 2, c: 'understanding',
  stem: 'Match each agreement in India\'s external relations with the country India signed it with.',
  pairs: [
    ['Panchsheel agreement (1954)', 'China'],
    ['Indus Waters Treaty (1960)', 'Pakistan, with World Bank mediation'],
    ['Treaty of Peace, Friendship and Cooperation (1971)', 'Soviet Union'],
    ['Tashkent Agreement (1966)', 'Pakistan, with Soviet mediation'],
  ],
  sol: 'Panchsheel with China; the Indus treaty with Pakistan through the World Bank; the 1971 treaty with the USSR; Tashkent with Pakistan through Soviet mediation.',
}));
Q('s_indus', short({
  t: 3, d: 2, c: 'analysis', marks: 2, wl: S2,
  stem: 'Why is the Indus Waters Treaty of 1960 often cited as an example of cooperation between India and Pakistan?',
  model: 'Despite their **conflict over Kashmir**, the two countries agreed in **1960**, with **World Bank** mediation, on how to **share the rivers of the Indus system**. The treaty showed that **practical cooperation** on vital resources was possible even when political relations were tense.',
  sol: 'Contrast the tension with the agreement on shared rivers.',
  scheme: [['What the treaty did, with the mediator', 1], ['Why it shows cooperation despite conflict', 1]],
}));
Q('s_1965', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Briefly describe how the conflict of 1965 between India and Pakistan began and how it ended.',
  model: '**Began:** clashes in the **Rann of Kutch** (April 1965) were followed by a larger offensive in **Jammu and Kashmir** in August–September, and fighting spread along the border.\n**Ended:** a **UN-backed ceasefire** in September; then the **Tashkent Agreement** (January 1966) provided for withdrawal of forces.',
  sol: 'Two parts: how it started and how it ended.',
  scheme: [['How it began', 1], ['How it ended', 1]],
}));
Q('s_simla', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State two features of the Simla Agreement of 1972.',
  model: '1. India and Pakistan agreed to settle their differences by **peaceful means through bilateral negotiations**.\n2. Both sides agreed to **respect the line of control** in Jammu and Kashmir that resulted from the ceasefire of December 1971.',
  sol: 'Any two correct features.',
  scheme: [['First feature', 1], ['Second feature', 1]],
}));
Q('s3_1971_factors', short({
  t: 3, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Explain three factors that shaped India\'s role in the events of 1971 in the subcontinent.',
  model: '1. **Refugee burden:** millions of refugees from East Pakistan crowded into Indian states, creating heavy economic and social pressure.\n2. **International alignments:** the USA and China leaned towards Pakistan, so India signed the **Indo-Soviet Treaty (August 1971)** for support.\n3. **Popular movement in the east:** a freedom struggle in East Pakistan, after the 1970 election result was not honoured, received Indian support; war came in December and ended with **Bangladesh\'s independence**.',
  sol: 'Three factors: refugees, alignments, and the movement in East Pakistan.',
  scheme: [['Refugee burden', 1], ['International alignments and the Indo-Soviet treaty', 1], ['The movement in East Pakistan', 1]],
}));
Q('s3_cooperation', short({
  t: 3, d: 3, c: 'evaluation', marks: 3, wl: S3,
  stem: '"India–Pakistan relations have been a story of conflict and attempts at peace side by side." Support this statement with three examples from 1947 to 1999.',
  model: '1. **Conflict and an agreement on water:** the war of **1947–48** was followed in **1960** by the **Indus Waters Treaty**.\n2. **War and talks:** the war of **1965** was followed by the **Tashkent Agreement** of 1966; the war of **1971** by the **Simla Agreement** of 1972.\n3. **Peace effort and conflict:** a bus journey to **Lahore** by Prime Minister Vajpayee in **February 1999** was followed within months by the **Kargil conflict**.',
  sol: 'Three examples, each pairing conflict with a peace step.',
  scheme: [['First paired example', 1], ['Second paired example', 1], ['Third paired example', 1]],
}));
Q('l_pakistan', long({
  t: 3, d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: 'Describe the wars of 1965 and 1971 between India and Pakistan, and the agreements that followed each.',
  model: '1. **1965 – cause:** after clashes in the **Rann of Kutch**, a larger offensive in **Jammu and Kashmir** led to wider war along the border.\n2. **1965 – end:** a **UN-backed ceasefire** in September; the **Tashkent Agreement** (January 1966), mediated by the **Soviet Union**, restored pre-war positions.\n3. **1971 – cause:** a political crisis in **East Pakistan**, a military crackdown and **millions of refugees** entering India.\n4. **1971 – war:** after the **Indo-Soviet Treaty** of August, war in **December** ended with the surrender of Pakistan\'s forces in **Dhaka** and the birth of **Bangladesh**.\n5. **After 1971:** the **Simla Agreement** (1972) committed both to **bilateral, peaceful** settlement of differences.',
  sol: 'Cause and end of each war, then the agreement after 1971.',
  scheme: [['1965: cause', 1], ['1965: ceasefire and Tashkent', 1], ['1971: cause', 1], ['1971: course and outcome', 1], ['Simla Agreement', 1]],
}));
Q('l_neighbour_policy', long({
  t: [3, 1], d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: 'Assess how far the wars of 1962, 1965 and 1971 changed the direction of India\'s foreign and defence policy.',
  model: '1. **After 1962:** India greatly increased **defence spending** and modernised its forces; idealism gave way to more **realism** about security.\n2. **After 1965:** India kept up its defence build-up and moved closer to the **Soviet Union**, which had mediated at **Tashkent**.\n3. **1971:** the **Indo-Soviet Treaty** showed closer ties with the USSR while India still called itself **non-aligned**; success in 1971 raised India\'s **regional standing**.\n4. **Nuclear thinking:** China\'s test of 1964 and later events fed India\'s decision to keep the **nuclear option** open, leading to **Pokhran 1974**.\n5. **Assessment:** the wars did not end non-alignment, but they made India give **far more weight to military strength** and to strategic partnerships.',
  sol: 'Effects of each war and a balanced overall judgement.',
  scheme: [['Effect of 1962', 1], ['Effect of 1965', 1], ['Effect of 1971', 1], ['Link to nuclear policy', 1], ['Balanced judgement', 1]],
}));

// ================================================================ t04 India's nuclear policy
Q('m_bhabha', mcq({
  t: 4, d: 1, c: 'recall',
  stem: 'Which scientist led India\'s nuclear programme in its early years?',
  opts: ['Homi J. Bhabha', 'C. V. Raman', 'Meghnad Saha', 'Jagadish Chandra Bose'],
  sol: 'Homi J. Bhabha led the programme from the late 1940s. The others were distinguished scientists but did not lead the atomic energy programme.',
}));
Q('m_1974', mcq({
  t: 4, d: 1, c: 'recall',
  stem: 'India conducted its first nuclear explosion, described by the government as peaceful, in May of which year?',
  opts: ['1974', '1962', '1998', '1968'],
  sol: 'The first test was at Pokhran in May 1974. A further series of tests followed in May 1998.',
}));
Q('m_npt_view', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'Why has India not signed the Nuclear Non-Proliferation Treaty (NPT)?',
  opts: [
    'India sees it as discriminatory, because it lets five states keep nuclear weapons while barring all others',
    'India believes nuclear energy should not be used even for electricity',
    'The treaty was signed only by African countries',
    'India was not a member of the United Nations when the treaty was made',
  ],
  sol: 'The NPT (1968) recognises as nuclear-weapon states only those that tested before 1 January 1967; India calls this discriminatory. India uses nuclear energy for electricity, the treaty is global, and India has been a UN member since 1945.',
}));
Q('m_doctrine', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'Which two ideas sum up India\'s stated nuclear doctrine?',
  opts: [
    'No first use and credible minimum deterrence',
    'First strike and unlimited arsenal',
    'Use against any non-nuclear state and a secret programme',
    'Complete disarmament now and no civilian programme',
  ],
  sol: 'India states that it will not be the first to use nuclear weapons and will keep only a credible minimum deterrent. The other pairs contradict its declared policy.',
}));
Q('m_nehru_nuclear', mcq({
  t: 4, d: 3, c: 'understanding',
  stem: 'What was Nehru\'s general position on nuclear weapons?',
  opts: [
    'He supported science and technology for development but opposed nuclear weapons and called for global disarmament',
    'He wanted India to build nuclear weapons as early as possible',
    'He opposed all research on atomic energy',
    'He wanted India to join a nuclear alliance with one superpower',
  ],
  sol: 'Nehru backed atomic research for peaceful development while campaigning against nuclear weapons and for comprehensive disarmament. The other positions are not his.',
}));
Q('m_1998_scenario', mcq({
  t: 4, d: 3, c: 'application',
  stem: 'An imagined newspaper of May 1998 carries two headlines in the same month: one on tests in the Rajasthan desert and one on tests by a neighbouring country soon after. Which neighbour is meant?',
  opts: ['Pakistan', 'China', 'Sri Lanka', 'Nepal'],
  sol: 'Pakistan carried out its own tests later in May 1998, after India\'s. China had tested much earlier (1964); Sri Lanka and Nepal have no nuclear weapons.',
}));
Q('m_ctbt', mcq({
  t: 4, d: 3, c: 'application',
  stem: 'In 1996 India refused to sign a treaty that would ban all nuclear test explosions, arguing that it froze the advantage of states that already had weapons. Which treaty was this?',
  opts: ['Comprehensive Test Ban Treaty', 'Panchsheel', 'Indus Waters Treaty', 'Simla Agreement'],
  sol: 'The CTBT (1996) bans all nuclear test explosions; India did not sign it, on grounds similar to its objection to the NPT.',
}));
Q('ar_npt', ar({
  t: 4, d: 3, c: 'analysis', key: 'a',
  a: 'India has refused to sign the NPT.',
  r: 'India regards the treaty as discriminatory because it accepts only some states as nuclear-weapon states.',
  sol: 'Both are true, and R is India\'s stated reason for A.',
}));
Q('ar_china_test', ar({
  t: 4, d: 4, c: 'analysis', key: 'b',
  a: 'China\'s nuclear test of 1964 was one of the factors that India took into account in its nuclear policy.',
  r: 'Homi J. Bhabha led India\'s atomic energy programme in its early years.',
  sol: 'Both statements are true, but R does not explain A. The security concern arising from a neighbour\'s test explains A; who led the programme does not.',
}));
Q('tf_nofirstuse', tf({
  t: 4, d: 1, c: 'recall', ans: true,
  stem: 'True or false? India\'s stated nuclear doctrine includes a commitment not to be the first to use nuclear weapons.',
  sol: 'No first use, together with credible minimum deterrence, is part of India\'s declared doctrine.',
}));
Q('fb_pokhran', fb({
  t: 4, d: 1, c: 'recall',
  stem: 'India\'s nuclear tests of 1974 and 1998 were both carried out at ___ in Rajasthan.',
  acc: [['Pokhran']],
  sol: 'Both sets of tests took place at Pokhran.',
}));
Q('ord_nuclear', ord({
  t: 4, d: 2, c: 'understanding', marks: 1,
  stem: 'Arrange these milestones of India\'s nuclear policy in chronological order.',
  items: NUCLEAR.slice(1).map(([y, e]) => e),
  sol: `NPT ${NUCLEAR[1][0]}, first test ${NUCLEAR[2][0]}, refusal of the CTBT ${NUCLEAR[3][0]}, tests ${NUCLEAR[4][0]}.`,
}));
Q('s_npt', short({
  t: 4, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Why does India call the NPT discriminatory? Explain in two points.',
  model: '1. It accepts as **nuclear-weapon states** only those that had **tested before 1 January 1967**, letting them **keep** their weapons.\n2. It requires **all other states** to give up the option, so it creates a **permanent division** between the haves and the have-nots instead of moving towards **total disarmament**.',
  sol: 'Two points: unequal treatment and no real disarmament.',
  scheme: [['Five states keep weapons', 1], ['Others barred; no general disarmament', 1]],
}));
Q('s_doctrine', short({
  t: 4, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Explain the meaning of "no first use" and "credible minimum deterrence" in India\'s nuclear policy.',
  model: '**No first use:** India says it will **not be the first** to use nuclear weapons; they are meant only to **respond** to a nuclear attack.\n**Credible minimum deterrence:** India keeps only the **smallest arsenal** needed to make a potential attacker believe that a response would be certain, so as to **deter** the attack.',
  sol: 'One clear explanation of each term.',
  scheme: [['No first use', 1], ['Credible minimum deterrence', 1]],
}));
Q('s3_1998', short({
  t: 4, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Give three reasons that are usually offered to explain why India conducted nuclear tests in May 1998.',
  model: '1. **Security environment:** India pointed to **nuclear-armed neighbours** and regional threats.\n2. **Unequal global order:** with the **NPT extended indefinitely (1995)** and the **CTBT (1996)**, India felt the window to keep its **option** was closing.\n3. **Strategic autonomy:** the government argued that a credible capability would protect India\'s **independence of decision** and its standing in world affairs.',
  sol: 'Three reasons: security, treaty regime, autonomy.',
  scheme: [['Security environment', 1], ['Treaty regime closing the option', 1], ['Strategic autonomy', 1]],
}));
Q('l_nuclear', long({
  t: 4, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: 'Trace the development of India\'s nuclear policy from the 1940s to 1998. Do you think it has been consistent with India\'s commitment to peace? Give reasons.',
  model: '1. **Beginnings:** under **Homi Bhabha**, from the late 1940s, a programme aimed at **peaceful uses** such as electricity; Nehru **opposed nuclear weapons** and called for disarmament.\n2. **Changing context:** China\'s test (**1964**) and the **NPT (1968)**, which India rejected as **discriminatory**.\n3. **1974:** a test at **Pokhran** described as a **peaceful nuclear explosion**.\n4. **1998:** tests at Pokhran, followed by a doctrine of **no first use** and **credible minimum deterrence**.\n5. **Assessment:** supporters say India kept weapons **only for deterrence** and still supports **universal disarmament**; critics say the tests raised **regional tension**. A reasoned view either way earns the mark.',
  sol: 'Four stages, then a balanced judgement with reasons.',
  scheme: [['Early programme and Nehru\'s view', 1], ['China\'s test and the NPT', 1], ['1974 test', 1], ['1998 tests and doctrine', 1], ['Reasoned judgement', 1]],
}));

// ================================================================ Source-based (four marks each)
Q('sb_belgrade', source({
  t: 1, d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the source from the imagined diary of a young interpreter at the Belgrade conference of 1961 and answer the questions that follow. ${IMAG}`,
  passage: '**Diary of an interpreter, Belgrade (imagined), September 1961**\n\nToday the hall was full of flags I had never seen before, many from countries that were colonies only a few years ago. A delegate from West Africa told me his people did not want to be counted in anyone\'s camp; they wanted roads and schools, and the freedom to say no to both giants. The Indian delegation spoke about ending the arms race and about talks between the great powers. One journalist asked whether a group of poor nations could change anything. My chief smiled and said that a hundred small voices together are not small.',
  parts: [
    child('a', short({ t: 1, d: 1, c: 'recall', marks: 1, stem: 'Which movement held its first summit at this conference?', model: 'The **Non-Aligned Movement** (NAM).', sol: 'Belgrade, September 1961, is the first NAM summit.', scheme: [['Non-Aligned Movement', 1]] })),
    child('b', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'Quote the line which shows the wish of new nations to stay out of the Cold War blocs.', model: '"His people **did not want to be counted in anyone\'s camp**."', sol: 'The phrase about not being in anyone\'s camp shows refusal to join blocs.', scheme: [['Correct line quoted', 1]] })),
    child('c', short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Using the source, explain two goals that brought these countries together.', model: '(1) **Development:** they wanted resources for **roads and schools**, not involvement in rivalry. (2) **Peace and disarmament:** the Indian delegation spoke of **ending the arms race** and talks between the great powers.', sol: 'Two goals, each tied to a line of the source.', scheme: [['First goal with reference', 1], ['Second goal with reference', 1]] }), [
      short({ t: 1, d: 4, c: 'evaluation', marks: 2, stem: '**Or** (ii): The journalist doubts that poor nations could change anything. Give two arguments that a member of the movement might offer in reply.', model: '(1) **Strength in numbers:** together the newly independent states formed a large share of the UN and could shape **debates and votes**. (2) **Moral influence:** they could press for **decolonisation and disarmament** and **mediate** between the blocs, which a single small state could not do.', sol: 'Two reasoned arguments about collective influence.', scheme: [['First argument', 1], ['Second argument', 1]] }),
    ]),
  ],
}));
Q('sb_editorial1962', source({
  t: 2, d: 4, c: 'evaluation', origin: 'soyl-original',
  stem: `Read the source from an imagined editorial in a Delhi newspaper in December 1962 and answer the questions that follow. ${IMAG}`,
  passage: '**Editorial, an imagined Delhi daily, December 1962**\n\nThe guns in the Himalaya have fallen silent since the other side announced it would stop firing, but the questions in Parliament grow louder. Members ask why our soldiers lacked warm clothing and roads to the high passes. The minister in charge of defence has gone. Eight years ago we spoke of five principles of friendship with our northern neighbour; today the map of the frontier is the subject of every tea-shop argument. Our task now is to rebuild our strength without losing the voice for peace that has earned us respect abroad.',
  parts: [
    child('a', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'How did the fighting referred to in the editorial come to an end?', model: 'The other side (**China**) announced a **unilateral ceasefire**.', sol: '"Announced it would stop firing" refers to China\'s unilateral ceasefire of November 1962.', scheme: [['Unilateral ceasefire by China', 1]] })),
    child('b', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Which earlier agreement is meant by "five principles of friendship"?', model: '**Panchsheel**, the India–China agreement of **1954**.', sol: 'Eight years before 1962 and five principles point to Panchsheel.', scheme: [['Panchsheel 1954', 1]] })),
    child('c', short({ t: 2, d: 4, c: 'evaluation', marks: 2, stem: '**Either** (i): Identify two political consequences of the war in India suggested by the editorial.', model: '(1) **Questions in Parliament** about preparedness, which led to a **no-confidence motion** against the government in 1963. (2) The **defence minister resigned** ("the minister in charge of defence has gone").', sol: 'Two consequences linked to lines of the source.', scheme: [['First consequence', 1], ['Second consequence', 1]] }), [
      short({ t: 2, d: 4, c: 'evaluation', marks: 2, stem: '**Or** (ii): The editorial wants India to "rebuild our strength without losing the voice for peace". Explain two ways in which India tried to do this after 1962.', model: '(1) It **raised defence spending** and modernised the armed forces. (2) It **stayed non-aligned**, kept working for **disarmament** and, over time, sought **normal relations** with China (ambassadors restored in 1976).', sol: 'One step on strength and one on peace.', scheme: [['Step to rebuild strength', 1], ['Step keeping the voice for peace', 1]] }),
    ]),
  ],
}));
Q('sb_camp1971', source({
  t: 3, d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the source from the imagined report of a relief volunteer near the eastern border in 1971 and answer the questions that follow. ${IMAG}`,
  passage: '**Report of a relief volunteer, a border district of West Bengal (imagined), July 1971**\n\nEvery morning more families cross the fields from the east carrying what they can. They speak of an election their party won last winter and of the army moving into their towns in March. The camp school now has more children than the district\'s three schools together. The district officer says the state cannot carry this load for long and that the matter must be raised before the world. In the evening the radio reports that our country is talking with a friendly great power about a treaty.',
  parts: [
    child('a', short({ t: 3, d: 2, c: 'application', marks: 1, stem: 'Which election does the source refer to, and which party won it?', model: 'The **1970 elections** in Pakistan, won in the east by the **Awami League**.', sol: '"Last winter" from July 1971 means the elections of December 1970.', scheme: [['1970 election and the Awami League', 1]] })),
    child('b', short({ t: 3, d: 2, c: 'application', marks: 1, stem: 'Name the treaty the radio report most likely refers to.', model: 'The **Indo-Soviet Treaty of Peace, Friendship and Cooperation** (August 1971).', sol: 'A friendly great power in mid-1971 points to the USSR.', scheme: [['Indo-Soviet Treaty 1971', 1]] })),
    child('c', short({ t: 3, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Using the source, explain how the crisis in East Pakistan became India\'s concern.', model: '(1) The **refugee flow** placed a burden that the state "cannot carry for long" on India\'s economy and services. (2) India therefore **raised the matter internationally** and sought support, and the crisis ended in the **war of December 1971**.', sol: 'Refugee burden and the diplomatic and military response.', scheme: [['Refugee burden', 1], ['India\'s response', 1]] }), [
      short({ t: 3, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): What was the outcome of the crisis described in the source, for East Pakistan and for India–Pakistan relations?', model: '(1) **East Pakistan** became the independent country of **Bangladesh** in December 1971. (2) India and Pakistan later signed the **Simla Agreement** (1972), agreeing to settle differences **bilaterally and peacefully**.', sol: 'One outcome for each.', scheme: [['Outcome for East Pakistan', 1], ['Outcome for relations: Simla', 1]] }),
    ]),
  ],
}));
Q('sb_debate1998', source({
  t: 4, d: 4, c: 'evaluation', origin: 'soyl-original',
  stem: `Read the source from the imagined notes of a college debate held in June 1998 and answer the questions that follow. ${IMAG}`,
  passage: '**Notes of a college debate, Pune (imagined), June 1998**\n\nThe first speaker said the tests of last month were the end of a long road that began with the atomic research of the 1940s. She argued that a treaty which lets five states keep their arsenals and asks the rest to give up the option can never be fair. The second speaker replied that the tests had made the region more tense, since a neighbour had tested within weeks. The chair closed the debate by noting that the government had promised never to strike first and to keep only what is needed to deter.',
  parts: [
    child('a', short({ t: 4, d: 1, c: 'recall', marks: 1, stem: 'Where were the tests mentioned in the source carried out?', model: 'At **Pokhran**, in **Rajasthan** (May 1998).', sol: 'India\'s tests of May 1998 took place at Pokhran.', scheme: [['Pokhran', 1]] })),
    child('b', short({ t: 4, d: 2, c: 'application', marks: 1, stem: 'Which treaty does the first speaker criticise, and on what ground?', model: 'The **NPT**, as **discriminatory**: five states keep their weapons while others must give up the option.', sol: 'The description of five states keeping arsenals fits the NPT.', scheme: [['NPT and the discrimination ground', 1]] })),
    child('c', short({ t: 4, d: 4, c: 'evaluation', marks: 2, stem: '**Either** (i): Identify the two parts of India\'s nuclear doctrine mentioned by the chair and explain one of them.', model: '**No first use** ("never to strike first") and **credible minimum deterrence** ("only what is needed to deter"). Minimum deterrence means keeping just enough capability that an attacker expects a certain response, so the attack is **deterred**.', sol: 'Name both, explain one.', scheme: [['Both named', 1], ['One explained', 1]] }), [
      short({ t: 4, d: 4, c: 'evaluation', marks: 2, stem: '**Or** (ii): Which speaker\'s argument do you find more convincing? Give two reasons for your choice.', model: 'Either view can score if reasoned. For example, the **first speaker**: (1) the treaty regime was **unequal** and closing India\'s **option**; (2) India faced **nuclear-armed neighbours**. Or the **second**: (1) the neighbour\'s quick tests show a **regional arms race**; (2) tension raised the **risk of conflict**.', sol: 'A clear choice with two reasons drawn from the debate or the chapter.', scheme: [['First reason', 1], ['Second reason', 1]] }),
    ]),
  ],
}));
Q('sb_letter1966', source({
  t: 3, d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the source from an imagined letter written by a farmer in a Punjab border village in January 1966 and answer the questions that follow. ${IMAG}`,
  passage: '**Letter from a farmer in a border village of Punjab to his son (imagined), January 1966**\n\nThe fields near the canal were dug up for trenches in September, and we spent three weeks with relatives in the next district. Now the radio says the leaders of the two countries have met in a cold city far to the north, with the Russians as hosts, and have agreed that the armies will go back to where they stood before the fighting. Your mother is glad, though she says the trouble over the valley in the north is still unsettled.',
  parts: [
    child('a', short({ t: 3, d: 2, c: 'application', marks: 1, stem: 'Which agreement does the radio news refer to?', model: 'The **Tashkent Agreement** of January 1966.', sol: 'A meeting hosted by the Russians in January 1966 after the September fighting is Tashkent.', scheme: [['Tashkent Agreement', 1]] })),
    child('b', short({ t: 3, d: 2, c: 'application', marks: 1, stem: 'Quote the line that states the main term of the agreement.', model: '"The **armies will go back to where they stood before the fighting**."', sol: 'Withdrawal to pre-war positions was the main term.', scheme: [['Correct line', 1]] })),
    child('c', short({ t: 3, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): What does the letter suggest about the costs of the 1965 war for ordinary people? Give two points.', model: '(1) **Farms were damaged** (fields dug up for trenches), hurting livelihoods. (2) **Families were displaced** for weeks, living with relatives away from home.', sol: 'Two costs drawn from the letter.', scheme: [['First cost', 1], ['Second cost', 1]] }), [
      short({ t: 3, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): The mother says the dispute over the valley is still unsettled. Explain why the agreement could not settle it.', model: 'The agreement only **restored pre-war positions** and normal relations; it did not deal with the **core question of Kashmir**, on which the two countries held **conflicting positions**, so the dispute remained.', sol: 'Restored the status quo; the underlying dispute was untouched.', scheme: [['What the agreement did', 1], ['Why the dispute remained', 1]] }),
    ]),
  ],
}));
