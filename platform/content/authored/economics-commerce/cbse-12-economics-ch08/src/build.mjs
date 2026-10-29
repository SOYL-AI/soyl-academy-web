// Build CBSE 12 Economics ch08 Liberalisation, Privatisation and Globalisation: An Appraisal. Run from platform/:
//   npx tsx content/authored/economics-commerce/cbse-12-economics-ch08/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from './lib.mjs';

setUnit('cbse-12-economics-ch08', 'economics-commerce');
const F8 = await import('./questions.mjs');
const { inr, RES, COVER, DUTY, LANDED_BEFORE, LANDED_AFTER, LANDED_FALL, DIS, DIS_SOLD, DIS_RECEIPT, DIS_LEFT, GST, GST_MAKER, GST_TRADER_OUT, GST_TRADER_PAY, GST_TOTAL, CASC_BASE, CASC_TRADER, CASC_TOTAL } = F8;
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- deck figures (computed, never typed)
// Deck 1 worked example: an imagined country Vindhyapur with reserves and a monthly import bill (billion US dollars).
const WE1 = { reserves: 1.5, monthly: 3 };
const WE1_COVER = WE1.reserves / WE1.monthly; // 0.5 month, about two weeks
const WE1_WEEKS = Math.round(WE1_COVER * 4.3 * 10) / 10; // about 2.2 weeks
// Deck 2 worked example: imagined economy Sonbhadra (₹ thousand crore, constant prices).
const SB = { y1: { agri: 40, ind: 50, serv: 60 }, y2: { agri: 41, ind: 55, serv: 72 } };
const sum = (y) => y.agri + y.ind + y.serv;
const pct = (a, b) => Math.round((1000 * a) / b) / 10;
const SB1 = sum(SB.y1), SB2 = sum(SB.y2);
const SBg = { agri: pct(SB.y2.agri - SB.y1.agri, SB.y1.agri), ind: pct(SB.y2.ind - SB.y1.ind, SB.y1.ind), serv: pct(SB.y2.serv - SB.y1.serv, SB.y1.serv), all: pct(SB2 - SB1, SB1) };
const SBs = { y1: pct(SB.y1.serv, SB1), y2: pct(SB.y2.serv, SB2) };
if (WE1_COVER !== 0.5 || SB1 !== 150 || SB2 !== 168 || SBg.agri !== 2.5 || SBg.ind !== 10 || SBg.serv !== 20 || SBg.all !== 12 || SBs.y1 !== 40 || SBs.y2 !== 42.9) throw new Error('deck figure check failed');
if (COVER !== 2 || LANDED_FALL !== 150 || DIS_RECEIPT !== 400 || GST_TRADER_PAY !== 30 || CASC_TOTAL !== 240) throw new Error('bank figure check failed');

// ---------------------------------------------------------------- visuals
const vRoute1 = flow('LR', ['Before 1991: controls', 'The 1991 crisis', 'New Economic Policy', 'Liberalisation', 'Privatisation', 'Globalisation'], 'Route map of Part 1: controls before 1991, the 1991 crisis, the New Economic Policy, liberalisation, privatisation and globalisation', 'Part 1 at a glance');
const vRoute2 = flow('LR', ['Yardsticks of appraisal', 'Growth and the external sector', 'Agriculture, industry, jobs', 'Fiscal policy', 'Demonetisation', 'GST'], 'Route map of Part 2: yardsticks of appraisal, growth and the external sector, agriculture, industry and jobs, fiscal policy, demonetisation and GST', 'Part 2 at a glance');
const vBefore = table(
  ['Area', 'Typical rule before 1991'],
  [
    ['Starting or expanding a factory', 'Government licence needed'],
    ['Many large industries', 'Reserved for the public sector'],
    ['Imports', 'Quotas and very high tariffs'],
    ['Foreign investment', 'Tightly limited'],
    ['Interest rates, bank lending', 'Largely set by the RBI'],
  ],
  'Table of controls before 1991: licences to start or expand factories, many industries reserved for the public sector, import quotas and high tariffs, tight limits on foreign investment, and interest rates largely set by the RBI',
  'The controlled economy that the reforms set out to change.',
);
const vCrisis = flow('TB', [
  'Government spends more than it earns for years',
  'Borrowing and interest payments rise',
  'Imports grow faster than exports; oil prices jump',
  'Foreign-exchange reserves fall to about two weeks of imports',
  'Lenders hold back: India turns to the IMF and World Bank',
], 'Flow of the 1991 crisis: years of government spending above revenue, rising borrowing and interest, imports growing faster than exports with an oil price jump, reserves falling to about two weeks of imports, and India turning to the IMF and World Bank', 'How the crisis built up');
const vNep = flow('LR', ['Loans with conditions (1991)', 'New Economic Policy', 'Stabilisation: short-term', 'Structural reform: long-term'], 'Flow: loans with conditions in 1991 led to the New Economic Policy, which had short-term stabilisation measures and long-term structural reform measures', 'Two kinds of measures', [
  { from: 'n1', to: 'n2' }, { from: 'n2', to: 'n3' }, { from: 'n2', to: 'n4' },
]);
const vStab = table(
  ['', 'Stabilisation measures', 'Structural reform measures'],
  [
    ['Time frame', 'Short term', 'Long term'],
    ['Aim', 'Rebuild reserves, correct the BoP, control inflation', 'Raise efficiency and international competitiveness'],
    ['Nature', 'Fixes the immediate emergency', 'Changes rules and institutions'],
  ],
  'Table comparing stabilisation measures, which are short term and aim to rebuild reserves, correct the balance of payments and control inflation, with structural reform measures, which are long term and aim to raise efficiency and competitiveness',
);
const vCover = (() => {
  const s = new Svg(560, 290);
  const ch = s.chart({ x0: 0, x1: 3, y0: 0, y1: 3.5, left: 70, top: 30, width: 430, height: 200, xLabel: '', yLabel: 'Billion US dollars' });
  const bars = [[1, WE1.reserves, 'Reserves', 'accent'], [2, WE1.monthly, 'Imports per month', 'fill']];
  for (const [x, v, name, fill] of bars) {
    const x0 = ch.X(x - 0.3), x1 = ch.X(x + 0.3);
    s.rect(x0, ch.Y(v), x1 - x0, ch.Y(0) - ch.Y(v), { fill, color: 'accent', sw: 1.5, rx: 2 });
    ch.label([x, v], String(v), { dy: -12, size: 13, bold: true });
    ch.xTick(x, name);
  }
  ch.yTick(1, '1').yTick(2, '2').yTick(3, '3');
  return s.visual(`Bar chart for the imagined country Vindhyapur: reserves of ${WE1.reserves} billion US dollars against an import bill of ${WE1.monthly} billion US dollars a month, so reserves cover only half a month of imports`, 'Imagined figures: reserves are half of one month\'s imports.');
})();
const vIndustrial = table(
  ['Industrial-sector reform', 'What changed'],
  [
    ['Delicensing', 'Licence kept only for a short list: alcohol, cigarettes, hazardous chemicals, industrial explosives and a few others'],
    ['Public-sector reservation', 'Only a few strategic areas left, such as atomic energy and railway operations'],
    ['Small-scale reservation', 'Many goods de-reserved'],
    ['Prices and capacity', 'Decided more by the market'],
  ],
  'Table of industrial reforms: licences kept only for a short list, only a few strategic areas left reserved for the public sector, many goods de-reserved from small-scale industry, and prices and capacity decided more by the market',
);
const vFinance = flow('LR', ['RBI as regulator: sets rates, directs lending', 'Reforms', 'RBI as facilitator: sets rules, markets decide more', 'Private and foreign banks, FIIs enter'], 'Flow: the RBI moved from regulator, setting rates and directing lending, to facilitator, setting rules while markets decide more, with private and foreign banks and foreign institutional investors entering', 'Financial-sector reform');
const vTax = table(
  ['Tax reform', 'Idea behind it'],
  [
    ['Lower personal income and corporation tax rates', 'Encourage saving and honest reporting of income'],
    ['Simpler procedures', 'Reduce cost and scope for evasion'],
    ['Reform of indirect taxes', 'Move towards a common national market (later GST)'],
  ],
  'Table of tax reforms: lower personal income and corporation tax rates to encourage saving and honest reporting, simpler procedures to reduce evasion, and reform of indirect taxes towards a common national market and later GST',
);
const vDevalue = flow('LR', ['Rupee devalued (1991)', 'Indian goods cheaper for foreign buyers', 'Exports rise', 'More foreign exchange earned'], 'Flow: the rupee was devalued in 1991, making Indian goods cheaper for foreign buyers, raising exports and foreign-exchange earnings', 'Why devalue?');
const vTrade = table(
  ['', 'Before the reforms', 'After the reforms'],
  [
    ['Import quotas', 'Common', 'Removed in stages'],
    ['Import tariffs', 'Very high', 'Reduced'],
    ['Export duties', 'On several goods', 'Removed'],
    ['Foreign investment', 'Tightly limited', 'Limits raised in many industries'],
  ],
  'Table comparing trade and investment policy before and after the reforms: import quotas removed in stages, tariffs reduced, export duties removed and foreign investment limits raised',
);
const vDuty = table(
  ['', `Duty ${DUTY.before} per cent`, `Duty ${DUTY.after} per cent`],
  [
    ['World price (₹)', String(DUTY.price), String(DUTY.price)],
    ['Duty (₹)', String(LANDED_BEFORE - DUTY.price), String(LANDED_AFTER - DUTY.price)],
    ['Cost to Indian buyer (₹)', String(LANDED_BEFORE), String(LANDED_AFTER)],
  ],
  `Table: a part costing ${DUTY.price} rupees abroad costs ${LANDED_BEFORE} rupees with a ${DUTY.before} per cent duty and ${LANDED_AFTER} rupees with a ${DUTY.after} per cent duty, a fall of ${LANDED_FALL} rupees`,
  'Imagined figures.',
);
const vPriv = flow('TB', ['Privatisation', 'Outright sale of a public enterprise', 'Disinvestment: sale of part of the government\'s shares', 'Ratna status: more autonomy for efficient public firms'], 'Flow: privatisation through outright sale or disinvestment, and Maharatna, Navratna and Miniratna status giving efficient public firms more autonomy', 'Ways of reducing the state\'s role', [
  { from: 'n1', to: 'n2' }, { from: 'n1', to: 'n3' }, { from: 'n1', to: 'n4' },
]);
const vDis = table(
  ['Step', 'Working', 'Result'],
  [
    ['Shares sold', `${DIS.soldPct} per cent of ${DIS.shares} crore`, `${DIS_SOLD} crore shares`],
    ['Money received', `${DIS_SOLD} crore × ₹${DIS.price}`, `₹${DIS_RECEIPT} crore`],
    ['Government\'s stake left', `100 − ${DIS.soldPct}`, `${DIS_LEFT} per cent`],
  ],
  `Table of a disinvestment: ${DIS.soldPct} per cent of ${DIS.shares} crore shares is ${DIS_SOLD} crore shares, sold at ${DIS.price} rupees for ${DIS_RECEIPT} crore rupees, leaving the government ${DIS_LEFT} per cent`,
  'Imagined public-sector company.',
);
const vOutsource = flow('LR', ['Firm abroad needs a service (accounts, call centre, software)', 'Contracts an Indian firm', 'Work done in India, sent back online', 'Indian jobs and export earnings'], 'Flow of outsourcing: a firm abroad contracts an Indian firm for a service, the work is done in India and sent back online, creating jobs and export earnings in India', 'Outsourcing');
const vWto = table(
  ['', 'GATT', 'WTO'],
  [
    ['Set up', '1948', '1995 (India a founder member)'],
    ['Covers', 'Trade in goods', 'Goods, services, intellectual property, investment-related rules'],
    ['Aim', 'Lower tariffs', 'Rule-based trade, fewer tariff and non-tariff barriers'],
  ],
  'Table comparing GATT, set up in 1948 for trade in goods, with the WTO, set up in 1995 with India as a founder member, covering goods, services and intellectual property and aiming at rule-based trade with fewer barriers',
);
const vSummary1 = table(
  ['Part', 'Key measures'],
  [
    ['Crisis (1991)', 'Fiscal deficits, BoP gap, reserves for about two weeks of imports'],
    ['Liberalisation', 'Delicensing, financial and tax reform, devaluation, trade and investment reform'],
    ['Privatisation', 'Disinvestment, ratna status'],
    ['Globalisation', 'Outsourcing, WTO (1995)'],
  ],
  'Summary table of Part 1: the 1991 crisis; liberalisation measures; privatisation through disinvestment and ratna status; globalisation through outsourcing and the WTO',
);

const vYardsticks = flow('LR', ['Growth', 'Sectors', 'Jobs', 'External sector', 'Government finances'], 'Flow of five yardsticks for judging the reforms: growth, sectors, jobs, external sector and government finances', 'Judge on several yardsticks, not one');
const vSuccess = table(
  ['Generally seen as gains', 'Generally seen as concerns'],
  [
    ['Faster GDP growth', 'Agriculture grew slowly'],
    ['Foreign-exchange reserves rose many times over', 'Good jobs grew slower than output'],
    ['Services exports (software, business services)', 'Small industries faced import competition'],
    ['Wider consumer choice', 'Gains uneven across regions and people'],
  ],
  'Two-column table: gains include faster growth, much larger reserves, services exports and wider consumer choice; concerns include slow farm growth, slow growth of good jobs, import competition for small industries and uneven gains',
  'Both columns matter in an appraisal.',
);
const vSectorsSvg = (() => {
  const s = new Svg(600, 300);
  const ch = s.chart({ x0: 0, x1: 4, y0: 0, y1: 80, left: 70, top: 30, width: 470, height: 210, xLabel: '', yLabel: '₹ thousand crore' });
  [['Agriculture', 'agri'], ['Industry', 'ind'], ['Services', 'serv']].forEach(([name, k], i) => {
    const x = i + 1;
    for (const [dx, y, fill] of [[-0.2, SB.y1[k], 'fill'], [0.2, SB.y2[k], 'accent']]) {
      const x0 = ch.X(x + dx - 0.17), x1 = ch.X(x + dx + 0.17);
      s.rect(x0, ch.Y(y), x1 - x0, ch.Y(0) - ch.Y(y), { fill, color: 'accent', sw: 1.4, rx: 2 });
      ch.label([x + dx, y], String(y), { dy: -10, size: 12 });
    }
    ch.xTick(x, name);
  });
  ch.yTick(20, '20').yTick(40, '40').yTick(60, '60');
  s.rect(400, 20, 14, 14, { fill: 'fill', color: 'accent', sw: 1.2, rx: 2 }).text(420, 27, 'Year 1', { anchor: 'start', size: 12 });
  s.rect(480, 20, 14, 14, { fill: 'accent', color: 'accent', sw: 1.2, rx: 2 }).text(500, 27, 'Year 2', { anchor: 'start', size: 12 });
  return s.visual(`Grouped bar chart of the imagined economy Sonbhadra: agriculture ${SB.y1.agri} to ${SB.y2.agri}, industry ${SB.y1.ind} to ${SB.y2.ind}, services ${SB.y1.serv} to ${SB.y2.serv} thousand crore rupees between year 1 and year 2`, 'Imagined economy: services grow fastest, agriculture slowest.');
})();
const vSbTable = table(
  ['Sector', 'Year 1', 'Year 2', 'Growth (per cent)'],
  [
    ['Agriculture', String(SB.y1.agri), String(SB.y2.agri), String(SBg.agri)],
    ['Industry', String(SB.y1.ind), String(SB.y2.ind), String(SBg.ind)],
    ['Services', String(SB.y1.serv), String(SB.y2.serv), String(SBg.serv)],
    ['**Total**', `**${SB1}**`, `**${SB2}**`, `**${SBg.all}**`],
  ],
  `Table of the imagined economy Sonbhadra: agriculture grows ${SBg.agri} per cent, industry ${SBg.ind}, services ${SBg.serv}, and total GDP ${SBg.all} per cent from ${SB1} to ${SB2}`,
  'Imagined figures, ₹ thousand crore at constant prices.',
);
const vAgri = flow('TB', ['Slow growth of public investment (irrigation, power, roads, research)', 'Productivity improves little', 'Shift to cash crops for export; exposure to world prices', 'Farm incomes more uncertain'], 'Flow of concerns about agriculture: slow growth of public investment leads to little gain in productivity; a shift to export cash crops and exposure to world prices make farm incomes more uncertain', 'Why farm growth lagged', [
  { from: 'n1', to: 'n2' }, { from: 'n3', to: 'n4' }, { from: 'n2', to: 'n4' },
]);
const vInd = table(
  ['Industry: gains', 'Industry: strains'],
  [
    ['Easier to start and expand firms', 'Cheaper imports compete with small units'],
    ['Access to imported technology and inputs', 'Power and transport costs stayed high'],
    ['Foreign investment in cars, phones and more', 'Limited access to some rich-country markets'],
  ],
  'Two-column table on industry: gains are easier entry, imported technology and foreign investment; strains are import competition for small units, high infrastructure costs and limited access to some foreign markets',
);
const vJobsFiscal = table(
  ['Area', 'What appraisals point out'],
  [
    ['Employment', 'Output grew faster than good-quality jobs: "jobless growth" in many sectors'],
    ['Tax revenue', 'Lower rates did not always raise revenue quickly'],
    ['Disinvestment', 'Raised funds; critics say some assets were sold below their value'],
    ['Social spending', 'Tight budgets can squeeze health and education'],
  ],
  'Table of appraisal points on employment and government finances: output grew faster than good jobs, lower tax rates did not always raise revenue quickly, disinvestment raised funds but was criticised for undervaluation, and tight budgets can squeeze social spending',
);
const vDemo = flow('LR', ['8 November 2016: announcement', 'Old ₹500 and ₹1,000 notes stop being legal tender', 'Deposit or exchange at banks for a limited period', 'New notes issued'], 'Flow of demonetisation: the announcement on 8 November 2016, old 500 and 1,000 rupee notes stop being legal tender, they are deposited or exchanged at banks for a limited period, and new notes are issued', 'Demonetisation, step by step');
const vDemoObj = table(
  ['Stated objectives', 'Effects observed'],
  [
    ['Curb black money and corruption', 'Severe cash shortage for some weeks'],
    ['Remove counterfeit notes', 'Hardship for cash-based trade and workers'],
    ['Cut terror financing', 'Rise in digital payments and bank deposits'],
    ['Promote digital payments', 'Debate among economists on how far aims were met'],
  ],
  'Table of demonetisation: stated objectives were curbing black money, removing counterfeit notes, cutting terror financing and promoting digital payments; effects included a cash shortage, hardship for cash-based activity, a rise in digital payments and deposits, and continuing debate',
);
const vGst = flow('TB', ['Many taxes: central excise, service tax, state VAT and others', 'GST from 1 July 2017', 'CGST and SGST on supplies within a state', 'IGST on supplies between states', 'GST Council: Centre and states recommend rates'], 'Flow: many central and state taxes were replaced by GST from 1 July 2017, with CGST and SGST within a state, IGST between states, and the GST Council of the Centre and states recommending rates', 'How GST is organised', [
  { from: 'n1', to: 'n2' }, { from: 'n2', to: 'n3' }, { from: 'n2', to: 'n4' }, { from: 'n2', to: 'n5' },
]);
const vItc = table(
  ['Stage', 'GST charged', 'Input tax credit', 'GST paid to government'],
  [
    [`Mill sells for ₹${inr(GST.makerSale)}`, String(GST_MAKER), '0', String(GST_MAKER)],
    [`Shop sells for ₹${inr(GST.traderSale)}`, String(GST_TRADER_OUT), String(GST_MAKER), String(GST_TRADER_PAY)],
    ['**Total**', '', '', `**${GST_TOTAL}**`],
  ],
  `Table of input tax credit at an imagined ${GST.rate} per cent rate: the mill pays ${GST_MAKER}; the shop charges ${GST_TRADER_OUT}, claims ${GST_MAKER} as credit and pays ${GST_TRADER_PAY}; total ${GST_TOTAL}`,
  'Imagined rate, not an actual GST rate.',
);
const vCascade = (() => {
  const s = new Svg(560, 290);
  const ch = s.chart({ x0: 0, x1: 3, y0: 0, y1: 300, left: 70, top: 30, width: 430, height: 200, xLabel: '', yLabel: 'Total tax (₹)' });
  for (const [x, v, name, fill] of [[1, CASC_TOTAL, 'Cascading (old way)', 'fill'], [2, GST_TOTAL, 'GST with credit', 'accent']]) {
    const x0 = ch.X(x - 0.3), x1 = ch.X(x + 0.3);
    s.rect(x0, ch.Y(v), x1 - x0, ch.Y(0) - ch.Y(v), { fill, color: 'accent', sw: 1.5, rx: 2 });
    ch.label([x, v], String(v), { dy: -12, size: 13, bold: true });
    ch.xTick(x, name);
  }
  ch.yTick(100, '100').yTick(200, '200');
  return s.visual(`Bar chart: total tax on the same cloth is ${CASC_TOTAL} rupees under the old cascading method and ${GST_TOTAL} rupees under GST with input tax credit`, `Imagined ${GST.rate} per cent rate: the old way taxed ₹${inr(CASC_BASE)}, a price that already included tax.`);
})();
const vSummary2 = table(
  ['Topic', 'Remember'],
  [
    ['Gains', 'Growth led by services, much larger reserves, services exports'],
    ['Concerns', 'Agriculture, jobs, small industry, uneven gains, fiscal squeeze'],
    ['Demonetisation', '8 November 2016; old ₹500 and ₹1,000 notes; stated aims; short-run costs'],
    ['GST', '1 July 2017; replaced many taxes; input tax credit; GST Council'],
  ],
  'Summary table of Part 2: gains, concerns, demonetisation on 8 November 2016 and GST from 1 July 2017',
);

// ---------------------------------------------------------------- deck 1
const part1 = deck({
  part: 1,
  title: 'LPG: An Appraisal — Part 1: The 1991 Crisis and the New Economic Policy',
  goals: [
    'Explain the causes of the 1991 economic crisis and why India turned to the IMF and World Bank',
    'Distinguish stabilisation measures from structural reform measures',
    'Describe the reforms under liberalisation in industry, finance, tax, foreign exchange and trade',
    'Explain privatisation (disinvestment, ratna status) and globalisation (outsourcing, the WTO)',
  ],
  slides: [
    sl('title', 'Liberalisation, Privatisation and Globalisation', {
      b: 'Part 1 — why India changed course in **1991**, and what the **New Economic Policy** changed.',
      v: vRoute1,
      n: 'In 1991 India faced one of the sharpest economic emergencies in its history. Within months, the rules for starting a factory, running a bank, importing goods and inviting foreign investment were rewritten. In this part we see why the crisis came, what the New Economic Policy did, and what the three words liberalisation, privatisation and globalisation actually mean.',
    }),
    sl('concept', 'The economy before 1991', {
      b: 'For four decades, the government **controlled** much of economic life to pursue planned goals.',
      v: vBefore,
      n: 'Before 1991, a business needed a government licence to set up or expand a factory. Many big industries were reserved for the public sector. Imports faced quotas and very high duties, foreign investment was tightly limited, and the Reserve Bank largely decided interest rates. These controls had aims such as self-reliance, but critics argued they also bred delays, inefficiency and a lack of competition.',
    }),
    sl('diagram', 'How the 1991 crisis built up', {
      v: vCrisis,
      n: 'Follow the chain from the top. For years the government spent more than it earned and borrowed to fill the gap, so interest payments kept rising. At the same time imports grew faster than exports, and an oil price jump in 1990 made things worse. Foreign-exchange reserves fell so low that they could pay for only about two weeks of imports. Lenders hesitated, and India turned to the IMF and the World Bank.',
    }),
    sl('check', 'Quick check: how low were the reserves?', {
      b: 'In 1991 the reserves could pay for imports for only about how long?',
      chk: 'm_reserves',
      n: 'Think about why the word crisis is used. Was the cover a matter of years, months or weeks?',
    }),
    sl('concept', 'The New Economic Policy', {
      b: 'Loans came with **conditions**: open up the economy and reduce controls. The response was the **New Economic Policy (1991)**.',
      v: vNep,
      n: 'The IMF and World Bank lent money on condition that India reduce controls and open its economy. The government announced the New Economic Policy in 1991. Its measures fall into two groups. Stabilisation measures dealt with the emergency in the short term. Structural reform measures changed the rules of the economy for the long term.',
    }),
    sl('two-column', 'Stabilisation and structural reform', {
      cols: [
        '**Stabilisation**\n\n- Short term\n- Rebuild reserves, correct the balance of payments\n- Bring inflation under control',
        '**Structural reform**\n\n- Long term\n- Change rules and institutions\n- Raise efficiency and competitiveness',
      ],
      v: vStab,
      n: 'Remember the difference by time and purpose. Stabilisation is first aid: it stops the bleeding by rebuilding reserves and controlling prices. Structural reform is the longer treatment: it changes the rules so that the economy becomes more efficient and can compete with the world. Exam questions often ask you to distinguish the two, so state both the time frame and the aim.',
    }),
    sl('example', 'Worked example 1: import cover', {
      b: `The imagined country Vindhyapur has reserves of **${WE1.reserves} billion US dollars** and an import bill of **${WE1.monthly} billion US dollars a month**. Is it in crisis?`,
      bl: [
        'Step 1 — Import cover = reserves ÷ monthly imports.',
        `Step 2 — ${WE1.reserves} ÷ ${WE1.monthly} = **${WE1_COVER} month**, about ${WE1_WEEKS} weeks.`,
        'Step 3 — Interpret: a few weeks of cover means essential imports such as oil and fertiliser are at risk: a crisis like India\'s in 1991.',
      ],
      v: vCover,
      n: 'Let us measure how safe reserves are. Divide the reserves by the import bill for one month. Here one and a half divided by three gives half a month, or about two weeks. That was roughly India\'s position in 1991. With so little cover, a country cannot be sure of paying for oil, fertiliser or medicines, and lenders lose confidence.',
    }),
    sl('check', 'Quick check: two groups of measures', {
      b: 'Which pair correctly matches the two groups of measures?',
      chk: 'm_stab_struct',
      n: 'Match each group with its time frame and its aim before you choose.',
    }),
    sl('concept', 'Liberalisation 1: the industrial sector', {
      b: '**Liberalisation** means removing government controls so that firms can take more decisions themselves.',
      v: vIndustrial,
      n: 'The first area of liberalisation was industry. Licences were abolished for almost all industries, kept only for a short list linked to health, safety or strategy. Most areas once reserved for the public sector were opened to private firms. Many goods were removed from the small-scale reserved list, and firms could respond to the market in deciding prices and output.',
    }),
    sl('diagram', 'Liberalisation 2: the financial sector', {
      v: vFinance,
      n: 'The financial sector includes banks, stock markets and other lenders. After the reforms, the Reserve Bank moved from directly controlling rates and lending towards setting the rules and letting markets decide more. Private Indian banks and foreign banks were allowed to expand, and foreign institutional investors could invest in Indian markets. The RBI still regulates; its style changed.',
    }),
    sl('concept', 'Liberalisation 3: tax reforms', {
      b: 'Tax reforms changed both **direct** and **indirect** taxes.',
      v: vTax,
      n: 'Income tax and corporation tax rates were reduced and procedures made simpler. The reasoning was that very high rates encourage people to hide income, while moderate rates encourage saving and honest reporting. Indirect taxes were also reformed step by step towards a common national market, a journey that later led to the Goods and Services Tax.',
    }),
    sl('diagram', 'Liberalisation 4: the foreign-exchange market', {
      b: 'In **1991** the rupee was **devalued**; later its rate was left largely to the market.',
      v: vDevalue,
      n: 'To deal with the shortage of foreign exchange, the rupee was devalued in 1991. A cheaper rupee makes Indian goods cheaper for foreign buyers, so exports rise and more foreign currency comes in. Imports become dearer, which also eases the drain on reserves. Over the following years, the rupee\'s value came to be set mostly by demand and supply in the market.',
    }),
    sl('concept', 'Liberalisation 5: trade and investment', {
      b: 'Trade policy moved from **quantities** (quotas) to **prices** (tariffs), and tariffs themselves came down.',
      v: vTrade,
      n: 'Before the reforms, many imports were limited by quotas, a fixed quantity per year, and tariffs were very high. After the reforms, quotas were removed in stages, tariffs were cut, and export duties were removed so Indian goods could compete abroad. Limits on foreign direct investment were also raised in many industries.',
    }),
    sl('example', 'Worked example 2: a cut in import duty', {
      b: `An imagined machine part costs **₹${DUTY.price}** abroad. The duty falls from **${DUTY.before} per cent** to **${DUTY.after} per cent**.`,
      bl: [
        `Step 1 — Before: ${DUTY.price} + duty ${LANDED_BEFORE - DUTY.price} = **₹${LANDED_BEFORE}**.`,
        `Step 2 — After: ${DUTY.price} + duty ${LANDED_AFTER - DUTY.price} = **₹${LANDED_AFTER}**.`,
        `Step 3 — The buyer saves **₹${LANDED_FALL}**: cheaper inputs for Indian makers, but tougher competition for Indian producers of the same part.`,
      ],
      v: vDuty,
      n: 'Let us see what a tariff cut does. With a forty per cent duty, a five hundred rupee part costs seven hundred rupees in India. With a ten per cent duty it costs five hundred and fifty. Indian factories that use the part gain. But Indian firms that make the same part now face cheaper competition. That is the double edge of trade liberalisation.',
    }),
    sl('check', 'Quick check: what happens to a quota?', {
      b: 'An imagined firm was limited by an import quota before 1991. What changes after the trade reforms?',
      chk: 'm_qr',
      n: 'Recall that the reforms moved from fixing quantities to using prices, and lowered those prices.',
    }),
    sl('diagram', 'Privatisation', {
      b: '**Privatisation** reduces the government\'s ownership or management of enterprises.',
      v: vPriv,
      n: 'Privatisation can happen in two ways. The government can sell an enterprise outright, or it can sell part of its shares, which is called disinvestment. The aims were to improve efficiency and to raise money. Efficient public firms were also given Maharatna, Navratna or Miniratna status, which gives them more freedom to take decisions and compete.',
    }),
    sl('example', 'Worked example 3: a disinvestment', {
      b: `The government owns all **${DIS.shares} crore** shares of an imagined public company and sells **${DIS.soldPct} per cent** at **₹${DIS.price}** a share.`,
      v: vDis,
      n: 'First find the number of shares sold: ten per cent of fifty crore is five crore shares. Multiply by the price of eighty rupees to get four hundred crore rupees for the government. The government still owns ninety per cent, so the company remains in the public sector. Disinvestment can mean selling a small slice, not the whole company.',
    }),
    sl('diagram', 'Globalisation and outsourcing', {
      b: '**Globalisation** integrates a country\'s economy with the world through trade, investment, technology and people.',
      v: vOutsource,
      n: 'Globalisation links the Indian economy more closely with the rest of the world. A clear example is outsourcing: a firm abroad buys a service such as accounting, a call centre or software work from an Indian firm. Cheap internet and telecom let the work travel instantly. India\'s skilled, English-speaking workforce and lower wages made it a leading destination.',
    }),
    sl('concept', 'The World Trade Organization', {
      b: 'The **WTO** was set up in **1995**, succeeding **GATT**; India is a founder member.',
      v: vWto,
      n: 'The General Agreement on Tariffs and Trade, set up in 1948, dealt mainly with goods. The World Trade Organization replaced it in 1995 and covers goods, services and intellectual property. It aims at a rule-based trading system with fewer tariff and non-tariff barriers. Some economists argue that rich countries gained more from it, so it too is debated.',
    }),
    sl('check', 'Quick check: name the practice', {
      b: 'A Canadian hospital sends its transcription work to a firm in Pune. What is this?',
      chk: 'm_outsourcing',
      n: 'Ask yourself who is buying the service, from whom, and from where.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up. Fiscal deficits and a balance of payments gap led to the 1991 crisis. The New Economic Policy combined short-term stabilisation with long-term structural reform. Liberalisation removed controls in industry, finance, tax, foreign exchange and trade. Privatisation reduced the state\'s ownership through disinvestment. Globalisation linked India to the world through outsourcing and the WTO.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Distinguish **stabilisation** (short term) from **structural reform** (long term): state both time frame and aim.',
        'For "measures of liberalisation", organise by sector: industry, finance, tax, foreign exchange, trade.',
        'Privatisation includes **disinvestment**, not only outright sale.',
        'Write the dates correctly: NEP **1991**, WTO **1995** (after GATT, 1948).',
        'Do not say the RBI stopped regulating: it became more of a **facilitator**.',
        'Marks: 3 marks = three distinct measures; 5 marks = five points under clear headings.',
      ],
      n: 'A few common slips to avoid. Do not mix up stabilisation and structural reform. Do not say privatisation only means selling a whole company. Do not claim that the Reserve Bank stopped regulating banks. Keep the dates straight: the New Economic Policy came in 1991 and the WTO in 1995. In long answers, use headings by sector so the examiner can tick each point.',
    }),
  ],
});

// ---------------------------------------------------------------- deck 2
const part2 = deck({
  part: 2,
  title: 'LPG: An Appraisal — Part 2: Appraising the Reforms, Demonetisation and GST',
  goals: [
    'Appraise the reforms on growth, the external sector, agriculture, industry, employment and government finances',
    'Present arguments on both sides in a balanced way',
    'Explain the meaning, objectives and effects of demonetisation (2016)',
    'Explain GST (2017): taxes replaced, structure, input tax credit and objectives',
  ],
  slides: [
    sl('title', 'Appraising the reforms', {
      b: 'Part 2 — how the reforms worked out, and two later changes: **demonetisation** and **GST**.',
      v: vRoute2,
      n: 'More than three decades have passed since 1991, so we can ask how the reforms worked out. Economists do not all agree, so in this part we learn to judge them on several yardsticks and to present both sides. Then we study two important later measures: demonetisation in 2016 and the Goods and Services Tax in 2017.',
    }),
    sl('diagram', 'Yardsticks of appraisal', {
      v: vYardsticks,
      n: 'An appraisal is a judgement based on evidence. Look at growth: did output rise faster? Look at the sectors: which grew, and which lagged? Look at jobs: did good employment keep pace? Look at the external sector: reserves, exports and investment. And look at government finances. A good answer touches several yardsticks rather than one.',
    }),
    sl('two-column', 'Gains and concerns at a glance', {
      cols: ['**Gains**\n\n- Faster growth, led by services\n- Reserves rose many times over\n- Services exports, consumer choice', '**Concerns**\n\n- Agriculture lagged\n- Good jobs grew slowly\n- Small industry and uneven gains'],
      v: vSuccess,
      n: 'Most appraisals agree on some gains. Growth was faster than before 1991, led by services. Foreign-exchange reserves rose many times over, so a crisis like 1991 became much less likely. Services exports such as software grew, and consumers got wider choice. Equally, most note concerns: agriculture lagged, good jobs grew slowly, small industry struggled, and gains were uneven.',
    }),
    sl('diagram', 'Growth led by services: an imagined economy', {
      b: 'Compare the bars for each sector between year 1 and year 2.',
      v: vSectorsSvg,
      n: 'This chart shows an imagined economy called Sonbhadra. Look at the gap between the two bars for each sector. Agriculture barely moves. Industry grows a little. Services grow the most. This is the pattern often described for India after the reforms: growth led by services, with agriculture falling behind.',
    }),
    sl('example', 'Worked example 1: growth rates and shares', {
      b: 'Use the Sonbhadra table to find growth rates and the change in the share of services.',
      bl: [
        'Step 1 — Growth rate = (year 2 − year 1) ÷ year 1 × 100.',
        `Step 2 — Agriculture ${SBg.agri} per cent, industry ${SBg.ind} per cent, services ${SBg.serv} per cent; total ${SBg.all} per cent.`,
        `Step 3 — Share of services: ${SBs.y1} per cent in year 1, ${SBs.y2} per cent in year 2.`,
        'Step 4 — Interpret: the fastest-growing sector gains share; farm incomes fall behind.',
      ],
      v: vSbTable,
      n: 'For each sector, subtract year one from year two, divide by year one and multiply by one hundred. Services grow by twenty per cent, industry by ten and agriculture by only two and a half. Because services grow faster than the total, their share rises from forty to almost forty three per cent. In an answer, always add one line saying what the numbers mean.',
    }),
    sl('check', 'Quick check: reserves', {
      b: 'True or false: one outcome of the reforms was a large rise in reserves compared with 1991.',
      chk: 'tf_reserves',
      n: 'Recall where reserves stood in 1991, and what happened over the following decades.',
    }),
    sl('diagram', 'Agriculture after the reforms', {
      v: vAgri,
      n: 'Why did agriculture lag? One reason often given is that public investment in irrigation, power, rural roads and research grew slowly, so productivity rose little. Another is that opening to world markets pushed some farmers towards export cash crops and linked their prices to world prices, which can swing sharply. Farm incomes became more uncertain for many.',
    }),
    sl('two-column', 'Industry after the reforms', {
      cols: ['**Gains**\n\n- Easier entry and expansion\n- Imported technology and inputs\n- Foreign investment', '**Strains**\n\n- Import competition for small units\n- High power and transport costs\n- Limited access to some markets'],
      v: vInd,
      n: 'Industry saw both sides. Firms found it easier to start and expand, could import better technology and inputs, and attracted foreign investment in goods such as cars and phones. But small units faced cheaper imports, costs of power and transport stayed high, and some rich-country markets stayed hard to enter. So industrial growth was uneven.',
    }),
    sl('check', 'Quick check: a criticism', {
      b: 'Which is a common criticism of the reforms\' effect on agriculture?',
      chk: 'm_agri_concern',
      n: 'Think about what farmers need from the government to raise productivity.',
    }),
    sl('concept', 'Jobs and government finances', {
      b: 'Two more yardsticks: **employment** and **fiscal policy**.',
      v: vJobsFiscal,
      n: 'On jobs, critics speak of jobless growth: output rose fast, but good-quality jobs grew much more slowly, partly because the fastest-growing activities need few, highly skilled workers. On government finances, lower tax rates did not always raise revenue quickly, and disinvestment raised money but was criticised when assets seemed undervalued. Tight budgets can squeeze health and education.',
    }),
    sl('concept', 'Writing a balanced appraisal', {
      b: 'Examiners reward **evidence on both sides** and a **reasoned conclusion**, not a slogan.',
      bl: [
        'Open with what the reforms set out to do.',
        'Give gains with evidence (growth, reserves, services exports).',
        'Give concerns with evidence (agriculture, jobs, uneven gains).',
        'Conclude: what would spread the gains more widely (farm investment, skills, infrastructure)?',
      ],
      v: flow('LR', ['Aim of the reforms', 'Gains with evidence', 'Concerns with evidence', 'Reasoned conclusion'], 'Flow of a balanced appraisal: aim of the reforms, gains with evidence, concerns with evidence, and a reasoned conclusion', 'A five-mark plan'),
      n: 'Here is a plan for a five mark appraisal. Begin with the aim of the reforms. Then give two or three gains, each with evidence. Then give two or three concerns, again with evidence. End with a reasoned conclusion, such as what would help the gains reach more people. Avoid one-sided slogans: the marks are for reasoning.',
    }),
    sl('diagram', 'Demonetisation (2016)', {
      v: vDemo,
      n: 'On the eighth of November 2016, the government announced that the old five hundred and one thousand rupee notes would no longer be legal tender. Legal tender means money that must be accepted in payment by law. People could deposit or exchange the old notes at banks for a limited period, while new notes were printed and issued.',
    }),
    sl('two-column', 'Demonetisation: aims and effects', {
      cols: ['**Stated objectives**\n\n- Curb black money and corruption\n- Remove counterfeit notes\n- Cut terror financing\n- Promote digital payments', '**Effects observed**\n\n- Cash shortage, queues\n- Hardship for cash-based activity\n- Rise in digital payments and deposits'],
      v: vDemoObj,
      n: 'The government stated four main aims: curbing black money and corruption, removing counterfeit notes, cutting terror financing and promoting digital payments. In the short run there was a severe shortage of cash, with long queues and hardship for traders and workers who relied on cash. Digital payments and bank deposits rose. Economists still debate how far the aims were met.',
    }),
    sl('check', 'Quick check: legal tender', {
      b: 'What does it mean when a note ceases to be legal tender?',
      chk: 'm_legal_tender',
      n: 'Focus on the word legal: what can the law require people to accept?',
    }),
    sl('diagram', 'The Goods and Services Tax (2017)', {
      b: '**GST** is an indirect tax on the supply of goods and services, in force from **1 July 2017**.',
      v: vGst,
      n: 'Before GST, the Centre and the states levied many separate indirect taxes, such as central excise, service tax and state VAT. From the first of July 2017, GST replaced most of them. Within a state, central and state GST are charged together; between states, integrated GST applies. The GST Council, made up of the Union and state finance ministers, recommends the rates.',
    }),
    sl('example', 'Worked example 2: input tax credit', {
      b: `A mill sells cloth for ₹${inr(GST.makerSale)}; a shop resells it for ₹${inr(GST.traderSale)}. Imagined GST rate **${GST.rate} per cent**.`,
      bl: [
        `Step 1 — Mill charges ${GST.rate} per cent of ${inr(GST.makerSale)} = ₹${GST_MAKER}, paid to the government.`,
        `Step 2 — Shop charges ${GST.rate} per cent of ${inr(GST.traderSale)} = ₹${GST_TRADER_OUT}, minus credit ₹${GST_MAKER} = **₹${GST_TRADER_PAY}**.`,
        `Step 3 — Total GST ₹${GST_TOTAL}, against ₹${CASC_TOTAL} under the old cascading way (tax on ₹${inr(CASC_BASE)}).`,
      ],
      v: vItc,
      n: 'Each seller charges GST on her sale but subtracts the GST she already paid on her purchases. The mill pays one hundred rupees. The shop charges one hundred and thirty but claims one hundred as credit, so it pays only thirty. In total the government gets one hundred and thirty, exactly ten per cent of the final price. Under the old way, tax was charged on tax, and the total was two hundred and forty.',
    }),
    sl('diagram', 'Why GST matters: no tax on tax', {
      v: vCascade,
      n: 'This chart compares the two systems for the same piece of cloth. The old cascading method charged tax on a price that already contained earlier tax, so the total was higher. GST with input tax credit taxes only the value added at each stage. The other objectives of GST are a common national market, often summed up as one nation, one tax, and a wider tax base.',
    }),
    sl('check', 'Quick check: name the credit', {
      b: 'Under GST, a trader deducts the tax already paid on her purchases. What is this deduction called?',
      chk: 'm_cascade',
      n: 'It is the feature that removes tax on tax.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up. The reforms brought faster growth led by services, much larger reserves and growing services exports. Concerns include slow farm growth, slow growth of good jobs, pressure on small industry and uneven gains. Demonetisation in November 2016 withdrew the old five hundred and one thousand rupee notes. GST, from July 2017, replaced many taxes and uses input tax credit.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Appraisal questions need **both sides** and a conclusion: one-sided answers lose marks.',
        'Use evidence words: growth led by **services**, **reserves** rose, **jobless growth**, public investment in agriculture.',
        'Dates: demonetisation **8 November 2016** (₹500 and ₹1,000 notes); GST **1 July 2017**.',
        'GST is an **indirect** tax; input tax credit removes **cascading**.',
        'Keep policy language neutral: "the stated objective was…", "critics argue…", "supporters point out…".',
        'Numericals: write the formula, substitute, compute, then interpret in one line.',
      ],
      n: 'For appraisal questions, always give evidence on both sides and finish with a conclusion. Get the dates right: demonetisation was announced on the eighth of November 2016, and GST began on the first of July 2017. Remember that GST is an indirect tax. Use neutral phrases such as critics argue or supporters point out. In numericals, show the formula, the working and a one line interpretation.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Liberalisation, Privatisation and Globalisation: An Appraisal — notes',
  sections: [
    {
      h: '1. Background: the economy before 1991 and the crisis',
      t: 1,
      b: '**Before 1991:** licences for industry, many industries reserved for the public sector, import quotas and high tariffs, limits on foreign investment, interest rates largely set by the RBI.\n\n**The 1991 crisis:**\n- **Fiscal side:** the government spent more than its revenue for years; borrowing grew and so did interest payments.\n- **External side:** imports outpaced exports; the oil price jump of 1990 added to the import bill; **foreign-exchange reserves** fell to roughly **two weeks of imports**.\n- **Response:** India borrowed from the **IMF** and the **World Bank**, which asked for reforms in return.\n\n**New Economic Policy (1991):** two groups of measures — **stabilisation** (short term: reserves, balance of payments, inflation) and **structural reform** (long term: efficiency, competitiveness).',
      terms: [
        ['Fiscal deficit', 'The gap between the government\'s total spending and its receipts other than borrowing.'],
        ['Stabilisation measures', 'Short-term steps to correct the balance of payments and control inflation.'],
        ['Structural reforms', 'Long-term changes in rules and institutions to raise efficiency and competitiveness.'],
      ],
      v: vCrisis,
      vs: [vStab],
    },
    {
      h: '2. Liberalisation',
      t: 1,
      b: 'Removing government controls in five areas.\n\n1. **Industry:** licensing abolished except for a short list (alcohol, cigarettes, hazardous chemicals, industrial explosives and a few more); only a few strategic areas (such as atomic energy and railway operations) reserved for the public sector; goods de-reserved from small-scale industry.\n2. **Finance:** private Indian and foreign banks allowed to grow; foreign institutional investors permitted; the RBI moves from **regulator to facilitator**.\n3. **Tax:** lower, simpler personal and corporation tax rates; reform of indirect taxes towards a common market.\n4. **Foreign exchange:** rupee **devalued** in 1991; later a largely market-determined rate.\n5. **Trade and investment:** quotas removed, tariffs cut, export duties removed, higher FDI limits.',
      terms: [
        ['Liberalisation', 'Removing or relaxing government restrictions on economic activity.'],
        ['Delicensing', 'Abolishing the need for a government licence to set up or expand an industry.'],
        ['Devaluation', 'An official lowering of a currency\'s value against foreign currencies.'],
        ['Quantitative restriction', 'A limit on the quantity of a good that may be imported, such as a quota.'],
      ],
      v: vIndustrial,
      vs: [vTrade, vDevalue],
    },
    {
      h: '3. Privatisation and globalisation',
      t: 1,
      b: '**Privatisation** reduces state ownership or management: outright sale, or **disinvestment** (selling part of the government\'s equity). Aims: efficiency, financial discipline, resources for the government. Efficient public enterprises received **Maharatna, Navratna or Miniratna** status, giving them more autonomy.\n\n**Globalisation** integrates the economy with the world.\n- **Outsourcing:** firms abroad buy services (call centres, accounting, software, medical transcription) from Indian firms; helped by cheap telecom and a skilled, English-speaking workforce.\n- **WTO (1995):** succeeded **GATT (1948)**; covers goods, services and intellectual property; aims at rule-based trade and fewer barriers. India is a founder member.',
      terms: [
        ['Disinvestment', 'Sale of part of the government\'s shares in a public-sector enterprise.'],
        ['Outsourcing', 'Hiring an outside firm, often abroad, to provide a service or part of production.'],
        ['WTO', 'World Trade Organization, set up in 1995 to frame and enforce rules of international trade.'],
      ],
      v: vPriv,
      vs: [vOutsource, vWto],
    },
    {
      h: '4. Appraisal: growth, the external sector, agriculture and industry',
      t: 2,
      b: '**Generally seen as gains:** faster GDP growth, led mainly by **services**; foreign-exchange **reserves** rose many times over; growth of services exports; wider consumer choice and better quality.\n\n**Agriculture:** slower growth; public investment in irrigation, power, roads, markets and research did not keep pace; some shift to export cash crops; prices more exposed to world markets.\n\n**Industry:** easier entry, imported technology and foreign investment; but import competition for small units, costly infrastructure and limited access to some foreign markets made growth uneven.',
      terms: [
        ['Growth led by services', 'A pattern in which the service sector grows fastest and raises its share of GDP.'],
        ['Foreign-exchange reserves', 'Foreign currency and similar assets held by the central bank to pay for imports and meet obligations.'],
      ],
      v: vSuccess,
      vs: [vAgri, vInd],
    },
    {
      h: '5. Appraisal: jobs and government finances',
      t: 2,
      b: '**Employment:** many appraisals note that output grew faster than good-quality jobs — "**jobless growth**" — because the fastest-growing activities employ relatively few, highly skilled workers.\n\n**Fiscal policy:** tax-rate cuts did not always raise revenue quickly; tight budgets can limit spending on health, education and welfare. **Disinvestment** raised funds, but critics argued that some assets were undervalued and proceeds used for routine spending rather than new assets.\n\n**Balanced view:** the reforms ended the 1991 emergency and raised growth, while the benefits reached some regions, sectors and people more than others. Policies on farm investment, skills and infrastructure are often suggested to spread them.',
      terms: [
        ['Jobless growth', 'Growth of output without a matching growth of employment.'],
        ['Appraisal', 'A judgement based on evidence about successes and shortcomings.'],
      ],
      v: vJobsFiscal,
    },
    {
      h: '6. Demonetisation and GST',
      t: 3,
      b: '**Demonetisation:** announced on **8 November 2016**; the old **₹500 and ₹1,000** notes ceased to be **legal tender** and could be deposited or exchanged for a limited period. **Stated objectives:** curb black money and corruption, remove counterfeit notes, cut terror financing, promote digital payments. **Effects observed:** acute cash shortage and hardship for cash-based activity in the short run; a rise in digital payments and bank deposits. Economists continue to debate how far the objectives were met.\n\n**GST:** in force from **1 July 2017**; an **indirect tax** on the supply of goods and services that replaced many central and state taxes (central excise, service tax, state VAT and others). **CGST + SGST** within a state, **IGST** between states; rates recommended by the **GST Council** (Union Finance Minister and state finance ministers). **Input tax credit** removes the **cascading** of tax on tax. Objectives: a common national market ("one nation, one tax"), lower cascading, a wider tax base.',
      terms: [
        ['Legal tender', 'Money that must be accepted in payment of a debt by law.'],
        ['Black money', 'Income or wealth hidden from the tax authorities.'],
        ['Input tax credit', 'Deduction of tax paid on purchases from tax due on sales.'],
        ['Cascading effect', 'Tax charged on a price that already includes earlier tax: tax on tax.'],
      ],
      v: vDemo,
      vs: [vGst, vItc],
    },
  ],
  tips: '**Common mistakes**\n- Mixing up **stabilisation** (short term) and **structural reform** (long term).\n- Saying privatisation means only outright sale: **disinvestment** counts.\n- Saying the RBI stopped regulating banks after 1991.\n- Writing the WTO year as 1991 (it is **1995**; GATT was 1948).\n- Calling GST a direct tax; it is **indirect**.\n- Writing a one-sided appraisal with no evidence.\n\n**How marks are usually awarded**\n- 1 mark: one correct option.\n- 3 marks: three distinct, explained points (about 50–80 words).\n- 5 marks: five headed points (about 80–120 words); appraisal answers need both sides and a conclusion.\n- Numericals: formula, substitution, answer with unit, one-line interpretation.\n\n**Neutral wording:** write "the stated objective was…", "supporters argue…", "critics point out…".',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['Two roots of the **1991 crisis**', 'Persistent **fiscal deficits** and a **balance-of-payments** gap that drained reserves.', 'concept', 1],
  ['Reserves in 1991 covered imports for about…', '**Two weeks**.', 'fact', 1],
  ['Institutions India borrowed from in 1991', 'The **IMF** and the **World Bank**.', 'fact', 1],
  ['**Stabilisation** measures', 'Short-term: rebuild reserves, correct the BoP, control inflation.', 'definition', 1],
  ['**Structural reform** measures', 'Long-term: change rules to raise efficiency and competitiveness.', 'definition', 1],
  ['**Liberalisation**', 'Removing or relaxing government controls on economic activity.', 'definition', 1],
  ['Industries still needing a licence (examples)', 'Alcohol, cigarettes, hazardous chemicals, industrial explosives.', 'fact', 1],
  ['Areas still reserved for the public sector (examples)', 'Atomic energy, railway operations.', 'fact', 1],
  ['RBI\'s role after financial reforms', 'From **regulator** towards **facilitator**.', 'concept', 1],
  ['Why was the rupee devalued in 1991?', 'To make exports cheaper abroad and earn more **foreign exchange**.', 'concept', 1],
  ['Trade reform in one line', 'Quotas removed, tariffs cut, export duties removed.', 'concept', 1],
  ['**Disinvestment**', 'Selling part of the government\'s shares in a public enterprise.', 'definition', 1],
  ['Purpose of **ratna** status', 'More autonomy for efficient public enterprises to compete.', 'concept', 1],
  ['**Outsourcing**', 'Buying a service from an outside firm, often in another country.', 'definition', 1],
  ['Why India gained from outsourcing', 'Skilled, English-speaking workers at lower wages + cheap telecom.', 'concept', 1],
  ['**WTO**: year and predecessor', '**1995**; succeeded **GATT** (1948).', 'fact', 1],
  ['Sector that led growth after 1991', '**Services**.', 'fact', 2],
  ['A widely accepted success of the reforms', 'Foreign-exchange **reserves** rose many times over.', 'fact', 2],
  ['Why agriculture lagged (one reason)', 'Slow growth of **public investment** in irrigation, power and research.', 'concept', 2],
  ['**Jobless growth**', 'Output grows fast while good-quality jobs grow slowly.', 'definition', 2],
  ['Industry: one strain after reforms', 'Cheaper imports competing with small units.', 'concept', 2],
  ['Criticism of disinvestment', 'Assets sometimes said to be **undervalued**; proceeds used for routine spending.', 'concept', 2],
  ['Structure of a balanced appraisal', 'Aim → gains with evidence → concerns with evidence → reasoned conclusion.', 'exam-tip', 2],
  ['**Demonetisation**: date and notes', '**8 November 2016**; old **₹500 and ₹1,000** notes.', 'fact', 3],
  ['**Legal tender**', 'Money that must be accepted in payment by law.', 'definition', 3],
  ['Stated objectives of demonetisation', 'Curb black money, counterfeit notes, terror financing; promote digital payments.', 'concept', 3],
  ['Short-run effect of demonetisation', 'Acute **cash shortage**; hardship for cash-based activity.', 'fact', 3],
  ['**GST**: start date and type', '**1 July 2017**; an **indirect** tax.', 'fact', 3],
  ['Who recommends GST rates?', 'The **GST Council** (Union and state finance ministers).', 'fact', 3],
  ['CGST, SGST, IGST', 'CGST + SGST within a state; IGST between states.', 'concept', 3],
  ['**Input tax credit**', 'Tax paid on purchases deducted from tax on sales: removes cascading.', 'definition', 3],
  ['"One nation, one tax" means…', 'One GST framework replacing many state and central taxes: a common market.', 'concept', 3],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-12-default-chapter-test-short',
  title: 'Chapter test (short) — Liberalisation, Privatisation and Globalisation: An Appraisal',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_crisis_root', 'm_gst_date', 'm_growth_led', 'ar_crisis'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and the 3-mark question in about 50–80 words.', items: ['s_crisis_causes', 's_demo_obj', 's3_success'] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer any ONE of the two questions in about 80–120 words.', items: [{ attempt: 1, keys: ['l_npe_features', 'l_gst'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks)', instr: 'Read the passage and answer all parts. Part (c) has an internal choice.', items: ['cb_gst'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-12-default-chapter-test-long',
  title: 'Chapter test (long) — Liberalisation, Privatisation and Globalisation: An Appraisal',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_imf', 'm_delicense', 'm_devalue', 'm_disinvest', 'm_wto_aim', 'm_jobless', 'm_demo_obj', 'm_gst_council', 'ar_services', 'ar_gst'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and 3-mark questions in about 50–80 words. Questions 13 and 15 have an internal choice.', items: ['s_stab_vs_struct', 's_gst_features', { attempt: 1, keys: ['s_agri_effect', 's_ind_effect'] }, 's3_trade_reform', { attempt: 1, keys: ['s3_criticism', 's3_demo_effects'] }] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer question 16, and any ONE of questions 17 and 18, in about 80–120 words each.', items: ['l_appraisal', { attempt: 1, keys: ['l_privatisation', 'l_demo'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks each)', instr: 'Read each passage or table and answer all parts. Part (c) of each has an internal choice.', items: ['cb_crisis', 'cb_sectors'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t03 of cbse-12-economics-ch08 only (1991 crisis and features of the reforms; appraisal of LPG; demonetisation and GST)',
    originality: 'every case, conversation, table and scenario written for this chapter (imagined countries Ranakpur, Vindhyapur, Sonbhadra, town Kanchanpur, firms and figures, labelled); no NCERT text, exercise or board/sample-paper item reused',
    data: `imagined figures computed by the build (import cover ${RES.reserves}/${RES.monthlyImports} = ${COVER} months and ${WE1.reserves}/${WE1.monthly} = ${WE1_COVER} month; duty ${LANDED_BEFORE} → ${LANDED_AFTER}; disinvestment ${DIS_SOLD} crore × ${DIS.price} = ${DIS_RECEIPT}; GST ${GST_MAKER} + ${GST_TRADER_PAY} = ${GST_TOTAL} vs cascading ${CASC_TOTAL}; Sonbhadra growth ${SBg.agri}/${SBg.ind}/${SBg.serv}/${SBg.all} per cent); no Indian statistics beyond stable, commonly taught facts`,
    facts: '1991 reserves about two weeks of imports; IMF and World Bank loans with conditions; NEP 1991; rupee devalued 1991; WTO 1995 after GATT 1948; demonetisation announced 8 November 2016 (old ₹500 and ₹1,000 notes); GST from 1 July 2017, GST Council, CGST/SGST/IGST',
    gate: 'schema, content lint (lintExemplar) and the deterministic verify checks run clean on this chapter',
  },
});
