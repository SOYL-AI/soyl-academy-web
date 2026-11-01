// Build ICSE 10 History & Civics ch07 The First War of Independence, 1857. Run from platform/:
//   npx tsx content/authored/social-science/icse-10-history-civics-ch07/src/build.mjs
// ICSE 2027 removed topics: the events of the uprising (t04) are taught for continuity only and no question tests them;
// only the listed consequences (administration, Queen's Proclamation, princely states, army) are tested.
import path from 'node:path';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build } from '../../icse-10-history-civics-ch01/src/lib.mjs';

setUnit('icse-10-history-civics-ch07', 'social-science');
const { timelineSvg, causesSvg, adminSvg, LAPSE, AWADH, DATES } = await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- figures
const vRoute1 = flow('LR', ['Political causes', 'Socio-religious causes', 'Economic causes', 'Military causes', 'The spark'], 'Route map of Part 1: political, socio-religious, economic and military causes, and the spark that set off the uprising', 'Part 1 at a glance');
const vRoute2 = flow('LR', ['Outline of events (for continuity)', 'End of Company rule', 'Queen Victoria\'s Proclamation', 'Princely states', 'The army'], 'Route map of Part 2: a brief outline of events for continuity, the end of Company rule, Queen Victoria\'s Proclamation, the new policy towards princely states and changes in the army', 'Part 2 at a glance');
const vCauses = causesSvg('Diagram with the uprising of 1857 in the centre and four boxes around it: political (lapse, Awadh, rulers slighted), socio-religious (fear of interference), economic (artisans and peasants ruined) and military (sepoys\' pay and status)', 'Many grievances, one explosion.');
const vTimeline = timelineSvg('Schematic timeline from 1828 to 1860 marking the abolition of sati in 1829, the lapse of Satara in 1848 and of Jhansi in 1853, the annexation of Awadh in 1856, the uprising in 1857 and Crown rule in 1858', 'Schematic, not to scale.');
const vLapse = table(['State', 'Year taken', 'Ground'], [
  ...LAPSE.map(([s, y]) => [s, String(y), 'Doctrine of Lapse: adopted heir not recognised']),
  ['Awadh', String(AWADH), 'Alleged misgovernment (ruler deposed)'],
], `Table of takeovers: ${LAPSE.map(([s, y]) => `${s} in ${y}`).join(', ')} under the Doctrine of Lapse, and Awadh in ${AWADH} on the plea of misgovernment`, 'Two different grounds for takeover.');
const vLapseFlow = flow('TB', ['Ruler of a dependent state dies', 'No natural son; an adopted son is named', 'Company refuses to accept the adopted heir', 'The state passes to the Company'], 'Flow of the Doctrine of Lapse: a ruler dies, an adopted son is named because there is no natural son, the Company refuses the adopted heir, and the state passes to the Company', 'How a state "lapsed".');
const vRulers = table(['Who', 'What happened', 'Result'], [
  ['Nawab of Awadh', 'Deposed and his state annexed', 'Nobles and sepoys of Awadh angered'],
  ['Nana Saheb', 'Pension of his adoptive father stopped', 'Became an opponent of the Company'],
  ['Mughal emperor', 'Successors to lose title and palace', 'Symbol of authority insulted'],
  ['Rulers without sons', 'Adoption not accepted for succession', 'Every small state felt unsafe'],
], 'Table of rulers slighted before 1857: the Nawab of Awadh deposed, Nana Saheb denied a pension, the Mughal emperor\'s successors to lose their title and palace, and rulers without sons unable to pass on their states');
const vSocio = table(['Measure or practice', 'Year', 'How some saw it'], [
  ['Abolition of sati', '1829', 'Interference in custom'],
  ['Religious Disabilities Act', '1850', 'Encouraging conversion'],
  ['Widow Remarriage Act', '1856', 'Interference in marriage customs'],
  ['Missionary preaching and schools', '1850s', 'Plan to convert Indians'],
  ['Railways and telegraph', '1850s', 'Breaking caste rules'],
], 'Table of measures seen by some as interference: abolition of sati in 1829, the Religious Disabilities Act of 1850, the Widow Remarriage Act of 1856, missionary preaching and schools, and railways and the telegraph', 'Perceptions of the time, not judgements about the reforms.');
assert.ok(DATES.some(([n, y]) => /sati/i.test(n) && y === 1829));
const vEcon = flow('TB', ['Cheap British manufactured goods', 'Indian handicrafts undersold; artisans jobless', 'Heavy land revenue on peasants', 'Debt and loss of land', 'Wealth flows to Britain (drain)'], 'Flow of economic causes: cheap British manufactures undersold Indian handicrafts and left artisans jobless; heavy land revenue pushed peasants into debt and loss of land; wealth flowed to Britain', 'Economic distress across classes.');
const vVillage = table(['Imagined person', 'Grievance', 'Type'], [
  ['A weaver in a market town', 'Cannot sell cloth against mill-made imports', 'Economic'],
  ['A priest', 'Fears new laws meddle with marriage and faith', 'Socio-religious'],
  ['A taluqdar', 'Estate taken over for unpaid revenue', 'Economic'],
  ['A sepoy\'s family', 'Son told he may be sent overseas', 'Military'],
  ['A court official of a lapsed state', 'Job lost when the state was annexed', 'Political'],
], 'Worked example table sorting imagined people by grievance: a weaver (economic), a priest (socio-religious), a taluqdar (economic), a sepoy\'s family (military) and a court official of a lapsed state (political)', 'Ask what was lost: power, faith, livelihood or status.');
const vMilitary = table(['Grievance', 'Detail'], [
  ['Pay and promotion', 'Lower pay than Europeans; no promotion to high ranks'],
  ['Overseas service', 'General Service Enlistment Act (1856) for new recruits'],
  ['Allowances', 'Extra allowance for distant service stopped after annexation'],
  ['Numbers', 'Indian sepoys far outnumbered British soldiers'],
], 'Table of military grievances: lower pay and no high promotion, compulsory overseas service for new recruits under the 1856 Act, loss of the allowance for distant service, and the large number of Indian sepoys compared with British soldiers');
const vSpark = flow('TB', ['New Enfield rifle introduced', 'Cartridge end had to be bitten', 'Rumour: greased with cow and pig fat', 'Hindu and Muslim sepoys refuse the cartridges', 'Long-standing anger bursts into revolt'], 'Flow of the immediate cause: the Enfield rifle, a cartridge that had to be bitten, the rumour of cow and pig fat, refusal by Hindu and Muslim sepoys, and long-standing anger bursting into revolt', 'The spark, not the whole fire.');
const vAnswer = table(['Part', 'Marks', 'What to write'], [
  ['(i) Name two causes', '3', 'Two causes with a short reason each'],
  ['(ii) Explain one cause', '3', 'Three linked points about one cause'],
  ['(iii) Evaluate', '4', 'Immediate versus underlying causes; a reasoned view'],
], 'Worked example table planning a ten-mark answer on the causes: part (i) names two causes in three marks, part (ii) explains one cause in three marks, part (iii) evaluates immediate and underlying causes in four marks');
const vSum1 = flow('TB', ['Political: lapse, Awadh, rulers slighted', 'Socio-religious: fear of interference and conversion', 'Economic: artisans and peasants ruined', 'Military: pay, overseas service, allowances', 'Spark: the greased cartridges'], 'Summary flow of Part 1: political, socio-religious, economic and military causes, and the greased cartridges as the spark', 'Part 1 in five lines.');
const vOutline = table(['Place', 'Leader (for continuity only)'], [
  ['Meerut (10 May 1857)', 'Sepoys rise and march to Delhi'],
  ['Delhi', 'Bahadur Shah II proclaimed emperor'],
  ['Kanpur', 'Nana Saheb'],
  ['Lucknow', 'Begum Hazrat Mahal'],
  ['Jhansi', 'Rani Lakshmibai'],
  ['Bihar (Jagdishpur)', 'Kunwar Singh'],
], 'Table of the main centres for continuity only: Meerut where sepoys rose on 10 May 1857, Delhi where Bahadur Shah II was proclaimed, Kanpur with Nana Saheb, Lucknow with Begum Hazrat Mahal, Jhansi with Rani Lakshmibai, and Bihar with Kunwar Singh', 'For continuity only: events are not examined.');
const vAdmin = adminSvg('Before-and-after chart: before 1858 the East India Company\'s Court of Directors, the Board of Control in London and the Governor-General in India; after 1858 the British Crown and Parliament, the Secretary of State with the Council of India, and the Governor-General who was also Viceroy', 'From Company to Crown, 1858.');
const vProcl = table(['To whom', 'Assurance (paraphrased)'], [
  ['Princes', 'No further annexation; rights, dignity and treaties respected'],
  ['All Indians', 'No interference in religious beliefs and customs'],
  ['All Indians', 'Government posts open on qualification, regardless of race or creed'],
  ['Participants in the revolt', 'Pardon, except for those who had killed British subjects'],
], 'Table of assurances in Queen Victoria\'s Proclamation, paraphrased: to the princes no further annexation and respect for their rights and treaties; to all Indians religious non-interference and government posts open on qualification; and a pardon for participants except those who had killed British subjects', 'Paraphrase only; the text is not reproduced.');
const vPrinces = flow('LR', ['Before 1858: annexation and lapse', 'Princes insecure', 'After 1858: annexation given up, adoption accepted', 'Princes loyal allies under Crown paramountcy'], 'Flow of policy towards princes: before 1858 annexation and lapse left princes insecure; after 1858 annexation was given up and adoption accepted, and the princes became loyal allies under the paramountcy of the Crown', 'From threat to partnership.');
const vArmy = table(['Change after 1858', 'Purpose'], [
  ['More European soldiers in proportion', 'Indians could not heavily outnumber them'],
  ['Artillery kept with Europeans', 'Rebels would lack heavy guns'],
  ['Recruitment from groups seen as loyal', 'Fewer recruits from areas active in 1857'],
  ['Regiments organised on community lines', 'Divide and rule: prevent soldiers uniting'],
], 'Table of army changes after 1858 and their purpose: more European soldiers in proportion, artillery kept with Europeans, recruitment from groups seen as loyal, and regiments organised on community lines to prevent soldiers uniting');
const vViews = table(['View', 'Reason given'], [
  ['A revolt of sepoys ("mutiny")', 'Began in the army; strongest in northern and central India'],
  ['First War of Independence', 'Rulers, peasants and artisans joined against foreign rule'],
], 'Table of two views about naming the events of 1857: a revolt of sepoys because it began in the army and was strongest in the north and centre, or a first war of independence because rulers, peasants and artisans joined against foreign rule', 'Historians and nationalists have used both names.');
const vSum2 = flow('TB', ['Company rule ended by the 1858 Act', 'Secretary of State, Council of India and Viceroy', 'Proclamation: no annexation, religious freedom, equal service', 'Princes became allies', 'Army reorganised to prevent another revolt'], 'Summary flow of Part 2: Company rule ended by the 1858 Act; the Secretary of State, Council of India and Viceroy; the Proclamation\'s assurances; princes as allies; and the army reorganised', 'Part 2 in five lines.');

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'The First War of Independence, 1857 — Part 1: Causes',
  goals: [
    'Explain the political causes, including the Doctrine of Lapse and the annexation of Awadh',
    'Describe the socio-religious and economic causes of discontent',
    'Explain the grievances of the sepoys and why the greased cartridges became the immediate cause',
  ],
  slides: [
    sl('title', 'The uprising of 1857', {
      b: 'Part 1 — **why** discontent had built up across India by **1857**.',
      v: vRoute1,
      n: 'In the summer of eighteen fifty-seven a great uprising shook the rule of the East India Company across northern and central India. It did not come from nowhere. In this part we look at the grievances of rulers, of ordinary people and of the sepoys, and at the rumour that finally set things alight.',
    }),
    sl('diagram', 'Four groups of causes', {
      b: 'Political, socio-religious, economic and military grievances came together.',
      v: vCauses,
      n: 'Historians usually group the causes into four boxes. Rulers and nobles lost power, many people feared for their religion and customs, artisans and peasants grew poorer, and sepoys resented their treatment. When so many groups were unhappy at once, one spark was enough to start a fire.',
    }),
    sl('diagram', 'A timeline of the build-up', {
      b: 'Grievances piled up over almost thirty years.',
      v: vTimeline,
      n: 'This schematic timeline shows how the pressure built. Social reforms began in the eighteen twenties, the Doctrine of Lapse was applied from eighteen forty-eight, and Awadh was taken over in eighteen fifty-six. The uprising followed a year later, and in eighteen fifty-eight the Crown took over. The spacing is only a sketch, not an exact scale.',
    }),
    sl('diagram', 'The Doctrine of Lapse', {
      b: 'An **adopted son** was not accepted as heir, so the state **passed to the Company**.',
      v: vLapseFlow,
      n: 'Indian rulers had long adopted sons when they had none of their own. Under Lord Dalhousie, the Company refused to accept such an adopted son as the next ruler of a dependent state. The state then lapsed, meaning it passed to the Company. Rulers without natural sons began to fear for their thrones.',
    }),
    sl('diagram', 'States taken over', {
      b: 'Lapse and **misgovernment**: two different grounds.',
      v: vLapse,
      n: 'Satara was the first state taken under the Doctrine, followed by others such as Jhansi and Nagpur. Awadh was different. Its ruler was alive and had been a friend of the Company, but in eighteen fifty-six it was annexed on the plea that it was badly governed. That takeover of a loyal ally caused special bitterness.',
    }),
    sl('check', 'Quick check: four boxes', {
      b: 'Where does a peasant ruined by higher revenue belong in the diagram?',
      chk: 'm_check_causes',
      n: 'Think about what the peasant has lost: power, faith, livelihood or status. Which box fits?',
    }),
    sl('diagram', 'Rulers who felt slighted', {
      b: 'Old rulers and their courts saw their **status** swept away.',
      v: vRulers,
      n: 'Look at how different rulers were treated. The Nawab of Awadh was removed. Nana Saheb, adopted son of the last Peshwa, was refused the pension his father had received. The Mughal emperor was told his successors would lose the imperial title and the palace in Delhi. Each decision created powerful enemies of the Company.',
    }),
    sl('check', 'Quick check: Awadh\'s sepoys', {
      b: 'Did many sepoys of the Bengal Army come from Awadh?',
      chk: 'tf_check_awadh_sepoys',
      n: 'Think about why news from Awadh mattered so much in the army camps.',
    }),
    sl('diagram', 'Fears for religion and custom', {
      b: 'Reforms and missionary work were **seen by some** as interference.',
      v: vSocio,
      n: 'Some laws of the period, such as the ban on sati and the law allowing widows to remarry, were welcomed by reformers but disliked by orthodox groups. A law protecting the property of converts, open preaching in bazaars and new schools made many believe that the rulers wanted to change their faith. Even railways, where all castes sat together, worried some people.',
    }),
    sl('diagram', 'Economic distress', {
      b: 'Artisans, peasants and landholders all lost out.',
      v: vEcon,
      n: 'Cheap cloth from British mills undersold the work of Indian weavers, who also lost their old patrons when courts were closed. Peasants had to pay high land revenue even in bad years, and many fell into the hands of moneylenders. Wealth flowed out of India to Britain. Economic hardship turned ordinary people against the Company.',
    }),
    sl('example', 'Worked example 1: sorting grievances', {
      b: 'Place each imagined person in the right group of causes.',
      bl: ['Step 1: ask what the person **lost**.', 'Step 2: power or status means **political**; faith or custom means **socio-religious**.', 'Step 3: livelihood means **economic**; army service means **military**.'],
      v: vVillage,
      n: 'Here are five imagined people. The weaver and the taluqdar lost their livelihood, so theirs are economic grievances. The priest fears for faith and custom, a socio-religious grievance. The sepoy\'s family worries about service overseas, a military one. The official of an annexed state lost his post through the Company\'s policy, a political grievance.',
    }),
    sl('diagram', 'Grievances of the sepoys', {
      b: 'Low pay, blocked promotion, **overseas service** and lost allowances.',
      v: vMilitary,
      n: 'Indian sepoys were the backbone of the Company\'s army, yet they earned less than European soldiers and could not rise to senior posts. A law of eighteen fifty-six made new recruits promise to serve anywhere, even across the sea, which many feared would cost them their caste. They also lost an extra allowance once distant regions were annexed.',
    }),
    sl('check', 'Quick check: the new rifle', {
      b: 'Name the rifle whose cartridges caused the rumour.',
      chk: 'fb_rifle',
      n: 'A new rifle reached the regiments early in eighteen fifty-seven. What was it called?',
    }),
    sl('diagram', 'The spark: greased cartridges', {
      b: 'A rumour touched **both** Hindu and Muslim sepoys.',
      v: vSpark,
      n: 'The new Enfield rifle used paper cartridges whose ends had to be bitten off. A rumour spread that they were greased with the fat of cows and pigs, offensive to Hindus and Muslims alike. To men already angry, it seemed proof that their religion was under attack. Refusals turned into open revolt in the spring of eighteen fifty-seven.',
    }),
    sl('example', 'Worked example 2: planning a ten-mark answer', {
      b: 'Answer in **three parts**: 3 + 3 + 4 marks.',
      v: vAnswer,
      n: 'Suppose a question asks about causes in three parts. For three marks, name two causes with a short reason each. For the next three, explain one cause with three linked points. For the last four, compare the spark with the deeper causes and give a reasoned view. One clear point earns one mark.',
    }),
    sl('check', 'Quick check: Dalhousie', {
      b: 'Which Governor-General is linked with the Doctrine of Lapse?',
      chk: 'm_lapse_gg',
      n: 'The Doctrine was applied most actively in the years just before the uprising. Who was in charge?',
    }),
    sl('summary', 'Summary of Part 1', {
      bl: ['**Political:** Doctrine of Lapse, Awadh annexed, rulers slighted.', '**Socio-religious:** reforms and missionaries seen as interference.', '**Economic:** artisans, peasants and landholders ruined.', '**Military:** pay, promotion, overseas service, allowances.', '**Spark:** greased Enfield cartridges.'],
      v: vSum1,
      n: 'To sum up Part 1. Rulers lost their states and status, many feared for their faith, ordinary people grew poorer, and sepoys resented their treatment. The rumour about the greased cartridges was the spark, but the fuel had been gathering for years.',
    }),
    sl('exam-tips', 'Exam tips for Part 1', {
      bl: ['Keep **Awadh** separate from the Doctrine of Lapse: it was annexed for **misgovernment**.', 'Name the **Enfield rifle** and **both** fats when explaining the cartridges.', 'Give **examples** with dates: Satara 1848, Jhansi 1853, Awadh 1856.', 'Distinguish the **immediate cause** from the **underlying causes**.'],
      n: 'Some tips. Do not say Awadh lapsed: it was annexed for alleged misgovernment. When you explain the cartridges, name the Enfield rifle and say why both communities were offended. Support causes with examples and dates. And always separate the spark from the deeper causes.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'The First War of Independence, 1857 — Part 2: Outline and Consequences',
  goals: [
    'Recall the main centres of the uprising for continuity',
    'Explain how Company rule ended and the new system of administration',
    'State the assurances of Queen Victoria\'s Proclamation and the changes in policy towards princes and the army',
  ],
  slides: [
    sl('title', 'After the storm', {
      b: 'Part 2 — a brief **outline** of the uprising, then its **consequences**.',
      v: vRoute2,
      n: 'In this part we first trace, only for continuity, where the uprising spread and who led it. Then we turn to what the examination asks about: how the government of India was reorganised in eighteen fifty-eight, the promises of Queen Victoria\'s Proclamation, the new policy towards the princes, and the changes in the army.',
    }),
    sl('diagram', 'Outline of events (for continuity only)', {
      b: 'From **Meerut** to Delhi and beyond. *These events are not examined.*',
      v: vOutline,
      n: 'Sepoys at Meerut rose on the tenth of May, eighteen fifty-seven, and marched to Delhi, where the aged Bahadur Shah the Second was proclaimed emperor. Leaders such as Nana Saheb at Kanpur, Begum Hazrat Mahal at Lucknow, Rani Lakshmibai at Jhansi and Kunwar Singh in Bihar joined. The Company regained control by eighteen fifty-eight. This outline is for continuity only.',
    }),
    sl('two-column', 'What should we call it?', {
      cols: ['**A revolt of sepoys**\n\n- It **began** in the army.\n- It was strongest in **north and central India**.', '**A first war of independence**\n\n- **Rulers, peasants and artisans** joined.\n- Later nationalists saw it as the **first united struggle**.'],
      v: vViews,
      n: 'People have named these events differently. Many British writers of the time called it a mutiny, since it started among soldiers and was concentrated in certain regions. Later, Indian nationalist writers called it the first war of independence, because people from many walks of life joined against foreign rule. You should be able to explain both views.',
    }),
    sl('diagram', 'From Company to Crown', {
      b: 'The **Government of India Act, 1858** ended Company rule.',
      v: vAdmin,
      n: 'The British Parliament decided that a trading company could no longer govern India. The Government of India Act of eighteen fifty-eight transferred power to the Crown. The Court of Directors and the Board of Control were abolished. A Secretary of State for India, a Cabinet minister, was now in charge in London, advised by the Council of India.',
    }),
    sl('check', 'Quick check: before or after?', {
      b: 'Which body belongs only to the period before 1858?',
      chk: 'm_check_admin',
      n: 'Look at the before-and-after chart. Which body disappeared when the Crown took over?',
    }),
    sl('concept', 'Governor-General and Viceroy', {
      b: 'The head of the government in India now had **two titles**.',
      bl: ['As **Governor-General**, he headed the government of British India.', 'As **Viceroy**, he represented the **Crown** in dealings with the princes.', 'He was answerable to the **Secretary of State** in London.'],
      n: 'In India the Governor-General continued to head the government, but he now also carried the title of Viceroy, the representative of the Queen. He took his orders from the Secretary of State in London, who in turn answered to Parliament. This chain of control lasted until India became independent.',
    }),
    sl('check', 'Quick check: the advisers', {
      b: 'Which body advised the Secretary of State?',
      chk: 'fb_check_secretary',
      n: 'The new minister in London was not left alone. Which body was set up to advise him?',
    }),
    sl('diagram', 'Queen Victoria\'s Proclamation', {
      b: 'Announced in India on **1 November 1858** (paraphrased).',
      v: vProcl,
      n: 'In November eighteen fifty-eight the Queen\'s Proclamation was announced in India. In our own words, it promised the princes that their states would not be annexed and their rights would be respected. It promised all Indians freedom of religion and fair entry to government posts on the basis of ability, and it offered pardon to most who had taken part.',
    }),
    sl('example', 'Worked example 1: matching promises to groups', {
      b: 'Which group did each assurance reassure most?',
      bl: ['**No annexation** reassured the **princes**.', '**Religious freedom** answered the fears behind the **cartridge** rumour and the reforms.', '**Equal service** spoke to **educated Indians**.', '**Pardon** aimed to calm those who had **taken part**.'],
      v: vProcl,
      n: 'Let us connect each promise to the fear it answered. Princes had feared annexation, so they were promised it would stop. Many had feared for their faith, so religious freedom was guaranteed. Educated Indians hoped for government posts, so equal entry was promised. And a pardon was offered to calm those who had fought.',
    }),
    sl('diagram', 'A new policy towards the princes', {
      b: 'From **annexation** to **alliance** under the Crown.',
      v: vPrinces,
      n: 'The British noticed that many princes had stayed loyal during the uprising. So the policy changed. Annexation was given up and adopted heirs were accepted. In return, the princes accepted the Crown as the paramount power. They became firm supporters of British rule for the next ninety years.',
    }),
    sl('check', 'Quick check: Crown rule', {
      b: 'Did the Crown govern India directly after 1858?',
      chk: 'tf_company',
      n: 'Think about the law of eighteen fifty-eight. Who held power after it?',
    }),
    sl('diagram', 'Changes in the army', {
      b: 'The army was rebuilt so that **another revolt** would be hard.',
      v: vArmy,
      n: 'The army that had risen in revolt was reorganised. The share of European soldiers went up, and the artillery stayed in European hands. Recruitment shifted towards groups the British regarded as loyal. Regiments were arranged so that soldiers of different communities would not easily combine, a policy often described as divide and rule.',
    }),
    sl('example', 'Worked example 2: change and purpose', {
      b: 'For each change, give the **purpose** as well.',
      bl: ['More Europeans: **outnumbering** could not happen again.', 'Artillery with Europeans: rebels **without heavy guns**.', 'Loyal recruitment: fewer men from **active areas**.', 'Community lines: soldiers **divided**.'],
      v: vArmy,
      n: 'Examiners often reward the reason as much as the change. So for every change in the army, add its purpose. More Europeans meant Indians could not outnumber them heavily. Artillery stayed with Europeans so rebels would lack big guns. Recruitment favoured groups seen as loyal, and community lines kept soldiers apart.',
    }),
    sl('check', 'Quick check: the new title', {
      b: 'What new title did the Governor-General take?',
      chk: 'm_viceroy',
      n: 'The head of the government in India now represented the Queen. What was he called?',
    }),
    sl('summary', 'Summary of Part 2', {
      bl: ['**1858 Act:** Company rule ended; Crown took over.', '**London:** Secretary of State with the Council of India.', '**India:** Governor-General also Viceroy.', '**Proclamation:** no annexation, religious freedom, equal service, pardon.', '**Princes** became allies; **army** reorganised.'],
      v: vSum2,
      n: 'To sum up Part 2. The uprising ended Company rule. A Secretary of State in London and a Viceroy in India took charge. The Queen\'s Proclamation promised no more annexation, freedom of religion and fair entry to service. Princes became allies, and the army was reshaped to prevent another revolt.',
    }),
    sl('exam-tips', 'Exam tips for Part 2', {
      bl: ['**Events** of the uprising are **not examined**: focus on the **consequences**.', 'Write the Proclamation\'s promises **in your own words**; do not try to quote it.', 'For army changes, give the **change and its purpose**.', 'Remember: the **Court of Directors** and **Board of Control** were abolished in 1858.'],
      n: 'Some tips for this part. Questions are set on the consequences, not on battles and sieges. Paraphrase the Proclamation\'s promises clearly. When writing about the army, pair each change with its purpose. And remember which bodies were abolished when the Crown took over.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'The First War of Independence, 1857',
  sections: [
    {
      h: '1. Political causes',
      t: 1,
      b: `- **Doctrine of Lapse** (Lord **Dalhousie**, 1848–1856): an **adopted son** was not accepted as heir of a dependent state, so it passed to the Company. Examples: **${LAPSE.map(([s, y]) => `${s} (${y})`).join(', ')}**.\n- **Awadh** annexed in **${AWADH}** on the plea of **misgovernment**; its Nawab, a long-time ally, was deposed.\n- **Nana Saheb**, adopted son of the last Peshwa, was refused his father's **pension**.\n- The **Mughal emperor's** successors were to lose the **imperial title** and the **Red Fort**.\n- Result: rulers and nobles felt **insecure** and **humiliated**.`,
      terms: [['Doctrine of Lapse', 'Policy by which a dependent state passed to the Company if its ruler died without a natural heir.'], ['Annexation', 'Taking over a territory and adding it to one\'s own.']],
      v: vLapseFlow,
      vs: [vLapse, vRulers],
    },
    {
      h: '2. Socio-religious causes',
      t: 2,
      b: '- **Social reforms** such as the abolition of **sati** (1829) and the **Widow Remarriage Act** (1856) were seen by orthodox groups as interference.\n- The **Religious Disabilities Act** (1850) let **converts** keep ancestral property; many read it as encouragement to convert.\n- **Missionaries** preached and ran schools, and were believed to have official support.\n- **Railways** and the **telegraph** were seen by some as breaking **caste** rules.\n- These were the **perceptions of the time**; many reforms were also supported by Indian reformers.',
      terms: [['Missionary', 'A person sent to spread a religion.']],
      v: vSocio,
    },
    {
      h: '3. Economic causes',
      t: 2,
      b: '- **Artisans** ruined by cheap **British manufactures** and the loss of **royal patrons**.\n- **Peasants** burdened by **heavy land revenue**, collected strictly; many fell into **debt**.\n- **Zamindars and taluqdars** lost estates over unpaid revenue or disputed titles.\n- The **drain of wealth**: revenue and profits sent to Britain.',
      terms: [['Drain of wealth', 'Transfer of India\'s wealth to Britain without an equal return.'], ['Taluqdar', 'A landholder who collected revenue from a group of villages.']],
      v: vEcon,
      vs: [vVillage],
    },
    {
      h: '4. Military causes and the immediate cause',
      t: 3,
      b: '- Sepoys had **lower pay** than European soldiers and could not rise to **high ranks**.\n- The **General Service Enlistment Act (1856)** required new recruits to **serve anywhere**, including **overseas**.\n- The extra **allowance** for service in distant regions stopped when those regions were annexed.\n- Indian sepoys **far outnumbered** British troops.\n- **Immediate cause:** the cartridges of the new **Enfield rifle**, which had to be bitten, were rumoured to be greased with **cow and pig fat**. Mangal Pandey\'s attack on officers at **Barrackpore** (March 1857) showed the anger.',
      terms: [['Sepoy', 'An Indian soldier in the Company\'s army.'], ['Immediate cause', 'The event that sets off a revolt, as against the deeper causes.']],
      v: vSpark,
      vs: [vMilitary],
    },
    {
      h: '5. Outline of events (for continuity only)',
      t: 4,
      b: '- **10 May 1857:** sepoys at **Meerut** rose and marched to **Delhi**; **Bahadur Shah II** was proclaimed emperor.\n- Other centres: **Kanpur** (Nana Saheb), **Lucknow** (Begum Hazrat Mahal), **Jhansi** (Rani Lakshmibai), **Bihar** (Kunwar Singh).\n- The Company regained control by **1858**.\n- *Events are studied only for continuity and are not examined.*',
      terms: [],
      v: vOutline,
      vs: [vViews],
    },
    {
      h: '6. Consequences',
      t: 5,
      b: '- **Government of India Act, 1858:** Company rule ended; the **Crown** took over. The **Court of Directors** and **Board of Control** were abolished.\n- A **Secretary of State for India** (British Cabinet) with a **Council of India**; the **Governor-General** also became the **Viceroy**.\n- **Queen Victoria\'s Proclamation (1 November 1858)**, paraphrased: **no further annexation**; respect for the **rights of princes**; **religious non-interference**; **government posts** open on qualification; **pardon** for most participants.\n- **Princes:** annexation given up, **adoption** accepted; princes became **allies** under the Crown\'s **paramountcy**.\n- **Army:** more **European** troops, **artillery** with Europeans, recruitment from groups seen as **loyal**, regiments organised to **divide** communities.',
      terms: [['Viceroy', 'Representative of the Crown in India.'], ['Paramountcy', 'The supreme authority of the British Crown over the princely states.']],
      v: vAdmin,
      vs: [vProcl, vPrinces, vArmy],
    },
  ],
  tips: '**Common mistakes**\n- Saying Awadh was taken under the Doctrine of Lapse (it was annexed for misgovernment).\n- Writing about battles: events are for continuity only.\n- Quoting the Proclamation: paraphrase its promises.\n- Listing army changes without their purpose.\n\n**How marks are usually awarded**\n- 1-mark items: one correct option or term.\n- 2 marks: two distinct points.\n- 10-mark questions in 3 + 3 + 4 parts: one point per mark; the last part often asks for an explanation or a judgement.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['Doctrine of Lapse', 'Adopted heir not accepted; state **passed to the Company**.', 'definition', 1],
  ['Governor-General linked with the Doctrine of Lapse', '**Lord Dalhousie** (1848–1856).', 'fact', 1],
  ['First state taken under the Doctrine', `**${LAPSE[0][0]}** (${LAPSE[0][1]}).`, 'fact', 1],
  ['Jhansi and Nagpur lapsed in', `**${LAPSE[1][1]}** and **${LAPSE[2][1]}**.`, 'fact', 1],
  ['Ground for annexing Awadh', `Alleged **misgovernment** (${AWADH}).`, 'exam-tip', 1],
  ['Nana Saheb\'s grievance', 'Pension of his adoptive father, the last **Peshwa**, stopped.', 'fact', 1],
  ['Mughal emperor\'s grievance', 'Successors to lose the **title** and the **Red Fort**.', 'fact', 1],
  ['Abolition of sati', '**1829**.', 'fact', 2],
  ['Religious Disabilities Act', '**1850**: converts kept ancestral property.', 'fact', 2],
  ['Widow Remarriage Act', '**1856**.', 'fact', 2],
  ['Why missionaries caused fear', 'Open preaching and schools; believed to have **official support**.', 'concept', 2],
  ['Artisans before 1857', 'Ruined by cheap **British manufactures** and loss of patrons.', 'concept', 2],
  ['Peasants before 1857', '**Heavy land revenue**; debt and loss of land.', 'concept', 2],
  ['Drain of wealth', 'Indian wealth sent to Britain without equal return.', 'definition', 2],
  ['General Service Enlistment Act', '**1856**: new recruits to serve anywhere, including **overseas**.', 'fact', 3],
  ['Sepoys\' pay and promotion', '**Lower pay**; no promotion to **high ranks**.', 'fact', 3],
  ['Rifle linked with the cartridges', 'The **Enfield** rifle.', 'fact', 3],
  ['Why the cartridges offended both communities', 'Rumoured **cow fat** (Hindus) and **pig fat** (Muslims); had to be bitten.', 'concept', 3],
  ['Barrackpore, March 1857', '**Mangal Pandey** attacked officers.', 'fact', 3],
  ['Immediate vs underlying causes', 'Cartridges = **spark**; grievances = **fuel**.', 'exam-tip', 3],
  ['Where the uprising began (continuity)', '**Meerut**, 10 May 1857.', 'fact', 4],
  ['Law that ended Company rule', '**Government of India Act, 1858**.', 'fact', 5],
  ['Bodies abolished in 1858', '**Court of Directors** and **Board of Control**.', 'fact', 5],
  ['New minister in London', '**Secretary of State for India**, advised by the **Council of India**.', 'fact', 5],
  ['Viceroy', 'Governor-General as the **Crown\'s representative**.', 'definition', 5],
  ['Queen\'s Proclamation announced', '**1 November 1858**.', 'fact', 5],
  ['Proclamation and the princes', '**No annexation**; rights and treaties respected.', 'fact', 5],
  ['Proclamation and religion', '**No interference** in beliefs and customs.', 'fact', 5],
  ['Princes after 1858', 'Adoption accepted; **allies** under Crown **paramountcy**.', 'concept', 5],
  ['Army after 1858', 'More Europeans; artillery with Europeans; loyal recruitment; **divide and rule**.', 'concept', 5],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'icse-10-history-civics-chapter-test-short',
  title: 'Chapter test (short) — The First War of Independence, 1857',
  duration: 30,
  sections: [
    { id: 'I', title: 'Part I — Compulsory (10 marks)', instr: 'Attempt all questions. Questions 1–6 carry 1 mark each; questions 7 and 8 carry 2 marks each.', items: ['m_lapse_meaning', 'm_artisans', 'm_cartridge_why', 'm_act1858', 'm_procl_annex', 'ar_cartridge', 's_lapse_two', 's_procl_two'] },
    { id: 'II', title: 'Part II — Structured question (10 marks)', instr: 'Attempt any ONE of the two questions. Each is in three parts (3 + 3 + 4 marks).', items: [{ attempt: 1, keys: ['l_political', 'l_military'] }] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'icse-10-history-civics-chapter-test-long',
  title: 'Chapter test (long) — The First War of Independence, 1857',
  duration: 60,
  sections: [
    { id: 'I', title: 'Part I — Compulsory (20 marks)', instr: 'Attempt all questions. Questions 1–10 carry 1 mark each; questions 11–15 carry 2 marks each.', items: ['m_awadh_ground', 'm_nana', 'm_converts_law', 'm_peasants', 'm_gsea', 'm_promotion', 'm_sos', 'm_army_ratio', 'm_princes_after', 'ar_procl', 's_awadh_why', 's_socio_two', 's_military_two', 's_act1858_two', 's_army_two'] },
    { id: 'II', title: 'Part II — Structured questions (20 marks)', instr: 'Attempt any TWO of the three questions. Each is in three parts (3 + 3 + 4 marks).', items: [{ attempt: 2, keys: ['l_socio_econ', 'l_admin', 'l_princes_army'] }] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t05 of icse-10-history-civics-ch07; t04 (events) taught for continuity only and not tested; only the listed consequences tested',
    originality: 'every letter, diary, report and scene is imagined and written by SOYL (labelled); no textbook text, proclamation text or speech and no specimen or board-paper item reused (D-036); no real person quoted',
    facts: `Doctrine of Lapse under Dalhousie: ${LAPSE.map(([s, y]) => `${s} ${y}`).join(', ')}; Awadh ${AWADH} for misgovernment; sati 1829, Religious Disabilities Act 1850, Widow Remarriage Act 1856, General Service Enlistment Act 1856; Enfield cartridges; Barrackpore March 1857; Meerut 10 May 1857 (continuity); Government of India Act 1858; Queen's Proclamation 1 November 1858 (paraphrased)`,
    gate: 'schema, content lint (lintExemplar), deterministic verify, originality pre-check and the editorial counts run clean on this chapter',
  },
});
