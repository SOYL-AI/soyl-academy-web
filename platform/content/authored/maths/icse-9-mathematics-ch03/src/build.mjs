// Build ICSE 9 Mathematics ch03 Expansions. Run from platform/:
//   npx tsx content/authored/maths/icse-9-mathematics-ch03/src/build.mjs
// Every expansion on a slide, in a table, a note or a card is multiplied out by poly.mjs (exact Laurent polynomials
// with rational coefficients) and the build throws if a typed line is not an identity; every value that depends on a
// given condition (a + 1/a = k, a + b + c = s ...) is also checked at a witness number that satisfies the condition.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, topic, deck, sl, table, flow, plot, geom, build, chapterTests, r } from './lib.mjs';
import { P, chain, ev, close, realPair, reciprocalRoot } from './poly.mjs';

setUnit('icse-9-mathematics-ch03', { author: 'claude-sonnet-5-5 (writer; reviewed by the subject-producer)' });
await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const must = (c, msg) => { if (!c) throw new Error(`self-check failed: ${msg}`); };
const d = (s) => `$${s}$`;
const times = r`\times`;

/** area/grid table: every cell is row-head times column-head (typed, then multiplied out and compared) */
function grid(rows, cols, cells, alt, caption) {
  rows.forEach((rw, i) => cols.forEach((cl, j) => must(P(rw).mul(P(cl)).eq(P(cells[i][j])), `grid cell ${rw} x ${cl} = ${cells[i][j]}`)));
  return table([d(times), ...cols.map(d)], rows.map((rw, i) => [d(rw), ...cells[i].map(d)]), alt, caption);
}
/** rows of [typed lhs, typed rhs] checked as identities, shown as TeX */
const idRows = (pairs) => pairs.map(([l, rr]) => { chain([`${l} = ${rr}`]); return [d(l), d(rr)]; });

// ---------------------------------------------------------------- visuals, computed
// Deck 1
const gridAB = grid(['a', 'b'], ['a', 'b'], [['a^2', 'ab'], ['ab', 'b^2']], 'A two by two table. Rows and columns are headed a and b. The four cells are a squared, a b, a b and b squared. Together they make the square of a plus b.', 'Area model: $(a + b)^2 = a^2 + ab + ab + b^2$');
const sqId = (() => {
  const env = { a: 5, b: 2 };
  must(ev('(a+b)^2', env) === 49 && ev('a^2+2ab+b^2', env) === 49 && 25 + 20 + 4 === 49, 'check (a+b)^2');
  must(ev('(a-b)^2', env) === 9 && 25 - 20 + 4 === 9, 'check (a-b)^2');
  must(ev('(a+b)(a-b)', env) === 21 && 25 - 4 === 21, 'check (a+b)(a-b)');
  chain([r`(a + b)^2 = a^2 + 2ab + b^2`]); chain([r`(a - b)^2 = a^2 - 2ab + b^2`]); chain([r`(a + b)(a - b) = a^2 - b^2`]);
  return table(['Identity', 'Expanded', d(r`\text{Check with } a = 5,\ b = 2`)], [[d(r`(a + b)^2`), d(r`a^2 + 2ab + b^2`), d(r`49 = 25 + 20 + 4`)], [d(r`(a - b)^2`), d(r`a^2 - 2ab + b^2`), d(r`9 = 25 - 20 + 4`)], [d(r`(a + b)(a - b)`), d(r`a^2 - b^2`), d(r`21 = 25 - 4`)]], 'Table of three identities with their expansions and a numerical check using a equal to five and b equal to two.', 'The squares and the product of a sum and a difference');
})();
// geometry: a square of side a + b split into a^2, ab, ab, b^2 (drawn with a = 3, b = 2 units, not to scale)
function squareFig() {
  const ox = 0.7, oy = 0.7, A = 3, B = 2, T = A + B;
  const pts = {
    BL: { at: [ox, oy], label: false }, BR: { at: [ox + T, oy], label: false }, TR: { at: [ox + T, oy + T], label: false }, TL: { at: [ox, oy + T], label: false },
    M1: { at: [ox + A, oy], label: false }, M2: { at: [ox + A, oy + T], label: false }, L1: { at: [ox, oy + A], label: false }, R1: { at: [ox + T, oy + A], label: false },
    Ra: { at: [ox + A / 2, oy + A / 2], label: '$a^2$' }, Rb: { at: [ox + A + B / 2, oy + A / 2], label: '$ab$' }, Rc: { at: [ox + A / 2, oy + A + B / 2], label: '$ab$' }, Rd: { at: [ox + A + B / 2, oy + A + B / 2], label: '$b^2$' },
  };
  return geom({
    width: ox + T + 0.8, height: oy + T + 0.8, points: pts, not_to_scale: true,
    segments: [{ from: 'BL', to: 'M1', label: '$a$' }, { from: 'M1', to: 'BR', label: '$b$' }, { from: 'BR', to: 'R1', label: '$a$' }, { from: 'R1', to: 'TR', label: '$b$' }, { from: 'TR', to: 'M2' }, { from: 'M2', to: 'TL' }, { from: 'TL', to: 'L1' }, { from: 'L1', to: 'BL' }, { from: 'M1', to: 'M2' }, { from: 'L1', to: 'R1' }],
  }, 'A large square of side a plus b is cut by one vertical and one horizontal line into four parts: a square of side a, two rectangles a by b, and a small square of side b.', 'Square of side $a + b$ (not to scale): its area is $a^2 + ab + ab + b^2$');
}
const sqGeo = squareFig();
const ex1Grid = grid(['5k', '2'], ['5k', '2'], [['25k^2', '10k'], ['10k', '4']], 'A grid for five k plus two squared: twenty five k squared, ten k, ten k and four.', 'Area model for $(5k + 2)^2$');
const xabTab = (() => {
  const rows = [['x + 4', 'x + 9', 4, 9, 'x^2 + 13x + 36'], ['x - 3', 'x - 8', -3, -8, 'x^2 - 11x + 24'], ['x + 7', 'x - 2', 7, -2, 'x^2 + 5x - 14'], ['x - 10', 'x + 4', -10, 4, 'x^2 - 6x - 40']];
  return table(['Product', d('a + b'), d('ab'), 'Expansion'], rows.map(([u, v, a, b, e]) => { must(P(`(${u})(${v})`).eq(P(e)) && P(e).co({ x: 1 }) === a + b && P(e).co() === a * b, `xab ${u} ${v}`); return [d(`(${u})(${v})`), d(String(a + b)), d(String(a * b)), d(e)]; }), 'Table: four products of the form x plus a times x plus b, with the sum a plus b, the product a b, and the expansion.', 'Middle coefficient = sum of the numbers; constant = their product');
})();
const ex2Grid = grid(['z', '8'], ['z', '-5'], [['z^2', '-5z'], ['8z', '-40']], 'A grid for z plus eight times z minus five: z squared, minus five z, eight z and minus forty. Adding gives z squared plus three z minus forty.', 'Area model for $(z + 8)(z - 5)$');
chain([r`(z + 8)(z - 5) = z^2 + 3z - 40`]);
const signTab = table(['Signs of the two numbers', 'Example', 'Expansion', 'Middle term', 'Last term'], [
  ['both positive', d('(x+3)(x+4)'), d('x^2+7x+12'), 'positive', 'positive'],
  ['both negative', d('(x-3)(x-4)'), d('x^2-7x+12'), 'negative', 'positive'],
  ['opposite, larger positive', d('(x+6)(x-2)'), d('x^2+4x-12'), 'positive', 'negative'],
  ['opposite, larger negative', d('(x-6)(x+2)'), d('x^2-4x-12'), 'negative', 'negative'],
].map((row) => { const [, ex, exp] = row; const e = P(ex.slice(1, -1)); must(e.eq(P(exp.slice(1, -1))), `sign table ${ex}`); const mid = e.co({ x: 1 }), last = e.co(); must((row[3] === 'positive') === (mid > 0) && (row[4] === 'positive') === (last > 0), `sign words ${ex}`); return row; }), 'Table showing how the signs of the two numbers decide the signs of the middle and last terms of the expansion.', 'Sign patterns of $(x + a)(x + b)$');
const grid3 = grid(['a', 'b', 'c'], ['a', 'b', 'c'], [['a^2', 'ab', 'ac'], ['ab', 'b^2', 'bc'], ['ac', 'bc', 'c^2']], 'A three by three grid with rows and columns headed a, b and c. The diagonal cells are the squares a squared, b squared and c squared. The six other cells are the products a b, a c and b c, each appearing twice.', 'Area model for $(a + b + c)^2$: three squares and six rectangles');
const ex3Grid = grid(['2x', '3y', '-4z'], ['2x', '3y', '-4z'], [['4x^2', '6xy', '-8xz'], ['6xy', '9y^2', '-12yz'], ['-8xz', '-12yz', '16z^2']], 'A three by three grid for two x plus three y minus four z squared. The diagonal gives four x squared, nine y squared and sixteen z squared. The off-diagonal cells give six x y, minus eight x z and minus twelve y z, each twice.', 'Area model for $(2x + 3y - 4z)^2$');
chain([r`(2x + 3y - 4z)^2 = 4x^2 + 9y^2 + 16z^2 + 12xy - 16xz - 24yz`]);
const signVar = table(['Expression', 'Squares', 'Cross terms'], [
  ['(a+b+c)^2', 'a^2+b^2+c^2', '2ab+2bc+2ca'],
  ['(a+b-c)^2', 'a^2+b^2+c^2', '2ab-2bc-2ca'],
  ['(a-b+c)^2', 'a^2+b^2+c^2', '-2ab-2bc+2ca'],
  ['(a-b-c)^2', 'a^2+b^2+c^2', '-2ab+2bc-2ca'],
].map(([e, s, c]) => { must(P(e).eq(P(`${s}+${c}`)), `sign variant ${e}`); return [d(e), d(s), d(c)]; }), 'Table of four squares of three-term brackets with different signs. The squares part is always a squared plus b squared plus c squared; only the signs of the cross terms change.', 'The squares never change sign; each cross term takes the product of its two signs');
const sumSqFlow = flow('LR', [['g', r`Given $s = a + b + c$ and $q = ab + bc + ca$`], ['sq', r`Square: $s^2 = a^2 + b^2 + c^2 + 2q$`], ['res', r`$a^2 + b^2 + c^2 = s^2 - 2q$`]], [['g', 'sq', 'square the sum'], ['sq', 'res', 'rearrange']], 'Flow chart: given the sum s and the pair sum q, square s, then rearrange to get a squared plus b squared plus c squared as s squared minus two q.', 'Finding the sum of squares from $s$ and $q$');
chain([r`(a + b + c)^2 - 2(ab + bc + ca) = a^2 + b^2 + c^2`]);
const ex4Env = { a: 3, b: 5, c: 6 };
must(ev('a+b+c', ex4Env) === 14 && ev('ab+bc+ca', ex4Env) === 63 && ev('a^2+b^2+c^2', ex4Env) === 70 && 196 - 126 === 70, 'example 4 witness');
const ex4Tab = table(['Step', 'Working'], [['Square the sum', d(r`14^2 = 196`)], ['Double the pair sum', d(r`2 \times 63 = 126`)], ['Subtract', d(r`196 - 126 = 70`)], ['Witness check', d(r`3^2 + 5^2 + 6^2 = 9 + 25 + 36 = 70`)]], 'Table of the steps for finding a squared plus b squared plus c squared when a plus b plus c is fourteen and a b plus b c plus c a is sixty three.', 'Worked example 4');
const idPlot = plot({ x: [-5, 3], y: [-1, 16], fns: ['(x+2)^2', 'x^2+4x+4', 'x^2+4'], pts: [[-2, 0, '$(-2, 0)$'], [0, 4, '$(0, 4)$'], [1, 9, '$(1, 9)$'], [1, 5, '$(1, 5)$']], xl: 'x', yl: 'y' }, 'Graph of three curves. The graphs of y equals x plus two all squared and y equals x squared plus four x plus four are the same curve, touching the x axis at minus two. The graph of y equals x squared plus four is a different curve that lies above it for positive x.', '$(x + 2)^2$ and $x^2 + 4x + 4$ give one graph; $x^2 + 4$ gives another');
must(ev('(x+2)^2', { x: 1 }) === 9 && ev('x^2+4', { x: 1 }) === 5, 'plot points');
const sum1 = table(['Result', 'Identity'], [...idRows([[r`(a + b)^2`, r`a^2 + 2ab + b^2`], [r`(a - b)^2`, r`a^2 - 2ab + b^2`], [r`(x + a)(x + b)`, r`x^2 + (a + b)x + ab`], [r`(a + b + c)^2`, r`a^2 + b^2 + c^2 + 2ab + 2bc + 2ca`]]), [d(r`a^2 + b^2 + c^2`), d(r`(a + b + c)^2 - 2(ab + bc + ca)`)]], 'Summary table of the identities of part one.', 'Part 1 identities');

// Deck 2
const cubeTab = (() => {
  const rows = [['$a \\times a \\times a$', '1', 'a^3'], ['$a \\times a \\times b$', '3', 'a^2b'], ['$a \\times b \\times b$', '3', 'ab^2'], ['$b \\times b \\times b$', '1', 'b^3']];
  const total = rows.reduce((acc, [, n, v]) => acc.add(P(v).mul(P(n))), P('0'));
  must(total.eq(P('(a+b)^3')), 'blocks make the cube');
  return table(['Block', 'How many', 'Volume'], rows.map(([bk, n, v]) => [bk, n, d(v)]), 'Table of the eight blocks that make a cube of side a plus b: one a by a by a cube, three a by a by b slabs, three a by b by b rods and one b by b by b cube.', 'The eight blocks of a cube of side $a + b$');
})();
const derivFlow = flow('LR', [['s', r`$(a + b)^2 = a^2 + 2ab + b^2$`], ['m', r`Multiply by $(a + b)$`], ['p', r`$a^3 + 2a^2b + ab^2 + a^2b + 2ab^2 + b^3$`], ['c', r`$a^3 + 3a^2b + 3ab^2 + b^3$`]], [['s', 'm'], ['m', 'p', 'six products'], ['p', 'c', 'collect like terms']], 'Flow chart: start from the square of a plus b, multiply by a plus b to get six products, then collect like terms to reach the cube.', 'Deriving $(a + b)^3$');
chain([r`(a + b)(a^2 + 2ab + b^2) = a^3 + 2a^2b + ab^2 + a^2b + 2ab^2 + b^3 = a^3 + 3a^2b + 3ab^2 + b^3`]);
const termRows = (a, b, signB, parts) => parts.map(([lab, work, res]) => { must(P(work).eq(P(res)), `cube term ${work}`); return [d(lab), d(work), d(res)]; });
const ex1Cube = (() => {
  chain([r`(4p + 1)^3 = 64p^3 + 48p^2 + 12p + 1`]);
  return table(['Term', 'Working', 'Value'], termRows(0, 0, 0, [['a^3', '(4p)^3', '64p^3'], ['3a^2b', '3(4p)^2(1)', '48p^2'], ['3ab^2', '3(4p)(1)^2', '12p'], ['b^3', '1^3', '1']]), 'Table of the four terms of four p plus one all cubed: sixty four p cubed, forty eight p squared, twelve p and one.', 'Worked example 1: $(4p + 1)^3$');
})();
const cubeId = (() => {
  const env = { a: 3, b: 2 };
  must(ev('(a+b)^3', env) === 125 && 27 + 54 + 36 + 8 === 125, 'cube plus');
  must(ev('(a-b)^3', env) === 1 && 27 - 54 + 36 - 8 === 1, 'cube minus');
  must(ev('a^3+b^3', env) === 35 && 125 - 90 === 35 && ev('(a+b)^3-3ab(a+b)', env) === 35, 'sum of cubes');
  must(ev('a^3-b^3', env) === 19 && 1 + 18 === 19 && ev('(a-b)^3+3ab(a-b)', env) === 19, 'difference of cubes');
  chain([r`(a + b)^3 = a^3 + 3a^2b + 3ab^2 + b^3`]); chain([r`(a - b)^3 = a^3 - 3a^2b + 3ab^2 - b^3`]);
  chain([r`a^3 + b^3 = (a + b)^3 - 3ab(a + b)`]); chain([r`a^3 - b^3 = (a - b)^3 + 3ab(a - b)`]);
  return table(['Identity', 'Expanded', d(r`\text{Check with } a = 3,\ b = 2`)], [[d(r`(a + b)^3`), d(r`a^3 + 3a^2b + 3ab^2 + b^3`), d(r`125 = 27 + 54 + 36 + 8`)], [d(r`(a - b)^3`), d(r`a^3 - 3a^2b + 3ab^2 - b^3`), d(r`1 = 27 - 54 + 36 - 8`)], [d(r`a^3 + b^3`), d(r`(a + b)^3 - 3ab(a + b)`), d(r`35 = 125 - 90`)], [d(r`a^3 - b^3`), d(r`(a - b)^3 + 3ab(a - b)`), d(r`19 = 1 + 18`)]], 'Table of four cube identities with a numerical check using a equal to three and b equal to two.', 'Cube identities');
})();
const ex2Cube = (() => {
  chain([r`(2a - 5)^3 = 8a^3 - 60a^2 + 150a - 125`]);
  return table(['Term', 'Working', 'Value'], termRows(0, 0, 0, [['a^3', '(2a)^3', '8a^3'], ['-3a^2b', '-3(2a)^2(5)', '-60a^2'], ['3ab^2', '3(2a)(5)^2', '150a'], ['-b^3', '-5^3', '-125']]), 'Table of the four terms of two a minus five all cubed: eight a cubed, minus sixty a squared, one hundred fifty a and minus one hundred twenty five.', 'Worked example 2: $(2a - 5)^3$');
})();
const recipTab = (() => {
  const rows = [3, 6, 8].map((k) => {
    const a = reciprocalRoot(k);
    must(close(ev('a+\\dfrac{1}{a}', { a }), k), `witness for k = ${k}`);
    const s2 = k * k - 2, s3 = k ** 3 - 3 * k;
    must(close(ev('a^2+\\dfrac{1}{a^2}', { a }), s2) && close(ev('a^3+\\dfrac{1}{a^3}', { a }), s3), `values for k = ${k}`);
    return [d(`a + \\dfrac{1}{a} = ${k}`), d(`${k}^2 - 2 = ${s2}`), d(`${k}^3 - 3 \\times ${k} = ${s3}`)];
  });
  chain([r`(a + \dfrac{1}{a})^2 = a^2 + 2 + \dfrac{1}{a^2}`]); chain([r`(a + \dfrac{1}{a})^3 = a^3 + \dfrac{1}{a^3} + 3(a + \dfrac{1}{a})`]);
  return table([d(r`k = a + \dfrac{1}{a}`), d(r`a^2 + \dfrac{1}{a^2} = k^2 - 2`), d(r`a^3 + \dfrac{1}{a^3} = k^3 - 3k`)], rows, 'Table: for three values of k equal to a plus one over a, the values of a squared plus one over a squared and a cubed plus one over a cubed.', 'Powers of $a + \\dfrac{1}{a}$');
})();
const ex3Tab = (() => {
  const a = reciprocalRoot(10);
  must(close(ev('a+\\dfrac{1}{a}', { a }), 10) && close(ev('a^2+\\dfrac{1}{a^2}', { a }), 98) && close(ev('a^3+\\dfrac{1}{a^3}', { a }), 970) && 100 - 2 === 98 && 1000 - 30 === 970, 'example 3 values');
  return table(['Step', 'Working'], [['Square', d(r`\left(a + \dfrac{1}{a}\right)^2 = a^2 + 2 + \dfrac{1}{a^2} = 100`)], ['So', d(r`a^2 + \dfrac{1}{a^2} = 98`)], ['Cube', d(r`\left(a + \dfrac{1}{a}\right)^3 = a^3 + \dfrac{1}{a^3} + 3 \times 10 = 1000`)], ['So', d(r`a^3 + \dfrac{1}{a^3} = 970`)]], 'Table of the steps for finding a squared plus one over a squared and a cubed plus one over a cubed when a plus one over a is ten.', 'Worked example 3');
})();
const minusTab = (() => {
  const rows = [1, 2, 5].map((k) => {
    const a = (k + Math.sqrt(k * k + 4)) / 2;
    must(close(ev('a-\\dfrac{1}{a}', { a }), k), `witness for k = ${k}`);
    const s2 = k * k + 2, s3 = k ** 3 + 3 * k;
    must(close(ev('a^2+\\dfrac{1}{a^2}', { a }), s2) && close(ev('a^3-\\dfrac{1}{a^3}', { a }), s3), `minus values for k = ${k}`);
    return [d(`a - \\dfrac{1}{a} = ${k}`), d(`${k}^2 + 2 = ${s2}`), d(`${k}^3 + 3 \\times ${k} = ${s3}`)];
  });
  chain([r`(a - \dfrac{1}{a})^3 = a^3 - \dfrac{1}{a^3} - 3(a - \dfrac{1}{a})`]);
  return table([d(r`k = a - \dfrac{1}{a}`), d(r`a^2 + \dfrac{1}{a^2} = k^2 + 2`), d(r`a^3 - \dfrac{1}{a^3} = k^3 + 3k`)], rows, 'Table: for three values of k equal to a minus one over a, the values of a squared plus one over a squared and a cubed minus one over a cubed.', 'Powers of $a - \\dfrac{1}{a}$');
})();
const ex4Tab2 = (() => {
  const a = reciprocalRoot(5);
  must(close(ev('a^2+\\dfrac{1}{a^2}', { a }), 23) && close(ev('a+\\dfrac{1}{a}', { a }), 5) && close(ev('a^3+\\dfrac{1}{a^3}', { a }), 110) && 23 + 2 === 25 && 125 - 15 === 110, 'example 4 reverse values');
  return table(['Step', 'Working'], [['Add 2 to both sides of the given', d(r`\left(a + \dfrac{1}{a}\right)^2 = 23 + 2 = 25`)], ['Take the positive root (a positive)', d(r`a + \dfrac{1}{a} = 5`)], ['Cube identity', d(r`a^3 + \dfrac{1}{a^3} = 5^3 - 3 \times 5 = 110`)]], 'Table of the steps for starting from a squared plus one over a squared equal to twenty three, finding a plus one over a, and then a cubed plus one over a cubed.', 'Worked example 4: the reverse direction');
})();
const sumCubesTab = (() => {
  must(ev('a^3+b^3', { a: 3, b: 4 }) === 91 && ev('a+b', { a: 3, b: 4 }) === 7 && ev('ab', { a: 3, b: 4 }) === 12 && 343 - 252 === 91, 'a^3+b^3 witness');
  must(ev('a^3-b^3', { a: 5, b: 3 }) === 98 && ev('a-b', { a: 5, b: 3 }) === 2 && ev('ab', { a: 5, b: 3 }) === 15 && 8 + 90 === 98, 'a^3-b^3 witness');
  return table(['Given', 'Formula', 'Value'], [[d(r`a + b = 7,\ ab = 12`), d(r`a^3 + b^3 = (a + b)^3 - 3ab(a + b)`), d(r`343 - 252 = 91`)], [d(r`a - b = 2,\ ab = 15`), d(r`a^3 - b^3 = (a - b)^3 + 3ab(a - b)`), d(r`8 + 90 = 98`)]], 'Table of two examples: finding a cubed plus b cubed from a plus b and a b, and a cubed minus b cubed from a minus b and a b.', 'Cubes from the sum (or difference) and the product');
})();
const numTab = (() => {
  const rows = [
    [r`47^2`, r`(50 - 3)^2`, r`2500 - 300 + 9`, 2209], [r`405^2`, r`(400 + 5)^2`, r`160000 + 4000 + 25`, 164025],
    [r`61 \times 59`, r`(60 + 1)(60 - 1)`, r`3600 - 1`, 3599], [r`12^3`, r`(10 + 2)^3`, r`1000 + 600 + 120 + 8`, 1728],
  ];
  return table(['Number', 'Split', 'Expand', 'Value'], rows.map(([n, s, e, v]) => { chain([`${n} = ${s} = ${e} = ${v}`]); return [d(n), d(s), d(e), d(String(v))]; }), 'Table of four numbers evaluated with identities: forty seven squared, four hundred five squared, sixty one times fifty nine and twelve cubed.', 'Choose a round number close to the given one');
})();
const ex5Tab = (() => {
  chain([r`497 \times 503 = (500 - 3)(500 + 3) = 500^2 - 3^2 = 250000 - 9 = 249991`]);
  return table(['Step', 'Working'], [['Centre the numbers on $500$', d(r`497 = 500 - 3,\ 503 = 500 + 3`)], ['Sum times difference', d(r`(500 - 3)(500 + 3) = 500^2 - 3^2`)], ['Evaluate', d(r`250000 - 9 = 249991`)]], 'Table of the steps for four hundred ninety seven times five hundred three using a squared minus b squared.', 'Worked example 5');
})();
const ex6Tab = (() => {
  chain([r`49^3 = (50 - 1)^3 = 125000 - 7500 + 150 - 1 = 117649`]);
  return table(['Term', 'Working', 'Value'], termRows(0, 0, 0, [['a^3', '50^3', '125000'], ['-3a^2b', '-3(50^2)(1)', '-7500'], ['3ab^2', '3(50)(1^2)', '150'], ['-b^3', '-1^3', '-1']]).concat([[d(r`\text{Total}`), d(r`125000 - 7500 + 150 - 1`), d(r`117649`)]]), 'Table of the four terms of fifty minus one all cubed and their total, one hundred seventeen thousand six hundred forty nine.', 'Worked example 6: $49^3$');
})();
const chooseFlow = flow('TB', [['q', 'What must you evaluate?'], ['s', r`One number squared: split it and use $(a \pm b)^2$`], ['p', r`Two numbers equally far from a round number: use $(a + b)(a - b) = a^2 - b^2$`], ['c', r`One number cubed: split it and use $(a \pm b)^3$`]], [['q', 's', 'square'], ['q', 'p', 'product'], ['q', 'c', 'cube']], 'Decision chart: for a number squared split it and use the square identities; for a product of two numbers equally far from a round number use a squared minus b squared; for a cube split it and use the cube identities.', 'Which identity to choose');
must((50 - 1) ** 3 === 117649 && 497 * 503 === 249991 && 47 ** 2 === 2209 && 405 ** 2 === 164025 && 61 * 59 === 3599 && 12 ** 3 === 1728, 'numbers');
const sum2 = table(['Result', 'Identity'], idRows([[r`(a + b)^3`, r`a^3 + 3a^2b + 3ab^2 + b^3`], [r`(a - b)^3`, r`a^3 - 3a^2b + 3ab^2 - b^3`], [r`a^3 + b^3`, r`(a + b)^3 - 3ab(a + b)`], [r`a^3 - b^3`, r`(a - b)^3 + 3ab(a - b)`], [r`a^3 + \dfrac{1}{a^3}`, r`(a + \dfrac{1}{a})^3 - 3(a + \dfrac{1}{a})`], [r`a^3 - \dfrac{1}{a^3}`, r`(a - \dfrac{1}{a})^3 + 3(a - \dfrac{1}{a})`]]), 'Summary table of the cube identities of part two.', 'Part 2 identities');

// ---------------------------------------------------------------- decks
const d1 = deck({
  part: 1,
  title: 'Expansions — Part 1: Squares, products and three-term brackets',
  goals: ['Expand the square of a sum and of a difference, and the product of two brackets x plus a and x plus b', 'Expand the square of a three-term bracket, including the sign variants', 'Find the sum of squares of three numbers from their sum and the sum of their pair products', 'Check an expansion with a numerical test'],
  slides: [
    sl('title', 'Expansions, Part 1', { b: 'An **identity** is true for every value of the letters. A few identities let you expand brackets, and evaluate numbers, in one line.', v: gridAB, n: 'Welcome to expansions. An identity is a statement that stays true whatever numbers you put in. Look at the grid. A square of side a plus b is cut into a square of side a, a square of side b, and two rectangles. Adding the four areas gives the first and most important identity of this chapter.' }),
    sl('concept', 'What you will be able to do', { ul: ['**Expand** $(a \\pm b)^2$ and $(x + a)(x + b)$', '**Expand** $(a + b + c)^2$ with any signs', 'Find $a^2 + b^2 + c^2$ from $a + b + c$ and $ab + bc + ca$', '**Test** any expansion with numbers'], n: 'These are your goals for part one. You will expand squares of two terms, products of two brackets, and squares of three terms. You will also learn to find a sum of squares when you only know a sum and a sum of products. Always test an expansion with simple numbers.' }),
    sl('concept', 'Squares of a sum and a difference', { b: '$(a + b)^2 = a^2 + 2ab + b^2$ and $(a - b)^2 = a^2 - 2ab + b^2$. The middle term is **twice the product** of the two terms.', v: sqId, n: 'Here are the square of a sum, the square of a difference, and the product of a sum and a difference. Test with a equals five and b equals two: seven squared is forty nine, and twenty five plus twenty plus four is forty nine. For the difference, three squared is nine. The most common slip is forgetting the two in the middle term.' }),
    sl('concept', 'Why the middle term has a two', { b: 'The square of side $a + b$ holds a square $a^2$, a square $b^2$ and **two** rectangles, each $ab$.', v: sqGeo, n: 'The picture explains the two. The big square has side a plus b. It contains one square of side a, one square of side b, and two matching rectangles of sides a and b. So the area is a squared plus two a b plus b squared. If you leave out the second rectangle, the total is wrong.' }),
    sl('example', 'Worked example 1: a square rangoli', { b: 'A square rangoli has a side of $(5k + 2)$ cm. Expand to find its area.', ul: ['**Step 1 —** $a = 5k$, $b = 2$.', '**Step 2 —** $a^2 = 25k^2$, $2ab = 2 \\times 5k \\times 2 = 20k$, $b^2 = 4$.', '**Answer —** $25k^2 + 20k + 4$ cm$^2$.'], v: ex1Grid, n: 'Let a be five k and b be two. Then a squared is twenty five k squared. Twice a b is twice five k times two, which is twenty k. And b squared is four. In the grid, the two matching cells each hold ten k, and together they make the twenty k in the middle. The area is twenty five k squared plus twenty k plus four.' }),
    sl('check', 'Quick check: a rectangular mat', { b: 'Multiply the two brackets, then collect like terms.', chk: 'm02', n: 'Add the two numbers to get the middle coefficient, and multiply them to get the last term. Mind the signs, because one of the numbers is negative.' }),
    sl('concept', 'The product of two brackets x plus a and x plus b', { b: '$(x + a)(x + b) = x^2 + (a + b)x + ab$. The coefficient of $x$ is the **sum**; the last term is the **product**.', v: xabTab, n: 'Whenever both brackets start with x, there is a shortcut. The middle coefficient is the sum of the two numbers, and the last term is their product. For x plus four times x plus nine, the sum is thirteen and the product is thirty six. Keep the signs of the numbers: for x minus three and x minus eight, the sum is minus eleven and the product is plus twenty four.' }),
    sl('example', 'Worked example 2: one positive, one negative', { b: 'Expand $(z + 8)(z - 5)$.', ul: ['**Step 1 —** $a = 8$, $b = -5$.', '**Step 2 —** Sum $= 3$, product $= -40$.', '**Answer —** $z^2 + 3z - 40$.'], v: ex2Grid, n: 'Here the numbers are eight and minus five. Their sum is three and their product is minus forty. So the expansion is z squared plus three z minus forty. The grid shows the four products: z squared, minus five z, eight z and minus forty. The two middle cells combine to three z.' }),
    sl('concept', 'Reading the signs', { b: 'The signs of the two numbers tell you the signs of the middle term and the last term before you multiply anything.', v: signTab, n: 'Look at the signs first. If both numbers are positive, both terms are positive. If both are negative, the middle term is negative but the last term is positive. If the signs differ, the last term is always negative, and the middle term takes the sign of the larger number. This is a quick way to catch mistakes.' }),
    sl('check', 'Quick check: finding k', { b: 'Compare the coefficient of $x$ on both sides.', chk: 'm05', n: 'Expand the product on the right. Then compare the coefficient of x with the one on the left.' }),
    sl('concept', 'Squaring a three-term bracket', { b: '$(a + b + c)^2 = a^2 + b^2 + c^2 + 2ab + 2bc + 2ca$: **three squares** and **three cross terms**, each doubled.', v: grid3, n: 'Now squares with three terms. The grid has nine cells. The three diagonal cells are the squares. The six other cells are the products a b, b c and c a, and each one appears twice. So the expansion has three squares and three doubled cross terms. Every pair of letters must appear exactly once in the cross terms.' }),
    sl('example', 'Worked example 3: a bracket with signs', { b: 'Expand $(2x + 3y - 4z)^2$.', ul: ['**Squares —** $4x^2$, $9y^2$, $16z^2$.', '**Cross terms —** $2(2x)(3y) = 12xy$, $2(2x)(-4z) = -16xz$, $2(3y)(-4z) = -24yz$.', '**Answer —** $4x^2 + 9y^2 + 16z^2 + 12xy - 16xz - 24yz$.'], v: ex3Grid, n: 'Treat each term with its sign. The squares are four x squared, nine y squared and sixteen z squared, all positive. For the cross terms, multiply the signed terms and double. Two x times three y is six x y, doubled is twelve. Two x times minus four z gives minus sixteen x z. Three y times minus four z gives minus twenty four y z.' }),
    sl('concept', 'Sign variants', { b: 'The squares are always positive. Each cross term has the **product of the two signs** of its letters.', v: signVar, n: 'Compare four versions. The squares part never changes. In a plus b minus c, the terms with c are negative. In a minus b plus c, the terms with b are negative. In a minus b minus c, the cross term b c is positive, because two negatives multiply to a positive. Check each case by looking at the signs of the two letters in each cross term.' }),
    sl('check', 'Quick check: a cross term', { b: 'Find the coefficient of $xz$.', chk: 'm08', n: 'Multiply the coefficient of x by the coefficient of z, then double it. Keep the signs of the two terms.' }),
    sl('concept', 'Sum of squares from the sum and the pair sum', { b: 'Since $(a + b + c)^2 = a^2 + b^2 + c^2 + 2(ab + bc + ca)$, we get $a^2 + b^2 + c^2 = (a + b + c)^2 - 2(ab + bc + ca)$.', v: sumSqFlow, n: 'Often a problem gives you the sum of three numbers and the sum of their pair products, and asks for the sum of squares. Square the sum, then take away twice the pair sum. You do not need to find the numbers themselves. Only the two given totals matter.' }),
    sl('example', 'Worked example 4: no need to find the numbers', { b: 'If $a + b + c = 14$ and $ab + bc + ca = 63$, find $a^2 + b^2 + c^2$.', ul: ['**Step 1 —** $(a + b + c)^2 = 14^2 = 196$.', '**Step 2 —** $2(ab + bc + ca) = 126$.', '**Answer —** $196 - 126 = 70$.'], v: ex4Tab, n: 'Square the sum: fourteen squared is one hundred ninety six. Double the pair sum: twice sixty three is one hundred twenty six. Subtract: seventy. We can check with the numbers three, five and six, which add to fourteen and have pair products fifteen, thirty and eighteen. Their squares are nine, twenty five and thirty six, which add to seventy.' }),
    sl('check', 'Quick check: a missing pair sum', { b: 'Rearrange the same identity.', chk: 'fb3', n: 'This time the sum of squares is given and the pair sum is missing. Use the same identity, but solve for the pair sum.' }),
    sl('concept', 'An identity versus an equation', { b: 'An identity gives the **same graph** for both sides. $(x + 2)^2$ and $x^2 + 4x + 4$ coincide; $x^2 + 4$ does not.', v: idPlot, n: 'Here is how to see an identity. The curves for x plus two all squared and for x squared plus four x plus four lie exactly on top of each other. But x squared plus four is a different curve. At x equals one, the first two give nine, and the third gives only five. Dropping the middle term changes the answer.' }),
    sl('summary', 'Summary', { ul: ['$(a \\pm b)^2 = a^2 \\pm 2ab + b^2$', '$(x + a)(x + b) = x^2 + (a + b)x + ab$', '$(a + b + c)^2$: three squares and three doubled cross terms, signs from the signs of the terms', '$a^2 + b^2 + c^2 = (a + b + c)^2 - 2(ab + bc + ca)$', 'Test every expansion with small numbers'], v: sum1, n: 'To sum up part one. The square of a sum or difference has a doubled middle term. The product of x plus a and x plus b has the sum as the middle coefficient and the product as the last term. A three-term square has three squares and three doubled cross terms. And a sum of squares can be found from the sum and the pair sum.' }),
    sl('exam-tips', 'Exam tips: how marks are awarded', { ul: ['**Expand a square (2 marks):** correct identity 1 + simplified result 1', '**Sum of squares (2–3 marks):** identity 1 + substitution 1 + value 1', '**Mistake:** $(a + b)^2 = a^2 + b^2$ (the middle term is missing)', '**Mistake:** writing $ab$ instead of $2ab$ in the middle', '**Mistake:** losing a sign when a term is negative: $(2x - 3y)^2$ has $-12xy$', '**Habit:** test with $a = b = 1$ or a small witness'], n: 'In the examination, write the identity first, then substitute, then simplify. Each of these earns a mark. Watch for the three classic slips: dropping the middle term, forgetting the two, and losing a minus sign. A quick numerical test with small numbers catches all three.' }),
  ],
});

const d2 = deck({
  part: 2,
  title: 'Expansions — Part 2: Cubes, reciprocal identities and evaluating numbers',
  goals: ['Expand the cube of a sum and of a difference', 'Find a squared plus one over a squared, and the cubes, from a plus or minus one over a', 'Find a cubed plus b cubed from a plus b and a b', 'Use identities to evaluate numbers such as squares, cubes and special products'],
  slides: [
    sl('title', 'Expansions, Part 2', { b: 'A cube of side $a + b$ is built from **eight blocks**. Counting them gives the identity for $(a + b)^3$.', v: cubeTab, n: 'Welcome to part two, on cubes. A cube of side a plus b can be cut into eight blocks: one small cube of side a, one of side b, three flat slabs, and three long rods. The table counts them. Adding their volumes gives the cube identity.' }),
    sl('concept', 'What you will be able to do', { ul: ['**Expand** $(a + b)^3$ and $(a - b)^3$', 'Use $a \\pm \\dfrac{1}{a}$ to find $a^2 + \\dfrac{1}{a^2}$ and the cubes', 'Find $a^3 \\pm b^3$ from the sum or difference and the product', '**Evaluate** numbers with identities'], n: 'Here are the goals for part two. We expand cubes of two terms. We find squares and cubes of a plus one over a without finding a. We find the sum or difference of two cubes from a sum and a product. And we use all these identities to evaluate numbers quickly.' }),
    sl('concept', 'The cube of a sum', { b: '$(a + b)^3 = a^3 + 3a^2b + 3ab^2 + b^3$. Multiply $(a + b)$ by the square $a^2 + 2ab + b^2$ and collect.', v: derivFlow, n: 'To get the cube, take the square of a plus b and multiply it by a plus b once more. That makes six products. Then collect the like terms: two a squared b plus a squared b makes three a squared b, and a b squared plus two a b squared makes three a b squared. The result has four terms, with the coefficients one, three, three, one.' }),
    sl('example', 'Worked example 1: a cube with a number', { b: 'Expand $(4p + 1)^3$.', ul: ['**Step 1 —** $a = 4p$, $b = 1$.', '**Step 2 —** $a^3 = 64p^3$, $3a^2b = 48p^2$, $3ab^2 = 12p$, $b^3 = 1$.', '**Answer —** $64p^3 + 48p^2 + 12p + 1$.'], v: ex1Cube, n: 'Let a be four p and b be one. Cube four p to get sixty four p cubed. Three a squared b is three times sixteen p squared times one, which is forty eight p squared. Three a b squared is three times four p, which is twelve p. And one cubed is one. Add the four terms.' }),
    sl('concept', 'The cube of a difference, and cubes from sums', { b: 'In $(a - b)^3$ the signs **alternate**. Rearranging gives $a^3 + b^3 = (a + b)^3 - 3ab(a + b)$ and $a^3 - b^3 = (a - b)^3 + 3ab(a - b)$.', v: cubeId, n: 'For a minus b, the signs alternate: plus, minus, plus, minus. The table tests everything with a equals three and b equals two. A plus b is five, and five cubed is one hundred twenty five. Rearranging the identity, the sum of cubes is the cube of the sum minus three a b times the sum. Here that is one hundred twenty five minus ninety, which is thirty five, and indeed twenty seven plus eight is thirty five.' }),
    sl('example', 'Worked example 2: a negative term', { b: 'Expand $(2a - 5)^3$.', ul: ['**Step 1 —** $a \\to 2a$ and $b \\to 5$ in $(a - b)^3$.', '**Step 2 —** $8a^3$, $-3(4a^2)(5) = -60a^2$, $3(2a)(25) = 150a$, $-125$.', '**Answer —** $8a^3 - 60a^2 + 150a - 125$.'], v: ex2Cube, n: 'Here the signs alternate. Cube two a to get eight a cubed. Next, minus three times four a squared times five is minus sixty a squared. Then three times two a times twenty five is plus one hundred fifty a. Finally, minus five cubed is minus one hundred twenty five.' }),
    sl('check', 'Quick check: which expansion?', { b: 'Check the signs.', chk: 'm12', n: 'Remember that the signs alternate when the second term is subtracted, and that the middle coefficients are three and three.' }),
    sl('concept', 'The reciprocal identities for a plus one over a', { b: 'If $k = a + \\dfrac{1}{a}$, then $a^2 + \\dfrac{1}{a^2} = k^2 - 2$ and $a^3 + \\dfrac{1}{a^3} = k^3 - 3k$. You never need $a$.', v: recipTab, n: 'Let k be a plus one over a. Squaring gives a squared plus two plus one over a squared, so the sum of squares is k squared minus two. Cubing gives the cube sum plus three times k, so the sum of cubes is k cubed minus three k. For k equals six, that is thirty four and one hundred ninety eight. The table was tested with real values of a.' }),
    sl('example', 'Worked example 3: a plus one over a is ten', { b: 'If $a + \\dfrac{1}{a} = 10$, find $a^2 + \\dfrac{1}{a^2}$ and $a^3 + \\dfrac{1}{a^3}$.', ul: ['**Square —** $100 - 2 = 98$.', '**Cube —** $1000 - 3 \\times 10 = 970$.'], v: ex3Tab, n: 'Square the given equation: one hundred equals a squared plus two plus one over a squared, so the sum of squares is ninety eight. Cube it: one thousand equals the cube sum plus thirty, so the cube sum is nine hundred seventy. We never needed to solve for a, which is not a neat number here.' }),
    sl('concept', 'The reciprocal identities for a minus one over a', { b: 'If $k = a - \\dfrac{1}{a}$, then $a^2 + \\dfrac{1}{a^2} = k^2 + 2$ and $a^3 - \\dfrac{1}{a^3} = k^3 + 3k$. Note the **plus** signs.', v: minusTab, n: 'With a minus one over a, the cross term is minus two, so the sum of squares is k squared plus two. This time it is a plus. For the cube, the cross terms give minus three k, so the difference of cubes is k cubed plus three k. For k equals two, the squares sum to six and the cubes differ by fourteen.' }),
    sl('check', 'Quick check: a minus one over a', { b: 'Square both sides, then add two.', chk: 'm15', n: 'Square the given equation. The middle term is minus two. Move it across to the other side.' }),
    sl('example', 'Worked example 4: going the other way', { b: 'If $a > 0$ and $a^2 + \\dfrac{1}{a^2} = 23$, find $a + \\dfrac{1}{a}$ and $a^3 + \\dfrac{1}{a^3}$.', ul: ['**Step 1 —** $\\left(a + \\dfrac{1}{a}\\right)^2 = 23 + 2 = 25$.', '**Step 2 —** $a > 0$, so $a + \\dfrac{1}{a} = 5$.', '**Answer —** $5^3 - 3 \\times 5 = 110$.'], v: ex4Tab2, n: 'Now we start from the sum of squares. Add two to get the square of a plus one over a, which is twenty five. Since a is positive, a plus one over a is positive, so it is five and not minus five. Then use the cube identity: five cubed is one hundred twenty five, minus fifteen, which is one hundred ten.' }),
    sl('concept', 'Sum and difference of cubes from a sum and a product', { b: 'Knowing only $a + b$ and $ab$ is enough to find $a^3 + b^3$. For $a^3 - b^3$ use $a - b$ and $ab$.', v: sumCubesTab, n: 'Two examples. If a plus b is seven and a b is twelve, the sum of cubes is three hundred forty three minus three times twelve times seven, which is two hundred fifty two, giving ninety one. If a minus b is two and a b is fifteen, the difference of cubes is eight plus three times fifteen times two, which is ninety, giving ninety eight.' }),
    sl('check', 'Quick check: a minus one over a, cubed', { b: 'Cube both sides and rearrange.', chk: 'fb5', n: 'Cube the given equation. Collect the terms that make up the cube difference and move the three times k term across.' }),
    sl('concept', 'Evaluating numbers', { b: 'Split the number as a round number plus or minus a small one, then use the identity.', v: numTab, n: 'The identities make mental arithmetic easy. Forty seven is fifty minus three, so its square is two thousand five hundred minus three hundred plus nine. Four hundred five is four hundred plus five. Sixty one times fifty nine is sixty plus one times sixty minus one, which is three thousand six hundred minus one. And twelve cubed is ten plus two, cubed.' }),
    sl('example', 'Worked example 5: a product of two numbers', { b: 'Find $497 \\times 503$.', ul: ['**Step 1 —** $497 = 500 - 3$ and $503 = 500 + 3$.', '**Step 2 —** $(a - b)(a + b) = a^2 - b^2$ with $a = 500$, $b = 3$.', '**Answer —** $250000 - 9 = 249991$.'], v: ex5Tab, n: 'Both numbers are the same distance from five hundred: three below and three above. So the product is five hundred squared minus three squared. That is two hundred fifty thousand minus nine, which is two hundred forty nine thousand nine hundred ninety one.' }),
    sl('example', 'Worked example 6: a cube', { b: 'Find $49^3$.', ul: ['**Step 1 —** $49 = 50 - 1$.', '**Step 2 —** $(a - b)^3 = a^3 - 3a^2b + 3ab^2 - b^3$ with $a = 50$, $b = 1$.', '**Answer —** $125000 - 7500 + 150 - 1 = 117649$.'], v: ex6Tab, n: 'Write forty nine as fifty minus one. The cube of fifty is one hundred twenty five thousand. Then subtract three times fifty squared times one, which is seven thousand five hundred. Add three times fifty, which is one hundred fifty. Subtract one. The total is one hundred seventeen thousand six hundred forty nine.' }),
    sl('check', 'Quick check: a cube of fifty one', { b: 'Write $51$ as $50 + 1$.', chk: 'm22', n: 'Choose the round number fifty and the small number one. Keep every term, including the factors of three.' }),
    sl('concept', 'Which identity should I use?', { b: 'Look at the shape of the problem before you pick a tool.', v: chooseFlow, n: 'Before you start, look at the shape of the problem. A single number squared calls for the square identities. A product of two numbers that are equally far from a round number calls for a squared minus b squared. A cube calls for the cube identities. Choose the round number so that the small part has one digit.' }),
    sl('summary', 'Summary', { ul: ['$(a + b)^3 = a^3 + 3a^2b + 3ab^2 + b^3$; signs alternate for $(a - b)^3$', '$a^3 + b^3 = (a + b)^3 - 3ab(a + b)$; $a^3 - b^3 = (a - b)^3 + 3ab(a - b)$', '$a + \\dfrac{1}{a} = k$: $k^2 - 2$ and $k^3 - 3k$; $a - \\dfrac{1}{a} = k$: $k^2 + 2$ and $k^3 + 3k$', 'Evaluate numbers by splitting them around a round number'], v: sum2, n: 'To sum up part two. Cubes of a sum and a difference have the coefficients one, three, three, one, with alternating signs for the difference. Sums and differences of cubes follow from the sum or difference and the product. For a plus or minus one over a, square and cube the given equation. And to evaluate numbers, split them around a round number.' }),
    sl('exam-tips', 'Exam tips: how marks are awarded', { ul: ['**Expand a cube (2–3 marks):** identity 1 + each term substituted 1 + simplified result 1', '**Reciprocal problems (3 marks):** square or cube the given 1 + rearrange 1 + value 1', '**Mistake:** $(a + b)^3 = a^3 + b^3$ (the middle terms are missing)', '**Mistake:** $+2$ instead of $-2$ (or the reverse) when squaring $a \\pm \\dfrac{1}{a}$', '**Mistake:** losing the factor $3$ in $3ab(a + b)$', '**Habit:** show the split, such as $99 = 100 - 1$, as it earns a mark'], n: 'In cube questions, write the identity, then each of the four terms with its sign, then the total. For reciprocal problems, remember the sign flips: a plus one over a gives minus two, while a minus one over a gives plus two. And when you evaluate a number, always show how you split it, because that line earns a mark.' }),
  ],
});

// ---------------------------------------------------------------- notes
const notes = {
  unit: 'icse-9-mathematics-ch03', version: 1, title: 'Expansions — chapter notes', language: 'en',
  sections: [
    { heading: '1. Squares of a sum and a difference', body_md: r`An **identity** is true for every value of the letters.

$$(a + b)^2 = a^2 + 2ab + b^2, \qquad (a - b)^2 = a^2 - 2ab + b^2, \qquad (a + b)(a - b) = a^2 - b^2$$

- The middle term is **twice the product** of the two terms.
- A square of side $a + b$ holds $a^2$, $b^2$ and two rectangles $ab$.
- $(5k + 2)^2 = 25k^2 + 20k + 4$; $(2x - 3y)^2 = 4x^2 - 12xy + 9y^2$.`, key_terms: [{ term: 'Identity', definition_md: 'An equation that is true for every value of the letters in it.' }, { term: 'Binomial', definition_md: 'An expression with two terms, such as $a + b$.' }], formulas: [{ latex: r`(a + b)^2 = a^2 + 2ab + b^2`, label: 'Square of a sum' }, { latex: r`(a - b)^2 = a^2 - 2ab + b^2`, label: 'Square of a difference' }], visual: sqId, visuals: [gridAB, sqGeo], topic_ids: [topic(1)] },
    { heading: '2. The product (x + a)(x + b)', body_md: r`$$(x + a)(x + b) = x^2 + (a + b)x + ab$$

The coefficient of $x$ is the **sum** of the two numbers and the last term is their **product**; keep their signs. $(z + 8)(z - 5) = z^2 + 3z - 40$.

If both numbers are positive both terms are positive; both negative gives a negative middle term and a positive last term; opposite signs give a negative last term.`, key_terms: [{ term: 'Coefficient', definition_md: 'The number multiplying a letter in a term, such as $13$ in $13x$.' }], formulas: [{ latex: r`(x + a)(x + b) = x^2 + (a + b)x + ab`, label: 'Product of two binomials' }], visual: xabTab, visuals: [signTab, ex2Grid], topic_ids: [topic(1)] },
    { heading: '3. The square of a three-term bracket', body_md: r`$$(a + b + c)^2 = a^2 + b^2 + c^2 + 2ab + 2bc + 2ca$$

- Three squares (always positive) and three cross terms, each doubled.
- A cross term takes the product of the signs of its two letters: $(a - b - c)^2 = a^2 + b^2 + c^2 - 2ab + 2bc - 2ca$.
- $(2x + 3y - 4z)^2 = 4x^2 + 9y^2 + 16z^2 + 12xy - 16xz - 24yz$.`, key_terms: [{ term: 'Cross term', definition_md: 'A term in the expansion that contains two different letters, such as $2ab$.' }], formulas: [{ latex: r`(a + b + c)^2 = a^2 + b^2 + c^2 + 2ab + 2bc + 2ca`, label: 'Square of a trinomial' }], visual: grid3, visuals: [signVar, ex3Grid], topic_ids: [topic(2)] },
    { heading: '4. Sum of squares from the sum and the pair sum', body_md: r`$$a^2 + b^2 + c^2 = (a + b + c)^2 - 2(ab + bc + ca)$$

You need only the two totals, never the numbers: if $a + b + c = 14$ and $ab + bc + ca = 63$ then $a^2 + b^2 + c^2 = 196 - 126 = 70$.

If $a + b + c = 0$ then $a^2 + b^2 + c^2 = -2(ab + bc + ca)$. Also $(a - b)^2 + (b - c)^2 + (c - a)^2 = 2(a^2 + b^2 + c^2) - 2(ab + bc + ca)$.`, key_terms: [], formulas: [{ latex: r`a^2 + b^2 + c^2 = (a + b + c)^2 - 2(ab + bc + ca)`, label: 'Sum of squares' }], visual: sumSqFlow, visuals: [ex4Tab, idPlot], topic_ids: [topic(2)] },
    { heading: '5. The cube of a sum and a difference', body_md: r`$$(a + b)^3 = a^3 + 3a^2b + 3ab^2 + b^3, \qquad (a - b)^3 = a^3 - 3a^2b + 3ab^2 - b^3$$

- A cube of side $a + b$ is made of eight blocks: $a^3$, three $a^2b$, three $ab^2$, $b^3$.
- The coefficients are $1, 3, 3, 1$; in $(a - b)^3$ the signs alternate.
- $(4p + 1)^3 = 64p^3 + 48p^2 + 12p + 1$; $(2a - 5)^3 = 8a^3 - 60a^2 + 150a - 125$.`, key_terms: [], formulas: [{ latex: r`(a + b)^3 = a^3 + 3a^2b + 3ab^2 + b^3`, label: 'Cube of a sum' }, { latex: r`(a - b)^3 = a^3 - 3a^2b + 3ab^2 - b^3`, label: 'Cube of a difference' }], visual: cubeTab, visuals: [derivFlow, ex1Cube, ex2Cube], topic_ids: [topic(3)] },
    { heading: '6. Reciprocals, and sums of cubes', body_md: r`If $a + \dfrac{1}{a} = k$: $a^2 + \dfrac{1}{a^2} = k^2 - 2$ and $a^3 + \dfrac{1}{a^3} = k^3 - 3k$.

If $a - \dfrac{1}{a} = k$: $a^2 + \dfrac{1}{a^2} = k^2 + 2$ and $a^3 - \dfrac{1}{a^3} = k^3 + 3k$.

$$a^3 + b^3 = (a + b)^3 - 3ab(a + b), \qquad a^3 - b^3 = (a - b)^3 + 3ab(a - b)$$

Going back: $a^2 + \dfrac{1}{a^2} = 23$ gives $\left(a + \dfrac{1}{a}\right)^2 = 25$, so $a + \dfrac{1}{a} = 5$ for $a > 0$.`, key_terms: [{ term: 'Reciprocal', definition_md: 'The reciprocal of $a$ is $\\dfrac{1}{a}$; their product is $1$.' }], formulas: [{ latex: r`a^3 + \dfrac{1}{a^3} = \left(a + \dfrac{1}{a}\right)^3 - 3\left(a + \dfrac{1}{a}\right)`, label: 'Cube of a plus its reciprocal' }, { latex: r`a^3 + b^3 = (a + b)^3 - 3ab(a + b)`, label: 'Sum of cubes' }], visual: recipTab, visuals: [minusTab, ex3Tab, ex4Tab2, sumCubesTab, cubeId], topic_ids: [topic(3)] },
    { heading: '7. Evaluating numbers with identities', body_md: r`Split the number around a round number and choose the identity by its shape.

- One number squared: $47^2 = (50 - 3)^2 = 2209$.
- Two numbers equally far from a round number: $497 \times 503 = 500^2 - 3^2 = 249991$.
- One number cubed: $49^3 = (50 - 1)^3 = 117649$.

Show the split; it earns a mark.`, key_terms: [], formulas: [{ latex: r`(a + b)(a - b) = a^2 - b^2`, label: 'Product of a sum and a difference' }], visual: numTab, visuals: [ex5Tab, ex6Tab, chooseFlow], topic_ids: [topic(4)] },
  ],
  exam_tips_md: r`**How marks are awarded**
- *Expand a square or product (2 marks):* correct identity 1; simplified result 1.
- *Sum of squares or cubes from givens (2–3 marks):* identity 1; substitution 1; value 1.
- *Evaluate with an identity (2–3 marks):* split of the number 1; identity with all terms 1; value 1.
- *10-mark structured question:* parts (a), (b), (c) usually 3 + 3 + 4; show all working.

**Common mistakes**
1. Writing $(a + b)^2 = a^2 + b^2$ and $(a + b)^3 = a^3 + b^3$.
2. Writing $ab$ instead of $2ab$ as the middle term.
3. Losing a minus sign: $(2x - 3y)^2$ has the middle term $-12xy$.
4. Using $+2$ instead of $-2$ when squaring $a + \dfrac{1}{a}$, or $-2$ instead of $+2$ for $a - \dfrac{1}{a}$.
5. Forgetting the factor $3$ in $3ab(a + b)$.
6. Taking a negative root when the question says $a > 0$.`,
  status: 'draft', provenance: d1.provenance,
};

// ---------------------------------------------------------------- flashcards
const fc = (id, front_md, back_md, tag, t) => ({ id, front_md, back_md, tag, topic_id: topic(t) });
[r`(a + b)^2 = a^2 + 2ab + b^2`, r`(a - b)^2 = a^2 - 2ab + b^2`, r`(x + a)(x + b) = x^2 + (a + b)x + ab`, r`(a + b)(a - b) = a^2 - b^2`, r`(a + b + c)^2 = a^2 + b^2 + c^2 + 2ab + 2bc + 2ca`, r`(a + b)^3 = a^3 + 3a^2b + 3ab^2 + b^3`, r`(a - b)^3 = a^3 - 3a^2b + 3ab^2 - b^3`, r`a^3 + b^3 = (a + b)^3 - 3ab(a + b)`, r`a^3 - b^3 = (a - b)^3 + 3ab(a - b)`, r`a^2 + b^2 + c^2 = (a + b + c)^2 - 2(ab + bc + ca)`].forEach((l) => chain([l]));
chain([r`(7a - 2b)^2 = 49a^2 - 28ab + 4b^2`]); chain([r`(x - 9)(x + 4) = x^2 - 5x - 36`]); chain([r`(a - b - c)^2 = a^2 + b^2 + c^2 - 2ab + 2bc - 2ca`]);
chain([r`(3m + 2)^3 = 27m^3 + 54m^2 + 36m + 8`]); chain([r`103^2 = (100 + 3)^2 = 10000 + 600 + 9 = 10609`]); chain([r`98^3 = (100 - 2)^3 = 1000000 - 60000 + 1200 - 8 = 941192`]);
must(ev('a^2+\\dfrac{1}{a^2}', { a: 2 }) === 4.25 && ev('(a+\\dfrac{1}{a})^2-2', { a: 2 }) === 4.25, 'f reciprocal witness a = 2');
must(ev('a^3+b^3', { a: 1, b: 2 }) === 9, 'f witness');
const flashcards = {
  unit: 'icse-9-mathematics-ch03', version: 1, language: 'en',
  cards: [
    fc('f01', 'What is an **identity**?', 'An equation that is true for every value of the letters in it.', 'definition', 1),
    fc('f02', 'What is a **binomial**?', r`An expression with two terms, such as $a + b$ or $3x - 5$.`, 'definition', 1),
    fc('f03', 'What is a **cross term** in $(a + b + c)^2$?', r`A term with two different letters: $2ab$, $2bc$ or $2ca$.`, 'definition', 2),
    fc('f04', 'What is the **reciprocal** of $a$?', r`$\dfrac{1}{a}$, and $a \times \dfrac{1}{a} = 1$.`, 'definition', 3),
    fc('f05', 'What is a **coefficient**?', r`The number multiplying a letter in a term: $13$ in $13x$.`, 'definition', 1),
    fc('f06', 'Expand $(a + b)^2$.', r`$a^2 + 2ab + b^2$.`, 'formula', 1),
    fc('f07', 'Expand $(a - b)^2$.', r`$a^2 - 2ab + b^2$.`, 'formula', 1),
    fc('f08', 'Expand $(x + a)(x + b)$.', r`$x^2 + (a + b)x + ab$.`, 'formula', 1),
    fc('f09', 'Expand $(a + b + c)^2$.', r`$a^2 + b^2 + c^2 + 2ab + 2bc + 2ca$.`, 'formula', 2),
    fc('f10', 'Find $a^2 + b^2 + c^2$ from $s = a + b + c$ and $q = ab + bc + ca$.', r`$s^2 - 2q$.`, 'formula', 2),
    fc('f11', 'Expand $(a + b)^3$.', r`$a^3 + 3a^2b + 3ab^2 + b^3$.`, 'formula', 3),
    fc('f12', 'Expand $(a - b)^3$.', r`$a^3 - 3a^2b + 3ab^2 - b^3$.`, 'formula', 3),
    fc('f13', 'Write $a^3 + b^3$ using $a + b$ and $ab$.', r`$(a + b)^3 - 3ab(a + b)$.`, 'formula', 3),
    fc('f14', 'Why does $(a + b)^2$ have the middle term $2ab$?', r`The square of side $a + b$ holds two rectangles of area $ab$, besides $a^2$ and $b^2$.`, 'concept', 1),
    fc('f15', 'How do the signs of $a$ and $b$ fix the signs in $(x + a)(x + b)$?', r`Both $+$: both terms $+$. Both $-$: middle $-$, last $+$. Opposite: last term $-$.`, 'concept', 1),
    fc('f16', 'If $a + \\dfrac{1}{a} = k$, what is $a^2 + \\dfrac{1}{a^2}$?', r`$k^2 - 2$, because $\left(a + \dfrac{1}{a}\right)^2 = a^2 + 2 + \dfrac{1}{a^2}$.`, 'concept', 3),
    fc('f17', 'If $a - \\dfrac{1}{a} = k$, what is $a^2 + \\dfrac{1}{a^2}$?', r`$k^2 + 2$: squaring gives $-2$, which moves across as $+2$.`, 'concept', 3),
    fc('f18', 'When does $(a + b + c)^2 = a^2 + b^2 + c^2$?', r`Exactly when $ab + bc + ca = 0$.`, 'concept', 2),
    fc('f19', 'Is $(a + b)^3 = a^3 + b^3$?', r`No. The middle terms $3a^2b + 3ab^2$ are missing; at $a = b = 1$ the sides are $8$ and $2$.`, 'fact', 3),
    fc('f20', 'What are the coefficients in $(a + b)^3$?', r`$1, 3, 3, 1$; the signs alternate in $(a - b)^3$.`, 'fact', 3),
    fc('f21', 'If $a + b + c = 0$, what is $a^2 + b^2 + c^2$?', r`$-2(ab + bc + ca)$.`, 'fact', 2),
    fc('f22', 'Expand $(7a - 2b)^2$.', r`$49a^2 - 28ab + 4b^2$.`, 'example', 1),
    fc('f23', 'Expand $(x - 9)(x + 4)$.', r`Sum $-5$, product $-36$: $x^2 - 5x - 36$.`, 'example', 1),
    fc('f24', 'Expand $(a - b - c)^2$.', r`$a^2 + b^2 + c^2 - 2ab + 2bc - 2ca$.`, 'example', 2),
    fc('f25', 'Expand $(3m + 2)^3$.', r`$27m^3 + 54m^2 + 36m + 8$.`, 'example', 3),
    fc('f26', 'Find $103^2$.', r`$(100 + 3)^2 = 10000 + 600 + 9 = 10609$.`, 'example', 4),
    fc('f27', 'Find $98^3$.', r`$(100 - 2)^3 = 1000000 - 60000 + 1200 - 8 = 941192$.`, 'example', 4),
    fc('f28', 'Common slip when squaring $2x - 3y$?', r`Writing $4x^2 - 9y^2$ or $4x^2 + 9y^2$: the middle term $-12xy$ is missing.`, 'exam-tip', 1),
    fc('f29', 'What should you write first in an expansion question?', 'The identity, then the substitution, then the simplified result: each earns a mark.', 'exam-tip', 1),
    fc('f30', 'How can you test an expansion quickly?', r`Put small numbers in both sides, for example $a = 2$, $b = 1$, and compare.`, 'exam-tip', 1),
    fc('f31', 'Picture: a square of side $a + b$ split by two lines. Which parts make its area?', r`A square $a^2$, a square $b^2$ and two rectangles $ab$.`, 'diagram', 1),
    fc('f32', 'Picture: a cube of side $a + b$ cut into eight blocks. How many of each?', r`$1$ block $a^3$, $3$ blocks $a^2b$, $3$ blocks $ab^2$, $1$ block $b^3$.`, 'diagram', 3),
  ],
  status: 'draft', provenance: d1.provenance,
};

// ---------------------------------------------------------------- release + tests
const release = {
  unit: 'icse-9-mathematics-ch03', version: 1, academic_year: '2026-27', created_at: '2026-11-09T00:00:00+05:30',
  decks: [d1, d2], notes, flashcards, questions: [],
  build: { run_id: null, checks: { syllabus: 'topics t01–t04 as in catalog/cisce/icse-9/mathematics/syllabus.yaml (squares and (x + a)(x + b), the square of a trinomial and the sum of squares from sums, cubes and the a ± 1/a family, evaluation of numbers); the chapter lists no removed topics', exact_arithmetic: 'every typed expansion, worked line, table row and note formula is multiplied out by src/poly.mjs (exact Laurent polynomials in single-letter variables with rational coefficients) and must be an identity; every value that depends on a stated condition is also checked at a witness number that satisfies the condition (rational where one exists, otherwise the real root of the quadratic)' } },
};
const tests = chapterTests('Expansions', {
  A: ['m03', 'm09', 'm14', 'm19', 'ar1', 's202', 's301'],
  B: ['l01', 'l06'],
}, {
  A: ['m04', 'm06', 'm10', 'm13', 'm16', 'm18', 'm21', 'ar4', 's201', 's204', 's207', 's302', 's304'],
  B: ['l02', 'l03', 'l07'],
});
build({ dir: DIR, release, testsSpec: tests });
