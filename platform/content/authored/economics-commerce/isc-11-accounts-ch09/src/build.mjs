// Build ISC 11 Accounts ch09 Depreciation. Run from platform/:
//   npx tsx content/authored/economics-commerce/isc-11-accounts-ch09/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, notes, cards, test, build } from './lib.mjs';
import { nearDuplicates } from '../../../../../content-pipeline/src/originality/ngrams.ts';
import { check } from './dep.mjs';

setUnit('isc-11-accounts-ch09', 'economics-commerce');
const { BANK } = await import('./questions.mjs');
const V = await import('./decks.mjs');
const { deck1, deck2 } = V;
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ================================================================ notes
const N = notes({
  title: 'Depreciation — Notes',
  sections: [
    {
      h: '1. Meaning and need for depreciation',
      t: 1,
      b: 'A fixed asset such as a machine, a van or furniture serves the business for several years and is used up as it serves. **Depreciation** is the fall in the **book value** of the asset caused by that use, and the amount for each year is charged as an expense.\n\n- It spreads the **cost** of the asset over its useful life.\n- It is a **non-cash** charge: nothing is paid when it is recorded.\n- It is charged **every year**, whether the firm earns a profit or a loss.\n\n**Why charge it?** To find the **correct profit** (the cost of using the asset is an expense), to show the asset at its **true value**, to keep **funds in the business** (lower profit means lower drawings) and to **match** the expense with the income it helps to earn.',
      terms: [
        ['Depreciation', 'The fall in the book value of a fixed asset because it is used, charged as an expense of each year.'],
        ['Book value', 'Cost of the asset less the depreciation charged on it so far.'],
        ['Fixed asset', 'An asset bought to be used in the business for more than one year, not to be resold in the ordinary course.'],
      ],
      v: V.vMeaning,
      vs: [V.vNeed],
    },
    {
      h: '2. Causes and characteristics',
      t: 1,
      b: 'Four causes make an asset lose value:\n\n1. **Wear and tear:** physical use and exposure.\n2. **Passage of time:** an asset with a fixed term, such as a lease, shortens every year.\n3. **Obsolescence:** a better design makes the asset out of date even if it still works.\n4. **Depletion:** a wasting asset such as a quarry or mine is used up as the resource is taken out.\n\n**Characteristics:** depreciation applies to fixed assets with a limited life; land is normally not depreciated; it is different from **repairs** (which keep the asset working) and from a **fall in market price**; it rests on **estimates** of life and scrap value.',
      terms: [
        ['Obsolescence', 'Loss of value because a newer invention or design has made the asset out of date.'],
        ['Depletion', 'Loss of value of a wasting asset as the resource in it is taken out.'],
        ['Wear and tear', 'Loss of value through physical use and exposure to weather.'],
      ],
      v: V.vCauses,
      vs: [V.vChars],
    },
    {
      h: '3. Factors and the straight line method',
      t: 2,
      b: 'The amount depends on three factors:\n\n- **Cost** (price plus carriage, installation and other cost of bringing the asset into use);\n- **estimated useful life** in years;\n- **residual (scrap) value** at the end of the life.\n\n**Straight line method:** the same amount every year.\n\n**Annual depreciation = (Cost − Scrap value) ÷ Life in years**\n\n**Rate on cost = Annual depreciation ÷ Cost × 100**\n\nThe book value falls evenly and reaches the scrap value at the end of the life.',
      terms: [
        ['Residual value', 'The amount the asset is expected to fetch when it is finally sold or scrapped; also called scrap or salvage value.'],
        ['Straight line method', 'A method that charges the same amount every year, found from cost, scrap value and life.'],
      ],
      v: V.vSlm,
      vs: [V.vFactors, V.vTT],
    },
    {
      h: '4. Written down value method and part-year depreciation',
      t: 2,
      b: '**Written down value (WDV) method:** a fixed percentage of the **opening book value** of each year.\n\n**Depreciation of the year = Rate × Opening book value**\n\nThe charge is highest in the first year and **falls** every year; the book value is multiplied by (1 − rate) each year and never reaches nil. Scrap value is not used in the yearly charge.\n\n**Part years.** When an asset is bought or sold during the year, count the whole **months of use** and charge **annual depreciation × months ÷ 12**. An asset bought on 1 August 2026 and a year ending 31 March 2027 has 8 months. Under WDV, the second year is a full year on the book value left after the part-year charge.',
      terms: [
        ['Written down value', 'The book value of an asset: cost less the depreciation charged so far.'],
        ['Part-year depreciation', 'Depreciation for only the months in a year in which the asset was used.'],
      ],
      v: V.vWdv,
      vs: [V.vPF, V.vMonths, V.vBF],
    },
    {
      h: '5. Comparing the two methods',
      t: 2,
      b: 'At the same rate, the **first full year** gives the same charge, because both apply the rate to the cost. After that the **straight line** charge stays level while the **WDV** charge falls. The straight line method writes the asset down to its scrap value; the WDV method always leaves a balance.\n\n**Straight line:** simple, an equal charge each year; but it ignores the rise in repairs as the asset ages.\n\n**WDV:** a heavy charge early (when repairs are low) and a light one later (when repairs are high), so the total burden stays more even; but the book value never becomes nil and the working is longer.\n\n**Choice:** straight line suits leases, patents, buildings and furniture; WDV suits vehicles, computers and machinery, and assets that become out of date quickly.',
      terms: [
        ['Rate of depreciation', 'The percentage of the base (cost, or opening book value) that is charged for a full year.'],
      ],
      v: V.vHH,
      vs: [V.vAdvLim, V.vChoose],
    },
    {
      h: '6. Recording depreciation: asset account and provision account',
      t: 3,
      b: '**Method 1 — credited to the asset account.**\n\nDepreciation A/c Dr; To Asset A/c. The asset account shows the **book value**, falling every year. At the year end: Profit and Loss A/c Dr; To Depreciation A/c.\n\n**Method 2 — provision for depreciation account (accumulated depreciation).**\n\nDepreciation A/c Dr; To Provision for Depreciation A/c. The asset account stays at **cost**; the provision grows each year. In the balance sheet: **asset at cost less provision = book value**.\n\nIn both methods the Profit and Loss A/c is debited with the year\'s depreciation, and the book value is the same. Every account is balanced with **balance c/d** and brought down as **balance b/d**.',
      terms: [
        ['Provision for Depreciation A/c', 'An account with a credit balance that collects the depreciation charged on assets still held; it is deducted from the asset at cost.'],
        ['Accumulated depreciation', 'The total depreciation charged on an asset since it was bought.'],
      ],
      v: V.vTwo,
      vs: [V.vSSj, V.vSSl, V.vProvEntries, V.vNNc, V.vNNp, V.vNNbs, V.vSide],
    },
    {
      h: '7. Additions and sale of assets',
      t: 4,
      b: '**Additions.** Depreciate the old assets for the full year; depreciate the new asset only for the **months from the date of purchase**.\n\n**Sale.** Follow four steps: (1) charge depreciation **up to the date of sale**, counting months; (2) find the **book value** = cost − accumulated depreciation; (3) compare it with the **sale price**; (4) a price above book value is a **profit**, below it is a **loss**.\n\n**Profit or loss on sale = Sale price − Book value.**\n\n**Without an asset disposal account** (depreciation credited to the asset): the sale is shown in the asset account itself. Charge depreciation to the date of sale, then credit the asset with the sale price, and with the loss (or debit it with the profit) to close the asset\'s book value; the result goes to the Profit and Loss A/c.',
      terms: [
        ['Profit on sale', 'The excess of the sale price of an asset over its book value on the date of sale.'],
        ['Loss on sale', 'The shortfall of the sale price of an asset below its book value on the date of sale.'],
      ],
      v: V.vAdd,
      vs: [V.vVVw, V.vVVl, V.vSale, V.vSaleRule, V.vAAw, V.vAAl, V.vAAj],
    },
    {
      h: '8. The asset disposal account',
      t: 4,
      b: 'When the asset is kept at cost with a provision account, a sale goes through an **Asset Disposal Account**. First provide depreciation on the asset sold up to the date of sale (Depreciation A/c Dr; To Provision for Depreciation A/c). Then:\n\n1. Asset Disposal A/c Dr; To Asset A/c (**cost** of the asset sold).\n2. Provision for Depreciation A/c Dr; To Asset Disposal A/c (**accumulated depreciation** on that asset).\n3. Bank A/c Dr; To Asset Disposal A/c (**sale price**).\n4. The **balancing figure** is the profit (credit to Profit and Loss A/c) or loss (debit to Profit and Loss A/c).\n\nThe disposal account must **close with nothing left**. After a sale the provision holds only the depreciation of the assets still held; the asset account holds only their cost.\n\n**Selling one of several assets:** only that asset\'s cost and accumulated depreciation leave the accounts; the others carry on.',
      terms: [
        ['Asset Disposal A/c', 'An account that collects the cost, the accumulated depreciation, the sale price and the profit or loss of an asset sold.'],
      ],
      v: V.vDisp,
      vs: [V.vDDw, V.vDDd, V.vDDp, V.vDDj, V.vPart, V.vSummary1, V.vSummary2],
    },
  ],
  tips: '**How marks are usually split (ISC Accounts)**\n- 1 mark: the cause of depreciation in a case, a rate or a charge from a formula, the side of an entry, or the key of an assertion-reason item.\n- 2 marks: a definition with a feature, two reasons or limitations, a depreciation figure with its working, or the two entries of a charge.\n- 3 marks: a depreciation schedule for three years, journal entries for a year, a book value and profit or loss on sale, or an Asset Disposal A/c.\n- 5 marks: asset and provision accounts for two or three years, with workings; or a sale through a disposal account. Step marks go for the working note, each year\'s account, the balancing and the result.\n\n**Common mistakes**\n- Counting a full year for a part-year purchase, or the wrong number of months.\n- Applying the WDV rate to the cost after the first year.\n- Forgetting to take the sold asset\'s depreciation out of the provision.\n- Using the original cost instead of the book value to find the profit or loss.\n- Forgetting depreciation up to the date of sale.\n- Leaving out balance c/d and b/d in the ledger accounts.',
});

// ================================================================ flashcards
const F = cards([
  ['**Depreciation**', 'The fall in the book value of a fixed asset because it is used, charged as an expense of each year.', 'definition', 1],
  ['Is depreciation a cash expense?', 'No. It is a non-cash charge; no money leaves the business when it is recorded.', 'concept', 1],
  ['Why must depreciation be charged?', 'To show the correct profit and the true value of the asset, to keep funds in the business and to match expense with income.', 'concept', 1],
  ['Four causes of depreciation', 'Wear and tear, passage of time, obsolescence and depletion.', 'fact', 1],
  ['**Obsolescence**', 'Loss of value because a newer invention or design makes the asset out of date.', 'definition', 1],
  ['**Depletion**', 'Loss of value of a wasting asset, such as a quarry, as the resource is taken out.', 'definition', 1],
  ['Is depreciation charged on land?', 'Not normally; land does not wear out.', 'exam-tip', 1],
  ['Depreciation or repairs?', 'Repairs keep the asset working; depreciation spreads its cost. They are different charges.', 'concept', 1],
  ['Three factors that decide the amount of depreciation', 'Cost, estimated useful life and residual (scrap) value.', 'fact', 1],
  ['**Book value**', 'Cost of the asset less the depreciation charged on it so far.', 'definition', 1],
  ['**Straight line method**', 'The same amount every year: (cost − scrap value) ÷ life in years.', 'definition', 2],
  ['Rate of depreciation under the straight line method', 'Annual depreciation ÷ cost × 100, on the original cost.', 'fact', 2],
  ['**Written down value method**', 'A fixed percentage of the opening book value of each year, so the charge falls.', 'definition', 2],
  ['Does scrap value enter the WDV charge?', 'No. The yearly charge is rate × opening book value.', 'exam-tip', 2],
  ['Does the WDV book value reach nil?', 'No. It is multiplied by (1 − rate) each year, so a balance always remains.', 'concept', 2],
  ['Part-year depreciation', 'Annual charge × months of use ÷ 12, counting the months exactly from the date of purchase or to the date of sale.', 'fact', 2],
  ['Same rate, same cost: first-year charge', 'The same under both methods; they differ from the second year.', 'concept', 2],
  ['Which method suits furniture and buildings?', 'The straight line method: even service over a fixed life.', 'fact', 2],
  ['Which method suits vehicles and computers?', 'The WDV method: they lose value fastest early and need more repairs later.', 'fact', 2],
  ['Journal entry when depreciation is credited to the asset', 'Depreciation A/c Dr; To Asset A/c. The asset account shows the book value.', 'fact', 3],
  ['Journal entry when a provision is kept', 'Depreciation A/c Dr; To Provision for Depreciation A/c. The asset stays at cost.', 'fact', 3],
  ['Closing entry for depreciation', 'Profit and Loss A/c Dr; To Depreciation A/c.', 'fact', 3],
  ['**Provision for Depreciation A/c**', 'A credit-balance account that collects the depreciation on the assets held; it is deducted from the asset at cost in the balance sheet.', 'definition', 3],
  ['Asset at cost and provision: what is the book value?', 'Asset at cost less the balance of the Provision for Depreciation A/c.', 'concept', 3],
  ['Depreciation on an asset added during the year', 'Charge only for the months from the date of purchase to the year end.', 'exam-tip', 4],
  ['Book value at the date of sale', 'Cost less the depreciation provided up to that date, including the part-year charge.', 'definition', 4],
  ['Profit or loss on sale', 'Sale price − book value: positive is a profit, negative is a loss.', 'fact', 4],
  ['Where does a loss on sale go?', 'It is debited to the Profit and Loss A/c; a profit is credited.', 'exam-tip', 4],
  ['**Asset Disposal A/c**', 'An account that collects the cost, the provision, the sale price and the profit or loss of an asset sold.', 'definition', 4],
  ['Entries in the Asset Disposal A/c', 'Cost debited; accumulated depreciation and sale price credited; the balancing figure is the profit or loss.', 'concept', 4],
  ['After a sale, what does the provision hold?', 'Only the depreciation of the assets still held; the sold asset\'s share has been transferred out.', 'exam-tip', 4],
]);
check(F.cards.length >= 28 && F.cards.length <= 35, `flashcard count ${F.cards.length}`);

// ================================================================ tests (ISC class defaults, item for item)
const T_SHORT = test({
  kind: 'short',
  blueprint: 'isc-11-default-chapter-test-short',
  title: 'Chapter test (short) — Depreciation',
  duration: 50,
  sections: [
    { id: 'A', title: 'Section A - Objective (5 marks)', instr: 'Answer all questions. Multiple-choice and assertion-reason items carry 1 mark each.', items: ['m_def', 'm_wdv_second', 'm_prov_bal', 'm_sale_bv', 'ar_need'] },
    { id: 'B', title: 'Section B - Short answer (4 marks)', instr: 'Answer both questions. Internal choice in the second question.', items: ['s2_meaning', { attempt: 1, keys: ['s2_slm_rate', 's2_prov_use'] }] },
    { id: 'C', title: 'Section C - Short answer (6 marks)', instr: 'Answer both questions. Internal choice in the second question. Show working and ledger accounts in proper form.', items: ['s3_slm_sched', { attempt: 1, keys: ['s3_jr_direct', 's3_sale_calc'] }] },
    { id: 'D', title: 'Section D - Long answer (5 marks)', instr: 'Answer the question. Prepare the accounts in proper form with a working note.', items: ['l5_prov_ledgers'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'isc-11-default-chapter-test-long',
  title: 'Chapter test (long) — Depreciation',
  duration: 100,
  sections: [
    { id: 'A', title: 'Section A - Objective (12 marks)', instr: 'Answer all questions. Multiple-choice and assertion-reason items carry 1 mark each.', items: ['m_cause_depl', 'm_factors', 'm_slm_rate', 'm_part_months', 'm_wdv_feature', 'm_asset_direct', 'm_prov_sale', 'm_disp_close', 'm_profit_calc', 'm_land', 'ar_slm_wdv', 'ar_prov'] },
    { id: 'B', title: 'Section B - Short answer (6 marks)', instr: 'Answer all three questions. Internal choice in the last question.', items: ['s2_objectives', 's2_factors', { attempt: 1, keys: ['s2_wdv_lim', 's2_sale_bv'] }] },
    { id: 'C', title: 'Section C - Short answer (12 marks)', instr: 'Answer all four questions. Internal choice in the last question. Show working and accounts in proper form.', items: ['s3_causes', 's3_wdv_sched', 's3_jr_prov', { attempt: 1, keys: ['s3_prov_a', 's3_disp_a'] }] },
    { id: 'D', title: 'Section D - Long answer (10 marks)', instr: 'Answer both questions. Internal choice in the second question. Prepare the accounts in proper form with a working note.', items: ['l5_prov_sale', { attempt: 1, keys: ['l5_direct_sale', 'l5_wdv_add'] }] },
  ],
});

// ================================================================ extra gates for this chapter
// 1. TTS-safe narration: words only.
for (const d of [deck1, deck2]) for (const s of d.slides) {
  const m = /[0-9₹%/&()"“”|*#+=<>]|\b[A-Z]{2,}\b|\b(?:Dr|Cr|Rs|A\/c|viz|etc|ie|eg)\b/.exec(s.narration);
  if (m) throw new Error(`narration of deck ${d.part} ${s.id} is not TTS-safe: "${m[0]}" in "${s.narration.slice(Math.max(0, m.index - 30), m.index + 30)}"`);
}
// 2. Near-duplicate stems inside the bank.
for (const d of nearDuplicates(BANK, { n: 5, threshold: 0.5, minWords: 5 })) {
  if (d.similarity >= 0.7) throw new Error(`near-duplicate stems ${d.a.id} / ${d.b.id} (${Math.round(d.similarity * 100)}%)`);
  console.log(`note: stems ${d.a.id} / ${d.b.id} are ${Math.round(d.similarity * 100)}% similar (never together in one test)`);
}
// 3. Tests: disjoint, no deck-check item, marks.
const inTest = (t) => t.sections.flatMap((s) => s.items.map((i) => i.question_id));
const shortIds = new Set(inTest(T_SHORT));
check(inTest(T_LONG).every((id) => !shortIds.has(id)), 'the two chapter tests share a question');
const deckChecks = new Set([deck1, deck2].flatMap((d) => d.slides.map((s) => s.check_question_id).filter(Boolean)));
check(deckChecks.size === 6, `deck check count ${deckChecks.size}`);
check([...shortIds, ...inTest(T_LONG)].every((id) => !deckChecks.has(id)), 'a deck-check question is used in a test');
check(T_SHORT.total_marks === 20 && T_LONG.total_marks === 40, `test marks ${T_SHORT.total_marks} / ${T_LONG.total_marks}`);
// 4. Slide counts and visuals.
for (const d of [deck1, deck2]) {
  check(d.slides.length >= 18 && d.slides.length <= 22, `deck ${d.part} has ${d.slides.length} slides`);
  console.log(`deck ${d.part}: ${d.slides.length} slides, ${d.slides.filter((s) => s.visual).length} with visuals, ${d.slides.filter((s) => s.layout === 'example').length} worked-example slides`);
}

build({
  dir: DIR,
  decks: [deck1, deck2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01-t04 of isc-11-accounts-ch09 (meaning, need, causes, objectives and characteristics of depreciation and the factors that decide it; the straight line and written down value methods with rate from cost, scrap value and life, part-year depreciation counted in months, advantages, limitations and differences; recording depreciation by charging the asset account or a provision for depreciation account over two to three years; additions during the year, sale of an asset, and profit or loss on sale with and without an asset disposal account); the removed topic, change of method from SLM to WDV or vice versa, is not examined anywhere',
    originality: 'every firm, person and figure written for this chapter and labelled imagined; no ISC or CBSE textbook illustration or exercise and no CISCE specimen or board item reused; firms, assets, dates and figures differ from the CBSE 11 Accountancy depreciation chapter (Rana, Asha, Bhavani, Chitra and the others) and from the ISC 11 Accounts chapters 1 to 8',
    data: 'every depreciation schedule, asset account, provision for depreciation account, asset disposal account and profit or loss on sale generated by dep.mjs fleet/compare/track on top of acc.mjs slm/schedule/onSale/ledger/journal, with months counted from the dates and asserted; asset account closes with c/d and b/d; provision equals accumulated depreciation of assets held; book value on sale = cost less accumulated depreciation; profit or loss = sale price less book value; WDV charge = rate x opening book value; depreciation plus book value left plus book value of the asset sold = cost; every journal entry balances',
    facts: 'ISC Accountancy (858) Class XI Unit 5 Depreciation: causes, methods (straight line and written down value), recording by charging the asset or through a provision for depreciation account, purchase and sale of assets with and without an asset disposal account; GST transactions are not examined',
    gate: 'schema, content lint (lintExemplar), deterministic verify checks, answer-leak scan, TTS-safe narration, near-duplicate stems, whole-number step marks and test disjointness run clean on this chapter',
  },
});
