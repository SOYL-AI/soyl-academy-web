// Build ISC 12 Economics ch09 Revenue and Producer's Equilibrium. Run from platform/:
//   npx tsx content/authored/economics-commerce/isc-12-economics-ch09/src/build.mjs
// Uses the shared ISC 12 Economics lib in isc-12-economics-ch01/src/lib.mjs (not copied, not edited).
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from '../../isc-12-economics-ch01/src/lib.mjs';

setUnit('isc-12-economics-ch09', 'economics-commerce');
const {
  COIR, COIR_REV, KURTA, KURTA_AR, KURTA_TRMAX_Q, KURTA_P, KURTA_EQ, TEE, TEE_P, TEE_EQ, BAG, BAG_TC, BAG_P, BAG_EQ,
  ARc, MRc, TRc, Pc, MCc, TCc, PROFITc, eqTRTC,
} = await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const assert = (cond, msg) => { if (!cond) throw new Error(`build.mjs: ${msg}`); };
const r1 = (x) => Math.round(x * 10) / 10;

// ---------------------------------------------------------------- SVG figures
function frame(xMax, yMax, xLabel, yLabel, w = 500, h = 380) {
  const s = new Svg(w, h);
  const c = s.chart({ x1: xMax, y1: yMax, left: 70, top: 34, width: w - 160, height: h - 100, xLabel, yLabel });
  return { s, c };
}

// Perfect competition: AR = MR horizontal at the price.
const vPcARMR = (() => {
  const { s, c } = frame(6, 60, 'Coils sold', 'Revenue per coil (₹)');
  c.seg([0, COIR.p], [6, COIR.p], { color: 'accent', sw: 2.8 });
  c.yTick(COIR.p, String(COIR.p));
  c.label([6, COIR.p], 'AR = MR', { anchor: 'end', dy: -14, color: 'accent', bold: true });
  for (const q of [2, 4]) c.dot([q, COIR.p], 'accent');
  return s.visual(
    `Average and marginal revenue of an imagined Alappuzha coir-rope maker who sells at a market price of ${COIR.p} rupees: both are the same horizontal straight line at ${COIR.p}, whatever the number of coils sold`,
    'Price taker: every coil adds the same price, so AR = MR = P.',
  );
})();

// Perfect competition: TR a ray from the origin.
const vPcTR = (() => {
  const { s, c } = frame(6, 260, 'Coils sold', 'Total revenue (₹)');
  c.fn((q) => COIR.p * q, 0, 6, { color: 'blue', sw: 2.8 });
  for (const r of COIR_REV.filter((x) => [1, 3, 5].includes(x.q))) {
    c.dot([r.q, r.tr], 'blue');
    c.drop([r.q, r.tr]);
    c.yTick(r.tr, String(r.tr));
    c.xTick(r.q, String(r.q));
  }
  assert(COIR_REV[4].tr === 200, 'coir tr 5');
  c.label([6, COIR.p * 6], 'TR', { anchor: 'end', dx: -6, dy: -12, color: 'blue', bold: true });
  return s.visual(
    `Total revenue of an imagined Alappuzha coir-rope maker selling at ${COIR.p} rupees a coil: a straight line from the origin passing through 40 at 1 coil, 120 at 3 coils and 200 at 5 coils; its slope is the price`,
    'TR = P × Q: a straight line from the origin with slope P.',
  );
})();

// Imperfect competition: AR = 12 − Q and MR = 12 − 2Q.
const vImpARMR = (() => {
  const { s, c } = frame(12, 13, 'Quantity (tankers a day)', 'Revenue per tanker (₹ hundred)');
  c.fn(ARc, 0, 12, { color: 'accent', sw: 2.8 });
  c.fn(MRc, 0, 6, { color: 'blue', sw: 2.6 });
  c.dot([6, 0], 'blue').dot([6, ARc(6)], 'accent');
  c.drop([6, ARc(6)]);
  c.yTick(12, '12').yTick(ARc(6), String(ARc(6)));
  c.xTick(6, '6').xTick(12, '12');
  c.label([10, ARc(10)], 'AR', { dx: 14, dy: -8, color: 'accent', bold: true });
  c.label([4.5, MRc(4.5)], 'MR', { dx: 16, color: 'blue', bold: true });
  return s.visual(
    'Average and marginal revenue of an imagined hill-town water-tanker monopolist: the average revenue line falls from 12 at zero output to zero at 12 tankers; the marginal revenue line starts at the same point, 12, falls twice as steeply and reaches zero at 6 tankers, where average revenue is still 6',
    'Straight-line AR: MR has the same intercept and twice the slope.',
  );
})();

// Imperfect competition: TR = 12Q − Q², peaking at Q = 6.
const vImpTR = (() => {
  const { s, c } = frame(12, 40, 'Quantity (tankers a day)', 'Total revenue (₹ hundred)');
  c.fn(TRc, 0, 12, { color: 'green', sw: 2.8 });
  c.dot([6, TRc(6)], 'green');
  c.drop([6, TRc(6)]);
  c.yTick(TRc(6), String(TRc(6)));
  c.xTick(6, '6').xTick(12, '12');
  c.label([6, TRc(6)], 'Maximum (MR = 0)', { dy: -14, size: 12, bold: true });
  c.label([10.5, TRc(10.5)], 'TR', { dx: 16, color: 'green', bold: true });
  return s.visual(
    'Total revenue of an imagined hill-town water-tanker monopolist facing average revenue 12 minus Q: an inverted U that rises at a decreasing rate, reaches its maximum of 36 at 6 tankers where marginal revenue is zero, and then falls back to zero at 12 tankers',
    'TR rises while MR > 0, peaks where MR = 0, falls when MR < 0.',
  );
})();

// TR–TC approach (perfect competition): largest gap at Q = 9.
const breakEven = (a, b) => { for (let i = 0; i < 80; i++) { const m = (a + b) / 2; if (Math.sign(PROFITc(m)) === Math.sign(PROFITc(a))) a = m; else b = m; } return (a + b) / 2; };
const BE1 = breakEven(1, 9);
const BE2 = breakEven(9, 13);
assert(PROFITc(1) < 0 && PROFITc(9) > 0 && PROFITc(13) < 0 && Math.abs(PROFITc(BE1)) < 1e-6 && Math.abs(PROFITc(BE2)) < 1e-6, 'break-even points');
const vTRTC = (() => {
  const { s, c } = frame(12, 400, 'Output (pumps)', 'Revenue and cost (₹ thousand)', 520, 400);
  c.fn((q) => Pc * q, 0, 12, { color: 'blue', sw: 2.6 });
  c.fn(TCc, 0, 12, { color: 'accent', sw: 2.6 });
  c.seg([9, TCc(9)], [9, Pc * 9], { color: 'green', sw: 2.4, dash: true });
  c.dot([9, Pc * 9], 'blue').dot([9, TCc(9)], 'accent').dot([BE1, Pc * BE1], 'muted').dot([BE2, Pc * BE2], 'muted');
  c.xTick(9, '9');
  c.yTick(TCc(0), String(TCc(0)));
  c.label([9, (Pc * 9 + TCc(9)) / 2], 'Max profit', { anchor: 'end', dx: -8, size: 12, color: 'green', bold: true });
  c.label([12, Pc * 12], 'TR', { anchor: 'end', dx: -6, dy: -12, color: 'blue', bold: true });
  c.label([12, TCc(12)], 'TC', { anchor: 'start', dx: 6, color: 'accent', bold: true });
  return s.visual(
    `TR–TC diagram of an imagined Rajkot pump maker selling at ${Pc} thousand rupees a pump: total revenue is a straight line from the origin; total cost starts at 40, rises slowly and then steeply. Total cost is above total revenue at small and large outputs; the curves cross at break-even outputs of about ${r1(BE1)} and ${r1(BE2)} pumps. The vertical gap is greatest at 9 pumps, where profit is ${PROFITc(9)}`,
    'Equilibrium where TR lies furthest above TC; the crossings are break-even points.',
  );
})();

// MR–MC approach: MC = (Q − 5)² + 14 cuts MR = 30 at A (Q = 1, MC falling) and B (Q = 9, MC rising).
const vMRMC = (() => {
  const { s, c } = frame(11, 50, 'Output (pumps)', 'Revenue and cost per pump (₹ thousand)', 520, 400);
  c.seg([0, Pc], [11, Pc], { color: 'blue', sw: 2.6 });
  c.fn(MCc, 0.2, 10.1, { color: 'accent', sw: 2.8 });
  c.dot([1, Pc], 'muted').dot([9, Pc], 'green');
  c.drop([9, Pc], { color: 'green' });
  c.label([1, Pc], 'A', { dx: 0, dy: 16, bold: true });
  c.label([9, Pc], 'B', { dx: -12, dy: -12, bold: true });
  c.xTick(1, '1').xTick(9, '9');
  c.yTick(Pc, String(Pc));
  c.label([11, Pc], 'AR = MR', { anchor: 'end', dy: -12, color: 'blue', bold: true });
  c.label([10.1, MCc(10.1)], 'MC', { anchor: 'start', dx: 6, color: 'accent', bold: true });
  assert(MCc(0.9) > Pc && MCc(1.1) < Pc && MCc(8.9) < Pc && MCc(9.1) > Pc, 'crossing directions');
  return s.visual(
    `MR–MC diagram of an imagined Rajkot pump maker: marginal revenue is a horizontal line at the price of ${Pc}; the U-shaped marginal cost curve cuts it twice, at A with 1 pump while marginal cost is falling, and at B with 9 pumps while marginal cost is rising. B is the equilibrium output`,
    'Both conditions: MR = MC and MC rising. A fails the second.',
  );
})();

// ---------------------------------------------------------------- tables and flows
const vFormulas = table(
  ['Concept', 'Meaning', 'How to find it'],
  [
    ['Total revenue (TR)', 'Whole receipts from sales', 'P × Q, or the sum of all MRs'],
    ['Average revenue (AR)', 'Revenue per unit sold', 'TR ÷ Q (always equals price)'],
    ['Marginal revenue (MR)', 'Addition to TR from one more unit', 'TRn − TRn−1'],
  ],
  'Table of revenue concepts: total revenue is all receipts, found as price times quantity or the sum of marginal revenues; average revenue is revenue per unit, total revenue divided by quantity, which equals price; marginal revenue is the change in total revenue from one more unit',
);
const vKurtaSched = table(
  ['Kurtas', 'AR', 'TR = AR × Q', 'MR = TRn − TRn−1'],
  KURTA.map((r) => [String(r.q), String(r.ar), String(r.tr), String(r.mr)]),
  `Revenue schedule of an imagined Lucknow chikan workshop: prices ${KURTA_AR.join(', ')} for 1 to 7 kurtas give total revenues ${KURTA.map((r) => r.tr).join(', ')} and marginal revenues ${KURTA.map((r) => r.mr).join(', ')}`,
  'Imagined figures, ₹ hundred.',
);
const vCoirSched = table(
  ['Coils', 'Price = AR', 'TR', 'MR'],
  COIR_REV.map((r) => [String(r.q), String(r.ar), String(r.tr), String(r.mr)]),
  `Revenue schedule of an imagined coir-rope maker selling at ${COIR.p} rupees: total revenue rises by 40 with each coil, and average and marginal revenue both stay at 40`,
  'Imagined figures, ₹.',
);
const vVase = table(
  ['', 'Working (₹)', 'Result'],
  [['Price of the 5th vase', '480', '+480'], ['Loss on the first 4 vases', '4 × (500 − 480)', '−80'], ['Marginal revenue', '480 − 80', '400'], ['Check with TR', '2,400 − 2,000', '400']],
  'Table for an imagined Jaipur blue-pottery studio cutting its price from 500 to 480 rupees to sell a fifth vase: it gains 480 on the extra vase but loses 80 on the first four, so marginal revenue is 400, which matches the rise in total revenue from 2,000 to 2,400',
  'Imagined figures: MR = price of the extra unit − loss on earlier units.',
);
assert(5 * 480 - 4 * 500 === 400, 'vase');
const vCompare = table(
  ['', 'Perfect competition', 'Imperfect competition'],
  [
    ['Price', 'Given by the market (price taker)', 'Set by the firm; must fall to sell more'],
    ['AR and MR', 'One horizontal line, AR = MR', 'Both slope down, MR below AR'],
    ['TR', 'Straight line from the origin', 'Inverted U, maximum where MR = 0'],
    ['Can MR be negative?', 'No', 'Yes, after TR peaks'],
  ],
  'Table comparing revenue curves: under perfect competition price is given, average and marginal revenue are one horizontal line and total revenue is a straight line from the origin; under imperfect competition price must fall to sell more, both curves slope down with marginal revenue below, and total revenue is an inverted U that peaks where marginal revenue is zero',
);
const vApproaches = table(
  ['Approach', 'Equilibrium condition', 'Where seen'],
  [
    ['TR–TC', 'Largest positive TR − TC', 'Biggest vertical gap between TR and TC'],
    ['MR–MC', 'MR = MC and MC rising', 'MC cuts MR from below'],
  ],
  'Table of the two approaches to producer\'s equilibrium: by total revenue and total cost, the output with the largest positive gap; by marginal revenue and marginal cost, the output where they are equal and marginal cost is rising',
  'Both give the same output.',
);
const vTeeSched = table(
  ['Batches', 'TR = 30Q', 'TC', 'Profit', 'MR', 'MC'],
  TEE_P.map((r) => [String(r.q), String(r.tr), String(r.tc), String(r.profit), r.mr ?? '—', r.mc ?? '—'].map(String)),
  `Schedule of an imagined Tiruppur T-shirt unit selling at ${TEE.p}: total costs ${TEE.tc.join(', ')} for 0 to 6 batches give profits ${TEE_P.map((r) => r.profit).join(', ')}; marginal revenue is 30 throughout and marginal cost ${TEE_P.slice(1).map((r) => r.mc).join(', ')}`,
  'Imagined figures, ₹ hundred.',
);
const vKurtaEq = table(
  ['Kurtas', 'MR', 'MC', 'Produce this kurta?'],
  KURTA_P.slice(1).map((r) => [String(r.q), String(r.mr), String(r.mc), r.mr >= r.mc ? 'Yes: MR ≥ MC' : 'No: MR < MC']),
  `Marginal revenue and marginal cost of an imagined Lucknow chikan workshop for 1 to 6 kurtas: marginal revenue ${KURTA_P.slice(1).map((r) => r.mr).join(', ')} against marginal cost ${KURTA_P.slice(1).map((r) => r.mc).join(', ')}; marginal revenue is at least marginal cost only up to the third kurta`,
  `Equilibrium: ${KURTA_EQ} kurtas, profit ${KURTA_P[KURTA_EQ].profit} (₹ hundred).`,
);
const vBagSched = table(
  ['Bags', 'MR', 'MC', 'TC', 'Profit'],
  BAG_P.slice(1).map((r) => [String(r.q), String(r.mr), String(r.mc), String(r.tc), String(r.profit)]),
  `Schedule of an imagined Jodhpur leather-bag unit selling at ${BAG.p} with a fixed cost of ${BAG.tfc}: marginal cost ${BAG.mc.join(', ')}; marginal revenue equals marginal cost at the first bag, where marginal cost is falling, and at the fifth bag, where it is rising; profit is highest at the fifth bag`,
  'Imagined figures, ₹.',
);
const vAgree = table(
  ['Gap TR − TC is…', 'because…', 'so the firm…'],
  [['widening', 'TR is steeper than TC (MR > MC)', 'raises output'], ['at its largest', 'TR and TC are parallel (MR = MC)', 'stays'], ['narrowing', 'TC is steeper than TR (MC > MR)', 'cuts output']],
  'Table linking the two approaches: the gap between total revenue and total cost widens while marginal revenue exceeds marginal cost, is largest where the two curves are parallel and marginal revenue equals marginal cost, and narrows once marginal cost exceeds marginal revenue',
);
const vPcEq = table(
  ['Market form', 'MR equals', 'So the condition becomes'],
  [['Perfect competition', 'Price (AR)', 'MC = price, with MC rising'], ['Imperfect competition', 'Less than price', 'MC = MR < price']],
  'Table showing that under perfect competition marginal revenue equals price, so equilibrium is where marginal cost equals price with marginal cost rising; under imperfect competition marginal revenue is below price, so marginal cost equals marginal revenue at an output where price is higher',
);
const vSummary1 = table(
  ['Idea', 'Key point'],
  [['TR, AR, MR', 'TR = P × Q; AR = TR ÷ Q = P; MR = TRn − TRn−1'], ['Perfect competition', 'AR = MR horizontal; TR a straight line'], ['Imperfect competition', 'AR, MR slope down; MR < AR'], ['TR and MR', 'TR peaks where MR = 0']],
  'Summary table of Part 1: revenue formulas, revenue curves under perfect and imperfect competition, and the link between the peak of total revenue and zero marginal revenue',
);
const vSummary2 = table(
  ['Idea', 'Key point'],
  [['TR–TC approach', 'Largest positive gap TR − TC'], ['MR–MC approach', 'MR = MC with MC rising'], ['No exact MR = MC', 'Produce up to the last unit with MR ≥ MC'], ['Both approaches', 'Same output: slopes of TR and TC equal']],
  'Summary table of Part 2: the two approaches to producer\'s equilibrium, what to do when a schedule has no exact equality, and why both approaches agree',
);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Revenue and Producer\'s Equilibrium — Part 1: Revenue Concepts and Curves',
  goals: [
    'Calculate total, average and marginal revenue from a schedule',
    'Draw and explain the revenue curves under perfect competition',
    'Draw and explain the revenue curves under imperfect competition and relate TR to MR',
  ],
  slides: [
    sl('title', 'Revenue and Producer\'s Equilibrium', {
      b: 'Part 1 — **total, average and marginal revenue**, and the **revenue curves** of a firm under **perfect** and **imperfect** competition.',
      v: flow('LR', ['Meaning of revenue', 'TR, AR, MR', 'Perfect competition curves', 'Why MR can be below AR', 'Imperfect competition curves', 'TR and MR'], 'Route map of Part 1: meaning of revenue, total, average and marginal revenue, perfect competition curves, why marginal revenue can be below average revenue, imperfect competition curves, and the link between total and marginal revenue', 'Part 1 at a glance'),
      n: 'Costs tell a firm what it pays. Revenue tells it what it receives from selling its output. In this part we meet three measures of revenue, see how a firm that takes the market price differs from one that must cut its price to sell more, and link the shape of total revenue to marginal revenue.',
    }),
    sl('concept', 'Total, average and marginal revenue', {
      v: vFormulas,
      n: 'Total revenue is everything a firm receives from selling its output: price times quantity. Average revenue is total revenue per unit sold, and since every unit sells at the price, it is simply the price. Marginal revenue is the extra revenue from selling one more unit, found by subtracting the previous total revenue.',
    }),
    sl('check', 'Quick check: what is marginal revenue?', {
      b: 'For a seller of terracotta lamps at an imagined Bishnupur fair, marginal revenue is the…',
      chk: 'm_mr_meaning',
      n: 'Ask yourself: is it about all the lamps together, each lamp on average, or just one more lamp?',
    }),
    sl('example', 'Worked example 1: a kurta workshop\'s revenue schedule', {
      b: 'An imagined Lucknow chikan workshop must lower its price to sell more kurtas. Work out TR and MR from its prices.',
      bl: ['Step 1 — TR = AR × Q for each output.', 'Step 2 — MR = TR of this output − TR of the previous output.', 'Step 3 — Compare MR with AR at each output.'],
      v: vKurtaSched,
      n: 'Multiply each price by the number of kurtas to get total revenue: one hundred, one hundred and eighty, two hundred and forty, and so on. Then subtract each total from the next to find marginal revenue. Notice that marginal revenue falls faster than price, reaches zero at six kurtas and becomes negative at the seventh.',
    }),
    sl('concept', 'Average revenue is the demand curve', {
      b: 'AR = TR ÷ Q = (P × Q) ÷ Q = **P**. Plotting AR against quantity gives the **price** at which each quantity can be sold: the **demand curve** facing the firm.',
      v: flow('LR', ['TR = P × Q', 'AR = TR ÷ Q', 'AR = P at every output', 'AR curve = demand curve of the firm'], 'Flow showing that total revenue is price times quantity, so average revenue equals price at every output, and the average revenue curve is the firm\'s demand curve', 'Why AR equals price'),
      n: 'Because total revenue is price times quantity, dividing by quantity always leaves the price. So average revenue is just another name for price. A curve that shows the price at which each quantity can be sold is the demand curve, which is why the average revenue curve of a firm is also its demand curve.',
    }),
    sl('check', 'Quick check: total revenue from marginal revenue', {
      b: 'A dhaba owner in an imagined Karnal highway town records the MR of his 1st, 2nd and 3rd thalis. Find his TR from 3 thalis.',
      chk: 'm_tr_from_mr',
      n: 'Each marginal revenue is what one thali added. What do you get if you add them all up?',
    }),
    sl('diagram', 'Perfect competition: AR = MR', {
      b: 'A **price taker** sells every unit at the **market price**, so **AR = MR = P**: one **horizontal** line.',
      v: vPcARMR,
      n: 'Under perfect competition a single seller is too small to affect the price. The coir-rope maker sells every coil at forty rupees. So each coil adds forty to total revenue, and revenue per coil is forty. Average and marginal revenue are the same horizontal line at the market price.',
    }),
    sl('diagram', 'Perfect competition: TR is a straight line', {
      b: 'TR = P × Q rises by the **same** amount for each unit: a **straight line from the origin** whose **slope is the price**.',
      v: vPcTR,
      n: 'Since each coil adds the same forty rupees, total revenue rises in equal steps: forty, eighty, one hundred and twenty. Drawn on a graph, it is a straight line starting at the origin. Its slope is the price. It never reaches a maximum, because every extra coil still adds forty rupees.',
    }),
    sl('check', 'Quick check: reading the TR line', {
      b: 'The TR line of an imagined coir-rope maker passes through (0, 0) and (5 coils, ₹200). The market price is…',
      chk: 'm_pc_tr_slope',
      n: 'The slope of a straight total revenue line tells you how much each unit adds.',
    }),
    sl('example', 'Worked example 2: a price taker\'s schedule', {
      b: 'An imagined Alappuzha coir-rope maker sells at **₹40** a coil. Build her schedule.',
      bl: ['Step 1 — TR = 40 × Q.', 'Step 2 — AR = TR ÷ Q = 40.', 'Step 3 — MR = change in TR = 40.'],
      v: vCoirSched,
      n: 'Total revenue is forty times the number of coils. Dividing by the number of coils always gives forty, and each extra coil adds forty. So the schedule shows average and marginal revenue fixed at forty, and total revenue climbing by forty each time.',
    }),
    sl('concept', 'Why MR falls below AR when price must fall', {
      b: 'To sell **one more**, the firm lowers the price on **all** units. MR = price of the extra unit − loss on the earlier units.',
      v: vVase,
      n: 'Suppose a pottery studio sells four vases at five hundred rupees and must drop the price to four hundred and eighty to sell a fifth. The fifth vase brings four hundred and eighty, but the first four now earn twenty rupees less each, eighty in all. So marginal revenue is only four hundred, below the price.',
    }),
    sl('diagram', 'Imperfect competition: AR and MR', {
      b: 'Both **slope downward**; **MR lies below AR**. With a straight-line AR, MR starts at the **same point** and falls **twice as steeply**.',
      v: vImpARMR,
      n: 'Here is a water-tanker monopolist facing a straight-line demand curve. Average revenue falls from twelve to zero at twelve tankers. Marginal revenue starts at the same twelve but falls twice as fast, reaching zero at only six tankers. Beyond that, marginal revenue would be negative.',
    }),
    sl('diagram', 'Imperfect competition: the TR curve', {
      b: 'TR **rises** while MR > 0, **peaks** where **MR = 0**, and **falls** when MR < 0: an **inverted U**.',
      v: vImpTR,
      n: 'Total revenue for the same tanker supplier rises quickly at first and then more slowly, because marginal revenue is shrinking. At six tankers marginal revenue is zero and total revenue is at its peak of thirty-six. After that, each extra tanker reduces total revenue, so the curve turns down.',
    }),
    sl('check', 'Quick check: marginal revenue at the top of TR', {
      b: 'The total revenue of an imagined Kanchipuram silk seller is at its highest. Her marginal revenue there is…',
      chk: 'm_tr_max_mr',
      n: 'If one more saree neither raises nor lowers total revenue, what has it added?',
    }),
    sl('two-column', 'Perfect versus imperfect competition', {
      cols: [
        '**Perfect competition:** price given; **AR = MR** horizontal; **TR** a straight line; MR never negative.',
        '**Imperfect competition:** price must fall to sell more; **MR < AR**, both falling; **TR** an inverted U; MR can be negative.',
      ],
      v: vCompare,
      n: 'Put the two side by side. A price taker faces one flat line for average and marginal revenue and a straight total revenue line. A firm that must cut its price faces falling curves with marginal revenue below average revenue, and its total revenue rises, peaks and falls.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up Part 1. Total revenue is price times quantity, average revenue equals price, and marginal revenue is the change in total revenue. A price taker has flat average and marginal revenue and a straight total revenue line. A firm that must cut its price has marginal revenue below average revenue, and its total revenue peaks where marginal revenue is zero.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Write the **formula** above each column: TR = AR × Q, MR = TRn − TRn−1.',
        'Say **why** AR equals price and why AR is the **demand curve**.',
        'Under perfect competition draw **one** horizontal line labelled **AR = MR**.',
        'With a straight-line AR, MR has the **same intercept** and **twice the slope**.',
        'Link TR to MR: **rising** (MR > 0), **maximum** (MR = 0), **falling** (MR < 0).',
      ],
      n: 'Show formulas for every column so method marks are safe. Explain why average revenue is price rather than just stating it. Label the flat line under perfect competition as both average and marginal revenue. Remember the double slope of marginal revenue for a straight demand line, and always tie the shape of total revenue to the sign of marginal revenue.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Revenue and Producer\'s Equilibrium — Part 2: Producer\'s Equilibrium',
  goals: [
    'Find the profit-maximising output by the TR–TC approach from a schedule and a diagram',
    'State and apply the two conditions of the MR–MC approach',
    'Explain why both approaches give the same equilibrium output',
  ],
  slides: [
    sl('title', 'Producer\'s Equilibrium', {
      b: 'Part 2 — the output at which a producer **maximises profit**, by the **TR–TC** and the **MR–MC** approaches.',
      v: flow('LR', ['Profit = TR − TC', 'TR–TC approach', 'MR–MC approach', 'Two conditions', 'Schedules without exact equality', 'Both approaches agree'], 'Route map of Part 2: profit as total revenue minus total cost, the total revenue and total cost approach, the marginal revenue and marginal cost approach, its two conditions, schedules without exact equality, and why both approaches agree', 'Part 2 at a glance'),
      n: 'A producer is in equilibrium when it has no reason to change its output, because that output gives the largest profit. There are two ways to find it: by comparing totals, total revenue against total cost, or by comparing margins, the revenue and cost of one more unit. Both lead to the same answer.',
    }),
    sl('concept', 'Two approaches to the same goal', {
      v: vApproaches,
      n: 'Profit is total revenue minus total cost. The first approach looks for the output where this gap is the largest. The second looks at each extra unit: as long as it adds more to revenue than to cost, produce it. The firm stops where marginal revenue equals marginal cost and marginal cost is rising.',
    }),
    sl('diagram', 'The TR–TC approach on a diagram', {
      b: 'Equilibrium is where **TR lies furthest above TC**. Where the curves **cross**, profit is **zero** (break-even).',
      v: vTRTC,
      n: 'For this pump maker, total revenue is a straight line and total cost starts at forty, rises slowly and then steeply. At very small and very large outputs, cost is above revenue and the firm makes a loss. In between, revenue is above cost. The gap is widest at nine pumps, so nine pumps is the equilibrium.',
    }),
    sl('check', 'Quick check: the largest profit', {
      b: 'An imagined Tiruppur T-shirt unit sells at ₹30 hundred a batch. With its total costs, its largest profit is…',
      chk: 'm_trtc_tee',
      n: 'Work out revenue for each output, subtract cost, and look for the biggest figure.',
    }),
    sl('example', 'Worked example 1: TR–TC from a schedule', {
      b: 'Find the equilibrium output of an imagined Tiruppur T-shirt unit by the **TR–TC** approach.',
      bl: ['Step 1 — TR = 30 × Q.', 'Step 2 — Profit = TR − TC for each output.', 'Step 3 — Pick the largest profit; where two outputs tie, take the one where MR = MC.'],
      v: vTeeSched,
      n: 'Revenue is thirty times the number of batches. Subtracting cost gives profits of minus forty, minus thirty, minus fifteen, five, twenty, twenty and ten. Profit peaks at twenty, at both four and five batches. The fifth batch adds as much to revenue as to cost, so the unit settles at five batches.',
    }),
    sl('concept', 'The MR–MC approach: two conditions', {
      bl: [
        '**Condition 1: MR = MC.** If MR > MC, produce more; if MR < MC, produce less.',
        '**Condition 2: MC must be rising** at that output (MC cuts MR **from below**), so that beyond it **MC > MR**.',
      ],
      v: flow('TB', ['Compare MR and MC for the next unit', 'MR > MC: produce it', 'MR < MC: do not produce it', 'Stop where MR = MC with MC rising'], 'Flow of the marginal approach: compare marginal revenue and marginal cost for the next unit; produce it if marginal revenue is larger, not if it is smaller, and stop where they are equal with marginal cost rising', 'Decide unit by unit'),
      n: 'The marginal approach asks one question for each extra unit: does it add more to revenue than to cost? If yes, produce it and profit rises. If no, do not. Profit is greatest where marginal revenue equals marginal cost. But that is not enough: marginal cost must be rising there, so that every unit beyond it would lose money.',
    }),
    sl('diagram', 'MR–MC on a diagram: why MC must be rising', {
      b: 'MC cuts MR **twice**: at **A** (MC falling) and at **B** (MC rising). Only **B** is the equilibrium.',
      v: vMRMC,
      n: 'Here marginal revenue is flat at the price of thirty. The U-shaped marginal cost cuts it twice. At A, marginal cost is still falling, so the next pumps cost less than they earn: producing more adds profit. At B, marginal cost is rising, and every further pump costs more than it earns. So B, at nine pumps, is the equilibrium.',
    }),
    sl('check', 'Quick check: stopping where MC is falling', {
      b: 'An imagined Bareilly furniture maker finds MR = MC at an output where MC is still falling. If he stops there…',
      chk: 'm_mc_falling_not_eq',
      n: 'What happens to marginal cost for the next few units, compared with marginal revenue?',
    }),
    sl('example', 'Worked example 2: when MR never exactly equals MC', {
      b: 'An imagined Lucknow chikan workshop: find the equilibrium by the **MR–MC** approach.',
      bl: ['Step 1 — MR = TRn − TRn−1; MC = TCn − TCn−1.', 'Step 2 — Produce every kurta with MR ≥ MC.', 'Step 3 — Stop before the first kurta with MR < MC (MC rising).'],
      v: vKurtaEq,
      n: 'Here no output has marginal revenue exactly equal to marginal cost. So produce each kurta that adds at least as much to revenue as to cost. The first three do: sixty against forty for the third. The fourth adds forty to revenue but fifty to cost. So the workshop stops at three kurtas, where profit is forty, the most in the schedule.',
    }),
    sl('example', 'Worked example 3: two points where MR = MC', {
      b: 'An imagined Jodhpur leather-bag unit sells at **₹25**. Where is it in equilibrium?',
      bl: ['Step 1 — MR = 25 for every bag.', 'Step 2 — MR = MC at the 1st bag and the 5th bag.', 'Step 3 — Reject the 1st bag (MC falling); accept the 5th (MC rising).'],
      v: vBagSched,
      n: 'Marginal revenue is twenty-five for every bag. The first bag costs exactly twenty-five, but then the cost of extra bags falls, so producing more adds profit. The fifth bag also costs twenty-five, and after it the cost jumps to thirty-two. Profit is highest, twelve rupees, at five bags, which confirms the second condition.',
    }),
    sl('check', 'Quick check: equilibrium of the bag unit', {
      b: 'From the bag unit\'s price of ₹25 and its marginal costs, find its equilibrium output.',
      chk: 'n_bag_eq',
      n: 'Find both outputs where marginal cost equals twenty-five, then check which way marginal cost is moving.',
    }),
    sl('concept', 'Why both approaches give the same output', {
      b: 'The slope of TR is **MR** and the slope of TC is **MC**. The gap TR − TC is largest where the two curves are **parallel**: **MR = MC**.',
      v: vAgree,
      n: 'Look again at the total diagram. While total revenue is steeper than total cost, the gap between them widens: marginal revenue exceeds marginal cost. Once total cost becomes steeper, the gap narrows. The widest gap is where the two curves have the same slope, which is exactly where marginal revenue equals marginal cost.',
    }),
    sl('concept', 'Equilibrium under perfect and imperfect competition', {
      b: 'Under perfect competition **MR = P**, so the condition becomes **MC = P** with MC rising.',
      v: vPcEq,
      n: 'The rule is the same for every firm, but it looks different. A price taker\'s marginal revenue is the price, so it produces where marginal cost equals the price and is rising. A firm that must cut its price has marginal revenue below the price, so at its equilibrium the price is higher than marginal cost.',
    }),
    sl('check', 'Quick check: a price taker\'s equilibrium', {
      b: 'A perfectly competitive Hooghly potato grower is in equilibrium. Her marginal cost equals…',
      chk: 'm_pc_eq_price',
      n: 'Under perfect competition, what is marginal revenue equal to?',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up Part 2. By the total approach, the producer chooses the output with the largest positive gap between total revenue and total cost. By the marginal approach, it produces where marginal revenue equals marginal cost with marginal cost rising, or up to the last unit where marginal revenue is at least marginal cost. Both give the same output.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Always state **both** conditions: MR = MC **and** MC rising (cutting MR from below).',
        'In schedules, add **TR, profit, MR and MC** columns with formulas.',
        'If two outputs tie for the largest profit, choose the one where **MR = MC**.',
        'If no MR equals MC exactly, produce up to the last unit with **MR ≥ MC**.',
        'On diagrams, mark the **equilibrium output** on the x-axis and label every curve.',
      ],
      n: 'Examiners look for both conditions, so never stop at marginal revenue equals marginal cost. Show your columns with formulas. When two outputs give the same profit, explain why the larger one is chosen. When no exact equality appears, stop at the last unit worth producing. And on diagrams, label the curves and mark the equilibrium output.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Revenue and Producer\'s Equilibrium — Notes',
  sections: [
    {
      h: '1. Total, average and marginal revenue',
      t: 1,
      b: '- **Total revenue (TR)** = P × Q; also the sum of the MRs of all units sold.\n- **Average revenue (AR)** = TR ÷ Q = **P**. The AR curve is the firm\'s **demand curve**.\n- **Marginal revenue (MR)** = TRn − TRn−1: the addition to TR from selling one more unit.\n- If TR falls when one more unit is sold, MR is **negative**.',
      terms: [['Average revenue', 'Revenue per unit sold; always equal to the price.'], ['Marginal revenue', 'The change in total revenue from selling one more unit.']],
      v: vFormulas,
      vs: [vKurtaSched],
    },
    {
      h: '2. Revenue curves under perfect competition',
      t: 2,
      b: 'A firm under perfect competition is a **price taker**: it sells any quantity at the market price, and asking more would lose all its buyers (perfectly elastic demand).\n\n- **AR = MR = P**: one **horizontal** line.\n- **TR**: a **straight line from the origin** with slope P; it has no maximum.',
      terms: [['Price taker', 'A firm too small to affect the market price, which it accepts as given.']],
      v: vPcARMR,
      vs: [vPcTR, vCoirSched],
    },
    {
      h: '3. Revenue curves under imperfect competition',
      t: 3,
      b: 'Under monopoly and monopolistic competition the firm must **lower its price** to sell more, so **AR slopes downward** (more elastic under monopolistic competition, where close substitutes exist).\n\n- MR = price of the extra unit − loss on the earlier units, so **MR < AR**.\n- With a straight-line AR = a − bQ: TR = aQ − bQ² and **MR = a − 2bQ**: same intercept, **twice the slope**.\n- **TR** rises while MR > 0, is **maximum where MR = 0**, and falls when MR < 0: an **inverted U**.',
      terms: [['Inverted-U TR', 'The total revenue curve of a firm that must cut its price to sell more: it rises, peaks where MR = 0, then falls.']],
      v: vImpARMR,
      vs: [vImpTR, vVase, vCompare],
    },
    {
      h: '4. Producer\'s equilibrium: the TR–TC approach',
      t: 4,
      b: 'Profit = TR − TC. The producer is in equilibrium at the output where this **positive gap is the largest**.\n\n- On a diagram, TC starts at **TFC** above the origin; TR (perfect competition) starts at the origin.\n- Where TR and TC **cross**, profit is zero: **break-even** points.\n- At the largest gap the **slopes** of TR and TC are equal.',
      terms: [['Producer\'s equilibrium', 'The output at which a producer earns the maximum profit and has no reason to change output.'], ['Break-even point', 'An output where TR = TC and profit is zero.']],
      v: vTRTC,
      vs: [vTeeSched],
    },
    {
      h: '5. Producer\'s equilibrium: the MR–MC approach',
      t: 5,
      b: '**Conditions:** (1) **MR = MC**; (2) **MC is rising** at that output, i.e. MC cuts MR **from below**, so beyond it MC > MR.\n\n- If MR > MC, more output raises profit; if MR < MC, less output raises profit.\n- An MR = MC point with **MC falling** is **not** an equilibrium (profit is lowest there).\n- Perfect competition: MR = P, so equilibrium is where **MC = P** and MC is rising.',
      terms: [['Second-order condition', 'At equilibrium MC must be rising, cutting MR from below.']],
      v: vMRMC,
      vs: [vBagSched, vPcEq],
    },
    {
      h: '6. Working with schedules; why both approaches agree',
      t: [4, 5],
      b: '- Build **TR, profit, MR and MC** columns, each with its formula.\n- If **no output has MR exactly equal to MC**, produce every unit with **MR ≥ MC** and stop before the first unit with MR < MC.\n- If MR = MC exactly at an output, profit is the **same** at that output and the one before it; the equilibrium is the output where **MR = MC**.\n- Both approaches agree: the slope of TR is MR, the slope of TC is MC, and the gap TR − TC is widest where the slopes are equal.',
      terms: [['MR ≥ MC rule', 'In a schedule without an exact equality, the firm produces up to the last unit whose MR is at least its MC.']],
      v: vKurtaEq,
      vs: [vAgree, vApproaches],
    },
  ],
  tips: '**Common mistakes**\n- Saying AR equals MR for every firm: only under perfect competition.\n- Drawing MR above AR, or MR with the same slope as a straight-line AR.\n- Choosing the output of maximum TR (MR = 0) as the profit-maximising output.\n- Stating only MR = MC and forgetting that MC must be rising.\n- Computing MR as TR ÷ Q, or subtracting the next total instead of the previous one.\n\n**How marks are usually awarded**\n- 1 mark: one correct option, value or term.\n- 2 marks: a definition with an example, or a value with working.\n- 3 marks: three linked points, or a completed short schedule.\n- 5 marks: parts answered in order, with schedules or described diagrams and reasons.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['**Total revenue**', 'P × Q; also the sum of all marginal revenues.', 'formula', 1],
  ['**Average revenue**', 'TR ÷ Q, which always equals **price**.', 'formula', 1],
  ['**Marginal revenue**', 'TRn − TRn−1: the addition to TR from one more unit.', 'formula', 1],
  ['Why is the AR curve the demand curve?', 'AR = price at each quantity, and the demand curve shows the price for each quantity.', 'concept', 1],
  ['When is MR negative?', 'When selling one more unit **lowers** TR.', 'concept', 1],
  ['Lucknow kurtas (imagined): TR at 4', `AR ${KURTA[3].ar} × 4 = **${KURTA[3].tr}** (₹ hundred).`, 'example', 1],
  ['**Price taker**', 'A firm too small to change the market price; sells all it wants at that price.', 'definition', 2],
  ['AR and MR under perfect competition', 'One **horizontal** line: AR = MR = P.', 'fact', 2],
  ['TR under perfect competition', 'A **straight line from the origin**; slope = price.', 'fact', 2],
  ['Coir maker (imagined) at ₹40', `TR: ${COIR_REV.map((r) => r.tr).join(', ')}; AR = MR = 40.`, 'example', 2],
  ['Why MR < AR when price must fall', 'The price cut applies to **all** earlier units, not just the extra one.', 'concept', 3],
  ['MR of a straight-line AR', 'Same intercept, **twice the slope**.', 'fact', 3],
  ['AR = 12 − Q (imagined tanker)', 'TR = 12Q − Q²; MR = 12 − 2Q; TR max **36** at Q = 6.', 'example', 3],
  ['Shape of TR under imperfect competition', '**Inverted U**: rises, peaks where MR = 0, falls.', 'fact', 3],
  ['TR at its maximum', '**MR = 0**.', 'fact', 3],
  ['Vase price cut (imagined)', 'Extra vase ₹480 − loss ₹80 = MR **₹400**.', 'example', 3],
  ['**Producer\'s equilibrium**', 'Output of maximum profit; no reason to change output.', 'definition', 4],
  ['TR–TC condition', 'Largest **positive** gap TR − TC.', 'concept', 4],
  ['**Break-even point**', 'TR = TC; profit zero.', 'definition', 4],
  ['TC curve starts at…', '**TFC**, above the origin.', 'fact', 4],
  ['Tiruppur T-shirts (imagined)', `Profits ${TEE_P.map((r) => r.profit).join(', ')}; equilibrium **${TEE_EQ}** batches.`, 'example', 4],
  ['MR–MC conditions', '**MR = MC**, and **MC rising** (cuts MR from below).', 'concept', 5],
  ['MR > MC', 'Produce **more**: the next unit adds profit.', 'concept', 5],
  ['MR < MC', 'Produce **less**: the last unit cuts profit.', 'concept', 5],
  ['MR = MC with MC falling', 'Not an equilibrium: producing more still adds profit.', 'exam-tip', 5],
  ['Equilibrium under perfect competition', '**MC = price**, with MC rising.', 'fact', 5],
  ['No exact MR = MC in a schedule', 'Produce up to the last unit with **MR ≥ MC**.', 'exam-tip', 5],
  ['Jodhpur bags (imagined)', `MR = MC at the 1st and ${BAG_EQ}th bags; equilibrium **${BAG_EQ}** (MC rising).`, 'example', 5],
  ['Why both approaches agree', 'Slope of TR = MR and slope of TC = MC: widest gap where they are equal.', 'concept', 4],
  ['Maximum TR vs maximum profit', 'MR = 0 gives maximum **revenue**; MR = MC gives maximum **profit**.', 'exam-tip', 4],
]);

// ---------------------------------------------------------------- tests (isc-12-default blueprints)
const T_SHORT = test({
  kind: 'short',
  blueprint: 'isc-12-default-chapter-test-short',
  title: 'Chapter test (short) — Revenue and Producer\'s Equilibrium',
  duration: 50,
  sections: [
    { id: 'A', title: 'Section A — Objective (5 marks)', instr: 'Answer all questions. Each carries 1 mark. Choose the correct option.', items: ['m_ar_equals_price', 'm_pc_ar_mr', 'm_trtc_condition', 'm_mrmc_conditions', 'ar_ar_price'] },
    { id: 'B', title: 'Section B — Short answer (4 marks)', instr: 'Answer both questions in about 30–50 words each. Question 7 has an internal choice.', items: ['s_tr_ar_mr', { attempt: 1, keys: ['s_pc_curves', 's_imperfect_curves'] }] },
    { id: 'C', title: 'Section C — Short answer (6 marks)', instr: 'Answer both questions in about 50–80 words each. Question 9 has an internal choice.', items: ['s3_complete_kurta', { attempt: 1, keys: ['s3_trtc_tee', 's3_mrmc_tee'] }] },
    { id: 'D', title: 'Section D — Long answer (5 marks)', instr: 'Answer the question in parts, showing your working.', items: ['l_revenue_concepts'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'isc-12-default-chapter-test-long',
  title: 'Chapter test (long) — Revenue and Producer\'s Equilibrium',
  duration: 100,
  sections: [
    { id: 'A', title: 'Section A — Objective (12 marks)', instr: 'Answer all questions. Each carries 1 mark. Choose the correct option.', items: ['m_negative_mr', 'm_ar_from_tr', 'm_pc_tr_shape', 'm_pc_price_taker', 'm_mr_below_ar', 'm_linear_mr_slope', 'm_breakeven', 'm_parallel_slopes', 'm_mr_gt_mc', 'm_bag_two_points', 'ar_mc_rising', 'ar_mr_neg_tr'] },
    { id: 'B', title: 'Section B — Short answer (6 marks)', instr: 'Answer all three questions in about 30–50 words each. Question 15 has an internal choice.', items: ['s_ar_price', 's_why_mr_less', { attempt: 1, keys: ['s_two_conditions', 's_mr_lt_mc'] }] },
    { id: 'C', title: 'Section C — Short answer (12 marks)', instr: 'Answer all four questions in about 50–80 words each. Question 19 has an internal choice.', items: ['s3_tr_mr_link', 's3_tr_shape', 's3_trtc_diagram', { attempt: 1, keys: ['s3_ar_mr_tanker', 's3_two_crossings'] }] },
    { id: 'D', title: 'Section D — Long answer (10 marks)', instr: 'Answer question 20, and either question 21 or question 22, in parts with working or described diagrams.', items: ['l_trtc_full', { attempt: 1, keys: ['l_mrmc_full', 'l_mrmc_diagram'] }] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t05 of isc-12-economics-ch09 only (TR, AR and MR; revenue curves under perfect and imperfect competition; producer\'s equilibrium by the TR–TC and MR–MC approaches)',
    style: 'ISC 2027 Economics specimen pattern (sources/cisce.md isc-2027-specimen-856-economics): 1-mark MCQs including tables, assertion-reason with option (d) both false, 4-mark (2 + 2) and 8-mark (4 + 4) bank items; chapter tests on the isc-12-default blueprints',
    originality: 'every firm, person, figure and case written for this chapter (imagined); no textbook, specimen or past-paper item reused',
    data: `figures computed in questions.mjs and asserted: coir maker at ₹${COIR.p}; Lucknow kurtas AR ${KURTA_AR.join(', ')} (MR = 0 at ${KURTA_TRMAX_Q}; with TC ${KURTA_P.map((r) => r.tc).join(', ')} equilibrium ${KURTA_EQ}, profit ${KURTA_P[KURTA_EQ].profit}); Tiruppur T-shirts at ₹${TEE.p} (profit ${eqTRTC(TEE_P).max} at 4 and 5, equilibrium ${TEE_EQ}); Jodhpur bags (MR = MC at 1 and ${BAG_EQ}, equilibrium ${BAG_EQ}); continuous AR = 12 − Q, MR = 12 − 2Q, TR max 36; pump maker P = 30, MC = (Q − 5)² + 14 crossing at Q = 1 and 9, profit ${PROFITc(9)} at 9; break-even near ${r1(BE1)} and ${r1(BE2)}; SVG curves drawn from these equations`,
    gate: 'schema, pipeline lint (lintExemplar), deterministic verify checks, the answer-leak scan and the exact-stem originality pre-check run clean on this chapter',
  },
});
assert(BAG_TC.length === 7, 'bag tc');
