// CBSE 11 Political Science, ch06 Judiciary: question bank. Every passage (newspaper report, case log, briefing note,
// classroom debate) is written by SOYL and labelled as imagined; the state of Varunadesh, the states Karnavar and Tilmora,
// the towns, courts' benches, petitioners and all other people in scenarios are imagined. No NCERT text, boxed source,
// cartoon, Constitution text, speech, court judgment or board/sample-paper item is reused (D-036). Articles are cited by
// number with a paraphrase of what they provide.
import { Q, mcq, ar, tf, fb, match, ord, short, long, caseQ, child } from '../../cbse-11-political-science-ch01/src/lib.mjs';

const S2 = [30, 50];
const S3 = [50, 80];
const L5 = [80, 120];

// ================================================================ t01 Independence and structure of the judiciary
Q('m_why', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Which of the following is a main reason why a country needs a judiciary that works independently of the other organs of government?',
  opts: ['So that disputes are settled and the law is applied impartially, even when the government is one of the parties', 'So that the judiciary can make the laws that it then applies', 'So that the courts can choose the ministers of the government', 'So that the judiciary can raise taxes to meet its own costs'],
  sol: 'An independent judiciary applies the law impartially, settles disputes and protects rights, including against the government itself. Making laws belongs to the legislature, choosing ministers to the executive process, and raising taxes to the legislature, so the other options give the judiciary tasks that are not its own.',
}));
Q('m_indep', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'In political theory, the independence of the judiciary means that',
  opts: ['judges decide cases free from interference by the legislature and the executive', 'judges are not answerable to the law or the Constitution', 'the judiciary may make laws and run the administration', 'judges may refuse to hear any case brought by the government'],
  sol: 'Independence means freedom from interference by the other two organs while deciding cases. It does not place judges above the law, it does not give them the work of the legislature or the executive, and it does not let them refuse cases because the government is a party.',
}));
Q('m_varuna_phone', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'In the imagined state of Varunadesh, a minister telephones a High Court judge and urges her to decide a land case in favour of the state government. The judge ignores the call and decides the case on the evidence. Her conduct shows',
  opts: ['independence of the judiciary from the executive in practice', 'judicial review of a law passed by the legislature', 'the advisory jurisdiction of the High Court', 'the collective responsibility of the Council of Ministers'],
  sol: 'A judge who decides on the evidence and resists an approach from a minister is acting independently of the executive. No law is being examined, so it is not judicial review; no opinion is sought by the President, so it is not advisory jurisdiction; and collective responsibility concerns ministers answering to the legislature.',
}));
Q('m_appoint', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'As of 2024, the practice since the Second Judges case (1993) is that names for appointment as judges of the Supreme Court are recommended mainly by',
  opts: ['the Chief Justice of India together with a collegium of senior judges', 'the Prime Minister acting alone', 'the Lok Sabha, by a vote of its members', 'the Election Commission'],
  sol: 'The Supreme Court\'s view since 1993 is that the Chief Justice of India and a collegium of senior judges play the decisive role in recommending names; the President makes the formal appointment. The Prime Minister acting alone, a vote in the Lok Sabha and the Election Commission have no such role.',
}));
Q('m_njac', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'The National Judicial Appointments Commission Act (2014), which provided for a commission to take part in appointing judges, was struck down by the Supreme Court in',
  opts: ['2015', '1993', '2004', '2019'],
  sol: 'The Court struck down the Act in 2015. The year 1993 is that of the Second Judges case, and 2004 and 2019 are not linked to the Act.',
}));
Q('m_retire', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'A judge of the Supreme Court and a judge of a High Court retire at the ages of, respectively,',
  opts: ['65 years and 62 years', '62 years and 65 years', '60 years and 58 years', '70 years and 65 years'],
  sol: 'The Supreme Court age is 65 and the High Court age is 62. The second option reverses the two, and the others give ages that the Constitution does not fix for these courts.',
}));
Q('m_removal_app', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'The Chief Minister of the imagined state of Varunadesh announces that a High Court judge will be dismissed because three of the judge\'s rulings went against the state government. Which statement is correct?',
  opts: ['The announcement has no basis: a High Court judge can be removed only by Parliament, on proved misbehaviour or incapacity, by a special majority in both Houses', 'The announcement is valid, since the Chief Minister heads the executive of the state', 'The announcement is valid if the Governor signs the order', 'The announcement is valid if the state Bar Council agrees'],
  sol: 'Judges can be removed only through Parliament, on the grounds of proved misbehaviour or incapacity, by a special majority in both Houses; unpopular rulings are not a ground. Neither the Chief Minister, the Governor nor a Bar Council has the power to dismiss a High Court judge.',
}));
Q('m_salary_app', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'During a budget debate in an imagined session, a member suggests that Parliament put the salaries of Supreme Court judges to a vote every year, to show displeasure at some rulings. Which feature of judicial independence makes such a vote unnecessary and improper?',
  opts: ['Their salaries and allowances are charged on the Consolidated Fund of India and are not voted on', 'The judges pay their own salaries out of fees collected from litigants', 'The salaries are fixed every year by the Chief Minister of a state', 'The judges are paid by the political party that recommended them'],
  sol: 'Charging salaries and allowances on the Consolidated Fund means they are not put to a vote, which protects the judges from financial pressure. Judges do not live on litigants\' fees, are not paid by a state Chief Minister, and are not paid by any party.',
}));
Q('m_discuss', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'In an imagined debate in Parliament, a member begins to criticise the personal conduct of a judge of the Supreme Court, although no proposal to remove the judge is before the House. The Presiding Officer stops the member because',
  opts: ['the conduct of judges cannot be discussed in the legislature except during removal proceedings', 'judges may be discussed only in the State Legislative Assemblies', 'Parliament cannot discuss any matter concerning the judiciary at all', 'a judge can be discussed only if the judge is present in the gallery'],
  sol: 'The conduct of judges cannot be discussed in the legislature except when a proposal for removal is under consideration, and this protects judges from pressure. Parliament can still discuss laws and policies concerning the judiciary, and the other options invent rules.',
}));
Q('m_contempt', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'During a hearing in a district court of the imagined state of Varunadesh, a spectator shouts abuse at the judge and tries to stop the proceedings. Which power allows the court to punish the spectator?',
  opts: ['The power to punish for contempt of court, which protects the authority and dignity of the courts', 'The power of judicial review of laws passed by the legislature', 'The advisory jurisdiction of the Supreme Court under Article 143', 'The power to remove ministers from office'],
  sol: 'Punishing contempt protects the authority and dignity of the courts and the administration of justice, so the court can act against a person who obstructs a hearing. Judicial review concerns laws and actions, advisory jurisdiction concerns an opinion sought by the President, and courts do not remove ministers.',
}));
Q('m_structure', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'A visitor to the imagined town of Sarwal learns that a case which began in the Sarwal district court was finally decided by the Supreme Court, whose ruling then bound courts in every state. The visitor asks why India does not keep separate court systems for each state. The best answer is that',
  opts: ['India has an integrated judiciary, one hierarchy with the Supreme Court at the top, High Courts in the states and district and subordinate courts below', 'each state keeps a separate system and the Supreme Court only advises it', 'the legislature of each state hears the final appeals', 'the Council of Ministers decides which court will hear a case'],
  sol: 'An integrated judiciary is one unified hierarchy, so appeals travel upward from district courts through the High Court to the Supreme Court. Separate state systems, final appeals before a legislature, and a Council of Ministers choosing courts would all go against this structure and against independence.',
}));
Q('m_strength', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'As of 2024, the strength of the Supreme Court of India is',
  opts: ['the Chief Justice of India and 33 other judges, 34 in all', 'the Chief Justice of India and 24 other judges, 25 in all', 'the Chief Justice of India and 9 other judges, 10 in all', 'the Chief Justice of India and 49 other judges, 50 in all'],
  sol: 'As of 2024 the strength is 34 in all, including the Chief Justice of India, and Parliament can change the number by law. The other figures are not the present strength.',
}));
Q('m_art141', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'The Supreme Court decides a point of law in a case from the imagined state of Tilmora. Later, a district court in Varunadesh faces the same point of law. According to Article 141, the district court',
  opts: ['is bound to follow the Supreme Court\'s decision on that point of law', 'may ignore it if the government of Varunadesh prefers another view', 'must refer the matter to the Governor of Varunadesh', 'must wait for Parliament to pass a new law before deciding'],
  sol: 'Article 141 makes the law declared by the Supreme Court binding on all courts in India. A state government cannot override it, the Governor has no role in the matter, and the court need not wait for Parliament.',
}));
Q('m_record', mcq({
  t: 1, d: 3, c: 'understanding',
  stem: 'When the Supreme Court is described as a court of record (Article 129), it means that',
  opts: ['its proceedings and decisions are preserved as a record that other courts accept, and it can punish for its own contempt', 'it keeps the records of all births and deaths in the country', 'it records the statements of ministers made in Parliament', 'it destroys the records of the lower courts after ten years'],
  sol: 'A court of record preserves its proceedings and decisions as authoritative records that cannot be questioned in lower courts, and it has the power to punish for contempt of itself. The other options describe unrelated tasks.',
}));
Q('m_debate', mcq({
  t: 1, d: 4, c: 'analysis',
  stem: 'Which statement presents the debate on the appointment of judges in a balanced way?',
  opts: ['Some argue that the collegium keeps appointments free from pressure by the executive; others argue that a wider and more accountable body should also take part', 'The collegium is plainly right and those who question it are plainly wrong', 'The executive alone should appoint judges, so the debate is closed', 'Every argument on one side is false and no argument on the other is'],
  sol: 'A balanced statement sets out the reasons on each side with the words some argue and others argue. The other options take one side or declare the question closed, which is not a balanced presentation of a debated issue.',
}));

// ---------------------------------------------------------------- t02 Jurisdiction, judicial review and activism
Q('m_original_app', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'The imagined states of Karnavar and Tilmora disagree over money: Karnavar says that Tilmora owes it a large sum under an old financial arrangement, and Tilmora denies it. Which court can hear the dispute directly, under its original jurisdiction?',
  opts: ['The Supreme Court, under Article 131', 'The High Court of Karnavar, under Article 226', 'A district court in Tilmora', 'The Election Commission'],
  sol: 'Article 131 gives the Supreme Court original jurisdiction in disputes between the Union and states or between states. A High Court under Article 226 issues writs, a district court of one party would not be neutral, and the Election Commission conducts elections.',
}));
Q('m_writ', mcq({
  t: 2, d: 2, c: 'recall',
  stem: 'The Supreme Court\'s power to issue writs for the enforcement of Fundamental Rights comes from',
  opts: ['Article 32', 'Article 131', 'Article 143', 'Article 356'],
  sol: 'Article 32 lets a person approach the Supreme Court for the enforcement of Fundamental Rights. Article 131 is original jurisdiction, Article 143 is advisory, and Article 356 concerns the failure of constitutional machinery in a state.',
}));
Q('m_writ_app', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'A government order in the imagined state of Varunadesh forbids a group of weavers from holding a peaceful meeting. The weavers believe that their Fundamental Right to assemble peacefully has been violated. Where can they go directly?',
  opts: ['Either the Supreme Court under Article 32 or the High Court of the state under Article 226', 'Only the Supreme Court, and never the High Court', 'Only a district court, which alone can issue writs', 'Only the Council of Ministers of the state'],
  sol: 'A person whose Fundamental Right is violated can approach the Supreme Court under Article 32 or a High Court under Article 226. A High Court is not barred, district courts do not issue such writs, and the Council of Ministers is the authority whose order is being challenged.',
}));
Q('m_226', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'A weavers\' cooperative in the imagined state of Tilmora complains that an order of a state department has taken away a legal right that is given by an ordinary state law and is not a Fundamental Right. Where can it file a writ petition?',
  opts: ['In the High Court of Tilmora under Article 226, because a High Court can issue writs for legal rights other than Fundamental Rights', 'Only in the Supreme Court under Article 32, because it covers every legal right', 'Only in the Supreme Court under Article 131, because the state is a party', 'Only before the President, who gives a binding opinion under Article 143'],
  sol: 'Article 226 lets a High Court issue writs for Fundamental Rights and for other legal purposes, so the cooperative can go there. Article 32 is limited to Fundamental Rights, Article 131 covers disputes between governments, and a reference by the President under Article 143 gives an advisory opinion that is not binding and is not a remedy for a litigant.',
}));
Q('m_slp', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'Mehrunissa loses an appeal in the High Court of an imagined state, and no certificate for appeal to the Supreme Court is given. She still wants the Supreme Court to look at the case. Which route can she try?',
  opts: ['A petition for special leave to appeal under Article 136, which the Court may grant at its discretion', 'A request to the President for an advisory opinion under Article 143', 'A fresh suit under Article 131, as the Union against a state', 'A writ under Article 32, which the Court must grant as of right'],
  sol: 'Article 136 allows the Supreme Court to grant special leave to appeal, at its discretion. An advisory opinion is sought by the President and not by a litigant, Article 131 covers disputes between governments, and a writ under Article 32 is for Fundamental Rights and is not a matter of right.',
}));
Q('m_advis', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'In an imagined situation, the President refers a question of law of public importance to the Supreme Court under Article 143, and the Court gives its opinion. Which statement is correct?',
  opts: ['The opinion is advisory and is not binding on the President', 'The opinion is a judgment that the government must carry out', 'The opinion is a law as if passed by Parliament', 'The opinion amends the Constitution automatically'],
  sol: 'Under Article 143 the Court gives an advisory opinion, which is not binding. It is not a judgment between parties, it is not a law passed by Parliament, and it cannot amend the Constitution.',
}));
Q('m_review', mcq({
  t: 2, d: 2, c: 'recall',
  stem: 'Judicial review is the power of the courts to',
  opts: ['examine whether a law or an executive action is consistent with the Constitution and declare it invalid if it is not', 'review the performance of every judge each year', 'decide who will be the next Prime Minister', 'revise the voters\' lists prepared by the Election Commission'],
  sol: 'Judicial review is the power to test laws and executive actions against the Constitution and declare them invalid if inconsistent. The other options describe unrelated tasks of other bodies.',
}));
Q('m_review_app', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'The Legislative Assembly of the imagined state of Varunadesh passes a law that bans all peaceful public meetings in the state for a full year. A petitioner challenges it, and the High Court declares it invalid because it conflicts with Fundamental Rights. This is an example of',
  opts: ['judicial review', 'the advisory jurisdiction of the High Court', 'the pocket veto', 'collective responsibility'],
  sol: 'A court examining a law against the Constitution and declaring it invalid is exercising judicial review. Advisory jurisdiction involves an opinion sought by the President, the pocket veto is a delay in assent to a bill, and collective responsibility is about ministers and the legislature.',
}));
Q('m_art13', mcq({
  t: 2, d: 3, c: 'understanding',
  stem: 'Which Article declares laws that are inconsistent with the Fundamental Rights void to that extent, and so supports the courts\' power of judicial review?',
  opts: ['Article 13', 'Article 21', 'Article 74', 'Article 368'],
  sol: 'Article 13 provides that laws inconsistent with the Fundamental Rights are void to that extent. Article 21 protects life and personal liberty, Article 74 deals with the Council of Ministers, and Article 368 deals with amendment of the Constitution.',
}));
Q('m_pil_app', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'An imagined newspaper reports that workers in a stone quarry in Varunadesh are kept in debt bondage. A teacher who is not related to any of them writes a letter to the High Court describing the matter, and the Court treats the letter as a petition. This is an example of',
  opts: ['public interest litigation', 'an advisory opinion', 'original jurisdiction in a dispute between states', 'the impeachment of a judge'],
  sol: 'A person who is not directly affected approaches the court on behalf of those who cannot, and the court treats a letter as a petition: this is public interest litigation. The other options involve the President, two states, or Parliament removing a judge.',
}));
Q('m_locus', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'Before public interest litigation, a court in the imagined town of Sarwal would have rejected a petition by a social worker, Rekha, on behalf of homeless sweepers, saying that her own rights were not affected. Which rule would it have applied, and which public interest litigation later relaxed?',
  opts: ['Locus standi, which limited the right to approach the court to the person whose own rights were affected', 'Judicial review, which limited petitions to laws made by Parliament', 'Original jurisdiction, which limited petitions to disputes between states', 'Special leave, which limited petitions to appeals from a High Court'],
  sol: 'Locus standi is the right to bring a case, and the older rule limited it to the person whose rights were affected; public interest litigation relaxed it so that Rekha could petition for others. The other options are different ideas about review, original jurisdiction and appeals.',
}));
Q('m_pil_not', mcq({
  t: 2, d: 4, c: 'analysis',
  stem: 'Which of the following would ordinarily NOT be treated as public interest litigation?',
  opts: ['Bholaram sues his neighbour in the imagined town of Sarwal over the boundary of their two private plots', 'A group of citizens petitions on behalf of prisoners who have waited for trial for years', 'A letter to a High Court describes unsafe working conditions of poor labourers', 'A lawyer petitions for the rights of children who cannot approach the court themselves'],
  sol: 'A private dispute between two neighbours about their own land is ordinary litigation and has no public interest element. The other three raise the rights of groups that are poor or unable to approach the court themselves, which is the field of public interest litigation.',
}));
Q('m_activism', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'On a letter about unsafe school buildings, the High Court of the imagined state of Karnavar orders the state to inspect every school and report back within two months. Supporters call this judicial activism. What does the term describe?',
  opts: ['An active role of the courts in protecting rights and addressing public problems, sometimes going beyond deciding a dispute between two parties', 'The habit of judges of avoiding the decision of any case', 'The participation of judges in election campaigns', 'The power of the legislature to appoint judges'],
  sol: 'Judicial activism is an active role of the courts in protecting rights and tackling public problems, with directions that may go beyond settling a dispute between two parties, as in the order to inspect schools. Avoiding cases, campaigning and legislative appointment are not what the term means.',
}));
Q('m_overreach', mcq({
  t: 2, d: 4, c: 'analysis',
  stem: 'Some critics describe certain instances of judicial activism as judicial overreach. Which statement best expresses the concern behind the term?',
  opts: ['Courts may enter the field of the legislature or the executive, so that the line between the organs is blurred', 'Courts hear too few cases from the poor', 'Courts are not allowed to give any direction to the government', 'Judges are chosen by the voters in each district'],
  sol: 'The concern is that the courts may take up tasks of law-making or administration that belong to the other organs. Others reply that courts act to protect rights where other organs have not. The remaining options are not what critics say.',
}));
Q('m_kesavananda', mcq({
  t: 2, d: 2, c: 'recall',
  stem: 'The Kesavananda Bharati case (1973) is associated with the principle that',
  opts: ['Parliament cannot change the basic structure of the Constitution', 'Parliament can amend every part of the Constitution without any limit', 'the President can veto any amendment', 'the Supreme Court cannot examine any amendment'],
  sol: 'The case held that Parliament\'s power to amend does not extend to changing the basic structure. The other options claim unlimited power, a presidential veto, or no judicial examination, none of which the case held.',
}));

// ---------------------------------------------------------------- assertion-reason
Q('ar_tenure', ar({
  t: 1, d: 3, c: 'understanding', verdict: 'both-true-explains',
  a: 'A judge of the Supreme Court can be removed only by Parliament, on the ground of proved misbehaviour or incapacity.',
  r: 'Security of tenure protects judges from pressure by the executive and the legislature when they decide cases.',
  sol: 'Both are true, and R explains A: removal is made difficult, through a special majority in both Houses, precisely so that judges can decide without fear of losing office.',
}));
Q('ar_salary', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'both-true-not-explains',
  a: 'The salaries and allowances of Supreme Court judges are charged on the Consolidated Fund of India and are not voted on.',
  r: 'Judges of the Supreme Court are appointed by the President.',
  sol: 'Both are true, but R does not explain A: the salaries are not voted on because the Constitution charges them on the Consolidated Fund, which protects financial independence, and not because of who makes the appointment.',
}));
Q('ar_review', ar({
  t: 2, d: 3, c: 'understanding', verdict: 'A-true-R-false',
  a: 'The Supreme Court can declare a law invalid if it violates the Fundamental Rights.',
  r: 'The laws made by Parliament are final, and no court can examine them.',
  sol: 'A is true: this is judicial review, supported by Articles 13 and 32. R is false: courts can test laws against the Constitution, which is the very power described in A.',
}));
Q('ar_pil', ar({
  t: 2, d: 3, c: 'application', verdict: 'both-true-explains',
  a: 'Public interest litigation has widened access to justice for people who are poor or weak.',
  r: 'Courts relaxed the rule of locus standi so that any person or group can approach the court on behalf of those who cannot.',
  sol: 'Both are true, and R explains A: once a concerned person could petition on behalf of others, those who could not afford or reach a court gained access to justice.',
}));
Q('ar_advis', ar({
  t: 2, d: 3, c: 'understanding', verdict: 'A-false-R-true',
  a: 'The government must always act on the opinion that the Supreme Court gives when the President seeks its advice under Article 143.',
  r: 'The President may seek the opinion of the Supreme Court on a question of law or fact of public importance, and the opinion is not binding.',
  sol: 'A is false because an advisory opinion is not binding. R is true, and it is exactly why the government is not bound to act on it.',
}));
Q('ar_integrated', ar({
  t: 1, d: 2, c: 'understanding', verdict: 'both-true-not-explains',
  a: 'The Indian judiciary is an integrated judiciary.',
  r: 'The Supreme Court is a court of record.',
  sol: 'Both are true, but R does not explain A: the judiciary is integrated because one hierarchy runs from the district courts through the High Courts to the Supreme Court; being a court of record is a separate feature of the Supreme Court.',
}));

// ---------------------------------------------------------------- true-false, fill in the blank, match, ordering
Q('tf_acc', tf({
  t: 1, d: 2, c: 'understanding', ans: false,
  stem: 'Independence of the judiciary means that judges are free from every kind of accountability.',
  sol: 'Independence means freedom from interference by the legislature and the executive in deciding cases. Judges remain accountable: they give reasoned judgments, are bound by the Constitution, and can be removed for proved misbehaviour or incapacity.',
}));
Q('tf_226', tf({
  t: 2, d: 3, c: 'understanding', ans: true,
  stem: 'A High Court can issue writs not only for Fundamental Rights but also for other legal rights.',
  sol: 'Article 226 gives High Courts a wider writ power than the Supreme Court has under Article 32, which is limited to Fundamental Rights.',
}));
Q('tf_locus', tf({
  t: 2, d: 2, c: 'understanding', ans: false,
  stem: 'After the rise of public interest litigation, only the person whose own right was violated can approach the court.',
  sol: 'Public interest litigation relaxed locus standi so that any person or group can approach the court on behalf of those who cannot.',
}));
Q('fb_retire', fb({
  t: 1, d: 2, c: 'recall',
  stem: 'A judge of the Supreme Court retires at the age of ___ years.',
  acc: [['65', 'sixty-five', 'sixty five']],
  sol: 'Judges of the highest court leave office at 65, three years later than High Court judges, who go at 62.',
}));
Q('fb_art32', fb({
  t: 2, d: 2, c: 'recall',
  stem: 'A person whose Fundamental Right is violated can approach the Supreme Court directly under Article ___.',
  acc: [['32', 'thirty-two', 'thirty two']],
  sol: 'Article 32 provides for the enforcement of Fundamental Rights by the Supreme Court; High Courts have a similar and wider power under Article 226.',
}));
Q('fb_141', fb({
  t: 1, d: 2, c: 'recall',
  stem: 'Under Article ___, the law declared by the Supreme Court is binding on all courts in India.',
  acc: [['141', 'one hundred and forty-one', 'one hundred and forty one']],
  sol: 'Article 141 makes the decisions of the Supreme Court binding on all courts.',
}));
Q('mt_jurisd', match({
  t: 2, d: 2, c: 'understanding', marks: 2,
  stem: 'Match each jurisdiction of the Supreme Court with its description.',
  pairs: [
    ['Original', 'Disputes between the Union and states, or between states'],
    ['Writ', 'Enforcement of Fundamental Rights under Article 32'],
    ['Appellate', 'Civil, criminal and constitutional appeals, and special leave'],
    ['Advisory', 'Opinion sought by the President, which is not binding'],
  ],
  sol: 'Each jurisdiction has its own kind of case: original (Article 131), writ (Article 32), appellate (including Article 136) and advisory (Article 143).',
}));
Q('mt_safeguard', match({
  t: 1, d: 3, c: 'understanding', marks: 2,
  stem: 'Match each safeguard of judicial independence with the feature that provides it.',
  pairs: [
    ['Security of tenure', 'Removal only by Parliament on proved misbehaviour or incapacity'],
    ['Financial independence', 'Salaries charged on the Consolidated Fund of India'],
    ['Protection from debate', 'Conduct of judges not discussed in the legislature except during removal'],
    ['Authority of the courts', 'Power to punish for contempt'],
  ],
  sol: 'Tenure, finance, protection from debate and the power to punish contempt each secure a different aspect of independence.',
}));
Q('ord_hier', ord({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'Arrange these courts from the lowest to the highest in the integrated judiciary.',
  items: [
    'Subordinate court',
    'District court',
    'High Court of the state',
    'Supreme Court of India',
  ],
  sol: 'Subordinate courts come below the district court, which is below the High Court of the state, and the Supreme Court is at the top.',
}));
Q('ord_pil', ord({
  t: 2, d: 3, c: 'application', marks: 2,
  stem: 'Arrange these events in the order in which they would happen in an imagined public interest litigation in Varunadesh.',
  items: [
    'A newspaper reports poor conditions in a home for the aged',
    'A concerned citizen writes to the High Court about it',
    'The Court treats the letter as a petition and issues notice to the state government',
    'After a hearing, the Court gives directions to improve the conditions',
  ],
  sol: 'The report comes first, then the letter, then the court taking it up as a petition, and finally the directions after the hearing.',
}));

// ================================================================ short answers (2 marks)
Q('s_indep', short({
  t: 1, d: 1, c: 'recall', marks: 2, wl: S2,
  stem: 'What is meant by the independence of the judiciary? Does it mean that judges are not accountable to anyone?',
  model: '**Independence** means that judges decide cases **free from interference by the legislature and the executive**. It does **not** mean that judges are above accountability: they are bound by the Constitution, give reasoned judgments and can be removed for **proved misbehaviour or incapacity**.',
  sol: 'The meaning of independence and the point that accountability remains.',
  scheme: [['Freedom from interference by the legislature and the executive', 1], ['Not freedom from accountability; removal possible on proved grounds', 1]],
}));
Q('s_why', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State any two reasons why a democracy needs an independent judiciary.',
  model: 'First, it upholds the **rule of law**, so that the law applies equally to everyone, including the government. Second, it **protects rights** and settles disputes impartially, and it **guards the Constitution** by examining laws and actions that may go against it.',
  sol: 'Two of the four roles: rule of law, settling disputes, protecting rights, guarding the Constitution.',
  scheme: [['One reason explained', 1], ['A second reason explained', 1]],
}));
Q('s_tenure', short({
  t: 1, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'A group of members of an imagined legislature demands that a judge be dismissed because they dislike three of her rulings. Why can the demand not succeed? State who can remove a judge and on what grounds.',
  model: 'Only **Parliament** can remove a judge, on the grounds of **proved misbehaviour or incapacity**, by a **special majority in both Houses**. Unwelcome rulings are not such grounds, and because removal is very difficult, judges can decide cases without fear of losing office.',
  sol: 'The body that removes, the grounds, and the protection that results, applied to the demand.',
  scheme: [['Only Parliament, on proved misbehaviour or incapacity, by a special majority', 1], ['Unwelcome rulings are no ground, so judges are free from pressure', 1]],
}));
Q('s_fund', short({
  t: 1, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'Members in an imagined session of Parliament propose to cut the pay of Supreme Court judges after a ruling that they dislike. Explain how the financial arrangements for judges stop such pressure.',
  model: 'The **salaries and allowances** of Supreme Court judges are **charged on the Consolidated Fund of India**, which means that they are **not voted on** by the legislature. So the proposal cannot be used as a means of pressure, and judges can decide cases without fear of a cut in their pay.',
  sol: 'The Consolidated Fund and the absence of a vote, applied to the proposal.',
  scheme: [['Salaries and allowances charged on the Consolidated Fund and not voted on', 1], ['So a cut cannot be used as pressure after a ruling', 1]],
}));
Q('s_record', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'What is meant by saying that the Supreme Court is a court of record?',
  model: 'Under **Article 129**, the Supreme Court is a **court of record**. Its **proceedings and decisions are preserved** as authoritative records, which lower courts accept as precedents, and it has the **power to punish for contempt** of itself.',
  sol: 'Records preserved and accepted, and the contempt power.',
  scheme: [['Proceedings and decisions preserved as authoritative records', 1], ['Power to punish for contempt of itself', 1]],
}));
Q('s_141', short({
  t: 1, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'A High Court in the imagined state of Varunadesh decides a point of law differently from an earlier ruling of the Supreme Court on the same point. Which constitutional provision does this go against, and why?',
  model: 'It goes against **Article 141**, under which the law declared by the **Supreme Court is binding on all courts** in India. In an integrated judiciary the High Court is below the Supreme Court, so it must follow the Court\'s ruling on that point of law.',
  sol: 'Article 141 applied to the case.',
  scheme: [['Article 141: Supreme Court decisions bind all courts', 1], ['The High Court is below the Supreme Court in one hierarchy', 1]],
}));
Q('s_226', short({
  t: 2, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: 'Distinguish the writ power of the Supreme Court under Article 32 from that of a High Court under Article 226 in two points.',
  model: '**Article 32** is itself a Fundamental Right and covers only the **enforcement of Fundamental Rights**. **Article 226** lets a High Court issue writs for Fundamental Rights and also for **other legal rights**, so its writ power is **wider**, though it operates within the High Court\'s own area.',
  sol: 'Scope of the two Articles.',
  scheme: [['Article 32: for Fundamental Rights only', 1], ['Article 226: Fundamental Rights and other legal rights, so wider', 1]],
}));
Q('s_review', short({
  t: 2, d: 2, c: 'recall', marks: 2, wl: S2,
  stem: 'Define judicial review and state where in the Constitution it is rooted.',
  model: '**Judicial review** is the courts\' power to test a **law or an executive action against the Constitution** and to declare it **invalid** when it conflicts with it. The words do not appear in the text, but the power flows from **Articles 13, 32 and 226** and others.',
  sol: 'Definition and sources.',
  scheme: [['Power to examine laws and actions against the Constitution and declare them invalid', 1], ['Rooted in Articles 13, 32, 226 and others', 1]],
}));
Q('s_locus', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'What is locus standi? How did public interest litigation change it?',
  model: '**Locus standi** is the right to bring a case before a court, which earlier belonged only to the person whose own right was affected. **Public interest litigation relaxed** it, so that **any person or group** can approach the court on behalf of those who cannot do so themselves.',
  sol: 'The meaning of the term and the relaxation.',
  scheme: [['Locus standi: the right to approach the court, earlier only for the person affected', 1], ['Relaxed so that others can petition on behalf of those who cannot', 1]],
}));
Q('s_advis', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'What is the advisory jurisdiction of the Supreme Court? Is its opinion binding?',
  model: 'Under **Article 143**, the **President can seek the opinion** of the Supreme Court on a question of law or fact of public importance. The Court gives an **advisory opinion**, which is **not binding** on the President or the government.',
  sol: 'Article 143, who asks, and the non-binding nature.',
  scheme: [['The President can seek the Court\'s opinion under Article 143', 1], ['The opinion is advisory and not binding', 1]],
}));

// ---------------------------------------------------------------- short answers (3 marks)
Q('s3_safeguards', short({
  t: 1, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Describe any three ways in which the independence of the judiciary is secured in India.',
  model: '1. **Security of tenure:** a judge can be removed only by Parliament, on proved misbehaviour or incapacity, by a special majority.\n2. **Financial independence:** the pay and allowances of judges are charged on the Consolidated Fund of India, so the legislature does not vote on them.\n3. **Protection from debate and the contempt power:** judges\' conduct cannot be discussed in the legislature except in removal proceedings, and courts can punish for contempt.',
  sol: 'Three safeguards, each described.',
  scheme: [['Security of tenure', 1], ['Financial independence', 1], ['Another safeguard: protection from debate or contempt power', 1]],
}));
Q('s3_appoint', short({
  t: 1, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'State the position since 1993 on the recommendation of judges for appointment, say what happened to the National Judicial Appointments Commission Act (2014), and give one argument on each side of the debate.',
  model: 'Judges are appointed by the President, but since the **Second Judges case (1993)** the Supreme Court\'s view is that the **Chief Justice of India and a collegium** play the decisive role in recommending names. The **2014 Act was struck down in 2015**. Some argue that this protects independence; others argue that a wider body should take part for accountability.',
  sol: 'The 1993 position, the 2015 decision and the two sides.',
  scheme: [['Chief Justice of India and a collegium decisive since 1993', 1], ['NJAC Act (2014) struck down by the Supreme Court in 2015', 1], ['One argument on each side', 1]],
}));
Q('s3_jurisdiction', short({
  t: 2, d: 2, c: 'recall', marks: 3, wl: S3,
  stem: 'Describe the original, writ and advisory jurisdiction of the Supreme Court.',
  model: '1. **Original (Article 131):** disputes between the Union and states, or between states, are heard directly by the Court.\n2. **Writ (Article 32):** a person whose Fundamental Right is violated can approach the Court for its enforcement.\n3. **Advisory (Article 143):** when the President asks for its opinion on a question of law or fact of public importance, the Court gives one, but it does not bind.',
  sol: 'Three jurisdictions with their Articles.',
  scheme: [['Original jurisdiction', 1], ['Writ jurisdiction', 1], ['Advisory jurisdiction and its non-binding nature', 1]],
}));
Q('s3_pil_access', short({
  t: 2, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'Explain, with an imagined example, how public interest litigation has widened access to justice.',
  model: 'Courts **relaxed locus standi**, so any person or group can petition for those who cannot approach the court, and even **letters and news reports** have been treated as petitions. For example, a teacher in imagined Varunadesh could write to the High Court about the plight of **bonded labourers** who cannot themselves go to court.',
  sol: 'Relaxed standing, letters as petitions, and an example.',
  scheme: [['Locus standi relaxed', 1], ['Letters and news reports treated as petitions', 1], ['A suitable example', 1]],
}));
Q('s3_pil_crit', short({
  t: 2, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'State three concerns that some people raise about judicial activism and public interest litigation.',
  model: '1. Some argue that the courts have become **overburdened** with petitions, which can delay other cases.\n2. Some argue that this can **blur the line between the organs**, which they call judicial overreach, when courts take up work of the legislature or executive.\n3. Some argue that courts lack the means to **supervise the administration** and the working of their own directions.',
  sol: 'Three concerns framed as views.',
  scheme: [['Overburdened courts', 1], ['Blurring of the line between the organs (judicial overreach)', 1], ['Another concern, such as limits in supervising directions', 1]],
}));
Q('s3_structure', short({
  t: 1, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Describe the structure of the Indian judiciary and name two features of its integrated character.',
  model: 'The **Supreme Court** is at the top, **High Courts** work in the states, and **district and subordinate courts** are below them. It is an **integrated judiciary**: one hierarchy, and the **decisions of the Supreme Court bind all courts (Article 141)**; the Supreme Court is also a **court of record (Article 129)**.',
  sol: 'The three tiers and two features.',
  scheme: [['Supreme Court, High Courts and district and subordinate courts', 1], ['One hierarchy: Supreme Court decisions bind all courts', 1], ['Court of record', 1]],
}));
Q('s3_sepbal', short({
  t: 2, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain, with two examples, how the judiciary and Parliament came into conflict and why the balance between the organs matters.',
  model: 'Conflicts arose over **property rights** and over **Parliament\'s power to amend the Constitution**. In the **Kesavananda Bharati case (1973)** the Supreme Court held that Parliament cannot change the **basic structure**. Under the **separation of powers**, each organ has its own role and checks the others, so the balance protects against the misuse of power.',
  sol: 'Two sources of conflict, the 1973 case and the idea of balance.',
  scheme: [['Conflicts over property rights and amending power', 1], ['Kesavananda Bharati (1973): basic structure', 1], ['Separation of powers and checks keep the balance', 1]],
}));

// ================================================================ long answers (5 marks)
Q('l_indep', long({
  t: 1, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Explain why an independent judiciary is needed in a democracy and how its independence is secured in India.',
  model: '1. An independent judiciary upholds the **rule of law**, settles disputes, **protects rights** and **guards the Constitution**.\n2. Independence means freedom from interference by the legislature and executive, not freedom from accountability.\n3. Judges are appointed by the **President**, with the **Chief Justice of India and a collegium** playing the decisive role since 1993.\n4. **Security of tenure:** retirement at 65 (Supreme Court) and 62 (High Court); removal only by Parliament by a special majority.\n5. **Financial independence** (Consolidated Fund), protection from debate, and the **contempt** power.',
  sol: 'The need, the meaning, appointment, tenure and the remaining safeguards.',
  scheme: [['Need: rule of law, disputes, rights, Constitution', 1], ['Meaning: freedom from interference, not from accountability', 1], ['Appointment: President, with the Chief Justice and collegium', 1], ['Security of tenure and removal', 1], ['Financial independence, protection from debate and contempt', 1]],
}));
Q('l_structure', long({
  t: 1, d: 2, c: 'understanding', marks: 5, wl: L5,
  stem: 'Describe the structure of the Indian judiciary and explain why it is called integrated.',
  model: '1. The **Supreme Court** is at the top, with the **Chief Justice of India and 33 other judges, 34 in all, as of 2024**.\n2. **High Courts** work in the states.\n3. **District and subordinate courts** work below the High Courts.\n4. It is **integrated** because one hierarchy runs through all levels, not separate systems for the Union and the states.\n5. The Supreme Court\'s decisions are **binding on all courts (Article 141)** and it is a **court of record (Article 129)**.',
  sol: 'Three tiers, the strength, integration, Articles 141 and 129.',
  scheme: [['Supreme Court at the top and its strength', 1], ['High Courts in the states', 1], ['District and subordinate courts', 1], ['Integrated: one hierarchy', 1], ['Article 141 and Article 129', 1]],
}));
Q('l_jurisdiction', long({
  t: 2, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Explain the original, writ, appellate and advisory jurisdiction of the Supreme Court.',
  model: '1. **Original (Article 131):** disputes between the Union and states, or between states, begin in the Supreme Court.\n2. **Writ (Article 32):** a person whose Fundamental Right is violated can approach the Court directly; High Courts have a wider power under **Article 226**.\n3. **Appellate:** civil, criminal and constitutional appeals.\n4. **Special leave (Article 136):** the Court may grant leave to appeal at its discretion.\n5. **Advisory (Article 143):** the President can seek its opinion, which is **not binding**.',
  sol: 'Each jurisdiction with its Article, plus the High Court writ power.',
  scheme: [['Original jurisdiction', 1], ['Writ jurisdiction and Article 226', 1], ['Appellate jurisdiction', 1], ['Special leave under Article 136', 1], ['Advisory jurisdiction and its non-binding nature', 1]],
}));
Q('l_review', long({
  t: 2, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'What is judicial review? Explain its sources, how it works and why it matters for a constitutional democracy.',
  model: '1. **Judicial review** is the power of the courts to examine whether a **law or an executive action is consistent with the Constitution**.\n2. If it is inconsistent, the court can declare it **invalid**.\n3. The power is not named as such in the text but flows from **Articles 13, 32, 226** and others; Article 13 makes laws against Fundamental Rights void.\n4. Courts usually act when a petitioner challenges a law or an action.\n5. It keeps every organ within the Constitution and protects rights.',
  sol: 'Definition, effect, sources, working and importance.',
  scheme: [['Definition', 1], ['Power to declare invalid', 1], ['Sources: Articles 13, 32, 226', 1], ['How it works through a petition', 1], ['Importance for rights and a limited government', 1]],
}));
Q('l_pil', long({
  t: 2, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: 'Explain what is meant by public interest litigation and discuss its effects and the criticisms that are made of judicial activism.',
  model: '1. **Public interest litigation** began in the late **1970s and 1980s**, as courts relaxed **locus standi** so that any person or group can approach the court for those who cannot.\n2. Even **letters and news reports** have been treated as petitions, for example on prisoners\' rights or bonded labour.\n3. **Effects:** people who could not reach a court now find **access to justice**, and the **rights of the poor** receive attention.\n4. **Criticisms:** some argue that courts are **overburdened**, and that **judicial overreach** blurs the line between the organs.\n5. Others reply that courts act where rights would otherwise go unprotected; a balanced view weighs both.',
  sol: 'Meaning, origins, effects, criticisms and a balanced conclusion.',
  scheme: [['Meaning and origins in the 1970s and 1980s', 1], ['Letters and reports treated as petitions, with examples', 1], ['Effects: access to justice and the rights of the poor', 1], ['Criticisms: overburdened courts and judicial overreach', 1], ['A balanced conclusion', 1]],
}));
Q('l_balance', long({
  t: 2, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: 'Examine the relations between the judiciary and Parliament, and explain how the separation of powers keeps a balance.',
  model: '1. Early conflicts arose over **property rights** and over how far **Parliament could amend** the Constitution.\n2. In the **Kesavananda Bharati case (1973)**, the Supreme Court held that Parliament cannot change the **basic structure** (studied in a later chapter).\n3. Under the **separation of powers**, each organ has its own role.\n4. Courts check the others through **judicial review**; Parliament makes laws, can amend the Constitution within limits, and can remove judges by a special majority.\n5. Some argue the balance has served rights; others argue each organ must avoid entering the field of another.',
  sol: 'Conflicts, the 1973 case, the separation of powers, checks and a reasoned conclusion.',
  scheme: [['Conflicts over property rights and amending power', 1], ['Kesavananda Bharati (1973): basic structure', 1], ['Separation of powers: separate roles', 1], ['Mutual checks: judicial review and removal of judges', 1], ['Reasoned conclusion with both views', 1]],
}));

// ================================================================ case-based (4 marks: 1 + 1 + 2)
Q('c_report', caseQ({
  t: 2, d: 4, c: 'application', origin: 'soyl-original',
  stem: 'Read the newspaper report and answer the questions that follow. *(An imagined report written by SOYL for practice; the newspaper, the court, the people and the places are not real.)*',
  passage: '**From the Varuna Courier, imagined, issue of 3 March**\n\nNandini Rao, a lawyer, wrote a postcard to the High Court of Varunadesh. She described 40 prisoners in the Kosala district jail who had waited for their trials for longer than the longest sentence for the offences they were charged with. The Court treated the postcard as a petition and issued notice to the state government. It asked a judge to visit the jail, and later directed the state to review all such cases within three months. Some lawyers welcomed the order as protecting the rights of the poor. Others said that directions on running prisons should be left to the executive.',
  parts: [
    child('a', short({ t: 2, d: 2, c: 'recall', marks: 1, stem: 'What name is given to a case of this kind, brought for the benefit of others?', model: '**Public interest litigation**.', sol: 'A case brought on behalf of those who cannot approach the court.', scheme: [['Public interest litigation', 1]] })),
    child('b', short({ t: 2, d: 3, c: 'application', marks: 1, stem: 'Which rule has been relaxed so that Nandini Rao, who is not a prisoner, could approach the Court?', model: '**Locus standi**.', sol: 'The rule of who may approach the court.', scheme: [['Locus standi', 1]] })),
    child('c', short({ t: 2, d: 4, c: 'analysis', marks: 2, stem: '**Either** (i): How does the report show that public interest litigation can widen access to justice?', model: 'The prisoners could not themselves reach the court, but a **concerned person approached it on their behalf**, and the Court treated a **postcard as a petition**. The case therefore brought the **rights of poor prisoners** before the Court.', sol: 'A person acting for others, and a letter as a petition.', scheme: [['A concerned person approached the Court for those who could not', 1], ['A postcard treated as a petition; attention to the rights of the poor', 1]] }), [
      short({ t: 2, d: 4, c: 'evaluation', marks: 2, stem: '**Or** (ii): State the two views mentioned in the last two sentences of the report on the role of the Court.', model: 'Some **welcomed the order** as protecting the **rights of the poor**. Others argued that directions on running prisons **belong to the executive**, which reflects the concern about **judicial overreach**.', sol: 'The two views, each with its reason.', scheme: [['The view that the order protects the rights of the poor', 1], ['The view that such directions belong to the executive', 1]] }),
    ]),
  ],
}));
Q('c_dispute', caseQ({
  t: 2, d: 4, c: 'application', origin: 'soyl-original',
  stem: 'Read the briefing note and answer the questions that follow. *(An imagined note written by SOYL for practice; the states, the department and the people are not real.)*',
  passage: '**From an imagined briefing note of the Law Department of the state of Karnavar**\n\nKarnavar says that the neighbouring state of Tilmora owes it a large sum under an agreement on a jointly run power plant. Talks between the two governments have failed, and Karnavar\'s legal advisers are considering moving the Supreme Court. Separately, Devika, a shopkeeper in Karnavar, found her shop sealed by an order of the district administration issued without any notice. She says that her Fundamental Right to carry on her trade has been violated, and wants to go to court quickly.',
  parts: [
    child('a', short({ t: 2, d: 3, c: 'application', marks: 1, stem: 'Under which jurisdiction would the Supreme Court hear the dispute between Karnavar and Tilmora?', model: '**Original jurisdiction** (Article 131).', sol: 'A dispute between states begins in the Supreme Court.', scheme: [['Original jurisdiction', 1]] })),
    child('b', short({ t: 2, d: 3, c: 'application', marks: 1, stem: 'Under which Article can Devika approach the Supreme Court directly for her Fundamental Right?', model: '**Article 32**.', sol: 'Article 32 provides for the enforcement of Fundamental Rights.', scheme: [['Article 32', 1]] })),
    child('c', short({ t: 2, d: 4, c: 'application', marks: 2, stem: '**Either** (i): Can Devika go to the High Court of Karnavar instead? Name the Article and say how its power is wider.', model: 'Yes. A High Court can issue writs under **Article 226**. Its power is **wider** than that of the Supreme Court under Article 32, because it covers **Fundamental Rights and other legal rights**.', sol: 'Article 226 and its wider scope.', scheme: [['Yes: Article 226', 1], ['Covers Fundamental Rights and other legal rights', 1]] }), [
      short({ t: 2, d: 4, c: 'analysis', marks: 2, stem: '**Or** (ii): Why is it appropriate that a dispute between two states is heard directly by the Supreme Court and not by a court of one of the states?', model: 'A court of one state could be **seen as partial** to its own state. The Supreme Court, as the **highest court of the Union**, is a **neutral forum** for a dispute between governments, and it can interpret the Constitution authoritatively.', sol: 'Neutrality and the Court\'s position.', scheme: [['A court of one state could appear partial', 1], ['The Supreme Court is the neutral highest court for such disputes', 1]] }),
    ]),
  ],
}));
Q('c_letter', caseQ({
  t: 1, d: 4, c: 'evaluation', origin: 'soyl-original',
  stem: 'Read the classroom discussion and answer the questions that follow. *(An imagined discussion written by SOYL for practice; the school and the students are not real.)*',
  passage: '**Imagined discussion in Class 11 at Harbourview School**\n\nKabir: Judges must be independent, so nobody should be able to question them in any way.\n\nSalma: Independence is freedom from interference when deciding cases. Judges still give reasons in open court, are bound by the Constitution, and can be removed for proved misbehaviour or incapacity.\n\nTeacher: Think also about how judges are chosen, which people debate.',
  parts: [
    child('a', short({ t: 1, d: 2, c: 'understanding', marks: 1, stem: 'Whose view is closer to the meaning of the independence of the judiciary? Name the student.', model: '**Salma**: independence means freedom from interference, not freedom from accountability.', sol: 'Independence does not mean absence of accountability.', scheme: [['Salma', 1]] })),
    child('b', short({ t: 1, d: 2, c: 'recall', marks: 1, stem: 'By whom can a judge of the Supreme Court be removed?', model: '**Parliament**, by a special majority in both Houses.', sol: 'Removal only by Parliament.', scheme: [['Parliament', 1]] })),
    child('c', short({ t: 1, d: 4, c: 'evaluation', marks: 2, stem: '**Either** (i): Why is it important that the removal of a judge needs a special majority in both Houses?', model: 'A **special majority** makes removal **very difficult**, so a government or party cannot dismiss a judge for **unwelcome rulings**. This **protects independence**, while removal remains possible for **proved misbehaviour or incapacity**.', sol: 'The difficulty of removal protects independence.', scheme: [['Removal is very difficult, so judges are safe from pressure over rulings', 1], ['Accountability remains for proved misbehaviour or incapacity', 1]] }), [
      short({ t: 1, d: 4, c: 'analysis', marks: 2, stem: '**Or** (ii): Give one argument on each side of the debate on how judges are chosen.', model: 'Some argue that the **collegium keeps appointments free from pressure** by the executive. Others argue that a **wider and more accountable body** should take part, so that the process is more open.', sol: 'One argument on each side.', scheme: [['An argument for the collegium', 1], ['An argument for a wider body', 1]] }),
    ]),
  ],
}));
Q('c_ladder', caseQ({
  t: 1, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the case log and answer the questions that follow. *(An imagined log written by SOYL for practice; the case, the courts and the people are not real.)*',
  passage: '**Imagined case log of Farida against the State of Varunadesh**\n\n- 2019: The district court at Sarwal dismisses her claim.\n- 2020: The High Court of Varunadesh hears her appeal and partly allows it.\n- 2022: The Supreme Court grants special leave to appeal and decides a point of law in her case.\n- 2023: A district court in the imagined state of Tilmora meets the same point of law in another case.',
  parts: [
    child('a', short({ t: 1, d: 2, c: 'recall', marks: 1, stem: 'Which is the highest court in the log?', model: 'The **Supreme Court**.', sol: 'The Supreme Court is at the top.', scheme: [['Supreme Court', 1]] })),
    child('b', short({ t: 2, d: 3, c: 'application', marks: 1, stem: 'Under which Article can the Supreme Court grant special leave to appeal?', model: '**Article 136**.', sol: 'Special leave to appeal.', scheme: [['Article 136', 1]] })),
    child('c', short({ t: 1, d: 3, c: 'application', marks: 2, stem: '**Either** (i): What is the effect of the Supreme Court\'s decision on the district court in Tilmora? Name the Article.', model: 'The decision is **binding on all courts** under **Article 141**, so the Tilmora district court must **follow the Supreme Court\'s ruling** on that point of law.', sol: 'Binding effect and Article 141.', scheme: [['Binding on all courts, Article 141', 1], ['The district court must follow it', 1]] }), [
      short({ t: 1, d: 3, c: 'understanding', marks: 2, stem: '**Or** (ii): Explain how the log shows that the Indian judiciary is integrated.', model: 'The case moves from a **district court** to the **High Court** and then to the **Supreme Court**, which shows **one hierarchy** with appeals going upward, and the Supreme Court\'s decision then binds courts **across the states**.', sol: 'One hierarchy with appeals.', scheme: [['The case moves through district court, High Court and Supreme Court', 1], ['One hierarchy, with the top court\'s decision binding the others', 1]] }),
    ]),
  ],
}));
