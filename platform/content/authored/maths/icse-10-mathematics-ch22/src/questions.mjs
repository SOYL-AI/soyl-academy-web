// ICSE 10 Mathematics ch22 Measures of Central Tendency — practice bank with independent re-solve checks.
// Tables in stems and in model answers are generated from the same data objects the checks use (stat.mjs,
// exact BigInt rationals), so a table can never disagree with its key. Each check recomputes the answer by a
// second route (for grouped means: a different one of the three methods; for medians: counting observations).
import { Q, mk, r } from './lib.mjs';
import { fr } from './prop.mjs';
import { T, M, sum, meanL, medianL, modesL, sortedL, D, G, lab, sumFx, sumFd, sumFu, meanDirect, meanAssumed, meanStep, mean, medianIdx, medianIdxWalk, modalIdx, missingFreq, withFreq, mdWork, mdRow, mdRowD } from './stat.mjs';

const J = (lines) => lines.join('\n\n');
const V = (x) => fr(x).v;
const t = (x) => T(x);
/** \bar{x} = sum / n = m, as inline maths. */
const xbar = (s, n, m) => r`$\bar{x} = \dfrac{${t(s)}}{${n}} = ${t(m)}$`;
const nums = (xs) => xs.map((x) => `$${t(x)}$`).join(', ');
const listTex = (xs) => xs.map((x) => t(x)).join(', ');
const plus = (xs) => xs.map((x) => t(x)).join(' + ');

/** Solve one missing frequency from the mean; returns { y, steps } with the algebra written out. */
function missing(g, j, m) {
  const y = missingFreq(g, j, m);
  const K = sum(g.f.map((v, i) => (i === j ? fr(0) : g.x[i].mul(v))));
  const N = g.f.reduce((s, v, i) => s + (i === j ? 0 : v), 0);
  const xj = g.x[j], mN = fr(m).mul(N);
  const lhs = xj.cmp(m) > 0 ? r`(${t(xj)} - ${t(m)})y = ${t(mN)} - ${t(K)}` : r`(${t(m)} - ${t(xj)})y = ${t(K)} - ${t(mN)}`;
  const den = xj.sub(m), num = mN.sub(K);
  const steps = r`$\sum fx = ${t(K)} + ${t(xj)}y$ and $\sum f = ${N} + y$, so $${t(K)} + ${t(xj)}y = ${t(m)}(${N} + y)$, that is $${lhs}$, giving $y = \dfrac{${t(num.mul(den.cmp(0) < 0 ? -1 : 1))}}{${t(den.mul(den.cmp(0) < 0 ? -1 : 1))}} = ${t(y)}$.`;
  return { y, steps, K, N };
}
const meanDirectSteps = (g) => J([mdWork(g, 'direct'), xbar(sumFx(g), g.n, meanDirect(g))]);

// =============================================================== MCQ
const m01 = [6, 9, 12, 15, 18];
Q('m01', mk.mcq({ stem: r`The mean of the five numbers $6, 9, 12, 15, 18$ is`, opts: ['$12$', '$60$', '$15$', '$10$'], key: 'a', sol: r`Mean $= \dfrac{6 + 9 + 12 + 15 + 18}{5} = \dfrac{60}{5} = 12$. Option (b) is the sum, (c) is the largest value less 3, and (d) divides by 6 instead of 5.`, d: 1, c: 'recall', t: [1], time: 40 }), (C) => { C.which([12, 60, 15, 10], V(meanL(m01))); C.assert(sum(m01.map((x) => fr(x))).eq(60) && 60 / 6 === 10, 'sum and wrong divisor'); });
const m02 = [12, 5, 20, 8, 6];
Q('m02', mk.mcq({ stem: r`The masses, in kg, of five parcels at an imagined courier depot are $12, 5, 20, 8, 6$. Their median mass is`, opts: ['$8$ kg', '$20$ kg', '$10.2$ kg', '$6$ kg'], key: 'a', sol: r`Arranged in order: $5, 6, 8, 12, 20$. The middle (third) value is $8$. Option (b) is the middle of the unarranged list, and (c) is the mean $\dfrac{51}{5} = 10.2$.`, d: 1, c: 'understanding', t: [1], time: 45 }), (C) => { C.which([8, 20, 10.2, 6], V(medianL(m02))); C.assert(m02[2] === 20 && meanL(m02).eq(fr('10.2')), 'distractors'); });
const m03 = [18, 22, 13, 30, 27, 16];
Q('m03', mk.mcq({ stem: r`Six imagined pupils take $18, 22, 13, 30, 27$ and $16$ minutes to finish a puzzle. The median time, in minutes, is`, opts: ['$20$', '$18$', '$22$', '$21$'], key: 'a', sol: r`Arranged: $13, 16, 18, 22, 27, 30$. With six values the median is the mean of the third and fourth: $\dfrac{18 + 22}{2} = 20$. Option (d) is the mean, $\dfrac{126}{6} = 21$.`, d: 2, c: 'understanding', t: [1], time: 60 }), (C) => { C.which([20, 18, 22, 21], V(medianL(m03))); C.assert(meanL(m03).eq(21), 'mean is the distractor'); });
const m04 = [3, 5, 5, 6, 7, 5, 6, 3, 6, 6];
Q('m04', mk.mcq({ stem: r`In ten imagined matches a hockey team scored $3, 5, 5, 6, 7, 5, 6, 3, 6, 6$ goals. The mode of the data is`, opts: ['$6$', '$5$', '$5.2$', '$5.5$'], key: 'a', sol: r`The value $6$ occurs four times, more than any other (5 occurs three times), so the mode is $6$. Option (c) is the mean $\dfrac{52}{10}$ and (d) is the median $\dfrac{5 + 6}{2}$.`, d: 1, c: 'recall', t: [1], time: 45 }), (C) => { C.which([6, 5, 5.2, 5.5], V(modesL(m04)[0])); C.assert(modesL(m04).length === 1 && meanL(m04).eq(fr('5.2')) && medianL(m04).eq(fr('5.5')), 'mode unique; mean and median'); });
const m05 = D([2, 3, 4, 5], [6, 9, 3, 2]);
Q('m05', mk.mcq({ stem: r`An imagined stationery counter records how many pencils each of $20$ customers bought.

${mdRowD(m05, 'Pencils bought', 'Customers')}

The mean number of pencils bought is`, opts: ['$3.05$', '$3.5$', '$61$', '$15.25$'], key: 'a', sol: r`$\sum fx = 12 + 27 + 12 + 10 = 61$ and $\sum f = 20$, so the mean is $\dfrac{61}{20} = 3.05$. Option (b) averages the four values $2, 3, 4, 5$ and ignores the frequencies; (d) divides by the number of rows.`, d: 2, c: 'application', t: [1], time: 75 }), (C) => { C.which([3.05, 3.5, 61, 15.25], V(m05.mean)); C.assert(m05.sumfx.eq(61) && meanL([2, 3, 4, 5]).eq(fr('3.5')) && m05.sumfx.div(4).eq(fr('15.25')), 'distractors'); });
const m06g = G(30, 10, [1], { inc: true });
Q('m06', mk.mcq({ stem: r`A frequency table of the daily pages read by pupils uses the discontinuous class $30$–$39$. Its class mark is`, opts: ['$34.5$', '$34$', '$35$', '$69$'], key: 'a', sol: r`Class mark $= \dfrac{30 + 39}{2} = 34.5$. Option (d) is the sum of the limits, with no halving.`, d: 1, c: 'recall', t: [2], time: 40 }), (C) => { C.which([34.5, 34, 35, 69], V(m06g.x[0])); C.assert(fr(30).add(39).eq(69), 'sum'); });
const m07g = G(0, 20, [7, 13, 21, 9, 5]);
Q('m07', mk.mcq({ stem: r`An imagined cinema tracks how many tickets are sold per show.

${mdRow(m07g, 'Tickets sold', 'Number of shows')}

The modal class is`, opts: ['$40$–$60$', '$20$–$40$', '$60$–$80$', '$0$–$20$'], key: 'a', sol: r`The greatest frequency is $21$, which belongs to the class $40$–$60$, so that is the modal class.`, d: 1, c: 'recall', t: [4], time: 40 }), (C) => { C.assert(lab(m07g, modalIdx(m07g)) === '40–60', 'modal class'); C.key('a'); });
const m08g = G(10, 10, [4, 15, 9, 12, 8, 2]);
Q('m08', mk.mcq({ stem: r`The ages of $50$ imagined visitors to a science fair are grouped below.

${mdRow(m08g, 'Age (years)', 'Visitors')}

The median class is`, opts: ['$30$–$40$', '$20$–$30$', '$40$–$50$', '$10$–$20$'], key: 'a', sol: r`Cumulative frequencies are $4, 19, 28, 40, 48, 50$. Since $\dfrac{n}{2} = 25$ and $28$ is the first cumulative frequency that reaches $25$, the median class is $30$–$40$. The class $20$–$30$ is the modal class, a different thing.`, d: 2, c: 'application', t: [4], time: 70 }), (C) => { C.assert(lab(m08g, medianIdx(m08g)) === '30–40' && medianIdx(m08g) === medianIdxWalk(m08g) && lab(m08g, modalIdx(m08g)) === '20–30' && m08g.cf.join() === '4,19,28,40,48,50', 'median class by cf and by walking'); C.key('a'); });
const m09g = G(0, 10, [3, 5, 8, 4]);
Q('m09', mk.mcq({ stem: r`In the direct method for the mean of grouped data, the total of the $f \times x$ column is divided by`, opts: ['the total of the $f$ column', 'the number of classes', 'the total of the $x$ column', 'the class width'], key: 'a', sol: r`Each class mark $x$ stands for $f$ observations, so $\sum fx$ is the total of all observations and must be divided by the number of observations, $\sum f$.`, d: 1, c: 'understanding', t: [2], time: 40 }), (C) => { C.assert(meanDirect(m09g).eq(sumFx(m09g).div(m09g.n)) && !meanDirect(m09g).eq(sumFx(m09g).div(m09g.k)), 'dividing by sum f gives the mean, by number of classes does not'); C.key('a'); });
Q('m10', mk.mcq({ stem: r`An imagined teacher works out marks for $25$ pupils with an assumed mean of $60$ and finds that the weighted total of deviations, $\sum fd$, is $-50$. The mean mark is`, opts: ['$58$', '$62$', '$10$', '$-2$'], key: 'a', sol: r`Mean $= a + \dfrac{\sum fd}{\sum f} = 60 + \dfrac{-50}{25} = 60 - 2 = 58$. Option (b) adds the correction instead of subtracting it; (d) forgets to add the assumed mean.`, d: 2, c: 'application', t: [3], time: 60 }), (C) => { const m = fr(60).add(fr(-50).div(25)); C.which([58, 62, 10, -2], V(m)); C.assert(fr(60).sub(fr(-50).div(25)).eq(62) && fr(60).add(-50).eq(10), 'distractors'); });
Q('m11', mk.mcq({ stem: r`In a step-deviation table the assumed mean is $130$ and every class has width $20$. For the class whose mark is $150$, the value of $u$ is`, opts: ['$1$', '$20$', '$150$', '$7.5$'], key: 'a', sol: r`$u = \dfrac{x - a}{h} = \dfrac{150 - 130}{20} = 1$. Option (b) is the deviation $d$ without dividing by $h$; (d) is $\dfrac{x}{h}$.`, d: 1, c: 'application', t: [3], time: 50 }), (C) => { C.which([1, 20, 150, 7.5], V(fr(150).sub(130).div(20))); C.assert(fr(150).div(20).eq(fr('7.5')), '7.5'); });
Q('m12', mk.mcq({ stem: r`The mean of $8$ numbers is $14$. Every number is increased by $3$ and the results are then doubled. The mean of the new numbers is`, opts: ['$34$', '$31$', '$17$', '$28$'], key: 'a', sol: r`Adding $3$ to every number raises the mean to $17$, and doubling doubles it: $2 \times 17 = 34$. Option (b) doubles before adding; (c) forgets to double; (d) forgets to add.`, d: 3, c: 'application', t: [1], time: 70 }), (C) => { C.which([34, 31, 17, 28], V(fr(14).add(3).mul(2))); C.assert(fr(14).mul(2).add(3).eq(31) && fr(14).mul(2).eq(28), 'distractors'); });
const m13 = [66, 71, 83, 60, 65];
Q('m13', mk.mcq({ stem: r`The mean score of six imagined quiz teams is $70$. Five of them scored $66, 71, 83, 60$ and $65$. The sixth team scored`, opts: ['$75$', '$69$', '$420$', '$70$'], key: 'a', sol: r`Total of six scores $= 6 \times 70 = 420$. The five known scores add to $345$, so the sixth is $420 - 345 = 75$. Option (b) is the mean of the five, $\dfrac{345}{5}$; (c) is the total of all six.`, d: 2, c: 'application', t: [1], time: 70 }), (C) => { const x = fr(6 * 70).sub(sum(m13.map((v) => fr(v)))); C.which([75, 69, 420, 70], V(x)); C.assert(meanL(m13).eq(69), '69 is the mean of five'); });
const m14 = [[2, 3, 3, 4, 5, 5, 6], [1, 2, 2, 2, 3], [7, 7, 7, 8, 9, 9], [4, 6, 6, 9, 9, 9, 11]];
Q('m14', mk.mcq({ stem: r`Which of these imagined data sets of daily bus delays (in minutes) has exactly two modes?`, opts: m14.map((a) => `$${a.join(', ')}$`), key: 'a', sol: r`In $2, 3, 3, 4, 5, 5, 6$ the values $3$ and $5$ each occur twice and no value occurs more often, so there are two modes. The other three sets each have one value that occurs more often than the rest.`, d: 2, c: 'understanding', t: [1], time: 60 }), (C) => { C.assert(m14.map((a) => modesL(a).length).join() === '2,1,1,1', 'mode counts'); C.key('a'); });
const m15 = D([10, 11, 12, 13, 14], [4, 9, 13, 8, 6]);
Q('m15', mk.mcq({ stem: r`The shoe sizes of $40$ imagined players at a sports club are shown.

${mdRowD(m15, 'Shoe size', 'Players')}

The median shoe size is`, opts: ['$12$', '$20.5$', '$12.075$', '$26$'], key: 'a', sol: r`Cumulative frequencies: $4, 13, 26, 34, 40$. The $20$th and $21$st values both lie in the size-$12$ row (cumulative $26$), so the median is $12$. Option (b) is the position of the middle, (c) is the mean $\dfrac{483}{40}$ and (d) is a cumulative frequency.`, d: 2, c: 'application', t: [1], time: 75 }), (C) => { C.which([12, 20.5, 12.075, 26], V(m15.median)); C.assert(m15.cf.join() === '4,13,26,34,40' && m15.mean.eq(fr('12.075')) && m15.modes[0].eq(12), 'cf, mean and mode'); });
const m16 = [4, 8, 12, 16, 20, 24, 28, 32, 36, 40];
Q('m16', mk.mcq({ stem: r`The mean of the first ten multiples of $4$ is`, opts: ['$22$', '$20$', '$21$', '$44$'], key: 'a', sol: r`The multiples are $4, 8, \ldots, 40$ with sum $4(1 + 2 + \cdots + 10) = 220$, so the mean is $\dfrac{220}{10} = 22$. Option (d) adds the first and last terms.`, d: 2, c: 'understanding', t: [1], time: 60 }), (C) => { C.which([22, 20, 21, 44], V(meanL(m16))); C.assert(sum(m16.map((x) => fr(x))).eq(220) && 4 + 40 === 44, 'sum'); });
const m17g = G(0, 5, [8, 13, 16, 15, 8]);
Q('m17', mk.mcq({ stem: r`The cumulative frequencies of $60$ imagined delivery times, grouped in classes of width $5$ minutes starting at $0$, are $8, 21, 37, 52, 60$. The median class is`, opts: ['$10$–$15$', '$5$–$10$', '$15$–$20$', '$20$–$25$'], key: 'a', sol: r`Half of $60$ is $30$. The first cumulative frequency that reaches $30$ is $37$, which belongs to the third class, $10$–$15$.`, d: 2, c: 'application', t: [4], time: 60 }), (C) => { C.assert(m17g.cf.join() === '8,21,37,52,60' && lab(m17g, medianIdx(m17g)) === '10–15' && medianIdxWalk(m17g) === 2, 'cf and median class'); C.key('a'); });
Q('m18', mk.mcq({ stem: r`In an imagined school, $10$ pupils of Group A have a mean score of $40$ and $15$ pupils of Group B have a mean score of $60$. The mean score of all $25$ pupils is`, opts: ['$52$', '$50$', '$48$', '$100$'], key: 'a', sol: r`Total $= 10 \times 40 + 15 \times 60 = 400 + 900 = 1300$, so the mean is $\dfrac{1300}{25} = 52$. Option (b) averages the two means without weights; (c) swaps the weights.`, d: 3, c: 'application', t: [1], time: 80 }), (C) => { const m = fr(10 * 40 + 15 * 60).div(25); C.which([52, 50, 48, 100], V(m)); C.assert(fr(40).add(60).div(2).eq(50) && fr(15 * 40 + 10 * 60).div(25).eq(48), 'distractors'); });

// =============================================================== Assertion-reason
Q('ar1', mk.ar({ a: r`If every number in a data set of $12$ values is increased by $4$, the mean increases by $4$.`, r: r`Increasing each of $n$ values by $4$ increases the sum by $4n$, and the mean is the sum divided by $n$.`, key: 'c', sol: r`The new sum is $S + 4n$, so the new mean is $\dfrac{S + 4n}{n} = \dfrac{S}{n} + 4$. Both statements are true and R explains A.`, d: 2, c: 'understanding', t: [1] }), (C) => { const xs = [5, 9, 14, 20, 22, 7, 11, 13, 6, 8, 10, 12]; C.assert(meanL(xs.map((x) => x + 4)).eq(meanL(xs).add(4)), 'mean shifts by 4'); C.key('c'); });
const ar2 = [4, 9, 6, 2, 8];
Q('ar2', mk.ar({ a: r`The median of the numbers $4, 9, 6, 2, 8$ is $6$.`, r: r`The mode of a frequency distribution is the value with the greatest frequency.`, key: 'd', sol: r`Arranged: $2, 4, 6, 8, 9$, so the median is the middle value, $6$: A is true. R is also a true statement, but it describes the mode and does not explain why $6$ is the median.`, d: 2, c: 'understanding', t: [1] }), (C) => { C.assert(medianL(ar2).eq(6) && modesL(ar2).length === 5, 'A true'); C.key('d'); });
Q('ar3', mk.ar({ a: r`The class mark of the class $20$–$30$ is $25$.`, r: r`The class mark of a class is half the difference of its upper and lower limits.`, key: 'a', sol: r`$\dfrac{20 + 30}{2} = 25$, so A is true. The class mark is half the sum of the limits, not the difference (half the difference is the half-width, $5$), so R is false.`, d: 1, c: 'recall', t: [2] }), (C) => { C.assert(fr(20).add(30).div(2).eq(25) && fr(30).sub(20).div(2).eq(5), 'A true, R false'); C.key('a'); });
Q('ar4', mk.ar({ a: r`In the direct method the mean of grouped data is found by multiplying each frequency by the class limit.`, r: r`The class mark is taken to represent every observation in its class.`, key: 'b', sol: r`Each frequency is multiplied by the class mark, not by a class limit, so A is false. R is true: that is exactly why the class mark is used.`, d: 2, c: 'understanding', t: [2] }), (C) => { const g = G(10, 10, [3, 4]); C.assert(sumFx(g).eq(3 * 15 + 4 * 25) && !sumFx(g).eq(3 * 10 + 4 * 20), 'fx uses class marks'); C.key('b'); });
const ar5 = G(40, 10, [5, 9, 16, 12, 8]);
Q('ar5', mk.ar({ a: r`For one grouped distribution, the direct, assumed-mean and step-deviation methods all give the same mean.`, r: r`The assumed-mean and step-deviation formulas are rearrangements of $\dfrac{\sum fx}{\sum f}$.`, key: 'c', sol: r`Substituting $x = a + d$ (and $d = hu$) into $\dfrac{\sum fx}{\sum f}$ gives $a + \dfrac{\sum fd}{\sum f}$ and $a + h\dfrac{\sum fu}{\sum f}$, so all three agree and R explains A.`, d: 3, c: 'analysis', t: [3] }), (C) => { C.assert(mean(ar5, fr(65)).eq(fr('66.8')) && mean(ar5, fr(45)).eq(fr('66.8')), 'three methods agree for two choices of a'); C.key('c'); });
Q('ar6', mk.ar({ a: r`The data $5, 7, 7, 9, 9, 11$ has more than one mode.`, r: r`Every set of numbers has exactly one mode.`, key: 'a', sol: r`The values $7$ and $9$ both occur twice, more than the others, so A is true. R is false: a set can have two or more modes, or every value may occur equally often.`, d: 1, c: 'understanding', t: [1] }), (C) => { C.assert(modesL([5, 7, 7, 9, 9, 11]).length === 2, 'A true'); C.key('a'); });

// =============================================================== True / false
const tf1 = [13, 7, 21, 9];
Q('tf1', mk.tf({ stem: r`Taking the four waiting times $13, 7, 21, 9$ minutes just as given, the median is the mean of the two middle values, $\dfrac{7 + 21}{2} = 14$ minutes.`, key: 'f', sol: r`The values must be arranged first: $7, 9, 13, 21$. The middle two are $9$ and $13$, so the median is $11$ minutes.`, d: 2, c: 'understanding', t: [1] }), (C) => { C.assert(medianL(tf1).eq(11) && !medianL(tf1).eq(14), 'median is 11'); C.key('f'); });
Q('tf2', mk.tf({ stem: r`In a table showing the number of goals scored per match, the mode is the number of goals that occurs in the greatest number of matches.`, key: 't', sol: r`The mode is the value with the highest frequency.`, d: 1, c: 'recall', t: [1] }), (C) => { const d = D([0, 1, 2, 3], [4, 9, 6, 2]); C.assert(d.modes.length === 1 && d.modes[0].eq(1), 'mode is value with greatest frequency'); C.key('t'); });
Q('tf3', mk.tf({ stem: r`The class mark of the continuous class $45$–$55$ is $50$.`, key: 't', sol: r`$\dfrac{45 + 55}{2} = 50$.`, d: 1, c: 'recall', t: [2] }), (C) => { C.assert(fr(45).add(55).div(2).eq(50), 'class mark'); C.key('t'); });
const tf4 = G(100, 20, [7, 10, 18, 9, 6]);
Q('tf4', mk.tf({ stem: r`In the step-deviation method, the mean of grouped data equals $\dfrac{\sum fu}{\sum f}$ exactly, with nothing else added.`, key: 'f', sol: r`The mean is $a + h \times \dfrac{\sum fu}{\sum f}$; the assumed mean $a$ must be added back and the result multiplied by the class width $h$.`, d: 2, c: 'understanding', t: [3] }), (C) => { const su = sumFu(tf4, fr(150)).div(tf4.n); C.assert(meanStep(tf4, fr(150)).eq(fr('148.8')) && !su.eq(fr('148.8')), 'u-average is not the mean'); C.key('f'); });
const tf5 = [4, 9, 9, 10, 18];
Q('tf5', mk.tf({ stem: r`For the five imagined daily sales counts $4, 9, 9, 10, 18$, the mean and the median are equal.`, key: 'f', sol: r`The mean is $\dfrac{50}{5} = 10$ but the median is $9$, so they are not equal.`, d: 2, c: 'understanding', t: [1] }), (C) => { C.assert(meanL(tf5).eq(10) && medianL(tf5).eq(9), 'mean 10, median 9'); C.key('f'); });

// =============================================================== Fill in the blank
const fb1 = [5, 8, 11, 14, 17];
Q('fb1', mk.fill({ stem: r`The mean of $5, 8, 11, 14$ and $17$ is ___.`, acc: [['11']], sol: r`$\dfrac{5 + 8 + 11 + 14 + 17}{5} = \dfrac{55}{5} = 11$.`, d: 1, c: 'recall', t: [1] }), (C) => C.blank(V(meanL(fb1))));
const fb2 = [15, 3, 9, 12];
Q('fb2', mk.fill({ stem: r`The median of $15, 3, 9, 12$ is ___.`, acc: [['10.5']], sol: r`Arranged: $3, 9, 12, 15$; the median is $\dfrac{9 + 12}{2} = 10.5$.`, d: 1, c: 'understanding', t: [1] }), (C) => C.blank(V(medianL(fb2))));
const fb3g = G(20, 10, [1], { inc: true });
Q('fb3', mk.fill({ stem: r`In a table of daily steps (in hundreds) with the discontinuous class $20$–$29$, the class mark is ___.`, acc: [['24.5']], sol: r`$\dfrac{20 + 29}{2} = 24.5$.`, d: 1, c: 'recall', t: [2] }), (C) => C.blank(V(fb3g.x[0])));
Q('fb4', mk.fill({ stem: r`In grouped data, the modal class is the class with the highest ___.`, acc: [['frequency']], sol: 'The modal class is the class with the highest frequency.', d: 1, c: 'recall', t: [4] }), (C) => { const g = G(0, 10, [3, 8, 5]); C.assert(modalIdx(g) === g.f.indexOf(Math.max(...g.f)), 'modal class has the highest frequency'); C.blank('frequency'); });
Q('fb5', mk.fill({ stem: r`For $20$ observations with an assumed mean of $50$ and $\sum fd = 40$, the mean is ___.`, acc: [['52']], sol: r`$50 + \dfrac{40}{20} = 50 + 2 = 52$.`, d: 2, c: 'application', t: [3] }), (C) => C.blank(V(fr(50).add(fr(40).div(20)))));

// =============================================================== Numerical
const n01 = [46, 52, 38, 61, 45, 57, 49, 54];
Q('n01', mk.num({ stem: r`An imagined canteen serves $46, 52, 38, 61, 45, 57, 49$ and $54$ cups of tea on eight days. Find the mean number of cups served per day.`, value: 50.25, sol: r`Sum $= 46 + 52 + 38 + 61 + 45 + 57 + 49 + 54 = 402$, so the mean is $\dfrac{402}{8} = 50.25$.`, scheme: [['Sum 402', 1], ['Mean 50.25', 1]], marks: 2, d: 1, c: 'understanding', t: [1], time: 75 }), (C) => { C.val(V(meanL(n01))); C.assert(sum(n01.map((x) => fr(x))).eq(402), 'sum'); });
const n02 = [12, 7, 15, 9, 21, 11, 8, 17, 14, 10];
Q('n02', mk.num({ stem: r`The waiting times, in minutes, of ten customers at an imagined ticket counter are $12, 7, 15, 9, 21, 11, 8, 17, 14, 10$. Find the median waiting time.`, value: 11.5, sol: r`Arranged: $7, 8, 9, 10, 11, 12, 14, 15, 17, 21$. The fifth and sixth values are $11$ and $12$, so the median is $\dfrac{11 + 12}{2} = 11.5$ minutes.`, scheme: [['Arranged in order', 1], ['Median 11.5', 1]], marks: 2, d: 2, c: 'understanding', t: [1], time: 75 }), (C) => { C.val(V(medianL(n02))); C.assert(sortedL(n02).slice(4, 6).map(t).join() === '11,12', 'middle pair'); });
const n03 = [12, 18, 14, 9, 21, 13];
Q('n03', mk.num({ stem: r`The mean of seven imagined daily collections, in hundreds of rupees, is $15$. Six of them are $12, 18, 14, 9, 21, 13$. Find the seventh collection.`, value: 18, sol: r`Total of seven $= 7 \times 15 = 105$. The six known values add to $87$, so the seventh is $105 - 87 = 18$.`, scheme: [['Total 105', 1], ['Seventh 18', 1]], marks: 2, d: 2, c: 'application', t: [1], time: 70 }), (C) => { const x = fr(7 * 15).sub(sum(n03.map((v) => fr(v)))); C.val(V(x)); C.assert(meanL([...n03, 18]).eq(15), 'forward check'); });
const n04 = D([1, 2, 3, 4, 5, 6], [3, 8, 14, 10, 4, 1]);
Q('n04', mk.num({ stem: r`A school bus carries families, and the number of children per family on one imagined bus route is shown for $40$ families.

${mdRowD(n04, 'Children', 'Families')}

Find the mean number of children per family.`, value: 3.175, sol: r`$\sum fx = 3 + 16 + 42 + 40 + 20 + 6 = 127$ and $\sum f = 40$, so the mean is $\dfrac{127}{40} = 3.175$.`, scheme: [['Sum of fx = 127', 1], ['Mean 3.175', 1]], marks: 2, d: 2, c: 'understanding', t: [1], time: 90 }), (C) => { C.val(V(n04.mean)); C.assert(n04.sumfx.eq(127) && n04.n === 40 && n04.median.eq(3) && n04.modes[0].eq(3), 'sums'); });
const n05 = G(30, 5, [4, 7, 12, 9, 5, 3]);
Q('n05', mk.num({ stem: r`The times, in minutes, that $40$ imagined pupils take to cycle to school are grouped below.

${mdRow(n05, 'Time (min)', 'Pupils')}

Use the direct method to find the mean time.`, value: 44.125, sol: J([mdWork(n05, 'direct'), r`$\bar{x} = \dfrac{1765}{40} = 44.125$ minutes.`]), scheme: [['Class marks', 1], ['Sum of fx = 1765', 1], ['Mean 44.125', 1]], marks: 3, d: 3, c: 'application', t: [2], time: 150 }), (C) => { C.val(V(meanAssumed(n05, fr('42.5')))); C.assert(sumFx(n05).eq(1765) && mean(n05, fr('42.5')).eq(fr('44.125')), 'three methods agree'); });
const n06 = G(100, 20, [7, 10, 18, 9, 6]);
Q('n06', mk.num({ stem: r`The electricity used by $50$ imagined flats in a month, in units, is grouped below.

${mdRow(n06, 'Units used', 'Flats')}

Taking the assumed mean as $150$, find the mean number of units.`, value: 148.8, sol: J([mdWork(n06, 'assumed', 150), r`$\bar{x} = 150 + \dfrac{-60}{50} = 150 - 1.2 = 148.8$ units.`]), scheme: [['Deviations d', 1], ['Sum of fd = -60', 1], ['Mean 148.8', 1]], marks: 3, d: 3, c: 'application', t: [3], time: 150 }), (C) => { C.val(V(meanDirect(n06))); C.assert(sumFd(n06, fr(150)).eq(-60) && mean(n06, fr(150)).eq(fr('148.8')), 'assumed mean and step agree'); });
const n07 = G(150, 25, [4, 9, 15, 12, 6, 4]);
Q('n07', mk.num({ stem: r`The lengths, in mm, of $50$ imagined bamboo shoots are grouped below.

${mdRow(n07, 'Length (mm)', 'Shoots')}

Use the step-deviation method with assumed mean $212.5$ to find the mean length.`, value: 222, sol: J([mdWork(n07, 'step', '212.5'), r`$\bar{x} = 212.5 + 25 \times \dfrac{19}{50} = 212.5 + 9.5 = 222$ mm.`]), scheme: [['Values of u', 1], ['Sum of fu = 19', 1], ['Mean 222', 1]], marks: 3, d: 3, c: 'application', t: [3], time: 150 }), (C) => { C.val(V(meanDirect(n07))); C.assert(sumFu(n07, fr('212.5')).eq(19) && sumFx(n07).eq(11100) && mean(n07, fr('212.5')).eq(222), 'step-deviation, direct, assumed agree'); });
const n08g = G(10, 10, [6, 8, 12, 0, 4]);
const n08 = missing(n08g, 3, fr('34.5'));
Q('n08', mk.num({ stem: r`The frequency of one class is missing from this table of imagined weekly savings (in rupees) of pupils, whose mean is $34.5$.

${mdRow(n08g, 'Savings', 'Pupils', ['6', '8', '12', 'y', '4'])}

Find the missing frequency $y$.`, value: 10, sol: r`Class marks are $15, 25, 35, 45, 55$. ${n08.steps}`, scheme: [['Sum of fx and sum of f in terms of y', 1], ['Equation from the mean', 1], ['y = 10', 1]], marks: 3, d: 3, c: 'application', t: [3], time: 150 }), (C) => { C.val(V(n08.y)); const g2 = withFreq(n08g, 3, n08.y); C.assert(meanDirect(g2).eq(fr('34.5')) && g2.n === 40, 'substitute back'); });
Q('n09', mk.num({ stem: r`The mean mark of $20$ imagined pupils in Section A is $56$. Adding $10$ pupils of Section B gives a combined mean of $58$. Find the mean mark of Section B.`, value: 62, sol: r`Combined total $= 30 \times 58 = 1740$ and Section A total $= 20 \times 56 = 1120$, so Section B total $= 620$ and its mean is $\dfrac{620}{10} = 62$.`, scheme: [['Combined and A totals', 1], ['Mean of B = 62', 1]], marks: 2, d: 3, c: 'application', t: [1], time: 90 }), (C) => { const b = fr(30 * 58 - 20 * 56).div(10); C.val(V(b)); C.assert(fr(20 * 56 + 10 * 62).div(30).eq(58), 'forward check'); });

// =============================================================== Short answer, 2 marks
const s201 = [9, 4, 13, 6, 11];
Q('s201', mk.short({ marks: 2, stem: r`Find the mean and the median of the five imagined scores $9, 4, 13, 6, 11$.`, model: J([r`Mean $= \dfrac{9 + 4 + 13 + 6 + 11}{5} = \dfrac{43}{5} = 8.6$.`, r`Arranged: $4, 6, 9, 11, 13$, so the median is the middle value, $9$.`]), sol: 'Add and divide by five for the mean; arrange in order and take the middle value for the median.', scheme: [['Mean 8.6', 1], ['Median 9', 1]], d: 1, c: 'understanding', t: [1], time: 90 }), (C) => { C.assert(meanL(s201).eq(fr('8.6')) && medianL(s201).eq(9), 'mean, median'); C.model([43, 8.6, 9]); });
Q('s202', mk.short({ marks: 2, stem: r`A table uses the continuous classes $45$–$50$, $50$–$55$ and $55$–$60$. Write the class mark of each class.`, model: J([r`Class mark $= \dfrac{\text{lower limit} + \text{upper limit}}{2}$.`, r`$\dfrac{45 + 50}{2} = 47.5$, $\dfrac{50 + 55}{2} = 52.5$ and $\dfrac{55 + 60}{2} = 57.5$.`]), sol: 'Half the sum of the two limits of each class.', scheme: [['Rule for class mark', 1], ['47.5, 52.5, 57.5', 1]], d: 1, c: 'understanding', t: [2], time: 75 }), (C) => { const g = G(45, 5, [1, 1, 1]); C.assert(g.x.map(t).join() === '47.5,52.5,57.5', 'class marks'); C.model([47.5, 52.5, 57.5]); });
const s203g = G(0, 10, [5, 12, 18, 9, 6]);
Q('s203', mk.short({ marks: 2, stem: r`The number of apples picked from each of $50$ imagined trees is grouped below.

${mdRow(s203g, 'Apples picked', 'Trees')}

Write down the modal class and the median class.`, model: J([r`The highest frequency is $18$, so the modal class is $20$–$30$.`, r`Cumulative frequencies are $5, 17, 35, 44, 50$; since $\dfrac{50}{2} = 25$ and $35$ is the first to reach $25$, the median class is $20$–$30$.`]), sol: 'Modal class: highest frequency. Median class: first class whose cumulative frequency reaches half the total.', scheme: [['Modal class 20–30', 1], ['Median class 20–30 with cumulative frequencies', 1]], d: 2, c: 'application', t: [4], time: 90 }), (C) => { C.assert(lab(s203g, modalIdx(s203g)) === '20–30' && lab(s203g, medianIdx(s203g)) === '20–30' && s203g.cf.join() === '5,17,35,44,50' && medianIdxWalk(s203g) === 2, 'classes'); C.model([18, '5, 17, 35, 44, 50', 25]); });
Q('s204', mk.short({ marks: 2, stem: r`The mean of $10$ numbers is $12$. One of the numbers, $8$, is replaced by $18$. Find the new mean.`, model: J([r`Original total $= 10 \times 12 = 120$.`, r`New total $= 120 - 8 + 18 = 130$, so the new mean is $\dfrac{130}{10} = 13$.`]), sol: 'Find the total, adjust it for the replaced number, then divide by ten again.', scheme: [['Original total 120', 1], ['New mean 13', 1]], d: 2, c: 'application', t: [1], time: 80 }), (C) => { C.assert(fr(10 * 12 - 8 + 18).div(10).eq(13), 'new mean'); C.model([120, 130, 13]); });

// =============================================================== Short answer, 3 marks
const s301 = [14, 9, 17, 12, 9, 15, 15, 9, 20, 10];
Q('s301', mk.short({ marks: 3, stem: r`A bakery sold $14, 9, 17, 12, 9, 15, 15, 9, 20$ and $10$ loaves of rye bread on ten imagined days. Find the mean, the median and the mode.`, model: J([r`Mean $= \dfrac{14 + 9 + 17 + 12 + 9 + 15 + 15 + 9 + 20 + 10}{10} = \dfrac{130}{10} = 13$.`, r`Arranged: $9, 9, 9, 10, 12, 14, 15, 15, 17, 20$. The fifth and sixth values are $12$ and $14$, so the median is $\dfrac{12 + 14}{2} = 13$.`, r`The value $9$ occurs three times, more than any other, so the mode is $9$.`]), sol: 'Sum divided by ten; middle pair averaged after arranging; most frequent value.', scheme: [['Mean 13', 1], ['Median 13', 1], ['Mode 9', 1]], d: 2, c: 'understanding', t: [1], time: 150 }), (C) => { C.assert(meanL(s301).eq(13) && medianL(s301).eq(13) && modesL(s301).length === 1 && modesL(s301)[0].eq(9) && sum(s301.map((x) => fr(x))).eq(130), 'mean, median, mode'); C.model([130, 13, 12, 14, 9]); });
const s302 = D([0, 1, 2, 3, 4, 5], [5, 12, 9, 7, 4, 3]);
Q('s302', mk.short({ marks: 3, stem: r`The number of goals scored by an imagined school team in $40$ matches is shown.

${mdRowD(s302, 'Goals', 'Matches')}

Find the mean, the median and the mode.`, model: J([r`$\sum fx = 0 + 12 + 18 + 21 + 16 + 15 = 82$, so the mean is $\dfrac{82}{40} = 2.05$.`, r`Cumulative frequencies: $5, 17, 26, 33, 37, 40$. The $20$th and $21$st values both lie in the row for $2$ goals, so the median is $2$.`, r`The highest frequency is $12$, at $1$ goal, so the mode is $1$.`]), sol: 'Use fx for the mean, cumulative frequency for the median, highest frequency for the mode.', scheme: [['Mean 2.05', 1], ['Median 2', 1], ['Mode 1', 1]], d: 2, c: 'understanding', t: [1], time: 150 }), (C) => { C.assert(s302.mean.eq(fr('2.05')) && s302.median.eq(2) && s302.modes.length === 1 && s302.modes[0].eq(1) && s302.sumfx.eq(82) && s302.cf.join() === '5,17,26,33,37,40', 'mean, median, mode'); C.model([82, 2.05, 17, 26, 12]); });
const s303 = G(20, 10, [4, 10, 16, 8, 2]);
Q('s303', mk.short({ marks: 3, stem: r`The daily wages (in rupees, hundreds) of $40$ imagined workers are grouped below.

${mdRow(s303, 'Wage', 'Workers')}

Find the mean wage by the direct method.`, model: J([mdWork(s303, 'direct'), r`$\bar{x} = \dfrac{1740}{40} = 43.5$ hundred rupees.`]), sol: 'Class marks, then fx, then divide the total by the total frequency.', scheme: [['Class marks', 1], ['Sum of fx = 1740', 1], ['Mean 43.5', 1]], d: 2, c: 'application', t: [2], time: 150 }), (C) => { C.assert(meanAssumed(s303, fr(45)).eq(fr('43.5')) && sumFx(s303).eq(1740), 'direct and assumed agree'); C.model([1740, 43.5]); });
Q('s304', mk.short({ marks: 3, stem: r`The mean of $12$ imagined readings was found to be $25$. Later it was found that two readings, $18$ and $22$, had been copied as $28$ and $12$. Find the correct mean.`, model: J([r`Wrong total $= 12 \times 25 = 300$.`, r`Correct total $= 300 - (28 + 12) + (18 + 22) = 300 - 40 + 40 = 300$.`, r`Correct mean $= \dfrac{300}{12} = 25$, unchanged because the two pairs have the same sum.`]), sol: 'Adjust the total for the two corrected readings, then divide by twelve.', scheme: [['Wrong total 300', 1], ['Corrected total 300', 1], ['Mean 25', 1]], d: 3, c: 'application', t: [1], time: 120 }), (C) => { const tot = fr(12 * 25).sub(28 + 12).add(18 + 22); C.assert(tot.eq(300) && tot.div(12).eq(25), 'correct total and mean'); C.model([300, 40, 25]); });
const s305 = G(0, 20, [6, 11, 17, 10, 6]);
Q('s305', mk.short({ marks: 3, stem: r`The distances, in metres, that $50$ imagined athletes throw a ball are grouped below.

${mdRow(s305, 'Distance (m)', 'Athletes')}

Taking the assumed mean as $50$, find the mean distance.`, model: J([mdWork(s305, 'assumed', 50), r`$\bar{x} = 50 + \dfrac{-20}{50} = 50 - 0.4 = 49.6$ m.`]), sol: 'Deviations from 50, then fd, then the assumed-mean formula.', scheme: [['Deviations d', 1], ['Sum of fd = -20', 1], ['Mean 49.6', 1]], d: 3, c: 'application', t: [3], time: 150 }), (C) => { C.assert(sumFd(s305, fr(50)).eq(-20) && meanDirect(s305).eq(fr('49.6')) && mean(s305, fr(50)).eq(fr('49.6')), 'methods agree'); C.model([-20, 0.4, 49.6]); });

// =============================================================== Short answer, 4 marks
const s401 = G(25, 5, [3, 7, 13, 9, 6, 2]);
Q('s401', mk.short({ marks: 4, stem: r`The ages of $40$ imagined members of a walking club are grouped below.

${mdRow(s401, 'Age (years)', 'Members')}

Find the mean age by the direct method.`, model: J([mdWork(s401, 'direct'), r`$\bar{x} = \dfrac{1570}{40} = 39.25$ years.`]), sol: 'Direct method: class marks, fx, total, divide.', scheme: [['Class marks', 1], ['Column fx', 1], ['Sum of fx = 1570', 1], ['Mean 39.25', 1]], d: 2, c: 'application', t: [2], time: 200 }), (C) => { C.assert(meanStep(s401, fr('37.5')).eq(fr('39.25')) && sumFx(s401).eq(1570), 'step method agrees'); C.model([1570, 39.25]); });
const s402 = G(300, 40, [4, 9, 15, 11, 7, 4]);
Q('s402', mk.short({ marks: 4, stem: r`The monthly sales, in thousands of rupees, of $50$ imagined shops are grouped below.

${mdRow(s402, 'Sales', 'Shops')}

Taking the assumed mean as $400$, find the mean sales.`, model: J([mdWork(s402, 'assumed', 400), r`$\bar{x} = 400 + \dfrac{800}{50} = 400 + 16 = 416$.`]), sol: 'Assumed-mean method with a = 400.', scheme: [['Class marks and d', 1], ['Column fd', 1], ['Sum of fd = 800', 1], ['Mean 416', 1]], d: 3, c: 'application', t: [3], time: 200 }), (C) => { C.assert(sumFd(s402, fr(400)).eq(800) && meanDirect(s402).eq(416) && mean(s402, fr(400)).eq(416), 'methods agree'); C.model([800, 16, 416]); });
const s403 = G(0, 8, [5, 9, 13, 12, 7, 4]);
Q('s403', mk.short({ marks: 4, stem: r`The weekly pocket expenses, in rupees, of $50$ imagined pupils are grouped below.

${mdRow(s403, 'Expenses', 'Pupils')}

Use the step-deviation method with assumed mean $20$ to find the mean expense.`, model: J([mdWork(s403, 'step', 20), r`$\bar{x} = 20 + 8 \times \dfrac{19}{50} = 20 + 3.04 = 23.04$.`]), sol: 'Step deviation: u = (x - 20) / 8.', scheme: [['Values of u', 1], ['Column fu', 1], ['Sum of fu = 19', 1], ['Mean 23.04', 1]], d: 3, c: 'application', t: [3], time: 200 }), (C) => { C.assert(sumFu(s403, fr(20)).eq(19) && meanDirect(s403).eq(fr('23.04')) && mean(s403, fr(20)).eq(fr('23.04')), 'methods agree'); C.model([19, 3.04, 23.04]); });
const s404g = G(0, 10, [6, 10, 12, 0, 4]);
const s404 = missing(s404g, 3, fr('23.5'));
Q('s404', mk.short({ marks: 4, stem: r`The mean of the imagined distribution below is $23.5$, where $y$ is a missing frequency.

${mdRow(s404g, 'Hours of practice', 'Players', ['6', '10', '12', 'y', '4'])}

Find $y$.`, model: J([r`Class marks: $5, 15, 25, 35, 45$.`, s404.steps]), sol: 'Write sum of fx and sum of f in terms of y and use mean = sum of fx divided by sum of f.', scheme: [['Class marks', 1], ['Sum of fx and f in terms of y', 1], ['Equation from the mean', 1], ['y found', 1]], d: 3, c: 'application', t: [3], time: 200 }), (C) => { C.assert(s404.y.eq(8) && meanDirect(withFreq(s404g, 3, 8)).eq(fr('23.5')), 'substitute back'); C.model([t(s404.K), t(s404.y)]); });
const s405 = G(50, 10, [3, 8, 12, 10, 5, 2], { inc: true });
Q('s405', mk.short({ marks: 4, stem: r`The marks of $40$ imagined pupils are grouped in discontinuous classes.

${mdRow(s405, 'Marks', 'Pupils')}

Find the mean mark and name the median class.`, model: J([mdWork(s405, 'direct'), r`$\bar{x} = \dfrac{3100}{40} = 77.5$.`, r`Cumulative frequencies: $3, 11, 23, 33, 38, 40$. Since $\dfrac{40}{2} = 20$ and $23$ is the first to reach $20$, the median class is $70$–$79$.`]), sol: 'Direct method for the mean; cumulative frequency for the median class.', scheme: [['Class marks', 1], ['Sum of fx = 3100', 1], ['Mean 77.5', 1], ['Median class 70–79', 1]], d: 3, c: 'application', t: [2, 4], time: 220 }), (C) => { C.assert(sumFx(s405).eq(3100) && mean(s405, fr('74.5')).eq(fr('77.5')) && lab(s405, medianIdx(s405)) === '70–79' && medianIdxWalk(s405) === 2 && s405.cf.join() === '3,11,23,33,38,40', 'mean and median class'); C.model([3100, 77.5, '3, 11, 23, 33, 38, 40']); });
Q('s406', mk.short({ marks: 4, stem: r`The mean mark of $x$ imagined pupils in Class P is $45$, and that of $30$ pupils in Class Q is $60$. The mean mark of all the pupils together is $54$. Find $x$.`, model: J([r`Total of P $= 45x$ and total of Q $= 30 \times 60 = 1800$.`, r`Combined mean: $\dfrac{45x + 1800}{x + 30} = 54$.`, r`$45x + 1800 = 54x + 1620$, so $9x = 180$.`, r`$x = 20$.`]), sol: 'Equate the combined total to 54 times the combined number of pupils.', scheme: [['Totals of P and Q', 1], ['Equation from combined mean', 1], ['Simplify', 1], ['x = 20', 1]], d: 4, c: 'analysis', t: [1], time: 200 }), (C) => { const x = fr(54 * 30 - 1800).div(fr(45).sub(54)); C.assert(x.eq(20) && fr(45 * 20 + 1800).div(50).eq(54) && 54 * 30 === 1620, 'solve and substitute back'); C.model([1800, 1620, 180, 20]); });

// =============================================================== Long answer, 10 marks
const l01a = [35, 47, 52, 38, 44, 41];
const l01x = fr(7 * 42).sub(sum(l01a.map((v) => fr(v))));
const l01b = D([0, 1, 2, 3, 4, 5], [2, 5, 9, 7, 4, 3]);
const l01c = G(60, 20, [5, 8, 12, 10, 4, 1]);
Q('l01', mk.long({ marks: 10, stem: r`Answer each part.
(a) The mean of seven imagined daily takings (in hundreds of rupees) is $42$. Six of them are $35, 47, 52, 38, 44, 41$. Find the seventh and the median of all seven.
(b) A cycle shop records the number of repairs done per day for $30$ days.

${mdRowD(l01b, 'Repairs', 'Days')}

Find the mean, the median and the mode.
(c) The delivery times, in minutes, of $40$ imagined parcels are grouped below.

${mdRow(l01c, 'Time (min)', 'Parcels')}

Find the mean time by the direct method.`, model: J([r`(a) Total of seven $= 7 \times 42 = 294$. The six given add to $257$, so the seventh is $294 - 257 = 37$.`, r`Arranged: $35, 37, 38, 41, 44, 47, 52$; the median is the fourth value, $41$.`, r`(b) $\sum fx = 0 + 5 + 18 + 21 + 16 + 15 = 75$, so the mean is $\dfrac{75}{30} = 2.5$.`, r`Cumulative frequencies: $2, 7, 16, 23, 27, 30$. The $15$th and $16$th values both lie in the row for $2$ repairs, so the median is $2$. The highest frequency is $9$, so the mode is $2$.`, r`(c)`, mdWork(l01c, 'direct'), r`$\bar{x} = \dfrac{4460}{40} = 111.5$ minutes.`]), sol: 'Part (a): total less the known six. Part (b): fx, cumulative frequency, highest frequency. Part (c): direct method.', scheme: [['(a) Seventh value 37', 1], ['(a) Median 41', 2], ['(b) Mean 2.5', 1], ['(b) Median 2 and mode 2', 2], ['(c) Class marks and fx', 2], ['(c) Sum of fx = 4460', 1], ['(c) Mean 111.5', 1]], d: 3, c: 'application', t: [1, 2], time: 660 }), (C) => {
  C.assert(l01x.eq(37) && medianL([...l01a, 37]).eq(41) && meanL([...l01a, 37]).eq(42), '(a)');
  C.assert(l01b.mean.eq(fr('2.5')) && l01b.median.eq(2) && l01b.modes.length === 1 && l01b.modes[0].eq(2) && l01b.sumfx.eq(75) && l01b.cf.join() === '2,7,16,23,27,30', '(b)');
  C.assert(meanDirect(l01c).eq(fr('111.5')) && mean(l01c, fr(110)).eq(fr('111.5')) && sumFx(l01c).eq(4460), '(c)');
  C.model([37, 41, 75, 2.5, 4460, 111.5]);
});
const l02g = G(200, 50, [6, 10, 16, 12, 4, 2]);
Q('l02', mk.long({ marks: 10, stem: r`The daily takings, in rupees, of $50$ imagined market stalls are grouped below.

${mdRow(l02g, 'Takings', 'Stalls')}

(a) Write the class mark of each class and its deviation $d$ from the assumed mean $325$.
(b) Complete the table of $fd$ and find the mean takings by the assumed-mean method.
(c) Check your answer by the direct method and by the step-deviation method with $h = 50$.`, model: J([r`(a) Class marks: $225, 275, 325, 375, 425, 475$. Deviations $d = x - 325$: $-100, -50, 0, 50, 100, 150$.`, mdWork(l02g, 'assumed', 325), r`(b) $\sum fd = -600 - 500 + 0 + 600 + 400 + 300 = 200$, so $\bar{x} = 325 + \dfrac{200}{50} = 325 + 4 = 329$.`, r`(c) Direct: $\sum fx = 16450$ and $\bar{x} = \dfrac{16450}{50} = 329$.`, r`Step deviation: $u = \dfrac{x - 325}{50}$ gives $\sum fu = 4$ and $\bar{x} = 325 + 50 \times \dfrac{4}{50} = 329$. All three methods give $329$.`]), sol: 'Assumed mean, then direct and step-deviation checks.', scheme: [['(a) Class marks', 1], ['(a) Deviations d', 2], ['(b) Column fd and sum 200', 2], ['(b) Mean 329', 1], ['(c) Direct method 329', 2], ['(c) Step deviation 329', 2]], d: 3, c: 'application', t: [2, 3], time: 660 }), (C) => {
  C.assert(sumFd(l02g, fr(325)).eq(200) && meanAssumed(l02g, fr(325)).eq(329) && sumFx(l02g).eq(16450) && meanDirect(l02g).eq(329) && sumFu(l02g, fr(325)).eq(4) && meanStep(l02g, fr(325)).eq(329) && mean(l02g, fr(325)).eq(329), 'three methods agree');
  C.model([200, 4, 16450, 329]);
});
const l03g = G(5, 10, [3, 8, 14, 9, 6]);
Q('l03', mk.long({ marks: 10, stem: r`The marks of $40$ imagined pupils in a mathematics quiz are grouped below.

${mdRow(l03g, 'Marks', 'Pupils')}

(a) Using the assumed mean $30$ and class width $10$, find the value of $u = \dfrac{x - 30}{10}$ for each class.
(b) Find the mean mark by the step-deviation method.
(c) The teacher then adds $5$ marks to every pupil. State and justify the new mean, and check it by recalculating $\sum fx$ for the new class marks.`, model: J([r`(a) Class marks: $10, 20, 30, 40, 50$, so $u = -2, -1, 0, 1, 2$.`, mdWork(l03g, 'step', 30), r`(b) $\sum fu = -6 - 8 + 0 + 9 + 12 = 7$, so $\bar{x} = 30 + 10 \times \dfrac{7}{40} = 30 + 1.75 = 31.75$.`, r`(c) Adding $5$ to every mark adds $5$ to the mean: $31.75 + 5 = 36.75$.`, r`Check: the new class marks are $15, 25, 35, 45, 55$ and $\sum fx = 45 + 200 + 490 + 405 + 330 = 1470$, so the new mean is $\dfrac{1470}{40} = 36.75$.`]), sol: 'Step deviation, then the effect of a constant added to every value.', scheme: [['(a) Class marks', 1], ['(a) Values of u', 2], ['(b) Sum of fu = 7', 2], ['(b) Mean 31.75', 1], ['(c) New mean 36.75 with reason', 2], ['(c) Check by new sum of fx', 2]], d: 3, c: 'application', t: [3], time: 660 }), (C) => {
  const g2 = G(10, 10, [3, 8, 14, 9, 6]);
  C.assert(sumFu(l03g, fr(30)).eq(7) && meanStep(l03g, fr(30)).eq(fr('31.75')) && meanDirect(l03g).eq(fr('31.75')) && mean(l03g, fr(30)).eq(fr('31.75')), '(a)(b)');
  C.assert(sumFx(g2).eq(1470) && meanDirect(g2).eq(fr('36.75')) && meanDirect(g2).eq(meanDirect(l03g).add(5)), '(c)');
  C.model([7, 1.75, 31.75, 36.75, 1470]);
});
const l04g = G(0, 10, [5, 0, 13, 0, 7]);
Q('l04', mk.long({ marks: 10, stem: r`The mean of the imagined distribution below is $26$ and the total frequency is $50$. The frequencies $x$ and $y$ are missing.

${mdRow(l04g, 'Class', 'Frequency', ['5', 'x', '13', 'y', '7'])}

(a) Use the total frequency to form an equation in $x$ and $y$.
(b) Use the mean to form a second equation, using class marks.
(c) Solve the equations to find $x$ and $y$, and verify that the mean is $26$.`, model: J([r`(a) $5 + x + 13 + y + 7 = 50$, so $x + y = 25$.`, r`(b) Class marks: $5, 15, 25, 35, 45$. $\sum fx = 25 + 15x + 325 + 35y + 315 = 665 + 15x + 35y$. Since the mean is $26$ and $\sum f = 50$, $\sum fx = 26 \times 50 = 1300$, so $15x + 35y = 635$, that is $3x + 7y = 127$.`, r`(c) From $x + y = 25$: $3x + 3y = 75$. Subtracting from $3x + 7y = 127$ gives $4y = 52$, so $y = 13$ and $x = 12$.`, r`Verification: $\sum fx = 665 + 180 + 455 = 1300$ and $\dfrac{1300}{50} = 26$.`]), sol: 'Two equations from the total frequency and the mean, then eliminate.', scheme: [['(a) x + y = 25', 2], ['(b) Class marks and sum of fx in x and y', 1], ['(b) 3x + 7y = 127', 2], ['(c) Elimination: y = 13', 1], ['(c) x = 12', 1], ['(c) Verification of the mean', 3]], d: 4, c: 'analysis', t: [3], time: 720 }), (C) => {
  const xk = fr(12), yk = fr(13);
  const g = withFreq(withFreq(l04g, 1, 12), 3, 13);
  C.assert(g.n === 50 && meanDirect(g).eq(26) && sumFx(g).eq(1300), 'solution fits');
  // independent solve of x + y = 25 and 3x + 7y = 127 by Cramer's rule
  const det = fr(1 * 7 - 1 * 3), yy = fr(1 * 127 - 3 * 25).div(det), xx = fr(25 * 7 - 127 * 1).div(det);
  C.assert(xx.eq(xk) && yy.eq(yk) && 15 * 25 === 375 && 635 - 375 === 260 && 5 * 5 + 25 * 13 + 45 * 7 === 665, 'Cramer agrees');
  C.assert(5 * 5 + 15 * 12 + 25 * 13 + 35 * 13 + 45 * 7 === 1300, 'sum of fx');
  C.model([25, 665, 1300, 635, 127, 13, 12]);
});
const l05g = G(45, 5, [3, 6, 10, 9, 13, 6, 3]);
Q('l05', mk.long({ marks: 10, stem: r`The heights, in cm, of $50$ imagined seedlings are grouped below.

${mdRow(l05g, 'Height (cm)', 'Seedlings')}

(a) Make a cumulative frequency column and name the median class.
(b) Name the modal class, and say why the two classes are different.
(c) Find the mean height by the direct method.`, model: J([r`(a)`, mdWork(l05g, 'cf'), r`Since $\dfrac{50}{2} = 25$ and the first cumulative frequency to reach $25$ is $28$, the median class is $60$–$65$.`, r`(b) The highest frequency is $13$, so the modal class is $65$–$70$. The classes differ because the median class is decided by cumulative frequency (where the $25$th seedling falls), while the modal class is decided only by the greatest frequency.`, r`(c)`, mdWork(l05g, 'direct'), r`$\bar{x} = \dfrac{3140}{50} = 62.8$ cm.`]), sol: 'Cumulative frequency gives the median class; the largest frequency gives the modal class; direct method for the mean.', scheme: [['(a) Cumulative frequencies', 2], ['(a) Median class 60–65', 1], ['(b) Modal class 65–70', 1], ['(b) Reason they differ', 2], ['(c) Class marks and fx', 1], ['(c) Sum of fx = 3140', 1], ['(c) Mean 62.8', 2]], d: 3, c: 'application', t: [2, 4], time: 660 }), (C) => {
  C.assert(l05g.cf.join() === '3,9,19,28,41,47,50' && lab(l05g, medianIdx(l05g)) === '60–65' && medianIdxWalk(l05g) === 3 && lab(l05g, modalIdx(l05g)) === '65–70', '(a)(b)');
  C.assert(sumFx(l05g).eq(3140) && meanDirect(l05g).eq(fr('62.8')) && mean(l05g, fr('62.5')).eq(fr('62.8')), '(c)');
  C.model([28, 25, 13, 3140, 62.8]);
});
const l06g = G(0, 6, [4, 9, 0, 11, 8, 5]);
const l06 = missing(l06g, 2, 18);
Q('l06', mk.long({ marks: 10, stem: r`Answer each part.
(a) The mean of $12$ imagined numbers is $18$. If one of them, $9$, is replaced by $21$, find the new mean.
(b) Twenty pupils of Section A have a mean score of $56$. When $10$ pupils of Section B join them, the mean of all $30$ becomes $58$. Find the mean score of Section B.
(c) The mean of the imagined distribution below is $18$, where $y$ is a missing frequency.

${mdRow(l06g, 'Class', 'Frequency', ['4', '9', 'y', '11', '8', '5'])}

Find $y$.`, model: J([r`(a) Original total $= 12 \times 18 = 216$. New total $= 216 - 9 + 21 = 228$, so the new mean is $\dfrac{228}{12} = 19$.`, r`(b) Combined total $= 30 \times 58 = 1740$; Section A total $= 20 \times 56 = 1120$; Section B total $= 1740 - 1120 = 620$, so its mean is $\dfrac{620}{10} = 62$.`, r`(c) Class marks: $3, 9, 15, 21, 27, 33$. ${l06.steps}`]), sol: 'Totals for (a) and (b); mean equation for (c).', scheme: [['(a) New total 228', 1], ['(a) New mean 19', 2], ['(b) Totals 1740 and 1120', 1], ['(b) Mean of B = 62', 2], ['(c) Sum of fx and f in terms of y', 1], ['(c) Equation from the mean', 2], ['(c) y = 13', 1]], d: 3, c: 'application', t: [1, 3], time: 660 }), (C) => {
  C.assert(fr(12 * 18 - 9 + 21).div(12).eq(19) && fr(30 * 58 - 20 * 56).div(10).eq(62), '(a)(b)');
  C.assert(l06.y.eq(13) && meanDirect(withFreq(l06g, 2, 13)).eq(18) && withFreq(l06g, 2, 13).n === 50, '(c)');
  C.model([216, 228, 19, 1740, 1120, 62, 13]);
});
const l07 = [8, 10, 11, 14, 17];
Q('l07', mk.long({ marks: 10, stem: r`Five imagined numbers are $x$, $x + 2$, $x + 3$, $x + 6$ and $x + 9$, and their mean is $12$.
(a) Find $x$ and write down the five numbers and their median.
(b) A sixth number is added and the mean of the six numbers becomes $13$. Find the sixth number.
(c) Find the median of the six numbers and say by how much it differs from the mean. State whether the six numbers have a mode.`, model: J([r`(a) Sum $= 5x + 20$, so $\dfrac{5x + 20}{5} = 12$, giving $x + 4 = 12$ and $x = 8$. The numbers are $8, 10, 11, 14, 17$, already in order, and the median is the middle value, $11$.`, r`(b) New total $= 6 \times 13 = 78$. The old total is $5 \times 12 = 60$, so the sixth number is $78 - 60 = 18$.`, r`(c) Arranged: $8, 10, 11, 14, 17, 18$. The median is $\dfrac{11 + 14}{2} = 12.5$, which is $0.5$ less than the mean $13$. No value is repeated, so the data has no mode.`]), sol: 'Express the mean through x; use totals for the added number; median of six values is the mean of the middle pair.', scheme: [['(a) Equation in x and x = 8', 2], ['(a) Numbers and median 11', 1], ['(b) New total 78 and old total 60', 1], ['(b) Sixth number 18', 2], ['(c) Median 12.5', 2], ['(c) Difference 0.5 and no mode', 2]], d: 4, c: 'analysis', t: [1], time: 600 }), (C) => {
  const x = fr(5 * 12 - 20).div(5);
  C.assert(x.eq(8) && meanL(l07).eq(12) && medianL(l07).eq(11), '(a)');
  const six = fr(6 * 13).sub(5 * 12);
  const l7six = [...l07, 18];
  C.assert(six.eq(18) && meanL(l7six).eq(13) && medianL(l7six).eq(fr('12.5')) && fr(13).sub(fr('12.5')).eq(fr('0.5')) && modesL(l7six).length === 6, '(b)(c)');
  C.model([20, 8, 11, 78, 60, 18, 12.5, 0.5]);
});
