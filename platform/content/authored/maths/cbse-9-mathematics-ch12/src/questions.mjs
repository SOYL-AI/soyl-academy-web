// CBSE 9 Mathematics ch12 Area and Perimeter: objective items. Every answer is recomputed from the givens (the circle measures with the
// stated pi, Heron's and Brahmagupta's formulas, areas of triangles from coordinates by the shoelace formula); the options are typed
// independently of the computation.
import { Q, mk } from './lib.mjs';
import { r, must, close, range, rd, dist, mid, polyArea, heron, brahma, triFromSides, arcLen, sectorArea, circleArea, circumference, PI7, PI314 } from './h.mjs';

const T = (k, o, chk) => Q(k, mk.mcq({ stem: o.stem, opts: o.opts, key: 'a', sol: o.sol, d: o.d, c: o.c, t: o.t, time: o.time ?? 75, assets: o.assets }), chk);
const tri = (a, b, c) => { const t = triFromSides(a, b, c); return polyArea([t.A, t.B, t.C]); };

// =============================================================== MCQ (m01-m06 are the check-slide items)
T('m01', { stem: r`Aryabhata gave $\dfrac{62832}{20000}$ as the ratio of the circumference of a circle to its diameter. As a decimal this is`, opts: [r`$3.1416$`, r`$3.1429$`, r`$3.1605$`, r`$3.1408$`], sol: r`$\dfrac{62832}{20000} = 3.1416$. The value $3.1429$ is $\dfrac{22}{7}$, $3.1605$ is the ancient Egyptian value $\left(\dfrac{16}{9}\right)^2$, and $3.1408$ is $\dfrac{223}{71}$, Archimedes' lower bound (all rounded to four places).`, d: 1, c: 'understanding', t: [1], time: 60 }, (Cx) => {
  Cx.assert(rd(62832 / 20000, 4) === 3.1416 && rd(22 / 7, 4) === 3.1429 && rd(256 / 81, 4) === 3.1605 && rd(223 / 71, 4) === 3.1408, 'the four decimals');
  Cx.which([62832 / 20000, 22 / 7, 256 / 81, 223 / 71], 62832 / 20000);
});
T('m02', { stem: r`The tip of the minute hand of a tower clock is $17.5$ cm from the centre of the dial. In $12$ minutes the tip moves along an arc of length (use $\pi = \dfrac{22}{7}$)`, opts: [r`$22$ cm`, r`$110$ cm`, r`$44$ cm`, r`$11$ cm`], sol: r`The minute hand turns $6^\circ$ every minute, so in $12$ minutes it turns $72^\circ$. Arc length $= \dfrac{72}{360} \times 2 \times \dfrac{22}{7} \times 17.5 = \dfrac{1}{5} \times 110 = 22$ cm. The value $110$ cm is the whole circumference.`, d: 2, c: 'application', t: [1], time: 90 }, (Cx) => {
  const theta = 12 * 6;
  Cx.assert(theta === 72 && close(circumference(17.5, PI7), 110), 'minute hand turns 72 degrees; circumference 110');
  Cx.which([arcLen(17.5, theta, PI7), circumference(17.5, PI7), 44, 11], 22);
});
T('m03', { stem: r`A triangular plot has sides $9$ m, $10$ m and $17$ m. By Heron's formula its area is`, opts: [r`$36$ m$^2$`, r`$45$ m$^2$`, r`$76.5$ m$^2$`, r`$90$ m$^2$`], sol: r`$s = \dfrac{9 + 10 + 17}{2} = 18$. Area $= \sqrt{18 \times 9 \times 8 \times 1} = \sqrt{1296} = 36$ m$^2$. The value $45$ is $\dfrac{1}{2} \times 9 \times 10$, which is the area only for a right angle between the sides $9$ and $10$.`, d: 2, c: 'application', t: [2], time: 90 }, (Cx) => {
  Cx.assert(close(heron(9, 10, 17), 36) && close(tri(9, 10, 17), 36), 'Heron 36 matches the coordinates');
  Cx.which([heron(9, 10, 17), 45, 76.5, 90], 36);
});
T('m04', { stem: r`A sector of a circle has radius $9$ cm and angle $100^\circ$. Its area, using $\pi = 3.14$, is`, opts: [r`$70.65$ cm$^2$`, r`$15.7$ cm$^2$`, r`$254.34$ cm$^2$`, r`$141.3$ cm$^2$`], sol: r`Area $= \dfrac{100}{360} \times 3.14 \times 9^2 = \dfrac{5}{18} \times 254.34 = 70.65$ cm$^2$. The value $254.34$ is the whole circle, and $15.7$ is the length of the arc (in cm).`, d: 2, c: 'application', t: [3], time: 90 }, (Cx) => {
  Cx.assert(close(circleArea(9, PI314), 254.34) && close(arcLen(9, 100, PI314), 15.7), 'circle 254.34, arc 15.7');
  Cx.which([rd(sectorArea(9, 100, PI314), 2), 15.7, circleArea(9, PI314), 141.3], 70.65);
});
T('m05', { stem: r`A circular pond of radius $14$ m has a path $3.5$ m wide all round it. The area of the path, using $\pi = \dfrac{22}{7}$, is`, opts: [r`$346.5$ m$^2$`, r`$616$ m$^2$`, r`$962.5$ m$^2$`, r`$110.25$ m$^2$`], sol: r`The outer radius is $14 + 3.5 = 17.5$ m. Area of the path $= \dfrac{22}{7}(17.5^2 - 14^2) = \dfrac{22}{7} \times 110.25 = 346.5$ m$^2$. The value $616$ is the pond and $962.5$ is the pond with the path.`, d: 2, c: 'application', t: [3], time: 90 }, (Cx) => {
  const ring = circleArea(17.5, PI7) - circleArea(14, PI7);
  Cx.assert(close(circleArea(14, PI7), 616) && close(circleArea(17.5, PI7), 962.5) && close(17.5 ** 2 - 14 ** 2, 110.25), 'pond 616, with path 962.5');
  Cx.which([ring, circleArea(14, PI7), circleArea(17.5, PI7), 17.5 ** 2 - 14 ** 2], 346.5);
});
T('m06', { stem: r`A cyclic quadrilateral has sides $4$ cm, $5$ cm, $7$ cm and $10$ cm. By Brahmagupta's formula its area is`, opts: [r`$36$ cm$^2$`, r`$13$ cm$^2$`, r`$26$ cm$^2$`, r`$1296$ cm$^2$`], sol: r`$s = \dfrac{4 + 5 + 7 + 10}{2} = 13$. Area $= \sqrt{(13 - 4)(13 - 5)(13 - 7)(13 - 10)} = \sqrt{9 \times 8 \times 6 \times 3} = \sqrt{1296} = 36$ cm$^2$. The value $13$ is $s$, and $1296$ is the number under the root.`, d: 2, c: 'application', t: [4], time: 90 }, (Cx) => {
  Cx.assert((4 + 5 + 7 + 10) / 2 === 13 && 9 * 8 * 6 * 3 === 1296, 's = 13 and the product 1296');
  Cx.which([brahma(4, 5, 7, 10), 13, 26, 9 * 8 * 6 * 3], 36);
});

// =============================================================== MCQ for the tests
T('m07', { stem: 'The ratio of the circumference of a circle to its diameter', opts: ['is the same for every circle', 'is larger for a larger circle', 'is smaller for a larger circle', 'is exactly $\\dfrac{22}{7}$'], sol: r`For every circle the circumference is $\pi$ times the diameter, so the ratio is the same number $\pi$ for all circles. It is not exactly $\dfrac{22}{7}$: $\dfrac{22}{7}$ is only an approximation of $\pi$.`, d: 1, c: 'recall', t: [1], time: 60 }, (Cx) => {
  const ratios = [0.5, 1, 7, 21, 100].map((rr) => circumference(rr, Math.PI) / (2 * rr));
  Cx.assert(ratios.every((q) => close(q, Math.PI)) && !close(Math.PI, 22 / 7), 'the ratio is pi for every radius, and pi is not 22/7');
  Cx.which([ratios.every((q) => close(q, ratios[0])), ratios[0] < ratios[4], ratios[0] > ratios[4], close(Math.PI, 22 / 7)], true);
});
T('m08', { stem: r`Which of these numbers lies between Archimedes' two bounds $\dfrac{223}{71}$ and $\dfrac{22}{7}$ for $\pi$?`, opts: [r`$3.1416$`, r`$3.14$`, r`$3.1429$`, r`$3.16$`], sol: r`$\dfrac{223}{71} \approx 3.14085$ and $\dfrac{22}{7} \approx 3.14286$. Only $3.1416$ lies between them. The number $3.14$ is slightly below the lower bound, $3.1429$ is slightly above the upper bound, and $3.16$ is far above it.`, d: 2, c: 'application', t: [1], time: 75 }, (Cx) => {
  const inside = (x) => 223 / 71 < x && x < 22 / 7;
  Cx.assert(223 / 71 < Math.PI && Math.PI < 22 / 7, 'pi is between the bounds');
  Cx.which([inside(3.1416), inside(3.14), inside(3.1429), inside(3.16)], true);
});
T('m09', { stem: r`The ancient Egyptians took the area of a circle of diameter $d$ to be the area of a square of side $\dfrac{8}{9}d$. This is the same as taking $\pi$ to be`, opts: [r`$\dfrac{256}{81}$`, r`$\dfrac{64}{81}$`, r`$\dfrac{16}{9}$`, r`$\dfrac{8}{9}$`], sol: r`Square: $\left(\dfrac{8d}{9}\right)^2 = \dfrac{64}{81}d^2$. Circle: $\pi\left(\dfrac{d}{2}\right)^2 = \dfrac{\pi}{4}d^2$. Equating, $\pi = 4 \times \dfrac{64}{81} = \dfrac{256}{81} \approx 3.16$.`, d: 3, c: 'analysis', t: [1], time: 105 }, (Cx) => {
  const d = 9, square = (8 * d / 9) ** 2, piHere = square / (d / 2) ** 2;
  Cx.assert(close(piHere, 256 / 81) && close((16 / 9) ** 2, 256 / 81), 'pi implied by the square of side 8d/9');
  Cx.which([piHere, (8 / 9) ** 2, 16 / 9, 8 / 9], 256 / 81);
});
T('m10', { stem: r`A rickshaw wheel has diameter $70$ cm. The distance it covers in $100$ complete turns, using $\pi = \dfrac{22}{7}$, is`, opts: [r`$220$ m`, r`$22$ m`, r`$440$ m`, r`$2200$ m`], sol: r`One turn covers the circumference $\pi d = \dfrac{22}{7} \times 70 = 220$ cm. In $100$ turns the wheel covers $220 \times 100 = 22000$ cm $= 220$ m. The values $440$ m and $2200$ m come from using $2\pi d$ or from a slip in changing centimetres to metres.`, d: 2, c: 'application', t: [1], time: 90 }, (Cx) => {
  const turn = circumference(35, PI7);
  Cx.assert(close(turn, 220) && close(turn * 100 / 100, 220), 'one turn 220 cm; 100 turns 220 m');
  Cx.which([turn * 100 / 100, 22, 440, 2200], 220);
});
T('m11', { stem: r`The length of an arc of a sector of angle $210^\circ$ in a circle of radius $6$ cm, using $\pi = 3.14$, is`, opts: [r`$21.98$ cm`, r`$12.56$ cm`, r`$37.68$ cm`, r`$10.99$ cm`], sol: r`Arc length $= \dfrac{210}{360} \times 2 \times 3.14 \times 6 = \dfrac{7}{12} \times 37.68 = 21.98$ cm. The value $37.68$ cm is the whole circumference.`, d: 2, c: 'application', t: [1], time: 90 }, (Cx) => {
  Cx.assert(close(circumference(6, PI314), 37.68), 'circumference 37.68');
  Cx.which([rd(arcLen(6, 210, PI314), 2), 12.56, circumference(6, PI314), 10.99], 21.98);
});
T('m13', { stem: r`In Heron's formula for a triangle with sides $25$ cm, $29$ cm and $36$ cm, the value of $s$ is`, opts: [r`$45$ cm`, r`$90$ cm`, r`$30$ cm`, r`$22.5$ cm`], sol: r`$s$ is half the perimeter: $s = \dfrac{25 + 29 + 36}{2} = \dfrac{90}{2} = 45$ cm. The value $90$ cm is the whole perimeter.`, d: 1, c: 'understanding', t: [2], time: 60 }, (Cx) => {
  Cx.assert(close(heron(25, 29, 36), 360), 'the triangle is valid');
  Cx.which([(25 + 29 + 36) / 2, 25 + 29 + 36, 30, 22.5], 45);
});
T('m14', { stem: r`A triangular park has sides $17$ m, $25$ m and $26$ m. Its area is`, opts: [r`$204$ m$^2$`, r`$102$ m$^2$`, r`$221$ m$^2$`, r`$340$ m$^2$`], sol: r`$s = \dfrac{17 + 25 + 26}{2} = 34$, so the area is $\sqrt{34 \times 17 \times 9 \times 8} = \sqrt{41616} = 204$ m$^2$. The value $221$ is $\dfrac{1}{2} \times 26 \times 17$, which treats the side $17$ as the height.`, d: 2, c: 'application', t: [2], time: 90 }, (Cx) => {
  Cx.assert(34 * 17 * 9 * 8 === 41616 && close(tri(17, 25, 26), 204), '41616 and 204 from coordinates');
  Cx.which([heron(17, 25, 26), 102, 0.5 * 26 * 17, 340], 204);
});
T('m15', { stem: r`In triangle $ABC$, $D$ is the mid-point of $BC$ and the area of triangle $ABC$ is $84$ cm$^2$. The area of triangle $ABD$ is`, opts: [r`$42$ cm$^2$`, r`$84$ cm$^2$`, r`$21$ cm$^2$`, r`$28$ cm$^2$`], sol: r`The triangles $ABD$ and $ADC$ have equal bases $BD = DC$ and the same height from $A$, so they have equal areas. Each is half of $84$ cm$^2$, that is $42$ cm$^2$.`, d: 1, c: 'understanding', t: [2], time: 60 }, (Cx) => {
  const A = [5, 12], B = [0, 0], C = [14, 0], D = mid(B, C);
  Cx.assert(close(polyArea([A, B, C]), 84) && close(polyArea([A, B, D]), 42) && close(polyArea([A, D, C]), 42), 'the median halves the area');
  Cx.which([polyArea([A, B, D]), 84, 21, 28], 42);
});
T('m16', { stem: r`A circular table mat has diameter $56$ cm. Its area, using $\pi = \dfrac{22}{7}$, is`, opts: [r`$2464$ cm$^2$`, r`$176$ cm$^2$`, r`$9856$ cm$^2$`, r`$1232$ cm$^2$`], sol: r`The radius is $56 \div 2 = 28$ cm, so the area is $\dfrac{22}{7} \times 28^2 = \dfrac{22}{7} \times 784 = 2464$ cm$^2$. The value $176$ is the circumference, and $9856$ comes from using the diameter as the radius.`, d: 2, c: 'application', t: [3], time: 75 }, (Cx) => {
  Cx.assert(close(circumference(28, PI7), 176) && close(circleArea(56, PI7), 9856), 'circumference 176; wrong-radius area 9856');
  Cx.which([circleArea(28, PI7), circumference(28, PI7), circleArea(56, PI7), 1232], 2464);
});
T('m18', { stem: r`The largest possible circle is cut from a square sheet of side $28$ cm. The area of the sheet left over, using $\pi = \dfrac{22}{7}$, is`, opts: [r`$168$ cm$^2$`, r`$616$ cm$^2$`, r`$784$ cm$^2$`, r`$1400$ cm$^2$`], sol: r`The largest circle has diameter $28$ cm, so radius $14$ cm and area $\dfrac{22}{7} \times 14^2 = 616$ cm$^2$. The sheet has area $28^2 = 784$ cm$^2$, so $784 - 616 = 168$ cm$^2$ is left. The value $1400$ is $784 + 616$.`, d: 2, c: 'application', t: [3], time: 90 }, (Cx) => {
  Cx.assert(close(28 * 28 - circleArea(14, PI7), 168), '784 minus 616');
  Cx.which([28 * 28 - circleArea(14, PI7), circleArea(14, PI7), 28 * 28, 28 * 28 + circleArea(14, PI7)], 168);
});
T('m20', { stem: r`Putting $d = 0$ in Brahmagupta's formula $\sqrt{(s - a)(s - b)(s - c)(s - d)}$ gives`, opts: ["Heron's formula", 'the area of a circle', 'the area of a rectangle', 'the perimeter of a triangle'], sol: r`With $d = 0$ the quadrilateral becomes a triangle with sides $a$, $b$, $c$, and $s - d$ becomes $s$. The formula is then $\sqrt{s(s - a)(s - b)(s - c)}$, which is Heron's formula.`, d: 2, c: 'understanding', t: [4], time: 75 }, (Cx) => {
  Cx.assert(close(brahma(17, 25, 26, 0), heron(17, 25, 26)) && close(heron(17, 25, 26), 204), 'd = 0 gives Heron');
  Cx.which(['heron', 'circle', 'rectangle', 'perimeter'], close(brahma(17, 25, 26, 0), heron(17, 25, 26)) ? 'heron' : 'none');
});
T('m21', { stem: r`A semicircular window has diameter $14$ cm. The perimeter of its frame, including the straight diameter and using $\pi = \dfrac{22}{7}$, is`, opts: [r`$36$ cm`, r`$22$ cm`, r`$44$ cm`, r`$29$ cm`], sol: r`The curved part is half of a circumference: $\dfrac{22}{7} \times 7 = 22$ cm. Adding the straight diameter, $22 + 14 = 36$ cm. The value $22$ cm leaves out the diameter, and $44$ cm is a whole circle.`, d: 2, c: 'application', t: [1], time: 75 }, (Cx) => {
  const arc = 0.5 * circumference(7, PI7);
  Cx.assert(close(arc, 22), 'half circumference 22');
  Cx.which([arc + 14, arc, circumference(7, PI7), arc + 7], 36);
});
// =============================================================== assertion-reason
Q('ar1', mk.ar({ a: 'A median of a triangle divides it into two triangles of equal area.', r: 'The two triangles have equal bases and the same height.', key: 'a', sol: r`A is true. R is also true and it is the reason: the median meets the opposite side at its mid-point, so the two triangles have equal bases, and both have the same height from the opposite vertex. So the areas $\dfrac{1}{2} \times \text{base} \times \text{height}$ are equal, and R explains A.`, d: 2, c: 'analysis', t: [2] }), (Cx) => {
  const A = [5, 12], B = [0, 0], C = [14, 0], D = mid(B, C);
  Cx.assert(close(polyArea([A, B, D]), polyArea([A, D, C])) && close(dist(B, D), dist(D, C)), 'equal areas, equal bases');
  Cx.key('a');
});
Q('ar2', mk.ar({ a: "Heron's formula gives the area of a triangle from its three sides alone.", r: "Heron's formula needs the height of the triangle as well as its three sides.", key: 'c', sol: r`A is true: $\sqrt{s(s - a)(s - b)(s - c)}$ uses only the sides. R is false: no height is needed. That is the whole point of the formula.`, d: 2, c: 'analysis', t: [2] }), (Cx) => {
  Cx.assert(close(heron(9, 40, 41), 180) && close(tri(9, 40, 41), 180), 'sides alone give the area');
  Cx.key('c');
});
Q('ar3', mk.ar({ a: r`The area of a sector of angle $90^\circ$ is one quarter of the area of its circle.`, r: r`The arc of a sector of angle $90^\circ$ is one quarter of the circumference of its circle.`, key: 'b', sol: r`Both statements are true: a sector of angle $90^\circ$ takes $\dfrac{90}{360} = \dfrac{1}{4}$ of the circle, and its arc takes $\dfrac{1}{4}$ of the circumference. But the length of the arc does not explain the area; both follow from the same fraction $\dfrac{\theta}{360}$ of the whole circle. So R is not the explanation of A.`, d: 2, c: 'analysis', t: [3] }), (Cx) => {
  Cx.assert(close(sectorArea(14, 90, PI7), circleArea(14, PI7) / 4) && close(arcLen(14, 90, PI7), circumference(14, PI7) / 4), 'a quarter of each');
  Cx.key('b');
});
Q('ar4', mk.ar({ a: r`Archimedes' lower bound $\dfrac{223}{71}$ for $\pi$ is larger than his upper bound $\dfrac{22}{7}$.`, r: r`$\dfrac{223}{71} \approx 3.1408$ and $\dfrac{22}{7} \approx 3.1429$.`, key: 'd', sol: r`A is false: $\dfrac{223}{71} \approx 3.1408$ is smaller than $\dfrac{22}{7} \approx 3.1429$, so $\dfrac{223}{71}$ is the lower bound. R is true, and its decimals show why A is false.`, d: 2, c: 'analysis', t: [1] }), (Cx) => {
  Cx.assert(223 / 71 < 22 / 7 && rd(223 / 71, 4) === 3.1408 && rd(22 / 7, 4) === 3.1429, 'the decimals and the order');
  Cx.key('d');
});
Q('ar5', mk.ar({ a: r`A rectangle with sides $9$ cm and $4$ cm is a cyclic quadrilateral, and Brahmagupta's formula gives its area as $36$ cm$^2$.`, r: 'Every quadrilateral is a cyclic quadrilateral.', key: 'c', sol: r`A is true: $s = 13$ and $\sqrt{4 \times 9 \times 4 \times 9} = 36$. R is false: for example a rhombus that is not a square, or a parallelogram that is not a rectangle, cannot have all four corners on a circle.`, d: 2, c: 'analysis', t: [4] }), (Cx) => {
  Cx.assert(close(brahma(9, 4, 9, 4), 36), 'rectangle 9 by 4');
  Cx.key('c');
});
Q('ar6', mk.ar({ a: "Heron's formula is the special case $d = 0$ of Brahmagupta's formula.", r: r`When $d = 0$ the quadrilateral becomes a triangle with sides $a$, $b$, $c$, and the factor $(s - d)$ becomes $s$.`, key: 'a', sol: r`A is true. R explains it: with $d = 0$ the semi-perimeter is $s = \dfrac{a + b + c}{2}$ and the four factors become $s - a$, $s - b$, $s - c$ and $s$, which are the four factors of Heron's formula.`, d: 3, c: 'analysis', t: [4] }), (Cx) => {
  Cx.assert([[17, 25, 26], [9, 10, 17], [25, 29, 36]].every(([a, b, c]) => close(brahma(a, b, c, 0), heron(a, b, c))), 'd = 0 gives Heron for three triangles');
  Cx.key('a');
});

// =============================================================== true-false
Q('tf1', mk.tf({ stem: r`The number $\pi$ is the same for every circle.`, key: 't', sol: r`$\pi$ is the ratio of the circumference to the diameter, and this ratio is the same for every circle, large or small. The statement is true.`, d: 1, c: 'recall', t: [1] }), (Cx) => {
  Cx.assert([1, 3, 10].every((rr) => close(circumference(rr, Math.PI) / (2 * rr), Math.PI)), 'the same ratio for different radii');
  Cx.key('t');
});
Q('tf2', mk.tf({ stem: 'The perimeter of a sector of a circle is equal to the length of its arc.', key: 'f', sol: r`The boundary of a sector also includes the two radii, so the perimeter is the arc plus $2r$. For a quadrant of radius $7$ cm the arc is $11$ cm but the perimeter is $11 + 14 = 25$ cm. The statement is false.`, d: 1, c: 'understanding', t: [1] }), (Cx) => {
  Cx.assert(close(arcLen(7, 90, PI7), 11) && close(arcLen(7, 90, PI7) + 14, 25) && arcLen(7, 90, PI7) !== 25, 'quadrant: arc 11, perimeter 25');
  Cx.key('f');
});
Q('tf3', mk.tf({ stem: r`Archimedes found the exact value of $\pi$.`, key: 'f', sol: r`Archimedes found two fractions, $\dfrac{223}{71}$ and $\dfrac{22}{7}$, with $\pi$ between them. He gave bounds, not the exact value, and $\pi$ cannot be written exactly as a fraction. The statement is false.`, d: 1, c: 'understanding', t: [1] }), (Cx) => {
  Cx.assert(223 / 71 < Math.PI && Math.PI < 22 / 7 && !close(223 / 71, 22 / 7), 'bounds, not an exact value');
  Cx.key('f');
});
Q('tf4', mk.tf({ stem: "Heron's formula can be used for a right-angled triangle.", key: 't', sol: r`Heron's formula works for every triangle. For the right-angled triangle with sides $9$, $40$, $41$ it gives $\sqrt{45 \times 36 \times 5 \times 4} = 180$, the same as $\dfrac{1}{2} \times 9 \times 40$. The statement is true.`, d: 2, c: 'understanding', t: [2] }), (Cx) => {
  Cx.assert(close(heron(9, 40, 41), 180) && close(0.5 * 9 * 40, 180), 'Heron agrees with half base times height');
  Cx.key('t');
});

// =============================================================== fill in the blank
Q('fb1', mk.fill({ stem: r`Aryabhata's value $\dfrac{62832}{20000}$ for $\pi$ is ____ as a decimal.`, acc: [['3.1416']], sol: r`$62832 \div 20000 = 3.1416$. So the blank is $3.1416$.`, d: 1, c: 'understanding', t: [1] }), (Cx) => { Cx.blank(62832 / 20000); });
Q('fb2', mk.fill({ stem: r`A sector of angle $60^\circ$ has ____ of the area of its circle.`, acc: [['1/6']], sol: r`$\dfrac{60}{360} = \dfrac{1}{6}$. That is $1/6$. So the blank is $1/6$.`, d: 1, c: 'understanding', t: [3] }), (Cx) => {
  Cx.assert(close(sectorArea(7, 60, PI7) / circleArea(7, PI7), 1 / 6), 'one sixth');
  Cx.blank(1 / 6);
});
Q('fb3', mk.fill({ stem: 'A median divides a triangle into two triangles of ____ area.', acc: [['equal']], sol: 'The two triangles have equal bases and the same height, so they have equal area. So the blank is equal.', d: 1, c: 'recall', t: [2] }), (Cx) => { Cx.blank('equal'); });
Q('fb4', mk.fill({ stem: "Brahmagupta's formula gives the area of a ____ quadrilateral, one whose four corners lie on a circle.", acc: [['cyclic']], sol: "Brahmagupta's formula is for a cyclic quadrilateral. So the blank is cyclic.", d: 1, c: 'recall', t: [4] }), (Cx) => { Cx.blank('cyclic'); });

// =============================================================== match (2 marks)
{
  const rr = 7, th = 60, pi = PI314;
  const vals = [circumference(rr, pi), circleArea(rr, pi), arcLen(rr, th, pi), sectorArea(rr, th, pi)];
  const right = [r`$\pi r^2$`, r`$\dfrac{\theta}{360} \times \pi r^2$`, r`$2\pi r$`, r`$\dfrac{\theta}{360} \times 2\pi r$`], order = [2, 0, 3, 1];
  const rightVals = [circleArea(rr, pi), sectorArea(rr, th, pi), circumference(rr, pi), arcLen(rr, th, pi)];
  Q('mt1', mk.match({ stem: 'Match each quantity in Column I with its formula in Column II (the circle has radius $r$ and the sector has angle $\\theta$ degrees).', left: ['Circumference of a circle', 'Area of a circle', 'Length of an arc of a sector', 'Area of a sector'], right, order, sol: r`The circumference is $2\pi r$, the area is $\pi r^2$, and a sector is the fraction $\dfrac{\theta}{360}$ of the circle, so its arc is $\dfrac{\theta}{360} \times 2\pi r$ and its area is $\dfrac{\theta}{360} \times \pi r^2$.`, d: 1, c: 'recall', t: [1, 3] }), (Cx) => Cx.assert(vals.every((v, i) => close(v, rightVals[order[i]])), 'each quantity equals its formula for r = 7 and theta = 60'));
}
{
  const right = ['$3.16049$', '$3.14160$', '$3.14085$', '$3.14286$'], order = [2, 3, 1, 0];
  const vals = [223 / 71, 22 / 7, 62832 / 20000, 256 / 81], shown = [3.16049, 3.1416, 3.14085, 3.14286];
  Q('mt2', mk.match({ stem: 'Match each ancient approximation of $\\pi$ in Column I with its value, correct to five decimal places, in Column II.', left: [r`Archimedes' lower bound $\dfrac{223}{71}$`, r`Archimedes' upper bound $\dfrac{22}{7}$`, r`Aryabhata's $\dfrac{62832}{20000}$`, r`The Egyptian value $\left(\dfrac{16}{9}\right)^2$`], right, order, sol: r`$\dfrac{223}{71} = 3.14085$, $\dfrac{22}{7} = 3.14286$, $\dfrac{62832}{20000} = 3.14160$ and $\left(\dfrac{16}{9}\right)^2 = \dfrac{256}{81} = 3.16049$, correct to five decimal places.`, d: 2, c: 'application', t: [1] }), (Cx) => Cx.assert(vals.every((v, i) => close(rd(v, 5), shown[order[i]])), 'the five-place decimals'));
}

// =============================================================== numerical
{
  const turn = circumference(0.7, PI7), n = 1760 / turn;
  Q('n01', mk.num({ stem: r`A cart wheel in a village near Karnal has diameter $1.4$ m. How many complete turns does it make while covering $1.76$ km? Use $\pi = \dfrac{22}{7}$.`, value: 400, sol: r`The circumference is $\dfrac{22}{7} \times 1.4 = 4.4$ m. The distance is $1.76$ km $= 1760$ m, so the number of turns is $1760 \div 4.4 = 400$.`, scheme: [['Circumference 4.4 m', 0.5], ['1760 / 4.4 = 400', 0.5]], d: 2, c: 'application', t: [1], time: 90 }), (Cx) => {
    Cx.assert(close(turn, 4.4), 'circumference 4.4 m');
    Cx.val(n);
  });
}
Q('n02', mk.num({ stem: r`A triangular garden in Madurai has sides $12$ m, $17$ m and $25$ m. Find its area in square metres.`, value: 90, sol: r`$s = \dfrac{12 + 17 + 25}{2} = 27$. Area $= \sqrt{27 \times 15 \times 10 \times 2} = \sqrt{8100} = 90$ m$^2$.`, scheme: [['s = 27', 0.5], ['sqrt(8100) = 90', 0.5]], d: 2, c: 'application', t: [2], time: 90 }), (Cx) => {
  Cx.assert(27 * 15 * 10 * 2 === 8100 && close(tri(12, 17, 25), 90), '8100 and 90 from coordinates');
  Cx.val(heron(12, 17, 25));
});
{
  // sector of radius 14 and area 154: angle 90 degrees, arc 22
  const theta = (360 * 154) / circleArea(14, PI7);
  Q('n03', mk.num({ stem: r`A sector of a circle of radius $14$ cm has area $154$ cm$^2$. Find the length of its arc in centimetres. Use $\pi = \dfrac{22}{7}$.`, value: 22, sol: r`The whole circle has area $\dfrac{22}{7} \times 14^2 = 616$ cm$^2$, and $\dfrac{154}{616} = \dfrac{1}{4}$, so the sector is a quarter circle, with angle $90^\circ$. Its arc is $\dfrac{1}{4} \times 2 \times \dfrac{22}{7} \times 14 = 22$ cm.`, scheme: [['The sector is 154 / 616 = 1/4 of the circle', 0.5], ['Arc = 22 cm', 0.5]], d: 3, c: 'analysis', t: [3], time: 120 }), (Cx) => {
    Cx.assert(close(theta, 90) && close(circleArea(14, PI7), 616), 'angle 90 degrees');
    Cx.val(arcLen(14, theta, PI7));
  });
}
