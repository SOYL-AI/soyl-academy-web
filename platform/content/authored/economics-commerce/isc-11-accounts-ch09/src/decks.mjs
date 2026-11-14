// The two decks of ISC 11 Accounts ch09 (Depreciation). Imported by build.mjs after the question bank is registered.
import { deck, sl, table, flow } from './lib.mjs';
import {
  same, inr, rs, words, rupees, journal, ledger, stack, stackDirect, stackCost, stackProv, track,
  TT, PF, BF, HH, SS, NN, VV, AA, DD,
} from './fig.mjs';

const tb = (t, alt, caption) => table(t.headers, t.body ?? t.rows, alt, caption);

// ================================================================ visuals: deck 1
const vRoute1 = flow('LR', ['Why assets lose value', 'Causes and objectives', 'Cost, life and residual value', 'Straight line method', 'Written down value method', 'Comparing the two methods'], 'Route map of Part 1: why fixed assets lose value, the causes and objectives of depreciation, the three factors that decide the amount, the straight line method, the written down value method and a comparison of the two methods', 'Where Part 1 goes');
const vMeaning = table(['Feature', 'What it means'], [
  ['A fall in book value', 'The value of a fixed asset in the books goes down because the asset is used up'],
  ['An allocation of cost', 'The cost of the asset is spread over the years in which it helps to earn income'],
  ['A non-cash charge', 'No money leaves the business when depreciation is charged; it is an expense of the year'],
  ['Charged every year', 'The charge is made whether the firm earns a profit or a loss'],
], 'Table of four features of depreciation: a fall in the book value of a fixed asset, an allocation of its cost over its useful life, a non-cash charge, and a charge made every year');
const vNeed = table(['Need', 'Why it matters'], [
  ['Correct profit', 'The cost of using the asset is an expense of the year; without it profit is overstated'],
  ['True value of the asset', 'The balance sheet shows the asset at cost less the amount used up so far'],
  ['Funds kept in the business', 'Lower profit means lower drawings, so money stays to replace the asset later'],
  ['Better matching', 'The expense falls in the same years as the income that the asset helps to earn'],
], 'Table of four reasons depreciation must be charged: to find the correct profit, to show the asset at its true value, to keep funds in the business for replacement, and to match the expense with the income of the year', 'Why depreciation must be charged');
const vCauses = table(['Cause', 'What happens', 'Example from an imagined firm'], [
  ['Wear and tear', 'Physical use and exposure wear the asset out', 'A delivery van of Kanpur Couriers is driven every day for three years'],
  ['Passage of time', 'An asset with a fixed term loses value as the term runs out', 'A lease of a workshop held by Anantnag Metals shortens every year'],
  ['Obsolescence', 'New inventions or fashions make the asset out of date before it is worn out', 'Machines of Silvassa Prints are replaced by faster models'],
  ['Depletion', 'A wasting asset is used up as the resource is taken out', 'A stone quarry of Jaisalmer Granites yields less each year'],
], 'Table of four causes of depreciation with an example of each: wear and tear, passage of time, obsolescence and depletion', 'The four causes of depreciation');
const vChars = table(['Characteristic', 'Meaning'], [
  ['Applies to fixed assets with a limited life', 'Plant, furniture, vehicles, buildings and the like'],
  ['Not charged on land', 'Land does not wear out, so no depreciation is normally charged on it'],
  ['Different from repairs', 'Repairs keep the asset in working order; depreciation spreads its cost'],
  ['Different from a fall in market price', 'Depreciation follows the cost and the plan, not the daily market value'],
  ['An estimate', 'Life and residual value are estimated when the asset is bought'],
], 'Table of five characteristics of depreciation: it applies to fixed assets with a limited life, it is not charged on land, it differs from repairs, it differs from a fall in market price, and it rests on estimates');
const vFactors = table(['Factor', 'What it covers', 'Effect on the yearly charge'], [
  ['Cost', 'Purchase price plus carriage, installation and other cost of making it ready for use', 'A higher cost gives a higher charge'],
  ['Estimated useful life', 'The number of years the firm expects to use the asset', 'A longer life gives a lower charge'],
  ['Residual (scrap) value', 'What the asset is expected to fetch when it is finally sold', 'A higher scrap value gives a lower charge'],
], 'Table of the three factors that decide the amount of depreciation: cost, estimated useful life and residual or scrap value, each with its effect on the yearly charge', 'Three factors decide the amount');
const vTT = tb(TT.t, `Straight line depreciation of a kiln of Tindivanam Tiles, an imagined firm: ${words(TT.r.annual)} rupees every year for six years, taking the book value from ${words(TT.cost)} rupees down to the scrap value of ${words(TT.scrap)} rupees`, 'Tindivanam Tiles: the same charge every year');
const vSlm = table(['Point', 'Straight line method'], [
  ['Basis', 'The same amount every year'],
  ['Formula', '(Cost − scrap value) ÷ life in years'],
  ['Rate', 'Annual charge ÷ cost × 100, a fixed percentage of the original cost'],
  ['Book value', 'Falls by an equal amount each year and reaches the scrap value at the end of the life'],
], 'Table of four points on the straight line method: equal yearly charge, the formula using cost, scrap value and life, a rate on original cost, and a book value that falls evenly to the scrap value', 'The straight line method');
const vWdv = table(['Point', 'Written down value method'], [
  ['Basis', 'A fixed percentage of the book value at the start of each year'],
  ['Charge', 'Opening book value × rate; it is highest in the first year and falls every year'],
  ['Book value', 'Never reaches zero by itself; it is multiplied by (1 − rate) every year'],
  ['Scrap value', 'Not used in the calculation of the yearly charge'],
], 'Table of four points on the written down value method: a fixed percentage on the opening book value, a charge that falls every year, a book value that never reaches zero, and no use of scrap value in the calculation', 'The written down value method');
const vPF = tb(PF.t, `Written down value depreciation at twenty five per cent on a machine of Pollachi Feeds, an imagined firm, costing ${words(PF.cost)} rupees: charges of ${words(160000)}, ${words(120000)}, ${words(90000)} and ${words(67500)} rupees in four years, leaving ${words(202500)} rupees`, 'Pollachi Feeds: the charge falls every year');
const vMonths = flow('LR', ['Note the date of purchase or sale', 'Count whole months in the year', 'Annual charge × months ÷ 12', 'Add the part-year charge to the asset'], 'Route map for part-year depreciation: note the date of purchase or sale, count the whole months in the year, multiply the annual charge by the months and divide by twelve, and record the part-year charge', 'Part-year depreciation in four steps');
const vBF = table(['Year ended', 'Months', 'Straight line charge (₹)', 'Written down value charge (₹)'], [
  ['31 March 2027', String(BF.months), inr(BF.s.rows[0].dep), inr(BF.w.rows[0].dep)],
  ['31 March 2028', '12', inr(BF.s.rows[1].dep), inr(BF.w.rows[1].dep)],
], `Depreciation on a cold room of Bhimavaram Fisheries, an imagined firm, bought on 1 August 2026 for ${words(BF.cost)} rupees: ${words(24000)} rupees in the first year of eight months under both methods, and then ${words(36000)} rupees by the straight line method against ${words(33600)} rupees by the written down value method`, 'Bhimavaram Fisheries: a purchase part-way through the year');
const vHH = table(HH.c.headers, HH.c.rows, `Comparison of the two methods on a press of Hubballi Hydraulics, an imagined firm, costing ${words(HH.cost)} rupees at twenty per cent for five years: the straight line charge stays at ${words(125000)} rupees while the written down value charge falls from ${words(125000)} to ${words(51200)} rupees, leaving a book value of ${words(204800)} rupees`, 'Hubballi Hydraulics: the same rate, two methods');
const vAdvLim = table(['', 'Straight line method', 'Written down value method'], [
  ['Advantages', 'Simple to calculate; equal charge every year; asset can be written down to its scrap value', 'Heavier charge when the asset is new and repairs are low; total of depreciation and repairs stays level; accepted for tax'],
  ['Limitations', 'Ignores the rise in repairs as the asset ages, so the total charge grows; charges the same amount although the asset gives less service as it ages; ignores interest on the money invested in the asset', 'Book value never becomes zero; the charge in the early years is heavy; calculation is longer'],
], 'Table of advantages and limitations of the straight line method and the written down value method', 'Advantages and limitations');
const vChoose = table(['Kind of asset', 'Method that suits it', 'Reason'], [
  ['Leases, patents and buildings', 'Straight line', 'They give about the same service each year of a fixed life'],
  ['Furniture and fittings', 'Straight line', 'Use is even and repairs stay small'],
  ['Vehicles, computers and machinery', 'Written down value', 'They lose value fastest early and need more repairs later'],
  ['Assets that become obsolete quickly', 'Written down value', 'Most of the cost is recovered in the early years'],
], 'Table matching four kinds of asset with the method that suits them: leases, patents and buildings and furniture suit straight line; vehicles, computers and machinery and quickly obsolete assets suit written down value', 'Which method suits which asset');
const vSummary1 = table(['Topic', 'Remember'], [
  ['Meaning', 'A fall in book value; a non-cash allocation of cost over the useful life'],
  ['Causes', 'Wear and tear, passage of time, obsolescence, depletion'],
  ['Factors', 'Cost, useful life, residual value'],
  ['Straight line', '(Cost − scrap) ÷ life: the same amount every year, on original cost'],
  ['Written down value', 'Rate × opening book value: a falling charge'],
  ['Part year', 'Annual charge × months ÷ 12, counting the months exactly'],
], 'Summary table of Part 1: meaning, causes, factors, the straight line method, the written down value method and part-year depreciation');

// ================================================================ visuals: deck 2
const vRoute2 = flow('LR', ['Two ways of recording', 'Charged to the asset', 'Provision for depreciation', 'Additions in the year', 'Sale of an asset', 'Asset disposal account'], 'Route map of Part 2: the two ways of recording depreciation, charging it to the asset account, using a provision for depreciation account, additions during the year, sale of an asset and the asset disposal account', 'Where Part 2 goes');
const vTwo = table(['Point', 'Charged to the asset account', 'Provision for depreciation account'], [
  ['Journal entry', 'Depreciation A/c Dr; To Asset A/c', 'Depreciation A/c Dr; To Provision for Depreciation A/c'],
  ['Asset account shows', 'Book value, falling every year', 'Original cost, until the asset is sold'],
  ['Accumulated depreciation', 'Not shown separately', 'Shown in the provision account, growing every year'],
  ['Balance sheet', 'Asset at book value', 'Asset at cost, less the provision, giving book value'],
  ['Profit and loss account', 'Depreciation for the year is debited', 'Depreciation for the year is debited'],
], 'Table comparing the two ways of recording depreciation: the journal entry, what the asset account shows, whether accumulated depreciation appears, the balance sheet and the profit and loss account', 'Two ways of recording depreciation');
const vSSj = tb(SS.years[0].direct.journal, `Journal entries of Sivaganga Stationers, an imagined firm, for the year ended 31 March 2027: the purchase of furniture for ${words(260000)} rupees, depreciation of ${words(39000)} rupees charged to the asset, and its transfer to the profit and loss account`, 'Sivaganga Stationers: journal entries for the first year');
const vSSl = tb(stackDirect(SS, 'Furniture'), `Furniture account of Sivaganga Stationers for three years, with depreciation of ${words(39000)} rupees credited each year, so that the balance carried down falls from ${words(221000)} to ${words(182000)} and then to ${words(143000)} rupees`, 'Sivaganga Stationers: the Furniture account for three years');
const vNNc = tb(stackCost(NN, 'Machinery'), `Machinery account of Nanded Nurseries, an imagined firm, for three years: it stays at the cost of ${words(480000)} rupees every year because depreciation is not credited to it`, 'Nanded Nurseries: the Machinery account stays at cost');
const vNNp = tb(stackProv(NN), `Provision for Depreciation account of Nanded Nurseries for three years: depreciation of ${words(72000)}, ${words(61200)} and ${words(52020)} rupees is credited, and the balance grows to ${words(185220)} rupees`, 'Nanded Nurseries: the provision grows every year');
const vNNbs = table(['Year ended', 'Machinery at cost (₹)', 'Less: provision (₹)', 'Book value (₹)'], NN.years.map((y) => [y.end, inr(y.closingCost), inr(y.closingAcc), inr(y.closingBV)]), `Extract of the balance sheet of Nanded Nurseries at the end of each of three years: machinery at the cost of ${words(480000)} rupees, less the provision of ${words(72000)}, ${words(133200)} and ${words(185220)} rupees, gives book values of ${words(408000)}, ${words(346800)} and ${words(294780)} rupees`, 'Balance sheet extract, year by year');
same(NN.years[1].closingAcc, 133200, 'Nanded provision after two years');
const vSide = table(['Year ended', 'Furniture, charged to the asset (₹)', 'Machinery at cost (₹)', 'Provision (₹)', 'Book value (₹)'], NN.years.map((y, i) => [y.end, inr(SS.years[i].closingBV), inr(y.closingCost), inr(y.closingAcc), inr(y.closingBV)]), 'Table of year-end figures of two firms: furniture charged directly shows only a book value, while machinery at cost shows the cost, the provision and the same kind of book value', 'Direct charge and provision: what each shows');
const vAdd = flow('LR', ['Note the date of purchase', 'Count the months to 31 March', 'Annual charge × months ÷ 12', 'Old assets get the full year'], 'Route map for an addition during the year: note the date of purchase, count the months to 31 March, work out the part-year charge, and give the old assets the full-year charge', 'Depreciation when an asset is added');
const vVVw = tb(VV.work, `Depreciation of Vizianagaram Vessels, an imagined firm, on its old plant of ${words(320000)} rupees and a new plant of ${words(160000)} rupees bought on 1 October 2027: ${words(32000)} rupees in the first year, ${words(40000)} in the second including ${words(8000)} for six months on the new plant, and ${words(48000)} in the third`, 'Vizianagaram Vessels: depreciation by plant and year');
const vVVl = tb(VV.years[1].direct.asset, `Plant account of Vizianagaram Vessels for the year ended 31 March 2028: opening balance ${words(288000)} rupees, purchase of ${words(160000)} rupees, depreciation of ${words(40000)} rupees, and a balance carried down of ${words(408000)} rupees`, 'Plant account, year ended 31 March 2028');
const vSale = flow('LR', ['Depreciation up to the date of sale', 'Book value at the date of sale', 'Sale price less book value', 'Profit or loss on sale'], 'Route map for the sale of an asset: charge depreciation up to the date of sale, find the book value, subtract it from the sale price, and read the result as a profit or a loss', 'Four steps for the sale of an asset');
const vSaleRule = table(['Quantity', 'How it is found'], [
  ['Book value on the date of sale', 'Cost − accumulated depreciation up to that date'],
  ['Profit on sale', 'Sale price greater than the book value'],
  ['Loss on sale', 'Sale price smaller than the book value'],
  ['Where it goes', 'Profit and loss account: a profit is credited and a loss is debited'],
], 'Table of how book value, profit and loss on sale are found and where the result is recorded', 'Profit or loss on sale');
const vAAw = table(['Year ended', 'Months', 'Opening book value (₹)', 'Depreciation (₹)', 'Closing book value (₹)'], AA.R('B').map((r, i) => [['31 March 2027', '31 March 2028', '1 July 2028'][i], String([6, 12, 3][i]), inr(r.opening), inr(r.dep), inr(r.closing)]), `Working for machine B of Aizawl Appliances, an imagined firm, bought for ${words(160000)} rupees on 1 October 2026 at twenty per cent on the written down value: ${words(16000)}, ${words(28800)} and ${words(5760)} rupees, leaving ${words(109440)} rupees on 1 July 2028`, 'Aizawl Appliances: machine B up to the date of sale');
const vAAl = tb(AA.years[2].direct.asset, `Machinery account of Aizawl Appliances for the year ended 31 March 2029, with depreciation of ${words(44160)} rupees, sale proceeds of ${words(100000)} rupees, a loss on sale of ${words(9440)} rupees and a balance carried down of ${words(153600)} rupees`, 'Aizawl Appliances: the Machinery account in the year of sale');
const vAAj = tb(journal(AA.years[2].direct.entries.slice(0, 2)), `The two journal entries on 1 July 2028 for Aizawl Appliances: depreciation of ${words(5760)} rupees on machine B up to the date of sale, and the sale for ${words(100000)} rupees with a loss of ${words(9440)} rupees`, 'Journal entries on the day of sale');
const vDisp = table(['Entry', 'Debit', 'Credit', 'Purpose'], [
  ['1', 'Asset Disposal A/c', 'Asset A/c', 'Cost of the asset sold is taken out of the asset account'],
  ['2', 'Provision for Depreciation A/c', 'Asset Disposal A/c', 'Accumulated depreciation on that asset is taken out of the provision'],
  ['3', 'Bank A/c', 'Asset Disposal A/c', 'Sale price received'],
  ['4', 'Profit and Loss A/c or Asset Disposal A/c', 'Asset Disposal A/c or Profit and Loss A/c', 'Loss on sale is debited to profit and loss; profit is credited'],
], 'Table of the four entries for the sale of an asset through an asset disposal account: cost transferred, accumulated depreciation transferred, sale price received, and the profit or loss transferred to the profit and loss account', 'The asset disposal account in four entries');
const vDDw = tb(DD.work, `Depreciation of Dindigul Dairies, an imagined firm, on machine A of ${words(400000)} rupees bought on 1 April 2026 and machine B of ${words(280000)} rupees bought on 1 July 2026, sold on 1 January 2029: totals of ${words(61000)}, ${words(68000)} and ${words(61000)} rupees`, 'Dindigul Dairies: depreciation by machine and year');
const vDDd = tb(DD.years[2].prov.disposal, `Asset Disposal account of Dindigul Dairies: machine B at cost ${words(280000)} rupees and the profit on sale of ${words(15000)} rupees on the debit side against accumulated depreciation of ${words(70000)} rupees and sale proceeds of ${words(225000)} rupees on the credit side`, 'Dindigul Dairies: Asset Disposal account');
const vDDp = tb(DD.years[2].prov.provision, `Provision for Depreciation account of Dindigul Dairies for the year ended 31 March 2029: the accumulated depreciation of ${words(70000)} rupees on machine B is transferred out, and ${words(120000)} rupees remain for machine A`, 'Dindigul Dairies: Provision for Depreciation account in the year of sale');
const vDDj = tb(DD.years[2].prov.saleJournal, `The four journal entries for the sale of machine B of Dindigul Dairies through the Asset Disposal account, ending with the profit of ${words(15000)} rupees credited to the profit and loss account`, 'Dindigul Dairies: journal entries for the sale');
export const vPart = table(['Machine', 'Cost (₹)', 'Accumulated depreciation (₹)', 'Book value (₹)', 'Position on 31 March 2029'], [
  ['Machine A (kept)', inr(400000), inr(DD.R('A')[0].dep + DD.R('A')[1].dep + DD.R('A')[2].dep), inr(280000), 'Stays in the Machinery A/c and the provision'],
  ['Machine B (sold)', inr(280000), inr(DD.years[2].sold.acc), inr(DD.years[2].sold.bv), 'Moved to the Asset Disposal A/c'],
], 'Table for the two machines of Dindigul Dairies: machine A of four lakh rupees cost stays with a provision of one lakh twenty thousand rupees, and machine B of two lakh eighty thousand rupees cost with seventy thousand rupees of depreciation is moved to the asset disposal account', 'Selling one machine of two');
same(DD.R('A')[0].dep + DD.R('A')[1].dep + DD.R('A')[2].dep, 120000, 'Dindigul machine A accumulated depreciation');
export const vProvEntries = table(['Step', 'Entry or account', 'Effect'], [
  ['Buy the asset', 'Asset A/c Dr; To Bank A/c', 'Asset is recorded at cost and stays at cost'],
  ['Charge the year', 'Depreciation A/c Dr; To Provision for Depreciation A/c', 'The provision grows by the year\'s charge'],
  ['Close the year', 'Profit and Loss A/c Dr; To Depreciation A/c', 'Depreciation reduces the profit'],
  ['Show in the balance sheet', 'Asset at cost less provision', 'The balance is the book value'],
], 'Table of the steps of the provision method: buy the asset at cost, charge depreciation to the provision account, close depreciation to the profit and loss account, and show the asset at cost less the provision in the balance sheet', 'The provision method in four steps');
export const vMistakes = table(['Common mistake', 'Correct treatment'], [
  ['Counting a full year for a part-year purchase', 'Count the exact months from the date of purchase to 31 March'],
  ['Using the rate on cost under the written down value method', 'Apply the rate to the opening book value of that year'],
  ['Leaving the provision unchanged when an asset is sold', 'Transfer that asset\'s accumulated depreciation out of the provision'],
  ['Taking the sale price as the book value', 'Book value is cost less depreciation up to the date of sale'],
  ['Forgetting depreciation up to the date of sale', 'Charge it for the months used in the year of sale'],
], 'Table of five common mistakes with depreciation and the correct treatment of each: part-year months, the base of the written down value rate, the provision on a sale, book value at sale, and depreciation up to the date of sale', 'Five mistakes to avoid');
const vSummary2 = table(['Topic', 'Remember'], [
  ['Charged to the asset', 'Asset A/c credited; shows book value'],
  ['Provision method', 'Asset stays at cost; provision grows each year'],
  ['Balance sheet', 'Cost less provision equals book value under both ways'],
  ['Additions', 'Part-year charge on the new asset; full year on the old'],
  ['Sale', 'Depreciate to the date of sale; book value; profit or loss'],
  ['Disposal account', 'Cost, provision, sale price and the profit or loss all pass through it'],
], 'Summary table of Part 2: charging to the asset, the provision method, the balance sheet, additions, sale and the asset disposal account');

// ================================================================ deck 1
export const deck1 = deck({
  part: 1,
  title: 'Depreciation — Part 1: Meaning, Causes and the Two Methods',
  goals: [
    'Explain what depreciation is, why it is charged and what causes it',
    'Calculate yearly depreciation by the straight line and written down value methods, including part years counted in months',
    'Compare the two methods and say which suits which kind of asset',
  ],
  slides: [
    sl('title', 'Depreciation: spreading the cost of an asset', {
      b: 'Part 1: why a fixed asset loses value, what causes it, and how the **straight line** and **written down value** methods work.',
      v: vRoute1,
      n: 'Welcome. A machine or a van does not last for ever. Each year the business uses up a part of it. In this part we see why that loss must be charged as an expense, what causes it, and the two main ways of working it out.',
    }),
    sl('concept', 'What depreciation means', {
      bl: ['Depreciation is the **fall in the book value** of a fixed asset because it is used up.', 'It spreads the **cost** of the asset over its useful life.', 'It is a **non-cash** charge made every year.'],
      v: vMeaning,
      n: 'Depreciation is the fall in the book value of a fixed asset caused by its use. It spreads the cost of the asset over the years the asset serves. No cash leaves the business when depreciation is charged, and the charge is made every year, even in a year of loss.',
    }),
    sl('concept', 'Why depreciation must be charged', {
      b: 'Without depreciation the **profit is overstated** and the asset is shown at too high a value.',
      v: vNeed,
      n: 'There are four reasons to charge depreciation. It gives the correct profit, because using an asset has a cost. It shows the asset at its true value in the balance sheet. It keeps funds in the business, since lower profit means lower drawings. And it matches expense with income.',
    }),
    sl('concept', 'Causes of depreciation', {
      bl: ['**Wear and tear** from use and exposure', '**Passage of time** for assets with a fixed term', '**Obsolescence** when something better arrives', '**Depletion** of a wasting asset such as a quarry'],
      v: vCauses,
      n: 'Four causes. Wear and tear comes from daily use. Passage of time reduces the value of an asset with a fixed term, such as a lease. Obsolescence makes a machine out of date even if it still works. Depletion uses up a wasting asset like a quarry.',
    }),
    sl('concept', 'Characteristics of depreciation', {
      b: 'Depreciation applies to **fixed assets with a limited life**. It is not repairs, and it is not the same as a fall in market price.',
      v: vChars,
      n: 'Remember what depreciation is not. It is not charged on land. It is not the cost of repairs. It does not follow the daily market price. It rests on estimates of life and residual value made when the asset is bought.',
    }),
    sl('check', 'Quick check: a cause of depreciation', {
      b: 'Choose the cause.',
      chk: 'm_chk_cause',
      n: 'A machine still works perfectly, but a faster model has come into the market and the owner plans to replace it soon. Think about which cause of depreciation this describes, and then choose.',
    }),
    sl('concept', 'Three factors decide the amount', {
      b: 'The yearly charge depends on the **cost**, the **estimated life** and the **residual value**.',
      v: vFactors,
      n: 'The yearly charge depends on three factors. The cost includes everything spent to bring the asset into use. The estimated useful life is the number of years of service. The residual value is the scrap price at the end. A higher cost raises the charge, a longer life or higher scrap value lowers it.',
    }),
    sl('example', 'Worked example 1: straight line from cost, scrap and life', {
      b: `**Tindivanam Tiles**, an imagined firm, buys a kiln for ${rs(TT.cost)}. It expects to use it for ${TT.life} years and then sell it as scrap for ${rs(TT.scrap)}. Find the yearly depreciation and the rate.`,
      bl: [`Depreciation = (${inr(TT.cost)} − ${inr(TT.scrap)}) ÷ ${TT.life} = **${rs(TT.r.annual)}** a year.`, `Rate = ${inr(TT.r.annual)} ÷ ${inr(TT.cost)} × 100 = **${TT.r.ratePct}%** on cost.`],
      v: vTT,
      n: `The kiln costs ${rupees(TT.cost)} and will fetch ${rupees(TT.scrap)} as scrap. The amount to be written off is the difference, ${rupees(TT.cost - TT.scrap)}. Spread over six years, that is ${rupees(TT.r.annual)} every year. This is fifteen per cent of the cost. After six years the book value equals the scrap value.`,
    }),
    sl('concept', 'The straight line method', {
      b: 'The same amount is charged **every year**, on the **original cost**.',
      v: vSlm,
      n: 'In the straight line method the charge is the same every year. The formula is cost less scrap value, divided by the life in years. The rate is a fixed percentage of the original cost. The book value falls evenly and reaches the scrap value at the end of the life.',
    }),
    sl('concept', 'The written down value method', {
      b: 'A fixed **percentage of the opening book value** is charged each year, so the charge **falls** as the asset ages.',
      v: vWdv,
      n: 'In the written down value method a fixed percentage is applied to the book value at the start of each year. The charge is highest in the first year and falls every year. The book value is multiplied by one minus the rate each year, so it never reaches zero by itself. Scrap value is not used in the calculation.',
    }),
    sl('example', 'Worked example 2: written down value for four years', {
      b: `**Pollachi Feeds**, an imagined firm, buys a machine for ${rs(PF.cost)} and writes it down at ${PF.rate}% a year on the written down value. Find the charge for each of four years.`,
      bl: [`Year 1: ${PF.rate}% of ${inr(PF.cost)} = ${inr(160000)}; value ${inr(480000)}.`, `Year 4: ${PF.rate}% of ${inr(270000)} = ${inr(67500)}; value left **${rs(202500)}**.`],
      v: vPF,
      n: `Each year the rate is applied to what is left. Year one, twenty five per cent of ${rupees(PF.cost)} is ${rupees(160000)}. The book value falls to ${rupees(480000)}. Year two, the charge is ${rupees(120000)}. Year three, ${rupees(90000)}. Year four, ${rupees(67500)}. After four years ${rupees(202500)} remain.`,
    }),
    sl('check', 'Quick check: written down value', {
      b: 'True or false?',
      chk: 'tf_chk_wdv',
      n: 'Read the statement about the written down value method. Think about what the rate is applied to in each year, and whether the charge stays the same.',
    }),
    sl('concept', 'Part-year depreciation: count the months', {
      b: 'When an asset is bought or sold during the year, charge depreciation only for the **months it was in use**: **annual charge × months ÷ 12**.',
      v: vMonths,
      n: 'If an asset is bought part-way through the year, it is used for only some months. Count the whole months from the date of purchase to the end of the year. Multiply the annual charge by that number of months and divide by twelve. The same rule applies up to the date of a sale.',
    }),
    sl('example', 'Worked example 3: bought part-way through the year', {
      b: `**Bhimavaram Fisheries**, an imagined firm, buys a cold room for ${rs(BF.cost)} on **1 August 2026**. Books close on 31 March and depreciation is ${BF.rate}% a year. Find the charge for the first two years by both methods.`,
      bl: [`Months from 1 August 2026 to 31 March 2027 = **${BF.months}**.`, `First year, both methods: ${inr(BF.cost)} × ${BF.rate}% × ${BF.months}/12 = ${rs(24000)}.`, `Second year: straight line ${inr(36000)}; written down value ${inr(33600)} (${BF.rate}% of ${inr(336000)}).`],
      v: vBF,
      n: `August to March is eight months. In the first year both methods give the same charge, ${rupees(24000)}, because the base is the cost. In the second year the straight line method again charges ${rupees(36000)}, but the written down value method charges ten per cent of ${rupees(336000)}, which is ${rupees(33600)}.`,
    }),
    sl('concept', 'Same rate, two methods', {
      b: 'At the same rate the first year is the same. Later the **straight line** charge stays level and the **written down value** charge falls.',
      v: vHH,
      n: 'Here is one press at twenty per cent for five years. The straight line charge stays at one lakh twenty five thousand rupees. The written down value charge starts at the same amount and falls to fifty one thousand two hundred rupees. After five years the straight line method has written the press off completely, while a book value remains under the written down value method.',
    }),
    sl('check', 'Quick check: completing the rule', {
      b: 'Complete the sentence.',
      chk: 'fb_chk_slm',
      n: 'Look at the formula for the straight line method. Think about what is taken away from the cost before dividing by the life, and then fill in the blanks.',
    }),
    sl('concept', 'Advantages and limitations of each method', {
      b: 'No method is best for every asset; each has **advantages** and **limitations**.',
      v: vAdvLim,
      n: 'The straight line method is simple and gives an equal charge every year, but it ignores the fact that repairs rise as an asset ages. The written down value method charges more when the asset is new and repairs are low, so the total burden stays level. Its book value never becomes zero, and the calculation is longer.',
    }),
    sl('concept', 'Choosing a method', {
      b: 'Choose the method by **how the asset gives its service**.',
      v: vChoose,
      n: 'Assets that give even service over a fixed life, such as leases, patents, buildings and furniture, suit the straight line method. Vehicles, computers and machinery lose value fastest early and need more repairs later, so the written down value method suits them. A quickly outdated asset also suits it.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up. Depreciation is a fall in the book value of a fixed asset, spread over its life. Its causes are wear and tear, passage of time, obsolescence and depletion. The amount depends on cost, life and residual value. The straight line method charges the same amount every year. The written down value method charges a percentage of the falling book value.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Show the **formula** before the figures: (cost − scrap) ÷ life for straight line; rate × opening book value for written down value.',
        'Count the **months exactly**; write the months in the working, for example 8/12.',
        'For the written down value method, apply the rate to the **book value of that year**, never to the cost after year one.',
        'Name each **cause of depreciation** and add a one-line example when the question asks for causes.',
      ],
      n: 'In the examination, write the formula first and then the figures. Show the months used in a part year. Under the written down value method always apply the rate to the book value at the start of the year. When asked for causes, name each one and give a short example.',
    }),
  ],
});

// ================================================================ deck 2
export const deck2 = deck({
  part: 2,
  title: 'Depreciation — Part 2: Recording, Additions and Sale of Assets',
  goals: [
    'Record depreciation in the asset account and through a provision for depreciation account, over two or three years',
    'Charge depreciation on an asset added during the year',
    'Find the profit or loss on sale, with and without an asset disposal account',
  ],
  slides: [
    sl('title', 'Recording depreciation and selling assets', {
      b: 'Part 2: **charging depreciation to the asset** or to a **provision account**, **additions** during the year, and the **sale** of an asset.',
      v: vRoute2,
      n: 'Welcome to part two. Now we put depreciation into the books. There are two ways of recording it. After that we look at assets added during the year and at the sale of an asset, with the profit or loss on sale, with and without an asset disposal account.',
    }),
    sl('concept', 'Two ways of recording depreciation', {
      b: 'Depreciation can be **credited to the asset account**, or to a **provision for depreciation account** while the asset stays at cost.',
      v: vTwo,
      n: 'In the first way, depreciation is credited to the asset account itself, so the asset shows its book value. In the second way, the asset stays at cost and depreciation is credited to a provision for depreciation account. In both ways, the profit and loss account is debited with the depreciation of the year.',
    }),
    sl('example', 'Worked example 1: depreciation charged to the asset', {
      b: `**Sivaganga Stationers**, an imagined firm, buys furniture for ${rs(260000)} on 1 April 2026 and depreciates it at 15% a year on cost, crediting the asset. Pass the entries for the first year.`,
      bl: [`Depreciation = ${inr(260000)} × 15% = **${rs(39000)}** a year.`, 'The charge is moved to the profit and loss account at the year end.'],
      v: vSSj,
      n: `The furniture is bought for ${rupees(260000)}. Fifteen per cent of the cost is ${rupees(39000)}. The entry debits depreciation and credits furniture. At the year end depreciation is closed by debiting the profit and loss account. The furniture now stands at ${rupees(221000)}.`,
    }),
    sl('example', 'Worked example 1 continued: the asset account over three years', {
      b: 'The same charge is made every year, so the balance falls by the same amount.',
      bl: [`Balance carried down: ${inr(221000)}, ${inr(182000)}, ${inr(143000)}.`],
      v: vSSl,
      n: `Each year the account opens with the balance brought down, and depreciation of ${rupees(39000)} is credited. The balance carried down is ${rupees(221000)} after the first year, ${rupees(182000)} after the second and ${rupees(143000)} after the third. That last amount is the book value shown in the balance sheet.`,
    }),
    sl('concept', 'The provision method step by step', {
      b: 'The **asset account never shows depreciation**. The **provision account** collects it year after year.',
      v: vProvEntries,
      n: 'In the provision method the asset account is not touched by depreciation. Each year depreciation is debited and the provision for depreciation account is credited. At the end of the year depreciation is closed to the profit and loss account. In the balance sheet the asset is shown at cost, with the provision deducted.',
    }),
    sl('example', 'Worked example 2: machinery at cost and the provision', {
      b: `**Nanded Nurseries**, an imagined firm, buys machinery for ${rs(480000)} on 1 April 2026 and depreciates it at 15% a year on the written down value, keeping a provision account. Show the accounts for three years.`,
      bl: [`Depreciation: ${inr(72000)}, ${inr(61200)}, ${inr(52020)}.`, `Machinery A/c stays at ${inr(480000)} each year.`],
      v: vNNc,
      n: `Machinery was bought for ${rupees(480000)} and stays in the asset account at that cost in every year. Depreciation is not credited to it. So the account looks the same at the end of each year. The depreciation goes to the provision account instead.`,
    }),
    sl('example', 'Worked example 2 continued: the provision account', {
      b: `After three years the provision stands at **${rs(185220)}**, and the book value is ${rs(480000)} − ${rs(185220)} = **${rs(294780)}**.`,
      v: vNNp,
      n: `Written down value depreciation is fifteen per cent of ${rupees(480000)}, which is ${rupees(72000)}, in the first year. In the second year it is fifteen per cent of ${rupees(408000)}, which is ${rupees(61200)}. In the third year it is ${rupees(52020)}. The provision grows to ${rupees(185220)}. Cost less provision leaves a book value of ${rupees(294780)}.`,
    }),
    sl('check', 'Quick check: the provision account', {
      b: 'Choose the correct answer.',
      chk: 'm_chk_prov',
      n: 'A firm keeps its machinery at cost and credits depreciation to a provision account. Think about what the balance sheet shows for the machinery at the end of the year, and then choose.',
    }),
    sl('concept', 'Additions during the year', {
      b: 'Charge the **old assets** for the full year and the **new asset** only for the months it was in use.',
      v: vAdd,
      n: 'When an asset is added during the year, the old assets are depreciated for the full year. The new asset is depreciated only from the date of purchase. Count the months to the end of the year, multiply the annual charge by that number and divide by twelve.',
    }),
    sl('example', 'Worked example 3: plant added in the second year', {
      b: `**Vizianagaram Vessels**, an imagined firm, has plant costing ${rs(320000)} bought on 1 April 2026. It buys new plant for ${rs(160000)} on **1 October 2027**. Depreciation is 10% a year on cost, credited to the plant account. Find the charge for each year.`,
      bl: [`2027–28: old plant ${inr(32000)} + new plant ${inr(160000)} × 10% × 6/12 = ${inr(8000)}; total **${rs(40000)}**.`, `2028–29: ${inr(32000)} + ${inr(16000)} = **${rs(48000)}**.`],
      v: vVVw,
      n: `The old plant is charged for the full year every year, ${rupees(32000)}. The new plant was bought on the first of October, so it was used for six months in the second year. Ten per cent of ${rupees(160000)} for six months is ${rupees(8000)}. The second year total is therefore ${rupees(40000)}, and the third year total is ${rupees(48000)}.`,
    }),
    sl('example', 'Worked example 3 continued: the plant account, second year', {
      b: 'Opening balance, the new purchase and the full year\'s charge appear in **one account**.',
      v: vVVl,
      n: `The plant account opens with ${rupees(288000)}, the book value of the old plant. The new plant adds ${rupees(160000)}. The year's depreciation of ${rupees(40000)} is credited. The balance carried down is ${rupees(408000)}, and it becomes the opening balance of the third year.`,
    }),
    sl('concept', 'Sale of an asset: book value, profit and loss', {
      bl: ['Charge depreciation **up to the date of sale**.', '**Book value** = cost − accumulated depreciation.', 'Sale price > book value: **profit**; sale price < book value: **loss**.'],
      v: vSaleRule,
      n: 'When an asset is sold, first charge depreciation up to the date of sale, counting the months used in that year. The book value is cost less all depreciation to that date. If the sale price is more than the book value there is a profit, and if it is less there is a loss. The result is taken to the profit and loss account.',
    }),
    sl('example', 'Worked example 4: a loss on sale, no disposal account', {
      b: `**Aizawl Appliances**, an imagined firm, bought machine A for ${rs(300000)} on 1 April 2026 and machine B for ${rs(160000)} on 1 October 2026. It writes machinery down at 20% on the written down value, crediting the asset. Machine B is sold on **1 July 2028** for ${rs(100000)}. Find the loss on sale.`,
      bl: [`Book value of B on 1 July 2028 = **${rs(109440)}**.`, `Loss = ${inr(109440)} − ${inr(100000)} = **${rs(9440)}**.`],
      v: vAAw,
      n: `Machine B was used for six months in the first year, twelve in the second, and three in the third, up to the first of July. The charges are ${rupees(16000)}, ${rupees(28800)} and ${rupees(5760)}. The book value on the day of sale is ${rupees(109440)}. It was sold for ${rupees(100000)}, so the loss is ${rupees(9440)}.`,
    }),
    sl('example', 'Worked example 4 continued: the Machinery account', {
      b: `Machine A has ${inr(38400)} of depreciation for the year, and machine B ${inr(5760)}, so the account is credited with ${rs(44160)}.`,
      v: vAAl,
      n: `In the year of sale the machinery account opens with the book value of both machines. Depreciation of ${rupees(44160)} is credited, being the charge on machine A for the year and on machine B up to the date of sale. The sale proceeds are credited too, and the loss on sale is credited as well. The balance carried down is the book value of machine A, ${rupees(153600)}.`,
    }),
    sl('check', 'Quick check: profit or loss', {
      b: 'True or false?',
      chk: 'tf_chk_disp',
      n: 'An asset is sold for less than its book value on the date of sale. Think about whether this is a profit or a loss, and which account is debited.',
    }),
    sl('concept', 'The asset disposal account', {
      b: 'When a provision account is kept, the sale goes through an **Asset Disposal Account**, which collects the cost, the accumulated depreciation, the sale price and the result.',
      v: vDisp,
      n: 'When the asset is kept at cost and a provision is used, a sale is recorded through an asset disposal account. The cost of the asset is debited to it. The accumulated depreciation on that asset is credited, and so is the sale price. The balancing figure is the profit or loss, which is transferred to the profit and loss account.',
    }),
    sl('example', 'Worked example 5: a profit on sale with a disposal account', {
      b: `**Dindigul Dairies**, an imagined firm, bought machine A for ${rs(400000)} on 1 April 2026 and machine B for ${rs(280000)} on 1 July 2026, depreciates at 10% a year on cost and keeps a provision account. Machine B is sold on **1 January 2029** for ${rs(225000)}. Find the profit.`,
      bl: [`Machine B: ${inr(21000)} + ${inr(28000)} + ${inr(21000)} = ${inr(70000)} of depreciation (9, 12 and 9 months).`, `Book value ${inr(280000)} − ${inr(70000)} = ${inr(210000)}; profit = ${inr(225000)} − ${inr(210000)} = **${rs(15000)}**.`],
      v: vDDw,
      n: `Machine B was bought on the first of July, so it was used for nine months in the first year. Then twelve months, then nine months up to the first of January. The charges are ${rupees(21000)}, ${rupees(28000)} and ${rupees(21000)}, a total of ${rupees(70000)}. The book value is ${rupees(210000)}. Selling for ${rupees(225000)} gives a profit of ${rupees(15000)}.`,
    }),
    sl('example', 'Worked example 5 continued: the Asset Disposal account', {
      b: 'The account closes with nothing left: **cost + profit** on one side equals **provision + sale price** on the other.',
      v: vDDd,
      n: `The asset disposal account is debited with the cost of machine B, ${rupees(280000)}, and with the profit of ${rupees(15000)}. It is credited with the accumulated depreciation, ${rupees(70000)}, and the sale price, ${rupees(225000)}. Both sides total ${rupees(295000)}, so the account is closed.`,
    }),
    sl('example', 'Worked example 5 continued: what stays in the provision', {
      b: `Machine B\'s ${inr(70000)} leaves the provision. Only machine A\'s ${rs(120000)} remains in the balance.`,
      v: vDDp,
      n: `In the year of sale the provision account is debited with seventy thousand rupees, the accumulated depreciation of the machine sold. This amount goes to the asset disposal account. The balance of ${rupees(120000)} belongs to machine A, which is still in use. This keeps the provision equal to the depreciation on the assets held.`,
    }),
    sl('check', 'Quick check: completing the entry', {
      b: 'Complete the sentence.',
      chk: 'fb_chk_sale',
      n: 'Look at how a sale is recorded in the asset disposal account. Think about which amount is debited to it first, and which side the sale price is entered on, and then fill in the blanks.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up. Depreciation can be credited to the asset or to a provision account, and the book value is the same either way. An addition is depreciated only for the months it is used. On a sale, charge depreciation to the date of sale, find the book value, and compare it with the price. A disposal account collects the cost, the provision, the price and the result.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Show the **months** and the **base** in every part-year charge.',
        'When a provision is kept, **reduce it** by the accumulated depreciation of the asset sold.',
        'Write the **book value at sale** as a separate line before the profit or loss.',
        'Balance every account with **c/d and b/d**, and check that the disposal account closes.',
      ],
      n: 'In the examination, show the months and the base for each part-year charge. When a provision is kept, reduce it by the depreciation on the asset sold. Show the book value on the date of sale as a separate line. Balance every account with balance carried down and balance brought down, and check that the disposal account closes.',
    }),
  ],
});

// visuals reused by the notes
export {
  vMeaning, vNeed, vCauses, vChars, vFactors, vTT, vSlm, vWdv, vPF, vMonths, vBF, vHH, vAdvLim, vChoose, vSummary1,
  vTwo, vSSj, vSSl, vNNc, vNNp, vNNbs, vSide, vAdd, vVVw, vVVl, vSale, vSaleRule, vAAw, vAAl, vAAj, vDisp, vDDw, vDDd, vDDp, vDDj, vSummary2,
};

