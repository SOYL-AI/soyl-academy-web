// ICSE 10 History & Civics, ch11 Mahatma Gandhi and the Mass Movements — question bank.
// Every letter, diary, bulletin and quiz scenario is imagined and written by SOYL and labelled as imagined; no textbook
// text, box or exercise and no specimen or board-paper item is reused (D-036). No speech or writing of any historical
// person is quoted: ideas are paraphrased and attributed (the two-word slogan of 1942 is named as a slogan only).
// Wording is neutral and humane; no casualty figures are given for Jallianwala Bagh. Facts are stable, widely taught
// dates and names, listed for review in the README. Clauses of the Simon Commission and of the Cripps proposals are
// removed from the syllabus and are not tested.
import assert from 'node:assert/strict';
import { Q, mcq, ar, tf, fb, match, ord, short, long, source, child, Svg } from '../../icse-10-history-civics-ch01/src/lib.mjs';

const S2 = [25, 45];
const S3 = [40, 70];
const L10 = [120, 220];
const IMAG = '*(Imagined document written by SOYL for practice; the people in it are not real.)*';

// ---------------------------------------------------------------- dates used in items (asserted)
export const EVENTS = [
  [1919, 'Rowlatt Act; Jallianwala Bagh'],
  [1920, 'Non-Cooperation begins'],
  [1922, 'Chauri Chaura; movement suspended'],
  [1928, 'Simon Commission boycotted'],
  [1929, 'Lahore: Purna Swaraj'],
  [1930, 'Dandi March'],
  [1931, 'Gandhi-Irwin Pact'],
  [1932, 'Movement renewed'],
  [1934, 'Movement withdrawn'],
  [1942, 'Quit India Resolution'],
];
for (let i = 1; i < EVENTS.length; i++) assert.ok(EVENTS[i][0] > EVENTS[i - 1][0], 'events in date order');
// Dandi March: left Sabarmati on 12 March 1930, reached Dandi on 5 April, broke the salt law on 6 April.
export const DANDI = { start: Date.UTC(1930, 2, 12), reach: Date.UTC(1930, 3, 5), salt: Date.UTC(1930, 3, 6) };
export const DANDI_DAYS = Math.round((DANDI.reach - DANDI.start) / 86400000);
assert.equal(DANDI_DAYS, 24);
assert.equal(Math.round((DANDI.salt - DANDI.start) / 86400000), 25);
export const yearsBetween = (a, b) => b - a;
assert.equal(yearsBetween(1920, 1922), 2);
assert.equal(yearsBetween(1930, 1942), 12);

/** A horizontal timeline from 1918 to 1944 with labels in lanes (theme colours only). */
export function timelineSvg(alt, caption) {
  const W = 780, H = 300, x0 = 40, x1 = 740, y = 150, a = 1918, b = 1944;
  const X = (yr) => x0 + ((yr - a) / (b - a)) * (x1 - x0);
  const s = new Svg(W, H);
  s.line(x0, y, x1, y, { sw: 2 });
  for (const yr of [1920, 1925, 1930, 1935, 1940]) s.line(X(yr), y - 5, X(yr), y + 5, { sw: 1.2, color: 'muted' });
  s.text(X(1918), y + 18, '1918', { size: 11, muted: true, anchor: 'start' });
  s.text(X(1944), y + 18, '1944', { size: 11, muted: true, anchor: 'end' });
  const lanes = [-30, 34, -62, 66, -94, 98, -126, 130, -30, 34];
  EVENTS.forEach(([yr, label], i) => {
    const dy = lanes[i];
    const px = X(yr);
    s.line(px, y, px, y + dy + (dy < 0 ? 8 : -8), { sw: 1, color: 'muted' });
    s.dot(px, y, 4, i % 2 ? 'blue' : 'accent');
    const anchor = px > 600 ? 'end' : px < 160 ? 'start' : 'middle';
    s.text(px, y + dy, `${yr} ${label}`, { size: 11, color: i % 2 ? 'blue' : 'accent', anchor });
  });
  return s.visual(alt, caption);
}

/** The Dandi March as a schematic line from Sabarmati to the coast (not a map; not to scale). */
export function dandiSvg(alt, caption) {
  const s = new Svg(560, 320);
  s.rect(20, 20, 520, 280, { rx: 12, fill: 'fill', fillOpacity: 0.25, color: 'muted', sw: 1 });
  s.line(150, 70, 360, 250, { sw: 2.4, dash: true, color: 'accent' });
  s.dot(150, 70, 7, 'blue');
  s.dot(360, 250, 7, 'green');
  s.text(170, 58, 'Sabarmati Ashram, Ahmedabad', { size: 12, bold: true, anchor: 'start' });
  s.text(170, 78, 'Start: 12 March 1930', { size: 11, anchor: 'start' });
  s.text(340, 232, 'Dandi (coast)', { size: 12, bold: true, anchor: 'end' });
  s.text(340, 270, 'Salt law broken: 6 April 1930', { size: 11, anchor: 'end' });
  s.text(300, 140, `About 385 km on foot in ${DANDI_DAYS} days`, { size: 11, color: 'accent', anchor: 'start' });
  s.text(280, 290, 'Schematic only: not a map, not to scale', { size: 10, muted: true });
  return s.visual(alt, caption);
}

// ================================================================ t01 Non-Cooperation: causes and programme
Q('m_khilafat_issue', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'The Khilafat Movement in India (1919–24) was mainly concerned with which issue?',
  opts: ['The treatment of the Ottoman Sultan, regarded as the Caliph, and of Turkey after the First World War', 'The partition of Bengal into two provinces', 'The demand for separate electorates in provincial councils', 'The price of salt in British India'],
  sol: 'Indian Muslims who joined the Khilafat Movement protested against the harsh treatment of Turkey and of its Sultan, whom they regarded as the Caliph. Partition, separate electorates and salt belong to other episodes.',
}));
Q('m_ali_brothers', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Which two brothers are best known as leaders of the Khilafat Movement?',
  opts: ['Muhammad Ali and Shaukat Ali', 'Motilal Nehru and Jawaharlal Nehru', 'C. R. Das and J. M. Sen Gupta', 'Vallabhbhai Patel and Vithalbhai Patel'],
  sol: 'The Ali brothers led the Khilafat Committee and joined hands with Gandhiji. The Nehrus were father and son; Das and Sen Gupta were Bengal leaders; the Patels were brothers but not Khilafat leaders.',
}));
Q('m_rowlatt_feature', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Which provision of the Rowlatt Act of 1919 caused the widest anger in India?',
  opts: ['Persons could be arrested and kept in prison without a trial', 'Indians were given a majority in the councils', 'Salt could be made freely by anyone', 'Indian judges could try British subjects'],
  sol: 'The Act gave the government power to detain people without trial and to hold trials without the usual safeguards. The other options are either unrelated or the opposite of what the Act did.',
}));
Q('m_rowlatt_scenario', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'In an imagined story set in 1919, a printer in Lahore is picked up by the police and held for months without any case being heard in court. Under which law of that year could this have happened?',
  opts: ['The Rowlatt Act', 'The Vernacular Press Act', 'The Indian Councils Act', 'The Government of India Act, 1935'],
  sol: 'Detention without trial was the feature of the Rowlatt Act passed in March 1919. The Vernacular Press Act was of 1878, the Indian Councils Act of 1909, and the 1935 Act came much later.',
}));
Q('m_jallianwala_date', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'On what date did the firing at Jallianwala Bagh in Amritsar take place?',
  opts: ['13 April 1919', '6 April 1919', '12 March 1930', '8 August 1942'],
  sol: 'The firing took place on 13 April 1919, the day of the Baisakhi festival. 6 April 1919 was the day of the nationwide hartal against the Rowlatt Act; the other dates belong to the Dandi March and the Quit India Resolution.',
}));
Q('m_hunter', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'Which committee did the government appoint to inquire into the disturbances in Punjab, including the firing at Jallianwala Bagh?',
  opts: ['The Hunter Committee', 'The Simon Commission', 'The Cripps Mission', 'The Cabinet Mission'],
  sol: 'The Hunter Committee was appointed in 1919 to look into the Punjab disturbances. The Simon Commission (1927), the Cripps Mission (1942) and the Cabinet Mission (1946) had other purposes.',
}));
Q('m_tagore', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Which poet gave up the knighthood conferred on him by the British government in protest against the Jallianwala Bagh tragedy?',
  opts: ['Rabindranath Tagore', 'Subramania Bharati', 'Muhammad Iqbal', 'Sarojini Naidu'],
  sol: 'Rabindranath Tagore renounced his knighthood in protest. The other poets are famous, but this act of protest is associated with Tagore.',
}));
Q('m_ncm_sessions', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'The Congress approved the Non-Cooperation programme at a special session in 1920 and confirmed it at its annual session later that year. Which pair of places is correct?',
  opts: ['Calcutta (September) and Nagpur (December)', 'Lahore (December) and Karachi (March)', 'Lucknow (December) and Surat (December)', 'Bombay (August) and Delhi (March)'],
  sol: 'The special session at Calcutta in September 1920 accepted the programme, and the Nagpur session in December 1920 confirmed it. Lahore 1929, Lucknow 1916, Surat 1907 and Bombay 1942 belong to other events.',
}));
Q('m_negative_item', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Sort these actions of 1920–21. Which one belongs to the boycott (negative) side of the Non-Cooperation programme?',
  opts: ['Lawyers giving up practice in the British law courts', 'Opening a national school in a town', 'Spinning yarn on the charkha at home', 'Settling village disputes through panchayats'],
  sol: 'Giving up the government courts is a boycott item. National schools, the charkha and panchayats are constructive items that built Indian alternatives.',
}));
Q('m_positive_item', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'A village group in 1921 decides to do something that builds rather than boycotts. Which action fits the constructive (positive) side of the Non-Cooperation programme?',
  opts: ['Promoting khadi and hand-spinning', 'Returning a title given by the government', 'Refusing to attend a government function', 'Withdrawing children from a government school'],
  sol: 'Promoting khadi was constructive. Returning titles, avoiding government functions and leaving government schools were boycott items.',
}));
Q('m_student_1921', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Kamala, a character in an imagined story set in 1921, leaves her government-run college and joins a newly opened national college. Which programme was she following?',
  opts: ['The Non-Cooperation Movement', 'The Quit India Movement', 'The Swadeshi Movement of 1905', 'The Civil Disobedience Movement of 1932'],
  sol: 'Leaving government institutions for national ones was part of the Non-Cooperation programme of 1920–22. The 1905 Swadeshi Movement came earlier and the other two came later.',
}));
// ================================================================ t02 Suspension and impact
Q('m_chauri_place', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'Chauri Chaura, where a police station was set on fire in February 1922, is in which present-day State?',
  opts: ['Uttar Pradesh (Gorakhpur district)', 'Punjab (Amritsar district)', 'Gujarat (Navsari district)', 'Bihar (Champaran district)'],
  sol: 'Chauri Chaura is in the Gorakhpur district of Uttar Pradesh. Amritsar, Navsari (near Dandi) and Champaran are linked with other events.',
}));
Q('m_suspend_reason', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Why did Gandhiji call off the Non-Cooperation Movement in February 1922?',
  opts: ['A crowd had turned violent at Chauri Chaura, and he held that the movement must stay non-violent', 'The British had granted complete independence', 'The Khilafat leaders had asked him to join the councils', 'The Simon Commission had accepted Indian demands'],
  sol: 'The violence at Chauri Chaura went against his principle of non-violence, so he suspended the movement (the Bardoli resolution of the Congress Working Committee followed). The other options did not happen.',
}));
Q('m_swaraj_party', mcq({
  t: 2, d: 2, c: 'recall',
  stem: 'After the suspension of Non-Cooperation, which two leaders formed the Swaraj Party to contest elections to the councils?',
  opts: ['C. R. Das and Motilal Nehru', 'Bal Gangadhar Tilak and Bipin Chandra Pal', 'Subhas Chandra Bose and Jawaharlal Nehru', 'Rajendra Prasad and Vallabhbhai Patel'],
  sol: 'C. R. Das and Motilal Nehru formed the Swaraj Party in 1923 to work from inside the councils. Tilak had died in 1920; the other pairs were not its founders.',
}));
Q('m_ncm_mass', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'Which observation best supports the view that Non-Cooperation turned the national movement into a mass movement?',
  opts: ['Peasants, workers, students and women in many regions took part, not only educated townspeople', 'The Congress held its sessions in December every year', 'The government appointed several committees', 'Some leaders later formed a new party'],
  sol: 'A mass movement means wide participation across classes and regions, which is what Non-Cooperation brought. Annual sessions, committees and a new party do not show mass participation.',
}));
// ================================================================ t03 Civil Disobedience: causes, Dandi, programme
Q('m_simon_boycott', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Why did the Congress boycott the Simon Commission when it arrived in India in 1928?',
  opts: ['All its members were British; no Indian had been included', 'It had come to announce independence', 'It was led by Gandhiji himself', 'It wanted to abolish the salt tax'],
  sol: 'The Commission, set up in 1927 to review the working of the reforms, had no Indian member, which Indians took as an insult. The other options are false.',
}));
Q('m_lahore_president', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'Who presided over the Lahore session of the Congress in December 1929, where Purna Swaraj was adopted as the goal?',
  opts: ['Jawaharlal Nehru', 'Motilal Nehru', 'Subhas Chandra Bose', 'Sardar Vallabhbhai Patel'],
  sol: 'Jawaharlal Nehru presided at Lahore in 1929. Motilal Nehru had presided at Calcutta in 1928; Bose and Patel presided over later sessions.',
}));
Q('m_jan26', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'Following the Lahore resolution, which day was observed across India as Independence Day for the first time?',
  opts: ['26 January 1930', '15 August 1930', '6 April 1930', '31 December 1929'],
  sol: 'The first Independence Day was observed on 26 January 1930. 31 December 1929 was when the flag was hoisted at Lahore; 6 April 1930 was the day the salt law was broken at Dandi.',
}));
Q('m_dandi_start', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'From where did Gandhiji begin the Salt March on 12 March 1930?',
  opts: ['Sabarmati Ashram, Ahmedabad', 'Wardha', 'Champaran', 'Bardoli'],
  sol: 'The march began at Sabarmati Ashram in Ahmedabad and ended at Dandi on the coast. The other places are linked with other phases of his work.',
}));
Q('m_salt_choice', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: 'Why did salt make an effective symbol for starting the Civil Disobedience Movement?',
  opts: ['Every household needed salt, so a tax on it touched rich and poor alike and was easy to break openly', 'Salt was produced only in Bombay', 'Salt was a luxury item bought by a few', 'The British had already removed the salt tax'],
  sol: 'Because everyone used salt, the tax on it was felt by all, and making salt from sea water was a simple, visible way to break the law. The other options are untrue.',
}));
Q('m_cdm_vs_ncm', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: 'Which statement best brings out the main difference between Civil Disobedience and Non-Cooperation?',
  opts: ['Civil Disobedience asked people to break chosen laws; Non-Cooperation asked them to stop cooperating with the government', 'Civil Disobedience was violent; Non-Cooperation was peaceful', 'Only Non-Cooperation had a constructive programme', 'Civil Disobedience was limited to Punjab'],
  sol: 'Civil Disobedience went further by deliberately breaking laws such as the salt law; Non-Cooperation mainly withdrew cooperation. Both were meant to be non-violent and both spread widely.',
}));
Q('m_khudai', mcq({
  t: 3, d: 2, c: 'recall',
  stem: 'The Khudai Khidmatgars, who joined Civil Disobedience in the North-West Frontier Province, were led by',
  opts: ['Khan Abdul Ghaffar Khan', 'Maulana Abul Kalam Azad', 'Muhammad Ali', 'Hakim Ajmal Khan'],
  sol: 'Khan Abdul Ghaffar Khan led the Khudai Khidmatgars, a non-violent organisation of the Frontier region. The others were national leaders in other roles.',
}));
// ================================================================ t04 Impact, Gandhi-Irwin Pact, Round Table, renewal
Q('m_pact_year', mcq({
  t: 4, d: 1, c: 'recall',
  stem: 'In which month and year did Gandhiji and Lord Irwin sign their agreement?',
  opts: ['March 1931', 'March 1930', 'December 1931', 'August 1942'],
  sol: 'The Gandhi-Irwin Pact was signed on 5 March 1931. March 1930 was the start of the Dandi March; December 1931 the end of the Second Round Table Conference.',
}));
Q('m_pact_term', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'Under the Gandhi-Irwin Pact, what did the government agree to do?',
  opts: ['Release political prisoners not charged with violence', 'Grant India complete independence at once', 'Abolish the post of Viceroy', 'Hand over the railways to the Congress'],
  sol: 'Release of political prisoners who had not used violence was one of the government\'s promises in the Pact, along with withdrawing ordinances and permitting salt-making for home use on the coast. Independence, ending the Viceroy\'s post and handing over railways were never part of it.',
}));
Q('m_rtc_rep', mcq({
  t: 4, d: 1, c: 'recall',
  stem: 'Who was the only representative of the Congress at the Second Round Table Conference in London in 1931?',
  opts: ['Mahatma Gandhi', 'Jawaharlal Nehru', 'Sarojini Naidu', 'Motilal Nehru'],
  sol: 'Gandhiji attended as the sole Congress representative. The Congress did not attend the first conference.',
}));
Q('m_rtc_fail', mcq({
  t: 4, d: 3, c: 'analysis',
  stem: 'On which question did the Second Round Table Conference mainly break down?',
  opts: ['How minority communities were to be represented in the new constitution', 'Whether the Viceroy should live in Delhi', 'The design of the national flag', 'The date of the next general election in Britain'],
  sol: 'The talks failed mainly over the representation of minorities, on which no agreement could be reached. The other options were not the issue.',
}));
Q('m_renew_scenario', mcq({
  t: 4, d: 2, c: 'application',
  stem: 'An imagined diary entry from January 1932 reads: "Bapu is back from London with nothing. Today he and many others were arrested, and the Congress has been declared unlawful." Which development does it describe?',
  opts: ['The renewal of Civil Disobedience after the Second Round Table Conference', 'The start of Non-Cooperation in 1920', 'The suspension after Chauri Chaura', 'The Quit India Resolution'],
  sol: 'On his return in December 1931 the movement was renewed; the government, under Lord Willingdon, arrested leaders and banned the Congress in January 1932. The other events fall in 1920, 1922 and 1942.',
}));
// ================================================================ t05 Quit India
Q('m_cripps_year', mcq({
  t: 5, d: 1, c: 'recall',
  stem: 'In which year did the Cripps Mission come to India?',
  opts: ['1942', '1939', '1946', '1928'],
  sol: 'The Cripps Mission came in March 1942. 1939 was the start of the Second World War, 1946 the Cabinet Mission and 1928 the Simon Commission.',
}));
Q('m_quit_place', mcq({
  t: 5, d: 1, c: 'recall',
  stem: 'Where was the Quit India Resolution passed on 8 August 1942?',
  opts: ['At Gowalia Tank in Bombay', 'At Sabarmati Ashram', 'At Lahore', 'At Wardha'],
  sol: 'The All India Congress Committee passed the resolution at Gowalia Tank (now August Kranti Maidan) in Bombay. Wardha was where the Working Committee had drafted it earlier.',
}));
Q('m_japan', mcq({
  t: 5, d: 3, c: 'analysis',
  stem: 'Why did the Japanese advance of 1942 add urgency to the demand that the British should leave India?',
  opts: ['Japanese forces had reached Burma, and many felt that India could defend itself better if it were free', 'Japan had promised to grant India independence', 'Japan had joined the Indian National Congress', 'The British had already left Burma peacefully'],
  sol: 'With Japan at Burma, near India\'s borders, leaders argued that a free India would defend itself with more strength than a subject one. The other options are untrue.',
}));
Q('m_leaderless', mcq({
  t: 5, d: 3, c: 'analysis',
  stem: 'The top Congress leaders were arrested early on 9 August 1942, yet protests spread across India. What best explains this?',
  opts: ['People acted on their own, and leaders who escaped arrest guided the movement from hiding', 'The government asked the people to protest', 'The movement had been planned to last only one day', 'The Muslim League led the protests'],
  sol: 'With the leaders in jail, the movement became spontaneous; ordinary people and underground leaders kept it going. The other options are false.',
}));
Q('m_parallel', mcq({
  t: 5, d: 2, c: 'recall',
  stem: 'During Quit India, people set up their own parallel governments for a time in some areas. Which group of places is correct?',
  opts: ['Ballia, Tamluk and Satara', 'Dandi, Bardoli and Kheda', 'Lahore, Karachi and Lucknow', 'Surat, Poona and Madras'],
  sol: 'Parallel governments were set up in Ballia (UP), Tamluk (Bengal) and Satara (Maharashtra). The other places are linked with other events.',
}));
Q('m_aruna', mcq({
  t: 5, d: 2, c: 'recall',
  stem: 'Who hoisted the national flag at Gowalia Tank on 9 August 1942 after the leaders had been arrested?',
  opts: ['Aruna Asaf Ali', 'Annie Besant', 'Kasturba Gandhi', 'Vijaya Lakshmi Pandit'],
  sol: 'Aruna Asaf Ali hoisted the flag and became a symbol of the movement. Annie Besant had died in 1933; the others played different roles.',
}));
// ---------------------------------------------------------------- check-slide items (kept out of the tests)
Q('m_check_bardoli', mcq({
  t: 2, d: 2, c: 'recall',
  stem: 'The Congress Working Committee resolution that suspended Non-Cooperation in February 1922 is named after which place?',
  opts: ['Bardoli', 'Chauri Chaura', 'Nagpur', 'Amritsar'],
  sol: 'The Working Committee met at Bardoli and passed the resolution suspending the movement. Chauri Chaura was the place of the violence.',
}));
Q('m_check_dandi_days', mcq({
  t: 3, d: 2, c: 'application',
  stem: `Gandhiji left Sabarmati on 12 March 1930 and reached Dandi on 5 April 1930. About how many days was the march?`,
  opts: [`${DANDI_DAYS} days`, '12 days', '40 days', '6 days'],
  sol: `From 12 March to 5 April is 19 days of March plus 5 of April, that is ${DANDI_DAYS} days. The salt law was broken the next morning, 6 April.`,
}));

// ---------------------------------------------------------------- assertion-reason
Q('ar_rowlatt', ar({
  t: 1, d: 2, c: 'analysis', verdict: 'both-true-explains',
  a: 'The Rowlatt Act of 1919 was opposed across India.',
  r: 'It allowed the government to keep people in prison without a trial.',
  sol: 'Both are true, and R explains A: detention without trial took away a basic safeguard, which is why the Act was resisted with a nationwide hartal.',
}));
Q('ar_chauri', ar({
  t: 2, d: 3, c: 'analysis', verdict: 'A-true-R-false',
  a: 'Gandhiji called off the Non-Cooperation Movement in February 1922.',
  r: 'He believed that India had already won swaraj by then.',
  sol: 'A is true. R is false: he called it off because of the violence at Chauri Chaura, not because swaraj had been won.',
}));
Q('ar_simon', ar({
  t: 3, d: 2, c: 'analysis', verdict: 'both-true-explains',
  a: 'The Congress boycotted the Simon Commission.',
  r: 'The Commission did not include a single Indian member.',
  sol: 'Both are true, and R explains A: the all-British membership was seen as an insult, so the Commission was met with protests and boycott.',
}));
Q('ar_salt', ar({
  t: 3, d: 3, c: 'analysis', verdict: 'A-false-R-true',
  a: 'The salt tax was felt only by the rich, who bought salt in large quantities.',
  r: 'Salt was a daily necessity used by every household.',
  sol: 'A is false: the tax fell on everyone, and the poor felt it most. R is true, and it is exactly why salt was chosen as a symbol.',
}));
Q('ar_rtc', ar({
  t: 4, d: 3, c: 'analysis', verdict: 'both-true-not-explains',
  a: 'The Congress did not take part in the First Round Table Conference.',
  r: 'Gandhiji attended the Second Round Table Conference as the only Congress representative.',
  sol: 'Both are true, but R does not explain A: the Congress stayed away from the first conference because Civil Disobedience was in progress; R describes the second conference.',
}));
Q('ar_quit', ar({
  t: 5, d: 4, c: 'analysis', verdict: 'both-true-explains',
  a: 'The Quit India Movement continued even after the main Congress leaders were jailed.',
  r: 'Ordinary people organised protests on their own, and some leaders guided the movement from hiding.',
  sol: 'Both are true, and R explains A: the movement became spontaneous and was kept alive by local and underground leadership.',
}));

// ---------------------------------------------------------------- true-false, fill-blank, match, ordering
Q('tf_ncm_violent', tf({
  t: 1, d: 1, c: 'recall', ans: false,
  stem: 'True or false? The Non-Cooperation Movement was planned as an armed uprising against British rule.',
  sol: 'False. It was planned as a non-violent movement of non-cooperation; that is why Gandhiji suspended it when violence broke out.',
}));
Q('tf_first_rtc', tf({
  t: 4, d: 2, c: 'application', ans: true,
  stem: 'True or false? A Congress member reading the news in November 1930 would have found no Congress delegate at the Round Table Conference then meeting in London.',
  sol: 'True. The Congress boycotted the First Round Table Conference (1930–31) because Civil Disobedience was going on.',
}));
Q('tf_quit_date', tf({
  t: 5, d: 1, c: 'recall', ans: true,
  stem: 'True or false? The Quit India Resolution was passed on 8 August 1942.',
  sol: 'True. The leaders were arrested early the next morning, 9 August 1942.',
}));
Q('tf_pact_salt', tf({
  t: 4, d: 2, c: 'application', ans: true,
  stem: 'True or false? Under the Gandhi-Irwin Pact, a family living near the sea could make salt for its own use.',
  sol: 'True. The Pact allowed people in coastal areas to make salt for personal use, though the salt tax itself remained.',
}));
Q('fb_dyer', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'The troops who fired on the gathering at Jallianwala Bagh were commanded by General ___.',
  acc: [['Dyer', 'Reginald Dyer', 'R. E. H. Dyer']],
  sol: 'General Reginald Dyer ordered the firing on 13 April 1919.',
}));
Q('fb_purna', fb({
  t: 3, d: 1, c: 'recall',
  stem: 'At its Lahore session in 1929 the Congress declared ___ (complete independence) as its goal.',
  acc: [['Purna Swaraj', 'Poorna Swaraj', 'complete independence']],
  sol: 'The Lahore session declared Purna Swaraj as the goal.',
}));
Q('fb_slogan', fb({
  t: 5, d: 1, c: 'recall',
  stem: 'The two-word slogan given to the people at the time of the Quit India Resolution was "___".',
  acc: [['Do or Die', 'do or die', 'Karo ya Maro']],
  sol: 'The slogan was Do or Die (Karo ya Maro).',
}));
Q('match_ch11', match({
  t: [1, 3, 4, 5], d: 2, c: 'understanding', marks: 2,
  stem: 'Match each event of Gandhiji\'s mass movements with its year.',
  pairs: [
    ['Firing at Jallianwala Bagh', '1919'],
    ['Violence at Chauri Chaura', '1922'],
    ['Agreement between Gandhiji and Lord Irwin', '1931'],
    ['Resolution passed at Gowalia Tank', '1942'],
  ],
  sol: 'Jallianwala Bagh 1919; Chauri Chaura 1922; Gandhi-Irwin Pact 1931; Quit India Resolution 1942.',
}));
Q('ord_ch11', ord({
  t: [3, 4], d: 2, c: 'understanding', marks: 1,
  stem: 'Arrange these steps of the Civil Disobedience phase in the correct order.',
  items: [
    'The Simon Commission is boycotted',
    'Purna Swaraj is declared at Lahore',
    'Gandhiji walks to Dandi and breaks the salt law',
    'Gandhiji and Lord Irwin sign a pact',
    'The movement is renewed after the London conference',
  ],
  sol: 'Simon boycott (1928), Lahore (1929), Dandi (1930), the Pact (1931), renewal (1932).',
}));

// ---------------------------------------------------------------- short answers (2 and 3 marks)
Q('s_khilafat_two', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State two reasons why the Khilafat question helped bring about the Non-Cooperation Movement.',
  model: '1. Indian Muslims were angered by the harsh terms imposed on **Turkey** and its **Sultan-Caliph** after the war.\n2. Gandhiji saw a chance to unite **Hindus and Muslims** in one non-violent movement, so the Khilafat and swaraj demands were joined.',
  sol: 'Two reasons linking the Khilafat issue to the movement.',
  scheme: [['Anger at the treatment of Turkey', 1], ['Chance for Hindu-Muslim unity', 1]],
}));
Q('s_rowlatt_two', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Mention two features of the Rowlatt Act that Indians objected to.',
  model: '1. A person could be **arrested without a warrant** and **detained without trial**.\n2. Cases could be heard **without the usual right of appeal**, by special courts, which Indians saw as a denial of justice.',
  sol: 'Any two features.',
  scheme: [['First feature', 1], ['Second feature', 1]],
}));
Q('s_jallianwala_two', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Give two ways in which the Jallianwala Bagh tragedy affected the national movement.',
  model: '1. It turned many **moderate Indians** against British rule and destroyed faith in British **justice**.\n2. It led to protests such as **Tagore** giving up his **knighthood**, and it prepared the ground for **Non-Cooperation**.',
  sol: 'Two effects.',
  scheme: [['First effect', 1], ['Second effect', 1]],
}));
Q('s_negative_two', short({
  t: 1, d: 1, c: 'recall', marks: 2, wl: S2,
  stem: 'Name any two boycott items in the programme of the Non-Cooperation Movement.',
  model: '1. Boycott of **government schools and colleges**.\n2. Boycott of **law courts** by lawyers and litigants. (Also: surrender of **titles**, boycott of **councils** and of **foreign goods**.)',
  sol: 'Any two boycott items.',
  scheme: [['First item', 1], ['Second item', 1]],
}));
Q('s_positive_two', short({
  t: 1, d: 1, c: 'recall', marks: 2, wl: S2,
  stem: 'Name any two constructive items in the programme of the Non-Cooperation Movement.',
  model: '1. Setting up **national schools and colleges**.\n2. Popularising **khadi** and the **charkha**. (Also: **panchayats** for disputes, **Hindu-Muslim unity**, removal of **untouchability**.)',
  sol: 'Any two constructive items.',
  scheme: [['First item', 1], ['Second item', 1]],
}));
Q('s_chauri_why', short({
  t: 2, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: 'Why did Gandhiji suspend Non-Cooperation even though it was at its height in early 1922?',
  model: 'At **Chauri Chaura** (5 February 1922) a crowd set fire to a police station and policemen died. Gandhiji held that the people were **not yet ready** for **non-violent** struggle, so he stopped the movement rather than let it turn violent.',
  sol: 'The event and the principle behind the decision.',
  scheme: [['The Chauri Chaura incident', 1], ['Commitment to non-violence', 1]],
}));
Q('s_ncm_impact_two', short({
  t: 2, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: 'Point out two lasting effects of the Non-Cooperation Movement, even though it was suspended.',
  model: '1. It made the Congress a **mass organisation** with members in **villages** and towns.\n2. People lost their **fear** of the government and of jail, and **khadi** and **national education** took root.',
  sol: 'Two lasting effects.',
  scheme: [['First effect', 1], ['Second effect', 1]],
}));
Q('s_simon_two', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'How did the reaction to the Simon Commission prepare the ground for Civil Disobedience?',
  model: 'The **all-British** Commission was met with protests wherever it went. The anger, and the lathi charge in which **Lala Lajpat Rai** was injured, united parties and pushed the Congress towards a **stronger demand** and a new **struggle**.',
  sol: 'Protest against the Commission and its effect.',
  scheme: [['Protests against an all-British body', 1], ['Pushed the Congress towards a new struggle', 1]],
}));
Q('s_lahore_two', short({
  t: 3, d: 1, c: 'recall', marks: 2, wl: S2,
  stem: 'Mention two decisions associated with the Lahore session of the Congress (1929).',
  model: '1. **Purna Swaraj** (complete independence) was declared the **goal**.\n2. **26 January 1930** was to be observed as **Independence Day**, and the Working Committee was authorised to start **civil disobedience**.',
  sol: 'Any two decisions.',
  scheme: [['Purna Swaraj', 1], ['Second decision', 1]],
}));
Q('s_dandi_two', short({
  t: 3, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: 'Explain two reasons why the Dandi March is remembered as a turning point.',
  model: '1. It turned a simple act, **making salt**, into a **mass protest** that anyone could join.\n2. It drew **national and world attention** and launched **Civil Disobedience** across India.',
  sol: 'Two reasons for its significance.',
  scheme: [['Mass participation through a simple act', 1], ['Attention and launch of the movement', 1]],
}));
Q('s_pact_two', short({
  t: 4, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State two terms of the Gandhi-Irwin Pact of March 1931.',
  model: '1. The government would **release political prisoners** not charged with violence.\n2. The Congress would **suspend Civil Disobedience** and attend the **Second Round Table Conference**. (Also: salt-making allowed for **personal use** near the coast.)',
  sol: 'Any two terms.',
  scheme: [['First term', 1], ['Second term', 1]],
}));
Q('s_renew_two', short({
  t: 4, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: 'Why was Civil Disobedience renewed in 1932?',
  model: 'Gandhiji returned from the **Second Round Table Conference** with **no agreement**, and the new Viceroy **Lord Willingdon** met the Congress with **arrests** and **bans**. With talks failed, the movement was **resumed** in January 1932.',
  sol: 'Failure in London and the government\'s repression.',
  scheme: [['Failure of the conference', 1], ['Repression by the government', 1]],
}));
Q('s_cripps_link', short({
  t: 5, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: 'How did the failure of the Cripps Mission lead to the Quit India Movement?',
  model: 'The Mission\'s offer looked to a settlement **after the war** and did not meet the demand for **real power now**. Its failure convinced the Congress that the British would not leave willingly, so it chose a final **mass struggle**.',
  sol: 'Why the offer failed and what followed.',
  scheme: [['Offer did not meet Indian demands', 1], ['Led to a final mass struggle', 1]],
}));
Q('s_quit_two', short({
  t: 5, d: 3, c: 'evaluation', marks: 2, wl: S2,
  stem: 'Assess two reasons why the Quit India Movement is considered significant.',
  model: '1. It showed that the demand for **freedom** had spread to **ordinary people** everywhere, even without leaders.\n2. It made it clear that the British could **not rule India much longer** against such feeling.',
  sol: 'Two reasons, with judgement.',
  scheme: [['First reason', 1], ['Second reason', 1]],
}));
Q('s3_ncm_causes', short({
  t: 1, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Explain how three events of 1919–20 together led Gandhiji to launch Non-Cooperation.',
  model: '1. **Rowlatt Act (1919):** detention without trial showed that British rule would not respect Indian rights.\n2. **Jallianwala Bagh (13 April 1919):** the firing on an unarmed crowd shattered faith in British **justice**.\n3. **Khilafat issue:** the treatment of **Turkey** angered Muslims, giving a chance for a **joint** Hindu-Muslim struggle.',
  sol: 'Three causes, each linked to the decision.',
  scheme: [['Rowlatt Act', 1], ['Jallianwala Bagh', 1], ['Khilafat issue', 1]],
}));
Q('s3_cdm_programme', short({
  t: 3, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Describe three items of the programme of the Civil Disobedience Movement.',
  model: '1. Breaking the **salt law** by making salt from sea water.\n2. **Boycott** of **foreign cloth** and **picketing** of shops selling it and liquor.\n3. **Non-payment of taxes** and land revenue in some areas, and breaking of **forest laws**.',
  sol: 'Three programme items.',
  scheme: [['Salt law', 1], ['Boycott and picketing', 1], ['Non-payment of taxes or forest laws', 1]],
}));
Q('s3_cdm_impact', short({
  t: 4, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Explain three ways in which Civil Disobedience widened the national movement.',
  model: '1. **Women** came out in large numbers to make salt, picket shops and court arrest.\n2. **Peasants** and **traders** joined through non-payment of taxes and boycott, which cut **British trade**.\n3. It reached new regions, such as the **Frontier** with the **Khudai Khidmatgars**, and drew **world attention**.',
  sol: 'Three distinct ways.',
  scheme: [['Women', 1], ['Peasants, traders, boycott', 1], ['New regions or world attention', 1]],
}));
Q('s3_quit_causes', short({
  t: 5, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Explain three causes of the Quit India Movement.',
  model: '1. **Failure of the Cripps Mission** (1942): its offer did not give real power during the war.\n2. **Japanese threat:** Japan had reached **Burma**, and leaders felt a free India could defend itself better.\n3. **Wartime hardship:** rising **prices** and **shortages** caused widespread discontent.',
  sol: 'Three causes.',
  scheme: [['Cripps failure', 1], ['Japanese threat', 1], ['Wartime hardship', 1]],
}));

// ---------------------------------------------------------------- long answers (10 marks: 3 + 3 + 4)
Q('l_ncm_causes', long({
  t: 1, d: 3, c: 'analysis', marks: 10, wl: L10,
  stem: 'Answer the following about the causes of the Non-Cooperation Movement.\n\n(i) What was the Khilafat Movement, and how did it bring Hindus and Muslims together? **[3]**\n(ii) Why did Indians oppose the Rowlatt Act, and how did Gandhiji respond? **[3]**\n(iii) Explain how the Jallianwala Bagh tragedy changed Indian attitudes to British rule. **[4]**',
  model: '(i) After the **First World War**, the Allies imposed harsh terms on **Turkey**, whose **Sultan** Indian Muslims regarded as the **Caliph**. The **Ali brothers** led a movement in protest, and Gandhiji supported it, so Hindus and Muslims joined in **one struggle**.\n\n(ii) The **Rowlatt Act (March 1919)** allowed **arrest without warrant** and **detention without trial**. Gandhiji called for a **satyagraha** and a nationwide **hartal on 6 April 1919**.\n\n(iii) On **13 April 1919** troops under **General Dyer** fired on an unarmed crowd in the enclosed **Jallianwala Bagh** at **Amritsar**; hundreds were killed, though estimates differ widely. Moderate Indians lost faith in British **justice**, **Tagore** gave up his knighthood, and the **Hunter Committee** was seen as too mild. Gandhiji concluded that **non-cooperation** with such a government was a duty.',
  sol: 'Khilafat and unity; Rowlatt and the response; the effect of Jallianwala Bagh.',
  scheme: [['(i) The Khilafat issue', 2], ['(i) Hindu-Muslim unity', 1], ['(ii) Features of the Act', 2], ['(ii) Satyagraha and hartal', 1], ['(iii) The event', 1], ['(iii) Change in attitudes', 3]],
}));
Q('l_ncm_programme', long({
  t: [1, 2], d: 2, c: 'understanding', marks: 10, wl: L10,
  stem: 'Answer the following about the Non-Cooperation Movement.\n\n(i) Where and when was its programme approved and confirmed? **[3]**\n(ii) List three boycott items of the programme. **[3]**\n(iii) Describe four constructive items of the programme. **[4]**',
  model: '(i) A **special session** of the Congress at **Calcutta** in **September 1920** approved the programme, and the annual session at **Nagpur** in **December 1920** confirmed it. Gandhiji led the movement and held that, if the programme were followed fully, swaraj could come within a year.\n\n(ii) Boycott items: surrender of **titles** and honorary posts; boycott of **government schools and colleges** and of **law courts**; boycott of the **councils**, whose elections were due in 1920, and of **foreign goods**, which were burnt in public bonfires.\n\n(iii) Constructive items: setting up **national schools** and colleges; popularising **khadi** and the **charkha**; settling disputes through **panchayats**; promoting **Hindu-Muslim unity** and working to remove **untouchability**. A fund was raised to support the work, and volunteers carried the message from town to village, so that the movement reached people who had never taken part in politics before.',
  sol: 'Approval; boycott items; constructive items.',
  scheme: [['(i) Calcutta 1920', 1.5], ['(i) Nagpur 1920', 1.5], ['(ii) Three boycott items', 3], ['(iii) Four constructive items', 4]],
}));
Q('l_chauri_impact', long({
  t: 2, d: 3, c: 'evaluation', marks: 10, wl: L10,
  stem: 'Answer the following about the end of the Non-Cooperation Movement.\n\n(i) What happened at Chauri Chaura in February 1922? **[3]**\n(ii) Why did Gandhiji call off the movement, and how did some leaders react? **[3]**\n(iii) Evaluate the impact of the Non-Cooperation Movement on the freedom struggle. **[4]**',
  model: '(i) On **5 February 1922**, at **Chauri Chaura** in the **Gorakhpur** district of the United Provinces, a crowd clashed with the police and **set fire to the police station**; a number of policemen, commonly given as 22, died.\n\n(ii) Gandhiji believed the struggle had to stay **non-violent** and that the people were not yet ready for it, so the **Bardoli** resolution suspended the movement. Some leaders, such as **Motilal Nehru** and **C. R. Das**, felt the decision came at its height; Das and Motilal later formed the **Swaraj Party**.\n\n(iii) The movement made the Congress a **mass organisation**, brought **peasants, workers, students and women** into politics and removed the **fear** of jail. **Khadi** and **national education** spread. Its weakness was that **Hindu-Muslim unity** did not last after the Khilafat issue ended, but it prepared the ground for later mass struggles.',
  sol: 'Event; reason and reaction; balanced impact.',
  scheme: [['(i) Date, place, event', 3], ['(ii) Reason for suspension', 2], ['(ii) Reaction of leaders', 1], ['(iii) Positive effects', 3], ['(iii) A limitation', 1]],
}));
Q('l_cdm_causes', long({
  t: 3, d: 3, c: 'analysis', marks: 10, wl: L10,
  stem: 'Answer the following about the causes of the Civil Disobedience Movement.\n\n(i) Why was the Simon Commission opposed in India? **[3]**\n(ii) What did the Congress decide at its Lahore session in 1929? **[3]**\n(iii) Explain how these developments led to the launch of Civil Disobedience in 1930. **[4]**',
  model: '(i) The Commission, appointed in **1927** to review the working of the reforms, had **no Indian member**. Indians saw this as an insult, and it was met with **black flags** and protests; **Lala Lajpat Rai** was injured in a lathi charge at **Lahore** in 1928 and died soon after.\n\n(ii) Under **Jawaharlal Nehru** the Congress declared **Purna Swaraj** as its goal, decided to observe **26 January 1930** as **Independence Day**, and authorised the Working Committee to start **civil disobedience**.\n\n(iii) With the British making no offer that met the new goal, the Congress needed a **mass struggle**. Gandhiji placed demands before the Viceroy and, when they were not accepted, chose the **salt law** as the first law to break. The **Dandi March** (12 March – 6 April 1930) launched the movement across India.',
  sol: 'Simon opposition; Lahore decisions; link to 1930.',
  scheme: [['(i) All-British Commission', 2], ['(i) Protests', 1], ['(ii) Purna Swaraj and 26 January', 2], ['(ii) Authority for civil disobedience', 1], ['(iii) Need for a struggle', 2], ['(iii) Salt and Dandi', 2]],
}));
Q('l_dandi_programme', long({
  t: 3, d: 3, c: 'application', marks: 10, wl: L10,
  stem: 'Study the schematic sketch of the Salt March drawn by SOYL and answer the questions that follow.\n\n(i) Name the starting point and the end point of the march, with dates. **[3]**\n(ii) Explain why salt was chosen to begin the movement. **[3]**\n(iii) Describe four items of the programme of Civil Disobedience. **[4]**',
  model: '(i) The march began at **Sabarmati Ashram, Ahmedabad**, on **12 March 1930**, and reached **Dandi** on the coast on **5 April**; Gandhiji broke the **salt law** there on **6 April 1930**.\n\n(ii) **Salt** was needed by **every household**, so the salt tax and the government monopoly on salt affected **rich and poor** alike. Making salt from sea water was a **simple, peaceful** act that anyone could join, which made it a powerful **symbol**.\n\n(iii) Programme: **making salt** in defiance of the law; **boycott** of foreign cloth and **picketing** of shops selling it and liquor; **non-payment of taxes** and land revenue in some areas; breaking **forest laws** and resigning from government posts.',
  sol: 'Route and dates; reasons for salt; programme.',
  scheme: [['(i) Start and end with dates', 3], ['(ii) Reasons for choosing salt', 3], ['(iii) Four programme items', 4]],
  assets: [dandiSvg('Schematic sketch, not a map: a dashed line from a point labelled Sabarmati Ashram, Ahmedabad, start 12 March 1930, to a point labelled Dandi on the coast, where the salt law was broken on 6 April 1930; a note reads about 385 km on foot in 24 days', 'The Salt March as a schematic line (not a map, not to scale).')],
}));
Q('l_pact_rtc', long({
  t: 4, d: 3, c: 'analysis', marks: 10, wl: L10,
  stem: 'Answer the following about the years 1931–34.\n\n(i) State three terms of the Gandhi-Irwin Pact. **[3]**\n(ii) Why did the Second Round Table Conference fail? **[3]**\n(iii) Explain how Civil Disobedience was renewed and how it ended. **[4]**',
  model: '(i) Signed on **5 March 1931**: the government would **release political prisoners** not charged with violence and **withdraw its ordinances**; people near the coast could **make salt for their own use**; the Congress would **suspend Civil Disobedience** and attend the **Second Round Table Conference**.\n\n(ii) At the conference in **London** (1931) Gandhiji was the **sole Congress representative**. The talks broke down mainly over the **representation of minorities**, on which the parties could not agree, so he returned without a settlement.\n\n(iii) On his return in **December 1931** the movement was **renewed** (January 1932). The government under **Lord Willingdon** arrested Gandhiji and other leaders, **banned** the Congress and used harsh measures. The movement gradually lost strength and was **withdrawn in 1934**.',
  sol: 'Terms; failure; renewal and end.',
  scheme: [['(i) Three terms', 3], ['(ii) Sole representative', 1], ['(ii) Minorities question', 2], ['(iii) Renewal and repression', 2.5], ['(iii) Withdrawal in 1934', 1.5]],
}));
Q('l_quit_india', long({
  t: 5, d: 4, c: 'evaluation', marks: 10, wl: L10,
  stem: 'Answer the following about the Quit India Movement.\n\n(i) Explain three causes of the movement. **[3]**\n(ii) What was decided at Bombay on 8 August 1942, and what happened the next morning? **[3]**\n(iii) Evaluate the significance of the movement for India\'s independence. **[4]**',
  model: '(i) The **Cripps Mission** (1942) failed to offer real power during the war; **Japanese** forces had reached **Burma**, and leaders felt a free India would defend itself better; wartime **price rises** and **shortages** caused discontent.\n\n(ii) The **All India Congress Committee** passed the **Quit India Resolution** at **Gowalia Tank** and called for a non-violent mass struggle, with the slogan **Do or Die**. Early on **9 August** the main leaders were **arrested**.\n\n(iii) With leaders in jail, people organised **strikes and protests** on their own; **underground** leaders and a secret radio kept up the message, and **parallel governments** arose in places such as **Ballia, Tamluk and Satara**. Although the government suppressed it, the movement showed that the demand for **freedom** had reached **every class**, and it made clear that British rule could not continue for long.',
  sol: 'Causes; the resolution and arrests; balanced significance.',
  scheme: [['(i) Three causes', 3], ['(ii) Resolution and slogan', 2], ['(ii) Arrests on 9 August', 1], ['(iii) Mass and underground action', 2], ['(iii) Judgement on significance', 2]],
}));
Q('l_compare_three', long({
  t: [1, 3, 5], d: 4, c: 'evaluation', marks: 10, wl: L10,
  stem: 'Compare Gandhiji\'s three mass movements.\n\n(i) State the main aim and one method of each movement: Non-Cooperation, Civil Disobedience and Quit India. **[3]**\n(ii) How did Civil Disobedience go further than Non-Cooperation? **[3]**\n(iii) In your view, which feature was common to all three, and why did it matter? **[4]**',
  model: '(i) **Non-Cooperation (1920–22):** swaraj, by **withdrawing cooperation** (boycott of schools, courts, councils). **Civil Disobedience (1930–34):** Purna Swaraj, by **breaking chosen laws** such as the salt law. **Quit India (1942):** an immediate end of British rule, by a **mass struggle** with the slogan Do or Die.\n\n(ii) Non-Cooperation mainly stopped cooperating; Civil Disobedience **deliberately broke laws** and refused **taxes** in some areas. It also drew far more **women** and spread to new regions.\n\n(iii) All three relied on **mass participation** of ordinary people. This mattered because it turned the Congress into a **people\'s movement**, showed the British that Indians of every class wanted **freedom**, and built the confidence that made **independence** possible. (A reasoned answer naming non-violence as the common feature is also accepted.)',
  sol: 'Aims and methods; how CDM went further; reasoned common feature.',
  scheme: [['(i) Aim and method of each', 3], ['(ii) Breaking laws', 2], ['(ii) Wider participation', 1], ['(iii) Common feature identified', 1], ['(iii) Why it mattered', 3]],
}));
Q('l_timeline', long({
  t: [1, 2, 3, 4, 5], d: 3, c: 'application', marks: 10, wl: L10,
  stem: 'Study the timeline drawn by SOYL and answer the questions that follow.\n\n(i) Which two events of 1919 on the timeline led to Non-Cooperation, and how? **[3]**\n(ii) Explain the link between the events of 1928 and 1929 and the event of 1930. **[3]**\n(iii) Why did the movement shown in 1942 differ in its course from the one shown in 1920? **[4]**',
  model: '(i) The **Rowlatt Act**, which allowed detention without trial, and the firing at **Jallianwala Bagh** on 13 April 1919. Together they convinced Gandhiji that cooperation with the government was no longer possible.\n\n(ii) The boycott of the all-British **Simon Commission** (1928) united opinion against the government, and at **Lahore** (1929) the Congress declared **Purna Swaraj** and authorised civil disobedience. This led directly to the **Dandi March** of 1930.\n\n(iii) In **1920** the movement was led and controlled by **Gandhiji**, and he could **suspend** it after Chauri Chaura. In **1942** the leaders were **arrested** the morning after the resolution, so the movement became **spontaneous**, was led by **underground** and local leaders, and could not be called off in the same way.',
  sol: 'Reading the timeline; links; contrast of 1920 and 1942.',
  scheme: [['(i) Two events', 1], ['(i) How they led to NCM', 2], ['(ii) 1928 and 1929 explained', 2], ['(ii) Link to Dandi', 1], ['(iii) Gandhi-led in 1920', 2], ['(iii) Spontaneous in 1942', 2]],
  assets: [timelineSvg('Timeline from 1918 to 1944 marking: 1919 Rowlatt Act and Jallianwala Bagh, 1920 Non-Cooperation begins, 1922 Chauri Chaura and movement suspended, 1928 Simon Commission boycotted, 1929 Lahore and Purna Swaraj, 1930 Dandi March, 1931 Gandhi-Irwin Pact, 1932 movement renewed, 1934 movement withdrawn, 1942 Quit India Resolution', 'Schematic timeline drawn by SOYL; label positions are for legibility only.')],
}));

// ---------------------------------------------------------------- source-based (imagined documents)
Q('sb_amritsar_letter', source({
  t: 1, d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the extract from an imagined letter and answer the questions that follow. ${IMAG}`,
  passage: '**Letter from an imagined schoolteacher in Amritsar to her sister in Allahabad, May 1919**\n\nThe shops here were shut for days in April, as everyone protested against the new law that lets the police lock a man away without a hearing. Then came the Baisakhi day that none of us will forget. People had gathered in the walled garden near the temple, many of them visitors from the villages, when soldiers entered and opened fire. Since then the city has been under strict orders. Our headmaster, who once praised British fairness, now says he will never trust it again. I hear that a poet in Bengal has given back the honour the King gave him.',
  parts: [
    child('a', short({ t: 1, d: 1, c: 'recall', marks: 1, stem: 'Which law of 1919 is the teacher referring to?', model: 'The **Rowlatt Act**.', sol: 'The law allowing detention without trial.', scheme: [['Rowlatt Act', 1]] })),
    child('b', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'Identify the tragedy of Baisakhi day described in the letter and give its date.', model: 'The firing at **Jallianwala Bagh**, Amritsar, on **13 April 1919**.', sol: 'Event and date.', scheme: [['Jallianwala Bagh, 13 April 1919', 1]] })),
    child('c', short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): What change in attitude does the headmaster show, and why did such changes matter for the national movement?', model: 'He loses his **faith in British justice**. When moderate, loyal Indians turned against the government in this way, support grew for **Non-Cooperation**.', sol: 'The change and its effect.', scheme: [['Loss of faith', 1], ['Effect on the movement', 1]] }), [
      short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Who is the poet in Bengal, and what was the meaning of his action?', model: '**Rabindranath Tagore**, who gave up his **knighthood**. It was a protest showing that even honoured Indians rejected the government\'s actions.', sol: 'Name and meaning.', scheme: [['Tagore', 1], ['Meaning of the protest', 1]] }),
    ]),
  ],
}));
Q('sb_dandi_diary', source({
  t: 3, d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the extract from the imagined diary of a young marcher and answer the questions that follow. ${IMAG}`,
  passage: '**Diary of an imagined marcher from Kheda, April 1930**\n\nWe have walked for more than three weeks, sleeping in village squares where people bring us water and bread. At every stop Bapu speaks of the tax that even the poorest pay on a pinch of salt. This morning, at the edge of the sea, he picked up a lump of salt from the mud, and the crowd cheered as if a king had been crowned. Women from the nearby villages have already begun boiling sea water in their pots. Tomorrow some of us will go to the cloth shops in the town to ask the owners not to sell foreign cloth.',
  parts: [
    child('a', short({ t: 3, d: 1, c: 'recall', marks: 1, stem: 'At which place did the event of "this morning" take place, and on what date?', model: 'At **Dandi**, on **6 April 1930**.', sol: 'Place and date.', scheme: [['Dandi, 6 April 1930', 1]] })),
    child('b', short({ t: 3, d: 2, c: 'application', marks: 1, stem: 'Which item of the programme of Civil Disobedience do the marchers plan for "tomorrow"?', model: '**Picketing** of shops selling **foreign cloth** (boycott).', sol: 'Picketing and boycott.', scheme: [['Picketing / boycott of foreign cloth', 1]] })),
    child('c', short({ t: 3, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Using the diary, explain why salt was a good choice to begin the movement.', model: 'The tax fell on **"even the poorest"**, so everyone felt it; and making salt, as the **village women** did, was a simple act anyone could join.', sol: 'Two reasons from the diary.', scheme: [['Tax felt by all', 1], ['Simple act for all', 1]] }), [
      short({ t: 4, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): What does the diary suggest about the part played by women in the movement?', model: 'Women joined **actively**, making salt from **sea water** in their villages. Civil Disobedience drew **women** into the struggle in large numbers.', sol: 'Women\'s participation.', scheme: [['Women making salt', 1], ['Wider participation', 1]] }),
    ]),
  ],
}));
Q('sb_august_diary', source({
  t: 5, d: 3, c: 'evaluation', origin: 'soyl-original',
  stem: `Read the extract from the imagined diary of a college student and answer the questions that follow. ${IMAG}`,
  passage: '**Diary of an imagined college student in Bombay, August 1942**\n\nYesterday the great meeting at the tank voted for the British to leave at once, and everyone repeated the two-word slogan. Before dawn today the police took away every leader we knew of. Yet by noon the streets were full: students walked out of classes, mills stopped work, and someone said a woman had raised the flag at the meeting ground in spite of the police. Tonight a friend whispered that a secret radio will speak to us soon. Nobody is telling us what to do, and still everyone seems to know.',
  parts: [
    child('a', short({ t: 5, d: 1, c: 'recall', marks: 1, stem: 'Name the "great meeting at the tank" and the resolution it passed.', model: 'The **AICC** session at **Gowalia Tank**, Bombay, which passed the **Quit India Resolution** (8 August 1942).', sol: 'Meeting and resolution.', scheme: [['Gowalia Tank, Quit India Resolution', 1]] })),
    child('b', short({ t: 5, d: 2, c: 'application', marks: 1, stem: 'Who is the woman who raised the flag, according to commonly taught accounts?', model: '**Aruna Asaf Ali**.', sol: 'Aruna Asaf Ali.', scheme: [['Aruna Asaf Ali', 1]] })),
    child('c', short({ t: 5, d: 3, c: 'evaluation', marks: 2, stem: '**Either** (i): The student writes that "nobody is telling us what to do". What does this show about the nature of the movement?', model: 'With the leaders **arrested**, the movement became **spontaneous**: ordinary people acted on their own, guided later by **underground** leaders and a **secret radio**.', sol: 'Spontaneous, leaderless at first.', scheme: [['Leaders arrested', 1], ['Spontaneous action', 1]] }), [
      short({ t: 5, d: 3, c: 'evaluation', marks: 2, stem: '**Or** (ii): Judge one strength and one weakness of a movement that continued without its main leaders.', model: '**Strength:** it showed that the desire for freedom had reached **ordinary people** everywhere. **Weakness:** without central direction it was hard to keep it **non-violent** and coordinated, and it was suppressed.', sol: 'One strength, one weakness.', scheme: [['Strength', 1], ['Weakness', 1]] }),
    ]),
  ],
}));
