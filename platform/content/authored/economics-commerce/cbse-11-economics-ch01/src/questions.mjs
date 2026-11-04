// CBSE 11 Economics (Statistics for Economics), ch01 Introduction: question bank. Every shop, village, survey and family
// is imagined and written by SOYL. Every figure stated as a result is computed from the data with stats.mjs and pinned
// with check(), so a typo fails the build.
import { Q, mcq, ar, tf, fb, match, ord, num, short, long, caseQ, child } from './lib.mjs';
import { check, sum, mean, median, rnd } from './stats.mjs';

export const inr = (n) => Number(n).toLocaleString('en-IN');
const S2 = [30, 50];
const S3 = [50, 80];
const L5 = [80, 120];

// ---------------------------------------------------------------- imagined data (exported for the deck figures)
/** Annual rainfall (mm) in the imagined village of Sarangpur over six imagined years. */
export const RAIN = [820, 940, 760, 1010, 880, 870];
export const RAINmean = mean(RAIN);
export const RAINmed = median(RAIN);
check(RAINmean, 880, 2, 'rain mean');
check(RAINmed, 875, 2, 'rain median');
check(sum(RAIN), 5280, 0, 'rain sum');

/** Imagined survey of 80 households in Sarangpur: main source of income. */
export const HH = [['Farming', 32], ['Wage labour', 20], ['Trade', 12], ['Service', 10], ['Other', 6]];
export const HHn = sum(HH.map((h) => h[1]));
export const share = (cnt, tot = HHn) => rnd((cnt / tot) * 100, 2);
check(HHn, 80, 0, 'HH total');
check(share(32), 40, 2, 'farm share');
check(share(20), 25, 2, 'wage share');
check(share(12), 15, 2, 'trade share');
check(share(10), 12.5, 2, 'service share');
check(share(6), 7.5, 2, 'other share');

/** Daily sales (Rs) of the imagined Kavita Provision Store over six days. */
export const SALES = [4200, 3800, 4000, 4600, 5400, 5000];
export const SALESmean = mean(SALES);
check(SALESmean, 4500, 2, 'sales mean');

/** Monthly rice consumption (tonnes) of the imagined town of Rangpur over four years. */
export const RICE = [400, 420, 440, 460];
export const riceStep = (RICE[3] - RICE[0]) / (RICE.length - 1);
export const riceNext = RICE[3] + riceStep;
check(riceStep, 20, 2, 'rice step');
check(riceNext, 480, 2, 'rice next');

/** Imagined bakery: price of a bun (Rs) and buns sold per day. */
export const BUNP = [10, 12, 14, 16, 18];
export const BUNQ = [50, 44, 38, 32, 26];
export const bunFall = BUNQ[0] - BUNQ[1];
check(bunFall, 6, 0, 'bun fall');
check(BUNQ[0] - BUNQ[4], 24, 0, 'bun total fall');

/** Imagined families: monthly income and saving (Rs thousand). */
export const INC = [12, 18, 24, 30, 36];
export const SAV = [1.2, 2.7, 4.8, 7.5, 10.8];
export const savePct = SAV.map((s, i) => rnd((s / INC[i]) * 100, 2));
check(savePct[0], 10, 2, 'save pct 1');
check(savePct[1], 15, 2, 'save pct 2');
check(savePct[2], 20, 2, 'save pct 3');
check(savePct[3], 25, 2, 'save pct 4');
check(savePct[4], 30, 2, 'save pct 5');

/** Imagined canteen survey: 60 students, favourite drink. */
export const DR = [['Tea', 24], ['Lassi', 18], ['Juice', 12], ['Coffee', 6]];
export const DRn = sum(DR.map((d) => d[1]));
check(DRn, 60, 0, 'drink total');
check(share(24, DRn), 40, 2, 'tea share');
check(share(18, DRn), 30, 2, 'lassi share');
check(share(12, DRn), 20, 2, 'juice share');
check(share(6, DRn), 10, 2, 'coffee share');

/** Imagined monthly budget of the Dhillon family (Rs). */
export const BUD = { income: 30000, food: 12000, rent: 6000, school: 3000, other: 5000 };
export const budSave = BUD.income - BUD.food - BUD.rent - BUD.school - BUD.other;
check(budSave, 4000, 0, 'budget saving');
check((BUD.food / BUD.income) * 100, 40, 2, 'food share');

// ================================================================ t01 Introduction to statistics
// ---- why economics, activities and agents
Q('m_scarcity_oven', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Farida runs a bakery in the imagined town of Pipalnagar with one oven and ₹2,000 of daily raw material. She can bake only cakes or only bread in the oven during the morning shift. Which feature of the economic problem does her situation show?',
  opts: ['Scarce resources have alternative uses, so a choice must be made', 'Her wants are limited, so no choice is needed', 'Resources are unlimited, so she can bake both without giving up anything', 'The choice is made by the government alone'],
  sol: 'One oven and a fixed sum of money can be put to different uses, so using them for cakes means giving up bread. This is scarcity with alternative uses, which forces a choice. Her resources are limited, not unlimited, and she herself decides what to bake.',
}));
Q('m_econ_def', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Economics is best described as the study of',
  opts: ['how individuals and society choose to use scarce resources to satisfy wants', 'how to earn the highest possible profit in business', 'how governments collect taxes from citizens', 'how money is printed and circulated'],
  sol: 'The central idea of economics is choice under scarcity: wants are many, resources are limited, so people and societies must decide how to use them. Profit-making, taxation and printing money are only parts of what economics examines.',
}));
Q('m_consumption', mcq({
  t: 1, d: 1, c: 'understanding',
  stem: 'Neha buys a notebook and two pens from Gupta Stationers for her own use in school. In economic terms this activity is',
  opts: ['consumption', 'production', 'distribution of income', 'government spending'],
  sol: 'Using goods and services to satisfy wants is consumption. Neha is the end user, so she is consuming. Production means creating goods or services, distribution means sharing output or income, and no government spending is involved.',
}));
Q('m_production', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'In the imagined village of Karanpur, Raju turns timber, nails and labour into finished chairs in his workshop. This is an example of',
  opts: ['production, because inputs are turned into goods that satisfy wants', 'consumption, because timber is being used up', 'distribution, because chairs will be sold later', 'saving, because he keeps the timber for later'],
  sol: 'Production is creating goods and services using inputs. Raju combines timber, nails and labour to make chairs. The timber is an input, not something a final user consumes, and selling the chairs would be a separate activity.',
}));
Q('m_distribution', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'At the end of the month the owner of a tailoring unit in Sarangpur pays wages to the tailors, rent to the landlord of the shop and keeps the rest as profit. Which economic activity does this illustrate?',
  opts: ['Distribution, since the earnings of production are shared among those who contributed', 'Consumption, since money is being spent', 'Production, since tailors are working', 'Forecasting, since profit is being planned'],
  sol: 'The value created in production is divided as wages, rent, interest and profit among those who supplied labour, land, capital and enterprise; that sharing is distribution. The tailors working is production, and spending on goods later is consumption.',
}));
Q('m_agent_gov', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Which of the following is regarded as an economic agent that provides public services such as roads and schools and collects taxes?',
  opts: ['The government', 'A consumer', 'A producer of private goods', 'A service holder'],
  sol: 'The government undertakes public activities and raises revenue through taxes. A consumer uses goods, a producer makes goods for sale, and a service holder earns a salary or wage by working for others.',
}));
Q('m_agent_service', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Imran works as a clerk in a cooperative bank in Rangpur and receives a monthly salary. In the classification of economic agents he is a',
  opts: ['service holder', 'producer', 'government', 'consumer only'],
  sol: 'A service holder earns income by offering labour or skills for a salary or wage. He also consumes, but his role in earning is that of a service holder. He is not an owner producing goods for sale, and he is not the government.',
}));
Q('m_agent_producer', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Savitri owns a small unit that packs and sells spice mixes in Kanchanpur. She hires three workers and decides what to pack and at what price. Her role in the economy is mainly that of a',
  opts: ['producer', 'consumer', 'service holder', 'regulator'],
  sol: 'A producer organises inputs and creates goods or services for sale. Savitri hires workers and takes decisions on output and price. A consumer uses goods, a service holder works for a salary, and a regulator makes rules, which she does not.',
}));
Q('m_wants', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Which statement about human wants and resources is correct?',
  opts: ['Wants are unlimited, while the resources to satisfy them are limited', 'Wants are limited, while resources are unlimited', 'Both wants and resources are unlimited', 'Both wants and resources are limited, so choice never arises'],
  sol: 'People keep developing new wants as old ones are met, whereas land, labour, capital and time are limited. This gap is why choice is unavoidable. The other statements either reverse the idea or deny the problem.',
}));
// ---- meaning of statistics
Q('m_stat_plural', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'The imagined Sarangpur panchayat office keeps a register of annual rainfall readings for six years: 820, 940, 760, 1,010, 880 and 870 millimetres. Used in this sense, the word statistics refers to',
  opts: ['numerical facts, that is, data', 'the science of collecting and analysing data', 'a mathematical theory of chance', 'a way of drawing diagrams'],
  sol: 'A collection of numerical facts is statistics in the plural sense. The science of collecting, organising and analysing them is statistics in the singular sense. Probability theory and diagrams are other topics.',
}));
Q('m_stat_singular', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Statistics used in the singular sense means',
  opts: ['the science of collecting, organising, presenting, analysing and interpreting numerical data', 'a set of numbers about one village', 'only the calculation of an average', 'the opinion of an expert about economic trends'],
  sol: 'Statistics as a subject covers a whole chain of methods from collection to interpretation. A set of numbers is plural usage, an average is just one tool, and an expert opinion is not a statistical method.',
}));
Q('m_stat_steps', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'A student says statistics is only about collecting numbers. Which reply is correct?',
  opts: ['Collection is only the first step; organising, presenting, analysing and interpreting follow', 'Correct, because analysis belongs to mathematics', 'Correct, because interpretation is left to the reader of the report', 'Wrong, because statistics only deals with analysis'],
  sol: 'The subject covers all five stages, from collecting data to interpreting what the results mean. Saying it is only collection or only analysis leaves out parts of the process.',
}));
Q('m_qual', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'In an imagined survey of 80 households in Sarangpur, the surveyors note the main source of income of each household: farming, wage labour, trade, service or other. This information is',
  opts: ['qualitative data, which can be counted by category', 'quantitative data, since it is measured in rupees', 'neither, since it is not numerical', 'quantitative, since there are five categories'],
  sol: 'The source of income is an attribute, not a measured amount, so the data are qualitative. After the households are sorted into categories, the number in each category can be counted. Having several categories does not make data quantitative.',
}));
Q('m_quant', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Which of the following is an example of quantitative data?',
  opts: ['Monthly incomes of ten families in an imagined colony', 'Religion of each respondent in a survey', 'The preferred brand of tea of each customer', 'Whether a student walks or cycles to school'],
  sol: 'Incomes are measured as numbers, so they are quantitative. Religion, brand preference and the way a student travels are attributes, hence qualitative.',
}));
Q('m_qual_vs_quant', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: 'In an imagined canteen survey of 60 students, 24 name tea as their favourite drink, 18 lassi, 12 juice and 6 coffee. Which statement about these data is most accurate?',
  opts: ['The favourite drink is a qualitative attribute; the counts 24, 18, 12 and 6 are numerical summaries of it', 'The data are quantitative because drinks have prices', 'The counts are qualitative because they are about drinks', 'No numbers can be obtained from qualitative data'],
  sol: 'What is recorded for each student, a drink, is an attribute. Counting how many fall in each category gives numbers that summarise it. Prices are not what was recorded, and attributes can always be counted by category.',
}));
// ---- scope and functions
Q('m_function_present', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Which function of statistics is shown when a report states that the average daily sale of Kavita Provision Store was ₹4,500 instead of listing every day\'s sale?',
  opts: ['Condensing a mass of data into a summary measure', 'Forecasting', 'Testing a theory', 'Collecting primary data'],
  sol: 'An average squeezes several readings into one figure that is easy to remember and compare. It does not predict the future, test a theory or collect new data.',
}));
Q('m_function_relation', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'An imagined bakery records that when the price of a bun is raised from ₹10 to ₹12, daily sales fall from 50 to 44 buns. Studying such pairs of figures helps economists to',
  opts: ['find the relationship between price and quantity demanded', 'present the data in a more attractive form only', 'prove that all customers behave identically', 'decide who should be hired'],
  sol: 'Putting two economic variables side by side shows how one changes when the other does, here the quantity demanded when price rises. The aim is not decoration, customers do not all behave alike, and hiring is a different matter.',
}));
Q('m_function_forecast', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'The imagined town of Rangpur recorded monthly rice consumption of 400, 420, 440 and 460 tonnes in four successive years. An official uses this series to plan the food stock for the next year. Which use of statistics is this?',
  opts: ['Forecasting and planning', 'Defining a concept', 'Collecting data by a census', 'Classifying data by region'],
  sol: 'The past trend is used to estimate a likely future requirement so that stocks can be arranged in time. That is forecasting for planning. The official is not collecting new data or classifying it.',
}));
Q('m_user_producer', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'A manufacturer of school bags in Kanchanpur studies sales figures from five towns to decide how many bags to make next season. This is an example of statistics being used by a',
  opts: ['producer', 'consumer', 'researcher only', 'trade union'],
  sol: 'The firm takes a decision on output from data on sales, so the user is a producer. A consumer would use data on prices or quality before a purchase, and the question does not describe research or a union.',
}));
Q('m_user_consumer', mcq({
  t: 1, d: 1, c: 'understanding',
  stem: 'Before buying a second-hand scooter, Harpreet notes the asking prices of seven similar scooters in her town and takes their average. Here statistics is helping a',
  opts: ['consumer, to judge a fair price', 'producer, to fix output', 'government, to levy a tax', 'researcher, to publish a paper'],
  sol: 'Harpreet is a buyer using data to decide how much to pay, so she is acting as a consumer. No firm, tax or research report is involved.',
}));
Q('m_not_function', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: 'Which of the following is NOT a function of statistics in economics?',
  opts: ['Guaranteeing that every individual in a group behaves like the group average', 'Presenting economic facts in a precise and definite form', 'Helping to find relationships between economic factors', 'Supporting policy-making and forecasting'],
  sol: 'Statistics summarises groups; it cannot ensure that each member matches the average. The other three are genuine functions.',
}));
// ---- importance and limitations
Q('m_importance_theory', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Why are data important when economists test a theory such as the one linking income and saving?',
  opts: ['Observed figures show whether the expected relationship actually holds', 'Data make the theory true by definition', 'Data are needed only to make the theory look complicated', 'Theories never need to be tested'],
  sol: 'A theory predicts how variables move together; real numbers let us check this prediction, and accept, change or reject the theory. Data cannot make a theory true by definition, and testing is essential.',
}));
Q('m_limit_aggregate', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'A report says that the average monthly saving of the 5 imagined families of a lane is ₹5,400. Which limitation of statistics warns us against concluding that every family there saves ₹5,400?',
  opts: ['Statistics deals with aggregates and not with single individuals', 'Statistics is only a branch of mathematics', 'Statistics can be used only by the government', 'Statistics gives exact results always'],
  sol: 'The average describes the group as a whole; individual families may save much more or much less. The other statements are not limitations stated about this case.',
}));
Q('m_limit_misuse', mcq({
  t: 1, d: 3, c: 'evaluation',
  stem: 'A shop in Pipalnagar advertises that 9 out of 10 customers prefer its brand, but it asked only ten people standing at its own counter. What is the main problem with this claim?',
  opts: ['The data were collected carelessly, so the result may be misleading', 'Statistics can never be used in advertising', 'Nine out of ten is not a possible ratio', 'Customers are not allowed to give opinions'],
  sol: 'Ten people at the shop\'s own counter are not a fair picture of all customers, so the conclusion can mislead. This is the risk of misuse when data are collected or read carelessly. Statistics can be used in advertising when done properly.',
}));
Q('m_limit_average', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: 'Statistical laws are said to hold good on the average. Which situation best illustrates this?',
  opts: ['In many lanes, higher-income families generally save more, though some higher-income family may save little', 'Every family with a higher income always saves more than every poorer family', 'No relation between income and saving can ever be found', 'A result found in one lane must be exactly true in every house'],
  sol: 'Results of statistics describe a general tendency in a group, not an exact rule for every member. The other statements are either absolute or deny any pattern.',
}));
Q('m_policy', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'A district office compares the number of households in the imagined block of Rangpur with the number of ration shops before deciding where to open new ones. Statistics is here being used mainly for',
  opts: ['policy-making and planning', 'testing a mathematical identity', 'advertising a product', 'defining a variable'],
  sol: 'Figures on households and shops guide where public facilities should go, which is planning and policy. No theory, advertisement or definition is involved.',
}));
Q('m_rain_mean', mcq({
  t: 1, d: 3, c: 'application',
  stem: `The imagined Sarangpur village records annual rainfall of ${RAIN.map(inr).join(', ')} millimetres in six years. The average annual rainfall, as a summary measure of these data, is`,
  opts: [`${inr(RAINmean)} mm`, `${inr(RAINmed)} mm`, `${inr(RAIN[3])} mm`, `${inr(RAIN[2])} mm`],
  sol: `The sum of the six readings is ${inr(sum(RAIN))}; divided by 6 this gives ${inr(RAINmean)} mm. The median is ${inr(RAINmed)} mm; the largest reading is ${inr(RAIN[3])} mm and the smallest is ${inr(RAIN[2])} mm, so these are not the average.`,
}));
Q('m_share_farm', mcq({
  t: 1, d: 3, c: 'application',
  stem: `In an imagined survey of ${HHn} households in Sarangpur, ${HH[0][1]} households have farming as their main source of income. What percentage of the surveyed households is this?`,
  opts: [`${share(HH[0][1])}%`, `${share(HH[1][1])}%`, `${HH[0][1]}%`, `${share(HH[2][1])}%`],
  sol: `Share = ${HH[0][1]} ÷ ${HHn} × 100 = ${share(HH[0][1])}%. The value ${share(HH[1][1])}% belongs to wage labour, ${HH[0][1]} is a count and not a percentage, and ${share(HH[2][1])}% is the share of trade.`,
}));
Q('m_econ_agents_list', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Which of the following lists names economic agents only?',
  opts: ['Consumers, producers, service holders and the government', 'Rainfall, income, price and saving', 'Census, survey, sample and questionnaire', 'Mean, median, mode and range'],
  sol: 'Consumers, producers, service holders and the government are the agents who take economic decisions. The other lists name economic variables, methods of collecting data and summary measures.',
}));
Q('m_dist_consumption_diff', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: 'A wheat farmer in Karanpur harvests 50 quintals, sells 30 quintals in the mandi, and keeps the remainder for his family\'s own food. For the wheat his family eats, which activity is taking place?',
  opts: ['Consumption', 'Production', 'Distribution', 'Forecasting'],
  sol: 'Using wheat to meet the family\'s wants is consumption. The harvest itself was production, and the sale in the mandi belongs to the exchange and distribution chain.',
}));

// ---- assertion-reason
Q('ar_choice', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'Every society has to make choices about how to use its resources.',
  r: 'Human wants are unlimited, but the resources available to satisfy them are limited.',
  sol: 'Both are true. Because wants outrun resources, not every want can be met, which is exactly why choices must be made. So R explains A.',
}));
Q('ar_plural', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'both-true-not-explains',
  a: 'The word statistics is used in two senses.',
  r: 'Rainfall readings of six years can be shown in a bar chart.',
  sol: 'Both statements are true, but the second does not explain why the word has two senses: statistics means numerical facts in the plural sense and a science in the singular sense.',
}));
Q('ar_qual_numbers', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'A-false-R-true',
  a: 'Qualitative data can never be expressed in numbers.',
  r: 'The number of students in each category of favourite drink can be counted.',
  sol: 'A is false: attributes cannot be measured, but they can be counted by category, and counts are numbers. R is true, as the counts of students for each drink show.',
}));
Q('ar_average', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'A-true-R-false',
  a: 'Statistical results may not hold for a single family in a locality.',
  r: 'Statistics studies each family separately and ignores groups.',
  sol: 'A is true because results describe groups and tendencies. R is false: statistics deals with aggregates, not with single units.',
}));
Q('ar_misuse', ar({
  t: 1, d: 4, c: 'evaluation', verdict: 'both-true-explains',
  a: 'A conclusion drawn from carelessly collected data can be misleading.',
  r: 'Statistical results are only as sound as the data they are built on and the way they are read.',
  sol: 'Both are true. Whatever method is used, poor data or careless reading yields unreliable conclusions, so R explains A.',
}));
Q('ar_forecast', ar({
  t: 1, d: 4, c: 'analysis', verdict: 'A-true-R-false',
  a: 'Past data on consumption help a planner to estimate future requirements.',
  r: 'Statistics can predict the future with complete certainty.',
  sol: 'A is true: a trend in past figures gives a basis for estimating needs. R is false: forecasts are estimates and may turn out wrong when conditions change.',
}));
Q('ar_relationship', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'Economists use statistics to study how income and saving are related.',
  r: 'Data on the income and saving of families can be compared to see how saving changes as income changes.',
  sol: 'Both are true, and the comparison of paired data described in R is exactly how a relationship is studied.',
}));

// ---- true-false, fill in the blanks, match, ordering
Q('tf_scarce_all', tf({
  t: 1, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? A very rich economy has no economic problem, because all its wants can be fully satisfied.',
  sol: 'Even rich economies have limited resources compared with their wants, so they too must choose.',
}));
Q('tf_stats_govt', tf({
  t: 1, d: 1, c: 'recall', ans: false,
  stem: 'True or false? Statistics is used only by the government.',
  sol: 'Consumers, producers, researchers and others use statistics as well. The government is only one of the users.',
}));
Q('tf_individual', tf({
  t: 1, d: 3, c: 'analysis', ans: false,
  stem: 'True or false? If the average saving of the families in a street is ₹5,400, each family in the street must be saving ₹5,400.',
  sol: 'An average describes the group; individual families can differ widely from it.',
}));
Q('fb_agents', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'A person who earns a salary or wage by working for others is called a ___ in economics.',
  acc: [['service holder', 'service-holder']],
  sol: 'Such a person is a service holder.',
}));
Q('fb_data_kinds', fb({
  t: 1, d: 2, c: 'understanding',
  stem: 'Data that are measured in numbers, such as monthly income, are called ___ data, whereas data about attributes such as region are called ___ data.',
  acc: [['quantitative'], ['qualitative']],
  sol: 'Measured numbers are quantitative; attributes are qualitative.',
}));
Q('fb_statistics_steps', fb({
  t: 1, d: 2, c: 'recall',
  stem: 'In its singular sense, statistics deals with collecting, organising, presenting, analysing and ___ data.',
  acc: [['interpreting']],
  sol: 'The last of the five stages is interpreting the results.',
}));
Q('mt_agents', match({
  t: 1, d: 2, c: 'application',
  stem: 'Match each imagined person with the role in which she is acting.',
  pairs: [
    ['Meena buys a week\'s vegetables for her family', 'Consumer'],
    ['Pooja runs a chalk factory and decides its output', 'Producer'],
    ['Rita teaches at a private school for a monthly salary', 'Service holder'],
    ['The state water department lays pipelines in Pipalnagar', 'Government'],
  ],
  sol: 'Buying for own use is consumption by a consumer; organising output is a producer\'s task; working for a salary marks a service holder; providing public pipelines is the government\'s role.',
}));
Q('mt_uses', match({
  t: 1, d: 2, c: 'application',
  stem: 'Match each imagined use of statistics with the function it illustrates.',
  pairs: [
    ['Giving the average daily sale of a shop in one figure', 'Condensing data'],
    ['Comparing bun prices with the buns sold', 'Finding relationships'],
    ['Using four years of consumption data to plan next year\'s stock', 'Forecasting'],
    ['Reporting the village rainfall as exact readings in a table', 'Presenting facts precisely'],
  ],
  sol: 'A single average condenses; paired figures reveal a relationship; past trends help forecasting; a table of exact readings presents facts in definite form.',
}));
Q('ord_stats_steps', ord({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'Arrange the stages in which statistics, as a science, treats data in the correct order.',
  items: ['Collecting the data', 'Organising the data', 'Presenting the data', 'Analysing the data', 'Interpreting the results'],
  sol: 'First data are collected, then classified and arranged, then shown in tables and diagrams, then summarised and analysed, and finally interpreted.',
}));
Q('ord_activities', ord({
  t: 1, d: 3, c: 'application', marks: 2,
  stem: 'Arrange these events in the village of Karanpur in the order in which the economic activities occur.',
  items: ['Weavers make cloth from yarn', 'The sale of cloth brings the owner a revenue and wages are paid out of it', 'Families buy the cloth for clothing'],
  sol: 'Cloth is first produced; the revenue is then shared out as wages and profit; the families then consume the cloth. In a real economy these activities go on together.',
}));

// ---- numericals (value is always computed)
Q('n_rain_mean', num({
  t: 1, d: 2, c: 'application', value: RAINmean, unit: 'mm', tol: 0,
  stem: `The imagined Sarangpur village recorded annual rainfall (mm) of ${RAIN.map(inr).join(', ')} over six years. Find the average annual rainfall.`,
  sol: `Step 1: Add the readings: ${RAIN.map(inr).join(' + ')} = ${inr(sum(RAIN))}.\nStep 2: Divide by the number of years: ${inr(sum(RAIN))} ÷ 6 = ${inr(RAINmean)} mm.`,
  scheme: [['Sum of readings', 1], ['Division by 6 giving the average', 1]], marks: 2,
}));
Q('n_share_trade', num({
  t: 1, d: 2, c: 'application', value: share(HH[2][1]), unit: '%', tol: 0,
  stem: `In an imagined survey of ${HHn} households in Sarangpur, ${HH[2][1]} households earn their main income from trade. Find the percentage share of trade households in the survey.`,
  sol: `Share = ${HH[2][1]} ÷ ${HHn} × 100 = ${share(HH[2][1])}%.`,
}));
Q('n_saving_pct', num({
  t: 1, d: 3, c: 'application', value: savePct[1], unit: '%', tol: 0,
  stem: `A family in an imagined colony has a monthly income of ₹${inr(INC[1] * 1000)} and saves ₹${inr(SAV[1] * 1000)}. What percentage of its income does it save?`,
  sol: `Saving share = ${inr(SAV[1] * 1000)} ÷ ${inr(INC[1] * 1000)} × 100 = ${savePct[1]}%.`,
}));

// ---- short answer: 2 marks
Q('s_scarce', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Why do scarcity and choice arise together? Answer with the example of a family in the imagined town of Rangpur that has ₹10,000 a month.',
  model: 'Wants are many but resources, here the family\'s **₹10,000**, are limited. The family cannot buy everything, so it must **choose** among uses such as food, school fees and a phone. Choosing one use means giving up another, which is why scarcity and choice go together.',
  sol: 'Link limited resources and many wants, show a choice in the example, and mention the give-up.',
  scheme: [['Scarcity: limited resources against many wants', 1], ['Choice shown in the example', 1]],
}));
Q('s_agents', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Name the four economic agents and state one role of each.',
  model: '1. **Consumers** use goods and services to satisfy wants.\n2. **Producers** make goods and services for sale.\n3. **Service holders** earn income by working for a salary or wage.\n4. **Government** provides public services and raises taxes.',
  sol: 'Any correct role for each of the four agents.',
  scheme: [['Naming all four agents', 1], ['One role of each', 1]],
}));
Q('s_plural_sing', short({
  t: 1, d: 1, c: 'recall', marks: 2, wl: S2,
  stem: 'Distinguish between statistics as numerical data and statistics as a science.',
  model: 'As **numerical data** (plural), statistics means collections of numerical facts, such as the rainfall readings of a village. As a **science** (singular), it is the method of **collecting, organising, presenting, analysing and interpreting** such data.',
  sol: 'Plural: facts or figures; singular: the method with five stages.',
  scheme: [['Plural sense with an example', 1], ['Singular sense with the five stages', 1]],
}));
Q('s_quant_qual', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Give one example each of quantitative and qualitative data from a survey of the imagined households of Karanpur.',
  model: '**Quantitative:** the monthly income of each household, which is measured in rupees. **Qualitative:** the main occupation, such as farming or trade, which is an attribute and can only be counted by category.',
  sol: 'A measurable variable and an attribute from the same survey.',
  scheme: [['Quantitative example', 1], ['Qualitative example', 1]],
}));
Q('s_present_fn', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'How does statistics help to present economic facts in a precise form? Give an imagined example.',
  model: 'Statistics replaces loose remarks with **exact figures**. Instead of saying the village had a good monsoon, a report can state that rainfall was **940 mm** in one year against **760 mm** in another, so the statement is definite and can be checked.',
  sol: 'Precision: exact numbers instead of vague statements.',
  scheme: [['Statement that figures make facts definite', 1], ['Example with numbers', 1]],
}));
Q('s_condense', short({
  t: 1, d: 2, c: 'application', marks: 2, wl: S2,
  stem: `Kavita Provision Store sold goods worth ₹${SALES.map(inr).join(', ₹')} on six days. How can statistics condense this series, and what does it give?`,
  model: `The six sales can be summarised by an **average**: ${inr(sum(SALES))} ÷ 6 = **₹${inr(SALESmean)}** per day. One figure now stands for six, and it is easy to remember and to compare with other shops.`,
  sol: 'Average computed from the data; one figure replaces many.',
  scheme: [['Average calculated', 1], ['Advantage of condensing data', 1]],
}));
Q('s_relation', short({
  t: 1, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: `An imagined bakery sold ${BUNQ[0]} buns a day at ₹${BUNP[0]} and ${BUNQ[1]} buns at ₹${BUNP[1]}. What relationship between price and quantity does this show, and how did statistics help?`,
  model: `When price rose from ₹${BUNP[0]} to ₹${BUNP[1]}, quantity sold fell from ${BUNQ[0]} to ${BUNQ[1]}, a fall of **${bunFall} buns**. So price and quantity demanded move in opposite directions. Comparing the paired figures revealed this.`,
  sol: 'Inverse relationship; pairing of data reveals it.',
  scheme: [['Inverse relationship stated with the figures', 1], ['Role of paired data', 1]],
}));
Q('s_limit_two', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State any two limitations of statistics.',
  model: '1. Statistics deals with **aggregates**, not with single individuals, so it cannot describe one family exactly.\n2. Its results are true **on the average**, so they need not hold in every particular case.',
  sol: 'Any two of the usual limitations: aggregates, average truth, misuse.',
  scheme: [['First limitation explained', 1], ['Second limitation explained', 1]],
}));
Q('s_user_two', short({
  t: 1, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'Give one imagined example each of how a producer and a consumer use statistics.',
  model: 'A **producer**, such as a Kanchanpur bag maker, studies past sales in different towns to decide next season\'s output. A **consumer**, such as a buyer of a second-hand scooter, compares the average of asking prices before bargaining.',
  sol: 'One decision based on data for each of the two users.',
  scheme: [['Producer example', 1], ['Consumer example', 1]],
}));
Q('s_distribution', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'What is meant by distribution as an economic activity? Illustrate with a small example from a workshop.',
  model: '**Distribution** is the sharing of the value produced among those who helped to produce it. In a workshop, the revenue from selling chairs is divided into **wages** for workers, **rent** for the shed owner and **profit** for the owner.',
  sol: 'Define it as sharing of output value among factors; give wages, rent, profit.',
  scheme: [['Meaning of distribution', 1], ['Example with wages, rent and profit', 1]],
}));

// ---- short answer: 3 marks
Q('s3_scope', short({
  t: 1, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain any three functions of statistics in economics.',
  model: '1. It **presents facts** in a precise and definite form through exact figures.\n2. It **condenses data**: a mass of numbers is reduced to summary measures such as an average.\n3. It helps to **find relationships**, for instance between price and quantity demanded, and supports **forecasting and policy-making**.',
  sol: 'Three of: presenting facts, condensing, relationships, forecasting, policy.',
  scheme: [['First function explained', 1], ['Second function explained', 1], ['Third function explained', 1]],
}));
Q('s3_rice', short({
  t: 1, d: 4, c: 'application', marks: 3, wl: S3,
  stem: `The imagined town of Rangpur had monthly rice consumption of ${RICE.map(inr).join(', ')} tonnes in four successive years. Find the average yearly rise and the likely consumption in the fifth year if the trend continues. How is this forecast useful?`,
  model: `Total rise over the three gaps = ${RICE[3]} − ${RICE[0]} = ${RICE[3] - RICE[0]}; average yearly rise = ${RICE[3] - RICE[0]} ÷ 3 = **${riceStep} tonnes**. Likely consumption next year = ${RICE[3]} + ${riceStep} = **${riceNext} tonnes**. The administration can arrange stocks and storage in advance to avoid shortage.`,
  sol: 'Average rise, projected figure, use for planning.',
  scheme: [['Average yearly rise', 1], ['Fifth year estimate', 1], ['Use in planning', 1]],
}));
Q('s3_importance', short({
  t: 1, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Why are data important for testing economic theories and for framing policies?',
  model: 'A **theory** says how variables should behave; **data** show whether they really do, so theories are retained, revised or dropped. For **policy**, data show the size of a problem such as food shortage and, later, whether the measure worked. Policy without data would rest on guesses.',
  sol: 'Testing theories, designing policy, evaluating it.',
  scheme: [['Data test theories', 1], ['Data guide design of policy', 1], ['Data allow evaluation of results', 1]],
}));
Q('s3_qual_quant', short({
  t: 1, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: 'Distinguish between quantitative and qualitative data. Illustrate how qualitative data can still be summarised with numbers, using the imagined canteen survey of 60 students.',
  model: `**Quantitative** data are measured numerically, such as marks or income. **Qualitative** data describe attributes, such as favourite drink. They cannot be measured, but they can be summarised by counting how many units fall in each category, and then finding the share of each. For example, of 60 students, ${DR[0][1]} chose tea, which is ${share(DR[0][1], DRn)}%, and ${DR[1][1]} chose lassi, which is ${share(DR[1][1], DRn)}%. In this way an attribute is turned into numbers that can be compared.`,
  sol: 'Definitions with examples, then counting by category with computed shares.',
  scheme: [['Quantitative data', 1], ['Qualitative data', 1], ['Counting by category with percentages', 1]],
}));
Q('s3_limits', short({
  t: 1, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'A newspaper in Pipalnagar reports that the average income of the town\'s families is ₹36,000 a month and concludes that no family there is poor. Comment with the help of the limitations of statistics.',
  model: 'An **average** describes the whole town, not each family, since statistics deals with **aggregates**. Some families can earn far less than ₹36,000 while a few earn far more. So the conclusion is wrong; a result holding **on the average** cannot be applied to every family.',
  sol: 'Aggregates, average truth, wrong conclusion.',
  scheme: [['Statistics deals with groups', 1], ['Individual families may differ', 1], ['Conclusion rejected', 1]],
}));
Q('s3_activities', short({
  t: 1, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'A pottery unit in the imagined village of Chandpur makes clay pots, pays wages and profit, and the pots are bought by households. Identify the three economic activities in this account and explain each briefly.',
  model: '1. **Production:** the unit makes pots from clay and labour, which creates new goods that satisfy wants.\n2. **Distribution:** the revenue from selling the pots is shared as wages for the potters and profit for the owner.\n3. **Consumption:** households buy and use the pots to meet their wants. Each activity leads to the next: the pots made are sold, the revenue is shared, and the wages and profit are spent again on goods.',
  sol: 'Production, distribution and consumption each tied to the passage.',
  scheme: [['Production', 1], ['Distribution', 1], ['Consumption', 1]],
}));
Q('s3_budget', short({
  t: 1, d: 3, c: 'application', marks: 3, wl: S3,
  stem: `The imagined Dhillon family has a monthly income of ₹${inr(BUD.income)} and spends ₹${inr(BUD.food)} on food, ₹${inr(BUD.rent)} on rent, ₹${inr(BUD.school)} on school and ₹${inr(BUD.other)} on other items. Find the saving and the percentage of income spent on food.`,
  model: `Total spending = ${inr(BUD.food)} + ${inr(BUD.rent)} + ${inr(BUD.school)} + ${inr(BUD.other)} = ₹${inr(BUD.income - budSave)}. Saving = ${inr(BUD.income)} − ${inr(BUD.income - budSave)} = **₹${inr(budSave)}**. Food share = ${inr(BUD.food)} ÷ ${inr(BUD.income)} × 100 = **${rnd((BUD.food / BUD.income) * 100, 2)}%**. So the family spends ${rnd((BUD.food / BUD.income) * 100, 2)} per cent of its income on food and is able to save ₹${inr(budSave)} each month after meeting all its planned expenses.`,
  sol: 'Total spending, saving, food share.',
  scheme: [['Total spending', 1], ['Saving', 1], ['Food share in percent', 1]],
}));

// ---- long answer
Q('l_economics', long({
  t: 1, d: 2, c: 'understanding', marks: 5, wl: L5,
  stem: 'Explain why economics arises from scarcity and choice. Describe the three economic activities and the four economic agents.',
  model: 'Human **wants are unlimited**, while **resources are scarce** and have alternative uses, so every individual and society must **choose**. Economics studies these choices.\nThe three economic activities are **consumption** (using goods to satisfy wants), **production** (creating goods and services) and **distribution** (sharing the income from production as wages, rent, interest and profit).\nThe four agents are **consumers**, who use goods; **producers**, who make goods for sale; **service holders**, who earn salaries or wages; and the **government**, which provides public services and raises taxes. Their decisions together decide how the scarce resources of the economy are used.',
  sol: 'Scarcity and choice, three activities, four agents.',
  scheme: [['Scarcity, unlimited wants and choice', 1], ['Consumption', 1], ['Production and distribution', 1], ['Two agents explained', 1], ['Remaining two agents explained', 1]],
}));
Q('l_meaning', long({
  t: 1, d: 2, c: 'understanding', marks: 5, wl: L5,
  stem: 'Explain the two senses in which the word statistics is used. Distinguish between quantitative and qualitative data with examples.',
  model: 'In the **plural** sense, statistics means **numerical facts**, such as six years of village rainfall readings. In the **singular** sense, it is the **science** of **collecting, organising, presenting, analysing and interpreting** data.\n**Quantitative** data are measured in numbers, for example income or marks. **Qualitative** data are attributes such as region or preference; they cannot be measured but can be **counted by categories**, for example how many chose tea.',
  sol: 'Two senses with examples, then the two kinds of data.',
  scheme: [['Plural sense', 1], ['Singular sense with five stages', 1], ['Quantitative data with example', 1], ['Qualitative data with example', 1], ['Counting qualitative data by category', 1]],
}));
Q('l_functions', long({
  t: 1, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Describe the scope and functions of statistics in economics, with an imagined example for at least three of them.',
  model: 'Statistics **presents facts precisely**, such as rainfall of 940 mm instead of heavy rain. It **condenses** many figures into a summary like an average sale. It helps to **find relationships**, for example price and quantity demanded of buns, or income and saving. It supports **forecasting**, such as planning rice stocks from four years of consumption, and **policy-making**. Consumers, producers, government and researchers all use it.',
  sol: 'At least five functions or users; examples for three.',
  scheme: [['Presenting facts with example', 1], ['Condensing data with example', 1], ['Relationships with example', 1], ['Forecasting and policy', 1], ['Users of statistics', 1]],
}));
Q('l_importance', long({
  t: 1, d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: 'Examine the importance of statistics for economics. How do data help in testing economic theories and in framing and judging policies?',
  model: '**Theories** state how economic variables should be related; **data** show whether the real world agrees, so a theory can be kept, changed or rejected. In **policy**, data measure the size of a problem such as shortage of food or jobs, help to choose measures, and later show whether the measure worked. Statistics also helps **consumers, producers and researchers** to decide with facts, and avoids decisions based on guesses.',
  sol: 'Theory testing, policy framing and evaluation, different users.',
  scheme: [['Importance for testing theories', 1], ['Data and design of policy', 1], ['Evaluation of policy', 1], ['Use for producers and consumers', 1], ['Conclusion on reliability of decisions', 1]],
}));
Q('l_limits', long({
  t: 1, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: 'Discuss the limitations of statistics. Do these limitations mean that statistics is useless? Give reasons.',
  model: 'Statistics deals with **aggregates**, so it cannot describe a single family or person exactly. Its results are true **on the average** and may fail in a particular case. It can also be **misused** when data are collected from an unfair group or read carelessly. These limits do **not** make statistics useless: they warn us to use it with care. Properly collected data and correct reading give a sound basis for decisions in business and policy.',
  sol: 'Three limitations, then an evaluation that careful use keeps statistics valuable.',
  scheme: [['Aggregates, not individuals', 1], ['True on the average', 1], ['Possibility of misuse', 1], ['Statement that statistics is not useless', 1], ['Reason: careful collection and reading', 1]],
}));
Q('l_activities_agents', long({
  t: 1, d: 3, c: 'application', marks: 5, wl: L5,
  stem: 'In the imagined village of Chandpur, a weaving unit employs eight weavers, pays them wages, sells shawls to households and pays tax. Identify the activities and agents in this account and explain how statistics could help the unit.',
  model: 'The unit is a **producer** and makes shawls: **production**. The eight weavers are **service holders** who receive wages, and the sharing of revenue as wages and profit is **distribution**. Households are **consumers** who buy shawls: **consumption**. The tax makes the **government** an agent. Statistics can help the owner by recording **sales** month by month, finding the **average** monthly sale to summarise them, comparing price with quantity sold to find the **relationship**, and **forecasting** demand for the next season so that enough yarn is bought in time.',
  sol: 'Link each agent and activity to the passage; give a statistical use.',
  scheme: [['Producer and production', 1], ['Service holders and distribution', 1], ['Consumers and consumption', 1], ['Government', 1], ['Statistical use for the unit', 1]],
}));

// ---- case-based (imagined passages)
Q('cb_village', caseQ({
  t: [1], d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the passage and answer the questions that follow. *(Imagined village and figures.)*',
  passage: `**Rainfall and income in the imagined village of Sarangpur**\n\nThe panchayat of Sarangpur recorded the annual rainfall (mm) for six years: ${RAIN.map(inr).join(', ')}. A survey of ${HHn} households, in the same village, asked each for its main source of income. The counts were: farming ${HH[0][1]}, wage labour ${HH[1][1]}, trade ${HH[2][1]}, service ${HH[3][1]} and other ${HH[4][1]}. The panchayat wants to use the figures to plan a new irrigation channel.`,
  parts: [
    child('a', short({ t: 1, d: 1, c: 'recall', marks: 1, stem: 'In the sense in which the rainfall readings are used here, what does the word statistics mean?', model: 'Numerical facts (data).', sol: 'A set of numerical facts is statistics in the plural sense.', scheme: [['Numerical facts', 1]] })),
    child('b', short({ t: 1, d: 2, c: 'understanding', marks: 1, stem: 'Is the main source of income of a household quantitative or qualitative data?', model: 'Qualitative.', sol: 'It is an attribute that can be counted by category, not a measured amount.', scheme: [['Qualitative', 1]] })),
    child('c', num({ t: 1, d: 3, c: 'application', marks: 2, value: RAINmean, unit: 'mm', stem: '**Either** (i): Calculate the average annual rainfall of the six years.', sol: `Sum = ${inr(sum(RAIN))}; average = ${inr(sum(RAIN))} ÷ 6 = ${inr(RAINmean)} mm.`, scheme: [['Sum of readings', 1], ['Average', 1]] }), [
      short({ t: 1, d: 3, c: 'application', marks: 2, stem: '**Or** (ii): Calculate the percentage of surveyed households whose main source of income is farming, and state how it can help the panchayat.', model: `${HH[0][1]} ÷ ${HHn} × 100 = **${share(HH[0][1])}%**. Since a large share depends on farming, the panchayat can judge how many families would gain from an irrigation channel.`, sol: 'Percentage computed from the counts; use stated.', scheme: [['Percentage share', 1], ['Use for planning', 1]] })]),
  ],
}));
Q('cb_bakery', caseQ({
  t: [1], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the table and answer the questions that follow. *(Imagined bakery and figures.)*',
  passage: `**Price and sales at the imagined Sunrise Bakery**\n\n| Price of a bun (₹) | ${BUNP.join(' | ')} |\n|---|---|---|---|---|---|\n| Buns sold per day | ${BUNQ.join(' | ')} |\n\nThe owner, Mr. Anwar, plans to price the bun at ₹${BUNP[4]} next month and wants to know how the sales might change.`,
  parts: [
    child('a', short({ t: 1, d: 1, c: 'recall', marks: 1, stem: 'Name the two economic variables whose values are compared in the table.', model: 'Price of a bun and quantity of buns sold (quantity demanded).', sol: 'The table has price and quantity.', scheme: [['Price and quantity', 1]] })),
    child('b', short({ t: 1, d: 2, c: 'understanding', marks: 1, stem: 'Is the data in the table quantitative or qualitative?', model: 'Quantitative.', sol: 'Both rows are measured numbers.', scheme: [['Quantitative', 1]] })),
    child('c', short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: `**Either** (i): State the relationship that the data show and find the total fall in daily sales when price rises from ₹${BUNP[0]} to ₹${BUNP[4]}.`, model: `As price rises, sales fall: the relationship is **inverse**. Total fall = ${BUNQ[0]} − ${BUNQ[4]} = **${BUNQ[0] - BUNQ[4]} buns** a day.`, sol: 'Inverse relationship; fall computed from the table.', scheme: [['Inverse relationship', 1], ['Total fall', 1]] }), [
      short({ t: 1, d: 3, c: 'evaluation', marks: 2, stem: '**Or** (ii): Mr. Anwar says the table proves that every customer will buy fewer buns when the price rises. Is he right? Give a reason.', model: '**No.** The table shows what happened **on the whole**, for all customers together. Statistics deals with aggregates, so an individual customer may keep buying the same number.', sol: 'Aggregate versus individual.', scheme: [['Statement that he is not right', 1], ['Reason: aggregates and average truth', 1]] })]),
  ],
}));
Q('cb_canteen', caseQ({
  t: [1], d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the passage and answer the questions that follow. *(Imagined school and survey.)*',
  passage: `**A drink survey at the imagined Lalpur School canteen**\n\nThe canteen manager asked all ${DRn} students of a class group for their favourite drink. ${DR[0][1]} chose tea, ${DR[1][1]} chose lassi, ${DR[2][1]} chose juice and ${DR[3][1]} chose coffee. The manager will stock the canteen according to the survey.`,
  parts: [
    child('a', short({ t: 1, d: 1, c: 'recall', marks: 1, stem: 'Which kind of data is the favourite drink of a student?', model: 'Qualitative data.', sol: 'It is an attribute.', scheme: [['Qualitative', 1]] })),
    child('b', short({ t: 1, d: 2, c: 'understanding', marks: 1, stem: 'Which user of statistics is the canteen manager in this case?', model: 'A producer (a seller deciding what to stock).', sol: 'The manager supplies goods and uses data to decide stock.', scheme: [['Producer', 1]] })),
    child('c', num({ t: 1, d: 3, c: 'application', marks: 2, value: share(DR[1][1], DRn), unit: '%', stem: '**Either** (i): What percentage of the students chose lassi?', sol: `${DR[1][1]} ÷ ${DRn} × 100 = ${share(DR[1][1], DRn)}%.`, scheme: [['Substitution', 1], ['Answer', 1]] }), [
      short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Which function of statistics is shown by turning the counts into percentages, and why is it useful here?', model: 'It **condenses and presents** the data in comparable form. Percentages show at once that tea is the largest share and coffee the smallest, helping stock decisions.', sol: 'Condensing; comparison.', scheme: [['Function named', 1], ['Reason', 1]] })]),
  ],
}));
Q('cb_saving', caseQ({
  t: [1], d: 4, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the table and answer the questions that follow. *(Imagined families and figures.)*',
  passage: `**Income and saving of five imagined families in Kanchanpur (₹ thousand a month)**\n\n| Income | ${INC.join(' | ')} |\n|---|---|---|---|---|---|\n| Saving | ${SAV.join(' | ')} |\n\nA researcher studies the table to see whether saving rises with income.`,
  parts: [
    child('a', short({ t: 1, d: 1, c: 'recall', marks: 1, stem: 'Name the function of statistics that the researcher is using.', model: 'Finding the relationship between economic factors (income and saving).', sol: 'Paired data study a relationship.', scheme: [['Finding a relationship', 1]] })),
    child('b', num({ t: 1, d: 2, c: 'application', marks: 1, value: savePct[0], unit: '%', stem: `Find the saving of the first family as a percentage of its income of ₹${INC[0]} thousand.`, sol: `${SAV[0]} ÷ ${INC[0]} × 100 = ${savePct[0]}%.`, scheme: [['Percentage', 1]] })),
    child('c', short({ t: 1, d: 4, c: 'analysis', marks: 2, stem: `**Either** (i): Compare the saving percentage of the highest-income family with the lowest and comment on the relationship.`, model: `The highest-income family saves **${savePct[4]}%** against **${savePct[0]}%** for the lowest. Saving rises more than in proportion to income, so richer families here save a larger share.`, sol: 'Percentages compared; relationship stated.', scheme: [['Both percentages', 1], ['Comment on the relationship', 1]] }), [
      short({ t: 1, d: 4, c: 'evaluation', marks: 2, stem: '**Or** (ii): Can the researcher conclude that every family in India with a higher income saves a larger share? Explain.', model: '**No.** Five families are a very small group, and statistics deals with aggregates and holds on the average. A conclusion for every family needs more data and still need not hold for each one.', sol: 'Small sample; averages.', scheme: [['Answer: no', 1], ['Reason', 1]] })]),
  ],
}));
