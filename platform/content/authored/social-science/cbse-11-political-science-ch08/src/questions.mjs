// CBSE 11 Political Science, ch08 Local Governments: question bank. Every passage (gram sabha minutes, budget statement,
// ward committee note, letter, school debate) is written by SOYL and labelled as imagined; the state of Varunadesh, the
// villages Madhupur, Neelgaon and Ketkipur, the town of Sundarpet, the city of Ratnavali, the settlement of Kharbanda and
// all people in scenarios are imagined. No NCERT text, boxed source, cartoon, Constitution text, speech, report text or
// board/sample-paper item is reused (D-036). Articles and Schedules are cited by number with a paraphrase of what they provide.
import { Q, mcq, ar, tf, fb, match, ord, short, long, caseQ, child } from '../../cbse-11-political-science-ch01/src/lib.mjs';

const S2 = [30, 50];
const S3 = [50, 80];
const L5 = [80, 120];

// ================================================================ t01 Growth of local government; 73rd and 74th Amendments
Q('m_why_local', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Which of the following is the strongest argument for setting up local governments such as panchayats and municipalities in a large democracy?',
  opts: ['Local problems can be decided close to the people, who know them best and can take part in the decisions', 'They make state governments unnecessary', 'They allow Parliament to meet less often', 'They ensure that every local decision is taken by the Union government'],
  sol: 'Decisions taken near the people use local knowledge and allow direct participation, which is the core argument for local government. Local bodies do not replace state governments, do not affect how often Parliament meets, and do not hand decisions to the Union government.',
}));
Q('m_ripon', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'The 1882 resolution associated with Lord Ripon, then the Viceroy, is remembered as an early step in the growth of',
  opts: ['local self-government in India', 'reservation for women in legislatures', 'the Community Development Programme', 'the Eleventh Schedule'],
  sol: 'The 1882 resolution encouraged local self-government bodies in British India. Reservation for women in panchayats, the Community Development Programme (1952) and the Eleventh Schedule (1992) belong to later times.',
}));
Q('m_1919', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'Under the Government of India Act 1919, village panchayats were set up in',
  opts: ['some of the provinces of British India', 'every village of the country at the same time', 'the cities of the presidencies only', 'no province, since the Act dealt only with defence'],
  sol: 'The Act led to the establishment of village panchayats in some provinces. It did not cover every village at once, it was not limited to cities, and it was not an Act about defence.',
}));
Q('m_art40', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'Which Article of the Constitution, a Directive Principle, asks the State to take steps to organise village panchayats?',
  opts: ['Article 40', 'Article 14', 'Article 19', 'Article 32'],
  sol: 'Article 40 is a Directive Principle on organising village panchayats. Article 14 is on equality before the law, Article 19 lists freedoms and Article 32 provides the remedy for Fundamental Rights.',
}));
Q('m_bm', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'In 1957, the Balwantrai Mehta Committee recommended',
  opts: ['a three-tier system of rural local government', 'a single tier of local government at the district level only', 'the abolition of village panchayats', 'the control of villages directly by the Union government'],
  sol: 'The committee recommended a three-tier structure of rural local government, which became the basis of the panchayati raj system. The other options describe proposals the committee did not make.',
}));
Q('m_singhvi', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'Which committee, set up in 1986, recommended that local self-government bodies be given constitutional status?',
  opts: ['The L. M. Singhvi Committee', 'The Balwantrai Mehta Committee', 'The Election Commission', 'The Community Development Programme'],
  sol: 'The L. M. Singhvi Committee of 1986 made this recommendation, which led to the amendments of 1992. The Balwantrai Mehta Committee belongs to 1957, and the Election Commission and the Community Development Programme are not committees on this subject.',
}));
Q('m_inforce', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'The 73rd Amendment came into force on 24 April 1993, a date now observed as',
  opts: ['National Panchayati Raj Day', 'Constitution Day', 'Republic Day', 'National Voters Day'],
  sol: '24 April is observed as National Panchayati Raj Day. Constitution Day is 26 November, Republic Day is 26 January, and National Voters Day is observed on another date.',
}));
Q('m_tiers', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Which is the correct order of the three tiers of the panchayati raj system, from the lowest to the highest?',
  opts: ['Gram panchayat, panchayat samiti, zila parishad', 'Zila parishad, panchayat samiti, gram panchayat', 'Gram sabha, zila parishad, panchayat samiti', 'Panchayat samiti, gram panchayat, zila parishad'],
  sol: 'The village is the lowest tier, the block (intermediate) tier is in the middle and the district is the highest. The other orders mix the levels up.',
}));
Q('m_small_state', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'The imagined state of Tarangpur has a population of 15 lakh. Under the 73rd Amendment, which statement about its panchayats is correct?',
  opts: ['It must have village and district panchayats, but it need not have the intermediate tier', 'It need not have panchayats at all because it is small', 'It must have only an intermediate tier', 'It must have four tiers of panchayats'],
  sol: 'States with a population below 20 lakh need not have the intermediate tier, though they must have the village and district levels. A small population does not remove the duty to have panchayats, and the Amendment provides for three tiers, not four.',
}));
Q('m_gramsabha', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Under the 73rd Amendment, the gram sabha is made up of',
  opts: ['all the adult voters of the village', 'only the elected members of the gram panchayat', 'only the officials posted in the village', 'only the heads of the largest families'],
  sol: 'The gram sabha is the body of all adult voters of the village, so it is wider than the elected gram panchayat. Officials and family heads as such do not form it.',
}));
Q('m_dissolve', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'The gram panchayat of imagined Ketkipur is dissolved by the state government two years into its five-year term. Under the 73rd Amendment, fresh elections must be held',
  opts: ['within six months of the dissolution', 'only after five more years', 'only after the next Lok Sabha election', 'whenever the state government chooses, with no time limit'],
  sol: 'If a panchayat is dissolved before its term ends, elections must be held within six months. The Amendment was designed to stop long gaps without elected bodies, so waiting five years or leaving the date open is not allowed.',
}));
Q('m_reserve_women', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'A panchayat samiti in imagined Varunadesh has 24 directly elected seats. As per the 73rd Amendment, the least number of seats that must be reserved for women is',
  opts: ['8', '6', '12', '4'],
  sol: 'At least one-third of the seats must be reserved for women, and one-third of 24 is 8. Many states reserve more, up to half, but 8 is the minimum under the Amendment.',
}));
Q('m_reserve_sc', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'In the imagined gram panchayat of Neelgaon, with 10 seats, Scheduled Castes are about 30 percent of the population of the area. Which statement fits the 73rd Amendment?',
  opts: ['Seats are reserved for Scheduled Castes roughly in proportion to their population, so about three seats', 'Exactly half of the seats must be reserved for them', 'No seat can be reserved for them', 'Only the post of chairperson can be reserved, and no seats'],
  sol: 'Seats and the chairpersons\' posts are reserved for Scheduled Castes and Scheduled Tribes in proportion to their population in the area, which gives about three of ten seats here. A fixed half or no reservation does not follow the rule.',
}));
Q('m_sec', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'Voters of imagined Neelgaon ask which body will announce the programme of the coming panchayat elections and conduct the polling in their state. The answer is',
  opts: ['the State Election Commission', 'the Election Commission of India, in all cases', 'the zila parishad', 'the State Public Service Commission'],
  sol: 'The Amendments provide for a State Election Commission to conduct local body elections. The Election Commission of India conducts elections to Parliament and the state legislatures, and the other bodies do not conduct elections.',
}));
Q('m_sfc', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'A state government wants an independent body to review the finances of its panchayats every five years and to suggest how money should be shared between the state and these bodies. Which body does the Constitution provide for this purpose?',
  opts: ['The State Finance Commission', 'The State Election Commission', 'The zila parishad of the largest district', 'The Public Accounts Committee of Parliament'],
  sol: 'The 73rd Amendment provides for a State Finance Commission, set up every five years, to review the finances of panchayats. The State Election Commission conducts elections, a zila parishad is itself a local body, and the Public Accounts Committee examines accounts in Parliament.',
}));
Q('m_11th', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'The Eleventh Schedule of the Constitution lists subjects that may be transferred to the panchayats. How many subjects does it list?',
  opts: ['29', '18', '7', '12'],
  sol: 'The Eleventh Schedule lists 29 subjects. The Twelfth Schedule, for municipalities, lists 18.',
}));
Q('m_pesa', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'A tribal district of the imagined state of Tarangpur is a Fifth Schedule area, and its leaders ask how the panchayat provisions apply to them. The Panchayats (Extension to Scheduled Areas) Act 1996 answers by being an Act to',
  opts: ['extend the panchayat provisions to Fifth Schedule (tribal) areas, with adaptations', 'abolish panchayats in tribal areas', 'extend the municipal provisions to all large cities', 'reduce the number of seats reserved for women'],
  sol: 'The Act extends the provisions of Part IX to Fifth Schedule areas, with adaptations to suit them. It does not abolish panchayats, does not deal with cities, and does not alter women\'s reservation.',
}));
Q('m_bc', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'Councillors in imagined Varunadesh ask who decides whether seats in panchayats will also be reserved for backward classes in their state. Under the 73rd Amendment, this reservation is',
  opts: ['left to the states to decide', 'fixed by the Constitution at one-third of the seats', 'forbidden in all cases', 'decided by each gram sabha separately'],
  sol: 'The Amendment leaves reservation for backward classes to the states, while reservation for Scheduled Castes, Scheduled Tribes and women is provided by the Constitution. It neither fixes a one-third share for backward classes nor forbids reservation.',
}));
Q('m_74', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'The 74th Amendment, on urban local bodies, came into force on',
  opts: ['1 June 1993', '24 April 1993', '26 January 1950', '26 November 1949'],
  sol: 'The 74th Amendment came into force on 1 June 1993, about five weeks after the 73rd. The other dates are those of the 73rd Amendment, the Constitution coming into force and the Constitution being adopted.',
}));
Q('m_forms', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'The imagined settlement of Pathrakot is changing from a rural area to an urban one. Under the 74th Amendment, which kind of urban local body is provided for an area of this kind?',
  opts: ['A nagar panchayat', 'A municipal corporation', 'A zila parishad', 'A gram panchayat'],
  sol: 'A nagar panchayat is meant for an area in transition from rural to urban. A municipal corporation is for a larger urban area, a zila parishad is a district panchayat and a gram panchayat is a village body.',
}));
Q('m_12th', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'The Twelfth Schedule of the Constitution lists subjects that may be given to municipalities. How many subjects does it list?',
  opts: ['18', '29', '11', '8'],
  sol: 'The Twelfth Schedule lists 18 subjects, such as urban planning, water supply and public health. The Eleventh Schedule, for panchayats, lists 29.',
}));
Q('m_ward', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'Ratnavali, an imagined city of about 12 lakh people, is divided into 90 wards. Which arrangement does the 74th Amendment provide for municipalities of such a large size?',
  opts: ['Ward committees', 'A gram sabha in every ward', 'A panchayat samiti for the whole city', 'A zila parishad inside every ward'],
  sol: 'The Amendment provides for ward committees in larger municipalities, so that people in each part of the city have a forum close to them. Gram sabhas, panchayat samitis and zila parishads belong to the rural panchayat system.',
}));
Q('m_urban_def', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'Kharbanda, an imagined settlement, has a population of 6,200. Eighty percent of its working men have jobs outside agriculture, and its density is 450 persons per square kilometre. Judged by the Census 2011 definition of an urban area, Kharbanda',
  opts: ['meets all three tests and counts as urban', 'fails because its population is below 10,000', 'fails because its density is below 1,000 persons per square kilometre', 'counts as urban only if it already has a municipal corporation'],
  sol: 'The definition needs a population of at least 5,000, at least 75 percent of the male working population in non-agricultural work, and a density of at least 400 persons per square kilometre. Kharbanda meets all three, and the thresholds of 10,000 and 1,000 are not part of the definition.',
}));

// ---------------------------------------------------------------- t02 Implementation of local governance
Q('m_regular', mcq({
  t: 2, d: 3, c: 'understanding',
  stem: 'Which of the following is generally counted as an achievement of local governments since the 1992 Amendments?',
  opts: ['Regular elections, which have brought a very large number of people, including many women and members of SC and ST communities, into elected office', 'The full transfer of all 29 subjects, with funds, to every panchayat in every state', 'The complete end of dependence on grants from the state and the Union', 'The removal of the need for a State Election Commission'],
  sol: 'Regular elections and wider participation, including of women and of Scheduled Castes and Scheduled Tribes, are the commonly noted achievements. Full transfer of subjects and funds has not happened everywhere, dependence on grants continues, and the State Election Commission remains necessary.',
}));
Q('m_threeF', mcq({
  t: 2, d: 3, c: 'understanding',
  stem: 'Funds, functions and functionaries, sometimes called the three Fs, are discussed in assessments of local government because',
  opts: ['many observers argue that states have transferred them to local bodies only to a limited extent', 'all states have transferred all of them in full to every local body', 'they decide which party wins local elections', 'they are the three tiers of the panchayati raj system'],
  sol: 'The three Fs are the subjects (functions), the money (funds) and the staff (functionaries) that local bodies need, and a common point in assessments is that states have transferred them only partly. They are not the tiers of panchayats and do not decide election results.',
}));
Q('m_grants', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'In the imagined annual budget of Madhupur gram panchayat, 34 lakh rupees of the total income of 40 lakh rupees come as grants from the Union and the state. Which conclusion is best supported by these figures?',
  opts: ['The panchayat depends heavily on grants and raises only a small part of its income itself', 'The panchayat is financially independent of the government', 'The panchayat collects most of its money from house tax and fees', 'The State Finance Commission has been abolished'],
  sol: 'Grants of 34 out of 40 lakh rupees make up 85 percent of income, so the own revenue is only 15 percent. This shows heavy dependence on grants. It does not show independence, and nothing in the figures concerns the State Finance Commission.',
}));
Q('m_proxy', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'In the imagined gram panchayat of Ketkipur, an elected woman sarpanch does not attend meetings; a male relative attends in her place and signs on her behalf. Which concern about local government does this situation illustrate?',
  opts: ['Proxy representation, where a relative acts in place of the elected woman', 'Judicial overreach by a High Court', 'The delimitation of constituencies', 'A dispute between two states over a river'],
  sol: 'Reports from some places describe an elected woman\'s relative acting for her, which is called proxy representation. Many elected women act independently, so this is a concern in some places and not a general rule. The other options concern courts, constituency boundaries and river disputes.',
}));
Q('m_transfer', mcq({
  t: 2, d: 4, c: 'analysis',
  stem: 'A state\'s rules say that gram panchayats \'may handle\' primary schooling and drinking water. But the teachers and engineers still report to state departments, and the money for these works is decided and released by the state. Which feature of the working of local government does this describe?',
  opts: ['A subject is listed for local bodies, but functions, funds and functionaries are transferred only in a limited way', 'A complete transfer of the subject to the gram panchayat', 'A State Election Commission taking over the schools', 'The abolition of the gram sabha'],
  sol: 'When the subject is on paper with local bodies but the staff and money stay with the state, the transfer is limited, which is a main point in assessments of local governance. A complete transfer would mean control of staff and funds too, and the other options describe unrelated changes.',
}));
Q('m_control', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'In imagined Ketkipur block, a gram panchayat resolves to widen a village lane, but the work can start only after a block-level state official approves it, and the official delays the approval for months. Which problem in local governance does this illustrate?',
  opts: ['Control by state officials over elected local bodies', 'Excess of own revenue', 'Judicial activism', 'The absence of elections'],
  sol: 'When approval from a state official decides whether an elected body can act, critics describe this as control by state officials. The panchayat here has not raised any revenue, there is no court involved, and elections have been held, so the other options do not fit.',
}));
Q('m_voice', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'At a gram sabha meeting in imagined Neelgaon, villagers ask for the accounts of money spent on the school building, and the sarpanch answers their questions in the open meeting. This best shows',
  opts: ['a voice for people at the grassroots and accountability of the elected body', 'the power of the zila parishad over the village', 'the removal of the need for elections', 'the Union government running the village'],
  sol: 'A meeting in which ordinary villagers question spending and the elected head answers shows grassroots participation and accountability. It does not involve the zila parishad, replace elections or involve the Union government.',
}));
Q('m_assess', mcq({
  t: 2, d: 4, c: 'evaluation',
  stem: 'Which statement presents the assessment of local governments in a balanced way?',
  opts: ['Some argue that local bodies have deepened democracy through regular elections and wider participation; others argue that their powers and finances remain limited', 'Local bodies have completely transformed democracy and have no weaknesses', 'Local bodies have failed completely and have achieved nothing', 'The question cannot be discussed until every state has transferred every subject'],
  sol: 'A balanced statement gives the reasons of both views, using some argue and others argue. The other options declare one side entirely right or refuse to discuss the question.',
}));
Q('m_own_rev', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'The elected body of imagined Neelgaon wants to raise more of its own revenue. Which step would add directly to its own revenue?',
  opts: ['Collecting house tax, market fees and rents from its stalls and premises', 'Getting a larger grant from the state government', 'Getting a larger grant recommended for it by the Union', 'Asking the zila parishad to meet its expenses'],
  sol: 'Own revenue is what the body raises itself, such as taxes, fees and rents. Grants from the state or the Union and money from another body are transfers, so they do not add to its own revenue.',
}));

// ---------------------------------------------------------------- assertion-reason
Q('ar_73', ar({
  t: 1, d: 3, c: 'understanding', verdict: 'both-true-explains',
  a: 'Panchayat elections are now held at regular intervals across the states.',
  r: 'The 73rd Amendment requires elections every five years and, if a body is dissolved, within six months.',
  sol: 'Both are true, and R explains A: the constitutional rule on five-year terms and the six-month limit after dissolution is what makes regular elections a requirement, not a favour.',
}));
Q('ar_sabha', ar({
  t: 1, d: 2, c: 'understanding', verdict: 'both-true-not-explains',
  a: 'The gram sabha consists of all adult voters of the village.',
  r: 'The panchayati raj system has three tiers: village, block and district.',
  sol: 'Both are true, but R does not explain A: the gram sabha includes all adult voters because it is meant as the assembly of the whole village, which has nothing to do with the number of tiers.',
}));
Q('ar_small', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'A-false-R-true',
  a: 'Every state, whatever its population, must have all three tiers of panchayats.',
  r: 'States with a population below 20 lakh need not have the intermediate tier.',
  sol: 'A is false because states below 20 lakh need not have the intermediate tier. R is true, and it is the exception that makes A false.',
}));
Q('ar_corp', ar({
  t: 1, d: 3, c: 'understanding', verdict: 'A-true-R-false',
  a: 'A municipal corporation is the kind of urban local body meant for a larger urban area.',
  r: 'A municipal corporation is meant for an area that is changing from rural to urban.',
  sol: 'A is true. R is false: the area in transition from rural to urban is served by a nagar panchayat, while a municipal council is for a smaller urban area.',
}));
Q('ar_funds', ar({
  t: 2, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'Many panchayats depend heavily on grants from the state and the Union.',
  r: 'Their own revenue from taxes, fees and rents is low.',
  sol: 'Both are true, and R explains A: when a body raises little by itself, most of its spending has to be met from grants.',
}));
Q('ar_reserve', ar({
  t: 1, d: 3, c: 'application', verdict: 'both-true-not-explains',
  a: 'At least one-third of the seats in panchayats are reserved for women.',
  r: 'Seats are reserved for Scheduled Castes and Scheduled Tribes in proportion to their population.',
  sol: 'Both are true, but R does not explain A: women\'s seats are reserved as a share of all seats, whereas the reservation for Scheduled Castes and Scheduled Tribes follows their population, so the two rules are separate.',
}));

// ---------------------------------------------------------------- true-false, fill in the blank, match, ordering
Q('tf_sabha', tf({
  t: 1, d: 2, c: 'understanding', ans: false,
  stem: 'The gram sabha is the same as the elected gram panchayat.',
  sol: 'The gram sabha is the assembly of all adult voters of the village, and the gram panchayat is the body elected from among them to run village affairs.',
}));
Q('tf_ward', tf({
  t: 1, d: 3, c: 'understanding', ans: true,
  stem: 'Ward committees are provided for under the 74th Amendment in larger municipalities.',
  sol: 'The 74th Amendment provides for ward committees in larger municipalities, so that residents of each ward have a local forum.',
}));
Q('tf_twelfth', tf({
  t: 1, d: 2, c: 'recall', ans: false,
  stem: 'The Twelfth Schedule lists the subjects that may be transferred to panchayats.',
  sol: 'The Eleventh Schedule lists the 29 subjects for panchayats. The Twelfth Schedule lists the 18 subjects for municipalities.',
}));
Q('fb_29', fb({
  t: 1, d: 2, c: 'recall',
  stem: 'The Eleventh Schedule lists ___ subjects that may be transferred to the panchayats.',
  acc: [['29', 'twenty-nine', 'twenty nine']],
  sol: 'The Eleventh Schedule has 29 subjects, such as agriculture, drinking water and primary education.',
}));
Q('fb_five', fb({
  t: 1, d: 2, c: 'recall',
  stem: 'Under the 73rd Amendment, elections to the panchayats must be held every ___ years.',
  acc: [['5', 'five']],
  sol: 'The term of a panchayat is five years, and fresh elections follow its end or, if it is dissolved, within six months.',
}));
Q('fb_nagar', fb({
  t: 1, d: 2, c: 'recall',
  stem: 'An area in transition from rural to urban is given a ___ panchayat under the 74th Amendment.',
  acc: [['nagar']],
  sol: 'A nagar panchayat is the body for an area in transition; larger urban areas have a municipal council or a municipal corporation.',
}));
Q('mt_urban', match({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'Match each local body with the area it serves or the work it does.',
  pairs: [
    ['Nagar panchayat', 'An area in transition from rural to urban'],
    ['Municipal council', 'A smaller urban area'],
    ['Municipal corporation', 'A larger urban area'],
    ['Ward committee', 'A forum within a ward of a large municipality'],
  ],
  sol: 'The three forms of municipality match the size and stage of the area, and ward committees bring decisions nearer to residents of a ward.',
}));
Q('mt_timeline', match({
  t: 1, d: 2, c: 'recall', marks: 2,
  stem: 'Match each year with the step in the growth of local government.',
  pairs: [
    ['1882', 'Lord Ripon\'s resolution on local self-government'],
    ['1952', 'The Community Development Programme'],
    ['1957', 'The Balwantrai Mehta Committee recommends three tiers'],
    ['1986', 'The L. M. Singhvi Committee recommends constitutional status'],
  ],
  sol: 'The steps follow in order: the resolution of 1882, the programme of 1952, the committee of 1957 and the committee of 1986, which led to the amendments of 1992.',
}));
Q('ord_timeline', ord({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'Arrange these steps in the growth of local government in the order in which they happened.',
  items: [
    'Lord Ripon\'s resolution on local self-government',
    'The Balwantrai Mehta Committee recommends a three-tier system',
    'The 73rd and 74th Amendments are passed',
    'The Panchayats (Extension to Scheduled Areas) Act is passed',
  ],
  sol: 'The resolution is of 1882, the committee of 1957, the amendments were passed in 1992 and the extension to Scheduled Areas is of 1996.',
}));
Q('ord_election', ord({
  t: 1, d: 3, c: 'application', marks: 2,
  stem: 'In imagined Varunadesh, the zila parishad is dissolved. Arrange these steps in the order in which they should follow under the 73rd Amendment.',
  items: [
    'The zila parishad is dissolved before its term ends',
    'The State Election Commission announces the programme of elections',
    'Elections are held within six months of the dissolution',
    'The newly elected zila parishad takes office for a fresh term',
  ],
  sol: 'Dissolution comes first, then the State Election Commission announces the programme, the election is held within six months, and the new body takes office.',
}));

// ================================================================ short answers (2 marks)
Q('s2_why', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Give two reasons why local government is considered important in a democracy.',
  model: 'First, decisions on local needs such as water, lanes and schools are taken **close to the people**, who know the problems and can take part directly. Second, local bodies bring **grassroots participation** and make officials more accountable, which strengthens democracy at its base.',
  sol: 'Two reasons: closeness and local knowledge, and participation and accountability.',
  scheme: [['One reason explained: decisions near the people, using local knowledge', 1], ['A second reason explained: participation and accountability', 1]],
}));
Q('s2_sabha', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'What is the gram sabha? How is it different from the gram panchayat?',
  model: 'The **gram sabha** is the village assembly in which **every adult voter** has a place. The **gram panchayat** is the smaller body **elected** by those voters to manage the village, and it is answerable to the gram sabha, where plans and accounts can be discussed.',
  sol: 'Meaning of the gram sabha and its difference from the elected panchayat.',
  scheme: [['Gram sabha: all adult voters of the village', 1], ['Gram panchayat: the elected body that runs village affairs', 1]],
}));
Q('s2_gandhi', short({
  t: 1, d: 2, c: 'recall', marks: 2, wl: S2,
  stem: 'State Gandhi\'s idea of gram swaraj in a sentence and say which Article of the Constitution refers to village panchayats.',
  model: '**Gram swaraj** is the idea that villages should be largely self-governing communities, running their own affairs. **Article 40**, a Directive Principle, asks the State to take steps to organise village panchayats and give them the powers needed to work as units of self-government.',
  sol: 'Gram swaraj as village self-rule, and Article 40.',
  scheme: [['Gram swaraj: village self-rule', 1], ['Article 40, a Directive Principle on organising village panchayats', 1]],
}));
Q('s2_reserve', short({
  t: 1, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'A zila parishad in imagined Varunadesh has 60 seats. State the least number reserved for women under the 73rd Amendment and say who else gets seats reserved.',
  model: 'At least **one-third** of the seats, that is **20 seats**, must be reserved for women. Seats and chairpersons\' posts are also reserved for **Scheduled Castes and Scheduled Tribes** in proportion to their population, while reservation for backward classes is left to the states.',
  sol: 'One-third of 60 is 20; the other reserved groups.',
  scheme: [['At least one-third, which is 20 seats, for women', 1], ['Seats reserved for Scheduled Castes and Scheduled Tribes in proportion to population; backward classes left to the states', 1]],
}));
Q('s2_sec', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'What are the tasks of the State Election Commission and the State Finance Commission in local government?',
  model: 'The **State Election Commission** conducts the **elections** to panchayats and municipalities. The **State Finance Commission** is set up **every five years** to review the finances of these bodies and to suggest how funds should be shared between the state and the local bodies.',
  sol: 'The two commissions and their tasks.',
  scheme: [['State Election Commission conducts local body elections', 1], ['State Finance Commission reviews finances every five years', 1]],
}));
Q('s2_pesa', short({
  t: 1, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: 'What is PESA? State its purpose in two points.',
  model: 'The **Panchayats (Extension to Scheduled Areas) Act 1996** is called PESA. It **extends the panchayat provisions** of the 73rd Amendment to the **Fifth Schedule (tribal) areas**, with **adaptations** that suit those areas and the communities living there.',
  sol: 'The Act, its extension to Scheduled Areas, and the adaptations.',
  scheme: [['Act of 1996 extending the panchayat provisions to Fifth Schedule areas', 1], ['With adaptations suited to tribal areas', 1]],
}));
Q('s2_nagar', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Distinguish a municipal council from a municipal corporation.',
  model: 'A **municipal council** is the urban local body for a **smaller urban area**, while a **municipal corporation** serves a **larger urban area**, such as a big city. Both are elected bodies, and a nagar panchayat is the third form, for an area in transition.',
  sol: 'The size of the area served.',
  scheme: [['Municipal council: a smaller urban area', 1], ['Municipal corporation: a larger urban area', 1]],
}));
Q('s2_ward', short({
  t: 1, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'Residents of ward 7 in the imagined city of Ratnavali say that decisions are taken far from them. Which arrangement of the 74th Amendment can help, and how?',
  model: '**Ward committees**, provided in larger municipalities, bring decision-making **closer to the residents** of a ward. Residents can place needs such as sanitation, lighting and water supply before the committee, which can then take them up with the municipality.',
  sol: 'Ward committees and how they help.',
  scheme: [['Ward committees in larger municipalities', 1], ['They bring decisions closer to residents and take up their needs', 1]],
}));
Q('s2_threeF', short({
  t: 2, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'Madhupur gram panchayat is allowed to run the primary school, but the teachers are posted by a state department and the funds come only on state orders. Which three Fs does the example point to?',
  model: 'The example points to **functions**, **funds** and **functionaries**. The function is listed for the panchayat, but the **staff** and the **money** stay with the state, so the transfer to the local body is **limited** in practice.',
  sol: 'The three Fs and the limited transfer.',
  scheme: [['Functions, funds and functionaries named', 1], ['Applied to the example: staff and money stay with the state', 1]],
}));
Q('s2_proxy', short({
  t: 2, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: 'What is meant by proxy representation in local bodies? Do all elected women act through proxies?',
  model: '**Proxy representation** means that a relative acts in the place of an elected woman representative, attending meetings or deciding for her. It is reported from **some places** only. **Many elected women** act on their own and have gained experience and confidence through reservation.',
  sol: 'The meaning, and the point that it is not general.',
  scheme: [['Meaning: a relative acting in place of the elected woman', 1], ['It occurs in some places; many elected women act independently', 1]],
}));

// ---------------------------------------------------------------- short answers (3 marks)
Q('s3_growth', short({
  t: 1, d: 2, c: 'recall', marks: 3, wl: S3,
  stem: 'State the contribution of the Balwantrai Mehta Committee (1957) and of the L. M. Singhvi Committee (1986) to local government.',
  model: 'The **Balwantrai Mehta Committee** of **1957** recommended a **three-tier system** of rural local government, from village to district. The **L. M. Singhvi Committee** of **1986** recommended giving local self-government bodies **constitutional status**, which led to the **73rd and 74th Amendments** passed in 1992.',
  sol: 'The two committees and what each recommended.',
  scheme: [['Balwantrai Mehta Committee, 1957: three-tier system', 1], ['L. M. Singhvi Committee, 1986: constitutional status', 1], ['Link to the amendments of 1992', 1]],
}));
Q('s3_73', short({
  t: 1, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Describe any three features of the 73rd Amendment.',
  model: '1. **Three tiers:** gram panchayat, panchayat samiti and zila parishad, with the intermediate tier optional in states below 20 lakh people.\n2. **Direct elections** every five years, and within six months of any dissolution.\n3. **Reservation** of at least one-third of seats for women, and of seats for Scheduled Castes and Scheduled Tribes in proportion to population.',
  sol: 'Three features with details.',
  scheme: [['Three tiers', 1], ['Direct elections every five years and within six months of dissolution', 1], ['Reservation for women, Scheduled Castes and Scheduled Tribes', 1]],
}));
Q('s3_74', short({
  t: 1, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: 'State three provisions of the 74th Amendment.',
  model: '1. **Three forms of municipality:** nagar panchayat, municipal council and municipal corporation.\n2. **Reservation** of seats as for panchayats, and the **State Election Commission** and **State Finance Commission** apply to municipalities too.\n3. A list of **18 subjects** in the **Twelfth Schedule**, and **ward committees** for the larger municipalities.',
  sol: 'Three provisions.',
  scheme: [['Three forms of municipality', 1], ['Reservation and the two State Commissions', 1], ['Twelfth Schedule with 18 subjects and ward committees', 1]],
}));
Q('s3_achieve', short({
  t: 2, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Describe three achievements of local governments since 1993.',
  model: '1. **Regular elections** to local bodies are held in most states.\n2. A **very large number of elected representatives**, including many women and members of Scheduled Castes and Scheduled Tribes, has entered public life.\n3. People have a **voice at the grassroots**, for example in gram sabha meetings where they can question plans and spending.',
  sol: 'Three achievements.',
  scheme: [['Regular elections', 1], ['Large number of representatives, including women and SC and ST members', 1], ['A voice for people at the grassroots', 1]],
}));
Q('s3_problems', short({
  t: 2, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'State three problems in the working of local governments.',
  model: '1. States have transferred **subjects, funds and functionaries** only to a **limited** extent.\n2. Local bodies depend on **grants** from the state and the Union, and their **own revenue is low**.\n3. In some places **state officials control** the work of elected bodies, and **proxy representation** is reported for some elected women.',
  sol: 'Three problems.',
  scheme: [['Limited transfer of the three Fs', 1], ['Dependence on grants and low own revenue', 1], ['Control by state officials, or proxy representation', 1]],
}));
Q('s3_compare', short({
  t: 1, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Compare rural and urban local bodies in three points.',
  model: '1. **Constitutional basis:** the 73rd Amendment governs panchayats, and the 74th Amendment governs municipalities.\n2. **Structure:** panchayats have three tiers, while municipalities take three forms by the size of the area.\n3. **Subjects:** the Eleventh Schedule lists 29 subjects for panchayats and the Twelfth Schedule lists 18 for municipalities.',
  sol: 'Amendment, structure and schedule.',
  scheme: [['73rd and 74th Amendments', 1], ['Three tiers against three forms', 1], ['Eleventh Schedule with 29 subjects and Twelfth Schedule with 18', 1]],
}));
Q('s3_views', short({
  t: 2, d: 4, c: 'evaluation', marks: 3, wl: S3,
  stem: 'Present two views on whether local governments have deepened democracy, and give one reason for each.',
  model: 'Some argue that local governments have **deepened democracy**, because regular elections and reservation have brought many people, including women and weaker groups, into public life. Others argue that their **powers remain limited**, because states transfer few funds and staff, and grants make them dependent. A student can weigh both with examples.',
  sol: 'Two views, each with a reason.',
  scheme: [['View that local bodies have deepened democracy, with a reason', 1], ['View that their powers remain limited, with a reason', 1], ['Reasons tied to evidence', 1]],
}));

// ================================================================ long answers (5 marks)
Q('l_growth', long({
  t: 1, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Trace the growth of local government in India from the 1880s to the 1992 Amendments.',
  model: '1. The resolution of **1882**, linked with Lord Ripon, encouraged local self-government bodies.\n2. The **Government of India Act 1919** led to village panchayats in some provinces; **Gandhi\'s gram swaraj** stressed self-governing villages.\n3. **Article 40**, a Directive Principle, asks the State to organise village panchayats.\n4. The **Community Development Programme (1952)** and the **Balwantrai Mehta Committee (1957)**, which recommended a three-tier system.\n5. The **L. M. Singhvi Committee (1986)** recommended constitutional status, leading to the **73rd and 74th Amendments** (1992).',
  sol: 'A dated sequence from the resolution to the amendments.',
  scheme: [['1882 resolution', 1], ['1919 Act and gram swaraj', 1], ['Article 40', 1], ['1952 programme and 1957 committee', 1], ['1986 committee and the amendments of 1992', 1]],
}));
Q('l_73', long({
  t: 1, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Explain the main features of the 73rd Amendment.',
  model: '1. **Three tiers:** gram panchayat, panchayat samiti and zila parishad; states below 20 lakh people need not have the intermediate tier. The **gram sabha** is all adult voters of the village.\n2. **Direct elections** every five years, and within six months if a body is dissolved.\n3. **Reservation:** seats and chairpersons\' posts for Scheduled Castes and Scheduled Tribes in proportion to population, at least one-third for women, and backward classes left to the states.\n4. A **State Election Commission** and a **State Finance Commission**.\n5. The **Eleventh Schedule** lists 29 subjects; **PESA (1996)** extends the provisions to tribal areas.',
  sol: 'Tiers and the gram sabha, elections, reservation, two commissions, the schedule and PESA.',
  scheme: [['Three tiers and the gram sabha', 1], ['Direct elections and the six-month rule', 1], ['Reservation', 1], ['State Election Commission and State Finance Commission', 1], ['Eleventh Schedule and PESA', 1]],
}));
Q('l_74', long({
  t: 1, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Explain the main provisions of the 74th Amendment on urban local government.',
  model: '1. The 74th Amendment came into force on **1 June 1993** and gives constitutional status to **municipalities**.\n2. Three forms: **nagar panchayat** (area in transition), **municipal council** (smaller urban area) and **municipal corporation** (larger urban area).\n3. **Reservation** of seats for women, Scheduled Castes and Scheduled Tribes as for panchayats, with regular elections.\n4. The **State Election Commission** and **State Finance Commission** apply too.\n5. The **Twelfth Schedule** has **18 subjects** that municipalities may be given, and larger municipalities have **ward committees**.',
  sol: 'Date, forms, reservation, commissions, schedule and ward committees.',
  scheme: [['Constitutional status for municipalities from 1 June 1993', 1], ['Three forms of municipality', 1], ['Reservation and regular elections', 1], ['State Election Commission and State Finance Commission', 1], ['Twelfth Schedule and ward committees', 1]],
}));
Q('l_achieve', long({
  t: 2, d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: 'Examine the main achievements of local governments since the 73rd and 74th Amendments.',
  model: '1. **Regular elections** are held to panchayats and municipalities, so elected bodies are in place in most states.\n2. A **very large number of representatives** has been elected from villages and wards.\n3. **Reservation** has brought in many **women** and members of **Scheduled Castes and Scheduled Tribes**, who were rarely seen in public office before.\n4. People have a **voice at the grassroots**, for example at gram sabha meetings, where spending can be questioned.\n5. Local bodies have begun to take up local needs such as water, lanes and schools, which shows participation in practice.',
  sol: 'Elections, number of representatives, reservation, voice, local needs.',
  scheme: [['Regular elections', 1], ['A large number of representatives', 1], ['Women and SC and ST members entering office', 1], ['Voice at the grassroots, with an example', 1], ['Local needs taken up', 1]],
}));
Q('l_problems', long({
  t: 2, d: 4, c: 'analysis', marks: 5, wl: L5,
  stem: 'Discuss the problems that local governments face in working effectively.',
  model: '1. **Limited transfer** of subjects, funds and functionaries by the states, so local bodies have **duties without enough means**.\n2. **Dependence on grants** from the state and the Union, which leaves them less free to decide.\n3. **Low own revenue** from taxes, fees and rents.\n4. **Control by state officials**, since approvals and orders from higher levels can limit what an elected body may do.\n5. **Proxy representation** in some places, where a relative acts for an elected woman, which weakens the purpose of reservation.',
  sol: 'The three Fs, grants, own revenue, official control and proxy representation.',
  scheme: [['Limited transfer of the three Fs', 1], ['Dependence on grants', 1], ['Low own revenue', 1], ['Control by state officials', 1], ['Proxy representation in some places', 1]],
}));
Q('l_assess', long({
  t: 2, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: 'Some people say local governments have deepened democracy; others say their powers remain limited. Evaluate the two views.',
  model: '1. **First view:** regular elections, reservation and gram sabha meetings have brought **many people into public life** and given a voice at the grassroots.\n2. **Evidence:** many women and members of Scheduled Castes and Scheduled Tribes now hold office.\n3. **Second view:** states have transferred **few funds, subjects and staff**, and bodies depend on **grants**.\n4. **Evidence:** low own revenue and control by state officials.\n5. **Conclusion:** both have a point; participation has grown, but real powers vary by state, so deepening of democracy depends on further transfer of the three Fs.',
  sol: 'Both views with evidence and a reasoned conclusion.',
  scheme: [['First view stated', 1], ['Evidence for it', 1], ['Second view stated', 1], ['Evidence for it', 1], ['A reasoned conclusion weighing both', 1]],
}));

// ================================================================ case-based (4 marks: 1 + 1 + 2)
Q('c_sabha', caseQ({
  t: 1, d: 4, c: 'application', origin: 'soyl-original',
  stem: 'Read the minutes and answer the questions that follow. *(An imagined record written by SOYL for practice; the village, the people and the meeting are not real.)*',
  passage: '**Imagined minutes of the gram sabha of Neelgaon, Varunadesh, 14 August**\n\nAbout 300 adult voters of the village attended. The sarpanch read out the income and spending of the gram panchayat. Villager Mohan Lal asked why 2 lakh rupees were spent on the school roof when the drinking water tank was cracked. The sarpanch replied that the roof money came as a state grant fixed for school repairs. The gram sabha then resolved to ask the block office for a grant for the water tank and to request more powers over school funds.',
  parts: [
    child('a', short({ t: 1, d: 2, c: 'recall', marks: 1, stem: 'Who are the members of a gram sabha?', model: 'All the **adult voters of the village**.', sol: 'The assembly of all adult voters.', scheme: [['All adult voters of the village', 1]] })),
    child('b', short({ t: 2, d: 3, c: 'application', marks: 1, stem: 'The school roof money was fixed by the state. Which problem of local government does this illustrate?', model: '**Dependence on grants** (limited freedom over funds).', sol: 'The grant was fixed for a purpose by the state.', scheme: [['Dependence on grants or limited control over funds', 1]] })),
    child('c', short({ t: 2, d: 4, c: 'analysis', marks: 2, stem: '**Either** (i): How does the meeting show that local government gives people a voice at the grassroots?', model: 'Villagers could **question the spending** in an open meeting, the sarpanch had to **answer**, and the gram sabha **passed resolutions** on the water tank and school funds. This shows **participation and accountability**.', sol: 'Questions, answers and resolutions.', scheme: [['Villagers questioned spending and the sarpanch answered', 1], ['The gram sabha passed resolutions, showing participation', 1]] }), [
      short({ t: 2, d: 4, c: 'evaluation', marks: 2, stem: '**Or** (ii): The gram sabha asks for more powers over school funds. Which of the three Fs does the request relate to, and why does it matter?', model: 'It relates to **funds**, and also to **functions**. Control over school funds lets the panchayat **spend according to local needs**, such as repairing a water tank, and not only on purposes **fixed by the state**.', sol: 'Funds and functions, and local priorities.', scheme: [['Funds (and functions)', 1], ['Spending can match local needs and not only purposes fixed by the state', 1]] }),
    ]),
  ],
}));
Q('c_budget', caseQ({
  t: 2, d: 4, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the budget statement and answer the questions that follow. *(An imagined statement written by SOYL for practice; the panchayat and the figures are not real.)*',
  passage: '**Imagined income statement of Madhupur gram panchayat for one year (in lakh rupees)**\n\n- Grant from the Union government: 16\n- Grant from the state government: 18\n- Own taxes and fees (house tax, market fee): 4\n- Rent from market stalls and other income: 2\n- Total income: 40',
  parts: [
    child('a', short({ t: 2, d: 2, c: 'recall', marks: 1, stem: 'What is the total of the grants from the Union and the state, in lakh rupees?', model: '**34 lakh rupees** (16 plus 18).', sol: 'Add the two grants.', scheme: [['34', 1]] })),
    child('b', short({ t: 2, d: 3, c: 'application', marks: 1, stem: 'What percentage of the total income is own revenue (taxes, fees and rent)?', model: '**15 percent** (6 of 40).', sol: 'Own revenue is 4 plus 2, which is 6.', scheme: [['15 percent', 1]] })),
    child('c', short({ t: 2, d: 4, c: 'analysis', marks: 2, stem: '**Either** (i): What does the statement show about the financial position of the panchayat? Give one reason why it matters.', model: 'The panchayat **depends heavily on grants**, which are **85 percent** of its income, and its **own revenue is low**. This matters because spending then follows the **purposes and timing set by the Union and the state**, which limits local choice.', sol: 'Heavy dependence and its effect.', scheme: [['Heavy dependence on grants and low own revenue', 1], ['A consequence: limited local choice', 1]] }), [
      short({ t: 2, d: 4, c: 'evaluation', marks: 2, stem: '**Or** (ii): Suggest one way the panchayat could raise its own revenue and one point of caution.', model: 'It could improve the **collection of house tax and market fees** or let out more stalls on rent. Caution: the rates must be **fair to poor families** and approved by the gram sabha, so that the burden does not fall unevenly.', sol: 'A step to raise own revenue, and a caution.', scheme: [['A step: better collection of taxes and fees, or more rents', 1], ['A caution: fairness and the approval of the gram sabha', 1]] }),
    ]),
  ],
}));
Q('c_ward', caseQ({
  t: 1, d: 4, c: 'application', origin: 'soyl-original',
  stem: 'Read the note and answer the questions that follow. *(An imagined note written by SOYL for practice; the city, the ward and the people are not real.)*',
  passage: '**Imagined note from the ward committee of Ward 7, Ratnavali municipal corporation**\n\nThe committee met with residents of Lakshmanpur colony. Residents reported broken street lights on three lanes, irregular water supply and uncollected garbage near the market. The committee recorded the complaints and forwarded them to the municipal corporation with a request for repairs within one month. A member asked that the next meeting should discuss a small park for children.',
  parts: [
    child('a', short({ t: 1, d: 2, c: 'recall', marks: 1, stem: 'Which Amendment provides for ward committees in larger municipalities?', model: 'The **74th Amendment**.', sol: 'The urban local government Amendment.', scheme: [['74th Amendment', 1]] })),
    child('b', short({ t: 1, d: 3, c: 'application', marks: 1, stem: 'Name the form of municipality to which Ratnavali belongs.', model: 'A **municipal corporation**.', sol: 'A larger urban area has a municipal corporation.', scheme: [['Municipal corporation', 1]] })),
    child('c', short({ t: 1, d: 4, c: 'analysis', marks: 2, stem: '**Either** (i): Which subjects in the Twelfth Schedule are touched by the complaints? Name two.', model: 'Two subjects are **water supply** and **public health and sanitation, including garbage removal**. Street lighting and public amenities are also among the subjects for municipalities.', sol: 'Two Twelfth Schedule subjects.', scheme: [['Water supply', 1], ['Sanitation and garbage removal, or street lighting', 1]] }), [
      short({ t: 1, d: 4, c: 'analysis', marks: 2, stem: '**Or** (ii): How does the ward committee make local government more responsive to residents?', model: 'It gives residents of the ward a **forum close to them**, where they can **state their problems** and have them recorded. The committee then **forwards the requests** to the municipal corporation, so decisions are not far from the people.', sol: 'A nearby forum and forwarding of requests.', scheme: [['A forum close to residents where problems are stated', 1], ['Requests forwarded to the corporation', 1]] }),
    ]),
  ],
}));
Q('c_letter', caseQ({
  t: 2, d: 4, c: 'evaluation', origin: 'soyl-original',
  stem: 'Read the letter and answer the questions that follow. *(An imagined letter written by SOYL for practice; the writer, the village and the people are not real.)*',
  passage: '**Imagined letter from Savitri Devi, a member of Ketkipur gram panchayat, to a magazine**\n\nWhen I was elected from a seat reserved for women, I thought I would only sign papers. Now I attend every meeting myself. But our panchayat has no clerk of its own; the staff belong to the block office. I also know of other places where a relative of the elected woman attends in her place. I believe that reservation has opened the door, but the three Fs must follow for the work to be meaningful.',
  parts: [
    child('a', short({ t: 1, d: 2, c: 'recall', marks: 1, stem: 'What is the least share of seats reserved for women in panchayats under the 73rd Amendment?', model: 'At least **one-third**.', sol: 'One-third of the seats.', scheme: [['One-third', 1]] })),
    child('b', short({ t: 2, d: 3, c: 'application', marks: 1, stem: 'Name the concern mentioned when a relative attends in place of the elected woman.', model: '**Proxy representation**.', sol: 'A relative acts in place of the elected woman.', scheme: [['Proxy representation', 1]] })),
    child('c', short({ t: 2, d: 4, c: 'evaluation', marks: 2, stem: '**Either** (i): What does the writer mean by saying that the three Fs must follow?', model: 'She means that **functions, funds and functionaries** must be transferred to the panchayat. Without its own **staff and money**, even an elected member who attends every meeting may find it hard to carry out decisions.', sol: 'The three Fs and the problem of carrying out decisions.', scheme: [['Functions, funds and functionaries must be transferred', 1], ['Without staff and money decisions are hard to carry out', 1]] }), [
      short({ t: 2, d: 4, c: 'evaluation', marks: 2, stem: '**Or** (ii): What two points about reservation of seats for women does the letter bring out?', model: 'The letter shows that reservation has **opened the door** and that an elected woman can act **independently**, as the writer does. It also notes that in some places a **relative acts in her place**, so reservation alone may not be enough.', sol: 'The benefit and the limit.', scheme: [['Reservation has opened the door, and women can act independently', 1], ['In some places a relative acts in her place, so more is needed', 1]] }),
    ]),
  ],
}));
Q('c_debate', caseQ({
  t: 2, d: 4, c: 'evaluation', origin: 'soyl-original',
  stem: 'Read the debate and answer the questions that follow. *(An imagined debate written by SOYL for practice; the school and the students are not real.)*',
  passage: '**Imagined debate in Class 11 at Lakeview School: Local governments have deepened democracy**\n\nFor the motion, Anjali said that elections to village and city bodies are now held regularly and that gram sabhas let ordinary villagers question spending. Against the motion, Rohit said that bodies depend on grants, own little revenue, and cannot decide matters without state officials. The moderator asked each side to give an example.',
  parts: [
    child('a', short({ t: 2, d: 2, c: 'recall', marks: 1, stem: 'Who argued that regular elections and gram sabhas deepen democracy?', model: '**Anjali**.', sol: 'The speaker for the motion.', scheme: [['Anjali', 1]] })),
    child('b', short({ t: 2, d: 3, c: 'application', marks: 1, stem: 'Name one problem of local government that Rohit mentions.', model: '**Dependence on grants** (or low own revenue, or control by state officials).', sol: 'Any one of the three.', scheme: [['One problem named', 1]] })),
    child('c', short({ t: 2, d: 4, c: 'evaluation', marks: 2, stem: '**Either** (i): Give one example Anjali could use to support her argument.', model: 'She could cite a **gram sabha meeting** in which villagers question the accounts, or the **reservation** that has brought many **women** into elected office. Both show **participation** at the grassroots.', sol: 'An example of participation.', scheme: [['A suitable example', 1], ['Link to participation or deepening of democracy', 1]] }), [
      short({ t: 2, d: 4, c: 'evaluation', marks: 2, stem: '**Or** (ii): Give one example Rohit could use to support his argument.', model: 'He could cite a panchayat that earns only a small share of its income itself and so depends on **grants fixed by the state**, or one that needs the **approval of an official** before a decision can be carried out.', sol: 'An example of limited powers.', scheme: [['A suitable example', 1], ['Link to limited powers or dependence', 1]] }),
    ]),
  ],
}));
