// CBSE 10 Mathematics ch11 Areas Related to Circles — practice bank with independent re-solve checks.
// Every number is recomputed from the givens with the value of pi (22/7 or 3.14) and of root 3 (1.73)
// that the stem states; segments use only the syllabus angles 60°, 90° and 120°.
import { Q, caseQ, child, mk, r } from '../../cbse-10-mathematics-ch10/src/lib.mjs';
import { figs } from './figs.mjs';

const P7 = 22 / 7, P3 = 3.14, S3 = 1.73;
const sec = (rr, th, p) => (th / 360) * p * rr * rr;
const arc = (rr, th, p) => (th / 360) * 2 * p * rr;
/** Area of triangle OAB for the syllabus angles (60°, 120°: (√3/4) r²; 90°: r²/2). */
const triA = (rr, th, s3 = S3) => { if (th === 90) return (rr * rr) / 2; if (th === 60 || th === 120) return (s3 / 4) * rr * rr; throw new Error(`angle ${th} not in syllabus`); };
const seg = (rr, th, p, s3 = S3) => sec(rr, th, p) - triA(rr, th, s3);
const R2 = (x) => Math.round(x * 100) / 100;
const R6 = (x) => Math.round(x * 1e6) / 1e6;
const near = (u, v, e = 1e-6) => Math.abs(u - v) < e;

// =============================================================== MCQ
Q('m01', mk.mcq({ stem: r`The area of a sector of angle $\theta$ (in degrees) of a circle of radius $r$ is`, opts: [r`$\dfrac{\theta}{360} \times \pi r^2$`, r`$\dfrac{\theta}{360} \times 2\pi r$`, r`$\dfrac{\theta}{180} \times \pi r^2$`, r`$\dfrac{\theta}{720} \times \pi r^2$`], key: 'a', sol: r`A full turn of $360^\circ$ gives the whole area $\pi r^2$, so an angle $\theta$ gives the fraction $\dfrac{\theta}{360}$ of it. Option (b) is the arc length.`, d: 1, c: 'recall', t: [1], time: 30 }), (C) => { C.assert(near(sec(7, 360, P7), 154) && near(sec(7, 90, P7), 38.5), 'fraction of the circle'); C.key('a'); });
Q('m02', mk.mcq({ stem: r`The length of the arc of a sector of angle $90^\circ$ of a circle of radius $14$ cm is (use $\pi = \dfrac{22}{7}$)`, opts: ['$22$ cm', '$44$ cm', '$154$ cm', '$11$ cm'], key: 'a', sol: r`$l = \dfrac{90}{360} \times 2 \times \dfrac{22}{7} \times 14 = \dfrac14 \times 88 = 22$ cm. Option (b) uses $\dfrac12$ of the circumference; (c) is the area of the sector in cm².`, d: 1, c: 'understanding', t: [1], time: 45 }), (C) => C.which([22, 44, 154, 11], R6(arc(14, 90, P7))));
Q('m03', mk.mcq({ stem: r`The area of a sector of angle $45^\circ$ of a circle of radius $28$ cm is (use $\pi = \dfrac{22}{7}$)`, opts: ['$308$ cm²', '$616$ cm²', '$22$ cm²', '$154$ cm²'], key: 'a', sol: r`$\dfrac{45}{360} \times \dfrac{22}{7} \times 28 \times 28 = \dfrac18 \times 2464 = 308$ cm². Option (b) uses $\dfrac14$ instead of $\dfrac18$; (c) is the arc length.`, d: 2, c: 'understanding', t: [1], time: 60 }), (C) => C.which([308, 616, 22, 154], R6(sec(28, 45, P7))));
Q('m04', mk.mcq({ stem: r`The perimeter of a sector of angle $120^\circ$ of a circle of radius $10.5$ cm is (use $\pi = \dfrac{22}{7}$)`, opts: ['$43$ cm', '$22$ cm', '$32.5$ cm', '$115.5$ cm'], key: 'a', sol: r`**Step 1.** Arc $= \dfrac{120}{360} \times 2 \times \dfrac{22}{7} \times 10.5 = \dfrac13 \times 66 = 22$ cm.

**Step 2.** Perimeter $= $ arc $+ 2r = 22 + 21 = 43$ cm.

Option (b) forgets the two radii; (c) adds only one radius; (d) is the area in cm².`, d: 3, c: 'application', t: [1], time: 90 }), (C) => { C.which([43, 22, 32.5, 115.5], R6(arc(10.5, 120, P7) + 21)); C.assert(near(sec(10.5, 120, P7), 115.5), 'distractor (d) is the area'); });
Q('m05', mk.mcq({ stem: 'The angle turned by the minute hand of a clock in 20 minutes is', opts: [r`$120^\circ$`, r`$20^\circ$`, r`$60^\circ$`, r`$240^\circ$`], key: 'a', sol: r`The minute hand turns $360^\circ$ in $60$ minutes, i.e. $6^\circ$ per minute. In $20$ minutes: $20 \times 6 = 120^\circ$.`, d: 1, c: 'understanding', t: [1], time: 45 }), (C) => C.which([120, 20, 60, 240], (360 / 60) * 20));
Q('m06', mk.mcq({ stem: r`A sector of a circle of radius $r$ has arc length $l$. Its area is`, opts: [r`$lr$`, r`$\dfrac12 lr$`, r`$2lr$`, r`$\dfrac12 l^2 r$`], key: 'b', sol: r`Area $= \dfrac{\theta}{360}\pi r^2 = \dfrac12 r \times \left(\dfrac{\theta}{360} \times 2\pi r\right) = \dfrac12 lr$ — like a triangle with base $l$ and height $r$.`, d: 2, c: 'understanding', t: [1], time: 60 }), (C) => { const [rr, th] = [7, 72]; const l = arc(rr, th, P7); C.which([l * rr, 0.5 * l * rr, 2 * l * rr, 0.5 * l * l * rr].map(R6), R6(sec(rr, th, P7))); });
Q('m07', mk.mcq({ stem: 'The area of a sector is one-fifth of the area of its circle. The angle of the sector is', opts: [r`$72^\circ$`, r`$36^\circ$`, r`$18^\circ$`, r`$60^\circ$`], key: 'a', sol: r`$\dfrac{\theta}{360} = \dfrac15$, so $\theta = 72^\circ$.`, d: 1, c: 'understanding', t: [1], time: 45 }), (C) => C.which([72, 36, 18, 60], 360 / 5));
Q('m08', mk.mcq({ stem: 'Two sectors have the same central angle, in circles of radii 3 cm and 6 cm. The ratio of their areas is', opts: ['$1 : 4$', '$1 : 2$', '$2 : 1$', '$1 : 8$'], key: 'a', sol: r`For the same angle, area $\propto r^2$: $3^2 : 6^2 = 9 : 36 = 1 : 4$. Option (b) is the ratio of the arc lengths.`, d: 2, c: 'understanding', t: [1], time: 60 }), (C) => C.which([1 / 4, 1 / 2, 2, 1 / 8], R6(sec(3, 50, P3) / sec(6, 50, P3))));
Q('m09', mk.mcq({ stem: r`The area of a circle is $154$ cm². The area of a sector of this circle with angle $72^\circ$ is`, opts: ['$30.8$ cm²', '$61.6$ cm²', '$15.4$ cm²', '$77$ cm²'], key: 'a', sol: r`$\dfrac{72}{360} \times 154 = \dfrac15 \times 154 = 30.8$ cm².`, d: 2, c: 'understanding', t: [1], time: 45 }), (C) => C.which([30.8, 61.6, 15.4, 77], R6((72 / 360) * 154)));
Q('m10', mk.mcq({ stem: r`A chord of a circle of radius $14$ cm subtends a right angle at the centre. The area of the minor segment is (use $\pi = \dfrac{22}{7}$)`, opts: ['$56$ cm²', '$154$ cm²', '$98$ cm²', '$560$ cm²'], key: 'a', sol: r`**Step 1.** Sector $= \dfrac14 \times \dfrac{22}{7} \times 196 = 154$ cm².

**Step 2.** $\triangle OAB = \dfrac12 \times 14 \times 14 = 98$ cm².

**Step 3.** Segment $= 154 - 98 = 56$ cm². Option (b) is the sector, (c) the triangle, (d) the major segment.`, d: 2, c: 'application', t: [2], time: 90 }), (C) => C.which([56, 154, 98, 560], R6(seg(14, 90, P7))));
Q('m11', mk.mcq({ stem: r`The area of the minor segment of a circle of radius $r$ cut off by a chord that subtends $90^\circ$ at the centre is`, opts: [r`$\left(\dfrac{\pi}{4} - \dfrac12\right) r^2$`, r`$\left(\dfrac{\pi}{2} - 1\right) r^2$`, r`$\dfrac{\pi r^2}{4}$`, r`$\left(\dfrac{\pi}{4} - \dfrac{\sqrt3}{4}\right) r^2$`], key: 'a', sol: r`Sector $\dfrac{\pi r^2}{4}$ minus right triangle $\dfrac12 r^2$. Option (d) uses the triangle for $60^\circ$; (c) forgets the triangle.`, d: 2, c: 'understanding', t: [2], time: 60 }), (C) => { const rr = 10; C.which([(Math.PI / 4 - 0.5) * rr * rr, (Math.PI / 2 - 1) * rr * rr, (Math.PI * rr * rr) / 4, (Math.PI / 4 - Math.sqrt(3) / 4) * rr * rr].map(R6), R6(seg(rr, 90, Math.PI))); });
Q('m12', mk.mcq({ stem: r`A chord $AB$ of a circle with centre $O$ and radius $10$ cm subtends $60^\circ$ at $O$. The area of $\triangle OAB$ is`, opts: [r`$25\sqrt3$ cm²`, '$50$ cm²', r`$50\sqrt3$ cm²`, r`$100\sqrt3$ cm²`], key: 'a', sol: r`$OA = OB$ and $\angle AOB = 60^\circ$, so $\triangle OAB$ is equilateral with side $10$ cm: area $= \dfrac{\sqrt3}{4} \times 10^2 = 25\sqrt3$ cm². Option (b) uses the right-triangle formula $\dfrac12 r^2$.`, d: 2, c: 'understanding', t: [2], time: 60 }), (C) => C.which([25 * Math.sqrt(3), 50, 50 * Math.sqrt(3), 100 * Math.sqrt(3)].map(R6), R6(triA(10, 60, Math.sqrt(3)))));
Q('m13', mk.mcq({ stem: r`In a circle of radius $14$ cm, the minor segment cut off by a chord has area $56$ cm². The area of the major segment is (use $\pi = \dfrac{22}{7}$)`, opts: ['$560$ cm²', '$504$ cm²', '$672$ cm²', '$462$ cm²'], key: 'a', sol: r`Circle $= \dfrac{22}{7} \times 14 \times 14 = 616$ cm². Major segment $= 616 - 56 = 560$ cm². Option (c) adds instead of subtracting; (d) is the major sector of a $90^\circ$ chord, which still contains the triangle.`, d: 2, c: 'application', t: [2], time: 60 }), (C) => C.which([560, 504, 672, 462], R6(P7 * 196 - 56)));
Q('m14', mk.mcq({ stem: r`A square is inscribed in a circle of radius $7$ cm. The area of the region inside the circle but outside the square is (use $\pi = \dfrac{22}{7}$)`, opts: ['$56$ cm²', '$105$ cm²', '$98$ cm²', '$154$ cm²'], key: 'a', sol: r`The diagonal of the square is the diameter, $14$ cm, so its area is $\dfrac12 \times 14^2 = 98$ cm². Circle $= 154$ cm². Region $= 154 - 98 = 56$ cm² (four $90^\circ$ segments). Option (b) wrongly takes the side of the square as $7$ cm.`, d: 3, c: 'application', t: [3], time: 90 }), (C) => { C.which([56, 105, 98, 154], R6(P7 * 49 - 196 / 2)); C.assert(near(4 * seg(7, 90, P7), 56), 'four quadrant segments'); });
Q('m15', mk.mcq({ stem: r`The area of the ring between two concentric circles of radii $14$ cm and $7$ cm is (use $\pi = \dfrac{22}{7}$)`, opts: ['$462$ cm²', '$154$ cm²', '$308$ cm²', '$770$ cm²'], key: 'a', sol: r`$\pi(R^2 - r^2) = \dfrac{22}{7}(196 - 49) = \dfrac{22}{7} \times 147 = 462$ cm². Option (b) uses $\pi(R - r)^2$; (d) adds the areas.`, d: 2, c: 'application', t: [3], time: 60 }), (C) => C.which([462, 154, 308, 770], R6(P7 * (196 - 49))));
Q('m16', mk.mcq({ stem: r`From each corner of a square sheet of side $14$ cm, a quadrant of radius $7$ cm is cut off. The area of the remaining sheet is (use $\pi = \dfrac{22}{7}$)`, opts: ['$42$ cm²', '$154$ cm²', '$196$ cm²', '$140$ cm²'], key: 'a', sol: r`The four quadrants together make one circle of radius $7$ cm: $154$ cm². Remaining $= 196 - 154 = 42$ cm².`, d: 2, c: 'application', t: [3], time: 75 }), (C) => C.which([42, 154, 196, 140], R6(196 - 4 * sec(7, 90, P7))));
Q('m17', mk.mcq({ stem: r`A wheel of radius $35$ cm rolls without slipping. How many complete revolutions does it make in covering $1.1$ km? (use $\pi = \dfrac{22}{7}$)`, opts: ['$500$', '$250$', '$1000$', '$50$'], key: 'a', sol: r`Circumference $= 2 \times \dfrac{22}{7} \times 35 = 220$ cm. $1.1$ km $= 110000$ cm. Revolutions $= \dfrac{110000}{220} = 500$. Option (c) uses the radius instead of the diameter; (d) forgets to convert km to cm properly.`, d: 3, c: 'application', t: [3], time: 90 }), (C) => C.which([500, 250, 1000, 50], R6(110000 / (2 * P7 * 35))));
Q('m18', mk.mcq({ stem: 'The circumference and the area of a circle are numerically equal. The radius of the circle is', opts: ['$2$ units', '$4$ units', '$1$ unit', r`$\pi$ units`], key: 'a', sol: r`$2\pi r = \pi r^2 \Rightarrow r^2 - 2r = 0 \Rightarrow r(r - 2) = 0$, and $r \ne 0$, so $r = 2$ units.`, d: 3, c: 'analysis', t: [3], time: 75 }), (C) => { const ok = [2, 4, 1, Math.PI].map((rr) => near(2 * Math.PI * rr, Math.PI * rr * rr)); C.which(ok, true); });

// =============================================================== Assertion-reason (keys a b c d a d)
Q('ar1', mk.ar({ a: r`The area of a sector of angle $90^\circ$ is one-quarter of the area of the circle.`, r: r`The area of a sector of angle $\theta$ is $\dfrac{\theta}{360} \times \pi r^2$.`, key: 'a', sol: r`By R, $\theta = 90^\circ$ gives $\dfrac{90}{360} = \dfrac14$ of $\pi r^2$. R explains A.`, d: 1, c: 'understanding', t: [1] }), (C) => { C.assert(near(sec(5, 90, P3) * 4, P3 * 25), 'quarter'); C.key('a'); });
Q('ar2', mk.ar({ a: r`The minor segment of a circle of radius $14$ cm cut off by a chord subtending $90^\circ$ at the centre has area $56$ cm² (use $\pi = \dfrac{22}{7}$).`, r: 'The area of the major segment is the area of the circle minus the area of the minor segment.', key: 'b', sol: r`A: $154 - 98 = 56$ cm² — true. R is true, but A is found as sector minus triangle; R (about the major segment) does not explain it.`, d: 2, c: 'understanding', t: [2] }), (C) => { C.assert(near(seg(14, 90, P7), 56), '56'); C.key('b'); });
Q('ar3', mk.ar({ a: r`The arc of a sector of angle $60^\circ$ in a circle of radius $21$ cm is $22$ cm long (use $\pi = \dfrac{22}{7}$).`, r: r`The arc length of a sector of angle $\theta$ is $\dfrac{\theta}{360} \times \pi r^2$.`, key: 'c', sol: r`A: $\dfrac16 \times 2 \times \dfrac{22}{7} \times 21 = 22$ cm — true. R is false: $\dfrac{\theta}{360} \times \pi r^2$ is the **area** of the sector; the arc length is $\dfrac{\theta}{360} \times 2\pi r$.`, d: 2, c: 'understanding', t: [1] }), (C) => { C.assert(near(arc(21, 60, P7), 22), '22'); C.key('c'); });
Q('ar4', mk.ar({ a: 'If the radius of a circle is doubled, the area of a sector with the same angle is also doubled.', r: 'For a fixed angle, the area of a sector is proportional to the square of the radius.', key: 'd', sol: r`By R, doubling $r$ multiplies the area by $2^2 = 4$, not $2$. A is false, R is true.`, d: 2, c: 'understanding', t: [1] }), (C) => { C.assert(near(sec(10, 40, P3) / sec(5, 40, P3), 4), 'four times'); C.key('d'); });
Q('ar5', mk.ar({ a: r`For a chord subtending $60^\circ$ at the centre, the area of the minor segment is $\left(\dfrac{\pi}{6} - \dfrac{\sqrt3}{4}\right) r^2$.`, r: r`When the central angle is $60^\circ$, the triangle formed by the chord and the two radii is equilateral.`, key: 'a', sol: r`Sector $= \dfrac{\pi r^2}{6}$. By R, $\triangle OAB$ is equilateral with side $r$, area $\dfrac{\sqrt3}{4}r^2$. Subtracting gives A, so R explains A.`, d: 3, c: 'analysis', t: [2] }), (C) => { const rr = 6; C.assert(near((Math.PI / 6 - Math.sqrt(3) / 4) * rr * rr, seg(rr, 60, Math.PI, Math.sqrt(3))), 'formula'); C.key('a'); });
Q('ar6', mk.ar({ a: r`The area of the region between a square of side $14$ cm and the circle inscribed in it is $56$ cm² (use $\pi = \dfrac{22}{7}$).`, r: 'The diameter of the circle inscribed in a square is equal to the side of the square.', key: 'd', sol: r`By R the circle has radius $7$ cm and area $154$ cm², so the region is $196 - 154 = 42$ cm², not $56$ cm² ($56$ cm² is the region between a circle of radius $7$ and its **inscribed** square). A is false, R is true.`, d: 3, c: 'analysis', t: [3] }), (C) => { C.assert(near(196 - P7 * 49, 42), '42'); C.key('d'); });

// =============================================================== True / false
Q('tf1', mk.tf({ stem: r`The area of a sector of angle $180^\circ$ is half the area of the circle.`, key: 't', sol: r`$\dfrac{180}{360} = \dfrac12$: a sector of $180^\circ$ is a semicircle.`, d: 1, c: 'recall', t: [1] }), (C) => { C.assert(near(sec(7, 180, P7), 77), '77 = half of 154'); C.key('t'); });
Q('tf2', mk.tf({ stem: r`The arc length of a sector of angle $\theta$ is $\dfrac{\theta}{360} \times \pi r^2$.`, key: 'f', sol: r`That is the **area** of the sector. The arc length is $\dfrac{\theta}{360} \times 2\pi r$.`, d: 1, c: 'recall', t: [1] }), (C) => C.key('f'));
Q('tf3', mk.tf({ stem: 'Area of a minor segment = area of the corresponding sector − area of the triangle formed by the two radii and the chord.', key: 't', sol: r`The sector is made of the triangle $OAB$ and the segment, so the segment is the sector minus the triangle.`, d: 1, c: 'recall', t: [2] }), (C) => { C.assert(near(seg(14, 90, P7) + triA(14, 90), sec(14, 90, P7)), 'decomposition'); C.key('t'); });
Q('tf4', mk.tf({ stem: r`If the arc of a sector of a circle of radius $7$ cm is $22$ cm long, the angle of the sector is $90^\circ$ (use $\pi = \dfrac{22}{7}$).`, key: 'f', sol: r`Circumference $= 44$ cm, so $\dfrac{\theta}{360} = \dfrac{22}{44} = \dfrac12$ and $\theta = 180^\circ$, not $90^\circ$.`, d: 2, c: 'understanding', t: [1] }), (C) => { C.assert(near((22 / (2 * P7 * 7)) * 360, 180), '180'); C.key('f'); });
Q('tf5', mk.tf({ stem: 'In 15 minutes, the minute hand of a clock sweeps a quadrant of the circle whose radius is the length of the hand.', key: 't', sol: r`$15 \times 6^\circ = 90^\circ$, which is a quadrant.`, d: 2, c: 'understanding', t: [1] }), (C) => { C.assert(15 * 6 === 90, '90'); C.key('t'); });

// =============================================================== Fill in the blank
Q('fb1', mk.fill({ stem: r`A sector of a circle with central angle $90^\circ$ is called a ___.`, acc: [['quadrant']], sol: 'A quarter of a circle is a **quadrant**.', d: 1, c: 'recall', t: [1] }), (C) => C.blank('quadrant'));
Q('fb2', mk.fill({ stem: r`The minute hand of a wall clock is $6$ cm long. In $10$ minutes its tip sweeps out a region of area ___ $\pi$ cm².`, acc: [['6']], sol: r`In $10$ minutes the minute hand turns $10 \times 6^\circ = 60^\circ$. The region swept is a sector of radius $6$ cm: $\dfrac{60}{360} \times \pi \times 36 = 6\pi$ cm².`, d: 2, c: 'application', t: [1] }), (C) => C.blank(((10 * 6) / 360) * 36));
Q('fb3', mk.fill({ stem: 'The region between a chord and the minor arc it cuts off is called the minor ___.', acc: [['segment']], sol: 'It is the **minor segment** (the rest of the circle is the major segment).', d: 1, c: 'recall', t: [2] }), (C) => C.blank('segment'));
Q('fb4', mk.fill({ stem: 'A sector has area 77 cm² and its circle has area 308 cm². The angle of the sector is ___ degrees.', acc: [['90', '90°']], sol: r`$\dfrac{\theta}{360} = \dfrac{77}{308} = \dfrac14$, so $\theta = 90^\circ$.`, d: 2, c: 'understanding', t: [1] }), (C) => C.blank((77 / 308) * 360));
Q('fb5', mk.fill({ stem: r`The length of the arc of a semicircle of radius $7$ cm is ___ cm (use $\pi = \dfrac{22}{7}$).`, acc: [['22']], sol: r`$\dfrac{180}{360} \times 2 \times \dfrac{22}{7} \times 7 = 22$ cm.`, d: 1, c: 'understanding', t: [1] }), (C) => C.blank(R6(arc(7, 180, P7))));

// =============================================================== Numerical
Q('n01', mk.num({ stem: r`Find the area (in cm²) of a sector of angle $40^\circ$ of a circle of radius $10.5$ cm. Use $\pi = \dfrac{22}{7}$.`, value: 38.5, unit: 'cm²', marks: 2, sol: r`**Step 1.** $A = \dfrac{\theta}{360} \times \pi r^2$.

**Step 2.** $A = \dfrac{40}{360} \times \dfrac{22}{7} \times 10.5 \times 10.5 = \dfrac19 \times 346.5 = 38.5$ cm².`, scheme: [['Formula with θ/360', 1], ['38.5 cm²', 1]], d: 2, c: 'understanding', t: [1], time: 90 }), (C) => C.val(R6(sec(10.5, 40, P7))));
Q('n02', mk.num({ stem: r`Find the length (in cm) of the arc of a sector of angle $135^\circ$ of a circle of radius $28$ cm. Use $\pi = \dfrac{22}{7}$.`, value: 66, unit: 'cm', marks: 2, sol: r`**Step 1.** $l = \dfrac{\theta}{360} \times 2\pi r$.

**Step 2.** $l = \dfrac{135}{360} \times 2 \times \dfrac{22}{7} \times 28 = \dfrac38 \times 176 = 66$ cm.`, scheme: [['Formula with θ/360 and 2πr', 1], ['66 cm', 1]], d: 2, c: 'understanding', t: [1], time: 90 }), (C) => C.val(R6(arc(28, 135, P7))));
Q('n03', mk.num({ stem: r`A rotating garden sprinkler in a Bengaluru park waters a sector of angle $150^\circ$ and radius $12$ m. Find the area watered, in m². Use $\pi = 3.14$.`, value: 188.4, unit: 'm²', marks: 2, sol: r`**Step 1.** The watered region is a sector.

**Step 2.** $A = \dfrac{150}{360} \times 3.14 \times 12 \times 12 = \dfrac{5}{12} \times 452.16 = 188.4$ m².`, scheme: [['Sector formula', 1], ['188.4 m²', 1]], d: 2, c: 'application', t: [1], time: 90 }), (C) => { C.val(R6(sec(12, 150, P3))); C.sol([452.16]); });
Q('n04', mk.num({ stem: r`The bob of a pendulum $42$ cm long swings through an arc of length $33$ cm. Find the angle (in degrees) through which it swings. Use $\pi = \dfrac{22}{7}$.`, value: 45, unit: '°', marks: 2, sol: r`**Step 1.** Circumference of the circle traced: $2 \times \dfrac{22}{7} \times 42 = 264$ cm.

**Step 2.** $\dfrac{\theta}{360} = \dfrac{33}{264} = \dfrac18$, so $\theta = 45^\circ$.`, scheme: [['Arc as a fraction of 264 cm', 1], ['45°', 1]], d: 3, c: 'application', t: [1], time: 120 }), (C) => { C.val(R6((33 / (2 * P7 * 42)) * 360)); C.sol([264]); });
Q('n05', mk.num({ stem: r`A chord of a circle of radius $20$ cm subtends a right angle at the centre. Find the area (in cm²) of the minor segment. Use $\pi = 3.14$.`, value: 114, unit: 'cm²', marks: 2, sol: r`**Step 1.** Sector $= \dfrac14 \times 3.14 \times 400 = 314$ cm²; $\triangle OAB = \dfrac12 \times 20 \times 20 = 200$ cm².

**Step 2.** Segment $= 314 - 200 = 114$ cm².`, scheme: [['Sector 314 and triangle 200', 1], ['114 cm²', 1]], d: 2, c: 'understanding', t: [2], time: 120 }), (C) => { C.val(R6(seg(20, 90, P3))); C.sol([314, 200]); });
Q('n06', mk.num({ stem: r`A chord of a circle of radius $6$ cm subtends an angle of $60^\circ$ at the centre. Find the area (in cm²) of the minor segment. Use $\pi = 3.14$ and $\sqrt3 = 1.73$.`, value: 3.27, unit: 'cm²', tol: 0.005, marks: 2, sol: r`**Step 1.** Sector $= \dfrac16 \times 3.14 \times 36 = 18.84$ cm².

**Step 2.** $\triangle OAB$ is equilateral: $\dfrac{1.73}{4} \times 36 = 15.57$ cm².

**Step 3.** Segment $= 18.84 - 15.57 = 3.27$ cm².`, scheme: [['Sector 18.84 and triangle 15.57', 1], ['3.27 cm²', 1]], d: 3, c: 'application', t: [2], time: 150 }), (C) => { C.val(R2(seg(6, 60, P3)), 0.005); C.sol([18.84, 15.57]); });
Q('n07', mk.num({ stem: r`The minute hand of a clock in a Kochi railway station is $10.5$ cm long. Find the area (in cm²) it sweeps in $20$ minutes. Use $\pi = \dfrac{22}{7}$.`, value: 115.5, unit: 'cm²', marks: 2, sol: r`**Step 1.** In $20$ minutes the hand turns $20 \times 6^\circ = 120^\circ$.

**Step 2.** Area $= \dfrac{120}{360} \times \dfrac{22}{7} \times 10.5 \times 10.5 = \dfrac13 \times 346.5 = 115.5$ cm².`, scheme: [['Angle 120°', 1], ['115.5 cm²', 1]], d: 2, c: 'application', t: [1], time: 120 }), (C) => C.val(R6(sec(10.5, 20 * 6, P7))));
Q('n08', mk.num({ stem: r`The wheels of a bicycle have radius $35$ cm and make $120$ revolutions per minute. Find the speed of the bicycle in km/h. Use $\pi = \dfrac{22}{7}$.`, value: 15.84, unit: 'km/h', tol: 0.005, marks: 2, sol: r`**Step 1.** One revolution covers the circumference: $2 \times \dfrac{22}{7} \times 35 = 220$ cm. In one minute: $120 \times 220 = 26400$ cm $= 0.264$ km.

**Step 2.** In one hour: $0.264 \times 60 = 15.84$ km, so the speed is $15.84$ km/h.`, scheme: [['Distance per minute 26400 cm', 1], ['15.84 km/h', 1]], d: 4, c: 'application', t: [3], time: 180 }), (C) => { C.val(R6(((120 * 2 * P7 * 35) / 100000) * 60), 0.005); C.sol([220, 26400, 0.264]); });
Q('n09', mk.num({ stem: r`A circular pond in Udaipur has radius $7$ m. A path $3.5$ m wide is built around it. Find the area of the path in m². Use $\pi = \dfrac{22}{7}$.`, value: 192.5, unit: 'm²', marks: 2, sol: r`**Step 1.** Outer radius $= 7 + 3.5 = 10.5$ m.

**Step 2.** Path $= \pi(R^2 - r^2) = \dfrac{22}{7}(110.25 - 49) = \dfrac{22}{7} \times 61.25 = 192.5$ m².`, scheme: [['Outer radius 10.5 m and ring formula', 1], ['192.5 m²', 1]], d: 3, c: 'application', t: [3], time: 150 }), (C) => C.val(R6(P7 * (10.5 ** 2 - 49))));

// =============================================================== Short answer, 2 marks
Q('s201', mk.short({ marks: 2, stem: r`Find the area of a sector of angle $72^\circ$ of a circle of radius $35$ cm, and the length of its arc. Use $\pi = \dfrac{22}{7}$.`, model: r`$\dfrac{72}{360} = \dfrac15$.

Area $= \dfrac15 \times \dfrac{22}{7} \times 35 \times 35 = \dfrac15 \times 3850 = 770$ cm².

Arc $= \dfrac15 \times 2 \times \dfrac{22}{7} \times 35 = \dfrac15 \times 220 = 44$ cm.`, sol: r`Check: area $= \dfrac12 lr = \dfrac12 \times 44 \times 35 = 770$ ✓.`, scheme: [['Area 770 cm²', 1], ['Arc 44 cm', 1]], d: 2, c: 'understanding', t: [1], time: 120 }), (C) => { C.assert(near(sec(35, 72, P7), 770) && near(arc(35, 72, P7), 44), 'values'); C.model([3850, 770, 220, 44]); });
Q('s202', mk.short({ marks: 2, stem: r`An arc of a circle of radius $21$ cm is $33$ cm long. Find the angle it subtends at the centre and the area of the sector. Use $\pi = \dfrac{22}{7}$.`, model: r`Circumference $= 2 \times \dfrac{22}{7} \times 21 = 132$ cm. $\dfrac{\theta}{360} = \dfrac{33}{132} = \dfrac14$, so $\theta = 90^\circ$.

Area $= \dfrac14 \times \dfrac{22}{7} \times 21 \times 21 = \dfrac14 \times 1386 = 346.5$ cm².`, sol: r`Check: $\dfrac12 lr = \dfrac12 \times 33 \times 21 = 346.5$ ✓.`, scheme: [['θ = 90°', 1], ['Area 346.5 cm²', 1]], d: 2, c: 'application', t: [1], time: 120 }), (C) => { const th = (33 / arc(21, 360, P7)) * 360; C.assert(near(th, 90) && near(sec(21, th, P7), 346.5) && near(0.5 * 33 * 21, 346.5), 'values'); C.model([132, 90, 1386, 346.5]); });
Q('s203', mk.short({ marks: 2, stem: r`A chord of a circle of radius $7$ cm subtends a right angle at the centre. Find the areas of the minor and the major segments. Use $\pi = \dfrac{22}{7}$.`, model: r`Sector $= \dfrac14 \times \dfrac{22}{7} \times 49 = 38.5$ cm²; $\triangle OAB = \dfrac12 \times 7 \times 7 = 24.5$ cm².

Minor segment $= 38.5 - 24.5 = 14$ cm². Circle $= 154$ cm², so the major segment $= 154 - 14 = 140$ cm².`, sol: 'Minor segment = sector − triangle; major segment = circle − minor segment.', scheme: [['Minor segment 14 cm²', 1], ['Major segment 140 cm²', 1]], d: 2, c: 'understanding', t: [2], time: 120 }), (C) => { C.assert(near(seg(7, 90, P7), 14), '14'); C.model([38.5, 24.5, 14, 154, 140]); });
Q('s204', mk.short({ marks: 2, stem: r`The area of a sector of a circle of radius $10$ cm is $\dfrac{3}{10}$ of the area of the circle. Find the angle of the sector and its area. Use $\pi = 3.14$.`, model: r`$\dfrac{\theta}{360} = \dfrac{3}{10}$, so $\theta = 108^\circ$.

Area $= \dfrac{3}{10} \times 3.14 \times 100 = 94.2$ cm².`, sol: 'The fraction of the circle is θ/360.', scheme: [['θ = 108°', 1], ['94.2 cm²', 1]], d: 2, c: 'understanding', t: [1], time: 90 }), (C) => { C.assert(near(sec(10, 108, P3), 94.2), '94.2'); C.model([108, 94.2]); });
Q('s205', mk.short({ marks: 2, stem: r`Kavya finds the area of a sector of angle $45^\circ$ of a circle of radius $14$ cm like this: "$\dfrac{45}{360} \times 2 \times \dfrac{22}{7} \times 14 = 11$ cm²." Find her mistake and the correct area.`, model: r`She used $2\pi r$, the circumference, so $11$ is the **arc length in cm**, not an area.

Correct area $= \dfrac{45}{360} \times \dfrac{22}{7} \times 14 \times 14 = \dfrac18 \times 616 = 77$ cm².`, sol: 'Area uses πr²; arc length uses 2πr. Check the units: cm² needs a length times a length.', scheme: [['Identifies 2πr used instead of πr²', 1], ['77 cm²', 1]], d: 2, c: 'evaluation', t: [1], time: 120 }), (C) => { C.assert(near(arc(14, 45, P7), 11) && near(sec(14, 45, P7), 77), 'values'); C.model([11, 616, 77]); });
Q('s206', mk.short({ marks: 2, stem: r`A sector of angle $80^\circ$ is cut from a circle of radius $6$ cm. A sector of a circle of radius $4$ cm has the same area. Find its angle.`, model: r`$\dfrac{80}{360}\pi \times 36 = \dfrac{\theta}{360}\pi \times 16$, so $80 \times 36 = 16\theta$.

$\theta = \dfrac{2880}{16} = 180^\circ$: the second sector is a semicircle.`, sol: 'π and 360 cancel, so θ × r² stays the same.', scheme: [['Equation 80 × 36 = 16θ', 1], ['θ = 180°', 1]], d: 3, c: 'analysis', t: [1], time: 120 }), (C) => { const th = (80 * 36) / 16; C.assert(near(sec(6, 80, P3), sec(4, th, P3)), 'equal areas'); C.model([2880, 180]); });
Q('s207', mk.short({ marks: 2, stem: r`A circular steel plate of radius $14$ cm has four circular holes, each of radius $3.5$ cm, punched in it. Find the area of the remaining plate. Use $\pi = \dfrac{22}{7}$.`, model: r`Plate $= \dfrac{22}{7} \times 14 \times 14 = 616$ cm². One hole $= \dfrac{22}{7} \times 3.5 \times 3.5 = 38.5$ cm²; four holes $= 154$ cm².

Remaining $= 616 - 154 = 462$ cm².`, sol: 'Whole minus the parts removed.', scheme: [['Plate 616 and holes 154', 1], ['462 cm²', 1]], d: 2, c: 'application', t: [3], time: 120 }), (C) => { C.assert(near(P7 * 196 - 4 * P7 * 12.25, 462), '462'); C.model([616, 38.5, 154, 462]); });
Q('s208', mk.short({ marks: 2, stem: r`Find the perimeter and the area of a quadrant of a circle of radius $14$ cm. Use $\pi = \dfrac{22}{7}$.`, model: r`Arc $= \dfrac14 \times 2 \times \dfrac{22}{7} \times 14 = 22$ cm, so the perimeter $= 22 + 14 + 14 = 50$ cm.

Area $= \dfrac14 \times \dfrac{22}{7} \times 196 = 154$ cm².`, sol: 'The perimeter of a sector includes the two radii.', scheme: [['Perimeter 50 cm', 1], ['Area 154 cm²', 1]], d: 2, c: 'understanding', t: [1], time: 90 }), (C) => { C.assert(near(arc(14, 90, P7) + 28, 50) && near(sec(14, 90, P7), 154), 'values'); C.model([22, 50, 154]); });
Q('s209', mk.short({ marks: 2, stem: r`In a circle of radius $21$ cm, an arc subtends an angle of $60^\circ$ at the centre. Find (a) the length of the arc (b) the area of the minor segment cut off by its chord. Use $\pi = \dfrac{22}{7}$ and $\sqrt3 = 1.73$.`, model: r`(a) Arc $= \dfrac16 \times 2 \times \dfrac{22}{7} \times 21 = 22$ cm.

(b) Sector $= \dfrac16 \times \dfrac{22}{7} \times 441 = 231$ cm². $\triangle OAB$ is equilateral: $\dfrac{1.73}{4} \times 441 = 190.7325$ cm². Segment $= 231 - 190.7325 = 40.2675 \approx 40.27$ cm².`, sol: 'For 60° the triangle formed by the radii and the chord is equilateral.', scheme: [['Arc 22 cm', 1], ['Segment ≈ 40.27 cm²', 1]], d: 3, c: 'application', t: [1, 2], time: 150 }), (C) => { C.assert(near(arc(21, 60, P7), 22) && near(seg(21, 60, P7), 40.2675), 'values'); C.model([22, 231, 190.7325, 40.27]); });

// =============================================================== Short answer, 3 marks
Q('s301', mk.short({ marks: 3, stem: r`A cricket ground in Kolkata is a circle of radius $70$ m. The sight-screen stands on the boundary along an arc that subtends $18^\circ$ at the centre of the ground. Find (a) the length of this arc (b) the area of the sector of the ground in front of it. Use $\pi = \dfrac{22}{7}$.`, model: r`$\dfrac{18}{360} = \dfrac{1}{20}$.

(a) Arc $= \dfrac{1}{20} \times 2 \times \dfrac{22}{7} \times 70 = \dfrac{1}{20} \times 440 = 22$ m.

(b) Area $= \dfrac{1}{20} \times \dfrac{22}{7} \times 70 \times 70 = \dfrac{1}{20} \times 15400 = 770$ m².`, sol: r`Check: $\dfrac12 lr = \dfrac12 \times 22 \times 70 = 770$ ✓.`, scheme: [['Fraction 1/20', 1], ['Arc 22 m', 1], ['Area 770 m²', 1]], d: 2, c: 'application', t: [1], time: 240 }), (C) => { C.assert(near(arc(70, 18, P7), 22) && near(sec(70, 18, P7), 770), 'values'); C.model([440, 22, 15400, 770]); });
Q('s302', mk.short({ marks: 3, stem: r`A chord of a circle of radius $12$ cm subtends an angle of $120^\circ$ at the centre. Find the area of the minor segment. Use $\pi = 3.14$ and $\sqrt3 = 1.73$.`, model: r`Sector $= \dfrac{120}{360} \times 3.14 \times 144 = 150.72$ cm².

Draw $OM \perp AB$. In $\triangle OAB$, $\angle OAB = 30^\circ$, so $OM = \dfrac{r}{2} = 6$ cm and $AM = \dfrac{\sqrt3}{2}r = 6\sqrt3$ cm. Area $= \dfrac12 \times AB \times OM = \dfrac12 \times 12\sqrt3 \times 6 = 36\sqrt3 = 36 \times 1.73 = 62.28$ cm².

Segment $= 150.72 - 62.28 = 88.44$ cm².`, sol: r`For $120^\circ$, $\triangle OAB$ has area $\dfrac{\sqrt3}{4}r^2$, the same as for $60^\circ$.`, scheme: [['Sector 150.72 cm²', 1], ['Triangle 62.28 cm² (with OM = 6, AB = 12√3)', 1], ['Segment 88.44 cm²', 1]], d: 3, c: 'application', t: [2], time: 270 }), (C) => { C.assert(near(seg(12, 120, P3), 88.44), '88.44'); const h = 12 * Math.cos(Math.PI / 3), half = 12 * Math.sin(Math.PI / 3); C.assert(near(h, 6) && near(half * h, 36 * Math.sqrt(3)), 'triangle by OM'); C.model([150.72, 62.28, 88.44]); });
Q('s303', mk.short({ marks: 3, stem: r`A square tile of side $20$ cm has a semicircle drawn inwards on each of two opposite sides (the sides are the diameters). The two semicircles are painted. Find the area of the tile that is **not** painted. Use $\pi = 3.14$.`, assets: [figs.tile2], model: r`Each semicircle has radius $10$ cm and area $\dfrac12 \times 3.14 \times 100 = 157$ cm². Two semicircles: $314$ cm².

The semicircles just touch at the centre of the tile (each reaches $10$ cm in), so they do not overlap.

Unpainted area $= 400 - 314 = 86$ cm².`, sol: 'Whole square minus two semicircles (which together make one full circle).', scheme: [['One semicircle 157 cm²', 1], ['No overlap, total 314 cm²', 1], ['86 cm²', 1]], d: 3, c: 'application', t: [3], time: 240 }), (C) => { C.assert(near(400 - 2 * 0.5 * P3 * 100, 86), '86'); C.model([157, 314, 86]); });
Q('s304', mk.short({ marks: 3, stem: r`A wall clock has an hour hand $6$ cm long and a minute hand $10$ cm long. Between $9{:}00$ a.m. and $9{:}30$ a.m., find (a) the area swept by the minute hand (b) the distance moved by the tip of the hour hand. Use $\pi = 3.14$.`, model: r`(a) In $30$ minutes the minute hand turns $180^\circ$: area $= \dfrac12 \times 3.14 \times 100 = 157$ cm².

(b) The hour hand turns $30^\circ$ per hour, so $15^\circ$ in half an hour. Arc $= \dfrac{15}{360} \times 2 \times 3.14 \times 6 = \dfrac{1}{24} \times 37.68 = 1.57$ cm.`, sol: r`Minute hand: $6^\circ$ per minute. Hour hand: $0.5^\circ$ per minute.`, scheme: [['180° and 157 cm²', 1], ['Hour hand 15°', 1], ['Arc 1.57 cm', 1]], d: 3, c: 'application', t: [1], time: 270 }), (C) => { C.assert(near(sec(10, 30 * 6, P3), 157) && near(arc(6, 30 * 0.5, P3), 1.57), 'values'); C.model([180, 157, 15, 37.68, 1.57]); });
Q('s305', mk.short({ marks: 3, stem: r`Asha is asked for the area of the **major** sector of a circle of radius $7$ cm whose minor sector has angle $60^\circ$. She writes "$\dfrac{60}{360} \times \dfrac{22}{7} \times 49 \approx 25.67$ cm²." Explain her error and find the correct answer in two different ways.`, model: r`She found the **minor** sector. The major sector has angle $360^\circ - 60^\circ = 300^\circ$.

Way 1: $\dfrac{300}{360} \times \dfrac{22}{7} \times 49 = \dfrac56 \times 154 \approx 128.33$ cm².

Way 2: circle $-$ minor sector $= 154 - 25.67 = 128.33$ cm².`, sol: r`Exactly, $\dfrac{385}{3}$ cm².`, scheme: [['Identifies minor sector found', 1], ['Angle 300° and first method', 1], ['Second method, 128.33 cm²', 1]], d: 3, c: 'evaluation', t: [1], time: 240 }), (C) => { C.assert(near(sec(7, 300, P7), 385 / 3) && near(R2(sec(7, 60, P7)), 25.67), 'values'); C.model([300, 128.33, 154, 25.67]); });
Q('s306', mk.short({ marks: 3, stem: r`$ABCD$ is a square of side $10$ cm. Quadrants are drawn with centres $B$ and $D$ and radius $10$ cm; together their arcs bound a leaf-shaped region. Find the area of the leaf. Use $\pi = 3.14$.`, assets: [figs.leaf], model: r`The leaf is made of two equal segments on the diagonal $AC$.

One quadrant $= \dfrac14 \times 3.14 \times 100 = 78.5$ cm²; right $\triangle ABC$ (or $ADC$) $= \dfrac12 \times 10 \times 10 = 50$ cm². One segment $= 78.5 - 50 = 28.5$ cm².

Leaf $= 2 \times 28.5 = 57$ cm².`, sol: r`Alternatively: two quadrants overlap in the leaf, so leaf $=$ quadrant $+$ quadrant $-$ square $= 157 - 100 = 57$ cm² ✓.`, scheme: [['Leaf = two 90° segments', 1], ['One segment 28.5 cm²', 1], ['Leaf 57 cm²', 1]], d: 4, c: 'analysis', t: [2, 3], time: 270 }), (C) => { C.assert(near(2 * seg(10, 90, P3), 57) && near(2 * sec(10, 90, P3) - 100, 57), 'two ways'); C.model([78.5, 50, 28.5, 57]); C.sol([157, 100]); });
Q('s307', mk.short({ marks: 3, stem: r`A folding hand fan from Rajasthan opens into a sector of angle $135^\circ$. The cloth is fixed between radii of $7$ cm and $21$ cm from the pivot (the inner part is bare sticks). Find (a) the area of the cloth (b) the length of the lace stitched along the outer edge. Use $\pi = \dfrac{22}{7}$.`, assets: [figs.fan], model: r`$\dfrac{135}{360} = \dfrac38$.

(a) Cloth $= \dfrac38 \times \dfrac{22}{7}(21^2 - 7^2) = \dfrac38 \times \dfrac{22}{7} \times 392 = \dfrac38 \times 1232 = 462$ cm².

(b) Lace $= \dfrac38 \times 2 \times \dfrac{22}{7} \times 21 = \dfrac38 \times 132 = 49.5$ cm.`, sol: 'The cloth is the difference of two sectors with the same angle.', scheme: [['Fraction 3/8 and the ring idea', 1], ['Cloth 462 cm²', 1], ['Lace 49.5 cm', 1]], d: 3, c: 'application', t: [1, 3], time: 270 }), (C) => { C.assert(near(sec(21, 135, P7) - sec(7, 135, P7), 462) && near(arc(21, 135, P7), 49.5), 'values'); C.model([392, 1232, 462, 132, 49.5]); });

// =============================================================== Long answer, 5 marks
Q('l01', mk.long({ stem: r`A chord $AB$ of a circle with centre $O$ and radius $21$ cm subtends $60^\circ$ at $O$. Find:
(a) the length of the minor arc $AB$;
(b) the area of the minor sector $OAB$;
(c) the area of the minor segment;
(d) the area of the major segment.
Use $\pi = \dfrac{22}{7}$ and $\sqrt3 = 1.73$.`, model: r`(a) Arc $= \dfrac{60}{360} \times 2 \times \dfrac{22}{7} \times 21 = 22$ cm.

(b) Sector $= \dfrac{60}{360} \times \dfrac{22}{7} \times 441 = 231$ cm².

(c) $\triangle OAB$ is equilateral (two radii and $60^\circ$): area $= \dfrac{1.73}{4} \times 441 = 190.7325$ cm². Minor segment $= 231 - 190.7325 = 40.2675 \approx 40.27$ cm².

(d) Circle $= \dfrac{22}{7} \times 441 = 1386$ cm². Major segment $= 1386 - 40.2675 = 1345.7325 \approx 1345.73$ cm².`, sol: 'Keep unrounded values until the last step.', scheme: [['Arc 22 cm', 1], ['Sector 231 cm²', 1], ['Equilateral triangle 190.73 cm²', 1], ['Minor segment 40.27 cm²', 1], ['Major segment 1345.73 cm²', 1]], d: 3, c: 'application', t: [1, 2], time: 600 }), (C) => { C.assert(near(P7 * 441 - seg(21, 60, P7), 1345.7325), 'major'); C.model([22, 231, 190.7325, 40.27, 1386, 1345.73]); });
Q('l02', mk.long({ stem: r`A square park in Lucknow has side $42$ m. At each corner there is a flower bed in the shape of a quadrant of radius $14$ m, and at the centre there is a circular fountain of diameter $14$ m. The rest of the park is lawn.
(a) Find the area of the flower beds.
(b) Find the area of the lawn.
(c) Find the cost of turfing the lawn at ₹$25$ per m².
(d) The lawn is edged with a low hedge along its boundary with the flower beds and along the sides of the park. Find the length of hedge along the four quadrant arcs.
Use $\pi = \dfrac{22}{7}$.`, assets: [figs.park], model: r`(a) Four quadrants of radius $14$ m make one circle: $\dfrac{22}{7} \times 196 = 616$ m².

(b) Fountain $= \dfrac{22}{7} \times 49 = 154$ m². Lawn $= 42^2 - 616 - 154 = 1764 - 770 = 994$ m².

(c) Cost $= 994 \times 25 = $ ₹$24850$.

(d) Four quadrant arcs make one full circumference: $2 \times \dfrac{22}{7} \times 14 = 88$ m.`, sol: 'Four quadrants of equal radius always add up to one circle.', scheme: [['Flower beds 616 m²', 1], ['Fountain 154 m²', 1], ['Lawn 994 m²', 1], ['Cost ₹24850', 1], ['Arcs 88 m', 1]], d: 3, c: 'application', t: [3], time: 600 }), (C) => { const lawn = 42 * 42 - 4 * sec(14, 90, P7) - P7 * 49; C.assert(near(lawn, 994) && near(4 * arc(14, 90, P7), 88), 'values'); C.model([616, 154, 1764, 770, 994, 24850, 88]); });
Q('l03', mk.long({ stem: r`A chord $AB$ of a circle with centre $O$ and radius $14$ cm subtends a right angle at $O$.
(a) Find the area of the minor sector.
(b) Find the area of the minor segment.
(c) Find the area of the major segment.
(d) Find the length of the chord and the perimeter of the minor segment.
Use $\pi = \dfrac{22}{7}$ and $\sqrt2 = 1.414$.`, model: r`(a) Sector $= \dfrac14 \times \dfrac{22}{7} \times 196 = 154$ cm².

(b) $\triangle OAB = \dfrac12 \times 14 \times 14 = 98$ cm². Minor segment $= 154 - 98 = 56$ cm².

(c) Circle $= 616$ cm². Major segment $= 616 - 56 = 560$ cm².

(d) $AB = \sqrt{14^2 + 14^2} = 14\sqrt2 = 14 \times 1.414 = 19.796$ cm. Minor arc $= \dfrac14 \times 2 \times \dfrac{22}{7} \times 14 = 22$ cm. Perimeter of the minor segment $= 22 + 19.796 = 41.796 \approx 41.80$ cm.`, sol: 'The perimeter of a segment is its arc plus its chord.', scheme: [['Sector 154 cm²', 1], ['Minor segment 56 cm²', 1], ['Major segment 560 cm²', 1], ['Chord 19.796 cm', 1], ['Perimeter ≈ 41.80 cm', 1]], d: 3, c: 'application', t: [1, 2], time: 600 }), (C) => { C.assert(near(14 * 1.414, 19.796) && near(arc(14, 90, P7) + 19.796, 41.796), 'perimeter'); C.model([154, 98, 56, 616, 560, 19.796, 22, 41.8]); });
Q('l04', mk.long({ stem: r`A cricket ground in Raipur is a circle of radius $63$ m. The inner fielding circle, with the same centre, has radius $28$ m. The region between the two circles is the outfield.
(a) Find the area of the outfield.
(b) A sector of angle $36^\circ$ at the centre marks the "third man" region. Find the area of the outfield inside this sector.
(c) Find the length of the boundary rope along this sector.
(d) Find the cost of re-turfing the whole outfield at ₹$12$ per m².
Use $\pi = \dfrac{22}{7}$.`, model: r`(a) Outfield $= \dfrac{22}{7}(63^2 - 28^2) = \dfrac{22}{7}(3969 - 784) = \dfrac{22}{7} \times 3185 = 10010$ m².

(b) $\dfrac{36}{360} = \dfrac{1}{10}$ of the outfield: $1001$ m².

(c) Boundary arc $= \dfrac{1}{10} \times 2 \times \dfrac{22}{7} \times 63 = \dfrac{1}{10} \times 396 = 39.6$ m.

(d) Cost $= 10010 \times 12 = $ ₹$120120$.`, sol: 'The part of a ring inside a sector is the same fraction θ/360 of the ring.', scheme: [['Ring formula', 1], ['Outfield 10010 m²', 1], ['Sector part 1001 m²', 1], ['Rope 39.6 m', 1], ['Cost ₹120120', 1]], d: 4, c: 'application', t: [1, 3], time: 660 }), (C) => { const ring = P7 * (63 ** 2 - 28 ** 2); C.assert(near(ring, 10010) && near(sec(63, 36, P7) - sec(28, 36, P7), 1001) && near(arc(63, 36, P7), 39.6), 'values'); C.model([3185, 10010, 1001, 396, 39.6, 120120]); });
Q('l05', mk.long({ stem: r`An equilateral triangle $ABC$ is inscribed in a circle with centre $O$ and radius $10$ cm. The three segments outside the triangle are shaded.
(a) Show that each side of the triangle subtends $120^\circ$ at $O$.
(b) Find the area of one shaded segment.
(c) Find the total shaded area, and check it by subtracting the triangle from the circle.
Use $\pi = 3.14$ and $\sqrt3 = 1.73$.`, assets: [figs.triInCircle], model: r`(a) $OA = OB = OC$ and $AB = BC = CA$, so $\triangle OAB \cong \triangle OBC \cong \triangle OCA$ (SSS). Their three equal angles at $O$ add to $360^\circ$, so each is $120^\circ$.

(b) Sector $= \dfrac13 \times 3.14 \times 100 = 104.67$ cm² (exactly $\dfrac{314}{3}$). $\triangle OAB = \dfrac{1.73}{4} \times 100 = 43.25$ cm². Segment $= 104.67 - 43.25 \approx 61.42$ cm².

(c) Shaded $= 3 \times 61.4167 \approx 184.25$ cm².

Check: circle $= 314$ cm²; $\triangle ABC = 3 \times 43.25 = 129.75$ cm²; $314 - 129.75 = 184.25$ cm² ✓.`, sol: 'For 120°, the triangle OAB has area (√3/4)r², found by dropping the perpendicular from O.', scheme: [['Each central angle 120°', 1], ['Sector 104.67 and triangle 43.25', 1], ['Segment 61.42 cm²', 1], ['Total 184.25 cm²', 1], ['Check by circle − triangle', 1]], d: 4, c: 'analysis', t: [2, 3], time: 660 }), (C) => { const s1 = seg(10, 120, P3); C.assert(near(3 * s1, 184.25) && near(P3 * 100 - 3 * triA(10, 120), 184.25), 'two ways'); C.model([120, 104.67, 43.25, 61.42, 184.25, 314, 129.75]); });
Q('l06', mk.long({ stem: r`$OAB$ is a quadrant of a circle with centre $O$ and radius $14$ cm. A semicircle is drawn outside the quadrant on the chord $AB$ as diameter. The crescent-shaped region inside the semicircle but outside the quadrant is shaded.
(a) Find the length of $AB$ and the area of the semicircle.
(b) Find the area of the minor segment of the quadrant on $AB$.
(c) Find the area of the crescent.
(d) Compare the crescent with $\triangle OAB$. What do you notice?
Use $\pi = \dfrac{22}{7}$.`, assets: [figs.lune], model: r`(a) $AB = \sqrt{14^2 + 14^2} = 14\sqrt2$ cm, so the semicircle has radius $7\sqrt2$ cm and $r^2 = 98$. Its area $= \dfrac12 \times \dfrac{22}{7} \times 98 = 154$ cm².

(b) Segment $=$ quadrant $-$ triangle $= 154 - 98 = 56$ cm².

(c) The semicircle consists of the crescent and the segment, so crescent $= 154 - 56 = 98$ cm².

(d) $\triangle OAB = \dfrac12 \times 14 \times 14 = 98$ cm². The curved crescent has **exactly** the same area as the straight-sided triangle — and the result does not depend on the value used for $\pi$: crescent $= \dfrac{\pi r^2}{4} - \left(\dfrac{\pi r^2}{4} - \dfrac{r^2}{2}\right) = \dfrac{r^2}{2}$.`, sol: r`The semicircle on $AB$ has area $\dfrac12\pi\left(\dfrac{r\sqrt2}{2}\right)^2 = \dfrac{\pi r^2}{4}$, the same as the quadrant.`, scheme: [['AB = 14√2 and semicircle 154 cm²', 1], ['Segment 56 cm²', 1], ['Crescent = semicircle − segment', 1], ['Crescent 98 cm²', 1], ['Equal to the triangle; π cancels', 1]], d: 5, c: 'analysis', t: [2, 3], time: 720 }), (C) => { const semi = 0.5 * P7 * 98; C.assert(near(semi, 154) && near(semi - seg(14, 90, P7), 98) && near(0.5 * Math.PI * 98 - seg(14, 90, Math.PI), 98), 'crescent = triangle, any pi'); C.model([98, 154, 56]); });

// =============================================================== Case-based
caseQ('c01', {
  passage: r`A pizza shop in Hyderabad sells a round pizza of radius $14$ cm, cut into $8$ equal slices from the centre. (Use $\pi = \dfrac{22}{7}$.)`,
  assets: [figs.pizza], d: 2, c: 'application',
  model: r`(a) Option (b): $45^\circ$. (b) $77$ cm². (c) (i) $39$ cm. Or (ii) $385$ cm².`,
  sol: r`Each slice is a sector of $45^\circ$: area $\dfrac18 \times 616 = 77$ cm², crust (arc) $\dfrac18 \times 88 = 11$ cm, perimeter $11 + 28 = 39$ cm. Five slices left: $5 \times 77 = 385$ cm².`,
  children: [
    child('a', mk.mcq({ stem: 'The angle at the centre of each slice is', opts: [r`$8^\circ$`, r`$45^\circ$`, r`$22.5^\circ$`, r`$90^\circ$`], key: 'b', sol: r`$360^\circ \div 8 = 45^\circ$.`, d: 1, c: 'understanding', t: [1], time: 30 })),
    child('b', mk.num({ stem: 'Find the area of one slice in cm².', value: 77, unit: 'cm²', sol: r`$\dfrac{45}{360} \times \dfrac{22}{7} \times 14 \times 14 = \dfrac18 \times 616 = 77$ cm².`, scheme: [['77 cm²', 1]], d: 2, c: 'application', t: [1], time: 60 })),
    child('c', mk.short({ marks: 2, stem: '**(i)** Find the perimeter of one slice (two straight edges and the crust).', model: r`Crust $= \dfrac18 \times 2 \times \dfrac{22}{7} \times 14 = \dfrac18 \times 88 = 11$ cm. Perimeter $= 11 + 14 + 14 = 39$ cm.`, sol: 'Arc plus two radii.', scheme: [['Arc 11 cm', 1], ['Perimeter 39 cm', 1]], d: 2, c: 'application', t: [1], time: 90 }), [
      mk.short({ marks: 2, stem: '**(ii)** Riya and her brother eat 3 slices. Find the area of pizza left.', model: r`$5$ slices are left, a sector of $5 \times 45^\circ = 225^\circ$: area $= \dfrac{225}{360} \times 616 = 385$ cm² (or $5 \times 77$).`, sol: 'Five-eighths of the pizza.', scheme: [['5 slices or 225°', 1], ['385 cm²', 1]], d: 2, c: 'application', t: [1], time: 90 }),
    ]),
  ],
}, (C) => { C.child('a').which([8, 45, 22.5, 90], 360 / 8); C.child('b').val(R6(sec(14, 45, P7))); C.child('c').model([R6(arc(14, 45, P7)), R6(arc(14, 45, P7) + 28)]); C.child('cii').model([225, R6(sec(14, 225, P7))]); });

caseQ('c02', {
  passage: r`On a farm near Nashik, a rotating sprinkler fixed at the centre of a circular field of radius $21$ m can be set to water any sector of the field. On Monday it is set to a sector of $120^\circ$. (Use $\pi = \dfrac{22}{7}$.)`,
  d: 3, c: 'application',
  model: r`(a) Option (c): one-third. (b) $462$ m². (c) (i) $44$ m. Or (ii) $693$ m², which is half the field.`,
  sol: r`Field $= \dfrac{22}{7} \times 441 = 1386$ m². $120^\circ$ is $\dfrac13$: $462$ m²; edge $\dfrac13 \times 132 = 44$ m. Monday $+$ Tuesday $= 120^\circ + 60^\circ = 180^\circ$: $693$ m².`,
  children: [
    child('a', mk.mcq({ stem: 'What fraction of the field is watered on Monday?', opts: ['one-sixth', 'one-quarter', 'one-third', 'one-half'], key: 'c', sol: r`$\dfrac{120}{360} = \dfrac13$.`, d: 1, c: 'understanding', t: [1], time: 30 })),
    child('b', mk.num({ stem: 'Find the area watered on Monday, in m².', value: 462, unit: 'm²', sol: r`$\dfrac13 \times \dfrac{22}{7} \times 21 \times 21 = \dfrac13 \times 1386 = 462$ m².`, scheme: [['462 m²', 1]], d: 2, c: 'application', t: [1], time: 60 })),
    child('c', mk.short({ marks: 2, stem: '**(i)** Find the length of the field boundary that is watered on Monday.', model: r`Arc $= \dfrac{120}{360} \times 2 \times \dfrac{22}{7} \times 21 = \dfrac13 \times 132 = 44$ m.`, sol: 'Arc length of the sector.', scheme: [['Arc formula', 1], ['44 m', 1]], d: 2, c: 'application', t: [1], time: 90 }), [
      mk.short({ marks: 2, stem: r`**(ii)** On Tuesday it waters the next $60^\circ$ sector. Find the total area watered on the two days, and say what part of the field it is.`, model: r`Total angle $= 120^\circ + 60^\circ = 180^\circ$, a semicircle: $\dfrac12 \times 1386 = 693$ m², half the field.`, sol: 'Angles of adjacent sectors add.', scheme: [['Total angle 180°', 1], ['693 m², half', 1]], d: 3, c: 'application', t: [1], time: 90 }),
    ]),
  ],
}, (C) => { C.child('a').which([1 / 6, 1 / 4, 1 / 3, 1 / 2], 120 / 360); C.child('b').val(R6(sec(21, 120, P7))); C.child('c').model([R6(arc(21, 120, P7))]); C.child('cii').model([180, R6(sec(21, 180, P7))]); });

caseQ('c03', {
  passage: r`The Ashoka Chakra painted on a school's wall in Sarnath has $24$ equally spaced spokes and an outer rim of radius $7$ cm. (Use $\pi = \dfrac{22}{7}$.)`,
  assets: [figs.chakra], d: 3, c: 'application',
  model: r`(a) Option (a): $15^\circ$. (b) $6.42$ cm². (c) (i) $1.83$ cm. Or (ii) $38.5$ cm².`,
  sol: r`Sector between adjacent spokes: $\dfrac{15}{360} = \dfrac{1}{24}$ of the circle: area $\dfrac{154}{24} \approx 6.42$ cm², arc $\dfrac{44}{24} \approx 1.83$ cm. Six gaps make $90^\circ$: a quadrant of $38.5$ cm².`,
  children: [
    child('a', mk.mcq({ stem: 'The angle between two adjacent spokes is', opts: [r`$15^\circ$`, r`$24^\circ$`, r`$30^\circ$`, r`$7.5^\circ$`], key: 'a', sol: r`$360^\circ \div 24 = 15^\circ$. Option (c) divides by $12$ (one line through the centre holds two spokes).`, d: 1, c: 'understanding', t: [1], time: 45 })),
    child('b', mk.num({ stem: 'Find the area (in cm²) of the sector between two adjacent spokes, to two decimal places.', value: 6.42, tol: 0.005, unit: 'cm²', sol: r`$\dfrac{15}{360} \times \dfrac{22}{7} \times 49 = \dfrac{154}{24} = 6.4166\ldots \approx 6.42$ cm².`, scheme: [['6.42 cm²', 1]], d: 2, c: 'application', t: [1], time: 75 })),
    child('c', mk.short({ marks: 2, stem: '**(i)** Find the length of the rim between two adjacent spokes, to two decimal places.', model: r`Arc $= \dfrac{15}{360} \times 2 \times \dfrac{22}{7} \times 7 = \dfrac{44}{24} \approx 1.83$ cm.`, sol: 'One twenty-fourth of the circumference.', scheme: [['Arc formula with 15°', 1], ['1.83 cm', 1]], d: 2, c: 'application', t: [1], time: 90 }), [
      mk.short({ marks: 2, stem: '**(ii)** Find the area of the sector between spoke 1 and spoke 7.', model: r`From spoke $1$ to spoke $7$ there are $6$ gaps: $6 \times 15^\circ = 90^\circ$, a quadrant. Area $= \dfrac14 \times 154 = 38.5$ cm².`, sol: 'Count gaps, not spokes.', scheme: [['6 gaps, 90°', 1], ['38.5 cm²', 1]], d: 3, c: 'analysis', t: [1], time: 90 }),
    ]),
  ],
}, (C) => { C.child('a').which([15, 24, 30, 7.5], 360 / 24); C.child('b').val(R2(sec(7, 15, P7)), 0.005); C.child('c').model([R2(arc(7, 15, P7))]); C.child('cii').model([90, R6(sec(7, 6 * 15, P7))]); });

caseQ('c04', {
  passage: r`The top of a doorway in a Jaipur haveli is a glass panel in the shape of the minor segment of a circle of radius $70$ cm. The chord $AB$ at the bottom of the panel subtends a right angle at the centre $O$ of the circle. (Use $\pi = \dfrac{22}{7}$.)`,
  assets: [figs.door], d: 3, c: 'application',
  model: r`(a) Option (d): $\dfrac12 r^2$. (b) $3850$ cm². (c) (i) $1400$ cm². Or (ii) $110$ cm.`,
  sol: r`Sector $= \dfrac14 \times \dfrac{22}{7} \times 4900 = 3850$ cm²; $\triangle OAB = \dfrac12 \times 70 \times 70 = 2450$ cm²; panel $= 1400$ cm². Arc $= \dfrac14 \times 440 = 110$ cm.`,
  children: [
    child('a', mk.mcq({ stem: r`The area of $\triangle OAB$ is`, opts: [r`$\dfrac{\sqrt3}{4} r^2$`, r`$r^2$`, r`$\dfrac{\pi r^2}{4}$`, r`$\dfrac12 r^2$`], key: 'd', sol: r`$\angle AOB = 90^\circ$, so $\triangle OAB$ is right-angled with legs $r$ and $r$: area $\dfrac12 r^2$. Option (a) is for $60^\circ$ or $120^\circ$; (c) is the sector.`, d: 1, c: 'understanding', t: [2], time: 45 })),
    child('b', mk.num({ stem: r`Find the area (in cm²) of the sector $OAB$.`, value: 3850, unit: 'cm²', sol: r`$\dfrac14 \times \dfrac{22}{7} \times 70 \times 70 = 3850$ cm².`, scheme: [['3850 cm²', 1]], d: 2, c: 'application', t: [1], time: 60 })),
    child('c', mk.short({ marks: 2, stem: '**(i)** Find the area of the glass panel.', model: r`Panel $=$ sector $-$ triangle $= 3850 - \dfrac12 \times 70 \times 70 = 3850 - 2450 = 1400$ cm².`, sol: 'Segment = sector − triangle.', scheme: [['Triangle 2450 cm²', 1], ['Panel 1400 cm²', 1]], d: 2, c: 'application', t: [2], time: 90 }), [
      mk.short({ marks: 2, stem: '**(ii)** A brass strip runs along the curved edge of the panel. Find its length.', model: r`Arc $= \dfrac14 \times 2 \times \dfrac{22}{7} \times 70 = \dfrac14 \times 440 = 110$ cm.`, sol: 'Quarter of the circumference.', scheme: [['Arc formula', 1], ['110 cm', 1]], d: 2, c: 'application', t: [1], time: 90 }),
    ]),
  ],
}, (C) => { C.child('a').key('d'); C.child('b').val(R6(sec(70, 90, P7))); C.child('c').model([2450, R6(seg(70, 90, P7))]); C.child('cii').model([R6(arc(70, 90, P7))]); });

caseQ('c05', {
  passage: r`A circular park in Bhubaneswar has radius $35$ m. A walking track $7$ m wide runs inside the park all along its boundary. (Use $\pi = \dfrac{22}{7}$.)`,
  d: 3, c: 'application',
  model: r`(a) Option (b). (b) $1386$ m². (c) (i) ₹$69300$. Or (ii) $44$ m.`,
  sol: r`Inner radius $= 28$ m. Track $= \dfrac{22}{7}(35^2 - 28^2) = \dfrac{22}{7} \times 441 = 1386$ m². Cost $= 1386 \times 50 = 69300$. Outer edge $220$ m, inner edge $176$ m.`,
  children: [
    child('a', mk.mcq({ stem: 'The area of the track is', opts: [r`$\pi(35 - 28)^2$`, r`$\pi(35^2 - 28^2)$`, r`$\pi(35^2 - 7^2)$`, r`$2\pi(35 - 28)$`], key: 'b', sol: r`The track is the ring between radii $35$ m and $35 - 7 = 28$ m: $\pi(R^2 - r^2)$. Option (a) squares the difference; (c) uses the width as the inner radius.`, d: 2, c: 'understanding', t: [3], time: 60 })),
    child('b', mk.num({ stem: 'Find the area of the track in m².', value: 1386, unit: 'm²', sol: r`$\dfrac{22}{7}(1225 - 784) = \dfrac{22}{7} \times 441 = 1386$ m².`, scheme: [['1386 m²', 1]], d: 2, c: 'application', t: [3], time: 75 })),
    child('c', mk.short({ marks: 2, stem: '**(i)** Find the cost of paving the track at ₹50 per m².', model: r`Cost $= 1386 \times 50 = $ ₹$69300$.`, sol: 'Area × rate.', scheme: [['Area used', 1], ['₹69300', 1]], d: 2, c: 'application', t: [3], time: 60 }), [
      mk.short({ marks: 2, stem: '**(ii)** How much longer is the outer edge of the track than its inner edge?', model: r`Outer $= 2 \times \dfrac{22}{7} \times 35 = 220$ m; inner $= 2 \times \dfrac{22}{7} \times 28 = 176$ m. Difference $= 44$ m (always $2\pi \times$ width).`, sol: 'Difference of circumferences = 2π(R − r).', scheme: [['220 m and 176 m', 1], ['44 m', 1]], d: 3, c: 'analysis', t: [3], time: 90 }),
    ]),
  ],
}, (C) => { C.child('a').key('b'); const ring = P7 * (35 ** 2 - 28 ** 2); C.child('b').val(R6(ring)); C.child('c').model([R6(ring * 50)]); C.child('cii').model([220, 176, R6(2 * P7 * 7)]); });
