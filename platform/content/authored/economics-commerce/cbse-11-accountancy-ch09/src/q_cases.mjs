// Case-based items (4 marks: 1 + 1 + 2, part (c) with an either/or), all on imagined businesses. Topic t01.
import { mcq, short, caseQ, child } from '../../cbse-11-accountancy-ch01/src/lib.mjs';
import { same, inr, rs, mdTable, pctOf, commissionOn, debtsCalc } from './figures.mjs';
import { QQ } from './qq.mjs';

// ---------------------------------------------------------------- Jyoti Dairy: outstanding, prepaid, accrued items
{
  const rent = 30000, rpre = 2500, wag = 54000, wout = 4500, intr = 6000, iadv = 1500;
  const wv = same(wag + wout, 58500, 'Jyoti Dairy wages');
  const rv = same(rent - rpre, 27500, 'Jyoti Dairy rent');
  const iv = same(intr - iadv, 4500, 'Jyoti Dairy interest');
  QQ('cb_accrual', caseQ({
    t: 1, d: 3, c: 'application', origin: 'soyl-original',
    stem: 'Read the passage on Jyoti Dairy and its year-end items and answer the questions that follow.',
    passage: `**Jyoti Dairy (imagined)**\n\nJyoti Dairy, an imagined firm in the imagined town of Kishanpur, closes its books on 31 March 2026. Its trial balance shows rent paid ${rs(rent)}, wages paid ${rs(wag)} and interest received ${rs(intr)}. The rent includes ${rs(rpre)} for April 2026. Wages for March 2026 of ${rs(wout)} are still to be paid. The interest received includes ${rs(iadv)} that belongs to the next year.`,
    parts: [
      child('a', mcq({ t: 1, d: 2, c: 'understanding', stem: `The ${rs(rpre)} of rent that belongs to April 2026 is shown in the Balance Sheet as`, opts: ['a current asset, prepaid rent', 'a current liability, outstanding rent', 'a fixed asset', 'a deduction from capital'], sol: 'Rent paid for a period after the year end is a benefit the firm has paid for and not used, so it is a current asset. An outstanding expense would be a liability, and a prepayment is neither a fixed asset nor a deduction from capital.' })),
      child('b', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'Find the wages to be debited to the Trading Account for the year.', model: `${inr(wag)} + ${inr(wout)} = **${rs(wv)}**.`, sol: 'Wages paid plus wages outstanding.', scheme: [[`${rs(wv)}`, 1]] })),
      child('c', short({ t: 1, d: 3, c: 'application', marks: 2, stem: '**Either** (i): Find the rent charged to the Profit and Loss Account and the interest credited to it, and name the Balance Sheet item for each adjustment.', model: `Rent charged = ${inr(rent)} − ${inr(rpre)} = **${rs(rv)}**; the ${rs(rpre)} is a current asset. Interest credited = ${inr(intr)} − ${inr(iadv)} = **${rs(iv)}**; the ${rs(iadv)} is a current liability, income received in advance.`, sol: 'Deduct the prepaid rent and the interest of the next year.', scheme: [[`Rent ${rs(rv)} with prepaid rent as an asset`, 1], [`Interest ${rs(iv)} with income in advance as a liability`, 1]] }), [
        short({ t: 1, d: 4, c: 'analysis', marks: 2, stem: `**Or** (ii): The accountant ignored the outstanding wages. By how much is the net profit of Jyoti Dairy overstated, and which item is missing from the Balance Sheet?`, model: `The wages of the year are ${rs(wout)} higher than recorded, so the net profit is overstated by **${rs(wout)}**. The outstanding wages of ${rs(wout)} are missing from the current liabilities.`, sol: 'An unrecorded expense overstates profit and omits a liability.', scheme: [[`Profit overstated by ${rs(wout)}`, 1], ['Outstanding wages missing from current liabilities', 1]] }),
      ]),
    ],
  }));
}

// ---------------------------------------------------------------- Karan Kirana: bad debts and provision
{
  const D = debtsCalc({ debtors: 90000, bdTB: 1500, further: 3000, oldPdd: 2500, pddPct: 4 });
  same(D.after, 87000, 'Karan Kirana debtors after further bad debts');
  same(D.charge, 5480, 'Karan Kirana charge');
  same(D.net, 83520, 'Karan Kirana net debtors');
  QQ('cb_debts', caseQ({
    t: 1, d: 4, c: 'application', origin: 'soyl-original',
    stem: 'Read the passage on Karan Kirana and its debtors at the end of the year and answer the questions that follow.',
    passage: `**Karan Kirana (imagined)**\n\nKaran Kirana, an imagined grocery wholesaler in the imagined town of Shyampur, shows in its trial balance on 31 March 2026 debtors of ${rs(D.debtors)}, bad debts of ${rs(D.bdTB)} and a provision for doubtful debts of ${rs(D.oldPdd)}. At the year end it finds that debts of ${rs(D.further)} are bad and must be written off, and it decides to keep a provision for doubtful debts of ${D.pddPct} per cent on the debtors that remain.`,
    parts: [
      child('a', mcq({ t: 1, d: 3, c: 'application', stem: 'The new provision for doubtful debts is calculated on', opts: [rs(D.after), rs(D.debtors), rs(D.debtors + D.further), rs(D.oldPdd)], sol: `The provision is worked out on the debtors after the further bad debts: ${inr(D.debtors)} − ${inr(D.further)} = ${inr(D.after)}. The full debtors include debts that are being written off, and the old provision is not a base for the new one.` })),
      child('b', short({ t: 1, d: 3, c: 'application', marks: 1, stem: 'Find the amount charged to the Profit and Loss Account for bad debts and the provision.', model: `New provision = ${D.pddPct} per cent of ${inr(D.after)} = ${inr(D.newPdd)}. Charge = ${inr(D.bdTB)} + ${inr(D.further)} + ${inr(D.newPdd)} − ${inr(D.oldPdd)} = **${rs(D.charge)}**.`, sol: 'Bad debts, further bad debts and new provision less the old provision.', scheme: [[`${rs(D.charge)}`, 1]] })),
      child('c', short({ t: 1, d: 4, c: 'application', marks: 2, stem: '**Either** (i): Show how the debtors appear in the Balance Sheet of Karan Kirana.', model: `Debtors ${inr(D.debtors)} less further bad debts ${inr(D.further)} less provision for doubtful debts ${inr(D.newPdd)} = **${rs(D.net)}**.`, sol: 'Debtors are shown less the further bad debts and the new provision.', scheme: [['Further bad debts and provision deducted', 1], [`Debtors shown at ${rs(D.net)}`, 1]] }), [
        short({ t: 1, d: 4, c: 'application', marks: 2, stem: '**Or** (ii): Prepare the Provision for Doubtful Debts Account of Karan Kirana.', model: D.pddLedger.md, sol: 'Old provision and the charge on the credit side; bad debts and the new provision on the debit side.', scheme: [['Opening provision and the transfer from the Profit and Loss Account', 1], ['Bad debts and balance c/d on the debit side; totals agree', 1]] }),
      ]),
    ],
  }));
}

// ---------------------------------------------------------------- Lata Lighting: manager's commission
{
  const np = 121000, p = 10;
  const ca = same(commissionOn(np, p, 'after'), 11000, 'Lata Lighting commission after');
  const cb = same(commissionOn(np, p, 'before'), 12100, 'Lata Lighting commission before');
  QQ('cb_comm', caseQ({
    t: 1, d: 4, c: 'application', origin: 'soyl-original',
    stem: 'Read the passage on Lata Lighting and its manager\'s commission and answer the questions that follow.',
    passage: `**Lata Lighting (imagined)**\n\nLata Lighting, an imagined lamp shop in the imagined town of Madhupur, has a net profit of ${rs(np)} for the year ended 31 March 2026 before charging the commission of its manager. The manager is entitled to a commission of ${p} per cent of the net profit after charging the commission.`,
    parts: [
      child('a', mcq({ t: 1, d: 3, c: 'understanding', stem: 'The commission of the manager is calculated as', opts: [`net profit before commission × ${p} ÷ ${100 + p}`, `net profit before commission × ${p} ÷ 100`, `net profit before commission × ${100 + p} ÷ ${p}`, `net profit before commission × 100 ÷ ${100 + p}`], sol: 'When the rate applies to the profit left after charging the commission, the profit before commission is 110 parts for every 10 of commission, so the commission is 10 over 110 of it. The other formulas give the commission before charging it or have no meaning.' })),
      child('b', short({ t: 1, d: 3, c: 'application', marks: 1, stem: 'Find the manager\'s commission.', model: `${inr(np)} × ${p} ÷ ${100 + p} = **${rs(ca)}**.`, sol: 'Ten over one hundred and ten of the profit.', scheme: [[`${rs(ca)}`, 1]] })),
      child('c', short({ t: 1, d: 4, c: 'application', marks: 2, stem: '**Either** (i): Find the net profit after the commission, and show where the commission is shown in the Balance Sheet.', model: `Net profit after commission = ${inr(np)} − ${inr(ca)} = **${rs(np - ca)}**; ${p} per cent of this is ${inr(pctOf(np - ca, p))}, the same commission. The unpaid commission is a current liability.`, sol: 'Profit less the commission; the amount due is a liability.', scheme: [[`Net profit after commission ${rs(np - ca)}`, 1], ['Current liability in the Balance Sheet', 1]] }), [
        short({ t: 1, d: 4, c: 'analysis', marks: 2, stem: '**Or** (ii): The manager asks for the commission to be worked out on the net profit before charging it. By how much more would Lata Lighting pay, and what would its net profit be?', model: `On the profit before charging it, the commission is ${p} per cent of ${inr(np)} = ${inr(cb)}, which is **${rs(cb - ca)}** more than ${inr(ca)}. The net profit would be ${inr(np)} − ${inr(cb)} = **${rs(np - cb)}**.`, sol: 'A higher commission and a lower profit on the first basis.', scheme: [[`Extra commission ${rs(cb - ca)}`, 1], [`Net profit ${rs(np - cb)}`, 1]] }),
      ]),
    ],
  }));
}

// ---------------------------------------------------------------- Mohit Mills: fire and goods withdrawn
{
  const loss = 25000, claim = 18000, goods = 4000;
  const unins = same(loss - claim, 7000, 'Mohit Mills uninsured loss');
  QQ('cb_fire', caseQ({
    t: 1, d: 4, c: 'application', origin: 'soyl-original',
    stem: 'Read the passage on Mohit Mills and its year-end adjustments and answer the questions that follow.',
    passage: `**Mohit Mills (imagined)**\n\nMohit Mills, an imagined flour mill in the imagined town of Jagatpur, had goods costing ${rs(loss)} destroyed by a fire in February 2026. The insurance company has admitted a claim of ${rs(claim)}. The proprietor also took goods costing ${rs(goods)} for personal use during the year, and no entry was made for either event. Closing stock of ${rs(60000)} has been valued after the fire.`,
    parts: [
      child('a', mcq({ t: 1, d: 3, c: 'understanding', stem: 'The insurance claim of Mohit Mills is shown in the Balance Sheet as', opts: ['a current asset, because the firm expects to receive it', 'a current liability, because it is an insurance matter', 'a deduction from capital', 'a fixed asset, because the goods were stock'], sol: 'An amount that the insurer has agreed to pay is a sum receivable, so it is a current asset. It is not owed by the firm, it does not reduce capital, and a claim on goods is not a fixed asset.' })),
      child('b', short({ t: 1, d: 3, c: 'application', marks: 1, stem: 'Find the loss to be debited to the Profit and Loss Account.', model: `${inr(loss)} − ${inr(claim)} = **${rs(unins)}**.`, sol: 'Loss of goods less the claim admitted.', scheme: [[`${rs(unins)}`, 1]] })),
      child('c', short({ t: 1, d: 4, c: 'application', marks: 2, stem: '**Either** (i): By how much do the two events together raise the gross profit shown by the Trading Account?', model: `The loss of ${inr(loss)} is credited to the Trading Account and the goods withdrawn of ${inr(goods)} are deducted from purchases, so the gross profit rises by ${inr(loss)} + ${inr(goods)} = **${rs(loss + goods)}**.`, sol: 'Both are credits that lower the cost of goods sold.', scheme: [['Loss of goods credited and goods withdrawn deducted from purchases', 1], [`Gross profit higher by ${rs(loss + goods)}`, 1]] }), [
        short({ t: 1, d: 4, c: 'analysis', marks: 2, stem: '**Or** (ii): State the effect of the goods withdrawn on the capital of Mohit Mills and explain why the Balance Sheet total does not change because of it.', model: `The ${rs(goods)} is added to the drawings, so capital is reduced by it. The gross profit and net profit are higher by the same amount, which adds ${inr(goods)} to capital, so the Balance Sheet total is unchanged.`, sol: 'Drawings up and profit up by the same amount.', scheme: [['Added to drawings, reducing capital', 1], ['Profit increases by the same amount, so the total is unchanged', 1]] }),
      ]),
    ],
  }));
}
void mdTable;
