// Build CBSE 12 History ch10 Rebels and the Raj: The Revolt of 1857 and its Representations.
// Run from platform/:  npx tsx content/authored/social-science/cbse-12-history-ch10/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from '../../cbse-12-history-ch01/src/lib.mjs';

setUnit('cbse-12-history-ch10', 'social-science');
await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// Helpers: a table or a flow with an alt text built from its own content.
const tb = (headers, rows, caption) => table(headers, rows, `Table, ${caption}. ${rows.map((r) => r.join(': ')).join('; ')}`, caption);
const fl = (labels, caption) => flow('LR', labels, `Flow chart, ${caption}: ${labels.join(', then ')}`, caption);

// ---------------------------------------------------------------- SVG figures (no maps: places are named in words only)
const vTimeline = (() => {
  const s = new Svg(680, 316);
  const X = (y) => 250 + (y - 1856) * 100;
  const AX = 262;
  for (let yr = 1856; yr <= 1860; yr++) s.line(X(yr), 10, X(yr), AX, { sw: 0.6, dash: true, color: 'muted' });
  s.arrow(242, AX, 668, AX, { sw: 1.8 });
  for (let yr = 1856; yr <= 1860; yr++) {
    s.line(X(yr), AX - 5, X(yr), AX + 5, { sw: 1.2 });
    s.text(X(yr), AX + 20, String(yr), { size: 12, muted: true });
  }
  const ev = (i, name, yr, label) => {
    const y = 26 + i * 30;
    s.text(8, y, name, { anchor: 'start', size: 12 });
    s.dot(X(yr), y, 5, 'accent');
    s.text(X(yr) + 12, y, label, { anchor: 'start', size: 12 });
  };
  ev(0, 'Awadh annexed', 1856.1, '1856');
  ev(1, 'Sepoys rise at Meerut', 1857.35, '10 May 1857');
  ev(2, 'Delhi recaptured', 1857.75, 'late September 1857');
  ev(3, 'Lucknow finally retaken', 1858.2, 'March 1858');
  ev(4, 'Rani of Jhansi dies fighting', 1858.45, 'June 1858');
  ev(5, 'Rule passes to the Crown', 1858.65, '1858');
  ev(6, 'Paton paints In Memoriam', 1858.5, '1858');
  ev(7, 'Barker paints the relief of Lucknow', 1859.3, '1859');
  s.text(340, 304, 'Years CE. Places inside a year are only approximate.', { size: 12, muted: true });
  return s.visual('Timeline from 1856 to 1860 CE in eight rows: Awadh annexed in 1856; sepoys rise at Meerut on 10 May 1857; Delhi recaptured in late September 1857; Lucknow finally retaken in March 1858; the Rani of Jhansi dies fighting in June 1858; rule passes to the Crown in 1858; Paton paints In Memoriam in 1858; Barker paints the relief of Lucknow in 1859', 'From the annexation of Awadh to the paintings');
})();

const vAwadh = (() => {
  const s = new Svg(700, 340);
  const box = (x, y, w, h, lines) => {
    s.rect(x, y, w, h, { sw: 2, color: 'accent', fill: 'fill' });
    s.text(x + w / 2, y + 24, lines[0], { bold: true, size: 14 });
    lines.slice(1).forEach((t, i) => s.text(x + w / 2, y + 50 + i * 21, t, { size: 12 }));
  };
  box(240, 10, 220, 56, ['Annexation of Awadh', '1856, for misgovernment']);
  box(15, 105, 210, 100, ['Court and army', 'nawab dethroned, exiled', 'to Calcutta; many left', 'without work']);
  box(245, 105, 210, 100, ['Summary settlement', 'many taluqdars lose', 'their lands; peasants', 'often join them']);
  box(475, 105, 210, 100, ['Revenue and army', 'demand on peasants not', 'much lower; many sepoys', 'come from the villages']);
  s.arrow(350, 66, 120, 105, { sw: 1.8 });
  s.arrow(350, 66, 350, 105, { sw: 1.8 });
  s.arrow(350, 66, 580, 105, { sw: 1.8 });
  s.rect(130, 255, 440, 56, { sw: 2, color: 'accent', fill: 'fill' });
  s.text(350, 275, 'Courtiers, soldiers, taluqdars and peasants', { bold: true, size: 13 });
  s.text(350, 297, 'join: some of the longest resistance', { size: 12 });
  s.arrow(120, 205, 250, 255, { sw: 1.8 });
  s.arrow(350, 205, 350, 255, { sw: 1.8 });
  s.arrow(580, 205, 450, 255, { sw: 1.8 });
  s.text(350, 330, 'How annexation led to many separate grievances', { size: 12, muted: true });
  return s.visual('Diagram: the annexation of Awadh in 1856 for misgovernment leads to three boxes, the court and army dissolved with the nawab dethroned and exiled to Calcutta; the summary settlement under which many taluqdars lose their lands and peasants often join them; and the revenue demand on peasants not much lower with many sepoys coming from the villages. All three lead to a final box in which courtiers, soldiers, taluqdars and peasants join in some of the longest resistance', 'Why Awadh became a centre of revolt');
})();

const vChain = (() => {
  const s = new Svg(700, 250);
  const box = (x, lines) => {
    s.rect(x, 15, 140, 110, { sw: 2, color: 'accent', fill: 'fill' });
    s.text(x + 70, 38, lines[0], { bold: true, size: 14 });
    lines.slice(1).forEach((t, i) => s.text(x + 70, 64 + i * 20, t, { size: 12 }));
  };
  box(20, ['Maker', 'painter, cartoonist', 'or poster artist', 'with a purpose']);
  box(190, ['Picture', 'what is shown, and', 'how: size, colour,', 'position']);
  box(360, ['Audience', 'buyers, readers and', 'viewers of one', 'place and time']);
  box(530, ['Memory', 'how the revolt is', 'remembered by', 'later generations']);
  [160, 330, 500].forEach((x) => s.arrow(x, 70, x + 30, 70, { sw: 2 }));
  s.rect(20, 160, 650, 50, { sw: 1.6 });
  s.text(345, 185, 'The historian asks: who made it, for whom, when and why?', { size: 13 });
  s.arrow(345, 160, 345, 128, { sw: 1.8 });
  s.text(350, 238, 'A picture is a representation, not a photograph of events', { size: 12, muted: true });
  return s.visual('Diagram of four boxes joined by arrows from left to right: the maker, a painter, cartoonist or poster artist with a purpose; the picture, what is shown and how; the audience, buyers, readers and viewers of one place and time; and memory, how the revolt is remembered by later generations. Below, a box says the historian asks who made it, for whom, when and why, with an arrow up to the chain', 'How an image is made and what it does');
})();

// ---------------------------------------------------------------- tables and flows: Part 1
const vRoute1 = fl(['Meerut and Delhi', 'Spread and pattern', 'Leaders', 'Awadh in revolt'], 'Part 1 at a glance');
const vSpark = tb(['Date (1857)', 'What happened'], [['10 May', 'Sepoys at Meerut mutiny after soldiers who had refused the new cartridges are punished'], ['11 May', 'They reach the Red Fort in Delhi; the ageing emperor Bahadur Shah Zafar is asked to lead and agrees'], ['Afterwards', 'The revolt spreads to Lucknow, Kanpur, Jhansi, Bareilly, Arrah and other places']], 'Meerut to Delhi');
const vRumour = tb(['Report', 'Why it mattered'], [['New Enfield rifle cartridges said to be greased with cow and pig fat', 'Contact with the fat would offend many Hindu and Muslim sepoys'], ['Bone dust said to be mixed in flour sold in markets', 'It seemed a plot against food and faith'], ['Chapatis reported to be passed from village to village', 'A report of something moving hand to hand between villages']], 'Reports and rumours of 1857');
const vRumourWhy = fl(['Fears about British intentions', 'Reforms, missionaries, annexations', 'A rumour fits the fear', 'It is believed and repeated'], 'Why rumours spread');
const vPattern = fl(['Sepoys seize arms and the treasury', 'Attack jail, telegraph office, records room', 'Townspeople and villagers join', 'Moneylenders and the rich attacked'], 'The common pattern');
const vPlan = tb(['Evidence', 'What it may show'], [['Messages passed between regiments', 'Some contact between units'], ['Night meetings of sepoy panchayats', 'Some discussion among sepoys'], ['The gaps in the records', 'Why historians speak carefully about organisation']], 'Evidence for planning');
const vEx1 = tb(['Step', 'Imagined note by a magistrate'], [['Sepoy stage', 'The treasury was emptied by the sepoys'], ['Civilian stage', 'On the third day villagers burned the revenue registers'], ['Reading', 'The note fits the two-stage pattern'], ['Missing', 'Who gave the orders, and what the villagers wanted']], 'Reading a magistrate\'s note');
const vLeaders = tb(['Leader', 'Place', 'Background'], [['Nana Sahib', 'Kanpur', 'Adopted son of Baji Rao II, the last Peshwa'], ['Rani Lakshmi Bai', 'Jhansi', 'Queen of a state hit by the doctrine of lapse'], ['Kunwar Singh', 'Arrah, Bihar', 'Zamindar'], ['Begum Hazrat Mahal', 'Lucknow', 'Put forward her son Birjis Qadr as nawab'], ['Shah Mal', 'Baraut region', 'Peasant leader'], ['Maulvi Ahmadullah Shah', 'Faizabad', 'A maulvi'], ['Gonoo', 'Singhbhum, Chotanagpur', 'Tribal cultivator']], 'Leaders of the revolt');
const vAwadhFlow = fl(['Subsidiary Alliance, Wellesley, 1798', 'Annexation for misgovernment, Dalhousie, 1856', 'Nawab Wajid Ali Shah exiled to Calcutta', 'Court and army dissolved'], 'How Awadh was lost');
const vTaluq = tb(['Group', 'Position before', 'After the settlement'], [['Taluqdars', 'Held forts and had armed retainers', 'Many removed from their lands'], ['Peasants', 'Followed their taluqdars', 'Revenue demand not much lower'], ['Court servants and soldiers', 'Served the nawab', 'Court and army dissolved']], 'Groups in Awadh');
const vSepoy = tb(['Link', 'Detail'], [['Recruitment', 'Many sepoys of the Bengal army came from Awadh villages'], ['Shared grievance', 'What troubled the villages was also felt in the barracks'], ['Effect', 'Army and countryside rose together in many places']], 'Sepoys and villages');
const vLucknow = tb(['Point', 'Detail'], [['Leader', 'Begum Hazrat Mahal'], ['Nawab put forward', 'Her young son Birjis Qadr'], ['Regime', 'A rebel administration at Lucknow'], ['End', 'Lucknow finally retaken in March 1858']], 'Lucknow');
const vEx2 = tb(['Step', 'Imagined village that rose'], [['Explanation A', 'The revenue demand stayed heavy'], ['Explanation B', 'Loyalty to the taluqdar'], ['What would separate them', 'Petitions that mention revenue, against orders from the taluqdar'], ['Until then', 'We cannot say which mattered more']], 'Weighing two explanations');
const vEx3 = tb(['Imagined undated note', 'Clue'], [['Note A', 'The emperor sits in the Red Fort'], ['Note B', 'Lucknow has been retaken'], ['Note C', 'The Meerut sepoys have just risen'], ['Order', 'C, then A, then B']], 'Building a chronology');
const vSum1 = tb(['Idea', 'Remember'], [['Beginning', '10 May 1857 Meerut; 11 May Delhi; Bahadur Shah Zafar leads'], ['Spread', 'Pattern of two stages; rumours reflect fears; messages between regiments'], ['Leaders', 'Nana Sahib, Rani Lakshmi Bai, Kunwar Singh, Begum Hazrat Mahal, Shah Mal, Gonoo'], ['Awadh', 'Annexation 1856; taluqdars; peasants; sepoys']], 'Summary of Part 1');
const vTips1 = tb(['Mistake to avoid', 'Better'], [['Calling the revolt a single plan', 'Say some contact, with causes in many places'], ['Naming leaders without places', 'Pair each leader with a place and a background'], ['Saying peasants welcomed the end of taluqdars', 'Say the demand did not fall much'], ['Adding detail of violence', 'State it briefly and neutrally']], 'Common mistakes in Part 1');

// ---------------------------------------------------------------- tables and flows: Part 2
const vRoute2 = fl(['What the rebels wanted', 'Repression', 'Images of the revolt', 'Reading visual sources'], 'Part 2 at a glance');
const vProclaim = tb(['Feature', 'Detail'], [['Issued', 'In the name of Bahadur Shah, and one at Azamgarh in August 1857'], ['Called on', 'Hindus and Muslims together; people of all religions'], ['Attacked', 'British rule for its effects on zamindars, merchants, artisans, officials and religious leaders']], 'Rebel proclamations');
const vUnity = tb(['Point', 'Detail'], [['The rebel appeal', 'Unity across religions'], ['The British attempt', 'To present the revolt as a conflict between communities'], ['Result', 'Largely failed in the main centres']], 'Unity and the British attempt');
const vEarlier = fl(['Hope to restore an earlier world', 'Look to the Mughal emperor', 'Parallel administrations', 'Delhi court and Lucknow regime'], 'Restoring and governing');
const vTargets = tb(['Target', 'Why'], [['Moneylenders and the rich', 'Seen as allies of the British'], ['Government buildings', 'Marks of British power'], ['Result', 'Many groups, each with its own reasons']], 'Targets of the rebels');
const vEx1b = tb(['Step', 'Imagined rebel notice'], [['Who is addressed', 'Merchants and artisans'], ['What is claimed', 'British rule has hurt them; Hindus and Muslims should stand together'], ['It shows', 'What the authors wished others to believe'], ['Missing', 'Whether people answered the call']], 'Reading a rebel notice');
const vRepress = fl(['Laws of 1857: martial law in north India', 'Officers and ordinary Britons may try suspects', 'Reinforcements from Britain', 'Delhi and Lucknow retaken'], 'Steps of repression');
const vEnd = tb(['When', 'What'], [['Late September 1857', 'Delhi recaptured'], ['After the recapture', 'Bahadur Shah tried and exiled to Rangoon; died there in 1862'], ['March 1858', 'Lucknow finally retaken'], ['June 1858', 'The Rani of Jhansi dies fighting'], ['1858', 'British rule passes from the Company to the Crown'], ['End of 1858 to 1859', 'Revolt largely suppressed']], 'How the revolt ended');
const vBrit = tb(['Image', 'What it shows'], [['Barker, relief of Lucknow, 1859', 'Colin Campbell, James Outram and Henry Havelock as heroic rescuers'], ['Paton, In Memoriam, 1858', 'English women and children'], ['Images of Justice and vengeance', 'The British as avenging justice'], ['Rebels in British pictures', 'Shown as violent']], 'British images');
const vPunch = tb(['Point', 'Detail'], [['Magazine', 'Punch, in London'], ['Subject', 'Governor-General Canning\'s call for moderation'], ['Nickname', 'Clemency Canning, given by critics'], ['Made for', 'Readers at home']], 'Cartoons and Canning');
const vEx2b = tb(['Step', 'Imagined engraving of 1858'], [['What is shown', 'A soldier carries a child; small dark figures crowd the background'], ['How', 'The soldier is large and central'], ['For whom', 'Buyers in Britain'], ['It cannot tell', 'How Indians saw the events']], 'Reading an engraving');
const vNational = tb(['Point', 'Detail'], [['When', 'The twentieth century'], ['Makers', 'Nationalist artists and writers'], ['Showed', 'The Rani of Jhansi and others as heroes'], ['For', 'Audiences of their own time']], 'Nationalist images');
const vNaming = tb(['Label', 'Stresses', 'Linked with'], [['Mutiny', 'A revolt of soldiers against their officers', 'British accounts'], ['First war of independence', 'Wide participation and the aim of ending British rule', 'V. D. Savarkar, 1909']], 'Two labels');
const vEx3b = tb(['Imagined image', 'Clue', 'Kind'], [['Print of 1858 with rescuers and Justice', 'British maker, near the events', 'British picture'], ['Poster of the 1930s with the Rani as a heroine', 'Long after, nationalist hero', 'Nationalist picture'], ['Punch cartoon about mercy', 'London magazine', 'Comment on British policy']], 'Sorting images by clues');
const vSum2 = tb(['Idea', 'Remember'], [['Aims', 'Proclamations; unity; earlier world; parallel administrations; moneylenders'], ['Repression', 'Martial law; reinforcements; Delhi 1857; Lucknow 1858; Crown 1858'], ['Images', 'Made by people for audiences; British rescue and justice; nationalist heroes'], ['Naming', 'Mutiny or first war of independence: a debate']], 'Summary of Part 2');
const vTips2 = tb(['Mistake to avoid', 'Better'], [['Treating a picture as a photograph', 'Ask who made it, for whom, when and why'], ['Choosing one label as the only right one', 'Present the naming as a debate'], ['Blaming a community', 'Use neutral language and name the evidence'], ['Quoting captions from memory', 'Describe what is shown in your own words']], 'Common mistakes in Part 2');

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Rebels and the Raj — Part 1: The Rebellion and Awadh',
  goals: [
    'Describe how the revolt of 1857 began at Meerut and Delhi and spread through cantonments and towns',
    'Explain the common pattern of revolt, the part of rumours and what the evidence for planning can show',
    'Identify the main leaders, their places and their backgrounds',
    'Explain why Awadh became a centre of revolt and read short imagined records on it',
  ],
  slides: [
    sl('title', 'Rebels and the Raj', {
      b: 'Part 1: the **rebellion**, its **spread** and **Awadh in revolt**.',
      v: vRoute1,
      n: 'In 1857 a rising of soldiers became a revolt of many peoples across north India. In this part we follow how it began at Meerut and Delhi, how it spread, who led it, and why Awadh became one of its strongest centres.',
    }),
    sl('concept', 'From Meerut to Delhi', {
      b: 'On **10 May 1857** sepoys at Meerut mutinied; on **11 May** they reached the Red Fort.',
      v: vSpark,
      n: 'On 10 May 1857, sepoys at Meerut mutinied, after soldiers who had refused the new cartridges were punished. They rode to Delhi, and on 11 May reached the Red Fort. There the ageing Mughal emperor, Bahadur Shah Zafar, was asked to be their leader, and he agreed. From there the revolt spread to many cantonments and towns.',
    }),
    sl('concept', 'Reports and rumours', {
      b: 'Cartridges, flour and chapatis: reports that **alarmed** or **puzzled** people.',
      v: vRumour,
      n: 'Rumours were part of the story. People said the cartridges of the new Enfield rifle were greased with the fat of cows and pigs, and that bone dust was mixed into flour sold in markets. Chapatis were reported to be passed from village to village. Each report is something a historian must weigh, not simply accept.',
    }),
    sl('check', 'Quick check: the beginning', {
      b: 'On which date in 1857 did sepoys at Meerut mutiny?',
      chk: 'm_meerut',
      n: 'Recall the date on which the revolt began.',
    }),
    sl('concept', 'Why rumours spread', {
      b: 'A rumour travels when it **fits a fear** that people already hold.',
      v: vRumourWhy,
      n: 'Why did such rumours spread? Because they reflected fears about British intentions. Reforms such as the abolition of sati and the permission for widow remarriage, English education, the work of missionaries and the annexation of states had made many people uneasy. A rumour that fitted these fears was easy to believe and easy to repeat.',
    }),
    sl('diagram', 'The revolt in time', {
      v: vTimeline,
      n: 'This timeline places the events from 1856 to 1859. Awadh was annexed in 1856. The sepoys rose at Meerut in May 1857. Delhi was recaptured in September 1857, Lucknow was retaken in March 1858, and the Rani of Jhansi died in June 1858. British rule passed to the Crown in 1858. Two famous British paintings date from 1858 and 1859.',
    }),
    sl('concept', 'A common pattern', {
      b: 'First the **sepoys**, then the **townspeople and villagers**.',
      v: vPattern,
      n: 'A common pattern appears in many places. Sepoys seized arms and the treasury, then attacked government buildings such as the jail, the telegraph office and the records room. After that, townspeople and villagers joined in. Many attacked moneylenders and other rich people who were seen as allies of the British.',
    }),
    sl('concept', 'Was it planned?', {
      b: 'Messages between regiments and night meetings show **contact**; they do not prove a **plan**.',
      v: vPlan,
      n: 'Was the revolt planned? Regiments sent messages to one another, and panchayats of sepoys met at night. That suggests some contact and discussion among sepoys. But contact is not the same as a plan, and the records have gaps, so historians speak carefully about how far the revolt was organised.',
    }),
    sl('example', 'Worked example 1: reading a magistrate\'s note', {
      b: 'Imagined note: *the sepoys emptied the treasury; on the third day villagers burned the revenue registers.*',
      bl: [
        'Step 1 — Find the **sepoy stage**.',
        'Step 2 — Find the **civilian stage**.',
        'Step 3 — Say how it **fits** the pattern.',
        'Step 4 — Say what is **missing**.',
      ],
      v: vEx1,
      n: 'Take an imagined note by a magistrate. It says the sepoys emptied the treasury, and that on the third day villagers burned the revenue registers. The first fact shows the sepoy stage and the second the civilian stage, so the note fits the common pattern. What is missing is who gave the orders and what the villagers wanted.',
    }),
    sl('concept', 'Leaders of the revolt', {
      b: 'Leaders came from **ruling families**, from **zamindars**, and from **peasant and tribal** communities.',
      v: vLeaders,
      n: 'The revolt had many leaders. Nana Sahib, the adopted son of the last Peshwa, led at Kanpur. Rani Lakshmi Bai led at Jhansi. Kunwar Singh was a zamindar of Arrah. Begum Hazrat Mahal put forward her son at Lucknow. Shah Mal was a peasant leader, and Gonoo a tribal cultivator. Maulvi Ahmadullah Shah was a leader at Faizabad.',
    }),
    sl('check', 'Quick check: leaders and places', {
      b: 'Match each leader with the place where he or she is chiefly remembered.',
      chk: 'mt_leaders',
      n: 'Link each leader with a place.',
    }),
    sl('concept', 'How Awadh was lost', {
      b: 'Bound by the **Subsidiary Alliance**, then **annexed in 1856**.',
      v: vAwadhFlow,
      n: 'Awadh had been bound by the Subsidiary Alliance, which Lord Wellesley introduced in 1798. In 1856, Lord Dalhousie annexed it on the ground of misgovernment. The nawab, Wajid Ali Shah, was dethroned and exiled to Calcutta, and his court and army were dissolved.',
    }),
    sl('diagram', 'Why Awadh rose', {
      v: vAwadh,
      n: 'This diagram shows how the annexation led to several grievances. The court and army were dissolved, taluqdars lost lands in the settlement, and the revenue demand on peasants did not fall much. Because many sepoys came from Awadh villages, these grievances met in the barracks. Together they made Awadh a centre of long resistance.',
    }),
    sl('concept', 'Taluqdars and peasants', {
      b: 'The **summary settlement of 1856** removed many taluqdars from their lands.',
      v: vTaluq,
      n: 'Taluqdars were large landholders with forts and armed retainers. The summary settlement of 1856 removed many of them from their lands. The British expected peasants to welcome this. But the revenue demand on peasants did not fall much, and many peasants joined their taluqdars in revolt.',
    }),
    sl('example', 'Worked example 2: weighing two explanations', {
      b: 'Imagined village: *peasants rose with their taluqdar.* Was it the **demand** or **loyalty**?',
      bl: [
        'Step 1 — State **explanation A**.',
        'Step 2 — State **explanation B**.',
        'Step 3 — Name **evidence that separates** them.',
        'Step 4 — Say what **cannot yet be said**.',
      ],
      v: vEx2,
      n: 'Take an imagined village that rose. One explanation says the revenue demand stayed heavy. Another says peasants were loyal to their taluqdar. To choose between them, a historian looks for petitions that mention revenue and for orders that came from the taluqdar. Until then she cannot say which mattered more.',
    }),
    sl('check', 'Quick check: a term', {
      b: 'In Awadh, the large landholders with forts and armed retainers were called ___.',
      chk: 'fb_taluqdar',
      n: 'Recall the term for the large landholders.',
    }),
    sl('concept', 'Sepoys and villages', {
      b: 'Many sepoys came from **Awadh villages**, so grievances were **linked**.',
      v: vSepoy,
      n: 'Many sepoys of the Company\'s Bengal army came from villages of Awadh. So the grievances of the villages were also felt in the barracks. The link between sepoys and peasants is one reason the resistance there was widespread and lasted so long.',
    }),
    sl('concept', 'Lucknow', {
      b: '**Begum Hazrat Mahal** put forward her son **Birjis Qadr** as nawab.',
      v: vLucknow,
      n: 'At Lucknow, Begum Hazrat Mahal put forward her young son, Birjis Qadr, as nawab, and his regime acted as a rebel administration. Awadh saw some of the longest resistance. Lucknow was finally retaken by the British only in March 1858.',
    }),
    sl('example', 'Worked example 3: building a chronology', {
      b: 'Three imagined undated notes: *the emperor in the Red Fort; Lucknow retaken; the Meerut sepoys just risen.*',
      bl: [
        'Step 1 — Find a **known event** in each note.',
        'Step 2 — Place each event on the **timeline**.',
        'Step 3 — **Order** the notes.',
      ],
      v: vEx3,
      n: 'Take three imagined undated notes. Note A says the emperor sits in the Red Fort. Note B says Lucknow has been retaken. Note C says the Meerut sepoys have just risen. The order is C, then A, then B. Clues about known events let us build a chronology even when notes carry no dates.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSum1,
      n: 'To sum up. The revolt began at Meerut on 10 May 1857, and Bahadur Shah Zafar was asked to lead at Delhi. It spread by a common pattern, with rumours reflecting fears, and with many leaders of different backgrounds. Awadh joined because annexation, the settlement and the link between sepoys and villages produced many grievances.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Say **some contact**, not a single plan.',
        'Pair each **leader** with a place and a background.',
        'Say the revenue demand **did not fall much**.',
        'State violence **briefly and neutrally**.',
        'Name the **annexation, settlement and sepoy link** for Awadh.',
      ],
      v: vTips1,
      n: 'Some tips. Say some contact between regiments, not a single plan. Pair each leader with a place and a background. For Awadh, say the revenue demand did not fall much. State violence briefly and neutrally. And name the annexation, the settlement and the link with sepoys when you explain why Awadh rose.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Rebels and the Raj — Part 2: Aims, Repression and Images',
  goals: [
    'Describe what the rebels wanted, from their proclamations, their targets and their administrations',
    'Describe how the British put down the revolt, briefly and neutrally',
    'Interpret British and nationalist images of 1857 as representations made for audiences',
    'Explain why the labels mutiny and first war of independence form a debate about naming',
  ],
  slides: [
    sl('title', 'Aims, Repression and Images', {
      b: 'Part 2: **what the rebels wanted**, **repression**, **images** and **naming**.',
      v: vRoute2,
      n: 'In this part we ask what the rebels wanted, how the British put the revolt down, and how it has been pictured since. Pictures are not photographs. They were made by people, for audiences, and they shaped how the revolt was remembered.',
    }),
    sl('concept', 'What the proclamations said', {
      b: 'Appeals to **all sections** of society, **regardless of religion**.',
      v: vProclaim,
      n: 'Rebel proclamations appealed to all sections of society regardless of religion. One was issued in the name of Bahadur Shah, and another at Azamgarh in August 1857. They called on Hindus and Muslims together to fight, and attacked British rule for its effects on zamindars, merchants, artisans, officials and religious leaders.',
    }),
    sl('concept', 'Unity and the British attempt', {
      b: 'The attempt to portray the revolt as a **conflict between communities** largely failed in the main centres.',
      v: vUnity,
      n: 'The British tried to present the revolt as a conflict between communities. In the main centres, this attempt largely failed. We describe this neutrally. It is a finding drawn from the records, and it does not rest on praise or blame of any group.',
    }),
    sl('check', 'Quick check: proclamations', {
      b: 'Which feature do the rebel proclamations share?',
      chk: 'm_proclaim',
      n: 'Recall what the proclamations called for.',
    }),
    sl('concept', 'An earlier world and parallel rule', {
      b: 'Rebels sought to **restore an earlier world** and set up **parallel administrations**.',
      v: vEarlier,
      n: 'Rebels sought to restore an earlier world, which is why they looked to the authority of the Mughal emperor. Some set up parallel administrations. In Delhi there was a court of administration, and in Lucknow the regime of Birjis Qadr. These show an attempt to govern, and not only to fight.',
    }),
    sl('concept', 'Who and what was attacked', {
      b: '**Moneylenders** and the **rich** were seen as allies of the British.',
      v: vTargets,
      n: 'Rebels also attacked moneylenders and the rich, who were seen as allies of the British. They attacked government buildings too. This shows that the revolt carried the grievances of many groups, and that different groups had their own reasons for taking part.',
    }),
    sl('example', 'Worked example 1: reading a rebel notice', {
      b: 'Imagined notice: *speaks to merchants and artisans; calls on Hindus and Muslims to stand together.*',
      bl: [
        'Step 1 — Who is **addressed**?',
        'Step 2 — What is **claimed**?',
        'Step 3 — What does it **show**?',
        'Step 4 — What is **missing**?',
      ],
      v: vEx1b,
      n: 'Take an imagined rebel notice of a kind historians study. It speaks to merchants and artisans, and calls on Hindus and Muslims to stand together. It shows what its authors wished others to believe and whom they hoped to win over. What is missing is whether people answered the call.',
    }),
    sl('concept', 'Repression', {
      b: 'Laws of **May and June 1857** put north India under **martial law**.',
      v: vRepress,
      n: 'The British acted quickly. From May and June 1857, laws put north India under martial law. Military officers, and even ordinary Britons, could try and punish Indians suspected of rebellion. Reinforcements came from Britain. We state this plainly, without detail, since violence occurred on both sides.',
    }),
    sl('concept', 'How the revolt ended', {
      b: 'Delhi, Lucknow, Jhansi and the **Crown** in 1858.',
      v: vEnd,
      n: 'Delhi was recaptured in late September 1857. Bahadur Shah was tried and exiled to Rangoon, where he died in 1862. Lucknow was finally retaken in March 1858, and the Rani of Jhansi died fighting in June 1858. The revolt was largely suppressed by the end of 1858 or 1859, and British rule passed from the Company to the Crown in 1858.',
    }),
    sl('check', 'Quick check: chronology', {
      b: 'Arrange these events in chronological order, earliest first.',
      chk: 'ord_events',
      n: 'Place the events in order.',
    }),
    sl('diagram', 'How an image is made', {
      v: vChain,
      n: 'An image is made by someone, for an audience, and it shapes memory. This diagram shows the chain from maker to picture to audience to memory. A historian reads a picture by asking who made it, for whom, when and why. A picture is a representation, not a photograph of events.',
    }),
    sl('concept', 'British pictures of the revolt', {
      b: 'The British as **heroic rescuers** and **avenging justice**; the rebels as violent.',
      v: vBrit,
      n: 'Many British pictures presented the British as heroic rescuers and as avenging justice, and the rebels as violent. Thomas Jones Barker painted the relief of Lucknow in 1859, with Colin Campbell, James Outram and Henry Havelock. Joseph Noel Paton painted In Memoriam in 1858, about English women and children.',
    }),
    sl('concept', 'Cartoons and Clemency Canning', {
      b: '**Punch** commented on Canning\'s call for **moderation**.',
      v: vPunch,
      n: 'Cartoons in the London magazine Punch commented on Governor-General Canning\'s call for moderation. Critics nicknamed him Clemency Canning. Such cartoons were made for readers at home, and they tried to shape what those readers felt about the revolt and how it should be dealt with.',
    }),
    sl('example', 'Worked example 2: reading an engraving', {
      b: 'Imagined engraving of 1858: *a soldier carries a child; small dark figures crowd the background.*',
      bl: [
        'Step 1 — What is **shown**?',
        'Step 2 — **How**: size and position.',
        'Step 3 — **For whom**?',
        'Step 4 — What can it **not tell** us?',
      ],
      v: vEx2b,
      n: 'Take an imagined engraving of 1858. A soldier carries a child, and small dark figures crowd the background. Ask what is shown, how, for whom, and what is missing. The soldier is large and central, so the maker honours him. It was made for buyers in Britain, and it cannot tell us how Indians saw the events.',
    }),
    sl('check', 'Quick check: images', {
      b: 'Match each image or group of images with what it showed or did.',
      chk: 'mt_images',
      n: 'Link each image with its subject.',
    }),
    sl('concept', 'Nationalist images', {
      b: 'The **Rani of Jhansi** and others celebrated as **heroes**.',
      v: vNational,
      n: 'In the twentieth century, nationalist images celebrated the Rani of Jhansi and others as heroes. They were made for audiences in their own time, who wished to be inspired by those who had fought British rule. Like British pictures, they are representations, and they tell us about the time that made them.',
    }),
    sl('concept', 'Mutiny or first war of independence?', {
      b: 'Two labels, two **views**: a **debate about naming**.',
      v: vNaming,
      n: 'The events are given different names. Mutiny stresses a revolt of soldiers against their officers. First war of independence stresses wide participation and the aim of ending British rule. V. D. Savarkar used the second name in 1909. Historians treat this as a debate about naming, because each label carries a view.',
    }),
    sl('check', 'Quick check: a label', {
      b: 'In 1909 V. D. ___ called the revolt of 1857 the first war of Indian ___.',
      chk: 'fb_savarkar',
      n: 'Recall who used the second label, and the word he used.',
    }),
    sl('example', 'Worked example 3: sorting images by clues', {
      b: 'Three imagined images: *a print of 1858; a poster of the 1930s; a Punch cartoon.*',
      bl: [
        'Step 1 — Note the **maker and date**.',
        'Step 2 — Note the **hero** or subject.',
        'Step 3 — **Sort** by kind.',
      ],
      v: vEx3b,
      n: 'Sort three imagined images by their clues. A print of 1858 with rescuers and a figure of Justice is a British picture. A poster of the 1930s with the Rani as a heroine is a nationalist one. A Punch cartoon about mercy comments on British policy. The clues are the maker, the date and the hero.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSum2,
      n: 'To sum up. The rebels appealed across religions, looked to an earlier world and set up parallel administrations. The British put north India under martial law and retook Delhi and Lucknow. Images were made for audiences and shaped memory, and the names mutiny and first war of independence form a debate about how to see the revolt.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Treat a picture as a **representation**: who, for whom, when, why.',
        'Present the naming as a **debate**.',
        'Use **neutral language**; blame no community.',
        'Describe pictures in **your own words**.',
        'In source questions, say what the source **cannot** tell.',
      ],
      v: vTips2,
      n: 'Some tips. Treat a picture as a representation: ask who made it, for whom, when and why. Present the naming as a debate. Use neutral language and blame no community. Describe pictures in your own words. In source questions, always say what the source cannot tell us.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Rebels and the Raj — Notes',
  sections: [
    {
      h: '1. Meerut, Delhi and the spread',
      t: 1,
      b: 'On **10 May 1857**, sepoys at **Meerut** mutinied, after soldiers who had refused the new cartridges were punished. They went to Delhi, and on **11 May** reached the **Red Fort**, where the ageing Mughal emperor **Bahadur Shah Zafar** was asked to lead them and agreed. The revolt then spread to cantonments and towns across north India, among them Lucknow, Kanpur, Jhansi, Bareilly and Arrah.\n\n**Reports and rumours** shaped feeling. People said the cartridges of the new Enfield rifle were greased with the fat of cows and pigs, which would offend many Hindu and Muslim soldiers, and that bone dust was mixed into flour sold in markets. Chapatis were reported to be passed from village to village. Such rumours travelled because they matched fears about British intentions: reforms such as the abolition of sati and widow remarriage, English education, the work of missionaries, and annexations.',
      terms: [
        ['Sepoy', 'An Indian soldier in the army of the East India Company.'],
        ['Rumour', 'A report passed on without proof, which may still show what people feared.'],
      ],
      v: vSpark,
      vs: [vRumour, vTimeline],
    },
    {
      h: '2. The pattern of revolt, planning and leaders',
      t: 1,
      b: 'In many places a **common pattern** appeared. Sepoys took arms and the treasury and attacked government buildings (the jail, the telegraph office, the records room). The civilian population then joined in, and moneylenders and other rich people, seen as allies of the British, were attacked.\n\nRegiments sent **messages** to one another and **panchayats of sepoys** met at night. This points to some contact and discussion; historians weigh how far it amounts to a plan.\n\n**Leaders** came from many backgrounds: **Nana Sahib**, adopted son of Baji Rao II, the last Peshwa, at Kanpur; **Rani Lakshmi Bai** at Jhansi; **Kunwar Singh**, a zamindar of Arrah in Bihar; **Begum Hazrat Mahal** at Lucknow, who put forward her young son **Birjis Qadr** as nawab; **Shah Mal**, a peasant leader in the Baraut region of Uttar Pradesh; **Maulvi Ahmadullah Shah** of Faizabad; and **Gonoo**, a tribal cultivator of Singhbhum in Chotanagpur.',
      terms: [
        ['Common pattern', 'Sepoys act first on arms, treasury and government buildings; civilians then join.'],
        ['Panchayat of sepoys', 'A meeting of sepoys, held at night, to discuss what to do.'],
      ],
      v: vPattern,
      vs: [vPlan, vLeaders],
    },
    {
      h: '3. Awadh in revolt',
      t: 2,
      b: 'Awadh had been bound by the **Subsidiary Alliance**, introduced by **Lord Wellesley** in 1798. In **1856**, **Lord Dalhousie** annexed it on the ground of misgovernment, dethroned the nawab **Wajid Ali Shah** and exiled him to Calcutta. His court and army were dissolved, leaving many without a living. Dalhousie\'s **doctrine of lapse**, which annexed states whose rulers died without a natural heir (Jhansi, Satara and Nagpur are examples), is the wider setting; Awadh itself was taken on the other ground.\n\nThe **summary settlement of 1856** removed many **taluqdars**, large landholders with forts and armed retainers, from their lands. The British expected peasants to welcome this, but the revenue demand on peasants did not fall much, and many joined their taluqdars. Many sepoys of the Company\'s **Bengal army** came from Awadh villages, so the grievances of army and countryside were linked. Awadh saw some of the longest resistance, and Lucknow was finally retaken in March 1858.',
      terms: [
        ['Taluqdar', 'A large landholder of Awadh, with forts and armed retainers.'],
        ['Summary settlement', 'The revenue arrangement of 1856 that removed many taluqdars from their lands.'],
      ],
      v: vAwadh,
      vs: [vAwadhFlow, vTaluq, vSepoy, vLucknow],
    },
    {
      h: '4. What the rebels wanted',
      t: 3,
      b: 'Rebel **proclamations**, such as one issued in the name of Bahadur Shah and one from Azamgarh in August 1857, appealed to all sections of society regardless of religion. They called on Hindus and Muslims together to fight, and criticised British rule for its effects on zamindars, merchants, artisans, officials and religious leaders.\n\nThe rebels sought to **restore an earlier world**, looking to the authority of the Mughal emperor. Some set up **parallel administrations**: a court of administration in Delhi and the regime of Birjis Qadr in Lucknow. They attacked moneylenders and the rich, who were seen as allies of the British. The British tried to portray the revolt as a conflict between communities; in the main centres this largely failed. A proclamation shows what its authors hoped for, and it is read with other evidence.',
      terms: [
        ['Proclamation', 'A public notice issued in the name of a rebel authority.'],
        ['Parallel administration', 'A rebel system of government set up beside the British one.'],
      ],
      v: vProclaim,
      vs: [vUnity, vEarlier, vTargets],
    },
    {
      h: '5. Repression and the end of the revolt',
      t: 3,
      b: 'From **May and June 1857** the British passed laws that put north India under **martial law** and let military officers, and even ordinary Britons, try and punish Indians suspected of rebellion. **Reinforcements** came from Britain. Violence occurred on both sides, and it is stated here briefly and neutrally.\n\n**Delhi** was recaptured in late September 1857; Bahadur Shah was tried and exiled to **Rangoon**, where he died in 1862. **Lucknow** was finally retaken in March 1858, and the **Rani of Jhansi** died fighting in June 1858. The revolt was largely suppressed by the end of 1858 or 1859, and in 1858 British rule passed from the Company to the **Crown**.',
      terms: [
        ['Martial law', 'Rule by military authority, with trial and punishment by officers.'],
        ['The Crown', 'The British monarchy, which took over rule from the Company in 1858.'],
      ],
      v: vRepress,
      vs: [vEnd],
    },
    {
      h: '6. Images of the revolt',
      t: 4,
      b: 'Pictures were **made by people for audiences** and shaped memory; historians read them as **representations**. Many **British** pictures and cartoons showed the British as heroic rescuers and as avenging justice, and the rebels as violent. **Thomas Jones Barker** painted the relief of Lucknow (1859), with Colin Campbell, James Outram and Henry Havelock; **Joseph Noel Paton** painted In Memoriam (1858) about English women and children. Cartoons in the London magazine **Punch** commented on Governor-General **Canning\'s** call for moderation; critics nicknamed him **Clemency Canning**.\n\nIn the twentieth century **nationalist** images celebrated the Rani of Jhansi and others as heroes. **V. D. Savarkar** called the revolt the first war of Indian independence in 1909. The names **mutiny** and **first war of independence** each carry a view; historians treat them as a debate about naming.',
      terms: [
        ['Representation', 'A picture or account made by someone for an audience, and not a direct record of events.'],
        ['Clemency Canning', 'The nickname given by critics to Governor-General Canning for his call for moderation.'],
      ],
      v: vChain,
      vs: [vBrit, vPunch, vNational, vNaming],
    },
    {
      h: '7. Sources: reading visual representations',
      t: 5,
      b: 'To read a picture, ask five questions: **what** is shown, **how** (size, colour, position, what is small and what is central), **who** made it, **for whom** and **when**. Then ask what it cannot tell. A picture made by someone who was not there is evidence of what its makers and buyers imagined, and not a witness of the scene.\n\nUse pictures with other sources, such as diaries, letters and official records, which may show a different view. In SOYL practice, the pictures in source questions are **imagined** and described in words; the board paper will give its own.',
      terms: [
        ['Source', 'Any record from the past that a historian uses as evidence.'],
        ['Audience', 'The people for whom a picture or text was made.'],
      ],
      v: vEx2b,
      vs: [vEx3b],
    },
  ],
  tips: '**Common mistakes**\n- Writing the revolt as one planned conspiracy; say some contact, with causes in many places.\n- Naming leaders without their places and backgrounds.\n- Saying peasants welcomed the end of taluqdari; the demand did not fall much.\n- Confusing the Subsidiary Alliance (Wellesley, 1798) with the annexation of Awadh (Dalhousie, 1856).\n- Treating a painting or cartoon as a photograph of events.\n- Presenting mutiny or first war of independence as the only right label; it is a debate.\n- Blaming a community, or adding detail of violence; be neutral and brief.\n\n**How marks are usually awarded**\n- 1 mark: one correct option.\n- 2 marks: two points, or a point and a reason (30–50 words).\n- 3 marks: three distinct points (50–80 words).\n- 5 marks: five headed points (80–120 words); assess questions need more than one side and a judgement.\n- Source questions (4 marks): parts (a) and (b) one mark each, part (c) two marks with an internal choice.\n\n**Sources in SOYL practice** are imagined documents, imagined descriptions of imagined pictures, or SOYL summaries written for practice.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['Where and when did the revolt begin?', 'At Meerut, on 10 May 1857, when sepoys mutinied after soldiers who had refused the new cartridges were punished.', 'fact', 1],
  ['Who was asked to lead the rebels at Delhi?', 'The ageing Mughal emperor Bahadur Shah Zafar, at the Red Fort on 11 May 1857; he agreed.', 'fact', 1],
  ['Towns where the revolt spread', 'Lucknow, Kanpur, Jhansi, Bareilly, Arrah and others.', 'fact', 1],
  ['**Sepoy**', 'An Indian soldier in the army of the East India Company.', 'definition', 1],
  ['The rumours of 1857', 'New Enfield cartridges said to be greased with cow and pig fat; bone dust said to be in flour; chapatis passed from village to village.', 'fact', 1],
  ['Why did rumours spread?', 'They matched existing fears about British intentions: reforms, English education, missionaries and annexations.', 'concept', 1],
  ['The common pattern of revolt', 'Sepoys seized arms and the treasury and attacked government buildings; then civilians joined and moneylenders were attacked.', 'concept', 1],
  ['Evidence for some planning', 'Messages between regiments and night meetings of sepoy panchayats; it shows contact, and historians weigh how far it was a plan.', 'concept', 1],
  ['Nana Sahib', 'Adopted son of Baji Rao II, the last Peshwa; led at Kanpur.', 'fact', 1],
  ['Rani Lakshmi Bai', 'Led at Jhansi; died fighting in June 1858.', 'fact', 1],
  ['Kunwar Singh', 'A zamindar of Arrah in Bihar; a leader of the revolt.', 'fact', 1],
  ['Shah Mal and Gonoo', 'Shah Mal: peasant leader in the Baraut region. Gonoo: tribal cultivator of Singhbhum (Chotanagpur).', 'fact', 1],
  ['Begum Hazrat Mahal', 'Led at Lucknow and put forward her young son Birjis Qadr as nawab.', 'fact', 2],
  ['When and by whom was Awadh annexed?', 'In 1856, by Lord Dalhousie, on the ground of misgovernment; Nawab Wajid Ali Shah was exiled to Calcutta.', 'fact', 2],
  ['The Subsidiary Alliance and Awadh', 'Introduced by Lord Wellesley in 1798; Awadh had been bound by it.', 'fact', 2],
  ['**Doctrine of lapse**', 'Annexation of a state whose ruler died without a natural heir; examples are Jhansi, Satara and Nagpur.', 'definition', 2],
  ['**Taluqdar**', 'A large landholder of Awadh with forts and armed retainers.', 'definition', 2],
  ['The summary settlement of 1856', 'Removed many taluqdars from their lands.', 'fact', 2],
  ['Why did peasants join their taluqdars?', 'The revenue demand on peasants did not fall much, contrary to British expectation.', 'concept', 2],
  ['Why were sepoy and village grievances linked?', 'Many sepoys of the Bengal army came from Awadh villages.', 'concept', 2],
  ['What did rebel proclamations say?', 'They appealed to all sections regardless of religion, called on Hindus and Muslims together to fight, and attacked British rule for its effects on many groups.', 'fact', 3],
  ['What did the rebels seek?', 'To restore an earlier world under the Mughal emperor; some set up parallel administrations in Delhi and Lucknow.', 'concept', 3],
  ['Why were moneylenders attacked?', 'They and the rich were seen as allies of the British.', 'concept', 3],
  ['The laws of 1857', 'From May and June 1857, north India under martial law; military officers and ordinary Britons could try suspects.', 'fact', 3],
  ['The fall of the main centres', 'Delhi recaptured late September 1857; Lucknow finally retaken March 1858.', 'fact', 3],
  ['Bahadur Shah after 1857', 'Tried and exiled to Rangoon, where he died in 1862.', 'fact', 3],
  ['What changed in 1858?', 'British rule passed from the Company to the Crown.', 'fact', 3],
  ['British images of the revolt', 'The British as heroic rescuers and avenging justice, the rebels as violent; e.g. Barker (1859) and Paton\'s In Memoriam (1858).', 'fact', 4],
  ['**Clemency Canning**', 'Nickname given by critics to Governor-General Canning for his call for moderation, commented on in Punch cartoons.', 'definition', 4],
  ['Nationalist images', 'In the twentieth century they celebrated the Rani of Jhansi and others as heroes.', 'fact', 4],
  ['**Mutiny** and **first war of independence**', 'Two labels that carry different views; a debate about naming. Savarkar used the second in 1909.', 'definition', 4],
  ['How to read a picture', 'Ask what is shown, how, who made it, for whom and when; then ask what it cannot tell. It is a representation, not a photograph.', 'exam-tip', 5],
  ['Source questions: the four-mark plan', '(a) 1 mark recall; (b) 1 mark inference; (c) 2 marks, either or. Say what the source cannot tell.', 'exam-tip', 5],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-12-history-chapter-test-short',
  title: 'Chapter test (short) — Rebels and the Raj',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_pattern_town', 'm_unity_weaken', 'm_print_use', 'ar_awadh_sepoys'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and the 3-mark question in about 50–80 words.', items: ['s_chapati', 's_repress_law', 's3_image_read'] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer any ONE of the two questions in about 80–120 words.', items: [{ attempt: 1, keys: ['l_aims', 'l_images'] }] },
    { id: 'D', title: 'Section D — Source-based (4 marks)', instr: 'Read the source and answer all parts. Part (c) has an internal choice.', items: ['sb_diary'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-12-history-chapter-test-long',
  title: 'Chapter test (long) — Rebels and the Raj',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_rumour_test', 'm_planning_weaken', 'm_awadh_sepoy', 'm_lapse', 'm_moneylender', 'm_parallel', 'm_canning_cartoon', 'm_label_fit', 'ar_proclaim', 'ar_print'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and 3-mark questions in about 50–80 words. Questions 13 and 15 have an internal choice.', items: ['s_pattern', 's_awadh_why', { attempt: 1, keys: ['s_proclaim', 's_canning'] }, 's3_aims_unity', { attempt: 1, keys: ['s3_awadh_sepoys', 's3_naming'] }] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer question 16, and any ONE of questions 17 and 18, in about 80–120 words each.', items: ['l_spread', { attempt: 1, keys: ['l_repress', 'l_naming'] }] },
    { id: 'D', title: 'Section D — Source-based (4 marks each)', instr: 'Read each source and answer all parts. Part (c) of each has an internal choice.', items: ['sb_report', 'sb_print'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t05 of cbse-12-history-ch10 only (pattern of the rebellion and its spread; Awadh in revolt; what the rebels wanted and repression; images of the revolt; sources: visual representations)',
    originality: 'every source is an imagined document, an imagined description of an imagined picture, or a SOYL summary, labelled as such; nothing from any proclamation, report, letter, newspaper, cartoon, painting caption or catalogue is quoted, translated or closely paraphrased; no NCERT text, source box, picture, caption, map or exercise and no board or sample-paper item reused (D-036)',
    facts: 'Meerut 10 May 1857; Delhi 11 May; Bahadur Shah Zafar; Nana Sahib, Rani Lakshmi Bai, Kunwar Singh, Begum Hazrat Mahal and Birjis Qadr, Shah Mal, Maulvi Ahmadullah Shah, Gonoo; Subsidiary Alliance 1798 (Wellesley); Awadh annexed 1856 (Dalhousie), Wajid Ali Shah to Calcutta; taluqdars and the summary settlement; laws of May and June 1857; Delhi late September 1857; Lucknow March 1858; Rani died June 1858; Bahadur Shah to Rangoon, died 1862; Crown 1858; Barker 1859; Paton 1858; Clemency Canning; Savarkar 1909; no maps (OA-23)',
    neutrality: 'violence on both sides stated briefly and neutrally with no detail; no community blamed; rebel aims and British views presented as perceptions; mutiny versus first war of independence presented as a debate about naming',
    gate: 'schema, content lint (lintExemplar) and the deterministic verify checks run clean on this chapter',
  },
});
