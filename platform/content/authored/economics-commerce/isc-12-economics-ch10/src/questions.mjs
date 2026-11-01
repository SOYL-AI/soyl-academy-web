// ISC 12 Economics, ch10 Market Forms and Equilibrium of a Firm under Perfect Competition — question bank.
// Every firm, market, town, person and figure is imagined by SOYL; no real company is named and no textbook example,
// exercise, specimen-paper or past-paper item is reused (D-036). Every number in a stem, key or worked solution is
// computed here and asserted, so stems, keys and solutions cannot drift apart.
// Removed topics (ISC 2027): the diagram of long-run equilibrium under perfect competition (explained in words only) and
// monopsony beyond its meaning.
// Convention: the profit-maximising output is where MC = MR (= price for a price taker) and MC is rising; the firm
// produces in the short run only if price covers minimum AVC.
import { Q, mcq, ar, tf, fb, match, ord, num, short, long, caseQ, child } from '../../isc-12-economics-ch01/src/lib.mjs';

const S2 = [30, 50];
const S3 = [50, 80];
const S4 = [70, 110];
const L5 = [100, 150];
const L8 = [150, 220];

export const r2 = (x) => Math.round(x * 100) / 100;
const assert = (cond, msg) => { if (!cond) throw new Error(`questions.mjs: ${msg}`); };
const md = (rows, head) => `| ${head.join(' | ')} |\n|${head.map(() => '---').join('|')}|\n${rows.map((r) => `| ${r.join(' | ')} |`).join('\n')}`;

// ---------------------------------------------------------------- (1) continuous cost curves for the diagrams
// An imagined Rajkot brass-fittings unit selling in a perfectly competitive market; Q in hundreds of fittings a day,
// costs in ₹ hundred. TFC = 72, TVC = Q³ − 10Q² + 40Q.
export const FIRM = { tfc: 72 };
export const tvc = (q) => q ** 3 - 10 * q ** 2 + 40 * q;
export const avc = (q) => q * q - 10 * q + 40;
export const ac = (q) => avc(q) + FIRM.tfc / q;
export const mc = (q) => 3 * q * q - 20 * q + 40;
export const tc = (q) => tvc(q) + FIRM.tfc;
/** Output on the rising part of MC where MC = p. */
export const qAt = (p) => (20 + Math.sqrt(400 - 12 * (40 - p))) / 6;
// Minimum AVC at Q = 5 (AVC = MC = 15): shut-down point. Minimum AC at Q = 6 (AC = MC = 28): break-even point.
export const SHUT = { q: 5, p: avc(5) };
export const BREAK = { q: 6, p: ac(6) };
assert(SHUT.p === 15 && mc(5) === 15, 'shut-down point');
assert(BREAK.p === 28 && mc(6) === 28 && tc(6) === 168, 'break-even point');
for (const q of [4.9, 5.1]) assert(avc(q) > SHUT.p, 'AVC minimum at 5');
for (const q of [5.9, 6.1]) assert(ac(q) > BREAK.p, 'AC minimum at 6');
// Supernormal profit at P = 47: Q = 7, TR = 329, TC = 205, profit = 124.
export const HIGH = { p: 47 };
HIGH.q = qAt(HIGH.p);
HIGH.tr = HIGH.p * HIGH.q;
HIGH.tc = tc(HIGH.q);
HIGH.ac = ac(HIGH.q);
HIGH.profit = HIGH.tr - HIGH.tc;
assert(HIGH.q === 7 && HIGH.tr === 329 && HIGH.tc === 205 && HIGH.profit === 124, 'profit case');
assert(r2(HIGH.ac) === 29.29, 'AC at 7');
// Loss but keep producing at P = 20: Q on the rising MC, AVC < P < AC.
export const LOW = { p: 20 };
LOW.q = qAt(LOW.p);
LOW.ac = ac(LOW.q);
LOW.avc = avc(LOW.q);
LOW.loss = (LOW.ac - LOW.p) * LOW.q;
assert(Math.abs(mc(LOW.q) - LOW.p) < 1e-9 && LOW.avc < LOW.p && LOW.p < LOW.ac && LOW.loss < FIRM.tfc, 'loss case');
assert(r2(LOW.q) === 5.44, 'loss output');

// ---------------------------------------------------------------- (2) a cost schedule for numericals
// An imagined Erode turmeric-powder unit in a competitive market: TFC ₹36 a day; MC of packets (hundreds) 1..6.
export const TURM = { tfc: 36, mc: [24, 18, 15, 18, 24, 33] };
TURM.tvc = TURM.mc.reduce((a, m) => [...a, a[a.length - 1] + m], [0]);
TURM.tc = TURM.tvc.map((v) => v + TURM.tfc);
TURM.avc = TURM.tvc.map((v, q) => (q ? r2(v / q) : null));
TURM.ac = TURM.tc.map((v, q) => (q ? r2(v / q) : null));
assert(TURM.tvc.join() === '0,24,42,57,75,99,132', 'turmeric tvc');
assert(TURM.tc.join() === '36,60,78,93,111,135,168', 'turmeric tc');
assert(TURM.avc.slice(1).join() === '24,21,19,18.75,19.8,22', 'turmeric avc');
assert(TURM.ac.slice(1).join() === '60,39,31,27.75,27,28', 'turmeric ac');
/** Best output at price p: MC = p with MC rising (the last unit whose MC ≤ p once MC is rising), and its profit. */
export function bestAt(p) {
  let best = 0;
  for (let q = 1; q <= TURM.mc.length; q++) {
    const rising = q === 1 || TURM.mc[q - 1] >= TURM.mc[q - 2];
    if (TURM.mc[q - 1] <= p && rising) best = q;
  }
  const profit = p * best - TURM.tc[best];
  return { q: best, profit };
}
export const T33 = bestAt(33);
export const T24 = bestAt(24);
export const T18 = { produce: bestAt(18), shut: -TURM.tfc };
assert(T33.q === 6 && T33.profit === 30, 'price 33');
assert(T24.q === 5 && T24.profit === -15, 'price 24');
assert(T18.produce.q === 4 && T18.produce.profit === -39 && T18.shut === -36, 'price 18');
// brute force: the chosen outputs maximise profit (ties at 33 between 5 and 6 are resolved at MC = MR)
for (const [p, q] of [[33, 6], [24, 5]]) {
  const prof = TURM.tc.map((c, k) => p * k - c);
  assert(prof[q] === Math.max(...prof), `brute force at ${p}`);
}
export const TURM_MIN_AVC = Math.min(...TURM.avc.slice(1));
assert(TURM_MIN_AVC === 18.75, 'turmeric min avc');
export const turmTable = () => md(TURM.tc.map((c, q) => [String(q), String(c)]), ['Output (hundred packets)', 'TC (₹)']);
export const turmMcTable = () => md(TURM.mc.map((m, i) => [String(i + 1), String(m)]), ['Output (hundred packets)', 'MC (₹)']);

// (3) TR from a price taker: an imagined Jalgaon banana grower sells 1,200 dozen at ₹30 a dozen.
export const BAN = { p: 30, q: 1200 };
export const BAN_TR = BAN.p * BAN.q;
assert(BAN_TR === 36000, 'banana TR');

// ================================================================ t01 Perfect competition: features
Q('m_pc_mandi', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'At an imagined wheat mandi near Hisar, thousands of growers sell grain of the same grade and none can change the ruling price by selling more or less. This market is closest to',
  opts: ['perfect competition', 'monopoly', 'oligopoly', 'monopolistic competition'],
  sol: 'Very many sellers, an identical product and no single seller able to affect price are the marks of perfect competition. Monopoly has one seller, oligopoly a few interdependent sellers, and monopolistic competition differentiated products.',
}));
Q('m_price_taker', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'A firm under perfect competition is called a price taker because',
  opts: ['its output is too small a part of the market to affect the price set by industry demand and supply', 'the government fixes the price of its product', 'it must charge the lowest price among its rivals', 'it sells only to a single large buyer'],
  sol: 'Price is set by market (industry) demand and supply; each firm\'s output is tiny compared with the market, so it accepts that price. The government and a single buyer play no part in the definition.',
}));
Q('m_pc_ar_mr', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'For a firm selling at a market-given price of ₹47 under perfect competition, which statement about its revenue curves is correct?',
  opts: ['AR = MR = ₹47, a horizontal line', 'AR is ₹47 but MR is below it and falling', 'MR is ₹47 but AR rises with output', 'AR and MR both slope downward from ₹47'],
  sol: 'Every extra unit sells at the same ₹47, so marginal revenue equals the price and so does average revenue; both are one horizontal line at the market price.',
}));
Q('m_homogeneous_role', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: 'Buyers at an imagined cotton market in Akola treat every seller\'s bales of the same grade as identical. Which consequence of this feature is most direct?',
  opts: ['No seller can charge more than others without losing all buyers', 'Every seller must spend heavily on advertising', 'New sellers cannot enter the market', 'Sellers watch and react to each other\'s prices'],
  sol: 'With a homogeneous product a buyer has no reason to pay any seller more, so a higher price loses all custom: the firm must accept the market price. Heavy advertising, entry barriers and mutual reactions belong to other market forms.',
}));
Q('m_entry_exit', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Free entry and exit under perfect competition matter mainly because they',
  opts: ['remove supernormal profit and losses in the long run', 'allow each firm to set its own price', 'make the product differentiated', 'let the firm earn supernormal profit for ever'],
  sol: 'If firms earn supernormal profit, new firms enter and price falls; if they make losses, some leave and price rises. Either way, in the long run only normal profit remains.',
}));
Q('ar_pc_horizontal', ar({
  t: 1, d: 3, c: 'analysis', key: 'a',
  a: 'The demand curve facing a single firm under perfect competition is perfectly elastic.',
  r: 'The firm can sell any quantity it wishes at the ruling market price, but nothing at all at a higher price.',
  sol: 'Both are true, and R explains A: since buyers will pay only the market price and will take any amount the small firm offers at it, the firm\'s demand curve is horizontal, that is, perfectly elastic.',
}));
Q('tf_pc_knowledge', tf({
  t: 1, d: 1, c: 'understanding', ans: true,
  stem: 'True or false? Perfect knowledge of market prices by buyers and sellers helps keep one uniform price throughout a perfectly competitive market.',
  sol: 'If everyone knows the ruling price, no buyer pays more and no seller accepts less, so a single price prevails.',
}));
Q('fb_price_taker', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'Under perfect competition the price is fixed by the industry, and each firm is a price ___.',
  acc: [['taker']],
  sol: 'The industry sets the price; the firm is a price taker.',
}));
Q('n_banana_tr', num({
  t: 1, d: 1, c: 'understanding', marks: 1, value: BAN_TR, unit: '₹',
  stem: `An imagined Jalgaon banana grower in a perfectly competitive market sells ${BAN.q.toLocaleString('en-IN')} dozen at the market price of ₹${BAN.p} a dozen. What is his total revenue in ₹?`,
  sol: `TR = P × Q = ${BAN.p} × ${BAN.q} = ${BAN_TR}. So ₹${BAN_TR.toLocaleString('en-IN')}.`,
}));
Q('s_pc_two_features', short({
  t: 1, d: 1, c: 'understanding', marks: 2, wl: S2,
  stem: 'Explain any two features of perfect competition, using an imagined onion market at Lasalgaon as your example.',
  model: '1. **Very many sellers and buyers:** thousands of Lasalgaon growers each sell a **tiny share**, so none can move the price.\n2. **Homogeneous product:** onions of a grade are **identical**, so buyers will not pay one grower more than another.',
  sol: 'Two features linked to the onion market.',
  scheme: [['First feature explained', 1], ['Second feature explained', 1]],
}));
Q('s_why_no_selling_cost', short({
  t: 1, d: 2, c: 'analysis', marks: 2, wl: S2,
  stem: 'Why would a grower at an imagined Hisar wheat mandi gain nothing by advertising his grain? Answer with reference to perfect competition.',
  model: 'His grain is **identical** to everyone else\'s, buyers already have **perfect knowledge** of the price, and he can sell **all he wants** at the ruling price. Advertising would only **add to cost** without raising his price or sales.',
  sol: 'Homogeneous product, perfect knowledge and unlimited sales at the market price.',
  scheme: [['Identical product and perfect knowledge', 1], ['Can sell any amount anyway; cost only', 1]],
}));
Q('s3_pc_features', short({
  t: 1, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain three features of perfect competition and show how each one makes the firm a price taker.',
  model: '1. **Large number of sellers:** each firm\'s output is a **negligible** part of market supply, so changing it cannot shift the price.\n2. **Homogeneous product:** buyers see no difference between firms, so a firm charging more **loses all buyers**.\n3. **Perfect knowledge:** buyers know the ruling price everywhere, so **no seller** can charge above it unnoticed. Together these leave the firm only to **accept** the market price.',
  sol: 'Three features, each linked to price taking.',
  scheme: [['Many sellers linked to price taking', 1], ['Homogeneous product linked', 1], ['Perfect knowledge linked', 1]],
}));

// ================================================================ t02 Monopoly and monopolistic competition
Q('m_monopoly_island', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'An imagined island district has one ferry company, licensed by law as the only carrier to the mainland, with no other way to cross. Its market form is',
  opts: ['monopoly', 'perfect competition', 'monopolistic competition', 'monopsony'],
  sol: 'A single seller, no close substitute and a legal barrier to entry make it a monopoly. Monopsony means a single buyer, not a single seller.',
}));
Q('m_monop_comp_tailors', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'An imagined Ludhiana market has over two hundred knitwear shops; each sells sweaters with its own designs and label, and anyone can open a new shop. This is an example of',
  opts: ['monopolistic competition', 'oligopoly', 'perfect competition', 'monopoly'],
  sol: 'Many sellers, free entry and differentiated products are the marks of monopolistic competition. Perfect competition needs identical products; oligopoly has only a few sellers.',
}));
Q('m_monopoly_barrier', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Which of the following helps a monopolist keep supernormal profit even in the long run?',
  opts: ['Barriers that stop new firms from entering', 'A perfectly elastic demand curve', 'A large number of rival sellers', 'Perfect knowledge among buyers'],
  sol: 'Barriers to entry (licences, patents, control of a key input, huge set-up cost) keep rivals out, so profit is not competed away. The other options describe competitive conditions.',
}));
Q('m_selling_cost', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Spending by an imagined Kanpur shoe-maker on hoardings and free gifts to show its brand is better than rivals\' brands is an example of selling costs. Such costs are most typical of',
  opts: ['monopolistic competition', 'perfect competition', 'a pure monopoly with no substitutes', 'a monopsony'],
  sol: 'With differentiated products, firms spend on advertising to persuade buyers their brand is different and better. Under perfect competition products are identical, so there is no point in selling costs.',
}));
Q('m_monop_demand', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'Compared with a monopolist\'s demand curve, the demand curve of a firm under monopolistic competition is',
  opts: ['more elastic, because each brand has many close substitutes', 'less elastic, because brand loyalty is total', 'horizontal, because the product is homogeneous', 'vertical, because the firm fixes output'],
  sol: 'Both slope downward, but a monopolistically competitive firm faces many close substitutes, so a price rise loses more buyers: its demand is more elastic. A monopolist has no close substitutes.',
}));
Q('ar_price_maker', ar({
  t: 2, d: 3, c: 'analysis', key: 'a',
  a: 'A monopolist is a price maker.',
  r: 'As the sole seller of a product with no close substitutes, the monopolist faces the whole market demand curve and can choose a price on it.',
  sol: 'Both are true, and R explains A: facing the downward-sloping market demand, the monopolist can fix the price (and sell what is demanded at it) instead of accepting a given price.',
}));
Q('ar_monop_comp_entry', ar({
  t: 2, d: 3, c: 'analysis', key: 'c',
  a: 'Firms under monopolistic competition have some control over the price of their own product.',
  r: 'Entry of new firms into monopolistic competition is blocked by law.',
  sol: 'A is true: product differentiation gives each firm a small, loyal group of buyers and some price-setting power. R is false: entry and exit are free under monopolistic competition.',
}));
Q('tf_monopoly_discrim', tf({
  t: 2, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? A monopolist may be able to charge different prices to different groups of buyers for the same product.',
  sol: 'With no rivals to undercut it, a monopolist can practise price discrimination when buyers can be separated and cannot resell, for example charging different rates to different classes of users.',
}));
Q('mt_features_forms', match({
  t: [1, 2, 3], d: 2, c: 'understanding',
  stem: 'Match each feature with the market form in which it is the defining mark.',
  pairs: [
    ['Identical product sold by very many firms', 'Perfect competition'],
    ['Single seller, no close substitutes', 'Monopoly'],
    ['Many sellers of differentiated brands', 'Monopolistic competition'],
    ['A few sellers who react to each other', 'Oligopoly'],
  ],
  sol: 'Homogeneous product with many firms marks perfect competition; one seller marks monopoly; differentiated products with many sellers mark monopolistic competition; interdependence among a few sellers marks oligopoly.',
}));
Q('s_monopoly_two', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State two features of monopoly and give an imagined Indian example for each.',
  model: '1. **Single seller with no close substitutes:** an imagined state power utility is the only supplier of electricity in its area.\n2. **Barriers to entry:** a licence or patent keeps rivals out, as when an imagined firm holds the only patent for a new seed.',
  sol: 'Two features, each with an example.',
  scheme: [['First feature with example', 1], ['Second feature with example', 1]],
}));
Q('s_product_diff', short({
  t: 2, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'What is product differentiation? Show how an imagined Kolkata sweet shop might differentiate its rasgullas from those of the shops on the same street.',
  model: '**Product differentiation** means making a product **appear different** from rivals\' close substitutes. The Kolkata shop could use a **distinct recipe and flavour**, **attractive branded boxes** and a **name** buyers remember, so some buyers prefer its rasgullas even at a slightly higher price.',
  sol: 'Meaning plus specific ways of differentiating.',
  scheme: [['Meaning', 1], ['Specific ways for the sweet shop', 1]],
}));
Q('s3_monop_vs_mc', short({
  t: 2, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Distinguish between monopoly and monopolistic competition on the basis of number of sellers, nature of the product and entry of new firms.',
  model: '1. **Sellers:** monopoly has a **single** seller; monopolistic competition has **many** sellers.\n2. **Product:** a monopolist\'s product has **no close substitute**; under monopolistic competition products are **close substitutes** made different by brand, design or packing.\n3. **Entry:** monopoly is protected by **strong barriers**; under monopolistic competition **entry and exit are free**, so supernormal profit tends to disappear in the long run.',
  sol: 'Three bases, both forms on each.',
  scheme: [['Number of sellers', 1], ['Nature of the product', 1], ['Entry and exit', 1]],
}));
Q('s3_monop_comp_features', short({
  t: 2, d: 2, c: 'application', marks: 3, wl: S3,
  stem: 'Using the imagined knitwear market of Ludhiana with over two hundred branded shops, explain three features of monopolistic competition.',
  model: '1. **Many sellers:** over two hundred shops compete, so no one dominates the market.\n2. **Product differentiation:** each shop\'s sweaters carry **its own designs and label**, so buyers see them as close but **not perfect** substitutes.\n3. **Selling costs and free entry:** shops spend on **displays and advertising**, and a newcomer can **open freely**, which keeps long-run profit near normal.',
  sol: 'Three features applied to the knitwear market.',
  scheme: [['Many sellers', 1], ['Product differentiation', 1], ['Selling costs or free entry', 1]],
}));
Q('s3_entry_barriers', short({
  t: 2, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain three ways in which an imagined monopoly, such as the only maker of a patented water-purifier membrane, can keep rival firms out of its market.',
  model: '1. **Patent:** the law gives the firm the **sole right** to make the patented membrane for some years, so rivals cannot copy it.\n2. **Control of a key input:** if it owns the only source of a vital material, others **cannot obtain** it.\n3. **Huge set-up cost:** a new plant needs **very large capital**, so a newcomer cannot easily match the monopolist\'s **low cost** at a large scale.',
  sol: 'Three barriers to entry, each explained.',
  scheme: [['Patent or licence', 1], ['Control of an input', 1], ['Large capital or cost advantage', 1]],
}));
Q('l_pc_vs_monopoly', long({
  t: [1, 2], d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Distinguish between perfect competition and monopoly on five bases, with an imagined Indian example of each market.',
  model: '1. **Sellers:** perfect competition has **very many** sellers, as at an imagined grain mandi; a monopoly has **one**, as an imagined island\'s only ferry service.\n2. **Product:** competitive sellers offer an **identical** product; the monopolist\'s product has **no close substitute**.\n3. **Entry:** entry and exit are **free** under perfect competition; a monopoly is protected by **barriers** such as a licence.\n4. **Price:** the competitive firm is a **price taker**; the monopolist is a **price maker** who may even charge different buyers different prices.\n5. **Demand and profit:** the competitive firm\'s demand is **horizontal** (AR = MR) and only normal profit survives in the long run; the monopolist\'s demand **slopes down** (MR below AR) and supernormal profit can **last**.',
  sol: 'Five bases, both forms on each.',
  scheme: [['Number of sellers', 1], ['Nature of product', 1], ['Entry', 1], ['Price control', 1], ['Demand curve and long-run profit', 1]],
}));

// ================================================================ t03 Oligopoly; monopsony (meaning only)
Q('m_oligopoly_cement', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'Four large cement makers supply an imagined state; when one announces a price cut, the other three quickly decide how to respond. The market form shown is',
  opts: ['oligopoly', 'monopoly', 'perfect competition', 'monopolistic competition'],
  sol: 'A few large sellers whose decisions depend on one another\'s reactions mark oligopoly. Interdependence is its key feature.',
}));
Q('m_oligopoly_key', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'The most distinctive feature of oligopoly is',
  opts: ['interdependence of the firms in decision-making', 'a homogeneous product sold by very many firms', 'a single seller with no rivals', 'free entry with no selling costs'],
  sol: 'With only a few sellers, each firm\'s price or output decision affects its rivals and invites a reaction, so firms are interdependent.',
}));
Q('m_monopsony_mill', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'In an imagined hill valley the only buyer of sugarcane from hundreds of growers is a single sugar mill. The mill\'s position in the cane market is called',
  opts: ['monopsony', 'monopoly', 'oligopoly', 'duopoly'],
  sol: 'Monopsony is a market with a single buyer. The mill buys all the cane, so it is a monopsonist; monopoly means a single seller.',
}));
Q('m_olig_indeterminate', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: 'Why is it hard to draw a definite demand curve for one firm in an oligopoly?',
  opts: ['The quantity it sells at a price depends on how its rivals react, which is uncertain', 'Its product has no substitutes at all', 'The government fixes its sales', 'Its buyers have perfect knowledge of all prices'],
  sol: 'A firm\'s sales after a price change depend on whether rivals follow or not; since their reaction cannot be known in advance, the firm\'s demand curve is indeterminate.',
}));
Q('ar_olig_selling', ar({
  t: 3, d: 3, c: 'analysis', key: 'b',
  a: 'Oligopoly firms often spend large sums on advertising.',
  r: 'Oligopoly has only a few sellers.',
  sol: 'Both are true, but R does not explain A. Heavy advertising arises because firms compete for market share without starting price wars, and each tries to make its product appear different; merely having few sellers does not by itself explain it.',
}));
Q('ar_monopsony_seller', ar({
  t: 3, d: 2, c: 'understanding', key: 'd',
  a: 'Monopsony is a market with a single seller.',
  r: 'Under monopsony the sole buyer has no influence on the price it pays.',
  sol: 'Both are false. Monopsony is a market with a single buyer, and that buyer has considerable influence on the price it pays because sellers have nowhere else to sell.',
}));
Q('fb_monopsony', fb({
  t: 3, d: 1, c: 'recall',
  stem: 'A market in which there is only one buyer of a product or factor is called ___.',
  acc: [['monopsony']],
  sol: 'A single buyer: monopsony.',
}));
Q('s_olig_two', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Explain two features of oligopoly using an imagined market for two-wheelers dominated by four makers.',
  model: '1. **Few large sellers:** four makers supply most two-wheelers, so each has a **big market share**.\n2. **Interdependence:** if one maker **cuts its price** or launches a new model, the others must **react**, so each plans while watching its rivals.',
  sol: 'Two features linked to the two-wheeler market.',
  scheme: [['Few sellers', 1], ['Interdependence', 1]],
}));
Q('s_monopsony_meaning', short({
  t: 3, d: 1, c: 'understanding', marks: 2, wl: S2,
  stem: 'What is meant by monopsony? Give an imagined example from a rural labour market.',
  model: '**Monopsony** is a market with **only one buyer** of a good or factor. Example: in an imagined plantation village the **only employer** hires all the farm workers, so the workers have **no other buyer** for their labour.',
  sol: 'Meaning and a single-buyer example.',
  scheme: [['Meaning: single buyer', 1], ['Suitable example', 1]],
}));
Q('s3_olig_vs_pc', short({
  t: [1, 3], d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Compare oligopoly with perfect competition on three bases of your choice.',
  model: '1. **Number of sellers:** perfect competition has **very many** sellers; oligopoly has **only a few** large ones.\n2. **Pricing:** a competitive firm is a **price taker**; an oligopolist has influence over price but must consider **rivals\' reactions**.\n3. **Selling costs and entry:** competitive firms spend **nothing** on advertising and entry is **free**; oligopolists spend **heavily** on advertising and **barriers** make entry hard.',
  sol: 'Three bases, contrasting both forms.',
  scheme: [['First basis', 1], ['Second basis', 1], ['Third basis', 1]],
}));

// ================================================================ t04 Short-run equilibrium under perfect competition
Q('m_eq_conditions', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'A perfectly competitive firm is in short-run equilibrium when',
  opts: ['MC = MR and MC is rising at that output', 'AC is at its minimum, whatever the price', 'TR is at its maximum', 'MR is greater than MC by the largest amount'],
  sol: 'Profit is greatest where an extra unit adds as much to cost as to revenue (MC = MR) and beyond which MC exceeds MR, which requires MC to cut MR from below (MC rising).',
}));
Q('m_breakeven_point', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'For a perfectly competitive firm, the break-even point is reached when price equals',
  opts: ['minimum average cost', 'minimum average variable cost', 'minimum marginal cost', 'average fixed cost'],
  sol: 'At P = minimum AC, total revenue just covers total cost including normal profit, so the firm earns only normal profit: the break-even point.',
}));
Q('m_shutdown_value', mcq({
  t: 4, d: 3, c: 'understanding',
  stem: `An imagined Rajkot brass-fittings unit has AVC = Q² − 10Q + 40 and AC = AVC + 72/Q (₹ hundred, Q in hundreds). Its minimum AVC is ₹${SHUT.p} hundred and minimum AC is ₹${BREAK.p} hundred. Below which price will it stop production in the short run?`,
  opts: [`₹${SHUT.p} hundred`, `₹${BREAK.p} hundred`, `₹${BREAK.p - SHUT.p} hundred`, `₹${FIRM.tfc} hundred`],
  sol: `The shut-down point is where price equals minimum AVC, ₹${SHUT.p} hundred. Below it, revenue does not even cover variable cost, so producing loses more than the fixed cost of ₹${FIRM.tfc} hundred. Between ₹${SHUT.p} and ₹${BREAK.p} hundred it produces at a loss.`,
}));
Q('m_loss_continue', mcq({
  t: 4, d: 3, c: 'analysis',
  stem: `At a market price of ₹${LOW.p} hundred, the imagined Rajkot unit's price is above its AVC but below its AC at the best output. In the short run it should`,
  opts: ['keep producing, because revenue covers variable cost and part of fixed cost', 'shut down at once, because it makes a loss', 'raise its price above the market price', 'produce where AC is lowest, ignoring MC'],
  sol: 'Fixed cost must be paid even at zero output. As price exceeds AVC, each unit adds something towards fixed cost, so producing makes a smaller loss than closing.',
}));
Q('m_profit_diagram', mcq({
  t: 4, d: 3, c: 'application',
  stem: `In the profit diagram of the imagined Rajkot unit, price is ₹${HIGH.p} hundred, output is ${HIGH.q} hundred and AC at that output is about ₹${r2(HIGH.ac)} hundred. Its supernormal profit is about`,
  opts: [`₹${HIGH.profit} hundred`, `₹${HIGH.tr} hundred`, `₹${r2(HIGH.p - HIGH.ac)} hundred`, `₹${HIGH.tc} hundred`],
  sol: `Profit = (AR − AC) × Q = (${HIGH.p} − ${r2(HIGH.ac)}) × ${HIGH.q} ≈ ${HIGH.profit}, the same as TR − TC = ${HIGH.tr} − ${HIGH.tc}. The per-unit gap alone is not total profit.`,
}));
Q('m_normal_profit', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'Normal profit, which a competitive firm earns at its break-even point, is best described as',
  opts: ['the minimum return the owner needs to stay in the industry, included in average cost', 'any profit above average cost', 'a loss equal to fixed cost', 'the profit earned only by monopolists'],
  sol: 'Normal profit is the opportunity cost of the entrepreneur, the least return that keeps her in the business. Economists count it in cost, so at P = AC the firm earns exactly normal profit.',
}));
Q('m_mc_falling', mcq({
  t: 4, d: 3, c: 'analysis',
  stem: `In the schedule of an imagined Erode turmeric-powder unit, MC equals the price of ₹${TURM.mc[0]} both at the 1st and the 5th hundred packets. Why is the 1st not the equilibrium output?`,
  opts: ['MC is falling there, so producing more units adds more to revenue than to cost', 'Price is below AC at the 1st hundred packets', 'TR is zero at the 1st hundred packets', 'The firm cannot sell fewer than 500 packets'],
  sol: 'At the 1st hundred packets MC is about to fall, so the next units each add less to cost than the price: profit rises by producing more. The equilibrium needs MC = MR with MC rising, which happens at the 5th.',
}));
Q('ar_shutdown', ar({
  t: 4, d: 3, c: 'analysis', key: 'a',
  a: 'A competitive firm may continue to produce in the short run even when it makes a loss.',
  r: 'If price covers average variable cost, producing reduces the loss below the fixed cost that must be paid anyway.',
  sol: 'Both are true, and R explains A: closing would leave a loss equal to total fixed cost; when P ≥ AVC, the revenue covers variable cost and some fixed cost, so the loss is smaller by producing.',
}));
Q('ar_breakeven_mc', ar({
  t: 4, d: 3, c: 'analysis', key: 'b',
  a: 'At the break-even point a competitive firm earns only normal profit.',
  r: 'Marginal cost cuts average cost at its lowest point.',
  sol: 'Both are true, but R does not explain A. A holds because at the break-even point price equals AC, so TR equals TC (which includes normal profit). R is a general property of cost curves; it explains why the break-even point lies at minimum AC, not why profit is only normal.',
}));
Q('tf_loss_shut', tf({
  t: 4, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? A competitive firm should stop producing in the short run as soon as price falls below average cost.',
  sol: 'It should stop only when price falls below minimum AVC. Between minimum AVC and minimum AC it makes a loss but a smaller one than its fixed cost by producing.',
}));
Q('fb_shutdown', fb({
  t: 4, d: 2, c: 'understanding',
  stem: 'The point where price equals minimum average variable cost is called the ___ point.',
  acc: [['shut-down', 'shutdown', 'shut down']],
  sol: 'It is the shut-down point: below it the firm stops production in the short run.',
}));
Q('n_breakeven_price', num({
  t: 4, d: 3, c: 'understanding', marks: 1, value: BREAK.p, unit: '₹ hundred',
  stem: 'An imagined Rajkot brass-fittings unit has AC = Q² − 10Q + 40 + 72/Q and MC = 3Q² − 20Q + 40 (₹ hundred, Q in hundreds). Given that MC = AC at Q = 6, find the break-even price.',
  sol: `Step 1: AC at Q = 6 = 36 − 60 + 40 + 12 = ${BREAK.p}.\nStep 2: MC at 6 = 108 − 120 + 40 = ${mc(6)}, equal to AC, so AC is at its minimum.\nStep 3: Break-even price = minimum AC = ₹${BREAK.p} hundred.`,
}));
Q('n_profit_33', num({
  t: 4, d: 3, c: 'application', marks: 2, value: T33.profit, unit: '₹',
  stem: `An imagined Erode turmeric-powder unit sells in a competitive market at ₹33 per hundred packets. Its total costs are given below. Find its maximum profit (in ₹).\n\n${turmTable()}`,
  sol: `Step 1: MC = ${TURM.mc.join(', ')}.\nStep 2: MC = MR = 33 at output 6 with MC rising.\nStep 3: Profit = 33 × 6 − ${TURM.tc[6]} = 198 − ${TURM.tc[6]} = ${T33.profit}. So ₹${T33.profit}.`,
  scheme: [['Equilibrium output 6 by MC = MR', 1], ['Profit 30', 1]],
}));
Q('n_loss_24', num({
  t: 4, d: 3, c: 'application', marks: 2, value: -T24.profit, unit: '₹',
  stem: `The market price for the imagined Erode turmeric-powder unit falls to ₹24 per hundred packets. With the total costs below, what is the smallest loss (in ₹) it can make by producing?\n\n${turmTable()}`,
  sol: `Step 1: MC = MR = 24 with MC rising at output 5.\nStep 2: TR = 24 × 5 = 120; TC = ${TURM.tc[5]}.\nStep 3: Loss = ${TURM.tc[5]} − 120 = ${-T24.profit}, less than TFC of ${TURM.tfc}, so it keeps producing. Smallest loss = ₹${-T24.profit}.`,
  scheme: [['Output 5 by MC = MR', 1], ['Loss 15', 1]],
}));
Q('ord_sr_steps', ord({
  t: 4, d: 2, c: 'understanding', marks: 1,
  stem: 'Arrange the steps a competitive firm follows to decide its short-run output, in the correct order.',
  items: [
    'Take the market price as given: AR = MR = price',
    'Find the output where MC = MR with MC rising',
    'Compare price with AVC at that output',
    'Produce that output if price covers AVC; otherwise shut down',
  ],
  sol: 'The firm accepts the market price, finds the MC = MR output, then checks the price against AVC before deciding to produce or shut down.',
}));
Q('s_mc_mr_two', short({
  t: 4, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State the two conditions of equilibrium of a firm and explain why each is needed.',
  model: '1. **MC = MR:** while MR exceeds MC, one more unit **adds to profit**; where MC exceeds MR, cutting output raises profit.\n2. **MC rising:** if MC were still falling, the **next units** would add more to revenue than to cost, so profit would not yet peak.',
  sol: 'Both conditions with reasons.',
  scheme: [['MC = MR with reason', 1], ['MC rising with reason', 1]],
}));
Q('s_supernormal', short({
  t: 4, d: 2, c: 'application', marks: 2, wl: S2,
  stem: `Price in the imagined Rajkot brass market is ₹${HIGH.p} hundred and the unit produces ${HIGH.q} hundred fittings at an AC of about ₹${r2(HIGH.ac)} hundred. Does it earn supernormal profit? Explain with figures.`,
  model: `Yes. **Price (AR) ₹${HIGH.p} hundred exceeds AC ₹${r2(HIGH.ac)} hundred**, so each hundred fittings earns about ₹${r2(HIGH.p - HIGH.ac)} hundred above all costs including normal profit. Total supernormal profit = TR ${HIGH.tr} − TC ${HIGH.tc} = **₹${HIGH.profit} hundred**.`,
  sol: 'AR above AC, with total profit computed.',
  scheme: [['AR above AC', 1], ['Supernormal profit computed', 1]],
}));
Q('s_shutdown_reason', short({
  t: 4, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: `The imagined Erode turmeric-powder unit (TFC ₹${TURM.tfc}) finds that at a price of ₹18 its best output gives a loss of ₹${-T18.produce.profit}. Should it produce? Give reasons.`,
  model: `No. Producing loses **₹${-T18.produce.profit}**, while shutting down loses only the **fixed cost of ₹${TURM.tfc}**. Price ₹18 is **below minimum AVC (₹${TURM_MIN_AVC})**, so revenue does not cover variable cost; the unit should **shut down** in the short run.`,
  sol: 'Compare the loss with TFC; price below minimum AVC.',
  scheme: [['Loss compared with TFC', 1], ['Price below minimum AVC, shut down', 1]],
}));
Q('s3_three_cases', short({
  t: 4, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: `For the imagined Rajkot brass unit (minimum AVC ₹${SHUT.p} hundred, minimum AC ₹${BREAK.p} hundred), state what kind of short-run result it earns at prices of ₹${HIGH.p}, ₹${BREAK.p} and ₹${LOW.p} hundred, with reasons.`,
  model: `1. **₹${HIGH.p} hundred:** price is **above AC** at the MC = MR output, so the unit earns **supernormal profit**.\n2. **₹${BREAK.p} hundred:** price **equals minimum AC**; TR = TC, so it earns **only normal profit** (break-even).\n3. **₹${LOW.p} hundred:** price is **below AC but above AVC**; it makes a **loss** but keeps producing, as revenue covers variable cost and part of fixed cost.`,
  sol: 'Each price placed relative to AC and AVC.',
  scheme: [['Supernormal profit case', 1], ['Normal profit case', 1], ['Loss but produce case', 1]],
}));
Q('s3_loss_diagram', short({
  t: 4, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'With a described diagram, show a perfectly competitive firm making a loss in the short run while continuing to produce.',
  model: 'Draw **AC, AVC and MC** (U-shaped) with a horizontal **AR = MR** line set **below minimum AC** but **above minimum AVC**. Equilibrium is at **E**, where **MC = MR** and MC is rising; output is **OQ**. At OQ, **AC lies above AR**, so the rectangle between AC and AR up to OQ shows the **loss**. Since **AR is above AVC**, the firm covers variable cost and keeps producing.',
  sol: 'Described diagram with the loss area and the AVC condition.',
  scheme: [['Curves and AR = MR between minimum AVC and minimum AC', 1], ['Equilibrium where MC = MR, MC rising', 1], ['Loss area and reason for producing', 1]],
}));
Q('s3_schedule_eq', short({
  t: 4, d: 3, c: 'application', marks: 3, wl: S3,
  stem: `An imagined Erode turmeric-powder unit has these marginal costs per hundred packets. At a market price of ₹24, find its equilibrium output, and explain why it does not stop at the 1st hundred.\n\n${turmMcTable()}`,
  model: `MC = MR = ₹24 at the **1st** and the **5th** hundred packets. At the 1st, MC is **falling** (next MCs 18, 15), so producing more **adds to profit**. At the **5th**, MC = 24 and is **rising** (next MC 33 > 24), so profit is greatest there: **equilibrium output = 5 hundred packets**.`,
  sol: 'Two MC = MR points; choose the one with MC rising.',
  scheme: [['Both MC = MR points identified', 1], ['Falling MC at the first rejected', 1], ['Equilibrium output 5', 1]],
}));
Q('l_three_situations', long({
  t: 4, d: 4, c: 'analysis', marks: 5, wl: L5,
  stem: 'Explain, with described diagrams, the short-run equilibrium of a firm under perfect competition when it earns (i) supernormal profit, (ii) normal profit and (iii) a loss.',
  model: '1. **Common features:** the firm faces a horizontal **AR = MR** at the market price; it produces where **MC = MR** with MC **rising**; AC and AVC are U-shaped and MC cuts them at their minima.\n2. **Supernormal profit:** AR = MR lies **above minimum AC**; at the equilibrium output AR exceeds AC, and the rectangle between them shows the profit.\n3. **Normal profit:** AR = MR is **tangent to minimum AC**; MC = MR = AC there, so TR = TC: the **break-even point**.\n4. **Loss:** AR = MR lies **below minimum AC** but **above minimum AVC**; AC exceeds AR at equilibrium and the rectangle shows the loss.\n5. **Why produce at a loss:** revenue covers **all variable cost** and part of fixed cost, so the loss is smaller than closing down.',
  sol: 'Common conditions, three cases with diagram descriptions, and the reason for producing at a loss.',
  scheme: [['Equilibrium conditions', 1], ['Supernormal profit case', 1], ['Normal profit case', 1], ['Loss case', 1], ['Reason for producing at a loss', 1]],
}));
Q('l_turm_table', long({
  t: 4, d: 4, c: 'application', marks: 5, wl: L5,
  stem: `An imagined Erode turmeric-powder unit (TFC ₹${TURM.tfc}) has the total costs below. Answer both parts. [2 + 3]\n\n${turmTable()}\n\n(a) Find its equilibrium output and profit at a price of ₹33.\n(b) At a price of ₹18, compare the loss from producing its best output with the loss from shutting down, and advise the owner.`,
  model: `(a) MC = ${TURM.mc.join(', ')}. MC = MR = 33 at **output 6** with MC rising. Profit = 33 × 6 − ${TURM.tc[6]} = **₹${T33.profit}**.\n(b) At ₹18, MC = MR with MC rising at **output 4**: TR = 72 and TC = ${TURM.tc[4]}, so the loss is **₹${-T18.produce.profit}**. Shutting down loses only the **fixed cost of ₹${TURM.tfc}**. Price ₹18 is **below minimum AVC (₹${TURM_MIN_AVC} at output 4)**, so revenue does not cover variable cost. The owner should **shut down for now** and restart when price rises above ₹${TURM_MIN_AVC}.`,
  sol: 'MC from TC; MC = MR; profit; loss compared with TFC; shut-down rule.',
  scheme: [['(a) MC and output 6', 1], ['(a) Profit 30', 1], ['(b) Output 4 and loss 39', 1], ['(b) Loss on shutting = TFC 36', 1], ['(b) Advice using minimum AVC', 1]],
}));
Q('l_breakeven_shutdown', long({
  t: 4, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: `An imagined Rajkot brass-fittings unit in a competitive market has a minimum AVC of ₹${SHUT.p} hundred at 5 hundred fittings and a minimum AC of ₹${BREAK.p} hundred at 6 hundred. Answer both parts. [2 + 3]\n\n(a) Explain its break-even point and shut-down point with a described diagram.\n(b) The market price falls from ₹${BREAK.p} to ₹${LOW.p} hundred. Evaluate whether the unit should stay open, using these figures.`,
  model: `(a) The **break-even point** is where AR = MR **touches minimum AC** (₹${BREAK.p} hundred, output 6): TR = TC and only normal profit is earned. The **shut-down point** is where AR = MR **touches minimum AVC** (₹${SHUT.p} hundred, output 5): revenue just covers variable cost, and the loss equals fixed cost.\n(b) At ₹${LOW.p} hundred the price is **below minimum AC** (${BREAK.p}), so the unit makes a **loss**. But it is **above minimum AVC** (${SHUT.p}), so revenue covers all variable cost and part of the **fixed cost of ₹${FIRM.tfc} hundred**; the loss of about ₹${Math.round(LOW.loss)} hundred is smaller than ${FIRM.tfc}. It should **stay open in the short run**, but if the price stays below ₹${BREAK.p} hundred it may leave the industry in the long run.`,
  sol: 'Both points defined and placed; decision using AVC, AC and TFC.',
  scheme: [['(a) Break-even point', 1], ['(a) Shut-down point', 1], ['(b) Price below AC: loss', 1], ['(b) Price above AVC: covers variable cost', 1], ['(b) Short-run and long-run judgement', 1]],
}));

// ================================================================ t05 Long-run equilibrium (explanation only)
Q('m_lr_normal', mcq({
  t: 5, d: 2, c: 'understanding',
  stem: 'In the long run, a firm under perfect competition earns',
  opts: ['only normal profit', 'supernormal profit for ever', 'a loss equal to its fixed cost', 'profit equal to its total revenue'],
  sol: 'Free entry removes supernormal profit and free exit removes losses, so in the long run firms earn only normal profit with price equal to minimum long-run average cost.',
}));
Q('m_lr_entry_effect', mcq({
  t: 5, d: 3, c: 'analysis',
  stem: 'Firms producing an imagined variety of incense sticks in a competitive market are earning supernormal profit. What will most likely happen in the long run?',
  opts: ['New firms enter, market supply rises and price falls until only normal profit is left', 'Existing firms raise the price to protect their profit', 'Firms leave the industry because demand falls', 'The price rises because more firms compete for buyers'],
  sol: 'Supernormal profit attracts entrants; the rise in market supply lowers price until P = minimum AC and profit is only normal.',
}));
Q('tf_lr_diagram', tf({
  t: 5, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? In long-run equilibrium under perfect competition, price equals the minimum of the firm\'s long-run average cost.',
  sol: 'With only normal profit left, P = AR = MR = MC = minimum LAC in the long run.',
}));
Q('s_lr_losses', short({
  t: 5, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Explain how free exit removes losses from a perfectly competitive industry in the long run.',
  model: 'If firms are making **losses**, some **leave** the industry. Market **supply falls**, so the **price rises**. Exit continues until the price covers **average cost** again and the remaining firms earn **normal profit**.',
  sol: 'Exit, supply falls, price rises to minimum AC.',
  scheme: [['Exit reduces supply', 1], ['Price rises to normal profit', 1]],
}));
Q('s3_lr_explain', short({
  t: 5, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Without a diagram, explain why a firm under perfect competition earns only normal profit in the long run.',
  model: '1. **Supernormal profit** in the short run attracts **new firms**, because entry is free; market supply rises and **price falls**.\n2. **Losses** make some firms **leave**, because exit is free; supply falls and **price rises**.\n3. Entry and exit stop only when price equals **minimum long-run average cost**, so each firm earns **just normal profit** and has no reason to enter or leave.',
  sol: 'Entry, exit and the end point.',
  scheme: [['Entry removes supernormal profit', 1], ['Exit removes losses', 1], ['End point: P = minimum LAC, normal profit', 1]],
}));
Q('l_lr_vs_sr', long({
  t: [4, 5], d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: 'Firms producing imagined clay water-pots in a competitive district market earn supernormal profit this summer. Answer both parts. [2 + 3]\n\n(a) State the short-run equilibrium conditions behind this profit.\n(b) Evaluate the claim that the potters can expect the same profit every summer, explaining the long-run adjustment in words.',
  model: '(a) Each potter produces where **MC = MR (= price)** with **MC rising**; the price lies **above AC** at that output, so the firm earns supernormal profit.\n(b) The claim is **unlikely** to hold. Supernormal profit is a **signal**: since entry is **free**, new potters will join and some existing ones will expand. Market **supply rises**, so the **price falls** until it equals **minimum average cost**. Then each potter earns only **normal profit**. The profit lasts only while entry takes time; in the long run it **disappears**, unless demand keeps rising faster than new supply.',
  sol: 'Conditions; entry lowers price to minimum AC; judgement.',
  scheme: [['(a) MC = MR, MC rising', 1], ['(a) Price above AC', 1], ['(b) Free entry raises supply', 1], ['(b) Price falls to minimum AC, normal profit', 1], ['(b) Judgement on the claim', 1]],
}));

// ================================================================ ISC paper-style 4-mark and 8-mark items (bank only)
Q('s4_forms_isc', short({
  t: [2, 3], d: 3, c: 'analysis', marks: 4, wl: S4,
  stem: 'Answer both parts. [2 + 2]\n\n(i) An imagined city has three large broadband providers who match each other\'s plan changes within days. Identify the market form and explain one feature shown.\n(ii) Compare the demand curve faced by one of these providers with the demand curve faced by a monopolist.',
  model: '(i) **Oligopoly:** only **a few** large providers, and they show **interdependence**, since each changes its plans after watching rivals.\n(ii) The **monopolist** faces the whole **market demand curve**, which slopes downward and is **definite**. An oligopolist\'s demand curve is **indeterminate**: how much it sells after a price change depends on whether rivals **follow or not**, which cannot be known in advance.',
  sol: 'Form with feature; definite versus indeterminate demand.',
  scheme: [['(i) Oligopoly identified', 1], ['(i) Interdependence shown', 1], ['(ii) Monopolist: definite market demand', 1], ['(ii) Oligopolist: indeterminate demand', 1]],
}));
Q('s4_pc_eq_isc', short({
  t: 4, d: 3, c: 'application', marks: 4, wl: S4,
  stem: `Answer both parts about the imagined Erode turmeric-powder unit (TFC ₹${TURM.tfc}, MC per hundred packets ${TURM.mc.join(', ')}). [2 + 2]\n\n(i) Find its equilibrium output at a price of ₹33 and explain the rule you used.\n(ii) Explain why it would still produce at a price of ₹24 even though it makes a loss.`,
  model: `(i) A competitive firm produces where **MC = MR = price** with MC **rising**. MC = 33 at the **6th** hundred packets and is rising, so equilibrium output is **6 hundred packets**.\n(ii) At ₹24 it produces 5 hundred packets with a loss of **₹${-T24.profit}**, which is **less than the fixed cost of ₹${TURM.tfc}** it would lose by closing. Price ₹24 is **above minimum AVC (₹${TURM_MIN_AVC})**, so producing covers variable cost and part of fixed cost.`,
  sol: 'MC = MR rule; loss compared with TFC and AVC.',
  scheme: [['(i) Rule stated', 1], ['(i) Output 6', 1], ['(ii) Loss 15 less than TFC 36', 1], ['(ii) Price above minimum AVC', 1]],
}));
Q('l8_market_forms', long({
  t: [1, 2, 3], d: 4, c: 'analysis', marks: 8, wl: L8,
  stem: 'Answer both parts. [4 + 4]\n\n(i) Explain four features of perfect competition and show how together they make the firm a price taker.\n(ii) Distinguish between monopolistic competition and oligopoly on four bases, using imagined Indian examples.',
  model: '(i) **Very many buyers and sellers:** each firm\'s supply is a tiny share, so it cannot move the price. **Homogeneous product:** buyers do not prefer any seller, so a higher price loses all custom. **Free entry and exit:** firms come and go, so no one can hold a special position. **Perfect knowledge:** everyone knows the ruling price, so it is uniform. Together these leave each firm to **accept the market price**: AR = MR is horizontal.\n(ii) **Number of sellers:** monopolistic competition has **many**, as among an imagined town\'s many bakeries; oligopoly has **a few**, as among an imagined state\'s four cement makers. **Product:** bakeries sell **differentiated** goods; oligopolists may sell **identical or differentiated** goods. **Interdependence:** a bakery acts **largely independently**; cement makers **react to each other**. **Entry:** bakeries enter **freely**; cement making has **high barriers** such as huge capital.',
  sol: 'Four features linked to price taking; four bases of distinction with examples.',
  scheme: [['(i) First two features', 1], ['(i) Third and fourth features', 1], ['(i) Link to price taking', 1], ['(i) AR = MR horizontal', 1], ['(ii) Number of sellers', 1], ['(ii) Nature of product', 1], ['(ii) Interdependence', 1], ['(ii) Entry', 1]],
}));
Q('l8_sr_eq_isc', long({
  t: [4, 5], d: 4, c: 'evaluation', marks: 8, wl: L8,
  stem: `Answer both parts about an imagined Rajkot brass-fittings unit in a competitive market (minimum AVC ₹${SHUT.p} hundred, minimum AC ₹${BREAK.p} hundred, TFC ₹${FIRM.tfc} hundred). [4 + 4]\n\n(i) With described diagrams, explain its short-run equilibrium at a price of ₹${HIGH.p} hundred (output ${HIGH.q} hundred, AC about ₹${r2(HIGH.ac)} hundred) and at ₹${BREAK.p} hundred.\n(ii) Evaluate what will happen to the unit and the industry in the long run if the price of ₹${HIGH.p} hundred persists for a while.`,
  model: `(i) At **₹${HIGH.p} hundred**, AR = MR is a horizontal line above minimum AC. Equilibrium is where **MC = MR** with MC rising, at **${HIGH.q} hundred** fittings. AR exceeds AC (about ₹${r2(HIGH.ac)} hundred), so the rectangle between them shows **supernormal profit** of about **₹${HIGH.profit} hundred**. At **₹${BREAK.p} hundred**, AR = MR **touches minimum AC** at 6 hundred fittings; MC = MR = AC, TR = TC, and the unit earns **only normal profit**, the break-even point.\n(ii) A price of ₹${HIGH.p} hundred gives supernormal profit, which **attracts new firms**, since entry is free; existing firms may also expand. **Market supply rises** and the price **falls**. Entry continues until the price equals **minimum average cost**, so the unit is left with **normal profit**. The supernormal profit is therefore **temporary**; how long it lasts depends on how quickly new units can be set up. Buyers gain from the **lower price** and larger output.`,
  sol: 'Two equilibria with diagrams; long-run entry and its effects.',
  scheme: [['(i) Conditions and output at 47', 1], ['(i) Supernormal profit area', 1], ['(i) Break-even at 28', 1], ['(i) Normal profit explained', 1], ['(ii) Entry attracted', 1], ['(ii) Supply rises, price falls', 1], ['(ii) Normal profit in long run', 1], ['(ii) Evaluation: temporary, depends on entry', 1]],
}));

// ================================================================ case-based
Q('cb_three_markets', caseQ({
  t: [1, 2, 3], d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the imagined student field notes about three markets in Nashik and answer the questions that follow. *(Written by SOYL for practice; the markets and firms are imagined.)*',
  passage: '**Field notes of a Class 12 group, Nashik (imagined)**\n\n*Market 1:* At the grape auction yard, about nine hundred growers sell table grapes of the same grade. Traders pay the price called out on the board; no grower can get more by holding back his crates.\n\n*Market 2:* Three makers of grape-processing machines supply the whole region. When one offered free servicing for two years, the other two announced similar offers within a week.\n\n*Market 3:* Near the bus stand, about sixty juice stalls sell fresh juice. Each has its own name, recipe and decorations, and two new stalls opened last month.',
  parts: [
    child('a', mcq({ t: 1, d: 1, c: 'understanding', fixed: true, key: 'a', stem: 'Market 1 is closest to which market form?', opts: ['Perfect competition', 'Oligopoly', 'Monopoly', 'Monopsony'], sol: 'Many sellers of an identical product who take the ruling price.' })),
    child('b', short({ t: 3, d: 2, c: 'application', marks: 1, stem: 'Identify the market form of Market 2 and quote the line that shows its key feature.', model: '**Oligopoly**: "the other two announced similar offers within a week" shows **interdependence**.', sol: 'Few sellers reacting to each other.', scheme: [['Oligopoly with the quoted line', 1]] })),
    child('c', short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Identify the market form of Market 3 and explain two of its features shown in the notes.', model: '**Monopolistic competition.** (1) **Product differentiation:** each stall has its own name, recipe and decorations. (2) **Free entry:** two new stalls opened last month; with about sixty stalls there are **many sellers**.', sol: 'Form with two evidenced features.', scheme: [['Form identified', 1], ['Two features with evidence', 1]] }), [
      short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Explain why a grower in Market 1 cannot get a higher price by holding back his crates.', model: 'He is one of **about nine hundred** sellers of **identical** grapes, so his crates are a **tiny share** of supply. Holding them back does not change the **market price**, and traders simply buy the same grade from others: he is a **price taker**.', sol: 'Many sellers, homogeneous product, price taker.', scheme: [['Many sellers, tiny share', 1], ['Identical product, price taker', 1]] }),
    ]),
  ],
}));
Q('cb_turmeric', caseQ({
  t: [4, 5], d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the imagined conversation at an Erode turmeric-powder unit and answer the questions that follow. *(Written by SOYL for practice; the unit and figures are imagined.)*',
  passage: `**At an imagined turmeric-powder unit, Erode**\n\nThe owner, Ms Valli, sells powder in a competitive market. Her fixed cost is ₹${TURM.tfc} a day, and her marginal costs for successive hundreds of packets are ₹${TURM.mc.join(', ₹')}. Last month the price was ₹33 a hundred packets. This week a bumper crop has pushed the price down to ₹24. Her son says, "We are losing money now; let us close until prices recover." Valli replies that closing would not end their losses.`,
  parts: [
    child('a', num({ t: 4, d: 2, c: 'application', marks: 1, value: T33.q, unit: 'hundred packets', stem: 'At last month\'s price of ₹33, what was the unit\'s equilibrium output?', sol: `MC = MR = 33 with MC rising at the 6th hundred packets: ${T33.q}.` })),
    child('b', num({ t: 4, d: 3, c: 'application', marks: 1, value: -T24.profit, unit: '₹', stem: 'At this week\'s price of ₹24, what is the smallest loss the unit can make by producing?', sol: `Output 5: TR = 120, TC = ${TURM.tc[5]}, loss = ${-T24.profit}.` })),
    child('c', short({ t: 4, d: 3, c: 'evaluation', marks: 2, stem: '**Either** (i): Evaluate the son\'s advice to close the unit at ₹24.', model: `Closing would still leave the **fixed cost of ₹${TURM.tfc}** to pay, a bigger loss than the **₹${-T24.profit}** from producing. As ₹24 is **above minimum AVC (₹${TURM_MIN_AVC})**, producing covers variable cost and part of fixed cost, so Valli is right to **stay open** in the short run.`, sol: 'Compare the loss with TFC; price above AVC.', scheme: [['Loss compared with TFC', 1], ['Price above AVC: stay open', 1]] }), [
      short({ t: 5, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): If the low price lasts for many seasons, explain what may happen in the turmeric-powder industry.', model: 'Firms that keep making **losses** will **leave** the industry in the long run. Market **supply falls**, the **price rises**, and exit stops when the remaining firms earn **normal profit** at minimum average cost.', sol: 'Exit, supply falls, price rises to normal profit.', scheme: [['Exit and supply fall', 1], ['Price rises to normal profit', 1]] }),
    ]),
  ],
}));
