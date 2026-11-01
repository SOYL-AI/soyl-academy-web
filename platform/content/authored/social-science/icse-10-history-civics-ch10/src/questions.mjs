// ICSE 10 History & Civics, ch10 The Muslim League and the Lucknow Pact — question bank.
// Every letter, diary, minute and quiz scenario is imagined and written by SOYL and labelled as imagined; no textbook
// text, box or exercise and no specimen or board-paper item is reused (D-036). No speech or writing of any historical
// person is quoted: ideas are paraphrased and attributed. Wording about every community and leader is neutral. Facts
// are stable, widely taught dates and names, listed for review in the README.
import assert from 'node:assert/strict';
import { Q, mcq, ar, tf, fb, match, ord, short, long, source, child, Svg } from '../../icse-10-history-civics-ch01/src/lib.mjs';

const S2 = [25, 45];
const S3 = [40, 70];
const L10 = [120, 220];
const IMAG = '*(Imagined document written by SOYL for practice; the people in it are not real.)*';

// ---------------------------------------------------------------- dates used in items (asserted in order)
export const EVENTS = [
  [1875, 'MAO College, Aligarh'],
  [1885, 'Congress founded'],
  [1905, 'Partition of Bengal'],
  [1906, 'Simla Deputation (Oct)'],
  [1906.9, 'Muslim League (Dec)'],
  [1909, 'Morley-Minto Reforms'],
  [1911, 'Partition annulled'],
  [1913, 'League adopts self-rule aim'],
  [1916, 'Lucknow Pact'],
];
for (let i = 1; i < EVENTS.length; i++) assert.ok(EVENTS[i][0] > EVENTS[i - 1][0], 'events in date order');
export const LEAGUE_FOUNDED = 1906;
export const PACT_YEAR = 1916;
export const yearsBetween = (a, b) => b - a;
assert.equal(yearsBetween(LEAGUE_FOUNDED, PACT_YEAR), 10);
assert.equal(yearsBetween(1905, 1911), 6); // partition to annulment
assert.equal(yearsBetween(1907, PACT_YEAR), 9); // Surat split to reunion at Lucknow

/** A horizontal timeline from 1870 to 1920 with labels in lanes (theme colours only). */
export function timelineSvg(alt, caption, events = EVENTS) {
  const W = 780, H = 270, x0 = 40, x1 = 740, y = 135, a = 1870, b = 1920;
  const X = (yr) => x0 + ((yr - a) / (b - a)) * (x1 - x0);
  const s = new Svg(W, H);
  s.line(x0, y, x1, y, { sw: 2 });
  for (const yr of [1870, 1880, 1890, 1900, 1910, 1920]) {
    s.line(X(yr), y - 5, X(yr), y + 5, { sw: 1.2, color: 'muted' });
  }
  s.text(X(1870), y + 18, '1870', { size: 11, muted: true });
  s.text(X(1920), y + 18, '1920', { size: 11, muted: true });
  const lanes = [-30, 34, -62, 66, -94, 98, -122, 126, -30];
  events.forEach(([yr, label], i) => {
    const dy = lanes[i % lanes.length];
    const px = X(yr);
    const shown = Math.floor(yr);
    s.line(px, y, px, y + dy + (dy < 0 ? 8 : -8), { sw: 1, color: 'muted' });
    s.dot(px, y, 4, i % 2 ? 'blue' : 'accent');
    const anchor = px > 600 ? 'end' : px < 160 ? 'start' : 'middle';
    s.text(px, y + dy, `${shown} ${label}`, { size: 11, color: i % 2 ? 'blue' : 'accent', anchor });
  });
  return s.visual(alt, caption);
}

/** The Lucknow Pact as two bodies meeting in one joint scheme. */
export function pactSvg(alt, caption) {
  const s = new Svg(700, 300);
  s.rect(20, 30, 230, 70, { rx: 10, fill: 'blue', fillOpacity: 0.15, color: 'blue', sw: 1.6 });
  s.text(135, 55, 'Indian National Congress', { size: 13, bold: true });
  s.text(135, 78, 'Lucknow session, 1916', { size: 11 });
  s.rect(450, 30, 230, 70, { rx: 10, fill: 'green', fillOpacity: 0.15, color: 'green', sw: 1.6 });
  s.text(565, 55, 'All India Muslim League', { size: 13, bold: true });
  s.text(565, 78, 'Lucknow session, 1916', { size: 11 });
  s.arrow(135, 102, 300, 168, { sw: 1.4, color: 'muted' });
  s.arrow(565, 102, 400, 168, { sw: 1.4, color: 'muted' });
  s.rect(200, 172, 300, 100, { rx: 12, fill: 'accent', fillOpacity: 0.2, color: 'accent', sw: 2 });
  s.text(350, 196, 'Joint scheme of reforms', { size: 13, bold: true });
  s.text(350, 218, 'Common demand for self-government', { size: 11 });
  s.text(350, 236, 'Separate electorates accepted', { size: 11 });
  s.text(350, 254, 'Seat shares fixed by province', { size: 11 });
  return s.visual(alt, caption);
}

// ================================================================ t01 Formation and factors
Q('m_league_year', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'In which year was the All India Muslim League formed at a meeting held in Dacca?',
  opts: ['1906', '1905', '1909', '1916'],
  sol: 'The League was formed on 30 December 1906 at Dacca. The Partition of Bengal was in 1905, the Morley-Minto Reforms in 1909 and the Lucknow Pact in 1916.',
}));
Q('m_league_city', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'In which city did the meeting that founded the Muslim League take place?',
  opts: ['Dacca (Dhaka)', 'Aligarh', 'Lucknow', 'Lahore'],
  sol: 'The League was founded at Dacca, during a session of the All India Muhammadan Educational Conference. Aligarh was the centre of Sir Syed Ahmad Khan\'s college, and the Pact of 1916 was signed at Lucknow.',
}));
Q('m_conference', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'The Muslim League was set up at the end of the annual session of which body held at Dacca in December 1906?',
  opts: ['The All India Muhammadan Educational Conference', 'The Indian National Congress', 'The Indian Association', 'The Imperial Legislative Council'],
  sol: 'Leaders who had gathered for the All India Muhammadan Educational Conference at Dacca decided to form the League. The Congress, the Indian Association and the Legislative Council were separate bodies.',
}));
Q('m_first_president', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'Who is remembered as the first President of the All India Muslim League?',
  opts: ['Aga Khan III', 'Muhammad Ali Jinnah', 'Nawab Salimullah', 'Lord Minto'],
  sol: 'Aga Khan III, who had also led the Simla Deputation, was chosen as the League\'s first President. Jinnah joined the League later (1913); Salimullah hosted the Dacca meeting; Minto was the Viceroy.',
}));
Q('m_simla_dep', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'In October 1906 a group of Muslim leaders met Lord Minto at Simla. What was the main demand of this Simla Deputation?',
  opts: ['Separate representation for Muslims in elected councils', 'Immediate independence for India', 'Annulment of the Partition of Bengal', 'Abolition of the Arms Act'],
  sol: 'The Deputation asked for separate electorates and representation for Muslims in councils. It did not ask for independence; it did not seek the annulment of the partition, which many of its members welcomed; the Arms Act was not its subject.',
}));
Q('m_viceroy_1906', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Which Viceroy received the Simla Deputation in 1906?',
  opts: ['Lord Minto', 'Lord Curzon', 'Lord Ripon', 'Lord Hardinge'],
  sol: 'Lord Minto, Viceroy from 1905 to 1910, received the Deputation. Curzon partitioned Bengal in 1905; Ripon belongs to the 1880s; Hardinge was Viceroy when the partition was annulled in 1911.',
}));
Q('m_divide_rule', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Nationalist writers often say that British "divide and rule" helped bring about the Muslim League. What does the phrase mean in this context?',
  opts: ['Encouraging differences between communities so that they would not unite against British rule', 'Dividing India into provinces for easier tax collection', 'Splitting the army into regiments by region', 'Dividing power equally between the Viceroy and the princes'],
  sol: 'The phrase describes a policy, as nationalists saw it, of encouraging separate interests among communities so that they would not unite against the government. The other options describe administrative arrangements, not this idea.',
}));
Q('m_partition_view', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: 'Why did the agitation against the Partition of Bengal worry some Muslim leaders of eastern Bengal?',
  opts: ['They felt the new province, with a Muslim majority, offered them better opportunities, and its undoing could harm their interests', 'They wanted Bengal to be ruled directly from London', 'They opposed all forms of education', 'They had already joined the Congress in large numbers'],
  sol: 'The new province of Eastern Bengal and Assam had a Muslim majority, and some Muslim leaders saw it as an opportunity; the agitation to undo it seemed to them to go against their interests. The other options are not historical.',
}));
Q('m_education_factor', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Which of the following is usually listed as a factor behind the formation of the Muslim League?',
  opts: ['The feeling that sections of Muslims lagged behind in modern education and government jobs', 'The success of the Lucknow Pact', 'The failure of the Cripps Mission', 'The Montagu-Chelmsford Reforms'],
  sol: 'A sense of educational and economic backwardness among sections of Muslims is a commonly taught factor. The Lucknow Pact (1916), the Cripps Mission (1942) and the Montagu-Chelmsford Reforms (1919) all came after 1906.',
}));
Q('m_sir_syed', mcq({
  t: 1, d: 3, c: 'understanding',
  stem: 'Sir Syed Ahmad Khan, founder of the college at Aligarh, is often mentioned in the background to the Muslim League. Which view is usually associated with him?',
  opts: ['That Muslims should concentrate on modern education and keep away from the Congress for the time being', 'That Muslims should lead an armed revolt', 'That English education was harmful to Muslims', 'That the Congress should be the only voice of all Indians'],
  sol: 'Sir Syed promoted modern education through the Muhammadan Anglo-Oriental College (1875) and advised Muslims to stay away from the Congress at that stage. He did not call for revolt, he favoured English education, and he did not see the Congress as speaking for Muslims.',
}));
Q('m_minto_reforms', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'The Indian Councils Act of 1909 is linked to the demands of the Simla Deputation. What did it introduce?',
  opts: ['Separate electorates for Muslims', 'Universal adult franchise', 'Full self-government for India', 'An Indian Viceroy'],
  sol: 'The Morley-Minto Reforms of 1909 gave Muslims separate electorates, as the Deputation had asked. Adult franchise came with the Constitution of 1950; self-government and an Indian Viceroy were not part of the 1909 Act.',
}));
Q('ar_simla_league', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'The Simla Deputation of 1906 is regarded as a step towards the formation of the Muslim League.',
  r: 'The Deputation showed Muslim leaders that an organised body could press their demands on the government.',
  sol: 'Both are true, and R explains A: the favourable hearing at Simla encouraged the same leaders to set up a permanent organisation a few weeks later at Dacca.',
}));
Q('ar_partition_reason', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'A-true-R-false',
  a: 'Some Muslim leaders of eastern Bengal supported the Partition of Bengal of 1905.',
  r: 'The Partition of Bengal created a new province with a Hindu majority.',
  sol: 'A is true. R is false: the new province of Eastern Bengal and Assam had a Muslim majority, which is why some Muslim leaders welcomed it.',
}));
Q('tf_league_congress_year', tf({
  t: 1, d: 1, c: 'recall', ans: false,
  stem: 'True or false? The Muslim League was founded in the same year as the Indian National Congress.',
  sol: 'False. The Congress was founded in 1885 and the Muslim League in 1906, twenty-one years later.',
}));
Q('fb_dacca', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'The All India Muslim League was founded on 30 December 1906 at ___.',
  acc: [['Dacca', 'Dhaka']],
  sol: 'It was founded at Dacca (now Dhaka).',
}));
Q('s_factors_two', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Mention any two factors that led to the formation of the Muslim League in 1906.',
  model: '1. The British policy of **"divide and rule"**, as nationalists saw it, which encouraged separate political interests.\n2. A feeling of **educational and economic backwardness** among sections of Muslims. (Also: the reaction to the **anti-partition agitation**, or the **Simla Deputation**.)',
  sol: 'Any two recognised factors.',
  scheme: [['First factor', 1], ['Second factor', 1]],
}));
Q('s_simla_two', short({
  t: 1, d: 2, c: 'recall', marks: 2, wl: S2,
  stem: 'Give two facts about the Simla Deputation of 1906.',
  model: '1. It was led by **Aga Khan III** and met the Viceroy **Lord Minto** at **Simla** in **October 1906**.\n2. It asked for **separate electorates** and fair **representation** for Muslims in councils.',
  sol: 'Leader and Viceroy; main demand.',
  scheme: [['Leader, Viceroy or date', 1], ['Main demand', 1]],
}));
Q('s_partition_link', short({
  t: 1, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: 'How did the Partition of Bengal and the movement against it influence the formation of the Muslim League?',
  model: 'The partition created **Eastern Bengal and Assam**, a **Muslim-majority** province that some Muslim leaders welcomed. The strong **agitation to undo it** made them feel they needed their **own organisation** to protect what they saw as their interests.',
  sol: 'The new province; reaction to the agitation.',
  scheme: [['Muslim-majority province welcomed by some', 1], ['Agitation leads to need for own body', 1]],
}));
Q('s_aligarh', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State two ways in which Sir Syed Ahmad Khan\'s work is linked to the background of the Muslim League.',
  model: '1. He founded the **Muhammadan Anglo-Oriental College** at **Aligarh (1875)**, spreading **modern education** among Muslims; many later League leaders came from this background.\n2. He advised Muslims to **stay away from the Congress** at that stage, encouraging a **separate political path**.',
  sol: 'Education; political advice.',
  scheme: [['Aligarh and education', 1], ['Advice about the Congress', 1]],
}));
Q('s3_factors_three', short({
  t: 1, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Explain three factors that historians commonly link with the founding of the Muslim League.',
  model: '1. **British policy:** nationalists argue that the government encouraged **separate interests** among communities ("divide and rule").\n2. **Backwardness:** sections of Muslims felt they lagged in **modern education** and **government jobs**, and wanted a body to speak for them.\n3. **Partition of Bengal:** some Muslim leaders welcomed the **Muslim-majority** new province and saw the agitation against it as a threat, which led them to organise.',
  sol: 'Three distinct factors, each explained.',
  scheme: [['First factor explained', 1], ['Second factor explained', 1], ['Third factor explained', 1]],
}));

// ================================================================ t02 Objectives
Q('m_obj_loyalty', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'Which of the following was one of the objectives of the Muslim League at its formation in 1906?',
  opts: ['To promote loyalty among Muslims towards the British government', 'To demand complete independence at once', 'To merge with the Indian National Congress', 'To boycott all British goods'],
  sol: 'At first the League aimed to promote loyalty to the British government among Muslims. Complete independence, merger with the Congress and boycott were not its aims in 1906.',
}));
Q('m_obj_rights', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'According to its stated aims of 1906, how did the League intend to protect the political rights of Muslims?',
  opts: ['By representing their needs and aspirations to the government', 'By organising armed resistance', 'By refusing to take part in any council', 'By asking the British to leave India'],
  sol: 'The League planned to protect Muslims\' political rights by placing their needs and aspirations before the government. It did not plan armed resistance or a boycott of councils, and it did not ask the British to leave in 1906.',
}));
Q('m_obj_harmony', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'One aim of the League in 1906 was to prevent hostility among Muslims towards other communities. What does this aim suggest about the League\'s original approach?',
  opts: ['It meant to protect Muslim interests without encouraging ill will towards others', 'It wanted to keep Muslims out of politics', 'It planned to take over the Congress', 'It opposed all contact with other communities'],
  sol: 'The aim shows that the League presented itself as a defender of Muslim interests while also, in principle, discouraging hostility towards other communities. The other options contradict its stated aims.',
}));
Q('m_obj_1913', mcq({
  t: 2, d: 3, c: 'understanding',
  stem: 'By 1913 the League had changed its aims. Which new goal did it adopt?',
  opts: ['Self-government suited to India, in cooperation with other communities', 'A separate country for Muslims', 'Rule by the princes', 'Withdrawal from all elections'],
  sol: 'In 1913 the League adopted the goal of self-government suitable to India, which brought it closer to the Congress and paved the way for the Lucknow Pact. A separate country was not demanded at this time.',
}));
Q('m_obj_not', mcq({
  t: 2, d: 2, c: 'analysis',
  stem: 'Which of these was NOT among the objectives of the Muslim League when it was founded?',
  opts: ['Ending British rule through mass non-cooperation', 'Promoting loyalty to the British government', 'Protecting the political rights of Muslims', 'Preventing hostility towards other communities'],
  sol: 'Mass non-cooperation belongs to the Gandhian movements after 1920. The other three were among the League\'s stated aims in 1906.',
}));
Q('ar_loyalty_aim', ar({
  t: 2, d: 3, c: 'analysis', verdict: 'both-true-not-explains',
  a: 'In 1906 the Muslim League stated loyalty to the British government as one of its aims.',
  r: 'The Muslim League was founded at Dacca.',
  sol: 'Both statements are true, but R (where it was founded) does not explain A (why it stated loyalty as an aim).',
}));
Q('ar_aims_change', ar({
  t: 2, d: 3, c: 'analysis', verdict: 'A-false-R-true',
  a: 'The Muslim League never changed its aims between 1906 and 1916.',
  r: 'In 1913 the League adopted the goal of self-government suited to India.',
  sol: 'A is false because the League did change its aims. R is true: in 1913 it adopted the goal of self-government, which made the 1916 Pact with the Congress possible.',
}));
Q('tf_obj_independence', tf({
  t: 2, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? Complete independence from Britain was one of the original objectives of the Muslim League in 1906.',
  sol: 'False. Its original objectives included loyalty to the British government and the protection of Muslims\' political rights; independence was not among them.',
}));
Q('s_objectives_two', short({
  t: 2, d: 1, c: 'recall', marks: 2, wl: S2,
  stem: 'State any two objectives of the Muslim League at the time of its formation.',
  model: '1. To promote **loyalty** among Muslims to the **British government**.\n2. To **protect and advance** the **political rights** of Muslims and place their needs before the government. (Also: to prevent **hostility** among Muslims towards other communities.)',
  sol: 'Any two of the three objectives.',
  scheme: [['First objective', 1], ['Second objective', 1]],
}));
Q('s_aims_change_why', short({
  t: 2, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: 'Give two reasons why the League\'s outlook changed between 1906 and 1913.',
  model: '1. The **annulment of the Partition of Bengal (1911)** disappointed many League leaders who had trusted the government.\n2. Younger leaders, including **Muhammad Ali Jinnah** (who joined in **1913**), favoured working with the Congress for **self-government**.',
  sol: 'Annulment; new leadership and goals.',
  scheme: [['Annulment of partition', 1], ['New leaders and goal of self-government', 1]],
}));
Q('s3_objectives_explain', short({
  t: 2, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain the three objectives the Muslim League set out for itself in 1906.',
  model: '1. **Loyalty:** to encourage among Muslims a feeling of **loyalty** to the British government and remove misunderstandings about its intentions.\n2. **Political rights:** to **protect and advance** the political rights of Muslims and present their **needs** to the government in moderate language.\n3. **Harmony:** to prevent the growth among Muslims of **hostility** towards other communities, without harming the first two aims.',
  sol: 'Three objectives, each explained.',
  scheme: [['Loyalty', 1], ['Political rights', 1], ['Harmony with other communities', 1]],
}));

// ================================================================ t03 The Lucknow Pact
Q('m_pact_parties', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'Between which two organisations was the Lucknow Pact agreed?',
  opts: ['The Indian National Congress and the All India Muslim League', 'The Congress and the British government', 'The Muslim League and the princely states', 'The Moderates and the Assertive Nationalists'],
  sol: 'The Pact was an agreement between the Congress and the Muslim League. The Moderates and Assertive Nationalists reunited within the Congress at the same session, but that was not the Pact itself.',
}));
Q('m_pact_leaders', mcq({
  t: 3, d: 2, c: 'recall',
  stem: 'Which pair of leaders is most closely associated with negotiating the Lucknow Pact?',
  opts: ['Bal Gangadhar Tilak and Muhammad Ali Jinnah', 'Gopal Krishna Gokhale and Aga Khan III', 'Dadabhai Naoroji and Sir Syed Ahmad Khan', 'Mahatma Gandhi and Maulana Azad'],
  sol: 'Tilak, for the Congress, and Jinnah, for the League, are the leaders most associated with the Pact. Gokhale had died in 1915; Naoroji and Sir Syed belong to an earlier phase; Gandhi was not yet the leading figure in 1916.',
}));
Q('m_reunion', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Which other important event took place within the Congress at its Lucknow session of 1916?',
  opts: ['The Moderates and the Assertive Nationalists came together again', 'The Congress split into two groups', 'The Congress adopted complete independence as its goal', 'The Congress decided to boycott all elections'],
  sol: 'The two groups that had split at Surat in 1907 reunited at Lucknow in 1916. The Congress adopted complete independence only in 1929, at Lahore.',
}));
Q('m_electorates_accept', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Under the Lucknow Pact, what did the Congress agree to regarding the way Muslims would elect their representatives?',
  opts: ['It accepted separate electorates for Muslims', 'It insisted on joint electorates only', 'It asked for elections to be abolished', 'It left the matter to the princes'],
  sol: 'The Congress accepted separate electorates for Muslims, with seat shares fixed province by province, in return for a joint demand for self-government.',
}));
Q('m_joint_demand', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'What common demand did the Congress and the League place before the government through the Lucknow Pact?',
  opts: ['Self-government for India, with larger elected councils', 'Immediate independence by force', 'Restoration of the Mughal empire', 'Separate countries for each community'],
  sol: 'The two bodies jointly demanded self-government, with enlarged legislative councils having a majority of elected members. The other options were not part of the Pact.',
}));
Q('m_pact_unity', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: 'Why is the Lucknow Pact often described as a high point of cooperation in the national movement?',
  opts: ['The Congress and the League made a joint demand, and the two Congress groups reunited at the same time', 'It ended British rule in India', 'It abolished separate electorates', 'It was signed by the Viceroy'],
  sol: 'The Pact brought the Congress and the League together in a common demand, and it coincided with the reunion of Moderates and Assertive Nationalists. It did not end British rule, it accepted separate electorates, and the Viceroy was not a party to it.',
}));
Q('m_pact_criticism', mcq({
  t: 3, d: 4, c: 'evaluation',
  stem: 'Some historians criticise one feature of the Lucknow Pact for its long-term effects. Which feature is usually meant?',
  opts: ['The Congress\'s acceptance of separate electorates', 'The joint demand for self-government', 'The reunion of the two Congress groups', 'The choice of Lucknow as the venue'],
  sol: 'Critics argue that by accepting separate electorates the Congress recognised politics on a community basis, which they see as having long-term consequences; others see it as a necessary compromise for unity. The other features are not usually criticised in this way.',
}));
Q('m_president_1916', mcq({
  t: 3, d: 3, c: 'recall',
  stem: 'Who presided over the Lucknow session of the Indian National Congress in 1916?',
  opts: ['Ambika Charan Mazumdar', 'Bal Gangadhar Tilak', 'W. C. Bonnerjee', 'Annie Besant'],
  sol: 'Ambika Charan Mazumdar presided over the Congress session at Lucknow in 1916. Tilak attended and helped negotiate the Pact; Bonnerjee presided in 1885; Annie Besant presided in 1917.',
}));
Q('ar_pact_besant', ar({
  t: 3, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'The Congress and the League were able to agree on a joint scheme in 1916.',
  r: 'By 1913 the League had adopted self-government as its goal, which brought its aims close to those of the Congress.',
  sol: 'Both are true, and R explains A: once both bodies sought self-government, a common programme became possible.',
}));
Q('ar_pact_electorates', ar({
  t: 3, d: 4, c: 'analysis', verdict: 'A-true-R-false',
  a: 'The Lucknow Pact is sometimes criticised for its long-term effect on Indian politics.',
  r: 'Under the Pact, the Congress rejected separate electorates for Muslims.',
  sol: 'A is true. R is false: the Congress accepted separate electorates under the Pact, and that acceptance is exactly what critics point to.',
}));
Q('tf_pact_split', tf({
  t: 3, d: 2, c: 'recall', ans: true,
  stem: 'True or false? The Congress groups that had split at Surat in 1907 came together again at Lucknow in 1916.',
  sol: 'True. The Moderates and Assertive Nationalists reunited at the Lucknow session, nine years after the Surat split.',
}));
Q('fb_pact_leaders', fb({
  t: 3, d: 2, c: 'recall',
  stem: 'The Lucknow Pact is associated with Bal Gangadhar Tilak of the Congress and ___ of the Muslim League.',
  acc: [['Muhammad Ali Jinnah', 'Jinnah', 'M. A. Jinnah']],
  sol: 'Muhammad Ali Jinnah represented the League in the negotiations.',
}));
Q('match_ch10', match({
  t: [1, 3], d: 2, c: 'understanding', marks: 2,
  stem: 'Match each event in the story of the League and the Pact with its year.',
  pairs: [
    ['Simla Deputation meets the Viceroy', '1906'],
    ['Separate electorates introduced by the Indian Councils Act', '1909'],
    ['Partition of Bengal annulled', '1911'],
    ['Congress and League agree at Lucknow', '1916'],
  ],
  sol: 'Simla Deputation 1906; Morley-Minto Reforms 1909; annulment of the partition 1911; Lucknow Pact 1916.',
}));
Q('ord_ch10', ord({
  t: [1, 3], d: 2, c: 'understanding', marks: 1,
  stem: 'Arrange these steps on the road from Dacca to Lucknow in the correct order.',
  items: [
    'Muslim leaders meet Lord Minto at Simla',
    'The League is founded at Dacca',
    'Separate electorates come with the Morley-Minto Reforms',
    'The League adopts self-government as its aim',
    'The Congress and the League agree on a joint scheme',
  ],
  sol: 'Simla (October 1906), Dacca (December 1906), Morley-Minto (1909), new aim (1913), Lucknow Pact (1916).',
}));
Q('s_pact_terms_two', short({
  t: 3, d: 2, c: 'recall', marks: 2, wl: S2,
  stem: 'State two terms of the Lucknow Pact of 1916.',
  model: '1. The Congress and the League made a **joint demand for self-government**, with **enlarged councils** having an **elected majority**.\n2. The Congress **accepted separate electorates** for Muslims, with **seat shares fixed province by province**.',
  sol: 'Joint demand; separate electorates.',
  scheme: [['Joint demand', 1], ['Separate electorates and seat shares', 1]],
}));
Q('s_pact_signatories', short({
  t: 3, d: 1, c: 'recall', marks: 2, wl: S2,
  stem: 'Name the two organisations that agreed to the Lucknow Pact and one leader from each.',
  model: '1. The **Indian National Congress**, with **Bal Gangadhar Tilak** among its leaders.\n2. The **All India Muslim League**, with **Muhammad Ali Jinnah** among its leaders.',
  sol: 'Two bodies, one leader each.',
  scheme: [['Congress and a leader', 1], ['League and a leader', 1]],
}));
Q('s_pact_unity_two', short({
  t: 3, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'Give two ways in which the Lucknow Pact strengthened the national movement in the short term.',
  model: '1. It brought the **Congress and the League** together in a **common demand**, showing **Hindu-Muslim cooperation**.\n2. The same session **reunited** the **Moderates and Assertive Nationalists**, making the Congress stronger.',
  sol: 'Congress-League unity; reunion within the Congress.',
  scheme: [['Congress-League cooperation', 1], ['Reunion within the Congress', 1]],
}));
Q('s_pact_long_term', short({
  t: 3, d: 4, c: 'evaluation', marks: 2, wl: S2,
  stem: 'Give one argument that praises and one that criticises the Congress\'s acceptance of separate electorates in 1916.',
  model: '**Praise:** it was a practical **compromise** that won the League\'s support and made a **united demand** possible.\n**Criticism:** it gave **formal recognition** to politics organised by **community**, which critics say had **long-term consequences**.',
  sol: 'One balanced argument on each side.',
  scheme: [['Argument in favour', 1], ['Argument against', 1]],
}));
Q('s_reunion_why', short({
  t: 3, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: 'Why was 1916 a suitable moment for the two Congress groups to come together again?',
  model: 'The **Surat split** had **weakened** the Congress, and many leaders wanted **unity** to press for **self-government** during the war years; with leaders like **Tilak** back in public life and efforts by **Annie Besant**, a **reunion** at **Lucknow** became possible.',
  sol: 'Weakness after Surat; wartime push for self-rule; leaders\' efforts.',
  scheme: [['Weakness after the split', 1], ['Push for unity and self-rule', 1]],
}));
Q('s3_pact_impact', short({
  t: 3, d: 3, c: 'evaluation', marks: 3, wl: S3,
  stem: 'Evaluate the impact of the Lucknow Pact in three points.',
  model: '1. **Unity:** it brought the **Congress and the League** together and showed **Hindu-Muslim cooperation**.\n2. **Stronger demand:** with the **Congress reunited**, the **joint demand for self-government** carried more weight with the government.\n3. **Separate electorates:** by accepting them, the Congress recognised **community-based representation**, which some historians see as having **long-term consequences**, while others see it as a necessary **compromise**.',
  sol: 'Unity; stronger demand; balanced view of electorates.',
  scheme: [['Unity', 1], ['Stronger demand', 1], ['Electorates, balanced', 1]],
}));
Q('s3_pact_why', short({
  t: 3, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Explain three developments between 1911 and 1916 that made the Lucknow Pact possible.',
  model: '1. The **annulment of the Partition of Bengal (1911)** reduced the League\'s trust in the government.\n2. In **1913** the League adopted the goal of **self-government suited to India**, close to the Congress\'s aim.\n3. Leaders such as **Jinnah**, a member of both bodies, and the **reunion** of the Congress groups created conditions for **agreement**.',
  sol: 'Annulment; new League goal; bridging leaders and reunion.',
  scheme: [['Annulment', 1], ['New League goal', 1], ['Bridging leaders or reunion', 1]],
}));

// ================================================================ long (10-mark, 3 + 3 + 4)
Q('l_formation', long({
  t: 1, d: 3, c: 'analysis', marks: 10, wl: L10,
  stem: 'Answer the following about the formation of the Muslim League.\n\n(i) When and where was the Muslim League founded, and who were two leaders associated with its founding? **[3]**\n(ii) What was the Simla Deputation, and what did it ask for? **[3]**\n(iii) Explain how the Partition of Bengal and the agitation against it contributed to the formation of the League. **[4]**',
  model: '(i) It was founded on **30 December 1906** at **Dacca**, at a meeting held during the **All India Muhammadan Educational Conference**. **Nawab Salimullah** of Dacca hosted it, and **Aga Khan III** became its first **President**.\n\n(ii) In **October 1906** a group of Muslim leaders led by **Aga Khan III** met the Viceroy **Lord Minto** at **Simla**. They asked for **separate electorates** and for Muslim representation in councils in keeping with their political importance.\n\n(iii) **Curzon\'s** partition (**1905**) created **Eastern Bengal and Assam**, a **Muslim-majority** province that some Muslim leaders welcomed as an opportunity. The strong **agitation** to undo it, using methods such as **boycott and swadeshi**, made these leaders feel that their interests needed a **separate organisation**, and the favourable reply at Simla encouraged them to form one at Dacca.',
  sol: 'Date, place, leaders; the Deputation; the partition link.',
  scheme: [['(i) Date and place', 1], ['(i) Two leaders', 2], ['(ii) The Deputation', 2], ['(ii) Its demand', 1], ['(iii) New province welcomed by some', 2], ['(iii) Agitation leads to organisation', 2]],
}));
Q('l_factors', long({
  t: 1, d: 3, c: 'analysis', marks: 10, wl: L10,
  stem: 'Answer the following about the background to the Muslim League.\n\n(i) Explain what nationalists meant when they blamed British "divide and rule" for the rise of separate politics. **[3]**\n(ii) How did Sir Syed Ahmad Khan\'s work and views form part of the background? **[3]**\n(iii) Explain how a sense of educational and economic backwardness among sections of Muslims led to the demand for a separate organisation. **[4]**',
  model: '(i) Nationalists argued that the government **encouraged differences** between communities, for example through **separate concessions** and by favouring **separate representation**, so that Indians would not **unite** against British rule.\n\n(ii) Sir Syed founded the **Muhammadan Anglo-Oriental College**, Aligarh (**1875**), to spread **modern education** among Muslims. He advised Muslims to keep away from the **Congress** at that stage, which encouraged a **separate political outlook** among the educated class he influenced.\n\n(iii) Sections of Muslims felt they had fallen behind in **English education**, **government jobs** and **professions**. Their leaders believed that their interests would be overlooked in bodies dominated by others, so they wanted an **organisation of their own** to place their **needs** before the government and secure **representation**.',
  sol: 'Divide and rule; Sir Syed; backwardness.',
  scheme: [['(i) Meaning of divide and rule', 3], ['(ii) Aligarh and education', 2], ['(ii) Advice about the Congress', 1], ['(iii) Sense of backwardness', 2], ['(iii) Why a separate body', 2]],
}));
Q('l_objectives', long({
  t: [2, 1], d: 2, c: 'understanding', marks: 10, wl: L10,
  stem: 'Answer the following about the Muslim League\'s aims.\n\n(i) State the three objectives of the Muslim League at its formation. **[3]**\n(ii) How did the Indian Councils Act of 1909 respond to the League\'s demands? **[3]**\n(iii) Explain how and why the League\'s aims changed by 1913. **[4]**',
  model: '(i) To promote **loyalty** among Muslims to the **British government**; to **protect and advance** the **political rights** of Muslims and represent their needs; and to prevent **hostility** among Muslims towards **other communities**.\n\n(ii) The **Morley-Minto Reforms** (Indian Councils Act, **1909**) **enlarged** the legislative councils and gave Muslims **separate electorates**, in which only Muslim voters chose Muslim members, meeting the main demand of the Simla Deputation.\n\n(iii) The **annulment of the Partition of Bengal in 1911** disappointed League leaders who had trusted the government, and younger leaders such as **Jinnah** favoured **cooperation** with the Congress. In **1913** the League adopted the goal of **self-government suited to India**, which brought it close to the Congress and prepared the ground for **Lucknow (1916)**.',
  sol: 'Three objectives; the 1909 Act; change of aims.',
  scheme: [['(i) Three objectives', 3], ['(ii) Separate electorates', 2], ['(ii) Enlarged councils', 1], ['(iii) Reasons for change', 2], ['(iii) The new aim and its effect', 2]],
}));
Q('l_pact_terms', long({
  t: 3, d: 2, c: 'understanding', marks: 10, wl: L10,
  stem: 'Answer the following about the Lucknow Pact.\n\n(i) When was the Lucknow Pact agreed, between which organisations, and which leaders are most associated with it? **[3]**\n(ii) State three main terms of the Pact. **[3]**\n(iii) Explain the immediate impact of the Pact on the national movement. **[4]**',
  model: '(i) It was agreed in **December 1916** at **Lucknow** between the **Indian National Congress** and the **All India Muslim League**; **Bal Gangadhar Tilak** and **Muhammad Ali Jinnah** are the leaders most associated with it.\n\n(ii) A **joint demand for self-government**; **enlarged councils** with a **majority of elected members**; and the Congress\'s **acceptance of separate electorates**, with **seat shares for Muslims fixed province by province**.\n\n(iii) It showed **Hindu-Muslim unity** and gave the national movement a **common programme**. The same session saw the **reunion** of the **Moderates and Assertive Nationalists**, so the Congress spoke with one voice, and the **joint demand** for self-government added pressure on the British government during the **First World War**.',
  sol: 'Who, when, where; terms; immediate impact.',
  scheme: [['(i) Date, bodies and leaders', 3], ['(ii) Three terms', 3], ['(iii) Unity and common programme', 2], ['(iii) Reunion and pressure', 2]],
}));
Q('l_pact_evaluate', long({
  t: 3, d: 4, c: 'evaluation', marks: 10, wl: L10,
  stem: 'Answer the following about the significance of the Lucknow Pact.\n\n(i) Explain three developments that made agreement between the Congress and the League possible in 1916. **[3]**\n(ii) Why is the Pact regarded as a landmark of cooperation? **[3]**\n(iii) Present one argument for and one argument against the Congress\'s acceptance of separate electorates, and give your own reasoned view. **[4]**',
  model: '(i) The **annulment of the partition (1911)**; the League\'s adoption of **self-government** as its aim (**1913**); and leaders such as **Jinnah**, who belonged to **both** bodies, together with the **reunion** of the Congress groups.\n\n(ii) For the first time the **two main organisations** agreed on a **common scheme**; it showed that **communities could cooperate**; and it gave the demand for **self-government** wider support.\n\n(iii) **For:** it was a practical **compromise** that won the League\'s trust and made a **united demand** possible. **Against:** it **recognised community-based representation**, which critics see as having **long-term consequences**. A balanced view may say it achieved **short-term unity** at the cost of accepting a principle that later proved **divisive**; any reasoned judgement earns credit.',
  sol: 'Developments; landmark; balanced evaluation.',
  scheme: [['(i) Three developments', 3], ['(ii) Why a landmark', 3], ['(iii) Argument for', 1], ['(iii) Argument against', 1], ['(iii) Reasoned judgement', 2]],
}));
Q('l_road_to_lucknow', long({
  t: [1, 2, 3], d: 3, c: 'analysis', marks: 10, wl: L10,
  stem: 'Study the timeline of events from 1870 to 1920 drawn by SOYL and answer the questions that follow.\n\n(i) Identify three events on the timeline that took place between 1905 and 1909, and state one fact about each. **[3]**\n(ii) Using two events from the timeline, explain why the League moved closer to the Congress after 1911. **[3]**\n(iii) How many years separate the founding of the League from the Lucknow Pact, and why is this decade important in the story of the national movement? **[4]**',
  model: `(i) **Partition of Bengal, 1905:** carried out under **Curzon**. **Simla Deputation, 1906:** Muslim leaders led by **Aga Khan III** met **Lord Minto**. **Founding of the League, December 1906:** at **Dacca**. (Also: **Morley-Minto Reforms, 1909:** separate electorates.)\n\n(ii) The **annulment of the partition (1911)** disappointed League leaders who had trusted the government; in **1913** the League adopted **self-government** as its aim, bringing it close to the Congress.\n\n(iii) **${yearsBetween(LEAGUE_FOUNDED, PACT_YEAR)} years** (${PACT_YEAR} − ${LEAGUE_FOUNDED}). In this decade the League moved from **loyalty** to the goal of **self-government**, separate electorates were introduced, the Congress **split (1907)** and **reunited (1916)**, and the two bodies finally made a **joint demand** at Lucknow.`,
  sol: 'Three events; reason for coming closer; the decade.',
  scheme: [['(i) Three events with facts', 3], ['(ii) Annulment', 1], ['(ii) New aim and link', 2], ['(iii) Correct number of years', 1], ['(iii) Importance of the decade', 3]],
  assets: [timelineSvg('Timeline from 1870 to 1920 marking: 1875 MAO College at Aligarh, 1885 Congress founded, 1905 Partition of Bengal, October 1906 Simla Deputation, December 1906 Muslim League, 1909 Morley-Minto Reforms, 1911 partition annulled, 1913 League adopts self-rule aim and 1916 Lucknow Pact', 'Schematic timeline drawn by SOYL; label positions are for legibility only.')],
}));
Q('l_compare_1906_1916', long({
  t: [2, 3], d: 4, c: 'analysis', marks: 10, wl: L10,
  stem: 'Answer the following comparing the League of 1906 with the League of 1916.\n\n(i) Describe the League\'s attitude towards the British government in 1906. **[3]**\n(ii) Describe its attitude towards the Congress and self-government in 1916. **[3]**\n(iii) Explain the reasons for this change. **[4]**',
  model: '(i) In **1906** the League stressed **loyalty** to the British government, asked for **separate representation** through moderate **petitions**, and kept its distance from the **Congress**.\n\n(ii) By **1916** it shared the Congress\'s goal of **self-government**, met at **Lucknow** at the same time as the Congress, and agreed a **joint scheme** of reforms with it.\n\n(iii) The **annulment of the partition (1911)** shook its trust in the government; events at home and abroad made many Muslims **critical** of British policy; **new leaders** such as **Jinnah**, who belonged to both bodies, favoured **cooperation**; and the League\'s **1913** decision to seek **self-government** made a **common programme** possible.',
  sol: 'Attitude in 1906; attitude in 1916; reasons.',
  scheme: [['(i) Attitude in 1906', 3], ['(ii) Attitude in 1916', 3], ['(iii) Annulment and loss of trust', 2], ['(iii) New leaders and aims', 2]],
}));
Q('l_pact_diagram', long({
  t: 3, d: 3, c: 'application', marks: 10, wl: L10,
  stem: 'Study the diagram of the Lucknow Pact drawn by SOYL and answer the questions that follow.\n\n(i) Name the two bodies shown in the diagram and one leader linked with each in the agreement. **[3]**\n(ii) Explain the three points written in the joint scheme box. **[3]**\n(iii) Why did the same Lucknow session matter for the unity of the Congress itself? **[4]**',
  model: '(i) The **Indian National Congress**, linked with **Bal Gangadhar Tilak**, and the **All India Muslim League**, linked with **Muhammad Ali Jinnah**.\n\n(ii) **Common demand for self-government:** both bodies asked for Indian control over government through enlarged, mainly **elected** councils. **Separate electorates accepted:** the Congress agreed that Muslims would elect their own representatives. **Seat shares fixed by province:** the number of Muslim seats in each **provincial council** was settled in advance.\n\n(iii) At the same session the **Moderates** and the **Assertive Nationalists**, who had **split at Surat in 1907**, came together again. The reunited Congress could negotiate with the League as **one body**, and the **national movement** entered the next phase with greater **strength and unity**.',
  sol: 'Bodies and leaders; the three points; reunion.',
  scheme: [['(i) Two bodies and leaders', 3], ['(ii) Three points explained', 3], ['(iii) The Surat split recalled', 2], ['(iii) Effect of the reunion', 2]],
  assets: [pactSvg('Diagram: two boxes, the Indian National Congress (Lucknow session, 1916) and the All India Muslim League (Lucknow session, 1916), with arrows to a central box labelled joint scheme of reforms: common demand for self-government, separate electorates accepted, seat shares fixed by province', 'The Lucknow Pact as a joint scheme (schematic).')],
}));

// ================================================================ source-based
Q('sb_dacca_diary', source({
  t: [1, 2], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the extract from the imagined diary of a young delegate and answer the questions that follow. ${IMAG}`,
  passage: '**Diary of an imagined student delegate from Patna, Dacca, December 1906**\n\nThe education conference ended today, but many of the elders stayed on. Our host, a nobleman of this city, spoke of how the new province had opened schools and offices to people like us, and of how the protests in Calcutta might take it all away. An older delegate reminded us that a group had already gone to Simla in the autumn and been heard kindly. By evening it was settled: we would have a body of our own, to speak for our community to the government, to stay on good terms with it, and to live at peace with our neighbours.',
  parts: [
    child('a', short({ t: 1, d: 1, c: 'recall', marks: 1, stem: 'Which organisation was formed at the meeting described in the diary?', model: 'The **All India Muslim League** (Dacca, **December 1906**).', sol: 'The League.', scheme: [['All India Muslim League', 1]] })),
    child('b', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'Which event of the autumn of 1906 does the older delegate refer to?', model: 'The **Simla Deputation** to **Lord Minto** (October 1906).', sol: 'The Deputation.', scheme: [['Simla Deputation', 1]] })),
    child('c', short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Identify two objectives of the new body that the diary mentions.', model: 'To **speak for** Muslims and put their **needs** before the government (protect their political rights), and to **live at peace** with other communities (prevent hostility). (Also: to stay on **good terms** with the government, that is, **loyalty**.)', sol: 'Any two objectives in the diary.', scheme: [['First objective', 1], ['Second objective', 1]] }), [
      short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): How does the diary show the link between the Partition of Bengal and the League\'s formation?', model: 'The host says the **new province** (Eastern Bengal and Assam) had opened **opportunities**, and fears the **protests in Calcutta** against the partition might take them away; this fear pushed the leaders to form their **own body**.', sol: 'New province and fear of losing it.', scheme: [['The new province', 1], ['Fear of the agitation', 1]] }),
    ]),
  ],
}));
Q('sb_lucknow_letter', source({
  t: 3, d: 3, c: 'evaluation', origin: 'soyl-original',
  stem: `Read the extract from an imagined letter and answer the questions that follow. ${IMAG}`,
  passage: '**Letter from an imagined lawyer in Lucknow to his brother in Madras, January 1917**\n\nBrother, you would not have believed the scenes last week. The two old rival groups of the Congress sat side by side as if Surat had never happened. Across the city, the League met too, and by the end the two bodies had agreed on one plan to put before the government: more elected members, a real share in ruling, and an arrangement on seats that our Muslim friends had long asked for. Some of my colleagues say this last point will cost us dearly one day; others say there could be no agreement without it. I do not yet know who is right.',
  parts: [
    child('a', short({ t: 3, d: 1, c: 'recall', marks: 1, stem: 'Name the agreement described in the letter.', model: 'The **Lucknow Pact** (December **1916**).', sol: 'The Pact.', scheme: [['Lucknow Pact', 1]] })),
    child('b', short({ t: 3, d: 2, c: 'application', marks: 1, stem: 'What does the writer mean by "as if Surat had never happened"?', model: 'The **Moderates and Assertive Nationalists**, who had **split at Surat in 1907**, were **united again**.', sol: 'Reunion after the Surat split.', scheme: [['Reunion after the 1907 split', 1]] })),
    child('c', short({ t: 3, d: 4, c: 'evaluation', marks: 2, stem: '**Either** (i): Which term of the Pact are the writer\'s colleagues arguing about? Give one point made on each side.', model: 'The acceptance of **separate electorates**. **Against:** it would **cost dearly** by recognising politics by **community**. **For:** without it there could be **no agreement** and no united demand.', sol: 'Separate electorates; both sides.', scheme: [['Term identified with one view', 1], ['The other view', 1]] }), [
      short({ t: 3, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Identify two demands in the "one plan" put before the government.', model: '**More elected members** in the councils, and **a real share in ruling** (self-government).', sol: 'Two demands in the plan.', scheme: [['First demand', 1], ['Second demand', 1]] }),
    ]),
  ],
}));
Q('sb_timeline_ch10', source({
  t: [1, 3], d: 2, c: 'application', origin: 'soyl-original',
  stem: 'Study the timeline drawn by SOYL of events from 1875 to 1916 and answer the questions that follow. *(Schematic timeline drawn for practice; dates are those widely taught.)*',
  passage: 'The timeline shows nine events from **1875** to **1916**: a college at Aligarh, the founding of the Congress, the partition of a province, a deputation to the Viceroy, the founding of a new political body, a reform Act, the undoing of the partition, a change of aims and an agreement at Lucknow.',
  assets: [timelineSvg('Timeline from 1870 to 1920 marking: 1875 MAO College at Aligarh, 1885 Congress founded, 1905 Partition of Bengal, October 1906 Simla Deputation, December 1906 Muslim League, 1909 Morley-Minto Reforms, 1911 partition annulled, 1913 League adopts self-rule aim and 1916 Lucknow Pact', 'Schematic timeline drawn by SOYL; label positions are for legibility only.')],
  parts: [
    child('a', short({ t: 1, d: 1, c: 'recall', marks: 1, stem: 'Which Viceroy received the deputation shown on the timeline in 1906?', model: '**Lord Minto**.', sol: 'Viceroy in 1906.', scheme: [['Lord Minto', 1]] })),
    child('b', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'How many years passed between the partition and its annulment?', model: `**${yearsBetween(1905, 1911)} years** (1911 − 1905).`, sol: `1911 − 1905 = ${yearsBetween(1905, 1911)}.`, scheme: [['Correct difference', 1]] })),
    child('c', short({ t: [1, 3], d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Using two events from the timeline, explain how the League moved from loyalty to cooperation with the Congress.', model: 'After the **annulment of the partition (1911)** shook its trust in the government, the League adopted **self-government** as its aim in **1913**, which made the joint scheme with the Congress at **Lucknow (1916)** possible.', sol: 'Annulment, new aim, Pact.', scheme: [['Two events used', 1], ['Link to cooperation explained', 1]] }), [
      short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Why are the two events of 1906 shown so close together on the timeline?', model: 'The **Simla Deputation (October)** and the **founding of the League (December)** were closely linked: the same leaders, encouraged by the hearing at Simla, formed a **permanent body** at Dacca a few weeks later.', sol: 'Link between the Deputation and the League.', scheme: [['Same leaders', 1], ['Deputation encouraged the founding', 1]] }),
    ]),
  ],
}));

// ================================================================ extra objective items for check slides
Q('m_curzon_partition', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Under which Viceroy was Bengal partitioned in 1905?',
  opts: ['Lord Curzon', 'Lord Minto', 'Lord Ripon', 'Lord Lytton'],
  sol: 'Lord Curzon carried out the partition in 1905. Minto followed him; Ripon and Lytton belong to the 1870s and 1880s.',
}));
Q('tf_minto_dacca', tf({
  t: 1, d: 2, c: 'recall', ans: false,
  stem: 'True or false? The Simla Deputation met the Viceroy after the Muslim League had been founded at Dacca.',
  sol: 'False. The Deputation met Lord Minto in October 1906; the League was founded later, on 30 December 1906.',
}));
Q('fb_obj_loyalty', fb({
  t: 2, d: 1, c: 'recall',
  stem: 'One of the first objectives of the Muslim League was to promote ___ among Muslims towards the British government.',
  acc: [['loyalty']],
  sol: 'Promoting loyalty to the British government was one of its first objectives.',
}));
Q('m_jinnah_both', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Why was Muhammad Ali Jinnah well placed to help bring about the Lucknow Pact?',
  opts: ['He was a member of both the Congress and the Muslim League at the time', 'He was the Viceroy\'s adviser', 'He had founded the League at Dacca', 'He opposed self-government'],
  sol: 'Jinnah, who had joined the League in 1913 while remaining in the Congress, could act as a bridge between the two. He was not the Viceroy\'s adviser, did not found the League, and supported self-government.',
}));
Q('m_pact_city', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'In which city did the Congress and the League hold their sessions in December 1916, where they agreed on a joint scheme?',
  opts: ['Lucknow', 'Surat', 'Calcutta', 'Dacca'],
  sol: 'Both bodies met at Lucknow in December 1916. Surat (1907) saw the Congress split; Dacca saw the League\'s founding.',
}));
Q('tf_pact_viceroy', tf({
  t: 3, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? The British Viceroy was one of the parties that signed the Lucknow Pact.',
  sol: 'False. The Pact was an agreement between two Indian organisations, the Congress and the Muslim League; the government was not a party to it.',
}));

// ================================================================ application items (imagined scenarios)
Q('m_sort_factor', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'An imagined pamphlet printed in Dacca in 1906 complains that young men of the community find few places in colleges and government offices. Which factor in the founding of the League does it reflect?',
  opts: ['A sense of educational and economic backwardness', 'The annulment of the Partition of Bengal', 'The Lucknow Pact', 'The reunion of the Congress at Lucknow'],
  sol: 'Few places in colleges and offices points to the sense of educational and economic backwardness. The annulment (1911), the Pact and the reunion (1916) came after 1906.',
}));
Q('m_sort_objective', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'An imagined League resolution of 1907 urges members to keep good relations with the rulers and to clear away doubts about the government\'s intentions. Which of the League\'s first objectives does this match?',
  opts: ['Promoting loyalty to the British government', 'Preventing hostility towards other communities', 'Demanding self-government for India', 'Accepting a joint electorate'],
  sol: 'Good relations with the rulers and removing doubts about the government match the objective of loyalty. Self-government became an aim only in 1913, and the League sought separate, not joint, electorates.',
}));
Q('m_identify_term', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'An imagined councillor in a provincial council in 1917 explains that the number of seats for Muslims in his province had been settled before the elections. Which term of the Lucknow Pact does this reflect?',
  opts: ['Seat shares for Muslims fixed province by province', 'The joint demand for self-government', 'The reunion of the Congress', 'The abolition of separate electorates'],
  sol: 'Seats settled in advance for each province reflect the term fixing Muslim seat shares province by province. The joint demand and the reunion are different points, and the Pact accepted rather than abolished separate electorates.',
}));
Q('m_apply_electorate', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'In an imagined district election of 1912, only Muslim voters could vote for the seat reserved for Muslims. Which measure had introduced this arrangement?',
  opts: ['The Indian Councils Act of 1909', 'The Lucknow Pact of 1916', 'The Partition of Bengal of 1905', 'The founding of the Congress in 1885'],
  sol: 'Separate electorates were introduced by the Indian Councils Act of 1909 (the Morley-Minto Reforms). The Lucknow Pact later accepted them, but it came after 1912.',
}));
Q('m_apply_change', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'An imagined League speaker of 1914 calls for self-government suited to India, to be won together with other communities. Which change in the League\'s outlook does the speech reflect?',
  opts: ['The new aim adopted in 1913', 'The objectives of 1906', 'The demands of the Simla Deputation', 'The reaction to the partition of 1905'],
  sol: 'Self-government won with other communities is the aim the League adopted in 1913. In 1906 it stressed loyalty, and the Simla Deputation asked for separate representation.',
}));
Q('m_apply_1911', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'An imagined League member writes in 1912 that he can no longer rely on the government\'s promises after its decision about Bengal. Which event is he reacting to?',
  opts: ['The annulment of the Partition of Bengal in 1911', 'The Partition of Bengal in 1905', 'The Lucknow Pact of 1916', 'The Indian Councils Act of 1909'],
  sol: 'His loss of trust follows the annulment of the partition in 1911, which disappointed League leaders who had welcomed the new province.',
}));
Q('m_apply_reunion', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'An imagined delegate at Lucknow in 1916 notes that leaders who had quarrelled and parted at Surat now sit side by side. Which development does this describe?',
  opts: ['The reunion of the Moderates and Assertive Nationalists', 'The founding of the Muslim League', 'The Simla Deputation', 'The Morley-Minto Reforms'],
  sol: 'Old opponents from Surat (1907) sitting together describes the reunion of the Moderates and Assertive Nationalists at Lucknow in 1916.',
}));
Q('s_apply_speech', short({
  t: 3, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'An imagined speaker at Lucknow in 1916 says that the seats question has been settled between the two bodies and that both now ask together for a share in governing India. Identify two terms of the Pact reflected in the speech.',
  model: '1. **Seats settled:** the Congress **accepted separate electorates** with **Muslim seat shares fixed** province by province.\n2. **Asking together:** the **joint demand for self-government** by the Congress and the League.',
  sol: 'Two terms identified from the speech.',
  scheme: [['Separate electorates and seat shares', 1], ['Joint demand for self-government', 1]],
}));
