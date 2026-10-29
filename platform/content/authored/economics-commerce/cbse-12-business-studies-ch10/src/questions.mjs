// CBSE 12 Business Studies, ch10 Financial Markets — question bank. Every firm, investor, scenario and
// figure is written by SOYL (imagined Indian businesses and people, labelled as such); no NCERT text,
// exercise or board/sample-paper item is reused (D-036). Every number is computed here and asserted.
import assert from 'node:assert/strict';
import { Q, mcq, ar, tf, fb, match, ord, num, short, long, caseQ, child } from './lib.mjs';

export const inr = (n) => Number(n).toLocaleString('en-IN');

const S2 = [30, 50];
const S3 = [50, 80];
const L5 = [80, 120];

// ---------------------------------------------------------------- computed figures
// Treasury bill bought by an imagined cooperative bank: face value ₹100, issue price ₹98.40, 2,500 bills.
export const TB = { face: 100, price: 98.4, bills: 2500 };
export const TB_PAID = Math.round(TB.price * TB.bills); // 2,46,000
export const TB_RECEIVED = TB.face * TB.bills; // 2,50,000
export const TB_GAIN = TB_RECEIVED - TB_PAID; // 4,000
assert.equal(TB_PAID, 246000);
assert.equal(TB_RECEIVED, 250000);
assert.equal(TB_GAIN, 4000);
// Brokerage on a purchase by an imagined investor: 300 shares at ₹420, brokerage 0.25 per cent.
export const BR = { shares: 300, price: 420, ratePct: 0.25 };
export const BR_VALUE = BR.shares * BR.price; // 1,26,000
export const BR_FEE = (BR_VALUE * BR.ratePct) / 100; // 315
assert.equal(BR_VALUE, 126000);
assert.equal(BR_FEE, 315);
// Rights issue of an imagined company: 2 new shares for every 5 held; holder of 1,500 shares.
export const RI = { newPer: 2, held: 5, holding: 1500, price: 60 };
export const RI_SHARES = (RI.holding / RI.held) * RI.newPer; // 600
export const RI_COST = RI_SHARES * RI.price; // 36,000
assert.equal(RI_SHARES, 600);
assert.equal(RI_COST, 36000);
// Commercial paper of an imagined company (case): face ₹50 crore, raised ₹48.5 crore.
export const CP = { face: 50, raised: 48.5 };
export const CP_COST = +(CP.face - CP.raised).toFixed(1); // 1.5
assert.equal(CP_COST, 1.5);

// ================================================================ t01 Concept and functions
Q('m_fm_meaning', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'A financial market is best described as a market for',
  opts: [
    'the creation and exchange of financial assets such as shares, bonds and bills',
    'the buying and selling of consumer goods for cash',
    'the hiring of workers by financial institutions only',
    'the exchange of one foreign currency for another at a fixed rate only',
  ],
  sol: 'A financial market brings together those who have savings to invest and those who need funds, by creating and trading financial assets. Goods markets, labour markets and a fixed-rate currency exchange are different things.',
}));
Q('m_fm_link', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Financial markets are said to perform an **allocative** function because they',
  opts: [
    'link households who save with businesses that need funds, so savings flow to productive uses',
    'decide the wages that companies must pay their workers',
    'fix the prices of all goods sold in the country',
    'allot shares only to the government and public-sector banks',
  ],
  sol: 'They allocate savings: funds move from savers (mainly households) to investors (mainly firms) who put them to the most productive use. They do not fix wages or goods prices, and they serve private firms and individuals too.',
}));
Q('m_fn_price', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'On a busy trading day the price of shares of an imagined solar-panel maker, Suryakiran Ltd, moves from ₹310 to ₹336 as more buyers than sellers enter the market. Which function of financial markets is at work?',
  opts: ['Price discovery', 'Mobilisation of savings', 'Reducing the cost of transactions', 'Providing liquidity'],
  sol: 'The price of the financial asset is being set by the interaction of demand and supply, which is price discovery. Mobilising savings, cutting transaction costs and giving liquidity are other functions, not the one described.',
}));
Q('m_fn_liquidity', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Meenakshi needs cash for her daughter\'s college fees. She sells the bonds of an imagined power company that she holds and receives the money within two days. Which function of the financial market helped her?',
  opts: ['Providing liquidity to financial assets', 'Price discovery', 'Mobilisation of savings', 'Regulation of intermediaries'],
  sol: 'She could convert her financial asset into cash quickly and easily, which is the liquidity function. Regulation of intermediaries is a task of SEBI, not a function of the market.',
}));
Q('m_fn_cost', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'How does a financial market **reduce the cost of transactions**?',
  opts: [
    'It provides ready information about securities, saving buyers and sellers time, effort and money',
    'It removes all taxes on the purchase of shares',
    'It guarantees that every investor earns a profit',
    'It allows companies to borrow without paying any interest',
  ],
  sol: 'Because information about securities and a place to trade are already available, parties do not have to spend much to find each other and agree a deal. Markets do not abolish taxes, guarantee profits or make borrowing free.',
}));
Q('ar_mobilise', ar({
  t: 1, d: 2, c: 'analysis', key: 'a',
  a: 'Financial markets help in the mobilisation of savings.',
  r: 'They give households a range of financial assets in which idle savings can be invested and channelled to firms that need funds.',
  sol: 'Both are true, and R explains A: savings are mobilised precisely because savers are offered assets to invest in, and those funds then reach businesses.',
}));
Q('tf_fm_firms', tf({
  t: 1, d: 1, c: 'understanding', ans: false,
  stem: 'True or false? In a financial market, households are mainly the users of funds and business firms are mainly the suppliers of funds.',
  sol: 'It is the other way round: households are mainly savers (suppliers of funds) and business firms are mainly investors (users of funds).',
}));
Q('s_fm_two_fn', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Explain any two functions of a financial market.',
  model: '1. **Mobilisation of savings:** it collects the savings of households and channels them to businesses that will use them productively.\n2. **Price discovery:** the price of a share or bond is settled by the demand of buyers and the supply of sellers, giving a fair market value.',
  sol: 'Any two of the four functions, each with a line of explanation.',
  scheme: [['First function explained', 1], ['Second function explained', 1]],
}));
Q('s3_fm_four', short({
  t: 1, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'Rahul, a farmer in Nashik, keeps his surplus income in a steel trunk at home. Explain three ways in which the financial market could benefit him and the economy if he invested it instead.',
  model: '1. **Mobilisation of savings:** his idle cash would reach firms that need funds for factories and equipment, adding to the country\'s capital.\n2. **Liquidity:** shares or bonds he buys can be sold quickly when he needs money for the next sowing season.\n3. **Low transaction cost and fair price:** brokers and published prices let him buy at a market-determined price without spending much time or money searching for a buyer or seller.',
  sol: 'Three functions applied to the situation of an individual saver.',
  scheme: [['Mobilisation of savings applied', 1], ['Liquidity applied', 1], ['Price discovery or low transaction cost applied', 1]],
}));
Q('l_fm_functions', long({
  t: 1, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'What is a financial market? Explain its four functions.',
  model: 'A **financial market** is a market for the **creation and exchange of financial assets**; it links **savers** (mostly households) with **investors** (mostly businesses).\n1. **Mobilisation of savings:** savings are collected and channelled to their most productive uses.\n2. **Price discovery:** prices of financial assets are set by the demand of buyers and the supply of sellers.\n3. **Liquidity:** holders can turn their financial assets into cash easily and quickly.\n4. **Reducing the cost of transactions:** ready information and an organised place to trade save **time, effort and money** for both sides.',
  sol: 'Meaning for 1 mark and each function for 1 mark.',
  scheme: [['Meaning of financial market', 1], ['Mobilisation of savings', 1], ['Price discovery', 1], ['Liquidity', 1], ['Reducing cost of transactions', 1]],
}));

// ================================================================ t02 Money market and its instruments
Q('m_mm_period', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'The money market deals in funds and instruments with a maturity of',
  opts: ['up to one year', 'more than five years only', 'exactly ten years', 'no fixed period, since shares are never repaid'],
  sol: 'The money market is the market for short-term funds, with instruments maturing in a year or less. Long-term funds belong to the capital market.',
}));
Q('m_tbill_issuer', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'Treasury bills in India are issued by',
  opts: [
    'the Reserve Bank of India on behalf of the Central Government',
    'commercial banks on behalf of their depositors',
    'large companies to meet working capital needs',
    'stock exchanges to raise funds for their members',
  ],
  sol: 'A treasury bill is a short-term borrowing of the Central Government, and the RBI issues it on the government\'s behalf. Companies issue commercial paper, and banks issue certificates of deposit.',
}));
Q('m_zero_coupon', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Treasury bills are called **zero-coupon bonds** because',
  opts: [
    'no interest is paid on them; the investor gains because they are issued at a discount and repaid at face value',
    'they carry no risk of any kind for the government',
    'they can be bought only by banks and not by anyone else',
    'they are issued free of cost to investors',
  ],
  sol: 'The return on a treasury bill is the difference between the lower issue price and the face value paid at maturity; there is no separate interest coupon. Being free of default risk is a different feature.',
}));
Q('m_tbill_terms', mcq({
  t: 2, d: 2, c: 'recall',
  stem: 'Treasury bills are issued for which of these sets of maturity periods?',
  opts: ['91 days, 182 days and 364 days', '15 days, 30 days and 45 days', 'One year, three years and five years', 'Seven days only'],
  sol: 'Treasury bills come in 91-day, 182-day and 364-day forms. Periods of several years belong to bonds in the capital market.',
}));
Q('m_cp_bridge', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'Kaveri Cement Ltd (imagined) plans a share issue in three months. Meanwhile it needs funds to pay the costs of the issue, such as advertising and brokerage, and it is a large company with a strong credit rating. Which instrument suits this **bridge financing** best?',
  opts: ['Commercial paper', 'Call money', 'Treasury bill', 'Certificate of deposit'],
  sol: 'A financially strong company can issue commercial paper, an unsecured short-term promissory note, to cover floatation costs until the long-term issue comes in. Call money is interbank borrowing, treasury bills are issued for the government and certificates of deposit are issued by banks.',
}));
Q('m_cp_period', mcq({
  t: 2, d: 2, c: 'recall',
  stem: 'Commercial paper has a fixed maturity of',
  opts: ['15 days to one year', 'one day to 15 days', 'five to ten years', 'more than one year but less than three'],
  sol: 'Commercial paper matures in 15 days to one year. One day to 15 days describes call money.',
}));
Q('m_call_money', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'Late in the evening, Ganga Bank (imagined) finds that it is short of the cash it must keep with the RBI. It borrows from Yamuna Bank (imagined) for one day, repayable on demand. Which money market instrument is this?',
  opts: ['Call money', 'Commercial bill', 'Commercial paper', 'Treasury bill'],
  sol: 'Short-term, interbank finance repayable on demand, often taken to meet the cash reserve requirement, is call money. The rate charged is the call rate.',
}));
Q('m_cd_issuer', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Certificates of deposit are unsecured, negotiable short-term instruments in bearer form issued by',
  opts: [
    'commercial banks and development financial institutions',
    'the Central Government through the RBI',
    'stock exchanges to their members',
    'any partnership firm that needs funds',
  ],
  sol: 'Banks and development financial institutions issue certificates of deposit, usually when deposit growth is slow and credit demand is high. The government\'s short-term instrument is the treasury bill.',
}));
Q('m_comm_bill', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'Ravi Traders (imagined) sells goods worth ₹4 lakh on credit to Patel Stores, which accepts a bill payable in 90 days. Ravi Traders needs cash now, so it gets the bill discounted by its bank. The bill, once accepted by a commercial bank, is known as a',
  opts: ['commercial bill', 'commercial paper', 'certificate of deposit', 'treasury bill'],
  sol: 'A trade bill of exchange accepted by a commercial bank is a commercial bill, used to finance working capital. Commercial paper is an unsecured promissory note of a large company, not a bill arising from a sale of goods.',
}));
Q('ar_cp_unsecured', ar({
  t: 2, d: 3, c: 'analysis', key: 'b',
  a: 'Only large companies with a good credit rating can raise funds through commercial paper.',
  r: 'Commercial paper is transferable by endorsement and delivery.',
  sol: 'Both are true, but R does not explain A. Only strong companies can issue commercial paper because it is unsecured, so lenders rely on the issuer\'s creditworthiness; transferability is a separate feature.',
}));
Q('ar_call_rate', ar({
  t: 2, d: 3, c: 'analysis', key: 'd',
  a: 'Call money is a long-term source of finance for companies.',
  r: 'There is an inverse relationship between the call rate and the interest rates of other short-term instruments such as commercial paper.',
  sol: 'A is false: call money is very short-term, mainly interbank, finance. R is true as a broad pattern: when the call rate rises, other short-term sources become relatively cheaper, so demand shifts to them.',
}));
Q('fb_tbill_discount', fb({
  t: 2, d: 1, c: 'recall',
  stem: 'A treasury bill is issued at a price lower than its face value, that is, at a ___, and is repaid at face value on maturity.',
  acc: [['discount']],
  sol: 'Treasury bills are issued at a discount and redeemed at par; the difference is the investor\'s return.',
}));
Q('mt_instruments', match({
  t: 2, d: 2, c: 'understanding',
  stem: 'Match each money market instrument of an imagined Indian market with its issuer or main use.',
  pairs: [
    ['Treasury bill', 'Short-term borrowing of the Central Government'],
    ['Commercial paper', 'Unsecured promissory note of a large, creditworthy company'],
    ['Call money', 'Interbank loan repayable on demand'],
    ['Certificate of deposit', 'Negotiable deposit receipt issued by a bank in bearer form'],
  ],
  sol: 'Government: treasury bill; large companies: commercial paper; banks lending to each other: call money; banks raising deposits: certificate of deposit.',
}));
Q('n_tbill_gain', num({
  t: 2, d: 3, c: 'application', marks: 2, value: TB_GAIN, unit: '₹',
  stem: `Shivalik Cooperative Bank (imagined) buys ${inr(TB.bills)} treasury bills of 91 days, each with a face value of ₹${TB.face}, at ₹${TB.price.toFixed(2)} each. How much will the bank gain when the bills mature (in ₹)?`,
  sol: `Step 1: Amount paid = ${TB.price.toFixed(2)} × ${inr(TB.bills)} = ₹${inr(TB_PAID)}.\nStep 2: Amount received at maturity = ${TB.face} × ${inr(TB.bills)} = ₹${inr(TB_RECEIVED)}.\nStep 3: Gain = ${inr(TB_RECEIVED)} − ${inr(TB_PAID)} = ₹${inr(TB_GAIN)}.`,
  scheme: [['Amount paid and amount received at face value', 1], [`Gain ₹${inr(TB_GAIN)}`, 1]],
}));
Q('s_tbill_features', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State any four features of a treasury bill.',
  model: '1. Issued by the **RBI on behalf of the Central Government**.\n2. Issued at a **discount** and repaid at **face value** (zero-coupon).\n3. Maturity of **91, 182 or 364 days**.\n4. Highly **liquid** and free of default risk, since repayment is assured by the government.',
  sol: 'Four distinct features, half a mark each.',
  scheme: [['Any two features', 1], ['Any two more features', 1]],
}));
Q('s_cp_cd', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Distinguish between commercial paper and a certificate of deposit on the basis of the issuer and the purpose.',
  model: '1. **Issuer:** commercial paper is issued by **large, creditworthy companies**; a certificate of deposit is issued by **commercial banks and development financial institutions**.\n2. **Purpose:** commercial paper meets a company\'s **short-term needs and bridge financing**; a certificate of deposit lets a bank **mobilise funds** when deposits grow slowly.',
  sol: 'One difference on each basis.',
  scheme: [['Difference by issuer', 1], ['Difference by purpose', 1]],
}));
Q('s3_mm_instruments', short({
  t: 2, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'Name the money market instrument suited to each need and give a reason: (a) the Central Government needs funds for 91 days; (b) a bank needs funds overnight to meet its cash reserve requirement; (c) a trader wants cash now against goods sold on 60 days\' credit.',
  model: '(a) **Treasury bill:** the government\'s own short-term borrowing, issued through the RBI at a discount.\n(b) **Call money:** an interbank loan for a day or a few days, repayable on demand.\n(c) **Commercial bill:** the trade bill drawn on the buyer, once accepted, can be discounted with a bank for immediate cash.',
  sol: 'Correct instrument with a reason for each need.',
  scheme: [['(a) Treasury bill with reason', 1], ['(b) Call money with reason', 1], ['(c) Commercial bill with reason', 1]],
}));
Q('l_mm_instruments', long({
  t: 2, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Explain any five instruments of the money market.',
  model: '1. **Treasury bill:** short-term borrowing of the **Central Government**, issued by the RBI at a **discount** for 91, 182 or 364 days and repaid at face value.\n2. **Commercial paper:** an **unsecured promissory note** of a large, creditworthy company for **15 days to one year**, often used for bridge financing.\n3. **Call money:** **interbank** finance for one to 15 days, **repayable on demand**; its interest is the call rate.\n4. **Certificate of deposit:** a **negotiable, bearer** deposit instrument issued by **banks** and development financial institutions.\n5. **Commercial bill:** a **trade bill accepted by a bank**, which the seller can discount to finance working capital.',
  sol: 'Each instrument named with two identifying features: 1 mark each.',
  scheme: [['Treasury bill', 1], ['Commercial paper', 1], ['Call money', 1], ['Certificate of deposit', 1], ['Commercial bill', 1]],
}));

// ================================================================ t03 Capital market: primary and secondary
Q('m_cm_meaning', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'The capital market is the market for',
  opts: ['medium-term and long-term funds', 'funds repayable on demand only', 'funds for less than one week', 'only foreign currencies'],
  sol: 'The capital market deals in medium- and long-term funds raised through shares, debentures and bonds. Very short-term funds belong to the money market.',
}));
Q('m_primary_new', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'Hiranya Foods Ltd (imagined) offers its shares to the public for the first time to build a new factory in Indore. In which market is this transaction taking place?',
  opts: ['Primary market', 'Secondary market', 'Money market', 'Call money market'],
  sol: 'Securities issued for the first time are sold in the primary (new issues) market, and the money goes to the company. The secondary market deals in securities already issued.',
}));
Q('m_secondary_feature', mcq({
  t: 3, d: 2, c: 'analysis',
  stem: 'Which statement is true of the **secondary** market but not of the primary market?',
  opts: [
    'It deals in existing securities and generally has a fixed place, the stock exchange',
    'It contributes directly to capital formation by giving fresh funds to companies',
    'Securities are sold only by the company itself',
    'Prices are always fixed by the company\'s management',
  ],
  sol: 'The secondary market trades securities already issued, through stock exchanges; it helps capital formation only indirectly. In the primary market the company sells new securities and decides the issue price.',
}));
Q('m_mm_vs_cm', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: 'Compared with the capital market, the money market generally offers',
  opts: [
    'greater liquidity and safety but a lower expected return',
    'lower liquidity and safety but a higher expected return',
    'longer maturities and smaller investment outlays',
    'a market where only individual investors take part',
  ],
  sol: 'Money market instruments are short-term and issued by strong borrowers, so they are more liquid and safer; the price is a lower return. Capital market instruments run for longer, carry more risk and can earn more.',
}));
Q('m_offer_for_sale', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'Tarang Textiles Ltd (imagined) sells its entire new issue of shares at an agreed price to an issuing house, which then sells them to the public at a higher price. Which method of floatation has been used?',
  opts: ['Offer for sale', 'Offer through prospectus', 'Private placement', 'Rights issue'],
  sol: 'When securities are sold first to intermediaries such as issuing houses or brokers, who resell them to the public, the method is an offer for sale. In an offer through prospectus, the company invites the public directly.',
}));
Q('m_private_placement', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'Nilgiri Bio Ltd (imagined), a small company, wants to raise funds quickly and cheaply. It sells its new securities to a few mutual funds and insurance companies without a public issue. Name the method.',
  opts: ['Private placement', 'Offer for sale', 'e-IPO', 'Rights issue'],
  sol: 'Allotting securities to institutional investors and select individuals is private placement; it saves the costs of a public issue. A rights issue would be offered to existing shareholders.',
}));
Q('m_eipo', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'In an **e-IPO**, a company issues its securities to the public',
  opts: [
    'through the online system of a stock exchange, using registered brokers to accept applications',
    'only to its existing shareholders by post',
    'only to banks through the RBI',
    'without any role for a stock exchange',
  ],
  sol: 'An e-IPO is an initial public offer made through the online network of a stock exchange; the company appoints registered brokers to collect applications. Offers to existing shareholders are rights issues.',
}));
Q('ar_primary_capital', ar({
  t: 3, d: 2, c: 'analysis', key: 'a',
  a: 'The primary market contributes directly to capital formation.',
  r: 'In the primary market, money from investors goes straight to the company, which uses it to buy fixed assets and expand.',
  sol: 'Both are true, and R explains A: new money reaching the issuing company is turned into plant, machinery and buildings, which is capital formation.',
}));
Q('ar_rights', ar({
  t: 3, d: 3, c: 'analysis', key: 'c',
  a: 'In a rights issue, existing shareholders are given the first chance to buy new shares in proportion to their holding.',
  r: 'Shares under a rights issue must be offered to the general public before existing shareholders.',
  sol: 'A is true: a rights issue is a privilege of existing shareholders. R is false: it reverses the order; existing shareholders are offered the shares first, which is the whole idea of the issue.',
}));
Q('tf_secondary_location', tf({
  t: 3, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? Unlike the primary market, the secondary market usually has a fixed geographical location in the form of a stock exchange.',
  sol: 'The secondary market works through stock exchanges, whereas the primary market has no particular place; new issues are offered wherever investors can apply.',
}));
Q('fb_primary_name', fb({
  t: 3, d: 1, c: 'recall',
  stem: 'The primary market is also known as the ___ market.',
  acc: [['new issues', 'new issue']],
  sol: 'The primary market is the new issues market, where securities are sold for the first time.',
}));
Q('n_rights', num({
  t: 3, d: 2, c: 'application', marks: 1, value: RI_SHARES, unit: 'shares',
  stem: `Pavan Motors Ltd (imagined) makes a rights issue of ${RI.newPer} new shares for every ${RI.held} shares held. Anjali holds ${inr(RI.holding)} shares. How many rights shares is she entitled to?`,
  sol: `Step 1: Number of blocks of ${RI.held} shares = ${inr(RI.holding)} ÷ ${RI.held} = ${RI.holding / RI.held}.\nStep 2: Rights shares = ${RI.holding / RI.held} × ${RI.newPer} = ${RI_SHARES}.`,
}));
Q('s_pm_sm', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Distinguish between the primary market and the secondary market on the basis of (a) the type of securities traded and (b) capital formation.',
  model: '(a) The **primary market** deals in **new securities** issued for the first time; the **secondary market** deals in **existing securities** already issued.\n(b) The primary market contributes **directly** to capital formation; the secondary market helps only **indirectly**, by giving investors liquidity.',
  sol: 'One correct contrast on each basis.',
  scheme: [['Type of securities', 1], ['Capital formation', 1]],
}));
Q('s3_mm_cm_diff', short({
  t: 3, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: 'State three differences between the money market and the capital market.',
  model: '1. **Duration:** money market instruments mature within **a year**; capital market instruments are **medium- and long-term**.\n2. **Liquidity and safety:** money market instruments are **more liquid and safer**; capital market securities carry **more risk**.\n3. **Expected return:** the money market gives a **lower** return; the capital market can give a **higher** return through dividends and capital gains.',
  sol: 'Any three valid bases of difference (also: participants, instruments, investment outlay).',
  scheme: [['First difference', 1], ['Second difference', 1], ['Third difference', 1]],
}));
Q('s3_floatation', short({
  t: 3, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'Advise each of these imagined companies on a method of floatation, with a reason: (a) Sahyadri Paints wants existing shareholders to keep their share of ownership; (b) Ujjwal Tech wants to reach investors across India through a stock exchange\'s online system; (c) Kesar Agro wants funds quickly without the cost of a public issue.',
  model: '(a) **Rights issue:** new shares are first offered to existing shareholders in proportion to their holding, so their share of ownership is kept.\n(b) **e-IPO:** the issue is made through the exchange\'s online network with registered brokers, reaching investors everywhere.\n(c) **Private placement:** securities are sold to a few institutional investors, which is quicker and cheaper than a public issue.',
  sol: 'Match each need to the method and justify it.',
  scheme: [['(a) Rights issue with reason', 1], ['(b) e-IPO with reason', 1], ['(c) Private placement with reason', 1]],
}));
Q('l_floatation', long({
  t: 3, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Explain any five methods of floatation of new issues in the primary market.',
  model: '1. **Offer through prospectus:** the company invites the **public** to subscribe by issuing a prospectus; issues are often underwritten.\n2. **Offer for sale:** securities are first sold to **intermediaries** such as issuing houses or brokers at an agreed price, who **resell** them to the public.\n3. **Private placement:** securities are allotted to **institutional investors** and select individuals; it is **quicker and cheaper**.\n4. **Rights issue:** new shares are offered to **existing shareholders** in proportion to their holding.\n5. **e-IPO:** the issue is made through the **online system of a stock exchange**, with registered brokers accepting applications.',
  sol: 'Each method with its distinguishing feature: 1 mark each.',
  scheme: [['Offer through prospectus', 1], ['Offer for sale', 1], ['Private placement', 1], ['Rights issue', 1], ['e-IPO', 1]],
}));

// ================================================================ t04 Stock exchange and trading procedure
Q('m_se_meaning', mcq({
  t: 4, d: 1, c: 'understanding',
  stem: 'A stock exchange is best described as',
  opts: [
    'an institution that provides a platform for buying and selling existing securities',
    'a bank that lends to companies for long periods',
    'a government office that fixes the prices of shares',
    'a place where companies sell goods to consumers',
  ],
  sol: 'A stock exchange is the organised secondary market for existing securities. Prices there are set by demand and supply, not by a government office, and it does not lend money itself.',
}));
Q('m_se_safety', mcq({
  t: 4, d: 2, c: 'application',
  stem: 'Before investing, Farhan checks that the exchange where he will trade works under strict rules and a legal framework, so that his deals are settled properly. Which function of a stock exchange does this reflect?',
  opts: ['Safety of transactions', 'Spreading of equity cult', 'Providing scope for speculation', 'Pricing of securities'],
  sol: 'Trading on an exchange that works within a well-defined legal framework assures the safety of transactions. The other options are different functions of the exchange.',
}));
Q('m_equity_cult', mcq({
  t: 4, d: 3, c: 'application',
  stem: 'An imagined stock exchange runs investor-awareness camps in small towns, explains how to read company results and ensures better disclosure of company information. This helps in',
  opts: ['spreading the equity cult', 'providing scope for speculation', 'reducing the money supply', 'fixing the issue price of new shares'],
  sol: 'Educating the public and regulating new issues and trading encourage more people to invest in shares, which is called spreading the equity cult.',
}));
Q('m_demat', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'Dematerialisation of securities means',
  opts: [
    'holding securities in electronic form in an account instead of as paper certificates',
    'cancelling the shares of a company that has closed down',
    'converting shares into debentures',
    'selling shares at a price below their face value',
  ],
  sol: 'In dematerialisation, physical certificates are replaced by electronic holdings in a demat account with a depository participant. It is not cancellation, conversion or a discounted sale.',
}));
Q('m_depository', mcq({
  t: 4, d: 1, c: 'recall',
  stem: 'Which two organisations act as **depositories** in India?',
  opts: ['NSDL and CDSL', 'RBI and SEBI', 'SBI and LIC', 'BSE and NSE'],
  sol: 'The National Securities Depository Ltd (NSDL) and Central Depository Services (India) Ltd (CDSL) hold securities in electronic form. RBI and SEBI are regulators, SBI and LIC are financial institutions, and BSE and NSE are stock exchanges.',
}));
Q('m_dp_role', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'An investor deals with a depository through a',
  opts: ['depository participant (DP), such as a bank or broker registered with the depository', 'merchant banker appointed by SEBI', 'call money dealer', 'treasury bill auction'],
  sol: 'A depository participant is the depository\'s agent that opens and services the investor\'s demat account. Merchant bankers manage issues; the other options are money market terms.',
}));
Q('m_contract_note', mcq({
  t: 4, d: 2, c: 'application',
  stem: 'After Lakshmi\'s order to buy 50 shares of an imagined company is executed, her broker sends her a document giving the price, quantity, time of the trade and charges. This document is the',
  opts: ['contract note', 'prospectus', 'certificate of deposit', 'commercial bill'],
  sol: 'The contract note is the broker\'s record of an executed trade. A prospectus invites the public to a new issue; the other two are money market instruments.',
}));
Q('ar_demat_theft', ar({
  t: 4, d: 2, c: 'analysis', key: 'a',
  a: 'Holding shares in demat form removes the risk of theft, forgery or loss of share certificates.',
  r: 'In demat form, securities are held as electronic entries in an account and not as paper certificates.',
  sol: 'Both are true, and R explains A: there is no paper to be stolen, forged or lost when the holding is an electronic record.',
}));
Q('tf_se_new_issue', tf({
  t: 4, d: 2, c: 'application', ans: false,
  stem: 'True or false? When an investor buys shares of an imagined company on a stock exchange from another investor, the company receives the money.',
  sol: 'On the stock exchange, existing shares change hands between investors, so the selling investor is paid. The company receives money only when it issues new shares in the primary market.',
}));
Q('ord_trading', ord({
  t: 4, d: 2, c: 'understanding', marks: 1,
  stem: 'Arrange the steps of buying shares through an imagined online broker, Sugam Securities, in the correct order.',
  items: [
    'Open a trading account with the broker and a demat account with a depository participant',
    'Place a buy order with the broker',
    'The order is matched and executed on the stock exchange\'s online system',
    'The broker issues a contract note for the trade',
    'Settlement: money is paid and the shares are credited to the demat account',
  ],
  sol: 'Accounts are opened first, then the order is placed and executed; the contract note confirms the trade, and settlement completes it.',
}));
Q('n_brokerage', num({
  t: 4, d: 2, c: 'application', marks: 1, value: BR_FEE, unit: '₹',
  stem: `Vikram buys ${BR.shares} shares of an imagined company at ₹${BR.price} each. His broker charges brokerage of ${BR.ratePct} per cent of the value of the trade. How much brokerage does he pay (in ₹)?`,
  sol: `Step 1: Value of the trade = ${BR.shares} × ${BR.price} = ₹${inr(BR_VALUE)}.\nStep 2: Brokerage = ${BR.ratePct} per cent of ${inr(BR_VALUE)} = ${inr(BR_VALUE)} × ${BR.ratePct} ÷ 100 = ₹${BR_FEE}.`,
}));
Q('s_se_two_fn', short({
  t: 4, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Explain any two functions of a stock exchange.',
  model: '1. **Liquidity and marketability:** investors can sell existing securities at any time and turn them into cash.\n2. **Pricing of securities:** share prices are set by the demand and supply of buyers and sellers, giving a continuous, fair valuation of companies.',
  sol: 'Any two functions with a line of explanation each.',
  scheme: [['First function', 1], ['Second function', 1]],
}));
Q('s_demat_benefits', short({
  t: 4, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'Ramesh still keeps old share certificates in a cupboard in his Kolkata flat. Give him two reasons to convert them to demat form.',
  model: '1. **Safety:** electronic holdings cannot be **stolen, forged, damaged or lost** like paper certificates.\n2. **Easy and quick transfer:** shares can be sold or transferred quickly at low cost, with no paperwork or transfer delays.',
  sol: 'Two benefits of dematerialisation applied to the investor.',
  scheme: [['First benefit', 1], ['Second benefit', 1]],
}));
Q('s3_trading_steps', short({
  t: 4, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Describe the steps an investor follows to sell shares through a stock exchange.',
  model: '1. **Accounts:** open a **trading account** with a broker and a **demat account** with a depository participant.\n2. **Order and execution:** place a **sell order** with the broker, which is matched with a buyer on the exchange\'s **online system**; a **contract note** confirms the trade.\n3. **Settlement:** the shares are **debited** from the demat account and the **money is paid** to the investor within the settlement cycle.',
  sol: 'Accounts, order and execution with contract note, settlement.',
  scheme: [['Opening accounts', 1], ['Placing and executing the order, contract note', 1], ['Settlement', 1]],
}));
Q('l_se_functions', long({
  t: 4, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Explain any five functions of a stock exchange.',
  model: '1. **Liquidity and marketability:** existing securities can be bought and sold at any time.\n2. **Pricing of securities:** prices reflect the demand and supply of many buyers and sellers.\n3. **Safety of transactions:** trading takes place under **rules and a legal framework**, so deals are settled properly.\n4. **Contribution to economic growth:** by moving savings into the most profitable firms, it helps **capital formation** and growth.\n5. **Spreading the equity cult:** investor education, disclosure and regulation draw **more people** into share investment. (Also: **scope for speculation** within limits, which keeps trading active.)',
  sol: 'Any five functions, 1 mark each.',
  scheme: [['First function', 1], ['Second function', 1], ['Third function', 1], ['Fourth function', 1], ['Fifth function', 1]],
}));

// ================================================================ t05 SEBI
Q('m_sebi_year', mcq({
  t: 5, d: 1, c: 'recall',
  stem: 'SEBI was set up in 1988 and was given statutory powers in',
  opts: ['1992', '1956', '2005', '1969'],
  sol: 'SEBI began as a non-statutory body in 1988 and became a statutory body under the SEBI Act of 1992.',
}));
Q('m_sebi_protective', mcq({
  t: 5, d: 2, c: 'application',
  stem: 'SEBI penalises a director of an imagined company who bought its shares using secret information about a coming merger before it was made public. Which group of SEBI functions does this action belong to?',
  opts: ['Protective functions', 'Developmental functions', 'Regulatory functions of registering intermediaries', 'Functions of a depository'],
  sol: 'Prohibiting insider trading protects investors, so it is a protective function. Developmental functions include training intermediaries and research, and depositories only hold securities.',
}));
Q('m_sebi_developmental', mcq({
  t: 5, d: 3, c: 'application',
  stem: 'SEBI sponsors training programmes for stockbrokers and supports research on the securities market. These are examples of its',
  opts: ['developmental functions', 'protective functions', 'regulatory functions', 'money market operations'],
  sol: 'Training intermediaries and promoting research develop the market, so they are developmental functions. Protective functions guard investors against malpractice; regulatory functions register and control market participants.',
}));
Q('m_sebi_regulatory', mcq({
  t: 5, d: 2, c: 'understanding',
  stem: 'Which of these is a **regulatory** function of SEBI?',
  opts: [
    'Registering and regulating stockbrokers, sub-brokers and merchant bankers',
    'Issuing treasury bills for the Central Government',
    'Accepting deposits from the public',
    'Fixing the dividend that every company must pay',
  ],
  sol: 'SEBI registers and regulates market intermediaries, mutual funds and takeovers. Treasury bills are issued through the RBI, banks accept deposits, and dividends are decided by each company.',
}));
Q('ar_sebi_need', ar({
  t: 5, d: 3, c: 'analysis', key: 'a',
  a: 'A regulator such as SEBI is needed for the securities market.',
  r: 'Without regulation, malpractices such as price rigging and insider trading can harm investors and reduce their confidence in the market.',
  sol: 'Both are true, and R explains A: SEBI exists to prevent such malpractices and protect investors, so that savers keep trusting the market.',
}));
Q('tf_sebi_dev', tf({
  t: 5, d: 2, c: 'application', ans: true,
  stem: 'True or false? Educating investors about their rights and about safe investment is one of the protective functions of SEBI.',
  sol: 'Investor education is grouped with SEBI\'s protective functions, alongside prohibiting insider trading and unfair trade practices.',
}));
Q('mt_sebi', match({
  t: 5, d: 3, c: 'application',
  stem: 'Match each action taken by SEBI in an imagined year with the group of functions it belongs to.',
  pairs: [
    ['Banning a trader who rigged the price of a small company\'s shares', 'Protective'],
    ['Running a certification course for brokers\' staff', 'Developmental'],
    ['Registering a new mutual fund before it can collect money', 'Regulatory'],
    ['Inspecting the books of a stock exchange', 'Regulatory (inspection and audit)'],
  ],
  sol: 'Stopping price rigging protects investors; training intermediaries develops the market; registration of mutual funds and inspection of exchanges are regulatory functions.',
}));
Q('s_sebi_objectives', short({
  t: 5, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State any two objectives of SEBI.',
  model: '1. To **regulate stock exchanges and the securities industry** so that the market works in an orderly way.\n2. To **protect the rights and interests of investors**, especially individual investors, and guide and educate them.',
  sol: 'Any two objectives (also: preventing trading malpractices; a code of conduct for intermediaries).',
  scheme: [['First objective', 1], ['Second objective', 1]],
}));
Q('s3_sebi_protective', short({
  t: 5, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'Small investors in an imagined town complain that some traders spread false rumours to push up share prices, and that company insiders trade on secret news. Explain three protective steps SEBI can take.',
  model: '1. **Prohibit and punish fraudulent and unfair trade practices**, such as spreading false rumours and **price rigging**.\n2. **Prohibit insider trading:** act against insiders who buy or sell shares using unpublished, price-sensitive information.\n3. **Educate investors** through awareness programmes, so that they can judge rumours and make informed decisions.',
  sol: 'Three protective functions tied to the complaints.',
  scheme: [['Action against unfair practices or price rigging', 1], ['Prohibiting insider trading', 1], ['Investor education or fair practices', 1]],
}));
Q('l_sebi_functions', long({
  t: 5, d: 4, c: 'analysis', marks: 5, wl: L5,
  stem: 'Explain the protective, developmental and regulatory functions of SEBI, giving examples of each.',
  model: '1. **Protective functions:** prohibiting **insider trading** and **fraudulent or unfair practices** such as price rigging and misleading statements; **educating investors**; promoting fair practices and a code of conduct.\n2. **Developmental functions:** **training of intermediaries**; promoting **research**; taking a flexible approach, for example by allowing **internet trading** through registered brokers.\n3. **Regulatory functions:** **registering and regulating** brokers, sub-brokers, merchant bankers and **mutual funds**; framing rules and regulations; regulating **takeovers**; conducting **inspections and audits** of stock exchanges; levying fees.\nTogether they make the market **fair, efficient and trustworthy**.',
  sol: 'Each group of functions explained with examples, plus a concluding point.',
  scheme: [['Protective functions with examples', 2], ['Developmental functions with examples', 1], ['Regulatory functions with examples', 2]],
}));
Q('l_sebi_evaluate', long({
  t: 5, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: 'A neighbour says, "The stock market is a gamble; SEBI cannot do anything to protect small investors." Evaluate this statement.',
  model: '1. **Partly true:** share prices **can fall**, and no regulator can guarantee profits or remove market risk.\n2. **But malpractice is checked:** SEBI **prohibits insider trading** and **price rigging** and punishes offenders.\n3. **Disclosure:** companies must give information in their offer documents and results, so investors can judge **risk and value**.\n4. **Registered intermediaries:** brokers, merchant bankers and mutual funds must be **registered and follow codes of conduct**, and exchanges are **inspected**.\n5. **Conclusion:** SEBI cannot remove risk, but it makes the market **fairer and safer**; informed, diversified investing is not a gamble.',
  sol: 'A balanced judgement: what SEBI cannot do, what it does, and a reasoned conclusion.',
  scheme: [['Accepts that market risk remains', 1], ['Protection against malpractice', 1], ['Disclosure requirements', 1], ['Regulation of intermediaries and exchanges', 1], ['Reasoned conclusion', 1]],
}));

// ================================================================ case-based
Q('cb_suvarna', caseQ({
  t: 2, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the note from the treasury desk of Suvarna Steels and answer the questions on money market instruments that follow. *(Imagined company and figures, written by SOYL for practice.)*',
  passage: `**Treasury desk note, Suvarna Steels Ltd, Jamshedpur (imagined)**\n\nSuvarna Steels, a large company with a top credit rating, needs funds for four months to buy iron ore before its new share issue opens. The finance manager proposes an unsecured promissory note with a face value of ₹${CP.face} crore, which investors would buy for ₹${CP.raised} crore and which could be transferred by endorsement and delivery. Meanwhile, a customer has accepted a 90-day bill drawn by Suvarna for steel supplied on credit; the manager plans to get it discounted by the company's bank.`,
  parts: [
    child('a', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Identify the instrument Suvarna Steels proposes to issue for four months.', model: '**Commercial paper.**', sol: 'An unsecured, transferable promissory note of a strong company for less than a year is commercial paper.', scheme: [['Commercial paper', 1]] })),
    child('b', num({ t: 2, d: 2, c: 'understanding', marks: 1, value: CP_COST, unit: '₹ crore', stem: 'What is the cost to Suvarna Steels of raising money through this instrument (in ₹ crore)?', sol: `Step 1: Cost = face value repaid − amount received.\nStep 2: ${CP.face} − ${CP.raised} = ${CP_COST}. So ₹${CP_COST} crore.` })),
    child('c', short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Name the instrument the bill becomes once it is accepted and discounted through the bank, and state how it helps Suvarna.', model: 'It is a **commercial bill**. By getting it **discounted**, Suvarna receives cash **now** instead of waiting 90 days, which finances its **working capital**.', sol: 'Name the instrument and link discounting to immediate funds.', scheme: [['Commercial bill', 1], ['How discounting helps', 1]] }), [
      short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Why is the four-month borrowing described as "bridge financing"? Quote the words that show this.', model: 'The funds are needed only **until the new share issue opens**, so they **bridge the gap** before long-term money arrives: "**before its new share issue opens**".', sol: 'Explain the temporary role and quote the line.', scheme: [['Meaning of bridge financing', 1], ['Correct words quoted', 1]] }),
    ]),
  ],
}));
Q('cb_aarohan', caseQ({
  t: 3, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read about the fund-raising plans of Aarohan Electricals and answer the questions on methods of floatation that follow. *(Imagined company, written by SOYL for practice.)*',
  passage: '**Aarohan Electricals Ltd, Pune (imagined)**\n\nAarohan Electricals needs ₹200 crore to build a battery plant. The board discussed three routes. First, new shares could be offered to the existing shareholders, one for every four they hold, before anyone else. Second, the company could make its offer to the public through the online network of a stock exchange, with registered brokers accepting applications across the country. Third, a part of the issue could be sold directly to two insurance companies and a mutual fund, because that would be quick and inexpensive.',
  parts: [
    child('a', short({ t: 3, d: 2, c: 'application', marks: 1, stem: 'Identify the method of floatation described in the first route.', model: '**Rights issue.**', sol: 'Shares offered first to existing shareholders in proportion to their holding form a rights issue.', scheme: [['Rights issue', 1]] })),
    child('b', short({ t: 3, d: 2, c: 'application', marks: 1, stem: 'Identify the method described in the second route.', model: '**e-IPO** (offer through the online system of a stock exchange).', sol: 'Using the exchange\'s online network with registered brokers is an e-IPO.', scheme: [['e-IPO', 1]] })),
    child('c', short({ t: 3, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Name the method in the third route and quote the words that give its two advantages.', model: '**Private placement**: the words "**quick and inexpensive**" show its advantages of speed and low cost compared with a public issue.', sol: 'Name the method and quote the advantages.', scheme: [['Private placement', 1], ['Words quoted with the advantages', 1]] }), [
      short({ t: 3, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): In which market will all three routes take place, and why?', model: 'In the **primary market**, because in each route the company is issuing **new securities for the first time** and the money goes **directly to Aarohan** for its battery plant.', sol: 'Name the market and give the reason.', scheme: [['Primary market', 1], ['Reason', 1]] }),
    ]),
  ],
}));
Q('cb_kiran', caseQ({
  t: 4, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read about Kiran\'s first share purchase and answer the questions on stock exchange trading that follow. *(Imagined investor and broker, written by SOYL for practice.)*',
  passage: '**Kiran\'s diary, Bhopal (imagined)**\n\nI finally opened a trading account with Sugam Securities and an account with a depository participant, so my shares will be held electronically, not as paper certificates. On Monday I placed an order to buy 40 shares of an imagined fertiliser company, and within seconds it was matched with a seller on the exchange\'s screen. That evening the broker emailed me a document showing the price, the time of the trade and the brokerage. The shares appeared in my account soon after I paid.',
  parts: [
    child('a', short({ t: 4, d: 2, c: 'application', marks: 1, stem: 'Identify the process by which Kiran\'s shares are held "electronically, not as paper certificates".', model: '**Dematerialisation** (shares held in a demat account).', sol: 'Electronic holding in place of certificates is dematerialisation.', scheme: [['Dematerialisation', 1]] })),
    child('b', short({ t: 4, d: 2, c: 'application', marks: 1, stem: 'Name the document the broker emailed to Kiran.', model: '**Contract note.**', sol: 'The broker\'s record of an executed trade is the contract note.', scheme: [['Contract note', 1]] })),
    child('c', short({ t: 4, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Name the final step of the trading procedure shown in the last line and explain it.', model: '**Settlement:** Kiran **pays** for the shares and the shares are **credited** to her demat account, completing the trade within the settlement cycle.', sol: 'Name settlement and explain pay-in and delivery.', scheme: [['Settlement named', 1], ['Explanation', 1]] }), [
      short({ t: 4, d: 3, c: 'evaluation', marks: 2, stem: '**Or** (ii): Give two ways in which trading on a stock exchange protected Kiran in this purchase.', model: '1. The trade took place on an exchange working under **rules and a legal framework**, so it was **settled safely**.\n2. Her shares are held **electronically**, so they cannot be **lost or forged**.', sol: 'Two protections, from the exchange\'s safety and from demat holding.', scheme: [['First protection', 1], ['Second protection', 1]] }),
    ]),
  ],
}));
Q('cb_sebi_order', caseQ({
  t: 5, d: 4, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the summary of the regulator\'s year in an imagined market and answer the questions on the functions of SEBI that follow. *(Imagined events, written by SOYL for practice.)*',
  passage: '**A year at the market regulator (imagined summary)**\n\nIn April the regulator barred a group of traders who had sent fake messages to push up the share price of a small sugar company. In July it began an online certification course for the staff of brokers and funded a study on how small investors choose shares. In October two new mutual funds were registered only after their schemes were examined, and the books of a regional stock exchange were inspected. Throughout the year it ran investor-awareness camps in schools and colleges.',
  parts: [
    child('a', short({ t: 5, d: 2, c: 'application', marks: 1, stem: 'Which group of functions does the April action belong to?', model: '**Protective functions** (action against price rigging and unfair trade practices).', sol: 'Stopping manipulation of prices protects investors.', scheme: [['Protective', 1]] })),
    child('b', short({ t: 5, d: 2, c: 'application', marks: 1, stem: 'Which group of functions do the July actions belong to?', model: '**Developmental functions** (training intermediaries and promoting research).', sol: 'Training and research develop the market.', scheme: [['Developmental', 1]] })),
    child('c', short({ t: 5, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Identify the group of functions shown in October and quote the two actions.', model: '**Regulatory functions**: "**two new mutual funds were registered**" and "**the books of a regional stock exchange were inspected**".', sol: 'Name the group and quote both actions.', scheme: [['Regulatory functions', 1], ['Both actions quoted', 1]] }), [
      short({ t: 5, d: 4, c: 'evaluation', marks: 2, stem: '**Or** (ii): Which line shows a second protective function, and why does it matter for the market?', model: 'The line on "**investor-awareness camps in schools and colleges**" shows **investor education**. Informed investors are harder to mislead and more willing to invest, which **builds confidence** in the market.', sol: 'Quote the line and explain the importance.', scheme: [['Line identified as investor education', 1], ['Why it matters', 1]] }),
    ]),
  ],
}));
