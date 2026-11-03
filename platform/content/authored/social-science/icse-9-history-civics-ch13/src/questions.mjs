// ICSE 9 History & Civics, ch13 Medieval India: The Mughal Empire — question bank.
// Every guide, ledger, label, newspaper report and school scene below is imagined by SOYL and labelled as imagined; no
// textbook text, box or exercise and no specimen or board-paper item is reused (D-036). Nothing from the Ain-i-Akbari or any
// other source is quoted: ideas are paraphrased. Dates are the commonly taught ones (books differ): Babur 1526-1530,
// Humayun 1530-1540 and 1555-1556, Akbar 1556-1605, Jahangir 1605-1627, Shah Jahan 1628-1658, Aurangzeb 1658-1707.
import assert from 'node:assert/strict';
import { Q, mcq, ar, tf, fb, match, ord, short, long, source, child } from '../../icse-9-history-civics-ch01/src/lib.mjs';

const S2 = [25, 45];
const S3 = [40, 70];
const L10 = [120, 220];
const IMAG = '*(Imagined document written by SOYL for practice; the people and places in it are not real.)*';

// ---------------------------------------------------------------- shared data (the build draws the timeline from it)
export const RULERS = [
  ['Babur', 1526, 1530],
  ['Humayun', 1530, 1540],
  ['Humayun (second time)', 1555, 1556],
  ['Akbar', 1556, 1605],
  ['Jahangir', 1605, 1627],
  ['Shah Jahan', 1628, 1658],
  ['Aurangzeb', 1658, 1707],
];
// Akbar and Aurangzeb both reigned about 49 years, so no question asks which of the two was longer.
assert.equal(RULERS[3][2] - RULERS[3][1], 49);
assert.equal(RULERS[6][2] - RULERS[6][1], 49);
assert.equal(RULERS[0][2] - RULERS[0][1], 4);
assert.equal(RULERS[4][2] - RULERS[4][1], 22);
assert.equal(RULERS[5][2] - RULERS[5][1], 30);

// ================================================================ t01 Sources: Ain-i-Akbari and monuments
Q('m_ain_author', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'A card in the imagined Hind Reading Room says that a Persian work on the administration of Akbar was written by one of his courtiers. Who wrote the Ain-i-Akbari?',
  opts: ['Abul Fazl', 'Ziauddin Barani', 'Tansen', 'Raja Man Singh'],
  sol: 'Abul Fazl, a courtier of Akbar, wrote the Ain-i-Akbari. Ziauddin Barani wrote a chronicle of the Delhi Sultanate, Tansen was a musician and Raja Man Singh was a noble in Akbar\'s service.',
}));
Q('m_ain_caution', mcq({
  t: 1, d: 4, c: 'evaluation',
  stem: 'In the imagined history club of Lakshmi Nagar School, Zoya says: "Because the Ain-i-Akbari is so detailed, every line of it must be accepted as the plain truth about Akbar." What is the best reply?',
  opts: [
    'It gives detailed official information, but its author was a courtier of Akbar, so its praise should be checked against other sources',
    'It should be ignored, because a work by a courtier can have no value at all',
    'It should be accepted without checking, because it is a third part of a famous work',
    'It is useful only for the study of the Taj Mahal',
  ],
  sol: 'A source is judged by what it offers and by who wrote it. The work is valuable for its detail, yet a courtier tends to praise his ruler, so a historian compares it with other evidence. Rejecting it entirely or accepting it blindly are both poor methods, and it says nothing about the Taj Mahal.',
}));
Q('m_taj_builder', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Mr. Ilyas, an imagined guide at Agra, tells his group that the white marble tomb behind him was built about 1632 to 1653 in memory of Mumtaz Mahal. Which emperor built it?',
  opts: ['Shah Jahan', 'Akbar', 'Jahangir', 'Babur'],
  sol: 'Shah Jahan built the Taj Mahal in memory of his wife Mumtaz Mahal. Akbar, Jahangir and Babur ruled in other periods and are not its builder.',
}));
Q('m_taj_mistake', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'The imagined Daryaganj Tours drafts a leaflet on the Taj Mahal. One line in it is mistaken. Which line should be corrected?',
  opts: [
    'It has three domes and two minarets',
    'It stands on a raised platform with a symmetrical plan',
    'It has a double dome and four minarets',
    'It is set in a charbagh, a garden in four parts',
  ],
  sol: 'The first line is mistaken: the Taj Mahal has a double dome and four minarets, while three domes and two minarets describe the Jama Masjid of Delhi. The platform, the symmetry and the charbagh garden are true features of the Taj Mahal.',
}));
Q('m_jama', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'An imagined art class in Delhi sketches a mosque of red sandstone and white marble with a very large courtyard, three domes and two minarets, built by Shah Jahan about 1650 to 1656. Which monument is it?',
  opts: ['The Jama Masjid, Delhi', 'The Taj Mahal, Agra', 'The Red Fort, Delhi', 'The tomb of Mumtaz Mahal at Agra'],
  sol: 'The description fits the Jama Masjid of Delhi. The Taj Mahal is a white marble tomb with four minarets, and the Red Fort is a fort with red sandstone walls, not a mosque.',
}));
Q('m_redfort_halls', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'The imagined audio guide at the Red Fort says: "You are now entering the hall where the emperor received ordinary petitioners and held open court." Which hall is meant?',
  opts: ['The Diwan-i-Am', 'The Diwan-i-Khas', 'The charbagh', 'The Jama Masjid'],
  sol: 'The Diwan-i-Am was the hall of public audience. The Diwan-i-Khas was the hall of private audience, the charbagh is the four-part garden of the Taj Mahal, and the Jama Masjid is a separate mosque.',
}));
Q('m_reveal', mcq({
  t: 1, d: 4, c: 'analysis',
  stem: 'A student at the imagined Sector 9 Public School studies the Taj Mahal, the Jama Masjid and the Red Fort together. Which conclusion do the three monuments best support?',
  opts: [
    'The Mughals had great wealth and power, blended Persian and Indian styles, and employed skilled craftsmen',
    'The Mughals built only in white marble and never used red sandstone',
    'All three were built within the reign of a single earlier ruler, Akbar',
    'The monuments show that no other building tradition existed in India',
  ],
  sol: 'Large, finely finished buildings point to wealth, power and skilled craftsmen, and their domes, arches and inlay show a blend of Persian and Indian styles. Red sandstone was used at the Red Fort and the Jama Masjid, all three were built under Shah Jahan, and the monuments say nothing about other traditions.',
}));
Q('m_unesco_fort', mcq({
  t: 1, d: 3, c: 'recall',
  stem: 'An imagined quiz at the Chandni Chowk Heritage Club asks in which year the Red Fort of Delhi was listed as a UNESCO World Heritage Site. Which answer is right?',
  opts: ['2007', '1983', '1993', '1947'],
  sol: 'The Red Fort was listed in 2007. The year 1983 is the listing of the Taj Mahal, 1993 is the listing of the Qutb Minar site, and 1947 is not a listing year at all.',
}));

// ================================================================ t02 Rulers in order
Q('m_after_akbar', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'A timeline card prepared by the imagined student Ravi shows Akbar (1556 to 1605) and then Shah Jahan (1628 to 1658), with a gap between them. Which ruler fills the gap?',
  opts: ['Jahangir', 'Humayun', 'Aurangzeb', 'Babur'],
  sol: 'Jahangir ruled about 1605 to 1627, between Akbar and Shah Jahan. Humayun and Babur came before Akbar, and Aurangzeb came after Shah Jahan.',
}));
Q('m_humayun', mcq({
  t: 2, d: 3, c: 'understanding',
  stem: 'In the imagined quiz at Ramnagar School, Neha says that the years of Humayun cannot be written as one block. Why?',
  opts: [
    'His rule was interrupted by Sher Shah Suri, so it is given as about 1530 to 1540 and again 1555 to 1556',
    'He ruled for two empires at the same time',
    'He ruled only after Akbar, from 1556 to 1605',
    'He ruled from 1526 to 1530 and gave way to Akbar',
  ],
  sol: 'Humayun lost power to Sher Shah Suri, so his reign is divided into about 1530 to 1540 and 1555 to 1556. The years 1526 to 1530 belong to Babur and 1556 to 1605 to Akbar, and he did not rule two empires at once.',
}));
Q('m_shortest', mcq({
  t: 2, d: 4, c: 'analysis',
  stem: 'The imagined project group of Class IX at Vivek Vidyalaya compares the reigns of Babur (1526 to 1530), Akbar (1556 to 1605), Jahangir (1605 to 1627) and Shah Jahan (1628 to 1658). Which emperor had the shortest reign, and about how long was it?',
  opts: ['Babur, about 4 years', 'Jahangir, about 22 years', 'Shah Jahan, about 30 years', 'Akbar, about 49 years'],
  sol: 'Subtracting the years gives Babur about 4, Jahangir about 22, Shah Jahan about 30 and Akbar about 49 years. So Babur had the shortest reign of the four, and the other options are longer reigns.',
}));

// ================================================================ t03 Babur's three battles
Q('m_panipat_adv', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'The imagined Panipat Gallery displays a diagram with guns at the centre, rows of carts in front of the guns, and wings of cavalry curving round the flanks of the enemy. Which set of advantages of Babur does it show at the First Battle of Panipat?',
  opts: [
    'Artillery, defences of carts and the tulughma flanking tactic',
    'A large navy, forts on the coast and elephants in the front line',
    'Mountain passes, a siege tower and a supply of silver coins',
    'Only a much larger infantry with no new tactics',
  ],
  sol: 'The guns, the carts and the curving wings match Babur\'s artillery, his defences of carts and the tulughma flanking tactic. A navy and coastal forts are not part of this battle, nor are siege towers, and the battle was not won by numbers alone.',
}));
Q('m_panipat_result', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'The imagined Class IX teacher Mrs. Pillai writes on the board: "1526, defeat of Ibrahim Lodi." What was the main result of this First Battle of Panipat?',
  opts: [
    'The Delhi Sultanate ended and Mughal rule began',
    'The Mughals lost Delhi to the Rajputs',
    'Akbar became the emperor of Hindustan',
    'The eastern Afghan chiefs were checked',
  ],
  sol: 'The defeat of the last Sultan, Ibrahim Lodi, ended the Delhi Sultanate and began Mughal rule. Akbar came to the throne in 1556, and checking the eastern Afghan chiefs was the result of Ghaghra in 1529.',
}));
Q('m_khanwa', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'A label in the imagined Rajputana Gallery reads "1527, near Agra: Babur against a Mewar-led alliance under Rana Sanga." Which battle does it describe?',
  opts: ['The Battle of Khanwa', 'The First Battle of Panipat', 'The Battle of Ghaghra', 'The Battle of Haldighati'],
  sol: 'The Battle of Khanwa in 1527 was fought against Rana Sanga of Mewar and his allies. Panipat was in 1526 against Ibrahim Lodi, Ghaghra was in 1529 against Afghan chiefs, and Haldighati was in 1576.',
}));
Q('m_ghaghra', mcq({
  t: 3, d: 3, c: 'understanding',
  stem: 'Four imagined students describe the Battle of Ghaghra in their notes. Whose note is correct?',
  opts: [
    'It was fought in 1529 against Afghan chiefs of Bihar and Bengal, including Mahmud Lodi, and checked eastern Afghan resistance',
    'It was fought in 1526 against Ibrahim Lodi and ended the Sultanate',
    'It was fought in 1527 against Rana Sanga and secured north India',
    'It was fought in 1576 and was the end of Mewar\'s resistance',
  ],
  sol: 'Ghaghra took place in 1529 against Afghan chiefs of Bihar and Bengal and checked the eastern Afghan resistance. The other notes describe Panipat, Khanwa and Haldighati, each with its own year.',
}));
Q('m_babur_analysis', mcq({
  t: 3, d: 4, c: 'analysis',
  stem: 'The imagined history teacher Mr. Qadir asks: "If Panipat gave Babur the throne of Delhi, why were Khanwa and Ghaghra still needed?" Which answer is the best explanation?',
  opts: [
    'Panipat ended Lodi rule, but the Mewar-led alliance and the Afghan chiefs of the east remained to be dealt with, so Khanwa secured north India and Ghaghra checked eastern resistance',
    'Panipat was a defeat for Babur, so he had to fight again',
    'Khanwa and Ghaghra were fought only to win the artillery of the enemy',
    'Panipat took place after both battles',
  ],
  sol: 'Winning at Panipat did not remove every rival. Khanwa in 1527 secured Mughal power in north India and Ghaghra in 1529 checked the Afghan chiefs of the east. Panipat was a Mughal victory in 1526, before the other two battles.',
}));

// ================================================================ t04 Akbar: Rajput policy and integration
Q('m_amber', mcq({
  t: 4, d: 2, c: 'application',
  stem: 'The imagined Amber Fort guide Mr. Dev says: "In 1562 a marriage alliance joined the ruling house here with the emperor\'s family." Which ruling family and which emperor does he mean?',
  opts: ['The Kachhwaha ruler of Amber and Akbar', 'The Sisodia ruler of Mewar and Akbar', 'The Kachhwaha ruler of Amber and Shah Jahan', 'The Lodi ruler of Delhi and Babur'],
  sol: 'Akbar\'s marriage alliance of 1562 was with the Kachhwaha ruler of Amber. Mewar under Maharana Pratap resisted rather than joined, and Shah Jahan, the Lodis and Babur are not linked with this alliance.',
}));
Q('m_rajput_cases', mcq({
  t: 4, d: 3, c: 'application',
  stem: 'Three imagined Rajput rulers, Raja Veer, Rao Madan and Rana Kumar, are shown in a school role-play on Akbar\'s Rajput policy. Raja Veer accepts Mughal overlordship and is allowed to keep his kingdom. According to the policy, what is likely to happen to a ruler who refuses overlordship?',
  opts: [
    'He faces war with the Mughals, as in the Battle of Haldighati in 1576',
    'He is made a mansabdar at once',
    'He is given a larger kingdom',
    'He is asked to move to Fatehpur Sikri',
  ],
  sol: 'Rulers who accepted overlordship kept their kingdoms, while those who refused faced war. Mewar under Maharana Pratap resisted, and Haldighati was fought in 1576. A mansab and larger lands were offered to rulers who joined, not to those who refused.',
}));
Q('m_taxes', mcq({
  t: 4, d: 3, c: 'application',
  stem: 'A page from the imagined ledger of the Fatehpur village clerk Dinesh notes two taxes that "no longer have to be collected", one dropped about 1563 and the other about 1564. Which two taxes does the clerk mean?',
  opts: ['The pilgrim tax and the jizya', 'The land revenue and the market toll', 'The jagir tax and the cash tax', 'The zat tax and the sawar tax'],
  sol: 'The pilgrim tax was abolished about 1563 and the jizya about 1564. Land revenue continued, and zat and sawar are ranks of mansabdars, not taxes.',
}));
Q('m_ibadat', mcq({
  t: 4, d: 2, c: 'application',
  stem: 'On the imagined heritage trail of Fatehpur Sikri, a plaque says that from about 1575 scholars of different faiths met in a hall to discuss ideas. What was the hall called?',
  opts: ['The Ibadat Khana', 'The Diwan-i-Khas of the Red Fort', 'The Jama Masjid of Delhi', 'The Razmnama'],
  sol: 'The Ibadat Khana at Fatehpur Sikri was the place where scholars of different faiths discussed ideas. The Diwan-i-Khas is in the Red Fort, the Jama Masjid is a mosque and the Razmnama is a translation.',
}));
Q('m_integration', mcq({
  t: 4, d: 4, c: 'analysis',
  stem: 'The imagined Class IX student Farida lists Akbar\'s Rajput alliances, the abolition of the pilgrim tax and jizya, the use of Persian in administration and a uniform administration. What aim do all these steps share?',
  opts: [
    'To build a stable empire in which many groups were bound to the emperor as loyal partners',
    'To move the capital to Delhi from Agra',
    'To lower the rank of every noble',
    'To end all trade between regions',
  ],
  sol: 'Each step tied different groups and regions to the state through alliances, equal treatment in taxes, a common language of administration and a uniform system, which gave a stable empire with loyal allies. None of them moved a capital, lowered every noble\'s rank or stopped trade.',
}));

// ================================================================ t05 Akbar: social and educational reforms
Q('m_widow', mcq({
  t: 5, d: 3, c: 'application',
  stem: 'An imagined exhibition panel in Kota Gallery lists "Social reforms of Akbar, as commonly taught". Which entry belongs under this heading?',
  opts: [
    'Discouraging forced sati and allowing widow remarriage',
    'Fixing the zat and sawar of nobles',
    'Introducing the token currency',
    'Building the Jama Masjid of Delhi',
  ],
  sol: 'Discouraging forced sati and allowing widow remarriage are among the social reforms commonly taught for Akbar. Zat and sawar belong to the mansabdari system, the token currency to Muhammad bin Tughlaq, and the Jama Masjid to Shah Jahan.',
}));
Q('m_education', mcq({
  t: 5, d: 3, c: 'understanding',
  stem: 'The imagined Principal of Shanti Niketan School says her school\'s new timetable is "in the spirit of Akbar\'s plan for schools". Which feature of his educational reform fits it best?',
  opts: [
    'Practical subjects such as mathematics, agriculture and history taught alongside the usual subjects',
    'A ban on all schooling for girls and boys',
    'Teaching only one language in every school',
    'Closing every school at Fatehpur Sikri',
  ],
  sol: 'Akbar is commonly taught to have encouraged education with practical subjects such as mathematics, agriculture and history. He did not ban schooling or close schools.',
}));
Q('m_razmnama', mcq({
  t: 5, d: 2, c: 'application',
  stem: 'In the imagined translation department of Fatehpur Sikri, a clerk is told to prepare a Persian version of the Mahabharata. By what name is this translation known?',
  opts: ['The Razmnama', 'The Akbarnama', 'The Baburnama', 'The Ain-i-Akbari'],
  sol: 'The Persian translation of the Mahabharata is called the Razmnama. The Akbarnama is the history of Akbar\'s reign, the Baburnama is the memoir of Babur and the Ain-i-Akbari is its third part on administration.',
}));

// ================================================================ t06 Mansabdari
Q('m_mansab_meaning', mcq({
  t: 6, d: 1, c: 'recall',
  stem: 'In the imagined Mughal records office of Class IX\'s project, a word is written on the file of each noble: "mansab". What does the word mansab mean?',
  opts: ['Rank', 'Land', 'Tax', 'Horse'],
  sol: 'Mansab means rank. Land assigned as pay is a jagir, a tax is a revenue demand, and horsemen are counted under sawar.',
}));
Q('m_zat_sawar', mcq({
  t: 6, d: 3, c: 'application',
  stem: 'The imagined mansabdar Nawab Rahim is entered in the register with a zat of 1,000 and a sawar of 500. What does the sawar of 500 tell us?',
  opts: [
    'He must maintain 500 horsemen',
    'He is paid 500 rupees every year',
    'He is the 500th noble in the list',
    'His rank is lower than 500',
  ],
  sol: 'Sawar is the number of horsemen the officer must maintain, so 500 horsemen. His personal rank and pay are shown by his zat of 1,000, and the sawar figure is not a salary or a serial number.',
}));
Q('m_payment', mcq({
  t: 6, d: 2, c: 'understanding',
  stem: 'Two imagined mansabdars of Akbar, one paid directly from the treasury and one given the revenue of villages near Shahpur, are discussed in class. In what two ways could mansabdars be paid?',
  opts: ['In cash or by a jagir', 'In cash or by a gift of horses', 'By a jagir or by a share of trade', 'By land purchase or by loans'],
  sol: 'Payment was either in cash or by a jagir, which was an assignment of land revenue. Gifts of horses, a share of trade, land purchase and loans were not the ways of paying a mansabdar.',
}));
Q('m_hereditary', mcq({
  t: 6, d: 3, c: 'application',
  stem: 'Nawab Farhan, an imagined mansabdar of Akbar, dies, and his son Anwar hopes to receive the same rank automatically. What does the mansabdari system say about this?',
  opts: [
    'Ranks were not hereditary, so the emperor decided whether to give Anwar a rank',
    'Ranks passed to the eldest son automatically',
    'Ranks passed to the officer\'s brother',
    'Ranks were sold to the highest bidder',
  ],
  sol: 'Mansabs were not hereditary, so a son could not claim a father\'s rank as of right. The emperor decided, which also supported loyalty to him. Ranks were not passed on automatically and were not sold.',
}));
Q('m_muster', mcq({
  t: 6, d: 4, c: 'analysis',
  stem: 'An imagined inspector at a muster near Bahadurpur finds that some of the horsemen shown on the roll are not present, and that some horses have been borrowed for the day. Which defect of the mansabdari system does this illustrate?',
  opts: ['False musters', 'Hereditary ranks', 'Cash payment only', 'The use of Persian'],
  sol: 'Showing horsemen or horses that do not exist or are borrowed for the day is a false muster, a known defect. Ranks were not hereditary, payment was by cash or jagir, and Persian was the language of administration.',
}));
Q('m_jagir_shortage', mcq({
  t: 6, d: 4, c: 'analysis',
  stem: 'An imagined revenue note from late in the Mughal period says that many mansabdars had no jagirs to receive and that those who did often pressed the peasants hard. Which defect or defects of the system does it show?',
  opts: [
    'The shortage of jagirs and pressure on peasants by jagirdars',
    'The ranks being given on merit',
    'Efficient control by the emperor',
    'The loyalty of every noble',
  ],
  sol: 'A shortage of jagirs and pressure on peasants by jagirdars are named defects, which grew when control weakened under later rulers. Ranks on merit, efficient control and loyalty are merits of the system.',
}));

// ================================================================ assertion-reason
Q('ar_ain', ar({
  t: 1, d: 3, c: 'understanding', verdict: 'both-true-explains',
  a: 'Historians value the Ain-i-Akbari as a source, but read it with care.',
  r: 'It gives detailed official information, yet its author Abul Fazl was a courtier of Akbar and so wrote in praise of him.',
  sol: 'Both are true, and the reason explains the assertion: the detail gives the value and the courtier\'s point of view gives the need for care.',
}));
Q('ar_redfort', ar({
  t: 1, d: 3, c: 'application', verdict: 'A-true-R-false',
  a: 'The Red Fort of Delhi was built by Shah Jahan in his new city of Shahjahanabad.',
  r: 'Its walls are made entirely of white marble.',
  sol: 'The assertion is true, but the reason is false: the Red Fort has red sandstone walls, and white marble is used in parts of the interior.',
}));
Q('ar_humayun', ar({
  t: 2, d: 3, c: 'understanding', verdict: 'both-true-explains',
  a: 'The rule of Humayun is given in two separate periods, about 1530 to 1540 and 1555 to 1556.',
  r: 'His rule was interrupted by Sher Shah Suri.',
  sol: 'Both are true, and the reason explains the assertion: the interruption by Sher Shah Suri split his rule into two periods.',
}));
Q('ar_panipat', ar({
  t: 3, d: 3, c: 'understanding', verdict: 'both-true-explains',
  a: 'The First Battle of Panipat in 1526 marks the start of Mughal rule in India.',
  r: 'In that battle Babur defeated Ibrahim Lodi, the last Sultan of Delhi.',
  sol: 'Both are true, and the reason explains the assertion: the defeat of the last Sultan ended the Delhi Sultanate and began Mughal rule.',
}));
Q('ar_rajput', ar({
  t: 4, d: 4, c: 'evaluation', verdict: 'A-false-R-true',
  a: 'Every Rajput ruler lost his kingdom as soon as he accepted Mughal overlordship.',
  r: 'Akbar made marriage alliances with Rajput houses and gave high mansabs to Rajput nobles.',
  sol: 'The assertion is false, because rulers who accepted overlordship kept their kingdoms. The reason is true: alliances through marriage and high mansabs, as to Raja Man Singh, were part of the policy.',
}));
Q('ar_ibadat', ar({
  t: 4, d: 3, c: 'understanding', verdict: 'both-true-explains',
  a: 'The Ibadat Khana at Fatehpur Sikri is linked with Akbar\'s policy of Sulh-i-kul.',
  r: 'Scholars of different faiths discussed ideas there from about 1575.',
  sol: 'Both are true, and the reason explains the assertion: the open discussion among scholars of different faiths expressed the idea of peace with all.',
}));
Q('ar_mansab', ar({
  t: 6, d: 4, c: 'analysis', verdict: 'both-true-not-explains',
  a: 'Mansabdars were transferred from one post or jagir to another.',
  r: 'Mansabs were not hereditary.',
  sol: 'Both are true, but the reason does not explain the assertion: transfers were a way to keep officers from building local power, while non-hereditary rank concerns what happens to a rank after an officer\'s death.',
}));

// ================================================================ true-false, fill-blank, match, ordering
Q('tf_taj', tf({
  t: 1, d: 2, c: 'recall', ans: true,
  stem: 'True or false? The Taj Mahal at Agra was listed as a UNESCO World Heritage Site in 1983.',
  sol: 'The Taj Mahal was listed as a World Heritage Site in 1983.',
}));
Q('tf_khanwa', tf({
  t: 3, d: 3, c: 'application', ans: false,
  stem: 'True or false? In the Battle of Khanwa in 1527, Babur fought against Ibrahim Lodi.',
  sol: 'At Khanwa Babur fought Rana Sanga of Mewar and his allies; Ibrahim Lodi had been defeated at Panipat in 1526.',
}));
Q('tf_social', tf({
  t: 5, d: 2, c: 'recall', ans: true,
  stem: 'True or false? As commonly taught, Akbar tried to discourage child marriage by fixing minimum ages for marriage.',
  sol: 'Fixing minimum ages for marriage is among the social steps commonly taught for Akbar.',
}));
Q('fb_shahjahanabad', fb({
  t: 1, d: 2, c: 'recall',
  stem: 'The Red Fort stands in the new city that Shah Jahan founded, called ___.',
  acc: [['Shahjahanabad', 'shahjahanabad']],
  sol: 'The new city of Shah Jahan, in which the Red Fort stands, was Shahjahanabad.',
}));
Q('fb_tulughma', fb({
  t: 3, d: 3, c: 'application',
  stem: 'A model in the imagined Panipat Gallery shows wings of horsemen swinging round the sides of the enemy. The flanking tactic that Babur used is called ___.',
  acc: [['tulughma', 'Tulughma', 'the tulughma']],
  sol: 'The flanking tactic was the tulughma.',
}));
Q('fb_sulhikul', fb({
  t: 4, d: 2, c: 'recall',
  stem: 'Akbar\'s policy of tolerance, meaning "peace with all", is called ___.',
  acc: [['Sulh-i-kul', 'sulh-i-kul', 'Sulh i kul', 'sulh i kul', 'Sulh-e-kul']],
  sol: 'The policy of peace with all was Sulh-i-kul.',
}));
Q('fb_sawar', fb({
  t: 6, d: 3, c: 'application',
  stem: 'A line in an imagined clerk\'s register reads "500 horsemen to be maintained". In the mansabdari system this figure is called the officer\'s ___.',
  acc: [['sawar', 'Sawar']],
  sol: 'Sawar was the number of horsemen to be maintained; zat was the personal rank and pay.',
}));
Q('mt_monuments', match({
  t: 1, d: 3, c: 'recall', marks: 2,
  stem: 'Match each source or monument with the detail that goes with it.',
  pairs: [
    ['Taj Mahal', 'Charbagh garden, double dome and four minarets'],
    ['Jama Masjid, Delhi', 'Large courtyard, three domes and two minarets'],
    ['Red Fort', 'Diwan-i-Am and Diwan-i-Khas'],
    ['Ain-i-Akbari', 'Abul Fazl\'s official account of Akbar\'s administration'],
  ],
  sol: 'The Taj Mahal has the charbagh, double dome and four minarets; the Jama Masjid has a large courtyard, three domes and two minarets; the Red Fort has two halls of audience; the Ain-i-Akbari is Abul Fazl\'s work.',
}));
Q('mt_battles', match({
  t: 3, d: 3, c: 'recall', marks: 2,
  stem: 'Match each item connected with the early Mughals with its description.',
  pairs: [
    ['First Battle of Panipat', 'Ibrahim Lodi was defeated and the Delhi Sultanate ended'],
    ['Battle of Khanwa', 'Rana Sanga of Mewar and his allies were the opponents'],
    ['Battle of Ghaghra', 'Afghan chiefs of Bihar and Bengal were checked'],
    ['Tulughma', 'A flanking tactic with wings swinging round the enemy'],
  ],
  sol: 'Panipat ended the Sultanate, Khanwa was fought against Rana Sanga, Ghaghra checked the Afghan chiefs of the east, and the tulughma was a flanking tactic.',
}));
Q('mt_mansab', match({
  t: 6, d: 2, c: 'recall', marks: 2,
  stem: 'Match each term of the mansabdari system with its meaning.',
  pairs: [
    ['Mansab', 'Rank'],
    ['Zat', 'Personal rank and pay'],
    ['Sawar', 'Number of horsemen to be maintained'],
    ['Jagir', 'Assignment of land revenue as pay'],
  ],
  sol: 'A mansab is a rank, zat is personal rank and pay, sawar is the number of horsemen, and a jagir is an assignment of land revenue.',
}));
Q('ord_rulers', ord({
  t: 2, d: 2, c: 'understanding', marks: 2,
  stem: 'Arrange these Mughal emperors in the order in which they first came to the throne, earliest first.',
  items: ['Babur', 'Humayun', 'Akbar', 'Jahangir', 'Shah Jahan', 'Aurangzeb'],
  sol: 'Babur, Humayun, Akbar, Jahangir, Shah Jahan and Aurangzeb.',
}));
Q('ord_battles', ord({
  t: 3, d: 3, c: 'understanding', marks: 2,
  stem: 'Arrange the three battles through which Babur established Mughal rule in the order in which they took place, earliest first.',
  items: ['First Battle of Panipat, 1526', 'Battle of Khanwa, 1527', 'Battle of Ghaghra, 1529'],
  sol: 'Panipat in 1526, Khanwa in 1527 and Ghaghra in 1529.',
}));
Q('ord_akbar', ord({
  t: 4, d: 3, c: 'understanding', marks: 2,
  stem: 'Arrange these events of Akbar\'s reign in the order in which they took place, earliest first.',
  items: ['Marriage alliance with the Kachhwaha ruler of Amber, 1562', 'Pilgrim tax abolished, about 1563', 'Jizya abolished, about 1564', 'Ibadat Khana at Fatehpur Sikri begins, about 1575'],
  sol: 'The alliance with Amber in 1562, the pilgrim tax about 1563, the jizya about 1564 and the Ibadat Khana from about 1575.',
}));

// ================================================================ short answers (2 marks)
Q('s_ain', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Name the author of the Ain-i-Akbari and state one reason why a historian should read it with care.',
  model: '1. It was written by **Abul Fazl**, a courtier of Akbar, as the third part of the Akbarnama.\n2. Because he was a courtier, the work tends to **praise Akbar**, so its claims should be checked against other sources.',
  sol: 'Abul Fazl; courtier, so praise needs checking.',
  scheme: [['Abul Fazl named', 1], ['Courtier or praise as the reason for care', 1]],
}));
Q('s_jama', short({
  t: 1, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'A visitor to an imagined lane of Old Delhi sees a mosque with a vast courtyard, three domes and two minarets. Name the mosque, its builder and one other feature of it.',
  model: '1. It is the **Jama Masjid** of Delhi, built by **Shah Jahan**.\n2. It was built about **1650 to 1656** of **red sandstone and white marble**, and is one of the largest mosques in India.',
  sol: 'Jama Masjid; Shah Jahan; one more feature.',
  scheme: [['Mosque and builder named', 1], ['One more feature', 1]],
}));
Q('s_rulers', short({
  t: 2, d: 2, c: 'recall', marks: 2, wl: S2,
  stem: 'Name the first and the last of the six Mughal emperors from Babur to Aurangzeb, with the year each began to rule.',
  model: '1. The first was **Babur**, who began to rule in **1526**.\n2. The last of the six was **Aurangzeb**, who began to rule about **1658** and ruled until about 1707.',
  sol: 'Babur 1526; Aurangzeb about 1658.',
  scheme: [['Babur and 1526', 1], ['Aurangzeb and about 1658', 1]],
}));
Q('s_babur_pan', short({
  t: 3, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: 'State two advantages that helped Babur at the First Battle of Panipat.',
  model: '1. Babur used **artillery (guns)**, which the army of Ibrahim Lodi did not use in the same way.\n2. He used the **tulughma flanking tactic** and **defences of carts** to protect his army.',
  sol: 'Any two of artillery, tulughma, carts.',
  scheme: [['First advantage', 1], ['Second advantage', 1]],
}));
Q('s_khanwa', short({
  t: 3, d: 3, c: 'recall', marks: 2, wl: S2,
  stem: 'Against whom was the Battle of Khanwa fought, and what was its result?',
  model: '1. It was fought in **1527** against **Rana Sanga of Mewar** and his allies.\n2. Its result was that **Mughal power was secured in north India**.',
  sol: 'Rana Sanga and allies; Mughal power secured in north India.',
  scheme: [['Rana Sanga of Mewar and allies', 1], ['Result: Mughal power secured in north India', 1]],
}));
Q('s_rajput', short({
  t: 4, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'In an imagined role-play at Chitra Vidyalaya, one student plays a Rajput ruler who accepts Mughal overlordship and another plays a ruler who refuses it. State what happens to each according to Akbar\'s Rajput policy.',
  model: '1. The ruler who **accepts overlordship keeps his kingdom**, and may gain through a **marriage alliance** or a **high mansab**.\n2. The ruler who **refuses faces war**, as Mewar under **Maharana Pratap** did, and the **Battle of Haldighati** was fought in **1576**.',
  sol: 'Accepted: kingdom kept; refused: war, as in Mewar and Haldighati.',
  scheme: [['Accepting ruler keeps his kingdom', 1], ['Refusing ruler faces war, with an example', 1]],
}));
Q('s_sulh', short({
  t: 4, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'What is meant by Sulh-i-kul? Mention one step of Akbar linked with it.',
  model: '1. **Sulh-i-kul** means **peace with all**, a policy of tolerance.\n2. One step linked with it was the abolition of the **pilgrim tax** about 1563 (or the **jizya** about 1564, or the **Ibadat Khana**).',
  sol: 'Peace with all; one step.',
  scheme: [['Meaning: peace with all, tolerance', 1], ['One step linked with it', 1]],
}));
Q('s_social', short({
  t: 5, d: 2, c: 'recall', marks: 2, wl: S2,
  stem: 'State two social reforms of Akbar, as commonly taught.',
  model: '1. He **discouraged forced sati** and allowed **widow remarriage**.\n2. He tried to discourage **child marriage** by fixing **minimum ages** for marriage.',
  sol: 'Any two of the commonly taught social reforms.',
  scheme: [['First reform', 1], ['Second reform', 1]],
}));
Q('s_translation', short({
  t: 5, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'What was the Razmnama, and why did Akbar have such translations made?',
  model: '1. The **Razmnama** was the Persian translation of the Sanskrit **Mahabharata**, made in the translation department.\n2. Translations made works from other languages available to people who used **Persian**, the language of administration.',
  sol: 'Persian version of the Mahabharata; Persian as the language of administration.',
  scheme: [['Razmnama as the Persian Mahabharata', 1], ['Purpose linked with Persian', 1]],
}));
Q('s_mansab', short({
  t: 6, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Explain the terms zat and sawar.',
  model: '1. **Zat** was the **personal rank** of an officer and the basis of his **pay**.\n2. **Sawar** was the **number of horsemen** that the officer had to maintain for the emperor.',
  sol: 'Zat: personal rank and pay; sawar: horsemen.',
  scheme: [['Zat explained', 1], ['Sawar explained', 1]],
}));
Q('s_ledger', short({
  t: 6, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'An imagined clerk records that a noble, Raja Hari, must produce his horsemen at a muster every year and may be moved to another jagir. Name two features of the mansabdari system that this shows.',
  model: '1. The **muster** of horsemen checks that the **sawar** is really maintained, and so prevents false musters.\n2. Moving an officer to another jagir was the **transfer** of officers, which kept them from gaining local power.',
  sol: 'Muster of horsemen; transfer of officers.',
  scheme: [['Muster to check the horsemen', 1], ['Transfer of officers', 1]],
}));

// ================================================================ short answers (3 marks)
Q('s3_monuments', short({
  t: 1, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain three things that the Mughal monuments of Shah Jahan reveal about the Mughal Empire.',
  model: '1. Their size and rich materials reveal the **wealth** of the empire.\n2. Their grand scale shows the **power** of the emperor.\n3. Their domes, arches and inlay show a **blend of Persian and Indian styles**, and their fine work shows the **skill of craftsmen**.',
  sol: 'Wealth; power; blend of styles and craftsmen.',
  scheme: [['Wealth', 1], ['Power', 1], ['Blend of styles or skilled craftsmen', 1]],
}));
Q('s3_babur', short({
  t: 3, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: 'Describe three results of the three battles fought by Babur in 1526, 1527 and 1529.',
  model: '1. At **Panipat (1526)** the Delhi Sultanate ended and Mughal rule began.\n2. At **Khanwa (1527)**, against Rana Sanga of Mewar and allies, Mughal power was secured in north India.\n3. At **Ghaghra (1529)**, against Afghan chiefs of Bihar and Bengal, eastern Afghan resistance was checked.',
  sol: 'One result for each battle.',
  scheme: [['Panipat result', 1], ['Khanwa result', 1], ['Ghaghra result', 1]],
}));
Q('s3_rajput', short({
  t: 4, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain the aims of Akbar\'s Rajput policy and one way in which a Rajput ruler could gain by accepting it.',
  model: '1. The aim was a **stable empire** with **loyal allies**.\n2. The aim was also to join Rajput nobles to the empire through **marriage alliances** and **high mansabs**.\n3. A ruler who accepted Mughal overlordship could **keep his kingdom**.',
  sol: 'Stable empire; loyal allies; a gain such as keeping the kingdom.',
  scheme: [['Aim: a stable empire', 1], ['Aim: loyal allies', 1], ['A gain for the ruler', 1]],
}));
Q('s3_integration', short({
  t: 4, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: 'Describe three steps taken by Akbar to integrate his empire.',
  model: '1. He followed **Sulh-i-kul**, peace with all, and abolished the **pilgrim tax** (about 1563) and the **jizya** (about 1564).\n2. He held discussions among scholars of different faiths at the **Ibadat Khana** from about 1575.\n3. He made **Persian** the language of administration and set up a **uniform administration**.',
  sol: 'Any three steps.',
  scheme: [['First step', 1], ['Second step', 1], ['Third step', 1]],
}));
Q('s3_education', short({
  t: 5, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: 'Describe Akbar\'s encouragement of education and the arts.',
  model: '1. He encouraged **education** with practical subjects such as **mathematics, agriculture and history**.\n2. A **translation department** had Sanskrit works such as the Mahabharata (the **Razmnama**) translated into Persian.\n3. He gave **patronage** to scholars, painters and musicians, for example **Tansen**.',
  sol: 'Practical subjects; translation; patronage.',
  scheme: [['Education with practical subjects', 1], ['Translation department and Razmnama', 1], ['Patronage of scholars, painters or musicians', 1]],
}));
Q('s3_merits', short({
  t: 6, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: 'State three merits of the mansabdari system.',
  model: '1. It gave an **efficient army and administration** under the emperor.\n2. Officers owed **loyalty to the emperor** because ranks were not hereditary.\n3. Ranks were given on **merit**, so able men could rise.',
  sol: 'Any three merits.',
  scheme: [['Efficient army and administration', 1], ['Loyalty to the emperor', 1], ['Ranks on merit', 1]],
}));
Q('s3_defects', short({
  t: 6, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: 'State three defects of the mansabdari system.',
  model: '1. There were **false musters**, in which horsemen were not really maintained.\n2. **Jagirdars** put **pressure on the peasants** of their jagirs.\n3. Later there was a **shortage of jagirs** and control was **weak under later rulers**.',
  sol: 'False musters; pressure on peasants; shortage of jagirs and weak control.',
  scheme: [['False musters', 1], ['Pressure on peasants by jagirdars', 1], ['Shortage of jagirs or weak control later', 1]],
}));

// ================================================================ long answers (10 marks, 3 + 3 + 4)
Q('l_ain', long({
  t: 1, d: 3, c: 'understanding', marks: 10, wl: L10,
  stem: 'The Ain-i-Akbari is an important source for the reign of Akbar.\n\n(i) Name its author and say of which larger work it is a part. **[3]**\n(ii) Describe what the work tells us about Akbar\'s empire. **[3]**\n(iii) Explain the value of the work and the care needed in using it. **[4]**',
  model: '(i) It was written by **Abul Fazl**, a courtier of Akbar. It is the **third part of the Akbarnama**, completed about **1598**.\n\n(ii) It describes Akbar\'s **administration**, the **revenue system**, the **mansabdari system**, the **army**, the **provinces** and **society**. It also gives **statistics of produce and prices**.\n\n(iii) Its value lies in the **detailed official information** that it gives, which few other works offer. But its author was a **courtier**, so it tends to **praise Akbar**. A historian therefore checks it against other evidence, such as other chronicles, and does not accept every claim as it stands.',
  sol: 'Author and place in the Akbarnama; contents; value and caution.',
  scheme: [['(i) Abul Fazl, a courtier', 1.5], ['(i) Third part of the Akbarnama, about 1598', 1.5], ['(ii) Administration, revenue and mansabdari', 1.5], ['(ii) Army, provinces, society, statistics of produce and prices', 1.5], ['(iii) Value: detailed official information', 2], ['(iii) Caution: courtier, so praise; check with other sources', 2]],
}));
Q('l_monuments', long({
  t: 1, d: 3, c: 'understanding', marks: 10, wl: L10,
  stem: 'Shah Jahan built several famous monuments.\n\n(i) Name the cities in which the Taj Mahal, the Jama Masjid and the Red Fort stand. **[3]**\n(ii) Describe the main features of the Taj Mahal. **[3]**\n(iii) Explain what these monuments reveal about the Mughal Empire. **[4]**',
  model: '(i) The **Taj Mahal** stands at **Agra**; the **Jama Masjid** and the **Red Fort (Lal Qila)** stand at **Delhi**, the Fort in his new city of **Shahjahanabad**.\n\n(ii) The Taj Mahal was built about **1632 to 1653** in memory of **Mumtaz Mahal**. It is of **white marble** with **inlay of coloured stones (pietra dura)**, set in a **charbagh** garden, with a **double dome**, **four minarets**, a **raised platform** and a **symmetrical** plan.\n\n(iii) The monuments reveal the **wealth** and **power** of the empire. They show a **blend of Persian and Indian styles** and the **skill of craftsmen**.',
  sol: 'Names and cities; features of the Taj Mahal; what the monuments reveal.',
  scheme: [['(i) Taj Mahal at Agra', 1], ['(i) Jama Masjid at Delhi', 1], ['(i) Red Fort at Delhi (Shahjahanabad)', 1], ['(ii) Builder, date, marble and inlay', 1.5], ['(ii) Charbagh, double dome, minarets, platform, symmetry', 1.5], ['(iii) Wealth and power', 2], ['(iii) Blend of styles; skilled craftsmen', 2]],
}));
Q('l_babur', long({
  t: 3, d: 3, c: 'understanding', marks: 10, wl: L10,
  stem: 'Babur established Mughal rule in India through three battles.\n\n(i) Name the three battles with their years and opponents. **[3]**\n(ii) Describe the advantages that helped Babur at the First Battle of Panipat. **[3]**\n(iii) State the results of the three battles. **[4]**',
  model: '(i) The **First Battle of Panipat (1526)** was fought against **Ibrahim Lodi**, the last Sultan of Delhi; the **Battle of Khanwa (1527)** against **Rana Sanga of Mewar** and his allies; and the **Battle of Ghaghra (1529)** against **Afghan chiefs of Bihar and Bengal**, including Mahmud Lodi.\n\n(ii) At Panipat Babur\'s **artillery (guns)** gave him an advantage. He also used the **tulughma flanking tactic**, in which wings of the army swung round the enemy, and **defences of carts** that sheltered his guns and soldiers.\n\n(iii) Panipat **ended the Delhi Sultanate** and began Mughal rule. Khanwa **secured Mughal power in north India**, since the Mewar-led alliance had been a serious rival. Ghaghra **checked the eastern Afghan resistance** in Bihar and Bengal. Together the three battles gave Babur a firm base.',
  sol: 'Battles with years and opponents; advantages at Panipat; results.',
  scheme: [['(i) Panipat 1526, Ibrahim Lodi', 1], ['(i) Khanwa 1527, Rana Sanga and allies', 1], ['(i) Ghaghra 1529, Afghan chiefs of Bihar and Bengal', 1], ['(ii) Artillery', 1], ['(ii) Tulughma and carts', 2], ['(iii) Panipat result', 1.5], ['(iii) Khanwa result', 1.5], ['(iii) Ghaghra result', 1]],
}));
Q('l_rajput', long({
  t: 4, d: 3, c: 'application', marks: 10, wl: L10,
  stem: 'Akbar followed a policy towards the Rajput rulers.\n\n(i) Describe the main features of his Rajput policy. **[3]**\n(ii) Explain how rulers who accepted and rulers who refused were treated, with one example of each. **[3]**\n(iii) State the aims of the policy and explain how it helped the empire. **[4]**',
  model: '(i) He made **alliances through marriage**, such as that with the Kachhwaha ruler of Amber in **1562**. He also offered **high mansabs** to Rajput nobles, for example **Raja Man Singh**, so that they held honoured places in the empire.\n\n(ii) Rajput rulers who **accepted Mughal overlordship kept their kingdoms**; the ruler of Amber is an example. Rulers who refused faced war. **Mewar under Maharana Pratap resisted**, and the **Battle of Haldighati** was fought in **1576**; he is remembered with respect for his resistance.\n\n(iii) The aims were a **stable empire** with **loyal allies**. Because Rajput nobles and their forces served the empire, its rule in the north became steadier, and the emperor could depend on partners who held their own kingdoms.',
  sol: 'Features; treatment of those who accepted and refused; aims and benefits.',
  scheme: [['(i) Marriage alliances (Amber, 1562)', 1.5], ['(i) High mansabs (Raja Man Singh)', 1.5], ['(ii) Accepted overlordship: kingdoms kept', 1.5], ['(ii) Refused: war, Mewar and Haldighati 1576', 1.5], ['(iii) Aims: stable empire, loyal allies', 2], ['(iii) Benefit: Rajput nobles served the empire', 2]],
}));
Q('l_integration', long({
  t: 4, d: 4, c: 'analysis', marks: 10, wl: L10,
  stem: 'Akbar took many steps to bring the people and regions of his empire together.\n\n(i) Explain Sulh-i-kul and name two taxes that he abolished, with the years. **[3]**\n(ii) Describe the Ibadat Khana and the use of Persian in administration. **[3]**\n(iii) Explain how these steps helped to integrate the empire. **[4]**',
  model: '(i) **Sulh-i-kul** means **peace with all**, a policy of tolerance. Akbar abolished the **pilgrim tax** about **1563** and the **jizya** about **1564**; the pilgrim tax fell on pilgrims to holy places and the jizya on non-Muslim subjects.\n\n(ii) At the **Ibadat Khana** in **Fatehpur Sikri**, from about **1575**, scholars of different faiths met and discussed ideas. **Persian** was made the language of **administration**, so that officers in different regions used one language in their work.\n\n(iii) Removing special levies treated subjects more alike in tax matters, and the Ibadat Khana gave scholars a place to exchange ideas. A common language and a **uniform administration** let officers of different regions work in one system. Together these steps tied people and regions to the emperor and made the empire more united.',
  sol: 'Sulh-i-kul and taxes; Ibadat Khana and Persian; effect on integration.',
  scheme: [['(i) Sulh-i-kul meaning', 1], ['(i) Pilgrim tax about 1563', 1], ['(i) Jizya about 1564', 1], ['(ii) Ibadat Khana from about 1575', 1.5], ['(ii) Persian as the language of administration', 1.5], ['(iii) Equal treatment and exchange of ideas', 2], ['(iii) Common language and uniform administration', 2]],
}));
Q('l_reforms', long({
  t: 5, d: 3, c: 'understanding', marks: 10, wl: L10,
  stem: 'Akbar is remembered for his social reforms and for his care of learning and the arts.\n\n(i) Describe his social reforms, as commonly taught. **[3]**\n(ii) Explain how he encouraged education and translation. **[3]**\n(iii) Describe his patronage of scholars, painters and musicians. **[4]**',
  model: '(i) As commonly taught, he **discouraged forced sati**, allowed **widow remarriage** and tried to discourage **child marriage** by fixing **minimum ages** for marriage.\n\n(ii) He encouraged **education** by having practical subjects such as **mathematics, agriculture and history** taught in schools. His **translation department** had Sanskrit works, such as the **Mahabharata** (the **Razmnama**), and other works put into Persian, so that they could be read by officers and scholars who used that language.\n\n(iii) He gave **patronage** to scholars, painters and musicians. The musician **Tansen** is a well-known example. With such support, painters and scholars worked at his court, which became a centre of art and learning in the empire.',
  sol: 'Social reforms; education and translation; patronage.',
  scheme: [['(i) Sati and widow remarriage', 1.5], ['(i) Minimum marriage ages', 1.5], ['(ii) Practical subjects in schools', 1.5], ['(ii) Translation department and Razmnama', 1.5], ['(iii) Patronage of scholars and painters', 2], ['(iii) Tansen as a musician; court as a centre of learning', 2]],
}));
Q('l_mansab', long({
  t: 6, d: 3, c: 'understanding', marks: 10, wl: L10,
  stem: 'The mansabdari system was the backbone of Akbar\'s army and administration.\n\n(i) What was a mansab, and who introduced the system? **[3]**\n(ii) Explain zat and sawar, the range of ranks and the ways of payment. **[3]**\n(iii) Describe the rules that governed mansabdars. **[4]**',
  model: '(i) **Mansab** means **rank**. The system was introduced by **Akbar** about the **1570s** (dates vary).\n\n(ii) **Zat** was the **personal rank and pay**, and **sawar** was the **number of horsemen** to be maintained. Ranks ranged from **10 up to 5,000** for nobles, and were higher for princes. Payment was in **cash** or by a **jagir**, an assignment of land revenue.\n\n(iii) Ranks were **not hereditary**, so a son had no claim to a father\'s rank. Officers were **transferred**, and ranks were given on **merit**. The emperor could promote or demote, which kept officers loyal to him.',
  sol: 'Meaning and origin; zat, sawar, ranks and payment; rules.',
  scheme: [['(i) Mansab means rank', 1.5], ['(i) Introduced by Akbar about the 1570s', 1.5], ['(ii) Zat and sawar', 1.5], ['(ii) Ranks 10 to 5,000; cash or jagir', 1.5], ['(iii) Not hereditary', 1.5], ['(iii) Transfers and merit', 1.5], ['(iii) Emperor\'s control and loyalty', 1]],
}));
Q('l_assess', long({
  t: 6, d: 4, c: 'evaluation', marks: 10, wl: L10,
  stem: 'Historians assess the mansabdari system by its merits and its defects.\n\n(i) State three merits of the system. **[3]**\n(ii) State three defects of the system. **[3]**\n(iii) Give an overall assessment of the system, with a reason. **[4]**',
  model: '(i) The system gave an **efficient army and administration**. Officers owed **loyalty to the emperor**. Ranks were given on **merit**, so able men could rise.\n\n(ii) **False musters** showed horsemen or horses that were not really maintained. **Jagirdars** put **pressure on peasants**. Later there was a **shortage of jagirs**, and control became **weak under later rulers**.\n\n(iii) On balance the system worked well while the emperor kept firm control, because officers were loyal and able men could rise through merit. It weakened when jagirs became scarce and checks on musters grew lax. So its success depended on strong supervision by the emperor, and its defects grew when that supervision weakened.',
  sol: 'Three merits; three defects; a reasoned overall assessment.',
  scheme: [['(i) Efficient army and administration', 1], ['(i) Loyalty to the emperor', 1], ['(i) Ranks on merit', 1], ['(ii) False musters', 1], ['(ii) Pressure on peasants', 1], ['(ii) Shortage of jagirs and weak control later', 1], ['(iii) Judgement that it worked under strong control', 2], ['(iii) Reason: scarcity of jagirs and lax checks weakened it', 2]],
}));

// ================================================================ source-based items (imagined documents)
Q('sb_walk', source({
  t: [1, 2], d: 3, c: 'application', origin: 'soyl-original',
  stem: `Read the imagined heritage-walk notes and answer the questions that follow. ${IMAG}`,
  passage: '**Heritage-walk notes of the imagined Class IX group of Greenfield Public School**\n\nOn day one, at Agra, our guide Mr. Salim showed us a white marble tomb with an inlay of coloured stones, four tall minarets and a garden divided into four parts. He said it was built about 1632 to 1653 by the same emperor who built a fort of red sandstone in Delhi, in a new city of his own. The emperor in question reigned from 1628 to 1658. On day two our teacher told us the order of his grandfather, father and son: the grandfather ruled until 1605, and the son began to rule in 1658.',
  parts: [
    child('a', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'Name the monument that Mr. Salim showed on day one.', model: 'The **Taj Mahal**.', sol: 'The Taj Mahal.', scheme: [['Taj Mahal', 1]] })),
    child('b', short({ t: 2, d: 3, c: 'application', marks: 1, stem: 'Which emperor is "the emperor in question", who reigned from 1628 to 1658?', model: '**Shah Jahan**.', sol: 'Shah Jahan.', scheme: [['Shah Jahan', 1]] })),
    child('c', short({ t: [1, 2], d: 4, c: 'analysis', marks: 2, stem: '**Either** (i): Name the fort of red sandstone built by the emperor in Delhi and the city in which it stands, and name the grandfather who ruled until 1605.', model: 'The **Red Fort (Lal Qila)** in **Shahjahanabad**; the grandfather was **Akbar**.', sol: 'Red Fort in Shahjahanabad; Akbar.', scheme: [['Red Fort in Shahjahanabad', 1], ['Akbar named', 1]] }), [
      short({ t: 2, d: 3, c: 'understanding', marks: 2, stem: '**Or** (ii): Name the son who began to rule in 1658 and the father who ruled until 1627, in the order given in the notes.', model: 'The son was **Aurangzeb** (from about 1658), and the father who ruled to 1627 was **Jahangir**.', sol: 'Aurangzeb; Jahangir.', scheme: [['Aurangzeb', 1], ['Jahangir', 1]] }),
    ]),
  ],
}));
Q('sb_fair', source({
  t: [3], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the imagined newspaper report of a school history fair and answer the questions that follow. ${IMAG}`,
  passage: '**Report in the imagined school newsletter of Model High School, Ranchi**\n\nAt the history fair the Class IX stall on Babur drew a crowd. A model showed rows of carts with guns behind them and two wings curving round a line of soldiers. The stall guide explained that the display was of the battle of 1526, which ended the rule of Ibrahim Lodi. A second board listed a battle of 1527 against a Mewar-led alliance and a third battle of 1529 against Afghan chiefs. One visitor asked why three battles were needed, and the guide answered that each one dealt with a different rival.',
  parts: [
    child('a', short({ t: 3, d: 2, c: 'application', marks: 1, stem: 'Name the battle of 1526 that the model shows.', model: 'The **First Battle of Panipat**.', sol: 'The First Battle of Panipat.', scheme: [['First Battle of Panipat', 1]] })),
    child('b', short({ t: 3, d: 3, c: 'application', marks: 1, stem: 'Which tactic does the display of two wings curving round the soldiers represent?', model: 'The **tulughma** flanking tactic.', sol: 'The tulughma.', scheme: [['Tulughma', 1]] })),
    child('c', short({ t: 3, d: 4, c: 'analysis', marks: 2, stem: '**Either** (i): Name the battles of 1527 and 1529 and the rival that each one dealt with.', model: 'The **Battle of Khanwa** dealt with **Rana Sanga of Mewar** and allies; the **Battle of Ghaghra** dealt with **Afghan chiefs of Bihar and Bengal**.', sol: 'Khanwa with Rana Sanga; Ghaghra with the Afghan chiefs.', scheme: [['Khanwa and Rana Sanga with allies', 1], ['Ghaghra and the Afghan chiefs', 1]] }), [
      short({ t: 3, d: 3, c: 'understanding', marks: 2, stem: '**Or** (ii): State the result of the 1526 battle and the result of the 1527 battle.', model: 'In 1526 the **Delhi Sultanate ended** and Mughal rule began; in 1527 **Mughal power was secured in north India**.', sol: 'End of the Sultanate; Mughal power secured in north India.', scheme: [['1526 result', 1], ['1527 result', 1]] }),
    ]),
  ],
}));
Q('sb_ledger', source({
  t: [6], d: 4, c: 'analysis', origin: 'soyl-original',
  stem: `Read the imagined revenue clerk's ledger and answer the questions that follow. ${IMAG}`,
  passage: '**A page from the imagined ledger of Chandan, a made-up revenue clerk of a Mughal province**\n\nThe officer Khan Jawan holds a rank with a zat of 800 and a sawar of 400. For this rank he is not paid in coin. Instead the revenue of four villages near Mohanpur has been assigned to him. At the muster in spring, 60 horses were missing from his list, and the inspector wrote that some of the horses shown on the roll belonged to a neighbour. I have heard that the officer will be moved to a different post next year, and that his son cannot claim the rank when it ends.',
  parts: [
    child('a', short({ t: 6, d: 2, c: 'application', marks: 1, stem: 'What was the officer paid in, according to the ledger?', model: 'By a **jagir**, an assignment of land revenue (the revenue of four villages).', sol: 'A jagir.', scheme: [['Jagir named', 1]] })),
    child('b', short({ t: 6, d: 3, c: 'application', marks: 1, stem: 'How many horsemen was the officer required to maintain?', model: '**400**, his sawar.', sol: '400.', scheme: [['400 from sawar', 1]] })),
    child('c', short({ t: 6, d: 4, c: 'analysis', marks: 2, stem: '**Either** (i): Which defect of the system does the inspector\'s remark on the muster illustrate, and why is it a defect?', model: 'It illustrates **false musters**; the state pays for horsemen who are **not really maintained**, so the army is weaker than the roll shows.', sol: 'False musters; the army is weaker than the roll shows.', scheme: [['False musters', 1], ['Reason it is a defect', 1]] }), [
      short({ t: 6, d: 3, c: 'understanding', marks: 2, stem: '**Or** (ii): Which two rules of the system are mentioned in the last sentence of the ledger?', model: 'The officer will be **transferred**, and his rank is **not hereditary**, so his son cannot claim it.', sol: 'Transfer; ranks not hereditary.', scheme: [['Transfer of officers', 1], ['Ranks not hereditary', 1]] }),
    ]),
  ],
}));
