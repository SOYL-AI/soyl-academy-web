// Build ICSE 10 History & Civics ch09 Early Nationalists and Assertive Nationalists (1885–1916). Run from platform/:
//   npx tsx content/authored/social-science/icse-10-history-civics-ch09/src/build.mjs
import path from 'node:path';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build } from '../../icse-10-history-civics-ch01/src/lib.mjs';

setUnit('icse-10-history-civics-ch09', 'social-science');
const { timelineSvg, compareSvg, EVENTS, PARTITION, ANNULLED, SURAT, NAOROJI_PRESIDENT, yearsBetween } = await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- figures
const vRoute1 = flow('LR', ['Who were the Early Nationalists?', 'Their objectives', 'Their methods', 'Naoroji, Banerjee, Gokhale', 'Achievements and limits'], 'Route map of Part 1: who the Early Nationalists were, their objectives and methods, the leaders Naoroji, Banerjee and Gokhale, and their achievements and limits', 'Part 1 at a glance');
const vRoute2 = flow('LR', ['Partition of Bengal, 1905', 'Rise of the Assertive group', 'Swadeshi, boycott, national education', 'Surat Split, 1907', 'Lal, Bal and Pal'], 'Route map of Part 2: the Partition of Bengal in 1905, the rise of the Assertive Nationalists, swadeshi, boycott and national education, the Surat Split of 1907, and the leaders Lal, Bal and Pal', 'Part 2 at a glance');
const vCompare = compareSvg('Comparison chart: Early Nationalists (goal reforms within British rule; petitions, prayers, protests; faith in British justice; educated middle class) beside Assertive Nationalists (goal swaraj; swadeshi and boycott; national education; wider popular support)', 'Two phases of the Congress compared.');
const vTimeline = timelineSvg('Timeline from 1870 to 1920 marking: 1876 Indian Association, 1892 Naoroji in the Commons, 1905 Partition of Bengal, 1906 Calcutta session: swaraj, 1907 Surat Split, 1911 Partition annulled and 1916 Home Rule League', 'Schematic timeline; label positions are for legibility only.');
const vDemands = table(['Kind of demand', 'Examples'], [
  ['Political', 'Larger legislative councils with more elected Indians; freedom of speech and the Press'],
  ['Administrative', 'Civil service examination in India as well as England; higher age limit; separation of judiciary from executive'],
  ['Economic', 'Lower land revenue; less military spending from Indian funds; protection of Indian industry'],
], 'Table of Moderate demands: political (larger councils, free speech and Press), administrative (civil service examination in India, higher age limit, separate judiciary) and economic (lower land revenue, less military spending, protection of industry)', 'Demands of the Early Nationalists.');
const vMethods = flow('LR', ['Petitions and memoranda', 'Public meetings and resolutions', 'Delegations to Britain', 'Appeal to British justice'], 'Flow of Moderate methods: petitions and memoranda, public meetings and resolutions, delegations to Britain, and appeals to the British sense of justice', 'Prayers, petitions and protests.');
const vLeaders1 = table(['Leader', 'Main contributions'], [
  ['Dadabhai Naoroji', `Drain of wealth argument; House of Commons 1892; Congress President ${NAOROJI_PRESIDENT.join(', ')}`],
  ['Surendranath Banerjee', 'Indian Association 1876; civil service age campaign; The Bengalee; led protest against partition'],
  ['Gopal Krishna Gokhale', 'Servants of India Society 1905; Banaras session 1905; budget criticism in the Imperial Legislative Council'],
], `Table of three Early Nationalist leaders: Dadabhai Naoroji (drain of wealth, House of Commons 1892, Congress President ${NAOROJI_PRESIDENT.join(', ')}), Surendranath Banerjee (Indian Association 1876, civil service age campaign, The Bengalee) and Gopal Krishna Gokhale (Servants of India Society 1905, Banaras session 1905, council speeches)`);
const vSortDemand = table(['Imagined resolution at a Congress session', 'Kind of demand'], [
  ['Hold the civil service examination in Bombay as well as London', 'Administrative'],
  ['Cut the share of Indian revenue spent on frontier wars', 'Economic'],
  ['Allow elected Indians to sit in the councils', 'Political'],
  ['Reduce the land tax in famine years', 'Economic'],
], 'Worked example table sorting four imagined resolutions: civil service examination in Bombay is administrative, cutting war spending and reducing land tax are economic, and elected Indians in the councils is political', 'Ask: is it about power, about jobs and courts, or about money?');
const vAppraisal = table(['Achievements', 'Limitations'], [
  ['All-India platform and political training', 'Support mainly from the educated middle class'],
  ['Exposed economic exploitation (the drain)', 'Too much faith in British justice'],
  ['Some reforms, e.g. the Indian Councils Act, 1892', 'Petitions brought only small gains'],
], 'Table of the Moderates\' achievements (all-India platform, exposure of economic exploitation, the Councils Act of 1892) against their limitations (narrow support, too much faith in British justice, small gains from petitions)', 'A balanced appraisal.');
const vSum1 = flow('TB', ['Moderates, 1885 to about 1907', 'Councils, services, economic reforms', 'Petitions, meetings, delegations', 'Naoroji, Banerjee, Gokhale', 'Foundation for later struggle'], 'Summary flow of Part 1: Moderates from 1885 to about 1907, demands for councils, services and economic reform, methods of petitions, meetings and delegations, the leaders Naoroji, Banerjee and Gokhale, and the foundation they laid', 'Part 1 in five lines.');
const vPartition = table(['Point', 'Fact'], [
  ['Viceroy', 'Lord Curzon'],
  ['Announced and effective', `July ${PARTITION}; effective 16 October ${PARTITION}`],
  ['New province', 'Eastern Bengal and Assam (capital Dacca)'],
  ['Stated reason', 'Bengal too large to govern efficiently'],
  ['Nationalist view', 'Divide and rule: weaken Bengali nationalism; divide Hindus and Muslims'],
  ['Outcome', `Annulled ${ANNULLED} (Delhi Durbar); capital moved to Delhi`],
], `Table of facts on the Partition of Bengal: under Lord Curzon, announced July ${PARTITION} and effective 16 October ${PARTITION}; new province Eastern Bengal and Assam with capital Dacca; stated reason size; nationalist view divide and rule; annulled ${ANNULLED} at the Delhi Durbar with the capital moved to Delhi`);
const vProtest = flow('TB', ['16 October: day of mourning and fasting', 'Rakhis tied as a sign of unity', 'Swadeshi: Indian goods only', 'Boycott of British goods and institutions', 'Movement spreads beyond Bengal'], 'Flow of protest against the partition: a day of mourning on 16 October, rakhis as a sign of unity, swadeshi, boycott of British goods and institutions, and the spread of the movement beyond Bengal', 'How Bengal answered.');
const vRise = flow('LR', ['Petitions bring little', 'Curzon\'s policies and partition', 'Japan defeats Russia, 1905', 'Confidence and anger grow', 'Assertive Nationalists rise'], 'Flow of causes of the rise of the Assertive Nationalists: petitions bring little, Curzon\'s policies and the partition, Japan\'s victory over Russia in 1905, growing confidence and anger, and the rise of the Assertive group', 'Why a new group rose.');
const vAssertMethods = table(['Method', 'What it meant'], [
  ['Swadeshi', 'Use goods made in India; support Indian industry'],
  ['Boycott', 'Refuse British goods, and also government schools, courts and titles'],
  ['National education', 'Schools and colleges run by Indians, outside government control'],
  ['Passive resistance', 'Peaceful refusal to obey unjust measures'],
], 'Table of Assertive methods: swadeshi (use Indian goods), boycott (refuse British goods, schools, courts and titles), national education (Indian-run schools and colleges) and passive resistance (peaceful refusal to obey unjust measures)');
const vClassify = table(['Imagined action in 1906', 'Method'], [
  ['A Pune shop sells only mill cloth from Indian mills', 'Swadeshi'],
  ['Students refuse to sit for a government college examination', 'Boycott'],
  ['A village teacher opens a school with lessons in Bengali on Indian history', 'National education'],
  ['Traders refuse to unload British salt and sugar', 'Boycott'],
], 'Worked example table classifying four imagined actions of 1906: selling only Indian mill cloth is swadeshi, refusing a government college examination and refusing to unload British goods are boycott, and a village school teaching Indian history is national education', 'Ask: is it using Indian, refusing British, or building Indian institutions?');
const vSurat = flow('TB', [`Calcutta ${SURAT - 1}: swaraj, swadeshi, boycott adopted`, 'Venue moved from Nagpur to Surat', 'Presidency: Rash Behari Ghosh against Lajpat Rai', 'Session breaks up in disorder', 'Lucknow 1916: the groups reunite'], `Flow of the Surat Split: Calcutta ${SURAT - 1} adopts swaraj, swadeshi and boycott; the venue moves from Nagpur to Surat; a dispute over Rash Behari Ghosh and Lajpat Rai as President; the session breaks up; the groups reunite at Lucknow in 1916`, `Surat, December ${SURAT}.`);
const vLeaders2 = table(['Leader', 'Region', 'Main contributions'], [
  ['Bal Gangadhar Tilak', 'Maharashtra', 'Kesari and Mahratta; Ganapati and Shivaji festivals; swaraj as a birthright; Home Rule League 1916; Mandalay 1908–14'],
  ['Bipin Chandra Pal', 'Bengal', 'New India weekly; leading voice of swadeshi and boycott'],
  ['Lala Lajpat Rai', 'Punjab', 'Punjab Kesari; Arya Samaj links; deported to Mandalay 1907'],
], 'Table of Lal, Bal and Pal: Tilak of Maharashtra (Kesari and Mahratta, festivals, swaraj as a birthright, Home Rule League 1916, Mandalay 1908 to 1914), Pal of Bengal (New India, swadeshi and boycott) and Lajpat Rai of Punjab (Punjab Kesari, Arya Samaj, deported 1907)');
const vSum2 = flow('TB', [`Partition ${PARTITION}: divide and rule`, 'Swadeshi, boycott, national education', `Surat Split ${SURAT}`, `Annulment ${ANNULLED}`, 'Lal, Bal and Pal; Home Rule League 1916'], `Summary flow of Part 2: partition in ${PARTITION} seen as divide and rule, swadeshi, boycott and national education, the Surat Split of ${SURAT}, annulment in ${ANNULLED}, and Lal, Bal and Pal with the Home Rule League of 1916`, 'Part 2 in five lines.');
assert.equal(yearsBetween(PARTITION, ANNULLED), 6);
assert.ok(EVENTS.some(([y]) => y === SURAT));

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Early and Assertive Nationalists — Part 1: The Early Nationalists (1885–1907)',
  goals: [
    'Explain the objectives of the Early Nationalists and their methods of petitions, prayers and protests',
    'State two contributions each of Dadabhai Naoroji, Surendranath Banerjee and Gopal Krishna Gokhale',
    'Weigh the achievements and limitations of the Moderate phase',
  ],
  slides: [
    sl('title', 'The first leaders of the Congress', {
      b: 'Part 1 — the **Early Nationalists**, also called the **Moderates**.',
      v: vRoute1,
      n: 'For about twenty years after eighteen eighty-five, the Indian National Congress was led by men we call the Early Nationalists, or Moderates. They were lawyers, teachers and journalists who believed that patient argument would win fair treatment for India. In this part we look at what they wanted, how they worked, three of their leaders, and what they achieved.',
    }),
    sl('diagram', 'Two phases, two styles', {
      b: 'Moderates first; **Assertive Nationalists** after about 1905.',
      v: vCompare,
      n: 'The national movement before the First World War had two phases. The Early Nationalists sought reforms within British rule and used petitions and appeals. After about nineteen hundred and five, the Assertive Nationalists demanded self-rule and used swadeshi, boycott and national education. Keep this chart in mind as we study each group in turn.',
    }),
    sl('diagram', 'What the Moderates wanted', {
      b: 'Political, **administrative** and **economic** demands.',
      v: vDemands,
      n: 'The Early Nationalists asked for larger legislative councils with more elected Indians, and for freedom of speech and the Press. They wanted the civil service examination held in India as well as England, so that more Indians could enter the higher services. And they asked for lower land revenue, less military spending from Indian funds and protection for Indian industry.',
    }),
    sl('check', 'Quick check: a forerunner of the Congress', {
      b: 'When was the Indian Association founded?',
      chk: 'm_indian_assoc_year',
      n: 'Before the Congress, Bengal already had an important political association. Can you recall when it was founded?',
    }),
    sl('example', 'Worked example 1: sorting Moderate demands', {
      b: 'Is each imagined resolution **political**, **administrative** or **economic**?',
      bl: ['Step 1: about councils, rights or elections? **Political**.', 'Step 2: about jobs, examinations or courts? **Administrative**.', 'Step 3: about taxes, spending or industry? **Economic**.'],
      v: vSortDemand,
      n: 'Let us sort four imagined resolutions. Holding the civil service examination in Bombay as well as London is about jobs, so it is administrative. Cutting the share of Indian revenue spent on frontier wars is about money, so it is economic. Allowing elected Indians into the councils is about power, so it is political. Reducing the land tax in famine years is economic.',
    }),
    sl('diagram', 'How the Moderates worked', {
      b: '**Petitions**, meetings, delegations, and faith in **British justice**.',
      v: vMethods,
      n: 'The Moderates worked strictly within the law. They sent petitions and memoranda full of facts and figures. They held public meetings and passed resolutions to build opinion. They sent delegations to Britain to inform members of Parliament and voters. Behind all this was their belief that the British, once properly informed, would act justly.',
    }),
    sl('check', 'Quick check: the three P\'s', {
      b: 'Prayers, petitions and ___.',
      chk: 'fb_three_p',
      n: 'The Moderate method is often remembered by three words beginning with the same letter. Can you supply the third?',
    }),
    sl('diagram', 'Three leaders of the Moderate phase', {
      b: '**Naoroji**, **Banerjee** and **Gokhale**.',
      v: vLeaders1,
      n: 'Here are three leaders you must know. Dadabhai Naoroji set out the drain of wealth argument and was elected to the British House of Commons in eighteen ninety-two. Surendranath Banerjee founded the Indian Association and edited The Bengalee. Gopal Krishna Gokhale founded the Servants of India Society and criticised government budgets in the Imperial Legislative Council.',
    }),
    sl('two-column', 'Naoroji and Banerjee', {
      cols: ['**Dadabhai Naoroji**\n\n- **Drain of wealth** argument\n- **House of Commons**, 1892\n- Congress President **1886, 1893, 1906**', '**Surendranath Banerjee**\n\n- **Indian Association**, 1876\n- Campaign on the **civil service age limit**\n- Editor of **The Bengalee**'],
      v: vLeaders1,
      n: 'Dadabhai Naoroji, remembered as the Grand Old Man of India, worked largely in Britain, where he became the first Indian member of the House of Commons. He presided over the Congress three times. Surendranath Banerjee worked through public agitation: he toured India against a lower age limit for the civil service examination and used his newspaper to spread nationalist ideas.',
    }),
    sl('check', 'Quick check: a Moderate President', {
      b: 'True or false: Gokhale presided over the Banaras session of 1905.',
      chk: 'tf_gokhale_banaras',
      n: 'Gokhale was a leading Moderate. Did he preside over the Congress in nineteen hundred and five?',
    }),
    sl('two-column', 'Gopal Krishna Gokhale', {
      cols: ['**What he did**\n\n- **Servants of India Society**, 1905\n- President, **Banaras session**, 1905\n- Budget criticism in the **Imperial Legislative Council**', '**Why he mattered**\n\n- Careful use of **facts and figures**\n- Trained workers for **public service**\n- **Gandhi** regarded him as his political guide'],
      v: vTimeline,
      n: 'Gopal Krishna Gokhale founded the Servants of India Society in nineteen hundred and five to train people for selfless public work, and in the same year presided over the Banaras session of the Congress. In the Imperial Legislative Council he examined budgets closely and argued for more spending on education. Mahatma Gandhi later looked upon him as his political guide.',
    }),
    sl('example', 'Worked example 2: a 10-mark answer in three parts', {
      b: 'Plan for: objectives **[3]**, methods **[3]**, achievements and limitations **[4]**.',
      bl: ['Part (i): three objectives from three different kinds of demand.', 'Part (ii): three methods, each with a word on how it worked.', 'Part (iii): **two** achievements and **two** limitations.', 'Name the **Indian Councils Act, 1892** as one gain.'],
      v: vAppraisal,
      n: 'Here is how to plan a ten-mark question on the Moderates. For the objectives, pick one political, one administrative and one economic demand. For the methods, give petitions, public meetings and delegations to Britain. For the four-mark part, balance two achievements against two limitations, and name the Indian Councils Act of eighteen ninety-two as a concrete gain.',
    }),
    sl('diagram', 'A balanced appraisal', {
      b: 'They laid **foundations**, but **petitions** won little.',
      v: vAppraisal,
      n: 'How should we judge the Moderates? They built an all-India platform, trained Indians in political work and exposed the economic exploitation of India. They also won some reforms, such as the Indian Councils Act of eighteen ninety-two. But their support came mainly from the educated middle class, and their faith in British justice brought only small gains.',
    }),
    sl('check', 'Quick check: match the leaders', {
      b: 'Match each leader with a contribution.',
      chk: 'mt_leaders_early',
      n: 'Four leaders, four contributions. Can you match each name with the work linked to it?',
    }),
    sl('summary', 'Summary of Part 1', {
      bl: ['**Moderates**, 1885 to about 1907: reforms **within** British rule.', 'Demands: **councils**, **services**, **economic** relief.', 'Methods: **petitions**, meetings, delegations; faith in **British justice**.', '**Naoroji** (drain, Commons 1892), **Banerjee** (Indian Association, The Bengalee), **Gokhale** (Servants of India Society, 1905).'],
      v: vSum1,
      n: 'To sum up Part 1. The Early Nationalists led the Congress from eighteen eighty-five to about nineteen hundred and seven. They wanted reforms within British rule and used petitions, meetings and delegations. Naoroji, Banerjee and Gokhale were their leading figures. Their gains were modest, but they laid the foundation on which later movements were built.',
    }),
    sl('exam-tips', 'Exam tips for Part 1', {
      bl: [
        'Do not say the Moderates wanted **complete independence**; they wanted reforms.',
        'Give **two** contributions for each leader, with a **year** where you can.',
        'Naoroji presided **three** times: **1886, 1893, 1906**.',
        'For an appraisal, give **both** achievements and limitations.',
      ],
      n: 'Some tips. Never write that the Moderates demanded complete independence; they sought reforms within British rule. For each leader, give two contributions and a year where possible. Remember that Naoroji presided over the Congress three times. And when you are asked to assess the Moderates, give achievements as well as limitations.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Early and Assertive Nationalists — Part 2: Partition, Surat and the Assertive Nationalists',
  goals: [
    'Explain the stated reason and the nationalist view of the Partition of Bengal, 1905',
    'Give the reasons for the Surat Split of 1907',
    'Compare the objectives and methods of the Assertive Nationalists with those of the Moderates',
    'State two contributions each of Tilak, Bipin Chandra Pal and Lala Lajpat Rai',
  ],
  slides: [
    sl('title', 'A sharper turn in the national movement', {
      b: 'Part 2 — the **Partition of Bengal**, the **Surat Split** and **Lal, Bal and Pal**.',
      v: vRoute2,
      n: 'In nineteen hundred and five, a decision of the government set off the biggest protest India had yet seen. In this part we study the Partition of Bengal, the rise of a new group called the Assertive Nationalists, their methods of swadeshi, boycott and national education, the split in the Congress at Surat, and three leaders known together as Lal, Bal and Pal.',
    }),
    sl('diagram', 'The Partition of Bengal, 1905', {
      b: `Lord **Curzon**; effective **16 October ${PARTITION}**.`,
      v: vPartition,
      n: 'Under Lord Curzon, the large province of Bengal was divided. The partition took effect on the sixteenth of October, nineteen hundred and five. The eastern districts were joined with Assam to form a new province, Eastern Bengal and Assam, with its capital at Dacca. The government said Bengal was too large to govern well. Nationalists saw it very differently.',
    }),
    sl('two-column', 'Stated reason and nationalist view', {
      cols: ['**Government\'s reason**\n\n- Bengal **too large** and populous\n- Better **administration**', '**Nationalist view**\n\n- **Divide and rule**\n- Weaken **Bengali nationalism**\n- Set **Hindus and Muslims** apart'],
      v: vPartition,
      n: 'The government gave an administrative reason: Bengal was too large and populous to be governed efficiently. Nationalists believed the real aim was to divide and rule. Bengal was then the centre of nationalist activity, and creating a Muslim-majority province in the east, they argued, was meant to weaken that strength and set the two communities against each other.',
    }),
    sl('check', 'Quick check: a new capital', {
      b: 'Which city became the capital of Eastern Bengal and Assam?',
      chk: 'm_dacca_capital',
      n: 'The new eastern province needed a capital. Which city was chosen?',
    }),
    sl('diagram', 'How Bengal answered', {
      b: 'Mourning, **rakhis**, **swadeshi** and **boycott**.',
      v: vProtest,
      n: 'The day the partition took effect was observed as a day of mourning. Many families fasted and shops stayed closed. Hindus and Muslims tied rakhis on one another as a sign of unity. People took a pledge to use only Indian goods and to boycott British ones. Students and women joined in large numbers, and the movement spread beyond Bengal.',
    }),
    sl('diagram', 'Why the Assertive Nationalists rose', {
      b: 'Failure of petitions, **Curzon\'s** policies, and new **confidence**.',
      v: vRise,
      n: 'Why did a new, more assertive group rise at this time? Twenty years of petitions had brought little. Lord Curzon\'s policies, above all the partition, showed that the government ignored Indian opinion. And in nineteen hundred and five Japan defeated Russia, showing that an Asian nation could defeat a European power. Confidence and anger grew together.',
    }),
    sl('diagram', 'The Assertive methods', {
      b: '**Swadeshi**, **boycott**, **national education**, **passive resistance**.',
      v: vAssertMethods,
      n: 'The Assertive Nationalists demanded swaraj, or self-rule. Their methods were swadeshi, which meant using goods made in India; boycott of British goods, and later of government schools, courts and titles; national education in schools and colleges run by Indians; and passive resistance, the peaceful refusal to obey unjust measures. These methods let ordinary people take part.',
    }),
    sl('example', 'Worked example 3: which method is it?', {
      b: 'Classify four imagined actions of **1906**.',
      bl: ['Using or selling **Indian** goods: **swadeshi**.', 'Refusing **British** goods or institutions: **boycott**.', 'Building **Indian-run** schools: **national education**.'],
      v: vClassify,
      n: 'Let us classify four imagined actions of nineteen hundred and six. A shop in Pune that sells only cloth from Indian mills is practising swadeshi. Students who refuse to sit a government college examination, and traders who refuse to unload British salt, are practising boycott. A village teacher who opens a school teaching Indian history in Bengali is building national education.',
    }),
    sl('check', 'Quick check: the Calcutta session', {
      b: 'Why was the Calcutta session of 1906 important?',
      chk: 'm_calcutta_1906',
      n: 'A Moderate presided over the Calcutta session of nineteen hundred and six, yet it is seen as a step towards the Assertive programme. Why?',
    }),
    sl('diagram', 'The Surat Split, 1907', {
      b: '**Methods** and the **presidency** divided the Congress.',
      v: vSurat,
      n: 'At Calcutta in nineteen hundred and six, the Congress had adopted swaraj, swadeshi, boycott and national education. The Assertive group feared the Moderates would drop these. In nineteen hundred and seven the session was moved from Nagpur to Surat. The Moderates proposed Rash Behari Ghosh as President, the Assertive group wanted Lala Lajpat Rai, and the session broke up in disorder.',
    }),
    sl('example', 'Worked example 4: a three-point comparison', {
      b: 'Compare the two groups on **goal**, **methods**, **attitude** and **support**; give **both sides** of each point.',
      bl: ['Goal: **reforms** against **swaraj**.', 'Methods: **petitions** against **swadeshi and boycott**.', 'Attitude to Britain: **trust** against **distrust**.', 'Support: **educated** middle class against wider **popular** support.'],
      v: vCompare,
      n: 'Compare the two groups on four points. The Moderates sought reforms; the Assertive Nationalists sought swaraj. The Moderates used petitions; the Assertive group used swadeshi and boycott. The Moderates trusted British justice; the Assertive group had lost that trust. And while the Moderates drew mainly on the educated middle class, the Assertive group reached far wider sections of the people.',
    }),
    sl('diagram', 'Lal, Bal and Pal', {
      b: 'Three leaders from **Punjab**, **Maharashtra** and **Bengal**.',
      v: vLeaders2,
      n: 'Three leaders gave the Assertive movement its strength. Bal Gangadhar Tilak of Maharashtra ran the papers Kesari and Mahratta, organised the Ganapati and Shivaji festivals, and declared self-rule to be a birthright of Indians. Bipin Chandra Pal of Bengal edited New India and spoke for swadeshi. Lala Lajpat Rai of Punjab, called Punjab Kesari, was deported to Mandalay in nineteen hundred and seven.',
    }),
    sl('check', 'Quick check: Tilak in prison', {
      b: 'True or false: Tilak was imprisoned at Mandalay from 1908 to 1914.',
      chk: 'tf_tilak_mandalay',
      n: 'Tilak paid a heavy price for his writing. Where, and for how long, was he imprisoned?',
    }),
    sl('diagram', 'From partition to Home Rule', {
      b: `Partition **${PARTITION}**, Surat **${SURAT}**, annulment **${ANNULLED}**, Home Rule **1916**.`,
      v: vTimeline,
      n: 'Follow the years on this timeline. The partition of nineteen hundred and five led to swadeshi and boycott. Swaraj was declared the goal at Calcutta in nineteen hundred and six. The Congress split at Surat in nineteen hundred and seven. The partition was annulled in nineteen eleven, and in nineteen sixteen Tilak started a Home Rule League as the two groups came together again.',
    }),
    sl('check', 'Quick check: a new capital for India', {
      b: 'True or false: in 1911 it was announced that the capital would move to Delhi.',
      chk: 'tf_capital_delhi',
      n: 'The annulment of the partition came with another big announcement. What was it?',
    }),
    sl('summary', 'Summary of Part 2', {
      bl: [`**Partition of Bengal**: Curzon, 16 October ${PARTITION}; seen as **divide and rule**; annulled **${ANNULLED}**.`, 'Assertive goal **swaraj**; methods **swadeshi, boycott, national education, passive resistance**.', `**Surat Split ${SURAT}**: methods and the presidency (Rash Behari Ghosh); reunion at **Lucknow 1916**.`, '**Tilak** (Kesari, festivals, Home Rule League), **Pal** (New India), **Lajpat Rai** (Punjab Kesari, Mandalay 1907).'],
      v: vSum2,
      n: 'To sum up Part 2. The Partition of Bengal, which nationalists saw as divide and rule, set off the Swadeshi and Boycott Movement and raised the Assertive Nationalists. Differences over methods and the presidency split the Congress at Surat in nineteen hundred and seven. Tilak, Pal and Lajpat Rai carried the demand for swaraj to Maharashtra, Bengal and Punjab.',
    }),
    sl('exam-tips', 'Exam tips for Part 2', {
      bl: [
        `Give **both** the stated reason and the nationalist view of the partition; the date is **16 October ${PARTITION}**.`,
        'For Surat, name **two** causes: **methods** and the **presidency** dispute.',
        'Keep the trio straight: **Lal** (Punjab), **Bal** (Maharashtra), **Pal** (Bengal).',
        'Describe Tilak\'s **swaraj** idea in your own words; do not misquote it.',
      ],
      n: 'Some tips. For the partition, always give both the government\'s reason and the nationalist view, and remember the date it took effect. For the Surat Split, name two causes: methods and the dispute over the presidency. Keep Lal, Bal and Pal linked to Punjab, Maharashtra and Bengal. And describe Tilak\'s idea of swaraj in your own words.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Early Nationalists and Assertive Nationalists (1885–1916) — notes',
  sections: [
    {
      h: '1. The Early Nationalists: objectives and methods',
      t: 1,
      b: '- **Period:** 1885 to about 1905–07; also called the **Moderates**; mainly the **educated middle class**.\n- **Objectives:** larger **legislative councils** with elected Indians; **Indianisation** of services (civil service examination in India too, higher age limit); separation of judiciary from executive; **economic** relief (lower land revenue, less military spending, protection of industry); civil rights (free speech and Press).\n- **Methods:** **petitions** and memoranda, **public meetings** and resolutions, **delegations** to Britain; faith in the British **sense of justice** ("prayers, petitions and protests").\n- **Achievements:** all-India platform; political training; exposure of **economic exploitation**; **Indian Councils Act, 1892**. **Limitations:** narrow base; small gains from petitions.',
      terms: [['Moderates', 'The Early Nationalists who led the Congress from 1885 to about 1907 and sought reforms by constitutional methods.'], ['Memorandum', 'A formal written statement of demands sent to the government.']],
      v: vDemands,
      vs: [vMethods, vAppraisal],
    },
    {
      h: '2. Naoroji, Banerjee and Gokhale',
      t: 2,
      b: `- **Dadabhai Naoroji** ("Grand Old Man of India"): **drain of wealth** argument (*Poverty and Un-British Rule in India*); elected to the **House of Commons, 1892**; Congress President **${NAOROJI_PRESIDENT.join(', ')}**; at the **1906** Calcutta session swaraj was declared the goal.\n- **Surendranath Banerjee:** **Indian Association (1876)** with Ananda Mohan Bose; all-India campaign on the **civil service age limit**; editor of **The Bengalee**; led the protest against the partition.\n- **Gopal Krishna Gokhale:** **Servants of India Society (1905)**; President, **Banaras session (1905)**; budget criticism in the **Imperial Legislative Council**; regarded by **Gandhi** as his political guide.`,
      terms: [['Servants of India Society', 'Founded by Gokhale in 1905 to train dedicated workers for public service.'], ['Indian Association', 'Founded in Calcutta in 1876 by Surendranath Banerjee and Ananda Mohan Bose.']],
      v: vLeaders1,
      vs: [vSortDemand],
    },
    {
      h: '3. The Partition of Bengal (1905)',
      t: 3,
      b: `- **Viceroy:** Lord **Curzon**; announced **July ${PARTITION}**, effective **16 October ${PARTITION}**.\n- **New province:** **Eastern Bengal and Assam**, capital **Dacca**.\n- **Stated reason:** Bengal too **large** to govern efficiently.\n- **Nationalist view:** **divide and rule**, to weaken Bengali nationalism and divide Hindus and Muslims.\n- **Protest:** day of **mourning**; **rakhis** as a symbol of unity; **swadeshi** and **boycott**; students and women took part.\n- **Outcome:** annulled in **${ANNULLED}**, announced at the **Delhi Durbar**; capital moved from Calcutta to **Delhi**.`,
      terms: [['Partition of Bengal', `The division of Bengal by Lord Curzon, effective 16 October ${PARTITION}; annulled in ${ANNULLED}.`], ['Divide and rule', 'A policy of keeping control by setting groups of the ruled against one another.']],
      v: vPartition,
      vs: [vProtest],
    },
    {
      h: '4. The Surat Split (1907)',
      t: 4,
      b: `- **Background:** the **Calcutta session (1906)**, under Naoroji, adopted **swaraj**, **swadeshi**, **boycott** and **national education**.\n- **Causes:** differences over **goals and methods**; fear that the Moderates would drop the 1906 resolutions; venue moved from **Nagpur** to **Surat**; dispute over the **presidency**: the Moderates backed **Rash Behari Ghosh**, the Assertive group wanted **Lala Lajpat Rai**.\n- **Result:** the session broke up in **disorder** (December ${SURAT}); the Moderates kept control of the Congress; the government repressed Assertive leaders; the groups **reunited at Lucknow, 1916**.`,
      terms: [['Surat Split', `The division of the Congress into Moderate and Assertive groups at Surat in December ${SURAT}.`]],
      v: vSurat,
      vs: [vTimeline],
    },
    {
      h: '5. The Assertive Nationalists: objectives and methods',
      t: 5,
      b: '- **Causes of their rise:** failure of Moderate methods; **Curzon\'s** policies and the **partition**; **Japan\'s victory over Russia (1905)**; growing self-confidence.\n- **Objectives:** **swaraj** (self-rule); **mass participation**; self-reliance and national pride.\n- **Methods:** **swadeshi** (use Indian goods); **boycott** (of British goods, government schools, courts, titles); **national education** (Indian-run schools and colleges); **passive resistance** (peaceful refusal to obey unjust measures).\n- **Contrast with the Moderates:** swaraj against reforms; mass action against petitions; lost faith in British justice.',
      terms: [['Swaraj', 'Self-rule; the goal of the Assertive Nationalists.'], ['Swadeshi', 'Use of goods made in one\'s own country.'], ['Boycott', 'Refusal to buy or use foreign goods and government institutions.']],
      v: vAssertMethods,
      vs: [vRise, vClassify, vCompare],
    },
    {
      h: '6. Tilak, Pal and Lajpat Rai',
      t: 6,
      b: '- **Bal Gangadhar Tilak** (Maharashtra): **Kesari** (Marathi) and **Mahratta** (English); **Ganapati** and **Shivaji** festivals; declared self-rule a **birthright** of Indians (paraphrased); imprisoned at **Mandalay, 1908–14**; started a **Home Rule League, 1916**.\n- **Bipin Chandra Pal** (Bengal): English weekly **New India**; leading voice of **swadeshi** and **boycott**.\n- **Lala Lajpat Rai** (Punjab): **Punjab Kesari**; linked with the **Arya Samaj** and education; **deported to Mandalay, 1907**. (Later context: injured during a protest against the Simon Commission in 1928; died soon after.)\n- Together known as **Lal, Bal and Pal**.',
      terms: [['Lal, Bal and Pal', 'Lala Lajpat Rai, Bal Gangadhar Tilak and Bipin Chandra Pal, the leading Assertive Nationalists.']],
      v: vLeaders2,
      vs: [],
    },
  ],
  tips: '**Common mistakes**\n- Saying the Moderates wanted complete independence.\n- Writing 1907 for the partition (it was 1905; Surat was 1907).\n- Naming the wrong Viceroy: the partition was under **Curzon**.\n- Mixing up the Moderate (Rash Behari Ghosh) and Assertive (Lajpat Rai) choices at Surat.\n- Quoting Tilak\'s swaraj declaration inaccurately; describe the idea in your own words.\n\n**How marks are usually awarded**\n- 1-mark items: one correct option or term.\n- 2 marks: two distinct points (for a leader, two contributions).\n- 10-mark questions in 3 + 3 + 4 parts: one point per mark; the 4-mark part often asks for causes and effects, a comparison or a balanced judgement.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['Early Nationalists (Moderates)', 'Led the Congress 1885 to about 1907; sought reforms within British rule.', 'definition', 1],
  ['Moderate methods', 'Petitions, meetings and resolutions, delegations; faith in British justice.', 'concept', 1],
  ['Two Moderate demands', 'Larger councils with elected Indians; civil service examination in India too.', 'fact', 1],
  ['A gain of the Moderate phase', '**Indian Councils Act, 1892**.', 'fact', 1],
  ['A limitation of the Moderates', 'Support mainly from the educated middle class.', 'concept', 1],
  ['Grand Old Man of India', '**Dadabhai Naoroji**.', 'fact', 2],
  ['Naoroji in Britain', 'Elected to the **House of Commons, 1892**.', 'fact', 2],
  ['Naoroji as Congress President', `**${NAOROJI_PRESIDENT.join(', ')}**.`, 'fact', 2],
  ['Indian Association', '**1876**, Surendranath Banerjee and Ananda Mohan Bose.', 'fact', 2],
  ['Banerjee\'s newspaper', '**The Bengalee**.', 'fact', 2],
  ['Servants of India Society', '**Gokhale**, **1905**.', 'fact', 2],
  ['Gokhale and Gandhi', 'Gandhi regarded Gokhale as his political guide.', 'fact', 2],
  ['Partition of Bengal: Viceroy and date', `**Curzon**; effective **16 October ${PARTITION}**.`, 'fact', 3],
  ['New province of 1905', '**Eastern Bengal and Assam**; capital **Dacca**.', 'fact', 3],
  ['Partition: stated reason', 'Bengal too large to govern efficiently.', 'concept', 3],
  ['Partition: nationalist view', 'Divide and rule; weaken Bengali nationalism; divide Hindus and Muslims.', 'concept', 3],
  ['Partition annulled', `**${ANNULLED}**, Delhi Durbar; capital moved to Delhi.`, 'fact', 3],
  ['Surat Split', `**December ${SURAT}**; methods and the presidency.`, 'fact', 4],
  ['Moderate candidate at Surat', '**Rash Behari Ghosh**.', 'fact', 4],
  ['Reunion of the two groups', '**Lucknow, 1916**.', 'fact', 4],
  ['Goal of the Assertive Nationalists', '**Swaraj** (self-rule).', 'definition', 5],
  ['Swadeshi', 'Using goods made in India.', 'definition', 5],
  ['Boycott', 'Refusing British goods, and government schools, courts and titles.', 'definition', 5],
  ['National education', 'Indian-run schools and colleges outside government control.', 'definition', 5],
  ['An outside cause of the Assertive rise', 'Japan\'s victory over Russia, **1905**.', 'fact', 5],
  ['Tilak\'s newspapers', '**Kesari** (Marathi) and **Mahratta** (English).', 'fact', 6],
  ['Tilak\'s festivals', '**Ganapati** and **Shivaji** festivals.', 'fact', 6],
  ['Bipin Chandra Pal\'s weekly', '**New India**.', 'fact', 6],
  ['Punjab Kesari', '**Lala Lajpat Rai**; deported to Mandalay **1907**.', 'fact', 6],
  ['Lal, Bal and Pal', 'Lajpat Rai (Punjab), Tilak (Maharashtra), Pal (Bengal).', 'exam-tip', 6],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'icse-10-history-civics-chapter-test-short',
  title: 'Chapter test (short) — Early Nationalists and Assertive Nationalists (1885–1916)',
  duration: 30,
  sections: [
    { id: 'I', title: 'Part I — Compulsory (10 marks)', instr: 'Attempt all questions. Questions 1–6 carry 1 mark each; questions 7 and 8 carry 2 marks each.', items: ['m_early_method', 'm_naoroji_commons', 'm_partition_viceroy', 'm_surat_candidate', 'm_swadeshi', 'ar_moderate_constitutional', 's_early_objectives', 's_partition_stated_real'] },
    { id: 'II', title: 'Part II — Structured question (10 marks)', instr: 'Attempt any ONE of the two questions. Each is in three parts (3 + 3 + 4 marks).', items: [{ attempt: 1, keys: ['l_partition_full', 'l_assertive_leaders'] }] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'icse-10-history-civics-chapter-test-long',
  title: 'Chapter test (long) — Early Nationalists and Assertive Nationalists (1885–1916)',
  duration: 60,
  sections: [
    { id: 'I', title: 'Part I — Compulsory (20 marks)', instr: 'Attempt all questions. Questions 1–10 carry 1 mark each; questions 11–15 carry 2 marks each.', items: ['m_early_demand_ics', 'm_banerjee_assoc', 'm_gokhale_society', 'm_partition_real', 'm_partition_new', 'm_surat_issue', 'm_boycott_scenario', 'm_tilak_papers', 'm_lajpat_title', 'ar_partition_mourning', 's_early_methods', 's_naoroji_two', 's_surat_causes', 's_assertive_methods', 's_tilak_two'] },
    { id: 'II', title: 'Part II — Structured questions (20 marks)', instr: 'Attempt any TWO of the three questions. Each is in three parts (3 + 3 + 4 marks).', items: [{ attempt: 2, keys: ['l_early_full', 'l_surat_full', 'l_assertive_full'] }] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t06 of icse-10-history-civics-ch09 only (Early Nationalists; Naoroji, Banerjee, Gokhale; Partition of Bengal; Surat Split; Assertive Nationalists; Tilak, Pal, Lajpat Rai)',
    originality: 'every diary, report, chart and scenario is imagined and written by SOYL (labelled); no textbook text or exercise and no specimen or board-paper item reused (D-036); no historical person quoted, ideas paraphrased and attributed',
    data: `event years asserted in date order (${EVENTS.map(([y]) => y).join(', ')}); partition ${PARTITION} to annulment ${ANNULLED} = ${yearsBetween(PARTITION, ANNULLED)} years; Congress founded 1885 to Surat ${SURAT} = ${yearsBetween(1885, SURAT)} years`,
    facts: `Moderates 1885 to about 1907; Indian Councils Act 1892; Naoroji: House of Commons 1892, Congress President ${NAOROJI_PRESIDENT.join(', ')}; Indian Association 1876; Servants of India Society 1905; Banaras session 1905; partition under Curzon, effective 16 October ${PARTITION}, Eastern Bengal and Assam (Dacca), annulled ${ANNULLED} at the Delhi Durbar; Calcutta 1906 adopts swaraj; Surat ${SURAT} (Nagpur to Surat; Rash Behari Ghosh against Lajpat Rai); Lucknow 1916; Japan defeats Russia 1905; Tilak: Kesari, Mahratta, festivals, Mandalay 1908–14, Home Rule League 1916; Pal: New India; Lajpat Rai: Punjab Kesari, Mandalay 1907`,
    gate: 'schema, content lint (lintExemplar), deterministic verify, originality pre-check and the editorial counts run clean on this chapter',
  },
});
