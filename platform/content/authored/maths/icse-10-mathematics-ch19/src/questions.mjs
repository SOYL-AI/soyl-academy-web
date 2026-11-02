// ICSE 10 Mathematics ch19 Mensuration: Cylinder, Cone and Sphere — objective items (mcq, assertion-reason, true-false,
// fill-blank, numerical). Short and long items are in questions2.mjs. Every dimension is an exact fraction and every
// figure in a stem, option, solution or model answer is printed from mens.mjs/txt.mjs; each item's re-solve check recomputes
// its key with plain floating-point arithmetic (an independent route) and the distractors come from named wrong methods.
// Shops, schools, firms and places are imagined.
import { Q, mk, r } from './lib.mjs';
import { fr, F, pv, n, cyl, cone, sph, hem, PI, must } from './mens.mjs';
import { L, q } from './txt.mjs';
import { figStack, figHollow } from './figs.mjs';

const PIF = 22 / 7;
const cm2 = (x) => q(x, 'cm$^2$'), cm3 = (x) => q(x, 'cm$^3$'), m2 = (x) => q(x, 'm$^2$'), m3 = (x) => q(x, 'm$^3$');
const rup = (x) => `₹ ${n(x)}`;
const piT = (x) => `$${n(x)}\\pi$ cm$^2$`;

/** MCQ whose options are given as exact values; the first value is the key (rotated later by the builder). */
function QM(key, o, vals, target, fmtv) {
  Q(key, mk.mcq({ ...o, key: 'a', opts: vals.map(fmtv) }), (C) => { C.which(vals.map((v) => v.num()), target); });
}

// =============================================================== MCQ (18)
Q('m01', mk.mcq({ stem: r`The curved surface area of a solid right circular cylinder with base radius $r$ and height $h$ is`, opts: [r`$2\pi r h$`, r`$\pi r^2 h$`, r`$2\pi r(r + h)$`, r`$\pi r h$`], key: 'a', sol: r`Roll the curved surface out flat: it is a rectangle $2\pi r$ long and $h$ wide, so its area is $2\pi r h$. Option (b) is the volume and option (c) is the total surface area, which also includes the two circular ends.`, d: 1, c: 'recall', t: [1], time: 30 }),
  (C) => { const a = fr(3), b = fr(5); C.assert(cyl.csa(a, b).eq(fr(2).mul(a).mul(b)) && !cyl.csa(a, b).eq(cyl.vol(a, b)) && !cyl.csa(a, b).eq(cyl.tsa(a, b)), 'CSA = 2 r h differs from volume and TSA'); C.key('a'); });
{
  const rad = fr(14), ht = fr(30);
  const vals = [pv(cyl.csa(rad, ht)), pv(cyl.tsa(rad, ht)), pv(cyl.csa(rad, ht)).div(2), pv(cyl.vol(rad, ht))];
  QM('m02', { stem: r`A cylindrical steel drum at a dairy in Anand has base radius $14$ cm and height $30$ cm. Taking $\pi = \dfrac{22}{7}$, the area of its curved surface only is`, sol: r`$S = ${L.cylCSA(14, 30)}$ cm$^2$. Option (b) is the total surface area, because it adds the two ends; option (c) is $\pi r h$, which forgets the factor $2$; option (d) is the volume.`, d: 2, c: 'understanding', t: [1] },
    vals, 2 * PIF * 14 * 30, cm2);
}
{
  const rad = fr(3.5), ht = fr(4);
  const vals = [pv(cyl.vol(rad, ht)), pv(rad.mul(ht)), pv(cyl.vol(fr(7), ht)), pv(cyl.csa(rad, ht))];
  QM('m03', { stem: r`A cylindrical water tank at a school in Nashik has inner radius $3.5$ m and height $4$ m. One cubic metre holds $1000$ litres, which is one kilolitre. Taking $\pi = \dfrac{22}{7}$, the tank holds`, sol: r`$V = ${L.cylV(3.5, 4)}$ m$^3$, which is $154$ kilolitres. Option (b) forgets to square the radius, option (c) squares the diameter $7$ instead of the radius, and option (d) is the curved surface area.`, d: 2, c: 'application', t: [1, 4] },
    vals, PIF * 3.5 * 3.5 * 4, (v) => `$${n(v)}$ kilolitres`);
}
Q('m04', mk.mcq({ stem: r`The radius of a cylindrical candle mould is doubled and its height is halved. Its volume becomes`, opts: ['twice the original volume', 'the same as the original volume', 'half of the original volume', 'four times the original volume'], key: 'a', sol: r`$V = \pi r^2 h$. With $2r$ and $\dfrac{h}{2}$ we get $\pi (2r)^2 \dfrac{h}{2} = 2\pi r^2 h = 2V$. The square on the radius multiplies by $4$ and the halved height multiplies by $\dfrac{1}{2}$, so the volume is multiplied by $2$.`, d: 3, c: 'analysis', t: [1], time: 60 }),
  (C) => { const k = fr(2).pow(2).mul(F(1, 2)); C.assert(k.eq(2), 'factor 4 x 1/2 = 2'); C.key('a'); });
{
  const R = fr(8), rr = fr(6), len = fr(14);
  const vals = [pv(cyl.hvol(R, rr, len)), pv(len.mul(R.sub(rr)).mul(R.sub(rr))), pv(cyl.vol(R, len)), pv(len.mul(R.add(rr)).mul(R.add(rr)))];
  QM('m05', { stem: r`A hollow iron pipe is $14$ cm long. Its outer radius is $8$ cm and its inner radius is $6$ cm. Taking $\pi = \dfrac{22}{7}$, the volume of iron in the pipe is`, sol: r`Iron $=$ outer cylinder $-$ bore: $V = ${L.hollowV(8, 6, 14)}$ cm$^3$. Option (b) squares the thickness $8 - 6$ instead of subtracting the squares; option (c) is the volume of the solid outer cylinder; option (d) squares the sum of the radii.`, d: 3, c: 'application', t: [1] },
    vals, PIF * 14 * (64 - 36), cm3);
}
Q('m06', mk.mcq({ stem: r`A right circular cone has base radius $r$ and vertical height $h$. Its slant height $l$ is given by`, opts: [r`$l = \sqrt{r^2 + h^2}$`, r`$l = r + h$`, r`$l = \sqrt{h^2 - r^2}$`, r`$l = \sqrt{r + h}$`], key: 'a', sol: r`The height, the radius and the slant height form a right-angled triangle with the slant height as hypotenuse, so $l^2 = r^2 + h^2$ by Pythagoras. A hypotenuse is shorter than the sum of the other two sides, which rules out option (b).`, d: 1, c: 'recall', t: [2], time: 30 }),
  (C) => { const l = cone.l(fr(5), fr(12)); C.assert(l.eq(13) && l.lt(fr(5).add(12)), 'l = 13 < r + h'); C.key('a'); });
{
  const vals = [fr(65), fr(60), fr(85), fr(90)];
  QM('m07', { stem: r`A conical party hat made in Indore has base radius $5$ cm and vertical height $12$ cm. Its curved surface area, in terms of $\pi$, is`, sol: r`$l = \sqrt{5^2 + 12^2} = \sqrt{169} = 13$, so $S = \pi r l = \pi \times 5 \times 13 = 65\pi$ cm$^2$. Option (b) uses the height $12$ in place of the slant height, option (c) takes $l = r + h = 17$, and option (d) is the total surface area $\pi r (r + l)$.`, d: 2, c: 'understanding', t: [2] },
    vals, 65, piT);
}
{
  const vals = [pv(cone.vol(fr(6), fr(14))), pv(cone.vol(fr(6), fr(14))).mul(3), pv(cone.vol(fr(6), fr(14))).mul(F(3, 2)), pv(cone.vol(fr(6), fr(14))).mul(2)];
  QM('m08', { stem: r`A conical funnel used in a spice shop in Kochi has base radius $6$ cm and height $14$ cm. Taking $\pi = \dfrac{22}{7}$, the volume it can hold is`, sol: r`$V = ${L.coneV(6, 14)}$ cm$^3$. Option (b) leaves out the factor $\dfrac{1}{3}$, which gives the cylinder with the same base and height; options (c) and (d) use $\dfrac{1}{2}$ and $\dfrac{2}{3}$ in place of $\dfrac{1}{3}$.`, d: 2, c: 'understanding', t: [2] },
    vals, (1 / 3) * PIF * 36 * 14, cm3);
}
{
  const rad = fr(3.5), ht = fr(12), l = cone.l(rad, ht);
  const vals = [pv(cone.csa(rad, l)), pv(cone.csa(rad, ht)), pv(cone.csa(fr(7), l)), pv(cone.tsa(rad, l))];
  QM('m09', { stem: r`A conical tent for a camp near Mussoorie has a base of diameter $7$ m and a vertical height of $12$ m. Taking $\pi = \dfrac{22}{7}$, the canvas needed for its sloping surface is`, sol: r`$r = 3.5$ and $${L.slantS(3.5, 12)}$ m. Then $S = ${L.coneCSA(3.5, 12.5)}$ m$^2$. Option (b) uses the height $12$ as the slant height, option (c) takes the diameter $7$ as the radius, and option (d) adds the floor, which a tent roof does not need.`, d: 3, c: 'application', t: [2, 4] },
    vals, PIF * 3.5 * 12.5, m2);
}
Q('m10', mk.mcq({ stem: r`A solid hemisphere of radius $r$ has a curved surface and one flat circular face. Its total surface area is`, opts: [r`$3\pi r^2$`, r`$2\pi r^2$`, r`$4\pi r^2$`, r`$\pi r^2$`], key: 'a', sol: r`The curved surface is half of a sphere, $\dfrac{1}{2} \times 4\pi r^2 = 2\pi r^2$, and the flat face adds $\pi r^2$, so the total is $3\pi r^2$. Option (b) forgets the flat face.`, d: 1, c: 'recall', t: [3], time: 30 }),
  (C) => { const a = fr(7); C.assert(hem.tsa(a).eq(hem.csa(a).add(a.mul(a))) && hem.csa(a).eq(sph.sa(a).div(2)), 'TSA = CSA + base = 3 r^2'); C.key('a'); });
{
  const vals = [pv(sph.sa(fr(10.5))), pv(sph.sa(fr(21))), pv(hem.csa(fr(10.5))), pv(fr(10.5).mul(10.5))];
  QM('m11', { stem: r`The football used by a school team in Raipur has a diameter of $21$ cm. Treating it as a sphere and taking $\pi = \dfrac{22}{7}$, the area of its surface is`, sol: r`$r = \dfrac{21}{2} = 10.5$, so $S = ${L.sphS(10.5)}$ cm$^2$. Option (b) puts the diameter $21$ in the formula as a radius, option (c) is the curved surface of a hemisphere, and option (d) is only the area of a great circle.`, d: 2, c: 'understanding', t: [3] },
    vals, 4 * PIF * 10.5 * 10.5, cm2);
}
{
  const vals = [fr(21), fr(441), fr(42), fr(882)];
  QM('m12', { stem: r`The surface area of a solid brass sphere is $5544$ cm$^2$. Taking $\pi = \dfrac{22}{7}$, its radius is`, sol: r`$4 \times \dfrac{22}{7} \times r^2 = 5544$ gives $r^2 = 5544 \times \dfrac{7}{88} = 441$, so $r = 21$ cm. Option (b) stops at $r^2$, option (c) comes from using the area $\pi r^2$ of a great circle, and option (d) from using $2\pi r^2$ and forgetting the root.`, d: 3, c: 'application', t: [3] },
    vals, Math.sqrt(5544 / (4 * PIF)), (v) => `$${n(v)}$ cm`);
}
Q('m13', mk.mcq({ stem: r`Two solid iron spheres have radii in the ratio $2 : 3$. The ratio of their volumes is`, opts: [r`$8 : 27$`, r`$2 : 3$`, r`$4 : 9$`, r`$16 : 81$`], key: 'a', sol: r`The volume of a sphere is proportional to the cube of its radius, so the ratio is $2^3 : 3^3 = 8 : 27$. Option (c) is the ratio of the surface areas, which depend on the square of the radius.`, d: 3, c: 'understanding', t: [3], time: 45 }),
  (C) => { const k = F(2, 3); C.assert(sph.vol(fr(2)).div(sph.vol(fr(3))).eq(k.pow(3)) && k.pow(3).eq(F(8, 27)) && sph.sa(fr(2)).div(sph.sa(fr(3))).eq(F(4, 9)), 'volumes 8:27, areas 4:9'); C.key('a'); });
{
  const rad = fr(0.42), ht = fr(3), rate = fr(25);
  const vals = [pv(cyl.csa(rad, ht)).mul(rate), pv(cyl.csa(fr(0.84), ht)).mul(rate), pv(cyl.tsa(rad, ht)).mul(rate), pv(cyl.vol(rad, ht)).mul(rate)];
  QM('m14', { stem: r`A round pillar outside a temple hall has a diameter of $84$ cm and a height of $3$ m. Its curved surface is to be painted at ₹ $25$ per m$^2$. Taking $\pi = \dfrac{22}{7}$, the cost of painting is`, sol: r`In metres $r = 0.42$ and $h = 3$. Area $= ${L.cylCSA(0.42, 3)}$ m$^2$, and the cost is $7.92 \times 25 = 198$, which is ₹ 198. Option (b) uses the diameter as the radius, option (c) paints the two ends as well, and option (d) multiplies the volume by the rate.`, d: 2, c: 'application', t: [1, 4] },
    vals, 2 * PIF * 0.42 * 3 * 25, rup);
}
{
  const vals = [fr(27), fr(9), fr(3), fr(81)];
  QM('m15', { stem: r`A solid steel ball of radius $3$ cm is melted and recast into identical small balls of radius $1$ cm. The number of small balls obtained is`, sol: r`Volume does not change: $\dfrac{4}{3}\pi \times 3^3 = n \times \dfrac{4}{3}\pi \times 1^3$, so $n = 27$. Option (b) divides the radii squared (areas), and option (c) divides the radii only.`, d: 2, c: 'understanding', t: [5] },
    vals, (4 / 3 * 27) / (4 / 3), (v) => `$${n(v)}$`);
}
{
  const vals = [fr(27), fr(9), fr(18), fr(3)];
  QM('m16', { stem: r`A solid metal cylinder of base radius $6$ cm and height $9$ cm is melted and recast into a solid cone with the same base radius. The height of the cone is`, sol: r`Equal volumes: $\pi \times 6^2 \times 9 = \dfrac{1}{3}\pi \times 6^2 \times h$, so $h = 3 \times 9 = 27$ cm. Option (b) forgets the $\dfrac{1}{3}$ of the cone, which would give the cylinder's own height.`, d: 3, c: 'application', t: [5] },
    vals, 3 * 9, (v) => `$${n(v)}$ cm`);
}
{
  const rad = fr(3.5), l = cone.l(rad, fr(12));
  const vals = [pv(rad.mul(rad).add(cyl.csa(rad, fr(10))).add(cone.csa(rad, l))), pv(rad.mul(rad).mul(2).add(cyl.csa(rad, fr(10))).add(cone.csa(rad, l))), pv(rad.mul(rad).add(cyl.csa(rad, fr(10))).add(cone.csa(rad, fr(12)))), pv(cyl.csa(rad, fr(10)).add(cone.csa(rad, l)))];
  must(vals[0].eq(396) && vals[1].eq(434.5) && vals[2].eq(390.5) && vals[3].eq(357.5), 'm17 values');
  QM('m17', { stem: r`A solid pencil-sharpener model is a cylinder of radius $3.5$ cm and height $10$ cm with a cone of the same radius and vertical height $12$ cm fixed on its upper end. Taking $\pi = \dfrac{22}{7}$, the area of its outside surface (the lower end is flat and exposed) is`, sol: r`The cone has $l = 12.5$ cm. Outside area $=$ lower end $+$ curved cylinder $+$ curved cone $= \pi \times 3.5^2 + 2\pi \times 3.5 \times 10 + \pi \times 3.5 \times 12.5 = 126\pi = 396$ cm$^2$. Option (b) counts the upper circular face of the cylinder, which is covered by the cone; option (c) uses $12$ instead of the slant height; option (d) leaves out the flat lower end.`, d: 3, c: 'application', t: [6] },
    vals, PIF * (12.25 + 70 + 43.75), cm2);
}
Q('m18', mk.mcq({ stem: r`The radius of a spherical balloon is increased by $10\%$. The percentage increase in its surface area is`, opts: ['$21\\%$', '$10\\%$', '$20\\%$', '$33.1\\%$'], key: 'a', sol: r`Area $= 4\pi r^2$ grows with the square of the radius, so the new area is $1.1^2 = 1.21$ times the old one, an increase of $21\%$. Option (d) is the increase in volume, which grows with the cube: $1.1^3 = 1.331$.`, d: 4, c: 'analysis', t: [3], time: 75 }),
  (C) => { const k = fr(1.1); C.assert(k.pow(2).sub(1).eq(0.21) && k.pow(3).sub(1).eq(0.331), 'surface +21%, volume +33.1%'); C.key('a'); });

// =============================================================== ASSERTION-REASON (6)
Q('ar1', mk.ar({ a: r`When the height of a cylindrical steel can is doubled and its base radius is kept the same, the volume of the can is doubled.`, r: r`For a fixed base radius, the volume $\pi r^2 h$ of a cylinder is directly proportional to its height $h$.`, key: 'a', sol: r`Both statements are true, and the reason explains the assertion: $\pi r^2 (2h) = 2 \times \pi r^2 h$, so doubling $h$ doubles $V$.`, d: 2, c: 'understanding', t: [1] }),
  (C) => { C.assert(cyl.vol(fr(5), fr(8)).eq(cyl.vol(fr(5), fr(4)).mul(2)), 'doubling h doubles V'); C.key('a'); });
Q('ar2', mk.ar({ a: r`A cone of base radius $6$ cm and vertical height $8$ cm has a slant height of $10$ cm.`, r: r`The slant height of a cone is the sum of its base radius and its vertical height.`, key: 'c', sol: r`The assertion is true: $\sqrt{6^2 + 8^2} = \sqrt{100} = 10$. The reason is false: the slant height is $\sqrt{r^2 + h^2}$, which is shorter than $r + h = 14$.`, d: 2, c: 'understanding', t: [2] }),
  (C) => { C.assert(cone.l(fr(6), fr(8)).eq(10) && !cone.l(fr(6), fr(8)).eq(14), 'l = 10, not 14'); C.key('c'); });
Q('ar3', mk.ar({ a: r`The total surface area of a solid hemisphere of radius $r$ is $2\pi r^2$.`, r: r`A solid hemisphere has one curved surface and one flat circular face.`, key: 'd', sol: r`The reason is true, but it shows the assertion is false: the curved surface gives $2\pi r^2$ and the flat face adds $\pi r^2$, so the total is $3\pi r^2$.`, d: 2, c: 'understanding', t: [3] }),
  (C) => { const a = fr(5); C.assert(hem.tsa(a).eq(3 * 25) && !hem.tsa(a).eq(2 * 25), 'TSA 3 r^2, not 2 r^2'); C.key('d'); });
Q('ar4', mk.ar({ a: r`A solid sphere of radius $3$ cm has a volume of $36\pi$ cm$^3$.`, r: r`The surface area of a sphere of radius $r$ is $4\pi r^2$.`, key: 'b', sol: r`The assertion is true: $\dfrac{4}{3}\pi \times 3^3 = 36\pi$. The reason is also a true statement, but it is about area and does not give the volume, so it does not explain the assertion.`, d: 3, c: 'analysis', t: [3] }),
  (C) => { C.assert(sph.vol(fr(3)).eq(36) && sph.sa(fr(3)).eq(36), 'volume 36 pi (and area 36 pi coincide here)'); C.key('b'); });
Q('ar5', mk.ar({ a: r`A cylindrical tank of radius $0.5$ m and height $1.4$ m holds $1100$ litres of water (use $\pi = \dfrac{22}{7}$).`, r: r`One cubic metre is equal to $100$ litres.`, key: 'c', sol: r`The assertion is true: $V = \dfrac{22}{7} \times 0.5^2 \times 1.4 = 1.1$ m$^3$, which is $1100$ litres because $1$ m$^3 = 1000$ litres. The reason is false, since $1$ m$^3 = 1000$ litres.`, d: 3, c: 'application', t: [1, 4] }),
  (C) => { const v = pv(cyl.vol(fr(0.5), fr(1.4))); C.assert(v.eq(1.1) && v.mul(1000).eq(1100), '1.1 m3 = 1100 litres'); C.key('c'); });
Q('ar6', mk.ar({ a: r`A hemisphere of radius $r$ is fixed on one flat end of a cylinder of radius $r$. The surface area of the solid is less than the sum of the surface areas of the cylinder and the hemisphere taken separately.`, r: r`The circular faces where the two solids are joined are no longer on the outside of the solid.`, key: 'a', sol: r`Both are true and the reason explains the assertion: the joined faces, one of area $\pi r^2$ on the cylinder and one of area $\pi r^2$ on the hemisphere, are hidden, so the outside area drops by $2\pi r^2$.`, d: 3, c: 'analysis', t: [6] }),
  (C) => { const a = fr(7), h = fr(10); const sep = cyl.tsa(a, h).add(hem.tsa(a)), joined = cyl.csa(a, h).add(a.mul(a)).add(hem.csa(a)); C.assert(sep.sub(joined).eq(a.mul(a).mul(2)), 'joined solid loses 2 pi r^2'); C.key('a'); });

// =============================================================== TRUE-FALSE (5)
Q('tf1', mk.tf({ stem: r`If both the radius and the height of a cylindrical oil can are doubled, the area of its curved surface becomes four times as large.`, key: 't', sol: r`The curved area $2\pi r h$ becomes $2\pi (2r)(2h) = 4 \times 2\pi r h$, so it is four times as large.`, d: 2, c: 'understanding', t: [1] }),
  (C) => { C.assert(cyl.csa(fr(6), fr(14)).mul(4).eq(cyl.csa(fr(12), fr(28))), 'x4'); C.key('t'); });
Q('tf2', mk.tf({ stem: r`A student measures a solid wooden cone and finds a base radius of $9$ cm and a vertical height of $12$ cm. She then claims that the sloping edge from the apex to the rim of the base is $21$ cm long.`, key: 'f', sol: r`False: $l = \sqrt{9^2 + 12^2} = \sqrt{225} = 15$ cm. The value $21$ is $r + h$, but the sloping edge is the hypotenuse of a right-angled triangle, so it is shorter than the sum of the two other sides.`, d: 2, c: 'understanding', t: [2] }),
  (C) => { C.assert(cone.l(fr(9), fr(12)).eq(15) && !cone.l(fr(9), fr(12)).eq(21), 'l = 15, not 21'); C.key('f'); });
Q('tf3', mk.tf({ stem: r`The surface area of a sphere is exactly four times the area of the great circle that cuts it in half.`, key: 't', sol: r`True: the great circle has area $\pi r^2$ and the sphere has surface area $4\pi r^2$, which is four times as large.`, d: 1, c: 'recall', t: [3] }),
  (C) => { C.assert(sph.sa(fr(9)).eq(fr(9).mul(9).mul(4)), 'S = 4 x (pi r^2)'); C.key('t'); });
Q('tf4', mk.tf({ stem: r`When a solid is melted and recast into another solid, the total surface area stays the same as before.`, key: 'f', sol: r`False: it is the volume that stays the same. For example, one sphere of radius $3$ cm recast into $27$ spheres of radius $1$ cm has the same volume, but its surface area $36\pi$ cm$^2$ becomes $27 \times 4\pi = 108\pi$ cm$^2$.`, d: 2, c: 'analysis', t: [5] }),
  (C) => { C.assert(sph.vol(fr(3)).eq(sph.vol(fr(1)).mul(27)) && sph.sa(fr(1)).mul(27).eq(108) && sph.sa(fr(3)).eq(36), 'same volume, areas 36 and 108'); C.key('f'); });
Q('tf5', mk.tf({ stem: r`A solid sphere is melted and recast into $8$ equal small spheres. The radius of each small sphere is one-eighth of the radius of the original sphere.`, key: 'f', sol: r`False: $8 \times \dfrac{4}{3}\pi r_1^3 = \dfrac{4}{3}\pi r^3$ gives $r_1^3 = \dfrac{r^3}{8}$, so $r_1 = \dfrac{r}{2}$, half of the original radius.`, d: 3, c: 'analysis', t: [5] }),
  (C) => { C.assert(sph.vol(fr(4)).mul(8).eq(sph.vol(fr(8))) && fr(4).mul(2).eq(8), 'radius halves'); C.key('f'); });

// =============================================================== FILL IN THE BLANK (5)
Q('fb1', mk.fill({ stem: r`A solid cylindrical wax candle has radius $3.5$ cm and height $8$ cm. Taking $\pi = \dfrac{22}{7}$, its volume is ___ cm$^3$.`, acc: [['308']], sol: r`$V = ${L.cylV(3.5, 8)}$ cm$^3$.`, d: 1, c: 'understanding', t: [1], time: 45 }),
  (C) => { C.assert(pv(cyl.vol(fr(3.5), fr(8))).eq(308), 'V = 308'); C.blank(PIF * 3.5 * 3.5 * 8); });
Q('fb2', mk.fill({ stem: r`A conical lampshade has base radius $12$ cm and vertical height $16$ cm, so its slant height is ___ cm.`, acc: [['20']], sol: r`$${L.slantS(12, 16)}$ cm.`, d: 1, c: 'understanding', t: [2], time: 45 }),
  (C) => C.blank(Math.hypot(12, 16)));
Q('fb3', mk.fill({ stem: r`A solid brass paperweight is a hemisphere of radius $14$ cm resting on its flat face. Counting that flat face too, the area of its entire outside is ___ cm$^2$ (take $\pi = \dfrac{22}{7}$).`, acc: [['1848']], sol: r`$S = ${L.hemTSA(14)}$ cm$^2$, which is the curved part $1232$ plus the flat face $616$.`, d: 2, c: 'understanding', t: [3], time: 45 }),
  (C) => { C.assert(pv(hem.csa(fr(14))).eq(1232) && pv(fr(14).mul(14)).eq(616), 'parts 1232 + 616'); C.blank(3 * PIF * 14 * 14); });
Q('fb4', mk.fill({ stem: r`A rainwater tank in a housing society holds $6.6$ cubic metres of water. Since one cubic metre is $1000$ litres, the tank holds ___ litres.`, acc: [['6600']], sol: r`$6.6 \times 1000 = 6600$ litres.`, d: 1, c: 'understanding', t: [4], time: 45 }),
  (C) => C.blank(6.6 * 1000));
Q('fb5', mk.fill({ stem: r`A solid lead sphere of radius $9$ cm is melted and recast into $27$ identical small spheres. The radius of each small sphere is ___ cm.`, acc: [['3']], sol: r`$27 \times r^3 = 9^3 = 729$ gives $r^3 = 27$, so $r = 3$ cm.`, d: 2, c: 'understanding', t: [5], time: 60 }),
  (C) => C.blank(Math.cbrt(9 ** 3 / 27)));

// =============================================================== NUMERICAL (8)
{
  const per = pv(cyl.csa(fr(0.35), fr(1.2)));
  Q('n01', mk.num({ marks: 2, stem: r`A garden roller at a park in Mysuru has a diameter of $70$ cm and a length of $1.2$ m. How many square metres of lawn does it level in $150$ complete revolutions? Take $\pi = \dfrac{22}{7}$.`, value: 396, sol: r`In one revolution the roller covers its curved surface: $r = 0.35$ m, so $S = ${L.cylCSA(0.35, 1.2)}$ m$^2$. For $150$ revolutions: $2.64 \times 150 = 396$.`, scheme: [['Curved surface for one revolution, 2.64 m²', 1], ['Multiply by 150: 396', 1]], d: 2, c: 'application', t: [1, 4], time: 120 }),
    (C) => { C.assert(per.eq(2.64), 'one revolution 2.64'); C.val(2 * PIF * 0.35 * 1.2 * 150, 1e-6); });
}
Q('n02', mk.num({ stem: r`A cylindrical jar for pickles has base radius $21$ cm and holds $8316$ cm$^3$. Find its height in cm. Take $\pi = \dfrac{22}{7}$.`, value: 6, sol: r`$\dfrac{22}{7} \times 21^2 \times h = 8316$ gives $1386 \times h = 8316$, so $h = \dfrac{8316}{1386} = 6$.`, scheme: [['6', 1]], d: 2, c: 'application', t: [1], time: 75 }),
  (C) => { C.assert(pv(cyl.vol(fr(21), fr(6))).eq(8316) && pv(fr(21).mul(21)).eq(1386), 'V = 1386 h'); C.val(8316 / (PIF * 441)); });
Q('n03', mk.num({ marks: 2, stem: r`A conical measuring cup in a bakery in Pune has base radius $10.5$ cm and vertical height $36$ cm. Find its capacity in cm$^3$. Take $\pi = \dfrac{22}{7}$.`, value: 4158, sol: r`$V = ${L.coneV(10.5, 36)}$ cm$^3$.`, scheme: [['Formula with substitution', 1], ['4158', 1]], d: 2, c: 'understanding', t: [2], time: 90 }),
  (C) => C.val((1 / 3) * PIF * 10.5 * 10.5 * 36, 1e-6));
Q('n04', mk.num({ marks: 2, stem: r`A solid wooden cone has base radius $21$ cm and vertical height $28$ cm. Find the area of its whole surface in cm$^2$. Take $\pi = \dfrac{22}{7}$.`, value: 3696, sol: r`$${L.slantS(21, 28)}$ cm. Then $S = ${L.coneTSA(21, 35)}$ cm$^2$.`, scheme: [['Slant height 35 cm', 1], ['Total surface area 3696', 1]], d: 3, c: 'understanding', t: [2], time: 120 }),
  (C) => C.val(PIF * 21 * (21 + Math.hypot(21, 28)), 1e-6));
Q('n05', mk.num({ marks: 2, stem: r`The volume of a solid copper sphere is $4851$ cm$^3$. Find its radius in cm. Take $\pi = \dfrac{22}{7}$.`, value: 10.5, sol: r`$\dfrac{4}{3} \times \dfrac{22}{7} \times r^3 = 4851$ gives $r^3 = 4851 \times \dfrac{21}{88} = 1157.625 = 10.5^3$, so $r = 10.5$.`, scheme: [['r³ = 1157.625', 1], ['r = 10.5', 1]], d: 3, c: 'application', t: [3], time: 120 }),
  (C) => { C.assert(pv(sph.vol(fr(10.5))).eq(4851), 'V(10.5) = 4851'); C.val(Math.cbrt((4851 * 21) / 88)); });
{
  const m3v = pv(cyl.vol(fr(2.1), fr(5)));
  Q('n06', mk.num({ marks: 3, stem: r`A cylindrical water tank at a farm near Karnal has an inside diameter of $4.2$ m and a depth of $5$ m. It is filled with water that costs ₹ $0.20$ per litre. Find the cost, in rupees, of filling the tank completely. Take $\pi = \dfrac{22}{7}$ and $1$ m$^3 = 1000$ litres.`, value: 13860, sol: r`$r = 2.1$ m, so $V = ${L.cylV(2.1, 5)}$ m$^3$, which is $69.3 \times 1000 = 69300$ litres. Cost $= 69300 \times 0.2 = 13860$.`, scheme: [['Volume 69.3 m³', 1], ['69300 litres', 1], ['Cost 13860 rupees', 1]], d: 3, c: 'application', t: [1, 4], time: 150 }),
    (C) => { C.assert(m3v.eq(69.3), 'V = 69.3 m3'); C.val(PIF * 2.1 * 2.1 * 5 * 1000 * 0.2, 1e-6); });
}
Q('n07', mk.num({ marks: 3, stem: r`A solid metal sphere of radius $6$ cm is drawn into a uniform wire of diameter $4$ mm. Find the length of the wire in metres.`, value: 72, sol: r`The wire is a cylinder of radius $0.2$ cm. Equal volumes: $\dfrac{4}{3}\pi \times 6^3 = \pi \times 0.2^2 \times l$, so $288 = 0.04 \times l$ and $l = \dfrac{288}{0.04} = 7200$ cm. In metres: $\dfrac{7200}{100} = 72$.`, scheme: [['Volume of the sphere 288π', 1], ['Length 7200 cm', 1], ['72 m', 1]], d: 3, c: 'application', t: [5], time: 150 }),
  (C) => { C.assert(sph.vol(fr(6)).eq(288) && fr(0.2).mul(0.2).eq(0.04) && fr(288).div(0.04).eq(7200), 'sphere 288 pi, wire area 0.04 pi, l = 7200'); C.val((4 / 3) * 216 / (0.2 * 0.2) / 100, 1e-6); });
Q('n08', mk.num({ marks: 3, stem: r`A cylindrical jar for sweets has base radius $4.2$ cm and height $6.2$ cm. A hemispherical dome of the same radius covers its top, and the space inside the dome belongs to the jar. Find the total capacity in cm$^3$. Take $\pi = \dfrac{22}{7}$.`, value: 498.96, sol: r`Cylinder: $${L.cylV(4.2, 6.2)}$ cm$^3$. Dome: $${L.hemV(4.2)}$ cm$^3$. Total: $343.728 + 155.232 = 498.96$.`, scheme: [['Cylinder 343.728', 1], ['Hemisphere 155.232', 1], ['Total 498.96', 1]], d: 3, c: 'application', t: [6], time: 150 }),
  (C) => { C.assert(pv(cyl.vol(fr(4.2), fr(6.2))).eq(343.728) && pv(hem.vol(fr(4.2))).eq(155.232), 'parts'); C.val(PIF * 4.2 * 4.2 * 6.2 + (2 / 3) * PIF * 4.2 ** 3, 1e-6); });
// @@END
