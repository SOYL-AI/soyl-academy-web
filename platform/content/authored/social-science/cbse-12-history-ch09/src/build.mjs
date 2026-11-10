// Build CBSE 12 History ch09 Colonialism and the Countryside: Exploring Official Archives.
// Run from platform/:  npx tsx content/authored/social-science/cbse-12-history-ch09/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from '../../cbse-12-history-ch01/src/lib.mjs';

setUnit('cbse-12-history-ch09', 'social-science');
await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// Helpers: a table or a flow with an alt text built from its own content.
const tb = (headers, rows, caption) => table(headers, rows, `Table, ${caption}. ${rows.map((r) => r.join(': ')).join('; ')}`, caption);
const fl = (labels, caption) => flow('LR', labels, `Flow chart, ${caption}: ${labels.join(', then ')}`, caption);

// ---------------------------------------------------------------- SVG figures (no maps: places are named in words only)
const vTimeline = (() => {
  const s = new Svg(700, 340);
  const X = (y) => 250 + ((y - 1770) / 110) * 420;
  const AX = 296;
  for (let yr = 1780; yr <= 1880; yr += 20) s.line(X(yr), 8, X(yr), AX, { sw: 0.6, dash: true, color: 'muted' });
  s.arrow(244, AX, 690, AX, { sw: 1.8 });
  for (let yr = 1780; yr <= 1880; yr += 20) {
    s.line(X(yr), AX - 5, X(yr), AX + 5, { sw: 1.2 });
    s.text(X(yr), AX + 20, String(yr), { size: 11, muted: true });
  }
  const lane = (i, name) => {
    const y = 22 + i * 28;
    s.text(8, y, name, { anchor: 'start', size: 12 });
    return y;
  };
  const dot = (i, name, yr, label, side = 'right') => {
    const y = lane(i, name);
    s.dot(X(yr), y, 5, 'accent');
    if (side === 'right') s.text(X(yr) + 12, y, label, { anchor: 'start', size: 12 });
    else s.text(X(yr) - 12, y, label, { anchor: 'end', size: 12 });
  };
  const bar = (i, name, a, b, label, side = 'right') => {
    const y = lane(i, name);
    s.rect(X(a), y - 7, Math.max(X(b) - X(a), 5), 14, { rx: 3, fill: 'fill', color: 'accent', sw: 1.6 });
    if (side === 'right') s.text(X(b) + 10, y, label, { anchor: 'start', size: 12 });
    else s.text(X(a) - 10, y, label, { anchor: 'end', size: 12 });
  };
  dot(0, 'Permanent Settlement', 1793, '1793');
  dot(1, 'Burdwan estates auctioned', 1797, '1797');
  bar(2, 'Cleveland and the Paharias', 1780, 1789, '1780s');
  dot(3, 'Buchanan tours the hills', 1810.5, '1810 to 1811');
  dot(4, 'The Fifth Report', 1813, '1813');
  dot(5, 'Damin-i-Koh marked out', 1832, '1832');
  bar(6, 'The Santhal hul', 1855, 1856, '1855 to 1856');
  bar(7, 'American Civil War', 1861, 1865, '1861 to 1865', 'left');
  dot(8, 'Deccan riots begin at Supa', 1875, '1875', 'left');
  dot(9, 'Riots Commission report', 1878, '1878', 'left');
  s.text(350, 330, 'Years CE. Bars show spans and dots show single events.', { size: 12, muted: true });
  return s.visual('Timeline from 1770 to 1880 CE in ten rows: the Permanent Settlement in 1793; the auction of Burdwan estates in 1797; Cleveland and the Paharias in the 1780s; Buchanan tours the hills in 1810 and 1811; the Fifth Report in 1813; the Damin-i-Koh marked out in 1832; the Santhal hul in 1855 and 1856; the American Civil War from 1861 to 1865; the Deccan riots begin at Supa in 1875; and the Deccan Riots Commission report in 1878', 'The chapter in time');
})();

const vChain = (() => {
  const s = new Svg(700, 360);
  const box = (y, title, sub) => {
    s.rect(30, y, 300, 56, { sw: 2, color: 'accent', fill: 'fill' });
    s.text(180, y + 20, title, { bold: true, size: 14 });
    s.text(180, y + 41, sub, { size: 12 });
  };
  const ys = [14, 108, 202, 296];
  box(ys[0], 'The Company', 'Collector and treasury');
  box(ys[1], 'The zamindar', 'raja or taluqdar');
  box(ys[2], 'Rich peasant or ryot', 'for example a jotedar');
  box(ys[3], 'Sharecropper', 'adhiyar or bargadar');
  const note = (i, a, b) => {
    const y1 = ys[i] + 56, y2 = ys[i + 1];
    s.arrow(180, y2, 180, y1 + 4, { sw: 2 });
    s.text(352, (y1 + y2) / 2 - 8, a, { anchor: 'start', size: 13, bold: true });
    s.text(352, (y1 + y2) / 2 + 10, b, { anchor: 'start', size: 12 });
  };
  note(0, 'Revenue, fixed for ever', 'must arrive before sunset on the due date');
  note(1, 'Rent', 'collected from the ryots under him');
  note(2, 'Share of the crop', 'paid to the one whose land is worked');
  s.text(350, 350, 'The flow of payment, upward, under the settlement', { size: 12, muted: true });
  return s.visual('Diagram of four boxes stacked from top to bottom: the Company, the zamindar, a rich peasant or ryot such as a jotedar, and a sharecropper called an adhiyar or bargadar; arrows point upward between them marked revenue fixed for ever which must arrive before sunset, rent collected from the ryots, and share of the crop', 'Who paid whom under the settlement');
})();

const vBond = (() => {
  const s = new Svg(700, 330);
  const base = 270, k = 1.4;
  const bars = [[110, 100, 'At the start'], [300, 130, 'After 3 years'], [490, 169, 'After 6 years']];
  s.line(60, base, 660, base, { sw: 1.8 });
  bars.forEach(([x, v, lab]) => {
    const h = v * k;
    s.rect(x, base - h, 100, h, { rx: 4, fill: 'fill', color: 'accent', sw: 2 });
    s.text(x + 50, base - h - 14, `${v} rupees`, { bold: true, size: 14 });
    s.text(x + 50, base + 18, lab, { size: 13 });
  });
  s.text(350, 312, 'Interest at 10 per cent a year on each bond, nothing repaid, unpaid interest added at each new bond', { size: 12, muted: true });
  return s.visual('Bar chart of an imagined debt with three bars: 100 rupees at the start, 130 rupees after three years when a new bond adds the unpaid interest, and 169 rupees after six years when a second new bond adds the interest again', 'How a debt grows under new bonds');
})();

// ---------------------------------------------------------------- tables and flows: Part 1
const vRoute1 = fl(['The settlement in Bengal', 'Zamindars and jotedars', 'The Paharias', 'The Santhals'], 'Part 1 at a glance');
const vAims = tb(['Question', 'Answer'], [['Who introduced it', 'Lord Cornwallis, Governor-General, in 1793'], ['What was fixed', 'The revenue demand, in perpetuity'], ['Who paid', 'Zamindars: rajas and taluqdars, recognised as owners of land'], ['Aims', 'A regular revenue; investment in agriculture; a class of loyal landholders']], 'The Permanent Settlement');
const vCurb = tb(['Power of the zamindar', 'What the Company did'], [['Troops', 'Disbanded'], ['Customs duties', 'Abolished'], ['Courts', 'Placed under a Collector'], ['Land and revenue', 'Recognised as owners, but responsible for paying the revenue']], 'Zamindars under the new rules');
const vProblems = fl(['Demand set very high', 'Low prices in the 1790s', 'Same sum in every harvest', 'Payment due by sunset', 'Default and auction'], 'Why zamindars defaulted');
const vEx1 = tb(['Year of an imagined estate', 'Collected from ryots', 'Against a fixed demand of 500'], [['Year 1', '540', '40 above'], ['Year 2', '450', '50 below'], ['Year 3', '520', '20 above'], ['Total', '1,510', '10 above 1,500']], 'Reading a revenue ledger');
const vTricks = tb(['Device', 'How it helped'], [['Benami sale', 'A sale in a false name; the zamindar kept control'], ['Women of the family', 'Estates put in their names; the Company did not take women\'s property'], ['Buying back through agents', 'Agents bought at auction for the old owner'], ['Lathyals', 'Strongmen kept outside buyers away']], 'Zamindars\' answers to auctions');
const vJot = tb(['Feature', 'Detail'], [['Who', 'Rich peasants, notably in north Bengal, as in Dinajpur'], ['Land', 'Large areas, sometimes thousands of acres'], ['Labour', 'Sharecroppers called adhiyars or bargadars'], ['Power', 'Trade, moneylending and village influence; zamindars based in towns'], ['Relation', 'Often resisted zamindars; some bought estates at auction']], 'Jotedars');
const vPah = tb(['Feature', 'The Paharias of the Rajmahal hills'], [['Livelihood', 'Hunting; forest produce such as mahua flowers, silk cocoons and resin'], ['Farming', 'Shifting cultivation: patches cleared by burning, pulses and millets sown with a hoe'], ['The forest', 'Central to their identity'], ['Plains', 'Raids on settlements, a way of claiming a share and asserting control']], 'The Paharias');
const vPolicy = fl(['1770s: a policy of brutal extermination', '1780s: Cleveland\'s pacification', 'Allowances paid to chiefs', 'Chiefs lose standing; Paharias retreat'], 'The Company and the Paharias');
const vSan = tb(['Date', 'Event'], [['From the 1780s', 'Santhals arrive as settled cultivators, clearing forest with the Company\'s encouragement'], ['1832', 'A large area marked out as the Damin-i-Koh, the land of the Santhals'], ['After 1832', 'Settlements spread rapidly; the Paharias are pushed deeper into the hills']], 'The Santhals and the Damin-i-Koh');
const vHul = tb(['Question', 'Answer'], [['Grievances', 'Heavy state tax; moneylenders (dikus) and loss of land; zamindars\' claims on the Damin area'], ['Leaders', 'Sidhu and Kanhu Murmu'], ['Rising', 'The hul of 1855 to 1856, suppressed'], ['Afterwards', 'Santhal Pargana created in 1856 with special laws to conciliate the Santhals']], 'The hul');
const vEx2 = tb(['Step', 'An imagined officer\'s note on a hill people'], [['Who wrote', 'A Company officer judging land for revenue'], ['Claim', 'The people are idle because their plots lie unsown for a time'], ['Standard used', 'Regular, ploughed, revenue-paying fields'], ['Missing', 'The people\'s own reasons and what the forest gave them']], 'Reading an officer\'s view');
const vEx3 = tb(['Criterion', 'Paharias', 'Santhals'], [['Living', 'Hunting, forest produce, shifting cultivation', 'Settled cultivation after clearing forest'], ['Company', 'Pacification and allowances to chiefs', 'Encouraged to settle; Damin-i-Koh in 1832'], ['Result', 'Withdrew deeper into the hills', 'Spread, then met tax, moneylenders and zamindars']], 'Comparing two peoples on three criteria');
const vSum1 = tb(['Idea', 'Remember'], [['Settlement', 'Cornwallis, 1793; fixed in perpetuity; zamindars recognised'], ['Trouble', 'High demand, low prices, invariable sum, sunset law, auctions'], ['Answers', 'Benami sales, women\'s names, agents, lathyals'], ['Jotedars', 'Rich peasants, sharecroppers, local power'], ['Hills', 'Paharias: forest and shifting cultivation; Santhals: Damin-i-Koh and the hul']], 'Summary of Part 1');
const vTips1 = tb(['Mistake to avoid', 'Better'], [['Calling the demand revised with harvests', 'It was fixed and invariable'], ['Writing zamindars as cultivators', 'They were recognised owners paying the revenue'], ['Calling Paharia raids only plunder', 'Say officials saw it so; it was also a claim to a share'], ['Treating an officer\'s view as the people\'s', 'Say whose view it is']], 'Common mistakes in Part 1');

// ---------------------------------------------------------------- tables and flows: Part 2
const vRoute2 = fl(['Ryotwari in the Deccan', 'Cotton boom and bust', 'The riots of 1875', 'Reading official reports'], 'Part 2 at a glance');
const vRyot = tb(['Feature', 'Detail'], [['Settled with', 'The ryot, the cultivator himself, not a zamindar'], ['Assessment', 'Based on expected average income from different types of soil'], ['Revision', 'Every 30 years, at a high level'], ['Bad years', 'Many ryots fled or fell into debt in the depression of the 1830s']], 'The ryotwari system');
const vDebt = fl(['High assessment fixed for long periods', 'Bad years and low incomes', 'Ryots flee or borrow', 'Dependence on moneylenders grows'], 'Why ryots turned to moneylenders');
const vCotton = fl(['American Civil War, 1861 to 1865', 'British mills lose cotton from the USA', 'Demand for Indian cotton and prices rise', 'Cotton spreads in the Bombay Deccan'], 'The cotton boom');
const vCredit = fl(['Exporters advance money', 'Sahukars lend to ryots', 'Ryots expand cotton', 'Prices soar'], 'The chain of credit');
const vLimit = tb(['Step', 'What happened'], [['Law of 1859', 'A loan bond valid for only three years'], ['Every three years', 'The ryot signs a new bond'], ['Each new bond', 'Unpaid interest added to the principal'], ['Other tricks', 'No receipts; fictitious figures; produce taken at low prices']], 'The Limitation Law and the bonds');
const vBust = fl(['War ends in 1865', 'American cotton returns', 'Demand for Indian cotton falls', 'Credit dries up; ryots in debt'], 'The bust');
const vSupa = tb(['Question', 'Answer'], [['When and where', 'May 1875 at Supa, a large village in Poona district'], ['Who attacked whom', 'Ryots attacked sahukars: moneylenders and traders'], ['What they did', 'Demanded bonds and account books (bahi khatas) and burnt them'], ['Spread', 'Villages in Poona and Ahmednagar districts'], ['Response', 'Police posted in villages; many arrested']], 'The riots of 1875');
const vDRC = tb(['Question', 'Answer'], [['Set up by', 'The Government of Bombay'], ['Report', 'Presented to the British Parliament in 1878'], ['Material', 'Statements of ryots, sahukars and eyewitnesses; statistics on revenue rates, prices and interest'], ['Conclusion', 'Anger was against moneylenders and grain dealers'], ['Caution', 'Reluctant to accept the government\'s revenue demand as a cause']], 'The Deccan Riots Commission');
const vAsk = tb(['Question to ask', 'Why it matters'], [['Who wrote it?', 'Position shapes viewpoint'], ['For whom, and why?', 'Purpose shapes what is recorded'], ['What does it record?', 'The evidence it offers'], ['What does it leave out?', 'Silences and missing voices']], 'Questions for an official report');
const vFifth = tb(['Feature', 'Detail'], [['What', 'A report on the administration and activities of the Company in India'], ['To whom', 'Submitted to the British Parliament in 1813; the fifth of a series'], ['Size', 'About 1,002 pages, over 800 of them appendices'], ['Contents', 'Petitions, collectors\' reports, revenue statistics'], ['Caution', 'Written to criticise Company mismanagement; may exaggerate the decline of zamindari']], 'The Fifth Report');
const vBuch = tb(['Feature', 'Detail'], [['Who', 'Francis Buchanan, a physician touring the region for the Company'], ['When', '1810 to 1811'], ['What', 'Journals of his observations'], ['Viewpoint', 'Saw the land as resources to be developed; critical of forest dwellers\' ways']], 'Buchanan\'s journals');
const vEx2b = tb(['Step', 'An imagined district report'], [['Records', 'Revenue collected, tours of the Collector, villages quiet'], ['Missing', 'No petitions; no statements by ryots'], ['Danger', 'Treating silence as calm'], ['Next', 'Find petitions, registers or other records to test it']], 'Reading an official report for its silences');
const vEx3b = tb(['Mark', 'Point to write for a source question on a report'], [['Part a, 1 mark', 'Name the report or its author or date'], ['Part b, 1 mark', 'One inference, from the passage, about viewpoint or purpose'], ['Part c, 2 marks', 'Two checks with other evidence, each linked to the question']], 'Planning a source question');
const vSum2 = tb(['Idea', 'Remember'], [['Ryotwari', 'Settled with the ryot; assessed on soil; revised every 30 years; high'], ['Cotton', 'American Civil War, boom, bust in 1865'], ['Debt', 'Law of 1859; new bonds; interest added; tricks'], ['Riots', 'Supa, May 1875; bonds burnt; commission 1878'], ['Sources', 'Fifth Report, Buchanan, Commission: official views to be questioned']], 'Summary of Part 2');
const vTips2 = tb(['Mistake to avoid', 'Better'], [['Treating reports as neutral', 'Ask who wrote it, for whom and what it leaves out'], ['Saying the commission proved no revenue link', 'Say it was reluctant to accept it, and why that matters'], ['Giving simple interest only', 'Show interest added to principal at each bond'], ['Quoting a figure without a reading', 'Compute, then say what it cannot show']], 'Common mistakes in Part 2');

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Colonialism and the Countryside — Part 1: Bengal, the Paharias and the Santhals',
  goals: [
    'Explain the Permanent Settlement of 1793, its aims, its problems and how zamindars answered auctions',
    'Describe jotedars and why they became powerful in the villages of north Bengal',
    'Describe the Paharias and the Santhals from the evidence of their ways of life, and the Santhal hul',
    'Weigh an official\'s view of a people against the people\'s own way of life',
  ],
  slides: [
    sl('title', 'Colonialism and the Countryside', {
      b: 'Part 1: **Bengal**, the **Paharias** and the **Santhals**.',
      v: vRoute1,
      n: 'In this chapter we look at the Indian countryside under Company rule, through the records that officials left behind. In this part we begin in Bengal with the Permanent Settlement and its effects. Then we turn to two peoples of the Rajmahal hills, the Paharias and the Santhals, and how the Company dealt with them.',
    }),
    sl('concept', 'The Permanent Settlement', {
      b: 'Introduced by **Lord Cornwallis** in **1793**; the revenue demand was **fixed in perpetuity**.',
      v: vAims,
      n: 'In 1793 Lord Cornwallis, the Governor-General, introduced the Permanent Settlement in Bengal. The revenue demand was fixed for ever. The Company recognised zamindars, rajas and taluqdars, as owners of land responsible for paying the revenue. Its aims were a regular revenue, investment in agriculture, and a class of landholders loyal to the Company.',
    }),
    sl('diagram', 'Who paid whom', {
      v: vChain,
      n: 'This diagram shows the flow of payment. The zamindar paid the fixed revenue to the Company, and it had to arrive before sunset on the due date. Below the zamindar were rich peasants and ryots who paid rent, and below them sharecroppers, who paid a share of the crop to those whose land they worked.',
    }),
    sl('concept', 'Zamindars under the new rules', {
      b: 'Owners of land, yet their **powers were curtailed**.',
      v: vCurb,
      n: 'The Company gave zamindars ownership but took away much of their authority. Their troops were disbanded, their customs duties were abolished, and their courts were placed under a Collector. They were now landholders who owed the Company a fixed sum, and no longer rulers of their estates in the old way.',
    }),
    sl('concept', 'Why zamindars defaulted', {
      b: 'A **high** demand, **low prices**, an **invariable** sum and the **sunset law**.',
      v: vProblems,
      n: 'The demand was set very high. Prices of produce were low in the 1790s. The sum did not change whatever the harvest. And payment had to reach the Company by sunset on the due date, or the estate could be auctioned. Ryots also defaulted in bad years, so zamindars could not collect their rents. Many fell behind and lost estates.',
    }),
    sl('check', 'Quick check: sunset', {
      b: 'Why could a zamindar lose his estate even after collecting most of the rent?',
      chk: 'ar_sunset',
      n: 'Judge the assertion and the reason about the sunset rule.',
    }),
    sl('example', 'Worked example 1: reading a revenue ledger', {
      b: 'Imagined estate, fixed demand **500** a year; collections **540, 450, 520**.',
      bl: [
        'Step 1 — Compare each year with the **demand**.',
        'Step 2 — Find the **total** collected and compare.',
        'Step 3 — Note the **bad year**.',
        'Step 4 — Say what a total **hides**.',
      ],
      v: vEx1,
      n: 'Take an imagined estate with a fixed demand of five hundred. Collections are five forty, four fifty and five twenty. The total is fifteen hundred and ten, ten above the demand. Yet in year two the estate was fifty short. Because payment was due each year, a good total can hide a bad year that ruins an estate.',
    }),
    sl('concept', 'Auctions and the zamindars\' answers', {
      b: 'In **1797** much of the **Burdwan** raj\'s estates was auctioned; zamindars found ways to keep control.',
      v: vTricks,
      n: 'Estates were auctioned, and in 1797 a large part of the Burdwan raj was sold. Zamindars used tricks. They made benami sales in false names, put estates in the names of women of the family, whose property the Company did not take over, bought estates back through agents, and used lathyals, strongmen, to keep outside buyers away.',
    }),
    sl('concept', 'Jotedars', {
      b: 'Rich peasants who held **large areas** and often **overshadowed the zamindars**.',
      v: vJot,
      n: 'Jotedars were rich peasants, especially in north Bengal, as in Dinajpur. They held large areas, sometimes thousands of acres, controlled local trade and moneylending, and had sharecroppers cultivate their land. They lived in the villages, while zamindars were based in towns, so jotedars were often more powerful locally and resisted zamindars. Some even bought estates at auction.',
    }),
    sl('check', 'Quick check: the settlement', {
      b: 'Who introduced the Permanent Settlement, and in which year?',
      chk: 'm_ps_who',
      n: 'Recall the Governor-General and the year.',
    }),
    sl('diagram', 'The chapter in time', {
      v: vTimeline,
      n: 'This timeline sets the chapter in time. The Permanent Settlement came in 1793, and Burdwan estates were auctioned in 1797. The Fifth Report followed in 1813. Santhal events fall in 1832 and 1855 to 1856. The American Civil War ran from 1861 to 1865, the Deccan riots began in 1875, and the commission reported in 1878.',
    }),
    sl('concept', 'The Paharias', {
      b: 'People of the **Rajmahal hills** who lived by **forest produce** and **shifting cultivation**.',
      v: vPah,
      n: 'The Paharias lived around the Rajmahal hills, in present day Jharkhand. They hunted and gathered forest produce such as mahua flowers, silk cocoons and resin. They also practised shifting cultivation, clearing patches by burning and sowing pulses and millets with a hoe. The forest was central to their identity. They also raided plains settlements, as a way of claiming a share and asserting control.',
    }),
    sl('concept', 'The Company and the Paharias', {
      b: 'From **extermination** to **pacification**.',
      v: vPolicy,
      n: 'In the 1770s the Company followed a policy of brutal extermination. In the 1780s Augustus Cleveland, Collector of Bhagalpur, tried pacification instead. Chiefs were given annual allowances to ensure the good conduct of their men. Many chiefs who accepted lost standing among their own people, and the Paharias withdrew deeper into the hills.',
    }),
    sl('concept', 'The Santhals and the Damin-i-Koh', {
      b: 'Settled cultivators who cleared forest; **1832**: the **Damin-i-Koh**.',
      v: vSan,
      n: 'From about the 1780s the Santhals came into the region as settled cultivators, clearing forests with the encouragement of the Company. In 1832 a large area was marked out as the Damin i Koh, declared to be the land of the Santhals. Their settlements spread rapidly, and the Paharias were pushed deeper into the hills.',
    }),
    sl('concept', 'The hul', {
      b: 'Heavy tax, **dikus** and zamindars; the rising of **1855 to 1856**.',
      v: vHul,
      n: 'The Santhals found that the land they had cleared was heavily taxed. Moneylenders, whom they called dikus, charged high interest and took their land when they could not repay, and zamindars claimed control over the Damin area. In 1855 to 1856 Sidhu and Kanhu Murmu led the hul, which was suppressed. Afterwards the Santhal Pargana was created in 1856, with special laws.',
    }),
    sl('check', 'Quick check: names', {
      b: 'Match each name or term with the correct description.',
      chk: 'mt_hills',
      n: 'Link each name with its place in the story.',
    }),
    sl('example', 'Worked example 2: reading an officer\'s view', {
      b: 'Imagined note: *a Company officer calls a hill people idle because their plots lie unsown for a time.*',
      bl: [
        'Step 1 — **Who** wrote it?',
        'Step 2 — What **standard** does it use?',
        'Step 3 — What does it **leave out**?',
        'Step 4 — What could **test** it?',
      ],
      v: vEx2,
      n: 'Take an imagined officer who judges land for revenue and calls a hill people idle. His standard is ploughed, revenue paying fields. He leaves out the people own reasons and what the forest gave them. We must present this as the officer view, and test it with other evidence, such as the people own accounts.',
    }),
    sl('check', 'Quick check: order of events', {
      b: 'Arrange these events in chronological order, earliest first.',
      chk: 'ord_hills',
      n: 'Place the events of the hills in order.',
    }),
    sl('example', 'Worked example 3: comparing two peoples', {
      b: 'Compare the **Paharias** and the **Santhals** on three criteria.',
      bl: [
        'Step 1 — Choose **criteria**.',
        'Step 2 — Set the two **side by side**.',
        'Step 3 — Draw the **contrast**.',
        'Step 4 — Note the **source** of the evidence.',
      ],
      v: vEx3,
      n: 'To compare, choose criteria first: way of living, the Company policy, and the result. The Paharias lived by forest and shifting cultivation, and were pacified with allowances. The Santhals were settled cultivators, encouraged by the Company, yet they met tax, moneylenders and zamindars. Remember that most of this evidence comes from officials.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSum1,
      n: 'To sum up. Cornwallis fixed the revenue in 1793 and recognised zamindars, whose powers were curtailed. A high demand, low prices, an invariable sum and the sunset law led to auctions, and zamindars answered with tricks. Jotedars were powerful in villages. The Paharias lived by the forest, the Santhals settled to cultivate, and the hul followed in 1855.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Say the demand was **fixed**, not revised with harvests.',
        'Name **jotedars** and their sources of power.',
        'Describe the Paharias and Santhals from their **ways of life**.',
        'Present officials\' views **as the officials\' views**.',
        'In comparisons, use **criteria** and draw a contrast.',
      ],
      v: vTips1,
      n: 'Some tips. Say that the demand was fixed, and not revised with harvests. Name jotedars and their sources of power. Describe the Paharias and Santhals from their ways of life. Present officials views as the officials views. In comparisons, use criteria and then draw a contrast.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Colonialism and the Countryside — Part 2: The Deccan and Official Archives',
  goals: [
    'Explain the ryotwari system and why Deccan ryots fell into debt',
    'Explain the cotton boom, its end in 1865 and the use of bonds under the law of 1859',
    'Describe the riots of 1875 and the Deccan Riots Commission',
    'Read the Fifth Report, Buchanan\'s journals and the commission\'s report as official sources',
  ],
  slides: [
    sl('title', 'The Deccan and Official Archives', {
      b: 'Part 2: **ryotwari**, **cotton**, the **riots of 1875** and **official reports**.',
      v: vRoute2,
      n: 'In this part we move to the Bombay Deccan. We study the ryotwari system, the cotton boom and the debt that followed, and the riots of 1875. Then we ask how historians read the official reports of the period, the Fifth Report, Buchanan journals and the Deccan Riots Commission.',
    }),
    sl('concept', 'The ryotwari system', {
      b: 'Revenue settled with the **ryot**, assessed on soil, revised every **30 years**.',
      v: vRyot,
      n: 'In the 1820s the ryotwari system was introduced in the Bombay Deccan. Revenue was settled directly with the ryot, the cultivator, and not through a zamindar. It was based on the expected average income from different types of soil, and revised every thirty years, at a high level. Many ryots fled or fell into debt in the depression of the 1830s.',
    }),
    sl('concept', 'Why ryots turned to moneylenders', {
      b: 'A high assessment, bad years, **flight and debt**.',
      v: vDebt,
      n: 'An assessment fixed at a high level for long periods left ryots little to spare. In bad years, such as the depression of the 1830s, many fled or fell into debt. They turned to moneylenders, called sahukars, and so their dependence on moneylenders grew. This was the setting for the later troubles of the Deccan.',
    }),
    sl('concept', 'The cotton boom', {
      b: 'The **American Civil War**, 1861 to 1865, cut off cotton from the USA.',
      v: vCotton,
      n: 'British cotton interests, such as the Cotton Supply Association of 1857 and the Manchester Cotton Company of 1859, had already looked to India. When the American Civil War from 1861 to 1865 cut off raw cotton from the United States, demand for Indian cotton rose sharply, and cotton cultivation expanded in the Bombay Deccan.',
    }),
    sl('check', 'Quick check: cotton demand', {
      b: 'Why did demand for Deccan cotton rise in the early 1860s?',
      chk: 'm_cotton_demand',
      n: 'Recall the cause of the boom.',
    }),
    sl('concept', 'The chain of credit', {
      b: '**Exporters**, then **sahukars**, then **ryots**.',
      v: vCredit,
      n: 'Money moved down a chain. Exporters advanced money to sahukars, and sahukars lent to ryots so that they could grow more cotton. Prices soared and credit flowed easily. Ryots took loans on the expectation that the good prices would last. The chain would soon work in the opposite direction.',
    }),
    sl('concept', 'The Limitation Law and the bonds', {
      b: 'A bond valid for only **three years**; new bonds with **interest added**.',
      v: vLimit,
      n: 'The Limitation Law of 1859 said that a loan bond was valid for only three years. So moneylenders made ryots sign new bonds every three years, often adding the unpaid interest to the principal. They also used other tricks, such as not giving receipts, entering fictitious figures, and taking over produce at low prices.',
    }),
    sl('example', 'Worked example 1: how a bond grows', {
      b: 'Imagined debt: **100** rupees at **10 per cent** a year; nothing repaid.',
      bl: [
        'Step 1 — Interest for **three years** is 30.',
        'Step 2 — New bond: **130**.',
        'Step 3 — Interest on 130 for three years is **39**.',
        'Step 4 — Second bond: **169**.',
      ],
      v: vBond,
      n: 'Take an imagined debt of one hundred rupees at ten per cent a year, with nothing repaid. After three years the interest is thirty, so the new bond is for one hundred thirty. Interest on that for three years is thirty nine, so the next bond is one hundred sixty nine. Interest is now being charged on interest.',
    }),
    sl('concept', 'After 1865', {
      b: 'American cotton returned; **demand fell** and **credit dried up**.',
      v: vBust,
      n: 'When the American war ended in 1865, American cotton returned to British mills. Demand for Indian cotton fell, and credit dried up. Ryots who had borrowed during the boom were left with debts. Under the Limitation Law practice, those debts grew with each new bond, while the price of their crop no longer helped them.',
    }),
    sl('check', 'Quick check: the sequence', {
      b: 'Arrange these links in the order in which each led to the next.',
      chk: 'ord_cotton',
      n: 'Place the links from the war to the debts in order.',
    }),
    sl('concept', 'The riots of 1875', {
      b: 'May 1875, **Supa**: ryots attacked **sahukars** and burnt their **bonds**.',
      v: vSupa,
      n: 'The Deccan riots began in May 1875 at Supa, a large village in Poona district. Ryots attacked sahukars, moneylenders and traders, demanded their bonds and account books, called bahi khatas, and burnt them. The revolt spread to villages in Poona and Ahmednagar districts. Police were posted in villages, and many people were arrested.',
    }),
    sl('check', 'Quick check: where it began', {
      b: 'True or false? The riots began at Supa in Ahmednagar district.',
      chk: 'tf_supa',
      n: 'Recall where the riots began.',
    }),
    sl('concept', 'The Deccan Riots Commission', {
      b: 'Set up by the **Government of Bombay**; report to **Parliament**, **1878**.',
      v: vDRC,
      n: 'The Government of Bombay set up the Deccan Riots Commission to inquire into the riots. Its report was presented to the British Parliament in 1878. It collected statements from ryots, sahukars and eyewitnesses, and statistics on revenue rates, prices and interest. It concluded that the anger was against moneylenders and grain dealers, and was reluctant to accept the revenue demand as a cause.',
    }),
    sl('concept', 'Reading official reports', {
      b: 'Ask **who**, **for whom**, **what** and **what is missing**.',
      v: vAsk,
      n: 'Official reports are valuable, but they were written with particular purposes and viewpoints. Historians read them for what they record, and question what they leave out and how they explain events. So we ask four things: who wrote it, for whom and why, what it records, and what it leaves out.',
    }),
    sl('concept', 'The Fifth Report', {
      b: 'A report to **Parliament** in **1813**, with long **appendices**.',
      v: vFifth,
      n: 'The Fifth Report of 1813 was a report on the administration and activities of the East India Company in India, submitted to the British Parliament. It had about a thousand pages, over eight hundred of them appendices of petitions, collectors reports and revenue statistics. It shaped British understanding of rural Bengal, but it was written to criticise the Company, so it may exaggerate the decline of zamindari power.',
    }),
    sl('check', 'Quick check: the report', {
      b: 'What was the Fifth Report of 1813?',
      chk: 'm_fifth_what',
      n: 'Recall what the Fifth Report was.',
    }),
    sl('concept', 'Buchanan\'s journals', {
      b: 'A physician touring for the Company, **1810 to 1811**.',
      v: vBuch,
      n: 'Francis Buchanan was a physician who toured the region for the Company in 1810 to 1811 and recorded his observations in journals. He saw the land through the Company eyes, as resources to be developed, and was critical of the ways of forest dwellers. His journals are useful evidence of what a Company observer saw and judged.',
    }),
    sl('example', 'Worked example 2: reading for silences', {
      b: 'Imagined report: *revenue collected, tours made, villages quiet; no petitions.*',
      bl: [
        'Step 1 — List what it **records**.',
        'Step 2 — List what is **missing**.',
        'Step 3 — Name the **danger**.',
        'Step 4 — Find **other records**.',
      ],
      v: vEx2b,
      n: 'Take an imagined district report that lists revenue collected, tours of the Collector and quiet villages. It includes no petitions and no statements by ryots. The danger is to treat that silence as calm. A careful historian looks for petitions, registers or other records that could test what the report says.',
    }),
    sl('example', 'Worked example 3: planning a source question', {
      b: 'A four-mark question on a **report**: parts a, b and c.',
      bl: [
        'Step 1 — Part a: **name** it.',
        'Step 2 — Part b: one **inference**.',
        'Step 3 — Part c: **two checks**.',
        'Step 4 — Tie each to the **question**.',
      ],
      v: vEx3b,
      n: 'In a four mark source question, part a, one mark, asks you to name the report, author or date. Part b, one mark, asks for an inference about viewpoint or purpose, not just a line copied. Part c, two marks, asks for two checks with other evidence. Tie each point back to the question asked.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSum2,
      n: 'To sum up. The ryotwari system settled revenue with ryots at a high assessment. The American Civil War brought a cotton boom, and the end of the war in 1865 brought a bust. The Limitation Law led to new bonds with interest added. Ryots burnt bonds at Supa in 1875, and the commission reported in 1878. Official reports must be read with care.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Show **interest added to principal** at each new bond.',
        'Say the commission was **reluctant** to accept the revenue demand as a cause.',
        'Ask **who wrote it** and **what it leaves out**.',
        'In data questions, **compute**, then say what the figure **cannot show**.',
        'In part b of a source question, make an **inference**.',
      ],
      v: vTips2,
      n: 'Some tips. Show interest added to principal at each new bond. Say that the commission was reluctant to accept the revenue demand as a cause. Ask who wrote a report and what it leaves out. In data questions, compute and then say what the figure cannot show. In part b of a source question, make an inference.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Colonialism and the Countryside — Notes',
  sections: [
    {
      h: '1. The Permanent Settlement of 1793',
      t: 1,
      b: 'In **1793** **Lord Cornwallis**, the Governor-General, introduced the **Permanent Settlement** in Bengal. The revenue demand was fixed **in perpetuity**. The Company recognised **zamindars** (rajas and taluqdars) as owners of land and responsible for paying the revenue. Its aims were a **regular revenue**, **investment in agriculture** and a class of **loyal landholders**.\n\nThe Company also curtailed the zamindars\' powers: their **troops were disbanded**, their **customs duties were abolished** and their **courts were placed under a Collector**. Zamindars were now landholders who owed a fixed sum, not local rulers in the old way.',
      terms: [
        ['Permanent Settlement', 'The arrangement of 1793 that fixed the revenue demand of Bengal in perpetuity.'],
        ['Zamindar', 'A landholder (raja or taluqdar) recognised as owner and responsible for paying the revenue.'],
      ],
      v: vAims,
      vs: [vChain, vCurb],
    },
    {
      h: '2. Auctions, tricks and the jotedars',
      t: 1,
      b: 'Many zamindars **defaulted**. The demand was fixed **very high**; **prices of produce were low** in the 1790s; the sum was **invariable**, the same in every harvest; and the **sunset law** required payment to reach the Company by sunset on the due date, or the estate could be **auctioned**. Ryots also defaulted in bad years, so zamindars could not collect rents. In **1797** a large part of the **Burdwan** raj\'s estates was auctioned.\n\nZamindars answered with tricks: **benami** (fictitious) sales; putting estates in the names of **women of the family**, since the Company did not take over women\'s property; **buying back through agents**; and **lathyals** (strongmen) to keep outside buyers away.\n\n**Jotedars** were rich peasants, especially in north Bengal, as in **Dinajpur**. They held large areas, sometimes thousands of acres, controlled local trade and moneylending, and had land cultivated by sharecroppers (**adhiyars** or **bargadars**). They lived in villages, while zamindars were based in towns, so jotedars were often more powerful locally and resisted zamindars. Some bought estates at auction.',
      terms: [
        ['Benami sale', 'A sale in a false name, used to keep an estate in the family.'],
        ['Jotedar', 'A rich peasant of north Bengal with large holdings, trade, moneylending and sharecroppers.'],
      ],
      v: vProblems,
      vs: [vTricks, vJot, vEx1],
    },
    {
      h: '3. The Paharias',
      t: 2,
      b: 'The **Paharias** lived around the **Rajmahal hills**, in present-day Jharkhand. They **hunted**, gathered **forest produce** (mahua flowers, silk cocoons, resin) and practised **shifting cultivation**, clearing patches by burning and sowing pulses and millets with a hoe. The forest was central to their identity. They also raided plains settlements, as a way of claiming a share of the produce and asserting control.\n\nIn the **1770s** the Company followed a policy of brutal extermination. In the **1780s** **Augustus Cleveland**, Collector of Bhagalpur, introduced **pacification**: chiefs were given annual allowances to ensure the good conduct of their men. Many chiefs who accepted lost standing among their people, and the Paharias withdrew deeper into the hills.\n\n**Francis Buchanan**, a physician, toured the region for the Company in 1810–11 and recorded his observations in journals. He saw the land through the Company\'s eyes, as resources to be developed, and was critical of the forest dwellers\' ways. Officials\' views of the Paharias are the officials\' views, to be set beside evidence of their own way of life.',
      terms: [
        ['Shifting cultivation', 'Farming by clearing and burning a patch, sowing it for a time and then moving on.'],
        ['Pacification', 'A policy of winning peace by allowances and agreements rather than force.'],
      ],
      v: vPah,
      vs: [vPolicy, vEx2],
    },
    {
      h: '4. The Santhals and the hul',
      t: 2,
      b: 'From about the **1780s** the **Santhals** came into the region as **settled cultivators**, clearing forest with the Company\'s encouragement. In **1832** a large area was marked out as the **Damin-i-Koh**, declared the land of the Santhals. Their settlements spread rapidly, and the Paharias were pushed deeper into the hills.\n\nThe Santhals found that the land they had cleared was **heavily taxed**; **moneylenders** (**dikus**) charged high interest and took their land when they could not repay; and **zamindars** claimed control over the Damin area. In **1855–56** the Santhals rose in the **hul**, led by **Sidhu and Kanhu Murmu**. The rising was suppressed, and in **1856** the **Santhal Pargana** was created, with special laws meant to conciliate them.',
      terms: [
        ['Damin-i-Koh', 'The area marked out in 1832 as the land of the Santhals.'],
        ['Hul', 'The Santhal rising of 1855–56 led by Sidhu and Kanhu.'],
      ],
      v: vSan,
      vs: [vHul, vEx3, vTimeline],
    },
    {
      h: '5. Ryotwari, cotton and the cycle of debt',
      t: 3,
      b: 'The **ryotwari system** was introduced in the Bombay Deccan in the **1820s**. Revenue was settled directly with the **ryot**, not through a zamindar. The assessment was based on the **expected average income** from different types of soil and was **revised every 30 years**, at a high level. Many ryots fled or fell into debt in the depression of the **1830s**.\n\nBritish cotton interests, the **Cotton Supply Association** (1857) and the **Manchester Cotton Company** (1859), had already sought supplies from India. The **American Civil War** (1861–65) cut off raw cotton from the USA, demand for Indian cotton soared and cotton cultivation expanded in the Deccan. Exporters advanced money to **sahukars**, who lent to ryots. When the war ended in **1865**, American cotton returned, demand fell and credit dried up, leaving ryots in debt.\n\nThe **Limitation Law of 1859** gave loan bonds validity for only **three years**, so moneylenders made ryots sign **new bonds** every three years, often adding unpaid interest to the principal; they also gave no receipts, entered fictitious figures and took over produce at low prices.',
      terms: [
        ['Ryotwari system', 'Revenue settled directly with the ryot, assessed on soil and revised every 30 years.'],
        ['Sahukar', 'A moneylender and trader.'],
      ],
      v: vRyot,
      vs: [vDebt, vCotton, vCredit, vLimit, vBond],
    },
    {
      h: '6. The riots of 1875 and the Deccan Riots Commission',
      t: 3,
      b: 'The **Deccan riots** began in **May 1875** at **Supa**, a large village in Poona district. Ryots attacked sahukars, demanded their **bonds** and **account books** (bahi khatas) and **burnt** them. The revolt spread to villages in Poona and Ahmednagar districts. Police were posted in villages and many people were arrested.\n\nThe **Government of Bombay** set up the **Deccan Riots Commission**. Its report was presented to the British Parliament in **1878**. It collected statements from ryots, sahukars and eyewitnesses and statistics on revenue rates, prices and interest. It concluded that the anger was against **moneylenders and grain dealers**, and it was reluctant to accept that the government\'s revenue demand was a cause. Historians note that such a report must be read with care on that point.',
      terms: [
        ['Bahi khata', 'A sahukar\'s account book.'],
        ['Deccan Riots Commission', 'The inquiry set up by the Government of Bombay, whose report went to Parliament in 1878.'],
      ],
      v: vSupa,
      vs: [vBust, vDRC],
    },
    {
      h: '7. Official archives as sources',
      t: 4,
      b: 'The **Fifth Report** (1813) was a report on the administration and activities of the East India Company in India, submitted to the **British Parliament**; it was the fifth of a series. It had about **1,002 pages**, over **800** of them appendices of petitions, collectors\' reports and revenue statistics. It shaped British understanding of rural Bengal, but historians note that it was written to **criticise the Company\'s mismanagement**, so it may have exaggerated the decline of zamindari power.\n\n**Buchanan\'s journals** (1810–11) and the **Deccan Riots Commission report** (1878) are also official sources. Each was written with a particular **purpose** and **viewpoint**. Historians read them for what they record and question **what they leave out** and **how they explain events**, testing them against other evidence such as petitions, registers and the people\'s own accounts.',
      terms: [
        ['Fifth Report', 'The 1813 report on the Company\'s administration in India, submitted to the British Parliament.'],
        ['Official archive', 'The records kept by a government; useful, but made for the government\'s own purposes.'],
      ],
      v: vFifth,
      vs: [vBuch, vAsk],
    },
  ],
  tips: '**Common mistakes**\n- Writing that the Settlement\'s demand was revised with harvests; it was fixed.\n- Calling zamindars cultivators; they were recognised owners paying the revenue.\n- Describing Paharia raids only as plunder; say officials saw it so, and that it was also a claim to a share.\n- Presenting an officer\'s view of a people as the truth about them.\n- Counting simple interest when bonds added unpaid interest to the principal.\n- Saying the Commission proved the revenue demand had no part; it was reluctant to accept it.\n- Treating official reports as neutral and complete.\n\n**How marks are usually awarded**\n- 1 mark: one correct option.\n- 2 marks: two points, or a point and a reason (30–50 words).\n- 3 marks: three distinct points (50–80 words).\n- 5 marks: five headed points (80–120 words); assess questions need more than one side and a judgement.\n- Source questions (4 marks): parts (a) and (b) one mark each, part (c) two marks with an internal choice.\n\n**Sources in SOYL practice** are imagined documents or SOYL summaries written for practice; the board paper will give its own.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['Who introduced the Permanent Settlement, and when?', 'Lord Cornwallis, Governor-General, in Bengal in 1793; the revenue demand was fixed in perpetuity.', 'fact', 1],
  ['Whom did the Company recognise under the settlement?', 'Zamindars, rajas and taluqdars, as owners of land responsible for paying the revenue.', 'fact', 1],
  ['Aims of the Permanent Settlement', 'A regular revenue; investment in agriculture; a class of loyal landholders.', 'concept', 1],
  ['How were zamindars\' powers curtailed?', 'Their troops were disbanded, customs duties abolished and courts placed under a Collector.', 'fact', 1],
  ['Why did many zamindars default?', 'High demand, low prices in the 1790s, an invariable sum and the sunset law; ryots also defaulted.', 'concept', 1],
  ['**Sunset law**', 'Payment had to reach the Company by sunset on the due date, or the estate could be auctioned.', 'definition', 1],
  ['What happened to Burdwan in 1797?', 'A large part of the Burdwan raj\'s estates was auctioned.', 'fact', 1],
  ['**Benami sale**', 'A sale in a false name, used by zamindars to keep estates in the family.', 'definition', 1],
  ['Other answers to auctions', 'Estates in women\'s names (their property was not taken over), buying back through agents, lathyals to keep buyers away.', 'concept', 1],
  ['**Jotedar**', 'A rich peasant of north Bengal, as in Dinajpur, with large holdings, trade, moneylending and sharecroppers.', 'definition', 1],
  ['Why were jotedars powerful?', 'They lived in villages with large holdings and controlled trade and moneylending; zamindars were based in towns.', 'concept', 1],
  ['What was the Fifth Report?', 'A report on the Company\'s administration and activities in India submitted to the British Parliament in 1813, the fifth of a series.', 'fact', 4],
  ['Size and contents of the Fifth Report', 'About 1,002 pages, over 800 of appendices: petitions, collectors\' reports, revenue statistics.', 'fact', 4],
  ['A caution on the Fifth Report', 'It was written to criticise the Company\'s mismanagement, so it may have exaggerated the decline of zamindari power.', 'exam-tip', 4],
  ['Where and how did the Paharias live?', 'Around the Rajmahal hills; hunting, forest produce and shifting cultivation with a hoe.', 'fact', 2],
  ['Company policy towards the Paharias', 'Extermination in the 1770s; Cleveland\'s pacification with chiefs\' allowances in the 1780s.', 'fact', 2],
  ['Who was Francis Buchanan?', 'A physician who toured the region for the Company in 1810–11; he saw the land as resources to be developed.', 'fact', 2],
  ['Who were the Santhals?', 'Settled cultivators who came from about the 1780s, clearing forest with the Company\'s encouragement.', 'fact', 2],
  ['**Damin-i-Koh**', 'The area marked out in 1832 as the land of the Santhals.', 'definition', 2],
  ['Santhal grievances', 'Heavy state tax; moneylenders (dikus) taking land; zamindars\' claims on the Damin area.', 'concept', 2],
  ['The hul', 'The Santhal rising of 1855–56 led by Sidhu and Kanhu; suppressed; the Santhal Pargana created in 1856.', 'fact', 2],
  ['A rule for describing peoples in official records', 'Present officials\' views as the officials\' views and use the evidence of the people\'s way of life.', 'exam-tip', 2],
  ['**Ryotwari system**', 'Revenue settled directly with the ryot; assessed on soil; revised every 30 years; high.', 'definition', 3],
  ['When did the cotton boom come?', 'During the American Civil War, 1861 to 1865, which cut off raw cotton from the USA.', 'fact', 3],
  ['The chain of credit in the boom', 'Exporters advanced money to sahukars, who lent to ryots.', 'concept', 3],
  ['What happened after 1865?', 'American cotton returned, demand for Indian cotton fell, credit dried up and ryots were in debt.', 'concept', 3],
  ['**Limitation Law of 1859**', 'A loan bond was valid for only three years, so moneylenders had new bonds signed.', 'definition', 3],
  ['Moneylenders\' tricks', 'Unpaid interest added to principal; no receipts; fictitious figures; produce taken at low prices.', 'concept', 3],
  ['Where did the Deccan riots begin?', 'May 1875 at Supa, a large village in Poona district; bonds and bahi khatas burnt; spread to Poona and Ahmednagar.', 'fact', 3],
  ['The Deccan Riots Commission', 'Set up by the Government of Bombay; report to Parliament in 1878; found anger against moneylenders and grain dealers.', 'fact', 3],
  ['A caution on the Commission', 'It was reluctant to accept the government\'s revenue demand as a cause.', 'exam-tip', 4],
  ['Four questions for an official report', 'Who wrote it? For whom and why? What does it record? What does it leave out?', 'exam-tip', 4],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-12-history-chapter-test-short',
  title: 'Chapter test (short) — Colonialism and the Countryside',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_ps_weaken', 'm_paharia_raid', 'm_riot_pattern', 'ar_copy'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and the 3-mark question in about 50–80 words.', items: ['s_ryot_default', 's_two_views', 's3_bond_calc'] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer any ONE of the two questions in about 80–120 words.', items: [{ attempt: 1, keys: ['l_ps_assess', 'l_cotton_assess'] }] },
    { id: 'D', title: 'Section D — Source-based (4 marks)', instr: 'Read the source and answer all parts. Part (c) has an internal choice.', items: ['sb_journal'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-12-history-chapter-test-long',
  title: 'Chapter test (long) — Colonialism and the Countryside',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_date_clue', 'm_jot_weaken', 'm_group_table', 'm_santhal_date', 'm_cotton_weaken', 'm_bond_rate', 'm_drc_stat', 'm_conflict_views', 'ar_curtail', 'ar_cotton'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and 3-mark questions in about 50–80 words. Questions 13 and 15 have an internal choice.', items: ['s_curtail', 's_paharia_life', { attempt: 1, keys: ['s_bond_trick', 's_report_questions'] }, 's3_santhal_grievances', { attempt: 1, keys: ['s3_cotton_cycle', 's3_archive_plan'] }] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer question 16, and any ONE of questions 17 and 18, in about 80–120 words each.', items: ['l_ps_describe', { attempt: 1, keys: ['l_compare', 'l_deccan_causes'] }] },
    { id: 'D', title: 'Section D — Source-based (4 marks each)', instr: 'Read each source and answer all parts. Part (c) of each has an internal choice.', items: ['sb_collector', 'sb_commission'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t04 of cbse-12-history-ch09 only (Bengal and the Permanent Settlement; the Paharias and the Santhals; the Deccan riots and cotton; sources: official reports)',
    originality: 'every source is an imagined document or a SOYL summary, labelled as such; nothing from the Fifth Report, Buchanan\'s journals, the Deccan Riots Commission report or any document is quoted, translated or closely paraphrased; no NCERT text, source box, table, caption, map or exercise and no board or sample-paper item reused (D-036)',
    facts: 'Permanent Settlement 1793 by Cornwallis; sunset law; Burdwan 1797; jotedars of north Bengal; Fifth Report 1813 about 1,002 pages with over 800 of appendices; Paharias of the Rajmahal hills; Cleveland in the 1780s; Buchanan 1810–11; Santhals from the 1780s; Damin-i-Koh 1832; hul 1855–56; Santhal Pargana 1856; ryotwari in the 1820s, 30-year revision; Cotton Supply Association 1857, Manchester Cotton Company 1859; Civil War 1861–65; Limitation Law 1859; Supa May 1875; Commission report 1878; no maps (OA-23)',
    neutrality: 'the Paharias and Santhals described from the evidence of their ways of life; officials\' views presented as the officials\' views; violence described briefly and factually',
    gate: 'schema, content lint (lintExemplar) and the deterministic verify checks run clean on this chapter',
  },
});
