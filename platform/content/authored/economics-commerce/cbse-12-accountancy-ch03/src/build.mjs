// Build CBSE 12 Accountancy ch03 Admission of a Partner. Run from platform/:
//   npx tsx content/authored/economics-commerce/cbse-12-accountancy-ch03/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from './lib.mjs';
import { fr, admit, rs, inr, check, journal, solveAdmission, splitRatio, ratioStr, ratioWords, words, rw, fw } from './acc.mjs';

setUnit('cbse-12-accountancy-ch03', 'economics-commerce');
await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const C = (n) => `${n}'s Capital A/c`;
const eq = (a, b, what) => check(JSON.stringify(a) === JSON.stringify(b), `deck figure ${what}: got ${JSON.stringify(a)}, expected ${JSON.stringify(b)}`);

// ---------------------------------------------------------------- deck figures (computed, never typed)
// WE1 Saffron Prints, Nashik (imagined): Neha and Omkar 3 : 2; Pallavi joins for 1/5 from both in the old ratio.
const W1 = admit({ Neha: fr(3, 5), Omkar: fr(2, 5) }, 'Pallavi', { proportion: fr(1, 5) });
eq([W1.newInts, W1.sacInts], [[12, 8, 5], [3, 2]], 'W1');
// WE2 Brahmaputra Tea Traders, Guwahati (imagined): Arjun and Bela 5 : 3; Arjun surrenders 1/5 of his share, Bela 1/3 of hers.
const W2how = { surrender: { Arjun: fr(1, 5), Bela: fr(1, 3) } };
const W2 = admit({ Arjun: fr(5, 8), Bela: fr(3, 8) }, 'Charu', W2how);
eq([W2.newInts, W2.sacInts, W2.newShare.toString()], [[2, 1, 1], [1, 1], '1/4'], 'W2');
// WE3 premium in cash (Saffron Prints): goodwill 1,50,000; Pallavi brings capital 80,000 and her premium.
const W3 = { gw: 150000, cap: 80000 };
const W3p = W1.newShare.of(W3.gw);
const W3s = splitRatio(W3p, W1.names, W1.sacInts);
eq([W3p, W3s], [30000, { Neha: 18000, Omkar: 12000 }], 'W3');
const W3j = journal([
  { dr: [['Bank A/c', W3.cap + W3p]], cr: [[C('Pallavi'), W3.cap], ['Premium for Goodwill A/c', W3p]], nar: 'Capital and premium brought in cash by Pallavi' },
  { dr: [['Premium for Goodwill A/c', W3p]], cr: [[C('Neha'), W3s.Neha], [C('Omkar'), W3s.Omkar]], nar: 'Premium credited to the sacrificing partners in 3 : 2' },
]);
// WE4 premium partly brought (Brahmaputra Tea Traders): goodwill 96,000; Charu brings 10,000 of her premium.
const W4 = { gw: 96000, cash: 10000 };
const W4p = W2.newShare.of(W4.gw);
const W4s = splitRatio(W4p, W2.names, W2.sacInts);
eq([W4p, W4s], [24000, { Arjun: 12000, Bela: 12000 }], 'W4');
const W4j = journal([
  { dr: [['Bank A/c', W4.cash]], cr: [['Premium for Goodwill A/c', W4.cash]], nar: 'Part of the premium brought in cash by Charu' },
  { dr: [['Premium for Goodwill A/c', W4.cash], [C('Charu'), W4p - W4.cash]], cr: [[C('Arjun'), W4s.Arjun], [C('Bela'), W4s.Bela]], nar: 'Goodwill credited to the sacrificing partners; the unpaid part charged to Charu' },
]);
// WE5 hidden goodwill, Ganga Agencies, Varanasi (imagined): Ishaan and Jaya 3 : 1; Kabir 1/4 with 60,000.
const W5r = admit({ Ishaan: fr(3, 4), Jaya: fr(1, 4) }, 'Kabir', { proportion: fr(1, 4) });
const W5 = { Ishaan: 90000, Jaya: 50000, cap: 60000 };
const W5implied = fr(W5.cap).div(W5r.newShare).of(1);
const W5actual = W5.Ishaan + W5.Jaya + W5.cap;
const W5hg = W5implied - W5actual;
const W5share = W5r.newShare.of(W5hg);
const W5s = splitRatio(W5share, W5r.names, W5r.sacInts);
eq([W5implied, W5actual, W5hg, W5share, W5s], [240000, 200000, 40000, 10000, { Ishaan: 7500, Jaya: 2500 }], 'W5');
const W5j = journal([{ dr: [[C('Kabir'), W5share]], cr: [[C('Ishaan'), W5s.Ishaan], [C('Jaya'), W5s.Jaya]], nar: "Kabir's share of hidden goodwill credited to the sacrificing partners in 3 : 1" }]);

// WE6 + WE9 Nilgiri Spices, Kochi (imagined): Rohan and Simran 2 : 1; Tara joins for 1/4.
const NI = { stock: 6000, building: 30000, debtors: 40000, prov: 2000, rent: 1000, cred: 3000, gw: 96000, gr: 18000, cap: 100000, caps: [120000, 90000] };
check(fr(5, 100).of(NI.debtors) === NI.prov, 'NIL provision');
const NIL = solveAdmission({
  old: { Rohan: fr(2, 3), Simran: fr(1, 3) }, newName: 'Tara', how: { proportion: fr(1, 4) },
  liabs: [['Creditors', 48000], ['General Reserve', NI.gr, { reserve: true }], ["Rohan's Capital", NI.caps[0], { cap: 'Rohan' }], ["Simran's Capital", NI.caps[1], { cap: 'Simran' }]],
  assets: [['Bank', 22000, { bank: true }], ['Debtors', NI.debtors], ['Stock', 60000], ['Furniture', 24000], ['Building', 130000]],
  reval: [['Stock (decrease)', 'A', 'Stock', -NI.stock], ['Building (increase)', 'A', 'Building', NI.building], ['Provision for doubtful debts', 'A', 'Debtors', -NI.prov, (b, c) => `Debtors ${inr(b)} less provision ${inr(-c)}`], ['Outstanding rent (unrecorded)', 'L', 'Outstanding Rent', NI.rent], ['Creditors not payable', 'L', 'Creditors', -NI.cred]],
  goodwill: { value: NI.gw }, capital: NI.cap,
});
eq([NIL.reval.net, NIL.reval.parts, NIL.premium, NIL.caps.closing, NIL.newBS.total, NIL.bank], [24000, { Rohan: 16000, Simran: 8000 }, 24000, { Rohan: 164000, Simran: 112000, Tara: 100000 }, 422000, 146000], 'NIL');
eq(Object.fromEntries(['Rohan', 'Simran'].map((n) => [n, NIL.s.old[n].of(NI.gr)])), { Rohan: 12000, Simran: 6000 }, 'NIL reserve');
// WE7 Tapti Textiles, Surat (imagined): Uday and Vani 3 : 2; reserves and losses at Wasim's admission.
const W7 = { old: { Uday: fr(3, 5), Vani: fr(2, 5) }, gr: 40000, loss: 10000, wcr: 15000, claim: 9000 };
const w7 = (x) => Object.fromEntries(Object.keys(W7.old).map((n) => [n, W7.old[n].of(x)]));
const W7j = journal([
  { dr: [['General Reserve A/c', W7.gr]], cr: [[C('Uday'), w7(W7.gr).Uday], [C('Vani'), w7(W7.gr).Vani]], nar: 'General reserve transferred to the old partners in 3 : 2' },
  { dr: [[C('Uday'), w7(W7.loss).Uday], [C('Vani'), w7(W7.loss).Vani]], cr: [['Profit and Loss A/c', W7.loss]], nar: 'Accumulated loss written off among the old partners' },
  { dr: [['Workmen Compensation Reserve A/c', W7.wcr]], cr: [['Workmen Compensation Claim A/c', W7.claim], [C('Uday'), w7(W7.wcr - W7.claim).Uday], [C('Vani'), w7(W7.wcr - W7.claim).Vani]], nar: 'Claim provided out of the reserve; balance to the old partners' },
]);
eq([w7(W7.gr), w7(W7.loss), w7(W7.wcr - W7.claim)], [{ Uday: 24000, Vani: 16000 }, { Uday: 6000, Vani: 4000 }, { Uday: 3600, Vani: 2400 }], 'W7');
// WE8 Kosi Electricals, Patna (imagined): Yash and Zoya share equally; Amaan 1/5 brings 50,000.
const W8r = admit({ Yash: fr(1, 2), Zoya: fr(1, 2) }, 'Amaan', { proportion: fr(1, 5) });
const W8 = { cap: 50000, Yash: 112000, Zoya: 91000 };
const W8total = fr(W8.cap).div(W8r.newShare).of(1);
const W8req = Object.fromEntries(W8r.names.map((n) => [n, W8r.newShares[n].of(W8total)]));
const W8d = Object.fromEntries(W8r.names.map((n) => [n, W8req[n] - W8[n]]));
eq([W8r.newInts, W8total, W8req, W8d], [[2, 2, 1], 250000, { Yash: 100000, Zoya: 100000 }, { Yash: -12000, Zoya: 9000 }], 'W8');
// New partner's capital from the old partners' capitals, Chambal Dairy, Gwalior (imagined).
const CH = { old: 180000, share: fr(1, 4) };
const CHoc = fr(1).sub(CH.share);
const CHtotal = fr(CH.old).div(CHoc).of(1);
const CHcap = CH.share.of(CHtotal);
eq([CHtotal, CHcap], [240000, 60000], 'CH');

// ---------------------------------------------------------------- visuals: Part 1
const vRoute1 = flow('LR', ['Admission and its adjustments', 'New ratio', 'Sacrificing ratio', 'Goodwill (premium)', 'Hidden goodwill'], 'Route map of Part 1: what changes on admission, the new profit-sharing ratio, the sacrificing ratio, goodwill brought as premium, and hidden goodwill', 'Part 1 at a glance');
const vAdjust = flow('LR', ['New profit-sharing ratio', 'Sacrificing ratio', 'Goodwill', 'Revaluation of assets and liabilities', 'Reserves and accumulated profits or losses', 'Capitals and the new balance sheet'], 'Flow of the six adjustments made on admission: new profit-sharing ratio, sacrificing ratio, goodwill, revaluation, reserves and accumulated profits or losses, and capitals with the new balance sheet', 'Six matters to settle on admission');
const vCases = table(
  ['How the new partner gets his share', 'Sacrifice of each old partner', 'New share of each old partner'],
  [
    ['From all old partners in the old ratio', 'Old share × new partner\'s share', 'Old share × (1 − new partner\'s share)'],
    ['Each surrenders a fraction **of his own share**', 'Old share × fraction surrendered', 'Old share − sacrifice'],
    ['Each gives a fraction **of the firm**', 'The fraction given', 'Old share − fraction given'],
    ['From one partner only', 'Whole new share from him; others nil', 'Only his share falls'],
    ['New ratio given', 'Old share − new share', 'Read from the new ratio'],
  ],
  'Table of the ways a new partner can get his share: from all old partners in the old ratio, by each surrendering a fraction of his own share, by each giving a fraction of the firm, from one partner only, or with the new ratio given; for each it shows how to find the sacrifice and the new share',
  'Sacrifice = old share − new share in every case.',
);
const vW1 = table(
  ['Partner (Saffron Prints, imagined)', 'Old share', 'Working', 'New share'],
  [
    ['Neha', `${W1.old.Neha}`, `${W1.old.Neha} × 4/5`, `${W1.newShares.Neha}`],
    ['Omkar', `${W1.old.Omkar}`, `${W1.old.Omkar} × 4/5`, `${W1.newShares.Omkar}`],
    ['Pallavi', '—', 'given', `${W1.newShare} = 5/25`],
    ['**New ratio**', '', '', `**${ratioStr(W1.newInts)}**`],
  ],
  `Table of worked example 1: Neha's share 3/5 becomes 12/25, Omkar's 2/5 becomes 8/25 and Pallavi gets 5/25, so the new ratio is ${ratioStr(W1.newInts)} and the sacrificing ratio is ${ratioStr(W1.sacInts)}`,
  `Sacrificing ratio = old ratio ${ratioStr(W1.sacInts)}.`,
);
const vShares = (() => {
  const s = new Svg(620, 230);
  const X0 = 120, W = 460;
  const bar = (y, label, parts) => {
    s.text(X0 - 12, y + 22, label, { anchor: 'end', size: 14, bold: true });
    let x = X0;
    for (const [name, f, color] of parts) {
      const w = W * f.value;
      s.rect(x, y, w, 44, { fill: color, color: 'accent', sw: 1.5, rx: 2 });
      s.text(x + w / 2, y + 15, name, { size: 13 });
      s.text(x + w / 2, y + 32, String(f), { size: 13 });
      x += w;
    }
  };
  bar(30, 'Old firm', [['Neha', W1.old.Neha, 'blue'], ['Omkar', W1.old.Omkar, 'green']]);
  bar(120, 'New firm', [['Neha', W1.newShares.Neha, 'blue'], ['Omkar', W1.newShares.Omkar, 'green'], ['Pallavi', W1.newShare, 'yellow']]);
  s.text(X0 + W / 2, 200, `Each bar is the whole profit; Pallavi's ${W1.newShare} comes ${ratioStr(W1.sacInts)} out of both`, { size: 12, muted: true });
  return s.visual(
    `Two stacked bars of the whole profit of Saffron Prints: the old firm bar is split Neha 3/5 and Omkar 2/5; the new firm bar is split Neha 12/25, Omkar 8/25 and Pallavi 5/25, showing that Pallavi's share is carved out of both old shares`,
    'Old and new profit shares, worked example 1.',
  );
})();
const vW2 = table(
  ['Partner (Brahmaputra Tea Traders, imagined)', 'Old share', 'Sacrifice', 'New share'],
  [
    ['Arjun', `${W2.old.Arjun}`, `${W2.old.Arjun} × 1/5 = ${W2.sac.Arjun}`, `${W2.newShares.Arjun}`],
    ['Bela', `${W2.old.Bela}`, `${W2.old.Bela} × 1/3 = ${W2.sac.Bela}`, `${W2.newShares.Bela}`],
    ['Charu', '—', `${W2.sac.Arjun} + ${W2.sac.Bela}`, `${W2.newShare}`],
    ['**Ratios**', '', `**Sacrificing ${ratioStr(W2.sacInts)}**`, `**New ${ratioStr(W2.newInts)}**`],
  ],
  `Table of worked example 2: Arjun gives up 1/5 of 5/8, that is 1/8; Bela gives up 1/3 of 3/8, also 1/8; Charu gets 1/4; the new ratio is ${ratioStr(W2.newInts)} and the sacrificing ratio ${ratioStr(W2.sacInts)}, although the old ratio was 5 : 3`,
);
const vGwFlow = flow('LR', ['Old partners give up part of future profits', 'New partner compensates them: premium for goodwill', 'Credited in the sacrificing ratio', 'No goodwill account raised (Accounting Standard 26)'], 'Flow: the old partners give up part of their future profits; the new partner compensates them with a premium for goodwill; it is credited to them in the sacrificing ratio; no goodwill account is raised because Accounting Standard 26 allows only purchased goodwill', 'Why a premium is paid');
const vGwCases = table(
  ['Situation', 'Journal entry'],
  [
    ['Premium brought in cash', 'Bank A/c Dr. To Premium for Goodwill A/c; then Premium for Goodwill A/c Dr. To sacrificing partners\' Capital A/cs'],
    ['Premium brought in kind', 'Asset A/c Dr. To Premium for Goodwill A/c and To new partner\'s Capital A/c'],
    ['Premium not brought (wholly or partly)', 'New partner\'s Capital (or Current) A/c Dr. To sacrificing partners\' Capital A/cs'],
    ['Premium withdrawn by old partners', 'Old partners\' Capital A/cs Dr. To Bank A/c'],
    ['Premium paid privately', 'No entry in the firm\'s books'],
  ],
  'Table of goodwill entries on admission: premium in cash goes through the premium for goodwill account to the sacrificing partners; premium in kind debits the asset; premium not brought debits the new partner\'s capital or current account; withdrawal debits old capitals and credits bank; a private payment needs no entry',
);
const vW3 = table(W3j.headers, W3j.rows, `Journal of worked example 3: bank debited ${inr(W3.cap + W3p)} rupees, crediting Pallavi's capital ${inr(W3.cap)} and premium for goodwill ${inr(W3p)}; then premium for goodwill debited and Neha credited ${inr(W3s.Neha)} and Omkar ${inr(W3s.Omkar)}`);
const vW4 = table(W4j.headers, W4j.rows, `Journal of worked example 4: bank debited ${inr(W4.cash)} rupees for the premium brought; then premium for goodwill ${inr(W4.cash)} and Charu's capital ${inr(W4p - W4.cash)} debited, crediting Arjun and Bela ${inr(W4s.Arjun)} rupees each`);
const vOldGw = table(
  ['Item already in the books', 'Treatment', 'Entry'],
  [
    ['Goodwill (old balance)', 'Written off in the **old ratio**', 'Old partners\' Capital A/cs Dr. To Goodwill A/c'],
    ['Premium credited, then withdrawn', 'Reduces old capitals and bank', 'Old partners\' Capital A/cs Dr. To Bank A/c'],
  ],
  'Table: goodwill already in the books is written off by debiting the old partners in the old ratio; premium withdrawn by the old partners is debited to their capital accounts and credited to bank',
);
const vHidden = flow('TB', ['New partner\'s capital ÷ his share = implied total capital', 'minus (old partners\' adjusted capitals + new partner\'s capital) = hidden goodwill', 'Hidden goodwill × new partner\'s share = his premium', 'Debit his capital (or current) account; credit sacrificing partners'], 'Flow for hidden goodwill: divide the new partner\'s capital by his share to get the implied total capital, subtract the actual capitals to get hidden goodwill, multiply by his share for his premium, and debit his capital account crediting the sacrificing partners', 'Hidden goodwill, step by step');
const vW5 = table(
  ['Step (Ganga Agencies, imagined)', 'Working', '₹'],
  [
    ['Implied total capital', `${inr(W5.cap)} ÷ ${W5r.newShare}`, inr(W5implied)],
    ['Actual capital', `${inr(W5.Ishaan)} + ${inr(W5.Jaya)} + ${inr(W5.cap)}`, inr(W5actual)],
    ['Hidden goodwill', `${inr(W5implied)} − ${inr(W5actual)}`, `**${inr(W5hg)}**`],
    ['Kabir\'s share', `${inr(W5hg)} × ${W5r.newShare}`, `**${inr(W5share)}**`],
    ['Credited 3 : 1', `Ishaan ${inr(W5s.Ishaan)}, Jaya ${inr(W5s.Jaya)}`, inr(W5share)],
  ],
  `Table of worked example 5: implied capital ${inr(W5implied)}, actual capital ${inr(W5actual)}, hidden goodwill ${inr(W5hg)}, Kabir's share ${inr(W5share)} credited to Ishaan ${inr(W5s.Ishaan)} and Jaya ${inr(W5s.Jaya)} rupees`,
  `Entry: Kabir's Capital A/c Dr. ${rs(W5share)} To Ishaan's Capital A/c ${rs(W5s.Ishaan)} and Jaya's Capital A/c ${rs(W5s.Jaya)}.`,
);
const vSummary1 = table(
  ['Idea', 'Rule'],
  [
    ['New share (old ratio case)', 'Old share × (1 − new partner\'s share)'],
    ['Sacrificing ratio', 'Old share − new share, for each old partner'],
    ['Premium for goodwill', 'Firm\'s goodwill × new partner\'s share'],
    ['Who gets the premium', 'Sacrificing partners, in the sacrificing ratio'],
    ['Premium not brought', 'Debit new partner\'s capital or current account'],
    ['Old goodwill in books', 'Write off in the old ratio'],
    ['Hidden goodwill', 'Capital ÷ share − actual total capital'],
  ],
  'Summary table of Part 1: new share in the old-ratio case, sacrificing ratio as old minus new, premium as goodwill times the new share, credited to sacrificing partners, debit to the new partner if not brought, old goodwill written off in the old ratio, and hidden goodwill from the capitals',
);

// ---------------------------------------------------------------- visuals: Part 2
const vRoute2 = flow('LR', ['Revaluation', 'Reserves and accumulated profits or losses', 'Capital accounts', 'Adjusting capitals', 'New balance sheet'], 'Route map of Part 2: revaluation, reserves and accumulated profits or losses, partners\' capital accounts, adjustment of capitals, and the new balance sheet', 'Part 2 at a glance');
const vWhyReval = flow('LR', ['Book values are out of date', 'Revalue assets, reassess liabilities', 'Gain or loss belongs to the old firm', 'Shared by old partners in the old ratio'], 'Flow: book values are out of date, so assets are revalued and liabilities reassessed; the gain or loss belongs to the old firm and is shared by the old partners in the old ratio', 'Why revalue before admission');
const vRevalFormat = table(
  ['Debit side (losses)', 'Credit side (gains)'],
  [
    ['Decrease in the value of an asset', 'Increase in the value of an asset'],
    ['Increase in a liability', 'Decrease in a liability'],
    ['Unrecorded liability brought in', 'Unrecorded asset brought in'],
    ['New or higher provision (e.g. for doubtful debts)', 'Provision no longer needed'],
    ['Balance: profit to old partners (old ratio)', 'Balance: loss to old partners (old ratio)'],
  ],
  'Table of the revaluation account format: the debit side has decreases in assets, increases in liabilities, unrecorded liabilities and new provisions, with a profit balance to the old partners; the credit side has increases in assets, decreases in liabilities and unrecorded assets, with a loss balance to the old partners',
  'Also called the profit and loss adjustment account.',
);
const vNilReval = table(NIL.reval.headers, NIL.reval.rows, `Revaluation account of Nilgiri Spices: losses on stock 6,000, provision 2,000 and outstanding rent 1,000; gains on building 30,000 and creditors 3,000; profit ${inr(NIL.reval.net)} rupees shared Rohan ${inr(NIL.reval.parts.Rohan)} and Simran ${inr(NIL.reval.parts.Simran)}`);
const vReserves = table(
  ['Item in the old balance sheet', 'Treatment (old partners, old ratio)'],
  [
    ['General reserve; credit balance of profit and loss', 'Credited to old partners\' capitals'],
    ['Debit balance of profit and loss; deferred revenue expenditure', 'Debited to old partners\' capitals'],
    ['Workmen compensation reserve', 'Claim first; balance credited (an excess claim is a revaluation loss)'],
    ['Investment fluctuation reserve', 'Fall in investments first; balance credited (an excess fall is a revaluation loss)'],
  ],
  'Table of reserves on admission: general reserve and credit profit and loss are credited to old partners in the old ratio; accumulated losses are debited; workmen compensation reserve first meets the claim and investment fluctuation reserve first meets the fall in investments, with balances credited',
);
const vW7 = table(W7j.headers, W7j.rows, `Journal of worked example 7: general reserve ${inr(W7.gr)} credited Uday ${inr(w7(W7.gr).Uday)} and Vani ${inr(w7(W7.gr).Vani)}; accumulated loss ${inr(W7.loss)} debited ${inr(w7(W7.loss).Uday)} and ${inr(w7(W7.loss).Vani)}; workmen compensation reserve ${inr(W7.wcr)} meets a claim of ${inr(W7.claim)} with the balance ${inr(W7.wcr - W7.claim)} credited 3 : 2`);
const vCapOrder = flow('TB', ['Old balances b/d', '+ revaluation profit, reserves, premium (old partners)', '− revaluation loss, accumulated losses, old goodwill written off', '+ capital brought by the new partner', '± surplus or deficit if capitals are adjusted', 'Balance c/d → new balance sheet'], 'Flow of entries in the partners\' capital accounts: opening balances, plus revaluation profit, reserves and premium for old partners, minus losses and old goodwill, plus the new partner\'s capital, plus or minus capital adjustments, and the closing balances carried to the new balance sheet', 'Order of entries in the capital accounts');
const vAdjFlow = flow('LR', ['New partner\'s capital ÷ his share = total capital', 'Total × each old partner\'s new share = required capital', 'Compare with adjusted capital', 'Surplus: withdraw or credit current account; deficit: bring cash or debit current account'], 'Flow for adjusting old partners\' capitals: divide the new partner\'s capital by his share for the total capital, multiply by each old partner\'s new share for his required capital, compare with his adjusted capital, then settle the surplus or deficit in cash or through current accounts', 'Capitals in the new ratio');
const vW8 = table(
  ['Kosi Electricals (imagined)', 'Yash', 'Zoya'],
  [
    ['New share', `${W8r.newShares.Yash}`, `${W8r.newShares.Zoya}`],
    [`Required (${inr(W8total)} × share)`, inr(W8req.Yash), inr(W8req.Zoya)],
    ['Adjusted capital', inr(W8.Yash), inr(W8.Zoya)],
    ['Surplus (−) / deficit (+)', `−${inr(-W8d.Yash)} (withdraws)`, `+${inr(W8d.Zoya)} (brings)`],
  ],
  `Table of worked example 8: total capital ${inr(W8total)}; Yash and Zoya each need ${inr(W8req.Yash)}; Yash has ${inr(W8.Yash)} and withdraws ${inr(-W8d.Yash)}; Zoya has ${inr(W8.Zoya)} and brings ${inr(W8d.Zoya)} rupees`,
  `Total capital = ${rs(W8.cap)} ÷ ${W8r.newShare} = ${rs(W8total)}.`,
);
const vChambal = table(
  ['Step (Chambal Dairy, imagined)', 'Working', '₹'],
  [
    ['Old partners\' adjusted capitals', 'given', inr(CH.old)],
    ['Their combined share in the new firm', `1 − ${CH.share} = ${CHoc}`, ''],
    ['Total capital', `${inr(CH.old)} ÷ ${CHoc}`, inr(CHtotal)],
    ['New partner Farhan\'s capital', `${inr(CHtotal)} × ${CH.share}`, `**${inr(CHcap)}**`],
  ],
  `Table: old partners' adjusted capitals of ${inr(CH.old)} rupees stand for three quarters of the new firm, so total capital is ${inr(CHtotal)} and the new partner's one-quarter capital is ${inr(CHcap)} rupees`,
);
const vNilCaps = table(NIL.caps.headers, NIL.caps.rows, `Partners' capital accounts of Nilgiri Spices: opening balances ${inr(NI.caps[0])} and ${inr(NI.caps[1])}; revaluation profit, general reserve and premium credited to Rohan and Simran; Tara credited ${inr(NIL.K)}; closing balances Rohan ${inr(NIL.caps.closing.Rohan)}, Simran ${inr(NIL.caps.closing.Simran)} and Tara ${inr(NIL.caps.closing.Tara)} rupees`);
const vNilBS = table(NIL.newBS.headers, NIL.newBS.rows, `Balance sheet of Nilgiri Spices after Tara's admission, totalling ${inr(NIL.newBS.total)} rupees: creditors, outstanding rent and the three capitals on the liabilities side; bank ${inr(NIL.bank)}, debtors net of provision, stock, furniture and building at revised values on the assets side`, 'Assets at revalued figures; bank includes everything Tara brought in.');
const vNilOld = table(NIL.oldBS.headers, NIL.oldBS.rows, `Balance sheet of Nilgiri Spices before admission, totalling ${inr(NIL.oldBS.total)} rupees: creditors, general reserve and the capitals of Rohan and Simran; bank, debtors, stock, furniture and building`);
const vSummary2 = table(
  ['Step', 'Rule'],
  [
    ['Revaluation', 'Losses Dr., gains Cr.; balance to old partners in the old ratio'],
    ['Reserves and accumulated profits', 'Credited to old partners in the old ratio'],
    ['Accumulated losses', 'Debited to old partners in the old ratio'],
    ['Special reserves', 'Meet the claim or fall first; only the balance is credited'],
    ['Adjusting capitals', 'Total = new partner\'s capital ÷ his share; required = total × new share'],
    ['New partner\'s capital from old', 'Old adjusted capitals ÷ their combined share × his share'],
    ['New balance sheet', 'Revised values; capitals from the capital accounts'],
  ],
  'Summary table of Part 2: revaluation balance to old partners in old ratio; reserves credited and losses debited in the old ratio; special reserves meet their purpose first; capitals adjusted from the new partner\'s capital or his capital found from the old partners\' capitals; the new balance sheet shows revised values',
);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Admission of a Partner — Part 1: Ratios and Goodwill',
  goals: [
    'Calculate the new profit-sharing ratio and the sacrificing ratio in every type of admission',
    'Account for goodwill under Accounting Standard 26: premium in cash or kind, partly or not brought, old goodwill written off',
    'Calculate hidden goodwill from capital contributions and pass the entry',
  ],
  slides: [
    sl('title', 'Admission of a Partner', {
      b: 'Part 1 — the **new profit-sharing ratio**, the **sacrificing ratio** and **goodwill** on admission. All firms and figures in this chapter are imagined.',
      v: vRoute1,
      n: 'A growing firm often needs fresh money, new skills or a bigger network, so it admits a new partner. The newcomer buys a share in the assets and a share in the future profits. In this first part we work out how profits will now be shared, who gives up what, and how the old partners are paid for the goodwill they built.',
    }),
    sl('concept', 'What changes when a partner joins', {
      bl: [
        'Admission creates a **new agreement**: the old firm is reconstituted.',
        'The new partner gets the right to a **share in assets** and a **share in future profits**.',
        'Before he joins, six matters are settled (see the flow).',
      ],
      v: vAdjust,
      n: 'Admission ends the old agreement and starts a new one, so the books must be put in order first. We fix the new profit-sharing ratio and the sacrificing ratio, treat goodwill, revalue assets and liabilities, distribute reserves and past profits or losses, and finally settle the capitals and draw up the new balance sheet. This part covers the first three.',
    }),
    sl('concept', 'Where does the new partner\'s share come from?', {
      v: vCases,
      n: 'The newcomer\'s share always comes out of the old partners\' shares, but the terms can differ. All old partners may give in their old ratio, each may surrender a fraction of his own share, each may give a fraction of the whole firm, one partner may give it all, or the new ratio may simply be stated. In every case, sacrifice equals old share minus new share.',
    }),
    sl('example', 'Worked example 1: share taken in the old ratio', {
      b: 'Saffron Prints, Nashik (imagined): Neha and Omkar share **3 : 2**. Pallavi joins for **1/5**, taken from both in their old ratio.',
      bl: ['Step 1 — Each old partner keeps 1 − 1/5 = 4/5 of his or her share.', 'Step 2 — Multiply, then write all shares over one denominator.'],
      v: vW1,
      n: `Pallavi takes one fifth, so the old partners keep four fifths of their own shares. Neha's three fifths times four fifths is ${fw(W1.newShares.Neha)}. Omkar's two fifths times four fifths is ${fw(W1.newShares.Omkar)}. Pallavi's one fifth is five twenty-fifths. The new ratio is ${ratioWords(W1.newInts)}, and because both gave in the old ratio, the sacrificing ratio is still three to two.`,
    }),
    sl('check', 'Quick check: one partner gives the whole share', {
      b: 'Only the giving partner\'s share falls.',
      chk: 'm_one_partner',
      n: 'Subtract the new partner\'s share from the one partner who gives it, and leave the other share untouched.',
    }),
    sl('diagram', 'Old and new shares, side by side', {
      v: vShares,
      b: 'The new partner\'s slice is cut out of the old slices.',
      n: 'Each bar stands for the whole profit of the firm. In the old firm, Neha has three fifths and Omkar two fifths. In the new firm, Pallavi\'s slice is cut out of both, in the ratio three to two, so Neha drops to twelve twenty-fifths and Omkar to eight twenty-fifths. The bars are the same length, because the shares always add up to one.',
    }),
    sl('example', 'Worked example 2: partners surrender parts of their own shares', {
      b: 'Brahmaputra Tea Traders, Guwahati (imagined): Arjun and Bela share **5 : 3**. Charu joins; Arjun surrenders **1/5 of his share** and Bela **1/3 of hers**.',
      v: vW2,
      n: `Arjun surrenders one fifth of five eighths, which is ${fw(W2.sac.Arjun)}. Bela surrenders one third of three eighths, also ${fw(W2.sac.Bela)}. Charu therefore gets ${fw(W2.newShare)}. Arjun is left with ${fw(W2.newShares.Arjun)} and Bela with ${fw(W2.newShares.Bela)}, so the new ratio is ${ratioWords(W2.newInts)}. Notice that the sacrificing ratio is one to one, not the old five to three.`,
    }),
    sl('check', 'Quick check: the sacrificing ratio formula', {
      b: 'Complete the formula.',
      chk: 'fb_sac',
      n: 'A sacrifice is what a partner gives up. Which share do you subtract from the old share?',
    }),
    sl('concept', 'Goodwill on admission and Accounting Standard 26', {
      v: vGwFlow,
      bl: ['**Premium for goodwill** = firm\'s goodwill × new partner\'s share.', 'Only **purchased goodwill** can be recorded, so goodwill is **not raised** in the books on admission.'],
      n: 'The old partners built the firm\'s reputation, and now they give up part of the profits it will earn. So the new partner pays them a premium for goodwill, equal to the firm\'s goodwill times his share. Accounting Standard twenty-six allows only purchased goodwill to be recorded, so no goodwill account is opened. The premium simply passes to the sacrificing partners.',
    }),
    sl('concept', 'Goodwill entries in each situation', {
      v: vGwCases,
      n: 'Here are the situations you will meet. Premium in cash goes through the premium for goodwill account to the sacrificing partners. Premium in kind debits the asset brought. If the newcomer cannot pay, his capital or current account is debited instead. If the old partners withdraw the premium, their capitals are debited and the bank credited. A private payment needs no entry.',
    }),
    sl('example', 'Worked example 3: premium brought in cash', {
      b: `Saffron Prints: goodwill is valued at ${rs(W3.gw)}. Pallavi (1/5) brings ${rs(W3.cap)} as capital and her premium in cash.`,
      v: vW3,
      n: `Pallavi's premium is one fifth of ${rw(W3.gw)}, that is ${rw(W3p)}. The bank receives her capital and premium together. The premium account is then closed by crediting the sacrificing partners in three to two: Neha gets ${rw(W3s.Neha)} and Omkar ${rw(W3s.Omkar)}.`,
    }),
    sl('example', 'Worked example 4: premium partly brought', {
      b: `Brahmaputra Tea Traders: goodwill is valued at ${rs(W4.gw)}. Charu (1/4) brings only ${rs(W4.cash)} of her premium.`,
      v: vW4,
      n: `Charu's full premium is one quarter of ${rw(W4.gw)}, which is ${rw(W4p)}. She brings only ${rw(W4.cash)}. The old partners must still receive the full amount in their sacrificing ratio of one to one, ${rw(W4s.Arjun)} each, so the unpaid ${rw(W4p - W4.cash)} is debited to Charu's capital account in the same entry.`,
    }),
    sl('check', 'Quick check: premium not brought', {
      b: 'Who is debited, and who is credited?',
      chk: 'm_not_brought',
      n: 'The newcomer still owes the compensation. Which account carries that charge?',
    }),
    sl('concept', 'Goodwill already in the books, and withdrawals', {
      v: vOldGw,
      bl: ['Old goodwill is written off **before** the new arrangement, in the **old ratio**.', 'A withdrawal of premium leaves the firm with less cash and the old partners with smaller capitals.'],
      n: 'Sometimes the old balance sheet already shows goodwill. It belongs to the old firm, so it is written off among the old partners in their old ratio before anything else. And if the old partners take the premium out of the business, we debit their capital accounts and credit the bank.',
    }),
    sl('concept', 'Hidden goodwill', {
      v: vHidden,
      b: 'When no premium is mentioned, the new partner\'s **capital** can reveal the firm\'s goodwill.',
      n: 'Sometimes nothing is said about goodwill, but the new partner agrees to bring a capital that is large for his share. Divide his capital by his share to get the total capital the firm is worth to him. Subtract the capitals actually in the new firm. The difference is hidden goodwill. His share of it is debited to his capital and credited to the sacrificing partners.',
    }),
    sl('example', 'Worked example 5: hidden goodwill', {
      b: `Ganga Agencies, Varanasi (imagined): Ishaan and Jaya share **3 : 1**; capitals after adjustments ${rs(W5.Ishaan)} and ${rs(W5.Jaya)}. Kabir joins for **1/4** with ${rs(W5.cap)}, no premium.`,
      v: vW5,
      n: `Kabir's ${rw(W5.cap)} for one quarter values the capital at ${rw(W5implied)}. The capitals actually in the firm are ${rw(W5.Ishaan)} plus ${rw(W5.Jaya)} plus his own ${rw(W5.cap)}, a total of ${rw(W5actual)}. So hidden goodwill is ${rw(W5hg)}, and Kabir's quarter, ${rw(W5share)}, is debited to him and credited to Ishaan and Jaya in three to one.`,
    }),
    sl('check', 'Quick check: hidden goodwill', {
      b: 'Implied capital, minus actual capital, times the new share.',
      chk: 'n_hidden',
      n: 'Follow the three steps on the flow and give your answer in rupees.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up: the new partner\'s share comes out of the old partners\' shares, and each sacrifice is old share minus new share. The premium for goodwill equals the firm\'s goodwill times the new share and goes to the sacrificing partners. If it is not brought, the newcomer\'s capital is charged. Old goodwill is written off in the old ratio, and hidden goodwill is read from the capitals.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Always **show the sacrificing ratio** before passing goodwill entries; do not assume it equals the old ratio.',
        'Read the wording: a fraction **of his share** is multiplied; a fraction **of the firm** is subtracted directly.',
        'Check that the new shares **add up to one**.',
        'Write a short **narration** under every journal entry; partial marks depend on it.',
        'Never open a **goodwill account** for the premium or for hidden goodwill.',
      ],
      n: 'A few exam habits will save marks. Work out the sacrificing ratio explicitly, because it is often not the old ratio. Read carefully whether a partner gives a fraction of his own share or of the whole firm. Check that all new shares add up to one. Write a narration under each entry, and never raise a goodwill account on admission.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Admission of a Partner — Part 2: Revaluation, Reserves, Capitals and the New Balance Sheet',
  goals: [
    'Prepare the revaluation account and share its result among the old partners',
    'Distribute reserves and accumulated profits or losses on admission',
    'Adjust capitals on the basis of the new partner\'s capital (or find his capital from the old capitals) and prepare the new balance sheet',
  ],
  slides: [
    sl('title', 'Revaluation, reserves and the new balance sheet', {
      b: 'Part 2 — **revaluation**, **reserves**, the **capital accounts**, adjusting **capitals** and the **new balance sheet**.',
      v: vRoute2,
      n: 'In the first part we settled ratios and goodwill. Now we bring the books up to date before the new partner steps in. We revalue assets and liabilities, hand out reserves and past profits or losses to the old partners, adjust the capitals, and finish with the balance sheet of the new firm, all with one imagined spice firm from Kochi.',
    }),
    sl('concept', 'Why revalue before admission?', {
      v: vWhyReval,
      bl: ['Book values may be **out of date**: buildings rise, stock loses value, liabilities are missed.', 'Gains and losses up to admission belong to the **old partners**, in the **old ratio**.'],
      n: 'Books show assets at historical figures, which may be far from their real worth on the day of admission. A building may have risen in value, some stock may be damaged, and an expense may be unpaid. If we ignore these, the new partner would share gains or losses that arose before he joined. So we revalue first and give the result to the old partners.',
    }),
    sl('two-column', 'The revaluation account', {
      cols: [
        '**Debit (losses)**\n\n- Fall in an asset\n- Rise in a liability\n- Unrecorded liability\n- New provision',
        '**Credit (gains)**\n\n- Rise in an asset\n- Fall in a liability\n- Unrecorded asset\n- Provision released',
      ],
      v: vRevalFormat,
      n: 'The revaluation account works like a small profit and loss account. Anything that reduces the firm\'s net worth goes on the debit side: a fall in an asset, a rise in a liability, an unrecorded liability, or a new provision. Anything that increases it goes on the credit side. The balance is a profit or a loss for the old partners in their old ratio.',
    }),
    sl('example', 'Worked example 6: revaluation account', {
      b: `Nilgiri Spices, Kochi (imagined): Rohan and Simran share **2 : 1**. On Tara's admission: stock falls by ${rs(NI.stock)}; building rises by ${rs(NI.building)}; a 5% provision is made on debtors of ${rs(NI.debtors)}; rent of ${rs(NI.rent)} is outstanding; ${rs(NI.cred)} of creditors will not be claimed.`,
      v: vNilReval,
      n: `Put the losses on the debit side: stock ${words(NI.stock)}, the provision ${words(NI.prov)} and the rent ${words(NI.rent)}. Put the gains on the credit side: building ${words(NI.building)} and creditors ${words(NI.cred)}. The credit side is bigger by ${rw(NIL.reval.net)}, a profit. Rohan takes two thirds, ${rw(NIL.reval.parts.Rohan)}, and Simran one third, ${rw(NIL.reval.parts.Simran)}.`,
    }),
    sl('check', 'Quick check: who shares the revaluation profit?', {
      b: 'Think about when the change in value happened.',
      chk: 'tf_reval_new',
      n: 'Did the change in value happen before or after the new partner joined?',
    }),
    sl('concept', 'Reserves and accumulated profits or losses', {
      v: vReserves,
      n: 'Reserves and undistributed profits were earned by the old partners, so they are credited to them in the old ratio. Accumulated losses, such as a debit balance in profit and loss, are debited to them the same way. Special reserves first do their own job: workmen compensation reserve meets the claim, and investment fluctuation reserve meets the fall in investments. Only the balance is shared.',
    }),
    sl('example', 'Worked example 7: reserves at admission', {
      b: `Tapti Textiles, Surat (imagined): Uday and Vani share **3 : 2**. At Wasim's admission: general reserve ${rs(W7.gr)}; debit balance of profit and loss ${rs(W7.loss)}; workmen compensation reserve ${rs(W7.wcr)} against a claim of ${rs(W7.claim)}.`,
      v: vW7,
      n: `The general reserve of ${rw(W7.gr)} is credited three to two, ${rw(w7(W7.gr).Uday)} and ${rw(w7(W7.gr).Vani)}. The accumulated loss of ${rw(W7.loss)} is debited the same way. The workmen compensation reserve first covers the claim of ${rw(W7.claim)}, and only the balance of ${rw(W7.wcr - W7.claim)} goes to Uday and Vani.`,
    }),
    sl('check', 'Quick check: an accumulated loss', {
      b: 'A debit balance of profit and loss is a past loss.',
      chk: 'm_accum_loss',
      n: 'Whose loss is it, and in which ratio is it shared?',
    }),
    sl('concept', 'The partners\' capital accounts', {
      v: vCapOrder,
      b: 'Prepare them in **columnar form**, one column per partner, including the new partner.',
      n: 'All these adjustments meet in the partners\' capital accounts, kept in columnar form. Start with the opening balances. Credit the old partners with revaluation profit, reserves and premium; debit them with losses and old goodwill. Credit the new partner with the capital he brings. Any capital adjustment comes last, and the closing balances go to the new balance sheet.',
    }),
    sl('concept', 'Adjusting old partners\' capitals', {
      v: vAdjFlow,
      bl: ['**Total capital** = new partner\'s capital ÷ his share.', '**Required capital** of an old partner = total capital × his new share.', 'Surplus: withdrawn in cash or credited to his **current account**; deficit: brought in cash or debited to his current account.'],
      n: 'Partners often agree that capitals should be in the new profit-sharing ratio. Take the new partner\'s capital as the base and divide it by his share to get the total capital. Multiply by each old partner\'s new share to find what he should have. Compare this with his adjusted capital, then settle the surplus or the shortage in cash or through current accounts.',
    }),
    sl('example', 'Worked example 8: capitals made proportionate', {
      b: `Kosi Electricals, Patna (imagined): Yash and Zoya share equally. Amaan joins for **1/5** (old ratio) with ${rs(W8.cap)}. Adjusted capitals: Yash ${rs(W8.Yash)}, Zoya ${rs(W8.Zoya)}. Differences are settled in cash.`,
      v: vW8,
      n: `Amaan's ${rw(W8.cap)} for one fifth means a total capital of ${rw(W8total)}. The new ratio is two to two to one, so Yash and Zoya each need two fifths, ${rw(W8req.Yash)}. Yash has ${rw(-W8d.Yash)} too much and withdraws it; Zoya is ${rw(W8d.Zoya)} short and brings it in.`,
    }),
    sl('check', 'Quick check: total capital', {
      b: 'Start from the new partner\'s capital and his share.',
      chk: 'm_total_cap',
      n: 'Divide the new partner\'s capital by his share of profit.',
    }),
    sl('concept', 'Or: the new partner\'s capital from the old capitals', {
      v: vChambal,
      b: 'Sometimes the **old partners\' capitals** are the base and the **new partner\'s capital** is the unknown.',
      n: `Sometimes it works the other way round. The old partners' adjusted capitals are taken as the base. Together they hold three quarters of the new firm, so ${rw(CH.old)} stands for three quarters, and the whole capital is ${rw(CHtotal)}. The new partner, with one quarter, brings ${rw(CHcap)}. Always finish every adjustment to the old capitals first.`,
    }),
    sl('example', 'Worked example 9: the full admission, starting point', {
      b: `Nilgiri Spices again. Tara joins for **1/4** (old ratio, so the new ratio is ${ratioStr(NIL.R.newInts)}), bringing ${rs(NIL.K)} as capital and ${rs(NIL.premium)} as premium (goodwill ${rs(NI.gw)}). Revaluation as in worked example 6.`,
      v: vNilOld,
      n: `Here is the balance sheet of Nilgiri Spices just before Tara joins. Note the general reserve of ${rw(NI.gr)}: it belongs to Rohan and Simran. Tara takes one quarter in the old ratio, so the new ratio is ${ratioWords(NIL.R.newInts)} and the sacrificing ratio is two to one. She brings ${rw(NIL.K)} as capital and ${rw(NIL.premium)} as premium.`,
    }),
    sl('example', 'Worked example 9 (continued): capital accounts', {
      b: `Credits to the old partners: revaluation profit, general reserve (2 : 1) and premium (sacrificing ratio 2 : 1).`,
      v: vNilCaps,
      n: `Rohan and Simran each receive three credits: the revaluation profit, the general reserve in two to one, and the premium of ${rw(NIL.premium)} in their sacrificing ratio, also two to one. Tara is credited with her capital. The closing balances are ${rw(NIL.caps.closing.Rohan)} for Rohan, ${rw(NIL.caps.closing.Simran)} for Simran and ${rw(NIL.caps.closing.Tara)} for Tara.`,
    }),
    sl('example', 'Worked example 9 (continued): balance sheet of the new firm', {
      b: 'Revised values on both sides; capitals from the capital accounts; bank increased by everything Tara brought.',
      v: vNilBS,
      n: `The new balance sheet shows creditors reduced by ${words(NI.cred)}, the outstanding rent as a new liability, and the three closing capitals. On the assets side, the bank now holds ${rw(NIL.bank)}, debtors are shown net of the provision, stock and building appear at revised values. Both sides total ${rw(NIL.newBS.total)}, which is our final check.`,
    }),
    sl('check', 'Quick check: the new balance sheet', {
      b: 'Which values appear in it?',
      chk: 'tf_bs_reval',
      n: 'Think about what the revaluation entries do to the asset and liability accounts.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up: revaluation gains and losses, reserves and accumulated profits or losses all belong to the old partners in the old ratio. They flow into the capital accounts together with the premium and the new partner\'s capital. Capitals can then be adjusted to the new ratio, and the new balance sheet shows revised values and closing capitals.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Mark split in a six-mark problem: about **2** for the revaluation account, **2** for capital accounts, **2** for the balance sheet.',
        'Show **working notes** for the new ratio, premium, provision and any capital adjustment.',
        'Reserves never go to the revaluation account; they go **straight to capitals**.',
        'Do every adjustment to the old capitals **before** comparing them with required capitals.',
        'If the balance sheet does not tally, check the **bank** figure first.',
      ],
      n: 'In a six-mark problem, marks are usually spread over the revaluation account, the capital accounts and the balance sheet, so attempt all three. Show working notes. Remember that reserves go straight to capitals, not through revaluation. Complete every adjustment before comparing capitals. And if your balance sheet does not agree, check the bank balance first.',
    }),
  ],
});

// Narration house rules on top of lib.mjs: no digits, no rupee sign, no slashes or ampersands, no capitals runs.
for (const d of [part1, part2])
  for (const s of d.slides) {
    const m = /\d|₹|[\/&%]|\b[A-Z]{2,}\b/.exec(s.narration);
    check(!m, `narration of part ${d.part} ${s.id} has "${m?.[0]}"`);
  }

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Admission of a Partner — Notes',
  sections: [
    {
      h: '1. Admission and the adjustments it needs',
      t: [1, 3],
      b: 'A new partner may be admitted with the consent of all existing partners (unless the deed says otherwise). Admission **reconstitutes** the firm: the old agreement ends and a new one begins. The new partner acquires two rights: a **share in the assets** and a **share in the future profits** of the firm.\n\n**Matters to settle on admission**\n1. New profit-sharing ratio.\n2. Sacrificing ratio.\n3. Goodwill (premium, or adjustment through capitals).\n4. Revaluation of assets and reassessment of liabilities.\n5. Reserves and accumulated profits or losses.\n6. Capitals (and, if agreed, their adjustment) and the new balance sheet.',
      terms: [
        ['Admission of a partner', 'Entry of a new partner into an existing firm, which reconstitutes the firm.'],
        ['Reconstitution', 'A change in the agreement among partners while the firm continues.'],
      ],
      v: vAdjust,
    },
    {
      h: '2. New profit-sharing ratio and sacrificing ratio',
      t: 1,
      b: '**Sacrifice of an old partner = old share − new share.** The sacrificing ratio is the ratio of these sacrifices.\n\n| Terms of admission | How to compute |\n|---|---|\n| Share taken in the old ratio | New share = old share × (1 − new partner\'s share); sacrificing ratio = old ratio |\n| Fraction **of his own share** surrendered | Sacrifice = old share × fraction |\n| Fraction **of the firm** given | Sacrifice = that fraction |\n| One partner gives the whole share | Only his share falls |\n| New ratio given | Sacrifice = old − new for each |\n\nAlways check that the new shares add up to 1, and that the sacrifices add up to the new partner\'s share.',
      terms: [
        ['Sacrificing ratio', 'Ratio in which the old partners give up their shares of profit in favour of the new partner.'],
        ['New profit-sharing ratio', 'Ratio in which all partners, including the new one, share future profits.'],
      ],
      v: vCases,
      vs: [vW1, vShares, vW2],
    },
    {
      h: '3. Goodwill on admission (Accounting Standard 26)',
      t: 2,
      b: '**Premium for goodwill = firm\'s goodwill × new partner\'s share.** It is credited to the **sacrificing partners in the sacrificing ratio**. Accounting Standard 26 allows only purchased goodwill to be recorded, so **no goodwill account** is raised on admission.\n\n- **In cash:** Bank A/c Dr. To Premium for Goodwill A/c; Premium for Goodwill A/c Dr. To sacrificing partners\' Capital A/cs.\n- **In kind:** Asset A/c Dr. To Premium for Goodwill A/c and To new partner\'s Capital A/c.\n- **Partly or not brought:** New partner\'s Capital (or Current) A/c Dr. (unpaid part) To sacrificing partners\' Capital A/cs.\n- **Withdrawn by old partners:** Old partners\' Capital A/cs Dr. To Bank A/c.\n- **Paid privately:** no entry.\n- **Goodwill already in the books:** written off in the **old ratio** — Old partners\' Capital A/cs Dr. To Goodwill A/c.',
      terms: [
        ['Premium for goodwill', 'Amount brought by the new partner to compensate the old partners for their sacrifice.'],
        ['Purchased goodwill', 'Goodwill acquired for a consideration; the only goodwill that may be recorded under Accounting Standard 26.'],
      ],
      v: vGwCases,
      vs: [vGwFlow, vW3, vW4],
    },
    {
      h: '4. Hidden goodwill',
      t: 2,
      b: 'When no premium is stated but the new partner brings a capital that is high for his share:\n\n1. **Implied total capital** = new partner\'s capital ÷ his share.\n2. **Actual capital** = old partners\' capitals **after all adjustments** + new partner\'s capital.\n3. **Hidden goodwill** = implied − actual.\n4. **New partner\'s share** = hidden goodwill × his share: New partner\'s Capital (or Current) A/c Dr. To sacrificing partners\' Capital A/cs.',
      terms: [['Hidden goodwill', 'Goodwill not stated in the terms but inferred from the capital brought by the new partner.']],
      v: vHidden,
      vs: [vW5],
    },
    {
      h: '5. Revaluation of assets and reassessment of liabilities',
      t: 3,
      b: 'A **revaluation account** (profit and loss adjustment account) records changes in values at admission.\n\n- **Debit:** decrease in assets, increase in liabilities, unrecorded liabilities, new provisions.\n- **Credit:** increase in assets, decrease in liabilities, unrecorded assets, provisions no longer needed.\n- **Balance:** profit (credit to old partners) or loss (debit to old partners) in the **old ratio**.\n\nTypical entries: Revaluation A/c Dr. To Stock A/c (fall); Building A/c Dr. To Revaluation A/c (rise); Revaluation A/c Dr. To Old partners\' Capital A/cs (profit).',
      terms: [
        ['Revaluation account', 'Nominal account recording gains and losses from revaluing assets and liabilities on reconstitution.'],
        ['Unrecorded asset or liability', 'An item omitted from the books and brought in at the time of admission.'],
      ],
      v: vRevalFormat,
      vs: [vWhyReval, vNilReval],
    },
    {
      h: '6. Reserves and accumulated profits or losses',
      t: 3,
      b: 'Reserves and accumulated profits belong to the old partners and are shared in the **old ratio**:\n\n- **General reserve / credit balance of profit and loss:** Reserve A/c Dr. To Old partners\' Capital A/cs.\n- **Debit balance of profit and loss, deferred revenue expenditure (e.g. advertisement suspense):** Old partners\' Capital A/cs Dr. To the account.\n- **Workmen compensation reserve:** meets the claim first; the balance is credited to old partners; an excess claim is debited to revaluation.\n- **Investment fluctuation reserve:** meets the fall in investments first; the balance is credited to old partners; an excess fall is debited to revaluation.',
      terms: [
        ['Accumulated profits', 'Profits earned before admission and kept in the business as reserves or as a credit balance.'],
        ['Workmen compensation reserve', 'Reserve kept for claims of workers for injury; on admission it first meets any claim.'],
        ['Investment fluctuation reserve', 'Reserve kept against a fall in the market value of investments.'],
      ],
      v: vReserves,
      vs: [vW7],
    },
    {
      h: '7. Capitals and the new balance sheet',
      t: 4,
      b: '**Capital accounts** are prepared in columnar form for all partners; closing balances go to the new balance sheet.\n\n**Old partners\' capitals on the basis of the new partner\'s capital**\n- Total capital = new partner\'s capital ÷ his share.\n- Required capital of each old partner = total capital × his new share.\n- Surplus → withdrawn (Capital A/c Dr. To Bank A/c) or credited to his current account; deficit → brought in (Bank A/c Dr. To Capital A/c) or debited to his current account.\n\n**New partner\'s capital on the basis of the old partners\' capitals**\n- Total capital = old partners\' adjusted capitals ÷ their combined new share; new partner\'s capital = total capital × his share.\n\n**New balance sheet:** assets and liabilities at revised values, unrecorded items added, reserves removed, closing capitals (and any current accounts) shown.',
      terms: [
        ['Current account', 'A partner\'s account for adjustments other than fixed capital; used to settle surpluses and deficits without cash.'],
        ['Proportionate capital', 'Capital in the same proportion as the profit-sharing ratio.'],
      ],
      v: vAdjFlow,
      vs: [vW8, vChambal, vNilOld, vNilCaps, vNilBS],
    },
  ],
  tips: '**Common mistakes**\n- Crediting the premium in the **old ratio** when the sacrificing ratio is different.\n- Multiplying when a partner gives a fraction **of the firm**, or subtracting when he surrenders a fraction **of his own share**.\n- Giving the new partner a share of revaluation profit or reserves.\n- Opening a goodwill account for premium or hidden goodwill.\n- Comparing capitals before **all** adjustments (revaluation, reserves, premium) are made.\n- Forgetting to add the new partner\'s cash (capital and premium) to the bank in the new balance sheet.\n\n**How marks are usually awarded**\n- 1 mark: objective items.\n- 3 marks: a ratio calculation with steps, or two or three journal entries with narrations.\n- 4 marks: entries for two cases, or a revaluation account with capital accounts.\n- 6 marks: revaluation account (about 2), capital accounts (about 2), new balance sheet (about 2); working notes earn step marks.\n\n**Figures in SOYL practice** are imagined; your board paper will give its own.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['Two rights of a new partner', 'A share in the **assets** and a share in the **future profits** of the firm.', 'concept', 1],
  ['Six matters settled on admission', 'New ratio; sacrificing ratio; goodwill; revaluation; reserves and accumulated profits or losses; capitals and the new balance sheet.', 'concept', 1],
  ['**Sacrificing ratio**', 'Ratio in which old partners give up their shares: **old share − new share**.', 'definition', 1],
  ['New share when the newcomer takes his share in the old ratio', 'Old share × (1 − new partner\'s share).', 'fact', 1],
  ['Fraction **of his own share** surrendered', 'Sacrifice = old share × the fraction.', 'exam-tip', 1],
  ['Fraction **of the firm** given', 'Sacrifice = that fraction; subtract it directly.', 'exam-tip', 1],
  ['When does the sacrificing ratio equal the old ratio?', 'When the new partner takes his share from the old partners **in their old ratio**.', 'concept', 1],
  ['A quick check on any new ratio', 'All new shares add to **1**; the sacrifices add to the **new partner\'s share**.', 'exam-tip', 1],
  ['**Premium for goodwill**', 'Firm\'s goodwill × new partner\'s share; compensation for the old partners\' sacrifice.', 'definition', 2],
  ['Premium is credited to…', 'The **sacrificing partners**, in the **sacrificing ratio**.', 'fact', 2],
  ['Accounting Standard 26 and admission', 'Only **purchased goodwill** is recorded, so no goodwill account is raised on admission.', 'concept', 2],
  ['Premium not brought in cash', 'New partner\'s Capital (or Current) A/c Dr. To sacrificing partners\' Capital A/cs.', 'fact', 2],
  ['Premium brought in kind', 'Asset A/c Dr. To Premium for Goodwill A/c and To new partner\'s Capital A/c.', 'fact', 2],
  ['Premium withdrawn by old partners', 'Old partners\' Capital A/cs Dr. To Bank A/c.', 'fact', 2],
  ['Premium paid privately', '**No entry** in the firm\'s books.', 'exam-tip', 2],
  ['Goodwill already in the books', 'Written off among **old partners** in the **old ratio**.', 'fact', 2],
  ['**Hidden goodwill**', 'New partner\'s capital ÷ his share − (old adjusted capitals + new partner\'s capital).', 'definition', 2],
  ['Purpose of revaluation', 'So the new partner neither gains nor loses from value changes before he joined.', 'concept', 3],
  ['Revaluation account: debit side', 'Fall in assets, rise in liabilities, unrecorded liabilities, new provisions.', 'fact', 3],
  ['Revaluation account: credit side', 'Rise in assets, fall in liabilities, unrecorded assets, provisions released.', 'fact', 3],
  ['Revaluation profit or loss goes to…', 'Old partners in the **old ratio**.', 'fact', 3],
  ['General reserve on admission', 'Credited to old partners\' capitals in the **old ratio**.', 'fact', 3],
  ['Debit balance of profit and loss on admission', 'Debited to old partners\' capitals in the **old ratio**.', 'fact', 3],
  ['Workmen compensation reserve with a claim', 'Claim met first; balance to old partners; an **excess claim** is a revaluation loss.', 'concept', 3],
  ['Investment fluctuation reserve with a fall in investments', 'Fall met first; balance to old partners; an **excess fall** is a revaluation loss.', 'concept', 3],
  ['Total capital from the new partner\'s capital', 'New partner\'s capital ÷ his share.', 'fact', 4],
  ['Required capital of an old partner', 'Total capital × his **new** share.', 'fact', 4],
  ['Surplus capital of an old partner', 'Withdrawn in cash (Capital Dr. To Bank) or credited to his current account.', 'fact', 4],
  ['New partner\'s capital from the old partners\' capitals', 'Old adjusted capitals ÷ their combined new share × new partner\'s share.', 'fact', 4],
  ['New balance sheet after admission', 'Revised values, reserves removed, closing capitals (and current accounts) shown.', 'concept', 4],
  ['Six-mark admission problem: mark split', 'About 2 revaluation account, 2 capital accounts, 2 balance sheet.', 'exam-tip', 4],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-12-accountancy-chapter-test-short',
  title: 'Chapter test (short) — Admission of a Partner',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_newratio_prop', 'm_premium_ratio', 'm_reval_dr', 'ar_premium_sac'] },
    { id: 'B', title: 'Section B — Short answer (3 marks each)', instr: 'Show your working and write narrations under journal entries.', items: ['s3_newratio', 's3_reserves'] },
    { id: 'C', title: 'Section C — Long answer (4 marks)', instr: 'Answer any ONE of the two questions.', items: [{ attempt: 1, keys: ['l4_gw_cases', 'l4_reval'] }] },
    { id: 'D', title: 'Section D — Long answer (6 marks)', instr: 'Answer any ONE of the two questions. Show working notes.', items: [{ attempt: 1, keys: ['l6_cash_reval', 'l6_hidden'] }] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-12-accountancy-chapter-test-long',
  title: 'Chapter test (long) — Admission of a Partner',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–8 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_given_new', 'm_kind', 'm_hidden', 'm_wcr', 'm_ifr', 'm_newcap_from_old', 'ar_selfgen', 'ar_reval_old'] },
    { id: 'B', title: 'Section B — Short answer (3 marks each)', instr: 'Answer questions 9–11 and any ONE of questions 12 and 13. Show your working.', items: ['s3_premium_part', 's3_hidden', 's3_cap_adj', { attempt: 1, keys: ['s3_newratio2', 's3_kind'] }] },
    { id: 'C', title: 'Section C — Long answer (4 marks each)', instr: 'Answer question 14 and any ONE of questions 15 and 16.', items: ['l4_ratio_premium', { attempt: 1, keys: ['l4_gw_existing', 'l4_cap_adj'] }] },
    { id: 'D', title: 'Section D — Long answer (6 marks each)', instr: 'Answer question 17 and any ONE of questions 18 and 19. Show working notes.', items: ['l6_existing_partly', { attempt: 1, keys: ['l6_proportionate', 'l6_adjust_cash'] }] },
  ],
});

// Deck checks never appear in the tests.
const inTests = new Set([T_SHORT, T_LONG].flatMap((t) => t.sections.flatMap((s) => s.items.map((i) => i.question_id))));
for (const d of [part1, part2]) for (const s of d.slides) if (s.check_question_id) check(!inTests.has(s.check_question_id), `deck check ${s.check_question_id} is also in a test`);

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t04 of cbse-12-accountancy-ch03 only (new and sacrificing ratios; goodwill on admission per Accounting Standard 26 including hidden goodwill; revaluation, reserves and accumulated profits or losses; adjustment of capitals and the new balance sheet)',
    originality: 'every firm, person and figure is imagined and labelled as such; no NCERT illustration or exercise and no CBSE sample or past-paper item is reused',
    data: 'every ratio, share, premium, revaluation result, capital and balance sheet is computed by acc.mjs and asserted: journal entries balance, ledger accounts and balance sheets total, shares divide into whole rupees, bank never overdrawn',
    accounting: 'premium credited in the sacrificing ratio; revaluation, reserves and accumulated losses to old partners in the old ratio; special reserves meet the claim or fall first; no goodwill account raised (Accounting Standard 26)',
    gate: 'schema, content lint (lintExemplar) and the deterministic verify checks run clean on this chapter',
  },
});
