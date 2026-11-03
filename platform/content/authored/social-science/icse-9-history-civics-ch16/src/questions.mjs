// ICSE 9 History & Civics, ch16 The Modern Age in Europe: Reformation — question bank.
// Every notice board, order book, diary, club, town and person below is imagined by SOYL and labelled as imagined; no
// textbook text, box or exercise and no specimen or board-paper item is reused (D-036); no scripture, no Theses, no
// Erasmus and no other text is quoted (the ideas are paraphrased). Dates are the commonly taught approximate ones.
// Both the Catholic and the Protestant traditions are treated neutrally and respectfully: the Church practices that
// caused dissatisfaction are described as practices that critics objected to; no persecution or punishment is described.
import { Q, mcq, ar, tf, fb, match, ord, short, long, source, child } from '../../icse-9-history-civics-ch01/src/lib.mjs';

const S2 = [25, 45];
const S3 = [40, 70];
const L10 = [120, 220];
const IMAG = '*(Imagined document written by SOYL for practice; the people and places in it are not real.)*';

// ================================================================ t01 Meaning and causes
Q('m_define', mcq({
  t: 1, d: 1, c: 'understanding',
  stem: 'A notice on the board of the imagined Weissburg University announces a talk titled The Reformation for visiting Class IX pupils. Which description should the speaker open with?',
  opts: [
    'A sixteenth-century movement in Western Christianity that protested against certain practices of the Roman Catholic Church and led to Protestant churches',
    'A movement that united all Christians in Europe under one church in the twelfth century',
    'A sixteenth-century movement that began in Asia and reached Europe by sea',
    'A revival of Greek and Roman art that began in Italian cities',
  ],
  sol: 'The Reformation began in 1517 and led to Protestant churches. A union of all Christians describes the opposite, it did not begin in Asia, and the revival of art and learning is the Renaissance, a different movement.',
}));
Q('m_indulgence', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'In an imagined parish record of Kirchdorf, a baker named Anselm buys a printed certificate from a travelling seller, who says it will reduce the punishment for his sins. What is such a certificate called, and why did critics object to its sale?',
  opts: [
    'An indulgence; critics objected that forgiveness seemed to be put on sale for money',
    'A tithe; critics objected to paying one tenth of income to the Church',
    'A sacrament; critics objected that it was performed in Latin',
    'A thesis; critics objected that it was printed on paper',
  ],
  sol: 'A certificate said to reduce punishment for sins is an indulgence, and its sale was one of the main practices critics objected to. A tithe is a Church tax, a sacrament is a religious rite, and a thesis is a statement put forward for debate.',
}));
Q('m_simony', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'A report from the imagined bishopric of Altmark says that a vacant Church office went to the candidate who offered the largest payment, not to the one best suited to the work. What is this practice called?',
  opts: ['Simony', 'The tithe', 'Excommunication', 'The Diet'],
  sol: 'The sale of Church offices is simony. The tithe is a Church tax, excommunication is exclusion from the Church, and a Diet is an assembly of the German states.',
}));
Q('m_tithe', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Berta, an imagined farmer of Kirchdorf, notes in her account book that one tenth of her harvest goes to the Church every year. What was this payment called, and how did critics view it?',
  opts: [
    'The tithe; critics saw it as part of the great wealth and heavy taxes of the Church',
    'An indulgence; critics saw it as a certificate that reduced punishment for sins',
    'Simony; critics saw it as the sale of Church offices',
    'A thesis; critics saw it as a statement of belief',
  ],
  sol: 'One tenth of produce paid to the Church is the tithe, one of the taxes that critics mentioned along with the Church\'s wealth. The other terms describe different things.',
}));
Q('m_latin', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Hilde, an imagined weaver of Kirchdorf, goes to church every week but says she cannot follow the words, because the service is in Latin. Which criticism of the time does her complaint illustrate?',
  opts: [
    'Services and the Bible were in Latin, which ordinary people did not understand',
    'The Church had stopped holding services',
    'The Church courts had been closed',
    'Priests had refused to accept any payment',
  ],
  sol: 'Hilde cannot follow a Latin service, which is the language criticism. Nothing in her complaint says that services stopped, that courts closed or that priests refused payment.',
}));
Q('m_erasmus', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'A reading list in the imagined Weissburg library describes a Dutch scholar whose book The Praise of Folly, written about 1511, criticised abuses. Who is this scholar?',
  opts: ['Erasmus', 'Martin Luther', 'John Wycliffe', 'Ignatius Loyola'],
  sol: 'The Dutch humanist who wrote The Praise of Folly was Erasmus. Luther was German, Wycliffe was an earlier English reformer, and Loyola founded the Society of Jesus.',
}));
Q('m_printing', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'An imagined printer\'s order book at Rheinfeld shows 300 copies of a short pamphlet finished in three days, work that scribes copying by hand would have needed months to complete. Which cause of the Reformation does this best illustrate?',
  opts: [
    'Printing spread critical ideas and Bibles quickly',
    'Rulers of growing nation-states wanted control over Church lands',
    'Merchants resented Church taxes',
    'The Council of Trent reformed the training of priests',
  ],
  sol: 'Fast printing of many identical copies is the printing cause. The ruler and merchant causes are not mentioned in the order book, and the Council of Trent belongs to the Catholic response, after the Reformation began.',
}));
Q('m_rulers', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'King Ottmar of the imagined kingdom of Altmark wants the lands owned by the Church in his kingdom to come under his control, and wants a say in who is appointed to Church posts. Which cause of the Reformation does this reflect?',
  opts: [
    'Rulers of growing nation-states wanted control over Church lands and appointments',
    'Services in Latin were not understood by ordinary people',
    'Printing made Bibles cheaper',
    'Earlier reformers had translated the Bible into English',
  ],
  sol: 'A king seeking control over Church lands and appointments shows the political cause. Latin, printing and the English Bible are other causes, but the king\'s wishes are about power over the Church in his state.',
}));
Q('m_merchant', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'The imagined guild of cloth merchants at Handelsbrunn complains that the taxes it must pay to the Church cut into its profits. Which cause of the Reformation does the complaint show?',
  opts: [
    'Merchants resented Church taxes',
    'Earlier reformers such as John Wycliffe',
    'The sale of Church offices',
    'Services in Latin',
  ],
  sol: 'A merchants\' complaint about taxes paid to the Church is the cause that names merchants resenting Church taxes. Wycliffe, simony and Latin services are separate causes with no mention in the complaint.',
}));
Q('m_wycliffe_hus', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'A quiz slip at the imagined Weissburg History Club asks which pair correctly places two earlier reformers, John Wycliffe and Jan Hus, in their countries. Which pair is correct?',
  opts: [
    'Wycliffe in England, Hus in Bohemia',
    'Wycliffe in Bohemia, Hus in England',
    'Wycliffe in Germany, Hus in Italy',
    'Wycliffe in Spain, Hus in Portugal',
  ],
  sol: 'John Wycliffe of England (fourteenth century) and Jan Hus of Bohemia (early fifteenth century) came before Luther. The other pairs place them in the wrong countries.',
}));
Q('m_not_cause', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: 'A pupil of the imagined Weissburg Gymnasium lists causes of the Reformation and, by mistake, includes one item that was actually a later result. Which item is it?',
  opts: [
    'The Council of Trent ended the sale of indulgences for money',
    'The sale of indulgences',
    'The Renaissance spirit of enquiry',
    'Resentment of Church taxes among merchants',
  ],
  sol: 'The Council of Trent met from 1545, long after 1517, so its decision is a result, part of the Catholic response. The other three came before or at the time the Reformation began.',
}));
Q('m_neutral', mcq({
  t: [1, 3], d: 4, c: 'evaluation',
  stem: 'A pupil\'s imagined essay on the Reformation opens with a sentence that condemns the whole Church and every priest. Which rewritten sentence is the most accurate and respectful for a history answer?',
  opts: [
    'Critics objected to certain Church practices, such as the sale of indulgences, and the Church later carried out reforms of its own',
    'The reformers were wrong about everything, and their complaints had no basis',
    'All the clergy were blameless, and the critics invented every complaint',
    'The Church ceased to exist after 1517',
  ],
  sol: 'A balanced answer names the practices critics objected to and notes the Church\'s own reforms. The other versions condemn one side, deny all complaints, or are untrue because the Church continued after 1517.',
}));

// ================================================================ t02 Martin Luther
Q('m_luther_who', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'A museum card in the imagined town of Weissburg describes a German monk and professor at Wittenberg who made public his Ninety-five Theses in 1517. Who is described?',
  opts: ['Martin Luther', 'Erasmus', 'Ignatius Loyola', 'Pope Leo X'],
  sol: 'Martin Luther (1483 to 1546) was the German monk and professor at Wittenberg. Erasmus was a Dutch scholar, Loyola founded the Jesuits, and Leo X was the Pope of the time.',
}));
Q('m_tetzel', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'An imagined chronicle of Weissburg records that Johann Tetzel was selling indulgences nearby, and that a professor at Wittenberg answered by making public his Ninety-five Theses. What did the Theses protest against?',
  opts: [
    'The sale of indulgences',
    'The building of printing presses in Germany',
    'The teaching of Greek at universities',
    'The founding of the Society of Jesus',
  ],
  sol: 'Luther\'s Theses were directed against the sale of indulgences. Printing presses and Greek teaching were not their target, and the Society of Jesus was founded later, in the 1540s.',
}));
Q('m_worms', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'In an imagined clerk\'s diary dated 1521, a monk is summoned before an assembly of German princes and officials in a city on the Rhine and is asked to take back his writings. He refuses. Which assembly is this, and who was the monk?',
  opts: [
    'The Diet of Worms; Martin Luther',
    'The Council of Trent; Ignatius Loyola',
    'The Peace of Augsburg; John Calvin',
    'The Diet of Worms; Erasmus',
  ],
  sol: 'An assembly in 1521 where Luther refused to take back his views was the Diet of Worms. The Council of Trent began in 1545, Augsburg dates from 1555, and Erasmus was not summoned to Worms.',
}));
Q('m_frederick', mcq({
  t: 2, d: 3, c: 'understanding',
  stem: 'An imagined note by a ballad-sheet seller records that a ruler of Saxony sheltered a monk after 1521, and that during this time the monk translated the New Testament into German. Who was the ruler, and why did the translation matter?',
  opts: [
    'Frederick of Saxony; ordinary Germans could read the New Testament in their own language',
    'Pope Leo X; the translation was ordered for use in Latin services',
    'Frederick of Saxony; the translation ended every church service in Latin across Europe at once',
    'Henry VIII; the translation made the king head of the Church',
  ],
  sol: 'Frederick of Saxony protected Luther, and the German New Testament let ordinary readers meet the text directly. Leo X excommunicated Luther, Latin services did not end overnight, and Henry VIII belongs to England.',
}));
Q('m_faith', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'Hanna, an imagined weaver of Nordburg, is told that her sins can be forgiven only after she buys a certificate. A preacher who follows Luther tells her instead that she is saved by faith. Which teaching of Luther does the preacher state?',
  opts: [
    'Salvation by faith (justification by faith)',
    'Priesthood of all believers',
    'Services in Latin only',
    'Seven sacraments for every believer',
  ],
  sol: 'Luther taught salvation by faith rather than by buying indulgences. Priesthood of all believers is a different teaching, Luther wanted services in the language of the people, and he kept only two sacraments.',
}));
Q('m_priesthood', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'At an imagined meeting in Nordburg\'s market hall, a speaker says that every believer may read the Bible and approach God directly, without a priest as a necessary go-between. Which teaching of Luther is this?',
  opts: [
    'The priesthood of all believers',
    'Salvation by buying indulgences',
    'Church courts as the final authority',
    'The Pope\'s command over every ruler',
  ],
  sol: 'Every believer able to approach God directly is the priesthood of all believers. Buying indulgences, final authority of Church courts and the Pope\'s command over rulers are not Luther\'s teachings.',
}));
Q('m_augsburg', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'In the imagined diary of a clerk in 1555, Prince Wilhelm of Nordburg announces that his state will follow the Lutheran faith, while the prince of the neighbouring state keeps the Catholic faith. Which arrangement allowed this?',
  opts: [
    'The Peace of Augsburg',
    'The Council of Trent',
    'The Act of Supremacy',
    'The Diet of Worms',
  ],
  sol: 'The Peace of Augsburg (1555) let each ruler choose Lutheran or Catholic faith for his state. The Council of Trent was a Catholic council, the Act of Supremacy concerned England, and Worms was in 1521.',
}));
Q('m_calvin_geneva', mcq({
  t: 2, d: 2, c: 'recall',
  stem: 'A quiz card in the imagined Weissburg Reformation gallery pairs reformers with cities. Which pairing is correct?',
  opts: [
    'Zwingli with Zurich and Calvin with Geneva',
    'Zwingli with Geneva and Calvin with Zurich',
    'Luther with Geneva and Calvin with Wittenberg',
    'Zwingli with Wittenberg and Luther with Zurich',
  ],
  sol: 'Zwingli worked in Zurich, Calvin in Geneva, and Luther in Wittenberg. The other pairings mix these cities up.',
}));

// ================================================================ t03 Counter Reformation
Q('m_trent_measures', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'The imagined bishop of Sankt Elmar reads the decisions of the Council of Trent and opens a seminary in his town to train young priests properly. Which aim of the Council does his act serve?',
  opts: [
    'Better training of priests in seminaries',
    'The sale of indulgences for money',
    'The translation of the Bible into German',
    'The Act of Supremacy of 1534',
  ],
  sol: 'Seminaries for training priests were a decision of the Council of Trent. The Council stopped the sale of indulgences for money, the German Bible was Luther\'s work, and the Act of Supremacy concerned England.',
}));
Q('m_jesuits', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'A school in the imagined town of Sankt Elmar is run by members of the Society of Jesus. In which two fields did the Jesuits mainly work?',
  opts: ['Education and missions', 'Banking and shipping', 'Farming and weaving', 'Printing and mining'],
  sol: 'The Jesuits, founded by Ignatius Loyola and approved in 1540, worked mainly in education and missions. The other fields were not their main work.',
}));
Q('m_index', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'A librarian in the imagined city of Neustadt keeps a list, issued by the Catholic Church, of books that Catholics were told not to read. What was this list called?',
  opts: [
    'The Index of prohibited books',
    'The Ninety-five Theses',
    'The Act of Supremacy',
    'The Peace of Augsburg',
  ],
  sol: 'The Church\'s list of books was the Index of prohibited books. The Theses were Luther\'s statements, the Act of Supremacy concerned England, and Augsburg was a settlement among German states.',
}));
Q('m_inquisition', mcq({
  t: 3, d: 3, c: 'understanding',
  stem: 'An imagined history teacher in Neustadt tells the class that the Inquisition formed part of the Catholic Church\'s response to Protestantism. Which description of the Inquisition is correct and neutral?',
  opts: [
    'Church courts that dealt with questions of heresy, that is, belief the Church considered contrary to its teaching',
    'A teaching order founded by Ignatius Loyola',
    'A council that met at Trent from 1545 to 1563',
    'A list of books that Catholics were told not to read',
  ],
  sol: 'The Inquisition means the Church courts that dealt with heresy. A teaching order describes the Jesuits, the council was Trent, and the list was the Index.',
}));
Q('m_result', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'An imagined atlas lesson compares Europe in about 1600. Northern Germany and Scandinavia have Lutheran churches, while Spain, Italy and Portugal remain mainly Catholic. Which result of the Counter Reformation does the southern part of the map show?',
  opts: [
    'The Catholic Church was reformed and remained strong in southern Europe',
    'The Catholic Church disappeared from Europe',
    'All of Europe became Lutheran',
    'The Pope became head of the Church of England',
  ],
  sol: 'The map shows a reformed Catholic Church that stayed strong in the south. It did not disappear, Europe did not all become Lutheran, and the Church of England has the king as head after 1534.',
}));
Q('m_trent_year', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'On the imagined timeline poster in the Weissburg gallery, the Council of Trent is shown as a shaded bar. Which years does the bar cover?',
  opts: ['1545 to 1563', '1517 to 1521', '1534 to 1540', '1555 to 1570'],
  sol: 'The Council of Trent met from 1545 to 1563. The other spans do not match the Council: 1517 to 1521 covers Luther\'s protest and the Diet of Worms.',
}));

// ================================================================ assertion-reason
Q('ar_printing', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'Printed pamphlets and Bibles helped critical ideas to spread widely and quickly in sixteenth-century Europe.',
  r: 'A printing press could produce many identical copies much faster than scribes copying by hand.',
  sol: 'Both are true. Fast, cheap copying is exactly why printed material travelled so far, so R explains A.',
}));
Q('ar_latin', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'A-true-R-false',
  a: 'Critics argued that services and the Bible in Latin kept many ordinary people from understanding them.',
  r: 'Latin was the everyday spoken language of most ordinary people across Western Europe.',
  sol: 'A is true. R is false: people spoke their own regional languages, which is why Latin was hard for them to follow.',
}));
Q('ar_augsburg', ar({
  t: 2, d: 3, c: 'analysis', verdict: 'A-false-R-true',
  a: 'By the Peace of Augsburg (1555), every villager in the German states was free to choose the Lutheran or the Catholic faith for himself.',
  r: 'The Peace of Augsburg allowed each ruler in the German states to choose the Lutheran or the Catholic faith for his state.',
  sol: 'A is false: the choice was made by the ruler, not by each villager. R states the settlement correctly.',
}));
Q('ar_trent', ar({
  t: 3, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'The Council of Trent required better training of priests in seminaries.',
  r: 'The Catholic Church wished to improve the learning and discipline of its clergy.',
  sol: 'Both are true. The wish to improve learning and discipline among the clergy is the reason behind the seminaries, so R explains A.',
}));
Q('ar_jesuit', ar({
  t: 3, d: 4, c: 'analysis', verdict: 'both-true-not-explains',
  a: 'The Jesuits worked in education and missions.',
  r: 'The Society of Jesus was approved in 1540, before the Council of Trent began.',
  sol: 'Both are true, but the date of approval does not explain what kind of work the Jesuits did, so R is not the explanation of A.',
}));

// ================================================================ true-false, fill-blank, match, ordering
Q('tf_one_church', tf({
  t: 1, d: 2, c: 'analysis', ans: false,
  stem: 'True or false? A pupil at the imagined Weissburg school says that the Reformation ended with the formation of one single Protestant church which all reformers joined.',
  sol: 'Several Protestant churches formed, for example the Lutheran churches, the churches of Zwingli and Calvin, and the Church of England.',
}));
Q('tf_excom', tf({
  t: 2, d: 2, c: 'recall', ans: true,
  stem: 'True or false? An imagined chronicler of Weissburg writes that Pope Leo X excommunicated Martin Luther in 1521.',
  sol: 'Pope Leo X excommunicated Luther in 1521, the year of the Diet of Worms.',
}));
Q('tf_counter', tf({
  t: 3, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? An imagined lecturer at Neustadt says that the Counter Reformation was the Catholic Church\'s effort to reform itself and to check the spread of Protestantism.',
  sol: 'The Counter Reformation, also called the Catholic Reformation, means exactly these measures of the Catholic Church.',
}));
Q('fb_wittenberg', fb({
  t: 2, d: 1, c: 'recall',
  stem: 'Martin Luther was a German monk and a professor at the university of ___.',
  acc: [['Wittenberg', 'wittenberg']],
  sol: 'Luther taught at the university of Wittenberg.',
}));
Q('fb_trent', fb({
  t: 3, d: 2, c: 'recall',
  stem: 'The Council of Trent began its meetings in ___ and ended them in ___.',
  acc: [['1545'], ['1563']],
  sol: 'The Council of Trent met from 1545 and ended in 1563.',
}));
Q('fb_loyola', fb({
  t: 3, d: 2, c: 'recall',
  stem: 'The Society of Jesus, approved in ___, was founded by Ignatius ___.',
  acc: [['1540'], ['Loyola', 'loyola']],
  sol: 'Ignatius Loyola founded the Society of Jesus, which was approved in 1540.',
}));
Q('mt_causes_scenes', match({
  t: 1, d: 3, c: 'application', marks: 2,
  stem: 'Each imagined scene below shows one cause of the Reformation. Match each scene with the cause it illustrates.',
  pairs: [
    ['A parish in Kirchdorf is asked to hand over a tenth of its harvest', 'Great wealth and taxes of the Church'],
    ['A Church post in Altmark goes to the highest bidder', 'Sale of Church offices (simony)'],
    ['A printer in Rheinfeld quickly prints a Bible for local readers', 'Printing spread ideas and Bibles'],
    ['King Ottmar wants a say in Church appointments', 'Rulers wanting control of Church lands and appointments'],
  ],
  sol: 'A tenth of the harvest is the tithe, a post sold for payment is simony, quick printing is the printing cause, and the king\'s wish is the political cause.',
}));
Q('mt_reformers', match({
  t: 2, d: 2, c: 'understanding', marks: 2,
  stem: 'A display in the imagined Weissburg gallery shows four names. Match each name with the right description.',
  pairs: [
    ['Zwingli', 'A reformer who worked in Zurich'],
    ['Calvin', 'A reformer who worked in Geneva'],
    ['Henry VIII', 'King whose Act of Supremacy (1534) made him head of the Church of England'],
    ['Martin Luther', 'German reformer whose followers formed Lutheran churches'],
  ],
  sol: 'Zwingli is linked with Zurich, Calvin with Geneva, Henry VIII with the Act of Supremacy of 1534, and Luther with the Lutheran churches.',
}));
Q('mt_counter', match({
  t: 3, d: 2, c: 'understanding', marks: 2,
  stem: 'A pupil at the imagined Neustadt school prepares four cards on the Counter Reformation. Match each card with its description.',
  pairs: [
    ['Council of Trent', 'Reaffirmed Catholic doctrines and required seminaries for priests'],
    ['Society of Jesus', 'Worked in education and missions'],
    ['Index', 'A list of books Catholics were told not to read'],
    ['Inquisition', 'Church courts that dealt with heresy'],
  ],
  sol: 'The Council of Trent reaffirmed doctrines and required seminaries, the Jesuits taught and went on missions, the Index was the book list, and the Inquisition means Church courts for heresy.',
}));
Q('ord_events', ord({
  t: 2, d: 2, c: 'understanding', marks: 2,
  stem: 'Four cards are pinned on the imagined timeline wall of the Weissburg gallery. Arrange them in the order in which the events happened.',
  items: ['Ninety-five Theses made public (1517)', 'Diet of Worms (1521)', 'Peace of Augsburg (1555)', 'Council of Trent ends (1563)'],
  sol: 'The Theses came first in 1517, then the Diet of Worms in 1521, the Peace of Augsburg in 1555 and the end of the Council of Trent in 1563.',
}));
Q('ord_counter', ord({
  t: 3, d: 3, c: 'understanding', marks: 2,
  stem: 'A pupil at the imagined Neustadt school arranges four events of the Catholic Church\'s response in time order, adding the Augsburg settlement for context. Arrange them.',
  items: ['Society of Jesus approved (1540)', 'Council of Trent opens (1545)', 'Peace of Augsburg (1555)', 'Council of Trent closes (1563)'],
  sol: 'The Jesuits were approved in 1540, the Council opened in 1545, the Peace of Augsburg followed in 1555, and the Council closed in 1563.',
}));

// ================================================================ short answers (2 marks)
Q('s_define', short({
  t: 1, d: 1, c: 'understanding', marks: 2, wl: S2,
  stem: 'A visitor to the imagined Weissburg gallery asks what the Reformation was and when it began. Answer in two points.',
  model: 'The **Reformation** was a **sixteenth-century movement** in Western Christianity that protested against certain practices of the Roman Catholic Church and led to the formation of **Protestant churches**. It began in **1517**.',
  sol: 'Movement, protest, Protestant churches; 1517.',
  scheme: [['A sixteenth-century movement that protested against certain Church practices and led to Protestant churches', 1], ['Began in 1517', 1]],
}));
Q('s_erasmus', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Who was Erasmus, and how did his writing contribute to the Reformation? Name one of his works.',
  model: '**Erasmus** was a **Dutch humanist scholar**. His writings, such as **The Praise of Folly** (about 1511), criticised abuses and encouraged readers to question, which helped the new learning.',
  sol: 'Dutch scholar; his writings criticised abuses.',
  scheme: [['Dutch humanist scholar whose writings criticised abuses', 1], ['The Praise of Folly (about 1511)', 1]],
}));
Q('s_rulers_merch', short({
  t: 1, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'King Ottmar of the imagined kingdom of Altmark and the cloth merchants of Handelsbrunn both favour reform for reasons that are not only about belief. State one such reason for each.',
  model: '**King Ottmar:** as a ruler of a growing nation-state he wanted **control over Church lands and appointments**. **Merchants:** they **resented the taxes** they paid to the Church, which reduced their profits.',
  sol: 'Control over lands for the king; taxes for merchants.',
  scheme: [['Ruler: control over Church lands and appointments', 1], ['Merchants: resentment of Church taxes', 1]],
}));
Q('s_tithe_simony', short({
  t: 1, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'A pupil preparing a talk on the imagined parish of Kirchdorf must explain two terms that critics used. Explain the tithe and simony.',
  model: 'The **tithe** was a Church tax of about one tenth of produce or income, which critics linked with the Church\'s great wealth. **Simony** was the **sale of Church offices**, which critics said put posts in the hands of those who paid.',
  sol: 'Tithe: a Church tax; simony: sale of offices.',
  scheme: [['Tithe: a Church tax of about one tenth', 1], ['Simony: the sale of Church offices', 1]],
}));
Q('s_diet', short({
  t: 2, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: 'What action did Pope Leo X take against Martin Luther in 1521, and how did Luther respond at the Diet of Worms?',
  model: '**Pope Leo X** **excommunicated** Luther in **1521**. When he appeared before the **Diet of Worms**, an assembly of German princes and officials, Luther **refused to take back his views**.',
  sol: 'Excommunicated; refused to take back his views.',
  scheme: [['Excommunicated by Pope Leo X in 1521', 1], ['Refused to take back his views at the Diet of Worms', 1]],
}));
Q('s_tetzel_protest', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'In an imagined letter from Weissburg, a student asks why a Wittenberg professor made public Ninety-five Theses in 1517. Answer in two points, naming the seller of indulgences involved.',
  model: 'Luther made public the **Ninety-five Theses** in **1517** to protest against the **sale of indulgences**. **Johann Tetzel** was selling them in Germany at the time.',
  sol: 'Protest against indulgences; Tetzel.',
  scheme: [['Protest against the sale of indulgences in 1517', 1], ['Johann Tetzel named as the seller', 1]],
}));
Q('s_augsburg', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State what the Peace of Augsburg (1555) decided about the faith of the German states.',
  model: 'Under the **Peace of Augsburg**, **each ruler** in the German states could **choose** either the **Lutheran or the Catholic faith** for his state, so Lutheranism was recognised beside Catholicism.',
  sol: 'Each ruler chose the faith of his state.',
  scheme: [['Each ruler chose Lutheran or Catholic faith for his state', 1], ['Lutheranism recognised alongside Catholicism', 1]],
}));
Q('s_jesuit', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Who founded the Society of Jesus, and what two kinds of work did its members do?',
  model: 'The Society of Jesus was founded by **Ignatius Loyola** and approved in **1540**. Its members, the Jesuits, worked in **education** and in **missions**; Francis Xavier, for example, went to Asia.',
  sol: 'Ignatius Loyola; education and missions.',
  scheme: [['Founded by Ignatius Loyola (approved 1540)', 1], ['Education and missions', 1]],
}));
Q('s_trent_sem', short({
  t: 3, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'The imagined bishop of Sankt Elmar opens a seminary and reminds his priests to follow rules of discipline. State two decisions of the Council of Trent that he is putting into effect.',
  model: 'The **Council of Trent** called for **seminaries to train priests better** and for **discipline among the clergy**. It also stopped the sale of indulgences for money and reaffirmed Catholic doctrines.',
  sol: 'Seminaries and discipline.',
  scheme: [['Better training of priests in seminaries', 1], ['Discipline among the clergy', 1]],
}));
Q('s_index', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'What was the Index of prohibited books, and which body issued it?',
  model: 'The **Index** was the Church\'s **list of books** that Catholics were told to avoid. The **Catholic Church** issued it as a Counter Reformation measure, to check the spread of Protestant ideas.',
  sol: 'Church list of banned books.',
  scheme: [['A list of books Catholics were told not to read', 1], ['Issued by the Catholic Church as a Counter Reformation measure', 1]],
}));

// ================================================================ short answers (3 marks)
Q('s3_practices', short({
  t: 1, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'At an imagined debate in the Weissburg town hall, speakers list practices of the Church that people objected to before 1517. State any three.',
  model: '1. The **sale of indulgences**, certificates said to reduce punishment for sins.\n2. The **sale of Church offices** (simony).\n3. The **worldly lives** of some clergy, and the **great wealth and taxes** of the Church, such as the tithe.',
  sol: 'Any three practices.',
  scheme: [['First practice with a clear statement', 1], ['Second practice with a clear statement', 1], ['Third practice with a clear statement', 1]],
}));
Q('s3_newlearning', short({
  t: 1, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'A teacher at the imagined Handelsbrunn school says that the new learning prepared the ground for the Reformation. Explain this with reference to the Renaissance, Erasmus and printing.',
  model: '1. The **Renaissance spirit of enquiry** encouraged people to question authority.\n2. **Humanist scholars** such as **Erasmus** wrote works, like The Praise of Folly, that criticised abuses.\n3. **Printing** spread critical ideas and Bibles quickly to many readers.',
  sol: 'Enquiry; Erasmus; printing.',
  scheme: [['Renaissance spirit of enquiry', 1], ['Humanist scholars such as Erasmus', 1], ['Printing spread ideas and Bibles', 1]],
}));
Q('s3_teachings', short({
  t: 2, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'A guide in the imagined Nordburg church hall is asked about the main teachings of Martin Luther. State any three.',
  model: '1. **Salvation by faith**, also called justification by faith, in place of buying indulgences.\n2. The **Bible** as the chief authority.\n3. The **priesthood of all believers**; he also kept fewer **sacraments** (baptism and communion) and wanted services in the **language of the people**.',
  sol: 'Any three teachings.',
  scheme: [['Salvation by faith', 1], ['The Bible as the main authority', 1], ['One more teaching: priesthood of all believers, two sacraments or services in local language', 1]],
}));
Q('s3_effects', short({
  t: 2, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'An imagined map-maker of Neustadt shades the regions that followed Luther. Describe three effects of Luther\'s protest on Europe.',
  model: '1. New **Lutheran churches** grew up across **northern Germany** and **Scandinavia**.\n2. Christianity in the West **split** into Catholic and Protestant churches.\n3. The **Peace of Augsburg** (1555) let each German ruler choose Lutheran or Catholic faith, and **other reformers** such as Zwingli and Calvin followed.',
  sol: 'Spread; division; Augsburg and other reformers.',
  scheme: [['Spread of Lutheran churches in northern Germany and Scandinavia', 1], ['Division of Western Christianity', 1], ['Peace of Augsburg or other reformers', 1]],
}));
Q('s3_reformers', short({
  t: 2, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'A student of the imagined Weissburg club writes one line each on Zwingli, Calvin and Henry VIII\'s Act of Supremacy. Write what she should say.',
  model: '1. **Zwingli** was a reformer who worked in **Zurich**.\n2. **Calvin** was a reformer who worked in **Geneva**.\n3. The **Act of Supremacy** (1534) of **Henry VIII** made the **king head of the Church of England**.',
  sol: 'Zurich; Geneva; Church of England.',
  scheme: [['Zwingli in Zurich', 1], ['Calvin in Geneva', 1], ['Act of Supremacy 1534: king head of the Church of England', 1]],
}));
Q('s3_trent', short({
  t: 3, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'State three decisions or aims of the Council of Trent (1545 to 1563).',
  model: '1. The Council **reaffirmed Catholic doctrines**, making the Church\'s teaching clear.\n2. It **stopped the sale of indulgences for money**, removing a practice critics had objected to.\n3. It called for **seminaries** to give priests better training, and it insisted on **discipline** among the clergy.',
  sol: 'Any three decisions.',
  scheme: [['Reaffirmed Catholic doctrines', 1], ['Stopped the sale of indulgences for money', 1], ['Seminaries or discipline of the clergy', 1]],
}));
Q('s3_counter_results', short({
  t: 3, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'An imagined pupil of Neustadt is asked for measures of the Counter Reformation other than the Council of Trent, and for one result. Write her answer.',
  model: '1. The **Society of Jesus** worked in **education and missions**.\n2. The **Index of prohibited books** and the Church courts against heresy (the **Inquisition**) were also used.\n3. **Result:** the Catholic Church was **reformed** and remained **strong in southern Europe**.',
  sol: 'Jesuits; Index and Inquisition; result.',
  scheme: [['Society of Jesus', 1], ['Index and the Inquisition', 1], ['Result: reformed Church, strong in southern Europe', 1]],
}));

// ================================================================ long answers (10 marks, 3 + 3 + 4)
Q('l_causes_church', long({
  t: [1], d: 2, c: 'understanding', marks: 10, wl: L10,
  stem: 'In the imagined university town of Weissburg, a lecture is advertised on why dissatisfaction with the Church grew before 1517.\n\n(i) State three practices of the Church that critics objected to. **[3]**\n(ii) Explain how the Renaissance spirit of enquiry, Erasmus and printing helped the Reformation. **[3]**\n(iii) Explain how rulers, merchants and earlier reformers contributed. **[4]**',
  model: '(i) Critics objected to the **sale of indulgences**, the **sale of Church offices** (simony) and the **great wealth and taxes** of the Church, such as the tithe. Some also pointed to the worldly lives of some clergy and to services in Latin.\n\n(ii) The **Renaissance** encouraged people to question authority. **Erasmus**, a Dutch scholar, criticised abuses in works such as **The Praise of Folly**. **Printing** spread critical ideas and Bibles quickly.\n\n(iii) **Rulers** of growing nation-states wanted **control over Church lands and appointments**, and **merchants** resented Church taxes. Earlier reformers, **John Wycliffe** in England and **Jan Hus** in Bohemia, had shown that dissatisfaction was not new.',
  sol: 'Practices; new learning; rulers, merchants and earlier reformers.',
  scheme: [['(i) Three practices', 3], ['(ii) Renaissance spirit of enquiry', 1], ['(ii) Erasmus', 1], ['(ii) Printing', 1], ['(iii) Rulers and merchants', 2], ['(iii) Wycliffe and Hus', 2]],
}));
Q('l_causes_eval', long({
  t: [1], d: 4, c: 'evaluation', marks: 10, wl: L10,
  stem: 'At an imagined market meeting in Handelsbrunn, three people speak: Jakob, a printer who is busy with Bible orders, Duke Berthold, who wants to appoint the heads of Church lands in his duchy, and Greta, a cloth merchant who objects to Church taxes.\n\n(i) Name the cause of the Reformation that each speaker best represents. **[3]**\n(ii) Explain why Wycliffe and Hus show that dissatisfaction with Church practices was not new. **[3]**\n(iii) A listener claims that the Reformation was caused only by the sale of indulgences. Evaluate this view. **[4]**',
  model: '(i) **Jakob** represents the spread of ideas through **printing**. **Duke Berthold** represents rulers of growing states who wanted **control over Church lands and appointments**. **Greta** represents **merchants who resented Church taxes**.\n\n(ii) **John Wycliffe** in England in the fourteenth century had an English translation of the Bible made, and **Jan Hus** in Bohemia in the early fifteenth century also criticised practices. This was long before 1517, so unease had been growing.\n\n(iii) The view is **only partly true**. The sale of indulgences led Luther to speak out in 1517, but the Reformation also had other causes: the **new learning**, **printing**, the wishes of **rulers** and **merchants**, and earlier reformers. Many causes worked together.',
  sol: 'Causes matched; earlier reformers; evaluation of a single cause.',
  scheme: [['(i) Jakob: printing', 1], ['(i) Duke Berthold: rulers', 1], ['(i) Greta: merchants', 1], ['(ii) Wycliffe with detail', 1.5], ['(ii) Hus with detail and earlier dates', 1.5], ['(iii) Partly true, with reason', 2], ['(iii) Other causes named', 2]],
}));
Q('l_luther_life', long({
  t: [2], d: 3, c: 'understanding', marks: 10, wl: L10,
  stem: 'A display at the imagined Weissburg museum is titled A Monk Who Spoke Out.\n\n(i) Who was Martin Luther, and what did his Ninety-five Theses protest against? **[3]**\n(ii) Describe what happened to Luther in 1521. **[3]**\n(iii) Explain how Frederick of Saxony and the translation of the Bible helped Luther\'s cause. **[4]**',
  model: '(i) **Martin Luther** (1483 to 1546) was a **German monk and professor at Wittenberg**. In **1517** he made public the **Ninety-five Theses** against the **sale of indulgences**, which **Johann Tetzel** was selling in Germany.\n\n(ii) In **1521** **Pope Leo X excommunicated** him. He then appeared before the **Diet of Worms**, where he **refused to take back his views**.\n\n(iii) **Frederick of Saxony** protected Luther, so he could work in safety. Luther translated the **New Testament into German**, and later the whole Bible, so ordinary people could read it in their own language. With **printing**, the translation spread his ideas widely.',
  sol: 'Luther and his protest; 1521; protection and translation.',
  scheme: [['(i) German monk and professor at Wittenberg', 1], ['(i) Theses in 1517 against indulgences', 1], ['(i) Tetzel', 1], ['(ii) Excommunicated by Pope Leo X', 1.5], ['(ii) Refused to take back his views at the Diet of Worms', 1.5], ['(iii) Protection of Frederick of Saxony', 2], ['(iii) German translation read by ordinary people', 2]],
}));
Q('l_luther_teach', long({
  t: [2], d: 3, c: 'understanding', marks: 10, wl: L10,
  stem: 'A teacher at the imagined Nordburg school draws a chart of the main teachings of Martin Luther.\n\n(i) State three of his teachings. **[3]**\n(ii) Explain the teaching of the priesthood of all believers and the teaching on sacraments. **[3]**\n(iii) Explain how these teachings differed from the practices that critics had objected to. **[4]**',
  model: '(i) Luther taught **salvation by faith** (justification by faith), the **Bible as the main authority**, and services in the **language of the people**.\n\n(ii) The **priesthood of all believers** means every believer may approach God directly and read the Bible without a priest as a necessary go-between. Luther kept **fewer sacraments**: **baptism and communion**.\n\n(iii) Critics had objected to the **sale of indulgences**, and Luther taught that salvation comes by **faith** and cannot be bought. Critics had noted services in **Latin** that people could not follow, and Luther wanted worship and the Bible in the **language of the people**. The Bible, not Church offices, became the main authority.',
  sol: 'Three teachings; priesthood and sacraments; contrast with practices.',
  scheme: [['(i) Three teachings', 3], ['(ii) Priesthood of all believers', 1.5], ['(ii) Baptism and communion', 1.5], ['(iii) Faith against indulgences', 2], ['(iii) Local language against Latin', 2]],
}));
Q('l_effects', long({
  t: [2], d: 3, c: 'analysis', marks: 10, wl: L10,
  stem: 'A teacher in the imagined town of Nordburg asks pupils to describe the results of Luther\'s protest.\n\n(i) Describe how Lutheran churches spread and how Western Christianity was affected. **[3]**\n(ii) Explain the Peace of Augsburg (1555). **[3]**\n(iii) Write one line each on Zwingli, Calvin and the Act of Supremacy (1534), and say what they show about the spread of reform. **[4]**',
  model: '(i) **Lutheran churches** took root in **northern Germany** and **Scandinavia**. The unity of **Western Christianity was broken**, with Catholic and Protestant churches side by side.\n\n(ii) By the **Peace of Augsburg** (1555) **each ruler** in the German states chose the **Lutheran or Catholic faith** for his state, which recognised Lutheranism beside Catholicism.\n\n(iii) **Zwingli** led reform in **Zurich** and **Calvin** in **Geneva**. In England, **Henry VIII\'s Act of Supremacy** (1534) made the **king head of the Church of England**. These show that reform did not stay in one place: other reformers followed, and in different lands rulers and cities shaped what the new churches looked like.',
  sol: 'Spread and division; Augsburg; other reformers and what they show.',
  scheme: [['(i) Spread in northern Germany and Scandinavia', 1.5], ['(i) Division of Western Christianity', 1.5], ['(ii) Each ruler chose the faith of his state', 2], ['(ii) Recognition of Lutheranism beside Catholicism', 1], ['(iii) Zwingli, Calvin, Act of Supremacy', 3], ['(iii) Reform did not stay in one place', 1]],
}));
Q('l_counter', long({
  t: [3], d: 3, c: 'understanding', marks: 10, wl: L10,
  stem: 'The history club of the imagined town of Sankt Elmar prepares a poster on how the Catholic Church responded to the Reformation.\n\n(i) What is meant by the Counter Reformation? Name two decisions of the Council of Trent. **[3]**\n(ii) Describe the work of the Society of Jesus. **[3]**\n(iii) Mention the Index and the Inquisition, and state two results of the Counter Reformation. **[4]**',
  model: '(i) The **Counter Reformation**, or Catholic Reformation, means the **measures by which the Catholic Church reformed itself and checked the spread of Protestantism**. The **Council of Trent** (1545 to 1563) **reaffirmed Catholic doctrines** and **required seminaries** to train priests.\n\n(ii) The **Society of Jesus**, founded by **Ignatius Loyola** and approved in **1540**, worked in **education** and **missions**. **Francis Xavier**, for example, worked in Asia.\n\n(iii) The Church issued the **Index of prohibited books**, and Church courts against heresy, the **Inquisition**, were used. The results were that the Catholic Church was **reformed** and remained **strong in southern Europe**.',
  sol: 'Meaning and Trent; Jesuits; Index, Inquisition, results.',
  scheme: [['(i) Meaning of the Counter Reformation', 1], ['(i) Two Trent decisions', 2], ['(ii) Founder and approval', 1], ['(ii) Education and missions', 1], ['(ii) Francis Xavier or another example', 1], ['(iii) Index and Inquisition', 2], ['(iii) Two results', 2]],
}));
Q('l_compare', long({
  t: [2, 3], d: 4, c: 'analysis', marks: 10, wl: L10,
  stem: 'Two groups at the imagined Weissburg school compare the Protestant Reformation with the Catholic response, and they agree to describe both with equal respect.\n\n(i) State three teachings or aims of the Lutheran Reformation. **[3]**\n(ii) State three measures of the Counter Reformation. **[3]**\n(iii) Explain how these two movements changed the religious map of Europe. **[4]**',
  model: '(i) **Salvation by faith**, the **Bible as the main authority** and the **priesthood of all believers** were central Lutheran teachings; they also taught fewer sacraments and services in the language of the people.\n\n(ii) The **Council of Trent** reaffirmed doctrines and required seminaries, the **Society of Jesus** worked in education and missions, and the **Index** listed prohibited books.\n\n(iii) The Reformation **divided Western Christianity**, and Lutheran churches spread in **northern Germany and Scandinavia**. The Counter Reformation **reformed the Catholic Church**, which remained **strong in southern Europe**. By the **Peace of Augsburg** (1555), each German ruler chose Lutheran or Catholic faith for his state, so both traditions continued.',
  sol: 'Teachings; measures; the changed map.',
  scheme: [['(i) Three teachings or aims', 3], ['(ii) Three measures', 3], ['(iii) Division and Lutheran areas', 1.5], ['(iii) Catholic Church reformed and strong in the south', 1.5], ['(iii) Peace of Augsburg', 1]],
}));

// ================================================================ source-based items (imagined documents)
Q('sb_notice', source({
  t: [1], d: 3, c: 'application', origin: 'soyl-original',
  stem: `Read the imagined notice board and answer the questions that follow. ${IMAG}`,
  passage: '**Notices pinned on an imagined board in the market square of the university town of Weissburg**\n\nNotice 1: Public lecture on Friday in Hall B. Professor Anselm will speak on the many payments that townspeople make to the Church, and on whether they are fair. All are welcome.\n\nNotice 2: The printer Jakob of Rheinfeld has a new run of the Bible in the language of our region. Apply at the bookshop near the fountain.\n\nNotice 3: The cloth merchants\' guild will meet on Monday to discuss whether the taxes paid to the Church should be lowered.',
  parts: [
    child('a', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'Which group of people is behind Notice 3?', model: 'The **merchants**, who resented Church taxes.', sol: 'Merchants.', scheme: [['Merchants', 1]] })),
    child('b', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'Which cause of the Reformation does Notice 2 illustrate?', model: '**Printing**, which spread Bibles and ideas quickly.', sol: 'Printing.', scheme: [['Printing', 1]] })),
    child('c', short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Explain how Notice 2 links with the criticism of services and the Bible in Latin.', model: 'A **Bible in the local language** can be read by people who do not know **Latin**. This answers the criticism that ordinary people **could not understand** services and the Bible in Latin.', sol: 'Local-language Bible against Latin.', scheme: [['Bible in the local language readable by ordinary people', 1], ['Link to the criticism that Latin was not understood', 1]] }), [
      short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Name two causes of the Reformation that are not shown in the three notices.', model: 'The **sale of indulgences** and the **sale of Church offices** are not shown. Rulers\' wishes for control over Church lands, or the Renaissance spirit of enquiry, would also be correct.', sol: 'Any two causes not shown.', scheme: [['First cause not shown', 1], ['Second cause not shown', 1]] }),
    ]),
  ],
}));
Q('sb_orderbook', source({
  t: [2], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the imagined order book and answer the questions that follow. ${IMAG}`,
  passage: '**From the imagined order book of Jakob, a printer of Rheinfeld, in the early 1520s**\n\nOrder 1: 200 copies of the New Testament in German, for a bookseller of Weissburg.\n\nOrder 2: 500 copies of a short sheet on the sale of indulgences, for the town council of Nordburg.\n\nOrder 3: 60 copies of a Latin prayer book, for the cathedral chapter of Sankt Elmar.\n\nOrder 4: 80 copies of a printed account of the assembly held at Worms, for a merchant of Handelsbrunn.',
  parts: [
    child('a', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Name the reformer who translated the New Testament into German.', model: '**Martin Luther**.', sol: 'Martin Luther.', scheme: [['Martin Luther', 1]] })),
    child('b', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Which practice, protested against in 1517, is the subject of Order 2?', model: 'The **sale of indulgences**.', sol: 'Sale of indulgences.', scheme: [['Sale of indulgences', 1]] })),
    child('c', short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Explain how the order book shows that printing helped to spread the reformers\' ideas.', model: 'The book shows **hundreds of copies** of a German New Testament, a sheet on indulgences and an account of Worms. **Printing** let such material reach many people **quickly**, so ideas spread widely.', sol: 'Many copies, quickly.', scheme: [['Large numbers of copies of reform-related material', 1], ['Printing spread ideas quickly and widely', 1]] }), [
      short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): What does Order 3 show about the Catholic tradition at this time?', model: 'It shows that **Catholic worship continued**, with printed prayer books in **Latin** ordered by a cathedral chapter. The Reformation did not end the older tradition.', sol: 'Catholic worship continued.', scheme: [['Catholic worship and Latin prayer books continued', 1], ['The older tradition did not end', 1]] }),
    ]),
  ],
}));
Q('sb_diary', source({
  t: [3], d: 3, c: 'evaluation', origin: 'soyl-original',
  stem: `Read the imagined diary and answer the questions that follow. ${IMAG}`,
  passage: '**From the imagined diary of Lukas, a pupil at a school in the town of Sankt Elmar in the late 1500s**\n\nDay 1: Our headmaster, a member of the Society of Jesus, told us that the order was approved in 1540 and that its members teach in schools and travel far as missionaries. He read us a letter from a member who works in Asia.\n\nDay 2: The bishop opened a seminary in our town to train young priests, as the great council at Trent had decided.\n\nDay 3: The librarian showed us a printed list of books that Catholics were told not to read.\n\nDay 4: Our priest said that the Church had set out to reform itself and to check the spread of the new Protestant churches.',
  parts: [
    child('a', short({ t: 3, d: 2, c: 'application', marks: 1, stem: 'Name the order mentioned on Day 1.', model: 'The **Society of Jesus**, or the Jesuits.', sol: 'Society of Jesus.', scheme: [['Society of Jesus', 1]] })),
    child('b', short({ t: 3, d: 2, c: 'application', marks: 1, stem: 'Which council is mentioned on Day 2?', model: 'The **Council of Trent**.', sol: 'Council of Trent.', scheme: [['Council of Trent', 1]] })),
    child('c', short({ t: 3, d: 3, c: 'evaluation', marks: 2, stem: '**Either** (i): Name the printed list in Day 3 and explain what Day 4 describes.', model: 'The list is the **Index of prohibited books**. Day 4 describes the **Counter Reformation**, the Catholic Church\'s effort to **reform itself** and **check the spread** of Protestantism.', sol: 'Index; Counter Reformation.', scheme: [['Index of prohibited books', 1], ['Counter Reformation described: reform and checking Protestantism', 1]] }), [
      short({ t: 3, d: 3, c: 'application', marks: 2, stem: '**Or** (ii): Give two kinds of work of the Jesuits that appear on Day 1.', model: 'The Jesuits worked in **education**, since members teach in schools, and in **missions**, since they travel far, for example to Asia, as Francis Xavier did.', sol: 'Education and missions.', scheme: [['Education', 1], ['Missions', 1]] }),
    ]),
  ],
}));
