// CBSE 9 Mathematics ch14 Statistics: written items (short 2 and 3 marks, long 5 marks, case-based). Every number is recomputed from the
// raw data, the frequency tables or the figures' own data (grouping, weighted means, frequency densities, class marks).
import { Q, caseQ, child, mk } from './lib.mjs';
import { r, close, rd, sum, mean, wmean, groupFreq, countEach, classMarks, widths, density } from './h.mjs';
import { DAYS, SAMOSA, SANDWICH, JUICE, CANTEEN_TOT, HW_E, HW_F, fStackCanteen, fHistHome, barGraph, stackGraph, histogram } from './figs.mjs';

const dash = (a, b) => `${a}–${b}`;

// =============================================================== short answer, 2 marks
Q('s201', mk.short({ marks: 2, stem: 'What is primary data and what is secondary data? Give one example of each.', model: r`**Primary data** are collected by the investigator herself, for her own purpose, by a survey, an interview, a measurement or an experiment. Example: a class counting the shoe sizes of its own students.\n\n**Secondary data** were collected earlier by someone else and are taken from a source such as a report. Example: the yearly rainfall figures of a city taken from a weather department report.`, sol: 'Primary: collected by oneself. Secondary: taken from a source, with an example of each.', scheme: [['Primary data defined, with an example', 1], ['Secondary data defined, with an example', 1]], d: 1, c: 'understanding', t: [1], time: 90 }), null, 'definitions with examples: marked by the scheme');
{
  const goals = [2, 1, 0, 3, 2, 2, 1, 0, 4, 2, 3, 1, 2, 0, 1, 2, 3, 2, 1, 2], f = countEach(goals, [0, 1, 2, 3, 4]);
  Q('s202', mk.short({ marks: 2, stem: r`A school football team in Bhopal scored these numbers of goals in $20$ matches: ${goals.join(', ')}. Make a frequency table with tally marks.`, model: r`Go through the list once and make a stroke for each score.\n\n| Goals | Tally | Frequency |\n|---|---|---|\n| 0 | \|\|\| | 3 |\n| 1 | \|\|\|\|/ | 5 |\n| 2 | \|\|\|\|/ \|\|\| | 8 |\n| 3 | \|\|\| | 3 |\n| 4 | \| | 1 |\n\nTotal $= 3 + 5 + 8 + 3 + 1 = 20$, the number of matches.`, sol: 'Tally each score; the frequencies add up to 20.', scheme: [['Correct frequencies 3, 5, 8, 3, 1', 1], ['Total 20 checked against the number of matches', 1]], d: 2, c: 'application', t: [1], time: 120 }), (Cx) => {
    Cx.assert(goals.length === 20 && f.join() === '3,5,8,3,1' && sum(f) === 20, 'frequencies 3, 5, 8, 3, 1');
    Cx.model([3, 5, 8, 1, 20]);
  });
}
Q('s203', mk.short({ marks: 2, stem: r`In a school in Hyderabad the term mark is made from the unit test (weight $2$), the half-yearly exam (weight $3$) and the annual exam (weight $5$). A student has $66$, $74$ and $80$ in them. Find the weighted mean.`, model: r`Weighted mean $= \dfrac{66 \times 2 + 74 \times 3 + 80 \times 5}{2 + 3 + 5} = \dfrac{132 + 222 + 400}{10}$.\n\n$= \dfrac{754}{10} = 75.4$.`, sol: 'Total of mark times weight divided by the total weight.', scheme: [['Products 132, 222 and 400', 1], ['Weighted mean 75.4', 1]], d: 2, c: 'application', t: [2], time: 90 }), (Cx) => {
  Cx.assert(66 * 2 + 74 * 3 + 80 * 5 === 754 && close(wmean([66, 74, 80], [2, 3, 5]), 75.4), '754 and 75.4');
  Cx.model([132, 222, 400, 754, 75.4]);
});
Q('s204', mk.short({ marks: 2, stem: r`A histogram is to be drawn for the minutes spent by $120$ visitors at a stall, with the classes $0$–$10$ (frequency $12$), $10$–$30$ (frequency $30$) and $30$–$70$ (frequency $40$). Find the height of each bar.`, model: r`The class widths are $10$, $20$ and $40$ (unequal), so the height is the frequency density.\n\n$\dfrac{12}{10} = 1.2$, $\dfrac{30}{20} = 1.5$ and $\dfrac{40}{40} = 1$.`, sol: 'Frequency density = frequency / class width.', scheme: [['Widths 10, 20, 40: use frequency density', 1], ['Heights 1.2, 1.5 and 1', 1]], d: 2, c: 'application', t: [3], time: 90 }), (Cx) => {
  const d = density([12, 30, 40], [0, 10, 30, 70]);
  Cx.assert(widths([0, 10, 30, 70]).join() === '10,20,40' && d.join() === '1.2,1.5,1', '1.2, 1.5, 1');
  Cx.model([10, 20, 40, 1.2, 1.5, 1]);
});
Q('s205', mk.short({ marks: 2, stem: r`A frequency polygon is to be drawn for the classes $10$–$20$, $20$–$30$ and $30$–$40$. Find the class marks of these classes and of the two empty classes that close the polygon.`, model: r`The class marks of the three classes are $\dfrac{10 + 20}{2} = 15$, $25$ and $35$.\n\nThe empty classes are $0$–$10$ and $40$–$50$, with class marks $5$ and $45$.`, sol: 'Class mark = mid-point; the empty classes are 0 to 10 and 40 to 50.', scheme: [['Class marks 15, 25 and 35', 1], ['Empty classes with class marks 5 and 45', 1]], d: 2, c: 'application', t: [3], time: 90 }), (Cx) => {
  Cx.assert(classMarks([10, 20, 30, 40]).join() === '15,25,35' && classMarks([0, 10])[0] === 5 && classMarks([40, 50])[0] === 45, '15, 25, 35, 5, 45');
  Cx.model([15, 25, 35, 5, 45]);
});
Q('s206', mk.short({ marks: 2, stem: r`The stacked bar graph shows the items sold in a school canteen from Monday to Friday. Find the total number of items sold on Tuesday and the number of juices sold that day.`, model: r`On Tuesday the three parts are $25$ samosas, $30$ sandwiches and $20$ juices, so the whole bar is $25 + 30 + 20 = 75$ items.\n\nThe juice part is $20$.`, sol: 'The whole bar is the total; the top part is the juices.', scheme: [['Total 75 items', 1], ['20 juices', 1]], d: 2, c: 'application', t: [3], time: 90, assets: [fStackCanteen] }), (Cx) => {
  Cx.assert(DAYS[1] === 'Tue' && SAMOSA[1] + SANDWICH[1] + JUICE[1] === 75 && CANTEEN_TOT[1] === 75 && JUICE[1] === 20, '75 and 20');
  Cx.model([25, 30, 20, 75]);
});
Q('s207', mk.short({ marks: 2, stem: 'Why must the heights of the bars be frequency densities, and not frequencies, in a histogram with unequal class widths?', model: r`If the heights were the frequencies, a wide class would have a tall-looking bar and would seem more important than it is. For example, a class of width $40$ with frequency $8$ would be drawn about as high as a class of width $10$ with frequency $8$, but it is spread over four times the range.\n\nWith height $=$ frequency $\div$ class width, the area of every bar $=$ the frequency, so the picture is fair.`, sol: 'Area of a bar must stand for the frequency.', scheme: [['Frequencies as heights would exaggerate wide classes', 1], ['Height = frequency / width makes the area equal to the frequency', 1]], d: 3, c: 'analysis', t: [3], time: 120 }), null, 'explanation: marked by the scheme');
Q('s208', mk.short({ marks: 2, stem: 'Write two differences between a bar graph and a histogram.', model: r`1. A bar graph shows separate categories, and a histogram shows grouped numbers (classes).\n\n2. The bars of a bar graph have gaps between them and can be put in any order; the bars of a histogram touch, because the classes follow each other, and they stay in the order of the classes.`, sol: 'Categories versus classes; gaps versus no gaps.', scheme: [['Categories and classes of numbers', 1], ['Gaps, and the order of the bars', 1]], d: 1, c: 'understanding', t: [3], time: 90 }), null, 'two differences: marked by the scheme');

// =============================================================== short answer, 3 marks
{
  const kg = [50, 30, 20], price = [36, 40, 45], cost = kg.map((k, i) => k * price[i]);
  Q('s301', mk.short({ marks: 3, stem: r`A canteen contractor in Ranchi buys $50$ kg of wheat flour at $\text{Rs } 36$ per kg, $30$ kg at $\text{Rs } 40$ per kg and $20$ kg at $\text{Rs } 45$ per kg. Find the average price per kg. Why is it less than the simple mean of the three prices?`, model: r`Costs: $50 \times 36 = 1800$, $30 \times 40 = 1200$, $20 \times 45 = 900$. Total cost $= 3900$ rupees for $100$ kg.\n\nAverage price $= \dfrac{3900}{100} = \text{Rs } 39$ per kg.\n\nThe simple mean of the prices is $\dfrac{36 + 40 + 45}{3} \approx 40.33$. It is larger because it counts the dearest flour as much as the cheapest, but the contractor bought the most of the cheapest flour.`, sol: 'Quantities are the weights; compare with the simple mean.', scheme: [['Costs 1800, 1200 and 900', 1], ['Average price 39 rupees per kg', 1], ['Reason: the largest quantity has the lowest price', 1]], d: 3, c: 'analysis', t: [2], time: 150 }), (Cx) => {
    Cx.assert(cost.join() === '1800,1200,900' && sum(cost) === 3900 && wmean(price, kg) === 39 && close(mean(price), 40.3333333333, 1e-6), '3900, 39, 40.33');
    Cx.model([1800, 1200, 900, 3900, 39, 40.33]);
  });
}
{
  const times = [13, 15, 18, 16, 14, 17, 19, 15, 20, 13, 16, 17, 15, 18, 14, 16, 19, 17, 15, 16], e = [12, 14, 16, 18, 20, 22], f = groupFreq(times, e);
  Q('s302', mk.short({ marks: 3, stem: r`The times, in seconds, taken by $20$ students of a school in Imphal to run $100$ m are: ${times.join(', ')}. Make a grouped frequency table with the classes $12$–$14$, $14$–$16$, $16$–$18$, $18$–$20$ and $20$–$22$, and name the class with the highest frequency.`, model: r`The lower limit belongs to the class, so $14$ goes into $14$–$16$, $16$ into $16$–$18$ and so on.\n\n| Time (s) | 12–14 | 14–16 | 16–18 | 18–20 | 20–22 |\n|---|---|---|---|---|---|\n| Frequency | 2 | 6 | 7 | 4 | 1 |\n\nTotal $= 2 + 6 + 7 + 4 + 1 = 20$. The class with the highest frequency is $16$–$18$.`, sol: 'Group the values, check the total, name the largest class.', scheme: [['Frequencies 2, 6, 7, 4, 1', 1.5], ['Total 20 checked', 0.5], ['Class 16 to 18 has the highest frequency', 1]], d: 2, c: 'application', t: [1], time: 150 }), (Cx) => {
    Cx.assert(times.length === 20 && f.join() === '2,6,7,4,1' && sum(f) === 20 && f.indexOf(Math.max(...f)) === 2, '2, 6, 7, 4, 1');
    Cx.model([2, 6, 7, 4, 1, 20]);
  });
}
{
  const e = [0, 5, 10, 20, 40], f = [10, 25, 30, 20], d = density(f, e);
  Q('s303', mk.short({ marks: 3, stem: r`The waiting times of $85$ passengers at a bus stand in Raipur are grouped in the classes $0$–$5$, $5$–$10$, $10$–$20$ and $20$–$40$ minutes with frequencies $10$, $25$, $30$ and $20$. Find the height of each bar of the histogram, and say why the frequencies cannot be used as heights.`, model: r`The class widths are $5$, $5$, $10$ and $20$, which are unequal.\n\nHeights (frequency densities): $\dfrac{10}{5} = 2$, $\dfrac{25}{5} = 5$, $\dfrac{30}{10} = 3$ and $\dfrac{20}{20} = 1$.\n\nThe area of a bar must show the frequency, so the height must be the frequency divided by the width.`, sol: 'Densities 2, 5, 3, 1 because the widths are unequal.', scheme: [['Widths 5, 5, 10, 20 are unequal', 0.5], ['Heights 2, 5, 3 and 1', 1.5], ['Area of a bar must show the frequency', 1]], d: 3, c: 'application', t: [3], time: 150 }), (Cx) => {
    Cx.assert(sum(f) === 85 && widths(e).join() === '5,5,10,20' && d.join() === '2,5,3,1', 'densities 2, 5, 3, 1');
    Cx.model([5, 10, 20, 2, 5, 3, 1]);
  });
}
{
  const clubs = ['Art', 'Music', 'Sports', 'Drama'], boys = [12, 10, 30, 8], girls = [18, 15, 10, 12], tot = clubs.map((_, i) => boys[i] + girls[i]);
  const fig = stackGraph(clubs, [{ name: 'boys', vals: boys, style: 'shade' }, { name: 'girls', vals: girls, style: 'accent' }], { yMax: 50, yStep: 10, xTitle: 'club', yTitle: 'members' }, 'Stacked bar graph of the members of four clubs of a school in Guwahati, boys at the bottom and girls above. Art has 12 boys and 18 girls, Music 10 boys and 15 girls, Sports 30 boys and 10 girls, and Drama 8 boys and 12 girls.', 'Club members: boys (shaded, bottom) and girls (coloured, top); the number above a bar is the total.');
  Q('s304', mk.short({ marks: 3, stem: r`The stacked bar graph shows the members of four clubs of a school in Guwahati, with the boys at the bottom of each bar and the girls above them. Find the total number of members of each club, name the club with the most girls, and find the fraction of the Sports club that is boys.`, model: r`Totals: Art $12 + 18 = 30$, Music $10 + 15 = 25$, Sports $30 + 10 = 40$, Drama $8 + 12 = 20$.\n\nThe club with the most girls is Art ($18$ girls).\n\nIn the Sports club $30$ of the $40$ members are boys, which is $\dfrac{30}{40} = \dfrac{3}{4}$.`, sol: 'Add the two parts of each bar.', scheme: [['Totals 30, 25, 40 and 20', 1], ['Art has the most girls', 0.5], ['Fraction 3/4 for the boys in Sports', 1.5]], d: 3, c: 'application', t: [3], time: 150, assets: [fig] }), (Cx) => {
    Cx.assert(tot.join() === '30,25,40,20' && girls.indexOf(Math.max(...girls)) === 0 && close(boys[2] / tot[2], 0.75), '30, 25, 40, 20; Art; 3/4');
    Cx.model([30, 25, 40, 20, 18, 3, 4]);
  });
}
Q('s305', mk.short({ marks: 3, stem: r`The histogram shows the minutes of homework of $40$ students. Find the number of students who worked for less than $30$ minutes, the number who worked for $45$ minutes or more, and the percentage of the class that worked for $45$ minutes or more.`, model: r`Less than $30$ minutes: the first two bars, $2 + 6 = 8$ students.\n\n$45$ minutes or more: the last three bars, $12 + 7 + 2 = 21$ students.\n\nPercentage $= \dfrac{21}{40} \times 100 = 52.5\%$.`, sol: 'Add the bars; divide by 40.', scheme: [['8 students', 1], ['21 students', 1], ['52.5 percent', 1]], d: 2, c: 'application', t: [3], time: 150, assets: [fHistHome] }), (Cx) => {
  Cx.assert(sum(HW_F) === 40 && HW_F[0] + HW_F[1] === 8 && sum(HW_F.slice(3)) === 21 && close((sum(HW_F.slice(3)) / 40) * 100, 52.5), '8, 21, 52.5');
  Cx.model([8, 21, 40, 52.5]);
});

// =============================================================== long answer, 5 marks
{
  const w = [10, 20, 30, 40], A = [90, 70, 80, 60], B = [60, 75, 70, 80], wa = wmean(A, w), ma = mean(A), wb = wmean(B, w), need = (80 * 100 - (60 * 10 + 75 * 20 + 70 * 30)) / 40;
  Q('l01', mk.long({ stem: r`In a school in Pune the final score is made from homework (weight $10$), class tests (weight $20$), project (weight $30$) and the final exam (weight $40$). Aman has $90$, $70$, $80$ and $60$ in them. Bela has $60$, $75$, $70$ and $80$. (a) Find Aman's weighted score. (b) Find the simple mean of Aman's four marks. (c) Find Bela's weighted score. (d) Who ranks higher by the weighted score? (e) What mark in the final exam would give Bela a weighted score of exactly $80$, with her other marks the same?`, model: r`**(a)** $\dfrac{90 \times 10 + 70 \times 20 + 80 \times 30 + 60 \times 40}{100} = \dfrac{900 + 1400 + 2400 + 2400}{100} = \dfrac{7100}{100} = 71$.\n\n**(b)** Simple mean $= \dfrac{90 + 70 + 80 + 60}{4} = 75$.\n\n**(c)** $\dfrac{60 \times 10 + 75 \times 20 + 70 \times 30 + 80 \times 40}{100} = \dfrac{600 + 1500 + 2100 + 3200}{100} = \dfrac{7400}{100} = 74$.\n\n**(d)** Bela ($74 > 71$), although Aman has the higher simple mean ($75$ against $71.25$): the final exam has the largest weight.\n\n**(e)** Bela needs $80 \times 100 = 8000$ in total. Her other marks give $600 + 1500 + 2100 = 4200$, so $40x = 3800$ and $x = 95$.`, sol: 'Weighted means with the weights as percentages; then the unknown mark.', scheme: [['(a) Aman 71', 1], ['(b) simple mean 75', 1], ['(c) Bela 74', 1], ['(d) Bela ranks higher', 1], ['(e) a final exam mark of 95', 1]], d: 3, c: 'analysis', t: [2], time: 450 }), (Cx) => {
    Cx.assert(wa === 71 && ma === 75 && wb === 74 && wb > wa && close(mean(B), 71.25) && need === 95, '71, 75, 74, Bela, 95');
    Cx.assert(wmean([60, 75, 70, need], w) === 80, 'a final exam mark of 95 gives exactly 80');
    Cx.model([7100, 71, 75, 7400, 74, 71.25, 4200, 3800, 95]);
  });
}
{
  const kg = [20, 30, 50], price = [250, 300, 360], cost = kg.map((k, i) => k * price[i]), tot = sum(cost), avg = tot / sum(kg), sp = avg * 1.15;
  Q('l02', mk.long({ stem: r`A trader in Jaipur mixes three varieties of tea: $20$ kg at $\text{Rs } 250$ per kg, $30$ kg at $\text{Rs } 300$ per kg and $50$ kg at $\text{Rs } 360$ per kg. (a) Find the total cost of the three varieties. (b) Find the total quantity. (c) Find the average cost of the mixture per kg. (d) Find the simple mean of the three prices. (e) At what price per kg must the mixture be sold to make a profit of $15\%$ on the average cost?`, model: r`**(a)** $20 \times 250 + 30 \times 300 + 50 \times 360 = 5000 + 9000 + 18000 = \text{Rs } 32000$.\n\n**(b)** $20 + 30 + 50 = 100$ kg.\n\n**(c)** Average cost $= \dfrac{32000}{100} = \text{Rs } 320$ per kg (a weighted mean, with the quantities as weights).\n\n**(d)** Simple mean $= \dfrac{250 + 300 + 360}{3} \approx 303.33$, which is lower because it ignores that the dearest tea has the largest quantity.\n\n**(e)** Selling price $= 320 \times 1.15 = \text{Rs } 368$ per kg.`, sol: 'Total cost, total quantity, weighted mean, simple mean, profit of 15 percent.', scheme: [['(a) total cost 32000 rupees', 1], ['(b) 100 kg', 1], ['(c) 320 rupees per kg', 1], ['(d) simple mean about 303.33', 1], ['(e) 368 rupees per kg', 1]], d: 3, c: 'application', t: [2], time: 450 }), (Cx) => {
    Cx.assert(cost.join() === '5000,9000,18000' && tot === 32000 && sum(kg) === 100 && avg === 320 && close(mean(price), 303.3333333333, 1e-6) && close(sp, 368), '32000, 100, 320, 303.33, 368');
    Cx.model([5000, 9000, 18000, 32000, 100, 320, 303.33, 368]);
  });
}
{
  const e = [300, 350, 400, 450, 500, 550], f = [5, 11, 14, 7, 3], marks = classMarks(e);
  Q('l03', mk.long({ stem: r`The daily wages of $40$ workers at a building site in Nagpur are grouped in the classes $300$–$350$, $350$–$400$, $400$–$450$, $450$–$500$ and $500$–$550$ rupees, with frequencies $5$, $11$, $14$, $7$ and $3$. (a) Find the class width. (b) Find the class mark of the third class. (c) How many workers earn $\text{Rs } 400$ or more? (d) Give the heights of the bars of the histogram and name the class with the tallest bar. (e) Find the class marks of the two empty classes needed to close a frequency polygon.`, model: r`**(a)** The class width is $350 - 300 = 50$ rupees (all classes are equal).\n\n**(b)** The class mark of $400$–$450$ is $\dfrac{400 + 450}{2} = 425$.\n\n**(c)** $14 + 7 + 3 = 24$ workers.\n\n**(d)** The widths are equal, so the heights are the frequencies $5$, $11$, $14$, $7$, $3$. The tallest bar is for $400$–$450$.\n\n**(e)** The empty classes are $250$–$300$ and $550$–$600$, with class marks $275$ and $575$.`, sol: 'Class width, class mark, counting bars, equal widths, and the empty classes.', scheme: [['(a) 50 rupees', 1], ['(b) 425', 1], ['(c) 24 workers', 1], ['(d) heights 5, 11, 14, 7, 3; the class 400 to 450', 1], ['(e) 275 and 575', 1]], d: 3, c: 'application', t: [1, 3], time: 420 }), (Cx) => {
    Cx.assert(sum(f) === 40 && widths(e).every((w) => w === 50) && marks[2] === 425 && sum(f.slice(2)) === 24 && f.indexOf(Math.max(...f)) === 2 && classMarks([250, 300])[0] === 275 && classMarks([550, 600])[0] === 575, '50, 425, 24, 400-450, 275, 575');
    Cx.model([50, 425, 24, 275, 575]);
  });
}
{
  const e = [0, 10, 20, 40, 60, 100], f = [8, 12, 30, 20, 10], w = widths(e), d = density(f, e);
  Q('l04', mk.long({ stem: r`The ages of $80$ people at a fair in Haridwar are grouped in the classes $0$–$10$, $10$–$20$, $20$–$40$, $40$–$60$ and $60$–$100$ years with frequencies $8$, $12$, $30$, $20$ and $10$. (a) Find the class widths. (b) Find the frequency density of each class. (c) Which class has the tallest bar in the histogram? (d) Find the area of the bar for $20$–$40$. (e) Show that the total area of all the bars equals the number of people.`, model: r`**(a)** The widths are $10$, $10$, $20$, $20$ and $40$ years (unequal).\n\n**(b)** Frequency density $=$ frequency $\div$ width: $\dfrac{8}{10} = 0.8$, $\dfrac{12}{10} = 1.2$, $\dfrac{30}{20} = 1.5$, $\dfrac{20}{20} = 1$ and $\dfrac{10}{40} = 0.25$.\n\n**(c)** The tallest bar (density $1.5$) is for $20$–$40$.\n\n**(d)** Area $= 1.5 \times 20 = 30$, which is the frequency of the class.\n\n**(e)** The areas are $8$, $12$, $30$, $20$ and $10$, and $8 + 12 + 30 + 20 + 10 = 80$, the number of people.`, sol: 'Densities with unequal widths; area of a bar is the frequency.', scheme: [['(a) widths 10, 10, 20, 20, 40', 1], ['(b) densities 0.8, 1.2, 1.5, 1, 0.25', 1], ['(c) the class 20 to 40', 1], ['(d) area 30', 1], ['(e) total area 80', 1]], d: 4, c: 'analysis', t: [3], time: 480 }), (Cx) => {
    Cx.assert(sum(f) === 80 && w.join() === '10,10,20,20,40' && d.join() === '0.8,1.2,1.5,1,0.25' && d.indexOf(Math.max(...d)) === 2 && close(d[2] * w[2], 30) && close(sum(d.map((v, i) => v * w[i])), 80), 'densities, tallest bar, area 30, total area 80');
    Cx.model([0.8, 1.2, 1.5, 0.25, 30, 80]);
  });
}
{
  const terms = ['T1', 'T2', 'T3', 'T4'], A = [20, 25, 30, 36], B = [30, 28, 25, 20], C = [15, 12, 10, 4], tot = terms.map((_, i) => A[i] + B[i] + C[i]);
  const fig = stackGraph(terms, [{ name: 'A', vals: A, style: 'shade' }, { name: 'B', vals: B, style: 'accent' }, { name: 'C', vals: C, style: 'outline' }], { yMax: 70, yStep: 10, xTitle: 'term', yTitle: 'students' }, 'Stacked bar graph of the grades of students in four terms of a school in Nagpur, from the bottom grade A, grade B and grade C. Term 1: 20, 30 and 15; term 2: 25, 28 and 12; term 3: 30, 25 and 10; term 4: 36, 20 and 4.', 'Grades in four terms: A (shaded, bottom), B (coloured), C (outlined, top); the number above a bar is the total.');
  Q('l05', mk.long({ stem: r`The stacked bar graph shows the number of students with grade A (bottom), grade B and grade C in each of four terms in a school in Nagpur. (a) Find the total number of students in term $3$. (b) Find the total number of grade A students over the four terms. (c) What percentage of the students in term $4$ had grade A? (d) By how many did the number of grade C students fall from term $1$ to term $4$? (e) Which grade rose in number in every term?`, model: r`**(a)** Term $3$: $30 + 25 + 10 = 65$ students.\n\n**(b)** $20 + 25 + 30 + 36 = 111$ students.\n\n**(c)** In term $4$ the total is $36 + 20 + 4 = 60$, so $\dfrac{36}{60} \times 100 = 60\%$.\n\n**(d)** Grade C fell from $15$ to $4$, which is $15 - 4 = 11$ students.\n\n**(e)** Grade A: $20$, $25$, $30$, $36$ rose every term.`, sol: 'Read the parts and the totals of the bars.', scheme: [['(a) 65 students', 1], ['(b) 111 students', 1], ['(c) 60 percent', 1], ['(d) 11 fewer students', 1], ['(e) grade A', 1]], d: 3, c: 'analysis', t: [3], time: 420, assets: [fig] }), (Cx) => {
    Cx.assert(tot.join() === '65,65,65,60' && sum(A) === 111 && close((A[3] / tot[3]) * 100, 60) && C[0] - C[3] === 11 && A.every((v, i) => i === 0 || v > A[i - 1]) && !B.every((v, i) => i === 0 || v > B[i - 1]) && !C.every((v, i) => i === 0 || v > C[i - 1]), '65, 111, 60, 11, grade A');
    Cx.model([65, 111, 60, 11]);
  });
}

// =============================================================== case-based
{
  const w = [50, 30, 20], rise = [6, 4, 10], wm = wmean(rise, w), sm = mean(rise), wm2 = wmean([6, 4, 12], w);
  caseQ('c01', {
    passage: r`A family in Bhopal compares the prices of last year and this year for the three main parts of its monthly budget. Food is $50\%$ of the budget and its price rose by $6\%$. Housing is $30\%$ of the budget and rose by $4\%$. Transport is $20\%$ of the budget and rose by $10\%$.`,
    d: 2, c: 'application',
    model: r`(a) Option (a). (b) $6.2$. (c) (i) $\text{about } 6.67\%$. Or (ii) $6.6\%$.`,
    sol: r`(a) The items have different shares of the budget, so the shares are weights and we need a weighted mean. (b) $\dfrac{50 \times 6 + 30 \times 4 + 20 \times 10}{100} = \dfrac{300 + 120 + 200}{100} = 6.2\%$. (c) (i) The simple mean is $\dfrac{6 + 4 + 10}{3} \approx 6.67\%$; it is larger than $6.2\%$ because it gives the small transport share the same importance as food. (ii) $\dfrac{300 + 120 + 20 \times 12}{100} = \dfrac{660}{100} = 6.6\%$.`,
    children: [
      child('a', mk.mcq({ stem: 'Which average should the family use for the overall rise in its budget?', opts: ['A weighted mean, with the shares as weights', 'A simple mean of the three rises', 'The largest of the three rises', 'The smallest of the three rises'], key: 'a', sol: 'The three items have different shares in the budget, so a rise in food matters more than a rise in transport. The shares are the weights of a weighted mean.', d: 1, c: 'understanding', t: [2], time: 60 })),
      child('b', mk.num({ stem: r`Find the overall rise in the family's budget, in per cent.`, value: 6.2, sol: r`Overall rise $= \dfrac{50 \times 6 + 30 \times 4 + 20 \times 10}{100} = \dfrac{300 + 120 + 200}{100} = \dfrac{620}{100} = 6.2\%$.`, scheme: [['Products 300, 120 and 200', 0.5], ['6.2 per cent', 0.5]], d: 2, c: 'application', t: [2], time: 90 })),
      child('c', mk.short({ marks: 2, stem: r`**(i)** Find the simple mean of the three rises and say why it differs from the overall rise.`, model: r`Simple mean $= \dfrac{6 + 4 + 10}{3} \approx 6.67\%$. It is larger than $6.2\%$ because it gives transport (only $20\%$ of the budget, with the largest rise) the same importance as food ($50\%$).`, sol: 'Simple mean 6.67; the shares differ.', scheme: [['Simple mean 6.67 per cent', 1], ['Reason: transport has a small share but the largest rise', 1]], d: 3, c: 'analysis', t: [2], time: 105 }), [
        mk.short({ marks: 2, stem: r`**(ii)** Next year the price of transport rises by $12\%$ and the other rises stay the same. Find the new overall rise.`, model: r`New overall rise $= \dfrac{50 \times 6 + 30 \times 4 + 20 \times 12}{100} = \dfrac{300 + 120 + 240}{100} = \dfrac{660}{100} = 6.6\%$.`, sol: 'Weighted mean with the new rise for transport.', scheme: [['Products 300, 120 and 240', 1], ['6.6 per cent', 1]], d: 2, c: 'application', t: [2], time: 90 }),
      ]),
    ],
  }, (Cx) => {
    Cx.child('a').which(['weighted', 'simple', 'largest', 'smallest'], 'weighted');
    Cx.child('b').val(rd(wm, 9));
    Cx.child('c').assert(close(sm, 6.6666666667, 1e-6) && sm > wm, 'simple mean 6.67 is above 6.2');
    Cx.child('c').model([6.67]);
    Cx.child('cii').assert(close(wm2, 6.6), '6.6');
    Cx.child('cii').model([660, 6.6]);
  });
}
{
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], v = [24, 18, 30, 12, 27, 39];
  const fig = barGraph(days, v, { yMax: 40, yStep: 10, xTitle: 'day', yTitle: 'books' }, 'Bar graph of the books issued by a library in Madurai in a week: Monday 24, Tuesday 18, Wednesday 30, Thursday 12, Friday 27 and Saturday 39.', 'Books issued by a library from Monday to Saturday.');
  caseQ('c02', {
    passage: r`The bar graph shows the number of books issued by a library in Madurai on each day of a week from Monday to Saturday.`,
    d: 2, c: 'application', assets: [fig],
    model: r`(a) Option (a). (b) $150$. (c) (i) $26\%$. Or (ii) $81$.`,
    sol: r`(a) The tallest bar is Saturday, with $39$ books. (b) $24 + 18 + 30 + 12 + 27 + 39 = 150$. (c) (i) $\dfrac{39}{150} \times 100 = 26\%$. (ii) Monday, Wednesday and Friday: $24 + 30 + 27 = 81$.`,
    children: [
      child('a', mk.mcq({ stem: 'On which day were the most books issued?', opts: ['Saturday', 'Wednesday', 'Friday', 'Monday'], key: 'a', sol: 'The tallest bar is the bar for Saturday, which shows $39$ books, more than any other day.', d: 1, c: 'understanding', t: [3], time: 45 })),
      child('b', mk.num({ stem: 'How many books were issued in the whole week?', value: 150, sol: r`Total $= 24 + 18 + 30 + 12 + 27 + 39 = 150$ books.`, scheme: [['Reading all six bars', 0.5], ['Total 150', 0.5]], d: 2, c: 'application', t: [3], time: 75 })),
      child('c', mk.short({ marks: 2, stem: r`**(i)** What percentage of the week's books was issued on Saturday?`, model: r`Percentage $= \dfrac{39}{150} \times 100 = 26\%$.`, sol: 'Saturday divided by the total.', scheme: [['39 out of 150', 1], ['26 per cent', 1]], d: 2, c: 'application', t: [3], time: 90 }), [
        mk.short({ marks: 2, stem: r`**(ii)** How many books were issued on Monday, Wednesday and Friday together?`, model: r`$24 + 30 + 27 = 81$ books.`, sol: 'Add the three bars.', scheme: [['Reading 24, 30 and 27', 1], ['Total 81', 1]], d: 2, c: 'application', t: [3], time: 90 }),
      ]),
    ],
  }, (Cx) => {
    Cx.child('a').which(['Sat', 'Wed', 'Fri', 'Mon'], days[v.indexOf(Math.max(...v))]);
    Cx.child('b').val(sum(v));
    Cx.child('c').assert(sum(v) === 150 && close((v[5] / sum(v)) * 100, 26), '26 percent');
    Cx.child('c').model([39, 150, 26]);
    Cx.child('cii').assert(v[0] + v[2] + v[4] === 81, '81');
    Cx.child('cii').model([24, 30, 27, 81]);
  });
}
{
  const e = [140, 145, 150, 155, 160, 165], f = [3, 8, 14, 10, 5], n = sum(f);
  const fig = histogram(e, f, { yMax: 16, yStep: 4, xTitle: 'cm', yTitle: 'students' }, 'Histogram of the heights of 40 students of a school in Shillong in classes of width 5 centimetres: 140 to 145 has 3 students, 145 to 150 has 8, 150 to 155 has 14, 155 to 160 has 10 and 160 to 165 has 5.', 'Heights of 40 students in classes of width $5$ cm.');
  caseQ('c03', {
    passage: r`The histogram shows the heights, in cm, of $40$ students of a school in Shillong, grouped in classes of width $5$ cm.`,
    d: 3, c: 'application', assets: [fig],
    model: r`(a) Option (a). (b) $15$. (c) (i) $27.5\%$. Or (ii) $152.5$.`,
    sol: r`(a) The tallest bar is for $150$–$155$ (height $14$). (b) The bars from $155$ onwards: $10 + 5 = 15$. (c) (i) Shorter than $150$ cm: $3 + 8 = 11$ students, and $\dfrac{11}{40} \times 100 = 27.5\%$. (ii) The class mark of $150$–$155$ is $\dfrac{150 + 155}{2} = 152.5$.`,
    children: [
      child('a', mk.mcq({ stem: 'Which class has the most students?', opts: [r`$150$–$155$`, r`$145$–$150$`, r`$155$–$160$`, r`$140$–$145$`], key: 'a', sol: r`The tallest bar, of height $14$, is for the class $150$–$155$.`, d: 1, c: 'understanding', t: [3], time: 45 })),
      child('b', mk.num({ stem: r`How many students are $155$ cm or taller?`, value: 15, sol: r`The bars from $155$ onwards have heights $10$ and $5$, so $10 + 5 = 15$ students.`, scheme: [['Bars 10 and 5', 0.5], ['15 students', 0.5]], d: 2, c: 'application', t: [3], time: 75 })),
      child('c', mk.short({ marks: 2, stem: r`**(i)** What percentage of the students are shorter than $150$ cm?`, model: r`Shorter than $150$ cm: $3 + 8 = 11$ students. Percentage $= \dfrac{11}{40} \times 100 = 27.5\%$.`, sol: 'Add the first two bars; divide by 40.', scheme: [['11 students', 1], ['27.5 per cent', 1]], d: 2, c: 'application', t: [3], time: 90 }), [
        mk.short({ marks: 2, stem: r`**(ii)** Find the class mark of the class with the tallest bar.`, model: r`The tallest bar is for $150$–$155$, with class mark $\dfrac{150 + 155}{2} = 152.5$ cm.`, sol: 'Mid-point of the tallest class.', scheme: [['The class 150 to 155', 1], ['Class mark 152.5', 1]], d: 2, c: 'application', t: [1, 3], time: 90 }),
      ]),
    ],
  }, (Cx) => {
    const tallest = f.indexOf(Math.max(...f));
    Cx.child('a').which([2, 1, 3, 0].map((i) => i === tallest), true);
    Cx.child('b').val(sum(f.slice(3)));
    Cx.child('c').assert(n === 40 && close(((f[0] + f[1]) / n) * 100, 27.5), '27.5 percent');
    Cx.child('c').model([11, 27.5]);
    Cx.child('cii').assert(classMarks(e)[2] === 152.5, '152.5');
    Cx.child('cii').model([152.5]);
  });
}
{
  const e = [0, 10, 20, 40, 60], f = [30, 36, 36, 18], d = density(f, e);
  const fig = histogram(e, d, { yMax: 4, yStep: 1, xTitle: 'minutes', yTitle: 'per minute', inner: (h, i) => `f = ${f[i]}` }, 'Histogram of the time spent by 120 visitors at a stall of a fair, with unequal class widths. The heights are the frequency densities 3 for 0 to 10, 3.6 for 10 to 20, 1.8 for 20 to 40 and 0.9 for 40 to 60 minutes. The areas of the bars are the frequencies 30, 36, 36 and 18.', 'Unequal class widths: the height is the frequency density, so the area is the frequency.');
  caseQ('c04', {
    passage: r`A fair in Pushkar keeps a record of the minutes spent by $120$ visitors at a craft stall. The times are grouped in the classes $0$–$10$, $10$–$20$, $20$–$40$ and $40$–$60$ minutes, with frequencies $30$, $36$, $36$ and $18$. The histogram is drawn with the frequency density as the height.`,
    d: 3, c: 'analysis', assets: [fig],
    model: r`(a) Option (a). (b) $1.8$. (c) (i) $18$. Or (ii) $54$.`,
    sol: r`(a) The class widths are $10$, $10$, $20$ and $20$, which are unequal. (b) $\dfrac{36}{20} = 1.8$. (c) (i) The area of the bar for $40$–$60$ is $0.9 \times 20 = 18$, the frequency of the class. (ii) The classes from $20$ minutes: $36 + 18 = 54$ visitors.`,
    children: [
      child('a', mk.mcq({ stem: 'The heights of the bars are frequency densities, and not frequencies, because', opts: ['the class widths are not all equal', 'the frequencies are too large', 'the classes overlap', 'the histogram has gaps'], key: 'a', sol: 'The classes have widths $10$, $10$, $20$ and $20$. With unequal widths the area of a bar, and not its height, must show the frequency, so the height is the frequency divided by the class width.', d: 2, c: 'understanding', t: [3], time: 75 })),
      child('b', mk.num({ stem: r`Find the frequency density of the class $20$–$40$.`, value: 1.8, sol: r`Frequency density $= \dfrac{36}{40 - 20} = \dfrac{36}{20} = 1.8$ per minute.`, scheme: [['Class width 20', 0.5], ['36 / 20 = 1.8', 0.5]], d: 2, c: 'application', t: [3], time: 75 })),
      child('c', mk.short({ marks: 2, stem: r`**(i)** Find the area of the bar for the class $40$–$60$ and say what it shows.`, model: r`The height is $\dfrac{18}{20} = 0.9$ and the width is $20$, so the area is $0.9 \times 20 = 18$. It equals the frequency of the class.`, sol: 'Area of a bar = height times width = frequency.', scheme: [['Area 0.9 x 20 = 18', 1], ['It is the frequency of the class', 1]], d: 3, c: 'analysis', t: [3], time: 105 }), [
        mk.short({ marks: 2, stem: r`**(ii)** How many visitors spent $20$ minutes or more at the stall?`, model: r`The classes $20$–$40$ and $40$–$60$ have frequencies $36$ and $18$, so $36 + 18 = 54$ visitors.`, sol: 'Add the frequencies of the last two classes.', scheme: [['Frequencies 36 and 18', 1], ['54 visitors', 1]], d: 2, c: 'application', t: [3], time: 90 }),
      ]),
    ],
  }, (Cx) => {
    Cx.child('a').which(['unequal', 'large', 'overlap', 'gaps'], widths(e).every((w) => w === widths(e)[0]) ? 'equal' : 'unequal');
    Cx.child('b').val(d[2]);
    Cx.child('c').assert(sum(f) === 120 && d.join() === '3,3.6,1.8,0.9' && close(d[3] * widths(e)[3], 18), 'area 18');
    Cx.child('c').model([0.9, 20, 18]);
    Cx.child('cii').assert(f[2] + f[3] === 54, '54');
    Cx.child('cii').model([36, 18, 54]);
  });
}
void HW_E; void CANTEEN_TOT; void countEach; void dash;
