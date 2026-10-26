// CBSE 10 Mathematics ch13 Statistics — practice bank with independent re-solve checks. Frequency tables
// in stems and working tables in solutions are generated from the data arrays in this file; mean is
// re-solved by three methods that must agree, median by formula and by a cumulative walk, mode by formula
// with a uniqueness check on the modal class. Ogives (removed topic) are not used.
import { Q, caseQ, child, mk, r } from '../../cbse-10-mathematics-ch10/src/lib.mjs';
import { G, mean, median, medianWalk, mode, modalIdx, medianIdx, mdRow, mdWork, sumFx, sumFd, sumFu, hist } from './stat.mjs';

const near = (u, v, e = 1e-6) => Math.abs(u - v) < e;
const R2 = (x) => Math.round(x * 100) / 100;
const R6 = (x) => Math.round(x * 1e6) / 1e6;
/** median formula and cumulative walk agree, then return the value */
const med = (g) => { const a = median(g), b = medianWalk(g); if (!near(a, b)) throw new Error('median mismatch'); return a; };

// =============================================================== MCQ
Q('m01', mk.mcq({ stem: 'The class mark of the class 25–35 is', opts: ['$30$', '$25$', '$35$', '$10$'], key: 'a', sol: r`Class mark $= \dfrac{\text{lower limit} + \text{upper limit}}{2} = \dfrac{25 + 35}{2} = 30$. Option (d) is the class width.`, d: 1, c: 'recall', t: [1], time: 30 }), (C) => C.which([30, 25, 35, 10], G(25, 10, [1]).x[0]));
Q('m02', mk.mcq({ stem: r`In the step-deviation method, with assumed mean $a$ and class width $h$, $u_i$ equals`, opts: [r`$\dfrac{x_i - a}{h}$`, r`$\dfrac{x_i + a}{h}$`, r`$x_i - a$`, r`$\dfrac{h}{x_i - a}$`], key: 'a', sol: r`$u_i = \dfrac{x_i - a}{h}$; then $\bar x = a + h \times \dfrac{\sum f_iu_i}{\sum f_i}$. Option (c) is $d_i$ of the assumed-mean method.`, d: 1, c: 'recall', t: [1], time: 30 }), (C) => { const g = G(0, 20, [6, 10, 12, 8, 4]); C.assert(near(meanStep(g), mean(g)), 'step formula reproduces the mean'); C.key('a'); function meanStep(gg) { const a = 50; return a + (gg.f.reduce((s, v, i) => s + v * ((gg.x[i] - a) / gg.h), 0) / gg.n) * gg.h; } });
Q('m03', mk.mcq({ stem: r`For a grouped distribution, $\sum f_i = 50$ and $\sum f_ix_i = 1300$. The mean is`, opts: ['$26$', '$25$', '$1250$', '$65$'], key: 'a', sol: r`$\bar x = \dfrac{\sum f_ix_i}{\sum f_i} = \dfrac{1300}{50} = 26$.`, d: 1, c: 'understanding', t: [1], time: 30 }), (C) => C.which([26, 25, 1250, 65], 1300 / 50));
Q('m04', mk.mcq({ stem: r`Using the assumed-mean method with $a = 45$, a student finds $\sum f_i = 40$ and $\sum f_id_i = -80$. The mean is`, opts: ['$43$', '$47$', '$45$', '$41$'], key: 'a', sol: r`$\bar x = a + \dfrac{\sum f_id_i}{\sum f_i} = 45 + \dfrac{-80}{40} = 45 - 2 = 43$. Option (b) ignores the minus sign.`, d: 2, c: 'understanding', t: [1], time: 45 }), (C) => C.which([43, 47, 45, 41], 45 + -80 / 40));
Q('m05', mk.mcq({ stem: r`Using the step-deviation method with $a = 35$ and $h = 10$, $\sum f_i = 50$ and $\sum f_iu_i = 15$. The mean is`, opts: ['$38$', '$35.3$', '$32$', '$50$'], key: 'a', sol: r`$\bar x = 35 + 10 \times \dfrac{15}{50} = 35 + 3 = 38$. Option (b) forgets to multiply by $h$; (c) subtracts.`, d: 2, c: 'understanding', t: [1], time: 45 }), (C) => C.which([38, 35.3, 32, 50], 35 + 10 * (15 / 50)));
const gM6 = G(10, 10, [5, 9, 14, 11, 6]);
Q('m06', mk.mcq({ stem: r`The modal class of the distribution below is

${mdRow(gM6, 'Class', 'Frequency')}`, opts: ['30–40', '20–30', '40–50', '10–20'], key: 'a', sol: r`The modal class is the class with the highest frequency: $14$, for $30$–$40$. (The mode itself must then be found with the formula.)`, d: 2, c: 'understanding', t: [2], time: 45 }), (C) => C.which(['30–40', '20–30', '40–50', '10–20'], `${gM6.cls[modalIdx(gM6)][0]}–${gM6.cls[modalIdx(gM6)][1]}`));
Q('m07', mk.mcq({ stem: r`In the usual notation, the mode of grouped data is`, opts: [r`$l + \dfrac{f_1 - f_0}{2f_1 - f_0 - f_2} \times h$`, r`$l + \dfrac{f_1 - f_0}{f_1 + f_0 + f_2} \times h$`, r`$l + \dfrac{\frac n2 - cf}{f} \times h$`, r`$l + \dfrac{f_1 - f_2}{2f_1 - f_0 - f_2} \times h$`], key: 'a', sol: r`$l$: lower limit of the modal class; $f_1$: its frequency; $f_0$, $f_2$: frequencies of the classes before and after it. Option (c) is the median formula.`, d: 1, c: 'recall', t: [2], time: 30 }), (C) => { const g = G(20, 10, [5, 12, 18, 14, 1]); const [l, f1, f0, f2] = [40, 18, 12, 14]; C.assert(near(l + ((f1 - f0) / (2 * f1 - f0 - f2)) * 10, mode(g)), 'formula (a) reproduces the mode'); C.key('a'); });
const gM8 = G(0, 10, [7, 10, 15, 12, 6]);
Q('m08', mk.mcq({ stem: r`For the distribution below, the median class is

${mdRow(gM8, 'Class', 'Frequency')}`, opts: ['20–30', '10–20', '30–40', '40–50'], key: 'a', sol: r`$n = 50$, so $\dfrac n2 = 25$. Cumulative frequencies: $7, 17, 32, 44, 50$. The first one to reach $25$ is $32$, for $20$–$30$. Option (b) is where the $17$th observation ends; the $25$th lies further on.`, d: 2, c: 'understanding', t: [3], time: 60 }), (C) => C.which(['20–30', '10–20', '30–40', '40–50'], `${gM8.cls[medianIdx(gM8)][0]}–${gM8.cls[medianIdx(gM8)][1]}`));
Q('m09', mk.mcq({ stem: r`In the median formula $l + \dfrac{\frac n2 - cf}{f} \times h$, $cf$ is`, opts: ['the cumulative frequency of the class preceding the median class', 'the cumulative frequency of the median class', 'the frequency of the median class', 'the total frequency'], key: 'a', sol: r`$cf$ counts the observations **before** the median class; $f$ is the frequency of the median class itself.`, d: 1, c: 'recall', t: [3], time: 30 }), (C) => { const g = G(0, 10, [7, 10, 15, 12, 6]); C.assert(near(20 + ((25 - 17) / 15) * 10, med(g)), 'preceding cf 17 gives the median'); C.key('a'); });
Q('m10', mk.mcq({ stem: r`For a modal class $40$–$50$ with $f_1 = 18$, $f_0 = 12$ and $f_2 = 14$, the mode is`, opts: ['$46$', '$44$', '$45$', '$43$'], key: 'a', sol: r`Mode $= 40 + \dfrac{18 - 12}{36 - 12 - 14} \times 10 = 40 + \dfrac{6}{10} \times 10 = 46$. Option (c) is just the class mark.`, d: 2, c: 'understanding', t: [2], time: 60 }), (C) => C.which([46, 44, 45, 43], R6(mode(G(20, 10, [3, 12, 18, 14, 5])))));
Q('m11', mk.mcq({ stem: r`For a median class $30$–$40$, with $n = 60$, $cf = 22$ and $f = 16$, the median is`, opts: ['$35$', '$30.5$', '$38$', '$36.25$'], key: 'a', sol: r`Median $= 30 + \dfrac{30 - 22}{16} \times 10 = 30 + 5 = 35$.`, d: 2, c: 'understanding', t: [3], time: 60 }), (C) => C.which([35, 30.5, 38, 36.25], R6(med(G(10, 10, [10, 12, 16, 14, 8])))));
Q('m12', mk.mcq({ stem: 'If every observation in a grouped distribution is increased by 5, the mean', opts: ['increases by 5', 'is unchanged', 'is multiplied by 5', 'increases by 5 times the number of classes'], key: 'a', sol: r`Each class mark increases by $5$: $\dfrac{\sum f_i(x_i + 5)}{\sum f_i} = \bar x + 5$.`, d: 2, c: 'understanding', t: [1], time: 45 }), (C) => { const g = G(0, 10, [3, 7, 12, 10, 8]), g5 = G(5, 10, [3, 7, 12, 10, 8]); C.assert(near(mean(g5) - mean(g), 5), '+5'); C.key('a'); });
Q('m13', mk.mcq({ stem: 'For a moderately skewed distribution the mean is 30 and the median is 32. Using the empirical relation 3 Median = Mode + 2 Mean, the mode is about', opts: ['$36$', '$34$', '$31$', '$28$'], key: 'a', sol: r`Mode $= 3 \times 32 - 2 \times 30 = 96 - 60 = 36$.`, d: 2, c: 'application', t: [2, 3], time: 60 }), (C) => C.which([36, 34, 31, 28], 3 * 32 - 2 * 30));
Q('m14', mk.mcq({ stem: 'Which of these is NOT a measure of central tendency?', opts: ['range', 'mean', 'median', 'mode'], key: 'a', sol: 'Mean, median and mode describe the centre of the data; the range measures spread.', d: 1, c: 'recall', t: [1], time: 30 }), (C) => C.key('a'));
const gM15 = G(0, 10, [4, 6, 9, 11, 5]);
Q('m15', mk.mcq({ stem: r`For the distribution below, the cumulative frequency of the class $30$–$40$ is

${mdRow(gM15, 'Class', 'Frequency')}`, opts: ['$30$', '$11$', '$19$', '$35$'], key: 'a', sol: r`Add all frequencies up to and including $30$–$40$: $4 + 6 + 9 + 11 = 30$. Option (c) stops one class early; (d) is the total.`, d: 2, c: 'understanding', t: [3], time: 45 }), (C) => C.which([30, 11, 19, 35], gM15.cf[3]));
Q('m16', mk.mcq({ stem: 'The class marks of a distribution with equal classes are 12, 18, 24, 30, 36. The class width is', opts: ['$6$', '$12$', '$3$', '$9$'], key: 'a', sol: r`For equal classes, consecutive class marks differ by the class width: $18 - 12 = 6$. (The classes are $9$–$15$, $15$–$21$, and so on.)`, d: 2, c: 'understanding', t: [1], time: 45 }), (C) => { const g = G(9, 6, [1, 1, 1, 1, 1]); C.assert(g.x.join() === '12,18,24,30,36', 'class marks'); C.which([6, 12, 3, 9], g.h); });
Q('m17', mk.mcq({ stem: 'A distribution has the classes 10–19, 20–29, 30–39, … (inclusive form). After making the classes continuous, the lower limit of the class 20–29 is', opts: ['$19.5$', '$20$', '$20.5$', '$19$'], key: 'a', sol: r`The gap between $19$ and $20$ is $1$, so subtract $0.5$ from each lower limit and add $0.5$ to each upper limit: $20$–$29$ becomes $19.5$–$29.5$.`, d: 2, c: 'understanding', t: [3], time: 45 }), (C) => C.which([19.5, 20, 20.5, 19], 20 - (20 - 19) / 2));
Q('m18', mk.mcq({ stem: r`In the direct method, $\bar x = \dfrac{\sum f_ix_i}{\sum f_i}$, where $x_i$ is`, opts: ['the class mark of each class', 'the upper limit of each class', 'the lower limit of each class', 'the cumulative frequency of each class'], key: 'a', sol: r`Each observation in a class is represented by the **class mark** (mid-point). Using upper limits overstates the mean by half a class width.`, d: 1, c: 'recall', t: [1], time: 30 }), (C) => C.key('a'));

// =============================================================== Assertion-reason (keys a b c d a d)
Q('ar1', mk.ar({ a: 'For classes of equal width, the step-deviation method and the direct method give the same mean.', r: r`$u_i = \dfrac{x_i - a}{h}$ is obtained from $x_i$ by a shift and a scaling, which change the mean in the same way and are reversed in $\bar x = a + h\bar u$.`, key: 'a', sol: r`$\bar u = \dfrac{\bar x - a}{h}$, so $a + h\bar u = \bar x$. R explains A.`, d: 3, c: 'analysis', t: [1] }), (C) => { const g = G(0, 20, [6, 10, 12, 8, 4]); C.assert(near(mean(g, 30), 47) && near(mean(g, 70), 47), 'any a'); C.key('a'); });
Q('ar2', mk.ar({ a: 'The median of grouped data can be found using cumulative frequencies.', r: 'The sum of all the frequencies equals the total number of observations.', key: 'b', sol: r`Both are true. A works because cumulative frequencies locate the $\dfrac n2$-th observation; R is a true fact, but it does not explain that.`, d: 2, c: 'understanding', t: [3] }), (C) => C.key('b'));
Q('ar3', mk.ar({ a: 'The modal class of a grouped distribution is the class with the highest frequency.', r: 'The mode of grouped data is the class mark of the modal class.', key: 'c', sol: r`A is the definition. R is false: the mode is $l + \dfrac{f_1 - f_0}{2f_1 - f_0 - f_2} \times h$, which equals the class mark only when $f_0 = f_2$.`, d: 2, c: 'understanding', t: [2] }), (C) => { C.assert(!near(mode(G(20, 10, [3, 12, 18, 14, 5])), 45), 'mode 46 ≠ class mark 45'); C.key('c'); });
Q('ar4', mk.ar({ a: 'The mean found by the assumed-mean method depends on the value chosen for the assumed mean a.', r: r`In the assumed-mean method, $d_i = x_i - a$.`, key: 'd', sol: r`R is true. But $\bar x = a + \bar d$, and $\bar d = \bar x - a$, so $a$ cancels: every choice of $a$ gives the same mean. A is false.`, d: 2, c: 'understanding', t: [1] }), (C) => { const g = G(26, 2, [4, 10, 18, 12, 6]); C.assert(near(mean(g, 27), mean(g, 33)), 'independent of a'); C.key('d'); });
Q('ar5', mk.ar({ a: r`If $n = 50$, the median class is the first class whose cumulative frequency is $25$ or more.`, r: r`The median is the value of the middle observation, the $\dfrac n2$-th observation for grouped data.`, key: 'a', sol: r`The $25$th observation lies in the first class whose cumulative frequency reaches $25$. R explains A.`, d: 2, c: 'understanding', t: [3] }), (C) => C.key('a'));
Q('ar6', mk.ar({ a: 'For the frequencies 5, 9, 9, 4 in the classes 0–10, 10–20, 20–30, 30–40, the mode formula gives a single mode.', r: 'The modal class is the class with the maximum frequency.', key: 'd', sol: r`R is true, but here two classes share the maximum frequency $9$: the data are bimodal and there is no single modal class to put into the formula. A is false.`, d: 3, c: 'analysis', t: [2] }), (C) => { let tie = false; try { modalIdx(G(0, 10, [5, 9, 9, 4])); } catch { tie = true; } C.assert(tie, 'two modal classes'); C.key('d'); });

// =============================================================== True / false
Q('tf1', mk.tf({ stem: 'The class mark of a class is the average of its upper and lower limits.', key: 't', sol: r`Class mark $= \dfrac{\text{upper} + \text{lower}}{2}$, the mid-point of the class.`, d: 1, c: 'recall', t: [1] }), (C) => C.key('t'));
Q('tf2', mk.tf({ stem: 'The median of grouped data is always the class mark of the median class.', key: 'f', sol: r`The median is $l + \dfrac{\frac n2 - cf}{f} \times h$; it is the class mark only in special cases. For example, $n = 60$, class $30$–$40$, $cf = 22$, $f = 16$ gives $35$, the class mark — but with $cf = 24$ it gives $33.75$.`, d: 2, c: 'understanding', t: [3] }), (C) => { C.assert(near(30 + ((30 - 24) / 16) * 10, 33.75), '33.75'); C.key('f'); });
Q('tf3', mk.tf({ stem: 'In the assumed-mean method, any convenient value may be chosen as the assumed mean; the final mean is the same.', key: 't', sol: r`$\bar x = a + \bar d$ and $\bar d = \bar x - a$, so the result does not depend on $a$. A class mark near the middle just keeps the numbers small.`, d: 1, c: 'understanding', t: [1] }), (C) => { const g = G(100, 20, [10, 15, 20, 10, 5]); C.assert(near(mean(g, 110), mean(g, 170)), 'same'); C.key('t'); });
Q('tf4', mk.tf({ stem: 'In the mode formula, f₀ is the frequency of the class succeeding (just after) the modal class.', key: 'f', sol: r`$f_0$ is the frequency of the class **preceding** the modal class; $f_2$ is the one succeeding it.`, d: 1, c: 'recall', t: [2] }), (C) => C.key('f'));
Q('tf5', mk.tf({ stem: 'The cumulative frequency of the last class of a distribution equals the total number of observations.', key: 't', sol: 'The last cumulative frequency adds every frequency, so it equals n.', d: 1, c: 'recall', t: [3] }), (C) => { const g = G(0, 10, [4, 6, 9, 11, 5]); C.assert(g.cf[g.k - 1] === g.n, 'last cf = n'); C.key('t'); });

// =============================================================== Fill in the blank
Q('fb1', mk.fill({ stem: 'The class mark of the class 40–50 is ___.', acc: [['45']], sol: r`$\dfrac{40 + 50}{2} = 45$.`, d: 1, c: 'recall', t: [1] }), (C) => C.blank(G(40, 10, [1]).x[0]));
Q('fb2', mk.fill({ stem: r`If $\sum f_i = 25$ and $\sum f_ix_i = 1150$, the mean is ___.`, acc: [['46']], sol: r`$\dfrac{1150}{25} = 46$.`, d: 2, c: 'understanding', t: [1] }), (C) => C.blank(1150 / 25));
Q('fb3', mk.fill({ stem: 'In the median formula, cf is the cumulative frequency of the class ___ the median class.', acc: [['preceding', 'before', 'just before', 'previous to']], sol: 'cf is the cumulative frequency of the class **preceding** the median class.', d: 1, c: 'recall', t: [3] }), (C) => C.blank('preceding'));
Q('fb4', mk.fill({ stem: 'The class with the highest frequency is called the ___ class.', acc: [['modal']], sol: 'It is the **modal class**; the mode lies in it.', d: 1, c: 'recall', t: [2] }), (C) => C.blank('modal'));
Q('fb5', mk.fill({ stem: 'If the mean of a distribution is 20 and its median is 22, the empirical relation 3 Median = Mode + 2 Mean gives the mode as ___.', acc: [['26']], sol: r`Mode $= 3 \times 22 - 2 \times 20 = 66 - 40 = 26$.`, d: 2, c: 'application', t: [2, 3] }), (C) => C.blank(3 * 22 - 2 * 20));

// =============================================================== Numerical
const gN1 = G(0, 20, [3, 6, 10, 7, 4]);
Q('n01', mk.num({ stem: r`The weekly pocket money (in ₹) of 30 students of a Jaipur school is given below. Find the mean pocket money by the direct method.

${mdRow(gN1, 'Pocket money (₹)', 'Number of students')}`, value: 52, unit: '₹', marks: 2, sol: r`**Step 1.** Working table:

${mdWork(gN1, 'direct')}

**Step 2.** $\bar x = \dfrac{1560}{30} = 52$, so the mean is ₹$52$.`, scheme: [['Class marks and Σfx = 1560', 1], ['Mean ₹52', 1]], d: 2, c: 'understanding', t: [1], time: 150 }), (C) => { C.val(mean(gN1)); C.sol([sumFx(gN1)]); });
const gN2 = G(26, 2, [4, 10, 18, 12, 6]);
Q('n02', mk.num({ stem: r`The daily maximum temperatures (°C) in Chennai on 50 days of May are given below. Find the mean temperature using the assumed-mean method.

${mdRow(gN2, 'Temperature (°C)', 'Number of days')}`, value: 31.24, unit: '°C', tol: 0.005, marks: 2, sol: r`**Step 1.** Take $a = 31$:

${mdWork(gN2, 'assumed', 31)}

**Step 2.** $\bar x = 31 + \dfrac{12}{50} = 31 + 0.24 = 31.24$ °C.`, scheme: [['Σfd = 12 with a = 31', 1], ['31.24 °C', 1]], d: 2, c: 'application', t: [1], time: 150 }), (C) => { C.val(R6(mean(gN2)), 0.005); C.assert(sumFd(gN2, 31) === 12, 'Σfd'); });
const gN3 = G(200, 200, [6, 14, 20, 7, 3]);
Q('n03', mk.num({ stem: r`The monthly electricity bills (₹) of 50 homes in a Nagpur colony are given below. Find the mean bill using the step-deviation method.

${mdRow(gN3, 'Bill (₹)', 'Number of homes')}`, value: 648, unit: '₹', marks: 2, sol: r`**Step 1.** Take $a = 700$, $h = 200$:

${mdWork(gN3, 'step', 700)}

**Step 2.** $\bar x = 700 + 200 \times \dfrac{-13}{50} = 700 - 52 = 648$, so the mean bill is ₹$648$.`, scheme: [['Σfu = −13', 1], ['Mean ₹648', 1]], d: 3, c: 'application', t: [1], time: 150 }), (C) => { C.val(mean(gN3)); C.assert(sumFu(gN3, 700) === -13, 'Σfu'); });
const gN4 = G(10, 10, [3, 7, 20, 12, 8]);
Q('n04', mk.num({ stem: r`The mean of the following distribution is $38$. Find the missing frequency $p$.

${mdRow(gN4, 'Class', 'Frequency', ['3', '7', '$p$', '12', '8'])}`, value: 20, marks: 2, sol: r`**Step 1.** Class marks $15, 25, 35, 45, 55$: $\sum f_ix_i = 45 + 175 + 35p + 540 + 440 = 1200 + 35p$ and $\sum f_i = 30 + p$.

**Step 2.** $\dfrac{1200 + 35p}{30 + p} = 38 \Rightarrow 1200 + 35p = 1140 + 38p \Rightarrow 3p = 60 \Rightarrow p = 20$.`, scheme: [['Equation in p', 1], ['p = 20', 1]], d: 3, c: 'application', t: [1], time: 180 }), (C) => { let p = null; for (let k = 0; k <= 100; k++) if (near(mean(G(10, 10, [3, 7, k, 12, 8])), 38)) p = k; C.val(p); C.sol([1200, 1140, 60]); });
const gN5 = G(30, 5, [4, 9, 15, 9, 3]);
Q('n05', mk.num({ stem: r`The weights (kg) of 40 students of a Class 10 section in Shillong are given below. Find the modal weight.

${mdRow(gN5, 'Weight (kg)', 'Number of students')}`, value: 42.5, unit: 'kg', marks: 2, sol: r`**Step 1.** Modal class $40$–$45$: $l = 40$, $f_1 = 15$, $f_0 = 9$, $f_2 = 9$, $h = 5$.

**Step 2.** Mode $= 40 + \dfrac{15 - 9}{30 - 9 - 9} \times 5 = 40 + \dfrac{6}{12} \times 5 = 42.5$ kg.`, scheme: [['Modal class and values', 1], ['42.5 kg', 1]], d: 2, c: 'understanding', t: [2], time: 120 }), (C) => C.val(mode(gN5)));
const gN6 = G(0, 10, [6, 10, 18, 20, 16, 10]);
Q('n06', mk.num({ stem: r`The marks of 80 students in a science test are given below. Find the median marks.

${mdRow(gN6, 'Marks', 'Number of students')}`, value: 33, marks: 2, sol: r`**Step 1.** $\dfrac n2 = 40$. Cumulative frequencies: $6, 16, 34, 54, 70, 80$. Median class $30$–$40$ with $cf = 34$, $f = 20$.

**Step 2.** Median $= 30 + \dfrac{40 - 34}{20} \times 10 = 30 + 3 = 33$.`, scheme: [['Median class with cf 34', 1], ['Median 33', 1]], d: 2, c: 'understanding', t: [3], time: 150 }), (C) => C.val(med(gN6)));
Q('n07', mk.num({ stem: r`The median of the following distribution is $25$. Find the missing frequency $x$.

${mdRow(G(0, 10, [6, 9, 12, 10, 5]), 'Class', 'Frequency', ['6', '$x$', '12', '10', '5'])}`, value: 9, marks: 2, sol: r`**Step 1.** $n = 33 + x$. The median $25$ lies in $20$–$30$, with $cf = 6 + x$ and $f = 12$.

**Step 2.** $25 = 20 + \dfrac{\frac{33 + x}{2} - 6 - x}{12} \times 10 \Rightarrow \dfrac{21 - x}{2} = 6 \Rightarrow x = 9$. (Check: $n = 42$, $\dfrac n2 = 21$ lies in $20$–$30$ ✓.)`, scheme: [['Equation from the median formula', 1], ['x = 9', 1]], d: 4, c: 'analysis', t: [3], time: 210 }), (C) => { let x = null; for (let k = 0; k <= 60; k++) { const g = G(0, 10, [6, k, 12, 10, 5]); if (medianIdx(g) === 2 && near(med(g), 25)) x = k; } C.val(x); C.sol([33, 21]); });
const gN8 = G(0, 20, [6, 10, 16, 12, 6]);
Q('n08', mk.num({ stem: r`The runs scored by a batter in 50 T20 innings for a Mumbai club are given below. Find the modal score.

${mdRow(gN8, 'Runs', 'Number of innings')}`, value: 52, unit: 'runs', marks: 2, sol: r`**Step 1.** Modal class $40$–$60$: $l = 40$, $f_1 = 16$, $f_0 = 10$, $f_2 = 12$, $h = 20$.

**Step 2.** Mode $= 40 + \dfrac{16 - 10}{32 - 10 - 12} \times 20 = 40 + \dfrac{6}{10} \times 20 = 52$ runs.`, scheme: [['Modal class values', 1], ['52 runs', 1]], d: 2, c: 'application', t: [2], time: 120 }), (C) => C.val(mode(gN8)));
const gN9 = G(1, 10, [5, 8, 14, 9, 4], { inclusive: true });
Q('n09', mk.num({ stem: r`The number of books issued by a Kochi library on 40 days is given below. Find the median.

${mdRow(gN9, 'Books issued', 'Number of days')}`, value: 25.5, marks: 2, sol: r`**Step 1.** Make the classes continuous: $0.5$–$10.5$, $10.5$–$20.5$, $20.5$–$30.5$, … Cumulative frequencies $5, 13, 27, 36, 40$; $\dfrac n2 = 20$, so the median class is $20.5$–$30.5$ with $cf = 13$, $f = 14$.

**Step 2.** Median $= 20.5 + \dfrac{20 - 13}{14} \times 10 = 20.5 + 5 = 25.5$.`, scheme: [['Continuous classes and median class', 1], ['25.5', 1]], d: 4, c: 'application', t: [3], time: 180 }), (C) => C.val(med(gN9)));

// =============================================================== Short answer, 2 marks
const gS1 = G(0, 4, [3, 7, 6, 4]);
Q('s201', mk.short({ marks: 2, stem: r`The number of books read in a year by 20 students of a reading club in Pune is given below. Find the mean number of books by the direct method.

${mdRow(gS1, 'Books read', 'Number of students')}`, model: r`${mdWork(gS1, 'direct')}

$\bar x = \dfrac{164}{20} = 8.2$ books.`, sol: 'Use class marks 2, 6, 10, 14.', scheme: [['Σfx = 164', 1], ['Mean 8.2', 1]], d: 2, c: 'understanding', t: [1], time: 120 }), (C) => { C.assert(near(mean(gS1), 8.2), '8.2'); C.model([164, 8.2]); });
const gS2 = G(50, 10, [5, 8, 14, 10, 3]);
Q('s202', mk.short({ marks: 2, stem: r`The number of cups of tea sold in a day at 40 stalls of a Kolkata market is given below. Find the modal class and the mode.

${mdRow(gS2, 'Cups sold', 'Number of stalls')}`, model: r`Modal class $70$–$80$ (highest frequency $14$): $l = 70$, $f_1 = 14$, $f_0 = 8$, $f_2 = 10$, $h = 10$.

Mode $= 70 + \dfrac{14 - 8}{28 - 8 - 10} \times 10 = 70 + 6 = 76$ cups.`, sol: 'Identify f₀ and f₂ from the classes on either side of the modal class.', scheme: [['Modal class and values', 1], ['Mode 76', 1]], d: 2, c: 'understanding', t: [2], time: 120 }), (C) => { C.assert(near(mode(gS2), 76), '76'); C.model([70, 14, 8, 10, 76]); });
const gS3 = G(10, 10, [4, 9, 13, 10, 4]);
Q('s203', mk.short({ marks: 2, stem: r`Write the cumulative frequencies for the distribution below and find the median class.

${mdRow(gS3, 'Class', 'Frequency')}`, model: r`${mdWork(gS3, 'cf')}

$n = 40$, $\dfrac n2 = 20$. The first cumulative frequency $\ge 20$ is $26$, so the median class is $30$–$40$.`, sol: 'Median class: first class whose cf reaches n/2.', scheme: [['Cumulative frequencies', 1], ['Median class 30–40', 1]], d: 2, c: 'understanding', t: [3], time: 120 }), (C) => { C.assert(medianIdx(gS3) === 2 && gS3.cf.join() === '4,13,26,36,40', 'median class'); C.model([13, 26, 36, 40, '30–40']); });
const gS4 = G(0, 10, [2, 5, 8, 5]);
Q('s204', mk.short({ marks: 2, stem: r`For the distribution below, Kabir finds the mean as $28$ by using the upper limits $10, 20, 30, 40$ as the $x_i$. Find his mistake and the correct mean.

${mdRow(gS4, 'Class', 'Frequency')}`, model: r`The $x_i$ must be the **class marks** $5, 15, 25, 35$, not the upper limits.

$\sum f_ix_i = 10 + 75 + 200 + 175 = 460$, so $\bar x = \dfrac{460}{20} = 23$. (Using upper limits adds half the class width, $5$, to the mean: $28 = 23 + 5$.)`, sol: 'Class marks represent the observations in each class.', scheme: [['Identifies the error', 1], ['Correct mean 23', 1]], d: 3, c: 'evaluation', t: [1], time: 150 }), (C) => { const wrong = gS4.f.reduce((s, v, i) => s + v * gS4.cls[i][1], 0) / gS4.n; C.assert(near(mean(gS4), 23) && near(wrong, 28), 'values'); C.model([460, 23, 28]); });
Q('s205', mk.short({ marks: 2, stem: 'For a distribution, the mode is 24 and the mean is 30. Use the empirical relation 3 Median = Mode + 2 Mean to estimate the median.', model: r`$3 \times \text{Median} = 24 + 2 \times 30 = 84$, so Median $= \dfrac{84}{3} = 28$.`, sol: 'For a moderately skewed distribution the median lies between the mode and the mean.', scheme: [['Substitution 3 Median = 84', 1], ['Median 28', 1]], d: 2, c: 'application', t: [2, 3], time: 90 }), (C) => { C.assert((24 + 60) / 3 === 28, '28'); C.model([84, 28]); });
Q('s206', mk.short({ marks: 2, stem: 'Show that if every frequency of a grouped distribution is doubled, the mean does not change. Illustrate with the classes 0–10, 10–20, 20–30 and frequencies 2, 3, 5.', model: r`$\bar x' = \dfrac{\sum 2f_ix_i}{\sum 2f_i} = \dfrac{2\sum f_ix_i}{2\sum f_i} = \bar x$: the factor $2$ cancels.

Example: $\dfrac{2 \times 5 + 3 \times 15 + 5 \times 25}{10} = \dfrac{180}{10} = 18$ and $\dfrac{4 \times 5 + 6 \times 15 + 10 \times 25}{20} = \dfrac{360}{20} = 18$.`, sol: 'Scaling all frequencies by the same factor leaves the weighted average unchanged.', scheme: [['General argument', 1], ['Numerical check (18 both times)', 1]], d: 3, c: 'analysis', t: [1], time: 150 }), (C) => { C.assert(near(mean(G(0, 10, [2, 3, 5])), 18) && near(mean(G(0, 10, [4, 6, 10])), 18), '18'); C.model([180, 360, 18]); });
const gS7 = G(0, 10, [12, 8, 6, 4]);
Q('s207', mk.short({ marks: 2, stem: r`Find the mode of the distribution below. (The modal class is the first class; take $f_0 = 0$.)

${mdRow(gS7, 'Class', 'Frequency')}`, model: r`Modal class $0$–$10$: $l = 0$, $f_1 = 12$, $f_0 = 0$, $f_2 = 8$, $h = 10$.

Mode $= 0 + \dfrac{12 - 0}{24 - 0 - 8} \times 10 = \dfrac{12}{16} \times 10 = 7.5$.`, sol: 'No class precedes the first class, so f₀ = 0.', scheme: [['Values with f₀ = 0', 1], ['Mode 7.5', 1]], d: 3, c: 'application', t: [2], time: 120 }), (C) => { C.assert(near(mode(gS7), 7.5), '7.5'); C.model([12, 16, 7.5]); });
const gS8 = G(0, 10, [5, 7, 16, 7, 5]);
Q('s208', mk.short({ marks: 2, stem: 'The cumulative frequencies of a distribution are: less than 10: 5; less than 20: 12; less than 30: 28; less than 40: 35; less than 50: 40. Find the median.', model: r`Frequencies: $5, 7, 16, 7, 5$ for $0$–$10$, …, $40$–$50$. $n = 40$, $\dfrac n2 = 20$: median class $20$–$30$ with $cf = 12$, $f = 16$.

Median $= 20 + \dfrac{20 - 12}{16} \times 10 = 20 + 5 = 25$.`, sol: 'Recover the class frequencies as differences of cumulative frequencies.', scheme: [['Median class, cf 12, f 16', 1], ['Median 25', 1]], d: 3, c: 'application', t: [3], time: 150 }), (C) => { C.assert(gS8.cf.join() === '5,12,28,35,40' && near(med(gS8), 25), '25'); C.model([16, 12, 25]); });
const gS9 = G(100, 20, [10, 15, 20, 10, 5]);
Q('s209', mk.short({ marks: 2, stem: r`The daily wages (₹, in hundreds) of 60 workers at a Tiruppur garment unit are grouped as below. Find the mean using the assumed-mean method with $a = 150$.

${mdRow(gS9, 'Wage', 'Number of workers')}`, model: r`${mdWork(gS9, 'assumed', 150)}

$\bar x = 150 + \dfrac{-300}{60} = 150 - 5 = 145$.`, sol: 'd = x − 150.', scheme: [['Σfd = −300', 1], ['Mean 145', 1]], d: 2, c: 'understanding', t: [1], time: 150 }), (C) => { C.assert(near(mean(gS9, 150), 145) && sumFd(gS9, 150) === -300, '145'); C.model([-300, 145]); });

// =============================================================== Short answer, 3 marks
const gT1 = G(0, 20, [5, 8, 10, 9, 5, 3]);
Q('s301', mk.short({ marks: 3, stem: r`The daily rainfall (mm) recorded on 40 monsoon days at Cherrapunji is given below. Find the mean daily rainfall using the step-deviation method.

${mdRow(gT1, 'Rainfall (mm)', 'Number of days')}`, model: r`Take $a = 70$, $h = 20$:

${mdWork(gT1, 'step', 70)}

$\bar x = 70 + 20 \times \dfrac{-30}{40} = 70 - 15 = 55$ mm.`, sol: r`Check by the direct method: $\sum f_ix_i = 2200$, $\dfrac{2200}{40} = 55$ ✓.`, scheme: [['u-values with a = 70, h = 20', 1], ['Σfu = −30', 1], ['Mean 55 mm', 1]], d: 3, c: 'application', t: [1], time: 270 }), (C) => { C.assert(near(mean(gT1), 55) && sumFu(gT1, 70) === -30, '55'); C.model([-30, 55]); C.sol([2200]); });
const gT2 = G(100, 50, [4, 10, 16, 20, 8, 2]);
Q('s302', mk.short({ marks: 3, stem: r`The air quality index (AQI) in a Delhi neighbourhood on 60 winter days is given below. Find the modal AQI.

${mdRow(gT2, 'AQI', 'Number of days')}`, model: r`Modal class $250$–$300$ (frequency $20$): $l = 250$, $f_1 = 20$, $f_0 = 16$, $f_2 = 8$, $h = 50$.

Mode $= 250 + \dfrac{20 - 16}{40 - 16 - 8} \times 50 = 250 + \dfrac{4}{16} \times 50 = 250 + 12.5 = 262.5$.`, sol: 'The modal class is decided by frequency, not by the class mark.', scheme: [['Modal class', 1], ['Correct substitution', 1], ['Mode 262.5', 1]], d: 3, c: 'application', t: [2], time: 240 }), (C) => { C.assert(near(mode(gT2), 262.5), '262.5'); C.model([250, 20, 16, 8, 12.5, 262.5]); });
const gT3 = G(100, 50, [4, 6, 12, 15, 9, 4]);
Q('s303', mk.short({ marks: 3, stem: r`The monthly spending (₹) on mobile data by 50 families in a Lucknow colony is given below. Find the median spending.

${mdRow(gT3, 'Spending (₹)', 'Number of families')}`, model: r`${mdWork(gT3, 'cf')}

$\dfrac n2 = 25$: median class $250$–$300$, $l = 250$, $cf = 22$, $f = 15$, $h = 50$.

Median $= 250 + \dfrac{25 - 22}{15} \times 50 = 250 + 10 = 260$, i.e. ₹$260$.`, sol: 'cf is the cumulative frequency before the median class.', scheme: [['Cumulative frequencies', 1], ['Median class values', 1], ['Median ₹260', 1]], d: 3, c: 'application', t: [3], time: 240 }), (C) => { C.assert(near(med(gT3), 260), '260'); C.model([22, 15, 260]); });
const gT4 = G(0, 20, [7, 13, 12, 8, 5]);
Q('s304', mk.short({ marks: 3, stem: r`The mean of the following distribution is $46$. Find the missing frequency $p$.

${mdRow(gT4, 'Class', 'Frequency', ['7', '$p$', '12', '8', '5'])}`, model: r`Class marks $10, 30, 50, 70, 90$.

$\sum f_ix_i = 70 + 30p + 600 + 560 + 450 = 1680 + 30p$; $\sum f_i = 32 + p$.

$\dfrac{1680 + 30p}{32 + p} = 46 \Rightarrow 1680 + 30p = 1472 + 46p \Rightarrow 16p = 208 \Rightarrow p = 13$.`, sol: r`Check: $\dfrac{1680 + 390}{45} = \dfrac{2070}{45} = 46$ ✓.`, scheme: [['Σfx and Σf in p', 1], ['Equation', 1], ['p = 13', 1]], d: 3, c: 'application', t: [1], time: 240 }), (C) => { let p = null; for (let k = 0; k <= 100; k++) if (near(mean(G(0, 20, [7, k, 12, 8, 5])), 46)) p = k; C.assert(p === 13, 'p'); C.model([1680, 1472, 208, 13]); C.sol([2070]); });
const gT5 = G(10, 10, [4, 15, 15, 10, 6]);
Q('s305', mk.short({ marks: 3, stem: r`The distribution below has $50$ observations and median $34$. Find $x$ and $y$.

${mdRow(gT5, 'Class', 'Frequency', ['4', '$x$', '15', '$y$', '6'])}`, model: r`$4 + x + 15 + y + 6 = 50 \Rightarrow x + y = 25$.

The median $34$ lies in $30$–$40$, with $cf = 4 + x$, $f = 15$:
$34 = 30 + \dfrac{25 - 4 - x}{15} \times 10 \Rightarrow \dfrac{(21 - x) \times 10}{15} = 4 \Rightarrow 21 - x = 6 \Rightarrow x = 15$.

Then $y = 25 - 15 = 10$.`, sol: r`Check: cumulative frequencies $4, 19, 34, 44, 50$; $\dfrac n2 = 25$ lies in $30$–$40$ ✓.`, scheme: [['x + y = 25', 1], ['Median equation', 1], ['x = 15, y = 10', 1]], d: 4, c: 'analysis', t: [3], time: 270 }), (C) => { const sols = []; for (let x = 0; x <= 25; x++) { const g = G(10, 10, [4, x, 15, 25 - x, 6]); if (medianIdx(g) === 2 && near(med(g), 34)) sols.push(x); } C.assert(sols.join() === '15', `x ${sols}`); C.model([25, 15, 10]); });
const gT6 = G(20, 10, [6, 14, 20, 16, 4]);
Q('s306', mk.short({ marks: 3, stem: r`Priya says that the mode of the distribution below is $45$, "because $40$–$50$ has the highest frequency and its mid-point is $45$". Is she right? Find the mode.

${mdRow(gT6, 'Class', 'Frequency')}`, model: r`She is right that $40$–$50$ is the modal class, but the mode is not simply its mid-point; it is pulled towards the larger neighbouring frequency.

$l = 40$, $f_1 = 20$, $f_0 = 14$, $f_2 = 16$, $h = 10$: Mode $= 40 + \dfrac{20 - 14}{40 - 14 - 16} \times 10 = 40 + 6 = 46$.

So the mode is $46$, not $45$.`, sol: r`The mid-point is the mode only when $f_0 = f_2$.`, scheme: [['Modal class accepted, method criticised', 1], ['Substitution', 1], ['Mode 46', 1]], d: 3, c: 'evaluation', t: [2], time: 240 }), (C) => { C.assert(near(mode(gT6), 46), '46'); C.model([46, 45]); });
const gT7 = G(0, 10, [3, 7, 12, 10, 8]);
Q('s307', mk.short({ marks: 3, stem: r`For the distribution below, find the mean and the median, and say which is larger.

${mdRow(gT7, 'Class', 'Frequency')}`, model: r`Mean: $\sum f_ix_i = 15 + 105 + 300 + 350 + 360 = 1130$, so $\bar x = \dfrac{1130}{40} = 28.25$.

Median: cumulative frequencies $3, 10, 22, 32, 40$; $\dfrac n2 = 20$; class $20$–$30$ with $cf = 10$, $f = 12$: Median $= 20 + \dfrac{10}{12} \times 10 \approx 28.33$.

The median is slightly larger.`, sol: 'Exactly, the median is 28 1/3.', scheme: [['Mean 28.25', 1], ['Median ≈ 28.33', 1], ['Comparison', 1]], d: 3, c: 'application', t: [1, 3], time: 270 }), (C) => { C.assert(near(mean(gT7), 28.25) && near(R2(med(gT7)), 28.33), 'values'); C.model([1130, 28.25, 28.33]); });

// =============================================================== Long answer, 5 marks
const gL1 = G(0, 6, [8, 12, 15, 10, 5]);
Q('l01', mk.long({ stem: r`The distances (km) travelled to work by 50 employees of an IT park in Pune are given below.

${mdRow(gL1, 'Distance (km)', 'Number of employees')}

Find the mean distance by (a) the direct method (b) the assumed-mean method (c) the step-deviation method, and comment on the results.`, model: r`(a) Direct: $\sum f_ix_i = 24 + 108 + 225 + 210 + 135 = 702$, $\bar x = \dfrac{702}{50} = 14.04$ km.

(b) Assumed mean $a = 15$:

${mdWork(gL1, 'assumed', 15)}

$\bar x = 15 + \dfrac{-48}{50} = 15 - 0.96 = 14.04$ km.

(c) Step deviation, $h = 6$: $\sum f_iu_i = -16 - 12 + 0 + 10 + 10 = -8$, so $\bar x = 15 + 6 \times \dfrac{-8}{50} = 15 - 0.96 = 14.04$ km.

All three methods give the same mean, $14.04$ km; the last two only shorten the arithmetic.`, sol: 'Class marks 3, 9, 15, 21, 27.', scheme: [['Direct method 702/50', 1], ['14.04 km', 1], ['Assumed mean Σfd = −48', 1], ['Step deviation Σfu = −8', 1], ['All equal: comment', 1]], d: 3, c: 'application', t: [1], time: 660 }), (C) => { C.assert(near(mean(gL1), 14.04) && sumFd(gL1, 15) === -48 && sumFu(gL1, 15) === -8 && sumFx(gL1) === 702, 'values'); C.model([702, 14.04, -48, 0.96, -8]); });
const gL2 = G(0, 20, [5, 15, 30, 20, 10]);
Q('l02', mk.long({ stem: r`The marks (out of 100) of 80 students of a school in Patna are given below.

${mdRow(gL2, 'Marks', 'Number of students')}

(a) Find the mean. (b) Find the median. (c) Find the mode. (d) Check that the three values approximately satisfy 3 Median = Mode + 2 Mean.`, model: r`(a) $\sum f_ix_i = 50 + 450 + 1500 + 1400 + 900 = 4300$; $\bar x = \dfrac{4300}{80} = 53.75$.

(b) Cumulative frequencies $5, 20, 50, 70, 80$; $\dfrac n2 = 40$; class $40$–$60$, $cf = 20$, $f = 30$: Median $= 40 + \dfrac{20}{30} \times 20 \approx 53.33$.

(c) Modal class $40$–$60$: Mode $= 40 + \dfrac{30 - 15}{60 - 15 - 20} \times 20 = 40 + \dfrac{15}{25} \times 20 = 52$.

(d) $3 \times 53.33 - 2 \times 53.75 \approx 160 - 107.5 = 52.5$, close to the mode $52$ ✓.`, sol: 'For a nearly symmetric distribution, mean, median and mode are close.', scheme: [['Mean 53.75', 1], ['Median ≈ 53.33', 1], ['Mode 52', 1], ['Empirical check ≈ 52.5', 1], ['Conclusion', 1]], d: 3, c: 'application', t: [1, 2, 3], time: 720 }), (C) => { C.assert(near(mean(gL2), 53.75) && near(R2(med(gL2)), 53.33) && near(mode(gL2), 52) && near(3 * med(gL2) - 2 * mean(gL2), 52.5), 'values'); C.model([4300, 53.75, 53.33, 52, 52.5]); });
const gL3 = G(300, 100, [8, 17, 20, 25, 23, 7]);
Q('l03', mk.long({ stem: r`The daily wages (₹) of $100$ workers at a construction site in Hyderabad are given below; two frequencies are missing. The median wage is ₹$620$.

${mdRow(gL3, 'Wage (₹)', 'Number of workers', ['8', '$x$', '20', '25', '$y$', '7'])}

(a) Find $x$ and $y$. (b) Find the modal wage.`, model: r`(a) $8 + x + 20 + 25 + y + 7 = 100 \Rightarrow x + y = 40$.

The median $620$ lies in $600$–$700$, with $cf = 8 + x + 20 = 28 + x$ and $f = 25$:
$620 = 600 + \dfrac{50 - 28 - x}{25} \times 100 \Rightarrow 4(22 - x) = 20 \Rightarrow x = 17$, so $y = 23$.

Check: cumulative frequencies $8, 25, 45, 70, 93, 100$; the $50$th worker is in $600$–$700$ ✓.

(b) Frequencies $8, 17, 20, 25, 23, 7$: modal class $600$–$700$, $f_1 = 25$, $f_0 = 20$, $f_2 = 23$:
Mode $= 600 + \dfrac{25 - 20}{50 - 20 - 23} \times 100 = 600 + \dfrac{5}{7} \times 100 \approx 671.43$, i.e. about ₹$671.43$.`, sol: 'Use the total first, then the median formula; then recompute the frequencies before finding the mode.', scheme: [['x + y = 40', 1], ['Median equation', 1], ['x = 17, y = 23 with check', 1], ['Modal class values', 1], ['Mode ≈ ₹671.43', 1]], d: 5, c: 'analysis', t: [2, 3], time: 720 }), (C) => { const sols = []; for (let x = 0; x <= 40; x++) { const g = G(300, 100, [8, x, 20, 25, 40 - x, 7]); if (medianIdx(g) === 3 && near(med(g), 620)) sols.push(x); } C.assert(sols.join() === '17', `x ${sols}`); C.assert(near(R2(mode(gL3)), 671.43), 'mode'); C.model([40, 17, 23, 671.43]); });
const gL4 = G(0, 20, [5, 11, 10, 7, 7]);
Q('l04', mk.long({ stem: r`In a survey of $40$ households in Bhubaneswar, the monthly milk bill (in hundreds of ₹) is grouped as below. The mean is $50$. Find $p$ and $q$, and then the median.

${mdRow(gL4, 'Bill', 'Number of households', ['5', '$p$', '10', '$q$', '7'])}`, model: r`$5 + p + 10 + q + 7 = 40 \Rightarrow p + q = 18$.

Class marks $10, 30, 50, 70, 90$: $\sum f_ix_i = 50 + 30p + 500 + 70q + 630 = 1180 + 30p + 70q = 50 \times 40 = 2000$, so $30p + 70q = 820$, i.e. $3p + 7q = 82$.

With $p = 18 - q$: $54 - 3q + 7q = 82 \Rightarrow 4q = 28 \Rightarrow q = 7$, $p = 11$.

Median: frequencies $5, 11, 10, 7, 7$, cumulative $5, 16, 26, 33, 40$; $\dfrac n2 = 20$; class $40$–$60$: Median $= 40 + \dfrac{20 - 16}{10} \times 20 = 48$.`, sol: 'Two unknowns need two equations: the total and the mean.', scheme: [['p + q = 18', 1], ['3p + 7q = 82', 1], ['p = 11, q = 7', 1], ['Median class', 1], ['Median 48', 1]], d: 4, c: 'analysis', t: [1, 3], time: 720 }), (C) => { const sols = []; for (let p = 0; p <= 18; p++) if (near(mean(G(0, 20, [5, p, 10, 18 - p, 7])), 50)) sols.push(p); C.assert(sols.join() === '11', `p ${sols}`); C.assert(near(med(gL4), 48), 'median'); C.model([18, 82, 7, 11, 48]); });
const gL5A = G(0, 20, [4, 10, 16, 12, 8]), gL5B = G(0, 20, [6, 14, 12, 10, 8]);
Q('l05', mk.long({ stem: r`Two cricket academies in Bengaluru recorded the scores of $50$ players each in a selection match.

Academy A:

${mdRow(gL5A, 'Runs', 'Players')}

Academy B:

${mdRow(gL5B, 'Runs', 'Players')}

(a) Find the median score of each academy. (b) Find the mean score of each academy. (c) A selector says "Academy A's typical player scores more". Do your results support this? Explain.`, model: r`(a) A: cumulative $4, 14, 30, \ldots$; $\dfrac n2 = 25$ in $40$–$60$: Median $= 40 + \dfrac{25 - 14}{16} \times 20 = 53.75$.
B: cumulative $6, 20, 32, \ldots$; class $40$–$60$: Median $= 40 + \dfrac{25 - 20}{12} \times 20 \approx 48.33$.

(b) A: $\sum f_ix_i = 40 + 300 + 800 + 840 + 720 = 2700$, mean $54$. B: $\sum f_ix_i = 60 + 420 + 600 + 700 + 720 = 2500$, mean $50$.

(c) Yes: A's median ($53.75$) and mean ($54$) are both higher than B's ($48.33$ and $50$), so a typical A player scores about $4$ to $5$ runs more.`, sol: 'Compare like with like: medians with medians, means with means.', scheme: [['Median A 53.75', 1], ['Median B ≈ 48.33', 1], ['Means 54 and 50', 1], ['Comparison', 1], ['Justified conclusion', 1]], d: 4, c: 'evaluation', t: [1, 3], time: 720 }), (C) => { C.assert(near(med(gL5A), 53.75) && near(R2(med(gL5B)), 48.33) && near(mean(gL5A), 54) && near(mean(gL5B), 50), 'values'); C.model([53.75, 48.33, 2700, 54, 2500, 50]); });
const gL6 = G(10, 10, [5, 12, 20, 8, 5]), gL6w = G(10, 10, [5, 21, 20, 8, 5]);
Q('l06', mk.long({ stem: r`The ages (years) of $50$ members of a yoga club in Rishikesh are given below.

${mdRow(gL6, 'Age (years)', 'Members')}

(a) Find the mean age by the step-deviation method. (b) A clerk had copied the frequency $12$ as $21$. Find the mean he would have got. (c) Explain why his mean is smaller. (d) Find the correct median.`, model: r`(a) $a = 35$, $h = 10$: $u = -2, -1, 0, 1, 2$; $\sum f_iu_i = -10 - 12 + 0 + 8 + 10 = -4$. $\bar x = 35 + 10 \times \dfrac{-4}{50} = 35 - 0.8 = 34.2$ years.

(b) With $21$: $n = 59$, $\sum f_iu_i = -10 - 21 + 0 + 8 + 10 = -13$, $\bar x = 35 + 10 \times \dfrac{-13}{59} \approx 35 - 2.20 = 32.80$ years.

(c) He put $9$ extra members in the young class $20$–$30$ (below the mean), which pulls the mean down.

(d) Cumulative $5, 17, 37, 45, 50$; $\dfrac n2 = 25$; class $30$–$40$, $cf = 17$, $f = 20$: Median $= 30 + \dfrac{8}{20} \times 10 = 34$ years.`, sol: 'Errors in frequencies change both n and the weighted sum.', scheme: [['Σfu = −4 and mean 34.2', 1], ['Wrong Σfu = −13, n = 59', 1], ['Wrong mean ≈ 32.80', 1], ['Explanation', 1], ['Median 34', 1]], d: 4, c: 'analysis', t: [1, 3], time: 720 }), (C) => { C.assert(near(mean(gL6), 34.2) && sumFu(gL6, 35) === -4 && sumFu(gL6w, 35) === -13 && near(R2(mean(gL6w)), 32.8) && near(med(gL6), 34), 'values'); C.model([-4, 34.2, 59, -13, 32.8, 34]); });

// =============================================================== Case-based
const gC1 = G(20, 20, [6, 8, 14, 10, 2]);
caseQ('c01', {
  passage: r`The Maharashtra agriculture department recorded the July rainfall (cm) in $40$ talukas:

${mdRow(gC1, 'Rainfall (cm)', 'Number of talukas')}`,
  assets: [hist(gC1, 'rainfall (cm)', 'number of talukas', 'Histogram of July rainfall in 40 talukas: bars of height 6, 8, 14, 10 and 2 over the classes 20 to 40, 40 to 60, 60 to 80, 80 to 100 and 100 to 120 centimetres; the tallest bar is 60 to 80.', 'The tallest bar marks the modal class.')], d: 3, c: 'application',
  model: r`(a) Option (c): $60$–$80$. (b) $67$ cm. (c) (i) $72$ cm. Or (ii) $28$ talukas, $70\%$.`,
  sol: r`Mean: $\sum f_ix_i = 180 + 400 + 980 + 900 + 220 = 2680$, $\dfrac{2680}{40} = 67$. Mode: $60 + \dfrac{14 - 8}{28 - 8 - 10} \times 20 = 72$. Cumulative frequency up to $60$–$80$: $28$.`,
  children: [
    child('a', mk.mcq({ stem: 'The modal class is', opts: ['20–40', '40–60', '60–80', '80–100'], key: 'c', sol: 'It has the highest frequency, 14.', d: 1, c: 'understanding', t: [2], time: 30 })),
    child('b', mk.num({ stem: 'Find the mean rainfall in cm.', value: 67, unit: 'cm', sol: r`$\sum f_ix_i = 6 \times 30 + 8 \times 50 + 14 \times 70 + 10 \times 90 + 2 \times 110 = 2680$; $\bar x = \dfrac{2680}{40} = 67$ cm.`, scheme: [['67 cm', 1]], d: 2, c: 'application', t: [1], time: 120 })),
    child('c', mk.short({ marks: 2, stem: '**(i)** Find the modal rainfall.', model: r`$l = 60$, $f_1 = 14$, $f_0 = 8$, $f_2 = 10$, $h = 20$: Mode $= 60 + \dfrac{6}{10} \times 20 = 72$ cm.`, sol: 'Mode formula.', scheme: [['Values', 1], ['72 cm', 1]], d: 2, c: 'application', t: [2], time: 120 }), [
      mk.short({ marks: 2, stem: '**(ii)** How many talukas received less than 80 cm, and what percentage is this?', model: r`$6 + 8 + 14 = 28$ talukas; $\dfrac{28}{40} \times 100 = 70\%$.`, sol: 'Cumulative frequency up to 80 cm.', scheme: [['28 talukas', 1], ['70%', 1]], d: 2, c: 'application', t: [3], time: 90 }),
    ]),
  ],
}, (C) => { C.child('a').which(['20–40', '40–60', '60–80', '80–100'], `${gC1.cls[modalIdx(gC1)][0]}–${gC1.cls[modalIdx(gC1)][1]}`); C.child('b').val(mean(gC1)); C.child('c').model([mode(gC1)]); C.child('cii').model([gC1.cf[2], 70]); });

const gC2 = G(0, 20, [8, 12, 15, 10, 5]);
caseQ('c02', {
  passage: r`The runs scored by $50$ batters in an inter-school cricket tournament in Lucknow are given below.

${mdRow(gC2, 'Runs', 'Number of batters')}`,
  d: 3, c: 'application',
  model: r`(a) Option (b): $50$. (b) $46.8$. (c) (i) about $46.67$. Or (ii) $47.5$.`,
  sol: r`Mean $= \dfrac{2340}{50} = 46.8$. Median: $\dfrac n2 = 25$, class $40$–$60$, $cf = 20$, $f = 15$: $40 + \dfrac{5}{15} \times 20 \approx 46.67$. Mode: $40 + \dfrac{3}{30 - 12 - 10} \times 20 = 47.5$.`,
  children: [
    child('a', mk.mcq({ stem: 'The class mark of the class 40–60 is', opts: ['$40$', '$50$', '$60$', '$20$'], key: 'b', sol: r`$\dfrac{40 + 60}{2} = 50$.`, d: 1, c: 'recall', t: [1], time: 30 })),
    child('b', mk.num({ stem: 'Find the mean score.', value: 46.8, unit: 'runs', sol: r`$\sum f_ix_i = 80 + 360 + 750 + 700 + 450 = 2340$; $\bar x = \dfrac{2340}{50} = 46.8$.`, scheme: [['46.8', 1]], d: 2, c: 'application', t: [1], time: 120 })),
    child('c', mk.short({ marks: 2, stem: '**(i)** Find the median score.', model: r`Cumulative $8, 20, 35, 45, 50$; median class $40$–$60$: Median $= 40 + \dfrac{25 - 20}{15} \times 20 \approx 46.67$.`, sol: 'Median formula.', scheme: [['Median class values', 1], ['≈ 46.67', 1]], d: 3, c: 'application', t: [3], time: 120 }), [
      mk.short({ marks: 2, stem: '**(ii)** Find the modal score.', model: r`Modal class $40$–$60$: $l = 40$, $f_1 = 15$, $f_0 = 12$, $f_2 = 10$: Mode $= 40 + \dfrac{3}{8} \times 20 = 47.5$.`, sol: 'Mode formula.', scheme: [['Values', 1], ['47.5', 1]], d: 3, c: 'application', t: [2], time: 120 }),
    ]),
  ],
}, (C) => { C.child('a').which([40, 50, 60, 20], gC2.x[2]); C.child('b').val(mean(gC2)); C.child('c').model([R2(med(gC2))]); C.child('cii').model([mode(gC2)]); });

const gC3 = G(50, 50, [4, 8, 12, 20, 12, 4]);
caseQ('c03', {
  passage: r`The monthly electricity use (units) of $60$ households in a Kochi housing society is shown below.

${mdRow(gC3, 'Units', 'Households')}`,
  assets: [hist(gC3, 'units used', 'households', 'Histogram of electricity units used by 60 households: bars of height 4, 8, 12, 20, 12 and 4 over classes from 50 to 350 units in steps of 50; the tallest bar is 200 to 250.', 'Electricity use in the society.')], d: 3, c: 'application',
  model: r`(a) Option (d): $200$–$250$. (b) $215$ units. (c) (i) $225$ units. Or (ii) $24$ households, $40\%$.`,
  sol: r`Cumulative $4, 12, 24, 44, 56, 60$; median class $200$–$250$: $200 + \dfrac{30 - 24}{20} \times 50 = 215$. Mode: $200 + \dfrac{8}{40 - 12 - 12} \times 50 = 225$.`,
  children: [
    child('a', mk.mcq({ stem: 'The median class is', opts: ['50–100', '100–150', '150–200', '200–250'], key: 'd', sol: r`$\dfrac n2 = 30$; cumulative frequencies $4, 12, 24, 44$: the $30$th household is in $200$–$250$.`, d: 2, c: 'understanding', t: [3], time: 60 })),
    child('b', mk.num({ stem: 'Find the median electricity use.', value: 215, unit: 'units', sol: r`$l = 200$, $cf = 24$, $f = 20$, $h = 50$: $200 + \dfrac{30 - 24}{20} \times 50 = 215$.`, scheme: [['215', 1]], d: 2, c: 'application', t: [3], time: 120 })),
    child('c', mk.short({ marks: 2, stem: '**(i)** Find the modal electricity use.', model: r`Modal class $200$–$250$: $f_1 = 20$, $f_0 = 12$, $f_2 = 12$: Mode $= 200 + \dfrac{8}{16} \times 50 = 225$ units.`, sol: 'Here f₀ = f₂, so the mode is the class mark.', scheme: [['Values', 1], ['225', 1]], d: 2, c: 'application', t: [2], time: 120 }), [
      mk.short({ marks: 2, stem: '**(ii)** How many households use less than 200 units, and what percentage is this?', model: r`$4 + 8 + 12 = 24$ households; $\dfrac{24}{60} \times 100 = 40\%$.`, sol: 'Cumulative frequency up to 200.', scheme: [['24', 1], ['40%', 1]], d: 2, c: 'application', t: [3], time: 90 }),
    ]),
  ],
}, (C) => { C.child('a').which(['50–100', '100–150', '150–200', '200–250'], `${gC3.cls[medianIdx(gC3)][0]}–${gC3.cls[medianIdx(gC3)][1]}`); C.child('b').val(med(gC3)); C.child('c').model([mode(gC3)]); C.child('cii').model([gC3.cf[2], 40]); });

const gC4 = G(0, 30, [5, 12, 18, 12, 3]);
caseQ('c04', {
  passage: r`A school in Indore surveyed the daily screen time (minutes) of $50$ Class 10 students.

${mdRow(gC4, 'Screen time (min)', 'Number of students')}`,
  d: 3, c: 'application',
  model: r`(a) Option (c): $1$. (b) $72.6$ minutes. (c) (i) $75$ minutes. Or (ii) about $73.33$ minutes.`,
  sol: r`Step deviation with $a = 75$, $h = 30$: $\sum f_iu_i = -10 - 12 + 0 + 12 + 6 = -4$, $\bar x = 75 - \dfrac{4}{50} \times 30 = 72.6$. Mode: $60 + \dfrac{6}{12} \times 30 = 75$. Median: $60 + \dfrac{25 - 17}{18} \times 30 \approx 73.33$.`,
  children: [
    child('a', mk.mcq({ stem: r`With $a = 75$ and $h = 30$, the value of $u_i$ for the class $90$–$120$ is`, opts: ['$-1$', '$0$', '$1$', '$30$'], key: 'c', sol: r`Class mark $105$: $u = \dfrac{105 - 75}{30} = 1$.`, d: 1, c: 'understanding', t: [1], time: 45 })),
    child('b', mk.num({ stem: 'Find the mean screen time in minutes.', value: 72.6, unit: 'min', sol: r`$\sum f_iu_i = -4$; $\bar x = 75 + 30 \times \dfrac{-4}{50} = 75 - 2.4 = 72.6$ minutes.`, scheme: [['72.6', 1]], d: 2, c: 'application', t: [1], time: 120 })),
    child('c', mk.short({ marks: 2, stem: '**(i)** Find the modal screen time.', model: r`Modal class $60$–$90$: $f_1 = 18$, $f_0 = 12$, $f_2 = 12$: Mode $= 60 + \dfrac{6}{12} \times 30 = 75$ minutes.`, sol: 'Mode formula.', scheme: [['Values', 1], ['75 min', 1]], d: 2, c: 'application', t: [2], time: 120 }), [
      mk.short({ marks: 2, stem: '**(ii)** Find the median screen time.', model: r`Cumulative $5, 17, 35, 47, 50$; $\dfrac n2 = 25$ in $60$–$90$: Median $= 60 + \dfrac{25 - 17}{18} \times 30 \approx 73.33$ minutes.`, sol: 'Median formula.', scheme: [['Values', 1], ['≈ 73.33 min', 1]], d: 3, c: 'application', t: [3], time: 120 }),
    ]),
  ],
}, (C) => { C.child('a').which([-1, 0, 1, 30], (gC4.x[3] - 75) / 30); C.child('b').val(R6(mean(gC4))); C.assert(sumFu(gC4, 75) === -4, 'Σfu'); C.child('c').model([mode(gC4)]); C.child('cii').model([R2(med(gC4))]); });

const gC5 = G(150, 50, [6, 9, 18, 12, 5]);
caseQ('c05', {
  passage: r`An orchard in Ratnagiri weighed $50$ Alphonso mangoes. One frequency was smudged on the record sheet:

${mdRow(gC5, 'Weight (g)', 'Number of mangoes', ['6', '9', '$p$', '12', '5'])}`,
  d: 3, c: 'application',
  model: r`(a) Option (a): $18$. (b) $280$ g. (c) (i) $276$ g. Or (ii) about $277.78$ g.`,
  sol: r`$p = 50 - 32 = 18$. Mode: $250 + \dfrac{18 - 9}{36 - 9 - 12} \times 50 = 280$. Mean: $a = 275$, $\sum f_iu_i = -12 - 9 + 0 + 12 + 10 = 1$, $\bar x = 275 + \dfrac{1}{50} \times 50 = 276$. Median: $250 + \dfrac{25 - 15}{18} \times 50 \approx 277.78$.`,
  children: [
    child('a', mk.mcq({ stem: 'The value of p is', opts: ['$18$', '$32$', '$12$', '$20$'], key: 'a', sol: r`$6 + 9 + p + 12 + 5 = 50 \Rightarrow p = 18$.`, d: 1, c: 'understanding', t: [1], time: 45 })),
    child('b', mk.num({ stem: 'Find the modal weight in grams.', value: 280, unit: 'g', sol: r`Modal class $250$–$300$: $250 + \dfrac{18 - 9}{36 - 9 - 12} \times 50 = 250 + \dfrac{9}{15} \times 50 = 280$ g.`, scheme: [['280 g', 1]], d: 2, c: 'application', t: [2], time: 120 })),
    child('c', mk.short({ marks: 2, stem: '**(i)** Find the mean weight by the step-deviation method.', model: r`$a = 275$, $h = 50$: $u = -2, -1, 0, 1, 2$; $\sum f_iu_i = -12 - 9 + 0 + 12 + 10 = 1$. $\bar x = 275 + 50 \times \dfrac{1}{50} = 276$ g.`, sol: 'Step deviation.', scheme: [['Σfu = 1', 1], ['276 g', 1]], d: 3, c: 'application', t: [1], time: 150 }), [
      mk.short({ marks: 2, stem: '**(ii)** Find the median weight.', model: r`Cumulative $6, 15, 33, 45, 50$; median class $250$–$300$: Median $= 250 + \dfrac{25 - 15}{18} \times 50 \approx 277.78$ g.`, sol: 'Median formula.', scheme: [['Values', 1], ['≈ 277.78 g', 1]], d: 3, c: 'application', t: [3], time: 120 }),
    ]),
  ],
}, (C) => { C.child('a').which([18, 32, 12, 20], 50 - (6 + 9 + 12 + 5)); C.child('b').val(mode(gC5)); C.child('c').model([sumFu(gC5, 275), mean(gC5)]); C.child('cii').model([R2(med(gC5))]); });
