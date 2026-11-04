// CBSE 11 Political Science, ch18 Secularism: question bank. Every passage (report, letter, table, editorial, classroom
// debate) is written by SOYL and labelled as imagined; the countries Torvia, Calendra and Meridan, the towns Dunmere, Pellmoor,
// Ashvale and Quillfield, the faiths Sunhold, Rivermark and Tessel, the Teshar community, the Linden Shrine, Ember School and
// every person in a scenario are imagined. No NCERT text, boxed source, cartoon, quotation of any thinker, court judgment or
// board/sample-paper item is reused (D-036). No real incident, party, leader or current dispute is touched.
import { Q, mcq, ar, tf, fb, match, ord, short, long, caseQ, child } from '../../cbse-11-political-science-ch01/src/lib.mjs';

const S2 = [30, 50];
const S3 = [50, 80];
const L5 = [80, 120];

// ================================================================ t01: meaning, Western and Indian models
Q('m_secdef', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Political theorists describe secularism as a normative doctrine. What does this doctrine seek?',
  opts: ['A society free from both inter-religious and intra-religious domination', 'A society in which every person follows one common faith', 'A society in which religion is wiped out of private life', 'A society in which the state adopts the faith of its largest community'],
  sol: 'Secularism seeks a society free from domination between religious communities and within them. It does not ask for one common faith, the removal of religion from private life or a state faith.',
}));
Q('m_interintra', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Which pair correctly explains the two kinds of religious domination?',
  opts: ['Inter-religious domination is one community dominating another; intra-religious domination is domination inside a community, for example by caste or gender', 'Inter-religious domination happens only in cities; intra-religious domination happens only in villages', 'Inter-religious domination is domination by the state; intra-religious domination is domination by a court', 'Inter-religious domination is a duty of citizens; intra-religious domination is a right of citizens'],
  sol: 'The prefix tells the difference: inter means between communities and intra means within one community. Place of living, the state and a court, or duties and rights, have nothing to do with the two kinds.',
}));
Q('m_inter_app', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'In the imagined town of Ashvale, the committee that runs the old market hall allows only Sunhold festivals to be held there and turns away the Tessel community each time it applies. This is an example of',
  opts: ['inter-religious domination', 'intra-religious domination', 'principled distance', 'mutual exclusion'],
  sol: 'One community is using its hold over a shared hall to shut out another, which is inter-religious domination. Intra-religious domination is inside one community, and principled distance and mutual exclusion are models of the state\'s relation to religion.',
}));
Q('m_intra_app', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'The elders of the Rivermark community in the imagined town of Quillfield decide that women of the community may not read aloud at its gatherings, though men may. This is mainly an example of',
  opts: ['intra-religious domination based on gender', 'inter-religious domination', 'a state interfering in religion', 'equal respect for all religions'],
  sol: 'The restriction is placed on women by their own community, so the domination is inside one religion and rests on gender. No second community is involved, and no state action or equal respect appears in the case.',
}));
Q('m_intra_caste_app', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'In the imagined town of Dunmere, families of the Ostler group, a hereditary group within the Rivermark community, are not allowed to draw water from the well kept by the other groups of the same community. This is a case of',
  opts: ['intra-religious domination based on caste-like hereditary groups', 'inter-religious domination', 'freedom of religion', 'a minority right to run schools'],
  sol: 'The exclusion is practised inside one religious community on the basis of birth into a group, which is intra-religious domination. Inter-religious domination needs two communities, and the case shows neither freedom of religion nor a school right.',
}));
Q('m_secstate', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'Which of these is a feature of a secular state?',
  opts: ['It is not run by any religious group and has no official religion', 'It is run by the leaders of one religion', 'It names one religion as the state religion', 'It treats the followers of different religions by different laws of citizenship'],
  sol: 'A secular state is not controlled by any religious group, has no official religion and does not discriminate on grounds of religion. The other options describe states under religious rule, a state religion or discrimination.',
}));
Q('m_official_app', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'The imagined country of Meridan declares the Sunhold faith its official religion, funds only Sunhold schools and opens its parliament with Sunhold prayers. Can Meridan be called a secular state in the standard sense?',
  opts: ['No, because a secular state has no official religion and does not favour any religious group', 'Yes, because most people there follow the Sunhold faith', 'Yes, because it allows other faiths to exist', 'Yes, because the funding of schools never affects secularism'],
  sol: 'A secular state has no official religion and keeps state power apart from the control of any religious group, which Meridan does not do. The size of a community and bare permission for other faiths do not make a state secular.',
}));
Q('m_nodisc', mcq({
  t: 1, d: 3, c: 'understanding',
  stem: 'The imagined country of Torvia refuses to give a public post to Janne because she follows the Tessel faith. Which principle of a secular state does this break?',
  opts: ['The state does not discriminate against anyone on grounds of religion', 'The state must hold a census of faiths', 'The state must give every citizen a post', 'The state must fund every religious festival'],
  sol: 'Refusing a post because of the applicant\'s religion is discrimination on a ground of religion, which a secular state does not practise. A census, a post for every person and funding for festivals are not part of that principle.',
}));
Q('m_western_def', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'The model of secularism commonly taught as Western, with the United States and France given as examples, rests mainly on',
  opts: ['mutual exclusion: the state does not interfere in religion and religion does not interfere in the state', 'principled distance, with the state free to intervene to promote equality', 'the rule of one state religion', 'the support of every community on an equal footing'],
  sol: 'The Western model is described as mutual exclusion of state and religion. Principled distance and equal support belong to the Indian model, and a state religion has no place in a secular model.',
}));
Q('m_western_app', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'In the imagined country of Calendra, the state gives no grant to any religious institution, takes no part in the affairs of any religion, and no religious body takes part in making laws. Which model does Calendra follow?',
  opts: ['Mutual exclusion, as in the Western model', 'Principled distance, as in the Indian model', 'A state religion', 'Rule by a religious body'],
  sol: 'A state and religion kept apart from each other on both sides is mutual exclusion. Principled distance allows the state to intervene on principle, and a state religion or religious rule would end the separation.',
}));
Q('m_individual', mcq({
  t: 1, d: 3, c: 'understanding',
  stem: 'Why is the Western model, as commonly taught, said to leave little room for community-based rights?',
  opts: ['Because it centres on the freedom and equality of the individual', 'Because it gives special powers to religious communities', 'Because it forbids every citizen to practise a religion', 'Because it needs a state religion to work'],
  sol: 'The model, as commonly taught, centres on individual freedom and equality, so rights held by a community as such find little place in it. It does not give communities special powers, forbid religion or need a state religion.',
}));
Q('m_pd_def', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'In the Indian model of secularism, principled distance means that the state',
  opts: ['keeps a distance from all religions but may intervene, on principle, to promote freedom and equality', 'never has anything to do with any religion in any way', 'supports the religion of the largest community', 'controls the affairs of all religious communities'],
  sol: 'Principled distance is a distance from every religion, with intervention allowed when the principles of freedom and equality call for it. Total separation, support for one religion and control of all communities are different ideas.',
}));
Q('m_pd_app', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'The imagined country of Torvia passes a law that every shrine open to the public must admit people of all hereditary groups, while the law leaves the conduct of worship to each shrine. This best shows',
  opts: ['principled distance: intervention only to promote equality, while keeping away from belief and ritual', 'mutual exclusion, since the state is not involved', 'a state religion for Torvia', 'inter-religious domination'],
  sol: 'The state steps in on a matter of equality and keeps away from belief and ritual, which is principled distance. In mutual exclusion it would not step in, and the law favours no religion and ends domination inside a community.',
}));
Q('m_art17', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'Which Article of the Indian Constitution abolishes untouchability and forbids its practice?',
  opts: ['Article 17', 'Article 25', 'Article 30', 'Article 28'],
  sol: 'Article 17 abolishes untouchability. Article 25 concerns freedom of religion, Article 30 the educational institutions of minorities, and Article 28 religious instruction in certain institutions.',
}));
Q('m_before42', mcq({
  t: 1, d: 3, c: 'understanding',
  stem: 'A student says that India became a secular state only in 1976. Which reply is correct?',
  opts: ['The word secular was added to the Preamble in 1976, but the Constitution was secular in its provisions from the start', 'The student is right, because there was no provision on religion before 1976', 'The word secular appeared first in 1950 and was removed in 1976', 'The Constitution became secular by a vote of the Supreme Court'],
  sol: 'The 1976 amendment added the word to the Preamble, while provisions such as those on freedom of religion and equal treatment were in the Constitution from the beginning. The other replies misstate this history.',
}));
Q('m_equalrespect_app', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'The imagined state of Torvia gives each of its three main faiths the same sum to repair its place of worship if it is damaged by a flood. Which feature of the Indian model does this resemble?',
  opts: ['Equal respect for all religions, with support given on an equal footing', 'Strict separation with no help to any religion', 'Preference for the oldest faith', 'Control of worship by the state'],
  sol: 'Help of the same kind on the same terms to every faith reflects equal respect and equal footing. Strict separation would give no help, and neither preference for one faith nor state control of worship is shown.',
}));
Q('m_art30_app', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'In the imagined town of Pellmoor, the Teshar community opens Ember School to teach its own language and traditions, and the authorities recognise it on the same terms as other schools. Which Indian constitutional provision is closest to this arrangement?',
  opts: ['Article 30, on the educational institutions of minorities', 'Article 17, on untouchability', 'Article 27, on taxes for a religion', 'Article 28, on religious instruction in wholly state-funded institutions'],
  sol: 'The right of a community to run its own educational institutions on equal terms is what Article 30 provides. Article 17 is on untouchability, Article 27 on taxes and Article 28 on instruction in institutions wholly funded by the state.',
}));
Q('m_compare_app', mcq({
  t: 1, d: 4, c: 'analysis',
  stem: 'Two councillors in Torvia argue about a shrine that refuses entry to a hereditary group. Councillor Brannoch says the state has no business inside any religion at all. Councillor Selka says the state may act, because the issue is equality. Whose view is closer to the Indian model?',
  opts: ['Selka\'s, since principled distance allows intervention to promote equality', 'Brannoch\'s, since the Indian model forbids all intervention', 'Both are equally close', 'Neither, since the Indian model supports the state religion'],
  sol: 'The Indian model keeps a distance but allows principled intervention for equality, which is Selka\'s view. Brannoch\'s view is closer to mutual exclusion. The Indian model has no state religion.',
}));
Q('m_domination_app', mcq({
  t: 1, d: 4, c: 'analysis',
  stem: 'In an imagined town, a Tessel council fines members who marry outside their hereditary group, and a Sunhold trust refuses a hall for a Tessel wedding. Which description is correct?',
  opts: ['The first is intra-religious domination and the second is inter-religious domination', 'The first is inter-religious domination and the second is intra-religious domination', 'Both are intra-religious domination', 'Neither is a kind of religious domination'],
  sol: 'The fine is imposed inside one community, so it is intra-religious. The refusal of a hall by one community to another is inter-religious. The other options mix them up or deny both.',
}));

// ================================================================ t02: criticisms and replies
Q('m_antirel_reply', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Critics say Indian secularism is anti-religious. What do supporters respond?',
  opts: ['It opposes domination, not religion, and protects the freedom to follow a faith', 'It is indeed meant to end all religion', 'It is meant to rank religions by merit', 'It has nothing to say about religious freedom'],
  sol: 'Supporters point out that the target is domination, whether between or within religions, and that freedom of religion is protected. They do not accept that it aims to end religion or to rank faiths.',
}));
Q('m_import_reply', mcq({
  t: 2, d: 3, c: 'understanding',
  stem: 'Critics call Indian secularism a Western import. Which reply do supporters offer?',
  opts: ['It grew out of India\'s own conditions of deep diversity and differs from the Western model, for example in principled distance', 'It is a copy of the Western model with no changes', 'The place where an idea began decides whether it is valid', 'India has no diversity of religions'],
  sol: 'Supporters argue that the Indian model answers India\'s own diversity and has features, such as principled distance and community support, unlike the Western model. A copy, the origin test and denial of diversity do not answer the critics.',
}));
Q('m_minorism_reply', mcq({
  t: 2, d: 3, c: 'understanding',
  stem: 'Critics say Indian secularism favours minorities. Which reply do supporters offer?',
  opts: ['Minority rights protect vulnerable groups and form part of equal respect; fundamental interests deserve protection', 'Minorities should have more rights than any other group', 'Only larger communities need rights', 'Rights of any group should be removed'],
  sol: 'Supporters argue that rights for minorities guard groups that could be vulnerable and are part of treating all with equal respect. They do not argue for superior status, rights only for large groups or the removal of rights.',
}));
Q('m_interv_reply', mcq({
  t: 2, d: 3, c: 'understanding',
  stem: 'Critics call Indian secularism interventionist. Which reply do supporters offer?',
  opts: ['The state intervenes to promote equality and freedom, as in ending untouchability, and not out of hostility to a community', 'The state should intervene in everything a community does', 'The state does not intervene in any matter', 'Intervention is always wrong, so no law should ever be made'],
  sol: 'Supporters hold that intervention is meant to promote freedom and equality, as with untouchability. They do not say the state may control everything, that it never intervenes or that no law may be made.',
}));
Q('m_votebank_def', mcq({
  t: 2, d: 2, c: 'recall',
  stem: 'Vote-bank politics, as the criticism describes it, means',
  opts: ['seeking the votes of a community by promising favours to it, so that other groups may be neglected', 'a bank in which voters keep their money', 'an election held only in banks', 'a rule that every voter must belong to a party'],
  sol: 'Vote-bank politics is the seeking of a community\'s votes by promising it favours, with the worry that others are then neglected. The other statements have no connection with the term.',
}));
Q('m_votebank_reply', mcq({
  t: 2, d: 3, c: 'evaluation',
  stem: 'Which reply to the vote-bank criticism is the most balanced?',
  opts: ['Groups organising to press for their interests is a normal part of democracy; the real concern arises when this leads to others being neglected', 'No group should ever organise', 'Neglect of other groups is acceptable if votes are gained', 'Democracy has no place for communities'],
  sol: 'A balanced reply accepts that groups press for their interests in a democracy while keeping the concern about neglect in view. Banning all organising, accepting neglect or excluding communities does not do so.',
}));
Q('m_impossible_reply', mcq({
  t: 2, d: 3, c: 'understanding',
  stem: 'Critics call secularism an impossible project because religious differences run deep. What do supporters respond?',
  opts: ['It is an ambitious ideal that helps keep diverse societies together, and partial success is still valuable', 'It has already succeeded completely', 'It should be dropped because it is hard', 'It does not matter whether societies stay together'],
  sol: 'Supporters admit that the ideal is hard but say it helps diverse societies live together and that partial success is worth having. Claiming complete success or dropping the ideal does not answer the critics.',
}));
Q('m_classify_crit', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'At a public meeting in the imagined town of Ashvale a speaker says: the state keeps stepping into how communities arrange their own affairs. Which criticism of Indian secularism is she making?',
  opts: ['That it is interventionist', 'That it is anti-religious', 'That it is a Western import', 'That it is impossible'],
  sol: 'Complaining that the state keeps stepping into the affairs of communities is the interventionist criticism. The anti-religious criticism says it is hostile to religion, the import criticism speaks of its origin, and the impossibility criticism says it cannot be achieved.',
}));
Q('m_classify_import', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'Rafe writes to the Quillfield Post: secularism is an idea that came from far-off lands and does not suit our ways. Which criticism does his letter state?',
  opts: ['That it is a Western import', 'That it is minoritist', 'That it encourages vote-bank politics', 'That it is interventionist'],
  sol: 'Saying the idea came from elsewhere and does not suit local ways is the Western-import criticism. The other criticisms speak of favours, votes or intervention.',
}));
Q('m_balanced', mcq({
  t: 2, d: 4, c: 'evaluation',
  stem: 'Nell is asked to judge the criticism that Indian secularism is anti-religious. Which approach is the best?',
  opts: ['State the criticism, give the supporters\' reply that the target is domination and not religion, then judge with reasons and examples', 'Agree with the critics without giving reasons', 'Ignore the criticism', 'Reject the criticism without reading it'],
  sol: 'A sound evaluation states the criticism, presents the reply and then judges with reasons and examples. Agreeing, ignoring or rejecting without reasons is not evaluation.',
}));
Q('m_partial', mcq({
  t: 2, d: 4, c: 'evaluation',
  stem: 'An editorial in an imagined paper says that since no country has removed religious domination completely, secularism should be given up. Which response is the best?',
  opts: ['An ideal can be worth pursuing even if it is only partly reached, as progress against domination still helps many people', 'The editorial is right, since an ideal must be reached fully', 'No ideal has any value', 'Domination does not exist'],
  sol: 'The best reply is that partial progress against domination still helps people and keeps diverse societies together. Demanding full success, denying the value of ideals or denying domination does not meet the argument.',
}));
Q('m_minorism_app', mcq({
  t: 2, d: 4, c: 'analysis',
  stem: 'In the imagined state of Torvia, a parent complains that the Teshar community has a school protected by the constitution, while her own children have none such. Which reply best reflects the supporters\' view?',
  opts: ['The protection is for a group that could be vulnerable and is part of equal respect; the concern about her own children can be examined on its merits', 'The Teshar school must be closed', 'Her own community has no rights', 'Schools should never be protected by a constitution'],
  sol: 'Supporters would say that protections for minorities guard vulnerable groups and form part of equal respect, while a fair hearing for the parent\'s concern remains possible. Closing the school, denying her rights or banning protection are not part of that view.',
}));
Q('m_interv_app', mcq({
  t: 2, d: 4, c: 'analysis',
  stem: 'A Torvian elder says: our council made its rule on dining long ago, and the state has no right to say that all groups may sit together. What do supporters of the Indian model reply?',
  opts: ['Where a practice denies equality and dignity to people, principled intervention to promote equality is justified', 'The state may never touch any practice', 'The state should ban all dining rules of every kind', 'The elder is right in every case'],
  sol: 'Supporters hold that when a practice denies equality and dignity, the state may intervene on principle. They do not hold that it may never act, that it should regulate everything, or that every practice is protected.',
}));

// ================================================================ assertion-reason
Q('ar_both', ar({
  t: 1, d: 3, c: 'understanding', verdict: 'both-true-explains',
  a: 'Secularism, in the standard sense, is concerned with domination inside religions as well as between them.',
  r: 'Domination within a religious community, for example by caste or gender, is a form of religious domination.',
  sol: 'Both are true, and R explains A: since domination inside a community counts as religious domination, a doctrine against religious domination must cover it too.',
}));
Q('ar_official', ar({
  t: 1, d: 3, c: 'understanding', verdict: 'both-true-explains',
  a: 'A state that names an official religion cannot be called secular in the standard sense.',
  r: 'A secular state has no official religion and is not run by any religious group.',
  sol: 'Both are true, and R explains A: having no official religion is part of what makes a state secular, so a state with one fails the test.',
}));
Q('ar_western', ar({
  t: 1, d: 4, c: 'analysis', verdict: 'both-true-explains',
  a: 'The Western model of secularism, as commonly taught, leaves little room for community-based rights.',
  r: 'That model rests on mutual exclusion of state and religion and centres on the freedom and equality of the individual.',
  sol: 'Both are true, and R explains A: when the model is about individuals and keeps state and religion apart, rights held by a community as such find little room in it.',
}));
Q('ar_pd', ar({
  t: 1, d: 3, c: 'understanding', verdict: 'A-false-R-true',
  a: 'Principled distance means that the Indian state never intervenes in any religious matter.',
  r: 'In the Indian model the state keeps a distance from all religions but may intervene on principle to promote freedom and equality.',
  sol: 'A is false: principled distance allows intervention on principle. R is true and states what the idea means, which contradicts A.',
}));
Q('ar_antirel', ar({
  t: 2, d: 4, c: 'analysis', verdict: 'both-true-not-explains',
  a: 'Critics have argued that Indian secularism is anti-religious.',
  r: 'Supporters respond that it opposes domination, not religion.',
  sol: 'Both are true, but R does not explain A: R is the supporters\' reply to the criticism and gives no reason why critics hold it.',
}));
Q('ar_before76', ar({
  t: 1, d: 3, c: 'understanding', verdict: 'A-true-R-false',
  a: 'The word secular was added to the Preamble of the Indian Constitution by the 42nd Amendment in 1976.',
  r: 'The Constitution contained no provisions on freedom of religion or equal treatment of religions before 1976.',
  sol: 'A is true. R is false: the Constitution was secular in its provisions from the start, with provisions such as freedom of religion and non-discrimination on grounds of religion.',
}));

// ================================================================ true-false, fill-blank, match, ordering
Q('tf_official', tf({
  t: 1, d: 2, c: 'understanding', ans: false,
  stem: 'A secular state may declare one religion its official religion as long as it allows other religions to exist.',
  sol: 'A secular state has no official religion, so declaring one takes away the secular character.',
}));
Q('tf_intra', tf({
  t: 1, d: 3, c: 'understanding', ans: true,
  stem: 'Secularism, as defined by political theorists, is also concerned with domination inside a religious community, for example on grounds of gender.',
  sol: 'The doctrine seeks a society free from both inter-religious and intra-religious domination.',
}));
Q('tf_intervene', tf({
  t: 1, d: 3, c: 'understanding', ans: true,
  stem: 'In the Indian model of secularism, the state may on principle intervene in a religious practice that denies people equality, as in the abolition of untouchability.',
  sol: 'Principled distance allows such intervention to promote freedom and equality.',
}));
Q('tf_antirel', tf({
  t: 2, d: 2, c: 'understanding', ans: false,
  stem: 'Supporters of Indian secularism agree with the critics that its purpose is to oppose religion as such.',
  sol: 'Supporters respond that it opposes domination, not religion.',
}));
Q('fb_intra', fb({
  t: 1, d: 2, c: 'recall',
  stem: 'Secularism seeks a society free from both inter-religious domination and ___ domination.',
  acc: [['intra-religious', 'intra religious', 'intra']],
  sol: 'The other kind is intra-religious domination, domination inside a religious community.',
}));
Q('fb_art17', fb({
  t: 1, d: 2, c: 'recall',
  stem: 'Article ___ of the Indian Constitution abolishes untouchability.',
  acc: [['17', 'seventeen']],
  sol: 'Article 17 abolishes untouchability.',
}));
Q('fb_minoritism', fb({
  t: 2, d: 2, c: 'recall',
  stem: 'The criticism that Indian secularism favours minorities is called ___.',
  acc: [['minoritism', 'minoritist']],
  sol: 'It is called the charge of minoritism.',
}));
Q('mt_articles', match({
  t: 1, d: 3, c: 'understanding', marks: 2,
  stem: 'Match each provision with what it deals with.',
  pairs: [
    ['Article 17', 'Abolition of untouchability'],
    ['Articles 25 to 28', 'Freedom of religion'],
    ['Article 30', 'Educational institutions of minorities'],
    ['The 42nd Amendment, 1976', 'The word secular added to the Preamble'],
  ],
  sol: 'Article 17 abolishes untouchability, Articles 25 to 28 are on freedom of religion, Article 30 on minority educational institutions, and the 42nd Amendment added the word secular to the Preamble.',
}));
Q('mt_crit_reply', match({
  t: 2, d: 3, c: 'application', marks: 2,
  stem: 'Match each criticism of Indian secularism with the reply that supporters give.',
  pairs: [
    ['Anti-religious', 'It opposes domination, not religion'],
    ['A Western import', 'It grew from India\'s own conditions of diversity and differs from the Western model'],
    ['Minoritism', 'Minority rights protect vulnerable groups and are part of equal respect'],
    ['Impossible project', 'It is an ambitious ideal and partial success is still valuable'],
  ],
  sol: 'Each reply answers its criticism: domination and not religion is the target, the model has its own roots, minority rights guard vulnerable groups, and partial success is still valuable.',
}));
Q('ord_evaluate', ord({
  t: 2, d: 3, c: 'application', marks: 2,
  stem: 'Arrange the steps of a well-reasoned evaluation of one criticism of Indian secularism.',
  items: [
    'State the criticism as critics have argued it',
    'Give the reply that supporters offer',
    'Test both against an example',
    'Judge with reasons',
  ],
  sol: 'A good evaluation states the criticism, gives the reply, tests both against an example and then judges with reasons.',
}));
Q('ord_shrine', ord({
  t: 1, d: 4, c: 'analysis', marks: 2,
  stem: 'Arrange the reasoning by which a state following principled distance decides whether to act when a shrine in the imagined town of Dunmere bars a hereditary group.',
  items: [
    'Identify the practice: entry to the shrine is refused to a hereditary group',
    'Ask whether it denies people equality or freedom',
    'Decide on principle that intervention to promote equality is justified',
    'Limit the action to opening entry and leave belief and ritual alone',
  ],
  sol: 'The state first identifies the practice, asks whether it denies equality or freedom, decides on principle to act and limits its action to the matter of equality.',
}));

// ================================================================ short answers (2 marks)
Q('s_def', short({
  t: 1, d: 2, c: 'recall', marks: 2, wl: S2,
  stem: 'Define secularism in the sense used by political theorists.',
  model: '**Secularism** is a doctrine about how society ought to be arranged, aiming at a society with neither **inter-religious** nor **intra-religious domination**. It values **liberty inside each religion** and **equality among religions**, and denies any religious group control of state power.',
  sol: 'Definition with both kinds of domination.',
  scheme: [['Society free from inter-religious and intra-religious domination', 1], ['Freedom within and equality between religions; state power not controlled by a religious group', 1]],
}));
Q('s_kinds', short({
  t: 1, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: 'Distinguish inter-religious from intra-religious domination with one example of each.',
  model: '**Inter-religious domination** is one community dominating another, as when one community bars another from a shared hall. **Intra-religious domination** is domination inside a community, as when a community denies women or a hereditary group equal standing.',
  sol: 'Two kinds with examples.',
  scheme: [['Inter-religious: one community over another, with an example', 1], ['Intra-religious: within one community, for example by caste or gender', 1]],
}));
Q('s_secstate', short({
  t: 1, d: 2, c: 'recall', marks: 2, wl: S2,
  stem: 'State two features of a secular state.',
  model: 'A secular state is **not run by any religious group** and has **no official religion**. It also does **not discriminate** against anyone on grounds of religion, and keeps state power apart from the control of any religious group.',
  sol: 'Two features.',
  scheme: [['Not run by any religious group', 1], ['No official religion or no discrimination on grounds of religion', 1]],
}));
Q('s_western', short({
  t: 1, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: 'Describe the Western model of secularism as it is commonly taught, naming two features.',
  model: 'In the Western model, as often taught, state and religion stay out of each other\'s affairs, which is **mutual exclusion**. The stress falls on the **freedom and equality of the individual**, so **community-based rights** get little space. The United States and France are commonly cited.',
  sol: 'Two features.',
  scheme: [['Mutual exclusion of state and religion', 1], ['Focus on the individual; little room for community-based rights', 1]],
}));
Q('s_pd', short({
  t: 1, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: 'What is meant by principled distance in the Indian model of secularism?',
  model: '**Principled distance** means that the state keeps a **distance from all religions** but may **intervene on principle** to promote freedom and equality, for example by abolishing untouchability, while treating all religions with equal respect.',
  sol: 'Meaning and an example.',
  scheme: [['Distance from all religions, with intervention allowed on principle', 1], ['Aim of freedom and equality, with an example such as untouchability', 1]],
}));
Q('s_art17_app', short({
  t: 1, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'A shrine in the imagined town of Dunmere keeps out a hereditary group of its own community. Which Indian provision is comparable, and why may the state act?',
  model: '**Article 17**, which abolishes untouchability, is comparable. The state may act because the practice denies **equality** and dignity to people inside a religion, and **principled distance** allows intervention to promote equality.',
  sol: 'Article and reason.',
  scheme: [['Article 17 on untouchability named', 1], ['State may intervene on principle to promote equality inside a religion', 1]],
}));
Q('s_art30', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'What does Article 30 of the Indian Constitution provide, and which feature of the Indian model does it reflect?',
  model: '**Article 30** gives religious and linguistic **minorities** the right to set up and administer educational institutions of their choice. It reflects **equal respect** for all communities and support for them on an equal footing.',
  sol: 'Provision and feature.',
  scheme: [['Right of minorities to set up and run educational institutions', 1], ['Equal respect and support on an equal footing', 1]],
}));
Q('s_antirel', short({
  t: 2, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: 'Critics have argued that Indian secularism is anti-religious. How do supporters respond?',
  model: 'Supporters respond that Indian secularism **opposes domination, not religion**. It protects **freedom of religion** under Articles 25 to 28 and respects all religions equally, and it opposes only the domination of one group over another or within a community.',
  sol: 'Reply.',
  scheme: [['It opposes domination, not religion', 1], ['It protects freedom of religion and equal respect', 1]],
}));
Q('s_import', short({
  t: 2, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: 'Some critics call Indian secularism a Western import. State the reply that others give.',
  model: 'Others argue that Indian secularism **grew from India\'s own conditions** of deep religious diversity. It also **differs from the Western model**, for example in **principled distance** and support for communities, so it is not a simple copy.',
  sol: 'Reply with a difference.',
  scheme: [['Grew from India\'s own conditions of diversity', 1], ['Differs from the Western model, with an example', 1]],
}));
Q('s_votebank', short({
  t: 2, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: 'What is the criticism that secularism encourages vote-bank politics, and how is it answered?',
  model: 'Critics argue that seeking the **votes of communities** by promising favours leads to other groups being **neglected**. Supporters respond that groups organising for their interests is part of **democracy**; the concern arises only when it leads to the neglect of others.',
  sol: 'Criticism and reply.',
  scheme: [['Criticism: favours for communities for votes, with neglect of others', 1], ['Reply: organising for interests is part of democracy; the concern is neglect of others', 1]],
}));
Q('s_42', short({
  t: 1, d: 2, c: 'recall', marks: 2, wl: S2,
  stem: 'When was the word secular added to the Preamble, and was the Constitution secular before that?',
  model: 'The word **secular** was added by the **42nd Amendment in 1976**. The Constitution was **already secular in its provisions** from the start, through provisions on freedom of religion and on equal treatment without discrimination on grounds of religion.',
  sol: 'Amendment and earlier provisions.',
  scheme: [['42nd Amendment, 1976', 1], ['Secular in its provisions from the start', 1]],
}));

// ================================================================ short answers (3 marks)
Q('s3_compare', short({
  t: 1, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Compare the Western model, as commonly taught, with the Indian model in respect of the state\'s relation to religion.',
  model: 'The Western model rests on **mutual exclusion**: state and religion do not interfere with each other, and the focus is on the **individual**. The Indian model rests on **principled distance**: the state may intervene on principle to promote **freedom and equality**, and it supports **communities** on an equal footing, as under Article 30.',
  sol: 'Two models compared.',
  scheme: [['Western: mutual exclusion and a focus on the individual', 1], ['Indian: principled distance, intervention to promote equality', 1], ['Indian: equal respect and support for communities, with an example', 1]],
}));
Q('s3_pd_example', short({
  t: 1, d: 4, c: 'application', marks: 3, wl: S3,
  stem: 'Using the imagined Linden Shrine case, explain how a state with principled distance may act and where it should stop.',
  model: 'If the shrine bars a hereditary group, the state may act on principle, because the practice denies **equality**. It may require the shrine to be **open to all** groups. It should stop there and leave **belief, ritual and worship** to the community, since distance from religion is still kept.',
  sol: 'Action and limit.',
  scheme: [['The practice denies equality, so the state may act', 1], ['The action: opening entry to all groups', 1], ['Limit: belief and ritual left alone, so distance is kept', 1]],
}));
Q('s3_intra_app', short({
  t: 1, d: 4, c: 'application', marks: 3, wl: S3,
  stem: 'Explain why a doctrine concerned only with inter-religious domination would be incomplete, using the imagined Rivermark council of Quillfield that bars women from reading aloud.',
  model: 'In Quillfield no second community is involved, so **inter-religious** domination is absent, yet women are denied equal standing by their own community. This is **intra-religious domination**. A doctrine that ignored it would leave such **inequality inside religions** untouched, so secularism must oppose both.',
  sol: 'Case, kind and conclusion.',
  scheme: [['No second community, so not inter-religious', 1], ['Women denied equal standing: intra-religious domination', 1], ['So the doctrine must oppose both kinds', 1]],
}));
Q('s3_minoritism', short({
  t: 2, d: 4, c: 'evaluation', marks: 3, wl: S3,
  stem: 'Present the criticism that Indian secularism favours minorities and the replies of supporters.',
  model: 'Critics have argued that it gives **special protection to minorities** at the cost of others. Supporters respond that **minority rights protect vulnerable groups** and form part of **equal respect**, and that fundamental interests of every group deserve protection. The student can judge by asking whether the rights are on equal terms.',
  sol: 'Criticism, replies, judgement.',
  scheme: [['Criticism: special protection for minorities', 1], ['Reply: minority rights protect vulnerable groups, part of equal respect', 1], ['A reasoned test for judging', 1]],
}));
Q('s3_interv', short({
  t: 2, d: 4, c: 'evaluation', marks: 3, wl: S3,
  stem: 'Critics call Indian secularism interventionist. Give the criticism and the reply, with one example of intervention.',
  model: 'Critics have argued that it **interferes in communities**, and that the state has no business inside them. Others argue that intervention aims to promote **equality and freedom**, as when untouchability was abolished by **Article 17**, and not to attack any community. The test is whether the practice denies people equality or freedom.',
  sol: 'Criticism, reply, example.',
  scheme: [['Criticism: interference in communities', 1], ['Reply: intervention promotes equality and freedom', 1], ['Example such as untouchability', 1]],
}));
Q('s3_impossible', short({
  t: 2, d: 4, c: 'evaluation', marks: 3, wl: S3,
  stem: 'Explain the criticism that secularism is an impossible project and how supporters reply.',
  model: 'Critics have argued that religious differences are so deep that a secular society **cannot be achieved**. Supporters respond that it is an **ambitious ideal** that helps keep **diverse societies together**, and that **partial success** is still valuable, since each reduction of domination helps people.',
  sol: 'Criticism and reply.',
  scheme: [['Criticism: deep differences make it unachievable', 1], ['Reply: an ambitious ideal that helps keep diverse societies together', 1], ['Partial success is still valuable', 1]],
}));
Q('s3_votebank', short({
  t: 2, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'At an imagined town meeting in Ashvale, a speaker says that a plan for school repairs was made only to win the votes of one community. Give the criticism and two points a supporter might make.',
  model: 'The speaker states the criticism of **vote-bank politics**: favours to one community for votes. A supporter may say that **groups organising for their interests** is part of democracy. The supporter may add that the real concern is **neglect of other groups**, which the town can test by checking that the repairs reach all schools.',
  sol: 'Criticism and replies.',
  scheme: [['Criticism: favours for votes', 1], ['Organising for interests is part of democracy', 1], ['Concern is neglect of others, to be tested on facts', 1]],
}));

// ================================================================ long answers (5 marks)
Q('l_meaning', long({
  t: 1, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Explain the meaning of secularism, with the two kinds of religious domination and the features of a secular state.',
  model: '1. **Secularism** is a normative doctrine; it hopes for a society where neither **inter-religious** nor **intra-religious domination** exists.\n2. Inter-religious domination is one community ruling over another; intra-religious domination is domination of some members by others inside a community, for example by caste or gender.\n3. It values **liberty within each religion** and **equality among religions**.\n4. A **secular state** is not controlled by a religious group and has **no official religion**.\n5. Such a state does not discriminate on grounds of religion and holds state power apart from any religious group\'s control.',
  sol: 'Definition, two kinds, aims, features.',
  scheme: [['Definition of secularism', 1], ['Inter-religious and intra-religious domination explained', 1], ['Freedom within and equality between religions', 1], ['Not run by a religious group; no official religion', 1], ['No discrimination on grounds of religion; state power kept apart', 1]],
}));
Q('l_models', long({
  t: 1, d: 4, c: 'analysis', marks: 5, wl: L5,
  stem: 'Compare the Western model of secularism, as commonly taught, with the Indian model.',
  model: '1. The Western model, with the United States and France often given as examples, rests on **mutual exclusion** of state and religion.\n2. Its concern is the **freedom and equality of the individual**, so rights held by **communities** find little room.\n3. The Indian model rests on **principled distance**: the state keeps a distance from all religions but may intervene on principle.\n4. Intervention promotes freedom and equality, as in **Article 17** on untouchability and the opening of places of worship to all castes.\n5. The Indian model also gives **equal respect** to all religions and supports communities, as in **Article 30**.',
  sol: 'Two models compared.',
  scheme: [['Western: mutual exclusion', 1], ['Western: individual focus, little room for community rights', 1], ['Indian: principled distance', 1], ['Indian: intervention for equality, with an example', 1], ['Indian: equal respect and support for communities, with an example', 1]],
}));
Q('l_indian_features', long({
  t: 1, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Describe the main features of the Indian model of secularism, with reference to the Constitution.',
  model: '1. India has **no state religion**, and the state is not run by any religious group.\n2. **Freedom of religion** is protected by Articles 25 to 28.\n3. **Article 17** abolishes untouchability, an example of principled intervention for equality.\n4. All religions receive **equal respect**, and communities are supported on an equal footing, as by **Article 30** on minority educational institutions.\n5. The word **secular** was added to the Preamble by the 42nd Amendment (1976), but the Constitution was secular in its provisions from the start.',
  sol: 'Features with Articles.',
  scheme: [['No state religion', 1], ['Freedom of religion, Articles 25 to 28', 1], ['Principled distance, with Article 17', 1], ['Equal respect and Article 30', 1], ['42nd Amendment and secular provisions from the start', 1]],
}));
Q('l_torvia', long({
  t: 1, d: 5, c: 'evaluation', marks: 5, wl: L5,
  stem: 'The imagined country of Torvia, whose people follow the Sunhold, Rivermark and Tessel faiths and several hereditary groups, must choose between mutual exclusion and principled distance. Present the case for each and say which better answers the problem of domination inside religions.',
  model: '1. **Mutual exclusion** keeps state and religion apart and protects **individual freedom**.\n2. Its limit is that the state may stand aside when a shrine bars a **hereditary group**.\n3. **Principled distance** lets the state act on principle to promote **equality**, as in opening shrines to all.\n4. It also gives **equal respect** and support to every community.\n5. Since intra-religious domination needs action, principled distance answers it better, though some may fear **excess intervention**.',
  sol: 'Two cases and a reasoned judgement.',
  scheme: [['Mutual exclusion and individual freedom', 1], ['Its limit on domination inside religions', 1], ['Principled distance and equality', 1], ['Equal respect and support for communities', 1], ['A reasoned judgement, noting the other view', 1]],
}));
Q('l_crit3', long({
  t: 2, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: 'Explain any three criticisms of Indian secularism and the replies given to them.',
  model: '1. Critics have argued that it is **anti-religious**; supporters respond that it opposes **domination, not religion**.\n2. Critics call it a **Western import**; others argue that it grew from India\'s **own conditions of diversity** and differs from the Western model.\n3. Critics say it favours minorities; supporters respond that **minority rights protect vulnerable groups** and are part of equal respect.\n4. Each reply gives reasons that the student can test.\n5. The student weighs both sides and judges with **reasons**.',
  sol: 'Three criticisms with replies, and a judgement.',
  scheme: [['Anti-religious and its reply', 1], ['Western import and its reply', 1], ['A third criticism and its reply', 1], ['Replies given with reasons', 1], ['Reasoned judgement', 1]],
}));
Q('l_crit_all', long({
  t: 2, d: 5, c: 'evaluation', marks: 5, wl: L5,
  stem: 'Critics have made several charges against Indian secularism. Discuss the interventionist, vote-bank and impossible-project criticisms, giving the reply to each.',
  model: '1. Critics call it **interventionist**; others argue that intervention promotes **equality and freedom**, as with untouchability.\n2. The test of intervention is whether a practice denies people **equality or freedom**, and not the identity of the community.\n3. Critics say it encourages **vote-bank politics**; supporters respond that groups organising for interests is part of democracy, and the concern is **neglect of others**.\n4. Critics call it an **impossible project**; supporters call it an ambitious ideal that keeps diverse societies together, where **partial success** is still valuable.\n5. The student judges each with reasons.',
  sol: 'Three criticisms with replies and a judgement.',
  scheme: [['Interventionist and its reply', 1], ['The test: whether a practice denies equality or freedom', 1], ['Vote-bank criticism and reply', 1], ['Impossible project and reply', 1], ['A reasoned judgement', 1]],
}));

// ================================================================ case-based (4 marks: 1 + 1 + 2)
Q('c_council', caseQ({
  t: 1, d: 4, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the report and answer the questions that follow. *(An imagined report written by SOYL for practice; Torvia, Dunmere, the Linden Shrine and the people named are not real.)*',
  passage: '**From the Dunmere Courier, imagined**\n\nFor as long as the town remembers, the trust that runs the Linden Shrine has kept families of the Ostler group, a hereditary group within the Rivermark community, out of the inner hall. The trust says the rule is part of the community\'s own tradition. Joren Vale, an Ostler schoolteacher, has asked the Torvian authorities to act. A law of Torvia says that every shrine open to the public must admit people of all hereditary groups. Councillor Tilda Mere says the state must not decide how any faith is practised, while the schools officer says that equal entry is a matter of equality and not of belief.',
  parts: [
    child('a', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'What kind of religious domination does the rule of the trust show?', model: '**Intra-religious domination**, since it is practised inside one community.', sol: 'Within one community.', scheme: [['Intra-religious domination', 1]] })),
    child('b', short({ t: 1, d: 3, c: 'application', marks: 1, stem: 'Name the feature of the Indian model of secularism that allows the state to act in such a case.', model: '**Principled distance**, which allows intervention on principle to promote equality.', sol: 'Principled distance.', scheme: [['Principled distance', 1]] })),
    child('c', short({ t: 1, d: 4, c: 'analysis', marks: 2, stem: '**Either** (i): Show how the schools officer\'s point answers Councillor Mere\'s worry.', model: 'The councillor fears the state deciding how a faith is **practised**. The officer points out that the law concerns **equal entry**, a matter of equality, and leaves **belief and worship** to the trust. So the state acts on principle and still keeps its distance.', sol: 'Equality and limits.', scheme: [['Councillor\'s worry: the state deciding how a faith is practised', 1], ['Reply: the law concerns equal entry and leaves belief and worship alone', 1]] }), [
      short({ t: 1, d: 5, c: 'evaluation', marks: 2, stem: '**Or** (ii): Say how a state following mutual exclusion would find Joren\'s request harder to meet, and give a reason.', model: 'Under **mutual exclusion** the state does not **interfere in religion**, so it may hold that the shrine\'s rule is not its concern. The model focuses on **individual freedom**, and so gives less ground for acting on a rule inside a community.', sol: 'Why mutual exclusion gives less room.', scheme: [['The state keeps out of religion under mutual exclusion', 1], ['A reason such as the focus on the individual or on the community\'s autonomy', 1]] }),
    ]),
  ],
}));
Q('c_school', caseQ({
  t: 1, d: 4, c: 'application', origin: 'soyl-original',
  stem: 'Read the letter and answer the questions that follow. *(An imagined letter written by SOYL for practice; Pellmoor, Ember School and the people named are not real.)*',
  passage: '**Imagined letter to the Pellmoor Voice**\n\nThe Teshar community of our town has set up Ember School to teach its own language and customs, and the town board recognises it on the same terms as every other school, including the schools of the Sunhold and Rivermark communities. A reader, Orrin Fell, writes that the community has been given a privilege. Another reader, Vessa Dray, replies that the Teshar community is small and that without such recognition its language might fade.',
  parts: [
    child('a', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'Which Article of the Indian Constitution protects the right of minorities to run educational institutions of their choice?', model: '**Article 30**.', sol: 'Article 30.', scheme: [['Article 30', 1]] })),
    child('b', short({ t: 1, d: 3, c: 'application', marks: 1, stem: 'Which feature of the Indian model of secularism does the board\'s equal recognition of all schools show?', model: '**Equal respect** for all communities, with support on an equal footing.', sol: 'Equal respect.', scheme: [['Equal respect for all religions, support on an equal footing', 1]] })),
    child('c', short({ t: 1, d: 4, c: 'analysis', marks: 2, stem: '**Either** (i): Explain why the Western model, as commonly taught, gives less room for a school such as Ember School.', model: 'The Western model, as commonly taught, centres on the **individual** and on **mutual exclusion**, so it gives little room for **community-based rights** such as the right of a community to run a school to keep its language and customs.', sol: 'Individual focus.', scheme: [['The model centres on the individual and on mutual exclusion', 1], ['Little room for community-based rights such as a community school', 1]] }), [
      short({ t: 1, d: 5, c: 'evaluation', marks: 2, stem: '**Or** (ii): Say how a supporter of the Indian model might reply to Orrin Fell, giving one reason.', model: 'A supporter might say that the same terms are given to **every community**, so there is no privilege, and that protection of a **small community\'s** school guards a group that could be **vulnerable**, which is part of equal respect.', sol: 'Equal terms and protection of the vulnerable.', scheme: [['Same terms to all communities', 1], ['Protection of a vulnerable small group is part of equal respect', 1]] }),
    ]),
  ],
}));
Q('c_statements', caseQ({
  t: 1, d: 4, c: 'application', origin: 'soyl-original',
  stem: 'Read the table and answer the questions that follow. *(An imagined table written by SOYL for practice; Ashvale, the faiths named and the people named are not real.)*',
  passage: '**Four complaints heard at an imagined town meeting in Ashvale**\n\n| Complaint | What is said |\n|---|---|\n| 1 | A Sunhold trust lets only Sunhold processions use the main street, and refuses the Tessel community each year |\n| 2 | A Rivermark council fines women of its community who take part in its feast without a male relative |\n| 3 | A Tessel elder forbids families of one hereditary group of the Tessel community to enter the common courtyard |\n| 4 | A Sunhold bookseller is refused a shop licence because of his faith |',
  parts: [
    child('a', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'Which complaint shows intra-religious domination on the ground of gender?', model: '**Complaint 2**.', sol: 'Women of the Rivermark community are restricted.', scheme: [['Complaint 2', 1]] })),
    child('b', short({ t: 1, d: 3, c: 'application', marks: 1, stem: 'Why is complaint 1 inter-religious domination?', model: 'One **community** uses its hold over a public space to shut out **another**.', sol: 'One community over another.', scheme: [['One community excludes another', 1]] })),
    child('c', short({ t: 1, d: 4, c: 'analysis', marks: 2, stem: '**Either** (i): Which complaint shows discrimination by the state itself, and which principle of a secular state does it break?', model: '**Complaint 4**, where a shop licence is refused because of faith. A secular state does **not discriminate** on grounds of religion, so the refusal breaks that principle.', sol: 'Complaint 4 and non-discrimination.', scheme: [['Complaint 4 identified', 1], ['Principle: no discrimination on grounds of religion', 1]] }), [
      short({ t: 1, d: 5, c: 'evaluation', marks: 2, stem: '**Or** (ii): Explain why complaints 2 and 3 matter to secularism even though only one community is involved in each.', model: 'Secularism seeks freedom **within** religions as well as equality between them. Complaints 2 and 3 show **intra-religious domination** by gender and by hereditary group, so they matter even without a second community.', sol: 'Freedom within religions.', scheme: [['Secularism covers freedom within religions', 1], ['They show intra-religious domination by gender and hereditary group', 1]] }),
    ]),
  ],
}));
Q('c_debate', caseQ({
  t: 2, d: 4, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the extract and answer the questions that follow. *(An imagined classroom debate written by SOYL for practice; Quillfield, the class and the speakers are not real.)*',
  passage: '**Extract from a class debate in an imagined school in Quillfield**\n\nPerrin: Secularism in our country seems to favour small communities, which get protections that others lack.\nIlse: Those protections guard groups that could be vulnerable, and they are part of treating every community with equal respect.\nWynn: I think the idea came from other lands, so it cannot suit us.\nCorin: It grew out of our own diversity and it differs from the models of other lands, so I disagree.\nTeacher: Do not simply choose a side. Weigh each claim with its reasons.',
  parts: [
    child('a', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Which criticism does Perrin make?', model: 'That Indian secularism **favours minorities** (minoritism).', sol: 'Favours minorities.', scheme: [['Minoritism', 1]] })),
    child('b', short({ t: 2, d: 3, c: 'application', marks: 1, stem: 'Name the criticism raised by Wynn and one reply from the extract.', model: 'The **Western import** criticism; Corin replies that it **grew out of our own diversity**.', sol: 'Western import and reply.', scheme: [['Western import with a reply from the extract', 1]] })),
    child('c', short({ t: 2, d: 4, c: 'evaluation', marks: 2, stem: '**Either** (i): Show how the teacher\'s advice helps a student to judge Perrin\'s criticism.', model: 'The teacher asks for each claim to be **weighed with reasons**. Perrin gives a criticism and Ilse a reply, so the student can test whether the protections are on **equal terms** and whether other groups are **neglected**, and then judge.', sol: 'Weighing claims with reasons.', scheme: [['Each claim weighed with reasons', 1], ['A test such as equal terms or neglect of others', 1]] }), [
      short({ t: 2, d: 5, c: 'evaluation', marks: 2, stem: '**Or** (ii): Give one point in favour of Corin\'s reply and one question that a critic might still ask.', model: 'In favour: the idea may be **rooted in local diversity** and differ from other models. A critic might still ask whether **features common to other models**, such as limits on state action, are being met in practice.', sol: 'A point and a question.', scheme: [['A point such as roots in local diversity or difference from other models', 1], ['A fair question the critic might still ask', 1]] }),
    ]),
  ],
}));
Q('c_editorial', caseQ({
  t: 2, d: 5, c: 'evaluation', origin: 'soyl-original',
  stem: 'Read the editorial and answer the questions that follow. *(An imagined editorial written by SOYL for practice; the Torvian Weekly and every person named are not real.)*',
  passage: '**From an imagined editorial in the Torvian Weekly**\n\nEvery season, groups press the state for school repairs, grants and festival halls. A reader says this is vote-bank politics and proves that a secular society cannot be built. A second reader says that groups pressing for their interests is what a democracy looks like, and that the test is whether any group is left out. A third reader says that even if the ideal is only half reached, the half is worth having because it keeps neighbours living together.',
  parts: [
    child('a', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Which criticism does the first reader state?', model: '**Vote-bank politics**, together with the charge that the project is impossible.', sol: 'Vote-bank and impossible.', scheme: [['Vote-bank politics (or impossible project)', 1]] })),
    child('b', short({ t: 2, d: 3, c: 'understanding', marks: 1, stem: 'State the test that the second reader proposes.', model: 'Whether any group is **left out** or neglected.', sol: 'Neglect of others.', scheme: [['Whether any group is left out', 1]] })),
    child('c', short({ t: 2, d: 5, c: 'evaluation', marks: 2, stem: '**Either** (i): Explain the third reader\'s reply to the charge that secularism is an impossible project.', model: 'The third reader says that an ideal only **partly reached** is still valuable, because it **keeps neighbours living together**. This matches the reply that secularism is an **ambitious ideal** that helps hold diverse societies together.', sol: 'Partial success.', scheme: [['Partial success is still valuable', 1], ['It helps diverse societies keep together', 1]] }), [
      short({ t: 2, d: 5, c: 'evaluation', marks: 2, stem: '**Or** (ii): Explain why the second reader\'s test is a fair way to judge the vote-bank criticism.', model: 'It accepts that groups **organise for their interests** in a democracy, and still takes the critics\' worry seriously by asking whether any group is **neglected**. It turns a charge into a question that evidence can answer.', sol: 'Accepts organising, tests neglect.', scheme: [['Groups organising for interests is part of democracy', 1], ['Tests the real concern: neglect of others, by evidence', 1]] }),
    ]),
  ],
}));
