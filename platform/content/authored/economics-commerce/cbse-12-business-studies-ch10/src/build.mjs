// Build CBSE 12 Business Studies ch10 Financial Markets. Run from platform/:
//   npx tsx content/authored/economics-commerce/cbse-12-business-studies-ch10/src/build.mjs
import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from './lib.mjs';

setUnit('cbse-12-business-studies-ch10', 'economics-commerce');
const { inr, TB, TB_PAID, TB_RECEIVED, TB_GAIN, BR, BR_VALUE, BR_FEE, RI, RI_SHARES, RI_COST } = await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- worked-example figures (computed)
// Deck 1: a 182-day treasury bill bought by an imagined pension fund (different from the bank item).
const WT = { face: 100, price: 96.5, bills: 10000 };
const WT_PAID = Math.round(WT.price * WT.bills); // 9,65,000
const WT_RECEIVED = WT.face * WT.bills; // 10,00,000
const WT_GAIN = WT_RECEIVED - WT_PAID; // 35,000
assert.equal(WT_PAID, 965000);
assert.equal(WT_RECEIVED, 1000000);
assert.equal(WT_GAIN, 35000);
// Deck 2: a sale of shares by an imagined investor through a broker.
const WS = { shares: 250, price: 640, ratePct: 0.2 };
const WS_VALUE = WS.shares * WS.price; // 1,60,000
const WS_FEE = (WS_VALUE * WS.ratePct) / 100; // 320
const WS_NET = WS_VALUE - WS_FEE; // 1,59,680
assert.equal(WS_VALUE, 160000);
assert.equal(WS_FEE, 320);
assert.equal(WS_NET, 159680);

// ---------------------------------------------------------------- visuals
const vRoute1 = flow('LR', ['What a financial market is', 'Its four functions', 'The money market', 'Five money market instruments', 'Worked examples'], 'Route map of Part 1: what a financial market is, its four functions, the money market, five money market instruments, and worked examples', 'Part 1 at a glance');
const vRoute2 = flow('LR', ['The capital market', 'Primary and secondary markets', 'Methods of floatation', 'Stock exchange and trading', 'SEBI'], 'Route map of Part 2: the capital market, primary and secondary markets, methods of floatation, the stock exchange and trading, and SEBI', 'Part 2 at a glance');
const vSaversInvestors = flow('LR', ['Households save', 'Financial market (banks, exchanges, brokers)', 'Firms invest in plant and machinery', 'Output, jobs and returns to savers'], 'Flow showing households saving, the financial market of banks, exchanges and brokers channelling the money, firms investing in plant and machinery, and output, jobs and returns flowing back to savers', 'The financial market links savers and investors');
const vFunctions = table(
  ['Function', 'What it means', 'Imagined example'],
  [
    ['Mobilisation of savings', 'Idle savings are collected and sent to productive uses', 'A teacher in Ajmer buys bonds of a road company'],
    ['Price discovery', 'Demand and supply settle the price of a financial asset', 'Shares of a tea company rise as buyers outnumber sellers'],
    ['Liquidity', 'Financial assets can be turned into cash quickly', 'A shopkeeper sells his bonds to pay for a wedding'],
    ['Reducing cost of transactions', 'Ready information saves time, effort and money', 'Prices are visible on the broker\'s app, so no search is needed'],
  ],
  'Table of the four functions of financial markets, their meaning and an imagined example of each: mobilisation of savings, price discovery, liquidity, and reducing the cost of transactions',
);
const vTwoMarkets = flow('TB', ['Financial market', 'Money market: short-term funds, up to one year', 'Capital market: medium- and long-term funds'], 'Flow dividing the financial market into the money market for short-term funds up to one year and the capital market for medium- and long-term funds', 'Two parts of the financial market', [{ from: 'n1', to: 'n2' }, { from: 'n1', to: 'n3' }]);
const vMmParticipants = table(
  ['Participant', 'Typical role'],
  [
    ['Reserve Bank of India', 'Issues treasury bills for the government; manages liquidity'],
    ['Commercial banks', 'Lend and borrow call money; issue certificates of deposit'],
    ['Large companies', 'Issue commercial paper; discount commercial bills'],
    ['Mutual funds and NBFCs', 'Invest surplus funds for short periods'],
  ],
  'Table of money market participants: the Reserve Bank of India issues treasury bills, commercial banks deal in call money and certificates of deposit, large companies issue commercial paper and discount bills, and mutual funds and NBFCs invest surplus funds',
);
const vTbill = table(
  ['Feature', 'Treasury bill'],
  [
    ['Issuer', 'RBI on behalf of the Central Government'],
    ['Maturity', '91, 182 or 364 days'],
    ['Return', 'Issued at a discount, repaid at face value (zero-coupon)'],
    ['Risk', 'Virtually none: repayment is assured by the government'],
  ],
  'Table of treasury bill features: issued by the RBI for the Central Government, maturity of 91, 182 or 364 days, issued at a discount and repaid at face value, and virtually no risk',
);
const vTbillBars = (() => {
  const s = new Svg(420, 260);
  const c = s.chart({ x0: 0, x1: 3, y0: 0, y1: 12, left: 70, top: 30, width: 300, height: 180, xLabel: 'Pension fund', yLabel: '₹ lakh' });
  const bars = [[1, WT_PAID / 100000, 'Paid'], [2, WT_RECEIVED / 100000, 'Received']];
  for (const [x, v, lab] of bars) {
    s.rect(c.X(x - 0.3), c.Y(v), c.X(x + 0.3) - c.X(x - 0.3), c.Y(0) - c.Y(v), { rx: 2, fill: x === 1 ? 'muted' : 'accent', fillOpacity: 0.85, sw: 1.2 });
    c.label([x, v], `${inr(v * 100000)}`, { dy: -12, size: 12 });
    c.xTick(x, lab);
  }
  c.yTick(4, '4').yTick(8, '8').yTick(12, '12');
  return s.visual(
    `Bar chart of an imagined pension fund's treasury bills: it pays ${inr(WT_PAID)} rupees for ${inr(WT.bills)} bills and receives ${inr(WT_RECEIVED)} rupees at maturity, a gain of ${inr(WT_GAIN)} rupees`,
    `Imagined figures: ${inr(WT.bills)} bills at ₹${WT.price.toFixed(2)}, repaid at ₹${WT.face}.`,
  );
})();
const vCpCd = table(
  ['Instrument', 'Issued by', 'Maturity', 'Typical use'],
  [
    ['Commercial paper', 'Large, creditworthy companies', '15 days to one year', 'Working capital; bridge financing before a share issue'],
    ['Certificate of deposit', 'Commercial banks and development financial institutions', 'Short term', 'Raising funds when deposits grow slowly'],
  ],
  'Table comparing commercial paper, issued by large creditworthy companies for 15 days to one year for working capital or bridge financing, with certificates of deposit, issued by banks and development financial institutions to raise funds',
);
const vCallMoney = flow('LR', ['Ganga Bank short of its required reserve (imagined)', 'Borrows overnight from Yamuna Bank', 'Repays on demand next day with interest at the call rate'], 'Flow of an imagined call money loan: one bank short of its required reserve borrows overnight from another and repays on demand with interest at the call rate', 'Call money: interbank, one day to 15 days');
const vCommBill = flow('LR', ['Seller supplies goods on 90 days\' credit', 'Buyer accepts a bill of exchange', 'Bank accepts it: a commercial bill', 'Seller discounts it for cash now'], 'Flow of a commercial bill: the seller supplies goods on credit, the buyer accepts a bill of exchange, a bank accepts it, and the seller discounts it for cash now', 'Commercial bill: finance for working capital');
const vInstruments = table(
  ['Instrument', 'Issuer', 'Period', 'Key word'],
  [
    ['Treasury bill', 'Central Government (via RBI)', '91 / 182 / 364 days', 'Discount'],
    ['Commercial paper', 'Large companies', '15 days to 1 year', 'Unsecured note'],
    ['Call money', 'Banks (interbank)', '1 to 15 days', 'On demand'],
    ['Certificate of deposit', 'Banks and DFIs', 'Short term', 'Bearer, negotiable'],
    ['Commercial bill', 'Trade bill accepted by a bank', 'Short term', 'Discounting'],
  ],
  'Summary table of five money market instruments with issuer, period and key word: treasury bill, commercial paper, call money, certificate of deposit and commercial bill',
);
const vSummary1 = table(
  ['Remember', 'Key point'],
  [
    ['Financial market', 'Creation and exchange of financial assets; links savers and investors'],
    ['Four functions', 'Savings, price discovery, liquidity, low transaction cost'],
    ['Money market', 'Short-term funds, up to one year'],
    ['Instruments', 'T-bill, CP, call money, CD, commercial bill'],
  ],
  'Summary table of Part 1: the financial market links savers and investors, has four functions, the money market deals in short-term funds, and its five instruments',
);
const vTips1 = table(
  ['Common mistake', 'Write instead'],
  [
    ['T-bills are issued by banks', 'Issued by the RBI on behalf of the Central Government'],
    ['Commercial paper is secured', 'It is an unsecured promissory note'],
    ['Call money is for companies', 'It is mainly interbank, repayable on demand'],
    ['Mixing CP and CD', 'CP: companies. CD: banks and DFIs'],
  ],
  'Exam tips table of common mistakes: treasury bills are issued by the RBI for the government, commercial paper is unsecured, call money is mainly interbank, and commercial paper is issued by companies while certificates of deposit are issued by banks',
);
// Part 2
const vCmFeatures = table(
  ['Basis', 'Money market', 'Capital market'],
  [
    ['Duration', 'Up to one year', 'Medium and long term'],
    ['Instruments', 'T-bills, CP, CD, call money, commercial bills', 'Shares, debentures, bonds'],
    ['Investment outlay', 'Large sums', 'Small amounts are possible'],
    ['Liquidity and safety', 'Higher', 'Lower'],
    ['Expected return', 'Lower', 'Higher'],
  ],
  'Table comparing the money market and the capital market on duration, instruments, investment outlay, liquidity and safety, and expected return',
);
const vPrimSec = (() => {
  const s = new Svg(460, 260);
  s.rect(20, 30, 130, 56, { color: 'accent', sw: 2 }).text(85, 50, 'Company', { bold: true }).text(85, 70, '(new issue)', { size: 12, muted: true });
  s.rect(310, 30, 130, 56, { sw: 2 }).text(375, 50, 'Investors', { bold: true }).text(375, 70, '(first buyers)', { size: 12, muted: true });
  s.arrow(310, 48, 154, 48, { color: 'accent', sw: 2 });
  s.text(232, 38, 'Money for new shares', { size: 12, color: 'accent' });
  s.arrow(150, 70, 306, 70, { sw: 1.6, dash: true });
  s.text(228, 84, 'Shares allotted', { size: 12 });
  s.text(230, 120, 'Primary market: money reaches the company', { size: 13, bold: true });
  s.rect(20, 160, 130, 56, { sw: 2 }).text(85, 188, 'Investor A', { bold: true });
  s.rect(310, 160, 130, 56, { sw: 2 }).text(375, 188, 'Investor B', { bold: true });
  s.rect(170, 168, 120, 40, { color: 'blue', sw: 2 }).text(230, 188, 'Stock exchange', { size: 12, color: 'blue' });
  s.arrow(150, 188, 168, 188, { sw: 1.6 });
  s.arrow(310, 188, 292, 188, { sw: 1.6 });
  s.text(230, 240, 'Secondary market: existing shares change hands', { size: 13, bold: true });
  return s.visual(
    'Diagram contrasting the two markets: in the primary market investors pay money to the company and receive new shares; in the secondary market investor A and investor B trade existing shares through the stock exchange, and the company receives nothing',
    'The company gets money only in the primary market.',
  );
})();
const vPrimSecTable = table(
  ['Basis', 'Primary market', 'Secondary market'],
  [
    ['Securities', 'New, issued for the first time', 'Existing, already issued'],
    ['Seller', 'The company (or intermediaries for it)', 'Investors'],
    ['Capital formation', 'Direct', 'Indirect, through liquidity'],
    ['Location', 'No fixed place', 'Stock exchange'],
    ['Price', 'Set by the company', 'Set by demand and supply'],
  ],
  'Table comparing primary and secondary markets on securities, seller, capital formation, location and price',
);
const vFloatation = table(
  ['Method', 'Who gets the offer first', 'Distinctive feature'],
  [
    ['Offer through prospectus', 'The public', 'Prospectus invites subscription; often underwritten'],
    ['Offer for sale', 'Intermediaries (issuing houses, brokers)', 'They buy at an agreed price and resell to the public'],
    ['Private placement', 'Institutional investors, select individuals', 'Quick and cheap'],
    ['Rights issue', 'Existing shareholders', 'In proportion to their holding'],
    ['e-IPO', 'The public, online', 'Through the stock exchange\'s network and registered brokers'],
  ],
  'Table of five methods of floatation: offer through prospectus to the public, offer for sale through intermediaries, private placement to institutions, rights issue to existing shareholders, and e-IPO online through the stock exchange',
);
const vRights = table(
  ['Step', 'Working'],
  [
    ['Ratio', `${RI.newPer} new for every ${RI.held} held`],
    ['Blocks held', `${inr(RI.holding)} ÷ ${RI.held} = ${RI.holding / RI.held}`],
    ['Rights shares', `${RI.holding / RI.held} × ${RI.newPer} = ${RI_SHARES}`],
    ['Amount payable at ₹' + RI.price, `${RI_SHARES} × ${RI.price} = ₹${inr(RI_COST)}`],
  ],
  `Worked example table of an imagined rights issue: ${RI.newPer} new shares for every ${RI.held}, so a holder of ${inr(RI.holding)} shares gets ${RI_SHARES} rights shares costing ${inr(RI_COST)} rupees`,
  'Imagined company and figures.',
);
const vSeFunctions = table(
  ['Function of a stock exchange', 'In one line'],
  [
    ['Liquidity and marketability', 'Existing securities can be sold any time'],
    ['Pricing of securities', 'Demand and supply value companies continuously'],
    ['Safety of transactions', 'Trading under rules and a legal framework'],
    ['Economic growth', 'Savings move to the most profitable firms'],
    ['Spreading the equity cult', 'Education and disclosure draw new investors'],
    ['Scope for speculation', 'Limited, healthy speculation keeps trading active'],
  ],
  'Table of six functions of a stock exchange: liquidity and marketability, pricing of securities, safety of transactions, economic growth, spreading the equity cult, and limited scope for speculation',
);
const vTrading = flow('TB', ['Open trading account (broker) and demat account (depository participant)', 'Place the order', 'Order matched and executed online', 'Contract note issued', 'Settlement: money paid, shares delivered'], 'Flow of the trading and settlement procedure: open trading and demat accounts, place the order, the order is matched and executed online, a contract note is issued, and settlement completes the trade', 'Trading procedure');
const vDemat = flow('LR', ['Investor', 'Depository participant (bank or broker)', 'Depository (NSDL or CDSL)', 'Electronic holding of shares'], 'Flow showing an investor dealing with a depository participant, which connects to a depository, NSDL or CDSL, where shares are held electronically', 'Dematerialisation');
const vSale = table(
  ['Step', 'Working (₹)'],
  [
    ['Value of sale', `${WS.shares} × ${WS.price} = ${inr(WS_VALUE)}`],
    [`Brokerage at ${WS.ratePct} per cent`, `${inr(WS_VALUE)} × ${WS.ratePct} ÷ 100 = ${inr(WS_FEE)}`],
    ['Amount received', `${inr(WS_VALUE)} − ${inr(WS_FEE)} = ${inr(WS_NET)}`],
  ],
  `Worked example table: an imagined investor sells ${WS.shares} shares at ${WS.price} rupees for ${inr(WS_VALUE)} rupees, pays brokerage of ${WS_FEE} rupees and receives ${inr(WS_NET)} rupees`,
  'Imagined investor and brokerage rate.',
);
const vSebi = flow('TB', ['SEBI: set up 1988, statutory body under the SEBI Act 1992', 'Protective functions', 'Developmental functions', 'Regulatory functions'], 'Flow showing SEBI, set up in 1988 and made statutory in 1992, with three groups of functions: protective, developmental and regulatory', 'Three groups of functions', [{ from: 'n1', to: 'n2' }, { from: 'n1', to: 'n3' }, { from: 'n1', to: 'n4' }]);
const vSebiTable = table(
  ['Group', 'Examples'],
  [
    ['Protective', 'Prohibits insider trading, price rigging and unfair practices; educates investors; promotes fair practices'],
    ['Developmental', 'Trains intermediaries; promotes research; flexible steps such as internet trading through registered brokers'],
    ['Regulatory', 'Registers brokers, merchant bankers and mutual funds; frames rules; regulates takeovers; inspects and audits exchanges; levies fees'],
  ],
  'Table of SEBI functions with examples: protective, developmental and regulatory',
);
const vSpotSebi = table(
  ['Imagined action', 'Group'],
  [
    ['Fine on a trader for spreading fake tips', 'Protective'],
    ['Online course for brokers\' staff', 'Developmental'],
    ['Registration of a new portfolio manager', 'Regulatory'],
  ],
  'Practice table: a fine for fake tips is protective, a course for brokers\' staff is developmental, and registering a portfolio manager is regulatory',
);
const vSummary2 = table(
  ['Remember', 'Key point'],
  [
    ['Capital market', 'Medium- and long-term funds; primary and secondary'],
    ['Floatation', 'Prospectus, offer for sale, private placement, rights, e-IPO'],
    ['Stock exchange', 'Liquidity, pricing, safety, growth, equity cult'],
    ['Trading', 'Accounts, order, execution, contract note, settlement'],
    ['SEBI', '1988, statutory 1992; protective, developmental, regulatory'],
  ],
  'Summary table of Part 2: capital market, methods of floatation, stock exchange functions, trading steps and SEBI',
);
const vTips2 = table(
  ['Common mistake', 'Write instead'],
  [
    ['Company gets money when its shares trade on the exchange', 'Only new issues (primary market) bring money to the company'],
    ['Offer for sale is a sale to the public directly', 'It goes through intermediaries who resell'],
    ['Rights shares go to the public first', 'They go to existing shareholders first'],
    ['Training brokers is regulatory', 'It is developmental'],
  ],
  'Exam tips table of common mistakes about the primary market, offer for sale, rights issues and SEBI functions',
);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Financial Markets — Part 1: Financial Market and Money Market',
  goals: [
    'Explain the meaning of a financial market and its four functions',
    'Describe the money market and its participants',
    'Explain treasury bills, commercial paper, call money, certificates of deposit and commercial bills',
    'Choose the right money market instrument for a given business need',
  ],
  slides: [
    sl('title', 'Financial Markets', {
      b: 'Part 1 — the **financial market**, its **functions**, and the **money market** with its five instruments.',
      v: vRoute1,
      n: 'Every business needs money, and many families have savings to spare. How do the two meet? In this chapter we study the markets where savings are turned into investment. Part one covers the financial market, its four functions, and the money market, where funds are lent and borrowed for a year or less.',
    }),
    sl('concept', 'What is a financial market?', {
      b: 'A **financial market** is a market for the **creation and exchange of financial assets** such as shares, debentures, bonds and bills.',
      bl: ['**Households** are mainly savers: they supply funds.', '**Business firms** are mainly investors: they use funds.', 'The market performs an **allocative** role: savings go to their most productive use.'],
      v: vSaversInvestors,
      n: 'A financial market is where financial assets are created and traded. Families usually save more than they spend, while firms need money for factories and machines. Banks, stock exchanges and brokers bring the two together. Because the market sends savings to the uses that promise the best returns, we say it performs an allocative function.',
    }),
    sl('diagram', 'Four functions of financial markets', {
      v: vFunctions,
      n: 'Remember four functions. First, mobilisation of savings: idle money is collected and put to work. Second, price discovery: the price of a share or bond is settled by buyers and sellers. Third, liquidity: you can turn your financial assets into cash quickly. Fourth, reducing the cost of transactions: ready information and an organised market save time, effort and money.',
    }),
    sl('check', 'Quick check: who supplies funds?', {
      b: 'Decide whether the statement is true or false.',
      chk: 'tf_fm_firms',
      n: 'Think about which group usually has spare money and which group usually needs it.',
    }),
    sl('diagram', 'Two parts of the financial market', {
      v: vTwoMarkets,
      n: 'The financial market has two parts. The money market deals in short-term funds, for a period of up to one year. The capital market deals in medium and long-term funds, raised through shares, debentures and bonds. We start with the money market.',
    }),
    sl('concept', 'The money market and its players', {
      b: 'The money market is the market for **short-term funds** with maturities of **up to one year**.',
      v: vMmParticipants,
      n: 'In the money market, very large sums are lent and borrowed for short periods. The main players are the Reserve Bank of India, commercial banks, large companies, mutual funds and non-banking financial companies. Individuals rarely take part directly, because the amounts are large. Let us now meet the five instruments of this market.',
    }),
    sl('two-column', 'Treasury bills', {
      cols: [
        '**What:** a short-term borrowing of the **Central Government**, issued by the **RBI**.\n\n**How it pays:** issued at a **discount**, repaid at **face value**, so it is called a **zero-coupon bond**.',
        '**Maturity:** 91, 182 or 364 days.\n\n**Why investors like it:** practically **no risk** of default and high **liquidity**.',
      ],
      v: vTbill,
      n: 'A treasury bill is the government borrowing for a short time. The Reserve Bank issues it on behalf of the Central Government. It pays no interest coupon. Instead, you buy it for less than its face value and receive the full face value at maturity. The difference is your return. Treasury bills run for 91, 182 or 364 days.',
    }),
    sl('example', 'Worked example 1: return on a treasury bill', {
      b: `An imagined pension fund buys ${inr(WT.bills)} treasury bills of 182 days, face value ₹${WT.face}, at ₹${WT.price.toFixed(2)} each.`,
      bl: [
        `Step 1 — Amount paid: ${WT.price.toFixed(2)} × ${inr(WT.bills)} = ₹${inr(WT_PAID)}.`,
        `Step 2 — Amount received at maturity: ${WT.face} × ${inr(WT.bills)} = ₹${inr(WT_RECEIVED)}.`,
        `Step 3 — Gain: ${inr(WT_RECEIVED)} − ${inr(WT_PAID)} = ₹${inr(WT_GAIN)}.`,
        'Step 4 — Say why: the bill was bought at a **discount** and repaid at **face value**.',
      ],
      v: vTbillBars,
      n: 'Let us work it out. The pension fund pays ninety six rupees fifty paise for each bill, so ten thousand bills cost nine lakh sixty five thousand rupees. At maturity the government repays the face value of one hundred rupees per bill, which is ten lakh rupees. The gain is thirty five thousand rupees. There is no interest; the return comes from the discount.',
    }),
    sl('check', 'Quick check: zero-coupon', {
      b: 'Why are treasury bills called zero-coupon bonds?',
      chk: 'm_zero_coupon',
      n: 'Remember how the investor earns a return on a treasury bill, if not through interest.',
    }),
    sl('two-column', 'Commercial paper and certificates of deposit', {
      cols: [
        '**Commercial paper:** an **unsecured promissory note**, negotiable and transferable by endorsement and delivery. Issued by **large, creditworthy companies** for **15 days to one year**.',
        '**Certificate of deposit:** an **unsecured, negotiable** short-term instrument in **bearer form**, issued by **commercial banks** and development financial institutions.',
      ],
      v: vCpCd,
      n: 'Commercial paper is a promise to pay, issued by big companies with strong credit ratings. Because it is unsecured, only well-known firms can use it. It is often used for bridge financing, for example to pay the costs of a share issue until the money from the issue arrives. A certificate of deposit is issued by banks, usually when deposits are growing slowly but loan demand is high.',
    }),
    sl('concept', 'Call money', {
      b: '**Call money** is short-term finance, repayable **on demand**, with a maturity of **one day to 15 days**. It is used mainly for **interbank** transactions.',
      bl: ['Banks borrow call money to keep the **cash reserve** they must hold with the RBI.', 'The interest paid is the **call rate**; it moves inversely with the rates of other short-term instruments.'],
      v: vCallMoney,
      n: 'Call money is the shortest of all. Banks lend to each other for a day or a few days, and the loan can be called back at any time. A bank that finds itself short of the cash it must keep with the Reserve Bank borrows call money overnight. The rate charged is called the call rate.',
    }),
    sl('concept', 'Commercial bill', {
      b: 'A **commercial bill** is a bill of exchange used to finance the **working capital** of business. A **trade bill accepted by a commercial bank** becomes a commercial bill.',
      v: vCommBill,
      n: 'When a seller supplies goods on credit, the buyer accepts a bill promising to pay after, say, ninety days. If a bank accepts the bill, it becomes a commercial bill. The seller does not have to wait: the bill can be discounted with a bank to get cash now. This is how many firms finance their day to day working capital.',
    }),
    sl('example', 'Worked example 2: choose the instrument', {
      b: 'Match each imagined need to an instrument and give the reason.',
      bl: [
        'Need A — The government needs funds for three months → **treasury bill** (government borrowing through the RBI).',
        'Need B — A bank is short of its required reserve tonight → **call money** (interbank, repayable on demand).',
        'Need C — A cement company with a top rating needs four months\' funds before its share issue → **commercial paper** (bridge financing).',
        'Need D — A trader wants cash against goods sold on credit → **commercial bill** (discounting).',
      ],
      v: vInstruments,
      n: 'Board questions often describe a need and ask you to name the instrument. Look for clues. Who is borrowing: the government, a bank, a big company or a trader? For how long? Is the money repayable on demand? Is there a bill arising from a sale of goods? Answer with the instrument and one feature that matches the clue.',
    }),
    sl('check', 'Quick check: match the instruments', {
      b: 'Match each instrument with its issuer or main use.',
      chk: 'mt_instruments',
      n: 'Start with the easiest: which instrument belongs to the government? Then sort out the rest.',
    }),
    sl('check', 'Quick check: calculate the gain', {
      b: 'Work out the gain on the treasury bills.',
      chk: 'n_tbill_gain',
      n: 'Find what the bank pays, then what it receives at face value. The difference is its gain.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up: a financial market creates and trades financial assets and links savers with investors. It mobilises savings, discovers prices, provides liquidity and lowers transaction costs. The money market deals in funds for up to a year, through treasury bills, commercial paper, call money, certificates of deposit and commercial bills.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Write the **issuer** and **maturity** for each instrument; most marks depend on them.',
        'For four functions, use the exact headings: mobilisation, price discovery, liquidity, cost of transactions.',
        'In case questions, **quote the clue** (for example, "repayable on demand") before naming the instrument.',
      ],
      v: vTips1,
      n: 'A few tips. Students often say banks issue treasury bills; it is the Reserve Bank, for the Central Government. Commercial paper is unsecured. Call money is interbank. And do not mix up commercial paper, issued by companies, with certificates of deposit, issued by banks. In case questions, quote the clue from the passage first.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Financial Markets — Part 2: Capital Market, Stock Exchange and SEBI',
  goals: [
    'Distinguish the money market from the capital market, and the primary from the secondary market',
    'Explain five methods of floatation of new issues',
    'Explain the functions of a stock exchange and the trading and settlement procedure',
    'Classify the functions of SEBI as protective, developmental or regulatory',
  ],
  slides: [
    sl('title', 'Capital market, stock exchange and SEBI', {
      b: 'Part 2 — the **capital market**, **primary and secondary** markets, **floatation**, the **stock exchange**, **demat** and **SEBI**.',
      v: vRoute2,
      n: 'In part two we move to long-term money. We look at the capital market and its two parts, the ways companies raise new capital, how shares are traded on a stock exchange, and the regulator that keeps the market fair, the Securities and Exchange Board of India.',
    }),
    sl('concept', 'Money market or capital market?', {
      v: vCmFeatures,
      n: 'The capital market deals in medium and long-term funds through shares, debentures and bonds. Compare it with the money market. Money market instruments are short-term, need large investments, and are safer and more liquid, so they earn less. Capital market securities run longer, can be bought in small amounts, carry more risk, and can earn more.',
    }),
    sl('diagram', 'Primary and secondary markets', {
      v: vPrimSec,
      n: 'The capital market has two parts. In the primary market, also called the new issues market, a company sells securities for the first time, and the money goes to the company. In the secondary market, existing securities change hands between investors through a stock exchange. The company receives nothing from these trades.',
    }),
    sl('concept', 'Comparing the two markets', {
      v: vPrimSecTable,
      n: 'Here is the comparison you will need for answers. Primary market: new securities, sold by the company, direct capital formation, no fixed place, and a price set by the company. Secondary market: existing securities, sold by investors, indirect help to capital formation, a fixed place in the stock exchange, and prices set by demand and supply.',
    }),
    sl('check', 'Quick check: which market?', {
      b: 'Identify the market in this situation.',
      chk: 'm_primary_new',
      n: 'Ask yourself: is the company selling its securities for the first time, and does the money reach the company?',
    }),
    sl('diagram', 'Methods of floatation', {
      v: vFloatation,
      n: 'A company can float a new issue in five ways. An offer through prospectus invites the public directly. In an offer for sale, intermediaries buy the issue and resell it. Private placement sells to institutions and a few individuals, quickly and cheaply. A rights issue offers shares first to existing shareholders. An e-IPO uses the online network of a stock exchange.',
    }),
    sl('example', 'Worked example 1: a rights issue', {
      b: `An imagined company offers ${RI.newPer} new shares for every ${RI.held} held, at ₹${RI.price} each. Anjali holds ${inr(RI.holding)} shares.`,
      bl: [
        `Step 1 — Divide the holding by ${RI.held}: ${RI.holding / RI.held} blocks.`,
        `Step 2 — Multiply by ${RI.newPer}: ${RI_SHARES} rights shares.`,
        `Step 3 — Amount to pay: ${RI_SHARES} × ${RI.price} = ₹${inr(RI_COST)}.`,
        'Step 4 — Name the method: **rights issue**, because the offer goes to **existing** shareholders first.',
      ],
      v: vRights,
      n: 'Let us apply the rights ratio. Two new shares for every five held means we first count blocks of five. Anjali has fifteen hundred shares, which is three hundred blocks. Each block gives two new shares, so she can buy six hundred shares, costing thirty six thousand rupees at sixty rupees each.',
    }),
    sl('concept', 'The stock exchange', {
      b: 'A **stock exchange** is an institution that provides a **platform for buying and selling existing securities**.',
      v: vSeFunctions,
      n: 'The stock exchange is the heart of the secondary market. It gives existing securities liquidity and marketability, and it values them continuously through demand and supply. Trading follows strict rules, so deals are safe. It sends savings to profitable firms and helps the economy grow. Through education and disclosure it spreads the equity cult. It also allows a limited, healthy amount of speculation.',
    }),
    sl('diagram', 'Trading and settlement procedure', {
      v: vTrading,
      n: 'How does an investor actually buy or sell? First, open a trading account with a broker and a demat account with a depository participant. Second, place the order. Third, the order is matched with a buyer or seller on the exchange computer system and executed. Fourth, the broker issues a contract note. Finally, settlement: money is paid and shares are delivered, on a short rolling cycle of one working day.',
    }),
    sl('diagram', 'Dematerialisation and depositories', {
      b: 'Shares are now held **electronically** in a **demat account**, not as paper certificates.',
      v: vDemat,
      n: 'Dematerialisation means holding securities as electronic entries rather than paper certificates. India has two depositories, NSDL and CDSL. You deal with them through a depository participant, such as a bank or broker. Electronic holding removes the risk of theft, forgery and loss of certificates, and makes transfer quick and cheap.',
    }),
    sl('example', 'Worked example 2: selling shares through a broker', {
      b: `An imagined investor sells ${WS.shares} shares at ₹${WS.price}. Brokerage is ${WS.ratePct} per cent of the value of the trade.`,
      bl: [
        `Step 1 — Value of the sale: ${WS.shares} × ${WS.price} = ₹${inr(WS_VALUE)}.`,
        `Step 2 — Brokerage: ${inr(WS_VALUE)} × ${WS.ratePct} ÷ 100 = ₹${inr(WS_FEE)}.`,
        `Step 3 — Amount received: ₹${inr(WS_NET)}.`,
        'Step 4 — The **contract note** shows these figures; at **settlement** the shares leave the demat account and money is paid.',
      ],
      v: vSale,
      n: 'Here is a sale. Two hundred and fifty shares at six hundred and forty rupees bring one lakh sixty thousand rupees. Brokerage at a fifth of one per cent is three hundred and twenty rupees, so the investor receives one lakh fifty nine thousand six hundred and eighty rupees. The broker records all this in the contract note.',
    }),
    sl('check', 'Quick check: trading steps', {
      b: 'Arrange the steps of buying shares in the correct order.',
      chk: 'ord_trading',
      n: 'Begin with what must exist before any order can be placed, and end with the step that completes the trade.',
    }),
    sl('concept', 'SEBI: the market regulator', {
      b: 'The **Securities and Exchange Board of India** was set up in **1988** and became a **statutory body** under the **SEBI Act, 1992**.',
      bl: ['**Objectives:** regulate stock exchanges and the securities industry; protect investors\' rights and interests; prevent trading malpractices; develop a code of conduct for intermediaries such as brokers and merchant bankers.'],
      v: vSebi,
      n: 'Markets need a referee. SEBI was set up in 1988 and given legal powers in 1992. Its objectives are to regulate stock exchanges and the securities industry, to protect investors, especially small ones, to prevent malpractices, and to set codes of conduct for brokers, merchant bankers and other intermediaries. Its functions fall into three groups.',
    }),
    sl('concept', 'Protective, developmental and regulatory functions', {
      v: vSebiTable,
      n: 'Protective functions guard investors: banning insider trading, price rigging and other unfair practices, and educating investors. Developmental functions build the market: training intermediaries, promoting research, and flexible steps such as allowing internet trading through registered brokers. Regulatory functions control participants: registering brokers, merchant bankers and mutual funds, regulating takeovers, and inspecting stock exchanges.',
    }),
    sl('check', 'Quick check: SEBI functions', {
      b: 'Match each action with the group of SEBI functions.',
      chk: 'mt_sebi',
      n: 'Ask whether the action guards investors, builds the market, or controls who may operate in it.',
    }),
    sl('diagram', 'Spot the function', {
      v: vSpotSebi,
      n: 'In case questions, look for the verb. Fining or banning someone for cheating investors is protective. Training or research is developmental. Registering, inspecting or framing rules is regulatory. Investor education is a common trap: it is protective, not developmental.',
    }),
    sl('check', 'Quick check: demat', {
      b: 'Choose the correct option.',
      chk: 'ar_demat_theft',
      n: 'Check each statement on its own first, then ask whether the reason explains the assertion.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up part two: the capital market deals in long-term funds and has primary and secondary parts. New issues are floated by prospectus, offer for sale, private placement, rights issue or e-IPO. Stock exchanges provide liquidity, pricing and safety. Trading runs from opening accounts to settlement. SEBI protects, develops and regulates the market.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Differences need the **basis** first: "on the basis of duration, the money market…".',
        'In floatation cases, **quote** the words that identify the method ("existing shareholders", "through intermediaries").',
        'SEBI: learn **two examples** for each group of functions.',
      ],
      v: vTips2,
      n: 'Last tips. Shares traded on the exchange do not bring money to the company; only new issues do. In an offer for sale, intermediaries buy first and resell. Rights shares go first to existing shareholders. And training of brokers is developmental, not regulatory. Always quote the line from a case before you name the concept.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Financial Markets — Notes',
  sections: [
    {
      h: '1. Financial market: meaning and functions',
      t: 1,
      b: 'A **financial market** is where **financial assets** (shares, debentures, bonds, bills) are **created and exchanged**. Households are usually the **suppliers** of funds and firms the **users**; the market **allocates** savings to their most productive uses.\n\n**Functions**\n1. **Mobilisation of savings** and channelling them into productive uses.\n2. **Price discovery:** demand and supply decide the price of financial assets.\n3. **Liquidity:** assets can be turned into cash quickly.\n4. **Reducing the cost of transactions:** information and an organised market save time, effort and money.',
      terms: [
        ['Financial market', 'A market for the creation and exchange of financial assets, linking savers and investors.'],
        ['Allocative function', 'Directing savings to the uses that promise the best returns.'],
      ],
      v: vFunctions,
    },
    {
      h: '2. Money market and its instruments',
      t: 2,
      b: 'The **money market** deals in **short-term funds** with maturities of **up to one year**. Participants: RBI, commercial banks, large companies, mutual funds, NBFCs.\n\n- **Treasury bill:** borrowing of the **Central Government**, issued by the **RBI**; **zero-coupon** (issued at a discount, repaid at face value); **91, 182 or 364 days**.\n- **Commercial paper:** **unsecured promissory note** of a **large, creditworthy company**; negotiable, transferable by endorsement and delivery; **15 days to one year**; used for working capital and **bridge financing**.\n- **Call money:** **interbank** finance, **repayable on demand**, **one to 15 days**; helps banks meet their reserve requirement; price = **call rate**.\n- **Certificate of deposit:** **unsecured, negotiable, bearer** instrument issued by **commercial banks and development financial institutions**.\n- **Commercial bill:** a **trade bill accepted by a commercial bank**; can be **discounted** for cash; finances working capital.',
      terms: [
        ['Zero-coupon bond', 'A bond that pays no interest; the return is the gap between the discounted issue price and the face value.'],
        ['Bridge financing', 'Short-term funds used until long-term funds, such as the proceeds of a share issue, arrive.'],
        ['Call rate', 'The interest rate on call money.'],
      ],
      v: vInstruments,
      vs: [vTbillBars],
    },
    {
      h: '3. Capital market: primary and secondary',
      t: 3,
      b: 'The **capital market** deals in **medium- and long-term** funds through shares, debentures and bonds; participants include development banks, commercial banks, mutual funds and stock exchanges.\n\n**Money vs capital market:** duration, instruments, investment outlay (large vs small), liquidity and safety (higher vs lower), expected return (lower vs higher).\n\n**Primary (new issues) market:** new securities sold for the first time; money goes to the company; **direct** contribution to capital formation; no fixed place; price set by the company.\n\n**Secondary market (stock exchange):** existing securities traded between investors; fixed place; price by demand and supply; helps capital formation **indirectly** by giving liquidity.',
      terms: [
        ['Primary market', 'The market where companies issue new securities for the first time.'],
        ['Secondary market', 'The market where existing securities are bought and sold, mainly through stock exchanges.'],
      ],
      v: vCmFeatures,
      vs: [vPrimSec, vPrimSecTable],
    },
    {
      h: '4. Methods of floatation',
      t: 3,
      b: '1. **Offer through prospectus:** the public is invited to subscribe through a prospectus; issues are often **underwritten**.\n2. **Offer for sale:** the issue is sold to **intermediaries** (issuing houses, brokers) at an agreed price, who **resell** it to the public.\n3. **Private placement:** allotment to **institutional investors** and select individuals; **saves time and cost**.\n4. **Rights issue:** new shares offered to **existing shareholders** in proportion to their holding.\n5. **e-IPO:** an online public offer using the network of a stock exchange; applications are collected by registered brokers.',
      terms: [
        ['Floatation', 'Raising capital by issuing new securities in the primary market.'],
        ['Rights issue', 'An offer of new shares to existing shareholders before others, in proportion to their holding.'],
      ],
      v: vFloatation,
      vs: [vRights],
    },
    {
      h: '5. Stock exchange, trading and demat',
      t: 4,
      b: 'A **stock exchange** provides a platform for buying and selling **existing securities**.\n\n**Functions:** liquidity and marketability; pricing of securities; safety of transactions; contribution to economic growth; spreading of the equity cult; limited scope for speculation.\n\n**Trading and settlement:** (1) open a **trading account** with a broker and a **demat account** with a **depository participant**; (2) place the order; (3) the order is matched and **executed** on the exchange\'s online system; (4) the broker issues a **contract note**; (5) **settlement**: funds and securities are exchanged on a short rolling cycle.\n\n**Dematerialisation:** securities are held as **electronic entries**. Depositories: **NSDL** and **CDSL**, reached through depository participants. Benefits: no theft, forgery or loss of certificates; quick and cheap transfer.',
      terms: [
        ['Contract note', 'The broker\'s record of an executed trade: price, quantity, time and charges.'],
        ['Depository participant', 'A bank or broker registered with a depository that opens and services demat accounts.'],
        ['Equity cult', 'A widespread habit of investing in shares among the public.'],
      ],
      v: vSeFunctions,
      vs: [vTrading, vDemat],
    },
    {
      h: '6. Securities and Exchange Board of India (SEBI)',
      t: 5,
      b: 'Set up in **1988**; statutory body under the **SEBI Act, 1992**.\n\n**Objectives:** regulate stock exchanges and the securities industry; protect the rights and interests of investors; prevent trading malpractices; regulate and develop a code of conduct for intermediaries.\n\n**Protective functions:** prohibit **insider trading**, **price rigging** and fraudulent or unfair trade practices; **educate investors**; promote fair practices.\n\n**Developmental functions:** **training of intermediaries**; promoting **research**; flexible steps such as **internet trading** through registered brokers.\n\n**Regulatory functions:** **register and regulate** brokers, sub-brokers, merchant bankers, **mutual funds** and others; frame rules and regulations; regulate **takeovers**; **inspect and audit** stock exchanges; levy fees.',
      terms: [
        ['Insider trading', 'Dealing in a company\'s securities on the basis of unpublished, price-sensitive information.'],
        ['Price rigging', 'Manipulating the price of a security to mislead investors.'],
      ],
      v: vSebiTable,
      vs: [vSebi],
    },
  ],
  tips: '**Common mistakes**\n- Saying banks issue **treasury bills**: the **RBI** issues them for the Central Government.\n- Calling **commercial paper** secured: it is **unsecured**.\n- Mixing up **commercial paper** (companies) and **certificates of deposit** (banks).\n- Writing that a company receives money when its shares trade on the exchange: only the **primary market** brings it money.\n- Describing an **offer for sale** as a direct offer to the public.\n- Placing **investor education** under developmental functions: it is **protective**.\n\n**How marks are usually awarded**\n- 1 mark: one correct option or term.\n- 3 marks: three points, each with a line of explanation; differences need a **basis**.\n- 5 marks: five headed points, or meaning plus four points.\n- Case-based: **quote** the clue, **name** the concept, then **explain** it.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['**Financial market**', 'A market for the **creation and exchange of financial assets**; links savers and investors.', 'definition', 1],
  ['Four functions of financial markets', 'Mobilisation of savings; price discovery; liquidity; reducing the cost of transactions.', 'concept', 1],
  ['**Price discovery**', 'Demand and supply settle the price of a financial asset.', 'definition', 1],
  ['Who mainly supplies and who mainly uses funds?', 'Households **supply**; business firms **use**.', 'fact', 1],
  ['**Money market**', 'Market for **short-term funds**, maturity **up to one year**.', 'definition', 2],
  ['Treasury bill: issuer', '**RBI** on behalf of the **Central Government**.', 'fact', 2],
  ['Treasury bill: maturities', '**91, 182 and 364 days**.', 'fact', 2],
  ['Why is a T-bill a **zero-coupon bond**?', 'No interest; issued at a **discount**, repaid at **face value**.', 'concept', 2],
  ['**Commercial paper**', '**Unsecured** promissory note of a large, creditworthy company; **15 days to one year**.', 'definition', 2],
  ['**Bridge financing**', 'Short-term funds (often commercial paper) used until long-term funds arrive.', 'concept', 2],
  ['**Call money**', '**Interbank** loan, **repayable on demand**, one to 15 days; price = **call rate**.', 'definition', 2],
  ['**Certificate of deposit**', 'Unsecured, negotiable, **bearer** instrument issued by **banks and DFIs**.', 'definition', 2],
  ['**Commercial bill**', 'A **trade bill accepted by a bank**; can be **discounted** for cash.', 'definition', 2],
  ['Bank short of reserve tonight: instrument?', '**Call money**.', 'example', 2],
  ['**Capital market**', 'Market for **medium- and long-term** funds: shares, debentures, bonds.', 'definition', 3],
  ['Money vs capital market: safety and return', 'Money market: **safer, more liquid, lower return**; capital market: riskier, higher expected return.', 'concept', 3],
  ['**Primary market**', '**New issues** market; money goes to the company; **direct** capital formation.', 'definition', 3],
  ['**Secondary market**', 'Trading of **existing** securities on the **stock exchange**; indirect help to capital formation.', 'definition', 3],
  ['**Offer for sale**', 'Issue sold to **intermediaries**, who **resell** to the public.', 'definition', 3],
  ['**Private placement**', 'Allotment to **institutional investors** and select individuals; quick and cheap.', 'definition', 3],
  ['**Rights issue**', 'New shares offered first to **existing shareholders**, in proportion to holding.', 'definition', 3],
  ['**e-IPO**', 'Public issue through the **online system of a stock exchange**, via registered brokers.', 'definition', 3],
  ['**Stock exchange**', 'Platform for buying and selling **existing securities**.', 'definition', 4],
  ['Six functions of a stock exchange', 'Liquidity; pricing; safety; economic growth; equity cult; limited speculation.', 'concept', 4],
  ['Trading procedure in five steps', 'Open trading and demat accounts → place order → execution → contract note → settlement.', 'concept', 4],
  ['**Contract note**', 'Broker\'s record of an executed trade (price, quantity, time, charges).', 'definition', 4],
  ['Depositories in India', '**NSDL** and **CDSL**; reached through depository participants.', 'fact', 4],
  ['Benefit of **demat**', 'No theft, forgery or loss of certificates; quick, cheap transfer.', 'concept', 4],
  ['SEBI: set up and statutory', 'Set up **1988**; statutory under the **SEBI Act, 1992**.', 'fact', 5],
  ['SEBI: three groups of functions', '**Protective**, **developmental**, **regulatory**.', 'concept', 5],
  ['Investor education is which SEBI function?', '**Protective**.', 'exam-tip', 5],
  ['Registering mutual funds is which SEBI function?', '**Regulatory**.', 'exam-tip', 5],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-12-default-chapter-test-short',
  title: 'Chapter test (short) — Financial Markets',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_fn_price', 'm_tbill_issuer', 'm_offer_for_sale', 'ar_primary_capital'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and the 3-mark question in about 50–80 words.', items: ['s_fm_two_fn', 's_demat_benefits', 's3_mm_instruments'] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer any ONE of the two questions in about 80–120 words.', items: [{ attempt: 1, keys: ['l_mm_instruments', 'l_sebi_functions'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks)', instr: 'Read the passage and answer all parts. Part (c) has an internal choice.', items: ['cb_kiran'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-12-default-chapter-test-long',
  title: 'Chapter test (long) — Financial Markets',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_fn_liquidity', 'm_cp_bridge', 'm_call_money', 'm_mm_vs_cm', 'm_private_placement', 'm_equity_cult', 'm_contract_note', 'm_sebi_protective', 'ar_rights', 'ar_sebi_need'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and 3-mark questions in about 50–80 words. Questions 13 and 15 have an internal choice.', items: ['s_tbill_features', 's_pm_sm', { attempt: 1, keys: ['s_cp_cd', 's_sebi_objectives'] }, 's3_trading_steps', { attempt: 1, keys: ['s3_floatation', 's3_sebi_protective'] }] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer question 16, and any ONE of questions 17 and 18, in about 80–120 words each.', items: ['l_fm_functions', { attempt: 1, keys: ['l_floatation', 'l_sebi_evaluate'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks each)', instr: 'Read each passage and answer all parts. Part (c) of each has an internal choice.', items: ['cb_suvarna', 'cb_aarohan'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t05 of cbse-12-business-studies-ch10 only (financial market and functions; money market and instruments; capital market, primary and secondary, floatation; stock exchange and trading procedure; SEBI)',
    originality: 'every firm, investor, case and figure written for this chapter (imagined, labelled); no NCERT text, exercise or board/sample-paper item reused',
    data: `imagined figures computed by the build (T-bills ${inr(TB_RECEIVED)} − ${inr(TB_PAID)} = ${inr(TB_GAIN)} and ${inr(WT_RECEIVED)} − ${inr(WT_PAID)} = ${inr(WT_GAIN)}; brokerage ${inr(BR_VALUE)} × ${BR.ratePct}% = ${BR_FEE} and ${inr(WS_VALUE)} × ${WS.ratePct}% = ${WS_FEE}; rights ${inr(RI.holding)} ÷ ${RI.held} × ${RI.newPer} = ${RI_SHARES})`,
    facts: 'T-bill maturities 91/182/364 days; CP 15 days to one year; call money one to 15 days; NSDL and CDSL; SEBI 1988, statutory 1992; settlement described only as a short rolling cycle of one working day',
    gate: 'schema, content lint (lintExemplar) and the deterministic verify checks run clean on this chapter',
  },
});
