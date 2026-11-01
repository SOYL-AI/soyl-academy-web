// ICSE 10 History & Civics, ch08 Growth of Nationalism and the Indian National Congress — question bank.
// Every scenario, letter, diary and newspaper item is imagined and written by SOYL and labelled as imagined; no
// textbook text, box or exercise and no specimen or board-paper item is reused (D-036). No speech or writing of any
// historical person is quoted: ideas are paraphrased and attributed. Facts are stable, widely taught dates and names,
// listed for review in the README.
import assert from 'node:assert/strict';
import { Q, mcq, ar, tf, fb, match, ord, short, long, source, child, Svg } from '../../icse-10-history-civics-ch01/src/lib.mjs';

const S2 = [25, 45];
const S3 = [40, 70];
const L10 = [120, 220];
const IMAG = '*(Imagined document written by SOYL for practice; the people in it are not real.)*';

// ---------------------------------------------------------------- dates used in items (asserted in order)
export const EVENTS = [
  [1828, 'Brahmo Samaj'],
  [1873, 'Satyashodhak Samaj'],
  [1875, 'Arya Samaj'],
  [1877, 'Delhi Durbar'],
  [1878, 'Vernacular Press Act'],
  [1883, 'Ilbert Bill'],
  [1885, 'Indian National Congress'],
  [1893, 'Chicago address'],
  [1897, 'Ramakrishna Mission'],
];
for (let i = 1; i < EVENTS.length; i++) assert.ok(EVENTS[i][0] > EVENTS[i - 1][0], 'events in date order');
export const INC_FOUNDED = 1885;
export const FIRST_DELEGATES = 72;
export const yearsBetween = (a, b) => b - a;
assert.equal(yearsBetween(1828, 1885), 57);
assert.equal(yearsBetween(1878, 1882), 4); // Vernacular Press Act to its repeal

/** A horizontal timeline from 1825 to 1900 with labels in alternating lanes (theme colours only). */
export function timelineSvg(alt, caption, events = EVENTS) {
  const W = 760, H = 250, x0 = 40, x1 = 720, y = 125, a = 1825, b = 1900;
  const X = (yr) => x0 + ((yr - a) / (b - a)) * (x1 - x0);
  const s = new Svg(W, H);
  s.line(x0, y, x1, y, { sw: 2 });
  for (const yr of [1825, 1850, 1875, 1900]) {
    s.line(X(yr), y - 5, X(yr), y + 5, { sw: 1.2, color: 'muted' });
    s.text(X(yr), y + (yr === 1875 ? 112 : 20), String(yr), { size: 11, muted: true });
  }
  const lanes = [-30, 34, -62, 66, -94, 98];
  events.forEach(([yr, label], i) => {
    const dy = lanes[i % lanes.length];
    const px = X(yr);
    s.line(px, y, px, y + dy + (dy < 0 ? 8 : -8), { sw: 1, color: 'muted' });
    s.dot(px, y, 4, i % 2 ? 'blue' : 'accent');
    s.text(px, y + dy, `${yr} ${label}`, { size: 11, color: i % 2 ? 'blue' : 'accent' });
  });
  return s.visual(alt, caption);
}

/** Factors behind nationalism as a hub diagram. */
export function factorsSvg(alt, caption) {
  const s = new Svg(700, 300);
  s.rect(255, 120, 190, 56, { rx: 10, fill: 'accent', fillOpacity: 0.25, color: 'accent', sw: 2 });
  s.text(350, 142, 'Rise of Indian', { size: 13, bold: true });
  s.text(350, 162, 'nationalism', { size: 13, bold: true });
  const boxes = [
    ['Economic exploitation', 'Drain, ruined crafts, revenue', 20, 20],
    ['Repressive policies', 'Lytton, Press Act, Arms Act', 480, 20],
    ['Reform movements', 'Self-respect and unity', 20, 225],
    ['The Press', 'Ideas reached many readers', 480, 225],
  ];
  boxes.forEach(([t1, t2, x, yy]) => {
    s.rect(x, yy, 200, 56, { rx: 8, fill: 'blue', fillOpacity: 0.15, color: 'blue', sw: 1.4 });
    s.text(x + 100, yy + 20, t1, { size: 13, bold: true });
    s.text(x + 100, yy + 40, t2, { size: 11 });
    s.line(x + 100, yy < 100 ? yy + 58 : yy - 2, 350, yy < 100 ? 118 : 178, { sw: 1.3, color: 'muted' });
  });
  return s.visual(alt, caption);
}

// ================================================================ t01 Economic exploitation and repressive policies
Q('m_drain_meaning', mcq({
  t: 1, d: 1, c: 'understanding',
  stem: 'Indian nationalists of the late nineteenth century used the phrase "drain of wealth". What did it describe?',
  opts: [
    'The transfer of India\'s wealth to Britain without an equal return to India',
    'The loss of water from canals in dry seasons',
    'The movement of Indian traders to other Asian ports',
    'The money spent by Indian princes on festivals',
  ],
  sol: 'The drain meant wealth leaving India for Britain (salaries and pensions of British officials, interest on loans, profits of British firms, home charges) with no matching return. The other options describe unrelated things.',
}));
Q('m_drain_naoroji', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Which early nationalist is best known for building the economic argument that British rule was draining India of its wealth?',
  opts: ['Dadabhai Naoroji', 'Swami Vivekananda', 'Jyotiba Phule', 'A. O. Hume'],
  sol: 'Dadabhai Naoroji set out the drain argument in his writings, including the book Poverty and Un-British Rule in India. Vivekananda and Phule were reformers; Hume was the founder of the Congress.',
}));
Q('m_drain_item', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'An imagined British officer retires after thirty years in India and draws his pension in England from Indian revenues. How would an early nationalist classify this payment?',
  opts: [
    'As part of the drain of wealth from India to Britain',
    'As an investment that increased India\'s income',
    'As a payment made by Britain to India',
    'As a tax paid by the officer to India',
  ],
  sol: 'Pensions and salaries of British officials paid from Indian revenues and spent in Britain were among the items nationalists counted in the drain. They did not raise India\'s income, and they flowed from India to Britain, not the reverse.',
}));
Q('m_crafts', mcq({
  t: 1, d: 2, c: 'analysis',
  stem: 'Why did many Indian handloom weavers lose their livelihood in the nineteenth century?',
  opts: [
    'Cheap machine-made cloth from British factories flooded Indian markets',
    'The government banned the growing of cotton in India',
    'Indian weavers were all recruited into the army',
    'Demand for cloth disappeared completely in India',
  ],
  sol: 'Machine-made British textiles entered India cheaply while Indian goods faced high duties in Britain, so handicrafts declined. Cotton growing was not banned, weavers were not all drafted, and demand for cloth remained.',
}));
Q('m_revenue', mcq({
  t: 1, d: 2, c: 'analysis',
  stem: 'How did the high land-revenue demand of the colonial government add to discontent among peasants?',
  opts: [
    'Peasants had to pay heavy revenue even in bad years and often fell into debt to moneylenders',
    'Peasants received free land from the government every year',
    'Land revenue was abolished, so landlords lost their income',
    'Revenue was collected only from merchants, not from farmers',
  ],
  sol: 'Heavy and rigid revenue demands pushed peasants into debt and loss of land, which bred resentment. Land was not given free, revenue was not abolished, and it fell mainly on the land.',
}));
Q('m_famine', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'A group of imagined students compares government spending on a grand imperial assembly with relief during the famine of 1876–78. Which nationalist feeling would this comparison most likely have strengthened?',
  opts: [
    'That the government cared more about display than about the suffering of Indians',
    'That famines were caused by the Indian National Congress',
    'That the British government had ended all famines in India',
    'That Indian princes alone were responsible for relief',
  ],
  sol: 'Holding the Delhi Durbar of 1877 while famine raged was widely seen as indifference to Indian suffering, which nationalists used to criticise British rule. The other options are false or irrelevant.',
}));
Q('m_durbar', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'The grand Delhi Durbar of 1877, held while a famine was raging, was organised under which Viceroy?',
  opts: ['Lord Lytton', 'Lord Ripon', 'Lord Curzon', 'Lord Dalhousie'],
  sol: 'Lord Lytton (Viceroy 1876–80) held the Durbar of 1877 to proclaim Queen Victoria Empress of India. Ripon came after him, Curzon later, and Dalhousie before 1857.',
}));
Q('m_vpa', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Which statement correctly describes the Vernacular Press Act of 1878?',
  opts: [
    'It allowed the government to curb newspapers published in Indian languages, but not English ones',
    'It gave all newspapers in India complete freedom',
    'It applied only to English-language newspapers owned by Europeans',
    'It created the first Indian newspaper',
  ],
  sol: 'The Act let the government act against Indian-language (vernacular) newspapers that criticised it, while English-language papers were left out, which Indians saw as discrimination. It did not give freedom or target only European papers.',
}));
Q('m_arms', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Under the Arms Act of 1878, an imagined Indian landowner and an imagined European planter in the same district each want to keep a gun. What does the law require?',
  opts: [
    'The Indian needs a licence, while the European is exempt',
    'Both are exempt from any licence',
    'The European needs a licence, while the Indian is exempt',
    'Neither may ever keep a gun',
  ],
  sol: 'The Arms Act required Indians to obtain a licence to keep arms, but Europeans and certain officials were exempt, so it was resented as racial discrimination.',
}));
Q('m_ilbert_aim', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'What did the Ilbert Bill of 1883 propose?',
  opts: [
    'That Indian judges in the districts could try Europeans in criminal cases',
    'That Europeans could no longer live in India',
    'That all judges in India must be British',
    'That newspapers must be licensed every year',
  ],
  sol: 'Introduced under Lord Ripon, the Bill sought to remove a racial bar so that qualified Indian judges and magistrates could try European offenders. It did not expel Europeans or make all judges British, and it had nothing to do with newspapers.',
}));
Q('m_ilbert_lesson', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: 'Europeans in India organised a strong protest against the Ilbert Bill and the government gave way. Which lesson did educated Indians most likely draw from this?',
  opts: [
    'Organised, united agitation can force the government to change its policy',
    'The government always ignores public protest',
    'Only armed rebellion could change any law',
    'Indians and Europeans were treated equally in law',
  ],
  sol: 'The success of the European agitation showed Indians the power of organised protest and exposed racial inequality, encouraging them to form their own all-India organisation. It disproves the other three statements.',
}));
Q('m_ripon', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'Under which Viceroy was the Vernacular Press Act repealed in 1882?',
  opts: ['Lord Ripon', 'Lord Lytton', 'Lord Canning', 'Lord Minto'],
  sol: `Lord Ripon repealed the Act in 1882, ${yearsBetween(1878, 1882)} years after Lytton had passed it. Canning was Viceroy in 1858 and Minto in the 1900s.`,
}));
Q('ar_vpa_discrimination', ar({
  t: 1, d: 2, c: 'analysis', verdict: 'both-true-explains',
  a: 'Educated Indians regarded the Vernacular Press Act as discriminatory.',
  r: 'The Act targeted newspapers in Indian languages but left English-language newspapers free.',
  sol: 'Both are true, and R explains A: the different treatment of Indian-language and English papers made the Act look racially unfair.',
}));
Q('ar_durbar_famine', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'A-true-R-false',
  a: 'The Delhi Durbar of 1877 angered many Indians.',
  r: 'Lord Lytton himself later repealed the Vernacular Press Act.',
  sol: 'A is true: a costly Durbar held while famine raged angered many Indians. R is false: Lytton passed the Act in 1878; it was Lord Ripon who repealed it in 1882.',
}));
Q('tf_arms_equal', tf({
  t: 1, d: 1, c: 'understanding', ans: false,
  stem: 'True or false? The Arms Act of 1878 applied equally to Indians and Europeans.',
  sol: 'False. Indians needed a licence to keep arms, while Europeans were exempt; the inequality is why the Act was resented.',
}));
Q('fb_lytton', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'The Vernacular Press Act and the Arms Act were both passed in the year ___ under Lord Lytton.',
  acc: [['1878']],
  sol: 'Both Acts were passed in 1878.',
}));
Q('s_drain_two', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Mention two channels through which, according to the early nationalists, wealth was drained from India to Britain.',
  model: '1. **Salaries and pensions** of British officials paid from Indian revenues and remitted to Britain.\n2. **Home charges**, interest on loans and **profits of British firms** sent out of India.',
  sol: 'Any two channels of the drain.',
  scheme: [['First channel', 1], ['Second channel', 1]],
}));
Q('s_crafts_ruin', short({
  t: 1, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'How did the decline of Indian handicrafts help the growth of nationalist feeling?',
  model: 'Artisans such as weavers **lost their livelihood** to cheap **British machine-made goods** and were pushed onto the land. Nationalists pointed to this **economic ruin** as proof that British rule served **British interests**, which turned economic hardship into **political discontent**.',
  sol: 'Link the economic loss to the nationalist argument.',
  scheme: [['Economic loss of artisans', 1], ['How it fed nationalist feeling', 1]],
}));
Q('s_lytton_two', short({
  t: 1, d: 1, c: 'recall', marks: 2, wl: S2,
  stem: 'Name any two measures of Lord Lytton that Indians regarded as repressive or insensitive.',
  model: '1. The **Vernacular Press Act, 1878**, which curbed Indian-language newspapers.\n2. The **Arms Act, 1878**, which required Indians but not Europeans to hold arms licences. (Also: the **Delhi Durbar of 1877** during a famine.)',
  sol: 'Any two of the three.',
  scheme: [['First measure', 1], ['Second measure', 1]],
}));
Q('s_ilbert_effect', short({
  t: 1, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: 'Give two reasons why the Ilbert Bill controversy is seen as a step in the growth of Indian nationalism.',
  model: '1. It exposed the **racial attitude** of many Europeans who refused to be tried by Indian judges.\n2. The **success of the European agitation** taught Indians the value of **organised, all-India protest**.',
  sol: 'Racial inequality exposed; lesson of organised agitation.',
  scheme: [['Racial attitude exposed', 1], ['Lesson of organised agitation', 1]],
}));
Q('s3_economic_three', short({
  t: 1, d: 2, c: 'analysis', marks: 3, wl: S3,
  stem: 'Explain three ways in which British economic policies created discontent among Indians in the nineteenth century.',
  model: '1. **Drain of wealth:** salaries, pensions, interest and profits flowed to Britain without return.\n2. **Ruin of handicrafts:** cheap British machine goods destroyed the livelihood of artisans.\n3. **Heavy land revenue:** peasants fell into **debt** and lost land, and **famines** found the government slow to help.',
  sol: 'Three distinct economic causes, each explained.',
  scheme: [['Drain', 1], ['Ruin of crafts', 1], ['Land revenue or famines', 1]],
}));

// ================================================================ t02 Socio-religious reform movements
Q('m_brahmo', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'Which reformer founded the Brahmo Samaj (as the Brahmo Sabha) in 1828?',
  opts: ['Raja Rammohan Roy', 'Swami Dayananda Saraswati', 'Jyotiba Phule', 'Swami Vivekananda'],
  sol: 'Raja Rammohan Roy started the Brahmo Sabha, later the Brahmo Samaj, in Calcutta in 1828. Dayananda founded the Arya Samaj, Phule the Satyashodhak Samaj and Vivekananda the Ramakrishna Mission.',
}));
Q('m_sati', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Raja Rammohan Roy\'s long campaign helped bring about a regulation of 1829 under Lord William Bentinck. What did it do?',
  opts: ['It declared the practice of sati illegal', 'It made English the only language of courts', 'It set up the first university in India', 'It abolished the caste system by law'],
  sol: 'The 1829 regulation banned sati, the burning of widows, after Roy\'s campaign. The other options are not what the regulation did.',
}));
Q('m_roy_education', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'An imagined young man in Calcutta in the 1820s wants to study mathematics and science alongside Sanskrit. Which reformer of the time would most strongly have supported his wish?',
  opts: ['Raja Rammohan Roy, who favoured modern Western education', 'Lord Lytton, who opposed Indian education', 'A. O. Hume, who wanted only English literature taught', 'No one; modern subjects were unknown in India'],
  sol: 'Roy supported the spread of modern, scientific education along with study of Indian traditions. Lytton and Hume do not fit the 1820s, and modern subjects were already being taught in some institutions.',
}));
Q('m_phule_samaj', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'Jyotiba Phule founded which organisation in 1873 to work for the rights of the lower castes?',
  opts: ['Satyashodhak Samaj', 'Arya Samaj', 'Prarthana Samaj', 'Ramakrishna Mission'],
  sol: 'Phule founded the Satyashodhak Samaj (Society of Seekers of Truth) in 1873. The Arya Samaj was Dayananda\'s, the Prarthana Samaj a Bombay reform society, and the Ramakrishna Mission Vivekananda\'s.',
}));
Q('m_phule_girls', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'In an imagined history project, students list a reformer who opened a school for girls in Pune with the help of his wife and worked against untouchability. Whom are they describing?',
  opts: ['Jyotiba Phule', 'Raja Rammohan Roy', 'Swami Vivekananda', 'Dadabhai Naoroji'],
  sol: 'Jyotiba Phule and Savitribai Phule opened a school for girls in Pune (1848) and worked for the education of girls and lower castes. The others are not linked to this school.',
}));
Q('m_arya', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'In which year did Swami Dayananda Saraswati found the Arya Samaj?',
  opts: ['1875', '1828', '1897', '1885'],
  sol: 'The Arya Samaj was founded in 1875 (in Bombay). 1828 is the Brahmo Samaj, 1897 the Ramakrishna Mission and 1885 the Congress.',
}));
Q('m_vedas', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Swami Dayananda Saraswati urged Hindus to return to an earlier source of authority as a basis for reform. Which source was it?',
  opts: ['The Vedas', 'The Mughal court chronicles', 'British law codes', 'Buddhist monastic rules'],
  sol: 'Dayananda regarded the Vedas as the true source of knowledge and called for a return to them, rejecting later practices such as idol worship and caste by birth. The other sources do not fit his teaching.',
}));
Q('m_vivek_mission', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'Swami Vivekananda founded the Ramakrishna Mission in which year?',
  opts: ['1897', '1893', '1875', '1906'],
  sol: 'The Ramakrishna Mission was founded in 1897. Vivekananda spoke at Chicago in 1893; 1875 is the Arya Samaj and 1906 the Muslim League.',
}));
Q('m_chicago', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'An imagined student writes: "This reformer\'s talks at a world gathering of religions in an American city in 1893 made Indians proud of their heritage." Which reformer and city is the student describing?',
  opts: ['Swami Vivekananda, Chicago', 'Raja Rammohan Roy, London', 'Jyotiba Phule, New York', 'Swami Dayananda, Boston'],
  sol: 'Vivekananda addressed the World\'s Parliament of Religions in Chicago in 1893. Roy died in England in 1833, and Phule and Dayananda did not speak at this gathering.',
}));
Q('m_reform_link', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'How did the socio-religious reform movements contribute to the rise of nationalism?',
  opts: [
    'They restored self-confidence and pride, and weakened divisions that kept Indians apart',
    'They demanded the immediate end of British rule by force',
    'They were founded by the Indian National Congress',
    'They supported the Vernacular Press Act',
  ],
  sol: 'By attacking social evils and reviving pride in Indian traditions, the reformers built self-respect and a sense of unity that nationalism drew on. They were not armed movements, they came before the Congress, and they did not support the Press Act.',
}));
Q('ar_vivek_service', ar({
  t: 2, d: 2, c: 'analysis', verdict: 'both-true-explains',
  a: 'The Ramakrishna Mission ran schools, hospitals and relief work.',
  r: 'Swami Vivekananda taught that serving fellow human beings is a way of serving God.',
  sol: 'Both are true, and R explains A: the Mission\'s social service grew from Vivekananda\'s teaching that service to people is service to God.',
}));
Q('ar_dayananda_caste', ar({
  t: 2, d: 3, c: 'analysis', verdict: 'A-true-R-false',
  a: 'Swami Dayananda Saraswati opposed caste distinctions based on birth.',
  r: 'Swami Dayananda Saraswati founded the Brahmo Samaj.',
  sol: 'A is true: he opposed caste by birth. R is false: he founded the Arya Samaj; the Brahmo Samaj was founded by Raja Rammohan Roy.',
}));
Q('tf_phule_brahmo', tf({
  t: 2, d: 1, c: 'recall', ans: false,
  stem: 'True or false? Jyotiba Phule founded the Brahmo Samaj in Pune.',
  sol: 'False. Phule founded the Satyashodhak Samaj (1873); the Brahmo Samaj was founded by Raja Rammohan Roy in Calcutta (1828).',
}));
Q('fb_satyashodhak', fb({
  t: 2, d: 1, c: 'recall',
  stem: 'Jyotiba Phule founded the ___ Samaj in 1873.',
  acc: [['Satyashodhak', 'Satya Shodhak']],
  sol: 'He founded the Satyashodhak Samaj.',
}));
Q('mt_reformers', match({
  t: 2, d: 2, c: 'understanding', marks: 2,
  stem: 'Match each reformer with the organisation he founded.',
  pairs: [
    ['Raja Rammohan Roy', 'Brahmo Samaj (1828)'],
    ['Jyotiba Phule', 'Satyashodhak Samaj (1873)'],
    ['Swami Dayananda Saraswati', 'Arya Samaj (1875)'],
    ['Swami Vivekananda', 'Ramakrishna Mission (1897)'],
  ],
  sol: 'Roy: Brahmo Samaj; Phule: Satyashodhak Samaj; Dayananda: Arya Samaj; Vivekananda: Ramakrishna Mission.',
}));
Q('ord_reform_years', ord({
  t: [2, 4], d: 2, c: 'understanding', marks: 1,
  stem: 'Put the founding of four reform bodies and of the Indian National Congress into the order of their years.',
  items: ['Brahmo Samaj founded', 'Satyashodhak Samaj founded', 'Arya Samaj founded', 'Indian National Congress founded', 'Ramakrishna Mission founded'],
  sol: '1828, 1873, 1875, 1885, 1897.',
}));
Q('s_roy_two', short({
  t: 2, d: 1, c: 'recall', marks: 2, wl: S2,
  stem: 'State two contributions of Raja Rammohan Roy to Indian society.',
  model: '1. He campaigned against **sati**, which was banned in **1829**.\n2. He founded the **Brahmo Samaj** (1828) and supported **modern education** and the rights of women.',
  sol: 'Any two contributions.',
  scheme: [['First contribution', 1], ['Second contribution', 1]],
}));
Q('s_phule_two', short({
  t: 2, d: 1, c: 'recall', marks: 2, wl: S2,
  stem: 'State two ways in which Jyotiba Phule worked for the uplift of the oppressed.',
  model: '1. With Savitribai Phule, he opened a **school for girls** in Pune and worked for the **education** of girls and lower castes.\n2. He founded the **Satyashodhak Samaj (1873)** to fight **caste discrimination**.',
  sol: 'Education and the Satyashodhak Samaj.',
  scheme: [['Education work', 1], ['Satyashodhak Samaj against caste', 1]],
}));
Q('s_dayananda_two', short({
  t: 2, d: 2, c: 'analysis', marks: 2, wl: S2,
  stem: 'Mention two ideas or activities of Swami Dayananda Saraswati that encouraged national pride.',
  model: '1. He called on Indians to return to the **Vedas**, which gave them pride in their own **ancient heritage**.\n2. The **Arya Samaj** spread **education** (later through the **DAV schools**) and opposed caste by birth and child marriage.',
  sol: 'Any two relevant ideas or activities.',
  scheme: [['First idea or activity', 1], ['Second idea or activity', 1]],
}));
Q('s_vivek_two', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State two contributions of Swami Vivekananda to the awakening of India.',
  model: '1. His address at **Chicago (1893)** won respect for Indian thought abroad and made Indians **proud** of their heritage.\n2. He founded the **Ramakrishna Mission (1897)** for **social service** and urged young Indians to be **fearless and self-reliant**.',
  sol: 'Any two contributions.',
  scheme: [['First contribution', 1], ['Second contribution', 1]],
}));
Q('s3_reform_nation', short({
  t: 2, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Explain three ways in which the socio-religious reform movements prepared the ground for the national movement.',
  model: '1. They attacked **social evils** such as sati, caste discrimination and child marriage, making society more **united**.\n2. They revived **pride** in India\'s past and built **self-confidence** against claims of Western superiority.\n3. They spread **modern education** and a spirit of **enquiry and reason**, producing leaders who later joined the national movement.',
  sol: 'Unity, self-confidence, education.',
  scheme: [['Social unity', 1], ['Pride and self-confidence', 1], ['Education and reason', 1]],
}));

// ================================================================ t03 Role of the Press
Q('m_press_role', mcq({
  t: 3, d: 1, c: 'analysis',
  stem: 'Which was the most important way in which newspapers helped the growth of nationalism in the late nineteenth century?',
  opts: ['They spread political ideas and criticism of government policies to readers across the country', 'They were printed only for British officials', 'They avoided all discussion of public affairs', 'They were banned from reporting any news about India'],
  sol: 'Newspapers carried political news, debates and criticism of government policy to a wide readership, linking people in different regions. The other options are false.',
}));
Q('m_kesari', mcq({
  t: 3, d: 2, c: 'recall',
  stem: 'Kesari, a Marathi newspaper started in 1881, is most closely associated with which nationalist?',
  opts: ['Bal Gangadhar Tilak', 'Surendranath Banerjee', 'W. C. Bonnerjee', 'Raja Rammohan Roy'],
  sol: 'Kesari (Marathi) and Mahratta (English) were associated with Bal Gangadhar Tilak. Surendranath Banerjee ran The Bengalee.',
}));
Q('m_bengalee', mcq({
  t: 3, d: 2, c: 'recall',
  stem: 'The newspaper The Bengalee is associated with which leader?',
  opts: ['Surendranath Banerjee', 'Dadabhai Naoroji', 'Jyotiba Phule', 'Lord Ripon'],
  sol: 'Surendranath Banerjee edited and ran The Bengalee. Naoroji, Phule and Ripon are not linked to it.',
}));
Q('m_amrita', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'An imagined Bengali newspaper switches overnight from Bengali to English in 1878. Which new law would it most likely be trying to escape?',
  opts: ['The Vernacular Press Act', 'The Arms Act', 'The Ilbert Bill', 'The Regulation banning sati'],
  sol: 'The Vernacular Press Act applied to Indian-language papers only, so a paper printed in English fell outside it. Amrita Bazar Patrika is widely reported to have done exactly this in 1878. The other measures did not concern language.',
}));
Q('m_hindu', mcq({
  t: 3, d: 2, c: 'recall',
  stem: 'The Hindu, a nationalist English newspaper founded in 1878, was published from which city?',
  opts: ['Madras', 'Calcutta', 'Lahore', 'Allahabad'],
  sol: 'The Hindu was started in Madras in 1878. Calcutta, Lahore and Allahabad had other papers.',
}));
Q('ar_press_unity', ar({
  t: 3, d: 2, c: 'analysis', verdict: 'both-true-explains',
  a: 'Newspapers helped Indians in different provinces think of common problems.',
  r: 'News and opinion about events in one region were read by people in other regions.',
  sol: 'Both are true, and R explains A: wide circulation of news linked distant regions and built a shared political outlook.',
}));
Q('tf_press_english', tf({
  t: 3, d: 2, c: 'application', ans: true,
  stem: 'True or false? An English-language Indian newspaper in 1879 was outside the scope of the Vernacular Press Act.',
  sol: 'True. The Act covered newspapers in Indian languages, not those in English.',
}));
Q('s_press_two', short({
  t: 3, d: 1, c: 'analysis', marks: 2, wl: S2,
  stem: 'State two ways in which the Indian press contributed to the growth of nationalism.',
  model: '1. It **criticised government policies**, such as the Press Act and racial laws, and exposed injustice.\n2. It spread **political awareness** and carried the ideas of nationalist leaders to people in **many regions**.',
  sol: 'Any two roles.',
  scheme: [['First role', 1], ['Second role', 1]],
}));
Q('s_papers_two', short({
  t: 3, d: 1, c: 'recall', marks: 2, wl: S2,
  stem: 'Name any two nationalist newspapers of the late nineteenth century and the language of each.',
  model: '1. **Kesari**, published in **Marathi** and linked with Bal Gangadhar Tilak.\n2. **The Hindu**, published in **English** from Madras. (Also acceptable: **Amrita Bazar Patrika**, first Bengali and then English; **The Bengalee**, in English.)',
  sol: 'Any two correctly named with language.',
  scheme: [['First newspaper with language', 1], ['Second newspaper with language', 1]],
}));
Q('s3_press_three', short({
  t: 3, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Why did the colonial government see the Indian-language press as a threat? Give three reasons.',
  model: '1. Indian-language papers reached **ordinary readers** in towns and villages, not just the English-educated.\n2. They **criticised** policies such as the Durbar during famine and the Arms Act, building **public anger**.\n3. They created a **shared political opinion** across regions, which could support organised protest.',
  sol: 'Reach, criticism, shared opinion.',
  scheme: [['Wide reach', 1], ['Criticism of policies', 1], ['Shared opinion', 1]],
}));

// ================================================================ t04 Foundation of the Indian National Congress
Q('m_inc_year', mcq({
  t: 4, d: 1, c: 'recall',
  stem: 'In which year was the Indian National Congress founded?',
  opts: [String(INC_FOUNDED), '1857', '1906', '1875'],
  sol: `The Congress held its first session in December ${INC_FOUNDED}. 1857 is the year of the uprising, 1906 of the Muslim League and 1875 of the Arya Samaj.`,
}));
Q('m_inc_founder', mcq({
  t: 4, d: 1, c: 'recall',
  stem: 'Which retired British official of the Indian Civil Service is regarded as the founder of the Indian National Congress?',
  opts: ['A. O. Hume', 'Lord Ripon', 'Lord Lytton', 'Sir Courtenay Ilbert'],
  sol: 'Allan Octavian Hume, a retired civil servant, took the lead in founding the Congress. Ripon and Lytton were Viceroys, and Ilbert was the Law Member behind the Ilbert Bill.',
}));
Q('m_inc_place', mcq({
  t: 4, d: 2, c: 'recall',
  stem: 'Where was the first session of the Indian National Congress held?',
  opts: ['Gokuldas Tejpal Sanskrit College, Bombay', 'Town Hall, Calcutta', 'Fort St George, Madras', 'Red Fort, Delhi'],
  sol: 'The first session met at the Gokuldas Tejpal Sanskrit College in Bombay on 28 December 1885 (it had been planned for Poona). The other places were not its venue.',
}));
Q('m_first_president', mcq({
  t: 4, d: 2, c: 'recall',
  stem: 'Who presided over the first session of the Indian National Congress in 1885?',
  opts: ['W. C. Bonnerjee', 'Dadabhai Naoroji', 'Surendranath Banerjee', 'Bal Gangadhar Tilak'],
  sol: 'Womesh Chunder Bonnerjee presided over the first session. Dadabhai Naoroji presided over the second (Calcutta, 1886).',
}));
Q('m_second_session', mcq({
  t: 4, d: 2, c: 'recall',
  stem: 'The second session of the Indian National Congress, held in 1886, met in which city and under which President?',
  opts: ['Calcutta, under Dadabhai Naoroji', 'Bombay, under W. C. Bonnerjee', 'Madras, under A. O. Hume', 'Poona, under Surendranath Banerjee'],
  sol: 'The second session met in Calcutta in 1886 with Dadabhai Naoroji as President. Bombay and Bonnerjee were the first session; Hume was never President of these sessions.',
}));
Q('m_delegates', mcq({
  t: 4, d: 2, c: 'recall',
  stem: 'About how many delegates attended the first session of the Indian National Congress?',
  opts: [String(FIRST_DELEGATES), '7', '720', '7,200'],
  sol: `${FIRST_DELEGATES} delegates from different parts of India attended the first session in Bombay.`,
}));
Q('m_inc_objective', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'Which of these was one of the immediate objectives of the Indian National Congress at its foundation?',
  opts: [
    'To bring together nationalists from different regions and promote a feeling of national unity',
    'To declare complete independence at once',
    'To organise an armed rising against the British',
    'To replace the Viceroy with an Indian ruler in 1886',
  ],
  sol: 'The early Congress aimed to provide a common forum for nationalists, build unity across regions, religions and castes, frame demands and train public opinion. Independence and armed revolt were not its aims in 1885.',
}));
Q('m_safety_valve', mcq({
  t: 4, d: 3, c: 'analysis',
  stem: 'Some writers described the Congress as a "safety valve" meant to let off Indian discontent harmlessly. Which statement gives a balanced view of this theory?',
  opts: [
    'It is one interpretation; others argue that Indian leaders used Hume\'s help to build their own national platform',
    'It is the only accepted view, and all historians agree with it',
    'It proves that the Congress was founded by the Viceroy alone',
    'It shows that Indians took no part in founding the Congress',
  ],
  sol: 'The safety-valve idea is one interpretation of Hume\'s motives; many historians stress that Indian leaders, who were already forming associations, used his help to found an all-India body. The other options overstate or misstate the case.',
}));
Q('m_precursor', mcq({
  t: 4, d: 3, c: 'application',
  stem: 'An imagined lawyer in Calcutta in 1880 belongs to a political association founded by Surendranath Banerjee and Ananda Mohan Bose. Which association is it?',
  opts: ['The Indian Association', 'The Muslim League', 'The Forward Bloc', 'The Satyashodhak Samaj'],
  sol: 'The Indian Association (1876) of Calcutta was one of the regional bodies that came before the Congress. The Muslim League (1906) and Forward Bloc (1939) came later, and the Satyashodhak Samaj was a social reform body.',
}));
Q('ar_inc_unity', ar({
  t: 4, d: 3, c: 'analysis', verdict: 'both-true-not-explains',
  a: 'The first session of the Congress was attended by delegates from different provinces.',
  r: 'A. O. Hume was a retired member of the Indian Civil Service.',
  sol: 'Both are true, but R does not explain A: the all-India attendance reflected the aim of national unity and earlier regional associations, not Hume\'s former service.',
}));
Q('ar_inc_independence', ar({
  t: 4, d: 2, c: 'analysis', verdict: 'A-false-R-true',
  a: 'At its first session in 1885 the Congress demanded complete independence from Britain.',
  r: 'The early Congress worked through petitions and resolutions placed before the government.',
  sol: 'A is false: the 1885 Congress sought reforms and a greater share for Indians, not complete independence. R is true: its early method was petitions, prayers and resolutions.',
}));
Q('tf_naoroji_first', tf({
  t: 4, d: 2, c: 'recall', ans: false,
  stem: 'True or false? Dadabhai Naoroji presided over the first session of the Indian National Congress.',
  sol: 'False. W. C. Bonnerjee presided over the first session (1885); Naoroji presided over the second (1886).',
}));
Q('fb_bonnerjee', fb({
  t: 4, d: 1, c: 'recall',
  stem: 'The first session of the Indian National Congress was presided over by W. C. ___.',
  acc: [['Bonnerjee', 'Banerjee']],
  sol: 'W. C. Bonnerjee presided.',
}));
Q('fb_date', fb({
  t: 4, d: 2, c: 'recall',
  stem: 'The first session of the Indian National Congress began in Bombay on 28 ___ 1885.',
  acc: [['December', 'Dec']],
  sol: 'It began on 28 December 1885.',
}));
Q('s_inc_objectives', short({
  t: 4, d: 1, c: 'recall', marks: 2, wl: S2,
  stem: 'Mention two immediate objectives of the Indian National Congress at the time of its foundation.',
  model: '1. To provide a **common platform** where nationalists from all parts of India could meet and work together.\n2. To promote **national unity** across region, religion and caste, and to **formulate demands** to place before the government.',
  sol: 'Any two objectives.',
  scheme: [['First objective', 1], ['Second objective', 1]],
}));
Q('s_sessions', short({
  t: 4, d: 1, c: 'recall', marks: 2, wl: S2,
  stem: 'Name the Presidents and venues of the first two sessions of the Indian National Congress.',
  model: '1. The **first session** met in **Bombay in 1885**, with **W. C. Bonnerjee** as President.\n2. The **second session** met in **Calcutta in 1886**, with **Dadabhai Naoroji** as President.',
  sol: 'Two sessions, each with venue and President.',
  scheme: [['First session', 1], ['Second session', 1]],
}));
Q('s_hume_why', short({
  t: 4, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: 'Give one view of why A. O. Hume helped found the Congress, and one reason why Indian leaders welcomed his help.',
  model: '**View:** some writers argue he wanted a **safety valve** for rising discontent; others see it as genuine **sympathy** for Indian demands.\n**Indian leaders:** a retired British official at the head made the new body **less suspect** to the government, helping it **survive** in its early years.',
  sol: 'One interpretation of Hume\'s motive; one reason for Indian acceptance.',
  scheme: [['A view of Hume\'s motive', 1], ['Why Indian leaders welcomed it', 1]],
}));
Q('s3_inc_why', short({
  t: 4, d: 4, c: 'analysis', marks: 3, wl: S3,
  stem: 'Why did educated Indians feel the need for an all-India political organisation by the 1880s? Give three reasons.',
  model: '1. **Regional associations** (such as the Indian Association) had shown the value of organisation but were limited to one area.\n2. Events like the **Ilbert Bill** controversy showed that **united, organised** protest could succeed.\n3. Common grievances (**drain, Press Act, Arms Act**) affected Indians everywhere and needed a **national voice**.',
  sol: 'Limits of regional bodies; lesson of organised protest; common grievances.',
  scheme: [['Regional bodies were limited', 1], ['Lesson of organised protest', 1], ['Common grievances', 1]],
}));

// ================================================================ long (10-mark, 3 + 3 + 4)
Q('l_economic', long({
  t: 1, d: 3, c: 'analysis', marks: 10, wl: L10,
  stem: 'Answer the following about the economic causes of Indian nationalism.\n\n(i) What did the early nationalists mean by the "drain of wealth"? **[3]**\n(ii) How did British policy lead to the decline of Indian handicrafts? **[3]**\n(iii) Explain how the condition of peasants and the experience of famines added to Indian discontent. **[4]**',
  model: '(i) Wealth flowed from India to **Britain** without an equal return: **salaries and pensions** of British officials, **home charges**, **interest** on loans and **profits** of British firms. **Dadabhai Naoroji** set out this argument in detail.\n\n(ii) Cheap **machine-made British goods** entered India freely, while Indian goods faced high **duties** in Britain; Indian crafts lost both foreign and home markets, and many **artisans** lost their livelihood and turned to agriculture.\n\n(iii) A **heavy land-revenue** demand had to be paid even in bad years, so peasants fell into **debt** to moneylenders and lost land. During **famines** such as that of **1876–78**, relief seemed inadequate, and holding the **Delhi Durbar of 1877** at the same time convinced many that the government cared little for Indian lives.',
  sol: 'Drain; ruin of crafts; peasants and famines.',
  scheme: [['(i) Meaning of the drain', 2], ['(i) Naoroji', 1], ['(ii) Decline of crafts explained', 3], ['(iii) Land revenue and debt', 2], ['(iii) Famines and the Durbar', 2]],
}));
Q('l_repression', long({
  t: 1, d: 3, c: 'analysis', marks: 10, wl: L10,
  stem: 'Answer the following about colonial policies that angered Indians.\n\n(i) Explain the Vernacular Press Act of 1878 and why Indians objected to it. **[3]**\n(ii) Explain the Arms Act of 1878 and its effect on Indian opinion. **[3]**\n(iii) What was the Ilbert Bill controversy, and how did it influence the growth of nationalism? **[4]**',
  model: '(i) Passed under **Lord Lytton**, it allowed the government to act against **Indian-language** newspapers that criticised it, while **English** papers were left free. Indians saw it as an attack on **free expression** and as **discrimination**.\n\n(ii) It required **Indians** to hold a **licence** to keep arms, while **Europeans** were **exempt**. Indians felt **humiliated** and saw it as proof of **racial inequality**.\n\n(iii) Under **Lord Ripon (1883)**, the Bill proposed that **Indian judges** could try **Europeans** in criminal cases. Europeans protested strongly and the government **compromised**. Indians saw the **racial attitude** behind the protest and learnt that **organised agitation** works, which encouraged the formation of an **all-India organisation**.',
  sol: 'Press Act; Arms Act; Ilbert Bill.',
  scheme: [['(i) Provision', 1], ['(i) Objection', 2], ['(ii) Provision', 1], ['(ii) Effect on opinion', 2], ['(iii) The Bill and the protest', 2], ['(iii) Lessons for nationalism', 2]],
}));
Q('l_reformers_a', long({
  t: 2, d: 2, c: 'analysis', marks: 10, wl: L10,
  stem: 'Answer the following about two social reformers.\n\n(i) State the contributions of Raja Rammohan Roy. **[3]**\n(ii) State the contributions of Jyotiba Phule. **[3]**\n(iii) How did the work of these two reformers help create national consciousness? **[4]**',
  model: '(i) He founded the **Brahmo Samaj (1828)**, campaigned against **sati** (banned in **1829**), and supported **modern education** and the rights of **women**, including property rights.\n\n(ii) With **Savitribai Phule** he opened a **school for girls** in Pune and worked for the education of the **lower castes**; he founded the **Satyashodhak Samaj (1873)** to fight **caste** discrimination.\n\n(iii) By attacking **social evils** they made society more **just and united**; they spread **education** and a spirit of **reason**; and by restoring **self-respect** to women and the oppressed, they widened the circle of people who would later join the **national movement**.',
  sol: 'Roy; Phule; link to national consciousness.',
  scheme: [['(i) Roy, three points', 3], ['(ii) Phule, three points', 3], ['(iii) Unity and justice', 2], ['(iii) Education and self-respect', 2]],
}));
Q('l_reformers_b', long({
  t: 2, d: 3, c: 'analysis', marks: 10, wl: L10,
  stem: 'Answer the following about two religious reformers.\n\n(i) What were the main ideas of Swami Dayananda Saraswati and the Arya Samaj? **[3]**\n(ii) What were the contributions of Swami Vivekananda? **[3]**\n(iii) Compare the ways in which these two reformers built pride and self-confidence among Indians. **[4]**',
  model: '(i) He founded the **Arya Samaj (1875)**, called for a return to the **Vedas**, opposed **idol worship**, **caste by birth** and **child marriage**, and supported **education** (later the **DAV** schools).\n\n(ii) A disciple of **Ramakrishna Paramahansa**, he spoke at the **World\'s Parliament of Religions, Chicago (1893)**, founded the **Ramakrishna Mission (1897)** for **social service**, and urged young Indians to be **strong and fearless**.\n\n(iii) **Dayananda** built pride by turning Indians towards their **ancient Vedic heritage** and reforming society from within. **Vivekananda** built confidence by winning **respect abroad** for Indian thought and by linking **religion with service** to the poor. Both rejected the idea that Indians were **inferior**, which strengthened national feeling.',
  sol: 'Dayananda; Vivekananda; comparison.',
  scheme: [['(i) Arya Samaj ideas', 3], ['(ii) Vivekananda\'s contributions', 3], ['(iii) Dayananda\'s route to pride', 2], ['(iii) Vivekananda\'s route and common ground', 2]],
}));
Q('l_press', long({
  t: [3, 1], d: 3, c: 'analysis', marks: 10, wl: L10,
  stem: 'Answer the following about the Press and nationalism.\n\n(i) Name three nationalist newspapers of the late nineteenth century and the leader or place linked with each. **[3]**\n(ii) Explain three ways in which the Press helped the growth of nationalism. **[3]**\n(iii) Why did the government pass the Vernacular Press Act, and how did nationalists respond? **[4]**',
  model: '(i) **Kesari** (Marathi) – **Bal Gangadhar Tilak**; **The Bengalee** – **Surendranath Banerjee**; **The Hindu** – **Madras** (also **Amrita Bazar Patrika**, Calcutta).\n\n(ii) It **criticised** unjust policies; it spread **political awareness** and the ideas of leaders; it **linked regions** so that people saw common problems and a common cause.\n\n(iii) The government feared the growing influence of **Indian-language** papers, which reached ordinary readers and criticised measures such as the **Durbar** and the **Arms Act**; **Lytton** passed the Act in **1878**. Nationalists **protested** against it, some papers switched to **English** to escape it, and it was **repealed by Ripon in 1882**; the episode drew more people into **political debate**.',
  sol: 'Newspapers named; roles; Press Act and response.',
  scheme: [['(i) Three papers with link', 3], ['(ii) Three roles', 3], ['(iii) Reason for the Act', 2], ['(iii) Response and repeal', 2]],
}));
Q('l_inc', long({
  t: 4, d: 2, c: 'understanding', marks: 10, wl: L10,
  stem: 'Answer the following about the foundation of the Indian National Congress.\n\n(i) When, where and by whom was the Indian National Congress founded? **[3]**\n(ii) State three immediate objectives of the Congress. **[3]**\n(iii) Give details of the first two sessions of the Congress. **[4]**',
  model: `(i) It was founded on **28 December ${INC_FOUNDED}** at the **Gokuldas Tejpal Sanskrit College, Bombay**; **A. O. Hume**, a retired member of the Indian Civil Service, took the lead.\n\n(ii) To provide a **common platform** for nationalists from all parts of India; to promote **national unity** across region, religion and caste; to **formulate demands** and place them before the government; and to **train public opinion** (any three).\n\n(iii) **First session, Bombay, 1885:** presided over by **W. C. Bonnerjee**, attended by **${FIRST_DELEGATES} delegates**. **Second session, Calcutta, 1886:** presided over by **Dadabhai Naoroji**, with a much larger attendance.`,
  sol: 'Foundation; objectives; first two sessions.',
  scheme: [['(i) Date, place, founder', 3], ['(ii) Three objectives', 3], ['(iii) First session', 2], ['(iii) Second session', 2]],
}));
Q('l_inc_why', long({
  t: [4, 1], d: 4, c: 'evaluation', marks: 10, wl: L10,
  stem: 'Historians have long discussed why the Congress came into being in 1885.\n\n(i) Explain three developments of the 1870s and 1880s that made an all-India organisation necessary. **[3]**\n(ii) What is the "safety-valve" theory of the Congress\'s origin? **[3]**\n(iii) Present one argument that supports and one argument that questions the safety-valve theory, and state which you find more convincing. **[4]**',
  model: '(i) **Repressive measures** of Lytton (Press Act, Arms Act) gave Indians common grievances; the **Ilbert Bill** controversy showed the power of organised protest; **regional associations** such as the **Indian Association (1876)** had shown the value of organisation but needed a national body.\n\n(ii) It is the view that **Hume** wanted the Congress as a **safety valve**, a channel through which growing **discontent** could be let out **peacefully**, so that it would not turn into a violent outbreak like **1857**.\n\n(iii) **Supports:** Hume was a former **official** who worried about unrest, and the early Congress was **moderate** and loyal in tone. **Questions:** Indian leaders were **already organising** and **used** Hume\'s help to gain a **legitimate national platform**; the Congress soon became a **vehicle of nationalism**. A balanced answer may find the second more convincing because the Congress grew far beyond any safety-valve purpose; either view earns credit if reasoned.',
  sol: 'Developments; meaning of the theory; balanced evaluation.',
  scheme: [['(i) Three developments', 3], ['(ii) Meaning of the theory', 3], ['(iii) Supporting argument', 1], ['(iii) Questioning argument', 1], ['(iii) Reasoned judgement', 2]],
}));
Q('l_factors', long({
  t: [1, 2, 3], d: 4, c: 'analysis', marks: 10, wl: L10,
  stem: 'Study the hub diagram of the factors behind Indian nationalism and answer the questions that follow.\n\n(i) Identify any three factors shown and give one example of each. **[3]**\n(ii) Explain how the Press linked the other factors together. **[3]**\n(iii) Which factor do you think did most to make Indians feel that they were one nation? Give reasons. **[4]**',
  model: '(i) **Economic exploitation:** the drain of wealth. **Repressive policies:** the Arms Act, 1878. **Reform movements:** the Arya Samaj\'s call for education and an end to caste by birth.\n\n(ii) Newspapers **reported and criticised** economic hardship and repressive laws, spread the **ideas of reformers**, and carried them to readers in **many regions**, so the separate causes became a **shared national argument**.\n\n(iii) Any factor with reasons; for example, **repressive racial laws** affected Indians of **every region and class alike**, so they made people feel they shared a **common position** under foreign rule. Credit any reasoned choice with two supporting points.',
  sol: 'Factors with examples; role of the Press; reasoned choice.',
  scheme: [['(i) Three factors with examples', 3], ['(ii) Press as a link', 3], ['(iii) Choice', 1], ['(iii) Reasons', 3]],
  assets: [factorsSvg('Hub diagram: the rise of Indian nationalism in the centre, linked to four boxes: economic exploitation (drain, ruined crafts, revenue), repressive policies (Lytton, Press Act, Arms Act), reform movements (self-respect and unity) and the Press (ideas reached many readers)', 'Four factors behind nationalism.')],
}));

// ================================================================ source-based
Q('sb_weaver_letter', source({
  t: [1, 3], d: 4, c: 'analysis', origin: 'soyl-original',
  stem: `Read the extract from an imagined letter to a newspaper and answer the questions that follow. ${IMAG}`,
  passage: '**Letter to the editor of an imagined Bengali weekly, 1879**\n\nSir, my family has woven fine cloth in this village for five generations. Today the bazaar is full of mill cloth from across the sea, and our looms stand idle. My son now works as a labourer on another man\'s field, and still the revenue officer comes at the same time every year. Last month your paper was forced to stop printing in our own tongue, and now I read it in English with my nephew\'s help. Who will tell the government of our troubles if our newspapers cannot speak?',
  parts: [
    child('a', short({ t: 1, d: 1, c: 'understanding', marks: 1, stem: 'Which economic problem does the weaver describe in the first two sentences?', model: 'The **ruin of handicrafts** caused by cheap **machine-made British cloth**.', sol: 'Decline of handloom weaving.', scheme: [['Ruin of handicrafts', 1]] })),
    child('b', short({ t: 3, d: 2, c: 'application', marks: 1, stem: 'Which law of 1878 most likely forced the paper to stop printing in the local language?', model: 'The **Vernacular Press Act, 1878**.', sol: 'Act aimed at Indian-language papers.', scheme: [['Vernacular Press Act', 1]] })),
    child('c', short({ t: [1, 3], d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Explain how the letter shows both economic hardship and political grievance working together to create discontent.', model: 'The weaver has lost his **livelihood** and still pays **revenue**, which is economic hardship; when the **press is silenced**, he loses the way to make his complaint heard, which is a **political** grievance. Together they make him feel the government ignores **Indians**.', sol: 'Link economic loss to the loss of a voice.', scheme: [['Economic hardship', 1], ['Political grievance and link', 1]] }), [
      short({ t: 3, d: 3, c: 'evaluation', marks: 2, stem: '**Or** (ii): Why does the writer think newspapers matter so much to people like him?', model: 'Newspapers are the only way ordinary people can **tell the government** about their **troubles**; they also let people in other places learn of these problems, building **shared opinion**.', sol: 'Voice and shared opinion.', scheme: [['Voice to the government', 1], ['Shared opinion', 1]] }),
    ]),
  ],
}));
Q('sb_delegate_diary', source({
  t: 4, d: 3, c: 'application', origin: 'soyl-original',
  stem: `Read the extract from the imagined diary of a delegate and answer the questions that follow. ${IMAG}`,
  passage: '**Diary of an imagined delegate from Madras, December 1885**\n\nWe were told to go to Poona, but sickness in that city sent us all to Bombay instead. In the hall of a Sanskrit college I sat beside a lawyer from Calcutta and a teacher from Lahore; we had never met, yet within an hour we were speaking of the same grievances. A Calcutta barrister was in the chair. The retired Englishman who had written so many letters to bring us together sat quietly at the side. We counted ourselves: a little over seventy.',
  parts: [
    child('a', short({ t: 4, d: 1, c: 'recall', marks: 1, stem: 'Which organisation\'s first session is the delegate describing?', model: 'The **Indian National Congress** (first session, **Bombay, 1885**).', sol: 'First Congress session.', scheme: [['Indian National Congress', 1]] })),
    child('b', short({ t: 4, d: 2, c: 'application', marks: 1, stem: 'Name the "Calcutta barrister" who was in the chair.', model: '**W. C. Bonnerjee**.', sol: 'President of the first session.', scheme: [['W. C. Bonnerjee', 1]] })),
    child('c', short({ t: 4, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Which immediate objective of the Congress is reflected in the meeting of delegates from Madras, Calcutta and Lahore? Explain.', model: 'The objective of **national unity** and a **common platform**: people from distant regions met, found **shared grievances**, and began to think of themselves as members of **one nation**.', sol: 'National unity and a common platform.', scheme: [['Objective named', 1], ['Explanation from the diary', 1]] }), [
      short({ t: 4, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Who was the "retired Englishman", and why might the delegates have welcomed his role?', model: '**A. O. Hume**, a retired civil servant. His role made the new body **less suspect** to the government and helped bring leaders from many provinces **together**.', sol: 'Hume and his usefulness.', scheme: [['A. O. Hume', 1], ['Why welcomed', 1]] }),
    ]),
  ],
}));
Q('sb_timeline', source({
  t: [2, 4], d: 2, c: 'application', origin: 'soyl-original',
  stem: 'Study the timeline drawn by SOYL and answer the questions that follow. *(Schematic timeline drawn for practice; dates are those widely taught.)*',
  passage: 'The timeline shows nine events from **1828** to **1897**: the founding of four reform bodies, two measures of Lord Lytton, the Ilbert Bill, the founding of the Indian National Congress and a famous address abroad.',
  assets: [timelineSvg('Timeline from 1825 to 1900 marking: 1828 Brahmo Samaj, 1873 Satyashodhak Samaj, 1875 Arya Samaj, 1877 Delhi Durbar, 1878 Vernacular Press Act, 1883 Ilbert Bill, 1885 Indian National Congress, 1893 Chicago address and 1897 Ramakrishna Mission', 'Schematic timeline, not to scale for label positions.')],
  parts: [
    child('a', short({ t: 2, d: 1, c: 'recall', marks: 1, stem: 'Which reform body on the timeline is the earliest, and who founded it?', model: 'The **Brahmo Samaj (1828)**, founded by **Raja Rammohan Roy**.', sol: 'Earliest event.', scheme: [['Brahmo Samaj and Roy', 1]] })),
    child('b', short({ t: 4, d: 2, c: 'application', marks: 1, stem: `How many years after the Brahmo Samaj was the Indian National Congress founded?`, model: `**${yearsBetween(1828, INC_FOUNDED)} years** (${INC_FOUNDED} − 1828).`, sol: `${INC_FOUNDED} − 1828 = ${yearsBetween(1828, INC_FOUNDED)}.`, scheme: [['Correct difference', 1]] })),
    child('c', short({ t: [2, 4], d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Using two events from the timeline, show how reform and political grievance came together before 1885.', model: 'The **Arya Samaj (1875)** built pride and self-confidence, while the **Vernacular Press Act (1878)** gave a common **political grievance**; by **1885** people with this new confidence and these grievances came together in the **Congress**.', sol: 'One reform event and one political event linked to 1885.', scheme: [['Reform event used', 1], ['Political event used and linked', 1]] }), [
      short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Why are the events of 1877 and 1878 placed close together on the timeline in many history lessons on nationalism?', model: 'Both belong to **Lord Lytton**\'s rule: the **Durbar** during a famine and the **Press and Arms Acts** together created strong **resentment**, so they are studied as one group of **repressive or insensitive** measures.', sol: 'Common link to Lytton and resentment.', scheme: [['Lytton link', 1], ['Shared effect on opinion', 1]] }),
    ]),
  ],
}));

// ================================================================ extra objective items for check slides
Q('m_lytton_years', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Lord Lytton, whose measures angered many Indians, was Viceroy of India during which years?',
  opts: ['1876–1880', '1856–1862', '1880–1884', '1899–1905'],
  sol: '1876–80. Canning was Viceroy around 1856–62, Ripon 1880–84 and Curzon 1899–1905.',
}));
Q('tf_ilbert_ripon', tf({
  t: 1, d: 1, c: 'recall', ans: true,
  stem: 'True or false? The Ilbert Bill was introduced during the viceroyalty of Lord Ripon.',
  sol: 'True. It was introduced in 1883 under Lord Ripon.',
}));
Q('m_reform_pick', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'An imagined reform society of the 1870s opens schools, rejects caste by birth and asks its members to study the Vedas. Which real organisation does it most resemble?',
  opts: ['The Arya Samaj', 'The Ramakrishna Mission', 'The Indian National Congress', 'The Satyashodhak Samaj'],
  sol: 'Schools, rejection of caste by birth and a return to the Vedas are features of the Arya Samaj. The Ramakrishna Mission stressed service, the Congress was political, and the Satyashodhak Samaj did not base itself on the Vedas.',
}));
Q('m_press_language', mcq({
  t: 3, d: 2, c: 'analysis',
  stem: 'Why did newspapers in Indian languages matter especially for the spread of nationalism?',
  opts: ['They reached people who could not read English', 'They were read only by British officials', 'They were free of all government rules at all times', 'They printed no political news'],
  sol: 'Indian-language papers carried political ideas beyond the small English-educated group, to traders, teachers and villagers. The other options are false.',
}));
Q('m_inc_platform', mcq({
  t: 4, d: 2, c: 'analysis',
  stem: 'Why is the founding of the Indian National Congress seen as a turning point in Indian politics?',
  opts: ['It gave nationalists from all regions one common platform for the first time', 'It immediately ended British rule', 'It replaced all regional associations by law', 'It was the first organisation of any kind in India'],
  sol: 'For the first time, nationalists from all over India had a single all-India body. It did not end British rule, did not abolish regional associations, and was not the first organisation in India.',
}));
Q('tf_inc_poona', tf({
  t: 4, d: 2, c: 'recall', ans: true,
  stem: 'True or false? The first session of the Congress had been planned for Poona but was moved to Bombay.',
  sol: 'True. An outbreak of disease in Poona led to the session being held in Bombay.',
}));
