// CBSE 11 Political Science, ch11 Political Theory: An Introduction: question bank. Every passage (council minutes,
// household notice, debate-club table, newspaper report, letter) is written by SOYL and labelled as imagined; the schools,
// towns, markets, districts, clubs and people in scenarios are imagined. No NCERT text, boxed source, cartoon, Constitution
// text, quotation of any thinker or board/sample-paper item is reused (D-036). Articles are cited by number with a
// paraphrase of what they provide; thinkers are given by name and a short idea in plain words.
import { Q, mcq, ar, tf, fb, match, ord, short, long, caseQ, child } from '../../cbse-11-political-science-ch01/src/lib.mjs';

const S2 = [30, 50];
const S3 = [50, 80];
const L5 = [80, 120];

// ================================================================ what is politics
Q('p_def', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Which statement gives the standard definition of politics as used in political theory?',
  opts: ['The process by which groups make collective decisions about how to live together, who gets what, and how power is used', 'The work of political parties during election campaigns', 'The effort of an individual to gain personal advantage over others', 'The study of laws passed by the legislature'],
  sol: 'Politics covers the whole process of reaching collective decisions in a group, including the sharing of benefits and the use of power. Election campaigns, personal advantage and the study of laws are narrower matters or different things.',
}));
Q('p_popular_app', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'At Kestrel Hill School, Imran says that politics means scheming by people who want power for themselves. Meera replies that the staff and students who met to decide whether the library should stay open after class were also doing politics. Meera is using',
  opts: ['the wider view, in which politics is any activity of making collective decisions and settling differences', 'the popular view, in which politics is manipulation by politicians', 'the legal view, in which politics is the writing of statutes', 'the economic view, in which politics is the pricing of goods'],
  sol: 'Meera points to a shared decision made by a group that had to settle different wishes, which is the wider view. Imran is the one who holds the popular view of scheming, and neither the legal nor the economic description fits a meeting about the library.',
}));
Q('p_aristotle', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Which of the following is closest to the idea of Aristotle about human beings and politics?',
  opts: ['Humans are by nature beings who live in communities and take part in shared public life', 'Humans become political only after they enter a political party', 'Humans are political only when they hold an office', 'Humans live best when they stay away from all community life'],
  sol: 'Aristotle held that living with others in a community, and sharing in decisions about common life, belongs to human nature. Joining a party, holding office or withdrawing from community life are not what he meant.',
}));
Q('p_family_app', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'Every Sunday the Rao family of Fernwick sits together to decide who will cook, who will clean and how the month\'s savings will be used, and the members settle their differences by talking and voting. This is an example of politics in the wider sense because',
  opts: ['the members make collective decisions, resolve differences and share duties and resources', 'a government official is present at the meeting', 'the family belongs to a political party', 'the meeting is held in a public hall'],
  sol: 'The three features of politics are all present: a group decides together, differences are settled and duties and resources are shared. The presence of an official, a party membership or a public hall is not needed for a group decision to be political in this sense.',
}));
Q('p_market_app', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'The stall-holders of the Dunmore weekly market meet to decide how the best spots will be allotted, how disputes over prices will be settled and what fee each stall will pay. Which statement is correct?',
  opts: ['Politics is present in the market, since a group is deciding who gets what and how disputes are settled', 'Politics is absent, since no minister is involved', 'Politics is absent, since markets deal only with money', 'Politics is present only if the town council takes over the meeting'],
  sol: 'The stall-holders are taking collective decisions about shares and disputes, so the activity is political in the wider sense. The absence of a minister, the fact that money is involved or the later arrival of a council does not alter that.',
}));
Q('p_council_app', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'The student council of Pinecrest School must decide whether the canteen will stop selling fried snacks. Some members want the change for health reasons, and others want the snacks kept because they are cheap. The council votes and the rule is adopted. Which element of the definition of politics does the vote mainly illustrate?',
  opts: ['A collective decision that settles a difference of views', 'A court judgment on a legal dispute', 'The writing of a constitution', 'The collection of taxes'],
  sol: 'Members who disagreed reached a decision for the whole school by a vote, which is a collective decision settling a difference. A court judgment, a constitution and taxes are not involved.',
}));
Q('p_power_app', mcq({
  t: 1, d: 4, c: 'analysis',
  stem: 'In the debating club of Orchard Vale, the president alone decides which members may speak, which topics are discussed and who may use the club room, and members who object are told to leave. Which part of the definition of politics is most clearly raised by this situation?',
  opts: ['How power is used in a group, and whether it is shared or concentrated', 'How the club will earn money', 'How the club will choose its colours', 'How the room will be cleaned'],
  sol: 'The decisions are made by one person, so the question is how power is used and who holds it. Money, colours and cleaning are not the issue in this case, although they may also be decided by the group.',
}));
Q('p_not_only_govt', mcq({
  t: 1, d: 3, c: 'understanding',
  stem: 'A student claims that politics exists only in the offices of the government. Which reply is the most accurate?',
  opts: ['Politics also appears wherever groups, such as families, schools and markets, take collective decisions', 'The claim is right, since only a government can take collective decisions', 'Politics exists only where elections are held', 'Politics exists only in the capital city'],
  sol: 'Collective decisions are made in many kinds of groups, so politics is not confined to government offices, elections or a capital. Governments are one important place for politics but not the only one.',
}));
Q('p_goals_app', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'The residents of Larkspur Lane meet to agree on a common aim, a safe play area for children, and to decide who will contribute what. Which part of the standard view of politics does the meeting best show?',
  opts: ['Pursuing common goals through a collective decision', 'Conducting a census', 'Enforcing a court order', 'Drafting an international treaty'],
  sol: 'The residents are working out a shared aim and the contributions each will make, which is pursuing common goals by collective decision. A census, a court order and a treaty are different activities.',
}));
Q('p_selfish_app', mcq({
  t: 1, d: 4, c: 'evaluation',
  stem: 'A newspaper column in imagined Aldmere says that politics is dirty because a few councillors were found to have helped their friends to win contracts. A political theorist would most reasonably respond that',
  opts: ['misconduct by some office-holders is a fault in how power is used, but it does not make the whole activity of collective decision-making dirty', 'the column proves that all politics is corrupt', 'the councillors were not doing politics', 'misconduct should not be questioned in a discussion of politics'],
  sol: 'Misuse of power by some individuals calls for criticism, yet collective decision-making as such remains necessary in any group. To say that all politics is corrupt generalises from a few cases, and to deny that the councillors were engaged in politics or to forbid questions would not be reasonable.',
}));

// ================================================================ what political theory does
Q('pt_def', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'What does political theory study?',
  opts: ['The ideas and principles, such as freedom, equality and justice, that shape constitutions, governments and social life', 'Only the dates of important events', 'Only the results of elections', 'Only the budget of a government'],
  sol: 'Political theory studies the ideas and principles behind political life and asks what they mean and how they should guide it. Dates, election results and budgets are matters of other kinds of study.',
}));
Q('pt_norm_app', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'In the imagined town of Brookfield, a speaker says, "Every child ought to receive a free midday meal at school." This statement is',
  opts: ['normative, since it says what should be done', 'descriptive, since it reports what is already done', 'neither, since it has no reference to society', 'a statement of a scientific law'],
  sol: 'The word ought shows that the speaker is saying what should be, so the statement is normative. A descriptive statement would report a fact, and the statement is certainly about society and is not a scientific law.',
}));
Q('pt_desc_app', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'A survey of the imagined district of Marlow reports that 62 out of every 100 eligible voters cast their votes in the last local election. This statement is',
  opts: ['descriptive, since it reports what is the case', 'normative, since it says what ought to be done', 'a statement of a value judgment', 'a prediction about the next election'],
  sol: 'The survey states a fact about voting that can be checked, which is descriptive. It does not say what ought to be, it passes no judgment of value and it says nothing about the future.',
}));
Q('pt_clarify_app', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'Two teams in the Orchard Vale debate club argue about whether a school rule is "fair", but one team means equal treatment of all and the other means treatment suited to each need. According to political theory, the best first step is to',
  opts: ['clarify what each team means by fair before judging the rule', 'end the debate at once', 'ask the louder team to speak again', 'count the number of supporters on each side'],
  sol: 'Theory begins by examining the meaning of the concept, since the two teams are using one word in two senses. Ending the debate, rewarding loudness or counting supporters would not settle what the word means.',
}));
Q('pt_test_app', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'A student of Westmere School says, "Our class monitor should be chosen by lots." Which response is an example of testing the opinion with reasons?',
  opts: ['"Lots give each student an equal chance, but they ignore who is able to do the work, so we should weigh these two points."', '"That is a silly idea."', '"Everyone in my row agrees with me."', '"I will not discuss the matter."'],
  sol: 'The first reply states reasons on both sides and weighs them, which is how political theory tests an opinion. Calling an idea silly, pointing to the agreement of a few friends or refusing to discuss offers no reasons.',
}));
Q('pt_which_normative', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: 'Which of these questions about the imagined republic of Zandria is normative?',
  opts: ['Should the vote be given to citizens at an earlier age than it is now?', 'How many citizens voted in the last election?', 'In which year was the Zandrian assembly first elected?', 'How many seats does the Zandrian assembly have?'],
  sol: 'Only the first question asks what should be done. The other three ask for facts that can be looked up and so are descriptive.',
}));

// ================================================================ thinkers
Q('th_aristotle', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Which thinker of ancient Greece held that human beings are political by nature?',
  opts: ['Aristotle', 'Hobbes', 'Marx', 'Locke'],
  sol: 'Aristotle of ancient Greece held that human beings are political by nature. Hobbes and Locke belong to the 17th century and Marx to the 19th century.',
}));
Q('th_hobbes_app', mcq({
  t: 1, d: 4, c: 'application',
  stem: 'On the imagined island of Tarn-Vey there is no common authority, and the settlers live in fear of one another. They agree to obey one ruler so that they may live in safety. Whose idea about the reasons for government does this story resemble most?',
  opts: ['Hobbes', 'Marx', 'Ambedkar', 'Plato'],
  sol: 'Hobbes reasoned that without a common authority life would be insecure, and that people accept a ruler for the sake of safety. Marx stressed class conflict, Ambedkar the removal of social hierarchy, and Plato the nature of justice and the well-ordered state.',
}));
Q('th_locke_app', mcq({
  t: 1, d: 4, c: 'application',
  stem: 'The imagined assembly of Mirevale declares that its government rests on the consent of the people and exists to protect their life, liberty and property. Which thinker\'s idea is closest to this view?',
  opts: ['Locke', 'Machiavelli', 'Marx', 'Gandhi'],
  sol: 'Locke argued that people hold natural rights and that government draws its authority from their consent and must protect those rights. Machiavelli studied how rulers keep power, Marx studied class conflict and Gandhi stressed self-rule and non-violence.',
}));
Q('th_mach_app', mcq({
  t: 1, d: 4, c: 'analysis',
  stem: 'A writer in the imagined city of Vorenza explains how rulers have actually won and kept power, and sets aside the question of how they ought to behave in an ideal world. Which thinker\'s approach does this resemble?',
  opts: ['Machiavelli, who studied the practice of power', 'Rousseau, who asked about the loss of freedom in society', 'Gandhi, who wrote Hind Swaraj', 'Ambedkar, who worked for social justice'],
  sol: 'Machiavelli of the 16th century is known for looking at how power is gained and held in practice. Rousseau, Gandhi and Ambedkar are linked with other concerns: freedom in society, self-rule, and the removal of social hierarchy.',
}));
Q('th_rousseau', mcq({
  t: 1, d: 3, c: 'understanding',
  stem: 'Which question about freedom is associated with Rousseau?',
  opts: ['People are free by nature, yet find themselves bound in society, so how can life under common rules be made consistent with freedom?', 'How can the largest army be raised at the lowest cost?', 'Why should property be distributed equally by the market?', 'How can the vote be limited to a small group?'],
  sol: 'Rousseau, writing in the 18th century, pointed to a tension between natural freedom and the bonds of society and asked how a society could be arranged so that obedience to rules would not destroy freedom. The other options are not questions that he is known for.',
}));
Q('th_marx', mcq({
  t: 1, d: 3, c: 'understanding',
  stem: 'Which idea is associated with Marx?',
  opts: ['Social change is shaped by economic arrangements and by conflict between classes', 'The best ruler is always a philosopher', 'Government rests on a contract that guarantees property', 'Self-rule begins with the mastery of oneself'],
  sol: 'Marx, of the 19th century, stressed the part of economic arrangements and class conflict in shaping history. The rule of philosophers is a theme of Plato, the contract on property relates to Locke, and self-rule through self-mastery belongs to Gandhi.',
}));
Q('th_gandhi', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'Hind Swaraj, a work that discusses self-rule, was written by Gandhi in',
  opts: ['1909', '1757', '1947', '1991'],
  sol: 'Gandhi wrote Hind Swaraj in 1909. The other years mark other events and do not belong to the book.',
}));

// ================================================================ theory in practice
Q('pr_art19', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'Which Article of the Constitution protects, among other freedoms, the freedom of speech and expression?',
  opts: ['Article 19', 'Article 17', 'Article 14', 'Article 25'],
  sol: 'Article 19 gives the freedom of speech and expression, among other freedoms. Article 17 abolishes untouchability, Article 14 provides equality before the law and Article 25 concerns freedom of religion.',
}));
Q('pr_art17', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'Which Article abolishes untouchability?',
  opts: ['Article 17', 'Article 19', 'Article 21', 'Article 25'],
  sol: 'Article 17 abolishes untouchability. Article 19 deals with freedoms, Article 21 with life and personal liberty and Article 25 with freedom of religion.',
}));
Q('pr_theory_app', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'Article 14 provides that the state shall not deny any person equality before the law. Which concept of political theory does this provision reflect?',
  opts: ['Equality', 'Nationalism', 'Secularism only', 'Federalism'],
  sol: 'A promise of equal treatment before the law applies the concept of equality. Nationalism, secularism and federalism are different concepts, and the provision is not mainly about any of them.',
}));
Q('pr_differ_app', mcq({
  t: 1, d: 4, c: 'evaluation',
  stem: 'In the imagined Pinecrest School, students differ on whether a school bus should give a seat first to the youngest or to those who live farthest away; each side says that its plan is the fairer one. This difference most clearly shows that',
  opts: ['an ideal such as fairness can be understood and applied in more than one way, which is why it needs reasoned debate', 'fairness has no meaning', 'only one side can speak in a debate', 'rules for a school bus have nothing to do with ideals'],
  sol: 'Each side appeals to fairness but applies it differently, which is why ideals call for reasoned discussion. Fairness does have meaning, both sides may argue, and rules about seats do involve ideals.',
}));
Q('pr_neutral_app', mcq({
  t: 1, d: 4, c: 'evaluation',
  stem: 'Which is the most suitable way for a student to write about a debated question such as the reservation of seats?',
  opts: ['People differ on this question; some give one set of reasons and others give another, and each can be weighed', 'Only one side is honest and the other is not', 'The question should never be discussed', 'The most popular opinion must be correct'],
  sol: 'A fair account gives the reasons put forward by each side and lets the reader weigh them. Declaring one side dishonest, refusing to discuss or treating popularity as proof would not be a reasoned approach.',
}));
Q('pr_gender_app', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'An imagined debating society in Fernwick argues about how equality between women and men should be applied in the sharing of household work. Which feature of political theory does this debate show?',
  opts: ['It takes an ideal such as equality and asks how it is to be understood and applied in practice', 'It collects only statistics', 'It avoids the topic of values', 'It records only the history of past events'],
  sol: 'The society is trying to understand and apply an ideal to a real situation, which is the work of political theory. Collecting only statistics, avoiding values or recording past events would not do that.',
}));
Q('pr_fr_why', mcq({
  t: 1, d: 3, c: 'understanding',
  stem: 'In what way do the Fundamental Rights show the link between political theory and the Constitution?',
  opts: ['They turn ideas such as freedom, equality and justice into rights that people can claim', 'They are unrelated to any idea of freedom or equality', 'They list the dates of earlier amendments', 'They describe the powers of the Election Commission'],
  sol: 'The Fundamental Rights give concrete form to ideals, so that persons can claim them. They are plainly related to freedom and equality, and they are neither a list of amendment dates nor a description of the Election Commission.',
}));

// ================================================================ why study
Q('w_reason_app', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'A rumour spreads at Westmere School that the principal will cancel the annual sports day. One student calls for a protest at once. Another asks who said it, what the rule actually says and what the effects of each choice would be. The second student shows how political theory helps us to',
  opts: ['reason about an issue with evidence and principles before reacting on impulse', 'ignore all rules', 'follow the crowd', 'avoid any decision'],
  sol: 'Asking for the source, the rule and the likely effects is reasoning about an issue before acting, which is what the study encourages. Ignoring rules, following the crowd and avoiding decisions are not reasoned responses.',
}));
Q('w_prejudice_app', mcq({
  t: 1, d: 4, c: 'application',
  stem: 'Tarun finds that he has always assumed that no student from a small village could lead a debate, until he listens to the winning speaker from Kelmarsh. Which benefit of studying political theory does his change of mind illustrate?',
  opts: ['It helps us to examine our own prejudices in the light of reasons and experience', 'It teaches us to defend every old assumption', 'It makes us avoid people who differ from us', 'It gives a fixed answer to every question'],
  sol: 'Tarun tests an assumption against evidence and gives it up, which is the examination of prejudice. Defending old assumptions, avoiding others or having ready answers would not follow from this study.',
}));
Q('w_tolerance_app', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'In the Orchard Vale club, a member who disagrees with the proposal is invited to speak first, and others listen before answering. This practice supports which aim of studying political theory?',
  opts: ['Democratic debate and tolerance of other views', 'Silencing opponents', 'Choosing a leader by force', 'Avoiding all discussion'],
  sol: 'Giving the dissenting member a hearing is a way of practising democratic debate and tolerance. Silencing, force and avoiding discussion would defeat that aim.',
}));

// ================================================================ assertion-reason
Q('ar_wider', ar({
  t: 1, d: 3, c: 'understanding', verdict: 'both-true-explains',
  a: 'Politics is not limited to the work of governments.',
  r: 'Families, schools and markets also make collective decisions that settle differences and share resources.',
  sol: 'Both are true, and R explains A: since groups outside government also reach shared decisions, politics extends beyond government.',
}));
Q('ar_normative', ar({
  t: 1, d: 3, c: 'understanding', verdict: 'A-false-R-true',
  a: 'Political theory only describes what exists and never asks what ought to be.',
  r: 'Political theory examines normative questions about what ought to be, as well as descriptive questions.',
  sol: 'A is false, since political theory also asks what ought to be. R is true and contradicts A.',
}));
Q('ar_clarify', ar({
  t: 1, d: 3, c: 'recall', verdict: 'both-true-not-explains',
  a: 'Political theory clarifies the meaning of concepts such as freedom and justice.',
  r: 'Gandhi wrote Hind Swaraj in 1909.',
  sol: 'Both statements are true, but the date of a book by Gandhi does not account for the fact that the subject clarifies concepts.',
}));
Q('ar_testall', ar({
  t: 1, d: 4, c: 'analysis', verdict: 'A-true-R-false',
  a: 'Reasoned debate is valuable in a democracy.',
  r: 'Political theory teaches that every opinion is equally correct and need not be tested with reasons.',
  sol: 'A is true, because debate lets people examine views. R is false, since the subject asks that opinions be tested with reasons and not accepted without testing.',
}));
Q('ar_impulse', ar({
  t: 1, d: 3, c: 'application', verdict: 'both-true-explains',
  a: 'Studying political theory helps us reason about issues instead of reacting on impulse.',
  r: 'It trains us to ask for reasons and to examine the meaning of the concepts used in an argument.',
  sol: 'Both are true, and R explains A: asking for reasons and examining concepts is exactly what replaces impulsive reaction.',
}));
Q('ar_party', ar({
  t: 1, d: 3, c: 'understanding', verdict: 'A-false-R-true',
  a: 'Politics refers only to what political parties do during election campaigns.',
  r: 'Politics is the process by which groups make collective decisions about living together and the use of power.',
  sol: 'A is false, since politics is much wider than campaigns. R is true and gives the standard definition.',
}));

// ================================================================ true-false, fill in the blank, match, ordering
Q('tf_gov', tf({
  t: 1, d: 2, c: 'understanding', ans: false,
  stem: 'Politics takes place only in government offices and legislatures, and never inside a family, a school or a market.',
  sol: 'Any group that takes collective decisions, even a household or a stall-holders\' meeting, engages in politics in the wider sense.',
}));
Q('tf_normative', tf({
  t: 1, d: 3, c: 'application', ans: true,
  stem: 'The question "Should the imagined town of Aldmere ban cars from its market square?" is a normative question.',
  sol: 'It asks what should be done, so it is normative, even though facts about traffic would be useful in answering it.',
}));
Q('tf_constitution', tf({
  t: 1, d: 2, c: 'understanding', ans: false,
  stem: 'Political theory has little connection with the provisions of the Constitution, since it deals only with imaginary societies.',
  sol: 'The ideas that political theory studies, such as freedom and equality, are the ideas behind constitutional provisions like the Fundamental Rights.',
}));
Q('fb_aristotle', fb({
  t: 1, d: 2, c: 'recall',
  stem: 'Aristotle regarded human beings as ___ beings by nature, who live in communities.',
  acc: [['political']],
  sol: 'Aristotle regarded human beings as political by nature.',
}));
Q('fb_hind', fb({
  t: 1, d: 2, c: 'recall',
  stem: 'Gandhi\'s Hind Swaraj was written in the year ___.',
  acc: [['1909', 'nineteen oh nine', 'nineteen nine']],
  sol: 'Hind Swaraj dates from 1909.',
}));
Q('fb_normative', fb({
  t: 1, d: 2, c: 'recall',
  stem: 'Questions about what ought to be are called ___ questions, while questions about what is are called descriptive.',
  acc: [['normative']],
  sol: 'Questions about what ought to be are normative.',
}));
Q('mt_thinkers', match({
  t: 1, d: 3, c: 'understanding', marks: 2,
  stem: 'Match each thinker with the idea or work associated with him.',
  pairs: [
    ['Aristotle', 'Human beings are political by nature'],
    ['Hobbes', 'A common authority is needed for security'],
    ['Marx', 'Class conflict and economic arrangements shape society'],
    ['Gandhi', 'Hind Swaraj (1909)'],
  ],
  sol: 'Aristotle is linked with the political nature of humans, Hobbes with the need for authority, Marx with class conflict and Gandhi with Hind Swaraj.',
}));
Q('mt_articles', match({
  t: 1, d: 3, c: 'understanding', marks: 2,
  stem: 'Match each Article of the Constitution with what it provides.',
  pairs: [
    ['Article 14', 'Equality before the law'],
    ['Article 17', 'Abolition of untouchability'],
    ['Article 19', 'Freedom of speech and expression, among other freedoms'],
    ['Article 25', 'Freedom of conscience and religion'],
  ],
  sol: 'Article 14 deals with equality before the law, Article 17 with untouchability, Article 19 with freedoms such as speech and Article 25 with freedom of religion.',
}));
Q('ord_ages', ord({
  t: 1, d: 3, c: 'understanding', marks: 2,
  stem: 'Arrange these thinkers from the earliest to the latest in time.',
  items: ['Aristotle', 'Machiavelli', 'Locke', 'Rousseau', 'Marx'],
  sol: 'Aristotle belongs to ancient Greece, Machiavelli to the 16th century, Locke to the 17th, Rousseau to the 18th and Marx to the 19th.',
}));
Q('ord_debate', ord({
  t: 1, d: 3, c: 'application', marks: 2,
  stem: 'Arrange these steps of a reasoned debate on a proposal at the Fernwick school council in a suitable order.',
  items: [
    'State the question to be decided',
    'Clarify the key words used by each side',
    'Give reasons for each view',
    'Test each view against objections',
    'Reach and state a considered conclusion',
  ],
  sol: 'A debate begins with the question, moves to clear meanings, then to reasons, then to objections and ends with a considered conclusion.',
}));

// ================================================================ short answers, 2 marks
Q('s_def', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Define politics in your own words and name one place other than the government where it can be seen.',
  model: 'Politics is the **process by which a group makes collective decisions** on how its members will live together, who gets what and how power is used. It can be seen in a **family** that decides how chores are shared.',
  sol: 'A definition and a place.',
  scheme: [['A definition: collective decisions, differences, power', 1], ['A suitable place other than the government', 1]],
}));
Q('s_aristotle', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State, in your own words, the idea of Aristotle about human beings and politics, and say what it implies for community life.',
  model: 'Aristotle held that human beings are **political by nature**. They live together in communities and share in decisions about common life, so **community life and public decisions** are natural to us and not an accident.',
  sol: 'The idea and its implication.',
  scheme: [['Humans are political by nature', 1], ['Community life and shared decisions follow', 1]],
}));
Q('s_negative', short({
  t: 1, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: 'Give one reason why people hold a negative view of politics and one reason why that view is incomplete.',
  model: 'People often notice **scheming and self-seeking** by some politicians. The view is incomplete because **politics also means collective decision-making** in families, schools and communities, which is necessary and often constructive.',
  sol: 'A reason and its limit.',
  scheme: [['A reason for the negative view', 1], ['A reason why it is incomplete', 1]],
}));
Q('s_canteen', short({
  t: 1, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'The student council of Pinecrest School argues about, and then votes on, a new rule for the canteen. Name two features of politics that this shows.',
  model: 'The council makes a **collective decision** for the whole school. Members begin with **different views**, which they settle by discussion and a vote. These features show politics in an ordinary school setting.',
  sol: 'Collective decision and difference.',
  scheme: [['A collective decision for the group', 1], ['Differences of view settled', 1]],
}));
Q('s_normdesc', short({
  t: 1, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'Distinguish a normative from a descriptive question, giving an imagined example of each from a town called Brookfield.',
  model: 'A **descriptive** question asks what is the case, for example how many libraries Brookfield has. A **normative** question asks what ought to be, for example whether Brookfield ought to open more libraries.',
  sol: 'A difference with examples.',
  scheme: [['Descriptive: what is, with an example', 1], ['Normative: what ought to be, with an example', 1]],
}));
Q('s_pt_def', short({
  t: 1, d: 2, c: 'recall', marks: 2, wl: S2,
  stem: 'What is political theory? Name any four concepts that it examines.',
  model: 'Political theory is the study of the **ideas and principles** that shape constitutions, governments and social life. It examines concepts such as **freedom, equality, justice and rights**, and also democracy, citizenship, nationalism and secularism.',
  sol: 'A definition and four concepts.',
  scheme: [['Ideas and principles that shape political life', 1], ['Any four concepts correctly named', 1]],
}));
Q('s_clarify', short({
  t: 1, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'In the Westmere debate club, two teams quarrel over a rule they call fair but mean different things by the word. How would political theory help them?',
  model: 'It would help them **clarify the meaning of fair**, for instance equal treatment of all or treatment according to need. Once each team states its meaning, they can **test the rule with reasons** instead of repeating one word.',
  sol: 'Clarify, then test.',
  scheme: [['Clarify the meaning of the concept', 1], ['Test the rule or view with reasons', 1]],
}));
Q('s_hind', short({
  t: 1, d: 2, c: 'recall', marks: 2, wl: S2,
  stem: 'Who wrote Hind Swaraj, in which year, and what is its central theme?',
  model: '**Gandhi** wrote **Hind Swaraj in 1909**. Its central theme is **swaraj**, or self-rule, understood not only as freedom from a foreign power but also as rule over oneself.',
  sol: 'Author, year and theme.',
  scheme: [['Gandhi, 1909', 1], ['Central theme: self-rule', 1]],
}));
Q('s_fr_theory', short({
  t: 1, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: 'Give two examples of Fundamental Rights that reflect the ideas studied in political theory.',
  model: 'Article 19, which gives freedom of speech and expression, reflects the idea of **freedom**. Article 14, which provides equality before the law, reflects the idea of **equality**. Article 17 reflects **justice**.',
  sol: 'Two rights and their ideas.',
  scheme: [['First right with its idea', 1], ['Second right with its idea', 1]],
}));
Q('s_tolerance', short({
  t: 1, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'How does studying political theory help a member of a club to deal with a fellow member who holds a different view?',
  model: 'It teaches the member to **ask for reasons** and to examine the other view fairly. The member learns to **listen and answer with arguments**, which supports tolerance and healthy debate and does not lead to quarrels.',
  sol: 'Reasons and tolerance.',
  scheme: [['Ask for and give reasons', 1], ['Tolerance of other views and healthy debate', 1]],
}));
Q('s_career', short({
  t: 1, d: 2, c: 'recall', marks: 2, wl: S2,
  stem: 'Name two careers or roles for which the study of political theory is useful and say why.',
  model: 'It is useful for **law** and **journalism**, and also for **administration**. These roles need careful reasoning about rights, justice and public decisions, and the ability to explain a viewpoint clearly.',
  sol: 'Two roles and a reason.',
  scheme: [['Two roles named', 1], ['A reason: reasoning about public questions', 1]],
}));
Q('s_citizen', short({
  t: 1, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: 'Why should every citizen, and not only students of the subject, know something about political theory?',
  model: 'Every person is a **citizen** who is affected by decisions made collectively and who may take part in them. Knowing the ideas behind those decisions lets a citizen **judge them with reasons** and speak up in public life.',
  sol: 'Citizens are affected and take part.',
  scheme: [['Every person is affected by politics', 1], ['Understanding helps judge and take part', 1]],
}));

// ================================================================ short answers, 3 marks
Q('s3_everywhere', short({
  t: 1, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'Using the examples of a household, a school and a market, show that politics is found in every area of social life.',
  model: 'In a **household**, members decide how chores and savings are shared. In a **school**, a council decides rules such as those for the canteen. In a **market**, traders agree on how stalls are allotted and disputes settled. Each is a **group making collective decisions**, so politics is part of social life.',
  sol: 'Three settings with the common feature.',
  scheme: [['Household example', 1], ['School and market examples', 1], ['The common feature: collective decision by a group', 1]],
}));
Q('s3_views', short({
  t: 1, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Compare the popular view of politics with the wider view.',
  model: 'The **popular view** sees politics as **manipulation and the pursuit of self-interest** by politicians. The **wider view** sees politics as the activity by which any society or group **makes collective decisions, resolves differences and pursues common goals**. The wider view shows that politics touches everyone.',
  sol: 'Two views compared.',
  scheme: [['Popular view: scheming and self-interest', 1], ['Wider view: collective decisions, differences and goals', 1], ['Politics touches everyone', 1]],
}));
Q('s3_classify', short({
  t: 1, d: 4, c: 'application', marks: 3, wl: S3,
  stem: 'Classify each as descriptive or normative and give a reason: (i) Marlow district has 40 polling booths. (ii) Marlow district ought to have more polling booths. (iii) Most Marlow voters reached a booth within ten minutes.',
  model: 'Statement (i) is **descriptive**, since it reports a fact about the number of booths that anyone can check by counting. Statement (ii) is **normative**, since it says what **ought** to be done and rests on a judgment of value. Statement (iii) is **descriptive**, since it reports what voters experienced and this can be checked by a survey.',
  sol: 'Each statement classified with a reason.',
  scheme: [['Statement (i) with reason', 1], ['Statement (ii) with reason', 1], ['Statement (iii) with reason', 1]],
}));
Q('s3_rousseau', short({
  t: 1, d: 4, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain in simple words the question about freedom that Rousseau raised, and say why it is still discussed.',
  model: 'Rousseau, of the **18th century**, saw that people are **free by nature** yet find themselves **bound by rules and inequalities** in society. He asked how a society could be arranged so that obeying common rules does not destroy freedom. The question remains alive because **every society limits freedom** to some extent.',
  sol: 'The question and its continuing relevance.',
  scheme: [['People free by nature but bound in society', 1], ['How to reconcile freedom with common rules', 1], ['Relevance: every society limits freedom', 1]],
}));
Q('s3_debates', short({
  t: 1, d: 4, c: 'evaluation', marks: 3, wl: S3,
  stem: 'Why do debates arise on how an ideal such as equality should be applied, as in the discussion of reservation or of gender equality? Present the matter neutrally.',
  model: 'An ideal such as equality can be **understood in more than one way**, so people differ on how to apply it. On reservation or on gender equality, **some give one set of reasons and others another**. Political theory asks that each view be **weighed with reasons**.',
  sol: 'Differing readings of an ideal.',
  scheme: [['An ideal can be understood in more than one way', 1], ['People differ on application, with reasons on each side', 1], ['Views weighed with reasons', 1]],
}));
Q('s3_why', short({
  t: 1, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: 'State any three reasons for studying political theory.',
  model: 'First, everyone is a **citizen** and is affected by politics. Second, it helps us **reason about issues** instead of reacting on impulse and **examine our own prejudices**. Third, it supports **democratic debate and tolerance** of other views, and prepares us for law, administration and journalism.',
  sol: 'Any three reasons.',
  scheme: [['First reason', 1], ['Second reason', 1], ['Third reason', 1]],
}));
Q('s3_thinkers', short({
  t: 1, d: 3, c: 'recall', marks: 3, wl: S3,
  stem: 'Name three thinkers of political theory from different periods and state one idea of each.',
  model: '**Aristotle** of ancient Greece said that humans are political by nature. **Locke** of the 17th century argued that government rests on consent and must protect natural rights. **Ambedkar** of the 20th century worked for social justice and the removal of caste hierarchy.',
  sol: 'Three thinkers with an idea each.',
  scheme: [['First thinker with idea', 1], ['Second thinker with idea', 1], ['Third thinker with idea', 1]],
}));

// ================================================================ long answers, 5 marks
Q('l_politics', long({
  t: 1, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Explain the meaning of politics, bringing out the difference between popular and wider views.',
  model: '1. Many people see politics as **manipulation or self-interest** of politicians. This is the popular view.\n2. Aristotle held that human beings are **political by nature** and live in communities.\n3. In the wider view, politics is the activity by which a society **makes collective decisions, resolves differences and pursues common goals**.\n4. It is found in the **family, school, market and government**.\n5. In short, politics is the process by which groups decide how to live together, who gets what and how power is used.',
  sol: 'Views and a definition.',
  scheme: [['The popular view', 1], ['Aristotle: humans political by nature', 1], ['Wider view: collective decisions and goals', 1], ['Places where politics appears', 1], ['The standard definition', 1]],
}));
Q('l_pt', long({
  t: 1, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'What does political theory do? Explain with examples.',
  model: '1. Political theory is the study of the **ideas and principles** behind constitutions, governments and everyday social arrangements.\n2. Among the concepts it examines are **freedom, equality, justice, rights, democracy, citizenship, nationalism and secularism**.\n3. Besides descriptive questions about what is, it raises **normative questions** on what ought to be done.\n4. It **clarifies the meaning** of concepts, for example what we mean by fair.\n5. It **tests opinions with reasons** so that debate rests on arguments.',
  sol: 'Studies, asks and clarifies.',
  scheme: [['Ideas and principles studied', 1], ['Concepts examined', 1], ['Normative as well as descriptive questions', 1], ['Clarifies meanings', 1], ['Tests opinions with reasons', 1]],
}));
Q('l_thinkers', long({
  t: 1, d: 3, c: 'recall', marks: 5, wl: L5,
  stem: 'Describe the ideas of any five thinkers of political theory, with the century of each.',
  model: '1. **Aristotle** (ancient Greece) held that human beings are political by nature and live in communities.\n2. **Machiavelli** (16th century) studied how rulers gain and hold power in practice.\n3. **Hobbes** (17th century) argued that a common authority is needed so that people can live in security.\n4. **Locke** (17th century) argued that government rests on consent and must protect natural rights.\n5. **Rousseau** (18th century) asked how freedom can be kept while living under common rules in society.',
  sol: 'Five thinkers with centuries.',
  scheme: [['First thinker with idea and period', 1], ['Second thinker', 1], ['Third thinker', 1], ['Fourth thinker', 1], ['Fifth thinker', 1]],
}));
Q('l_practice', long({
  t: 1, d: 4, c: 'analysis', marks: 5, wl: L5,
  stem: 'How are ideals such as freedom and equality debated and applied in practice? Refer to the Fundamental Rights.',
  model: '1. An ideal can be **read in more than one way**, and so people may differ about how it is to be put into practice.\n2. Debates on **reservation, gender equality and freedom of expression** show that people differ on these questions.\n3. Each side gives reasons, and political theory asks that they be **weighed**.\n4. The **Fundamental Rights** turn ideas into rights, for example **Article 19** on freedom of speech and expression.\n5. **Article 14** on equality before the law and **Article 17** abolishing untouchability apply equality and justice.',
  sol: 'Debate and constitutional application.',
  scheme: [['Ideals can be read in more than one way', 1], ['Examples of debates, neutrally stated', 1], ['Reasons weighed', 1], ['Fundamental Rights reflect theory (Article 19)', 1], ['Articles 14 and 17 as applications', 1]],
}));
Q('l_why', long({
  t: 1, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Why should we study political theory? Give five reasons.',
  model: '1. Every person is a **citizen** who lives under collective decisions and is affected by politics.\n2. The study helps us to **reason about issues** with evidence and principles instead of reacting on impulse.\n3. It helps us to **examine our own prejudices** and to revise them when reasons require.\n4. It prepares us for roles and careers in **law, administration and journalism**.\n5. It supports **democratic debate and tolerance** of views that differ from our own.',
  sol: 'Five reasons.',
  scheme: [['Citizens affected by politics', 1], ['Reasoning instead of impulse', 1], ['Examining prejudices', 1], ['Careers and roles', 1], ['Democratic debate and tolerance', 1]],
}));
Q('l_normdesc', long({
  t: 1, d: 4, c: 'application', marks: 5, wl: L5,
  stem: 'Explain the difference between descriptive and normative questions with imagined examples from a school council, and say why political theory needs both.',
  model: '1. A **descriptive** question asks what is the case, for example how many students use the canteen.\n2. A **normative** question asks what ought to be, for example whether the canteen ought to stop selling fried snacks.\n3. Descriptive answers rest on **facts** that can be checked.\n4. Normative answers rest on **values and reasons** that must be argued.\n5. Political theory needs both, since **facts inform** a decision while **values guide** what to do.',
  sol: 'Two kinds of question, and why both matter.',
  scheme: [['Descriptive question with example', 1], ['Normative question with example', 1], ['Facts versus values', 1], ['Reasons needed for normative answers', 1], ['Why both are needed', 1]],
}));

// ================================================================ case-based (4 marks: 1 + 1 + 2)
Q('c_council', caseQ({
  t: 1, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the extract from imagined minutes and answer the questions that follow. *(Imagined minutes written by SOYL for practice; Hollin Park School and its council are not real.)*',
  passage: '**Minutes of the Hollin Park School Council (imagined)**\n\nThe council met to decide the new rules for the school canteen. Some members said that the canteen should stop selling sweet drinks, because they harm health. Others said that students should be free to buy what they like. After a long discussion, the council voted 11 to 7 to sell sweet drinks only on Fridays. The council agreed to review the rule at the end of the term.',
  parts: [
    child('a', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'Name one feature of politics shown in the minutes.', model: 'A **collective decision** was taken by a vote after a difference of views.', sol: 'The vote settled a difference.', scheme: [['A feature named correctly', 1]] })),
    child('b', short({ t: 1, d: 3, c: 'application', marks: 1, stem: 'Is the statement "sweet drinks harm health" mainly descriptive or normative?', model: '**Descriptive**, since it reports a claim about what is the case and can be checked with evidence.', sol: 'It claims a fact.', scheme: [['Descriptive, with reason', 1]] })),
    child('c', short({ t: 1, d: 4, c: 'analysis', marks: 2, stem: '**Either** (i): Which statement in the minutes is normative? Explain what makes it so.', model: 'The statement that students **should be free to buy what they like** is normative. It says what **ought** to be allowed and rests on a **value**, freedom of choice, and not on a fact.', sol: 'A statement of what should be.', scheme: [['The statement identified', 1], ['Reason: says what ought to be, rests on a value', 1]] }), [
      short({ t: 1, d: 4, c: 'analysis', marks: 2, stem: '**Or** (ii): Why did the council agree to review the rule at the end of the term? Link your answer to political theory.', model: 'Because views **differ** and the decision rests on values and reasons, a **review** lets the council test the rule against experience. Political theory asks that opinions be **tested with reasons**.', sol: 'Review as testing with reasons.', scheme: [['Views differ and the rule can be tested', 1], ['Link with testing opinions with reasons', 1]] }),
    ]),
  ],
}));
Q('c_notice', caseQ({
  t: 1, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the notice and answer the questions that follow. *(An imagined household notice written by SOYL for practice; the Vasanth family of Ferngate is not real.)*',
  passage: '**Notice on the fridge door of the Vasanth family (imagined)**\n\nAfter the family meeting on Sunday: (1) Everyone will take turns to cook dinner, one day each. (2) Grandmother\'s suggestion to have a quiet hour after dinner was accepted by all. (3) Ravi wanted a later bedtime on weekends, but the others did not agree, so the matter will be discussed again next month. (4) The family agreed that no one will decide the household budget alone.',
  parts: [
    child('a', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'Name the group that is making collective decisions in the notice.', model: 'The **Vasanth family**, meeting as a household.', sol: 'The family is the group.', scheme: [['Group named', 1]] })),
    child('b', short({ t: 1, d: 3, c: 'application', marks: 1, stem: 'Which point in the notice shows that differences of view are being settled?', model: 'Point (3), where Ravi\'s wish was **discussed**, and the family agreed to return to it later.', sol: 'Point (3) shows a difference.', scheme: [['Point (3) named with reason', 1]] })),
    child('c', short({ t: 1, d: 4, c: 'analysis', marks: 2, stem: '**Either** (i): How does the decision in point (4) relate to the use of power in the household?', model: 'Point (4) says that **no one will decide the budget alone**, so power over money is **shared** among the members. This answers the question of **how power is used** in the group.', sol: 'Shared power.', scheme: [['Power is shared', 1], ['Link with how power is used', 1]] }), [
      short({ t: 1, d: 4, c: 'application', marks: 2, stem: '**Or** (ii): Why can this household be said to practise politics in the wider sense, even though no government official is present?', model: 'Politics in the wider sense is **collective decision-making** by a group. The family shares duties, settles differences and decides together, so it practises politics **without any official present**.', sol: 'Wider sense of politics.', scheme: [['Collective decision-making by a group', 1], ['Household shares duties and settles differences', 1]] }),
    ]),
  ],
}));
Q('c_table', caseQ({
  t: 1, d: 4, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the table and answer the questions that follow. *(An imagined table of statements from a debate in the Larkmoor Youth Forum, written by SOYL for practice.)*',
  passage: '**Statements made in the Larkmoor Youth Forum (imagined)**\n\n| Speaker | Statement |\n|---|---|\n| Nisha | The forum has 60 registered members |\n| Dev | The forum ought to let every member speak for the same length of time |\n| Anika | Fewer than half the members attended the last meeting |\n| Kabir | Members should not be allowed to interrupt a speaker |',
  parts: [
    child('a', short({ t: 1, d: 3, c: 'application', marks: 1, stem: 'Which speaker has made a descriptive statement about the number of members?', model: '**Nisha**, who reports how many members are registered.', sol: 'A fact about membership.', scheme: [['Nisha', 1]] })),
    child('b', short({ t: 1, d: 3, c: 'application', marks: 1, stem: 'Name a speaker who has made a normative statement.', model: '**Dev** or **Kabir**, since each says what the forum or its members ought to do.', sol: 'Statements with ought or should.', scheme: [['Dev or Kabir', 1]] })),
    child('c', short({ t: 1, d: 4, c: 'analysis', marks: 2, stem: '**Either** (i): Anika\'s statement is descriptive. Explain how it could still be useful to Dev when he argues for his proposal.', model: 'Anika\'s statement gives a **fact**: attendance was low. Dev may use it to argue that **equal speaking time** would make more members want to attend, so facts **inform** a normative argument.', sol: 'Facts inform a normative argument.', scheme: [['The fact is descriptive', 1], ['It informs the normative argument', 1]] }), [
      short({ t: 1, d: 4, c: 'analysis', marks: 2, stem: '**Or** (ii): How can the forum test Kabir\'s statement with reasons?', model: 'The forum can ask for **reasons on each side**. For example, a ban on interruption **protects each speaker**, but it may also **prevent a quick correction**. Weighing these reasons tests the statement.', sol: 'Reasons on both sides.', scheme: [['Ask for reasons on each side', 1], ['Weigh them against each other', 1]] }),
    ]),
  ],
}));
Q('c_news', caseQ({
  t: 1, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the newspaper report and answer the questions that follow. *(An imagined newspaper report written by SOYL for practice; Oakridge and its Market Committee are not real.)*',
  passage: '**Oakridge Courier (imagined): Traders agree on a plan for the market lane**\n\nThe stall-holders of the Oakridge Thursday market met on Wednesday to decide how the narrow market lane would be shared. Some traders asked that the best places be given by lots, while others asked that the oldest stall-holders get the first choice. Both groups gave reasons. After two hours of discussion, the committee agreed to rotate the best places every month.',
  parts: [
    child('a', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'Which question from the definition of politics is the traders\' meeting trying to answer?', model: '**Who gets what**, that is, how the best places are shared.', sol: 'It concerns sharing places.', scheme: [['Who gets what', 1]] })),
    child('b', short({ t: 1, d: 3, c: 'application', marks: 1, stem: 'How did the traders settle their difference?', model: 'By **discussion**, which ended in an agreement to **rotate** the best places every month.', sol: 'Discussion and compromise.', scheme: [['Discussion and agreement', 1]] })),
    child('c', short({ t: 1, d: 4, c: 'evaluation', marks: 2, stem: '**Either** (i): Which ideal does the plan to rotate the best places appear to serve? Give a reason.', model: 'It appears to serve **fairness**, or equality of chance, because **each trader gets a turn** at the best places. It also respects the claims of the older traders by sharing the benefit over time.', sol: 'Fairness through rotation.', scheme: [['Fairness or equality named', 1], ['Reason: each trader gets a turn', 1]] }), [
      short({ t: 1, d: 4, c: 'analysis', marks: 2, stem: '**Or** (ii): Why does the report show that politics is found outside government?', model: 'The **market traders**, with no government official in charge, took **collective decisions** about sharing places and settled differences. This shows that politics exists in **ordinary groups**.', sol: 'Collective decision in a market.', scheme: [['Traders took collective decisions', 1], ['Politics exists in ordinary groups', 1]] }),
    ]),
  ],
}));
Q('c_letter', caseQ({
  t: 1, d: 4, c: 'evaluation', origin: 'soyl-original',
  stem: 'Read the letter and answer the questions that follow. *(An imagined letter written by SOYL for practice; Sana of Westmere School and her cousin are not real.)*',
  passage: '**A letter from Sana to her cousin (imagined)**\n\nDear Hamid,\nYou say that politics is nothing but cheating and that studying it is a waste of time. I used to think so too. But in our class we had to decide how to share the use of the school\'s single computer room, and it showed me how a group makes a decision. We also had to ask what we meant by a fair share. When I looked at my first opinion again, I found that I had judged all politicians by a few I had read about.\nYours, Sana',
  parts: [
    child('a', short({ t: 1, d: 2, c: 'understanding', marks: 1, stem: 'Which view of politics does Hamid hold?', model: 'The **popular view**, that politics is cheating and manipulation.', sol: 'Hamid sees politics as cheating.', scheme: [['Popular view', 1]] })),
    child('b', short({ t: 1, d: 3, c: 'application', marks: 1, stem: 'Which activity in the letter shows political theory clarifying a concept?', model: 'Asking **what is meant by a fair share** of the computer room.', sol: 'Clarifying fair.', scheme: [['Asking what a fair share means', 1]] })),
    child('c', short({ t: 1, d: 4, c: 'evaluation', marks: 2, stem: '**Either** (i): Which benefit of studying political theory does Sana\'s last sentence show? Explain.', model: 'It shows that the study helps us to **examine our own prejudices**. Sana saw that she had **judged all politicians** by a few examples and revised her opinion with reasons.', sol: 'Examining prejudice.', scheme: [['Examining prejudice named', 1], ['Explanation from the letter', 1]] }), [
      short({ t: 1, d: 4, c: 'evaluation', marks: 2, stem: '**Or** (ii): Write two points that Sana might add to persuade Hamid that the study is useful.', model: 'It helps us **reason about issues** before reacting, and it prepares us for roles such as **law, administration and journalism**. It also supports **respectful debate** among people who differ.', sol: 'Two useful points.', scheme: [['First point', 1], ['Second point', 1]] }),
    ]),
  ],
}));
