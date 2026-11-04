// CBSE 11 Political Science, ch10 The Philosophy of the Constitution: question bank. Every passage (handbook table,
// newspaper report, classroom debate, letter) is written by SOYL and labelled as imagined; the countries Veldora, Tarsia,
// Halcor, Mirenia, Norvale, Zandria and Brendale, the states Delvar, Orwen and Kalmar, the towns, schools and people in
// scenarios are imagined. No NCERT text, boxed source, cartoon, Constitution text, Preamble text, speech, Constituent
// Assembly debate, court judgment or board/sample-paper item is reused (D-036). Articles are cited by number with a
// paraphrase of what they provide.
import { Q, mcq, ar, tf, fb, match, ord, short, long, caseQ, child } from '../../cbse-11-political-science-ch01/src/lib.mjs';

const S2 = [30, 50];
const S3 = [50, 80];
const L5 = [80, 120];

// ================================================================ meaning of a philosophy of the Constitution
Q('m_phil_def', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'What is meant by the philosophy of a constitution?',
  opts: ['The ideals and moral values that lie behind its provisions and give them direction', 'The list of all its Articles in numerical order', 'The legal procedure by which it can be amended', 'The history of the court cases decided under it'],
  sol: 'The philosophy of a constitution is the set of ideals and values that its provisions are meant to serve. A list of Articles, an amendment procedure and a record of cases deal with its text, its change and its use, not with the ideals behind it.',
}));
Q('m_means_app', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'An editorial in the imagined newspaper Tarsia Daily argues that the national constitution is more than a rule book for officials, because its choices about equality and dignity show what kind of society Tarsia wants to become. This editorial treats a constitution as',
  opts: ['a statement of moral values and a vision of the society a people wish to build', 'a purely technical manual of office procedures', 'a record of past court cases', 'a document that matters only to lawyers'],
  sol: 'The editorial reads the choices in the document as expressions of values, so it sees a constitution as a moral and social vision. A technical manual, a case record or a lawyers\' text would not carry such a meaning for ordinary citizens.',
}));
Q('m_limit_power', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'A clause in the constitution of the imagined republic of Norvale says that no minister may order a person to be locked up unless the person is brought before a judge within a fixed number of days. Which purpose of a constitution does this clause mainly serve?',
  opts: ['Limiting the power of those who govern, even when they enjoy a majority', 'Increasing the powers of the police', 'Fixing the date of the next election', 'Choosing the national anthem'],
  sol: 'A rule that binds ministers protects individuals against the arbitrary use of authority, which is the limiting function of a constitution. The clause does not enlarge police powers, and it has nothing to do with election dates or anthems.',
}));
Q('m_transform', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'Before the new constitution of the imagined society of Brendale, members of a community called the Lowrens were not allowed to draw water from common wells. The constitution declares such exclusion unlawful and gives the Lowrens an equal place in public life. This shows a constitution used as',
  opts: ['a means of democratic transformation of an unequal society', 'a tool to keep the old ranks unchanged', 'a way of ending all elections', 'a treaty with a foreign power'],
  sol: 'A document that removes long-standing exclusion and opens an equal place to all is working to change society by peaceful, lawful means, which is democratic transformation. Keeping the old ranks, ending elections or signing a treaty would not match what the clause does.',
}));
Q('m_assembly_src', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Why do students of political theory read the debates of the Constituent Assembly when they study the philosophy of the Constitution?',
  opts: ['The debates show the ideals and reasoning that members offered for its provisions', 'The debates replace the text of the Constitution', 'The debates record the results of later elections', 'The debates list the prices of goods in 1949'],
  sol: 'Members explained why they wished a provision to take a certain form, so the debates help a reader to see the ideals behind the text. They do not replace the text, and they are not a record of later elections or prices.',
}));

// ================================================================ the Preamble and its ideals
Q('m_pre_nature', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Which of the following correctly lists the words that describe the nature of the Indian state in the Preamble?',
  opts: ['Sovereign, socialist, secular, democratic, republic', 'Sovereign, federal, theocratic, democratic, republic', 'Independent, socialist, secular, oligarchic, monarchy', 'Sovereign, capitalist, secular, democratic, republic'],
  sol: 'The five words are sovereign, socialist, secular, democratic and republic. The other lists bring in words such as theocratic, oligarchic, monarchy or capitalist, which the Preamble does not use to describe the state.',
}));
Q('m_pre_42', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'Which set of words was added to the Preamble by the 42nd Amendment (1976)?',
  opts: ['Socialist, secular and integrity', 'Sovereign, democratic and republic', 'Justice, liberty and equality', 'Fraternity and dignity'],
  sol: 'The 42nd Amendment added socialist, secular and integrity. Sovereign, democratic and republic, as well as justice, liberty, equality and fraternity, were part of the Preamble from the start.',
}));
Q('m_just_classify', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'A clause in the imagined constitution of Zandria says that every worker shall be paid a wage on which a family can live decently. Under which ideal of the Indian Preamble would such a clause be placed?',
  opts: ['Economic justice', 'Political justice', 'Liberty of worship', 'Unity and integrity of the nation'],
  sol: 'A clause about wages and a decent living concerns fairness in economic life, which is economic justice. Political justice is about a voice in public affairs, liberty of worship about faith, and unity and integrity about the nation as a whole.',
}));
Q('m_lib_classify', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'A clause in the imagined constitution of Mirenia says that no one may be punished for peacefully holding or sharing an opinion. Which Preamble ideal does it express?',
  opts: ['Liberty of thought and expression', 'Equality of status', 'Economic justice', 'Fraternity'],
  sol: 'Protection for the peaceful holding and sharing of opinions is liberty of thought and expression. Equality of status, economic justice and fraternity deal with standing, livelihood and belonging.',
}));
Q('m_frat_classify', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'The imagined charter of Halcor asks every school to teach the shared story of all its communities, so that children of different communities feel that they belong together. Which Preamble ideal is this closest to?',
  opts: ['Fraternity', 'Liberty of faith', 'Political justice', 'Equality of opportunity'],
  sol: 'Teaching people to feel that they belong together builds the sense of common life that fraternity stands for. Liberty of faith, political justice and equality of opportunity concern other matters.',
}));
Q('m_eq_opp', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'Two equally able students of the imagined town of Brenmark compete for a college seat. One belongs to a community that was kept out of schools for generations. A scheme sets aside some seats for that community. Which ideal does the scheme mainly try to advance?',
  opts: ['Equality of opportunity', 'Liberty of worship', 'Sovereignty of the state', 'The republican form of government'],
  sol: 'The scheme gives members of a long-excluded community a fair chance to compete, which is equality of opportunity. Worship, sovereignty and the republican form are not what such a scheme addresses.',
}));
Q('m_status_vs_opp', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Which statement correctly distinguishes equality of status from equality of opportunity?',
  opts: ['Status refers to equal standing before the law and in society; opportunity refers to a fair chance to develop and compete', 'Status refers to equal wealth; opportunity refers to equal votes', 'Status refers to equal marks in examinations; opportunity refers to equal jobs for everyone', 'There is no difference between the two'],
  sol: 'Equality of status is about the equal standing of persons, and equality of opportunity is about a fair chance for each to make use of their abilities. They do not mean equal wealth, equal marks or equal jobs, and the two are not the same.',
}));
Q('m_fraternity_two', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'Fraternity, as an ideal of the Preamble, is said to assure two things. They are',
  opts: ['the dignity of the individual and the unity and integrity of the nation', 'the wealth of the individual and the size of the nation', 'the speed of justice and the number of states', 'the freedom of the press and the strength of the army'],
  sol: 'Fraternity is linked with respect for each person and with the oneness of the nation. Wealth, size, speed of justice, number of states, the press and the army are not what the ideal is said to assure.',
}));

// ================================================================ core features
Q('m_ind_arrest_app', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'The police of the imagined province of Mirenia keep a trader in a lock-up for many days without telling him why and without taking him before a magistrate. Which feature of the political philosophy of the Indian Constitution speaks most directly against such a practice?',
  opts: ['Individual freedom, including protection against arbitrary arrest', 'Universal adult franchise', 'Asymmetric federalism', 'A common national identity'],
  sol: 'Holding a person without reasons or a hearing is an arbitrary use of power, which the commitment to individual freedom, with its protection against arbitrary arrest, rules out. Franchise, federal arrangements and national identity are not the values at stake.',
}));
Q('m_sc_st_app', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'A scheme in the imagined state of Delvar sets aside a share of seats in public colleges for communities that were shut out of education for generations. Supporters call it a path to equal opportunity. Which value of the Constitution\'s philosophy does the scheme express?',
  opts: ['Social justice', 'Secularism', 'Federalism', 'Universal franchise'],
  sol: 'Special provisions for groups that suffered long exclusion, meant to widen their opportunities, express social justice. They are not an example of secularism, federalism or the franchise.',
}));
Q('m_reserve_why', mcq({
  t: 1, d: 3, c: 'understanding',
  stem: 'According to the usual textbook account, why does the Constitution provide reservations for Scheduled Castes and Scheduled Tribes?',
  opts: ['As a means of securing equality of opportunity for groups that suffered long exclusion', 'To give them a permanent separate state', 'To end the principle of equality', 'To remove them from general elections'],
  sol: 'Reservations are presented as a way to give long-excluded groups a fair chance, so they serve equality of opportunity. They do not set up separate states, they do not abandon equality, and they do not remove anyone from general elections.',
}));
Q('m_minority_app', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'A linguistic minority in the imagined state of Orwen wishes to start and run its own schools to teach in its mother tongue. Which constitutional idea supports the community in doing so?',
  opts: ['The recognition of minority rights, including the right to run educational institutions', 'The rule that every school must be run by the state', 'The residuary powers of the Union', 'The adult franchise'],
  sol: 'The Constitution recognises the rights of religious and linguistic minorities to run educational institutions of their choice. A state monopoly on schools would deny this right, and residuary powers and the franchise concern other matters.',
}));
Q('m_community_rights', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'What is distinctive about the approach of the Indian Constitution to rights, in the textbook account?',
  opts: ['It recognises the rights of communities, such as minorities, alongside the rights of individuals', 'It recognises only the rights of individuals', 'It recognises only the rights of communities', 'It leaves every right to be decided by ordinary state laws'],
  sol: 'The textbook account points out that the Constitution gives community-based rights, such as those of minorities, together with individual rights. It does not limit itself to either kind alone, and it does not leave rights to ordinary state laws.',
}));
Q('m_secular_def', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'Which statement gives a standard definition of secularism?',
  opts: ['The principle that the state keeps apart from any one religion, favours none and is hostile to none, and treats all believers and non-believers equally', 'The principle that the state adopts the religion of the majority', 'The principle that religion is banned from all public life', 'The principle that religious leaders rule the state'],
  sol: 'Secularism means that the state does not identify itself with any one religion and treats everyone equally whatever their belief. Adopting the majority faith, banning religion, or rule by religious leaders would each go against that principle.',
}));
Q('m_secular_model_app', mcq({
  t: 1, d: 4, c: 'analysis',
  stem: 'The imagined state of Veldora keeps religion entirely out of public life: it never funds or helps a religious body and never interferes in a religious practice. The imagined state of Tarsia keeps a principled distance, supports the institutions of all faiths on equal terms, and may pass laws to end practices that deny equality. Which pairing is correct?',
  opts: ['Veldora follows strict separation, typical of the Western model; Tarsia follows a model like the Indian one', 'Veldora follows the Indian model; Tarsia follows strict separation', 'Both follow strict separation', 'Neither can be called secular'],
  sol: 'Complete non-involvement and no support for any religious body is strict separation, the typical Western pattern. Equal support for all faiths, together with the power to intervene to reform, is the mark of the Indian model, so the other pairings reverse or deny this.',
}));
Q('m_secular_support_app', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'The government of the imagined state of Kalmar offers repair grants to school buildings run by trusts of several religions, on the same terms to each. Which feature of Indian secularism does this show?',
  opts: ['The state may support communities equally instead of keeping strict separation', 'The state establishes one religion as official', 'The state bans religious schools', 'The state never has any dealings with religious bodies'],
  sol: 'Equal grants to institutions of different faiths show support given without preference, which is allowed in the Indian model. An official religion, a ban on religious schools, or total non-involvement would be different arrangements.',
}));
Q('m_secular_reform_app', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'A law of the imagined state of Orwen forbids the managers of a shrine to turn away people because of the community into which they were born. Which feature of the Indian model of secularism does this illustrate?',
  opts: ['The state may step in to reform religious practices that deny equality', 'The state never interferes in religion', 'The state favours one religion over others', 'Religion has no place in the life of the people'],
  sol: 'A law that ends exclusion on grounds of birth shows the state intervening to reform a practice, as it did against untouchability. This differs from non-interference, from favouring one faith, or from denying religion any place in life.',
}));
Q('m_franchise_why', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'The imagined republic of Brenmark announces that all its adults shall vote under a system of universal adult franchise. Which description of this system is correct?',
  opts: ['The right of every adult citizen to vote, whatever their wealth, education, caste, gender or religion', 'The right to vote only for owners of property', 'The right to vote only for educated citizens', 'The right to vote only for men'],
  sol: 'Universal adult franchise gives the vote to every adult citizen without tests of property, learning, caste, gender or faith. The other options describe restricted voting rights of the kind found in older systems.',
}));
Q('m_franchise_compare', mcq({
  t: 1, d: 4, c: 'analysis',
  stem: 'In the imagined country of Halcor the vote was given first to men who owned land, later to all men, and only after many decades to women. The imagined country Mirenia gave every adult the vote at its very first election, though most voters had never been to school. What made the approach of Mirenia bold?',
  opts: ['It trusted all adult citizens as equal members of the political community from the start, instead of extending the vote in stages', 'It gave the vote only to educated people', 'It abolished elections', 'It copied Halcor exactly'],
  sol: 'Granting the vote to everyone at once, in spite of poverty and lack of schooling, treated every adult as an equal citizen from the beginning, unlike the staged extension in Halcor. The other options describe restricted voting, no elections, or imitation of Halcor.',
}));
Q('m_asym', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'The Constitution contains special provisions for certain states, for example under Article 371 and related Articles, while other states have none of these provisions. This feature belongs to its approach to',
  opts: ['federalism with asymmetric arrangements', 'a unitary system', 'strict secularism', 'a gradual extension of the vote'],
  sol: 'Different arrangements for different states are the sign of asymmetric federalism. A unitary system has no states of this kind, and secularism and the franchise are separate matters.',
}));
Q('m_natid', mcq({
  t: 1, d: 3, c: 'understanding',
  stem: 'Which statement best expresses the idea of national identity in the philosophy of the Indian Constitution?',
  opts: ['One national identity that does not cancel regional, linguistic or religious identities', 'A national identity that replaces every other identity', 'A national identity based on a single religion', 'The absence of any national identity'],
  sol: 'The Constitution presents a common national identity that sits beside other identities and does not erase them. Replacing all identities, basing identity on one religion, or having none would each depart from this idea.',
}));
Q('m_proc_app', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'A drafting committee of the imagined assembly of Zandria meets for many weeks, hears every member on a disputed clause, redrafts it to include part of each side\'s concern, and adopts it without a division. Which procedural achievement does this show?',
  opts: ['Faith in deliberation, a spirit of compromise and a search for consensus', 'Universal adult franchise', 'Judicial review', 'Asymmetric federalism'],
  sol: 'Hearing all sides, redrafting to meet concerns and adopting the clause without a division are marks of deliberation, compromise and consensus. The franchise, judicial review and asymmetric federalism are different features.',
}));

// ================================================================ criticisms and limitations
Q('m_crit_classify', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'In a debate at the imagined Lakemoor School, a student says that the Constitution has so many Articles, schedules and details that ordinary people find it hard to follow. Which criticism is this?',
  opts: ['That it is unwieldy', 'That it is unrepresentative', 'That it is alien', 'That it is silent on the franchise'],
  sol: 'A complaint about length and detail is the criticism that the document is unwieldy. Unrepresentative refers to the way the Assembly was chosen, and alien refers to borrowed provisions.',
}));
Q('m_crit_reply_app', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'A student of the imagined Lakemoor School replies to a critic by saying that, although the Constituent Assembly was chosen on a limited franchise, its members stood for many different opinions and its debates were open. Which criticism is being answered?',
  opts: ['That the Constituent Assembly was unrepresentative', 'That the Constitution is unwieldy', 'That the Constitution is alien', 'That it left gender justice untouched'],
  sol: 'A reply about the range of opinions and the open debates is aimed at the charge that the Assembly was not representative. The other criticisms would call for replies about length, borrowing or gender.',
}));
Q('m_alien', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Critics have argued that the Constitution is alien because many of its provisions were borrowed. Which reply is commonly given?',
  opts: ['Borrowed ideas were adapted to Indian conditions and to the ideals of the national movement', 'No provision was borrowed from anywhere', 'Borrowed provisions were copied without change', 'Borrowing is a defect that cannot be answered'],
  sol: 'The usual reply is that ideas from elsewhere were reshaped to fit Indian needs and the ideals of the national movement. Denying all borrowing, claiming exact copying, or conceding that no answer exists is not the reply put forward.',
}));
Q('m_lim_unity', mcq({
  t: 1, d: 4, c: 'analysis',
  stem: 'Some critics say that the Constitution rests on a centralised notion of national unity. Which of the following would they most likely cite in support?',
  opts: ['The strong powers given to the Union in relation to the states', 'The right of minorities to run schools', 'The grant of the vote to all adults', 'Special provisions for some states'],
  sol: 'A centralised idea of unity would be supported by strong Union powers. Minority rights, the adult franchise and special provisions for some states are often cited to show respect for diversity or equality, not centralisation.',
}));
Q('m_lim_gender', mcq({
  t: 1, d: 3, c: 'understanding',
  stem: 'Which limitation concerning gender justice is noted by some critics?',
  opts: ['Issues of justice within the family were not fully addressed', 'Women were denied the vote at the start', 'The Constitution permitted untouchability', 'There is no right to equality'],
  sol: 'The textbook account notes that some matters of gender justice inside the family were not fully addressed. Women did have the vote from the start, untouchability was abolished, and equality is a Fundamental Right.',
}));
Q('m_lim_dp', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'A critic asks why a claim such as an adequate means of livelihood is a guiding principle for the state and not a right that a citizen can claim in court. Which limitation is the critic raising?',
  opts: ['That some social and economic rights were placed in the Directive Principles and not among the Fundamental Rights', 'That the vote was limited at the start', 'That the Preamble is too long', 'That the Assembly borrowed too much'],
  sol: 'The critic asks why some social and economic rights sit in the Directive Principles, which are not enforceable in court, instead of the Fundamental Rights. The other options concern the franchise, the Preamble and borrowing.',
}));

// ================================================================ assertion-reason
Q('ar_limit', ar({
  t: 1, d: 3, c: 'understanding', verdict: 'both-true-explains',
  a: 'A constitution can serve as a check on those who hold power.',
  r: 'It lays down rules that bind governments, even a government backed by a majority.',
  sol: 'Both are true, and R explains A: because the rules bind every government, a constitution can restrain the use of power.',
}));
Q('ar_secular', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'A-false-R-true',
  a: 'Indian secularism requires a strict separation in which the state may never intervene in any religious matter.',
  r: 'The Indian state may intervene to reform religious practices that deny equality, and may support communities equally.',
  sol: 'A is false, since the Indian model keeps a principled distance and does not demand strict separation. R is true and describes the actual position, which contradicts A.',
}));
Q('ar_pre42', ar({
  t: 1, d: 3, c: 'recall', verdict: 'A-false-R-true',
  a: 'The words socialist and secular were part of the Preamble as adopted in 1949.',
  r: 'The 42nd Amendment of 1976 added the words socialist, secular and integrity.',
  sol: 'A is false, because those words were inserted in 1976. R is true, so the two statements contradict each other.',
}));
Q('ar_reserve', ar({
  t: 1, d: 4, c: 'analysis', verdict: 'A-true-R-false',
  a: 'Reservations for Scheduled Castes and Scheduled Tribes are presented as a means to equality of opportunity.',
  r: 'The Constitution allows no special provision of any kind for any group.',
  sol: 'A is true, because reservations aim to widen the opportunities of long-excluded groups. R is false, since the Constitution does allow such special provisions.',
}));
Q('ar_unrep', ar({
  t: 1, d: 3, c: 'understanding', verdict: 'both-true-explains',
  a: 'Some critics have argued that the Constituent Assembly was not fully representative.',
  r: 'The Assembly was elected on a limited franchise and not by universal adult franchise.',
  sol: 'Both are true, and R explains A: the limited franchise behind the Assembly is the ground on which critics doubt that it spoke for everyone.',
}));
Q('ar_minority', ar({
  t: 1, d: 4, c: 'analysis', verdict: 'both-true-not-explains',
  a: 'The Constitution recognises community-based rights, such as those of religious and linguistic minorities, alongside individual rights.',
  r: 'Universal adult franchise was adopted from the start.',
  sol: 'Both are true, but R does not explain A: the franchise gives every adult a vote, whereas minority rights rest on respect for diversity and the protection of communities.',
}));

// ================================================================ true-false, fill in the blank, match, ordering
Q('tf_secular_sep', tf({
  t: 1, d: 2, c: 'understanding', ans: false,
  stem: 'In the Indian model of secularism, the state must keep itself completely apart from religion and may never intervene in any religious practice.',
  sol: 'The Indian model keeps a principled distance, and it allows the state to intervene to reform practices such as untouchability and to support communities equally.',
}));
Q('tf_franchise', tf({
  t: 1, d: 2, c: 'understanding', ans: true,
  stem: 'The Constitution gave the vote to adult citizens from the start, without a test of property or education, whereas the vote was extended in stages in many Western countries.',
  sol: 'Universal adult franchise from the beginning is regarded as a bold step when compared with the gradual extension of the vote in many Western countries.',
}));
Q('tf_dp', tf({
  t: 1, d: 3, c: 'recall', ans: false,
  stem: 'According to critics who raise the question, every social and economic right is placed among the Fundamental Rights and none among the Directive Principles.',
  sol: 'The criticism is just the opposite: some social and economic rights are placed in the Directive Principles instead.',
}));
Q('fb_42', fb({
  t: 1, d: 2, c: 'recall',
  stem: 'The words socialist, secular and integrity were added to the Preamble by the ___ Amendment, passed in the year ___.',
  acc: [['42nd', 'forty-second', 'forty second', '42'], ['1976', 'nineteen seventy six', 'nineteen seventy-six']],
  sol: 'The 42nd Amendment, passed in 1976, made the addition.',
}));
Q('fb_justice', fb({
  t: 1, d: 2, c: 'recall',
  stem: 'The Preamble speaks of justice in three forms: social, ___ and political.',
  acc: [['economic']],
  sol: 'The three forms are social, economic and political justice.',
}));
Q('fb_frat', fb({
  t: 1, d: 2, c: 'recall',
  stem: 'Fraternity assures the ___ of the individual and the unity and ___ of the nation.',
  acc: [['dignity'], ['integrity']],
  sol: 'Fraternity is linked with the dignity of the individual and with the unity and integrity of the nation.',
}));
Q('mt_ideals', match({
  t: 1, d: 2, c: 'recall', marks: 2,
  stem: 'Match each ideal of the Preamble with what it covers.',
  pairs: [
    ['Justice', 'Social, economic and political'],
    ['Liberty', 'Of thought, expression, belief, faith and worship'],
    ['Equality', 'Of status and of opportunity'],
    ['Fraternity', 'Dignity of the individual and unity and integrity of the nation'],
  ],
  sol: 'Justice has three forms, liberty five freedoms, equality two kinds, and fraternity two assurances.',
}));
Q('mt_features', match({
  t: 1, d: 3, c: 'application', marks: 2,
  stem: 'Match each imagined provision with the feature of the political philosophy that it expresses.',
  pairs: [
    ['A province may not hold a person without a hearing before a magistrate', 'Individual freedom'],
    ['Seats set aside to widen the opportunities of long-excluded groups', 'Social justice'],
    ['A language community may run its own schools', 'Minority rights'],
    ['The state gives equal grants to institutions of every faith', 'Indian secularism'],
  ],
  sol: 'Protection from arbitrary arrest is individual freedom, set-aside seats serve social justice, a language community\'s schools are a minority right, and equal grants show the Indian model of secularism.',
}));
Q('ord_franchise', ord({
  t: 1, d: 3, c: 'understanding', marks: 2,
  stem: 'Arrange these imagined stages in the extension of the vote in Halcor from the narrowest to the widest.',
  items: [
    'Only men with large landholdings may vote',
    'All men may vote, whatever their property',
    'Men and women may vote, with some conditions',
    'Every adult citizen may vote, with no test of property, sex or schooling',
  ],
  sol: 'The vote widened from a few landholding men, to all men, to women with conditions, and finally to every adult without any test.',
}));
Q('ord_consensus', ord({
  t: 1, d: 3, c: 'application', marks: 2,
  stem: 'Arrange these steps in the order in which a disputed clause would ordinarily travel through the imagined assembly of Zandria.',
  items: [
    'A member proposes a clause for the draft',
    'Members debate the clause in open session',
    'A compromise wording is drawn up to meet the main concerns',
    'The assembly adopts the clause, as far as possible by consensus',
  ],
  sol: 'A proposal comes first, then open debate, then a compromise draft, and finally adoption by agreement.',
}));

// ================================================================ short answers (2 marks)
Q('s_phil', short({
  t: 1, d: 1, c: 'recall', marks: 2, wl: S2,
  stem: 'What is meant by the philosophy of a constitution? Give one example of an ideal found in the Indian Constitution.',
  model: 'The **philosophy of a constitution** is the set of **ideals and moral values** that stand behind its provisions and explain their purpose. An example of such an ideal in the Indian Constitution is **justice**, together with liberty, equality and fraternity.',
  sol: 'The meaning and one ideal.',
  scheme: [['Ideals and values behind its provisions', 1], ['One correct ideal as an example', 1]],
}));
Q('s_means', short({
  t: 1, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'Using the imagined society of Brendale, whose constitution opens public wells to the Lowrens, explain how a constitution can be a means of democratic transformation.',
  model: 'In Brendale, the constitution **removes an old exclusion** by lawful means and gives the Lowrens an **equal place**. A constitution can thus change an unequal society **peacefully**, through rules accepted by citizens, and not by force.',
  sol: 'Removing exclusion by lawful and peaceful means.',
  scheme: [['Old exclusion removed by constitutional rule', 1], ['Peaceful, lawful change towards equality', 1]],
}));
Q('s_limit', short({
  t: 1, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'A clause in the constitution of the imagined republic of Norvale requires every arrested person to be brought before a judge within a fixed number of days. How does it show that a constitution can limit power?',
  model: 'The clause **binds the police and ministers** of Norvale. They cannot hold a person as they please. By placing a rule above those who govern, the constitution **protects the individual against arbitrary power**.',
  sol: 'A rule that binds those in power.',
  scheme: [['The clause binds those who govern', 1], ['It protects the individual against arbitrary use of power', 1]],
}));
Q('s_pre_nature', short({
  t: 1, d: 2, c: 'recall', marks: 2, wl: S2,
  stem: 'Name the five words that describe the nature of the Indian state in the Preamble. Which of them were added by the 42nd Amendment?',
  model: 'The five words are **sovereign, socialist, secular, democratic and republic**. The **42nd Amendment (1976)** added **socialist and secular**, as well as the word **integrity** in the phrase about the unity of the nation.',
  sol: 'Five words, and the additions of 1976.',
  scheme: [['The five words correctly named', 1], ['Socialist and secular (and integrity) added in 1976', 1]],
}));
Q('s_liberty_equality', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Explain in one or two lines each what liberty and equality mean as ideals of the Preamble.',
  model: '**Liberty** means freedom of **thought, expression, belief, faith and worship**. **Equality** means equality of **status** and of **opportunity**: equal standing for every person and a fair chance for each to develop.',
  sol: 'Each ideal in one or two lines.',
  scheme: [['Liberty with its freedoms', 1], ['Equality of status and of opportunity', 1]],
}));
Q('s_minority', short({
  t: 1, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'A linguistic minority of the imagined state of Orwen wishes to run its own schools. Why does the Constitution allow this, and what feature of its philosophy does this show?',
  model: 'The Constitution recognises the **right of religious and linguistic minorities** to run educational institutions. This shows its **respect for diversity** and its recognition of **community-based rights** alongside the rights of individuals.',
  sol: 'The minority right and the feature it shows.',
  scheme: [['Minorities may run their own educational institutions', 1], ['Respect for diversity; community-based rights', 1]],
}));
Q('s_secular', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Define secularism, and state in one line how the Indian model differs from strict separation of state and religion.',
  model: '**Secularism** is the principle that the state does not identify with any one religion and treats all believers and non-believers equally. In the **Indian model** the state keeps a **principled distance** and may **intervene to reform** or **support communities equally**, unlike strict separation.',
  sol: 'A definition and the difference.',
  scheme: [['Standard definition of secularism', 1], ['Principled distance; may reform or support equally, unlike strict separation', 1]],
}));
Q('s_franchise', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'What is universal adult franchise? Why is its adoption from the start regarded as a bold step?',
  model: '**Universal adult franchise** is the right of **every adult citizen to vote**, whatever property, schooling, caste, gender or religion. It is regarded as **bold** because in many Western countries the vote was **extended gradually** by stages.',
  sol: 'Definition and the contrast.',
  scheme: [['Every adult citizen may vote, without such tests', 1], ['Bold when compared with the gradual extension in many Western countries', 1]],
}));
Q('s_asym', short({
  t: 1, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: 'What is meant by asymmetric arrangements in federalism? Name one provision of the Indian Constitution that is cited as an example.',
  model: 'In **asymmetric federalism**, not all the units of a federation are treated alike, since some are given **special provisions** to suit their particular needs. In India, **Article 371 and related Articles** give such provisions to certain states.',
  sol: 'The meaning and one provision.',
  scheme: [['Some units have special provisions; not all alike', 1], ['Article 371 and related Articles named', 1]],
}));
Q('s_natid', short({
  t: 1, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: 'How does the Constitution view national identity in relation to regional and other identities?',
  model: 'The Constitution holds that there can be **one national identity** along with **regional, linguistic and religious identities**. Belonging to the nation does not require a citizen to **give up** the other identities that matter to them.',
  sol: 'One national identity beside others.',
  scheme: [['One national identity is affirmed', 1], ['It exists alongside regional and other identities, not replacing them', 1]],
}));
Q('s_proc', short({
  t: 1, d: 2, c: 'recall', marks: 2, wl: S2,
  stem: 'State the procedural achievements that are credited to the way the Constitution was made.',
  model: 'The procedural achievements are a **faith in deliberation**, a **spirit of compromise and accommodation**, and a wish to decide by **consensus** wherever possible. Differences were discussed openly and not settled by force.',
  sol: 'Deliberation, compromise and consensus.',
  scheme: [['Faith in deliberation', 1], ['Compromise and accommodation; consensus wherever possible', 1]],
}));
Q('s_justice_forms', short({
  t: 1, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'An imagined clause of Zandria gives every adult a vote, and another fixes a fair wage. Name the form of justice each of them serves.',
  model: 'The clause giving every adult a **vote** serves **political justice**, because it gives each person a voice in public affairs. The clause fixing a **fair wage** serves **economic justice**, since it concerns fairness in livelihood.',
  sol: 'Political and economic justice.',
  scheme: [['Vote: political justice', 1], ['Fair wage: economic justice', 1]],
}));

// ================================================================ short answers (3 marks)
Q('s3_features', short({
  t: 1, d: 2, c: 'recall', marks: 3, wl: S3,
  stem: 'List any six features of the political philosophy of the Indian Constitution as set out in the textbook.',
  model: 'Features include **individual freedom**, **social justice**, **respect for diversity and minority rights**, **secularism of the Indian kind**, **universal adult franchise**, **federalism**, including special provisions for some states, and **one national identity** beside regional and other identities. Any six may be listed.',
  sol: 'Any six features.',
  scheme: [['Two features correctly named', 1], ['Four features correctly named', 1], ['Six features correctly named', 1]],
}));
Q('s3_social_justice', short({
  t: 1, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'The imagined state of Delvar sets aside seats in public colleges for communities that were shut out of schooling for generations. Explain how this scheme can be seen as social justice.',
  model: 'Communities shut out of schooling for generations **start behind** others. Setting aside seats gives them a **fair chance** to compete, which is **equality of opportunity**. The Constitution allows such **special provisions**, including reservations for **Scheduled Castes and Scheduled Tribes**, as a means to social justice.',
  sol: 'Link the scheme with equality of opportunity.',
  scheme: [['Long exclusion has left some groups behind', 1], ['Seats give a fair chance: equality of opportunity', 1], ['Reservations for Scheduled Castes and Scheduled Tribes as a means to social justice', 1]],
}));
Q('s3_secular_compare', short({
  t: 1, d: 4, c: 'analysis', marks: 3, wl: S3,
  stem: 'Compare, in brief, the Western model of secularism, as a strict separation of state and religion, with the Indian model.',
  model: 'In the **Western model**, the state and religion are kept **strictly apart**, with little intervention and no state support for religious bodies. The **Indian model** instead has the state hold a **principled distance** from every religion, while it may **step in to reform**, as against untouchability, or give **equal support** to all communities.',
  sol: 'Two models compared.',
  scheme: [['Western model: strict separation', 1], ['Indian model: principled distance from all religions', 1], ['Intervention for reform and equal support', 1]],
}));
Q('s3_unrep', short({
  t: 1, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Some critics say that the Constituent Assembly was not representative. State the ground of the criticism and the reply that is commonly given.',
  model: 'Critics have argued that the Assembly was **elected on a limited franchise**, and not by universal adult franchise, so it did not speak for everyone. The reply is that its members held **diverse opinions** and that its **debates were open**, so many views were heard.',
  sol: 'Criticism and reply.',
  scheme: [['Ground: elected on a limited franchise', 1], ['Reply: members represented diverse opinions', 1], ['Reply: debates were open', 1]],
}));
Q('s3_unwieldy', short({
  t: 1, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'At the imagined Lakemoor School a student says the Constitution is too long to be useful. State this criticism by its name and give the reply that another student could offer.',
  model: 'The criticism is that the Constitution is **unwieldy**: very long and detailed. A reply is that the length **reflects the needs of India**, a large and diverse country, and that **much detail** is usual in constitutions, since it spells out powers and rights clearly.',
  sol: 'Name and reply.',
  scheme: [['The criticism named: unwieldy, long and detailed', 1], ['Reply: reflects the needs of India', 1], ['Reply: much detail is usual', 1]],
}));
Q('s3_limits', short({
  t: 1, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: 'State three limitations of the Constitution that the textbook notes.',
  model: 'The textbook notes three limitations. First, a **centralised notion of national unity**, which some critics find too reliant on strong Union powers. Second, matters of **gender justice**, for instance inside the family, were **left partly unaddressed**. Third, certain **social and economic rights** appear in the **Directive Principles** rather than among the Fundamental Rights.',
  sol: 'The three limitations.',
  scheme: [['Centralised notion of national unity', 1], ['Gender justice within the family not fully addressed', 1], ['Some social and economic rights in the Directive Principles', 1]],
}));
Q('s3_alien', short({
  t: 1, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Explain the criticism that the Constitution is alien and the reply to it.',
  model: 'Critics have argued that the Constitution is **alien** because many of its provisions were **borrowed** from other countries. The reply is that borrowed ideas were **adapted to Indian conditions** and to the **ideals of the national movement**, so the document is not a mere copy.',
  sol: 'The criticism and the reply.',
  scheme: [['Criticism: many provisions were borrowed', 1], ['Reply: adapted to Indian conditions', 1], ['Reply: in line with ideals of the national movement', 1]],
}));

// ================================================================ long answers (5 marks)
Q('l_ideals', long({
  t: 1, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Explain the ideals of justice, liberty, equality and fraternity as they appear in the Preamble.',
  model: '1. **Justice** has three forms: **social, economic and political**.\n2. **Liberty** covers freedom of **thought, expression, belief, faith and worship**.\n3. **Equality** means equality of **status** and of **opportunity**, that is, equal standing and a fair chance.\n4. **Fraternity** assures the **dignity of the individual**.\n5. It also assures the **unity and integrity of the nation**.\n6. Together these ideals show the values the Constitution wishes to realise.',
  sol: 'Four ideals with their meanings.',
  scheme: [['Justice in its three forms', 1], ['Liberty with its freedoms', 1], ['Equality of status and of opportunity', 1], ['Fraternity: dignity of the individual', 1], ['Fraternity: unity and integrity of the nation', 1]],
}));
Q('l_core', long({
  t: 1, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Describe the core features of the political philosophy of the Indian Constitution as given in the textbook.',
  model: '1. **Individual freedom**, for example freedom of expression and protection against arbitrary arrest.\n2. **Social justice**, including reservations for Scheduled Castes and Scheduled Tribes.\n3. **Respect for diversity and minority rights**, with community-based rights beside individual rights.\n4. The **Indian model of secularism**, a principled distance from all religions.\n5. **Universal adult franchise** from the start, and **federalism** with special provisions for some states.\n6. **One national identity** beside other identities.',
  sol: 'Seven features in brief.',
  scheme: [['Individual freedom', 1], ['Social justice with reservations', 1], ['Diversity and minority rights', 1], ['Secularism and universal adult franchise', 1], ['Federalism with special provisions, and national identity', 1]],
}));
Q('l_diversity', long({
  t: 1, d: 4, c: 'analysis', marks: 5, wl: L5,
  stem: 'How do respect for diversity, minority rights, federalism and the idea of national identity together reflect the philosophy of the Constitution?',
  model: '1. The Constitution **respects diversity** and recognises **community-based rights**, such as the right of minorities to run educational institutions.\n2. **Federalism** gives regions their own governments.\n3. **Special provisions for some states** show asymmetric arrangements that suit particular needs.\n4. **One national identity** is affirmed beside regional, linguistic and religious identities.\n5. Together they show that **unity and diversity** are meant to go together, so that belonging to the nation does not need uniformity.',
  sol: 'Four features linked by unity in diversity.',
  scheme: [['Respect for diversity and community-based rights', 1], ['Federalism', 1], ['Special provisions for some states', 1], ['One national identity beside others', 1], ['Unity and diversity go together', 1]],
}));
Q('l_criticisms', long({
  t: 1, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: 'Critics have argued that the Constitution is unwieldy, unrepresentative and alien. State each criticism with the reply, and say which reply seems to you the stronger, giving a reason.',
  model: '1. **Unwieldy**: it is very long and detailed. Reply: its length **reflects India\'s needs**, and **much detail** is usual.\n2. **Unrepresentative**: the Assembly was elected on a **limited franchise**. Reply: members stood for **many different opinions**, and **open debate** was the rule.\n3. **Alien**: many provisions were **borrowed**. Reply: they were **adapted** to Indian conditions and the **ideals of the national movement**.\n4. A student may find one reply stronger, for example the third, **with a reason** such as the adaptation of borrowed ideas.',
  sol: 'Three criticisms, three replies and a reasoned judgement.',
  scheme: [['Unwieldy with its reply', 1], ['Unrepresentative with its reply', 1], ['Alien with its reply', 1], ['A reply chosen as stronger', 1], ['A reason given for the choice', 1]],
}));
Q('l_limits', long({
  t: 1, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: 'Discuss the limitations of the Constitution that are noted in the textbook, and say how each may be weighed.',
  model: '1. Some critics see a **centralised notion of national unity**; others reply that a strong sense of unity was needed.\n2. Some issues of **gender justice**, such as those **within the family**, were **not fully addressed**.\n3. Some **social and economic rights** were placed in the **Directive Principles** instead of the Fundamental Rights, so a citizen cannot claim them in court.\n4. A student should **weigh** each limitation with reasons and with the Constitution\'s achievements.',
  sol: 'Three limitations with a weighing of each.',
  scheme: [['Centralised notion of national unity', 1], ['Gender justice within the family', 1], ['Rights placed in the Directive Principles', 1], ['Another view or reply on at least one limitation', 1], ['A reasoned weighing, not a one-sided verdict', 1]],
}));
Q('l_proc_phil', long({
  t: 1, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'What is meant by the philosophy of the Constitution? Explain how a constitution can transform a society and also limit power, and state the procedural achievements of the Assembly.',
  model: '1. The **philosophy of the Constitution** is the set of **ideals and moral values** behind its provisions.\n2. A constitution can be a **means of democratic transformation**, by ending old exclusions through lawful means.\n3. It can also **limit power**, by binding those who govern.\n4. Its making shows **faith in deliberation** and a **spirit of compromise**.\n5. Decisions were taken by **consensus** wherever possible.',
  sol: 'Meaning, two roles and procedure.',
  scheme: [['Meaning of the philosophy of a constitution', 1], ['Democratic transformation', 1], ['Limiting power', 1], ['Deliberation and compromise', 1], ['Consensus wherever possible', 1]],
}));

// ================================================================ case-based (4 marks: 1 + 1 + 2)
Q('c_clauses', caseQ({
  t: 1, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the table from an imagined charter and answer the questions that follow. *(An imagined charter written by SOYL for practice; Veldora and its clauses are not real.)*',
  passage: '**From the imagined Charter of Veldora**\n\n| Clause | What it says |\n|---|---|\n| 1 | Every person may hold and share any belief or opinion peacefully |\n| 2 | Every worker shall receive a wage that allows a decent life |\n| 3 | Every child, of whatever community, shall have a place in a public school |\n| 4 | The state shall promote a feeling of belonging together among all communities of Veldora |',
  parts: [
    child('a', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'Which Preamble ideal does Clause 1 express?', model: '**Liberty** of thought and expression.', sol: 'Freedom to hold and share opinions is liberty.', scheme: [['Liberty of thought and expression', 1]] })),
    child('b', short({ t: 1, d: 3, c: 'application', marks: 1, stem: 'Which form of justice does Clause 2 serve?', model: '**Economic justice**.', sol: 'A decent wage concerns fairness in livelihood.', scheme: [['Economic justice', 1]] })),
    child('c', short({ t: 1, d: 4, c: 'analysis', marks: 2, stem: '**Either** (i): Which ideal does Clause 4 express, and how does that ideal serve the nation?', model: 'Clause 4 expresses **fraternity**. By promoting a feeling of **belonging together**, it protects the **unity and integrity of the nation** and the **dignity of every community**.', sol: 'Fraternity and its two assurances.', scheme: [['Fraternity', 1], ['Unity and integrity of the nation, and dignity of the individual', 1]] }), [
      short({ t: 1, d: 4, c: 'application', marks: 2, stem: '**Or** (ii): Which ideal does Clause 3 express, and how does it help a child of a long-excluded community?', model: 'Clause 3 expresses **equality of opportunity**. A place in a public school gives the child a **fair chance to develop** and to compete, whatever the **community of birth**.', sol: 'Equality of opportunity.', scheme: [['Equality of opportunity', 1], ['A fair chance for a child whatever the community', 1]] }),
    ]),
  ],
}));
Q('c_secular', caseQ({
  t: 1, d: 4, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the table from an imagined handbook and answer the questions that follow. *(An imagined handbook written by SOYL for practice; Veldora and Tarsia are not real.)*',
  passage: '**From an imagined handbook comparing two countries**\n\n| Point | Veldora | Tarsia |\n|---|---|---|\n| Funds for religious bodies | None, for any body | Grants on equal terms to the institutions of all faiths |\n| Laws on religious practices | The state never steps in | The state may pass laws to end practices that deny equality |',
  parts: [
    child('a', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'Which country follows strict separation of state and religion?', model: '**Veldora**.', sol: 'It gives no funds and never steps in.', scheme: [['Veldora', 1]] })),
    child('b', short({ t: 1, d: 3, c: 'application', marks: 1, stem: 'Whose approach is closer to the Indian model of secularism?', model: '**Tarsia**.', sol: 'It supports faiths equally and may reform.', scheme: [['Tarsia', 1]] })),
    child('c', short({ t: 1, d: 4, c: 'analysis', marks: 2, stem: '**Either** (i): Give two features of Tarsia\'s column that match the Indian model.', model: 'The state gives **equal support** to the institutions of all faiths, and it may **intervene by law** to end practices that deny equality, as the Indian state did against **untouchability**.', sol: 'Equal support and intervention for reform.', scheme: [['Equal support to all faiths', 1], ['Intervention to reform practices that deny equality', 1]] }), [
      short({ t: 1, d: 4, c: 'evaluation', marks: 2, stem: '**Or** (ii): Give one reason why a society with deep social divisions might prefer Tarsia\'s approach, and one reason why some people may urge caution about it.', model: 'Such a society may prefer it because the state can **reform practices that deny equality**. Some urge caution because **intervention** might be **misused** or could affect the freedom of a community to manage its own religious affairs.', sol: 'One reason for, one for caution.', scheme: [['A reason for the approach', 1], ['A reason for caution', 1]] }),
    ]),
  ],
}));
Q('c_debate', caseQ({
  t: 1, d: 4, c: 'evaluation', origin: 'soyl-original',
  stem: 'Read the classroom discussion and answer the questions that follow. *(An imagined discussion written by SOYL for practice; the school and the students are not real.)*',
  passage: '**Imagined discussion in Class 11 at Pinewood School**\n\nMeera: The Constitution has hundreds of Articles. Nobody can read it from end to end.\n\nKabir: The Assembly was chosen on a limited franchise, so it could not have spoken for everyone.\n\nIsha: Many of its ideas came from other countries, so it is not really ours.\n\nTeacher: Each of these criticisms has been made, and each has a reply. Think about what the replies are.',
  parts: [
    child('a', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'Which student raises the criticism that the Assembly was unrepresentative?', model: '**Kabir**.', sol: 'He mentions the limited franchise.', scheme: [['Kabir', 1]] })),
    child('b', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'By what name is Meera\'s criticism known?', model: 'That the Constitution is **unwieldy**.', sol: 'She complains of length and detail.', scheme: [['Unwieldy', 1]] })),
    child('c', short({ t: 1, d: 4, c: 'evaluation', marks: 2, stem: '**Either** (i): Give the reply that is commonly made to Isha\'s criticism.', model: 'The reply is that borrowed ideas were **adapted to Indian conditions** and to the **ideals of the national movement**, so the Constitution is not a mere copy and can be called **our own**.', sol: 'The reply to the charge that it is alien.', scheme: [['Adapted to Indian conditions', 1], ['Ideals of the national movement', 1]] }), [
      short({ t: 1, d: 4, c: 'evaluation', marks: 2, stem: '**Or** (ii): Give the reply that is commonly made to Kabir\'s criticism.', model: 'The reply is that the members of the Assembly stood for **diverse opinions** and that its **debates were open**, so many views were heard even though the franchise behind it was limited.', sol: 'The reply to the charge that it was unrepresentative.', scheme: [['Members represented diverse opinions', 1], ['Debates were open', 1]] }),
    ]),
  ],
}));
Q('c_franchise', caseQ({
  t: 1, d: 4, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the newspaper report and answer the questions that follow. *(An imagined report written by SOYL for practice; the newspaper and the countries are not real.)*',
  passage: '**From the Halcor Courier, imagined**\n\nIn Halcor the vote was first given to men who owned land, then to all men, and only after several generations to women. Its neighbour Mirenia, on becoming a republic, gave every adult citizen a vote at its first election, though most of the voters had never been to school. Some observers called the step bold. Others wondered if the voters were ready.',
  parts: [
    child('a', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'What is the term for the approach followed by Mirenia?', model: '**Universal adult franchise**.', sol: 'Every adult citizen may vote.', scheme: [['Universal adult franchise', 1]] })),
    child('b', short({ t: 1, d: 3, c: 'application', marks: 1, stem: 'Which group was the narrowest to receive the vote in Halcor?', model: 'Men who **owned land**.', sol: 'The report names it first.', scheme: [['Men who owned land', 1]] })),
    child('c', short({ t: 1, d: 4, c: 'evaluation', marks: 2, stem: '**Either** (i): Why can Mirenia\'s step be called bold, in comparison with Halcor?', model: 'Mirenia gave the vote to **every adult at once**, even to voters who had **never been to school**, whereas Halcor widened the vote **in stages** over generations. It **trusted all adults** as equal citizens from the start.', sol: 'All at once, in contrast to stages.', scheme: [['Every adult at once, in spite of lack of schooling', 1], ['In contrast with Halcor\'s staged extension', 1]] }), [
      short({ t: 1, d: 4, c: 'evaluation', marks: 2, stem: '**Or** (ii): The report says some wondered whether the voters were ready. Give one reason why a supporter of Mirenia\'s step might disagree.', model: 'A supporter might say that **ordinary citizens** can judge who should govern them even without schooling, and that the **right to vote** is itself a way of **learning** to take part in public life, so no one should be made to wait.', sol: 'One reasoned reply.', scheme: [['Citizens can judge for themselves without schooling', 1], ['The vote is itself a way of learning to take part', 1]] }),
    ]),
  ],
}));
Q('c_letter', caseQ({
  t: 1, d: 4, c: 'evaluation', origin: 'soyl-original',
  stem: 'Read the letter and answer the questions that follow. *(An imagined letter written by SOYL for practice; the writer and the school magazine are not real.)*',
  passage: '**Imagined letter from a Class 11 student to her school magazine**\n\nI admire much in the Constitution, but three things puzzle me. First, some matters inside the family, such as how household duties and property are shared between women and men, were not fully addressed. Second, a claim such as an adequate means of livelihood is only a guiding principle for the state and is not a right I can take to a court. Third, I wonder whether the Union has been given too much weight in building the unity of the country.',
  parts: [
    child('a', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'Which limitation does the writer raise in her second point?', model: 'That some **social and economic rights** are placed in the **Directive Principles** and not among the Fundamental Rights.', sol: 'A guiding principle that cannot be claimed in court.', scheme: [['Social and economic rights in the Directive Principles', 1]] })),
    child('b', short({ t: 1, d: 3, c: 'application', marks: 1, stem: 'The first point relates to which kind of justice?', model: '**Gender justice**.', sol: 'It concerns women and men within the family.', scheme: [['Gender justice', 1]] })),
    child('c', short({ t: 1, d: 4, c: 'evaluation', marks: 2, stem: '**Either** (i): State the limitation in the third point, and give one view that a defender of the Constitution might put forward.', model: 'The third point is the criticism of a **centralised notion of national unity**. A defender may say that a **strong sense of unity** was needed for a large and diverse country, and that the Constitution also protects **diversity** through federalism.', sol: 'The limitation and a defender\'s view.', scheme: [['Centralised notion of national unity', 1], ['A defender\'s view with a reason', 1]] }), [
      short({ t: 1, d: 4, c: 'analysis', marks: 2, stem: '**Or** (ii): Why does it matter, for a citizen, whether a right is among the Fundamental Rights or among the Directive Principles?', model: 'A **Fundamental Right** can be **claimed in a court** by a citizen, but a **Directive Principle** guides the state and **cannot be enforced** in the same way. So the place of a right affects how **firmly** a citizen can demand it.', sol: 'Enforceability in court.', scheme: [['Fundamental Rights can be claimed in court', 1], ['Directive Principles guide the state and are not enforced in the same way', 1]] }),
    ]),
  ],
}));
