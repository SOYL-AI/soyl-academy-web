// CBSE 11 Political Science, ch07 Federalism: question bank. Every passage (newspaper report, briefing note, letter,
// classroom debate) is written by SOYL and labelled as imagined; the federation Kestria, the unitary country Orlandia,
// the states Merivan, Sundara, Kandara and Halvari, the river Sarpini, the towns, officials and people in scenarios are
// imagined. No NCERT text, boxed source, cartoon, Constitution text, speech, court judgment or board/sample-paper item is
// reused (D-036). Articles are cited by number with a paraphrase of what they provide. No present-day dispute is described.
import { Q, mcq, ar, tf, fb, match, ord, short, long, caseQ, child } from '../../cbse-11-political-science-ch01/src/lib.mjs';

const S2 = [30, 50];
const S3 = [50, 80];
const L5 = [80, 120];

// ================================================================ t01 Federalism in the Indian Constitution
Q('m_fed_def', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Which description best defines federalism as a system of government?',
  opts: ['Two or more levels of government, each with powers given to it by a written and supreme constitution', 'A system in which one central government holds every power and gives some to local bodies at its pleasure', 'A system in which only the army governs the regions of a country', 'A system in which each region is a separate country with its own foreign policy'],
  sol: 'Federalism divides power between at least two levels of government, and the division is fixed by a constitution that neither level can ignore. The second option describes a unitary system, and the last two describe military rule and a loose group of independent countries.',
}));
Q('m_feature_app', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'The constitution of the imagined country Kestria lists the powers of its national government, its provincial governments and its municipal councils. It can be changed only with the consent of most provinces, and a constitutional court settles disputes about powers. Which conclusion is correct?',
  opts: ['Kestria is a federation with three levels, a supreme written constitution and a judiciary that acts as umpire', 'Kestria is a unitary state, because it has a national government', 'Kestria is a federation only if its provinces have their own armies', 'Kestria cannot be a federation because it has municipal councils'],
  sol: 'Powers fixed by a constitution, a difficult amendment procedure that involves the provinces, and a court acting as umpire are the marks of a federation, and a federation may have more than two levels. A national government exists in every federation, armies of the provinces are not a test, and municipal councils do not rule out federalism.',
}));
Q('m_unitary_app', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'In the imagined country Orlandia, the national legislature may, by an ordinary law, abolish any regional council, redraw its area or take back any task it has handed over. Orlandia is best described as',
  opts: ['a unitary system, since regional bodies exist only at the pleasure of the national government', 'a federation, since it has regional councils', 'a federation, since the national legislature passes ordinary laws', 'a confederation of sovereign regions'],
  sol: 'When the centre alone decides whether regional bodies exist and what they do, the system is unitary even though regional councils are present. Having regional bodies does not make a federation, ordinary law-making is not a test, and a confederation would need sovereign regions.',
}));
Q('m_union_name', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Article 1 describes India as a Union of States. One idea usually taught from this description is that',
  opts: ['the Union is not the result of an agreement among states, so no state has a right to leave it', 'each state joined by a treaty and may withdraw by a vote of its legislature', 'the states created the Union and can dissolve it together', 'the word Union means that there are no states at all'],
  sol: 'The Union was not formed by a bargain among states, and no state has a right to separate from it. The treaty and dissolution options describe a confederation, and the last option contradicts the word States in the name.',
}));
Q('m_list_union', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Which of the following subjects is in the Union List of the Seventh Schedule?',
  opts: ['Railways', 'Police', 'Agriculture', 'Public health'],
  sol: 'Railways is a Union subject, alongside defence, foreign affairs, banking and currency. Police, agriculture and public health are State List subjects.',
}));
Q('m_list_state_app', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'The government of the imagined state of Kandara wants to pass a law on how its district hospitals and public clinics will be run. Which list of the Seventh Schedule covers this subject, and which government can ordinarily make the law?',
  opts: ['The State List, so the Kandara legislature can ordinarily make the law', 'The Union List, so only Parliament can make it', 'The State List, so only Parliament can make it', 'No list, so the law cannot be made at all'],
  sol: 'Public health is in the State List, which the state legislature ordinarily controls. It is not a Union subject, Parliament does not have the ordinary power over a State List subject, and a subject that is in a list is not left without a lawmaker.',
}));
Q('m_concurrent', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'Which of these subjects is in the Concurrent List, so that both Parliament and state legislatures can make laws on it?',
  opts: ['Education', 'Defence', 'Currency', 'Foreign affairs'],
  sol: 'Education is a Concurrent List subject, along with forests, marriage and trade unions. Defence, currency and foreign affairs belong to the Union List alone.',
}));
Q('m_conflict_app', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'On a subject in the Concurrent List, Parliament passes a law saying that school records must be kept for ten years, while the legislature of the imagined state of Halvari passes a law saying five years. The two cannot both be followed. What is the position?',
  opts: ['The law of Parliament prevails over the conflicting state law', 'The Halvari law prevails because it is closer to the schools', 'Both laws are void and the subject returns to the State List', 'The Governor of Halvari chooses which law to follow'],
  sol: 'In a conflict on a Concurrent List subject, the Union law prevails. The nearer law has no priority, neither law is void merely because of the clash, and the Governor has no power to choose between laws.',
}));
Q('m_residuary', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'A new technology called the sky-tram is invented in imagined Halvari, and no entry in any of the three lists covers it. Under Article 248, who has the power to make laws on it?',
  opts: ['Parliament, since residuary powers lie with the Union', 'The legislature of the state where the technology is used', 'Every state legislature equally', 'The Supreme Court, by issuing a notice'],
  sol: 'Residuary powers, those on subjects not mentioned in any list, lie with the Union, so Parliament can legislate. They are not left to the states, the states do not share them equally, and the Supreme Court interprets laws and does not make them.',
}));
Q('m_strong_why', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Which pair of reasons is commonly given for giving India a federation with a strong central government?',
  opts: ['Unity and security after Partition, and the need for planned development', 'Wishing to weaken the states and to avoid elections', 'Copying a foreign constitution word for word and avoiding all debate', 'A wish to reduce the powers of the courts'],
  sol: 'The commonly taught reasons are the need to protect unity and security after Partition and to plan development for a large and diverse country. The other options do not describe the reasons commonly given.',
}));
Q('m_art3_app', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'Parliament introduces a bill to change the name of the imagined state of Kandara. The Kandara legislature sends its views, which oppose the change. What is the position under Article 3?',
  opts: ['Parliament may still pass the bill by an ordinary law, as the views of the state legislature are asked for but are not binding', 'The bill cannot be passed without the consent of the Kandara legislature', 'The bill needs a constitutional amendment passed by every state', 'The bill must be decided by the Supreme Court'],
  sol: 'Under Article 3, the President refers such a bill to the state legislature for its views, but Parliament is not bound by them and can pass the bill by ordinary law. A binding consent, a constitutional amendment by every state, or a decision of the Court is not required.',
}));
Q('m_emerg', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'Which pair correctly matches the Article with its subject?',
  opts: ['Article 352 with national emergency, and Article 356 with President\'s Rule in a state', 'Article 352 with President\'s Rule, and Article 356 with national emergency', 'Article 352 with the Finance Commission, and Article 356 with the Governor', 'Article 352 with residuary powers, and Article 356 with the Planning Commission'],
  sol: 'Article 352 deals with a national emergency and Article 356 with President\'s Rule in a state. The second option swaps them, the Finance Commission is under Article 280 and residuary powers under Article 248, so the last two options pair the wrong subjects.',
}));
Q('m_gov_app', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'The legislature of the imagined state of Kandara passes a bill, and the Governor, instead of giving assent, reserves it for the consideration of the President. This power is cited as an example of',
  opts: ['a centralising feature, since the Governor is appointed by the President', 'a feature that proves India is a confederation', 'judicial review of a state law', 'the working of the Finance Commission'],
  sol: 'The Governor is appointed by the President, and the power to reserve a state bill for the President is listed among the features that favour the centre. It does not make India a confederation, it is not judicial review by a court, and the Finance Commission deals with tax sharing.',
}));
Q('m_249_app', mcq({
  t: 1, d: 4, c: 'application',
  stem: 'An imagined shortage of a farm input spreads across the country, and agriculture is a State List subject. The Rajya Sabha passes a resolution, supported by two thirds of its members present and voting, saying that Parliament should legislate on it in the national interest. What does Article 249 then allow?',
  opts: ['Parliament may make a law on that State List subject for a limited period', 'State legislatures lose their State List for ever', 'The Governors of all states may make a joint law', 'The Lok Sabha may amend the Seventh Schedule by itself'],
  sol: 'Article 249 lets Parliament legislate on a State List subject, for a limited period, after such a Rajya Sabha resolution. It does not abolish the State List permanently, give law-making power to Governors, or allow the Lok Sabha alone to amend the Schedule.',
}));
Q('m_fincom', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'The Finance Commission, provided for by Article 280, is constituted by the President usually after every',
  opts: ['five years, to recommend how taxes are shared between the Union and the states', 'one year, to choose the Governors', 'ten years, to count the population', 'twenty years, to redraw state boundaries'],
  sol: 'The Finance Commission is constituted every five years to recommend the sharing of taxes and related grants. It does not choose Governors, count the population, or redraw boundaries.',
}));
Q('m_gst', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'The Goods and Services Tax was made possible by the 101st Amendment, passed in 2016, and it came into use from',
  opts: ['2017', '1950', '2000', '2014'],
  sol: 'The Goods and Services Tax began in 2017. The year 1950 is that of the Constitution coming into force, 2000 is when three new states were formed, and 2014 is when Telangana was formed.',
}));
Q('m_niti', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'A body that had drawn up the five year plans of the country since the early years of the Republic was replaced in 2015 by',
  opts: ['NITI Aayog', 'the Finance Commission', 'the Election Commission', 'the Inter-State Council'],
  sol: 'NITI Aayog replaced the Planning Commission in 2015. The Finance Commission, the Election Commission and the Inter-State Council are different bodies that continued with their own tasks.',
}));
Q('m_coop_app', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'Ministers of finance from the Union and from every state sit together in a council, and decide tax rates for goods and services by discussion and agreed voting rules. This is generally cited as an example of',
  opts: ['cooperative federalism', 'unitary government', 'emergency rule', 'a presidential veto'],
  sol: 'A forum in which both levels decide together on a shared matter shows cooperative federalism, as the Goods and Services Tax Council does. It is not unitary rule, an emergency, or a veto.',
}));
Q('m_ais', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'An officer of an All India Service is posted to the imagined state of Merivan, works under its government, and yet is recruited and governed by rules of the Union. Why is this arrangement counted among the features that favour the centre?',
  opts: ['Because a common cadre of officers recruited by the Union works in the states, which draws the administration together', 'Because the officers are chosen by each state legislature', 'Because the officers work only for the Union and never for a state', 'Because the officers decide disputes between states'],
  sol: 'All India Services are common to the Union and the states: the Union recruits and regulates them, and they serve in the states, which adds to the unity of administration. State legislatures do not choose them, they do serve in states, and deciding disputes is the work of courts and tribunals.',
}));

// ---------------------------------------------------------------- t02 Conflicts and special provisions
Q('m_autonomy_app', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'The government of the imagined state of Sundara says that it wants a larger share of the tax revenue, less interference by the Union in its programmes, and freedom to set its own priorities. Which term best describes this kind of demand in centre-state relations?',
  opts: ['A demand for greater state autonomy', 'A demand for a national emergency', 'A demand for the abolition of the Supreme Court', 'A demand for a unitary system'],
  sol: 'A wish for more revenue, less interference and own priorities is a demand for greater autonomy within the federation. It does not call for an emergency, for abolishing the Court, or for a unitary system, which would reduce state powers.',
}));
Q('m_356', mcq({
  t: 2, d: 2, c: 'recall',
  stem: 'President\'s Rule under Article 356 means that',
  opts: ['the executive power of a state is taken over by the Union when the constitutional machinery in the state is held to have failed', 'the President becomes the Chief Justice of the state', 'the state legislature is permanently abolished', 'all elections in the country are postponed'],
  sol: 'President\'s Rule places the executive power of a state with the Union, acting through the Governor, when the constitutional machinery of the state is held to have failed. It does not make the President a judge, abolish the legislature permanently, or postpone every election.',
}));
Q('m_bommai', mcq({
  t: 2, d: 3, c: 'understanding',
  stem: 'The S. R. Bommai case (1994) is mainly remembered in connection with',
  opts: ['limits on the use of President\'s Rule, including a floor test and judicial review of the proclamation', 'the creation of the Finance Commission', 'the introduction of the Goods and Services Tax', 'the reorganisation of states on linguistic lines'],
  sol: 'The case laid down limits on President\'s Rule: the strength of a government should be tested on the floor of the House, and a proclamation can be reviewed by the courts. The Finance Commission, the Goods and Services Tax and linguistic reorganisation are not its subjects.',
}));
Q('m_bommai_app', mcq({
  t: 2, d: 4, c: 'application',
  stem: 'In an imagined situation, the Union proclaims President\'s Rule in the state of Merivan on a report that the ministry has lost its majority, but no vote was taken in the Assembly. In the light of the limits associated with the S. R. Bommai case, which point is most relevant?',
  opts: ['A floor test can be used to find whether the ministry has a majority, and the proclamation is open to judicial review', 'The proclamation cannot be questioned in any court', 'The Governor alone may decide that the ministry has lost its majority', 'The matter is for the Finance Commission'],
  sol: 'The limits include testing a majority on the floor of the House, and the courts can examine whether a proclamation is justified. The proclamation is not beyond review, the Governor alone does not settle a majority, and the Finance Commission has no role.',
}));
Q('m_sra', mcq({
  t: 2, d: 2, c: 'recall',
  stem: 'The States Reorganisation Act of 1956 redrew the map of the states largely on the basis of',
  opts: ['language', 'income', 'religion', 'the size of the population of towns'],
  sol: 'The 1956 reorganisation was largely on linguistic lines. Income, religion and town populations were not its main basis.',
}));
Q('m_new2000', mcq({
  t: 2, d: 2, c: 'recall',
  stem: 'Which three states were formed in the year 2000?',
  opts: ['Chhattisgarh, Uttarakhand and Jharkhand', 'Telangana, Chhattisgarh and Uttarakhand', 'Jharkhand, Telangana and Uttarakhand', 'Chhattisgarh, Jharkhand and Telangana'],
  sol: 'Chhattisgarh, Uttarakhand and Jharkhand were formed in 2000. Telangana was formed later, in 2014, so every other option wrongly includes it.',
}));
Q('m_telangana', mcq({
  t: 2, d: 2, c: 'recall',
  stem: 'Telangana was formed as a new state under Article 3 in the year',
  opts: ['2014', '2000', '1956', '2019'],
  sol: 'Telangana was formed in 2014. The year 2000 saw three other states, 1956 was the general reorganisation, and 2019 is the year of the change in Jammu and Kashmir, which created Union Territories and not a state.',
}));
Q('m_river_app', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'The imagined states of Merivan and Sundara dispute how the water of the river Sarpini is to be shared. Talks have failed. Which step is provided under the Inter-State River Water Disputes Act of 1956?',
  opts: ['At the request of a state, the Union government can refer the dispute to a tribunal for adjudication', 'Each state keeps the water that reaches it first', 'The dispute is decided by the Lok Sabha Speaker', 'The dispute is decided by a vote of all the Governors'],
  sol: 'Under the 1956 Act, a state can ask the Union government to refer a river-water dispute to a tribunal when talks fail. First-come possession, a decision by the Speaker, and a vote of Governors are not part of the Act.',
}));
Q('m_boundary_app', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'Two imagined states, Kandara and Halvari, disagree about where their common border runs. Which of the following is NOT a means by which such a dispute can be settled?',
  opts: ['A decision by a single minister of one of the two states', 'Negotiation between the two governments', 'A law of Parliament under Article 3', 'A suit in the Supreme Court under its original jurisdiction'],
  sol: 'A decision by the minister of one party would not be neutral and has no standing as a settlement. Negotiation, a law of Parliament altering boundaries, and an original suit between states in the Supreme Court are all recognised means.',
}));
Q('m_asym_app', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'The Constitution gives several states special provisions, for example by Article 371 and related Articles, to protect their particular needs, while other states do not have them. Political scientists call this arrangement',
  opts: ['asymmetric federalism', 'a unitary system', 'a presidential system', 'confederation'],
  sol: 'When states are not all treated in exactly the same way, because some have special provisions, the arrangement is called asymmetric federalism. It is not unitary, presidential or confederal.',
}));
Q('m_370', mcq({
  t: 2, d: 3, c: 'recall',
  stem: 'As of 2024, which factual statement about Article 370 is correct?',
  opts: ['Its provisions were changed in 2019 and Jammu and Kashmir was reorganised into two Union Territories; the Supreme Court upheld the change in December 2023', 'It was changed in 1956 and created three Union Territories', 'It was changed in 2000 together with the creation of Chhattisgarh', 'It was never mentioned in any court'],
  sol: 'The dated facts are the change of 2019, the reorganisation into two Union Territories and the Supreme Court decision of December 2023. The other options give wrong years or wrong facts.',
}));
Q('m_views', mcq({
  t: 2, d: 4, c: 'evaluation',
  stem: 'A student is asked to give a balanced view on whether the centre in India is too strong. Which answer is balanced?',
  opts: ['Some argue that the centre is too strong and leaves the states with too little room; others argue that a strong centre is needed for unity and common standards', 'The centre is too strong and no argument can be made for it', 'The centre is not strong at all, so there is nothing to discuss', 'The question has no answer, so it should not be asked'],
  sol: 'A balanced answer states the reasons of both sides and leaves room to weigh them. The other options take one side without reasons, deny the facts, or refuse the question.',
}));
Q('m_accom', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'Which of the following is commonly given as a way in which federalism has helped India to accommodate diversity?',
  opts: ['Linguistic reorganisation and special provisions for particular states have given regions recognised space within one Union', 'The abolition of every regional language', 'A rule that all states must have identical laws', 'The removal of the states from the Constitution'],
  sol: 'Reorganising states on linguistic lines and making special provisions for some states are commonly cited as ways of giving diverse regions a place in the Union. The other options would remove diversity, which is the opposite of accommodation.',
}));

// ---------------------------------------------------------------- assertion-reason
Q('ar_umpire', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'In a federation, disputes about the division of powers are settled by an independent judiciary.',
  r: 'Neither level of government should be the judge of its own powers.',
  sol: 'Both are true, and R explains A: a court outside both levels is needed as umpire because neither level can fairly decide the limits of its own powers.',
}));
Q('ar_resid', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'both-true-not-explains',
  a: 'Residuary powers in India lie with the Union under Article 248.',
  r: 'The Finance Commission is constituted every five years under Article 280.',
  sol: 'Both statements are true, but R does not explain A: residuary powers lie with the Union because of how the Constitution distributes legislative subjects, whereas the Finance Commission is a separate body for sharing taxes.',
}));
Q('ar_art3', ar({
  t: 1, d: 3, c: 'understanding', verdict: 'A-true-R-false',
  a: 'Parliament can, by law, form new states and alter the boundaries and names of existing states.',
  r: 'A state legislature must give its consent before Parliament can pass such a law, and the consent is binding.',
  sol: 'A is true under Article 3. R is false: the views of the state legislature are asked for, but they are not binding on Parliament.',
}));
Q('ar_bommai', ar({
  t: 2, d: 4, c: 'analysis', verdict: 'A-false-R-true',
  a: 'After the S. R. Bommai case (1994), a proclamation of President\'s Rule in a state cannot be reviewed by any court.',
  r: 'The Court held that the use of President\'s Rule is open to judicial review and that a floor test should be used to test a ministry\'s majority.',
  sol: 'A is false because the proclamation can be reviewed. R is true and states the limits associated with the case, which contradict A.',
}));
Q('ar_asym', ar({
  t: 2, d: 3, c: 'application', verdict: 'both-true-explains',
  a: 'Some states have special constitutional provisions under Article 371 and related Articles.',
  r: 'Regions with particular histories and needs may require arrangements that differ from those of other states.',
  sol: 'Both are true, and R explains A: the special provisions exist to meet the particular needs of those regions, which is the idea of asymmetric federalism.',
}));
Q('ar_gst', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'both-true-not-explains',
  a: 'The Goods and Services Tax Council is an example of cooperative federalism.',
  r: 'The Goods and Services Tax began in 2017.',
  sol: 'Both are true, but R does not explain A: the Council is an example of cooperation because the Union and the states decide together, and the year the tax began says nothing about that.',
}));

// ---------------------------------------------------------------- true-false, fill in the blank, match, ordering
Q('tf_secede', tf({
  t: 1, d: 2, c: 'understanding', ans: false,
  stem: 'Under the idea of a Union of States in Article 1, a state in India has a right to leave the Union if its legislature so decides.',
  sol: 'The Union is not the result of an agreement among states, and no state has a right to leave it.',
}));
Q('tf_conc', tf({
  t: 1, d: 2, c: 'understanding', ans: true,
  stem: 'On a subject in the Concurrent List, both Parliament and a state legislature can make laws, and the Union law prevails if the two conflict.',
  sol: 'This is the rule for the Concurrent List: both can legislate, but in a conflict the Union law prevails.',
}));
Q('tf_planning', tf({
  t: 1, d: 2, c: 'recall', ans: true,
  stem: 'NITI Aayog was set up in 2015 and replaced the Planning Commission.',
  sol: 'The Planning Commission was replaced by NITI Aayog in 2015.',
}));
Q('fb_248', fb({
  t: 1, d: 2, c: 'recall',
  stem: 'Under Article ___, residuary powers, those on subjects in none of the three lists, lie with the Union.',
  acc: [['248', 'two hundred and forty-eight', 'two hundred and forty eight']],
  sol: 'Article 248 gives residuary powers of legislation to the Union.',
}));
Q('fb_gst', fb({
  t: 1, d: 2, c: 'recall',
  stem: 'The Goods and Services Tax began to be collected in the year ___.',
  acc: [['2017', 'twenty seventeen', 'two thousand seventeen', 'two thousand and seventeen']],
  sol: 'The 101st Amendment was passed in 2016 and the tax came into use in 2017.',
}));
Q('fb_tel', fb({
  t: 2, d: 2, c: 'recall',
  stem: 'The state of Telangana was formed in the year ___.',
  acc: [['2014', 'two thousand fourteen', 'two thousand and fourteen']],
  sol: 'Telangana was formed in 2014, under Article 3.',
}));
Q('mt_lists', match({
  t: 1, d: 2, c: 'application', marks: 2,
  stem: 'Match each subject with the list of the Seventh Schedule in which it appears.',
  pairs: [
    ['Currency', 'Union List'],
    ['Police', 'State List'],
    ['Education', 'Concurrent List'],
    ['A subject in no list', 'Residuary power of the Union'],
  ],
  sol: 'Currency is a Union subject, police a State subject, education a Concurrent subject, and a subject in no list falls under the residuary powers of the Union.',
}));
Q('mt_events', match({
  t: 2, d: 2, c: 'recall', marks: 2,
  stem: 'Match each event with its year.',
  pairs: [
    ['States Reorganisation Act', '1956'],
    ['Chhattisgarh, Uttarakhand and Jharkhand formed', '2000'],
    ['Telangana formed', '2014'],
    ['Goods and Services Tax begins', '2017'],
  ],
  sol: 'The Act is of 1956, the three new states were formed in 2000, Telangana in 2014 and the Goods and Services Tax began in 2017.',
}));
Q('ord_time', ord({
  t: 2, d: 2, c: 'understanding', marks: 2,
  stem: 'Arrange these landmarks of Indian federalism from the earliest to the most recent.',
  items: [
    'The Constitution comes into force',
    'The States Reorganisation Act is passed',
    'Three new states are formed in one year',
    'The Goods and Services Tax begins',
  ],
  sol: 'The Constitution came into force in 1950, the Act followed in 1956, the three states were formed in 2000 and the tax began in 2017.',
}));
Q('ord_river', ord({
  t: 2, d: 3, c: 'application', marks: 2,
  stem: 'Arrange these steps in the order in which they would ordinarily happen in an imagined river-water dispute between two states.',
  items: [
    'The two states disagree on the sharing of the river water',
    'Talks between the governments fail to settle the matter',
    'At a state\'s request, the Union government refers the dispute to a tribunal',
    'The tribunal gives its award after hearing both sides',
  ],
  sol: 'A disagreement comes first, then failed talks, then the reference to a tribunal, and finally the award.',
}));

// ================================================================ short answers (2 marks)
Q('s_fed', short({
  t: 1, d: 1, c: 'recall', marks: 2, wl: S2,
  stem: 'Define federalism and name any one federation other than India.',
  model: 'In **federalism**, government works at **two or more levels**, and a **written, supreme constitution** gives each level its own powers. The **United States** is one federation; Canada and Australia are others.',
  sol: 'The definition and an example.',
  scheme: [['Two or more levels, with powers fixed by the constitution', 1], ['A correct example', 1]],
}));
Q('s_unitary', short({
  t: 1, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'How does a unitary system differ from a federation? Use the example of the imagined country Orlandia, whose national legislature can abolish regional councils by ordinary law.',
  model: 'In a **unitary system** such as Orlandia, power rests with the **central government**, and regional bodies exist at its pleasure. In a **federation** the constitution divides powers between levels, and neither level can take away the powers of the other by ordinary law.',
  sol: 'The contrast, applied to the example.',
  scheme: [['Unitary: power with the centre, regional bodies at its pleasure', 1], ['Federation: constitution divides powers; one level cannot remove the other by ordinary law', 1]],
}));
Q('s_conc', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'What is the Concurrent List? Which law prevails if a Union law and a state law on a subject in it conflict?',
  model: 'The **Concurrent List** contains subjects, such as **education, forests, marriage and trade unions**, on which **both Parliament and state legislatures can make laws**. In a conflict, the **Union law prevails**.',
  sol: 'The list, with examples, and the rule on conflict.',
  scheme: [['Subjects on which both Parliament and states can legislate, with an example', 1], ['The Union law prevails in a conflict', 1]],
}));
Q('s_resid', short({
  t: 1, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'The imagined ministry of the state of Kandara claims the right to legislate on the sky-tram, a technology that is mentioned in none of the three lists. Who has the power, and under which Article?',
  model: 'The power lies with **Parliament**, because **residuary powers**, those on subjects not mentioned in any of the three lists, are given to the **Union** under **Article 248**. The claim of the Kandara ministry therefore does not hold.',
  sol: 'Article 248 applied to the claim.',
  scheme: [['Residuary powers lie with the Union under Article 248', 1], ['So Parliament and not the state can legislate on the new subject', 1]],
}));
Q('s_union', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'What does the description of India as a Union of States in Article 1 imply for the position of the states?',
  model: 'It implies that the **Union is not the result of an agreement among the states**, so **no state has a right to separate** from it. The states have their own governments and powers, but they are parts of one nation.',
  sol: 'No right to leave, and states as parts of the Union.',
  scheme: [['The Union is not a result of an agreement among states', 1], ['No state may leave; states are parts of one nation with their own powers', 1]],
}));
Q('s_art3', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State two powers of Parliament under Article 3 and say whether the views of the state legislature concerned bind it.',
  model: 'Under **Article 3**, Parliament can **form new states** and **alter the boundaries or names** of existing states by law. The **views of the state legislature are sought**, but they are **not binding** on Parliament.',
  sol: 'Powers under Article 3 and the role of the state legislature.',
  scheme: [['Forming new states and altering boundaries or names', 1], ['The state legislature gives views that do not bind Parliament', 1]],
}));
Q('s_gov', short({
  t: 1, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'Why is the power of the Governor of an imagined state to reserve a bill for the President listed among the features that favour the centre?',
  model: 'The **Governor is appointed by the President**, and can **reserve a bill passed by the state legislature** for the President\'s consideration. A state bill can thus **depend on the Union\'s decision**, which shows the strength of the centre.',
  sol: 'Appointment by the President, and the reservation of bills.',
  scheme: [['The Governor is appointed by the President', 1], ['A state bill can be reserved for the President, so the Union can decide its fate', 1]],
}));
Q('s_fincom', short({
  t: 1, d: 2, c: 'recall', marks: 2, wl: S2,
  stem: 'What is the Finance Commission? State two things about it.',
  model: 'The **Finance Commission**, provided for in **Article 280**, is constituted by the President **every five years**. It **recommends how the proceeds of taxes should be shared** between the Union and the states and how grants should be given to states.',
  sol: 'The Article, the period and the task.',
  scheme: [['Constituted every five years under Article 280', 1], ['Recommends the sharing of taxes between the Union and the states', 1]],
}));
Q('s_bommai', short({
  t: 2, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: 'Name the case of 1994 that laid down limits on the use of President\'s Rule and state two such limits.',
  model: 'The case is **S. R. Bommai (1994)**. It held that a ministry\'s majority should be tested by a **floor test** in the House, and that a proclamation of President\'s Rule is open to **judicial review** by the courts.',
  sol: 'The case, the floor test and judicial review.',
  scheme: [['S. R. Bommai case, 1994', 1], ['Floor test and judicial review of the proclamation', 1]],
}));
Q('s_river', short({
  t: 2, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'The imagined states of Merivan and Sundara cannot settle by talks how the water of the river Sarpini is to be shared. What can happen under the Inter-State River Water Disputes Act of 1956?',
  model: 'At the request of a state, the **Union government can refer the dispute to a tribunal** under the **Inter-State River Water Disputes Act of 1956**. The tribunal **hears both states** and gives an **award** to settle how the water is shared.',
  sol: 'The reference to a tribunal and the award.',
  scheme: [['Reference to a tribunal under the 1956 Act at a state\'s request', 1], ['Hearing and award that settles the sharing', 1]],
}));
Q('s_asym', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'What is asymmetric federalism? Give one constitutional example from India.',
  model: '**Asymmetric federalism** means that **not all units of a federation are treated alike**: some have special arrangements to meet their particular needs. In India, **Article 371 and related Articles** give special provisions to several states, for example in the North-East.',
  sol: 'The meaning and an example.',
  scheme: [['Units treated differently, with special arrangements for particular needs', 1], ['Article 371 and related Articles for several states', 1]],
}));

// ---------------------------------------------------------------- short answers (3 marks)
Q('s3_features', short({
  t: 1, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'State any three features of a federation, using the imagined country Kestria where you can.',
  model: '1. There are **two or more levels of government**, such as the national, provincial and municipal levels of Kestria.\n2. The **constitution is written and supreme**, and fixes the powers of each level.\n3. An **independent judiciary acts as umpire**, and changing the division of powers needs both levels or a special procedure.',
  sol: 'Three features, each stated.',
  scheme: [['Two or more levels of government', 1], ['Written and supreme constitution dividing powers', 1], ['Independent judiciary as umpire, with a difficult amendment of the division of powers', 1]],
}));
Q('s3_lists', short({
  t: 1, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Describe the three lists of the Seventh Schedule, giving one example of a subject in each.',
  model: '1. **Union List:** subjects for Parliament alone, such as **defence** or **currency**.\n2. **State List:** subjects for state legislatures, such as **police** or **agriculture**.\n3. **Concurrent List:** subjects on which **both can legislate**, such as **education**, with the **Union law prevailing** in a conflict.',
  sol: 'Three lists with examples.',
  scheme: [['Union List with an example', 1], ['State List with an example', 1], ['Concurrent List with an example and the rule on conflict', 1]],
}));
Q('s3_strong', short({
  t: 1, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Give two reasons commonly offered for a federation with a strong central government in India, and one question that critics raise about it.',
  model: 'The reasons commonly given are the need for **unity and security after Partition** and the need for **planned development** across a large and diverse country. **Some argue** that the centre has too much power and that states need more room to decide matters that concern them.',
  sol: 'Two reasons and a view of critics.',
  scheme: [['Unity and security after Partition', 1], ['Planned development', 1], ['A view of critics, stated as some argue', 1]],
}));
Q('s3_unitary_feat', short({
  t: 1, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Describe three features of the Indian Constitution that are called unitary or centralising.',
  model: '1. Under **Article 3**, Parliament can form new states and change boundaries and names.\n2. **Emergency provisions**: a national emergency (**Article 352**) and **President\'s Rule** in a state (**Article 356**).\n3. The **Governor** is appointed by the President and can reserve bills; there are also **All India Services** and the **financial dependence** of states on Union transfers.',
  sol: 'Three features with Articles.',
  scheme: [['Article 3: Parliament and state boundaries', 1], ['Emergency provisions, Articles 352 and 356', 1], ['Governor, All India Services or financial dependence', 1]],
}));
Q('s3_gstniti', short({
  t: 1, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain how the Goods and Services Tax Council and NITI Aayog reflect cooperative federalism.',
  model: 'The **Goods and Services Tax Council**, created after the **101st Amendment (2016)**, brings the Union and the states together to decide on a shared tax; the tax began in **2017**. **NITI Aayog**, set up in **2015** in place of the Planning Commission, is a forum where the Union and the states **work on development together**.',
  sol: 'Both bodies, with years.',
  scheme: [['Goods and Services Tax Council: Union and states decide together; 101st Amendment 2016', 1], ['The tax began in 2017', 1], ['NITI Aayog replaced the Planning Commission in 2015 as a forum for joint work', 1]],
}));
Q('s3_newstates', short({
  t: 2, d: 2, c: 'recall', marks: 3, wl: S3,
  stem: 'State three facts about the formation of new states in India after 1950.',
  model: '1. The **States Reorganisation Act of 1956** redrew state boundaries, **largely on linguistic lines**, after demands made in the years following 1950.\n2. In **2000**, three new states, **Chhattisgarh, Uttarakhand and Jharkhand**, were formed.\n3. **Telangana** was formed in **2014**. Each new state was formed by a law of Parliament under **Article 3**.',
  sol: 'Three facts with years.',
  scheme: [['States Reorganisation Act 1956, largely linguistic', 1], ['Three states in 2000', 1], ['Telangana in 2014; Article 3', 1]],
}));
Q('s3_disputes', short({
  t: 2, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'Describe two kinds of inter-state disputes and how each can be handled, using imagined states.',
  model: '1. A **boundary dispute**, such as imagined Kandara and Halvari disagreeing on a common border, can be settled by **negotiation**, by a law of Parliament under **Article 3**, or by the Supreme Court.\n2. A **river-water dispute**, such as Merivan and Sundara over the Sarpini, can go to a **tribunal** under the **Act of 1956**.',
  sol: 'Two kinds of dispute with means of settlement.',
  scheme: [['Boundary dispute described', 1], ['Means for a boundary dispute', 1], ['River-water dispute and tribunal under the 1956 Act', 1]],
}));
Q('s3_autonomy', short({
  t: 2, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Explain, in general terms, why some states have demanded more autonomy and why others stress a strong centre.',
  model: 'Some states have asked for a **larger share of revenue**, **less interference** and the right to **their own priorities**, because they say they know local needs best. Others point out that a **strong centre protects unity**, sets **common standards** and helps **poorer regions** through transfers. Students should weigh both views with reasons.',
  sol: 'Both views, in general terms.',
  scheme: [['Reasons for the demand for autonomy', 1], ['Reasons for a strong centre', 1], ['Both views are presented without taking sides', 1]],
}));

// ================================================================ long answers (5 marks)
Q('l_features', long({
  t: 1, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Explain the meaning and the main features of federalism, and contrast it with a unitary system.',
  model: '1. **Federalism** is a system with **two or more levels of government**, each with powers given by the constitution.\n2. The constitution is **written and supreme**.\n3. The division of powers can be changed only with both levels or by a **special procedure**.\n4. An **independent judiciary** acts as **umpire** in disputes about powers.\n5. In a **unitary system** the centre holds the power, and regional bodies depend on it.\n6. The United States, Canada and Australia are federations.',
  sol: 'Meaning, features, contrast and examples.',
  scheme: [['Meaning: two or more levels with constitutional powers', 1], ['Written and supreme constitution', 1], ['Difficult change of the division of powers', 1], ['Independent judiciary as umpire', 1], ['Contrast with a unitary system and examples', 1]],
}));
Q('l_lists', long({
  t: 1, d: 3, c: 'application', marks: 5, wl: L5,
  stem: 'Explain the division of powers between the Union and the states in the Seventh Schedule, with examples, and state the rules on conflict and on residuary powers.',
  model: '1. The **Seventh Schedule** divides subjects into three lists.\n2. The **Union List**, for Parliament, covers matters like defence, banking and railways.\n3. The **State List**, for state legislatures, covers matters like police, agriculture and public health.\n4. The **Concurrent List** covers education, forests, marriage and trade unions.\n5. On the Concurrent List, if a Union law and a state law conflict, the **Union law prevails**.\n6. **Residuary powers** lie with the **Union** (Article 248).',
  sol: 'Three lists with examples and two rules.',
  scheme: [['Union List with examples', 1], ['State List with examples', 1], ['Concurrent List with examples', 1], ['The Union law prevails in a conflict', 1], ['Residuary powers with the Union, Article 248', 1]],
}));
Q('l_strong', long({
  t: 1, d: 4, c: 'analysis', marks: 5, wl: L5,
  stem: 'Why is Indian federalism described as federalism with a strong centre? Give the reasons and the features of the Constitution that support this description.',
  model: '1. The reasons commonly given are **unity and security after Partition** and **planned development**.\n2. Under **Article 3**, Parliament can form states and change their boundaries and names.\n3. **Emergency provisions** include a national emergency (Article 352) and **President\'s Rule** (Article 356).\n4. The **Governor** is appointed by the President and can reserve bills.\n5. **All India Services**, Article 249 and the **financial dependence** of states also strengthen the centre.',
  sol: 'Reasons and unitary features.',
  scheme: [['Reasons: unity, security and planned development', 1], ['Article 3', 1], ['Emergency provisions and President\'s Rule', 1], ['Governor and reservation of bills', 1], ['All India Services, Article 249 or financial dependence', 1]],
}));
Q('l_fiscal', long({
  t: 1, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Explain fiscal federalism in India with reference to the Finance Commission, the Goods and Services Tax Council and NITI Aayog.',
  model: '1. **Fiscal federalism** concerns how money and taxes are shared between the Union and the states.\n2. The **Finance Commission** (**Article 280**) recommends the sharing of taxes, every **five years**.\n3. States depend on **Union transfers**, a centralising feature.\n4. The **Goods and Services Tax Council**, after the **101st Amendment (2016)**, decides a shared tax that began in **2017**, an example of **cooperative federalism**.\n5. **NITI Aayog** replaced the **Planning Commission** in **2015**.',
  sol: 'Meaning and three bodies with years.',
  scheme: [['Meaning of fiscal federalism', 1], ['Finance Commission, Article 280, five years', 1], ['Dependence of states on Union transfers', 1], ['Goods and Services Tax Council, 2016 and 2017, cooperative federalism', 1], ['NITI Aayog replaced the Planning Commission in 2015', 1]],
}));
Q('l_conflicts', long({
  t: 2, d: 4, c: 'analysis', marks: 5, wl: L5,
  stem: 'Examine the issues in centre-state relations that concern the Governor and President\'s Rule, and state the limits associated with the S. R. Bommai case (1994).',
  model: '1. The **Governor** is appointed by the President and acts as the Union\'s representative in a state.\n2. Under **Article 356**, **President\'s Rule** places a state\'s executive power with the Union when the constitutional machinery is held to have failed.\n3. Some states have said that these powers can **interfere** with their working.\n4. In the **S. R. Bommai case (1994)** the Court held that a ministry\'s majority should be tested by a **floor test**.\n5. It also held that a proclamation is open to **judicial review**.',
  sol: 'Governor, Article 356, concerns and the limits.',
  scheme: [['Role of the Governor', 1], ['Meaning of Article 356', 1], ['Concerns of some states', 1], ['Floor test, Bommai 1994', 1], ['Judicial review of the proclamation', 1]],
}));
Q('l_special', long({
  t: 2, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: 'Discuss whether federalism has helped India to accommodate diversity, with reference to the formation of states and special provisions.',
  model: '1. **Federalism** divides power so that diverse regions have their own governments.\n2. The **States Reorganisation Act (1956)** redrew the state map, **mostly by language**.\n3. New states were formed later: **Chhattisgarh, Uttarakhand and Jharkhand (2000)** and **Telangana (2014)**.\n4. **Article 371** and related Articles give **special provisions** to several states: **asymmetric federalism**.\n5. Views differ: a few say the centre is too strong, while others say unity needs a strong centre.',
  sol: 'Accommodation through states and special provisions, with both views.',
  scheme: [['Federalism gives regions their own governments', 1], ['States Reorganisation Act, 1956, linguistic', 1], ['New states in 2000 and 2014', 1], ['Article 371 and asymmetric federalism', 1], ['Both views on the strength of the centre', 1]],
}));

// ================================================================ case-based (4 marks: 1 + 1 + 2)
Q('c_kestria', caseQ({
  t: 1, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the table from an imagined handbook and answer the questions that follow. *(An imagined handbook written by SOYL for practice; Kestria and its levels of government are not real.)*',
  passage: '**From an imagined Kestria civics handbook**\n\n| Level | Examples of powers |\n|---|---|\n| National | Defence, currency, postal services |\n| Provincial | Policing, farming, local hospitals |\n| Municipal | Street lighting, markets, parks |\n\nThe handbook adds that the powers in the table are fixed by the written constitution of Kestria. The constitution can be changed only if two thirds of the provincial assemblies agree. A constitutional court decides if any level has gone beyond its powers.',
  parts: [
    child('a', short({ t: 1, d: 2, c: 'recall', marks: 1, stem: 'How many levels of government does Kestria have, according to the table?', model: '**Three** levels: national, provincial and municipal.', sol: 'Count the rows of the table.', scheme: [['Three', 1]] })),
    child('b', short({ t: 1, d: 3, c: 'application', marks: 1, stem: 'Which body in Kestria acts as umpire in disputes about powers?', model: 'The **constitutional court**.', sol: 'An independent judiciary acts as umpire.', scheme: [['The constitutional court', 1]] })),
    child('c', short({ t: 1, d: 4, c: 'analysis', marks: 2, stem: '**Either** (i): Why does the handbook suggest that Kestria is a federation and not a unitary state?', model: 'The **constitution fixes the powers** of each level, the **provinces take part in changing it** because two thirds of the assemblies must agree, and a **court acts as umpire**. These are marks of a **federation**.', sol: 'Powers fixed, a shared amendment and an umpire.', scheme: [['Powers of each level fixed by a written constitution', 1], ['Provinces take part in amendment; a court is umpire', 1]] }), [
      short({ t: 1, d: 4, c: 'application', marks: 2, stem: '**Or** (ii): The national legislature of Kestria passes a law about local hospitals, which the table lists as a provincial power. What would the handbook suggest the constitutional court may do, and why?', model: 'The court may **declare the law invalid** because the **constitution gives local hospitals to the provinces**. As **umpire**, the court keeps each level within the powers that the constitution gives it.', sol: 'The court acts as umpire.', scheme: [['The court may declare the law invalid because hospitals are a provincial power', 1], ['As umpire it keeps each level within its powers', 1]] }),
    ]),
  ],
}));
Q('c_finance', caseQ({
  t: 1, d: 4, c: 'application', origin: 'soyl-original',
  stem: 'Read the newspaper report and answer the questions that follow. *(An imagined report written by SOYL for practice; the newspaper, the Commission members, the states and all figures are not real.)*',
  passage: '**From the Merivan Chronicle, imagined, issue of 12 June**\n\nThe Finance Commission has handed its report to the President. It recommends that the states together receive a larger share of the divisible taxes than before, to be divided among them by a formula that takes into account population, area and the gap in income. It also recommends special grants for states with weak finances. Officials of one state said that they would still depend heavily on transfers from the Union. A commentator added that the Commission will be set up again after five years.',
  parts: [
    child('a', short({ t: 1, d: 2, c: 'recall', marks: 1, stem: 'Under which Article is the Finance Commission provided for?', model: '**Article 280**.', sol: 'The Finance Commission is provided for in Article 280.', scheme: [['Article 280', 1]] })),
    child('b', short({ t: 1, d: 3, c: 'application', marks: 1, stem: 'To whom has the Finance Commission handed its report, according to the report?', model: 'The **President**.', sol: 'The report was handed to the President.', scheme: [['The President', 1]] })),
    child('c', short({ t: 1, d: 4, c: 'analysis', marks: 2, stem: '**Either** (i): Which centralising feature of the Constitution is shown by the remark of the officials of one state?', model: 'The remark shows the **financial dependence of the states on Union transfers**. This is one of the features that give the **Union a strong position** in the federation.', sol: 'Financial dependence as a centralising feature.', scheme: [['Financial dependence of states on Union transfers', 1], ['A feature that strengthens the Union', 1]] }), [
      short({ t: 1, d: 4, c: 'analysis', marks: 2, stem: '**Or** (ii): How does the Finance Commission help to share resources fairly among states of different incomes, as the report indicates?', model: 'The Commission recommends a **formula that takes account of population, area and the gap in income**, and **special grants** for states with weak finances. These **help poorer states** to provide services.', sol: 'Formula and special grants.', scheme: [['A formula using population, area and income gap', 1], ['Special grants for weaker states', 1]] }),
    ]),
  ],
}));
Q('c_river', caseQ({
  t: 2, d: 4, c: 'application', origin: 'soyl-original',
  stem: 'Read the exchange of letters and answer the questions that follow. *(Imagined letters written by SOYL for practice; the states, the river and the officials are not real.)*',
  passage: '**Imagined letters between two state governments**\n\n*From the Irrigation Department of Merivan:* Water of the river Sarpini reaches our farms later every year, because Sundara has built new canals upstream.\n\n*From the Irrigation Department of Sundara:* Our canals take only what our farmers need, and we are willing to meet and discuss. If talks fail, we would accept a reference to a tribunal.',
  parts: [
    child('a', short({ t: 2, d: 2, c: 'recall', marks: 1, stem: 'What kind of dispute is described in the letters?', model: 'A **river-water dispute** between states.', sol: 'The sharing of the waters of a river.', scheme: [['River-water dispute between states', 1]] })),
    child('b', short({ t: 2, d: 3, c: 'application', marks: 1, stem: 'Under which Act can a tribunal be set up for this kind of dispute?', model: 'The **Inter-State River Water Disputes Act of 1956**.', sol: 'The 1956 Act.', scheme: [['Inter-State River Water Disputes Act, 1956', 1]] })),
    child('c', short({ t: 2, d: 4, c: 'application', marks: 2, stem: '**Either** (i): What steps can the two states take, as the letters suggest, before and after a tribunal is considered?', model: 'They can **meet and negotiate** first, as Sundara proposes. If talks fail, the matter can be **referred to a tribunal** under the 1956 Act, which gives an **award** after hearing both states.', sol: 'Negotiation, then a tribunal.', scheme: [['Negotiation between the governments', 1], ['Reference to a tribunal, which gives an award', 1]] }), [
      short({ t: 2, d: 4, c: 'analysis', marks: 2, stem: '**Or** (ii): Why is a tribunal or a court, and not the government of either state, a suitable body to decide such a dispute?', model: 'Each state is a **party** to the dispute, so its own government would not be **neutral**. A **tribunal** or court is **independent of both states** and can decide on the facts and the law.', sol: 'Neutrality of an independent body.', scheme: [['Each state is a party and cannot be neutral', 1], ['A tribunal or court is independent of both and decides fairly', 1]] }),
    ]),
  ],
}));
Q('c_debate', caseQ({
  t: 2, d: 4, c: 'evaluation', origin: 'soyl-original',
  stem: 'Read the classroom discussion and answer the questions that follow. *(An imagined discussion written by SOYL for practice; the school and the students are not real.)*',
  passage: '**Imagined discussion in Class 11 at Lakeview School**\n\nAnita: The centre has too much power. States should decide more things for themselves.\n\nRohan: A strong centre keeps the country united and helps poorer regions.\n\nTeacher: Both of you have a point. Think about which examples support each view, and remember that federalism also lets regions keep their special needs in view.',
  parts: [
    child('a', short({ t: 2, d: 2, c: 'understanding', marks: 1, stem: 'Which student gives a reason in support of a strong centre?', model: '**Rohan**.', sol: 'He says that a strong centre keeps the country united.', scheme: [['Rohan', 1]] })),
    child('b', short({ t: 2, d: 2, c: 'recall', marks: 1, stem: 'Name one feature of the Constitution that critics cite as favouring the centre.', model: 'For example, the **Governor\'s power to reserve bills** or **President\'s Rule** under Article 356.', sol: 'Any centralising feature.', scheme: [['A correct feature', 1]] })),
    child('c', short({ t: 2, d: 4, c: 'evaluation', marks: 2, stem: '**Either** (i): Give one example that supports Anita\'s view and one that supports Rohan\'s view.', model: 'For **Anita**: states depend on **Union transfers** for much of their finance. For **Rohan**: the Union can help **poorer regions** through transfers recommended by the Finance Commission.', sol: 'One example for each view.', scheme: [['An example for Anita\'s view', 1], ['An example for Rohan\'s view', 1]] }), [
      short({ t: 2, d: 4, c: 'application', marks: 2, stem: '**Or** (ii): The teacher says that federalism lets regions keep their special needs in view. Name a provision that does so, and say how.', model: '**Article 371 and related Articles** give **special provisions to several states**, which protect their **particular needs**. This is **asymmetric federalism**.', sol: 'Article 371 and its purpose.', scheme: [['Article 371 and related Articles', 1], ['They protect the particular needs of the states concerned', 1]] }),
    ]),
  ],
}));
