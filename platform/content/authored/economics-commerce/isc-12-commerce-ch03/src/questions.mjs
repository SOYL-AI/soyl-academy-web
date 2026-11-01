// ISC 12 Commerce, ch03 Long-term Sources of Funds for a Joint Stock Company — question bank. Every firm, person,
// figure and situation is imagined and written by SOYL and labelled as such; no ISC or CBSE textbook illustration
// or exercise and no CISCE specimen or board item is reused (D-036). Legal points are stated as stable rules of
// the Companies Act, 2013 without section-by-section detail; the README lists them for review.
import { Q, mcq, ar, tf, fb, match, short, long, caseQ, child, num } from './lib.mjs';

const S2 = [30, 50];
const S3 = [50, 75];
const L5 = [100, 150];
export const inr = (n) => Number(n).toLocaleString('en-IN');

// Imagined figures, computed and asserted.
export const BON = { held: 500, ratio: [2, 5] };
BON.bonus = (BON.held * BON.ratio[0]) / BON.ratio[1];
export const RIG = { held: 400, ratio: [1, 4], price: 60, market: 90 };
RIG.shares = (RIG.held * RIG.ratio[0]) / RIG.ratio[1];
RIG.pay = RIG.shares * RIG.price;
export const PREF = { n: 10000, face: 100, rate: 0.08 };
PREF.annual = PREF.n * PREF.face * PREF.rate;
PREF.arrears3 = PREF.annual * 3;
export const DEB = { amt: 2000000, rate: 0.09, tax: 0.25 };
DEB.interest = DEB.amt * DEB.rate;
DEB.after = DEB.interest * (1 - DEB.tax);
DEB.cost = Math.round((DEB.after / DEB.amt) * 10000) / 100;
export const RET = { eat: 5000000, payout: 0.4 };
RET.div = RET.eat * RET.payout;
RET.kept = RET.eat - RET.div;
if (BON.bonus !== 200 || RIG.shares !== 100 || RIG.pay !== 6000 || PREF.annual !== 80000 || PREF.arrears3 !== 240000 || DEB.interest !== 180000 || DEB.after !== 135000 || DEB.cost !== 6.75 || RET.kept !== 3000000) throw new Error('figures');

// ================================================================ t01 Equity shares
Q('m_eq_owner', mcq({
  t: 1, d: 1, c: 'understanding',
  stem: 'Equity shareholders of a company are best described as its',
  opts: ['owners, who bear the greatest risk and enjoy voting rights', 'creditors, who receive fixed interest', 'customers, who buy its products on credit', 'employees, who receive a fixed salary'],
  sol: 'Equity shareholders own the company, vote on its affairs and take whatever is left after all others are paid.',
}));
Q('m_eq_residual', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Periyar Polymers Ltd, an imagined company in Kochi, is wound up. After paying its lenders, creditors and preference shareholders, ₹40 lakh remains. This ₹40 lakh goes to the',
  opts: ['equity shareholders, who have a residual claim', 'debenture holders, as extra interest', 'preference shareholders, as a bonus', 'government, as tax'],
  sol: 'Equity shareholders are paid last, from whatever is left: their claim on income and assets is residual.',
}));
Q('m_eq_nofixed', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'In a drought year, Sutlej Seeds Ltd (imagined) earns very little profit and pays no dividend to its equity shareholders. Which feature of equity shares allows this?',
  opts: ['There is no fixed obligation to pay a dividend', 'Equity capital is refunded every year', 'Equity shareholders have no voting rights', 'Dividend on equity is tax-deductible'],
  sol: 'Equity dividend depends on profit and the board\'s decision; there is no fixed charge, which is an advantage to the company in bad years.',
}));
Q('m_eq_disadv', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: 'Which of these is a **disadvantage** of raising funds through a fresh issue of equity shares?\nP. It dilutes the control of existing shareholders.\nQ. It creates a charge on the company\'s assets.\nR. Equity dividend is not a tax-deductible expense.\nS. It must be repaid on a fixed date.',
  opts: ['P and R', 'Q and S', 'P, Q and R', 'R and S'],
  sol: 'New equity spreads votes over more owners, and dividend gives no tax saving. Equity creates no charge on assets and is never repaid on a fixed date.',
}));
Q('ar_eq_permanent', ar({
  t: 1, d: 2, c: 'understanding',
  a: 'Equity share capital is a source of permanent capital.',
  r: 'Equity capital is returned to shareholders only when the company is wound up.',
  key: 'a',
  sol: 'Both are true, and because equity is repaid only on winding up (apart from a buy-back), it stays with the company permanently.',
}));
Q('tf_eq_base', tf({
  t: 1, d: 2, c: 'understanding',
  stem: 'A large equity base makes it easier for a company to borrow, because lenders feel safer when owners have put in substantial funds.',
  ans: true,
  sol: 'True. Equity acts as a cushion for lenders, improving the company\'s creditworthiness.',
}));
Q('fb_eq', fb({
  t: 1, d: 2, c: 'understanding',
  stem: 'Because they are paid only after all other claims are met, equity shareholders are said to have a ___ claim on the income and assets of the company.',
  acc: [['residual', 'residuary', 'last']],
  sol: 'Their claim is residual: it comes last, after lenders and preference shareholders.',
}));
Q('s_eq_features', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Mahi Motorcycles Ltd (imagined) has 3 lakh equity shareholders. Explain two features of the shares they hold that set them apart from lenders.',
  model: '1. **Voting rights:** equity shareholders **elect directors** and vote on major decisions, which lenders cannot do.\n2. **Variable return:** their dividend **depends on profit**; lenders receive a **fixed interest** whatever the profit.',
  sol: 'Two features (ownership and voting, residual claim, variable dividend, permanent capital, high risk), each contrasted with lenders.',
  scheme: [['First feature', 1], ['Second feature', 1]],
}));
Q('s3_eq_merits', short({
  t: 1, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'Netravati Networks Ltd, an imagined Mangaluru software company with uncertain early profits, plans to raise ₹50 crore by issuing equity shares. Explain three advantages of this choice for the company.',
  model: '1. **No fixed burden:** with **uncertain profits**, it need not pay dividends in lean years, unlike interest.\n2. **Permanent capital:** the ₹50 crore need **not be repaid**, so long projects can be funded safely.\n3. **No charge on assets:** its assets stay **free**, so it can later pledge them to raise loans.',
  sol: 'Three advantages (no fixed burden, permanent, no charge, creditworthiness, appeal to risk-takers) applied to the software firm.',
  scheme: [['First advantage applied', 1], ['Second advantage applied', 1], ['Third advantage applied', 1]],
}));
Q('s3_eq_limits', short({
  t: 1, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'The promoters of Krishna Kitchenware Ltd (imagined) hold 55 per cent of its shares. They are told that a new equity issue of ₹30 crore will cost about 6 per cent in fees and advertising. Explain three drawbacks of equity they should weigh.',
  model: '1. **Dilution of control:** new shares may push the promoters\' **55 per cent stake** below majority.\n2. **High floatation cost:** about **6 per cent** of the issue goes in fees and advertising.\n3. **Costlier than debt:** equity holders expect a **higher return**, and dividend gives **no tax saving**.',
  sol: 'Three drawbacks (dilution, floatation cost, high cost and no tax shield, delay and formalities) linked to the case.',
  scheme: [['Dilution', 1], ['Floatation cost', 1], ['Cost and tax', 1]],
}));

// ================================================================ t02 Preference shares
Q('m_pref_meaning', mcq({
  t: 2, d: 1, c: 'understanding',
  stem: 'Preference shares get "preference" over equity shares in respect of',
  opts: ['payment of a fixed dividend and return of capital on winding up', 'voting on every resolution', 'appointment of the managing director', 'bonus shares issued by the company'],
  sol: 'The two preferences are a fixed-rate dividend before any equity dividend, and repayment of capital before equity on winding up.',
}));
Q('m_pref_cum', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'Bhadra Batteries Ltd (imagined) could not pay the dividend on its preference shares for two years. In the third year the unpaid dividends must be paid in full before any equity dividend. Its preference shares are',
  opts: ['cumulative', 'non-cumulative', 'participating', 'convertible'],
  sol: 'On cumulative preference shares, unpaid dividends accumulate as arrears and must be cleared before equity gets anything.',
}));
Q('m_pref_part', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'In a very good year, Hooghly Hosiery Ltd (imagined) pays its preference holders their fixed 9 per cent and then an extra share of the surplus profit along with equity holders. These preference shares are',
  opts: ['participating', 'cumulative', 'redeemable', 'non-convertible'],
  sol: 'Participating preference shares share in surplus profit (and sometimes surplus assets) beyond their fixed dividend.',
}));
Q('m_pref_conv', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'Investors in Rann Renewables Ltd (imagined) hold preference shares that will turn into equity shares after five years. These are',
  opts: ['convertible preference shares', 'redeemable preference shares', 'participating preference shares', 'cumulative preference shares'],
  sol: 'Shares that can be changed into equity shares after a stated period are convertible.',
}));
Q('m_pref_vote', mcq({
  t: 2, d: 3, c: 'understanding',
  stem: 'Under the Companies Act, 2013, preference shareholders normally vote',
  opts: [
    'only on matters directly affecting their rights, and on all matters if their dividend is unpaid for two years or more',
    'on every resolution, exactly like equity shareholders',
    'never, under any circumstances',
    'only on the appointment of auditors',
  ],
  sol: 'Their voting right is restricted to matters affecting them, but widens to all resolutions when their dividend remains unpaid for two years or more.',
}));
Q('ar_pref_redeem', ar({
  t: 2, d: 3, c: 'analysis',
  a: 'An Indian company today cannot issue irredeemable preference shares.',
  r: 'Preference shareholders always have full voting rights on every resolution.',
  key: 'c',
  sol: 'The assertion is true: the Companies Act, 2013 requires preference shares to be redeemable (normally within twenty years). The reason is false: their voting rights are restricted.',
}));
Q('ar_pref_cost', ar({
  t: 2, d: 3, c: 'analysis',
  a: 'Preference shares are usually a costlier source of funds than debentures for a company.',
  r: 'Preference dividend is paid out of profit after tax, while debenture interest is deducted before tax.',
  key: 'a',
  sol: 'Both are true. Because preference dividend gets no tax saving while interest does, preference capital ends up costlier.',
}));
Q('tf_pref_control', tf({
  t: 2, d: 2, c: 'understanding',
  stem: 'The founders of Pushkar Prints Ltd (imagined) want funds without giving outsiders a normal vote. Issuing preference shares can help them do this.',
  ans: true,
  sol: 'True. Preference shareholders have only restricted voting rights, so control stays with the equity holders.',
}));
Q('n_pref_arrears', num({
  t: 2, d: 3, c: 'application', marks: 1, value: PREF.arrears3, unit: '₹',
  stem: `Bhadra Batteries Ltd (imagined) has ${inr(PREF.n)} cumulative preference shares of ₹${PREF.face} each carrying an ${PREF.rate * 100} per cent dividend. No preference dividend was paid for two years. How much preference dividend must it pay in the third year before any equity dividend (in ₹)?`,
  sol: `Step 1: Annual preference dividend = ${inr(PREF.n)} × ₹${PREF.face} × ${PREF.rate} = ₹${inr(PREF.annual)}.\nStep 2: Two years of arrears plus the current year = 3 × ${inr(PREF.annual)} = ₹${inr(PREF.arrears3)}.`,
}));
Q('mt_pref', match({
  t: 2, d: 2, c: 'understanding', marks: 2,
  stem: 'Match each feature with the type of preference share it describes.',
  pairs: [
    ['Unpaid dividends carry forward as arrears', 'Cumulative'],
    ['Shares in surplus profit beyond the fixed rate', 'Participating'],
    ['Can be changed into equity shares later', 'Convertible'],
    ['Capital is paid back after a fixed period', 'Redeemable'],
  ],
  sol: 'Arrears go with cumulative shares, extra profit with participating shares, a change to equity with convertible shares, and repayment after a period with redeemable shares.',
}));
Q('s_eq_vs_pref', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Sutlej Seeds Ltd (imagined) has issued both equity and 8 per cent preference shares. Distinguish between the two on the basis of dividend and voting rights.',
  model: '1. **Dividend:** preference holders get a **fixed 8 per cent** before equity; equity dividend **varies** with profit.\n2. **Voting:** equity holders have **full voting rights**; preference holders vote only on matters **affecting their rights**.',
  sol: 'Dividend and voting rights distinguished.',
  scheme: [['Dividend', 1], ['Voting', 1]],
}));
Q('s3_pref_types', short({
  t: 2, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Rann Renewables Ltd (imagined) issues preference shares that are cumulative, redeemable after eight years and convertible into equity. Explain what each of these three terms means for an investor.',
  model: '1. **Cumulative:** if a year\'s dividend is missed, it **accumulates** and must be paid before equity gets anything.\n2. **Redeemable:** the company will **pay back the capital** after eight years.\n3. **Convertible:** the investor may **change the shares into equity**, sharing in growth.',
  sol: 'Each term explained from the investor\'s point of view.',
  scheme: [['Cumulative', 1], ['Redeemable', 1], ['Convertible', 1]],
}));
Q('l_pref', long({
  t: [1, 2], d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: 'Wardha Wires Ltd (imagined) needs ₹40 crore. Its family promoters want to keep control but do not want a fixed charge on the company\'s assets.\n(a) Distinguish between equity and preference shares on three bases. [3]\n(b) Explain why preference shares might suit Wardha Wires. [2]',
  model: '(a) **Rate of dividend:** preference shares carry a **fixed rate**; equity dividend **varies** with profit.\n**Priority:** preference holders are paid dividend and capital **before** equity holders; equity comes **last**.\n**Voting rights:** equity holders have **full** voting rights; preference holders vote only on matters **affecting their rights**.\n\n(b) **Control:** with restricted voting, preference shares let the family **raise ₹40 crore without losing control**. **No charge on assets:** unlike secured debentures, preference shares are **not secured** on the company\'s property, so its assets stay free; and the dividend, though fixed, is paid only when there is profit.',
  sol: 'Three bases of distinction; two reasons linked to control and the absence of a charge.',
  scheme: [['(a) Three bases', 3], ['(b) Two reasons linked to the case', 2]],
}));

// ================================================================ t03 Bonus, rights, ESOP, sweat equity, QIP
Q('m_bonus', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'When a company issues bonus shares,',
  opts: ['existing shareholders receive free shares by capitalising reserves, and no fresh cash comes in', 'new investors buy shares at a discount', 'employees receive shares for their know-how', 'institutional buyers subscribe to shares privately'],
  sol: 'Bonus shares are free shares made out of accumulated reserves; they raise no new funds.',
}));
Q('m_rights', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'Indravati Infra Ltd (imagined) offers its shareholders one new share for every four held, at ₹60 when the market price is ₹90. Shareholders who do not want the shares may sell this right to others. This is a',
  opts: ['rights issue', 'bonus issue', 'sweat equity issue', 'qualified institutional placement'],
  sol: 'An offer of new shares to existing shareholders in proportion to their holdings, which they may renounce, is a rights issue.',
}));
Q('m_esop', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'Netravati Networks Ltd (imagined) tells its engineers that after a year\'s service they may buy its shares at ₹120 each, whatever the market price then. This is an example of',
  opts: ['an employee stock option plan (ESOP)', 'sweat equity shares', 'a bonus issue', 'a rights issue'],
  sol: 'An option given to employees to buy shares at a pre-set price after a waiting (vesting) period is an ESOP.',
}));
Q('m_sweat', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'Satpura Ceramics Ltd (imagined) gives shares, without cash payment, to a director who developed a patented glaze for its tiles. These are best described as',
  opts: ['sweat equity shares', 'bonus shares', 'rights shares', 'preference shares'],
  sol: 'Shares issued to directors or employees at a discount or for non-cash consideration, such as know-how or intellectual property, are sweat equity shares.',
}));
Q('m_qip', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'Mahi Motorcycles Ltd (imagined), a listed company, raises ₹400 crore in a few weeks by selling shares only to mutual funds, insurance companies and banks, without a full public issue. This method is',
  opts: ['qualified institutional placement (QIP)', 'a rights issue', 'an ESOP', 'a bonus issue'],
  sol: 'QIP lets a listed company place shares or convertible securities with qualified institutional buyers quickly, avoiding the long process of a public issue.',
}));
Q('ar_bonus_funds', ar({
  t: 3, d: 3, c: 'analysis',
  a: 'A bonus issue increases the cash available to a company.',
  r: 'Shareholders must pay the full market price in cash for bonus shares.',
  key: 'd',
  sol: 'Both are false. A bonus issue only converts reserves into share capital, so no cash comes in, and bonus shares are given free to existing shareholders.',
}));
Q('tf_rights_renounce', tf({
  t: 3, d: 2, c: 'understanding',
  stem: 'A shareholder who does not wish to subscribe to a rights issue may renounce the offer in favour of another person.',
  ans: true,
  sol: 'True. The right can be renounced (sold) to someone else; bonus shares, being free, involve no such choice.',
}));
Q('fb_bonus', fb({
  t: 3, d: 2, c: 'analysis',
  stem: 'Complete the analogy. Rights shares : Fresh funds raised :: Bonus shares : ___',
  acc: [['No fresh funds', 'no funds', 'capitalisation of reserves', 'reserves capitalised']],
  sol: 'A rights issue brings in fresh money; a bonus issue only capitalises reserves and raises no fresh funds.',
}));
Q('n_bonus', num({
  t: 3, d: 2, c: 'understanding', marks: 1, value: BON.bonus, unit: 'shares',
  stem: `Pushkar Prints Ltd (imagined) declares bonus shares in the ratio ${BON.ratio[0]}:${BON.ratio[1]} (two new shares for every five held). Asha holds ${BON.held} shares. How many bonus shares will she receive?`,
  sol: `Bonus shares = ${BON.held} × ${BON.ratio[0]} ÷ ${BON.ratio[1]} = ${BON.bonus}.`,
}));
Q('n_rights', num({
  t: 3, d: 3, c: 'application', marks: 1, value: RIG.pay, unit: '₹',
  stem: `Indravati Infra Ltd (imagined) makes a rights issue of ${RIG.ratio[0]} share for every ${RIG.ratio[1]} held, at ₹${RIG.price} per share. Farhan holds ${RIG.held} shares. How much must he pay to take up all his rights shares (in ₹)?`,
  sol: `Step 1: Rights shares = ${RIG.held} × ${RIG.ratio[0]} ÷ ${RIG.ratio[1]} = ${RIG.shares}.\nStep 2: Amount = ${RIG.shares} × ₹${RIG.price} = ₹${inr(RIG.pay)}.`,
}));
Q('s_bonus_rights', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Pushkar Prints Ltd (imagined) made a bonus issue last year and Indravati Infra Ltd (imagined) is making a rights issue now. Distinguish the two issues on funds raised and payment by shareholders.',
  model: '1. **Funds raised:** the bonus issue brought **no fresh funds** (reserves were capitalised); the rights issue **raises new cash**.\n2. **Payment:** bonus shares are **free**; rights shares must be **paid for**, usually below market price.',
  sol: 'Funds raised and payment distinguished.',
  scheme: [['Funds raised', 1], ['Payment', 1]],
}));
Q('s3_esop_sweat', short({
  t: 3, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Netravati Networks Ltd (imagined) wants to keep its best engineers and reward a co-founder who wrote its core software code. Explain ESOP and sweat equity, and say which suits each purpose.',
  model: '1. **ESOP:** an **option** for employees to buy shares at a **pre-set price** after a waiting period.\n2. **Sweat equity:** shares given at a discount or **for know-how or intellectual property**, not cash.\n3. **Fit:** ESOP suits **retaining engineers**, who gain if the share price rises; sweat equity suits **rewarding the co-founder\'s code**.',
  sol: 'Both terms explained and each matched to its purpose.',
  scheme: [['ESOP', 1], ['Sweat equity', 1], ['Matching', 1]],
}));
Q('s3_qip_rights', short({
  t: 3, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Mahi Motorcycles Ltd (imagined) needs ₹400 crore within a month for a new electric-bike plant. Compare a QIP with a rights issue for this need on three points.',
  model: '1. **Who subscribes:** a QIP is placed with **institutional buyers**; a rights issue goes to **existing shareholders**.\n2. **Speed:** a QIP can be completed in **weeks**, suiting the one-month deadline; a rights issue takes longer.\n3. **Control:** a rights issue keeps **existing holdings in proportion**; a QIP brings in new institutional owners.',
  sol: 'Three points (subscribers, speed, control, pricing) compared, with a link to the deadline.',
  scheme: [['Subscribers', 1], ['Speed', 1], ['Control', 1]],
}));

// ================================================================ t04 Retained earnings
Q('m_ret_meaning', mcq({
  t: 4, d: 1, c: 'understanding',
  stem: 'Retained earnings as a source of finance means',
  opts: ['ploughing back part of profit into the business instead of paying it all as dividend', 'borrowing from shareholders', 'selling old machinery', 'issuing shares at a premium'],
  sol: 'Retaining profit, called ploughing back, is an internal source of owners\' funds.',
}));
Q('m_ret_merit', mcq({
  t: 4, d: 2, c: 'application',
  stem: 'Wardha Wires Ltd (imagined) financed a new drawing machine entirely from last year\'s retained profit. Which benefit did it gain compared with a public issue?',
  opts: ['No floatation cost and no dilution of control', 'A tax deduction on the amount retained', 'A fixed return to shareholders', 'A guaranteed rise in share price'],
  sol: 'Internal funds need no prospectus, fees or new shareholders: no floatation cost and no dilution of control.',
}));
Q('ar_ret_dissatisfy', ar({
  t: 4, d: 3, c: 'analysis',
  a: 'Excessive ploughing back of profits may make shareholders unhappy.',
  r: 'Retained earnings are an external source of finance.',
  key: 'c',
  sol: 'The assertion is true: heavy retention means lower dividends. The reason is false: retained earnings are an internal source.',
}));
Q('n_retained', num({
  t: 4, d: 2, c: 'application', marks: 1, value: RET.kept, unit: '₹',
  stem: `Hooghly Hosiery Ltd (imagined) earns a profit after tax of ₹${inr(RET.eat)} and pays ${RET.payout * 100} per cent of it as dividend. How much does it plough back into the business (in ₹)?`,
  sol: `Step 1: Dividend = ${RET.payout} × ${inr(RET.eat)} = ₹${inr(RET.div)}.\nStep 2: Retained = ${inr(RET.eat)} − ${inr(RET.div)} = ₹${inr(RET.kept)}.`,
}));
Q('s_ret_merits', short({
  t: 4, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'Hooghly Hosiery Ltd (imagined) ploughed back ₹30 lakh of profit to buy knitting machines. State two merits of this source for the company.',
  model: '1. **Permanent and cheap:** the ₹30 lakh needs **no repayment** and involves **no floatation cost**.\n2. **No loss of control:** no new shares are issued, so **ownership stays the same**.',
  sol: 'Two merits (permanent, no cost of raising, no dilution, credit standing, cushion for bad years) linked to the case.',
  scheme: [['First merit', 1], ['Second merit', 1]],
}));
Q('s3_ret_demerits', short({
  t: 4, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'For three years Krishna Kitchenware Ltd (imagined) has kept almost all its profit and paid a tiny dividend; this year its profit fell sharply. Explain three demerits of relying on retained earnings that this case shows.',
  model: '1. **Shareholder dissatisfaction:** a **tiny dividend** for three years may anger shareholders and depress the share price.\n2. **Uncertain source:** when **profit fell sharply**, little could be retained, so funds dried up.\n3. **Opportunity cost ignored:** managers may treat retained funds as **free** and use them carelessly.',
  sol: 'Three demerits (dissatisfaction, uncertainty, opportunity cost, possible misuse) linked to the case.',
  scheme: [['First demerit', 1], ['Second demerit', 1], ['Third demerit', 1]],
}));

// ================================================================ t05 Debentures
Q('m_deb_meaning', mcq({
  t: 5, d: 1, c: 'understanding',
  stem: 'A debenture is',
  opts: ['an acknowledgement of debt by a company, carrying a fixed rate of interest', 'a certificate of part-ownership of a company', 'a free share given out of reserves', 'a short-term advance from a customer'],
  sol: 'A debenture holder is a creditor of the company and receives a fixed interest, not a dividend.',
}));
Q('m_deb_secured', mcq({
  t: 5, d: 2, c: 'application',
  stem: 'Periyar Polymers Ltd (imagined) issues debentures backed by a charge on its factory, so holders can sell the factory to recover their money if it defaults. These debentures are',
  opts: ['secured debentures', 'unsecured (naked) debentures', 'convertible debentures', 'bearer debentures'],
  sol: 'Debentures backed by a charge on specific assets are secured.',
}));
Q('m_deb_conv', mcq({
  t: 5, d: 2, c: 'application',
  stem: 'Rann Renewables Ltd (imagined) issues debentures of which ₹600 of each ₹1,000 will be turned into equity shares after three years and ₹400 will be repaid in cash. These are',
  opts: ['partly convertible debentures', 'fully convertible debentures', 'non-convertible debentures', 'irredeemable debentures'],
  sol: 'Only part of each debenture converts into equity; the rest is redeemed in cash: partly convertible.',
}));
Q('m_deb_registered', mcq({
  t: 5, d: 3, c: 'understanding',
  stem: 'How do registered debentures differ from bearer debentures?',
  opts: [
    'Holders\' names are recorded by the company and transfer needs a transfer deed; bearer debentures pass by mere delivery',
    'Registered debentures carry no interest',
    'Bearer debentures are always secured',
    'Registered debentures are always convertible',
  ],
  sol: 'Registered debentures are recorded in the company\'s register and transferred formally; bearer debentures are transferable by delivery.',
}));
Q('m_deb_adv', mcq({
  t: 5, d: 3, c: 'analysis',
  stem: 'Satpura Ceramics Ltd (imagined) earns 16 per cent on its capital and has steady sales. Which reason **best** explains why it may prefer 9 per cent debentures to new equity?',
  opts: [
    'Fixed-cost debt lets it trade on equity, and interest is tax-deductible',
    'Debentures give holders a vote, which shareholders like',
    'Debentures never have to be repaid',
    'Debenture interest is paid only in profitable years',
  ],
  sol: 'With a 16 per cent return against 9 per cent interest and steady sales, debt raises earnings per share, and interest saves tax.',
}));
Q('ar_deb_burden', ar({
  t: 5, d: 3, c: 'analysis',
  a: 'Debentures can be a heavy burden on a company in a bad year.',
  r: 'Interest on debentures must be paid whether or not the company earns a profit.',
  key: 'a',
  sol: 'Both are true, and the fixed, compulsory interest is exactly why debentures weigh heavily when profits fall.',
}));
Q('tf_deb_vote', tf({
  t: 5, d: 1, c: 'understanding',
  stem: 'Debenture holders have the right to vote at the general meetings of the company.',
  ans: false,
  sol: 'False. Debenture holders are creditors, not owners, and have no voting rights.',
}));
Q('n_deb_cost', num({
  t: 5, d: 4, c: 'analysis', marks: 2, value: DEB.cost, unit: '%',
  stem: `Wardha Wires Ltd (imagined) issues ₹${inr(DEB.amt)} of ${DEB.rate * 100} per cent debentures. Its tax rate is ${DEB.tax * 100} per cent. Calculate the after-tax cost of these debentures as a percentage of the amount raised (ignore issue expenses).`,
  sol: `Step 1: Interest = ${inr(DEB.amt)} × ${DEB.rate} = ₹${inr(DEB.interest)}.\nStep 2: Tax saved = ${DEB.tax * 100} per cent, so net cost = ${inr(DEB.interest)} × ${1 - DEB.tax} = ₹${inr(DEB.after)}.\nStep 3: After-tax cost = ${inr(DEB.after)} ÷ ${inr(DEB.amt)} × 100 = ${DEB.cost} per cent.`,
  scheme: [['Interest and tax saving', 1], [`After-tax cost = ${DEB.cost} per cent`, 1]],
}));
Q('mt_deb', match({
  t: 5, d: 2, c: 'understanding', marks: 2,
  stem: 'Match each kind of debenture with its description.',
  pairs: [
    ['Secured debentures', 'Backed by a charge on assets'],
    ['Unsecured debentures', 'No charge on any asset'],
    ['Non-convertible debentures', 'Repaid in cash; never become equity'],
    ['Bearer debentures', 'Transferable by mere delivery'],
  ],
  sol: 'Secured: charge on assets; unsecured: no charge; non-convertible: cash repayment only; bearer: pass by delivery.',
}));
Q('s_shares_deb', short({
  t: 5, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Asha holds equity shares and Farhan holds debentures of Mahi Motorcycles Ltd (imagined). Distinguish their positions on status and return.',
  model: '1. **Status:** Asha is an **owner** of the company; Farhan is a **creditor** who has lent it money.\n2. **Return:** Asha gets a **dividend** that varies with profit; Farhan gets **fixed interest** even in a loss year.',
  sol: 'Status and return distinguished for the two holders.',
  scheme: [['Status', 1], ['Return', 1]],
}));
Q('s3_deb_kinds', short({
  t: 5, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Indravati Infra Ltd (imagined) offers investors three choices: debentures secured on its toll road, debentures that turn into shares after four years, and debentures repayable in year seven. Name and explain each kind.',
  model: '1. **Secured debentures:** backed by a **charge on the toll road**, which holders can sell if the company defaults.\n2. **Convertible debentures:** they **turn into equity shares** after four years.\n3. **Redeemable debentures:** the company **repays them** on a fixed date, in year seven.',
  sol: 'Secured, convertible and redeemable debentures named and explained from the case.',
  scheme: [['Secured', 1], ['Convertible', 1], ['Redeemable', 1]],
}));
Q('l_deb', long({
  t: 5, d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: 'Satpura Ceramics Ltd (imagined) has steady sales, earns well above the interest rate and owns a large, unpledged factory. It is choosing between equity and secured debentures for ₹25 crore.\n(a) Distinguish between shares and debentures on three bases. [3]\n(b) Explain two reasons why debentures could suit Satpura Ceramics. [2]',
  model: '(a) **Status:** a shareholder is an **owner**; a debenture holder is a **creditor**.\n**Return:** shareholders receive a **dividend** out of profit, which may vary; debenture holders receive **fixed interest**, payable even in a loss year.\n**Security and priority:** debentures are usually **secured** on assets and repaid **before** shareholders on winding up; shares carry no security.\n\n(b) **Trading on equity and tax:** since it **earns well above the interest rate**, debt raises earnings per share, and interest is **tax-deductible**. **Security available:** its large **unpledged factory** can back secured debentures, so investors will accept a lower rate, and its steady sales make the fixed interest safe to pay.',
  sol: 'Three bases; two reasons linked to the case.',
  scheme: [['(a) Three bases', 3], ['(b) Two reasons linked to the case', 2]],
}));

// ================================================================ t06 Loans from banks and financial institutions
Q('m_loan_fi', mcq({
  t: 6, d: 2, c: 'understanding',
  stem: 'Specialised financial institutions (such as development banks and state financial corporations) differ from ordinary lenders mainly because they',
  opts: [
    'provide long-term finance for projects and often give technical and managerial advice too',
    'accept deposits only from children',
    'lend only for less than a week',
    'buy and sell shares on behalf of the public',
  ],
  sol: 'Financial institutions were set up to provide medium- and long-term project finance, often with advice, where ordinary sources fall short.',
}));
Q('m_loan_adv', mcq({
  t: 6, d: 2, c: 'application',
  stem: 'Sutlej Seeds Ltd (imagined) needs ₹8 crore for a cold store but does not want to publish a prospectus or disclose its plans to rivals. A term loan from a bank suits it mainly because a loan',
  opts: ['is raised privately, without public disclosure', 'carries no interest', 'gives the bank voting rights', 'never needs security'],
  sol: 'A loan is a private arrangement between borrower and lender, so the company\'s plans stay confidential.',
}));
Q('m_loan_covenant', mcq({
  t: 6, d: 3, c: 'application',
  stem: 'A financial institution lends ₹50 crore to Indravati Infra Ltd (imagined) on condition that it appoints a nominee director to the board and pays no dividend above 10 per cent until the loan is repaid. These conditions show a **disadvantage** of institutional loans:',
  opts: ['restrictive terms that limit management\'s freedom', 'a dilution of equity ownership', 'a high floatation cost', 'no repayment date'],
  sol: 'Institutions often impose covenants such as nominee directors and dividend limits, which restrict the company\'s freedom.',
}));
Q('tf_loan_depressed', tf({
  t: 6, d: 2, c: 'understanding',
  stem: 'When the share market is depressed and a public issue would fail, Pushkar Prints Ltd (imagined) can still raise long-term funds through a term loan from a financial institution.',
  ans: true,
  sol: 'True. Loans do not depend on investors\' mood in the share market, so they remain available when public issues are difficult.',
}));
Q('fb_loan', fb({
  t: 6, d: 2, c: 'understanding',
  stem: 'A bank loan for a period of more than a year, repaid in instalments and usually secured on the asset bought, is called a ___ loan.',
  acc: [['term', 'term loan', 'long-term', 'medium-term']],
  sol: 'It is a term loan: a loan for a fixed period, repaid in instalments.',
}));
Q('s_loan_merits', short({
  t: 6, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'Krishna Kitchenware Ltd (imagined) is choosing a seven-year term loan from a financial institution for its new plant. Explain two advantages of this source for the company.',
  model: '1. **Advice and support:** the institution often gives **technical and managerial guidance** on the new plant.\n2. **No dilution:** a loan brings **no new shareholders**, so control stays with existing owners; repayment can be **spread over seven years**.',
  sol: 'Two advantages (long-term funds, advice, confidentiality, no dilution, flexible repayment, availability in depressed markets) applied.',
  scheme: [['First advantage', 1], ['Second advantage', 1]],
}));
Q('s3_loan_limits', short({
  t: 6, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Before lending ₹12 crore to Bhadra Batteries Ltd (imagined), a bank asks for a mortgage on its plant, detailed project reports and a ban on further borrowing. Explain three disadvantages of bank and institutional loans shown here.',
  model: '1. **Security required:** the bank wants a **mortgage on the plant**, so these assets cannot be offered to back any other loan later.\n2. **Lengthy procedure:** preparing **detailed project reports** for appraisal takes weeks and adds cost.\n3. **Restrictive conditions:** the **ban on further borrowing** limits management\'s freedom to raise funds when a new need arises.',
  sol: 'Three disadvantages (security, procedure, restrictive covenants, fixed repayment burden) linked to the case.',
  scheme: [['Security', 1], ['Procedure', 1], ['Restrictions', 1]],
}));

// ================================================================ case-based
Q('cb_issues', caseQ({
  t: [3, 4], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the passage and answer the questions that follow. *(Imagined company and people, written by SOYL for practice.)*',
  passage: '**Netravati Networks Ltd (imagined), Mangaluru**\n\nNetravati Networks has built up ₹90 crore of reserves by ploughing back profits for six years. This year its board decides three things. First, every shareholder will receive one free share for every three held. Second, its engineers may buy shares at ₹150 each after one year of service. Third, it will offer existing shareholders one new share for every five held at ₹200, below the market price of ₹320, to fund a data centre.',
  parts: [
    child('a', mcq({ t: 3, d: 2, c: 'application', stem: 'The offer of one free share for every three held is a', opts: ['bonus issue', 'rights issue', 'sweat equity issue', 'QIP'], sol: 'Free shares from reserves to existing shareholders: a bonus issue.' })),
    child('b', short({ t: 3, d: 2, c: 'application', marks: 1, stem: 'Name the scheme under which engineers may buy shares at ₹150.', model: '**Employee stock option plan (ESOP).**', sol: 'An option to employees at a pre-set price after a vesting period is an ESOP.', scheme: [['ESOP', 1]] })),
    child('c', short({ t: 3, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Which of the three decisions will bring fresh funds for the data centre? Explain why the other two will not.', model: 'Only the **rights issue** at ₹200 brings **fresh cash**. The **bonus issue** merely capitalises reserves, and the **ESOP** brings money only later, if engineers choose to buy.', sol: 'Rights issue identified; bonus and ESOP explained.', scheme: [['Rights issue identified', 1], ['Other two explained', 1]] }), [
      short({ t: 4, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): State two merits of the six years of ploughing back that made the ₹90 crore of reserves possible.', model: '1. **No floatation cost** and no **dilution of control**.\n2. **Stronger financial standing:** large reserves **improve creditworthiness** and support bonus issues.', sol: 'Two merits of retained earnings.', scheme: [['First merit', 1], ['Second merit', 1]] }),
    ]),
  ],
}));
Q('cb_debt_choice', caseQ({
  t: [5, 6], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the passage and answer the questions that follow. *(Imagined company and figures, written by SOYL for practice.)*',
  passage: '**Periyar Polymers Ltd (imagined), Kochi**\n\nPeriyar Polymers needs ₹30 crore to build a recycling unit. Its finance head, Mr Thomas, compares two routes. Route 1 is an issue of 9 per cent debentures secured on the new unit, half of each to be turned into equity shares after five years. Route 2 is a ten-year loan from a financial institution, which will also send an engineer to review the plant design but wants a director on the board.',
  parts: [
    child('a', mcq({ t: 5, d: 2, c: 'application', stem: 'The debentures in Route 1 are best described as', opts: ['secured and partly convertible', 'unsecured and non-convertible', 'bearer and irredeemable', 'secured and fully convertible'], sol: 'They are secured on the new unit, and only half converts into equity: secured, partly convertible.' })),
    child('b', short({ t: 6, d: 2, c: 'application', marks: 1, stem: 'Quote one benefit of Route 2 from the passage.', model: '"**will also send an engineer to review the plant design**" (technical advice).', sol: 'The engineer\'s review shows the advice institutions give.', scheme: [['Benefit quoted', 1]] })),
    child('c', short({ t: [5, 6], d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Give one drawback of each route.', model: '**Route 1:** **fixed interest** must be paid every year, even in a loss year. **Route 2:** the lender\'s **director on the board** restricts management\'s freedom.', sol: 'One drawback of debentures and one of the institutional loan.', scheme: [['Route 1 drawback', 1], ['Route 2 drawback', 1]] }), [
      short({ t: 5, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Explain how the conversion feature of Route 1 may affect the present shareholders after five years.', model: 'When half of each debenture becomes equity, **more shares** are issued, so present shareholders\' **control and earnings per share are diluted**; but the company\'s **debt and interest fall**.', sol: 'Dilution of control and EPS, with lower debt.', scheme: [['Dilution', 1], ['Lower debt', 1]] }),
    ]),
  ],
}));

// ================================================================ added for test balance
Q('s_pref_merits', short({
  t: 2, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'Pushkar Prints Ltd (imagined) earns steadily more than the 8 per cent it would pay on new preference shares. State two advantages to the company of issuing these shares.',
  model: '1. **Control retained:** preference holders have **restricted votes**, so existing owners keep control.\n2. **Trading on equity:** the **fixed 8 per cent** is below what the money earns, so the surplus raises returns to **equity holders**.',
  sol: 'Two advantages (control, trading on equity, no charge on assets, appeal to cautious investors, flexibility if redeemable) applied.',
  scheme: [['First advantage', 1], ['Second advantage', 1]],
}));
Q('l_issues', long({
  t: 3, d: 3, c: 'application', marks: 5, wl: L5,
  stem: 'Satpura Ceramics Ltd (imagined) is listed and has large free reserves. Its board is considering a bonus issue, a rights issue and a QIP, and wants to reward a director who developed a new glaze.\n(a) Distinguish between a bonus issue and a rights issue on two bases. [2]\n(b) Explain the meaning of sweat equity and QIP, and say which purpose each serves for this company. [3]',
  model: '(a) **Fresh funds:** a bonus issue brings in **no new money**, as reserves are capitalised; a rights issue **raises cash** from existing shareholders.\n**Renunciation:** bonus shares are free and **cannot be renounced**; rights can be **renounced** in favour of others.\n\n(b) **Sweat equity** means shares issued to directors or employees at a discount or **for non-cash consideration** such as know-how or intellectual property. It suits **rewarding the director** for the new glaze without paying cash.\n**QIP** means a **listed** company placing shares or convertible securities with **qualified institutional buyers** such as mutual funds and insurers, without a full public issue. It suits Satpura if it needs a **large sum quickly**, for example to build a new kiln line.',
  sol: 'Two bases; sweat equity and QIP explained and matched to purposes.',
  scheme: [['(a) Two bases', 2], ['(b) Sweat equity and QIP explained, each with its purpose', 3]],
}));
Q('l_ret_loan', long({
  t: [4, 6], d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: 'Hooghly Hosiery Ltd (imagined) can fund a ₹6 crore dyeing unit either from retained profit or with a term loan from a bank.\n(a) Explain two merits and one demerit of using retained earnings. [3]\n(b) Explain two disadvantages of the term loan for the company. [2]',
  model: '(a) **Merits:** retained profit involves **no floatation cost**, since there is no prospectus or underwriting, and it brings **no new shareholders**, so control is not diluted. **Demerit:** using ₹6 crore of profit for the unit means **lower dividends**, which may make shareholders unhappy and weaken the share price.\n\n(b) **Fixed repayment burden:** the bank must be paid **interest and instalments** on schedule, even if hosiery sales fall in a bad year. **Security and conditions:** the bank will want a **mortgage** on the dyeing unit and may impose **restrictive conditions**, such as limits on further borrowing or on dividends, which reduce management\'s freedom.',
  sol: 'Two merits and one demerit of retained earnings; two disadvantages of a term loan.',
  scheme: [['(a) Two merits and one demerit', 3], ['(b) Two disadvantages', 2]],
}));
