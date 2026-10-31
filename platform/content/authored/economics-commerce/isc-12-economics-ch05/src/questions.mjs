// ISC 12 Economics, ch05 Theory of Supply and Elasticity of Supply — question bank. Every seller, firm, town and
// figure is imagined by SOYL; no textbook example, exercise, specimen-paper or past-paper item is reused (D-036) — in
// particular the ISC 2027 specimen's wheat-trader storage item is not reused. Every number in a stem, key or worked
// solution is computed here and asserted, so stems, keys and solutions cannot drift apart.
// Convention: Es = (percentage change in quantity supplied) ÷ (percentage change in price), with changes measured from
// the INITIAL price and quantity. Price and quantity supplied move together, so Es is normally positive.
import { Q, mcq, ar, tf, fb, match, ord, num, short, long, caseQ, child } from '../../isc-12-economics-ch01/src/lib.mjs';

const S2 = [30, 50];
const S3 = [50, 80];
const S4 = [70, 110];
const L5 = [100, 150];
const L8 = [150, 220];

export const r3 = (x) => Math.round(x * 1000) / 1000;
const assert = (cond, msg) => { if (!cond) throw new Error(`questions.mjs: ${msg}`); };
/** Percentage change from the initial value, rounded to 3 decimals. */
export const pct = (a, b) => r3(((b - a) / a) * 100);
/** Elasticity of supply by the percentage method. */
export const es = (p0, p1, q0, q1) => r3(pct(q0, q1) / pct(p0, p1));

// ---------------------------------------------------------------- shared imagined data (all asserted)
// Silk sarees from an imagined Surat weaver: ₹500 → ₹600 a saree, weekly supply 40 → 52 (on the line Q = 0.12P − 20).
export const SAREE = { p0: 500, p1: 600, q0: 40, q1: 52 };
export const SAREE_ES = es(SAREE.p0, SAREE.p1, SAREE.q0, SAREE.q1);
export const sareeS1 = (p) => r3(0.12 * p - 20);
export const sareeS2 = (p) => r3(0.12 * p - 8);
assert(pct(SAREE.p0, SAREE.p1) === 20 && pct(SAREE.q0, SAREE.q1) === 30 && SAREE_ES === 1.5, 'saree');
assert(sareeS1(SAREE.p0) === SAREE.q0 && sareeS1(SAREE.p1) === SAREE.q1 && sareeS2(SAREE.p0) === 52, 'saree lines');

// Onions from an imagined Nashik trader: Es 0.5, price ₹20 → ₹24 a kg, initial 1,000 kg a day.
export const ONION = { p0: 20, p1: 24, q0: 1000, e: 0.5 };
export const ONION_Q1 = r3(ONION.q0 * (1 + (ONION.e * pct(ONION.p0, ONION.p1)) / 100));
assert(pct(ONION.p0, ONION.p1) === 20 && ONION_Q1 === 1100, 'onion');

// Mango boxes from an imagined Ratnagiri orchard: ₹500 → ₹600 a box, 200 → 240 boxes a week (unitary).
export const MANGO = { p0: 500, p1: 600, q0: 200, q1: 240 };
export const MANGO_ES = es(MANGO.p0, MANGO.p1, MANGO.q0, MANGO.q1);
assert(MANGO_ES === 1, 'mango');

// Leather belts from an imagined Kanpur workshop: Es 2, supply 300 → 360 belts a week, initial price ₹150.
export const BELT = { p0: 150, q0: 300, q1: 360, e: 2 };
export const BELT_DP = r3(pct(BELT.q0, BELT.q1) / BELT.e);
export const BELT_P1 = r3(BELT.p0 * (1 + BELT_DP / 100));
assert(pct(BELT.q0, BELT.q1) === 20 && BELT_DP === 10 && BELT_P1 === 165, 'belt');

// Brass lamps from an imagined Moradabad unit: ₹800 → ₹1,000, supply 120 → 135 lamps a month.
export const BRASS = { p0: 800, p1: 1000, q0: 120, q1: 135 };
export const BRASS_ES = es(BRASS.p0, BRASS.p1, BRASS.q0, BRASS.q1);
assert(pct(BRASS.p0, BRASS.p1) === 25 && pct(BRASS.q0, BRASS.q1) === 12.5 && BRASS_ES === 0.5, 'brass');

// Water pumps from an imagined Coimbatore maker: price falls ₹4,000 → ₹3,600, supply 250 → 220 a month.
export const PUMP = { p0: 4000, p1: 3600, q0: 250, q1: 220 };
export const PUMP_ES = es(PUMP.p0, PUMP.p1, PUMP.q0, PUMP.q1);
assert(pct(PUMP.p0, PUMP.p1) === -10 && pct(PUMP.q0, PUMP.q1) === -12 && PUMP_ES === 1.2, 'pump');

// Hand-rolled tea from an imagined Darjeeling garden this week: price up 10 per cent, quantity offered unchanged at 80 kg.
export const TEA = { p0: 1500, p1: 1650, q0: 80, q1: 80 };
export const TEA_ES = es(TEA.p0, TEA.p1, TEA.q0, TEA.q1);
assert(TEA_ES === 0, 'tea');

// Hosiery packets from three imagined Ludhiana knitting units at four prices.
export const HOSE = {
  prices: [100, 200, 300, 400],
  firms: { 'Unit A': [10, 20, 30, 40], 'Unit B': [5, 15, 25, 35], 'Unit C': [0, 10, 20, 30] },
};
export const HOSE_MKT = HOSE.prices.map((_, i) => Object.values(HOSE.firms).reduce((s, f) => s + f[i], 0));
export const HOSE_ES = es(200, 300, HOSE_MKT[1], HOSE_MKT[2]);
assert(HOSE_MKT.join() === '15,45,75,105' && HOSE_ES === 1.333, 'hosiery');

// Kochi fish (perishable) and Saharanpur woodcraft (durable): stock versus supply at the ruling price.
export const FISH = { stock: 500, supply: 500 };
export const WOOD = { stock: 300, supply: 120 };
export const WOOD_HELD = WOOD.stock - WOOD.supply;
assert(WOOD_HELD === 180, 'wood');

// Geometric method: straight supply lines with price on the y-axis.
// L1: P = 10 + Q meets the price axis → Es > 1; L2: P = Q passes through the origin → Es = 1;
// L3: P = Q − 10 meets the quantity axis → Es < 1. Point elasticity Es = (ΔQ/ΔP) × (P/Q).
export const pointEs = (dQdP, p, q) => r3(dQdP * (p / q));
assert(pointEs(1, 30, 20) === 1.5 && pointEs(1, 20, 20) === 1 && pointEs(1, 20, 30) === 0.667, 'geometric lines');

const md = (rows, head) => `| ${head.join(' | ')} |\n|${head.map(() => '---').join('|')}|\n${rows.map((r) => `| ${r.join(' | ')} |`).join('\n')}`;
const fmtIN = (n) => n.toLocaleString('en-IN');
export const hoseTable = () => md(HOSE.prices.map((p, i) => [`₹${p}`, ...Object.values(HOSE.firms).map((f) => String(f[i]))]), ['Price per packet', ...Object.keys(HOSE.firms)]);

// ================================================================ t01 Meaning of supply; stock and supply
Q('m_supply_meaning', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'In economics, the supply of a good means',
  opts: [
    'the quantity sellers are willing and able to offer for sale at a given price during a given period',
    'the total quantity of the good lying in the warehouses of all sellers',
    'the quantity that buyers wish to purchase at a given price',
    'the quantity of the good produced since the firm began business',
  ],
  sol: 'Supply is always tied to a price and a period: it is the amount offered for sale. What sits in warehouses is stock; what buyers wish to purchase is demand.',
}));
Q('m_fish_stock', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'A fisherman landing 500 kg of mackerel at an imagined Kochi harbour has no ice box and must sell the catch before evening. For him, supply at the ruling price is most likely',
  opts: ['almost equal to his stock, because the fish is perishable', 'much smaller than his stock, because he can store fish for a better price', 'zero, because supply depends only on next week\'s price', 'greater than his stock, because supply includes future catches'],
  sol: 'A perishable good cannot be held back, so nearly the whole stock is offered for sale and supply is close to stock. Supply can never exceed the stock available in the period.',
}));
Q('m_wood_held', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: `An imagined Saharanpur woodcraft dealer has ${WOOD.stock} carved boxes in his godown but offers only ${WOOD.supply} for sale at this month's price. How many boxes is he holding back in the hope of a better price?`,
  opts: [String(WOOD_HELD), String(WOOD.stock), String(WOOD.supply), String(WOOD.stock + WOOD.supply)],
  sol: `Stock is ${WOOD.stock} and supply is ${WOOD.supply}, so ${WOOD.stock} − ${WOOD.supply} = ${WOOD_HELD} boxes are held back. A durable good can be stored, so supply may be well below stock.`,
}));
Q('tf_stock_limit', tf({
  t: 1, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? Within a given short period, a seller\'s supply of a good can at most equal the stock of that good available to him.',
  sol: 'Supply is drawn out of the existing stock in the short period, so it can equal the stock (as with perishables) but never exceed it.',
}));
Q('fb_supply_period', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'Supply is the quantity offered for sale at a particular price during a particular ___ of time.',
  acc: [['period', 'time period']],
  sol: 'Supply always refers to a price and a period of time, which is why it is a flow concept.',
}));
Q('s_stock_supply', short({
  t: 1, d: 1, c: 'understanding', marks: 2, wl: S2,
  stem: 'Distinguish between stock and supply, with one imagined example from an Indian market.',
  model: '**Stock** is the **total quantity** of a good a seller **has** at a point of time; **supply** is the part of it **offered for sale at a given price** in a period. A grain dealer in an imagined Agra mandi may hold 900 sacks but offer only 600 at today\'s price.',
  sol: 'Define both and add one example where supply is less than stock.',
  scheme: [['Stock defined', 1], ['Supply defined with example', 1]],
}));
Q('s3_perishable_durable', short({
  t: 1, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Explain why the gap between stock and supply is usually small for fresh coriander bunches but can be large for steel almirahs. Give one condition under which the almirah seller would release his whole stock.',
  model: '1. **Coriander** is **perishable**: it wilts within a day, so the seller must offer nearly the **whole stock** at the ruling price; supply is close to stock.\n2. **Almirahs** are **durable**: they can be stored without loss, so the seller may hold many back and supply **well below stock** when he expects prices to rise.\n3. He would release the whole stock if the **price rose high enough** (or he expected prices to fall, or needed cash urgently).',
  sol: 'Perishability links supply to stock; durability allows holding back; one release condition.',
  scheme: [['Perishable good: supply close to stock', 1], ['Durable good: supply can be below stock', 1], ['Condition for releasing the whole stock', 1]],
}));

// ================================================================ t02 Determinants of supply; supply function
Q('m_input_cost', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'The price of cotton yarn falls sharply for weavers in an imagined Bhiwandi powerloom cluster. Other things equal, the supply of grey cloth will',
  opts: ['increase: the supply curve shifts to the right', 'decrease: the supply curve shifts to the left', 'extend along the same supply curve', 'stay the same, because only the price of cloth affects supply'],
  sol: 'Cheaper inputs lower the cost of production, so more cloth is offered at every price: an increase in supply and a rightward shift. Extension needs a change in the cloth\'s own price.',
}));
Q('m_new_tech', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'An imagined Rajkot pump maker installs computer-controlled lathes that cut the time needed for each pump. The most likely effect on its supply curve is',
  opts: ['a shift to the right, as cost per pump falls', 'a shift to the left, as machines are costly to install', 'a movement up the same curve', 'no change, because technology is not a determinant of supply'],
  sol: 'Better technology lowers the cost of producing each unit, so the firm offers more at every price: the supply curve shifts right.',
}));
Q('m_excise', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'A state government places a new tax of ₹10 on every bottle of soft drink produced in an imagined Haridwar bottling plant. How does this affect the plant\'s supply?',
  opts: ['Supply decreases: the curve shifts left because each bottle now costs more to sell', 'Supply increases: the curve shifts right as the plant earns tax refunds', 'Supply extends as the price buyers pay rises', 'Supply is unchanged because the tax is paid by buyers'],
  sol: 'A tax per unit raises the cost of supplying each bottle, so less is offered at every price: a decrease in supply and a leftward shift.',
}));
Q('m_subsidy', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'Solar-panel makers in an imagined Gujarat industrial park receive a production subsidy of ₹2,000 for each panel. Which change in supply follows?',
  opts: ['An increase in supply, shown by a rightward shift', 'A contraction of supply along the same curve', 'A decrease in supply, shown by a leftward shift', 'An extension of supply caused by a rise in the panel price'],
  sol: 'A per-unit subsidy lowers the effective cost of each panel, so more panels are offered at every price: supply increases and the curve shifts right.',
}));
Q('m_related_crop', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'Farmers in an imagined Rajasthan district can sow either mustard or wheat in the rabi season. The price of mustard rises steeply while the wheat price is unchanged. Next season the supply of wheat from the district is likely to',
  opts: ['decrease, as land and effort shift to the more rewarding crop', 'increase, as farmers earn more from mustard', 'extend, because the price of wheat has risen', 'stay unchanged, since the wheat price did not change'],
  sol: 'Wheat and mustard compete for the same land. A higher price of a related (competing) good draws resources away, so wheat supply decreases even though its own price is unchanged.',
}));
Q('m_goal_sales', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'An imagined e-bike start-up in Bengaluru decides to aim for the largest market share rather than the largest profit. Compared with a profit-maximising rival with identical costs, at each price it will usually',
  opts: ['offer a larger quantity for sale', 'offer a smaller quantity for sale', 'offer exactly the same quantity', 'stop supplying altogether'],
  sol: 'The goal of the firm is a determinant of supply. A firm aiming at sales or market share is willing to sell more at each price than one aiming only at maximum profit.',
}));
Q('m_more_firms', mcq({
  t: 2, d: 1, c: 'understanding',
  stem: 'Twelve new bakeries open in an imagined Mysuru town over a year. The market supply of bread in the town will',
  opts: ['increase, because more sellers offer bread at every price', 'decrease, because each bakery now sells less', 'extend only if the price of bread rises', 'not change, because market supply depends only on price'],
  sol: 'Market supply is the sum of individual supplies, so more sellers raise the quantity offered at every price: an increase in market supply.',
}));
Q('ar_tech_shift', ar({
  t: [2, 4], d: 2, c: 'analysis', key: 'c',
  a: 'An improvement in the technology of a Ludhiana bicycle maker shifts its supply curve to the right.',
  r: 'Better technology works by raising the market price of bicycles.',
  sol: 'A is true: better technology lowers the cost of each bicycle, so more is offered at every price. R is false: technology acts through cost, not by raising the price of the good; a change in price would only move the firm along its curve.',
}));
Q('s_supply_function', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Write the supply function for a good X in symbols and explain what any two of its variables stand for.',
  model: '**Sx = f(Px, Pf, T, Tx, G, Pr, N)**. **Px** is the **own price** of X, the main variable on which quantity supplied depends; **Pf** is the **prices of factors** (inputs), whose rise raises cost and reduces supply.',
  sol: 'Function in symbols and two variables explained.',
  scheme: [['Supply function written', 1], ['Two variables explained', 1]],
}));
Q('s_tax_subsidy', short({
  t: 2, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'Explain how a per-unit tax and a per-unit subsidy would each change the supply of LED bulbs from an imagined Noida factory.',
  model: 'A **per-unit tax** adds to the **cost** of each bulb, so the factory offers **fewer bulbs at every price**: supply **decreases** (curve shifts left). A **subsidy** reduces the effective cost, so it offers **more at every price**: supply **increases** (curve shifts right).',
  sol: 'Tax shifts left; subsidy shifts right, both through cost.',
  scheme: [['Tax decreases supply with reason', 1], ['Subsidy increases supply with reason', 1]],
}));
Q('s3_goals_related', short({
  t: 2, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'A dairy cooperative in an imagined Anand village can turn its milk into either paneer or ghee. Explain how (i) a rise in the price of ghee, (ii) a fall in the price of fodder and (iii) a decision to win more customers will affect its supply of paneer.',
  model: '(i) Ghee is a **competing product**: a higher ghee price draws milk away from paneer, so paneer supply **decreases**.\n(ii) Cheaper **fodder** lowers the **cost** of milk, so more paneer is offered at every price: supply **increases**.\n(iii) Aiming to **win customers** (sales rather than profit) makes the cooperative offer **more** paneer at each price: supply **increases**.',
  sol: 'Related good, input price and goal of the firm, each with direction.',
  scheme: [['(i) related good: decrease', 1], ['(ii) input price: increase', 1], ['(iii) goal of the firm: increase', 1]],
}));
Q('s3_three_decrease', short({
  t: 2, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'State three causes that would decrease the supply of cement from an imagined plant in Satna, other than a change in the price of cement, and explain each briefly.',
  model: '1. A **rise in input prices** such as coal or limestone raises **cost per bag**, so fewer bags are offered at each price.\n2. A **new tax** on each bag of cement adds to cost and reduces supply.\n3. **Outdated or failed machinery**, or a strike, reduces output at every price.\nEach shifts the supply curve to the **left**.',
  sol: 'Three non-price causes, each explained.',
  scheme: [['First cause explained', 1], ['Second cause explained', 1], ['Third cause explained', 1]],
}));
Q('l_determinants', long({
  t: 2, d: 3, c: 'application', marks: 5, wl: L5,
  stem: 'Explain any five determinants of the supply of a good, using an imagined handloom unit in Varanasi as your example, and say in each case whether supply increases or decreases.',
  model: '1. **Own price:** a higher price for Banarasi sarees makes larger output **profitable**, so quantity supplied **rises** (law of supply).\n2. **Prices of inputs:** dearer **silk yarn** raises cost, so supply **decreases**.\n3. **Technology:** **jacquard looms** cut cost per saree, so supply **increases**.\n4. **Taxes and subsidies:** a **tax** on each saree reduces supply; a **subsidy** for weavers raises it.\n5. **Prices of related goods:** if **dupattas** made on the same looms fetch more, looms shift to them and saree supply **decreases**.',
  sol: 'Five determinants with the direction of change.',
  scheme: [['Own price', 1], ['Input prices', 1], ['Technology', 1], ['Taxes or subsidies', 1], ['Related goods (or goal, number of firms)', 1]],
}));

// ================================================================ t03 Law of supply; market supply; exceptions
Q('m_law_supply', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'The law of supply states that, other things remaining the same,',
  opts: ['quantity supplied rises when the price of the good rises and falls when it falls', 'quantity supplied falls when the price of the good rises', 'supply always equals demand at every price', 'price rises whenever the quantity supplied rises'],
  sol: 'Price and quantity supplied move in the same direction, other things constant, so the supply curve slopes upward.',
}));
Q('m_upward_reason', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Which reason best explains why a firm\'s supply curve usually slopes upward from left to right?',
  opts: ['A higher price makes extra output profitable even though producing it costs more at the margin', 'Buyers purchase more when the price falls', 'Firms always produce the same quantity in the short run', 'A higher price reduces the cost of production'],
  sol: 'Extra units usually cost more to produce; only a higher price covers that cost and keeps them profitable, so quantity supplied rises with price.',
}));
Q('n_market_hose', num({
  t: 3, d: 2, c: 'understanding', marks: 1, value: HOSE_MKT[2], unit: 'packets',
  stem: `Three imagined Ludhiana knitting units supply socks as shown. What is the market supply at ₹300 a packet?\n\n${hoseTable()}`,
  sol: `Market supply is the horizontal sum of the units' supplies at the same price: 30 + 25 + 20 = ${HOSE_MKT[2]} packets.`,
}));
Q('m_horizontal_sum', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'The market supply curve of a good is obtained from the supply curves of individual firms by',
  opts: ['adding the quantities supplied by all firms at each price (horizontal summation)', 'adding the prices charged by all firms at each quantity (vertical summation)', 'taking the supply curve of the largest firm', 'averaging the quantities supplied by all firms'],
  sol: 'At each price, quantities from all firms are added: the market curve is the horizontal sum of individual curves.',
}));
Q('m_backward_labour', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: 'A freelance translator in an imagined Pune suburb works more hours as her rate per hour rises, but beyond a high rate she starts working fewer hours and taking more holidays. Her supply curve of labour is best described as',
  opts: ['backward-bending at high wage rates', 'perfectly elastic at every wage', 'vertical at every wage', 'downward-sloping from the start'],
  sol: 'Beyond a high wage she prefers leisure to more income, so hours offered fall as the wage rises: the labour supply curve bends backward, an exception to the law of supply.',
}));
Q('m_rare_goods', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'Only nine paintings by an imagined nineteenth-century Kolkata artist exist. However high their price goes, no more can be offered. Their supply curve is',
  opts: ['a vertical line at nine paintings', 'a horizontal line at the current price', 'an upward-sloping straight line through the origin', 'a backward-bending curve'],
  sol: 'The quantity is fixed whatever the price, so supply is perfectly inelastic: a vertical line at nine. Rare goods are an exception to the law of supply.',
}));
Q('mt_exceptions', match({
  t: 3, d: 2, c: 'application', marks: 2,
  stem: 'Match each imagined situation with the exception to the law of supply that it shows.',
  pairs: [
    ['A highly paid surgeon in Chennai cuts her hours after a fee rise', 'Backward-bending supply of labour'],
    ['Rare old coins from the Mughal period offered by a Delhi collector', 'Fixed supply of rare goods'],
    ['A Punjab farmer cannot raise his wheat output after a mid-season price rise', 'Agricultural goods in the short period'],
    ['A trader holds back rice when he expects prices to rise next month', 'Expectation of a future price rise'],
  ],
  sol: 'Leisure preference bends labour supply backward; rare goods cannot be increased; crops depend on the season already sown; expected price rises make sellers withhold stock now.',
}));
Q('ar_labour_bend', ar({
  t: 3, d: 3, c: 'analysis', key: 'a',
  a: 'Beyond a certain wage rate, a worker may offer fewer hours of work when the wage rises further.',
  r: 'At high incomes a worker may value extra leisure more than the extra income from working longer.',
  sol: 'Both true, and R explains A: the preference for leisure at high incomes is the reason labour supply bends backward.',
}));
Q('tf_market_vertical', tf({
  t: 3, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? The market supply curve is found by adding the prices at which different firms will supply a given quantity.',
  sol: 'False. Market supply is the horizontal sum: quantities supplied by all firms are added at each price, not prices at each quantity.',
}));
Q('ord_market_steps', ord({
  t: 3, d: 2, c: 'understanding', marks: 1,
  stem: 'Arrange the steps for deriving the market supply curve of hosiery in an imagined Ludhiana market in the correct order.',
  items: [
    'Write each knitting unit\'s supply schedule at the same set of prices',
    'Add the quantities supplied by all units at each price',
    'Record the totals as the market supply schedule',
    'Plot price against total quantity to draw the market supply curve',
  ],
  sol: 'Individual schedules first, then horizontal addition at each price, then the market schedule, and finally the market curve.',
}));
Q('s_market_curve', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Explain, with the idea of horizontal summation, how the market supply curve of an imagined town\'s bread is derived from its bakeries\' supply curves.',
  model: 'At **each price**, the **quantities** offered by all bakeries are **added**. Each total gives one point of the **market supply curve**; joining these points gives a curve lying to the **right** of every individual curve.',
  sol: 'Quantities added at each price; points joined.',
  scheme: [['Quantities added at each price', 1], ['Market curve drawn from the totals', 1]],
}));
Q('s_labour_bend', short({
  t: 3, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: 'With a described diagram, explain the backward-bending supply curve of labour.',
  model: 'With **wage** on the y-axis and **hours** on the x-axis, the curve first slopes **upward**: higher wages call out more hours. Beyond a **high wage** it **bends back** to the left, as the worker buys **leisure** with his higher income and works fewer hours.',
  sol: 'Rising part, then backward bend explained by leisure.',
  scheme: [['Upward part explained', 1], ['Backward bend explained by leisure', 1]],
}));
Q('s3_market_table', short({
  t: 3, d: 2, c: 'application', marks: 3, wl: S3,
  stem: `Using the imagined schedule of three Ludhiana knitting units below, prepare the market supply schedule and state whether it obeys the law of supply.\n\n${hoseTable()}`,
  model: `Market supply at ₹100, ₹200, ₹300 and ₹400 is **${HOSE_MKT.join(', ')}** packets, found by **adding the three units' quantities at each price**. As the price rises, total quantity supplied **rises**, so the market schedule **obeys the law of supply**; its curve slopes **upward**.`,
  sol: 'Horizontal addition at each price, then conclusion.',
  scheme: [['Method: add quantities at each price', 1], ['Correct totals', 1], ['Law of supply obeyed', 1]],
}));
Q('s3_exceptions_three', short({
  t: 3, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain any three exceptions to the law of supply with imagined Indian examples.',
  model: '1. **Labour:** beyond a high wage, a well-paid Chennai surgeon may cut her hours to enjoy **leisure**; labour supply bends **backward**.\n2. **Rare goods:** old Mughal coins cannot be increased however high the price; supply is **fixed**.\n3. **Agricultural goods:** once a crop is sown in Punjab, a mid-season price rise cannot raise output until the **next season**.',
  sol: 'Three exceptions with reasons and examples.',
  scheme: [['First exception', 1], ['Second exception', 1], ['Third exception', 1]],
}));
Q('l_law_market', long({
  t: 3, d: 3, c: 'application', marks: 5, wl: L5,
  stem: `(a) State the law of supply and its assumptions. [2]\n(b) Using the imagined schedule of three Ludhiana knitting units below, derive the market supply schedule and describe the market supply curve. [3]\n\n${hoseTable()}`,
  model: `(a) Other things remaining **constant**, the **quantity supplied** of a good **rises** when its **price rises** and falls when its price falls. **Assumptions:** input prices, technology, taxes, prices of related goods, the goals of firms and the number of firms are **unchanged**.\n(b) Adding the quantities at each price gives market supply of **${HOSE_MKT.join(', ')}** packets at ₹100, ₹200, ₹300 and ₹400. Plotting price on the y-axis against these totals gives an **upward-sloping** market supply curve that lies to the **right** of each unit's curve, because it is their **horizontal sum**.`,
  sol: 'Law with assumptions; horizontal summation and the market curve.',
  scheme: [['Law stated', 1], ['Assumptions', 1], ['Method of horizontal summation', 1], ['Correct market totals', 1], ['Market curve described', 1]],
}));

// ================================================================ t04 Movement along versus shift of the supply curve
Q('m_extension', mcq({
  t: 4, d: 1, c: 'understanding',
  stem: `The price of an imagined Surat weaver's silk sarees rises from ₹${SAREE.p0} to ₹${SAREE.p1}, and she offers ${SAREE.q1} instead of ${SAREE.q0} a week, nothing else changing. This is`,
  opts: ['an extension of supply: a movement up the same supply curve', 'an increase in supply: a rightward shift of the curve', 'a decrease in supply: a leftward shift of the curve', 'a contraction of supply: a movement down the curve'],
  sol: 'Only the saree\'s own price changed, so she moves along her supply curve; a larger quantity at a higher price is an extension.',
}));
Q('m_increase_cause', mcq({
  t: 4, d: 2, c: 'application',
  stem: 'Which of the following would cause an increase in the supply of tomatoes from an imagined Kolar district?',
  opts: ['A cheaper drip-irrigation system for tomato farms', 'A rise in the market price of tomatoes', 'A new tax on each crate of tomatoes', 'A rise in the price of capsicum grown on the same land'],
  sol: 'Cheaper irrigation lowers cost, so more is offered at every price: an increase (shift right). A rise in the tomato price causes an extension; a tax and a dearer competing crop cause decreases.',
}));
Q('m_contraction', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'A fall in the price of cotton shirts from an imagined Tiruppur unit, other things constant, leads to',
  opts: ['a contraction of supply: a movement down the same curve', 'a decrease in supply: a leftward shift', 'an increase in supply: a rightward shift', 'no change in the quantity supplied'],
  sol: 'A change in the good\'s own price moves the firm along its curve; a lower price brings a smaller quantity supplied, which is a contraction.',
}));
Q('m_rightward_read', mcq({
  t: 4, d: 3, c: 'analysis',
  stem: `On the imagined Surat weaver's supply diagram, curve S1 shows ${SAREE.q0} sarees a week at ₹${SAREE.p0}; after a fall in the cost of silk yarn, the new curve S2 shows ${sareeS2(SAREE.p0)} sarees at the same price. What does the move from S1 to S2 show?`,
  opts: ['An increase in supply caused by a factor other than the saree\'s own price', 'An extension of supply caused by a higher saree price', 'A decrease in supply caused by costlier inputs', 'A contraction of supply caused by a lower saree price'],
  sol: 'More sarees at the same price means the whole curve has shifted right: an increase in supply, caused here by cheaper yarn, not by the saree price.',
}));
Q('ar_movement_price', ar({
  t: 4, d: 3, c: 'analysis', key: 'b',
  a: 'A change in the price of a good, other things constant, causes a movement along its supply curve.',
  r: 'The supply curve of a firm usually slopes upward from left to right.',
  sol: 'Both true, but R does not explain A. A movement along the curve follows because every other determinant is held constant when the curve is drawn; the upward slope only tells us the direction of the movement.',
}));
Q('tf_price_shift', tf({
  t: 4, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? A rise in the price of leather bags shifts the supply curve of leather bags to the right.',
  sol: 'False. A change in the good\'s own price causes a movement along the curve (an extension), not a shift.',
}));
Q('fb_decrease', fb({
  t: 4, d: 1, c: 'recall',
  stem: 'When less of a good is offered at every price because a non-price factor has changed, economists call it a ___ in supply.',
  acc: [['decrease']],
  sol: 'A leftward shift caused by a non-price factor is a decrease in supply; a smaller quantity due to a lower own price is a contraction.',
}));
Q('s_ext_vs_inc', short({
  t: 4, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Distinguish between an extension of supply and an increase in supply.',
  model: 'An **extension** is a **movement up** the same supply curve caused by a **rise in the good\'s own price**. An **increase** is a **rightward shift** of the whole curve caused by a **non-price factor**, such as cheaper inputs, so more is offered at every price.',
  sol: 'Cause and diagrammatic form of each.',
  scheme: [['Extension: own price, movement along', 1], ['Increase: other factors, shift right', 1]],
}));
Q('s3_diag_movement_shift', short({
  t: 4, d: 3, c: 'application', marks: 3, wl: S3,
  stem: `Using the imagined Surat weaver's data, describe two diagrams: one showing the price rising from ₹${SAREE.p0} to ₹${SAREE.p1}, and one showing a fall in the cost of silk yarn. Name the change in each.`,
  model: `**Diagram 1:** price on the y-axis, sarees on the x-axis; on **one curve S1**, the point moves from (${SAREE.q0}, ₹${SAREE.p0}) up to (${SAREE.q1}, ₹${SAREE.p1}): an **extension of supply**.\n**Diagram 2:** the whole curve **shifts right** from S1 to S2, so at ₹${SAREE.p0} she now offers ${sareeS2(SAREE.p0)} sarees instead of ${SAREE.q0}: an **increase in supply**.\nThe first is caused by the **own price**, the second by **lower input cost**.`,
  sol: 'Movement along versus shift, each named with its cause.',
  scheme: [['Diagram 1: movement along, extension', 1], ['Diagram 2: rightward shift, increase', 1], ['Causes contrasted', 1]],
}));
Q('l_movement_shift', long({
  t: 4, d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: '(a) Distinguish between a contraction of supply and a decrease in supply, with described diagrams. [3]\n(b) Explain, with reasons, how each of the following affects the supply curve of mobile phone covers from an imagined Delhi factory: (i) a fall in the price of covers; (ii) a rise in workers\' wages. [2]',
  model: '(a) A **contraction** is a **movement down** the same supply curve when the good\'s **own price falls**: less is offered at a lower price, the point sliding down S1. A **decrease** is a **leftward shift** of the whole curve from S1 to S2 when a **non-price factor** worsens, such as dearer inputs or a new tax: less is offered at **every** price. The first changes position on one curve; the second moves the curve itself.\n(b) (i) A fall in the price of covers causes a **contraction**: the factory moves **down** its existing curve. (ii) Higher **wages** raise the **cost** of each cover, so less is offered at every price: a **decrease**, the curve shifting **left**.',
  sol: 'Contraction versus decrease with diagrams; two applications.',
  scheme: [['Contraction explained with movement along', 1], ['Decrease explained with leftward shift', 1], ['Clear contrast of causes', 1], ['(i) contraction', 1], ['(ii) decrease with reason', 1]],
}));

// ================================================================ t05 Elasticity of supply
Q('m_es_meaning', mcq({
  t: 5, d: 1, c: 'recall',
  stem: 'Price elasticity of supply measures',
  opts: ['the responsiveness of quantity supplied to a change in the good\'s own price', 'the responsiveness of quantity demanded to a change in income', 'the change in a firm\'s cost when output changes', 'the total revenue a firm earns at a given price'],
  sol: 'Es compares the percentage change in quantity supplied with the percentage change in the good\'s own price.',
}));
Q('m_es_formula', mcq({
  t: 5, d: 1, c: 'recall',
  stem: 'By the percentage method, elasticity of supply equals',
  opts: [
    'percentage change in quantity supplied ÷ percentage change in price',
    'percentage change in price ÷ percentage change in quantity supplied',
    'change in quantity supplied ÷ change in price',
    'percentage change in quantity demanded ÷ percentage change in price',
  ],
  sol: 'Es = (ΔQ ÷ Q) ÷ (ΔP ÷ P): the percentage change in quantity supplied divided by the percentage change in price.',
}));
Q('m_es_vertical', mcq({
  t: 5, d: 2, c: 'understanding',
  stem: `This week a small Darjeeling tea garden (imagined) has exactly ${TEA.q0} kg of hand-rolled tea; a 10 per cent rise in price leaves the quantity it offers unchanged. Its elasticity of supply this week is`,
  opts: ['zero: perfectly inelastic supply, a vertical curve', 'infinite: perfectly elastic supply, a horizontal curve', 'one: unitary elastic supply', 'greater than one: relatively elastic supply'],
  sol: `Quantity does not respond at all, so Es = 0 ÷ 10 = ${TEA_ES}: perfectly inelastic, drawn as a vertical supply curve.`,
}));
Q('m_es_horizontal', mcq({
  t: 5, d: 2, c: 'understanding',
  stem: 'A supply curve that is a horizontal straight line shows that',
  opts: ['sellers will supply any quantity at one price and none below it (Es infinite)', 'quantity supplied stays fixed whatever the price (Es zero)', 'quantity supplied changes in the same proportion as price (Es one)', 'supply falls as price rises (Es negative)'],
  sol: 'A horizontal supply curve is perfectly elastic: at the given price any amount is offered, and below it nothing.',
}));
Q('m_line_origin', mcq({
  t: 5, d: 3, c: 'analysis',
  stem: 'Two straight-line supply curves both start from the origin, one steep and one flat. Their elasticities of supply are',
  opts: ['both equal to one at every point', 'greater than one for the flat line and less than one for the steep line', 'less than one for the flat line and greater than one for the steep line', 'zero for the steep line and infinite for the flat line'],
  sol: 'For any straight line from the origin, P ÷ Q equals the reciprocal of its slope, so Es = (ΔQ ÷ ΔP) × (P ÷ Q) = 1 whatever the slope.',
}));
Q('m_line_price_axis', mcq({
  t: 5, d: 3, c: 'application',
  stem: 'An imagined Kanpur workshop\'s supply curve is a straight line which, when extended, meets the price (vertical) axis above the origin. Its elasticity of supply is',
  opts: ['greater than one at every point', 'less than one at every point', 'equal to one at every point', 'zero at every point'],
  sol: 'By the geometric method, a straight supply line meeting the price axis has Es > 1; one through the origin has Es = 1; one meeting the quantity axis has Es < 1.',
}));
Q('m_line_qty_axis', mcq({
  t: 5, d: 3, c: 'application',
  stem: 'A straight supply line for brass lamps from an imagined Moradabad unit, when extended, cuts the quantity (horizontal) axis to the right of the origin. Supply on this line is',
  opts: ['relatively inelastic (Es less than one)', 'relatively elastic (Es greater than one)', 'unitary elastic (Es equal to one)', 'perfectly elastic'],
  sol: 'A straight supply line meeting the quantity axis has Es below one at every point on it.',
}));
Q('n_es_saree', num({
  t: 5, d: 2, c: 'understanding', marks: 2, value: SAREE_ES,
  stem: `An imagined Surat weaver raises her supply of silk sarees from ${SAREE.q0} to ${SAREE.q1} a week when the price rises from ₹${SAREE.p0} to ₹${SAREE.p1}. Calculate her elasticity of supply by the percentage method.`,
  sol: `Step 1: Percentage change in quantity supplied = (${SAREE.q1} − ${SAREE.q0}) ÷ ${SAREE.q0} × 100 = ${pct(SAREE.q0, SAREE.q1)}.\nStep 2: Percentage change in price = (${SAREE.p1} − ${SAREE.p0}) ÷ ${SAREE.p0} × 100 = ${pct(SAREE.p0, SAREE.p1)}.\nStep 3: Es = 30 ÷ 20 = ${SAREE_ES}. Supply is relatively elastic.`,
  scheme: [['Both percentage changes', 1], [`Es = ${SAREE_ES}`, 1]],
}));
Q('n_es_brass', num({
  t: 5, d: 2, c: 'understanding', marks: 1, value: BRASS_ES,
  stem: `An imagined Moradabad unit's monthly supply of brass lamps rises from ${BRASS.q0} to ${BRASS.q1} when the price rises from ₹${BRASS.p0} to ₹${fmtIN(BRASS.p1)}. What is its elasticity of supply?`,
  sol: `Percentage change in quantity = 15 ÷ 120 × 100 = ${pct(BRASS.q0, BRASS.q1)}; percentage change in price = 200 ÷ 800 × 100 = ${pct(BRASS.p0, BRASS.p1)}; Es = 12.5 ÷ 25 = ${BRASS_ES}.`,
}));
Q('n_onion_q1', num({
  t: 5, d: 3, c: 'application', marks: 2, value: ONION_Q1, unit: 'kg',
  stem: `An imagined Nashik onion trader supplies ${fmtIN(ONION.q0)} kg a day at ₹${ONION.p0} a kg. His elasticity of supply is ${ONION.e}. How many kilograms a day will he supply if the price rises to ₹${ONION.p1}?`,
  sol: `Step 1: Percentage rise in price = 4 ÷ 20 × 100 = ${pct(ONION.p0, ONION.p1)}.\nStep 2: Percentage rise in quantity = ${ONION.e} × 20 = 10.\nStep 3: New supply = ${ONION.q0} + 10 per cent of ${ONION.q0} = ${ONION_Q1} kg.`,
  scheme: [['Percentage changes', 1], [`New supply ${ONION_Q1} kg`, 1]],
}));
Q('n_belt_p1', num({
  t: 5, d: 3, c: 'application', marks: 2, value: BELT_P1, unit: '₹',
  stem: `An imagined Kanpur workshop has an elasticity of supply of ${BELT.e} for leather belts. At ₹${BELT.p0} a belt it supplies ${BELT.q0} a week. At what price will it supply ${BELT.q1} belts a week?`,
  sol: `Step 1: Percentage rise in quantity = 60 ÷ 300 × 100 = ${pct(BELT.q0, BELT.q1)}.\nStep 2: Percentage rise in price = 20 ÷ ${BELT.e} = ${BELT_DP}.\nStep 3: New price = ${BELT.p0} + 10 per cent of ${BELT.p0} = ₹${BELT_P1}.`,
  scheme: [['Percentage change in price found', 1], [`New price ₹${BELT_P1}`, 1]],
}));
Q('n_pump', num({
  t: 5, d: 3, c: 'application', marks: 2, value: PUMP_ES,
  stem: `When the price of water pumps falls from ₹${fmtIN(PUMP.p0)} to ₹${fmtIN(PUMP.p1)}, an imagined Coimbatore maker cuts its monthly supply from ${PUMP.q0} to ${PUMP.q1}. Find the elasticity of supply.`,
  sol: `Step 1: Percentage change in quantity = (220 − 250) ÷ 250 × 100 = ${pct(PUMP.q0, PUMP.q1)}.\nStep 2: Percentage change in price = (3600 − 4000) ÷ 4000 × 100 = ${pct(PUMP.p0, PUMP.p1)}.\nStep 3: Es = (−12) ÷ (−10) = ${PUMP_ES}. Supply is relatively elastic.`,
  scheme: [['Percentage changes with signs', 1], [`Es = ${PUMP_ES}`, 1]],
}));
Q('m_mango_unitary', mcq({
  t: 5, d: 2, c: 'application',
  stem: `An imagined Ratnagiri orchard offers ${MANGO.q1} boxes of mangoes a week instead of ${MANGO.q0} when the price per box rises from ₹${MANGO.p0} to ₹${MANGO.p1}. Its supply is`,
  opts: ['unitary elastic', 'relatively elastic', 'relatively inelastic', 'perfectly inelastic'],
  sol: `Quantity rises 40 ÷ 200 = 20 per cent and price rises 100 ÷ 500 = 20 per cent, so Es = ${MANGO_ES}: unitary elastic.`,
}));
Q('ar_origin_lines', ar({
  t: 5, d: 3, c: 'analysis', key: 'a',
  a: 'Every straight-line supply curve that starts from the origin has an elasticity of supply equal to one.',
  r: 'Along such a line, quantity supplied changes in the same proportion as price.',
  sol: 'Both true, and R explains A: on a ray from the origin, Q is a fixed multiple of P, so equal percentage changes give Es = 1.',
}));
Q('ar_slope_alone', ar({
  t: 5, d: 4, c: 'evaluation', key: 'd',
  a: 'A steep straight-line supply curve through the origin is less elastic than a flat one through the origin.',
  r: 'Elasticity of supply depends only on the slope of the supply curve.',
  sol: 'Both false. Every straight line through the origin has Es = 1, whatever its slope, so A is false; and Es depends on slope and on P ÷ Q together, so R is false.',
}));
Q('s_es_formula', short({
  t: 5, d: 1, c: 'recall', marks: 2, wl: S2,
  stem: 'Define elasticity of supply and write its formula by the percentage method.',
  model: '**Elasticity of supply** is the degree of **responsiveness** of the **quantity supplied** of a good to a change in its **own price**. **Es = percentage change in quantity supplied ÷ percentage change in price = (ΔQ ÷ Q) ÷ (ΔP ÷ P)**.',
  sol: 'Definition and formula.',
  scheme: [['Definition', 1], ['Formula', 1]],
}));
Q('s_geometric', short({
  t: 5, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'How does the geometric method tell us the elasticity of a straight-line supply curve from where it meets the axes?',
  model: 'Extend the line to the axes. If it meets the **price axis**, **Es > 1**; if it passes through the **origin**, **Es = 1**; if it meets the **quantity axis**, **Es < 1**. A **horizontal** line is perfectly elastic and a **vertical** line perfectly inelastic.',
  sol: 'Three intercept cases.',
  scheme: [['Price axis and origin cases', 1], ['Quantity axis case', 1]],
}));
Q('s3_es_calc', short({
  t: 5, d: 3, c: 'application', marks: 3, wl: S3,
  stem: `An imagined Moradabad unit raises its monthly supply of brass lamps from ${BRASS.q0} to ${BRASS.q1} when the price goes up from ₹${BRASS.p0} to ₹${fmtIN(BRASS.p1)}. Calculate the elasticity of supply and state its degree, and suggest one reason for this degree.`,
  model: `Percentage change in quantity = 15 ÷ 120 × 100 = **${pct(BRASS.q0, BRASS.q1)}**; percentage change in price = 200 ÷ 800 × 100 = **${pct(BRASS.p0, BRASS.p1)}**; **Es = 12.5 ÷ 25 = ${BRASS_ES}**. Supply is **relatively inelastic**. Hand-beaten brass needs **skilled artisans** who cannot be hired quickly, so output responds slowly to price.`,
  sol: 'Calculation, degree and a reason.',
  scheme: [['Percentage changes', 1], [`Es = ${BRASS_ES}`, 1], ['Degree with a reason', 1]],
}));
Q('s3_three_lines', short({
  t: 5, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Three straight supply lines are drawn with price on the vertical axis. Line A, extended, meets the price axis; line B starts at the origin; line C, extended, meets the quantity axis. Identify the elasticity of supply on each and justify one of your answers.',
  model: '**Line A:** **Es > 1** (relatively elastic). **Line B:** **Es = 1** (unitary). **Line C:** **Es < 1** (relatively inelastic). **Justification for B:** on a line from the origin, Q is a fixed multiple of P, so any percentage change in price brings the **same percentage change** in quantity supplied.',
  sol: 'Three identifications and one justification.',
  scheme: [['Line A', 1], ['Lines B and C', 1], ['One justification', 1]],
}));
Q('s3_es_find_price', short({
  t: 5, d: 4, c: 'application', marks: 3, wl: S3,
  stem: `An imagined Kanpur workshop's elasticity of supply of leather belts is ${BELT.e}. It supplies ${BELT.q0} belts a week at ₹${BELT.p0}. Find the price at which it will supply ${BELT.q1} belts, showing your working.`,
  model: `Percentage rise in quantity = 60 ÷ 300 × 100 = **${pct(BELT.q0, BELT.q1)}**. Since Es = % change in quantity ÷ % change in price, the % change in price = 20 ÷ ${BELT.e} = **${BELT_DP}**. New price = ₹${BELT.p0} + 10 per cent of ₹${BELT.p0} = **₹${BELT_P1}**.`,
  sol: 'Rearranged formula and new price.',
  scheme: [['Percentage rise in quantity', 1], ['Percentage rise in price', 1], [`New price ₹${BELT_P1}`, 1]],
}));
Q('l_es_numericals', long({
  t: 5, d: 4, c: 'application', marks: 5, wl: L5,
  stem: `(a) An imagined Surat weaver supplies ${SAREE.q0} silk sarees a week at ₹${SAREE.p0} and ${SAREE.q1} at ₹${SAREE.p1}. Calculate her elasticity of supply and state its degree. [2]\n(b) An imagined Nashik onion trader has an elasticity of supply of ${ONION.e} and supplies ${fmtIN(ONION.q0)} kg a day at ₹${ONION.p0}. Find his supply at ₹${ONION.p1} a kg, and explain why such a trader's supply might be inelastic. [3]`,
  model: `(a) Quantity rises 12 ÷ 40 × 100 = **${pct(SAREE.q0, SAREE.q1)} per cent**; price rises 100 ÷ 500 × 100 = **${pct(SAREE.p0, SAREE.p1)} per cent**; **Es = 30 ÷ 20 = ${SAREE_ES}**, so supply is **relatively elastic**.\n(b) Price rises 4 ÷ 20 × 100 = **20 per cent**, so quantity rises ${ONION.e} × 20 = **10 per cent**: new supply = 1,000 + 100 = **${fmtIN(ONION_Q1)} kg**. Supply is inelastic because onions come from a crop already **harvested**; the trader can release only what he has in **storage**, and fresh output cannot be raised until the **next season**.`,
  sol: 'Two percentage-method calculations and a reason for inelastic supply.',
  scheme: [['(a) percentage changes', 1], [`(a) Es = ${SAREE_ES} and degree`, 1], ['(b) percentage change in quantity', 1], [`(b) new supply ${ONION_Q1} kg`, 1], ['(b) reason for inelastic supply', 1]],
}));
Q('l_degrees_geo', long({
  t: 5, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Explain the five degrees of elasticity of supply with described diagrams, and state how the geometric method identifies three of them from straight supply lines.',
  model: '1. **Perfectly elastic (Es = ∞):** a **horizontal** line; any quantity at one price.\n2. **Perfectly inelastic (Es = 0):** a **vertical** line; quantity fixed whatever the price.\n3. **Unitary (Es = 1):** quantity changes in the **same proportion** as price.\n4. **Relatively elastic (Es > 1):** quantity changes **more** than in proportion.\n5. **Relatively inelastic (Es < 1):** quantity changes **less** than in proportion.\n**Geometric method:** a straight line through the **origin** gives Es = 1; one meeting the **price axis** gives Es > 1; one meeting the **quantity axis** gives Es < 1.',
  sol: 'Five degrees with diagrams; three intercept cases.',
  scheme: [['Perfectly elastic and inelastic', 1], ['Unitary', 1], ['Relatively elastic and inelastic', 1], ['Origin case', 1], ['Price-axis and quantity-axis cases', 1]],
}));
Q('l_stock_law', long({
  t: [1, 3], d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: '(a) Why can supply never be greater than stock in the short period, and why may it be much smaller? [2]\n(b) A trader in an imagined Guntur chilli market expects chilli prices to rise sharply next month. Explain how this expectation can make his supply behave against the law of supply this month, and describe it on a diagram. [3]',
  model: '(a) Supply is drawn from the **stock** available in the period, so it can at most **equal** it. It may be much **smaller** when the good is **durable** and sellers **hold back** part of the stock for a better price.\n(b) Chillies can be **stored**, so the trader **withholds** stock now to sell at the higher expected price. Even if this month\'s price rises a little, he offers **less**, not more: quantity supplied moves **opposite** to the current price, an **exception** to the law. On a diagram with price on the y-axis, his offers this month fall back to the **left** as the price rises, instead of moving up an upward-sloping curve.',
  sol: 'Stock limit and holding back; expectations as an exception.',
  scheme: [['(a) supply limited by stock', 1], ['(a) holding back durable goods', 1], ['(b) withholding explained', 1], ['(b) opposite to the law', 1], ['(b) diagram described', 1]],
}));

// ================================================================ ISC paper-style 4-mark and 8-mark items (bank only)
Q('q4_two_weavers', short({
  t: [4, 5], d: 3, c: 'application', marks: 4, wl: S4,
  stem: `Answer both parts about two imagined Surat weavers. [2 + 2]\n\n(i) When the silk-saree price rose from ₹${SAREE.p0} to ₹${SAREE.p1}, Meera raised her weekly supply from ${SAREE.q0} to ${SAREE.q1}. Calculate her elasticity of supply.\n(ii) Her neighbour Kavita bought a faster loom and now offers more sarees at every price. Name this change and say how it differs from Meera's change.`,
  model: `(i) Quantity rises **30 per cent** (12 ÷ 40) and price **20 per cent** (100 ÷ 500), so **Es = ${SAREE_ES}**: relatively elastic.\n(ii) Kavita shows an **increase in supply**: her whole curve **shifts right** because of **better technology**. Meera's change is an **extension**, a **movement along** her existing curve caused only by the **higher price**.`,
  sol: 'Percentage-method Es; increase versus extension.',
  scheme: [['(i) percentage changes', 1], [`(i) Es = ${SAREE_ES}`, 1], ['(ii) increase named with cause', 1], ['(ii) contrast with extension', 1]],
}));
Q('q4_stock_fish_wood', short({
  t: 1, d: 3, c: 'analysis', marks: 4, wl: S4,
  stem: `Answer both parts. [2 + 2]\n\n(i) A Kochi fisherman (imagined) holds a stock of ${FISH.stock} kg of fish and supplies ${FISH.supply} kg; a Saharanpur dealer (imagined) holds ${WOOD.stock} carved boxes and supplies ${WOOD.supply}. Explain the difference.\n(ii) Suggest what the dealer might do if he expected the price of boxes to fall next month, and why.`,
  model: `(i) Fish is **perishable**, so the fisherman must sell almost his **entire stock** today: supply equals stock. Boxes are **durable**, so the dealer can **store** them and offers only ${WOOD.supply}, holding back **${WOOD_HELD}** for a better price.\n(ii) Expecting a **fall** in price, he would **release more** of his stock **now**, since waiting would bring a lower price. His current supply would **rise** towards his stock.`,
  sol: 'Perishable versus durable; expectations of a price fall.',
  scheme: [['(i) perishable fish', 1], ['(i) durable boxes held back', 1], ['(ii) releases more now', 1], ['(ii) reason', 1]],
}));
Q('q4_geo_identify', short({
  t: 5, d: 3, c: 'analysis', marks: 4, wl: S4,
  stem: 'Answer both parts. [2 + 2]\n\n(i) A straight supply line for cricket bats from an imagined Jalandhar factory, when extended, meets the price axis. State its elasticity of supply and justify your answer.\n(ii) The supply curve of seats for a cricket match in an imagined stadium is vertical. Explain its elasticity and why it has this shape.',
  model: '(i) **Es is greater than one** (relatively elastic). By the **geometric method**, any straight supply line meeting the **price axis** has a quantity response **more than proportional** to the price change, since its price-to-quantity ratio exceeds the inverse of its slope.\n(ii) **Es = 0** (perfectly inelastic). The stadium has a **fixed number of seats**, so however high the ticket price goes, no more seats can be offered for that match.',
  sol: 'Geometric case and a fixed-quantity case.',
  scheme: [['(i) Es greater than one', 1], ['(i) justification', 1], ['(ii) Es zero', 1], ['(ii) reason: fixed seats', 1]],
}));
Q('l8_supply_full', long({
  t: [2, 4], d: 4, c: 'analysis', marks: 8, wl: L8,
  stem: 'Answer both parts. [4 + 4]\n\n(i) Explain any four determinants of supply other than the good\'s own price, using an imagined Tiruppur garment exporter.\n(ii) With described diagrams, distinguish between an increase in supply and an extension of supply, and say which of your four determinants could cause an increase.',
  model: '(i) **Input prices:** a fall in the price of cotton yarn cuts cost and raises supply. **Technology:** automatic cutting machines lower cost per shirt and raise supply. **Taxes and subsidies:** an export subsidy raises supply; a new tax reduces it. **Related goods:** if knitted T-shirts made on the same lines fetch more, resources move to them and shirt supply falls.\n(ii) An **extension** is a **movement up** one supply curve caused by a **higher own price**: from point A to point B on S1. An **increase** is a **rightward shift** from S1 to S2: **more is offered at every price** because a **non-price factor** has improved. Cheaper yarn, better technology or a subsidy could each cause an **increase**; a higher price of a related good would instead cause a decrease.',
  sol: 'Four non-price determinants; increase versus extension with diagrams.',
  scheme: [['Input prices', 1], ['Technology', 1], ['Taxes or subsidies', 1], ['Related goods', 1], ['Extension described', 1], ['Increase described', 1], ['Diagrams contrasted', 1], ['Determinants causing an increase', 1]],
}));
Q('l8_es_full', long({
  t: [3, 5], d: 4, c: 'evaluation', marks: 8, wl: L8,
  stem: `Answer both parts. [4 + 4]\n\n(i) An imagined Coimbatore maker cut its monthly supply of water pumps from ${PUMP.q0} to ${PUMP.q1} when the price fell from ₹${fmtIN(PUMP.p0)} to ₹${fmtIN(PUMP.p1)}. Calculate its elasticity of supply, state the degree, and describe where its straight supply line would meet the axes.\n(ii) Evaluate whether the market supply of pumps in the region would be more or less elastic than that of a single maker over a period of two years, giving reasons.`,
  model: `(i) Quantity falls 30 ÷ 250 × 100 = **12 per cent**; price falls 400 ÷ 4,000 × 100 = **10 per cent**; **Es = 12 ÷ 10 = ${PUMP_ES}**, so supply is **relatively elastic**. By the geometric method, a straight line with Es above one, when extended, meets the **price axis** above the origin.\n(ii) Over two years market supply would tend to be **more elastic**. Existing makers can **add machines and workers**, so output responds more fully to price. **New firms** can **enter** when prices are high and weak firms **leave** when prices fall, adding to the response. Against this, if a key input such as **specialised castings** were scarce, the response could stay **limited**. On balance the longer period and the entry of firms make market supply more responsive than one maker's supply in a single month.`,
  sol: 'Percentage-method Es with geometric placement; reasoned evaluation over time.',
  scheme: [['(i) percentage changes', 1], [`(i) Es = ${PUMP_ES}`, 1], ['(i) degree', 1], ['(i) line meets the price axis', 1], ['(ii) expansion of existing firms', 1], ['(ii) entry and exit of firms', 1], ['(ii) limiting factor', 1], ['(ii) balanced judgement', 1]],
}));

// ================================================================ case-based
Q('cb_hosiery', caseQ({
  t: 3, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the imagined case about three Ludhiana knitting units and answer the questions that follow. *(Imagined businesses and figures, written by SOYL for practice.)*',
  passage: `**Winter season supply of sock packets, an imagined Ludhiana hosiery lane**\n\n${hoseTable()}\n\nUnit C, the newest, does not find it worthwhile to knit at all at ₹100 a packet. The lane's association prepares a market supply schedule each season to discuss prices with wholesalers.`,
  parts: [
    child('a', num({ t: 3, d: 2, c: 'application', marks: 1, value: HOSE_MKT[1], unit: 'packets', stem: 'What is the market supply of the lane at ₹200 a packet?', sol: `Add the three units at ₹200: 20 + 15 + 10 = ${HOSE_MKT[1]} packets.` })),
    child('b', short({ t: 3, d: 2, c: 'understanding', marks: 1, stem: 'Why does Unit C supply nothing at ₹100 a packet?', model: 'At ₹100 the price does **not cover its cost** of knitting a packet, so supplying would bring a **loss**; it starts supplying only at a higher price.', sol: 'Price below cost.', scheme: [['Price does not cover cost', 1]] })),
    child('c', short({ t: [3, 5], d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Calculate the elasticity of the lane\'s market supply when the price rises from ₹200 to ₹300, and state its degree.', model: `Quantity rises from ${HOSE_MKT[1]} to ${HOSE_MKT[2]}, i.e. 30 ÷ 45 × 100 = **66.667 per cent**; price rises **50 per cent**; **Es = 66.667 ÷ 50 = ${HOSE_ES}**: **relatively elastic**.`, sol: `Es = ${HOSE_ES}.`, scheme: [['Percentage changes', 1], ['Es and degree', 1]] }), [
      short({ t: 3, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Explain how the market supply curve of the lane is related to the three units\' supply curves.', model: 'The market curve is the **horizontal sum** of the three curves: at each price, their **quantities are added**. It therefore lies to the **right** of every unit\'s curve and also slopes **upward**.', sol: 'Horizontal summation.', scheme: [['Horizontal sum at each price', 1], ['Position and slope', 1]] }),
    ]),
  ],
}));
Q('cb_saree', caseQ({
  t: [4, 5], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the imagined diary of a Surat weaver and answer the questions that follow. *(Written by SOYL for practice; the weaver and figures are imagined.)*',
  passage: `**From Meera's weaving diary, Surat (imagined)**\n\n*March:* Silk sarees now fetch ₹${SAREE.p1} instead of ₹${SAREE.p0}. I have pushed my loom harder and finish ${SAREE.q1} sarees a week instead of ${SAREE.q0}.\n\n*June:* Yarn has become much cheaper. Even at the old price of ₹${SAREE.p0} I can now offer ${sareeS2(SAREE.p0)} sarees a week.\n\n*September:* Two neighbours have shut their looms to work in a new factory, and the lane's total saree supply has fallen.`,
  parts: [
    child('a', num({ t: 5, d: 2, c: 'application', marks: 1, value: SAREE_ES, stem: 'Calculate Meera\'s elasticity of supply from the March entry.', sol: `Quantity rises 12 ÷ 40 × 100 = 30 per cent; price rises 100 ÷ 500 × 100 = 20 per cent; Es = 30 ÷ 20 = ${SAREE_ES}.` })),
    child('b', short({ t: 4, d: 2, c: 'understanding', marks: 1, stem: 'Name the change in supply described in the June entry.', model: 'An **increase in supply**: more sarees at the **same price**, so her supply curve **shifts right** because of cheaper yarn.', sol: 'Increase, rightward shift.', scheme: [['Increase in supply', 1]] })),
    child('c', short({ t: 4, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Explain the change in the lane\'s market supply in September and show how it would appear on a diagram.', model: 'Fewer weavers means fewer quantities to add at each price, so **market supply decreases**: the market curve **shifts left**. It is caused by the **number of sellers**, not by the saree price.', sol: 'Decrease from fewer firms.', scheme: [['Decrease in market supply', 1], ['Leftward shift with cause', 1]] }), [
      short({ t: 4, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Distinguish between the changes in the March and June entries.', model: 'March shows an **extension**: a **movement up** the same curve caused by a **higher saree price**. June shows an **increase**: a **rightward shift** of the curve caused by **cheaper yarn**, with more offered at the same price.', sol: 'Extension versus increase.', scheme: [['March: extension', 1], ['June: increase', 1]] }),
    ]),
  ],
}));
Q('cb_three_sellers', caseQ({
  t: [1, 5], d: 4, c: 'evaluation', origin: 'soyl-original',
  stem: 'Read the imagined report from a weekly haat in Odisha and answer the questions that follow. *(Written by SOYL for practice.)*',
  passage: '**Notes from the Sunday haat, an imagined village near Sambalpur**\n\nWhen the price of fresh river fish rose by a fifth, the fishermen could not land any more that morning and sold every kilogram they had brought. The potter sold a few more pots than usual and kept the rest of his stack in his cart for the next haat. A clothes trader, who can bring extra stock from a warehouse in town within an hour, sold twice as many cotton dhotis.',
  parts: [
    child('a', short({ t: 5, d: 2, c: 'understanding', marks: 1, stem: 'What is the elasticity of the fishermen\'s supply that morning?', model: '**Zero (perfectly inelastic)**: the quantity offered did not change when the price rose.', sol: 'No change in quantity.', scheme: [['Es = 0', 1]] })),
    child('b', short({ t: 1, d: 2, c: 'understanding', marks: 1, stem: 'Distinguish between the potter\'s stock and his supply at the haat.', model: 'His **stock** is the whole stack of pots; his **supply** is only the number he **offers for sale** at the day\'s price, with the rest kept back.', sol: 'Stock versus supply.', scheme: [['Stock and supply distinguished', 1]] })),
    child('c', short({ t: 5, d: 4, c: 'evaluation', marks: 2, stem: '**Either** (i): Rank the three sellers from the least to the most elastic supply and justify your ranking.', model: '**Fishermen (Es = 0)** cannot add to the morning\'s catch; the **potter** adds a little from his stack, so supply is **relatively inelastic**; the **clothes trader** can bring stock quickly, so supply is **relatively elastic**. Order: **fishermen, potter, clothes trader**.', sol: 'Ranking by how quickly quantity can respond.', scheme: [['Correct ranking', 1], ['Justification', 1]] }), [
      short({ t: 5, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Explain why the clothes trader\'s supply responds strongly to price.', model: 'He can obtain **extra stock quickly** from a nearby warehouse and dhotis are **durable**, so a higher price calls out a **more than proportionate** rise in quantity: supply is **relatively elastic**.', sol: 'Quick access to stock and durability.', scheme: [['Quick access to stock', 1], ['Relatively elastic concluded', 1]] }),
    ]),
  ],
}));
