// ICSE 10 History & Civics, ch09 Early Nationalists and Assertive Nationalists (1885–1916) — question bank.
// Every scenario, diary, report and newspaper item is imagined and written by SOYL and labelled as imagined; no
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
  [1876, 'Indian Association'],
  [1892, 'Naoroji in the Commons'],
  [1905, 'Partition of Bengal'],
  [1906, 'Calcutta session: swaraj'],
  [1907, 'Surat Split'],
  [1911, 'Partition annulled'],
  [1916, 'Home Rule League'],
];
for (let i = 1; i < EVENTS.length; i++) assert.ok(EVENTS[i][0] > EVENTS[i - 1][0], 'events in date order');
export const PARTITION = 1905;
export const ANNULLED = 1911;
export const SURAT = 1907;
export const yearsBetween = (a, b) => b - a;
assert.equal(yearsBetween(PARTITION, ANNULLED), 6);
assert.equal(yearsBetween(1885, SURAT), 22);
export const NAOROJI_PRESIDENT = [1886, 1893, 1906];
assert.equal(NAOROJI_PRESIDENT.length, 3);

/** A horizontal timeline from 1870 to 1920 with labels in alternating lanes (theme colours only). */
export function timelineSvg(alt, caption, events = EVENTS) {
  const W = 760, H = 250, x0 = 50, x1 = 710, y = 125, a = 1870, b = 1920;
  const X = (yr) => x0 + ((yr - a) / (b - a)) * (x1 - x0);
  const s = new Svg(W, H);
  s.line(x0, y, x1, y, { sw: 2 });
  for (const yr of [1870, 1880, 1890, 1900, 1910, 1920]) {
    s.line(X(yr), y - 5, X(yr), y + 5, { sw: 1.2, color: 'muted' });
    s.text(X(yr), y + 16, String(yr), { size: 10, muted: true });
  }
  const lanes = [-34, 44, -64, 74, -94, 104, -34];
  events.forEach(([yr, label], i) => {
    const dy = lanes[i % lanes.length];
    const px = X(yr);
    s.line(px, y, px, y + dy + (dy < 0 ? 8 : -8), { sw: 1, color: 'muted' });
    s.dot(px, y, 4, i % 2 ? 'blue' : 'accent');
    s.text(px, y + dy, `${yr} ${label}`, { size: 11, color: i % 2 ? 'blue' : 'accent' });
  });
  return s.visual(alt, caption);
}

/** Two-column comparison chart of the two groups (theme colours only). */
export function compareSvg(alt, caption) {
  const s = new Svg(700, 300);
  const cols = [
    ['Early Nationalists', 'accent', 30, ['Goal: reforms within British rule', 'Petitions, prayers, protests', 'Faith in British justice', 'Educated middle class']],
    ['Assertive Nationalists', 'blue', 370, ['Goal: swaraj (self-rule)', 'Swadeshi and boycott', 'National education', 'Wider popular support']],
  ];
  for (const [head, color, x, rows] of cols) {
    s.rect(x, 20, 300, 44, { rx: 8, fill: color, fillOpacity: 0.25, color, sw: 2 });
    s.text(x + 150, 42, head, { size: 15, bold: true });
    rows.forEach((r, i) => {
      s.rect(x, 80 + i * 52, 300, 40, { rx: 6, fill: color, fillOpacity: 0.1, color, sw: 1.2 });
      s.text(x + 150, 100 + i * 52, r, { size: 13 });
    });
  }
  return s.visual(alt, caption);
}

// ================================================================ t01 Early Nationalists: objectives and methods
Q('m_early_period', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'In ICSE history, the phase of the Early Nationalists (Moderates) in the Indian National Congress is usually dated as',
  opts: ['1885 to 1905–07', '1857 to 1885', '1920 to 1930', '1942 to 1947'],
  sol: 'The Early Nationalists led the Congress from its founding in 1885 until about 1905–07, when the Assertive Nationalists rose and the Congress split at Surat. The other periods belong to 1857, the Gandhian movements and the last phase of the freedom struggle.',
}));
Q('m_early_demand_ics', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Which demand of the Early Nationalists was aimed at the Indianisation of the higher services?',
  opts: [
    'Holding the Indian Civil Service examination in India as well as in England',
    'Complete independence from British rule at once',
    'Boycott of all British schools and colleges',
    'Abolition of the Indian National Congress',
  ],
  sol: 'Holding the civil service examination simultaneously in India (and raising the age limit) would let more Indians enter the higher services. Immediate independence and boycott were not Moderate demands, and they did not seek to abolish their own organisation.',
}));
Q('m_early_method', mcq({
  t: 1, d: 1, c: 'understanding',
  stem: 'Which set of methods best describes how the Early Nationalists pressed their demands?',
  opts: [
    'Petitions, appeals and protest meetings within the law',
    'Armed attacks on government offices',
    'Mass non-payment of taxes all over India',
    'Boycott of the legislative councils',
  ],
  sol: 'The Moderates used constitutional means: petitions and memoranda, appeals to British opinion and public meetings with resolutions. Violence, mass tax refusal and boycott of councils were not their methods.',
}));
Q('m_early_faith', mcq({
  t: 1, d: 2, c: 'analysis',
  stem: 'Why did the Early Nationalists send delegations and memorials to Britain rather than organise mass protests in India?',
  opts: [
    'They believed that the British public and Parliament would grant justice once they knew the facts',
    'They had no supporters at all in India',
    'The British Parliament had banned all meetings in Britain',
    'They wanted to leave India permanently',
  ],
  sol: 'The Moderates had faith in the British sense of justice and fair play, so they tried to educate British opinion. They did have supporters in India, meetings in Britain were not banned, and they were not trying to emigrate.',
}));
Q('m_early_economic', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: 'An imagined resolution of an early Congress session asks the government to lower land revenue, to reduce the share of military spending paid from Indian funds, and to protect Indian industries. Which conclusion about the thinking behind it is best supported?',
  opts: [
    'Its authors held that existing economic policy was hurting India, but they believed that the remedy lay in asking the government to change that policy',
    'Its authors held that British rule must end at once before any economic recovery was possible',
    'Its authors thought that economic policy was already fair and asked only for more jobs for educated Indians',
    'Its authors wanted Indians to stop buying British goods until the demands were met',
  ],
  sol: 'The resolution criticises economic policy (revenue, military burden, neglect of industry) yet only asks the government to reform it, which fits the Moderate faith in constitutional pressure. It does not call for an end to British rule or for boycott (both Assertive ideas), and it would make no sense if policy were thought fair.',
}));
Q('m_councils_1892', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'An imagined Moderate editor writes in 1893 that the enlarged councils are welcome: members may now discuss the budget, but they cannot vote on it and many seats are still filled by nomination. Which course of action would best fit his position?',
  opts: [
    'Welcome the change, and keep asking by resolutions and petitions for more elected members and a real say over the budget',
    'Boycott the councils and call on people to stop paying taxes until the budget is changed',
    'Declare that the change proves the Congress has achieved its aims and should be closed',
    'Give up constitutional methods and organise an armed rising, since the councils have no power',
  ],
  sol: 'He sees the Act of 1892 as a step forward but an incomplete one, so a Moderate would press on with constitutional demands for more elected members and budget powers. Boycott and tax refusal belong to the Assertive phase, declaring victory ignores his own complaints, and armed rising was never a Moderate method.',
}));
Q('ar_moderate_constitutional', ar({
  t: 1, d: 2, c: 'analysis', verdict: 'both-true-explains',
  a: 'The Early Nationalists relied on petitions and appeals rather than direct confrontation with the government.',
  r: 'They believed that British rule, if properly informed, would treat Indians justly.',
  sol: 'Both are true, and R explains A: their faith in British justice led them to use persuasion through petitions and appeals.',
}));
Q('ar_moderate_swaraj', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'A-false-R-true',
  a: 'From 1885 the Early Nationalists demanded complete independence from Britain.',
  r: 'The Early Nationalists wanted more Indians in the legislative councils and the higher services.',
  sol: 'A is false: the Moderates sought reforms within British rule, not complete independence. R is true: expansion of councils and Indianisation of services were among their main demands.',
}));
Q('tf_moderate_mass', tf({
  t: 1, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? The Early Nationalists drew most of their support from peasants and industrial workers in the villages and mills.',
  sol: 'False. Their support came mainly from the educated middle class in the towns, which is one reason critics said they lacked a mass base.',
}));
Q('fb_three_p', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'The methods of the Early Nationalists are often summed up as prayers, petitions and ___.',
  acc: [['protests', 'protest']],
  sol: 'They are remembered as the method of prayers, petitions and protests (meetings and resolutions within the law).',
}));
Q('s_early_objectives', short({
  t: 1, d: 1, c: 'recall', marks: 2, wl: S2,
  stem: 'State any two objectives of the Early Nationalists.',
  model: '1. **Expansion and reform of the legislative councils**, with more elected Indian members.\n2. **Indianisation of the higher services**, for example by holding the civil service examination in India as well. (Also: lower land revenue, less military spending, freedom of the Press.)',
  sol: 'Any two Moderate objectives.',
  scheme: [['First objective', 1], ['Second objective', 1]],
}));
Q('s_early_methods', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Describe two methods the Early Nationalists used to win their demands.',
  model: '1. **Petitions and memoranda** to the government, setting out grievances with facts and figures.\n2. **Public meetings and resolutions** to build opinion, and **delegations** to Britain to inform British leaders and voters.',
  sol: 'Two constitutional methods described.',
  scheme: [['First method', 1], ['Second method', 1]],
}));
Q('s_early_limit', short({
  t: 1, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: 'Why did many younger nationalists come to regard the methods of the Moderates as ineffective by about 1905?',
  model: 'Twenty years of **petitions** had brought only small changes, such as the **Councils Act of 1892**, while many key demands were **ignored**. Measures like the **Partition of Bengal** convinced younger leaders that the government would not yield to **appeals** alone.',
  sol: 'Limited gains; government indifference shown by partition.',
  scheme: [['Limited results of petitions', 1], ['Government indifference (e.g. partition)', 1]],
}));
Q('s3_early_achievements', short({
  t: 1, d: 3, c: 'evaluation', marks: 3, wl: S3,
  stem: 'Evaluate the work of the Early Nationalists by stating three things they achieved despite their limited methods.',
  model: '1. They built an **all-India platform** and trained Indians in **political work** and public debate.\n2. They exposed the **economic exploitation** of India, especially through the **drain of wealth** argument.\n3. They won some reforms, such as the **Indian Councils Act of 1892**, and laid the base on which later, more assertive movements grew.',
  sol: 'Three distinct achievements.',
  scheme: [['Political training and platform', 1], ['Economic critique', 1], ['Reforms or foundation for later movements', 1]],
}));

// ================================================================ t02 Naoroji, Banerjee, Gokhale
Q('m_naoroji_commons', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'Which Indian leader was elected to the British House of Commons in 1892?',
  opts: ['Dadabhai Naoroji', 'Gopal Krishna Gokhale', 'Bal Gangadhar Tilak', 'Bipin Chandra Pal'],
  sol: 'Dadabhai Naoroji was elected to the House of Commons in 1892 and used his seat to raise Indian issues. Gokhale served in the Imperial Legislative Council in India; Tilak and Pal were Assertive leaders.',
}));
Q('m_naoroji_title', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'An imagined exhibition card says of a leader: "He explained India\'s poverty by the steady flow of wealth to Britain, and he won a seat in the British House of Commons." Why would a student of the Early Nationalists see these two achievements as fitting together?',
  opts: [
    'The seat let him put evidence of India\'s grievances before British lawmakers and public, whom the Moderates hoped to persuade',
    'The seat let him command the army and end British rule, which proved the drain argument',
    'The two achievements show that he thought India\'s economy was doing well and needed no reform',
    'The seat made him the organiser of the boycott of British goods in Bengal',
  ],
  sol: 'The Moderates relied on persuading British opinion, so winning a place in the House of Commons gave Naoroji a platform to argue the drain of wealth where decisions were made. A Commons seat gave no command of the army, his argument says India was being impoverished, and the boycott was an Assertive method.',
}));
Q('m_naoroji_thrice', mcq({
  t: 2, d: 2, c: 'recall',
  stem: 'Dadabhai Naoroji presided over the Indian National Congress three times. In which set of years?',
  opts: ['1886, 1893 and 1906', '1885, 1890 and 1905', '1886, 1895 and 1907', '1893, 1902 and 1916'],
  sol: `He presided in ${NAOROJI_PRESIDENT.join(', ')}. The other sets mix in wrong years.`,
}));
Q('m_banerjee_assoc', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'Surendranath Banerjee, along with Ananda Mohan Bose, founded which organisation in 1876?',
  opts: ['The Indian Association', 'The Servants of India Society', 'The Home Rule League', 'The Arya Samaj'],
  sol: 'The Indian Association of Calcutta was founded in 1876 by Surendranath Banerjee and Ananda Mohan Bose. Gokhale founded the Servants of India Society, Tilak started a Home Rule League, and Dayananda founded the Arya Samaj.',
}));
Q('m_banerjee_age', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'In the late 1870s, an imagined young graduate in Lahore is refused entry to the civil service examination because he is just over the lowered age limit; the examination is held only in London, which his family cannot afford. Which pair of Early Nationalist demands, if granted, would most directly have removed both of his obstacles?',
  opts: [
    'A higher maximum age, and the examination held in India as well as in England',
    'Lower land revenue, and protection for Indian industries',
    'More elected Indian members in the councils, and the right to discuss the budget',
    'Freedom of the Press, and the right to hold public meetings',
  ],
  sol: 'His two obstacles are the age limit and the London-only examination, which the Moderates answered with a demand for a higher age limit and simultaneous examinations in India. The other pairs are real Moderate demands but would not have helped him: they concern revenue and industry, the councils, and civil liberties.',
}));
Q('m_bengalee', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Through which newspaper did Surendranath Banerjee spread nationalist ideas?',
  opts: ['The Bengalee', 'Kesari', 'New India', 'Mahratta'],
  sol: 'Banerjee edited The Bengalee. Kesari and Mahratta were Tilak\'s papers, and New India was linked with Bipin Chandra Pal.',
}));
Q('m_gokhale_society', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'Gopal Krishna Gokhale founded the Servants of India Society in which year?',
  opts: ['1905', '1885', '1876', '1916'],
  sol: 'Gokhale founded the Servants of India Society in 1905 to train dedicated workers for public service. 1885 is the founding of the Congress, 1876 the Indian Association and 1916 the Home Rule Leagues.',
}));
Q('m_gokhale_council', mcq({
  t: 2, d: 2, c: 'analysis',
  stem: 'Why were Gopal Krishna Gokhale\'s speeches in the Imperial Legislative Council important for the national movement?',
  opts: [
    'He used facts and figures to criticise government spending and policy from inside the council',
    'He announced the boycott of British goods from the council floor',
    'He was the Viceroy who presided over the council',
    'He moved the resolution that partitioned Bengal',
  ],
  sol: 'As a member of the council, Gokhale examined budgets closely and criticised heavy military spending and the neglect of education with careful arguments. Boycott was an Assertive method, he was never Viceroy, and partition was the government\'s decision.',
}));
Q('m_gokhale_gandhi', mcq({
  t: 2, d: 2, c: 'recall',
  stem: 'Which Moderate leader did Mahatma Gandhi regard as his political guide (guru)?',
  opts: ['Gopal Krishna Gokhale', 'Dadabhai Naoroji', 'Surendranath Banerjee', 'Bipin Chandra Pal'],
  sol: 'Gandhi looked upon Gokhale as his political guru, a relationship widely described in Indian history. The other leaders were not described by Gandhi in this way.',
}));
Q('mt_leaders_early', match({
  t: 2, d: 2, c: 'understanding', marks: 2,
  stem: 'Match each Early Nationalist leader with a contribution linked to him.',
  pairs: [
    ['Dadabhai Naoroji', 'Set out the drain of wealth argument'],
    ['Surendranath Banerjee', 'Founded the Indian Association, 1876'],
    ['Gopal Krishna Gokhale', 'Founded the Servants of India Society, 1905'],
    ['A. O. Hume', 'Helped found the Indian National Congress, 1885'],
  ],
  sol: 'Naoroji: drain of wealth; Banerjee: Indian Association; Gokhale: Servants of India Society; Hume: founding of the Congress.',
}));
Q('s_naoroji_two', short({
  t: 2, d: 1, c: 'recall', marks: 2, wl: S2,
  stem: 'State two contributions of Dadabhai Naoroji to the national movement.',
  model: '1. He set out the **drain of wealth** argument in his book **Poverty and Un-British Rule in India**.\n2. As a **member of the House of Commons (1892)** he raised Indian grievances in Britain; he was **Congress President** in 1886, 1893 and 1906.',
  sol: 'Any two contributions.',
  scheme: [['First contribution', 1], ['Second contribution', 1]],
}));
Q('s_banerjee_two', short({
  t: 2, d: 1, c: 'recall', marks: 2, wl: S2,
  stem: 'State two contributions of Surendranath Banerjee.',
  model: '1. He founded the **Indian Association (1876)** with Ananda Mohan Bose and led an all-India campaign on the **civil service age limit**.\n2. He spread nationalist ideas through his paper **The Bengalee** and led the protest against the **Partition of Bengal**.',
  sol: 'Any two contributions.',
  scheme: [['First contribution', 1], ['Second contribution', 1]],
}));
Q('s_gokhale_two', short({
  t: 2, d: 1, c: 'recall', marks: 2, wl: S2,
  stem: 'State two contributions of Gopal Krishna Gokhale.',
  model: '1. He founded the **Servants of India Society (1905)** to train selfless workers for national service.\n2. In the **Imperial Legislative Council** he criticised government budgets and pressed for **education** and lower **military spending**; he presided over the **Banaras session of 1905**.',
  sol: 'Any two contributions.',
  scheme: [['First contribution', 1], ['Second contribution', 1]],
}));
Q('s3_compare_three', short({
  t: 2, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Naoroji, Banerjee and Gokhale worked in different arenas. Name the main arena of each and one thing he achieved there.',
  model: '1. **Naoroji, British Parliament and writing:** raised Indian issues in the **House of Commons** and set out the **drain** argument.\n2. **Banerjee, public agitation and the Press:** built the **Indian Association** and toured India on the **civil service** issue; edited **The Bengalee**.\n3. **Gokhale, the legislative council:** criticised **budgets** with facts and figures, and trained workers through the **Servants of India Society**.',
  sol: 'Arena plus achievement for each.',
  scheme: [['Naoroji', 1], ['Banerjee', 1], ['Gokhale', 1]],
}));

// ================================================================ t03 Partition of Bengal (1905)
Q('m_partition_viceroy', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'The Partition of Bengal of 1905 was carried out under which Viceroy?',
  opts: ['Lord Curzon', 'Lord Ripon', 'Lord Lytton', 'Lord Minto'],
  sol: 'Lord Curzon (Viceroy 1899–1905) carried out the partition. Ripon and Lytton came earlier, and Minto followed Curzon.',
}));
Q('m_partition_date', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'On which date did the Partition of Bengal come into effect?',
  opts: ['16 October 1905', '28 December 1885', '12 December 1911', '1 April 1916'],
  sol: 'The partition took effect on 16 October 1905, which was observed as a day of mourning. 28 December 1885 is the founding of the Congress, and 12 December 1911 is the Delhi Durbar at which the annulment was announced.',
}));
Q('m_partition_stated', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'What was the official reason the government gave for partitioning Bengal?',
  opts: [
    'The province was too large and populous to be governed efficiently',
    'Bengal had asked to be divided by a popular vote',
    'The Congress had demanded the partition',
    'Bengal needed a separate army',
  ],
  sol: 'The government said the province was too large to administer well. There was no popular vote, the Congress opposed the partition, and an army was not the reason.',
}));
Q('m_partition_real', mcq({
  t: 3, d: 2, c: 'analysis',
  stem: 'Why did nationalists describe the Partition of Bengal as an example of "divide and rule"?',
  opts: [
    'They believed it aimed to weaken Bengali nationalism and to divide Hindus and Muslims',
    'They believed it would make Bengal richer than other provinces',
    'They believed it would give Bengal its own Parliament',
    'They believed it was meant to end famines in Bengal',
  ],
  sol: 'Nationalists saw the partition as a way to break the political strength of Bengal, then the centre of nationalist activity, and to create a Muslim-majority province in the east, setting communities against each other. The other options are not the nationalist view.',
}));
Q('m_partition_new', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: 'The government said it divided Bengal in 1905 because the province was too large to govern well. A student wants to show from the shape of the new arrangement that the aim was also political. Which detail best supports her case?',
  opts: [
    'The division created a Muslim-majority eastern province, separate from the western part in which Calcutta, the centre of nationalist activity, lay',
    'The eastern districts were joined with Assam to form the province of Eastern Bengal and Assam',
    'Dacca was made the capital of the new eastern province',
    'The order was issued under the Viceroy, Lord Curzon, in July 1905',
  ],
  sol: 'A size argument cannot explain why the line was drawn so as to make a Muslim-majority eastern province and to separate it from Calcutta, where nationalist opinion was strongest; this is the evidence for "divide and rule". The other three are true but neutral details that fit the administrative reason equally well.',
}));
Q('m_annulled', mcq({
  t: 3, d: 3, c: 'understanding',
  stem: 'An imagined Calcutta shopkeeper who protested in 1905 says at the end of 1911, "Our long campaign has won, yet our city has lost something." Which pair of announcements made at the Delhi Durbar would make both halves of his remark true?',
  opts: [
    'The partition was annulled, and the capital of British India was to move from Calcutta to Delhi',
    'The partition was confirmed, and the capital of British India was to move from Calcutta to Delhi',
    'The partition was annulled, and the Congress was banned in Bengal',
    'The partition was annulled, and Calcutta was to remain the capital with greater powers',
  ],
  sol: `His gain is the annulment of the partition in ${ANNULLED}, ${yearsBetween(PARTITION, ANNULLED)} years after it came into effect; his loss is Calcutta giving up its place as capital to Delhi, announced at the same Durbar. Confirming the partition would not be a victory, the Congress was not banned in Bengal, and Calcutta did not keep the capital.`,
}));
Q('ar_partition_mourning', ar({
  t: 3, d: 2, c: 'analysis', verdict: 'both-true-explains',
  a: '16 October 1905 was observed in Bengal as a day of mourning.',
  r: 'Nationalists regarded the partition, which took effect that day, as an attack on the unity of Bengal.',
  sol: 'Both are true, and R explains A: because the partition took effect that day and was seen as dividing Bengal, people fasted and mourned.',
}));
Q('ar_partition_swadeshi', ar({
  t: 3, d: 3, c: 'analysis', verdict: 'both-true-not-explains',
  a: 'The Partition of Bengal led to the Swadeshi and Boycott Movement.',
  r: 'Lord Curzon was Viceroy of India from 1899 to 1905.',
  sol: 'Both are true, but R does not explain A. The movement arose because people protested against the partition; the dates of Curzon\'s term do not explain why they adopted swadeshi and boycott.',
}));
Q('tf_partition_congress', tf({
  t: 3, d: 1, c: 'understanding', ans: false,
  stem: 'True or false? The Indian National Congress welcomed the Partition of Bengal as a useful administrative reform.',
  sol: 'False. The Congress and nationalists across India opposed it as a move to divide Bengal and weaken nationalism.',
}));
Q('s_partition_stated_real', short({
  t: 3, d: 2, c: 'analysis', marks: 2, wl: S2,
  stem: 'Distinguish between the stated reason and the nationalist view of the Partition of Bengal.',
  model: '**Stated reason:** Bengal was too **large and populous** to administer efficiently.\n**Nationalist view:** it was a policy of **divide and rule**, meant to weaken **Bengali nationalism** and divide **Hindus and Muslims**.',
  sol: 'Official reason versus nationalist view.',
  scheme: [['Stated reason', 1], ['Nationalist view', 1]],
}));
Q('s_partition_protest', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Mention two ways in which the people of Bengal showed their opposition to the partition in 1905.',
  model: '1. **16 October 1905** was observed as a **day of mourning**, with fasting and closed shops.\n2. People took up **swadeshi** and **boycotted British goods**; Hindus and Muslims tied **rakhis** on one another as a sign of unity.',
  sol: 'Any two forms of protest.',
  scheme: [['First form', 1], ['Second form', 1]],
}));
Q('s3_partition_effects', short({
  t: 3, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Explain three ways in which the Partition of Bengal changed the course of the national movement.',
  model: '1. It started the **Swadeshi and Boycott Movement**, which drew in **students, women and traders**.\n2. It strengthened the **Assertive Nationalists**, since petitions had clearly failed to stop the partition.\n3. It spread protest **beyond Bengal** to Maharashtra and Punjab, giving the movement an **all-India** character.',
  sol: 'Three distinct effects.',
  scheme: [['Swadeshi and boycott', 1], ['Rise of the Assertive group', 1], ['Spread across India', 1]],
}));

// ================================================================ t04 Surat Split, 1907
Q('m_surat_year', mcq({
  t: 4, d: 1, c: 'recall',
  stem: 'The split in the Indian National Congress between the Moderates and the Assertive Nationalists took place at Surat in which year?',
  opts: ['1907', '1905', '1911', '1916'],
  sol: `The Surat Split occurred in December ${SURAT}, ${yearsBetween(1885, SURAT)} years after the Congress was founded. 1905 was the partition, 1911 its annulment and 1916 the year the two groups came together again at Lucknow.`,
}));
Q('m_surat_candidate', mcq({
  t: 4, d: 2, c: 'recall',
  stem: 'Whom did the Moderates support as President of the Surat session of 1907?',
  opts: ['Rash Behari Ghosh', 'Lala Lajpat Rai', 'Bal Gangadhar Tilak', 'Dadabhai Naoroji'],
  sol: 'The Moderates backed Rash Behari Ghosh, while the Assertive group wanted Lala Lajpat Rai (or Tilak) to preside. Naoroji had presided in 1906.',
}));
Q('m_surat_issue', mcq({
  t: 4, d: 2, c: 'analysis',
  stem: 'What was the deeper cause of the Surat Split?',
  opts: [
    'Disagreement over goals and methods: the Assertive group wanted to keep swadeshi, boycott and national education, which many Moderates wished to limit',
    'Disagreement over the language in which the session would be held',
    'A dispute about who would pay for the session',
    'A disagreement about whether to admit members from Madras',
  ],
  sol: 'The real issue was methods and goals: the Assertive Nationalists wanted to continue the 1906 resolutions on swadeshi, boycott and national education, while many Moderates wanted to soften them. The other options are not the cause.',
}));
Q('m_surat_reunite', mcq({
  t: 4, d: 3, c: 'understanding',
  stem: 'An imagined student lists four developments as reasons why the Moderates and the Assertive group could come together again at Lucknow in 1916. One of them cannot be a reason, because of its date. Which one?',
  opts: [
    'Lala Lajpat Rai\'s injury at a demonstration against the Simon Commission, 1928',
    'The annulment of the Partition of Bengal, 1911',
    'Tilak\'s release from Mandalay, 1914',
    'The weakening of the Congress after the Surat Split, 1907',
  ],
  sol: 'An event can only help explain a reunion if it came before it. The Simon Commission demonstration of 1928 was twelve years after Lucknow, so it cannot be a reason. The annulment of the partition (1911), Tilak\'s return from prison (1914) and the weakness the split had caused (from 1907) all came earlier.',
}));
Q('tf_surat_venue', tf({
  t: 4, d: 2, c: 'recall', ans: true,
  stem: 'True or false? The Congress session of 1907 had first been planned for Nagpur but was held at Surat.',
  sol: 'True. The venue was moved from Nagpur, a centre of Assertive support, to Surat, which was widely seen as favouring the Moderates.',
}));
Q('ord_events', ord({
  t: [3, 4, 6], d: 2, c: 'understanding', marks: 1,
  stem: 'Arrange these events of the national movement in the order in which they happened.',
  items: [
    'The Partition of Bengal comes into effect',
    'The Congress splits at Surat',
    'The partition is annulled',
    'Tilak starts a Home Rule League',
  ],
  sol: 'Partition (1905) → Surat Split (1907) → annulment (1911) → Home Rule League (1916).',
}));
Q('s_surat_causes', short({
  t: 4, d: 2, c: 'analysis', marks: 2, wl: S2,
  stem: 'Give two reasons for the split in the Congress at Surat in 1907.',
  model: '1. **Differences over methods:** the Assertive group wanted to extend **swadeshi, boycott and passive resistance**, while the Moderates preferred **constitutional** methods.\n2. **Dispute over the presidency:** the Moderates backed **Rash Behari Ghosh**; the Assertive group wanted **Lala Lajpat Rai**, and the session broke up in disorder.',
  sol: 'Methods; presidency dispute.',
  scheme: [['Difference over methods', 1], ['Presidency dispute', 1]],
}));
Q('s_surat_effect', short({
  t: 4, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: 'How did the Surat Split affect the Congress in the years that followed?',
  model: 'The Congress was left in the hands of the **Moderates**, and the Assertive leaders were outside it, so it became **weaker** and less active. The government also **arrested** leading Assertive Nationalists, and unity returned only at **Lucknow in 1916**.',
  sol: 'Weakened Congress; reunion only in 1916.',
  scheme: [['Effect on the Congress', 1], ['Later development', 1]],
}));

// ================================================================ t05 Assertive Nationalists: objectives and methods
Q('m_assertive_goal', mcq({
  t: 5, d: 1, c: 'understanding',
  stem: 'What was the main political goal of the Assertive Nationalists?',
  opts: ['Swaraj, or self-rule', 'More seats for Europeans in the councils', 'Only lower salt prices', 'A return to Mughal rule'],
  sol: 'The Assertive Nationalists made swaraj (self-rule) their goal. The other options are not their aims.',
}));
Q('m_swadeshi', mcq({
  t: 5, d: 1, c: 'understanding',
  stem: 'What did the term "swadeshi" mean in the movement of 1905?',
  opts: [
    'Using goods made in one\'s own country',
    'Refusing to pay all taxes',
    'Joining the British army',
    'Travelling abroad for education',
  ],
  sol: 'Swadeshi meant using goods made in India, which encouraged Indian industry. It did not mean tax refusal, army service or study abroad.',
}));
Q('m_boycott_scenario', mcq({
  t: 5, d: 3, c: 'application',
  stem: 'In an imagined Calcutta market of 1906, students picket shops that still sell Manchester cloth, and the same students raise money for a handloom workshop that will supply cloth made in Bengal. Why would Assertive leaders want both activities together?',
  opts: [
    'Boycott pressed British trade while swadeshi supplied Indian goods in its place, so the two supported each other',
    'Picketing was lawful but the workshop was a form of armed resistance',
    'The workshop would sell cloth in Britain to repay the drain of wealth',
    'Both were meant to persuade Parliament to pass a law, in the manner of the Moderates',
  ],
  sol: 'Boycott alone would leave buyers without cloth; swadeshi alone would not pressure British trade. Together they hurt foreign trade and built Indian industry. A workshop is not armed resistance, the aim was not to export to Britain, and appealing to Parliament was the Moderate way, not theirs.',
}));
Q('m_national_education', mcq({
  t: 5, d: 2, c: 'analysis',
  stem: 'Why did the Assertive Nationalists set up national schools and colleges?',
  opts: [
    'To give education that built national pride and was free from government control',
    'To train students only for the British civil service',
    'To replace all schools with religious seminaries',
    'To teach only in English and stop the use of Indian languages',
  ],
  sol: 'National education aimed to build self-reliance and national pride, with teaching partly in Indian languages and outside official control. It was not meant only to supply the civil service, was not purely religious, and did not abolish Indian languages.',
}));
Q('m_assertive_rise', mcq({
  t: 5, d: 3, c: 'analysis',
  stem: 'Which event outside India encouraged Indian nationalists after 1905 by showing that an Asian nation could defeat a European power?',
  opts: ['Japan\'s victory over Russia, 1905', 'The French Revolution, 1789', 'The end of the First World War, 1918', 'The American Civil War, 1861–65'],
  sol: 'Japan\'s victory over Russia in 1905 boosted Asian self-confidence and is often listed among the causes of the rise of the Assertive Nationalists. The other events are unrelated in time or meaning.',
}));
Q('m_compare_methods', mcq({
  t: [1, 5], d: 2, c: 'analysis',
  stem: 'Which statement correctly contrasts the two groups in the Congress?',
  opts: [
    'The Moderates relied on petitions; the Assertive Nationalists relied on swadeshi, boycott and passive resistance',
    'The Moderates wanted swaraj at once; the Assertive Nationalists wanted only small reforms',
    'Both groups used armed revolt as their main method',
    'Both groups refused to take part in any public meetings',
  ],
  sol: 'The Moderates worked through petitions and appeals, while the Assertive Nationalists used swadeshi, boycott, national education and passive resistance. The second option reverses the groups, and the last two are false.',
}));
Q('ar_boycott_industry', ar({
  t: 5, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'The Swadeshi Movement helped Indian industries such as textile mills and match factories.',
  r: 'Boycott of foreign goods increased the demand for goods made in India.',
  sol: 'Both are true, and R explains A: when people stopped buying British goods, demand for Indian products rose, helping Indian industries.',
}));
Q('ar_assertive_petition', ar({
  t: 5, d: 2, c: 'analysis', verdict: 'A-true-R-false',
  a: 'The Assertive Nationalists wanted ordinary people to take part in the national movement.',
  r: 'The Assertive Nationalists believed that petitions to the British Parliament were the best way to win swaraj.',
  sol: 'A is true: they sought wider popular participation. R is false: they had lost faith in petitions and preferred swadeshi, boycott and passive resistance.',
}));
Q('tf_passive_resistance', tf({
  t: 5, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? Passive resistance, as used by the Assertive Nationalists, meant refusing to cooperate with unjust government measures without using violence.',
  sol: 'True. Passive resistance meant peaceful non-cooperation with unjust laws and measures.',
}));
Q('fb_swaraj', fb({
  t: 5, d: 1, c: 'recall',
  stem: 'The Assertive Nationalists made ___ (self-rule) the goal of the national movement.',
  acc: [['swaraj', 'swarajya']],
  sol: 'Their goal was swaraj, or self-rule.',
}));
Q('s_assertive_methods', short({
  t: 5, d: 1, c: 'understanding', marks: 2, wl: S2,
  stem: 'Mention any two methods of struggle adopted by the Assertive Nationalists.',
  model: '1. **Swadeshi**: using Indian-made goods and supporting Indian industry.\n2. **Boycott** of foreign goods, and also of government schools, courts and titles. (Also: national education, passive resistance.)',
  sol: 'Any two Assertive methods.',
  scheme: [['First method', 1], ['Second method', 1]],
}));
Q('s_assertive_rise', short({
  t: 5, d: 2, c: 'analysis', marks: 2, wl: S2,
  stem: 'Give two reasons for the rise of the Assertive Nationalists around 1905.',
  model: '1. **Failure of Moderate methods:** years of petitions had brought few results.\n2. **Repressive policies of Lord Curzon**, especially the **Partition of Bengal**, and outside events such as **Japan\'s victory over Russia (1905)** that built confidence.',
  sol: 'Any two causes.',
  scheme: [['First cause', 1], ['Second cause', 1]],
}));
Q('s_national_education', short({
  t: 5, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'What was meant by national education, and why did the Assertive Nationalists support it?',
  model: '**National education** meant schools and colleges run by **Indians**, outside government control, that taught **pride in India** and practical skills. They supported it to free young minds from a **colonial outlook** and to build **self-reliance**.',
  sol: 'Meaning plus purpose.',
  scheme: [['Meaning', 1], ['Purpose', 1]],
}));
Q('s3_compare_groups', short({
  t: [1, 5], d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Compare the Early Nationalists and the Assertive Nationalists on any three points.',
  model: '1. **Goal:** the Early Nationalists sought **reforms within British rule**; the Assertive Nationalists demanded **swaraj**.\n2. **Methods:** petitions, prayers and protests against **swadeshi, boycott and passive resistance**.\n3. **Base of support:** the **educated middle class** against wider **popular participation**, including students and women.',
  sol: 'Three points of comparison, each with both sides.',
  scheme: [['Goal', 1], ['Methods', 1], ['Support base or attitude to British rule', 1]],
}));

// ================================================================ t06 Tilak, Pal and Lajpat Rai
Q('m_tilak_papers', mcq({
  t: 6, d: 1, c: 'recall',
  stem: 'Bal Gangadhar Tilak ran which two newspapers?',
  opts: ['Kesari and Mahratta', 'The Bengalee and Amrita Bazar Patrika', 'New India and Young India', 'The Hindu and The Tribune'],
  sol: 'Tilak ran Kesari (Marathi) and Mahratta (English). The Bengalee was Banerjee\'s; the other pairs are unrelated to Tilak.',
}));
Q('m_tilak_festivals', mcq({
  t: 6, d: 2, c: 'analysis',
  stem: 'Why did Tilak turn the Ganapati and Shivaji festivals into public celebrations?',
  opts: [
    'To bring ordinary people together and spread national feeling through popular gatherings',
    'To raise money for the British government',
    'To replace the Indian National Congress',
    'To stop the use of the Marathi language',
  ],
  sol: 'Public festivals let Tilak reach ordinary people and build pride and unity. They did not raise money for the government, did not replace the Congress, and promoted rather than suppressed Marathi.',
}));
Q('m_tilak_homerule', mcq({
  t: 6, d: 3, c: 'analysis',
  stem: 'An imagined student writes: "Tilak was freed from Mandalay in 1914 and started his Home Rule League in 1916, so the League was a protest against the Partition of Bengal." Which correction is best?',
  opts: [
    'The partition had been annulled in 1911, so the League of 1916 pressed a wider demand for self-government instead',
    'The League was started before his release, so the sequence must be reversed',
    'The League was started in 1907, straight after the Surat Split, so it was a protest against the split',
    'Tilak was never imprisoned at Mandalay, so his dates are wrong',
  ],
  sol: 'The student has taken the order of events as proof of a cause. The partition was annulled in 1911, five years before the League, and the League demanded self-government, so the cause cannot be the partition. The other options contradict the dates: release (1914) came before the League (1916), the League was not started in 1907, and Tilak was imprisoned at Mandalay (1908–14).',
}));
Q('m_tilak_swaraj', mcq({
  t: 6, d: 2, c: 'understanding',
  stem: 'Tilak is widely remembered for declaring that self-rule was an Indian\'s birthright which he would claim. Which idea does this declaration express?',
  opts: [
    'Swaraj is a natural right of Indians, not a favour to be granted by the British',
    'Indians should seek only small reforms within British rule',
    'Indians should leave politics to the British',
    'Self-rule should be postponed for a hundred years',
  ],
  sol: 'The declaration, described here in our own words, treats swaraj as a right Indians possess, not a concession. The other options contradict it.',
}));
Q('m_pal_paper', mcq({
  t: 6, d: 3, c: 'application',
  stem: 'An imagined editorial in a Calcutta weekly of 1906 says that its writer will send no more petitions, and urges readers to stop buying foreign cloth, to leave official schools and to build institutions of their own. Which reading of the editorial is best?',
  opts: [
    'It is Assertive, because it replaces petitions with refusal and self-reliance',
    'It is Moderate, because it asks the British to hear the case of Indians',
    'It is Assertive, because it calls for armed attack on government offices',
    'It is Moderate, because boycott had been the Moderate method since 1885',
  ],
  sol: 'Giving up petitions, boycotting foreign cloth, leaving official schools and building national institutions are the marks of the Assertive programme of swadeshi, boycott and national education, as argued by leaders such as Bipin Chandra Pal. Nothing in it asks the British to hear a case, it proposes no armed attack, and boycott was not a Moderate method.',
}));
Q('m_lajpat_title', mcq({
  t: 6, d: 1, c: 'recall',
  stem: 'Which Assertive Nationalist leader came to be called "Punjab Kesari" (the Lion of Punjab)?',
  opts: ['Lala Lajpat Rai', 'Bipin Chandra Pal', 'Gopal Krishna Gokhale', 'Surendranath Banerjee'],
  sol: 'Lala Lajpat Rai was known as Punjab Kesari. Pal was from Bengal, and Gokhale and Banerjee were Moderates.',
}));
Q('m_lajpat_deport', mcq({
  t: 6, d: 3, c: 'analysis',
  stem: 'An imagined Lahore newspaper of 1907 reports that a popular leader has been deported without trial after farmers\' meetings against new land rules. Which inference about the government\'s thinking is best supported?',
  opts: [
    'It feared a leader who could rouse ordinary people on everyday grievances, which petitions in the council hall never did',
    'It was punishing him for a petition he had sent to Parliament',
    'It was acting on a request from the Congress after the Surat Split',
    'It had accepted his demand for swaraj and was removing him to a safe place',
  ],
  sol: 'Deportation without trial, following mass meetings of farmers, shows alarm at popular agitation of the Assertive kind (the leader was Lala Lajpat Rai, who was deported to Mandalay in 1907). A petition to Parliament was a Moderate, lawful method and would not be punished so, the Congress made no such request, and the government had not accepted swaraj.',
}));
Q('m_lal_bal_pal', mcq({
  t: 6, d: 1, c: 'recall',
  stem: 'The trio of Assertive leaders popularly called "Lal, Bal and Pal" stood for which three leaders?',
  opts: [
    'Lala Lajpat Rai, Bal Gangadhar Tilak and Bipin Chandra Pal',
    'Lal Bahadur Shastri, Balwant Rai and Bipin Chandra Pal',
    'Lala Lajpat Rai, Balasaheb Kher and Pherozeshah Mehta',
    'Lal Mohan Ghosh, Bal Gangadhar Tilak and Gopal Krishna Gokhale',
  ],
  sol: 'Lal, Bal and Pal were Lala Lajpat Rai, Bal Gangadhar Tilak and Bipin Chandra Pal, the leading Assertive Nationalists of Punjab, Maharashtra and Bengal.',
}));
Q('tf_tilak_moderate', tf({
  t: 6, d: 1, c: 'understanding', ans: false,
  stem: 'True or false? Bal Gangadhar Tilak was a leader of the Early Nationalists who opposed boycott and swadeshi.',
  sol: 'False. Tilak was a leading Assertive Nationalist who strongly supported swadeshi, boycott and national education.',
}));
Q('fb_kesari', fb({
  t: 6, d: 1, c: 'recall',
  stem: 'Tilak\'s Marathi newspaper was called ___.',
  acc: [['Kesari']],
  sol: 'Tilak\'s Marathi paper was Kesari; his English paper was Mahratta.',
}));
Q('s_tilak_two', short({
  t: 6, d: 1, c: 'recall', marks: 2, wl: S2,
  stem: 'State two contributions of Bal Gangadhar Tilak to the national movement.',
  model: '1. Through **Kesari** and **Mahratta** he spread the demand for **swaraj** and criticised government policy.\n2. He organised the **Ganapati** and **Shivaji festivals** to unite people, and started a **Home Rule League in 1916**.',
  sol: 'Any two contributions.',
  scheme: [['First contribution', 1], ['Second contribution', 1]],
}));
Q('s_pal_two', short({
  t: 6, d: 2, c: 'recall', marks: 2, wl: S2,
  stem: 'State two contributions of Bipin Chandra Pal.',
  model: '1. He spread nationalist ideas through his English weekly **New India** and other writing.\n2. He was a leading speaker of the **Swadeshi Movement** in Bengal, urging **boycott** and **national education**.',
  sol: 'Any two contributions.',
  scheme: [['First contribution', 1], ['Second contribution', 1]],
}));
Q('s_lajpat_two', short({
  t: 6, d: 2, c: 'recall', marks: 2, wl: S2,
  stem: 'State two contributions of Lala Lajpat Rai.',
  model: '1. He led the **Swadeshi** and protest movement in **Punjab** and was **deported to Mandalay in 1907**.\n2. Linked with the **Arya Samaj**, he worked for **education** and public causes; known as **Punjab Kesari**, he was one of the trio **Lal, Bal and Pal**.',
  sol: 'Any two contributions.',
  scheme: [['First contribution', 1], ['Second contribution', 1]],
}));
Q('s3_trio_regions', short({
  t: 6, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'How did Lal, Bal and Pal together give the Assertive movement an all-India character? Give three points.',
  model: '1. Each led the movement in a **different region**: **Punjab** (Lajpat Rai), **Maharashtra** (Tilak) and **Bengal** (Pal).\n2. They used **newspapers** in several languages and **public meetings** to reach ordinary people.\n3. They spread the same programme of **swaraj, swadeshi and boycott** across these regions, so the movement was not confined to Bengal.',
  sol: 'Regions; means of reaching people; common programme.',
  scheme: [['Three regions', 1], ['Means of reaching people', 1], ['Common programme', 1]],
}));

// ================================================================ long (10-mark, 3 + 3 + 4)
Q('l_early_full', long({
  t: 1, d: 2, c: 'understanding', marks: 10, wl: L10,
  stem: 'Answer the following about the first phase of the Congress.\n\n(i) State three objectives of the Early Nationalists. **[3]**\n(ii) Describe three methods they used. **[3]**\n(iii) Give two achievements and two limitations of the Early Nationalists. **[4]**',
  model: '(i) **Expansion of legislative councils** with more elected Indians; **Indianisation of services** (civil service examination in India too); **economic reforms** such as lower land revenue and less military spending (also civil rights such as a free Press).\n\n(ii) **Petitions and memoranda** to the government; **public meetings and resolutions** to build opinion; **delegations** and appeals to British leaders and voters, trusting in British justice.\n\n(iii) **Achievements:** they built an **all-India platform** and political awareness, and exposed **economic exploitation**; the **Indian Councils Act, 1892** answered some demands. **Limitations:** their support was mainly the **educated middle class**, and **petitions** brought only small results.',
  sol: 'Objectives; methods; balanced appraisal.',
  scheme: [['(i) Three objectives', 3], ['(ii) Three methods', 3], ['(iii) Two achievements', 2], ['(iii) Two limitations', 2]],
}));
Q('l_leaders_early', long({
  t: 2, d: 2, c: 'understanding', marks: 10, wl: L10,
  stem: 'Answer the following about three Early Nationalist leaders.\n\n(i) State the contributions of Dadabhai Naoroji. **[3]**\n(ii) State the contributions of Surendranath Banerjee. **[3]**\n(iii) State the contributions of Gopal Krishna Gokhale and explain why he was respected by later leaders. **[4]**',
  model: '(i) He set out the **drain of wealth** argument; was elected to the **House of Commons (1892)** and raised Indian issues there; was **Congress President** in **1886, 1893 and 1906**.\n\n(ii) He founded the **Indian Association (1876)**; led an all-India campaign on the **civil service age limit**; edited **The Bengalee** and led protests against the **Partition of Bengal**.\n\n(iii) He founded the **Servants of India Society (1905)**; presided over the **Banaras session (1905)**; in the **Imperial Legislative Council** he criticised budgets with facts and figures. He was respected for **honesty, careful argument** and devotion to **public service**, and **Gandhi** regarded him as his political guide.',
  sol: 'Contributions of each leader.',
  scheme: [['(i) Naoroji, three points', 3], ['(ii) Banerjee, three points', 3], ['(iii) Gokhale, contributions', 2], ['(iii) Why respected', 2]],
}));
Q('l_partition_full', long({
  t: 3, d: 3, c: 'analysis', marks: 10, wl: L10,
  stem: 'Answer the following about the Partition of Bengal.\n\n(i) When and under which Viceroy was Bengal partitioned, and what new province was created? **[3]**\n(ii) What reason did the government give, and how did nationalists see the partition? **[3]**\n(iii) Explain how people protested against the partition and what the final outcome was. **[4]**',
  model: '(i) The partition was announced in **July 1905** and took effect on **16 October 1905**, under **Lord Curzon**. The eastern districts were joined with **Assam** to form **Eastern Bengal and Assam**, with its capital at **Dacca**.\n\n(ii) The government said Bengal was **too large** to govern efficiently. Nationalists saw it as **divide and rule**: an attempt to weaken **Bengali nationalism** and divide **Hindus and Muslims** by creating a Muslim-majority province.\n\n(iii) **16 October** was a **day of mourning**; people tied **rakhis** as a symbol of unity; the **Swadeshi and Boycott Movement** spread, with **students** and **women** taking part and Indian industries gaining. The partition was **annulled in 1911**, announced at the **Delhi Durbar**, and the capital moved to **Delhi**.',
  sol: 'Facts; reasons and views; protest and outcome.',
  scheme: [['(i) Date and Viceroy', 2], ['(i) New province', 1], ['(ii) Stated reason', 1], ['(ii) Nationalist view', 2], ['(iii) Forms of protest', 2], ['(iii) Annulment, 1911', 2]],
}));
Q('l_surat_full', long({
  t: 4, d: 3, c: 'analysis', marks: 10, wl: L10,
  stem: 'Answer the following about the Surat Split.\n\n(i) What were the main differences between the two groups in the Congress by 1907? **[3]**\n(ii) Describe what happened at Surat in December 1907. **[3]**\n(iii) Explain the effects of the split on the national movement up to 1916. **[4]**',
  model: '(i) **Goal:** reforms within British rule against **swaraj**. **Methods:** **petitions** against **swadeshi, boycott and passive resistance**. **Attitude:** faith in **British justice** against loss of that faith.\n\n(ii) The session, first planned for **Nagpur**, was moved to **Surat**. The Moderates proposed **Rash Behari Ghosh** as President, while the Assertive group wanted **Lala Lajpat Rai**; there was also fear that the **1906 resolutions** on swadeshi and boycott would be dropped. The session broke up in **disorder** and the Congress **split**.\n\n(iii) The **Moderates** kept control of the Congress, which became **less active**. The government **repressed** the Assertive leaders: **Tilak** was sent to **Mandalay (1908)**. The national movement lost **unity** until the two groups **reunited at Lucknow in 1916**.',
  sol: 'Differences; events at Surat; effects.',
  scheme: [['(i) Three differences', 3], ['(ii) Venue and presidency dispute', 2], ['(ii) Outcome of the session', 1], ['(iii) Moderate control and weakness', 2], ['(iii) Repression and reunion', 2]],
}));
Q('l_assertive_full', long({
  t: 5, d: 3, c: 'analysis', marks: 10, wl: L10,
  stem: 'Answer the following about the Assertive Nationalists.\n\n(i) State three causes of the rise of the Assertive Nationalists. **[3]**\n(ii) State their objectives. **[3]**\n(iii) Explain the methods of swadeshi, boycott and national education. **[4]**',
  model: '(i) **Failure of Moderate methods:** twenty years of petitions had won only small reforms. **Lord Curzon\'s policies**, above all the **Partition of Bengal**, showed that the government ignored Indian opinion. **Japan\'s victory over Russia (1905)** proved that an Asian people could defeat a European power and raised self-confidence (economic distress, famine and plague also added to anger).\n\n(ii) **Swaraj** or self-rule as the goal; **mass participation** of ordinary people, not only the educated few; **self-reliance** and pride in Indian culture; an end to dependence on the goodwill of the British.\n\n(iii) **Swadeshi:** using **Indian-made goods**, which helped Indian **industries** such as textile mills. **Boycott:** refusing **British goods**, and also government **schools, courts and titles**, so that British trade and authority were hurt. **National education:** schools and colleges run by Indians outside **government control**, teaching in Indian languages and building **national pride** and practical skills.',
  sol: 'Causes; objectives; three methods explained.',
  scheme: [['(i) Three causes', 3], ['(ii) Objectives', 3], ['(iii) Swadeshi and boycott', 2], ['(iii) National education', 2]],
}));
Q('l_assertive_leaders', long({
  t: 6, d: 2, c: 'understanding', marks: 10, wl: L10,
  stem: 'Answer the following about three Assertive Nationalist leaders.\n\n(i) State three contributions of Bal Gangadhar Tilak. **[3]**\n(ii) State three contributions of Bipin Chandra Pal. **[3]**\n(iii) State four contributions of Lala Lajpat Rai. **[4]**',
  model: '(i) He spread the idea of **swaraj** as a **birthright** through **Kesari** and **Mahratta**; organised the **Ganapati and Shivaji festivals** to unite people; started a **Home Rule League (1916)**; suffered imprisonment at **Mandalay (1908–14)**.\n\n(ii) He started the English weekly **New India**; was a leading speaker of the **Swadeshi Movement** in Bengal; urged **boycott** and **national education**.\n\n(iii) He led protests in **Punjab** and was **deported to Mandalay (1907)**; was linked with the **Arya Samaj** and worked for **education**; was called **Punjab Kesari**; formed with Tilak and Pal the trio **Lal, Bal and Pal**. (Later, in **1928**, he was injured during a protest against the **Simon Commission** and died soon after.)',
  sol: 'Contributions of each leader.',
  scheme: [['(i) Tilak, three points', 3], ['(ii) Pal, three points', 3], ['(iii) Lajpat Rai, four points', 4]],
}));
Q('l_compare_eval', long({
  t: [1, 5], d: 4, c: 'evaluation', marks: 10, wl: L10,
  stem: 'Historians often compare the two early phases of the national movement.\n\n(i) Compare the Early and Assertive Nationalists on goals and methods. **[3]**\n(ii) Explain how the work of the Early Nationalists prepared the ground for the Assertive phase. **[3]**\n(iii) Evaluate which group did more for the freedom struggle up to 1916, giving reasons for both sides. **[4]**',
  model: '(i) **Goals:** reforms within British rule against **swaraj**. **Methods:** **petitions, prayers and protests** against **swadeshi, boycott, national education and passive resistance**.\n\n(ii) The Moderates built an **all-India organisation**, spread **political awareness**, and exposed **economic exploitation** through the **drain** argument; when their methods failed to stop the **partition**, younger leaders built on this awareness with stronger methods.\n\n(iii) **For the Moderates:** they laid the **foundation**, trained leaders, and won early reforms such as the **1892 Act**. **For the Assertive group:** they gave the movement **mass support**, a clear goal of **swaraj** and methods that hit British trade. A balanced judgement may hold that each was **necessary**: the Assertive phase grew on Moderate foundations. Any reasoned conclusion earns credit.',
  sol: 'Comparison; continuity; balanced evaluation.',
  scheme: [['(i) Goals and methods compared', 3], ['(ii) How the Moderates prepared the ground', 3], ['(iii) Case for each group', 2], ['(iii) Reasoned judgement', 2]],
  assets: [compareSvg('Comparison chart: Early Nationalists (goal reforms within British rule; petitions, prayers, protests; faith in British justice; educated middle class) beside Assertive Nationalists (goal swaraj; swadeshi and boycott; national education; wider popular support)', 'Two phases of the Congress compared.')],
}));
Q('l_timeline_read', long({
  t: [2, 3, 4, 6], d: 4, c: 'analysis', marks: 10, wl: L10,
  stem: 'Study the timeline drawn by SOYL and answer the questions that follow.\n\n(i) Identify the events of 1905, 1907 and 1911 and state one fact about each. **[3]**\n(ii) Which two events on the timeline show the work of Early Nationalist leaders? Explain each briefly. **[3]**\n(iii) Using the timeline, explain how the national movement changed between 1905 and 1916. **[4]**',
  model: '(i) **1905: Partition of Bengal**, under **Lord Curzon**, effective 16 October. **1907: Surat Split**, the Congress divided over methods and the presidency. **1911: annulment** of the partition, announced at the **Delhi Durbar**.\n\n(ii) **1876: Indian Association**, founded by **Surendranath Banerjee** and Ananda Mohan Bose. **1892: Dadabhai Naoroji** elected to the **House of Commons**, where he raised Indian issues.\n\n(iii) In **1905** the partition set off **swadeshi and boycott** and raised the **Assertive** leaders; in **1906** **swaraj** was declared the goal at Calcutta; the **Surat Split (1907)** divided and weakened the Congress; the **annulment (1911)** showed that mass protest could work; by **1916** the **Home Rule League** marked a new, more popular phase.',
  sol: 'Identify events; Moderate events; change over time.',
  scheme: [['(i) Three events with facts', 3], ['(ii) Two Moderate events', 3], ['(iii) Change from 1905 to 1916', 4]],
  assets: [timelineSvg('Timeline from 1870 to 1920 marking: 1876 Indian Association, 1892 Naoroji in the Commons, 1905 Partition of Bengal, 1906 Calcutta session: swaraj, 1907 Surat Split, 1911 Partition annulled and 1916 Home Rule League', 'Schematic timeline; label positions are for legibility only.')],
}));

// ================================================================ source-based
Q('sb_student_diary', source({
  t: [3, 5], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the extract from the imagined diary of a college student and answer the questions that follow. ${IMAG}`,
  passage: '**Diary of an imagined college student, Calcutta, 16 October 1905**\n\nNo fire was lit in our kitchen today; Mother says we must fast. At dawn I walked to the river with my friends, Hindu and Muslim, and we tied coloured threads on each other\'s wrists. The cloth shop near the college has a new board: only country-made cloth sold here. In the afternoon our professor told us that the province had been cut in two "for better government", but the men at the meeting said it was meant to keep us divided.',
  parts: [
    child('a', short({ t: 3, d: 1, c: 'recall', marks: 1, stem: 'Which event is the student writing about?', model: 'The **Partition of Bengal**, which took effect on **16 October 1905**.', sol: 'Partition taking effect.', scheme: [['Partition of Bengal', 1]] })),
    child('b', short({ t: 5, d: 2, c: 'application', marks: 1, stem: 'Which method of the national movement does the board in the cloth shop show?', model: '**Swadeshi** (with boycott of foreign cloth).', sol: 'Country-made cloth only.', scheme: [['Swadeshi', 1]] })),
    child('c', short({ t: 3, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Explain the two different views of the partition that appear in the last sentence.', model: 'The **official view** was that the partition was for **better administration** of a very large province. The **nationalist view** was that it was **divide and rule**, meant to weaken Bengal\'s unity and set **Hindus and Muslims** apart.', sol: 'Official versus nationalist view.', scheme: [['Official view', 1], ['Nationalist view', 1]] }), [
      short({ t: 3, d: 3, c: 'evaluation', marks: 2, stem: '**Or** (ii): Why was the tying of threads between Hindu and Muslim friends a fitting response to the partition?', model: 'Nationalists believed the partition was meant to **divide** the two communities; tying threads was a public sign of **brotherhood and unity**, directly answering that aim.', sol: 'Symbol of unity against division.', scheme: [['Aim of division', 1], ['Unity as the response', 1]] }),
    ]),
  ],
}));
Q('sb_surat_report', source({
  t: 4, d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the extract from an imagined reporter's notes and answer the questions that follow. ${IMAG}`,
  passage: '**Notes of an imagined reporter, Surat, December 1907**\n\nThe hall was full long before the session opened. Some delegates whispered that the meeting should have been held at Nagpur. When the name of the senior Bengal lawyer was proposed for the chair, a section of the hall rose in protest, demanding another leader from Punjab instead. Shouting followed, chairs were overturned, and the session ended without any business done. Outside, a young delegate told me: our elders still write petitions, while we want the people themselves to act.',
  parts: [
    child('a', short({ t: 4, d: 1, c: 'recall', marks: 1, stem: 'Name the "senior Bengal lawyer" proposed for the chair.', model: '**Rash Behari Ghosh**.', sol: 'Moderate candidate for President.', scheme: [['Rash Behari Ghosh', 1]] })),
    child('b', short({ t: 4, d: 2, c: 'application', marks: 1, stem: 'Which leader from Punjab did the protesting group want as President?', model: '**Lala Lajpat Rai**.', sol: 'Assertive choice.', scheme: [['Lala Lajpat Rai', 1]] })),
    child('c', short({ t: [4, 5], d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): How does the young delegate\'s remark explain the deeper cause of the split?', model: 'It shows the clash of **methods**: the Moderates relied on **petitions**, while the Assertive Nationalists wanted **mass action** such as **swadeshi and boycott**. The presidency dispute only brought this difference into the open.', sol: 'Methods as the deeper cause.', scheme: [['Difference in methods', 1], ['Link to the split', 1]] }), [
      short({ t: 4, d: 3, c: 'evaluation', marks: 2, stem: '**Or** (ii): Why might the move from Nagpur to Surat have added to the tension?', model: 'Nagpur was a centre of **Assertive** support, while Surat was seen as more favourable to the **Moderates**, so the Assertive group felt the change was meant to **weaken** them at the session.', sol: 'Venue seen as favouring one side.', scheme: [['Nature of the two venues', 1], ['Why it raised tension', 1]] }),
    ]),
  ],
}));
Q('sb_compare_chart', source({
  t: [1, 5], d: 2, c: 'application', origin: 'soyl-original',
  stem: 'Study the comparison chart drawn by SOYL and answer the questions that follow. *(Chart drawn for practice; it summarises widely taught points.)*',
  passage: 'The chart sets the **Early Nationalists** beside the **Assertive Nationalists** under four headings: goal, methods, attitude to British rule and base of support.',
  assets: [compareSvg('Comparison chart: Early Nationalists (goal reforms within British rule; petitions, prayers, protests; faith in British justice; educated middle class) beside Assertive Nationalists (goal swaraj; swadeshi and boycott; national education; wider popular support)', 'Two phases of the Congress compared.')],
  parts: [
    child('a', short({ t: 5, d: 1, c: 'recall', marks: 1, stem: 'According to the chart, what was the goal of the Assertive Nationalists?', model: '**Swaraj** (self-rule).', sol: 'Read the goal row.', scheme: [['Swaraj', 1]] })),
    child('b', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'Name one Early Nationalist leader whose work fits the chart\'s description of the Moderates.', model: '**Gopal Krishna Gokhale** (or Dadabhai Naoroji, or Surendranath Banerjee).', sol: 'Any Moderate leader.', scheme: [['A Moderate leader', 1]] })),
    child('c', short({ t: [1, 5], d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Using the chart, explain why the Assertive Nationalists won wider popular support.', model: 'Their methods, **swadeshi** and **boycott**, could be followed by **ordinary people** such as shopkeepers, students and women, and the goal of **swaraj** was simple and inspiring, unlike petitions that only the educated could draft.', sol: 'Methods open to all; inspiring goal.', scheme: [['Accessible methods', 1], ['Inspiring goal', 1]] }), [
      short({ t: 1, d: 3, c: 'evaluation', marks: 2, stem: '**Or** (ii): The chart says the Moderates had faith in British justice. Was this faith justified by 1905? Give a reason.', model: 'Largely **not**: years of petitions brought only limited reforms such as the **1892 Act**, and the **Partition of Bengal** was carried out despite strong protests. (Credit a reasoned answer that notes the small gains.)', sol: 'Limited gains; partition despite protest.', scheme: [['Judgement', 1], ['Reason', 1]] }),
    ]),
  ],
}));

// ================================================================ extra objective items for check slides
Q('m_indian_assoc_year', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'In which year was the Indian Association, an important forerunner of the Congress in Bengal, founded?',
  opts: ['1876', '1885', '1892', '1905'],
  sol: 'The Indian Association was founded in 1876. 1885 is the Congress, 1892 the Councils Act and Naoroji\'s election, and 1905 the partition.',
}));
Q('tf_gokhale_banaras', tf({
  t: 2, d: 2, c: 'recall', ans: true,
  stem: 'True or false? Gopal Krishna Gokhale presided over the Banaras session of the Congress in 1905.',
  sol: 'True. Gokhale was President of the Congress at its Banaras session in 1905.',
}));
Q('m_dacca_capital', mcq({
  t: 3, d: 2, c: 'recall',
  stem: 'Which city became the capital of the new province of Eastern Bengal and Assam in 1905?',
  opts: ['Dacca', 'Calcutta', 'Shillong', 'Patna'],
  sol: 'Dacca (now Dhaka) was the capital of Eastern Bengal and Assam. Calcutta remained the capital of Bengal; Shillong and Patna were not the capital of the new province.',
}));
Q('tf_capital_delhi', tf({
  t: 3, d: 2, c: 'recall', ans: true,
  stem: 'True or false? Along with the annulment of the partition in 1911, it was announced that the capital of British India would move from Calcutta to Delhi.',
  sol: 'True. Both were announced at the Delhi Durbar of 1911.',
}));
Q('m_calcutta_1906', mcq({
  t: 5, d: 3, c: 'analysis',
  stem: 'Why is the Calcutta session of 1906 seen as a step towards the Assertive programme even though a Moderate presided?',
  opts: [
    'It declared swaraj as the goal and passed resolutions on swadeshi, boycott and national education',
    'It dissolved the Congress',
    'It welcomed the Partition of Bengal',
    'It chose to stop all public meetings',
  ],
  sol: 'Under Dadabhai Naoroji, the 1906 session adopted swaraj as the goal and supported swadeshi, boycott and national education. It did not dissolve the Congress, welcome the partition or stop meetings.',
}));
Q('tf_tilak_mandalay', tf({
  t: 6, d: 2, c: 'recall', ans: true,
  stem: 'True or false? Bal Gangadhar Tilak was imprisoned at Mandalay from 1908 to 1914.',
  sol: 'True. After his trial in 1908 he was sent to Mandalay in Burma and released in 1914.',
}));
