// CBSE 12 Political Science, ch08 Challenges of Nation-Building — question bank. Every source, diary,
// report and scenario is imagined and written by SOYL (labelled as such); no NCERT text, box, cartoon or
// exercise and no board/sample-paper item is reused (D-036); no real person is quoted. Real-world facts are
// limited to stable, verifiable ones (dates of independence, Partition, the integration of princely states
// and the creation of states up to 2014). Partition violence is described factually, without blaming any
// community. Nothing after 2024 is stated.
import { Q, mcq, ar, tf, fb, match, ord, short, long, source, child } from './lib.mjs';

const S2 = [30, 50];
const S3 = [50, 80];
const L5 = [80, 120];
const IMAG = '*(Imagined document written by SOYL for practice; the people in it are not real, though the events in the background are.)*';

// Chronology used by the ordering items, the timelines and the notes (checked in build.mjs).
export const EVENTS = [
  [1947, 'Independence and Partition (August)'],
  [1948, 'Hyderabad joins India after police action (September)'],
  [1949, 'Merger agreement for Manipur signed (September)'],
  [1953, 'Andhra State formed (October)'],
  [1956, 'States Reorganisation Act'],
  [1960, 'Bombay State divided into Maharashtra and Gujarat'],
];
export const NEW_STATES = [
  [1960, 'Maharashtra, Gujarat'],
  [1963, 'Nagaland'],
  [1966, 'Punjab, Haryana'],
  [1972, 'Meghalaya, Manipur, Tripura'],
  [1987, 'Mizoram, Arunachal Pradesh'],
  [2000, 'Chhattisgarh, Uttarakhand, Jharkhand'],
  [2014, 'Telangana'],
];
for (let i = 1; i < EVENTS.length; i++) if (EVENTS[i][0] < EVENTS[i - 1][0]) throw new Error('EVENTS out of order');
for (let i = 1; i < NEW_STATES.length; i++) if (NEW_STATES[i][0] <= NEW_STATES[i - 1][0]) throw new Error('NEW_STATES out of order');

// ================================================================ t01 Challenges for the new nation; Partition
Q('m_three_challenges', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Which set correctly lists the three broad challenges that independent India faced in 1947?',
  opts: [
    'Building national unity, establishing democracy, and ensuring development for the whole society',
    'Winning a war, writing a budget, and holding a census',
    'Joining the United Nations, building dams, and choosing a national flag',
    'Abolishing the states, creating one language, and ending all elections',
  ],
  sol: 'The new nation had to shape a united country that accommodated diversity, set up a working democracy, and secure the well-being of all, not only some groups. The other options mix unrelated tasks or describe things India did not attempt.',
}));
Q('m_unity_diversity', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'The first challenge of nation-building was to build unity "while accommodating diversity". What does this mean for a country like India?',
  opts: [
    'Holding the country together while respecting its many languages, religions and cultures',
    'Making every citizen follow one religion and speak one language',
    'Allowing each region to become a separate country',
    'Keeping the princely states outside the Union',
  ],
  sol: 'India\'s leaders aimed at unity without uniformity: a single nation in which different languages, faiths and cultures could live together. Forcing sameness, breaking the country up or leaving out the princely states would each defeat this aim.',
}));
Q('m_democracy_challenge', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Which step taken by independent India most directly answered the challenge of establishing democracy?',
  opts: [
    'Adopting a Constitution with fundamental rights and voting rights for every adult citizen',
    'Dividing British India into two dominions',
    'Signing Instruments of Accession with princely rulers',
    'Setting up linguistic states in 1956',
  ],
  sol: 'A representative democracy based on a Constitution, rights and universal adult franchise was the answer to the second challenge. Partition, accession and linguistic states relate mainly to the challenge of unity.',
}));
Q('m_two_nation', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'The demand for the creation of Pakistan was based on which idea?',
  opts: ['The two-nation theory', 'The doctrine of lapse', 'The principle of non-alignment', 'The theory of mixed economy'],
  sol: 'The Muslim League argued that Hindus and Muslims formed two separate nations, the two-nation theory, and demanded a separate country for Muslims. The doctrine of lapse was a nineteenth-century annexation policy; non-alignment and mixed economy belong to later chapters.',
}));
Q('m_belt', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Why did Pakistan come into being in 1947 as two separate parts, West Pakistan and East Pakistan?',
  opts: [
    'There was no single continuous belt of Muslim-majority areas; there were two such zones, in the west and the east',
    'The British wanted to give one part each to two different rulers',
    'The princely states chose to divide themselves between the two parts',
    'East Pakistan was created by the States Reorganisation Commission',
  ],
  sol: 'Muslim-majority areas lay in two zones, one in the north-west and one in the east, separated by a large stretch of Indian territory. So Pakistan had two wings. The other options are incorrect.',
}));
Q('m_frontier', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: 'The leader of the North-West Frontier Province known as "Frontier Gandhi" opposed the two-nation theory, yet the province became part of Pakistan. What problem of Partition does this illustrate?',
  opts: [
    'Not every Muslim-majority area wanted to join Pakistan, but the wishes of such areas were overruled',
    'Princely states could choose to remain independent',
    'Punjab and Bengal had large non-Muslim populations',
    'Minorities in both countries were promised full protection',
  ],
  sol: 'Khan Abdul Ghaffar Khan, the "Frontier Gandhi", opposed Partition, but his views were overlooked and the province merged with Pakistan. It shows that being Muslim-majority did not mean an area wished to join Pakistan. The other options describe other issues.',
}));
Q('m_punjab_bengal', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Why were the provinces of Punjab and Bengal themselves divided at the time of Partition?',
  opts: [
    'Both had Muslim-majority areas as well as large areas where Hindus and Sikhs (in Punjab) or Hindus (in Bengal) were in a majority',
    'Both provinces had asked to become independent countries',
    'Both were princely states that refused to sign the Instrument of Accession',
    'Both were too large to be governed from Delhi',
  ],
  sol: 'Each province had a Muslim majority overall but large non-Muslim populations in many districts, so the boundary was drawn through the provinces, district by district or even lower. They were British provinces, not princely states.',
}));
Q('m_minorities', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Which statement best describes the problem of minorities at the time of Partition?',
  opts: [
    'Large numbers of Hindus and Sikhs were left in areas that became Pakistan, and many Muslims in areas that remained India',
    'All minorities were moved peacefully before 15 August 1947',
    'Minorities lived only in the princely states',
    'There were no minorities on either side of the new border',
  ],
  sol: 'Because communities were intermixed almost everywhere, the new border left millions on the "wrong" side, and many feared for their safety. There was no orderly transfer, and minorities were found across British India.',
}));
Q('m_consequence', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Which one of the following was a consequence of Partition?',
  opts: [
    'One of the largest and most sudden movements of population in history, with great loss of life on both sides',
    'The immediate creation of linguistic states in India',
    'The end of all communal tension in South Asia',
    'The merger of every princely state into Pakistan',
  ],
  sol: 'Partition led to forced migration on a huge scale and to violence in which people of every community suffered. Linguistic states came later (1953 onwards), communal tension did not end, and most princely states joined India.',
}));
Q('m_secular_choice', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: 'Even after Partition on religious lines, India\'s leaders chose to make India a secular state. Which reason best explains this choice?',
  opts: [
    'They believed the state should treat all faiths equally and that citizenship should not depend on religion',
    'India had no religious minorities left after 1947',
    'The British had made secularism a condition of independence',
    'A secular state was needed to join the United Nations',
  ],
  sol: 'Most leaders of the national movement held that India belonged to all its people, whatever their faith, and that the state must not favour any religion. India still had large religious minorities; the other two reasons are false.',
}));
Q('m_imagined_family', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'An imagined family that had lived for generations in Lahore reaches Amritsar in late 1947 with almost nothing, after leaving behind its home and shop. Which aspect of Partition does this family\'s story show most clearly?',
  opts: [
    'Forced migration and the loss of homes and property',
    'The integration of princely states',
    'The reorganisation of states on linguistic lines',
    'The adoption of universal adult franchise',
  ],
  sol: 'Leaving a home across the new border and arriving as a refugee is forced migration, with the loss of property that went with it. The other options belong to later topics.',
}));
Q('ar_belt', ar({
  t: 1, d: 2, c: 'analysis', key: 'a',
  a: 'Pakistan was formed with two wings separated by Indian territory.',
  r: 'Muslim-majority areas in British India were concentrated in two zones, one in the north-west and one in the east.',
  sol: 'Both are true and R explains A: because the two Muslim-majority zones were far apart, the new country had a western and an eastern wing.',
}));
Q('ar_gandhi', ar({
  t: 1, d: 3, c: 'analysis', key: 'b',
  a: 'Mahatma Gandhi spent the days of the transfer of power in 1947 working for communal harmony in riot-hit areas rather than at the celebrations in Delhi.',
  r: 'Mahatma Gandhi was assassinated on 30 January 1948.',
  sol: 'Both statements are true, but R does not explain A. A is about how Gandhi spent August 1947; R is a later event and is not the reason for his work in the riot-hit areas.',
}));
Q('m_first_vote', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'In an imagined village in 1952, a landless labourer and the landlord he works for stand in the same queue to cast one vote each in the first general election. Which challenge of nation-building does this scene show being met?',
  opts: [
    'Establishing democracy through universal adult franchise',
    'Integrating the princely states',
    'Drawing the boundary of Partition',
    'Reorganising states on linguistic lines',
  ],
  sol: 'Equal votes for every adult, whatever their wealth, is the heart of the democratic challenge. The other options concern territory and boundaries.',
}));
Q('m_dev_plan', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'An imagined state government in the early 1950s decides to spend most of its new budget on wells, schools and clinics in its poorest districts. Which of the three challenges is it mainly addressing?',
  opts: ['Development', 'Unity', 'Democracy', 'Partition'],
  sol: 'Improving the well-being of the poorest sections is the challenge of development. Unity and democracy concern the nation\'s integrity and its political system; Partition is not a challenge but an event.',
}));
Q('ar_violence', ar({
  t: 1, d: 3, c: 'analysis', key: 'c',
  a: 'Partition was accompanied by violence and suffering on both sides of the new border.',
  r: 'The transfer of population was carefully planned, so very few people had to leave their homes.',
  sol: 'A is true. R is false: there was no orderly plan for moving people, and millions had to flee their homes in a short time.',
}));
Q('tf_one_wing', tf({
  t: 1, d: 1, c: 'recall', ans: false,
  stem: 'True or false? In 1947 Pakistan was created as a single continuous territory to the west of India.',
  sol: 'Pakistan had two wings, West Pakistan and East Pakistan, separated by Indian territory.',
}));
Q('tf_dev', tf({
  t: 1, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? The challenge of development meant ensuring the well-being of the whole society, not only of some sections.',
  sol: 'The third challenge was development for all; the Directive Principles of State Policy set out goals of welfare and reducing inequality.',
}));
Q('fb_two_nation', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'The idea that Hindus and Muslims formed two separate nations was called the ___ theory.',
  acc: [['two-nation', 'two nation']],
  sol: 'It was the two-nation theory, put forward by the Muslim League.',
}));
Q('mt_partition', match({
  t: 1, d: 2, c: 'understanding',
  stem: 'Match each Partition-era term with the description that fits it.',
  pairs: [
    ['Two-nation theory', 'The claim that Hindus and Muslims formed separate nations'],
    ['East Pakistan', 'The eastern wing of the new country'],
    ['Frontier Gandhi', 'A leader of the North-West Frontier Province who opposed Partition'],
    ['Refugee', 'A person forced to cross the new border, leaving home behind'],
  ],
  sol: 'Each term is matched with its standard meaning in the chapter.',
}));
Q('s_three_challenges', short({
  t: 1, d: 1, c: 'recall', marks: 2, wl: S2,
  stem: 'Name the three challenges independent India faced and state the main aim of any one of them.',
  model: 'The challenges were **unity** (with diversity), **democracy** and **development**. **Development** aimed at the **well-being of the whole society**, especially the poor, not only a few groups.',
  sol: 'Three challenges named; one aim stated.',
  scheme: [['Three challenges named', 1], ['Aim of one challenge', 1]],
}));
Q('s_two_wings', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Explain why the Partition of 1947 created a country with two wings far apart from each other.',
  model: 'Muslim-majority areas did not form **one continuous belt**. One cluster lay in the **north-west** and another in the **east**, so Pakistan was made of **West Pakistan and East Pakistan**, separated by more than a thousand kilometres of Indian territory.',
  sol: 'Two separate zones of Muslim majority → two wings.',
  scheme: [['Two separate Muslim-majority zones', 1], ['Result: two wings with India between', 1]],
}));
Q('s_minorities', short({
  t: 1, d: 2, c: 'analysis', marks: 2, wl: S2,
  stem: 'Why did the issue of minorities become one of the most painful problems of Partition?',
  model: 'Communities were **intermixed** almost everywhere, so the new border left **millions of Hindus and Sikhs** in Pakistan and **many Muslims** in India. Fearing **violence**, huge numbers felt forced to **leave their homes** and cross the border.',
  sol: 'Intermixed population plus fear → forced migration.',
  scheme: [['Minorities left on both sides', 1], ['Fear and forced migration', 1]],
}));
Q('s3_problems', short({
  t: 1, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Explain any three difficulties in the process of drawing the line of Partition in 1947.',
  model: '1. **No single Muslim-majority belt**: there were two zones, so Pakistan had to be made of two distant wings.\n2. **Not all Muslim-majority areas wanted Pakistan**: the leader of the North-West Frontier Province opposed it, yet the province was merged.\n3. **Punjab and Bengal** had large non-Muslim populations, so the provinces themselves had to be divided district by district, and **minorities** were left on both sides.',
  sol: 'Any three of the four standard difficulties, each explained.',
  scheme: [['First difficulty explained', 1], ['Second difficulty explained', 1], ['Third difficulty explained', 1]],
}));
Q('s3_consequences', short({
  t: 1, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Describe three consequences of Partition for the people of the subcontinent.',
  model: '1. **Forced migration**: millions left their homes and became **refugees** across the new border.\n2. **Violence and loss of life**: people of all communities were killed or injured, and many women suffered abduction and abuse.\n3. **Division of property and services**: assets, offices, the railways and even the army were divided, and families and communities were **split**.',
  sol: 'Three distinct consequences, stated factually without blaming any community.',
  scheme: [['First consequence', 1], ['Second consequence', 1], ['Third consequence', 1]],
}));
Q('l_challenges', long({
  t: 1, d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: 'Explain the three challenges for nation-building that independent India faced. Which do you think was the most difficult in 1947, and why?',
  model: '1. **Unity:** shaping one nation out of a land of many languages, religions and regions, while **accommodating diversity**.\n2. **Democracy:** setting up a **representative democracy** under a Constitution, with rights and votes for every adult.\n3. **Development:** ensuring the **well-being of the whole society**, especially the poor, as the Directive Principles require.\n4. **Context:** Partition, refugees, communal violence and more than 500 princely states made all three harder.\n5. **Judgement:** in 1947 the challenge of **unity** was the most urgent, because the very territory and integrity of the country were at stake; democracy and development depended on solving it first. (Any well-reasoned choice is acceptable.)',
  sol: 'Explain all three, set the 1947 context, then make and justify a choice.',
  scheme: [['Unity explained', 1], ['Democracy explained', 1], ['Development explained', 1], ['Context of 1947', 1], ['Reasoned judgement', 1]],
}));
Q('l_partition', long({
  t: 1, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: 'Partition was described at the time as a "transfer of power", but for millions of people it meant a transfer of homes. Explain the problems in the process of Partition and assess its human consequences.',
  model: '1. **Basis:** British India was divided on the **two-nation theory**, on the basis of religious majorities.\n2. **Problems in the process:** there was **no single Muslim-majority belt** (so two wings), not every Muslim-majority area wanted Pakistan, and **Punjab and Bengal** had to be split district by district.\n3. **Minorities:** millions were left on the "wrong" side of the line and feared for their safety.\n4. **Human cost:** one of the largest forced migrations in history; violence in which people of **all communities** suffered; families divided; women especially vulnerable.\n5. **Assessment:** the political transfer was completed on time, but the **human consequences** were tragic and long-lasting, which is why India\'s leaders insisted on a **secular state** that protects every citizen.',
  sol: 'Basis, problems in the process, minorities, human cost, and a balanced assessment.',
  scheme: [['Basis of Partition', 1], ['Problems in the process', 1], ['Minorities', 1], ['Human consequences', 1], ['Assessment', 1]],
}));
Q('sb_station', source({
  t: 1, d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the source from the imagined diary of a railway clerk at Amritsar in 1947 and answer the questions that follow. ${IMAG}`,
  passage: '**Diary of a railway clerk, Amritsar (imagined), September 1947**\n\nThe train from the west came in at dawn, three hours late and so crowded that people sat on the roof. Many had walked for days to reach the station on the other side. An old man asked me whether the house he had left would still be his when things settled down. I had no answer. In the afternoon a train left in the other direction, just as full. The volunteers at the platform, people of every faith, gave water to everyone who asked, without asking their names.',
  parts: [
    child('a', short({ t: 1, d: 1, c: 'understanding', marks: 1, stem: 'Which event in the history of the subcontinent forms the background of this diary?', model: 'The **Partition** of British India in **1947** and the migration that followed.', sol: 'Trains full of people crossing a new border in 1947 point to Partition.', scheme: [['Partition of 1947', 1]] })),
    child('b', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'Quote the line which shows that migration took place in both directions.', model: '"In the afternoon a **train left in the other direction, just as full**."', sol: 'The second train shows people moving the other way too.', scheme: [['Correct line quoted', 1]] })),
    child('c', short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): What does the old man\'s question tell us about the human consequences of Partition? Explain two.', model: '(1) **Loss of homes and property**: people left houses they had lived in for generations and did not know if they could ever return. (2) **Uncertainty and trauma**: refugees arrived with nothing, unsure of their future in a new place.', sol: 'Two consequences linked to the question about the house.', scheme: [['First consequence explained', 1], ['Second consequence explained', 1]] }), [
      short({ t: 1, d: 3, c: 'evaluation', marks: 2, stem: '**Or** (ii): Why might the diarist have chosen to record the work of volunteers "of every faith"? Give two reasons.', model: '(1) In a time of **communal violence**, their help showed that **humanity crossed religious lines**. (2) It shows the **secular ideal** that independent India later chose: citizens helping one another whatever their faith.', sol: 'Two reasons linked to harmony across communities.', scheme: [['First reason', 1], ['Second reason', 1]] }),
    ]),
  ],
}));
Q('sb_boundary', source({
  t: 1, d: 4, c: 'evaluation', origin: 'soyl-original',
  stem: `Read the source from an imagined letter by a village schoolteacher in Bengal in 1947 and answer the questions that follow. ${IMAG}`,
  passage: '**Letter from a village schoolteacher to his brother (imagined), Bengal, August 1947**\n\nThey say the line will pass between our village and the market town, though both have people of every faith. Half my pupils may soon belong to another country. The headman says the province was divided because it had a Muslim majority as a whole but many districts with a Hindu majority. Nobody asked us where we wished to live. I will stay and keep the school open for as long as the children come.',
  parts: [
    child('a', short({ t: 1, d: 2, c: 'understanding', marks: 1, stem: 'According to the headman, why was the province divided?', model: 'It had a **Muslim majority as a whole** but **many districts with a Hindu majority**, so it was split.', sol: 'Read the headman\'s explanation.', scheme: [['Reason given', 1]] })),
    child('b', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'Which line shows that the wishes of ordinary people were not taken into account?', model: '"**Nobody asked us where we wished to live.**"', sol: 'This line shows no consultation.', scheme: [['Correct line', 1]] })),
    child('c', short({ t: 1, d: 4, c: 'evaluation', marks: 2, stem: '**Either** (i): Using the letter, explain two problems of drawing a boundary through a province like Bengal.', model: '(1) **Mixed communities**: villages and towns had people of every faith, so any line left **minorities** on both sides. (2) **Everyday life was cut apart**: a school, a village and its market could end up in **different countries**, disrupting families and livelihoods.', sol: 'Two problems drawn from the letter.', scheme: [['First problem', 1], ['Second problem', 1]] }), [
      short({ t: 1, d: 4, c: 'evaluation', marks: 2, stem: '**Or** (ii): What does the teacher\'s decision to keep the school open suggest about the challenges facing the new nation? Give two points.', model: '(1) **Continuity of daily life and education** had to be maintained despite upheaval, a part of the challenge of **development**. (2) Ordinary citizens who stayed on had to be assured of **safety and equal rights**, part of building a **united, secular democracy**.', sol: 'Link the decision to two of the nation-building challenges.', scheme: [['First point', 1], ['Second point', 1]] }),
    ]),
  ],
}));

// ================================================================ t02 Integration of princely states
Q('m_565', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'Roughly how many princely states existed in British India at the time of independence?',
  opts: ['About 565', 'About 56', 'About 1,500', 'Exactly 14'],
  sol: 'There were about 565 princely states, large and small, covering a large part of the subcontinent. Fourteen is the number of states created by the 1956 Act.',
}));
Q('m_paramountcy', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'What was the legal position of the princely states when British rule ended in 1947?',
  opts: [
    'British paramountcy lapsed, and the states were in principle free to join India, join Pakistan or remain independent',
    'They automatically became part of India',
    'They automatically became part of Pakistan',
    'They remained under British control until 1956',
  ],
  sol: 'With the end of British paramountcy, the rulers were legally free to decide, and the choice was left to them rather than to the people. That is why integration became a major challenge for unity.',
}));
Q('m_instrument', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'The document by which a princely ruler agreed to join the Indian Union was called the',
  opts: ['Instrument of Accession', 'Standstill Agreement', 'Charter of Rights', 'Objectives Resolution'],
  sol: 'Rulers signed the Instrument of Accession, usually handing over defence, external affairs and communications to the Union. A Standstill Agreement only kept existing arrangements going for a time.',
}));
Q('m_patel', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'Who, as Deputy Prime Minister and Home Minister, led the integration of the princely states?',
  opts: ['Sardar Vallabhbhai Patel', 'B. R. Ambedkar', 'Rajendra Prasad', 'Maulana Abul Kalam Azad'],
  sol: 'Sardar Patel led the effort, assisted by the senior official V. P. Menon. Ambedkar chaired the Drafting Committee of the Constitution, Rajendra Prasad presided over the Constituent Assembly, and Azad was Education Minister.',
}));
Q('m_approach', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Which of the following was part of the Indian government\'s approach to the princely states?',
  opts: [
    'Most people in the states wanted to join India, so the government combined persuasion with firmness while allowing some regions a measure of autonomy',
    'Every state would be allowed to remain independent if its ruler wished',
    'The rulers would be removed by force without any negotiation',
    'The states would be handed over to Pakistan if they refused to join India',
  ],
  sol: 'The government held that most people in the states wished to be part of India, was flexible about autonomy for some areas, and treated the territorial unity of the country as essential. Most rulers joined by negotiation; independence for every state was not accepted.',
}));
Q('m_hyderabad', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'How did the princely state of Hyderabad finally become part of India?',
  opts: [
    'After the Nizam delayed joining, the Indian army took action in September 1948 and the state was integrated',
    'Its ruler signed the Instrument of Accession before 15 August 1947',
    'A plebiscite in 1947 chose to join India',
    'It was created as a new state by the 1956 Act',
  ],
  sol: 'The Nizam wanted Hyderabad to be independent and signed only a Standstill Agreement in November 1947. Amid unrest, including a peasant movement in Telangana and violence by an armed group called the Razakars, Indian forces moved in in September 1948 and the state joined India.',
}));
Q('m_manipur', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'Manipur held elections under universal adult franchise in 1948, but its merger agreement with India in September 1949 was signed without consulting the elected Legislative Assembly. Why is this remembered as a sensitive issue?',
  opts: [
    'Because the elected representatives of the people were not consulted, which caused lasting resentment in the region',
    'Because Manipur was merged with Pakistan',
    'Because the merger was decided by the United Nations',
    'Because Manipur had refused to hold any elections',
  ],
  sol: 'Manipur had become a constitutional monarchy with an elected assembly, yet the merger was signed by the Maharaja without consulting it. This left a sense of grievance. The other options are false.',
}));
Q('m_junagadh', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'The ruler of Junagadh announced accession to Pakistan in 1947, though most of the state\'s people were Hindu and the state lay inside Indian territory. How was the question settled?',
  opts: [
    'A plebiscite in 1948 confirmed the people\'s wish to join India',
    'The ruler\'s decision was accepted and Junagadh joined Pakistan',
    'Junagadh became an independent country',
    'The question was referred to the States Reorganisation Commission',
  ],
  sol: 'After the ruler\'s announcement and the unrest that followed, a plebiscite was held in February 1948 and the people voted to join India. The SRC came only in 1953.',
}));
Q('m_ruler_letter', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'In an imagined 1947 letter, a ruler agrees to hand defence and foreign affairs to the Union but asks to keep his state\'s own land-revenue customs for the time being, and the Union agrees. Which feature of the government\'s approach does the Union\'s reply show?',
  opts: [
    'Flexibility in allowing a measure of local autonomy',
    'Refusal to negotiate with any ruler',
    'Acceptance of the ruler\'s right to stay independent',
    'Reorganisation of the state on linguistic lines',
  ],
  sol: 'The Union insisted on the core subjects but allowed some local arrangements to continue, which is the flexible side of its approach. It did not refuse to negotiate, did not accept independence, and linguistic reorganisation came later.',
}));
Q('ar_rulers', ar({
  t: 2, d: 2, c: 'analysis', key: 'a',
  a: 'The integration of the princely states was a serious challenge to the unity of the new nation in 1947.',
  r: 'With the end of British paramountcy, the rulers were legally free to remain independent, which could have broken India into many pieces.',
  sol: 'Both are true and R explains A: legal freedom for some 565 rulers to stay independent threatened to divide the country.',
}));
Q('ar_manipur', ar({
  t: 2, d: 3, c: 'analysis', key: 'b',
  a: 'Manipur was among the first parts of India to hold an election under universal adult franchise.',
  r: 'Almost all princely states signed the Instrument of Accession before 15 August 1947.',
  sol: 'Both statements are true, but R does not explain A. Manipur\'s 1948 election followed its own constitutional reforms; R is a general fact about accession.',
}));
Q('tf_menon', tf({
  t: 2, d: 1, c: 'recall', ans: true,
  stem: 'True or false? V. P. Menon was the senior official who worked with Sardar Patel on the integration of the princely states.',
  sol: 'V. P. Menon, Secretary of the States Department, assisted Patel in negotiating with the rulers.',
}));
Q('fb_standstill', fb({
  t: 2, d: 2, c: 'recall',
  stem: 'In November 1947 the Nizam of Hyderabad signed a ___ Agreement with India, which kept existing arrangements going for one year.',
  acc: [['Standstill']],
  sol: 'He signed a Standstill Agreement, not the Instrument of Accession.',
}));
Q('ord_integration', ord({
  t: [2, 3], d: 2, c: 'understanding', marks: 1,
  stem: 'Arrange these events of nation-building in chronological order.',
  items: [
    'Independence and the Partition of British India',
    'Hyderabad becomes part of India after police action',
    'Manipur\'s merger agreement is signed',
    'Andhra State is formed',
  ],
  sol: '1947 Partition, September 1948 Hyderabad, September 1949 Manipur, October 1953 Andhra State.',
}));
Q('s_instrument', short({
  t: 2, d: 1, c: 'understanding', marks: 2, wl: S2,
  stem: 'What was the Instrument of Accession? Why was it important in 1947?',
  model: 'It was the **document** by which a **princely ruler agreed to join India**, usually handing over **defence, external affairs and communications** to the Union. Its signing by almost every ruler before 15 August 1947 **kept the country territorially united**.',
  sol: 'Meaning plus importance.',
  scheme: [['Meaning', 1], ['Importance', 1]],
}));
Q('s_approach', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State any two features of the government\'s approach to the integration of princely states.',
  model: '(1) It held that **most people in the states wanted to join India**. (2) It was **flexible**, offering a measure of **autonomy** to some regions while treating **territorial unity** as essential.',
  sol: 'Any two of the three features.',
  scheme: [['First feature', 1], ['Second feature', 1]],
}));
Q('s_manipur', short({
  t: 2, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: 'Why did the manner of Manipur\'s merger with India in 1949 leave a sense of grievance?',
  model: 'Manipur had held **elections under universal adult franchise** in 1948 and had an **elected Legislative Assembly**. The **merger agreement** of September 1949 was signed **without consulting** that assembly, so many people felt their democratic voice had been ignored.',
  sol: 'Contrast the elected assembly with the decision taken without it.',
  scheme: [['Elected assembly in place', 1], ['Merger without consultation', 1]],
}));
Q('s3_hyderabad', short({
  t: 2, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'Describe the circumstances in which Hyderabad was integrated into India.',
  model: '1. Hyderabad was the **largest princely state**; its ruler, the **Nizam**, wanted it to be **independent**.\n2. He signed only a **Standstill Agreement** (November 1947) while negotiations went on; there was a **peasant movement in Telangana** and violence by an armed group, the **Razakars**.\n3. In **September 1948** the Indian army moved in, and Hyderabad became part of India.',
  sol: 'The Nizam\'s stand, the unrest, and the outcome in 1948.',
  scheme: [['Nizam\'s wish for independence', 1], ['Standstill Agreement and unrest', 1], ['Integration in September 1948', 1]],
}));
Q('s3_difficult', short({
  t: 2, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Most princely states joined India peacefully. Name three states whose integration proved more difficult and give one reason for each.',
  model: '1. **Hyderabad**: the Nizam wished to stay **independent**; the state joined after police action in 1948.\n2. **Junagadh**: the ruler announced accession to **Pakistan** against the wishes of most people; a **plebiscite** settled it.\n3. **Manipur**: the merger was signed **without consulting the elected assembly**, causing resentment. (Kashmir is also acceptable.)',
  sol: 'Three states, each with a reason.',
  scheme: [['First state with reason', 1], ['Second state with reason', 1], ['Third state with reason', 1]],
}));
Q('l_integration', long({
  t: 2, d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: 'Explain how the problem of the princely states was handled after 1947. Why is the integration often called a major achievement of the new nation?',
  model: '1. **The problem:** about **565 princely states**; with **paramountcy lapsing**, rulers were legally free to stay independent, which threatened unity.\n2. **Approach:** the government believed **people wanted to join India**, used **persuasion and firmness**, and was flexible about **autonomy** for some areas.\n3. **Method:** led by **Sardar Patel** with **V. P. Menon**; almost all rulers signed the **Instrument of Accession** before 15 August 1947.\n4. **Difficult cases:** **Junagadh** (plebiscite), **Hyderabad** (police action, 1948), **Manipur** (merger, 1949) and **Kashmir**.\n5. **Achievement:** within about two years a patchwork of states became one Union, largely by **negotiation**, laying the territorial base for democracy.',
  sol: 'Problem, approach, method, difficult cases, and why it was an achievement.',
  scheme: [['The problem', 1], ['Approach', 1], ['Method and leaders', 1], ['Difficult cases', 1], ['Assessment', 1]],
}));
Q('l_compare_cases', long({
  t: 2, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: 'Compare the integration of Hyderabad and Manipur. What do the two cases teach about the relationship between unity and democracy?',
  model: '1. **Hyderabad:** the Nizam sought independence and signed only a Standstill Agreement; amid unrest it joined after **police action in September 1948**.\n2. **Manipur:** the Maharaja had signed the Instrument of Accession; the state held **elections in 1948**; the **merger agreement (September 1949)** was signed without consulting the elected assembly.\n3. **Difference:** in Hyderabad the **ruler** resisted joining; in Manipur the **people\'s elected body** was bypassed.\n4. **Unity:** both cases secured the **territorial unity** of India.\n5. **Lesson:** unity achieved **without consent** can leave lasting grievances, so nation-building needs both **firmness on unity** and **respect for democratic voice**.',
  sol: 'Describe both cases, contrast them, and draw a balanced lesson.',
  scheme: [['Hyderabad', 1], ['Manipur', 1], ['Contrast', 1], ['Unity secured', 1], ['Lesson about democracy', 1]],
}));
Q('sb_dewan', source({
  t: 2, d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the source from the imagined notebook of the chief minister (dewan) of a small princely state in 1947 and answer the questions that follow. ${IMAG}`,
  passage: '**Notebook of the dewan of the imagined princely state of Chandragarh, July 1947**\n\nThe British resident left today. His Highness asked whether we are now free to rule alone. I told him that in law we may be, but our state is surrounded by the new Union on every side, our trains run on its lines, and our people listen to its leaders. The officer from Delhi was polite but firm: defence, foreign affairs and communications must go to the Union; in other matters we may keep our customs for now. His Highness will sign tomorrow.',
  parts: [
    child('a', short({ t: 2, d: 2, c: 'understanding', marks: 1, stem: 'Which document is His Highness most likely to sign "tomorrow"?', model: 'The **Instrument of Accession** to the Indian Union.', sol: 'Handing over defence, foreign affairs and communications = accession.', scheme: [['Instrument of Accession', 1]] })),
    child('b', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Which line shows the legal position of princely states after the British left?', model: '"I told him that **in law we may be**" (free to rule alone).', sol: 'Paramountcy had lapsed, so legally the state was free.', scheme: [['Correct line', 1]] })),
    child('c', short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Identify two features of the Indian government\'s approach to the princely states that appear in the notebook.', model: '(1) **Firmness on unity**: the subjects of defence, foreign affairs and communications "must go to the Union". (2) **Flexibility**: the state "may keep our customs for now", a measure of **autonomy** in other matters.', sol: 'Firm on core subjects, flexible on others.', scheme: [['Firmness', 1], ['Flexibility or autonomy', 1]] }), [
      short({ t: 2, d: 3, c: 'evaluation', marks: 2, stem: '**Or** (ii): Why did small states like Chandragarh find it hard to remain independent? Give two reasons from the source.', model: '(1) It was **surrounded by Indian territory** on every side. (2) It **depended on the Union** for trains and links, and its **people looked to the Union\'s leaders**.', sol: 'Geography and dependence or popular feeling.', scheme: [['First reason', 1], ['Second reason', 1]] }),
    ]),
  ],
}));

// ================================================================ t03 Reorganisation of states
Q('m_linguistic_basis', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'On what principle were Indian states mainly reorganised in 1956?',
  opts: ['Language', 'Religion', 'Population size alone', 'The boundaries of the old princely states'],
  sol: 'The States Reorganisation Act of 1956 redrew boundaries mainly on the basis of language. Religion was deliberately not used as a basis.',
}));
Q('m_sriramulu', mcq({
  t: 3, d: 2, c: 'recall',
  stem: 'The death of Potti Sriramulu after a long fast in December 1952 led directly to the formation of which state?',
  opts: ['Andhra State', 'Maharashtra', 'Nagaland', 'Haryana'],
  sol: 'Potti Sriramulu fasted for a separate state for Telugu speakers; after his death and the protests that followed, Andhra State was formed in October 1953.',
}));
Q('m_src', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'The States Reorganisation Commission was appointed in which year?',
  opts: ['1953', '1947', '1960', '1971'],
  sol: 'The Commission was set up in 1953, after Andhra State was formed; its report led to the States Reorganisation Act of 1956.',
}));
Q('m_1956_count', mcq({
  t: 3, d: 2, c: 'recall',
  stem: 'The States Reorganisation Act of 1956 created',
  opts: ['14 states and 6 union territories', '28 states and 8 union territories', '565 states', '7 states and 14 union territories'],
  sol: 'The 1956 Act created 14 states and 6 union territories. 565 was the approximate number of princely states.',
}));
Q('m_fear', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Why were national leaders at first cautious about creating states on the basis of language?',
  opts: [
    'Coming soon after Partition, they feared that division on linguistic lines might weaken national unity',
    'The Constitution banned any change in state boundaries',
    'No region of India had asked for linguistic states',
    'Language was considered unimportant in Indian life',
  ],
  sol: 'After the trauma of Partition, leaders worried that new divisions could encourage separatism and distract from other challenges. The Constitution does allow Parliament to change state boundaries, and demands for linguistic states were strong.',
}));
Q('m_outcome', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: 'Which statement best assesses the result of creating linguistic states?',
  opts: [
    'Contrary to early fears, it strengthened democracy and national unity by accepting diversity',
    'It led to the break-up of India into several countries',
    'It ended all disputes between states permanently',
    'It replaced Hindi with regional languages everywhere',
  ],
  sol: 'Linguistic states made administration easier for ordinary people, gave regional groups a stake in the Union, and showed that unity and diversity can go together. They did not break up the country or end every dispute.',
}));
Q('m_bombay', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'In 1960 the bilingual Bombay State was divided into which two states?',
  opts: ['Maharashtra and Gujarat', 'Punjab and Haryana', 'Andhra Pradesh and Telangana', 'Bihar and Jharkhand'],
  sol: 'After a strong movement, Bombay State was split in 1960 into Maharashtra (Marathi) and Gujarat (Gujarati). Punjab and Haryana came in 1966, Jharkhand in 2000 and Telangana in 2014.',
}));
Q('m_2000', mcq({
  t: 3, d: 2, c: 'recall',
  stem: 'Which three states were created in the year 2000?',
  opts: ['Chhattisgarh, Uttarakhand and Jharkhand', 'Meghalaya, Manipur and Tripura', 'Mizoram, Arunachal Pradesh and Goa', 'Nagaland, Sikkim and Telangana'],
  sol: 'Chhattisgarh, Uttarakhand (first named Uttaranchal) and Jharkhand were created in 2000. Meghalaya, Manipur and Tripura became states in 1972.',
}));
Q('m_imagined_demand', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'Imagine that in the early 1950s a group of citizens petitions for a separate state because the government offices, courts and schools of their region all use a language most of them do not speak. Which principle of reorganisation are they appealing to?',
  opts: [
    'Linguistic reorganisation: that people should be governed in the language they understand',
    'The two-nation theory',
    'The Instrument of Accession',
    'The doctrine of paramountcy',
  ],
  sol: 'The complaint is about governance in an unfamiliar language, which is the heart of the case for linguistic states. The other options belong to Partition and the princely states.',
}));
Q('m_border_city', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'Imagine that in the 1950s two neighbouring language groups both claim a busy port city where people of both groups live and work. Which difficulty of linguistic reorganisation does this illustrate?',
  opts: [
    'Disputes over mixed border areas and cities that could fit in more than one state',
    'The lapse of British paramountcy',
    'The two-nation theory',
    'The need for an Instrument of Accession',
  ],
  sol: 'Linguistic boundaries were hard to draw where groups were mixed, especially around large cities with several communities. The other options belong to Partition and the princely states.',
}));
Q('ar_linguistic', ar({
  t: 3, d: 3, c: 'analysis', key: 'a',
  a: 'The creation of linguistic states made democracy more meaningful for ordinary citizens.',
  r: 'People could deal with the government, courts and schools in a language they understood.',
  sol: 'Both are true and R explains A: governance in a familiar language made participation easier and brought government closer to people.',
}));
Q('ar_religion', ar({
  t: 3, d: 2, c: 'analysis', key: 'c',
  a: 'The States Reorganisation Act of 1956 used language as the main basis for drawing state boundaries.',
  r: 'The 1956 reorganisation drew state boundaries on the basis of religion.',
  sol: 'A is true. R is false: religion was deliberately not used; the main basis was language.',
}));
Q('tf_telangana', tf({
  t: 3, d: 1, c: 'recall', ans: true,
  stem: 'True or false? Telangana became a separate state in 2014.',
  sol: 'Telangana was carved out of Andhra Pradesh in June 2014.',
}));
Q('tf_nagaland', tf({
  t: 3, d: 2, c: 'recall', ans: false,
  stem: 'True or false? Nagaland was created as a state by the States Reorganisation Act of 1956.',
  sol: 'Nagaland became a state in 1963, not under the 1956 Act.',
}));
Q('mt_states', match({
  t: 3, d: 2, c: 'recall',
  stem: 'Match each year with the state or states that were created in it.',
  pairs: [
    ['1953', 'Andhra State'],
    ['1966', 'Punjab and Haryana (reorganised)'],
    ['1987', 'Mizoram and Arunachal Pradesh'],
    ['2014', 'Telangana'],
  ],
  sol: 'Andhra State 1953; Punjab reorganised and Haryana created 1966; Mizoram and Arunachal Pradesh 1987; Telangana 2014.',
}));
Q('ord_states', ord({
  t: 3, d: 2, c: 'understanding', marks: 1,
  stem: 'Arrange the creation of these states in chronological order.',
  items: ['Nagaland', 'Haryana', 'Meghalaya', 'Jharkhand'],
  sol: 'Nagaland 1963, Haryana 1966, Meghalaya 1972, Jharkhand 2000.',
}));
Q('s_src', short({
  t: 3, d: 1, c: 'recall', marks: 2, wl: S2,
  stem: 'What was the States Reorganisation Commission? What did its work lead to?',
  model: 'A commission appointed in **1953** to examine how state boundaries should be redrawn. Its report accepted that boundaries should **reflect language**, leading to the **States Reorganisation Act, 1956**, which created **14 states and 6 union territories**.',
  sol: 'Year and task; the 1956 Act.',
  scheme: [['Commission and its task', 1], ['Outcome: 1956 Act', 1]],
}));
Q('s_andhra', short({
  t: 3, d: 2, c: 'analysis', marks: 2, wl: S2,
  stem: 'How did the movement for Andhra State change the government\'s position on linguistic states?',
  model: 'Telugu speakers demanded a separate state; **Potti Sriramulu** died after a long fast in **December 1952**, which led to widespread protest. The government then created **Andhra State in 1953**, and soon appointed a commission to look at reorganisation **across the country**.',
  sol: 'Fast and protests → Andhra State → SRC.',
  scheme: [['Movement and fast', 1], ['Result and wider effect', 1]],
}));
Q('s_fears', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Why were leaders hesitant about linguistic states immediately after independence? Give two reasons.',
  model: '(1) Coming right after **Partition**, they feared new divisions might **weaken unity** or encourage separatism. (2) They wanted to focus on **other pressing tasks** such as refugees, integration of princely states and development.',
  sol: 'Any two sound reasons.',
  scheme: [['First reason', 1], ['Second reason', 1]],
}));
Q('s3_benefits', short({
  t: 3, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Explain any three ways in which linguistic reorganisation strengthened Indian democracy.',
  model: '1. **Access:** people could deal with **government, courts and schools** in their own language.\n2. **Participation:** more people could take part in **politics**, and regional leaders from ordinary backgrounds rose.\n3. **Unity in diversity:** recognising regional identities **reduced the fear of domination** and gave regions a stake in the Union, so fears of break-up proved unfounded.',
  sol: 'Three distinct ways, each explained.',
  scheme: [['First way', 1], ['Second way', 1], ['Third way', 1]],
}));
Q('s3_later', short({
  t: 3, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'Reorganisation did not end in 1956. Give three examples of states created later, and state one basis other than language that was used.',
  model: '1. **Maharashtra and Gujarat** (1960) from Bombay State.\n2. **Nagaland** (1963), and **Meghalaya, Manipur and Tripura** (1972) in the North-East.\n3. **Chhattisgarh, Uttarakhand and Jharkhand** (2000). Several later states were based on **regional and tribal identity** or **administrative and development needs**, not language alone.',
  sol: 'Three correct examples with years; one other basis.',
  scheme: [['First example', 1], ['Second example', 1], ['Third example with another basis', 1]],
}));
Q('l_reorganisation', long({
  t: 3, d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: 'Trace the process of the reorganisation of states on linguistic lines from 1952 to 1960, and explain why the early fears about it proved unfounded.',
  model: '1. **Early caution:** after Partition, leaders feared linguistic states might weaken unity, though the national movement had earlier accepted the idea.\n2. **Andhra:** **Potti Sriramulu** died after a long fast (December 1952); protests followed; **Andhra State** was formed in **1953**.\n3. **SRC and the Act:** the **States Reorganisation Commission** (1953) led to the **1956 Act**: **14 states and 6 union territories**, mainly on language.\n4. **Bombay:** split into **Maharashtra and Gujarat in 1960**.\n5. **Fears unfounded:** linguistic states made **government accessible**, widened **participation**, and showed that **accepting diversity strengthens unity**.',
  sol: 'Sequence of events, then an explained assessment.',
  scheme: [['Early caution', 1], ['Andhra movement', 1], ['SRC and the 1956 Act', 1], ['Later change: 1960', 1], ['Why fears proved unfounded', 1]],
}));
Q('l_unity_diversity', long({
  t: [1, 3], d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: '"In 1947 many observers feared India would break apart; by 1960 it had shown that unity and diversity could go together." Evaluate this statement with reference to the integration of princely states and the reorganisation of states.',
  model: '1. **The fear:** Partition, refugees and some 565 princely states made the **unity of India** uncertain.\n2. **Princely states:** almost all joined through the **Instrument of Accession**; difficult cases such as **Hyderabad** and **Junagadh** were resolved by 1948–49, securing **territorial unity**.\n3. **Linguistic states:** Andhra (1953), the **1956 Act** and the split of Bombay (1960) recognised **regional languages**.\n4. **Unity with diversity:** recognising identities **reduced fears of domination** and tied regions to the Union instead of pushing them away.\n5. **Balanced view:** the statement is largely true, but some cases (such as **Manipur\'s merger** without consulting its assembly) left grievances that shaped later regional politics.',
  sol: 'The fear, two processes, the link to unity in diversity, and a balanced conclusion.',
  scheme: [['The fear in 1947', 1], ['Integration of princely states', 1], ['Linguistic reorganisation', 1], ['Unity in diversity explained', 1], ['Balanced conclusion', 1]],
}));
Q('sb_report', source({
  t: 3, d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the source, an imagined newspaper report from Madras in December 1952, and answer the questions that follow. ${IMAG}`,
  passage: '**From an imagined newspaper report, Madras, December 1952**\n\nCrowds gathered in many Telugu-speaking towns today after news came that the veteran Gandhian who had been fasting for a separate state for Telugu speakers had died. Shops closed and trains were stopped at several places. A college lecturer in the crowd told our reporter that people want to be governed in the language they speak at home. A senior official in Delhi said privately that the government was worried other regions would raise similar demands.',
  parts: [
    child('a', short({ t: 3, d: 1, c: 'recall', marks: 1, stem: 'Name the Gandhian leader whose death after a fast is referred to in the report.', model: '**Potti Sriramulu**.', sol: 'He died in December 1952 after fasting for a Telugu-speaking state.', scheme: [['Potti Sriramulu', 1]] })),
    child('b', short({ t: 3, d: 2, c: 'application', marks: 1, stem: 'Which line gives the main argument for linguistic states?', model: '"People want to be **governed in the language they speak at home**."', sol: 'Governance in one\'s own language is the core argument.', scheme: [['Correct line', 1]] })),
    child('c', short({ t: 3, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): What was the immediate outcome of these events, and what wider step followed?', model: '**Andhra State** was formed in **1953**; soon after, the **States Reorganisation Commission** was appointed (1953), leading to the **1956 Act**.', sol: 'Andhra State, then the SRC and the Act.', scheme: [['Andhra State 1953', 1], ['SRC and the 1956 Act', 1]] }), [
      short({ t: 3, d: 3, c: 'evaluation', marks: 2, stem: '**Or** (ii): Was the official\'s worry justified? Give one argument for and one against.', model: '**For:** other regions did raise demands, such as in **Bombay State**, which was later split. **Against:** creating linguistic states did **not break up India**; it strengthened democracy and unity by accepting diversity.', sol: 'One argument on each side.', scheme: [['Argument for', 1], ['Argument against', 1]] }),
    ]),
  ],
}));
Q('sb_assembly', source({
  t: [3, 1], d: 4, c: 'evaluation', origin: 'soyl-original',
  stem: `Read the source, imagined notes from a 2005 school debate in Bhopal on the map of India, and answer the questions that follow. ${IMAG}`,
  passage: '**Notes from a Class 12 debate (imagined), Bhopal, 2005: "Do new states divide the nation?"**\n\nThe first speaker said every new state is a step towards division. The second replied that the map of India has changed many times since 1956 and the country is stronger, not weaker. She listed states created in 1960, 1966, 1972, 1987 and 2000, some on the basis of language and others on regional or tribal identity. The third speaker said what matters is that changes are made through Parliament, after discussion, not through violence.',
  parts: [
    child('a', short({ t: 3, d: 2, c: 'application', marks: 1, stem: 'Name the states created in any one of the years listed by the second speaker.', model: 'For example **1960: Maharashtra and Gujarat** (or 1966 Punjab and Haryana; 1972 Meghalaya, Manipur, Tripura; 1987 Mizoram, Arunachal Pradesh; 2000 Chhattisgarh, Uttarakhand, Jharkhand).', sol: 'Any year with its correct states.', scheme: [['Correct year and states', 1]] })),
    child('b', short({ t: 3, d: 2, c: 'understanding', marks: 1, stem: 'Besides language, which basis for creating states does the second speaker mention?', model: '**Regional or tribal identity**.', sol: 'Read the second speaker\'s list.', scheme: [['Regional or tribal identity', 1]] })),
    child('c', short({ t: [3, 1], d: 4, c: 'evaluation', marks: 2, stem: '**Either** (i): Which speaker\'s view is best supported by India\'s experience since 1956? Give two reasons.', model: 'The **second** speaker\'s: (1) many new states were created, yet **India remained united**; (2) recognising identities gave regions a **stake in the Union** and made government **closer to people**.', sol: 'A reasoned choice backed by the record since 1956.', scheme: [['Reasoned choice', 1], ['Two supporting reasons', 1]] }), [
      short({ t: 3, d: 4, c: 'evaluation', marks: 2, stem: '**Or** (ii): Why does the third speaker stress that changes should be made "through Parliament, after discussion"? Explain two reasons.', model: '(1) The **Constitution** gives Parliament the power to form new states, so change follows **law** and is accepted as legitimate. (2) **Discussion** lets competing interests be heard and settled **peacefully**, which protects democracy and unity.', sol: 'Two reasons linked to constitutional process and peaceful settlement.', scheme: [['First reason', 1], ['Second reason', 1]] }),
    ]),
  ],
}));
