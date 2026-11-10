// CBSE 12 History, ch05 Through the Eyes of Travellers: Perceptions of Society (c. 10th-17th centuries),
// question bank. Every source passage is an imagined document or a SOYL summary written in SOYL's own
// words and labelled as such. Nothing from Al-Biruni, Ibn Battuta, Bernier or any other traveller is quoted,
// translated or closely paraphrased; no NCERT text, source box, caption, map or exercise and no board or
// sample-paper item is reused (D-036). Real travellers are named and their views described in plain words;
// travellers' views on caste, religion, women, slavery and sati are presented as perceptions whose biases
// are examined, never as facts about Indian society. Places are named in words only: no map work (OA-23).
import { Q, mcq, ar, tf, fb, match, ord, short, long, source, child } from '../../cbse-12-history-ch01/src/lib.mjs';

const S2 = [30, 50];
const S3 = [50, 80];
const L5 = [80, 120];
const IMAG = '*(Imagined document written by SOYL for practice; the people in it are not real, though the evidence and events in the background are.)*';
const SUM = '*(Summary written by SOYL in its own words for practice; it is not a quotation or translation of any source.)*';

// ================================================================ t01 Al-Biruni and the Kitab-ul-Hind
Q('m_ab_ghazni', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Al-Biruni came to the Punjab and north India after being taken to Ghazni. Which event led to his being taken there?',
  opts: [
    'Sultan Mahmud of Ghazni invaded his homeland, Khwarizm, in 1017 and took scholars away with him',
    'Muhammad bin Tughlaq appointed him judge of Delhi',
    'He was sent as an envoy to the ruler of China',
    'A Mughal emperor invited him to a court in the Indian plains',
  ],
  sol: 'The invasion of Khwarizm brought several scholars to Ghazni. The other options belong to the career of Ibn Battuta or to a much later empire.',
}));
Q('m_ab_struct', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Which description fits the usual plan of a chapter in the Kitab-ul-Hind?',
  opts: [
    'It begins with a question, describes the subject from Sanskritic traditions and ends with a comparison with other cultures',
    'It begins with a royal order, lists the taxes of a province and ends with a prayer',
    'It is a daily diary of a journey, with the weather noted each evening',
    'It is a poem in praise of the ruler who sponsored the author',
  ],
  sol: 'The work is a systematic study, not a diary, a court record or a poem. Its repeated three-step pattern is what makes its chapters easy to recognise.',
}));
Q('m_ab_barriers', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Which of the following was not among the barriers that Al-Biruni identified to understanding India?',
  opts: [
    'The absence of any written texts in the Sanskrit tradition',
    'The great difference between Sanskrit and the languages he already knew, such as Arabic and Persian',
    'Differences in religious beliefs and practices',
    'What he saw as the self-absorption and insularity of the local people',
  ],
  sol: 'Written Sanskrit texts were the very material he studied with Brahmana scholars, so their absence cannot have been the problem. The other three are the obstacles he named.',
}));
Q('m_ab_caste', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Which statement best describes Al-Biruni\'s treatment of the caste system?',
  opts: [
    'He described the four varnas from Brahmanical texts, compared them with social classes in ancient Persia, and rejected the idea of pollution as contrary to the laws of nature',
    'He accepted every rule of pollution as part of the laws of nature',
    'He argued that only India had social divisions',
    'He ignored caste because the Sanskrit texts did not mention it',
  ],
  sol: 'He relied on the texts but added his own comparison and his own judgement. Neither unquestioning acceptance nor silence fits what he wrote, and he did not claim that India alone had divisions.',
}));
Q('m_ab_fit', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: 'A historian lists four questions. For which of them would the Kitab-ul-Hind be the most useful source?',
  opts: [
    'How did an educated outsider of the early eleventh century understand and compare Indian religious and philosophical ideas?',
    'What did ordinary villagers of the Punjab eat at their daily meals?',
    'How many soldiers did Sultan Mahmud take on each campaign?',
    'What taxes did a peasant of south India pay to his local ruler?',
  ],
  sol: 'The work grew out of the author\'s study of learned traditions, so it speaks best about ideas and how a scholar from elsewhere read them. Food, armies and taxes need other kinds of record.',
}));
Q('m_ab_weaken', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: 'Historians say that Al-Biruni\'s picture of caste rests mostly on Brahmanical texts. Which new finding would most weaken the view that his account shows how caste usually worked in daily life?',
  opts: [
    'Local records of the same period showing that people often changed occupations and mixed with other groups in ways the texts did not allow',
    'More manuscripts of the same Brahmanical texts that he used',
    'A second Arabic translation of his work made soon after his death',
    'Evidence that ancient Persian society also had social classes',
  ],
  sol: 'A conflict between everyday records and the rules of the texts would show that a text-based account describes norms more than practice. The other finds add copies or support the comparison he drew, not the claim about practice.',
}));
Q('m_ab_attrib', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'Two undated Arabic fragments are shown to a historian. Fragment P: a chapter begins with a question on why the people of a distant land keep certain festivals, explains them from the traditions of that land\'s learned men, and ends by setting them beside the practices of other peoples. Fragment Q: a list of a sultan\'s campaigns, year by year, with praise for his generosity. Which judgement is soundest?',
  opts: [
    'P matches the plan of the chapters of the Kitab-ul-Hind, though the plan alone cannot prove who wrote it',
    'Q matches the Kitab-ul-Hind because it is written in Arabic',
    'P proves that Al-Biruni wrote it, since only he began chapters with questions',
    'Neither can be linked to the Kitab-ul-Hind because that work was written in Persian',
  ],
  sol: 'A matching structure is a clue, not a proof; the language alone matches nothing, and the Kitab-ul-Hind was in Arabic, not Persian. P resembles its method while Q is a court record of another kind.',
}));
Q('tf_ab_euclid', tf({
  t: 1, d: 1, c: 'recall', ans: true,
  stem: 'True or false? Al-Biruni translated Sanskrit works, among them one on grammar by Patanjali, into Arabic, and parts of Euclid into Sanskrit.',
  sol: 'Both translations are recorded, which shows learning moving in two directions.',
}));
Q('fb_ab80', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'The Kitab-ul-Hind, written in Arabic, is a work of ___ chapters.',
  acc: [['80', 'eighty']],
  sol: 'It has eighty chapters, on subjects from religion to weights and measures.',
}));
Q('mt_origin', match({
  t: [1, 2, 3], d: 1, c: 'recall',
  stem: 'Match each traveller with the land from which he came.',
  pairs: [
    ['Al-Biruni', 'Khwarizm, in present-day Uzbekistan'],
    ['Ibn Battuta', 'Morocco'],
    ['François Bernier', 'France'],
    ['Duarte Barbosa', 'Portugal'],
  ],
  sol: 'Each pairing is the traveller\'s home region as given in the lives of these writers.',
}));
Q('ar_ab_texts', ar({
  t: 1, d: 3, c: 'understanding', verdict: 'both-true-explains',
  a: 'Historians caution that the Kitab-ul-Hind cannot be treated as a record of the daily life of ordinary people in India.',
  r: 'Al-Biruni relied largely on Sanskrit Brahmanical texts and on the scholars who taught them.',
  sol: 'Learned texts and teachers were the main channel of his knowledge, so the book carries their norms and interests, which is the ground for the caution.',
}));
Q('ar_ab_pollution', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'both-true-not-explains',
  a: 'In describing the varna system, Al-Biruni drew on Brahmanical texts.',
  r: 'He disapproved of the notion of pollution, regarding it as contrary to the laws of nature.',
  sol: 'Both statements hold, but they answer different questions: the first is about his sources and the second is about his own judgement of one belief. His disapproval does not account for his choice of sources.',
}));
Q('s_ab_barriers', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Name two barriers that Al-Biruni identified to understanding India and say what each meant.',
  model: '(1) **Language:** Sanskrit was very different from Arabic and Persian, so understanding the texts required learning it. (2) **Differences in belief and practice:** the religious ideas and customs he met were unlike those of his own world.',
  sol: 'Two of the three barriers, each with its meaning.',
  scheme: [['First barrier with its meaning', 1], ['Second barrier with its meaning', 1]],
}));
Q('s_ab_caste', short({
  t: 1, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: 'A student writes: Al-Biruni simply accepted the Brahmanical account of caste that his teachers gave him. Say what is partly right and what is wrong.',
  model: '**Partly right:** he described the four varnas from Brahmanical texts, so his account reflected their norms. **Wrong:** he did not simply accept it; he compared the varnas with classes in ancient Persia, said such divisions were not unique to India, and rejected the idea of pollution as against nature.',
  sol: 'What the claim gets right about his sources and what it misses about his own comparison and judgement.',
  scheme: [['What is partly right', 1], ['What is wrong, with evidence', 1]],
}));
Q('s3_ab_apply', short({
  t: 1, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'An imagined scholar visiting a river-port town in the eleventh century plans a chapter on its festivals, following the plan of the Kitab-ul-Hind. Outline how the chapter should be organised and name one risk.',
  model: 'It should **open with a question** about the festivals, give a **description based on what the local learned traditions say**, and **close with a comparison** with the customs of other peoples. **Risk:** if the description rests only on texts and learned informants, it will show their norms rather than what ordinary townspeople did, and the comparison may reflect the writer\'s own standards.',
  sol: 'The three-step plan applied to a new subject, and a limit that follows from his method.',
  scheme: [['Opening question and description from local traditions', 1], ['Closing comparison', 1], ['One risk of the method', 1]],
}));
Q('l_ab_assess', long({
  t: 1, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: 'Assess the value and the limits of the Kitab-ul-Hind as a source for understanding India in the early eleventh century.',
  model: '1. **Author:** a scholar of many languages who learned Sanskrit and studied religion and philosophy with Brahmana scholars after reaching Ghazni in 1017.\n2. **Scope:** eighty chapters in Arabic on religion, astronomy, festivals, customs, weights and measures and laws.\n3. **Method:** each chapter asked a question, described the subject from Sanskritic traditions and ended with a comparison, giving a rare outsider\'s view.\n4. **Limits:** it rests largely on Brahmanical texts, so it shows their norms more than everyday practice, and the barriers of language and belief shaped his understanding.\n5. **Judgement:** very valuable on ideas and learned traditions, weaker on ordinary life, so it needs checking against other evidence.',
  sol: 'Author, scope, method, limits and a reasoned judgement that weighs value against limits.',
  scheme: [['Author and background', 1], ['Scope of the work', 1], ['Method as a strength', 1], ['Limits of the evidence', 1], ['Reasoned judgement', 1]],
}));
Q('sb_ab', source({
  t: [1, 5], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the source, an imagined student's notes from a lecture, and answer the questions that follow. ${IMAG}`,
  passage: '**A student\'s notes from a lecture on the Kitab-ul-Hind (imagined)**\n\nThe lecturer began with a chart showing how the eighty chapters are grouped by subject. She said that the author learned Sanskrit well enough to read texts with the scholars who taught him, so the book is rich on astronomy, festivals and ideas about the world. Then she asked us to notice what is missing. Hardly a line is given to how a potter, a ploughman or a boatman lived, and when the book speaks of social groups it follows the rules set out in the texts. She advised us to read it as a window on the learned traditions of its time and to ask who held the pen and who stood at the door.',
  parts: [
    child('a', short({ t: 1, d: 1, c: 'recall', marks: 1, stem: 'In which language was the Kitab-ul-Hind written?', model: '**Arabic.**', sol: 'The work was written in Arabic, although the author also knew Persian and Sanskrit.', scheme: [['Arabic', 1]] })),
    child('b', short({ t: 1, d: 3, c: 'analysis', marks: 1, stem: 'The lecturer says that the book follows the rules set out in the texts when it speaks of social groups. Whose view of society does this suggest the book mainly reflects?', model: 'The view of the **learned Brahmanical tradition** that composed and taught those texts, not of the groups described.', sol: 'Follow the rules of the texts to the people who wrote and taught them.', scheme: [['Learned Brahmanical tradition identified', 1]] })),
    child('c', short({ t: 1, d: 3, c: 'application', marks: 2, stem: '**Either** (i): The lecturer notes that hardly a line is given to potters, ploughmen or boatmen. Suggest two kinds of evidence that historians could use to learn about their lives.', model: '(1) **Revenue and local records** of the period, which show what farmers and craft workers produced and paid. (2) **Archaeological finds**, such as tools, pottery and workshop remains, which show how such people worked.', sol: 'Two kinds of evidence outside learned texts.', scheme: [['First kind of evidence', 1], ['Second kind of evidence', 1]] }),
    [short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Give two reasons why the book is still valuable to historians despite the gaps that the lecturer points out.', model: '(1) It gives an **outsider\'s detailed view** of learned traditions, sciences and festivals, written by someone who studied Sanskrit with scholars. (2) Its **comparisons with other cultures** show how a scholar of that time tried to understand a different society.', sol: 'Two kinds of value: the learned detail and the comparative approach.', scheme: [['First reason', 1], ['Second reason', 1]] })]),
  ],
}));

// ================================================================ t02 Ibn Battuta's Rihla
Q('m_ib_born', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'Ibn Battuta, who reached Sind in 1333, was born in 1304 in which place?',
  opts: ['Tangier, in Morocco', 'Khwarizm, in present-day Uzbekistan', 'Paris, in France', 'Samarqand, in Central Asia'],
  sol: 'He came from a family of scholars of Islamic law in Tangier. Khwarizm was the home of Al-Biruni and Paris that of Bernier.',
}));
Q('m_ib_qazi', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'Which ruler appointed Ibn Battuta qazi (judge) of Delhi?',
  opts: ['Muhammad bin Tughlaq', 'Mahmud of Ghazni', 'Akbar', 'Shah Jahan'],
  sol: 'The sultan of Delhi gave him the post and later sent him as envoy to China. Mahmud of Ghazni lived centuries earlier and the Mughal emperors much later.',
}));
Q('m_ib_post_calc', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'Ibn Battuta describes two postal systems: the horse post, with royal horses stationed every four miles, and the foot post, with three stations in every mile. An imagined official must plan the relays along a 12-mile stretch. How many stations would each system need on it?',
  opts: [
    'Horse post: 3 stations; foot post: 36 stations',
    'Horse post: 48 stations; foot post: 4 stations',
    'Horse post: 3 stations; foot post: 4 stations',
    'Horse post: 12 stations; foot post: 36 stations',
  ],
  sol: 'Divide the distance by the spacing for the horse post, 12 by 4, and multiply it by the density for the foot post, 12 by 3. The wrong options reverse or mix the two rules.',
}));
Q('m_ib_novelty', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Ibn Battuta took care to describe the coconut and the betel leaf (paan) to his readers. What does this show about how travellers wrote?',
  opts: [
    'They explained what would be unfamiliar to the readers at home for whom they wrote',
    'They invented plants to amuse their readers',
    'They wrote only for the officials of the places they visited',
    'They copied descriptions from the books of earlier travellers',
  ],
  sol: 'He knew that readers in the lands to which he returned had never seen these things. Writing for an audience elsewhere decides what a traveller explains and what he takes for granted.',
}));
Q('m_ib_cloth', mcq({
  t: 2, d: 2, c: 'analysis',
  stem: 'Ibn Battuta remarks that Indian cloth was in great demand in West and Southeast Asia. Which find would give the best independent support for this remark?',
  opts: [
    'A customs register from a West Asian port listing imports of Indian cotton and silk cloth',
    'Another page of his own account repeating the remark',
    'A later traveller\'s poem praising the city of Delhi',
    'A list of the officers who served the sultan',
  ],
  sol: 'Independent support must come from a source that does not depend on him. A record kept by the importing port is such a source, whereas a repetition by the same author, a poem or a list of officers is not.',
}));
Q('m_ib_check', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'Ibn Battuta was struck by the speed of the postal system. Which discovery would most weaken the picture of a quick and efficient post?',
  opts: [
    'Official papers of the same reign with repeated complaints that messages reached the capital weeks late',
    'A record that the sultan kept a large number of horses',
    'A second traveller who also admired the cities of the sultanate',
    'A list of the places at which stations stood',
  ],
  sol: 'Only evidence of long delays bears directly on speed. Horses, other praise or a list of stations are consistent with a good system and do not test it.',
}));
Q('m_ib_position', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Ibn Battuta served the sultan of Delhi as a judge. Which is the most reasonable way to judge how this post affected his account?',
  opts: [
    'It gave him close access to the court and its people, but it may also have shaped what he noticed and how he judged it',
    'It guarantees that every statement he made is accurate',
    'It makes his account useless to historians',
    'It shows that he lived mainly among peasants',
  ],
  sol: 'A position brings both access and a point of view, so the account should be used with attention to both. Neither blind trust nor rejection follows from it.',
}));
Q('m_ib_date', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'An imagined undated note by a Delhi courtier says: The foreign judge who once sat in our courts is said to be telling stories of Delhi to a scribe in the far west of the Muslim world. Using the fact that Ibn Battuta returned to Morocco in 1354, when could the note have been written?',
  opts: [
    'After 1354, since the telling to a scribe belongs to his years back in Morocco',
    'Before 1333, since he had not yet reached Sind',
    'In 1342, when he left on his embassy to China',
    'In 1304, the year of his birth',
  ],
  sol: 'The note describes the stage at which his account was being recorded, which came after he had settled in Morocco. Each other option places it before he even had stories to tell.',
}));
Q('tf_ib_slave_unif', tf({
  t: 4, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? According to Ibn Battuta\'s account, every slave in Delhi did the same kind of work.',
  sol: 'He describes varied roles, from skilled entertainment in the sultan\'s service to household labour.',
}));
Q('fb_uluq', fb({
  t: 2, d: 1, c: 'recall',
  stem: 'Ibn Battuta describes two postal systems: the horse post, called ___, and the foot post, called ___.',
  acc: [['uluq'], ['dawa']],
  sol: 'The horse post was the uluq and the foot post the dawa.',
}));
Q('ar_ib_delhi', ar({
  t: 2, d: 3, c: 'analysis', verdict: 'both-true-not-explains',
  a: 'The Rihla alone cannot give a reliable figure for the population of Delhi in the fourteenth century.',
  r: 'Ibn Battuta described Delhi as a vast and populous city.',
  sol: 'Both are true, but his remark is a general impression and gives no reason for the lack of a figure. The real reason is that he gave no counts and had no way of making one.',
}));
Q('ar_ib_slaves', ar({
  t: 2, d: 2, c: 'understanding', verdict: 'A-true-R-false',
  a: 'Ibn Battuta records that slaves were openly sold in markets and given as gifts.',
  r: 'He records that all slaves served only as musicians and dancers for the sultan.',
  sol: 'The first statement is recorded. The second is false, because he also mentions slaves who did household labour such as carrying palanquins.',
}));
Q('s_ib_post', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Describe the two kinds of post that Ibn Battuta noticed in the sultanate.',
  model: 'The **horse post (uluq)** used royal horses stationed every four miles. The **foot post (dawa)** had three stations in every mile, with runners carrying messages onward. Both moved news and goods, such as fruit, quickly, and he was struck by their efficiency.',
  sol: 'Each system with its spacing, and one common feature.',
  scheme: [['Horse post with its spacing', 1], ['Foot post with its spacing', 1]],
}));
Q('s_ib_cloth', short({
  t: 2, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'An imagined port ledger of the fourteenth century lists many bales of fine cotton and silk cloth loaded for West Asia and Southeast Asia, and no woollen cloth. State one conclusion that fits Ibn Battuta\'s remark about Indian cloth and one thing the ledger cannot show.',
  model: '**Conclusion:** fine cotton and silk cloth was sent in quantity to distant markets, which agrees with his remark about demand. **Limit:** a ledger from one port and one period cannot show who bought the cloth, at what prices, or whether trade was the same in other years.',
  sol: 'One conclusion that agrees with him and one limit of a single ledger.',
  scheme: [['A conclusion that fits his remark', 1], ['A limit of the ledger', 1]],
}));
Q('s3_ib_markets', short({
  t: 2, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'An imagined fourteenth-century note on a market town says: music is played in the square on market days, fine cloth is sold beside fruit, and some of the goods arrive from far away by relay. Using Ibn Battuta\'s account of Indian cities, give three conclusions that the note supports.',
  model: '(1) **Markets were social as well as economic places**, where music and gatherings went with buying and selling. (2) **Trade covered cloth and fruit** and drew on distant regions, so towns were linked to wider networks. (3) **Relay systems moved goods as well as news**, helping distant produce arrive fresh. Ibn Battuta describes the same features, so the note fits his picture.',
  sol: 'Social role of markets, range of goods, and the part played by the relay post.',
  scheme: [['Markets as social places', 1], ['Range and reach of trade', 1], ['Post carrying goods', 1]],
}));
Q('s3_ib_post_check', short({
  t: 2, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Ibn Battuta says that fruit from Khurasan could reach Delhi quickly by the post. What can a historian conclude from this statement, and what two cautions apply?',
  model: '**Conclusion:** in his experience the post carried goods as well as news, and its speed impressed him. **Cautions:** (1) it is **one traveller\'s report**, perhaps based on what he was told, and may describe the sultan\'s court rather than the whole realm. (2) It **cannot show how regular** the service was; official records or other observers would be needed.',
  sol: 'A conclusion about what the post carried, and two limits on a single report.',
  scheme: [['A conclusion', 1], ['Caution: one report', 1], ['Caution: regularity unknown', 1]],
}));
Q('l_ib_describe', long({
  t: 2, d: 2, c: 'understanding', marks: 5, wl: L5,
  stem: 'Describe Ibn Battuta\'s account of cities, communication and slavery in India.',
  model: '1. **Background:** born in Tangier in 1304, he reached Sind in 1333, became qazi of Delhi and was sent as envoy to China in 1342; his Rihla was recorded in Arabic after his return to Morocco in 1354.\n2. **Cities:** Delhi was vast and populous and Daulatabad comparable in size; markets were also social centres, with music and dancing in some.\n3. **Trade:** Indian cotton, muslin and silk were in demand in West and Southeast Asia.\n4. **Communication:** the horse post and foot post carried news and goods swiftly.\n5. **Slavery:** slaves were sold openly and given as gifts, and did varied work such as music and dance, carrying palanquins and watching nobles.',
  sol: 'Background, cities and markets, trade, the postal system and the roles of slaves.',
  scheme: [['Background and the Rihla', 1], ['Cities and markets', 1], ['Trade in cloth', 1], ['Communication', 1], ['Slavery', 1]],
}));
Q('sb_ib', source({
  t: [2, 5], d: 3, c: 'application', origin: 'soyl-original',
  stem: `Read the source, an imagined letter from a merchant, and answer the questions that follow. ${IMAG}`,
  passage: '**Letter from a cloth merchant to his brother (imagined)**\n\nBrother, the ships will sail when the winds turn. We have loaded bales of fine cotton and silk for the western ports and for the lands across the eastern sea, where demand never seems to fall. In the capital I met a travelling judge from the far west, who told me that news, and even baskets of fruit, from distant provinces reach the sultan within days, passed from one stage to the next along the roads. The sultan\'s officers all spoke of it with pride. Tell the clerk to count the bales twice.',
  parts: [
    child('a', short({ t: 2, d: 1, c: 'recall', marks: 1, stem: 'Name the two kinds of post described by Ibn Battuta.', model: 'The **horse post (uluq)** and the **foot post (dawa)**.', sol: 'Both systems are named in his account of the sultanate.', scheme: [['Both kinds named', 1]] })),
    child('b', short({ t: 2, d: 3, c: 'application', marks: 1, stem: 'Does the merchant\'s letter give first-hand or second-hand evidence about the speed of the post? Give a reason.', model: '**Second-hand:** he reports what the judge and the sultan\'s officers told him, not what he saw himself.', sol: 'Look at who is named as the source of the information.', scheme: [['Second-hand with a reason', 1]] })),
    child('c', short({ t: 2, d: 3, c: 'application', marks: 2, stem: '**Either** (i): Suppose the judge\'s own account also praises the post. Give two reasons why this would still not prove that the post was fast.', model: '(1) The merchant\'s information came **from the judge**, so the two are not independent confirmation. (2) Both depend on what **court officers chose to say**, who had reason to praise the system, and visitors may judge by a few cases.', sol: 'Two reasons why agreement between dependent reports is weak evidence.', scheme: [['Not independent', 1], ['Officers\' reasons and few cases', 1]] }),
    [short({ t: 2, d: 3, c: 'application', marks: 2, stem: '**Or** (ii): Suggest two other kinds of evidence that a historian could use to check how quickly news travelled in the sultanate.', model: '(1) **Official records** of dispatches and receipts, showing the dates on which messages were sent and arrived. (2) **Chronicles** that give the date of an event and the date it was known in the capital, so that the delay can be worked out.', sol: 'Two sources that record dates of sending and arrival.', scheme: [['First kind of evidence', 1], ['Second kind of evidence', 1]] })]),
  ],
}));

// ================================================================ t03 Bernier and the East-West comparison
Q('m_bn_who', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'François Bernier, who was in the Mughal Empire from 1656 to 1668, was',
  opts: ['a French physician, philosopher and historian', 'a Moroccan judge', 'an Italian merchant', 'a Central Asian astronomer'],
  sol: 'He travelled in India as a physician and writer. The other descriptions fit other travellers or none.',
}));
Q('m_bn_claim', mcq({
  t: 3, d: 1, c: 'understanding',
  stem: 'Which statement summarises Bernier\'s main claim about land in the Mughal Empire?',
  opts: [
    'The emperor owned all land, so there was no private property in land, and agriculture suffered',
    'Peasants held their land as private property and prospered',
    'Land belonged to village councils and could not be taxed',
    'Merchants owned most of the land of the empire',
  ],
  sol: 'His argument rested on the absence of private property in land. The other options reverse it or describe ideas he did not hold.',
}));
Q('m_bn_camp', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'What did Bernier mean by calling Mughal cities camp towns?',
  opts: [
    'They depended on the imperial camp for their existence and would shrink if the court moved away',
    'They were built only of tents',
    'They were military forts without markets',
    'They had no artisans at all',
  ],
  sol: 'The phrase describes dependence on the court. It does not describe the building material, forts or the absence of crafts.',
}));
Q('m_bn_strengthen', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: 'Which new finding would most strengthen Bernier\'s claim that land in the Mughal Empire was not held as private property?',
  opts: [
    'Seventeenth-century official records showing that holdings returned to the emperor on the holder\'s death and that no sale or inheritance of land was recognised',
    'Records of busy workshops in several towns',
    'Records of a revenue demand fixed as a share of the harvest',
    'A French account praising the emperor\'s court',
  ],
  sol: 'His claim is about who could hold and pass on land, so only evidence on holding, sale and inheritance bears on it. Workshops, a revenue share and praise leave the question open.',
}));
Q('m_bn_weaken', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: 'Bernier said that Mughal society consisted of a very poor mass and a tiny rich ruling class, with no middle class. Which finding would most weaken this view?',
  opts: [
    'Records of prosperous merchants, bankers and owners of workshops in several towns who were neither nobles nor peasants',
    'Records of the emperor\'s gifts of land to nobles',
    'Evidence that peasants paid part of their revenue in grain',
    'A second traveller who also described poor peasants',
  ],
  sol: 'A well-off urban group outside the court and the villages is exactly what he denied. Gifts to nobles and payments in grain do not touch the point, and a second report of poverty would support him.',
}));
Q('m_bn_sale', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'A historian finds a seventeenth-century Mughal document recording the sale of a plot of village land between two families, accepted by local officials. How does it bear on Bernier\'s claim about land?',
  opts: [
    'It is evidence against the claim that private property in land did not exist, though one document cannot show how common such sales were',
    'It proves that every holder in the empire could sell land freely',
    'It supports the claim, since officials were involved',
    'It has no bearing, because it concerns only one village',
  ],
  sol: 'A recognised sale shows that at least some land was transferred between families, which sits badly with his claim. One record cannot settle how widespread this was, and the officials\' role does not weaken that point.',
}));
Q('m_bn_towns', mcq({
  t: 3, d: 4, c: 'application',
  stem: 'An imagined survey records two towns of the seventeenth century. Town P grew up beside an imperial camp and emptied when the court moved on. Town Q was a river port with merchant houses and workshops that kept working for generations whether or not the court was near. Which judgement about Bernier\'s idea of camp towns is best?',
  opts: [
    'P fits the idea, but Q is hard for it to explain, so the idea cannot cover every town',
    'Q fits the idea, but P is hard for it to explain',
    'Both fit the idea equally',
    'Neither bears on the idea',
  ],
  sol: 'The idea describes a town whose life depends on the court, which is true of P. A town that thrives without the court, like Q, shows that his term cannot be applied to all urban centres.',
}));
Q('tf_bn_ain', tf({
  t: 3, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? The Ain-i Akbari states that the Mughal state was the sole owner of all land.',
  sol: 'Official documents such as the Ain-i Akbari do not say this; the idea comes from Bernier\'s reading of what he saw.',
}));
Q('fb_bn_dara', fb({
  t: 3, d: 1, c: 'recall',
  stem: 'Bernier first served as physician to Prince ___, and later was attached to the noble Danishmand Khan.',
  acc: [['Dara Shukoh', 'Dara Shikoh', 'Dara']],
  sol: 'Dara Shukoh was the prince; later Bernier moved into the household of Danishmand Khan.',
}));
Q('ar_bn_ain', ar({
  t: 3, d: 2, c: 'understanding', verdict: 'A-false-R-true',
  a: 'The Ain-i Akbari supports Bernier\'s claim that the Mughal state was the sole owner of all land.',
  r: 'The Ain-i Akbari and other official Mughal documents do not describe the state as the sole owner.',
  sol: 'The second statement is correct, and it is the very reason the first fails.',
}));
Q('ar_bn_camp', ar({
  t: 3, d: 3, c: 'understanding', verdict: 'both-true-explains',
  a: 'Bernier\'s description of Mughal towns as camp towns does not hold for every urban centre of his time.',
  r: 'Bernier himself described skilled artisans, workshops, merchants and a variety of urban centres.',
  sol: 'His own descriptions show urban life that did not rest on the court alone, which gives the reason to doubt his general label.',
}));
Q('s_bn_claim', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State two consequences that Bernier believed followed from the absence of private property in land.',
  model: '(1) Landholders could not pass land to their children, so they had **no reason to invest** in improving it. (2) Agriculture **declined** and peasants were **oppressed**; society, in his view, became a very poor mass under a small, very rich ruling class.',
  sol: 'Two links in his chain of reasoning.',
  scheme: [['No investment, because land could not be inherited', 1], ['Decline of agriculture and oppression, with the polarised society', 1]],
}));
Q('s_bn_partly', short({
  t: 3, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: 'A student claims: Bernier was proved wrong about everything, since the Ain-i Akbari does not say that the emperor owned all land. What is partly right and what goes too far?',
  model: '**Partly right:** official documents such as the Ain-i Akbari do not say that the state was sole owner of land, so his key claim lacks that support. **Too far:** one source cannot refute everything; his descriptions of workshops and towns remain useful evidence even where his theory is doubted.',
  sol: 'What the missing statement does show, and why it cannot discredit all of his book.',
  scheme: [['What is partly right', 1], ['What goes too far', 1]],
}));
Q('s3_bn_checks', short({
  t: 3, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'A historian wishes to test Bernier\'s claim that landholders in the Mughal Empire could not pass land to their children. State three kinds of evidence she should look for, with what each could show.',
  model: '(1) **Official records of grants and revenue**, to see whether holdings were really taken back on a holder\'s death. (2) **Documents of sale, gift or inheritance of land**, which would show whether families transferred land. (3) **Accounts by other observers** of the same period, to see whether they describe the same system, remembering that each has its own bias.',
  sol: 'Three sources that bear on holding and inheritance, each tied to what it could show.',
  scheme: [['Official records and what they show', 1], ['Documents of transfer and what they show', 1], ['Other observers and their limits', 1]],
}));
Q('s3_bn_influence', short({
  t: 3, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain how Bernier\'s ideas about the Mughal Empire were used by later thinkers.',
  model: '(1) Bernier presented India as the **inverse of Europe**, with the emperor as sole owner of land. (2) **Montesquieu** used such ideas in his theory of **oriental despotism**, in which rulers held absolute power. (3) **Karl Marx** later drew on them in his idea of the **Asiatic mode of production**, in which the state owned land and society changed little.',
  sol: 'Bernier\'s picture and its use by Montesquieu and by Marx.',
  scheme: [['Bernier\'s contrast with Europe', 1], ['Montesquieu', 1], ['Karl Marx', 1]],
}));
Q('l_bn_evaluate', long({
  t: 3, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: 'Evaluate Bernier\'s view that the absence of private property in land explains the condition of Mughal agriculture and society.',
  model: '1. **His argument:** the emperor owned all land, so nobles could not pass it on and did not invest; agriculture declined, peasants were oppressed and society was very poor or very rich, with no middle class.\n2. **Weak point:** Mughal documents such as the Ain-i Akbari do not say that the state was sole owner of land.\n3. **His own evidence:** he described skilled artisans, workshops, merchants and varied towns, which complicates the picture.\n4. **Bias:** he judged India by the standard of France and wrote for Louis XIV.\n5. **Judgement:** his observations are useful, but his explanation is doubtful and must be tested against records.',
  sol: 'His argument, a weak point, his own contrary evidence, his bias and a weighed judgement.',
  scheme: [['His argument', 1], ['Documents do not support sole ownership', 1], ['His own contrary evidence', 1], ['Bias of comparison', 1], ['Reasoned judgement', 1]],
}));
Q('l_cmp', long({
  t: [1, 3], d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: 'Compare how Al-Biruni and Bernier tried to understand Indian society, and examine how the differences affect their value as sources.',
  model: '1. **Knowledge:** Al-Biruni learned Sanskrit and read Brahmanical texts with scholars; Bernier, in the seventeenth century, observed the Mughal world as a physician attached to nobles.\n2. **Attitude:** Al-Biruni named his barriers and compared varnas with Persian classes; Bernier set India against Europe and found it inferior.\n3. **Comparison:** Al-Biruni used comparison to explain; Bernier built it into a theory of land and society.\n4. **Effect:** Al-Biruni\'s work reflects Brahmanical norms; Bernier\'s claims were later taken up by Montesquieu and Marx but doubted by historians.\n5. **Judgement:** Al-Biruni is more reliable on learned traditions, while Bernier\'s general theory needs checking.',
  sol: 'Sources of knowledge, attitude, use of comparison, effect and a judgement of value.',
  scheme: [['Sources of knowledge', 1], ['Attitude to what they saw', 1], ['Use of comparison', 1], ['Effect and later use', 1], ['Judgement of value', 1]],
}));
Q('sb_bn', source({
  t: [3, 5], d: 4, c: 'analysis', origin: 'soyl-original',
  stem: `Read the source, an imagined student's notes, and answer the questions that follow. ${IMAG}`,
  passage: '**A student\'s notes after a lecture on Bernier (imagined)**\n\nThe French physician who lived in the Mughal Empire in the seventeenth century argued that most things went wrong because the emperor owned the land. Nobles held land only for a time, so, he said, they squeezed the peasants and neglected the soil. The lecturer then pointed out that his book is full of descriptions of the court, of crafts and of towns, and that these are among its most valuable pages. She added that he wrote for a king and for readers at home, and that he kept comparing everything with his own country.',
  parts: [
    child('a', short({ t: 3, d: 1, c: 'recall', marks: 1, stem: 'Name the European thinker who used ideas like Bernier\'s in his theory of oriental despotism.', model: '**Montesquieu.**', sol: 'He took up the picture of a ruler owning everything to describe despotism in the East.', scheme: [['Montesquieu', 1]] })),
    child('b', short({ t: 3, d: 3, c: 'analysis', marks: 1, stem: 'The lecturer values his descriptions of crafts and towns highly. Why might a historian trust these pages more than his theory of land?', model: 'They record what he **observed directly**, whereas the theory depends on a **comparison with Europe** and lacks support in official documents.', sol: 'Compare direct observation with theory built on comparison.', scheme: [['Observation versus theory', 1]] })),
    child('c', short({ t: 3, d: 4, c: 'analysis', marks: 2, stem: '**Either** (i): The notes say that he kept comparing everything with his own country. Give two ways in which this habit could distort what he recorded.', model: '(1) He may have treated **private ownership of land, as in Europe, as the normal pattern**, so its absence looked like a failure. (2) He may have stressed **differences** and presented India as the opposite of France, since he wrote to persuade readers at home.', sol: 'Two ways in which a standard of comparison shapes the record.', scheme: [['European pattern treated as normal', 1], ['Differences stressed for readers at home', 1]] }),
    [short({ t: 3, d: 4, c: 'analysis', marks: 2, stem: '**Or** (ii): Bernier\'s book describes busy workshops and towns, yet he claims that there was no middle class. Explain how a historian could use this to question his claim.', model: '(1) **Workshops and towns imply artisans, merchants and owners of goods**, a group between peasants and nobles. (2) His **own evidence conflicts with his theory**, so the theory should be tested against other records.', sol: 'Two points from the conflict between his descriptions and his claim.', scheme: [['Descriptions imply a middle group', 1], ['Conflict means the theory needs testing', 1]] })]),
  ],
}));
Q('sb_conflict', source({
  t: [3, 5], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the two imagined documents about the same town and answer the questions that follow. ${IMAG}`,
  passage: '**Two imagined documents about one town in the seventeenth century**\n\n*Document 1, a clerk\'s report to the district office:* The town has one hundred and forty looms, nine cloth-merchant houses, a lane of bankers and a weekly market. It has paid its dues in every season, and its population has grown steadily over the last twenty years.\n\n*Document 2, a letter by a foreign visitor who stayed four days while the governor\'s camp was in the town:* This town swells with the governor\'s camp and servants. I saw few shops and many tents, and I am told it will shrink when the camp moves on.',
  parts: [
    child('a', short({ t: 3, d: 1, c: 'recall', marks: 1, stem: 'Which French traveller described Mughal cities as camp towns?', model: '**François Bernier.**', sol: 'He used this label for towns that depended on the imperial camp.', scheme: [['Bernier', 1]] })),
    child('b', short({ t: 3, d: 3, c: 'analysis', marks: 1, stem: 'Why might the visitor have formed the impression he did?', model: 'He saw the town **only for four days, while the camp filled it**, so his sample was short and unrepresentative.', sol: 'Consider when and for how long he observed.', scheme: [['Short visit during the camp', 1]] })),
    child('c', short({ t: 3, d: 4, c: 'evaluation', marks: 2, stem: '**Either** (i): Which document is better evidence of the town\'s usual economic life? Give two reasons.', model: 'The **clerk\'s report**. (1) It covers **twenty years** and gives counts of looms, merchant houses and bankers. (2) It does not depend on one short visit. It was written for revenue purposes, so it may be selective about what it counts.', sol: 'The clerk\'s report, with two reasons and a limit.', scheme: [['Clerk\'s report with one reason', 1], ['Second reason', 1]] }),
    [short({ t: 3, d: 4, c: 'analysis', marks: 2, stem: '**Or** (ii): Could both documents be true? Explain with two points.', model: '(1) **Yes:** they describe **different periods and purposes**; the clerk records yearly activity while the visitor saw four days of the camp. (2) A town can **have lasting crafts and trade and also swell** when a camp arrives, so the visitor\'s label covers only part of its life.', sol: 'Two points showing how both can hold at once.', scheme: [['Different periods and purposes', 1], ['A town can have both features', 1]] })]),
  ],
}));

// ================================================================ t04 Women, slaves and sati
Q('m_w_why', mcq({
  t: 4, d: 1, c: 'understanding',
  stem: 'Why did several travellers describe the practice of sati at length?',
  opts: [
    'It was very different from the practices of their own lands, so it struck them as unusual',
    'It was the commonest experience of women in every household',
    'It was required by law in every community',
    'It had just been introduced by the Mughals',
  ],
  sol: 'Outsiders tend to record what looks strange to them. The practice was neither universal nor new, so the other options are wrong.',
}));
Q('m_w_law', mcq({
  t: 4, d: 1, c: 'recall',
  stem: 'The practice of sati was abolished by law in 1829 under which British administrator?',
  opts: ['Lord William Bentinck', 'Lord Dalhousie', 'Warren Hastings', 'Lord Curzon'],
  sol: 'The law of 1829 is associated with Bentinck. The other names belong to other periods of British rule.',
}));
Q('m_w_conflict', mcq({
  t: 4, d: 3, c: 'analysis',
  stem: 'In an imagined district, a revenue clerk\'s note records that women of most village households spin cotton thread for sale and help at harvest. A traveller who passed through the same district describes only a noble family\'s household and one funeral ceremony. What is the best way to reconcile the two?',
  opts: [
    'They record different things for different purposes, so both can be true, and the clerk\'s note is better evidence of everyday work',
    'The clerk must have been lying',
    'The traveller must have invented his account',
    'Women worked only on days when the traveller was away',
  ],
  sol: 'A record kept for revenue counts production, while a visitor reports what struck him in a short stay. The sources differ in aim and access, not necessarily in truth.',
}));
Q('m_w_fit', mcq({
  t: 4, d: 2, c: 'analysis',
  stem: 'For which question would travellers\' accounts of sati be the most useful evidence?',
  opts: [
    'How did foreign visitors perceive and react to a custom that looked strange to them?',
    'What proportion of widows in each region were affected in the seventeenth century?',
    'What did the widows themselves feel and say about the custom?',
    'How many widows lived in each village in a given year?',
  ],
  sol: 'These accounts are strongest as evidence of the observers\' reactions. Counts and the views of the women themselves lie beyond what a visitor writing about single occasions could supply.',
}));
Q('m_w_slave', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'Ibn Battuta\'s account suggests that slaves in the Delhi Sultanate',
  opts: [
    'did different kinds of work and held different positions, from household labour to skilled performance',
    'all worked only in the fields',
    'were never sold in markets',
    'were all treated in exactly the same way',
  ],
  sol: 'He describes slaves sold openly and given as gifts, with varied roles. The remaining options deny this variety or what he saw in the markets.',
}));
Q('tf_w_sati', tf({
  t: 4, d: 1, c: 'understanding', ans: false,
  stem: 'True or false? Sati was practised everywhere in India in the centuries covered by travellers\' accounts.',
  sol: 'It was not universal. Travellers wrote about it because it stood out, and it was later banned by law in 1829.',
}));
Q('ar_w_labour', ar({
  t: 4, d: 2, c: 'understanding', verdict: 'both-true-explains',
  a: 'Travellers\' accounts alone give a narrow picture of the lives of women in India.',
  r: 'Travellers tended to record what was unusual to them or visible in elite households, and gave little space to women\'s labour in fields and workshops.',
  sol: 'What they chose to record leaves out much of women\'s lives, which is the reason the picture they give is narrow.',
}));
Q('s_w_two', short({
  t: 4, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Sati was the practice of a widow being burnt on her husband\'s funeral pyre, which some observers recorded. Give two reasons why travellers wrote about it at length.',
  model: '(1) It was very **different from practices in their own lands**, so it struck them as unusual and worth reporting. (2) Travellers wrote for readers at home and tended to record **the unusual and the dramatic** rather than the everyday work of women. It was neither universal nor the whole of women\'s lives.',
  sol: 'Unfamiliarity and the traveller\'s habit of reporting the unusual.',
  scheme: [['Different from their own practices', 1], ['Tendency to record the unusual for readers at home', 1]],
}));
Q('s_slave_limits', short({
  t: 4, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: 'A historian asks whether slavery in the Delhi Sultanate was one uniform institution. What does Ibn Battuta\'s account show about this, and what can it not show?',
  model: '**Shows:** slaves were sold in markets and given as gifts but did varied work, from skilled music and dance to carrying palanquins, and some were used to watch nobles, so it was not uniform. **Cannot show:** how many slaves there were or how they themselves saw their lives.',
  sol: 'The variety his account records and two things it leaves out.',
  scheme: [['What the account shows', 1], ['What it cannot show', 1]],
}));
Q('s3_w_partial', short({
  t: 4, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Give three reasons why travellers\' accounts give only a partial picture of women\'s lives.',
  model: '(1) Travellers noticed **what was unfamiliar**, such as sati, so unusual practices got more space than daily life. (2) They often wrote about **elite households** they could observe, not about village women. (3) **Women\'s labour** in agriculture and in making goods mattered greatly but was seldom described by outsiders, so records such as revenue papers are needed to balance these accounts.',
  sol: 'Focus on the unusual, focus on elites and silence on women\'s work.',
  scheme: [['Focus on the unfamiliar', 1], ['Focus on elite households', 1], ['Silence on women\'s labour', 1]],
}));
Q('l_women_slaves', long({
  t: 4, d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: 'Compare what travellers\' accounts record about the lives of women and of slaves, and show how far the accounts can be trusted as a picture of each group.',
  model: '1. **Women:** travellers noticed sati, a widow being burnt on her husband\'s funeral pyre, because it differed from their own societies; it was not universal and was banned in 1829 under Lord William Bentinck.\n2. **Women\'s work:** their labour in agriculture and other production was important but seldom described.\n3. **Slaves:** Ibn Battuta saw slaves sold in markets and given as gifts, doing varied work such as music and dance, carrying palanquins and watching nobles.\n4. **Similarity:** both groups appear mainly through elite and unusual scenes seen by outsiders.\n5. **Judgement:** the accounts are valuable for what struck observers but incomplete, so records of work and law are needed.',
  sol: 'Each group, what is recorded and missing, and a judgement on reliability.',
  scheme: [['Women and sati', 1], ['Women\'s work', 1], ['Slaves', 1], ['Common pattern in the sources', 1], ['Judgement', 1]],
}));
Q('sb_women', source({
  t: [4, 5], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the source, a summary of what some travellers' accounts record about women, and answer the questions that follow. ${SUM}`,
  passage: '**What some travellers\' accounts record about women (summary)**\n\nSeveral visitors from far-off lands wrote about the practice of a widow being burnt on her husband\'s funeral pyre. None of them belonged to a family in which it happened, and each wrote about what he saw or heard on a single occasion. Their descriptions differ on who was present and on how the woman came to be there. The same visitors give only a few lines to women who worked in fields, spun thread and wove cloth, though in many regions women\'s labour was a large part of farming and of making goods for sale.',
  parts: [
    child('a', short({ t: 4, d: 1, c: 'recall', marks: 1, stem: 'In which year, and under whom, was sati abolished by law?', model: 'In **1829**, under **Lord William Bentinck**.', sol: 'The ban is associated with the year 1829 and with Bentinck.', scheme: [['1829 and Bentinck', 1]] })),
    child('b', short({ t: 4, d: 3, c: 'analysis', marks: 1, stem: 'None of the visitors belonged to the families involved. What does this suggest about the reliability of what they say about the women\'s feelings?', model: 'They could report only what they **saw or were told**, so their statements about feelings are **second-hand and uncertain**.', sol: 'Outsiders cannot speak directly for the inner life of those they describe.', scheme: [['Second-hand and uncertain', 1]] })),
    child('c', short({ t: 4, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): The descriptions differ on who was present and on how the woman came to be there. Give two possible reasons for these differences and say what they mean for a historian.', model: '(1) Each observer saw or heard of **a single occasion**, from different informants or vantage points, perhaps through interpreters. (2) Each wrote for **readers at home** with his own assumptions. So the accounts cannot be combined into one reliable picture; they show **perceptions of the observers** more than the experience of the women.', sol: 'Two sources of difference and the consequence for a historian.', scheme: [['Reasons: single occasions, informants, interpreters', 1], ['Readers at home and consequence for the historian', 1]] }),
    [short({ t: 4, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Suggest two kinds of evidence, not written by travellers, that could help historians learn more about women\'s work.', model: '(1) **Revenue and village records**, which note what households produced and sold. (2) **Archaeological and craft evidence**, such as tools and workshop remains, which show who made goods and how.', sol: 'Two kinds of evidence from outside traveller accounts.', scheme: [['First kind of evidence', 1], ['Second kind of evidence', 1]] })]),
  ],
}));

// ================================================================ t05 Sources: travellers' accounts
Q('m_m_app', mcq({
  t: 5, d: 2, c: 'application',
  stem: 'An imagined foreign visitor spends a fortnight in a port town and writes home: The traders here are dishonest and the people lazy. What should a historian ask first?',
  opts: [
    'Whom did he talk to, in what language, and what was he comparing the town with?',
    'How many pages did he write about the port?',
    'Did he travel to the port by ship?',
    'Was he older than forty when he wrote it?',
  ],
  sol: 'A sweeping judgement from a short stay depends on informants, language and the writer\'s own standard. The other questions have no bearing on how far the judgement can be trusted.',
}));
Q('m_m_indep', mcq({
  t: 5, d: 4, c: 'analysis',
  stem: 'Two imagined travellers describe the same custom in the same town in almost the same words. Both say they learned of it from the same interpreter. How should a historian treat the two accounts?',
  opts: [
    'As close to a single source, since both depend on one informant and so do not confirm each other independently',
    'As two independent confirmations of the custom',
    'As proof that the custom was practised everywhere',
    'As worthless because interpreters cannot be trusted at all',
  ],
  sol: 'Agreement counts as confirmation only when the sources are independent. Here the shared interpreter makes them one channel, though this does not make the report false.',
}));
Q('m_m_weigh', mcq({
  t: 5, d: 4, c: 'evaluation',
  stem: 'A historian wishes to judge a traveller\'s claim that the peasants of a district were very poor. She has the traveller\'s account, a court chronicle praising the ruler\'s government, and a village revenue record showing a growing area under cultivation. Which approach is best?',
  opts: [
    'Weigh all three, noting the purpose of each, and look for points where they agree or conflict without treating any one as final',
    'Trust the traveller because he saw the district himself',
    'Trust the chronicle because it was written at court',
    'Trust the revenue record alone because figures never mislead',
  ],
  sol: 'Each item has its own aim, access and bias. Only by setting them against one another can a claim be tested, so no single source should decide.',
}));
Q('ord_trav', ord({
  t: [1, 2, 3], d: 2, c: 'understanding', marks: 1,
  stem: 'Arrange these events in the lives of the three travellers in chronological order.',
  items: [
    'Al-Biruni is taken to Ghazni',
    'Ibn Battuta reaches Sind',
    'Ibn Battuta is sent as envoy to China',
    'Bernier arrives in the Mughal Empire',
  ],
  sol: 'These events fall in 1017, 1333, 1342 and 1656.',
}));
Q('ord_method', ord({
  t: 5, d: 2, c: 'understanding', marks: 1,
  stem: 'Arrange these steps in a sensible order for testing a traveller\'s claim.',
  items: [
    'Note who made the claim, when and for whom',
    'Ask what the traveller saw himself and what he was told',
    'Compare the claim with chronicles, revenue records or inscriptions',
    'Weigh the agreement and conflict and state a conclusion with its limits',
  ],
  sol: 'The claim and its maker come first, then the basis of the claim, then outside evidence, and only then the judgement.',
}));
Q('mt_known', match({
  t: [1, 2, 3, 4], d: 2, c: 'recall',
  stem: 'Match each traveller with what he is known for.',
  pairs: [
    ['Al-Biruni', 'Eighty chapters in Arabic, each ending with a comparison'],
    ['Ibn Battuta', 'Judge of Delhi who was later sent as envoy to China'],
    ['François Bernier', 'Physician who set India against Europe'],
    ['Abdur Razzaq Samarqandi', 'Visitor to south India in the 1440s'],
  ],
  sol: 'Each phrase describes the work or career of the traveller named.',
}));
Q('s_m_cross', short({
  t: 5, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Name two kinds of source that historians use to cross-check travellers\' accounts, and say why cross-checking is needed.',
  model: 'Historians compare them with **Persian chronicles**, **revenue records** or **inscriptions**. This is needed because travellers wrote for readers at home, noticed what was unfamiliar to them, and depended on interpreters or particular informants, so their accounts may be partial.',
  sol: 'Two kinds of check and the reason for them.',
  scheme: [['Two kinds of source', 1], ['Reason for cross-checking', 1]],
}));
Q('s_m_new', short({
  t: 5, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'An imagined visitor stayed three days in a market town and wrote that its weavers were idle because he saw them resting at noon. Give two questions a historian should ask before using this statement.',
  model: '(1) **What was he comparing it with**, and did he understand local working hours and customs? (2) **How long and where did he observe**, and who told him about the weavers, in what language? Three days at noon is a small sample, so records of output or sales should be checked.',
  sol: 'Questions on the writer\'s standard of comparison and on his access.',
  scheme: [['A question on comparison and customs', 1], ['A question on observation and informants', 1]],
}));
Q('l_method', long({
  t: 5, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: 'How far can travellers\' accounts be trusted as evidence for the history of India? Discuss with examples from at least two travellers.',
  model: '1. **Strengths:** they give an outsider\'s view of things that locals took for granted, such as Ibn Battuta\'s notes on the post and markets.\n2. **Readers at home:** they explained the unfamiliar, like the coconut and paan, and noticed unusual things.\n3. **Dependence on others:** they relied on interpreters and informants; Al-Biruni\'s picture of caste came largely from Brahmanical texts.\n4. **Comparison and bias:** Bernier measured India against France and judged it inferior.\n5. **Judgement:** they are useful but must be cross-checked with chronicles, revenue records and inscriptions, so they are evidence to be weighed, not the final word.',
  sol: 'Strengths, writing for others, dependence on informants, bias, and a judgement that weighs them.',
  scheme: [['Strengths with an example', 1], ['Writing for readers at home', 1], ['Dependence on informants', 1], ['Comparison and bias', 1], ['Reasoned judgement', 1]],
}));
