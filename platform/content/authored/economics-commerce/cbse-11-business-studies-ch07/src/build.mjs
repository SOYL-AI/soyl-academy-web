// Build CBSE 11 Business Studies ch07 Sources of Business Finance. Run from platform/:
//   npx tsx content/authored/economics-commerce/cbse-11-business-studies-ch07/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from '../../cbse-11-business-studies-ch01/src/lib.mjs';

setUnit('cbse-11-business-studies-ch07', 'economics-commerce');
const { fmt, W, DEB, PREF, PB, EQ, NEED, TC, LEASE, CP, GDR, LOAN, RET } = await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- SVG helpers
// Line between the edges of two boxes {x, y, w, h}, along the line joining their centres.
const link = (s, A, B, o = { sw: 1.4, color: 'muted' }) => {
  const ax = A.x + A.w / 2, ay = A.y + A.h / 2, bx = B.x + B.w / 2, by = B.y + B.h / 2;
  const dx = bx - ax, dy = by - ay;
  const t = (b) => Math.min(dx !== 0 ? b.w / 2 / Math.abs(dx) : 9, dy !== 0 ? b.h / 2 / Math.abs(dy) : 9);
  s.line(ax + dx * t(A), ay + dy * t(A), bx - dx * t(B), by - dy * t(B), o);
};

// ---------------------------------------------------------------- SVG visuals
const vTree = (() => {
  const s = new Svg(760, 372);
  const R = { x: 250, y: 8, w: 260, h: 40 };
  const cols = [
    { x: 10, h: 'By period', kids: [['Long-term', 'equity, debentures, long loans'], ['Medium-term', 'bank loans for some years'], ['Short-term', 'trade credit, commercial paper']] },
    { x: 265, h: 'By ownership', kids: [["Owners' funds", 'equity, preference, retained'], ['Borrowed funds', 'debentures, loans, deposits']] },
    { x: 520, h: 'By source of generation', kids: [['Internal', 'retained earnings'], ['External', 'shares, debentures, loans']] },
  ];
  const heads = cols.map((c) => ({ x: c.x, y: 84, w: 230, h: 44 }));
  heads.forEach((b) => link(s, R, b));
  s.rect(R.x, R.y, R.w, R.h, { fill: 'accent', fillOpacity: 0.18, color: 'accent', sw: 2 });
  s.text(R.x + R.w / 2, R.y + 20, 'Sources of business finance', { size: 14, bold: true });
  cols.forEach((c, i) => {
    const hb = heads[i];
    s.rect(hb.x, hb.y, hb.w, hb.h, { fill: 'accent', fillOpacity: 0.12, color: 'accent', sw: 1.6 });
    s.text(hb.x + 115, hb.y + 22, c.h, { size: 14, bold: true });
    c.kids.forEach((k, j) => {
      const y = 158 + j * 70;
      s.line(hb.x + 115, hb.y + hb.h, hb.x + 115, y, { sw: 1.2, color: 'muted' });
      s.rect(hb.x, y, 230, 56, { fill: 'fill', color: 'muted', sw: 1.4 });
      s.text(hb.x + 115, y + 19, k[0], { size: 13, bold: true });
      s.text(hb.x + 115, y + 40, k[1], { size: 12 });
    });
  });
  return s.visual('Tree of the classification of sources of business finance. By period: long-term such as equity and debentures, medium-term such as bank loans for some years, and short-term such as trade credit and commercial paper. By ownership: owners funds such as equity, preference and retained earnings, and borrowed funds such as debentures, loans and deposits. By source of generation: internal such as retained earnings, and external such as shares, debentures and loans', 'Three bases, seven classes.');
})();

const vCmp = (() => {
  const s = new Svg(760, 354);
  s.text(70, 20, 'Basis', { size: 14, bold: true });
  s.text(290, 20, "Owners' funds", { size: 14, bold: true });
  s.text(600, 20, 'Borrowed funds', { size: 14, bold: true });
  const rows = [
    ['Status', 'Providers are owners', 'Providers are creditors'],
    ['Risk', 'No repayment duty, lower risk', 'Must be repaid, higher risk'],
    ['Return', 'Dividend that varies', 'Fixed interest'],
    ['Control', 'Voting rights', 'Generally none'],
    ['Cost', 'Higher: issue cost and dividend', 'Lower: interest only'],
    ['Tax', 'Dividend from profit after tax', 'Interest is tax-deductible'],
  ];
  rows.forEach((r, i) => {
    const y = 40 + i * 52;
    s.rect(10, y, 120, 42, { fill: 'accent', fillOpacity: 0.14, color: 'accent', sw: 1.4 });
    s.text(70, y + 21, r[0], { size: 13, bold: true });
    s.rect(140, y, 300, 42, { fill: 'fill', color: 'muted', sw: 1.3 });
    s.text(290, y + 21, r[1], { size: 12 });
    s.rect(450, y, 300, 42, { fill: 'fill', color: 'muted', sw: 1.3 });
    s.text(600, y + 21, r[2], { size: 12 });
  });
  return s.visual('Chart comparing owners funds and borrowed funds on six bases. Status: providers of owners funds are owners and providers of borrowed funds are creditors. Risk: no repayment duty and lower risk against repayment due and higher risk. Return: a dividend that varies against fixed interest. Control: voting rights against generally none. Cost: higher because of issue cost and dividend against lower with interest only. Tax: dividend comes from profit after tax while interest is tax-deductible', 'Six bases of comparison.');
})();

const vTypes = (() => {
  const s = new Svg(760, 326);
  s.text(190, 18, 'Preference shares', { size: 15, bold: true });
  s.text(570, 18, 'Debentures', { size: 15, bold: true });
  const pref = [
    [['Cumulative', 'arrear carried forward'], ['Non-cumulative', 'arrear is lost']],
    [['Participating', 'shares extra profit'], ['Non-participating', 'fixed dividend only']],
    [['Convertible', 'may become equity'], ['Non-convertible', 'stays preference']],
    [['Redeemable', 'repaid after a period'], ['Irredeemable', 'repaid at winding up']],
  ];
  const deb = [
    [['Secured', 'charge on assets'], ['Unsecured', 'no charge']],
    [['Registered', 'name recorded'], ['Bearer', 'passes by delivery']],
    [['Convertible', 'may become shares'], ['Non-convertible', 'stays a debt']],
    [['Redeemable', 'repaid on a date'], ['Irredeemable', 'repaid at winding up']],
  ];
  const draw = (rows, x0) => rows.forEach((r, i) => r.forEach((c, j) => {
    const x = x0 + j * 182, y = 40 + i * 70;
    s.rect(x, y, 172, 58, { fill: 'fill', color: j === 0 ? 'accent' : 'muted', sw: 1.5 });
    s.text(x + 86, y + 21, c[0], { size: 13, bold: true });
    s.text(x + 86, y + 42, c[1], { size: 11 });
  }));
  draw(pref, 10);
  draw(deb, 390);
  s.text(380, 318, 'Each pair is read as: this kind or the other kind', { size: 11, muted: true });
  return s.visual('Chart of the types of preference shares and of debentures. Preference shares: cumulative where an arrear is carried forward against non-cumulative where it is lost; participating where extra profit is shared against non-participating with a fixed dividend only; convertible which may become equity against non-convertible; redeemable which is repaid after a period against irredeemable which is repaid at winding up. Debentures: secured with a charge on assets against unsecured with no charge; registered with the name recorded against bearer which passes by delivery; convertible which may become shares against non-convertible which stays a debt; redeemable which is repaid on a date against irredeemable which is repaid at winding up', 'Four pairs of types for each.');
})();

const vIntl = (() => {
  const s = new Svg(760, 412);
  const R = { x: 280, y: 6, w: 200, h: 36 };
  const A = { x: 10, y: 80, w: 220, h: 70 };
  const B = { x: 270, y: 80, w: 220, h: 70 };
  const C = { x: 520, y: 80, w: 230, h: 44 };
  [A, B, C].forEach((b) => link(s, R, b));
  s.rect(R.x, R.y, R.w, R.h, { fill: 'accent', fillOpacity: 0.18, color: 'accent', sw: 2 });
  s.text(R.x + R.w / 2, R.y + 18, 'Finance from abroad', { size: 14, bold: true });
  s.rect(A.x, A.y, A.w, A.h, { fill: 'fill', color: 'accent', sw: 1.5 });
  s.text(A.x + 110, A.y + 25, 'Commercial banks abroad', { size: 13, bold: true });
  s.text(A.x + 110, A.y + 48, 'loans in foreign currency', { size: 12 });
  s.rect(B.x, B.y, B.w, B.h, { fill: 'fill', color: 'accent', sw: 1.5 });
  s.text(B.x + 110, B.y + 19, 'International agencies', { size: 13, bold: true });
  s.text(B.x + 110, B.y + 38, 'and development banks', { size: 13, bold: true });
  s.text(B.x + 110, B.y + 58, 'loans for projects', { size: 12 });
  s.rect(C.x, C.y, C.w, C.h, { fill: 'accent', fillOpacity: 0.12, color: 'accent', sw: 1.6 });
  s.text(C.x + 115, C.y + 22, 'International capital markets', { size: 13, bold: true });
  [
    ['Global Depository Receipt', 'traded outside the United States'],
    ['American Depository Receipt', 'traded in the United States'],
    ['Indian Depository Receipt', 'issued in India by foreign firms'],
    ['Foreign Currency Convertible Bond', 'foreign currency, convertible'],
  ].forEach((k, i) => {
    const y = 148 + i * 66;
    s.line(C.x + 115, i === 0 ? C.y + C.h : y - 10, C.x + 115, y, { sw: 1.2, color: 'muted' });
    s.rect(C.x, y, 230, 56, { fill: 'fill', color: 'muted', sw: 1.4 });
    s.text(C.x + 115, y + 19, k[0], { size: 12, bold: true });
    s.text(C.x + 115, y + 40, k[1], { size: 11 });
  });
  return s.visual('Chart of international sources of finance. Commercial banks abroad give loans in foreign currency. International agencies and development banks give loans for projects. International capital markets offer four instruments: the Global Depository Receipt, traded outside the United States; the American Depository Receipt, traded in the United States; the Indian Depository Receipt, issued in India by foreign firms; and the Foreign Currency Convertible Bond, issued in foreign currency and convertible into shares', 'Three sources abroad; four instruments.');
})();

const vFactors = (() => {
  const s = new Svg(760, 385);
  const C = { x: 290, y: 150, w: 180, h: 80 };
  const left = [['Cost', 'of raising and servicing'], ['Financial strength', 'and stability of operations'], ['Form of organisation', 'and legal status'], ['Purpose', 'and time period'], ['Risk profile', 'of the firm']];
  const right = [['Control', 'over decisions'], ['Creditworthiness', 'effect of the source'], ['Flexibility', 'and ease of raising'], ['Tax benefits', 'of the source']];
  const L = left.map((t, i) => ({ x: 10, y: 40 + i * 68, w: 220, h: 52, t }));
  const R = right.map((t, i) => ({ x: 530, y: 40 + i * 90, w: 220, h: 52, t }));
  [...L, ...R].forEach((b) => link(s, C, b));
  s.rect(C.x, C.y, C.w, C.h, { fill: 'accent', fillOpacity: 0.18, color: 'accent', sw: 2 });
  s.text(C.x + C.w / 2, C.y + 30, 'Choice of source', { size: 15, bold: true });
  s.text(C.x + C.w / 2, C.y + 56, 'nine factors', { size: 12 });
  s.text(120, 18, 'Factors', { size: 15, bold: true });
  s.text(640, 18, 'More factors', { size: 15, bold: true });
  [...L, ...R].forEach((b) => {
    s.rect(b.x, b.y, b.w, b.h, { fill: 'fill', color: 'accent', sw: 1.4 });
    s.text(b.x + 110, b.y + 17, b.t[0], { size: 13, bold: true });
    s.text(b.x + 110, b.y + 36, b.t[1], { size: 12 });
  });
  return s.visual('Web around the choice of a source of finance with nine factors. On the left: cost, financial strength and stability of operations, form of organisation and legal status, purpose and time period, and risk profile. On the right: control, effect on creditworthiness, flexibility and ease, and tax benefits', 'Nine factors to weigh.');
})();

// ---------------------------------------------------------------- tables and flows
const vRoute1 = flow('LR', ['Need for finance', 'Classification', 'Equity shares', 'Preference shares', 'Retained earnings'], 'Route map of Part 1: need for finance, classification of sources, equity shares, preference shares and retained earnings');
const vRoute2 = flow('LR', ['Debentures', 'Loans and credit', 'Owners and borrowed funds', 'International finance', 'Choice of source'], 'Route map of Part 2: debentures, loans and credit, owners funds against borrowed funds, international finance and the choice of source');
const vFin = table(['Need', 'Meaning'], [
  ['Business finance', 'The funds that a business needs to start, run and grow'],
  ['Fixed capital', 'Funds for long-term assets such as land, machinery and buildings'],
  ['Working capital', 'Funds for day-to-day operations such as materials and wages'],
  ['Growth and expansion', 'Funds for a new branch, new products or a bigger plant'],
], 'Table of business finance as the funds a business needs to start, run and grow, with three needs: fixed capital for long-term assets, working capital for day-to-day operations, and funds for growth and expansion');
const vFixWc = table(['Point', 'Fixed capital', 'Working capital'], [
  ['Used for', 'Land, machinery, buildings', 'Materials, wages, power, rent'],
  ['Period', 'Long-term; stays in the business', 'Short-term; turns over often'],
  ['Imagined example', 'A kiln for Chitra Tiles', 'Clay and glaze for Chitra Tiles'],
], 'Table comparing fixed capital and working capital on use, period and an imagined example: a kiln and clay and glaze for Chitra Tiles');
const vBases = table(['Basis', 'Classes', 'Imagined example'], [
  ['Period', 'Long-term, medium-term, short-term', 'Debentures; a three-year bank loan; trade credit'],
  ['Ownership', "Owners' funds, borrowed funds", 'Equity shares; a bank loan'],
  ['Source of generation', 'Internal, external', 'Profit kept in the firm; shares sold to the public'],
], 'Table of three bases of classification, the classes under each, and an imagined example of each');
const vNeedEx = table(['Item (imagined Sutra Looms)', 'Rs'], [
  [`Looms ${fmt(NEED.machine)} plus shed fitting ${fmt(NEED.fit)}: fixed capital`, fmt(NEED.fixed)],
  [`Yarn ${fmt(NEED.stock)} plus wages ${fmt(NEED.wages)} plus power and rent ${fmt(NEED.power)}: working capital`, fmt(NEED.work)],
  ['Total need', fmt(NEED.total)],
], `Worked example table: an imagined start-up needs fixed capital of ${W(NEED.fixed)} rupees and working capital of ${W(NEED.work)} rupees, so the total need is ${W(NEED.total)} rupees`, 'Fixed capital plus working capital.');
const vClsEx = table(['Imagined source', 'Period', 'Ownership', 'Generation'], [
  ['Bhumi Seeds keeps profit', 'Long-term', "Owners' fund", 'Internal'],
  ['Eight-month bank loan', 'Short-term', 'Borrowed fund', 'External'],
  ['Debentures sold to investors', 'Long-term', 'Borrowed fund', 'External'],
], 'Table classifying three imagined sources on period, ownership and source of generation: retained profit is long-term, owners and internal; an eight-month bank loan is short-term, borrowed and external; debentures are long-term, borrowed and external');
const vEq = table(['Point', 'Equity shares'], [
  ['Meaning', 'Ownership capital; holders are the owners of the company'],
  ['Claim', 'Residual: what is left after all other claims are met'],
  ['Voting', 'Holders vote on important matters and so share in control'],
  ['Dividend', 'Varies with profit; none is promised'],
], 'Table of equity shares as ownership capital, with residual claims, voting rights and a dividend that varies with profit');
const vEqML = table(['Merits', 'Limitations'], [
  ['Permanent capital, not repaid', 'Cost of issue is high'],
  ['No fixed burden of dividend', 'Dilution of control by new holders'],
  ['Voting rights give control', 'Fluctuating return for investors'],
  ['A base for raising loans', 'Dividend is not tax-deductible'],
], 'Table of merits of equity shares: permanent capital, no fixed burden, voting rights and a credit base; and limitations: cost of issue, dilution of control, fluctuating return and dividend that is not tax-deductible');
const vEqEx = table(['Item (imagined Nirmaan Labs)', 'Figure'], [
  [`${fmt(EQ.add)} new shares at Rs ${EQ.price}`, `Rs ${fmt(EQ.raise)}`],
  [`Issue expenses at ${EQ.costPct} per cent`, `Rs ${fmt(EQ.cost)}`],
  ['Net amount received', `Rs ${fmt(EQ.net)}`],
  [`Promoters' holding: ${fmt(EQ.prom)} of ${fmt(EQ.old)} before`, `${EQ.before} per cent`],
  [`Promoters' holding: ${fmt(EQ.prom)} of ${fmt(EQ.old + EQ.add)} after`, `${EQ.after} per cent`],
], `Worked example table: ${W(EQ.add)} new shares at thirty rupees raise ${W(EQ.raise)} rupees, issue expenses are ${W(EQ.cost)} rupees, the net amount is ${W(EQ.net)} rupees, and the holding of the promoters falls from seventy five to sixty per cent`, 'Raise, subtract the cost, check the control.');
const vPref = table(['Point', 'Preference shares'], [
  ['Meaning', 'Shares with a fixed rate of dividend'],
  ['Priority', 'Paid before equity holders, in dividend and in return of capital'],
  ['Voting', 'Generally no voting rights on ordinary matters'],
  ['Types', 'Cumulative, participating, convertible, redeemable, and their opposites'],
], 'Table of preference shares as shares with a fixed rate of dividend, priority over equity in dividend and return of capital, generally no voting on ordinary matters, and four pairs of types');
const vArrEx = table(['Step (imagined Aadhar Polymers)', 'Figure'], [
  [`${fmt(PREF.n)} shares of Rs ${PREF.face} at ${PREF.rate} per cent: dividend for one year`, `Rs ${fmt(PREF.annual)}`],
  [`Arrear for ${PREF.years} years with no payment`, `Rs ${fmt(PREF.arrear)}`],
  ['Dividend due in year three: arrear plus the year', `Rs ${fmt(PREF.due)}`],
  [`Profit available Rs ${fmt(PREF.profit)}: left for equity holders`, `Rs ${fmt(PREF.left)}`],
  [`Per equity share (${fmt(PREF.eqShares)} shares)`, `Rs ${PREF.perShare.toFixed(2)}`],
], `Worked example table: the yearly preference dividend is ${W(PREF.annual)} rupees, the arrear for two years is ${W(PREF.arrear)} rupees, the dividend due in year three is ${W(PREF.due)} rupees, and ${W(PREF.left)} rupees is left for equity holders from a profit of ${W(PREF.profit)} rupees`, 'Arrears are paid first.');
const vEqPref = table(['Point', 'Equity shares', 'Preference shares'], [
  ['Dividend', 'Varies with profit', 'Fixed rate'],
  ['Priority', 'After preference holders', 'First, in dividend and capital'],
  ['Voting', 'Full voting rights', 'Generally none on ordinary matters'],
  ['Repayment', 'Not repaid in the life of the firm', 'Redeemable types are repaid'],
], 'Table comparing equity shares and preference shares on dividend, priority, voting and repayment');
const vRet = table(['Merits', 'Limitations'], [
  ['No cost of issue, no repayment date', 'Shareholders may be unhappy with low dividends'],
  ['No dilution of control', 'Funds may be kept without a good use'],
  ['Stronger finances and credit base', 'Growth is limited to the profit earned'],
], 'Table of retained earnings with merits of no issue cost, no dilution and stronger finances, and limitations of shareholder dissatisfaction, idle funds and growth limited to profit earned');
const vRetEx = table(['Item (imagined Bhumi Seeds)', 'Rs'], [
  ['Profit of the year', fmt(RET.profit)],
  [`Dividend paid at ${RET.payPct} per cent of profit`, fmt(RET.div)],
  ['Retained in the business', fmt(RET.kept)],
], `Worked table: from a profit of ${W(RET.profit)} rupees, a dividend of sixty per cent takes ${W(RET.div)} rupees, so ${W(RET.kept)} rupees is retained`, 'Profit minus dividend is retained.');
const vSummary1 = table(['Idea', 'Remember'], [
  ['Need for finance', 'Fixed capital, working capital, growth'],
  ['Classification', 'Period, ownership, source of generation'],
  ['Equity shares', 'Permanent, voting, varying return, dilution of control'],
  ['Preference shares', 'Fixed dividend, priority, four pairs of types'],
  ['Retained earnings', 'Internal, no issue cost, may upset shareholders'],
], 'Summary table of Part 1: need for finance, classification, equity shares, preference shares and retained earnings');
const vTips1 = table(['Common mistake', 'Fix'], [
  ['Treating working capital as long-term', 'Working capital is for daily operations'],
  ['Calling preference holders creditors', 'They are owners with priority, not lenders'],
  ['Forgetting the arrear in cumulative shares', 'Add the unpaid years to the current year'],
  ['Naming real companies as examples', 'Use an imagined firm'],
], 'Exam tips table: four common mistakes about working capital, preference shareholders, arrears and real company names');

const vDeb = table(['Point', 'Debentures'], [
  ['Meaning', 'An acknowledgement of debt by a company'],
  ['Return', 'Fixed rate of interest'],
  ['Holder', 'A creditor, not an owner; no voting rights'],
  ['Types', 'Secured, registered, convertible, redeemable, and their opposites'],
], 'Table of debentures as an acknowledgement of debt, with fixed interest, a holder who is a creditor with no vote, and four pairs of types');
const vDebML = table(['Merits', 'Limitations'], [
  ['Fixed income for cautious investors', 'Interest is a fixed burden, even in a loss'],
  ['No dilution of control', 'Must be repaid'],
  ['Interest is tax-deductible', 'Too much borrowing lowers borrowing capacity'],
  ['Trading on equity is possible', 'Raises financial risk'],
], 'Table of merits of debentures: fixed income for investors, no dilution of control, tax-deductible interest and trading on equity; and limitations: fixed burden, repayment, lower borrowing capacity and higher financial risk');
const vDebEx = table(['Step (imagined Chitra Tiles)', 'Figure'], [
  [`${fmt(DEB.n)} debentures of Rs ${fmt(DEB.face)} each`, `Rs ${fmt(DEB.total)}`],
  [`Interest at ${DEB.rate} per cent a year`, `Rs ${fmt(DEB.int)}`],
  [`Tax saved at an imagined ${DEB.taxPct} per cent`, `Rs ${fmt(DEB.shield)}`],
  ['Interest after the tax saving', `Rs ${fmt(DEB.net)}`],
], `Worked example table: ${W(DEB.n)} debentures raise ${W(DEB.total)} rupees, interest at eleven per cent is ${W(DEB.int)} rupees, the tax saved at an imagined twenty five per cent is ${W(DEB.shield)} rupees, and the net cost is ${W(DEB.net)} rupees`, 'Interest is deducted before tax.');
const vLoans = table(['Source', 'Meaning'], [
  ['Loans from commercial banks', 'Money lent by banks for a stated period at interest, usually against security'],
  ['Loans from financial institutions', 'Long-term finance from specialised institutions set up for industry and infrastructure'],
  ['Imagined example', 'Vihaan Pumps takes a four-year bank loan against its land'],
], 'Table of loans from commercial banks as money lent for a stated period at interest, usually against security, and loans from financial institutions as long-term finance from specialised institutions, with an imagined four-year bank loan');
const vTcLease = table(['Source', 'Meaning', 'Imagined example'], [
  ['Trade credit', 'Credit given by suppliers; short-term', 'Chitra Tiles pays for clay after forty five days'],
  ['Lease financing', 'The lessor lets the lessee use an asset for lease rentals', 'Madhur Bakers hires an oven for five years'],
], 'Table of trade credit as short-term credit from suppliers and lease financing as the use of an asset for lease rentals, with imagined examples of clay bought on credit and an oven hired for five years');
const vTcEx = table(['Item (imagined)', 'Figure'], [
  [`Chitra Tiles: clay at Rs ${fmt(TC.perDay)} a day on ${TC.days} days of credit`, `Rs ${fmt(TC.fund)} financed by suppliers`],
  [`Madhur Bakers: lease rent Rs ${fmt(LEASE.rent)} for ${LEASE.months} months`, `Rs ${fmt(LEASE.total)} in all`],
  [`Oven bought outright would cost`, `Rs ${fmt(LEASE.price)}`],
  ['Extra paid over the price in the lease', `Rs ${fmt(LEASE.extra)}`],
], `Worked example table: clay worth eight thousand rupees a day on forty five days of credit means suppliers finance ${W(TC.fund)} rupees, and a lease of eighteen thousand rupees for sixty months totals ${W(LEASE.total)} rupees against a price of ${W(LEASE.price)} rupees, an extra ${W(LEASE.extra)} rupees`, 'Days of credit times the daily purchase; rent times months.');
const vOthers = table(['Source', 'Meaning, as of 2024'], [
  ['Public deposits', 'Deposits that companies accept from the public, under rules, for a fixed period'],
  ['Commercial paper', 'An unsecured promissory note for short-term needs, issued by large firms'],
  ['Inter-corporate deposits', 'Deposits that one company places with another for a short period'],
], 'Table of public deposits, commercial paper and inter-corporate deposits, as of 2024');
const vCpEx = table(['Item (imagined Rangoli Industries)', 'Rs'], [
  ['Face value repaid at the end of ninety days', fmt(CP.face)],
  ['Amount received at issue', fmt(CP.issue)],
  ['Discount, the cost of the paper', fmt(CP.disc)],
], `Worked table: commercial paper of face value ${W(CP.face)} rupees sold for ${W(CP.issue)} rupees carries a discount of ${W(CP.disc)} rupees`, 'Face value minus issue price.');
const vClues = table(['Clue in an imagined case', 'Source it points to'], [
  ['The supplier lets the shop pay after a month', 'Trade credit'],
  ['A large firm issues an unsecured short-term note', 'Commercial paper'],
  ['The firm uses a machine owned by another party and pays rentals', 'Lease financing'],
  ['A company places idle cash with another company for three months', 'Inter-corporate deposit'],
], 'Worked example table of clues and the source each points to: a month of supplier credit is trade credit, an unsecured short-term note of a large firm is commercial paper, a machine used for rentals is lease financing, and idle cash placed with another company is an inter-corporate deposit', 'Find the clue, then name the source.');
const vLoanEx = table(['Item (imagined Vihaan Pumps)', 'Rs'], [
  [`Bank loan of ${fmt(LOAN.need)} at ${LOAN.rate} per cent: interest a year`, fmt(LOAN.int)],
  [`Good year: profit before interest ${fmt(LOAN.good)}, left after interest`, fmt(LOAN.left)],
  [`Poor year: profit before interest ${fmt(LOAN.poor)}, short by`, fmt(-LOAN.gap)],
], `Worked example table: interest on a loan of forty lakh rupees at twelve per cent is ${W(LOAN.int)} rupees a year, so a good year leaves ${W(LOAN.left)} rupees while a poor year falls short by ${W(-LOAN.gap)} rupees`, 'Interest is due in every year.');
const vIntlSrc = table(['Source abroad', 'What it gives'], [
  ['Commercial banks abroad', 'Loans in foreign currency for various periods'],
  ['International agencies and development banks', 'Loans and help for projects'],
  ['International capital markets', 'Funds through instruments such as depository receipts and bonds'],
], 'Table of three international sources: commercial banks abroad, international agencies and development banks, and international capital markets');
const vInstr = table(['Instrument', 'Main features'], [
  ['Global Depository Receipt', 'A receipt issued by a depository bank against shares; traded outside the United States; holders have no voting rights'],
  ['American Depository Receipt', 'A receipt traded in the United States against the shares of a foreign company'],
  ['Indian Depository Receipt', 'A receipt issued in India by a foreign company'],
  ['Foreign Currency Convertible Bond', 'A bond issued in a foreign currency, convertible into shares on stated terms'],
], 'Table of four international instruments: the Global Depository Receipt, the American Depository Receipt, the Indian Depository Receipt and the Foreign Currency Convertible Bond, with main features');
const vFactTbl = table(['Factor', 'What to ask'], [
  ['Cost', 'What do raising and servicing this source cost?'],
  ['Financial strength and stability', 'Can steady income bear fixed charges?'],
  ['Form of organisation and legal status', 'Can this kind of firm use this source?'],
  ['Purpose and time period', 'Does the period match the use of the funds?'],
  ['Risk profile', 'How risky is the source for this firm?'],
], 'Table of five factors in the choice of a source with the question to ask for each: cost, financial strength and stability, form of organisation and legal status, purpose and time period, and risk profile');
const vFactTbl2 = table(['Factor', 'What to ask'], [
  ['Control', 'Will outsiders gain a say in decisions?'],
  ['Effect on creditworthiness', 'Will it help or harm the firm\'s standing with lenders?'],
  ['Flexibility and ease', 'How easily can the funds be raised and repaid?'],
  ['Tax benefits', 'Is the payment deductible before tax?'],
], 'Table of four more factors with the question to ask for each: control, effect on creditworthiness, flexibility and ease, and tax benefits');
const vSummary2 = table(['Idea', 'Remember'], [
  ['Debentures', 'Debt with fixed interest; four pairs of types; tax-deductible interest'],
  ['Other borrowed funds', 'Bank loans, financial institutions, trade credit, leases, deposits, commercial paper'],
  ['Owners and borrowed funds', 'Status, risk, return, control, cost and tax'],
  ['International finance', 'Banks abroad, agencies, capital markets; four instruments'],
  ['Choice of source', 'Nine factors, weighed together'],
], 'Summary table of Part 2: debentures, other borrowed funds, comparison, international finance and the choice of source');
const vTips2 = table(['Common mistake', 'Fix'], [
  ['Calling debenture holders owners', 'They are creditors with no vote'],
  ['Quoting public deposit or commercial paper rules with figures', 'State the idea in general terms and write as of 2024'],
  ['Mixing the American and Global receipts', 'American: traded in the United States; Global: outside it'],
  ['Listing factors with no link to the case', 'Tie each factor to a line of the case'],
], 'Exam tips table: four common mistakes about debenture holders, dated rules, depository receipts and factors with no link to the case');

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: "Business Finance and Owners' Funds",
  goals: [
    'Explain the nature of business finance and why a firm needs it',
    'Classify sources by period, ownership and source of generation',
    'Explain equity shares, preference shares and retained earnings, with merits and limitations',
    'Compute a cumulative arrear of preference dividend for an imagined firm',
  ],
  slides: [
    sl('title', "Business Finance and Owners' Funds", {
      b: 'Part 1: what business finance is, how sources are classified, and the funds that owners provide.',
      v: vRoute1,
      n: 'A new firm cannot make a single tile, loom or loaf without money. In this part we study what business finance is, how its sources are grouped, and the funds that the owners themselves provide through equity shares, preference shares and retained profit.',
    }),
    sl('concept', 'What is business finance?', {
      b: '**Business finance** means the funds that a business needs to start, run and grow.',
      v: vFin,
      n: 'Business finance means the funds that a business needs. Some of it buys long term assets and is called fixed capital. Some of it pays for daily operations and is called working capital. And some of it is needed for growth and expansion, such as a new branch, new products or a bigger plant.',
    }),
    sl('concept', 'Fixed capital and working capital', {
      v: vFixWc,
      bl: ['Fixed capital stays in the business for long', 'Working capital turns over again and again'],
      n: 'Fixed capital buys land, machinery and buildings, and it stays in the business for a long time. Working capital buys materials and pays wages, power and rent, and it turns over again and again. Our imagined firm, Chitra Tiles, pays for a kiln out of fixed capital and for clay and glaze out of working capital.',
    }),
    sl('check', 'Quick check: which capital?', {
      b: 'True or false: working capital buys land and machinery.',
      chk: 'tf_wc',
      n: 'Think about which funds are meant for long lived assets and which are meant for daily costs.',
    }),
    sl('diagram', 'Classifying sources of finance', {
      v: vTree,
      n: 'This tree shows three bases of classification. By period, a source is long term, medium term or short term. By ownership, it is an owners fund or a borrowed fund. By source of generation, it is internal, coming from inside the firm, or external, coming from outside.',
    }),
    sl('concept', 'The three bases with imagined examples', {
      v: vBases,
      n: 'By period, debentures are long term, a three year bank loan is medium term, and trade credit is short term. By ownership, equity shares are owners funds and a bank loan is a borrowed fund. By source of generation, profit kept in the firm is internal, while shares sold to the public are external.',
    }),
    sl('example', 'Worked example 1: the needs of a start-up', {
      b: 'Sutra Looms, an imagined hand-loom start-up, lists what it must buy. Find each need and the total.',
      bl: ['Step 1: Add the outlays on long-lived assets.', 'Step 2: Add the costs of the first month.', 'Step 3: Add the two to find the total.'],
      v: vNeedEx,
      n: `Looms and shed fitting together cost ${W(NEED.fixed)} rupees, which is fixed capital. Yarn, wages, and power and rent for the first month come to ${W(NEED.work)} rupees, which is working capital. The total need is ${W(NEED.total)} rupees. The founders must then decide which sources to use for each need.`,
    }),
    sl('concept', 'Classifying imagined sources', {
      v: vClsEx,
      n: 'A single source can be classified on all three bases at once. Profit that Bhumi Seeds keeps is long term, an owners fund and internal. An eight month bank loan is short term, borrowed and external. Debentures sold to investors are long term, borrowed and external.',
    }),
    sl('check', 'Quick check: classify the source', {
      b: 'An imagined seed company keeps part of its profit in the business. Choose the classification.',
      chk: 'mc_internal',
      n: 'Ask whether the money belongs to the owners, and whether it was generated inside the firm.',
    }),
    sl('concept', "Owners' funds: equity shares", {
      b: '**Equity shares** are the ownership capital of a company; holders get the residual claim and vote.',
      v: vEq,
      n: 'Equity shares are the ownership capital of a company. Holders are the owners. They get a residual claim, which means they receive what is left after all other claims are met. They vote on important matters, and their dividend varies with profit, since none is promised.',
    }),
    sl('concept', 'Merits and limitations of equity shares', {
      v: vEqML,
      n: 'Equity capital is permanent, since it is not repaid in the life of the company. There is no fixed burden of dividend, and voting rights give control. It also forms a base for raising loans. The limitations are the cost of issue, dilution of control by new holders, and a fluctuating return for investors.',
    }),
    sl('example', 'Worked example 2: raising funds by an equity issue', {
      b: 'Nirmaan Labs, an imagined start-up, issues new equity shares. Find the net amount and the effect on control.',
      bl: ['Step 1: Multiply shares by the issue price.', 'Step 2: Subtract the issue expenses.', "Step 3: Compare the promoters' holding before and after."],
      v: vEqEx,
      n: `Two lakh new shares at thirty rupees raise ${W(EQ.raise)} rupees. Issue expenses of four per cent are ${W(EQ.cost)} rupees, so the firm receives ${W(EQ.net)} rupees. The promoters held seventy five per cent of the old shares. After the issue they hold sixty per cent, which shows the dilution of control.`,
    }),
    sl('concept', 'Preference shares', {
      b: '**Preference shares** carry a fixed rate of dividend and a priority over equity shares.',
      v: vPref,
      n: 'Preference shares carry a fixed rate of dividend. Their holders are paid before equity holders, both in dividend and in the return of capital when a company is wound up. They generally do not vote on ordinary matters. They come in four pairs of types.',
    }),
    sl('diagram', 'Types of preference shares and debentures', {
      v: vTypes,
      n: 'The left half of this chart shows four pairs of preference shares. Cumulative or non cumulative. Participating or non participating. Convertible or non convertible. Redeemable or irredeemable. The right half shows pairs for debentures, which we study in the next part.',
    }),
    sl('check', 'Quick check: which kind of preference share?', {
      b: 'An imagined investor may exchange preference shares for equity shares after four years.',
      chk: 'mc_pref_conv',
      n: 'Think about the right to change the shares into another kind of share.',
    }),
    sl('example', 'Worked example 3: the arrear on cumulative preference shares', {
      b: 'Aadhar Polymers, an imagined firm, paid no preference dividend for two years. Find what is due in year three.',
      bl: ['Step 1: Find the dividend for one year.', 'Step 2: Multiply by the years unpaid.', 'Step 3: Add the current year and subtract from profit.'],
      v: vArrEx,
      n: `The yearly dividend is nine per cent of ${W(PREF.n * PREF.face)} rupees, which is ${W(PREF.annual)} rupees. Two unpaid years make an arrear of ${W(PREF.arrear)} rupees. In year three the firm owes ${W(PREF.due)} rupees. From a profit of ${W(PREF.profit)} rupees, ${W(PREF.left)} rupees is left for equity holders.`,
    }),
    sl('check', 'Quick check: find the arrear', {
      b: 'An imagined firm has cumulative preference shares and paid no dividend for three years. Choose the arrear.',
      chk: 'mc_arrear',
      n: 'Find one year dividend first, then count the unpaid years.',
    }),
    sl('concept', 'Equity shares and preference shares compared', {
      v: vEqPref,
      n: 'The dividend on equity varies with profit, while the dividend on preference shares is at a fixed rate. Preference holders are paid first, in dividend and in capital. Equity holders have full voting rights, while preference holders generally do not. And redeemable preference shares are repaid, while equity capital is not.',
    }),
    sl('concept', 'Retained earnings', {
      b: '**Retained earnings** are the part of profit that a firm keeps in the business instead of paying out; also called ploughing back of profits.',
      v: vRet,
      n: 'Retained earnings are the part of profit that a firm keeps in the business instead of paying out. This is also called ploughing back of profits. There is no cost of issue and no dilution of control. But shareholders may be unhappy with low dividends, and funds may sit idle.',
    }),
    sl('concept', 'Retained earnings in figures', {
      v: vRetEx,
      n: `Bhumi Seeds, an imagined firm, earned ${W(RET.profit)} rupees. It paid a dividend of sixty per cent of profit, which is ${W(RET.div)} rupees. The rest, ${W(RET.kept)} rupees, was retained. This sum is an owners fund, an internal source and a long term source.`,
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up. Firms need fixed capital, working capital and funds for growth. Sources are classified by period, ownership and source of generation. Equity shares are permanent and carry votes. Preference shares carry a fixed dividend with priority. Retained earnings are an internal source with no cost of issue.',
    }),
    sl('exam-tips', 'Exam tips', {
      v: vTips1,
      bl: ['Say what each capital is used for.', 'For a cumulative arrear, count the unpaid years.'],
      n: 'Some tips. Say what each kind of capital is used for. Treat preference holders as owners with priority, not as lenders. For a cumulative arrear, find one year dividend and multiply by the unpaid years. And always use an imagined firm in your examples, never a real company.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Borrowed Funds, International Financing and Choice of Source',
  goals: [
    'Explain debentures and compute the interest on an imagined issue',
    'Describe loans, trade credit, lease financing, public deposits, commercial paper and inter-corporate deposits',
    "Compare owners' funds and borrowed funds",
    'Explain international financing, the four instruments and the factors in choosing a source',
  ],
  slides: [
    sl('title', 'Borrowed Funds, International Financing and Choice of Source', {
      b: 'Part 2: money borrowed at home and abroad, and how a firm chooses among sources.',
      v: vRoute2,
      n: 'Owners seldom provide all the money. In this part we study borrowed funds such as debentures and loans, compare them with owners funds, look at finance raised abroad, and learn the factors a firm weighs in choosing a source.',
    }),
    sl('concept', 'Debentures', {
      b: 'A **debenture** is an acknowledgement of debt by a company, carrying a fixed rate of interest.',
      v: vDeb,
      n: 'A debenture is an acknowledgement of debt by a company. It carries a fixed rate of interest. The holder is a creditor, not an owner, and has no voting rights. Debentures come in four pairs of types, which the next chart shows.',
    }),
    sl('diagram', 'Types of debentures', {
      v: vTypes,
      n: 'The right half of this chart shows debentures. Secured debentures have a charge on assets, and unsecured ones have none. Registered debentures record the name of the holder, while bearer debentures pass by delivery. Convertible or non convertible. Redeemable or irredeemable.',
    }),
    sl('concept', 'Merits and limitations of debentures', {
      v: vDebML,
      n: 'Debentures give a fixed income to cautious investors and do not dilute control. Interest is tax deductible, and the firm can gain from trading on equity. But interest is a fixed burden even in a loss. The money must be repaid, and too much borrowing lowers borrowing capacity and raises financial risk.',
    }),
    sl('example', 'Worked example 1: interest on debentures', {
      b: 'Chitra Tiles, an imagined tile maker, issues debentures. Find the interest, and the cost after an imagined tax saving.',
      bl: ['Step 1: Multiply the number by the face value.', 'Step 2: Apply the rate of interest.', 'Step 3: Take off the tax saved on the interest.'],
      v: vDebEx,
      n: `Five thousand debentures of one thousand rupees raise ${W(DEB.total)} rupees. Interest at eleven per cent is ${W(DEB.int)} rupees a year. At an imagined tax rate of twenty five per cent, the tax saved is ${W(DEB.shield)} rupees, so the interest after the tax saving is ${W(DEB.net)} rupees.`,
    }),
    sl('check', 'Quick check: bearer debentures', {
      b: 'Debentures pass from one person to another by delivery of the certificate. Name the type.',
      chk: 'mc_deb_bearer',
      n: 'Think about whether the name of the holder is recorded in the books of the company.',
    }),
    sl('concept', 'Loans from banks and financial institutions', {
      v: vLoans,
      n: 'Commercial banks lend money for a stated period at interest, usually against security. Financial institutions are specialised bodies set up to give long term finance to industry and infrastructure. Our imagined firm, Vihaan Pumps, takes a four year bank loan against its land.',
    }),
    sl('concept', 'Trade credit and lease financing', {
      v: vTcLease,
      n: 'Trade credit is credit given by suppliers, and it is short term. Chitra Tiles pays for clay after forty five days. In lease financing, the lessor lets the lessee use an asset for lease rentals. Madhur Bakers hires an oven for five years instead of buying it.',
    }),
    sl('example', 'Worked example 2: what credit and a lease mean in rupees', {
      b: 'Work out the finance given by trade credit and the extra cost of a lease over a purchase.',
      bl: ['Step 1: Multiply the daily purchase by the days of credit.', 'Step 2: Multiply the rent by the months.', 'Step 3: Subtract the price of the oven.'],
      v: vTcEx,
      n: `Clay at eight thousand rupees a day on forty five days of credit means the suppliers finance ${W(TC.fund)} rupees. Lease rent of eighteen thousand rupees for sixty months totals ${W(LEASE.total)} rupees. The oven would have cost ${W(LEASE.price)} rupees, so the lease costs ${W(LEASE.extra)} rupees more in all, in return for no large outlay at the start.`,
    }),
    sl('concept', 'Public deposits, commercial paper and inter-corporate deposits', {
      v: vOthers,
      n: 'As of two thousand twenty four, public deposits are deposits that companies accept from the public under rules. Commercial paper is an unsecured promissory note for short term needs, issued by large firms. Inter corporate deposits are deposits that one company places with another for a short period.',
    }),
    sl('check', 'Quick check: match situation and source', {
      b: 'Match four imagined situations with the source of finance.',
      chk: 'mt_source_clue',
      n: 'For each situation, decide who provides the money and for how long.',
    }),
    sl('diagram', "Owners' funds and borrowed funds compared", {
      v: vCmp,
      n: 'This chart compares the two on six bases. Owners are owners and lenders are creditors. Owners funds carry no repayment duty, while borrowed funds must be repaid. Owners get a varying dividend, lenders get fixed interest. Owners vote, lenders generally do not. Interest is tax deductible, but dividend comes from profit after tax.',
    }),
    sl('example', 'Worked example 3: loan or equity?', {
      b: 'Vihaan Pumps, an imagined firm, weighs a bank loan. Find the interest and the result in a good and in a poor year.',
      bl: ['Step 1: Find the yearly interest.', 'Step 2: Subtract it from profit before interest in a good year.', 'Step 3: Do the same for a poor year and judge the risk.'],
      v: vLoanEx,
      n: `Interest on forty lakh rupees at twelve per cent is ${W(LOAN.int)} rupees a year. In a good year, ${W(LOAN.left)} rupees is left after interest. In a poor year the firm falls short by ${W(-LOAN.gap)} rupees, and the interest is still due. Equity shares carry no such burden, but they dilute control.`,
    }),
    sl('concept', 'International financing: sources', {
      v: vIntlSrc,
      n: 'A firm may also raise finance abroad. Commercial banks abroad give loans in foreign currency. Development banks set up by many countries lend money for large projects. And international capital markets let firms raise funds through instruments such as depository receipts and convertible bonds.',
    }),
    sl('diagram', 'International sources and instruments', {
      v: vIntl,
      n: 'This chart shows three sources abroad. Commercial banks, international agencies and development banks, and international capital markets. Under the capital markets are four instruments. The Global Depository Receipt, the American Depository Receipt, the Indian Depository Receipt and the Foreign Currency Convertible Bond.',
    }),
    sl('concept', 'Depository receipts and convertible bonds', {
      v: vInstr,
      n: 'A Global Depository Receipt is issued by a depository bank against shares and traded outside the United States, and its holders have no voting rights. An American Depository Receipt is traded in the United States. An Indian Depository Receipt is issued in India by a foreign company. A Foreign Currency Convertible Bond is in foreign currency and can become shares.',
    }),
    sl('check', 'Quick check: name the receipt', {
      b: 'An imagined foreign company offers receipts to Indian investors on an Indian exchange. Name them.',
      chk: 'mc_idr_id',
      n: 'Think about where the receipts are issued and by whom.',
    }),
    sl('diagram', 'Factors affecting the choice of source', {
      v: vFactors,
      n: 'This web has the choice of source in the middle and nine factors around it. Cost. Financial strength and stability. Form of organisation and legal status. Purpose and time period. Risk profile. Control. Effect on creditworthiness. Flexibility and ease. And tax benefits.',
    }),
    sl('concept', 'The factors and what to ask', {
      v: vFactTbl,
      n: 'Ask what each source costs to raise and to service. Ask whether steady income can bear fixed charges. Ask whether the legal form of the firm allows the source. Match the period to the purpose of the funds. And weigh the risk of the source for this firm. Four more factors follow on the next slide.',
    }),
    sl('check', 'Quick check: which factor decided?', {
      b: 'Promoters pick a loan so that no outsider gains a vote. Name the factor.',
      chk: 'mc_factor_control',
      v: vFactTbl2,
      n: 'The other four factors are control, effect on creditworthiness, flexibility and ease, and tax benefits. Think about which of these the promoters had in mind.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up. Debentures are debt with fixed interest, and the interest is tax deductible. Other borrowed funds include bank loans, trade credit, leases, deposits and commercial paper. Firms can also raise funds abroad through banks, agencies and capital markets. A firm weighs nine factors in choosing a source.',
    }),
    sl('exam-tips', 'Exam tips', {
      v: vTips2,
      bl: ['Debenture holders are creditors.', 'Give rules in general terms and add as of 2024.'],
      n: 'Some tips. Remember that debenture holders are creditors with no vote. For public deposits and commercial paper, state the idea in general terms and add as of two thousand twenty four. Do not mix up the American and Global receipts. And tie every factor of choice to a line of the case.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Sources of Business Finance: notes',
  sections: [
    {
      h: '1. Business finance and the classification of sources',
      t: 1,
      b: '**Business finance** means the funds that a business needs. **Fixed capital** is needed for long-term assets such as land, machinery and buildings. **Working capital** is needed for day-to-day operations such as materials, wages, power and rent. Funds are also needed for **growth and expansion**.\n\n**Classification of sources:**\n1. **By period:** long-term, medium-term, short-term.\n2. **By ownership:** owners\' funds and borrowed funds.\n3. **By source of generation:** internal (from inside the firm) and external (from outside).\n\n**Worked check:** looms Rs 12,00,000 plus shed fitting Rs 3,00,000 make fixed capital of Rs 15,00,000; yarn, wages and power of Rs 6,00,000 make working capital; the total need is Rs 21,00,000.',
      terms: [['Fixed capital', 'Funds needed for long-term assets that stay in the business.'], ['Working capital', 'Funds needed for the day-to-day operations of a business.'], ['Internal source', 'A source generated inside the firm, such as retained earnings.']],
      v: vTree,
      vs: [vFin, vBases],
    },
    {
      h: '2. Equity shares and retained earnings',
      t: 2,
      b: '**Equity shares** are the ownership capital of a company. Holders have a residual claim and voting rights.\n\n**Merits:** permanent capital; no fixed burden of dividend; voting rights give control; a base for raising loans.\n**Limitations:** cost of issue; dilution of control; a fluctuating return for investors; dividend is not tax-deductible.\n\n**Retained earnings** (ploughing back of profits) are profit kept in the business. **Merits:** no issue cost, no repayment date, no dilution of control. **Limitations:** shareholders may be dissatisfied with small dividends; funds may be kept without a good use.\n\n**Worked check:** 2,00,000 shares at Rs 30 raise Rs 60,00,000; expenses of 4 per cent are Rs 2,40,000; the net amount is Rs 57,60,000; promoters fall from 75 to 60 per cent.',
      terms: [['Equity shares', 'Ownership capital of a company; holders have residual claims and voting rights.'], ['Retained earnings', 'The part of profit kept in the business instead of being paid out; also called ploughing back of profits.']],
      v: vEq,
      vs: [vEqML, vEqEx, vRet, vRetEx],
    },
    {
      h: '3. Preference shares',
      t: 2,
      b: '**Preference shares** carry a fixed rate of dividend and a priority over equity shares, both in the payment of dividend and in the return of capital.\n\n**Types:**\n1. **Cumulative** (unpaid dividend carried forward) and **non-cumulative** (lost).\n2. **Participating** (share in surplus profit) and **non-participating**.\n3. **Convertible** (may become equity) and **non-convertible**.\n4. **Redeemable** (repaid after a period) and **irredeemable** (repaid at winding up).\n\n**Worked check:** 20,000 shares of Rs 100 at 9 per cent carry Rs 1,80,000 a year; two unpaid years make an arrear of Rs 3,60,000; in year three Rs 5,40,000 is due before any equity dividend.',
      terms: [['Preference shares', 'Shares with a fixed rate of dividend and priority over equity shares.'], ['Cumulative preference shares', 'Preference shares whose unpaid dividend is carried forward and paid later.']],
      v: vTypes,
      vs: [vPref, vArrEx, vEqPref],
    },
    {
      h: '4. Debentures and loans',
      t: 2,
      b: '**Debentures** are an acknowledgement of debt by a company, carrying fixed interest. Holders are creditors, not owners.\n\n**Types:** secured and unsecured; registered and bearer; convertible and non-convertible; redeemable and irredeemable.\n**Merits:** fixed income for investors; no dilution of control; interest is tax-deductible; trading on equity. **Limitations:** a fixed burden of interest; repayment is due; too much borrowing lowers borrowing capacity.\n\n**Loans from commercial banks:** money lent for a stated period at interest, usually against security. **Loans from financial institutions:** long-term finance from specialised institutions, stated.\n\n**Worked check:** 5,000 debentures of Rs 1,000 raise Rs 50,00,000; interest at 11 per cent is Rs 5,50,000; at an imagined tax rate of 25 per cent the tax saved is Rs 1,37,500 and the net cost is Rs 4,12,500.',
      terms: [['Debenture', 'An acknowledgement of debt by a company, carrying a fixed rate of interest.'], ['Secured debenture', 'A debenture backed by a charge on the assets of the company.']],
      v: vTypes,
      vs: [vDeb, vDebML, vDebEx, vLoans],
    },
    {
      h: '5. Trade credit, lease, deposits and the comparison of funds',
      t: 2,
      b: '**Trade credit:** credit given by suppliers; short-term. **Lease financing:** the **lessor** owns the asset and lets the **lessee** use it for regular **lease rentals**. **Public deposits:** deposits that companies accept from the public under rules. **Commercial paper:** an unsecured promissory note for short-term needs, issued by large firms. **Inter-corporate deposits:** deposits that one company places with another for a short period.\n\n**Dated note, as of 2024:** public deposits and commercial paper are governed by rules that change; state the idea in general terms and check the present position.\n\n**Owners\' funds against borrowed funds:** status (owners against creditors); risk (no repayment duty against repayment due); return (varying dividend against fixed interest); control (votes against none); cost (higher against lower); tax (interest is tax-deductible, dividend is paid from profit after tax).\n\n**Worked check:** clay at Rs 8,000 a day on 45 days of credit means suppliers finance Rs 3,60,000; a lease at Rs 18,000 for 60 months totals Rs 10,80,000 against a price of Rs 8,00,000.',
      terms: [['Trade credit', 'Credit given by a supplier that lets a buyer pay after a period.'], ['Lease financing', 'The use of an asset owned by a lessor, in return for lease rentals paid by the lessee.'], ['Commercial paper', 'An unsecured promissory note for short-term needs, issued by large firms (as of 2024).']],
      v: vCmp,
      vs: [vTcLease, vTcEx, vOthers, vCpEx],
    },
    {
      h: '6. International financing',
      t: 3,
      b: '**Sources abroad:** commercial banks abroad (loans in foreign currency); international agencies and development banks (loans and help for projects); international capital markets.\n\n**Instruments:**\n1. **Global Depository Receipt:** a receipt issued by a depository bank against shares, traded in markets outside the United States; holders have no voting rights.\n2. **American Depository Receipt:** traded in the United States against the shares of a foreign company.\n3. **Indian Depository Receipt:** issued in India by a foreign company.\n4. **Foreign Currency Convertible Bond:** a bond issued in a foreign currency and convertible into shares on stated terms.\n\n**Worked check:** 4,00,000 shares at 2 shares a receipt make 2,00,000 receipts; at 12 United States dollars each the issue is 24,00,000 United States dollars; at an imagined Rs 80 a dollar it is Rs 19,20,00,000.',
      terms: [['Global Depository Receipt', 'A receipt issued by a depository bank against shares and traded outside the United States; holders have no voting rights.'], ['Foreign Currency Convertible Bond', 'A bond issued in a foreign currency that can be converted into shares on stated terms.']],
      v: vIntl,
      vs: [vIntlSrc, vInstr],
    },
    {
      h: '7. Factors affecting the choice of source',
      t: 3,
      b: 'A firm weighs nine factors:\n1. **Cost** of raising and servicing the source.\n2. **Financial strength and stability of operations.**\n3. **Form of organisation and legal status.**\n4. **Purpose and time period.**\n5. **Risk profile.**\n6. **Control.**\n7. **Effect on creditworthiness.**\n8. **Flexibility and ease.**\n9. **Tax benefits.**\n\nNo single factor decides; the manager balances them. A firm with uncertain income may prefer equity to avoid fixed interest; promoters who wish to keep control may prefer a loan to new shares.\n\n**Worked check:** a loan of Rs 40,00,000 at 12 per cent costs Rs 4,80,000 a year; a good year leaves Rs 4,20,000, a poor year falls short by Rs 1,80,000.',
      terms: [['Risk profile', 'The degree of risk that a source places on a firm, such as the burden of fixed interest.']],
      v: vFactors,
      vs: [vFactTbl, vFactTbl2, vLoanEx],
    },
  ],
  tips: '**Common mistakes**\n- Treating working capital as a long-term need; it meets daily costs.\n- Calling preference shareholders creditors; they are owners with priority.\n- Forgetting to count all unpaid years in a cumulative arrear.\n- Calling debenture holders owners; they are creditors with no vote.\n- Quoting rules for public deposits or commercial paper with figures; state the idea in general terms and write as of 2024.\n- Mixing the American and Global receipts.\n- Listing factors of choice with no link to the case.\n- Naming real companies; use imagined ones.\n\n**How marks are usually awarded**\n- 1 mark: a correct option or a quoted line from the case.\n- 2 and 3 marks: one point per merit, type, source or factor, with a short explanation.\n- 5 marks: five points, each with an explanation, in a numbered list.\n- Case questions: quote the line, name the source, show the working for a figure.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['**Business finance**', 'The funds that a business needs to start, run and grow.', 'definition', 1],
  ['**Fixed capital**', 'Funds needed for long-term assets such as land, machinery and buildings.', 'definition', 1],
  ['**Working capital**', 'Funds needed for the day-to-day operations of a business.', 'definition', 1],
  ['Three bases of classification', 'Period; ownership; source of generation.', 'fact', 1],
  ['Classes by period', 'Long-term; medium-term; short-term.', 'fact', 1],
  ['Internal and external sources', 'Internal: generated inside the firm, such as retained earnings. External: from outside the firm.', 'concept', 1],
  ['**Equity shares**', 'Ownership capital of a company; holders get residual claims and voting rights.', 'definition', 2],
  ['Merits of equity shares', 'Permanent capital; no fixed burden; voting rights; a credit base.', 'fact', 2],
  ['Limitations of equity shares', 'Cost of issue; dilution of control; a fluctuating return for investors.', 'fact', 2],
  ['**Preference shares**', 'Shares with a fixed rate of dividend and priority over equity in dividend and in return of capital.', 'definition', 2],
  ['Four pairs of preference shares', 'Cumulative or non-cumulative; participating or non-participating; convertible or non-convertible; redeemable or irredeemable.', 'fact', 2],
  ['**Cumulative preference shares**', 'Unpaid dividend is carried forward and paid before equity holders get anything.', 'definition', 2],
  ['How to find a cumulative arrear', 'Dividend for one year multiplied by the number of unpaid years.', 'exam-tip', 2],
  ['**Retained earnings**', 'Profit kept in the business instead of being paid out; ploughing back of profits.', 'definition', 2],
  ['Merits of retained earnings', 'No issue cost; no repayment date; no dilution of control.', 'fact', 2],
  ['Limitation of retained earnings', 'Shareholders may be unhappy with low dividends.', 'concept', 2],
  ['**Debenture**', 'An acknowledgement of debt by a company, carrying a fixed rate of interest.', 'definition', 2],
  ['Four pairs of debentures', 'Secured or unsecured; registered or bearer; convertible or non-convertible; redeemable or irredeemable.', 'fact', 2],
  ['Merits of debentures', 'Fixed income for investors; no dilution of control; tax-deductible interest; trading on equity.', 'fact', 2],
  ['Limitations of debentures', 'Fixed burden of interest; repayment due; lower borrowing capacity.', 'fact', 2],
  ['**Trade credit**', 'Credit given by suppliers that lets a buyer pay after a period; short-term.', 'definition', 2],
  ['**Lease financing**', 'A lessor lets a lessee use an asset in return for regular lease rentals.', 'definition', 2],
  ['**Commercial paper**', 'An unsecured promissory note for short-term needs, issued by large firms (as of 2024).', 'definition', 2],
  ['**Inter-corporate deposit**', 'A deposit that one company places with another for a short period.', 'definition', 2],
  ['Owners\' funds against borrowed funds: tax', 'Interest is tax-deductible; dividend is paid from profit after tax.', 'exam-tip', 2],
  ['Owners\' funds against borrowed funds: control', 'Owners have voting rights; lenders generally have none.', 'concept', 2],
  ['Three sources of international finance', 'Commercial banks abroad; international agencies and development banks; international capital markets.', 'fact', 3],
  ['**Global Depository Receipt**', 'A receipt issued by a depository bank against shares, traded outside the United States; no voting rights.', 'definition', 3],
  ['**American Depository Receipt**', 'A receipt traded in the United States against the shares of a foreign company.', 'definition', 3],
  ['**Indian Depository Receipt**', 'A receipt issued in India by a foreign company.', 'definition', 3],
  ['**Foreign Currency Convertible Bond**', 'A bond issued in a foreign currency and convertible into shares on stated terms.', 'definition', 3],
  ['Factors in the choice of a source', 'Cost; financial strength; form of organisation; purpose and period; risk; control; creditworthiness; flexibility; tax benefits.', 'fact', 3],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-11-default-chapter-test-short',
  title: 'Chapter test (short): Sources of Business Finance',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A: Objective (1 mark each)', instr: 'Questions 1 to 4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['mc_fixed_id', 'mc_pref_cum_id', 'mc_gdr_vote', 'ar_pref_prior'] },
    { id: 'B', title: 'Section B: Short answer (2 and 3 marks)', instr: 'Answer the 2-mark questions in about 30 to 50 words and the 3-mark question in about 50 to 80 words.', items: ['s2_fixed_wc', 's2_pref_def', 's3_need'] },
    { id: 'C', title: 'Section C: Long answer (5 marks)', instr: 'Answer any ONE of the two questions in about 80 to 120 words.', items: [{ attempt: 1, keys: ['l_classify', 'l_pref_types'] }] },
    { id: 'D', title: 'Section D: Case-based (4 marks)', instr: 'Read the case and answer all parts. Part (c) has an internal choice.', items: ['cb_sutra'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-11-default-chapter-test-long',
  title: 'Chapter test (long): Sources of Business Finance',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A: Objective (1 mark each)', instr: 'Questions 1 to 10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['mc_wc_id', 'mc_eq_vote', 'mc_deb_int', 'mc_bank_loan', 'mc_lease', 'mc_adr_id', 'mc_fccb_id', 'mc_factor_cost', 'ar_deb_tax', 'ar_fccb'] },
    { id: 'B', title: 'Section B: Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30 to 50 words and 3-mark questions in about 50 to 80 words. Questions 13 and 15 have an internal choice.', items: ['s2_basis', 's2_trade', { attempt: 1, keys: ['s2_gdr', 's2_adr_idr'] }, 's3_eq_merits', { attempt: 1, keys: ['s3_factors', 's3_intl'] }] },
    { id: 'C', title: 'Section C: Long answer (5 marks)', instr: 'Answer question 16, and any ONE of questions 17 and 18, in about 80 to 120 words each.', items: ['l_cmp', { attempt: 1, keys: ['l_instr', 'l_factors'] }] },
    { id: 'D', title: 'Section D: Case-based (4 marks each)', instr: 'Read each case and answer all parts. Part (c) of each has an internal choice.', items: ['cb_chitra', 'cb_tarang'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01 to t03 of cbse-11-business-studies-ch07 only (need for finance and classification; owners funds and borrowed funds; international financing and choice of source)',
    originality: 'every firm, start-up, exporter and investor is imagined and written by SOYL; no real company is named; no NCERT text, example or exercise and no board or sample-paper item reused (D-036)',
    data: 'figures computed in the build: debenture interest and tax saving; cumulative preference arrears; equity issue proceeds and control; start-up capital needs; trade credit and lease totals; loan interest; retained profit; depository receipt count and value',
    facts: 'dated as of 2024: public deposits, commercial paper and depository receipts described in general terms only, with no rates or limits',
    gate: 'schema, pipeline lint, deterministic verify, word limits, narration and answer-leak checks run clean in this build',
  },
});
