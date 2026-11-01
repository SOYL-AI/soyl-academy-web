// ISC 12 Economics, ch18 Circular Flow of Income — question bank. Every economy, firm, person and figure is imagined
// by SOYL; no textbook example, exercise, specimen-paper or past-paper item is reused (D-036). Every number in a stem,
// key or worked solution is computed here and asserted, so stems, keys and solutions cannot drift apart.
// Scope: the two-sector model (real and money flows, with and without saving, the financial market); the three-sector
// model with government and the four-sector model with the rest of the world; leakages and injections and what happens
// to income when they differ. Set-ups differ from SOYL CBSE 12 Economics ch01 (two-sector flow only).
import { Q, mcq, ar, tf, fb, match, ord, num, short, long, caseQ, child } from '../../isc-12-economics-ch01/src/lib.mjs';

const S2 = [30, 50];
const S3 = [50, 80];
const S4 = [70, 110];
const L5 = [100, 150];
const L8 = [150, 220];

const assert = (cond, msg) => { if (!cond) throw new Error(`questions.mjs: ${msg}`); };
export const inr = (n) => n.toLocaleString('en-IN');
const sum = (...xs) => xs.reduce((s, v) => s + v, 0);

// ---------------------------------------------------------------- imagined economies (₹ crore)
// (1) Kanakdwip, a two-sector island economy with no saving: factor payments by firms.
export const KAN = { wages: 500, rent: 80, interest: 70, profit: 150 };
export const KAN_FP = sum(KAN.wages, KAN.rent, KAN.interest, KAN.profit);
export const KAN_C = KAN_FP; // households spend all their income
assert(KAN_FP === 800 && KAN_C === 800, 'kanakdwip');
// (2) Neelachal, a two-sector economy with saving and investment.
export const NEE = { Y: 900, S: 140, I: 140 };
export const NEE_C = NEE.Y - NEE.S;
assert(NEE_C === 760 && NEE_C + NEE.I === NEE.Y, 'neelachal');
// (3) Malaygiri, a three-sector economy in balance.
export const MAL = { Y: 1000, S: 150, T: 200, I: 130, G: 220 };
export const MAL_C = MAL.Y - MAL.S - MAL.T;
export const MAL_LEAK = MAL.S + MAL.T;
export const MAL_INJ = MAL.I + MAL.G;
assert(MAL_C === 650 && MAL_LEAK === 350 && MAL_INJ === 350 && MAL_C + MAL.I + MAL.G === MAL.Y, 'malaygiri');
// (4) Vindhyadesh, a four-sector economy in balance.
export const VIN = { Y: 1200, S: 160, T: 240, M: 150, I: 180, G: 260, X: 110 };
export const VIN_C = VIN.Y - VIN.S - VIN.T;
export const VIN_LEAK = VIN.S + VIN.T + VIN.M;
export const VIN_INJ = VIN.I + VIN.G + VIN.X;
export const VIN_SPEND = VIN_C + VIN.I + VIN.G + VIN.X - VIN.M;
assert(VIN_C === 800 && VIN_LEAK === 550 && VIN_INJ === 550 && VIN_SPEND === VIN.Y, 'vindhyadesh');
// (5) Sarayu Pradesh, year 1: leakages exceed injections.
export const SAR = { S: 200, T: 180, M: 140, I: 170, G: 190, X: 110 };
export const SAR_LEAK = SAR.S + SAR.T + SAR.M;
export const SAR_INJ = SAR.I + SAR.G + SAR.X;
export const SAR_GAP = SAR_LEAK - SAR_INJ;
assert(SAR_LEAK === 520 && SAR_INJ === 470 && SAR_GAP === 50, 'sarayu');
// (6) Tungadesh: injections exceed leakages.
export const TUN = { S: 90, T: 120, M: 70, I: 110, G: 140, X: 60 };
export const TUN_LEAK = TUN.S + TUN.T + TUN.M;
export const TUN_INJ = TUN.I + TUN.G + TUN.X;
export const TUN_GAP = TUN_INJ - TUN_LEAK;
assert(TUN_LEAK === 280 && TUN_INJ === 310 && TUN_GAP === 30, 'tungadesh');
// (7) Konkanpur: the export value that balances the flow.
export const KON = { S: 140, T: 160, M: 120, I: 150, G: 190 };
export const KON_X = KON.S + KON.T + KON.M - KON.I - KON.G;
assert(KON_X === 80, 'konkanpur exports');
// (8) Pennarpur: the import value that balances the flow.
export const PEN = { S: 130, T: 170, I: 160, G: 180, X: 90 };
export const PEN_M = PEN.I + PEN.G + PEN.X - PEN.S - PEN.T;
assert(PEN_M === 130, 'pennarpur imports');
// (9) Gomtipur, a three-sector economy: the saving that balances the flow.
export const GOM = { T: 90, I: 120, G: 110 };
export const GOM_S = GOM.I + GOM.G - GOM.T;
assert(GOM_S === 140, 'gomtipur saving');
// (10) A household sector in the three-sector model: Y = C + S + T.
export const HH = { Y: 900, T: 150, S: 120 };
export const HH_C = HH.Y - HH.T - HH.S;
assert(HH_C === 630, 'household consumption');

// ================================================================ t01 Two-sector model
Q('m_cf_meaning', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'A student in an imagined Shillong classroom is asked to define the circular flow of income. Which definition is correct?',
  opts: [
    'The unending movement of production, income and spending between the sectors of an economy',
    'The one-way movement of goods from factories to shops',
    'The total value of goods kept in a firm\'s warehouse on a given date',
    'The yearly increase in the money supply of a country',
  ],
  sol: 'The circular flow shows production creating income, income being spent, and spending calling forth more production, round and round. A one-way movement of goods leaves out income and spending; a stock in a warehouse is a stock, not a flow; money supply is a different idea.',
}));
Q('m_two_assume', mcq({
  t: 1, d: 1, c: 'understanding',
  stem: 'Which of these is an assumption of the simplest two-sector model of the circular flow, used for the imagined island of Kanakdwip?',
  opts: [
    'Households spend their entire income on goods and services produced by firms',
    'Firms pay taxes to the government on their profits',
    'Households buy some goods from foreign countries',
    'Firms keep part of their receipts as saving in banks',
  ],
  sol: 'The simplest model has only households and firms, no government, no foreign trade and no saving, so all income is spent on firms\' output. Taxes need a government, imports need a foreign sector, and saving is added only in the extended two-sector model.',
}));
Q('m_real_flow_eg', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'In imagined Kanakdwip, which of these is a real flow from households to firms?',
  opts: [
    'A carpenter\'s labour supplied to a furniture firm',
    'Wages paid by the furniture firm to the carpenter',
    'Rupees a family spends on a new dining table',
    'Profit paid out by the firm to its owner',
  ],
  sol: 'Real flows are flows of factor services and goods. The carpenter\'s labour is a factor service moving from a household to a firm. Wages, consumption spending and profit are all money flows.',
}));
Q('m_money_flow_eg', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'A bakery in an imagined hill town pays rent to the family that owns its shop. In the circular flow this rent is',
  opts: [
    'a money flow from firms to households, as a factor payment',
    'a real flow from firms to households, as goods',
    'a money flow from households to firms, as consumption spending',
    'a real flow from households to firms, as labour',
  ],
  sol: 'Rent is the reward for the land and building that the family (a household) lets to the bakery (a firm), so it is a factor payment, a money flow from firms to households.',
}));
Q('m_flows_opposite', mcq({
  t: 1, d: 1, c: 'understanding',
  stem: 'How do the real flows and the money flows of the two-sector circular flow move relative to each other?',
  opts: ['In opposite directions', 'In the same direction', 'Real flows move only in the factor market', 'Money flows move only in the product market'],
  sol: 'Every real flow is paid for: labour goes from households to firms while wages come back from firms to households, and goods go to households while spending goes to firms. So the two flows run in opposite directions in both markets.',
}));
Q('m_two_equal', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: `Firms in imagined Kanakdwip pay wages ₹${KAN.wages} crore, rent ₹${KAN.rent} crore, interest ₹${KAN.interest} crore and profit ₹${KAN.profit} crore. Households save nothing. What is total consumption expenditure on firms' output?`,
  opts: [`₹${KAN_C} crore`, `₹${KAN.wages} crore`, `₹${KAN_FP - KAN.profit} crore`, `₹${2 * KAN_FP} crore`],
  sol: `Total factor income = ${KAN.wages} + ${KAN.rent} + ${KAN.interest} + ${KAN.profit} = ${KAN_FP}. With no saving, households spend all of it, so consumption expenditure is ₹${KAN_C} crore. Wages alone or income without profit leave out factor payments; doubling counts the same rupees twice.`,
}));
Q('m_fin_market', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Households in imagined Neelachal save part of their income in banks. Through which channel does this saving return to firms in the extended two-sector model?',
  opts: [
    'The financial market, which lends it to firms for investment',
    'The government, which collects it as taxes',
    'The rest of the world, which buys exports with it',
    'The product market, where it is spent on consumer goods',
  ],
  sol: 'Banks and other institutions of the financial (capital) market collect household saving and lend it to firms, which spend it on investment goods. Government and the foreign sector are not part of a two-sector model; saving is by definition not spent on consumer goods.',
}));
Q('m_s_eq_i', mcq({
  t: 1, d: 3, c: 'application',
  stem: `In imagined Neelachal, income is ₹${NEE.Y} crore and households save ₹${NEE.S} crore. For the flow of income to stay at ₹${NEE.Y} crore, investment spending by firms must be`,
  opts: [`₹${NEE.I} crore`, `₹${NEE_C} crore`, `₹${NEE.Y} crore`, 'zero'],
  sol: `Consumption is ${NEE.Y} − ${NEE.S} = ${NEE_C}. Firms receive ${NEE_C} from consumers, so they need ${NEE.Y - NEE_C} more from investment spending to match the income they paid out. Saving must equal investment: ₹${NEE.I} crore.`,
}));
Q('m_cf_importance', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Why does a statistician in an imagined state planning office find the circular flow useful when estimating national income?',
  opts: [
    'It shows that income can be measured at three points: production, distribution as factor incomes, and spending',
    'It proves that every household has the same income',
    'It shows that prices never change in an economy',
    'It shows that firms make no profit in the long run',
  ],
  sol: 'Because the same flow passes through production, factor incomes and expenditure, national income can be measured by the product, income and expenditure methods, and all three must agree. The other statements are not implied by the circular flow.',
}));
Q('ar_two_equal', ar({
  t: 1, d: 2, c: 'analysis', key: 'a',
  a: 'In a two-sector economy without saving, consumption expenditure equals the factor payments made by firms.',
  r: 'Households spend the whole of their factor income on goods and services produced by firms.',
  sol: 'Both are true, and R explains A: since nothing is saved, every rupee paid out as wages, rent, interest and profit comes back to firms as spending on their output.',
}));
Q('ar_real_money', ar({
  t: 1, d: 3, c: 'analysis', key: 'b',
  a: 'Real flows and money flows in the circular flow move in opposite directions.',
  r: 'The value of the money flows equals the value of the real flows.',
  sol: 'Both are true, but R does not explain A. The flows run opposite because payment travels against the goods or services bought; the equality of values is a separate fact about the size of the flows, not their direction.',
}));
Q('tf_saving_two', tf({
  t: 1, d: 1, c: 'understanding', ans: false,
  stem: 'True or false? In the simplest two-sector model, where households save nothing, a financial market is needed to keep income flowing.',
  sol: 'False. With no saving, all income is spent on firms\' goods, so nothing needs to be channelled back. The financial market is needed only when households save and firms invest.',
}));
Q('fb_fin_market', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'In the extended two-sector model, the market in which household saving is lent to firms for investment is called the ___ market.',
  acc: [['financial', 'capital']],
  sol: 'It is the financial (or capital) market: banks and other institutions that turn household saving into loans for investment.',
}));
Q('n_kan_income', num({
  t: 1, d: 2, c: 'understanding', marks: 1, value: KAN_FP, unit: '₹ crore',
  stem: `Firms in imagined Kanakdwip pay wages ₹${KAN.wages} crore, rent ₹${KAN.rent} crore, interest ₹${KAN.interest} crore and profit ₹${KAN.profit} crore. What is the total factor income of households (in ₹ crore)?`,
  sol: `Total factor income = ${KAN.wages} + ${KAN.rent} + ${KAN.interest} + ${KAN.profit} = ${KAN_FP}, that is ₹${KAN_FP} crore.`,
}));
Q('n_nee_c', num({
  t: 1, d: 2, c: 'understanding', marks: 1, value: NEE_C, unit: '₹ crore',
  stem: `Households in imagined Neelachal earn ₹${NEE.Y} crore and save ₹${NEE.S} crore. How much do they spend on consumer goods (in ₹ crore)?`,
  sol: `Consumption = income − saving = ${NEE.Y} − ${NEE.S} = ${NEE_C}, that is ₹${NEE_C} crore.`,
}));
Q('mt_two_flows', match({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'Match each event in an imagined handloom town with the flow it represents in the two-sector model.',
  pairs: [
    ['A weaver works a full day at a cloth mill', 'Real flow: factor service to firms'],
    ['The mill pays the weaver her daily wage', 'Money flow: factor payment to households'],
    ['A family carries home a bale of cloth', 'Real flow: goods to households'],
    ['The family pays the shop for the cloth', 'Money flow: consumption spending to firms'],
  ],
  sol: 'Labour and goods are real flows; wages and the price paid are money flows, each moving opposite to the real flow it pays for.',
}));
Q('ord_round', ord({
  t: 1, d: 2, c: 'understanding', marks: 1,
  stem: 'Arrange one round of the two-sector circular flow of imagined Kanakdwip in the correct order, starting with households.',
  items: [
    'Households supply land, labour, capital and enterprise to firms',
    'Firms use these factors to produce goods and services',
    'Firms pay rent, wages, interest and profit to households',
    'Households spend this income on goods and services from firms',
  ],
  sol: 'Factor services come first, production follows, factor incomes are paid, and the income is spent on output, which lets firms hire factors again in the next round.',
}));
Q('s_real_money', short({
  t: 1, d: 1, c: 'understanding', marks: 2, wl: S2,
  stem: 'Distinguish a real flow from a money flow, giving one example of each from a village pottery business.',
  model: 'A **real flow** is a movement of **factor services or goods**, for example a potter\'s labour going to the pottery unit or pots going to buyers. A **money flow** is a movement of **payments**, for example the potter\'s wages or the rupees buyers pay for pots.',
  sol: 'Goods and services versus payments, each with an example.',
  scheme: [['Real flow with example', 1], ['Money flow with example', 1]],
}));
Q('s_two_assumptions', short({
  t: 1, d: 1, c: 'recall', marks: 2, wl: S2,
  stem: 'State two assumptions on which the simple two-sector circular flow model of an imagined island economy is built.',
  model: '1. There are only **two sectors**, households and firms: **no government** and **no foreign trade**.\n2. Households **spend all their income** on goods produced by firms, so there is **no saving**, and firms sell all they produce to households.',
  sol: 'Any two: two sectors only; no government; closed economy; no saving; all output sold to households.',
  scheme: [['First assumption', 1], ['Second assumption', 1]],
}));
Q('s_fin_role', short({
  t: 1, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'Households in imagined Neelachal start saving part of their income. Explain how the financial market keeps the flow of income from shrinking.',
  model: 'Saving is income **not spent** on consumer goods, so firms\' sales would fall short. Banks collect this saving and **lend it to firms**, which spend it on **investment** goods. If investment equals saving, total spending again equals income.',
  sol: 'Saving is a withdrawal; the financial market returns it as investment.',
  scheme: [['Saving reduces consumer spending', 1], ['Returned as investment through banks', 1]],
}));
Q('s3_cf_uses', short({
  t: 1, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Give three reasons why the circular flow of income is useful for a planner studying an imagined state economy.',
  model: '1. **Measuring national income**: the flow can be measured at production, at factor incomes or at spending, giving the three methods.\n2. **Interdependence**: it shows that households and firms depend on each other, so a fall in one sector\'s spending cuts another\'s income.\n3. **Leakages and injections**: it shows how saving, taxes and imports withdraw money and how investment, government spending and exports return it, which guides policy.',
  sol: 'Measurement, interdependence, and leakages and injections for policy.',
  scheme: [['Measurement of national income', 1], ['Interdependence of sectors', 1], ['Leakages and injections for policy', 1]],
}));
Q('s3_four_flows', short({
  t: 1, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Describe the four flows of the simple two-sector model of an imagined economy, saying in which market each flow takes place.',
  model: '1. **Factor market, real**: households supply land, labour, capital and enterprise to firms.\n2. **Factor market, money**: firms pay rent, wages, interest and profit to households.\n3. **Product market, real**: firms supply goods and services to households.\n4. **Product market, money**: households pay firms for these goods as consumption spending. Each money flow runs opposite to the real flow it pays for.',
  sol: 'Two flows in each market, real and money, in opposite directions.',
  scheme: [['Factor market flows', 1], ['Product market flows', 1], ['Opposite directions noted', 1]],
}));
Q('s3_nee_numbers', short({
  t: 1, d: 3, c: 'application', marks: 3, wl: S3,
  stem: `Imagined Neelachal has income of ₹${NEE.Y} crore; households save ₹${NEE.S} crore and firms invest ₹${NEE.I} crore. Show with these figures that the flow of income continues unchanged.`,
  model: `Households spend ${NEE.Y} − ${NEE.S} = **₹${NEE_C} crore** on consumer goods. The saving of ₹${NEE.S} crore reaches firms through banks and is spent as **investment of ₹${NEE.I} crore**. Firms therefore receive ${NEE_C} + ${NEE.I} = **₹${NEE_C + NEE.I} crore**, exactly the income they paid out, so they can pay the same incomes again and the flow does not shrink.`,
  sol: 'Consumption, saving returned as investment, receipts equal income.',
  scheme: [['Consumption computed', 1], ['Saving returned as investment', 1], ['Receipts equal income, flow unchanged', 1]],
}));
Q('l_two_sector', long({
  t: 1, d: 3, c: 'application', marks: 5, wl: L5,
  stem: 'Answer both parts about the two-sector economy of an imagined island. [2 + 3]\n\n(a) Distinguish the factor market from the product market in the circular flow. [2]\n(b) Explain how the circular flow works when households save part of their income, and state the condition for the flow to stay unchanged. [3]',
  model: '(a) In the **factor market**, households sell the services of land, labour, capital and enterprise to firms and receive rent, wages, interest and profit. In the **product market**, firms sell goods and services to households and receive consumption spending.\n(b) When households **save** part of their income, consumer spending falls short of the income firms paid out, so firms\' receipts would fall. The saving is deposited with **banks and other financial institutions**, which **lend it to firms**. Firms spend these funds on machines, buildings and stocks, that is, **investment**. If **investment equals saving**, the money withdrawn as saving returns in full, firms receive as much as they paid, and the flow continues at the **same level**. If investment is smaller, income shrinks.',
  sol: 'Two markets; saving returned through the financial market; S = I.',
  scheme: [['Factor market', 1], ['Product market', 1], ['Saving as a withdrawal', 1], ['Financial market returns it as investment', 1], ['Condition: saving equals investment', 1]],
}));
Q('l_three_methods', long({
  t: 1, d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: 'Answer both parts. [2 + 3]\n\n(a) Why are the money flows in a two-sector economy without saving equal in value to the real flows? [2]\n(b) Using the circular flow, explain why national income measured by output, by factor incomes and by expenditure gives the same total. [3]',
  model: '(a) Every real flow is **bought and paid for**. Factor services are paid at their price as rent, wages, interest and profit, and goods are paid for at their price by consumers. So the value of what moves one way equals the money that moves the other way.\n(b) The value of goods produced by firms is **entirely paid out** to the owners of the factors as rent, wages, interest and profit, because profit is whatever is left after other payments. So **output equals factor income**. Households then **spend all** of that income on the same goods, so **income equals expenditure**. The same rupees are counted at three points of one circle, which is why the **product, income and expenditure methods** must give the same national income.',
  sol: 'Payment for every real flow; one flow measured at three points.',
  scheme: [['Every real flow is paid for', 1], ['Values equal', 1], ['Output equals factor income', 1], ['Income equals expenditure', 1], ['Three methods agree', 1]],
}));

// ================================================================ t02 Three- and four-sector models
Q('m_gov_hh', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'In the three-sector circular flow of imagined Malaygiri, which of these is a money flow from the government to households?',
  opts: ['An old-age pension paid to a retired farmer', 'Income tax paid by a doctor', 'Sales tax collected on a television', 'Payment for imported crude oil'],
  sol: 'A pension is a transfer payment from the government to a household. Income tax and sales tax flow the other way, to the government; oil imports involve the rest of the world, not the three-sector model.',
}));
Q('m_three_add', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'A teacher extends the two-sector circular flow of an imagined country into a three-sector model. Which sector is added?',
  opts: ['The government', 'The rest of the world', 'The financial market', 'The banking sector only'],
  sol: 'The three-sector model adds the government, with taxes, government purchases, transfers and subsidies. The rest of the world is the fourth sector; the financial market already appears in the extended two-sector model.',
}));
Q('m_export_flow', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'A leather firm in an imagined Kanpur sells shoes to buyers in Europe. In the four-sector circular flow, the payment it receives is',
  opts: [
    'a money flow from the rest of the world to domestic firms',
    'a money flow from domestic firms to the rest of the world',
    'a money flow from the government to firms',
    'a real flow from the rest of the world to households',
  ],
  sol: 'Export receipts come into the country from foreign buyers, so they flow from the rest of the world to domestic firms. Payments going abroad are for imports; the government and households are not involved here.',
}));
Q('m_import_flow', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'A family in an imagined Kerala town buys a mobile phone made abroad. In the four-sector model this purchase creates',
  opts: [
    'a money flow from the domestic economy to the rest of the world',
    'a money flow from the rest of the world to domestic firms',
    'a money flow from households to the government',
    'a money flow from domestic firms to households',
  ],
  sol: 'The rupees paid for an imported good go to foreign producers, so they leave the domestic flow for the rest of the world. That is why imports are a leakage.',
}));
Q('m_subsidy_flow', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'The imagined government of Malaygiri pays a subsidy to fertiliser firms. In the three-sector model this is',
  opts: ['a money flow from the government to firms', 'a money flow from firms to the government', 'a real flow from firms to the government', 'a money flow from households to the government'],
  sol: 'A subsidy is a payment made by the government to producers, so money moves from the government to firms. Taxes are the flow in the other direction.',
}));
Q('m_hh_c', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: `In a three-sector model of an imagined economy, households earn ₹${HH.Y} crore, pay taxes of ₹${HH.T} crore and save ₹${HH.S} crore. How much do they spend on consumer goods?`,
  opts: [`₹${HH_C} crore`, `₹${HH.Y - HH.S} crore`, `₹${HH.Y - HH.T} crore`, `₹${HH.Y} crore`],
  sol: `Household income is used for consumption, saving and taxes, so C = ${HH.Y} − ${HH.T} − ${HH.S} = ${HH_C}. Subtracting only one of the two withdrawals overstates consumption.`,
}));
Q('m_gov_purchase', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'The imagined state of Malaygiri buys desks for its schools from a furniture firm. Which pair of flows does this create?',
  opts: [
    'A real flow of desks from the firm to the government and a money flow of payment from the government to the firm',
    'A money flow of taxes from the firm to the government and nothing in return',
    'A real flow of desks from households to the government',
    'A transfer payment from the government to households',
  ],
  sol: 'A government purchase is an exchange: goods go to the government and payment goes to the firm, in opposite directions. A tax or a transfer has no goods or service in return.',
}));
Q('ar_tax_leak', ar({
  t: [2, 3], d: 3, c: 'analysis', key: 'c',
  a: 'Taxes are a leakage from the circular flow of income.',
  r: 'Taxes collected by the government are never spent again in the economy.',
  sol: 'A is true: taxes are income taken out of households\' and firms\' spending. R is false: the government spends tax revenue on purchases, salaries and transfers, which is why government spending appears as an injection.',
}));
Q('tf_transfer', tf({
  t: 2, d: 1, c: 'understanding', ans: true,
  stem: 'True or false? In the three-sector model, a scholarship paid by the government to a student is a money flow from the government to households.',
  sol: 'True. A scholarship is a transfer payment from the government to a household, with no good or service given in return.',
}));
Q('fb_four_sector', fb({
  t: 2, d: 1, c: 'recall',
  stem: 'The four-sector model adds the ___ sector, which buys a country\'s exports and sells it imports.',
  acc: [['rest of the world', 'foreign', 'external']],
  sol: 'The fourth sector is the rest of the world (the foreign or external sector).',
}));
Q('n_gom_s', num({
  t: 2, d: 3, c: 'application', marks: 1, value: GOM_S, unit: '₹ crore',
  stem: `In the three-sector economy of imagined Gomtipur, taxes are ₹${GOM.T} crore, investment ₹${GOM.I} crore and government spending ₹${GOM.G} crore. What saving would keep the flow of income in balance (in ₹ crore)?`,
  sol: `Balance needs S + T = I + G, so S = ${GOM.I} + ${GOM.G} − ${GOM.T} = ${GOM_S}, that is ₹${GOM_S} crore.`,
}));
Q('n_vin_c', num({
  t: 2, d: 2, c: 'understanding', marks: 1, value: VIN_C, unit: '₹ crore',
  stem: `Households in imagined Vindhyadesh earn ₹${inr(VIN.Y)} crore, save ₹${VIN.S} crore and pay taxes of ₹${VIN.T} crore. What is their consumption expenditure (in ₹ crore)?`,
  sol: `C = ${VIN.Y} − ${VIN.S} − ${VIN.T} = ${VIN_C}, that is ₹${VIN_C} crore.`,
}));
Q('s_gov_hh_flows', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State the two money flows between the government and households in the three-sector circular flow of an imagined state, with an example of each.',
  model: '1. **Households to the government**: **taxes**, for example income tax paid by a shopkeeper.\n2. **Government to households**: **transfers and factor payments**, for example an old-age pension or the salary of a government school teacher.',
  sol: 'Taxes one way; transfers and wages the other.',
  scheme: [['Taxes with example', 1], ['Transfers or salaries with example', 1]],
}));
Q('s_row_flows', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Name the two money flows that link the domestic economy with the rest of the world in the four-sector model, giving an example of each from an imagined port city.',
  model: '1. **Export receipts**: money flows **into** the country, for example foreign buyers paying a port city firm for shrimp.\n2. **Import payments**: money flows **out**, for example a refinery in the city paying a foreign supplier for crude oil.',
  sol: 'Exports bring money in; imports send money out.',
  scheme: [['Export receipts with example', 1], ['Import payments with example', 1]],
}));
Q('s_transfer_purchase', short({
  t: 2, d: 2, c: 'analysis', marks: 2, wl: S2,
  stem: 'The imagined government of Malaygiri pays a widow\'s pension and also buys buses from a local firm. Explain why only one of these comes with a real flow.',
  model: 'The **bus purchase** is an exchange: buses (a real flow) go to the government while payment goes to the firm. The **pension** is a **transfer payment**: money goes to the widow but **nothing is produced or given in return**, so there is no matching real flow.',
  sol: 'Purchase is an exchange; transfer has no counterpart.',
  scheme: [['Purchase has goods in return', 1], ['Transfer has nothing in return', 1]],
}));
Q('s3_mal_numbers', short({
  t: 2, d: 3, c: 'application', marks: 3, wl: S3,
  stem: `Imagined Malaygiri has income ₹${inr(MAL.Y)} crore, saving ₹${MAL.S} crore, taxes ₹${MAL.T} crore, investment ₹${MAL.I} crore and government spending ₹${MAL.G} crore. Find consumption and show that the flow is in balance.`,
  model: `Consumption = ${MAL.Y} − ${MAL.S} − ${MAL.T} = **₹${MAL_C} crore**. Leakages = saving + taxes = ${MAL.S} + ${MAL.T} = **₹${MAL_LEAK} crore**; injections = investment + government spending = ${MAL.I} + ${MAL.G} = **₹${MAL_INJ} crore**. They are **equal**, and firms receive ${MAL_C} + ${MAL.I} + ${MAL.G} = ₹${inr(MAL.Y)} crore, the same as income, so the flow is in balance.`,
  sol: 'Consumption, then leakages against injections, then spending against income.',
  scheme: [['Consumption', 1], ['Leakages equal injections', 1], ['Total spending equals income', 1]],
}));
Q('s3_four_extend', short({
  t: 2, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain how the four-sector model of an imagined trading nation extends the three-sector model of its circular flow.',
  model: '1. It adds the **rest of the world** as a fourth sector, so the economy is **open**.\n2. Domestic firms **export** goods and receive **export receipts**, which is an **injection** of money into the domestic flow.\n3. Households, firms and the government **import** goods and make **import payments**, a **leakage** of money abroad. Balance now needs saving + taxes + imports = investment + government spending + exports.',
  sol: 'Open economy; exports in; imports out; new balance condition.',
  scheme: [['Rest of the world added', 1], ['Exports as an injection', 1], ['Imports as a leakage and the balance condition', 1]],
}));
Q('s3_gov_roles', short({
  t: 2, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'Describe three ways in which the government of an imagined state takes part in the circular flow of income.',
  model: '1. **Collects taxes** from households and firms, which withdraws money from their spending.\n2. **Buys goods and services** from firms and **hires factors**, such as teachers and road workers, paying them salaries; this returns money to the flow.\n3. **Pays transfers and subsidies**, such as pensions to households and subsidies to fertiliser firms, which add to their spending power without any good in return.',
  sol: 'Taxes, purchases and factor payments, transfers and subsidies.',
  scheme: [['Taxes', 1], ['Purchases and salaries', 1], ['Transfers and subsidies', 1]],
}));
Q('l_three_four', long({
  t: 2, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Answer both parts about the circular flow of an imagined country. [2 + 3]\n\n(a) What new flows appear when the government is added to the two-sector model? [2]\n(b) Explain the flows that appear when the rest of the world is added, and how they change the condition for balance. [3]',
  model: '(a) Households and firms pay **taxes** to the government. The government pays **salaries** and **transfers** such as pensions to households, buys **goods and services** from firms, and pays **subsidies** to firms. Taxes withdraw money, while government spending returns it.\n(b) With the **rest of the world**, domestic firms sell **exports** and receive export receipts, which bring money **into** the domestic flow. Households, firms and the government buy **imports** and send payments **abroad**, which take money **out** of it. Imports are therefore a **leakage** and exports an **injection**. Balance now requires **saving + taxes + imports = investment + government spending + exports**, and total spending on domestic output becomes consumption + investment + government spending + exports − imports.',
  sol: 'Government flows; foreign flows; new balance condition.',
  scheme: [['Taxes', 1], ['Government spending flows', 1], ['Exports as an injection', 1], ['Imports as a leakage', 1], ['Four-sector balance condition', 1]],
}));
Q('l_vin_numbers', long({
  t: [2, 3], d: 4, c: 'analysis', marks: 5, wl: L5,
  stem: `Answer both parts about imagined Vindhyadesh (₹ crore): income ${inr(VIN.Y)}, saving ${VIN.S}, taxes ${VIN.T}, imports ${VIN.M}, investment ${VIN.I}, government spending ${VIN.G}, exports ${VIN.X}. [2 + 3]\n\n(a) Find household consumption. [2]\n(b) Show that the flow is in balance by two methods: comparing leakages with injections, and comparing total spending on domestic output with income. [3]`,
  model: `(a) Households use income for consumption, saving and taxes, so consumption = ${VIN.Y} − ${VIN.S} − ${VIN.T} = **₹${VIN_C} crore**.\n(b) **Method 1**: leakages = saving + taxes + imports = ${VIN.S} + ${VIN.T} + ${VIN.M} = **₹${VIN_LEAK} crore**; injections = investment + government spending + exports = ${VIN.I} + ${VIN.G} + ${VIN.X} = **₹${VIN_INJ} crore**. They are equal. **Method 2**: spending on domestic output = consumption + investment + government spending + exports − imports = ${VIN_C} + ${VIN.I} + ${VIN.G} + ${VIN.X} − ${VIN.M} = **₹${inr(VIN_SPEND)} crore**, equal to income. Both methods show that every rupee withdrawn is returned, so income neither rises nor falls.`,
  sol: 'Consumption; leakages equal injections; spending equals income.',
  scheme: [['Consumption formula', 1], ['Consumption value', 1], ['Leakages and injections computed', 1], ['Spending on domestic output computed', 1], ['Conclusion: balance', 1]],
}));

// ================================================================ t03 Leakages and injections
Q('m_leak_meaning', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'In the circular flow of an imagined country, a leakage is best described as',
  opts: [
    'income that is withdrawn from the flow instead of being spent on domestic output',
    'spending added to the flow from outside the household sector\'s consumption',
    'a fall in the price of goods during a slump',
    'the output that firms fail to sell in a year',
  ],
  sol: 'A leakage (withdrawal) is income not passed on as spending on domestic goods: saving, taxes and imports. Spending added from outside is an injection.',
}));
Q('m_inj_eg', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'Which of these events in an imagined state is an injection into its circular flow of income?',
  opts: ['The state government builds a new district hospital', 'A family deposits part of its income in a bank', 'A salaried worker pays income tax', 'A mill imports cotton from abroad'],
  sol: 'Government spending on a hospital adds spending that does not come from household consumption, so it is an injection. Saving, taxes and imports are leakages.',
}));
Q('m_leak_eg', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'Which of these is a leakage from the circular flow of an imagined coastal economy?',
  opts: ['Tax deducted from a teacher\'s salary', 'Purchase of a fishing trawler by a firm', 'Sale of dried fish to a foreign buyer', 'Construction of a jetty by the government'],
  sol: 'The tax is income withdrawn from spending, so it is a leakage. A firm\'s trawler purchase is investment, a foreign sale is an export, and the jetty is government spending: all injections.',
}));
Q('m_leak_gt', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: `In imagined Sarayu Pradesh, planned leakages are ₹${SAR_LEAK} crore and planned injections ₹${SAR_INJ} crore. What will happen to national income?`,
  opts: ['It will fall', 'It will rise', 'It will stay the same', 'It will double'],
  sol: `Leakages exceed injections by ₹${SAR_GAP} crore, so less money returns to firms as spending than they paid out. They cannot sell all their output, cut production and pay out less income, so national income falls until leakages and injections are equal again.`,
}));
Q('m_eq_four', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Which condition must hold for the flow of income of an imagined open economy with a government to stay at the same level?',
  opts: [
    'Saving + taxes + imports = investment + government spending + exports',
    'Saving + investment = taxes + government spending',
    'Exports + imports = saving + taxes',
    'Consumption = saving',
  ],
  sol: 'In the four-sector model the leakages are saving, taxes and imports, and the injections are investment, government spending and exports. The flow is steady when total leakages equal total injections. The other options mix leakages with injections.',
}));
Q('m_kon_x', mcq({
  t: 3, d: 3, c: 'application',
  stem: `Imagined Konkanpur has saving ₹${KON.S} crore, taxes ₹${KON.T} crore, imports ₹${KON.M} crore, investment ₹${KON.I} crore and government spending ₹${KON.G} crore. What value of exports would keep its income steady?`,
  opts: [`₹${KON_X} crore`, `₹${KON.M} crore`, `₹${KON.S + KON.T + KON.M} crore`, `₹${KON.I + KON.G - KON.S - KON.T} crore`],
  sol: `Leakages = ${KON.S} + ${KON.T} + ${KON.M} = ${KON.S + KON.T + KON.M}. Injections other than exports = ${KON.I} + ${KON.G} = ${KON.I + KON.G}. Exports needed = ${KON.S + KON.T + KON.M} − ${KON.I + KON.G} = ${KON_X}.`,
}));
Q('m_inj_gt', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: `Imagined Tungadesh plans leakages of ₹${TUN_LEAK} crore and injections of ₹${TUN_INJ} crore. Which outcome is most likely if it has idle factories and workers?`,
  opts: [
    'Output, income and employment rise',
    'Output and income fall',
    'Income stays unchanged because the gap is small',
    'Exports fall to zero',
  ],
  sol: `Injections exceed leakages by ₹${TUN_GAP} crore, so firms receive more spending than they paid out as income. With idle capacity they expand output and hire more workers, so income and employment rise until leakages catch up with injections.`,
}));
Q('ar_imports_inj', ar({
  t: 3, d: 2, c: 'analysis', key: 'd',
  a: 'Imports are an injection into the domestic circular flow of income.',
  r: 'Payments for imports bring money into the country from abroad.',
  sol: 'Both are false. Import payments send money out of the country to foreign producers, so imports are a leakage, not an injection.',
}));
Q('ar_leak_fall', ar({
  t: 3, d: 3, c: 'analysis', key: 'a',
  a: 'If planned leakages exceed planned injections, national income tends to fall.',
  r: 'Less money returns to firms as spending than they paid out as income, so they reduce production.',
  sol: 'Both are true, and R explains A: the shortfall in spending leaves firms with unsold goods, they cut output and incomes, and national income falls.',
}));
Q('tf_exports_leak', tf({
  t: 3, d: 2, c: 'application', ans: false,
  stem: 'True or false? Exports of tea from an imagined hill state are a leakage from its circular flow because the tea leaves the country.',
  sol: 'False. The tea goes out, but money comes in from foreign buyers and is spent on domestic output, so exports are an injection.',
}));
Q('n_sar_gap', num({
  t: 3, d: 2, c: 'understanding', marks: 1, value: SAR_GAP, unit: '₹ crore',
  stem: `Imagined Sarayu Pradesh plans saving ₹${SAR.S} crore, taxes ₹${SAR.T} crore and imports ₹${SAR.M} crore, with investment ₹${SAR.I} crore, government spending ₹${SAR.G} crore and exports ₹${SAR.X} crore. By how much do leakages exceed injections (in ₹ crore)?`,
  sol: `Leakages = ${SAR.S} + ${SAR.T} + ${SAR.M} = ${SAR_LEAK}. Injections = ${SAR.I} + ${SAR.G} + ${SAR.X} = ${SAR_INJ}. Excess = ${SAR_LEAK} − ${SAR_INJ} = ${SAR_GAP}, that is ₹${SAR_GAP} crore.`,
}));
Q('n_pen_m', num({
  t: 3, d: 3, c: 'application', marks: 1, value: PEN_M, unit: '₹ crore',
  stem: `In imagined Pennarpur, saving is ₹${PEN.S} crore, taxes ₹${PEN.T} crore, investment ₹${PEN.I} crore, government spending ₹${PEN.G} crore and exports ₹${PEN.X} crore. What level of imports keeps the flow in balance (in ₹ crore)?`,
  sol: `Balance needs S + T + M = I + G + X, so M = ${PEN.I} + ${PEN.G} + ${PEN.X} − ${PEN.S} − ${PEN.T} = ${PEN_M}, that is ₹${PEN_M} crore.`,
}));
Q('mt_leak_inj', match({
  t: 3, d: 2, c: 'application', marks: 2,
  stem: 'Match each item in the accounts of an imagined river-valley economy with its place in the circular flow.',
  pairs: [
    ['Households keep part of their income in post-office savings', 'Leakage through the financial market'],
    ['Traders pay goods and services tax', 'Leakage to the government'],
    ['A refinery buys crude oil from abroad', 'Leakage to the rest of the world'],
    ['A spice exporter is paid by foreign buyers', 'Injection from the rest of the world'],
  ],
  sol: 'Saving, taxes and imports are the three leakages, each going to a different place; export receipts are an injection.',
}));
Q('s_leak_inj', short({
  t: 3, d: 1, c: 'understanding', marks: 2, wl: S2,
  stem: 'Distinguish a leakage from an injection in the circular flow, giving one example of each from an imagined farming district.',
  model: 'A **leakage** is income **withdrawn** from spending on domestic output, for example a farmer depositing part of his crop income in a bank. An **injection** is spending **added** from outside household consumption, for example the state building a canal in the district.',
  sol: 'Withdrawal versus addition, with examples.',
  scheme: [['Leakage with example', 1], ['Injection with example', 1]],
}));
Q('s_export_rise', short({
  t: 3, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'Exports of carpets from an imagined state rise while its saving, taxes and imports stay the same. Explain the likely effect on its income.',
  model: 'Exports are an **injection**, so injections now **exceed leakages**. Carpet makers receive more than they paid out, **expand output and hire more weavers**, and income **rises**. It keeps rising until higher saving, taxes and imports make leakages equal to injections.',
  sol: 'Injections exceed leakages, so income rises.',
  scheme: [['Exports are an injection; injections exceed leakages', 1], ['Income rises until balance returns', 1]],
}));
Q('s_three_cond', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State the condition for a steady flow of income in a three-sector economy and explain it briefly, with reference to an imagined state.',
  model: 'The condition is **saving + taxes = investment + government spending**. Saving and taxes are the money households and firms **withdraw**; investment and government spending are the money **returned**. When the two totals are equal, the state\'s income neither grows nor shrinks.',
  sol: 'S + T = I + G, withdrawn money fully returned.',
  scheme: [['Condition stated', 1], ['Explained as withdrawals returned', 1]],
}));
Q('s3_sar_effect', short({
  t: 3, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: `Imagined Sarayu Pradesh plans leakages of ₹${SAR_LEAK} crore and injections of ₹${SAR_INJ} crore. Explain, step by step, what happens to its income.`,
  model: `1. Leakages exceed injections by **₹${SAR_GAP} crore**, so firms receive **less spending** than the income they paid out.\n2. Goods pile up **unsold**, so firms **cut production** and employ fewer workers.\n3. Lower income reduces saving, tax payments and imports, so leakages **fall**. Income keeps **falling** until leakages again equal injections at a lower level.`,
  sol: 'Shortfall, cut in output, fall in income until balance.',
  scheme: [['Shortfall in spending', 1], ['Firms cut output and jobs', 1], ['Income falls until leakages equal injections', 1]],
}));
Q('s3_classify_six', short({
  t: 3, d: 2, c: 'application', marks: 3, wl: S3,
  stem: 'Classify each item as a leakage or an injection for an imagined island economy: (i) a hotel chain builds a new resort, (ii) a fisherman saves in a cooperative bank, (iii) the island buys diesel from abroad, (iv) the government pays nurses\' salaries, (v) a shopkeeper pays sales tax, (vi) coconut oil is sold to a foreign buyer.',
  model: '**Injections**: (i) building a resort is **investment**; (iv) nurses\' salaries are **government spending**; (vi) coconut oil sold abroad is an **export**. **Leakages**: (ii) the fisherman\'s deposit is **saving**; (iii) diesel bought abroad is an **import**; (v) sales tax is a **tax**. Each pair of leakages and injections matches one sector: households, the government and the rest of the world.',
  sol: 'Three injections and three leakages, each named.',
  scheme: [['Two items correct', 1], ['Four items correct', 1], ['All six correct', 1]],
}));
Q('s3_kon_x', short({
  t: 3, d: 3, c: 'application', marks: 3, wl: S3,
  stem: `For imagined Konkanpur (₹ crore: saving ${KON.S}, taxes ${KON.T}, imports ${KON.M}, investment ${KON.I}, government spending ${KON.G}), find the exports needed for balance and explain what happens if exports turn out lower.`,
  model: `Balance needs leakages = injections: ${KON.S} + ${KON.T} + ${KON.M} = ${KON.I} + ${KON.G} + exports, so ${KON.S + KON.T + KON.M} = ${KON.I + KON.G} + exports and **exports = ₹${KON_X} crore**. If exports are lower, **leakages exceed injections**, firms receive less than they paid out, and **income falls** until leakages shrink to match.`,
  sol: 'Solve the balance condition; lower exports mean a fall in income.',
  scheme: [['Balance condition set up', 1], ['Exports found', 1], ['Effect of lower exports', 1]],
}));
Q('l_leak_inj', long({
  t: 3, d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: 'Answer both parts about the circular flow of an imagined open economy. [2 + 3]\n\n(a) Name the three leakages and the three injections, linking each to the sector where it occurs. [2]\n(b) Explain what happens to national income when injections exceed leakages, and why the economy settles again. [3]',
  model: '(a) **Leakages**: **saving** by households (through the financial market), **taxes** (to the government) and **imports** (to the rest of the world). **Injections**: **investment** by firms, **government spending** on goods, services and salaries, and **exports** bought by the rest of the world.\n(b) When **injections exceed leakages**, firms receive **more spending** than the income they paid out, and their stocks run down. They **raise output** and hire more factors, so **incomes rise**. As incomes rise, households **save more**, pay **more taxes** and buy **more imports**, so leakages grow. Income keeps rising until **leakages equal injections** again, at a **higher** level of income, where the flow becomes steady.',
  sol: 'Three of each with sectors; rising income raises leakages until balance.',
  scheme: [['Three leakages with sectors', 1], ['Three injections with sectors', 1], ['Excess spending, output rises', 1], ['Leakages rise with income', 1], ['New balance at a higher income', 1]],
}));
Q('l_sar_policy', long({
  t: 3, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: `Answer both parts about imagined Sarayu Pradesh (₹ crore): saving ${SAR.S}, taxes ${SAR.T}, imports ${SAR.M}, investment ${SAR.I}, government spending ${SAR.G}, exports ${SAR.X}. [2 + 3]\n\n(a) Calculate the gap between leakages and injections and state its direction. [2]\n(b) Suggest and evaluate two ways in which the government could close this gap. [3]`,
  model: `(a) Leakages = ${SAR.S} + ${SAR.T} + ${SAR.M} = **₹${SAR_LEAK} crore**; injections = ${SAR.I} + ${SAR.G} + ${SAR.X} = **₹${SAR_INJ} crore**. Leakages **exceed** injections by **₹${SAR_GAP} crore**, so income will tend to fall.\n(b) **Raise government spending** by about ₹${SAR_GAP} crore, for example on rural roads: this adds an injection directly and creates jobs, but it must be financed, and borrowing adds to public debt. **Cut taxes** to reduce a leakage: households keep more income and spend more, but part of the tax cut is saved, so a larger cut may be needed. Raising spending works **faster and more surely**, while a tax cut spreads the benefit more widely; a mix of the two is often the most practical choice.`,
  sol: 'Gap computed; two measures weighed.',
  scheme: [['Leakages and injections computed', 1], ['Gap and its direction', 1], ['First measure with reasoning', 1], ['Second measure with reasoning', 1], ['Evaluation', 1]],
}));

// ================================================================ ISC paper-style 4- and 8-mark items (bank only)
Q('s4_two_sector', short({
  t: 1, d: 3, c: 'application', marks: 4, wl: S4,
  stem: `Answer both subparts about imagined Kanakdwip. [2 + 2]\n\n(i) Firms pay wages ₹${KAN.wages} crore, rent ₹${KAN.rent} crore, interest ₹${KAN.interest} crore and profit ₹${KAN.profit} crore. With no saving, find household income and consumption spending.\n(ii) Explain why profit is counted as a factor payment to households in the circular flow.`,
  model: `(i) Household income = ${KAN.wages} + ${KAN.rent} + ${KAN.interest} + ${KAN.profit} = **₹${KAN_FP} crore**. With no saving, all of it is spent, so consumption spending = **₹${KAN_C} crore**, the same as the value of firms\' output.\n(ii) Profit is the **reward for enterprise**, a factor service supplied by the owners of firms, who belong to the **household** sector. Firms pay out the whole value of output as rent, wages, interest and profit, so profit is the **remainder** that completes the payment to factor owners.`,
  sol: 'Sum of factor incomes; profit as the reward to entrepreneurs.',
  scheme: [['(i) Income', 1], ['(i) Consumption equals income', 1], ['(ii) Reward for enterprise owned by households', 1], ['(ii) Remainder completes payment', 1]],
}));
Q('s4_gov_sector', short({
  t: 2, d: 3, c: 'application', marks: 4, wl: S4,
  stem: `Answer both subparts about imagined Malaygiri. [2 + 2]\n\n(i) Households earn ₹${inr(MAL.Y)} crore, save ₹${MAL.S} crore and pay taxes of ₹${MAL.T} crore. Find their consumption.\n(ii) Firms invest ₹${MAL.I} crore and the government spends ₹${MAL.G} crore. Show whether the flow is in balance.`,
  model: `(i) Consumption = income − saving − taxes = ${MAL.Y} − ${MAL.S} − ${MAL.T} = **₹${MAL_C} crore**.\n(ii) Leakages = ${MAL.S} + ${MAL.T} = **₹${MAL_LEAK} crore**; injections = ${MAL.I} + ${MAL.G} = **₹${MAL_INJ} crore**. They are **equal**, so firms receive ${MAL_C} + ${MAL.I} + ${MAL.G} = ₹${inr(MAL.Y)} crore, as much as they paid out, and the flow is in balance.`,
  sol: 'Consumption; leakages against injections.',
  scheme: [['(i) Method', 1], ['(i) Value', 1], ['(ii) Leakages and injections', 1], ['(ii) Balance shown', 1]],
}));
Q('s4_tun', short({
  t: 3, d: 3, c: 'analysis', marks: 4, wl: S4,
  stem: `Answer both subparts about imagined Tungadesh. [2 + 2]\n\n(i) It plans saving ₹${TUN.S} crore, taxes ₹${TUN.T} crore and imports ₹${TUN.M} crore, with investment ₹${TUN.I} crore, government spending ₹${TUN.G} crore and exports ₹${TUN.X} crore. Compare leakages with injections.\n(ii) Explain the likely effect on income and employment.`,
  model: `(i) Leakages = ${TUN.S} + ${TUN.T} + ${TUN.M} = **₹${TUN_LEAK} crore**; injections = ${TUN.I} + ${TUN.G} + ${TUN.X} = **₹${TUN_INJ} crore**. Injections exceed leakages by **₹${TUN_GAP} crore**.\n(ii) Firms receive **more spending** than they paid out as income, so they **raise output** and **hire more workers**, and income rises. Rising income lifts saving, taxes and imports until leakages equal injections at a higher income.`,
  sol: 'Injections exceed leakages; income and jobs rise.',
  scheme: [['(i) Totals', 1], ['(i) Gap and direction', 1], ['(ii) Output and jobs rise', 1], ['(ii) New balance', 1]],
}));
Q('l8_four_sector', long({
  t: [2, 3], d: 4, c: 'analysis', marks: 8, wl: L8,
  stem: `Answer both parts. [4 + 4]\n\n(i) Explain the circular flow of income in a four-sector economy, naming the flows between households, firms, the government and the rest of the world.\n(ii) Imagined Vindhyadesh (₹ crore) has income ${inr(VIN.Y)}, saving ${VIN.S}, taxes ${VIN.T}, imports ${VIN.M}, investment ${VIN.I}, government spending ${VIN.G} and exports ${VIN.X}. Find consumption and show by two methods that its flow is in balance.`,
  model: `(i) **Households** supply factor services to firms and receive rent, wages, interest and profit, which they spend on consumer goods or save through the **financial market**, which lends to firms for **investment**. The **government** collects **taxes** from households and firms and returns money as **purchases**, **salaries**, **transfers** and **subsidies**. The **rest of the world** buys **exports**, sending money in, and sells **imports**, taking money out. So the leakages are saving, taxes and imports, and the injections are investment, government spending and exports.\n(ii) Consumption = ${VIN.Y} − ${VIN.S} − ${VIN.T} = **₹${VIN_C} crore**. **Method 1**: leakages = ${VIN.S} + ${VIN.T} + ${VIN.M} = ₹${VIN_LEAK} crore and injections = ${VIN.I} + ${VIN.G} + ${VIN.X} = ₹${VIN_INJ} crore, which are **equal**. **Method 2**: spending on domestic output = ${VIN_C} + ${VIN.I} + ${VIN.G} + ${VIN.X} − ${VIN.M} = **₹${inr(VIN_SPEND)} crore**, equal to income. The flow is therefore in balance, and income will stay at this level.`,
  sol: 'Flows among four sectors; consumption; two balance checks.',
  scheme: [['(i) Household and firm flows', 1], ['(i) Financial market', 1], ['(i) Government flows', 1], ['(i) Rest of the world flows', 1], ['(ii) Consumption', 1], ['(ii) Leakages', 1], ['(ii) Injections and equality', 1], ['(ii) Spending equals income', 1]],
}));
Q('l8_leak_balance', long({
  t: 3, d: 4, c: 'evaluation', marks: 8, wl: L8,
  stem: `Answer both parts. [4 + 4]\n\n(i) Explain why national income settles where planned leakages equal planned injections, using the case where leakages are larger.\n(ii) Imagined Pennarpur (₹ crore) has saving ${PEN.S}, taxes ${PEN.T}, investment ${PEN.I}, government spending ${PEN.G} and exports ${PEN.X}. Find the imports that would keep its income steady, and evaluate whether cutting imports is a sound way to raise income.`,
  model: `(i) If planned **leakages exceed** planned injections, firms receive **less spending** than the income they paid out, so goods remain **unsold**. Firms **cut output** and employment, so **income falls**. As income falls, households save less, pay less tax and buy fewer imports, so **leakages shrink**. The fall stops when leakages have shrunk to equal injections. Only then is every rupee withdrawn returned as spending, so firms have no reason to change output and income **settles**.\n(ii) Steady income needs S + T + M = I + G + X, so imports = ${PEN.I} + ${PEN.G} + ${PEN.X} − ${PEN.S} − ${PEN.T} = **₹${PEN_M} crore**. Cutting imports **reduces a leakage**, so more spending stays at home and income can rise. But many imports are **inputs** such as fuel and machines, and cutting them can **raise costs** and hurt production; other countries may also **buy fewer of our exports** in return, which cuts an injection. So import cuts help only in a limited way, and raising investment or exports is usually a sounder route.`,
  sol: 'Adjustment to balance; missing imports; balanced evaluation.',
  scheme: [['(i) Shortfall and unsold goods', 1], ['(i) Output and income fall', 1], ['(i) Leakages shrink', 1], ['(i) Settles at balance', 1], ['(ii) Balance condition', 1], ['(ii) Imports found', 1], ['(ii) Benefit of fewer imports', 1], ['(ii) Limits and judgement', 1]],
}));

// ================================================================ case-based
Q('cb_kanakdwip', caseQ({
  t: 1, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the imagined note from the planning office of Kanakdwip and answer the questions that follow. *(Written by SOYL for practice; the island and figures are imagined.)*',
  passage: `**Kanakdwip planning office, note for the island council (imagined)**\n\nKanakdwip has no government spending of its own and no foreign trade. Its firms paid wages of ₹${KAN.wages} crore, rent of ₹${KAN.rent} crore, interest of ₹${KAN.interest} crore and profit of ₹${KAN.profit} crore last year. Until now, families spent every rupee they earned in the island's shops. This year a new cooperative bank has opened, and families plan to deposit part of their earnings in it.`,
  parts: [
    child('a', num({ t: 1, d: 2, c: 'application', marks: 1, value: KAN_C, unit: '₹ crore', stem: 'What was total consumption spending last year (in ₹ crore)?', sol: `All factor income was spent: ${KAN.wages} + ${KAN.rent} + ${KAN.interest} + ${KAN.profit} = ${KAN_C}, that is ₹${KAN_C} crore.` })),
    child('b', short({ t: 1, d: 2, c: 'understanding', marks: 1, stem: 'Identify one real flow and one money flow described in the note.', model: 'Real flow: **factor services** of workers and landowners to firms (or goods sold in shops). Money flow: **wages, rent, interest or profit** paid by firms (or family spending in shops).', sol: 'One real and one money flow.', scheme: [['One real and one money flow', 1]] })),
    child('c', short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Explain what will happen to the income of Kanakdwip if families deposit money in the bank but firms do not borrow it.', model: 'The deposits are **saving**, a leakage. If firms do not borrow and invest them, firms receive **less spending** than they paid out, so they cut output and **income falls**.', sol: 'Saving without investment shrinks the flow.', scheme: [['Saving is a leakage', 1], ['Income falls without investment', 1]] }), [
      short({ t: 1, d: 3, c: 'evaluation', marks: 2, stem: '**Or** (ii): Suggest how the new bank can help keep the island\'s income flow steady.', model: 'The bank should **lend the deposits to island firms** for boats, workshops and stock. If this **investment equals the saving**, the money withdrawn returns as spending and **income stays steady**.', sol: 'Lend saving for investment so that S = I.', scheme: [['Lending for investment', 1], ['Saving equals investment keeps income steady', 1]] }),
    ]),
  ],
}));
Q('cb_vindhyadesh', caseQ({
  t: 2, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Study the imagined summary of Vindhyadesh\'s yearly accounts and answer the questions that follow. *(Written by SOYL for practice; the country and figures are imagined.)*',
  passage: `**Vindhyadesh: flows of the year (imagined, ₹ crore)**\n\n| Item | Value |\n|---|---|\n| National income | ${inr(VIN.Y)} |\n| Household saving | ${VIN.S} |\n| Taxes | ${VIN.T} |\n| Imports | ${VIN.M} |\n| Investment by firms | ${VIN.I} |\n| Government spending | ${VIN.G} |\n| Exports | ${VIN.X} |`,
  parts: [
    child('a', num({ t: 2, d: 2, c: 'application', marks: 1, value: VIN_C, unit: '₹ crore', stem: 'Find household consumption (in ₹ crore).', sol: `Consumption = ${VIN.Y} − ${VIN.S} − ${VIN.T} = ${VIN_C}, that is ₹${VIN_C} crore.` })),
    child('b', num({ t: 3, d: 2, c: 'application', marks: 1, value: VIN_LEAK, unit: '₹ crore', stem: 'Find total leakages (in ₹ crore).', sol: `Leakages = ${VIN.S} + ${VIN.T} + ${VIN.M} = ${VIN_LEAK}, that is ₹${VIN_LEAK} crore.` })),
    child('c', short({ t: [2, 3], d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Show whether the flow of income in Vindhyadesh is in balance.', model: `Injections = ${VIN.I} + ${VIN.G} + ${VIN.X} = **₹${VIN_INJ} crore**, equal to leakages of ₹${VIN_LEAK} crore, so the flow is **in balance** and income stays steady.`, sol: 'Compare injections with leakages.', scheme: [['Injections computed', 1], ['Equal to leakages: balance', 1]] }), [
      short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Explain why imports are subtracted when finding total spending on goods produced in Vindhyadesh.', model: `Part of consumption, investment and government spending buys **foreign goods**, which do not create income at home. So imports of ₹${VIN.M} crore are **subtracted**: ${VIN_C} + ${VIN.I} + ${VIN.G} + ${VIN.X} − ${VIN.M} = ₹${inr(VIN_SPEND)} crore of domestic output.`, sol: 'Imports are spending on foreign output.', scheme: [['Imports buy foreign output', 1], ['Domestic spending computed', 1]] }),
    ]),
  ],
}));
Q('cb_sarayu', caseQ({
  t: 3, d: 3, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the imagined newspaper report from Sarayu Pradesh and answer the questions that follow. *(Written by SOYL for practice; the state and figures are imagined.)*',
  passage: `**Sarayu Pradesh: factories cut shifts as spending lags (imagined report)**\n\nThe state's economists estimate that households will save ₹${SAR.S} crore this year, while taxes take ₹${SAR.T} crore and imports ₹${SAR.M} crore. Firms plan to invest only ₹${SAR.I} crore, the state government will spend ₹${SAR.G} crore, and exports are expected to fetch ₹${SAR.X} crore. Several textile mills have already reduced night shifts because warehouses are full.`,
  parts: [
    child('a', num({ t: 3, d: 2, c: 'application', marks: 1, value: SAR_INJ, unit: '₹ crore', stem: 'Find total planned injections (in ₹ crore).', sol: `Injections = ${SAR.I} + ${SAR.G} + ${SAR.X} = ${SAR_INJ}, that is ₹${SAR_INJ} crore.` })),
    child('b', short({ t: 3, d: 2, c: 'analysis', marks: 1, stem: 'Which line of the report shows that spending is falling short of output?', model: 'Mills have **reduced night shifts because warehouses are full**: goods are not being sold.', sol: 'Full warehouses and fewer shifts.', scheme: [['Evidence quoted', 1]] })),
    child('c', short({ t: 3, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Using the figures, explain why the mills are cutting shifts.', model: `Leakages are ${SAR.S} + ${SAR.T} + ${SAR.M} = ₹${SAR_LEAK} crore, more than injections of ₹${SAR_INJ} crore by **₹${SAR_GAP} crore**. Firms receive less spending than they paid out, so goods pile up and they **cut output and shifts**.`, sol: 'Leakages exceed injections.', scheme: [['Leakages exceed injections, with figures', 1], ['Unsold goods lead to cuts', 1]] }), [
      short({ t: 3, d: 3, c: 'evaluation', marks: 2, stem: '**Or** (ii): Suggest one step the state government could take to stop income falling, and state one limitation of it.', model: `It could **raise its own spending** by about ₹${SAR_GAP} crore on public works, adding an injection that offsets the gap. A limitation: the extra spending must be **financed**, and borrowing adds to the state's debt.`, sol: 'An injection to close the gap, with a cost.', scheme: [['Suitable step', 1], ['Limitation', 1]] }),
    ]),
  ],
}));
