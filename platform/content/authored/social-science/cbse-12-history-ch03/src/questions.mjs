// CBSE 12 History, ch03 Kinship, Caste and Class: Early Societies (c. 600 BCE-600 CE), question bank.
// Originality rules (D-036): every source, diary, teacher's note and record in this file is imagined by SOYL or
// summarised in SOYL's own words and labelled as such. No NCERT text, source box, caption, map, figure or exercise
// and no board or sample-paper item is reused or closely paraphrased. No verse or passage of the Mahabharata, the
// Manusmriti, the Dharmasutras, the Rigveda or any inscription is quoted, translated or closely paraphrased; their
// content is described in plain words only. No real person is quoted. Caste, untouchability and gender are handled
// as norms laid down in particular texts set against evidence of social reality, and debates are shown as debates.
// Places are named in words only: no map work (OA-23 pending).
import { Q, mcq, ar, tf, fb, match, ord, short, long, source, child } from '../../cbse-12-history-ch01/src/lib.mjs';

const S2 = [30, 50];
const S3 = [50, 80];
const L5 = [80, 120];
const IMAG = '*(Imagined document written by SOYL for practice; the people in it are not real, though the evidence and events in the background are.)*';
const SUM = '*(Summary written by SOYL in its own words for practice; it is not a quotation or translation of any source.)*';

// ================================================================ t01 The critical edition of the Mahabharata
Q('m_ed_inst', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'The project to prepare a critical edition of the Mahabharata was begun in 1917 at',
  opts: ['the Bhandarkar Oriental Research Institute, Pune', 'the Archaeological Survey of India, Delhi', 'Nalanda University, Bihar', 'the Asiatic Society, Kolkata'],
  sol: 'The institute at Pune was the home of the project, and V. S. Sukthankar led the work from 1919. The other bodies named were not its base.',
}));
Q('fb_ed_year', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'The critical edition of the Mahabharata was completed in the year ___ (write the year).',
  acc: [['1966']],
  sol: 'The work that began in 1917 ended in 1966, after roughly forty-seven years.',
}));
Q('m_ed_method', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'When the manuscripts they compared disagreed, which principle did the editors of the critical edition mainly follow?',
  opts: [
    'They chose verses that were common to most of the versions',
    'They kept the longest version, since it was the most complete',
    'They kept only manuscripts from the region of the editors',
    'They kept the newest verses, since these reflected the latest ideas',
  ],
  sol: 'Giving weight to what most versions share is the idea behind a critical edition. Length, place of origin and novelty were not the tests.',
}));
Q('m_ed_findings', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'What did the manuscripts studied for the critical edition suggest about the Mahabharata in different parts of the subcontinent?',
  opts: [
    'A common core of the story with many regional variations',
    'An identical text everywhere, without any difference',
    'Wholly unrelated stories in each region',
    'A single manuscript from which every other copy had been made',
  ],
  sol: 'Copies from distant regions agreed on much of the story but differed in many details, which points to a story reshaped as it moved through different societies.',
}));
Q('m_ed_weaken', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: 'The editors reported a core of verses shared by manuscripts from many regions. Which later discovery would most weaken the claim that this core shows a story known widely across the subcontinent?',
  opts: [
    'The shared verses occur only in copies descended from one model text kept at a single centre',
    'More manuscripts turn up that contain extra regional episodes',
    'Some of the manuscripts are written in different scripts',
    'A scholar publishes a short summary of the epic',
  ],
  sol: 'A core that comes from one source copied again and again would show copying, not wide knowledge. Extra episodes add to the variations, scripts do not alter the verses, and a summary adds no evidence about the manuscripts.',
}));
Q('m_ed_case', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'An imagined scholar compares 40 manuscripts of a Sanskrit poem from five regions. One verse appears in 34 of them; in the other six, all from a single region, a different verse stands in its place. Following the method of the critical edition, how should the scholar treat the two verses?',
  opts: [
    'Put the widely found verse in the main text and record the other region\'s verse as a variation',
    'Leave out both verses because the manuscripts disagree',
    'Keep the other region\'s verse because it differs from the rest',
    'Keep a verse only if a manuscript from the scholar\'s own region has it',
  ],
  sol: 'Weight goes to what most versions share, while the minority reading stays on record as evidence of regional variation. Nothing in the method calls for dropping both or favouring the scholar\'s home region.',
}));
Q('m_ed_question', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Which question could a historian best answer by studying the variant readings that the editors recorded?',
  opts: [
    'In which respects regional tellings of the epic differed from the common core',
    'How many soldiers took part in the battle described in the epic',
    'Which of the epic\'s characters were real persons',
    'What the weather was on the day of an event in the story',
  ],
  sol: 'Variant readings are a trace of how the text changed from place to place. They cannot supply troop numbers, prove that characters existed or report the weather.',
}));
Q('tf_ed', tf({
  t: 1, d: 1, c: 'understanding', ans: false,
  stem: 'True or false? The critical edition showed that the Mahabharata had been passed on in exactly the same form in every region.',
  sol: 'The manuscripts agreed on a common core but also carried many regional variations.',
}));
Q('ar_ed', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'The critical edition of the Mahabharata does not claim to give the text exactly as it was first composed.',
  r: 'All the manuscripts available to the editors were later copies, and the editors selected among them by comparison.',
  sol: 'Working only from surviving later copies and choosing between them means that the result is the best-supported text from those copies. It cannot reach back to the first composition, so the second statement is the reason for the first.',
}));
Q('ord_edition', ord({
  t: [1, 4], d: 2, c: 'understanding', marks: 1,
  stem: 'Arrange these events in chronological order.',
  items: [
    'The critical edition project begins at Pune',
    'V. S. Sukthankar takes charge of the project',
    'B. B. Lal excavates at Hastinapur',
    'The critical edition is completed',
  ],
  sol: 'The project began in 1917, Sukthankar took charge in 1919, Lal dug at Hastinapur in 1951 and 1952, and the edition was completed in 1966.',
}));
Q('ord_period', ord({
  t: 3, d: 2, c: 'understanding', marks: 1,
  stem: 'Arrange these developments in chronological order.',
  items: [
    'The Mahabharata begins to take shape',
    'The Shaka ruler Rudradaman repairs the Sudarshana lake',
    'Silk weavers build a temple recorded at Mandasor',
    'Xuan Zang travels in India',
  ],
  sol: 'The epic began to take shape from about 500 BCE, Rudradaman ruled in the second century CE, the Mandasor record belongs to the fifth century CE, and Xuan Zang travelled in the seventh century CE.',
}));
Q('s_ed_steps', short({
  t: 1, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: 'An imagined editor prepares an edition by the critical-edition method but has only three manuscripts, all from one region. Explain two ways in which this would weaken the result.',
  model: '(1) A **core chosen from one region** may be only a regional reading, and the **variations of other regions would be missing**, so the edition could not show how the story differed across the subcontinent. (2) The three copies may **share one scribal source**, so their agreement would count for little.',
  sol: 'One weakness about regional coverage and one about the independence of the copies.',
  scheme: [['Core may be regional; other variations missing', 1], ['Copies may share one scribal source', 1]],
}));
Q('s_ed_claim', short({
  t: 1, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: 'A student writes: Because the manuscripts differed from region to region, the critical edition proved that regional versions are worthless. What is partly right and what is wrong in this claim?',
  model: '**Partly right:** regional additions were not placed in the main text, since they were not common to most versions. **Wrong:** the variations were recorded and are useful evidence of how the story changed in different societies, so they are far from worthless.',
  sol: 'What the claim gets right about the main text, and what it gets wrong about the variations.',
  scheme: [['Partly right: not in the main text', 1], ['Wrong: variations are evidence', 1]],
}));
Q('s3_ed', short({
  t: 1, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Why is the critical edition of the Mahabharata important for historians? Give three reasons.',
  model: '(1) It offers a **dependable base text**, prepared by comparing many manuscripts and not trusting a single copy. (2) The shared core suggests a **story that travelled widely** across the subcontinent. (3) The recorded **regional variations** show how different places shaped the story, and that the Brahmanical norms were not followed everywhere.',
  sol: 'Reliability of the text, evidence of spread, and evidence of regional difference.',
  scheme: [['A dependable base text', 1], ['A common core across regions', 1], ['Variations show regional shaping', 1]],
}));
Q('l_dynamic', long({
  t: [1, 4], d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Explain how the critical edition and the study of language, content, author and date help historians to see the Mahabharata as a dynamic text.',
  model: '1. **Critical edition:** comparing manuscripts revealed a common core and many regional variations, so the text changed as it travelled.\n2. **Language:** the Sanskrit is simpler than that of the Vedas, suggesting a wider audience.\n3. **Content:** narrative and didactic sections sit together, which hints at additions by different hands.\n4. **Author and date:** tradition names Vyasa, but historians think sutas composed it first and Brahmanas later added material, over about a thousand years from c. 500 BCE.\n5. **Retellings:** it was retold in many languages, oral and written, so it never stopped growing.',
  sol: 'Edition, language, content, author with date, and later retellings each earn a mark.',
  scheme: [['Critical edition: core and variations', 1], ['Language', 1], ['Content: narrative and didactic', 1], ['Author and date', 1], ['Retellings keep it dynamic', 1]],
}));
Q('sb_diary', source({
  t: [1, 5], d: 4, c: 'application', origin: 'soyl-original',
  stem: `Read the source from the imagined diary of a manuscript collector and answer the questions that follow. ${IMAG}`,
  passage: '**Diary of a manuscript collector (imagined), third month of the tour**\n\nIn the first town, the temple library showed me a palm-leaf copy of the epic, and I copied out its council scene before the war. In the second town, a copy in a different script held the same scene, with one extra episode of eleven verses about a local hero. A third copy, from a town far to the south, again had the same scene and also the extra episode, though its keeper told me that its scribes belonged to the same family of copyists as those of the second town. In my register I have marked the verses found in all three copies, those found in two, and those found in one only. The oldest-looking leaves, in the first town, are themselves copied from an earlier leaf, as the scribe\'s note admits.',
  parts: [
    child('a', short({ t: 1, d: 1, c: 'recall', marks: 1, stem: 'Which scene is found in all three copies?', model: 'The **council scene before the war**.', sol: 'The first two sentences of the passage mention it.', scheme: [['Council scene named', 1]] })),
    child('b', short({ t: 1, d: 3, c: 'analysis', marks: 1, stem: 'The keeper says the third copy came from the same family of copyists as the second. What does this suggest about the agreement of those two copies on the extra episode?', model: 'They may **not be independent witnesses**; both may repeat one scribal tradition, so their agreement is weaker evidence.', sol: 'Shared scribes mean shared source, which reduces the weight of agreement.', scheme: [['Not independent: one scribal tradition', 1]] })),
    child('c', short({ t: 1, d: 3, c: 'application', marks: 2, stem: '**Either** (i): Give two reasons why an editor would still record the extra episode in the notes, even if it is kept out of the main text.', model: '(1) It is **evidence of regional variation**, showing what a local audience liked to hear. (2) It may help to trace **how the text was copied and spread**, for example along a scribal family.', sol: 'Two uses of a recorded variant, drawn from the register in the diary.', scheme: [['Evidence of regional variation', 1], ['Helps trace copying and spread', 1]] }),
    [short({ t: 1, d: 3, c: 'application', marks: 2, stem: '**Or** (ii): Suggest two further steps the collector could take to judge whether the extra episode belongs to the common core.', model: '(1) **Collect copies from other regions** and other scribal families to see whether the episode appears there as well. (2) **Compare the leaves** of the copies for age and origin, to check which are copies of the same earlier leaf.', sol: 'Two steps that widen or test the evidence.', scheme: [['Copies from other regions and families', 1], ['Compare age and origin of leaves', 1]] })]),
  ],
}));

// ================================================================ t02 Kinship, marriage rules and gotra
Q('m_patri', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'Descent traced from father to son, and then to the son\'s son, is called',
  opts: ['patriliny', 'matriliny', 'exogamy', 'endogamy'],
  sol: 'Matriliny traces descent through the mother, while exogamy and endogamy are rules about whom one may marry.',
}));
Q('m_exo', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'In an imagined community a person must marry outside their own clan but within their own jati. Which description fits this rule?',
  opts: [
    'Exogamy in relation to the clan and endogamy in relation to the jati',
    'Endogamy in relation to both the clan and the jati',
    'Exogamy in relation to both the clan and the jati',
    'Polygyny in relation to the clan and polyandry in relation to the jati',
  ],
  sol: 'Check each unit separately: marrying outside the clan is exogamy, marrying inside the jati is endogamy. The last option confuses marriage units with the number of spouses.',
}));
Q('m_gotra_rule', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'According to the Brahmanical practice of gotra, what was expected of a woman after marriage?',
  opts: [
    'She was to give up her father\'s gotra and adopt her husband\'s',
    'She was to keep her father\'s gotra and take no other',
    'She was to take her mother\'s gotra',
    'She was to belong to no gotra',
  ],
  sol: 'The rule moved a bride from her father\'s gotra into that of her husband. A second rule barred marriage between members of one gotra.',
}));
Q('m_forms', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'The Dharmashastras recognised eight forms of marriage. How did they rank these forms?',
  opts: [
    'The first four were regarded as good and the rest were condemned',
    'All eight were praised equally',
    'Only the last four were permitted',
    'Only one form was allowed for Brahmanas',
  ],
  sol: 'The texts drew a line after the fourth form; the remaining ones were criticised.',
}));
Q('m_sat_endog', mcq({
  t: 2, d: 4, c: 'analysis',
  stem: 'Names such as Gotami and Vasithi, taken from fathers\' gotras, are read as showing that some Satavahana queens kept a link with their natal families. Which finding would most weaken this reading?',
  opts: [
    'Evidence that the royal court gave every queen such a fixed name at marriage, whoever her father was',
    'Evidence that other queens of the same dynasty also bore names from their fathers\' gotras',
    'A donation record in which a queen names her husband',
    'A record in which a king is named after his mother',
  ],
  sol: 'If the name was assigned by the court regardless of her father, it tells us nothing about her natal ties. The other findings either support the reading or concern different questions.',
}));
Q('m_metro', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'An imagined dynasty\'s records name four rulers, each by a name taken from his mother, such as Kausiki-putra and Vasishthi-putra. Each record also says that the ruler came to the throne after his father. Which conclusion is best supported?',
  opts: [
    'Naming a king after his mother did not mean that the throne passed through the mother',
    'Mothers held the throne in this dynasty and kings only ruled in their name',
    'The dynasty followed matriliny in all matters',
    'Fathers were not mentioned in any of the records',
  ],
  sol: 'The naming custom and the rule of succession are separate matters. The records show succession from father to son, whatever name the king carried.',
}));
Q('m_succession', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'In an imagined ruling family, inscriptions record seven successions: five from father to son, one from brother to brother and one from a king to his sister\'s son. What does this best suggest?',
  opts: [
    'Patriliny was the usual rule of succession, with occasional departures',
    'Matriliny was the usual rule, with occasional departures',
    'There was no rule of succession at all',
    'Only brothers could succeed',
  ],
  sol: 'Count each pattern: five of seven follow the father-to-son line, so that is the norm, while the other two show that exceptions occurred.',
}));
Q('tf_poly', tf({
  t: 2, d: 1, c: 'understanding', ans: false,
  stem: 'True or false? Polyandry means a man having several wives at the same time.',
  sol: 'That practice is polygyny. Polyandry is a woman having several husbands at the same time.',
}));
Q('fb_kanya', fb({
  t: 2, d: 1, c: 'recall',
  stem: 'The gift of a daughter in marriage, regarded as an important duty of a father, is called ___.',
  acc: [['kanyadana', 'kanya dana', 'kanya-dana']],
  sol: 'The word is kanyadana, meaning the giving away of a daughter.',
}));
Q('mt_kin', match({
  t: 2, d: 1, c: 'recall',
  stem: 'Match each term for marriage rules and customs with its meaning.',
  pairs: [
    ['Exogamy', 'Marriage outside a defined group'],
    ['Endogamy', 'Marriage within a defined group'],
    ['Polygyny', 'A man having several wives at once'],
    ['Polyandry', 'A woman having several husbands at once'],
  ],
  sol: 'Each term is defined by the group or the number of spouses involved.',
}));
Q('ar_gotra', ar({
  t: 2, d: 3, c: 'analysis', verdict: 'both-true-not-explains',
  a: 'Brahmanical texts expected a woman to change her gotra when she married.',
  r: 'The inscriptions of some Satavahana queens use names derived from their fathers\' gotras.',
  sol: 'Both statements are true, but the second does not give a reason for the first. It records a departure from the expectation, not its source.',
}));
Q('ar_patri', ar({
  t: 2, d: 2, c: 'understanding', verdict: 'A-true-R-false',
  a: 'From about the sixth century BCE, patriliny became the ideal in ruling families.',
  r: 'There is no evidence that any woman exercised power in the ruling families of this long period.',
  sol: 'The first statement is accurate. The second is false: women such as Prabhavati Gupta are known to have held power and resources.',
}));
Q('s_gotra', short({
  t: 2, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'Two imagined betrothals: Meera of the Atri gotra is to marry Ravi, also of the Atri gotra; Leela of the Atri gotra is to marry Hari of the Vasishtha gotra. Applying the Brahmanical rules of gotra, which match was not permitted, and in which gotra would Leela be counted after her marriage?',
  model: 'The match of **Meera and Ravi** was **not permitted**, since members of the **same gotra** could not marry. After marrying Hari, **Leela** would be counted in his **Vasishtha gotra**, because a bride was expected to give up her father\'s gotra.',
  sol: 'The rule against same-gotra marriage and the rule on the bride\'s change of gotra.',
  scheme: [['Meera and Ravi not permitted, with the rule', 1], ['Leela counted in the Vasishtha gotra', 1]],
}));
Q('s_sat_inf', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'In imagined inscriptions, Queen A bears a name taken from her father\'s gotra, while Queen B bears a name taken from her husband\'s gotra. Which queen\'s name fits the Brahmanical rule, and what might the other name suggest?',
  model: '**Queen B\'s** name fits the rule that a bride took her **husband\'s gotra**. **Queen A\'s** name, from her father\'s gotra, suggests that she **kept her natal identity**, a departure from the rule, as with some Satavahana queens.',
  sol: 'Match each name to the rule and read the departure.',
  scheme: [['Queen B fits the rule', 1], ['Queen A suggests a departure', 1]],
}));
Q('s_poly', short({
  t: 2, d: 1, c: 'understanding', marks: 2, wl: S2,
  stem: 'Distinguish between polygyny and polyandry, and name the best-known example of polyandry in the Mahabharata.',
  model: '**Polygyny** is a man having several wives at the same time; **polyandry** is a woman having several husbands at the same time. The epic\'s best-known example is **Draupadi\'s marriage to the Pandavas**, which historians explain in different ways.',
  sol: 'Two definitions and the example.',
  scheme: [['Both terms defined', 1], ['Draupadi and the Pandavas, with the debate noted', 1]],
}));
Q('s3_kin', short({
  t: 2, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'An imagined inscription records the gift of a queen, daughter of a man of the Kashyapa gotra and wife of a king of the Bharadvaja gotra. It names her son, the next ruler, with a name taken from hers, and says that he succeeded his father. Point out two respects in which the record departs from Brahmanical norms and one in which it fits a norm.',
  model: '(1) The queen is known by her **father\'s gotra**, not her husband\'s, which departs from the rule that a bride adopted her husband\'s gotra. (2) The son\'s **name from his mother** is a metronymic, unlike the usual naming through the father. (3) The son **succeeded his father**, which fits the **patrilineal** norm.',
  sol: 'Two departures in gotra and naming, and one match in succession.',
  scheme: [['Father\'s gotra kept', 1], ['Metronymic', 1], ['Succession from father fits patriliny', 1]],
}));
Q('l_kin', long({
  t: 2, d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: 'How far was patriliny the rule in the ruling families of early India? Weigh the evidence on both sides.',
  model: '1. **The norm:** patriliny became the ideal from about the sixth century BCE, and the epic presents succession from father to son as usual.\n2. **Exceptions:** brothers sometimes succeeded.\n3. **Women with power:** Prabhavati Gupta exercised authority and had access to resources.\n4. **Satavahana evidence:** metronymics and queens\' names from fathers\' gotras show other customs in naming and marriage, but succession stayed usually patrilineal.\n5. **Judgement:** patriliny was the dominant rule of succession, though not the only practice, and naming and marriage customs varied.',
  sol: 'Norm, exceptions, women in power, Satavahana evidence, and a measured judgement.',
  scheme: [['The norm of patriliny', 1], ['Exceptions in succession', 1], ['Women who held power', 1], ['Satavahana naming and gotra evidence', 1], ['Reasoned judgement', 1]],
}));
Q('l_marriage', long({
  t: 2, d: 2, c: 'understanding', marks: 5, wl: L5,
  stem: 'Describe the rules and forms of marriage found in the sources for early Indian societies.',
  model: '1. **Exogamy and endogamy:** marriage outside or within a defined group, such as a clan or a jati.\n2. **Polygyny and polyandry:** a man with several wives, and a woman with several husbands, as in Draupadi\'s marriage to the Pandavas.\n3. **Eight forms:** the Dharmashastras recognised eight forms, the first four being called good and the rest condemned.\n4. **Kanyadana:** the gift of a daughter, an important duty of a father.\n5. **Gotra:** members of one gotra could not marry, and a bride adopted her husband\'s gotra.',
  sol: 'Exogamy and endogamy, plural marriage, eight forms, kanyadana and gotra.',
  scheme: [['Exogamy and endogamy', 1], ['Polygyny and polyandry', 1], ['Eight forms ranked', 1], ['Kanyadana', 1], ['Gotra rules', 1]],
}));
Q('sb_inscr', source({
  t: [2, 5], d: 3, c: 'application', origin: 'soyl-original',
  stem: `Read the source, an imagined donation record described in SOYL's words, and answer the questions that follow. ${IMAG}`,
  passage: '**A donation record cut on a cave wall (imagined)**\n\nThe record says that a queen named Kausiki, a name formed from her father\'s gotra, gave a rock-cut water cistern to a group of monks. It describes her as the wife of the late King Veerasena and mother of the reigning king, Kausiki-putra Rudra, who ruled after his father\'s death. The record adds that King Veerasena himself belonged to the Kausika gotra. It does not say how the queen came to hold the resources for the gift.',
  parts: [
    child('a', short({ t: 2, d: 1, c: 'recall', marks: 1, stem: 'What did the queen give to the monks?', model: 'A **rock-cut water cistern**.', sol: 'The first sentence of the passage names the gift.', scheme: [['Cistern named', 1]] })),
    child('b', short({ t: 2, d: 3, c: 'application', marks: 1, stem: 'The reigning king bears a name taken from his mother. Why does the record still not show that the throne passed through the mother?', model: 'It says he **ruled after his father\'s death**, so the throne passed from father to son; the name does not decide succession.', sol: 'Separate the king\'s name from the way he came to power.', scheme: [['Ruled after his father: succession from father', 1]] })),
    child('c', short({ t: 2, d: 3, c: 'application', marks: 2, stem: '**Either** (i): Give two ways in which this record differs from Brahmanical rules about gotra and marriage.', model: '(1) The queen is known by her **father\'s gotra** and not by her husband\'s, although a bride was expected to adopt her husband\'s gotra. (2) She and her husband belonged to the **same gotra**, although members of one gotra could not marry.', sol: 'The two departures in the record.', scheme: [['Father\'s gotra kept', 1], ['Husband and wife in the same gotra', 1]] }),
    [short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Give two reasons why historians should not conclude from this record alone that every queen of the dynasty followed the same customs.', model: '(1) It describes **one queen**, a very small sample of a dynasty that ruled for generations. (2) A donation record was made for a **particular purpose**, so it names only what suited that gift and may omit other customs.', sol: 'Two cautions about generalising from a single record.', scheme: [['One queen is a small sample', 1], ['Purpose of the record shapes what it says', 1]] })]),
  ],
}));

// ================================================================ t03 Social differences: varna, jati and the Brahmanical ideal
Q('m_varna_duty', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'According to the Dharmasutras and Dharmashastras, which varna was expected to serve the three higher varnas?',
  opts: ['Shudras', 'Vaishyas', 'Kshatriyas', 'Brahmanas'],
  sol: 'Service was the duty assigned to the fourth varna. The others had duties such as study, protection and trade.',
}));
Q('m_enforce', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: 'Why might Brahmanical authors have advised kings to enforce the varna order instead of simply describing it?',
  opts: [
    'Many people did not follow the order in practice, so it needed enforcement to become a reality',
    'Kings had themselves written the Dharmashastras',
    'The order was already followed by everyone without exception',
    'Kings were required to be Brahmanas',
  ],
  sol: 'Advice to enforce a rule implies that it was not yet universally kept. If everyone already followed it, enforcement would be pointless, and the other options state things that are not true.',
}));
Q('m_nonksh_new', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'A historian studies an imagined list of rulers. P was born in a Brahmana family and founded a dynasty; Q came from a Central Asian people regarded by Brahmanas as outsiders; R belonged to an old Kshatriya clan. Which rulers are counter-examples to the rule that kings should be Kshatriyas?',
  opts: ['P and Q', 'R only', 'P only', 'None of them'],
  sol: 'Test each ruler against the rule: R fits it, while P and Q do not. Both therefore count as counter-examples.',
}));
Q('m_jati_case', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Which of these groups would historians most readily call a jati?',
  opts: [
    'A hereditary community of oil-pressers living in many towns, sharing an occupation',
    'All the rulers who belonged to one dynasty',
    'The four-fold divisions described in the Dharmashastras',
    'A caravan of travellers heading for a pilgrimage',
  ],
  sol: 'A jati was a hereditary group, usually with a shared occupation, whose number was not fixed. The four-fold divisions are varnas, and a dynasty or a caravan is not an occupational community.',
}));
Q('m_guild', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: 'The Mandasor record tells of silk weavers who moved from Lata and paid for a temple to the sun god. Which conclusion goes beyond what this record can support?',
  opts: [
    'Silk weavers everywhere in the subcontinent held the same rank in society',
    'The weavers had pooled their resources as a group',
    'The weavers had migrated from Lata',
    'The weavers chose to spend on a temple',
  ],
  sol: 'The record concerns one guild in one place. Pooling money, migration and the gift are things it reports, but it cannot show the rank of silk weavers across the subcontinent.',
}));
Q('m_source_fit', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: 'A historian wants to know which occupations people really followed in the towns of a region in the fifth century CE. Which source would be most useful?',
  opts: [
    'Inscriptions recording donations by guilds of craft workers',
    'A Dharmashastra\'s list of duties for each varna',
    'A hymn of the Rigveda on the origin of the varnas',
    'A king\'s claim that he descended from a famous dynasty',
  ],
  sol: 'Guild records show what groups actually did and could afford. A normative text states what authors wished, a hymn gives an origin story, and a royal claim serves the king\'s image.',
}));
Q('m_weaken_varna', mcq({
  t: 3, d: 4, c: 'analysis',
  stem: 'A historian argues that the Brahmanical rules on occupations were followed closely in an imagined town. Which finding would most weaken this argument?',
  opts: [
    'Land and trade records listing Brahmana families in business and Kshatriya families farming',
    'A record of a Brahmana family performing a sacrifice',
    'A record of a Vaishya family trading in grain',
    'A record of a king settling a dispute',
  ],
  sol: 'The rules assigned trade and farming to the Vaishyas, so Brahmana traders and Kshatriya farmers would contradict them. The other records match the duties laid down.',
}));
Q('tf_untouch', tf({
  t: 3, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? The Manusmriti laid down restrictions on the chandalas, and the Chinese pilgrims Fa Xian and Xuan Zang noted that they had to live outside towns.',
  sol: 'Both the text and the travellers\' accounts record this treatment of people placed at the bottom of society.',
}));
Q('mt_varna', match({
  t: 3, d: 2, c: 'recall',
  stem: 'Match each varna with the duties assigned to it in the Dharmashastras.',
  pairs: [
    ['Brahmanas', 'Study and teach the Vedas, perform sacrifices, give and receive gifts'],
    ['Kshatriyas', 'Warfare, protecting people and administering justice'],
    ['Vaishyas', 'Agriculture, pastoralism and trade'],
    ['Shudras', 'Service to the three higher varnas'],
  ],
  sol: 'Each varna had a set of duties laid down in the texts.',
}));
Q('ar_varna_weak', ar({
  t: 3, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'The Mauryan dynasty cannot, on its own, settle whether kings had to be Kshatriyas.',
  r: 'Buddhist texts describe the Mauryas as Kshatriyas, while some Brahmanical texts describe them as of low origin.',
  sol: 'When sources disagree about a dynasty\'s origin, the case cannot decide the question by itself. The disagreement is exactly why the assertion holds.',
}));
Q('ar_jati', ar({
  t: 3, d: 2, c: 'understanding', verdict: 'both-true-not-explains',
  a: 'The number of jatis was not fixed.',
  r: 'The Dharmashastras described an order of four varnas.',
  sol: 'Both are true. The four-fold order describes varnas, not jatis, so it does not explain why jatis could grow in number.',
}));
Q('s_jati', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Distinguish between varna and jati in two points.',
  model: '(1) The texts set out **four** varnas as a fixed order, whereas the number of **jatis was not fixed**, and new groups such as forest peoples and craft guilds could be classed as jatis. (2) Varnas were defined by **assigned duties**, while members of a jati usually shared an **occupation**.',
  sol: 'Fixed against open numbers, and duties against shared occupation.',
  scheme: [['Number: fixed against open', 1], ['Basis: duties against shared occupation', 1]],
}));
Q('s_guild', short({
  t: 3, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'A newly found inscription from an imagined town records that a guild of oil-pressers, who had come from another region, paid for a shrine. State one inference about the guild and one thing the inscription cannot tell us.',
  model: 'The guild was an **organised group of one occupation** that had **migrated** and had **enough wealth** to fund a public shrine. The inscription **cannot tell us** how others ranked the group in society or how the guild was run.',
  sol: 'One inference and one limit.',
  scheme: [['One inference', 1], ['One limit', 1]],
}));
Q('s3_strategies', short({
  t: 3, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Describe three strategies used by Brahmanas to enforce the varna order.',
  model: '(1) They said that the order was of **divine origin**, citing a hymn of the Rigveda that traced the varnas to a divine source. (2) They advised **kings** to uphold the order in their kingdoms. (3) They tried to persuade people that **status was fixed by birth**.',
  sol: 'Divine origin, advice to kings, and birth as the basis of status.',
  scheme: [['Divine origin claimed', 1], ['Kings advised to enforce it', 1], ['Status by birth', 1]],
}));
Q('s3_claim', short({
  t: 3, d: 4, c: 'analysis', marks: 3, wl: S3,
  stem: 'An imagined king\'s inscription says that he belonged to a Kshatriya line, but a text composed by his rivals says that his family was of low birth. How should a historian treat the two claims? Give three points.',
  model: '(1) Both are **claims by interested parties**: a king gains by a high status, and rivals gain by lowering it. (2) Neither can be accepted alone; the historian asks **who made it, for whom and when**. (3) **Independent evidence**, such as other inscriptions, coins or neutral accounts, would help to decide.',
  sol: 'Interest, questions to ask of a source, and the need for independent evidence.',
  scheme: [['Both claims are interested', 1], ['Ask who, for whom and when', 1], ['Independent evidence needed', 1]],
}));
Q('s3_outside', short({
  t: 3, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Who stood outside the varna system, and how were the chandalas treated according to the texts and observers?',
  model: '(1) **Forest peoples, nomads** and speakers of **non-Sanskritic languages** (mlechchhas) stood outside the order. (2) **Chandalas** were placed at the very bottom and given tasks such as handling corpses; the Manusmriti set restrictions on them. (3) **Fa Xian and Xuan Zang** noted that they had to live outside towns. This was an unjust practice, which Article 17 of the Constitution abolishes.',
  sol: 'Groups outside the order, the treatment recorded in the texts, and the observers.',
  scheme: [['Groups outside the system', 1], ['Chandalas at the bottom, with restrictions', 1], ['Pilgrims\' observations', 1]],
}));
Q('l_varna', long({
  t: 3, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: 'To what extent does the evidence of rulers of different backgrounds show that the Brahmanical varna order was not followed in practice?',
  model: '1. **The ideal:** the texts gave rule and warfare to Kshatriyas.\n2. **Against it:** the Shungas and Kanvas were Brahmanas, and the Shakas, called mlechchhas by Brahmanas, produced Rudradaman, who repaired the Sudarshana lake.\n3. **Disputed cases:** the Mauryas are called Kshatriya in Buddhist texts but low-born in some Brahmanical ones.\n4. **A limit:** a Satavahana ruler still used varna ideas, claiming to be a unique Brahmana, which shows that the ideal shaped how rulers presented themselves.\n5. **Judgement:** the order was widely known but not binding on rulers, so practice often differed from it.',
  sol: 'The ideal, rulers who contradict it, disputed cases, a limit on the claim and a judgement.',
  scheme: [['The ideal order', 1], ['Rulers who departed from it', 1], ['Disputed cases such as the Mauryas', 1], ['A limit: varna ideas still shaped claims', 1], ['Reasoned judgement', 1]],
}));
Q('sb_varna', source({
  t: [3, 5], d: 4, c: 'analysis', origin: 'soyl-original',
  stem: `Read the source from an imagined history teacher's notes and answer the questions that follow. ${IMAG}`,
  passage: '**A history teacher\'s notes for revision (imagined)**\n\nToday\'s text is a Dharmashastra. It says that Brahmanas should study, teach and accept gifts, and that farming, herding and trade belong to the Vaishyas. It also tells the king to punish those who leave the duties of their varna. I then set beside it a guild inscription of the fifth century CE from a town in the west. Its guild of weavers paid for a temple, and it records, with pride, that some members had once followed other callings such as archery before taking up weaving. The inscription is silent on how the town\'s other groups regarded the guild.',
  parts: [
    child('a', short({ t: 3, d: 1, c: 'recall', marks: 1, stem: 'Which varna does the Dharmashastra in the notes assign to farming, herding and trade?', model: 'The **Vaishyas**.', sol: 'The second sentence of the passage names them.', scheme: [['Vaishyas', 1]] })),
    child('b', short({ t: 3, d: 3, c: 'analysis', marks: 1, stem: 'What does the guild inscription suggest about whether people always kept to the occupation prescribed for their varna?', model: 'It suggests they **did not always**: members had taken up weaving after **other callings**, so occupations could change.', sol: 'Infer from the members\' earlier callings.', scheme: [['Occupations could change, not always kept', 1]] })),
    child('c', short({ t: 3, d: 4, c: 'analysis', marks: 2, stem: '**Either** (i): Give one use and one limit of the Dharmashastra, and one use and one limit of the inscription, as evidence for social life. Answer in two short points.', model: '(1) The **Dharmashastra** shows what its authors wished society to be, but it does not show what people did. (2) The **inscription** shows what a guild actually did and could pay for, but it speaks for one group in one town and not for society as a whole.', sol: 'Use and limit of each source.', scheme: [['Dharmashastra: use and limit', 1], ['Inscription: use and limit', 1]] }),
    [short({ t: 3, d: 4, c: 'analysis', marks: 2, stem: '**Or** (ii): A student says that the inscription proves the Dharmashastra was ignored everywhere. Give two reasons why this goes too far.', model: '(1) The inscription describes **one guild in one town**, so it cannot show practice everywhere. (2) A change of calling does not show that the **idea of varna** was rejected; the guild\'s members may still have accepted it.', sol: 'Two reasons: sample size and the difference between practice and belief.', scheme: [['One guild, one town', 1], ['Practice differing from a norm is not rejection of it', 1]] })]),
  ],
}));

// ================================================================ t04 Beyond birth: property, status and the epic as a dynamic text
Q('m_stridhana', mcq({
  t: 4, d: 1, c: 'recall',
  stem: 'Gifts that a woman received at her marriage, which her children could inherit without her husband having a claim, were called',
  opts: ['stridhana', 'kanyadana', 'gotra', 'vamsha'],
  sol: 'Kanyadana is the giving of a daughter, gotra a classification by seer, and vamsha a lineage.',
}));
Q('m_manu_share', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'According to the Manusmriti, how was a father\'s estate to be divided after the death of both parents?',
  opts: [
    'Equally among the sons, with a special share for the eldest',
    'Equally among all sons and daughters',
    'Entirely to the eldest son',
    'To the king of the land',
  ],
  sol: 'Daughters had no claim to this estate under the text, but they could keep what they received at marriage.',
}));
Q('m_property_case', mcq({
  t: 4, d: 3, c: 'application',
  stem: 'An imagined family follows the rule of the Manusmriti. After the deaths of both parents, three sons and two daughters survive. Besides land and cattle, each daughter had received ornaments at her marriage. Which outcome matches the rule?',
  opts: [
    'The sons divide the land and cattle, the eldest receiving a special share, and each daughter keeps her marriage gifts',
    'The land is divided equally among all five children',
    'The daughters inherit the land and the sons keep the ornaments',
    'The eldest daughter takes the whole estate',
  ],
  sol: 'Apply the two parts of the rule separately: the family estate goes to the sons, and a woman\'s marriage gifts remain hers.',
}));
Q('m_land_inscr', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'An imagined inscription records that a king\'s daughter gave a village to a monastery from lands under her control. What can historians reasonably conclude?',
  opts: [
    'Some women of the ruling class could control resources such as land, though this does not show what most women could do',
    'All women of the period could give land freely',
    'The rules of the Manusmriti on property were never written down',
    'Queens ruled every kingdom of the period',
  ],
  sol: 'One record shows what was possible for a woman of high rank. It cannot show the position of women in general, nor does it contradict the existence of written rules.',
}));
Q('m_buddhist_view', mcq({
  t: 4, d: 1, c: 'understanding',
  stem: 'How did Buddhist teachings treat social differences?',
  opts: [
    'They recognised differences but did not regard them as natural or fixed',
    'They denied that any differences existed',
    'They held that status was fixed by birth',
    'They told rulers to enforce the four varnas',
  ],
  sol: 'The Buddhist view accepted that differences existed but rejected claims of status by birth and treated them as made by human arrangements.',
}));
Q('m_hastinapur', mcq({
  t: 4, d: 3, c: 'analysis',
  stem: 'B. B. Lal found traces of a settlement at the village of Hastinapur in 1951 and 1952. Which further finding would best support identifying it with the epic\'s Hastinapura?',
  opts: [
    'An inscription of the period, found at the site, using the epic\'s name for the city',
    'Pottery of the same kind found at many other villages',
    'A folk version of the epic that mentions the city',
    'The fact that the village bears the name today',
  ],
  sol: 'A dated record naming the city on the spot is direct evidence. Common pottery shows only a culture, folk tales are late retellings, and a modern name may have been adopted later.',
}));
Q('tf_hastinapur', tf({
  t: 4, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? The excavation by B. B. Lal at Hastinapur has settled that the site was the city described in the epic.',
  sol: 'The dig showed a settlement, but whether it is the epic\'s Hastinapura is still debated.',
}));
Q('m_text_date', mcq({
  t: 4, d: 3, c: 'application',
  stem: 'Three passages of an imagined epic-type poem: P describes bards and charioteers narrating a war; Q gives a long set of teachings on duties; R presents a hero as a form of Vishnu. Which passage gives the best clue to a date after about 200 BCE?',
  opts: [
    'R, because worship of Vishnu and the identification of Krishna with him grew in the period c. 200 BCE to 200 CE',
    'P, because stories of war are always the latest to be added',
    'Q, because teachings on duties cannot be older than 200 BCE',
    'None of them, because passages cannot be dated at all',
  ],
  sol: 'Match each passage against what is known about its period. Only the identification with Vishnu can be tied to a datable religious development. The other options state rules that are not true.',
}));
Q('ar_property', ar({
  t: 4, d: 2, c: 'understanding', verdict: 'both-true-explains',
  a: 'The Manusmriti\'s rules on stridhana did not give women the same standing as sons in inheriting the family estate.',
  r: 'Stridhana was limited mainly to gifts received at marriage, while the family estate was divided among the sons.',
  sol: 'Because the woman\'s own property was confined to marriage gifts and the estate went to the sons, her standing in inheritance was unequal. The second statement therefore explains the first.',
}));
Q('ar_dyn', ar({
  t: 4, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'Finding one verse that identifies Krishna with Vishnu does not show that the whole Mahabharata was composed after the date of that verse.',
  r: 'The epic grew over about a thousand years, with material added by later hands.',
  sol: 'If a text is built up in layers, a late verse dates only that layer, so the long period of growth is what blocks the inference in the assertion.',
}));
Q('s_stridhana', short({
  t: 4, d: 3, c: 'application', marks: 2, wl: S2,
  stem: "In an imagined family, after a woman's death her husband's brother claims the ornaments she received at her marriage. Following the Manusmriti's rules, who should inherit them, and why does the brother-in-law's claim fail?",
  model: "Her **children** should inherit the ornaments, because they are **stridhana**, the gifts a woman received at marriage. The husband had **no claim** over stridhana, so a claim made through the husband's family has **no basis**.",
  sol: 'The heirs and the reason the claim fails.',
  scheme: [['Her children inherit stridhana', 1], ['Husband and his family have no claim', 1]],
}));
Q('s_dating', short({
  t: 4, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'A historian says that an imagined passage presenting a hero as a form of Vishnu was probably added after the epic\'s first bardic composition. Give one reason that supports this view and one reason why the date is still uncertain.',
  model: '**Support:** worship of **Vishnu grew** from about 200 BCE to 200 CE, and the epic was first composed by sutas and **extended later by Brahmanas**. **Uncertain:** a text that grew over about a thousand years makes it hard to place one undated passage exactly.',
  sol: 'A reason from the history of worship and composition, and a reason for caution.',
  scheme: [['Reason supporting a later addition', 1], ['Reason the date is uncertain', 1]],
}));
Q('s3_property', short({
  t: 4, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain three provisions of the Manusmriti on property in relation to women.',
  model: '(1) A father\'s estate was to be divided **equally among the sons** after both parents died, with a **special share for the eldest**. (2) Women could not claim a share of that estate but could keep **stridhana**, the gifts received at marriage. (3) The text **warned women against hoarding** family property without the husband\'s permission.',
  sol: 'Division among sons, stridhana, and the caution on family property.',
  scheme: [['Division among sons with a special share', 1], ['Women excluded but keep stridhana', 1], ['Caution on hoarding', 1]],
}));
Q('l_buddhist', long({
  t: 4, d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: 'Assess how far the Buddhist view of society challenged the Brahmanical claim that status depends on birth.',
  model: '1. **The Brahmanical claim:** the texts held that status was fixed by birth and defended it as a divine order.\n2. **A challenge:** Buddhists rejected claims of status by birth and did not regard differences as natural or fixed.\n3. **Human choice:** a story in the Sutta Pitaka has a ruler, the mahasammata, chosen by the people, suggesting that institutions are made by human choices.\n4. **A limit:** Buddhists recognised that differences existed, so they questioned their basis more than they removed them.\n5. **Judgement:** the challenge was real in ideas but partial in effect on social life.',
  sol: 'The claim, the challenge, the mahasammata story, a limit and a judgement.',
  scheme: [['The Brahmanical claim', 1], ['The Buddhist challenge', 1], ['The mahasammata story', 1], ['A limit', 1], ['Reasoned judgement', 1]],
}));
Q('l_property', long({
  t: 4, d: 4, c: 'analysis', marks: 5, wl: L5,
  stem: 'Examine how far the rules of the Manusmriti shaped women\'s actual access to property, using the evidence on both sides.',
  model: '1. **The rules:** the family estate went to the sons, with a special share for the eldest, and women could not claim a share.\n2. **Stridhana:** women kept the gifts received at marriage, which their children could inherit.\n3. **Limits on women:** the text warned women against hoarding family property without the husband\'s permission.\n4. **Exceptions:** upper-class women such as Prabhavati Gupta had access to resources such as land.\n5. **Judgement:** the rules limited what most women could claim, but social rank could widen a woman\'s access, so practice varied.',
  sol: 'Rules, stridhana, limits, exceptions and a judgement on practice.',
  scheme: [['The rules on the estate', 1], ['Stridhana', 1], ['Limits on women', 1], ['Exceptions by rank', 1], ['Reasoned judgement', 1]],
}));
Q('sb_prop', source({
  t: [4, 5], d: 3, c: 'application', origin: 'soyl-original',
  stem: `Read the source, a summary of what a type of text says about inheritance, and answer the questions that follow. ${SUM}`,
  passage: '**What a Dharmashastra-type text says about inheritance (summary)**\n\nThe text says that once both parents have died, the sons divide the family estate equally, though the eldest is to receive an extra portion. Daughters are not named among those who share the estate. A woman keeps the gifts she was given at her marriage, and her children may inherit them. The text also cautions a wife not to set aside family property for herself without her husband\'s leave. The summary covers only the rules the text lays down, not whether families followed them.',
  parts: [
    child('a', short({ t: 4, d: 1, c: 'recall', marks: 1, stem: 'Who receives an extra portion of the estate, according to the summary?', model: 'The **eldest son**.', sol: 'The first sentence of the passage states it.', scheme: [['Eldest son', 1]] })),
    child('b', short({ t: 4, d: 3, c: 'application', marks: 1, stem: 'Her marriage gifts stay with the woman. What does this suggest about her economic position compared with her brothers?', model: 'She had **some property of her own**, but it was **limited to gifts**, while her brothers shared the family estate.', sol: 'Compare the two kinds of property.', scheme: [['Own property, but less than brothers', 1]] })),
    child('c', short({ t: 4, d: 3, c: 'application', marks: 2, stem: '**Either** (i): Using the summary, give two ways in which these rules could leave a daughter with less property than her brother.', model: '(1) **Daughters are not named** among those who share the family estate. (2) Her own property was confined to **marriage gifts**, whereas a son also received a share of land and other family wealth, with the eldest getting more.', sol: 'Two rules from the passage that produce unequal holdings.', scheme: [['Not named in the share of the estate', 1], ['Property limited to marriage gifts', 1]] }),
    [short({ t: 4, d: 3, c: 'application', marks: 2, stem: '**Or** (ii): The summary says nothing about whether families followed the rules. Suggest two kinds of evidence that could show this.', model: '(1) **Inscriptions** recording gifts of land or villages by women, which show who controlled resources. (2) **Other texts**, such as stories in the epic or Buddhist texts, that describe how families dealt with property.', sol: 'Two sources beyond the normative text.', scheme: [['Inscriptions of gifts by women', 1], ['Other texts describing practice', 1]] })]),
  ],
}));
Q('sb_text', source({
  t: [4, 5], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the source from a student's notes on an imagined lecture and answer the questions that follow. ${IMAG}`,
  passage: '**A student\'s notes on a lecture about an epic-type poem (imagined)**\n\nThe poem is in Sanskrit, but its lines are simpler than those of the old hymns. Some parts tell of war and heroic deeds, and other parts are long speeches on right conduct. The lecturer said that the first singers of the tale were probably charioteer-bards, and that priests who later preserved the poem may have added many of the speeches. A copy from the south holds extra scenes that copies from the north lack. The lecturer ended by saying that the poem cannot be given a single author or a single date.',
  parts: [
    child('a', short({ t: 4, d: 1, c: 'recall', marks: 1, stem: 'Who, according to the notes, were probably the first singers of the tale?', model: '**Charioteer-bards**, the sutas.', sol: 'The third sentence names them.', scheme: [['Charioteer-bards', 1]] })),
    child('b', short({ t: 4, d: 3, c: 'analysis', marks: 1, stem: 'Which detail in the notes about the copies suggests that the poem changed as it was passed on? Say why.', model: 'The **extra scenes in the southern copy**: copies from different regions would be identical if the text had not changed.', sol: 'Pick the detail about the southern copy and read it as change.', scheme: [['Southern extra scenes, with the reason', 1]] })),
    child('c', short({ t: 4, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): A student writes: The poem is in Sanskrit, so only Brahmanas could have composed it. Give two reasons to doubt this claim.', model: '(1) The notes say the **first singers were charioteer-bards**, not priests. (2) The Sanskrit of the poem is **simpler than that of the hymns**, suggesting it was meant for a wider audience than learned priests alone.', sol: 'Two reasons from the notes against the claim.', scheme: [['Bards were the first singers', 1], ['Simpler language, wider audience', 1]] }),
    [short({ t: 4, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Suggest two kinds of evidence a historian could use to decide when the long speeches on right conduct were added.', model: '(1) A **comparison of language and style** with texts of known date. (2) **References to practices or beliefs** in the speeches, such as worship, that can be tied to a particular period.', sol: 'Two ways of dating a passage.', scheme: [['Language and style compared', 1], ['Datable practices or beliefs', 1]] })]),
  ],
}));

// ================================================================ t05 Sources: texts
Q('m_text_infer', mcq({
  t: [3, 5], d: 2, c: 'application',
  stem: 'Which sentence in a historian\'s note on a normative text is an inference rather than a report of what the text says?',
  opts: [
    'Most people in the region therefore lived by these rules.',
    'The text lists four duties for the Vaishyas.',
    'The text advises kings to punish those who leave their duties.',
    'The text was composed in Sanskrit.',
  ],
  sol: 'A list of duties, advice to kings and a language are things the text itself shows. How people actually lived is beyond what a rule book can establish.',
}));
Q('m_source_conflict', mcq({
  t: [3, 5], d: 4, c: 'analysis',
  stem: 'A normative text says that kings should be Kshatriyas. An inscription records the royal title and the repair of a public work by a ruler of non-Kshatriya origin. A historian is writing about how kingship worked in practice. Which weighing of the two is best?',
  opts: [
    'The text shows what some authors wished and the inscription shows what a ruler did; neither alone shows what most people accepted',
    'Reject the inscription because it contradicts the text',
    'Reject the text because it records no events',
    'Treat both as equally reliable on every question',
  ],
  sol: 'Each source answers a different question and has its own purpose. Rejecting either wholly, or treating them as equal on all points, ignores that difference.',
}));
