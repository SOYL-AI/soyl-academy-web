// CBSE 12 Political Science, ch15 Recent Developments in Indian Politics — question bank. Every source,
// state, party letter and speaker in a source is imagined and written by SOYL (labelled as such); no NCERT
// text, box, cartoon or exercise and no board/sample-paper item is reused (D-036). Real facts are limited
// to stable, dated ones (governments 1989–2024, the Mandal Commission and the 1992 judgment, the Ayodhya
// dispute up to the 2019 verdict, the 2014/2019/2024 Lok Sabha results as commonly reported seat counts).
// No question asks students to judge a current party, government or leader. Nothing after 2024 is stated.
import assert from 'node:assert/strict';
import { Q, mcq, ar, tf, fb, match, ord, num, short, long, source, child } from './lib.mjs';

const S2 = [30, 50];
const S3 = [50, 80];
const L5 = [80, 120];
const IMAG = '*(Imagined document written by SOYL for practice; the people and places in it are not real.)*';

// ---------------------------------------------------------------- computed figures (asserted)
// Lok Sabha majority mark.
export const LS_SEATS = 543;
export const MAJORITY = Math.floor(LS_SEATS / 2) + 1;
assert.equal(MAJORITY, 272);
// Imagined coalition arithmetic in a mock parliament of 543 seats.
export const MOCK = { lead: 196, allies: [38, 24, 19] };
export const MOCK_TOTAL = MOCK.lead + MOCK.allies.reduce((a, b) => a + b, 0);
export const MOCK_SHORT = MAJORITY - MOCK.lead;
export const MOCK_SPARE = MOCK_TOTAL - MAJORITY;
assert.equal(MOCK_TOTAL, 277);
assert.equal(MOCK_SHORT, 76);
assert.equal(MOCK_SPARE, 5);
// Reservation in central government posts: OBC 27 + SC 15 + ST 7.5.
export const RES = { OBC: 27, SC: 15, ST: 7.5 };
export const RES_TOTAL = RES.OBC + RES.SC + RES.ST;
assert.equal(RES_TOTAL, 49.5);
assert.ok(RES_TOTAL <= 50);
// Commonly reported BJP seat counts (Lok Sabha).
export const BJP = { 2014: 282, 2019: 303, 2024: 240 };
assert.ok(BJP[2014] >= MAJORITY && BJP[2019] >= MAJORITY && BJP[2024] < MAJORITY);
export const SHORT_2024 = MAJORITY - BJP[2024];
assert.equal(SHORT_2024, 32);

// ================================================================ t01 Context of the 1990s: coalition era
Q('m_1989_turn', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'After which Lok Sabha election did India enter a long period in which no single party won a majority on its own?',
  opts: ['1989', '1977', '1984', '2014'],
  sol: 'From 1989 until 2014, every Lok Sabha produced a hung verdict or a coalition government. In 1977 the Janata Party won a majority; in 1984 the Congress won a large majority; 2014 ended the coalition period.',
}));
Q('m_nf_support', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'The National Front government formed in December 1989 under V. P. Singh survived in Parliament mainly because',
  opts: [
    'the BJP and the Left parties supported it from outside',
    'the Congress joined the ministry',
    'the National Front had won a clear majority of seats',
    'the President nominated additional members to the Lok Sabha',
  ],
  sol: 'The National Front did not have a majority; two very different blocs, the BJP and the Left, supported it without joining the ministry. The Congress was in opposition, and the President does not nominate members to give a government a majority.',
}));
Q('m_rajiv_1991', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'Rajiv Gandhi was assassinated in May 1991 while he was',
  opts: [
    'campaigning in Tamil Nadu during the Lok Sabha election',
    'addressing Parliament on the budget',
    'leading the government as Prime Minister',
    'travelling abroad on a state visit',
  ],
  sol: 'He was killed in May 1991 at an election rally near Chennai (at Sriperumbudur in Tamil Nadu), during the campaign. He was not Prime Minister at the time; he had been in opposition since 1989.',
}));
Q('m_rao_1991', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Which government, formed after the 1991 election, began the new economic policy of liberalisation?',
  opts: [
    'The Congress government led by P. V. Narasimha Rao',
    'The National Front government led by V. P. Singh',
    'The United Front government led by H. D. Deve Gowda',
    'The NDA government led by A. B. Vajpayee',
  ],
  sol: 'The Congress formed the government after the 1991 election with P. V. Narasimha Rao as Prime Minister, and the new economic policy began in 1991. The National Front had ended in 1990; the United Front (1996) and the NDA (1998) came later.',
}));
Q('m_uf_pms', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'The United Front governments of 1996–98 were led in turn by',
  opts: ['H. D. Deve Gowda and I. K. Gujral', 'V. P. Singh and Chandra Shekhar', 'A. B. Vajpayee and L. K. Advani', 'P. V. Narasimha Rao and Manmohan Singh'],
  sol: 'H. D. Deve Gowda (1996–97) and then I. K. Gujral (1997–98) led the United Front, with outside support from the Congress. V. P. Singh and Chandra Shekhar headed governments in 1989–91.',
}));
Q('m_1996_bjp', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: 'In 1996 the BJP emerged as the largest party in the Lok Sabha, yet its government lasted only about two weeks. Why?',
  opts: [
    'It could not win the support of a majority of members in the House',
    'The Supreme Court set aside the election result',
    'The President refused to invite the largest party',
    'Its leaders chose to resign to hold fresh elections',
  ],
  sol: 'A government must enjoy the confidence of the Lok Sabha. Being the largest party is not enough; when it was clear that a majority would not back it, the government resigned. The other options did not happen.',
}));
Q('m_outside', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'In an imagined state assembly, Party L promises to vote for the government in every confidence motion but refuses to take any minister\'s post. This arrangement is called',
  opts: ['outside support', 'a grand alliance', 'a hung assembly', 'President\'s Rule'],
  sol: 'Backing a government in the House without joining the ministry is outside support, as with the National Front in 1989 and the United Front in 1996–98. A hung assembly is the result when no party has a majority; President\'s Rule is direct central rule.',
}));
Q('m_cmp', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'Five imagined parties with different manifestos agree on a short written list of policies they will all carry out in government, and set aside issues on which they disagree. This list is best described as a',
  opts: ['common minimum programme', 'party manifesto', 'white paper', 'money bill'],
  sol: 'Coalition partners in India have used a common minimum programme to record the shared agenda of a government made of parties with different programmes. A manifesto belongs to one party; a white paper and a money bill are different instruments.',
}));
Q('m_coalition_feature', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: 'Which of these is the most likely feature of a coalition government at the Centre?',
  opts: [
    'Major decisions need consultation among partners, and smaller parties gain bargaining power',
    'The Prime Minister never needs to consult other parties',
    'State-level parties lose all influence on national policy',
    'The government cannot be removed by a vote of no-confidence',
  ],
  sol: 'In a coalition no single party can rule alone, so partners consult one another and a small party whose seats are needed can bargain for posts or policies. Coalition governments can still lose a no-confidence vote, as happened in April 1999.',
}));
Q('m_1999_vote', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'The NDA government formed in 1998 fell in April 1999 when',
  opts: [
    'it lost a confidence vote in the Lok Sabha by a single vote after a partner withdrew support',
    'the Prime Minister was impeached',
    'the Rajya Sabha rejected the budget',
    'the term of the Lok Sabha ended',
  ],
  sol: 'After an ally withdrew support, the government lost a confidence motion by one vote in April 1999. Fresh elections later that year returned the NDA, which governed until 2004.',
}));
Q('m_hung_scenario', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'After an imagined state election, Party A has 45 of the 100 seats, Party B has 30 and Party C has 25. Which outcome is most likely?',
  opts: [
    'Party A forms a government only with the support of B or C, inside or outside the ministry',
    'Party A governs alone because it is the largest party',
    'Party C governs because it has the fewest seats',
    'No government can ever be formed in such a House',
  ],
  sol: 'The majority mark is 51 of 100. Party A, with 45, needs another party, either as a coalition partner or through outside support, as happened at the Centre after 1989. Being the largest party is not enough on its own.',
}));
Q('ar_cmp', ar({
  t: 1, d: 2, c: 'analysis', key: 'a',
  a: 'Coalition governments in India have often been run on the basis of an agreed minimum programme.',
  r: 'Parties with different manifestos need a shared agenda on which all partners can agree.',
  sol: 'Both are true, and R explains A: because partners differ, they write down a minimum common agenda to keep the government together.',
}));
Q('ar_coalition_era', ar({
  t: 1, d: 2, c: 'analysis', key: 'c',
  a: 'Between 1989 and 2014 no single party won a majority in the Lok Sabha on its own.',
  r: 'No Lok Sabha elections were held between 1989 and 2014.',
  sol: 'A is true. R is false: elections were held in 1989, 1991, 1996, 1998, 1999, 2004 and 2009; none of them gave one party a majority on its own.',
}));
Q('tf_1996_13', tf({
  t: 1, d: 1, c: 'recall', ans: true,
  stem: 'True or false? The BJP-led government formed after the 1996 Lok Sabha election resigned within about two weeks because it could not prove a majority.',
  sol: 'It lasted about thirteen days and resigned before a confidence vote, as it lacked majority support.',
}));
Q('ord_govts', ord({
  t: 1, d: 2, c: 'understanding', marks: 1,
  stem: 'Arrange these governments at the Centre in chronological order.',
  items: [
    'National Front government led by V. P. Singh',
    'Congress government led by P. V. Narasimha Rao',
    'United Front government led by H. D. Deve Gowda',
    'NDA government led by A. B. Vajpayee',
    'UPA government led by Manmohan Singh',
  ],
  sol: 'National Front (1989), Congress under Narasimha Rao (1991), United Front (1996), NDA (1998), UPA (2004).',
}));
Q('n_majority', num({
  t: 1, d: 1, c: 'understanding', marks: 1, value: MAJORITY, unit: 'seats',
  stem: `The Lok Sabha has ${LS_SEATS} elected seats. What is the smallest number of seats a party or alliance needs for a majority?`,
  sol: `Step 1: Half of ${LS_SEATS} = ${LS_SEATS / 2}.\nStep 2: A majority is more than half, so the smallest whole number above ${LS_SEATS / 2} is ${MAJORITY}.`,
}));
Q('n_mock', num({
  t: 1, d: 3, c: 'application', marks: 2, value: MOCK_TOTAL, unit: 'seats',
  stem: `In an imagined mock parliament of ${LS_SEATS} seats, the largest party has ${MOCK.lead} seats and three allies have ${MOCK.allies.join(', ')} seats. How many seats does the alliance hold together?`,
  sol: `Step 1: Total = ${MOCK.lead} + ${MOCK.allies.join(' + ')} = ${MOCK_TOTAL}.\nStep 2: This is ${MOCK_SPARE} more than the majority mark of ${MAJORITY}, so the alliance can form the government.`,
  scheme: [['Adding the seats correctly', 1], [`Answer ${MOCK_TOTAL} seats`, 1]],
}));
Q('s_coalition_meaning', short({
  t: 1, d: 1, c: 'understanding', marks: 2, wl: S2,
  stem: 'What is meant by a coalition government? Give one example from India between 1989 and 2014.',
  model: 'A **coalition government** is formed when **two or more parties** join or support a ministry because **no single party** has a majority. Example: the **NDA** government led by **A. B. Vajpayee** (1998–2004) or the **UPA** led by **Manmohan Singh** (2004–14).',
  sol: 'Meaning with the reason (no single-party majority) plus one correct example.',
  scheme: [['Meaning of coalition government', 1], ['Correct example from 1989–2014', 1]],
}));
Q('s_outside_two', short({
  t: 1, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'Give two examples of governments at the Centre in the 1990s that depended on outside support, naming the parties that gave it.',
  model: '1. The **National Front** government (1989) depended on outside support from the **BJP and the Left parties**.\n2. The **United Front** governments (1996–98) depended on outside support from the **Congress**.',
  sol: 'Two governments, each with the supporting party or parties.',
  scheme: [['First example with supporting party', 1], ['Second example with supporting party', 1]],
}));
Q('s3_decline', short({
  t: 1, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Explain any three developments that marked the end of the Congress system and the start of a new phase in Indian politics around 1989–91.',
  model: '1. **1989 election:** the Congress lost its majority and no party could rule alone, beginning the **coalition era**.\n2. **Mandal issue:** the 1990 decision on OBC reservation made **backward-caste politics** central to elections.\n3. **New economic policy (1991)** and the **Ayodhya dispute** changed the main issues of national debate; Rajiv Gandhi\'s death in May 1991 also changed the leadership of the Congress.',
  sol: 'Any three: the 1989 verdict, Mandal, economic reforms, Ayodhya, change in Congress leadership.',
  scheme: [['First development explained', 1], ['Second development explained', 1], ['Third development explained', 1]],
}));
Q('l_coalition_era', long({
  t: 1, d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: 'Describe the main features of coalition politics in India from 1989 to 2014.',
  model: '1. **No single-party majority:** every Lok Sabha in this period needed alliances to form a government.\n2. **Many partners:** national parties such as the Congress and the BJP led alliances (UPA, NDA) that included many **state-level parties**.\n3. **Outside support:** some governments, such as the National Front and the United Front, survived on support from parties outside the ministry.\n4. **Agreed agendas:** partners drew up a **common minimum programme** and consulted one another on major decisions.\n5. **Bargaining and instability:** small partners gained bargaining power; several governments fell when allies withdrew, as in **1999**.',
  sol: 'Five features, each with a brief explanation or example.',
  scheme: [['No single-party majority', 1], ['Role of state-level parties in alliances', 1], ['Outside support', 1], ['Common minimum programme and consultation', 1], ['Bargaining power and instability, with an example', 1]],
}));
Q('sb_diary1996', source({
  t: 1, d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the extract from an imagined first-time MP's diary written in New Delhi in 1996 and answer the questions that follow. ${IMAG}`,
  passage: '**Diary of an imagined first-time MP, New Delhi, June 1996**\n\nToday the new government won the vote of confidence. Thirteen parties are part of the front; my own party has only a handful of seats, yet our leader sat at the table where ministries were divided. The largest party in the House is in opposition. The Congress is not in the ministry but says it will support the government from outside. We spent the evening writing down the few policies all of us can accept. An old member told me, "In this House, numbers decide everything; friendship is decided later."',
  parts: [
    child('a', short({ t: 1, d: 1, c: 'recall', marks: 1, stem: 'Name the front whose government the diary describes.', model: 'The **United Front** (1996).', sol: 'A front of many parties with Congress support from outside in 1996.', scheme: [['United Front', 1]] })),
    child('b', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'Which line in the diary shows outside support? Quote it.', model: '"The Congress is **not in the ministry** but says it will **support the government from outside**."', sol: 'Support without joining the ministry.', scheme: [['Correct line quoted', 1]] })),
    child('c', short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Identify two features of coalition politics that the diary shows.', model: '(1) A **small party gains bargaining power**: a party with a handful of seats shared in dividing ministries. (2) Partners write an **agreed minimum agenda** of policies all can accept.', sol: 'Bargaining power of small parties; common minimum programme.', scheme: [['First feature with evidence', 1], ['Second feature with evidence', 1]] }), [
      short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Why could the largest party in the House not form the government, according to the diary?', model: 'Being the largest party is not enough; a government needs the **confidence of a majority** of the House. The many smaller parties and the Congress together gave that majority to the front, so the **largest single party stayed in opposition**.', sol: 'Majority support, not size, decides who governs.', scheme: [['Need for majority confidence', 1], ['Link to the front\'s combined numbers', 1]] }),
    ]),
  ],
}));

// ================================================================ t02 Political rise of OBCs; Mandal
Q('m_mandal_set', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'The Second Backward Classes Commission, chaired by B. P. Mandal, was appointed in',
  opts: ['1978', '1953', '1990', '1992'],
  sol: 'The Janata government appointed it in 1978; it reported in 1980. 1953 is the year of the First Backward Classes Commission (Kaka Kalelkar); 1990 is when implementation was announced; 1992 is the year of the Supreme Court judgment.',
}));
Q('m_mandal_reco', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'What was the best-known recommendation of the Mandal Commission?',
  opts: [
    '27 per cent of seats in educational institutions and government jobs for the Other Backward Classes',
    'Reservation of one-third of Lok Sabha seats for women',
    'Abolition of all reservations after ten years',
    'Separate electorates for backward castes',
  ],
  sol: 'The Commission recommended 27 per cent reservation for OBCs in educational institutions and government jobs, along with other measures such as land reform. The other options were not its recommendations.',
}));
Q('m_aug1990', mcq({
  t: 2, d: 2, c: 'recall',
  stem: 'Which government announced in August 1990 that it would implement the Mandal Commission\'s recommendation on OBC reservation in central government jobs?',
  opts: ['The National Front government', 'The United Front government', 'The Janata government', 'The UPA government'],
  sol: 'The National Front government led by V. P. Singh announced it in August 1990. The Janata government had appointed the Commission in 1978.',
}));
Q('m_sawhney', mcq({
  t: 2, d: 3, c: 'understanding',
  stem: 'In the Indra Sawhney case (1992), the Supreme Court',
  opts: [
    'upheld 27 per cent OBC reservation, generally capped total reservation at 50 per cent and excluded the "creamy layer"',
    'struck down all reservation for backward classes',
    'ordered reservation for OBCs in the Lok Sabha',
    'raised total reservation to 75 per cent',
  ],
  sol: 'The Court upheld the decision on OBC reservation in central jobs, laid down that total reservation should generally not exceed 50 per cent, and excluded the better-off "creamy layer" among OBCs.',
}));
Q('m_creamy', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'An imagined OBC family has a high income and both parents are senior officers. Under the Indra Sawhney judgment, its children would most likely be',
  opts: [
    'outside OBC reservation, because they belong to the creamy layer',
    'given double reservation',
    'shifted to the Scheduled Caste list',
    'eligible only for reserved seats in Parliament',
  ],
  sol: 'The "creamy layer" (the better-off among the OBCs) is excluded from OBC reservation so that benefits reach those who need them. The other options have no basis.',
}));
Q('m_bsp', mcq({
  t: 2, d: 2, c: 'recall',
  stem: 'The Bahujan Samaj Party, formed in 1984 to mobilise Dalit and other marginalised groups, was founded under the leadership of',
  opts: ['Kanshi Ram', 'B. P. Mandal', 'Charan Singh', 'Ram Manohar Lohia'],
  sol: 'Kanshi Ram founded the BSP in 1984. B. P. Mandal chaired the Commission; Charan Singh and Lohia were earlier leaders associated with peasant and socialist politics.',
}));
Q('m_obc_effect', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'Which statement best describes a political effect of the Mandal issue in the 1990s?',
  opts: [
    'Parties began to compete openly for the support of backward castes, and leaders from these communities gained greater power',
    'Caste stopped mattering in elections',
    'All parties merged into one national party',
    'Only national parties could win elections in northern states',
  ],
  sol: 'The Mandal decision made OBC representation a central issue; parties drawing strong support from backward castes grew, especially in the north, and every party had to respond to their claims.',
}));
Q('m_res_scenario', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'An imagined state government proposes to reserve 60 per cent of its jobs for different backward groups. Under the general rule laid down in the Indra Sawhney case, the proposal would most likely be questioned because',
  opts: [
    'total reservation should generally not exceed 50 per cent',
    'reservation is allowed only for Scheduled Tribes',
    'states cannot make any law on public employment',
    'the creamy layer must receive 60 per cent',
  ],
  sol: 'The 1992 judgment said that total reservation should generally stay within 50 per cent; 60 per cent crosses that ceiling. The other options misstate the law.',
}));
Q('ar_mandal', ar({
  t: 2, d: 2, c: 'analysis', key: 'a',
  a: 'The 1990 decision to implement the Mandal Commission\'s recommendation was followed by protests as well as counter-mobilisation.',
  r: 'Some sections opposed caste-based reservation in central jobs, while many backward-caste groups strongly supported it.',
  sol: 'Both are true, and R explains A: opposing views on the reservation decision led to protests by some groups and support rallies by others.',
}));
Q('ar_ceiling', ar({
  t: 2, d: 3, c: 'analysis', key: 'b',
  a: 'Total reservation in central government posts for OBCs, Scheduled Castes and Scheduled Tribes adds up to just under half of the posts.',
  r: 'The Mandal Commission was appointed by the Janata government in 1978.',
  sol: 'Both are true: 27 + 15 + 7.5 = 49.5 per cent; and the Commission was appointed in 1978. But R does not explain A; A follows from the reservation shares and the Supreme Court\'s 50 per cent ceiling.',
}));
Q('fb_mandal', fb({
  t: 2, d: 1, c: 'recall',
  stem: 'The Second Backward Classes Commission is popularly known as the ___ Commission, after its chairperson.',
  acc: [['Mandal', 'B. P. Mandal']],
  sol: 'It is known as the Mandal Commission, after B. P. Mandal.',
}));
Q('n_reservation', num({
  t: 2, d: 2, c: 'understanding', marks: 1, value: RES_TOTAL, unit: '%',
  stem: `Reservation in central government posts is ${RES.OBC} per cent for OBCs, ${RES.SC} per cent for Scheduled Castes and ${RES.ST} per cent for Scheduled Tribes. What is the total share reserved (in per cent)?`,
  sol: `Step 1: Total = ${RES.OBC} + ${RES.SC} + ${RES.ST}.\nStep 2: ${RES.OBC} + ${RES.SC} + ${RES.ST} = ${RES_TOTAL}. So ${RES_TOTAL}%, within the 50 per cent ceiling.`,
}));
Q('mt_mandal_years', match({
  t: 2, d: 2, c: 'understanding',
  stem: 'Match each year with the step in the Mandal story.',
  pairs: [
    ['1978', 'Second Backward Classes Commission appointed'],
    ['1980', 'Commission submits its report'],
    ['1990', 'Decision to implement OBC reservation in central jobs announced'],
    ['1992', 'Supreme Court upholds the decision in the Indra Sawhney case'],
  ],
  sol: 'Appointed 1978, report 1980, implementation announced August 1990, upheld by the Supreme Court in 1992.',
}));
Q('s_mandal_two', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State two recommendations or findings of the Mandal Commission.',
  model: '1. It found that backward castes had **low representation** in educational institutions and public employment.\n2. It recommended **27 per cent** of seats in educational institutions and government jobs for the **OBCs** (it also suggested land reform).',
  sol: 'Any two correct points about its findings or recommendations.',
  scheme: [['First point', 1], ['Second point', 1]],
}));
Q('s3_obc_politics', short({
  t: 2, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'How did the politics of the Other Backward Classes change Indian politics after 1990? Give three points.',
  model: '1. **Representation:** more OBC leaders entered legislatures and ministries, especially in northern states.\n2. **Party competition:** parties with strong backward-caste support grew, and national parties also began to seek these votes.\n3. **Agenda:** social justice and reservation became **central election issues**, and the claims of these groups became widely accepted.',
  sol: 'Three distinct changes: representation, party system, agenda.',
  scheme: [['Change in representation', 1], ['Change in party competition', 1], ['Change in political agenda', 1]],
}));
Q('l_mandal', long({
  t: 2, d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: 'Explain the Mandal issue: its origin, the 1990 decision, the reactions to it and its final legal outcome.',
  model: '1. **Origin:** the Janata government appointed the Second Backward Classes Commission in **1978** under **B. P. Mandal**; it reported in **1980**.\n2. **Recommendation:** **27 per cent** reservation for OBCs in educational institutions and government jobs.\n3. **1990 decision:** the **National Front** government announced in **August 1990** that it would implement OBC reservation in central government jobs.\n4. **Reactions:** there were **protests** in many cities by those who opposed it, and strong support from backward-caste groups; the issue divided opinion sharply.\n5. **Legal outcome:** in **Indra Sawhney (1992)** the Supreme Court upheld the decision, with a **50 per cent ceiling** and exclusion of the **creamy layer**.',
  sol: 'Origin, recommendation, decision, reactions, judgment — one point each.',
  scheme: [['Origin of the Commission', 1], ['Main recommendation', 1], ['The 1990 decision', 1], ['Reactions on both sides', 1], ['Supreme Court outcome', 1]],
}));
Q('sb_letter1990', source({
  t: 2, d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the imagined letter written by a college student in Patna in 1990 and answer the questions that follow. ${IMAG}`,
  passage: '**Letter from an imagined college student, Patna, September 1990**\n\nDear cousin, our campus has changed in a month. After the government\'s announcement on the Commission report, some students marched against it, saying jobs should go only by marks. Others, many of them the first in their families to reach college, held meetings in support, saying that people from their communities were hardly seen in government offices. My professor told us to read the report itself before shouting slogans. He said that the courts would finally decide whether the decision was valid, and that every party in the state was already changing its speeches to win the votes of backward castes.',
  parts: [
    child('a', short({ t: 2, d: 1, c: 'recall', marks: 1, stem: 'Which commission\'s report is the letter referring to?', model: 'The **Mandal Commission** (Second Backward Classes Commission).', sol: 'An announcement in 1990 on a commission report about backward classes.', scheme: [['Mandal Commission', 1]] })),
    child('b', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Give the argument made by the students who supported the decision, as stated in the letter.', model: 'People from their communities were **hardly seen in government offices**, so reservation would give them fair **representation**.', sol: 'Low representation of backward castes in government jobs.', scheme: [['Argument from the source', 1]] })),
    child('c', short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): The professor said the courts would finally decide. What did the Supreme Court decide in 1992?', model: 'In the **Indra Sawhney** case the Court **upheld** OBC reservation in central jobs, said total reservation should generally stay within **50 per cent**, and excluded the **creamy layer**.', sol: 'Upheld; 50 per cent ceiling; creamy layer.', scheme: [['Upheld the decision', 1], ['Ceiling or creamy layer', 1]] }), [
      short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): How does the last line of the letter show a change in party politics?', model: 'Every party began to **compete for backward-caste votes**, changing its speeches; this shows that OBC claims had become **central to elections**, a lasting change of the 1990s.', sol: 'Party competition for OBC support.', scheme: [['Competition for backward-caste votes', 1], ['Shows a lasting change in politics', 1]] }),
    ]),
  ],
}));

// ================================================================ t03 Communalism, secularism and democracy; Ayodhya
Q('m_shahbano', mcq({
  t: 3, d: 2, c: 'recall',
  stem: 'The Shah Bano case, which led to a national debate on personal law and secularism, was decided by the Supreme Court in',
  opts: ['1985', '1975', '1992', '2002'],
  sol: 'The Supreme Court ruled in 1985 that a divorced Muslim woman could claim maintenance; Parliament passed a law on the subject in 1986, and the debate became part of the politics of the late 1980s.',
}));
Q('m_locks', mcq({
  t: 3, d: 2, c: 'recall',
  stem: 'In February 1986, a court order in the Ayodhya dispute led to',
  opts: [
    'the opening of the locks of the disputed structure',
    'the demolition of the structure',
    'the Supreme Court\'s final verdict on the title',
    'the setting up of the Mandal Commission',
  ],
  sol: 'A district court order in 1986 led to the locks being opened, which made the dispute a national issue. The demolition took place in December 1992 and the Supreme Court\'s final verdict came in November 2019.',
}));
Q('m_dec1992', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'The Babri Masjid at Ayodhya was demolished in',
  opts: ['December 1992', 'August 1990', 'May 1991', 'February 2002'],
  sol: 'It was demolished on 6 December 1992. Communal violence followed in several parts of the country.',
}));
Q('m_after1992', mcq({
  t: 3, d: 3, c: 'understanding',
  stem: 'Which of the following was a consequence of the events of December 1992?',
  opts: [
    'The central government dismissed the state government of Uttar Pradesh and violence broke out in several parts of the country',
    'The Mandal Commission was appointed',
    'The Lok Sabha was dissolved and fresh elections held the next month',
    'The Shah Bano case was decided',
  ],
  sol: 'After the demolition, the Uttar Pradesh government was dismissed and President\'s Rule imposed, and communal violence took many lives in different parts of India. The other events belong to other years.',
}));
Q('m_verdict2019', mcq({
  t: 3, d: 2, c: 'recall',
  stem: 'In November 2019, the Supreme Court decided the Ayodhya title dispute by',
  opts: [
    'allotting the disputed site for a temple through a trust and directing that five acres be given elsewhere in Ayodhya for a mosque',
    'dividing the site equally among three parties',
    'ordering the site to remain closed permanently',
    'sending the case back to the district court',
  ],
  sol: 'The 2019 judgment gave the disputed land for a temple to be built by a trust and directed allotment of five acres of land at another place in Ayodhya for a mosque. An earlier High Court judgment (2010) had divided the land three ways; the Supreme Court did not uphold that division.',
}));
Q('m_communalism', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Communalism in politics means',
  opts: [
    'using religion to divide people and treating one religious community as superior or as opposed to others',
    'freedom of every person to follow any religion',
    'equal respect by the state for all religions',
    'the right of minorities to run educational institutions',
  ],
  sol: 'Communalism mobilises people on the basis of religion against other communities. Freedom of religion, equal respect for all religions and minority rights are features of a secular democracy, not of communalism.',
}));
Q('m_secular_scenario', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'In an imagined town, the administration protects processions of every faith equally and punishes anyone who incites violence, whatever his religion. This reflects',
  opts: ['the secular character of the Indian state', 'communal politics', 'a theocratic state', 'one-party dominance'],
  sol: 'Treating all religious communities equally and enforcing the law impartially are features of secularism as practised in India. A theocratic state favours one religion; communal politics divides people by religion.',
}));
Q('m_nhrc2002', mcq({
  t: 3, d: 3, c: 'understanding',
  stem: 'After the violence in Gujarat in 2002, which statutory body publicly examined the role of the state government in protecting life and property?',
  opts: ['The National Human Rights Commission', 'The Planning Commission', 'The Finance Commission', 'The Mandal Commission'],
  sol: 'The National Human Rights Commission examined the situation and the state government\'s response. The other bodies deal with planning, finances and backward classes.',
}));
Q('m_leaflet', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'A leaflet in an imagined town urges residents not to buy from shops owned by people of another religion. This is an example of',
  opts: ['communal politics', 'secularism', 'a common minimum programme', 'outside support'],
  sol: 'Setting people of one faith against another, here through an economic boycott, is communal politics. Secularism would treat every citizen and trader equally.',
}));
Q('ar_democracy', ar({
  t: 3, d: 2, c: 'analysis', key: 'a',
  a: 'Communal violence is a serious threat to democracy.',
  r: 'It denies citizens the equal protection of the law and their security, which every democracy must guarantee.',
  sol: 'Both are true, and R explains A: democracy rests on equal rights and safety for every citizen, which communal violence destroys.',
}));
Q('ar_shahbano', ar({
  t: 3, d: 3, c: 'analysis', key: 'b',
  a: 'The Shah Bano case of 1985 led to a wide debate on personal law and secularism.',
  r: 'The Babri Masjid was demolished in December 1992.',
  sol: 'Both are true, but R does not explain A; the Shah Bano debate came years before the demolition and was about maintenance for a divorced woman and personal law.',
}));
Q('tf_2019', tf({
  t: 3, d: 1, c: 'recall', ans: true,
  stem: 'True or false? The Supreme Court gave its verdict on the Ayodhya title dispute in November 2019.',
  sol: 'The Supreme Court delivered its judgment on 9 November 2019.',
}));
Q('tf_gujarat_all', tf({
  t: 3, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? The violence of 2002 in Gujarat took place only in one village and did not affect other parts of the state.',
  sol: 'False. After a fire on a train at Godhra in February 2002 in which many passengers died, violence spread to many parts of Gujarat and many people, most of them Muslims, lost their lives.',
}));
Q('s_shahbano', short({
  t: 3, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: 'Why did the Shah Bano case become a subject of national political debate in the 1980s?',
  model: 'The Supreme Court (1985) upheld a divorced woman\'s claim to **maintenance**. Some saw this as interference in **personal law**; others saw it as a question of **women\'s rights and equal law**. Parliament\'s 1986 law kept the debate on secularism alive.',
  sol: 'Two sides of the debate, with the judgment and the 1986 law.',
  scheme: [['The judgment and the personal-law objection', 1], ['The rights or secularism argument', 1]],
}));
Q('s_lessons', short({
  t: 3, d: 3, c: 'evaluation', marks: 2, wl: S2,
  stem: 'Suggest two lessons for a democracy from episodes of communal violence in India.',
  model: '1. Governments must **protect every citizen equally**; failure to stop violence weakens trust in the state.\n2. **Political mobilisation on religion** can spill into violence, so parties and citizens must keep debates within **law and constitutional values**.',
  sol: 'Two lessons linked to democratic principles.',
  scheme: [['First lesson', 1], ['Second lesson', 1]],
}));
Q('s3_ayodhya_steps', short({
  t: 3, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: 'Trace three stages through which the Ayodhya dispute became a national political issue between 1986 and 1992.',
  model: '1. **1986:** a court order led to the **opening of the locks** of the disputed structure, and mobilisation began on both sides.\n2. **1990:** a **rath yatra** from Somnath towards Ayodhya made the demand for a temple a large national campaign.\n3. **December 1992:** the structure was **demolished**, the UP government was dismissed and communal violence followed in many places.',
  sol: 'Three dated stages: 1986, 1990, 1992.',
  scheme: [['1986 stage', 1], ['1990 stage', 1], ['1992 stage', 1]],
}));
Q('l_communalism', long({
  t: 3, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: 'Examine how the events connected with Ayodhya and the violence of 1992–93 and 2002 posed challenges to secularism and democracy in India.',
  model: '1. **Religion in mobilisation:** from 1986 the dispute became a mass political campaign, bringing religious identity to the centre of elections.\n2. **Rule of law:** the **demolition in 1992** happened despite assurances given to the courts, raising questions about protecting the law.\n3. **Loss of life:** violence after 1992 and in **Gujarat in 2002** took many lives, showing failures to protect citizens equally.\n4. **Institutions responded:** the state government was dismissed in 1992, the **NHRC** examined events in 2002, and the **Supreme Court** settled the title dispute in **2019**.\n5. **Lesson:** a democracy must secure equal rights and safety for all; disputes need **legal and peaceful** resolution.',
  sol: 'Challenges, institutional responses and a balanced conclusion.',
  scheme: [['Religion in political mobilisation', 1], ['Rule of law in 1992', 1], ['Violence and equal protection', 1], ['Institutional responses', 1], ['Reasoned conclusion', 1]],
}));
Q('sb_peace', source({
  t: 3, d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the imagined minutes of a peace committee in the town of Ramnagar written in 1993 and answer the questions that follow. ${IMAG}`,
  passage: '**Minutes of the Ramnagar mohalla peace committee (imagined), January 1993**\n\nPresent: the temple trustee, the imam of the old mosque, two schoolteachers, the station house officer and shopkeepers from both sides of the market. The committee noted that rumours spread last month had led to two shops being burnt, though no one was killed in our ward. It was agreed that (1) any rumour will be checked with the police before it is repeated; (2) young volunteers from both communities will walk the market together every evening; (3) the schools will hold a joint function on Republic Day. The officer promised that anyone who threatens a neighbour will be arrested, whatever his faith.',
  parts: [
    child('a', short({ t: 3, d: 1, c: 'understanding', marks: 1, stem: 'Which events of December 1992 most likely led to the tension described in the minutes?', model: 'The **demolition of the Babri Masjid** at Ayodhya (6 December 1992) and the **communal violence** that followed.', sol: 'Tension after the December 1992 demolition.', scheme: [['Demolition and violence of December 1992', 1]] })),
    child('b', short({ t: 3, d: 2, c: 'application', marks: 1, stem: 'Quote the line that shows the principle of equal protection of the law.', model: '"Anyone who threatens a neighbour will be **arrested, whatever his faith**."', sol: 'Impartial enforcement of law.', scheme: [['Correct line quoted', 1]] })),
    child('c', short({ t: 3, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Explain how two decisions of the committee can protect democracy at the local level.', model: '(1) **Checking rumours** with the police stops false stories that set communities against each other. (2) **Joint evening patrols and school functions** build trust and show that citizens of every faith share the town equally.', sol: 'Two decisions linked to trust and equal citizenship.', scheme: [['First decision explained', 1], ['Second decision explained', 1]] }), [
      short({ t: 3, d: 3, c: 'evaluation', marks: 2, stem: '**Or** (ii): What does the source suggest about the role of ordinary citizens in meeting the challenge of communalism?', model: 'Citizens of **both communities** took responsibility: they planned **joint action**, refused to spread rumours and worked with the police. This shows that **civil society** can prevent violence, not only the government.', sol: 'Citizens\' joint action and refusal to spread rumours.', scheme: [['Citizens\' joint action', 1], ['Link to preventing communal violence', 1]] }),
    ]),
  ],
}));

// ================================================================ t04 New consensus; recent elections and governance
Q('m_consensus', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'Which of these is generally listed as an element of the broad consensus that emerged among major parties after 1989?',
  opts: [
    'Agreement on the new economic policies of liberalisation',
    'Agreement to abolish state-level parties',
    'Agreement to end elections to the Rajya Sabha',
    'Agreement that only one party should rule at the Centre',
  ],
  sol: 'Most major parties came to accept the new economic policies, the claims of backward castes, the role of state-level parties and pragmatic alliances. The other options are not part of this consensus.',
}));
Q('m_state_parties', mcq({
  t: 4, d: 3, c: 'analysis',
  stem: 'After the 1990s, the distinction between "national" and "regional" parties in central government became less sharp mainly because',
  opts: [
    'state-level parties regularly shared power at the Centre as alliance partners',
    'the Constitution abolished regional parties',
    'regional parties stopped contesting state elections',
    'national parties stopped forming alliances',
  ],
  sol: 'State-level parties became partners in governments at the Centre (in the United Front, NDA and UPA), so they shaped national decisions. None of the other options happened.',
}));
Q('m_pragmatic', mcq({
  t: 4, d: 3, c: 'application',
  stem: 'Two imagined parties with very different ideologies form a pre-poll alliance because together they can win more seats in a state. This illustrates',
  opts: [
    'pragmatic considerations taking priority over ideological positions',
    'one-party dominance',
    'the creamy-layer principle',
    'a common electoral roll',
  ],
  sol: 'Alliances made for electoral and governing advantage rather than shared ideology are a feature of the post-1989 consensus on pragmatism. The other terms are unrelated.',
}));
Q('m_2014', mcq({
  t: 4, d: 2, c: 'recall',
  stem: 'What was significant about the result of the 2014 Lok Sabha election?',
  opts: [
    'For the first time since 1984, a single party won a majority of seats on its own',
    'No party won more than 100 seats',
    'The Congress won a two-thirds majority',
    'It was the first election held with electronic voting machines',
  ],
  sol: `The BJP won ${BJP[2014]} seats, a majority on its own, the first single-party majority since 1984; the NDA formed the government with Narendra Modi as Prime Minister. EVMs had been used nationwide since 2004.`,
}));
Q('m_2024', mcq({
  t: 4, d: 3, c: 'understanding',
  stem: 'Which statement correctly describes the result of the 2024 Lok Sabha election?',
  opts: [
    'The BJP was the single largest party but short of a majority on its own, and the NDA formed the government',
    'The BJP won a two-thirds majority on its own',
    'No alliance could form a government and fresh elections were held',
    'The Congress won a majority on its own',
  ],
  sol: `The BJP won ${BJP[2024]} seats, ${SHORT_2024} short of the majority mark of ${MAJORITY}; with its NDA allies it formed the government, and Narendra Modi was sworn in for a third term in June 2024.`,
}));
Q('m_2019', mcq({
  t: 4, d: 2, c: 'recall',
  stem: 'In the 2019 Lok Sabha election, the party that won a majority on its own was',
  opts: ['the BJP', 'the Congress', 'no party', 'a state-level party'],
  sol: `The BJP won ${BJP[2019]} seats, a majority on its own, and the NDA formed the government again.`,
}));
Q('m_alliance_names', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'Which pair correctly names the two main alliances at the Centre in the 2000s?',
  opts: [
    'NDA led by the BJP and UPA led by the Congress',
    'National Front led by the BJP and United Front led by the Left',
    'UPA led by the BJP and NDA led by the Congress',
    'Janata Party and Swatantra Party',
  ],
  sol: 'The National Democratic Alliance (NDA) is led by the BJP and the United Progressive Alliance (UPA) was led by the Congress.',
}));
Q('m_reform_continue', mcq({
  t: 4, d: 3, c: 'application',
  stem: 'An imagined party criticised the pace of economic reforms while in opposition, but after forming a government it continued the same broad policies. Which element of the post-1989 consensus does this illustrate?',
  opts: [
    'Agreement on the new economic policies',
    'Acceptance of the creamy-layer rule',
    'The decline of state-level parties',
    'Single-party dominance',
  ],
  sol: 'Most major parties came to accept the new economic policies of 1991 even when they differed on pace; continuing them in office shows this agreement.',
}));
Q('ar_consensus', ar({
  t: 4, d: 3, c: 'analysis', key: 'a',
  a: 'After 1989, alliances often brought together parties with very different ideologies.',
  r: 'Pragmatic considerations about winning elections and forming governments gained weight over ideological positions.',
  sol: 'Both are true, and R explains A: the need to reach a majority led parties to ally despite ideological differences.',
}));
Q('ar_2024', ar({
  t: 4, d: 3, c: 'analysis', key: 'c',
  a: 'After the 2024 Lok Sabha election, the NDA formed the government at the Centre.',
  r: 'In 2024 the BJP won a majority of Lok Sabha seats on its own.',
  sol: `A is true. R is false: the BJP won ${BJP[2024]} seats, below the majority mark of ${MAJORITY}, and governed with its allies.`,
}));
Q('tf_2014_first', tf({
  t: 4, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? The 2014 Lok Sabha election was the first since 1984 in which one party won a majority on its own.',
  sol: 'True. Between 1989 and 2009 no party won a majority on its own; the BJP did so in 2014.',
}));
Q('fb_upa', fb({
  t: 4, d: 1, c: 'recall',
  stem: 'The United Progressive Alliance governed at the Centre from 2004 to 2014 with ___ as Prime Minister.',
  acc: [['Manmohan Singh', 'Dr Manmohan Singh']],
  sol: 'Manmohan Singh led the UPA government for two terms, 2004–2009 and 2009–2014.',
}));
Q('mt_leaders', match({
  t: [1, 4], d: 2, c: 'understanding',
  stem: 'Match each government or alliance with the Prime Minister who first led it.',
  pairs: [
    ['National Front (1989)', 'V. P. Singh'],
    ['United Front (1996)', 'H. D. Deve Gowda'],
    ['NDA (1998)', 'A. B. Vajpayee'],
    ['UPA (2004)', 'Manmohan Singh'],
  ],
  sol: 'National Front: V. P. Singh; United Front: H. D. Deve Gowda (later I. K. Gujral); NDA in 1998: A. B. Vajpayee; UPA: Manmohan Singh.',
}));
Q('n_2024_short', num({
  t: 4, d: 2, c: 'application', marks: 1, value: SHORT_2024, unit: 'seats',
  stem: `In 2024 the BJP won ${BJP[2024]} of the ${LS_SEATS} Lok Sabha seats. By how many seats was it short of a majority on its own?`,
  sol: `Step 1: Majority mark = ${MAJORITY}.\nStep 2: ${MAJORITY} − ${BJP[2024]} = ${SHORT_2024} seats.`,
}));
Q('s_consensus_two', short({
  t: 4, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Mention any two elements of the new consensus among political parties after 1989.',
  model: '1. Broad **agreement on the new economic policies** of liberalisation, with differences mainly of degree.\n2. **Acceptance of the claims of backward castes** to social justice and political representation. (Also: role of state-level parties; pragmatism over ideology.)',
  sol: 'Any two of the four commonly listed elements.',
  scheme: [['First element', 1], ['Second element', 1]],
}));
Q('s_state_role', short({
  t: 4, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'Explain how state-level parties came to influence national government after 1989.',
  model: 'State-level parties became **partners in coalitions** at the Centre (United Front, NDA, UPA), held **ministries** and used their seats to shape **national decisions**, so the line between "national" and "regional" parties became weaker.',
  sol: 'Coalition partnership plus influence on national decisions.',
  scheme: [['Partnership in central coalitions', 1], ['Influence on national decisions', 1]],
}));
Q('s3_consensus', short({
  t: 4, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Explain any three elements of the consensus that emerged among most political parties in India after 1989.',
  model: '1. **Economic policy:** most parties accepted the **new economic policies** begun in 1991, even when they differed on pace and detail.\n2. **Social justice:** parties accepted the **claims of backward castes** and the need for their representation.\n3. **Pragmatism:** alliances were made on the basis of **winning and governing**, often without ideological agreement, and **state-level parties** became accepted partners.',
  sol: 'Three elements, each briefly explained.',
  scheme: [['First element explained', 1], ['Second element explained', 1], ['Third element explained', 1]],
}));
Q('s3_three_results', short({
  t: 4, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'State the results of the Lok Sabha elections of 2014, 2019 and 2024 in terms of which party or alliance formed the government and whether one party had a majority on its own.',
  model: `1. **2014:** the BJP won **${BJP[2014]}** seats, a majority on its own; the NDA formed the government.\n2. **2019:** the BJP won **${BJP[2019]}** seats, again a majority on its own; the NDA continued in office.\n3. **2024:** the BJP won **${BJP[2024]}** seats, short of a majority; the **NDA** formed the government with its allies. Narendra Modi was Prime Minister after each election.`,
  sol: 'One line per election: seats, majority or not, and the government formed.',
  scheme: [['2014 result', 1], ['2019 result', 1], ['2024 result', 1]],
}));
Q('l_coal_single', long({
  t: [1, 4], d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: 'Some argue that coalition governments make Indian democracy more representative; others argue that single-party majority governments give more stable government. Present both views and give your reasoned conclusion.',
  model: '1. **For coalitions:** they give **many regions, social groups and parties** a share in power and require **consultation**, as the NDA and UPA showed.\n2. **For coalitions:** a **common minimum programme** can moderate extreme positions and build consensus.\n3. **For single-party majorities:** decisions can be taken **faster**, with clearer **responsibility** before voters.\n4. **For single-party majorities:** governments are less exposed to **sudden collapse**, as in **1990, 1997 and 1999**.\n5. **Conclusion:** both forms have worked within the Constitution; what matters is **accountability to Parliament**, respect for federalism and the rights of citizens.',
  sol: 'Two points on each side and a balanced conclusion; no judgement on any present party or leader is expected.',
  scheme: [['First point for coalitions', 1], ['Second point for coalitions', 1], ['First point for single-party majority', 1], ['Second point for single-party majority', 1], ['Balanced conclusion', 1]],
}));
Q('l_consensus', long({
  t: 4, d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: 'Despite intense competition, Indian parties came to agree on several issues after 1989. Explain this emerging consensus with examples.',
  model: '1. **Economic reforms:** governments of different parties after **1991** continued **liberalisation**, differing mainly on pace.\n2. **Backward castes:** after **Mandal**, every major party accepted OBC representation and reservation.\n3. **State-level parties:** they became accepted **partners at the Centre** in the United Front, NDA and UPA.\n4. **Pragmatism:** alliances were formed to win and govern, often across ideological lines.\n5. **Overall:** competition continued, but these shared positions gave the system **continuity** across changes of government.',
  sol: 'Four elements with examples plus an overall point.',
  scheme: [['Economic reforms', 1], ['Backward-caste claims', 1], ['State-level parties', 1], ['Pragmatic alliances', 1], ['Overall assessment', 1]],
}));
Q('sb_mockhouse', source({
  t: [1, 4], d: 4, c: 'analysis', origin: 'soyl-original',
  stem: `Read the imagined report of a school mock parliament held in Kochi and answer the questions that follow. ${IMAG}`,
  passage: `**Report of the Class 12 mock parliament, an imagined school in Kochi**\n\nOur mock Lok Sabha had ${LS_SEATS} seats, as in the real House. After the mock election, the Green Party had ${MOCK.lead} seats, the largest number. Three smaller parties with ${MOCK.allies.join(', ')} seats agreed to join it after two days of talks, and the four parties signed a one-page list of policies they would all follow. One small party asked for the education portfolio in return. The opposition said the alliance had "no common ideology". The Speaker reminded everyone that the government would have to prove its majority on the floor of the House.`,
  parts: [
    child('a', num({ t: 1, d: 2, c: 'application', marks: 1, value: MOCK_SHORT, unit: 'seats', stem: 'How many more seats did the Green Party need on its own to reach a majority?', sol: `Step 1: Majority mark = ${MAJORITY}.\nStep 2: ${MAJORITY} − ${MOCK.lead} = ${MOCK_SHORT} seats.` })),
    child('b', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'What is the "one-page list of policies" an example of in Indian coalition politics?', model: 'A **common minimum programme**.', sol: 'An agreed minimum agenda of coalition partners.', scheme: [['Common minimum programme', 1]] })),
    child('c', short({ t: [1, 4], d: 4, c: 'analysis', marks: 2, stem: '**Either** (i): Identify two features of post-1989 Indian politics that the mock parliament reflects.', model: `(1) **No single-party majority**: the largest party (${MOCK.lead}) was below ${MAJORITY} and needed allies. (2) **Bargaining by smaller partners** and **pragmatic alliances** without a common ideology, as the request for a portfolio shows.`, sol: 'Hung verdict; bargaining and pragmatism.', scheme: [['First feature with evidence', 1], ['Second feature with evidence', 1]] }), [
      short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Why did the Speaker say the government must prove its majority on the floor of the House?', model: 'In a parliamentary system the government must have the **confidence of a majority** of the House. Promises of support outside are not enough; the **vote in the House** shows whether the alliance truly has the numbers, as in 1996 and 1999.', sol: 'Confidence of the House is the test.', scheme: [['Principle of majority confidence', 1], ['Why a floor test is needed', 1]] }),
    ]),
  ],
}));
Q('sb_explainer', source({
  t: 4, d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the imagined explainer written by a civics club in Bhopal after the 2024 Lok Sabha results and answer the questions that follow. ${IMAG}`,
  passage: `**Civics club notice board, an imagined school in Bhopal, June 2024**\n\nWhat the results mean, in numbers only: the House has ${LS_SEATS} seats and the majority mark is ${MAJORITY}. The largest party won ${BJP[2024]} seats. In the previous two elections the same party had crossed the majority mark on its own. This time it formed the government together with its pre-poll allies in the National Democratic Alliance, and the Prime Minister was sworn in for a third term. Club members were reminded that the notice board explains results and does not take sides.`,
  parts: [
    child('a', num({ t: 4, d: 2, c: 'application', marks: 1, value: SHORT_2024, unit: 'seats', stem: 'By how many seats was the largest party short of a majority on its own?', sol: `Step 1: Majority mark = ${MAJORITY}.\nStep 2: ${MAJORITY} − ${BJP[2024]} = ${SHORT_2024} seats.` })),
    child('b', short({ t: 4, d: 1, c: 'recall', marks: 1, stem: 'Name the largest party referred to in the notice.', model: 'The **Bharatiya Janata Party (BJP)**.', sol: 'The party that crossed the majority mark alone in 2014 and 2019.', scheme: [['BJP', 1]] })),
    child('c', short({ t: 4, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): What does the 2024 result show about the role of allies in Indian politics?', model: 'Even a party that had won majorities on its own needed **allies to reach the majority mark**, so **alliance partners**, including state-level parties, again became important in forming and running the government.', sol: 'Allies remain important; link to coalition politics.', scheme: [['Need for allies to reach majority', 1], ['Renewed importance of partners', 1]] }), [
      short({ t: 4, d: 2, c: 'understanding', marks: 2, stem: '**Or** (ii): Compare the 2024 result with those of 2014 and 2019 in one point each.', model: `**2014 and 2019:** the largest party won a majority **on its own** (${BJP[2014]} and ${BJP[2019]} seats). **2024:** it won ${BJP[2024]} seats, **below** the majority mark, and governed with **NDA allies**.`, sol: 'Majority alone versus majority with allies.', scheme: [['2014 and 2019', 1], ['2024', 1]] }),
    ]),
  ],
}));
