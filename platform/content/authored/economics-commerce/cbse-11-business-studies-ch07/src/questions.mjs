// CBSE 11 Business Studies, ch07 Sources of Business Finance: question bank. Every firm, start-up, exporter and figure is
// imagined and written by SOYL; no NCERT example, exercise or board/sample-paper item is reused (D-036).
import { Q, mcq, ar, tf, fb, match, ord, short, long, caseQ, child } from '../../cbse-11-business-studies-ch01/src/lib.mjs';

const S2 = [30, 50];
const S3 = [50, 80];
const L5 = [80, 120];
export const fmt = (n) => n.toLocaleString('en-IN');

// Indian-style number words for narration (lakh, crore).
const ONES = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
const TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
const w2 = (n) => (n < 20 ? ONES[n] : TENS[Math.floor(n / 10)] + (n % 10 ? ' ' + ONES[n % 10] : ''));
const w3 = (n) => (n >= 100 ? ONES[Math.floor(n / 100)] + ' hundred' + (n % 100 ? ' and ' + w2(n % 100) : '') : w2(n));
export const W = (n) => {
  if (n === 0) return 'zero';
  const parts = [];
  const cr = Math.floor(n / 10000000); n %= 10000000;
  const lk = Math.floor(n / 100000); n %= 100000;
  const th = Math.floor(n / 1000); n %= 1000;
  if (cr) parts.push(w2(cr) + ' crore');
  if (lk) parts.push(w2(lk) + ' lakh');
  if (th) parts.push(w2(th) + ' thousand');
  if (n) parts.push(w3(n));
  return parts.join(' ');
};

// ---- computed figures used in stems, solutions and slides ---------------------------------------------------
// Chitra Tiles debentures (Rs); the tax rate is imagined for the example.
export const DEB = { n: 5000, face: 1000, rate: 11, taxPct: 25 };
DEB.total = DEB.n * DEB.face; // 5,000,000
DEB.int = (DEB.total * DEB.rate) / 100; // 550,000
DEB.shield = (DEB.int * DEB.taxPct) / 100; // 137,500
DEB.net = DEB.int - DEB.shield; // 412,500
// Aadhar Polymers cumulative preference shares (Rs).
export const PREF = { n: 20000, face: 100, rate: 9, years: 2, eqShares: 100000, profit: 800000 };
PREF.annual = (PREF.n * PREF.face * PREF.rate) / 100; // 180,000
PREF.arrear = PREF.annual * PREF.years; // 360,000
PREF.due = PREF.arrear + PREF.annual; // 540,000
PREF.left = PREF.profit - PREF.due; // 260,000
PREF.perShare = PREF.left / PREF.eqShares; // 2.6
// Kosi Cables (check item) and Veer Plastics (short answer) cumulative preference shares (Rs).
export const PB = { n: 10000, face: 100, rate: 8, years: 3 };
PB.annual = (PB.n * PB.face * PB.rate) / 100; // 80,000
PB.arrear = PB.annual * PB.years; // 240,000
export const PC = { n: 5000, face: 200, rate: 10, years: 2 };
PC.annual = (PC.n * PC.face * PC.rate) / 100; // 100,000
PC.arrear = PC.annual * PC.years; // 200,000
// Nirmaan Labs equity issue (Rs).
export const EQ = { old: 800000, prom: 600000, add: 200000, price: 30, costPct: 4 };
EQ.raise = EQ.add * EQ.price; // 6,000,000
EQ.cost = (EQ.raise * EQ.costPct) / 100; // 240,000
EQ.net = EQ.raise - EQ.cost; // 5,760,000
EQ.before = (EQ.prom * 100) / EQ.old; // 75
EQ.after = (EQ.prom * 100) / (EQ.old + EQ.add); // 60
// Sutra Looms start-up needs (Rs).
export const NEED = { machine: 1200000, fit: 300000, stock: 400000, wages: 120000, power: 80000 };
NEED.fixed = NEED.machine + NEED.fit; // 1,500,000
NEED.work = NEED.stock + NEED.wages + NEED.power; // 600,000
NEED.total = NEED.fixed + NEED.work; // 2,100,000
// Trade credit of Chitra Tiles (Rs).
export const TC = { perDay: 8000, days: 45 };
TC.fund = TC.perDay * TC.days; // 360,000
// Madhur Bakers lease (Rs).
export const LEASE = { price: 800000, rent: 18000, months: 60 };
LEASE.total = LEASE.rent * LEASE.months; // 1,080,000
LEASE.extra = LEASE.total - LEASE.price; // 280,000
// Commercial paper of an imagined large firm (Rs).
export const CP = { face: 10000000, issue: 9800000 };
CP.disc = CP.face - CP.issue; // 200,000
// Tarang Garments GDR issue; the exchange rate is imagined.
export const GDR = { shares: 400000, ratio: 2, price: 12, rate: 80 };
GDR.count = GDR.shares / GDR.ratio; // 200,000
GDR.usd = GDR.count * GDR.price; // 2,400,000
GDR.inr = GDR.usd * GDR.rate; // 192,000,000
// Vihaan Pumps: loan or equity (Rs).
export const LOAN = { need: 4000000, rate: 12, good: 900000, poor: 300000 };
LOAN.int = (LOAN.need * LOAN.rate) / 100; // 480,000
LOAN.left = LOAN.good - LOAN.int; // 420,000
LOAN.gap = LOAN.poor - LOAN.int; // -180,000
// Bhumi Seeds retained earnings (Rs).
export const RET = { profit: 4000000, payPct: 60 };
RET.div = (RET.profit * RET.payPct) / 100; // 2,400,000
RET.kept = RET.profit - RET.div; // 1,600,000
if (DEB.total !== 5000000 || DEB.int !== 550000 || DEB.shield !== 137500 || DEB.net !== 412500 || PREF.annual !== 180000 || PREF.arrear !== 360000 || PREF.due !== 540000 || PREF.left !== 260000 || PREF.perShare !== 2.6 ||
  PB.arrear !== 240000 || PC.arrear !== 200000 || EQ.raise !== 6000000 || EQ.cost !== 240000 || EQ.net !== 5760000 || EQ.before !== 75 || EQ.after !== 60 ||
  NEED.fixed !== 1500000 || NEED.work !== 600000 || NEED.total !== 2100000 || TC.fund !== 360000 || LEASE.total !== 1080000 || LEASE.extra !== 280000 || CP.disc !== 200000 ||
  GDR.count !== 200000 || GDR.usd !== 2400000 || GDR.inr !== 192000000 || LOAN.int !== 480000 || LOAN.left !== 420000 || LOAN.gap !== -180000 || RET.div !== 2400000 || RET.kept !== 1600000) throw new Error('figure check failed');

// ================================================================ t01 Nature and significance of business finance
Q('mc_fin_def', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: `Which statement best describes business finance?`,
  opts: [
    `The funds that a business needs to start, run and grow its activities`,
    `The profit that a business earns in one year`,
    `The cash that is kept in the owner's pocket for personal use`,
    `The value of the goods lying in the godown`,
  ],
  sol: `Business finance means the funds needed for setting up, running and expanding a business. Profit is a result of operations, personal cash is not business money, and stock is only one asset bought with funds.`,
}));
Q('mc_fixed_id', mcq({
  t: 1, d: 2, c: 'application',
  stem: `Chitra Tiles, an imagined tile maker of the imagined town of Kilnpur, pays Rs ${fmt(1200000)} for a new kiln that will serve the firm for many years. This outlay is a need for`,
  opts: [`fixed capital`, `working capital`, `trade credit`, `retained earnings`],
  sol: `Funds spent on a long-lived asset such as a kiln are fixed capital. Working capital meets day-to-day costs, while trade credit and retained earnings are sources of funds, not needs.`,
}));
Q('mc_wc_id', mcq({
  t: 1, d: 2, c: 'application',
  stem: `Every month Chitra Tiles must pay for clay, glaze, wages and electricity so that the kiln keeps running. The funds set aside for these payments are`,
  opts: [`working capital`, `fixed capital`, `owners' funds`, `a lease rental`],
  sol: `Money for materials, wages and power that keep daily operations going is working capital. Fixed capital buys long-term assets, owners' funds is a source classified by ownership, and a lease rental is a payment for hired assets.`,
}));
Q('mc_period_cls', mcq({
  t: 1, d: 3, c: 'application',
  stem: `Chitra Tiles borrows from a bank to buy a seasonal stock of glaze and promises to repay the loan within eight months. Classified by period, this source is`,
  opts: [`short-term`, `medium-term`, `long-term`, `permanent`],
  sol: `A source repayable within about a year is short-term. A medium-term source runs for more than one year and up to about five, a long-term source runs longer, and permanent capital is never repaid in the life of the firm.`,
}));
Q('mc_internal', mcq({
  t: 1, d: 3, c: 'application',
  stem: `Bhumi Seeds, an imagined seed company, keeps Rs ${fmt(RET.kept)} of this year's profit in the business instead of paying it out. Classified by ownership and by source of generation, this money is`,
  opts: [`an owners' fund and an internal source`, `a borrowed fund and an internal source`, `an owners' fund and an external source`, `a borrowed fund and an external source`],
  sol: `Profit kept by the firm belongs to its owners and is generated inside the business. It is not borrowed, and it did not come from outside the firm.`,
}));

// ================================================================ t02 Owners' funds and borrowed funds
Q('mc_eq_vote', mcq({
  t: 2, d: 2, c: 'application',
  stem: `Mahi buys equity shares of Nirmaan Labs, an imagined start-up, and attends its annual meeting to vote on the choice of directors. Which feature of equity shares does this show?`,
  opts: [`Equity holders have voting rights and so a say in control`, `Equity holders are promised a fixed dividend every year`, `Equity holders must be repaid on a fixed date`, `Equity holders are creditors of the company`],
  sol: `Equity shareholders own the company and vote on key matters. A fixed dividend and repayment on a fixed date belong to preference shares and debentures, and creditors are lenders, not owners.`,
}));
Q('mc_eq_lim', mcq({
  t: 2, d: 3, c: 'application',
  stem: `Promoters of Nirmaan Labs hold ${EQ.before} per cent of its shares. After a fresh issue to outsiders their holding falls to ${EQ.after} per cent. Which limitation of equity shares does this show?`,
  opts: [`Dilution of control`, `A fixed burden of dividend`, `Compulsory repayment`, `Lack of a credit base`],
  sol: `A smaller share of voting power for the promoters is dilution of control. Equity carries no fixed dividend and no repayment date, and a large equity base actually helps the firm's credit.`,
}));
Q('mc_pref_def', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: `Which statement describes preference shares correctly?`,
  opts: [
    `They carry a fixed rate of dividend and priority over equity shares in the payment of dividend and in the return of capital`,
    `They carry voting rights equal to equity shares and an uncertain dividend`,
    `They are an acknowledgement of debt for which interest must be paid`,
    `They are funds obtained from suppliers on credit`,
  ],
  sol: `A fixed dividend with priority over equity, in dividend and in repayment, defines preference shares. The second option describes equity, the third describes debentures and the fourth describes trade credit.`,
}));
Q('mc_pref_cum_id', mcq({
  t: 2, d: 3, c: 'application',
  stem: `Aadhar Polymers, an imagined firm, made a loss and paid no dividend on its preference shares this year. The terms say that the unpaid dividend will be added to the next year's dividend before equity holders get anything. These are`,
  opts: [`cumulative preference shares`, `non-cumulative preference shares`, `participating preference shares`, `irredeemable debentures`],
  sol: `Preference shares whose unpaid dividend carries forward are cumulative. Non-cumulative shares lose the dividend of a year with no profit, participating shares share in extra profit, and debentures are not shares.`,
}));
Q('mc_pref_conv', mcq({
  t: 2, d: 3, c: 'application',
  stem: `Tilak holds preference shares of an imagined firm, Rekha Metals. The terms give him the right to exchange them for equity shares after four years. These preference shares are`,
  opts: [`convertible`, `redeemable`, `non-participating`, `cumulative`],
  sol: `The right to change into equity shares makes preference shares convertible. Redeemable shares are repaid after a period, non-participating shares do not share in extra profit, and cumulative shares carry forward unpaid dividend.`,
}));
Q('mc_arrear', mcq({
  t: 2, d: 4, c: 'application',
  stem: `Kosi Cables, an imagined firm, has ${fmt(PB.n)} cumulative preference shares of Rs ${PB.face} each at ${PB.rate} per cent. No dividend was paid for ${PB.years} years. The arrear of dividend is`,
  opts: [`Rs ${fmt(PB.arrear)}`, `Rs ${fmt(PB.annual)}`, `Rs ${fmt(PB.annual * (PB.years + 1))}`, `Rs ${fmt(PB.n * PB.face)}`],
  sol: `The dividend for one year is ${PB.rate} per cent of Rs ${fmt(PB.n * PB.face)}, which is Rs ${fmt(PB.annual)}. For ${PB.years} years the arrear is Rs ${fmt(PB.arrear)}. One year's dividend omits the other years, the third value counts a year too many, and the last is the capital itself.`,
}));
Q('mc_ret_lim', mcq({
  t: 2, d: 3, c: 'application',
  stem: `Bhumi Seeds keeps a large part of every year's profit in the firm, and its shareholders complain that their dividends are small. Which limitation of retained earnings does this show?`,
  opts: [`Shareholders may be dissatisfied because dividends are cut`, `The firm must pay a fixed interest on retained profit`, `Control of the firm passes to outsiders`, `The firm must repay the retained profit on a fixed date`],
  sol: `Keeping profit in the firm lowers dividends and can upset shareholders. Retained profit carries no interest, brings in no outsiders and has no repayment date.`,
}));
Q('mc_deb_int', mcq({
  t: 2, d: 3, c: 'application',
  stem: `Chitra Tiles issues ${fmt(DEB.n)} debentures of Rs ${fmt(DEB.face)} each at ${DEB.rate} per cent a year. The interest it must pay in one year is`,
  opts: [`Rs ${fmt(DEB.int)}`, `Rs ${fmt(DEB.total)}`, `Rs ${fmt(DEB.net)}`, `Rs ${fmt(DEB.shield)}`],
  sol: `The amount raised is ${fmt(DEB.n)} times Rs ${fmt(DEB.face)}, which is Rs ${fmt(DEB.total)}, and ${DEB.rate} per cent of it is Rs ${fmt(DEB.int)}. The second value is the capital, the third is the cost after the imagined tax saving, and the fourth is that saving.`,
}));
Q('mc_deb_secured', mcq({
  t: 2, d: 3, c: 'application',
  stem: `Debenture holders of Pavan Steel, an imagined company, are told that a charge is created on the company's factory, so that they can claim it if interest or repayment is not paid. These debentures are`,
  opts: [`secured debentures`, `unsecured debentures`, `bearer debentures`, `convertible preference shares`],
  sol: `Debentures backed by a charge on the firm's assets are secured. Unsecured debentures have no such charge, bearer debentures are a matter of how they are transferred, and preference shares are owners' funds.`,
}));
Q('mc_deb_bearer', mcq({
  t: 2, d: 3, c: 'application',
  stem: `Debentures of an imagined company can be passed from one person to another just by handing over the certificate, with no entry of the new holder's name in the company's books. These are`,
  opts: [`bearer debentures`, `registered debentures`, `secured debentures`, `convertible debentures`],
  sol: `Transfer by simple delivery marks bearer debentures. Registered debentures need the holder's name to be recorded and transferred in the books, secured refers to a charge on assets, and convertible refers to a right to change into shares.`,
}));
Q('mc_bank_loan', mcq({
  t: 2, d: 3, c: 'application',
  stem: `Vihaan Pumps, an imagined firm, borrows Rs ${fmt(LOAN.need)} from a commercial bank for four years at ${LOAN.rate} per cent a year and gives its land as security. The firm must pay interest of Rs ${fmt(LOAN.int)} a year. This source is`,
  opts: [`a borrowed fund with a fixed interest burden`, `an owners' fund with a variable dividend`, `retained earnings`, `a public deposit with no security`],
  sol: `A bank loan is borrowed money on which fixed interest is paid whether the firm earns a profit or not. It brings no ownership, it is not generated inside the firm, and the stem says that security was given.`,
}));
Q('mc_trade_credit', mcq({
  t: 2, d: 3, c: 'application',
  stem: `Chitra Tiles buys Rs ${fmt(TC.perDay)} of clay a day from a supplier who allows ${TC.days} days to pay. Which source of finance does the firm use?`,
  opts: [`Trade credit`, `Commercial paper`, `Debentures`, `Lease financing`],
  sol: `Credit given by a supplier is trade credit. Commercial paper is a note issued by a large firm, debentures are bonds sold to investors, and a lease gives the use of an asset for rentals.`,
}));
Q('mc_lease', mcq({
  t: 2, d: 3, c: 'application',
  stem: `Madhur Bakers, an imagined bakery, does not buy an oven. It hires one from a finance firm and pays Rs ${fmt(LEASE.rent)} every month for five years. Here the finance firm is the`,
  opts: [`lessor, and the monthly payment is a lease rental`, `lessee, and the monthly payment is a dividend`, `debenture holder, and the monthly payment is a premium`, `depositor, and the monthly payment is a commission`],
  sol: `The owner who lets out the asset is the lessor, and the regular payment is the lease rental. The bakery, which uses the oven, is the lessee, and the monthly payment is neither a dividend nor a premium nor a commission.`,
}));
Q('mc_pd', mcq({
  t: 2, d: 3, c: 'understanding',
  stem: `A well-known imagined company invites the general public to place deposits with it for a fixed period against receipts, and pays interest on them, within the rules for such deposits as of 2024. This source is`,
  opts: [`public deposits`, `commercial paper`, `equity shares`, `retained earnings`],
  sol: `Deposits that a company accepts directly from the public under rules are public deposits. Commercial paper is a note for large firms, equity shares are ownership capital, and retained earnings are generated inside the firm.`,
}));
Q('mc_cp', mcq({
  t: 2, d: 4, c: 'application',
  stem: `Rangoli Industries, an imagined large and creditworthy firm, issues a promissory note with no security, for ninety days, at Rs ${fmt(CP.issue)} against a face value of Rs ${fmt(CP.face)}, to meet a short-term need. As of 2024, this instrument is`,
  opts: [`commercial paper`, `a secured debenture`, `a preference share`, `a lease`],
  sol: `An unsecured promissory note for the short-term needs of a large firm, sold at a discount to face value, is commercial paper. A debenture here would be secured and long-term, a preference share is owners' capital, and a lease is the hiring of an asset.`,
}));
Q('mc_icd', mcq({
  t: 2, d: 3, c: 'understanding',
  stem: `Sagar Auto, an imagined company with idle cash, places Rs ${fmt(2500000)} for three months as a deposit with another company, Rhea Motors, which needs short-term funds. This is an example of`,
  opts: [`an inter-corporate deposit`, `a public deposit`, `a bank term loan`, `a global depository receipt`],
  sol: `A deposit made by one company with another is an inter-corporate deposit. A public deposit is taken from the general public, a bank loan comes from a bank, and a depository receipt is an international instrument.`,
}));
Q('mc_cmp_tax', mcq({
  t: 2, d: 4, c: 'analysis',
  stem: `Two imagined firms need the same amount. Rao Foods issues equity shares and pays dividends. Soni Foods issues debentures and pays interest. Which statement about tax treatment is correct, as a general principle?`,
  opts: [
    `Interest paid by Soni Foods is deducted as an expense before tax, but dividends of Rao Foods are paid out of profit after tax`,
    `Dividends of Rao Foods are deducted before tax, but interest of Soni Foods is not`,
    `Neither interest nor dividend has any link with the tax of the firm`,
    `Both are deducted before tax in exactly the same way`,
  ],
  sol: `Interest is an expense and lowers the taxable profit, which is the tax benefit of borrowing. Dividends are a share of profit after tax. The other options reverse this, ignore it or equate the two.`,
}));

// ================================================================ t03 International financing and choice of source
Q('mc_intl_agency', mcq({
  t: 3, d: 3, c: 'understanding',
  stem: `Ganga Power, an imagined power company, borrows for a large project from an international development bank set up by many countries to support growth. Which source of international finance is this?`,
  opts: [`International agencies and development banks`, `Commercial banks abroad`, `Inter-corporate deposits`, `Trade credit`],
  sol: `Loans for projects from institutions set up by many countries come from international agencies and development banks. Commercial banks abroad are ordinary lenders, and the last two options are domestic sources.`,
}));
Q('mc_gdr_id', mcq({
  t: 3, d: 3, c: 'application',
  stem: `Tarang Garments, an imagined exporter, wants to raise funds abroad. A depository bank in a foreign market holds its shares and issues receipts against them, which are traded in markets outside the United States. These are`,
  opts: [`Global Depository Receipts`, `American Depository Receipts`, `Indian Depository Receipts`, `Foreign Currency Convertible Bonds`],
  sol: `Receipts traded in markets outside the United States are Global Depository Receipts. American receipts are traded in the United States, Indian receipts are issued in India by foreign firms, and bonds are a debt instrument.`,
}));
Q('mc_gdr_vote', mcq({
  t: 3, d: 3, c: 'application',
  stem: `Lena buys Global Depository Receipts of an imagined Indian firm in a foreign market and later asks whether she can vote at the firm's general meeting through them. The correct reply is that`,
  opts: [`holders of such receipts do not have voting rights`, `holders have the same votes as equity holders`, `holders vote only if they are Indian citizens`, `holders have double votes`],
  sol: `Holders of these receipts do not have voting rights in the issuing company. The other replies give them votes that the receipts do not carry.`,
}));
Q('mc_adr_id', mcq({
  t: 3, d: 3, c: 'application',
  stem: `An imagined Indian software firm, Vidya Soft, has its shares held by a depository bank in the United States, which issues receipts that are bought and sold on a United States exchange. These are`,
  opts: [`American Depository Receipts`, `Global Depository Receipts`, `Indian Depository Receipts`, `commercial paper`],
  sol: `Receipts issued and traded in the United States are American Depository Receipts. Global receipts are traded outside the United States, Indian receipts are issued in India, and commercial paper is a short-term note.`,
}));
Q('mc_idr_id', mcq({
  t: 3, d: 3, c: 'application',
  stem: `Kestrel Mining, an imagined foreign company, offers its receipts to investors in India and the receipts are traded on an Indian stock exchange. These are`,
  opts: [`Indian Depository Receipts`, `American Depository Receipts`, `Global Depository Receipts`, `Foreign Currency Convertible Bonds`],
  sol: `Receipts issued in India by a foreign company are Indian Depository Receipts. American and global receipts are issued by firms from India for foreign markets, and bonds are a debt instrument.`,
}));
Q('mc_fccb_id', mcq({
  t: 3, d: 3, c: 'application',
  stem: `Zenith Pharma, an imagined firm, issues bonds in a foreign currency on which interest is paid, and the holders may later convert them into the company's shares on stated terms. These are`,
  opts: [`Foreign Currency Convertible Bonds`, `Global Depository Receipts`, `cumulative preference shares`, `bearer debentures`],
  sol: `Bonds in a foreign currency that can be converted into shares are Foreign Currency Convertible Bonds. Depository receipts represent shares, preference shares are not bonds issued abroad, and bearer debentures are not tied to a foreign currency or to conversion.`,
}));
Q('mc_factor_cost', mcq({
  t: 3, d: 3, c: 'application',
  stem: `Before choosing between a bank loan and an issue of equity shares, the finance manager of Vihaan Pumps compares the interest and the issue expenses of each. Which factor affecting the choice of source is this?`,
  opts: [`Cost`, `Control`, `Flexibility`, `Tax benefit`],
  sol: `Comparing the cost of raising and servicing each source is the factor of cost. Control concerns who makes decisions, flexibility concerns ease of raising and repaying, and tax benefit concerns the deduction of interest.`,
}));
Q('mc_factor_control', mcq({
  t: 3, d: 4, c: 'analysis',
  stem: `The promoters of Nirmaan Labs do not wish to lose their hold over decisions, so they choose a loan and not a new issue of equity shares. Which factor decided the choice?`,
  opts: [`Control`, `Cost`, `Purpose and time period`, `Form of organisation and legal status`],
  sol: `Avoiding dilution of voting power is the factor of control. The stem does not mention comparing costs, matching the source to a purpose, or the legal form of the firm.`,
}));

// ---- assertion-reason
Q('ar_pref_prior', ar({
  t: 2, d: 4, c: 'analysis', verdict: 'both-true-explains',
  a: `Preference shares are seen as a safer investment than equity shares.`,
  r: `Preference shareholders get a fixed dividend, with priority over equity holders in the payment of dividend and in the return of capital.`,
  sol: `Both are true. The fixed dividend and priority make the position of preference holders safer, so R explains A.`,
}));
Q('ar_deb_tax', ar({
  t: 2, d: 4, c: 'analysis', verdict: 'A-true-R-false',
  a: `Interest on debentures lowers the taxable profit of a company.`,
  r: `Debenture holders are owners of the company and have voting rights.`,
  sol: `A is true, because interest is an expense that can be deducted before tax. R is false, because debenture holders are lenders and have no voting rights.`,
}));
Q('ar_equity_ret', ar({
  t: 2, d: 4, c: 'analysis', verdict: 'both-true-not-explains',
  a: `Retained earnings carry no cost of issue.`,
  r: `Equity share capital is permanent capital that is not repaid during the life of the company.`,
  sol: `Both are true, but the permanence of equity capital does not explain why retained profit has no issue cost, so R does not explain A.`,
}));
Q('ar_gdr', ar({
  t: 3, d: 4, c: 'analysis', verdict: 'A-false-R-true',
  a: `Holders of Global Depository Receipts enjoy voting rights directly in the issuing company.`,
  r: `Global Depository Receipts are traded in markets outside the United States.`,
  sol: `A is false, because such holders do not have voting rights. R is true, because these receipts are traded in markets outside the United States.`,
}));
Q('ar_fccb', ar({
  t: 3, d: 4, c: 'analysis', verdict: 'both-true-explains',
  a: `A Foreign Currency Convertible Bond lets a firm borrow abroad now and give shares to the lender later.`,
  r: `It is issued in a foreign currency and may be converted into shares on stated terms.`,
  sol: `Both are true. The conversion feature is what allows the later issue of shares, so R explains A.`,
}));
Q('ar_need', ar({
  t: 1, d: 3, c: 'understanding', verdict: 'both-true-not-explains',
  a: `Working capital is needed for the day-to-day operations of a business.`,
  r: `Fixed capital is spent on long-term assets such as machinery and buildings.`,
  sol: `Both are true, but the use of fixed capital does not explain why working capital is needed for daily operations, so R does not explain A.`,
}));

// ---- true-false, fill in the blanks, match, ordering
Q('tf_wc', tf({
  t: 1, d: 2, c: 'understanding', ans: false,
  stem: `Working capital is the fund that a firm needs to buy long-lived assets such as land and machinery.`,
  sol: `Long-lived assets need fixed capital. Working capital meets day-to-day costs such as materials, wages and power.`,
}));
Q('tf_ret', tf({
  t: 2, d: 3, c: 'understanding', ans: false,
  stem: `To use retained earnings, a company must first invite the public to subscribe for new securities.`,
  sol: `Retained earnings are profit kept inside the firm, so no outside invitation is needed. That is why they are called an internal source.`,
}));
Q('tf_adr', tf({
  t: 3, d: 2, c: 'recall', ans: true,
  stem: `American Depository Receipts are issued and traded in the United States against shares of a foreign company.`,
  sol: `That is the meaning of American Depository Receipts: they are traded in the United States.`,
}));
Q('fb_cls', fb({
  t: 1, d: 2, c: 'recall',
  stem: `Sources of finance can be classified by period, by ___ and by ___ of generation.`,
  acc: [['ownership'], ['source']],
  sol: `The three bases are period, ownership and source of generation.`,
}));
Q('fb_deb', fb({
  t: 2, d: 2, c: 'recall',
  stem: `A debenture is an acknowledgement of ___ by a company and carries ___ interest.`,
  acc: [['debt'], ['fixed']],
  sol: `A debenture acknowledges a debt of the company and carries fixed interest.`,
}));
Q('fb_idr', fb({
  t: 3, d: 2, c: 'recall',
  stem: `Indian Depository Receipts are issued in ___ by ___ companies.`,
  acc: [['india'], ['foreign']],
  sol: `Indian Depository Receipts are issued in India by foreign companies.`,
}));
Q('mt_source_clue', match({
  t: 2, d: 3, c: 'application',
  stem: `Match each imagined situation with the source of finance it shows.`,
  pairs: [
    [`Lila Foods pays a supplier twenty days after receiving the flour`, `Trade credit`],
    [`Ujjwal Steel hires a furnace and pays a monthly rental to its owner`, `Lease financing`],
    [`Panna Paper, a large firm, issues an unsecured short-term promissory note`, `Commercial paper`],
    [`Heera Cables keeps part of its profit in the business`, `Retained earnings`],
  ],
  sol: `Credit from a supplier is trade credit, hiring an asset for rentals is lease financing, an unsecured short-term note of a large firm is commercial paper, and profit kept in the firm is retained earnings.`,
}));
Q('mt_instrument', match({
  t: 3, d: 3, c: 'understanding',
  stem: `Match each international instrument with its main feature.`,
  pairs: [
    [`Global Depository Receipt`, `Traded in markets outside the United States; holders have no voting rights`],
    [`American Depository Receipt`, `Traded in the United States against shares of a foreign firm`],
    [`Indian Depository Receipt`, `Issued in India by a foreign company`],
    [`Foreign Currency Convertible Bond`, `Issued in a foreign currency and convertible into shares`],
  ],
  sol: `Global receipts trade outside the United States, American receipts trade in the United States, Indian receipts are issued in India by foreign companies, and the bond is in foreign currency with a conversion right.`,
}));
Q('od_period', ord({
  t: 1, d: 3, c: 'understanding',
  stem: `Arrange these sources of an imagined firm from the shortest to the longest period.`,
  items: [`Trade credit of thirty days`, `A bank loan repayable in three years`, `Debentures repayable after ten years`, `Equity share capital that is never repaid in the life of the firm`],
  sol: `Trade credit is short-term, the bank loan is medium-term, the debentures are long-term, and equity capital is permanent.`,
}));
Q('od_lease', ord({
  t: 2, d: 3, c: 'understanding',
  stem: `Arrange the steps of an imagined lease of a packing machine for Madhur Bakers in a sensible order.`,
  items: [`Madhur Bakers selects the machine it needs`, `The lessor buys the machine and a lease agreement is signed`, `Madhur Bakers uses the machine and pays the lease rentals`, `At the end of the lease the machine goes back to the lessor`],
  sol: `The lessee chooses the asset, the lessor buys it and signs the agreement, the lessee uses it and pays rentals, and the asset returns at the end.`,
}));

// ================================================================ short answers
Q('s2_fixed_wc', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: `Distinguish fixed capital from working capital in one point each.`,
  model: `Fixed capital is the money needed for long-term assets such as land, machinery and buildings. Working capital is the money needed for day-to-day operations such as buying materials, paying wages and meeting power bills.`,
  sol: `Each term explained with an example.`,
  scheme: [[`Fixed capital explained`, 1], [`Working capital explained`, 1]],
}));
Q('s2_basis', short({
  t: 1, d: 2, c: 'recall', marks: 2, wl: S2,
  stem: `Name the three bases on which sources of business finance are classified, and give one example of an internal source.`,
  model: `Sources are classified by period (long, medium or short term), by ownership (owners' funds or borrowed funds) and by source of generation (internal or external). Retained earnings are an example of an internal source.`,
  sol: `Three bases and one internal source.`,
  scheme: [[`Three bases named`, 1], [`An internal source named`, 1]],
}));
Q('s2_pref_def', short({
  t: 2, d: 2, c: 'recall', marks: 2, wl: S2,
  stem: `What are preference shares? State one advantage that their holders have over equity holders.`,
  model: `Preference shares carry a fixed rate of dividend. Their holders have priority over equity holders in the payment of dividend and in the return of capital if the company is wound up.`,
  sol: `Meaning and one advantage.`,
  scheme: [[`Meaning of preference shares`, 1], [`One advantage over equity holders`, 1]],
}));
Q('s2_arrear', short({
  t: 2, d: 4, c: 'application', marks: 2, wl: S2,
  stem: `Veer Plastics, an imagined company, has ${fmt(PC.n)} cumulative preference shares of Rs ${PC.face} each at ${PC.rate} per cent. It paid no dividend for ${PC.years} years. Find the arrear of dividend.`,
  model: `The dividend for one year is ${PC.rate} per cent of ${fmt(PC.n)} times Rs ${PC.face}, which is Rs ${fmt(PC.annual)}. For ${PC.years} years the arrear is Rs ${fmt(PC.arrear)}, payable before equity holders receive a dividend.`,
  sol: `Annual dividend, then the arrear.`,
  scheme: [[`Annual dividend Rs ${fmt(PC.annual)}`, 1], [`Arrear Rs ${fmt(PC.arrear)}`, 1]],
}));
Q('s2_deb_def', short({
  t: 2, d: 2, c: 'recall', marks: 2, wl: S2,
  stem: `What is a debenture? Why is its holder not an owner of the company?`,
  model: `A debenture is an acknowledgement of debt by a company, on which it pays a fixed rate of interest. Its holder is a lender and a creditor, not a member, so the holder has no ownership share and no vote.`,
  sol: `Meaning and the reason.`,
  scheme: [[`Debenture as an acknowledgement of debt with fixed interest`, 1], [`Holder is a creditor with no vote`, 1]],
}));
Q('s2_trade', short({
  t: 2, d: 3, c: 'application', marks: 2, wl: S2,
  stem: `Chitra Tiles buys clay worth Rs ${fmt(TC.perDay)} a day on ${TC.days} days of credit. Name this source and say how much finance the suppliers provide at any time.`,
  model: `This is trade credit, a short-term source given by suppliers. The suppliers finance ${TC.days} days of purchases at Rs ${fmt(TC.perDay)} a day, which is Rs ${fmt(TC.fund)}.`,
  sol: `Source named and amount computed.`,
  scheme: [[`Trade credit named`, 1], [`Amount Rs ${fmt(TC.fund)}`, 1]],
}));
Q('s2_lease', short({
  t: 2, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: `Explain lease financing. Name the two parties and the payment made.`,
  model: `In lease financing the owner of an asset, the lessor, lets another party, the lessee, use it for a period. The lessee pays regular payments called lease rentals, and does not need to find the whole price of the asset.`,
  sol: `Meaning, parties and payment.`,
  scheme: [[`Meaning of lease financing`, 1], [`Lessor, lessee and lease rental`, 1]],
}));
Q('s2_gdr', short({
  t: 3, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: `What is a Global Depository Receipt? State one feature.`,
  model: `A Global Depository Receipt is a receipt issued by a depository bank against shares of a company, and it is traded in markets outside the United States. Its holders do not have voting rights in the company.`,
  sol: `Meaning and a feature.`,
  scheme: [[`Meaning`, 1], [`One feature`, 1]],
}));
Q('s2_adr_idr', short({
  t: 3, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: `Distinguish an American Depository Receipt from an Indian Depository Receipt.`,
  model: `An American Depository Receipt is traded in the United States against the shares of a foreign company. An Indian Depository Receipt is issued in India by a foreign company so that Indian investors can hold its shares.`,
  sol: `Each described.`,
  scheme: [[`American Depository Receipt described`, 1], [`Indian Depository Receipt described`, 1]],
}));
Q('s2_fccb', short({
  t: 3, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: `What are Foreign Currency Convertible Bonds? Name one reason why a firm may issue them.`,
  model: `These are bonds issued in a foreign currency which the holders can convert into shares of the company on stated terms. A firm may issue them to raise funds abroad at a lower rate of interest, because the holders can gain from the conversion.`,
  sol: `Meaning and a reason.`,
  scheme: [[`Meaning`, 1], [`One reason for issue`, 1]],
}));

Q('s3_need', short({
  t: 1, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: `Explain three needs for which a business requires finance.`,
  model: `1. Fixed capital: for long-term assets such as land, machinery and buildings.\n2. Working capital: for daily costs such as raw material, wages and rent.\n3. Growth and expansion: for a new branch, new products or a bigger plant as the firm develops.`,
  sol: `Three needs explained.`,
  scheme: [[`Fixed capital`, 1], [`Working capital`, 1], [`Growth and expansion`, 1]],
}));
Q('s3_eq_merits', short({
  t: 2, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: `Explain any three merits of raising funds by issuing equity shares.`,
  model: `1. Permanent capital: it need not be repaid during the life of the company.\n2. No fixed burden: dividend is paid only when there is profit and the board decides.\n3. Voting rights give owners control, and a large equity base is a credit base for raising loans.`,
  sol: `Any three merits.`,
  scheme: [[`First merit`, 1], [`Second merit`, 1], [`Third merit`, 1]],
}));
Q('s3_deb_merit', short({
  t: 2, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: `Explain any three merits of raising funds through debentures.`,
  model: `1. Fixed income for investors who prefer a safe return.\n2. No dilution of control, because debenture holders have no voting rights.\n3. Interest is tax-deductible, so the real cost is lower, and the firm can gain from trading on equity.`,
  sol: `Any three merits.`,
  scheme: [[`First merit`, 1], [`Second merit`, 1], [`Third merit`, 1]],
}));
Q('s3_ret', short({
  t: 2, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: `Bhumi Seeds keeps ${100 - RET.payPct} per cent of its profit each year. Explain two merits and one limitation of retained earnings.`,
  model: `Merits: 1. No issue cost and no repayment date, so the source is cheap and safe. 2. No dilution of control, since no outsider is brought in.\nLimitation: shareholders may be unhappy with small dividends, and the funds may be kept in the firm without a good use.`,
  sol: `Two merits and one limitation.`,
  scheme: [[`First merit`, 1], [`Second merit`, 1], [`One limitation`, 1]],
}));
Q('s3_cmp', short({
  t: 2, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: `Give three points of difference between owners' funds and borrowed funds.`,
  model: `1. Status: providers of owners' funds are owners, while providers of borrowed funds are creditors.\n2. Return: owners get a dividend that varies with profit, while lenders get fixed interest.\n3. Control: owners have voting rights, while lenders have none; interest is also tax-deductible.`,
  sol: `Any three points.`,
  scheme: [[`First difference`, 1], [`Second difference`, 1], [`Third difference`, 1]],
}));
Q('s3_intl', short({
  t: 3, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: `Explain three sources from which a firm may raise finance abroad.`,
  model: `1. Commercial banks abroad give loans in foreign currency for various periods.\n2. International agencies and development banks give loans and help for projects.\n3. International capital markets let firms issue instruments such as depository receipts and foreign currency convertible bonds.`,
  sol: `Three international sources.`,
  scheme: [[`Commercial banks abroad`, 1], [`International agencies and development banks`, 1], [`International capital markets`, 1]],
}));
Q('s3_factors', short({
  t: 3, d: 3, c: 'application', marks: 3, wl: S3,
  stem: `Nirmaan Labs, an imagined start-up, must choose between a bank loan and new equity shares. Explain any three factors it should weigh.`,
  model: `1. Cost: compare the interest, the issue expenses and the dividend expected.\n2. Risk profile: a start-up with uncertain profits may find fixed interest heavy.\n3. Control: new equity shares dilute the promoters' voting power, while a loan does not.`,
  sol: `Any three factors applied to the start-up.`,
  scheme: [[`First factor applied`, 1], [`Second factor applied`, 1], [`Third factor applied`, 1]],
}));

// ================================================================ long answers
Q('l_classify', long({
  t: 1, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: `Explain how sources of business finance are classified, giving one imagined example for each base.`,
  model: `1. By period: long-term, medium-term and short-term sources, such as debentures, a bank loan for three years and trade credit.\n2. By ownership: owners' funds, such as equity shares, and borrowed funds, such as a bank loan.\n3. By source of generation: internal sources, such as profit that Bhumi Seeds retains, and external sources, such as debentures sold to investors.\n4. A single source fits all three bases at once.\n5. Retained earnings are long-term, owners' and internal.`,
  sol: `Three bases with examples and a closing point.`,
  scheme: [[`Classification by period with example`, 1], [`Classification by ownership with example`, 1], [`Classification by source of generation with example`, 1], [`One source fits all bases`, 1], [`Retained earnings classified`, 1]],
}));
Q('l_pref_types', long({
  t: 2, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: `Explain the types of preference shares, with a line on the claim of preference holders over equity holders.`,
  model: `1. Cumulative: unpaid dividend of a year is carried forward and paid before equity holders get anything; non-cumulative shares lose it.\n2. Participating: holders share in the surplus profit after the equity dividend; non-participating holders do not.\n3. Convertible: holders may change the shares into equity shares; non-convertible shares cannot be changed.\n4. Redeemable: repaid after a stated period; irredeemable shares are repaid only at winding up.\n5. All have priority over equity holders in dividend and in return of capital.`,
  sol: `Four pairs of types and the priority.`,
  scheme: [[`Cumulative and non-cumulative`, 1], [`Participating and non-participating`, 1], [`Convertible and non-convertible`, 1], [`Redeemable and irredeemable`, 1], [`Priority over equity holders`, 1]],
}));
Q('l_deb', long({
  t: 2, d: 4, c: 'analysis', marks: 5, wl: L5,
  stem: `Explain any three merits and two limitations of raising funds through debentures.`,
  model: `Merits: 1. Investors who like a fixed income find them attractive. 2. Control is not diluted, as holders have no vote. 3. Interest is tax-deductible, which lowers the cost.\nLimitations: 1. Interest is a fixed burden that must be paid even in a loss. 2. Each issue lowers the borrowing capacity of the firm, and the principal must be repaid, so too many debentures raise the financial risk.`,
  sol: `Three merits and two limitations.`,
  scheme: [[`Two merits`, 1], [`Third merit`, 1], [`First limitation`, 1], [`Second limitation`, 1], [`A link to risk or cost`, 1]],
}));
Q('l_cmp', long({
  t: 2, d: 4, c: 'analysis', marks: 5, wl: L5,
  stem: `Compare owners' funds and borrowed funds on the bases of status, risk, return, control and tax treatment.`,
  model: `1. Status: providers of owners' funds are owners; providers of borrowed funds are creditors.\n2. Risk: owners' funds carry no repayment duty, so the firm's risk is lower; borrowed funds must be repaid.\n3. Return: owners get a dividend that varies; lenders get fixed interest.\n4. Control: owners have voting rights; lenders generally have none.\n5. Tax: interest is deducted before tax, but dividend is paid from profit after tax.`,
  sol: `Five bases of comparison.`,
  scheme: [[`Status`, 1], [`Risk`, 1], [`Return`, 1], [`Control`, 1], [`Tax treatment`, 1]],
}));
Q('l_instr', long({
  t: 3, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: `Explain the main features of Global Depository Receipts, American Depository Receipts, Indian Depository Receipts and Foreign Currency Convertible Bonds.`,
  model: `1. Global Depository Receipts: issued by a depository bank against shares and traded in markets outside the United States; holders have no voting rights.\n2. American Depository Receipts: traded in the United States against the shares of a foreign company.\n3. Indian Depository Receipts: issued in India by a foreign company.\n4. Foreign Currency Convertible Bonds: issued in a foreign currency and convertible into shares on stated terms.\n5. All of them let firms and investors reach beyond one country.`,
  sol: `Four instruments and a closing point.`,
  scheme: [[`Global Depository Receipts`, 1], [`American Depository Receipts`, 1], [`Indian Depository Receipts`, 1], [`Foreign Currency Convertible Bonds`, 1], [`Common purpose`, 1]],
}));
Q('l_factors', long({
  t: 3, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: `Explain any five factors that a firm should consider in choosing a source of finance, and say which one matters most for a young firm with uncertain profits.`,
  model: `1. Cost of raising and of servicing the source.\n2. Financial strength and stability of operations: firms with steady income can bear fixed charges.\n3. Form of organisation and legal status: a sole proprietor cannot issue shares.\n4. Purpose and time period: fixed assets need long-term funds.\n5. Control, tax benefit and flexibility are other factors.\nFor a young firm with uncertain profits, risk profile matters most, since fixed interest is hard to bear.`,
  sol: `Five factors and a reasoned opinion.`,
  scheme: [[`First factor`, 1], [`Second factor`, 1], [`Third factor`, 1], [`Fourth and fifth factors`, 1], [`A reasoned opinion`, 1]],
}));

// ================================================================ case-based
Q('cb_sutra', caseQ({
  t: [1, 2], d: 3, c: 'application', origin: 'soyl-original',
  stem: `Read the passage and answer the questions that follow. *(Imagined start-up.)*`,
  passage: `**Sutra Looms (imagined), a hand-loom start-up in the imagined town of Tantupur**\n\nSutra Looms is an imagined start-up that wishes to weave and sell cotton fabric. It must spend Rs ${fmt(NEED.machine)} on looms and Rs ${fmt(NEED.fit)} on fitting out a shed. For the first month it needs Rs ${fmt(NEED.stock)} for yarn, Rs ${fmt(NEED.wages)} for wages and Rs ${fmt(NEED.power)} for power and rent. The two founders can put in only part of the amount from their own savings, and a local bank has offered a loan for the rest.`,
  parts: [
    child('a', mcq({ t: 1, d: 2, c: 'application', stem: `The money that Sutra Looms needs for the looms and the shed is`, opts: [`fixed capital`, `working capital`, `a lease rental`, `trade credit`], sol: `Money for long-lived assets such as looms and a shed is fixed capital. The yarn, wages and power are working capital, and the last two options are not needs of funds.` })),
    child('b', short({ t: 1, d: 3, c: 'application', marks: 1, stem: `Quote the line that shows the source of the founders' own contribution.`, model: `"**The two founders can put in only part of the amount from their own savings**": their savings are owners' funds.`, sol: `The line on the founders' savings.`, scheme: [[`Correct line quoted`, 1]] })),
    child('c', short({ t: 1, d: 4, c: 'application', marks: 2, stem: `**Either** (i): Find the fixed capital, the working capital for the first month and the total amount needed.`, model: `Fixed capital is Rs ${fmt(NEED.machine)} plus Rs ${fmt(NEED.fit)}, which is Rs ${fmt(NEED.fixed)}. Working capital is Rs ${fmt(NEED.stock)} plus Rs ${fmt(NEED.wages)} plus Rs ${fmt(NEED.power)}, which is Rs ${fmt(NEED.work)}. The total need is Rs ${fmt(NEED.total)}.`, sol: `Fixed capital, working capital and the total.`, scheme: [[`Fixed capital Rs ${fmt(NEED.fixed)} and working capital Rs ${fmt(NEED.work)}`, 1], [`Total Rs ${fmt(NEED.total)}`, 1]] }), [
      short({ t: 2, d: 4, c: 'analysis', marks: 2, stem: `**Or** (ii): Classify the founders' savings and the bank loan by ownership.`, model: `The founders' savings are owners' funds, since the founders own the firm. The bank loan is a borrowed fund, because the bank is a lender who must be repaid with interest.`, sol: `Each source classified.`, scheme: [[`Savings as owners' funds`, 1], [`Bank loan as borrowed funds`, 1]] }),
    ]),
  ],
}));
Q('cb_nirmaan', caseQ({
  t: 2, d: 4, c: 'analysis', origin: 'soyl-original',
  stem: `Read the passage and answer the questions that follow. *(Imagined company.)*`,
  passage: `**Nirmaan Labs (imagined), a building-materials start-up in the imagined city of Kavyapur**\n\nNirmaan Labs has ${fmt(EQ.old)} equity shares, of which the promoters hold ${fmt(EQ.prom)}. To fund a new plant it issues ${fmt(EQ.add)} more equity shares at Rs ${EQ.price} each to the public, and spends ${EQ.costPct} per cent of the amount raised on issue expenses. The promoters are happy that no loan is needed, but some of them fear that outsiders will have a larger say in the firm.`,
  parts: [
    child('a', mcq({ t: 2, d: 2, c: 'application', stem: `The new issue of ${fmt(EQ.add)} shares is a source that is`, opts: [`an owners' fund and an external source`, `a borrowed fund and an external source`, `an owners' fund and an internal source`, `a borrowed fund and an internal source`], sol: `Equity shares bring owners' funds, and the money comes from outsiders, so it is external. It is not borrowed, and it is not generated inside the firm.` })),
    child('b', short({ t: 2, d: 3, c: 'application', marks: 1, stem: `Quote the line that shows a limitation of equity shares.`, model: `"**some of them fear that outsiders will have a larger say in the firm**": new shareholders dilute the control of the promoters.`, sol: `The line on the fear of outsiders.`, scheme: [[`Correct line quoted`, 1]] })),
    child('c', short({ t: 2, d: 4, c: 'application', marks: 2, stem: `**Either** (i): Find the amount raised, the issue expenses and the net amount the firm receives.`, model: `The amount raised is ${fmt(EQ.add)} times Rs ${EQ.price}, which is Rs ${fmt(EQ.raise)}. Issue expenses at ${EQ.costPct} per cent are Rs ${fmt(EQ.cost)}. The firm receives Rs ${fmt(EQ.net)}.`, sol: `Amount, expenses and net amount.`, scheme: [[`Amount raised Rs ${fmt(EQ.raise)} and expenses Rs ${fmt(EQ.cost)}`, 1], [`Net amount Rs ${fmt(EQ.net)}`, 1]] }), [
      short({ t: 2, d: 4, c: 'analysis', marks: 2, stem: `**Or** (ii): Find the percentage of shares that the promoters hold before and after the issue, and say what it shows.`, model: `Before the issue they hold ${fmt(EQ.prom)} of ${fmt(EQ.old)} shares, which is ${EQ.before} per cent. After the issue they hold ${fmt(EQ.prom)} of ${fmt(EQ.old + EQ.add)} shares, which is ${EQ.after} per cent. This shows the dilution of control.`, sol: `Two percentages and the point.`, scheme: [[`${EQ.before} per cent before and ${EQ.after} per cent after`, 1], [`Dilution of control named`, 1]] }),
    ]),
  ],
}));
Q('cb_chitra', caseQ({
  t: 2, d: 4, c: 'analysis', origin: 'soyl-original',
  stem: `Read the passage and answer the questions that follow. *(Imagined tile maker.)*`,
  passage: `**Chitra Tiles (imagined), a tile maker in the imagined town of Kilnpur**\n\nChitra Tiles issued ${fmt(DEB.n)} debentures of Rs ${fmt(DEB.face)} each at ${DEB.rate} per cent a year, and a charge was created on its factory. For this example, an imagined tax rate of ${DEB.taxPct} per cent is used. The firm also buys clay worth Rs ${fmt(TC.perDay)} a day from a supplier, who allows ${TC.days} days to pay. The owner says that borrowing is easier on the firm's control than a new share issue, but worries about the burden of interest in a bad year.`,
  parts: [
    child('a', mcq({ t: 2, d: 2, c: 'application', stem: `Because a charge was created on the factory, the debentures of Chitra Tiles are`, opts: [`secured debentures`, `unsecured debentures`, `bearer shares`, `participating preference shares`], sol: `Debentures backed by a charge on assets are secured. Unsecured debentures have no charge, and the last two options are shares, not debentures.` })),
    child('b', short({ t: 2, d: 3, c: 'application', marks: 1, stem: `Quote the line that shows a limitation of debentures.`, model: `"**worries about the burden of interest in a bad year**": interest is a fixed burden that must be paid even in a loss.`, sol: `The line on the burden of interest.`, scheme: [[`Correct line quoted`, 1]] })),
    child('c', short({ t: 2, d: 4, c: 'application', marks: 2, stem: `**Either** (i): Find the amount raised, the yearly interest and the interest after the imagined tax saving.`, model: `The amount raised is ${fmt(DEB.n)} times Rs ${fmt(DEB.face)}, which is Rs ${fmt(DEB.total)}. Yearly interest at ${DEB.rate} per cent is Rs ${fmt(DEB.int)}. The tax saving at ${DEB.taxPct} per cent is Rs ${fmt(DEB.shield)}, so the net cost is Rs ${fmt(DEB.net)}.`, sol: `Amount, interest and net cost.`, scheme: [[`Amount Rs ${fmt(DEB.total)} and interest Rs ${fmt(DEB.int)}`, 1], [`Tax saving Rs ${fmt(DEB.shield)} and net cost Rs ${fmt(DEB.net)}`, 1]] }), [
      short({ t: 2, d: 4, c: 'analysis', marks: 2, stem: `**Or** (ii): Name the other source in the passage and find the finance that the supplier provides at any time.`, model: `The other source is trade credit. The supplier finances ${TC.days} days of purchases at Rs ${fmt(TC.perDay)} a day, which is Rs ${fmt(TC.fund)}.`, sol: `Source and amount.`, scheme: [[`Trade credit named`, 1], [`Amount Rs ${fmt(TC.fund)}`, 1]] }),
    ]),
  ],
}));
Q('cb_vihaan', caseQ({
  t: [2, 3], d: 4, c: 'evaluation', origin: 'soyl-original',
  stem: `Read the passage and answer the questions that follow. *(Imagined firm.)*`,
  passage: `**Vihaan Pumps (imagined), a pump maker of the imagined town of Jalpur**\n\nVihaan Pumps needs Rs ${fmt(LOAN.need)} for a new line. The finance manager can take a bank loan at ${LOAN.rate} per cent a year or issue equity shares. The firm expects a profit before interest of Rs ${fmt(LOAN.good)} in a good year and Rs ${fmt(LOAN.poor)} in a poor year. The owners wish to keep their control, but the sales of the firm are uncertain and the bank will want its interest in every year.`,
  parts: [
    child('a', mcq({ t: 2, d: 2, c: 'application', stem: `The bank loan is a source that is`, opts: [`borrowed and external`, `owned and external`, `borrowed and internal`, `owned and internal`], sol: `A bank loan is borrowed money from outside the firm. It is not owned capital, and it is not generated inside the firm.` })),
    child('b', short({ t: 3, d: 3, c: 'application', marks: 1, stem: `Quote the line that shows the risk profile that matters in the choice.`, model: `"**the sales of the firm are uncertain and the bank will want its interest in every year**": uncertain income makes fixed interest risky.`, sol: `The line on uncertain sales and yearly interest.`, scheme: [[`Correct line quoted`, 1]] })),
    child('c', short({ t: 3, d: 4, c: 'evaluation', marks: 2, stem: `**Either** (i): Find the yearly interest, and the amount left in a good year and in a poor year after interest.`, model: `Interest is ${LOAN.rate} per cent of Rs ${fmt(LOAN.need)}, which is Rs ${fmt(LOAN.int)}. In a good year Rs ${fmt(LOAN.left)} is left. In a poor year the firm falls short by Rs ${fmt(-LOAN.gap)}.`, sol: `Interest and the two results.`, scheme: [[`Interest Rs ${fmt(LOAN.int)}`, 1], [`Rs ${fmt(LOAN.left)} left and Rs ${fmt(-LOAN.gap)} short`, 1]] }), [
      short({ t: 3, d: 4, c: 'evaluation', marks: 2, stem: `**Or** (ii): Name the factors of choice that point to the loan and to equity shares, with one line each.`, model: `Control points to the loan, since equity shares would dilute the owners' hold. Risk profile points to equity shares, since dividends need not be paid in a poor year, while interest on the loan must be paid.`, sol: `Two factors and the way each points.`, scheme: [[`Control points to the loan`, 1], [`Risk profile points to equity shares`, 1]] }),
    ]),
  ],
}));
Q('cb_tarang', caseQ({
  t: 3, d: 4, c: 'analysis', origin: 'soyl-original',
  stem: `Read the passage and answer the questions that follow. *(Imagined exporter.)*`,
  passage: `**Tarang Garments (imagined), an exporter of the imagined town of Suvastra**\n\nTarang Garments earns much of its income in foreign currency. To build a new plant it considers issuing ${fmt(GDR.shares)} of its shares to a depository bank abroad, which would issue receipts at ${GDR.ratio} shares per receipt, to be traded in markets outside the United States. Each receipt is priced at ${GDR.price} US dollars. For this example the rate is imagined at Rs ${GDR.rate} per US dollar. The directors like the wide pool of investors, but are told that the receipt holders will not vote at the firm's meetings.`,
  parts: [
    child('a', mcq({ t: 3, d: 2, c: 'application', stem: `The instrument that Tarang Garments considers is`, opts: [`a Global Depository Receipt`, `an American Depository Receipt`, `an Indian Depository Receipt`, `a debenture`], sol: `Receipts traded in markets outside the United States are Global Depository Receipts. American receipts are traded in the United States, Indian receipts are issued in India by foreign firms, and a debenture is a debt instrument.` })),
    child('b', short({ t: 3, d: 3, c: 'application', marks: 1, stem: `Quote the line that shows a feature of the instrument that concerns control.`, model: `"**the receipt holders will not vote at the firm's meetings**": holders of such receipts have no voting rights.`, sol: `The line on voting.`, scheme: [[`Correct line quoted`, 1]] })),
    child('c', short({ t: 3, d: 4, c: 'application', marks: 2, stem: `**Either** (i): Find the number of receipts, the amount in US dollars and the amount in rupees at the imagined rate.`, model: `The number of receipts is ${fmt(GDR.shares)} divided by ${GDR.ratio}, which is ${fmt(GDR.count)}. At ${GDR.price} US dollars each, the amount is ${fmt(GDR.usd)} US dollars. At Rs ${GDR.rate} per US dollar, it is Rs ${fmt(GDR.inr)}.`, sol: `Receipts, dollars and rupees.`, scheme: [[`${fmt(GDR.count)} receipts and ${fmt(GDR.usd)} US dollars`, 1], [`Rs ${fmt(GDR.inr)}`, 1]] }), [
      short({ t: 3, d: 4, c: 'analysis', marks: 2, stem: `**Or** (ii): Name two factors of choice that favour this source for Tarang Garments and one that counts against it.`, model: `Its income in foreign currency suits the instrument, and it gives a purpose and time period that fit a long-term plant. Against it, control is a concern because the receipts add outside holders.`, sol: `Two factors for and one against.`, scheme: [[`Two factors that favour`, 1], [`One factor against`, 1]] }),
    ]),
  ],
}));
