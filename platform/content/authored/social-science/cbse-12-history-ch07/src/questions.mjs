// CBSE 12 History, ch07 An Imperial Capital: Vijayanagara (c. 14th-16th centuries), question bank. Every source
// passage is an imagined document (a photographer's caption book, a clerk's note, a surveyor's field notebook, a
// guide's notes) or a SOYL summary of the kind of thing inscriptions record, written in SOYL's own words and
// labelled as such. Nothing from Abdur Razzaq, Domingo Paes, Fernao Nuniz, Niccolo de Conti, Afanasii Nikitin,
// Duarte Barbosa or any inscription is quoted, translated or closely paraphrased; no NCERT text, source box,
// caption, map or exercise and no board or sample-paper item is reused (D-036). Wars between Vijayanagara and the
// Deccan Sultanates are presented as wars between states that also traded and made alliances, never as a conflict
// of religions. Places are named in words only: no map work (OA-23).
import { Q, mcq, ar, tf, fb, match, ord, short, long, source, child } from '../../cbse-12-history-ch01/src/lib.mjs';

const S2 = [30, 50];
const S3 = [50, 80];
const L5 = [80, 120];
const IMAG = '*(Imagined document written by SOYL for practice; the people in it are not real, though the evidence and events in the background are.)*';
const SUM = '*(Summary written by SOYL in its own words for practice; it is not a quotation or translation of any source.)*';

// ================================================================ t01 Discovery of Hampi and the rise of the empire
Q('m_hp_mack', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'The ruins at Hampi were brought to light in 1800 by which engineer and antiquarian of the East India Company?',
  opts: ['Colin Mackenzie', 'Alexander Greenlaw', 'John M. Fritz', 'M. S. Nagaraja Rao'],
  sol: 'Mackenzie, who later became the first Surveyor General of India, began the recovery of the site. Greenlaw was a photographer of the 1850s, and the other two names are scholars of the detailed surveys of the 1970s and after.',
}));
Q('m_found', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Vijayanagara, meaning city of victory, was founded in 1336 by',
  opts: ['the brothers Harihara and Bukka', 'Krishnadeva Raya, the Tuluva ruler', 'Rama Raya, the chief minister of the empire', 'a council of the Deccan Sultans'],
  sol: 'The two brothers began the empire. Krishnadeva Raya and Rama Raya belong to the sixteenth century, and the Deccan Sultans were rivals of the empire, not its founders.',
}));
Q('m_kdr_acts', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Which of the following was not an achievement credited to Krishnadeva Raya?',
  opts: [
    'Founding the empire of Vijayanagara in 1336',
    'Acquiring the Raichur doab in 1512',
    'Subduing the rulers of Orissa in 1514',
    'Defeating the Sultan of Bijapur in 1520',
  ],
  sol: 'The empire was founded in 1336, long before his rule of 1509 to 1529. The other three are the gains and victories that mark his reign.',
}));
Q('m_hp_priests', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: 'Colin Mackenzie\'s first information about Hampi came from the memories of priests of the Virupaksha temple and the Pampadevi shrine. Which new finding would most weaken the view that those memories gave a dependable picture of how the city had been used before it was abandoned?',
  opts: [
    'Excavations showing that several halls the priests named as royal audience halls were storehouses with no royal features',
    'A photograph of the Virupaksha temple taken in 1856',
    'An inscription recording a gift to the Virupaksha temple',
    'A traveller\'s description of festivals held at the Virupaksha temple',
  ],
  sol: 'Only a clash between what the priests said and what the ground shows bears on how far their memories can be trusted. A photograph, a gift record and a description of festivals are consistent with a temple that stayed in use and leave their reliability untested.',
}));
Q('m_hp_photo', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'An imagined photographer\'s caption book of the 1860s records a pillared porch at Hampi with its stone roof slabs in place. A survey drawing made in the 1990s shows the same porch with the slabs missing. Which conclusion do the two records best support?',
  opts: [
    'The porch lost its roof slabs at some time between the 1860s and the 1990s, though the records do not say how or exactly when',
    'The porch was never roofed, because the drawing of the 1990s shows it open',
    'The photographer must have erred, since a later survey is always more reliable',
    'The slabs were removed during Mackenzie\'s survey of 1800',
  ],
  sol: 'Two dated records of one structure fix the loss between their dates and say nothing about the cause. The second option ignores the photograph, the third ranks sources by date alone, and the fourth puts the loss before the photograph was taken.',
}));
Q('m_kdr_date', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'An imagined copper plate names Krishnadeva Raya as the reigning raya and records a gift made in thanks for the victory over the Sultan of Bijapur. Between which years must it have been issued?',
  opts: [
    'After 1520 and not later than 1529, the end of his reign',
    'Between 1336 and 1485, in the Sangama period',
    'After 1565, when the city had been abandoned',
    'Between 1512 and 1514, before the campaign against Orissa',
  ],
  sol: 'The victory sets the earliest year and the end of his reign sets the latest. The other ranges either precede the victory, belong to other dynasties or come after he had ceased to rule.',
}));
Q('m_horse_port', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Horses were brought to Vijayanagara from Arabia and Central Asia. Suppose that in an imagined year a hostile ruler blocked every route by which horses reached the empire. Which result is most likely?',
  opts: [
    'The raya\'s cavalry would be hard to maintain, and the empire would have to find other routes or suppliers',
    'The amara-nayakas would no longer have to send troops',
    'The Tungabhadra would cease to supply water to the capital',
    'The kudirai chettis would become the rulers of the empire',
  ],
  sol: 'An army that relied on imported horses suffers when the supply is cut. The remaining options link the blockade to matters it does not touch.',
}));

// ================================================================ t02 Rayas, nayakas and the Deccan Sultanates
Q('m_nay_def', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Which description fits an amara-nayaka of the Vijayanagara empire?',
  opts: [
    'A military commander given a territory (an amaram) by the raya to govern, who collected dues from it and supplied troops',
    'A merchant who bought and sold horses on the coast',
    'A priest who managed the lands of a temple',
    'A ruler of a neighbouring Sultanate who paid tribute to the raya',
  ],
  sol: 'The term describes a commander holding an assigned territory in return for service. Horse merchants were the kudirai chettis, and priests and Sultanate rulers do not fit.',
}));
Q('m_nay_criteria', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'Three imagined officers of the sixteenth century are described. P holds a district by the raya\'s grant, collects dues from its peasants, craft workers and traders, keeps part for his horses and elephants, sends troops when asked and pays yearly tribute. Q commands a hill fort and a band of armed supporters of his own, takes dues from nearby villages, but answers to no ruler and sends neither troops nor tribute. R manages a temple and collects rent from its lands. Who may be called an amara-nayaka?',
  opts: ['P only', 'P and Q', 'Q only', 'P, Q and R'],
  sol: 'The term needs a territory granted by the raya together with duties to him. Q controls a fort and armed supporters but owes nothing to a ruler, so he is a local chief and not an amara-nayaka, and R collects rent for a temple, not as a commander.',
}));
Q('m_nay_indep', mcq({
  t: 2, d: 3, c: 'understanding',
  stem: 'Many nayakas set up independent kingdoms in the seventeenth century. Which set of conditions best explains how this became possible?',
  opts: [
    'They already held forts and armed supporters and collected revenue in their territories, while the centre of the empire had been weakened after 1565',
    'They had been forbidden to hold forts, and the raya had given them no revenue',
    'Their territories lay beside the royal centre, so that the raya could watch them closely',
    'They had never been required to send troops or tribute',
  ],
  sol: 'Independence needs both the means, such as forts, men and revenue, and a centre too weak to stop it. The other options deny the means, add close supervision or contradict the duties these commanders owed.',
}));
Q('m_sult_events', mcq({
  t: 2, d: 4, c: 'analysis',
  stem: 'An imagined list of events from one generation records: (1) Vijayanagara and Bijapur fight over a fertile stretch of land between two rivers; (2) Ahmadnagar and Bijapur fight each other, and the raya\'s minister helps one against the other; (3) merchants from both realms buy and sell cloth and horses in the same market towns; (4) years later, several Deccan sultans combine their armies against Vijayanagara. Which reading of the list is best supported?',
  opts: [
    'The states followed shifting interests of land, trade and security, so they were rivals at some times and partners at others; religion alone does not explain the pattern',
    'The wars were fought only because of a difference of religion, and all trade stopped during each war',
    'Vijayanagara was always allied with the Sultanates',
    'The sultans never fought one another, only the raya',
  ],
  sol: 'Item (2) shows sultans at war with each other and a raya taking sides, and item (3) shows trade across the lines, so no single fixed alignment fits the list. The other options ignore at least one of the four entries.',
}));
Q('m_sult_title', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Some rayas were sometimes called Hindu Suratrana, a form of the title sultan. What does the use of such a title suggest?',
  opts: [
    'That the rayas borrowed titles and ideas from the Sultanates, so relations included exchange as well as conflict',
    'That the rayas were ruled by the Sultan of Bijapur',
    'That the rayas had stopped building temples',
    'That the Sultanates had no contact with the rayas',
  ],
  sol: 'A title taken from a neighbouring court shows contact and borrowing. It does not show subordination, and the rayas went on building temples.',
}));
Q('m_rival', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'Besides the Deccan Sultans, which other ruling power was a rival of Vijayanagara?',
  opts: ['The Gajapati rulers of Orissa', 'The Cholas of Thanjavur', 'The Mauryan emperors', 'The Pallavas of Kanchipuram'],
  sol: 'The Gajapati rulers were contemporaries whom Krishnadeva Raya subdued in 1514. The other dynasties ruled in much earlier periods.',
}));

// ================================================================ t03 Water resources, fortifications, urban core
Q('m_water_site', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Which statement describes a natural advantage of the site of Vijayanagara?',
  opts: [
    'The Tungabhadra formed a natural basin on the north-east, and streams from the granite hills could be held behind embankments',
    'The site stood on a flat coast with rain through the year',
    'The site was a desert watered only by wells',
    'The site lay at the meeting of navigable canals dug by earlier dynasties',
  ],
  sol: 'A river basin and hill streams gave both a barrier and a store of water. The other options describe conditions that do not match the site.',
}));
Q('m_tank', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'The Kamalapuram tank, made in the early fifteenth century, watered fields and was linked by a canal to which part of the city?',
  opts: ['The royal centre', 'The Vitthala temple', 'The outer forests', 'A port on the Arabian Sea'],
  sol: 'The canal carried water from the tank to the royal centre as well as to the fields. The other places are not linked to it.',
}));
Q('m_fort_id', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Two imagined wall sections are found. Section X is built of wedge-shaped stone blocks fitted together without any cementing material, and its gateway has an arch. Section Y is built of rubble set in lime mortar, and its gateway has a flat lintel. Which section matches the fortifications of Vijayanagara as historians describe them?',
  opts: [
    'X, because mortar-free interlocking blocks and arched gateways are features of those walls',
    'Y, because the rayas always used lime mortar',
    'Both, because the rayas used any method available',
    'Neither, because the walls of Vijayanagara had no gateways',
  ],
  sol: 'The method of wedge-shaped, interlocking stones without mortar and the arched gateways are the features recorded for the walls of the capital. Section Y differs on both counts.',
}));
Q('m_fort_weaken', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: 'One reason given for enclosing fields within the fortified area is that this helped the city to withstand sieges. Which finding would most weaken this view?',
  opts: [
    'Evidence that the enclosed fields could feed the people for only a few days and that grain still had to be brought in from outside',
    'Evidence that the enclosed fields were watered by canals',
    'Evidence that the outer lines of wall were of stone blocks',
    'Evidence that forests were also enclosed within the walls',
  ],
  sol: 'The view depends on the fields supplying food during a siege, so a finding that they supplied very little cuts directly at it. Canals, stone blocks and enclosed forests say nothing about the quantity of food.',
}));
Q('m_channel', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'An imagined surveyor traces a stone-lined channel from a large reservoir. It runs past a series of royal enclosures, ends in a stone basin inside one of them and sends a narrow branch towards fields outside. Which conclusion does this evidence alone best support?',
  opts: [
    'Water was brought by design to the royal enclosures and also reached some fields, though the evidence cannot say who used it first or when it was built',
    'The fields were irrigated before any royal enclosure existed',
    'The channel proves that the reservoir was the Kamalapuram tank',
    'The channel shows that ordinary people had no access to water',
  ],
  sol: 'The route and the basin show planning for the enclosures and the branch shows use for fields. Order of use, the identity of the reservoir and the access of ordinary people lie beyond what the channel records.',
}));
Q('m_urban_quarter', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'An imagined survey of the urban core records a tomb with arched openings and a pillared porch whose design resembles a temple mandapa. Which inference is best supported?',
  opts: [
    'Builders in the city drew on more than one architectural tradition, though the survey cannot tell who built it or who was buried there',
    'The tomb was built before the city was founded',
    'The tomb must have belonged to a temple priest',
    'The tomb shows that the city had no temples',
  ],
  sol: 'Arches and a mandapa-like porch in one building point to mixed building traditions. A single survey entry cannot name the builder or the person buried, and it says nothing about dates before the city or about the absence of temples.',
}));
Q('m_razzaq', mcq({
  t: [3, 5], d: 4, c: 'analysis',
  stem: 'An ambassador from Persia who visited in the 1440s noted seven lines of fortification enclosing the city, its fields and its forests. A surveyor today finds clear traces of only four lines. Which conclusion is soundest?',
  opts: [
    'The ambassador may have counted lines that have since been lost or counted differently, so the gap calls for a closer survey before either record is preferred',
    'The ambassador invented the number, since a survey of today is always correct',
    'The survey proves that only four lines ever existed',
    'The two records cannot be compared because one is a traveller\'s account',
  ],
  sol: 'A conflict between an old account and present traces has several possible explanations, such as loss of walls, different ways of counting or later changes. Only further survey can decide, so neither record should simply be dropped.',
}));

// ================================================================ t04 Royal and sacred centres
Q('m_dibba_size', mcq({
  t: 4, d: 1, c: 'recall',
  stem: 'The Mahanavami dibba is a massive platform with carved sides. About how high does it rise?',
  opts: ['About 40 feet', 'About 4 feet', 'About 400 feet', 'About 4,000 feet'],
  sol: 'It rises from a broad base to a height of about forty feet, which is why it stands out among the buildings of the royal centre.',
}));
Q('m_dibba_weaken', mcq({
  t: 4, d: 3, c: 'analysis',
  stem: 'Historians link the Mahanavami dibba with rituals of the Mahanavami festival by combining travellers\' descriptions with the structure itself. Which new finding would most weaken the link?',
  opts: [
    'A securely dated record showing that the platform was built only after the royal court had left the city',
    'A second description of the festival, written independently of the first',
    'More carved panels of soldiers and horses on the sides of the platform',
    'Evidence that the platform stands within the royal centre',
  ],
  sol: 'If the platform came after the court had gone, it could not have been used in the festivals the travellers saw. More descriptions, more carvings and its location would all leave the link standing or make it stronger.',
}));
Q('m_lotus_name', mcq({
  t: 4, d: 3, c: 'application',
  stem: 'The name Lotus Mahal was given by British travellers in the nineteenth century, and the building\'s use is uncertain. An imagined historian finds a sixteenth-century record that calls the building by another name and describes councils meeting there. How should the record affect the study of the building?',
  opts: [
    'It supports the suggestion that the building was a council chamber, and shows that the later name is no evidence of its original use',
    'It proves that the building was a flower pavilion shaped like a lotus',
    'It is useless, because the name Lotus Mahal is older',
    'It shows that the building was a temple of the sacred centre',
  ],
  sol: 'A record from the time of use outweighs a name that arrived centuries later, and a description of councils fits the suggestion already made. It is still only one record, so the point remains a suggestion.',
}));
Q('m_zone_two', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'An imagined survey describes two zones. Zone R has a temple whose panels show scenes from the Ramayana, a high carved platform from which displays could be watched and stables for elephants; it lies near a canal from a tank. Zone S lies among rocky hills by the river and has a shrine of the local goddess, a great gateway and a colonnaded street for processions. Which pairing is best?',
  opts: [
    'R is the royal centre and S is the sacred centre',
    'R is the sacred centre and S is the royal centre',
    'R is the urban core and S is the irrigated fields',
    'Both are parts of the urban core',
  ],
  sol: 'Rulers\' platforms for displays and stables mark a royal zone even when a temple stands in it, and the river, the hills, the goddess and the processions mark the sacred zone. The canal and the Ramayana panels are the distracting clues.',
}));
Q('m_temple_econ', mcq({
  t: [4, 5], d: 3, c: 'application',
  stem: 'An imagined copper plate records that a raya assigned the revenue of several villages to a temple and that the temple\'s managers ran workshops and lent money to farmers. Which statement goes beyond what this single record can show?',
  opts: [
    'That every temple in the empire had the same economic role',
    'That this temple had an economic role as well as a religious one',
    'That a raya supported this temple',
    'That the temple\'s managers dealt with farmers',
  ],
  sol: 'One record describes one temple. It cannot support a claim about all temples, although it does support the three narrower statements about this one.',
}));
Q('m_virup_sign', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'Why did the rayas sign royal orders with the words Shri Virupaksha in Kannada script?',
  opts: [
    'To show that they ruled on behalf of the god Virupaksha, a form of Shiva, which lent legitimacy to their rule',
    'Because Virupaksha was the Sultan of Bijapur',
    'Because the orders were written in a secret code',
    'Because the orders were addressed only to Maharashtra',
  ],
  sol: 'The signature placed the raya\'s authority under the patronage of the deity. The other options give meanings that Virupaksha and the script do not have.',
}));
Q('m_vitthala', mcq({
  t: 4, d: 1, c: 'recall',
  stem: 'Vitthala, a deity worshipped especially in Maharashtra and honoured in a temple at Vijayanagara, is regarded as a form of which deity?',
  opts: ['Vishnu', 'Shiva', 'Brahma', 'Ganesha'],
  sol: 'He is a form of Vishnu. Virupaksha, by contrast, is a form of Shiva.',
}));

// ================================================================ t05 Sources: buildings and plans
Q('m_scale', mcq({
  t: [4, 5], d: 1, c: 'understanding',
  stem: 'The Mahanavami dibba rises to about 40 feet. A student draws its side view on a sheet where 1 cm stands for 4 feet. How tall, in centimetres, should the drawing of the platform be?',
  opts: ['10', '4', '160', '44'],
  sol: 'Divide the height by the scale, 40 by 4, to get 10 centimetres. The others multiply, subtract or mix the figures.',
}));
Q('m_fit', mcq({
  t: 5, d: 3, c: 'analysis',
  stem: 'A historian wishes to answer four questions about Vijayanagara. For which one would the plan of the royal centre, showing walls, gateways and enclosures, be the most useful source?',
  opts: [
    'How were the enclosures of the royal centre placed in relation to one another and to the entrances?',
    'How much did a weaver of the urban core earn in a year?',
    'Who was the chief minister of the empire in 1565?',
    'How many horses did a nayaka send to the raya in a given year?',
  ],
  sol: 'A plan records layout and arrangement. Earnings, a minister\'s name and the number of horses sent would have to come from accounts, inscriptions or chronicles.',
}));
Q('m_palace_conflict', mcq({
  t: [4, 5], d: 4, c: 'analysis',
  stem: 'An imagined guide\'s note says the largest enclosure of the royal centre was the king\'s palace, because it is the biggest. An excavation report finds in it large storage jars, a water tank and many small rooms in rows, but no sign of fine living quarters. Which conclusion is soundest?',
  opts: [
    'The palace label is uncertain, since the enclosure may have served another purpose, such as administration or storage, and more evidence is needed',
    'The report proves that the enclosure was only a granary',
    'The guide is right, because size always shows rank',
    'The enclosure cannot be studied at all',
  ],
  sol: 'The guide argues only from size, and the finds point away from a residence without settling what the enclosure was. The best course is to treat the label as doubtful and look for more evidence.',
}));
Q('m_date_note', mcq({
  t: [1, 5], d: 2, c: 'application',
  stem: 'An imagined note by a visiting guide says: this great temple is now on the World Heritage list, and the priests whose memories first guided Mackenzie are remembered here. What is the earliest year in which the note could have been written?',
  opts: ['1986', '1800', '1856', '1565'],
  sol: 'The listing took place in 1986 and the note speaks of it as already done, so no earlier year is possible. The other years are earlier events that the note also mentions or presupposes.',
}));

// ================================================================ assertion-reason
Q('ar_doab', ar({
  t: 2, d: 2, c: 'understanding', verdict: 'both-true-explains',
  a: 'The Raichur doab was a frequent cause of war between Vijayanagara and the Deccan Sultanates.',
  r: 'The doab was a fertile tract between two rivers, and whoever controlled it gained wealth from its produce.',
  sol: 'The value of the land gives each side a reason to fight for it, which is the ground for the first statement.',
}));
Q('ar_nay_gift', ar({
  t: 2, d: 3, c: 'analysis', verdict: 'both-true-not-explains',
  a: 'Many nayakas established independent kingdoms in the seventeenth century.',
  r: 'Amara-nayakas presented gifts to the king at the royal court.',
  sol: 'Both statements hold, but giving gifts at court was a sign of service and cannot account for later independence. The reasons lie in their forts, armed supporters and revenue, and in the weakened centre.',
}));
Q('ar_title', ar({
  t: 2, d: 2, c: 'understanding', verdict: 'A-false-R-true',
  a: 'The title Hindu Suratrana shows that the rayas had no contact with the Sultanates.',
  r: 'The rayas borrowed titles and architectural features, such as arches and domes, from the Sultanates.',
  sol: 'The second statement is true and shows contact, which is exactly why the first fails.',
}));
Q('ar_fields', ar({
  t: 3, d: 2, c: 'understanding', verdict: 'both-true-explains',
  a: 'The fortifications of Vijayanagara enclosed agricultural land as well as the city.',
  r: 'Fields within the walls helped the city to withstand sieges.',
  sol: 'Food grown inside the lines gives a reason to build the lines around the land.',
}));
Q('ar_houses', ar({
  t: 3, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'The few remains of ordinary houses in the urban core cannot, by themselves, show that few ordinary people lived there.',
  r: 'Travellers such as Barbosa described the ordinary houses of the city.',
  sol: 'Independent written evidence that such houses existed shows why an empty ground cannot be read as an empty city, so the second statement supports the first.',
}));
Q('ar_virup', ar({
  t: 4, d: 2, c: 'understanding', verdict: 'A-true-R-false',
  a: 'Royal orders of the rayas were signed Shri Virupaksha.',
  r: 'Virupaksha was the raya who founded Vijayanagara in 1336.',
  sol: 'The signature is recorded, but the second statement is false: Virupaksha is a form of Shiva, in whose name the rulers claimed to rule, and the empire was founded by Harihara and Bukka.',
}));
Q('ar_dibba', ar({
  t: [4, 5], d: 2, c: 'understanding', verdict: 'both-true-explains',
  a: 'The structure of the Mahanavami dibba alone cannot tell historians which rituals were performed on it.',
  r: 'Historians link the platform with the festival by combining travellers\' descriptions with the structure.',
  sol: 'The need to bring in written descriptions is the consequence of what the platform cannot say by itself.',
}));

// ================================================================ true-false, fill-blank, match, ordering
Q('tf_unesco', tf({
  t: 1, d: 1, c: 'recall', ans: true,
  stem: 'True or false? Hampi was declared a UNESCO World Heritage site in 1986.',
  sol: 'The listing of 1986 recognised the value of the monuments of the site.',
}));
Q('tf_nay', tf({
  t: 2, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? In the sixteenth century the amara-nayakas ruled independent kingdoms and owed nothing to the raya.',
  sol: 'They held territories assigned by the raya and owed troops, tribute and gifts. Independent kingdoms came later, in the seventeenth century.',
}));
Q('tf_lotus', tf({
  t: 4, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? Historians are certain that the Lotus Mahal was a pleasure pavilion of the queens, as its name suggests.',
  sol: 'The name is a nineteenth-century one and the use is uncertain; a council chamber is one suggestion.',
}));
Q('tf_grant', tf({
  t: [4, 5], d: 2, c: 'application', ans: false,
  stem: 'True or false? An inscription recording a raya\'s gift of villages to a temple proves that temple priests themselves ploughed and harvested those villages.',
  sol: 'A gift record names a donor, a recipient and a purpose. It does not say who worked the land, and the revenue may well have come from farmers who paid dues.',
}));
Q('fb_pampa', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'Hampi takes its name from the local mother goddess ___.',
  acc: [['Pampadevi', 'Pampa Devi', 'Pampa']],
  sol: 'Pampadevi was the local goddess whose shrine is at the site.',
}));
Q('fb_tangadi', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'In 1565 Rama Raya led the army of Vijayanagara into battle at ___, also called Talikota.',
  acc: [['Rakshasi-Tangadi', 'Rakshasi Tangadi', 'Rakshasi']],
  sol: 'The battle of Rakshasi-Tangadi ended in defeat for Vijayanagara.',
}));
Q('fb_mortar', fb({
  t: 3, d: 1, c: 'recall',
  stem: 'The walls of Vijayanagara used no cementing agent such as ___; wedge-shaped blocks of stone held one another in place by interlocking.',
  acc: [['mortar', 'lime mortar', 'cement']],
  sol: 'The stones were fitted without mortar and stayed together by interlocking.',
}));
Q('mt_people', match({
  t: [1, 2], d: 1, c: 'recall',
  stem: 'Match each person with what he is associated with.',
  pairs: [
    ['Harihara and Bukka', 'Founded the empire in 1336'],
    ['Krishnadeva Raya', 'Acquired the Raichur doab in 1512'],
    ['Rama Raya', 'Led the army at Rakshasi-Tangadi in 1565'],
    ['Colin Mackenzie', 'Brought the ruins of Hampi to light in 1800'],
  ],
  sol: 'Each statement names the person\'s best-known act as described in the study of the empire and of the site.',
}));
Q('mt_zones', match({
  t: [3, 4], d: 2, c: 'understanding',
  stem: 'Match each feature with the zone of the settlement in which it is found.',
  pairs: [
    ['Hazara Rama temple with panels from the Ramayana', 'Royal centre'],
    ['Virupaksha temple and chariot streets', 'Sacred centre'],
    ['Tombs, mosques and small shrines along roads in the valleys', 'Urban core'],
    ['Kamalapuram tank and Hiriya canal', 'Irrigated valley'],
  ],
  sol: 'Each feature belongs to the zone named in the pairing.',
}));
Q('ord_found', ord({
  t: 1, d: 2, c: 'understanding', marks: 1,
  stem: 'Arrange these events in the history of Vijayanagara and of Hampi in chronological order.',
  items: [
    'Harihara and Bukka found the empire',
    'Krishnadeva Raya acquires the Raichur doab',
    'Rama Raya leads the army at Rakshasi-Tangadi',
    'Colin Mackenzie brings the ruins to light',
  ],
  sol: 'The dates are 1336, 1512, 1565 and 1800.',
}));
Q('ord_read', ord({
  t: 5, d: 2, c: 'understanding', marks: 1,
  stem: 'Arrange these steps in a sensible order for reading a plan of a building or a group of buildings.',
  items: [
    'Note who drew the plan, when, and at what scale',
    'Identify the enclosures, gateways and water channels it shows',
    'Link them with written or inscribed evidence',
    'State what the plan supports and what it cannot show',
  ],
  sol: 'The plan\'s origin comes first, then its contents, then outside evidence, and the judgement last.',
}));

// ================================================================ short answers, 2 marks
Q('s_found', short({
  t: 1, d: 1, c: 'recall', marks: 2, wl: S2,
  stem: 'State two facts about the founding of the Vijayanagara empire.',
  model: '(1) The empire was founded in **1336** by two brothers, **Harihara** and **Bukka**. (2) The name Vijayanagara means **city of victory**, its rulers were called **rayas**, and at its height it stretched from the Krishna–Tungabhadra doab to the far south.',
  sol: 'The date and founders, and the meaning of the name or the extent of the empire.',
  scheme: [['Date and founders', 1], ['Meaning of the name or extent', 1]],
}));
Q('s_fit', short({
  t: [1, 5], d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: 'A historian has three sources on a pillared hall at Hampi: P, a photograph of the 1860s; Q, an inscription recording a gift for the hall\'s daily worship; R, a survey plan of the 1990s. Which source best answers the question of whether the roof was intact in the 1860s, and which best answers who paid for the daily worship? Give a reason for each.',
  model: '**P** suits the first, since a photograph shows what stood on the day it was taken. **Q** suits the second, because an inscription names the donor and the purpose of a gift. Plan R shows layout, not the roof\'s state in the 1860s or the donor.',
  sol: 'Each question matched to the kind of record that can answer it.',
  scheme: [['P for the roof, with reason', 1], ['Q for the donor, with reason', 1]],
}));
Q('s_amara', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State two obligations of an amara-nayaka towards the raya.',
  model: '(1) He had to **supply troops** to the king from the territory he governed. (2) He had to pay **annual tribute** and present **gifts at the royal court**, after keeping the share needed for his horses and elephants.',
  sol: 'Two of the duties: troops, tribute and gifts.',
  scheme: [['First obligation', 1], ['Second obligation', 1]],
}));
Q('s_sult', short({
  t: 2, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: 'An imagined chronicle summary records a battle between Vijayanagara and Bijapur in one year. An imagined customs register of the same year shows merchants of both realms buying and selling cloth and horses in a shared market. What does the pair suggest about relations between the two states, and what caution applies?',
  model: '**Suggestion:** relations mixed war with trade, so the states were not in constant, total hostility. **Caution:** two records of a single year cannot show how typical this was, or why the battle was fought.',
  sol: 'A conclusion about mixed relations and a limit on two records from one year.',
  scheme: [['Relations mixed conflict and trade', 1], ['One year cannot show how typical', 1]],
}));
Q('s_water', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Describe two ways in which water was brought to the fields and the city of Vijayanagara.',
  model: '(1) The **Kamalapuram tank** of the early fifteenth century stored water behind embankments and a **canal** carried it to the royal centre and fields. (2) The **Hiriya canal**, drawn from a dam across the Tungabhadra, irrigated the valley.',
  sol: 'The tank with its canal, and the canal from the river dam.',
  scheme: [['Tank and canal', 1], ['Hiriya canal from a dam', 1]],
}));
Q('s_trench', short({
  t: 3, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'An imagined trench dug in a field inside the outermost wall shows layers of silt and a stone-lined channel that carried water from a tank. State one conclusion about the enclosed fields and one thing the trench cannot show.',
  model: '**Conclusion:** the fields inside the walls were watered by planned channels, so they were farmed land and not empty space. **Cannot show:** how large the harvests were, or when the channel was built.',
  sol: 'What the channel and silt show, and what one trench cannot tell.',
  scheme: [['A conclusion about irrigated fields', 1], ['A limit of one trench', 1]],
}));
Q('s_dibba', short({
  t: 4, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Describe the Mahanavami dibba and say how historians connect it with a festival.',
  model: 'It is a massive platform with carved sides, rising from a base of about **11,000 square feet** to about **40 feet**. Historians connect it with the **Mahanavami festival** by combining travellers\' descriptions of worship, displays and gifts with the structure.',
  sol: 'The platform and the way the link is made.',
  scheme: [['Description of the platform', 1], ['How the link with the festival is made', 1]],
}));
Q('s_plan', short({
  t: 5, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'An imagined plan of a temple area shows a gateway taller than the shrine, long pillared corridors on three sides and a wide street leading away from the gateway. State one thing the plan lets a historian say about how the area was used and one thing it cannot show.',
  model: '**It suggests** space for crowds and processions, since a wide street and long corridors suit the movement of many people. **It cannot show** who built the area or when, or what rites were performed there, which need inscriptions or descriptions.',
  sol: 'A use that follows from the layout and a limit of a plan.',
  scheme: [['A use suggested by the layout', 1], ['A limit of the plan', 1]],
}));
Q('s_inscr', short({
  t: 4, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'An imagined inscription records that a nayaka built a hall in front of a temple shrine and set aside the revenue of villages to pay for daily worship. Say what this suggests about his aims and name one thing it cannot show.',
  model: '**It suggests** that he wished to win standing and the favour of the court by supporting a major temple, as rayas themselves did. **It cannot show** how large the revenue was, whether the king approved, or what the farmers who paid it thought.',
  sol: 'An inference about aims from the gift and a limit on what one inscription records.',
  scheme: [['An aim inferred from the gift', 1], ['A limit of the record', 1]],
}));

// ================================================================ short answers, 3 marks
Q('s3_amara_transfer', short({
  t: 2, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'A raya sometimes transfers an amara-nayaka from one territory to another. Give two reasons why this may have suited the raya and one risk it carried.',
  model: '(1) A commander moved away from his territory could not build a **lasting local base** of supporters and revenue, so he stayed dependent on the raya. (2) The raya could **reward loyal commanders** with better territories and warn others. **Risk:** a commander who felt wronged by a transfer might refuse to go or turn against the raya.',
  sol: 'Two reasons that follow from the nature of the grant, and one risk.',
  scheme: [['Reason: no lasting local base', 1], ['Reason: reward and discipline', 1], ['A risk of transfer', 1]],
}));
Q('s3_kdr', short({
  t: 1, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'An imagined undated letter by a merchant mentions Portuguese trading stations on the west coast, horses arriving for the raya\'s army, and a new gateway being built for Krishnadeva Raya. In which period was it most probably written? Give two reasons and one limit of this dating.',
  model: '**Period:** most probably between **1509 and 1529**. (1) The gateway being built for **Krishnadeva Raya** places the letter within his reign. (2) Portuguese stations on the west coast could exist only after their arrival in **1498**, which fits that reign. **Limit:** the letter may look back from a later date, or the gateway may have taken years to build.',
  sol: 'A range fixed by the ruler\'s reign and the earliest date of the stations, with one limit of such dating.',
  scheme: [['Period 1509 to 1529', 1], ['Two reasons from the clues', 1], ['A limit of the dating', 1]],
}));
Q('s3_city', short({
  t: 3, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Describe the urban core of Vijayanagara and what historians know of its buildings.',
  model: '(1) **Roads** in the urban core followed the valleys. (2) Archaeologists found **few remains of ordinary houses**, though travellers such as Barbosa described them. (3) One part held **tombs and mosques** with mandapa-like features resembling temple architecture, and **shrines, small temples, wells and tanks** served the residents.',
  sol: 'Roads, houses and their evidence, and the tombs, mosques and shrines.',
  scheme: [['Roads along valleys', 1], ['Few remains of houses, described by travellers', 1], ['Tombs, mosques, shrines and water sources', 1]],
}));
Q('s3_temple', short({
  t: 4, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Krishnadeva Raya marked his accession by building a hall in front of the main shrine of the Virupaksha temple, not by building a new palace. Suggest three reasons why a ruler might choose a temple for such a monument.',
  model: '(1) The rulers claimed to rule on behalf of Virupaksha, so a gift to his temple **linked the new king to the deity\'s authority**. (2) A temple drew **crowds of worshippers and pilgrims**, so the monument would be seen by many. (3) Temples were **centres of the economy and of learning**, so patronage won the support of priests and of the groups tied to the temple.',
  sol: 'Legitimacy, public visibility and the support of those connected with the temple.',
  scheme: [['Link with the deity\'s authority', 1], ['Visibility to crowds', 1], ['Support of priests and temple groups', 1]],
}));
Q('s3_festival', short({
  t: [4, 5], d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'A historian wishes to find out how an imagined festival was held at the Vitthala temple. Name three kinds of evidence she should combine, and say what each would add.',
  model: '(1) **Descriptions by visitors** of the festival would add the rites, crowds and gifts. (2) **The structure of the temple**, with its chariot-shaped shrine and the chariot streets, would show where processions could pass. (3) **Inscriptions** recording gifts for festivals would add donors, dates and purposes.',
  sol: 'Written descriptions, the buildings and inscriptions, each tied to what it adds.',
  scheme: [['Descriptions and what they add', 1], ['The structure and what it shows', 1], ['Inscriptions and what they add', 1]],
}));
Q('s3_survey', short({
  t: [1, 5], d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'An imagined team wishes to learn how much of a pillared hall seen in a photograph of the 1860s survives today. Describe how the team should proceed and name one risk of error.',
  model: 'The team should (1) **find the hall and the photographer\'s viewpoint** on the ground, (2) **measure and record** the surviving pillars and slabs, and (3) **compare** these with the photograph, adding any inscriptions on the hall. **Risk:** one viewpoint hides parts of the hall, so loss or later repair elsewhere may be missed.',
  sol: 'A matching, measuring and comparing procedure and one limit of a single photograph.',
  scheme: [['Locating the viewpoint', 1], ['Measuring and comparing', 1], ['A risk of error', 1]],
}));

// ================================================================ long answers (5 marks)
Q('l_rise', long({
  t: 1, d: 2, c: 'understanding', marks: 5, wl: L5,
  stem: 'Describe the rise of the Vijayanagara empire up to the reign of Krishnadeva Raya.',
  model: '1. **Founding:** the brothers Harihara and Bukka founded Vijayanagara, the city of victory, in 1336; its rulers were called rayas.\n2. **Setting:** fertile river valleys and rich trade in horses, spices, textiles and precious stones gave wealth; Portuguese traders reached the west coast in 1498.\n3. **Dynasties:** the Sangama dynasty was followed by the Saluva rulers from 1485 and then by the Tuluva rulers.\n4. **Krishnadeva Raya (1509 to 1529):** he acquired the Raichur doab, subdued Orissa and defeated Bijapur.\n5. **Culture:** he built temples and gopurams, and a Telugu work on statecraft is credited to him.',
  sol: 'Founding, setting, the dynasties, the achievements of Krishnadeva Raya and his cultural work.',
  scheme: [['Founding', 1], ['Setting and trade', 1], ['Dynasties', 1], ['Krishnadeva Raya\'s conquests', 1], ['Culture and building', 1]],
}));
Q('l_nayaka', long({
  t: 2, d: 2, c: 'understanding', marks: 5, wl: L5,
  stem: 'Examine how the amara-nayaka system helped the rayas of Vijayanagara and why it could also weaken them.',
  model: '1. **The system:** the raya gave commanders territories, called amaram, to govern.\n2. **Help to the raya:** commanders collected dues, kept part for horses and elephants and contributed troops, so the raya had an army without raising every soldier himself.\n3. **Control:** annual tribute, gifts at court and occasional transfers kept commanders answerable.\n4. **Weakness:** they held forts, armed supporters and revenue, so a weak centre could not hold them.\n5. **Outcome:** many set up independent kingdoms in the seventeenth century. The same resources that served the raya made independence possible.',
  sol: 'The system, its benefits, the means of control, the source of weakness and the outcome.',
  scheme: [['The system explained', 1], ['Benefit: troops and upkeep', 1], ['Means of control', 1], ['Source of weakness', 1], ['Outcome and judgement', 1]],
}));
Q('l_sultan', long({
  t: 2, d: 4, c: 'analysis', marks: 5, wl: L5,
  stem: 'Examine the relations between Vijayanagara and the Deccan Sultanates, and explain why they cannot be described simply as a conflict between religions.',
  model: '1. **Conflict:** the states fought often, especially over the fertile Raichur doab and over trade.\n2. **Shifting alliances:** the sultans fought one another, and Rama Raya played one sultan against another.\n3. **Trade:** merchants and goods, such as horses and cloth, crossed the lines of war.\n4. **Borrowing:** rayas took titles, such as Hindu Suratrana, and features such as arches and domes from the Sultanates.\n5. **Judgement:** wars arose from land, wealth and power; coalitions changed with interests, so religion alone does not explain them.',
  sol: 'Conflict, shifting alliances, trade, borrowing and a judgement on causes.',
  scheme: [['Conflict and its causes', 1], ['Shifting alliances', 1], ['Trade across the lines', 1], ['Borrowing', 1], ['Reasoned judgement', 1]],
}));
Q('l_water_fort', long({
  t: 3, d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: 'Which mattered more for the security and prosperity of Vijayanagara: its natural setting or the works built by its rulers? Give reasons.',
  model: '1. **Natural setting:** the Tungabhadra formed a basin on the north-east, and granite hills sent down streams.\n2. **Built works:** embankments made reservoirs, the Kamalapuram tank fed fields and a canal reached the royal centre, and the Hiriya canal irrigated the valley.\n3. **Defence:** seven lines of wall, built of interlocking stone without mortar and enclosing fields and forests, helped the city to bear sieges.\n4. **Link:** the setting supplied water and a barrier, but works were needed to store, carry and use it.\n5. **Judgement:** nature offered the opportunity; planned works turned it into lasting strength.',
  sol: 'Natural features, built works, defence, the link between them and a weighed judgement.',
  scheme: [['Natural setting', 1], ['Built water works', 1], ['Fortifications', 1], ['Link between the two', 1], ['Reasoned judgement', 1]],
}));
Q('l_centres', long({
  t: 4, d: 2, c: 'understanding', marks: 5, wl: L5,
  stem: 'Compare the royal centre and the sacred centre of Vijayanagara in their buildings and in what they show about the rulers.',
  model: '1. **Location:** the royal centre lay in the south-western part of the settlement; the sacred centre lay in the north by the Tungabhadra, among rocky hills.\n2. **Royal centre:** over sixty temples, about thirty palace-type complexes, the Mahanavami dibba, the Lotus Mahal and the Hazara Rama temple.\n3. **Sacred centre:** the Virupaksha and Vitthala temples, gopurams, mandapas and chariot streets.\n4. **Shared idea:** both show rulers using building to display power; one stressed state ceremony, the other the claim to rule for Virupaksha.\n5. **Difference:** royal buildings suggest the court, sacred ones the legitimacy and the economy that temples gave.',
  sol: 'Location, the buildings of each zone, a shared idea and a difference in what they show.',
  scheme: [['Location of each', 1], ['Buildings of the royal centre', 1], ['Buildings of the sacred centre', 1], ['A shared feature', 1], ['A difference in what they show', 1]],
}));
Q('l_sources', long({
  t: 5, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: 'How far can buildings and plans alone help historians to understand life in Vijayanagara? Discuss with examples.',
  model: '1. **Strengths:** plans and remains show layout, such as the zones of the settlement, the walls and the water channels.\n2. **Ideas of rulers:** the Mahanavami dibba and the great gateways show how rulers wished to display power.\n3. **Limits of use:** a building does not say its function; the use of the king\'s palace and the Lotus Mahal is uncertain.\n4. **Ordinary lives:** few remains of ordinary houses survive, so most people are barely visible.\n5. **Judgement:** buildings are essential for planning and rulers\' ideas but must be combined with travellers\' accounts and inscriptions.',
  sol: 'Strengths, rulers\' ideas, limits, the missing ordinary people and a weighed judgement.',
  scheme: [['Strengths: layout', 1], ['Rulers\' ideas', 1], ['Limits on function', 1], ['Ordinary lives missing', 1], ['Reasoned judgement', 1]],
}));

// ================================================================ source-based items
Q('sb_photo', source({
  t: [1, 5], d: 3, c: 'application', origin: 'soyl-original',
  stem: `Read the source, an imagined photographer's caption book, and answer the questions that follow. ${IMAG}`,
  passage: '**Caption book of a photographer at the ruins (imagined, 1860s)**\n\nPlate 7. The great pillared hall of the temple, seen from the east. A priest of the temple stands beside the pillars at my request. The roof slabs over the porch are broken and creepers cover one corner.\n\nPlate 11. A ruined platform of dressed granite on open ground. The villagers tell me that blocks from its steps have gone into their field walls.\n\nPlate 15. A gateway with a pointed arch, badly cracked. I could not climb to its top. The light failed before I could photograph the carvings on the north side, so there is a blank here.',
  parts: [
    child('a', short({ t: 1, d: 1, c: 'recall', marks: 1, stem: 'From which year did photographers begin to record the monuments at Hampi?', model: 'From **1856**.', sol: 'Photographers such as Alexander Greenlaw began recording the monuments in the middle of the nineteenth century.', scheme: [['1856', 1]] })),
    child('b', short({ t: 1, d: 3, c: 'analysis', marks: 1, stem: 'What does the remark about the field walls suggest about the platform as it stands today, compared with its original form?', model: 'Some of its **stone has been carried away** and reused, so what survives may not show the whole original platform.', sol: 'Reused stone means the present structure is incomplete.', scheme: [['Stone removed, so incomplete', 1]] })),
    child('c', short({ t: 1, d: 3, c: 'application', marks: 2, stem: '**Either** (i): Give two kinds of question about the buildings of Hampi that this caption book can help a historian to answer.', model: '(1) **The condition of particular buildings** in the 1860s, such as the broken porch roof of the pillared hall. (2) **How buildings were being used or reused** in the 1860s, such as the stone of the platform going into field walls.', sol: 'Two questions that a dated, visual record can answer.', scheme: [['First question', 1], ['Second question', 1]] }),
    [short({ t: 1, d: 3, c: 'application', marks: 2, stem: '**Or** (ii): A historian today wants to know how much damage happened after the 1860s. Describe two steps she can take.', model: '(1) **Match each plate with the structure on the ground** from the same viewpoint, so the two can be compared. (2) **Record what has changed**, checking the result against later survey drawings or inscriptions to narrow down when the loss occurred.', sol: 'Two steps of a comparison between the old record and the present state.', scheme: [['Matching plates with the structures', 1], ['Recording changes and dating them', 1]] })]),
  ],
}));
Q('sb_nayaka', source({
  t: [2, 5], d: 3, c: 'application', origin: 'soyl-original',
  stem: `Read the source, an imagined clerk's note on one territory, and answer the questions that follow. ${IMAG}`,
  passage: '**A clerk\'s note on one territory (imagined, sixteenth century)**\n\nThe commander holds this territory by the raya\'s grant. This year the village headmen, the weavers\' guild and the market traders have paid their dues in grain and coin. From the total, the commander set aside what his horses, elephants and household need. Of the remainder, a share goes to the troops he must supply and a share to the yearly tribute due at the court. At the festival of the great ninth day he will carry gifts to the king. Two years ago the raya moved the earlier holder of this territory to a distant one.',
  parts: [
    child('a', short({ t: 2, d: 1, c: 'recall', marks: 1, stem: 'What was the territory given to an amara-nayaka by the raya called?', model: 'An **amaram**.', sol: 'The grant itself was called an amaram.', scheme: [['Amaram', 1]] })),
    child('b', short({ t: 2, d: 3, c: 'analysis', marks: 1, stem: 'The raya moved the earlier holder to a distant territory. What does this suggest about the raya\'s authority over his commanders?', model: 'The raya could **reassign commanders at will**, which suggests real control over them.', sol: 'Power to transfer implies authority over the holder.', scheme: [['Authority to transfer', 1]] })),
    child('c', short({ t: 2, d: 3, c: 'application', marks: 2, stem: '**Either** (i): Suppose a commander each year kept more of the dues for his own horses and supporters and sent fewer troops. Give two ways in which this could change the balance of power between him and the raya.', model: '(1) The commander\'s **own force would grow** while the raya\'s army shrank. (2) The raya would **lose revenue and troops**, and could find it harder to enforce tribute or a transfer.', sol: 'Two shifts in strength between the commander and the raya.', scheme: [['Growth of the commander\'s force', 1], ['Loss of revenue and troops for the raya', 1]] }),
    [short({ t: 2, d: 3, c: 'application', marks: 2, stem: '**Or** (ii): Suggest two kinds of record a historian could use to check whether such commanders really sent the troops they owed.', model: '(1) **Official lists or accounts** of contingents that reached the king\'s army, with names of the commanders. (2) **Inscriptions or chronicles** that name nayakas who fought in particular campaigns, so their presence can be confirmed.', sol: 'Two sources that record who actually served.', scheme: [['Official lists', 1], ['Inscriptions or chronicles', 1]] })]),
  ],
}));
Q('sb_surveyor', source({
  t: [3, 5], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the source, an imagined surveyor's field notebook, and answer the questions that follow. ${IMAG}`,
  passage: '**Field notebook of a surveyor (imagined), day twelve**\n\nNorth of the royal enclosures I followed a stone-lined channel for two hours. It leaves the foot of a long earthen embankment, where a large reservoir once stood, and keeps a gentle slope towards the south. A short branch turns off to a field edge where the soil is dark and damp. The main channel enters an enclosure and ends in a square stone basin with steps. At the end of the day\'s walk the outer wall of the city ran across the fields. Its blocks fit together without any binding material, and a gateway in it has a pointed arch.',
  parts: [
    child('a', short({ t: 3, d: 1, c: 'recall', marks: 1, stem: 'Name the tank of the early fifteenth century that was linked by a canal to the royal centre.', model: 'The **Kamalapuram tank**.', sol: 'This tank watered fields and fed the canal to the royal centre.', scheme: [['Kamalapuram tank', 1]] })),
    child('b', short({ t: 3, d: 3, c: 'analysis', marks: 1, stem: 'What does the stone basin at the end of the channel suggest about the water supply of the royal centre?', model: 'It suggests that water was **planned and brought for use within the enclosure**, not left to chance.', sol: 'A built basin at the end of a channel points to deliberate supply.', scheme: [['Planned supply for the enclosure', 1]] })),
    child('c', short({ t: 3, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): The surveyor suspects that the channel was built later than the outer wall. Suggest two kinds of evidence that could test this.', model: '(1) **Excavation of layers** where channel and wall meet, to see which was cut or built first. (2) **Inscriptions or records** that date either work, since the notebook itself gives no date.', sol: 'Two ways of finding the order of construction.', scheme: [['Layers at the meeting point', 1], ['Dated records', 1]] }),
    [short({ t: 3, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): A visitor argues that the short branch shows that farmers, and not only the court, benefited from the channel. Give one point for and one against this inference.', model: '**For:** the branch ends at damp, dark soil, so some water reached fields. **Against:** the notebook does not show who farmed those fields or whether the court took the main share, so benefit to farmers is not proved.', sol: 'One piece of support and one limit.', scheme: [['A point in favour', 1], ['A point against', 1]] })]),
  ],
}));
Q('sb_guide', source({
  t: [4, 5], d: 4, c: 'analysis', origin: 'soyl-original',
  stem: `Read the source, an imagined guide's notes for a visit to the royal centre, and answer the questions that follow. ${IMAG}`,
  passage: '**A guide\'s notes for visitors to the royal centre (imagined)**\n\nStop 1: the great platform. Its sides are carved in rows with soldiers, dancers and horses. Nobody wrote on it what it was for. Scholars link it with the festival of the great ninth day, because visitors from far away described such a festival at the court and the platform fits what they describe.\n\nStop 2: the pavilion with the lotus-like arches. Warn visitors that this is not its old name: it was given by foreign visitors of a later age. Do not say it was the queens\' pavilion; nobody can prove that.',
  parts: [
    child('a', short({ t: 4, d: 1, c: 'recall', marks: 1, stem: 'In which season of the year was the Mahanavami festival held?', model: 'In the **autumn months**, September to October.', sol: 'The festival fell in the autumn.', scheme: [['Autumn, September to October', 1]] })),
    child('b', short({ t: 4, d: 3, c: 'analysis', marks: 1, stem: 'The guide says the platform fits what the visitors describe. Does this make the link with the festival a proof or a probability?', model: 'A **probability**, because a good fit between a structure and a description makes the link likely but does not prove it.', sol: 'Fit supports a link without settling it.', scheme: [['Probability with reason', 1]] })),
    child('c', short({ t: 4, d: 4, c: 'analysis', marks: 2, stem: '**Either** (i): Give two ways in which a name given by later visitors could mislead historians about a building.', model: '(1) The name **may describe nothing about the original use**, so repeating it can pass a guess off as fact. (2) It may **prevent other ideas** from being tried, such as a council chamber, because the name seems settled.', sol: 'Two ways a later name misleads.', scheme: [['Name tells nothing of original use', 1], ['Other ideas shut out', 1]] }),
    [short({ t: 4, d: 4, c: 'analysis', marks: 2, stem: '**Or** (ii): Suggest two kinds of new evidence that could raise or lower confidence in the link between the platform and the festival.', model: '(1) **A dated record of the platform\'s construction**, showing whether it existed when the court held the festival. (2) **A further independent description** of the ceremonies that mentions or contradicts a platform of this kind.', sol: 'Two kinds of evidence that bear on the link.', scheme: [['Dated record of construction', 1], ['Another independent description', 1]] })]),
  ],
}));
Q('sb_inscr', source({
  t: [4, 5], d: 3, c: 'application', origin: 'soyl-original',
  stem: `Read the source, a summary of what inscriptions of the empire commonly record, and answer the questions that follow. ${SUM}`,
  passage: '**What inscriptions of the empire commonly record (summary)**\n\nMany inscriptions on temple walls and stone slabs record gifts. A ruler or a commander gives villages, money or lamps to a temple, and the record usually names the donor, the temple and the purpose, and often the date. Others record the repair of a tank, the building of a hall or a gateway, or the orders of a king. Most were made for the donors and for the temples; the farmers and craft workers whose dues paid for the gifts seldom appear in them.',
  parts: [
    child('a', short({ t: 4, d: 1, c: 'recall', marks: 1, stem: 'In which script did the rayas sign royal orders with the words Shri Virupaksha?', model: 'In the **Kannada** script.', sol: 'Royal orders carried this signature in Kannada.', scheme: [['Kannada', 1]] })),
    child('b', short({ t: 4, d: 3, c: 'analysis', marks: 1, stem: 'Suppose a commander\'s gift to a temple is dated to the year in which the raya was crowned. What might the commander have wished to show?', model: 'His **loyalty to the new raya**, by marking the coronation with a gift to a major temple.', sol: 'A gift at a coronation reads as a public statement of loyalty.', scheme: [['Loyalty to the raya', 1]] })),
    child('c', short({ t: 4, d: 3, c: 'application', marks: 2, stem: '**Either** (i): An undated slab records a gift of lamps and villages to the Virupaksha temple by a commander who says he acts under the orders of the reigning raya, Krishnadeva Raya. Within which years does it fall, and why?', model: 'Between **1509 and 1529**, because a commander could say he acted under the reigning Krishnadeva Raya only while that raya was ruling, and his reign ran between those years.', sol: 'A ruler\'s reign fixes the range of years.', scheme: [['Years 1509 to 1529', 1], ['Reason from the reign', 1]] }),
    [short({ t: 4, d: 3, c: 'application', marks: 2, stem: '**Or** (ii): Name two other kinds of evidence that a historian could use to learn about the farmers and craft workers whose dues paid for such gifts.', model: '(1) **Revenue and village records** that list dues and the people who paid them. (2) **Archaeological evidence**, such as tools, workshops and field remains, which shows how they worked.', sol: 'Two kinds of evidence from outside the donors\' records.', scheme: [['Revenue and village records', 1], ['Archaeological evidence', 1]] })]),
  ],
}));
