// CBSE 12 Political Science, ch14 Regional Aspirations — question bank. Every source, diary, letter,
// report and scenario is imagined and written by SOYL (labelled as such); no NCERT text, box, cartoon or
// exercise and no board/sample-paper item is reused (D-036); no real person is quoted. Real-world facts are
// limited to stable, verifiable ones. Communities are never blamed; violence is described factually and
// humanely. The only fact after 2014 is the single dated line on Jammu and Kashmir (2019, upheld 2023),
// which is stated without evaluation and is not the subject of any opinion question.
import { Q, mcq, ar, tf, fb, match, ord, short, long, source, child } from './lib.mjs';

const S2 = [30, 50];
const S3 = [50, 80];
const L5 = [80, 120];
const IMAG = '*(Imagined document written by SOYL for practice; the people in it are not real, though the events in the background are.)*';

// Chronology used by the ordering items, the timeline and the notes (checked in build.mjs).
export const EVENTS = [
  [1947, 'Accession of Jammu and Kashmir (October)'],
  [1963, 'Nagaland becomes a state'],
  [1966, 'Mizo National Front begins an armed campaign'],
  [1973, 'Anandpur Sahib Resolution'],
  [1979, 'Assam Movement begins'],
  [1984, 'Operation Blue Star (June)'],
  [1985, 'Punjab Accord and Assam Accord'],
  [1986, 'Mizoram Peace Accord'],
  [1989, 'Insurgency begins in Kashmir'],
  [1992, 'Elections held in Punjab'],
];
for (let i = 1; i < EVENTS.length; i++) if (EVENTS[i][0] <= EVENTS[i - 1][0]) throw new Error('EVENTS out of order');

// ================================================================ t01 Region and the nation
Q('m_approach', mcq({
  t: 1, d: 1, c: 'understanding',
  stem: 'Which statement best describes the approach the Indian state adopted towards regional diversity after independence?',
  opts: [
    'Diversity was accepted, and regions could voice their aspirations through democratic politics, within the unity of the nation',
    'Every regional demand was treated as anti-national and suppressed',
    'Regions were allowed to leave the Union whenever a majority there wished',
    'One language and one culture were imposed on every region',
  ],
  sol: 'India chose to accommodate diversity: regions can raise their concerns through parties, elections and negotiation, but within the framework of one nation. Suppression, a right to secede and imposed uniformity were all rejected.',
}));
Q('m_not_antinational', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'The assembly of an imagined state passes a resolution asking the Union for more control over its police and a larger share of taxes. In the Indian approach to regions, how would such a demand usually be viewed?',
  opts: [
    'As a legitimate democratic demand, to be met through negotiation where possible',
    'As a crime under the Constitution',
    'As a first step towards secession that must be refused',
    'As something only the courts may discuss',
  ],
  sol: 'A demand for greater autonomy is part of democratic politics in a federal country. It is discussed and negotiated; it is not treated as unlawful or automatically secessionist.',
}));
Q('m_dravidian', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'In which state did a regional movement grow into strong electoral parties, with protests against the imposition of Hindi as the sole official language in the mid-1960s?',
  opts: ['Tamil Nadu', 'Punjab', 'Mizoram', 'Gujarat'],
  sol: 'The Dravidian movement in Tamil Nadu led to parties such as the DMK, and there were major protests in 1965 against making Hindi the only official language. Its demands were pursued mainly through elections and agitation.',
}));
Q('m_areas', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Which group lists three regions where serious tensions between regional aspirations and the national government arose after independence?',
  opts: [
    'Jammu and Kashmir, Punjab and the North-East',
    'Goa, Puducherry and Chandigarh',
    'Delhi, Mumbai and Kolkata',
    'Kerala, Karnataka and Goa',
  ],
  sol: 'Jammu and Kashmir, Punjab and the North-East saw long periods of tension, including armed movements in some phases. The other groups are not the main cases studied in this chapter.',
}));
Q('m_imagined_language', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'In an imagined state, speakers of a minority language in the hill districts ask for their language to be used in schools and for a separate development board. According to the Indian approach to regions, the most suitable response would be to',
  opts: [
    'negotiate with their representatives and consider measures such as language rights or an autonomous council',
    'ban the organisations making the demand',
    'move the hill districts into a neighbouring state without consultation',
    'ignore the demand because it comes from a minority',
  ],
  sol: 'India\'s experience shows that recognising language and giving some self-government (for example through autonomous councils) helps accommodate regional groups. Bans, forced transfers or neglect usually deepen alienation.',
}));
Q('ar_diversity', ar({
  t: 1, d: 2, c: 'analysis', key: 'a',
  a: 'Indian leaders did not see regional diversity as a threat to national unity in itself.',
  r: 'The Indian approach held that the nation could be united while allowing different regions and languages to express themselves.',
  sol: 'Both are true, and R explains A: because unity was understood as compatible with diversity, regional expression was not in itself treated as a threat.',
}));
Q('tf_region_nation', tf({
  t: 1, d: 1, c: 'understanding', ans: false,
  stem: 'True or false? In India, regional aspirations have always been resolved only through the use of force.',
  sol: 'Most regional aspirations have been handled through elections, negotiation, accords and the creation of new states or autonomous councils. Force was used in some phases of armed conflict, but it was not the only or the main method.',
}));
Q('fb_dmk', fb({
  t: 1, d: 2, c: 'recall',
  stem: 'The protests of 1965 in Tamil Nadu were directed against making ___ the sole official language of the Union.',
  acc: [['Hindi']],
  sol: 'The agitation opposed making Hindi the only official language; English continued to be used alongside it.',
}));
Q('s_why_regions', short({
  t: 1, d: 2, c: 'analysis', marks: 2, wl: S2,
  stem: 'Give two reasons why regional aspirations are a normal part of democratic politics in a large country like India.',
  model: '1. India has **many languages, cultures and histories**, so people in different regions naturally have **distinct concerns and identities**.\n2. Democracy allows people to **organise and voice demands** through parties and elections, so regional demands come to the surface instead of being hidden.',
  sol: 'One reason from diversity, one from the nature of democracy.',
  scheme: [['Diversity of regions', 1], ['Democracy lets demands be voiced', 1]],
}));
Q('s3_dravidian', short({
  t: 1, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'How does the experience of the Dravidian movement in Tamil Nadu show that a regional movement can work within democratic politics? Give three points.',
  model: '1. Its leaders formed **political parties** such as the DMK and contested **elections**, winning power in the state.\n2. Its concerns about **language and identity** were raised through **agitations and debate**, and the Union continued to use English alongside Hindi.\n3. The early idea of a separate Dravidian country **faded**, and the movement became part of **mainstream state politics** and coalition governments at the Centre.',
  sol: 'Three points: electoral route, language demand met through debate, shift from separation to mainstream politics.',
  scheme: [['Elections and parties', 1], ['Language concern addressed democratically', 1], ['Move into mainstream politics', 1]],
}));

// ================================================================ t02 Jammu and Kashmir; Punjab
Q('m_accession', mcq({
  t: 2, d: 2, c: 'recall',
  stem: 'When did the ruler of Jammu and Kashmir sign the Instrument of Accession to India?',
  opts: ['October 1947', 'August 1947', 'January 1950', 'November 1956'],
  sol: 'The Maharaja signed the Instrument of Accession in October 1947, after raiders from the Pakistan side entered the state. August 1947 is independence, January 1950 the Constitution, and November 1956 the reorganisation of states.',
}));
Q('m_art370', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Under Article 370, as it originally applied, what was special about Jammu and Kashmir?',
  opts: [
    'It had greater autonomy than other states, including its own constitution',
    'It had no elected assembly',
    'Its people could not vote in Lok Sabha elections',
    'It was governed directly by the United Nations',
  ],
  sol: 'Article 370 gave the state greater autonomy, including its own constitution, and many provisions of the Indian Constitution applied there only with the state\'s concurrence. It had an elected assembly and its people voted in national elections.',
}));
Q('m_three_regions', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'The former state of Jammu and Kashmir had three distinct social and political regions. They were',
  opts: [
    'Jammu, the Kashmir valley and Ladakh',
    'Jammu, Shimla and Ladakh',
    'Kashmir valley, Kangra and Lahaul',
    'Jammu, Kargil and Chamba',
  ],
  sol: 'The three regions were Jammu, the Kashmir valley and Ladakh, each with its own mix of languages, faiths and aspirations. Shimla, Kangra, Lahaul and Chamba are in Himachal Pradesh.',
}));
Q('m_abdullah', mcq({
  t: 2, d: 2, c: 'recall',
  stem: 'Which leader of the National Conference became the head of the government of Jammu and Kashmir in 1948 and led land reforms there?',
  opts: ['Sheikh Mohammad Abdullah', 'Sant Harchand Singh Longowal', 'Laldenga', 'Prafulla Kumar Mahanta'],
  sol: 'Sheikh Abdullah of the National Conference headed the state government from 1948. Longowal was an Akali leader in Punjab, Laldenga led the Mizo National Front, and Mahanta led the Asom Gana Parishad.',
}));
Q('m_strands', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'Which statement correctly describes the range of separatist politics in Kashmir from the 1990s?',
  opts: [
    'Different groups wanted different things: a separate nation, merger with Pakistan, or greater autonomy within India',
    'All groups demanded only merger with Pakistan',
    'All groups demanded only a separate nation',
    'There were no political demands, only economic ones',
  ],
  sol: 'Separatist politics in Kashmir was not one demand. Some wanted a separate Kashmiri nation, some wanted merger with Pakistan, and others wanted more autonomy for the people of the state within India.',
}));
Q('m_1989', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'From around which year did armed insurgency take hold in the Kashmir valley?',
  opts: ['1989', '1953', '1971', '2002'],
  sol: 'Armed insurgency spread from 1989, after growing resentment, including over the conduct of the 1987 assembly election. 1953 saw Sheikh Abdullah\'s dismissal, 1971 was the Bangladesh war, and 2002 saw an election widely described as fair.',
}));
Q('m_2019', mcq({
  t: 2, d: 2, c: 'recall',
  stem: 'Which statement about Jammu and Kashmir after August 2019 is factually correct?',
  opts: [
    'The former state was reorganised into two Union Territories, Jammu and Kashmir and Ladakh',
    'It was reorganised into three states',
    'It became a part of Himachal Pradesh',
    'Its boundaries and status were left unchanged',
  ],
  sol: 'In August 2019 Parliament ended the special status under Article 370 and reorganised the state into two Union Territories, Jammu and Kashmir and Ladakh; the Supreme Court upheld the change in December 2023. This is a dated fact only.',
}));
Q('m_anandpur', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'What was the main concern of the Anandpur Sahib Resolution passed by the Akali Dal in 1973?',
  opts: [
    'Greater autonomy for the states and a stronger federal system',
    'Abolition of the Punjab assembly',
    'Merger of Punjab with Haryana',
    'Ending all elections in Punjab',
  ],
  sol: 'The 1973 resolution asked for regional autonomy and a redefinition of Centre–state relations, while also asserting a distinct Sikh identity. It did not seek to abolish the assembly or merge states.',
}));
Q('m_bluestar', mcq({
  t: 2, d: 2, c: 'recall',
  stem: 'In which month and year did the army operation at the Golden Temple in Amritsar, known as Operation Blue Star, take place?',
  opts: ['June 1984', 'October 1984', 'July 1985', 'June 1975'],
  sol: 'Operation Blue Star took place in June 1984. October 1984 is when Prime Minister Indira Gandhi was assassinated, July 1985 is the Punjab Accord, and June 1975 is the declaration of the Emergency.',
}));
Q('m_punjab_accord', mcq({
  t: 2, d: 2, c: 'recall',
  stem: 'The Punjab Accord of July 1985 was signed between Prime Minister Rajiv Gandhi and',
  opts: ['Harchand Singh Longowal, President of the Akali Dal', 'Sheikh Mohammad Abdullah', 'Laldenga of the Mizo National Front', 'Leaders of the All Assam Students\' Union'],
  sol: 'The Punjab (Rajiv Gandhi–Longowal) Accord was signed with the Akali Dal President Harchand Singh Longowal. Laldenga signed the Mizo Accord (1986) and AASU leaders the Assam Accord (1985).',
}));
Q('m_accord_terms', mcq({
  t: 2, d: 3, c: 'understanding',
  stem: 'Which of the following was part of the Punjab Accord of 1985?',
  opts: [
    'Chandigarh was to be transferred to Punjab, and a tribunal was to settle the river water dispute with neighbouring states',
    'Punjab was to be divided into two new states',
    'Elections in Punjab were to be postponed for ten years',
    'Punjab was to receive special status like Article 370',
  ],
  sol: 'The accord provided for transferring Chandigarh to Punjab, a commission on the boundary dispute with Haryana, a tribunal on sharing the Ravi–Beas waters, and compensation to those affected by militancy. The other options were never part of it.',
}));
Q('m_imagined_trust', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'A student writes: "In the case studied, an election in the late 1980s was widely felt to be unfair, and this deepened the feeling of alienation among many young people." Which region\'s experience does this most closely describe?',
  opts: ['The Kashmir valley', 'Tamil Nadu', 'Mizoram', 'Haryana'],
  sol: 'Resentment over the conduct of the 1987 assembly election in Jammu and Kashmir is commonly seen as one factor behind the rise of insurgency from 1989. The other regions do not fit this description.',
}));
Q('ar_kashmir_dimensions', ar({
  t: 2, d: 3, c: 'analysis', key: 'a',
  a: 'The Kashmir issue has both external and internal dimensions.',
  r: 'Pakistan has claimed the region, while within the state there have been debates over autonomy and the place of the state in the Union.',
  sol: 'Both are true, and R explains A: the external dimension is the dispute with Pakistan; the internal dimension is the political debate about autonomy and the status of the people of the state.',
}));
Q('ar_punjab_1992', ar({
  t: 2, d: 3, c: 'analysis', key: 'b',
  a: 'Elections were held in Punjab in 1992 after a long break.',
  r: 'The Punjab Accord was signed in 1985.',
  sol: 'Both statements are true, but R does not explain A: the accord of 1985 did not bring immediate peace, and elections were held only in 1992 after years of militancy and President\'s rule.',
}));
Q('ar_violence_1984', ar({
  t: 2, d: 3, c: 'analysis', key: 'd',
  a: 'After October 1984, violence against Sikhs was confined to the state of Punjab.',
  r: 'After the assassination of Prime Minister Indira Gandhi in October 1984, many Sikhs were attacked and killed in Delhi and some other parts of north India.',
  sol: 'A is false: the violence after the assassination took place mainly in Delhi and other parts of north India, not only in Punjab. R is true; it describes that violence.',
}));
Q('tf_370_own_constitution', tf({
  t: 2, d: 1, c: 'recall', ans: true,
  stem: 'True or false? Under Article 370, Jammu and Kashmir had its own constitution.',
  sol: 'The state had its own constitution, and many provisions of the Indian Constitution applied there only with the concurrence of the state government.',
}));
Q('tf_akali_power', tf({
  t: 2, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? The Akali Dal formed governments in Punjab in the late 1960s and in 1977, before militancy grew in the 1980s.',
  sol: 'The Akali Dal led coalition governments in Punjab in 1967 and again in 1977. Militancy grew later, in the early 1980s.',
}));
Q('fb_bluestar', fb({
  t: 2, d: 2, c: 'recall',
  stem: 'Operation Blue Star was carried out at the ___ in Amritsar in 1984.',
  acc: [['Golden Temple', 'Harmandir Sahib']],
  sol: 'The army operation of June 1984 was carried out at the Golden Temple (Harmandir Sahib) in Amritsar.',
}));
Q('s_370', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'What special position did Jammu and Kashmir enjoy under Article 370 before 2019? State two features.',
  model: '1. The state had **greater autonomy** than other states and its **own constitution**.\n2. Many provisions of the Indian Constitution applied there **only with the concurrence of the state** government, so Parliament\'s powers over it were more limited.',
  sol: 'Two features of the special status.',
  scheme: [['Greater autonomy and own constitution', 1], ['Provisions applied only with concurrence', 1]],
}));
Q('s_kashmir_external', short({
  t: 2, d: 2, c: 'analysis', marks: 2, wl: S2,
  stem: 'Distinguish between the external and the internal dimension of the Kashmir issue.',
  model: '1. **External:** since 1947 **Pakistan has claimed** the region; a part of the former state has remained **under Pakistan\'s control**, and wars and talks have followed.\n2. **Internal:** within India there has been debate over the **status and autonomy** of the state and the aspirations of its **different regions**.',
  sol: 'One point on each dimension.',
  scheme: [['External dimension', 1], ['Internal dimension', 1]],
}));
Q('s_punjab_accord', short({
  t: 2, d: 2, c: 'recall', marks: 2, wl: S2,
  stem: 'State any two provisions of the Rajiv Gandhi–Longowal Accord of 1985.',
  model: '1. **Chandigarh** was to be **transferred to Punjab**, and a commission would settle the **boundary dispute** with Haryana.\n2. A **tribunal** was to decide the sharing of the **Ravi–Beas waters**; those affected by militancy were to get **compensation**.',
  sol: 'Any two correct provisions.',
  scheme: [['First provision', 1], ['Second provision', 1]],
}));
Q('s3_punjab_causes', short({
  t: 2, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Explain three developments in Punjab between 1966 and 1984 that led to a crisis between the state and the Union.',
  model: '1. After the **1966 reorganisation**, the Akali Dal pressed for **more autonomy**, and disputes over **Chandigarh and river waters** remained unsettled.\n2. The **Anandpur Sahib Resolution (1973)** raised demands for regional autonomy and a stronger federal system, while a small section later turned towards **separatism**.\n3. **Armed militancy** grew in the early 1980s; it centred on the Golden Temple complex, which led to **Operation Blue Star in June 1984** and deep hurt within the Sikh community.',
  sol: 'Three linked developments in sequence.',
  scheme: [['Unsettled disputes after 1966', 1], ['Anandpur Sahib Resolution and autonomy demand', 1], ['Militancy and Operation Blue Star', 1]],
}));
Q('s3_kashmir_since48', short({
  t: 2, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Trace three phases of politics in Jammu and Kashmir from 1948 to the end of the 1980s.',
  model: '1. **1948–53:** Sheikh Abdullah of the National Conference headed the government and carried out **land reforms**; he was **dismissed in 1953**.\n2. **1953–1980s:** the state was governed mostly by leaders close to the Congress; Abdullah returned as Chief Minister after an **agreement in 1974**.\n3. **Late 1980s:** allegations that the **1987 election was unfair** added to resentment, and **armed insurgency** took hold from **1989**.',
  sol: 'Three phases with one key development each.',
  scheme: [['1948–53 phase', 1], ['Middle phase and 1974 agreement', 1], ['1987 election and 1989 insurgency', 1]],
}));
Q('l_punjab', long({
  t: 2, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: 'Trace the course of the Punjab crisis from the Anandpur Sahib Resolution of 1973 to the return of elections in 1992, and say what lesson it offers for handling regional demands.',
  model: '1. **1973:** the Akali Dal\'s **Anandpur Sahib Resolution** asked for **regional autonomy** and a stronger federal system.\n2. **Early 1980s:** negotiations failed; **armed militancy** grew and centred on the Golden Temple complex.\n3. **1984:** **Operation Blue Star (June)**; in **October** Prime Minister Indira Gandhi was assassinated, followed by **violence against Sikhs** in Delhi and other places.\n4. **1985–1992:** the **Punjab Accord** with Longowal was signed, but militancy continued for years; **elections were held in 1992**, and normal politics slowly returned by the mid-1990s.\n5. **Lesson:** regional demands are best met early through **dialogue and fair negotiation**; delay and violence deepen distrust.',
  sol: 'Four stages in order, then a reasoned lesson.',
  scheme: [['1973 resolution', 1], ['Rise of militancy', 1], ['1984 events stated factually', 1], ['Accord and 1992 elections', 1], ['Lesson with reason', 1]],
}));
Q('l_kashmir', long({
  t: 2, d: 4, c: 'analysis', marks: 5, wl: L5,
  stem: 'Explain the roots of the Kashmir issue and the main phases of politics in the state from 1947 to the 1990s.',
  model: '1. **Accession:** in **October 1947** the Maharaja signed the **Instrument of Accession** after raiders from the Pakistan side entered; Pakistan has **claimed the region** since then (**external** dimension).\n2. **Special status:** **Article 370** gave the state **greater autonomy** and its own constitution (**internal** dimension).\n3. **1948–53:** **Sheikh Abdullah** led the government and carried out land reforms, until his **dismissal in 1953**.\n4. **1974–1980s:** an agreement in **1974** brought him back as Chief Minister; after his death in 1982 politics became unstable.\n5. **1987–1990s:** the **1987 election** was widely felt to be unfair; **insurgency** spread from **1989**, and separatist groups made **different demands**.',
  sol: 'External and internal roots, then phases in order.',
  scheme: [['Accession and external dimension', 1], ['Article 370 and internal dimension', 1], ['Abdullah era', 1], ['1974 agreement and after', 1], ['1987 election and insurgency', 1]],
}));

// ================================================================ t03 The North-East
Q('m_seven', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'Which state is NOT one of the seven states of the North-East often called the "seven sisters"?',
  opts: ['Sikkim', 'Mizoram', 'Tripura', 'Meghalaya'],
  sol: 'The seven are Assam, Arunachal Pradesh, Manipur, Meghalaya, Mizoram, Nagaland and Tripura. Sikkim, which became part of India in 1975, is now counted in the North-Eastern region but is not one of the original seven.',
}));
Q('m_isolation', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'An imagined trader in Shillong finds in 1950 that goods from Kolkata now take far longer to arrive than they did ten years earlier, and the region feels cut off. Which change after 1947 best explains this?',
  opts: [
    'It was linked to the rest of the country only by a narrow strip of land, and its economy and communications were cut off by Partition',
    'It had no international borders',
    'It received more industries than any other region',
    'It had the same language as the rest of north India',
  ],
  sol: 'After Partition the region was connected to the rest of India only through a narrow corridor near Siliguri, and old trade and transport links through what became East Pakistan were cut. It borders several countries.',
}));
Q('m_meghalaya', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Several hill states such as Meghalaya were carved out of Assam mainly because',
  opts: [
    'non-Assamese communities resisted the imposition of the Assamese language and wanted their own political units',
    'Assam wanted to reduce its size voluntarily',
    'the Union wanted to create more seats in the Rajya Sabha',
    'the hill areas wanted to join Bangladesh',
  ],
  sol: 'Tribal and other non-Assamese communities felt their identity was threatened when Assamese was imposed, and demanded separate states. Meghalaya, Mizoram and Arunachal Pradesh emerged from this process.',
}));
Q('m_mnf', mcq({
  t: 3, d: 2, c: 'recall',
  stem: 'The Mizo National Front, which began an armed campaign for independence in 1966, was led by',
  opts: ['Laldenga', 'Angami Zapu Phizo', 'Sheikh Mohammad Abdullah', 'Harchand Singh Longowal'],
  sol: 'Laldenga led the Mizo National Front. Phizo led the Naga National Council, Abdullah the National Conference in Kashmir, and Longowal the Akali Dal.',
}));
Q('m_mizo_accord', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'What did the Mizoram Peace Accord of 1986 achieve?',
  opts: [
    'The Mizo National Front gave up the armed struggle, Laldenga became Chief Minister, and Mizoram became a state in 1987',
    'Mizoram became an independent country',
    'Mizoram was merged with Assam',
    'Elections in Mizoram were suspended',
  ],
  sol: 'Under the 1986 accord the armed struggle ended, Laldenga became Chief Minister, and Mizoram became a full state in 1987. It is often cited as one of the most successful peace accords in India.',
}));
Q('m_naga', mcq({
  t: 3, d: 3, c: 'understanding',
  stem: 'Which statement about the Naga movement is correct?',
  opts: [
    'A section of Naga leaders demanded independence soon after 1947; Nagaland became a state in 1963, but some groups continued their struggle and later entered ceasefires and talks',
    'The Naga movement ended completely in 1947',
    'The Naga leaders asked to be merged with Punjab',
    'Nagaland became a state only in 2000',
  ],
  sol: 'Naga leaders under the Naga National Council declared independence in 1951; Nagaland became a state in 1963, but some armed groups continued, and later phases saw ceasefires and negotiations. The other options are factually wrong.',
}));
Q('m_assam_movement', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: 'Which statement best distinguishes the Assam Movement of 1979–85 from the Mizo movement led by the Mizo National Front?',
  opts: [
    'The Assam Movement opposed migrants it saw as outsiders and did not seek independence, while the Mizo National Front fought for independence until the 1986 accord',
    'Both movements demanded that their regions become independent countries',
    'The Assam Movement fought an armed war for independence, while the Mizo movement only opposed migration',
    'Neither movement ended in an accord with the Union government',
  ],
  sol: 'The Assam Movement, led by the All Assam Students\' Union, demanded the detection and removal of migrants it regarded as illegal outsiders and ended in the Assam Accord of 1985; it did not seek separation. The MNF waged an armed campaign for independence from 1966 until the 1986 accord.',
}));
Q('m_assam_accord', mcq({
  t: 3, d: 2, c: 'recall',
  stem: 'After the Assam Accord of 1985, leaders of the Assam Movement formed a party that won the state elections that year. The party was the',
  opts: ['Asom Gana Parishad', 'Mizo National Front', 'National Conference', 'Shiromani Akali Dal'],
  sol: 'The movement\'s leaders formed the Asom Gana Parishad (AGP), which won the 1985 assembly election. The other parties belong to Mizoram, Jammu and Kashmir and Punjab.',
}));
Q('m_imagined_council', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'In an imagined district, a tribal community that is a minority in its state asks for control over its land, forests and local schools, but not for a separate state. Which arrangement used in parts of the North-East fits this demand best?',
  opts: [
    'An autonomous district council with powers over local matters',
    'Creating a new country',
    'Merging the district with a neighbouring country',
    'Placing the district under permanent President\'s rule',
  ],
  sol: 'Autonomous councils (for example under the Sixth Schedule) give communities control over local matters such as land and customs without creating a new state. The other options are not ways of accommodating such a demand.',
}));
Q('m_outsiders_concern', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: 'Which concern lay behind movements against "outsiders" in parts of the North-East?',
  opts: [
    'Fear among local communities that large-scale migration would turn them into a minority and take away land and jobs',
    'A wish to stop all trade with the rest of India',
    'A demand to make the region a Union Territory',
    'Opposition to the holding of elections',
  ],
  sol: 'Movements such as the Assam Movement grew from the fear that migration would change the population balance and reduce local people\'s access to land, jobs and political power. They did not oppose elections or trade.',
}));
Q('ar_mizo', ar({
  t: 3, d: 3, c: 'analysis', key: 'a',
  a: 'Mizoram is often described as a successful example of a peace accord.',
  r: 'Under the 1986 accord, the leader of the armed movement joined electoral politics and became Chief Minister, and the state has been largely peaceful since then.',
  sol: 'Both are true, and R explains A: the accord turned an armed movement into a party in electoral politics, which is why it is cited as a success.',
}));
Q('ar_assam_secession', ar({
  t: 3, d: 2, c: 'analysis', key: 'c',
  a: 'The Assam Movement of 1979–85 ended with an accord with the Union government.',
  r: 'The Assam Movement demanded that Assam should become an independent country.',
  sol: 'A is true: the movement ended with the Assam Accord of 1985. R is false: the movement did not demand independence; its main issue was migration of people it saw as outsiders.',
}));
Q('tf_sikkim', tf({
  t: 3, d: 2, c: 'recall', ans: true,
  stem: 'True or false? Sikkim became a part of India in 1975.',
  sol: 'Sikkim became the twenty-second state of India in 1975; it is now considered part of the North-Eastern region.',
}));
Q('tf_mizoram_2000', tf({
  t: 3, d: 2, c: 'recall', ans: false,
  stem: 'True or false? Mizoram became a full state of India in the year 2000.',
  sol: 'Mizoram became a full state in 1987, after the Mizoram Peace Accord of 1986. The states created in 2000 were Chhattisgarh, Uttarakhand and Jharkhand.',
}));
Q('mt_ne_leaders', match({
  t: 3, d: 2, c: 'understanding',
  stem: 'Match each North-Eastern movement or party with the leader or body associated with it.',
  pairs: [
    ['Mizo National Front', 'Laldenga'],
    ['Naga National Council', 'Angami Zapu Phizo'],
    ['Assam Movement', 'All Assam Students\' Union'],
    ['Asom Gana Parishad government of 1985', 'Prafulla Kumar Mahanta'],
  ],
  sol: 'Laldenga led the MNF; Phizo the Naga National Council; the AASU led the Assam Movement; Mahanta became Chief Minister when the AGP won in 1985.',
}));
Q('s_ne_issues', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Name the three kinds of issues that dominated the politics of the North-East after independence.',
  model: '1. Demands for **autonomy**, leading to new states and **autonomous councils**.\n2. **Secessionist** movements, as among sections of the Mizos and Nagas, and 3. movements **against people seen as outsiders**, such as the Assam Movement.',
  sol: 'Autonomy, secession, opposition to outsiders.',
  scheme: [['Any two of the three issues', 1], ['The third issue', 1]],
}));
Q('s_mizo_accord', short({
  t: 3, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: 'Give two reasons why the Mizoram Peace Accord of 1986 proved more lasting than many other accords.',
  model: '1. The **armed movement itself accepted** the accord: the MNF gave up arms and **Laldenga became Chief Minister**, so there was no strong group left to reject it.\n2. The accord met the **core demand for self-government** through **full statehood in 1987** with protection of Mizo customs, so the grievance behind the revolt was addressed.',
  sol: 'Two reasons: acceptance by the armed group, and the core demand met.',
  scheme: [['Acceptance by the MNF and its leader', 1], ['Core demand met through statehood', 1]],
}));
Q('s3_assam', short({
  t: 3, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Explain the causes and the outcome of the Assam Movement of 1979–85.',
  model: '1. **Cause:** many local people feared that **migration**, especially of people believed to have come from Bangladesh without documents, would make them a **minority** and take away land and jobs.\n2. **Cause:** there was also resentment that the state\'s **resources such as oil and tea** were not bringing enough local development.\n3. **Outcome:** after six years of agitation, the **Assam Accord (1985)** was signed; the movement\'s leaders formed the **AGP**, which won the state election, though the migration issue remained debated.',
  sol: 'Two causes and one outcome.',
  scheme: [['Migration concern', 1], ['Development concern', 1], ['Accord and AGP government', 1]],
}));
Q('l_northeast', long({
  t: 3, d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: 'Explain, with examples, how demands for autonomy, secessionist movements and movements against outsiders shaped the politics of the North-East.',
  model: '1. **Background:** the region was **isolated** after Partition, linked by a narrow corridor, and is very **diverse**.\n2. **Autonomy:** non-Assamese communities resisted the imposition of Assamese; **Nagaland (1963), Meghalaya, Manipur and Tripura (1972)** and **Mizoram and Arunachal (1987)** became states, and **autonomous councils** were set up.\n3. **Secession:** the **Mizo National Front** under Laldenga fought for independence from 1966 and signed the **1986 accord**; a section of **Naga** groups also sought independence.\n4. **Outsiders:** the **Assam Movement (1979–85)** opposed migrants seen as outsiders and ended in the **Assam Accord**.\n5. **Conclusion:** most demands were accommodated through **new states, councils and accords**.',
  sol: 'Background, then one point on each issue with examples, then a conclusion.',
  scheme: [['Background', 1], ['Autonomy with examples', 1], ['Secession with examples', 1], ['Movement against outsiders', 1], ['Conclusion', 1]],
}));

// ================================================================ t04 Accommodation and national integration
Q('m_lesson_democracy', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'Which lesson do most scholars draw from India\'s experience of regional movements?',
  opts: [
    'Regional aspirations are part of democratic politics and are best handled through dialogue rather than suppression',
    'Regional demands should never be discussed in Parliament',
    'Only military means can deal with regional demands',
    'The country should have only one level of government',
  ],
  sol: 'The experience of Punjab, Mizoram and Assam shows that negotiation and democratic accommodation work better than suppression, and that regional voices are a normal part of a democracy.',
}));
Q('m_power_sharing', mcq({
  t: 4, d: 3, c: 'application',
  stem: 'An imagined state is dominated by its largest region, and a smaller region complains that its voice is never heard in decisions. Which lesson from the chapter applies most directly?',
  opts: [
    'Power-sharing: smaller regions must get a real share in decision-making',
    'Regional imbalance should be ignored if the state is growing',
    'The smaller region should be given no representation',
    'All decisions should be taken only by the courts',
  ],
  sol: 'A key lesson is that regional groups need a real share in power, both within the nation and within states. Ignoring or excluding them tends to produce alienation.',
}));
Q('m_imbalance', mcq({
  t: 4, d: 3, c: 'analysis',
  stem: 'Why can regional economic imbalance become a political issue in a democracy?',
  opts: [
    'Backward regions may feel neglected and demand special attention or a fairer share of resources',
    'Imbalance always ends regional demands',
    'Rich regions cannot vote',
    'Imbalance is controlled only by foreign governments',
  ],
  sol: 'If some regions develop faster than others, people in the poorer regions may feel discriminated against; this feeling can fuel regional movements unless addressed through policy.',
}));
Q('m_flexible', mcq({
  t: 4, d: 3, c: 'analysis',
  stem: 'Which feature of the Indian Constitution has helped to accommodate regional diversity?',
  opts: [
    'Its flexibility, including special provisions for some states and autonomous councils for tribal areas',
    'A rule that no new state can ever be created',
    'A ban on regional political parties',
    'A single official language for every state government',
  ],
  sol: 'Provisions such as the Sixth Schedule and special provisions for some states, and Parliament\'s power to form new states, give the Constitution the flexibility to meet regional demands. The other options are not features of the Constitution.',
}));
Q('ar_dialogue', ar({
  t: 4, d: 3, c: 'analysis', key: 'a',
  a: 'Accords such as those signed in Punjab, Assam and Mizoram show the value of negotiation in handling regional movements.',
  r: 'Through these accords, groups that had been in conflict with the government were brought into regular democratic politics.',
  sol: 'Both are true, and R explains A: each accord helped bring a movement into electoral politics, which shows why negotiation is valuable.',
}));
Q('tf_regional_parties', tf({
  t: 4, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? Regional parties have often taken part in governments at the Centre, which shows that regional voices are a part of national politics.',
  sol: 'Many regional parties have been partners in coalition governments at the Centre, so regional concerns are represented in national decision-making.',
}));
Q('ord_events', ord({
  t: [2, 3], d: 3, c: 'understanding', marks: 1,
  stem: 'Arrange these events in chronological order, from the earliest to the latest.',
  items: ['Nagaland becomes a state', 'Anandpur Sahib Resolution', 'Operation Blue Star', 'Mizoram Peace Accord'],
  sol: 'Nagaland became a state in 1963, the Anandpur Sahib Resolution was passed in 1973, Operation Blue Star took place in 1984, and the Mizoram Peace Accord was signed in 1986.',
}));
Q('ord_accords', ord({
  t: [2, 3], d: 3, c: 'understanding', marks: 1,
  stem: 'Put these milestones of the 1980s and 1990s in the order in which they happened.',
  items: ['Assam Movement begins', 'Punjab Accord signed', 'Insurgency begins in the Kashmir valley', 'Elections held in Punjab after a long break'],
  sol: 'The Assam Movement began in 1979, the Punjab Accord was signed in 1985, insurgency began in the Kashmir valley in 1989, and elections were held in Punjab in 1992.',
}));
Q('mt_accords', match({
  t: [2, 3], d: 2, c: 'understanding',
  stem: 'Match each accord or resolution with the region and year it belongs to.',
  pairs: [
    ['Anandpur Sahib Resolution', 'Punjab, 1973'],
    ['Rajiv Gandhi–Longowal Accord', 'Punjab, 1985'],
    ['Assam Accord', 'Assam, 1985'],
    ['Mizoram Peace Accord', 'Mizoram, 1986'],
  ],
  sol: 'The Anandpur Sahib Resolution was passed in Punjab in 1973; the Punjab and Assam Accords were both signed in 1985; the Mizoram Peace Accord was signed in 1986.',
}));
Q('s_lessons', short({
  t: 4, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'People in the hill districts of an imagined state protest that the plains region takes all the decisions and gets most of the new roads and colleges. Using two lessons from India\'s experience of regional movements, suggest how the state government should respond.',
  model: '1. **Talk, do not suppress:** open **dialogue** with the protesters\' representatives, since such demands are a **normal part of democracy**.\n2. **Share power and resources:** give the hill districts a **real voice**, for example through a development council, and correct the **imbalance** in roads and colleges.',
  sol: 'Two lessons applied to the scenario.',
  scheme: [['Dialogue instead of suppression', 1], ['Power-sharing or correcting imbalance', 1]],
}));
Q('s_flexible', short({
  t: 4, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'Give two examples of how the Indian Constitution\'s flexibility has helped to meet regional demands.',
  model: '1. Parliament can **create new states** or change boundaries, as it did for **Nagaland, Mizoram and other states**.\n2. The **Sixth Schedule** and **special provisions** for some states allow **autonomous councils** and protection of local customs and land.',
  sol: 'Two concrete constitutional mechanisms.',
  scheme: [['New states by Parliament', 1], ['Special provisions or autonomous councils', 1]],
}));
Q('s3_integration', short({
  t: 4, d: 3, c: 'evaluation', marks: 3, wl: S3,
  stem: '"Regional aspirations are not a threat to national unity; ignoring them is." Do you agree? Give three reasons for your answer.',
  model: 'Yes, largely.\n1. Demands raised through **democratic means** (elections, negotiation) strengthen people\'s **trust in the system**, as in Tamil Nadu.\n2. Where demands were **ignored or delayed**, **alienation** and in some cases **violence** grew, as the experience of the 1980s shows.\n3. **Accommodation** through new states, councils and accords has kept regions **within the Union** and brought movements into electoral politics, as in Mizoram.',
  sol: 'A view with three reasons drawn from the chapter\'s cases.',
  scheme: [['First reason with example', 1], ['Second reason with example', 1], ['Third reason with example', 1]],
}));
Q('l_lessons', long({
  t: 4, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: 'Discuss the main lessons that the experience of regional movements in India offers for building national unity in a diverse democracy.',
  model: '1. **Regional aspirations are normal:** in a diverse country, regions will have **distinct identities and demands**; voicing them is part of democracy, not anti-national.\n2. **Dialogue over force:** accords in **Punjab, Assam and Mizoram** show that **negotiation** brings movements into electoral politics.\n3. **Power-sharing:** regions and smaller groups need a **real share in decision-making**, both at the Centre and within states.\n4. **Balanced development:** **economic imbalance** can make backward regions feel neglected, so their concerns need attention.\n5. **Flexible arrangements:** **new states, the Sixth Schedule and special provisions** show that the Constitution can adapt; unity is built through **accommodation**, not uniformity.',
  sol: 'Five lessons, each with a brief explanation or example.',
  scheme: [['Aspirations are normal', 1], ['Dialogue over force with example', 1], ['Power-sharing', 1], ['Balanced development', 1], ['Flexibility of the Constitution', 1]],
}));
Q('l_compare', long({
  t: [2, 3, 4], d: 4, c: 'analysis', marks: 5, wl: L5,
  stem: 'Compare the course of the movements in Punjab and Mizoram. Why did one end in an early, lasting settlement while the other saw violence continue after the accord?',
  model: '1. **Punjab:** began with demands for **autonomy** (1973); later a section turned to **militancy**, followed by **Operation Blue Star (1984)**.\n2. **Mizoram:** the MNF under **Laldenga** fought an **armed campaign for independence** from 1966.\n3. **Accords:** both ended in accords: **Punjab (1985)** and **Mizoram (1986)**.\n4. **Mizoram:** the movement\'s leader **joined electoral politics as Chief Minister**, so the accord had the backing of the armed group and peace held.\n5. **Punjab:** **Longowal was assassinated in 1985** and militant groups rejected the accord, so violence continued until **elections in 1992**; the lesson is that accords last when the main actors accept them.',
  sol: 'Course of each movement, then reasons for different outcomes.',
  scheme: [['Course in Punjab', 1], ['Course in Mizoram', 1], ['Both accords', 1], ['Why Mizoram\'s held', 1], ['Why Punjab\'s violence continued', 1]],
}));

// ================================================================ source-based
Q('sb_teacher_srinagar', source({
  t: 2, d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the source from the imagined notebook of a schoolteacher in Srinagar in 1990 and answer the questions that follow. ${IMAG}`,
  passage: '**From a schoolteacher\'s notebook, Srinagar (imagined), 1990**\n\nHalf my senior class has stopped coming. Some families have left the valley; others keep their sons at home. My neighbour says that since the election three years ago, many young men believe that their votes do not count. Every group in the bazaar seems to want something different: one says Kashmir should be a country of its own, another speaks of Pakistan, and an old tailor says all he wants is that the state should run its own affairs within India, as it once did. I keep the school open for those who still come.',
  parts: [
    child('a', short({ t: 2, d: 2, c: 'understanding', marks: 1, stem: 'From around which year did armed insurgency take hold in the Kashmir valley, as this notebook suggests?', model: 'From around **1989**.', sol: 'The notebook is from 1990, soon after insurgency spread in 1989.', scheme: [['1989', 1]] })),
    child('b', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Quote the line that shows resentment about the conduct of an election.', model: '"Since the election three years ago, **many young men believe that their votes do not count**."', sol: 'The line refers to the 1987 election and the feeling it left.', scheme: [['Correct line', 1]] })),
    child('c', short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Using the source, explain the different strands of separatist politics in Kashmir.', model: '(1) Some groups wanted a **separate Kashmiri nation**, and some wanted **merger with Pakistan**. (2) Others, like the tailor, wanted **greater autonomy** for the people of the state **within India**.', sol: 'Two strands, with the source line for each.', scheme: [['Separate nation or merger', 1], ['Autonomy within India', 1]] }), [
      short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): What effects of the insurgency on ordinary life does the source show? Give two.', model: '(1) **Education was disrupted**: half the class stopped coming. (2) **Families were displaced** or lived in fear, as some left the valley and others kept their sons at home.', sol: 'Two effects from the source.', scheme: [['First effect', 1], ['Second effect', 1]] }),
    ]),
  ],
}));
Q('sb_ludhiana_report', source({
  t: 2, d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the imagined newspaper report from Ludhiana in July 1985 and answer the questions that follow. ${IMAG}`,
  passage: '**"Hope returns to the mandi" — imagined newspaper report, Ludhiana, July 1985**\n\nTraders at the grain market said this week that they were cautiously hopeful. The agreement signed in Delhi between the Prime Minister and the President of the Akali Dal has promised that Chandigarh will go to Punjab, that a tribunal will look at the sharing of river waters, and that families who suffered in the violence will be helped. "Last year was the darkest of our lives," said one farmer, who did not wish to be named. Others warned that some armed groups had already rejected the agreement.',
  parts: [
    child('a', short({ t: 2, d: 2, c: 'understanding', marks: 1, stem: 'Name the agreement described in the report.', model: 'The **Punjab Accord** (Rajiv Gandhi–Longowal Accord), 1985.', sol: 'An agreement between the Prime Minister and the Akali Dal President in July 1985.', scheme: [['Punjab Accord', 1]] })),
    child('b', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Quote one provision of the agreement mentioned in the report.', model: '"**Chandigarh will go to Punjab**" (or the tribunal on river waters, or help to families).', sol: 'Any one provision quoted.', scheme: [['One provision quoted', 1]] })),
    child('c', short({ t: 2, d: 4, c: 'evaluation', marks: 2, stem: '**Either** (i): Why does the report say "some armed groups had already rejected the agreement"? What did this mean for Punjab in the following years?', model: '(1) The militant groups did not accept a settlement **within the democratic framework**, so the accord lacked their support. (2) As a result, **violence continued** for several years, and **elections were held only in 1992**.', sol: 'Reason for rejection and its consequence.', scheme: [['Reason', 1], ['Consequence with date', 1]] }), [
      short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Which events of the previous year might the farmer mean by "the darkest of our lives"? Name two.', model: '(1) **Operation Blue Star** at the Golden Temple in **June 1984**. (2) The **assassination of Indira Gandhi** in October 1984 and the **violence against Sikhs** that followed.', sol: 'Two events of 1984.', scheme: [['First event', 1], ['Second event', 1]] }),
    ]),
  ],
}));
Q('sb_aizawl_letter', source({
  t: 3, d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the imagined letter from a young man in Aizawl to his sister in 1987 and answer the questions that follow. ${IMAG}`,
  passage: '**Letter from Aizawl (imagined), 1987**\n\nDear sister, you will not believe it, but today the man who led the long fight in the jungles was sworn in as our Chief Minister. Uncle, who had been in the underground for many years, laughed and said he would now campaign for votes instead of carrying a gun. Our land is a full state now, with its own assembly. People still remember the famine years and the hard times after, but the market is busy again and schools are open every day.',
  parts: [
    child('a', short({ t: 3, d: 1, c: 'recall', marks: 1, stem: 'Who is "the man who led the long fight" and became Chief Minister?', model: '**Laldenga**, leader of the Mizo National Front.', sol: 'The MNF leader who became Chief Minister after the 1986 accord.', scheme: [['Laldenga', 1]] })),
    child('b', short({ t: 3, d: 2, c: 'application', marks: 1, stem: 'Quote the line that shows the movement moving from armed struggle to electoral politics.', model: '"He would now **campaign for votes instead of carrying a gun**."', sol: 'The uncle\'s remark shows the shift to elections.', scheme: [['Correct line', 1]] })),
    child('c', short({ t: 3, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Why is the Mizoram settlement often called a successful accord? Give two reasons, using the letter.', model: '(1) The armed group **accepted the accord** and its leader **joined electoral politics** as Chief Minister. (2) Mizoram got **full statehood** and **normal life returned**: busy markets and open schools.', sol: 'Two reasons from the letter.', scheme: [['Armed group joins politics', 1], ['Statehood and return of normal life', 1]] }), [
      short({ t: 3, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): What earlier grievances, hinted at in the letter, had fed the Mizo movement? Give two.', model: '(1) The **famine** of the late 1950s, which many Mizos felt was **not handled well** by the government of Assam. (2) A feeling of being **neglected and separate** within Assam, which led to demands for their own unit.', sol: 'Two grievances.', scheme: [['Famine handling', 1], ['Neglect within Assam', 1]] }),
    ]),
  ],
}));
Q('sb_guwahati_diary', source({
  t: 3, d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the source from the imagined diary of a college student in Guwahati in 1985 and answer the questions that follow. ${IMAG}`,
  passage: '**From a college student\'s diary, Guwahati (imagined), August 1985**\n\nSix years of meetings, marches and closed colleges, and now an agreement has been signed in Delhi. Our student leaders say they will form a party and fight the elections. My father worries that the question of who came from across the border, and when, will not be easy to settle. My friend from the hills says her people also want their own voice and do not wish to be spoken for by the plains. Still, tonight the streets are full of people singing.',
  parts: [
    child('a', short({ t: 3, d: 2, c: 'understanding', marks: 1, stem: 'Name the agreement signed in 1985 that the diary refers to.', model: 'The **Assam Accord** (1985).', sol: 'The agreement ending the six-year movement in Assam.', scheme: [['Assam Accord', 1]] })),
    child('b', short({ t: 3, d: 2, c: 'application', marks: 1, stem: 'Which party did the student leaders form, as the diary suggests?', model: 'The **Asom Gana Parishad (AGP)**, which won the 1985 election.', sol: 'The party formed by the movement\'s leaders.', scheme: [['AGP', 1]] })),
    child('c', short({ t: 3, d: 4, c: 'evaluation', marks: 2, stem: '**Either** (i): What does the remark of the friend "from the hills" tell us about the diversity of the North-East? Explain in two points.', model: '(1) The region is **not one community**: hill groups have identities **different from the plains**. (2) Hill communities wanted **their own political voice**, which is why new states and **autonomous councils** were created.', sol: 'Two points on diversity and its political effect.', scheme: [['Diversity within the region', 1], ['Demand for own voice and response', 1]] }), [
      short({ t: 3, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Why does the father think the migration question "will not be easy to settle"? Give two reasons.', model: '(1) It is hard to **identify** who came when, especially for people without **documents**. (2) The issue touches **land, jobs and citizenship**, so any decision affects many families and remains **politically sensitive**.', sol: 'Two reasons.', scheme: [['Difficulty of identification', 1], ['Sensitivity of the issue', 1]] }),
    ]),
  ],
}));
Q('sb_seminar_notes', source({
  t: [1, 4], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the imagined notes taken by a student at a college seminar on federalism in 2010 and answer the questions that follow. ${IMAG}`,
  passage: '**Seminar notes on "Regions and the Nation" (imagined), 2010**\n\nThe speaker began by saying that India has never asked its people to give up their languages or cultures to be Indian. She listed the cases where demands turned violent, but also the many demands met quietly: new states, councils for hill and tribal areas, and the use of regional languages in state governments. Her main point was that the problems grew worst where demands were ignored for too long or where elections were not seen as fair. She ended with a question: is a country stronger when it listens to its regions?',
  parts: [
    child('a', short({ t: 1, d: 2, c: 'understanding', marks: 1, stem: 'According to the speaker, what has India not asked its people to give up?', model: 'Their **languages or cultures**.', sol: 'Read the first sentence of the notes.', scheme: [['Languages or cultures', 1]] })),
    child('b', short({ t: 4, d: 2, c: 'application', marks: 1, stem: 'Quote two ways of accommodating regions mentioned in the notes.', model: '"**New states**" and "**councils for hill and tribal areas**" (also: use of regional languages).', sol: 'Any two named in the passage.', scheme: [['Two ways quoted', 1]] })),
    child('c', short({ t: 4, d: 4, c: 'evaluation', marks: 2, stem: '**Either** (i): Answer the speaker\'s final question, giving two reasons from the history of regional movements in India.', model: '(1) **Yes**: where demands were met through **negotiation**, as in **Mizoram**, movements joined democratic politics and peace lasted. (2) Where demands were **ignored** or elections seemed unfair, **alienation and violence** grew, as in the 1980s.', sol: 'A view with two reasons from cases.', scheme: [['Reason with example', 1], ['Second reason with example', 1]] }), [
      short({ t: 4, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Which two conditions does the speaker link with the worst problems? Explain one of them with an example.', model: '(1) Demands **ignored for too long**, and (2) elections **not seen as fair**. For example, resentment over the **1987 election** in Jammu and Kashmir is often linked to the insurgency from 1989.', sol: 'Two conditions and one example.', scheme: [['Both conditions', 1], ['Example', 1]] }),
    ]),
  ],
}));
