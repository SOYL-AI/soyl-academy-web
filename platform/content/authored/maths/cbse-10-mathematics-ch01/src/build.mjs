// Build CBSE 10 Mathematics ch01 Real Numbers. Run from platform/:
//   npx tsx content/authored/maths/cbse-10-mathematics-ch01/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, topic, r, deck, sl, plot, table, flow, geom, factorTree, build, chapterTests, lcmN, round3 } from './lib.mjs';

setUnit('cbse-10-mathematics-ch01');
await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- figures
const tree360 = factorTree(360);
const tree360b = factorTree(360, { first: [10, 36] });
function sideBySide(a, b, gap = 0.8) {
  const pts = {};
  for (const [k, p] of Object.entries(a.points)) pts[`a${k}`] = p;
  for (const [k, p] of Object.entries(b.points)) pts[`b${k}`] = { ...p, at: [round3(p.at[0] + a.width + gap), round3(p.at[1] + (a.height - b.height))] };
  return {
    width: round3(a.width + gap + b.width), height: Math.max(a.height, b.height), points: pts,
    segments: [...a.segments.map((s) => ({ from: `a${s.from}`, to: `a${s.to}` })), ...b.segments.map((s) => ({ from: `b${s.from}`, to: `b${s.to}` }))],
  };
}
const tree2 = sideBySide(tree360, tree360b);
const tree420 = factorTree(420);
const tree7056 = factorTree(7056);
const tree1176 = factorTree(1176);

/** Two-circle diagram: primes of a only, common primes, primes of b only. */
function venn(aLabel, bLabel, onlyA, common, onlyB) {
  const points = { A: { at: [3, 2.6], label: aLabel, label_position: 'nw' }, B: { at: [6, 2.6], label: bLabel, label_position: 'ne' } };
  const col = (xs, x, key) => xs.forEach((v, i) => { points[`${key}${i}`] = { at: [x, round3(2.6 + (xs.length - 1) * 0.3 - i * 0.6)], label: v }; });
  col(onlyA, 1.9, 'L'); col(common, 4.5, 'I'); col(onlyB, 7.1, 'R');
  return { width: 9, height: 5.4, points, circles: [{ center: 'A', radius: 2 }, { center: 'B', radius: 2 }] };
}
const venn72 = venn('72', '120', ['3'], ['2', '2', '2', '3'], ['5']);
const venn336 = venn('336', '180', ['2', '2', '7'], ['2', '2', '3'], ['3', '5']);

// √2 on the number line: 2 drawing units = 1
const s = 2, R2 = round3(2 * Math.SQRT2);
const numberLine = {
  width: 10.4, height: 6.3,
  points: {
    L: { at: [0.4, 3], label: false }, M: { at: [1, 3], label: '−1' }, O: { at: [3, 3], label: '0' }, A: { at: [5, 3], label: '1' },
    T: { at: [7, 3], label: '2' }, U: { at: [9, 3], label: '3' }, Rr: { at: [10, 3], label: false }, B: { at: [5, 5], label: false },
    P: { at: [round3(3 + R2), 3], label: '√2', label_position: 'se' },
  },
  segments: [{ from: 'L', to: 'Rr' }, { from: 'O', to: 'A', label: '1' }, { from: 'A', to: 'B', label: '1' }, { from: 'O', to: 'B', dashed: true }],
  angles: [{ at: 'A', from: 'O', to: 'B', right: true }],
  circles: [{ center: 'O', radius: R2 }],
};
const squareDiag = {
  width: 6, height: 4.4,
  points: { A: [1.5, 0.7], B: [4.5, 0.7], C: [4.5, 3.7], D: [1.5, 3.7] },
  segments: [{ from: 'A', to: 'B', label: '1 m' }, { from: 'B', to: 'C', label: '1 m' }, { from: 'C', to: 'D' }, { from: 'D', to: 'A' }, { from: 'A', to: 'C', label: '√2 m', dashed: true }],
  angles: [{ at: 'B', from: 'A', to: 'C', right: true }],
  polygons: [{ vertices: ['A', 'B', 'C'], highlight: 'shade' }],
};
const busPlot = plot({
  x: [0, 380], y: [0, 4], xl: 'minutes after 6:00 a.m.', yl: 'route',
  series: [
    { label: 'Route 1 (every 18 min)', kind: 'scatter', points: Array.from({ length: 21 }, (_, i) => [18 * i, 3]) },
    { label: 'Route 2 (every 24 min)', kind: 'scatter', points: Array.from({ length: 16 }, (_, i) => [24 * i, 2]) },
    { label: 'Route 3 (every 30 min)', kind: 'scatter', points: Array.from({ length: 13 }, (_, i) => [30 * i, 1]) },
  ],
  pts: [[360, 3.6, '360 min: all three together', 'free']],
}, 'Departure times of three bus routes plotted as dots on three rows: route 1 every 18 minutes, route 2 every 24 minutes, route 3 every 30 minutes. The first time after the start when all three rows have a dot at the same minute is 360 minutes, which is 12 noon.', 'Departures line up again at the least common multiple, 360 minutes.');

const proofFlow = (p) => flow('TB', [
  ['s1', r`Assume $\sqrt{${p}} = \dfrac ab$, $a, b$ co-prime, $b \ne 0$`],
  ['s2', r`Square: $${p}b^2 = a^2$`],
  ['s3', r`$${p} \mid a^2 \Rightarrow ${p} \mid a$ ($${p}$ is prime)`],
  ['s4', r`Put $a = ${p}c$: $b^2 = ${p}c^2$`],
  ['s5', r`$${p} \mid b^2 \Rightarrow ${p} \mid b$`],
  ['s6', r`$${p}$ divides both $a$ and $b$: contradiction`],
  ['s7', r`So $\sqrt{${p}}$ is irrational`],
], [['s1', 's2'], ['s2', 's3'], ['s3', 's4'], ['s4', 's5'], ['s5', 's6'], ['s6', 's7']],
`Proof chain for the square root of ${p}: assume it equals a over b in lowest terms, square to get ${p} b squared equals a squared, deduce ${p} divides a, substitute a equals ${p} c, deduce ${p} divides b, reach a contradiction with lowest terms, conclude irrational.`,
'Every irrationality proof in this chapter follows this chain.');

// ---------------------------------------------------------------- deck 1
const d1 = deck({
  part: 1,
  title: 'Real Numbers — Part 1: Prime factorisation, HCF and LCM',
  goals: [
    'Express a composite number as a product of primes using a factor tree or repeated division',
    'State the Fundamental Theorem of Arithmetic and explain why the factorisation is unique',
    'Find the HCF and LCM of two or three numbers by prime factorisation',
    'Verify HCF × LCM = product for two numbers and know when it fails',
    'Solve word problems on bells, buses, tiles and packing using HCF and LCM',
  ],
  slides: [
    sl('title', 'Real Numbers, Part 1: Primes, HCF and LCM', {
      b: 'Every whole number greater than 1 is built from primes — in exactly one way.',
      v: geom(tree420, 'Factor tree of 420: 420 splits into 2 and 210, 210 into 2 and 105, 105 into 3 and 35, and 35 into 5 and 7. The leaves are the primes 2, 2, 3, 5 and 7.', '$420 = 2^2 \\times 3 \\times 5 \\times 7$'),
      n: 'Welcome to Real Numbers, part one. On the screen, the number four hundred and twenty breaks down, branch by branch, until only primes are left. Primes are the atoms of arithmetic. In this lesson you will see that every number has exactly one set of prime atoms, and then use them to find highest common factors and lowest common multiples quickly, even for large numbers.',
    }),
    sl('concept', 'What you will be able to do', {
      ul: ['Break any composite number into primes', 'State the **Fundamental Theorem of Arithmetic**', 'Find **HCF** and **LCM** from prime factorisations', 'Use $\\text{HCF} \\times \\text{LCM} = $ product — for **two** numbers only', 'Solve bells, buses, tiles and packing problems'],
      n: 'Here are your goals. Notice the warning in the fourth goal: a famous shortcut works for two numbers but fails for three, and examiners love to test that. By the end you will also know how to tell, just from the wording of a word problem, whether it wants the highest common factor or the lowest common multiple.',
    }),
    sl('diagram', 'Primes and composites', {
      b: 'A **prime** has exactly two factors, 1 and itself. A **composite** number has more than two factors. The number 1 is neither.',
      v: table(['Number', 'Factors', 'Type'], [['$1$', '$1$', 'neither'], ['$2$', '$1, 2$', 'prime (the only even prime)'], ['$9$', '$1, 3, 9$', 'composite'], ['$13$', '$1, 13$', 'prime'], ['$21$', '$1, 3, 7, 21$', 'composite'], ['$29$', '$1, 29$', 'prime']], 'Table classifying numbers by their factors: 1 has one factor and is neither prime nor composite; 2, 13 and 29 have exactly two factors and are prime; 9 and 21 have more than two factors and are composite.', 'Count the factors to decide.'),
      n: 'Count factors to decide. Two factors exactly, and the number is prime. More than two, and it is composite. The number one has only one factor, so it is neither, and that is why it is never written in a prime factorisation. Also remember that two is the only even prime, because every larger even number has two as an extra factor.',
    }),
    sl('diagram', 'Building a factor tree', {
      b: 'Split off the smallest prime again and again until every branch ends in a prime.',
      v: geom(tree360, 'Factor tree of 360 taking out the smallest prime each time: 360 = 2 × 180, 180 = 2 × 90, 90 = 2 × 45, 45 = 3 × 15, 15 = 3 × 5. The leaves are 2, 2, 2, 3, 3 and 5.', '$360 = 2^3 \\times 3^2 \\times 5$'),
      m: ['360 = 2 \\times 2 \\times 2 \\times 3 \\times 3 \\times 5 = 2^3 \\times 3^2 \\times 5'],
      n: 'Start with three hundred and sixty. It is even, so take out a two. Keep taking out twos while you can: one hundred and eighty, ninety, forty five. Forty five is odd, so try three: fifteen, then five. Every branch now ends in a prime. Collect them and use powers to write the answer neatly: two cubed, times three squared, times five.',
    }),
    sl('diagram', 'Different trees, same primes', {
      b: 'Start the tree differently and you still end with the same primes.',
      v: geom(tree2, 'Two factor trees of 360. Left: 360 = 2 × 180, continuing with 2, 2, 3, 3, 5. Right: 360 = 10 × 36, with 10 = 2 × 5 and 36 = 2 × 18 = 2 × 2 × 9 = 2 × 2 × 3 × 3. Both end with three 2s, two 3s and one 5.', 'Left: smallest prime first. Right: $360 = 10 \\times 36$ first. Same leaves: $2, 2, 2, 3, 3, 5$.'),
      n: 'Here is a surprise worth noticing. On the right, someone started with ten times thirty six instead. The tree looks completely different, yet the leaves are the same: three twos, two threes and one five. Try it yourself with any starting split. You will always land on the same primes. That is not luck. It is a theorem.',
    }),
    sl('concept', 'The Fundamental Theorem of Arithmetic', {
      b: 'Every composite number can be written as a product of primes, and this factorisation is **unique**, apart from the order of the factors.',
      m: ['n = p_1^{a_1} \\times p_2^{a_2} \\times \\cdots \\times p_k^{a_k}, \\quad p_1 < p_2 < \\cdots < p_k \\text{ primes}'],
      ul: ['**Existence:** keep splitting until only primes remain', '**Uniqueness:** no number has two different prime factorisations', 'So $4 \\times 630$ is **not** another factorisation of $2520$: $4$ and $630$ are not prime'],
      n: 'The theorem has two halves. Existence says you can always finish a factor tree. Uniqueness says everyone finishes with the same primes, raised to the same powers. Writing the primes in increasing order gives one standard form. Uniqueness is the powerful half: it lets us say with certainty that a number has no hidden factor of two, or of five.',
    }),
    sl('check', 'Quick check: factorise', {
      b: 'Choose the correct prime factorisation.',
      chk: 'm01',
      n: 'Divide by two as many times as you can, then try three, then seven. Count how many twos you took out. Then multiply your answer back to check it really gives the number.',
    }),
    sl('example', 'Worked example 1: is 7056 a perfect square?', {
      b: 'Use prime factorisation to decide whether $7056$ is a perfect square, and find its square root if it is.',
      ul: ['**Step 1 —** $7056 = 2^4 \\times 441 = 2^4 \\times 3^2 \\times 49 = 2^4 \\times 3^2 \\times 7^2$.', '**Step 2 —** Every exponent ($4, 2, 2$) is even, so $7056$ is a perfect square.', '**Step 3 —** Halve each exponent: $\\sqrt{7056} = 2^2 \\times 3 \\times 7 = 84$.', '**Check —** $84 \\times 84 = 7056$. ✓'],
      v: geom(tree7056, 'Factor tree of 7056: four splits by 2 give 441, then 441 = 3 × 147, 147 = 3 × 49, 49 = 7 × 7. The leaves are four 2s, two 3s and two 7s.', '$7056 = 2^4 \\times 3^2 \\times 7^2$'),
      n: 'A perfect square is a number times itself, so every prime appears an even number of times. After factorising, just look at the exponents. Four, two and two are all even, so yes. Halving each exponent gives the square root directly, eighty four. This trick also tells you what to multiply by to make a number a perfect square: make every exponent even.',
    }),
    sl('diagram', 'Exponents tell you the shape of a number', {
      v: table(['Number', 'Prime factorisation', 'Perfect square?', 'Perfect cube?'], [['$144$', '$2^4 \\times 3^2$', 'yes (all even)', 'no'], ['$216$', '$2^3 \\times 3^3$', 'no', 'yes (all multiples of 3)'], ['$729$', '$3^6$', 'yes', 'yes'], ['$1188$', '$2^2 \\times 3^3 \\times 11$', 'no: multiply by $3 \\times 11$', 'no']], 'Table of four numbers with their prime factorisations: 144 has even exponents so it is a perfect square; 216 has exponents that are multiples of 3 so it is a cube; 729 is 3 to the power 6 so it is both; 1188 needs to be multiplied by 33 to become a perfect square.', 'Square: all exponents even. Cube: all exponents multiples of 3.'),
      b: 'Read squares and cubes straight from the exponents.',
      n: 'This table turns the idea into a quick test. Square means every exponent is even. Cube means every exponent is a multiple of three. Seven hundred and twenty nine is three to the power six, and six is both even and a multiple of three, so it is both a square and a cube. For eleven eighty eight, the odd exponents tell you exactly which primes are missing.',
    }),
    sl('diagram', 'HCF and LCM from prime factors', {
      b: '**HCF:** common primes, **smaller** power. **LCM:** every prime, **greater** power.',
      v: geom(venn72, 'Two overlapping circles. The left circle, 72, contains the primes 2, 2, 2, 3, 3; the right circle, 120, contains 2, 2, 2, 3, 5. The overlap holds the shared primes 2, 2, 2 and 3. The left-only region holds an extra 3 and the right-only region holds 5.', 'Overlap $= 2^3 \\times 3 = 24 =$ HCF. Everything $= 2^3 \\times 3^2 \\times 5 = 360 =$ LCM.'),
      m: ['72 = 2^3 \\times 3^2, \\qquad 120 = 2^3 \\times 3 \\times 5'],
      n: 'Picture the primes of each number in a circle. The primes they share sit in the overlap, and multiplying them gives the highest common factor, twenty four. Multiplying everything in the picture, overlap counted once, gives the lowest common multiple, three hundred and sixty. In exponent language: smaller power of common primes for the factor, greater power of every prime for the multiple.',
    }),
    sl('diagram', 'The exponent table method', {
      v: table(['Prime', 'Power in $72$', 'Power in $120$', 'HCF: smaller', 'LCM: greater'], [['$2$', '$3$', '$3$', '$3$', '$3$'], ['$3$', '$2$', '$1$', '$1$', '$2$'], ['$5$', '$0$', '$1$', '$0$', '$1$']], 'Exponent table for 72 and 120. Prime 2: powers 3 and 3, HCF takes 3, LCM takes 3. Prime 3: powers 2 and 1, HCF takes 1, LCM takes 2. Prime 5: powers 0 and 1, HCF takes 0, LCM takes 1.', 'HCF $= 2^3 \\times 3 = 24$; LCM $= 2^3 \\times 3^2 \\times 5 = 360$.'),
      b: 'Write a missing prime as power $0$. Then pick the smaller or the greater power, row by row.',
      n: 'For bigger problems, a table keeps you safe. One row per prime, one column per number. A prime that does not appear gets power zero. For the highest common factor, take the smaller power in each row, so a zero knocks that prime out. For the lowest common multiple, take the greater power. This works for three numbers too: just add a column.',
    }),
    sl('example', 'Worked example 2: HCF and LCM of 336 and 180', {
      b: 'Find the HCF and LCM of $336$ and $180$, and check your answer.',
      ul: ['**Step 1 —** $336 = 2^4 \\times 3 \\times 7$ and $180 = 2^2 \\times 3^2 \\times 5$.', '**Step 2 —** Common primes $2, 3$ with smaller powers: HCF $= 2^2 \\times 3 = 12$.', '**Step 3 —** All primes, greater powers: LCM $= 2^4 \\times 3^2 \\times 5 \\times 7 = 5040$.', '**Check —** $12 \\times 5040 = 60480$ and $336 \\times 180 = 60480$. ✓'],
      v: geom(venn336, 'Two overlapping circles. 336 has primes 2, 2, 2, 2, 3, 7 and 180 has primes 2, 2, 3, 3, 5. The overlap holds 2, 2 and 3. The 336-only region holds 2, 2 and 7; the 180-only region holds 3 and 5.', 'Overlap: $2^2 \\times 3 = 12$. All together: $2^4 \\times 3^2 \\times 5 \\times 7 = 5040$.'),
      n: 'Factorise both numbers first and write the powers clearly. Seven appears only in three thirty six, and five only in one eighty, so neither can be in the highest common factor. Both must be in the lowest common multiple. The final check is quick and worth a mark in your head: the highest common factor times the lowest common multiple should equal the product of the two numbers.',
    }),
    sl('diagram', 'Why HCF × LCM = product, for two numbers', {
      b: 'For each prime, the smaller power plus the greater power equals the sum of both powers.',
      v: table(['Prime', '$336$', '$180$', 'smaller + greater', 'sum'], [['$2$', '$4$', '$2$', '$2 + 4 = 6$', '$6$'], ['$3$', '$1$', '$2$', '$1 + 2 = 3$', '$3$'], ['$5$', '$0$', '$1$', '$0 + 1 = 1$', '$1$'], ['$7$', '$1$', '$0$', '$0 + 1 = 1$', '$1$']], 'For 336 and 180, each prime row shows that the smaller exponent plus the greater exponent equals the sum of the two exponents: for 2, 2 plus 4 equals 6; for 3, 1 plus 2 equals 3; for 5 and 7, 0 plus 1 equals 1.', 'So $\\text{HCF} \\times \\text{LCM} = 336 \\times 180$, prime by prime.'),
      m: ['\\text{HCF}(a, b) \\times \\text{LCM}(a, b) = a \\times b'],
      n: 'Why does the shortcut work? Look at any one prime. The factor uses the smaller power, the multiple uses the greater power, and together they use both powers once. That is exactly what the product of the two numbers uses. Every row matches, so the whole products match. Use this to find a missing number: divide the product by the highest common factor.',
    }),
    sl('check', 'Quick check: use the product rule', {
      b: 'Two numbers, their product and their HCF are given. Find the LCM.',
      chk: 'n03',
      n: 'Which three quantities does the rule connect? Write the rule first, put in the two numbers you know, and then divide. No need to find the original numbers.',
    }),
    sl('diagram', 'Careful: three numbers break the rule', {
      v: table(['Numbers', 'HCF', 'LCM', 'HCF × LCM', 'Product'], [['$4, 6$', '$2$', '$12$', '$24$', '$24$ ✓'], ['$4, 6, 10$', '$2$', '$60$', '$120$', '$240$ ✗'], ['$6, 10, 15$', '$1$', '$30$', '$30$', '$900$ ✗']], 'Table showing the product rule works for the pair 4 and 6, where 24 equals 24, but fails for the triples 4, 6, 10, where 120 is not 240, and 6, 10, 15, where 30 is not 900.', 'Never use HCF × LCM = product for three or more numbers.'),
      b: 'With three numbers, the **middle** power of each prime is used by neither the HCF nor the LCM.',
      n: 'Here is the trap. For four, six and ten, the product of factor and multiple is one hundred and twenty, but the product of the numbers is two hundred and forty. The reason is the middle power. With three numbers, the factor takes the smallest power and the multiple takes the largest, so the middle one is lost. Use the rule for two numbers only.',
    }),
    sl('example', 'Worked example 3: three numbers', {
      b: 'Find the HCF and LCM of $48$, $72$ and $108$.',
      ul: ['**Step 1 —** $48 = 2^4 \\times 3$, $72 = 2^3 \\times 3^2$, $108 = 2^2 \\times 3^3$.', '**Step 2 —** HCF: smallest powers, $2^2 \\times 3 = 12$.', '**Step 3 —** LCM: greatest powers, $2^4 \\times 3^3 = 432$.', '**Contrast —** $12 \\times 432 = 5184$, but $48 \\times 72 \\times 108 = 373248$. The product rule does not apply.'],
      v: table(['Prime', '$48$', '$72$', '$108$', 'HCF', 'LCM'], [['$2$', '$4$', '$3$', '$2$', '$2$', '$4$'], ['$3$', '$1$', '$2$', '$3$', '$1$', '$3$']], 'Exponent table for 48, 72 and 108: prime 2 has powers 4, 3, 2 so the HCF takes 2 and the LCM takes 4; prime 3 has powers 1, 2, 3 so the HCF takes 1 and the LCM takes 3.', 'HCF $= 2^2 \\times 3 = 12$, LCM $= 2^4 \\times 3^3 = 432$.'),
      n: 'With three numbers, the exponent table is your best friend. For the factor, take the smallest power in each row. For the multiple, take the largest. Notice the contrast line: the two answers multiplied give about five thousand, while the three numbers multiplied give more than three lakh. So if a question gives you three numbers, find both answers separately.',
    }),
    sl('diagram', 'HCF or LCM? Read the question', {
      v: flow('TB', [['q', 'What does the problem ask for?'], ['h', 'Largest size that **divides** all exactly (cut, pack, tile, arrange in rows)'], ['l', 'Smallest quantity that all **divide into** (together again, ring together, meet again)'], ['H', 'Find the **HCF**'], ['L', 'Find the **LCM**'], ['c', 'Check: HCF ≤ smallest number ≤ largest number ≤ LCM']], [['q', 'h', 'Biggest piece or group'], ['q', 'l', 'First repeat in time'], ['h', 'H'], ['l', 'L'], ['H', 'c'], ['L', 'c']], 'Decision chart: if the problem asks for the largest size that divides all the quantities exactly, such as cutting, packing, tiling or arranging, find the HCF; if it asks for the smallest quantity or first time when events coincide, such as bells ringing or buses leaving together, find the LCM. Then check that the HCF is at most the smallest number and the LCM at least the largest.', 'Size of a piece → HCF. When things happen together again → LCM.'),
      b: 'Ask: am I **splitting** quantities into equal pieces, or **waiting** for events to line up?',
      n: 'Word problems hide the operation in their wording. If you are cutting, packing, tiling or arranging into equal groups, and want the biggest piece, that is the highest common factor. If you are waiting for bells, lights or buses to coincide again, that is the lowest common multiple. Then sense check: a factor cannot be bigger than the numbers, and a multiple cannot be smaller.',
    }),
    sl('example', 'Worked example 4: buses leaving together', {
      b: 'From Majestic bus station in Bengaluru, buses on three routes leave every $18$, $24$ and $30$ minutes. All three leave at 6:00 a.m. When do they next leave together?',
      ul: ['**Step 1 —** "Next together" → LCM.', '**Step 2 —** $18 = 2 \\times 3^2$, $24 = 2^3 \\times 3$, $30 = 2 \\times 3 \\times 5$.', '**Step 3 —** LCM $= 2^3 \\times 3^2 \\times 5 = 360$ minutes $= 6$ hours.', '**Answer —** 12:00 noon. **Check —** $360 \\div 18 = 20$, $360 \\div 24 = 15$, $360 \\div 30 = 12$: all whole.'],
      v: busPlot,
      n: 'Look at the dot chart. Each row is one route, and each dot is a departure. The rows have dots at different rhythms, and the first time all three rows have a dot in the same column is three hundred and sixty minutes. That is six hours, so twelve noon. Always convert your answer back into a clock time if the question gives one.',
    }),
    sl('example', 'Worked example 5: cutting ribbons', {
      b: 'A tailor in Surat has ribbons $252$ cm and $336$ cm long. She cuts both into pieces of equal length, as long as possible, with nothing left over. Find the piece length and the number of pieces.',
      ul: ['**Step 1 —** Equal pieces with nothing left → the length divides both → HCF.', '**Step 2 —** $252 = 2^2 \\times 3^2 \\times 7$, $336 = 2^4 \\times 3 \\times 7$.', '**Step 3 —** HCF $= 2^2 \\times 3 \\times 7 = 84$ cm.', '**Step 4 —** Pieces $= \\dfrac{252}{84} + \\dfrac{336}{84} = 3 + 4 = 7$.'],
      v: table(['Ribbon', 'Length (cm)', 'Pieces of $84$ cm'], [['First', '$252 = 2^2 \\times 3^2 \\times 7$', '$3$'], ['Second', '$336 = 2^4 \\times 3 \\times 7$', '$4$'], ['Total', '', '$7$']], 'Table: the 252 centimetre ribbon gives 3 pieces of 84 centimetres and the 336 centimetre ribbon gives 4 pieces, 7 pieces in all.', 'The longest common piece is the HCF, 84 cm.'),
      n: 'Here we are cutting, so we want the biggest length that divides both ribbons exactly: the highest common factor, eighty four centimetres. Many students stop there, but the question also asks for the number of pieces. Divide each ribbon by eighty four and add. Always reread the question at the end to make sure you have answered every part.',
    }),
    sl('check', 'Quick check: traffic signals', {
      b: 'Three signals turn green at different intervals. When are they green together again?',
      chk: 'm09',
      n: 'Is this a cutting problem or a waiting problem? Decide that first, then factorise the three intervals and choose your powers.',
    }),
    sl('summary', 'Summary', {
      ul: ['Every composite number is a product of primes in exactly **one** way (Fundamental Theorem of Arithmetic)', 'HCF: **common** primes, **smaller** powers. LCM: **all** primes, **greater** powers', '$\\text{HCF}(a, b) \\times \\text{LCM}(a, b) = ab$ — two numbers only', 'Perfect square: all exponents even; cube: multiples of $3$', 'Splitting into equal pieces → HCF; events coinciding → LCM'],
      v: table(['Task', 'Rule', 'Example ($72$, $120$)'], [['Factorise', 'factor tree or repeated division', '$2^3 \\times 3^2$, $2^3 \\times 3 \\times 5$'], ['HCF', 'common primes, smaller powers', '$2^3 \\times 3 = 24$'], ['LCM', 'all primes, greater powers', '$2^3 \\times 3^2 \\times 5 = 360$'], ['Check', 'HCF × LCM = product', '$24 \\times 360 = 8640 = 72 \\times 120$']], 'Summary table for 72 and 120: factorise into 2 cubed times 3 squared and 2 cubed times 3 times 5; the HCF is 24, the LCM is 360, and 24 times 360 equals 8640, which is 72 times 120.', 'One worked pair that shows every rule.'),
      n: 'Let us pull it together. Factorise first, always. Then the highest common factor takes common primes with smaller powers, and the lowest common multiple takes every prime with greater powers. The product check works for two numbers only. And in word problems, ask whether you are splitting things into equal pieces or waiting for things to happen together.',
    }),
    sl('exam-tips', 'Exam tips: how marks are awarded', {
      ul: ['**2-mark HCF/LCM:** factorisations 1 + HCF and LCM 1. Show the prime factorisations — answers alone may lose marks', '**Word problems (3–5 marks):** identify HCF or LCM 1, factorisations 1, value 1, final answer in the units asked (time, pieces, rupees) 1', '**Mistake:** taking the greater power for HCF (that is the LCM)', '**Mistake:** using HCF × LCM = product for three numbers', '**Mistake:** stopping at the HCF when the question asks for the number of pieces, boxes or rows', '**Mistake:** writing $1$ or a composite number (like $4$) in a prime factorisation'],
      n: 'In the board exam, the method earns marks, so always show the prime factorisations, not just the final number. In word problems, one mark usually goes to saying clearly whether you need the factor or the multiple. The most common slips are swapping smaller and greater powers, using the product rule for three numbers, and stopping one step early. Finish with units or a clock time.',
    }),
  ],
});

// ---------------------------------------------------------------- deck 2
const d2 = deck({
  part: 2,
  title: 'Real Numbers — Part 2: Irrational numbers and proofs',
  goals: [
    'Distinguish rational and irrational numbers with examples',
    'Use the fact that if a prime divides a², it divides a',
    'Prove by contradiction that √2, √3 and √5 are irrational',
    'Prove that numbers such as 4 − 3√2 are irrational',
    'Decide whether sums and products involving surds are rational',
  ],
  slides: [
    sl('title', 'Real Numbers, Part 2: Irrational numbers', {
      b: '$\\sqrt2$ is a real point on the number line — but no fraction lands exactly on it.',
      v: geom(numberLine, 'A number line marked minus 1, 0, 1, 2 and 3. A right triangle with legs of 1 unit stands on the segment from 0 to 1, with a vertical leg at 1. Its hypotenuse from 0 has length root 2; a circle centred at 0 through the top of the triangle cuts the number line at root 2, between 1 and 2.', 'The circle swings the hypotenuse onto the line: $\\sqrt2 \\approx 1.414$.'),
      n: 'Welcome to part two. Draw a right triangle with both short sides one unit long. Its long side is the square root of two. Swing that length down onto the number line with a compass, and it lands between one and two. So the square root of two is a genuine point on the line. In this lesson we prove that no fraction, however clever, ever lands exactly on it.',
    }),
    sl('concept', 'Rational and irrational numbers', {
      b: 'A number is **rational** if it can be written as $\\dfrac pq$ with $p, q$ integers and $q \\ne 0$. A real number that cannot be written this way is **irrational**.',
      v: table(['Number', 'Rational?', 'Why'], [['$-7$', 'yes', '$-7 = \\dfrac{-7}{1}$'], ['$0.75$', 'yes', '$\\dfrac34$'], ['$\\sqrt{49}$', 'yes', 'equals $7$'], ['$\\sqrt{2}$, $\\sqrt{3}$, $\\sqrt{5}$', 'no', 'proved in this lesson'], ['$\\pi$', 'no', '$\\dfrac{22}{7}$ is only an approximation']], 'Table: minus 7, 0.75 and the square root of 49 are rational because each can be written as a fraction; root 2, root 3, root 5 and pi are irrational.', 'Rationals and irrationals together make up the real numbers.'),
      n: 'Rational means you can write the number as one integer over another, with a non-zero bottom. Whole numbers, negatives and simple decimals all qualify. Be careful with roots: the square root of forty nine is just seven, which is rational. But the square roots of two, three and five are not. And pi is irrational: twenty two over seven is only a handy approximation.',
    }),
    sl('diagram', 'Where does √2 come from?', {
      b: 'A square tile of side $1$ m has a diagonal of $\\sqrt{1^2 + 1^2} = \\sqrt2$ m.',
      v: geom(squareDiag, 'A square ABCD with sides 1 metre. The diagonal AC is dashed and labelled root 2 metres; triangle ABC, with a right angle at B, is shaded.', 'The diagonal of a unit square is $\\sqrt2$ — a length you can draw but not write as a fraction.'),
      n: 'Irrational numbers are not exotic. Take a one metre square floor tile in your classroom. By Pythagoras, its diagonal is the square root of two metres. You can measure it, about one point four one four metres, but the digits never settle into a fraction. The Greeks were so shocked by this discovery that, legend says, they tried to keep it secret.',
    }),
    sl('concept', 'The key fact: a prime that divides a² divides a', {
      b: 'Let $p$ be a prime and $a$ a positive integer. If $p$ divides $a^2$, then $p$ divides $a$.',
      ul: ['**Why:** if $a = p_1 p_2 \\cdots p_n$ (primes), then $a^2 = p_1 p_1 p_2 p_2 \\cdots p_n p_n$', 'By uniqueness, the only primes in $a^2$ are the primes of $a$', 'So a prime $p$ dividing $a^2$ is one of $p_1, \\dots, p_n$, and divides $a$'],
      v: table(['$a$', '$a^2$', 'prime dividing $a^2$', 'divides $a$?'], [['$6$', '$36$', '$3$', 'yes'], ['$10$', '$100$', '$5$', 'yes'], ['$6$', '$36$', '$4$ (not prime)', '**no**: $4 \\nmid 6$']], 'Table of examples: 3 divides 36 and also 6; 5 divides 100 and also 10; but 4, which is not prime, divides 36 without dividing 6.', 'The fact needs $p$ to be prime.'),
      n: 'This fact is the engine of every proof in this lesson. It comes straight from the Fundamental Theorem: squaring a number only doubles its primes, it never creates new ones. So if a prime divides a squared, it was already in a. Look at the last row of the table. Four divides thirty six but not six, because four is not prime. The word prime is essential.',
    }),
    sl('diagram', 'Proof by contradiction: the plan', {
      v: flow('LR', [['a', 'Assume the **opposite** of what you want'], ['b', 'Reason correctly, step by step'], ['c', 'Reach something **impossible**'], ['d', 'So the assumption was false']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow chart of proof by contradiction: assume the opposite of the statement, reason correctly step by step, reach an impossible conclusion, and conclude that the assumption was false.', 'To prove "$\\sqrt3$ is irrational", assume "$\\sqrt3$ is rational".'),
      b: 'We cannot test every fraction, so we show that **assuming** a fraction exists leads to nonsense.',
      n: 'There are infinitely many fractions, so we cannot check them all. Instead we use a detective trick. Pretend the square root of three is a fraction, and follow the logic carefully. If every step is correct but we end up with something impossible, the only thing that can be wrong is our starting assumption. That is proof by contradiction.',
    }),
    sl('example', 'Worked example 1: √3 is irrational (setting up)', {
      b: '**To prove:** $\\sqrt3$ is irrational.',
      ul: ['**Step 1 —** Suppose $\\sqrt3$ is rational: $\\sqrt3 = \\dfrac ab$, where $a, b$ are integers, $b \\ne 0$, and $a, b$ are **co-prime** (fraction in lowest terms).', '**Step 2 —** Square both sides: $3 = \\dfrac{a^2}{b^2}$, so $3b^2 = a^2$ … (1)', '**Step 3 —** So $3$ divides $a^2$. As $3$ is prime, $3$ divides $a$. Write $a = 3c$ … (2)'],
      n: 'Why insist on co-prime? Any fraction can be reduced to lowest terms, so this costs us nothing, and it is exactly what we will contradict. Squaring removes the root and gives three b squared equals a squared. Now the key fact kicks in: three is prime and divides a squared, so three divides a. We record a equals three c for the next step.',
    }),
    sl('example', 'Worked example 1: √3 is irrational (the contradiction)', {
      ul: ['**Step 4 —** Put $a = 3c$ in (1): $3b^2 = 9c^2$, so $b^2 = 3c^2$.', '**Step 5 —** So $3$ divides $b^2$, and therefore $3$ divides $b$.', '**Step 6 —** Now $3$ divides **both** $a$ and $b$. This contradicts that $a$ and $b$ are co-prime.', '**Conclusion —** The assumption is false, so $\\sqrt3$ is irrational. $\\blacksquare$'],
      v: proofFlow(3),
      n: 'Substitute and simplify: b squared equals three c squared. Now the same key fact works on b. So three divides a and three divides b. But we chose a and b with no common factor. That is the contradiction, and the proof is complete. Exactly the same chain proves the square roots of two and five are irrational. Only the prime changes.',
    }),
    sl('check', 'Quick check: the starting assumption', {
      b: 'What exactly do we assume at the start of the proof?',
      chk: 'm13',
      n: 'Think about which property of a and b the contradiction attacks at the very end. That property must be part of the assumption.',
    }),
    sl('concept', 'Rational and irrational: what combinations give', {
      v: table(['Combination', 'Result', 'Example'], [['rational $+$ irrational', 'always irrational', '$7 + \\sqrt2$'], ['non-zero rational $\\times$ irrational', 'always irrational', '$3\\sqrt5$, $\\dfrac{\\sqrt2}{4}$'], ['irrational $+$ irrational', '**can be rational**', '$\\sqrt3 + (-\\sqrt3) = 0$'], ['irrational $\\times$ irrational', '**can be rational**', '$\\sqrt2 \\times \\sqrt8 = 4$']], 'Table of combinations: a rational plus an irrational is always irrational, as is a non-zero rational times an irrational; but the sum or product of two irrationals can be rational, for example root 3 plus minus root 3 is 0 and root 2 times root 8 is 4.', 'Only the first two rows are safe rules.'),
      b: 'If $r$ is rational and $x$ irrational: $r + x$ and (for $r \\ne 0$) $rx$ are irrational.',
      n: 'Here are the rules you may use. Rational plus irrational is always irrational. A non-zero rational times an irrational is always irrational. Both follow from a tiny contradiction argument. But two irrationals together can give anything. The square root of two times the square root of eight is four. So never claim that two irrationals always give an irrational.',
    }),
    sl('example', 'Worked example 2: prove 4 − 3√2 is irrational', {
      b: 'Given that $\\sqrt2$ is irrational, prove that $4 - 3\\sqrt2$ is irrational.',
      ul: ['**Step 1 —** Suppose $4 - 3\\sqrt2 = r$, where $r$ is rational.', '**Step 2 —** Then $3\\sqrt2 = 4 - r$, so $\\sqrt2 = \\dfrac{4 - r}{3}$.', '**Step 3 —** $4 - r$ is rational, and dividing by $3$ keeps it rational, so $\\sqrt2$ would be rational.', '**Step 4 —** This contradicts the given fact. Hence $4 - 3\\sqrt2$ is irrational. $\\blacksquare$'],
      v: flow('LR', [['a', '$4 - 3\\sqrt2 = r$ (rational)'], ['b', '$\\sqrt2 = \\dfrac{4 - r}{3}$'], ['c', 'right side rational'], ['d', 'contradiction: $\\sqrt2$ irrational']], [['a', 'b', 'isolate'], ['b', 'c'], ['c', 'd']], 'Flow of the proof: assume 4 minus 3 root 2 equals a rational r, isolate root 2 as 4 minus r over 3, note the right side is rational, which contradicts root 2 being irrational.', 'Isolate the root using only operations that keep rationals rational.'),
      n: 'This is a very common three mark question. The strategy is always the same: assume the whole expression is a rational number r, then isolate the root using only subtraction and division by a non-zero number. Those operations keep rational numbers rational, so the root itself would be rational. That contradicts what we already know. State the contradiction clearly; it carries a mark.',
    }),
    sl('example', 'Worked example 3: when the rules do not apply', {
      b: 'Decide whether each number is rational or irrational: (i) $\\sqrt2 \\times \\sqrt{18}$ (ii) $(\\sqrt5 + 1)^2$ (iii) $\\dfrac{\\sqrt{12}}{\\sqrt3}$.',
      ul: ['**(i)** $\\sqrt{36} = 6$: **rational**, though both factors are irrational.', '**(ii)** $5 + 2\\sqrt5 + 1 = 6 + 2\\sqrt5$: rational $+$ irrational, so **irrational**.', '**(iii)** $\\sqrt{\\dfrac{12}{3}} = \\sqrt4 = 2$: **rational**.', '**Lesson —** Simplify first; decide afterwards.'],
      v: table(['Expression', 'Simplified', 'Type'], [['$\\sqrt2 \\times \\sqrt{18}$', '$6$', 'rational'], ['$(\\sqrt5 + 1)^2$', '$6 + 2\\sqrt5$', 'irrational'], ['$\\dfrac{\\sqrt{12}}{\\sqrt3}$', '$2$', 'rational']], 'Table: root 2 times root 18 simplifies to 6, rational; root 5 plus 1, squared, simplifies to 6 plus 2 root 5, irrational; root 12 over root 3 simplifies to 2, rational.', 'Simplify before you classify.'),
      n: 'An expression full of roots can still be rational, so never judge by appearance. Simplify first. In the first case the roots multiply to the square root of thirty six, which is six. In the second, expanding the square leaves a two root five term that does not cancel, so the result is irrational. In the third, dividing roots gives the square root of four.',
    }),
    sl('check', 'Quick check: spot the irrational', {
      b: 'Only one of these numbers is irrational. Simplify each one first.',
      chk: 'm11',
      n: 'Look for perfect squares hiding inside each root. If a root simplifies to a whole number, the number is rational.',
    }),
    sl('diagram', 'Common traps', {
      v: table(['Statement', 'True or false', 'Why'], [['$\\sqrt4$ is irrational', 'false', '$\\sqrt4 = 2$'], ['$\\pi = \\dfrac{22}{7}$', 'false', 'only an approximation'], ['If $4 \\mid a^2$ then $4 \\mid a$', 'false', '$4 \\mid 36$, $4 \\nmid 6$'], ['$\\sqrt2 + \\sqrt3 = \\sqrt5$', 'false', 'roots do not add like that'], ['$5\\sqrt7$ is irrational', 'true', 'non-zero rational × irrational']], 'Table of five statements: root 4 is irrational is false because it equals 2; pi equals 22 over 7 is false; if 4 divides a squared then 4 divides a is false, for example a equals 6; root 2 plus root 3 equals root 5 is false; 5 root 7 is irrational is true.', 'Each false statement here appears in students\' answers every year.'),
      b: 'Know these before the exam.',
      n: 'These five lines collect the mistakes examiners see most. The square root of a perfect square is rational. Pi is not twenty two over seven. The key divisibility fact needs a prime. Roots do not add under the root sign: the square root of two plus the square root of three is about three point one five, not two point two four. And a rational multiple of an irrational stays irrational.',
    }),
    sl('check', 'Quick check: assertion and reason', {
      b: 'Decide whether the assertion and the reason are true, and whether the reason explains the assertion.',
      chk: 'ar3',
      n: 'Work out the product first. Then ask whether the reason is always true. One example can be enough to show that an always statement is false.',
    }),
    sl('summary', 'Summary', {
      ul: ['Rational: $\\dfrac pq$ with $q \\ne 0$. Irrational: cannot be written so ($\\sqrt2, \\sqrt3, \\sqrt5, \\pi$)', 'If a prime $p$ divides $a^2$, then $p$ divides $a$ (from uniqueness of factorisation)', 'Proof for $\\sqrt p$: assume $\\dfrac ab$ in lowest terms → $p \\mid a$ → $p \\mid b$ → contradiction', 'rational $+$ irrational, and non-zero rational $\\times$ irrational, are irrational', 'Two irrationals can combine to a rational: simplify first'],
      v: proofFlow(5),
      n: 'Here is the whole lesson in one chain, shown for the square root of five. Assume a fraction in lowest terms, square, use the prime fact twice, and reach a common factor that should not exist. For expressions like four minus three root two, assume rational and isolate the root. And remember that only the first two combination rules are guaranteed.',
    }),
    sl('exam-tips', 'Exam tips: how marks are awarded', {
      ul: ['**Prove $\\sqrt p$ irrational (3 marks):** assumption with co-prime $a, b$ ½ + $p \\mid a$ with reason 1 + $p \\mid b$ 1 + contradiction and conclusion ½', '**Prove $r + s\\sqrt p$ irrational (2–3 marks):** assume rational 1, isolate the root 1, contradiction 1', '**Mistake:** forgetting "co-prime" — then there is nothing to contradict', '**Mistake:** writing "$p \\mid a^2$ so $p \\mid a$" without saying $p$ is prime', '**Mistake:** concluding "irrational" without stating the contradiction', '**Mistake:** saying the product of irrationals is irrational'],
      n: 'In proof questions, each line earns marks, so write every step with its reason. Say co-prime in the assumption. When you use the prime fact, write because three is prime. End with a clear sentence: this contradicts our assumption, so the number is irrational. In a hence question, reuse the result you have just proved instead of starting again.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const notes = {
  unit: 'cbse-10-mathematics-ch01', version: 1, title: 'Real Numbers — chapter notes', language: 'en',
  sections: [
    {
      heading: '1. Primes, composites and factor trees',
      body_md: 'A **prime** number has exactly two factors, $1$ and itself: $2, 3, 5, 7, 11, 13, \\dots$ A **composite** number has more than two factors. The number $1$ is neither prime nor composite, and $2$ is the only even prime.\n\nTo **factorise** a composite number, split off primes repeatedly — by a factor tree or by repeated division — until only primes remain. Write the result with powers in increasing order of primes, e.g. $360 = 2^3 \\times 3^2 \\times 5$.\n\n**Divisibility shortcuts** help: $2$ (last digit even), $3$ (digit sum divisible by 3), $5$ (last digit 0 or 5), $11$ (alternating digit sum divisible by 11).',
      key_terms: [{ term: 'Prime number', definition_md: 'A natural number with exactly two factors, $1$ and itself.' }, { term: 'Composite number', definition_md: 'A natural number greater than $1$ with more than two factors.' }, { term: 'Prime factorisation', definition_md: 'Writing a number as a product of primes, e.g. $84 = 2^2 \\times 3 \\times 7$.' }],
      formulas: [{ latex: '360 = 2 \\times 2 \\times 2 \\times 3 \\times 3 \\times 5 = 2^3 \\times 3^2 \\times 5', label: 'Example' }],
      visual: geom(tree360, 'Factor tree of 360: 360 = 2 × 180, 180 = 2 × 90, 90 = 2 × 45, 45 = 3 × 15, 15 = 3 × 5, with prime leaves 2, 2, 2, 3, 3, 5.', 'Factor tree of $360$.'),
      topic_ids: [topic(1)],
    },
    {
      heading: '2. The Fundamental Theorem of Arithmetic',
      body_md: '**Theorem.** Every composite number can be expressed as a product of primes, and this factorisation is **unique**, apart from the order in which the primes occur.\n\nConsequences you will use:\n\n- A number ends in $0$ exactly when it is divisible by $10 = 2 \\times 5$, so its factorisation must contain both $2$ and $5$. Hence $12^n = 2^{2n} \\times 3^n$ never ends in $0$.\n- **Perfect square:** every exponent even. **Perfect cube:** every exponent a multiple of $3$. To make $1188 = 2^2 \\times 3^3 \\times 11$ a square, multiply by $3 \\times 11 = 33$.\n- "Factorisations" such as $2520 = 4 \\times 630$ are not prime factorisations; reduce every factor to primes.\n\n*Not in the 2026–27 syllabus:* Euclid\'s division lemma and algorithm, and decimal expansions of rational numbers.',
      key_terms: [{ term: 'Fundamental Theorem of Arithmetic', definition_md: 'Every composite number is a product of primes in exactly one way, apart from order.' }, { term: 'Co-prime numbers', definition_md: 'Numbers whose HCF is $1$, e.g. $8$ and $15$.' }],
      formulas: [{ latex: 'n = p_1^{a_1} \\times p_2^{a_2} \\times \\cdots \\times p_k^{a_k}', label: 'Standard form, primes in increasing order' }],
      visual: geom(tree2, 'Two different factor trees of 360, one starting 2 × 180 and one starting 10 × 36, both ending with the primes 2, 2, 2, 3, 3, 5.', 'Different trees, same primes: uniqueness in action.'),
      topic_ids: [topic(1)],
    },
    {
      heading: '3. HCF and LCM by prime factorisation',
      body_md: '- **HCF** (highest common factor) $=$ product of the **common** primes, each with its **smaller** power.\n- **LCM** (lowest common multiple) $=$ product of **all** primes that occur, each with its **greater** power.\n\nWorking: $336 = 2^4 \\times 3 \\times 7$ and $180 = 2^2 \\times 3^2 \\times 5$, so $\\text{HCF} = 2^2 \\times 3 = 12$ and $\\text{LCM} = 2^4 \\times 3^2 \\times 5 \\times 7 = 5040$.\n\nFor **three numbers**, use primes common to **all three** for the HCF: $\\text{HCF}(48, 72, 108) = 2^2 \\times 3 = 12$, $\\text{LCM} = 2^4 \\times 3^3 = 432$.\n\nAn exponent table (one row per prime, power $0$ when a prime is missing) prevents slips.',
      key_terms: [{ term: 'HCF', definition_md: 'The largest number that divides each of the given numbers exactly.' }, { term: 'LCM', definition_md: 'The smallest number that is a multiple of each of the given numbers.' }],
      formulas: [{ latex: '\\text{HCF} = \\prod p^{\\min(m, n)}, \\qquad \\text{LCM} = \\prod p^{\\max(m, n)}', label: 'm, n = powers of p in the two numbers' }],
      visual: geom(venn336, 'Two overlapping circles for 336 and 180: the overlap holds the common primes 2, 2 and 3; 336 alone has 2, 2 and 7; 180 alone has 3 and 5.', 'HCF $=$ overlap $= 12$; LCM $=$ everything $= 5040$.'),
      topic_ids: [topic(2)],
    },
    {
      heading: '4. HCF × LCM = product (two numbers only)',
      body_md: 'For any two natural numbers $a$ and $b$, $\\text{HCF}(a, b) \\times \\text{LCM}(a, b) = a \\times b$, because for each prime $\\min(m, n) + \\max(m, n) = m + n$.\n\nUse it to find a missing number: if $\\text{HCF} = 23$, $\\text{LCM} = 1449$ and one number is $161$, the other is $\\dfrac{23 \\times 1449}{161} = 207$.\n\n**It fails for three numbers:** for $4, 6, 10$, $\\text{HCF} \\times \\text{LCM} = 2 \\times 60 = 120$, but $4 \\times 6 \\times 10 = 240$.\n\nUseful facts: the HCF always divides the LCM; co-prime numbers have $\\text{HCF} = 1$ and $\\text{LCM} = $ product; consecutive numbers are co-prime.',
      key_terms: [{ term: 'Product rule', definition_md: '$\\text{HCF}(a, b) \\times \\text{LCM}(a, b) = ab$ for two numbers.' }],
      formulas: [{ latex: '\\text{HCF}(a, b) \\times \\text{LCM}(a, b) = a \\times b', label: 'Two numbers only' }],
      visual: table(['Numbers', 'HCF', 'LCM', 'HCF × LCM', 'Product'], [['$4, 6$', '$2$', '$12$', '$24$', '$24$'], ['$4, 6, 10$', '$2$', '$60$', '$120$', '$240$'], ['$6, 10, 15$', '$1$', '$30$', '$30$', '$900$']], 'Table showing HCF times LCM equals the product for 4 and 6 (24 and 24) but not for 4, 6, 10 (120 against 240) or 6, 10, 15 (30 against 900).', 'The rule holds for pairs only.'),
      topic_ids: [topic(2)],
    },
    {
      heading: '5. Word problems on HCF and LCM',
      body_md: '**HCF problems** ask for the **largest** size that divides several quantities exactly: cutting ribbons or rods, packing sweets, tiling floors with square tiles, arranging groups in equal rows, spacing poles.\n\n**LCM problems** ask for the **smallest** quantity or the **first time** at which events coincide: bells ringing together, buses or trains leaving together, runners meeting at the start, lights blinking together.\n\n**Remainder variants:** "largest number dividing 245 and 1029 leaving remainders 5 and 9" → HCF of $240$ and $1020$ $= 60$. "Smallest number leaving remainder 5 when divided by 12, 16, 24, 36" → LCM $+ 5$.\n\nAlways finish with what is asked: the number of pieces, a clock time, or a cost.',
      key_terms: [{ term: 'Common multiple', definition_md: 'A number that each given number divides exactly; the LCM is the smallest.' }],
      formulas: [{ latex: '\\text{pieces} = \\dfrac{a}{\\text{HCF}} + \\dfrac{b}{\\text{HCF}}', label: 'Number of equal pieces' }],
      visual: flow('TB', [['q', 'What is asked?'], ['h', 'Largest equal piece, group or gap'], ['l', 'First time events coincide'], ['H', 'HCF'], ['L', 'LCM']], [['q', 'h', 'splitting'], ['q', 'l', 'waiting'], ['h', 'H'], ['l', 'L']], 'Decision chart: if the problem is about splitting quantities into the largest equal pieces, groups or gaps, use the HCF; if it is about waiting for events to coincide, use the LCM.', 'Splitting → HCF. Waiting → LCM.'),
      visuals: [busPlot],
      topic_ids: [topic(2)],
    },
    {
      heading: '6. Rational and irrational numbers',
      body_md: 'A number is **rational** if it can be written as $\\dfrac pq$, where $p$ and $q$ are integers and $q \\ne 0$. A real number that is not rational is **irrational**. Examples of irrationals: $\\sqrt2, \\sqrt3, \\sqrt5, \\sqrt6, \\pi$. The square root of a natural number that is not a perfect square is irrational; $\\sqrt{49} = 7$ is rational.\n\nIrrational numbers are real lengths: the diagonal of a $1$ m square tile is $\\sqrt2$ m, and $\\sqrt2$ can be marked on the number line with a compass.\n\n$\\pi$ is irrational; $\\dfrac{22}{7}$ and $3.14$ are only approximations.',
      key_terms: [{ term: 'Rational number', definition_md: 'A number of the form $\\dfrac pq$, $p, q$ integers, $q \\ne 0$.' }, { term: 'Irrational number', definition_md: 'A real number that cannot be written as $\\dfrac pq$.' }],
      formulas: [],
      visual: geom(numberLine, 'Number line from minus 1 to 3 with a right triangle of legs 1 standing on 0 to 1; a circle centred at 0 through the top vertex meets the line at root 2.', '$\\sqrt2$ marked on the number line.'),
      topic_ids: [topic(3)],
    },
    {
      heading: '7. Proving that √2, √3 and √5 are irrational',
      body_md: '**Key fact.** If a prime $p$ divides $a^2$, then $p$ divides $a$. (By uniqueness of factorisation, $a^2$ has the same primes as $a$.) It is false for non-primes: $4$ divides $36$ but not $6$.\n\n**Proof that $\\sqrt5$ is irrational.** Suppose $\\sqrt5 = \\dfrac ab$ with $a, b$ co-prime and $b \\ne 0$. Then $5b^2 = a^2$, so $5 \\mid a^2$ and hence $5 \\mid a$; write $a = 5c$. Then $5b^2 = 25c^2$, i.e. $b^2 = 5c^2$, so $5 \\mid b^2$ and $5 \\mid b$. Thus $5$ divides both $a$ and $b$, contradicting co-primality. So $\\sqrt5$ is irrational.\n\nThe same steps with $2$ or $3$ prove $\\sqrt2$ and $\\sqrt3$ irrational.',
      key_terms: [{ term: 'Proof by contradiction', definition_md: 'Assume the opposite of the statement, reason correctly to an impossibility, and conclude the assumption was false.' }],
      formulas: [{ latex: '\\sqrt p = \\frac ab \\;\\Rightarrow\\; pb^2 = a^2 \\;\\Rightarrow\\; p \\mid a \\;\\Rightarrow\\; p \\mid b', label: 'The proof chain (p prime)' }],
      visual: proofFlow(5),
      topic_ids: [topic(3)],
    },
    {
      heading: '8. Sums and products with irrational numbers',
      body_md: 'If $r$ is rational and $x$ is irrational:\n\n- $r + x$ and $r - x$ are irrational;\n- $rx$ and $\\dfrac xr$ are irrational when $r \\ne 0$.\n\n**Method for "prove $4 - 3\\sqrt2$ is irrational":** suppose it equals a rational $r$; then $\\sqrt2 = \\dfrac{4 - r}{3}$ would be rational, a contradiction.\n\nTwo irrationals can give a rational: $\\sqrt2 \\times \\sqrt{18} = 6$, $(3 + \\sqrt2) + (3 - \\sqrt2) = 6$, $(3 + \\sqrt2)(3 - \\sqrt2) = 7$. Simplify before classifying.',
      key_terms: [{ term: 'Surd', definition_md: 'An irrational root such as $\\sqrt2$ or $3\\sqrt5$.' }],
      formulas: [{ latex: '(a + \\sqrt b)(a - \\sqrt b) = a^2 - b', label: 'Product of conjugates is rational' }],
      visual: table(['Combination', 'Result', 'Example'], [['rational + irrational', 'irrational', '$7 + \\sqrt2$'], ['non-zero rational × irrational', 'irrational', '$5\\sqrt7$'], ['irrational + irrational', 'either', '$\\sqrt3 + (-\\sqrt3) = 0$'], ['irrational × irrational', 'either', '$\\sqrt5 \\times \\sqrt{20} = 10$']], 'Table: rational plus irrational is irrational, as is a non-zero rational times an irrational; the sum or product of two irrationals may be rational or irrational.', 'Only the first two rows are rules.'),
      topic_ids: [topic(3)],
    },
  ],
  exam_tips_md: '**How marks are awarded**\n- *HCF/LCM (2–3 marks):* prime factorisations 1, HCF and LCM 1, verification or final answer 1. Answers without factorisations can lose the method mark.\n- *Word problems (3–5 marks):* identifying HCF or LCM 1, factorisations 1, value 1, answer in the asked form (pieces, clock time, cost) 1–2.\n- *Irrationality proofs (3 marks):* assumption with co-prime $a, b$ ½, $p \\mid a$ with "p is prime" 1, $p \\mid b$ 1, contradiction and conclusion ½.\n- *Prove $r + s\\sqrt p$ irrational (2–3 marks):* assume rational, isolate the root, state the contradiction.\n\n**Common mistakes**\n1. Taking greater powers for the HCF (that gives the LCM).\n2. Using HCF × LCM = product for three numbers.\n3. Writing $1$ or composite numbers in a prime factorisation.\n4. Stopping at the HCF when the number of pieces or boxes is asked.\n5. Forgetting "co-prime" in the assumption of an irrationality proof.\n6. Using "$p \\mid a^2 \\Rightarrow p \\mid a$" for a non-prime $p$.\n7. Claiming the sum or product of two irrationals is always irrational.\n8. Treating $\\pi$ as $\\dfrac{22}{7}$.',
  status: 'draft',
  provenance: d1.provenance,
};

// ---------------------------------------------------------------- flashcards
const fc = (id, front_md, back_md, tag, t) => ({ id, front_md, back_md, tag, topic_id: topic(t) });
const flashcards = {
  unit: 'cbse-10-mathematics-ch01', version: 1, language: 'en',
  cards: [
    fc('f01', 'What is a **prime number**?', 'A natural number with exactly two factors, $1$ and itself.', 'definition', 1),
    fc('f02', 'Is $1$ prime, composite or neither?', 'Neither: it has only one factor.', 'fact', 1),
    fc('f03', 'The only even prime?', '$2$', 'fact', 1),
    fc('f04', 'State the **Fundamental Theorem of Arithmetic**.', 'Every composite number can be written as a product of primes, uniquely apart from the order of the factors.', 'definition', 1),
    fc('f05', 'Prime factorisation of $360$?', '$2^3 \\times 3^2 \\times 5$', 'example', 1),
    fc('f06', 'When does a number end with the digit $0$?', 'When its prime factorisation contains both $2$ and $5$.', 'concept', 1),
    fc('f07', 'Can $6^n$ end with $0$?', 'No: $6^n = 2^n \\times 3^n$ has no factor $5$.', 'example', 1),
    fc('f08', 'Test for a perfect square from the factorisation?', 'Every prime exponent is even.', 'concept', 1),
    fc('f09', 'Test for a perfect cube from the factorisation?', 'Every prime exponent is a multiple of $3$.', 'concept', 1),
    fc('f10', 'HCF by prime factorisation?', 'Product of the **common** primes, each with its **smaller** power.', 'formula', 2),
    fc('f11', 'LCM by prime factorisation?', 'Product of **all** primes that occur, each with its **greater** power.', 'formula', 2),
    fc('f12', 'Product rule for two numbers?', '$\\text{HCF}(a, b) \\times \\text{LCM}(a, b) = a \\times b$', 'formula', 2),
    fc('f13', 'Does HCF × LCM = product hold for three numbers?', 'No. For $4, 6, 10$: $2 \\times 60 = 120$, but the product is $240$.', 'exam-tip', 2),
    fc('f14', 'HCF and LCM of $72$ and $120$?', 'HCF $= 2^3 \\times 3 = 24$; LCM $= 2^3 \\times 3^2 \\times 5 = 360$.', 'example', 2),
    fc('f15', 'HCF of two consecutive numbers?', '$1$ — consecutive numbers are co-prime.', 'fact', 2),
    fc('f16', 'What are **co-prime** numbers?', 'Numbers whose HCF is $1$, e.g. $8$ and $15$.', 'definition', 2),
    fc('f17', 'LCM of two co-prime numbers?', 'Their product.', 'fact', 2),
    fc('f18', 'Must the HCF divide the LCM?', 'Yes, always. So HCF $12$ with LCM $90$ is impossible.', 'concept', 2),
    fc('f19', 'Word problem: "largest piece / group / tile" → ?', 'HCF', 'exam-tip', 2),
    fc('f20', 'Word problem: "together again / first time / ring together" → ?', 'LCM', 'exam-tip', 2),
    fc('f21', 'Largest number dividing $a$ and $b$ with remainders $r_1$, $r_2$?', '$\\text{HCF}(a - r_1, b - r_2)$', 'formula', 2),
    fc('f22', 'Smallest number leaving remainder $r$ when divided by $a$, $b$, $c$?', '$\\text{LCM}(a, b, c) + r$', 'formula', 2),
    fc('f23', 'What is a **rational number**?', 'A number $\\dfrac pq$ with $p, q$ integers and $q \\ne 0$.', 'definition', 3),
    fc('f24', 'What is an **irrational number**?', 'A real number that cannot be written as $\\dfrac pq$; e.g. $\\sqrt2$, $\\pi$.', 'definition', 3),
    fc('f25', 'Key fact used in irrationality proofs?', 'If a prime $p$ divides $a^2$, then $p$ divides $a$.', 'concept', 3),
    fc('f26', 'Why must $p$ be prime in that fact?', 'For non-primes it fails: $4 \\mid 36$ but $4 \\nmid 6$.', 'exam-tip', 3),
    fc('f27', 'Opening line of the proof that $\\sqrt3$ is irrational?', 'Assume $\\sqrt3 = \\dfrac ab$ with $a, b$ co-prime integers, $b \\ne 0$.', 'exam-tip', 3),
    fc('f28', 'Rational + irrational = ?', 'Always irrational.', 'fact', 3),
    fc('f29', 'Can the product of two irrationals be rational?', 'Yes: $\\sqrt2 \\times \\sqrt8 = 4$.', 'example', 3),
    fc('f30', 'Is $\\pi = \\dfrac{22}{7}$?', 'No. $\\pi$ is irrational; $\\dfrac{22}{7}$ is an approximation.', 'fact', 3),
    fc('f31', 'Picture: where is $\\sqrt2$ on the number line?', 'Draw a right triangle with legs $1$ on $[0, 1]$; swing its hypotenuse from $0$ with a compass. It lands at about $1.414$.', 'diagram', 3),
    fc('f32', 'How to prove $4 - 3\\sqrt2$ irrational?', 'Assume it equals rational $r$; then $\\sqrt2 = \\dfrac{4 - r}{3}$ is rational — contradiction.', 'exam-tip', 3),
  ],
  status: 'draft',
  provenance: d1.provenance,
};

// ---------------------------------------------------------------- release + tests
const release = {
  unit: 'cbse-10-mathematics-ch01', version: 1, academic_year: '2026-27', created_at: '2026-10-26T00:00:00+05:30',
  decks: [d1, d2], notes, flashcards, questions: [],
  build: { run_id: null, checks: { syllabus: 'topics t01–t03 only; removed topics (Euclid\'s division lemma/algorithm, decimal expansions) absent' } },
};
const tests = chapterTests('Real Numbers', {
  A: ['m03', 'm07', 'm14', 'ar2'],
  B: ['s204', 's203', 's305'],
  C: ['l02', 'l01'],
  D: ['c02'],
}, {
  A: ['m02', 'm04', 'm06', 'm08', 'm10', 'm12', 'm16', 'm17', 'ar1', 'ar4'],
  B: ['s201', 's205', ['s206', 's209'], 's302', ['s304', 's306']],
  C: ['l03', ['l04', 'l05']],
  D: ['c01', 'c04'],
});
build({ dir: DIR, release, testsSpec: tests });
void lcmN;
