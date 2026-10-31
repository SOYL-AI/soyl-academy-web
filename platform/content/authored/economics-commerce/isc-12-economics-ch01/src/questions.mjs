// ISC 12 Economics, ch01 Theory of Demand — question bank. Every buyer, shop, town and schedule is imagined
// by SOYL; no textbook example, exercise, specimen-paper or past-paper item is reused (D-036). Every number in
// a stem, key or worked solution is computed here, so stems, keys and solutions cannot drift apart.
// Style follows the ISC 2027 Economics specimen (sources/cisce.md isc-2027-specimen-856-economics): 1-mark MCQs
// (some reading a table or a described diagram), assertion-reason with option (d) "both false", short answers,
// and, for the bank, 4-mark (2 + 2) and 8-mark (4 + 4) questions in the board's paper style.
import { Q, mcq, ar, tf, fb, match, ord, num, short, long, caseQ, child } from './lib.mjs';

const S2 = [30, 50];
const S3 = [50, 80];
const S4 = [70, 110];
const L5 = [100, 150];
const L8 = [150, 220];

export const r3 = (x) => Math.round(x * 1000) / 1000;
const assert = (cond, msg) => { if (!cond) throw new Error(`questions.mjs: ${msg}`); };

// ---------------------------------------------------------------- shared imagined data
// Riya's weekly demand for mangoes in an imagined Lucknow colony: Q = 7 − P/20 (P in ₹ per kg, Q in kg).
export const MANGO = { a: 7, b: 1 / 20, prices: [120, 100, 80, 60, 40] };
export const mangoQ = (p) => r3(MANGO.a - MANGO.b * p);
export const MANGO_ROWS = MANGO.prices.map((p) => [p, mangoQ(p)]);
assert(MANGO_ROWS.map((r) => r[1]).join() === '1,2,3,4,5', 'mango schedule');

// Two households in an imagined Kochi housing society buying banana chips (packets a week).
// A: Q = 8 − 0.1P (zero at ₹80); B: Q = 6 − 0.05P (zero at ₹120). Market = horizontal sum (kink at ₹80).
export const qA = (p) => Math.max(0, r3(8 - 0.1 * p));
export const qB = (p) => Math.max(0, r3(6 - 0.05 * p));
export const qMkt = (p) => r3(qA(p) + qB(p));
export const CHIPS_PRICES = [20, 40, 60, 80, 100];
export const CHIPS_ROWS = CHIPS_PRICES.map((p) => [p, qA(p), qB(p), qMkt(p)]);
assert(qMkt(40) === 8 && qMkt(60) === 5 && qMkt(80) === 2 && qMkt(100) === 1, 'chips market');

// Three students' daily demand for samosas at an imagined Nagpur college canteen (individual schedules).
export const SAMOSA = { prices: [10, 15, 20, 25], a: [5, 4, 3, 2], b: [4, 3, 2, 1], c: [6, 4, 3, 1] };
export const samosaMkt = SAMOSA.prices.map((_, i) => SAMOSA.a[i] + SAMOSA.b[i] + SAMOSA.c[i]);
assert(samosaMkt.join() === '15,11,8,4', 'samosa market');

// A demand function for an imagined brand of school bags in Indore: Q = 500 − 20P + 0.5Y (P in ₹ hundred, Y in ₹ hundred a month).
export const bagQ = (p, y) => r3(500 - 20 * p + 0.5 * y);
assert(bagQ(10, 600) === 600 && bagQ(12, 600) === 560 && bagQ(10, 700) === 650, 'bag function');

const md = (rows, head) => `| ${head.join(' | ')} |\n|${head.map(() => '---').join('|')}|\n${rows.map((r) => `| ${r.join(' | ')} |`).join('\n')}`;

// ================================================================ t01 Meaning and types of demand
Q('m_laptop_wish', mcq({
  t: 1, d: 1, c: 'application',
  stem: 'Kabir, a Class 12 student in an imagined hill town, would love a ₹90,000 gaming laptop but has no savings and no one will pay for it. In economics, his wish for the laptop is',
  opts: [
    'a desire only, because it is not backed by the ability to pay',
    'effective demand, because he is willing to buy',
    'market demand, because many students share it',
    'derived demand, because he needs the laptop for study',
  ],
  sol: 'Demand needs desire, ability to pay and willingness to spend, at a given price and time. Kabir lacks the means, so it is only a desire. Market demand is a total over buyers, and derived demand arises from the demand for another product.',
}));
Q('m_bread_butter', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Hostel residents in an imagined Pune college buy bread and butter together for breakfast; neither is bought alone. The demand for these two goods is an example of',
  opts: ['joint demand', 'composite demand', 'derived demand', 'competitive demand'],
  sol: 'Goods demanded together to satisfy one want have joint demand. Composite demand is one good wanted for several uses; derived demand comes from the demand for another product; competitive demand describes substitutes.',
}));
Q('m_milk_uses', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'A dairy in an imagined Anand-like town sells milk that households use for tea, curd, paneer and sweets. The demand for milk in this situation is',
  opts: ['composite demand', 'joint demand', 'derived demand', 'individual demand'],
  sol: 'When one good is demanded for several different uses, its demand is composite. Joint demand is two goods used together; derived demand flows from demand for another good.',
}));
Q('m_masons', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'A new township is being built near an imagined Raipur suburb, and builders are hiring many more masons and plumbers. The demand for these workers is called',
  opts: ['derived demand', 'composite demand', 'joint demand', 'autonomous demand'],
  sol: 'Labour is wanted because houses are wanted: its demand is derived from the demand for the final product. The other terms describe different relationships between goods.',
}));
Q('m_market_meaning', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'The market demand for a commodity at a given price refers to',
  opts: [
    'the sum of the quantities that all buyers in the market will buy at that price',
    'the quantity that the richest buyer will buy at that price',
    'the average quantity bought by one household over a year',
    'the quantity that sellers wish to sell at that price',
  ],
  sol: 'Market demand adds up individual quantities demanded at each price. One buyer\'s quantity is individual demand, and what sellers wish to sell is supply.',
}));
Q('fb_cement', fb({
  t: 1, d: 1, c: 'understanding',
  stem: 'Builders want cement only because households want new flats. The demand for cement is therefore called ___ demand.',
  acc: [['derived']],
  sol: 'Cement is wanted for the final product it helps to make, so its demand is derived demand.',
}));
Q('mt_kinds', match({
  t: 1, d: 2, c: 'understanding',
  stem: 'Match each imagined situation from a town in Odisha with the kind of demand it shows.',
  pairs: [
    ['Ink cartridges and printers bought together by an office', 'Joint demand'],
    ['Electricity used for lighting, cooking and pumping water', 'Composite demand'],
    ['A bakery hiring more bakers as cake orders rise', 'Derived demand'],
    ['The total quantity of rice bought by all families in the town at a price', 'Market demand'],
  ],
  sol: 'Goods used together have joint demand; one good with many uses has composite demand; a factor wanted for what it helps produce has derived demand; the total over all buyers at a price is market demand.',
}));
Q('s_desire_demand', short({
  t: 1, d: 1, c: 'understanding', marks: 2, wl: S2,
  stem: 'How does demand in economics differ from a mere desire? Illustrate with a student who wants a scooter.',
  model: 'A **desire** is only a wish. **Demand** is a desire backed by the **ability to pay** and the **willingness to spend**, stated at a **given price** for a **period of time**. A student who wants a scooter but cannot pay for it has only a desire.',
  sol: 'Three elements of demand plus the price and time qualification, with the scooter example.',
  scheme: [['Elements of demand: desire, ability, willingness', 1], ['Price and time reference with the example', 1]],
}));
Q('s_joint_composite', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Distinguish joint demand from composite demand, giving one Indian example of each.',
  model: '**Joint demand:** two or more goods are wanted **together** for one purpose, such as a gas stove and an LPG cylinder.\n**Composite demand:** **one good** is wanted for **several uses**, such as sugarcane used for sugar, jaggery and ethanol.',
  sol: 'Contrast "several goods, one use" with "one good, several uses", each with an example.',
  scheme: [['Joint demand with example', 1], ['Composite demand with example', 1]],
}));
Q('s3_classify_three', short({
  t: 1, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'Identify the kind of demand in each imagined case from a Mysuru market and give a reason: (i) a silk-weaving unit employs more weavers as saree orders grow; (ii) a family buys a mobile phone and a SIM card together; (iii) coal is bought by a power plant, a brick kiln and a hotel kitchen.',
  model: '(i) **Derived demand:** the unit hires weavers only because buyers want sarees; the demand for labour comes from the demand for the final product.\n(ii) **Joint demand:** the phone is useless without a SIM card and the card without a phone, so the two are demanded together to meet one want.\n(iii) **Composite demand:** a single good, coal, is wanted by three different users for three different purposes.',
  sol: 'One mark for each correct kind with its reason.',
  scheme: [['(i) derived, with reason', 1], ['(ii) joint, with reason', 1], ['(iii) composite, with reason', 1]],
}));

// ================================================================ t02 Determinants and the demand function
Q('m_tea_coffee', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'In an imagined Chennai neighbourhood the price of filter coffee powder rises sharply while the price of tea leaves stays the same. Other things equal, the demand curve for tea leaves will',
  opts: ['shift to the right, because tea and coffee are substitutes', 'shift to the left, because tea and coffee are complements', 'not move, because the price of tea is unchanged', 'show a contraction along the same curve'],
  sol: 'Coffee and tea are substitutes, so a dearer coffee makes buyers switch to tea: more tea is demanded at every price and the curve shifts right. A contraction would need a rise in the price of tea itself.',
}));
Q('m_petrol_bikes', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'If the price of petrol in an imagined district rises steeply, the demand for petrol motorcycles there is most likely to',
  opts: ['decrease, because petrol and motorcycles are complements', 'increase, because petrol and motorcycles are substitutes', 'extend, because motorcycles become cheaper', 'remain unchanged, because the price of motorcycles has not changed'],
  sol: 'Motorcycles and petrol are used together (complements). Dearer petrol raises the cost of riding, so fewer motorcycles are demanded at each price: a decrease, a leftward shift.',
}));
Q('m_inferior_rice', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'When the incomes of families in an imagined Bihar village rise, they buy less coarse broken rice and more fine rice. For these families, coarse broken rice is',
  opts: ['an inferior good', 'a normal good', 'a Veblen good', 'a complementary good'],
  sol: 'A good whose demand falls as income rises has a negative income effect: it is an inferior good. Fine rice, whose demand rises, is a normal good.',
}));
Q('m_func_symbol', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'In the demand function Dx = f(Px, Py, Y, T, E), the letter T stands for',
  opts: ['the tastes and preferences of the consumer', 'the tax rate on the good', 'the time period of supply', 'the technology used by producers'],
  sol: 'T is tastes and preferences. Px is the own price, Py prices of related goods, Y income and E expectations; tax and technology are determinants of supply, not demand.',
}));
Q('m_expect_now', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'Shoppers in an imagined Surat market hear that the price of cooking oil will rise sharply next week. The most likely effect this week is',
  opts: ['an increase in the demand for cooking oil at the present price', 'a contraction in the quantity of cooking oil demanded', 'a decrease in the demand for cooking oil', 'no change, because the present price has not changed'],
  sol: 'Expected future price is a determinant of demand. Buyers stock up now, so demand at today\'s price rises (a rightward shift). Contraction and decrease would need a price rise now or a fall in demand.',
}));
Q('ar_income_normal', ar({
  t: 2, d: 2, c: 'analysis', key: 'a',
  a: 'A rise in household income shifts the demand curve for a normal good to the right.',
  r: 'A normal good has a positive income effect: more is bought at each price when income rises.',
  sol: 'Both are true, and the positive income effect is exactly why more is demanded at every price, so R explains A.',
}));
Q('tf_complement_fall', tf({
  t: 2, d: 3, c: 'application', ans: false,
  stem: 'True or false? If printers become much cheaper, the demand for printer ink cartridges falls, because the two goods are complements.',
  sol: 'For complements a fall in the price of one good raises the demand for the other: cheaper printers mean more printers in use and more cartridges demanded, so the statement is false.',
}));
Q('num_bag_func', num({
  t: 2, d: 2, c: 'understanding', marks: 1, value: 600, unit: 'bags',
  stem: 'The monthly demand for an imagined brand of school bags in Indore is Q = 500 − 20P + 0.5Y, where P is price and Y is average family income (both in ₹ hundred). Find Q when P = 10 and Y = 600.',
  sol: `Step 1: Q = 500 − 20 × 10 + 0.5 × 600.\nStep 2: Q = 500 − 200 + 300 = ${bagQ(10, 600)} bags.`,
}));
Q('s_subs_comp', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Explain how a rise in the price of a related good affects the demand for a good when the two are substitutes and when they are complements.',
  model: '**Substitutes** (such as tea and coffee): when coffee becomes dearer, buyers switch to tea, so the **demand for tea increases**.\n**Complements** (such as cars and petrol): when petrol becomes dearer, **fewer cars are demanded**, so demand decreases.',
  sol: 'Direction of change for each relationship, with an example.',
  scheme: [['Substitutes: demand rises, with example', 1], ['Complements: demand falls, with example', 1]],
}));
Q('s_inferior_normal', short({
  t: 2, d: 2, c: 'analysis', marks: 2, wl: S2,
  stem: 'A family in an imagined Jaipur colony gets a pay rise and buys fewer bus tickets but more autorickshaw rides. Classify both services and justify your answer.',
  model: '**Bus tickets** are an **inferior good** for this family: demand falls as income rises (negative income effect).\n**Autorickshaw rides** are a **normal good**: demand rises with income (positive income effect).',
  sol: 'Classification from the direction of the income effect for each service.',
  scheme: [['Bus tickets inferior, with reason', 1], ['Autorickshaw rides normal, with reason', 1]],
}));
Q('s3_three_determinants', short({
  t: 2, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Other than the price of the good itself, explain any three factors that decide how much of a good a household demands.',
  model: '1. **Income:** for a normal good a higher income raises demand; for an inferior good it lowers demand.\n2. **Prices of related goods:** a dearer substitute raises demand; a dearer complement lowers it.\n3. **Tastes and preferences:** a good that becomes fashionable, or is advertised well, is demanded more at each price. (Also: expectations of future prices, population.)',
  sol: 'Any three non-price determinants, each with the direction of its effect.',
  scheme: [['First determinant with effect', 1], ['Second determinant with effect', 1], ['Third determinant with effect', 1]],
}));
Q('s3_bag_change', short({
  t: 2, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'For the imagined school-bag demand Q = 500 − 20P + 0.5Y (P and Y in ₹ hundred), with P = 10 and Y = 600 at first, find the quantity demanded after (i) the price rises to 12 with income unchanged, and (ii) income rises to 700 with the price at 10. State whether each is a movement along or a shift of the demand curve.',
  model: `(i) Q = 500 − 20 × 12 + 0.5 × 600 = **${bagQ(12, 600)}** bags: own price changed, so a **movement along** the curve (contraction from 600).\n(ii) Q = 500 − 20 × 10 + 0.5 × 700 = **${bagQ(10, 700)}** bags: income changed, so the curve **shifts** to the right (an increase in demand).`,
  sol: 'Substitute each change into the function and classify by whether the own price or another determinant changed.',
  scheme: [['(i) quantity 560', 1], ['(ii) quantity 650', 1], ['Correct movement/shift classification for both', 1]],
}));
Q('s3_expectation', short({
  t: 2, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Before an announced rise in gold prices, jewellery shops in an imagined Thrissur market are crowded even though prices have already gone up a little. Explain how expectations can make buyers demand more at a higher price, and say whether this breaks the law of demand.',
  model: 'Buyers **expect the price to rise further**, so buying now looks cheaper than buying later. Demand at every present price **increases**, so they buy more even though the price is higher. The law of demand assumes **expectations stay constant**; since that assumption is broken, this is an **exception**, not a contradiction of the law.',
  sol: 'Expectation effect, the resulting shift, and the link to the ceteris paribus assumption.',
  scheme: [['Expectation of further rise explained', 1], ['More bought at a higher price', 1], ['Exception because the assumption is broken', 1]],
}));
Q('l_demand_function', long({
  t: 2, d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: 'Write the demand function for a good X and explain how each of its determinants affects the demand for X. (a) Write the function and name its terms. [2] (b) Explain the effect of any three determinants other than the own price. [3]',
  model: '(a) **Dx = f(Px, Py, Y, T, E)**: Dx is the demand for X; **Px** its own price; **Py** prices of related goods; **Y** the consumer\'s income; **T** tastes and preferences; **E** expectations of future prices.\n(b) 1. **Py:** a dearer **substitute** raises Dx; a dearer **complement** lowers Dx.\n2. **Y:** for a **normal** good a higher income raises Dx; for an **inferior** good it lowers Dx.\n3. **T:** a shift of taste towards X (fashion, health awareness, advertising) raises Dx at every price.\nA change in Px moves the buyer **along** the curve; a change in any other determinant **shifts** it.',
  sol: 'Function with named terms, then three determinants with directions.',
  scheme: [['Function written correctly', 1], ['Terms named', 1], ['Related prices explained', 1], ['Income explained (normal and inferior)', 1], ['Tastes or expectations explained', 1]],
}));

// ================================================================ t03 Law of Demand
Q('m_law_inverse', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'Other things remaining the same, the Law of Demand states that the quantity demanded of a good',
  opts: ['falls when its price rises and rises when its price falls', 'rises when its price rises', 'stays the same whatever its price', 'depends only on the income of the consumer'],
  sol: 'The law states an inverse relation between own price and quantity demanded, with all other determinants held constant.',
}));
Q('m_not_assumption', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Which of the following is NOT an assumption of the Law of Demand?',
  opts: ['The consumer\'s income rises as the price falls', 'Tastes and preferences remain unchanged', 'Prices of related goods remain constant', 'No change is expected in the future price'],
  sol: 'The law holds income constant. If income changed along with price, the demand curve itself would shift and the law could not be isolated.',
}));
Q('m_subst_effect', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'When guavas become cheaper while apples cost the same, a family in an imagined Allahabad colony buys more guavas and fewer apples. This reason for the downward slope of the demand curve for guavas is the',
  opts: ['substitution effect', 'income effect', 'Veblen effect', 'bandwagon effect'],
  sol: 'Guavas are now relatively cheaper than apples, so the family substitutes guavas for apples. The income effect works through a rise in real income instead.',
}));
Q('m_schedule_read', mcq({
  t: 3, d: 1, c: 'understanding',
  stem: `Riya\'s weekly demand for mangoes in an imagined Lucknow colony is given below. How many kilograms does she buy when the price is ₹80 per kg?\n\n${md(MANGO_ROWS, ['Price (₹ per kg)', 'Quantity (kg)'])}`,
  opts: [`${mangoQ(80)} kg`, `${mangoQ(100)} kg`, `${mangoQ(60)} kg`, `${mangoQ(40)} kg`],
  sol: `Read the row for ₹80: ${mangoQ(80)} kg. The other options belong to other prices in the schedule.`,
}));
Q('num_mango_change', num({
  t: 3, d: 2, c: 'application', marks: 1, value: mangoQ(60) - mangoQ(100), unit: 'kg',
  stem: 'Using Riya\'s mango schedule (Q = 7 − P/20, imagined), by how many kilograms does her weekly purchase rise when the price falls from ₹100 to ₹60 per kg?',
  sol: `Step 1: At ₹100, Q = 7 − 5 = ${mangoQ(100)} kg; at ₹60, Q = 7 − 3 = ${mangoQ(60)} kg.\nStep 2: Rise = ${mangoQ(60)} − ${mangoQ(100)} = ${mangoQ(60) - mangoQ(100)} kg.`,
}));
Q('ar_dmu_link', ar({
  t: 3, d: 2, c: 'analysis', key: 'a',
  a: 'A consumer buys more units of a good only when its price falls.',
  r: 'Each additional unit gives less marginal utility, so the consumer pays less for it.',
  sol: 'Both are true. Because marginal utility diminishes, the consumer will buy an extra unit only at a lower price, which explains A.',
}));
Q('ar_new_buyers', ar({
  t: 3, d: 3, c: 'analysis', key: 'b',
  a: 'When the price of air-coolers falls, some families who could not afford one earlier start buying it.',
  r: 'Market demand is obtained by adding the quantities demanded by all buyers at each price.',
  sol: 'Both statements are true, but R only defines market demand. It does not explain why new buyers enter at a lower price (that is the fall in price relative to their means), so R is not the explanation of A.',
}));
Q('ar_ceteris_income', ar({
  t: 3, d: 3, c: 'analysis', key: 'c',
  a: 'The Law of Demand assumes that the tastes of the consumer do not change.',
  r: 'The Law of Demand holds even when the consumer\'s income changes at the same time as the price.',
  sol: 'A is true. R is false: the law needs income to be constant; if income changes with price, the curve shifts and the inverse relation cannot be isolated.',
}));
Q('ar_both_false', ar({
  t: 3, d: 2, c: 'analysis', key: 'd',
  a: 'The Law of Demand shows a direct relationship between the price of a good and the quantity demanded.',
  r: 'For normal goods the demand curve slopes upward from left to right.',
  sol: 'Both are false. The law describes an inverse relationship, and for normal goods the demand curve slopes downward.',
}));
Q('fb_ceteris', fb({
  t: 3, d: 1, c: 'recall',
  stem: 'The Law of Demand holds under the condition of ___, that is, other things remaining the same.',
  acc: [['ceteris paribus', 'other things being equal', 'other things remaining the same']],
  sol: 'The phrase is ceteris paribus: all determinants other than the own price stay constant.',
}));
Q('ord_draw_curve', ord({
  t: 3, d: 1, c: 'understanding', marks: 1,
  stem: 'Arrange the steps for drawing Riya\'s demand curve for mangoes from her schedule in the correct order.',
  items: [
    'Draw the axes: quantity on the horizontal axis and price on the vertical axis',
    'Choose a scale for each axis to fit the schedule',
    'Plot one point for each price–quantity pair in the schedule',
    'Join the points to get a curve sloping down from left to right',
  ],
  sol: 'Axes first, then scales, then the plotted pairs, and finally the joined curve.',
}));
Q('s_two_reasons', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Give any two reasons why the demand curve for an ordinary good slopes downward.',
  model: '1. **Substitution effect:** a cheaper good replaces now-dearer substitutes, so more of it is bought.\n2. **Income effect:** a lower price raises the buyer\'s real income, so more of a normal good is bought. (Also: diminishing marginal utility; new buyers enter; more uses become worthwhile.)',
  sol: 'Any two valid reasons, each explained.',
  scheme: [['First reason explained', 1], ['Second reason explained', 1]],
}));
Q('s3_schedule_diagram', short({
  t: 3, d: 2, c: 'application', marks: 3, wl: S3,
  stem: `From Riya\'s imagined weekly mango schedule below, describe the demand curve you would draw, state the law it illustrates, and name one assumption behind it.\n\n${md(MANGO_ROWS, ['Price (₹ per kg)', 'Quantity (kg)'])}`,
  model: `Plot quantity (kg) on the x-axis and price on the y-axis; the points (1, 120), (2, 100), (3, 80), (4, 60) and (5, 40) lie on a **straight line sloping downward**. It shows the **Law of Demand**: as the price falls, Riya buys more. One assumption: her **income stays the same** over the week.`,
  sol: 'Correct plotting description, the law, and one ceteris paribus assumption.',
  scheme: [['Curve described from the schedule', 1], ['Law of demand stated', 1], ['One assumption', 1]],
}));
Q('s3_income_subst', short({
  t: 3, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'The price of a popular brand of instant noodles falls by a third in an imagined Shillong market. Using the income effect and the substitution effect, explain why students there buy more packets.',
  model: '**Substitution effect:** the noodles become cheaper **relative to** snacks like biscuits and momos, so students switch towards noodles.\n**Income effect:** with the same pocket money they can now buy more packets, as their **real income** has risen.\nBoth effects point the same way for a normal good, so the **quantity demanded rises** and the demand curve slopes downward.',
  sol: 'Explain each effect in the context and combine them.',
  scheme: [['Substitution effect in context', 1], ['Income effect in context', 1], ['Combined result: quantity demanded rises', 1]],
}));
Q('l_law_full', long({
  t: 3, d: 3, c: 'application', marks: 5, wl: L5,
  stem: 'Explain the Law of Demand for a good sold in an imagined Kanpur market. (a) State the law and any two of its assumptions. [2] (b) Construct an imagined demand schedule of four rows and describe the demand curve drawn from it. [3]',
  model: '(a) **Law:** other things remaining the same, the quantity demanded of a good **rises when its price falls** and **falls when its price rises**. Assumptions: the consumer\'s **income** and **tastes** do not change (also: prices of related goods and expectations are constant).\n(b) Imagined weekly demand for guavas by one family:\n\n| Price (₹ per kg) | Quantity (kg) |\n|---|---|\n| 80 | 1 |\n| 60 | 2 |\n| 40 | 3 |\n| 20 | 4 |\n\nWith price on the y-axis and quantity on the x-axis, the points form a curve **sloping downward from left to right**: each fall in price is matched by a rise in the quantity bought.',
  sol: 'Statement and assumptions, then a consistent inverse schedule and its curve.',
  scheme: [['Law stated with ceteris paribus', 1], ['Two assumptions', 1], ['Schedule shows an inverse relation', 1], ['Axes correctly assigned', 1], ['Curve slopes downward, explained', 1]],
}));
Q('l_why_slope', long({
  t: 3, d: 4, c: 'analysis', marks: 5, wl: L5,
  stem: 'Why does the demand curve of an ordinary good slope downward from left to right? Explain any five reasons with examples from an Indian household.',
  model: '1. **Diminishing marginal utility:** each extra kilogram of sugar gives less satisfaction, so a family buys more only at a lower price.\n2. **Substitution effect:** when tea becomes cheaper relative to coffee, the family substitutes tea for coffee.\n3. **Income effect:** a fall in the price of pulses frees part of the budget, so **real income** rises and more pulses are bought.\n4. **New buyers:** a lower price brings families who could not afford the good earlier into the market.\n5. **Several uses:** a cheaper good such as milk is put to more uses (sweets, curd) besides tea.\nTogether these make quantity demanded rise as price falls.',
  sol: 'Five distinct reasons, each linked to a household example.',
  scheme: [['Diminishing marginal utility', 1], ['Substitution effect', 1], ['Income effect', 1], ['New buyers', 1], ['Several uses', 1]],
}));

// ================================================================ t04 Market demand by horizontal summation
Q('m_horizontal_sum', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'The market demand curve is obtained from individual demand curves by',
  opts: ['adding the quantities demanded by all buyers at each price (horizontal summation)', 'adding the prices that each buyer would pay for a given quantity (vertical summation)', 'taking the average of the individual curves', 'choosing the demand curve of the largest buyer'],
  sol: 'At each price we add the quantities: a horizontal summation. Adding prices would be a vertical summation, which is not how market demand is formed.',
}));
Q('m_chips_market', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: `Two households in an imagined Kochi housing society buy banana chips each week as shown. What is the market quantity demanded at ₹60 a packet?\n\n${md(CHIPS_ROWS.map((r) => [r[0], r[1], r[2]]), ['Price (₹ per packet)', 'Household A', 'Household B'])}`,
  opts: [`${qMkt(60)} packets`, `${qMkt(40)} packets`, `${qA(60)} packets`, `${qB(60)} packets`],
  sol: `At ₹60, A buys ${qA(60)} and B buys ${qB(60)}, so the market buys ${qA(60)} + ${qB(60)} = ${qMkt(60)} packets.`,
}));
Q('num_samosa_market', num({
  t: 4, d: 2, c: 'understanding', marks: 1, value: samosaMkt[1], unit: 'samosas',
  stem: `Three students at an imagined Nagpur college canteen demand samosas each day as shown. Find the market quantity demanded at ₹15.\n\n${md(SAMOSA.prices.map((p, i) => [p, SAMOSA.a[i], SAMOSA.b[i], SAMOSA.c[i]]), ['Price (₹)', 'Asha', 'Bilal', 'Charu'])}`,
  sol: `Step 1: At ₹15 the quantities are ${SAMOSA.a[1]}, ${SAMOSA.b[1]} and ${SAMOSA.c[1]}.\nStep 2: Market demand = ${SAMOSA.a[1]} + ${SAMOSA.b[1]} + ${SAMOSA.c[1]} = ${samosaMkt[1]} samosas.`,
}));
Q('num_chips_func', num({
  t: 4, d: 3, c: 'application', marks: 1, value: qMkt(40), unit: 'packets',
  stem: 'For the imagined Kochi households, A\'s weekly demand for banana chips is Q = 8 − 0.1P and B\'s is Q = 6 − 0.05P (P in ₹ per packet; neither buys a negative amount). Find the market quantity demanded at ₹40.',
  sol: `Step 1: A: 8 − 0.1 × 40 = ${qA(40)}; B: 6 − 0.05 × 40 = ${qB(40)}.\nStep 2: Market = ${qA(40)} + ${qB(40)} = ${qMkt(40)} packets.`,
}));
Q('tf_vertical_add', tf({
  t: 4, d: 1, c: 'understanding', ans: false,
  stem: 'True or false? The market demand curve is found by adding the prices that different buyers are willing to pay for the same quantity.',
  sol: 'Market demand adds quantities at each price (horizontal summation); adding prices for a given quantity is a vertical summation and does not give market demand.',
}));
Q('s_market_steps', short({
  t: 4, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Explain in two steps how a market demand schedule is built from the schedules of individual buyers.',
  model: '1. Take **each price** in turn and note the quantity that **every buyer** wants at that price.\n2. **Add these quantities** to get the market quantity at that price; listing these totals against the prices gives the market demand schedule.',
  sol: 'Price-by-price reading, then horizontal addition.',
  scheme: [['Quantities of all buyers read at each price', 1], ['Quantities added to form the market schedule', 1]],
}));
Q('s3_samosa_schedule', short({
  t: 4, d: 2, c: 'application', marks: 3, wl: S3,
  stem: `Using the imagined samosa schedules of Asha, Bilal and Charu below, construct the market demand schedule and state what the market curve will look like.\n\n${md(SAMOSA.prices.map((p, i) => [p, SAMOSA.a[i], SAMOSA.b[i], SAMOSA.c[i]]), ['Price (₹)', 'Asha', 'Bilal', 'Charu'])}`,
  model: `Add the three quantities at each price:\n\n${md(SAMOSA.prices.map((p, i) => [p, samosaMkt[i]]), ['Price (₹)', 'Market quantity'])}\n\nThe market curve lies **to the right** of every individual curve and **slopes downward**, because each student buys more as the price falls.`,
  sol: 'Correct totals at all four prices, then the shape and position of the market curve.',
  scheme: [['Totals at ₹10 and ₹15', 1], ['Totals at ₹20 and ₹25', 1], ['Shape and position of the market curve', 1]],
}));
Q('l_market_curve', long({
  t: 4, d: 4, c: 'application', marks: 5, wl: L5,
  stem: 'Two imagined Kochi households buy banana chips: A demands Q = 8 − 0.1P and B demands Q = 6 − 0.05P (P in ₹ per packet; quantities cannot be negative). (a) Prepare the market demand schedule at ₹40, ₹60, ₹80 and ₹100. [3] (b) Describe how the market demand curve is derived and why it has a kink. [2]',
  model: `(a)\n\n${md([40, 60, 80, 100].map((p) => [p, qA(p), qB(p), qMkt(p)]), ['Price (₹)', 'A', 'B', 'Market'])}\n\n(b) The market curve is the **horizontal sum** of A\'s and B\'s curves: at each price their quantities are added. Above ₹80 only B buys (A\'s quantity is zero), so the market curve **coincides with B\'s curve**; below ₹80 both buy, so the market curve becomes **flatter**. This change at ₹80 gives the curve a **kink**.`,
  sol: 'Correct schedule, then horizontal summation and the reason for the kink at ₹80.',
  scheme: [['Quantities of A at all prices', 1], ['Quantities of B at all prices', 1], ['Market totals', 1], ['Horizontal summation explained', 1], ['Kink at ₹80 explained', 1]],
}));

// ================================================================ t05 Movement along versus shift
Q('m_extension', mcq({
  t: 5, d: 1, c: 'understanding',
  stem: 'A fall in the price of onions, with nothing else changing, leads buyers in an imagined Nashik market to buy more onions. This is called',
  opts: ['an extension of demand (a downward movement along the curve)', 'an increase in demand (a rightward shift)', 'a contraction of demand', 'a decrease in demand'],
  sol: 'Only the own price changed, so buyers move down along the same curve: an extension. A shift would need a change in another determinant.',
}));
Q('m_increase_income', mcq({
  t: 5, d: 2, c: 'understanding',
  stem: 'Teachers in an imagined Dehradun school receive a large salary arrear. For a normal good such as branded shoes, the effect is shown by',
  opts: ['a rightward shift of the demand curve', 'a movement up along the demand curve', 'a leftward shift of the demand curve', 'a movement down along the demand curve'],
  sol: 'Higher income raises the demand for a normal good at every price: an increase in demand, shown by a rightward shift.',
}));
Q('m_decrease_complement', mcq({
  t: 5, d: 3, c: 'application',
  stem: 'The price of cricket balls rises sharply in an imagined Meerut sports market. What happens to the demand curve for cricket bats?',
  opts: ['It shifts to the left (a decrease in demand)', 'It shifts to the right (an increase in demand)', 'There is a contraction along the curve', 'There is an extension along the curve'],
  sol: 'Bats and balls are complements; dearer balls mean fewer bats are demanded at every bat price, so the bat demand curve shifts left. A contraction would need a rise in the price of bats.',
}));
Q('m_point_move', mcq({
  t: 5, d: 2, c: 'application',
  stem: 'On a demand curve DD for kites in an imagined Ahmedabad market, point B shows 40 kites at ₹15 and point A shows 25 kites at ₹20. Moving from B to A shows',
  opts: ['a contraction of demand caused by a rise in price', 'an increase in demand caused by a rise in income', 'an extension of demand caused by a fall in price', 'a decrease in demand caused by a change in tastes'],
  sol: 'Both points are on the same curve and the price rose from ₹15 to ₹20 while quantity fell: a contraction (upward movement along the curve).',
}));
Q('m_shift_cause', mcq({
  t: 5, d: 3, c: 'analysis',
  stem: 'A demand curve for green tea in an imagined Guwahati market shifts from D₁ to D₂, so that at an unchanged price of ₹200 a packet buyers now want 30 packets instead of 20. Which event could have caused this?',
  opts: ['A health campaign that makes green tea fashionable', 'A fall in the price of green tea', 'A fall in the price of a close substitute, ordinary tea', 'A rise in the price of green tea'],
  sol: 'More is demanded at the same price, so the curve shifted right. A favourable change in tastes does this. Changes in the own price only move buyers along a curve, and a cheaper substitute would shift it left.',
}));
Q('ar_shift_own', ar({
  t: 5, d: 2, c: 'analysis', key: 'c',
  a: 'An increase in demand is shown by a rightward shift of the demand curve.',
  r: 'A rise in the price of the good itself raises the quantity demanded of it.',
  sol: 'A is true. R is false: a rise in the own price lowers the quantity demanded (a contraction), and in any case an own-price change never shifts the curve.',
}));
Q('fb_shift_word', fb({
  t: 5, d: 1, c: 'recall',
  stem: 'A change in demand caused by a factor other than the good\'s own price is shown by a ___ of the demand curve.',
  acc: [['shift']],
  sol: 'Non-price factors move the whole curve: a shift (right for an increase, left for a decrease).',
}));
Q('mt_four_changes', match({
  t: 5, d: 2, c: 'application',
  stem: 'Match each imagined event in a Bengaluru market for fresh juice with the change it causes.',
  pairs: [
    ['The juice shop cuts its own price', 'Extension of demand'],
    ['The juice shop raises its own price', 'Contraction of demand'],
    ['A heatwave makes cold drinks more desirable', 'Increase in demand'],
    ['A cheaper soft drink is launched next door', 'Decrease in demand'],
  ],
  sol: 'Own-price changes cause extension or contraction along the curve; a favourable change in tastes increases demand; a cheaper substitute decreases it.',
}));
Q('s_change_qd_vs_d', short({
  t: 5, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Distinguish between a change in quantity demanded and a change in demand.',
  model: '**Change in quantity demanded:** caused only by a change in the good\'s **own price**; shown by a **movement along** the same curve (extension or contraction).\n**Change in demand:** caused by **other determinants** such as income or tastes; shown by a **shift** of the curve (increase or decrease).',
  sol: 'Cause and graphical representation of each.',
  scheme: [['Change in quantity demanded: cause and movement', 1], ['Change in demand: cause and shift', 1]],
}));
Q('s_extension_increase', short({
  t: 5, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: 'A juice seller in an imagined Madurai street sells more glasses one week. Explain how you would decide whether this reflects an extension of demand or an increase in demand.',
  model: 'Check **what changed**. If the seller **cut the price** and nothing else changed, buyers moved down the same curve: an **extension**. If the price stayed the same but, say, the weather turned hotter or incomes rose, the whole curve shifted right: an **increase**.',
  sol: 'The test is whether the own price or another determinant changed.',
  scheme: [['Extension: own-price fall, movement along', 1], ['Increase: other factor, rightward shift', 1]],
}));
Q('s3_predict_three', short({
  t: 5, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'Predict the effect on the demand curve for petrol scooters in an imagined Ranchi market in each case: (i) the price of scooters falls; (ii) petrol becomes much dearer; (iii) a bank offers cheap scooter loans that raise buyers\' purchasing power.',
  model: '(i) **Extension:** a movement down along the same curve, since only the own price fell.\n(ii) **Decrease:** a **leftward shift**, because petrol is a complement and riding becomes costlier.\n(iii) **Increase:** a **rightward shift**, since buyers can afford more scooters at every price.',
  sol: 'One mark per case: correct change with its reason.',
  scheme: [['(i) extension', 1], ['(ii) decrease, complement', 1], ['(iii) increase, purchasing power', 1]],
}));
Q('s3_contraction_decrease', short({
  t: 5, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Distinguish a contraction of demand from a decrease in demand, with one imagined example of each from a Kolkata sweet shop and a description of the diagram for each.',
  model: '**Contraction:** the shop **raises the price** of rasgullas and buyers move **up along the same curve** to a smaller quantity (point to point on one curve).\n**Decrease:** at the **same price**, buyers want fewer rasgullas because, say, a health scare changes tastes; the **whole curve shifts left** (D₁ to D₂).\nSo the first is caused by the own price, the second by another determinant.',
  sol: 'Cause, example and diagram for each, with a clear contrast.',
  scheme: [['Contraction with example and movement', 1], ['Decrease with example and shift', 1], ['Clear contrast of causes', 1]],
}));
Q('l_movement_shift', long({
  t: 5, d: 4, c: 'analysis', marks: 5, wl: L5,
  stem: 'Using imagined data for tickets at a cinema hall in an imagined Kozhikode town, explain with diagrams (a) the difference between extension and contraction of demand [2], and (b) the difference between increase and decrease in demand, naming one cause of each [3].',
  model: '(a) On one demand curve DD: when the ticket price **falls from ₹200 to ₹150**, sales rise from 300 to 400 a show: an **extension** (movement **down** the curve). When the price **rises back**, sales fall: a **contraction** (movement **up** the curve). Only the own price changes.\n(b) At an unchanged price of ₹200, the curve shifts **right** from D₁ to D₂ (say 300 to 380 tickets) when a much-awaited film is released: an **increase in demand** due to tastes. It shifts **left** from D₁ to D₀ when a new multiplex opens nearby (a **substitute**): a **decrease in demand**.\nMovements come from own-price changes; shifts from other determinants.',
  sol: 'Movements on one curve, then shifts with causes, linked to diagrams.',
  scheme: [['Extension explained with the movement', 1], ['Contraction explained with the movement', 1], ['Increase with diagram and cause', 1], ['Decrease with diagram and cause', 1], ['Overall contrast of movement and shift', 1]],
}));

// ================================================================ t06 Exceptions to the Law of Demand
Q('m_giffen_meaning', mcq({
  t: 6, d: 3, c: 'understanding',
  stem: 'A Giffen good is best described as an inferior good',
  opts: ['for which the negative income effect of a price change outweighs the substitution effect', 'that is bought only to show off wealth', 'whose price is fixed by the government', 'for which the substitution effect outweighs the income effect'],
  sol: 'For a Giffen good the strong negative income effect dominates, so a price rise increases quantity demanded. Showing off wealth describes Veblen goods.',
}));
Q('m_veblen_watch', mcq({
  t: 6, d: 2, c: 'application',
  stem: 'An imagined luxury watch brand in Mumbai doubles its prices and finds that more wealthy buyers want its watches, because owning one signals status. These watches are behaving as',
  opts: ['Veblen (prestige) goods', 'Giffen goods', 'inferior goods', 'complementary goods'],
  sol: 'Goods bought for display of status, whose desirability rises with price, are Veblen goods. Giffen goods are inferior necessities of the poor.',
}));
Q('m_flood_buying', mcq({
  t: 6, d: 2, c: 'understanding',
  stem: 'After a flood warning in an imagined Assam district, families buy more candles and drinking water even though shop prices have risen. This is an exception to the Law of Demand because of',
  opts: ['an emergency', 'a Veblen effect', 'a fall in income', 'ignorance about prices'],
  sol: 'During emergencies people buy more of essentials whatever the price, so the usual inverse relation does not hold.',
}));
Q('m_shares_rise', mcq({
  t: 6, d: 3, c: 'application',
  stem: 'When the price of shares of an imagined company starts rising, more investors rush to buy them. Which exception to the Law of Demand does this show?',
  opts: ['Expectation of a further rise in price', 'A Giffen good', 'An emergency', 'Composite demand'],
  sol: 'Buyers expect the price to keep rising, so they buy more as the price rises: the expectations exception.',
}));
Q('tf_giffen_inferior', tf({
  t: 6, d: 3, c: 'understanding', ans: true,
  stem: 'True or false? Every Giffen good is an inferior good, but not every inferior good is a Giffen good.',
  sol: 'A Giffen good must have a negative income effect (inferior); but most inferior goods still obey the law because their substitution effect is stronger, so the statement is true.',
}));
Q('s_veblen_explain', short({
  t: 6, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Why can the demand for a status good, such as a designer handbag, rise when its price rises?',
  model: 'Such a good is bought to **display wealth and status** (a **Veblen** good). A higher price makes it **more exclusive**, so wealthy buyers value it more and buy more of it; a lower price would reduce its appeal.',
  sol: 'Status display and exclusivity linked to price.',
  scheme: [['Status or prestige motive', 1], ['Higher price raises appeal, so more is bought', 1]],
}));
Q('s3_giffen_case', short({
  t: 6, d: 4, c: 'analysis', marks: 3, wl: S3,
  stem: 'Very poor families in an imagined drought-hit village spend most of their income on a cheap staple grain. When its price rises, they buy more of it and less of costlier foods. Explain this behaviour.',
  model: 'The grain is an **inferior staple** taking a **large share of the budget**. A price rise cuts their **real income** sharply (a strong negative **income effect**), so they can no longer afford costlier foods and fall back on even more of the staple. This income effect **outweighs the substitution effect**, so quantity demanded rises with price: a **Giffen good**.',
  sol: 'Inferior staple with a large budget share, dominant income effect, conclusion.',
  scheme: [['Inferior good with large budget share', 1], ['Income effect outweighs substitution effect', 1], ['Conclusion: Giffen good, upward-sloping demand', 1]],
}));
Q('l_four_exceptions', long({
  t: 6, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Explain any four exceptions to the Law of Demand, with an imagined Indian example of each, and state why each is an exception.',
  model: '1. **Giffen goods:** very poor households buy more of a cheap inferior staple when its price rises, because the income effect dominates.\n2. **Veblen goods:** rich buyers want more of an expensive designer watch at a higher price, for status.\n3. **Expectations of price change:** if buyers expect gold to get dearer, they buy more now even as its price rises.\n4. **Emergencies:** during a flood families buy more medicines and drinking water despite higher prices.\nIn each case more is bought at a higher price (or the usual assumptions such as constant expectations no longer hold), so the inverse relation fails.',
  sol: 'Four exceptions, each with an example and the reason it is an exception.',
  scheme: [['Giffen goods', 1], ['Veblen goods', 1], ['Expectations', 1], ['Emergencies', 1], ['Why these are exceptions', 1]],
}));

// ================================================================ ISC paper-style 4-mark and 8-mark items (bank only)
Q('q4_tea_stall', short({
  t: [5, 2], d: 3, c: 'application', marks: 4, wl: S4,
  stem: 'Read the imagined situation and answer both parts.\n\nA tea stall near a bus stand in an imagined Bhubaneswar locality sells tea at ₹10 a cup. (i) In the first week of winter it sells many more cups at the same price. (ii) A month later the owner cuts the price to ₹8 and sells still more. Identify the change in demand in each part and describe a separate diagram for each. [2 + 2]',
  model: '(i) The price is unchanged but more is bought because **colder weather** raises the desire for tea (a change in tastes or seasonal need): an **increase in demand**. Diagram: at ₹10 the curve shifts **right** from D₁ to D₂, so the quantity rises from Q₁ to Q₂.\n(ii) Only the **own price** fell (₹10 to ₹8), so buyers move **down along** the existing curve: an **extension of demand**. Diagram: one curve D, with the point moving from (Q₁, ₹10) to a larger quantity at ₹8.',
  sol: 'Classify each change by its cause, then describe the matching diagram.',
  scheme: [['(i) increase in demand identified with cause', 1], ['(i) rightward shift diagram described', 1], ['(ii) extension identified', 1], ['(ii) movement-along diagram described', 1]],
}));
Q('q4_millet_pairs', short({
  t: [2, 6], d: 3, c: 'analysis', marks: 4, wl: S4,
  stem: 'Answer both parts about an imagined Hyderabad grocery market. [2 + 2]\n\n(i) The price of ragi flour rises, and families buy more jowar flour. What is the relationship between the two goods, and what happens to the demand curve for jowar flour?\n(ii) A shopkeeper says that when the price of an expensive imported olive oil rose, a few rich customers bought more of it. Is this consistent with the Law of Demand? Justify.',
  model: '(i) Ragi and jowar flour are **substitutes**: a dearer ragi flour makes buyers switch to jowar, so the **demand curve for jowar flour shifts to the right** (an increase in demand) at every price of jowar.\n(ii) **Not consistent** with the usual law: the oil is bought partly for **status (a Veblen good)**, so its appeal rises with its price. It is an **exception** to the law, which assumes ordinary goods bought for their use.',
  sol: 'Substitute relation with a rightward shift; Veblen exception with justification.',
  scheme: [['(i) substitutes identified', 1], ['(i) rightward shift of jowar demand', 1], ['(ii) Veblen good identified', 1], ['(ii) exception justified', 1]],
}));
Q('l8_market_and_shift', long({
  t: [4, 5], d: 4, c: 'analysis', marks: 8, wl: L8,
  stem: 'Answer both parts. [4 + 4]\n\n(i) The weekly demands of two imagined households in a Kochi housing society for banana chips are Q = 8 − 0.1P (household A) and Q = 6 − 0.05P (household B), with P in ₹ per packet and no negative quantities. Prepare the market schedule at ₹40, ₹60, ₹80 and ₹100 and explain how the market curve is obtained.\n(ii) A festival then raises both households\' desire for banana chips. Explain with a described diagram how the market demand curve changes, and contrast this with the effect of a fall in the price of chips.',
  model: `(i)\n\n${md([40, 60, 80, 100].map((p) => [p, qA(p), qB(p), qMkt(p)]), ['Price (₹)', 'A', 'B', 'Market'])}\n\nAt each price the two quantities are **added** (horizontal summation). Above ₹80 only B buys, so the market curve follows B\'s curve; below ₹80 both buy, so the curve is flatter, with a **kink at ₹80**.\n(ii) A festival is a change in **tastes** (a non-price determinant): both households want more at every price, so the market curve **shifts right** from D₁ to D₂. A **fall in the price** of chips instead moves buyers **down along the same curve** (an extension); the curve itself does not move.`,
  sol: 'Correct schedule and summation with the kink; then shift versus movement.',
  scheme: [['A and B quantities correct', 1], ['Market totals correct', 1], ['Horizontal summation explained', 1], ['Kink at ₹80 explained', 1], ['Festival as a change in tastes', 1], ['Rightward shift of the market curve', 1], ['Price fall as an extension', 1], ['Clear contrast of shift and movement', 1]],
}));
Q('l8_law_and_limits', long({
  t: [3, 6], d: 4, c: 'evaluation', marks: 8, wl: L8,
  stem: 'Answer both parts. [4 + 4]\n\n(i) "A downward-sloping demand curve follows from the way households respond to a price change." Explain this statement using the substitution effect, the income effect and diminishing marginal utility, with examples from an imagined Indian household.\n(ii) Evaluate whether the Law of Demand holds in every market by discussing any four situations in which more may be bought at a higher price.',
  model: '(i) When the price of pulses falls: the **substitution effect** makes pulses cheaper relative to vegetables, so the family substitutes towards pulses; the **income effect** raises its real income, so it can buy more pulses; and because **marginal utility diminishes**, it buys extra kilograms only at the lower price. All three make quantity demanded rise as price falls, so the curve **slopes downward**.\n(ii) The law does **not** hold everywhere. **Giffen goods:** very poor families buy more of a dearer inferior staple because the income effect dominates. **Veblen goods:** status goods such as luxury cars are wanted more when dearer. **Expectations:** buyers expecting further price rises buy more now. **Emergencies:** during floods or epidemics essentials are bought regardless of price. So the law is a useful **general tendency** under ceteris paribus, not a rule without exceptions.',
  sol: 'Three mechanisms linked to the slope; four exceptions with a judgement.',
  scheme: [['Substitution effect', 1], ['Income effect', 1], ['Diminishing marginal utility', 1], ['Link to the downward slope', 1], ['Giffen goods', 1], ['Veblen goods', 1], ['Expectations and emergencies', 1], ['Evaluation: general tendency under ceteris paribus', 1]],
}));

// ================================================================ case-based
Q('cb_chips_society', caseQ({
  t: [4, 5], d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the imagined case and answer the questions that follow about the banana-chips buyers of a Kochi housing society. *(Imagined households and figures, written by SOYL for practice.)*',
  passage: `**Weekly purchases of banana chips, Palm Grove housing society, Kochi (imagined)**\n\n${md(CHIPS_ROWS, ['Price (₹ per packet)', 'Household A', 'Household B', 'Market'])}\n\nThe society secretary notes that when a new snack shop opened, both households said they would buy fewer packets of chips at every price.`,
  parts: [
    child('a', num({ t: 4, d: 2, c: 'application', marks: 1, value: qMkt(20), unit: 'packets', stem: 'What is the market quantity demanded at ₹20 a packet?', sol: `Step 1: A buys ${qA(20)}, B buys ${qB(20)}.\nStep 2: ${qA(20)} + ${qB(20)} = ${qMkt(20)} packets.` })),
    child('b', short({ t: 4, d: 2, c: 'understanding', marks: 1, stem: 'At which prices does household A buy nothing, and what does that mean for the market curve?', model: 'At **₹80 and above** A buys nothing, so there the market curve is **the same as B\'s curve**.', sol: 'Read the zero entries for A and relate them to the summation.', scheme: [['Prices identified and link to B\'s curve', 1]] })),
    child('c', short({ t: 5, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): The new snack shop sells close substitutes. Explain its effect on the market demand curve for chips.', model: 'The snack shop offers **substitutes**, so at **every price** the households buy fewer packets: the market demand curve **shifts to the left** (a decrease in demand), not a movement along it.', sol: 'Substitute entry causes a leftward shift.', scheme: [['Substitutes reduce demand at every price', 1], ['Leftward shift, not a movement', 1]] }), [
      short({ t: 5, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): If the price of chips falls from ₹60 to ₹40, what happens to the market quantity, and how is it shown?', model: `The market quantity rises from **${qMkt(60)} to ${qMkt(40)} packets**. This is an **extension of demand**, shown as a movement **down along** the market curve.`, sol: 'Read both totals and classify as an extension.', scheme: [['Quantities read correctly', 1], ['Extension along the curve', 1]] }),
    ]),
  ],
}));
Q('cb_diwali_shop', caseQ({
  t: [2, 6], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the imagined diary entry of a shopkeeper in an imagined Varanasi lane and answer the questions that follow. *(Written by SOYL for practice.)*',
  passage: '**From the diary of Ramesh, sweets and gifts shop (imagined), the week before Diwali**\n\nMonday: Prices of khoya went up, yet orders for sweets doubled — everyone wants sweets for the festival. Wednesday: A customer bought the costliest silver gift box because "the expensive one shows respect". Thursday: Word spread that sugar prices will jump next week; regular customers bought two months\' sugar today. Saturday: My neighbour cut the price of dry-fruit boxes, and my dry-fruit sales fell.',
  parts: [
    child('a', short({ t: 2, d: 2, c: 'understanding', marks: 1, stem: 'Which determinant of demand explains the Monday entry?', model: 'A change in **tastes and preferences** (festival demand), which **increases** demand for sweets at every price.', sol: 'Festival = change in tastes; demand rises at each price.', scheme: [['Tastes and preferences / festival', 1]] })),
    child('b', short({ t: 6, d: 2, c: 'application', marks: 1, stem: 'Name the exception to the Law of Demand seen in the Wednesday entry.', model: 'A **Veblen (prestige) good**: the gift box is valued more because it is expensive.', sol: 'Status-driven purchase.', scheme: [['Veblen good', 1]] })),
    child('c', short({ t: 6, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Explain why the Thursday buying is an exception to the Law of Demand.', model: 'Customers **expect a further price rise**, so they buy **more now** even though prices are already rising. The law assumes constant **expectations**; when that assumption fails, more is bought at a higher price.', sol: 'Expectations exception linked to the broken assumption.', scheme: [['Expectation of a further rise', 1], ['Link to the assumption of the law', 1]] }), [
      short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Explain the Saturday entry using the relationship between the two shops\' dry-fruit boxes.', model: 'The neighbour\'s boxes are **close substitutes**. When their price falls, buyers switch to them, so the **demand for Ramesh\'s boxes decreases** (his demand curve shifts **left**) though his own price did not change.', sol: 'Substitutes and a leftward shift.', scheme: [['Substitutes identified', 1], ['Decrease in demand, leftward shift', 1]] }),
    ]),
  ],
}));
