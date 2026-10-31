// Build ISC 12 Economics ch07 Production Function and Law of Variable Proportions. Run from platform/:
//   npx tsx content/authored/economics-commerce/isc-12-economics-ch07/src/build.mjs
// Uses the shared ISC 12 Economics lib in isc-12-economics-ch01/src/lib.mjs (not copied, not edited).
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from '../../isc-12-economics-ch01/src/lib.mjs';

setUnit('isc-12-economics-ch07', 'economics-commerce');
const { TP, MP, AP, L_INFLEX, L_APMAX, L_TPMAX, NAG, NAG_MP, NAG_AP, THAN, THAN_TP, BAKE, BAKE_MP, BAKE_AP1, RTS, rtsPct, mpOf, apOf, tpOf } = await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const assert = (cond, msg) => { if (!cond) throw new Error(`build.mjs: ${msg}`); };

// ---------------------------------------------------------------- SVG figures (workers on the x-axis)
// A frame whose x-axis sits at output 0, so a negative marginal product is drawn below the axis.
function frame({ xMax, yMin, yMax, yLabel, w = 500, h = 400 }) {
  const s = new Svg(w, h);
  const left = 70, top = 40, width = w - 150, height = h - 100;
  const X = (x) => left + (x / xMax) * width;
  const Y = (y) => top + height - ((y - yMin) / (yMax - yMin)) * height;
  s.arrow(left, Y(0), left + width + 14, Y(0), { sw: 1.6 });
  s.arrow(left, top + height, left, top - 10, { sw: 1.6 });
  s.text(left - 10, Y(0) + 14, 'O', { size: 13 });
  s.text(left + width + 10, Y(0) + (yMin < 0 ? -14 : 34), 'Workers (L)', { anchor: 'end', size: 13 });
  s.text(left + 8, top - 14, yLabel, { anchor: 'start', size: 13 });
  const fn = (f, a, b, o, n = 60) => { const pts = []; for (let i = 0; i <= n; i++) { const x = a + ((b - a) * i) / n; pts.push([X(x), Y(f(x))]); } s.polyline(pts, o); };
  const vline = (x, label) => { s.line(X(x), top - 4, X(x), top + height, { sw: 1.2, dash: true, color: 'muted' }); if (label) s.text(X(x), top + height + 16, label, { size: 12 }); };
  const dot = (x, y, color = 'accent') => s.dot(X(x), Y(y), 4, color);
  const label = (x, y, t, o = {}) => s.text(X(x) + (o.dx ?? 0), Y(y) + (o.dy ?? 0), t, o);
  const stage = (x, t) => s.text(X(x), top + 4, t, { size: 13, bold: true, color: 'muted' });
  const self = { s, X, Y };
  for (const [k, g] of Object.entries({ fn, vline, dot, label, stage })) self[k] = (...a) => { g(...a); return self; };
  return self;
}

// Total product curve TP = 9L^2 − L^3 with the point of inflexion and the maximum marked.
function tpFigure(withStages) {
  const f = frame({ xMax: 7.6, yMin: 0, yMax: 125, yLabel: 'Total product (quintals)' });
  f.fn(TP, 0, 7.2, { color: 'accent', sw: 2.8 });
  f.dot(L_INFLEX, TP(L_INFLEX)).dot(L_TPMAX, TP(L_TPMAX));
  f.label(L_INFLEX, TP(L_INFLEX), 'K', { dx: -14, dy: -6, bold: true });
  f.label(L_TPMAX, TP(L_TPMAX), 'M', { dy: -14, bold: true });
  f.label(7.2, TP(7.2), 'TP', { anchor: 'start', dx: 8, color: 'accent', bold: true });
  if (withStages) {
    f.vline(L_APMAX, '4.5');
    f.vline(L_TPMAX, '6');
    f.stage(1.3, 'Stage I').stage(5.25, 'II').stage(6.85, 'III');
  } else {
    f.vline(L_INFLEX, '3');
    f.vline(L_TPMAX, '6');
  }
  return f.s.visual(
    withStages
      ? `Total product curve of an imagined millet farm with fixed land: it rises at an increasing rate up to the point of inflexion K at 3 workers, keeps rising at a diminishing rate to its maximum M of ${TP(L_TPMAX)} quintals at 6 workers, and then falls. Dashed lines at 4.5 and 6 workers divide Stage I, Stage II and Stage III`
      : `Total product curve of an imagined millet farm with fixed land: it rises at an increasing rate up to the point of inflexion K at 3 workers (${TP(L_INFLEX)} quintals), keeps rising at a diminishing rate to its maximum M of ${TP(L_TPMAX)} quintals at 6 workers, and falls after that`,
    'Imagined, smooth production function drawn from TP = 9L² − L³.',
  );
}
// AP and MP curves with MP's peak, the crossing at AP's peak and MP = 0.
function apmpFigure(withStages) {
  const f = frame({ xMax: 7.6, yMin: -24, yMax: 32, yLabel: 'AP and MP (quintals)' });
  f.fn(AP, 0, 7.2, { color: 'blue', sw: 2.6 });
  f.fn(MP, 0, 7.2, { color: 'accent', sw: 2.6 });
  f.dot(L_INFLEX, MP(L_INFLEX)).dot(L_APMAX, AP(L_APMAX), 'blue').dot(L_TPMAX, 0);
  f.label(L_INFLEX, MP(L_INFLEX), 'MP max', { dy: -14, size: 12 });
  f.label(L_APMAX, AP(L_APMAX), 'MP = AP', { anchor: 'start', dx: 10, dy: -12, size: 12 });
  f.label(L_TPMAX, 0, 'MP = 0', { anchor: 'end', dx: -8, dy: 14, size: 12 });
  f.label(7.2, AP(7.2), 'AP', { anchor: 'start', dx: 8, color: 'blue', bold: true });
  f.label(7.2, MP(7.2), 'MP', { anchor: 'start', dx: 8, color: 'accent', bold: true });
  if (withStages) {
    f.vline(L_APMAX, '4.5');
    f.vline(L_TPMAX, '6');
    f.stage(1.3, 'Stage I').stage(5.25, 'II').stage(6.85, 'III');
  }
  return f.s.visual(
    `Average and marginal product curves of the same imagined farm: MP rises to its maximum of ${MP(L_INFLEX)} quintals at 3 workers, then falls, cutting AP at AP's maximum of ${AP(L_APMAX)} quintals at 4.5 workers, becomes zero at 6 workers and negative after that, while AP stays positive${withStages ? '. Dashed lines at 4.5 and 6 workers mark the three stages' : ''}`,
    'Imagined: MP = 18L − 3L², AP = 9L − L²; the horizontal axis is at zero, so negative MP lies below it.',
  );
}
// sanity of the figure points
assert(MP(L_APMAX) === AP(L_APMAX) && MP(L_TPMAX) === 0 && MP(7.2) < 0 && AP(7.2) > 0, 'figure points');
const vTP = tpFigure(false);
const vTPStages = tpFigure(true);
const vAPMP = apmpFigure(false);
const vAPMPStages = apmpFigure(true);

// Returns to scale: output before and after doubling all inputs.
const vRTSBars = (() => {
  const s = new Svg(560, 340);
  const c = s.chart({ x1: 9, y1: 1100, left: 70, top: 36, width: 420, height: 230, yLabel: 'Output a day' });
  RTS.forEach((x, i) => {
    const xb = 1 + i * 3;
    s.rect(c.X(xb - 0.6), c.Y(x.before), c.X(xb) - c.X(xb - 0.6), c.Y(0) - c.Y(x.before), { fill: 'muted', fillOpacity: 0.5, stroke: false, rx: 2 });
    s.rect(c.X(xb + 0.1), c.Y(x.after), c.X(xb + 0.7) - c.X(xb + 0.1), c.Y(0) - c.Y(x.after), { fill: 'accent', fillOpacity: 0.8, stroke: false, rx: 2 });
    s.text(c.X(xb + 0.05), c.Y(0) + 16, ['Kolhapur', 'Ankleshwar', 'Ludhiana'][i], { size: 12 });
    s.text(c.X(xb + 0.4), c.Y(x.after) - 10, `+${rtsPct(x)}%`, { size: 12, bold: true });
  });
  s.rect(360, 290, 14, 10, { fill: 'muted', fillOpacity: 0.5, stroke: false, rx: 2 });
  s.text(380, 296, 'Before', { anchor: 'start', size: 12 });
  s.rect(440, 290, 14, 10, { fill: 'accent', fillOpacity: 0.8, stroke: false, rx: 2 });
  s.text(460, 296, 'Inputs doubled', { anchor: 'start', size: 12 });
  return s.visual(
    `Bar chart for three imagined factories that doubled every input: the Kolhapur sugar mill's output rose ${rtsPct(RTS[0])} per cent (increasing returns to scale), the Ankleshwar paint plant's ${rtsPct(RTS[1])} per cent (constant) and the Ludhiana cycle-parts unit's ${rtsPct(RTS[2])} per cent (diminishing)`,
    'Imagined figures: compare the rise in output with the 100 per cent rise in inputs.',
  );
})();

// ---------------------------------------------------------------- tables and flows
const vPF = flow('LR', ['Inputs: land, labour, capital', 'Given technology', 'Maximum physical output'], 'Flow of a production function: physical inputs of land, labour and capital, with a given technology, produce the maximum physical output', 'Q = f(L, K)');
const vFixedVar = table(
  ['Input at an imagined Bhagalpur silk shed', 'Short run', 'Why'],
  [['Looms', 'Fixed', 'Take months to buy and install'], ['Shed', 'Fixed', 'Cannot be enlarged quickly'], ['Weavers', 'Variable', 'Can be hired within days'], ['Silk yarn', 'Variable', 'Bought as output changes']],
  'Table classifying inputs of an imagined Bhagalpur silk shed: looms and the shed are fixed in the short run because they cannot be changed quickly; weavers and silk yarn are variable',
);
const vSRLR = table(
  ['', 'Short-run production function', 'Long-run production function'],
  [['Factors', 'At least one fixed', 'All variable'], ['Factor proportion', 'Changes', 'Can stay the same'], ['Law that applies', 'Returns to a factor (variable proportions)', 'Returns to scale'], ['Example', 'More moulders, same kiln', 'A second kiln with its own crew']],
  'Table comparing the short-run production function, where at least one factor is fixed and returns to a factor apply, with the long-run production function, where all factors vary and returns to scale apply',
);
const vDefs = table(
  ['Concept', 'Meaning', 'Formula'],
  [['Total product (TP)', 'Total output of all units of the variable factor', 'ΣMP'], ['Average product (AP)', 'Output per unit of the variable factor', 'TP ÷ L'], ['Marginal product (MP)', 'Addition to TP from one more unit', 'TPn − TPn−1']],
  'Table of total, average and marginal product: total product is total output and equals the sum of marginal products; average product is total product divided by units of labour; marginal product is the change in total product from one more unit',
);
const vNag = table(
  ['Workers', 'TP (crates)', 'MP', 'AP'],
  NAG.tp.slice(0, 6).map((t, i) => [String(i + 1), String(t), String(NAG_MP[i]), String(NAG_AP[i])]),
  `Worked example table for an imagined Nagpur orange-packing shed: with 1 to 6 workers total product is ${NAG.tp.slice(0, 6).join(', ')} crates, marginal product ${NAG_MP.slice(0, 6).join(', ')} and average product ${NAG_AP.slice(0, 6).join(', ')}`,
  'Imagined figures: MP = change in TP; AP = TP ÷ workers.',
);
const vThan = table(
  ['Labourers', 'MP (rows)', 'TP = running total'],
  THAN.mp.map((m, i) => [String(i + 1), String(m), String(THAN_TP[i])]),
  `Worked example table for an imagined Thanjavur paddy plot: marginal products ${THAN.mp.join(', ')} add up to total products ${THAN_TP.join(', ')}; TP is highest at 45 rows where MP is zero and falls when MP is negative`,
  'Imagined figures: TP is the running sum of MP.',
);
const vTPMP = table(
  ['Marginal product', 'Total product'],
  [['Rising', 'Rises at an increasing rate'], ['Maximum', 'Point of inflexion'], ['Falling but positive', 'Rises at a diminishing rate'], ['Zero', 'Maximum'], ['Negative', 'Falls']],
  'Table linking marginal product to total product: rising MP makes TP rise at an increasing rate, maximum MP is the point of inflexion, falling positive MP makes TP rise at a diminishing rate, zero MP is TP maximum and negative MP makes TP fall',
);
const vAPMPRel = table(
  ['Marginal product compared with average product', 'Average product'],
  [['MP > AP', 'Rises'], ['MP = AP', 'At its maximum'], ['MP < AP', 'Falls'], ['MP negative', 'Still positive while TP is positive']],
  'Table of the AP and MP relationship: when MP is above AP, AP rises; when they are equal AP is at its maximum; when MP is below AP, AP falls; MP can be negative while AP stays positive',
);
const vAssumptions = table(
  ['Assumption', 'Why it matters'],
  [['Technology unchanged', 'Better methods would shift the whole TP curve'], ['At least one factor fixed', 'The law is about changing factor proportions'], ['Units of the variable factor homogeneous', 'Diminishing MP is not due to weaker workers'], ['Short period', 'The fixed factor cannot be increased']],
  'Table of the assumptions of the Law of Variable Proportions: unchanged technology, at least one fixed factor, homogeneous units of the variable factor and a short period, with why each matters',
);
const vStages = table(
  ['Stage', 'Total product', 'Marginal product', 'Average product', 'Ends where'],
  [['I: increasing returns', 'Rises (first at an increasing rate)', 'Rises, then falls; above AP', 'Rises', 'AP is maximum (MP = AP)'], ['II: diminishing returns', 'Rises at a diminishing rate', 'Falls, stays positive', 'Falls', 'TP is maximum (MP = 0)'], ['III: negative returns', 'Falls', 'Negative', 'Falls', '—']],
  'Table of the three stages of the Law of Variable Proportions: in Stage I total and average product rise and the stage ends where average product is maximum; in Stage II total product rises at a diminishing rate and marginal product falls to zero; in Stage III marginal product is negative and total product falls',
  'Convention used here: Stage I ends at the maximum of AP.',
);
const vCauses = table(
  ['Returns', 'Main causes'],
  [['Increasing', 'Fuller use of an indivisible fixed factor; division of labour'], ['Diminishing', 'Fixed factor becomes scarce relative to the variable factor; factors are imperfect substitutes'], ['Negative', 'Overcrowding and overuse of the fixed factor']],
  'Table of the causes of the three types of returns to a factor: increasing returns from fuller use of an indivisible fixed factor and division of labour; diminishing returns from scarcity of the fixed factor and imperfect substitution; negative returns from overcrowding',
);
const vPoints = table(
  ['Workers (smooth curve)', 'What happens', 'Value'],
  [[String(L_INFLEX), 'MP at its maximum: TP\'s point of inflexion', `MP = ${MP(L_INFLEX)}`], [String(L_APMAX), 'AP at its maximum: MP = AP', `${AP(L_APMAX)}`], [String(L_TPMAX), 'TP at its maximum: MP = 0', `TP = ${TP(L_TPMAX)}`], ['More than 6', 'MP negative: TP falls', `TP(7) = ${TP(7)}`]],
  `Worked example table for the imagined Bastar millet farm: MP peaks at ${MP(L_INFLEX)} quintals with 3 workers, AP peaks at ${AP(L_APMAX)} with 4.5 workers where it equals MP, TP peaks at ${TP(L_TPMAX)} quintals with 6 workers where MP is zero, and beyond 6 workers TP falls`,
  'Imagined smooth curve: TP = 9L² − L³.',
);
const vRational = flow('LR', ['Stage I: AP of the variable factor still rising', 'Stage III: MP of the variable factor negative', 'Stage II: both factors have positive MP'], 'Flow of the rational producer\'s choice: in Stage I it pays to add more of the variable factor, in Stage III it pays to use less, so the producer settles in Stage II', 'Why Stage II');
const vRTSTable = table(
  ['Factory (imagined)', 'Output before', 'After doubling all inputs', 'Rise in output', 'Returns to scale'],
  RTS.map((x) => [x.firm, String(x.before), String(x.after), `${rtsPct(x)} per cent`, x.kind]),
  `Worked example table: when all inputs double, output rises ${RTS.map((x) => `${rtsPct(x)} per cent at the ${x.firm}`).join(', ')}, showing increasing, constant and diminishing returns to scale`,
);
const vFactorScale = table(
  ['', 'Returns to a factor', 'Returns to scale'],
  [['Period', 'Short run', 'Long run'], ['Inputs changed', 'One, others fixed', 'All, in the same proportion'], ['Factor proportion', 'Changes', 'Unchanged'], ['Types', 'Increasing, diminishing, negative', 'Increasing, constant, diminishing']],
  'Table distinguishing returns to a factor, a short-run idea where one input changes and the factor proportion changes, from returns to scale, a long-run idea where all inputs change in the same proportion',
);
const vSummary1 = table(
  ['Idea', 'Key point'],
  [['Production function', 'Physical input-output relation, given technology'], ['Short and long run', 'Some factors fixed versus all variable'], ['TP, AP, MP', 'AP = TP ÷ L; MP = change in TP'], ['Relationships', 'MP = 0 at TP maximum; MP = AP at AP maximum']],
  'Summary table of Part 1: the production function, short and long run, the definitions of total, average and marginal product and their relationships',
);
const vSummary2 = table(
  ['Idea', 'Key point'],
  [['Law of Variable Proportions', 'MP of a variable factor eventually diminishes'], ['Three stages', 'Increasing, diminishing, negative returns'], ['Rational producer', 'Operates in Stage II'], ['Returns to scale', 'All inputs changed together: increasing, constant, diminishing']],
  'Summary table of Part 2: the Law of Variable Proportions, its three stages, the rational producer in Stage II and the meaning of returns to scale',
);
assert(BAKE_MP === 25 && BAKE_AP1 === 37, 'bakery');
assert(mpOf(NAG.tp).join() === NAG_MP.join() && apOf(NAG.tp).join() === NAG_AP.join() && tpOf(THAN.mp).join() === THAN_TP.join(), 'schedules');

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Production Function — Part 1: Inputs, Output, and Total, Average and Marginal Product',
  goals: [
    'Explain the production function and distinguish the short run from the long run',
    'Calculate average and marginal product from a total product schedule, and total product from marginal products',
    'Explain how total product and average product behave as marginal product changes',
  ],
  slides: [
    sl('title', 'Production Function and Law of Variable Proportions', {
      b: 'Part 1 — how **inputs** turn into **output**, and the three measures of output: **total, average and marginal product**.',
      v: flow('LR', ['Production function', 'Fixed and variable factors', 'Short and long run', 'TP, AP and MP', 'How they are related'], 'Route map of Part 1: the production function, fixed and variable factors, short and long run, total, average and marginal product, and how they are related', 'Part 1 at a glance'),
      n: 'Every producer, from a bakery in Shillong to a millet farm in Bastar, turns inputs into output. In this chapter we study that technical link. Part one defines the production function, separates fixed from variable factors, and builds three measures of output: total, average and marginal product.',
    }),
    sl('concept', 'What a production function is', {
      b: 'A **production function** is the **technical relationship** between the **physical quantities of inputs** and the **maximum physical output**, for a **given technology**.\n\nIt is written **Q = f(L, K)**: output depends on labour and capital.',
      v: vPF,
      n: 'A production function tells us the most output a firm can get from given amounts of inputs, with the technology it has. It is purely physical. It talks about workers, machines and kilograms, not rupees. Prices and costs come later, when we study cost.',
    }),
    sl('two-column', 'Fixed and variable factors', {
      cols: [
        'A **fixed factor** cannot be changed quickly as output changes: buildings, heavy machines, land under a lease.',
        'A **variable factor** can be changed within the period: workers, raw materials, power.',
      ],
      v: vFixedVar,
      n: 'Some inputs take a long time to change. A silk shed cannot add looms or enlarge its building within weeks, so these are fixed factors. Weavers and yarn can be increased within days, so they are variable factors. Whether a factor is fixed depends on the length of the period we consider.',
    }),
    sl('check', 'Quick check: which relationship?', {
      b: 'A Kanpur leather unit adds cutters to its six fixed cutting tables and watches output. What is it studying?',
      chk: 'm_sr_function',
      n: 'Count how many inputs are changing. If one input changes while the others stay fixed, which kind of production function is it?',
    }),
    sl('concept', 'Short run and long run', {
      b: 'In the **short run** at least one factor is **fixed**; output changes only through the variable factor.\n\nIn the **long run** **all factors** can be varied.',
      v: vSRLR,
      n: 'The short run is any period in which at least one factor is fixed. The firm can only change output by using more or less of its variable factors, so the proportion between factors changes. In the long run every input can change, even the size of the plant. The short run leads to returns to a factor; the long run leads to returns to scale.',
    }),
    sl('concept', 'Total, average and marginal product', {
      b: '- **Total product (TP):** total output of all units of the variable factor.\n- **Average product (AP) = TP ÷ L.**\n- **Marginal product (MP) = TPn − TPn−1:** the addition to TP from **one more unit**.',
      v: vDefs,
      n: 'Total product is everything the variable factor produces with the fixed factor. Average product is output per worker: total product divided by the number of workers. Marginal product is the extra output from one more worker: the change in total product. Adding up all the marginal products gives total product.',
    }),
    sl('example', 'Worked example 1: a Nagpur packing shed', {
      b: 'Find MP and AP for an imagined Nagpur orange-packing shed with one shed and 1 to 6 workers.',
      bl: ['Step 1 — MP = this TP minus the previous TP (12 − 0, 30 − 12, …).', 'Step 2 — AP = TP ÷ workers (12 ÷ 1, 30 ÷ 2, …).', 'Step 3 — Compare: AP rises while MP is above it.'],
      v: vNag,
      n: 'Work down the table. The first worker adds twelve crates. Two workers pack thirty, so the second adds eighteen. Three pack fifty-one, so the third adds twenty-one. Average product is total crates divided by workers: twelve, fifteen, seventeen. While each new worker adds more than the average, the average rises.',
    }),
    sl('check', 'Quick check: the fourth packer', {
      b: 'The shed packs 51 crates with 3 workers and 68 with 4. What is the marginal product of the fourth worker?',
      chk: 'num_nag_mp',
      n: 'Marginal product is the change in total product when one more worker joins. Subtract.',
    }),
    sl('diagram', 'The total product curve', {
      b: 'TP rises **at an increasing rate** up to **K** (point of inflexion), then **at a diminishing rate** up to its **maximum M**, and then **falls**.',
      v: vTP,
      n: 'Here is a smooth total product curve for an imagined millet farm with fixed land. At first the curve gets steeper: each worker adds more than the last. After point K it gets flatter: each worker adds less. At M the curve is flat, its maximum. After that, extra workers actually reduce output.',
    }),
    sl('concept', 'How TP depends on MP', {
      b: 'TP changes by the amount of MP, so the **sign and size of MP** decide the shape of TP.',
      v: vTPMP,
      n: 'Total product changes by exactly the marginal product each time. So when marginal product is rising, total product rises faster and faster. When marginal product falls but stays positive, total product still rises, only more slowly. When marginal product is zero, total product is at its peak. When marginal product is negative, total product falls.',
    }),
    sl('check', 'Quick check: does TP fall with MP?', {
      b: 'True or false? Total product starts falling as soon as marginal product starts falling.',
      chk: 'tf_tp_falls',
      n: 'Remember that total product changes by the amount of marginal product. If that amount is smaller but still positive, which way does total product move?',
    }),
    sl('diagram', 'Average and marginal product curves', {
      b: 'MP **rises**, reaches a **peak**, **cuts AP at AP\'s maximum**, becomes **zero**, then **negative**. AP stays positive.',
      v: vAPMP,
      n: 'Now look at average and marginal product for the same farm. Marginal product climbs to a peak at three workers, then falls. It crosses the average product curve exactly where average product is highest, at four and a half workers on this smooth curve. At six workers marginal product is zero, and after that it dips below the axis.',
    }),
    sl('concept', 'How AP depends on MP', {
      b: 'An addition **above** the average pulls the average **up**; an addition **below** it pulls the average **down**.',
      v: vAPMPRel,
      n: 'Think of a cricketer\'s batting average. A score above the average raises it; a score below the average lowers it. In the same way, when marginal product is above average product, average product rises. When it is equal, average product is at its peak. When it is below, average product falls.',
    }),
    sl('example', 'Worked example 2: from MP to TP at Thanjavur', {
      b: 'An imagined Thanjavur plot gets marginal products of 6, 10, 13, 9, 5, 2, 0 and −3 rows a day from eight labourers. Build total product.',
      bl: ['Step 1 — TP is the running total of MP.', 'Step 2 — TP is highest (45) where MP becomes zero.', 'Step 3 — The negative MP of the eighth labourer makes TP fall to 42.'],
      v: vThan,
      n: 'To go from marginal to total product, keep a running total. Six, then six plus ten makes sixteen, plus thirteen makes twenty-nine, and so on. Total product peaks at forty-five rows when the seventh labourer adds nothing. The eighth labourer has a negative marginal product, so total product falls to forty-two.',
    }),
    sl('check', 'Quick check: a brass artisan', {
      b: 'The next artisan at a Moradabad brass unit adds 14 vases; the average so far is 11. What happens to average product?',
      chk: 'm_mp_above_ap',
      n: 'Is the new addition above or below the current average?',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up Part 1. A production function is a physical link between inputs and output. In the short run some factors are fixed; in the long run all can change. Average product is output per unit and marginal product is the extra output from one more unit. Total product peaks where marginal product is zero, and average product peaks where marginal product equals it.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Write **MP = TPn − TPn−1** and **AP = TP ÷ L** before calculating; show each subtraction or division.',
        'TP from MP: add the marginal products **cumulatively**.',
        'Say **"TP rises at a diminishing rate"** when MP falls but is positive — not "TP falls".',
        'Draw AP and MP on one diagram, with **MP cutting AP at AP\'s peak** and MP going **below** the x-axis.',
        'Keep the production function **physical**: no prices or costs.',
      ],
      n: 'Show your formulas before you calculate, and show each step. When marginal product falls but is still positive, total product rises at a diminishing rate; it does not fall. On diagrams, marginal product must cut average product at its highest point and can go below the axis. And keep the production function physical, without any prices.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Production Function — Part 2: The Law of Variable Proportions and Returns to Scale',
  goals: [
    'State the Law of Variable Proportions with its assumptions',
    'Explain the three stages with a diagram and their causes, and why a rational producer chooses Stage II',
    'Explain the meaning of returns to scale and distinguish it from returns to a factor',
  ],
  slides: [
    sl('title', 'Law of Variable Proportions and Returns to Scale', {
      b: 'Part 2 — what happens to output as more of **one input** is added to a **fixed** input, and what happens when **all inputs** grow together.',
      v: flow('LR', ['The law and its assumptions', 'Three stages', 'Causes', 'The rational producer', 'Returns to scale'], 'Route map of Part 2: the Law of Variable Proportions and its assumptions, the three stages, their causes, the rational producer and returns to scale', 'Part 2 at a glance'),
      n: 'In Part 2 we keep one factor fixed and keep adding another. What happens to output? The answer is one of the most important laws in economics, the Law of Variable Proportions. Then we let every factor change together and meet returns to scale.',
    }),
    sl('concept', 'The Law of Variable Proportions', {
      b: 'As more units of a **variable factor** are combined with a **fixed factor**, the **marginal product** of the variable factor may **rise at first** but **eventually diminishes**, and may become **negative**.\n\nIt is also called the law of **returns to a factor**.',
      v: vTP,
      n: 'Here is the law. Keep adding units of a variable factor, such as workers, to a fixed factor, such as land. At first each extra worker may add more than the one before. But sooner or later each extra worker adds less, and if we go on, an extra worker may even reduce output. The proportion between the factors keeps changing, hence the name.',
    }),
    sl('concept', 'Assumptions of the law', {
      bl: ['**Technology** is unchanged.', '**At least one factor is fixed.**', 'Units of the variable factor are **homogeneous** (equally efficient).', 'The period is **short**.'],
      v: vAssumptions,
      n: 'The law holds under four assumptions. Technology does not change, otherwise the whole curve would shift. At least one factor is fixed. Every worker is equally efficient, so diminishing returns are not caused by weaker workers. And the period is short, so the fixed factor cannot be increased.',
    }),
    sl('check', 'Quick check: an assumption', {
      b: 'Which of these is an assumption of the Law of Variable Proportions?',
      chk: 'm_lvp_assumption',
      n: 'Which option fits a short-run law where only one factor changes and methods of production stay the same?',
    }),
    sl('diagram', 'Three stages on the total product curve', {
      b: '**Stage I** up to the maximum of AP; **Stage II** up to the maximum of TP; **Stage III** after it.',
      v: vTPStages,
      n: 'Divide the total product curve into three stages. Stage one runs from the start to the point where average product is highest. Stage two runs from there to the top of the total product curve. Stage three is everything after it, where total product falls. Some books end stage one at the point of inflexion instead; we follow the average product convention.',
    }),
    sl('diagram', 'The same stages on AP and MP', {
      b: 'Stage I: **AP rising**. Stage II: **MP falling but positive**, ending at **MP = 0**. Stage III: **MP negative**.',
      v: vAPMPStages,
      n: 'On the average and marginal product diagram the stages are easy to see. In stage one average product keeps rising, with marginal product above it. In stage two both fall, and marginal product reaches zero at the end. In stage three marginal product is below the axis.',
    }),
    sl('concept', 'The three stages compared', {
      b: 'Learn each stage by what **TP, MP and AP** do, and where it **ends**.',
      v: vStages,
      n: 'This table brings the stages together. Stage one, increasing returns to the factor: total and average product rise. Stage two, diminishing returns: total product rises at a diminishing rate and marginal product falls to zero. Stage three, negative returns: marginal product is negative and total product falls.',
    }),
    sl('check', 'Quick check: Stage II', {
      b: 'True or false? In Stage II, marginal product of the variable factor is falling but remains positive.',
      chk: 'tf_stage2_mp',
      n: 'Stage two ends where total product stops rising. What is marginal product up to that point?',
    }),
    sl('concept', 'Why the stages happen', {
      b: '**Increasing returns:** fuller use of an **indivisible fixed factor**, **division of labour**.\n**Diminishing returns:** the fixed factor becomes **scarce**; factors are **imperfect substitutes**.\n**Negative returns:** **overcrowding** of the fixed factor.',
      v: vCauses,
      n: 'Why do the stages happen? At first, a big machine or a plot of land is under-used, and extra workers let it be used fully and let them specialise. Later the fixed factor becomes scarce compared with workers, and workers cannot fully replace land or machines. Finally, too many workers crowd the fixed factor and get in each other\'s way.',
    }),
    sl('example', 'Worked example 3: reading the Bastar diagram', {
      b: 'On the smooth curve of an imagined Bastar millet farm, find what happens at 3, 4.5 and 6 workers.',
      bl: ['Step 1 — At 3 workers MP peaks: TP\'s point of inflexion.', 'Step 2 — At 4.5 workers MP = AP: AP is highest.', 'Step 3 — At 6 workers MP = 0: TP is highest; beyond it is Stage III.'],
      v: vPoints,
      n: 'Read the key points. At three workers marginal product is at its peak of twenty-seven quintals, so total product turns from rising faster to rising slower. At four and a half workers marginal product equals average product, so average product is highest. At six workers marginal product is zero and total product peaks at one hundred and eight quintals.',
    }),
    sl('concept', 'The rational producer chooses Stage II', {
      b: 'In **Stage III** fewer workers would give **more output**; in **Stage I** the fixed factor is **under-used**. So a rational producer operates in **Stage II**; the exact point depends on **prices**.',
      v: vRational,
      n: 'Where should a sensible producer operate? Not in stage three, because there fewer workers would give more output at lower cost. Not in stage one, because there output per worker is still rising and the fixed factor is under-used, so it pays to add workers. So the producer works in stage two. Exactly where depends on wages and the price of output.',
    }),
    sl('check', 'Quick check: a crowded boat', {
      b: 'On a small Malvan fishing boat, a ninth crew member reduces the day\'s catch. This is…',
      chk: 'm_overcrowd',
      n: 'What is the marginal product of the ninth crew member, and which stage does that mark?',
    }),
    sl('concept', 'Returns to scale (meaning only)', {
      b: '**Returns to scale** describe how output changes when **all inputs** are changed in the **same proportion** in the **long run**.\n- **Increasing:** output rises in a **greater** proportion.\n- **Constant:** in the **same** proportion.\n- **Diminishing:** in a **smaller** proportion.',
      v: vRTSBars,
      n: 'Now let every input change together, which is only possible in the long run. If doubling all inputs more than doubles output, we have increasing returns to scale. If output exactly doubles, constant returns. If output less than doubles, diminishing returns. For this syllabus we need only the meaning of these three terms.',
    }),
    sl('example', 'Worked example 4: three factories double their inputs', {
      b: 'Each imagined factory doubles every input. Identify its returns to scale.',
      bl: ['Step 1 — Inputs rise by 100 per cent.', 'Step 2 — Find the percentage rise in output.', 'Step 3 — More than 100: increasing; 100: constant; less than 100: diminishing.'],
      v: vRTSTable,
      n: 'Compare the rise in output with the hundred per cent rise in inputs. The Kolhapur sugar mill\'s output rises one hundred and forty per cent: increasing returns to scale. The Ankleshwar paint plant\'s rises exactly one hundred per cent: constant returns. The Ludhiana cycle-parts unit\'s rises sixty per cent: diminishing returns.',
    }),
    sl('two-column', 'Returns to a factor versus returns to scale', {
      cols: [
        '**Returns to a factor:** short run, **one** input changes, factor proportion **changes**; increasing, diminishing and negative returns.',
        '**Returns to scale:** long run, **all** inputs change together, proportion **unchanged**; increasing, constant and diminishing returns.',
      ],
      v: vFactorScale,
      n: 'Do not mix the two ideas. Returns to a factor belong to the short run: one input changes and the proportion between factors changes. Returns to scale belong to the long run: every input changes in the same proportion, so the proportion stays the same. Their types also differ.',
    }),
    sl('check', 'Quick check: returns to scale', {
      b: 'Returns to scale describe how output changes when…',
      chk: 'm_rts_meaning',
      n: 'Think about how many inputs change and over what period.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up Part 2. As more of a variable factor is added to a fixed factor, its marginal product eventually diminishes. This gives three stages: increasing, diminishing and negative returns. A rational producer works in stage two. When all inputs change together in the long run, we speak of returns to scale instead.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'State the law with **"fixed factor"**, **"variable factor"** and **"eventually"**.',
        'Name each stage and say where it **ends**: AP maximum, then TP maximum (MP = 0).',
        'Give **causes**, not just descriptions: indivisibility, scarcity of the fixed factor, overcrowding.',
        'Rational producer: explain **why not Stage I** and **why not Stage III**.',
        'Returns to scale: **meaning and three types only**; never confuse them with returns to a factor.',
      ],
      n: 'When you state the law, include the fixed factor, the variable factor and the word eventually. Name each stage and where it ends. Explain why the stages happen. For the rational producer, rule out stage one and stage three with reasons. And keep returns to scale to its meaning and three types.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Production Function and Law of Variable Proportions — Notes',
  sections: [
    {
      h: '1. The production function',
      t: 1,
      b: 'A **production function** is the **technical relationship** between physical **inputs** and the **maximum physical output**, given **technology**: **Q = f(L, K)**.\n\n- **Fixed factor:** cannot be changed in the period (plant, heavy machines).\n- **Variable factor:** can be changed (labour, raw materials).',
      terms: [['Production function', 'The technical relation between physical inputs and maximum physical output, for given technology.'], ['Fixed factor', 'An input whose quantity cannot be changed in the period considered.']],
      v: vPF,
      vs: [vFixedVar],
    },
    {
      h: '2. Short run and long run',
      t: 1,
      b: '- **Short run:** at least one factor fixed; output changes by changing the variable factor, so the **factor proportion changes**. This gives **returns to a factor**.\n- **Long run:** **all factors variable**; inputs can change in the same proportion. This gives **returns to scale**.',
      terms: [['Short run', 'A period in which at least one factor of production is fixed.'], ['Long run', 'A period long enough for all factors of production to be varied.']],
      v: vSRLR,
    },
    {
      h: '3. Total, average and marginal product',
      t: 2,
      b: '- **TP** = total output of the variable factor = **ΣMP**.\n- **AP = TP ÷ L**.\n- **MP = TPn − TPn−1** (= ΔTP ÷ ΔL).\n\nExample: an imagined Nagpur packing shed packs 51 crates with 3 workers and 68 with 4, so the fourth worker\'s MP is 17 and AP with 4 workers is 17.',
      terms: [['Average product', 'Output per unit of the variable factor, TP ÷ L.'], ['Marginal product', 'The change in total product from one more unit of the variable factor.']],
      v: vNag,
      vs: [vDefs, vThan],
    },
    {
      h: '4. Relationships among TP, AP and MP',
      t: 2,
      b: '**TP and MP:** MP rising → TP rises at an increasing rate (to the **point of inflexion**); MP falling but positive → TP rises at a diminishing rate; **MP = 0 → TP maximum**; MP negative → TP falls.\n\n**AP and MP:** MP > AP → AP rises; **MP = AP → AP maximum** (MP cuts AP at its peak); MP < AP → AP falls. MP can be negative; AP stays positive while TP is positive.',
      terms: [['Point of inflexion', 'The point on the TP curve where it changes from rising at an increasing rate to rising at a diminishing rate; MP is maximum there.']],
      v: vTPMP,
      vs: [vAPMPRel, vTP, vAPMP],
    },
    {
      h: '5. The Law of Variable Proportions and its stages',
      t: 3,
      b: '**Statement:** as more units of a variable factor are combined with a fixed factor, MP may rise at first but **eventually diminishes** and can become **negative**.\n\n**Assumptions:** constant technology; at least one fixed factor; homogeneous units of the variable factor; short period.\n\n**Stages** (convention used here): **I** — increasing returns, to the maximum of AP; **II** — diminishing returns, to the maximum of TP (MP = 0); **III** — negative returns. Some books end Stage I at the point of inflexion.\n\n**Causes:** indivisibility of the fixed factor and division of labour; scarcity of the fixed factor and imperfect substitution; overcrowding.\n\n**Rational producer:** operates in **Stage II**, where both factors have positive marginal products; the exact point depends on prices.',
      terms: [['Law of Variable Proportions', 'In the short run, the marginal product of a variable factor added to a fixed factor eventually diminishes.'], ['Negative returns', 'The stage in which an extra unit of the variable factor reduces total product.']],
      v: vStages,
      vs: [vTPStages, vAPMPStages, vAssumptions, vCauses],
    },
    {
      h: '6. Returns to scale (meaning only)',
      t: 4,
      b: '**Returns to scale:** the response of output when **all inputs** change in the **same proportion** in the **long run**.\n- **Increasing:** output rises more than in proportion.\n- **Constant:** in the same proportion.\n- **Diminishing:** less than in proportion.\n\nReturns to scale differ from returns to a factor (short run, one input varied).',
      terms: [['Returns to scale', 'How output changes when all inputs are changed in the same proportion in the long run.']],
      v: vRTSTable,
      vs: [vFactorScale, vRTSBars],
    },
  ],
  tips: '**Common mistakes**\n- Writing that TP falls when MP falls; TP falls only when MP is negative.\n- Drawing MP cutting AP anywhere other than AP\'s highest point.\n- Saying AP becomes negative; only MP can.\n- Explaining diminishing returns by "less efficient workers"; the law assumes homogeneous units.\n- Mixing returns to a factor (short run, one input) with returns to scale (long run, all inputs).\n\n**How marks are usually awarded**\n- 1 mark: one correct option or term.\n- 2 marks: two points, or a calculation with its formula.\n- 3 marks: three explained points, or a schedule with an interpretation.\n- 5 marks: parts in order, with a described diagram and reasons.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['**Production function**', 'Technical relation between physical inputs and maximum physical output, given technology: Q = f(L, K).', 'definition', 1],
  ['**Fixed factor**', 'Cannot be changed in the period: buildings, heavy machines.', 'definition', 1],
  ['**Variable factor**', 'Can be changed within the period: workers, raw materials.', 'definition', 1],
  ['**Short run**', 'At least one factor fixed; returns to a factor apply.', 'definition', 1],
  ['**Long run**', 'All factors variable; returns to scale apply.', 'definition', 1],
  ['**Total product**', 'Total output of the variable factor; the sum of marginal products.', 'definition', 2],
  ['**Average product**', 'AP = TP ÷ L.', 'formula', 2],
  ['**Marginal product**', 'MP = TPn − TPn−1.', 'formula', 2],
  ['Nagpur shed: 51 crates (3 workers), 68 (4)', 'MP of the 4th = **17**; AP with 4 = **17**.', 'example', 2],
  ['TP from MP', 'Add the marginal products cumulatively.', 'concept', 2],
  ['MP rising', 'TP rises at an **increasing** rate.', 'concept', 2],
  ['MP falling but positive', 'TP rises at a **diminishing** rate.', 'concept', 2],
  ['MP = 0', 'TP is at its **maximum**.', 'concept', 2],
  ['MP negative', 'TP **falls**.', 'concept', 2],
  ['MP and AP', 'MP > AP: AP rises; MP = AP: AP maximum; MP < AP: AP falls.', 'concept', 2],
  ['Can AP be negative?', '**No**, not while TP is positive; only MP can be negative.', 'exam-tip', 2],
  ['**Point of inflexion**', 'Where TP stops rising at an increasing rate; MP is maximum.', 'definition', 3],
  ['**Law of Variable Proportions**', 'Adding a variable factor to a fixed factor: MP eventually diminishes.', 'definition', 3],
  ['Assumptions of the law', 'Constant technology; one factor fixed; homogeneous units; short period.', 'fact', 3],
  ['**Stage I**', 'Increasing returns: AP rising; ends at AP maximum (this course\'s convention).', 'concept', 3],
  ['**Stage II**', 'Diminishing returns: MP falling but positive; ends where TP is maximum.', 'concept', 3],
  ['**Stage III**', 'Negative returns: MP negative, TP falls.', 'concept', 3],
  ['Cause of increasing returns', 'Fuller use of an indivisible fixed factor; division of labour.', 'concept', 3],
  ['Cause of diminishing returns', 'Fixed factor scarce relative to the variable factor; imperfect substitution.', 'concept', 3],
  ['Cause of negative returns', 'Overcrowding of the fixed factor.', 'concept', 3],
  ['Rational producer', 'Operates in **Stage II**; never in Stage III.', 'exam-tip', 3],
  ['**Returns to scale**', 'Output response when **all** inputs change in the same proportion (long run).', 'definition', 4],
  ['Increasing, constant, diminishing returns to scale', 'Output rises more than, equal to, or less than in proportion to inputs.', 'definition', 4],
  ['Kolhapur mill doubles inputs: 400 → 960', `Output +${rtsPct(RTS[0])} per cent: **increasing** returns to scale.`, 'example', 4],
  ['Returns to a factor vs returns to scale', 'Short run, one input, proportion changes vs long run, all inputs, proportion unchanged.', 'exam-tip', 4],
]);

// ---------------------------------------------------------------- tests (isc-12-default blueprints)
const T_SHORT = test({
  kind: 'short',
  blueprint: 'isc-12-default-chapter-test-short',
  title: 'Chapter test (short) — Production Function and Law of Variable Proportions',
  duration: 50,
  sections: [
    { id: 'A', title: 'Section A — Objective (5 marks)', instr: 'Answer all questions. Each carries 1 mark. Choose the correct option.', items: ['m_pf_meaning', 'm_bake_mp', 'm_tp_max', 'm_stage3', 'ar_mp_zero'] },
    { id: 'B', title: 'Section B — Short answer (4 marks)', instr: 'Answer both questions in about 30–50 words each. Question 7 has an internal choice.', items: ['s_sr_lr', { attempt: 1, keys: ['s_tp_mp_link', 's_lvp_assumptions'] }] },
    { id: 'C', title: 'Section C — Short answer (6 marks)', instr: 'Answer both questions in about 50–80 words each. Question 9 has an internal choice.', items: ['s3_ap_mp_rel', { attempt: 1, keys: ['s3_three_stages', 's3_rts_three'] }] },
    { id: 'D', title: 'Section D — Long answer (5 marks)', instr: 'Answer the question in parts, with a described diagram.', items: ['l_lvp_full'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'isc-12-default-chapter-test-long',
  title: 'Chapter test (long) — Production Function and Law of Variable Proportions',
  duration: 100,
  sections: [
    { id: 'A', title: 'Section A — Objective (12 marks)', instr: 'Answer all questions. Each carries 1 mark. Choose the correct option.', items: ['m_fixed_factor', 'm_long_run', 'm_mp_meaning', 'm_ap_max', 'm_tp_rising_slowly', 'm_ap_negative', 'm_lvp_statement', 'm_rational', 'm_cause_diminishing', 'm_rts_kolhapur', 'ar_rational_stage', 'ar_rts_crs'] },
    { id: 'B', title: 'Section B — Short answer (6 marks)', instr: 'Answer all three questions in about 30–50 words each. Question 15 has an internal choice.', items: ['s_fixed_var', 's_mp_ap_calc', { attempt: 1, keys: ['s_stage3_why', 's_factor_scale'] }] },
    { id: 'C', title: 'Section C — Short answer (12 marks)', instr: 'Answer all four questions in about 50–80 words each. Question 19 has an internal choice.', items: ['s3_nag_schedule', 's3_causes', 's3_than_tp', { attempt: 1, keys: ['s3_rational_stage2', 's3_ap_from_mp'] }] },
    { id: 'D', title: 'Section D — Long answer (10 marks)', instr: 'Answer question 20, and either question 21 or question 22, in parts with described diagrams.', items: ['l_curves_relation', { attempt: 1, keys: ['l_than_schedule', 'l_rational_causes'] }] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t04 of isc-12-economics-ch07 only (production function, short and long run; TP, AP and MP and their relationships; Law of Variable Proportions with assumptions, stages, causes and the rational producer; returns to scale, meaning only). Removed topics honoured: no item asks for the stages from an LVP schedule; returns to scale is meaning only',
    style: 'ISC 2027 Economics specimen pattern (sources/cisce.md isc-2027-specimen-856-economics): 1-mark MCQs, assertion-reason with option (d) both false, 4-mark (2 + 2) and 8-mark (4 + 4) bank items; chapter tests on the isc-12-default blueprints',
    originality: 'every firm, farm, town, figure and case written for this chapter (imagined); no textbook, specimen or past-paper item reused (the specimen\'s returns-to-scale image item is not used)',
    data: `figures computed in questions.mjs and asserted: TP = 9L² − L³ with MP maximum at 3 workers (${MP(L_INFLEX)}), AP = MP = ${AP(L_APMAX)} at 4.5 workers, TP maximum ${TP(L_TPMAX)} at 6 workers; Nagpur MP ${NAG_MP.join(', ')} and AP ${NAG_AP.join(', ')}; Thanjavur TP ${THAN_TP.join(', ')}; bakery MP ${BAKE_MP}, AP ${BAKE_AP1}; returns to scale ${RTS.map((x) => `${rtsPct(x)}%`).join(', ')}; SVG curves drawn from their equations`,
    gate: 'schema, pipeline lint (lintExemplar), deterministic verify checks, the answer-leak scan and the exact-stem originality pre-check run clean on this chapter',
  },
});
