// ISC 12 Accounts, ch08 Redemption of Debentures — question bank.
// Every company and figure is imagined by SOYL and labelled as such; no textbook illustration or exercise
// and no CISCE specimen or past-paper item is reused. Every amount is computed with acc.mjs from the givens
// and checked there (entries balance; the reserve reaches 10% of outstanding debentures, or the full face
// value when redemption is wholly out of profits; the investment is at least 15% of the debentures
// maturing in the year; after redemption the Debentures, Premium on Redemption, Debentureholders,
// investment and reserve accounts close at nil and the bank moves by interest earned less the amount
// repaid). The expected values pinned below (hand-checked) catch any drift. Redemption by draw of lots is
// tested as concepts only, following the ISC 2027 syllabus.
import { Q, mcq, ar, tf, fb, match, num, short, long } from './lib.mjs';
import { rs, inr, check, journal, tAccount, note, mdTable, interestFor, pct, drrNeeded, driNeeded, redeem, retained, KINDS, debAc, SURPLUS, DRR, DRI, IDRI, GR, DH, BANK, PRD, PL } from './acc.mjs';

const eq = (a, b, what) => check(JSON.stringify(a) === JSON.stringify(b), `${what}: got ${JSON.stringify(a)}, expected ${JSON.stringify(b)}`);
const J = (entries) => journal(entries).md;
const RULE = 'Rule 18(7) of the Companies (Share Capital and Debentures) Rules, 2014, as amended in 2019';

// ================================================================ t01 Debenture Redemption Reserve
Q('m_drr_section', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Cheriyal Scroll Paints Ltd, an imagined unlisted company at Cheriyal, must create a Debenture Redemption Reserve for its 9% debentures. Section 71(4) of the Companies Act, 2013 requires this reserve to be created out of',
  opts: ['the profits of the company available for payment of dividend', 'the securities premium collected on its shares', 'the money raised by the debenture issue itself', 'the capital reserve that arose when it bought a business'],
  sol: 'Section 71(4) says the reserve comes out of profits available for dividend, and what is credited to it may be used only to redeem debentures.',
}));

Q('m_drr_nbfc', mcq({
  t: [1, 2], d: 3, c: 'understanding',
  stem: `Venkatagiri Gold Loans Ltd, an imagined unlisted non-banking financial company registered with the Reserve Bank of India, has raised money through privately placed debentures. Under ${RULE}, the company`,
  opts: ['need neither create a Debenture Redemption Reserve nor make a Debenture Redemption Investment', 'must create the reserve at 10% but need not make the investment', 'need not create the reserve but must invest 15% of the debentures maturing each year', 'must create the reserve and make the investment like any other unlisted company'],
  sol: 'Unlisted NBFCs and housing finance companies are exempt from both requirements for privately placed debentures; the 10% reserve and the 15% investment are for other unlisted companies.',
}));

const MDU = drrNeeded({ kind: 'unlisted', outstanding: 3600000 });
eq([MDU.required, MDU.transfer], [360000, 360000], 'm_drr_unlisted_amt');
Q('m_drr_unlisted_amt', mcq({
  t: 1, d: 2, c: 'application',
  stem: `Pipli Festival Canopies Ltd, an imagined unlisted manufacturing company, has 8% debentures of ${rs(3600000)} outstanding and nothing yet in a Debenture Redemption Reserve. Under ${RULE}, the minimum balance it must build up in that reserve is`,
  opts: [rs(MDU.required), rs(pct(15, 3600000)), rs(3600000), rs(pct(5, 3600000))],
  sol: `The reserve must be at least 10% of the outstanding debentures: 10% × ${rs(3600000)} = ${rs(MDU.required)}. Fifteen per cent is the rate for the investment, and it applies only to debentures maturing in the year.`,
}));

Q('m_drr_use', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Raghurajpur Palm-Leaf Crafts Ltd, an imagined unlisted company, has a balance in its Debenture Redemption Reserve. Under Section 71(4) of the Companies Act, 2013, this balance may be used',
  opts: ['only for redeeming debentures', 'to pay a dividend in a year of low profit', 'to write off the loss on issue of debentures', 'to issue fully paid bonus shares'],
  sol: 'The Act says the amount credited to the reserve shall not be used except for the redemption of debentures.',
}));

Q('tf_listed_drr', tf({
  t: 1, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? Molela Terracotta Ltd, an imagined listed company that is neither a bank nor a financial institution, must transfer 10% of its outstanding debentures to a Debenture Redemption Reserve under the rules as amended in 2019.',
  sol: 'Since the 2019 amendment, a listed company need not create the reserve. It must still invest or deposit at least 15% of the debentures maturing during the year.',
}));

Q('ar_drr_dividend', ar({
  t: [1, 3], d: 3, c: 'analysis', key: 'a',
  a: 'Navalgund Durries Ltd, an imagined unlisted company, has less profit available for dividend this year after it transfers ₹1,50,000 to its Debenture Redemption Reserve.',
  r: 'A Debenture Redemption Reserve is created out of profits available for dividend, and the amount credited to it can be used only for redeeming debentures.',
  sol: 'Both are true. Because the transfer comes out of distributable profit and is locked for redemption, that part of the profit can no longer be paid out; R explains A.',
}));

const NDS = drrNeeded({ kind: 'unlisted', outstanding: 2400000, existing: 110000 });
eq([NDS.required, NDS.transfer], [240000, 130000], 'n_drr_short');
Q('n_drr_short', num({
  t: 1, d: 2, c: 'application', value: NDS.transfer, unit: '₹',
  stem: `Swamimalai Bronze Castings Ltd, an imagined unlisted company, has 10% debentures of ${rs(2400000)} outstanding and ${rs(110000)} already in its Debenture Redemption Reserve. How much more must it transfer from its surplus to reach the minimum reserve (in ₹)?`,
  sol: `Minimum = 10% × ${rs(2400000)} = ${rs(NDS.required)}; further transfer = ${inr(NDS.required)} − ${inr(110000)} = ${rs(NDS.transfer)}.`,
}));

const NDT = drrNeeded({ kind: 'unlisted', outstanding: 1500000 + 700000, existing: 145000 });
eq([NDT.required, NDT.transfer], [220000, 75000], 'n_drr_two');
Q('n_drr_two', num({
  t: 1, d: 3, c: 'application', value: NDT.transfer, unit: '₹',
  stem: `Athangudi Tiles Ltd, an imagined unlisted company, has two series outstanding: 9% debentures of ${rs(1500000)} and 11% debentures of ${rs(700000)}. Its Debenture Redemption Reserve already holds ${rs(145000)}. Find the further transfer needed to bring the reserve to the statutory minimum (in ₹).`,
  sol: `The 10% applies to all outstanding debentures: 10% × ${rs(1500000 + 700000)} = ${rs(NDT.required)}; less ${inr(145000)} already held = ${rs(NDT.transfer)}.`,
}));

Q('fb_drr_pct', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'Under the rules as amended in 2019, Longpi Black Pottery Ltd, an imagined unlisted company at Ukhrul, must keep a Debenture Redemption Reserve of at least ___ per cent of the value of its outstanding debentures.',
  acc: [['10', 'ten']],
  sol: 'An unlisted company outside the exempt classes keeps a reserve of 10 per cent of its outstanding debentures, created out of profits available for dividend.',
}));

const S2E = drrNeeded({ kind: 'unlisted', outstanding: 1800000, existing: 80000 });
eq([S2E.required, S2E.transfer], [180000, 100000], 's2_drr_entry');
check(S2E.transfer <= 640000, 's2_drr_entry surplus covers the transfer');
Q('s2_drr_entry', short({
  t: 1, d: 2, c: 'application', marks: 2,
  stem: `Bhujodi Shawls Ltd, an imagined unlisted company in Kachchh, has ${inr(18000)} 9% debentures of ₹100 each, to be redeemed in one lump sum on 31 March 2027. Its Debenture Redemption Reserve stood at ${rs(80000)} on 1 April 2025, and its surplus available for dividend was ${rs(640000)}. On 31 March 2026 the company transfers the amount needed to reach the statutory minimum. Calculate the transfer and pass the journal entry.`,
  model: `Minimum reserve = 10% × ${rs(1800000)} = ${rs(S2E.required)}; already held ${rs(80000)}; transfer = **${rs(S2E.transfer)}** (the surplus of ${rs(640000)} is enough).\n\n${J([{ date: '31 Mar 2026', dr: [[SURPLUS, S2E.transfer]], cr: [[DRR, S2E.transfer]], nar: 'profits transferred to bring the reserve up to ten per cent of the outstanding debentures' }])}`,
  sol: 'Ten per cent of what is outstanding, less what the reserve already holds, comes out of the surplus.',
  scheme: [['Minimum reserve and transfer calculated', 1], ['Journal entry', 1]],
}));

Q('s2_drr_meaning', short({
  t: [1, 3], d: 2, c: 'understanding', marks: 2,
  stem: 'A director of Thirubuvanam Silk House Ltd, an imagined unlisted company, asks why profits must be moved into a Debenture Redemption Reserve when the debentures will in any case be repaid from the bank. Give two reasons for creating the reserve.',
  model: '1. **It protects the debentureholders.** Profits credited to the reserve cannot be distributed as dividend, so resources equal to that amount stay in the business until the debentures are repaid.\n\n2. **The law requires it.** Section 71(4) of the Companies Act, 2013 and Rule 18(7) make an unlisted company (other than an exempt NBFC or housing finance company) keep at least 10% of its outstanding debentures in the reserve, which may be used only for redemption; once the debentures are repaid, the reserve is moved to General Reserve.',
  sol: 'One reason is about keeping resources in the business for the lenders; the other is the statutory duty and its limit on use.',
  scheme: [['Protection of debentureholders: profits kept back from dividend', 1], ['Statutory requirement with the 10% minimum and restricted use', 1]],
}));

const FOUR = [
  ['Natungram Wood Owls Ltd', 'listed'],
  ['Manjusha Silk Prints Ltd', 'unlisted'],
  ['Kovai Urban Bank Ltd', 'bank'],
  ['Narayanpet Home Finance Ltd', 'nbfc'],
].map(([name, kind]) => ({ name, kind, drr: drrNeeded({ kind, outstanding: 3000000 }).required, dri: driNeeded({ kind, maturing: 1000000 }) }));
eq(FOUR.map((x) => [x.drr, x.dri]), [[0, 150000], [300000, 150000], [0, 0], [0, 0]], 's3_four_companies');
Q('s3_four_companies', short({
  t: [1, 2], d: 3, c: 'analysis', marks: 3,
  stem: `Four imagined companies each have debentures of ${rs(3000000)} outstanding, of which ${rs(1000000)} mature during the year ending 31 March 2027: Natungram Wood Owls Ltd, a listed company; Manjusha Silk Prints Ltd, an unlisted manufacturing company; Kovai Urban Bank Ltd, a banking company; and Narayanpet Home Finance Ltd, an unlisted housing finance company whose debentures were privately placed. Under ${RULE}, find for each the minimum Debenture Redemption Reserve and the minimum Debenture Redemption Investment to be made by 30 April 2026.`,
  model: `${mdTable(['Company', 'Class under the rule', 'Minimum reserve (₹)', 'Minimum investment by 30 April 2026 (₹)'], FOUR.map((x) => [x.name, KINDS[x.kind].label, x.drr ? inr(x.drr) : 'Nil', x.dri ? inr(x.dri) : 'Nil']), [2, 3])}\n\nWorking: reserve = 10% of ${rs(3000000)} outstanding (unlisted company only); investment = 15% of the ${rs(1000000)} maturing in the year (listed and other unlisted companies). Kovai (a banking company) and Narayanpet (an unlisted HFC on private placement) need neither.`,
  sol: 'Classify each company first; the percentages follow from its class.',
  scheme: [['Listed and unlisted companies classified correctly', 1], ['Reserve and investment amounts for the unlisted company', 1], ['Listed company investment and the two exemptions', 1]],
}));

const MEX = { out: 1000000 };
eq([retained(MEX.out, 'statutory'), retained(MEX.out, 'profits')], [100000, 1000000], 'match_exempt');
Q('match_exempt', match({
  t: [1, 2, 3], d: 2, c: 'understanding', marks: 2,
  stem: 'Match each imagined debenture issuer near Jeypore with the reserve and investment it must provide before repaying its debentures.',
  pairs: [
    ['Jeypore Coffee Curing Ltd, an unlisted manufacturing company', 'Reserve of 10% of outstanding debentures, and an investment of 15% of those maturing'],
    ['Similipal Honey Ltd, a listed company', 'No reserve, but an investment of 15% of the debentures maturing'],
    ['Kotpad Rural Bank Ltd, a banking company', 'Neither the reserve nor the investment'],
    ['Khiching Stone Crafts Ltd, an unlisted company redeeming wholly out of profits', 'Reserve equal to the full face value to be redeemed, and the 15% investment'],
  ],
  sol: 'The class of company decides whether the reserve and the investment apply; choosing to redeem wholly out of profits raises the reserve to the full face value.',
}));

Q('m_drr_bs', mcq({
  t: [1, 2], d: 2, c: 'understanding',
  stem: 'In the Balance Sheet of Cherthala Coconut Oil Ltd, an imagined unlisted company, the Debenture Redemption Reserve and the Debenture Redemption Investment are shown, respectively, under',
  opts: ['Reserves and Surplus; Current investments', 'Long-term borrowings; Reserves and Surplus', 'Current investments; Reserves and Surplus', 'Other long-term liabilities; Long-term provisions'],
  sol: 'The reserve is retained profit, part of shareholders’ funds. The investment is an asset held to be realised for the redemption within the year, so SOYL shows it under current investments, as most school texts do.',
}));

// ================================================================ t02 Debenture Redemption Investment
Q('m_dri_pct', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'Tarakasi Silverware Ltd, an imagined unlisted company, has debentures maturing during the year ending 31 March 2027. The Debenture Redemption Investment it must make for them is at least',
  opts: ['15% of the debentures maturing during that year', '10% of all its outstanding debentures', '25% of the debentures maturing during that year', '15% of all the debentures it has ever issued'],
  sol: 'Rule 18(7) fixes the investment or deposit at not less than 15% of the amount of debentures maturing during the year ending on the next 31 March.',
}));

Q('m_dri_date', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'The 10% debentures of Dokra Brass Figures Ltd, an imagined unlisted company, mature on 15 February 2027. The company must make its Debenture Redemption Investment for them on or before',
  opts: ['30 April 2026', '31 March 2027', '15 February 2027', '30 April 2027'],
  sol: 'The debentures mature in the year ending 31 March 2027, so the investment is due by 30 April 2026, at the start of that year.',
}));

Q('m_dri_forms', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Chunar Sandstone Ltd, an imagined unlisted company, is choosing where to place its Debenture Redemption Investment. Which of these is NOT a permitted form under Rule 18(7)?',
  opts: ['Equity shares of a listed company', 'A deposit with a scheduled bank, free from any charge or lien', 'Unencumbered securities of the Central Government', 'Unencumbered securities of a State Government'],
  sol: 'The rule allows scheduled bank deposits free from charge or lien, unencumbered Central or State Government securities, and unencumbered trust securities and notified bonds under the Indian Trusts Act, 1882. Equity shares are not among them.',
}));

const MDA = driNeeded({ kind: 'unlisted', maturing: 1400000 });
eq(MDA, 210000, 'm_dri_amt');
Q('m_dri_amt', mcq({
  t: 2, d: 2, c: 'application',
  stem: `Nagina Wood Carvers Ltd, an imagined unlisted company, has debentures of ${rs(4000000)} outstanding, of which ${rs(1400000)} mature on 31 January 2027. The minimum Debenture Redemption Investment it must make by 30 April 2026 is`,
  opts: [rs(MDA), rs(pct(15, 4000000)), rs(pct(10, 1400000)), rs(pct(10, 4000000))],
  sol: `Only the debentures maturing in the year count: 15% × ${rs(1400000)} = ${rs(MDA)}.`,
}));

Q('m_dri_exempt', mcq({
  t: [1, 2], d: 2, c: 'understanding',
  stem: 'Four imagined companies in Tamil Nadu have debentures outstanding. Which of them is exempt from BOTH the Debenture Redemption Reserve and the Debenture Redemption Investment?',
  opts: ['Arani Silk Bank Ltd, a banking company', 'Nachiarkoil Lamps Ltd, a listed company', 'Kallar Cotton Ginners Ltd, an unlisted manufacturing company', 'Vellakoil Poultry Feeds Ltd, an unlisted feed maker'],
  sol: 'Banking companies and All India Financial Institutions are outside both requirements. A listed company still makes the 15% investment, and an ordinary unlisted company needs both.',
}));

Q('fb_dri_date', fb({
  t: 2, d: 1, c: 'recall',
  stem: 'Pilkhuwa Handloom Ltd, an imagined unlisted company, must make its Debenture Redemption Investment for the debentures maturing in a year on or before 30 ___ of that year.',
  acc: [['April']],
  sol: 'The deadline is 30 April, at the start of the year in which the debentures mature.',
}));

const NDW = driNeeded({ kind: 'unlisted', maturing: 600000 });
eq(NDW, 90000, 'n_dri_two');
Q('n_dri_two', num({
  t: 2, d: 3, c: 'application', value: NDW, unit: '₹',
  stem: `Kuthampully Weaves Ltd, an imagined unlisted company, has two series of debentures: Series A 10% debentures of ${rs(600000)} maturing on 30 September 2026, and Series B 9% debentures of ${rs(1000000)} maturing on 31 March 2028. Find the minimum Debenture Redemption Investment it must make on or before 30 April 2026 (in ₹).`,
  sol: `Only Series A matures in the year ending 31 March 2027: 15% × ${rs(600000)} = ${rs(NDW)}. Series B is provided for in a later year.`,
}));

Q('ar_dri_charge', ar({
  t: 2, d: 3, c: 'analysis', key: 'c',
  a: 'Balaramapuram Handlooms Ltd, an imagined unlisted company, keeps its Debenture Redemption Investment as a fixed deposit with a scheduled bank, free from any charge or lien.',
  r: 'The Debenture Redemption Investment is part of Reserves and Surplus in the Balance Sheet of Balaramapuram Handlooms Ltd.',
  sol: 'A is true: such a deposit is a permitted form. R is false: the investment is an asset, not a reserve; it is the Debenture Redemption Reserve that sits under Reserves and Surplus.',
}));

Q('ar_dri_vs_drr', ar({
  t: [1, 2], d: 3, c: 'analysis', key: 'b',
  a: 'The ₹2,00,000 balance in the Debenture Redemption Reserve of Chendamangalam Coir Ltd, an imagined unlisted company, does not by itself set aside any money for repaying its debentures.',
  r: 'A Debenture Redemption Reserve may be used only for the redemption of debentures.',
  sol: 'Both are true, but R does not explain A. A is true because a reserve is only retained profit on the liabilities side; actual money is set aside through the separate Debenture Redemption Investment.',
}));

const S2D = { amt: driNeeded({ kind: 'unlisted', maturing: 1200000 }) };
S2D.int = interestFor(S2D.amt, 8, 8);
eq([S2D.amt, S2D.int], [180000, 9600], 's2_dri_entries');
Q('s2_dri_entries', short({
  t: [2, 4], d: 2, c: 'application', marks: 2,
  stem: `Kallakurichi Fruit Pulp Ltd, an imagined unlisted company, has 9% debentures of ${rs(1200000)} due for redemption in one lump sum on 31 December 2025. On 30 April 2025 it deposits the minimum Debenture Redemption Investment with a scheduled bank at 8% a year, and encashes the deposit with interest on 31 December 2025 (ignore tax deducted at source). Pass the journal entries for the deposit and its encashment.`,
  model: `Deposit = 15% × ${rs(1200000)} = ${rs(S2D.amt)}; interest = ${inr(S2D.amt)} × 8% × 8/12 = ${rs(S2D.int)}.\n\n${J([
    { date: '30 Apr 2025', dr: [[DRI, S2D.amt]], cr: [[BANK, S2D.amt]], nar: 'fifteen per cent of the debentures maturing this year deposited with a scheduled bank' },
    { date: '31 Dec 2025', dr: [[BANK, S2D.amt + S2D.int]], cr: [[DRI, S2D.amt], [IDRI, S2D.int]], nar: 'deposit encashed with interest for eight months at 8% a year' },
  ])}`,
  sol: 'Fifteen per cent of the maturing amount goes out of the bank in April and returns with eight months of interest.',
  scheme: [['Deposit calculated and recorded', 1], ['Encashment with interest', 1]],
}));

Q('s2_drr_vs_dri', short({
  t: [1, 2], d: 2, c: 'understanding', marks: 2,
  stem: 'The accountant of Kangeyam Cotton Mills Ltd, an imagined unlisted company, keeps both a Debenture Redemption Reserve and a Debenture Redemption Investment. Distinguish between the two on any two points.',
  model: mdTable(['Point', 'Debenture Redemption Reserve', 'Debenture Redemption Investment'], [
    ['Nature', 'A reserve: profit kept back, shown under Reserves and Surplus (equity and liabilities side)', 'An asset: money actually deposited or invested, shown under current investments (assets side)'],
    ['Amount', 'At least 10% of the outstanding debentures (unlisted companies only)', 'At least 15% of the debentures maturing during the year (listed and unlisted companies)'],
    ['Entry', `${SURPLUS} Dr. To Debenture Redemption Reserve A/c`, 'Debenture Redemption Investment A/c Dr. To Bank A/c'],
    ['After redemption', 'Transferred to General Reserve', 'Encashed and used to pay the debentureholders'],
  ]),
  sol: 'Contrast what each is, how much is required, and what happens to it.',
  scheme: [['First valid point of difference', 1], ['Second valid point of difference', 1]],
}));

Q('tf_dri_use', tf({
  t: 2, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? Pathanapuram Cashew Shellers Ltd, an imagined unlisted company, may encash its Debenture Redemption Investment midway through the year to buy a new shelling machine, as long as it replaces the money before the debentures mature.',
  sol: 'The investment may be used only to redeem debentures maturing during that year, and it must not fall below 15% of those debentures at any time.',
}));

const S3K = redeem({ n: 9000, rate: 10, kind: 'unlisted', drrOpen: 90000, driRate: 8, driMonths: 11, toGR: false, dates: { open: '1 Apr 2025', dri: '30 Apr 2025', due: '31 Mar 2026', close: '31 Mar 2026' }, driForm: 'unencumbered Central Government securities' });
eq([S3K.driAmt, S3K.interest, S3K.transfer], [135000, 9900, 0], 's3_dri_interest');
const S3Kdri = S3K.led.render(DRI);
const S3Kint = S3K.led.render(IDRI);
Q('s3_dri_interest', short({
  t: [2, 4], d: 3, c: 'application', marks: 3,
  stem: `Kolanupaka Copperware Ltd, an imagined unlisted company, has ${inr(9000)} 10% debentures of ₹100 each due for redemption on 31 March 2026. Its Debenture Redemption Reserve already holds ${rs(90000)}. On 30 April 2025 it invests the minimum required in unencumbered Central Government securities earning 8% a year, and on 31 March 2026 it sells them at cost and receives 11 months' interest. Pass the journal entries for the investment, its encashment and the transfer of the interest at the year end, and prepare the Debenture Redemption Investment Account and the Interest on Debenture Redemption Investment Account.`,
  model: `Investment = 15% × ${rs(S3K.nominal)} = ${rs(S3K.driAmt)}; interest = ${inr(S3K.driAmt)} × 8% × 11/12 = ${rs(S3K.interest)}.\n\n${J([S3K.e.invest, S3K.e.encash, S3K.e.toPL])}\n\n**Debenture Redemption Investment Account**\n\n${S3Kdri.md}\n\n**Interest on Debenture Redemption Investment Account**\n\n${S3Kint.md}`,
  sol: 'Fifteen per cent of the maturing debentures is invested and comes back at cost; the interest earned is income closed to the Statement of Profit and Loss.',
  scheme: [['Investment and encashment entries with the interest', 1], ['Interest transferred to the Statement of Profit and Loss', 1], ['Both ledger accounts', 1]],
}));

// ================================================================ t03 Out of profits and out of capital
Q('m_out_of_capital', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Kuntala Teak Furniture Ltd, an imagined listed company, redeems its 9% debentures out of capital. This means that',
  opts: ['no part of its profits is transferred to a Debenture Redemption Reserve for these debentures', 'the debentures are repaid by issuing new equity shares', 'an amount equal to the face value is transferred from profits to a reserve', 'the debentures are converted into share capital'],
  sol: 'Out of capital, the company repays from its available funds without keeping back any profit for the purpose; this is open only to a company exempt from the reserve, such as a listed company.',
}));

const MOP = redeem({ n: 25000, rate: 9, kind: 'unlisted', source: 'profits', drrOpen: 250000 });
eq([MOP.transfer, MOP.drrTotal], [2250000, 2500000], 'm_out_of_profits_amt');
Q('m_out_of_profits_amt', mcq({
  t: 3, d: 3, c: 'application',
  stem: `Basar Turmeric Ltd, an imagined unlisted company, has 9% debentures of ${rs(MOP.nominal)} due next year and already holds the statutory ${rs(MOP.drrOpen)} in its Debenture Redemption Reserve. Its board now decides to redeem them wholly out of profits. The further transfer to the reserve before redemption is`,
  opts: [rs(MOP.transfer), rs(MOP.nominal), rs(MOP.drrOpen), rs(pct(15, MOP.nominal))],
  sol: `Wholly out of profits, the reserve must equal the face value redeemed: ${inr(MOP.nominal)} − ${inr(MOP.drrOpen)} already held = ${rs(MOP.transfer)}.`,
}));

Q('m_who_capital', mcq({
  t: [1, 3], d: 3, c: 'analysis',
  stem: 'Four imagined Telangana companies will repay their debentures next year. Which of them may redeem wholly out of capital, transferring no profit to a Debenture Redemption Reserve?',
  opts: ['Pochera Granite Ltd, a listed company', 'Utnoor Tribal Crafts Ltd, an unlisted manufacturing company', 'Laknavaram Lake Resorts Ltd, an unlisted hotel company', 'Ramappa Stone Polishers Ltd, an unlisted trading company'],
  sol: 'An unlisted company outside the exempt classes must keep at least 10% in the reserve, so its redemption is at least partly out of profits. A listed company needs no reserve and may redeem wholly out of capital (it still makes the 15% investment).',
}));

const MSRC = { out: 1000000 };
eq([retained(MSRC.out, 'capital'), retained(MSRC.out, 'statutory'), retained(MSRC.out, 'profits')], [0, 100000, 1000000], 'match_source');
Q('match_source', match({
  t: 3, d: 2, c: 'understanding', marks: 2,
  stem: `Match each way of redeeming the ${rs(MSRC.out)} debentures of Mannar Brass Lamps Ltd, an imagined company, with what happens to its profits.`,
  pairs: [
    ['Redemption out of capital (the company is listed)', 'No profit is transferred; the reserve stays at nil'],
    ['Redemption partly out of profits (unlisted, statutory minimum)', `${rs(retained(MSRC.out, 'statutory'))} transferred to Debenture Redemption Reserve`],
    ['Redemption wholly out of profits', `${rs(retained(MSRC.out, 'profits'))} transferred to Debenture Redemption Reserve`],
    ['After the redemption is complete', 'The reserve is transferred to General Reserve'],
  ],
  sol: 'The source decides how much profit is kept back before repayment: none, the statutory ten per cent, or the full face value.',
}));

Q('tf_capital_gr', tf({
  t: 3, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? When Araku Valley Millets Ltd, an imagined listed company, redeems its debentures wholly out of capital, it transfers an amount equal to their face value to General Reserve after the redemption.',
  sol: 'Out of capital, no profit was kept back in a reserve, so there is nothing to move to General Reserve; that transfer follows only a redemption out of profits.',
}));

const NRT = redeem({ n: 16000, rate: 10, kind: 'unlisted', source: 'statutory' });
eq([NRT.transfer, NRT.drrTotal], [160000, 160000], 'n_retained');
Q('n_retained', num({
  t: [1, 3], d: 2, c: 'application', value: NRT.drrTotal, unit: '₹',
  stem: `Lambasingi Strawberries Ltd, an imagined unlisted company with no Debenture Redemption Reserve so far, will redeem its 10% debentures of ${rs(NRT.nominal)} partly out of profits, keeping only the statutory minimum reserve. By how much will its General Reserve rise once the redemption is complete (in ₹)?`,
  sol: `The reserve built is 10% × ${rs(NRT.nominal)} = ${rs(NRT.drrTotal)}, and the whole of it moves to General Reserve after redemption.`,
}));

Q('s2_profits_vs_capital', short({
  t: 3, d: 2, c: 'understanding', marks: 2,
  stem: 'Maredumilli Bamboo Ltd, an imagined company, is weighing how to fund the repayment of its debentures. Give two differences between redemption out of profits and redemption out of capital.',
  model: mdTable(['Point', 'Out of profits', 'Out of capital'], [
    ['Transfer to reserve', 'An amount equal to the face value redeemed (or, partly, the statutory 10%) is moved from the surplus to Debenture Redemption Reserve', 'No profit is moved to a reserve'],
    ['Effect on dividend', 'Profit available for dividend falls by the amount kept back', 'Profit available for dividend is unchanged'],
    ['After redemption', 'The reserve becomes General Reserve: resources stay in the business', 'Nothing to transfer; the funds paid out are not replaced by retained profit'],
    ['Who may use it', 'Any company; an unlisted company must at least keep the statutory 10%', 'Only a company exempt from the reserve, such as a listed company'],
  ]),
  sol: 'Compare the transfer, the effect on distributable profit and what remains after repayment.',
  scheme: [['First valid difference', 1], ['Second valid difference', 1]],
}));

const S2L = redeem({ n: 6000, rate: 9, kind: 'listed', source: 'capital', dates: { dri: '30 Apr 2025', due: '31 Dec 2025' } });
eq([S2L.driAmt, S2L.transfer, S2L.repayable], [90000, 0, 600000], 's2_listed_capital');
Q('s2_listed_capital', short({
  t: [2, 3], d: 2, c: 'application', marks: 2,
  stem: `Pakhal Lake Fisheries Ltd, an imagined listed company, has ${inr(6000)} 9% debentures of ₹100 each due for redemption at par on 31 December 2025, to be redeemed out of capital. On 30 April 2025 it deposits the minimum required with a scheduled bank. Pass the journal entries for the deposit and for the redemption (ignore interest on the deposit).`,
  model: `As a listed company it needs no Debenture Redemption Reserve, but it must deposit 15% × ${rs(S2L.nominal)} = ${rs(S2L.driAmt)}.\n\n${J(S2L.entries)}`,
  sol: 'No transfer from profits for a listed company; only the deposit, its encashment and the repayment.',
  scheme: [['Deposit made and encashed', 1], ['Amount due and paid to debentureholders', 1]],
}));

const S3P = redeem({ n: 12000, rate: 9, kind: 'unlisted', source: 'profits', drrOpen: 120000, surplus: 1540000, dates: { open: '1 Apr 2025', drr: '1 Apr 2025', dri: '30 Apr 2025', due: '31 Mar 2026' }, driForm: 'a fixed deposit with a scheduled bank' });
eq([S3P.transfer, S3P.driAmt, S3P.drrTotal, S3P.repayable], [1080000, 180000, 1200000, 1200000], 's3_out_of_profits');
Q('s3_out_of_profits', short({
  t: [3, 4], d: 3, c: 'application', marks: 3,
  stem: `Hirakud Rice Mills Ltd, an imagined unlisted company, has ${inr(12000)} 9% debentures of ₹100 each due for redemption at par on 31 March 2026, and decides to redeem them wholly out of profits. On 1 April 2025 its Debenture Redemption Reserve stood at ${rs(120000)} and its surplus at ${rs(1540000)}. It made the required transfer on 1 April 2025, deposited the minimum investment on 30 April 2025 (no interest) and redeemed the debentures on the due date. Pass the journal entries.`,
  model: `Transfer = face value ${inr(S3P.nominal)} − reserve held ${inr(S3P.drrOpen)} = ${rs(S3P.transfer)}; investment = 15% × ${rs(S3P.nominal)} = ${rs(S3P.driAmt)}.\n\n${J(S3P.entries)}`,
  sol: 'Wholly out of profits, the reserve is raised to the full face value; the investment is encashed and the reserve becomes General Reserve once the holders are paid.',
  scheme: [['Transfer to the reserve up to the face value', 1], ['Investment made and encashed', 1], ['Redemption due and paid, reserve to General Reserve', 1]],
}));

const CMP = [
  ['Nuapatna Tussar Ltd', 'listed', 'capital'],
  ['Badami Sandstone Ltd', 'unlisted', 'statutory'],
  ['Aihole Stone Carvers Ltd', 'unlisted', 'profits'],
].map(([name, kind, source]) => ({ name, source, r: redeem({ n: 20000, rate: 10, kind, source }) }));
eq(CMP.map(({ r }) => [r.transfer, r.driAmt, r.drrTotal]), [[0, 300000, 0], [200000, 300000, 200000], [2000000, 300000, 2000000]], 's3_compare_sources');
const SRC = { capital: 'Out of capital', statutory: 'Partly out of profits (statutory 10%)', profits: 'Wholly out of profits' };
Q('s3_compare_sources', short({
  t: [1, 2, 3], d: 3, c: 'analysis', marks: 3,
  stem: `Three imagined companies each have 10% debentures of ${rs(2000000)} due for redemption in one lump sum next year and nothing yet in a Debenture Redemption Reserve: Nuapatna Tussar Ltd, a listed company redeeming out of capital; Badami Sandstone Ltd, an unlisted company keeping only the statutory minimum; and Aihole Stone Carvers Ltd, an unlisted company redeeming wholly out of profits. For each, state the transfer to the reserve, the minimum Debenture Redemption Investment, and the amount that reaches General Reserve after the redemption.`,
  model: mdTable(['Company', 'Source', 'Transfer to reserve (₹)', 'Minimum investment (₹)', 'To General Reserve after redemption (₹)'], CMP.map(({ name, source, r }) => [name, SRC[source], r.transfer ? inr(r.transfer) : 'Nil', inr(r.driAmt), r.drrTotal ? inr(r.drrTotal) : 'Nil']), [2, 3, 4]),
  sol: 'The investment is the same fifteen per cent for all three because each must make it; only the reserve, and so the later transfer to General Reserve, depends on the source.',
  scheme: [['Listed company: no transfer, investment only', 1], ['Statutory 10% case', 1], ['Wholly out of profits case', 1]],
}));

Q('ar_capital', ar({
  t: [2, 3], d: 3, c: 'analysis', key: 'c',
  a: 'Pattadakal Stone Inlays Ltd, an imagined listed company, may redeem its debentures wholly out of capital without transferring any profit to a Debenture Redemption Reserve.',
  r: 'A listed company is exempt from the Debenture Redemption Investment as well as from the reserve.',
  sol: 'A is true: listed companies need no reserve after the 2019 amendment. R is false: a listed company must still invest or deposit at least 15% of the debentures maturing during the year.',
}));

Q('ar_profits_gr', ar({
  t: [3, 4], d: 2, c: 'understanding', key: 'a',
  a: 'After Gandikota Granite Ltd, an imagined unlisted company, has repaid all its debentures, the balance of its Debenture Redemption Reserve is transferred to General Reserve.',
  r: 'Once the debentures are repaid, the purpose for which the reserve was kept has been served, so the profits held in it become a free reserve.',
  sol: 'Both are true, and R explains A: the reserve was restricted only until redemption.',
}));

// ================================================================ t04 Redemption in a lump sum
Q('m_lump_entry', mcq({
  t: 4, d: 1, c: 'understanding',
  stem: 'On the due date, Srirangapatna Silk Weavers Ltd, an imagined company, redeems its 10% debentures at par in one lump sum. The entry that records the amount falling due to the holders is',
  opts: ["10% Debentures A/c Dr. To Debentureholders' A/c", "Debentureholders' A/c Dr. To 10% Debentures A/c", '10% Debentures A/c Dr. To Debenture Redemption Reserve A/c', "Debentureholders' A/c Dr. To Bank A/c"],
  sol: 'The liability on the debentures is transferred to the holders’ personal account, which is then cleared by payment.',
}));

const MPE = redeem({ n: 5000, rate: 11, red: 6, kind: 'unlisted', drrOpen: 50000 });
eq([MPE.redPremium, MPE.repayable], [30000, 530000], 'm_premium_entry');
Q('m_premium_entry', mcq({
  t: 4, d: 2, c: 'application',
  stem: `Thirupuvanam Brocades Ltd, an imagined company, redeems ${inr(MPE.n)} 11% debentures of ₹100 each at a premium of 6%; the premium on redemption was credited to its Premium on Redemption of Debentures Account when the debentures were issued. The amount credited to Debentureholders' Account on redemption is`,
  opts: [rs(MPE.repayable), rs(MPE.nominal), rs(MPE.redPremium), rs(MPE.nominal + 2 * MPE.redPremium)],
  sol: `Debentures ${inr(MPE.nominal)} and Premium on Redemption ${inr(MPE.redPremium)} are debited, and the holders are credited with ${rs(MPE.repayable)}.`,
}));

Q('m_drr_after', mcq({
  t: 4, d: 1, c: 'recall',
  stem: 'Papikondalu River Cruises Ltd, an imagined unlisted company, has repaid all its debentures. The balance in its Debenture Redemption Reserve is now',
  opts: ['transferred to General Reserve', 'transferred to Capital Reserve', 'credited to the Statement of Profit and Loss as income', 'paid to the debentureholders'],
  sol: 'With the debentures repaid, the restriction ends and the reserve is moved to General Reserve.',
}));

const MDR = { amt: 120000 };
MDR.int = interestFor(MDR.amt, 8, 6);
eq(MDR.int, 4800, 'm_dri_realise');
Q('m_dri_realise', mcq({
  t: [2, 4], d: 2, c: 'understanding',
  stem: `On the redemption date, Horsley Hills Orchards Ltd, an imagined company, encashes its Debenture Redemption Investment of ${rs(MDR.amt)} together with ${rs(MDR.int)} of interest. The entry is`,
  opts: [
    `Bank A/c Dr. ${rs(MDR.amt + MDR.int)} To Debenture Redemption Investment A/c ${rs(MDR.amt)} and To Interest on Debenture Redemption Investment A/c ${rs(MDR.int)}`,
    `Debenture Redemption Investment A/c Dr. To Bank A/c ${rs(MDR.amt + MDR.int)}`,
    `Bank A/c Dr. To Debenture Redemption Reserve A/c ${rs(MDR.amt + MDR.int)}`,
    `Debenture Redemption Reserve A/c Dr. To General Reserve A/c ${rs(MDR.amt)}`,
  ],
  sol: 'The investment returns at cost and the interest is income, credited to its own account.',
}));

const MBT = redeem({ n: 4000, rate: 9, red: 5, kind: 'unlisted', drrOpen: 40000, driRate: 6, driMonths: 11 });
eq([MBT.driAmt, MBT.interest, MBT.repayable, -MBT.bankNet], [60000, 3300, 420000, 416700], 'm_bank_total');
Q('m_bank_total', mcq({
  t: [2, 4], d: 3, c: 'application',
  stem: `Kondane Spice Gardens Ltd, an imagined unlisted company, invested ${rs(MBT.driAmt)} as its Debenture Redemption Investment on 30 April 2025. On 31 March 2026 it encashed the investment with ${rs(MBT.interest)} interest and redeemed ${inr(MBT.n)} 9% debentures of ₹100 each at a premium of 5%. Taking the investment and the redemption together, its bank balance for the year falls by`,
  opts: [rs(-MBT.bankNet), rs(MBT.repayable), rs(MBT.repayable - MBT.driAmt - MBT.interest), rs(MBT.nominal)],
  sol: `The investment goes out and comes back, so only the interest (+${inr(MBT.interest)}) and the repayment (−${inr(MBT.repayable)}) change the bank: a fall of ${rs(-MBT.bankNet)}.`,
}));

Q('tf_dri_encash', tf({
  t: [2, 4], d: 1, c: 'understanding', ans: true,
  stem: 'True or false? When Pattamadai Reed Mats Ltd, an imagined company, redeems its debentures, it encashes its Debenture Redemption Investment and uses the money towards paying the debentureholders.',
  sol: 'The investment exists only for repaying the debentures maturing that year, so it is realised on redemption and the proceeds go towards the payment.',
}));

const NHP = redeem({ n: 7500, rate: 10, red: 4, kind: 'unlisted', drrOpen: 75000 });
eq(NHP.repayable, 780000, 'n_holders_paid');
Q('n_holders_paid', num({
  t: 4, d: 2, c: 'application', value: NHP.repayable, unit: '₹',
  stem: `Thottiyam Banana Fibre Ltd, an imagined company, redeems ${inr(NHP.n)} 10% debentures of ₹100 each at a premium of 4% in one lump sum. How much does it pay the debentureholders (in ₹)?`,
  sol: `Face value ${inr(NHP.nominal)} + premium ${inr(NHP.redPremium)} = ${rs(NHP.repayable)}.`,
}));

Q('fb_drr_gr', fb({
  t: 4, d: 1, c: 'recall',
  stem: 'Once Daringbadi Pepper Ltd, an imagined unlisted company, has repaid all its debentures, its Debenture Redemption Reserve is transferred to ___.',
  acc: [['General Reserve', 'general reserve', 'General Reserve Account']],
  sol: 'The reserve is no longer restricted after redemption, so it is moved to General Reserve.',
}));

const NID = { amt: 160000 };
NID.int = interestFor(NID.amt, 9, 7);
eq(NID.int, 8400, 'n_interest_dri');
Q('n_interest_dri', num({
  t: [2, 4], d: 2, c: 'application', value: NID.int, unit: '₹',
  stem: `Konni Honey Ltd, an imagined unlisted company, deposited ${rs(NID.amt)} with a scheduled bank on 30 April 2025 as its Debenture Redemption Investment, at 9% a year. It encashed the deposit on 30 November 2025 to redeem its debentures. Find the interest received (in ₹; ignore tax deducted at source).`,
  sol: `Seven months: ${inr(NID.amt)} × 9% × 7/12 = ${rs(NID.int)}.`,
}));

const S2P = redeem({ n: 7000, rate: 10, kind: 'unlisted', drrOpen: 70000, dates: { due: '31 Mar 2026' } });
eq([S2P.repayable, S2P.drrTotal], [700000, 70000], 's2_lump_par');
Q('s2_lump_par', short({
  t: 4, d: 2, c: 'application', marks: 2,
  stem: `Pala Rubber Bands Ltd, an imagined unlisted company, redeems ${inr(7000)} 10% debentures of ₹100 each at par on 31 March 2026. Its Debenture Redemption Reserve holds ${rs(70000)}, and its Debenture Redemption Investment has already been encashed. Pass the journal entries for the redemption and for the reserve.`,
  model: J([S2P.e.due, S2P.e.paid, S2P.e.toGR]),
  sol: 'Make the amount due to the holders, pay it, then release the reserve.',
  scheme: [['Amount due and paid', 1], ['Reserve transferred to General Reserve', 1]],
}));

const S2R = redeem({ n: 3000, rate: 12, red: 8, kind: 'listed', source: 'capital', dates: { due: '30 Sep 2025' } });
eq([S2R.redPremium, S2R.repayable], [24000, 324000], 's2_premium_redeem');
Q('s2_premium_redeem', short({
  t: 4, d: 2, c: 'application', marks: 2,
  stem: `Rampachodavaram Hill Brooms Ltd, an imagined listed company, redeems ${inr(3000)} 12% debentures of ₹100 each at a premium of 8% on 30 September 2025, out of capital. The premium was provided for when the debentures were issued. Pass the entries for the amount due to the debentureholders and its payment, and state where the premium was shown until redemption.`,
  model: `${J([S2R.e.due, S2R.e.paid])}\n\nUntil redemption, the ${rs(S2R.redPremium)} stood in the Premium on Redemption of Debentures Account, shown under other long-term liabilities (or other current liabilities in the final year).`,
  sol: 'The premium was already a liability, so it is debited, not charged afresh to profit.',
  scheme: [['Amount due with premium on redemption debited', 1], ['Payment and where the premium was shown', 1]],
}));

const S3F = redeem({ n: 7000, rate: 9, kind: 'unlisted', drrOpen: 70000, dates: { dri: '30 Apr 2025', due: '31 Dec 2025' }, driForm: 'unencumbered Central Government securities' });
eq([S3F.driAmt, S3F.transfer, S3F.drrTotal], [105000, 0, 70000], 's3_lump_par_full');
Q('s3_lump_par_full', short({
  t: [2, 4], d: 3, c: 'application', marks: 3,
  stem: `Yanam Ferries Ltd, an imagined unlisted company, has ${inr(7000)} 9% debentures of ₹100 each redeemable at par on 31 December 2025. Its Debenture Redemption Reserve already holds ${rs(70000)}. On 30 April 2025 it invests the minimum required in unencumbered Central Government securities, which it sells at cost on the redemption date (ignore interest). Pass the journal entries for 2025-26.`,
  model: `The reserve is already 10% of ${rs(S3F.nominal)}, so no transfer is needed. Investment = 15% × ${rs(S3F.nominal)} = ${rs(S3F.driAmt)}.\n\n${J(S3F.entries)}`,
  sol: 'Check the reserve first; then invest, encash, redeem and release the reserve.',
  scheme: [['Investment made and encashed', 1], ['Amount due and paid', 1], ['Reserve transferred to General Reserve', 1]],
}));

const S3L = redeem({ n: 4000, rate: 10, red: 10, kind: 'unlisted', drrOpen: 40000, dates: { open: '1 Apr 2025', dri: '30 Apr 2025', due: '30 Sep 2025' } });
eq([S3L.redPremium, S3L.repayable, S3L.driAmt], [40000, 440000, 60000], 's3_lump_premium');
const S3Ld = S3L.led.render(S3L.deb);
const S3Lp = S3L.led.render(PRD);
const S3Lh = S3L.led.render(DH);
Q('s3_lump_premium', short({
  t: 4, d: 3, c: 'application', marks: 3,
  stem: `Kanthalloor Pine Furniture Ltd, an imagined unlisted company, redeemed its ${inr(4000)} 10% debentures of ₹100 each at a premium of 10% on 30 September 2025. The premium had been credited to Premium on Redemption of Debentures Account at the time of issue. Prepare the 10% Debentures Account, the Premium on Redemption of Debentures Account and the Debentureholders' Account for 2025-26.`,
  model: `**10% Debentures Account**\n\n${S3Ld.md}\n\n**Premium on Redemption of Debentures Account**\n\n${S3Lp.md}\n\n**Debentureholders' Account**\n\n${S3Lh.md}`,
  sol: 'Both the debentures and the redemption premium are transferred to the holders, who are then paid; all three accounts close.',
  scheme: [['10% Debentures Account', 1], ['Premium on Redemption of Debentures Account', 1], ["Debentureholders' Account", 1]],
}));

const S3G = redeem({ n: 15000, rate: 8, kind: 'unlisted', drrOpen: 100000, grOpen: 350000, dates: { open: '1 Apr 2025', drr: '1 Apr 2025', dri: '30 Apr 2025', due: '31 Mar 2026' } });
eq([S3G.transfer, S3G.drrTotal], [50000, 150000], 's3_ledger_drr');
const S3Gr = S3G.led.render(DRR);
const S3Gg = S3G.led.render(GR, '31 Mar 2026');
eq(-S3Gg.closing, 500000, 's3_ledger_drr general reserve');
Q('s3_ledger_drr', short({
  t: [1, 4], d: 3, c: 'application', marks: 3,
  stem: `Kadalundi Mussel Farms Ltd, an imagined unlisted company, has 8% debentures of ${rs(1500000)} redeemable at par on 31 March 2026. On 1 April 2025 its Debenture Redemption Reserve was ${rs(100000)} and its General Reserve ${rs(350000)}. On 1 April 2025 it transferred the amount needed to reach the statutory minimum, and the debentures were redeemed on the due date. Prepare the Debenture Redemption Reserve Account and the General Reserve Account for 2025-26.`,
  model: `Minimum reserve = 10% × ${rs(S3G.nominal)} = ${rs(S3G.drrTotal)}; transfer = ${rs(S3G.transfer)}.\n\n**Debenture Redemption Reserve Account**\n\n${S3Gr.md}\n\n**General Reserve Account**\n\n${S3Gg.md}`,
  sol: 'The reserve is topped up to ten per cent, then emptied into General Reserve, which is carried down.',
  scheme: [['Transfer calculated', 1], ['Debenture Redemption Reserve Account', 1], ['General Reserve Account', 1]],
}));

const TOP = { y1: drrNeeded({ kind: 'unlisted', outstanding: 1500000, existing: 120000 }) };
TOP.y2 = drrNeeded({ kind: 'unlisted', outstanding: 1500000 + 1000000, existing: TOP.y1.after });
eq([TOP.y1.transfer, TOP.y1.after, TOP.y2.required, TOP.y2.transfer], [30000, 150000, 250000, 100000], 's3_drr_topup');
Q('s3_drr_topup', short({
  t: 1, d: 3, c: 'application', marks: 3,
  stem: `Kayamkulam Lamps Ltd, an imagined unlisted company, had 9% debentures of ${rs(1500000)} outstanding throughout 2024-25 and ${rs(120000)} in its Debenture Redemption Reserve on 1 April 2024. On 1 October 2025 it issued further 10% debentures of ${rs(1000000)}. At each year end it transfers just enough to keep the reserve at the statutory minimum. Calculate the transfers for 2024-25 and 2025-26 and pass the entries.`,
  model: `- 31 March 2025: minimum 10% × ${rs(1500000)} = ${rs(TOP.y1.required)}; transfer ${inr(TOP.y1.required)} − ${inr(120000)} = **${rs(TOP.y1.transfer)}**.\n- 31 March 2026: minimum 10% × ${rs(2500000)} = ${rs(TOP.y2.required)}; transfer ${inr(TOP.y2.required)} − ${inr(TOP.y1.after)} = **${rs(TOP.y2.transfer)}**.\n\n${J([
    { date: '31 Mar 2025', dr: [[SURPLUS, TOP.y1.transfer]], cr: [[DRR, TOP.y1.transfer]], nar: 'transfer to keep the reserve at ten per cent of outstanding debentures' },
    { date: '31 Mar 2026', dr: [[SURPLUS, TOP.y2.transfer]], cr: [[DRR, TOP.y2.transfer]], nar: 'transfer on the higher outstanding debentures after the new issue' },
  ])}`,
  sol: 'The minimum follows the debentures outstanding, so the new issue raises it in the second year.',
  scheme: [['First-year transfer', 1], ['Second-year transfer on the larger total', 1], ['Both entries', 1]],
}));

const BSX = { gr: 400000, d1: 1000000, d2: 1200000, ...{} };
BSX.drr = drrNeeded({ kind: 'unlisted', outstanding: BSX.d1 + BSX.d2 }).required;
BSX.dri = driNeeded({ kind: 'unlisted', maturing: BSX.d1 });
eq([BSX.drr, BSX.dri], [220000, 150000], 's3_bs_extract');
const BSXrs = note('Note 1: Reserves and Surplus', [['Debenture Redemption Reserve', BSX.drr], ['General Reserve', BSX.gr]], 620000);
const BSXlt = note('Note 2: Long-term borrowings', [['10% Debentures (repayable in 2029)', BSX.d2]], 1200000);
const BSXst = note('Note 3: Short-term borrowings', [['Current maturities of long-term borrowings (9% debentures due on 31 December 2026)', BSX.d1]], 1000000);
const BSXci = note('Note 4: Current investments', [['Debenture Redemption Investment (fixed deposit with a scheduled bank)', BSX.dri]], 150000);
Q('s3_bs_extract', short({
  t: [1, 2], d: 3, c: 'application', marks: 3,
  stem: `On 31 March 2026, Chavakkad Coconut Ltd, an imagined unlisted company, had 9% debentures of ${rs(BSX.d1)} due for redemption on 31 December 2026 and 10% debentures of ${rs(BSX.d2)} repayable in 2029. Its reserve stood at the statutory minimum, its General Reserve was ${rs(BSX.gr)}, and on 25 March 2026 it had already made the minimum Debenture Redemption Investment for the debentures maturing in 2026-27 as a fixed deposit with a scheduled bank. Prepare the notes on Reserves and Surplus, borrowings and current investments for its Balance Sheet.`,
  model: `${BSXrs.md}\n\n${BSXlt.md}\n\n${BSXst.md}\n\n${BSXci.md}\n\nWorking: reserve = 10% × ${rs(BSX.d1 + BSX.d2)} = ${rs(BSX.drr)}; investment = 15% × ${rs(BSX.d1)} = ${rs(BSX.dri)}.`,
  sol: 'The reserve is on all outstanding debentures, the investment only on those due within the year, and the debentures due within twelve months are current maturities.',
  scheme: [['Reserves and Surplus note', 1], ['Long-term and short-term borrowings notes', 1], ['Current investments note', 1]],
}));

Q('s3_error_spot', short({
  t: [1, 2, 4], d: 4, c: 'analysis', marks: 3,
  stem: "The trainee accountant of Ponnani Boat Yard Ltd, an imagined unlisted company, passed these entries for its debentures: (i) Bank A/c Dr. To Debenture Redemption Reserve A/c ₹60,000, to create the reserve; (ii) 10% Debentures A/c Dr. To Debenture Redemption Investment A/c ₹90,000, to make the investment; (iii) Debenture Redemption Reserve A/c Dr. To Capital Reserve A/c ₹60,000, after all the debentures were repaid. Explain the error in each and give the correct entry.",
  model: `(i) The reserve is an appropriation of profit, not a receipt of cash.\n\n${J([{ dr: [[SURPLUS, 60000]], cr: [[DRR, 60000]], nar: 'transfer to Debenture Redemption Reserve' }])}\n\n(ii) Making the investment pays money out of the bank; the debentures are untouched until redemption.\n\n${J([{ dr: [[DRI, 90000]], cr: [[BANK, 90000]], nar: 'Debenture Redemption Investment made' }])}\n\n(iii) After redemption the reserve becomes a free (revenue) reserve, so it goes to General Reserve, not Capital Reserve.\n\n${J([{ dr: [[DRR, 60000]], cr: [[GR, 60000]], nar: 'reserve transferred to General Reserve after redemption' }])}`,
  sol: 'Ask of each entry what really moved: profit, cash or a reserve.',
  scheme: [['(i) explained and corrected', 1], ['(ii) explained and corrected', 1], ['(iii) explained and corrected', 1]],
}));

const L5M = redeem({ n: 8000, rate: 10, kind: 'unlisted', drrOpen: 50000, surplus: 400000, driRate: 8, driMonths: 11, dates: { open: '1 Apr 2025', drr: '1 Apr 2025', dri: '30 Apr 2025', due: '31 Mar 2026', close: '31 Mar 2026' } });
eq([L5M.transfer, L5M.driAmt, L5M.interest, L5M.drrTotal], [30000, 120000, 8800, 80000], 'l5_lump_ledgers');
const L5Mr = L5M.led.render(DRR);
const L5Mi = L5M.led.render(DRI);
Q('l5_lump_ledgers', long({
  t: [1, 2, 4], d: 3, c: 'application', marks: 5,
  stem: `Marayur Jaggery Ltd, an imagined unlisted company, has ${inr(8000)} 10% debentures of ₹100 each redeemable at par in one lump sum on 31 March 2026. On 1 April 2025 its Debenture Redemption Reserve was ${rs(50000)} and its surplus ${rs(400000)}. On 1 April 2025 it transferred the amount needed to reach the statutory minimum; on 30 April 2025 it deposited the minimum Debenture Redemption Investment with a scheduled bank at 8% a year; on 31 March 2026 it encashed the deposit with 11 months' interest, redeemed the debentures, moved the reserve to General Reserve and closed the interest to the Statement of Profit and Loss (ignore tax deducted at source).\n\n(a) Pass the journal entries. [3]\n\n(b) Prepare the Debenture Redemption Reserve Account and the Debenture Redemption Investment Account. [2]`,
  model: `**(a)** Workings: reserve 10% × ${rs(L5M.nominal)} = ${rs(L5M.drrTotal)}, transfer ${rs(L5M.transfer)}; investment 15% = ${rs(L5M.driAmt)}; interest ${inr(L5M.driAmt)} × 8% × 11/12 = ${rs(L5M.interest)}.\n\n${J(L5M.entries)}\n\n**(b)** Debenture Redemption Reserve Account\n\n${L5Mr.md}\n\nDebenture Redemption Investment Account\n\n${L5Mi.md}`,
  sol: 'Work out the two statutory amounts first, then follow the year in date order; both accounts close at nil.',
  scheme: [['(a) Transfer to the reserve and the investment', 1], ['(a) Encashment with interest, redemption due and paid', 1], ['(a) Reserve to General Reserve and interest closed', 1], ['(b) Debenture Redemption Reserve Account', 1], ['(b) Debenture Redemption Investment Account', 1]],
}));

const L5P = redeem({ n: 5000, rate: 9, red: 5, kind: 'unlisted', drrOpen: 50000, dates: { open: '1 Apr 2025', dri: '30 Apr 2025', due: '31 Mar 2026' } });
eq([L5P.transfer, L5P.driAmt, L5P.redPremium, L5P.repayable], [0, 75000, 25000, 525000], 'l5_premium_cycle');
const L5Pp = L5P.led.render(PRD);
const L5Ph = L5P.led.render(DH);
Q('l5_premium_cycle', long({
  t: [2, 4], d: 4, c: 'analysis', marks: 5,
  stem: `Peermade Pepper Growers Ltd, an imagined unlisted company, issued ${inr(5000)} 9% debentures of ₹100 each on 1 April 2021 at a discount of 4%, redeemable at a premium of 5% on 31 March 2026; the loss on issue was written off in 2021-22. On 1 April 2025 the Debenture Redemption Reserve held ${rs(50000)}. On 30 April 2025 the company deposited the minimum Debenture Redemption Investment with a scheduled bank (ignore interest), and on 31 March 2026 it encashed the deposit and redeemed the debentures.\n\n(a) Pass the journal entries for 2025-26, and state why the discount at issue does not affect them. [3]\n\n(b) Prepare the Premium on Redemption of Debentures Account and the Debentureholders' Account. [2]`,
  model: `**(a)** The reserve already equals 10% of ${rs(L5P.nominal)}, so no transfer is needed; investment = 15% × ${rs(L5P.nominal)} = ${rs(L5P.driAmt)}.\n\n${J(L5P.entries)}\n\nThe holders are repaid the face value plus the premium promised (${rs(L5P.repayable)}). The discount was a loss of 2021-22, already written off; it never reduces what the company owes.\n\n**(b)** Premium on Redemption of Debentures Account\n\n${L5Pp.md}\n\nDebentureholders' Account\n\n${L5Ph.md}`,
  sol: 'The premium on redemption was a liability from the day of issue; at maturity it joins the face value in the holders’ account.',
  scheme: [['(a) Investment made and encashed', 1], ['(a) Amount due with premium, payment, reserve to General Reserve', 1], ['(a) Why the discount is irrelevant now', 1], ['(b) Premium on Redemption Account', 1], ["(b) Debentureholders' Account", 1]],
}));

const L5C = { vag: redeem({ n: 10000, rate: 10, kind: 'listed', source: 'capital' }), adi: redeem({ n: 10000, rate: 10, kind: 'unlisted', source: 'profits', dates: { drr: '1 Apr 2025', due: '31 Mar 2026' } }) };
eq([L5C.vag.transfer, L5C.vag.driAmt, L5C.adi.transfer, L5C.adi.driAmt, L5C.adi.drrTotal], [0, 150000, 1000000, 150000, 1000000], 'l5_compare');
Q('l5_compare', long({
  t: [1, 2, 3], d: 4, c: 'analysis', marks: 5,
  stem: `Two imagined companies each have ${inr(10000)} 10% debentures of ₹100 each maturing at par on 31 March 2026, nothing in a Debenture Redemption Reserve on 1 April 2025, and ample surplus. Vagamon Spice Exports Ltd is a listed company and redeems out of capital; Adimali Cocoa Ltd is unlisted and redeems wholly out of profits.\n\n(a) Pass Adimali's entries for the transfer to the reserve (1 April 2025) and for the reserve after redemption (31 March 2026), and state the minimum Debenture Redemption Investment of each company. [3]\n\n(b) Explain how the two choices differ in their effect on the profits available for dividend and on the resources left in each business. [2]`,
  model: `**(a)**\n\n${J([L5C.adi.e.transfer, L5C.adi.e.toGR])}\n\nMinimum investment: 15% × ${rs(L5C.adi.nominal)} = ${rs(L5C.adi.driAmt)} for Adimali, and the same ${rs(L5C.vag.driAmt)} for Vagamon, because a listed company must still invest although it needs no reserve.\n\n**(b)** Adimali keeps back ${rs(L5C.adi.transfer)} of profit, which cannot be paid as dividend before the redemption; after it, the amount sits in General Reserve, so resources equal to the debentures repaid remain in the business. Vagamon keeps back nothing: its distributable profit is unchanged, but the ${rs(L5C.vag.nominal)} paid out comes from its funds without being replaced by retained profit.`,
  sol: 'Same debentures, same investment; only the reserve, and so the profit held back, differs.',
  scheme: [['(a) Transfer entry for the full face value', 1], ['(a) Reserve to General Reserve', 1], ['(a) Investment for both companies', 1], ['(b) Effect on profits available for dividend', 1], ['(b) Effect on resources kept in the business', 1]],
}));

const L5U = redeem({ n: 6000, rate: 11, red: 10, kind: 'unlisted', drrOpen: 20000, driRate: 6, driMonths: 5, bankOpen: 750000, dates: { open: '1 Apr 2025', drr: '1 Apr 2025', dri: '30 Apr 2025', due: '30 Sep 2025', close: '30 Sep 2025' } });
eq([L5U.transfer, L5U.driAmt, L5U.interest, L5U.repayable, L5U.bankClose], [40000, 90000, 2250, 660000, 92250], 'l5_unlisted_full');
const L5Ub = L5U.led.render(BANK, '30 Sep 2025');
Q('l5_unlisted_full', long({
  t: [1, 2, 4], d: 3, c: 'application', marks: 5,
  stem: `Erattupetta Rubber Mats Ltd, an imagined unlisted company, has ${inr(6000)} 11% debentures of ₹100 each redeemable at a premium of 10% on 30 September 2025; the premium was provided for at issue. On 1 April 2025 its Debenture Redemption Reserve held ${rs(20000)} and its bank balance was ${rs(750000)}. It transferred the amount needed to reach the statutory minimum on 1 April 2025, deposited the minimum Debenture Redemption Investment at 6% a year on 30 April 2025, and on 30 September 2025 encashed the deposit with five months' interest and redeemed the debentures. The reserve and the interest were closed off on the same day (ignore tax deducted at source).\n\n(a) Pass the journal entries. [3]\n\n(b) Prepare the Bank Account for these transactions. [2]`,
  model: `**(a)** Workings: reserve 10% × ${rs(L5U.nominal)} = ${rs(L5U.drrTotal)}, transfer ${rs(L5U.transfer)}; investment 15% = ${rs(L5U.driAmt)}; interest ${inr(L5U.driAmt)} × 6% × 5/12 = ${rs(L5U.interest)}; amount due ${inr(L5U.nominal)} + ${inr(L5U.redPremium)} = ${rs(L5U.repayable)}.\n\n${J(L5U.entries)}\n\n**(b)** Bank Account\n\n${L5Ub.md}`,
  sol: 'The reserve and the investment are worked out from the face value; the bank sees only the deposit going out and back, the interest and the repayment.',
  scheme: [['(a) Transfer and investment', 1], ['(a) Encashment and redemption at a premium', 1], ['(a) Reserve to General Reserve and interest closed', 1], ['(b) Bank Account entries', 1], ['(b) Closing balance carried down', 1]],
}));

const L5D = { a: 800000, b: 1200000, open: 130000 };
L5D.drr = drrNeeded({ kind: 'unlisted', outstanding: L5D.a + L5D.b, existing: L5D.open });
L5D.dri = driNeeded({ kind: 'unlisted', maturing: L5D.a });
eq([L5D.drr.required, L5D.drr.transfer, L5D.dri], [200000, 70000, 120000], 'l5_drr_dri_calc');
const L5Drs = note('Note 1: Reserves and Surplus', [['Debenture Redemption Reserve', L5D.drr.after]], 200000);
const L5Dlt = note('Note 2: Long-term borrowings', [['Series B 10% Debentures (due in 2029)', L5D.b]], 1200000);
const L5Dst = note('Note 3: Short-term borrowings', [['Current maturities of long-term borrowings (Series A 9% debentures due on 30 June 2026)', L5D.a]], 800000);
Q('l5_drr_dri_calc', long({
  t: [1, 2], d: 4, c: 'analysis', marks: 5,
  stem: `Kodungallur Pottery Ltd, an imagined unlisted company, has two series of debentures on 31 March 2026: Series A 9% debentures of ${rs(L5D.a)} due on 30 June 2026 and Series B 10% debentures of ${rs(L5D.b)} due in 2029. Its Debenture Redemption Reserve holds ${rs(L5D.open)}.\n\n(a) Calculate and record the transfer needed on 31 March 2026 to reach the statutory minimum, and the minimum Debenture Redemption Investment to be made by 30 April 2026, with its entry on that date. [3]\n\n(b) Prepare the notes on Reserves and Surplus and on borrowings as at 31 March 2026 (show only these items). [2]`,
  model: `**(a)** Reserve: 10% × (${inr(L5D.a)} + ${inr(L5D.b)}) = ${rs(L5D.drr.required)}; transfer = ${inr(L5D.drr.required)} − ${inr(L5D.open)} = **${rs(L5D.drr.transfer)}**. Investment: only Series A matures in 2026-27, so 15% × ${rs(L5D.a)} = **${rs(L5D.dri)}**.\n\n${J([
    { date: '31 Mar 2026', dr: [[SURPLUS, L5D.drr.transfer]], cr: [[DRR, L5D.drr.transfer]], nar: 'transfer to bring the reserve up to ten per cent of outstanding debentures' },
    { date: '30 Apr 2026', dr: [[DRI, L5D.dri]], cr: [[BANK, L5D.dri]], nar: 'fifteen per cent of the debentures maturing in 2026-27 deposited with a scheduled bank' },
  ])}\n\n**(b)**\n\n${L5Drs.md}\n\n${L5Dlt.md}\n\n${L5Dst.md}`,
  sol: 'The reserve looks at everything outstanding; the investment looks only at the coming year; the borrowings note separates what falls due within twelve months.',
  scheme: [['(a) Reserve transfer calculated and recorded', 1], ['(a) Investment on the maturing series only', 1], ['(a) Investment entry', 1], ['(b) Reserves and Surplus note', 1], ['(b) Long-term and short-term borrowings notes', 1]],
}));

// ================================================================ t05 Instalments by draw of lots (concepts only)
Q('m_lots_meaning', mcq({
  t: 5, d: 1, c: 'recall',
  stem: 'Uppada Jamdani Ltd, an imagined company, redeems its debentures in annual instalments by draw of lots. This means that',
  opts: ['each year the debentures to be repaid are chosen by lot and their holders are repaid in full', 'every debenture is repaid partly in each year', 'the debentures are bought back on the stock exchange each year', 'the holders draw lots to fix the rate of interest'],
  sol: 'A lot decides which debenture numbers are repaid in a year; those are repaid in full and the rest wait for later draws.',
}));

Q('m_lots_dri', mcq({
  t: [2, 5], d: 2, c: 'understanding',
  stem: 'Peddapuram Silk Ltd, an imagined unlisted company, repays its debentures in equal annual instalments chosen by draw of lots. Its Debenture Redemption Investment in each year must be at least',
  opts: ['15% of the instalment maturing in that year', '15% of the whole issue, kept unchanged until the last instalment', '10% of the debentures still outstanding', 'the full amount of the next instalment'],
  sol: 'The 15% rule is applied year by year to the debentures maturing in that year, so with instalments it is 15% of the next instalment.',
}));

Q('ar_lots', ar({
  t: 5, d: 3, c: 'analysis', key: 'd',
  a: 'When Lepakshi Toys Ltd, an imagined company, redeems its debentures in instalments by draw of lots, every holder receives part of the face value of each debenture every year.',
  r: 'Under redemption by draw of lots, the debentures to be redeemed in a year are chosen by lot, and their holders are repaid in full.',
  sol: 'A is false: holders whose debentures are not drawn receive nothing that year. R is true and describes the method correctly.',
}));

Q('tf_lots', tf({
  t: 5, d: 1, c: 'understanding', ans: true,
  stem: 'True or false? When Tuni Mango Pulp Ltd, an imagined company, redeems its debentures by draw of lots, the holders whose debentures are drawn in a year are repaid in full, while the others go on earning interest.',
  sol: 'Only the debentures drawn are repaid that year; those not drawn stay outstanding and continue to carry interest.',
}));

Q('s2_lots_explain', short({
  t: 5, d: 2, c: 'understanding', marks: 2,
  stem: 'Haripad Paddy Ltd, an imagined company, plans to repay its debentures in five annual instalments chosen by draw of lots. Explain this method of redemption to a debentureholder of the company.',
  model: 'Each year the company redeems a fixed part of the issue. The debenture numbers to be repaid are chosen by **lot** (a fair, random draw), usually in the presence of witnesses, and the holders of those debentures are repaid in full on the due date, with interest up to that date. Debentures not drawn remain outstanding and keep earning interest until a later draw selects them; after the last draw the whole issue has been repaid.',
  sol: 'Cover the yearly part, the random selection and what happens to those drawn and not drawn.',
  scheme: [['Fixed part redeemed each year, chosen by lot', 1], ['Drawn holders repaid in full; others continue with interest', 1]],
}));

Q('s3_lots_drr_dri', short({
  t: [1, 2, 5], d: 3, c: 'understanding', marks: 3,
  stem: 'Srikalahasti Kalamkari Ltd, an imagined unlisted company, will redeem its debentures in four annual instalments by draw of lots. Explain how its Debenture Redemption Reserve and its Debenture Redemption Investment are handled during these four years.',
  model: '1. **Reserve:** before redemption begins, the company builds up at least 10% of the outstanding debentures in the Debenture Redemption Reserve out of profits available for dividend. The reserve can be used only for redemption; once the last instalment has been paid, it is transferred to General Reserve.\n\n2. **Investment, renewed every year:** by 30 April of each year the company invests or deposits at least 15% of the instalment maturing in that year, in a permitted form free from charge.\n\n3. **Use of the investment:** when that year’s instalment falls due, the investment is encashed and used towards paying the holders drawn; a fresh investment is then made for the next instalment, so it never falls below 15% of the debentures maturing in the year.',
  sol: 'Separate the reserve, kept once and released at the end, from the investment, which is made and used again for each instalment.',
  scheme: [['Reserve: 10% out of profits, used only for redemption, to General Reserve at the end', 1], ['Investment: 15% of the instalment maturing each year, by 30 April', 1], ['Investment encashed for each instalment and renewed for the next', 1]],
}));

Q('l5_lots_theory', long({
  t: [1, 2, 5], d: 3, c: 'understanding', marks: 5,
  stem: 'Thodupuzha Pineapple Ltd, an imagined unlisted company, is choosing between redeeming its debentures in one lump sum at the end of seven years and redeeming them in annual instalments by draw of lots over the last four years.\n\n(a) Explain how redemption by draw of lots works, and give one advantage of it for the company. [2]\n\n(b) Explain how the company would meet the Debenture Redemption Reserve and Debenture Redemption Investment rules under each choice. [3]',
  model: '**(a)** Each year a fixed part of the issue is repaid. The debentures to be repaid are chosen by a random draw, and their holders are repaid in full; the rest continue to earn interest until drawn. **Advantage:** the cash outflow is spread over several years instead of one large payment, and interest falls as the outstanding debentures fall.\n\n**(b)**\n- **Reserve (both choices):** as an unlisted company it builds the reserve to at least 10% of the outstanding debentures out of profits before redemption begins, and moves it to General Reserve after the last repayment.\n- **Investment, lump sum:** by 30 April of the year of maturity it invests at least 15% of the whole issue, and encashes it on the redemption date.\n- **Investment, instalments:** by 30 April of each year of redemption it invests at least 15% of that year’s instalment, uses it towards that instalment, and repeats for the next one.',
  sol: 'The reserve rule is the same; the investment follows what matures in each year, so it is made once for a lump sum and every year for instalments.',
  scheme: [['(a) Method explained', 1], ['(a) One advantage', 1], ['(b) Reserve under both choices', 1], ['(b) Investment for the lump sum', 1], ['(b) Investment for instalments, renewed each year', 1]],
}));

// ================================================================ practice: full ISC-style problems (8 marks, not in the tests)
// Vadakara: the top-up to the statutory reserve is spread over two years (₹45,000 on 31 March 2025, the
// rest on 1 April 2025); the redemption premium was credited at issue.
const P1 = { open: 60000, t1: 45000, y1: drrNeeded({ kind: 'unlisted', outstanding: 1500000, existing: 60000 }) };
P1.r = redeem({ n: 15000, rate: 10, red: 5, kind: 'unlisted', drrOpen: P1.open + P1.t1, driRate: 8, driMonths: 11, bankOpen: 1650000, dates: { open: '1 Apr 2025', drr: '1 Apr 2025', dri: '30 Apr 2025', due: '31 Mar 2026', close: '31 Mar 2026' } });
eq([P1.y1.required, P1.r.transfer, P1.r.drrTotal, P1.r.driAmt, P1.r.interest, P1.r.repayable, P1.r.bankClose], [150000, 45000, 150000, 225000, 16500, 1575000, 91500], 'l8_two_year');
check(P1.t1 < P1.y1.transfer, 'l8_two_year: the first-year transfer leaves a shortfall for the second year');
const P1y1 = tAccount([['31 Mar 2025', 'Balance c/d', P1.open + P1.t1]], [['1 Apr 2024', 'Balance b/d', P1.open], ['31 Mar 2025', SURPLUS, P1.t1]], { dates: true });
const P1y2 = P1.r.led.render(DRR);
const P1i = P1.r.led.render(DRI);
Q('l8_two_year', long({
  t: [1, 2, 4], d: 4, c: 'application', marks: 8,
  stem: `Vadakara Handloom Towels Ltd, an imagined unlisted company, has ${inr(15000)} 10% debentures of ₹100 each, redeemable at a premium of 5% on 31 March 2026; the premium was credited to Premium on Redemption of Debentures Account at issue. Its Debenture Redemption Reserve stood at ${rs(P1.open)} on 1 April 2024. It transferred ${rs(P1.t1)} to the reserve on 31 March 2025 and the rest needed to reach the statutory minimum on 1 April 2025. On 30 April 2025 it deposited the minimum Debenture Redemption Investment with a scheduled bank at 8% a year, and on 31 March 2026 it encashed the deposit with 11 months' interest, redeemed the debentures, moved the reserve to General Reserve and closed the interest to the Statement of Profit and Loss (ignore tax deducted at source).\n\n(a) Pass the journal entries for 2024-25 and 2025-26. [5]\n\n(b) Prepare the Debenture Redemption Reserve Account for both years and the Debenture Redemption Investment Account for 2025-26. [3]`,
  model: `**(a)** Workings: minimum reserve 10% × ${rs(P1.r.nominal)} = ${rs(P1.r.drrTotal)}; second transfer ${inr(P1.r.drrTotal)} − ${inr(P1.open)} − ${inr(P1.t1)} = ${rs(P1.r.transfer)}; investment 15% = ${rs(P1.r.driAmt)}; interest ${inr(P1.r.driAmt)} × 8% × 11/12 = ${rs(P1.r.interest)}; amount due ${inr(P1.r.nominal)} + ${inr(P1.r.redPremium)} = ${rs(P1.r.repayable)}.\n\n${J([{ date: '31 Mar 2025', dr: [[SURPLUS, P1.t1]], cr: [[DRR, P1.t1]], nar: 'part of the profits transferred to the reserve' }, ...P1.r.entries])}\n\n**(b)** Debenture Redemption Reserve Account, 2024-25\n\n${P1y1.md}\n\nDebenture Redemption Reserve Account, 2025-26\n\n${P1y2.md}\n\nDebenture Redemption Investment Account, 2025-26\n\n${P1i.md}`,
  sol: 'The reserve reaches ten per cent in two steps before redemption; the investment is made for the year of maturity and returns with interest; the reserve then becomes General Reserve.',
  scheme: [['(a) 2024-25 transfer', 1], ['(a) 2025-26 transfer completing the minimum', 1], ['(a) Investment made and encashed with interest', 1], ['(a) Amount due with premium and payment', 1], ['(a) Reserve to General Reserve and interest closed', 1], ['(b) Reserve Account 2024-25', 1], ['(b) Reserve Account 2025-26', 1], ['(b) Investment Account', 1]],
}));

const P2 = { yDeb: 1800000, yDrr: 180000, yPrd: 90000 };
P2.r = redeem({ n: 12000, rate: 9, kind: 'unlisted', source: 'profits', drrOpen: 120000, surplus: 1600000, grOpen: 300000, driRate: 7, driMonths: 8, dates: { open: '1 Apr 2025', drr: '1 Apr 2025', dri: '30 Apr 2025', due: '31 Dec 2025', close: '31 Dec 2025' }, driForm: 'unencumbered Central Government securities' });
eq([P2.r.transfer, P2.r.driAmt, P2.r.interest, P2.r.drrTotal], [1080000, 180000, 8400, 1200000], 'l8_series');
check(P2.r.drrOpen + P2.yDrr === pct(10, P2.r.nominal + P2.yDeb), 'l8_series: the opening reserve is the statutory 10% of both series');
const P2gr = -P2.r.led.bal(GR);
const P2rs = note('Note 1: Reserves and Surplus (extract)', [['Debenture Redemption Reserve (Series Y)', P2.yDrr], ['General Reserve', P2gr]], 1680000);
const P2lt = note('Note 2: Long-term borrowings', [['Series Y 10% Debentures (redeemable in 2028 at a premium of 5%)', P2.yDeb]], 1800000);
const P2ol = note('Note 3: Other long-term liabilities', [['Premium on Redemption of Debentures (Series Y)', P2.yPrd]], 90000);
check(P2.yPrd === pct(5, P2.yDeb), 'l8_series: premium on redemption of Series Y');
Q('l8_series', long({
  t: [1, 2, 3, 4], d: 5, c: 'analysis', marks: 8,
  stem: `Payyoli Seafood Exports Ltd, an imagined unlisted company, had two series of debentures on 1 April 2025: Series X, ${inr(12000)} 9% debentures of ₹100 each, redeemable at par on 31 December 2025; and Series Y, 10% debentures of ${rs(P2.yDeb)}, redeemable in 2028 at a premium of 5% (provided for at issue). On that date its Debenture Redemption Reserve held ${rs(120000)} for Series X and ${rs(P2.yDrr)} for Series Y, its General Reserve ${rs(300000)} and its surplus ${rs(1600000)}. The company decided to redeem Series X wholly out of profits and made the transfer on 1 April 2025. On 30 April 2025 it invested the minimum required in unencumbered Central Government securities at 7% a year, and on 31 December 2025 it sold them at cost with eight months' interest, redeemed Series X and closed off the reserve and the interest.\n\n(a) Pass the journal entries for Series X in 2025-26. [5]\n\n(b) Prepare the notes on Reserves and Surplus (reserves only), long-term borrowings and other long-term liabilities as at 31 March 2026. [3]`,
  model: `**(a)** Workings: transfer = ${inr(P2.r.nominal)} − ${inr(P2.r.drrOpen)} = ${rs(P2.r.transfer)} (the surplus of ${rs(1600000)} covers it); investment 15% × ${rs(P2.r.nominal)} = ${rs(P2.r.driAmt)} (Series Y does not mature this year); interest ${inr(P2.r.driAmt)} × 7% × 8/12 = ${rs(P2.r.interest)}.\n\n${J(P2.r.entries)}\n\n**(b)**\n\n${P2rs.md}\n\n${P2lt.md}\n\n${P2ol.md}\n\nGeneral Reserve: ${inr(300000)} + ${inr(P2.r.drrTotal)} transferred = ${rs(P2gr)}. The Series Y reserve stays, because those debentures are still outstanding.`,
  sol: 'Series X alone is redeemed and alone drives the transfer and the investment; Series Y keeps its reserve, its borrowing and its premium liability.',
  scheme: [['(a) Transfer raising the Series X reserve to face value', 1], ['(a) Investment made for Series X only', 1], ['(a) Investment sold with interest', 1], ['(a) Redemption due and paid', 1], ['(a) Reserve to General Reserve and interest closed', 1], ['(b) Reserves and Surplus note', 1], ['(b) Long-term borrowings note', 1], ['(b) Other long-term liabilities note', 1]],
}));
