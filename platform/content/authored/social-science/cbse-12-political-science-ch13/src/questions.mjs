// CBSE 12 Political Science, ch13 The Crisis of Democratic Order — question bank. Every source, diary,
// letter and newspaper in it is imagined and written by SOYL (labelled as such); no NCERT text, box,
// cartoon or exercise and no board/sample-paper item is reused (D-036); no real person is quoted.
// Real-world facts are limited to stable, verifiable ones (1971 election and war, 1973 oil price rise,
// Gujarat and Bihar movements and the railway strike of 1974, Kesavananda Bharati 1973 and the 1973
// supersession, the Allahabad judgment of 12 June 1975 and the Supreme Court's partial stay, the
// proclamation of 25 June 1975 under Article 352, MISA, censorship, the 42nd and 44th Amendments, the
// Shah Commission, the 1977 and 1980 elections). The government's stated reasons and its critics'
// arguments are given side by side. Nothing after 2024 is stated.
import assert from 'node:assert/strict';
import { Q, mcq, ar, tf, fb, match, ord, short, long, source, child } from './lib.mjs';

const S2 = [30, 50];
const S3 = [50, 80];
const L5 = [80, 120];
const IMAG = '*(Imagined document written by SOYL for practice; the people and places in it are not real.)*';

// ---------------------------------------------------------------- chronology (asserted in order)
export const EVENTS = [
  [1971, 'March', 'Congress wins the Lok Sabha election'],
  [1971, 'December', 'War with Pakistan; Bangladesh is born'],
  [1973, 'April', 'Kesavananda ruling and supersession'],
  [1973, 'October', 'Sharp rise in world oil prices'],
  [1974, 'January', 'Gujarat movement begins'],
  [1974, 'March', 'Bihar movement begins'],
  [1974, 'May', 'Nationwide railway strike'],
  [1975, 'June', 'Allahabad judgment (12th); Emergency proclaimed (25th)'],
  [1976, 'November', '42nd Amendment passed'],
  [1977, 'March', 'Congress defeated; Janata government formed'],
  [1978, 'December', '44th Amendment passed'],
  [1980, 'January', 'Congress returns to power'],
];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
for (let i = 1; i < EVENTS.length; i++) {
  const [y0, m0] = EVENTS[i - 1];
  const [y1, m1] = EVENTS[i];
  assert.ok(y1 * 12 + MONTHS.indexOf(m1) > y0 * 12 + MONTHS.indexOf(m0), `chronology out of order at ${y1} ${m1}`);
}

// ================================================================ t01 Background to the Emergency
Q('m_1971_slogan', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Which slogan did the Congress use in the Lok Sabha election of 1971 to promise action against poverty?',
  opts: ['Garibi Hatao (remove poverty)', 'Jai Jawan Jai Kisan', 'Total Revolution', 'Quit India'],
  sol: 'The 1971 campaign was fought on the slogan Garibi Hatao, and the Congress won a large majority. Jai Jawan Jai Kisan dates from 1965, Total Revolution was the call of the 1974 Bihar movement, and Quit India belongs to 1942.',
}));
Q('m_econ_strain', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'An imagined economics teacher in 1974 lists four problems on the blackboard: the cost of caring for refugees after the 1971 war, a sudden rise in world oil prices, a halt in some foreign aid, and a weak monsoon. What do these four together help to explain?',
  opts: [
    'The sharp rise in prices and economic hardship that fed public discontent in 1973–74',
    'The rapid fall in prices that made farmers angry in 1974',
    'Why the Congress won the 1971 election',
    'Why the Planning Commission was abolished in 1974',
  ],
  sol: 'War costs, costlier oil, less aid and poor harvests together pushed up prices and slowed growth, which added to discontent. Prices rose rather than fell; the 1971 victory came before these problems; the Planning Commission continued until 2015.',
}));
Q('m_gujarat', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'How did the Gujarat movement of 1974 begin?',
  opts: [
    'As protests by students against the rising prices of food and essentials and against corruption',
    'As a strike by railway workers demanding a bonus',
    'As a campaign by industrialists against licensing',
    'As a demand by the Union government to dismiss the High Court',
  ],
  sol: 'Students in Gujarat began protesting in January 1974 over prices, scarcity and corruption, and opposition parties joined them. The railway strike was a separate, nationwide event in May 1974.',
}));
Q('m_bihar_jp', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Which leader accepted the invitation of students to lead the Bihar movement in 1974?',
  opts: ['Jayaprakash Narayan', 'Morarji Desai', 'Jagjivan Ram', 'Charan Singh'],
  sol: 'Jayaprakash Narayan (JP), who had withdrawn from party politics, agreed to lead the Bihar movement and gave it a national profile. The other three became important in the politics of 1977–79.',
}));
Q('m_total_rev', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'What did Jayaprakash Narayan mean by his call for Total Revolution in 1974?',
  opts: [
    'A peaceful, wide-ranging change in the social, economic and political life of the country',
    'An armed uprising to overthrow the Constitution',
    'A demand that India leave the Commonwealth',
    'A plan to nationalise all private industry',
  ],
  sol: 'JP used the phrase for a broad, non-violent transformation of society and politics, beginning with the demand that the Bihar government be dismissed. He did not call for armed revolt or for nationalisation.',
}));
Q('m_railway', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'The nationwide railway strike of May 1974 was led by a committee of railway unions under which leader?',
  opts: ['George Fernandes', 'E. M. S. Namboodiripad', 'C. Rajagopalachari', 'Raj Narain'],
  sol: 'George Fernandes led the struggle committee of railway unions; the strike demanded better pay and service conditions. The government declared it illegal and arrested many workers, and it was called off after about three weeks.',
}));
Q('m_kesavananda', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'What did the Supreme Court decide in the Kesavananda Bharati case of 1973?',
  opts: [
    'Parliament can amend the Constitution but cannot change its basic structure',
    'Parliament can never amend any part of the Constitution',
    'Courts cannot review any constitutional amendment',
    'The President alone can amend the Constitution',
  ],
  sol: 'The Court held that the power of amendment is wide but does not extend to the basic structure (features such as democracy, federalism and judicial review). The other options either deny the amending power or the role of the courts.',
}));
Q('m_supersession', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: 'Why did the appointment of the Chief Justice of India in April 1973 become a political controversy?',
  opts: [
    'Three judges senior to the new Chief Justice were passed over, which critics saw as a threat to judicial independence',
    'The new Chief Justice was elected by the Lok Sabha for the first time',
    'The post of Chief Justice was left vacant for two years',
    'The appointment was made by the Chief Ministers of the states',
  ],
  sol: 'By convention the seniormost judge became Chief Justice. Passing over three senior judges, who had ruled against the government in the Kesavananda case, led critics to argue that the executive wanted a judiciary sympathetic to its policies; the government said it was choosing a judge with a progressive outlook.',
}));
Q('m_allahabad', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'What did the Allahabad High Court decide on 12 June 1975?',
  opts: [
    'It declared the election of Indira Gandhi to the Lok Sabha invalid, on an election petition filed by Raj Narain',
    'It ordered fresh Lok Sabha elections across the country',
    'It banned the Bihar movement',
    'It struck down the Kesavananda Bharati judgment',
  ],
  sol: 'Raj Narain, who had lost to Indira Gandhi in Rae Bareli in 1971, filed an election petition; the High Court held her election void on grounds of corrupt practice (use of government officials in the campaign). A High Court cannot order national elections or overturn the Supreme Court.',
}));
Q('m_sc_stay', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'Under the Supreme Court\'s partial stay of June 1975, which of these could Indira Gandhi still do while her appeal was pending?',
  opts: [
    'Remain a member of the Lok Sabha and continue as Prime Minister, but not vote in the House',
    'Vote in the Lok Sabha but not attend Cabinet meetings',
    'Nothing; she had to resign at once',
    'Contest a fresh by-election immediately',
  ],
  sol: 'The vacation judge allowed her to remain an MP and Prime Minister until the appeal was decided, but she could not vote in the Lok Sabha. The order did not require resignation.',
}));
Q('ar_parl_judiciary', ar({
  t: 1, d: 3, c: 'analysis', key: 'a',
  a: 'Relations between the government and the judiciary were strained in the early 1970s.',
  r: 'The Supreme Court had held that Parliament could not use its amending power to alter the basic structure of the Constitution.',
  sol: 'Both are true and R explains A: the government wanted wide power to amend the Constitution for its programme, and the basic structure ruling limited that power, which led to friction, including over the 1973 appointment of the Chief Justice.',
}));
Q('ar_movements', ar({
  t: 1, d: 2, c: 'analysis', key: 'd',
  a: 'The Gujarat and Bihar movements of 1974 were organised by the ruling Congress party.',
  r: 'Students played a leading role in both the Gujarat and the Bihar movements.',
  sol: 'A is false: both movements were directed against Congress governments in those states and were led by students, later joined by opposition parties. R is true.',
}));
Q('tf_jp_post', tf({
  t: 1, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? Jayaprakash Narayan held a post in the Union Cabinet when he led the Bihar movement in 1974.',
  sol: 'He held no government or party office at the time; he had left active party politics years earlier and returned to lead a popular movement from outside.',
}));
Q('fb_total', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'In 1974 Jayaprakash Narayan called for a non-violent ___ Revolution to change the social, economic and political order.',
  acc: [['Total', 'Sampoorna', 'Sampurna']],
  sol: 'The call was for Total Revolution (Sampoorna Kranti).',
}));
Q('ord_road_1975', ord({
  t: 1, d: 2, c: 'understanding', marks: 1,
  stem: 'Arrange these events on the road to the Emergency in the order in which they happened.',
  items: [
    'The Kesavananda Bharati judgment on the basic structure',
    'Students in Gujarat begin protests against rising prices',
    'Railway workers go on a nationwide strike',
    'The Allahabad High Court declares the Prime Minister\'s election invalid',
  ],
  sol: 'April 1973 (Kesavananda), January 1974 (Gujarat), May 1974 (railway strike), 12 June 1975 (Allahabad judgment).',
}));
Q('s_econ_bg', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State two economic conditions of 1972–74 that added to public discontent before the Emergency.',
  model: '1. **Rising prices:** the costs of the 1971 war and refugees, a weak monsoon and the steep rise in **world oil prices in 1973** made food and fuel much dearer.\n2. **Slow growth and jobs:** industrial output slowed, unemployment rose and some foreign aid was stopped.',
  sol: 'Any two conditions, each linked to hardship.',
  scheme: [['First condition explained', 1], ['Second condition explained', 1]],
}));
Q('s_two_movements', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Mention two features that the Gujarat and Bihar movements of 1974 had in common.',
  model: '1. Both began with **students** protesting against **rising prices, scarcity and corruption**, and opposition parties later joined them.\n2. Both targeted the **Congress state governments**: Gujarat came under President\'s Rule in 1974, and in Bihar the movement demanded the dismissal of the government.',
  sol: 'Two shared features: who led them, what they demanded or whom they opposed.',
  scheme: [['First common feature', 1], ['Second common feature', 1]],
}));
Q('s_judiciary', short({
  t: 1, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: 'Give two issues on which the government and the judiciary differed in the early 1970s.',
  model: '1. **Amending power:** the courts held that Parliament could not alter the **basic structure** of the Constitution, while the government wanted wide power to amend it for its programme.\n2. **Appointments:** in **1973** three senior judges were **superseded** when the Chief Justice was appointed, which critics saw as pressure on the judiciary.',
  sol: 'Amendment of the Constitution (rights and basic structure) and the 1973 supersession.',
  scheme: [['First issue', 1], ['Second issue', 1]],
}));
Q('s3_allahabad', short({
  t: 1, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain the verdict of the Allahabad High Court of 12 June 1975 and the events it set in motion in the following two weeks.',
  model: '1. **Verdict:** on an election petition by **Raj Narain**, the High Court held the 1971 election of **Indira Gandhi** from Rae Bareli **void** for corrupt practice.\n2. **Stay:** the **Supreme Court** gave a **partial stay**: she could stay an MP and Prime Minister but could not vote in the Lok Sabha until her appeal was decided.\n3. **Escalation:** opposition parties led by JP demanded her **resignation** and announced a nationwide satyagraha; on the night of **25 June** the **Emergency** was proclaimed.',
  sol: 'Verdict, the stay, and the political escalation ending in the proclamation.',
  scheme: [['The verdict and who petitioned', 1], ['The partial stay', 1], ['Opposition demand and the proclamation', 1]],
}));
Q('s3_jp_role', short({
  t: 1, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Assess the role of Jayaprakash Narayan in the political crisis of 1974–75.',
  model: '1. He gave the **Bihar movement** a leader with national standing and turned student protests into a wider campaign against **corruption and misrule**.\n2. His call for **Total Revolution** and his march to Parliament in 1975 brought **opposition parties together** against the Congress.\n3. **Two views:** supporters saw a peaceful defence of democracy; the government argued the agitation was **undermining an elected government** and order.',
  sol: 'Leadership of the movement, uniting the opposition, and both views of his role.',
  scheme: [['Leadership of the movement', 1], ['Uniting the opposition / Total Revolution', 1], ['Balanced assessment', 1]],
}));
Q('l_background', long({
  t: 1, d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: 'Explain the economic and political background that led to the declaration of the Emergency in June 1975.',
  model: '1. **Economic strain:** the 1971 war and refugees, a weak monsoon, a halt in some aid and the **1973 oil price rise** caused **steep inflation** and unemployment.\n2. **Gujarat and Bihar movements (1974):** students protested against prices and corruption; JP led the Bihar movement and called for **Total Revolution**.\n3. **Railway strike (1974):** a nationwide strike over pay was declared illegal and suppressed, deepening labour unrest.\n4. **Clash with the judiciary:** the **basic structure** ruling (1973) and the **supersession** of three judges strained relations.\n5. **Trigger:** the **Allahabad verdict** (12 June 1975), the partial stay and the opposition demand for resignation led to the proclamation on **25 June 1975**.',
  sol: 'Economic causes, popular movements, labour unrest, conflict with the courts, and the immediate trigger.',
  scheme: [['Economic causes', 1], ['Gujarat and Bihar movements', 1], ['Railway strike', 1], ['Conflict with the judiciary', 1], ['Immediate trigger in June 1975', 1]],
}));
Q('sb_patna_diary', source({
  t: 1, d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the source from an imagined diary kept by a college student in Patna in 1974 and answer the questions that follow. ${IMAG}`,
  passage: '**Diary of a college student, Patna (imagined), 1974**\n\nMarch. Our hostel mess has raised the price of a meal again, and kerosene is hard to find. Students from every college marched today against prices and corruption in the state government.\n\nJune. A huge crowd gathered at the Gandhi Maidan. The elderly leader who has agreed to guide us spoke of a revolution that would change not only the government but the whole of society, without any violence. Some of my friends say we should only demand cheaper food; others now want the state assembly dissolved.\n\nDecember. My uncle, who works for the railways, says the strike in May was crushed and many of his colleagues were jailed. He worries that the country is heading for a confrontation.',
  parts: [
    child('a', short({ t: 1, d: 1, c: 'recall', marks: 1, stem: 'Identify the elderly leader who agreed to guide the students in Bihar.', model: '**Jayaprakash Narayan** (JP).', sol: 'JP led the Bihar movement from 1974.', scheme: [['Jayaprakash Narayan', 1]] })),
    child('b', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'Name the idea described in the line about a revolution that would change the whole of society without violence.', model: '**Total Revolution** (Sampoorna Kranti).', sol: 'JP\'s call for a non-violent transformation of society and politics.', scheme: [['Total Revolution', 1]] })),
    child('c', short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Using the source, show how economic problems and political protest were linked in 1974.', model: 'Rising **meal prices** and scarce **kerosene** (economic hardship) brought students on to the streets against **prices and corruption**; the demands then grew from cheaper food to **dissolving the assembly**, turning economic anger into a **political movement**.', sol: 'Hardship leads to protest; protest widens into political demands.', scheme: [['Economic hardship from the source', 1], ['Its link to political demands', 1]] }), [
      short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Which event does the uncle refer to, and why did it add to the sense of confrontation?', model: 'The **nationwide railway strike of May 1974**. The government declared it **illegal** and **jailed** many workers, so labour unrest joined the student movement and relations between the government and its critics grew **sharper**.', sol: 'Name the strike and link its suppression to rising tension.', scheme: [['Railway strike of 1974', 1], ['Why it raised tension', 1]] }),
    ]),
  ],
}));

// ================================================================ t02 Declaration and consequences
Q('m_article', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'Under which Article of the Constitution was the national Emergency of June 1975 proclaimed?',
  opts: ['Article 352', 'Article 356', 'Article 360', 'Article 21'],
  sol: 'Article 352 deals with a national emergency. Article 356 is President\'s Rule in a state, Article 360 is a financial emergency, and Article 21 is the right to life and personal liberty.',
}));
Q('m_ground', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Which ground was cited for the proclamation of the Emergency on 25 June 1975?',
  opts: ['Internal disturbance', 'External aggression', 'Financial instability', 'Failure of constitutional machinery in a state'],
  sol: 'The 1975 proclamation cited a threat from internal disturbance. An emergency on grounds of external aggression had been in force since the 1971 war; financial emergency (Article 360) has never been declared; failure of machinery in a state leads to President\'s Rule.',
}));
Q('m_cabinet', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'Why was the way in which the Emergency was proclaimed in 1975 later criticised on procedural grounds?',
  opts: [
    'The President signed the proclamation on the Prime Minister\'s advice and the Union Cabinet was informed only the next morning',
    'Parliament had voted against the proclamation',
    'The proclamation was signed by the Chief Justice instead of the President',
    'The Election Commission had not been consulted',
  ],
  sol: 'President Fakhruddin Ali Ahmed issued the proclamation late on 25 June on the advice of the Prime Minister; the Cabinet met and endorsed it on 26 June. This was one reason the 44th Amendment later required the written advice of the Cabinet.',
}));
Q('m_misa', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Under the Maintenance of Internal Security Act (MISA), used widely during the Emergency, the government could',
  opts: [
    'detain persons it considered a threat without trial, by way of preventive detention',
    'conduct elections without the Election Commission',
    'appoint judges without consulting anyone',
    'collect taxes without the approval of Parliament',
  ],
  sol: 'MISA (1971) provided for preventive detention: people could be held without being charged or tried. Thousands of opposition workers and leaders were detained under it during the Emergency.',
}));
Q('m_censorship', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'An imagined editor in Pune in 1975 has to send every news report to a government office and wait for approval before printing it. What is this practice called?',
  opts: ['Press censorship (pre-censorship)', 'Judicial review', 'Preventive detention', 'President\'s Rule'],
  sol: 'Requiring prior government approval before publication is pre-censorship of the press, which was imposed during the Emergency. Judicial review is a power of courts; preventive detention concerns persons, not newspapers.',
}));
Q('m_blank', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'On one morning in 1975 an imagined newspaper prints its editorial column completely blank. What was this most likely meant to show?',
  opts: [
    'A silent protest against censorship, telling readers that something had been removed',
    'That the editor had nothing to say that day',
    'That the newspaper had closed down',
    'Support for the censorship rules',
  ],
  sol: 'Some newspapers left blank spaces where censored material would have appeared, a quiet way of telling readers about censorship without breaking the rules. It was not closure, and it did not express support.',
}));
Q('m_habeas', mcq({
  t: 2, d: 4, c: 'analysis',
  stem: 'In a case decided in April 1976 (often called the habeas corpus case), what did the majority of the Supreme Court hold?',
  opts: [
    'While the order suspending the enforcement of rights was in force, detained persons could not approach the courts for habeas corpus',
    'Every person detained under MISA had to be released at once',
    'The Emergency proclamation was unconstitutional',
    'Preventive detention could be ordered only by the courts',
  ],
  sol: 'The majority accepted the government\'s view that the right to move courts for enforcement of personal liberty was suspended during the Emergency; one judge dissented. Critics later saw the ruling as a low point for civil liberties, and the 44th Amendment protected Articles 20 and 21 from suspension.',
}));
Q('m_42', mcq({
  t: 2, d: 2, c: 'recall',
  stem: 'Which of the following was a change made by the 42nd Amendment of 1976?',
  opts: [
    'The term of the Lok Sabha and state assemblies was extended from five to six years',
    'The voting age was lowered from 21 to 18',
    'The right to property was removed from the list of fundamental rights',
    'Emergency could be declared only for armed rebellion',
  ],
  sol: 'The 42nd Amendment, among many changes, extended the term of legislatures to six years, added the words socialist, secular and integrity to the Preamble and inserted Fundamental Duties. The voting age changed in 1989; the right to property and armed rebellion were changes of the 44th Amendment (1978).',
}));
Q('m_20point', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'How did the government present the Twenty-Point Programme announced in 1975?',
  opts: [
    'As a programme of economic relief and reform, such as land reform, control of prices and relief from rural debt',
    'As a list of twenty opposition leaders to be released',
    'As twenty amendments to restore the press',
    'As a schedule for holding the next general election',
  ],
  sol: 'The government said the Emergency would allow it to carry out pro-poor measures quickly, and the Twenty-Point Programme listed them: land reform, price control, abolition of bonded labour, relief from rural debt and similar steps.',
}));
Q('m_sterilisation', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'An imagined report by a citizens\' group in 1977 describes officials being given targets for the number of sterilisations, and complaints that people were pressured into the operation. Which controversy of the Emergency does this relate to?',
  opts: [
    'Compulsory sterilisation under the family planning drive',
    'Censorship of foreign newspapers',
    'The railway strike of 1974',
    'The supersession of judges in 1973',
  ],
  sol: 'During the Emergency, the family planning programme set targets, and there were many complaints of coercion; this was among the excesses examined by the Shah Commission. The other options are unrelated to sterilisation.',
}));
Q('ar_federal', ar({
  t: 2, d: 3, c: 'analysis', key: 'a',
  a: 'During the Emergency, power was concentrated in the Union government.',
  r: 'During a national emergency Parliament can make laws on subjects in the State List and the Union can give directions to the states.',
  sol: 'Both are true and R explains A: emergency provisions turn the federal division of powers into a largely unitary arrangement, so the Union and its executive gained power over the states.',
}));
Q('ar_rights', ar({
  t: 2, d: 2, c: 'analysis', key: 'a',
  a: 'Many people detained during the Emergency could not get relief from the courts.',
  r: 'The government had suspended the right of citizens to move the courts for the enforcement of fundamental rights.',
  sol: 'Both are true and R explains A: with the right to approach courts suspended, and preventive detention laws in use, detainees had little legal remedy.',
}));
Q('ar_42', ar({
  t: 2, d: 3, c: 'analysis', key: 'b',
  a: 'The 42nd Amendment added a chapter on Fundamental Duties to the Constitution.',
  r: 'The 42nd Amendment extended the term of the Lok Sabha from five to six years.',
  sol: 'Both statements are true, but R does not explain A: they are two separate changes made by the same amendment.',
}));
Q('tf_ground', tf({
  t: 2, d: 1, c: 'recall', ans: false,
  stem: 'True or false? The Emergency of June 1975 was proclaimed on the ground of external aggression.',
  sol: 'The 1975 proclamation cited internal disturbance; an earlier emergency for external aggression had been in force since 1971.',
}));
Q('fb_misa', fb({
  t: 2, d: 2, c: 'recall',
  stem: 'The preventive detention law under which many opposition workers were held during the Emergency was the Maintenance of Internal ___ Act.',
  acc: [['Security']],
  sol: 'The Maintenance of Internal Security Act (MISA), 1971.',
}));
Q('mt_emergency_terms', match({
  t: [2, 3], d: 2, c: 'understanding',
  stem: 'Match each term from the Emergency period with what it refers to.',
  pairs: [
    ['MISA', 'Detention without trial'],
    ['Article 352', 'Proclamation of a national emergency'],
    ['Pre-censorship', 'Prior government approval of news'],
    ['Shah Commission', 'Inquiry into excesses of the Emergency'],
  ],
  sol: 'MISA allowed preventive detention; Article 352 provides for a national emergency; pre-censorship meant news needed approval before printing; the Shah Commission (1977) inquired into excesses.',
}));
Q('s_rights', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'How did the Emergency affect the fundamental rights of citizens? Give two effects.',
  model: '1. The right to move the **courts** for enforcement of fundamental rights was **suspended**, so detained people had little legal remedy.\n2. Freedoms of **speech, the press and assembly** were curbed through **censorship** and bans on protests, and thousands were held under **preventive detention**.',
  sol: 'Suspension of the right to approach courts; curbs on expression and assembly with detentions.',
  scheme: [['Right to approach courts suspended', 1], ['Curbs on speech, press or assembly', 1]],
}));
Q('s_press', short({
  t: 2, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'Describe two ways in which newspapers and magazines responded to censorship during the Emergency.',
  model: '1. Some newspapers printed **blank spaces** where censored reports or editorials should have been, a **silent protest** readers understood.\n2. Some journals chose to **stop publishing** rather than accept censorship, while many others **complied** and printed only approved news.',
  sol: 'Any two responses: blank spaces, closure, compliance, or reporting indirectly.',
  scheme: [['First response', 1], ['Second response', 1]],
}));
Q('s_42', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Mention any two changes made in the Constitution by the 42nd Amendment of 1976.',
  model: '1. The term of the **Lok Sabha and state assemblies** was extended from **five to six years**.\n2. The words **socialist, secular and integrity** were added to the **Preamble** (also: a chapter on **Fundamental Duties** was inserted).',
  sol: 'Any two of the well-known changes.',
  scheme: [['First change', 1], ['Second change', 1]],
}));
Q('s3_govt_reasons', short({
  t: 2, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'What reasons did the government give for declaring the Emergency? Give three.',
  model: '1. **Order:** opposition agitations and the call to police and officials not to obey orders they considered illegal were said to threaten **stability and internal security**.\n2. **Elected mandate:** in a democracy, the government argued, protests should not force out a government **elected by the people**.\n3. **Development:** the Emergency would allow **pro-poor programmes**, such as the Twenty-Point Programme, to be implemented without obstruction.',
  sol: 'The three stated justifications: threat to order, protecting an elected government, enabling economic programmes.',
  scheme: [['Threat to order and security', 1], ['Protecting an elected government', 1], ['Enabling economic programmes', 1]],
}));
Q('s3_excesses', short({
  t: 2, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: 'Describe three controversial actions of the Emergency period that the Shah Commission later examined.',
  model: '1. **Arrests:** thousands of political workers, students and journalists were **detained without trial**, often under MISA.\n2. **Forced sterilisation:** officials given family-planning **targets** were accused of pressuring people into operations.\n3. **Demolitions:** homes and shops in some **Delhi** localities were **pulled down** with little notice, displacing poor families; the Commission also noted cases of people **without official posts** influencing the administration.',
  sol: 'Any three: detentions, sterilisation drives, demolitions, misuse of authority, curbs on the press.',
  scheme: [['First action', 1], ['Second action', 1], ['Third action', 1]],
}));
Q('l_consequences', long({
  t: 2, d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: 'Explain the consequences of the Emergency (1975–77) for civil liberties and for the institutions of Indian democracy.',
  model: '1. **Civil liberties:** the right to approach courts for fundamental rights was **suspended**; thousands were held under **preventive detention**.\n2. **Press:** **censorship** required prior approval; some papers protested with blank spaces or closed.\n3. **Judiciary:** in the **habeas corpus case** (1976) the Supreme Court accepted that detainees could not seek relief, weakening a key check.\n4. **Federalism and Parliament:** power was **concentrated** in the Union executive; elections were **postponed** and the **42nd Amendment** made sweeping changes.\n5. **Administration:** the Shah Commission found **excesses** such as forced sterilisation and demolitions, and **extra-constitutional** influence on officials.',
  sol: 'Rights, press, judiciary, federal and parliamentary institutions, and administration.',
  scheme: [['Civil liberties and detention', 1], ['Press censorship', 1], ['Judiciary', 1], ['Federalism, elections, 42nd Amendment', 1], ['Excesses in administration', 1]],
}));
Q('l_debate', long({
  t: 2, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: '"The Emergency of 1975 was necessary to save the country." Examine this claim by presenting the arguments on both sides.',
  model: '1. **For (government\'s case):** continuous agitations and the call to police and officials to disobey orders were said to threaten **order and national stability**.\n2. **For:** opposition parties were trying to remove an **elected government** through street protest instead of elections; the Emergency enabled **economic programmes**.\n3. **Against (critics\' case):** protests and movements are a **democratic right**; the law and courts could have handled disorder without suspending rights.\n4. **Against:** the timing after the **Allahabad verdict** suggested the motive was to protect the **Prime Minister\'s position**; the Shah Commission recorded serious **excesses**.\n5. **Conclusion:** voters rejected the Emergency in **1977**, and the **44th Amendment** tightened the conditions, showing a broad agreement that such powers need strong safeguards.',
  sol: 'Two arguments for, two against, and a reasoned conclusion supported by later events.',
  scheme: [['First argument for', 1], ['Second argument for', 1], ['First argument against', 1], ['Second argument against', 1], ['Balanced conclusion', 1]],
}));
Q('sb_news_desk', source({
  t: 2, d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the source from an imagined night-desk diary of a sub-editor at a Delhi newspaper in 1975 and answer the questions that follow. ${IMAG}`,
  passage: '**Night-desk diary of a sub-editor, Delhi (imagined), 1975**\n\n26 June. Our power supply was cut last night just before the presses were due to roll, and this morning we heard that a state of emergency had been proclaimed. An official now sits in an office near ours; every report, even about a cricket match, must be shown to him first.\n\n28 June. The editor has decided that tomorrow the space for the editorial will carry nothing at all. "Readers are not fools," he told us. Two of our reporters who covered the opposition rally have not come home; their families think they have been detained.',
  parts: [
    child('a', short({ t: 2, d: 1, c: 'recall', marks: 1, stem: 'Which practice is described in the line about showing every report to an official first?', model: '**Pre-censorship** of the press (press censorship).', sol: 'Prior approval of news before printing.', scheme: [['Pre-censorship', 1]] })),
    child('b', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Why do the families think the reporters may have been detained without being charged? Name the law likely used.', model: 'Preventive detention under **MISA** (Maintenance of Internal Security Act).', sol: 'MISA allowed detention without trial.', scheme: [['MISA / preventive detention', 1]] })),
    child('c', short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): What did the editor mean by leaving the editorial space empty, and why could this be effective?', model: 'It was a **silent protest**: readers seeing a **blank column** would understand that something had been **censored**, so the paper informed them about censorship **without printing** anything the rules forbade.', sol: 'Meaning of the blank space and why it communicates.', scheme: [['Silent protest against censorship', 1], ['Why readers would understand', 1]] }), [
      short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Using the source, explain how the Emergency affected two freedoms of citizens.', model: '1. **Freedom of the press and expression:** every report needed approval, so news was **controlled**.\n2. **Personal liberty:** reporters who covered an opposition rally were apparently **detained** without trial.', sol: 'Two freedoms, each with evidence from the source.', scheme: [['Press or expression, with evidence', 1], ['Personal liberty, with evidence', 1]] }),
    ]),
  ],
}));
Q('sb_detenu_letter', source({
  t: [2, 3], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the source from an imagined letter written in 1976 by the wife of a detained teachers' union leader in Indore and answer the questions that follow. ${IMAG}`,
  passage: '**Letter from the wife of a detained teachers\' union leader, Indore (imagined), 1976**\n\nIt is now nine months since my husband was taken away at night. No charge has been read out and no date for a trial has been given. Our lawyer says that petitions asking the court to produce him cannot be heard at present, because the right to seek such relief stands suspended. His school has stopped his salary. Our neighbours are kind, but they speak to us only quietly, as if afraid. I write this letter so that one day people remember what it meant for an ordinary family.',
  parts: [
    child('a', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'What kind of detention is described in the line "No charge has been read out and no date for a trial has been given"?', model: '**Preventive detention** (detention without trial).', sol: 'Held without charge or trial.', scheme: [['Preventive detention', 1]] })),
    child('b', short({ t: 2, d: 3, c: 'analysis', marks: 1, stem: 'Name the remedy the lawyer is referring to when he speaks of petitions asking the court to produce him.', model: 'A writ of **habeas corpus**.', sol: 'Habeas corpus asks a court to have a detained person produced and the detention justified.', scheme: [['Habeas corpus', 1]] })),
    child('c', short({ t: [2, 3], d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): What does the source suggest about the effect of the Emergency on ordinary citizens beyond those who were arrested?', model: 'Families lost **income** (salary stopped) and lived with **uncertainty**; neighbours spoke **quietly, as if afraid**, showing a climate of **fear** that limited free speech for everyone.', sol: 'Economic hardship and a climate of fear.', scheme: [['Effect on the family', 1], ['Wider climate of fear', 1]] }), [
      short({ t: 3, d: 3, c: 'evaluation', marks: 2, stem: '**Or** (ii): Which later constitutional change would make the situation described by the lawyer less likely today? Explain.', model: 'The **44th Amendment (1978)**: it provides that the rights under **Articles 20 and 21** (life and personal liberty) **cannot be suspended** even during an emergency, so a detained person can still approach the courts.', sol: 'Name the amendment and the safeguard for Articles 20 and 21.', scheme: [['44th Amendment', 1], ['Articles 20 and 21 protected', 1]] }),
    ]),
  ],
}));

// ================================================================ t03 Lessons; politics after the Emergency
Q('m_1977_call', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'What did the government announce in January 1977, while the Emergency was still in force?',
  opts: [
    'That Lok Sabha elections would be held in March, and many detained leaders were released',
    'That the Lok Sabha would be dissolved without elections',
    'That the 44th Amendment would be passed',
    'That the Emergency would be extended for five more years',
  ],
  sol: 'In January 1977 the Prime Minister announced elections for March, and opposition leaders were released. The 44th Amendment came later, under the Janata government, in 1978.',
}));
Q('m_janata', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'How was the Janata Party formed before the 1977 election?',
  opts: [
    'Several opposition parties, including the Congress (O), the Bharatiya Jana Sangh, the Bharatiya Lok Dal and the Socialists, came together',
    'It was a breakaway group of the Communist Party of India',
    'It was formed by the Election Commission to contest the election',
    'It was a regional party of Tamil Nadu',
  ],
  sol: 'Major non-Congress parties merged to form the Janata Party under the encouragement of JP; the Congress for Democracy, formed by leaders who left the Congress, allied with it.',
}));
Q('m_1977_result', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Which statement best describes the result of the Lok Sabha election of March 1977?',
  opts: [
    'The Congress lost power for the first time at the Centre and failed to win any seat in several northern states',
    'The Congress won its largest majority ever',
    'No party could form a government and the Emergency continued',
    'The Congress won every seat in the northern states',
  ],
  sol: 'The Janata Party and its allies won a clear majority; the Congress was routed in much of north India, though it did comparatively well in the southern states.',
}));
Q('m_pm_1977', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'Who became Prime Minister after the Janata Party won the 1977 election?',
  opts: ['Morarji Desai', 'Charan Singh', 'Jagjivan Ram', 'Jayaprakash Narayan'],
  sol: 'Morarji Desai became the first Prime Minister from outside the Congress in March 1977. Charan Singh succeeded him in 1979; Jagjivan Ram was a senior minister; JP held no office.',
}));
Q('m_janata_fall', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: 'Which of these is the most widely given reason for the fall of the Janata government in 1979?',
  opts: [
    'Lack of a common programme and rivalry among its leaders, which led to defections',
    'Its defeat in a war with a neighbouring country',
    'An order of the Supreme Court dissolving the party',
    'The President\'s refusal to sign any of its laws',
  ],
  sol: 'The Janata Party was united mainly by opposition to the Emergency; differences over leadership and policy led to splits, Morarji Desai resigned in 1979, and Charan Singh\'s short-lived government was followed by elections in 1980.',
}));
Q('m_44', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'How did the 44th Amendment (1978) change the grounds on which a national emergency can be proclaimed?',
  opts: [
    'It replaced internal disturbance with armed rebellion',
    'It added internal disturbance as a new ground',
    'It removed external aggression as a ground',
    'It allowed state governments to proclaim a national emergency',
  ],
  sol: 'After the experience of 1975, the vague phrase internal disturbance was replaced by armed rebellion, a narrower ground. War and external aggression remain.',
}));
Q('m_written_advice', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'Suppose a future Prime Minister asks the President to proclaim a national emergency without consulting the Cabinet. Under the Constitution as amended in 1978, what should happen?',
  opts: [
    'The President can act only on the written advice of the Union Cabinet, so the proclamation cannot be made on the Prime Minister\'s word alone',
    'The President must sign within one hour',
    'The Chief Justice must sign the proclamation instead',
    'The Lok Sabha Speaker can proclaim the emergency',
  ],
  sol: 'The 44th Amendment requires that the decision of the Union Cabinet be communicated to the President in writing; it also requires approval by each House of Parliament by a special majority within one month.',
}));
Q('m_south_1977', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: 'An imagined student studying the 1977 results notices that the Congress did much better in one part of the country than in the north. Which part was it?',
  opts: ['The southern states', 'The Hindi-speaking states of the north', 'Punjab and Haryana', 'Delhi'],
  sol: 'The Congress was swept out in much of north India, where the effects of the Emergency excesses were felt most, but held most of its ground in the southern states.',
}));
Q('ar_referendum', ar({
  t: 3, d: 3, c: 'analysis', key: 'a',
  a: 'The 1977 Lok Sabha election is often described as a referendum on the Emergency.',
  r: 'Opposition parties made the loss of civil liberties and the excesses of the Emergency the central issue of their campaign.',
  sol: 'Both are true and R explains A: because the campaign centred on the Emergency, voters\' choice was widely read as a verdict on it.',
}));
Q('ar_janata_term', ar({
  t: 3, d: 2, c: 'analysis', key: 'd',
  a: 'The Janata government completed its full five-year term.',
  r: 'The Janata Party was formed by the coming together of several opposition parties.',
  sol: 'A is false: the government fell in 1979 and fresh elections were held in January 1980. R is true.',
}));
Q('ar_44', ar({
  t: 3, d: 3, c: 'analysis', key: 'c',
  a: 'The 44th Amendment requires the written advice of the Union Cabinet before a national emergency is proclaimed.',
  r: 'The 44th Amendment allows the rights in Articles 20 and 21 to be suspended during an emergency.',
  sol: 'A is true. R is false: the 44th Amendment did the opposite, providing that Articles 20 and 21 cannot be suspended even in an emergency.',
}));
Q('ar_desai', ar({
  t: 3, d: 3, c: 'analysis', key: 'b',
  a: 'The Janata Party won a majority in the Lok Sabha election of 1977.',
  r: 'Morarji Desai had been a senior leader of the Congress before the party split in 1969.',
  sol: 'Both statements are true, but R does not explain A: the Janata victory came from anger at the Emergency and opposition unity, not from Morarji Desai\'s earlier career.',
}));
Q('tf_rae_bareli', tf({
  t: 3, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? In the 1977 election Indira Gandhi lost her own Lok Sabha seat.',
  sol: 'She lost the Rae Bareli seat to Raj Narain, the same opponent whose petition had led to the Allahabad verdict of 1975.',
}));
Q('fb_armed', fb({
  t: 3, d: 2, c: 'recall',
  stem: 'Since the 44th Amendment, a national emergency on internal grounds can be proclaimed only in case of armed ___.',
  acc: [['rebellion']],
  sol: 'Armed rebellion replaced internal disturbance as the internal ground.',
}));
Q('ord_after', ord({
  t: 3, d: 2, c: 'understanding', marks: 1,
  stem: 'Arrange these events after the Emergency in the correct order.',
  items: [
    'Elections are announced and opposition leaders released',
    'The Janata government takes office under Morarji Desai',
    'The 44th Amendment narrows the grounds for an emergency',
    'The Congress returns to power at the Centre',
  ],
  sol: 'January 1977 (elections announced), March 1977 (Janata government), 1978 (44th Amendment), January 1980 (Congress returns).',
}));
Q('mt_after_people', match({
  t: 3, d: 2, c: 'understanding',
  stem: 'Match each person with a role he played in the politics of 1977–79.',
  pairs: [
    ['Morarji Desai', 'First Prime Minister from outside the Congress'],
    ['Jagjivan Ram', 'Left the Congress and formed the Congress for Democracy'],
    ['J. C. Shah', 'Headed the commission of inquiry into Emergency excesses'],
    ['Charan Singh', 'Prime Minister for a few months in 1979'],
  ],
  sol: 'Desai led the Janata government from 1977; Jagjivan Ram formed the Congress for Democracy in 1977; Justice J. C. Shah, a retired Supreme Court judge, headed the Shah Commission; Charan Singh was Prime Minister briefly in 1979.',
}));
Q('s_1977_reasons', short({
  t: 3, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: 'Give two reasons why the Congress lost the Lok Sabha election of 1977.',
  model: '1. **Anger at the Emergency:** voters resented **detentions, censorship** and excesses such as **forced sterilisation** and demolitions.\n2. **Opposition unity:** most opposition parties **merged into the Janata Party**, and senior leaders who left the Congress allied with it, so anti-Congress votes were not split.',
  sol: 'Popular anger and opposition unity.',
  scheme: [['Anger at the Emergency', 1], ['Opposition unity', 1]],
}));
Q('s_lessons', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State any two lessons that Indian democracy drew from the Emergency.',
  model: '1. It is **hard to end democracy** in India: within two years the people voted out the government that had imposed the Emergency.\n2. **Ambiguities** in the emergency provisions were removed: the **44th Amendment** narrowed the grounds and added safeguards for **liberty**.',
  sol: 'Any two: resilience of democracy, tighter emergency provisions, awareness of civil liberties.',
  scheme: [['First lesson', 1], ['Second lesson', 1]],
}));
Q('s_janata_fall', short({
  t: 3, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: 'Why did the Janata government fall within about two and a half years? Give two reasons.',
  model: '1. It lacked a **common programme**: the parties had come together mainly to **oppose the Emergency**.\n2. **Rivalry among leaders** and differences over policy led to **splits and defections**, so the government lost its majority in 1979.',
  sol: 'No common programme; leadership rivalry and splits.',
  scheme: [['First reason', 1], ['Second reason', 1]],
}));
Q('s3_44', short({
  t: 3, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain three safeguards added to the emergency provisions by the 44th Amendment of 1978.',
  model: '1. **Narrower ground:** armed rebellion replaced the vague phrase internal disturbance.\n2. **Cabinet in writing:** the President can proclaim an emergency only on the **written advice of the Union Cabinet**, not of the Prime Minister alone.\n3. **Rights protected:** the rights in **Articles 20 and 21** cannot be suspended; Parliament must approve a proclamation by a **special majority within one month**.',
  sol: 'Any three safeguards: ground, written advice, approval by Parliament, Articles 20 and 21.',
  scheme: [['First safeguard', 1], ['Second safeguard', 1], ['Third safeguard', 1]],
}));
Q('s3_lessons', short({
  t: 3, d: 4, c: 'evaluation', marks: 3, wl: S3,
  stem: 'Evaluate any three lessons of the Emergency for the working of Indian democracy.',
  model: '1. **Resilience:** citizens used the vote in 1977 to reject the government, showing democracy had **deep roots**.\n2. **Constitutional safeguards:** the **44th Amendment** reduced the scope for misuse of emergency powers.\n3. **Civil liberties awareness:** new **civil liberties groups** and a more alert press and judiciary emerged; yet the experience also showed that **institutions can bend** under pressure, so they need constant vigilance.',
  sol: 'Three lessons, at least one with a qualification.',
  scheme: [['First lesson evaluated', 1], ['Second lesson evaluated', 1], ['Third lesson evaluated', 1]],
}));
Q('l_1977', long({
  t: 3, d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: 'Describe the circumstances and results of the Lok Sabha election of 1977 and explain its significance for Indian politics.',
  model: '1. **Call for elections:** in **January 1977** elections were announced and leaders released, with little time to campaign.\n2. **Opposition unity:** major parties formed the **Janata Party**; Jagjivan Ram\'s **Congress for Democracy** joined them.\n3. **Campaign:** the **Emergency excesses**, detentions and censorship were the central issue.\n4. **Result:** the Congress **lost power** at the Centre for the first time; it was routed in the north but held the south. **Morarji Desai** became Prime Minister.\n5. **Significance:** voters showed they could **punish** a government for curbing liberties; it began an era of **competitive, coalition-style** politics, though the Janata government fell in 1979.',
  sol: 'Announcement, unity, campaign, result and significance.',
  scheme: [['Announcement and timing', 1], ['Formation of the Janata Party', 1], ['Campaign issue', 1], ['Result', 1], ['Significance', 1]],
}));
Q('l_lessons', long({
  t: 3, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: 'What lessons did the Emergency teach about Indian democracy and the Constitution? Evaluate.',
  model: '1. **Democracy is resilient:** the people **voted out** the ruling party in 1977, showing a strong commitment to elections.\n2. **Ambiguities corrected:** the **44th Amendment** replaced internal disturbance with **armed rebellion** and required **written Cabinet advice**.\n3. **Liberty protected:** Articles **20 and 21** can no longer be suspended, answering the **habeas corpus** experience.\n4. **Civil society:** citizens and **civil liberties organisations** became more alert to rights.\n5. **Caution:** the period also showed that **police and administration** can be misused and courts can yield, so safeguards depend on **vigilant institutions** and citizens.',
  sol: 'Four lessons with the constitutional changes, and a qualified conclusion.',
  scheme: [['Resilience of democracy', 1], ['44th Amendment changes', 1], ['Protection of life and liberty', 1], ['Civil society and awareness', 1], ['Qualified evaluation', 1]],
}));
Q('sb_lucknow_letter', source({
  t: 3, d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the source from an imagined letter written in March 1977 by a retired postmaster in Lucknow to his granddaughter and answer the questions that follow. ${IMAG}`,
  passage: '**Letter from a retired postmaster, Lucknow (imagined), March 1977**\n\nDear Meera, the results are in, and the party that has ruled Delhi since independence has been defeated. In our state it did not win a single seat. Your grandmother says the people have spoken about the last two years: about the arrests, the newspapers that said nothing, and the officials who chased targets. The new government is made of many parties that only months ago were rivals. One old leader will be Prime Minister. I hope they remember why people voted for them, because unity built only on anger may not last.',
  parts: [
    child('a', short({ t: 3, d: 1, c: 'recall', marks: 1, stem: 'Which party formed the new government described in the letter?', model: 'The **Janata Party**.', sol: 'The Janata Party won in 1977.', scheme: [['Janata Party', 1]] })),
    child('b', short({ t: 3, d: 2, c: 'application', marks: 1, stem: 'Identify the "old leader" who became Prime Minister.', model: '**Morarji Desai**.', sol: 'Morarji Desai became Prime Minister in March 1977.', scheme: [['Morarji Desai', 1]] })),
    child('c', short({ t: 3, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Which three features of the Emergency does the grandmother refer to, as reasons for the voters\' decision?', model: '1. **Arrests** (detention of political workers).\n2. **Newspapers that said nothing** (press censorship).\n3. **Officials who chased targets** (coercive drives such as forced sterilisation).', sol: 'Map each phrase to an Emergency feature.', scheme: [['Two features correctly identified', 1], ['Third feature correctly identified', 1]] }), [
      short({ t: 3, d: 4, c: 'evaluation', marks: 2, stem: '**Or** (ii): How far did the grandfather\'s worry about "unity built only on anger" prove correct? Explain.', model: 'Largely correct: the Janata Party had **no common programme** and its leaders were rivals; **splits** brought the government down in **1979**, and the Congress returned in **1980**.', sol: 'Judge the worry against the fall of the Janata government.', scheme: [['Judgement', 1], ['Evidence from 1979–80', 1]] }),
    ]),
  ],
}));
Q('sb_inquiry_meeting', source({
  t: [3, 2], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the source from imagined minutes of a residents' meeting held in an old quarter of Delhi in 1977 and answer the questions that follow. ${IMAG}`,
  passage: '**Minutes of a residents\' meeting, an old quarter of Delhi (imagined), 1977**\n\nThe secretary reported that a commission headed by a retired judge of the Supreme Court is now hearing complaints about the period of the Emergency. Mr Qureshi said his shop had been pulled down in 1976 with two days\' notice. Mrs Bansal asked whether the commission could punish anyone; the secretary replied that it would record findings and make recommendations, and that action would be for the government and the courts. A young member proposed that the residents also join a new group that defends civil liberties, so that such things are not forgotten.',
  parts: [
    child('a', short({ t: 3, d: 1, c: 'recall', marks: 1, stem: 'Name the commission referred to in the minutes.', model: 'The **Shah Commission** (headed by Justice J. C. Shah).', sol: 'Appointed in 1977 to inquire into Emergency excesses.', scheme: [['Shah Commission', 1]] })),
    child('b', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Which controversial action of the Emergency is Mr Qureshi describing?', model: '**Demolitions** of homes and shops in Delhi carried out with little notice.', sol: 'Demolition drives in parts of Delhi.', scheme: [['Demolitions', 1]] })),
    child('c', short({ t: 3, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): What does the secretary\'s answer to Mrs Bansal tell us about the nature of a commission of inquiry?', model: 'It is a **fact-finding** body: it **hears evidence** and **records findings and recommendations**, but it **cannot punish**; any action depends on the **government and courts**.', sol: 'Fact-finding and recommending, not punishing.', scheme: [['Fact-finding role', 1], ['Cannot punish; action by others', 1]] }), [
      short({ t: 3, d: 3, c: 'evaluation', marks: 2, stem: '**Or** (ii): Why did the young member think joining a civil liberties group was important? Explain one lesson of the Emergency it reflects.', model: 'He wanted the experience **remembered** and rights **watched over by citizens**. The lesson: liberties need **active defence** by an alert **civil society**, not only by laws and courts.', sol: 'Purpose of the group and the lesson about vigilance.', scheme: [['Purpose of joining', 1], ['Lesson about civil society', 1]] }),
    ]),
  ],
}));
