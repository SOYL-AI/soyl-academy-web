// CBSE 12 Political Science, ch09 Era of One-Party Dominance — question bank. Every source, state,
// constituency and speaker is imagined and written by SOYL (labelled as such); no NCERT text, box,
// cartoon or exercise and no board/sample-paper item is reused (D-036). Real-world facts are limited to
// stable, verifiable ones (Election Commission 1950, Sukumar Sen, the 1951-52, 1957 and 1962 elections,
// the 1957 Kerala government and its dismissal in 1959, founding years of the early opposition parties),
// and real election results are stated only as broad, approximate shares. Nothing after 2024 is stated.
import assert from 'node:assert/strict';
import { Q, mcq, ar, tf, fb, match, ord, num, short, long, source, child } from './lib.mjs';

const S2 = [30, 50];
const S3 = [50, 80];
const L5 = [80, 120];
const IMAG = '*(Imagined document written by SOYL for practice; the people and places in it are not real.)*';

// ---------------------------------------------------------------- first-past-the-post (imagined, computed)
// Imagined state Sonpradesh: five constituencies, votes in thousands for parties P, Q and R.
export const FPTP = [
  { seat: 'Amarpur', P: 40, Q: 35, R: 25 },
  { seat: 'Bhimgarh', P: 38, Q: 32, R: 30 },
  { seat: 'Chandanpur', P: 36, Q: 34, R: 30 },
  { seat: 'Dhanpur', P: 30, Q: 45, R: 25 },
  { seat: 'Eklavyanagar', P: 42, Q: 28, R: 30 },
];
const winner = (c) => ['P', 'Q', 'R'].reduce((a, b) => (c[b] > c[a] ? b : a), 'P');
export const TOTAL = FPTP.reduce((s, c) => s + c.P + c.Q + c.R, 0);
export const VOTES = Object.fromEntries(['P', 'Q', 'R'].map((p) => [p, FPTP.reduce((s, c) => s + c[p], 0)]));
export const SEATS = Object.fromEntries(['P', 'Q', 'R'].map((p) => [p, FPTP.filter((c) => winner(c) === p).length]));
const pct = (x, y) => Math.round((1000 * x) / y) / 10;
export const VOTE_PCT = Object.fromEntries(['P', 'Q', 'R'].map((p) => [p, pct(VOTES[p], TOTAL)]));
export const SEAT_PCT = Object.fromEntries(['P', 'Q', 'R'].map((p) => [p, pct(SEATS[p], FPTP.length)]));
export const GAP_P = Math.round((SEAT_PCT.P - VOTE_PCT.P) * 10) / 10;
assert.equal(TOTAL, 500);
assert.deepEqual(VOTES, { P: 186, Q: 174, R: 140 });
assert.deepEqual(SEATS, { P: 4, Q: 1, R: 0 });
assert.deepEqual(VOTE_PCT, { P: 37.2, Q: 34.8, R: 28 });
assert.deepEqual(SEAT_PCT, { P: 80, Q: 20, R: 0 });
assert.equal(GAP_P, 42.8);
// Amarpur: the winner's margin over the runner-up, and the share of voters who did not vote for the winner.
export const AMAR_MARGIN = FPTP[0].P - FPTP[0].Q; // 5
export const AMAR_AGAINST = pct(FPTP[0].Q + FPTP[0].R, FPTP[0].P + FPTP[0].Q + FPTP[0].R); // 60
assert.equal(AMAR_MARGIN, 5);
assert.equal(AMAR_AGAINST, 60);

// Imagined district Kanakpur polling (for the 1951-52 style logistics case).
export const KANAK = { voters: 240000, perBooth: 1000, partiesOnBallot: 4 };
export const KANAK_BOOTHS = KANAK.voters / KANAK.perBooth; // 240
export const KANAK_BOXES = KANAK_BOOTHS * KANAK.partiesOnBallot; // 960
assert.equal(KANAK_BOOTHS, 240);
assert.equal(KANAK_BOXES, 960);

// ================================================================ t01 First three general elections
Q('m_ec_year', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'In which year was the Election Commission of India set up?',
  opts: ['1950', '1947', '1952', '1957'],
  sol: 'The Election Commission was set up in January 1950, just as the Constitution came into force. 1947 is the year of independence, 1952 the year the first election ended and the first Lok Sabha met, and 1957 the year of the second general election.',
}));
Q('m_first_cec', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Who was the first Chief Election Commissioner of India, in charge of the first general election?',
  opts: ['Sukumar Sen', 'B. R. Ambedkar', 'C. Rajagopalachari', 'Rajendra Prasad'],
  sol: 'Sukumar Sen, a civil servant, was the first Chief Election Commissioner. Ambedkar chaired the Drafting Committee of the Constitution, Rajagopalachari was the last Governor-General, and Rajendra Prasad was the first President.',
}));
Q('m_first_span', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'The first general election is usually called the "1952 election", yet voting began in 1951. Why?',
  opts: [
    'Polling was spread over several months, from late 1951 into early 1952',
    'The election was held twice because the first round was cancelled',
    'Votes were cast in 1951 but counted only after a year',
    'Only the states voted in 1951 and the Lok Sabha in 1952',
  ],
  sol: 'Because of the size of the country and the electorate, polling was held in phases from October 1951 to early 1952; the first Lok Sabha met in 1952. There was no cancelled round, no year-long counting delay, and Lok Sabha and many assembly polls were held together.',
}));
Q('m_symbols', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'In an imagined village of 1951, most voters cannot read. Which arrangement used in the early elections helped them vote for the candidate they wanted?',
  opts: [
    'Each candidate had a symbol, and voters placed the ballot in the box marked with that symbol',
    'Voters wrote the name of their candidate on a blank slip',
    'Voters told the polling officer their choice aloud',
    'Only literate members of each family were allowed to vote',
  ],
  sol: 'Symbols on separate ballot boxes allowed people who could not read to vote secretly and correctly. Writing names would exclude non-literate voters, saying one\'s choice aloud breaks the secret ballot, and the Constitution gave every adult the vote regardless of literacy.',
}));
Q('m_uaf', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Many observers in 1951 doubted that India could hold a free election. What was the main reason for their doubt?',
  opts: [
    'Universal adult franchise was being tried in a very large, mostly poor and largely non-literate society',
    'India had no written constitution at that time',
    'Only property owners had been given the right to vote',
    'The Election Commission had not yet been created',
  ],
  sol: 'The doubt came from giving every adult the vote at once in a huge, poor society where most people could not read. The Constitution was already in force (January 1950), there was no property qualification, and the Election Commission existed from 1950.',
}));
Q('m_1957_kerala', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'In the 1957 elections, which party formed the government in Kerala, ending Congress rule there?',
  opts: ['Communist Party of India', 'Swatantra Party', 'Bharatiya Jana Sangh', 'Socialist Party'],
  sol: 'The Communist Party of India won the 1957 Kerala assembly election and formed a government with E. M. S. Namboodiripad as Chief Minister. The Swatantra Party was founded only in 1959; the Jana Sangh and the Socialists did not win Kerala.',
}));
Q('m_fptp_meaning', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Under the first-past-the-post system used in Lok Sabha elections, who wins a constituency?',
  opts: [
    'The candidate who gets more votes than any other candidate, even if it is less than half',
    'Only a candidate who gets more than half of all votes cast',
    'The party that wins the most votes in the whole state',
    'Every candidate in proportion to the votes received',
  ],
  sol: 'First-past-the-post rewards the candidate with the most votes (a plurality), not necessarily a majority. A 50 per cent rule would need run-offs; seats are won constituency by constituency, not state-wide; proportional sharing is a different system.',
}));
Q('m_seat_bonus', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: 'In the first three general elections, the Congress won around three-quarters of Lok Sabha seats while winning less than half of the votes. Which explanation is correct?',
  opts: [
    'The opposition vote was divided among many parties, so Congress came first in most constituencies under first-past-the-post',
    'The Election Commission gave extra seats to the largest party',
    'Votes for opposition parties were not counted in many states',
    'Congress candidates were elected unopposed in most constituencies',
  ],
  sol: 'With the non-Congress vote split among several parties, Congress often won with a plurality, and first-past-the-post turns pluralities into seats. No bonus seats exist; votes were counted normally; unopposed wins were rare.',
}));
Q('m_evm', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'How did the method of voting change after the early elections described in this chapter?',
  opts: [
    'Separate boxes per candidate gave way to a single ballot paper with names and symbols, and later to electronic voting machines',
    'Voting by show of hands replaced secret ballots',
    'Voters began to vote only for parties, not for candidates',
    'Voting was made possible only through the post',
  ],
  sol: 'In the first two elections each candidate had a box; later a single ballot paper carrying all names and symbols was marked; electronic voting machines came in from the late 1990s and were used across the country by 2004. The other changes never happened.',
}));
Q('m_1962', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'The third general election, in which the Congress again won a large majority in the Lok Sabha, was held in',
  opts: ['1962', '1960', '1965', '1967'],
  sol: 'The general elections of this era were held in 1951–52, 1957 and 1962. The fourth general election, which changed the picture, came in 1967.',
}));
Q('ar_symbols', ar({
  t: 1, d: 2, c: 'analysis', key: 'a',
  a: 'Party symbols were essential in the first general elections in India.',
  r: 'A large share of voters at that time could not read the names of candidates.',
  sol: 'Both are true, and R explains A: symbols let non-literate voters identify their candidate.',
}));
Q('ar_fptp', ar({
  t: 1, d: 3, c: 'analysis', key: 'b',
  a: 'The Congress won far more seats in the first Lok Sabha than its share of votes alone would suggest.',
  r: 'The Election Commission was set up as an independent body in 1950.',
  sol: 'Both are true, but R does not explain A. The seat bonus came from first-past-the-post and a divided opposition, not from the creation of the Election Commission.',
}));
Q('tf_compulsory', tf({
  t: 1, d: 1, c: 'understanding', ans: false,
  stem: 'True or false? In the first general election only men above 21 years of age could vote.',
  sol: 'From the first election every citizen aged 21 or above, woman or man, could vote: universal adult franchise. (The voting age was lowered to 18 later, in 1989.)',
}));
Q('tf_success', tf({
  t: 1, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? The first general election was widely judged a success because it was held peacefully and its results were accepted, even by those who lost.',
  sol: 'Despite the doubts, the first election was held peacefully and fairly enough that losers accepted the results; observers abroad also noted this.',
}));
Q('fb_cec', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'The first Chief Election Commissioner of India was ___.',
  acc: [['Sukumar Sen', 'Sen']],
  sol: 'Sukumar Sen led the Election Commission during the first general election.',
}));
Q('fb_fptp', fb({
  t: 1, d: 2, c: 'understanding',
  stem: 'The electoral system in which the candidate with the most votes wins, even without a majority, is called the ___ system.',
  acc: [['first-past-the-post', 'first past the post', 'FPTP', 'plurality']],
  sol: 'This is the first-past-the-post (plurality) system used for the Lok Sabha.',
}));
Q('ord_events', ord({
  t: [1, 3], d: 2, c: 'understanding', marks: 1,
  stem: 'Arrange these events of early Indian democracy in the order in which they happened.',
  items: [
    'The Election Commission of India is set up',
    'The Bharatiya Jana Sangh is founded',
    'The first general election ends and the first Lok Sabha meets',
    'A Communist Party government takes office in Kerala',
    'The Swatantra Party is founded',
  ],
  sol: 'Election Commission (January 1950) → Jana Sangh (1951) → first Lok Sabha (1952) → Kerala government (1957) → Swatantra Party (1959).',
}));
Q('n_vote_share', num({
  t: 1, d: 2, c: 'understanding', marks: 1, value: VOTE_PCT.P, unit: '%',
  stem: `In the imagined state of Sonpradesh, ${TOTAL} thousand valid votes were cast in five constituencies, and Party P received ${VOTES.P} thousand of them. What was Party P's share of the votes (in per cent)?`,
  sol: `Step 1: Vote share = votes of P ÷ total votes × 100.\nStep 2: ${VOTES.P} ÷ ${TOTAL} × 100 = ${VOTE_PCT.P}. So ${VOTE_PCT.P}%.`,
}));
Q('n_gap', num({
  t: 1, d: 3, c: 'application', marks: 2, value: GAP_P, unit: 'percentage points',
  stem: `In the imagined state of Sonpradesh, Party P won ${VOTE_PCT.P}% of the votes and ${SEATS.P} of the ${FPTP.length} seats. By how many percentage points did P's seat share exceed its vote share?`,
  sol: `Step 1: Seat share = ${SEATS.P} ÷ ${FPTP.length} × 100 = ${SEAT_PCT.P}%.\nStep 2: Gap = ${SEAT_PCT.P} − ${VOTE_PCT.P} = ${GAP_P} percentage points.`,
  scheme: [['Seat share calculated', 1], [`Gap of ${GAP_P} percentage points`, 1]],
}));
Q('n_against', num({
  t: 1, d: 3, c: 'application', marks: 1, value: AMAR_AGAINST, unit: '%',
  stem: `In the imagined constituency of Amarpur, P got ${FPTP[0].P} thousand votes, Q ${FPTP[0].Q} thousand and R ${FPTP[0].R} thousand. P won the seat. What percentage of voters in Amarpur voted for candidates other than the winner?`,
  sol: `Step 1: Votes against the winner = ${FPTP[0].Q} + ${FPTP[0].R} = ${FPTP[0].Q + FPTP[0].R} thousand out of ${FPTP[0].P + FPTP[0].Q + FPTP[0].R} thousand.\nStep 2: ${FPTP[0].Q + FPTP[0].R} ÷ ${FPTP[0].P + FPTP[0].Q + FPTP[0].R} × 100 = ${AMAR_AGAINST}. So ${AMAR_AGAINST}%: the winner was elected though most voters chose someone else.`,
}));
Q('s_ec_challenge', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Mention two practical difficulties the Election Commission faced in organising the first general election.',
  model: '1. **Drawing up the electoral rolls** and delimiting constituencies for a **huge electorate** of about 17 crore adults, many entered for the first time.\n2. **Training lakhs of staff** and arranging booths and boxes when **most voters could not read**, so symbols were needed.',
  sol: 'Any two real difficulties: size of the electorate, rolls and constituencies, staff, non-literate voters, distances.',
  scheme: [['First difficulty', 1], ['Second difficulty', 1]],
}));
Q('s_fptp_plural', short({
  t: 1, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'How can a party win most seats in a legislature without winning most votes? Explain with reference to the Congress in the early elections.',
  model: 'Under **first-past-the-post**, a candidate needs only **more votes than any rival**. In the early elections the **opposition vote was split** among many parties, so Congress candidates **came first in most constituencies** with pluralities and won about three-quarters of seats on **less than half** of the votes.',
  sol: 'Link the rule (plurality wins) with the divided opposition.',
  scheme: [['Plurality rule explained', 1], ['Divided opposition and the result for Congress', 1]],
}));
Q('s_kerala_1957', short({
  t: [1, 3], d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: 'Why is the 1957 election in Kerala remembered as a landmark?',
  model: '1. The **Communist Party of India** won the assembly election and formed a government under **E. M. S. Namboodiripad**, one of the first communist governments anywhere to come to power **through a ballot**.\n2. It showed that Congress dominance had **limits at the state level**; the government was **dismissed in 1959** under Article 356.',
  sol: 'Who won and why it was unusual; what it showed about dominance (and its dismissal).',
  scheme: [['Communist government formed through elections', 1], ['Significance for Congress dominance or its dismissal', 1]],
}));
Q('s3_success', short({
  t: 1, d: 3, c: 'evaluation', marks: 3, wl: S3,
  stem: 'Some observers in 1951 called India\'s first general election "a gamble". Explain why it was considered a gamble and why it is regarded as a success.',
  model: '1. **Gamble:** it was the largest election held anywhere at that time, with **universal adult franchise** in a poor society where **most voters could not read**, so many doubted it could be fair.\n2. **Organisation:** the Election Commission prepared rolls, trained staff and used **symbols and separate boxes** so that everyone could vote secretly.\n3. **Success:** polling was **peaceful**, turnout was reasonable, and the **losers accepted the results**, proving that democracy could work in a poor country.',
  sol: 'One point on the doubts, one on how they were met, one on the outcome.',
  scheme: [['Why it was a gamble', 1], ['How it was organised', 1], ['Why it was a success', 1]],
}));
Q('s3_three_elections', short({
  t: 1, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Compare the results of the first three general elections (1952, 1957 and 1962) in terms of the position of the Congress.',
  model: '1. In **all three**, the Congress won around **three-quarters of Lok Sabha seats** and formed the government at the Centre under Jawaharlal Nehru.\n2. Its **vote share stayed below half**, so its seat share was magnified by first-past-the-post and a **divided opposition**.\n3. At the state level it ruled almost everywhere, but **Kerala in 1957** elected a communist government, an early sign that dominance was not total.',
  sol: 'Continuity of dominance, the votes–seats gap, and the Kerala exception.',
  scheme: [['Consistent large majority', 1], ['Vote share below half and why seats were higher', 1], ['State-level exception', 1]],
}));
Q('l_first_election', long({
  t: 1, d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: 'Describe how India conducted its first general election in 1951–52 and explain why it is considered an important step for democracy in the world.',
  model: '1. **Body in charge:** the **Election Commission**, set up in 1950 under **Sukumar Sen**, organised the poll.\n2. **Scale:** about **17 crore** adults were registered; constituencies were delimited and rolls prepared for the first time on a universal basis.\n3. **Method:** since most voters could not read, each candidate had a **symbol** and a separate **ballot box**; polling ran over several months.\n4. **Outcome:** the election was **peaceful** and the losers accepted the result; the Congress won a large majority.\n5. **Significance:** it showed that **universal adult franchise** could work in a **poor, largely non-literate** country, which many had doubted.',
  sol: 'Body, scale, method, outcome, significance.',
  scheme: [['Election Commission and its head', 1], ['Scale of the exercise', 1], ['Voting method for non-literate voters', 1], ['Peaceful conduct and acceptance of results', 1], ['Significance for democracy', 1]],
}));
Q('l_fptp_effect', long({
  t: [1, 2], d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: '"The dominance of the Congress in the first three elections was partly a product of the electoral system." Do you agree? Give reasons for your answer.',
  model: '1. **Partly yes:** under **first-past-the-post**, a plurality is enough, so the Congress, the only party present everywhere, won most constituencies.\n2. With the **opposition divided** among socialists, communists, the Jana Sangh and others, the anti-Congress vote did not add up to seats.\n3. Hence the Congress won about **three-quarters of seats with less than half of the votes**.\n4. **But not only the system:** the Congress also had the **legacy of the national movement**, a **nationwide organisation** and popular leaders.\n5. **Conclusion:** the system **magnified** a real lead in popular support; it did not create it.',
  sol: 'Accept the claim in part: explain the effect of the system, then other causes, then a balanced conclusion.',
  scheme: [['Plurality rule explained', 1], ['Divided opposition', 1], ['Seat–vote gap stated', 1], ['Other causes of dominance', 1], ['Balanced conclusion', 1]],
}));

// ================================================================ t02 Nature of Congress dominance
Q('m_legacy', mcq({
  t: 2, d: 1, c: 'understanding',
  stem: 'Which was the most important reason for the Congress\'s strong position in the first decades after independence?',
  opts: [
    'It inherited the legacy and organisation of the national movement',
    'It was the only party allowed by the Constitution',
    'Opposition parties were banned until 1967',
    'It was supported only by industrialists',
  ],
  sol: 'The Congress had led the freedom struggle and had an organisation reaching most of the country. The Constitution allowed many parties, opposition parties were legal throughout, and its support came from many social groups, not one.',
}));
Q('m_umbrella', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'The Congress of the 1950s is often described as a "social and ideological coalition". What does this mean?',
  opts: [
    'It brought together people of different classes, castes, regions and ideas, from left to right, within one party',
    'It was a formal alliance of several separate parties with a common symbol',
    'It shared power with the opposition in every state government',
    'It allowed only one ideology among its members',
  ],
  sol: 'The Congress was one party but held within it farmers and industrialists, urban and rural groups, and socialists as well as conservatives. It was not a formal alliance of parties, did not share power with the opposition, and was not ideologically uniform.',
}));
Q('m_factions', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'How did the Congress of this era deal with factions (groups within the party)?',
  opts: [
    'It tolerated them and let them compete, which helped it hold together different interests',
    'It expelled every faction that disagreed with the leadership',
    'It required factions to register as separate parties',
    'It did not have any factions at all',
  ],
  sol: 'Factions based on ideas or personal loyalties were tolerated and balanced inside the party, so dissatisfied groups had less reason to leave. Expelling or banning factions was not its practice, and factions certainly existed.',
}));
Q('m_dominance_democratic', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'How was Congress dominance in India different from one-party rule in countries where other parties are banned?',
  opts: [
    'It rested on winning free and competitive elections in which other parties took part',
    'It was based on a constitutional rule that only one party may govern',
    'It came from the army supporting one party',
    'It existed because elections were not held for many years',
  ],
  sol: 'The Congress stayed in power by winning regular, competitive elections; opposition parties were free to contest and criticise. There was no constitutional bar, no army role, and elections were held on time.',
}));
Q('m_faction_effect', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'In an imagined state in 1955, a group of Congress members who favour faster land reform form a faction and criticise their own state government. Under the "Congress system", what was the most likely result?',
  opts: [
    'The leadership adjusts its policy somewhat, and the faction stays inside the party',
    'The faction is immediately expelled and forms a new party',
    'The state government is dismissed by the President',
    'The faction is banned from contesting elections',
  ],
  sol: 'Inside the Congress system, factions pressed the leadership from within and were accommodated through compromise, so they usually stayed. Expulsion, dismissal of the government or bans were not the normal response.',
}));
Q('m_opposition_inside', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'Why is it said that, during this era, much of the real "opposition" operated inside the Congress itself?',
  opts: [
    'Groups within the Congress that disagreed with the leadership checked its decisions, while outside parties were weak in seats',
    'Opposition leaders were all members of the Congress Working Committee',
    'The Constitution required the ruling party to appoint the Leader of the Opposition',
    'There were no other parties at all in Parliament',
  ],
  sol: 'Because opposition parties held few seats, much debate and pressure came from factions inside the Congress. Opposition leaders were not on its committees, the Constitution has no such rule, and other parties did sit in Parliament.',
}));
Q('m_nehru', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'Who was the Prime Minister of India throughout the period of the first three general elections?',
  opts: ['Jawaharlal Nehru', 'Lal Bahadur Shastri', 'Indira Gandhi', 'Vallabhbhai Patel'],
  sol: 'Jawaharlal Nehru was Prime Minister from 1947 until his death in 1964. Shastri followed him in 1964, Indira Gandhi in 1966; Patel was Deputy Prime Minister and died in 1950.',
}));
Q('ar_coalition', ar({
  t: 2, d: 3, c: 'analysis', key: 'a',
  a: 'The Congress could win the support of very different social groups in the 1950s.',
  r: 'It accommodated many interests and ideologies, from the left to the right, within one organisation.',
  sol: 'Both are true, and R explains A: being an inclusive coalition is why so many groups could see the party as their own.',
}));
Q('ar_one_party', ar({
  t: 2, d: 2, c: 'analysis', key: 'd',
  a: 'India was a one-party state between 1952 and 1967.',
  r: 'One party won the largest number of seats in all three general elections of this period.',
  sol: 'A is false: India had many legal parties and competitive elections; one party was dominant, but it was not a one-party state. R is true.',
}));
Q('tf_coalition_formal', tf({
  t: 2, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? In the 1950s the Congress was a formal alliance of separate registered parties fighting elections on one symbol.',
  sol: 'It was a single party, though an inclusive one; the "coalition" was of social groups and ideas within it, not of registered parties.',
}));
Q('mt_features', match({
  t: 2, d: 2, c: 'understanding',
  stem: 'Match each feature of the Congress in the 1950s with what it describes.',
  pairs: [
    ['Legacy of the national movement', 'Many voters saw it as the party that won freedom'],
    ['Social coalition', 'Support from different castes, classes, religions and regions'],
    ['Ideological coalition', 'Socialists and conservatives both inside one party'],
    ['Tolerance of factions', 'Groups inside the party could compete and press the leadership'],
  ],
  sol: 'Each feature matched with its meaning: history (legacy), who supported it (social), what ideas it held (ideological), and how disagreements were managed (factions).',
}));
Q('s_social_coalition', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Explain the idea that the Congress was a "social coalition" in the years after independence.',
  model: 'The Congress drew support from **almost every section of society**: peasants and industrialists, urban and rural people, **different castes, religions and regions**. It began as a party of educated elites but grew into a **broad platform** where many groups felt represented.',
  sol: 'Who supported it, and why that made it a coalition.',
  scheme: [['Varied social groups named', 1], ['Why this made it a coalition', 1]],
}));
Q('s_factions_help', short({
  t: 2, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: 'How did the tolerance of factions help the Congress remain dominant?',
  model: '1. Groups that were **unhappy with the leadership** could fight their battles **inside the party** instead of leaving to form rivals.\n2. Factions acted as a **check and balance**, pulling the party towards the centre and keeping it in touch with many groups.',
  sol: 'Factions reduced the need to exit and made the party responsive.',
  scheme: [['Discontent kept inside the party', 1], ['Factions as an internal balance', 1]],
}));
Q('s_dominance_vs_onepar', short({
  t: 2, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: 'Distinguish between a "dominant party" democracy and a "one-party" system, using India in the 1950s as an example.',
  model: 'In a **dominant-party democracy**, one party keeps winning **free, competitive elections** while other parties exist and criticise it, as with the Congress in the 1950s. In a **one-party system**, other parties are **not allowed**, so the ruling party faces no real electoral contest.',
  sol: 'Define both and place India in the first category.',
  scheme: [['Dominant-party democracy with India', 1], ['One-party system', 1]],
}));
Q('s3_reasons_dominance', short({
  t: 2, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Give three reasons for the dominance of the Congress in the first decades after independence.',
  model: '1. **Legacy:** it had led the **national movement**, and its leaders were widely known and trusted.\n2. **Organisation:** it already had a **network of units** across the country when the first elections came.\n3. **Inclusive character:** as a **social and ideological coalition** that tolerated factions, it could keep many groups on board, while the opposition was **divided**.',
  sol: 'Any three distinct reasons, each explained.',
  scheme: [['First reason', 1], ['Second reason', 1], ['Third reason', 1]],
}));
Q('s3_ideological', short({
  t: 2, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'The Congress of the 1950s has been compared to a "platform" rather than a party with one fixed ideology. Explain this with three points.',
  model: '1. It held **socialists and conservatives**, **moderates and radicals**, so different ideas were argued out inside it.\n2. Groups with their own views, such as the **Congress Socialist Party** before 1948, could work within it.\n3. Its policies were usually a **compromise of the middle ground**, which let it appeal to many voters while factions kept the debate alive.',
  sol: 'Range of views; groups within it; the middle-ground result.',
  scheme: [['Range of ideologies', 1], ['Example of a group working within it', 1], ['Compromise and its effect', 1]],
}));
Q('l_congress_system', long({
  t: 2, d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: 'Explain the main features of the "Congress system" during the era of one-party dominance.',
  model: '1. **Dominance through elections:** the Congress kept winning **free, competitive** elections; it was not a one-party state.\n2. **Social coalition:** it drew support from **many classes, castes, religions and regions**.\n3. **Ideological coalition:** it accommodated **left, right and centre**, settling on middle-ground policies.\n4. **Tolerance of factions:** groups inside it competed openly and acted as an **internal check**.\n5. **Weak but active opposition:** opposition parties held few seats, but they **criticised** policies and kept alternatives alive, while much real contest happened **within** the Congress.',
  sol: 'Five features: elections, social base, ideas, factions, the role of the opposition.',
  scheme: [['Dominance through competitive elections', 1], ['Social coalition', 1], ['Ideological coalition', 1], ['Factions as a check', 1], ['Role of the opposition', 1]],
}));
Q('l_dominance_good', long({
  t: 2, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: 'Evaluate the effects of one-party dominance on Indian democracy in its early years.',
  model: '1. **Stability:** a party with a clear majority gave the new state a **stable government** while it faced partition, integration of states and planning.\n2. **Consensus-building:** because the Congress held many groups, compromises were reached **inside it**, reducing conflict in society.\n3. **Risks:** a weak opposition meant **less scrutiny** from outside, and the line between party and government could blur.\n4. **Balance:** factions and an articulate opposition still **checked** the government, and elections stayed competitive.\n5. **Judgement:** on balance dominance helped democracy take root, but it also **delayed** the growth of strong alternatives, which emerged after 1967.',
  sol: 'Benefits, risks, the checks that existed, and a reasoned judgement.',
  scheme: [['A benefit explained', 1], ['A second benefit', 1], ['A risk explained', 1], ['Checks that limited the risk', 1], ['Reasoned conclusion', 1]],
}));

// ================================================================ t03 Emergence of opposition parties
Q('m_bjs_year', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'The Bharatiya Jana Sangh was founded in 1951 with whom as its founder-president?',
  opts: ['Syama Prasad Mukherjee', 'C. Rajagopalachari', 'Ram Manohar Lohia', 'A. K. Gopalan'],
  sol: 'Syama Prasad Mukherjee founded the Jana Sangh in 1951. Rajagopalachari founded the Swatantra Party, Lohia was a socialist leader and A. K. Gopalan a communist leader.',
}));
Q('m_swatantra_year', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'The Swatantra Party was formed in 1959 mainly in reaction to which development?',
  opts: [
    'The Congress\'s Nagpur resolution supporting land ceilings, state trading in food grains and cooperative farming',
    'The dismissal of the Kerala government',
    'The war with China',
    'The reorganisation of states on linguistic lines',
  ],
  sol: 'Leaders who opposed more state control of agriculture and the economy, after the Congress\'s 1959 Nagpur resolution, formed the Swatantra Party. The other events had different effects; the war with China came in 1962.',
}));
Q('m_swatantra_ideas', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'An imagined candidate in 1962 promises to remove licences and controls on business, to oppose ceilings on landholdings and to seek closer ties with Western countries. Which party is he most likely to represent?',
  opts: ['Swatantra Party', 'Communist Party of India', 'Socialist Party', 'Bharatiya Jana Sangh'],
  sol: 'Free enterprise, fewer controls, opposition to land ceilings and a pro-Western outlook were the positions of the Swatantra Party. The CPI and the Socialists favoured more state action for equality; the main emphasis of the Jana Sangh was national and cultural unity.',
}));
Q('m_bjs_ideas', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'An imagined election pamphlet of 1953 calls for "one country, one culture, one nation" and for Hindi to be promoted as the official language. Which party most likely issued it?',
  opts: ['Bharatiya Jana Sangh', 'Swatantra Party', 'Communist Party of India', 'Socialist Party'],
  sol: 'These were positions of the Bharatiya Jana Sangh. Swatantra stressed free enterprise; the CPI and the Socialists stressed economic equality and the rights of workers and peasants.',
}));
Q('m_socialist_origin', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'The socialists who formed the Socialist Party in 1948 had earlier worked as which group?',
  opts: [
    'The Congress Socialist Party, a group inside the Congress formed in 1934',
    'A breakaway group of the Communist Party of India',
    'The Hindu Mahasabha',
    'The Muslim League',
  ],
  sol: 'The Congress Socialist Party was formed within the Congress in 1934; its members left to form the Socialist Party in 1948 when groups within the Congress could no longer have their own organisations. It was not a communist, Mahasabha or League group.',
}));
Q('m_cpi_rank', mcq({
  t: 3, d: 3, c: 'recall',
  stem: 'After the first general election, which party formed the largest opposition group in the first Lok Sabha, though with only a small number of seats?',
  opts: ['Communist Party of India', 'Swatantra Party', 'Bharatiya Jana Sangh', 'Socialist Party'],
  sol: 'The Communist Party of India was the largest opposition group in the first Lok Sabha. Swatantra did not yet exist; the Jana Sangh and the Socialists won fewer seats.',
}));
Q('m_kerala_dismissal', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Under which provision was the communist government of Kerala dismissed in 1959?',
  opts: ['Article 356 (President\'s Rule)', 'Article 370', 'Article 21', 'Article 32'],
  sol: 'The Centre dismissed the Kerala government in 1959 by imposing President\'s Rule under Article 356. Article 370 dealt with Jammu and Kashmir, Article 21 protects life and liberty, and Article 32 is the right to constitutional remedies.',
}));
Q('m_opp_role', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'An imagined opposition MP of 1955 regularly questions the government\'s food policy in Parliament and suggests changes. Which role of the opposition does this show?',
  opts: [
    'Keeping the ruling party in check by principled criticism',
    'Running the government in place of the ruling party',
    'Choosing the members of the Election Commission',
    'Approving the budget without debate',
  ],
  sol: 'Questioning and criticising policy keeps the government accountable, a key role of the opposition even when it is small. The opposition does not run the government, choose the Election Commission, or pass budgets without debate.',
}));
Q('m_respect', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: 'Which statement best describes the relation between the ruling party and opposition leaders in the early years of independence?',
  opts: [
    'There was considerable mutual respect, and some opposition figures had served in the first, broad-based cabinet',
    'Opposition leaders were not allowed to speak in Parliament',
    'The ruling party and the opposition never cooperated on anything',
    'Opposition parties were merged into the ruling party by law',
  ],
  sol: 'Leaders of different parties often respected one another, and the first cabinet included non-Congress figures such as B. R. Ambedkar and Syama Prasad Mukherjee. Opposition MPs spoke freely, cooperation did occur, and no law merged parties.',
}));
Q('m_communist_split', mcq({
  t: 3, d: 3, c: 'recall',
  stem: 'The Communist Party of India split in 1964. The new party formed was',
  opts: ['the Communist Party of India (Marxist)', 'the Praja Socialist Party', 'the Swatantra Party', 'the Bharatiya Jana Sangh'],
  sol: 'In 1964 the CPI split and the Communist Party of India (Marxist) was formed. The Praja Socialist Party came from the socialist stream; Swatantra and the Jana Sangh had separate origins.',
}));
Q('ar_opposition', ar({
  t: 3, d: 3, c: 'analysis', key: 'a',
  a: 'The opposition parties of the 1950s mattered for Indian democracy even though they won few seats.',
  r: 'They kept alternative ideas alive and criticised the government, preventing dissatisfaction from turning against democracy itself.',
  sol: 'Both are true, and R explains A: through criticism and by offering alternatives, the opposition kept the system open and legitimate.',
}));
Q('ar_swatantra', ar({
  t: 3, d: 2, c: 'analysis', key: 'c',
  a: 'The Swatantra Party opposed land ceilings and the expansion of the public sector.',
  r: 'The Swatantra Party was founded before the first general election.',
  sol: 'A is true: it favoured private enterprise and opposed land ceilings. R is false: it was founded in 1959, after the second general election.',
}));
Q('ar_socialists', ar({
  t: 3, d: 3, c: 'analysis', key: 'b',
  a: 'The socialists left the Congress and formed a separate party in 1948.',
  r: 'Socialist ideas such as economic equality also had supporters inside the Congress after 1948.',
  sol: 'Both are true, but R does not explain A. They left because the Congress no longer allowed separate organised groups within it, not because socialism had no supporters inside the Congress.',
}));
Q('tf_bjs_seats', tf({
  t: 3, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? In the 1950s the Bharatiya Jana Sangh won only a few Lok Sabha seats, with its support concentrated in some northern regions.',
  sol: 'The Jana Sangh\'s electoral support in this period was limited and regionally concentrated, mostly in parts of the Hindi-speaking north.',
}));
Q('fb_swatantra', fb({
  t: 3, d: 1, c: 'recall',
  stem: 'The Swatantra Party was formed in the year ___.',
  acc: [['1959']],
  sol: 'It was formed in 1959, after the Congress\'s Nagpur resolution.',
}));
Q('mt_parties', match({
  t: 3, d: 2, c: 'understanding',
  stem: 'Match each early opposition party with the idea most closely associated with it in the 1950s.',
  pairs: [
    ['Socialist Party', 'Democratic socialism and equality, criticising the Congress for favouring the rich'],
    ['Communist Party of India', 'Change through the ideas of Marxism-Leninism, with strong support among workers and peasants'],
    ['Bharatiya Jana Sangh', 'Cultural and national unity, with Hindi as the official language'],
    ['Swatantra Party', 'Free enterprise and less state control of the economy'],
  ],
  sol: 'Socialists: democratic socialism; CPI: Marxism-Leninism; Jana Sangh: cultural nationalism and Hindi; Swatantra: free enterprise.',
}));
Q('s_opp_roles', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State two ways in which the opposition parties of the 1950s contributed to Indian democracy.',
  model: '1. They **criticised the policies** of the Congress government and kept it **accountable**.\n2. They **kept alternative ideas alive** and prepared leaders, so that democracy did not depend on one party alone.',
  sol: 'Any two contributions: criticism, accountability, alternatives, training leaders, giving voice to the dissatisfied.',
  scheme: [['First contribution', 1], ['Second contribution', 1]],
}));
Q('s_bjs_two', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Mention any two positions of the Bharatiya Jana Sangh in the 1950s.',
  model: '1. It stressed **"one country, one culture, one nation"** and promoted **Hindi** as the official language.\n2. It called for a **strong, militarily capable India** and **closer integration** of all regions into the Union.',
  sol: 'Any two positions stated neutrally.',
  scheme: [['First position', 1], ['Second position', 1]],
}));
Q('s_swatantra_two', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Why did the Swatantra Party oppose the Congress\'s economic policies? Give two points.',
  model: '1. It believed the state should **not control** the economy so much and favoured **free private enterprise**.\n2. It opposed **land ceilings, cooperative farming and state trading** in food grains, which the Congress backed after its Nagpur session in 1959.',
  sol: 'Free enterprise; opposition to specific agricultural controls.',
  scheme: [['Free enterprise', 1], ['Opposition to specific controls', 1]],
}));
Q('s3_kerala', short({
  t: [3, 1], d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'What does the experience of the Kerala government of 1957–59 tell us about Indian democracy in that era?',
  model: '1. Voters could and did **elect a non-Congress government** in a state, so dominance was **not complete**.\n2. A communist party came to power **through elections** and governed within the Constitution.\n3. Its **dismissal in 1959** under Article 356, after a protest movement, began a long debate on how the **Centre\'s power over states** should be used.',
  sol: 'Limits of dominance; communists accepting elections; the debate on Article 356.',
  scheme: [['Limits of Congress dominance', 1], ['Power through the ballot', 1], ['Debate on central intervention', 1]],
}));
Q('s3_opp_weak', short({
  t: 3, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Why were the opposition parties weak in electoral terms in the 1950s even though their leaders were respected?',
  model: '1. The opposition was **divided** among socialists, communists, the Jana Sangh and others, so the **anti-Congress vote split**.\n2. Most of them were **new** and had **small organisations** compared with the Congress network.\n3. The Congress, as an **inclusive coalition**, already absorbed many of their ideas and supporters, leaving them little space.',
  sol: 'Division, weak organisation, and the inclusive Congress.',
  scheme: [['Divided opposition', 1], ['Weak organisation', 1], ['Congress absorbed their space', 1]],
}));
Q('l_opposition', long({
  t: 3, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Describe the ideas and early history of any four opposition parties of the era of one-party dominance.',
  model: '1. **Socialist Party:** grew from the **Congress Socialist Party** (1934) and became separate in **1948**; stood for **democratic socialism**; later split into several socialist parties.\n2. **Communist Party of India:** worked for change through **Marxism-Leninism**; the **largest opposition group** in the first Lok Sabha; formed the **Kerala government in 1957**; split in **1964**.\n3. **Bharatiya Jana Sangh:** founded in **1951** by **Syama Prasad Mukherjee**; stressed **national and cultural unity** and Hindi.\n4. **Swatantra Party:** formed in **1959** by **C. Rajagopalachari** and others; favoured **free enterprise** and opposed land ceilings.\n5. Together they **criticised** the government and offered **alternatives**, though they won few seats.',
  sol: 'Four parties with origin and ideas, plus their common role.',
  scheme: [['First party', 1], ['Second party', 1], ['Third party', 1], ['Fourth party', 1], ['Common role of the opposition', 1]],
}));
Q('l_compare_two', long({
  t: 3, d: 4, c: 'analysis', marks: 5, wl: L5,
  stem: 'Compare the Bharatiya Jana Sangh and the Swatantra Party of the 1950s and 1960s on their origins, ideas and support.',
  model: '1. **Origins:** the Jana Sangh was founded in **1951** by **Syama Prasad Mukherjee**; Swatantra in **1959** by **C. Rajagopalachari** and others after the Nagpur resolution.\n2. **Main concern:** the Jana Sangh emphasised **national and cultural unity**; Swatantra emphasised **economic freedom**.\n3. **Economy:** Swatantra wanted **less state control** and free enterprise; the Jana Sangh focused more on cultural and national questions.\n4. **Support:** the Jana Sangh drew support mainly in parts of the **north**; Swatantra attracted **landowners, industrialists and some princely families**.\n5. **Common ground:** both **opposed the Congress** and won few seats, but added new voices to democratic debate.',
  sol: 'Origins, main concern, economic stance, support base, common ground.',
  scheme: [['Origins', 1], ['Main concern', 1], ['Economic stance', 1], ['Support base', 1], ['Common ground', 1]],
}));

// ================================================================ source-based
Q('sb_booth', source({
  t: 1, d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the source from an imagined polling officer's notebook in the district of Kanakpur and answer the questions that follow. ${IMAG}`,
  passage: `**Notebook of a presiding officer, Kanakpur district (imagined), January 1952**\n\nOur district has about ${KANAK.voters.toLocaleString('en-IN')} voters on the new rolls and we have set up booths for about a thousand voters each. In every booth there are ${KANAK.partiesOnBallot} steel boxes, one for each candidate, and each box carries a picture: a pair of bullocks, a hut, a lamp, a tree. Today an old weaver asked me which box belonged to which party; I told him only to look for the picture he had seen on the posters. Women stood in a separate queue. Many walked several miles. By evening the boxes were sealed in front of the candidates' agents.`,
  parts: [
    child('a', num({ t: 1, d: 2, c: 'application', marks: 1, value: KANAK_BOXES, unit: 'boxes', stem: 'How many ballot boxes did the district need on polling day, using the figures in the source?', sol: `Step 1: Booths = ${KANAK.voters.toLocaleString('en-IN')} ÷ ${KANAK.perBooth.toLocaleString('en-IN')} = ${KANAK_BOOTHS}.\nStep 2: Boxes = ${KANAK_BOOTHS} × ${KANAK.partiesOnBallot} = ${KANAK_BOXES}.` })),
    child('b', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'Why did each box carry a picture?', model: 'Most voters **could not read** names, so a **symbol** let them find their candidate\'s box and vote secretly.', sol: 'Symbols helped non-literate voters.', scheme: [['Link between symbols and non-literate voters', 1]] })),
    child('c', short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Identify two details in the source that show care for a free and fair vote.', model: '(1) The officer told the weaver only to look for the **picture**, without telling him whom to choose, so the choice stayed **his own**. (2) Boxes were **sealed in front of the candidates\' agents**, so no one could tamper with them.', sol: 'Neutral help to voters; sealing before agents.', scheme: [['First detail explained', 1], ['Second detail explained', 1]] }), [
      short({ t: 1, d: 3, c: 'evaluation', marks: 2, stem: '**Or** (ii): What does the source suggest about why the first election is called a huge achievement?', model: 'Ordinary people, including **women** and **non-literate** voters, **walked miles** to vote, and officials managed thousands of boxes across a large district; this shows that **universal adult franchise** worked on the ground.', sol: 'Participation plus organisation.', scheme: [['Participation of ordinary people', 1], ['Scale of organisation', 1]] }),
    ]),
  ],
}));
Q('sb_sonpradesh', source({
  t: [1, 2], d: 4, c: 'analysis', origin: 'soyl-original',
  stem: `Read the imagined newspaper report on the election in Sonpradesh and answer the questions that follow. ${IMAG}`,
  passage: `**"Party P sweeps Sonpradesh" — report in an imagined newspaper**\n\nParty P has won ${SEATS.P} of the ${FPTP.length} seats in Sonpradesh, though it polled ${VOTES.P} thousand of the ${TOTAL} thousand votes cast. Party Q won one seat with ${VOTES.Q} thousand votes, while Party R, with ${VOTES.R} thousand votes, won none. In Amarpur, P's candidate won by ${AMAR_MARGIN} thousand votes. Leaders of Q and R blamed each other for splitting the vote. A P spokesperson said the voters had "spoken clearly".`,
  parts: [
    child('a', num({ t: 1, d: 3, c: 'application', marks: 1, value: SEAT_PCT.P, unit: '%', stem: 'What percentage of the seats did Party P win?', sol: `Step 1: Seat share = ${SEATS.P} ÷ ${FPTP.length} × 100.\nStep 2: ${SEATS.P} ÷ ${FPTP.length} × 100 = ${SEAT_PCT.P}. So ${SEAT_PCT.P}%.` })),
    child('b', short({ t: 1, d: 3, c: 'application', marks: 1, stem: 'Name the electoral system that produced this result.', model: '**First-past-the-post** (plurality) system.', sol: 'Most votes in a constituency wins the seat.', scheme: [['First-past-the-post', 1]] })),
    child('c', short({ t: [1, 2], d: 4, c: 'analysis', marks: 2, stem: '**Either** (i): Did the voters of Sonpradesh "speak clearly" for Party P? Give a reason from the data.', model: `Not entirely: P got **${VOTE_PCT.P}% of the votes** but **${SEAT_PCT.P}% of the seats**. Most voters (${Math.round((100 - VOTE_PCT.P) * 10) / 10}%) chose Q or R, but their votes were **split**, so P won with pluralities.`, sol: 'Compare vote share with seat share and point to the split.', scheme: [['Vote share versus seat share', 1], ['Role of the split opposition', 1]] }), [
      short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): How does this imagined result help explain Congress dominance in 1952–62?', model: 'Like P, the Congress was the **largest single party everywhere**, while the **opposition was divided**; under first-past-the-post this turned **less than half of the votes** into about **three-quarters of the seats**.', sol: 'Draw the parallel: largest party, divided rivals, seat bonus.', scheme: [['Parallel with the Congress', 1], ['Seat bonus explained', 1]] }),
    ]),
  ],
}));
Q('sb_faction', source({
  t: 2, d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the source from an imagined letter by a Congress district secretary in Vindhyapur and answer the questions that follow. ${IMAG}`,
  passage: '**Letter from the Congress district secretary of Vindhyapur (imagined), 1956**\n\nDear colleague, our district unit has two camps. One wants faster land reform and speaks the language of the socialists; the other is close to the big traders and wants the government to go slow. Both came to the party meeting, argued for four hours and finally agreed on a resolution in the middle. Our candidate list includes men from both camps and from three different castes. Some friends say this makes us weak. I think it is exactly why the farmers and the traders both vote for us.',
  parts: [
    child('a', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'What term is used for the "two camps" inside the district unit?', model: '**Factions** (groups within the party).', sol: 'Groups competing inside one party are factions.', scheme: [['Factions', 1]] })),
    child('b', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Which line shows that the Congress was a social coalition?', model: '"Our candidate list includes men from both camps and from **three different castes**" (or: "**the farmers and the traders both vote for us**").', sol: 'Support from varied groups.', scheme: [['A correct line', 1]] })),
    child('c', short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Does the existence of factions make the party weak or strong? Answer with reference to the source.', model: 'Mostly **strong**: the factions argued **inside** the party and agreed on a **middle-ground** resolution, so neither group left, and the party kept the support of **both farmers and traders**.', sol: 'Use the compromise and the broad support in the source.', scheme: [['Judgement', 1], ['Reason from the source', 1]] }), [
      short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Explain how the meeting described in the source shows the "ideological coalition" character of the Congress.', model: 'A **socialist-leaning** group and a **pro-trader, go-slow** group, with different ideas about land reform, both stayed in the party and settled on a **compromise**, showing that the Congress held **left and right** together.', sol: 'Two ideologies, one party, a compromise.', scheme: [['Two ideologies identified', 1], ['Compromise within one party', 1]] }),
    ]),
  ],
}));
Q('sb_kerala', source({
  t: [3, 1], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the source from an imagined diary of a schoolteacher in Thrissur and answer the questions that follow. ${IMAG}`,
  passage: '**Diary of a schoolteacher in Thrissur (imagined), 1957–59**\n\nApril 1957. For the first time our state has a government that is not of the Congress. The communists won the election and the new Chief Minister has promised land reform and changes in education. My neighbour says this could not happen in many countries: a communist party taking office through a vote.\n\nAugust 1959. After months of protest marches against the government, the President has dismissed it. Some in the staff room say the Centre acted to keep order; others say an elected government should have been allowed to finish its term.',
  parts: [
    child('a', short({ t: 3, d: 1, c: 'recall', marks: 1, stem: 'Which party formed the government described in April 1957?', model: 'The **Communist Party of India** (under E. M. S. Namboodiripad).', sol: 'The CPI won Kerala in 1957.', scheme: [['Communist Party of India', 1]] })),
    child('b', short({ t: 3, d: 2, c: 'understanding', marks: 1, stem: 'Under which Article of the Constitution was the government dismissed in 1959?', model: '**Article 356** (President\'s Rule).', sol: 'Dismissal of a state government by the President uses Article 356.', scheme: [['Article 356', 1]] })),
    child('c', short({ t: [3, 1], d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Why did the neighbour think the 1957 event was unusual?', model: 'Communist parties in many countries came to power through **revolution or force**; in Kerala a communist party came to power **through a free election** and governed within a **democratic constitution**.', sol: 'Contrast ballot with revolution.', scheme: [['Usual path elsewhere', 1], ['Ballot in Kerala', 1]] }), [
      short({ t: 3, d: 4, c: 'evaluation', marks: 2, stem: '**Or** (ii): The staff room was divided on the dismissal. State one argument on each side.', model: '**For:** the Centre may act when a state faces **serious unrest** and order breaks down. **Against:** an **elected** government should normally be removed **by voters**, and using Article 356 against an opposition government can weaken federalism.', sol: 'One argument each way, stated neutrally.', scheme: [['Argument for', 1], ['Argument against', 1]] }),
    ]),
  ],
}));
Q('sb_debate', source({
  t: 3, d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the source from an imagined college debating society's minutes in Allahabad and answer the questions that follow. ${IMAG}`,
  passage: '**Minutes of the college debating society, Allahabad (imagined), 1960**\n\nMotion: "A small opposition is a useless opposition." Speaker 1, for the motion, said the opposition parties together have only a handful of seats and cannot change any law. Speaker 2, against, said a few determined members can still ask hard questions, and that the ideas of today\'s small parties — a freer economy, a stronger stress on cultural unity, more equality for workers — may become tomorrow\'s policies. Speaker 3 added that even many Congress members privately agree with some of these critics. The motion was lost.',
  parts: [
    child('a', short({ t: 3, d: 2, c: 'application', marks: 1, stem: 'Which party of the time is most closely linked to the idea of "a freer economy"?', model: 'The **Swatantra Party**.', sol: 'Free enterprise = Swatantra.', scheme: [['Swatantra Party', 1]] })),
    child('b', short({ t: 3, d: 2, c: 'application', marks: 1, stem: 'Which party is most closely linked to "a stronger stress on cultural unity"?', model: 'The **Bharatiya Jana Sangh**.', sol: 'Cultural and national unity = Jana Sangh.', scheme: [['Bharatiya Jana Sangh', 1]] })),
    child('c', short({ t: [3, 2], d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Give two reasons from the source why the motion was lost.', model: '(1) A small opposition can still **question the government** and keep it accountable. (2) Its **ideas** can shape future policy, and some ruling-party members **share** them, so its influence is larger than its seats.', sol: 'Accountability and influence of ideas.', scheme: [['First reason', 1], ['Second reason', 1]] }), [
      short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): What does Speaker 3\'s remark tell us about the nature of the Congress in this era?', model: 'The Congress was an **ideological coalition**: members with views close to the opposition stayed **inside** it, so debates of the opposition were also carried on **within the ruling party**.', sol: 'Link to the ideological coalition and internal opposition.', scheme: [['Ideological coalition', 1], ['Opposition ideas present inside the party', 1]] }),
    ]),
  ],
}));
