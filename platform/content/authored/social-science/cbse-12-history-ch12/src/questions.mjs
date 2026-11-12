// CBSE 12 History, ch12 Framing the Constitution: The Beginning of a New Era, question bank. Every source passage is an
// imagined document (a reporter's notebook, a member's letter, a student's lecture notes) or a SOYL summary of the kind
// of arguments members made or of what the printed debates contain, written in SOYL's own words and labelled as such.
// Nothing from the Constituent Assembly Debates, the text of the Objectives Resolution, the text of the Constitution or
// any other document is quoted, translated or closely paraphrased; real members are named and their arguments described
// in SOYL's words, without quotation marks and without invented quotations; no NCERT text, source box, table, caption,
// map or exercise and no board or sample-paper item is reused (D-036). Articles are cited by number with a paraphrase.
// All numbers in data items are imagined. Partition and its violence are mentioned factually and briefly, without blaming
// any community; nothing after 1950 is claimed. Places are named in words only: no map work (OA-23).
import { Q, mcq, ar, tf, fb, match, ord, short, long, source, child } from '../../cbse-12-history-ch01/src/lib.mjs';

const S2 = [30, 50];
const S3 = [50, 80];
const L5 = [80, 120];
const IMAG = '*(Imagined document written by SOYL for practice; the people in it are not real, though the evidence and events in the background are.)*';
const SUM = '*(Summary written by SOYL in its own words for practice; it is not a quotation or translation of any source.)*';

// ================================================================ t01 A tumultuous time and the making of the Assembly
Q('m_adopted_date', mcq({
  t: 1, d: 1, c: 'recall',
  stem: `Which date marks the adoption of the Constitution by the Constituent Assembly, as distinct from the date on which it came into effect?`,
  opts: [`26 November 1949`, `26 January 1950`, `9 December 1946`, `15 August 1947`],
  sol: `The Constitution was adopted in 1949 and came into effect about two months later; the other dates mark the first session and independence.`,
}));
Q('m_elected_how', mcq({
  t: 1, d: 1, c: 'understanding',
  stem: `How were most of the members of the Constituent Assembly chosen in 1946?`,
  opts: [
    `They were elected by the members of the provincial legislatures`,
    `They were elected by all adult men and women voting directly`,
    `They were appointed by the Viceroy from lists of his own choosing`,
    `They were chosen by the rulers of the princely states`,
  ],
  sol: `The election was indirect. Legislators, not the general body of adults, were the voters.`,
}));
Q('m_rights_claim', mcq({
  t: 3, d: 3, c: 'understanding',
  stem: `A student writes: Because separate electorates were rejected, the Assembly paid no attention to the fears of minorities. Which response is most accurate?`,
  opts: [
    `Largely wrong: other safeguards were adopted, such as Article 17 and reserved seats and posts, though some members argued that these did not meet every fear`,
    `Right: no safeguard of any kind was adopted`,
    `Right: no member raised the fears of minorities`,
    `Wrong: separate electorates were in fact adopted`,
  ],
  sol: `The claim confuses the rejection of one safeguard with the rejection of all. The debate shows several measures, and also members who thought them incomplete.`,
}));
Q('m_rin', mcq({
  t: 1, d: 1, c: 'recall',
  stem: `The mutiny of ratings of the Royal Indian Navy in 1946, one of the upheavals of those years, began in which city?`,
  opts: [`Bombay`, `Calcutta`, `Madras`, `Delhi`],
  sol: `It began among the ratings in Bombay. Delhi was never a naval base.`,
}));
Q('m_boycott_share', mcq({
  t: 1, d: 3, c: 'application',
  stem: `In an imagined province, 20 seats in the Assembly are shared in proportion to the strength of parties in its legislature: Party P gets 15, Party Q gets 4 and independents get 1. Party Q's members then stay away from the Assembly. What share of the members who actually attend from this province belongs to Party P, and what does this show?`,
  opts: [
    `About 94 per cent, up from 75 per cent, which shows that a boycott can raise the share of the party that remains`,
    `75 per cent, which shows that a boycott leaves each party's share unchanged`,
    `About 79 per cent, which shows that a boycott raises the share of independents only`,
    `60 per cent, which shows that a boycott lowers the share of the largest party`,
  ],
  sol: `Attendance falls from 20 to 16, and 15 of 16 is a little under 94 per cent, against 15 of 20, which is 75 per cent. The vacant seats do not count among those who attend.`,
}));
Q('m_date_diary', mcq({
  t: 1, d: 3, c: 'application',
  stem: `An imagined, undated diary entry by a member says that the resolution on the Assembly's aims was moved a few days ago, that a block of benches reserved for those who chose to stay away stands empty, and that no committee has yet been named. Which dating is most reasonable?`,
  opts: [
    `Late 1946, within days of the first session`,
    `Early 1948, after the committees had made their reports`,
    `After the Constitution came into effect in 1950`,
    `1942, soon after the Quit India movement`,
  ],
  sol: `The aims were set out on 13 December 1946, only days after the opening, and the early absence of members and the absence of committees both point to that first session.`,
}));
Q('m_date_partition', mcq({
  t: 1, d: 2, c: 'application',
  stem: `An imagined newspaper report of a sitting says that the Assembly is debating the future Constitution of a country that has lately become independent and divided, and that refugees are still on the roads. Which dating is soundest?`,
  opts: [
    `Not before August 1947, most likely the months after Partition`,
    `Before 1946, while the Quit India movement was still in progress`,
    `26 January 1950, the day the Constitution came into effect`,
    `December 1946, at the first session`,
  ],
  sol: `Independence and division came together in 1947, and the refugees date the report to the months after that. In December 1946 the country was not yet divided.`,
}));
Q('m_public_weaken', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: `A historian argues that letters, newspaper comment and petitions from citizens influenced the Assembly's discussions. Which finding about an imagined set of records would most weaken this view?`,
  opts: [
    `Not one speech or amendment refers to any outside suggestion, and every clause of the final text matches its first draft word for word`,
    `Several members' speeches mention letters they have received from voters`,
    `A newspaper editorial urges a change in a clause, and the clause is later amended`,
    `The Assembly's office kept a register of petitions received from the public`,
  ],
  sol: `To weaken an influence we look for a case in which it should have left a trace and did not. The other findings show contact between the public and the members.`,
}));

// ================================================================ t02 The dominant voices and the vision
Q('m_resolution_content', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: `Which of these was NOT among the aims set out in the Objectives Resolution moved on 13 December 1946?`,
  opts: [
    `To make one language the only language of the republic`,
    `To make India an independent sovereign republic`,
    `To secure justice, equality and freedom for all citizens`,
    `To provide adequate safeguards for minorities, backward and tribal areas and depressed and other backward classes`,
  ],
  sol: `The Resolution said nothing of a single language for the republic; the other three describe what it did say.`,
}));
Q('m_patel_committee', mcq({
  t: 2, d: 1, c: 'recall',
  stem: `Which leader chaired the Advisory Committee that dealt with fundamental rights and minorities?`,
  opts: [`Vallabhbhai Patel`, `Jawaharlal Nehru`, `B. R. Ambedkar`, `Rajendra Prasad`],
  sol: `Patel worked largely behind the scenes and in committees. Nehru moved the Resolution, Ambedkar chaired the Drafting Committee and Prasad presided over the Assembly.`,
}));
Q('m_resolution_weaken', mcq({
  t: 2, d: 4, c: 'analysis',
  stem: `A historian argues that the Objectives Resolution guided the drafting that followed. Which finding about an imagined set of drafting papers would most weaken this view?`,
  opts: [
    `The papers of the Drafting Committee never mention the Resolution, and no clause on rights, minorities or the republic follows its aims`,
    `Several committee reports begin by recalling the Resolution`,
    `A member reminds the House of the Resolution's promise of safeguards when moving an amendment`,
    `The adviser's working papers list the Resolution among the matters to be followed`,
  ],
  sol: `To weaken a guiding role we need the drafts to show no trace of the guide. The other findings show it being used.`,
}));
Q('m_open_question', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: `A member votes for the Objectives Resolution because it promises adequate safeguards for minorities, backward and tribal areas and depressed and other backward classes. Which question does the Resolution, as described, leave open for later debate?`,
  opts: [
    `What form the safeguards should take, such as separate electorates, reserved seats or other measures`,
    `Whether India is to be an independent country`,
    `Whether all citizens are to have justice, equality and freedom`,
    `Whether the Assembly would hold its first session in December 1946`,
  ],
  sol: `The Resolution gave a promise and a direction but not the means. The other three matters it settled or presupposed.`,
}));
Q('m_roles_claim', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: `A student writes: Ambedkar alone wrote the Constitution. Which response is most accurate?`,
  opts: [
    `Partly right: he piloted the draft as Chairman of the Drafting Committee, but advisers, draughtsmen and fellow members prepared it and the whole Assembly debated and amended it`,
    `Right: he was the only member of the Drafting Committee`,
    `Wrong: he took no part in the framing`,
    `Right: the Assembly passed the draft without any discussion`,
  ],
  sol: `The claim names a real and large role but treats a team and a long public process as one man's work.`,
}));

// ================================================================ t03 Defining rights and the powers of the state
Q('m_pocker', mcq({
  t: 3, d: 2, c: 'recall',
  stem: `Which member from Madras argued for the continuation of separate electorates for Muslims as a safeguard?`,
  opts: [`B. Pocker Bahadur`, `Govind Ballabh Pant`, `N. G. Ranga`, `Jaipal Singh`],
  sol: `Pocker Bahadur made that case. Pant argued against separate electorates, Ranga spoke for the poor and Jaipal Singh for Adivasis.`,
}));
Q('m_patel_arg', mcq({
  t: 3, d: 3, c: 'application',
  stem: `An imagined member's letter says that almost every member who spoke on separate electorates opposed them. A later count from the printed record finds 24 speakers: 15 against, 6 for and 3 undecided. Which statement is best supported by the count?`,
  opts: [
    `Most speakers, 15 of 24, opposed them, but almost every overstates the case, and a count of speakers is not a count of votes`,
    `The letter is right, since 15 of 24 is nearly all`,
    `The letter is wrong, since more speakers supported than opposed`,
    `The count shows exactly how the vote went`,
  ],
  sol: `15 of 24 is 62.5 per cent, a clear majority of speakers but well short of almost all, and speakers are not voters.`,
}));
Q('m_electorate_support', mcq({
  t: 3, d: 4, c: 'analysis',
  stem: `Opponents of separate electorates said that they encouraged candidates to speak only to voters of their own community. Which imagined finding would best support this argument?`,
  opts: [
    `In an old set of election speeches, candidates in separate constituencies made far fewer appeals to other communities than candidates in mixed constituencies did`,
    `Turnout in separate constituencies was higher than in mixed ones`,
    `Most candidates in separate constituencies were lawyers`,
    `Separate electorates were used in several provinces`,
  ],
  sol: `The claim concerns whom candidates address, so only a finding about the content of their appeals tests it. Turnout, occupation and spread do not.`,
}));
Q('m_ranga_apply', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: `N. G. Ranga argued that the real minorities were the poor and that rights matter only if people can use them. Which imagined situation would he most likely have used to illustrate his point?`,
  opts: [
    `A landless labourer, free in law to vote, who depends on a landlord for work and dares not go to the polling booth against the landlord's wishes`,
    `A wealthy trader who is free to buy and sell property`,
    `A lawyer who wins a case in a high court`,
    `A member of the Assembly who makes a speech in English`,
  ],
  sol: `His point was about the gap between a right in law and the means to use it. Only the labourer's case shows that gap.`,
}));
Q('m_petition', mcq({
  t: 3, d: 3, c: 'understanding',
  stem: `An imagined petition from a community in 1948 asks for two things: a fixed number of seats in the legislature, and an end to being refused water at the village well because of its caste. Which provisions of the Constitution answer these two requests?`,
  opts: [
    `Reserved seats in legislatures for the Scheduled Castes, and Article 17 abolishing untouchability`,
    `Separate electorates, and the Concurrent List`,
    `Article 356, and the abolition of reserved seats`,
    `The language schedule, and the Union List`,
  ],
  sol: `A guaranteed share of seats is the first; the second is a practice of untouchability, which Article 17 abolished.`,
}));
Q('m_lists_recall', mcq({
  t: 3, d: 1, c: 'recall',
  stem: `Into which three lists did the Constitution divide the subjects of law-making between the centre and the states?`,
  opts: [`Union, State and Concurrent`, `Central, Provincial and Princely`, `Union, Regional and Municipal`, `Federal, Local and Private`],
  sol: `The three lists were the Union List, the State List and the Concurrent List.`,
}));
Q('m_lists_pattern', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: `Two imagined constitutions each list 100 subjects. Constitution X puts 40 in the central list, 40 in the state list and 20 in the shared list. Constitution Y puts 65 in the central list, 20 in the state list and 15 in the shared list. Which of them resembles the choice of a strong centre made in India, and why?`,
  opts: [
    `Y, because its central list is by far the largest of the three`,
    `X, because it divides the subjects most evenly between centre and states`,
    `X, because its shared list is larger than Y's`,
    `Neither, because every constitution with a shared list has a weak centre`,
  ],
  sol: `A strong centre shows in a central list larger than the others. X gives the centre no more than the states.`,
}));
Q('m_santhanam', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: `What did K. Santhanam warn about the way finances were to be shared between the centre and the provinces?`,
  opts: [
    `That an over-strong centre would be ill-equipped for its tasks and that provinces would become dependent`,
    `That provinces would grow so rich that they could not be governed`,
    `That the centre would have no source of income at all`,
    `That all taxes should be given up`,
  ],
  sol: `His concern was the strength of the states and the risk of dependence. The other options claim things he did not argue.`,
}));
Q('m_fiscal', mcq({
  t: 3, d: 3, c: 'application',
  stem: `An imagined state's budget shows that 80 per cent of its income comes as grants and shares of taxes decided by the centre. Which conclusion does this single figure best support?`,
  opts: [
    `The state depends heavily on the centre for funds, a risk of the kind Santhanam raised, though one figure does not show whether the dependence was used unfairly`,
    `The centre has misused its funds`,
    `The state is badly governed`,
    `The Constitution was wrongly framed`,
  ],
  sol: `The figure shows dependence and nothing more. Judgements about fairness, governance or the framing need further evidence.`,
}));

// ================================================================ t04 The language of the nation
Q('m_hindustani', mcq({
  t: 4, d: 1, c: 'recall',
  stem: `Which language, a blend of Hindi and Urdu, did the Congress accept in the 1930s as the national language, in line with Gandhi's preference?`,
  opts: [`Hindustani`, `Sanskrit`, `Persian`, `English`],
  sol: `Hindustani was the blend meant to be a common language of both Hindi and Urdu speakers.`,
}));
Q('m_transition_fear', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: `An imagined member in 1949 says he can accept Hindi as the language of government, but fears that students of his province will be at a disadvantage in examinations and jobs if the change is sudden. Which feature of the compromise best answers his fear?`,
  opts: [
    `The gradual transition, with English continuing for official purposes for fifteen years`,
    `The naming of Hindi in the Devanagari script as the official language`,
    `The recognition of other languages in a schedule`,
    `The acceptance of Hindustani by the Congress in the 1930s`,
  ],
  sol: `His worry is about the speed of change. Only a period of continued English meets it directly; the other features concern naming, status or history.`,
}));
Q('m_compromise', mcq({
  t: 4, d: 3, c: 'analysis',
  stem: `Two imagined records on the language compromise: a diary of a member from a Hindi-speaking province says that English for fifteen years is too long a concession; a letter from a member of a southern province says that fifteen years is far too short for his province. What does the pair best suggest?`,
  opts: [
    `That the compromise left both sides partly dissatisfied, which fits a middle path, though two records cannot show how many members felt each way`,
    `That the compromise was welcomed by every member`,
    `That one of the two records must be false`,
    `That the compromise favoured Hindi speakers only`,
  ],
  sol: `Opposite complaints about one term fit a compromise. Two private records cannot be turned into a count.`,
}));
Q('m_claim_fix', mcq({
  t: 4, d: 3, c: 'understanding',
  stem: `A student writes: In the language debate the Assembly simply accepted the position of those who argued strongly for Hindi. Which response is most accurate?`,
  opts: [
    `Partly right: Hindi was named the official language, but the change was made gradual, English continued for fifteen years, and other languages were recognised, which met some concerns of non-Hindi speakers`,
    `Right: every demand of the pro-Hindi members was accepted`,
    `Wrong: Hindi had no place in the outcome`,
    `Wrong: no member argued for Hindi`,
  ],
  sol: `The outcome gave Hindi a named place yet softened it in three ways, so neither a full acceptance nor a rejection describes it.`,
}));

// ================================================================ t05 Sources: the Debates
Q('m_source_fit', mcq({
  t: 5, d: 2, c: 'understanding',
  stem: `For which of these questions would the printed Constituent Assembly Debates be the MOST useful single source?`,
  opts: [
    `What arguments did members put forward for and against the proposals on language?`,
    `What did ordinary villagers think of the Assembly in 1948?`,
    `What was said in private party meetings before a vote?`,
    `How many refugees reached Delhi in 1947?`,
  ],
  sol: `The Debates record what was said in the House. Villagers' views, private meetings and refugee numbers lie outside what they record.`,
}));
Q('m_dependent', mcq({
  t: 5, d: 4, c: 'analysis',
  stem: `A newspaper report of a sitting and the printed Debates for the same day describe a member's argument in similar terms. What is the most careful use of this agreement?`,
  opts: [
    `It shows that the speech was reported consistently, but the two may rest on the same record of it, so it is not fully independent confirmation of how the speech was received`,
    `It proves that the member's argument persuaded the Assembly`,
    `It proves that both records are free of bias`,
    `It makes other sources unnecessary`,
  ],
  sol: `Agreement between records that share a source is weaker than agreement between independent ones, and neither is evidence of persuasion.`,
}));
Q('m_committee', mcq({
  t: 5, d: 3, c: 'application',
  stem: `A historian finds that a clause passed after a very short debate, though a committee had earlier discussed the matter at length. Which conclusion is best supported?`,
  opts: [
    `The shaping of the clause probably took place largely in committee, so committee papers should be consulted`,
    `No member held any view on the clause`,
    `The clause was of no importance`,
    `The Assembly had not read the draft`,
  ],
  sol: `A short debate after a long committee discussion points to earlier bargaining, not to indifference or ignorance.`,
}));
Q('m_conflict', mcq({
  t: 5, d: 4, c: 'analysis',
  stem: `An imagined reporter's notebook says that a member's speech on language was greeted with loud approval. The printed Debates record nothing of the kind, and the vote that followed was closely divided. Which explanation best fits all three pieces of evidence?`,
  opts: [
    `The reporter noticed approval from one section of the House, which the record did not note and which did not decide the vote`,
    `The reporter invented the approval`,
    `The recorded vote was untrue`,
    `The speech had no effect because it was short`,
  ],
  sol: `An explanation must keep all three facts without calling any of them false. Only the first does that.`,
}));

// ================================================================ assertion-reason
Q('ar_indirect', ar({
  t: 1, d: 2, c: 'understanding', verdict: 'both-true-explains',
  a: `The Constituent Assembly of 1946 cannot be described as chosen by a vote of all adult Indians.`,
  r: `Its members were elected by the provincial legislatures, which had themselves been chosen on a limited franchise.`,
  sol: `The indirect method and the limited vote below it explain why the Assembly was not the direct choice of all adults.`,
}));
Q('ar_reserved', ar({
  t: 3, d: 3, c: 'analysis', verdict: 'both-true-not-explains',
  a: `Some members from the depressed classes argued that reserved seats alone could not end their exclusion.`,
  r: `Reserved seats in legislatures guarantee the presence of those classes in the bodies that make laws.`,
  sol: `R is true, but it says what seats achieve. It does not give the reason why seats were thought not to be enough.`,
}));
Q('ar_tribal', ar({
  t: 3, d: 2, c: 'understanding', verdict: 'both-true-explains',
  a: `Jaipal Singh asked for representation and safeguards for Adivasis in the Constitution.`,
  r: `He pointed out that tribal peoples had been dispossessed of land and pushed to the margins.`,
  sol: `The history of dispossession is the ground on which he based his request.`,
}));
Q('ar_centre', ar({
  t: 3, d: 3, c: 'analysis', verdict: 'both-true-not-explains',
  a: `The fear of disorder after 1946 and 1947 led many members to favour a strong centre.`,
  r: `K. Santhanam argued that the provinces must also be strong.`,
  sol: `R is true, but it records the opposing view. It cannot be the reason for A, which it is a reply to.`,
}));
Q('ar_hindi_nat', ar({
  t: 4, d: 2, c: 'understanding', verdict: 'A-false-R-true',
  a: `The Constituent Assembly declared Hindi to be the national language of India.`,
  r: `In the 1930s the Congress had accepted Hindustani as the national language.`,
  sol: `The outcome was Hindi as the official language, with English continuing and other languages recognised, not a declared national language.`,
}));
Q('ar_conflict', ar({
  t: 4, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: `A historian who read only R. V. Dhulekar's speeches would get a one-sided picture of what the Assembly wanted on language.`,
  r: `The final provisions were a compromise shaped by members from many language regions.`,
  sol: `A compromise built from many viewpoints cannot be read off a single member's speeches, so R explains why A is true.`,
}));
Q('ar_debates', ar({
  t: 5, d: 3, c: 'analysis', verdict: 'both-true-not-explains',
  a: `The printed Constituent Assembly Debates are of great value to historians.`,
  r: `Some decisions were also shaped in committees and party meetings.`,
  sol: `R states a limit of the Debates. It cannot explain their value, which comes from what they do record.`,
}));

// ================================================================ true-false, fill-blank, match, ordering
Q('tf_franchise', tf({
  t: 1, d: 1, c: 'understanding', ans: false,
  stem: `True or false? The members of the Constituent Assembly were elected in 1946 by all adult men and women voting directly.`,
  sol: `They were chosen by the members of the provincial legislatures.`,
}));
Q('tf_separate_rejected', tf({
  t: 3, d: 1, c: 'understanding', ans: false,
  stem: `True or false? After the debate, the Constituent Assembly decided to continue separate electorates for Muslims.`,
  sol: `Most members argued against them and they were rejected.`,
}));
Q('tf_english', tf({
  t: 4, d: 2, c: 'understanding', ans: false,
  stem: `True or false? Under the compromise on language, English was to stop being used for official purposes as soon as the Constitution came into effect.`,
  sol: `English was to continue for official purposes for fifteen years.`,
}));
Q('tf_silence', tf({
  t: 5, d: 3, c: 'application', ans: false,
  stem: `True or false? A historian who finds that a clause drew almost no debate in the Assembly can safely conclude that no member disagreed with it.`,
  sol: `Disagreement may have been settled earlier in committees or party meetings, which leave little trace in the printed speeches.`,
}));
Q('fb_first_session', fb({
  t: 1, d: 1, c: 'recall',
  stem: `The first session of the Constituent Assembly began on ___ December 1946.`,
  acc: [[`9`, `nine`, `9th`, `ninth`]],
  sol: `The Assembly first met on 9 December 1946.`,
}));
Q('fb_art17', fb({
  t: 3, d: 1, c: 'recall',
  stem: `Article ___ of the Constitution abolished untouchability.`,
  acc: [[`17`, `seventeen`]],
  sol: `Article 17 is the article that does so.`,
}));
Q('mt_roles', match({
  t: 2, d: 1, c: 'recall',
  stem: `Match each person with the post held in the framing of the Constitution.`,
  pairs: [
    [`Rajendra Prasad`, `President of the Constituent Assembly`],
    [`B. R. Ambedkar`, `Chairman of the Drafting Committee`],
    [`B. N. Rau`, `Constitutional Advisor`],
    [`S. N. Mukherjee`, `Chief draughtsman`],
  ],
  sol: `Each name goes with one of the posts through which the framing was organised.`,
}));
Q('mt_lang', match({
  t: 4, d: 2, c: 'recall',
  stem: `Match each name or term in the debate on language with the correct description.`,
  pairs: [
    [`R. V. Dhulekar`, `Argued strongly for Hindi`],
    [`G. Durgabai`, `Voiced concern that Hindi was being pressed on non-Hindi speakers`],
    [`T. A. Ramalingam Chettiar`, `Urged caution and a gradual change`],
    [`Hindustani`, `A blend of Hindi and Urdu that Gandhi preferred`],
  ],
  sol: `Each belongs to one position in the debate.`,
}));
Q('ord_context', ord({
  t: 1, d: 2, c: 'understanding', marks: 1,
  stem: `Arrange these upheavals and stages of the framing in chronological order, earliest first.`,
  items: [`The Quit India movement`, `The mutiny of Royal Indian Navy ratings`, `The first session of the Constituent Assembly`, `The adoption of the Constitution`],
  sol: `They fall in 1942, early 1946, December 1946 and November 1949.`,
}));
Q('ord_language', ord({
  t: 4, d: 2, c: 'understanding', marks: 1,
  stem: `Arrange these stages of the language question in order, earliest first.`,
  items: [
    `The Congress accepts Hindustani as the national language`,
    `Hindi and Urdu grow apart after Partition`,
    `The Language Committee proposes a compromise`,
    `The Constitution comes into effect with Hindi as the official language`,
  ],
  sol: `The acceptance came in the 1930s, the drift followed Partition, the compromise came in the Assembly and the Constitution took effect in 1950.`,
}));

// ================================================================ short answers (2 marks)
Q('s_context', short({
  t: 1, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: `Two imagined records describe one event of early 1946, a mutiny of naval ratings. A police note says the ratings returned to duty within days and the city stayed quiet; a newspaper report says crowds in the city openly sympathised with them. Give one reason why the records may differ and say what a historian could use to test them.`,
  model: `The police note may be written to show **order restored**, while the newspaper reports the **public mood**, so their purposes differ; they may also describe different days or places. A historian could test both against **other newspapers, diaries or official orders** of the same days.`,
  sol: `A reason from the purposes of the two records, and further sources that could settle the difference.`,
  scheme: [[`A reason why the records may differ`, 1], [`Further sources to test them`, 1]],
}));
Q('s_resolution', short({
  t: 2, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: `Suppose a historian finds that an imagined committee report of 1947 on safeguards for minorities never mentions the Objectives Resolution. Give one explanation still consistent with the Resolution having guided the Assembly, and one further finding that would show it had not.`,
  model: `The Resolution's promise of safeguards was known to every member, so a report might **follow its aims without citing it**. A finding that the committee's recommendations **contradicted those aims**, or that members treated the Resolution as having no bearing, would show that it did not guide them.`,
  sol: `An explanation that keeps the claim alive and a finding that would end it.`,
  scheme: [[`An explanation consistent with the claim`, 1], [`A finding that would refute it`, 1]],
}));
Q('s_indirect', short({
  t: 1, d: 3, c: 'application', marks: 2, wl: S2,
  stem: `An imagined province has 1,000,000 adults. Its legislature was elected by the 15 per cent of them who had the vote, and its 200 legislators chose 20 members of the Assembly. How many adults could vote for the legislature, and what does the figure suggest about how directly most adults shaped the Assembly?`,
  model: `15 per cent of 1,000,000 is **150,000 voters**, so **850,000 adults had no vote** for the legislature. The 20 members were then chosen by only 200 legislators, so most adults had **no direct say** in the Assembly, though legislators did answer to their own voters.`,
  sol: `The number with a vote worked out, and what a twice-removed choice means for most adults.`,
  scheme: [[`150,000 voters worked out`, 1], [`Most adults had no direct say`, 1]],
}));
Q('s_ranga', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: `A poor tenant farmer has a right to vote in law. Using the argument of N. G. Ranga, explain why the right alone may do little for him, and name one measure that could help.`,
  model: `On Ranga's argument, a right matters only if one has the **means to use it**. A tenant who depends on a landlord for land and a living may not dare to vote freely. A measure such as **security of tenure**, which lowers his dependence, would help the right to count.`,
  sol: `The gap between a legal right and the means to use it, applied to a new case, with a fitting measure.`,
  scheme: [[`Why the right alone may do little, from Ranga's argument`, 1], [`A fitting measure`, 1]],
}));
Q('s_tribal', short({
  t: 3, d: 3, c: 'application', marks: 2, wl: S2,
  stem: `In an imagined province of 40 constituencies, tribal voters make up 12 per cent of all voters but are a majority in only 3 constituencies. Work out roughly how many seats an exactly proportional share would be, say how the gap bears on Jaipal Singh's case for representation and safeguards, and name what one province cannot show.`,
  model: `12 per cent of 40 is 4.8, about **5 seats**, against the **3** where they can expect to win, a shortfall of about two. The gap supports a case for **representation and safeguards**, though **one imagined province cannot show** the position of all tribal peoples.`,
  sol: `A computed share, its bearing on the argument and the limit of a single case.`,
  scheme: [[`The proportional share worked out against 3 seats`, 1], [`The bearing on the case and the limit of one province`, 1]],
}));
Q('s_356', short({
  t: 3, d: 3, c: 'application', marks: 2, wl: S2,
  stem: `Why might members who had lived through 1946 and 1947 have supported a provision letting the centre take over a state's administration in a breakdown, and what risk would a supporter of strong states point to?`,
  model: `After the violence and Partition, many feared that **disorder in one part could threaten the whole country**, so the centre needed power to act. A supporter of strong states would warn that the power could be used to **override a state's own government** and so weaken the states.`,
  sol: `A reason rooted in the events of 1946–47 and a risk seen from the states' side.`,
  scheme: [[`A reason from the events of 1946–47`, 1], [`A risk from the states' side`, 1]],
}));
Q('s_language_why', short({
  t: 4, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: `Why did the Congress's earlier acceptance of Hindustani become difficult to hold to by the time of the Assembly's debates?`,
  model: `After Partition, **Hindi and Urdu were growing apart**, so a blend of the two seemed less natural to many members. Some, such as R. V. Dhulekar, argued strongly for **Hindi** as the common language instead, and the old consensus weakened.`,
  sol: `The drift between Hindi and Urdu and the rise of a case for Hindi.`,
  scheme: [[`Hindi and Urdu growing apart after Partition`, 1], [`A strong case for Hindi among members`, 1]],
}));
Q('s_compromise_view', short({
  t: 4, d: 3, c: 'application', marks: 2, wl: S2,
  stem: `Imagine one member from a Hindi-speaking province who says the transition to Hindi is too slow, and another from the south who says it is too fast. From the design of the compromise, give one reason each might offer.`,
  model: `The first might say that **English was kept for fifteen years**, delaying the change. The second might say that **Hindi was named the official language** and would give its speakers an advantage in government service, while the transition was only gradual.`,
  sol: `One feature of the compromise that suits each complaint.`,
  scheme: [[`A reason for the member who finds the change too slow`, 1], [`A reason for the member who finds it too fast`, 1]],
}));
Q('s_debates_reading', short({
  t: 5, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: `A student wants to know how a clause on language was settled. Name two sources besides the printed speeches and say what each would add.`,
  model: `**Committee reports**, which show the proposals before the House and how the Language Committee reached its compromise. **Newspapers or public petitions**, which show what people outside the Assembly were urging and how the settlement was received.`,
  sol: `Two sources beyond the speeches, each with its particular use.`,
  scheme: [[`A source with what it adds`, 1], [`A second source with what it adds`, 1]],
}));

// ================================================================ short answers (3 marks)
Q('s3_assembly', short({
  t: 1, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: `Explain three features of the composition or working of the Constituent Assembly.`,
  model: `(1) Its members were **elected in 1946 by the members of the provincial legislatures**, not by all adults. (2) The **Congress held a large majority**, while the Muslim League boycotted it before Partition, yet members had **many views and came from many communities**. (3) It met in **eleven sessions over 165 days** of sittings, and its **debates were published**.`,
  sol: `Three features: the method of election, the party balance and the pattern of work.`,
  scheme: [[`Election by provincial legislatures`, 1], [`Congress dominance and the variety of members`, 1], [`Sessions and published debates`, 1]],
}));
Q('s3_voices', short({
  t: 2, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: `Describe the roles of Jawaharlal Nehru, B. R. Ambedkar and Rajendra Prasad in the work of the Assembly.`,
  model: `(1) **Nehru** moved the Objectives Resolution on 13 December 1946, setting out the aims. (2) **Ambedkar**, as Chairman of the Drafting Committee, **piloted the Draft Constitution** through the Assembly. (3) **Rajendra Prasad**, as **President**, presided over the sittings and the long public debates.`,
  sol: `One distinct role for each of the three.`,
  scheme: [[`Nehru and the Resolution`, 1], [`Ambedkar and the draft`, 1], [`Prasad as President`, 1]],
}));
Q('s3_rights_groups', short({
  t: 3, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: `Three imagined petitions reach the Assembly: one from a hill community asking for protection of its land and a voice in the legislature; one from a community association asking to keep its own separate list of voters; one from an untouchable community asking for more than a few reserved seats. Say which member's argument each resembles and what each asks.`,
  model: `(1) The hill community resembles **Jaipal Singh's** case for **Adivasis**: representation and safeguards against dispossession. (2) The association resembles **B. Pocker Bahadur's** case for **separate electorates** as a safeguard. (3) The third resembles the plea of depressed-class members such as **J. Nagappa** that **untouchability and exclusion** need more than reserved seats.`,
  sol: `Each new petition is matched to the member whose argument it repeats, with what it seeks.`,
  scheme: [[`The hill community matched with Jaipal Singh`, 1], [`The separate voters' list matched with Pocker Bahadur`, 1], [`The untouchable community matched with depressed-class members`, 1]],
}));
Q('s3_centre_args', short({
  t: 3, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: `An imagined member argues that a province must be able to raise most of its own funds. Another argues that one authority should hold most taxing power so that poorer regions are not left behind. Which argument matches K. Santhanam's concern? Then say how the Constitution's sharing of taxes gave each side something.`,
  model: `The **first** matches Santhanam, who feared that provinces dependent on the centre for money would be weak. The Constitution gave **some taxes to the centre, some to the states and shared others**. States thus kept their own sources, the centre could draw on large ones, and sharing eased the second member's worry.`,
  sol: `Matching an argument to Santhanam's concern, then showing how a three-way sharing meets both.`,
  scheme: [[`The first argument matched to Santhanam`, 1], [`Some taxes kept by the states`, 1], [`Central and shared taxes meeting the second member's worry`, 1]],
}));
Q('s3_language_args', short({
  t: 4, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: `Two imagined newspaper reports describe one sitting on language. The first says most speakers pressed for Hindi at once; the second says most asked for time. A later count from the printed record of that sitting finds 20 speakers: 8 for Hindi at once, 7 for gradual change and 5 on other matters. Test each report against the count, say what a count of speakers cannot show, and name one further source.`,
  model: `(1) **Neither report is right**: 8 of 20 is 40 per cent and 7 of 20 is 35 per cent, so no view had more than half of the speakers; the first comes nearer. (2) A count of **speakers is not a count of members' views** or votes, since many never spoke. (3) The **record of votes or committee papers** could add the missing evidence.`,
  sol: `Both reports checked against the percentages, then the limit of a speaker count and a source to fill it.`,
  scheme: [[`Neither report supported, with the percentages`, 1], [`Speakers are not views or votes`, 1], [`A further source`, 1]],
}));
Q('s3_source_plan', short({
  t: 5, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: `An imagined historian wants to find out how members from the south felt about proposals on Hindi. Describe three steps she should take in reading the sources.`,
  model: `(1) Read the **printed Debates** for speeches by southern members, noting each speaker's own words and concerns. (2) Read the **committee reports** to see what was proposed and how it was altered. (3) Check **newspapers and petitions** from the south, and ask of every source who produced it and why.`,
  sol: `Debates, committee records and outside opinion, each questioned for purpose.`,
  scheme: [[`The Debates read for southern speakers`, 1], [`Committee reports`, 1], [`Outside sources, with purpose questioned`, 1]],
}));

// ================================================================ long answers (5 marks)
Q('l_context', long({
  t: 1, d: 4, c: 'analysis', marks: 5, wl: L5,
  stem: `A historian says that the Congress was bound to dominate the Assembly of 1946 whatever else happened. Assess this, using the method of election and the boycott, and this imagined case: a province's legislature has 150 members, of whom 90 belong to Party P, 50 to Party Q and 10 are independents; the province sends 10 members in proportion to these numbers, and Party Q's members stay away.`,
  model: `1. **Method:** members were chosen indirectly by provincial legislators, so a province's seats mirrored its legislature.\n2. **Imagined case:** 90, 50 and 10 of 150 are 60, about 33 and about 7 per cent, so P gets 6 of 10 seats, Q 3 and independents 1.\n3. **Boycott:** with Q absent, 7 attend and P holds 6 of 7, about 86 per cent, up from 60.\n4. **Other side:** the method alone gave P only 60 per cent; Q and others also won seats, so members held varied views.\n5. **Judgement:** dominance came from the legislatures' balance and was magnified by the boycott, so bound is too strong; it depended on both.`,
  sol: `The method, the arithmetic of the imagined case, the effect of the boycott and a verdict on bound to dominate.`,
  scheme: [[`The method of election`, 1], [`The shares and seats worked out`, 1], [`The effect of the boycott, 6 of 7`, 1], [`Evidence on the other side`, 1], [`A reasoned judgement`, 1]],
}));
Q('l_vision', long({
  t: 2, d: 2, c: 'understanding', marks: 5, wl: L5,
  stem: `Explain the vision set out in the Objectives Resolution and describe the roles of the main figures in framing the Constitution.`,
  model: `1. **The Resolution:** moved by Nehru on 13 December 1946, it described India as an independent sovereign republic.\n2. **Its promises:** justice, equality and freedom for all citizens, with safeguards for minorities, backward and tribal areas and the depressed classes.\n3. **Patel:** worked behind the scenes and chaired committees, including the Advisory Committee on rights and minorities.\n4. **Prasad and Ambedkar:** Rajendra Prasad presided over the Assembly; Ambedkar chaired the Drafting Committee and piloted the draft.\n5. **Helpers:** Munshi and Alladi Krishnaswamy Aiyar sat on the Drafting Committee; B. N. Rau advised; S. N. Mukherjee was chief draughtsman.`,
  sol: `The Resolution's aims and the division of labour among the main figures.`,
  scheme: [[`The Resolution and its mover`, 1], [`Its promises`, 1], [`Patel's role`, 1], [`Prasad's and Ambedkar's roles`, 1], [`The roles of the other members and officials`, 1]],
}));
Q('l_rights_assess', long({
  t: 3, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: `Assess the view that rejecting separate electorates was the best way to protect the interests of India's minorities.`,
  model: `1. **The case against:** Patel and Pant saw separate electorates as a cause of past division and as harmful to the minorities themselves.\n2. **The case for:** B. Pocker Bahadur wanted them continued as a safeguard for Muslims.\n3. **Wider concerns:** Ranga said the real minorities were the poor; Jaipal Singh asked for protection for Adivasis; depressed-class members said seats were not enough.\n4. **What was done:** separate electorates were rejected; untouchability was abolished by Article 17; seats and posts were reserved for the Scheduled Castes and Scheduled Tribes.\n5. **Judgement:** rejection was favoured by most members and was joined to other safeguards, but the debate shows that no single measure met every group's fear, so best is too strong a word.`,
  sol: `Both sides of the debate, the other groups' concerns, what was adopted and a reasoned verdict.`,
  scheme: [[`The case against separate electorates`, 1], [`The case for them`, 1], [`The concerns of other groups`, 1], [`The measures adopted`, 1], [`A reasoned judgement`, 1]],
}));
Q('l_centre', long({
  t: 3, d: 4, c: 'analysis', marks: 5, wl: L5,
  stem: `Compare the arguments for a strong centre with K. Santhanam's argument for strong states, and explain how the Constitution tried to balance them.`,
  model: `1. **For a strong centre:** Nehru, Ambedkar and many others feared that after the violence and Partition of 1946–47 a weak centre could not hold the country together.\n2. **For strong states:** Santhanam warned that an over-strong centre would be ill-equipped and that the sharing of finances would leave provinces dependent.\n3. **Comparison:** both sides wanted a united country; they differed on how far power should rest at the centre.\n4. **Balance:** three lists, Union, State and Concurrent, with more subjects in the Union list; some taxes to the centre, some to states, some shared.\n5. **Tilt:** the centre could take over a state's administration under Article 356, so the balance favoured the centre.`,
  sol: `The two positions compared, then the three lists and tax sharing as the compromise, with its tilt.`,
  scheme: [[`The case for a strong centre`, 1], [`Santhanam's case for strong states`, 1], [`What the two had in common and where they differed`, 1], [`Lists and sharing of taxes`, 1], [`The tilt towards the centre`, 1]],
}));
Q('l_language', long({
  t: 4, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: `To what extent was the provision on language in the Constitution a compromise? Explain with evidence from the debate.`,
  model: `1. **Starting point:** the Congress had accepted Hindustani in the 1930s; after Partition Hindi and Urdu grew apart.\n2. **One side:** R. V. Dhulekar argued strongly for Hindi.\n3. **Other side:** G. Durgabai and others feared that Hindi was being pressed on non-Hindi speakers; T. A. Ramalingam Chettiar urged caution.\n4. **Outcome:** Hindi in Devanagari became the official language, the change was gradual, English continued for fifteen years and other languages were recognised in a schedule.\n5. **Judgement:** to a large extent a compromise, since each side gained and gave up something; yet Hindi was named official, so the balance was not exactly even.`,
  sol: `The background, both sides, the terms and a verdict that weighs how even the bargain was.`,
  scheme: [[`The earlier consensus and its weakening`, 1], [`The case for Hindi`, 1], [`The concerns of non-Hindi speakers`, 1], [`The terms of the outcome`, 1], [`A reasoned judgement of the extent`, 1]],
}));
Q('l_sources', long({
  t: 5, d: 4, c: 'analysis', marks: 5, wl: L5,
  stem: `Evaluate how far the Constituent Assembly Debates alone can explain how the Constitution was framed.`,
  model: `1. **What they are:** printed records of the discussions in many volumes.\n2. **Strengths:** they show the arguments members made in public, such as those on electorates, the centre and language, and who made them.\n3. **Limits:** speeches were made in a public forum and for a record, so members may have played to the record.\n4. **Silences:** decisions were also shaped in committees and party meetings that the speeches record only in part.\n5. **Judgement:** the Debates are the best single source on arguments, but not enough alone; committee reports, newspapers and public petitions are needed to explain how compromises were reached.`,
  sol: `What the Debates are, their strengths and their limits, then a verdict on sufficiency.`,
  scheme: [[`The nature of the source`, 1], [`Its strengths`, 1], [`The public and recorded nature of speeches`, 1], [`The silences about committees and meetings`, 1], [`A reasoned judgement`, 1]],
}));

// ================================================================ source-based (4 marks each)
Q('sb_notebook', source({
  t: [1, 5], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the source, an imagined reporter's notebook, and answer the questions that follow. ${IMAG}`,
  passage: `**A reporter's notebook from the press gallery (imagined)**\n\nFirst week of the session, a cold morning. The hall is full, yet a block of benches on one side stays empty; I am told that the members who should sit there have decided to stay away. The President calls the House to order, and a leading member of the largest party rises to move a resolution on the aims that the Assembly should keep before it. The members listen closely. Outside, a small crowd waits by the gate, and I am told that letters from citizens arrive each day at the Assembly's office. I note that every word is being taken down, and that the real drafting will be done in committees yet to be named.`,
  parts: [
    child('a', short({ t: [1, 5], d: 1, c: 'recall', marks: 1, stem: `Name the resolution that the reporter saw being moved on this day.`, model: `The **Objectives Resolution**.`, sol: `It was moved by Nehru on 13 December 1946.`, scheme: [[`Objectives Resolution`, 1]] })),
    child('b', short({ t: [1, 5], d: 3, c: 'analysis', marks: 1, stem: `The reporter mentions the empty benches before anything else. What does this suggest about how the reporter judged the Assembly at that moment?`, model: `The reporter saw the **absence of a group** as important, a limit on how far the Assembly spoke for everyone.`, sol: `Read the order of the notes as a sign of what struck the writer.`, scheme: [[`The absence read as a limit on the Assembly's claim to speak for all`, 1]] })),
    child('c', short({ t: [1, 5], d: 3, c: 'application', marks: 2, stem: `**Either** (i): The reporter says letters from citizens arrive each day. Name two kinds of evidence a historian could use to check this and say what each would add.`, model: `(1) The **Assembly's own register or files of letters and petitions**, which would show how many came and what they urged. (2) **Newspapers**, which may report public suggestions and whether members took them up.`, sol: `Two records that test the reporter's remark in different ways.`, scheme: [[`Assembly files of letters, with what they add`, 1], [`Newspapers, with what they add`, 1]] }),
    [short({ t: [1, 5], d: 3, c: 'application', marks: 2, stem: `**Or** (ii): The reporter only reports what was told about the empty benches. Give two ways in which a historian could find out why those members stayed away.`, model: `(1) Read **statements, speeches or letters by those members or their party** explaining their decision. (2) Read the **Assembly's own records and contemporary newspapers**, which may report the reasons given.`, sol: `Two ways to replace hearsay with a direct record.`, scheme: [[`Statements by those who stayed away`, 1], [`Assembly records or newspapers`, 1]] })]),
  ],
}));
Q('sb_letter', source({
  t: [3, 5], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the source, an imagined member's letter, and answer the questions that follow. ${IMAG}`,
  passage: `**A member's letter to his brother (imagined)**\n\nThe question of separate electorates has kept me awake. When I was young, the candidates of my community were chosen by our own voters alone, and I thought of this as a shield. Several friends in the Assembly now tell me that it is a wall, one that taught us to look only inward, and that after the troubles of this year the country cannot afford it. I remain unsure. Yet I notice that those who speak against it do not all speak from one party, and that some who speak for it are not, as I once supposed, speaking from fear alone. I shall listen again tomorrow before I decide how to vote.`,
  parts: [
    child('a', short({ t: [3, 5], d: 1, c: 'recall', marks: 1, stem: `Name the system the writer discusses, under which voters of a community chose only candidates of that community.`, model: `**Separate electorates.**`, sol: `The writer calls it a shield that others call a wall.`, scheme: [[`Separate electorates`, 1]] })),
    child('b', short({ t: [3, 5], d: 3, c: 'analysis', marks: 1, stem: `The writer ends by saying that he will listen again tomorrow before he decides. What does this suggest about how members reached their decisions?`, model: `Members' views were **not fixed in advance** and could be changed by the arguments they heard in debate.`, sol: `Read the intention to listen as a sign that debate could move votes.`, scheme: [[`Views open to change through debate`, 1]] })),
    child('c', short({ t: [3, 5], d: 3, c: 'application', marks: 2, stem: `**Either** (i): A historian wants to know whether this imagined member's doubts were typical. Name two kinds of evidence she could use to test this.`, model: `(1) The **printed speeches of other members** on the same question, to see how many voiced similar doubts. (2) **Letters, diaries or newspaper reports** from other members and observers of that time.`, sol: `Two kinds of evidence that bring in other voices.`, scheme: [[`Speeches of other members`, 1], [`Letters, diaries or newspapers`, 1]] }),
    [short({ t: [3, 5], d: 3, c: 'application', marks: 2, stem: `**Or** (ii): The writer notes that opponents of separate electorates did not all belong to one party. Explain why this detail matters to a historian judging how the question was settled, and name one thing it cannot show.`, model: `It suggests that rejection was **not simply a party decision**, since members of different parties argued the same way. It cannot show **how many** members held each view, or what each would have done had the vote been free of party ties.`, sol: `The detail's value as evidence and its limit.`, scheme: [[`Not a decision of one party alone`, 1], [`A limit of the detail`, 1]] })]),
  ],
}));
Q('sb_notes', source({
  t: [3, 5], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the source, an imagined student's lecture notes, and answer the questions that follow. ${IMAG}`,
  passage: `**A student's notes from a lecture on the debates (imagined)**\n\n- Subjects of law-making were sorted into three lists: one for the centre, one for the states, and one on which both could make laws. The centre's list was the longest.\n- Taxes were divided too: some to the centre, some to the states, some shared.\n- Speaker A (imagined, from a southern province): a province that must ask the centre for money cannot plan its own schools or roads.\n- Speaker B (imagined, from a northern province): the country has just seen what disorder can do; a centre without power to act would endanger every province.\n- Lecturer's remark: neither speaker doubted that India should remain one country.`,
  parts: [
    child('a', short({ t: [3, 5], d: 1, c: 'recall', marks: 1, stem: `Name the third list, on which both the centre and the states could make laws.`, model: `The **Concurrent List**.`, sol: `The three lists were Union, State and Concurrent.`, scheme: [[`Concurrent List`, 1]] })),
    child('b', short({ t: [3, 5], d: 3, c: 'analysis', marks: 1, stem: `The lecturer says that neither speaker doubted that India should remain one country. What does this suggest the disagreement was about?`, model: `It was about **how powers and money should be arranged** to keep the country united, not about whether to keep it united.`, sol: `Infer the subject of the dispute from what both sides shared.`, scheme: [[`The arrangement of powers and finance, not the aim of unity`, 1]] })),
    child('c', short({ t: [3, 5], d: 3, c: 'application', marks: 2, stem: `**Either** (i): Suggest one feature of the arrangement described in the notes that could ease Speaker A's worry, and one cost that Speaker B would point to.`, model: `Letting the states keep **some taxes of their own, or share in others**, would ease A's worry about asking for money. B would point to the **risk that a centre short of funds and power cannot act** in a crisis.`, sol: `A feature meeting one worry and a cost seen from the other side.`, scheme: [[`A feature easing Speaker A's worry`, 1], [`A cost seen by Speaker B`, 1]] }),
    [short({ t: [3, 5], d: 3, c: 'application', marks: 2, stem: `**Or** (ii): These are a student's notes of a lecture, not the Assembly's own record. Give two reasons why a historian should treat them with care, and say what to consult instead.`, model: `(1) They are **second-hand**: the student may have missed or shortened what was said. (2) The speakers are **imagined summaries**, so no actual speech can be checked in them. A historian should turn to the **printed Debates** and committee reports.`, sol: `Two reasons for care about a secondary record, and the primary sources to use.`, scheme: [[`Two reasons for care`, 1], [`The printed Debates and committee reports`, 1]] })]),
  ],
}));
Q('sb_language', source({
  t: [4, 5], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the source, a SOYL summary of the kinds of speeches made on language, and answer the questions that follow. ${SUM}`,
  passage: `**What members said on the language question (summary)**\n\nThe speeches fell broadly into three kinds. Some members, many of them from provinces where Hindi was spoken at home, argued that a common national language was part of national unity and that Hindi in the Devanagari script should have that place. Others, many of them from provinces where Hindi was not spoken at home, said that making Hindi the language of the Union would give its speakers an easy advantage in jobs and examinations, and asked for time and for respect for their own languages. A third group looked for a middle path: a gradual change, with English continuing for a period. The final provisions drew on this third kind of speech.`,
  parts: [
    child('a', short({ t: [4, 5], d: 1, c: 'recall', marks: 1, stem: `Name the blend of Hindi and Urdu that the Congress had accepted as the national language in the 1930s.`, model: `**Hindustani.**`, sol: `Gandhi preferred it as a common language.`, scheme: [[`Hindustani`, 1]] })),
    child('b', short({ t: [4, 5], d: 3, c: 'analysis', marks: 1, stem: `The summary says that the first two kinds of speech came from members of particular regions, using the words many of them. What does this suggest about the pattern of the arguments?`, model: `Positions **often followed a member's own language region**, though not always, since the words many of them leave room for exceptions.`, sol: `Read many of them as a pattern with exceptions.`, scheme: [[`A pattern by region, with exceptions`, 1]] })),
    child('c', short({ t: [4, 5], d: 3, c: 'application', marks: 2, stem: `**Either** (i): An imagined member says that his province will accept Hindi in time, but not at once, and wants English kept meanwhile. Which kind of speech is this, and which part of the final provisions matches it best?`, model: `It is the **third kind**, the search for a middle path. The part that matches best is the **continuation of English for official purposes for fifteen years** while the change to Hindi is gradual.`, sol: `Classify the new speech and link it to the provision it asks for.`, scheme: [[`Identified as the middle path`, 1], [`English continuing for fifteen years`, 1]] }),
    [short({ t: [4, 5], d: 3, c: 'application', marks: 2, stem: `**Or** (ii): Name one kind of evidence a historian would need to learn how many members held each of the three views, and explain why the speeches alone cannot tell this.`, model: `The historian would need the **records of votes and of the committee's proposals**. Speeches show only those who chose to speak, and some members **spoke often while others never did**, so they do not give a count.`, sol: `A record that counts and the reason speeches do not.`, scheme: [[`Records of votes or proposals`, 1], [`Speeches do not cover silent members`, 1]] })]),
  ],
}));
Q('sb_press', source({
  t: 5, d: 2, c: 'analysis', origin: 'soyl-original',
  stem: `Read the source, a SOYL summary of what the printed Debates contain, and answer the questions that follow. ${SUM}`,
  passage: `**What the Constituent Assembly Debates contain (summary)**\n\nThe Debates were printed in many volumes. For each day of sitting they list who spoke, what was proposed and what was decided. Amendments are recorded with the names of the members who moved them, and some are withdrawn after discussion. Points of order and interruptions are noted. Reports of committees are published separately. Private talk in party meetings and conversation in the corridors does not appear.`,
  parts: [
    child('a', short({ t: 5, d: 1, c: 'recall', marks: 1, stem: `In which year did the Assembly whose discussions are printed in these volumes adopt the Constitution?`, model: `In **1949**, on 26 November.`, sol: `The Constitution was adopted in 1949 and took effect in 1950.`, scheme: [[`1949`, 1]] })),
    child('b', short({ t: 5, d: 3, c: 'analysis', marks: 1, stem: `The summary says some amendments were withdrawn after discussion. What can a historian infer from this about the role of debate?`, model: `Debate could **change what members pressed for**, as proposals were dropped or settled once the arguments had been heard.`, sol: `Treat withdrawal after discussion as a trace of persuasion or bargaining.`, scheme: [[`Debate could alter or settle proposals`, 1]] })),
    child('c', short({ t: 5, d: 3, c: 'application', marks: 2, stem: `**Either** (i): Which of these two questions are the Debates better able to answer, and why? (1) What arguments did members make for and against a clause? (2) Who persuaded whom in private before the vote?`, model: `Question **(1)**. The Debates list who spoke and what was proposed. Question (2) concerns **private talk in party meetings and corridors**, which the summary says does not appear.`, sol: `Match each question to what the record does and does not hold.`, scheme: [[`Question (1) chosen`, 1], [`Private talk is not recorded`, 1]] }),
    [short({ t: 5, d: 3, c: 'application', marks: 2, stem: `**Or** (ii): A historian wants to know whether a member's speech represented the view of the member's party. Name one other source she could use and explain one risk of relying on the speech alone.`, model: `She could use **party papers or newspaper reports** of that time. The risk is that a speech shows **one member's view, shaped for a public record**, and may differ from what the party agreed in private.`, sol: `A fitting second source and the risk in taking one speech for a party's view.`, scheme: [[`A suitable second source`, 1], [`The risk of a single speech`, 1]] })]),
  ],
}));
