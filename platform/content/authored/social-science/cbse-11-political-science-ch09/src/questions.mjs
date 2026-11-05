// CBSE 11 Political Science, ch09 Constitution as a Living Document: question bank. Every bill, bulletin, report, letter,
// discussion and country in the scenarios (the imagined 140th to 145th Amendment Bills, the imagined countries Veldora,
// Quillan, Pellara and Tarnovia, the imagined state of Merivia, the imagined schools and people) is written by SOYL and
// labelled as imagined. No NCERT text, boxed source, cartoon, Constitution text, speech, court judgment or board/sample-paper
// item is reused (D-036). Articles, amendments and cases are cited by number or name with a paraphrase of what they provide.
// No present-day proposal or dispute is described.
import { Q, mcq, ar, tf, fb, match, ord, short, long, caseQ, child } from '../../cbse-11-political-science-ch01/src/lib.mjs';

const S2 = [30, 50];
const S3 = [50, 80];
const L5 = [80, 120];

// ================================================================ t01 Amendment procedure and contents of amendments
Q('m_why_amend', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'A constitution written by one generation has to serve later generations as well. What is the main reason for giving it a procedure of amendment?',
  opts: ['So that it can adapt to new needs and still stay stable and respected', 'So that every new government can rewrite it at will', 'So that courts no longer have to interpret it', 'So that it can never be changed under any circumstances'],
  sol: 'An amendment procedure lets a constitution change with the times while making change deliberate and difficult enough to protect stability. Rewriting it at will would destroy stability, an amendment procedure does not remove the role of courts, and a constitution that can never change would fall behind new needs.',
}));
Q('m_art368', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Which Article of the Constitution lays down the procedure for amending the Constitution?',
  opts: ['Article 368', 'Article 356', 'Article 280', 'Article 248'],
  sol: 'Article 368 deals with the power of Parliament to amend the Constitution and the procedure for doing so. Article 356 is about President\'s Rule in a state, Article 280 about the Finance Commission and Article 248 about residuary powers of legislation.',
}));
Q('m_simple_app', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'Parliament passes a bill under Article 3 that separates some districts of the imagined state of Merivia to form a new state called Tarnia. Which statement about the majority and the procedure is correct?',
  opts: ['A simple majority in each House is enough, and the change is not counted as an amendment under Article 368', 'A special majority and ratification by half of the state legislatures are needed, as for every constitutional change', 'Two thirds of the members of each House must vote for it, as for an amendment under Article 368', 'The Merivia legislature must approve the bill by a special majority before it can pass'],
  sol: 'Forming a new state under Article 3 is done by an ordinary law of Parliament, passed by a simple majority, and is technically not an amendment under Article 368. The other options wrongly apply the procedures of Article 368, or give the state legislature a binding approval that Article 3 does not provide.',
}));
Q('m_special_def', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'The imagined 147th Amendment Bill of the Harbour Road School project would change the powers of the High Courts. Which procedure must it follow, and why?',
  opts: ['A special majority in each House plus ratification by at least half of the state legislatures, because it changes a provision concerning the High Courts, which affects the federal structure', 'A simple majority in each House, because it changes no Fundamental Right', 'A special majority in each House alone, because only the Fundamental Rights need a special majority', 'A special majority in each House plus approval by every state legislature, because any change to courts needs every state'],
  sol: 'The Supreme Court and the High Courts are among the matters that need ratification by at least half of the state legislatures after the special majority, since they touch the federal structure. A simple majority is the route for ordinary laws such as those under Article 3, a special majority alone is used for provisions such as the Fundamental Rights, and approval by every state is not part of the procedure.',
}));
Q('m_special_app', mcq({
  t: 1, d: 4, c: 'application',
  stem: 'The imagined 140th Amendment Bill, which would change a Fundamental Right, is put to the vote in a House that has 540 members in total. Of the 360 members present and voting, 270 vote for the bill. What is the result?',
  opts: ['The bill fails, because 270 is not a majority of the 540 members in total, even though it is more than two thirds of those voting', 'The bill passes, because 270 is more than two thirds of the 360 members voting', 'The bill passes, because 270 is a majority of the 360 members voting', 'The bill fails, because every amendment of a Fundamental Right needs the vote of all the members'],
  sol: 'More than half of 540 means at least 271 votes, and 270 falls one short, so the first condition is not met although 270 is above two thirds of 360, which is 240. The second option checks only one of the two conditions, the third applies the simple majority, and no amendment requires the vote of every member.',
}));
Q('m_ratify_app', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'The imagined 141st Amendment Bill proposes to move a subject from the State List to the Union List of the Seventh Schedule. After it passes each House by the special majority, which further step is required before the amendment takes effect?',
  opts: ['Ratification by the legislatures of at least half of the states, and then the assent of the President', 'Ratification by the legislatures of every state, with no exception', 'A referendum among all the voters of the country', 'No further step, because the President alone completes the amendment'],
  sol: 'A change to the lists of the Seventh Schedule affects the federal structure, so half of the state legislatures must ratify it before the President assents. A requirement that every state ratify, or a nationwide referendum, is not part of the procedure, and the President\'s assent alone is not enough for a federal provision.',
}));
Q('m_fr_app', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'The imagined 142nd Amendment Bill proposes to widen the scope of one of the Fundamental Rights. As commonly taught, which procedure applies to it?',
  opts: ['A special majority in each House, with no need for ratification by the states', 'A simple majority in each House, as for any ordinary law', 'A special majority in each House, plus ratification by at least half of the state legislatures', 'Approval by the Supreme Court before the bill is introduced'],
  sol: 'Fundamental Rights are among the provisions amended by the special majority alone, since they do not concern the federal structure. An ordinary majority is too little, ratification by the states is reserved for federal provisions, and the Court does not approve a bill before it is introduced.',
}));
Q('m_joint', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'The imagined 144th Amendment Bill is passed by the Lok Sabha with the special majority, but the Rajya Sabha rejects it. A member proposes that a joint sitting of both Houses should decide the matter. What is the position?',
  opts: ['A joint sitting is not available for an amendment bill, so the bill cannot pass without the Rajya Sabha', 'A joint sitting can be held, and a simple majority of the joint sitting passes the bill', 'The Lok Sabha vote alone is enough, since it is the House of the people', 'The President may pass the bill on the advice of the Lok Sabha alone'],
  sol: 'There is no joint sitting for an amendment bill, and each House must pass it by the special majority, so the rejection by the Rajya Sabha stops the bill. A joint sitting with a simple majority applies to some ordinary bills and not here, the Lok Sabha alone cannot pass an amendment, and the President cannot pass a bill.',
}));
Q('m_assent', mcq({
  t: 1, d: 3, c: 'recall',
  stem: 'Which amendment made it obligatory for the President to give assent to a constitution amendment bill that has been duly passed?',
  opts: ['The 24th Amendment, 1971', 'The 15th Amendment, 1963', 'The 52nd Amendment, 1985', 'The 61st Amendment, 1988'],
  sol: 'The 24th Amendment of 1971 made presidential assent obligatory. The 15th dealt with the retirement age of High Court judges, the 52nd with anti-defection and the 61st with the voting age.',
}));
Q('m_number', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'Which statement about the number of amendments is correct as of 2024?',
  opts: ['More than one hundred amendments have been made, and the 106th, passed in 2023, is the latest commonly counted', 'Fewer than fifty amendments have been made, and the 42nd is the latest', 'No amendment has been made since 1978', 'Exactly one hundred amendments have been made, all of them in 1950'],
  sol: 'By 2024 the Constitution had been amended more than a hundred times, the 106th Amendment of 2023 being the latest counted. The other options understate the number or give dates that are wrong.',
}));
Q('m_technical', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'A class at Harbour Road School sorts three imagined amendments of Tarnovia into the kinds taught in the chapter. Amendment X changes the month in which the state audit report is tabled. Amendment Y lowers the age for a local office after every party agreed on the text beforehand. Amendment Z is passed so that a new reading of a right by the courts no longer applies. Which sorting is correct?',
  opts: ['X is technical or administrative, Y comes from political consensus, Z arises from differing interpretations of the judiciary and Parliament', 'X comes from political consensus, Y is technical or administrative, Z arises from differing interpretations', 'X arises from differing interpretations, Y is technical or administrative, Z comes from political consensus', 'X, Y and Z are all technical or administrative, since each changes only a detail'],
  sol: 'X adjusts a detail of timing, so it is technical or administrative. Y was agreed by all parties beforehand, which marks a consensus amendment. Z answers a court reading, so it arises from differing interpretations. The other sortings swap the kinds, and Y and Z are not details.',
}));
Q('m_technical_app', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'The imagined 150th Amendment Bill changes only the date by which the audit office of the imagined state of Pellara must file its yearly accounts, from 31 March to 30 June. As commonly grouped, this amendment is best described as',
  opts: ['technical or administrative, because it adjusts a detail without changing any policy', 'one arising from a disagreement between the judiciary and Parliament', 'one made through political consensus on a policy of national importance', 'one of the controversial amendments of the 1970s'],
  sol: 'A change of a filing date adjusts a detail and does not alter any principle, so it is technical or administrative. Nothing in the bill reverses a court reading, there is no policy that parties had to agree on, and it has no connection with the 1970s.',
}));
Q('m_consensus', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'Before the imagined 146th Amendment Bill on the age for holding local office was introduced, leaders of every party in Parliament met and agreed on its text. Which kind of amendment is this likely to be, and which Indian amendment is a comparable example?',
  opts: ['One made through political consensus, comparable to the 61st Amendment (1988) on the voting age', 'One arising from differing interpretations, comparable to the 15th Amendment (1963)', 'A technical amendment, comparable to the 42nd Amendment (1976)', 'A controversial amendment of the 1970s, comparable to the 73rd Amendment (1992)'],
  sol: 'A bill whose text all parties agree on beforehand is a consensus amendment, like the 61st Amendment, which lowered the voting age. The 15th Amendment was a technical change, the 42nd belongs to the 1970s group, and the 73rd was itself a consensus amendment on local government, not a controversial one.',
}));
Q('m_42nd', mcq({
  t: 1, d: 3, c: 'recall',
  stem: 'Which words were added to the Preamble by the 42nd Amendment (1976)?',
  opts: ['Socialist, secular and integrity', 'Sovereign, democratic and republic', 'Justice, liberty and equality', 'Federal, unitary and judicial'],
  sol: 'The 42nd Amendment added the words socialist, secular and integrity to the Preamble. Sovereign, democratic and republic, and justice, liberty and equality, were already there, and federal, unitary and judicial are not Preamble terms.',
}));
Q('m_44th', mcq({
  t: 1, d: 3, c: 'understanding',
  stem: 'Which description of the 42nd Amendment (1976) and the 44th Amendment (1978) is correct?',
  opts: ['The 42nd was passed during the national Emergency of 1975 to 1977, and the 44th restored several provisions that the 42nd had changed', 'The 44th was passed first, and the 42nd later restored its provisions', 'Both were passed before the Constitution came into force', 'The 42nd left the Constitution unchanged, and the 44th added a Preamble'],
  sol: 'The 42nd Amendment, passed during the Emergency, changed many parts of the Constitution, and the 44th Amendment of 1978 restored several of them. The order in the second option is reversed, the Constitution came into force in 1950, and the 42nd made many changes.',
}));
Q('m_localgov', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'The 73rd and 74th Amendments, passed in 1992 through political consensus, dealt with',
  opts: ['local government, in rural and urban areas', 'the voting age of citizens', 'defection by elected members', 'the retirement age of High Court judges'],
  sol: 'The 73rd Amendment concerned rural local government and the 74th urban local government. The voting age was changed by the 61st, defection by the 52nd, and the judges\' retirement age by the 15th.',
}));

// ---------------------------------------------------------------- t02 Basic structure doctrine
Q('m_golak', mcq({
  t: 2, d: 2, c: 'recall',
  stem: 'In the Golaknath case (1967), the Supreme Court held that',
  opts: ['Parliament cannot amend the Fundamental Rights', 'Parliament can amend any part of the Constitution without any limit', 'only the states can amend the Fundamental Rights', 'the Directive Principles can never be amended'],
  sol: 'The Court held in 1967 that Parliament could not amend the Fundamental Rights. The second option is the position that Parliament later asserted, the states have no such sole power, and nothing was said about the Directive Principles never being amended.',
}));
Q('m_24th', mcq({
  t: 2, d: 3, c: 'understanding',
  stem: 'Parliament passed the 24th Amendment in 1971, after the Golaknath case. What did it assert?',
  opts: ['That Parliament has power to amend any part of the Constitution, including the Fundamental Rights, and that the President must assent to an amendment bill', 'That Parliament has no power to amend the Fundamental Rights', 'That only the Supreme Court can amend the Constitution', 'That the Constitution cannot be amended at all'],
  sol: 'The 24th Amendment asserted the amending power of Parliament over every part of the Constitution and made assent obligatory. The other options contradict this: they either deny the amending power, give it to the Court, or deny that it exists.',
}));
Q('m_kesav', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'The Kesavananda Bharati case (1973) is best known for the principle that Parliament',
  opts: ['can amend any part of the Constitution but cannot alter its basic structure', 'cannot amend any part of the Constitution at all', 'can amend any part of the Constitution without any limit', 'can amend only the Directive Principles'],
  sol: 'The Court accepted a wide amending power but held that it stops short of altering the basic structure. The other options deny the amending power, ignore the limit, or restrict the power to the Directive Principles.',
}));
Q('m_basic_app', mcq({
  t: 2, d: 4, c: 'application',
  stem: 'The imagined 143rd Amendment Act, passed by the special majority and ratified by the states, says that no court may examine whether any law is in accord with the Constitution. A petitioner challenges it. Under the basic structure doctrine, what may the Court do?',
  opts: ['Examine whether the amendment alters a feature of the basic structure, such as judicial review, and strike it down if it does', 'Refuse to hear the petition, because an amendment passed by the special majority can never be questioned', 'Declare that the Court itself has become the lawmaker for amendments', 'Ask the Prime Minister to withdraw the Act'],
  sol: 'Judicial review has been identified as part of the basic structure, so the Court may test whether the Act alters it and may strike the Act down if it does. Passing by a special majority does not put an amendment beyond review, the Court does not become the lawmaker, and it does not ask a minister to withdraw an Act.',
}));
Q('m_elements', mcq({
  t: 2, d: 4, c: 'application',
  stem: 'The imagined 148th Amendment Act, passed by the special majority and ratified by the states, lets the Union government dismiss any state government at will and take over all the legislative powers of the states permanently. Would it survive a challenge in the Supreme Court?',
  opts: ['It is likely to be struck down, because it destroys the federal character, a feature that the courts have listed as part of the basic structure', 'It must survive, because it was passed by the special majority and ratified by the states', 'It must survive, because the Court may never examine an amendment', 'It is likely to be struck down, because every amendment that increases the Union government powers is invalid'],
  sol: 'Federal character is among the features commonly listed in the basic structure, and an amendment that removes the powers of the states altogether alters it, so the Court may strike it down despite the special majority and ratification. Passing by the required majorities does not put an amendment beyond review, and not every change of the balance of powers touches the basic structure, so the last option is too wide.',
}));
Q('m_minerva', mcq({
  t: 2, d: 2, c: 'recall',
  stem: 'The Minerva Mills case (1980) is mainly remembered because it',
  opts: ['reaffirmed the basic structure doctrine and the balance between the Fundamental Rights and the Directive Principles', 'abolished the basic structure doctrine', 'created the Finance Commission', 'lowered the voting age to 18'],
  sol: 'Minerva Mills reaffirmed the doctrine of Kesavananda Bharati and the balance between the Fundamental Rights and the Directive Principles. It did not abolish the doctrine, and the Finance Commission and the voting age have no connection with it.',
}));
Q('m_significance', mcq({
  t: 2, d: 3, c: 'understanding',
  stem: 'Why is the basic structure doctrine said to balance rigidity and flexibility?',
  opts: ['Most provisions can be amended to meet new needs, but the core features of the Constitution cannot be altered', 'Every provision can be changed by a simple majority', 'No provision can be changed at all', 'It lets the President amend the Constitution without Parliament'],
  sol: 'The doctrine leaves the wide power to amend, which gives flexibility, and protects the core, which gives stability. A simple majority for everything would be pure flexibility, no change at all would be pure rigidity, and the President has no such amending power.',
}));
Q('m_cons_app', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'In the imagined country Quillan, the legislature may change any part of the written constitution by passing an ordinary law with a majority of the members voting. How would this constitution be described?',
  opts: ['Flexible, since it is as easy to change as an ordinary law', 'Rigid, since it is written', 'Rigid, since a legislature is involved', 'Neither, since all constitutions are equally easy to change'],
  sol: 'A constitution that can be changed by the ordinary law-making process is flexible. Being written does not make a constitution rigid, the involvement of a legislature is true of both kinds, and constitutions do differ in how easily they can be changed.',
}));
Q('m_rigid_app', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'The constitution of the imagined country Veldora can be changed only if three fifths of its voters approve in a national vote, and nine tenths of its provincial councils agree. This constitution is best described as',
  opts: ['rigid, because change is made very difficult', 'flexible, because the voters are consulted', 'flexible, because it has provincial councils', 'unwritten, because voters are involved'],
  sol: 'A procedure with several demanding conditions makes a constitution rigid. Consulting the voters or having provincial councils does not make it flexible, and the procedure says nothing about whether it is written.',
}));
Q('m_living', mcq({
  t: 2, d: 4, c: 'evaluation',
  stem: 'A Harbour Road School student claims that the rigid constitution of the imagined country Veldora, amended only twice in sixty years, cannot be called a living document. Which judgment of this claim is best supported?',
  opts: ['The claim is weak, because a constitution also lives through judicial interpretation and political conventions, so a rigid amendment procedure limits only one of the ways it can change', 'The claim is sound, because a constitution lives only through formal amendment', 'The claim is sound, because rigidity means that a constitution cannot adapt in any way', 'The claim is weak, because a rigid constitution is changed as easily as an ordinary law'],
  sol: 'Rigidity makes the formal route of amendment difficult, but courts can widen the meaning of rights and conventions can fill gaps, so the constitution can still adapt while keeping its core. The claim wrongly treats amendment as the only way of change. A rigid constitution is by definition hard to change, so the last option is false.',
}));
Q('m_art21_app', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'Street vendors of the imagined town of Halsey in Merivia are evicted without notice. Their petition says that courts have read the right to livelihood into the right to life and personal liberty under Article 21. Which way of keeping the Constitution alive does this illustrate?',
  opts: ['Judicial interpretation, which widens the meaning of a right without a formal amendment', 'A formal amendment under Article 368', 'An ordinary law passed by a simple majority', 'A convention of the legislature'],
  sol: 'When courts read a wider meaning into an existing right, the Constitution develops through judicial interpretation, with no change of its text. No amendment bill or ordinary law is involved, and a convention is a practice of political actors, not a reading by courts.',
}));
Q('m_convention_app', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'The written constitution of the imagined country Pellara does not say whom its head of state must invite to form a government. For sixty years the head of state has invited the leader of the largest group in the legislature, and everyone expects this. This practice is an example of',
  opts: ['a political convention that fills a gap in the written text', 'an amendment under the written constitution', 'a court judgment', 'an ordinary law passed by the legislature'],
  sol: 'A long and accepted practice that fills a silence in the text is a convention, and conventions are one way in which political practice shapes how a constitution works. No amendment, judgment or law is mentioned in the description.',
}));
Q('m_both_app', mcq({
  t: 2, d: 4, c: 'analysis',
  stem: 'In the imagined country Pellara, a court reads a right to clean drinking water into the right to life. Ten years later the legislature passes an amendment that adds this right to the text. What does this sequence show?',
  opts: ['The judiciary and the legislature can both contribute to the growth of rights', 'The court\'s reading was invalid, so the legislature had to correct it', 'An amendment is never needed once a court has interpreted a right', 'Only the legislature can interpret a constitution'],
  sol: 'The court widened a right by interpretation and the legislature later gave it express form, so both institutions contributed. The amendment does not show that the reading was invalid, an amendment may still be useful after a reading, and courts do interpret constitutions.',
}));
Q('m_views', mcq({
  t: 2, d: 4, c: 'evaluation',
  stem: 'A student has to give a balanced view on the basic structure doctrine. Which answer is balanced?',
  opts: ['Some argue that it gives judges too much power over the elected Parliament; others argue that it protects the core of the Constitution from being altered', 'It is wrong, and nobody can defend it', 'It is perfect, and nobody can criticise it', 'It should not be discussed in a classroom'],
  sol: 'A balanced answer presents the reasons of both sides and lets the reader weigh them. The other options take one side without reasons or refuse to discuss the question.',
}));

// ---------------------------------------------------------------- assertion-reason
Q('ar_special', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'Most provisions of the Constitution, including the Fundamental Rights, can be amended only by a special majority in each House.',
  r: 'A special majority requires broad agreement, which makes a change of the Constitution more difficult than the passing of an ordinary law.',
  sol: 'Both are true, and R explains A: the special majority is demanding on purpose, so that important provisions are not changed by a bare majority.',
}));
Q('ar_golak', ar({
  t: 2, d: 3, c: 'understanding', verdict: 'both-true-not-explains',
  a: 'In the Golaknath case (1967), the Supreme Court held that Parliament cannot amend the Fundamental Rights.',
  r: 'The 24th Amendment (1971) asserted the power of Parliament to amend any part of the Constitution.',
  sol: 'Both statements are true, but R does not explain A: the 24th Amendment was a later response by Parliament to the position taken in the case, and not the reason for the Court\'s decision.',
}));
Q('ar_basic', ar({
  t: 2, d: 4, c: 'analysis', verdict: 'A-false-R-true',
  a: 'The basic structure doctrine means that Parliament can amend any provision of the Constitution without any limit.',
  r: 'The Kesavananda Bharati case (1973) held that Parliament can amend any part of the Constitution but cannot alter its basic structure.',
  sol: 'A is false because the doctrine sets a limit on the amending power. R is true and states the limit, which contradicts A.',
}));
Q('ar_44', ar({
  t: 1, d: 3, c: 'recall', verdict: 'A-true-R-false',
  a: 'The 44th Amendment (1978) restored several provisions that the 42nd Amendment (1976) had changed.',
  r: 'The 44th Amendment was passed before the 42nd Amendment.',
  sol: 'A is true. R is false: the 42nd Amendment was passed in 1976 and the 44th in 1978, so the 44th came later.',
}));
Q('ar_ratify', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'both-true-not-explains',
  a: 'A change in the representation of states in Parliament needs ratification by at least half of the state legislatures.',
  r: 'Amendments of the Fundamental Rights need a special majority in each House of Parliament.',
  sol: 'Both statements are true, but R does not explain A: state ratification is needed because the change affects the federal structure, and the procedure for Fundamental Rights does not account for it.',
}));
Q('ar_simple', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'The formation of a new state under Article 3 is not counted as an amendment under Article 368.',
  r: 'Article 3 allows Parliament to form new states by an ordinary law passed by a simple majority.',
  sol: 'Both are true, and R explains A: since Article 3 itself provides for an ordinary law, the change is made outside the procedure of Article 368.',
}));

// ---------------------------------------------------------------- true-false, fill in the blank, match, ordering
Q('tf_art3', tf({
  t: 1, d: 2, c: 'understanding', ans: false,
  stem: 'Every change in the Constitution, including the creation of a new state, must be made by a special majority under Article 368.',
  sol: 'Some changes, such as the formation of new states under Article 3 and the creation or abolition of a Legislative Council under Article 169, are made by an ordinary law and are technically not amendments under Article 368.',
}));
Q('tf_list', tf({
  t: 2, d: 3, c: 'understanding', ans: true,
  stem: 'The features that form the basic structure of the Constitution are not given in one fixed list in the text; the courts have identified them over time.',
  sol: 'The doctrine was stated in Kesavananda Bharati, and the courts have since identified features, such as judicial review and the federal character, case by case.',
}));
Q('tf_minerva', tf({
  t: 2, d: 2, c: 'recall', ans: false,
  stem: 'The Minerva Mills case (1980) abolished the basic structure doctrine.',
  sol: 'It reaffirmed the doctrine and the balance between the Fundamental Rights and the Directive Principles.',
}));
Q('fb_368', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'The procedure for the amendment of the Constitution is laid down in Article ___.',
  acc: [['368', 'three hundred and sixty-eight', 'three hundred and sixty eight']],
  sol: 'Article 368 provides for the power of Parliament to amend the Constitution and for the procedure.',
}));
Q('fb_age', fb({
  t: 1, d: 2, c: 'recall',
  stem: 'The 61st Amendment (1988) lowered the voting age to ___ years.',
  acc: [['18', 'eighteen']],
  sol: 'The 61st Amendment lowered the voting age to 18 years.',
}));
Q('fb_kes', fb({
  t: 2, d: 2, c: 'recall',
  stem: 'The basic structure doctrine was laid down in the ___ case, decided in 1973.',
  acc: [['Kesavananda Bharati', 'Kesavananda']],
  sol: 'The Kesavananda Bharati case of 1973 stated the doctrine.',
}));
Q('mt_kinds', match({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'Match each amendment with the description that fits it.',
  pairs: [
    ['15th Amendment, 1963', 'Raised the retirement age of High Court judges'],
    ['52nd Amendment, 1985', 'Anti-defection'],
    ['61st Amendment, 1988', 'Lowered the voting age to 18'],
    ['42nd Amendment, 1976', 'Passed during the national Emergency'],
  ],
  sol: 'The 15th Amendment raised the retirement age of High Court judges, the 52nd dealt with defection, the 61st lowered the voting age, and the 42nd was passed during the Emergency of 1975 to 1977.',
}));
Q('mt_cases', match({
  t: 2, d: 2, c: 'recall', marks: 2,
  stem: 'Match each case or amendment with what it is remembered for.',
  pairs: [
    ['Golaknath case, 1967', 'Parliament cannot amend the Fundamental Rights'],
    ['24th Amendment, 1971', 'Parliament asserted its power to amend any part'],
    ['Kesavananda Bharati case, 1973', 'Basic structure cannot be altered'],
    ['Minerva Mills case, 1980', 'Doctrine reaffirmed'],
  ],
  sol: 'Golaknath held that the Fundamental Rights could not be amended, the 24th Amendment asserted the amending power, Kesavananda Bharati stated the basic structure limit, and Minerva Mills reaffirmed it.',
}));
Q('ord_process', ord({
  t: 1, d: 3, c: 'understanding', marks: 2,
  stem: 'Arrange the steps in the passing of an amendment that affects a federal provision, from the first to the last.',
  items: [
    'The amendment bill is introduced in either House',
    'Each House passes it by the special majority',
    'At least half of the state legislatures ratify it',
    'The President gives assent and the Constitution is amended',
  ],
  sol: 'The bill is introduced, each House passes it separately by the special majority, the states ratify it because a federal provision is affected, and the President then assents.',
}));
Q('ord_time', ord({
  t: 2, d: 3, c: 'understanding', marks: 2,
  stem: 'Arrange the following cases and the amendment that responded to the first of them, from the earliest to the latest.',
  items: [
    'The Golaknath case',
    'The 24th Amendment',
    'The Kesavananda Bharati case',
    'The Minerva Mills case',
  ],
  sol: 'Golaknath was decided in 1967, the 24th Amendment passed in 1971, Kesavananda Bharati was decided in 1973 and Minerva Mills in 1980.',
}));

// ================================================================ short answers (2 marks)
Q('s_special', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'What is a special majority in the amendment procedure of the Constitution? Name one provision amended by it.',
  model: 'A **special majority** means a **majority of the total membership** of a House **and two thirds of the members present and voting**. It is used for most provisions, for example the **Fundamental Rights**.',
  sol: 'The two conditions and an example.',
  scheme: [['A majority of the total membership and two thirds of members present and voting', 1], ['One provision, such as the Fundamental Rights', 1]],
}));
Q('s_assent', short({
  t: 1, d: 2, c: 'recall', marks: 2, wl: S2,
  stem: 'State two rules about an amendment bill after it is introduced, other than the majority needed.',
  model: 'An amendment bill can be introduced in **either House**, and there is **no joint sitting** if the Houses disagree. After it is passed, the **President must give assent**, which the **24th Amendment (1971)** made obligatory.',
  sol: 'Any two of the rules.',
  scheme: [['Either House; no joint sitting', 1], ['Assent of the President is obligatory (24th Amendment, 1971)', 1]],
}));
Q('s_technical', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'What are technical or administrative amendments? Give one example.',
  model: '**Technical or administrative amendments** change a detail without altering the policy of the Constitution. For example, the **15th Amendment (1963)** raised the retirement age of **High Court judges from 60 to 62**.',
  sol: 'Meaning and one example.',
  scheme: [['Change of a detail without altering a policy', 1], ['Example: the 15th Amendment, retirement age of High Court judges raised from 60 to 62', 1]],
}));
Q('s_simple', short({
  t: 1, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: 'Why are changes under Article 3 and Article 169 described as not amendments under Article 368 in the strict sense? Give the two matters.',
  model: 'These changes are made by an **ordinary law of Parliament passed by a simple majority**, and not by the procedure of Article 368. **Article 3** deals with the **formation of new states**, and **Article 169** with creating or abolishing a **Legislative Council**.',
  sol: 'The ordinary law and the two matters.',
  scheme: [['Made by an ordinary law with a simple majority', 1], ['Formation of states (Article 3); Legislative Council (Article 169)', 1]],
}));
Q('s_golak', short({
  t: 2, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: 'What did the Supreme Court hold in the Golaknath case (1967), and how did Parliament respond in 1971?',
  model: 'In **Golaknath (1967)** the Court held that **Parliament cannot amend the Fundamental Rights**. In **1971**, through the **24th Amendment**, Parliament **asserted its power to amend any part** of the Constitution.',
  sol: 'The holding and the response.',
  scheme: [['Golaknath: Parliament cannot amend the Fundamental Rights', 1], ['24th Amendment (1971): Parliament asserted the power to amend any part', 1]],
}));
Q('s_kesav', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State the principle laid down in the Kesavananda Bharati case (1973).',
  model: 'In **Kesavananda Bharati (1973)** the Supreme Court held that Parliament can **amend any part of the Constitution**, including the Fundamental Rights, but it **cannot alter the basic structure** of the Constitution. This is the **basic structure doctrine**.',
  sol: 'The wide power and its limit.',
  scheme: [['Parliament can amend any part of the Constitution', 1], ['It cannot alter the basic structure', 1]],
}));
Q('s_minerva', short({
  t: 2, d: 2, c: 'recall', marks: 2, wl: S2,
  stem: 'Name the case of 1980 that reaffirmed the basic structure doctrine and state what it stressed.',
  model: 'The **Minerva Mills case (1980)** reaffirmed the **basic structure doctrine**. It stressed the **balance between the Fundamental Rights and the Directive Principles**, which the Constitution holds together.',
  sol: 'The name of the case and the balance.',
  scheme: [['Minerva Mills (1980) reaffirmed the doctrine', 1], ['Balance between the Fundamental Rights and the Directive Principles', 1]],
}));
Q('s_living', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Why is the Constitution called a living document?',
  model: 'The Constitution is called a **living document** because it **keeps growing with society**. It changes through **formal amendments**, through the **interpretation of the courts** and through **political practice**, and yet it **keeps its core features**.',
  sol: 'Growth through several routes with a stable core.',
  scheme: [['It grows and adapts with society', 1], ['Through amendment, interpretation and practice, keeping its core', 1]],
}));
Q('s_art21', short({
  t: 2, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'Give one example of how judicial interpretation has widened rights without any amendment of the text.',
  model: 'The courts have read many rights into **Article 21**, the right to **life and personal liberty**. For example, they have read in the **right to livelihood** and the **right to privacy**, so the rights grew **without any change in the wording**.',
  sol: 'An example from Article 21.',
  scheme: [['Courts have read rights, such as livelihood or privacy, into Article 21', 1], ['The rights widened without changing the text', 1]],
}));
Q('s_conv', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'How do political practice and conventions help a constitution to change? Give an imagined example.',
  model: '**Conventions** are accepted practices that are **not written** in the constitution but guide how it works. For example, in imagined Pellara the head of state always **invites the leader of the largest group** to form a government, so the **practice changes how the text works**.',
  sol: 'Meaning of a convention and an imagined example.',
  scheme: [['Accepted practices that guide how the constitution works', 1], ['An example of a practice filling a gap in the text', 1]],
}));

// ---------------------------------------------------------------- short answers (3 marks)
Q('s3_methods', short({
  t: 1, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Describe the three ways in which the Constitution can be changed, as commonly taught.',
  model: '1. By a **simple majority of Parliament**, as in forming new states under Article 3.\n2. By a **special majority in each House**, for most provisions, including the Fundamental Rights.\n3. By a **special majority plus ratification by at least half of the state legislatures**, for provisions that affect the federal structure.',
  sol: 'Three ways, each with its use.',
  scheme: [['Simple majority of Parliament', 1], ['Special majority in each House', 1], ['Special majority plus ratification by half of the state legislatures', 1]],
}));
Q('s3_ratify', short({
  t: 1, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: 'Name any three matters on which an amendment needs ratification by the state legislatures, and say why states are involved.',
  model: 'Ratification is needed for matters such as the **election of the President**, the **Supreme Court and High Courts**, the **lists of the Seventh Schedule**, the **representation of states in Parliament** and **Article 368** itself. States are involved because these matters touch the **federal structure**.',
  sol: 'Three matters and the federal reason.',
  scheme: [['Any three matters, such as the election of the President or the Seventh Schedule lists', 2], ['They affect the federal structure, so states must agree', 1]],
}));
Q('s3_kinds', short({
  t: 1, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: 'Name three kinds of amendments, with one example for each.',
  model: '1. **Technical or administrative:** the 15th Amendment (1963) raised the retirement age of High Court judges.\n2. **Political consensus:** the 52nd Amendment (1985) on anti-defection, or the 61st Amendment (1988) lowering the voting age.\n3. **Differing interpretations** of the judiciary and Parliament, for example over property and the Fundamental Rights.',
  sol: 'Three kinds with examples.',
  scheme: [['Technical or administrative, with an example', 1], ['Political consensus, with an example', 1], ['Differing interpretations, with an example', 1]],
}));
Q('s3_42_44', short({
  t: 1, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'State three facts about the 42nd Amendment (1976) and the 44th Amendment (1978).',
  model: '1. The **42nd Amendment** was passed during the **national Emergency (1975 to 1977)** and changed many parts of the Constitution.\n2. It added the words **socialist, secular and integrity** to the Preamble, and the **Fundamental Duties**.\n3. The **44th Amendment (1978)** restored several provisions.',
  sol: 'Three accurate facts about the two Amendments.',
  scheme: [['42nd Amendment passed during the Emergency, with many changes', 1], ['Words added to the Preamble; Fundamental Duties', 1], ['44th Amendment restored several provisions', 1]],
}));
Q('s3_elements', short({
  t: 2, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: 'What is the basic structure of the Constitution? Name any four features that the courts have identified, for example.',
  model: 'The **basic structure** is the set of **core features** of the Constitution that Parliament **cannot alter** even by amendment. The courts have identified, for example, the **supremacy of the Constitution**, the **democratic form of government**, **judicial review** and the **federal character**.',
  sol: 'Meaning and four features.',
  scheme: [['Core features that cannot be altered by amendment', 1], ['Any two features', 1], ['Any two further features', 1]],
}));
Q('s3_balance', short({
  t: 2, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Explain how the basic structure doctrine balances rigidity and flexibility, and limits the amending power.',
  model: 'The doctrine leaves Parliament a **wide power to amend** any provision, which gives the Constitution **flexibility** to meet new needs. It also **protects the core** features, which gives the Constitution **stability** and keeps it from being changed beyond recognition. In this way the doctrine **limits the amending power**, so that no amendment can **alter the basic structure**, even when it has the special majority.',
  sol: 'Flexibility, stability and the limit.',
  scheme: [['Wide power to amend gives flexibility', 1], ['Protection of core features gives stability', 1], ['Limit on the amending power', 1]],
}));
Q('s3_views', short({
  t: 2, d: 4, c: 'evaluation', marks: 3, wl: S3,
  stem: 'Present the two views on the basic structure doctrine, giving one reason for each.',
  model: 'Some argue that the doctrine gives **judges too much power**, since judges are not elected and can strike down an amendment passed by the elected Parliament. Others argue that it **guards the core** features against a majority of the moment. A student can weigh the reasons of both.',
  sol: 'Both views with reasons.',
  scheme: [['View that judges have too much power, with a reason', 1], ['View that the doctrine protects the core, with a reason', 1], ['Both views presented without taking a side without reasons', 1]],
}));
Q('s3_together', short({
  t: 2, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Explain how Parliament and the judiciary have together contributed to the growth of the Constitution.',
  model: 'Parliament changes the text through **amendments** under Article 368. The judiciary **interprets** the text, for example by reading many rights into **Article 21**, and has stated the **basic structure** limit. Their contributions **together** let the Constitution **grow** while it **keeps its core**.',
  sol: 'Amendment, interpretation and the combined effect.',
  scheme: [['Parliament changes the text by amendments', 1], ['The judiciary interprets and sets the basic structure limit', 1], ['Together the Constitution grows and keeps its core', 1]],
}));

// ================================================================ long answers (5 marks)
Q('l_procedure', long({
  t: 1, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Explain the procedure for amending the Constitution, with the three ways in which it can be changed.',
  model: '1. **Article 368** lays down the procedure, which balances **rigidity and flexibility**.\n2. Some matters, such as new states under **Article 3**, are changed by an **ordinary law with a simple majority**.\n3. Most provisions need a **special majority in each House**: a majority of the total membership and two thirds of those present and voting.\n4. Federal matters need the special majority **plus ratification by at least half of the state legislatures**.\n5. A bill can start in **either House**, there is **no joint sitting**, and the **President must assent**.',
  sol: 'The Article, three ways and the other rules.',
  scheme: [['Article 368 and the balance between rigidity and flexibility', 1], ['Simple majority, with an example', 1], ['Special majority in each House, defined', 1], ['Special majority plus ratification by states, for federal matters', 1], ['Either House, no joint sitting, obligatory assent', 1]],
}));
Q('l_kinds', long({
  t: 1, d: 3, c: 'application', marks: 5, wl: L5,
  stem: 'Describe the kinds of amendments made to the Constitution, giving an example of each.',
  model: '1. Over **a hundred amendments** have been made, the 106th in 2023 being the latest as of 2024.\n2. **Technical or administrative:** the **15th Amendment (1963)** raised the retirement age of High Court judges from 60 to 62.\n3. **Differing interpretations** of the judiciary and Parliament, for example over **property and the Fundamental Rights**.\n4. **Political consensus:** the **52nd (1985)** on anti-defection, the **61st (1988)** on the voting age of 18, and the **73rd and 74th (1992)** on local government.\n5. **Controversial amendments of the 1970s**, such as the **42nd (1976)**.',
  sol: 'The number and four kinds with examples.',
  scheme: [['More than a hundred amendments, with a dated note', 1], ['Technical or administrative, with an example', 1], ['Differing interpretations, with a matter', 1], ['Political consensus, with examples', 1], ['The amendments of the 1970s', 1]],
}));
Q('l_1970s', long({
  t: 1, d: 4, c: 'analysis', marks: 5, wl: L5,
  stem: 'Describe the 42nd Amendment (1976) and the 44th Amendment (1978) and say why such amendments are studied as a separate group.',
  model: '1. The **42nd Amendment (1976)** was passed during the **national Emergency (1975 to 1977)** and changed many parts of the Constitution.\n2. It added **socialist, secular and integrity** to the Preamble and added the **Fundamental Duties**.\n3. The **44th Amendment (1978)** **restored several provisions** that the 42nd had changed.\n4. They are studied as a group because a **single amendment changed many parts** and was then partly reversed.\n5. They show how **amending power is used** and why the limits on it matter.',
  sol: 'Facts of both, and the reason for studying them together.',
  scheme: [['42nd Amendment passed during the Emergency, changing many parts', 1], ['Words added to the Preamble and the Fundamental Duties', 1], ['44th Amendment restored several provisions', 1], ['Why they form a group: wide changes, then reversal', 1], ['Link with the limits on the amending power', 1]],
}));
Q('l_basic', long({
  t: 2, d: 4, c: 'analysis', marks: 5, wl: L5,
  stem: 'Trace the development of the basic structure doctrine from the Golaknath case to the Minerva Mills case, and list the features commonly identified as part of the basic structure.',
  model: '1. In **Golaknath (1967)** the Court held that Parliament **cannot amend the Fundamental Rights**.\n2. The **24th Amendment (1971)** asserted that Parliament can **amend any part** of the Constitution.\n3. In **Kesavananda Bharati (1973)** the Court held that Parliament can amend any part but **cannot alter the basic structure**.\n4. **Minerva Mills (1980)** **reaffirmed** the doctrine.\n5. Features identified, for example, are the **supremacy of the Constitution**, the **democratic and republican form of government**, **secular character**, **separation of powers**, **federal character**, **judicial review** and the **rule of law**.',
  sol: 'Four steps in order and the features.',
  scheme: [['Golaknath 1967', 1], ['24th Amendment 1971', 1], ['Kesavananda Bharati 1973: the basic structure limit', 1], ['Minerva Mills 1980: reaffirmed', 1], ['Features identified, for example, by the courts', 1]],
}));
Q('l_balance', long({
  t: 2, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: 'Examine the significance of the basic structure doctrine. Does it balance rigidity and flexibility? Give both views.',
  model: '1. The doctrine lets Parliament **amend any part**, which gives **flexibility**.\n2. It forbids altering the **basic structure**, which gives **stability** and protects the core.\n3. In this way it **limits the amending power** and balances **rigidity and flexibility**.\n4. **Some argue** that it gives **judges too much power**, since they are not elected.\n5. **Others argue** that it **guards the core** features against a majority of the moment.',
  sol: 'Balance, the limit and both views.',
  scheme: [['Wide amending power gives flexibility', 1], ['Protection of the core gives stability', 1], ['Limit on the amending power', 1], ['View that judges gain too much power', 1], ['View that the doctrine protects the core', 1]],
}));
Q('l_living', long({
  t: 2, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: 'Explain why the Constitution is called a living document, with the contribution of Parliament, the judiciary and political practice.',
  model: '1. A **living document** keeps growing with society and yet **keeps its core**.\n2. **Parliament** changes the text by **amendments** under Article 368.\n3. The **judiciary** has widened rights by **interpretation**: the courts have read many rights into **Article 21**, such as the **right to livelihood** and the **right to privacy**.\n4. **Political practice and conventions** also change how the Constitution works.\n5. These contributions work **together**, and the **basic structure** keeps the core stable.',
  sol: 'Meaning and three contributions.',
  scheme: [['Meaning of a living document', 1], ['Amendments by Parliament', 1], ['Judicial interpretation, with an example from Article 21', 1], ['Political practice and conventions', 1], ['They work together; the core is kept', 1]],
}));

// ================================================================ case-based (4 marks: 1 + 1 + 2)
Q('c_bill', caseQ({
  t: 1, d: 4, c: 'application', origin: 'soyl-original',
  stem: 'Read the table from an imagined bulletin and answer the questions that follow. *(An imagined bulletin written by SOYL for practice; the bills and the state are not real.)*',
  passage: '**From an imagined bulletin of bills before Parliament**\n\n| Bill | What it proposes |\n|---|---|\n| Bill A | To rename the imagined state of Merivia as Meriva, by a law under Article 3 |\n| Bill B | The imagined 140th Amendment Bill: to widen one Fundamental Right |\n| Bill C | The imagined 141st Amendment Bill: to change the way the President is elected |\n\nThe bulletin notes that each bill has been introduced in a different House and that no joint sitting is planned for any of them.',
  parts: [
    child('a', short({ t: 1, d: 2, c: 'recall', marks: 1, stem: 'Which bill would not be counted as an amendment under Article 368?', model: '**Bill A**, which is a law under Article 3.', sol: 'Article 3 laws are made by ordinary law.', scheme: [['Bill A', 1]] })),
    child('b', short({ t: 1, d: 3, c: 'application', marks: 1, stem: 'Which bill needs ratification by at least half of the state legislatures?', model: '**Bill C**, because the election of the President affects the federal structure.', sol: 'The election of the President is a federal provision.', scheme: [['Bill C', 1]] })),
    child('c', short({ t: 1, d: 4, c: 'analysis', marks: 2, stem: '**Either** (i): State the majority needed for Bill B and explain what it means.', model: 'Bill B needs a **special majority in each House**: a **majority of the total membership** and **two thirds of the members present and voting**. **Ratification by the states is not needed**, since a Fundamental Right is not a federal provision.', sol: 'The special majority and its meaning.', scheme: [['Special majority defined', 1], ['No state ratification needed for a Fundamental Right', 1]] }), [
      short({ t: 1, d: 4, c: 'analysis', marks: 2, stem: '**Or** (ii): The bulletin says that no joint sitting is planned. Why is a joint sitting not available for an amendment bill, and what must each House do?', model: 'A **joint sitting does not apply to amendment bills**, so a disagreement cannot be settled that way. Each House must **pass the bill on its own by the special majority**, and after that the **President must give assent**.', sol: 'No joint sitting and separate passing.', scheme: [['No joint sitting for amendment bills', 1], ['Each House passes it separately; assent is obligatory', 1]] }),
    ]),
  ],
}));
Q('c_log', caseQ({
  t: 1, d: 4, c: 'application', origin: 'soyl-original',
  stem: 'Read the table from an imagined register and answer the questions that follow. *(An imagined register written by SOYL for practice; the country Tarnovia and its amendments are not real.)*',
  passage: '**Extract from an imagined register of amendments of Tarnovia**\n\n| Amendment | Year | What happened |\n|---|---|---|\n| 3rd | 1961 | The year of a council meeting was corrected in the text |\n| 9th | 1974 | The legislature changed a clause after the court and the legislature read the clause differently on land |\n| 14th | 1990 | All parties agreed to lower the voting age |',
  parts: [
    child('a', short({ t: 1, d: 2, c: 'recall', marks: 1, stem: 'Which amendment in the register is a technical or administrative amendment?', model: 'The **3rd Amendment (1961)**.', sol: 'A correction of a year changes only a detail.', scheme: [['The 3rd Amendment', 1]] })),
    child('b', short({ t: 1, d: 3, c: 'application', marks: 1, stem: 'Which amendment arose from differing interpretations by the court and the legislature?', model: 'The **9th Amendment (1974)**.', sol: 'The court and legislature read the clause differently.', scheme: [['The 9th Amendment', 1]] })),
    child('c', short({ t: 1, d: 4, c: 'analysis', marks: 2, stem: '**Either** (i): Name the kind of amendment that the 14th Amendment is, and give one example from India.', model: 'It is an amendment made through **political consensus**. In India, the **61st Amendment (1988)**, which lowered the voting age to 18, is an example.', sol: 'Consensus amendment and an example.', scheme: [['Political consensus', 1], ['An example such as the 61st Amendment (1988)', 1]] }), [
      short({ t: 1, d: 4, c: 'analysis', marks: 2, stem: '**Or** (ii): What does the 9th Amendment suggest about the relation between the court and the legislature in Tarnovia?', model: 'It suggests that the two **may read the same clause differently**, and that the **legislature can respond by an amendment**. Such a relation shows how the **text can change** after a disagreement of interpretation.', sol: 'Differing readings and a response by amendment.', scheme: [['They may read a clause differently', 1], ['The legislature may respond by amending the text', 1]] }),
    ]),
  ],
}));
Q('c_merivia', caseQ({
  t: 2, d: 4, c: 'application', origin: 'soyl-original',
  stem: 'Read the newspaper report and answer the questions that follow. *(An imagined report written by SOYL for practice; the newspaper, the petitioner and the Amendment are not real.)*',
  passage: '**From the Merivia Courier, imagined**\n\nA resident of Merivia has asked the Supreme Court to strike down the imagined 145th Amendment Act. The Act says that Parliament may replace the elected form of government by a council of nominated members. The Union replies that the Act was passed by a special majority and ratified by the states. The petitioner says that the Act alters the basic structure of the Constitution. The Court has reserved its order.',
  parts: [
    child('a', short({ t: 2, d: 2, c: 'recall', marks: 1, stem: 'Which case of 1973 stated the doctrine on which the petitioner relies?', model: 'The **Kesavananda Bharati case**.', sol: 'The doctrine of the basic structure was stated in 1973.', scheme: [['Kesavananda Bharati', 1]] })),
    child('b', short({ t: 2, d: 3, c: 'application', marks: 1, stem: 'Which feature, commonly listed as part of the basic structure, does the Act threaten?', model: 'The **democratic form of government**.', sol: 'The Act would end elected government.', scheme: [['The democratic form of government', 1]] })),
    child('c', short({ t: 2, d: 4, c: 'evaluation', marks: 2, stem: '**Either** (i): The Union says that a special majority and ratification settle the matter. How does the basic structure doctrine answer this?', model: 'The doctrine says that **Parliament can amend any part but cannot alter the basic structure**, so a **special majority and ratification do not by themselves make an amendment valid**. The Court can test the Act and **strike it down** if it alters the basic structure.', sol: 'The limit on the amending power.', scheme: [['The amending power does not extend to altering the basic structure', 1], ['The Court can test the Act and strike it down', 1]] }), [
      short({ t: 2, d: 4, c: 'analysis', marks: 2, stem: '**Or** (ii): Give one argument for and one against the Court having the power to decide this petition.', model: '**For:** the doctrine **protects the core** of the Constitution from a passing majority. **Against:** some argue that unelected **judges should not overrule** an Act passed by the elected Parliament and the states.', sol: 'One argument on each side.', scheme: [['An argument for, such as protecting the core', 1], ['An argument against, such as the power of judges over elected bodies', 1]] }),
    ]),
  ],
}));
Q('c_debate', caseQ({
  t: 2, d: 4, c: 'evaluation', origin: 'soyl-original',
  stem: 'Read the discussion and answer the questions that follow. *(An imagined discussion written by SOYL for practice; the club, the school and the students are not real.)*',
  passage: '**Imagined discussion in the civics club of Harbour Road School**\n\nAsha: Judges are not elected, yet they can set aside an amendment that elected members have passed. That is too much power.\n\nImran: Think of a passing majority that wants to end elections. Some features must stay out of reach, or the Constitution could be changed beyond recognition.\n\nTeacher: Both of you have raised a real point. Which parts of the debate rest on facts, and which on judgement?',
  parts: [
    child('a', short({ t: 2, d: 2, c: 'understanding', marks: 1, stem: 'Which student argues that the core of the Constitution must be protected?', model: '**Imran**.', sol: 'He says that some features must stay out of reach.', scheme: [['Imran', 1]] })),
    child('b', short({ t: 2, d: 2, c: 'recall', marks: 1, stem: 'Name the doctrine of the Supreme Court on which the discussion is based.', model: 'The **basic structure doctrine**.', sol: 'Parliament cannot alter the basic structure.', scheme: [['The basic structure doctrine', 1]] })),
    child('c', short({ t: 2, d: 4, c: 'evaluation', marks: 2, stem: '**Either** (i): Give one reason for each view, Asha\'s and Imran\'s.', model: '**Asha:** judges are **not elected**, yet they can set aside an amendment of elected members. **Imran:** the doctrine **protects core features**, such as elections, from a passing majority.', sol: 'One reason for each view.', scheme: [['A reason for Asha\'s view', 1], ['A reason for Imran\'s view', 1]] }), [
      short({ t: 2, d: 4, c: 'analysis', marks: 2, stem: '**Or** (ii): How does the doctrine try to balance rigidity and flexibility, as the Teacher\'s question hints?', model: 'It allows Parliament a **wide power to amend**, which gives **flexibility**, but keeps the **basic structure** out of reach, which gives **stability**. It thus avoids **both extremes**.', sol: 'Flexibility and stability.', scheme: [['Wide power to amend gives flexibility', 1], ['Basic structure out of reach gives stability', 1]] }),
    ]),
  ],
}));
Q('c_living', caseQ({
  t: 2, d: 4, c: 'application', origin: 'soyl-original',
  stem: 'Read the table from an imagined project and answer the questions that follow. *(An imagined project written by SOYL for practice; the school and the project are not real.)*',
  passage: '**From an imagined Class 11 project, The Constitution Grows**\n\n| Route | Example noted by the class |\n|---|---|\n| Formal amendment | The voting age was lowered through an amendment |\n| Judicial interpretation | Courts have read the right to livelihood into Article 21 |\n| Political practice | A long accepted practice that is not written in the text |',
  parts: [
    child('a', short({ t: 2, d: 2, c: 'recall', marks: 1, stem: 'Under which Article is the formal amendment of the Constitution made?', model: '**Article 368**.', sol: 'Article 368 gives the procedure.', scheme: [['Article 368', 1]] })),
    child('b', short({ t: 2, d: 3, c: 'application', marks: 1, stem: 'By which route in the table did the right to livelihood become part of Article 21?', model: '**Judicial interpretation**.', sol: 'Courts read the right into Article 21.', scheme: [['Judicial interpretation', 1]] })),
    child('c', short({ t: 2, d: 4, c: 'analysis', marks: 2, stem: '**Either** (i): Explain how a political practice can change the way a constitution works, with an example.', model: 'A **long accepted practice** that fills a silence in the text becomes a **convention** and guides action. For example, in imagined Pellara the head of state **invites the leader of the largest group** to form a government, though the **text does not say so**.', sol: 'Convention and an example.', scheme: [['A practice fills a silence in the text and guides action', 1], ['An example, such as inviting the leader of the largest group', 1]] }), [
      short({ t: 2, d: 4, c: 'evaluation', marks: 2, stem: '**Or** (ii): The Constitution changes in all three ways, yet keeps its core. Which doctrine helps to keep it stable, and how?', model: 'The **basic structure doctrine** helps. It lets Parliament **amend** most provisions, but **no amendment can alter the core features**, so the **Constitution stays stable** while it grows.', sol: 'The basic structure doctrine.', scheme: [['The basic structure doctrine', 1], ['It keeps the core out of reach while allowing growth', 1]] }),
    ]),
  ],
}));
