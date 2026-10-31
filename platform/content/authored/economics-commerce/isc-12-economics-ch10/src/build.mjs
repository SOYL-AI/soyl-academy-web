// Build ISC 12 Economics ch10 Market Forms and Equilibrium of a Firm under Perfect Competition. Run from platform/:
//   npx tsx content/authored/economics-commerce/isc-12-economics-ch10/src/build.mjs
// Uses the shared ISC 12 Economics lib in isc-12-economics-ch01/src/lib.mjs (not copied, not edited).
// Removed topics (ISC 2027): the long-run equilibrium diagram (explained in words only) and monopsony beyond its meaning.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from '../../isc-12-economics-ch01/src/lib.mjs';

setUnit('isc-12-economics-ch10', 'economics-commerce');
const { FIRM, avc, ac, mc, tc, qAt, SHUT, BREAK, HIGH, LOW, TURM, T33, T24, T18, TURM_MIN_AVC, r2 } = await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const assert = (cond, msg) => { if (!cond) throw new Error(`build.mjs: ${msg}`); };

// ---------------------------------------------------------------- SVG figures
// Cost and revenue diagram of the imagined Rajkot brass-fittings unit at a given price: MC, AC, AVC and AR = MR.
function eqFigure(p, { alt, caption, mark = [] }) {
  const s = new Svg(520, 400);
  const c = s.chart({ x1: 9.5, y1: 62, left: 70, top: 34, width: 360, height: 300, xLabel: 'Output (hundred fittings)', yLabel: 'Cost, revenue (₹ hundred)' });
  c.fn(avc, 1.2, 8.8, { color: 'blue', sw: 2.4 });
  c.fn(ac, 2.5, 9.2, { color: 'accent', sw: 2.6 });
  c.fn(mc, 1.8, 7.5, { color: 'green', sw: 2.6 });
  c.seg([0, p], [9.5, p], { color: 'brown', sw: 2.4 });
  c.label([7.5, mc(7.5)], 'MC', { anchor: 'start', dx: 8, color: 'green', bold: true });
  c.label([9.2, ac(9.2)], 'AC', { anchor: 'start', dx: 6, dy: -4, color: 'accent', bold: true });
  c.label([8.8, avc(8.8)], 'AVC', { anchor: 'start', dx: 6, dy: 6, color: 'blue', bold: true });
  c.label([9.5, p], 'AR = MR', { anchor: 'start', dx: 6, color: 'brown', bold: true });
  c.yTick(p, String(p));
  for (const [pt, name, opt] of mark) {
    c.dot(pt);
    c.label(pt, name, { dx: opt?.dx ?? -12, dy: opt?.dy ?? -12, bold: true });
  }
  return s.visual(alt, caption);
}
const vProfit = (() => {
  const q = HIGH.q, a = HIGH.ac;
  assert(q === 7 && Math.abs(mc(q) - HIGH.p) < 1e-9, 'profit E');
  return eqFigure(HIGH.p, {
    mark: [[[q, HIGH.p], 'E', { dx: -10, dy: -14 }], [[q, a], 'F', { dx: 12, dy: 10 }]],
    alt: `Short-run equilibrium of an imagined competitive brass-fittings unit at a price of ${HIGH.p}: the horizontal average and marginal revenue line meets the rising marginal cost curve at E, output 7 hundred fittings. Average cost at that output is about ${r2(a)} at F, below the price, so the rectangle between the price line and average cost up to output 7 is supernormal profit of about ${HIGH.profit}`,
    caption: `Imagined figures: P = ${HIGH.p} above AC (${r2(a)}) at Q = 7 → supernormal profit ≈ ₹${HIGH.profit} hundred.`,
  });
})();
const vNormal = (() => {
  assert(BREAK.q === 6 && mc(6) === 28 && ac(6) === 28, 'normal E');
  return eqFigure(BREAK.p, {
    mark: [[[BREAK.q, BREAK.p], 'E', { dx: -4, dy: -16 }]],
    alt: `Break-even equilibrium of the imagined unit at a price of ${BREAK.p}: the horizontal revenue line just touches the lowest point of the average cost curve at E, output 6, where marginal cost also equals ${BREAK.p}. Total revenue equals total cost, so the unit earns only normal profit`,
    caption: `P = minimum AC = ₹${BREAK.p} hundred at Q = 6: normal profit (break-even point).`,
  });
})();
const vLoss = (() => {
  const q = LOW.q;
  return eqFigure(LOW.p, {
    mark: [[[q, LOW.p], 'E', { dx: -12, dy: 14 }], [[q, LOW.ac], 'F', { dx: -14, dy: -8 }]],
    alt: `Loss-making equilibrium of the imagined unit at a price of ${LOW.p}: the revenue line meets rising marginal cost at E, output about ${r2(q)}. Average cost there is about ${r2(LOW.ac)} at F, above the price, so there is a loss; average variable cost (about ${r2(LOW.avc)}) is below the price, so the unit keeps producing`,
    caption: `P = ${LOW.p}: below minimum AC (${BREAK.p}) but above minimum AVC (${SHUT.p}) → loss, yet produce.`,
  });
})();
const vShut = (() => {
  assert(SHUT.q === 5 && mc(5) === 15 && avc(5) === 15, 'shut E');
  return eqFigure(SHUT.p, {
    mark: [[[SHUT.q, SHUT.p], 'S', { dx: -4, dy: 16 }]],
    alt: `Shut-down point of the imagined unit at a price of ${SHUT.p}: the revenue line touches the lowest point of the average variable cost curve at S, output 5. Revenue just covers variable cost and the loss equals fixed cost; at any lower price the unit stops production`,
    caption: `P = minimum AVC = ₹${SHUT.p} hundred at Q = 5: the shut-down point.`,
  });
})();

// Industry and firm under perfect competition: the industry sets the price; the firm's AR = MR is horizontal there.
const vIndustryFirm = (() => {
  const s = new Svg(600, 360);
  const dI = (q) => 60 - 4 * q, sI = (q) => 10 + 6 * q;
  const qe = 5, pe = dI(qe);
  assert(sI(qe) === pe && pe === 40, 'industry equilibrium');
  const a = s.chart({ x1: 12, y1: 64, left: 60, top: 34, width: 210, height: 260, xLabel: 'Market output', yLabel: 'Price' });
  a.fn(dI, 0, 12, { color: 'blue', sw: 2.4 });
  a.fn(sI, 0, 9, { color: 'accent', sw: 2.4 });
  a.dot([qe, pe]);
  a.drop([qe, pe]);
  a.label([12, dI(12)], 'D', { anchor: 'start', dx: 6, color: 'blue', bold: true });
  a.label([9, sI(9)], 'S', { anchor: 'start', dx: 6, color: 'accent', bold: true });
  a.label([6, 58], 'Industry', { bold: true });
  const b = s.chart({ x1: 10, y1: 64, left: 360, top: 34, width: 180, height: 260, xLabel: 'Firm output', yLabel: 'Price' });
  b.seg([0, pe], [10, pe], { color: 'brown', sw: 2.6 });
  b.yTick(pe, String(pe));
  b.label([10, pe], 'AR = MR', { anchor: 'end', dy: -12, color: 'brown', bold: true });
  b.label([5, 58], 'Firm', { bold: true });
  return s.visual(
    `Two panels: on the left, market demand and supply for an imagined competitive product cross at a price of ${pe}; on the right, a single firm faces a horizontal average and marginal revenue line at that same price of ${pe}, because it can sell any amount at the market price`,
    'The industry sets the price; the firm takes it.',
  );
})();

// Demand (AR) curves facing one firm in three market forms.
const vDemandForms = (() => {
  const s = new Svg(640, 300);
  const panels = [
    { left: 50, title: 'Perfect competition', f: () => 30, label: 'AR = MR' },
    { left: 260, title: 'Monopoly', f: (q) => 52 - 4 * q, label: 'AR' },
    { left: 470, title: 'Monopolistic comp.', f: (q) => 40 - 1.6 * q, label: 'AR' },
  ];
  for (const p of panels) {
    const c = s.chart({ x1: 10, y1: 60, left: p.left, top: 40, width: 130, height: 200, xLabel: 'Q', yLabel: 'P' });
    c.fn(p.f, 0, 10, { color: 'accent', sw: 2.6 });
    c.label([5, 57], p.title, { bold: true, size: 12 });
    c.label([10, p.f(10)], p.label, { anchor: 'end', dy: -12, size: 12, color: 'accent', bold: true });
  }
  return s.visual(
    'Three small panels of the demand (average revenue) curve facing one firm: horizontal under perfect competition; steep and downward sloping for a monopolist, which faces the whole market demand; downward sloping but flatter (more elastic) under monopolistic competition, because close substitutes exist',
    'Perfectly elastic; less elastic; more elastic.',
  );
})();

// ---------------------------------------------------------------- tables and flows
const vForms = table(
  ['Basis', 'Perfect competition', 'Monopoly', 'Monopolistic competition', 'Oligopoly'],
  [
    ['Sellers', 'Very many', 'One', 'Many', 'A few'],
    ['Product', 'Identical', 'No close substitute', 'Differentiated', 'Identical or differentiated'],
    ['Entry and exit', 'Free', 'Barred', 'Free', 'Difficult'],
    ['Control over price', 'None (price taker)', 'Full (price maker)', 'Some', 'Some, watched by rivals'],
    ['Selling costs', 'None', 'Little', 'High', 'High'],
  ],
  'Comparison table of four market forms by number of sellers, product, entry, control over price and selling costs: perfect competition has very many sellers of an identical product with free entry and no price control; monopoly has one seller with barriers and full control; monopolistic competition has many sellers of differentiated products with free entry and some control; oligopoly has a few interdependent sellers with difficult entry',
);
const vPCFeatures = table(
  ['Feature', 'Why it makes the firm a price taker'],
  [
    ['Very many buyers and sellers', 'Each firm\'s output is a tiny part of supply'],
    ['Homogeneous product', 'A higher price loses all buyers to rivals'],
    ['Free entry and exit', 'No firm keeps a special position for long'],
    ['Perfect knowledge', 'Everyone knows the one ruling price'],
    ['Perfect mobility of factors', 'Factors move to where they earn most'],
  ],
  'Table of the features of perfect competition and how each makes the firm a price taker: very many sellers, homogeneous product, free entry and exit, perfect knowledge and perfect mobility of factors',
);
const vMonopolyFeatures = table(
  ['Monopoly', 'Monopolistic competition'],
  [
    ['Single seller', 'Many sellers'],
    ['No close substitute', 'Close but differentiated substitutes'],
    ['Strong barriers to entry', 'Free entry and exit'],
    ['Price maker; may discriminate', 'Some control over its own price'],
    ['Imagined example: an island\'s only licensed ferry', 'Imagined example: two hundred branded knitwear shops'],
  ],
  'Table comparing monopoly with monopolistic competition: one seller versus many; no close substitute versus differentiated substitutes; barriers versus free entry; price maker versus some price control; with an imagined ferry monopoly and an imagined knitwear market as examples',
);
const vOligo = flow(
  'LR',
  ['One cement maker cuts its price', 'Rivals lose buyers', 'Rivals decide: follow or hold', 'First firm\'s sales depend on that choice'],
  'Flow showing interdependence in an imagined four-firm cement oligopoly: one firm cuts its price, rivals lose buyers, they decide whether to follow, and the first firm\'s sales depend on their choice',
  'Interdependence: the key feature of oligopoly',
);
const vMonopsony = table(
  ['Term', 'Meaning', 'Imagined example'],
  [
    ['Monopoly', 'One seller', 'The only ferry to an island'],
    ['Monopsony', 'One buyer', 'The only sugar mill buying a valley\'s cane'],
  ],
  'Table contrasting monopoly, a market with one seller such as an island\'s only ferry, with monopsony, a market with one buyer such as the only sugar mill buying cane in a valley',
  'Monopsony: meaning only in the ISC syllabus.',
);
const vIdentify = table(
  ['Clue in the case', 'Market form'],
  [
    ['Hundreds of sellers, same grade, price on a board', 'Perfect competition'],
    ['Only one seller; licence keeps others out', 'Monopoly'],
    ['Many sellers, own brands, new shops opening', 'Monopolistic competition'],
    ['A few big firms reacting to each other', 'Oligopoly'],
    ['Only one buyer', 'Monopsony'],
  ],
  'Table of clues for identifying a market form in a case: many sellers of the same grade point to perfect competition; one protected seller to monopoly; many branded sellers with new entrants to monopolistic competition; a few reacting firms to oligopoly; one buyer to monopsony',
  'Quote the line that gives the clue.',
);
const vConditions = flow(
  'TB',
  ['Market price given: AR = MR = P', 'Find output where MC = MR', 'Check MC is rising there', 'Check price covers AVC', 'Produce that output (else shut down)'],
  'Flow of a competitive firm\'s short-run decision: take the market price as average and marginal revenue, find the output where marginal cost equals marginal revenue, check marginal cost is rising, check price covers average variable cost, then produce or shut down',
);
const vTurm = table(
  ['Output', 'TC', 'MC', 'AVC', 'AC'],
  TURM.tc.map((c, q) => [String(q), String(c), q ? String(TURM.mc[q - 1]) : '—', q ? String(TURM.avc[q]) : '—', q ? String(TURM.ac[q]) : '—']),
  `Cost schedule of an imagined Erode turmeric-powder unit with a fixed cost of ${TURM.tfc}: total costs ${TURM.tc.join(', ')} for 0 to 6 hundred packets, marginal costs ${TURM.mc.join(', ')}, with average variable and average costs; average variable cost is lowest at 18.75 for 4 hundred packets`,
  'Imagined figures, ₹ per day; output in hundred packets.',
);
const vTurmDecide = table(
  ['Price (₹)', 'Output where MC = MR, MC rising', 'TR', 'TC', 'Profit (+) or loss (−)', 'Decision'],
  [
    ['33', String(T33.q), String(33 * T33.q), String(TURM.tc[T33.q]), `+${T33.profit}`, 'Produce: supernormal profit'],
    ['24', String(T24.q), String(24 * T24.q), String(TURM.tc[T24.q]), String(T24.profit), 'Produce: loss below TFC'],
    ['18', String(T18.produce.q), String(18 * T18.produce.q), String(TURM.tc[T18.produce.q]), String(T18.produce.profit), `Shut down: loss would be ${-T18.shut}`],
  ],
  `Decision table for the imagined turmeric unit: at a price of 33 it produces 6 hundred packets for a profit of ${T33.profit}; at 24 it produces 5 for a loss of ${-T24.profit}, less than the fixed cost of ${TURM.tfc}; at 18 producing 4 would lose ${-T18.produce.profit}, more than the fixed cost, so it shuts down`,
  `Shut down only if price < minimum AVC (₹${TURM_MIN_AVC}).`,
);
const vThree = table(
  ['Price relative to costs', 'Result', 'Brass unit price (₹ hundred)'],
  [
    ['P above minimum AC', 'Supernormal profit', String(HIGH.p)],
    ['P = minimum AC', 'Normal profit (break-even)', String(BREAK.p)],
    ['Minimum AVC < P < minimum AC', 'Loss, but produce', String(LOW.p)],
    ['P = minimum AVC', 'Shut-down point', String(SHUT.p)],
    ['P below minimum AVC', 'Stop production', 'below 15'],
  ],
  `Table of the short-run results of a competitive firm by price: above minimum average cost, supernormal profit (price ${HIGH.p}); equal to minimum average cost, normal profit (${BREAK.p}); between minimum average variable cost and minimum average cost, a loss but production continues (${LOW.p}); equal to minimum average variable cost, the shut-down point (${SHUT.p}); below it, production stops`,
);
const vLongRun = flow(
  'LR',
  ['Supernormal profit', 'New firms enter', 'Market supply rises', 'Price falls', 'P = minimum AC: normal profit'],
  'Flow of long-run adjustment under perfect competition: supernormal profit attracts new firms, market supply rises, price falls, and entry stops when price equals minimum average cost with only normal profit; losses work the other way through exit',
  'Losses reverse the chain through exit (explanation only; no diagram).',
);
const vSummary1 = table(
  ['Idea', 'Key point'],
  [
    ['Perfect competition', 'Many sellers, identical product, free entry; firm is a price taker'],
    ['Monopoly', 'One seller, no close substitute, barriers; price maker'],
    ['Monopolistic competition', 'Many sellers, differentiated products, selling costs'],
    ['Oligopoly', 'A few interdependent sellers; demand curve indeterminate'],
    ['Monopsony', 'Only one buyer'],
  ],
  'Summary table of Part 1: the features of perfect competition, monopoly, monopolistic competition and oligopoly, and the meaning of monopsony',
);
const vSummary2 = table(
  ['Idea', 'Key point'],
  [
    ['Equilibrium', 'MC = MR = P with MC rising'],
    ['Supernormal profit', 'P above AC'],
    ['Break-even point', 'P = minimum AC: normal profit'],
    ['Shut-down point', 'P = minimum AVC'],
    ['Long run', 'Entry and exit leave only normal profit'],
  ],
  'Summary table of Part 2: the equilibrium conditions, supernormal profit, the break-even point, the shut-down point and long-run normal profit',
);
assert(Math.abs(qAt(HIGH.p) - 7) < 1e-12 && tc(7) === 205 && FIRM.tfc === 72, 'figure data');

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Market Forms — Part 1: Perfect Competition, Monopoly, Monopolistic Competition and Oligopoly',
  goals: [
    'Explain the features of perfect competition and why the firm is a price taker',
    'Compare monopoly and monopolistic competition',
    'Explain interdependence in oligopoly and the meaning of monopsony',
  ],
  slides: [
    sl('title', 'Market Forms', {
      b: 'Part 1 — how markets differ in **number of sellers**, **product**, **entry** and **control over price**.',
      v: flow('LR', ['Perfect competition', 'Monopoly', 'Monopolistic competition', 'Oligopoly', 'Monopsony'], 'Route map of Part 1: perfect competition, monopoly, monopolistic competition, oligopoly and the meaning of monopsony', 'Part 1 at a glance'),
      n: 'A wheat grower at a mandi, the only ferry to an island, a street of sweet shops and four big cement makers all sell goods, but their markets work very differently. In this part we learn to tell market forms apart by the number of sellers, the kind of product, the freedom to enter, and how much each firm controls its price.',
    }),
    sl('diagram', 'Four market forms at a glance', {
      v: vForms,
      n: 'Here are the four main market forms side by side. Read across each row. Perfect competition has very many sellers of an identical product. A monopoly has a single seller. Monopolistic competition has many sellers of slightly different products. An oligopoly has only a few sellers who watch each other closely. Keep this table in mind for every question in the chapter.',
    }),
    sl('concept', 'Perfect competition: the features', {
      v: vPCFeatures,
      n: 'Perfect competition rests on a set of features. There are so many buyers and sellers that each is tiny. The product of every seller is the same. Firms can enter and leave freely. Everyone knows the ruling price, and factors move freely. The right-hand column shows how each feature takes away the firm\'s power over price.',
    }),
    sl('check', 'Quick check: knowledge and price', {
      b: 'Does perfect knowledge help keep one uniform price?',
      chk: 'tf_pc_knowledge',
      n: 'Imagine a buyer who did not know the price elsewhere. Could a seller charge him more? Now imagine everyone knows.',
    }),
    sl('diagram', 'The industry sets the price; the firm takes it', {
      v: vIndustryFirm,
      n: 'On the left, the market demand and supply for the whole industry decide the price, here forty. On the right, one firm faces that price as a flat line. It can sell as much as it wants at forty but nothing above it, so its average revenue and marginal revenue are both equal to the price. We call it a price taker.',
    }),
    sl('example', 'Worked example 1: reading a market', {
      b: 'At an imagined Hisar wheat mandi, thousands of growers sell grain of one grade at a price called out by the market. Identify the market form and give two reasons.',
      bl: ['Step 1 — Count the sellers: thousands.', 'Step 2 — Look at the product: one grade, identical.', 'Step 3 — Who sets the price? The market, not any grower.', 'Step 4 — Conclude: perfect competition; quote the evidence.'],
      v: vIdentify,
      n: 'Go through the clues one by one. Thousands of sellers means each is tiny. Grain of one grade means the product is identical. The price is called out by the market, so no grower sets it. All three point to perfect competition. In the exam, name the form and quote the words that prove each feature.',
    }),
    sl('two-column', 'Monopoly and monopolistic competition', {
      cols: [
        '**Monopoly:** one seller, **no close substitute**, **barriers** to entry, price maker.',
        '**Monopolistic competition:** many sellers, **differentiated** products, **free entry**, **selling costs**.',
      ],
      v: vMonopolyFeatures,
      n: 'A monopoly is a single seller whose product has no close substitute, protected by barriers such as a licence or patent, so it can make the price. Monopolistic competition has many sellers whose products are similar but made different by brand, design or packing. Entry is free, and firms spend on advertising to win buyers.',
    }),
    sl('check', 'Quick check: what protects a monopoly?', {
      b: 'Which of these helps a monopolist keep supernormal profit even in the long run?',
      chk: 'm_monopoly_barrier',
      n: 'Ask what stops rivals from entering and competing the profit away.',
    }),
    sl('diagram', 'Demand curves in three market forms', {
      v: vDemandForms,
      n: 'Compare the demand curve each firm faces. Under perfect competition it is flat at the market price. A monopolist faces the whole market demand, which slopes down steeply. A firm under monopolistic competition faces a downward slope too, but a flatter one, because buyers can switch to close substitutes if it raises its price.',
    }),
    sl('example', 'Worked example 2: differentiating a product', {
      b: 'An imagined Kolkata sweet shop wants buyers to choose its rasgullas over those of nearby shops. Suggest how, and name the market form.',
      bl: ['Step 1 — Many shops sell close substitutes: monopolistic competition.', 'Step 2 — Differentiate: recipe, packing, brand name.', 'Step 3 — Spend on selling costs: signboards, offers.', 'Step 4 — Result: some loyal buyers and a little control over price.'],
      v: vMonopolyFeatures,
      n: 'Many shops on one street sell similar sweets, so this is monopolistic competition. The shop can make its rasgullas different through a special recipe, attractive boxes and a memorable name, and it can spend on signboards and offers. If buyers come to prefer it, the shop gains some control over its own price.',
    }),
    sl('concept', 'Oligopoly: a few interdependent sellers', {
      b: 'A few large sellers; each **watches and reacts** to the others. Its demand curve is **indeterminate**.',
      v: vOligo,
      n: 'In an oligopoly only a few big firms supply the market. If one cement maker cuts its price, its rivals lose buyers and must decide how to respond. Because the first firm cannot know what they will do, it cannot be sure how much it will sell. That is why we say its demand curve is indeterminate.',
    }),
    sl('check', 'Quick check: the mark of oligopoly', {
      b: 'What is the most distinctive feature of oligopoly?',
      chk: 'm_oligopoly_key',
      n: 'Think about what makes a few big firms different from a monopoly and from many small firms.',
    }),
    sl('concept', 'Monopsony: meaning only', {
      v: vMonopsony,
      n: 'Do not confuse monopoly with monopsony. A monopoly has one seller. A monopsony has one buyer, such as the only sugar mill buying cane from all the growers of a valley. For the syllabus you need only its meaning and an example.',
    }),
    sl('check', 'Quick check: one buyer', {
      b: 'Complete the term for a market with only one buyer.',
      chk: 'fb_monopsony',
      n: 'The word sounds like monopoly but is about buying, not selling.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up Part 1. Under perfect competition many sellers of an identical product make each firm a price taker. A monopolist is the only seller and a price maker. Monopolistic competition has many sellers of differentiated brands. Oligopoly has a few sellers who depend on each other. Monopsony means a single buyer.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Identify the market form from **evidence** and **quote** the line that shows it.',
        'Monopoly = one **seller**; monopsony = one **buyer**.',
        'Under perfect competition **AR = MR = price**: a horizontal line.',
        'Oligopoly\'s key word is **interdependence**; monopolistic competition\'s is **product differentiation**.',
        'Compare forms on fixed bases: sellers, product, entry, price control, selling costs.',
      ],
      v: vForms,
      n: 'In case questions, name the form and quote the words that prove it. Keep monopoly and monopsony apart. Remember that a competitive firm\'s revenue curves are one flat line. Use the key word for each form: interdependence for oligopoly and product differentiation for monopolistic competition. When comparing, use the same bases for each form.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Market Forms — Part 2: Equilibrium of a Firm under Perfect Competition',
  goals: [
    'State the conditions of a competitive firm\'s short-run equilibrium',
    'Show supernormal profit, normal profit and loss with diagrams',
    'Identify the break-even and shut-down points and explain long-run normal profit',
  ],
  slides: [
    sl('title', 'Equilibrium of a Competitive Firm', {
      b: 'Part 2 — how a price taker chooses its output, when it earns **profit**, **normal profit** or a **loss**, and when it **shuts down**.',
      v: vConditions,
      n: 'A firm under perfect competition cannot choose its price, but it can choose how much to produce. In this part we find the output that gives the most profit, see when that profit is large, normal or negative, and learn the price below which the firm should stop producing in the short run.',
    }),
    sl('concept', 'Two conditions of equilibrium', {
      bl: ['**MC = MR:** the last unit adds as much to cost as to revenue.', '**MC rising:** MC cuts MR from below, so units beyond it would lose money.', 'For a price taker, MR = AR = price.'],
      v: vConditions,
      n: 'A firm earns the most profit when the last unit adds just as much to cost as to revenue: marginal cost equals marginal revenue. That point must also be on the rising part of marginal cost, so that any further unit would cost more than it brings in. For a competitive firm, marginal revenue is simply the market price.',
    }),
    sl('diagram', 'Supernormal profit', {
      v: vProfit,
      n: `At a price of forty-seven, the price line meets rising marginal cost at E, so the brass unit produces seven hundred fittings. Average cost there is only about twenty-nine. Price is above average cost, so every unit earns more than all costs, and the rectangle between the price line and average cost is supernormal profit of about one hundred and twenty-four.`,
    }),
    sl('check', 'Quick check: the break-even point', {
      b: 'For a perfectly competitive firm, the break-even point is reached when price equals…',
      chk: 'm_breakeven_point',
      n: 'At break-even, revenue just covers every cost, including normal profit. Which average must the price equal?',
    }),
    sl('diagram', 'Normal profit: the break-even point', {
      v: vNormal,
      n: 'Now the price is twenty-eight, exactly the lowest point of average cost. The price line just touches average cost at E, where marginal cost is also twenty-eight. Total revenue equals total cost, which already includes normal profit. So the firm breaks even. This is the break-even point.',
    }),
    sl('diagram', 'A loss, but keep producing', {
      v: vLoss,
      n: 'At a price of twenty, average cost at the best output is above the price, so the firm makes a loss. But average variable cost is below the price. The firm covers all its variable cost and some of its fixed cost. Closing would leave the whole fixed cost unpaid, so producing makes the smaller loss.',
    }),
    sl('diagram', 'The shut-down point', {
      v: vShut,
      n: 'At a price of fifteen, the price line touches the lowest point of average variable cost. Revenue just covers variable cost, and the loss equals fixed cost, the same as closing. At any lower price the firm would lose more by producing, so fifteen is the shut-down point.',
    }),
    sl('check', 'Quick check: name the point', {
      b: 'Name the point where price equals minimum average variable cost.',
      chk: 'fb_shutdown',
      n: 'Below this price the firm stops producing in the short run.',
    }),
    sl('example', 'Worked example 1: decisions from a cost schedule', {
      b: 'An imagined Erode turmeric-powder unit (fixed cost ₹36) faces prices of ₹33, ₹24 and ₹18. Decide its output at each.',
      bl: ['Step 1 — MC from the schedule: 24, 18, 15, 18, 24, 33.', 'Step 2 — At each price, find MC = MR with MC rising.', 'Step 3 — Profit = TR − TC.', 'Step 4 — Compare any loss with the fixed cost of ₹36.'],
      v: vTurmDecide,
      n: 'First list marginal costs. At thirty-three, marginal cost equals price at the sixth hundred packets and is rising, giving a profit of thirty. At twenty-four the best output is five, with a loss of fifteen, less than the fixed cost of thirty-six, so it keeps producing. At eighteen the best output would lose thirty-nine, more than closing, so it shuts down.',
    }),
    sl('concept', 'The cost schedule behind the decisions', {
      v: vTurm,
      n: 'Here is the full schedule. Notice that average variable cost is lowest at four hundred packets, at eighteen rupees seventy-five paise. That is the shut-down price: any price below it fails to cover variable cost. Average cost is lowest at five hundred packets, at twenty-seven rupees, which is close to the break-even price.',
    }),
    sl('example', 'Worked example 2: placing a price', {
      b: `The brass unit has minimum AVC ₹${SHUT.p} hundred and minimum AC ₹${BREAK.p} hundred. Classify prices of ₹${HIGH.p}, ₹${BREAK.p}, ₹${LOW.p} and ₹12 hundred.`,
      bl: [`Above ${BREAK.p}: supernormal profit.`, `Equal to ${BREAK.p}: normal profit.`, `Between ${SHUT.p} and ${BREAK.p}: loss but produce.`, `Below ${SHUT.p}: shut down.`],
      v: vThree,
      n: 'Place each price against the two key numbers, the lowest average variable cost of fifteen and the lowest average cost of twenty-eight. Forty-seven is above both, so there is supernormal profit. Twenty-eight gives normal profit. Twenty lies between them, so there is a loss but the firm produces. Twelve is below fifteen, so the firm shuts down.',
    }),
    sl('check', 'Quick check: the long run', {
      b: 'In the long run, a firm under perfect competition earns…',
      chk: 'm_lr_normal',
      n: 'Think about what free entry and exit do to any extra profit or loss.',
    }),
    sl('concept', 'Long-run equilibrium (explanation only)', {
      bl: ['Supernormal profit → **entry** → supply rises → price falls.', 'Losses → **exit** → supply falls → price rises.', 'Adjustment stops at **P = minimum average cost**: normal profit only.'],
      v: vLongRun,
      n: 'In the long run firms can enter and leave. If they earn supernormal profit, newcomers arrive, supply rises and the price falls. If they make losses, some leave, supply falls and the price rises. The movement stops only when price equals the lowest average cost, so every firm earns just normal profit. The syllabus asks for this explanation, not a diagram.',
    }),
    sl('check', 'Quick check: price in the long run', {
      b: 'In long-run equilibrium, does price equal minimum long-run average cost?',
      chk: 'tf_lr_diagram',
      n: 'If price were above it, what would new firms do? If below, what would existing firms do?',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up Part 2. A competitive firm produces where marginal cost equals the price and is rising. If price is above average cost it earns supernormal profit; at the lowest average cost it breaks even; between the lowest average variable cost and the lowest average cost it makes a loss but produces; below the lowest average variable cost it shuts down. In the long run only normal profit remains.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'State **both** conditions: MC = MR **and** MC rising.',
        'Profit = (AR − AC) × Q, or TR − TC; show the rectangle in the diagram.',
        'Break-even = minimum **AC**; shut-down = minimum **AVC**. Do not swap them.',
        'A loss alone is no reason to close: compare the loss with **fixed cost**.',
        'Long-run equilibrium: **explain** entry and exit; no diagram is needed.',
      ],
      v: vThree,
      n: 'Always give both equilibrium conditions. Work profit as the gap between average revenue and average cost times output, or as total revenue minus total cost. Keep break-even at the lowest average cost and shut-down at the lowest average variable cost. Before advising a firm to close, compare its loss with its fixed cost. For the long run, explain in words.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Market Forms and Equilibrium of a Firm under Perfect Competition — Notes',
  sections: [
    {
      h: '1. Perfect competition',
      t: 1,
      b: '**Features:** very many buyers and sellers; homogeneous product; free entry and exit; perfect knowledge; perfect mobility of factors; no selling costs.\n\n**Consequence:** the industry fixes the price by market demand and supply; each firm is a **price taker** and can sell any quantity at that price. Its demand curve is **perfectly elastic**: **AR = MR = price**, one horizontal line.',
      terms: [['Price taker', 'A firm that must accept the price set by the market because its own output cannot affect it.'], ['Homogeneous product', 'A product that buyers regard as identical whichever firm sells it.']],
      v: vPCFeatures,
      vs: [vIndustryFirm],
    },
    {
      h: '2. Monopoly and monopolistic competition',
      t: 2,
      b: '**Monopoly:** a single seller; no close substitute; strong **barriers to entry** (licence, patent, control of an input, huge capital); **price maker**; may practise price discrimination; demand curve is the downward-sloping market demand.\n\n**Monopolistic competition:** many sellers; **product differentiation** (brand, design, packing); free entry and exit; **selling costs**; some control over its own price; demand slopes down but is more elastic than a monopolist\'s.',
      terms: [['Product differentiation', 'Making a product appear different from rivals\' close substitutes through brand, design, quality or packing.'], ['Selling costs', 'Spending to promote sales, such as advertising and displays.']],
      v: vMonopolyFeatures,
      vs: [vDemandForms],
    },
    {
      h: '3. Oligopoly; monopsony',
      t: 3,
      b: '**Oligopoly:** a few large sellers; **interdependence** in pricing and output decisions; barriers to entry; heavy advertising; the firm\'s demand curve is **indeterminate**, because its sales depend on rivals\' unknown reactions.\n\n**Monopsony** (meaning only): a market with a **single buyer**, such as the only mill buying a district\'s cane.',
      terms: [['Interdependence', 'The dependence of each oligopolist\'s decisions on the expected reactions of its rivals.'], ['Monopsony', 'A market with only one buyer of a good or factor.']],
      v: vOligo,
      vs: [vMonopsony, vIdentify],
    },
    {
      h: '4. Short-run equilibrium of a competitive firm',
      t: 4,
      b: '**Conditions:** MC = MR (= AR = P) and MC rising (cutting MR from below).\n\n- **Supernormal profit:** P above AC at the equilibrium output; profit = (AR − AC) × Q.\n- **Normal profit:** P = minimum AC; TR = TC.\n- **Loss:** P below AC but above AVC; the firm still produces.',
      terms: [['Supernormal profit', 'Profit above normal profit; total revenue exceeds total cost.'], ['Normal profit', 'The minimum return that keeps an entrepreneur in the industry; included in average cost.']],
      v: vProfit,
      vs: [vConditions, vLoss],
    },
    {
      h: '5. Break-even and shut-down points',
      t: 4,
      b: `**Break-even point:** P = minimum AC (brass unit: ₹${BREAK.p} hundred at 6 hundred fittings).\n\n**Shut-down point:** P = minimum AVC (brass unit: ₹${SHUT.p} hundred at 5 hundred fittings). Below it, revenue fails to cover variable cost and the firm stops producing; at it, the loss equals fixed cost.\n\n**From a schedule:** find MC = MR with MC rising; compute TR − TC; if the loss exceeds TFC, shut down (imagined turmeric unit: shut down below ₹${TURM_MIN_AVC}).`,
      terms: [['Break-even point', 'The output and price at which a firm\'s total revenue equals total cost, so it earns only normal profit.'], ['Shut-down point', 'The price equal to minimum average variable cost, below which a firm stops production in the short run.']],
      v: vNormal,
      vs: [vShut, vTurm, vTurmDecide, vThree],
    },
    {
      h: '6. Long-run equilibrium (explanation only)',
      t: 5,
      b: 'Supernormal profit attracts **new firms** (free entry); market supply rises and price falls. Losses make some firms **leave** (free exit); supply falls and price rises. In the long run **P = AR = MR = MC = minimum LAC**, and every firm earns **only normal profit**. (The long-run diagram is not required by the ISC 2027 syllabus.)',
      terms: [['Long-run equilibrium', 'The position in which no firm wishes to enter or leave the industry, with price equal to minimum long-run average cost.']],
      v: vLongRun,
    },
  ],
  tips: '**Common mistakes**\n- Calling monopsony a market with one seller.\n- Giving only MC = MR and forgetting that MC must be rising.\n- Treating every loss as a reason to close: compare the loss with fixed cost.\n- Swapping the break-even point (minimum AC) and the shut-down point (minimum AVC).\n- Drawing the competitive firm\'s demand curve sloping down.\n- Drawing a long-run diagram when the question asks for an explanation.\n\n**How marks are usually awarded**\n- 1 mark: one correct option, term or value.\n- 2 marks: two features, or a condition with its reason.\n- 3 marks: three bases of comparison, or a described diagram with the key point.\n- 5 marks: parts answered in order, with described diagrams, working from schedules and a clear decision.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['**Perfect competition**', 'Very many sellers of an **identical** product, free entry, perfect knowledge; firm is a **price taker**.', 'definition', 1],
  ['Who sets the price under perfect competition?', 'The **industry**, through market demand and supply.', 'fact', 1],
  ['Competitive firm\'s revenue curves', '**AR = MR = price**: one horizontal line.', 'concept', 1],
  ['Demand curve of a competitive firm', '**Perfectly elastic** at the market price.', 'fact', 1],
  ['Why no advertising under perfect competition?', 'Product identical, perfect knowledge, can sell any amount at the ruling price.', 'concept', 1],
  ['**Monopoly**', 'One seller, no close substitute, **barriers** to entry; **price maker**.', 'definition', 2],
  ['Barriers that protect a monopoly', 'Licence or patent, control of a key input, very large capital.', 'concept', 2],
  ['**Monopolistic competition**', 'Many sellers, **differentiated** products, free entry, selling costs.', 'definition', 2],
  ['**Product differentiation**', 'Making a product look different by brand, design, quality or packing.', 'definition', 2],
  ['Demand: monopoly vs monopolistic competition', 'Both slope down; monopolistic competition is **more elastic** (close substitutes).', 'concept', 2],
  ['Imagined knitwear market, Ludhiana', 'Two hundred branded shops, free entry → **monopolistic competition**.', 'example', 2],
  ['**Oligopoly**', 'A **few** large sellers who are **interdependent**.', 'definition', 3],
  ['Why is an oligopolist\'s demand curve indeterminate?', 'Its sales depend on rivals\' **unknown reactions**.', 'concept', 3],
  ['Imagined cement market', 'Four makers react to each other\'s price cuts → **oligopoly**.', 'example', 3],
  ['**Monopsony**', 'A market with only **one buyer**.', 'definition', 3],
  ['Monopoly vs monopsony', 'One **seller** vs one **buyer**.', 'exam-tip', 3],
  ['Conditions of equilibrium', '**MC = MR** and **MC rising**.', 'formula', 4],
  ['**Supernormal profit**', 'P above AC; profit = (AR − AC) × Q.', 'formula', 4],
  ['**Normal profit**', 'P = minimum AC; TR = TC; included in cost.', 'definition', 4],
  ['**Break-even point**', 'P = minimum **AC**.', 'definition', 4],
  ['**Shut-down point**', 'P = minimum **AVC**.', 'definition', 4],
  ['Loss but keep producing when…', 'Minimum AVC ≤ P < minimum AC.', 'concept', 4],
  ['Close down when…', 'P below minimum AVC: the loss would exceed fixed cost.', 'concept', 4],
  [`Brass unit (imagined) at ₹${HIGH.p} hundred`, `Q = 7, TR ${HIGH.tr}, TC ${HIGH.tc} → profit **₹${HIGH.profit} hundred**.`, 'example', 4],
  ['Turmeric unit (imagined) at ₹24', `Output 5, loss **₹${-T24.profit}** < TFC ₹${TURM.tfc} → keep producing.`, 'example', 4],
  ['Turmeric unit (imagined) at ₹18', `Loss ₹${-T18.produce.profit} > TFC ₹${TURM.tfc} → **shut down**.`, 'example', 4],
  ['Why MC must be rising', 'If MC is still falling, more units add more to revenue than to cost.', 'exam-tip', 4],
  ['Long run: supernormal profit', 'Entry → supply up → price down → **normal profit**.', 'concept', 5],
  ['Long run: losses', 'Exit → supply down → price up → **normal profit**.', 'concept', 5],
  ['Long-run equilibrium price', 'P = minimum **LAC**; explanation only, no diagram needed.', 'exam-tip', 5],
]);

// ---------------------------------------------------------------- tests (isc-12-default blueprints)
const T_SHORT = test({
  kind: 'short',
  blueprint: 'isc-12-default-chapter-test-short',
  title: 'Chapter test (short) — Market Forms and Equilibrium of a Firm under Perfect Competition',
  duration: 50,
  sections: [
    { id: 'A', title: 'Section A — Objective (5 marks)', instr: 'Answer all questions. Each carries 1 mark. Choose the correct option.', items: ['m_pc_mandi', 'm_monop_comp_tailors', 'm_eq_conditions', 'm_loss_continue', 'ar_shutdown'] },
    { id: 'B', title: 'Section B — Short answer (4 marks)', instr: 'Answer both questions in about 30–50 words each. Question 7 has an internal choice.', items: ['s_mc_mr_two', { attempt: 1, keys: ['s_pc_two_features', 's_monopsony_meaning'] }] },
    { id: 'C', title: 'Section C — Short answer (6 marks)', instr: 'Answer both questions in about 50–80 words each. Question 9 has an internal choice.', items: ['s3_three_cases', { attempt: 1, keys: ['s3_monop_vs_mc', 's3_lr_explain'] }] },
    { id: 'D', title: 'Section D — Long answer (5 marks)', instr: 'Answer the question in parts, with described diagrams where asked.', items: ['l_three_situations'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'isc-12-default-chapter-test-long',
  title: 'Chapter test (long) — Market Forms and Equilibrium of a Firm under Perfect Competition',
  duration: 100,
  sections: [
    { id: 'A', title: 'Section A — Objective (12 marks)', instr: 'Answer all questions. Each carries 1 mark. Choose the correct option.', items: ['m_price_taker', 'm_pc_ar_mr', 'm_homogeneous_role', 'm_monopoly_island', 'm_selling_cost', 'm_oligopoly_cement', 'm_monopsony_mill', 'm_shutdown_value', 'm_profit_diagram', 'm_lr_entry_effect', 'ar_price_maker', 'ar_olig_selling'] },
    { id: 'B', title: 'Section B — Short answer (6 marks)', instr: 'Answer all three questions in about 30–50 words each. Question 15 has an internal choice.', items: ['s_supernormal', 's_olig_two', { attempt: 1, keys: ['s_product_diff', 's_shutdown_reason'] }] },
    { id: 'C', title: 'Section C — Short answer (12 marks)', instr: 'Answer all four questions in about 50–80 words each. Question 19 has an internal choice.', items: ['s3_pc_features', 's3_schedule_eq', 's3_olig_vs_pc', { attempt: 1, keys: ['s3_loss_diagram', 's3_monop_comp_features'] }] },
    { id: 'D', title: 'Section D — Long answer (10 marks)', instr: 'Answer question 20, and either question 21 or question 22, in parts with working or described diagrams.', items: ['l_turm_table', { attempt: 1, keys: ['l_breakeven_shutdown', 'l_lr_vs_sr'] }] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t05 of isc-12-economics-ch10 only (perfect competition; monopoly and monopolistic competition; oligopoly and monopsony (meaning only); short-run equilibrium of a competitive firm with break-even and shut-down points; long-run equilibrium explained in words — its diagram removed by ISC 2027)',
    style: 'ISC 2027 Economics specimen pattern (sources/cisce.md isc-2027-specimen-856-economics): 1-mark MCQs including diagrams and tables, assertion-reason with option (d) both false, 4-mark (2 + 2) and 8-mark (4 + 4) bank items; chapter tests on the isc-12-default blueprints',
    originality: 'every firm, market, person, figure and case written for this chapter (imagined); no real company named; no textbook, specimen or past-paper item reused',
    data: `figures computed in questions.mjs and asserted: imagined Rajkot brass unit TFC ${FIRM.tfc}, TVC = Q³ − 10Q² + 40Q (minimum AVC ${SHUT.p} at Q = 5, minimum AC ${BREAK.p} at Q = 6; at P = ${HIGH.p}, Q = 7 and profit ${HIGH.profit}; at P = ${LOW.p}, Q ≈ ${r2(LOW.q)} with AVC < P < AC); imagined Erode turmeric schedule (profit ${T33.profit} at 33, loss ${-T24.profit} at 24, shut down at 18); SVG curves drawn from their equations`,
    gate: 'schema, pipeline lint (lintExemplar), deterministic verify checks, the answer-leak scan and the exact-stem originality pre-check run clean on this chapter',
  },
});
