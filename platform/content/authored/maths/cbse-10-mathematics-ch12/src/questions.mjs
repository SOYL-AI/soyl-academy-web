// CBSE 10 Mathematics ch12 Surface Areas and Volumes — practice bank with independent re-solve checks.
// Each solid is computed from a small formula library with the stem's value of pi; combined surfaces are
// built from visible faces only (joined faces removed), and combined volumes as sums or differences.
// Removed topics (conversion of solids, frustum) are not used anywhere.
import { Q, caseQ, child, mk, r } from '../../cbse-10-mathematics-ch10/src/lib.mjs';
import { figs } from './figs.mjs';

const P7 = 22 / 7, P3 = 3.14;
const near = (u, v, e = 1e-6) => Math.abs(u - v) < e;
const R6 = (x) => Math.round(x * 1e6) / 1e6;
const R2 = (x) => Math.round(x * 100) / 100;
const slant = (rr, h) => Math.sqrt(rr * rr + h * h);
// curved / total surface areas and volumes
const cyl = { csa: (p, rr, h) => 2 * p * rr * h, base: (p, rr) => p * rr * rr, vol: (p, rr, h) => p * rr * rr * h };
const cone = { csa: (p, rr, h) => p * rr * slant(rr, h), vol: (p, rr, h) => (p * rr * rr * h) / 3 };
const hemi = { csa: (p, rr) => 2 * p * rr * rr, tsa: (p, rr) => 3 * p * rr * rr, vol: (p, rr) => (2 / 3) * p * rr ** 3 };
const sph = { sa: (p, rr) => 4 * p * rr * rr, vol: (p, rr) => (4 / 3) * p * rr ** 3 };
const cuboid = { tsa: (l, b, h) => 2 * (l * b + b * h + h * l), vol: (l, b, h) => l * b * h };

// =============================================================== MCQ
Q('m01', mk.mcq({ stem: r`The curved surface area of a hemisphere of radius $r$ is`, opts: [r`$2\pi r^2$`, r`$3\pi r^2$`, r`$4\pi r^2$`, r`$\pi r^2$`], key: 'a', sol: r`A hemisphere has half the surface of a sphere: $\dfrac12 \times 4\pi r^2 = 2\pi r^2$. Option (b) is its **total** surface area (curved surface $+$ flat circle $\pi r^2$).`, d: 1, c: 'recall', t: [1], time: 30 }), (C) => { C.assert(near(hemi.csa(P3, 2), sph.sa(P3, 2) / 2), 'half a sphere'); C.key('a'); });
Q('m02', mk.mcq({ stem: r`The slant height of a cone with base radius $5$ cm and height $12$ cm is`, opts: ['$13$ cm', '$17$ cm', '$7$ cm', r`$\sqrt{119}$ cm`], key: 'a', sol: r`$l = \sqrt{r^2 + h^2} = \sqrt{25 + 144} = \sqrt{169} = 13$ cm. Option (d) subtracts the squares.`, d: 1, c: 'understanding', t: [1], time: 45 }), (C) => C.which([13, 17, 7, Math.sqrt(119)], slant(5, 12)));
Q('m03', mk.mcq({ stem: r`The total surface area of a solid hemisphere of radius $7$ cm is (use $\pi = \dfrac{22}{7}$)`, opts: ['$462$ cm²', '$308$ cm²', '$616$ cm²', '$154$ cm²'], key: 'a', sol: r`Total surface $=$ curved $2\pi r^2$ $+$ flat face $\pi r^2 = 3\pi r^2 = 3 \times \dfrac{22}{7} \times 49 = 462$ cm². Option (b) is the curved surface only; (c) is a whole sphere.`, d: 2, c: 'understanding', t: [1], time: 60 }), (C) => C.which([462, 308, 616, 154], R6(hemi.tsa(P7, 7))));
Q('m04', mk.mcq({ stem: 'A solid is made by placing a hemisphere on top of a cylinder of the same radius. Its total surface area is', opts: ['CSA of cylinder + CSA of hemisphere + area of the bottom circle', 'TSA of cylinder + TSA of hemisphere', 'CSA of cylinder + TSA of hemisphere', 'TSA of cylinder + CSA of hemisphere'], key: 'a', sol: r`The joining circle (top of the cylinder $=$ flat face of the hemisphere) is inside the solid and is not part of its surface. What remains: the cylinder's curved surface, its bottom circle, and the hemisphere's curved surface. Options (b)–(d) count a hidden circle at least once.`, d: 2, c: 'understanding', t: [1], time: 75 }), (C) => { const [rr, h] = [7, 5]; const right = cyl.csa(P7, rr, h) + cyl.base(P7, rr) + hemi.csa(P7, rr); const wrong = 2 * cyl.base(P7, rr) + cyl.csa(P7, rr, h) + hemi.tsa(P7, rr); C.assert(near(wrong - right, 2 * cyl.base(P7, rr)), 'option (b) counts the joining circle twice'); C.key('a'); });
Q('m05', mk.mcq({ stem: r`Three cubes, each of edge $3$ cm, are joined end to end in a row. The surface area of the resulting cuboid is`, opts: ['$126$ cm²', '$162$ cm²', '$144$ cm²', '$108$ cm²'], key: 'a', sol: r`The cuboid is $9 \times 3 \times 3$: $2(27 + 9 + 27) = 126$ cm². Option (b) adds the three cubes' surfaces ($3 \times 54$), counting the four hidden faces.`, d: 2, c: 'application', t: [1], time: 75 }), (C) => { C.which([126, 162, 144, 108], cuboid.tsa(9, 3, 3)); C.assert(3 * 54 - 4 * 9 === 126, 'four hidden faces of 9 cm²'); });
Q('m06', mk.mcq({ stem: r`The volume of a hemisphere of radius $21$ cm is (use $\pi = \dfrac{22}{7}$)`, opts: ['$19404$ cm³', '$38808$ cm³', '$9702$ cm³', '$2772$ cm³'], key: 'a', sol: r`$V = \dfrac23 \pi r^3 = \dfrac23 \times \dfrac{22}{7} \times 9261 = 19404$ cm³. Option (b) is the whole sphere; (d) is the curved surface area in cm².`, d: 2, c: 'understanding', t: [2], time: 75 }), (C) => C.which([19404, 38808, 9702, 2772], R6(hemi.vol(P7, 21))));
Q('m07', mk.mcq({ stem: 'A cone and a cylinder have the same base radius and the same height. The ratio of the volume of the cone to that of the cylinder is', opts: ['$1 : 3$', '$3 : 1$', '$1 : 2$', '$2 : 3$'], key: 'a', sol: r`$\dfrac{\frac13\pi r^2h}{\pi r^2h} = \dfrac13$.`, d: 1, c: 'recall', t: [2], time: 30 }), (C) => C.which([1 / 3, 3, 1 / 2, 2 / 3].map(R6), R6(cone.vol(P3, 4, 9) / cyl.vol(P3, 4, 9))));
Q('m08', mk.mcq({ stem: r`A toy rocket is a cylinder of radius $7$ cm and height $10$ cm with a cone of the same radius and height $6$ cm on top. Its volume is (use $\pi = \dfrac{22}{7}$)`, opts: ['$1848$ cm³', '$2464$ cm³', '$1540$ cm³', '$2156$ cm³'], key: 'a', sol: r`Cylinder $= \dfrac{22}{7} \times 49 \times 10 = 1540$ cm³; cone $= \dfrac13 \times \dfrac{22}{7} \times 49 \times 6 = 308$ cm³. Total $= 1848$ cm³. Option (b) forgets the $\dfrac13$ in the cone.`, d: 2, c: 'application', t: [2], time: 90 }), (C) => C.which([1848, 2464, 1540, 2156], R6(cyl.vol(P7, 7, 10) + cone.vol(P7, 7, 6))));
Q('m09', mk.mcq({ stem: r`The curved surface area of a cone of radius $7$ cm and slant height $25$ cm is (use $\pi = \dfrac{22}{7}$)`, opts: ['$550$ cm²', '$704$ cm²', '$1100$ cm²', '$154$ cm²'], key: 'a', sol: r`$\pi rl = \dfrac{22}{7} \times 7 \times 25 = 550$ cm². Option (b) is the total surface area ($550 + 154$).`, d: 2, c: 'understanding', t: [1], time: 60 }), (C) => C.which([550, 704, 1100, 154], R6(cone.csa(P7, 7, 24))));
Q('m10', mk.mcq({ stem: r`A solid is a cylinder (radius $r$, height $h$) with a hemisphere of radius $r$ at each end. Its total surface area is`, opts: [r`$2\pi rh + 4\pi r^2$`, r`$2\pi rh + 2\pi r^2$`, r`$2\pi r(h + r) + 4\pi r^2$`, r`$2\pi rh + 6\pi r^2$`], key: 'a', sol: r`Both flat ends of the cylinder are covered by the hemispheres. Visible: the cylinder's curved surface $2\pi rh$ and two hemispherical curved surfaces $2 \times 2\pi r^2$. Option (c) wrongly keeps the cylinder's two end circles.`, d: 2, c: 'understanding', t: [1], time: 60 }), (C) => { const [rr, h] = [2, 5]; C.which([2 * Math.PI * rr * h + 4 * Math.PI * rr * rr, 2 * Math.PI * rr * h + 2 * Math.PI * rr * rr, 2 * Math.PI * rr * (h + rr) + 4 * Math.PI * rr * rr, 2 * Math.PI * rr * h + 6 * Math.PI * rr * rr].map(R6), R6(cyl.csa(Math.PI, rr, h) + 2 * hemi.csa(Math.PI, rr))); });
Q('m11', mk.mcq({ stem: r`A hemisphere of radius $3.5$ cm is scooped out of a solid cube of edge $7$ cm. The volume of the remaining solid is about (use $\pi = \dfrac{22}{7}$)`, opts: ['$253.17$ cm³', '$432.83$ cm³', '$304.5$ cm³', '$89.83$ cm³'], key: 'a', sol: r`Cube $= 343$ cm³; hemisphere $= \dfrac23 \times \dfrac{22}{7} \times 42.875 \approx 89.83$ cm³. Remaining $= 343 - 89.83 = 253.17$ cm³. Option (b) adds instead of subtracting; (d) is the hemisphere alone.`, d: 3, c: 'application', t: [2], time: 90 }), (C) => C.which([253.17, 432.83, 304.5, 89.83], R2(343 - hemi.vol(P7, 3.5))));
Q('m12', mk.mcq({ stem: 'An ice-cream cone is filled and topped with a hemisphere of ice cream of the same radius. The total outer surface of this shape is', opts: [r`$\pi rl + 2\pi r^2$`, r`$\pi rl + 3\pi r^2$`, r`$\pi r(l + r) + 2\pi r^2$`, r`$\pi rl + \pi r^2$`], key: 'a', sol: r`The cone's base circle is the hemisphere's flat face: it is hidden. Visible: curved cone $\pi rl$ $+$ curved hemisphere $2\pi r^2$.`, d: 2, c: 'understanding', t: [1], time: 60 }), (C) => { const [rr, h] = [3, 4]; C.assert(near(cone.csa(P3, rr, h) + hemi.csa(P3, rr), P3 * rr * 5 + 2 * P3 * 9), 'visible faces'); C.key('a'); });
Q('m13', mk.mcq({ stem: r`$1$ m³ is equal to`, opts: ['$1000$ litres', '$100$ litres', '$10000$ litres', '$1000000$ litres'], key: 'a', sol: r`$1$ m³ $= 100 \times 100 \times 100$ cm³ $= 1000000$ cm³, and $1$ litre $= 1000$ cm³, so $1$ m³ $= 1000$ litres. Option (d) is the number of cm³.`, d: 1, c: 'recall', t: [2], time: 30 }), (C) => C.which([1000, 100, 10000, 1000000], 100 ** 3 / 1000));
Q('m14', mk.mcq({ stem: r`A cylindrical tank has radius $0.7$ m and height $2$ m. Its capacity is (use $\pi = \dfrac{22}{7}$)`, opts: ['$3080$ litres', '$308$ litres', '$30800$ litres', '$1540$ litres'], key: 'a', sol: r`$V = \dfrac{22}{7} \times 0.49 \times 2 = 3.08$ m³ $= 3.08 \times 1000 = 3080$ litres.`, d: 2, c: 'application', t: [2], time: 75 }), (C) => C.which([3080, 308, 30800, 1540], R6(cyl.vol(P7, 0.7, 2) * 1000)));
Q('m15', mk.mcq({ stem: r`A cone is placed on top of a cylinder of the same radius $r$. Compared with the sum of the total surface areas of the two separate solids, the total surface area of the combined solid is`, opts: [r`less by $2\pi r^2$`, r`less by $\pi r^2$`, 'the same', r`more by $2\pi r^2$`], key: 'a', sol: r`Joining hides **two** circles of area $\pi r^2$: the cylinder's top and the cone's base. So the combined surface is $2\pi r^2$ less than the sum.`, d: 3, c: 'analysis', t: [1], time: 75 }), (C) => { const [rr, h1, h2] = [3, 5, 4]; const sep = (cyl.csa(P3, rr, h1) + 2 * cyl.base(P3, rr)) + (cone.csa(P3, rr, h2) + cyl.base(P3, rr)); const comb = cyl.csa(P3, rr, h1) + cyl.base(P3, rr) + cone.csa(P3, rr, h2); C.assert(near(sep - comb, 2 * P3 * rr * rr), 'difference 2πr²'); C.key('a'); });
Q('m16', mk.mcq({ stem: r`A toy is a cone of radius $3$ cm and height $4$ cm on a hemisphere of radius $3$ cm. Its volume is (use $\pi = 3.14$)`, opts: ['$94.2$ cm³', '$113.04$ cm³', '$37.68$ cm³', '$56.52$ cm³'], key: 'a', sol: r`Cone $= \dfrac13 \pi \times 9 \times 4 = 12\pi$; hemisphere $= \dfrac23 \pi \times 27 = 18\pi$. Total $= 30\pi = 30 \times 3.14 = 94.2$ cm³. Options (c) and (d) are the parts alone; (b) uses a whole sphere ($36\pi$).`, d: 3, c: 'application', t: [2], time: 90 }), (C) => C.which([94.2, 113.04, 37.68, 56.52], R6(cone.vol(P3, 3, 4) + hemi.vol(P3, 3))));
Q('m17', mk.mcq({ stem: r`The surface area of a sphere is $616$ cm². Its radius is (use $\pi = \dfrac{22}{7}$)`, opts: ['$7$ cm', '$14$ cm', '$49$ cm', '$3.5$ cm'], key: 'a', sol: r`$4 \times \dfrac{22}{7} r^2 = 616 \Rightarrow r^2 = 49 \Rightarrow r = 7$ cm. Option (c) stops at $r^2$.`, d: 2, c: 'understanding', t: [1], time: 60 }), (C) => C.which([7, 14, 49, 3.5], R6(Math.sqrt(616 / (4 * P7)))));
Q('m18', mk.mcq({ stem: 'A cone with the same base and height as a solid cylinder is carved out of it. The volume left is what fraction of the cylinder?', opts: [r`$\dfrac23$`, r`$\dfrac13$`, r`$\dfrac12$`, r`$\dfrac34$`], key: 'a', sol: r`$\pi r^2h - \dfrac13\pi r^2h = \dfrac23\pi r^2h$: two-thirds of the cylinder.`, d: 3, c: 'analysis', t: [2], time: 60 }), (C) => C.which([2 / 3, 1 / 3, 1 / 2, 3 / 4].map(R6), R6((cyl.vol(P3, 5, 7) - cone.vol(P3, 5, 7)) / cyl.vol(P3, 5, 7))));

// =============================================================== Assertion-reason (keys a b c d a d)
Q('ar1', mk.ar({ a: r`The total surface area of a solid hemisphere of radius $r$ is $3\pi r^2$.`, r: r`A solid hemisphere has a curved surface of area $2\pi r^2$ and a flat circular face of area $\pi r^2$.`, key: 'a', sol: r`$2\pi r^2 + \pi r^2 = 3\pi r^2$: R gives exactly the two parts that make up A.`, d: 1, c: 'understanding', t: [1] }), (C) => { C.assert(near(hemi.tsa(P3, 2), hemi.csa(P3, 2) + cyl.base(P3, 2)), 'parts'); C.key('a'); });
Q('ar2', mk.ar({ a: r`The volume of a cone of radius $7$ cm and height $9$ cm is $462$ cm³ (use $\pi = \dfrac{22}{7}$).`, r: r`The slant height of a cone is $\sqrt{r^2 + h^2}$.`, key: 'b', sol: r`A: $\dfrac13 \times \dfrac{22}{7} \times 49 \times 9 = 462$ cm³ — true. R is true too, but the volume uses the vertical height, not the slant height, so R does not explain A.`, d: 2, c: 'understanding', t: [2] }), (C) => { C.assert(near(cone.vol(P7, 7, 9), 462), '462'); C.key('b'); });
Q('ar3', mk.ar({ a: 'When a cone is placed on a cylinder of the same radius, the total surface area of the solid is CSA of the cylinder + CSA of the cone + area of one base of the cylinder.', r: 'The total surface area of a combined solid is the sum of the total surface areas of its parts.', key: 'c', sol: r`A is true: only the cylinder's bottom circle remains visible among the flat faces. R is false: the faces that are joined are hidden and must not be counted.`, d: 2, c: 'understanding', t: [1] }), (C) => C.key('c'));
Q('ar4', mk.ar({ a: r`The volume of a hemisphere of radius $3$ cm is $36\pi$ cm³.`, r: r`The volume of a sphere of radius $r$ is $\dfrac43\pi r^3$.`, key: 'd', sol: r`By R the sphere has volume $\dfrac43\pi \times 27 = 36\pi$ cm³, so the hemisphere has $18\pi$ cm³. A is false; R is true.`, d: 2, c: 'understanding', t: [2] }), (C) => { C.assert(near(hemi.vol(Math.PI, 3), 18 * Math.PI), '18π'); C.key('d'); });
Q('ar5', mk.ar({ a: r`The volume of a toy made of a cone (radius $r$, height $h$) on a hemisphere of radius $r$ is $\dfrac13\pi r^2(h + 2r)$.`, r: 'The volume of a solid made by joining two solids without overlap is the sum of their volumes.', key: 'a', sol: r`By R, $V = \dfrac13\pi r^2h + \dfrac23\pi r^3 = \dfrac13\pi r^2(h + 2r)$. R explains A.`, d: 3, c: 'analysis', t: [2] }), (C) => { const [rr, h] = [3, 4]; C.assert(near(cone.vol(Math.PI, rr, h) + hemi.vol(Math.PI, rr), (Math.PI * rr * rr * (h + 2 * rr)) / 3), 'identity'); C.key('a'); });
Q('ar6', mk.ar({ a: r`The curved surface area of a cone of radius $3$ cm and height $4$ cm is $12\pi$ cm².`, r: r`The slant height of a cone of radius $r$ and height $h$ is $\sqrt{r^2 + h^2}$.`, key: 'd', sol: r`By R, $l = 5$ cm, so the curved surface is $\pi rl = 15\pi$ cm², not $12\pi$ (which uses $h$ instead of $l$). A is false; R is true.`, d: 2, c: 'understanding', t: [1] }), (C) => { C.assert(near(cone.csa(Math.PI, 3, 4), 15 * Math.PI), '15π'); C.key('d'); });

// =============================================================== True / false
Q('tf1', mk.tf({ stem: 'The volume of a hemisphere is half the volume of a sphere of the same radius.', key: 't', sol: r`$\dfrac23\pi r^3 = \dfrac12 \times \dfrac43\pi r^3$.`, d: 1, c: 'recall', t: [2] }), (C) => { C.assert(near(hemi.vol(P3, 5) * 2, sph.vol(P3, 5)), 'half'); C.key('t'); });
Q('tf2', mk.tf({ stem: 'The total surface area of two cubes joined face to face is the sum of the total surface areas of the two cubes.', key: 'f', sol: r`The two faces that touch are hidden, so the joined solid has $2a^2$ less surface: $10a^2$ instead of $12a^2$.`, d: 2, c: 'understanding', t: [1] }), (C) => { C.assert(cuboid.tsa(4, 2, 2) === 10 * 4, '10a² for a = 2'); C.key('f'); });
Q('tf3', mk.tf({ stem: r`The curved surface area of a cylinder of radius $r$ and height $h$ is $2\pi rh$.`, key: 't', sol: r`Unrolled, the curved surface is a rectangle $2\pi r$ long and $h$ wide.`, d: 1, c: 'recall', t: [1] }), (C) => C.key('t'));
Q('tf4', mk.tf({ stem: r`A cone of radius $7$ cm and height $24$ cm has a slant height of $31$ cm.`, key: 'f', sol: r`$l = \sqrt{49 + 576} = \sqrt{625} = 25$ cm. Adding $7 + 24$ is the mistake.`, d: 1, c: 'understanding', t: [1] }), (C) => { C.assert(slant(7, 24) === 25, '25'); C.key('f'); });
Q('tf5', mk.tf({ stem: r`If a hemisphere of radius $r$ is scooped out of a face of a solid cube, the total surface area of the solid increases by $\pi r^2$.`, key: 't', sol: r`A circle of area $\pi r^2$ is removed from the face, but the inside of the bowl, $2\pi r^2$, is added: net change $+\pi r^2$.`, d: 3, c: 'analysis', t: [1] }), (C) => { C.assert(near(hemi.csa(P3, 2) - cyl.base(P3, 2), P3 * 4), '+πr²'); C.key('t'); });

// =============================================================== Fill in the blank
Q('fb1', mk.fill({ stem: r`The slant height $l$ of a cone with radius $r$ and height $h$ is $l =$ ___.`, acc: [['√(r²+h²)', '√(r² + h²)', 'sqrt(r^2+h^2)', 'sqrt(r^2 + h^2)', '√(h²+r²)', 'sqrt(h^2+r^2)']], sol: r`$r$, $h$ and $l$ form a right triangle with hypotenuse $l$: $l = \sqrt{r^2 + h^2}$.`, d: 1, c: 'recall', t: [1] }), (C) => C.blank('√(r²+h²)'));
Q('fb2', mk.fill({ stem: 'The volume of a cone is ___ of the volume of a cylinder with the same base and height.', acc: [['1/3', 'one-third', 'one third', '⅓']], sol: r`$\dfrac13\pi r^2h$ against $\pi r^2h$.`, d: 1, c: 'recall', t: [2] }), (C) => C.blank(1 / 3));
Q('fb3', mk.fill({ stem: '1 litre = ___ cm³.', acc: [['1000']], sol: r`$1$ litre $= 1000$ cm³ (and $1000$ litres $= 1$ m³).`, d: 1, c: 'recall', t: [2] }), (C) => C.blank(1000));
Q('fb4', mk.fill({ stem: r`The curved surface area of a hemisphere of radius $7$ cm is ___ cm² (use $\pi = \dfrac{22}{7}$).`, acc: [['308']], sol: r`$2\pi r^2 = 2 \times \dfrac{22}{7} \times 49 = 308$ cm².`, d: 1, c: 'understanding', t: [1] }), (C) => C.blank(R6(hemi.csa(P7, 7))));
Q('fb5', mk.fill({ stem: r`The volume of a sphere of radius $3$ cm is ___ $\pi$ cm³.`, acc: [['36']], sol: r`$\dfrac43\pi \times 27 = 36\pi$ cm³.`, d: 2, c: 'understanding', t: [2] }), (C) => C.blank(R6(sph.vol(1, 3))));

// =============================================================== Numerical
Q('n01', mk.num({ stem: r`Find the total surface area (in cm²) of a closed solid cylinder of radius $7$ cm and height $10$ cm. Use $\pi = \dfrac{22}{7}$.`, value: 748, unit: 'cm²', marks: 2, sol: r`**Step 1.** TSA $= 2\pi r(r + h)$.

**Step 2.** $2 \times \dfrac{22}{7} \times 7 \times (7 + 10) = 44 \times 17 = 748$ cm².`, scheme: [['2πr(r + h)', 1], ['748 cm²', 1]], d: 2, c: 'understanding', t: [1], time: 90 }), (C) => C.val(R6(cyl.csa(P7, 7, 10) + 2 * cyl.base(P7, 7))));
Q('n02', mk.num({ stem: r`Find the curved surface area (in cm²) of a cone of radius $21$ cm and height $20$ cm. Use $\pi = \dfrac{22}{7}$.`, value: 1914, unit: 'cm²', marks: 2, sol: r`**Step 1.** $l = \sqrt{21^2 + 20^2} = \sqrt{441 + 400} = \sqrt{841} = 29$ cm.

**Step 2.** $\pi rl = \dfrac{22}{7} \times 21 \times 29 = 66 \times 29 = 1914$ cm².`, scheme: [['l = 29 cm', 1], ['1914 cm²', 1]], d: 2, c: 'understanding', t: [1], time: 120 }), (C) => { C.val(R6(cone.csa(P7, 21, 20))); C.sol([29, 841]); });
Q('n03', mk.num({ stem: r`A wooden toy rocket is a cylinder of radius $3$ cm and height $10$ cm with a cone of radius $3$ cm and height $4$ cm on top. Find its volume in cm³. Use $\pi = 3.14$.`, value: 320.28, unit: 'cm³', tol: 0.005, marks: 2, sol: r`**Step 1.** Cylinder $= 3.14 \times 9 \times 10 = 282.6$ cm³; cone $= \dfrac13 \times 3.14 \times 9 \times 4 = 37.68$ cm³.

**Step 2.** Volume $= 282.6 + 37.68 = 320.28$ cm³.`, scheme: [['Cylinder 282.6 and cone 37.68', 1], ['320.28 cm³', 1]], d: 2, c: 'understanding', t: [2], time: 120 }), (C) => { C.val(R6(cyl.vol(P3, 3, 10) + cone.vol(P3, 3, 4)), 0.005); C.sol([282.6, 37.68]); });
Q('n04', mk.num({ stem: r`A hemispherical steel bowl has an inner radius of $10.5$ cm. Find its capacity in cm³. Use $\pi = \dfrac{22}{7}$.`, value: 2425.5, unit: 'cm³', marks: 2, sol: r`**Step 1.** $V = \dfrac23\pi r^3$, with $10.5^3 = 1157.625$.

**Step 2.** $\dfrac23 \times \dfrac{22}{7} \times 1157.625 = 2425.5$ cm³ (about $2.43$ litres).`, scheme: [['Hemisphere volume formula', 1], ['2425.5 cm³', 1]], d: 2, c: 'understanding', t: [2], time: 120 }), (C) => { C.val(R6(hemi.vol(P7, 10.5))); C.sol([1157.625]); });
Q('n05', mk.num({ stem: r`The hemispherical dome of a gurdwara in Amritsar has radius $7$ m. Find the cost (in ₹) of gilding its curved surface at ₹$20$ per m². Use $\pi = \dfrac{22}{7}$.`, value: 6160, unit: '₹', marks: 2, sol: r`**Step 1.** Curved surface $= 2\pi r^2 = 2 \times \dfrac{22}{7} \times 49 = 308$ m².

**Step 2.** Cost $= 308 \times 20 = $ ₹$6160$.`, scheme: [['308 m²', 1], ['₹6160', 1]], d: 2, c: 'understanding', t: [1], time: 90 }), (C) => { C.val(R6(hemi.csa(P7, 7) * 20)); C.sol([308]); });
Q('n06', mk.num({ stem: r`A grain silo near Karnal is a cylinder of radius $2.1$ m and height $5$ m with a conical top of height $1.5$ m. Find its volume in m³. Use $\pi = \dfrac{22}{7}$.`, value: 76.23, unit: 'm³', tol: 0.005, marks: 2, sol: r`**Step 1.** $\pi r^2 = \dfrac{22}{7} \times 4.41 = 13.86$ m².

**Step 2.** Volume $= 13.86 \times 5 + \dfrac13 \times 13.86 \times 1.5 = 69.3 + 6.93 = 76.23$ m³.`, scheme: [['Cylinder 69.3 and cone 6.93', 1], ['76.23 m³', 1]], d: 2, c: 'understanding', t: [2], time: 120 }), (C) => { C.val(R6(cyl.vol(P7, 2.1, 5) + cone.vol(P7, 2.1, 1.5)), 0.005); C.sol([13.86, 69.3, 6.93]); });
Q('n07', mk.num({ stem: r`A toy is a cone of radius $5$ cm and height $12$ cm mounted on a hemisphere of radius $5$ cm. Find its total surface area in cm². Use $\pi = 3.14$.`, value: 361.1, unit: 'cm²', tol: 0.005, marks: 2, sol: r`**Step 1.** $l = \sqrt{25 + 144} = 13$ cm.

**Step 2.** Surface $= \pi rl + 2\pi r^2 = 3.14 \times 5 \times (13 + 10) = 15.7 \times 23 = 361.1$ cm².`, scheme: [['l = 13 cm and visible faces', 1], ['361.1 cm²', 1]], d: 3, c: 'application', t: [1], time: 150 }), (C) => { C.val(R6(cone.csa(P3, 5, 12) + hemi.csa(P3, 5)), 0.005); C.sol([13, 15.7, 23]); });
Q('n08', mk.num({ stem: r`From a solid wooden cylinder of radius $3.5$ cm and height $6$ cm, a cone of the same radius and height is carved out. Find the volume of wood left in cm³. Use $\pi = \dfrac{22}{7}$.`, value: 154, unit: 'cm³', marks: 2, sol: r`**Step 1.** Cylinder $= \dfrac{22}{7} \times 12.25 \times 6 = 231$ cm³.

**Step 2.** Wood left $= \dfrac23 \times 231 = 154$ cm³ (the cone takes one-third).`, scheme: [['Cylinder 231 cm³', 1], ['154 cm³', 1]], d: 3, c: 'understanding', t: [2], time: 120 }), (C) => { C.val(R6(cyl.vol(P7, 3.5, 6) - cone.vol(P7, 3.5, 6))); C.sol([231]); });
Q('n09', mk.num({ stem: r`From a solid cube of edge $10$ cm, a hemisphere of radius $3.5$ cm is scooped out of each of two opposite faces. Find the total surface area of the remaining solid in cm². Use $\pi = \dfrac{22}{7}$.`, value: 677, unit: 'cm²', marks: 2, sol: r`**Step 1.** Each scoop removes a circle $\pi r^2 = 38.5$ cm² and adds a bowl $2\pi r^2 = 77$ cm²: net $+38.5$ cm².

**Step 2.** Surface $= 6 \times 100 + 2 \times 38.5 = 600 + 77 = 677$ cm².`, scheme: [['Net change +πr² per scoop', 1], ['677 cm²', 1]], d: 4, c: 'analysis', t: [1], time: 180 }), (C) => { C.val(R6(600 + 2 * (hemi.csa(P7, 3.5) - cyl.base(P7, 3.5)))); C.sol([38.5, 77, 600]); });

// =============================================================== Short answer, 2 marks
Q('s201', mk.short({ marks: 2, stem: r`A solid is made of a cylinder of radius $7$ cm and height $5$ cm with a hemisphere of radius $7$ cm on top. Find its total surface area. Use $\pi = \dfrac{22}{7}$.`, assets: [figs.hemiCyl], model: r`Visible surfaces: curved cylinder $2\pi rh = 2 \times \dfrac{22}{7} \times 7 \times 5 = 220$ cm²; bottom circle $\pi r^2 = 154$ cm²; curved hemisphere $2\pi r^2 = 308$ cm².

Total $= 220 + 154 + 308 = 682$ cm².`, sol: 'The joining circle is hidden and is not counted.', scheme: [['Correct visible faces', 1], ['682 cm²', 1]], d: 2, c: 'application', t: [1], time: 120 }), (C) => { C.assert(near(cyl.csa(P7, 7, 5) + cyl.base(P7, 7) + hemi.csa(P7, 7), 682), '682'); C.model([220, 154, 308, 682]); });
Q('s202', mk.short({ marks: 2, stem: r`Find the volume of the solid in the previous question: a cylinder of radius $7$ cm and height $5$ cm with a hemisphere of radius $7$ cm on top. Use $\pi = \dfrac{22}{7}$.`, model: r`Cylinder $= \dfrac{22}{7} \times 49 \times 5 = 770$ cm³. Hemisphere $= \dfrac23 \times \dfrac{22}{7} \times 343 \approx 718.67$ cm³.

Volume $= 770 + 718.67 = 1488.67$ cm³.`, sol: r`Exactly, $\dfrac{4466}{3}$ cm³.`, scheme: [['Cylinder 770 and hemisphere 718.67', 1], ['1488.67 cm³', 1]], d: 2, c: 'understanding', t: [2], time: 120 }), (C) => { C.assert(near(R2(cyl.vol(P7, 7, 5) + hemi.vol(P7, 7)), 1488.67), '1488.67'); C.model([770, 718.67, 1488.67]); });
Q('s203', mk.short({ marks: 2, stem: r`A joker's cap for a school play in Mysuru is a cone of base radius $7$ cm and height $24$ cm. Find the area of sheet needed to make it. Use $\pi = \dfrac{22}{7}$.`, model: r`$l = \sqrt{7^2 + 24^2} = \sqrt{625} = 25$ cm.

Sheet $=$ curved surface $= \pi rl = \dfrac{22}{7} \times 7 \times 25 = 550$ cm².`, sol: 'A cap has no base: only the curved surface is needed.', scheme: [['l = 25 cm', 1], ['550 cm²', 1]], d: 2, c: 'understanding', t: [1], time: 120 }), (C) => { C.assert(near(cone.csa(P7, 7, 24), 550), '550'); C.model([25, 550]); });
Q('s204', mk.short({ marks: 2, stem: r`An ice-cream cone has radius $3.5$ cm and height $9$ cm. It is filled with ice cream, with a hemisphere of ice cream on top. Find the volume of ice cream. Use $\pi = \dfrac{22}{7}$.`, model: r`$\pi r^2 = \dfrac{22}{7} \times 12.25 = 38.5$ cm².

Cone $= \dfrac13 \times 38.5 \times 9 = 115.5$ cm³; hemisphere $= \dfrac23 \times 38.5 \times 3.5 \approx 89.83$ cm³.

Total $\approx 115.5 + 89.83 = 205.33$ cm³.`, sol: r`Using $V = \dfrac13\pi r^2(h + 2r) = \dfrac13 \times 38.5 \times 16 \approx 205.33$ ✓.`, scheme: [['Cone 115.5 and hemisphere 89.83', 1], ['205.33 cm³', 1]], d: 2, c: 'understanding', t: [2], time: 150 }), (C) => { C.assert(near(R2(cone.vol(P7, 3.5, 9) + hemi.vol(P7, 3.5)), 205.33), '205.33'); C.model([38.5, 115.5, 89.83, 205.33]); });
Q('s205', mk.short({ marks: 2, stem: r`A tent is a cylinder of radius $7$ m and height $4$ m with a conical top of slant height $10$ m. Arjun finds the canvas needed as $2\pi r(r + h) + \pi r(l + r) = 858$ m². Find his mistake and the correct area. Use $\pi = \dfrac{22}{7}$.`, model: r`He used **total** surface areas, counting the floor, the top of the cylinder and the base of the cone. A tent has no floor and the two joined circles are inside.

Canvas $= 2\pi rh + \pi rl = 2 \times \dfrac{22}{7} \times 7 \times 4 + \dfrac{22}{7} \times 7 \times 10 = 176 + 220 = 396$ m².`, sol: r`His value: $44 \times 11 + 22 \times 17 = 484 + 374 = 858$; it includes three circles of $154$ m² each.`, scheme: [['Identifies the extra circles', 1], ['396 m²', 1]], d: 3, c: 'evaluation', t: [1], time: 150 }), (C) => { const right = cyl.csa(P7, 7, 4) + P7 * 7 * 10; const wrong = 2 * P7 * 7 * 11 + P7 * 7 * 17; C.assert(near(right, 396) && near(wrong, 858) && near(wrong - right, 3 * 154), 'three circles'); C.model([176, 220, 396]); C.sol([858, 154]); });
Q('s206', mk.short({ marks: 2, stem: r`A hemisphere and a cone have the same radius $r$, and the height of the cone is also $r$. Find the ratio of their volumes.`, model: r`Hemisphere $= \dfrac23\pi r^3$; cone $= \dfrac13\pi r^2 \times r = \dfrac13\pi r^3$.

Ratio $= \dfrac23 : \dfrac13 = 2 : 1$.`, sol: 'The hemisphere holds exactly two such cones.', scheme: [['Both volumes in terms of r', 1], ['2 : 1', 1]], d: 3, c: 'analysis', t: [2], time: 120 }), (C) => { C.assert(near(hemi.vol(P3, 4) / cone.vol(P3, 4, 4), 2), '2:1'); C.model(['2 : 1']); });
Q('s207', mk.short({ marks: 2, stem: r`Two identical solid hemispheres of radius $3.5$ cm are glued together along their flat faces. How much less paint (area) is needed for the joined solid than for painting the two hemispheres separately? Use $\pi = \dfrac{22}{7}$.`, model: r`Separately: $2 \times 3\pi r^2 = 6\pi r^2 = 6 \times 38.5 = 231$ cm². Joined, they form a sphere: $4\pi r^2 = 154$ cm².

Saving $= 231 - 154 = 77$ cm² (the two hidden flat faces, $2\pi r^2$).`, sol: 'Joining hides the two flat circles.', scheme: [['231 and 154 cm²', 1], ['77 cm²', 1]], d: 2, c: 'application', t: [1], time: 120 }), (C) => { C.assert(near(2 * hemi.tsa(P7, 3.5) - sph.sa(P7, 3.5), 77), '77'); C.model([231, 154, 77]); });
Q('s208', mk.short({ marks: 2, stem: r`A steel vessel is a cylinder of radius $7$ cm with a hemispherical bottom of the same radius. Its total height is $20$ cm. Find its capacity in litres. Use $\pi = \dfrac{22}{7}$.`, model: r`Cylinder height $= 20 - 7 = 13$ cm. Cylinder $= \dfrac{22}{7} \times 49 \times 13 = 2002$ cm³; hemisphere $\approx 718.67$ cm³.

Capacity $\approx 2720.67$ cm³ $\approx 2.72$ litres.`, sol: 'The total height includes the radius of the hemisphere.', scheme: [['Cylinder height 13 cm', 1], ['2720.67 cm³ ≈ 2.72 L', 1]], d: 3, c: 'application', t: [2], time: 150 }), (C) => { const v = cyl.vol(P7, 7, 13) + hemi.vol(P7, 7); C.assert(near(R2(v), 2720.67) && near(R2(v / 1000), 2.72), 'capacity'); C.model([13, 2002, 718.67, 2720.67, 2.72]); });
Q('s209', mk.short({ marks: 2, stem: r`A cube of edge $4$ cm is fixed at the centre of the top face of a cuboid $10$ cm $\times$ $8$ cm $\times$ $6$ cm. Find the total surface area of the solid.`, assets: [figs.cuboidCube], model: r`Cuboid $= 2(80 + 60 + 48) = 376$ cm². The cube hides a $4 \times 4$ square of the cuboid's top, but its own top face shows the same area; so we add only the cube's four side faces: $4 \times 16 = 64$ cm².

Total $= 376 + 64 = 440$ cm².`, sol: 'Covered area on the cuboid = area of the cube\'s top face.', scheme: [['Cuboid 376 cm²', 1], ['Add four faces, 440 cm²', 1]], d: 3, c: 'application', t: [1], time: 150 }), (C) => { const t = cuboid.tsa(10, 8, 6) - 16 + (6 * 16 - 16); C.assert(t === 440, '440'); C.model([376, 64, 440]); });

// =============================================================== Short answer, 3 marks
Q('s301', mk.short({ marks: 3, stem: r`A toy rocket is a cylinder of radius $3$ cm and height $10$ cm with a cone of radius $3$ cm and height $4$ cm on top. Find its total surface area, including the bottom. Use $\pi = 3.14$.`, model: r`Slant height $l = \sqrt{9 + 16} = 5$ cm.

Visible faces: curved cylinder $2\pi rh$, bottom circle $\pi r^2$, curved cone $\pi rl$.

Surface $= \pi r(2h + r + l) = 3.14 \times 3 \times (20 + 3 + 5) = 9.42 \times 28 = 263.76$ cm².`, sol: 'The circle where the cone sits is hidden.', scheme: [['l = 5 cm', 1], ['Correct faces', 1], ['263.76 cm²', 1]], d: 3, c: 'application', t: [1], time: 240 }), (C) => { C.assert(near(cyl.csa(P3, 3, 10) + cyl.base(P3, 3) + cone.csa(P3, 3, 4), 263.76), '263.76'); C.model([5, 9.42, 28, 263.76]); });
Q('s302', mk.short({ marks: 3, stem: r`A wooden block $15$ cm $\times$ $10$ cm $\times$ $4$ cm has two hemispherical hollows, each of radius $2.1$ cm, scooped from its top face to hold ink pots. Find the volume of wood in the block. Use $\pi = \dfrac{22}{7}$.`, model: r`Block $= 15 \times 10 \times 4 = 600$ cm³.

One hollow $= \dfrac23 \times \dfrac{22}{7} \times 2.1^3 = \dfrac23 \times \dfrac{22}{7} \times 9.261 = 19.404$ cm³; two hollows $= 38.808$ cm³.

Wood $= 600 - 38.808 = 561.192$ cm³.`, sol: 'Volume removed is subtracted; the hollows (depth 2.1 cm) fit within the 4 cm height.', scheme: [['Block 600 cm³', 1], ['Two hollows 38.808 cm³', 1], ['561.192 cm³', 1]], d: 3, c: 'understanding', t: [2], time: 240 }), (C) => { C.assert(near(600 - 2 * hemi.vol(P7, 2.1), 561.192), '561.192'); C.model([600, 19.404, 38.808, 561.192]); });
Q('s303', mk.short({ marks: 3, stem: r`A spinning top is a cone of height $8$ cm on a hemisphere, both of radius $6$ cm. Find its surface area and the cost of painting it at $50$ paise per cm². Use $\pi = 3.14$.`, model: r`$l = \sqrt{36 + 64} = 10$ cm.

Surface $= \pi rl + 2\pi r^2 = 3.14 \times 6 \times (10 + 12) = 18.84 \times 22 = 414.48$ cm².

Cost $= 414.48 \times 0.50 = $ ₹$207.24$.`, sol: 'Only the two curved surfaces are on the outside.', scheme: [['l = 10 cm', 1], ['414.48 cm²', 1], ['₹207.24', 1]], d: 3, c: 'application', t: [1], time: 240 }), (C) => { const s = cone.csa(P3, 6, 8) + hemi.csa(P3, 6); C.assert(near(s, 414.48) && near(s * 0.5, 207.24), 'values'); C.model([10, 18.84, 414.48, 207.24]); });
Q('s304', mk.short({ marks: 3, stem: r`A cement storage silo at a site in Visakhapatnam is a cylinder of radius $1.4$ m and height $3$ m with a conical top of height $2.1$ m. Find the volume of cement it can hold. Use $\pi = \dfrac{22}{7}$.`, model: r`$\pi r^2 = \dfrac{22}{7} \times 1.96 = 6.16$ m².

Volume $= \pi r^2\left(h_1 + \dfrac{h_2}{3}\right) = 6.16 \times (3 + 0.7) = 6.16 \times 3.7 = 22.792$ m³.`, sol: r`Cylinder $18.48$ m³ $+$ cone $4.312$ m³.`, scheme: [['πr² = 6.16', 1], ['Sum of cylinder and cone', 1], ['22.792 m³', 1]], d: 3, c: 'understanding', t: [2], time: 240 }), (C) => { C.assert(near(cyl.vol(P7, 1.4, 3) + cone.vol(P7, 1.4, 2.1), 22.792), '22.792'); C.model([6.16, 3.7, 22.792]); C.sol([18.48, 4.312]); });
Q('s305', mk.short({ marks: 3, stem: r`Neha writes the total surface area of a solid made of a hemisphere and a cone of the same radius $r$ (slant height $l$) as $\pi rl + 3\pi r^2$. Find her error. Then find the correct surface area for $r = 14$ cm and $l = 50$ cm. Use $\pi = \dfrac{22}{7}$.`, model: r`She used the hemisphere's **total** surface $3\pi r^2$, which includes its flat face. That face is glued to the cone's base and is hidden. Correct: $\pi rl + 2\pi r^2$.

For $r = 14$, $l = 50$: $\pi rl = \dfrac{22}{7} \times 14 \times 50 = 2200$ cm², $2\pi r^2 = 1232$ cm²; surface $= 3432$ cm² (her formula gives $2200 + 1848 = 4048$ cm²).`, sol: 'Count only the outer surfaces.', scheme: [['Identifies the hidden flat face', 1], ['Correct formula', 1], ['3432 cm²', 1]], d: 3, c: 'evaluation', t: [1], time: 240 }), (C) => { C.assert(near(P7 * 14 * 50 + hemi.csa(P7, 14), 3432) && near(P7 * 14 * 50 + hemi.tsa(P7, 14), 4048), 'values'); C.model([2200, 1232, 3432, 1848, 4048]); });
Q('s306', mk.short({ marks: 3, stem: r`The largest possible cone is cut from a solid cube of edge $6$ cm (its base touches four edges of the bottom face and its apex is at the centre of the top face). Find the volume of the cone and the percentage of the cube it uses. Use $\pi = 3.14$.`, model: r`The base circle fits in a $6 \times 6$ face, so $r = 3$ cm; the height is the edge, $h = 6$ cm.

Cone $= \dfrac13 \times 3.14 \times 9 \times 6 = 56.52$ cm³. Cube $= 216$ cm³.

Percentage $= \dfrac{56.52}{216} \times 100 \approx 26.17\%$.`, sol: r`In general the fraction is $\dfrac{\pi}{12}$, independent of the edge.`, scheme: [['r = 3, h = 6', 1], ['56.52 cm³', 1], ['≈ 26.17%', 1]], d: 4, c: 'analysis', t: [2], time: 270 }), (C) => { const v = cone.vol(P3, 3, 6); C.assert(near(v, 56.52) && near(R2((v / 216) * 100), 26.17), 'values'); C.model([3, 6, 56.52, 216, 26.17]); });
Q('s307', mk.short({ marks: 3, stem: r`From a solid cylinder of radius $5$ cm and height $12$ cm, a cone of the same radius and height is hollowed out from the top face. Find the total surface area of the remaining solid. Use $\pi = 3.14$.`, model: r`Slant height of the cavity $l = \sqrt{25 + 144} = 13$ cm.

The top face is now open (it is the cone's base), so the surfaces are: curved cylinder $2\pi rh$, bottom circle $\pi r^2$, inside of the cone $\pi rl$.

Surface $= \pi r(2h + r + l) = 3.14 \times 5 \times (24 + 5 + 13) = 15.7 \times 42 = 659.4$ cm².`, sol: 'The cavity adds its curved surface and removes the top circle.', scheme: [['l = 13 cm', 1], ['Correct three surfaces', 1], ['659.4 cm²', 1]], d: 4, c: 'analysis', t: [1], time: 270 }), (C) => { C.assert(near(cyl.csa(P3, 5, 12) + cyl.base(P3, 5) + cone.csa(P3, 5, 12), 659.4), '659.4'); C.model([13, 15.7, 42, 659.4]); });

// =============================================================== Long answer, 5 marks
Q('l01', mk.long({ stem: r`A shamiana for a wedding in Udaipur is a cylinder of radius $14$ m and height $3$ m with a conical roof of height $10.5$ m.
(a) Find the slant height of the roof.
(b) Find the area of canvas used (there is no floor).
(c) Find the cost of the canvas at ₹$80$ per m².
(d) Find the volume of air inside.
Use $\pi = \dfrac{22}{7}$.`, assets: [figs.shamiana], model: r`(a) $l = \sqrt{14^2 + 10.5^2} = \sqrt{196 + 110.25} = \sqrt{306.25} = 17.5$ m.

(b) Canvas $= 2\pi rh + \pi rl = \dfrac{22}{7} \times 14 \times (6 + 17.5) = 44 \times 23.5 = 1034$ m².

(c) Cost $= 1034 \times 80 = $ ₹$82720$.

(d) $\pi r^2 = 616$ m². Air $= 616 \times 3 + \dfrac13 \times 616 \times 10.5 = 1848 + 2156 = 4004$ m³.`, sol: 'Surface: only the curved surfaces; volume: cylinder plus cone.', scheme: [['l = 17.5 m', 1], ['Canvas 1034 m²', 1], ['Cost ₹82720', 1], ['Cylinder 1848 and cone 2156', 1], ['Air 4004 m³', 1]], d: 3, c: 'application', t: [1, 2], time: 660 }), (C) => { const can = cyl.csa(P7, 14, 3) + cone.csa(P7, 14, 10.5); const air = cyl.vol(P7, 14, 3) + cone.vol(P7, 14, 10.5); C.assert(slant(14, 10.5) === 17.5 && near(can, 1034) && near(air, 4004), 'values'); C.model([17.5, 1034, 82720, 1848, 2156, 4004]); });
Q('l02', mk.long({ stem: r`An electric water heater tank in a Shimla hotel is a cylinder $1.2$ m long with a hemisphere at each end; its radius is $0.35$ m.
(a) Find the outer surface area of the tank.
(b) Find its capacity in litres.
(c) The outside is coated with insulation at ₹$250$ per m². Find the cost.
Use $\pi = \dfrac{22}{7}$.`, model: r`(a) Surface $= 2\pi rh + 4\pi r^2 = 2 \times \dfrac{22}{7} \times 0.35 \times 1.2 + 4 \times \dfrac{22}{7} \times 0.1225 = 2.64 + 1.54 = 4.18$ m².

(b) Volume $= \pi r^2h + \dfrac43\pi r^3 = \dfrac{22}{7} \times 0.1225 \times 1.2 + \dfrac43 \times \dfrac{22}{7} \times 0.042875 = 0.462 + 0.17967 \approx 0.64167$ m³ $\approx 641.67$ litres.

(c) Cost $= 4.18 \times 250 = $ ₹$1045$.`, sol: 'Two hemispheres make one sphere.', scheme: [['Surface parts 2.64 and 1.54', 1], ['4.18 m²', 1], ['Volume parts 0.462 and 0.17967', 1], ['≈ 641.67 litres', 1], ['₹1045', 1]], d: 3, c: 'application', t: [1, 2], time: 660 }), (C) => { const s = cyl.csa(P7, 0.35, 1.2) + sph.sa(P7, 0.35); const v = cyl.vol(P7, 0.35, 1.2) + sph.vol(P7, 0.35); C.assert(near(s, 4.18) && near(R2(v * 1000), 641.67), 'values'); C.model([2.64, 1.54, 4.18, 0.462, 641.67, 1045]); });
Q('l03', mk.long({ stem: r`A wooden toy is a cone of radius $10.5$ cm and height $14$ cm on a hemisphere of the same radius.
(a) Find its total surface area.
(b) Find its volume.
(c) The toy is packed in the smallest cylindrical box that holds it upright. Find the empty space in the box.
Use $\pi = \dfrac{22}{7}$.`, model: r`(a) $l = \sqrt{110.25 + 196} = \sqrt{306.25} = 17.5$ cm. Surface $= \pi r(l + 2r) = \dfrac{22}{7} \times 10.5 \times (17.5 + 21) = 33 \times 38.5 = 1270.5$ cm².

(b) $\pi r^2 = 346.5$ cm². Volume $= \dfrac13 \times 346.5 \times (14 + 21) = 115.5 \times 35 = 4042.5$ cm³.

(c) Box: radius $10.5$ cm, height $14 + 10.5 = 24.5$ cm: $346.5 \times 24.5 = 8489.25$ cm³. Empty space $= 8489.25 - 4042.5 = 4446.75$ cm³.`, sol: r`$V = \dfrac13\pi r^2(h + 2r)$ for a cone on a hemisphere.`, scheme: [['l = 17.5 cm', 1], ['Surface 1270.5 cm²', 1], ['Volume 4042.5 cm³', 1], ['Box 8489.25 cm³', 1], ['Empty 4446.75 cm³', 1]], d: 4, c: 'application', t: [1, 2], time: 720 }), (C) => { const s = cone.csa(P7, 10.5, 14) + hemi.csa(P7, 10.5), v = cone.vol(P7, 10.5, 14) + hemi.vol(P7, 10.5), box = cyl.vol(P7, 10.5, 24.5); C.assert(near(s, 1270.5) && near(v, 4042.5) && near(box - v, 4446.75), 'values'); C.model([17.5, 1270.5, 346.5, 4042.5, 8489.25, 4446.75]); });
Q('l04', mk.long({ stem: r`A solid wooden cube has edge $14$ cm. A hemisphere of radius $7$ cm is scooped out of the centre of its top face, and the scooped hemisphere is glued, flat face down, at the centre of the bottom face.
(a) Explain how scooping changes the surface area.
(b) Explain how gluing the hemisphere changes the surface area.
(c) Find the total surface area of the new solid.
(d) Has the volume changed? Justify.
Use $\pi = \dfrac{22}{7}$.`, model: r`(a) Scooping removes a circle $\pi r^2$ from the top face but exposes the inside of the bowl, $2\pi r^2$: net $+\pi r^2$.

(b) Gluing hides a circle $\pi r^2$ of the bottom face but adds the dome's curved surface $2\pi r^2$: net $+\pi r^2$.

(c) Cube $= 6 \times 196 = 1176$ cm²; $\pi r^2 = 154$ cm². Surface $= 1176 + 154 + 154 = 1484$ cm².

(d) No: the wood removed from the top ($\approx 718.67$ cm³) is the same wood added at the bottom, so the volume stays $14^3 = 2744$ cm³.`, sol: 'Each change adds 2πr² and removes πr².', scheme: [['(a) net +πr²', 1], ['(b) net +πr²', 1], ['Cube 1176 and circle 154', 1], ['1484 cm²', 1], ['(d) Volume unchanged, 2744 cm³', 1]], d: 5, c: 'analysis', t: [1, 2], time: 720 }), (C) => { const s = 6 * 196 + 2 * (hemi.csa(P7, 7) - cyl.base(P7, 7)); C.assert(near(s, 1484) && 14 ** 3 === 2744, 'values'); C.model([1176, 154, 1484, 2744, 718.67]); });
Q('l05', mk.long({ stem: r`Each of the $12$ stone pillars of a mandapam in Hampi is a cylinder of radius $0.35$ m and height $4$ m with a hemispherical cap of the same radius.
(a) Find the area of the curved surfaces of one pillar (the base stands on the floor).
(b) Find the cost of polishing all $12$ pillars at ₹$45$ per m².
(c) Find the volume of stone in one pillar, to two decimal places.
Use $\pi = \dfrac{22}{7}$.`, assets: [figs.pillar], model: r`(a) $2\pi rh + 2\pi r^2 = 2 \times \dfrac{22}{7} \times 0.35 \times (4 + 0.35) = 2.2 \times 4.35 = 9.57$ m².

(b) $12 \times 9.57 = 114.84$ m²; cost $= 114.84 \times 45 = $ ₹$5167.80$.

(c) $\pi r^2h + \dfrac23\pi r^3 = \dfrac{22}{7} \times 0.1225 \times 4 + \dfrac23 \times \dfrac{22}{7} \times 0.042875 = 1.54 + 0.0898 \approx 1.63$ m³.`, sol: r`Factorising $2\pi r(h + r)$ keeps the arithmetic short.`, scheme: [['Curved surfaces formula', 1], ['9.57 m²', 1], ['₹5167.80', 1], ['Volume parts 1.54 and 0.0898', 1], ['≈ 1.63 m³', 1]], d: 3, c: 'application', t: [1, 2], time: 660 }), (C) => { const s = cyl.csa(P7, 0.35, 4) + hemi.csa(P7, 0.35), v = cyl.vol(P7, 0.35, 4) + hemi.vol(P7, 0.35); C.assert(near(s, 9.57) && near(12 * s * 45, 5167.8) && near(R2(v), 1.63), 'values'); C.model([9.57, 114.84, 5167.8, 1.54, 1.63]); });
Q('l06', mk.long({ stem: r`An ice-cream maker in Pune compares two cup designs that hold the **same** volume.
Design A: a cone of radius $3$ cm and height $4$ cm filled, with a hemisphere of ice cream of radius $3$ cm on top.
Design B: an open cylindrical cup of radius $3$ cm, filled level to the top.
(a) Find the volume of design A in terms of $\pi$.
(b) Find the height of the cup in design B.
(c) Find the area of wrapper needed for each design (A: cone and hemisphere surfaces; B: the curved side and the bottom of the cup).
(d) Which design needs less wrapper, and by how much? Use $\pi = 3.14$.`, model: r`(a) Cone $= \dfrac13\pi \times 9 \times 4 = 12\pi$; hemisphere $= \dfrac23\pi \times 27 = 18\pi$. $V_A = 30\pi$ cm³.

(b) $\pi \times 9 \times h = 30\pi \Rightarrow h = \dfrac{10}{3}$ cm.

(c) A: $l = 5$ cm; wrapper $= \pi rl + 2\pi r^2 = 15\pi + 18\pi = 33\pi$ cm². B: $2\pi rh + \pi r^2 = 2\pi \times 3 \times \dfrac{10}{3} + 9\pi = 20\pi + 9\pi = 29\pi$ cm².

(d) B needs less, by $4\pi = 4 \times 3.14 = 12.56$ cm² (A: $103.62$ cm², B: $91.06$ cm²).`, sol: 'Equal volumes, different surfaces: compare in terms of π before substituting.', scheme: [['V_A = 30π', 1], ['h = 10/3 cm', 1], ['A: 33π', 1], ['B: 29π', 1], ['B less by 12.56 cm²', 1]], d: 5, c: 'evaluation', t: [1, 2], time: 720 }), (C) => { const vA = cone.vol(1, 3, 4) + hemi.vol(1, 3); const h = vA / 9; const wA = cone.csa(1, 3, 4) + hemi.csa(1, 3), wB = cyl.csa(1, 3, h) + cyl.base(1, 3); C.assert(near(vA, 30) && near(h, 10 / 3) && near(wA, 33) && near(wB, 29), 'in π units'); C.model([30, '\\dfrac{10}{3}', 33, 29, 12.56, 103.62, 91.06]); });

// =============================================================== Case-based
caseQ('c01', {
  passage: r`A kulfi seller in Old Delhi uses moulds shaped like a cone of radius $2.1$ cm and height $7.2$ cm, topped with a hemisphere of radius $2.1$ cm, as shown. (Use $\pi = \dfrac{22}{7}$.)`,
  assets: [figs.kulfiCase], d: 3, c: 'application',
  model: r`(a) Option (a): $7.5$ cm. (b) $52.67$ cm³. (c) (i) $77.22$ cm². Or (ii) about $5.27$ litres.`,
  sol: r`$l = \sqrt{4.41 + 51.84} = \sqrt{56.25} = 7.5$. $\pi r^2 = 13.86$; $V = \dfrac13 \times 13.86 \times (7.2 + 4.2) = 52.668$. Surface $= \pi r(l + 2r) = 6.6 \times 11.7 = 77.22$.`,
  children: [
    child('a', mk.mcq({ stem: 'The slant height of the conical part is', opts: ['$7.5$ cm', '$9.3$ cm', '$5.1$ cm', '$7.2$ cm'], key: 'a', sol: r`$l = \sqrt{2.1^2 + 7.2^2} = \sqrt{4.41 + 51.84} = \sqrt{56.25} = 7.5$ cm. Option (b) adds the lengths; (d) is the height.`, d: 2, c: 'understanding', t: [1], time: 60 })),
    child('b', mk.num({ stem: 'Find the volume of one kulfi in cm³, to two decimal places.', value: 52.67, tol: 0.005, unit: 'cm³', sol: r`$\dfrac13\pi r^2h + \dfrac23\pi r^3 = \dfrac13 \times 13.86 \times (7.2 + 4.2) = 4.62 \times 11.4 = 52.668 \approx 52.67$ cm³.`, scheme: [['52.67 cm³', 1]], d: 3, c: 'understanding', t: [2], time: 120 })),
    child('c', mk.short({ marks: 2, stem: '**(i)** Each kulfi is wrapped in foil covering its whole surface. Find the area of foil per kulfi.', model: r`Surface $= \pi rl + 2\pi r^2 = \dfrac{22}{7} \times 2.1 \times (7.5 + 4.2) = 6.6 \times 11.7 = 77.22$ cm².`, sol: 'The flat circle is hidden inside.', scheme: [['Visible faces', 1], ['77.22 cm²', 1]], d: 3, c: 'application', t: [1], time: 120 }), [
      mk.short({ marks: 2, stem: '**(ii)** How many litres of kulfi mixture are needed for 100 kulfis?', model: r`$100 \times 52.668 = 5266.8$ cm³ $= 5.2668$ litres $\approx 5.27$ litres.`, sol: '1 litre = 1000 cm³.', scheme: [['5266.8 cm³', 1], ['≈ 5.27 litres', 1]], d: 2, c: 'application', t: [2], time: 90 }),
    ]),
  ],
}, (C) => { const l = slant(2.1, 7.2), v = cone.vol(P7, 2.1, 7.2) + hemi.vol(P7, 2.1), s = cone.csa(P7, 2.1, 7.2) + hemi.csa(P7, 2.1); C.child('a').which([7.5, 9.3, 5.1, 7.2], R6(l)); C.child('b').val(R2(v), 0.005); C.child('c').model([R2(s)]); C.child('cii').model([R2(v * 100 * 100) / 100, 5.27]); });

caseQ('c02', {
  passage: r`At the Rann Utsav in Kutch, guests stay in tents shaped like a cylinder of radius $2.8$ m and height $2$ m with a conical top of height $2.1$ m. (Use $\pi = \dfrac{22}{7}$.)`,
  d: 3, c: 'understanding',
  model: r`(a) Option (c). (b) $3.5$ m. (c) (i) $66$ m². Or (ii) $66.528$ m³.`,
  sol: r`$l = \sqrt{7.84 + 4.41} = 3.5$. Canvas $= \pi r(2h + l) = 8.8 \times 7.5 = 66$. Air $= \pi r^2(h_1 + \dfrac{h_2}{3}) = 24.64 \times 2.7 = 66.528$.`,
  children: [
    child('a', mk.mcq({ stem: 'The canvas of the tent (no floor) is', opts: ['TSA of cylinder + TSA of cone', 'CSA of cylinder + TSA of cone', 'CSA of cylinder + CSA of cone', 'TSA of cylinder + CSA of cone'], key: 'c', sol: 'The floor is not canvas, and the circle where the cone meets the cylinder is open inside the tent: only the two curved surfaces.', d: 1, c: 'understanding', t: [1], time: 45 })),
    child('b', mk.num({ stem: 'Find the slant height of the conical top in metres.', value: 3.5, unit: 'm', sol: r`$l = \sqrt{2.8^2 + 2.1^2} = \sqrt{7.84 + 4.41} = \sqrt{12.25} = 3.5$ m.`, scheme: [['3.5 m', 1]], d: 2, c: 'understanding', t: [1], time: 60 })),
    child('c', mk.short({ marks: 2, stem: '**(i)** Find the area of canvas in one tent.', model: r`$2\pi rh + \pi rl = \dfrac{22}{7} \times 2.8 \times (4 + 3.5) = 8.8 \times 7.5 = 66$ m².`, sol: 'Two curved surfaces.', scheme: [['Formula', 1], ['66 m²', 1]], d: 2, c: 'application', t: [1], time: 120 }), [
      mk.short({ marks: 2, stem: '**(ii)** Find the volume of air in one tent.', model: r`$\pi r^2 = \dfrac{22}{7} \times 7.84 = 24.64$ m². Air $= 24.64 \times 2 + \dfrac13 \times 24.64 \times 2.1 = 49.28 + 17.248 = 66.528$ m³.`, sol: 'Cylinder plus cone.', scheme: [['Cylinder 49.28 and cone 17.248', 1], ['66.528 m³', 1]], d: 3, c: 'understanding', t: [2], time: 120 }),
    ]),
  ],
}, (C) => { C.child('a').key('c'); C.child('b').val(R6(slant(2.8, 2.1))); C.child('c').model([R6(cyl.csa(P7, 2.8, 2) + cone.csa(P7, 2.8, 2.1))]); C.child('cii').model([49.28, 17.248, R6(cyl.vol(P7, 2.8, 2) + cone.vol(P7, 2.8, 2.1))]); });

caseQ('c03', {
  passage: r`A grain silo on a farm near Ludhiana is a cylinder of radius $3.5$ m and height $8$ m with a conical roof of height $8.4$ m. (Use $\pi = \dfrac{22}{7}$.)`,
  d: 3, c: 'understanding',
  model: r`(a) Option (b). (b) $308$ m³. (c) (i) $415.8$ m³. Or (ii) $100.1$ m².`,
  sol: r`$\pi r^2 = 38.5$. Cylinder $= 308$; cone $= \dfrac13 \times 38.5 \times 8.4 = 107.8$; total $415.8$. Roof: $l = \sqrt{12.25 + 70.56} = 9.1$, $\pi rl = 11 \times 9.1 = 100.1$.`,
  children: [
    child('a', mk.mcq({ stem: 'The volume of the silo is', opts: [r`$\pi r^2h_1 + \pi r^2h_2$`, r`$\pi r^2h_1 + \dfrac13\pi r^2h_2$`, r`$\dfrac13\pi r^2(h_1 + h_2)$`, r`$2\pi rh_1 + \pi rl$`], key: 'b', sol: 'Cylinder plus one-third of the cylinder on the same base for the cone. Option (d) is a surface area.', d: 2, c: 'understanding', t: [2], time: 60 })),
    child('b', mk.num({ stem: 'Find the volume of the cylindrical part in m³.', value: 308, unit: 'm³', sol: r`$\dfrac{22}{7} \times 12.25 \times 8 = 38.5 \times 8 = 308$ m³.`, scheme: [['308 m³', 1]], d: 2, c: 'understanding', t: [2], time: 60 })),
    child('c', mk.short({ marks: 2, stem: '**(i)** Find the total volume of grain the silo can hold.', model: r`Cone $= \dfrac13 \times 38.5 \times 8.4 = 107.8$ m³. Total $= 308 + 107.8 = 415.8$ m³.`, sol: 'Add the conical part.', scheme: [['Cone 107.8 m³', 1], ['415.8 m³', 1]], d: 2, c: 'understanding', t: [2], time: 90 }), [
      mk.short({ marks: 2, stem: '**(ii)** Find the area of metal sheet needed for the conical roof.', model: r`$l = \sqrt{3.5^2 + 8.4^2} = \sqrt{12.25 + 70.56} = \sqrt{82.81} = 9.1$ m. Sheet $= \pi rl = \dfrac{22}{7} \times 3.5 \times 9.1 = 100.1$ m².`, sol: 'Curved surface of the cone.', scheme: [['l = 9.1 m', 1], ['100.1 m²', 1]], d: 3, c: 'understanding', t: [1], time: 120 }),
    ]),
  ],
}, (C) => { C.child('a').key('b'); C.child('b').val(R6(cyl.vol(P7, 3.5, 8))); C.child('c').model([R6(cone.vol(P7, 3.5, 8.4)), R6(cyl.vol(P7, 3.5, 8) + cone.vol(P7, 3.5, 8.4))]); C.child('cii').model([R6(slant(3.5, 8.4)), R6(cone.csa(P7, 3.5, 8.4))]); });

caseQ('c04', {
  passage: r`For a science fair in Bhopal, students build a toy rocket: a cylinder of radius $3$ cm and height $12$ cm with a cone of radius $3$ cm and height $4$ cm on top, as shown. (Use $\pi = 3.14$.)`,
  assets: [figs.rocket], d: 3, c: 'application',
  model: r`(a) Option (d). (b) $376.8$ cm³. (c) (i) $301.44$ cm². Or (ii) the volume increases by $18.84$ cm³.`,
  sol: r`$V = \pi r^2\left(12 + \dfrac43\right) = 28.26 \times \dfrac{40}{3} = 376.8$. Surface $= \pi r(2h + r + l) = 9.42 \times 32 = 301.44$. Hemisphere $18\pi$ vs cone $12\pi$: $6\pi = 18.84$.`,
  children: [
    child('a', mk.mcq({ stem: 'Which surfaces make up the outer surface of the rocket (including its bottom)?', opts: ['TSA of cylinder + CSA of cone', 'CSA of cylinder + TSA of cone', 'TSA of cylinder + TSA of cone', 'CSA of cylinder + CSA of cone + bottom circle'], key: 'd', sol: 'The top of the cylinder and the base of the cone are glued together and hidden; the bottom circle is visible.', d: 2, c: 'understanding', t: [1], time: 60 })),
    child('b', mk.num({ stem: 'Find the volume of the rocket in cm³.', value: 376.8, tol: 0.005, unit: 'cm³', sol: r`$3.14 \times 9 \times 12 + \dfrac13 \times 3.14 \times 9 \times 4 = 339.12 + 37.68 = 376.8$ cm³.`, scheme: [['376.8 cm³', 1]], d: 2, c: 'understanding', t: [2], time: 90 })),
    child('c', mk.short({ marks: 2, stem: '**(i)** Find the total outer surface area of the rocket, including the bottom.', model: r`$l = 5$ cm. Surface $= 2\pi rh + \pi r^2 + \pi rl = 3.14 \times 3 \times (24 + 3 + 5) = 9.42 \times 32 = 301.44$ cm².`, sol: 'Three visible surfaces.', scheme: [['l = 5 and faces', 1], ['301.44 cm²', 1]], d: 3, c: 'application', t: [1], time: 150 }), [
      mk.short({ marks: 2, stem: '**(ii)** If the cone were replaced by a hemisphere of radius 3 cm, by how much would the volume change?', model: r`Cone $= \dfrac13\pi \times 9 \times 4 = 12\pi$; hemisphere $= \dfrac23\pi \times 27 = 18\pi$. The volume increases by $6\pi = 6 \times 3.14 = 18.84$ cm³.`, sol: 'Compare the two tops only.', scheme: [['12π and 18π', 1], ['Increase 18.84 cm³', 1]], d: 3, c: 'analysis', t: [2], time: 120 }),
    ]),
  ],
}, (C) => { C.child('a').key('d'); C.child('b').val(R6(cyl.vol(P3, 3, 12) + cone.vol(P3, 3, 4)), 0.005); C.child('c').model([R6(cyl.csa(P3, 3, 12) + cyl.base(P3, 3) + cone.csa(P3, 3, 4))]); C.child('cii').model([R6(hemi.vol(P3, 3) - cone.vol(P3, 3, 4))]); });

caseQ('c05', {
  passage: r`Channapatna toy makers turn wooden spinning tops: a cone of radius $2.1$ cm and height $2.8$ cm, point downwards, joined to a hemisphere of radius $2.1$ cm on top, as shown. (Use $\pi = \dfrac{22}{7}$.)`,
  assets: [figs.lattu], d: 3, c: 'understanding',
  model: r`(a) Option (b). (b) $50.82$ cm². (c) (i) $32.34$ cm³. Or (ii) $35.574$ cm³.`,
  sol: r`$l = \sqrt{4.41 + 7.84} = 3.5$. Surface $= 6.6 \times (3.5 + 4.2) = 50.82$. $\pi r^2 = 13.86$; $V = \dfrac13 \times 13.86 \times (2.8 + 4.2) = 32.34$. Box: $13.86 \times 4.9 = 67.914$; empty $35.574$.`,
  children: [
    child('a', mk.mcq({ stem: 'The surfaces that are painted are', opts: ['CSA of cone + TSA of hemisphere', 'CSA of cone + CSA of hemisphere', 'TSA of cone + CSA of hemisphere', 'TSA of cone + TSA of hemisphere'], key: 'b', sol: 'The flat faces are glued together; only the two curved surfaces are outside.', d: 1, c: 'understanding', t: [1], time: 45 })),
    child('b', mk.num({ stem: 'Find the area painted on one top, in cm².', value: 50.82, tol: 0.005, unit: 'cm²', sol: r`$l = \sqrt{2.1^2 + 2.8^2} = 3.5$ cm. $\pi rl + 2\pi r^2 = \dfrac{22}{7} \times 2.1 \times (3.5 + 4.2) = 6.6 \times 7.7 = 50.82$ cm².`, scheme: [['50.82 cm²', 1]], d: 2, c: 'understanding', t: [1], time: 90 })),
    child('c', mk.short({ marks: 2, stem: '**(i)** Find the volume of wood in one top.', model: r`$\pi r^2 = 13.86$ cm². $V = \dfrac13 \times 13.86 \times 2.8 + \dfrac23 \times 13.86 \times 2.1 = 12.936 + 19.404 = 32.34$ cm³.`, sol: 'Cone plus hemisphere.', scheme: [['Cone 12.936 and hemisphere 19.404', 1], ['32.34 cm³', 1]], d: 2, c: 'understanding', t: [2], time: 120 }), [
      mk.short({ marks: 2, stem: '**(ii)** Each top is packed upright in the smallest cylindrical box that holds it. Find the empty space in the box.', model: r`Box: radius $2.1$ cm, height $2.8 + 2.1 = 4.9$ cm: $13.86 \times 4.9 = 67.914$ cm³. Empty $= 67.914 - 32.34 = 35.574$ cm³.`, sol: 'Box height = cone height + radius.', scheme: [['Box 67.914 cm³', 1], ['35.574 cm³', 1]], d: 3, c: 'analysis', t: [2], time: 120 }),
    ]),
  ],
}, (C) => { C.child('a').key('b'); C.child('b').val(R6(cone.csa(P7, 2.1, 2.8) + hemi.csa(P7, 2.1)), 0.005); const v = cone.vol(P7, 2.1, 2.8) + hemi.vol(P7, 2.1); C.child('c').model([12.936, 19.404, R6(v)]); C.child('cii').model([R6(cyl.vol(P7, 2.1, 4.9)), R6(cyl.vol(P7, 2.1, 4.9) - v)]); });
// =============================================================== added 2026-10-27 (assessment-designer)
// Recall/understanding written items for the board-paper competency balance (blueprint 54/24/22 Standard,
// 75/15/10 Basic). Appended after every existing item so earlier ids do not move.
Q('u301', mk.short({
  marks: 3,
  stem: r`A solid wooden toy is a cone of base radius $7$ cm and height $10$ cm standing on a hemisphere of the same radius, with the flat faces glued together. Find the volume of wood in the toy. Use $\pi = \dfrac{22}{7}$.`,
  model: r`Volume of the cone $= \dfrac13\pi r^2h = \dfrac13 \times \dfrac{22}{7} \times 7 \times 7 \times 10 = \dfrac{1540}{3} \approx 513.33$ cm³.

Volume of the hemisphere $= \dfrac23\pi r^3 = \dfrac23 \times \dfrac{22}{7} \times 7 \times 7 \times 7 = \dfrac{2156}{3} \approx 718.67$ cm³.

Total volume $= \dfrac{1540 + 2156}{3} = \dfrac{3696}{3} = 1232$ cm³.`,
  sol: r`The volume of a combined solid is the sum of the volumes of its parts.`,
  scheme: [['Cone 1540/3 cm³', 1], ['Hemisphere 2156/3 cm³', 1], ['Total 1232 cm³', 1]],
  d: 2, c: 'understanding', t: [2], time: 210,
}), (C) => { const v1 = cone.vol(P7, 7, 10), v2 = hemi.vol(P7, 7); C.assert(near(v1, 1540 / 3) && near(v2, 2156 / 3) && near(v1 + v2, 1232), 'volumes'); C.model([513.33, 718.67, 1232]); });
Q('u501', mk.long({
  stem: r`A storage tank is a cylinder of radius $2.1$ m and height $3$ m with a hemispherical dome of the same radius on top. Use $\pi = \dfrac{22}{7}$.

(a) Find the volume of the cylindrical part.
(b) Find the volume of the dome.
(c) Find the capacity of the tank in litres.
(d) Find the curved surface area of the cylindrical part and of the dome.`,
  model: r`(a) Cylinder: $\pi r^2h = \dfrac{22}{7} \times 2.1 \times 2.1 \times 3 = 13.86 \times 3 = 41.58$ m³.

(b) Dome: $\dfrac23\pi r^3 = \dfrac23 \times 13.86 \times 2.1 = 19.404$ m³.

(c) Capacity $= 41.58 + 19.404 = 60.984$ m³ $= 60.984 \times 1000 = 60984$ litres.

(d) Curved surface of the cylinder $= 2\pi rh = 2 \times \dfrac{22}{7} \times 2.1 \times 3 = 39.6$ m². Curved surface of the dome $= 2\pi r^2 = 2 \times 13.86 = 27.72$ m².`,
  sol: r`$\pi r^2 = \dfrac{22}{7} \times 4.41 = 13.86$ is used in every part; $1$ m³ $= 1000$ litres.`,
  scheme: [['Cylinder 41.58 m³', 1], ['Dome 19.404 m³', 1], ['60984 litres', 1], ['CSA cylinder 39.6 m²', 1], ['CSA dome 27.72 m²', 1]],
  d: 2, c: 'understanding', t: [1, 2], time: 540,
}), (C) => { const vc = cyl.vol(P7, 2.1, 3), vh = hemi.vol(P7, 2.1); C.assert(near(vc, 41.58) && near(vh, 19.404) && near((vc + vh) * 1000, 60984, 1e-6), 'volumes'); C.assert(near(cyl.csa(P7, 2.1, 3), 39.6) && near(hemi.csa(P7, 2.1), 27.72), 'surfaces'); C.model([41.58, 19.404, 60984, 39.6, 27.72]); });
Q('u502', mk.long({
  stem: r`A solid is made of a cylinder of radius $3.5$ cm and height $10$ cm with a cone of the same radius and height $12$ cm on top. Use $\pi = \dfrac{22}{7}$.

(a) Find the volume of the cylinder.
(b) Find the volume of the cone.
(c) Find the volume of the solid.
(d) Find the slant height of the cone.
(e) Find the curved surface area of the cone.`,
  model: r`$\pi r^2 = \dfrac{22}{7} \times 3.5 \times 3.5 = 38.5$ cm².

(a) Cylinder: $\pi r^2 h = 38.5 \times 10 = 385$ cm³.

(b) Cone: $\dfrac13 \pi r^2 h = \dfrac13 \times 38.5 \times 12 = 154$ cm³.

(c) Solid: $385 + 154 = 539$ cm³.

(d) $l = \sqrt{r^2 + h^2} = \sqrt{12.25 + 144} = \sqrt{156.25} = 12.5$ cm.

(e) $\pi r l = \dfrac{22}{7} \times 3.5 \times 12.5 = 137.5$ cm².`,
  sol: r`Volumes of the parts add; the slant height comes from Pythagoras.`,
  scheme: [['Cylinder 385 cm³', 1], ['Cone 154 cm³', 1], ['Total 539 cm³', 1], ['l = 12.5 cm', 1], ['CSA 137.5 cm²', 1]],
  d: 1, c: 'understanding', t: [1, 2], time: 420,
}), (C) => { const v1 = cyl.vol(P7, 3.5, 10), v2 = cone.vol(P7, 3.5, 12); C.assert(near(v1, 385) && near(v2, 154) && near(v1 + v2, 539) && near(slant(3.5, 12), 12.5) && near(cone.csa(P7, 3.5, 12), 137.5), 'values'); C.model([385, 154, 539, 12.5, 137.5]); });
