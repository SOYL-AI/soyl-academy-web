// Build CBSE 9 Mathematics ch12 Area and Perimeter. Run from platform/:
//   npx tsx content/_stage/maths/cbse-9-mathematics-ch12/src/build.mjs
// Every figure is drawn from computed coordinates (figs.mjs); every number in a table or worked example is computed with the stated
// value of pi, Heron's formula or Brahmagupta's formula and asserted (also against the shoelace area where a figure exists).
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, topic, deck, sl, table, flow, build, chapterTests } from './lib.mjs';
import { r, must, close, rd, heron, brahma, arcLen, sectorArea, circleArea, circumference, PI7, PI314 } from './h.mjs';
import { fCirc, fEgypt, fArc, fWindow, fHeron, fMedian, fPoly, fSeg, fCircSq, fRing, fBrahma, fRectCirc, fPlot, WIN } from './figs.mjs';

setUnit('cbse-9-mathematics-ch12', 'claude-sonnet-5-5 (writer); reviewed by claude-opus-5-5 (subject-producer)');
await import('./questions.mjs');
await import('./questions2.mjs');
await import('./questions3.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const f = (v, k = 4) => String(rd(v, k));

// ================================================================ tables, deck 1
must(close(circumference(7, PI7), 44) && close(2 * (12 + 8), 40) && close(4 * 9, 36) && close(9 + 10 + 17, 36), 'perimeters');
const tPerim = table(['Shape', 'Perimeter', 'Example'], [
  ['Rectangle $l \\times w$', '$2(l + w)$', '$12 \\times 8$: $40$ cm'],
  ['Square of side $a$', '$4a$', '$a = 9$: $36$ cm'],
  ['Triangle with sides $a$, $b$, $c$', '$a + b + c$', '$9, 10, 17$: $36$ cm'],
  ['Circle of radius $r$', r`$2\pi r = \pi d$`, r`$d = 14$, $\pi = \dfrac{22}{7}$: $44$ cm`],
], 'Table of perimeters: a rectangle 2 times length plus width, a square 4 times the side, a triangle the sum of its sides, and a circle 2 pi r, which is pi times the diameter. Examples give 40, 36, 36 and 44 centimetres.', 'The distance round a circle is called its circumference. State the value of $\\pi$ you use.');
must(rd(256 / 81, 4) === 3.1605 && rd(223 / 71, 4) === 3.1408 && rd(22 / 7, 4) === 3.1429 && rd(62832 / 20000, 4) === 3.1416 && rd(355 / 113, 5) === 3.14159 && (100 + 4) * 8 + 62000 === 62832, 'pi table values');
const tPi = table(['Who and when', 'What they did', 'Value of $\\pi$'], [
  ['Ancient Egypt (Rhind Papyrus, about 1650 BCE)', 'Area of a circle taken as the area of a square of side $\\frac{8}{9}$ of the diameter', `$(16/9)^2 = 256/81 \\approx ${f(256 / 81)}$`],
  ['Archimedes (Greece, about 250 BCE)', 'Trapped $\\pi$ between the perimeters of polygons of $96$ sides', `$223/71 < \\pi < 22/7$, that is $${f(223 / 71)} < \\pi < ${f(22 / 7)}$`],
  ['Aryabhata (India, 499 CE)', 'Gave $62832$ as the approximate circumference of a circle of diameter $20000$', `$62832/20000 = ${f(62832 / 20000)}$`],
  ['A fraction often credited to Zu Chongzhi (China, 5th century CE)', 'A very accurate fraction', `$355/113 \\approx ${f(355 / 113, 5)}$`],
  ['A school value', 'Easy to use; it is also the upper bound of Archimedes', `$22/7 \\approx ${f(22 / 7)}$`],
], 'Table of approximations of pi: ancient Egypt about 3.1605, Archimedes between 3.1408 and 3.1429, Aryabhata 3.1416, a fraction 355 over 113 often credited to Zu Chongzhi about 3.14159, and the school value 22 over 7 about 3.1429.', 'Approximations of $\\pi$ through history. Later, an infinite series found in Kerala gave many more decimal places.');
const tArch = table(['Number', 'Value', 'Compared with $\\pi = 3.14159265\\ldots$'], [
  [r`$\dfrac{223}{71}$`, `$${f(223 / 71, 5)}$`, 'Lower bound: below $\\pi$'],
  [r`$\pi$`, '$3.14159$', 'The number itself'],
  [r`$\dfrac{22}{7}$`, `$${f(22 / 7, 5)}$`, 'Upper bound: above $\\pi$'],
  [r`$22/7 - 223/71$`, r`$\dfrac{1}{497} \approx 0.00201$`, 'The gap between the bounds'],
], 'Table: 223 over 71 is 3.14085, below pi; 22 over 7 is 3.14286, above pi; the gap between the two bounds is 1 over 497, about 0.002.', 'Archimedes trapped $\\pi$ in a very narrow gap.');
must(223 / 71 < Math.PI && Math.PI < 22 / 7 && close(22 / 7 - 223 / 71, 1 / 497) && 22 * 71 - 223 * 7 === 1, 'archimedes numbers');
must(close(circumference(4.5, PI314), 28.26) && close(arcLen(9, 100, PI314), 15.7) && close(circumference(9, PI314), 56.52) && close(circumference(35, PI7), 220), 'WE1 numbers');
const tWE1 = table(['Case', 'Working', 'Result'], [
  [r`Wheel, diameter $70$ cm, $\pi = \dfrac{22}{7}$`, r`$\pi d = \dfrac{22}{7} \times 70$`, r`$220$ cm; in $100$ turns $220$ m`],
  [r`Circle, radius $9$ cm, $\pi = 3.14$`, r`$2\pi r = 2 \times 3.14 \times 9$`, r`$56.52$ cm`],
  [r`Arc of $100^\circ$ in that circle`, r`$\dfrac{100}{360} \times 56.52$`, r`$15.7$ cm`],
], 'Table: a wheel of diameter 70 centimetres has circumference 220 centimetres using 22 over 7. A circle of radius 9 centimetres has circumference 56.52 using 3.14. An arc of 100 degrees on it is 100 over 360 of that, which is 15.7 centimetres.', 'The arc is the fraction $\\theta/360$ of the circumference.');
must(close(WIN.arc, 88) && close(2 * 80 + 56, 216) && close(216 + 88, 304), 'window perimeter');
const tWE2 = table(['Part of the frame', 'Working', 'Length'], [
  ['Two sides', r`$80 + 80$`, r`$160$ cm`],
  ['Bottom', r`$56$`, r`$56$ cm`],
  ['Semicircular arc', r`$\dfrac{1}{2} \times 2 \times \dfrac{22}{7} \times 28$`, r`$88$ cm`],
  ['Total frame', r`$160 + 56 + 88$`, r`$304$ cm`],
], 'Table: the frame of the window has two sides of 80 centimetres, a bottom of 56 centimetres and a semicircular arc of 88 centimetres, using 22 over 7. The total is 304 centimetres. The top diameter is not part of the frame.', 'Perimeter of a composite figure: add only the outside edges.');
must(25 + 29 + 36 === 90 && heron(25, 29, 36) === 360 && 45 * 20 * 16 * 9 === 129600 && 360 * 360 === 129600 && 0.5 * 36 * 20 === 360, 'Heron 25 29 36');
const tHeron1 = table(['Step', 'Working', 'Result'], [
  ['Semi-perimeter', r`$s = \dfrac{25 + 29 + 36}{2}$`, r`$45$`],
  ['The three differences', r`$s - a,\ s - b,\ s - c$ with $a = 25$, $b = 29$, $c = 36$`, r`$20,\ 16,\ 9$`],
  ['Product under the root', r`$45 \times 20 \times 16 \times 9$`, r`$129600$`],
  ['Area', r`$\sqrt{129600}$`, r`$360$ cm$^2$`],
  ['Check', r`$\dfrac{1}{2} \times 36 \times 20$`, r`$360$ cm$^2$`],
], 'Table: for the triangle with sides 25, 29 and 36 centimetres, s is 45 and the differences are 20, 16 and 9. The product 45 times 20 times 16 times 9 is 129600 and its square root is 360 square centimetres, the same as half of 36 times the height 20.', "Heron's formula: area $= \\sqrt{s(s - a)(s - b)(s - c)}$.");
must(45 * 36 * 5 * 4 === 32400 && heron(9, 40, 41) === 180 && 0.5 * 9 * 40 === 180, 'Heron 9 40 41');
const tHeron2 = table(['Step', 'Working', 'Result'], [
  ['Semi-perimeter', r`$s = \dfrac{9 + 40 + 41}{2}$`, r`$45$ m`],
  ['Differences', r`$45 - 9,\ 45 - 40,\ 45 - 41$`, r`$36,\ 5,\ 4$`],
  ['Area', r`$\sqrt{45 \times 36 \times 5 \times 4} = \sqrt{32400}$`, r`$180$ m$^2$`],
  ['Right angle at the corner of $9$ and $40$', r`$\dfrac{1}{2} \times 9 \times 40$`, r`$180$ m$^2$`],
], "Table: a plot with sides 9, 40 and 41 metres has s equal to 45, differences 36, 5 and 4, and area the square root of 32400, which is 180 square metres. The sides satisfy 81 plus 1600 equals 1681, so the angle is a right angle and half of 9 times 40 is also 180.", "Heron's formula agrees with $\\frac{1}{2} \\times \\text{base} \\times \\text{height}$.");
const tMedian = table(['Step', 'Statement', 'Reason'], [
  ['1', r`$BD = DC$`, '$D$ is the mid-point of $BC$'],
  ['2', r`The height $h$ from $A$ to $BC$ is the same for $\triangle ABD$ and $\triangle ADC$`, 'Both triangles have their base on the line $BC$'],
  ['3', r`$\text{area}(ABD) = \dfrac{1}{2} \times BD \times h$ and $\text{area}(ADC) = \dfrac{1}{2} \times DC \times h$`, 'Area of a triangle'],
  ['4', r`$\text{area}(ABD) = \text{area}(ADC)$`, 'Steps 1 and 3'],
  ['Check', r`$\dfrac{1}{2} \times 7 \times 12 = 42$ each, and $42 + 42 = 84$`, 'The figure: $BC = 14$, $h = 12$'],
], 'Table: a median AD splits triangle ABC. BD equals DC and the height from A is the same for both triangles, so half base times height gives equal areas. In the figure each is 42 square centimetres and the whole is 84.', 'A median bisects the area of a triangle.');
must(0.5 * 7 * 12 === 42 && 0.5 * 14 * 12 === 84, 'median numbers');
const goalFlow1 = flow('LR', [['a', 'Perimeter and circumference'], ['b', 'Approximations of pi'], ['c', 'Arc length'], ['d', "Heron's formula"], ['e', 'A median halves the area']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']], "Flow of Part 1: perimeter and circumference, approximations of pi through history, arc length, Heron's formula and the fact that a median bisects the area of a triangle.", 'Part 1 road map.');
const sum1 = flow('LR', [['a', 'C = 2 pi r'], ['b', 'Arc = (theta / 360) x 2 pi r'], ['c', "Heron: sqrt of s(s-a)(s-b)(s-c)"], ['d', 'Median: equal areas']], [['a', 'b'], ['b', 'c'], ['c', 'd']], "Summary flow of Part 1: circumference 2 pi r, arc length theta over 360 times 2 pi r, Heron's formula for the area of a triangle, and a median halves the area.", 'Four tools of Part 1.');

// ================================================================ deck 1
const d1 = deck({
  part: 1,
  title: 'Area and Perimeter: Part 1, circumference, pi, arcs, Heron and medians',
  goals: ['Find perimeters, circumferences and arc lengths, stating the value of pi used', 'Describe how people approximated pi in Egypt, Greece, India and China', "Use Heron's formula for the area of a triangle", 'Explain why a median bisects the area of a triangle'],
  slides: [
    sl('title', 'The way round a circle', { b: r`The distance round a circle is its **circumference**. For every circle it is **$\pi$ times the diameter**: $C = \pi d = 2\pi r$.`, v: fCirc, n: `How far is it once round a bicycle wheel, a coin or a well? That distance is the circumference. If you divide the circumference by the diameter, you always get the same number, whatever the size of the circle. That number is called pi, and in this chapter we meet its long history, and use it to measure curves and areas.` }),
    sl('concept', 'What you will be able to do', { ul: ['Find **perimeters** and **circumferences**', 'Describe **approximations of pi** from history', 'Find the **length of an arc**', "Use **Heron's formula**", 'Explain why a **median bisects the area**'], v: goalFlow1, n: `In this part we find perimeters and circumferences, and we look at how people in Egypt, Greece, India and China approximated pi. Then we find lengths of arcs. After that we learn Heron's formula, which gives the area of a triangle from its three sides, and we see why a median cuts a triangle into two equal areas.` }),
    sl('concept', 'Perimeter and circumference', { b: r`Always say which value of $\pi$ you use: $\dfrac{22}{7}$ or $3.14$. Both are only **approximations**.`, v: tPerim, n: `The perimeter of a shape is the distance all the way round it. For a rectangle it is twice the length plus the width. For a square it is four times the side. For a triangle, add the three sides. For a circle it is called the circumference, and it is two pi r. Always say which value of pi you are using.` }),
    sl('diagram', 'Ancient Egypt: a square for a circle', { b: r`The Egyptians took the area of a circle of diameter $9$ to be the area of a square of side $8$. Then $64 = \pi \times \left(\dfrac{9}{2}\right)^2$ gives $\pi \approx \dfrac{256}{81} = \left(\dfrac{16}{9}\right)^2 \approx 3.16$.`, v: fEgypt, n: `Here is a rule written on an Egyptian papyrus about three and a half thousand years ago. Take a circle of diameter nine. Its area is nearly the same as the area of a square of side eight, which is sixty-four. Working backwards, this rule treats pi as two hundred fifty-six divided by eighty-one, which is about three point one six.` }),
    sl('concept', 'Approximations of pi through history', { b: r`The value of $\pi$ is $3.14159265\ldots$ No fraction equals it exactly. Later still, an **infinite series found in Kerala** gave many more decimal places.`, v: tPi, n: `This table shows some approximations. The Egyptians had about three point one six. Archimedes in Greece trapped pi between two fractions. Aryabhata in India gave sixty-two thousand eight hundred thirty-two over twenty thousand, which is three point one four one six. A very accurate fraction, three hundred fifty-five over one hundred thirteen, is often credited to Zu Chongzhi of China.` }),
    sl('diagram', 'Archimedes: trapping pi', { b: r`Archimedes drew polygons with $96$ sides inside and outside a circle. Their perimeters gave $\dfrac{223}{71} < \pi < \dfrac{22}{7}$. The gap between the bounds is only $\dfrac{1}{497}$.`, v: fPoly, n: `Archimedes drew regular polygons inside a circle and outside it. The more sides the polygon has, the closer it hugs the circle. With polygons of ninety-six sides he showed that pi is bigger than two hundred twenty-three over seventy-one, and smaller than twenty-two over seven. Those two bounds are only about two thousandths apart.` }),
    sl('check', 'Quick check: Aryabhata', { b: 'Aryabhata gave sixty-two thousand eight hundred thirty-two over twenty thousand for pi. As a decimal, what is it?', v: tPi, chk: 'm01', n: `Divide the top number by the bottom number.` }),
    sl('diagram', 'Arc length', { b: r`An arc of a sector of angle $\theta$ is the fraction $\dfrac{\theta}{360}$ of the circumference: $\ell = \dfrac{\theta}{360} \times 2\pi r$. Here $r = 9$ cm and $\theta = 100^\circ$. The **perimeter of the sector** is $\ell + 2r$.`, v: fArc, n: `A sector is cut off by two radii. Its curved edge is an arc. If the angle at the centre is theta degrees, the arc is theta over three hundred sixty of the whole circumference. In the figure the radius is nine centimetres and the angle is one hundred degrees. The perimeter of the sector is the arc plus the two radii.` }),
    sl('example', 'Worked example 1: circumference and arc', { b: r`Find the distance rolled in $100$ turns by a wheel of diameter $70$ cm, and the arc of $100^\circ$ in a circle of radius $9$ cm.`, ul: [r`**Wheel, $\pi = \dfrac{22}{7}$ —** $C = \dfrac{22}{7} \times 70 = 220$ cm, so $100$ turns cover $22000$ cm $= 220$ m`, r`**Circle, $\pi = 3.14$ —** $C = 2 \times 3.14 \times 9 = 56.52$ cm`, r`**Arc —** $\dfrac{100}{360} \times 56.52 = 15.7$ cm`], v: tWE1, n: `For the wheel, the circumference is twenty-two sevenths times seventy, which is two hundred twenty centimetres. In one hundred turns it covers twenty-two thousand centimetres, or two hundred twenty metres. For the circle of radius nine, using three point one four, the circumference is fifty-six point five two, and the arc of one hundred degrees is fifteen point seven centimetres.` }),
    sl('diagram', 'Perimeter of a composite figure', { b: r`A window is a rectangle with a **semicircle** on top. Its frame is the two sides, the bottom and the curved arc. The dashed diameter is **not** part of the frame.`, v: fWindow, n: `Here is a window made of a rectangle with a semicircle on the top. To find the length of the frame, add only the outside edges: the two sides, the bottom, and the curved part. The straight line across the top is inside the window, so it is not part of the frame. The curved part is half a circumference.` }),
    sl('example', 'Worked example 2: the window frame', { b: r`A window is $56$ cm wide and $80$ cm high at the sides, with a semicircle of radius $28$ cm on top. Find the length of the frame. Use $\pi = \dfrac{22}{7}$.`, ul: [r`**Sides and bottom —** $80 + 80 + 56 = 216$ cm`, r`**Arc —** $\dfrac{22}{7} \times 28 = 88$ cm`, r`**Frame —** $216 + 88 = 304$ cm`], v: tWE2, n: `The two sides and the bottom add up to two hundred sixteen centimetres. The semicircle is half a circle, so its length is pi times the radius, twenty-two sevenths times twenty-eight, which is eighty-eight centimetres. The whole frame is two hundred sixteen plus eighty-eight, which is three hundred four centimetres.` }),
    sl('check', 'Quick check: the clock hand', { b: 'The tip of a minute hand is seventeen and a half centimetres from the centre. How far does it travel in twelve minutes?', v: fArc, chk: 'm02', n: `Twelve minutes is a fraction of a full turn of the minute hand.` }),
    sl('diagram', "Heron's formula", { b: r`A triangle with sides $a$, $b$, $c$ has area $\sqrt{s(s - a)(s - b)(s - c)}$, where $s = \dfrac{a + b + c}{2}$. It needs **no height**. Heron of Alexandria described it in the first century CE.`, v: fHeron, n: `Heron's formula gives the area of a triangle when you know only its three sides. First find s, half the perimeter. Then multiply s by s minus a, s minus b and s minus c, and take the square root. You do not need the height. The method is named after Heron of Alexandria, who described it in the first century.` }),
    sl('concept', "Using Heron's formula", { b: r`For the triangle $25$, $29$, $36$ cm the formula agrees with $\dfrac{1}{2} \times \text{base} \times \text{height}$, where the height on the side $36$ is $20$.`, v: tHeron1, n: `Take a triangle with sides twenty-five, twenty-nine and thirty-six. Half the perimeter is forty-five. The three differences are twenty, sixteen and nine. The product is one hundred twenty-nine thousand six hundred, and its square root is three hundred sixty. The same triangle has a base of thirty-six and a height of twenty, and half of that product is also three hundred sixty.` }),
    sl('example', 'Worked example 3: a plot with a right angle', { b: r`A plot has sides $9$ m, $40$ m and $41$ m. Find its area by Heron's formula and check it.`, ul: [r`**Semi-perimeter —** $s = 45$`, r`**Differences —** $36$, $5$, $4$`, r`**Area —** $\sqrt{45 \times 36 \times 5 \times 4} = \sqrt{32400} = 180$ m$^2$`, r`**Check —** $9^2 + 40^2 = 41^2$, so the angle is a right angle and the area is $\dfrac{1}{2} \times 9 \times 40 = 180$`], v: tHeron2, n: `The semi-perimeter is forty-five. The differences are thirty-six, five and four. The product under the root is thirty-two thousand four hundred, and the root is one hundred eighty. As a check, nine squared plus forty squared is forty-one squared, so the triangle has a right angle, and half of nine times forty is also one hundred eighty square metres.` }),
    sl('diagram', 'A median bisects the area', { b: r`$D$ is the mid-point of $BC$. The median $AD$ cuts the triangle into $ABD$ and $ADC$ with **equal bases** $BD = DC$ and the **same height**, so their areas are **equal**.`, v: fMedian, n: `A median joins a corner to the mid-point of the opposite side. Look at the two triangles it makes. Their bases are equal, seven centimetres each. Both have the same height from the corner A, twelve centimetres. Since the area is half base times height, the two triangles have equal areas, forty-two square centimetres each.` }),
    sl('concept', 'Why a median bisects the area', { b: 'The proof uses only equal bases and a common height.', v: tMedian, n: `The proof has four steps. D is the mid-point, so the two bases are equal. The height from A to the line B C is the same for both triangles. Write each area as half base times height. Since the bases are equal and the height is common, the areas are equal. In the figure, forty-two and forty-two make eighty-four.` }),
    sl('check', "Quick check: Heron's formula", { b: 'A triangular plot has sides nine, ten and seventeen metres. What is its area?', v: fHeron, chk: 'm03', n: `Find s first, then the three differences.` }),
    sl('summary', 'Summary', { ul: [r`Circumference $C = 2\pi r = \pi d$; always state the value of $\pi$ used`, r`Arc length $\ell = \dfrac{\theta}{360} \times 2\pi r$; perimeter of a sector $= \ell + 2r$`, r`Ancient values of $\pi$: Egypt $\dfrac{256}{81}$, Archimedes $\dfrac{223}{71} < \pi < \dfrac{22}{7}$, Aryabhata $\dfrac{62832}{20000}$`, r`Heron: area $= \sqrt{s(s - a)(s - b)(s - c)}$`, 'A **median** bisects the area of a triangle: equal bases, same height'], v: sum1, n: `To sum up. The circumference is two pi r, and you must say which value of pi you use. An arc is a fraction of the circumference. People in Egypt, Greece and India each found approximations of pi. Heron's formula gives the area of a triangle from its sides. And a median splits a triangle into two triangles of equal area.` }),
    sl('exam-tips', 'Exam tips: how marks are awarded', { ul: ['**Circle numericals (2–3 marks):** write the formula, the value of $\\pi$, then the working and the unit', "**Heron (2–3 marks):** find $s$, the three differences, the product, then the root", '**Mistake:** forgetting the two radii in the perimeter of a sector', '**Mistake:** using $s$ as the perimeter instead of half the perimeter'], n: `In circle problems, write the formula, say which value of pi you use, then show the working and give the unit. In Heron problems, find s, then the three differences, then the product and the root. Two common slips are forgetting the two radii in the perimeter of a sector, and using the whole perimeter in place of half of it.` }),
  ],
});

// ================================================================ tables, deck 2
const poly = (n) => 0.5 * n * Math.sin((2 * Math.PI) / n);
const tCircleArea = table(['Polygon inside a circle of radius $r$', 'Area $\\div\\, r^2$'], [[`${6} sides`, `$${f(poly(6), 3)}$`], [`${12} sides`, `$${f(poly(12), 3)}$`], [`${24} sides`, `$${f(poly(24), 3)}$`], [`${96} sides`, `$${f(poly(96), 3)}$`], ['The circle', `$\\pi \\approx ${f(Math.PI, 3)}$`]], 'Table: the area of a regular polygon inside a circle divided by the square of the radius is about 2.598 for 6 sides, 3 for 12 sides, 3.106 for 24 sides and 3.139 for 96 sides. For the circle it is pi, about 3.142.', 'More sides, better fit: the area of a circle is $\\pi r^2$.');
must(rd(poly(6), 3) === 2.598 && poly(12) > 2.9999 && rd(poly(24), 3) === 3.106 && rd(poly(96), 3) === 3.139, 'polygon areas');
const secR = 9, secT = 100;
must(close(circumference(secR, PI314), 56.52) && close(circleArea(secR, PI314), 254.34) && close(arcLen(secR, secT, PI314), 15.7) && close(sectorArea(secR, secT, PI314), 70.65) && close(arcLen(secR, secT, PI314) + 2 * secR, 33.7), 'sector table');
const tSector = table(['Quantity', 'Formula', r`$r = 9$ cm, $\theta = 100^\circ$, $\pi = 3.14$`], [
  ['Circumference', r`$2\pi r$`, r`$56.52$ cm`],
  ['Area of the circle', r`$\pi r^2$`, r`$254.34$ cm$^2$`],
  ['Arc length', r`$\dfrac{\theta}{360} \times 2\pi r$`, r`$15.7$ cm`],
  ['Area of the sector', r`$\dfrac{\theta}{360} \times \pi r^2$`, r`$70.65$ cm$^2$`],
  ['Perimeter of the sector', r`$\ell + 2r$`, r`$33.7$ cm`],
], 'Table of formulas with the values for a radius of 9 centimetres and angle 100 degrees: circumference 56.52, circle area 254.34, arc 15.7, sector area 70.65 and sector perimeter 33.7.', 'Sector formulas: the fraction $\\theta/360$ of the circle.');
const tSecWE = table(['Step', 'Working', 'Result'], [
  ['Fraction of the circle', r`$\dfrac{100}{360}$`, r`$\dfrac{5}{18}$`],
  ['Arc', r`$\dfrac{5}{18} \times 56.52$`, r`$15.7$ cm`],
  ['Area', r`$\dfrac{5}{18} \times 254.34$`, r`$70.65$ cm$^2$`],
  ['Perimeter', r`$15.7 + 9 + 9$`, r`$33.7$ cm`],
], 'Table: a sector of angle 100 degrees is 5 over 18 of the circle. Its arc is 15.7 centimetres, its area is 70.65 square centimetres and its perimeter is 33.7 centimetres, with pi equal to 3.14.', 'A sector is the fraction $\\theta/360$ of the whole circle.');
must(close((100 / 360) * 56.52, 15.7) && close(15.7 + 18, 33.7), 'sector WE');
must(close(circleArea(14, PI7), 616) && close(0.25 * circleArea(14, PI7), 154) && 0.5 * 14 * 14 === 98 && 154 - 98 === 56, 'segment');
const tSegWE = table(['Step', 'Working', 'Result'], [
  ['Sector $OAB$', r`$\dfrac{90}{360} \times \dfrac{22}{7} \times 14^2$`, r`$154$ cm$^2$`],
  ['Triangle $OAB$', r`$\dfrac{1}{2} \times 14 \times 14$`, r`$98$ cm$^2$`],
  ['Segment', r`$154 - 98$`, r`$56$ cm$^2$`],
], 'Table: for a radius of 14 centimetres and a right angle at the centre, the sector has area 154, the triangle has area 98, and the segment between the chord and the arc has area 56 square centimetres.', 'Area of a segment = area of the sector minus area of the triangle.');
must(close(28 * 28 - circleArea(14, PI7), 168), 'corners');
const tCornerWE = table(['Step', 'Working', 'Result'], [
  ['Square tile', r`$28 \times 28$`, r`$784$ cm$^2$`],
  ['Circle of radius $14$ cm', r`$\dfrac{22}{7} \times 14^2$`, r`$616$ cm$^2$`],
  ['Four corners', r`$784 - 616$`, r`$168$ cm$^2$`],
], 'Table: a square tile of side 28 centimetres has area 784. The largest circle inside has radius 14 and area 616 using 22 over 7. The four corner pieces together have area 168 square centimetres.', 'Composite area: subtract the circle from the square.');
must(close(circleArea(17.5, PI7), 962.5) && close(circleArea(17.5, PI7) - circleArea(14, PI7), 346.5) && close(PI7 * 3.5 * 31.5, 346.5), 'ring');
const tRingWE = table(['Step', 'Working', 'Result'], [
  ['Outer radius', r`$14 + 3.5$`, r`$17.5$ m`],
  ['Pond', r`$\dfrac{22}{7} \times 14^2$`, r`$616$ m$^2$`],
  ['Pond and path', r`$\dfrac{22}{7} \times 17.5^2$`, r`$962.5$ m$^2$`],
  ['Path', r`$962.5 - 616$`, r`$346.5$ m$^2$`],
  ['Check', r`$\dfrac{22}{7} \times 3.5 \times 31.5$`, r`$346.5$ m$^2$`],
], 'Table: a path 3.5 metres wide round a pond of radius 14 metres. The pond has area 616, the pond with the path has area 962.5, so the path has area 346.5 square metres, which also equals 22 over 7 times 3.5 times 31.5.', 'Area of a ring $= \\pi (R^2 - r^2) = \\pi (R - r)(R + r)$.');
must(26 * 9 * 13 * 18 === 54756 && close(brahma(7, 24, 20, 15), 234) && 234 * 234 === 54756 && 0.5 * 7 * 24 + 0.5 * 15 * 20 === 234, 'Brahmagupta 234');
const tBrahma = table(['Step', 'Working', 'Result'], [
  ['Semi-perimeter', r`$s = \dfrac{7 + 24 + 20 + 15}{2}$`, r`$33$`],
  ['The four differences', r`$s - a,\ s - b,\ s - c,\ s - d$`, r`$26,\ 9,\ 13,\ 18$`],
  ['Product under the root', r`$26 \times 9 \times 13 \times 18$`, r`$54756$`],
  ['Area', r`$\sqrt{54756}$`, r`$234$ cm$^2$`],
  ['Check (two right triangles)', r`$\dfrac{1}{2} \times 7 \times 24 + \dfrac{1}{2} \times 15 \times 20$`, r`$84 + 150 = 234$ cm$^2$`],
], 'Table: for the cyclic quadrilateral with sides 7, 24, 20 and 15 centimetres, s is 33 and the differences are 26, 9, 13 and 18. The product is 54756 and its square root is 234. Splitting along the diameter into two right triangles gives 84 plus 150, which is also 234.', "Brahmagupta's formula checked against a computed cyclic quadrilateral.");
must(close(brahma(8, 6, 8, 6), 48) && 6 * 8 * 6 * 8 === 2304 && 48 * 48 === 2304, 'rectangle 48');
must(close(brahma(17, 25, 26, 0), 204) && close(heron(17, 25, 26), 204) && 34 * 17 * 9 * 8 === 41616 && 17 * 9 * 8 * 34 === 41616, 'd = 0');
const tHeronCase = table(['', "Heron's formula", "Brahmagupta's formula with $d = 0$"], [
  ['Sides', r`$17,\ 25,\ 26$`, r`$17,\ 25,\ 26,\ 0$`],
  ['Semi-perimeter', r`$s = \dfrac{68}{2} = 34$`, r`$s = \dfrac{17 + 25 + 26 + 0}{2} = 34$`],
  ['Factors', r`$s,\ s - a,\ s - b,\ s - c = 34,\ 17,\ 9,\ 8$`, r`$s - a,\ s - b,\ s - c,\ s - d = 17,\ 9,\ 8,\ 34$`],
  ['Area', r`$\sqrt{41616} = 204$`, r`$\sqrt{41616} = 204$`],
], "Table: with d equal to 0, Brahmagupta's formula uses the factors 17, 9, 8 and 34 for the sides 17, 25 and 26, which are the same four numbers as in Heron's formula, so both give the square root of 41616, which is 204.", "Heron's formula is the special case $d = 0$ of Brahmagupta's formula.");
must(88 === (25 + 39 + 60 + 52) / 2 && 63 * 49 * 28 * 36 === 3111696 && 1764 * 1764 === 3111696 && close(brahma(25, 39, 60, 52), 1764), 'plot 1764');
const tPlot = table(['Step', 'Working', 'Result'], [
  ['Semi-perimeter', r`$s = \dfrac{25 + 39 + 60 + 52}{2}$`, r`$88$ m`],
  ['Differences', r`$88 - 25,\ 88 - 39,\ 88 - 60,\ 88 - 52$`, r`$63,\ 49,\ 28,\ 36$`],
  ['Product', r`$63 \times 49 \times 28 \times 36$`, r`$3111696$`],
  ['Area', r`$\sqrt{3111696}$`, r`$1764$ m$^2$`],
], 'Table: a cyclic plot with sides 25, 39, 60 and 52 metres has s equal to 88, differences 63, 49, 28 and 36, product 3111696 and area 1764 square metres.', 'A cyclic plot of land.');
const goalFlow2 = flow('LR', [['a', 'Area of a circle'], ['b', 'Sectors and segments'], ['c', 'Composite figures and rings'], ['d', "Brahmagupta's formula"]], [['a', 'b'], ['b', 'c'], ['c', 'd']], "Flow of Part 2: the area of a circle, sectors and segments, composite figures and rings, and Brahmagupta's formula for a cyclic quadrilateral with Heron's formula as a special case.", 'Part 2 road map.');
const sum2 = flow('LR', [['a', 'Area = pi r squared'], ['b', 'Sector = (theta / 360) x pi r squared'], ['c', 'Ring = pi (R squared - r squared)'], ['d', 'Cyclic quadrilateral: Brahmagupta']], [['a', 'b'], ['b', 'c'], ['c', 'd']], "Summary flow of Part 2: area of a circle pi r squared, sector area, ring area, and Brahmagupta's formula for a cyclic quadrilateral.", 'Four tools of Part 2.');

// ================================================================ deck 2
const d2 = deck({
  part: 2,
  title: "Area and Perimeter: Part 2, circles, sectors, composite figures and Brahmagupta's formula",
  goals: ['Find the area of a circle, a sector, a segment and a ring', 'Find areas of simple composite figures', "State and use Brahmagupta's formula for a cyclic quadrilateral", "Show that Heron's formula is the special case d equal to 0"],
  slides: [
    sl('title', 'Tiles, tanks and plots', { b: r`A circular design on a square tile, a pond with a path, a plot of land: all need **areas**. The area of a circle of radius $r$ is $\pi r^2$.`, v: fCircSq, n: `Think of a round design on a square floor tile, a pond with a path round it, or a plot of land with four sides. To buy paint, tiles or seeds, we need to know areas. In this part we find the area of a circle, parts of a circle, and combined shapes, and then a fine formula for four-sided plots.` }),
    sl('concept', 'What you will be able to do', { ul: ['Find the **area of a circle** and of a **sector**', 'Find the area of a **segment** and of a **ring**', 'Find areas of **composite figures**', "Use **Brahmagupta's formula**"], v: goalFlow2, n: `First we find areas of circles, sectors and segments. Then we combine shapes, such as a circle inside a square, and a path around a pond, which is called a ring. Finally we learn a formula found by the Indian mathematician Brahmagupta for the area of a four-sided figure whose corners lie on a circle.` }),
    sl('diagram', 'Area of a circle', { b: r`Cut a circle into many thin pieces, or fit a polygon with more and more sides inside it. The area of a circle of radius $r$ is $\pi r^2$.`, v: fPoly, n: `A regular polygon drawn inside a circle fills most of the circle. The more sides the polygon has, the closer its area gets to the area of the circle. In the end, we find that the area of a circle of radius r is pi times r squared.` }),
    sl('diagram', 'Sector of a circle', { b: r`A sector with angle $\theta$ is the fraction $\dfrac{\theta}{360}$ of the circle, so its area is $\dfrac{\theta}{360} \times \pi r^2$.`, v: fArc, n: `A sector of angle theta is the fraction theta over three hundred sixty of the whole circle. So its area is that fraction of the area of the circle. In the figure the radius is nine centimetres and the angle is one hundred degrees, so the sector is five eighteenths of the circle.` }),
    sl('example', 'Worked example 1: a sector', { b: r`Find the arc, area and perimeter of the sector of radius $9$ cm and angle $100^\circ$. Use $\pi = 3.14$.`, ul: [r`**Fraction —** $\dfrac{100}{360} = \dfrac{5}{18}$`, r`**Arc —** $\dfrac{5}{18} \times 56.52 = 15.7$ cm`, r`**Area —** $\dfrac{5}{18} \times 254.34 = 70.65$ cm$^2$`, r`**Perimeter —** $15.7 + 9 + 9 = 33.7$ cm`], v: tSecWE, n: `The sector is five eighteenths of the circle. Using three point one four, the circumference is fifty-six point five two and the area is two hundred fifty-four point three four. Five eighteenths of these give an arc of fifteen point seven centimetres and an area of seventy point six five square centimetres. The perimeter adds the two radii, so it is thirty-three point seven centimetres.` }),
    sl('concept', 'Formulas for circles and sectors', { b: 'Keep the two families apart: **lengths** use $2\\pi r$, **areas** use $\\pi r^2$.', v: tSector, n: `Here are the formulas side by side. Lengths use two pi r: the circumference and the arc. Areas use pi r squared: the circle and the sector. For a sector, multiply by theta over three hundred sixty. The perimeter of a sector is the arc plus the two radii. Do not mix the lengths and the areas.` }),
    sl('check', 'Quick check: a sector', { b: 'A sector has radius nine centimetres and angle one hundred degrees. Using pi as three point one four, what is its area?', v: fArc, chk: 'm04', n: `Take five eighteenths of the area of the circle.` }),
    sl('example', 'Worked example 2: a segment', { b: r`A chord $AB$ of a circle of radius $14$ cm subtends a right angle at the centre $O$. Find the area of the minor segment. Use $\pi = \dfrac{22}{7}$.`, ul: [r`**Sector —** $\dfrac{1}{4} \times \dfrac{22}{7} \times 14^2 = 154$ cm$^2$`, r`**Triangle —** $\dfrac{1}{2} \times 14 \times 14 = 98$ cm$^2$`, r`**Segment —** $154 - 98 = 56$ cm$^2$`], v: fSeg, n: `A segment is the part of a sector that is left when we remove the triangle formed by the two radii and the chord. For a quarter circle of radius fourteen, the sector has area one hundred fifty-four, and the right triangle has area ninety-eight. The segment is the difference, fifty-six square centimetres.` }),
    sl('example', 'Worked example 3: corners of a square tile', { b: r`The largest circle is cut from a square tile of side $28$ cm. Find the area of the four corner pieces. Use $\pi = \dfrac{22}{7}$.`, ul: [r`**Square —** $28 \times 28 = 784$ cm$^2$`, r`**Circle —** radius $14$ cm, $\dfrac{22}{7} \times 14^2 = 616$ cm$^2$`, r`**Corners —** $784 - 616 = 168$ cm$^2$`], v: tCornerWE, n: `The tile is a square of side twenty-eight, so its area is seven hundred eighty-four. The biggest circle inside it has a diameter of twenty-eight, so a radius of fourteen, and an area of six hundred sixteen. The four corner pieces together have the difference, one hundred sixty-eight square centimetres.` }),
    sl('diagram', 'A ring', { b: r`A path round a pond is a **ring** between two circles with the same centre. Its area is $\pi R^2 - \pi r^2 = \pi (R - r)(R + r)$.`, v: fRing, n: `A path all the way round a circular pond is a ring between two circles with the same centre. Its area is the area of the big circle minus the area of the small circle. If the big radius is capital R and the small radius is small r, this is pi times R squared minus r squared.` }),
    sl('example', 'Worked example 4: a path round a pond', { b: r`A circular pond of radius $14$ m has a path $3.5$ m wide all round it. Find the area of the path. Use $\pi = \dfrac{22}{7}$.`, ul: [r`**Outer radius —** $14 + 3.5 = 17.5$ m`, r`**Areas —** $616$ m$^2$ for the pond and $962.5$ m$^2$ with the path`, r`**Path —** $962.5 - 616 = 346.5$ m$^2$`], v: tRingWE, n: `The path adds three and a half metres to the radius, so the outer radius is seventeen and a half. The pond has an area of six hundred sixteen, and the pond and path together have an area of nine hundred sixty-two and a half. The path is the difference, three hundred forty-six and a half square metres, and the short method gives the same answer.` }),
    sl('check', 'Quick check: the path', { b: 'Use the same pond, radius fourteen metres, with a path three and a half metres wide. What is the area of the path?', v: fRing, chk: 'm05', n: `Outer circle minus inner circle.` }),
    sl('diagram', "Brahmagupta's formula", { b: r`A quadrilateral with all four corners on a circle is **cyclic**. With sides $a$, $b$, $c$, $d$ and $s = \dfrac{a + b + c + d}{2}$, its area is $\sqrt{(s - a)(s - b)(s - c)(s - d)}$. The Indian mathematician Brahmagupta gave it in $628$ CE.`, v: fBrahma, n: `Here is a quadrilateral with all four corners on a circle, called a cyclic quadrilateral. Its sides are seven, twenty-four, twenty and fifteen. The Indian mathematician Brahmagupta gave a formula for its area, using only the sides. Find s, half the perimeter, multiply the four differences s minus each side, and take the square root.` }),
    sl('concept', 'Checking the formula', { b: r`Here the diagonal $25$ cm is a diameter, so the figure splits into two right triangles with areas $84$ and $150$. The formula agrees.`, v: tBrahma, n: `Let us test the formula. Half the perimeter is thirty-three. The four differences are twenty-six, nine, thirteen and eighteen. Their product is fifty-four thousand seven hundred fifty-six, and the square root is two hundred thirty-four. Now split the figure along the diameter into two right triangles, with areas eighty-four and one hundred fifty. They add up to two hundred thirty-four as well.` }),
    sl('diagram', 'A rectangle is a cyclic quadrilateral', { b: r`A rectangle $8$ cm by $6$ cm has $s = 14$ and the formula gives $\sqrt{6 \times 8 \times 6 \times 8} = 48$, which is length times width.`, v: fRectCirc, n: `A rectangle has all four corners on a circle, because its diagonal is a diameter. Take a rectangle eight by six. Half the perimeter is fourteen. The four differences are six, eight, six and eight. The square root of their product is forty-eight, which is exactly length times width. So the formula works for rectangles.` }),
    sl('concept', "Heron's formula as a special case", { b: r`Let one side shrink to $0$: $d = 0$. The quadrilateral becomes a triangle, $s - d$ becomes $s$, and Brahmagupta's formula becomes **Heron's formula**.`, v: tHeronCase, n: `Now let one side of the cyclic quadrilateral shrink to nothing. The quadrilateral turns into a triangle. In the formula, s minus d becomes just s, so the four factors are s, and s minus each of the three sides. That is exactly Heron's formula. The table shows the same four numbers giving the same area, two hundred four, for a triangle with sides seventeen, twenty-five and twenty-six.` }),
    sl('example', 'Worked example 5: a cyclic plot', { b: r`A cyclic plot has sides $25$ m, $39$ m, $60$ m and $52$ m. Find its area.`, ul: [r`**Semi-perimeter —** $s = 88$`, r`**Differences —** $63$, $49$, $28$, $36$`, r`**Area —** $\sqrt{63 \times 49 \times 28 \times 36} = \sqrt{3111696} = 1764$ m$^2$`], v: tPlot, n: `The semi-perimeter is eighty-eight. The four differences are sixty-three, forty-nine, twenty-eight and thirty-six. Multiply them to get three million, one hundred eleven thousand, six hundred ninety-six. The square root is one thousand seven hundred sixty-four, so the plot has an area of one thousand seven hundred sixty-four square metres.` }),
    sl('check', "Quick check: Brahmagupta", { b: 'A cyclic quadrilateral has sides four, five, seven and ten centimetres. What is its area?', v: fBrahma, chk: 'm06', n: `Find s, the four differences, and the square root.` }),
    sl('summary', 'Summary', { ul: [r`Circle: area $\pi r^2$; sector: $\dfrac{\theta}{360} \times \pi r^2$; segment $=$ sector $-$ triangle`, r`Ring: $\pi (R^2 - r^2)$; composite figures: add or subtract parts`, r`Cyclic quadrilateral: $\sqrt{(s - a)(s - b)(s - c)(s - d)}$`, r`With $d = 0$ this is Heron's formula; for a rectangle it gives $ab$`], v: sum2, n: `To sum up. The area of a circle is pi r squared. A sector takes the fraction theta over three hundred sixty of it. A segment is a sector minus a triangle, and a ring is a big circle minus a small circle. For a four-sided figure with its corners on a circle, Brahmagupta's formula gives the area from the four sides, and with one side zero it becomes Heron's formula.` }),
    sl('exam-tips', 'Exam tips: how marks are awarded', { ul: ['**Area numericals (2–3 marks):** formula, the value of $\\pi$, working, unit (cm$^2$)', '**Composite figures (3 marks):** show the parts and whether you add or subtract', '**Mistake:** using the diameter where the radius is needed', "**Mistake:** applying Brahmagupta's formula to a quadrilateral that is not cyclic"], n: `For area questions, write the formula, say which value of pi you use, show the working, and give square units. For composite figures, show the parts and say whether you add or subtract. Two common slips are using the diameter where the radius is needed, and using Brahmagupta's formula for a quadrilateral that does not have its corners on a circle.` }),
  ],
});

// ================================================================ notes
const notes = {
  unit: 'cbse-9-mathematics-ch12', version: 1, title: 'Area and Perimeter: chapter notes', language: 'en',
  sections: [
    { heading: '1. Perimeter and circumference', body_md: r`The **perimeter** of a figure is the length of its boundary. The **circumference** of a circle of radius $r$ is $2\pi r = \pi d$, where $\pi$ is the ratio of the circumference to the diameter. $\pi$ is the same for every circle. Use $\dfrac{22}{7}$ or $3.14$ and **say which**.\n\nFor a composite figure, add only the outside edges.`, key_terms: [{ term: 'Circumference', definition_md: 'The perimeter of a circle.' }, { term: 'pi', definition_md: 'The ratio of the circumference of a circle to its diameter.' }], formulas: [{ latex: r`C = 2\pi r = \pi d`, label: 'Circumference' }], visual: fCirc, visuals: [tPerim, fWindow, tWE2], topic_ids: [topic(1)] },
    { heading: '2. Approximations of pi', body_md: r`$\pi = 3.14159265\ldots$ and no fraction equals it exactly. Historical values: ancient Egypt (about $1650$ BCE) $\left(\dfrac{16}{9}\right)^2 = \dfrac{256}{81} \approx 3.16$; Archimedes (about $250$ BCE) $\dfrac{223}{71} < \pi < \dfrac{22}{7}$ using polygons of $96$ sides; Aryabhata ($499$ CE) $\dfrac{62832}{20000} = 3.1416$; the fraction $\dfrac{355}{113} \approx 3.14159$ is often credited to Zu Chongzhi of China ($5$th century CE). Later, an infinite series found in Kerala gave many more decimal places.`, key_terms: [{ term: 'Archimedes bounds', definition_md: r`$\dfrac{223}{71} < \pi < \dfrac{22}{7}$.` }], formulas: [], visual: tPi, visuals: [fEgypt, fPoly, tArch], topic_ids: [topic(1)] },
    { heading: '3. Arc length', body_md: r`An arc of a sector of angle $\theta$ degrees in a circle of radius $r$ has length $\dfrac{\theta}{360} \times 2\pi r$. The perimeter of the sector is the arc plus $2r$.`, key_terms: [{ term: 'Arc', definition_md: 'A part of a circle between two points.' }], formulas: [{ latex: r`\ell = \dfrac{\theta}{360} \times 2\pi r`, label: 'Arc length' }], visual: fArc, visuals: [tWE1], topic_ids: [topic(1)] },
    { heading: "4. Heron's formula; a median bisects the area", body_md: r`A triangle with sides $a$, $b$, $c$ and $s = \dfrac{a + b + c}{2}$ has area $\sqrt{s(s - a)(s - b)(s - c)}$ (Heron of Alexandria, first century CE). No height is needed.\n\nA **median** divides a triangle into two triangles with equal bases and the same height, so it **bisects the area**.`, key_terms: [{ term: 'Semi-perimeter', definition_md: 'Half the perimeter: s = (a + b + c) / 2.' }, { term: 'Median', definition_md: 'A segment joining a vertex to the mid-point of the opposite side.' }], formulas: [{ latex: r`A = \sqrt{s(s - a)(s - b)(s - c)}`, label: "Heron's formula" }], visual: fHeron, visuals: [tHeron1, tHeron2, fMedian, tMedian], topic_ids: [topic(2)] },
    { heading: '5. Area of circles, sectors, segments and rings', body_md: r`Circle: $\pi r^2$. Sector of angle $\theta$: $\dfrac{\theta}{360} \times \pi r^2$. Segment: area of the sector minus area of the triangle formed by the radii and the chord. Ring (path round a circle): $\pi(R^2 - r^2) = \pi(R - r)(R + r)$. For composite figures, add or subtract the areas of the parts.`, key_terms: [{ term: 'Segment', definition_md: 'The region between a chord and an arc.' }, { term: 'Ring', definition_md: 'The region between two circles with the same centre.' }], formulas: [{ latex: r`A = \pi r^2, \quad A_{\text{sector}} = \dfrac{\theta}{360}\pi r^2`, label: 'Circle and sector' }, { latex: r`A_{\text{ring}} = \pi (R^2 - r^2)`, label: 'Ring' }], visual: tCircleArea, visuals: [tSector, tSecWE, fSeg, tSegWE, fCircSq, tCornerWE, fRing, tRingWE], topic_ids: [topic(3)] },
    { heading: "6. Brahmagupta's formula", body_md: r`A **cyclic quadrilateral** has all four corners on a circle. With sides $a$, $b$, $c$, $d$ and $s = \dfrac{a + b + c + d}{2}$ its area is $\sqrt{(s - a)(s - b)(s - c)(s - d)}$ (Brahmagupta, $628$ CE).\n\nPut $d = 0$: the quadrilateral becomes a triangle and the formula becomes Heron's formula. For a rectangle with sides $a$, $b$, $s = a + b$ and the area is $ab$.`, key_terms: [{ term: 'Cyclic quadrilateral', definition_md: 'A quadrilateral whose four corners lie on a circle.' }], formulas: [{ latex: r`A = \sqrt{(s - a)(s - b)(s - c)(s - d)}`, label: "Brahmagupta's formula" }], visual: fBrahma, visuals: [tBrahma, fRectCirc, tHeronCase, fPlot, tPlot], topic_ids: [topic(4)] },
  ],
  exam_tips_md: r`**How marks are awarded**\n- *Circle numericals (2–3 marks):* formula, value of $\pi$, working, unit.\n- *Heron and Brahmagupta (2–3 marks):* the semi-perimeter, the differences, the product, the root.\n- *Composite figures (3 marks):* show the parts and add or subtract.\n\n**Common mistakes**\n1. Not stating the value of $\pi$.\n2. Forgetting the two radii in the perimeter of a sector.\n3. Using $s$ as the whole perimeter.\n4. Using the diameter where the radius is needed.\n5. Using Brahmagupta's formula for a quadrilateral that is not cyclic.`,
  status: 'draft', provenance: d1.provenance,
};

const fcard = (id, front_md, back_md, tag, t) => ({ id, front_md, back_md, tag, topic_id: topic(t) });
const flashcards = {
  unit: 'cbse-9-mathematics-ch12', version: 1, language: 'en',
  cards: [
    fcard('f01', 'What is the circumference of a circle?', 'The perimeter of the circle: the distance once round it.', 'definition', 1),
    fcard('f02', r`What is $\pi$?`, 'The ratio of the circumference of a circle to its diameter; it is the same for every circle.', 'definition', 1),
    fcard('f03', 'Formula for the circumference?', r`$C = 2\pi r = \pi d$.`, 'formula', 1),
    fcard('f04', r`Which values of $\pi$ are used in school sums?`, r`$\dfrac{22}{7}$ and $3.14$; always state which one.`, 'exam-tip', 1),
    fcard('f05', r`Can $\pi$ be written exactly as a fraction?`, r`No. $\dfrac{22}{7}$ and $3.14$ are only approximations of $3.14159265\ldots$`, 'fact', 1),
    fcard('f06', 'What was the ancient Egyptian value of pi?', r`$\left(\dfrac{16}{9}\right)^2 = \dfrac{256}{81} \approx 3.16$ (a square of side $\dfrac{8}{9}$ of the diameter has the area of the circle).`, 'fact', 1),
    fcard('f07', "What were Archimedes' bounds for pi?", r`$\dfrac{223}{71} < \pi < \dfrac{22}{7}$, from polygons of $96$ sides.`, 'fact', 1),
    fcard('f08', "What value of pi did Aryabhata give?", r`$\dfrac{62832}{20000} = 3.1416$ (circumference about $62832$ for diameter $20000$).`, 'fact', 1),
    fcard('f09', 'Which fraction close to pi is often credited to Zu Chongzhi?', r`$\dfrac{355}{113} \approx 3.14159$.`, 'fact', 1),
    fcard('f10', 'What can you say about the Kerala series for pi?', 'It is an infinite series found in Kerala that gives many more decimal places of pi.', 'fact', 1),
    fcard('f11', 'Formula for the length of an arc of angle theta?', r`$\ell = \dfrac{\theta}{360} \times 2\pi r$.`, 'formula', 1),
    fcard('f12', 'Perimeter of a sector?', r`The arc plus two radii: $\ell + 2r$.`, 'formula', 1),
    fcard('f13', 'How do you find the perimeter of a composite figure?', 'Add only the outside edges.', 'exam-tip', 1),
    fcard('f14', "State Heron's formula.", r`Area $= \sqrt{s(s - a)(s - b)(s - c)}$ with $s = \dfrac{a + b + c}{2}$.`, 'formula', 2),
    fcard('f15', "When is Heron's formula useful?", 'When the three sides of a triangle are known and the height is not.', 'concept', 2),
    fcard('f16', 'What is s in Heron’s formula?', 'The semi-perimeter, half of the perimeter.', 'definition', 2),
    fcard('f17', 'What is a median?', 'A segment joining a vertex to the mid-point of the opposite side.', 'definition', 2),
    fcard('f18', 'What does a median do to the area of a triangle?', 'It bisects it: the two parts have equal areas.', 'fact', 2),
    fcard('f19', 'Why does a median bisect the area?', 'The two triangles have equal bases and the same height.', 'concept', 2),
    fcard('f20', 'Area of a circle?', r`$\pi r^2$.`, 'formula', 3),
    fcard('f21', 'Area of a sector of angle theta?', r`$\dfrac{\theta}{360} \times \pi r^2$.`, 'formula', 3),
    fcard('f22', 'Area of a segment?', 'Area of the sector minus the area of the triangle formed by the radii and the chord.', 'formula', 3),
    fcard('f23', 'Area of a ring between radii R and r?', r`$\pi(R^2 - r^2) = \pi(R - r)(R + r)$.`, 'formula', 3),
    fcard('f24', 'How do you find the area of a composite figure?', 'Split it into simple parts and add or subtract their areas.', 'concept', 3),
    fcard('f25', 'Lengths or areas: which formula uses r squared?', r`Areas use $\pi r^2$; lengths use $2\pi r$.`, 'exam-tip', 3),
    fcard('f26', 'What is a cyclic quadrilateral?', 'A quadrilateral whose four corners lie on a circle.', 'definition', 4),
    fcard('f27', "State Brahmagupta's formula.", r`Area $= \sqrt{(s - a)(s - b)(s - c)(s - d)}$ with $s = \dfrac{a + b + c + d}{2}$.`, 'formula', 4),
    fcard('f28', 'Who gave the formula for the area of a cyclic quadrilateral, and when?', 'Brahmagupta, an Indian mathematician, in 628 CE.', 'fact', 4),
    fcard('f29', "How is Heron's formula a special case?", r`Put $d = 0$: the quadrilateral becomes a triangle and $s - d = s$.`, 'concept', 4),
    fcard('f30', "What does Brahmagupta's formula give for a rectangle?", r`$s = a + b$, so the area is $\sqrt{b \cdot a \cdot b \cdot a} = ab$.`, 'fact', 4),
    fcard('f31', "When can you not use Brahmagupta's formula?", 'When the four corners are not on a circle, for example a rhombus that is not a square.', 'exam-tip', 4),
  ],
  status: 'draft', provenance: d1.provenance,
};

const release = {
  unit: 'cbse-9-mathematics-ch12', version: 1, academic_year: '2026-27', created_at: '2026-11-05T00:00:00+05:30',
  decks: [d1, d2], notes, flashcards, questions: [],
  build: { run_id: null, checks: { syllabus: "t01 perimeter, circumference, arc length with the value of pi stated, and historical approximations of pi (Egypt, Archimedes, Aryabhata, 355/113, Kerala series mentioned only); t02 Heron's formula and the median bisecting the area; t03 areas of circles, sectors, segments, rings and composite figures; t04 Brahmagupta's formula with Heron's formula as the case d = 0, checked numerically against a computed cyclic quadrilateral", self_checks: "every figure is drawn from computed coordinates and measured by the lint; every area is asserted from the formula and from the shoelace formula where a figure exists; every answer in the item banks is recomputed from the givens with the stated value of pi" } },
};
const tests = chapterTests('Area and Perimeter', {
  A: ['m07', 'm13', 'm20', 'ar1'],
  B: ['s203', 's205', 's301'],
  C: ['l02', 'l03'],
  D: ['c02'],
}, {
  A: ['m08', 'm09', 'm10', 'm11', 'm14', 'm16', 'm18', 'm21', 'ar2', 'ar3'],
  B: ['s201', 's204', ['s206', 's207'], 's302', ['s304', 's305']],
  C: ['l01', ['l04', 'l05']],
  D: ['c03', 'c04'],
});
build({ dir: DIR, release, testsSpec: tests });
