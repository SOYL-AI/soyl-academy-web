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
assert.equal(yearsBetween(1829, 1885), 56); // sati ban to the Congress
assert.equal(yearsBetween(1885, 1893), 8); // Congress to the Chicago address
assert.equal(yearsBetween(1885, 1897), 12); // Congress to the Ramakrishna Mission
assert.equal(yearsBetween(1828, 1883), 55); // Brahmo Samaj to the Ilbert Bill
assert.equal(yearsBetween(1875, 1883), 8); // Arya Samaj to the Ilbert Bill

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
  t: 1, d: 3, c: 'application',
  stem: 'An imagined audit of 1882 lists two payments from Indian revenues. Payment P is a pension paid in London to a retired British official. Payment Q is the salary of an Indian clerk in Madras, who spends it in Madras shops. How would an early nationalist, using the drain argument, compare the two?',
  opts: [
    'P is part of the drain because it leaves India without a return, while Q is not because the money stays in the Indian economy',
    'Both are part of the drain, because both are paid out of Indian revenues',
    'Neither is part of the drain, because both are lawful salaries or pensions',
    'Only Q is part of the drain, because Indian clerks were paid less than British officials',
  ],
  sol: 'The drain argument looked at where the money went. A pension spent in Britain took wealth out of India with no return, while a clerk\'s salary spent in Madras circulated within India. Being paid from Indian revenue is not enough to make a payment part of the drain, being lawful is not the test, and the lower pay of Indians was a separate grievance.',
}));
Q('m_crafts', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: 'An imagined district report of 1860 records that local handloom weavers\' earnings have fallen steeply. The same report notes that raw cotton from the district sells well, the population is rising, and the bazaars are stocked with cheap cloth. Which explanation fits all of these details best?',
  opts: [
    'Cheap machine-made cloth from British factories undercut the weavers in their own bazaars, although cotton was plentiful and the population was growing',
    'High duties on Indian cloth in Britain closed the export market, and nothing else changed',
    'The government banned the growing of cotton, so weavers ran short of thread',
    'Demand for cloth fell sharply because the population shrank',
  ],
  sol: 'Only competition from cheap imported cloth fits all three details: cotton was available and people needed cloth, yet weavers sold less. The duties in Britain did hurt Indian exports, but they do not explain why weavers lost out in their own bazaars. A cotton ban or a shrinking population contradicts the report.',
}));
Q('m_revenue', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: 'An imagined village record of 1877 states that the harvest failed, the revenue demand stayed the same, and by the end of the year half the farmers had borrowed from moneylenders and several had sold land. Which feature of the revenue system best explains why one bad harvest led to land sales and not just a lean year?',
  opts: [
    'A fixed demand had to be paid whatever the harvest, so farmers borrowed to meet it',
    'Moneylenders charged interest, and that alone caused the land sales',
    'Land revenue was collected only from merchants, who then raised prices for farmers',
    'The government had suspended all revenue in famine years, so farmers spent their savings freely',
  ],
  sol: 'The revenue was a fixed demand that did not shrink with the harvest, so a failed crop forced farmers to borrow, and debt then led to loss of land. Interest made the debt heavier but does not explain why the borrowing began. The other options contradict the record, which says the demand stayed the same.',
}));
Q('m_famine', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'An imagined pamphlet of 1879 claims that the Delhi Durbar of 1877 was a cause of the famine of 1876–78. Which reply is most accurate?',
  opts: [
    'The famine had begun in 1876, before the Durbar, so the Durbar did not cause it; nationalists criticised the lavish spending during the famine as insensitive',
    'The claim is correct, because the money spent on the Durbar left the government with no grain to distribute',
    'The claim is wrong, because the Durbar was held after the famine had ended in 1878',
    'The claim is partly correct, because the Durbar was held in 1875, just before the famine began',
  ],
  sol: 'The famine of 1876–78 began before the Durbar of 1877 and went on after it, so the Durbar cannot be its cause. What Indians objected to was the display and spending during a famine, which they read as indifference. The other options put the Durbar at the wrong time or credit it with a cause it did not have.',
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
  t: 1, d: 3, c: 'analysis',
  stem: 'An imagined lawyer in 1879 says the Arms Act of 1878 was only a normal safety rule, since any government may control weapons. Which reply best explains why many Indians still resented it?',
  opts: [
    'The licence rule fell on Indians while Europeans were exempt, so they objected to the unequal treatment rather than to regulation as such',
    'The Act made it illegal for anyone in India, including the police, to own a gun',
    'The Act applied only in the princely states, which had no say in the matter',
    'The licence fee was fixed so high that no Indian could ever pay it',
  ],
  sol: 'The grievance was discrimination: Indians needed licences and Europeans did not. A rule that applied to everyone equally would have been a different matter. The Act did not ban all weapons and did not apply only to princely states, and a prohibitive fee is not what it is known for.',
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
  t: 1, d: 3, c: 'application', verdict: 'both-true-explains',
  a: 'After 1878, some Indian-language newspapers began to appear in English instead.',
  r: 'The Vernacular Press Act applied only to newspapers in Indian languages.',
  sol: 'Both are true, and R explains A: because the Act covered only Indian-language papers, a paper that switched to English fell outside it, which is why some did so.',
}));
Q('ar_durbar_famine', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'both-true-not-explains',
  a: 'Many Indians regarded the Arms Act of 1878 as unjust.',
  r: 'The Arms Act and the Vernacular Press Act were passed in the same year.',
  sol: 'Both are true, but R does not explain A: the Act was resented because it required Indians but not Europeans to hold licences. Being passed in the same year as another Act is a coincidence of date, not a reason for the resentment.',
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
  t: 1, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'Imagined firm A in 1880 sends its profits to shareholders in Britain. Imagined firm B, owned by Indian merchants, invests its profits in a new mill in India. Which firm\'s profits would an early nationalist count in the drain of wealth, and what does the contrast show about how the drain was judged?',
  model: '**Firm A**: its profits leave India without a return, so they form part of the **drain**.\nThe contrast shows that the drain was judged by **where the money ends up**, not by who earns it: profits reinvested in India stay in the Indian economy.',
  sol: 'Firm A, with the test of where the money goes.',
  scheme: [['Firm A identified with reason', 1], ['Test of where the money ends up', 1]],
}));
Q('s_crafts_ruin', short({
  t: 1, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: 'A student says the decline of Indian handicrafts affected nationalism only because artisans lost income. Explain why this is incomplete, using the way nationalists read the cause of the decline.',
  model: 'Nationalists did not treat the decline as natural change. They pointed to **cheap British machine goods** and **high duties on Indian goods in Britain** as policy, and concluded that British rule served **British interests**. So the ruin of crafts became a **political** complaint and not just a private loss.',
  sol: 'Income loss is only part; the cause was read as policy favouring British interests.',
  scheme: [['Loss of income is only part of the point', 1], ['Cause read as policy serving British interests', 1]],
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
  stem: 'Two imagined readers disagree about the Ilbert Bill of 1883. One says the dilution of the Bill after European protest taught Indians that protest was useless. The other says it taught the opposite. Which reading better fits the growth of nationalism? Give reasons.',
  model: 'The **second reading** fits better. European protest was **organised and united**, and the government changed its plan, so Indians learnt that **organised agitation** could shift policy. The episode also exposed **racial prejudice**, which made educated Indians want their own **all-India body**.',
  sol: 'The second reading, from the outcome of the European protest.',
  scheme: [['Judges the second reading better', 1], ['Reasons from the outcome of the protest', 1]],
}));
Q('s3_economic_three', short({
  t: 1, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'In an imagined district in 1878, weavers are idle, peasants are in debt after a failed harvest, and an Indian clerk notes that British officials\' pensions are paid from Indian revenue in London. Which of these three grievances could most easily draw support from educated Indians in other provinces who neither wove cloth nor owned land? Give reasons for your choice, and say why one other grievance was less likely to spread beyond its region.',
  model: 'The **drain of wealth**: it concerned **India\'s revenues as a whole**, so an educated clerk in any province could see its effect and argue about it in newspapers. The **weavers\'** loss and the **peasants\'** debt were first felt in particular **localities and occupations**, so they needed a wider argument, such as the drain, to be seen as one national problem.',
  sol: 'The drain, because of its national scale; local grievances needed a wider argument.',
  scheme: [['Chooses the drain', 1], ['Reason: national scale of the drain', 1], ['Why a local grievance spread less easily', 1]],
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
  t: 2, d: 3, c: 'application',
  stem: 'An imagined student claims that Raja Rammohan Roy\'s campaign against sati succeeded because the Indian National Congress pressed the government to act. Which reply is most accurate?',
  opts: [
    `It is wrong: the regulation of 1829 came ${yearsBetween(1829, INC_FOUNDED)} years before the Congress was founded in ${INC_FOUNDED}, so Roy's campaign and the government under Lord William Bentinck explain it`,
    'It is right: the Congress was founded to carry on Roy\'s campaign, so it was already pressing the government in 1829',
    'It is wrong: the regulation of 1829 came after the founding of the Congress, but Roy had no part in it',
    'It is right: Roy founded the Congress in 1828 with the aim of banning sati',
  ],
  sol: `Sati was banned in 1829 and the Congress was founded in ${INC_FOUNDED}, ${yearsBetween(1829, INC_FOUNDED)} years later, so it cannot have pressed for the ban. The ban followed Roy's long campaign and was issued under Lord William Bentinck. The other options misplace the Congress in time or credit Roy with founding it (he founded the Brahmo Samaj in 1828).`,
}));
Q('m_phule_samaj', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'Jyotiba Phule founded which organisation in 1873 to work for the rights of the lower castes?',
  opts: ['Satyashodhak Samaj', 'Arya Samaj', 'Prarthana Samaj', 'Ramakrishna Mission'],
  sol: 'Phule founded the Satyashodhak Samaj (Society of Seekers of Truth) in 1873. The Arya Samaj was Dayananda\'s, the Prarthana Samaj a Bombay reform society, and the Ramakrishna Mission Vivekananda\'s.',
}));
Q('m_phule_girls', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'An imagined student says: "Jyotiba Phule and Swami Dayananda Saraswati were doing the same thing, since both opposed caste distinctions." Which correction is most accurate?',
  opts: [
    'Both opposed caste distinctions, but Phule\'s Satyashodhak Samaj worked for the rights and education of the lower castes and girls, whereas Dayananda\'s Arya Samaj sought reform through a return to the Vedas',
    'They differed on caste: Phule defended caste by birth while Dayananda opposed it',
    'They worked in the same organisation, the Arya Samaj, in different cities',
    'Neither opposed caste distinctions; both worked only to spread English education',
  ],
  sol: 'The student is right that both criticised caste, but the movements had different bases and aims: Phule\'s Satyashodhak Samaj (1873) centred on the rights and education of lower castes and girls, while Dayananda\'s Arya Samaj (1875) drew on the Vedas. They did not take opposite sides on caste, did not share an organisation, and neither worked only for English education.',
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
  t: 2, d: 3, c: 'application',
  stem: 'An imagined student argues that Swami Vivekananda\'s address at Chicago in 1893 inspired the founders of the Indian National Congress to meet in 1885. Which reply is most accurate?',
  opts: [
    `It could not have: the Congress was founded in ${INC_FOUNDED}, ${yearsBetween(INC_FOUNDED, 1893)} years before the Chicago address, though the address may have strengthened Indian pride later`,
    'It did: the Chicago address of 1893 came first and led directly to the meeting at Bombay',
    'It could not have: Vivekananda founded the Congress himself in 1897',
    'It did: the Ramakrishna Mission, founded in 1893, organised the first session',
  ],
  sol: `The Congress was founded in ${INC_FOUNDED} and the Chicago address came in 1893, ${yearsBetween(INC_FOUNDED, 1893)} years later, so it cannot have inspired the first session. Its effect lay in the later growth of pride and self-confidence. The other options reverse the order of events or confuse the Mission (1897) with the Congress.`,
}));
Q('m_reform_link', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'An imagined student says: "Reformers such as Phule and Dayananda talked about schools and caste, not about the government, so their work had nothing to do with the rise of nationalism." Which statement best qualifies this claim?',
  opts: [
    'They did not campaign against British rule, but by building education, self-respect and unity they helped produce the confident public that later joined the national movement',
    'The claim is wholly correct, because reformers opposed all political activity',
    'The claim is wrong, because the reform movements were founded by the Indian National Congress',
    'The claim is wrong, because the reformers demanded an immediate end to British rule',
  ],
  sol: 'The reformers worked mostly on society, so the student is right that they did not campaign against the government. But their work in education, self-respect and unity helped create people ready for national politics. The movements existed before the Congress and were not demands for ending British rule.',
}));
Q('ar_vivek_service', ar({
  t: 2, d: 3, c: 'application', verdict: 'both-true-explains',
  a: 'Vivekananda\'s address at Chicago in 1893 strengthened the self-confidence of educated Indians who had been taught to rate Western ideas above their own.',
  r: 'The address won respect for Indian thought from a Western audience.',
  sol: 'Both are true, and R explains A: respect shown abroad to Indian thought answered the claim of Western superiority and encouraged Indians to value their own heritage.',
}));
Q('ar_dayananda_caste', ar({
  t: 2, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'The Arya Samaj\'s call to return to the Vedas could be used to support reform rather than to resist it.',
  r: 'Dayananda used the Vedas to argue against caste by birth and child marriage.',
  sol: 'Both are true, and R explains A: by arguing from the Vedas against caste by birth and child marriage, Dayananda turned a return to the old source into an argument for change.',
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
  t: 2, d: 2, c: 'recall', marks: 2,
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
  t: 2, d: 3, c: 'evaluation', marks: 2, wl: S2,
  stem: 'An imagined student says: "Swami Dayananda Saraswati\'s call to return to the Vedas shows that he wanted to undo reform and keep society as it was." Use two features of the Arya Samaj\'s programme to assess this claim.',
  model: 'The claim is **misleading**. Dayananda used the **Vedas** as a basis for change: he opposed **caste by birth** and **child marriage** and backed **education**. Looking back to the Vedas also gave Indians **pride**, so the aim was renewal, not keeping society unchanged.',
  sol: 'Misleading: the return to the Vedas was a basis for reform.',
  scheme: [['Two features used as evidence', 1], ['Judgement that the claim is misleading, with reason', 1]],
}));
Q('s_vivek_two', short({
  t: 2, d: 3, c: 'evaluation', marks: 2, wl: S2,
  stem: 'An imagined student says: "Swami Vivekananda awakened India only through his speech at Chicago in 1893." Use two facts to qualify this claim.',
  model: 'The Chicago address (**1893**) won respect abroad and made Indians **proud**, so the student is partly right. But he also founded the **Ramakrishna Mission (1897)** for **social service** and urged young Indians to be **fearless and self-reliant**, so his influence also worked through organisation and teaching at home.',
  sol: 'Partly right; qualified by the Mission and his teaching.',
  scheme: [['Chicago credited but not the whole story', 1], ['A further contribution at home', 1]],
}));
Q('s3_reform_nation', short({
  t: 2, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Phule and Dayananda both opposed caste distinctions but built their movements on different bases. State the basis of each, and explain which movement was likelier to appeal to lower-caste groups who felt shut out of public life, giving a reason.',
  model: '**Phule** built the Satyashodhak Samaj around the rights and education of the **lower castes** and girls; **Dayananda** built the Arya Samaj on a return to the **Vedas**. Phule\'s movement was likelier to appeal to excluded groups, since it was organised for them and challenged the **caste discrimination** they faced, while the Vedic appeal was framed around a shared ancient heritage.',
  sol: 'Phule: rights of lower castes; Dayananda: the Vedas; Phule likelier to appeal, with reason.',
  scheme: [['Basis of Phule\'s movement', 1], ['Basis of Dayananda\'s movement', 1], ['Judgement with a reason', 1]],
}));

// ================================================================ t03 Role of the Press
Q('m_press_role', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: 'The Vernacular Press Act of 1878 applied only to newspapers in Indian languages. Which inference about the government\'s thinking is best supported by this?',
  opts: [
    'It believed Indian-language papers reached a wider public that could be roused against it, beyond the small English-educated group',
    'It believed English-language papers were never critical of its policies',
    'It wished to protect Indian-language papers from unfair competition',
    'It wished to end the printing of all newspapers in India',
  ],
  sol: 'Targeting only Indian-language papers suggests the government saw them as the ones that could stir ordinary readers, who could not read English. English papers could be critical too, so the second option overstates; the Act was not protective and did not end newspapers.',
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
  t: 3, d: 3, c: 'analysis',
  stem: 'An imagined editor in 1879 argues: "My paper moved from Bengali to English and went on criticising the government, yet nothing happened to it. So the Vernacular Press Act cannot have been aimed at what we said." Which reading of the Act does this experience best support?',
  opts: [
    'The Act\'s reach depended on the language of the paper and not on what it said, which is why Indians called it discriminatory',
    'The Act punished only papers that praised the government',
    'The Act applied only to English papers, so the editor had moved into its reach',
    'The Act was repealed in 1878, so no paper was affected afterwards',
  ],
  sol: 'A paper that kept the same criticism in English escaped the Act, which shows that the line was drawn by language. This is why Indians saw it as unfair to Indian-language papers. The Act did not target praise, covered Indian-language papers (not English), and was repealed only in 1882.',
}));
Q('m_hindu', mcq({
  t: 3, d: 2, c: 'recall',
  stem: 'The Hindu, a nationalist English newspaper founded in 1878, was published from which city?',
  opts: ['Madras', 'Calcutta', 'Lahore', 'Allahabad'],
  sol: 'The Hindu was started in Madras in 1878. Calcutta, Lahore and Allahabad had other papers.',
}));
Q('ar_press_unity', ar({
  t: 3, d: 3, c: 'analysis', verdict: 'A-false-R-true',
  a: 'Newspapers in an Indian language usually carried news to readers in every province, whatever language those readers knew.',
  r: 'Readers of a paper in an Indian language were mostly people who knew that language.',
  sol: 'A is false: a paper in one Indian language mostly reached readers of that language, so its reach was limited by language. R is true. Linking provinces needed other means, such as English-language papers and reports copied by editors elsewhere.',
}));
Q('tf_press_english', tf({
  t: 3, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? An English-language Indian newspaper in 1879 was outside the scope of the Vernacular Press Act.',
  sol: 'True. The Act covered newspapers in Indian languages, not those in English.',
}));
Q('s_press_two', short({
  t: 3, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'An imagined editor in 1880 prints in one issue a report on a revenue dispute in one province and a letter about the Arms Act from another. Explain one way this practice served nationalism that a local meeting could not, and one risk it carried for the editor under the law of the time.',
  model: '1. It put local grievances before readers in **many provinces**, so they began to see **shared problems**; a local meeting reached only those present.\n2. If the paper was in an **Indian language**, the government could act against it under the **Vernacular Press Act, 1878**.',
  sol: 'Shared problems across provinces; risk under the Vernacular Press Act.',
  scheme: [['Way the press served nationalism beyond a local meeting', 1], ['Risk under the Vernacular Press Act', 1]],
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
  stem: 'Read this imagined note by an official of 1878. *(Imagined note written by SOYL for practice; the person in it is not real.)* The official reports that papers in the local languages are read aloud at village gatherings and that other editors copy their reports. Using the note and your knowledge, explain three ways in which such papers worried the government, and why English papers were left out of the Vernacular Press Act.',
  model: '1. **Reading aloud** carried criticism to people who **could not read**, so the audience was far wider than the paper\'s sales.\n2. **Copying** by other editors spread a report across **regions**, building shared opinion.\n3. English papers were left out because the government judged their readers to be a **small, English-educated group**, less likely to rouse ordinary people.',
  sol: 'Reading aloud widens reach; copying links regions; English papers judged less dangerous.',
  scheme: [['Reading aloud widens the audience', 1], ['Copying spreads opinion across regions', 1], ['Why English papers were left out', 1]],
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
  t: 4, d: 3, c: 'analysis',
  stem: 'An imagined historian claims that Indians had no political organisation of their own before the Indian National Congress was founded in 1885. Which fact from this chapter best weakens the claim?',
  opts: [
    'The Indian Association had been founded in Calcutta in 1876 by Surendranath Banerjee and Ananda Mohan Bose',
    'The Arya Samaj had been founded in 1875',
    'The Ilbert Bill had been introduced in 1883',
    'A. O. Hume was a retired civil servant',
  ],
  sol: 'A political association run by Indians, the Indian Association (1876), existed before the Congress, which shows earlier organisation, though only in one region. The Arya Samaj was a reform body, the Ilbert Bill was a government measure, and Hume\'s career says nothing about earlier Indian organisations.',
}));
Q('ar_inc_unity', ar({
  t: 4, d: 3, c: 'analysis', verdict: 'both-true-not-explains',
  a: 'The first session of the Congress was attended by delegates from different provinces.',
  r: 'A. O. Hume was a retired member of the Indian Civil Service.',
  sol: 'Both are true, but R does not explain A: the all-India attendance reflected the aim of national unity and earlier regional associations, not Hume\'s former service.',
}));
Q('ar_inc_independence', ar({
  t: 4, d: 3, c: 'analysis', verdict: 'A-false-R-true',
  a: `The first session of the Congress had only ${FIRST_DELEGATES} delegates, which proves that it had little all-India character.`,
  r: 'The delegates came from different provinces of India.',
  sol: `A is false: the number was small, but what made the session all-India was where the delegates came from, and R is true. A small size does not prove a lack of all-India character.`,
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
  t: 4, d: 3, c: 'evaluation', marks: 2, wl: S2,
  stem: 'An imagined student says: "A. O. Hume was a British official, so the Congress cannot have been a genuine Indian movement." Give one fact that supports this view and one that weakens it.',
  model: '**Supports:** Hume, a retired **Indian Civil Service** officer, took the lead, and some writers see the Congress as a **safety valve**.\n**Weakens:** Indian leaders such as those of the **Indian Association (1876)** were already organising, and delegates from **many provinces** met under **W. C. Bonnerjee** in 1885.',
  sol: 'One fact for and one against the claim.',
  scheme: [['A fact that supports the claim', 1], ['A fact that weakens the claim', 1]],
}));
Q('s3_inc_why', short({
  t: 4, d: 4, c: 'analysis', marks: 3, wl: S3,
  stem: 'Read this imagined note written by SOYL for practice. *(Imagined note; the people in it are not real.)* In 1884 a lawyer in Calcutta, a teacher in Madras and a merchant in Bombay each belong to a local association. Each association sends its own petition to the government and receives its own polite reply. Using the note and one event of 1883, give three reasons why such a situation made an all-India body attractive.',
  model: '1. Each association spoke **alone**, so the government could treat every petition as a **local** matter.\n2. The **Ilbert Bill** controversy (1883) showed that **united, organised** protest could change government policy.\n3. The same grievances (the **Press Act**, **Arms Act** and **drain**) were **common** to all regions, so one **national voice** would be stronger than many separate petitions.',
  sol: 'Separate bodies speak alone; lesson of organised protest in 1883; common grievances need a national voice.',
  scheme: [['Separate bodies speak alone (from the note)', 1], ['Lesson of organised protest in 1883', 1], ['Common grievances need a national voice', 1]],
}));

// ================================================================ long (10-mark, 3 + 3 + 4)
Q('l_economic', long({
  t: 1, d: 3, c: 'analysis', marks: 10, wl: L10,
  stem: 'Answer the following about the economic causes of Indian nationalism.\n\n(i) Two imagined payments are made from Indian revenues in 1880: P, a pension paid in London to a retired British official, and Q, the wages of Indian labourers building a road in India. Decide which one an early nationalist would count in the "drain of wealth", and explain why. **[3]**\n(ii) Explain why the decline of handicrafts and a heavy land-revenue demand together pushed more families onto the land than either would have done alone. **[3]**\n(iii) "The famine of 1876–78 and the Delhi Durbar of 1877 together turned economic hardship into political anger." Assess how far this is a fair claim, and say what else was needed before hardship became nationalism. **[4]**',
  model: '(i) **P** is part of the **drain**: it is paid out of Indian revenues but spent in **Britain**, so wealth leaves India with **no return**. **Q** is not, because the wages are spent in India and stay in the Indian **economy**. The test used by **Dadabhai Naoroji** and others was where the money went.\n\n(ii) The decline of crafts drove **artisans**, who lost their market to cheap **British machine goods**, towards farming. A **heavy revenue** demand already pressed on peasants, so more people competing for **land** meant smaller holdings, more **debt** and more families in distress. Each cause worsened the other.\n\n(iii) It is **fair** in part: the **famine** brought real suffering, and holding the **Durbar** while it raged made many Indians see the government as **indifferent**. But hardship alone gives complaints, not a national movement. It also needed **organisation and a voice**: the **Press**, reformers who built **pride and unity**, and bodies such as the **Indian Association**, which led towards the **Congress**.',
  sol: 'Classify the payments by where the money goes; crafts and revenue combine; weigh the claim.',
  scheme: [['(i) Both payments classified correctly', 2], ['(i) Test of where the money goes', 1], ['(ii) Effect of the decline of crafts', 1], ['(ii) Revenue demand and the combined pressure', 2], ['(iii) The fair part of the claim', 2], ['(iii) What else was needed', 2]],
}));
Q('l_repression', long({
  t: 1, d: 3, c: 'analysis', marks: 10, wl: L10,
  stem: 'Answer the following about colonial policies that angered Indians.\n\n(i) An imagined newspaper owner in Madras prints the same criticism of the government in a Tamil edition and in an English edition in 1879. Explain what the Vernacular Press Act would allow the government to do in each case, and what this shows about the government\'s assumptions. **[3]**\n(ii) Compare the Arms Act and the Vernacular Press Act, both of 1878, in how each treated Indians and Europeans, and state the common principle that Indians saw in them. **[3]**\n(iii) The Ilbert Bill of 1883 was weakened after European protest. Assess the statement that "the controversy showed that Indians could not hope to change policy". **[4]**',
  model: '(i) The government could act against the **Tamil** edition, an **Indian-language** paper, but not against the **English** edition, though the criticism was the same. This shows that it judged **language** and not content, and assumed that Indian-language papers could rouse **ordinary readers** while English papers reached a smaller group.\n\n(ii) The **Arms Act** required **Indians** to hold licences and exempted **Europeans**; the **Press Act** curbed **Indian-language** papers and left **English** papers free. Indians saw in both the same principle: **unequal treatment** by race, with one rule for rulers and another for the ruled.\n\n(iii) The statement is **largely wrong**. The Bill was diluted, but it was **European** protest, **organised and united**, that made the government give way, and Indians learnt that **organised agitation** could influence policy and that they needed an **all-India organisation** of their own. One point **supports** the statement: the Bill was weakened in favour of Europeans, since Indians were not yet organised to shape the outcome.',
  sol: 'Press Act applied to a new case; comparison of the two Acts; assessment of a claim about the Ilbert Bill.',
  scheme: [['(i) Different treatment of each edition', 1], ['(i) Assumption behind it', 2], ['(ii) Comparison of the two Acts', 2], ['(ii) Common principle', 1], ['(iii) Points against the statement', 2], ['(iii) A point for it and a judgement', 2]],
}));
Q('l_reformers_a', long({
  t: 2, d: 2, c: 'analysis', marks: 10, wl: L10,
  stem: 'Answer the following about two social reformers.\n\n(i) Compare the main problem that Raja Rammohan Roy and Jyotiba Phule each set out to tackle, giving one action of each. **[3]**\n(ii) An imagined student says that Roy\'s campaign against sati and Phule\'s school for girls had nothing to do with politics. Explain one way in which each could still have prepared people for later political life. **[3]**\n(iii) In your view, whose work did more to widen the group of Indians who could take part in public life? Give two reasons. **[4]**',
  model: '(i) **Roy** tackled harmful practices within society, above all **sati**, banned in **1829**, and he also promoted **modern education**. **Phule** tackled **caste discrimination**, opening a **school for girls** in Pune with Savitribai Phule and founding the **Satyashodhak Samaj (1873)**. Roy aimed chiefly at reform of customs; Phule at the rights of the oppressed.\n\n(ii) Ending sati and spreading modern education taught people to question custom and use **reason**, a habit needed in public debate. Educating **girls** and lower castes gave groups who had been shut out a chance to read, speak and organise, so more people could later take part.\n\n(iii) **Phule** can be argued to have done more, because he worked directly for the **lower castes** and **girls**, the groups most excluded, and the **Satyashodhak Samaj** gave them an organisation. A reasoned case for **Roy** is also acceptable: his work for **modern education** and against sati reached educated men who became early leaders. Credit any choice with two supported reasons.',
  sol: 'Comparison of problems and actions; links to later political life; a reasoned choice.',
  scheme: [['(i) Roy: problem and action', 1], ['(i) Phule: problem and action', 1], ['(i) The comparison', 1], ['(ii) Roy', 1], ['(ii) Phule', 1], ['(ii) Link to later political life', 1], ['(iii) Choice', 1], ['(iii) Two supported reasons', 3]],
}));
Q('l_reformers_b', long({
  t: 2, d: 3, c: 'analysis', marks: 10, wl: L10,
  stem: 'Answer the following about two religious reformers.\n\n(i) A student says: "Dayananda\'s call to return to the Vedas shows that he wanted to undo reform, while Vivekananda\'s service work shows that he wanted to modernise." Assess this contrast, using one point from each reformer\'s work. **[3]**\n(ii) Vivekananda spoke at Chicago in 1893 and founded the Ramakrishna Mission in 1897; the Congress was founded in 1885. Could his work have influenced the founding of the Congress? Use the dates to explain, and say how his work might have influenced the movement later. **[3]**\n(iii) Compare the ways in which these two reformers built pride and self-confidence among Indians. **[4]**',
  model: `(i) The contrast is **too simple**. Dayananda used the **Vedas** as a basis for change: he opposed **caste by birth** and **child marriage** and backed **education**. Vivekananda's **Ramakrishna Mission** organised **social service**, but he also drew pride from India's **spiritual heritage**. Both joined **tradition** with reform.\n\n(ii) No. The Congress was founded in **${INC_FOUNDED}**, **${yearsBetween(INC_FOUNDED, 1893)} years before** the Chicago address (**1893**) and ${yearsBetween(INC_FOUNDED, 1897)} before the Mission (**1897**), so his work could not have influenced its founding. It could have strengthened the **self-confidence** of people who joined the national movement **later**.\n\n(iii) **Dayananda** built pride by turning Indians towards their **ancient Vedic heritage** and reforming society from within. **Vivekananda** built confidence by winning **respect abroad** for Indian thought and by linking **religion with service** to the poor. Both rejected the idea that Indians were **inferior**, which strengthened national feeling.`,
  sol: 'Assessment of a contrast; dates against the founding of the Congress; comparison.',
  scheme: [['(i) Dayananda point', 1], ['(i) Vivekananda point and judgement', 2], ['(ii) Dates and conclusion', 2], ['(ii) Later influence', 1], ['(iii) Dayananda\'s route to pride', 2], ['(iii) Vivekananda\'s route and common ground', 2]],
}));
Q('l_press', long({
  t: [3, 1], d: 3, c: 'analysis', marks: 10, wl: L10,
  stem: 'Answer the following about the Press and nationalism.\n\n(i) Kesari was in Marathi and linked with Tilak; The Hindu was in English and published in Madras. What does the choice of language suggest about the readers each paper wanted to reach? **[3]**\n(ii) Using the Vernacular Press Act and the Ilbert Bill controversy as examples, show how newspapers could turn a local issue into a shared one. **[3]**\n(iii) The Vernacular Press Act was repealed in 1882 after some papers had switched to English. Assess how far the Act achieved the government\'s aim. **[4]**',
  model: '(i) **Kesari**, in **Marathi**, aimed at readers in Maharashtra who did not read English, including people outside the English-educated group. **The Hindu**, in **English**, aimed at the educated readers of **Madras** and, through English, at educated readers elsewhere and at the government. The choice of language shows the audience each wanted.\n\n(ii) News of the **Press Act** in one place became a grievance for **Indian-language editors everywhere**, who reported and criticised it. The **Ilbert Bill** controversy, reported across the country, let readers in different regions see the same **racial attitude** and the value of **organised protest**.\n\n(iii) The Act **largely failed**. The government wished to restrain the **Indian-language** press, but papers such as **Amrita Bazar Patrika** switched to **English** and carried on, and the Act was **repealed by Ripon in 1882**. It did, however, show how much the government feared the press, and it drew more people into **political debate**.',
  sol: 'Language and audience; local issues made shared; assessment of the Act.',
  scheme: [['(i) Kesari and its audience', 1], ['(i) The Hindu and its audience', 1], ['(i) Inference about language and audience', 1], ['(ii) Press Act example', 1], ['(ii) Ilbert Bill example and the shared issue', 2], ['(iii) Evidence from the switch to English', 2], ['(iii) Repeal and judgement', 2]],
}));
Q('l_inc', long({
  t: 4, d: 2, c: 'recall', marks: 10, wl: L10,
  stem: 'Answer the following about the foundation of the Indian National Congress.\n\n(i) When, where and by whom was the Indian National Congress founded? **[3]**\n(ii) State three immediate objectives of the Congress. **[3]**\n(iii) Give details of the first two sessions of the Congress. **[4]**',
  model: `(i) It was founded on **28 December ${INC_FOUNDED}** at the **Gokuldas Tejpal Sanskrit College, Bombay**; **A. O. Hume**, a retired member of the Indian Civil Service, took the lead.\n\n(ii) To provide a **common platform** for nationalists from all parts of India; to promote **national unity** across region, religion and caste; to **formulate demands** and place them before the government; and to **train public opinion** (any three).\n\n(iii) **First session, Bombay, 1885:** presided over by **W. C. Bonnerjee**, attended by **${FIRST_DELEGATES} delegates**. **Second session, Calcutta, 1886:** presided over by **Dadabhai Naoroji**, with a much larger attendance.`,
  sol: 'Foundation; objectives; first two sessions.',
  scheme: [['(i) Date, place, founder', 3], ['(ii) Three objectives', 3], ['(iii) First session', 2], ['(iii) Second session', 2]],
}));
Q('l_inc_why', long({
  t: [4, 1], d: 4, c: 'evaluation', marks: 10, wl: L10,
  stem: 'Historians have long discussed why the Congress came into being in 1885.\n\n(i) A student says the Ilbert Bill controversy alone made an all-India organisation necessary. Using two other developments of the 1870s and 1880s, explain why this is incomplete. **[3]**\n(ii) Explain how the same fact, that Hume was a retired official who helped organise the first session, can be used both to support and to question the "safety-valve" theory. **[3]**\n(iii) Present one argument that supports and one argument that questions the safety-valve theory, and state which you find more convincing. **[4]**',
  model: '(i) The **Ilbert Bill** controversy (1883) did teach the power of organised protest, but it was not enough alone. The **repressive measures** of Lytton (Press Act, Arms Act) gave Indians **common grievances** across regions, and **regional associations** such as the **Indian Association (1876)** had shown the value of organisation but needed a **national** body.\n\n(ii) **Supports:** Hume was a former **official** who, on this theory, wanted a **safety valve** to let **discontent** out peacefully, so that it would not turn into a violent outbreak like **1857**. **Questions:** the same fact shows that an experienced official was willing to help, and **Indian leaders** who were **already organising** could use his standing to win a **legitimate national platform**.\n\n(iii) **Supports:** Hume was a former **official** who worried about unrest, and the early Congress was **moderate** and loyal in tone. **Questions:** Indian leaders were **already organising** and **used** Hume\'s help to gain a **legitimate national platform**; the Congress soon became a **vehicle of nationalism**. A balanced answer may find the second more convincing because the Congress grew far beyond any safety-valve purpose; either view earns credit if reasoned.',
  sol: 'Why one development is not enough; one fact read two ways; balanced evaluation.',
  scheme: [['(i) Credits the Ilbert Bill lesson', 1], ['(i) Two other developments, explained', 2], ['(ii) The fact used to support the theory', 1], ['(ii) The same fact used to question it, with reason', 2], ['(iii) Supporting argument', 1], ['(iii) Questioning argument', 1], ['(iii) Reasoned judgement', 2]],
}));
Q('l_factors', long({
  t: [1, 2, 3], d: 4, c: 'analysis', marks: 10, wl: L10,
  stem: 'Study the hub diagram of the factors behind Indian nationalism and answer the questions that follow.\n\n(i) Identify any three factors shown and give one example of each. **[3]**\n(ii) Suppose there had been no newspapers. Explain why economic and political grievances in different provinces would then have been less likely to produce one national feeling. **[3]**\n(iii) Which factor do you think did most to make Indians feel that they were one nation? Give reasons. **[4]**',
  model: '(i) **Economic exploitation:** the drain of wealth. **Repressive policies:** the Arms Act, 1878. **Reform movements:** the Arya Samaj\'s call for education and an end to caste by birth.\n\n(ii) Without newspapers, a grievance such as heavy **revenue** in one province or the **Arms Act** would have been known mostly **locally**, so each region would have seen its trouble as its own. Papers **reported** them, **criticised** policy and carried the **ideas of reformers** to readers in **many regions**, turning separate complaints into a **shared national argument**.\n\n(iii) Any factor with reasons; for example, **repressive racial laws** affected Indians of **every region and class alike**, so they made people feel they shared a **common position** under foreign rule. Credit any reasoned choice with two supporting points.',
  sol: 'Factors with examples; role of the Press; reasoned choice.',
  scheme: [['(i) Three factors with examples', 3], ['(ii) Why grievances would stay local without the Press', 3], ['(iii) Choice', 1], ['(iii) Reasons', 3]],
  assets: [factorsSvg('Hub diagram: the rise of Indian nationalism in the centre, linked to four boxes: economic exploitation (drain, ruined crafts, revenue), repressive policies (Lytton, Press Act, Arms Act), reform movements (self-respect and unity) and the Press (ideas reached many readers)', 'Four factors behind nationalism.')],
}));

// ================================================================ source-based
Q('sb_weaver_letter', source({
  t: [1, 3], d: 4, c: 'analysis', origin: 'soyl-original',
  stem: `Read the extract from an imagined letter to a newspaper and answer the questions that follow. ${IMAG}`,
  passage: '**Letter to the editor of an imagined Bengali weekly, 1879**\n\nSir, my family has woven fine cloth in this village for five generations. Today the bazaar is full of mill cloth from across the sea, and our looms stand idle. My son now works as a labourer on another man\'s field, and still the revenue officer comes at the same time every year. Last month your paper was forced to stop printing in our own tongue, and now I read it in English with my nephew\'s help. Who will tell the government of our troubles if our newspapers cannot speak?',
  parts: [
    child('a', short({ t: 1, d: 1, c: 'understanding', marks: 1, stem: 'Which economic problem does the weaver describe in the first two sentences?', model: 'The **ruin of handicrafts** caused by cheap **machine-made British cloth**.', sol: 'Decline of handloom weaving.', scheme: [['Ruin of handicrafts', 1]] })),
    child('b', short({ t: 3, d: 3, c: 'application', marks: 1, stem: 'The paper now appears in English. Which feature of the Vernacular Press Act of 1878 explains why a switch of language let the paper go on appearing?', model: 'The Act covered only newspapers in **Indian languages**, so an **English** paper fell outside it.', sol: 'The Act applied to Indian-language papers only.', scheme: [['Act covered Indian-language papers only', 1]] })),
    child('c', short({ t: [1, 3], d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Explain how the letter shows both economic hardship and political grievance working together to create discontent.', model: 'The weaver has lost his **livelihood** and still pays **revenue**, which is economic hardship; when the **press is silenced**, he loses the way to make his complaint heard, which is a **political** grievance. Together they make him feel the government ignores **Indians**.', sol: 'Link economic loss to the loss of a voice.', scheme: [['Economic hardship', 1], ['Political grievance and link', 1]] }), [
      short({ t: 3, d: 3, c: 'evaluation', marks: 2, stem: '**Or** (ii): The letter comes from one weaver. Explain one way a letter like this could help build shared opinion among readers elsewhere, and one limit of using it alone as evidence for the condition of all weavers.', model: 'Printed in a newspaper, it lets readers in **other places** learn of the problem and see it as **shared**. As evidence it is **limited**: it is the account of **one** weaver, so it cannot show how widespread the distress was.', sol: 'Shared opinion; limit as evidence.', scheme: [['Way it builds shared opinion', 1], ['Limit as evidence', 1]] }),
    ]),
  ],
}));
Q('sb_delegate_diary', source({
  t: 4, d: 3, c: 'application', origin: 'soyl-original',
  stem: `Read the extract from the imagined diary of a delegate and answer the questions that follow. ${IMAG}`,
  passage: '**Diary of an imagined delegate from Madras, December 1885**\n\nWe were told to go to Poona, but sickness in that city sent us all to Bombay instead. In the hall of a Sanskrit college I sat beside a lawyer from Calcutta and a teacher from Lahore; we had never met, yet within an hour we were speaking of the same grievances. A Calcutta barrister was in the chair. The retired Englishman who had written so many letters to bring us together sat quietly at the side. We counted ourselves: a little over seventy.',
  parts: [
    child('a', short({ t: 4, d: 1, c: 'recall', marks: 1, stem: 'Which organisation\'s first session is the delegate describing?', model: 'The **Indian National Congress** (first session, **Bombay, 1885**).', sol: 'First Congress session.', scheme: [['Indian National Congress', 1]] })),
    child('b', short({ t: 4, d: 3, c: 'application', marks: 1, stem: 'Give one detail in the diary that shows this is not the second session, held in 1886.', model: 'It met in **Bombay**, whereas the second session met in **Calcutta** (also acceptable: about **seventy-two** delegates, or the chair being **Bonnerjee** and not Naoroji).', sol: 'Venue, numbers or chair.', scheme: [['A detail that places the diary in 1885', 1]] })),
    child('c', short({ t: 4, d: 3, c: 'application', marks: 2, stem: '**Either** (i): Which immediate objective of the Congress is reflected in the meeting of delegates from Madras, Calcutta and Lahore? Explain.', model: 'The objective of **national unity** and a **common platform**: people from distant regions met, found **shared grievances**, and began to think of themselves as members of **one nation**.', sol: 'National unity and a common platform.', scheme: [['Objective named', 1], ['Explanation from the diary', 1]] }), [
      short({ t: 4, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): The diarist notes that the retired Englishman "sat quietly at the side". Suggest one reason this detail might matter to delegates who wanted the new body to survive, and one way a critic might read the same detail differently.', model: 'Delegates could value it because a **retired official** in the background made the body look **less threatening** to the government. A critic could read it as a sign that the body was **guided by a British official**, which links to the **safety-valve** view.', sol: 'Reason delegates valued it; a critic\'s reading.', scheme: [['Reason delegates valued it', 1], ['A critic\'s reading', 1]] }),
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
    child('b', short({ t: [2, 4], d: 3, c: 'application', marks: 1, stem: 'A student says the founding of the Brahmo Samaj and the Ilbert Bill controversy were close enough in time for one to have caused the other. Use the dates on the timeline to explain why this is unlikely.', model: `The Brahmo Samaj was founded in **1828** and the Ilbert Bill came in **1883**, **${yearsBetween(1828, 1883)} years** later, too far apart for one to have caused the other.`, sol: `1883 − 1828 = ${yearsBetween(1828, 1883)} years.`, scheme: [['Dates used to show the gap', 1]] })),
    child('c', short({ t: [2, 4], d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Using two events from the timeline, show how reform and political grievance came together before 1885.', model: 'The **Arya Samaj (1875)** built pride and self-confidence, while the **Vernacular Press Act (1878)** gave a common **political grievance**; by **1885** people with this new confidence and these grievances came together in the **Congress**.', sol: 'One reform event and one political event linked to 1885.', scheme: [['Reform event used', 1], ['Political event used and linked', 1]] }), [
      short({ t: [1, 4], d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Could the Ilbert Bill controversy have helped to cause the founding of the Arya Samaj? Use the timeline to answer, and name one other event on it that could have influenced the founding of the Congress in 1885.', model: `No: the **Arya Samaj** was founded in **1875**, ${yearsBetween(1875, 1883)} years before **1883**, so the controversy cannot have caused it. The **Press Act** (**1878**) or the **Ilbert Bill** (**1883**) came before 1885 and could have influenced the Congress.`, sol: 'Chronology rules it out; an earlier event named.', scheme: [['Chronology applied to the Arya Samaj', 1], ['A suitable earlier event named', 1]] }),
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
  t: 2, d: 2, c: 'understanding',
  stem: 'An imagined reform society of the 1870s opens schools, rejects caste by birth and asks its members to study the Vedas. Which real organisation does it most resemble?',
  opts: ['The Arya Samaj', 'The Ramakrishna Mission', 'The Indian National Congress', 'The Satyashodhak Samaj'],
  sol: 'Schools, rejection of caste by birth and a return to the Vedas are features of the Arya Samaj. The Ramakrishna Mission stressed service, the Congress was political, and the Satyashodhak Samaj did not base itself on the Vedas.',
}));
Q('m_press_language', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Why did newspapers in Indian languages matter especially for the spread of nationalism?',
  opts: ['They reached people who could not read English', 'They were read only by British officials', 'They were free of all government rules at all times', 'They printed no political news'],
  sol: 'Indian-language papers carried political ideas beyond the small English-educated group, to traders, teachers and villagers. The other options are false.',
}));
Q('m_inc_platform', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'Why is the founding of the Indian National Congress seen as a turning point in Indian politics?',
  opts: ['It gave nationalists from all regions one common platform for the first time', 'It immediately ended British rule', 'It replaced all regional associations by law', 'It was the first organisation of any kind in India'],
  sol: 'For the first time, nationalists from all over India had a single all-India body. It did not end British rule, did not abolish regional associations, and was not the first organisation in India.',
}));
Q('tf_inc_poona', tf({
  t: 4, d: 2, c: 'recall', ans: true,
  stem: 'True or false? The first session of the Congress had been planned for Poona but was moved to Bombay.',
  sol: 'True. An outbreak of disease in Poona led to the session being held in Bombay.',
}));
