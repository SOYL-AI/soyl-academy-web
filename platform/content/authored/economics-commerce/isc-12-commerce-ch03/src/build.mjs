// Build ISC 12 Commerce ch03 Long-term Sources of Funds for a Joint Stock Company. Run from platform/:
//   npx tsx content/authored/economics-commerce/isc-12-commerce-ch03/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from './lib.mjs';

setUnit('isc-12-commerce-ch03', 'economics-commerce');
const { BON, RIG, PREF, DEB, RET, inr } = await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- visuals
const vRoute1 = flow('LR', ['Equity shares', 'Preference shares', 'Bonus, rights, ESOP, sweat equity, QIP'], 'Route map of Part 1: equity shares, preference shares, and the special ways of issuing shares', 'Part 1 at a glance');
const vRoute2 = flow('LR', ['Retained earnings', 'Debentures', 'Loans from banks and institutions'], 'Route map of Part 2: retained earnings, debentures, and loans from banks and financial institutions', 'Part 2 at a glance');

// Map of long-term sources: owners' funds versus borrowed funds.
const vMap = (() => {
  const s = new Svg(560, 270);
  s.rect(200, 15, 160, 44, { fill: 'accent', fillOpacity: 0.16, color: 'accent', sw: 1.5 });
  s.text(280, 37, 'Long-term funds', { bold: true });
  s.rect(30, 95, 220, 44, { fill: 'green', fillOpacity: 0.14, color: 'green', sw: 1.5 });
  s.text(140, 117, 'Owners\' funds', { bold: true });
  s.rect(310, 95, 220, 44, { fill: 'blue', fillOpacity: 0.12, color: 'blue', sw: 1.5 });
  s.text(420, 117, 'Borrowed funds', { bold: true });
  s.arrow(250, 59, 160, 93, { sw: 1.5 }).arrow(310, 59, 400, 93, { sw: 1.5 });
  s.text(140, 165, 'Equity shares', { size: 13 }).text(140, 187, 'Preference shares', { size: 13 }).text(140, 209, 'Retained earnings', { size: 13 }).text(140, 231, '(bonus, rights, ESOP, sweat, QIP', { size: 12, muted: true }).text(140, 249, 'are ways of issuing shares)', { size: 12, muted: true });
  s.text(420, 165, 'Debentures', { size: 13 }).text(420, 187, 'Term loans from banks', { size: 13 }).text(420, 209, 'Loans from financial institutions', { size: 13 });
  return s.visual('Tree diagram: long-term funds split into owners\' funds (equity shares, preference shares, retained earnings; bonus, rights, ESOP, sweat equity and QIP are ways of issuing shares) and borrowed funds (debentures, term loans from banks, loans from financial institutions)', 'Every long-term source is either owners\' money or borrowed money.');
})();
const vEquity = table(
  ['Feature of equity shares', 'What it means'],
  [
    ['Ownership and voting', 'Holders own the company and elect its directors'],
    ['Residual claim', 'Paid last, from what is left'],
    ['Variable dividend', 'Depends on profit and the board'],
    ['Permanent capital', 'Repaid only on winding up (or a buy-back)'],
    ['Highest risk, highest possible reward', 'Gains most in good years, loses most in bad'],
  ],
  'Table of five features of equity shares with their meanings',
);
const vEqMerits = table(
  ['Advantages to the company', 'Disadvantages to the company'],
  [
    ['No fixed dividend burden', 'Dilutes control of existing owners'],
    ['Permanent capital', 'Costlier: investors expect more; no tax shield'],
    ['No charge on assets', 'High floatation cost and long formalities'],
    ['Strengthens borrowing power', 'Risk of over-capitalisation'],
  ],
  'Table of four advantages and four disadvantages of equity shares to the issuing company',
);
const vPrefTypes = table(
  ['Pair of types', 'Difference'],
  [
    ['Cumulative / non-cumulative', 'Unpaid dividend carries forward / lapses'],
    ['Participating / non-participating', 'Shares surplus profit / fixed dividend only'],
    ['Convertible / non-convertible', 'Can become equity / cannot'],
    ['Redeemable', 'Repaid after a period; Indian companies may issue only redeemable preference shares'],
  ],
  'Table of the types of preference shares in pairs with the difference between each pair; Indian companies may now issue only redeemable preference shares',
);
const vEqPref = table(
  ['Basis', 'Equity shares', 'Preference shares'],
  [
    ['Dividend', 'Varies with profit', 'Fixed rate'],
    ['Priority', 'Last', 'Before equity'],
    ['Voting', 'Full', 'Restricted'],
    ['Risk', 'High', 'Lower'],
    ['Repayment', 'Only on winding up (or buy-back)', 'Redeemable'],
    ['Arrears', 'None', 'Possible if cumulative'],
  ],
  'Table distinguishing equity and preference shares on dividend, priority, voting, risk, repayment and arrears',
);
const vPrefEx = table(
  ['Year (imagined)', 'Dividend due (₹)', 'Paid (₹)', 'Arrears carried (₹)'],
  [
    ['Year 1', inr(PREF.annual), '0', inr(PREF.annual)],
    ['Year 2', inr(PREF.annual), '0', inr(PREF.annual * 2)],
    ['Year 3', inr(PREF.annual), inr(PREF.arrears3), '0'],
  ],
  'Worked table for imagined cumulative preference shares: eighty thousand rupees due each year; nothing paid in years one and two, so arrears build to one lakh sixty thousand; in year three two lakh forty thousand must be paid before any equity dividend',
  `Imagined: Bhadra Batteries Ltd, ${inr(PREF.n)} cumulative 8 per cent preference shares of ₹${PREF.face}.`,
);
const vIssues = table(
  ['Method', 'Who gets the shares', 'Fresh funds?'],
  [
    ['Bonus issue', 'Existing shareholders, free, from reserves', 'No'],
    ['Rights issue', 'Existing shareholders, in proportion, usually below market price; can be renounced', 'Yes'],
    ['ESOP', 'Employees, as an option at a pre-set price after a vesting period', 'Yes, when exercised'],
    ['Sweat equity', 'Directors or employees, for know-how or intellectual property', 'Usually no cash'],
    ['QIP', 'Qualified institutional buyers, by a listed company', 'Yes, quickly'],
  ],
  'Table of five methods of issuing shares, who receives the shares and whether fresh funds come in',
);
const vIssueEx = table(
  ['Imagined holder', 'Offer', 'Working', 'Result'],
  [
    [`Asha: ${BON.held} shares of Pushkar Prints Ltd`, `Bonus ${BON.ratio[0]}:${BON.ratio[1]}`, `${BON.held} × ${BON.ratio[0]} ÷ ${BON.ratio[1]}`, `${BON.bonus} free shares`],
    [`Farhan: ${RIG.held} shares of Indravati Infra Ltd`, `Rights ${RIG.ratio[0]}:${RIG.ratio[1]} at ₹${RIG.price}`, `${RIG.held} ÷ ${RIG.ratio[1]} = ${RIG.shares}; ${RIG.shares} × ₹${RIG.price}`, `Pays ₹${inr(RIG.pay)}`],
  ],
  'Worked table: a holder of five hundred shares receives two hundred free bonus shares in the ratio two to five; a holder of four hundred shares in a one-for-four rights issue at sixty rupees gets one hundred shares and pays six thousand rupees',
  'Bonus: free, no cash to the company. Rights: paid, fresh cash to the company.',
);
// Bonus versus rights: two arrows showing direction of value.
const vBonusRights = (() => {
  const s = new Svg(560, 230);
  s.rect(20, 30, 150, 60, { fill: 'green', fillOpacity: 0.14, color: 'green', sw: 1.5 });
  s.text(95, 52, 'Reserves', { bold: true }).text(95, 72, '(already owned)', { size: 12 });
  s.rect(390, 30, 150, 60, { fill: 'accent', fillOpacity: 0.16, color: 'accent', sw: 1.5 });
  s.text(465, 60, 'Share capital', { bold: true });
  s.arrow(172, 60, 386, 60, { sw: 2 });
  s.text(280, 45, 'Bonus: capitalised, no cash', { size: 13 });
  s.rect(20, 140, 150, 60, { fill: 'blue', fillOpacity: 0.12, color: 'blue', sw: 1.5 });
  s.text(95, 162, 'Shareholders\' cash', { bold: true, size: 13 }).text(95, 182, '(new money)', { size: 12 });
  s.rect(390, 140, 150, 60, { fill: 'accent', fillOpacity: 0.16, color: 'accent', sw: 1.5 });
  s.text(465, 170, 'Company\'s bank', { bold: true });
  s.arrow(172, 170, 386, 170, { sw: 2 });
  s.text(280, 155, 'Rights: paid, fresh funds', { size: 13 });
  return s.visual('Two flows: in a bonus issue, reserves already owned by the company are capitalised into share capital with no cash; in a rights issue, shareholders\' cash flows into the company\'s bank as fresh funds', 'A bonus issue moves reserves; a rights issue brings in money.');
})();
const vRetained = table(
  ['Merits', 'Demerits'],
  [
    ['Permanent; no repayment', 'Lower dividends may upset shareholders'],
    ['No floatation cost', 'Amount uncertain; depends on profit'],
    ['No dilution of control', 'Opportunity cost often ignored'],
    ['Builds creditworthiness and a cushion', 'May be misused by management'],
  ],
  'Table of four merits and four demerits of retained earnings',
);
const vRetEx = table(
  ['Item (imagined: Hooghly Hosiery Ltd)', '₹'],
  [
    ['Profit after tax', inr(RET.eat)],
    [`Dividend at ${RET.payout * 100} per cent payout`, inr(RET.div)],
    ['Ploughed back (retained)', inr(RET.kept)],
  ],
  'Worked table: an imagined company with profit after tax of fifty lakh rupees pays forty per cent as dividend, twenty lakh rupees, and ploughs back thirty lakh rupees',
  'Retained = profit after tax − dividend.',
);
const vDebKinds = table(
  ['Basis', 'Kinds'],
  [
    ['Security', 'Secured (charge on assets) / unsecured (naked)'],
    ['Repayment', 'Redeemable (on a fixed date) / irredeemable'],
    ['Conversion', 'Fully convertible / partly convertible / non-convertible'],
    ['Registration', 'Registered (names recorded) / bearer (pass by delivery)'],
  ],
  'Table of kinds of debentures by security, repayment, conversion and registration',
);
const vSharesDeb = table(
  ['Basis', 'Shares', 'Debentures'],
  [
    ['Status of holder', 'Owner', 'Creditor'],
    ['Return', 'Dividend; varies (fixed for preference)', 'Interest; fixed'],
    ['Payable in a loss year?', 'No', 'Yes'],
    ['Tax treatment', 'Dividend not deductible', 'Interest deductible'],
    ['Voting', 'Yes (restricted for preference)', 'No'],
    ['Security', 'None', 'Usually secured'],
    ['Repayment on winding up', 'After creditors', 'Before shareholders'],
  ],
  'Table distinguishing shares and debentures on status, return, loss-year payment, tax, voting, security and priority on winding up',
);
const vDebEx = table(
  ['Step (imagined: Wardha Wires Ltd)', 'Working', 'Result'],
  [
    ['Interest', `${inr(DEB.amt)} × ${DEB.rate}`, `₹${inr(DEB.interest)}`],
    ['Tax saved at 25 per cent', `${inr(DEB.interest)} × 0.25`, `₹${inr(DEB.interest - DEB.after)}`],
    ['Net interest cost', `${inr(DEB.interest)} − ${inr(DEB.interest - DEB.after)}`, `₹${inr(DEB.after)}`],
    ['After-tax cost', `${inr(DEB.after)} ÷ ${inr(DEB.amt)} × 100`, `${DEB.cost} per cent`],
  ],
  'Worked table: twenty lakh rupees of nine per cent debentures cost one lakh eighty thousand rupees of interest; with tax at twenty-five per cent the net cost is one lakh thirty-five thousand rupees, an after-tax cost of six point seven five per cent',
  'The tax saving on interest is why debt is cheaper than preference or equity capital.',
);
const vLoans = table(
  ['Advantages', 'Disadvantages'],
  [
    ['Long-term funds without public issue', 'Security (mortgage) usually required'],
    ['Confidential: no prospectus', 'Lengthy appraisal and paperwork'],
    ['No dilution of control', 'Restrictive conditions (nominee director, dividend limits)'],
    ['Repayment spread in instalments', 'Fixed interest and instalments even in bad years'],
    ['Institutions add technical advice; available in depressed markets', ''],
  ],
  'Table of advantages and disadvantages of term loans from commercial banks and financial institutions',
);
const vChooser = flow('TB', ['Need long-term funds', 'Keep control?', 'Steady cash flow and assets to pledge?', 'Debentures or term loan', 'Equity, or retained earnings if available'], 'Decision flow: a company needing long-term funds asks whether it must keep control; if yes, and it has steady cash flow and assets to pledge, debentures or a term loan suit it; otherwise equity, or retained earnings if available', 'A simple way to reason about the choice; real decisions weigh several factors together.', [
  { from: 'n1', to: 'n2' }, { from: 'n2', to: 'n3', label: 'yes' }, { from: 'n3', to: 'n4', label: 'yes' }, { from: 'n2', to: 'n5', label: 'no' }, { from: 'n3', to: 'n5', label: 'no' },
]);
const vSummary1 = table(
  ['Idea', 'Key point'],
  [['Equity shares', 'Owners; votes; residual claim; permanent; no fixed burden'], ['Preference shares', 'Fixed dividend and capital first; restricted vote; redeemable'], ['Types', 'Cumulative, participating, convertible, redeemable'], ['Special issues', 'Bonus (free), rights (paid), ESOP, sweat equity, QIP']],
  'Summary table of Part 1: equity shares, preference shares, their types and the special methods of issuing shares',
);
const vSummary2 = table(
  ['Idea', 'Key point'],
  [['Retained earnings', 'Ploughed-back profit; cheap and permanent, but uncertain'], ['Debentures', 'Debt; fixed interest; secured, convertible, redeemable, registered kinds'], ['Shares vs debentures', 'Owner vs creditor; dividend vs interest'], ['Term loans', 'Private, long-term; security and conditions']],
  'Summary table of Part 2: retained earnings, debentures, shares versus debentures and term loans',
);
const vCaseSteps = flow('LR', ['Spot the clue', 'Name the source or type', 'Explain why'], 'Three steps for case questions: spot the clue, name the source or type, and explain why');

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Long-term Sources — Part 1: Equity, Preference Shares and Special Issues',
  goals: [
    'Explain the features, advantages and disadvantages of equity shares',
    'Describe the types of preference shares and distinguish them from equity shares',
    'Explain bonus shares, rights issue, ESOP, sweat equity and QIP, and distinguish bonus from rights',
  ],
  slides: [
    sl('title', 'Long-term Sources of Funds for a Company', {
      b: 'Part 1: **equity** shares, **preference** shares, and five special ways of issuing shares.',
      v: vRoute1,
      n: 'A company building a plant or a network needs money for many years. In this chapter we meet the long term sources open to it. Part one covers shares: equity, preference, and five special issues that every commerce student must be able to tell apart.',
    }),
    sl('diagram', 'Owners\' funds and borrowed funds', {
      v: vMap,
      n: 'Every long term source is either owners\' money or borrowed money. Owners\' funds include equity shares, preference shares and retained earnings. Borrowed funds include debentures and long term loans. Bonus, rights, employee options, sweat equity and placements are simply ways of issuing shares.',
    }),
    sl('concept', 'Equity shares: features', {
      v: vEquity,
      n: 'Equity shareholders are the real owners. They vote and elect directors. They are paid last, so their claim is residual. Their dividend rises and falls with profit. Their capital stays with the company until it is wound up. They bear the highest risk, and can enjoy the highest reward.',
    }),
    sl('two-column', 'Equity: for and against', {
      v: vEqMerits,
      cols: ['**For the company**\n\nNo fixed burden; permanent; assets stay free; a strong base for borrowing.', '**Against**\n\nDilutes control; expensive; costly to issue; risk of raising too much.'],
      n: 'For the company, equity is comfortable: no fixed dividend, no repayment and no charge on assets. But it has costs. New shareholders share control. Investors expect a high return, and dividends save no tax. A public issue is costly and slow.',
    }),
    sl('check', 'Quick check: equity and borrowing', {
      b: 'True or false: a large equity base makes it easier for a company to borrow.',
      chk: 'tf_eq_base',
      n: 'Think about how lenders feel when owners have a lot at stake.',
    }),
    sl('concept', 'Preference shares and their types', {
      b: 'Preference shares get a **fixed dividend** and **return of capital before** equity; their **vote is restricted**.',
      v: vPrefTypes,
      n: 'Preference shareholders come first for a fixed dividend and for repayment of capital. In return, they vote only on matters affecting them, unless their dividend has been unpaid for two years or more. Their types come in pairs: cumulative or not, participating or not, convertible or not. Indian companies may now issue only redeemable ones.',
    }),
    sl('example', 'Worked example 1: cumulative arrears', {
      b: 'An imagined battery maker missed its preference dividend for two years.',
      bl: ['Step 1: annual dividend = number × face value × rate.', 'Step 2: add each unpaid year to **arrears**.', 'Step 3: in the paying year, clear arrears **plus** the current year before any equity dividend.'],
      v: vPrefEx,
      n: 'Ten thousand shares of one hundred rupees at eight per cent need eighty thousand rupees a year. Nothing was paid in years one and two, so arrears build up. In year three the company must pay all three years, two lakh forty thousand rupees, before equity holders get a single rupee.',
    }),
    sl('check', 'Quick check: shares that change', {
      b: 'Preference shares that become equity shares after five years are…',
      chk: 'm_pref_conv',
      n: 'What does the share turn into, and what is that called?',
    }),
    sl('concept', 'Equity versus preference', {
      v: vEqPref,
      n: 'Compare the two on six bases. Equity dividend varies; preference dividend is fixed. Preference comes first; equity comes last. Equity votes fully; preference votes only in limited cases. Equity is riskier. Preference shares are redeemable, and cumulative ones can build arrears.',
    }),
    sl('concept', 'Five special ways of issuing shares', {
      v: vIssues,
      n: 'Bonus shares are free shares made out of reserves. A rights issue offers new shares to existing holders, usually below market price, and the right can be sold. An employee stock option lets staff buy later at a set price. Sweat equity rewards know how. A qualified institutional placement lets a listed company raise money quickly from big institutions.',
    }),
    sl('diagram', 'Bonus versus rights', {
      v: vBonusRights,
      n: 'Here is the key difference. In a bonus issue, money already held as reserves is relabelled as share capital, so no cash comes in. In a rights issue, shareholders pay cash, so the company receives fresh funds. Rights can be renounced; bonus shares cannot.',
    }),
    sl('example', 'Worked example 2: counting bonus and rights shares', {
      b: 'Two imagined shareholders, two offers.',
      bl: ['Step 1: shares held × ratio.', 'Step 2: for rights, multiply by the **issue price**.'],
      v: vIssueEx,
      n: 'Asha holds five hundred shares and gets bonus shares at two for every five, so she receives two hundred free shares. Farhan holds four hundred shares and is offered one for every four at sixty rupees. He gets one hundred shares and pays six thousand rupees.',
    }),
    sl('check', 'Quick check: rewarding know-how', {
      b: 'Shares given without cash to a director who developed a patented process are…',
      chk: 'm_sweat',
      n: 'The reward is for effort and know-how, not money.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up. Equity shareholders own the company, vote and take the residual profit. Preference shareholders get a fixed dividend and capital first, with a restricted vote. Preference shares may be cumulative, participating, convertible and redeemable. Bonus, rights, ESOP, sweat equity and QIP are five special ways of issuing shares.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['In case questions, look for **free** (bonus), **existing holders, paid** (rights), **employees, option** (ESOP), **know-how** (sweat equity), **institutions, listed** (QIP).', 'For distinctions, write **basis by basis**, not two separate paragraphs.', 'Show working for **ratios** step by step.'],
      v: vCaseSteps,
      n: 'Some tips. Learn the clue words that reveal each type of issue. When asked to distinguish, set your answer out basis by basis, so the examiner sees each contrast. And show the working for every ratio question.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Long-term Sources — Part 2: Retained Earnings, Debentures and Term Loans',
  goals: [
    'Evaluate retained earnings as a source of finance',
    'Describe kinds of debentures and distinguish shares from debentures',
    'State the advantages and disadvantages of loans from banks and financial institutions',
  ],
  slides: [
    sl('title', 'Retained Earnings, Debentures and Loans', {
      b: 'Part 2: **ploughing back** profit, borrowing through **debentures**, and **term loans** from banks and institutions.',
      v: vRoute2,
      n: 'In part two we look at money the company keeps from its own profits, and at money it borrows: debentures sold to investors, and loans from banks and financial institutions.',
    }),
    sl('concept', 'Retained earnings', {
      b: '**Retained earnings** (ploughing back) is the part of profit kept in the business instead of being paid as dividend.',
      v: vRetained,
      n: 'Retained earnings are an internal source of owners\' funds. They are permanent, cost nothing to raise and bring in no new owners. They also build credit and a cushion for bad years. But shareholders may resent low dividends, the amount depends on profit, and managers may treat the money as free.',
    }),
    sl('example', 'Worked example 1: how much is ploughed back?', {
      b: 'An imagined hosiery company decides its dividend.',
      bl: ['Step 1: find the **dividend** = payout ratio × profit after tax.', 'Step 2: **retained** = profit after tax − dividend.'],
      v: vRetEx,
      n: 'The company earns fifty lakh rupees after tax and pays forty per cent as dividend, which is twenty lakh rupees. The remaining thirty lakh rupees are ploughed back to buy knitting machines.',
    }),
    sl('check', 'Quick check: ploughing back', {
      b: 'Retained earnings as a source of finance means…',
      chk: 'm_ret_meaning',
      n: 'Where does the money come from?',
    }),
    sl('concept', 'Debentures and their kinds', {
      b: 'A **debenture** is an acknowledgement of **debt** with a **fixed rate of interest**; its holder is a **creditor**.',
      v: vDebKinds,
      n: 'A debenture is a loan to the company, split into small units sold to investors. Debentures are classified by security, repayment, conversion and registration. They may be secured or not, redeemable or not, convertible in full, in part or not at all, and registered or payable to bearer.',
    }),
    sl('two-column', 'Debentures: for and against', {
      cols: ['**For the company**\n\nNo dilution of control; interest saves tax; fixed cost allows trading on equity; redeemable when not needed.', '**Against**\n\nFixed interest even in bad years; charge on assets limits further borrowing; repayment burden.'],
      v: table(['For', 'Against'], [['No dilution of control', 'Fixed interest even in losses'], ['Interest is tax-deductible', 'Assets are pledged'], ['Trading on equity', 'Repayment must be planned']], 'Table of three advantages and three disadvantages of debentures to the company'),
      n: 'Debentures keep control with the owners, and interest saves tax. When the business earns more than the interest rate, they raise returns to shareholders. But interest must be paid even in a loss year, pledged assets cannot back other loans, and the money must be repaid.',
    }),
    sl('example', 'Worked example 2: after-tax cost of debentures', {
      b: 'An imagined wire company issues 9 per cent debentures; tax is 25 per cent.',
      bl: ['Step 1: interest = amount × rate.', 'Step 2: tax saved = interest × tax rate.', 'Step 3: after-tax cost = net interest ÷ amount × 100.'],
      v: vDebEx,
      n: 'Twenty lakh rupees at nine per cent means one lakh eighty thousand rupees of interest. Because interest is deducted before tax, a quarter of it comes back as tax saved. The net cost is one lakh thirty five thousand rupees, or six point seven five per cent.',
    }),
    sl('check', 'Quick check: do lenders vote?', {
      b: 'True or false: debenture holders vote at general meetings.',
      chk: 'tf_deb_vote',
      n: 'Are debenture holders owners or creditors?',
    }),
    sl('concept', 'Shares versus debentures', {
      v: vSharesDeb,
      n: 'Shareholders are owners; debenture holders are creditors. Shareholders get dividends, which may vary; debenture holders get fixed interest, even in a loss year. Interest saves tax, dividends do not. Shareholders vote; debenture holders do not. Debentures are usually secured and are repaid first on winding up.',
    }),
    sl('concept', 'Loans from banks and financial institutions', {
      b: '**Term loans** run for more than a year, are repaid in **instalments** and are usually **secured**. Financial institutions also offer **advice**.',
      v: vLoans,
      n: 'Banks and specialised financial institutions give term loans for projects. Loans are private, so plans stay confidential, and they bring no new owners. Institutions often add technical advice and lend even when share markets are weak. But they want security, careful appraisal and sometimes a director on the board.',
    }),
    sl('check', 'Quick check: keeping plans private', {
      b: 'A company wants long-term funds without publishing a prospectus. Why does a term loan suit it?',
      chk: 'm_loan_adv',
      n: 'Who learns about the company\'s plans in a loan?',
    }),
    sl('diagram', 'Choosing a long-term source', {
      v: vChooser,
      n: 'Here is one way to reason. If owners must keep control, and the company has steady cash flow and assets to pledge, debentures or a term loan suit it. If not, equity is safer, and retained earnings are best of all when profits allow. Real decisions weigh cost, risk and control together.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up. Retained earnings are cheap and permanent but uncertain. Debentures are debt with fixed interest, in several kinds. Shareholders own; debenture holders lend. Term loans are private and long term, but need security and come with conditions.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['Say **owner** or **creditor** in every shares-versus-debentures answer.', 'Name debenture kinds **by basis**: security, repayment, conversion, registration.', 'For loans, mention **security** and **restrictive conditions** as drawbacks.', 'In numericals, remember that interest saves **tax**; dividends do not.'],
      v: vCaseSteps,
      n: 'Final tips. Always state who is an owner and who is a creditor. Classify debentures basis by basis. Remember security and conditions as the price of a loan. And in any cost calculation, let interest, but not dividends, reduce tax.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Long-term Sources of Funds for a Joint Stock Company — notes',
  sections: [
    {
      h: '1. Equity shares',
      t: 1,
      b: '**Equity shares** represent ownership of a company. **Features:** ownership and voting rights; residual claim on income and assets; dividend not fixed; permanent capital (repaid only on winding up, apart from a buy-back); limited liability; highest risk.\n\n**Advantages to the company:** no fixed burden of dividend; permanent capital; no charge on assets; a strong equity base improves creditworthiness; suits investors willing to take risk.\n\n**Disadvantages:** dilution of control; costlier than debt (higher expected return, dividend not tax-deductible); high floatation cost and formalities; risk of over-capitalisation; may encourage speculation in the shares.',
      terms: [['Equity share', 'A share giving ownership, votes and a residual claim.'], ['Residual claim', 'The right to what remains after all prior claims are met.'], ['Floatation cost', 'Cost of issuing securities: fees, printing, advertising, underwriting.']],
      v: vMap,
      vs: [vEquity, vEqMerits],
    },
    {
      h: '2. Preference shares',
      t: 2,
      b: '**Preference shares** carry a preferential right to a **fixed dividend** and to **return of capital** on winding up, before equity. Their **voting rights are restricted** to matters directly affecting them, but extend to all resolutions if their dividend is unpaid for two years or more (Companies Act, 2013).\n\n**Types:** cumulative / non-cumulative; participating / non-participating; convertible / non-convertible; redeemable. Under the Companies Act, 2013 a company may **not** issue irredeemable preference shares; they must be redeemed, normally within twenty years.\n\n**Advantages to the company:** no dilution of control; fixed dividend allows trading on equity; no charge on assets; attracts cautious investors.\n**Disadvantages:** dividend is not tax-deductible, so costlier than debt; arrears burden on cumulative shares; fixed dividend reduces what is left for equity.\n\n**Equity versus preference:** dividend (variable / fixed); priority (last / first); voting (full / restricted); risk (high / lower); redemption (no / yes); arrears (none / possible).',
      terms: [['Cumulative preference share', 'Unpaid dividends accumulate as arrears.'], ['Participating preference share', 'Shares surplus profit beyond its fixed dividend.'], ['Convertible preference share', 'Can be converted into equity after a stated period.']],
      v: vPrefTypes,
      vs: [vEqPref, vPrefEx],
    },
    {
      h: '3. Bonus shares, rights issue, ESOP, sweat equity and QIP',
      t: 3,
      b: '- **Bonus shares:** free shares to existing shareholders by **capitalising reserves** (free reserves or securities premium). No fresh funds.\n- **Rights issue:** new shares offered to **existing shareholders in proportion** to their holdings, usually below market price; the right can be **renounced**.\n- **ESOP (employee stock option plan):** an option to employees to buy shares at a **pre-determined price** after a vesting period.\n- **Sweat equity shares:** shares issued to directors or employees at a discount or **for non-cash consideration** such as know-how, intellectual property or value addition.\n- **QIP (qualified institutional placement):** a **listed** company issues shares or convertible securities to **qualified institutional buyers** (mutual funds, banks, insurers and similar), quickly and without a full public issue.\n\n**Bonus versus rights:** funds (none / fresh cash); payment (free / paid); renunciation (not possible / possible); source (reserves / shareholders\' cash).',
      terms: [['Bonus issue', 'Free shares from reserves to existing shareholders.'], ['Rights issue', 'Paid offer of new shares to existing shareholders in proportion.'], ['QIP', 'Placement of securities by a listed company with institutional buyers.']],
      v: vIssues,
      vs: [vBonusRights, vIssueEx],
    },
    {
      h: '4. Retained earnings',
      t: 4,
      b: '**Retained earnings** (ploughing back of profits) are the part of net profit kept in the business. It is an **internal** source of owners\' funds.\n\n**Merits:** permanent; no floatation cost; no dilution of control; improves credit standing; provides a cushion that helps keep dividends steady.\n**Demerits:** low dividends may cause dissatisfaction; uncertain, because it depends on profit; opportunity cost may be ignored, leading to careless use; possible misuse by management.',
      terms: [['Ploughing back', 'Reinvesting profit in the business instead of distributing it.']],
      v: vRetained,
      vs: [vRetEx],
    },
    {
      h: '5. Debentures',
      t: 5,
      b: 'A **debenture** is a written acknowledgement of **debt** by a company, carrying a **fixed rate of interest**. Holders are **creditors** with no vote.\n\n**Kinds:** secured / unsecured; redeemable / irredeemable; fully convertible / partly convertible / non-convertible; registered / bearer.\n\n**Advantages to the company:** no dilution of control; interest is tax-deductible, so cheaper; fixed cost permits trading on equity; can be redeemed when funds are no longer needed; suits cautious investors.\n**Disadvantages:** fixed interest burden even in a loss year; charge on assets reduces further borrowing capacity; redemption must be provided for; risky when earnings are unstable.\n\n**Shares versus debentures:** status (owner / creditor); return (dividend / interest); loss-year payment (no / yes); tax (not deductible / deductible); voting (yes / no); security (none / usually secured); priority on winding up (after creditors / before shareholders).',
      terms: [['Debenture', 'An acknowledgement of debt with fixed interest.'], ['Secured debenture', 'Backed by a charge on the company\'s assets.'], ['Convertible debenture', 'Can be converted into equity, wholly or partly.']],
      v: vDebKinds,
      vs: [vSharesDeb, vDebEx],
    },
    {
      h: '6. Loans from commercial banks and financial institutions',
      t: 6,
      b: '**Term loans** from commercial banks are given for more than a year, usually against security, and repaid in instalments. **Financial institutions** (development banks and state-level corporations) provide medium- and long-term project finance, often with technical and managerial advice.\n\n**Advantages:** long-term funds without a public issue; confidentiality; no dilution of control; flexible repayment in instalments; advice from institutions; available when markets are depressed.\n**Disadvantages:** security required; lengthy appraisal and documentation; restrictive conditions such as a nominee director or limits on dividends and further borrowing; fixed repayment burden.',
      terms: [['Term loan', 'A loan for more than a year, repaid in instalments.'], ['Nominee director', 'A director appointed to a company\'s board by its lender.']],
      v: vLoans,
      vs: [vChooser],
    },
  ],
  tips: '**Common mistakes**\n- Saying a bonus issue raises funds (it does not).\n- Giving preference shareholders full voting rights.\n- Calling debenture holders owners, or saying their interest depends on profit.\n- Forgetting that interest, unlike dividend, is tax-deductible.\n- Calling retained earnings an external source.\n\n**How marks are usually awarded**\n- 1 mark: correct option, term or figure.\n- 2–3 marks: each point named and explained, or each basis of distinction stated for both sides.\n- 5 marks: parts answered separately; distinctions set out basis by basis; reasons tied to facts in the case.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['**Equity shareholders** are…', 'Owners: voting rights, residual claim, variable dividend.', 'definition', 1],
  ['Why is equity "permanent capital"?', 'It is repaid only on winding up (apart from a buy-back).', 'concept', 1],
  ['Two drawbacks of equity for a company', 'Dilutes control; costly (no tax shield, high floatation cost).', 'exam-tip', 1],
  ['**Floatation cost**', 'Cost of issuing securities: fees, printing, advertising, underwriting.', 'definition', 1],
  ['Two preferences of **preference shares**', 'Fixed dividend first; capital repaid first on winding up.', 'fact', 2],
  ['When do preference shareholders vote on all matters?', 'When their dividend is unpaid for two years or more.', 'fact', 2],
  ['**Cumulative** preference shares', 'Unpaid dividends become arrears, paid before equity.', 'definition', 2],
  ['**Participating** preference shares', 'Share surplus profit beyond the fixed rate.', 'definition', 2],
  ['Can an Indian company issue irredeemable preference shares?', 'No — under the Companies Act, 2013 they must be redeemable.', 'fact', 2],
  ['Equity vs preference: dividend', 'Variable vs fixed rate.', 'exam-tip', 2],
  ['**Bonus shares**', 'Free shares to existing holders from reserves; no fresh funds.', 'definition', 3],
  ['**Rights issue**', 'Paid offer to existing holders in proportion; can be renounced.', 'definition', 3],
  ['**ESOP**', 'Option for employees to buy shares at a set price after vesting.', 'definition', 3],
  ['**Sweat equity**', 'Shares for know-how or intellectual property, at a discount or without cash.', 'definition', 3],
  ['**QIP**', 'Listed company places securities with qualified institutional buyers quickly.', 'definition', 3],
  ['Bonus vs rights: funds', 'Bonus raises none; rights raises fresh cash.', 'exam-tip', 3],
  ['Bonus 2:5 on 500 shares', '200 free shares.', 'formula', 3],
  ['**Retained earnings**', 'Profit ploughed back; internal owners\' funds.', 'definition', 4],
  ['Merits of retained earnings', 'Permanent, no floatation cost, no dilution, builds credit.', 'fact', 4],
  ['Demerits of retained earnings', 'Unhappy shareholders, uncertain amount, opportunity cost ignored.', 'fact', 4],
  ['**Debenture**', 'Acknowledgement of debt with fixed interest; holder is a creditor.', 'definition', 5],
  ['Four bases for kinds of debentures', 'Security, repayment, conversion, registration.', 'exam-tip', 5],
  ['**Partly convertible** debenture', 'Part becomes equity; the rest is repaid in cash.', 'definition', 5],
  ['**Bearer** debenture', 'Transferable by mere delivery.', 'definition', 5],
  ['Shares vs debentures: status', 'Owner vs creditor.', 'exam-tip', 5],
  ['Why is debt cheaper than preference capital?', 'Interest is tax-deductible; preference dividend is not.', 'concept', 5],
  ['After-tax cost of 9% debt at 25% tax', '9 × 0.75 = 6.75 per cent.', 'formula', 5],
  ['**Term loan**', 'Loan for over a year, repaid in instalments, usually secured.', 'definition', 6],
  ['Extra benefit of loans from financial institutions', 'Technical and managerial advice.', 'fact', 6],
  ['Drawbacks of institutional loans', 'Security, long procedure, restrictive conditions, fixed repayments.', 'exam-tip', 6],
]);

// ---------------------------------------------------------------- tests (ISC class defaults, item for item)
const T_SHORT = test({
  kind: 'short',
  blueprint: 'isc-12-default-chapter-test-short',
  title: 'Chapter test (short) — Long-term Sources of Funds',
  duration: 50,
  sections: [
    { id: 'A', title: 'Section A - Objective (5 marks)', instr: 'Answer all questions. Multiple-choice and assertion-reason items carry 1 mark each.', items: ['m_eq_residual', 'm_pref_cum', 'm_rights', 'm_deb_secured', 'ar_pref_cost'] },
    { id: 'B', title: 'Section B - Short answer (4 marks)', instr: 'Answer both questions. Internal choice in the second question.', items: ['s_eq_vs_pref', { attempt: 1, keys: ['s_bonus_rights', 's_loan_merits'] }] },
    { id: 'C', title: 'Section C - Short answer (6 marks)', instr: 'Answer both questions. Internal choice in the second question.', items: ['s3_eq_merits', { attempt: 1, keys: ['s3_esop_sweat', 's3_deb_kinds'] }] },
    { id: 'D', title: 'Section D - Long answer (5 marks)', instr: 'Answer the question. It is set in parts.', items: ['l_deb'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'isc-12-default-chapter-test-long',
  title: 'Chapter test (long) — Long-term Sources of Funds',
  duration: 100,
  sections: [
    { id: 'A', title: 'Section A - Objective (12 marks)', instr: 'Answer all questions. Multiple-choice and assertion-reason items carry 1 mark each.', items: ['m_eq_owner', 'm_eq_nofixed', 'm_pref_meaning', 'm_pref_part', 'm_esop', 'm_qip', 'm_ret_merit', 'm_deb_conv', 'm_deb_adv', 'm_loan_covenant', 'ar_eq_permanent', 'ar_deb_burden'] },
    { id: 'B', title: 'Section B - Short answer (6 marks)', instr: 'Answer all three questions. Internal choice in the last question.', items: ['s_eq_features', 's_shares_deb', { attempt: 1, keys: ['s_ret_merits', 's_pref_merits'] }] },
    { id: 'C', title: 'Section C - Short answer (12 marks)', instr: 'Answer all four questions. Internal choice in the last question.', items: ['s3_eq_limits', 's3_pref_types', 's3_loan_limits', { attempt: 1, keys: ['s3_ret_demerits', 's3_qip_rights'] }] },
    { id: 'D', title: 'Section D - Long answer (10 marks)', instr: 'Answer both questions. Internal choice in the second question. Each is set in parts.', items: ['l_pref', { attempt: 1, keys: ['l_issues', 'l_ret_loan'] }] },
  ],
});
if (T_SHORT.total_marks !== 20 || T_LONG.total_marks !== 40) throw new Error(`test marks ${T_SHORT.total_marks} / ${T_LONG.total_marks}`);

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t06 of isc-12-commerce-ch03 (equity shares; preference shares and types, equity versus preference; bonus, rights, ESOP, sweat equity, QIP; retained earnings; debentures and kinds, shares versus debentures; loans from banks and financial institutions)',
    originality: 'every firm, person, figure and case is imagined and written by SOYL and labelled; no ISC or CBSE textbook text, illustration or exercise and no CISCE specimen or board item reused (D-036)',
    data: `figures computed in the build and asserted: bonus ${BON.bonus} shares, rights payment ₹${inr(RIG.pay)}, cumulative arrears ₹${inr(PREF.arrears3)}, after-tax debenture cost ${DEB.cost} per cent, retained earnings ₹${inr(RET.kept)}`,
    facts: 'stable rules of the Companies Act, 2013 (only redeemable preference shares, normally within twenty years; preference voting widens after two years of unpaid dividend; sweat equity for know-how or intellectual property) stated without section numbers; listed in the README for review',
    gate: 'schema, pipeline lint, deterministic verify, word limits, narration and answer-leak checks run clean in this build',
  },
});
