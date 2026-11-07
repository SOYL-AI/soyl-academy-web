// CBSE 9 Mathematics ch14 Statistics: objective items. Every answer is recomputed from the givens (raw data grouped by code, weighted means,
// frequency densities, readings of the figures from their data); the options are typed independently of the computation.
import { Q, mk } from './lib.mjs';
import { r, must, close, rd, sum, mean, wmean, tally, groupFreq, classMarks, widths, density } from './h.mjs';
import { HW_E, HW_F, EL_E, EL_F, DAYS, SAMOSA, SANDWICH, JUICE, CANTEEN_TOT, DRINK, fDrinks, fStackCanteen, fHistHome, fHistElec, fPolyElec } from './figs.mjs';

const T = (k, o, chk) => Q(k, mk.mcq({ stem: o.stem, opts: o.opts, key: 'a', sol: o.sol, d: o.d, c: o.c, t: o.t, time: o.time ?? 75, assets: o.assets }), chk);
const dash = (a, b) => `${a}–${b}`;

// =============================================================== MCQ (m01-m06 are the check-slide items)
T('m01', { stem: r`A frequency table groups the homework times of students into the classes $0$–$15$, $15$–$30$, $30$–$45$, $45$–$60$, $60$–$75$ and $75$–$90$ minutes. A student who worked exactly $30$ minutes is counted in the class`, opts: [r`$30$–$45$`, r`$15$–$30$`, 'both of these classes', 'neither of these classes'], sol: r`The lower limit of a class belongs to the class and the upper limit belongs to the next class. So $30$ goes into $30$–$45$, not into $15$–$30$.`, d: 1, c: 'understanding', t: [1], time: 60 }, (Cx) => {
  const idx = groupFreq([30], HW_E).findIndex((v) => v === 1);
  Cx.assert(groupFreq([30], HW_E).reduce((s, v) => s + v, 0) === 1, 'the value 30 is counted in exactly one class');
  Cx.which([dash(30, 45), dash(15, 30), 'both', 'neither'], dash(HW_E[idx], HW_E[idx + 1]));
});
T('m02', { stem: r`The bar graph shows the favourite drink of $30$ students in a school canteen in Surat. How many students chose tea or lassi?`, opts: [r`$13$`, r`$19$`, r`$3$`, r`$24$`], sol: r`Tea has $8$ students and lassi has $5$, so $8 + 5 = 13$ students. The value $19$ is tea plus milk, and $24$ is everybody except juice.`, d: 1, c: 'application', t: [3], time: 60, assets: [fDrinks] }, (Cx) => {
  const [tea, milk, juice, lassi] = DRINK.vals;
  Cx.assert(tea + milk + juice + lassi === 30, 'the four bars make 30');
  Cx.which([tea + lassi, tea + milk, tea - lassi, 30 - juice], 13);
});
T('m03', { stem: r`The stacked bar graph shows the items sold in a school canteen from Monday to Friday. On Thursday, how many more samosas than juices were sold?`, opts: [r`$10$`, r`$25$`, r`$60$`, r`$35$`], sol: r`On Thursday $35$ samosas and $25$ juices were sold, so there were $35 - 25 = 10$ more samosas. The value $60$ is their sum.`, d: 2, c: 'application', t: [3], time: 60, assets: [fStackCanteen] }, (Cx) => {
  Cx.assert(DAYS[3] === 'Thu' && SAMOSA[3] === 35 && JUICE[3] === 25, 'Thursday: 35 samosas, 25 juices');
  Cx.which([SAMOSA[3] - JUICE[3], JUICE[3], SAMOSA[3] + JUICE[3], SAMOSA[3]], 10);
});
T('m04', { stem: r`A shopkeeper in Surat mixes $20$ kg of dal at $\text{Rs } 90$ per kg with $30$ kg of dal at $\text{Rs } 80$ per kg. The average price of the mixture per kg is`, opts: [r`$\text{Rs } 84$`, r`$\text{Rs } 85$`, r`$\text{Rs } 170$`, r`$\text{Rs } 80$`], sol: r`The quantities are the weights: $\dfrac{20 \times 90 + 30 \times 80}{20 + 30} = \dfrac{1800 + 2400}{50} = \dfrac{4200}{50} = 84$. The value $85$ is the simple mean of $90$ and $80$, which ignores the quantities.`, d: 2, c: 'application', t: [2], time: 90 }, (Cx) => {
  Cx.assert(20 * 90 + 30 * 80 === 4200 && mean([90, 80]) === 85, '4200 and 85');
  Cx.which([wmean([90, 80], [20, 30]), mean([90, 80]), 90 + 80, 80], 84);
});
T('m05', { stem: r`The histogram shows the units of electricity used by $50$ households in two months. How many households used $200$ units or more?`, opts: [r`$37$`, r`$15$`, r`$13$`, r`$22$`], sol: r`The bars from $200$ onwards have heights $15$, $12$, $6$ and $4$, so $15 + 12 + 6 + 4 = 37$ households. The value $13$ is the number below $200$ units, and $22$ is the number above $250$.`, d: 2, c: 'application', t: [3], time: 75, assets: [fHistElec] }, (Cx) => {
  Cx.assert(sum(EL_F) === 50 && sum(EL_F.slice(0, 2)) === 13, '50 households; 13 below 200');
  Cx.which([sum(EL_F.slice(2)), EL_F[2], sum(EL_F.slice(0, 2)), sum(EL_F.slice(3))], 37);
});
T('m06', { stem: r`A frequency polygon is drawn for the classes $100$–$150$, $150$–$200$, up to $350$–$400$, and closed with an empty class at each end. It touches the axis at the class marks`, opts: [r`$75$ and $425$`, r`$100$ and $400$`, r`$50$ and $450$`, r`$0$ and $500$`], sol: r`The extra classes are $50$–$100$ and $400$–$450$, with class marks $\dfrac{50 + 100}{2} = 75$ and $\dfrac{400 + 450}{2} = 425$.`, d: 2, c: 'application', t: [3], time: 75, assets: [fPolyElec] }, (Cx) => {
  const t = `${classMarks([50, 100])[0]},${classMarks([400, 450])[0]}`;
  Cx.assert(widths([50, 100])[0] === widths(EL_E)[0], 'the extra classes have the same width');
  Cx.which(['75,425', '100,400', '50,450', '0,500'], t);
});

// =============================================================== MCQ for the tests
T('m07', { stem: 'A student asks each of her classmates about the number of siblings and notes the answers herself. These data are called', opts: ['primary data', 'secondary data', 'grouped data', 'class data'], sol: 'Data collected directly by the investigator for her own purpose are primary data. Secondary data are taken from a source collected by someone else.', d: 1, c: 'recall', t: [1], time: 45 }, (Cx) => {
  const collectedByHerself = true;
  Cx.which(['primary', 'secondary', 'grouped', 'class'], collectedByHerself ? 'primary' : 'secondary');
});
T('m08', { stem: 'A team in Chennai writes a report using the rainfall figures of the last ten years published by the weather department. For the team these are', opts: ['secondary data', 'primary data', 'weighted data', 'frequency data'], sol: 'The team did not collect the figures itself; it took them from a published source. They are secondary data.', d: 1, c: 'understanding', t: [1], time: 45 }, (Cx) => {
  const collectedByTeam = false;
  Cx.which(['secondary', 'primary', 'weighted', 'frequency'], collectedByTeam ? 'primary' : 'secondary');
});
T('m09', { stem: r`The class mark of the class $40$–$60$ is`, opts: [r`$50$`, r`$20$`, r`$100$`, r`$40$`], sol: r`The class mark is the mid-point of the class: $\dfrac{40 + 60}{2} = 50$. The value $20$ is the class width, and $100$ is the sum of the limits.`, d: 1, c: 'understanding', t: [1], time: 45 }, (Cx) => {
  Cx.which([classMarks([40, 60])[0], widths([40, 60])[0], 40 + 60, 40], 50);
});
T('m10', { stem: r`A table of the heights of students uses classes of width $5$ cm starting at $140$ cm. The fourth class is`, opts: [r`$155$–$160$`, r`$150$–$155$`, r`$160$–$165$`, r`$140$–$145$`], sol: r`The classes are $140$–$145$, $145$–$150$, $150$–$155$ and $155$–$160$. The fourth class is $155$–$160$, because its lower limit is $140 + 3 \times 5 = 155$.`, d: 1, c: 'application', t: [1], time: 60 }, (Cx) => {
  const lo = 140 + 3 * 5;
  Cx.which([dash(lo, lo + 5), dash(150, 155), dash(160, 165), dash(140, 145)], dash(lo, lo + 5));
});
T('m11', { stem: 'In a histogram with equal class widths, the height of a bar is proportional to', opts: ['the frequency of the class', 'the class mark', 'the lower limit of the class', 'the number of classes'], sol: 'With equal widths the areas are in the same ratio as the heights, so the height shows the frequency of the class.', d: 1, c: 'understanding', t: [3], time: 45 }, (Cx) => {
  Cx.assert(EL_F.every((f) => close((f * 50) / (EL_F[2] * 50), f / EL_F[2])), 'with equal widths, area ratios equal frequency ratios');
  Cx.which(['frequency', 'mark', 'limit', 'number'], 'frequency');
});
T('m12', { stem: r`A school in Ranchi finds a term grade from three parts with weights $3$, $2$ and $5$. A student has $60$ in assignments, $80$ in the mid-term and $90$ in the final exam. The weighted mean is`, opts: [r`$79$`, r`$76.67$`, r`$790$`, r`$85$`], sol: r`$\dfrac{60 \times 3 + 80 \times 2 + 90 \times 5}{3 + 2 + 5} = \dfrac{180 + 160 + 450}{10} = \dfrac{790}{10} = 79$. The value $76.67$ is the simple mean, and $790$ forgets to divide by the total weight.`, d: 2, c: 'application', t: [2], time: 90 }, (Cx) => {
  Cx.assert(60 * 3 + 80 * 2 + 90 * 5 === 790, '790');
  Cx.which([wmean([60, 80, 90], [3, 2, 5]), rd(mean([60, 80, 90]), 2), 790, 85], 79);
});
T('m13', { stem: r`A tea seller in Darjeeling mixes $12$ kg of tea at $\text{Rs } 400$ per kg with $8$ kg of tea at $\text{Rs } 600$ per kg. The average price of the mixture per kg is`, opts: [r`$\text{Rs } 480$`, r`$\text{Rs } 500$`, r`$\text{Rs } 9600$`, r`$\text{Rs } 450$`], sol: r`The quantities are the weights: $\dfrac{12 \times 400 + 8 \times 600}{12 + 8} = \dfrac{4800 + 4800}{20} = 480$. The value $500$ is the simple mean of the two prices, and $9600$ is the total cost.`, d: 2, c: 'application', t: [2], time: 90 }, (Cx) => {
  Cx.assert(12 * 400 + 8 * 600 === 9600, 'total cost 9600');
  Cx.which([wmean([400, 600], [12, 8]), mean([400, 600]), 12 * 400 + 8 * 600, 450], 480);
});
T('m14', { stem: 'The weighted mean of the numbers $40$ and $60$ is exactly their simple mean $50$ when', opts: ['both numbers have the same weight', 'the number $60$ has the larger weight', 'the number $40$ has the larger weight', 'the two weights add up to $100$'], sol: r`If the weights are equal, $\dfrac{40w + 60w}{2w} = 50$. If $60$ has the larger weight the mean is above $50$, if $40$ has the larger weight it is below $50$, and weights such as $30$ and $70$ (which add up to $100$) give $54$.`, d: 3, c: 'analysis', t: [2], time: 105 }, (Cx) => {
  Cx.assert(wmean([40, 60], [1, 2]) > 50 && wmean([40, 60], [2, 1]) < 50 && close(wmean([40, 60], [30, 70]), 54), 'unequal weights move the mean');
  Cx.which([close(wmean([40, 60], [7, 7]), 50), close(wmean([40, 60], [1, 2]), 50), close(wmean([40, 60], [2, 1]), 50), close(wmean([40, 60], [30, 70]), 50)], true);
});
T('m15', { stem: r`The stacked bar graph shows the items sold in a school canteen from Monday to Friday. How many juices were sold in the whole week?`, opts: [r`$90$`, r`$175$`, r`$140$`, r`$405$`], sol: r`The juice parts of the five bars are $15$, $20$, $10$, $25$ and $20$, which add up to $90$. The values $175$ and $140$ are the samosas and the sandwiches, and $405$ is all the items.`, d: 2, c: 'application', t: [3], time: 75, assets: [fStackCanteen] }, (Cx) => {
  Cx.assert(JUICE.join() === '15,20,10,25,20' && sum(CANTEEN_TOT) === 405, 'juice parts and the grand total');
  Cx.which([sum(JUICE), sum(SAMOSA), sum(SANDWICH), sum(CANTEEN_TOT)], 90);
});
T('m16', { stem: r`The histogram shows the minutes of homework of $40$ students. How many students worked for $45$ minutes or more?`, opts: [r`$21$`, r`$12$`, r`$19$`, r`$32$`], sol: r`The bars from $45$ onwards have heights $12$, $7$ and $2$, so $12 + 7 + 2 = 21$ students. The value $19$ is the number below $45$ minutes, and $32$ counts from $30$ minutes.`, d: 2, c: 'application', t: [3], time: 75, assets: [fHistHome] }, (Cx) => {
  Cx.assert(sum(HW_F) === 40 && sum(HW_F.slice(0, 3)) === 19, '40 students; 19 below 45 minutes');
  Cx.which([sum(HW_F.slice(3)), HW_F[3], sum(HW_F.slice(0, 3)), sum(HW_F.slice(2))], 21);
});
T('m17', { stem: 'A frequency polygon is drawn over a histogram by joining', opts: ['the mid-points of the tops of the bars', 'the left corners of the tops of the bars', 'the right corners of the tops of the bars', 'the mid-points of the bases of the bars'], sol: 'The polygon is drawn through the points (class mark, frequency). The class mark is the middle of the class, so the points are the mid-points of the tops of the bars.', d: 1, c: 'understanding', t: [3], time: 60 }, (Cx) => {
  const marks = classMarks(EL_E), mids = EL_E.slice(0, -1).map((lo, i) => (lo + EL_E[i + 1]) / 2);
  Cx.assert(marks.every((m, i) => m === mids[i]), 'class marks are the mid-points of the bars');
  Cx.which(['mid-tops', 'left-tops', 'right-tops', 'mid-bases'], 'mid-tops');
});
T('m18', { stem: r`In a histogram of the waiting times at a bus stop, the class $20$–$50$ minutes has $45$ passengers and the other classes have different widths. The height of the bar for this class is the frequency density`, opts: [r`$1.5$`, r`$45$`, r`$15$`, r`$3$`], sol: r`The class width is $50 - 20 = 30$, so the frequency density is $\dfrac{45}{30} = 1.5$. The value $45$ is the frequency itself.`, d: 2, c: 'application', t: [3], time: 75 }, (Cx) => {
  Cx.which([density([45], [20, 50])[0], 45, 15, 3], 1.5);
});
T('m20', { stem: 'In a tally, a score that occurs $13$ times is shown by', opts: ['||||/ ||||/ |||', '||||/ ||||/ ||||', '||||/ |||', '||||/ ||||/ ||'], sol: 'The tally uses groups of five strokes, each with the fifth stroke across the four. $13 = 5 + 5 + 3$, so there are two crossed groups and three more strokes.', d: 1, c: 'application', t: [1], time: 60 }, (Cx) => {
  Cx.which(['||||/ ||||/ |||', '||||/ ||||/ ||||', '||||/ |||', '||||/ ||||/ ||'], tally(13));
});
T('m21', { stem: 'A principal wants to show, for each of four terms, how the students who passed are divided into grade A, grade B and grade C, and also how many passed in all. The best graph to draw is', opts: ['a stacked bar graph', 'a simple bar graph', 'a histogram', 'a frequency polygon'], sol: 'A stacked bar graph shows the total by the height of the whole bar and the three grades by its parts. A simple bar graph shows one amount per bar, and a histogram or a frequency polygon is for grouped numbers.', d: 3, c: 'evaluation', t: [3], time: 90 }, (Cx) => {
  const needsTotal = true, needsParts = true, groupedNumbers = false;
  Cx.which(['stacked', 'bar', 'histogram', 'polygon'], needsTotal && needsParts && !groupedNumbers ? 'stacked' : 'bar');
});
T('m22', { stem: 'Which of these graphs has no gaps between its bars?', opts: ['A histogram', 'A bar graph', 'A stacked bar graph', 'A tally chart'], sol: 'The classes of a histogram follow each other without a break, so its bars touch. The bars of a bar graph and of a stacked bar graph have gaps.', d: 1, c: 'recall', t: [3], time: 45 }, (Cx) => {
  const gaps = { histogram: false, bar: true, stacked: true, tally: true };
  Cx.which(Object.values(gaps).map((g) => !g), true);
});

// =============================================================== assertion-reason
Q('ar1', mk.ar({ a: 'The weighted mean of some numbers can be different from their simple mean.', r: 'In a weighted mean, a value with a larger weight counts more than a value with a smaller weight.', key: 'a', sol: r`A is true. R is true and explains A: for the numbers $72$, $85$, $64$ with weights $2$, $3$, $5$ the weighted mean is $71.9$, but the simple mean is about $73.67$, because $64$ has the largest weight.`, d: 2, c: 'analysis', t: [2] }), (Cx) => {
  Cx.assert(close(wmean([72, 85, 64], [2, 3, 5]), 71.9) && !close(mean([72, 85, 64]), 71.9), 'weighted 71.9, simple 73.67');
  Cx.key('a');
});
Q('ar2', mk.ar({ a: 'In a stacked bar graph, the height of the whole bar shows the total.', r: 'In a stacked bar graph, the parts of a bar are drawn side by side and not piled up.', key: 'c', sol: r`A is true: the parts are piled up, so the whole bar shows their total (for Monday $30 + 20 + 15 = 65$). R is false: that is exactly what a stacked bar graph does not do.`, d: 2, c: 'analysis', t: [3] }), (Cx) => {
  Cx.assert(SAMOSA[0] + SANDWICH[0] + JUICE[0] === CANTEEN_TOT[0] && CANTEEN_TOT[0] === 65, 'Monday 65');
  Cx.key('c');
});
Q('ar3', mk.ar({ a: 'The bars of a histogram are drawn with gaps between them.', r: 'The classes of a histogram follow one another without a break.', key: 'd', sol: r`A is false: the bars of a histogram touch each other. R is true, and it is the reason why the bars touch: the upper limit of one class is the lower limit of the next.`, d: 2, c: 'analysis', t: [3] }), (Cx) => {
  Cx.assert(EL_E.slice(0, -1).every((lo, i) => lo + 50 === EL_E[i + 1]), 'each class starts where the one before ends');
  Cx.key('d');
});
Q('ar4', mk.ar({ a: r`The class mark of the class $30$–$40$ is $35$.`, r: r`The class width of the class $30$–$40$ is $10$.`, key: 'b', sol: r`Both statements are true: $\dfrac{30 + 40}{2} = 35$ and $40 - 30 = 10$. But the width is not the reason for the class mark; the class mark is found from the sum of the two limits. So R is not the explanation of A.`, d: 2, c: 'analysis', t: [1] }), (Cx) => {
  Cx.assert(classMarks([30, 40])[0] === 35 && widths([30, 40])[0] === 10, '35 and 10');
  Cx.key('b');
});
Q('ar5', mk.ar({ a: 'In a histogram with unequal class widths, the heights of the bars should be the frequency densities.', r: 'Then the area of each bar is proportional to the frequency of its class.', key: 'a', sol: r`A is true. R is true and explains A: height $\times$ width $=$ frequency density $\times$ width $=$ frequency, so equal frequencies give equal areas. If the heights were the frequencies, a wide class would look more important than it is.`, d: 3, c: 'analysis', t: [3] }), (Cx) => {
  const e = [0, 5, 10, 20, 40], f = [10, 25, 30, 20], d = density(f, e);
  Cx.assert(f.every((v, i) => close(d[i] * (e[i + 1] - e[i]), v)), 'area is the frequency');
  Cx.key('a');
});
Q('ar6', mk.ar({ a: r`The weighted mean of $70$ with weight $1$ and $90$ with weight $3$ is $85$.`, r: r`The weighted mean of two numbers is always the simple mean of the two numbers, here $80$.`, key: 'c', sol: r`A is true: $\dfrac{70 \times 1 + 90 \times 3}{1 + 3} = \dfrac{340}{4} = 85$. R is false: the weighted mean equals the simple mean only when the weights are equal. Here $90$ has the larger weight and pulls the mean up to $85$.`, d: 2, c: 'analysis', t: [2] }), (Cx) => {
  Cx.assert(wmean([70, 90], [1, 3]) === 85 && mean([70, 90]) === 80, '85 and 80');
  Cx.key('c');
});

// =============================================================== true-false
Q('tf1', mk.tf({ stem: 'A student who uses the yearly rainfall figures printed in a weather department report is using secondary data.', key: 't', sol: 'The figures were collected earlier by the department and are taken from a published report, so for the student they are secondary data. The statement is true.', d: 1, c: 'understanding', t: [1] }), (Cx) => { Cx.key('t'); });
Q('tf2', mk.tf({ stem: r`In a grouped frequency table with the classes $20$–$30$ and $30$–$40$, the value $30$ is counted in the class $20$–$30$.`, key: 'f', sol: r`The lower limit belongs to the class and the upper limit goes to the next class, so $30$ is counted in $30$–$40$. The statement is false.`, d: 1, c: 'understanding', t: [1] }), (Cx) => {
  Cx.assert(groupFreq([30], [20, 30, 40]).join() === '0,1', 'the value 30 falls in the second class');
  Cx.key('f');
});
Q('tf3', mk.tf({ stem: 'In a histogram with equal class widths, a taller bar means a larger frequency.', key: 't', sol: r`With equal widths the height of a bar is the frequency of its class. For the electricity data the bar for $200$–$250$ (height $15$) is taller than the bar for $250$–$300$ (height $12$), and it has more households. The statement is true.`, d: 1, c: 'understanding', t: [3] }), (Cx) => {
  Cx.assert(EL_F[2] > EL_F[3] && EL_F[2] === Math.max(...EL_F), 'the tallest bar has the largest frequency');
  Cx.key('t');
});
Q('tf4', mk.tf({ stem: r`A frequency polygon is drawn by plotting the lower limit of each class against its frequency.`, key: 'f', sol: r`The points of a frequency polygon are (class mark, frequency), not (lower limit, frequency). The class mark of $200$–$250$ is $225$, not $200$. The statement is false.`, d: 1, c: 'understanding', t: [3] }), (Cx) => {
  Cx.assert(classMarks(EL_E)[2] === 225 && EL_E[2] === 200, '225 versus 200');
  Cx.key('f');
});
Q('tf5', mk.tf({ stem: 'If all the weights in a weighted mean are equal, the weighted mean is the same as the simple mean.', key: 't', sol: r`With equal weights $w$, $\dfrac{x_1 w + x_2 w + x_3 w}{3w} = \dfrac{x_1 + x_2 + x_3}{3}$. For $60$, $70$ and $90$ both give $73.33$. The statement is true.`, d: 2, c: 'understanding', t: [2] }), (Cx) => {
  Cx.assert(close(wmean([60, 70, 90], [4, 4, 4]), mean([60, 70, 90])), 'equal weights give the simple mean');
  Cx.key('t');
});

// =============================================================== fill in the blank
Q('fb1', mk.fill({ stem: 'The middle value of a class interval is called its class ____.', acc: [['mark']], sol: 'The mid-point of a class interval is its class mark. So the blank is mark.', d: 1, c: 'recall', t: [1] }), (Cx) => { Cx.blank('mark'); });
Q('fb2', mk.fill({ stem: r`The class width of the class $45$–$60$ is ____.`, acc: [['15']], sol: r`Class width $=$ upper limit $-$ lower limit $= 60 - 45 = 15$. So the blank is $15$.`, d: 1, c: 'understanding', t: [1] }), (Cx) => {
  Cx.assert(widths([45, 60])[0] === 15, '15');
  Cx.blank(15);
});
Q('fb3', mk.fill({ stem: 'In a histogram with unequal class widths, the height of a bar is the frequency ____.', acc: [['density']], sol: 'The height is the frequency divided by the class width, which is called the frequency density. So the blank is density.', d: 1, c: 'recall', t: [3] }), (Cx) => { Cx.blank('density'); });

// =============================================================== match (2 marks)
{
  const use = { bar: 'categories', stacked: 'parts of totals', hist: 'grouped numbers', poly: 'shape of the distribution' };
  const right = ['parts of each total, such as items sold each day', 'frequencies of equal-width classes, with no gaps between the bars', 'amounts of separate categories, such as favourite drinks', 'a line through the class marks to show the shape of a distribution'];
  const rightKey = ['parts of totals', 'grouped numbers', 'categories', 'shape of the distribution'], order = [2, 0, 1, 3];
  Q('mt1', mk.match({ stem: 'Match each graph in Column I with what it shows best in Column II.', left: ['Bar graph', 'Stacked bar graph', 'Histogram', 'Frequency polygon'], right, order, sol: 'A bar graph shows the amounts of separate categories; a stacked bar graph shows the parts of each total; a histogram shows the frequencies of grouped numbers with no gaps; a frequency polygon is a line through the class marks showing the shape of the distribution.', d: 1, c: 'recall', t: [3] }), (Cx) => Cx.assert([use.bar, use.stacked, use.hist, use.poly].every((u, i) => u === rightKey[order[i]]), 'each graph is paired with its use'));
}
{
  const vals = [classMarks([40, 60])[0], widths([40, 60])[0], 40, 60], shown = [20, 40, 50, 60], order = [2, 0, 1, 3];
  Q('mt2', mk.match({ stem: r`Match each term for the class $40$–$60$ in Column I with its value in Column II.`, left: ['Class mark', 'Class width', 'Lower limit', 'Upper limit'], right: ['$20$', '$40$', '$50$', '$60$'], order, sol: r`The class mark is $\dfrac{40 + 60}{2} = 50$, the class width is $60 - 40 = 20$, the lower limit is $40$ and the upper limit is $60$.`, d: 1, c: 'understanding', t: [1] }), (Cx) => Cx.assert(vals.every((v, i) => v === shown[order[i]]), 'the four values'));
}

// =============================================================== numerical
Q('n01', mk.num({ stem: r`A school in Kochi finds the final grade from homework ($20\%$), class tests ($30\%$) and the annual exam ($50\%$). A student has $80$ in homework, $70$ in class tests and $90$ in the annual exam. Find the final grade.`, value: 82, sol: r`The percentages are the weights: $\dfrac{80 \times 20 + 70 \times 30 + 90 \times 50}{100} = \dfrac{1600 + 2100 + 4500}{100} = \dfrac{8200}{100} = 82$.`, scheme: [['Products 1600, 2100 and 4500', 0.5], ['Weighted mean 82', 0.5]], d: 2, c: 'application', t: [2], time: 90 }), (Cx) => {
  Cx.assert(80 * 20 + 70 * 30 + 90 * 50 === 8200, '8200');
  Cx.val(wmean([80, 70, 90], [20, 30, 50]));
});
Q('n02', mk.num({ stem: r`A grocer in Mysuru mixes $25$ kg of sugar at $\text{Rs } 44$ per kg, $15$ kg at $\text{Rs } 52$ per kg and $10$ kg at $\text{Rs } 60$ per kg. Find the average price of the mixture per kg, in rupees.`, value: 49.6, sol: r`The quantities are the weights: $\dfrac{25 \times 44 + 15 \times 52 + 10 \times 60}{25 + 15 + 10} = \dfrac{1100 + 780 + 600}{50} = \dfrac{2480}{50} = 49.6$.`, scheme: [['Total cost 2480 rupees for 50 kg', 0.5], ['49.6 rupees per kg', 0.5]], d: 2, c: 'application', t: [2], time: 90 }), (Cx) => {
  Cx.assert(25 * 44 + 15 * 52 + 10 * 60 === 2480, '2480');
  Cx.val(rd(wmean([44, 52, 60], [25, 15, 10]), 9));
});
void must;
