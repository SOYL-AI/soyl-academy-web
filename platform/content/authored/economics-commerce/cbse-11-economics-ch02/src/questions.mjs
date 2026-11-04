// CBSE 11 Economics, ch02 Collection of Data: question bank. Every survey, shop, school and passage is imagined and
// written for this chapter. Real-world facts are limited to stable ones (what the Census of India and the NSSO are, who
// runs them, how often, first synchronous census 1881, NSSO set up 1950, the 2019 merger as of 2024). No survey results
// or population counts are stated. Every figure below is computed with stats.mjs and pinned with check().
import { Q, mcq, ar, tf, fb, match, ord, num, short, long, caseQ, child } from '../../cbse-11-economics-ch01/src/lib.mjs';
import { mean, sum, rnd, check } from '../../cbse-11-economics-ch01/src/stats.mjs';

const S2 = [30, 50];
const S3 = [50, 80];
const L5 = [80, 120];

// ---------------------------------------------------------------- imagined survey figures (computed)
// Kelvapur has 50 milk shops, numbered 1 to 50; daily milk sold (litres) is known for every shop from a register.
export const POP = Array.from({ length: 50 }, (_, i) => 100 + ((i * 37 + 11) % 41));
export const IDS10 = [4, 11, 17, 23, 28, 33, 38, 42, 45, 49]; // drawn with a random number table
export const IDS20 = [1, 3, 4, 6, 9, 10, 13, 15, 17, 18, 20, 24, 26, 29, 32, 35, 37, 41, 44, 50];
export const S10 = IDS10.map((i) => POP[i - 1]);
export const S20 = IDS20.map((i) => POP[i - 1]);
export const popMean = mean(POP);
export const mean10 = mean(S10);
export const mean20 = mean(S20);
export const err10 = mean10 - popMean;
export const err20 = mean20 - popMean;
check(popMean, 120.42, 2, 'population mean of the 50 shops');
check(sum(S10), 1220, 0, 'sum of the 10 sampled shops');
check(mean10, 122, 2, 'mean of the sample of 10');
check(err10, 1.58, 2, 'sampling error of the sample of 10');
check(mean20, 120.45, 2, 'mean of the sample of 20');
check(err20, 0.03, 2, 'sampling error of the sample of 20');
if (Math.abs(err20) >= Math.abs(err10)) throw new Error('the larger sample must have the smaller error');
export const f2 = (x) => rnd(x, 2).toFixed(2);
export const frac10 = (10 / 50) * 100;
check(frac10, 20, 0, 'sampling fraction 10 of 50');
// Mailed questionnaire: 45 forms sent, 36 returned.
export const MAIL = { sent: 45, back: 36 };
export const mailRate = (MAIL.back / MAIL.sent) * 100;
export const mailLost = MAIL.sent - MAIL.back;
check(mailRate, 80, 0, 'response rate');
check(mailLost, 9, 0, 'forms not returned');
// Quota sampling: Hillview School, 600 students (240 girls, 360 boys), sample of 50 in proportion.
export const HV = { girls: 240, boys: 360, n: 50 };
export const hvTotal = HV.girls + HV.boys;
export const quotaGirls = (HV.n * HV.girls) / hvTotal;
export const quotaBoys = (HV.n * HV.boys) / hvTotal;
check(hvTotal, 600, 0, 'Hillview students');
check(quotaGirls, 20, 0, 'girls quota');
check(quotaBoys, 30, 0, 'boys quota');
// Interview survey: 12 vendors of the Sundarwadi lane; 7 replied.
export const SW = { asked: 12, replied: 7 };
export const swRate = (SW.replied / SW.asked) * 100;

// ================================================================ t01 Primary and secondary data; methods of collection
Q('m_primary_def', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Data that an investigator collects first-hand, for the specific enquiry she has in mind, are called',
  opts: ['primary data', 'secondary data', 'published data', 'grouped data'],
  sol: `Data gathered directly by the investigator for her own purpose are primary data. Secondary data come from someone else's collection, and published data are one kind of secondary data. Grouped data describe how data are arranged, not who collected them.`,
}));
Q('m_secondary_eg', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'A student studying milk prices in the imagined town of Kelvapur copies monthly price figures from a report issued by a dairy board instead of visiting vendors herself. Her data are',
  opts: ['secondary data', 'primary data', 'sample data', 'census data'],
  sol: `The dairy board gathered the figures for its own reasons and the student only uses them, so they are secondary data. She did not collect them first-hand, so they are not primary. Whether data are sample or census data depends on how many units were covered, which the question does not say.`,
}));
Q('m_primary_case', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Mrs Iyer hands out her own questionnaire on daily screen time to every student of one Class 11 section of an imagined school and tabulates the replies. For her enquiry the replies are',
  opts: ['primary data', 'secondary data', 'a published source', 'an official record'],
  sol: `She designed the questions, collected the replies herself and will use them for her own enquiry, so they are primary data. They become secondary data only for someone else who later borrows her table.`,
}));
Q('m_cost', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Compared with primary data collected afresh, secondary data are usually',
  opts: ['cheaper and quicker to obtain, but they may not suit the exact purpose', 'costlier and slower, but fully suited to the purpose', 'more original, because they are collected by the user', 'free of any need for checking'],
  sol: `Existing data save the time and money of a field survey, but they were collected for another purpose, with other definitions and units, so suitability and reliability must be checked. The other options describe features of primary data or wrongly say that no checking is needed.`,
}));
Q('m_reliab', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'Before using a table of vendor incomes found in an old report, an investigator in Kelvapur should first ask',
  opts: ['who collected it, for what purpose, by what method and when', 'how many pages the report has', 'whether the table is printed in colour', 'whether the vendors still sell milk at the same lane'],
  sol: `Reliability and suitability of secondary data depend on the collector, the purpose, the method and the date. Length and printing have no bearing on quality, and the present location of vendors does not tell us whether the table was gathered carefully.`,
}));
Q('m_interview', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'A main advantage of the personal interview method of collecting primary data is that',
  opts: ['the interviewer can explain a question that the respondent finds unclear', 'it is the cheapest method of covering a wide area', 'it is free of any influence of the interviewer', 'it needs no trained field staff'],
  sol: `Face to face, the interviewer can clarify doubts and usually gets a good response. The method is costly and slow over a wide area, the interviewer may influence answers, and trained staff are needed, so the other options are false.`,
}));
Q('m_mailing', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Which pair correctly describes a mailed questionnaire survey?',
  opts: ['Low cost and wide coverage, but low response and no chance to clarify', 'High response and clarification possible, but costly', 'Very quick, but limited to people with telephones', 'Accurate for illiterate respondents because the form is read aloud'],
  sol: `Forms sent by post or e-mail reach many people cheaply, but many are not returned, and nobody is present to explain an unclear question. The second pair describes the personal interview and the third the telephone interview; a mailed form needs the respondent to read and write.`,
}));
Q('m_telephone', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Which of these is a limitation of a telephone interview?',
  opts: ['It can cover only those who have telephones, and the call cannot be long', 'The interviewer must travel to every respondent', 'It always gets a lower response than a mailed form', 'It cannot be completed in a short time'],
  sol: `Only persons with a phone can be reached and respondents will not stay on a long call. Telephone interviews need no travel, are usually quick, and often get better response than mailed forms, so the other options are wrong.`,
}));
Q('m_leading', mcq({
  t: 1, d: 3, c: 'application',
  stem: `Which question for the imagined Greenfield school canteen survey is a leading question that a good questionnaire should avoid?`,
  opts: [`Don't you agree that the new samosas are far tastier than the old ones?`, 'How many times a week do you buy lunch from the canteen?', 'Which snack do you buy most often?', 'Is the canteen open at a convenient time for you?'],
  sol: `The first question pushes the respondent towards one answer by suggesting what she should think. The other three ask for a fact or an opinion without suggesting the reply.`,
}));
Q('m_closed', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'A questionnaire for the vendors of Kelvapur asks: Do you sell curd along with milk? (Yes / No). This is',
  opts: ['a closed-ended question of the two-way type', 'an open-ended question', 'a leading question', 'a question with a double negative'],
  sol: `The respondent chooses from fixed answers, here two, so it is a closed-ended two-way question. An open-ended question lets the respondent reply in her own words. Nothing in the wording suggests the answer or uses a double negative.`,
}));
Q('m_pilot', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'The main purpose of a pilot survey is to',
  opts: ['test the questionnaire on a few respondents and estimate the time and cost of the main survey', 'replace the main survey when funds are short', 'check the arithmetic of the final report', 'select the sample by lottery'],
  sol: `A pilot is a small trial run before the real survey, so faults in the questions and in the plan show up early. It does not replace the main survey, it is done before any report exists, and it is not a method of selecting units.`,
}));
Q('m_census_suit', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'The imagined Madhupur Tea Growers Cooperative has 25 members and wants each member\'s view on a proposed change in its rules. The better method is',
  opts: ['a census, because the population is small and every view matters', 'a sample, because a census always costs more than the benefit', 'a sample, because small groups cannot be fully studied', 'neither, because the group is too small to survey'],
  sol: `With only 25 members, studying all of them is cheap and quick, and the decision needs every member's opinion. A sample would add sampling error without saving much. Small groups can certainly be surveyed in full.`,
}));
Q('m_sample_choice', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'An imagined lamp company wants to find how long its bulbs burn before failing. Testing every bulb would destroy the whole stock. The company should use',
  opts: ['a sample survey, because testing destroys the units tested', 'a census, because accuracy is the only concern', 'secondary data only, since bulbs cannot be tested', 'no method, since burning life cannot be measured'],
  sol: `When studying a unit uses it up, only a part of the population can be tested, so a sample is the sensible choice. A census would leave nothing to sell.`,
}));
Q('m_universe', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'The register of all 50 milk shops of Kelvapur is used for a survey of shop sales. In the vocabulary of sampling, these 50 shops are',
  opts: ['the population (universe)', 'a sample', 'a variable', 'an error'],
  sol: `The population is the whole group of units about which information is wanted, here the 50 shops. A sample would be some of them. A variable is a characteristic such as litres sold.`,
}));
Q('m_random', mcq({
  t: 1, d: 3, c: 'understanding',
  stem: 'In random (probability) sampling,',
  opts: ['every unit of the population has an equal chance of being selected', 'the investigator picks the units she thinks typical', 'the first people met are interviewed', 'fixed numbers of respondents are chosen from each category by interviewers'],
  sol: `Random selection gives each unit the same chance and leaves out personal choice. The other options describe judgement, convenience and quota sampling, which are non-random.`,
}));
Q('m_conv', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'A surveyor interviews the first thirty people who pass the bus stand of the imagined town of Neelgiri because they are easy to reach. This is',
  opts: ['convenience sampling', 'lottery sampling', 'random number table sampling', 'quota sampling'],
  sol: `Choosing whoever is easiest to reach is convenience sampling. Lottery and random number tables give equal chances to all units, and quota sampling fixes numbers for categories of respondents.`,
}));
Q('m_quota', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'Interviewers of an imagined market survey are told to meet exactly 20 women and 30 men, choosing any willing persons they find. The method is',
  opts: ['quota sampling', 'simple random sampling', 'census', 'pilot survey'],
  sol: `Fixed numbers for each category, filled by the interviewers' own choice, make quota sampling, a non-random method. Random sampling would leave the choice to a chance device, and a census covers everyone.`,
}));
Q('m_samperr_def', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'Sampling error is the',
  opts: ['difference between a sample estimate and the true population value', 'mistake made in adding the figures', 'refusal of some respondents to answer', 'mistake in recording an answer wrongly'],
  sol: `Because a sample covers only some units, its estimate usually differs a little from the value for the whole population; that gap is the sampling error. Adding mistakes, refusals and recording mistakes are non-sampling errors.`,
}));
Q('m_samperr_size', mcq({
  t: 1, d: 3, c: 'understanding',
  stem: 'If the sample drawn at random from a population is made larger, sampling error',
  opts: ['tends to fall', 'tends to rise', 'is always exactly zero', 'is unrelated to sample size'],
  sol: `A larger sample covers more of the population and is likely to resemble it more closely, so the error tends to fall. It becomes zero only when the whole population is studied, and it is not guaranteed in any single draw.`,
}));
Q('m_nonsamp', mcq({
  t: 1, d: 3, c: 'understanding',
  stem: 'In a survey of Kelvapur milk shops, several shopkeepers did not answer. This is an example of',
  opts: ['a non-sampling error arising from non-response', 'a sampling error arising from sample size', 'an error that a census cannot have', 'a computing error in averages'],
  sol: `Non-response is a non-sampling error: it comes from what happens during data collection, not from studying only part of the population. It can occur in a census too. It is not an arithmetic mistake.`,
}));

// ---- assertion-reason
Q('ar_census_sample', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'A census of a very large population is often not practical.',
  r: 'A census requires every unit to be studied, which needs much time, money and staff.',
  sol: 'Both statements are true, and the cost in time, money and staff of studying every single unit is exactly why a census of a huge population is seldom practical.',
}));
Q('ar_random_equal', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'both-true-not-explains',
  a: `Random sampling keeps the investigator's personal choice out of the selection of units.`,
  r: 'Judgement sampling lets the investigator choose the units she considers typical.',
  sol: 'Both statements are true. But R describes another method, a non-random one, and does not explain why chance selection removes personal choice; the explanation lies in equal chances for every unit.',
}));
Q('ar_sec_cheap', ar({
  t: 1, d: 3, c: 'evaluation', verdict: 'A-false-R-true',
  a: 'Secondary data are always more reliable than primary data.',
  r: 'Secondary data usually cost less and take less time to obtain than primary data.',
  sol: 'A is false: reliability depends on the collector, the method and the purpose, and some secondary data are weak. R is true as a general statement about cost and time.',
}));
Q('ar_mailing', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'A-true-R-false',
  a: 'A mailed questionnaire can reach many respondents at a low cost.',
  r: 'In a mailed questionnaire the investigator can clarify every doubt of the respondent on the spot.',
  sol: 'A is true: forms travel cheaply to scattered respondents. R is false: nobody is present when a form is filled, so doubts cannot be cleared, which is one of the weaknesses of the method.',
}));
Q('ar_error_size', ar({
  t: 1, d: 4, c: 'analysis', verdict: 'both-true-explains',
  a: 'Enlarging a randomly drawn sample tends to lower the sampling error.',
  r: 'As the sample moves closer to the whole population, its estimate tends to move closer to the population value.',
  sol: 'Both are true and R explains A: a bigger share of the units makes the sample more like the population, so the gap between estimate and truth tends to shrink.',
}));
Q('ar_nsso', ar({
  t: 2, d: 3, c: 'analysis', verdict: 'both-true-not-explains',
  a: 'The NSSO collects its data from sample surveys, not by counting the whole country.',
  r: 'The NSSO conducts surveys in rounds on subjects such as household consumption expenditure and employment.',
  sol: 'Both are true. The subjects and the round system describe what the NSSO surveys, not why it uses samples; the reason is that a full count of every household for every subject would be too costly and slow.',
}));

// ---- true-false, fill-blank, match, ordering
Q('tf_interview', tf({
  t: 1, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? A personal interview often gets a high response and lets the interviewer clear doubts, but it can be costly and the interviewer may sway the replies.',
  sol: 'Both the strengths and the weaknesses stated are the standard ones for this method.',
}));
Q('tf_census_cost', tf({
  t: 1, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? For the same large population, a census usually costs less and takes less time than a sample survey.',
  sol: 'A census studies every unit, so for a large population it usually needs more money and time than a sample survey.',
}));
Q('tf_census_agency', tf({
  t: 2, d: 2, c: 'recall', ans: false,
  stem: 'True or false? The Census of India is conducted by the National Sample Survey Organisation.',
  sol: 'The Census of India is conducted by the Office of the Registrar General and Census Commissioner, India; the NSSO carries out sample surveys.',
}));
Q('tf_equal', tf({
  t: 1, d: 2, c: 'recall', ans: true,
  stem: 'True or false? In simple random sampling each unit of the population has the same chance of being chosen.',
  sol: 'That equal chance is the defining feature of random selection.',
}));
Q('fb_pilot', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'A small trial run of a survey, used to test the questionnaire before the main survey, is called a ___ survey.',
  acc: [['pilot']],
  sol: 'The trial run is a pilot survey.',
}));
Q('fb_population', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'The complete group of units that an enquiry wants to know about is called the statistical ___.',
  acc: [['population', 'universe']],
  sol: 'It is the population, also called the universe.',
}));
Q('fb_quota', fb({
  t: 1, d: 2, c: 'recall',
  stem: 'Judgement sampling, convenience sampling and ___ sampling are the three non-random methods named in this chapter.',
  acc: [['quota']],
  sol: 'The third non-random method is quota sampling.',
}));
Q('mt_methods', match({
  t: 1, d: 3, c: 'application',
  stem: 'Match each imagined survey situation with the method of collecting primary data it describes.',
  pairs: [
    ['Surveyors visit each stall in the Sundarwadi market and ask the questions face to face', 'Personal interview'],
    ['Forms are posted to 300 farmers spread over many villages, to be returned by post', 'Mailed questionnaire'],
    ['An enquirer rings 40 office workers to ask three quick questions on commuting', 'Telephone interview'],
  ],
  sol: 'Face-to-face questions are a personal interview; forms sent out and returned are a mailed questionnaire; a quick set of questions over the phone is a telephone interview.',
}));
Q('mt_agencies', match({
  t: 2, d: 2, c: 'recall',
  stem: 'Match each source of secondary data with its description.',
  pairs: [
    ['Census of India', 'Count of the whole population every ten years'],
    ['National Sample Survey Organisation', 'Nationwide sample surveys carried out in rounds'],
    ['Economic Survey', 'Yearly review of the economy brought out by the Ministry of Finance'],
    ['Labour Bureau', 'Reports on labour matters such as wages and employment'],
  ],
  sol: 'The Census counts everyone at ten-year intervals, the NSSO samples households in rounds, the Economic Survey reviews the economy each year, and the Labour Bureau reports on labour conditions.',
}));
Q('ord_survey', ord({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'Arrange these stages of an imagined canteen survey in a sensible order.',
  items: [
    'Decide the purpose of the survey and the population to be studied',
    'Draft the questionnaire',
    'Try the questionnaire in a pilot survey',
    'Revise the questionnaire and run the main survey',
  ],
  sol: 'The purpose and population come first; then the draft; then a small trial; and only after the faults are fixed does the main survey begin.',
}));
Q('ord_lottery', ord({
  t: 1, d: 2, c: 'application', marks: 2,
  stem: 'Arrange the steps of the lottery method for drawing a sample of shops from the register of an imagined town.',
  items: [
    'Give every shop a number and write it on a slip of paper',
    'Fold the slips and mix them well in a box',
    'Draw slips one at a time without looking',
    'Stop when the required sample size has been drawn',
  ],
  sol: 'Slips must exist before they can be mixed, mixing comes before drawing, and drawing stops at the planned sample size.',
}));

// ---- numerical
Q('num_fraction', num({
  t: 1, d: 1, c: 'application', value: frac10, unit: '%',
  stem: 'An imagined researcher draws a sample of 10 shops from the 50 milk shops of Kelvapur. What percentage of the population is covered by the sample?',
  sol: `Step 1: Sample size ÷ population size = 10 ÷ 50 = ${10 / 50}.\nStep 2: As a percentage, ${10 / 50} × 100 = ${frac10} per cent.`,
}));
Q('num_sample_mean', num({
  t: 1, d: 2, c: 'application', value: mean10, unit: 'litres per day', tol: 0.01,
  stem: `A researcher draws 10 of the 50 milk shops of Kelvapur with a random number table. Their daily milk sales (litres, imagined) are ${S10.join(', ')}. Find the mean daily sale of the sample.`,
  sol: `Step 1: Sum of the 10 values = ${sum(S10)}.\nStep 2: Sample mean = ${sum(S10)} ÷ 10 = ${f2(mean10)} litres per day.`,
}));
Q('num_sample_error', num({
  t: 1, d: 3, c: 'application', value: rnd(err10, 2), unit: 'litres per day', tol: 0.01,
  stem: `The register of all 50 milk shops of Kelvapur shows a population mean daily sale of ${f2(popMean)} litres. A sample of 10 shops gives a sample mean of ${f2(mean10)} litres. Find the sampling error, sample mean minus population mean, in litres.`,
  sol: `Step 1: Sampling error = sample mean − population mean.\nStep 2: ${f2(mean10)} − ${f2(popMean)} = ${f2(err10)} litres per day. The sample overstates the true mean by this amount.`,
}));
Q('num_response', num({
  t: 1, d: 2, c: 'application', value: mailRate, unit: '%',
  stem: `The imagined Pratap Dairy Cooperative mails a questionnaire to ${MAIL.sent} member families and receives ${MAIL.back} completed forms back. Find the response rate as a percentage of the forms sent.`,
  sol: `Step 1: Response rate = forms returned ÷ forms sent × 100.\nStep 2: ${MAIL.back} ÷ ${MAIL.sent} × 100 = ${mailRate} per cent. The other ${mailLost} forms are non-response.`,
}));

// ---- short 2-mark
Q('s2_def_data', short({
  t: 1, d: 1, c: 'recall', marks: 2, wl: S2,
  stem: 'Define primary data and secondary data. Give one imagined example of each from a study of the milk trade of Kelvapur.',
  model: `**Primary data** are collected first-hand by the investigator for her own enquiry, such as questions put to Kelvapur vendors about their daily sales. **Secondary data** were collected by someone else and are only used by the investigator, such as sales figures taken from a published dairy board report.`,
  sol: 'A definition and an example for each.',
  scheme: [['Primary data defined with an example', 1], ['Secondary data defined with an example', 1]],
}));
Q('s2_pilot', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'What is a pilot survey? State two things an investigator can learn from running one before surveying the vendors of Sundarwadi.',
  model: `A **pilot survey** is a small trial run of the enquiry on a few respondents before the main survey. It shows whether the **questions are clear** and in a sensible order, and it gives an estimate of the **time and cost** the main survey will need.`,
  sol: 'Meaning, then two uses such as testing questions and estimating time and cost.',
  scheme: [['Meaning of pilot survey', 1], ['Two uses stated', 1]],
}));
Q('s2_closed_open', short({
  t: 1, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'Distinguish a closed-ended question from an open-ended one, using the imagined Greenfield canteen survey for an example of each.',
  model: `A **closed-ended** question offers fixed answers to choose from, for example: Do you buy lunch at the canteen? (Yes / No). An **open-ended** question lets the student reply in her own words, for example: What one change would you like in the canteen menu?`,
  sol: 'Fixed choices versus free reply, each with an example.',
  scheme: [['Closed-ended with example', 1], ['Open-ended with example', 1]],
}));
Q('s2_census_sample', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Explain what is meant by a census and by a sample, taking the 50 milk shops of Kelvapur as the population.',
  model: `In a **census** every one of the 50 shops would be studied. In a **sample** only a representative part of them, say 10 shops, is studied, and the findings are used to say something about all 50.`,
  sol: 'Census means all units; sample means a representative part.',
  scheme: [['Census explained for the 50 shops', 1], ['Sample explained for the 50 shops', 1]],
}));
Q('s2_lottery', short({
  t: 1, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'Describe how the lottery method could be used to select 10 shops out of 50 numbered shops in an imagined market.',
  model: `Write each shop number on an identical slip, fold the slips and **mix them well** in a box. Then **draw 10 slips one by one** without looking. The shops on those slips form the sample, and every shop had the same chance of being drawn.`,
  sol: 'Slips, mixing, drawing the required number, equal chance.',
  scheme: [['Numbering on slips and mixing', 1], ['Drawing 10 slips; equal chance', 1]],
}));
Q('s2_quota', short({
  t: 1, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: 'What is quota sampling? Why is it called a non-random method?',
  model: `In **quota sampling** the investigator is told to include fixed numbers of respondents from each category, such as 20 women and 30 men. It is non-random because the interviewer **chooses the individuals** herself, so units do not all have an equal chance of selection.`,
  sol: 'Fixed numbers per category; non-random because the interviewer chooses.',
  scheme: [['Meaning of quota sampling', 1], ['Reason it is non-random', 1]],
}));
Q('s2_sampling_error', short({
  t: 1, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: 'What is sampling error? How can an investigator reduce it?',
  model: `**Sampling error** is the difference between a sample estimate and the true value for the whole population, arising because only some units are studied. It can be reduced by **drawing a larger random sample**, and it disappears only in a census.`,
  sol: 'Definition and the effect of a larger sample.',
  scheme: [['Definition', 1], ['Larger sample reduces it', 1]],
}));
Q('s2_nonresponse', short({
  t: 1, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: 'Explain non-response as a source of error in a mailed questionnaire survey. Suggest one way to lower it.',
  model: `**Non-response** occurs when chosen respondents do not return the form or do not answer some questions, so the replies may not represent the whole group. It can be lowered by **sending reminders** or by following up with a short call or visit.`,
  sol: 'Meaning, its effect, and one remedy such as reminders.',
  scheme: [['Meaning and effect of non-response', 1], ['One remedy', 1]],
}));
Q('s2_census_india', short({
  t: 2, d: 2, c: 'recall', marks: 2, wl: S2,
  stem: 'Which office conducts the Census of India, how often is it held, and what kinds of data does it collect?',
  model: `The census is conducted by the **Office of the Registrar General and Census Commissioner, India**, once in **ten years**. It collects data on the population, such as its size, age and sex, and social and economic data like literacy, occupation and housing.`,
  sol: 'Agency, interval and kinds of data.',
  scheme: [['Agency and interval', 1], ['Kinds of data collected', 1]],
}));
Q('s2_nsso', short({
  t: 2, d: 2, c: 'recall', marks: 2, wl: S2,
  stem: 'What is the National Sample Survey Organisation? Name two subjects on which it has conducted surveys.',
  model: `The **NSSO**, set up in 1950, conducts nationwide **sample surveys** in rounds. Two subjects on which it has surveyed households are **consumption expenditure** and **employment and unemployment**.`,
  sol: 'Sample survey body set up in 1950, two subjects.',
  scheme: [['What the NSSO is', 1], ['Two subjects', 1]],
}));

// ---- short 3-mark
Q('s3_prim_sec', short({
  t: 1, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Compare primary and secondary data on any three points, with reference to a study of vendors in an imagined town.',
  model: `1. **Originality:** primary data are original, collected by the investigator; secondary data were collected earlier by someone else.\n2. **Cost and time:** primary collection through field visits is costly and slow; secondary data are cheaper and quicker.\n3. **Suitability:** primary data fit the enquiry exactly; secondary data may use other definitions and must be checked for reliability.`,
  sol: 'Any three points of difference, each stated for both kinds of data.',
  scheme: [['First point of comparison', 1], ['Second point of comparison', 1], ['Third point of comparison', 1]],
}));
Q('s3_methods', short({
  t: 1, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Compare the personal interview and the mailed questionnaire on cost, response and clarification of doubts.',
  model: `1. **Cost:** a personal interview is costly because of travel and trained staff; a mailed questionnaire is cheap.\n2. **Response:** interviews get a high response; mailed forms often get a low one.\n3. **Clarification:** the interviewer can explain unclear questions on the spot; with a mailed form nobody is present to help.`,
  sol: 'One point each for cost, response and clarification.',
  scheme: [['Cost compared', 1], ['Response compared', 1], ['Clarification compared', 1]],
}));
Q('s3_questionnaire', short({
  t: 1, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'State three points to be remembered while framing a questionnaire for a survey of the imagined Greenfield school canteen, with an illustration for each.',
  model: `1. **Keep it short:** ask only what the survey needs, say eight questions rather than forty.\n2. **Order from general to specific:** begin with whether the student uses the canteen, then ask about prices.\n3. **Avoid leading questions:** ask Which snack do you buy most often? instead of Don't you love the samosas?`,
  sol: 'Any three well-illustrated points of good questionnaire design.',
  scheme: [['First point with illustration', 1], ['Second point with illustration', 1], ['Third point with illustration', 1]],
}));
Q('s3_quota_calc', short({
  t: 1, d: 4, c: 'application', marks: 3, wl: S3,
  stem: `Hillview School, an imagined school, has ${HV.girls} girls and ${HV.boys} boys. A quota sample of ${HV.n} students is to be taken in proportion to the number of girls and boys. Find the quota for each group and explain why the method is non-random.`,
  model: `Total students = ${HV.girls} + ${HV.boys} = ${hvTotal}. Girls quota = ${HV.n} × ${HV.girls} ÷ ${hvTotal} = **${quotaGirls}**; boys quota = ${HV.n} × ${HV.boys} ÷ ${hvTotal} = **${quotaBoys}**. It is non-random because within each quota the interviewer **picks the students herself**, so not every student has an equal chance.`,
  sol: `Girls quota ${quotaGirls}, boys quota ${quotaBoys}, and the reason for non-randomness.`,
  scheme: [['Girls quota computed', 1], ['Boys quota computed', 1], ['Reason the method is non-random', 1]],
}));
Q('s3_random_nonrandom', short({
  t: 1, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Distinguish random sampling from non-random sampling on any three points. Name one method of each.',
  model: `1. **Chance:** in random sampling every unit has an equal chance; in non-random sampling it does not.\n2. **Who selects:** random selection is by a chance device, such as the lottery method; non-random selection rests on the investigator's own judgement or convenience.\n3. **Bias:** random sampling limits personal bias; non-random sampling is open to it. Example of a non-random method: quota sampling.`,
  sol: 'Three differences with one named method of each kind.',
  scheme: [['Chance of selection', 1], ['Who selects the units', 1], ['Bias, with a named method of each kind', 1]],
}));
Q('s3_nsso_census', short({
  t: 2, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'How does the Census of India differ from the surveys of the NSSO in coverage, frequency and the kind of information collected?',
  model: `1. **Coverage:** the census counts the whole population; the NSSO surveys only a sample of households.\n2. **Frequency:** the census is held once in ten years; NSSO surveys are carried out in rounds, so topics can be revisited more often.\n3. **Information:** the census gathers population, demographic, social and economic data; the NSSO surveys consumption expenditure, employment and similar subjects.`,
  sol: 'One point each for coverage, frequency and information.',
  scheme: [['Coverage', 1], ['Frequency', 1], ['Kind of information', 1]],
}));

// ---- long 5-mark
Q('l_prim_sec', long({
  t: 1, d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: 'Distinguish between primary and secondary data on five points, with imagined examples from a study of the milk vendors of Kelvapur.',
  model: `1. **Meaning:** primary data are gathered first-hand for the enquiry; secondary data were gathered by others, for example from a dairy board report.\n2. **Originality:** primary data are original; secondary data are second-hand.\n3. **Cost:** collecting primary data from vendors is costly; secondary data are cheaper.\n4. **Time:** a field survey takes long; borrowed data are quick.\n5. **Suitability and reliability:** primary data fit the purpose and the investigator knows how they were collected; secondary data need checking for definitions, method and date.`,
  sol: 'Five points of difference, with an example for at least one kind of data.',
  scheme: [['Meaning', 1], ['Originality', 1], ['Cost', 1], ['Time', 1], ['Suitability and reliability', 1]],
}));
Q('l_methods', long({
  t: 1, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Describe three methods of collecting primary data, stating one merit and one demerit of each.',
  model: `1. **Personal interview:** questions are put face to face. Merit: high response and doubts can be cleared. Demerit: costly, and the interviewer may influence answers.\n2. **Mailed questionnaire:** forms are sent out and returned. Merit: low cost and wide coverage. Demerit: low response, and no clarification is possible.\n3. **Telephone interview:** respondents are asked by phone. Merit: quick. Demerit: limited to those with telephones, and the interview must be short.`,
  sol: 'Three methods, each with a merit and a demerit; marks for description and for the pairs.',
  scheme: [['Personal interview described', 1], ['Its merit and demerit', 1], ['Mailed questionnaire with merit and demerit', 1], ['Telephone interview described', 1], ['Its merit and demerit', 1]],
}));
Q('l_questionnaire', long({
  t: 1, d: 3, c: 'application', marks: 5, wl: L5,
  stem: 'Explain the points to be kept in mind while preparing a questionnaire. Show how they apply to an imagined questionnaire of the Greenfield school canteen.',
  model: `1. **Short:** keep only the questions the canteen survey needs.\n2. **Order:** move from general to specific, for example from how often a student buys lunch to opinions on prices.\n3. **Precise and clear:** ask how many days a week, not whether she often buys.\n4. **Avoid leading, double-negative, ambiguous or embarrassing questions.**\n5. **Mix question types:** closed-ended for easy tabulation and open-ended where free comments help.`,
  sol: 'Five good practices of questionnaire design, each tied to the canteen illustration.',
  scheme: [['Short questionnaire', 1], ['General to specific order', 1], ['Precise and clear wording', 1], ['Faults to avoid', 1], ['Closed and open-ended questions', 1]],
}));
Q('l_census_sample', long({
  t: 1, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: '"A census always gives better results than a sample survey, so a sample should never be preferred." Evaluate this statement.',
  model: `1. A census has **no sampling error**, so for a small population such as a cooperative of 25 members it is the better choice.\n2. For a large population it needs far more **time, money and staff**.\n3. A hurried census can have **more non-sampling errors**, such as careless recording.\n4. If studying a unit destroys it, as with testing bulbs, a **sample is the only choice**.\n5. The statement is **too strong**: the choice depends on population size, cost, time, accuracy needed and whether units are destroyed.`,
  sol: 'Merit of a census, its limits, a case where only a sample is possible, and a reasoned judgement.',
  scheme: [['Census has no sampling error', 1], ['Cost and time of a census for large populations', 1], ['Non-sampling errors can rise in a very large census', 1], ['A case where a sample is unavoidable', 1], ['Reasoned conclusion', 1]],
}));
Q('l_sampling_errors', long({
  t: 1, d: 4, c: 'analysis', marks: 5, wl: L5,
  stem: 'Explain sampling error and the main non-sampling errors. How does enlarging a random sample affect each kind?',
  model: `1. **Sampling error** is the gap between what a sample shows and the true figure for the population. A larger random sample tends to **reduce** it.\n2. **Non-sampling errors** arise in collecting and processing data, namely errors in **data acquisition** such as wrong recording or measurement, **non-response**, **sampling bias** from a faulty selection plan, and **arithmetic errors**.\n3. A larger sample does **not cure** these, and a bigger field operation may even add more of them. Careful training, checking and follow-up are the remedies.`,
  sol: 'Definition of each kind, the four non-sampling errors, and the different effect of sample size.',
  scheme: [['Sampling error defined', 1], ['Effect of a larger sample on it', 1], ['Non-sampling errors named (any three)', 1], ['Non-sampling errors not cured by size', 1], ['Remedies', 1]],
}));
Q('l_sources', long({
  t: 2, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Describe the Census of India and the National Sample Survey Organisation as sources of secondary data. Name two other sources.',
  model: `1. The **Census of India** is run once in **ten years** by the Office of the Registrar General and Census Commissioner, India, and gathers population, demographic, social and economic data such as literacy, occupation and housing.\n2. The first synchronous census was held in **1881**.\n3. The **NSSO**, set up in **1950**, conducts nationwide sample surveys in rounds on consumption expenditure, employment and unemployment.\n4. Other sources: **Reserve Bank of India publications** and the **Economic Survey**; also Labour Bureau reports.`,
  sol: 'Census details, NSSO details, and two other named sources.',
  scheme: [['Census of India: agency and interval', 1], ['Data collected in the census', 1], ['NSSO: set up and role', 1], ['NSSO subjects', 1], ['Two other sources', 1]],
}));

// ---- case-based
const milkPassage = `**Imagined survey: the milk shops of Kelvapur**\n\nKelvapur is an imagined town with a register of 50 milk shops, numbered 1 to 50. A researcher draws 10 shops with a random number table and records the daily milk sold (litres) by each: ${S10.join(', ')}. From the register she also works out that the mean daily sale of all 50 shops is ${f2(popMean)} litres, while her sample gives a mean of ${f2(mean10)} litres. A second, larger sample of 20 shops gives a mean of ${f2(mean20)} litres.`;
Q('cb_milk', caseQ({
  t: 1, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the imagined passage and answer the questions that follow.',
  passage: milkPassage,
  parts: [
    child('a', short({ t: 1, d: 2, c: 'understanding', marks: 1, stem: 'Is the method used to select the 10 shops random or non-random? Name the device used.', model: `**Random**; she used a **random number table**.`, sol: 'Every shop had an equal chance, and the device was a random number table.', scheme: [['Random, with the device', 1]] })),
    child('b', short({ t: 1, d: 3, c: 'application', marks: 1, stem: 'Calculate the sampling error of the sample of 10 shops, in litres.', model: `Sampling error = ${f2(mean10)} − ${f2(popMean)} = **${f2(err10)} litres**.`, sol: `Sample mean minus population mean gives ${f2(err10)} litres.`, scheme: [['Correct sampling error', 1]] })),
    child('c', short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): The sample of 20 shops has a much smaller error than the sample of 10. State the error of the larger sample and explain the general reason.', model: `Error of the larger sample = ${f2(mean20)} − ${f2(popMean)} = **${f2(err20)} litres**. A larger random sample covers more of the population, so its estimate tends to be **closer** to the population value.`, sol: 'Compute the second error and link it to sample size.', scheme: [['Error of the larger sample computed', 1], ['General reason: larger sample is closer', 1]] }), [
      short({ t: 1, d: 3, c: 'evaluation', marks: 2, stem: '**Or** (ii): The register already gives the daily sale of every shop. Why would a researcher still need a sample if she wanted to know what the shops spend on electricity?', model: `The register tells only the **sales**; electricity spending is new information that must be collected from the shops. Asking all 50 would cost more **time and money**, so a sample of shops is a cheaper way to estimate it.`, sol: 'New variable not in the register; census costlier than a sample.', scheme: [['Register does not hold the new data', 1], ['Sample is cheaper and quicker than asking all', 1]] }),
    ]),
  ],
}));
Q('cb_canteen', caseQ({
  t: 1, d: 4, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the imagined questionnaire draft and answer the questions that follow.',
  passage: `**Draft questionnaire of the imagined Lakshmipur Public School canteen survey**\n\n1. Don't you think the canteen food is not unhealthy?\n2. How many days in a week do you buy lunch from the canteen? (0 / 1 to 2 / 3 to 5)\n3. Please share your thoughts about the canteen menu in a few lines.\n4. Is the price of the snacks and the cleanliness of the tables acceptable?`,
  parts: [
    child('a', short({ t: 1, d: 3, c: 'analysis', marks: 1, stem: 'Which question has a double negative, and which fault does it show?', model: `**Question 1**: it contains the words not and unhealthy together, which confuses the respondent.`, sol: 'Question 1 mixes not with a negative word, so it is hard to answer correctly.', scheme: [['Question 1 with the fault', 1]] })),
    child('b', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'Which question is open-ended?', model: `**Question 3**; the student writes the reply in her own words.`, sol: 'Question 3 has no fixed answers.', scheme: [['Question 3', 1]] })),
    child('c', short({ t: 1, d: 3, c: 'application', marks: 2, stem: '**Either** (i): Rewrite question 4 so that it is precise and clear, and say what was wrong with it.', model: `The question asks about **two things** at once, price and cleanliness, so one answer cannot cover both. Rewrite as two questions: Are the prices of the snacks acceptable? And: Are the tables kept clean?`, sol: 'Question 4 asks two things in one; split it.', scheme: [['Fault identified: two issues in one question', 1], ['Rewritten as clear separate questions', 1]] }), [
      short({ t: 1, d: 3, c: 'evaluation', marks: 2, stem: '**Or** (ii): The school wants to test this draft first on 15 students. Name the exercise and state two benefits it gives.', model: `A **pilot survey**. It reveals **faulty or unclear questions**, such as questions 1 and 4, before the main survey, and it helps estimate the **time and cost** needed.`, sol: 'Pilot survey; faults found and time and cost estimated.', scheme: [['Pilot survey named', 1], ['Two benefits', 1]] }),
    ]),
  ],
}));
Q('cb_postal', caseQ({
  t: 1, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the imagined passage and answer the questions that follow.',
  passage: `**Imagined mailed survey of the Pratap Dairy Cooperative**\n\nThe cooperative posts a questionnaire on feed costs to ${MAIL.sent} member families spread over many villages. After one month, ${MAIL.back} completed forms have come back. Several families wrote that they did not understand a question on the cost of green fodder, but there was no one to ask.`,
  parts: [
    child('a', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'Find the response rate as a percentage.', model: `${MAIL.back} ÷ ${MAIL.sent} × 100 = **${mailRate} per cent**.`, sol: `Forms returned divided by forms sent gives ${mailRate} per cent.`, scheme: [['Correct rate', 1]] })),
    child('b', short({ t: 1, d: 2, c: 'understanding', marks: 1, stem: 'Name the weakness of the mailed method that the families pointed out.', model: `**No clarification** of doubts is possible.`, sol: 'No one is present to explain a question.', scheme: [['Inability to clarify doubts', 1]] })),
    child('c', short({ t: 1, d: 3, c: 'evaluation', marks: 2, stem: '**Either** (i): Suggest two steps the cooperative could take to raise the response in its next survey.', model: `It can **send reminders** to families that have not replied and **keep the form short and simple**, perhaps with a helpline for doubts.`, sol: 'Two sensible steps such as reminders, shorter forms, a helpline.', scheme: [['First step', 1], ['Second step', 1]] }), [
      short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): The cooperative wonders whether to use a personal interview instead. Give one advantage and one disadvantage of that change.', model: `**Advantage:** interviewers can clear doubts and usually get a higher response. **Disadvantage:** with families in many villages, travel makes the survey **costly and slow**.`, sol: 'One merit and one demerit of interviews for scattered respondents.', scheme: [['One advantage', 1], ['One disadvantage', 1]] }),
    ]),
  ],
}));
Q('cb_sources', caseQ({
  t: 2, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the imagined passage and answer the questions that follow.',
  passage: `**Imagined research plan of Meera, a student of economics**\n\nMeera wants to study two things for her district: how many people are literate, counted for the whole population, and how households spend their income on food. She has no funds for field surveys, so she plans to use data already published by official agencies.`,
  parts: [
    child('a', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Which publication, covering the whole population, can give her the count of literate persons?', model: `The **Census of India**.`, sol: 'The census covers the whole population and includes literacy.', scheme: [['Census of India', 1]] })),
    child('b', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Which organisation conducts sample surveys on household consumption expenditure?', model: `The **National Sample Survey Organisation (NSSO)**.`, sol: 'Its rounds cover consumption expenditure.', scheme: [['NSSO', 1]] })),
    child('c', short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Why are the data Meera will use called secondary data?', model: `Because they were **collected by official agencies** for their own purposes, not by Meera. She only uses them, so for her enquiry they are second-hand.`, sol: 'Collected by others, used by her.', scheme: [['Collected by someone else', 1], ['Only used by her', 1]] }), [
      short({ t: 2, d: 3, c: 'evaluation', marks: 2, stem: '**Or** (ii): State two checks Meera should make before using the published figures.', model: `She should check **who collected them and by what method**, and whether the **definitions and the date** suit her enquiry, since secondary data may have been gathered for another purpose.`, sol: 'Collector, method, definitions and date.', scheme: [['First check', 1], ['Second check', 1]] }),
    ]),
  ],
}));

// ---- remaining t02 objective items
Q('m_census_body', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'The Census of India is conducted by the',
  opts: ['Office of the Registrar General and Census Commissioner, India', 'Reserve Bank of India', 'National Sample Survey Organisation', 'Labour Bureau'],
  sol: `The census is run by the Office of the Registrar General and Census Commissioner. The central bank deals with money and banking, the NSSO conducts sample surveys, and the Labour Bureau reports on labour matters.`,
}));
Q('m_first_census', mcq({
  t: 2, d: 2, c: 'recall',
  stem: 'The first synchronous census of India was held in the year',
  opts: ['1881', '1947', '1950', '1991'],
  sol: `The count of the first synchronous census was made across the country at one time, in 1881. The year 1950 is when the NSSO was set up; the other years are not linked to the first synchronous census.`,
}));
Q('m_nsso_set', mcq({
  t: 2, d: 2, c: 'recall',
  stem: 'The National Sample Survey Organisation was set up in',
  opts: ['1950', '1881', '1935', '2019'],
  sol: `The NSSO was set up in 1950. The year 1881 belongs to the first synchronous census, 1935 to the founding of the central bank, and 2019 is the year the NSSO was merged into the National Statistics Office.`,
}));
Q('m_nsso_does', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'The NSSO is best known for conducting',
  opts: ['nationwide sample surveys, called rounds, on consumption expenditure and employment', 'a full count of every household once in ten years', 'yearly reviews of the economy for Parliament', 'the issue of currency notes'],
  sol: `The NSSO works through sample surveys in rounds. A full ten-year count is the work of the census office, the yearly review is the Economic Survey, and currency is issued by the central bank.`,
}));
Q('m_nsso_now', mcq({
  t: 2, d: 3, c: 'recall',
  stem: 'As of 2024, the NSSO is part of the',
  opts: ['National Statistics Office under the Ministry of Statistics and Programme Implementation', 'Office of the Registrar General and Census Commissioner', 'Reserve Bank of India', 'Labour Bureau'],
  sol: `Following a merger in 2019, the NSSO functions within the National Statistics Office under the Ministry of Statistics and Programme Implementation. It is not part of the census office, the central bank or the Labour Bureau.`,
}));
Q('m_nsso_vs_census', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'Which statement correctly contrasts the Census of India with NSSO surveys?',
  opts: ['The census covers the whole population, while NSSO surveys study a sample', 'The census studies a sample, while NSSO surveys cover the whole population', 'Both study only a sample, but of different sizes', 'Both are held once in ten years'],
  sol: `The census is a complete count held every ten years, while NSSO surveys are sample surveys conducted in rounds. The other statements swap or blur these features.`,
}));
Q('s2_other_sources', short({
  t: 2, d: 2, c: 'recall', marks: 2, wl: S2,
  stem: 'Name two sources of secondary data other than the Census of India and the NSSO, and say what each provides in general terms.',
  model: `The **Reserve Bank of India** publishes data and reports on money, banking and the economy. **Labour Bureau reports** give information on labour matters such as wages and employment. The **Economic Survey** is another source.`,
  sol: 'Any two of the Reserve Bank, the Economic Survey and the Labour Bureau, with what each provides.',
  scheme: [['First source with what it provides', 1], ['Second source with what it provides', 1]],
}));
