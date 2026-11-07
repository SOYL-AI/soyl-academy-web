// CBSE 9 Mathematics ch12 Area and Perimeter: written items (short 2 and 3 marks, long 5 marks, case-based). Every number is recomputed
// from the givens with the stated pi (22/7 or 3.14), Heron's or Brahmagupta's formula, or the shoelace area from coordinates; proofs and
// descriptions are marked by their scheme.
import { Q, caseQ, child, mk } from './lib.mjs';
import { r, close, rd, dist, mid, polyArea, heron, brahma, triFromSides, arcLen, sectorArea, circleArea, circumference, PI7 } from './h.mjs';
import { fMedian } from './figs.mjs';

const tri = (a, b, c) => { const t = triFromSides(a, b, c); return polyArea([t.A, t.B, t.C]); };

// =============================================================== short answer, 2 marks
Q('s201', mk.short({ marks: 2, stem: r`Define $\pi$. Name one ancient value of $\pi$ and say who used it.`, model: r`$\pi$ is the ratio of the circumference of a circle to its diameter; it has the same value for every circle.\n\nFor example, Aryabhata (India, 499 CE) used $\dfrac{62832}{20000} = 3.1416$, and Archimedes (Greece) showed that $\dfrac{223}{71} < \pi < \dfrac{22}{7}$.`, sol: 'pi = circumference / diameter. One ancient value with its user.', scheme: [['pi is the ratio of circumference to diameter', 1], ['One ancient value correctly attributed', 1]], d: 1, c: 'understanding', t: [1], time: 90 }), null, 'definition and a historical fact: marked by the scheme');
{
  const arc = arcLen(42, 60, PI7);
  Q('s203', mk.short({ marks: 2, stem: r`The bob of a pendulum hangs on a string $42$ cm long and swings through an arc that makes an angle of $60^\circ$ at the point of support. Find the length of the arc. Use $\pi = \dfrac{22}{7}$.`, model: r`The bob moves on a circle of radius $42$ cm, and $60^\circ$ is $\dfrac{60}{360} = \dfrac{1}{6}$ of a full turn.\n\nArc $= \dfrac{1}{6} \times 2 \times \dfrac{22}{7} \times 42 = \dfrac{1}{6} \times 264 = 44$ cm.`, sol: 'Fraction 60/360 of the circumference.', scheme: [['Fraction of the circle: 60 / 360 = 1/6', 0.5], ['Circumference 264 cm', 0.5], ['Arc = 44 cm', 1]], d: 2, c: 'application', t: [1], time: 90 }), (Cx) => {
    Cx.assert(close(circumference(42, PI7), 264) && close(arc, 44), 'circumference 264, arc 44');
    Cx.model([60, 264, 44]);
  });
}
Q('s204', mk.short({ marks: 2, stem: r`A triangular road sign has sides $11$ cm, $13$ cm and $20$ cm. Find its area using Heron's formula.`, model: r`$s = \dfrac{11 + 13 + 20}{2} = 22$.\n\nArea $= \sqrt{22 \times 11 \times 9 \times 2} = \sqrt{4356} = 66$ cm$^2$.`, sol: 'Find s, then the square root of the product.', scheme: [['s = 22', 0.5], ['s - a, s - b, s - c = 11, 9, 2', 0.5], ['Area = 66 cm squared', 1]], d: 2, c: 'application', t: [2], time: 90 }), (Cx) => {
  Cx.assert(22 * 11 * 9 * 2 === 4356 && close(tri(11, 13, 20), 66) && close(heron(11, 13, 20), 66), '4356 and 66, confirmed from coordinates');
  Cx.model([22, 4356, 66]);
});
{
  const A = [5, 12], B = [0, 0], C = [14, 0], D = mid(B, C), scale = Math.sqrt(96 / polyArea([A, B, C]));
  Q('s205', mk.short({ marks: 2, stem: r`In triangle $PQR$, $S$ is the mid-point of $QR$ and the area of triangle $PQR$ is $96$ cm$^2$. Find the areas of triangles $PQS$ and $PSR$, and give the reason.`, model: r`$QS = SR$ and the height from $P$ to $QR$ is the same for both triangles, so the two triangles have equal areas.\n\nEach has area $\dfrac{96}{2} = 48$ cm$^2$.`, sol: 'A median bisects the area: equal bases, same height.', scheme: [['Equal bases and the same height, so equal areas', 1], ['48 cm squared each', 1]], d: 2, c: 'application', t: [2], time: 90 }), (Cx) => {
    const s = (p) => [p[0] * scale, p[1] * scale];
    Cx.assert(close(polyArea([s(A), s(B), s(C)]), 96) && close(polyArea([s(A), s(B), s(D)]), 48) && close(polyArea([s(A), s(D), s(C)]), 48), 'a triangle of area 96 is halved by the median');
    Cx.model([96, 48]);
  });
}
Q('s206', mk.short({ marks: 2, stem: r`A flower bed has the shape of a sector of angle $270^\circ$ of a circle of radius $7$ m. Find its area. Use $\pi = \dfrac{22}{7}$.`, model: r`The area of the whole circle is $\dfrac{22}{7} \times 7^2 = 154$ m$^2$.\n\nThe bed is $\dfrac{270}{360} = \dfrac{3}{4}$ of the circle, so its area is $\dfrac{3}{4} \times 154 = 115.5$ m$^2$.`, sol: 'Three quarters of the circle.', scheme: [['Whole circle: 154 m squared', 1], ['Three quarters: 115.5 m squared', 1]], d: 2, c: 'application', t: [3], time: 90 }), (Cx) => {
  Cx.assert(close(circleArea(7, PI7), 154) && close(sectorArea(7, 270, PI7), 115.5), 'circle 154, sector 115.5');
  Cx.model([154, 3, 115.5]);
});
Q('s207', mk.short({ marks: 2, stem: r`A cyclic field has sides $5$ m, $10$ m, $11$ m and $12$ m. Find its area by Brahmagupta's formula.`, model: r`$s = \dfrac{5 + 10 + 11 + 12}{2} = 19$.\n\nArea $= \sqrt{(19 - 5)(19 - 10)(19 - 11)(19 - 12)} = \sqrt{14 \times 9 \times 8 \times 7} = \sqrt{7056} = 84$ m$^2$.`, sol: 'Find s and the four factors.', scheme: [['s = 19 and the factors 14, 9, 8, 7', 1], ['Area = 84 m squared', 1]], d: 2, c: 'application', t: [4], time: 90 }), (Cx) => {
  Cx.assert(14 * 9 * 8 * 7 === 7056 && close(brahma(5, 10, 11, 12), 84), '7056 and 84');
  Cx.model([19, 7056, 84]);
});
Q('s208', mk.short({ marks: 2, stem: "State Brahmagupta's formula for the area of a quadrilateral with sides $a$, $b$, $c$, $d$. For which quadrilaterals does it hold?", model: r`Area $= \sqrt{(s - a)(s - b)(s - c)(s - d)}$, where $s = \dfrac{a + b + c + d}{2}$ is the semi-perimeter.\n\nIt holds for a **cyclic** quadrilateral, that is, one whose four corners lie on a circle.`, sol: 'The formula with s, and the condition: cyclic quadrilateral.', scheme: [['The formula with s defined', 1], ['It holds for cyclic quadrilaterals', 1]], d: 1, c: 'understanding', t: [4], time: 90 }), (Cx) => {
  Cx.assert(close(brahma(25, 39, 60, 52), 1764), 'a cyclic quadrilateral with area 1764');
  Cx.model(['cyclic']);
});

// =============================================================== short answer, 3 marks
{
  const A = [5, 12], B = [0, 0], C = [14, 0], D = mid(B, C);
  Q('s301', mk.short({ marks: 3, stem: r`Prove that a median of a triangle divides it into two triangles of equal area. Check it for the triangle in the figure, where $BC = 14$ cm and the height from $A$ is $12$ cm.`, model: r`Let $AD$ be the median to $BC$, so $BD = DC$. Let $h$ be the height from $A$ to $BC$; it is the same for triangles $ABD$ and $ADC$.\n\nArea of $\triangle ABD = \dfrac{1}{2} \times BD \times h$ and area of $\triangle ADC = \dfrac{1}{2} \times DC \times h$. Since $BD = DC$, the two areas are equal.\n\nCheck: $\dfrac{1}{2} \times 7 \times 12 = 42$ cm$^2$ for each, and $42 + 42 = 84 = \dfrac{1}{2} \times 14 \times 12$.`, sol: 'Equal bases and the same height.', scheme: [['The two triangles have the same height h', 1], ['Equal bases BD = DC, so equal areas', 1], ['The check: 42 + 42 = 84', 1]], d: 3, c: 'analysis', t: [2], time: 150, assets: [fMedian] }), (Cx) => {
    Cx.assert(close(dist(B, D), dist(D, C)) && close(polyArea([A, B, D]), 42) && close(polyArea([A, D, C]), 42) && close(polyArea([A, B, C]), 84), '42, 42 and 84');
    Cx.model([42, 84, 7, 12]);
  });
}
Q('s302', mk.short({ marks: 3, stem: r`A triangular plot has sides $14$ m, $25$ m and $25$ m. It is to be levelled at $\text{Rs } 12$ per square metre. Find the cost.`, model: r`$s = \dfrac{14 + 25 + 25}{2} = 32$.\n\nArea $= \sqrt{32 \times 18 \times 7 \times 7} = \sqrt{28224} = 168$ m$^2$.\n\nCost $= 168 \times 12 = \text{Rs } 2016$.`, sol: 'Heron for the area, then multiply by the rate.', scheme: [['s = 32', 0.5], ['Area = 168 m squared', 1.5], ['Cost = 168 x 12 = 2016 rupees', 1]], d: 2, c: 'application', t: [2], time: 150 }), (Cx) => {
  Cx.assert(32 * 18 * 7 * 7 === 28224 && close(tri(14, 25, 25), 168) && 168 * 12 === 2016, '28224, area 168, cost 2016');
  Cx.model([32, 28224, 168, 2016]);
});
{
  const w = 30, h = 14, rr = h / 2, per = 2 * w + circumference(rr, PI7), area = w * h + circleArea(rr, PI7);
  Q('s303', mk.short({ marks: 3, stem: r`A pond-side bed in a park is a rectangle $30$ m long and $14$ m wide with a semicircle on each of the two $14$ m sides, pointing outwards. Find its perimeter and area. Use $\pi = \dfrac{22}{7}$.`, model: r`The two semicircles of diameter $14$ m together make one circle of radius $7$ m.\n\nPerimeter $= 30 + 30 + 2 \times \dfrac{22}{7} \times 7 = 60 + 44 = 104$ m.\n\nArea $= 30 \times 14 + \dfrac{22}{7} \times 7^2 = 420 + 154 = 574$ m$^2$.`, sol: 'Two semicircles make one circle of radius 7 m.', scheme: [['Two semicircles: one circle of radius 7 m', 0.5], ['Perimeter 60 + 44 = 104 m', 1], ['Area 420 + 154 = 574 m squared', 1.5]], d: 3, c: 'application', t: [1, 3], time: 150 }), (Cx) => {
    Cx.assert(close(per, 104) && close(area, 574) && close(circumference(7, PI7), 44) && close(circleArea(7, PI7), 154), '104 and 574');
    Cx.model([44, 104, 420, 154, 574]);
  });
}
{
  const sector = sectorArea(21, 90, PI7), triangle = 0.5 * 21 * 21;
  Q('s304', mk.short({ marks: 3, stem: r`A chord $AB$ of a circle of radius $21$ cm subtends a right angle at the centre $O$. Find the area of the minor segment cut off by the chord. Use $\pi = \dfrac{22}{7}$.`, model: r`Area of the sector $OAB = \dfrac{90}{360} \times \dfrac{22}{7} \times 21^2 = 346.5$ cm$^2$.\n\nArea of the right triangle $OAB = \dfrac{1}{2} \times 21 \times 21 = 220.5$ cm$^2$.\n\nArea of the minor segment $= 346.5 - 220.5 = 126$ cm$^2$.`, sol: 'Segment = sector minus triangle.', scheme: [['Sector = 346.5 cm squared', 1], ['Triangle = 220.5 cm squared', 1], ['Segment = 126 cm squared', 1]], d: 3, c: 'application', t: [3], time: 150 }), (Cx) => {
    Cx.assert(close(sector, 346.5) && close(triangle, 220.5) && close(sector - triangle, 126), 'sector 346.5, triangle 220.5, segment 126');
    Cx.model([346.5, 220.5, 126]);
  });
}
Q('s305', mk.short({ marks: 3, stem: r`A plot with all four corners on the edge of a circular pond has sides $5$ m, $8$ m, $13$ m and $20$ m. It is to be levelled at $\text{Rs } 40$ per square metre. Find the cost.`, model: r`The plot is a cyclic quadrilateral, so Brahmagupta's formula applies. $s = \dfrac{5 + 8 + 13 + 20}{2} = 23$.\n\nArea $= \sqrt{(23 - 5)(23 - 8)(23 - 13)(23 - 20)} = \sqrt{18 \times 15 \times 10 \times 3} = \sqrt{8100} = 90$ m$^2$.\n\nCost $= 90 \times 40 = \text{Rs } 3600$.`, sol: 'Brahmagupta for the area, then the rate.', scheme: [['s = 23 and the four factors', 1], ['Area = 90 m squared', 1], ['Cost = 3600 rupees', 1]], d: 3, c: 'application', t: [4], time: 150 }), (Cx) => {
  Cx.assert(18 * 15 * 10 * 3 === 8100 && close(brahma(5, 8, 13, 20), 90) && 90 * 40 === 3600, '8100, 90, 3600');
  Cx.model([23, 8100, 90, 3600]);
});

// =============================================================== long answer, 5 marks
{
  const a = 17, b = 25, c = 28, s = (a + b + c) / 2, area = heron(a, b, c), h = (2 * area) / c;
  Q('l01', mk.long({ stem: r`A triangular farm near Nashik has sides $17$ m, $25$ m and $28$ m. (a) Find the semi-perimeter $s$. (b) Find the area of the farm by Heron's formula. (c) Find the height of the farm on the side of $28$ m. (d) A path is laid along the median to the side of $28$ m. Find the area of each half of the farm. (e) Find the cost of ploughing the whole farm at $\text{Rs } 25$ per square metre.`, model: r`**(a)** $s = \dfrac{17 + 25 + 28}{2} = 35$ m.\n\n**(b)** Area $= \sqrt{35 \times 18 \times 10 \times 7} = \sqrt{44100} = 210$ m$^2$.\n\n**(c)** $\dfrac{1}{2} \times 28 \times h = 210$, so $h = \dfrac{420}{28} = 15$ m.\n\n**(d)** A median bisects the area (equal bases, same height), so each half has area $\dfrac{210}{2} = 105$ m$^2$.\n\n**(e)** Cost $= 210 \times 25 = \text{Rs } 5250$.`, sol: 'Heron; height from the area; median halves the area; rate.', scheme: [['(a) s = 35', 1], ['(b) area 210 m squared', 1], ['(c) height 15 m', 1], ['(d) 105 m squared each', 1], ['(e) cost 5250 rupees', 1]], d: 3, c: 'application', t: [2], time: 420 }), (Cx) => {
    Cx.assert(s === 35 && 35 * 18 * 10 * 7 === 44100 && close(area, 210) && close(tri(a, b, c), 210) && close(h, 15) && close(area / 2, 105) && 210 * 25 === 5250, 'm 35, 210, 15, 105, 5250');
    Cx.model([35, 44100, 210, 15, 105, 5250]);
  });
}
{
  const rr = 17.5, th = 144, C = circumference(rr, PI7), arc = arcLen(rr, th, PI7), area = sectorArea(rr, th, PI7);
  Q('l02', mk.long({ stem: r`A circular dance floor in a hall in Mysuru has radius $17.5$ m. A sector of angle $144^\circ$ is carpeted. Use $\pi = \dfrac{22}{7}$. (a) Find the circumference of the dance floor. (b) What fraction of the floor is carpeted? (c) Find the length of the arc of the carpeted sector. (d) Find the area of the carpeted sector. (e) Find the perimeter of the carpeted sector.`, model: r`**(a)** $2 \times \dfrac{22}{7} \times 17.5 = 110$ m.\n\n**(b)** $\dfrac{144}{360} = \dfrac{2}{5}$.\n\n**(c)** Arc $= \dfrac{2}{5} \times 110 = 44$ m.\n\n**(d)** The whole floor has area $\dfrac{22}{7} \times 17.5^2 = 962.5$ m$^2$, so the sector has area $\dfrac{2}{5} \times 962.5 = 385$ m$^2$.\n\n**(e)** Perimeter $= 44 + 17.5 + 17.5 = 79$ m.`, sol: 'The sector is 2/5 of the circle; arc, area and the two radii.', scheme: [['(a) 110 m', 1], ['(b) 2/5', 1], ['(c) arc 44 m', 1], ['(d) area 385 m squared', 1], ['(e) perimeter 79 m', 1]], d: 3, c: 'application', t: [1, 3], time: 420 }), (Cx) => {
    Cx.assert(close(C, 110) && close(th / 360, 2 / 5) && close(arc, 44) && close(circleArea(rr, PI7), 962.5) && close(area, 385) && close(arc + 2 * rr, 79), '110, 2/5, 44, 962.5, 385, 79');
    Cx.model([110, 44, 962.5, 385, 79]);
  });
}
{
  const r1 = 35, w = 7, r2 = r1 + w, lake = circleArea(r1, PI7), outer = circleArea(r2, PI7), path = outer - lake;
  Q('l03', mk.long({ stem: r`A circular lake in a Bhopal park has radius $35$ m, and a path $7$ m wide goes all round it. Use $\pi = \dfrac{22}{7}$. (a) Find the outer radius of the path. (b) Find the area of the lake. (c) Find the area of the lake and the path together. (d) Find the area of the path. (e) Find the cost of paving the path at $\text{Rs } 40$ per square metre.`, model: r`**(a)** Outer radius $= 35 + 7 = 42$ m.\n\n**(b)** $\dfrac{22}{7} \times 35^2 = 3850$ m$^2$.\n\n**(c)** $\dfrac{22}{7} \times 42^2 = 5544$ m$^2$.\n\n**(d)** Area of the path $= 5544 - 3850 = 1694$ m$^2$.\n\n**(e)** Cost $= 1694 \times 40 = \text{Rs } 67760$.`, sol: 'Outer circle minus inner circle.', scheme: [['(a) 42 m', 1], ['(b) 3850 m squared', 1], ['(c) 5544 m squared', 1], ['(d) 1694 m squared', 1], ['(e) 67760 rupees', 1]], d: 3, c: 'application', t: [3], time: 420 }), (Cx) => {
    Cx.assert(r2 === 42 && close(lake, 3850) && close(outer, 5544) && close(path, 1694) && close(path, PI7 * (r2 - r1) * (r2 + r1)) && close(path * 40, 67760), '42, 3850, 5544, 1694, 67760');
    Cx.model([42, 3850, 5544, 1694, 67760]);
  });
}
{
  const e1 = 223 / 71, e2 = 22 / 7, ar = 62832 / 20000, eg = (16 / 9) ** 2, P = Math.PI;
  const err = [Math.abs(e2 - P), Math.abs(ar - P), Math.abs(eg - P)];
  Q('l04', mk.long({ stem: r`(a) Write Archimedes' bounds $\dfrac{223}{71}$ and $\dfrac{22}{7}$ as decimals correct to five places, and show that $3.14159$ lies between them. (b) Aryabhata's rule says: add $4$ to $100$, multiply by $8$ and add $62000$, to get the circumference of a circle of diameter $20000$. Find it, and the value of $\pi$ it gives. (c) Find the ancient Egyptian value $\left(\dfrac{16}{9}\right)^2$ as a decimal to five places. (d) Taking $\pi = 3.14159265$, which of $\dfrac{22}{7}$, $\dfrac{62832}{20000}$ and $\dfrac{256}{81}$ is closest to it? (e) A wheel has diameter $70$ cm. Find its circumference using $\dfrac{22}{7}$ and using $3.1416$, and the difference.`, model: r`**(a)** $\dfrac{223}{71} \approx 3.14085$ and $\dfrac{22}{7} \approx 3.14286$. Since $3.14085 < 3.14159 < 3.14286$, the value lies between them.\n\n**(b)** $(100 + 4) \times 8 + 62000 = 832 + 62000 = 62832$, so $\pi \approx \dfrac{62832}{20000} = 3.1416$.\n\n**(c)** $\left(\dfrac{16}{9}\right)^2 = \dfrac{256}{81} \approx 3.16049$.\n\n**(d)** The differences from $3.14159265$ are about $0.00126$ for $\dfrac{22}{7}$, $0.000007$ for $\dfrac{62832}{20000}$ and $0.0189$ for $\dfrac{256}{81}$. The closest is $\dfrac{62832}{20000}$.\n\n**(e)** With $\dfrac{22}{7}$: $\dfrac{22}{7} \times 70 = 220$ cm. With $3.1416$: $3.1416 \times 70 = 219.912$ cm. The difference is $0.088$ cm.`, sol: 'Compute each value, then compare the errors.', scheme: [['(a) 3.14085 and 3.14286; between', 1], ['(b) 62832 and 3.1416', 1], ['(c) 3.16049', 1], ['(d) Aryabhata is closest', 1], ['(e) 220, 219.912 and 0.088 cm', 1]], d: 3, c: 'analysis', t: [1], time: 450 }), (Cx) => {
    Cx.assert(rd(e1, 5) === 3.14085 && rd(e2, 5) === 3.14286 && e1 < 3.14159 && 3.14159 < e2 && (100 + 4) * 8 + 62000 === 62832 && close(ar, 3.1416) && rd(eg, 5) === 3.16049, 'decimals, the rule and the Egyptian value');
    Cx.assert(err[1] < err[0] && err[0] < err[2] && rd(err[0], 5) === 0.00126 && rd(err[2], 4) === 0.0189 && close(rd(220 - 3.1416 * 70, 3), 0.088), 'Aryabhata is closest; the wheel difference 0.088');
    Cx.model([3.14085, 3.14286, 62832, 3.16049, 0.00126, 220, 219.912, 0.088]);
  });
}
{
  const f = (a, b, c, d) => brahma(a, b, c, d), rect = f(12, 5, 12, 5);
  Q('l05', mk.long({ stem: r`(a) State Brahmagupta's formula for the area of a cyclic quadrilateral with sides $a$, $b$, $c$, $d$. (b) Find the area of a cyclic quadrilateral with sides $4$ cm, $12$ cm, $14$ cm and $18$ cm. (c) Put $d = 0$ and use the sides $17$, $25$, $26$ to show that the formula gives Heron's formula and find the area. (d) For a rectangle with sides $a$ and $b$, show that the formula gives $ab$. (e) Check (d) for a rectangle $12$ cm by $5$ cm.`, model: r`**(a)** Area $= \sqrt{(s - a)(s - b)(s - c)(s - d)}$, where $s = \dfrac{a + b + c + d}{2}$.\n\n**(b)** $s = \dfrac{4 + 12 + 14 + 18}{2} = 24$. Area $= \sqrt{20 \times 12 \times 10 \times 6} = \sqrt{14400} = 120$ cm$^2$.\n\n**(c)** With $d = 0$, $s = \dfrac{a + b + c}{2}$ and $s - d = s$, so the formula becomes $\sqrt{s(s - a)(s - b)(s - c)}$, which is Heron's formula. For $17$, $25$, $26$: $s = 34$ and the area is $\sqrt{34 \times 17 \times 9 \times 8} = \sqrt{41616} = 204$.\n\n**(d)** The sides are $a$, $b$, $a$, $b$, so $s = a + b$. Then $s - a = b$ and $s - b = a$, and the area is $\sqrt{b \times a \times b \times a} = \sqrt{a^2b^2} = ab$.\n\n**(e)** $\sqrt{5 \times 12 \times 5 \times 12} = 60 = 12 \times 5$ cm$^2$.`, sol: 'Brahmagupta; Heron as d = 0; the rectangle as a special case.', scheme: [['(a) the formula with s defined', 1], ['(b) area 120 cm squared', 1], ['(c) d = 0 gives Heron; the area 204', 1.5], ['(d) the rectangle gives ab', 1], ['(e) the check 60', 0.5]], d: 4, c: 'analysis', t: [4], time: 480 }), (Cx) => {
    Cx.assert(20 * 12 * 10 * 6 === 14400 && close(f(4, 12, 14, 18), 120) && close(f(17, 25, 26, 0), 204) && close(heron(17, 25, 26), 204) && close(tri(17, 25, 26), 204) && 34 * 17 * 9 * 8 === 41616, '120 and 204');
    Cx.assert([[3, 8], [12, 5], [9, 4]].every(([a, b]) => close(f(a, b, a, b), a * b)) && close(rect, 60), 'rectangle gives ab');
    Cx.model([24, 14400, 120, 34, 41616, 204, 60]);
  });
}

// =============================================================== case-based
{
  const near = [Math.abs(22 / 7 - Math.PI), Math.abs(62832 / 20000 - Math.PI), Math.abs(256 / 81 - Math.PI)];
  caseQ('c01', {
    passage: r`A museum in Pune has a wall display on the approximations of $\pi$ used long ago. It shows three values: the ancient Egyptian value $\left(\dfrac{16}{9}\right)^2 = \dfrac{256}{81}$, Archimedes' upper bound $\dfrac{22}{7}$, and Aryabhata's value $\dfrac{62832}{20000}$. A card also says that Archimedes showed $\dfrac{223}{71} < \pi < \dfrac{22}{7}$. The true value is $\pi = 3.14159265\ldots$`,
    d: 3, c: 'analysis',
    model: r`(a) Option (a). (b) $3.16$. (c) (i) $\dfrac{1}{497}$. Or (ii) $31416$.`,
    sol: r`(a) The differences from $\pi$ are about $0.0013$ for $\dfrac{22}{7}$, $0.000007$ for $\dfrac{62832}{20000}$ and $0.019$ for $\dfrac{256}{81}$. The closest is Aryabhata's value. (b) $\left(\dfrac{16}{9}\right)^2 = \dfrac{256}{81} \approx 3.16$. (c) (i) $\dfrac{22}{7} - \dfrac{223}{71} = \dfrac{22 \times 71 - 223 \times 7}{7 \times 71} = \dfrac{1562 - 1561}{497} = \dfrac{1}{497}$. (ii) $\dfrac{62832}{20000} \times 10000 = 31416$.`,
    children: [
      child('a', mk.mcq({ stem: r`Which of the three displayed values is closest to $\pi = 3.14159265\ldots$?`, opts: [r`Aryabhata's $\dfrac{62832}{20000}$`, r`Archimedes' $\dfrac{22}{7}$`, r`The Egyptian $\dfrac{256}{81}$`, 'They are equally close'], key: 'a', sol: r`The differences from $\pi$ are about $0.000007$ for $\dfrac{62832}{20000}$, $0.0013$ for $\dfrac{22}{7}$ and $0.019$ for $\dfrac{256}{81}$. The smallest difference is for Aryabhata's value.`, d: 2, c: 'application', t: [1], time: 90 })),
      child('b', mk.num({ stem: r`Find the Egyptian value $\left(\dfrac{16}{9}\right)^2$ as a decimal correct to two places.`, value: 3.16, tol: 0.005, sol: r`$\left(\dfrac{16}{9}\right)^2 = \dfrac{256}{81} \approx 3.1605$, which is $3.16$ correct to two places.`, scheme: [['256/81', 0.5], ['3.16', 0.5]], d: 2, c: 'application', t: [1], time: 75 })),
      child('c', mk.short({ marks: 2, stem: r`**(i)** Show that $\dfrac{22}{7} - \dfrac{223}{71} = \dfrac{1}{497}$.`, model: r`$\dfrac{22}{7} - \dfrac{223}{71} = \dfrac{22 \times 71 - 223 \times 7}{7 \times 71} = \dfrac{1562 - 1561}{497} = \dfrac{1}{497}$.`, sol: 'Common denominator 497.', scheme: [['Common denominator 7 x 71 = 497', 1], ['1562 - 1561 = 1', 1]], d: 3, c: 'application', t: [1], time: 105 }), [
        mk.short({ marks: 2, stem: r`**(ii)** Use Aryabhata's value to find the circumference of a circle of diameter $10000$.`, model: r`Circumference $= \pi \times \text{diameter} \approx \dfrac{62832}{20000} \times 10000 = 31416$.`, sol: 'Circumference = pi x diameter.', scheme: [['Circumference = pi x diameter', 1], ['31416', 1]], d: 2, c: 'application', t: [1], time: 90 }),
      ]),
    ],
  }, (Cx) => {
    Cx.child('a').which(['aryabhata', 'archimedes', 'egypt', 'equal'], near[1] < near[0] && near[1] < near[2] ? 'aryabhata' : 'none');
    Cx.child('b').val(rd((16 / 9) ** 2, 2));
    Cx.child('c').assert(22 * 71 - 223 * 7 === 1 && 7 * 71 === 497 && close(22 / 7 - 223 / 71, 1 / 497), '1/497');
    Cx.child('c').model([1562, 1561, 497]);
    Cx.child('cii').assert(close((62832 / 20000) * 10000, 31416), '31416');
    Cx.child('cii').model([31416]);
  });
}
{
  const rr = 14, th = 135, frac = th / 360, arc = arcLen(rr, th, PI7), area = sectorArea(rr, th, PI7);
  caseQ('c02', {
    passage: r`A circular lawn at a school in Raipur has radius $14$ m. A rose bed in the shape of a sector of angle $135^\circ$ is cut out of the lawn, with its centre at the centre of the lawn. Use $\pi = \dfrac{22}{7}$.`,
    d: 3, c: 'application',
    model: r`(a) Option (a). (b) $33$. (c) (i) $231$ m$^2$. Or (ii) $61$ m.`,
    sol: r`(a) $\dfrac{135}{360} = \dfrac{3}{8}$. (b) The circumference is $2 \times \dfrac{22}{7} \times 14 = 88$ m, so the arc is $\dfrac{3}{8} \times 88 = 33$ m. (c) (i) The lawn has area $\dfrac{22}{7} \times 14^2 = 616$ m$^2$, so the bed has area $\dfrac{3}{8} \times 616 = 231$ m$^2$. (ii) The perimeter is the arc plus two radii: $33 + 14 + 14 = 61$ m.`,
    children: [
      child('a', mk.mcq({ stem: 'What fraction of the lawn is the rose bed?', opts: [r`$\dfrac{3}{8}$`, r`$\dfrac{1}{3}$`, r`$\dfrac{3}{4}$`, r`$\dfrac{1}{8}$`], key: 'a', sol: r`The bed is the fraction $\dfrac{135}{360}$ of the circle, and $\dfrac{135}{360} = \dfrac{3}{8}$ after dividing top and bottom by $45$.`, d: 1, c: 'understanding', t: [3], time: 60 })),
      child('b', mk.num({ stem: 'Find the length of the curved edge of the rose bed, in metres.', value: 33, sol: r`The circumference of the lawn is $2 \times \dfrac{22}{7} \times 14 = 88$ m, and the curved edge is $\dfrac{3}{8}$ of it: $\dfrac{3}{8} \times 88 = 33$ m.`, scheme: [['Circumference 88 m', 0.5], ['3/8 of it = 33 m', 0.5]], d: 2, c: 'application', t: [1], time: 90 })),
      child('c', mk.short({ marks: 2, stem: r`**(i)** Find the area of the rose bed.`, model: r`The lawn has area $\dfrac{22}{7} \times 14^2 = 616$ m$^2$. The bed is $\dfrac{3}{8}$ of it, so its area is $\dfrac{3}{8} \times 616 = 231$ m$^2$.`, sol: 'Fraction of the area of the whole circle.', scheme: [['Area of the lawn 616 m squared', 1], ['3/8 of it = 231 m squared', 1]], d: 2, c: 'application', t: [3], time: 105 }), [
        mk.short({ marks: 2, stem: r`**(ii)** Find the length of fencing needed to go all round the rose bed.`, model: r`The fence goes round the arc and the two straight edges: $33 + 14 + 14 = 61$ m.`, sol: 'Arc plus two radii.', scheme: [['The arc 33 m and two radii of 14 m', 1], ['61 m', 1]], d: 2, c: 'application', t: [1], time: 90 }),
      ]),
    ],
  }, (Cx) => {
    Cx.child('a').which([3 / 8, 1 / 3, 3 / 4, 1 / 8], frac);
    Cx.child('b').val(arc);
    Cx.child('c').assert(close(circleArea(rr, PI7), 616) && close(area, 231), '616 and 231');
    Cx.child('c').model([616, 231]);
    Cx.child('cii').assert(close(arc + 2 * rr, 61), '61');
    Cx.child('cii').model([33, 14, 61]);
  });
}
{
  const A = triFromSides(24, 13, 13), area = heron(13, 13, 24), D = mid(A.B, A.C);
  caseQ('c03', {
    passage: r`A farmer in Ludhiana has a triangular field $ABC$ with $AB = AC = 13$ m and $BC = 24$ m. The point $D$ is the mid-point of $BC$, and the farmer builds a straight channel along $AD$.`,
    d: 3, c: 'application',
    model: r`(a) Option (a). (b) $60$. (c) (i) $30$ m$^2$. Or (ii) $5$ m.`,
    sol: r`(a) $BD = DC$ and the height from $A$ is the same for both, so $\triangle ABD$ has half the area. (b) $s = \dfrac{13 + 13 + 24}{2} = 25$, so the area is $\sqrt{25 \times 12 \times 12 \times 1} = 60$ m$^2$. (c) (i) The area of $\triangle ABD$ is $\dfrac{60}{2} = 30$ m$^2$. (ii) $AD \perp BC$ and $BD = 12$ m, so $AD = \sqrt{13^2 - 12^2} = 5$ m; check: $\dfrac{1}{2} \times 24 \times 5 = 60$ m$^2$.`,
    children: [
      child('a', mk.mcq({ stem: 'The area of triangle $ABD$ compared with the area of triangle $ABC$ is', opts: ['half of it', 'one third of it', 'the same', 'one quarter of it'], key: 'a', sol: 'A median divides a triangle into two triangles of equal area, because they have equal bases $BD = DC$ and the same height from $A$. So $\\triangle ABD$ has half the area of $\\triangle ABC$.', d: 1, c: 'understanding', t: [2], time: 60 })),
      child('b', mk.num({ stem: 'Find the area of the field $ABC$ in square metres, using Heron\'s formula.', value: 60, sol: r`$s = \dfrac{13 + 13 + 24}{2} = 25$. Area $= \sqrt{25 \times 12 \times 12 \times 1} = \sqrt{3600} = 60$ m$^2$.`, scheme: [['s = 25', 0.5], ['sqrt(3600) = 60', 0.5]], d: 2, c: 'application', t: [2], time: 90 })),
      child('c', mk.short({ marks: 2, stem: r`**(i)** Find the area of the part $ABD$ of the field, and say why.`, model: r`The median $AD$ bisects the area: $BD = DC$ and the height from $A$ is common. So the area of $ABD$ is $\dfrac{60}{2} = 30$ m$^2$.`, sol: 'The median halves the area.', scheme: [['Equal bases and the same height', 1], ['30 m squared', 1]], d: 2, c: 'application', t: [2], time: 90 }), [
        mk.short({ marks: 2, stem: r`**(ii)** In this isosceles triangle $AD$ is perpendicular to $BC$. Find the length of the channel $AD$.`, model: r`$BD = 12$ m and $AB = 13$ m, so $AD = \sqrt{13^2 - 12^2} = \sqrt{25} = 5$ m. Check: $\dfrac{1}{2} \times 24 \times 5 = 60$ m$^2$.`, sol: 'Pythagoras in the right triangle ABD.', scheme: [['AD squared = 13 squared - 12 squared = 25', 1], ['AD = 5 m', 1]], d: 3, c: 'application', t: [2], time: 105 }),
      ]),
    ],
  }, (Cx) => {
    Cx.child('a').which([0.5, 1 / 3, 1, 0.25], polyArea([A.A, A.B, D]) / polyArea([A.A, A.B, A.C]));
    Cx.child('b').val(area);
    Cx.child('c').assert(close(polyArea([A.A, A.B, D]), 30) && close(polyArea([A.A, A.B, A.C]), 60), '30 of 60');
    Cx.child('c').model([60, 30]);
    Cx.child('cii').assert(close(dist(A.A, D), 5) && close(0.5 * 24 * 5, 60), 'AD = 5');
    Cx.child('cii').model([12, 13, 5, 60]);
  });
}
{
  const area = brahma(6, 7, 8, 11);
  caseQ('c04', {
    passage: r`A plot $ABCD$ in a village near Jodhpur has all four corners on the edge of a circular well-field, so it is a cyclic quadrilateral. Its sides are $AB = 6$ m, $BC = 7$ m, $CD = 8$ m and $DA = 11$ m.`,
    d: 3, c: 'application',
    model: r`(a) Option (a). (b) $16$. (c) (i) $60$ m$^2$. Or (ii) $\text{Rs } 9000$.`,
    sol: r`(a) For a cyclic quadrilateral the area is $\sqrt{(s - a)(s - b)(s - c)(s - d)}$. (b) $s = \dfrac{6 + 7 + 8 + 11}{2} = 16$ m. (c) (i) Area $= \sqrt{10 \times 9 \times 8 \times 5} = \sqrt{3600} = 60$ m$^2$. (ii) Cost $= 60 \times 150 = \text{Rs } 9000$.`,
    children: [
      child('a', mk.mcq({ stem: 'Which formula gives the area of this plot from its four sides?', opts: [r`$\sqrt{(s - a)(s - b)(s - c)(s - d)}$`, r`$\sqrt{s(s - a)(s - b)(s - c)}$`, r`$\dfrac{1}{2} \times \text{base} \times \text{height}$`, r`$\pi r^2$`], key: 'a', sol: r`The plot is a cyclic quadrilateral with four sides, so Brahmagupta's formula $\sqrt{(s - a)(s - b)(s - c)(s - d)}$ applies. Heron's formula is for triangles.`, d: 1, c: 'understanding', t: [4], time: 75 })),
      child('b', mk.num({ stem: 'Find the semi-perimeter $s$ of the plot, in metres.', value: 16, sol: r`$s = \dfrac{6 + 7 + 8 + 11}{2} = \dfrac{32}{2} = 16$ m.`, scheme: [['Perimeter 32 m', 0.5], ['s = 16', 0.5]], d: 1, c: 'understanding', t: [4], time: 60 })),
      child('c', mk.short({ marks: 2, stem: r`**(i)** Find the area of the plot.`, model: r`Area $= \sqrt{(16 - 6)(16 - 7)(16 - 8)(16 - 11)} = \sqrt{10 \times 9 \times 8 \times 5} = \sqrt{3600} = 60$ m$^2$.`, sol: 'Brahmagupta with s = 16.', scheme: [['The factors 10, 9, 8, 5', 1], ['Area = 60 m squared', 1]], d: 2, c: 'application', t: [4], time: 90 }), [
        mk.short({ marks: 2, stem: r`**(ii)** The plot is to be levelled at $\text{Rs } 150$ per square metre. Find the cost.`, model: r`The area is $60$ m$^2$, so the cost is $60 \times 150 = \text{Rs } 9000$.`, sol: 'Area times the rate.', scheme: [['Area 60 m squared', 1], ['60 x 150 = 9000 rupees', 1]], d: 2, c: 'application', t: [4], time: 90 }),
      ]),
    ],
  }, (Cx) => {
    Cx.child('a').which([true, false, false, false], true);
    Cx.child('b').val((6 + 7 + 8 + 11) / 2);
    Cx.child('c').assert(10 * 9 * 8 * 5 === 3600 && close(area, 60), '3600 and 60');
    Cx.child('c').model([10, 9, 8, 5, 3600, 60]);
    Cx.child('cii').assert(60 * 150 === 9000, '9000');
    Cx.child('cii').model([60, 9000]);
  });
}
void rd; void circumference;
