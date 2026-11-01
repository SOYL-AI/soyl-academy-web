// ICSE 10 History & Civics, ch07 The First War of Independence, 1857 — question bank.
// Every letter, diary, report and village scene is imagined and written by SOYL and labelled as imagined; no textbook
// text, box or exercise, no proclamation or speech text and no specimen or board-paper item is reused (D-036); no real
// person is quoted. Following the ICSE 2027 removed-topics note, the events of the uprising (topic t04) are taught in
// the decks and notes for continuity only and NO question tests them; only the listed consequences are tested.
import assert from 'node:assert/strict';
import { Q, mcq, ar, tf, fb, match, ord, short, long, source, child, Svg } from '../../icse-10-history-civics-ch01/src/lib.mjs';

const S2 = [25, 45];
const S3 = [40, 70];
const L10 = [120, 220];
const IMAG = '*(Imagined document written by SOYL for practice; the people and places in it are not real.)*';

// ---------------------------------------------------------------- dates used in items and figures (asserted order)
export const LAPSE = [
  ['Satara', 1848],
  ['Jhansi', 1853],
  ['Nagpur', 1854],
];
export const AWADH = 1856;
export const DATES = [
  ['Abolition of sati', 1829],
  ['Doctrine of Lapse first applied (Satara)', 1848],
  ['Religious Disabilities Act', 1850],
  ['Jhansi taken under the Doctrine', 1853],
  ['Nagpur taken under the Doctrine', 1854],
  ['Annexation of Awadh', 1856],
  ['General Service Enlistment Act', 1856],
  ['Widow Remarriage Act', 1856],
  ['Uprising begins at Meerut', 1857],
  ['Government of India Act; Queen\'s Proclamation', 1858],
];
for (let i = 1; i < DATES.length; i++) assert.ok(DATES[i][1] >= DATES[i - 1][1], `dates out of order at ${DATES[i][0]}`);
for (let i = 1; i < LAPSE.length; i++) assert.ok(LAPSE[i][1] > LAPSE[i - 1][1]);
export const YEARS_COMPANY_TO_CROWN = 1858 - 1857;
assert.equal(YEARS_COMPANY_TO_CROWN, 1);

/** Schematic timeline 1828–1860 (theme colours only; not to scale in spacing of labels). */
export function timelineSvg(alt, caption) {
  const s = new Svg(720, 250);
  const x0 = 50, x1 = 690, y = 125;
  const X = (yr) => x0 + ((yr - 1828) / (1860 - 1828)) * (x1 - x0);
  s.arrow(x0, y, x1 + 10, y, { sw: 1.6 });
  [1830, 1840, 1850, 1860].forEach((yr) => { s.line(X(yr), y - 5, X(yr), y + 5, { sw: 1.2 }); s.text(X(yr), y + 18, String(yr), { size: 11, muted: true }); });
  const marks = [
    [1829, 'Sati abolished', 'up', 1],
    [1848, 'Satara lapses', 'down', 1],
    [1853, 'Jhansi lapses', 'up', 2],
    [1856, 'Awadh annexed', 'down', 2],
    [1857, 'Uprising', 'up', 1],
    [1858, 'Crown rule', 'down', 1],
  ];
  marks.forEach(([yr, label, dir, lane]) => {
    const yy = dir === 'up' ? y - 24 - 34 * (lane - 1) : y + 44 + 34 * (lane - 1);
    s.line(X(yr), y, X(yr), dir === 'up' ? yy + 8 : yy - 8, { sw: 1, color: 'muted' });
    s.dot(X(yr), y, 4, 'accent');
    s.text(X(yr), yy, `${label} (${yr})`, { size: 11 });
  });
  s.text(360, 238, 'Schematic, not to scale', { size: 10, muted: true });
  return s.visual(alt, caption);
}

/** Four groups of causes around the uprising (theme colours only). */
export function causesSvg(alt, caption) {
  const s = new Svg(700, 300);
  s.rect(260, 122, 180, 56, { rx: 10, fill: 'accent', fillOpacity: 0.25, color: 'accent', sw: 2 });
  s.text(350, 144, 'Uprising of 1857', { size: 14, bold: true });
  s.text(350, 164, 'many grievances', { size: 11 });
  const boxes = [
    ['Political', 'Lapse, Awadh, rulers slighted', 20, 20, 'blue'],
    ['Socio-religious', 'Fear of interference', 480, 20, 'green'],
    ['Economic', 'Artisans and peasants ruined', 20, 224, 'yellow'],
    ['Military', 'Sepoys\' pay and status', 480, 224, 'red'],
  ];
  boxes.forEach(([a, b, x, yy, col]) => {
    s.rect(x, yy, 200, 56, { rx: 8, fill: col, fillOpacity: 0.15, color: col, sw: 1.4 });
    s.text(x + 100, yy + 20, a, { size: 13, bold: true });
    s.text(x + 100, yy + 40, b, { size: 11 });
    s.line(x + 100, yy < 100 ? yy + 58 : yy - 2, 350, yy < 100 ? 120 : 180, { sw: 1.3, color: 'muted' });
  });
  return s.visual(alt, caption);
}

/** Administration before and after 1858 (two columns of boxes). */
export function adminSvg(alt, caption) {
  const s = new Svg(700, 290);
  const col = (x, title, rows, c) => {
    s.text(x + 140, 22, title, { size: 13, bold: true });
    rows.forEach((r, i) => {
      s.rect(x, 40 + i * 78, 280, 54, { rx: 8, fill: c, fillOpacity: 0.15, color: c, sw: 1.4 });
      s.text(x + 140, 67 + i * 78, r, { size: 12 });
      if (i < rows.length - 1) s.arrow(x + 140, 96 + i * 78, x + 140, 116 + i * 78, { sw: 1.2 });
    });
  };
  col(20, 'Before 1858', ['East India Company (Court of Directors)', 'Board of Control in London', 'Governor-General in India'], 'muted');
  col(400, 'After 1858', ['British Crown and Parliament', 'Secretary of State + Council of India', 'Governor-General, also Viceroy'], 'accent');
  s.arrow(310, 145, 390, 145, { sw: 2, color: 'accent' });
  s.text(350, 132, '1858', { size: 12, bold: true });
  return s.visual(alt, caption);
}

// ================================================================ t01 Political causes
Q('m_lapse_meaning', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Under the Doctrine of Lapse, what happened to a dependent Indian state whose ruler died without a natural male heir?',
  opts: [
    'The state passed to the Company, because an adopted son was not accepted as heir',
    'The state passed to the ruler\'s widow for life',
    'The people of the state elected a new ruler',
    'The state was divided among the neighbouring rulers',
  ],
  sol: 'The Doctrine refused to recognise an adopted son as successor to the throne, so the state "lapsed" to the Company. The widow, an election or a division among neighbours were not what the policy provided.',
}));
Q('m_lapse_gg', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'The Doctrine of Lapse is most closely associated with which Governor-General of the East India Company?',
  opts: ['Lord Dalhousie', 'Lord Canning', 'Lord William Bentinck', 'Lord Cornwallis'],
  sol: 'Lord Dalhousie (Governor-General 1848–1856) applied the Doctrine to several states. Canning was Governor-General when the uprising began, Bentinck is linked with the abolition of sati, and Cornwallis with an earlier land settlement.',
}));
Q('m_lapse_first', mcq({
  t: 1, d: 2, c: 'recall',
  stem: `Which state was the first to be taken over under the Doctrine of Lapse, in ${LAPSE[0][1]}?`,
  opts: [LAPSE[0][0], 'Awadh', 'Hyderabad', 'Mysore'],
  sol: `Satara was annexed in ${LAPSE[0][1]}. Awadh was annexed in ${AWADH} on a different ground (alleged misgovernment); Hyderabad and Mysore were not taken over in this way.`,
}));
Q('m_awadh_ground', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: `On what ground did the Company annex Awadh in ${AWADH}, even though its Nawab had been a long-standing ally?`,
  opts: ['Alleged misgovernment of the state', 'The Doctrine of Lapse, as the Nawab had no son', 'Defeat of the Nawab in a war', 'A request from the people of Awadh'],
  sol: 'Awadh was annexed on the plea that it was badly governed; the Nawab was deposed and sent away. It was not a case of lapse, war or a popular request, which is why the takeover of a loyal ally caused deep resentment.',
}));
Q('m_jhansi', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'A ruler adopts a son shortly before his death, but the Company refuses to accept the boy and takes over the state. Which state of the 1850s best matches this situation?',
  opts: ['Jhansi', 'Awadh', 'Punjab', 'Sindh'],
  sol: 'Jhansi was taken over in 1853 after the Company refused to recognise the adopted son of the late ruler, a clear use of the Doctrine of Lapse. Awadh was annexed for alleged misgovernment, and Punjab and Sindh were taken after wars.',
}));
Q('m_nana', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Why did Nana Saheb have a personal grievance against the Company before 1857?',
  opts: [
    'The pension that had been paid to his adoptive father, the last Peshwa, was stopped after the Peshwa\'s death',
    'His state was annexed for misgovernment',
    'He was dismissed from the Company\'s army',
    'His lands were confiscated for not paying revenue',
  ],
  sol: 'Nana Saheb was the adopted son of the former Peshwa; the Company refused to continue the Peshwa\'s pension to him. The other options describe grievances of other groups, not his.',
}));
Q('m_mughal', mcq({
  t: 1, d: 3, c: 'understanding',
  stem: 'How did British policy towards the Mughal emperor in the 1850s add to political discontent?',
  opts: [
    'It was announced that the emperor\'s successors would lose the imperial title and the palace in Delhi',
    'The emperor was made Governor-General of India',
    'The emperor was given back the provinces of Bengal and Bihar',
    'The emperor was allowed to raise his own large army',
  ],
  sol: 'The Company indicated that after Bahadur Shah II his successors would not keep the imperial title or live in the Red Fort. This hurt those who still saw the Mughal ruler as a symbol of authority. The other options are untrue.',
}));
Q('m_annex_effect', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: 'An imagined courtier in a small state hears in 1854 that a neighbouring kingdom has lapsed to the Company. What is he most likely to conclude?',
  opts: [
    'That no Indian ruler, however loyal, was safe from annexation',
    'That the Company would soon return the kingdom',
    'That adoption was now encouraged by the Company',
    'That the Company had stopped expanding its territory',
  ],
  sol: 'The repeated use of lapse and annexation made rulers feel insecure even if they had been friendly. Nothing suggested the Company would return lands, accept adoption or stop expanding.',
}));
Q('ar_awadh', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'A-true-R-false',
  a: 'The annexation of Awadh caused resentment among sepoys of the Bengal Army.',
  r: 'Awadh was annexed under the Doctrine of Lapse.',
  sol: 'A is true: many sepoys came from Awadh and felt their homeland and families were affected. R is false: Awadh was taken over on the ground of misgovernment, not under the Doctrine of Lapse.',
}));
Q('ar_lapse_rulers', ar({
  t: 1, d: 2, c: 'analysis', verdict: 'both-true-explains',
  a: 'Many Indian rulers became hostile to the Company in the 1850s.',
  r: 'The Doctrine of Lapse took away their right to pass the throne to an adopted son.',
  sol: 'Both are true, and R explains A: rulers without natural sons feared losing their states because adoption was not accepted for succession.',
}));
Q('tf_awadh_lapse', tf({
  t: 1, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? Awadh was annexed because its Nawab died without a natural heir.',
  sol: 'False. Awadh was taken over on the plea of misgovernment, and its Nawab was deposed while alive; the Doctrine of Lapse was not the ground.',
}));
Q('fb_lapse', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'The policy under which a state passed to the Company when its ruler died without a natural male heir was called the Doctrine of ___.',
  acc: [['Lapse']],
  sol: 'It was the Doctrine of Lapse.',
}));
Q('s_lapse_two', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'What was the Doctrine of Lapse? Name two states annexed under it.',
  model: `It was the policy, applied vigorously by **Lord Dalhousie**, that a dependent state whose ruler died **without a natural heir** would **pass to the Company**, as an **adopted son** was not accepted. Examples: **${LAPSE[0][0]}** (${LAPSE[0][1]}) and **${LAPSE[1][0]}** (${LAPSE[1][1]}).`,
  sol: 'Meaning and two correct states.',
  scheme: [['Meaning', 1], ['Two states', 1]],
}));
Q('s_awadh_why', short({
  t: 1, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'Why did the annexation of Awadh anger both its people and many sepoys?',
  model: 'Awadh\'s Nawab had been a **loyal ally**, yet he was **deposed** on a charge of **misgovernment**; nobles and officials **lost their positions**. Many **sepoys came from Awadh**, so the takeover of their **homeland** felt like a **personal injury**.',
  sol: 'Injustice to an ally; impact on sepoys.',
  scheme: [['Loyal ally deposed', 1], ['Link with sepoys from Awadh', 1]],
}));
Q('s3_political', short({
  t: 1, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Explain three political causes of the uprising of 1857.',
  model: '1. **Doctrine of Lapse:** states such as **Satara, Jhansi and Nagpur** were taken over because **adopted heirs** were not recognised.\n2. **Annexation of Awadh (1856)** on a charge of **misgovernment**, though its ruler was an ally.\n3. **Treatment of rulers:** **Nana Saheb\'s pension** was stopped, and the **Mughal emperor\'s successors** were to lose their title.',
  sol: 'Three distinct political causes.',
  scheme: [['Doctrine of Lapse', 1], ['Annexation of Awadh', 1], ['Treatment of rulers', 1]],
}));

// ================================================================ t02 Socio-religious and economic causes
Q('m_converts_law', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'A law of 1850 allowed a person who changed his religion to keep his share of ancestral property. How did many people of the time see this law?',
  opts: [
    'As a step that would encourage conversion to Christianity',
    'As a reward for loyalty to the Mughal emperor',
    'As a tax on temples',
    'As a measure to help the sepoys',
  ],
  sol: 'The Religious Disabilities Act (1850) removed the loss of inheritance on conversion; many feared it was meant to make conversion easier. It had nothing to do with the emperor, temple taxes or the sepoys.',
}));
Q('m_widow_act', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'Which social reform law passed in 1856 was seen by orthodox sections as interference in their customs?',
  opts: ['The Hindu Widows\' Remarriage Act', 'The Indian Councils Act', 'The Vernacular Press Act', 'The Rowlatt Act'],
  sol: 'The Widows\' Remarriage Act (1856) permitted widows to remarry. The Indian Councils Act, the Vernacular Press Act and the Rowlatt Act came much later.',
}));
Q('m_missionaries', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'In an imagined town of the 1850s, people notice preachers in the bazaar, new schools teaching Christian scripture and orphans being brought up as Christians. Which cause of the uprising does this illustrate?',
  opts: ['The fear that British rule aimed to convert Indians', 'The Doctrine of Lapse', 'The loss of the foreign service allowance', 'The heavy land revenue demand'],
  sol: 'Missionary activity, often seen as backed by the rulers, made people fear for their religion. Lapse, the overseas allowance and land revenue are political, military and economic causes.',
}));
Q('m_artisans', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Why did many Indian weavers and other artisans lose their livelihood under Company rule?',
  opts: [
    'Cheap machine-made British goods flooded Indian markets while Indian goods faced high duties in Britain',
    'The Company paid them very high wages',
    'Indian rulers banned the sale of handmade cloth',
    'The artisans were all recruited into the army',
  ],
  sol: 'Machine-made imports undersold handmade goods, and Indian manufactures faced barriers in Britain; the loss of royal courts as patrons made things worse. The other options are untrue.',
}));
Q('m_peasants', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'What was the main economic grievance of Indian peasants against the Company before 1857?',
  opts: ['Very high land revenue, collected strictly even in bad years', 'Free supply of seeds', 'Abolition of all taxes on land', 'Guaranteed prices for their crops'],
  sol: 'Land revenue was fixed high and collected harshly, pushing many into debt or loss of land. Free seeds, abolition of land tax and guaranteed prices did not exist.',
}));
Q('m_drain', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'Which statement best describes the idea of the "drain of wealth" as a cause of discontent?',
  opts: [
    'A large part of India\'s wealth was sent to Britain as salaries, profits and charges without an equal return',
    'Indian rulers spent too much on palaces',
    'Rivers were drained to build railways',
    'Indian merchants took their money abroad to buy land',
  ],
  sol: 'The drain meant a steady transfer of wealth from India to Britain through the Company\'s revenue and charges, which impoverished the country. The other options misread the term.',
}));
Q('m_sati', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'In which year was the practice of sati declared illegal in the Bengal Presidency?',
  opts: ['1829', '1856', '1858', '1813'],
  sol: 'Sati was prohibited by a regulation of 1829 under Lord William Bentinck. 1856 is the Widow Remarriage Act and 1858 the end of Company rule.',
}));
Q('ar_reforms', ar({
  t: 2, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'Some sections of Indian society saw British social reforms as a threat to their religion.',
  r: 'They believed that the reforms were part of a plan to change their customs and convert them.',
  sol: 'Both are true and R explains A: reforms such as permitting widow remarriage were read by orthodox groups as part of a wider design against their faith.',
}));
Q('ar_artisans', ar({
  t: 2, d: 3, c: 'analysis', verdict: 'A-true-R-false',
  a: 'Indian handicraft industries declined in the first half of the nineteenth century.',
  r: 'British goods sold in India were taxed far more heavily than Indian goods sold in Britain.',
  sol: 'A is true. R is false: it was the other way round; British goods entered India on easy terms while Indian goods faced heavy duties in Britain.',
}));
Q('tf_railways', tf({
  t: 2, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? Some people in the 1850s viewed new things such as railways and the telegraph with suspicion, fearing they would break caste rules.',
  sol: 'True. People of all castes sat together in railway carriages, and such changes were read by some as attacks on social customs.',
}));
Q('mt_causes', match({
  t: [1, 2, 3], d: 2, c: 'application', marks: 2,
  stem: 'Match each grievance felt before 1857 with the group of causes it belongs to.',
  pairs: [
    ['A ruler\'s adopted son is refused the throne', 'Political'],
    ['A widow remarriage law upsets orthodox families', 'Socio-religious'],
    ['A weaver cannot sell cloth against cheap imports', 'Economic'],
    ['A sepoy is ordered to serve overseas', 'Military'],
  ],
  sol: 'Refusal of adoption is political (Doctrine of Lapse); the remarriage law is socio-religious; the weaver\'s ruin is economic; compulsory overseas service is military.',
}));
Q('s_socio_two', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Give two reasons why many Indians in the 1850s feared for their religion.',
  model: '1. **Missionaries** preached openly and ran schools, and many believed the **government supported conversion**.\n2. Laws such as the **Religious Disabilities Act (1850)**, protecting the property of **converts**, seemed to **encourage conversion**.',
  sol: 'Any two: missionaries, laws on converts, social reforms seen as interference, new technology seen as breaking caste.',
  scheme: [['First reason', 1], ['Second reason', 1]],
}));
Q('s_economic_two', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State two ways in which Company rule hurt the Indian economy before 1857.',
  model: '1. **Handicrafts** declined as **cheap British manufactures** flooded Indian markets, leaving artisans jobless.\n2. **Heavy land revenue**, collected harshly, ruined many **peasants and zamindars**.',
  sol: 'Any two: artisans, peasants, zamindars losing land, drain of wealth.',
  scheme: [['First way', 1], ['Second way', 1]],
}));
Q('s3_socio', short({
  t: 2, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Explain three socio-religious grievances that prepared the ground for the uprising.',
  model: '1. **Social reforms** such as the abolition of **sati** (1829) and the **Widow Remarriage Act** (1856) were seen by orthodox groups as **interference** in custom.\n2. **Missionary activity** and the **Religious Disabilities Act** (1850) created fear of **conversion**.\n3. **Western education** and new things like **railways** were believed to **break caste** and undermine traditional ways.',
  sol: 'Three distinct grievances, each linked to a reason.',
  scheme: [['Reforms seen as interference', 1], ['Fear of conversion', 1], ['Education or technology seen as threat', 1]],
}));
Q('s3_economic', short({
  t: 2, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'How did the economic policies of the Company affect artisans, peasants and landholders?',
  model: '1. **Artisans:** cheap **British goods** and the loss of **royal patrons** destroyed handicrafts.\n2. **Peasants:** **high land revenue**, collected even in bad seasons, drove many into **debt**.\n3. **Landholders:** many **zamindars and taluqdars lost their estates** when they could not pay or when titles were questioned.',
  sol: 'One effect for each group.',
  scheme: [['Artisans', 1], ['Peasants', 1], ['Landholders', 1]],
}));

// ================================================================ t03 Military causes and the immediate cause
Q('m_gsea', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'The General Service Enlistment Act of 1856 upset many sepoys because it required new recruits to',
  opts: ['serve wherever they were sent, including overseas', 'pay a fee to join the army', 'give up their pensions', 'become Christians'],
  sol: 'New recruits had to agree to serve anywhere, including across the sea, which many high-caste sepoys believed would cost them their caste. The other options are untrue.',
}));
Q('m_promotion', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Which statement describes the position of Indian sepoys in the Company\'s army before 1857?',
  opts: [
    'They were paid less than British soldiers and could not rise to the highest ranks',
    'They were paid more than British officers',
    'They commanded all the artillery units',
    'They could become Commander-in-Chief',
  ],
  sol: 'Indian sepoys received lower pay and faced a ceiling on promotion, while senior ranks were kept for Europeans. They did not command the artillery or the army.',
}));
Q('m_bhatta', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'An imagined sepoy writes home that after a newly annexed region became part of British India, he no longer receives the extra allowance he used to get for serving there. Which grievance is he describing?',
  opts: ['Loss of the allowance for foreign service (bhatta)', 'The Doctrine of Lapse', 'The Widow Remarriage Act', 'The drain of wealth'],
  sol: 'Sepoys got an extra allowance for service outside British territory; once regions such as Sindh and Punjab were annexed, this allowance stopped. The other options are not military pay grievances.',
}));
Q('m_cartridge', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'Which new rifle introduced in 1857 is linked with the rumour about greased cartridges?',
  opts: ['The Enfield rifle', 'The Brown Bess musket', 'The Lee-Metford rifle', 'The Maxim gun'],
  sol: 'The Enfield rifle used cartridges whose ends had to be bitten off; the rumour that they were greased with cow and pig fat angered Hindu and Muslim sepoys alike. The other weapons are wrong for this event.',
}));
Q('m_cartridge_why', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Why did the rumour about the new cartridges offend both Hindu and Muslim sepoys?',
  opts: [
    'The grease was said to contain the fat of cows and pigs, which their religions forbade them to touch with the mouth',
    'The cartridges were too expensive to buy',
    'The cartridges were made in Indian factories',
    'The cartridges were too heavy to carry',
  ],
  sol: 'Cow fat offended Hindus and pig fat offended Muslims, and the cartridge had to be bitten. Cost, place of manufacture and weight were not the issue.',
}));
Q('m_barrackpore', mcq({
  t: 3, d: 2, c: 'recall',
  stem: 'At which cantonment did a sepoy of the 34th Native Infantry attack his officers in March 1857, an incident linked to the cartridge issue?',
  opts: ['Barrackpore', 'Meerut', 'Ambala', 'Lucknow'],
  sol: 'At Barrackpore, near Calcutta, Mangal Pandey attacked officers on 29 March 1857 and was later executed. Meerut was where the large-scale rising began in May 1857.',
}));
Q('m_numbers', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: 'Which fact about the army helps explain why a rising by sepoys could spread so quickly in 1857?',
  opts: [
    'Indian sepoys greatly outnumbered British soldiers, and many British troops were away',
    'Every regiment was commanded by an Indian general',
    'The Company had no soldiers in northern India',
    'All sepoys had been dismissed in 1856',
  ],
  sol: 'Indian soldiers formed the large majority of the Company\'s army, and many British units were serving outside India, so sepoys felt strong enough to act. The other options are untrue.',
}));
Q('ar_cartridge', ar({
  t: 3, d: 2, c: 'analysis', verdict: 'both-true-explains',
  a: 'The issue of the greased cartridges united Hindu and Muslim sepoys.',
  r: 'The grease was rumoured to contain fat that was objectionable to both communities.',
  sol: 'Both are true and R explains A: because the rumour touched both religions, the anger was shared across communities.',
}));
Q('ar_overseas', ar({
  t: 3, d: 3, c: 'analysis', verdict: 'A-false-R-true',
  a: 'The General Service Enlistment Act of 1856 applied only to British soldiers.',
  r: 'Many high-caste sepoys believed that crossing the sea would make them lose their caste.',
  sol: 'A is false: the Act applied to new Indian recruits, who had to agree to serve overseas. R is true, which is why the Act caused alarm.',
}));
Q('tf_pay', tf({
  t: 3, d: 1, c: 'recall', ans: true,
  stem: 'True or false? Before 1857, an Indian sepoy was generally paid less than a British soldier of similar rank.',
  sol: 'True. Pay and allowances favoured European soldiers, and Indians could not rise to the highest ranks.',
}));
Q('fb_rifle', fb({
  t: 3, d: 1, c: 'recall',
  stem: 'The cartridges of the new ___ rifle were believed to be greased with the fat of cows and pigs.',
  acc: [['Enfield']],
  sol: 'It was the Enfield rifle.',
}));
Q('s_military_two', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State two grievances of Indian sepoys that were not connected with the cartridges.',
  model: '1. **Low pay and poor promotion**: Indians earned less than Europeans and could not reach high ranks.\n2. The **General Service Enlistment Act (1856)** forced new recruits to **serve overseas**, which many felt would cost them their caste. (Also: loss of the **foreign service allowance**.)',
  sol: 'Any two military grievances other than the cartridges.',
  scheme: [['First grievance', 1], ['Second grievance', 1]],
}));
Q('s_cartridge_two', short({
  t: 3, d: 2, c: 'analysis', marks: 2, wl: S2,
  stem: 'Explain why the greased cartridges became the spark for the uprising.',
  model: 'Sepoys had to **bite** the cartridge of the new **Enfield rifle**, and it was rumoured to be greased with **cow and pig fat**. This seemed to confirm the fear that the British wanted to **destroy their religion**, so long-standing anger **burst into revolt**.',
  sol: 'The rumour and why it acted as a trigger.',
  scheme: [['The rumour', 1], ['Why it sparked the revolt', 1]],
}));
Q('s3_military', short({
  t: 3, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Explain three military causes of the uprising of 1857.',
  model: '1. **Discrimination:** Indian sepoys got **lower pay** and could not rise to **senior ranks**.\n2. **Overseas service:** the **General Service Enlistment Act (1856)** made new recruits liable to serve across the sea.\n3. **Loss of allowances:** the **extra allowance** for service in distant regions stopped once those regions were annexed.',
  sol: 'Three distinct military causes.',
  scheme: [['Discrimination in pay or promotion', 1], ['Overseas service', 1], ['Loss of allowances', 1]],
}));

// ================================================================ t05 Consequences
Q('m_act1858', mcq({
  t: 5, d: 1, c: 'recall',
  stem: 'Which law of 1858 ended the rule of the East India Company in India?',
  opts: ['The Government of India Act, 1858', 'The Regulating Act, 1773', 'The Charter Act, 1833', 'The Indian Councils Act, 1861'],
  sol: 'The Government of India Act, 1858 transferred power from the Company to the British Crown. The Regulating Act and Charter Act were earlier, and the 1861 Act dealt with councils.',
}));
Q('m_sos', mcq({
  t: 5, d: 2, c: 'recall',
  stem: 'After 1858, which minister in Britain was made responsible for the government of India?',
  opts: ['The Secretary of State for India', 'The Chairman of the Court of Directors', 'The President of the Board of Control', 'The Viceroy of India'],
  sol: 'A Secretary of State for India, a member of the British Cabinet, was created with a Council of India to advise him. The Court of Directors and the Board of Control were abolished; the Viceroy worked in India.',
}));
Q('m_viceroy', mcq({
  t: 5, d: 2, c: 'understanding',
  stem: 'What change in the title of the head of the government in India followed the end of Company rule?',
  opts: [
    'The Governor-General was also called the Viceroy, as the representative of the Crown',
    'The Governor-General was replaced by a Prime Minister of India',
    'The office of Governor-General was abolished',
    'The head of government became the Mughal emperor',
  ],
  sol: 'The Governor-General now also acted as the Viceroy, the Crown\'s representative in India. There was no Prime Minister of India, and the office was not abolished.',
}));
Q('m_procl_annex', mcq({
  t: 5, d: 2, c: 'understanding',
  stem: 'Which assurance in Queen Victoria\'s Proclamation of 1858 was aimed most directly at the Indian princes?',
  opts: [
    'That there would be no further annexation of their territories and their rights would be respected',
    'That they would be given seats in the British Parliament',
    'That they could keep unlimited armies',
    'That they would choose the Viceroy',
  ],
  sol: 'The Proclamation promised to respect the rights and dignity of the princes and to end the policy of annexation. Seats in Parliament, unlimited armies and choosing the Viceroy were never promised.',
}));
Q('m_procl_religion', mcq({
  t: 5, d: 2, c: 'application',
  stem: 'After 1858, an imagined official proposes a rule that would interfere with a religious festival. Which promise of the Queen\'s Proclamation could people point to against it?',
  opts: ['Non-interference in the religious beliefs and practices of Indians', 'Free education for all children', 'Abolition of land revenue', 'Indian control of the army'],
  sol: 'The Proclamation promised religious toleration and non-interference. Free education, abolition of land revenue and Indian control of the army were not among its promises.',
}));
Q('m_procl_services', mcq({
  t: 5, d: 4, c: 'analysis',
  stem: 'The Proclamation promised that Indians would be admitted to government service. Which condition did it attach?',
  opts: [
    'Admission according to education, ability and integrity, without regard to race or creed',
    'Admission only for members of princely families',
    'Admission only after converting to Christianity',
    'Admission only for those who had fought in 1857',
  ],
  sol: 'The promise was of equal treatment in government service on the basis of qualification, irrespective of race or religion. In practice the high examinations remained difficult for Indians to enter, but the promise itself had no princely, religious or war-service condition.',
}));
Q('m_army_ratio', mcq({
  t: 5, d: 2, c: 'understanding',
  stem: 'Which change was made in the composition of the army after 1858?',
  opts: [
    'The proportion of European soldiers was increased and key branches such as artillery were kept with Europeans',
    'All European soldiers were sent back to Britain',
    'Indian officers were given command of the artillery',
    'The army was disbanded and replaced by the police',
  ],
  sol: 'The British raised the share of European troops and kept artillery and other key branches in European hands. The other options are the opposite of what happened.',
}));
Q('m_army_mix', mcq({
  t: 5, d: 3, c: 'analysis',
  stem: 'After 1858, regiments were organised so that soldiers of different communities and regions were mixed or kept apart in particular ways. What was the main aim?',
  opts: [
    'To prevent soldiers from uniting against British rule again',
    'To give each regiment its own religious leader',
    'To reduce the cost of uniforms',
    'To prepare the army for elections',
  ],
  sol: 'The reorganisation followed a divide-and-rule approach so that soldiers would not combine as in 1857. The other options do not describe the purpose.',
}));
Q('m_princes_after', mcq({
  t: 5, d: 3, c: 'analysis',
  stem: 'How did the relationship between the British and the princely states change after 1858?',
  opts: [
    'Annexation stopped and adoption was accepted, but the princes had to accept the Crown as the paramount power',
    'The princely states became fully independent countries',
    'All princely states were annexed within ten years',
    'The princes were given control of British India',
  ],
  sol: 'The British ended annexation and recognised adoption, turning the princes into loyal supporters, but the Crown claimed paramountcy over them. They did not become independent, were not all annexed and did not control British India.',
}));
Q('ar_procl', ar({
  t: 5, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'After 1858 the princes generally became supporters of British rule.',
  r: 'The Crown gave up the policy of annexation and recognised their right to adopt heirs.',
  sol: 'Both are true and R explains A: once their thrones were secure, the princes had a stake in the survival of British rule.',
}));
Q('ar_army', ar({
  t: 5, d: 3, c: 'analysis', verdict: 'both-true-not-explains',
  a: 'After 1858 the British increased the proportion of European soldiers in India.',
  r: 'The Government of India Act, 1858 created the post of Secretary of State for India.',
  sol: 'Both are true, but R does not explain A: the army change was a security measure after the uprising, while the new post concerned the government in London.',
}));
Q('tf_company', tf({
  t: 5, d: 1, c: 'recall', ans: true,
  stem: 'True or false? After 1858 the British Crown governed India directly in place of the East India Company.',
  sol: 'True. The Government of India Act, 1858 ended Company rule and placed India under the Crown.',
}));
Q('fb_procl', fb({
  t: 5, d: 2, c: 'recall',
  stem: 'Queen Victoria\'s Proclamation was announced in India on 1 November ___.',
  acc: [['1858']],
  sol: 'It was announced on 1 November 1858.',
}));
Q('ord_admin', ord({
  t: 5, d: 2, c: 'understanding', marks: 2,
  stem: 'Arrange the chain of authority over India after 1858, from the top in Britain to the head of government in India.',
  items: ['The British Crown and Parliament', 'The Secretary of State for India, advised by the Council of India', 'The Governor-General and Viceroy in India'],
  sol: 'Crown and Parliament at the top; the Secretary of State with the Council of India in London; the Governor-General and Viceroy in India.',
}));
Q('s_act1858_two', short({
  t: 5, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State two changes in the administration of India made by the Government of India Act, 1858.',
  model: '1. **Company rule ended** and India came under the **British Crown**.\n2. A **Secretary of State for India**, a British Cabinet minister, was created with a **Council of India**; the **Governor-General** also became the **Viceroy**.',
  sol: 'Any two administrative changes.',
  scheme: [['First change', 1], ['Second change', 1]],
}));
Q('s_procl_two', short({
  t: 5, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Mention two promises made to the Indian people (not the princes) in Queen Victoria\'s Proclamation.',
  model: '1. **No interference** in their **religious beliefs** and customs.\n2. **Equal opportunity in government service**, on the basis of **qualification**, regardless of race or creed. (Also: a general **pardon** for those not guilty of killing British subjects.)',
  sol: 'Any two promises to the people.',
  scheme: [['First promise', 1], ['Second promise', 1]],
}));
Q('s_princes_two', short({
  t: 5, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'Why did the British change their policy towards the princes after 1858?',
  model: 'Many princes had **stayed loyal** during the uprising, and the British realised they could serve as **dependable allies** against future revolts. So annexation was **given up** and **adoption accepted**, binding the princes to the Crown.',
  sol: 'Reason for the change and what it was.',
  scheme: [['Reason: loyalty or usefulness', 1], ['Change made', 1]],
}));
Q('s_army_two', short({
  t: 5, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State two changes made in the army after the uprising.',
  model: '1. The **proportion of European soldiers** was increased.\n2. **Artillery** and other key branches were kept with **Europeans**; recruitment shifted to groups seen as **loyal**, and regiments were organised to **divide** communities.',
  sol: 'Any two changes.',
  scheme: [['First change', 1], ['Second change', 1]],
}));
Q('s_naming', short({
  t: 5, d: 3, c: 'evaluation', marks: 2, wl: S2,
  stem: 'The events of 1857 have been called a "mutiny" by some writers and the "First War of Independence" by others. Give one reason for each view.',
  model: '**Mutiny:** it **began among sepoys** in the Company\'s army and was strongest in **northern and central India**. **War of Independence:** it drew in **rulers, peasants and artisans** with a shared aim of **ending foreign rule**, and later nationalists saw it as the **first united struggle**.',
  sol: 'One reason for each view, stated neutrally.',
  scheme: [['Reason for the "mutiny" view', 1], ['Reason for the "war of independence" view', 1]],
}));
Q('s3_procl', short({
  t: 5, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Explain three main assurances given in Queen Victoria\'s Proclamation of 1858.',
  model: '1. **No more annexation**; the **rights and dignity of the princes** and existing **treaties** would be respected.\n2. **Religious toleration**: no interference in the **beliefs and customs** of Indians.\n3. **Equal opportunity** in **government service** on merit, and a **pardon** for most of those who had taken part, except those who had killed British subjects.',
  sol: 'Three assurances, paraphrased.',
  scheme: [['Princes and annexation', 1], ['Religious toleration', 1], ['Services or amnesty', 1]],
}));
Q('s3_army', short({
  t: 5, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Describe three changes in the organisation of the army after 1857 and the purpose behind them.',
  model: '1. The **share of European troops** was raised, so that Indian soldiers could not again **outnumber** them heavily.\n2. **Artillery** and important **arsenals** were kept under **Europeans**, denying Indians the most powerful weapons.\n3. Recruitment favoured groups considered **loyal**, and regiments were organised on **community and caste lines** to **divide and rule**.',
  sol: 'Three changes with their purpose.',
  scheme: [['European proportion', 1], ['Artillery with Europeans', 1], ['Recruitment and divide and rule', 1]],
}));

// ================================================================ long (10-mark, 3 + 3 + 4)
Q('l_political', long({
  t: 1, d: 3, c: 'application', marks: 10, wl: L10,
  stem: 'Answer the following about the political background of 1857.\n\n(i) What was the Doctrine of Lapse? Name the Governor-General associated with it and two states annexed under it. **[3]**\n(ii) Explain why the annexation of Awadh caused anger. **[3]**\n(iii) How did the treatment of Nana Saheb and of the Mughal emperor add to political discontent? **[4]**',
  model: `(i) It was the policy that a dependent state whose ruler died **without a natural male heir** would **lapse to the Company**, since an **adopted son** was not recognised. It is linked with **Lord Dalhousie**; examples are **${LAPSE[0][0]}** and **${LAPSE[1][0]}** (also ${LAPSE[2][0]}).\n\n(ii) Awadh was annexed in **${AWADH}** on the plea of **misgovernment**, although its Nawab had been a **loyal ally**. Nobles and officials lost their positions, and the many **sepoys from Awadh** felt their homeland had been seized.\n\n(iii) **Nana Saheb**, adopted son of the last **Peshwa**, was refused the **pension** paid to his father, so he became an opponent of the Company. The Company announced that the **successors of the Mughal emperor** would lose the **imperial title** and the **Red Fort**, which offended those who still respected the emperor as a **symbol of authority**. Both showed that the Company **ignored old rulers**.`,
  sol: 'Doctrine of Lapse; Awadh; Nana Saheb and the Mughal emperor.',
  scheme: [['(i) Meaning', 1], ['(i) Dalhousie and two states', 2], ['(ii) Ground and why unjust', 2], ['(ii) Effect on sepoys or nobles', 1], ['(iii) Nana Saheb', 2], ['(iii) Mughal emperor', 2]],
}));
Q('l_socio_econ', long({
  t: 2, d: 4, c: 'analysis', marks: 10, wl: L10,
  stem: 'Answer the following about the social and economic background of 1857.\n\n(i) Explain three social reforms or laws that some Indians saw as interference in their religion. **[3]**\n(ii) Why did missionary activity cause fear among Indians? **[3]**\n(iii) Explain how British economic policies affected artisans and peasants. **[4]**',
  model: '(i) The **abolition of sati** (1829), the **Widow Remarriage Act** (1856) and the **Religious Disabilities Act** (1850), which let **converts** keep ancestral property, were read by orthodox groups as attacks on **custom and faith**.\n\n(ii) Missionaries **preached openly**, ran **schools** that taught Christian scripture and brought up **orphans as Christians**; since many believed the **government supported** them, people feared a plan of **mass conversion**.\n\n(iii) **Artisans** lost their market to cheap **machine-made British goods** and lost the patronage of **royal courts**; **peasants** faced **heavy land revenue**, collected strictly even in bad years, and many fell into **debt** or lost their land to **moneylenders**. This **economic distress** made both groups ready to join the revolt.',
  sol: 'Reforms; missionaries; artisans and peasants.',
  scheme: [['(i) Three reforms or laws', 3], ['(ii) Missionary activity and fear', 3], ['(iii) Artisans', 2], ['(iii) Peasants', 2]],
}));
Q('l_military', long({
  t: 3, d: 3, c: 'application', marks: 10, wl: L10,
  stem: 'Answer the following about the sepoys and 1857.\n\n(i) State three grievances of Indian sepoys in the Company\'s army. **[3]**\n(ii) Explain how the General Service Enlistment Act of 1856 affected the sepoys. **[3]**\n(iii) Explain why the greased cartridges became the immediate cause of the uprising. **[4]**',
  model: '(i) **Lower pay** than British soldiers; **no promotion** beyond a low rank; **loss of the allowance** for service in distant regions once they were annexed.\n\n(ii) The Act required **new recruits** to agree to **serve anywhere**, including **overseas**. Many high-caste sepoys believed **crossing the sea** would make them **lose caste**, so they felt their **religion** was under threat and feared for future recruitment of their sons.\n\n(iii) The new **Enfield rifle** used cartridges whose ends had to be **bitten**; it was rumoured they were greased with **cow and pig fat**, offending **both Hindus and Muslims**. Coming after many other grievances, the rumour seemed to **prove** that the British meant to **destroy their faith**, and sepoys refused the cartridges, which turned **anger into open revolt**.',
  sol: 'Grievances; the 1856 Act; the cartridges as trigger.',
  scheme: [['(i) Three grievances', 3], ['(ii) Provision of the Act', 1], ['(ii) Why it alarmed sepoys', 2], ['(iii) The rumour', 2], ['(iii) Why it was the trigger', 2]],
}));
Q('l_admin', long({
  t: 5, d: 3, c: 'understanding', marks: 10, wl: L10,
  stem: 'Answer the following about the changes in administration after 1857.\n\n(i) Which law ended the rule of the East India Company, and when? **[3]**\n(ii) Explain the new arrangement for governing India from Britain. **[3]**\n(iii) State four assurances given in Queen Victoria\'s Proclamation. **[4]**',
  model: '(i) The **Government of India Act, 1858** transferred the government of India from the **East India Company** to the **British Crown**; the **Court of Directors** and the **Board of Control** were abolished.\n\n(ii) A **Secretary of State for India**, a member of the **British Cabinet** answerable to **Parliament**, took charge, advised by a **Council of India**. In India the **Governor-General** governed as the **Viceroy**, the representative of the Crown.\n\n(iii) **No further annexation**; respect for the **rights and dignity of the princes** and their **treaties**; **no interference in religion**; **equal opportunity in government service** on merit regardless of race or creed; a **pardon** for most participants except those who had killed British subjects.',
  sol: 'The 1858 Act; Secretary of State and Viceroy; four assurances.',
  scheme: [['(i) Act and transfer to the Crown', 2], ['(i) Bodies abolished', 1], ['(ii) Secretary of State and Council', 2], ['(ii) Viceroy', 1], ['(iii) Four assurances', 4]],
}));
Q('l_princes_army', long({
  t: 5, d: 4, c: 'analysis', marks: 10, wl: L10,
  stem: 'Answer the following about British policy after 1857.\n\n(i) How did the British change their policy towards the princely states? **[3]**\n(ii) Why did they make this change? **[3]**\n(iii) Explain four changes made in the army and how each was meant to prevent another revolt. **[4]**',
  model: '(i) The policy of **annexation**, including the **Doctrine of Lapse**, was **given up**; the princes\' **right to adopt** heirs was accepted, but they had to recognise the **Crown as the paramount power**.\n\n(ii) Many princes had **stayed loyal** or neutral in 1857, and the British saw them as **useful allies** who would help keep the people under control; securing their thrones gave them a **stake in British rule**.\n\n(iii) The **proportion of European troops** was raised so Indians could not outnumber them heavily; **artillery** was kept with **Europeans** so rebels would lack heavy guns; recruitment favoured groups seen as **loyal**; and regiments were organised on **community and caste lines** to **divide** soldiers and stop them uniting.',
  sol: 'Policy change; reasons; four army changes with purposes.',
  scheme: [['(i) End of annexation and acceptance of adoption', 2], ['(i) Paramountcy', 1], ['(ii) Reasons', 3], ['(iii) Four changes with purposes', 4]],
}));
Q('l_causes_compare', long({
  t: [1, 2, 3], d: 4, c: 'evaluation', marks: 10, wl: L10,
  stem: 'A student says the uprising of 1857 happened only because of the greased cartridges.\n\n(i) Give one political and one economic cause that show discontent existed before 1857. **[3]**\n(ii) Explain how socio-religious fears made the cartridge rumour so powerful. **[3]**\n(iii) Do you agree with the student? Give reasons for your answer. **[4]**',
  model: '(i) **Political:** the **Doctrine of Lapse** and the **annexation of Awadh** made rulers and nobles hostile. **Economic:** **artisans** were ruined by British imports and **peasants** burdened by **heavy land revenue**.\n\n(ii) Reforms on **sati** and **widow remarriage**, the law protecting **converts**, and open **missionary activity** had already convinced many that the British wanted to **change their religion**; so when told the cartridges were greased with **cow and pig fat**, sepoys believed it at once.\n\n(iii) **Disagree** (a reasoned view): the cartridges were the **immediate cause**, the **spark**, but the revolt spread to **rulers, peasants and artisans** because of **long-standing political, economic, social and military grievances**. Without these, the cartridge issue alone might have stayed a **local protest** by sepoys.',
  sol: 'Earlier causes; link of fears to the rumour; reasoned judgement.',
  scheme: [['(i) Political cause', 2], ['(i) Economic cause', 1], ['(ii) Link between fears and the rumour', 3], ['(iii) Distinguishes immediate and underlying causes', 2], ['(iii) Reasoned judgement', 2]],
}));
Q('l_results', long({
  t: 5, d: 3, c: 'analysis', marks: 10, wl: L10,
  stem: 'Answer the following about the results of 1857.\n\n(i) Explain the end of Company rule and the new title of the Governor-General. **[3]**\n(ii) Explain any three promises of Queen Victoria\'s Proclamation. **[3]**\n(iii) Describe how the uprising changed British policy towards the princely states and the army. **[4]**',
  model: '(i) Under the **Government of India Act, 1858**, the **Company\'s rule ended** and the **Crown** took direct charge; the **Governor-General** was now also the **Viceroy**, ruling in the name of the Crown.\n\n(ii) **No further annexation** and respect for the **rights of the princes**; **no interference in religion**; **equal opportunity in government service** on the basis of qualification.\n\n(iii) **Princes:** annexation was given up and **adoption** accepted, making the princes **loyal allies** under the Crown\'s **paramountcy**. **Army:** more **European soldiers**, **artillery** kept with Europeans, recruitment from groups seen as **loyal**, and regiments organised to **divide** communities.',
  sol: 'End of Company rule; three promises; princes and army.',
  scheme: [['(i) End of Company rule', 2], ['(i) Viceroy', 1], ['(ii) Three promises', 3], ['(iii) Princes', 2], ['(iii) Army', 2]],
}));

// ================================================================ source / picture-based
Q('sb_sepoy_letter', source({
  t: [3, 1], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the extract from an imagined letter written by a sepoy to his brother in a village of Awadh early in 1857, and answer the questions that follow. ${IMAG}`,
  passage: '**Letter from a sepoy, early 1857 (imagined)**\n\nBrother, the new recruits in our lines must now promise to go wherever the Company sends them, even across the black water. Our old allowance for serving far from home is gone too. Last week a story went round the cantonment about the paper of the new cartridges: men say it is greased with something no Hindu or Muslim can put to his lips. And you write that our own Nawab has been sent away and the officers of the court have lost their bread. What is left for families like ours?',
  parts: [
    child('a', short({ t: 3, d: 1, c: 'recall', marks: 1, stem: 'Which law of 1856 does the sepoy refer to in the first sentence?', model: 'The **General Service Enlistment Act** (1856).', sol: 'Service anywhere, including overseas.', scheme: [['General Service Enlistment Act', 1]] })),
    child('b', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'Which political event of 1856 is the sepoy\'s brother describing?', model: 'The **annexation of Awadh** (1856).', sol: 'The Nawab was deposed on a charge of misgovernment.', scheme: [['Annexation of Awadh', 1]] })),
    child('c', short({ t: 3, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Why would the story about the cartridges anger both Hindu and Muslim sepoys?', model: 'The grease was rumoured to contain **cow fat**, forbidden to **Hindus**, and **pig fat**, forbidden to **Muslims**, and the cartridge had to be **bitten**.', sol: 'Both fats and the biting.', scheme: [['Cow and pig fat', 1], ['Had to be bitten', 1]] }), [
      short({ t: [1, 3], d: 3, c: 'evaluation', marks: 2, stem: '**Or** (ii): Using the letter, explain how military and political grievances came together for sepoys from Awadh.', model: 'Sepoys faced **army grievances** (overseas service, lost allowance), and at the same time their **homeland Awadh was annexed**, so their **families** suffered too; both together deepened their anger.', sol: 'One military and one political grievance linked.', scheme: [['Military grievance', 1], ['Political grievance and link', 1]] }),
    ]),
  ],
}));
Q('sb_collector_diary', source({
  t: 2, d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the extract from the imagined diary of a district officer in the 1850s and answer the questions that follow. ${IMAG}`,
  passage: '**Diary of a district officer, 1855 (imagined)**\n\nThe weavers of the old town tell me their looms stand idle; cloth from the mills across the sea sells in the bazaar for less than their cost of yarn. In the villages the revenue was raised again, and three families have handed their fields to the moneylender. The priests in the temple complain that the new laws meddle with marriage and with the property of those who change their faith, and that the preachers at the market gate are protected by the government.',
  parts: [
    child('a', short({ t: 2, d: 1, c: 'recall', marks: 1, stem: 'Which group of people in the extract suffered from foreign competition?', model: 'The **weavers** (artisans).', sol: 'Cheap imported cloth.', scheme: [['Weavers', 1]] })),
    child('b', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Name the law of 1850 about the property of those who change their faith that the priests seem to mean.', model: 'The **Religious Disabilities Act** (1850).', sol: 'Protected the inheritance of converts.', scheme: [['Religious Disabilities Act', 1]] })),
    child('c', short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Identify one economic and one socio-religious grievance from the extract.', model: '**Economic:** idle looms or **higher land revenue** pushing families into debt. **Socio-religious:** laws seen as **meddling with marriage** and conversion, or **preachers protected** by the government.', sol: 'One of each type.', scheme: [['Economic grievance', 1], ['Socio-religious grievance', 1]] }), [
      short({ t: 2, d: 3, c: 'evaluation', marks: 2, stem: '**Or** (ii): Why might a district officer worry that these complaints could lead to unrest?', model: 'Many different groups, **artisans, peasants and religious leaders**, were unhappy at the same time; shared anger across groups could turn into **wider resistance**.', sol: 'Several groups discontented together.', scheme: [['Several groups', 1], ['Risk of combined resistance', 1]] }),
    ]),
  ],
}));
Q('sb_timeline', source({
  t: [1, 5], d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Study the schematic timeline drawn by SOYL and answer the questions that follow. *(The timeline is schematic and not to scale.)*',
  passage: 'The timeline marks: abolition of sati (1829); Satara lapses (1848); Jhansi lapses (1853); Awadh annexed (1856); the uprising (1857); Crown rule (1858).',
  assets: [timelineSvg('Schematic timeline from 1828 to 1860 marking the abolition of sati in 1829, the lapse of Satara in 1848 and of Jhansi in 1853, the annexation of Awadh in 1856, the uprising in 1857 and Crown rule in 1858', 'Schematic, not to scale.')],
  parts: [
    child('a', short({ t: 1, d: 1, c: 'recall', marks: 1, stem: 'Under which policy did Satara and Jhansi pass to the Company?', model: 'The **Doctrine of Lapse**.', sol: 'Adopted heirs not recognised.', scheme: [['Doctrine of Lapse', 1]] })),
    child('b', short({ t: 5, d: 2, c: 'understanding', marks: 1, stem: 'What does "Crown rule (1858)" on the timeline refer to?', model: 'The **end of Company rule** and direct rule by the **British Crown** under the **Government of India Act, 1858**.', sol: 'Transfer to the Crown.', scheme: [['End of Company rule / Crown takes over', 1]] })),
    child('c', short({ t: 5, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Which promise of 1858 directly reversed the policy shown by the 1848 and 1853 marks? Explain.', model: 'The promise of **no further annexation** and respect for the **rights of princes**; with **adoption accepted**, states could no longer lapse.', sol: 'No annexation; adoption recognised.', scheme: [['No annexation', 1], ['Adoption accepted / reverses lapse', 1]] }), [
      short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Explain why the 1856 mark shows a different kind of takeover from the 1848 and 1853 marks.', model: 'Satara and Jhansi lapsed because **adopted heirs were not recognised**; **Awadh** was annexed on a charge of **misgovernment** while its ruler was **alive** and an ally.', sol: 'Lapse versus misgovernment.', scheme: [['Lapse explained', 1], ['Awadh ground explained', 1]] }),
    ]),
  ],
}));

// ================================================================ extra objective items for check slides
Q('m_check_causes', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'Study the diagram of four groups of causes around the uprising. A peasant who lost his land to a moneylender after a rise in revenue belongs in which box?',
  opts: ['Economic', 'Political', 'Socio-religious', 'Military'],
  sol: 'Loss of land due to heavy revenue and debt is an economic grievance.',
  assets: [causesSvg('Diagram with the uprising of 1857 in the centre and four boxes around it: political (lapse, Awadh, rulers slighted), socio-religious (fear of interference), economic (artisans and peasants ruined) and military (sepoys\' pay and status)', 'Four groups of causes.')],
}));
Q('m_check_admin', mcq({
  t: 5, d: 2, c: 'application',
  stem: 'In a before-and-after chart of British administration, which body appears only in the "before 1858" column?',
  opts: ['The Court of Directors of the East India Company', 'The Secretary of State for India', 'The Council of India', 'The Viceroy'],
  sol: 'The Court of Directors belonged to Company rule and was abolished in 1858; the Secretary of State, the Council of India and the Viceroy title belong to the new system.',
}));
Q('tf_check_awadh_sepoys', tf({
  t: 1, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? A large number of sepoys in the Bengal Army came from Awadh.',
  sol: 'True, which is why the annexation of Awadh angered many soldiers personally.',
}));
Q('fb_check_secretary', fb({
  t: 5, d: 1, c: 'recall',
  stem: 'After 1858, the Secretary of State for India was advised by a body called the Council of ___.',
  acc: [['India']],
  sol: 'It was the Council of India.',
}));
