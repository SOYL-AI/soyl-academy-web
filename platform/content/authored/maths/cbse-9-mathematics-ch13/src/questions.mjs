// CBSE 9 Mathematics ch13 Surface Area and Volume: objective items. Every answer is recomputed from the givens with the formulas of h.mjs
// (cuboid, cube, cylinder, cone, pyramid, sphere, hemisphere with the stated pi); the options are typed independently of the computation.
import { Q, mk } from './lib.mjs';
import { r, must, close, rd, cuboidTSA, cuboidLSA, cuboidV, cubeTSA, cubeLSA, cubeV, cylCSA, cylTSA, cylV, slant, coneCSA, coneV, sqSlant, sqPyrLSA, sqPyrTSA, pyrV, sphereSA, sphereV, hemiCSA, hemiTSA, hemiV, PI7, PI314 } from './h.mjs';

const T = (k, o, chk) => Q(k, mk.mcq({ stem: o.stem, opts: o.opts, key: 'a', sol: o.sol, d: o.d, c: o.c, t: o.t, time: o.time ?? 75 }), chk);

// =============================================================== MCQ (m01-m06 are the check-slide items)
T('m01', { stem: r`A cubical box of sweets in a shop in Jaipur has an edge of $15$ cm. Its total surface area is`, opts: [r`$1350$ cm$^2$`, r`$900$ cm$^2$`, r`$3375$ cm$^2$`, r`$225$ cm$^2$`], sol: r`A cube has $6$ equal faces, each of area $15^2 = 225$ cm$^2$. Total surface area $= 6 \times 225 = 1350$ cm$^2$. The value $900$ is the lateral surface $4a^2$, and $3375$ is the volume $a^3$.`, d: 1, c: 'application', t: [1], time: 60 }, (Cx) => {
  Cx.assert(cubeLSA(15) === 900 && cubeV(15) === 3375, 'lateral 900 and volume 3375');
  Cx.which([cubeTSA(15), cubeLSA(15), cubeV(15), 15 * 15], 1350);
});
T('m02', { stem: r`A garden roller in a park in Lucknow is a cylinder of radius $21$ cm and length $100$ cm. The area of the ground it levels in $10$ complete turns, using $\pi = \dfrac{22}{7}$, is`, opts: [r`$13.2$ m$^2$`, r`$1.32$ m$^2$`, r`$132$ m$^2$`, r`$26.4$ m$^2$`], sol: r`In one turn the roller covers its curved surface: $2 \times \dfrac{22}{7} \times 21 \times 100 = 13200$ cm$^2$. In $10$ turns it covers $132000$ cm$^2$, and $1$ m$^2 = 10000$ cm$^2$, so the area is $13.2$ m$^2$. The value $1.32$ comes from dividing by $100000$.`, d: 2, c: 'application', t: [2], time: 90 }, (Cx) => {
  Cx.assert(close(cylCSA(21, 100, PI7), 13200), 'one turn 13200 square centimetres');
  Cx.which([(cylCSA(21, 100, PI7) * 10) / 10000, (cylCSA(21, 100, PI7) * 10) / 100000, 132, 26.4], 13.2);
});
T('m03', { stem: r`A heap of wheat in a mandi near Karnal is a cone of base radius $3.5$ m and height $6$ m. Using $\pi = \dfrac{22}{7}$, the volume of wheat is`, opts: [r`$77$ m$^3$`, r`$231$ m$^3$`, r`$38.5$ m$^3$`, r`$154$ m$^3$`], sol: r`Volume $= \dfrac{1}{3}\pi r^2 h = \dfrac{1}{3} \times \dfrac{22}{7} \times 3.5^2 \times 6 = \dfrac{1}{3} \times 231 = 77$ m$^3$. The value $231$ forgets the factor $\dfrac{1}{3}$ (it is the cylinder).`, d: 2, c: 'application', t: [2], time: 90 }, (Cx) => {
  Cx.assert(close(cylV(3.5, 6, PI7), 231), 'the cylinder has 231');
  Cx.which([coneV(3.5, 6, PI7), cylV(3.5, 6, PI7), 38.5, 154], 77);
});
T('m04', { stem: r`A square pyramid has a base of side $16$ cm and a height of $15$ cm. The slant height of each triangular face is`, opts: [r`$17$ cm`, r`$23$ cm`, r`$7$ cm`, r`$31$ cm`], sol: r`The slant height $l$, the height $15$ and the half side $8$ form a right-angled triangle, so $l = \sqrt{15^2 + 8^2} = \sqrt{289} = 17$ cm. The value $23 = 15 + 8$ adds the sides instead of using Pythagoras.`, d: 2, c: 'application', t: [3], time: 75 }, (Cx) => {
  Cx.assert(225 + 64 === 289, '15 squared plus 8 squared');
  Cx.which([sqSlant(16, 15), 15 + 8, 15 - 8, 15 + 16], 17);
});
T('m05', { stem: r`A spherical balloon at a kite festival has a radius of $1.75$ m. The area of rubber that covers it, using $\pi = \dfrac{22}{7}$, is`, opts: [r`$38.5$ m$^2$`, r`$9.625$ m$^2$`, r`$19.25$ m$^2$`, r`$77$ m$^2$`], sol: r`Surface area $= 4\pi r^2 = 4 \times \dfrac{22}{7} \times 1.75^2 = 4 \times 9.625 = 38.5$ m$^2$. The value $9.625$ is $\pi r^2$ and $19.25$ is $2\pi r^2$.`, d: 2, c: 'application', t: [4], time: 75 }, (Cx) => {
  Cx.assert(close(PI7 * 1.75 ** 2, 9.625) && close(hemiCSA(1.75, PI7), 19.25), 'pi r squared 9.625 and 2 pi r squared 19.25');
  Cx.which([sphereSA(1.75, PI7), PI7 * 1.75 ** 2, hemiCSA(1.75, PI7), 77], 38.5);
});
T('m06', { stem: r`A solid hemisphere has a radius of $14$ cm. Its total surface area, using $\pi = \dfrac{22}{7}$, is`, opts: [r`$1848$ cm$^2$`, r`$1232$ cm$^2$`, r`$616$ cm$^2$`, r`$2464$ cm$^2$`], sol: r`The total surface area is the curved surface $2\pi r^2 = 1232$ cm$^2$ plus the flat face $\pi r^2 = 616$ cm$^2$, that is $3\pi r^2 = 1848$ cm$^2$. The value $1232$ leaves out the flat face and $2464$ is the whole sphere.`, d: 2, c: 'application', t: [4], time: 75 }, (Cx) => {
  Cx.assert(close(hemiCSA(14, PI7), 1232) && close(PI7 * 196, 616) && close(sphereSA(14, PI7), 2464), '1232, 616, 2464');
  Cx.which([hemiTSA(14, PI7), hemiCSA(14, PI7), PI7 * 196, sphereSA(14, PI7)], 1848);
});

// =============================================================== MCQ for the tests
T('m07', { stem: 'The number of edges of a cuboid is', opts: ['$12$', '$8$', '$6$', '$16$'], sol: r`A cuboid has $4$ edges at the top, $4$ at the bottom and $4$ standing up, so $12$ in all. The number $8$ counts its corners and $6$ counts its faces.`, d: 1, c: 'recall', t: [1], time: 45 }, (Cx) => {
  const V = Array.from({ length: 8 }, (_, i) => [i & 1, (i >> 1) & 1, (i >> 2) & 1]);
  let edges = 0;
  for (let i = 0; i < 8; i++) for (let j = i + 1; j < 8; j++) if (V[i].reduce((s, x, k) => s + Math.abs(x - V[j][k]), 0) === 1) edges++;
  Cx.which([edges, V.length, 6, 16], 12);
});
T('m08', { stem: 'The lateral surface area of a cuboid is the area of', opts: ['its four side walls', 'all its six faces', 'its top and its bottom', 'its base only'], sol: r`The lateral surface is the side surface: the four walls, without the top and the bottom. Its area is $2h(l + b)$.`, d: 1, c: 'understanding', t: [1], time: 45 }, (Cx) => {
  Cx.assert(cuboidLSA(8, 5, 4) === 2 * (8 * 4) + 2 * (5 * 4) && cuboidTSA(8, 5, 4) === cuboidLSA(8, 5, 4) + 2 * 8 * 5, 'walls plus top and bottom give the total');
  Cx.which(['walls', 'all', 'topbottom', 'base'], 'walls');
});
T('m09', { stem: r`A rectangular water tank on a school roof is $2.5$ m long, $1.6$ m broad and $1.2$ m high. When it is full it holds`, opts: [r`$4800$ litres`, r`$480$ litres`, r`$48000$ litres`, r`$4.8$ litres`], sol: r`Volume $= 2.5 \times 1.6 \times 1.2 = 4.8$ m$^3$. Since $1$ m$^3 = 1000$ litres, the tank holds $4.8 \times 1000 = 4800$ litres. The value $4.8$ forgets to change cubic metres into litres.`, d: 2, c: 'application', t: [1], time: 75 }, (Cx) => {
  Cx.assert(close(cuboidV(2.5, 1.6, 1.2), 4.8, 1e-9), 'volume 4.8 cubic metres');
  Cx.which([rd(cuboidV(2.5, 1.6, 1.2) * 1000, 6), 480, 48000, rd(cuboidV(2.5, 1.6, 1.2), 6)], 4800);
});
T('m10', { stem: 'If the edge of a cube is doubled, its total surface area becomes', opts: ['$4$ times', '$2$ times', '$8$ times', '$6$ times'], sol: r`For an edge $a$ the total surface is $6a^2$. For an edge $2a$ it is $6(2a)^2 = 24a^2$, which is $4$ times $6a^2$. The volume becomes $8$ times, not the surface area.`, d: 3, c: 'analysis', t: [1], time: 90 }, (Cx) => {
  const ratios = [3, 5, 7].map((a) => cubeTSA(2 * a) / cubeTSA(a));
  Cx.assert(ratios.every((q) => close(q, 4)) && close(cubeV(6) / cubeV(3), 8), 'surface x4, volume x8 for three edges');
  Cx.which([ratios[0], 2, cubeV(2 * 3) / cubeV(3), 6], 4);
});
T('m11', { stem: r`A cylindrical steel dabba in a canteen has a radius of $10.5$ cm and a height of $8$ cm. Its volume, using $\pi = \dfrac{22}{7}$, is`, opts: [r`$2772$ cm$^3$`, r`$528$ cm$^3$`, r`$346.5$ cm$^3$`, r`$924$ cm$^3$`], sol: r`Volume $= \pi r^2 h = \dfrac{22}{7} \times 10.5^2 \times 8 = \dfrac{22}{7} \times 110.25 \times 8 = 2772$ cm$^3$. The value $528$ is the curved surface area $2\pi rh$, and $346.5$ is the area of the base.`, d: 2, c: 'application', t: [2], time: 75 }, (Cx) => {
  Cx.assert(close(cylCSA(10.5, 8, PI7), 528) && close(PI7 * 10.5 ** 2, 346.5), 'curved surface 528, base 346.5');
  Cx.which([cylV(10.5, 8, PI7), cylCSA(10.5, 8, PI7), PI7 * 10.5 ** 2, cylV(10.5, 8, PI7) / 3], 2772);
});
T('m12', { stem: r`The curved surface area of a cone of base radius $r$ and slant height $l$ is`, opts: [r`$\pi r l$`, r`$\pi r^2 l$`, r`$2\pi r l$`, r`$\pi r(r + l)$`], sol: r`The curved surface opens out into a sector of radius $l$ and arc length $2\pi r$. Its area is $\dfrac{1}{2} \times l \times 2\pi r = \pi r l$. The formula $\pi r(r + l)$ includes the base as well.`, d: 1, c: 'understanding', t: [2], time: 60 }, (Cx) => {
  const rr = 3, l = 5, sector = 0.5 * l * (2 * PI314 * rr);
  Cx.which([PI314 * rr * l, PI314 * rr * rr * l, 2 * PI314 * rr * l, PI314 * rr * (rr + l)], sector);
});
T('m13', { stem: r`A conical lamp shade has a base radius of $20$ cm and a height of $21$ cm. Its slant height is`, opts: [r`$29$ cm`, r`$41$ cm`, r`$1$ cm`, r`$14.5$ cm`], sol: r`$l = \sqrt{r^2 + h^2} = \sqrt{20^2 + 21^2} = \sqrt{841} = 29$ cm. The value $41 = 20 + 21$ adds the lengths without squaring them.`, d: 2, c: 'application', t: [2], time: 75 }, (Cx) => {
  Cx.assert(400 + 441 === 841, '400 + 441');
  Cx.which([slant(20, 21), 20 + 21, 21 - 20, 14.5], 29);
});
T('m14', { stem: 'The volume of a pyramid is', opts: [r`$\dfrac{1}{3} \times \text{base area} \times \text{height}$`, r`$\text{base area} \times \text{height}$`, r`$\dfrac{1}{2} \times \text{base area} \times \text{height}$`, r`$\dfrac{1}{3} \times \text{lateral surface area} \times \text{height}$`], sol: r`The volume of a pyramid is one third of the volume of the cuboid or prism with the same base and height: $\dfrac{1}{3} \times \text{base area} \times \text{height}$. Three pyramids fill a cube.`, d: 1, c: 'recall', t: [3], time: 45 }, (Cx) => {
  Cx.assert(pyrV(36, 6) === 72 && 3 * pyrV(36, 6) === cubeV(6), 'three pyramids fill the cube');
  Cx.which([pyrV(36, 6), 36 * 6, 0.5 * 36 * 6, 36 * 6 / 3 + 1], cubeV(6) / 3);
});
T('m15', { stem: r`A square pyramid on a shop sign has a base of side $18$ cm and a height of $12$ cm. Its lateral surface area is`, opts: [r`$540$ cm$^2$`, r`$270$ cm$^2$`, r`$432$ cm$^2$`, r`$864$ cm$^2$`], sol: r`The half side is $9$ cm, so the slant height is $l = \sqrt{12^2 + 9^2} = 15$ cm. Lateral surface area $= 4 \times \dfrac{1}{2} \times 18 \times 15 = 540$ cm$^2$. The value $432$ uses the height $12$ in place of the slant height, and $864$ is the total surface area.`, d: 3, c: 'application', t: [3], time: 105 }, (Cx) => {
  const l = sqSlant(18, 12);
  Cx.assert(l === 15 && 2 * 18 * 12 === 432 && sqPyrTSA(18, 15) === 864, 'slant 15; wrong 432; total 864');
  Cx.which([sqPyrLSA(18, l), sqPyrLSA(18, l) / 2, 2 * 18 * 12, sqPyrTSA(18, l)], 540);
});
T('m17', { stem: r`A steel ball in a bearing has a radius of $9$ cm. Its volume, using $\pi = 3.14$, is`, opts: [r`$3052.08$ cm$^3$`, r`$1017.36$ cm$^3$`, r`$9156.24$ cm$^3$`, r`$1526.04$ cm$^3$`], sol: r`Volume $= \dfrac{4}{3}\pi r^3 = \dfrac{4}{3} \times 3.14 \times 729 = 3052.08$ cm$^3$. The value $9156.24$ forgets the factor $\dfrac{1}{3}$, and $1526.04$ is only the volume of a hemisphere.`, d: 2, c: 'application', t: [4], time: 90 }, (Cx) => {
  Cx.assert(9 ** 3 === 729 && close(4 * PI314 * 729, 9156.24), '729 and 9156.24');
  Cx.which([sphereV(9, PI314), sphereV(9, PI314) / 3, 4 * PI314 * 729, hemiV(9, PI314)], 3052.08);
});
T('m18', { stem: r`A hemispherical copper bowl of radius $r$ is polished on its outside only (not the rim). The curved area polished is`, opts: [r`$2\pi r^2$`, r`$\pi r^2$`, r`$3\pi r^2$`, r`$4\pi r^2$`], sol: r`The curved surface of a hemisphere is half of the surface of a sphere: $\dfrac{1}{2} \times 4\pi r^2 = 2\pi r^2$. The formula $3\pi r^2$ is the total surface area of a solid hemisphere, with its flat face.`, d: 1, c: 'understanding', t: [4], time: 60 }, (Cx) => {
  const rr = 2.5;
  Cx.which([2 * PI314 * rr * rr, PI314 * rr * rr, 3 * PI314 * rr * rr, 4 * PI314 * rr * rr], sphereSA(rr, PI314) / 2);
});
T('m20', { stem: r`A closed cylindrical tin has a radius of $3.5$ cm and a height of $8.5$ cm. Its total surface area, using $\pi = \dfrac{22}{7}$, is`, opts: [r`$264$ cm$^2$`, r`$187$ cm$^2$`, r`$77$ cm$^2$`, r`$132$ cm$^2$`], sol: r`Total surface area $= 2\pi r(r + h) = 2 \times \dfrac{22}{7} \times 3.5 \times 12 = 264$ cm$^2$. The value $187$ is the curved surface only, and $77$ is the two circular ends only.`, d: 2, c: 'application', t: [2], time: 75 }, (Cx) => {
  Cx.assert(close(cylCSA(3.5, 8.5, PI7), 187) && close(2 * PI7 * 3.5 ** 2, 77), 'curved 187, ends 77');
  Cx.which([cylTSA(3.5, 8.5, PI7), cylCSA(3.5, 8.5, PI7), 2 * PI7 * 3.5 ** 2, cylTSA(3.5, 8.5, PI7) / 2], 264);
});
T('m21', { stem: 'The radius of the base of a cone is halved and its height is not changed. Its volume becomes', opts: ['one quarter', 'one half', 'one eighth', 'one third'], sol: r`$V = \dfrac{1}{3}\pi r^2 h$. With radius $\dfrac{r}{2}$ the volume is $\dfrac{1}{3}\pi \dfrac{r^2}{4} h$, which is $\dfrac{1}{4}$ of the first volume, because $V$ depends on the **square** of the radius.`, d: 3, c: 'analysis', t: [2], time: 90 }, (Cx) => {
  const ratios = [[6, 8], [3.5, 12], [10, 9]].map(([rr, h]) => coneV(rr / 2, h, PI314) / coneV(rr, h, PI314));
  Cx.assert(ratios.every((q) => close(q, 0.25)), 'a quarter for three cones');
  Cx.which([ratios[0], 0.5, 0.125, 1 / 3], 0.25);
});

// =============================================================== assertion-reason
Q('ar1', mk.ar({ a: 'The total surface area of a cuboid of length $l$, breadth $b$ and height $h$ is $2(lb + bh + hl)$.', r: 'A cuboid has six rectangular faces in three pairs of equal faces, with areas $lb$, $bh$ and $hl$.', key: 'a', sol: r`A is true. R is true and explains A: the three pairs of faces have areas $lb$, $bh$ and $hl$, and adding all six faces gives $2lb + 2bh + 2hl = 2(lb + bh + hl)$.`, d: 2, c: 'analysis', t: [1] }), (Cx) => {
  const [l, b, h] = [9, 4, 3];
  Cx.assert(2 * (l * b) + 2 * (b * h) + 2 * (h * l) === cuboidTSA(l, b, h), 'six faces add up to the formula');
  Cx.key('a');
});
Q('ar2', mk.ar({ a: r`The volume of a cone of radius $r$ and height $h$ is $\dfrac{1}{3}\pi r^2 h$.`, r: 'The volume of a cone is equal to the volume of the cylinder with the same base radius and the same height.', key: 'c', sol: r`A is true. R is false: the cone has only one third of the volume of the cylinder with the same base and height. For $r = 3$, $h = 5$ the cylinder has volume $\pi \times 9 \times 5 = 45\pi$ but the cone has $15\pi$.`, d: 2, c: 'analysis', t: [2] }), (Cx) => {
  Cx.assert(close(coneV(3, 5, Math.PI), 15 * Math.PI) && close(cylV(3, 5, Math.PI), 45 * Math.PI) && !close(coneV(3, 5, 1), cylV(3, 5, 1)), 'cone 15 pi, cylinder 45 pi');
  Cx.key('c');
});
Q('ar3', mk.ar({ a: 'The slant height of a cone is always shorter than its height.', r: r`In a cone, $l^2 = r^2 + h^2$, where $l$ is the slant height, $r$ the base radius and $h$ the height.`, key: 'd', sol: r`A is false: $l^2 = r^2 + h^2$ is larger than $h^2$, so $l > h$. For $r = 3$, $h = 4$, $l = 5$, which is longer than $4$. R is true, and it is the reason A is false.`, d: 2, c: 'analysis', t: [2] }), (Cx) => {
  Cx.assert([[3, 4], [5, 12], [20, 21]].every(([rr, h]) => slant(rr, h) > h), 'slant height is longer than the height');
  Cx.key('d');
});
Q('ar4', mk.ar({ a: r`The surface area of a sphere of radius $r$ is $4\pi r^2$.`, r: r`The volume of a sphere of radius $r$ is $\dfrac{4}{3}\pi r^3$.`, key: 'b', sol: r`Both statements are true. But the volume formula does not explain the surface area formula; they are two different facts about the sphere. So R is not the explanation of A.`, d: 2, c: 'analysis', t: [4] }), (Cx) => {
  Cx.assert(close(sphereSA(6, PI314), 452.16) && close(sphereV(6, PI314), 904.32), 'sphere of radius 6: 452.16 and 904.32');
  Cx.key('b');
});
Q('ar5', mk.ar({ a: 'When the radius of a sphere is doubled, its surface area becomes four times as large.', r: 'The surface area of a sphere is proportional to the square of its radius.', key: 'a', sol: r`A is true: $4\pi(2r)^2 = 16\pi r^2 = 4 \times 4\pi r^2$. R is true and explains A: surface area $= 4\pi r^2$ depends on $r^2$, and $2^2 = 4$.`, d: 3, c: 'analysis', t: [4] }), (Cx) => {
  Cx.assert([1, 2.5, 7].every((rr) => close(sphereSA(2 * rr, PI7) / sphereSA(rr, PI7), 4)), 'x4 for three radii');
  Cx.key('a');
});
Q('ar6', mk.ar({ a: 'The volume of a square pyramid with a base of side $6$ cm and a height of $5$ cm is $60$ cm$^3$.', r: 'The volume of a pyramid is equal to the base area multiplied by the height.', key: 'c', sol: r`A is true: $\dfrac{1}{3} \times 36 \times 5 = 60$ cm$^3$. R is false: the volume is only **one third** of the base area times the height. Base area times height would be $180$ cm$^3$.`, d: 2, c: 'analysis', t: [3] }), (Cx) => {
  Cx.assert(close(pyrV(36, 5), 60) && 36 * 5 === 180, '60 and 180');
  Cx.key('c');
});

// =============================================================== true-false
Q('tf1', mk.tf({ stem: r`The lateral surface area of a cube of edge $a$ is $4a^2$.`, key: 't', sol: r`The lateral surface is the four side faces, each a square of area $a^2$, so the area is $4a^2$. For $a = 5$ cm it is $100$ cm$^2$. The statement is true.`, d: 1, c: 'recall', t: [1] }), (Cx) => {
  Cx.assert(cubeLSA(5) === 100 && cuboidLSA(5, 5, 5) === 100, '100');
  Cx.key('t');
});
Q('tf2', mk.tf({ stem: 'The slant height of a cone is equal to its height.', key: 'f', sol: r`The slant height is the sloping edge, and $l = \sqrt{r^2 + h^2}$, which is greater than $h$. For $r = 6$, $h = 8$ the slant height is $10$ cm, not $8$ cm. The statement is false.`, d: 1, c: 'understanding', t: [2] }), (Cx) => {
  Cx.assert(slant(6, 8) === 10 && slant(6, 8) !== 8, 'slant 10, not 8');
  Cx.key('f');
});
Q('tf3', mk.tf({ stem: 'A pyramid has one third of the volume of a cuboid that has the same base and the same height.', key: 't', sol: r`The volume of a pyramid is $\dfrac{1}{3} \times \text{base area} \times \text{height}$, and the cuboid has $\text{base area} \times \text{height}$. So the pyramid has one third of the volume. The statement is true.`, d: 1, c: 'understanding', t: [3] }), (Cx) => {
  Cx.assert(close(cuboidV(5, 4, 9) / 3, pyrV(20, 9)), 'a third');
  Cx.key('t');
});
Q('tf4', mk.tf({ stem: r`A solid hemisphere of radius $3.5$ cm has a total surface area of $77$ cm$^2$. Use $\pi = \dfrac{22}{7}$.`, key: 'f', sol: r`The value $77$ cm$^2$ is only the curved surface $2\pi r^2$. The total surface area also includes the flat face $\pi r^2 = 38.5$ cm$^2$, so it is $3\pi r^2 = 115.5$ cm$^2$. The statement is false.`, d: 2, c: 'understanding', t: [4] }), (Cx) => {
  Cx.assert(close(hemiCSA(3.5, PI7), 77) && close(hemiTSA(3.5, PI7), 115.5) && close(PI7 * 3.5 ** 2, 38.5), 'curved 77, total 115.5');
  Cx.key('f');
});
Q('tf5', mk.tf({ stem: r`One litre is equal to $1000$ cubic centimetres.`, key: 't', sol: r`A cube of edge $10$ cm has volume $10 \times 10 \times 10 = 1000$ cm$^3$, and it holds exactly $1$ litre. The statement is true.`, d: 1, c: 'recall', t: [1] }), (Cx) => {
  Cx.assert(cubeV(10) === 1000, 'a 10 cm cube holds 1000 cubic centimetres');
  Cx.key('t');
});

// =============================================================== fill in the blank
Q('fb1', mk.fill({ stem: 'A square pyramid has ____ triangular faces.', acc: [['4', 'four']], sol: 'A square pyramid has a square base and one triangular face on each of the four sides, so it has four triangular faces. So the blank is 4.', d: 1, c: 'recall', t: [3] }), (Cx) => { Cx.blank(4); });
Q('fb2', mk.fill({ stem: 'The volume of a cone is ____ of the volume of the cylinder with the same base and the same height.', acc: [['1/3']], sol: r`$V_{\text{cone}} = \dfrac{1}{3}\pi r^2 h$ and $V_{\text{cylinder}} = \pi r^2 h$, so the cone is $1/3$ of the cylinder. So the blank is $1/3$.`, d: 1, c: 'understanding', t: [2] }), (Cx) => {
  Cx.assert(close(coneV(4, 9, PI314) / cylV(4, 9, PI314), 1 / 3), 'one third');
  Cx.blank(1 / 3);
});
Q('fb3', mk.fill({ stem: r`A tank of volume $1$ m$^3$ holds ____ litres of water.`, acc: [['1000']], sol: r`$1$ m$^3 = 100 \times 100 \times 100 = 1000000$ cm$^3$ and $1$ L $= 1000$ cm$^3$, so $1$ m$^3 = 1000$ L. So the blank is $1000$.`, d: 1, c: 'recall', t: [1] }), (Cx) => {
  Cx.assert(100 ** 3 / 1000 === 1000, '1000');
  Cx.blank(1000);
});

// =============================================================== match (2 marks)
{
  const a = 2, rr = 3, h = 5;
  const vals = [cubeV(a), cylV(rr, h, PI314), coneV(rr, h, PI314), sphereV(rr, PI314)];
  const rightVals = [(1 / 3) * PI314 * rr * rr * h, a * a * a, (4 / 3) * PI314 * rr ** 3, PI314 * rr * rr * h];
  const order = [1, 3, 0, 2];
  Q('mt1', mk.match({ stem: 'Match each solid in Column I with the formula for its volume in Column II.', left: ['Cube of edge $a$', 'Cylinder of radius $r$ and height $h$', 'Cone of radius $r$ and height $h$', 'Sphere of radius $r$'], right: [r`$\dfrac{1}{3}\pi r^2 h$`, r`$a^3$`, r`$\dfrac{4}{3}\pi r^3$`, r`$\pi r^2 h$`], order, sol: r`A cube has volume $a^3$; a cylinder has base area $\pi r^2$ times height, $\pi r^2 h$; a cone has one third of that, $\dfrac{1}{3}\pi r^2 h$; and a sphere has $\dfrac{4}{3}\pi r^3$.`, d: 1, c: 'recall', t: [1, 2, 4] }), (Cx) => Cx.assert(vals.every((v, i) => close(v, rightVals[order[i]])), 'each volume equals its formula for a = 2, r = 3, h = 5'));
}
{
  const vals = [cubeV(6), cuboidV(5, 4, 3), sphereSA(5, PI314), cylCSA(7, 3, PI7)];
  const shown = [60, 132, 216, 314], order = [2, 0, 3, 1];
  Q('mt2', mk.match({ stem: r`Match each solid in Column I with its measure in Column II.`, left: [r`Cube of edge $6$ cm: volume`, r`Cuboid $5 \times 4 \times 3$ cm: volume`, r`Sphere of radius $5$ cm: surface area ($\pi = 3.14$)`, r`Cylinder of radius $7$ cm and height $3$ cm: curved surface area ($\pi = \dfrac{22}{7}$)`], right: [r`$60$ cm$^3$`, r`$132$ cm$^2$`, r`$216$ cm$^3$`, r`$314$ cm$^2$`], order, sol: r`Cube: $6^3 = 216$ cm$^3$. Cuboid: $5 \times 4 \times 3 = 60$ cm$^3$. Sphere: $4 \times 3.14 \times 25 = 314$ cm$^2$. Cylinder: $2 \times \dfrac{22}{7} \times 7 \times 3 = 132$ cm$^2$.`, d: 2, c: 'application', t: [1, 2, 4] }), (Cx) => Cx.assert(vals.every((v, i) => close(v, shown[order[i]])), 'the four measures'));
}

// =============================================================== numerical
Q('n01', mk.num({ stem: r`A rectangular fish tank in a shop in Kochi is $80$ cm long, $35$ cm broad and $40$ cm high. How many litres of water does it hold when it is full?`, value: 112, sol: r`Volume $= 80 \times 35 \times 40 = 112000$ cm$^3$. Since $1$ L $= 1000$ cm$^3$, the tank holds $112000 \div 1000 = 112$ litres.`, scheme: [['Volume 112000 cm cubed', 0.5], ['112 litres', 0.5]], d: 2, c: 'application', t: [1], time: 90 }), (Cx) => {
  Cx.assert(80 * 35 * 40 === 112000, '112000');
  Cx.val(cuboidV(80, 35, 40) / 1000);
});
Q('n02', mk.num({ stem: r`A cylindrical water tank in a village near Warangal has a base radius of $1.4$ m and holds $18480$ litres when full. Find its height in metres. Use $\pi = \dfrac{22}{7}$.`, value: 3, sol: r`The volume is $18480$ L $= 18.48$ m$^3$. The base area is $\dfrac{22}{7} \times 1.4^2 = 6.16$ m$^2$, so the height is $18.48 \div 6.16 = 3$ m.`, scheme: [['Volume 18.48 m cubed and base area 6.16 m squared', 0.5], ['Height 3 m', 0.5]], d: 3, c: 'application', t: [2], time: 105 }), (Cx) => {
  Cx.assert(close(PI7 * 1.4 ** 2, 6.16) && close(cylV(1.4, 3, PI7), 18.48), 'base 6.16 and volume 18.48 for h = 3');
  Cx.val(rd(18480 / 1000 / (PI7 * 1.4 ** 2), 9));
});
Q('n04', mk.num({ stem: r`The surface area of a spherical globe in a library is $2464$ cm$^2$. Find its radius in cm. Use $\pi = \dfrac{22}{7}$.`, value: 14, sol: r`$4\pi r^2 = 2464$ gives $4 \times \dfrac{22}{7} \times r^2 = 2464$, so $r^2 = 2464 \times \dfrac{7}{88} = 196$ and $r = 14$ cm.`, scheme: [['r squared = 196', 0.5], ['r = 14 cm', 0.5]], d: 3, c: 'analysis', t: [4], time: 105 }), (Cx) => {
  Cx.assert(close(sphereSA(14, PI7), 2464), 'a sphere of radius 14 has 2464');
  Cx.val(rd(Math.sqrt(2464 / (4 * PI7)), 9));
});
