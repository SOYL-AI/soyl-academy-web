// CBSE 11 Political Science, ch12 Freedom: question bank. Every passage (council register, newspaper report, letter,
// notice) is written by SOYL and labelled as imagined; the towns Arvelle, Kellin, Dorrow, Mirrenhall, Pellam and Tavish,
// the play The Last Ferry and all people in scenarios are imagined. No NCERT text, boxed source, cartoon, Constitution
// text, quotation of any thinker, court judgment or board/sample-paper item is reused (D-036). Articles are cited by
// number with a paraphrase of what they provide.
import { Q, mcq, ar, tf, fb, match, ord, short, long, caseQ, child } from '../../cbse-11-political-science-ch01/src/lib.mjs';

const S2 = [30, 50];
const S3 = [50, 80];
const L5 = [80, 120];

// ================================================================ t01: the ideal of freedom
Q('m_free_def', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Which statement gives the standard definition of freedom in political theory?',
  opts: ['The absence of external constraints, together with conditions in which people can develop their talents and make choices', 'The right of each person to do whatever he or she pleases, whatever the rules', 'The ability of a government to act without being questioned', 'The possession of great wealth'],
  sol: 'Freedom has two sides: no unjustified external constraints, and the presence of conditions in which a person can grow and choose. Doing anything at all, unquestioned government power and wealth are not what the definition describes.',
}));
Q('m_struggle', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Books such as Long Walk to Freedom (1994) and Freedom from Fear (1991) are written by leaders who resisted rule imposed on their people. Which idea of freedom do such books bring out?',
  opts: ['Freedom as the struggle against domination and external control', 'Freedom as a gift that needs no effort', 'Freedom as the end of all rules', 'Freedom as a matter only for the rich'],
  sol: 'The two books are named only as examples of the idea that freedom is won by resisting domination. They do not present freedom as effortless, rule-free or the privilege of the rich.',
}));
Q('m_sources', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'Which pair names the two broad sources of constraints on freedom discussed in political theory?',
  opts: ['Domination and external control, and social and economic inequality', 'Elections and political parties', 'Taxes and prices', 'Schools and hospitals'],
  sol: 'Constraints come from domination and external control, whether by force or by laws imposed without consent, and from social and economic inequality. Elections, parties, taxes, prices, schools and hospitals are not named as the two sources.',
}));
Q('m_constraint_app', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'In the imagined town of Arvelle, a governor appointed from far away announces new rules on markets and meetings. No resident was asked, and anyone who objects is turned away by guards. This is mainly an example of a constraint that arises from',
  opts: ['domination and external control, with rules imposed without consent', 'social inequality inside the community', 'a lack of rules in public places', 'a freely accepted community decision'],
  sol: 'Rules made without the consent of those who live under them, and backed by force, are domination and external control. Inequality, an absence of rules or a freely accepted decision does not describe the case.',
}));
Q('m_ineq_app', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'In the imagined village of Tavish, children of one community are not allowed to sit with the others in the village school, and they leave early. Which source of constraint on freedom does this show?',
  opts: ['Social inequality, here exclusion based on birth', 'Domination by a foreign ruler', 'The need for traffic rules', 'Too many elections'],
  sol: 'Exclusion based on the community of birth is a social inequality that limits what the children can become. Foreign rule, traffic rules and elections are not at issue.',
}));
Q('m_poverty_app', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'Sana of the imagined town of Pellam is a gifted painter, but her family is so poor that she must work all day and has never held a brush. No one forbids her to paint. Her freedom is limited mainly by',
  opts: ['economic inequality, which denies her the conditions to develop her talent', 'a law that bans painting', 'a lack of any rules in Pellam', 'her own dislike of art'],
  sol: 'Nothing forbids her, yet poverty stops her from developing her talent. This is a limit on freedom from economic inequality. No law bans painting in the case, and she has no dislike of art.',
}));
Q('m_need_rules', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Why do political theorists accept that some constraints on individuals are necessary even in a free society?',
  opts: ['People living together need rules, and rules that protect everyone\'s freedom can be justified', 'Freedom is harmful in every form', 'Only rulers should be free', 'Constraints make people equal in wealth'],
  sol: 'Without rules, the freedom of the strong could destroy the freedom of others. Rules accepted by legitimate procedures can therefore protect freedom. Freedom is not harmful in every form, and constraints do not by themselves create equal wealth.',
}));
Q('m_legit', mcq({
  t: 1, d: 4, c: 'analysis',
  stem: 'Three imagined rules are proposed for Kellin. (i) A rule that bicycles keep to the left of the road, adopted after an open meeting and a vote. (ii) A rule, issued overnight by one official, that no resident may gather in a group of three. (iii) A rule that only one family may use the river bank. Which rule best fits the idea of a justified constraint that protects freedom?',
  opts: ['Rule (i), because it was accepted through a legitimate procedure and protects everyone\'s safe movement', 'Rule (ii), because officials may make any rule', 'Rule (iii), because tradition favours one family', 'All three, because every rule is justified'],
  sol: 'A rule decided openly, by a fair procedure, that protects safe movement for all is the kind of constraint that serves freedom. A secret overnight order and a rule that favours one family would take freedom away.',
}));

// ================================================================ t01: negative and positive liberty
Q('m_neg_def', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Negative liberty refers to',
  opts: ['a minimum area of non-interference in which a person can act without restraint by others or the state', 'the presence of education, health and resources', 'the duty to obey all laws without question', 'the power to make laws for others'],
  sol: 'Negative liberty is freedom from interference: a protected space of action. Education, health and resources belong to positive liberty. Obedience and law-making power are not what the term means.',
}));
Q('m_pos_def', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Positive liberty is best described as',
  opts: ['freedom to act and develop, which needs enabling conditions such as education, health and resources', 'freedom from all taxes', 'the absence of any person who can give advice', 'a ban on every kind of state action'],
  sol: 'Positive liberty is the freedom to develop and to choose, and it depends on enabling conditions. Freedom from taxes, avoiding advice or banning state action are not its meaning.',
}));
Q('m_berlin', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Which thinker made the distinction between negative and positive liberty famous?',
  opts: ['Isaiah Berlin', 'J. S. Mill, who wrote On Liberty in 1859', 'Nelson Mandela', 'Aung San Suu Kyi'],
  sol: 'The distinction is associated with Isaiah Berlin. Mill is known for the harm principle, and the other two are named as authors of books on the struggle for freedom.',
}));
Q('m_neg_app', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'In the imagined town of Dorrow, a rule says that no official may read a resident\'s private letters or tell residents which books to read. Residents may think, read and write as they please. This rule protects mainly',
  opts: ['negative liberty, an area free from interference', 'positive liberty, by giving everyone a scholarship', 'economic equality', 'the power of the council to rule on all matters'],
  sol: 'A rule that keeps officials out of private matters protects a space of non-interference, which is negative liberty. It gives no scholarship, does not equalise incomes and does not enlarge the council\'s power.',
}));
Q('m_pos_app', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'The council of the imagined town of Mirrenhall builds a free library, a night school and a clinic so that every child, however poor, can learn and keep well. Which kind of liberty is the council trying to expand?',
  opts: ['Positive liberty, by creating enabling conditions', 'Negative liberty, by removing all state action', 'Neither, since freedom has nothing to do with learning', 'Only the freedom to pay taxes'],
  sol: 'Libraries, schools and clinics supply the conditions in which people can develop and choose, which is positive liberty. They are state action, so they do not remove it, and learning is connected with freedom.',
}));
Q('m_both_app', mcq({
  t: 1, d: 4, c: 'analysis',
  stem: 'Joran of the imagined village of Tavish is not stopped from doing anything. Yet he is too ill and too poor to get an education or to move to a town where he could use his talents. Which statement about Joran is correct?',
  opts: ['He enjoys negative liberty but lacks conditions of positive liberty', 'He has full positive liberty but no negative liberty', 'He lacks both kinds of liberty because he is ill', 'He is fully free because no one interferes with him'],
  sol: 'Nobody interferes with him, which is negative liberty, but illness and poverty deny him the conditions to develop and choose. Freedom is not complete on the strength of non-interference alone.',
}));
Q('m_conflict', mcq({
  t: 1, d: 4, c: 'analysis',
  stem: 'The council of imagined Kellin raises a tax to fund a free clinic. Councillor Maya says the tax interferes with what citizens may do with their own money. Councillor Hari says the clinic gives poorer residents the health to use their freedom. What does this disagreement show?',
  opts: ['The two ideas of liberty can pull in different directions, and thinkers stress one or the other', 'Positive liberty is never a concern of a state', 'Negative liberty is of no value', 'Both councillors have misunderstood freedom entirely'],
  sol: 'Maya reasons from non-interference and Hari from enabling conditions. The case shows that action to widen one kind of liberty can appear to reduce the other. Neither kind is shown to be worthless.',
}));
Q('m_complement', mcq({
  t: 1, d: 3, c: 'understanding',
  stem: 'Which statement shows how negative and positive liberty can complement each other?',
  opts: ['A person gains most when there is a protected area of choice and also the education and health to make use of it', 'Positive liberty makes a protected area of choice unnecessary', 'Negative liberty makes education unnecessary', 'The two ideas have nothing to do with each other'],
  sol: 'A protected space is of limited use without the capacity to use it, and capacity is of limited use if others can interfere at will. So each supports the other. Neither makes the other unnecessary.',
}));

// ================================================================ t02: harm principle
Q('m_harm_def', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'According to the harm principle, the state or society may restrict a person\'s freedom of action only',
  opts: ['to prevent harm to others', 'to make the person more virtuous', 'whenever the majority dislikes the action', 'to raise revenue'],
  sol: 'The harm principle allows interference to prevent harm to others. Making people virtuous, pleasing a majority and raising revenue are not grounds it accepts.',
}));
Q('m_mill_name', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'The harm principle is associated with which thinker and work?',
  opts: ['J. S. Mill, On Liberty (1859)', 'Isaiah Berlin, on the two kinds of liberty', 'Nelson Mandela, Long Walk to Freedom (1994)', 'Aung San Suu Kyi, Freedom from Fear (1991)'],
  sol: 'Mill set out the harm principle in On Liberty in 1859. Berlin is linked with negative and positive liberty, and the other two titles are books on the struggle for freedom.',
}));
Q('m_self_app', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'Bram of the imagined town of Pellam spends every Sunday alone in his own room studying chess, and he sleeps through the afternoon. His neighbours think he wastes his time. In the language of the harm principle, his Sunday habit is',
  opts: ['a self-regarding action, which affects only himself', 'an other-regarding action that harms the neighbours', 'a crime that deserves legal punishment', 'an action the state must stop at once'],
  sol: 'The habit affects only Bram, so it is self-regarding. Neighbours\' disapproval of how he spends his time does not turn it into harm to others, so it is not a ground for punishment or for stopping it.',
}));
Q('m_other_app', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'A factory owner in the imagined town of Tavish drains chemical waste into a stream from which the villagers draw their drinking water. Which description fits this action under the harm principle?',
  opts: ['An other-regarding action that harms others, so restriction can be justified', 'A self-regarding action protected from interference', 'An action with no effect on anyone', 'A matter that only the factory owner can judge'],
  sol: 'The waste harms villagers, so the action is other-regarding, and the harm principle allows the state to restrict it. A self-regarding action affects only the actor, and here others are affected.',
}));
Q('m_minor_app', mcq({
  t: 2, d: 4, c: 'application',
  stem: 'Ondrea of the imagined town of Pellam practises the drum every evening for an hour, and two neighbours find it annoying but are not injured. Which response best suits the view that minor harms call for social disapproval rather than legal punishment?',
  opts: ['The neighbours ask her to play more quietly, and the community expresses its disapproval', 'She is sent to prison', 'All drums are banned in Pellam', 'Nothing may ever be said to her'],
  sol: 'A small annoyance may call for social disapproval and a polite request. Prison or a town-wide ban would be out of proportion, while saying nothing at all ignores the minor harm.',
}));
Q('m_serious_app', mcq({
  t: 2, d: 4, c: 'application',
  stem: 'Several drivers in the imagined town of Kellin race through a school zone at closing time, and children have been injured. Under the harm principle, what kind of response is justified?',
  opts: ['Legal restriction and punishment, since the harm to others is serious', 'Only mild social disapproval', 'No response, since the drivers are free to act', 'Closing the schools'],
  sol: 'Injury to children is a serious harm to others, which can justify legal restriction and punishment. Mild disapproval is too little, doing nothing ignores the harm, and closing the schools punishes the wrong people.',
}));
Q('m_hp_not', mcq({
  t: 2, d: 4, c: 'analysis',
  stem: 'The council of the imagined town of Mirrenhall forbids residents to wear red scarves in their own homes because some councillors think red is ugly. Why does the harm principle not support this rule?',
  opts: ['Wearing a scarf at home harms no one else, so the ground of preventing harm to others is missing', 'Because scarves are expensive', 'Because councils may never make rules', 'Because red scarves cause serious harm to others'],
  sol: 'The rule restricts a self-regarding action on the ground of taste. The harm principle allows restriction only to prevent harm to others, and none is shown. Councils may make rules, and scarves cause no serious harm.',
}));

// ================================================================ t02: freedom of expression
Q('m_mill_reason', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'One of Mill\'s reasons for protecting freedom of expression is that',
  opts: ['even a view that is mostly false may contain some part of the truth', 'only views held by the majority deserve a hearing', 'false views should be silenced at once', 'debate wastes time'],
  sol: 'A view that is largely wrong may still carry a part of the truth, and silencing it would lose that part. Majority views alone, silencing falsehood and the wastefulness of debate are not his reasons.',
}));
Q('m_dogma_app', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'In a school of the imagined town of Arvelle, pupils recite a rule of grammar every morning but are never allowed to question it or to hear any other rule. By the end, none can explain why the rule is right. Which idea about unchallenged truths does this illustrate?',
  opts: ['A truth that is never challenged can become a dead dogma, held without understanding', 'A truth becomes stronger when nobody questions it', 'Questioning is dangerous to every truth', 'Recitation is the best way to learn'],
  sol: 'A belief never examined or defended is held without understanding, which is the idea of dead dogma. Pupils who cannot explain the rule show it. The other options reverse that point.',
}));
Q('m_clash_app', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'Before deciding where to build a bridge, the imagined council of Dorrow holds an open meeting where engineers, boatmen and farmers argue against each other. A much better plan emerges. Which reason for free expression does this illustrate?',
  opts: ['Truth and better judgement emerge through the clash of opinions', 'False views should never be heard', 'Only experts may speak', 'Disagreement should be avoided'],
  sol: 'A better plan came from contending views meeting each other, which is the idea that truth emerges through a clash of opinions. The other statements would have shut out the farmers and boatmen.',
}));
Q('m_19_1a', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'A student of the imagined Pellam College asks her teacher which provision of the Indian Constitution protects the freedom of speech and expression of its citizens. What should the teacher answer?',
  opts: ['Article 19(1)(a)', 'Article 21A', 'Article 32', 'Article 51A'],
  sol: 'Speech and expression are protected by Article 19(1)(a). The other Articles deal with education, constitutional remedies and fundamental duties.',
}));
Q('m_19_2', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Which of the following is a ground on which Article 19(2) allows reasonable restrictions on freedom of speech and expression?',
  opts: ['Defamation', 'Dislike of a minister\'s policy', 'Embarrassment to a local official', 'The unpopularity of an opinion'],
  sol: 'Defamation is among the listed grounds. Dislike of a policy, embarrassment to an official or the unpopularity of an opinion is not a ground, so a restriction on such a basis would not be allowed.',
}));
Q('m_ban_app', mcq({
  t: 2, d: 4, c: 'application',
  stem: 'Some residents of imagined Arvelle demand that a play called The Last Ferry be banned. Which approach to the demand best fits the view that constraints on expression should be minimal and decided through due process?',
  opts: ['Hear both sides under a fair procedure, and restrict only if the play falls within a recognised ground, and then only as far as needed', 'Ban the play at once to avoid all disputes', 'Allow it without any hearing even if it urges violence', 'Let the loudest group decide'],
  sol: 'A hearing, a recognised ground and the least restriction needed reflect due process and minimal constraint. An instant ban and rule by the loudest group skip the procedure, and permitting any content ignores the allowed grounds.',
}));
Q('m_incite_app', mcq({
  t: 2, d: 4, c: 'application',
  stem: 'At a rally in imagined Dorrow, a speaker urges the crowd to set fire to the homes of a neighbouring community that evening. Which ground of Article 19(2) most directly applies?',
  opts: ['Incitement to an offence, and public order', 'Defamation of a council member', 'Contempt of court', 'Decency in a theatre'],
  sol: 'Urging a crowd to commit arson is incitement to an offence and a threat to public order. Defamation, contempt of court and decency concern different kinds of speech.',
}));
Q('m_informed', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Which statement best expresses a complete view of freedom in a free society?',
  opts: ['Individuals pursue their own interests with a minimum of constraints, make informed choices and take responsibility for them', 'Individuals are free only when the state makes every decision', 'Choices matter only if they are made without information', 'Responsibility belongs only to the government'],
  sol: 'Freedom is more than the absence of interference: it includes making informed choices and answering for them. A state that decides everything or a choice made blindly is not freedom.',
}));
Q('m_reasonable', mcq({
  t: 2, d: 3, c: 'understanding',
  stem: 'A newspaper in imagined Mirrenhall says that Article 19(2) lets the state ban any speech it dislikes. Which statement correctly corrects this claim?',
  opts: ['Article 19(2) permits only reasonable restrictions on the grounds it lists', 'Article 19(2) gives the state a free hand', 'Article 19(2) removes freedom of speech', 'Article 19(2) applies only to newspapers'],
  sol: 'The restrictions must be reasonable and must rest on the listed grounds. A free hand, removal of the freedom or a limit to newspapers misstates the provision.',
}));
Q('m_censor', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'In debates about banning books, films or speech, which pair of positions is commonly found?',
  opts: ['Some stress the value of open expression, others stress the harm that certain expression may cause', 'All agree that every ban is right', 'All agree that no restriction is ever acceptable', 'Nobody discusses the matter'],
  sol: 'Such debates usually set the value of free expression against the harm that some expression may do, and thoughtful people weigh the two with reasons. The other options describe agreement that does not exist.',
}));

// ================================================================ assertion-reason
Q('ar_neg_pos', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'both-true-not-explains',
  a: 'Positive liberty is the presence of enabling conditions such as education, health and resources.',
  r: 'Negative liberty is a minimum area of non-interference in which a person can act without restraint.',
  sol: 'Both are true, but R does not explain A: R defines a different idea, and A is true of positive liberty because of what it demands, not because of non-interference.',
}));
Q('ar_harm', ar({
  t: 2, d: 3, c: 'understanding', verdict: 'both-true-explains',
  a: 'An action that affects only the person who performs it should be left free of interference by the state or society.',
  r: 'The harm principle allows restriction of freedom only to prevent harm to others.',
  sol: 'Both are true, and R explains A: if interference is allowed only to prevent harm to others, an action with no effect on others lies outside what can be restricted.',
}));
Q('ar_expr', ar({
  t: 2, d: 4, c: 'analysis', verdict: 'both-true-explains',
  a: 'Mill held that a view should not be silenced merely because it is believed to be false.',
  r: 'A view that is largely false may still contain a part of the truth, and testing it against other views keeps true beliefs alive.',
  sol: 'Both are true, and R explains A: the possible share of truth, and the benefit of testing beliefs against rivals, are why even false views should not be silenced.',
}));
Q('ar_dogma', ar({
  t: 2, d: 3, c: 'understanding', verdict: 'A-true-R-false',
  a: 'A belief that is never questioned may become a dead dogma.',
  r: 'People understand a belief better when no one is ever allowed to challenge it.',
  sol: 'A is true, since a belief never tested is held without understanding. R is false, because challenge is what deepens understanding.',
}));
Q('ar_free_rules', ar({
  t: 1, d: 3, c: 'application', verdict: 'A-false-R-true',
  a: 'In a free society there should be no rules at all, because every rule takes away freedom.',
  r: 'Living together requires rules, and rules accepted through legitimate procedures can protect freedom.',
  sol: 'A is false: some constraints are needed for people to live together. R is true and explains why some rules protect freedom, so it contradicts A.',
}));
Q('ar_19', ar({
  t: 2, d: 4, c: 'analysis', verdict: 'A-true-R-false',
  a: 'Article 19(2) allows reasonable restrictions on freedom of speech and expression on grounds such as public order and defamation.',
  r: 'Under Article 19(2), the state may restrict speech whenever a listed authority finds it unpleasant.',
  sol: 'A is true, since public order and defamation are among the grounds. R is false: restrictions must be reasonable and rest on the listed grounds, and unpleasantness alone is not a ground.',
}));

// ================================================================ true-false, fill-blank, match, ordering
Q('tf_neg', tf({
  t: 1, d: 2, c: 'understanding', ans: false,
  stem: 'A person who is free from all interference by others must therefore have positive liberty as well, even if he is too poor to go to school.',
  sol: 'Non-interference is negative liberty. Positive liberty also needs enabling conditions such as education, so a person can lack it while being left alone.',
}));
Q('tf_mill', tf({
  t: 2, d: 3, c: 'understanding', ans: false,
  stem: 'On the harm principle, the state may stop a person from an act that affects only himself, merely because most people find the act foolish.',
  sol: 'The principle allows interference only to prevent harm to others. An act that affects only the person, however foolish it seems, lies outside the reach of the state.',
}));
Q('tf_rules', tf({
  t: 1, d: 2, c: 'recall', ans: false,
  stem: 'The standard view holds that freedom means the complete absence of rules of any kind.',
  sol: 'Some constraints are needed for people to live together, so freedom does not mean the complete absence of rules.',
}));
Q('fb_harm', fb({
  t: 2, d: 2, c: 'recall',
  stem: 'The harm principle states that freedom may be restricted only to prevent harm to ___.',
  acc: [['others', 'other people', 'other persons']],
  sol: 'Restriction is justified only to prevent harm to others.',
}));
Q('fb_19', fb({
  t: 2, d: 2, c: 'recall',
  stem: 'Freedom of speech and expression is protected by Article ___ (1)(a) of the Indian Constitution.',
  acc: [['19', 'nineteen']],
  sol: 'The protection is in Article 19(1)(a).',
}));
Q('fb_liberty', fb({
  t: 1, d: 2, c: 'recall',
  stem: 'Freedom from interference is called ___ liberty, and freedom to act and develop is called ___ liberty.',
  acc: [['negative'], ['positive']],
  sol: 'Freedom from interference is negative liberty, and freedom to act and develop is positive liberty.',
}));
Q('mt_liberty', match({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'Match each term from the study of freedom, such as negative liberty or domination, with its meaning.',
  pairs: [
    ['Negative liberty', 'Area free from interference by others or the state'],
    ['Positive liberty', 'Enabling conditions such as education, health and resources'],
    ['Domination', 'External control, by force or by laws without consent'],
    ['Social and economic inequality', 'Exclusion and poverty that block people from developing'],
  ],
  sol: 'Each term is paired with its meaning: negative liberty with non-interference, positive liberty with enabling conditions, domination with imposed control, and inequality with exclusion and poverty.',
}));
Q('mt_mill', match({
  t: 2, d: 3, c: 'application', marks: 2,
  stem: 'Match each imagined situation of Arvelle with the idea it illustrates.',
  pairs: [
    ['A small group\'s unpopular proposal turns out to be partly right', 'Even a false view may contain some truth'],
    ['Two groups argue over a harbour plan until a better one emerges', 'Truth emerges through the clash of opinions'],
    ['Pupils chant a rule but cannot explain it', 'An unchallenged truth becomes dead dogma'],
    ['A speaker is fined with no hearing at all', 'Restrictions should follow due process'],
  ],
  sol: 'A partly right proposal shows that a view may hold some truth, a better plan shows truth from clash, chanting shows dead dogma, and a fine without a hearing breaks due process.',
}));
Q('ord_hp', ord({
  t: 2, d: 3, c: 'application', marks: 2,
  stem: 'Arrange, in a sensible order, the steps of reasoning that the imagined council of Kellin uses when it is asked to restrict an action under the harm principle.',
  items: [
    'Identify the action that is complained of',
    'Ask whether it affects only the actor or also other people',
    'If others are affected, judge whether the harm is minor or serious',
    'Choose the response: social disapproval for minor harm, legal restriction for serious harm',
  ],
  sol: 'The council first identifies the action, then asks who is affected, then judges how serious the harm is, and only then selects a response.',
}));
Q('ord_ban', ord({
  t: 2, d: 3, c: 'application', marks: 2,
  stem: 'Arrange these steps in the order in which a fair procedure might handle a complaint against the imagined play The Last Ferry in Arvelle.',
  items: [
    'A group files a complaint against the play',
    'A panel hears both the complainants and the producers',
    'The panel checks whether the play falls within a recognised ground of restriction',
    'The panel decides, giving reasons, and restricts no more than needed',
  ],
  sol: 'A complaint starts the matter, a hearing follows, the grounds are then checked, and a reasoned decision with the least restriction comes last.',
}));

// ================================================================ short answers (2 marks)
Q('s_ideal', short({
  t: 1, d: 2, c: 'recall', marks: 2, wl: S2,
  stem: 'Give the standard definition of freedom in political theory, in two parts.',
  model: 'Freedom is, first, the **absence of external constraints** on what a person can do. Second, it is the **presence of conditions** in which people can **develop their talents** and make choices, which is also called self-determination.',
  sol: 'Two parts: no external constraints, and enabling conditions.',
  scheme: [['Absence of external constraints', 1], ['Conditions for developing talents and making choices', 1]],
}));
Q('s_sources', short({
  t: 1, d: 2, c: 'recall', marks: 2, wl: S2,
  stem: 'Name the two broad sources of constraints on freedom, with one example of each.',
  model: 'One source is **domination and external control**, for example laws imposed on people by force and without their consent. The other is **social and economic inequality**, for example caste-based exclusion or extreme poverty.',
  sol: 'Two sources, one example each.',
  scheme: [['Domination and external control with an example', 1], ['Social and economic inequality with an example', 1]],
}));
Q('s_need_rules', short({
  t: 1, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: 'Why are some constraints on individuals necessary, and what should be true of the rules that impose them?',
  model: 'People who live together need **rules**, or the strong would override the weak. Such rules should be accepted through **legitimate procedures**, and they should **protect freedom** rather than destroy it.',
  sol: 'Need for rules, and the test of a good rule.',
  scheme: [['Living together needs rules', 1], ['Rules accepted through legitimate procedures and protecting freedom', 1]],
}));
Q('s_neg_def', short({
  t: 1, d: 2, c: 'recall', marks: 2, wl: S2,
  stem: 'What is negative liberty? Give one imagined example.',
  model: '**Negative liberty** is freedom from interference: a minimum area in which a person may act **without restraint** by others or the state. For example, in imagined Dorrow no official may tell a resident which book to read.',
  sol: 'Definition and an example.',
  scheme: [['Freedom from interference; a protected area of action', 1], ['A suitable example', 1]],
}));
Q('s_pos_def', short({
  t: 1, d: 2, c: 'recall', marks: 2, wl: S2,
  stem: 'What is positive liberty? Give one imagined example.',
  model: '**Positive liberty** is the freedom to act and to develop, which needs **enabling conditions** such as education, health and resources. For example, imagined Mirrenhall opens a free night school so that working children can study.',
  sol: 'Definition and an example.',
  scheme: [['Freedom to act and develop; enabling conditions', 1], ['A suitable example', 1]],
}));
Q('s_neg_app', short({
  t: 1, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'Ilan of imagined Kellin may choose any trade, but he cannot afford even the tools. Which kind of liberty does he have and which is lacking? Give a reason.',
  model: 'Ilan has **negative liberty**, since nobody stops him from choosing a trade. He lacks **positive liberty**, because without money for tools he does not have the **resources** needed to act on his choice.',
  sol: 'Negative present, positive lacking.',
  scheme: [['Negative liberty present, since no one interferes', 1], ['Positive liberty lacking, since resources are missing', 1]],
}));
Q('s_self_other', short({
  t: 2, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: 'Distinguish between self-regarding and other-regarding actions as described in the harm principle.',
  model: 'A **self-regarding action** affects only the person who performs it, so society should leave it free. An **other-regarding action** affects other people, and it may be restricted if it causes harm to them.',
  sol: 'Who is affected.',
  scheme: [['Self-regarding: affects only the actor', 1], ['Other-regarding: affects others; may be restricted if harmful', 1]],
}));
Q('s_harm_state', short({
  t: 2, d: 2, c: 'recall', marks: 2, wl: S2,
  stem: 'State the harm principle and name the thinker who put it forward.',
  model: 'The **harm principle** says that the state or society may restrict a person\'s freedom only to **prevent harm to others**. It was put forward by **J. S. Mill** in his work **On Liberty** (1859).',
  sol: 'Principle and thinker.',
  scheme: [['Restriction only to prevent harm to others', 1], ['J. S. Mill, On Liberty (1859)', 1]],
}));
Q('s_dogma', short({
  t: 2, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: 'What is meant by the idea that an unchallenged truth may become a dead dogma?',
  model: 'A truth that is never questioned or tested is held **without understanding**, like a fixed formula. People then forget the **reasons** behind it and cannot defend it, so it becomes a **dead dogma**.',
  sol: 'Meaning of dead dogma.',
  scheme: [['An untested truth is held without understanding', 1], ['The reasons are forgotten and it cannot be defended', 1]],
}));
Q('s_19', short({
  t: 2, d: 2, c: 'recall', marks: 2, wl: S2,
  stem: 'What does Article 19(1)(a) protect, and what does Article 19(2) allow?',
  model: 'The freedom of **speech and expression** is protected by **Article 19(1)(a)**. **Article 19(2)** allows the state to impose **reasonable restrictions** on that freedom on grounds such as public order, defamation or incitement to an offence.',
  sol: 'The freedom and its limits.',
  scheme: [['Article 19(1)(a): freedom of speech and expression', 1], ['Article 19(2): reasonable restrictions on listed grounds', 1]],
}));
Q('s_respons', short({
  t: 2, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: 'Why does freedom include the ability to make informed choices and to take responsibility for them?',
  model: 'A choice made **without information** is hardly a free choice, since the person cannot see what it means. Freedom also means **answering for the results** of a choice, which is why free persons act with **responsibility**.',
  sol: 'Information and responsibility.',
  scheme: [['Free choice needs information', 1], ['A free person takes responsibility for the results', 1]],
}));

// ================================================================ short answers (3 marks)
Q('s3_conflict', short({
  t: 1, d: 4, c: 'analysis', marks: 3, wl: S3,
  stem: 'Explain how negative and positive liberty can conflict and how they can complement each other. Do not take a side.',
  model: 'They **conflict** when state action to widen positive liberty, such as a tax for a clinic, is seen by some as **interference**. They **complement** each other when a protected area of choice is joined to the **education and health** to use it. Some thinkers stress negative liberty, others positive liberty.',
  sol: 'Conflict, complement, and neutral wording.',
  scheme: [['A conflict explained with an example', 1], ['How they complement each other', 1], ['A neutral note that thinkers stress one or the other', 1]],
}));
Q('s3_ban', short({
  t: 2, d: 4, c: 'application', marks: 3, wl: S3,
  stem: 'Some residents of imagined Arvelle ask the council to ban the play The Last Ferry. Using ideas on freedom of expression, say how the council should proceed.',
  model: 'The council should **hear both sides** through a fair procedure. It should ask whether the play falls under a **recognised ground** of restriction, such as incitement to an offence. Any restriction should be **minimal** and decided with reasons, because even disliked views may hold **some truth**.',
  sol: 'Fair procedure, recognised ground, minimal restriction.',
  scheme: [['A fair hearing of both sides', 1], ['A check against recognised grounds', 1], ['Minimal restriction, with reasons', 1]],
}));
Q('s3_harm_levels', short({
  t: 2, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'Explain, with one imagined example each, how the harm principle treats minor harm and serious harm.',
  model: 'Under the harm principle, **minor harm** to others calls for **social disapproval**, a request or persuasion, for example neighbours asking a drummer in imagined Pellam to play softly. **Serious harm** to others may call for **legal restriction and punishment**, for example a factory in imagined Tavish poisoning the stream that villagers drink from. The response should match the size of the harm.',
  sol: 'Two levels of response with examples.',
  scheme: [['Minor harm: social disapproval', 1], ['Serious harm: legal punishment', 1], ['A suitable example for each level', 1]],
}));
Q('s3_mill_reasons', short({
  t: 2, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: 'State three reasons that Mill gave for protecting freedom of expression.',
  model: 'First, even a **false view** may contain some part of the **truth**, so silencing it may lose that part. Second, **truth emerges** through the **clash of opinions**, as ideas are tested against each other and judgement improves. Third, an **unchallenged truth** becomes a **dead dogma**, held without understanding of its reasons.',
  sol: 'Three reasons.',
  scheme: [['A false view may contain some truth', 1], ['Truth emerges through the clash of opinions', 1], ['Unchallenged truths become dead dogma', 1]],
}));
Q('s3_19_2', short({
  t: 2, d: 3, c: 'recall', marks: 3, wl: S3,
  stem: 'Name any five grounds on which Article 19(2) permits reasonable restrictions on freedom of speech and expression.',
  model: 'Grounds include **public order**, **decency or morality**, the **sovereignty and integrity of India**, the **security of the state**, **friendly relations with foreign states**, **defamation**, **contempt of court** and **incitement to an offence**. Any five may be named. Each restriction must be made by law, must be reasonable, and must rest on one of the listed grounds.',
  sol: 'Any five grounds.',
  scheme: [['Two grounds correctly named', 1], ['Four grounds correctly named', 1], ['Five grounds correctly named, with restrictions reasonable', 1]],
}));
Q('s3_constraints', short({
  t: 1, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain how social and economic inequality can limit freedom even where no law forbids anything.',
  model: 'A person may be free in law and yet unable to **use** that freedom. **Caste-based exclusion** can shut a child out of school, and **poverty** can prevent a talented person from developing. So inequality limits the **conditions** needed for real freedom.',
  sol: 'Inequality as a constraint with examples.',
  scheme: [['Legal freedom is not enough on its own', 1], ['An example of exclusion or poverty', 1], ['Inequality limits conditions for developing and choosing', 1]],
}));
Q('s3_classify', short({
  t: 2, d: 4, c: 'application', marks: 3, wl: S3,
  stem: 'Classify as self-regarding or other-regarding: (i) Tavin of imagined Pellam reads late in a closed room; (ii) Orla runs a workshop whose smoke enters the neighbours\' homes daily; (iii) Bram skips breakfast. Give a reason for each.',
  model: '(i) **Self-regarding**: Tavin\'s reading in a closed room affects only himself, so it is left free. (ii) **Other-regarding**: the smoke harms the neighbours every day, so restriction can be justified by the harm principle. (iii) **Self-regarding**: skipping breakfast affects only Bram, whatever others may think of it, so there is no ground for interference.',
  sol: 'Three classifications with reasons.',
  scheme: [['Reading: self-regarding with a reason', 1], ['Workshop smoke: other-regarding with a reason', 1], ['Skipping breakfast: self-regarding with a reason', 1]],
}));

// ================================================================ long answers (5 marks)
Q('l_neg_pos', long({
  t: 1, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Distinguish between negative and positive liberty, with an imagined example of each, and explain how they may conflict and complement each other.',
  model: '1. **Negative liberty** is freedom from interference, a minimum area in which a person acts without restraint by others or the state.\n2. Example: in imagined Dorrow no official may read private letters.\n3. **Positive liberty** is freedom to act and develop, needing education, health and resources.\n4. Example: imagined Mirrenhall opens a free night school.\n5. They may **conflict** when state action to widen positive liberty, such as a tax, is felt as interference.\n6. They **complement** each other, since a protected area is useful only with the means to use it. Thinkers differ in the stress they give.',
  sol: 'Both definitions with examples, conflict and complement.',
  scheme: [['Negative liberty defined', 1], ['Positive liberty defined', 1], ['An example of each', 1], ['How they may conflict', 1], ['How they complement each other', 1]],
}));
Q('l_freedom', long({
  t: 1, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Explain the ideal of freedom: its meaning, the sources of constraints on it and why some constraints are necessary.',
  model: '1. Freedom is seen as the **struggle against domination**.\n2. It means the **absence of external constraints** and also **conditions** in which people can develop their talents and make choices.\n3. Constraints arise from **domination and external control**, by force or by laws imposed without consent.\n4. They also arise from **social and economic inequality**, such as caste-based exclusion and poverty.\n5. Some constraints are **necessary**, since people living together need rules.\n6. Such rules should be accepted through **legitimate procedures** and should protect freedom, not destroy it.',
  sol: 'Meaning, two sources, and the need for rules.',
  scheme: [['The idea of freedom as a struggle against domination', 1], ['Two-part definition', 1], ['Domination and external control as a source', 1], ['Social and economic inequality as a source', 1], ['Why some constraints are needed, and the test of legitimacy', 1]],
}));
Q('l_harm', long({
  t: 2, d: 3, c: 'application', marks: 5, wl: L5,
  stem: 'Explain the harm principle of J. S. Mill, using imagined examples of self-regarding and other-regarding actions and of minor and serious harm.',
  model: '1. **J. S. Mill** put the harm principle in **On Liberty** (1859).\n2. **Self-regarding actions** affect only the person, such as Bram in imagined Pellam studying chess alone.\n3. **Other-regarding actions** affect others, such as a factory in imagined Tavish polluting a stream.\n4. The state or society may restrict freedom **only to prevent harm to others**.\n5. **Minor harm** may call for social disapproval; **serious harm** may call for legal punishment.',
  sol: 'Thinker, two kinds of action, the principle and two levels of harm.',
  scheme: [['Thinker and work', 1], ['Self-regarding action with an example', 1], ['Other-regarding action with an example', 1], ['Restriction only to prevent harm to others', 1], ['Minor harm and serious harm, with their responses', 1]],
}));
Q('l_expression', long({
  t: 2, d: 4, c: 'analysis', marks: 5, wl: L5,
  stem: 'Why does freedom of expression matter? Discuss, with reference to the debates on banning books, films or speech, whether constraints can be justified.',
  model: '1. Mill gave reasons: a **false view** may hold some **truth**; truth **emerges through the clash** of opinions; unchallenged truth becomes **dead dogma**.\n2. In debates on bans, some stress the **value of open expression**, others the **harm** some expression may do.\n3. Constraints may be **justified in some cases**, for example incitement to violence.\n4. But they should be **minimal**, resting on a recognised ground.\n5. They should be decided through **due process**, with a hearing and reasons, and not by the loudest group.',
  sol: 'Reasons for expression, the debate, and the conditions for any constraint.',
  scheme: [['Mill\'s reasons for free expression', 2], ['Both sides in the debate on bans', 1], ['Constraints justified in some cases but minimal', 1], ['Due process', 1]],
}));
Q('l_19', long({
  t: 2, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Explain what Article 19(1)(a) protects, and describe the grounds on which Article 19(2) permits restrictions, with a note on how they should be applied.',
  model: '1. The freedom of **speech and expression** is protected by **Article 19(1)(a)**.\n2. **Article 19(2)** allows **reasonable restrictions** on listed grounds.\n3. These include **public order**, **decency or morality**, the **sovereignty and integrity of India**, the **security of the state**, **defamation**, **contempt of court** and **incitement to an offence**.\n4. A restriction must rest on one of these grounds and must be reasonable.\n5. It should be **minimal** and decided through **due process**, not merely because a view is disliked.',
  sol: 'The freedom, the grounds, and how they apply.',
  scheme: [['Article 19(1)(a) and what it protects', 1], ['Article 19(2) and reasonable restrictions', 1], ['At least four grounds named', 1], ['Restriction must rest on a ground and be reasonable', 1], ['Minimal and decided through due process', 1]],
}));
Q('l_evaluate', long({
  t: [1, 2], d: 5, c: 'evaluation', marks: 5, wl: L5,
  stem: 'A free society lets individuals pursue their own interests with a minimum of constraints. Evaluate this statement in the light of negative liberty, positive liberty and the harm principle.',
  model: '1. **Negative liberty** supports the statement: a protected area of choice, with few constraints.\n2. **Positive liberty** adds that people need education, health and resources to use their freedom.\n3. Some thinkers stress the first, others the second.\n4. The **harm principle** fixes a limit: constraints are justified to prevent harm to others.\n5. Freedom also includes **informed choice** and **responsibility**, so a reasoned judgement weighs all these points.',
  sol: 'A weighed answer using all three ideas.',
  scheme: [['Negative liberty applied', 1], ['Positive liberty applied', 1], ['The harm principle as the limit', 1], ['Informed choice and responsibility', 1], ['A reasoned, balanced judgement', 1]],
}));

// ================================================================ case-based (4 marks: 1 + 1 + 2)
Q('c_report', caseQ({
  t: 1, d: 4, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the newspaper report and answer the questions that follow. *(An imagined report written by SOYL for practice; the newspaper, the town and the councillors are not real.)*',
  passage: '**From the Kellin Bulletin, imagined**\n\nTwo proposals were placed before the town council of Kellin. Proposal A would end the rule that obliges every shopkeeper to obtain a permit before putting up any poster, leaving shopkeepers free to display what they wish. Proposal B would set up a free evening school and a health centre in the ward where most residents are daily-wage workers. Councillor Isha backs A. Councillor Rahul backs B, saying that many residents cannot use their freedoms without such conditions.',
  parts: [
    child('a', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'Which proposal mainly widens negative liberty?', model: '**Proposal A**.', sol: 'It removes a rule that interferes with shopkeepers.', scheme: [['Proposal A', 1]] })),
    child('b', short({ t: 1, d: 3, c: 'application', marks: 1, stem: 'Which kind of liberty does Councillor Rahul\'s Proposal B mainly expand?', model: '**Positive liberty**.', sol: 'School and health centre are enabling conditions.', scheme: [['Positive liberty', 1]] })),
    child('c', short({ t: 1, d: 4, c: 'analysis', marks: 2, stem: '**Either** (i): Explain how a person who values freedom might support both proposals.', model: 'Proposal A gives shopkeepers a **protected area** of choice, and Proposal B gives residents the **education and health** to use their freedoms. The two **complement** each other, so one person can support both.', sol: 'The two ideas complement each other.', scheme: [['A protects an area free from interference', 1], ['B supplies enabling conditions; they complement each other', 1]] }), [
      short({ t: 1, d: 5, c: 'evaluation', marks: 2, stem: '**Or** (ii): Give one reason why a taxpayer might object to Proposal B on the ground of non-interference, and one reply that a supporter might make.', model: 'A taxpayer might say that funding B by **taxes** interferes with how people use their **own money**. A supporter might reply that the school and centre widen the **real freedom** of poorer residents to develop and choose.', sol: 'An objection and a reply.', scheme: [['An objection based on non-interference', 1], ['A reply based on enabling conditions', 1]] }),
    ]),
  ],
}));
Q('c_rules', caseQ({
  t: 2, d: 4, c: 'application', origin: 'soyl-original',
  stem: 'Read the register and answer the questions that follow. *(An imagined register written by SOYL for practice; Dorrow and the residents are not real.)*',
  passage: '**From the complaints register of the town council of Dorrow, imagined**\n\n| No. | Complaint |\n|---|---|\n| 1 | Mr Tavin reads late into the night with the light on in his closed room |\n| 2 | Ms Orla runs a workshop whose smoke drifts into three neighbouring homes every day, and two children have fallen ill |\n| 3 | Mr Bram plays a drum for an hour each evening, and two neighbours find it annoying |',
  parts: [
    child('a', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Which complaint concerns a self-regarding action?', model: '**Complaint 1**.', sol: 'Tavin\'s reading affects only himself.', scheme: [['Complaint 1', 1]] })),
    child('b', short({ t: 2, d: 3, c: 'application', marks: 1, stem: 'What kind of action is the one in Complaint 2?', model: 'An **other-regarding** action, since it harms the neighbours.', sol: 'The smoke affects other people.', scheme: [['Other-regarding, because others are harmed', 1]] })),
    child('c', short({ t: 2, d: 4, c: 'analysis', marks: 2, stem: '**Either** (i): What response does the harm principle suggest for Complaint 3, and why?', model: 'The harm is **minor**, so the harm principle suggests **social disapproval** and a request to play more softly, and not legal punishment, since the annoyance is **slight**.', sol: 'Minor harm calls for disapproval.', scheme: [['Social disapproval or a request', 1], ['The harm is minor, so legal punishment is not justified', 1]] }), [
      short({ t: 2, d: 4, c: 'application', marks: 2, stem: '**Or** (ii): What response is justified for Complaint 2, and why?', model: 'The harm is **serious**, since children have fallen ill, so a **legal restriction** on the workshop, with a penalty if ignored, is **justified** to prevent harm to others.', sol: 'Serious harm to others.', scheme: [['Legal restriction or punishment', 1], ['The harm to others is serious', 1]] }),
    ]),
  ],
}));
Q('c_play', caseQ({
  t: 2, d: 5, c: 'evaluation', origin: 'soyl-original',
  stem: 'Read the newspaper report and answer the questions that follow. *(An imagined report written by SOYL for practice; the play, the playwright and the town are not real.)*',
  passage: '**From the Arvelle Courier, imagined**\n\nA play named The Last Ferry, written by Ondrea Vale, is to be staged in Arvelle. A group of residents has asked for a ban, saying the play makes fun of local customs. Others say the play raises questions that the town should debate. The council has asked a panel to hear both sides before deciding. The panel notes that nothing in the play urges anyone to violence.',
  parts: [
    child('a', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Which fair-procedure step is the council taking before it decides?', model: 'It asks a panel to **hear both sides**, which is due process.', sol: 'A hearing before a decision.', scheme: [['Hearing both sides, due process', 1]] })),
    child('b', short({ t: 2, d: 3, c: 'application', marks: 1, stem: 'Because the play does not urge violence, which ground of Article 19(2) is unlikely to apply?', model: '**Incitement to an offence**.', sol: 'The play does not urge any offence.', scheme: [['Incitement to an offence', 1]] })),
    child('c', short({ t: 2, d: 5, c: 'evaluation', marks: 2, stem: '**Either** (i): Give two reasons from Mill\'s ideas why the residents who want a debate may be right.', model: 'The play may hold **some truth** even if parts are disliked. A **clash of opinions** about it can lead the town to a **better understanding**, and avoids **dead dogma** about its own customs.', sol: 'Two of Mill\'s reasons applied.', scheme: [['One of Mill\'s reasons applied', 1], ['A second reason applied', 1]] }), [
      short({ t: 2, d: 5, c: 'evaluation', marks: 2, stem: '**Or** (ii): If the council does restrict the play, why should the restriction be minimal and based on a recognised ground?', model: 'Freedom of expression is **valuable**, so any restriction should go **no further than needed** and should rest on a **recognised ground**, so it cannot be used merely because a view is **disliked**.', sol: 'Minimal and grounded.', scheme: [['Restriction should be no more than needed', 1], ['It must rest on a recognised ground, not dislike alone', 1]] }),
    ]),
  ],
}));
Q('c_letter', caseQ({
  t: 1, d: 4, c: 'evaluation', origin: 'soyl-original',
  stem: 'Read the letter and answer the questions that follow. *(An imagined letter written by SOYL for practice; Meher, her uncle and the village are not real.)*',
  passage: '**Imagined letter from Meher of Tavish to a school magazine**\n\nIn our village nobody stopped me from choosing any career. But the nearest school was two hours away, and my family could not spare me from work. Last year a scholarship opened a hostel in town, and now I study. My uncle says the scholarship uses other people\'s money and so interferes with them. My teacher says it has made me freer.',
  parts: [
    child('a', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'Which kind of liberty did Meher have before the scholarship, in the sense that nobody stopped her?', model: '**Negative liberty**.', sol: 'No one interfered with her choices.', scheme: [['Negative liberty', 1]] })),
    child('b', short({ t: 1, d: 3, c: 'application', marks: 1, stem: 'Which kind of liberty did the scholarship expand?', model: '**Positive liberty**.', sol: 'It supplied the means to study.', scheme: [['Positive liberty', 1]] })),
    child('c', short({ t: 1, d: 4, c: 'evaluation', marks: 2, stem: '**Either** (i): How does Meher\'s experience show that non-interference alone may not be enough?', model: 'Nobody interfered, yet she could not **study**, because of distance and lack of **means**. Freedom to choose a career needed **enabling conditions** such as a school she could reach.', sol: 'Enabling conditions.', scheme: [['No interference, yet unable to study', 1], ['Enabling conditions were needed', 1]] }), [
      short({ t: 1, d: 5, c: 'evaluation', marks: 2, stem: '**Or** (ii): State the uncle\'s concern in terms of liberty, and one reply from the teacher\'s side.', model: 'The uncle\'s concern is about **interference** with those whose money funds the scholarship. The teacher can reply that the scholarship widens **real freedom** for those like Meher to develop and choose.', sol: 'Both views, each with a reason.', scheme: [['Uncle: concern about interference', 1], ['Teacher: widened real freedom', 1]] }),
    ]),
  ],
}));
Q('c_news', caseQ({
  t: 2, d: 4, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the notice and answer the questions that follow. *(An imagined notice written by SOYL for practice; Mirrenhall College and the people are not real.)*',
  passage: '**Notice from the principal of Mirrenhall College, imagined**\n\nThe student magazine has printed an article saying that the canteen contractor, Mr Selvan, steals food from the kitchen. No evidence was given. Mr Selvan says the claim is false and has harmed his name. The editor says that a student magazine must be free to criticise. The principal has called a meeting of both sides.',
  parts: [
    child('a', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Which ground of Article 19(2) does Mr Selvan\'s complaint most closely match?', model: '**Defamation**.', sol: 'A false claim that harms a person\'s name.', scheme: [['Defamation', 1]] })),
    child('b', short({ t: 2, d: 3, c: 'application', marks: 1, stem: 'Is the printing of the article self-regarding or other-regarding? Give a reason.', model: '**Other-regarding**, since it may harm the name of Mr Selvan.', sol: 'It affects another person.', scheme: [['Other-regarding, with a reason', 1]] })),
    child('c', short({ t: 2, d: 4, c: 'analysis', marks: 2, stem: '**Either** (i): Why might the editor still say that criticism should not be silenced?', model: 'Criticism may hold **some truth**, and the **clash of views** at the meeting can test it. Silencing all criticism would lead to **dead dogma** about the canteen, with no way to correct faults.', sol: 'Mill\'s reasons applied.', scheme: [['Criticism may hold some truth, or truth emerges through the clash of views', 1], ['Silencing leads to dead dogma', 1]] }), [
      short({ t: 2, d: 4, c: 'application', marks: 2, stem: '**Or** (ii): What steps should be followed before any penalty is imposed on the magazine?', model: 'The principal should **hear both sides**, check whether the article is a **false and harmful claim**, and decide **with reasons**, imposing no more than the **minimum** needed.', sol: 'Due process.', scheme: [['Hear both sides and check the claim', 1], ['Decide with reasons and minimal restriction', 1]] }),
    ]),
  ],
}));
