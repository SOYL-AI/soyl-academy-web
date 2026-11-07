// CBSE 9 Mathematics ch14 Statistics: further recall and understanding items (bank only). The mix was widened here, and a few unused
// application items were dropped, so that application or higher stays inside the 45-65% band (nothing was retagged).
import { Q, mk } from './lib.mjs';
import { r, close, mean, wmean, sum } from './h.mjs';
import { SHOE, SHOE_F } from './figs.mjs';

const T = (k, o, chk) => Q(k, mk.mcq({ stem: o.stem, opts: o.opts, key: 'a', sol: o.sol, d: o.d, c: o.c, t: o.t, time: o.time ?? 60 }), chk);

T('m23', { stem: 'In a tally, every fifth stroke is drawn', opts: ['across the four strokes before it', 'as a separate stroke after a gap', 'shorter than the other strokes', 'in a new column'], sol: 'The fifth stroke goes across the four strokes before it, so that the strokes come in groups of five that are easy to count.', d: 1, c: 'recall', t: [1], time: 45 }, (Cx) => {
  Cx.which(['across', 'gap', 'shorter', 'column'], 'across');
});
T('m24', { stem: 'The frequencies in a frequency table add up to', opts: ['the number of observations', 'the largest value', 'the class width', 'the simple mean'], sol: 'Every observation is counted once, so the frequencies add up to the number of observations. For the shoe sizes of $30$ students they add up to $3 + 7 + 11 + 6 + 3 = 30$.', d: 1, c: 'understanding', t: [1], time: 45 }, (Cx) => {
  Cx.assert(sum(SHOE_F) === SHOE.length && SHOE.length === 30, 'the frequencies add up to 30');
  Cx.which(['observations', 'largest', 'width', 'mean'], 'observations');
});
T('m25', { stem: r`The weighted mean of the values $x_1$, $x_2$, $x_3$ with weights $w_1$, $w_2$, $w_3$ is`, opts: [r`$\dfrac{x_1w_1 + x_2w_2 + x_3w_3}{w_1 + w_2 + w_3}$`, r`$\dfrac{x_1 + x_2 + x_3}{3}$`, r`$x_1w_1 + x_2w_2 + x_3w_3$`, r`$\dfrac{w_1 + w_2 + w_3}{x_1 + x_2 + x_3}$`], sol: r`Multiply each value by its weight, add, and divide by the total of the weights. The second expression is the simple mean, and the third forgets to divide by the total weight.`, d: 1, c: 'recall', t: [2], time: 60 }, (Cx) => {
  const x = [60, 70, 90], w = [2, 3, 5];
  Cx.which([(x[0] * w[0] + x[1] * w[1] + x[2] * w[2]) / (w[0] + w[1] + w[2]), (x[0] + x[1] + x[2]) / 3, x[0] * w[0] + x[1] * w[1] + x[2] * w[2], (w[0] + w[1] + w[2]) / (x[0] + x[1] + x[2])], wmean(x, w));
});
T('m26', { stem: 'The scale on the vertical axis of a bar graph should start at', opts: ['$0$', 'the smallest value in the data', 'the largest value in the data', 'any number'], sol: r`Heights of bars are compared by eye, so they must be in the same ratio as the values. For the values $20$, $40$, $60$ the heights are in the ratio $1 : 2 : 3$ from $0$, but a scale starting at $10$ gives $10 : 30 : 50$, which is not the same.`, d: 1, c: 'understanding', t: [3], time: 60 }, (Cx) => {
  const v = [20, 40, 60], ratio = (base) => v.map((x) => (x - base) / (v[0] - base));
  Cx.assert(close(ratio(0)[2], 3) && !close(ratio(10)[2], 3), 'a scale starting at 10 spoils the ratios');
  Cx.which(['zero', 'smallest', 'largest', 'any'], 'zero');
});
Q('tf6', mk.tf({ stem: 'The bars of a bar graph can be put in any order without changing what the graph shows, but the bars of a histogram cannot be rearranged.', key: 't', sol: 'The bars of a bar graph stand for separate categories, so their order does not matter. The bars of a histogram stand for classes of numbers that follow one another, so they must stay in the order of the classes. The statement is true.', d: 1, c: 'understanding', t: [3] }), (Cx) => { Cx.key('t'); });
Q('fb4', mk.fill({ stem: 'The sum of all the frequencies of a frequency table is the total number of ____.', acc: [['observations', 'observation']], sol: 'Each observation is counted once in the table, so the frequencies add up to the total number of observations. So the blank is observations.', d: 1, c: 'recall', t: [1] }), (Cx) => { Cx.blank('observations'); });
Q('s209', mk.short({ marks: 2, stem: 'A teacher says: "When the papers have different importance, the weighted mean of a student\'s marks is fairer than the simple mean." Explain this with an example of two marks, $50$ and $90$, where the second paper has $3$ times the weight of the first.', model: r`In a weighted mean a paper that counts more has more effect on the result.\n\nWeighted mean $= \dfrac{50 \times 1 + 90 \times 3}{1 + 3} = \dfrac{320}{4} = 80$, while the simple mean is $\dfrac{50 + 90}{2} = 70$.\n\nThe simple mean ignores the fact that the second paper counts three times as much, so the weighted mean $80$ is fairer.`, sol: 'Weighted mean 80 against simple mean 70, with the reason.', scheme: [['Weighted mean 80 and simple mean 70', 1], ['The paper with more weight should count more', 1]], d: 2, c: 'understanding', t: [2], time: 105 }), (Cx) => {
  Cx.assert(wmean([50, 90], [1, 3]) === 80 && mean([50, 90]) === 70 && 50 * 1 + 90 * 3 === 320, '80 and 70');
  Cx.model([320, 80, 70]);
});
