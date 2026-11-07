// CBSE 9 Mathematics ch13 Surface Area and Volume: written items (short 2 and 3 marks, long 5 marks, case-based). Every number is
// recomputed from the givens with the formulas of h.mjs and the stated pi (22/7 or 3.14); descriptions are marked by their scheme.
import { Q, caseQ, child, mk } from './lib.mjs';
import { r, must, close, rd, cuboidTSA, cuboidLSA, cuboidV, cubeTSA, cubeV, cylCSA, cylTSA, cylV, slant, coneCSA, coneTSA, coneV, sqSlant, sqPyrLSA, sqPyrTSA, pyrV, sphereSA, sphereV, hemiCSA, hemiTSA, hemiV, PI7, PI314, cuboidFig, cylFig, sqPyrFig, hemiFig } from './h.mjs';
import { fPyrCube } from './figs.mjs';

// =============================================================== short answer, 2 marks
Q('s201', mk.short({ marks: 2, stem: r`A hall in a school in Chandigarh is $12$ m long, $9$ m broad and $4$ m high. Find the area of its four walls.`, model: r`The four walls form the lateral surface of the cuboid.\n\nArea $= 2h(l + b) = 2 \times 4 \times (12 + 9) = 2 \times 4 \times 21 = 168$ m$^2$.`, sol: 'Lateral surface area 2h(l + b).', scheme: [['Formula 2h(l + b) with the values', 1], ['168 m squared', 1]], d: 1, c: 'application', t: [1], time: 75 }), (Cx) => {
  Cx.assert(cuboidLSA(12, 9, 4) === 168 && 2 * (4 * 12) + 2 * (4 * 9) === 168, '168 from the formula and from the four walls');
  Cx.model([4, 21, 168]);
});
Q('s202', mk.short({ marks: 2, stem: r`The total surface area of a cube is $384$ cm$^2$. Find its edge and its volume.`, model: r`$6a^2 = 384$, so $a^2 = 64$ and the edge is $a = 8$ cm.\n\nVolume $= a^3 = 8^3 = 512$ cm$^3$.`, sol: 'Total surface 6a squared; then a cubed.', scheme: [['a squared = 64 and a = 8 cm', 1], ['Volume 512 cm cubed', 1]], d: 2, c: 'application', t: [1], time: 90 }), (Cx) => {
  const a = Math.sqrt(384 / 6);
  Cx.assert(close(a, 8) && close(cubeTSA(8), 384) && close(cubeV(a), 512), 'edge 8, volume 512');
  Cx.model([64, 8, 512]);
});
Q('s203', mk.short({ marks: 2, stem: r`A cylindrical pillar in a temple in Madurai has a radius of $21$ cm and a height of $50$ cm. Find its volume in cm$^3$ and in litres. Use $\pi = \dfrac{22}{7}$.`, model: r`Volume $= \pi r^2 h = \dfrac{22}{7} \times 21^2 \times 50 = 69300$ cm$^3$.\n\nIn litres: $69300 \div 1000 = 69.3$ L.`, sol: 'Volume pi r squared h; divide by 1000 for litres.', scheme: [['Volume 69300 cm cubed', 1], ['69.3 litres', 1]], d: 2, c: 'application', t: [2], time: 90 }), (Cx) => {
  Cx.assert(close(cylV(21, 50, PI7), 69300) && close(69300 / 1000, 69.3), '69300 and 69.3');
  Cx.model([69300, 69.3]);
});
Q('s204', mk.short({ marks: 2, stem: r`A party hat is a cone of base radius $8$ cm and height $15$ cm. Find its slant height and the area of paper in its curved surface. Use $\pi = 3.14$.`, model: r`Slant height $l = \sqrt{8^2 + 15^2} = \sqrt{289} = 17$ cm.\n\nCurved surface area $= \pi r l = 3.14 \times 8 \times 17 = 427.04$ cm$^2$.`, sol: 'Find l first, then pi r l.', scheme: [['l = 17 cm', 1], ['Area 427.04 cm squared', 1]], d: 2, c: 'application', t: [2], time: 90 }), (Cx) => {
  Cx.assert(slant(8, 15) === 17 && close(coneCSA(8, 17, PI314), 427.04), '17 and 427.04');
  Cx.model([289, 17, 427.04]);
});
Q('s206', mk.short({ marks: 2, stem: r`A large globe in a museum is a sphere of radius $21$ cm. Find its volume. Use $\pi = \dfrac{22}{7}$.`, model: r`Volume $= \dfrac{4}{3}\pi r^3 = \dfrac{4}{3} \times \dfrac{22}{7} \times 21^3$.\n\n$21^3 = 9261$, so the volume is $\dfrac{4}{3} \times \dfrac{22}{7} \times 9261 = 38808$ cm$^3$.`, sol: 'Four thirds pi r cubed.', scheme: [['Formula with r = 21, and 21 cubed = 9261', 1], ['Volume 38808 cm cubed', 1]], d: 2, c: 'application', t: [4], time: 90 }), (Cx) => {
  Cx.assert(21 ** 3 === 9261 && close(sphereV(21, PI7), 38808), '9261 and 38808');
  Cx.model([9261, 38808]);
});
Q('s207', mk.short({ marks: 2, stem: r`A hemispherical steel bowl at a tea stall has an inner radius of $5.6$ cm. Find the area of its inner curved surface. Use $\pi = \dfrac{22}{7}$.`, model: r`The inside of a bowl is a curved surface only: $2\pi r^2 = 2 \times \dfrac{22}{7} \times 5.6^2$.\n\n$5.6^2 = 31.36$, so the area is $197.12$ cm$^2$.`, sol: 'Curved surface 2 pi r squared.', scheme: [['Curved surface 2 pi r squared, with r = 5.6', 1], ['197.12 cm squared', 1]], d: 2, c: 'application', t: [4], time: 90 }), (Cx) => {
  Cx.assert(close(5.6 ** 2, 31.36) && close(hemiCSA(5.6, PI7), 197.12), '31.36 and 197.12');
  Cx.model([31.36, 197.12]);
});
Q('s208', mk.short({ marks: 2, stem: 'What is the slant height of a cone? How is it found from the radius and the height? Say how the slant height of a face of a square pyramid differs from the height of the pyramid.', model: r`The **slant height** $l$ of a cone is the length of the sloping edge from the apex to the rim of the base. Since $r$, $h$ and $l$ form a right-angled triangle, $l = \sqrt{r^2 + h^2}$.\n\nIn a square pyramid the height goes straight down from the apex to the centre of the base; the slant height of a face goes from the apex to the mid-point of a base edge, and $l = \sqrt{h^2 + (a/2)^2}$, so it is longer than the height.`, sol: 'Definition of l, the formula, and the difference between l and h.', scheme: [['Slant height is the sloping edge; l = sqrt(r squared + h squared)', 1], ['For a pyramid l goes to the mid-point of a base edge and is longer than h', 1]], d: 1, c: 'understanding', t: [2, 3], time: 90 }), null, 'definition and a comparison: marked by the scheme');

// =============================================================== short answer, 3 marks
{
  const a = 6, base = a * a, each = pyrV(base, a);
  Q('s301', mk.short({ marks: 3, stem: r`A cube of edge $6$ cm is divided into three identical pyramids, as in the figure: each has a face of the cube as its base and the same corner of the cube as its apex. Find the volume of the cube and of each pyramid, and show that each pyramid's volume is $\dfrac{1}{3} \times \text{base area} \times \text{height}$.`, model: r`Volume of the cube $= 6^3 = 216$ cm$^3$.\n\nThe three pyramids are identical, so each has volume $\dfrac{216}{3} = 72$ cm$^3$.\n\nEach pyramid has base area $6 \times 6 = 36$ cm$^2$ and height $6$ cm (the edge of the cube), and $\dfrac{1}{3} \times 36 \times 6 = 72$ cm$^3$, the same.`, sol: 'Cube 216; one third of it is 72; this equals one third of 36 times 6.', scheme: [['Cube 216 cm cubed', 1], ['Each pyramid 72 cm cubed', 1], ['The check one third of 36 times 6 = 72', 1]], d: 3, c: 'analysis', t: [3], time: 150, assets: [fPyrCube] }), (Cx) => {
    Cx.assert(cubeV(a) === 216 && close(cubeV(a) / 3, each) && close(each, 72) && base === 36, '216, 72, 36');
    Cx.model([216, 72, 36, 6]);
  });
}
{
  const tsa = cylTSA(5.6, 2.4, PI7), cost = tsa * 15;
  Q('s302', mk.short({ marks: 3, stem: r`A closed cylindrical oil tank at a depot in Visakhapatnam has a radius of $5.6$ m and a height of $2.4$ m. Find the cost of painting its whole outside at $\text{Rs } 15$ per m$^2$. Use $\pi = \dfrac{22}{7}$.`, model: r`Total surface area $= 2\pi r(r + h) = 2 \times \dfrac{22}{7} \times 5.6 \times (5.6 + 2.4)$.\n\n$= 2 \times \dfrac{22}{7} \times 5.6 \times 8 = 281.6$ m$^2$.\n\nCost $= 281.6 \times 15 = \text{Rs } 4224$.`, sol: 'Total surface area of a closed cylinder, then the rate.', scheme: [['Formula 2 pi r (r + h) with r + h = 8', 1], ['Area 281.6 m squared', 1], ['Cost 4224 rupees', 1]], d: 2, c: 'application', t: [2], time: 150 }), (Cx) => {
    Cx.assert(close(5.6 + 2.4, 8) && close(tsa, 281.6) && close(cost, 4224), '281.6 and 4224');
    Cx.model([8, 281.6, 4224]);
  });
}
{
  const l = slant(12, 16), csa = coneCSA(12, l, PI314), cost = csa * 75;
  Q('s303', mk.short({ marks: 3, stem: r`A conical tent for a school camp in Dehradun has a base radius of $12$ m and a height of $16$ m. Find the area of canvas in its curved surface, and the cost of the canvas at $\text{Rs } 75$ per m$^2$. Use $\pi = 3.14$.`, model: r`Slant height $l = \sqrt{12^2 + 16^2} = \sqrt{400} = 20$ m.\n\nCanvas $= \pi r l = 3.14 \times 12 \times 20 = 753.6$ m$^2$.\n\nCost $= 753.6 \times 75 = \text{Rs } 56520$.`, sol: 'Slant height, then pi r l, then the rate.', scheme: [['l = 20 m', 1], ['Canvas 753.6 m squared', 1], ['Cost 56520 rupees', 1]], d: 2, c: 'application', t: [2], time: 150 }), (Cx) => {
    Cx.assert(l === 20 && close(csa, 753.6) && close(cost, 56520), '20, 753.6, 56520');
    Cx.model([400, 20, 753.6, 56520]);
  });
}
{
  const l = sqSlant(40, 21), lsa = sqPyrLSA(40, l), v = pyrV(1600, 21);
  Q('s304', mk.short({ marks: 3, stem: r`A stone model of a temple spire in Khajuraho is a square pyramid with a base of side $40$ cm and a height of $21$ cm. Find the slant height of a face, the lateral surface area and the volume.`, model: r`The half side is $20$ cm, so $l = \sqrt{21^2 + 20^2} = \sqrt{841} = 29$ cm.\n\nLateral surface area $= 4 \times \dfrac{1}{2} \times 40 \times 29 = 2320$ cm$^2$.\n\nVolume $= \dfrac{1}{3} \times 40 \times 40 \times 21 = 11200$ cm$^3$.`, sol: 'Slant height, four faces, one third of base times height.', scheme: [['l = 29 cm', 1], ['Lateral surface 2320 cm squared', 1], ['Volume 11200 cm cubed', 1]], d: 3, c: 'application', t: [3], time: 150 }), (Cx) => {
    Cx.assert(l === 29 && 441 + 400 === 841 && lsa === 2320 && v === 11200, '29, 2320, 11200');
    Cx.model([841, 29, 2320, 11200]);
  });
}

// =============================================================== long answer, 5 marks
{
  const [l, b, h] = [15, 10, 4], floor = l * b, walls = cuboidLSA(l, b, h), cost = (walls + floor) * 12, vol = cuboidV(l, b, h);
  Q('l01', mk.long({ stem: r`A school hall in Pune is $15$ m long, $10$ m broad and $4$ m high. (a) Find the area of its floor. (b) Find the area of its four walls. (c) Find the cost of whitewashing the four walls and the ceiling at $\text{Rs } 12$ per m$^2$. (d) Find the volume of air in the hall. (e) Each student needs $4$ m$^3$ of air. What is the largest number of students the hall can hold?`, model: r`**(a)** Floor $= 15 \times 10 = 150$ m$^2$.\n\n**(b)** Four walls $= 2h(l + b) = 2 \times 4 \times 25 = 200$ m$^2$.\n\n**(c)** The ceiling has the same area as the floor, so the area to whitewash is $200 + 150 = 350$ m$^2$. Cost $= 350 \times 12 = \text{Rs } 4200$.\n\n**(d)** Volume $= 15 \times 10 \times 4 = 600$ m$^3$.\n\n**(e)** Students $= 600 \div 4 = 150$.`, sol: 'Floor, walls, ceiling and walls with the rate, volume, and volume divided by 4.', scheme: [['(a) floor 150 m squared', 1], ['(b) walls 200 m squared', 1], ['(c) cost 4200 rupees', 1], ['(d) volume 600 m cubed', 1], ['(e) 150 students', 1]], d: 3, c: 'application', t: [1], time: 420 }), (Cx) => {
    Cx.assert(floor === 150 && walls === 200 && walls + floor === 350 && cost === 4200 && vol === 600 && vol / 4 === 150 && cuboidTSA(l, b, h) === 2 * (floor + 60 + 40), '150, 200, 350, 4200, 600, 150');
    Cx.model([150, 200, 350, 4200, 600, 150]);
  });
}
{
  const rr = 0.7, len = 2, csa = cylCSA(rr, len, PI7), area = csa * 500, cost = area * 2, vol = cylV(rr, len, PI7);
  Q('l02', mk.long({ stem: r`A concrete roller used to level a road in Rajkot is a cylinder of diameter $1.4$ m and length $2$ m. Use $\pi = \dfrac{22}{7}$. (a) Find its radius. (b) Find its curved surface area. (c) Find the area of road levelled in $500$ complete turns. (d) Find the cost of levelling at $\text{Rs } 2$ per m$^2$. (e) Find the volume of concrete in the solid roller.`, model: r`**(a)** Radius $= 1.4 \div 2 = 0.7$ m.\n\n**(b)** Curved surface area $= 2\pi r h = 2 \times \dfrac{22}{7} \times 0.7 \times 2 = 8.8$ m$^2$.\n\n**(c)** In one turn it covers its curved surface, so in $500$ turns $500 \times 8.8 = 4400$ m$^2$.\n\n**(d)** Cost $= 4400 \times 2 = \text{Rs } 8800$.\n\n**(e)** Volume $= \pi r^2 h = \dfrac{22}{7} \times 0.7^2 \times 2 = 3.08$ m$^3$.`, sol: 'Radius, curved surface, 500 turns, rate, volume.', scheme: [['(a) radius 0.7 m', 1], ['(b) curved surface 8.8 m squared', 1], ['(c) 4400 m squared', 1], ['(d) cost 8800 rupees', 1], ['(e) volume 3.08 m cubed', 1]], d: 3, c: 'application', t: [2], time: 420 }), (Cx) => {
    Cx.assert(close(1.4 / 2, rr) && close(csa, 8.8) && close(area, 4400) && close(cost, 8800) && close(vol, 3.08), '0.7, 8.8, 4400, 8800, 3.08');
    Cx.model([0.7, 8.8, 4400, 8800, 3.08]);
  });
}
{
  const rr = 15, h = 20, l = slant(rr, h), csa = coneCSA(rr, l, PI314), v = coneV(rr, h, PI314), floor = PI314 * rr * rr;
  Q('l03', mk.long({ stem: r`A conical tent for a mela in Almora has a base radius of $15$ m and a height of $20$ m. Use $\pi = 3.14$. (a) Find its slant height. (b) Find the area of canvas in its curved surface. (c) Find the cost of the canvas at $\text{Rs } 60$ per m$^2$. (d) Find the volume of air inside the tent. (e) The circular floor is covered with a tarpaulin at $\text{Rs } 20$ per m$^2$. Find the cost.`, model: r`**(a)** $l = \sqrt{15^2 + 20^2} = \sqrt{625} = 25$ m.\n\n**(b)** Canvas $= \pi r l = 3.14 \times 15 \times 25 = 1177.5$ m$^2$.\n\n**(c)** Cost $= 1177.5 \times 60 = \text{Rs } 70650$.\n\n**(d)** Volume $= \dfrac{1}{3} \times 3.14 \times 15^2 \times 20 = 4710$ m$^3$.\n\n**(e)** Floor $= \pi r^2 = 3.14 \times 225 = 706.5$ m$^2$, so the cost is $706.5 \times 20 = \text{Rs } 14130$.`, sol: 'Slant height, pi r l, rate, one third pi r squared h, floor and rate.', scheme: [['(a) l = 25 m', 1], ['(b) canvas 1177.5 m squared', 1], ['(c) cost 70650 rupees', 1], ['(d) volume 4710 m cubed', 1], ['(e) tarpaulin 14130 rupees', 1]], d: 3, c: 'application', t: [2], time: 420 }), (Cx) => {
    Cx.assert(l === 25 && 225 + 400 === 625 && close(csa, 1177.5) && close(csa * 60, 70650) && close(v, 4710) && close(floor, 706.5) && close(floor * 20, 14130), '25, 1177.5, 70650, 4710, 706.5, 14130');
    Cx.model([625, 25, 1177.5, 70650, 4710, 706.5, 14130]);
  });
}
{
  const a = 24, h = 16, l = sqSlant(a, h), lsa = sqPyrLSA(a, l), tsa = sqPyrTSA(a, l), v = pyrV(a * a, h), cost = lsa * 0.5;
  const fig = sqPyrFig(24, 16, { a: '24 cm', h: '16 cm', l: null, pts: true }, 'A model of a temple spire in the shape of a square pyramid with a square base of side 24 centimetres and a height of 16 centimetres, drawn not to scale. The dashed line VO is the height and M is the mid-point of a base edge.', 'A square pyramid: base $24$ cm, height $16$ cm (not to scale).', 0.3);
  Q('l04', mk.long({ stem: r`A model of a temple spire in a museum in Bhubaneswar is a square pyramid with a base of side $24$ cm and a height of $16$ cm, as in the figure. (a) Find the slant height of a face. (b) Find the lateral surface area. (c) Find the total surface area. (d) Find the volume. (e) The four sloping faces are to be coated with gold paint at $\text{Rs } 0.50$ per cm$^2$. Find the cost.`, model: r`**(a)** The half side is $12$ cm, so $l = \sqrt{16^2 + 12^2} = \sqrt{400} = 20$ cm.\n\n**(b)** Lateral surface area $= 4 \times \dfrac{1}{2} \times 24 \times 20 = 960$ cm$^2$.\n\n**(c)** Total surface area $= 960 + 24^2 = 960 + 576 = 1536$ cm$^2$.\n\n**(d)** Volume $= \dfrac{1}{3} \times 576 \times 16 = 3072$ cm$^3$.\n\n**(e)** The cost is $960 \times 0.50 = \text{Rs } 480$.`, sol: 'Slant height, four faces, add the base, one third of base times height, rate on the faces.', scheme: [['(a) l = 20 cm', 1], ['(b) lateral surface 960 cm squared', 1], ['(c) total surface 1536 cm squared', 1], ['(d) volume 3072 cm cubed', 1], ['(e) cost 480 rupees', 1]], d: 3, c: 'application', t: [3], time: 420, assets: [fig] }), (Cx) => {
    Cx.assert(l === 20 && 256 + 144 === 400 && lsa === 960 && tsa === 1536 && 24 * 24 === 576 && v === 3072 && close(cost, 480), '20, 960, 1536, 3072, 480');
    Cx.model([400, 20, 960, 576, 1536, 3072, 480]);
  });
}
{
  const rr = 6.3, sa = sphereSA(rr, PI7), v = sphereV(rr, PI7), hc = hemiCSA(rr, PI7), ht = hemiTSA(rr, PI7), hv = hemiV(rr, PI7);
  Q('l05', mk.long({ stem: r`A glass paperweight in a shop in Firozabad is a solid sphere of radius $6.3$ cm. Use $\pi = \dfrac{22}{7}$. (a) Find its surface area. (b) Find its volume. A second paperweight of the same radius is a solid hemisphere. (c) Find the area of its curved surface. (d) Find its total surface area. (e) Find its volume.`, model: r`**(a)** $4\pi r^2 = 4 \times \dfrac{22}{7} \times 6.3^2 = 4 \times \dfrac{22}{7} \times 39.69 = 498.96$ cm$^2$.\n\n**(b)** $\dfrac{4}{3}\pi r^3 = \dfrac{4}{3} \times \dfrac{22}{7} \times 250.047 = 1047.816$ cm$^3$.\n\n**(c)** Curved surface of the hemisphere $= 2\pi r^2 = 249.48$ cm$^2$.\n\n**(d)** Total surface $= 3\pi r^2 = 374.22$ cm$^2$ (the flat face is $124.74$ cm$^2$).\n\n**(e)** Volume $= \dfrac{2}{3}\pi r^3 = 523.908$ cm$^3$, half of the sphere.`, sol: 'Sphere formulas, then the hemisphere formulas.', scheme: [['(a) surface 498.96 cm squared', 1], ['(b) volume 1047.816 cm cubed', 1], ['(c) curved surface 249.48 cm squared', 1], ['(d) total surface 374.22 cm squared', 1], ['(e) volume 523.908 cm cubed', 1]], d: 3, c: 'application', t: [4], time: 420 }), (Cx) => {
    Cx.assert(close(6.3 ** 2, 39.69) && close(6.3 ** 3, 250.047) && close(sa, 498.96, 1e-6) && close(v, 1047.816, 1e-6) && close(hc, 249.48, 1e-6) && close(ht, 374.22, 1e-6) && close(hv, 523.908, 1e-6) && close(hv * 2, v) && close(ht - hc, 124.74, 1e-6), '498.96, 1047.816, 249.48, 374.22, 523.908');
    Cx.model([39.69, 498.96, 250.047, 1047.816, 249.48, 374.22, 124.74, 523.908]);
  });
}

// =============================================================== case-based
{
  const [l, b, h] = [3, 2, 1.5], vol = cuboidV(l, b, h), area = l * b + 2 * h * (l + b), cost = area * 18;
  const fig = cuboidFig(3, 2, 1.5, { l: '3 m', b: '2 m', h: '1.5 m' }, 'A rectangular water tank 3 metres long, 2 metres broad and 1.5 metres deep, drawn not to scale. It has no top.', 'The tank: $3$ m by $2$ m by $1.5$ m, open at the top (not to scale).', 0.8);
  caseQ('c01', {
    passage: r`A rectangular water tank on the roof of a school in Coimbatore is $3$ m long, $2$ m broad and $1.5$ m deep. It is open at the top. Its inside is to be coated with waterproof paint.`,
    d: 2, c: 'application', assets: [fig],
    model: r`(a) Option (a). (b) $9000$. (c) (i) $21$ m$^2$. Or (ii) $\text{Rs } 378$.`,
    sol: r`(a) An open tank has a base and four walls. (b) Volume $= 3 \times 2 \times 1.5 = 9$ m$^3 = 9000$ litres. (c) (i) Base $= 3 \times 2 = 6$ m$^2$ and four walls $= 2 \times 1.5 \times (3 + 2) = 15$ m$^2$, so the area is $6 + 15 = 21$ m$^2$. (ii) Cost $= 21 \times 18 = \text{Rs } 378$.`,
    children: [
      child('a', mk.mcq({ stem: 'Which surfaces of the tank need the paint on the inside?', opts: ['The base and the four walls', 'The four walls only', 'The base only', 'All six faces'], key: 'a', sol: 'The tank has no top, so only the base and the four walls form its inside surface.', d: 1, c: 'understanding', t: [1], time: 45 })),
      child('b', mk.num({ stem: 'How many litres of water does the tank hold when it is full?', value: 9000, sol: r`Volume $= 3 \times 2 \times 1.5 = 9$ m$^3$, and $1$ m$^3 = 1000$ litres, so the tank holds $9 \times 1000 = 9000$ litres.`, scheme: [['Volume 9 m cubed', 0.5], ['9000 litres', 0.5]], d: 2, c: 'application', t: [1], time: 75 })),
      child('c', mk.short({ marks: 2, stem: r`**(i)** Find the area of the inside surface to be coated.`, model: r`Base $= 3 \times 2 = 6$ m$^2$. Four walls $= 2 \times 1.5 \times (3 + 2) = 15$ m$^2$. Total $= 6 + 15 = 21$ m$^2$.`, sol: 'Base plus four walls.', scheme: [['Base 6 and walls 15', 1], ['21 m squared', 1]], d: 2, c: 'application', t: [1], time: 90 }), [
        mk.short({ marks: 2, stem: r`**(ii)** The paint costs $\text{Rs } 18$ per m$^2$. Find the cost of coating the inside.`, model: r`The area is $21$ m$^2$, so the cost is $21 \times 18 = \text{Rs } 378$.`, sol: 'Area times the rate.', scheme: [['Area 21 m squared', 1], ['21 x 18 = 378 rupees', 1]], d: 2, c: 'application', t: [1], time: 90 }),
      ]),
    ],
  }, (Cx) => {
    Cx.child('a').which(['base+walls', 'walls', 'base', 'all'], 'base+walls');
    Cx.child('b').val(vol * 1000);
    Cx.child('c').assert(close(area, 21) && l * b === 6 && close(2 * h * (l + b), 15), '21');
    Cx.child('c').model([6, 15, 21]);
    Cx.child('cii').assert(close(cost, 378), '378');
    Cx.child('cii').model([21, 378]);
  });
}
{
  const rr = 3.5, h = 20, v = cylV(rr, h, PI7), label = cylCSA(rr, h, PI7), tsa = cylTSA(rr, h, PI7);
  const fig = cylFig(3.5, 20, { r: '3.5 cm', h: '20 cm' }, 'A cylindrical steel water bottle of radius 3.5 centimetres and height 20 centimetres, drawn not to scale. The dashed line is the height and the short segment on the top is the radius.', 'A bottle: $r = 3.5$ cm, $h = 20$ cm (not to scale).', 0.5);
  caseQ('c02', {
    passage: r`A steel water bottle sold in a shop in Ahmedabad is a closed cylinder of radius $3.5$ cm and height $20$ cm. A paper label is wrapped once round its curved surface. Use $\pi = \dfrac{22}{7}$.`,
    d: 2, c: 'application', assets: [fig],
    model: r`(a) Option (a). (b) $770$. (c) (i) $440$ cm$^2$. Or (ii) $517$ cm$^2$.`,
    sol: r`(a) The label covers the curved surface, $2\pi r h$. (b) Volume $= \dfrac{22}{7} \times 3.5^2 \times 20 = 770$ cm$^3$. (c) (i) Label $= 2 \times \dfrac{22}{7} \times 3.5 \times 20 = 440$ cm$^2$. (ii) Total surface $= 2 \times \dfrac{22}{7} \times 3.5 \times (3.5 + 20) = 517$ cm$^2$.`,
    children: [
      child('a', mk.mcq({ stem: 'The area of the label is given by', opts: [r`$2\pi r h$`, r`$\pi r^2 h$`, r`$2\pi r(r + h)$`, r`$\pi r^2$`], key: 'a', sol: r`The label covers only the curved surface of the cylinder, whose area is $2\pi r h$. The formula $\pi r^2 h$ is the volume, and $2\pi r(r + h)$ includes the two circular ends.`, d: 1, c: 'understanding', t: [2], time: 60 })),
      child('b', mk.num({ stem: 'Find the volume of the bottle in cm$^3$.', value: 770, sol: r`Volume $= \pi r^2 h = \dfrac{22}{7} \times 3.5^2 \times 20 = \dfrac{22}{7} \times 12.25 \times 20 = 770$ cm$^3$.`, scheme: [['pi r squared h with r = 3.5', 0.5], ['770 cm cubed', 0.5]], d: 2, c: 'application', t: [2], time: 75 })),
      child('c', mk.short({ marks: 2, stem: r`**(i)** Find the area of the label.`, model: r`Label $= 2\pi r h = 2 \times \dfrac{22}{7} \times 3.5 \times 20 = 440$ cm$^2$.`, sol: 'Curved surface 2 pi r h.', scheme: [['Formula 2 pi r h', 1], ['440 cm squared', 1]], d: 2, c: 'application', t: [2], time: 90 }), [
        mk.short({ marks: 2, stem: r`**(ii)** Find the total outer surface area of the closed bottle.`, model: r`Total surface $= 2\pi r(r + h) = 2 \times \dfrac{22}{7} \times 3.5 \times 23.5 = 517$ cm$^2$.`, sol: 'Total surface of a closed cylinder.', scheme: [['Formula 2 pi r (r + h) with r + h = 23.5', 1], ['517 cm squared', 1]], d: 2, c: 'application', t: [2], time: 90 }),
      ]),
    ],
  }, (Cx) => {
    Cx.child('a').which([label, v, tsa, PI7 * rr * rr], cylCSA(rr, h, PI7));
    Cx.child('b').val(v);
    Cx.child('c').assert(close(label, 440), '440');
    Cx.child('c').model([440]);
    Cx.child('cii').assert(close(tsa, 517) && close(rr + h, 23.5), '517');
    Cx.child('cii').model([23.5, 517]);
  });
}
{
  const a = 6, h = 4, l = sqSlant(a, h), v = pyrV(a * a, h), lsa = sqPyrLSA(a, l), tsa = sqPyrTSA(a, l);
  const fig = sqPyrFig(6, 4, { a: '6 cm', h: '4 cm', l: null, pts: true }, 'A glass paperweight in the shape of a square pyramid with a base of side 6 centimetres and a height of 4 centimetres, drawn not to scale. The dashed line VO is the height and M is the mid-point of a base edge.', 'A paperweight: base $6$ cm, height $4$ cm (not to scale).', 0.8);
  caseQ('c03', {
    passage: r`A glass paperweight sold at a gift shop in Agra is a square pyramid with a base of side $6$ cm and a height of $4$ cm.`,
    d: 3, c: 'application', assets: [fig],
    model: r`(a) Option (a). (b) $48$. (c) (i) $60$ cm$^2$. Or (ii) $96$ cm$^2$.`,
    sol: r`(a) The half side is $3$ cm, so $l = \sqrt{4^2 + 3^2} = 5$ cm. (b) Volume $= \dfrac{1}{3} \times 36 \times 4 = 48$ cm$^3$. (c) (i) Lateral surface $= 4 \times \dfrac{1}{2} \times 6 \times 5 = 60$ cm$^2$. (ii) Total surface $= 36 + 60 = 96$ cm$^2$.`,
    children: [
      child('a', mk.mcq({ stem: 'The slant height of a triangular face is', opts: [r`$5$ cm`, r`$7$ cm`, r`$10$ cm`, r`$4.5$ cm`], key: 'a', sol: r`The height $4$ and the half side $3$ form a right-angled triangle with the slant height, so $l = \sqrt{16 + 9} = 5$ cm. The value $7 = 4 + 3$ adds instead of using Pythagoras.`, d: 2, c: 'application', t: [3], time: 75 })),
      child('b', mk.num({ stem: 'Find the volume of the paperweight in cm$^3$.', value: 48, sol: r`Base area $= 6 \times 6 = 36$ cm$^2$, so the volume is $\dfrac{1}{3} \times 36 \times 4 = 48$ cm$^3$.`, scheme: [['Base area 36', 0.5], ['Volume 48 cm cubed', 0.5]], d: 2, c: 'application', t: [3], time: 75 })),
      child('c', mk.short({ marks: 2, stem: r`**(i)** Find the lateral surface area of the paperweight.`, model: r`Each face has area $\dfrac{1}{2} \times 6 \times 5 = 15$ cm$^2$. The four faces have area $4 \times 15 = 60$ cm$^2$.`, sol: 'Four triangular faces.', scheme: [['One face 15 cm squared', 1], ['Four faces 60 cm squared', 1]], d: 2, c: 'application', t: [3], time: 90 }), [
        mk.short({ marks: 2, stem: r`**(ii)** Find the total surface area of the paperweight.`, model: r`The base has area $6 \times 6 = 36$ cm$^2$ and the lateral surface is $60$ cm$^2$, so the total is $36 + 60 = 96$ cm$^2$.`, sol: 'Base plus lateral surface.', scheme: [['Base 36 and lateral 60', 1], ['Total 96 cm squared', 1]], d: 2, c: 'application', t: [3], time: 90 }),
      ]),
    ],
  }, (Cx) => {
    Cx.child('a').which([l, 4 + 3, 10, 4.5], 5);
    Cx.child('b').val(v);
    Cx.child('c').assert(close(lsa, 60) && 0.5 * 6 * 5 === 15, '60');
    Cx.child('c').model([15, 60]);
    Cx.child('cii').assert(close(tsa, 96), '96');
    Cx.child('cii').model([36, 60, 96]);
  });
}
{
  const rr = 8.4, v = hemiV(rr, PI7), csa = hemiCSA(rr, PI7), cost = csa * 0.5;
  const fig = hemiFig(8.4, '8.4 cm', 'A hemispherical steel vessel of inner radius 8.4 centimetres, drawn not to scale, with its dashed radius.', 'A vessel: inner radius $8.4$ cm (not to scale).', 0.8);
  caseQ('c04', {
    passage: r`A tea stall in Kolkata uses a hemispherical steel vessel with an inner radius of $8.4$ cm. Its inside is to be tin-plated. Use $\pi = \dfrac{22}{7}$.`,
    d: 3, c: 'application', assets: [fig],
    model: r`(a) Option (a). (b) $1241.856$. (c) (i) $443.52$ cm$^2$. Or (ii) $\text{Rs } 221.76$.`,
    sol: r`(a) The inside of the vessel is a curved surface, $2\pi r^2$. (b) Volume $= \dfrac{2}{3} \times \dfrac{22}{7} \times 8.4^3 = \dfrac{2}{3} \times \dfrac{22}{7} \times 592.704 = 1241.856$ cm$^3$. (c) (i) Area $= 2 \times \dfrac{22}{7} \times 8.4^2 = 2 \times \dfrac{22}{7} \times 70.56 = 443.52$ cm$^2$. (ii) Cost $= 443.52 \times 0.50 = \text{Rs } 221.76$.`,
    children: [
      child('a', mk.mcq({ stem: 'The area of the inner surface to be plated is given by', opts: [r`$2\pi r^2$`, r`$3\pi r^2$`, r`$4\pi r^2$`, r`$\dfrac{2}{3}\pi r^3$`], key: 'a', sol: r`The inside of an open vessel is the curved surface of a hemisphere only, $2\pi r^2$. The formula $3\pi r^2$ would add a flat face that the vessel does not have, and $\dfrac{2}{3}\pi r^3$ is the volume.`, d: 2, c: 'understanding', t: [4], time: 60 })),
      child('b', mk.num({ stem: 'Find the capacity of the vessel in cm$^3$.', value: 1241.856, sol: r`Volume $= \dfrac{2}{3}\pi r^3 = \dfrac{2}{3} \times \dfrac{22}{7} \times 8.4^3 = 1241.856$ cm$^3$, since $8.4^3 = 592.704$.`, scheme: [['Volume formula with 8.4 cubed = 592.704', 0.5], ['1241.856 cm cubed', 0.5]], d: 3, c: 'application', t: [4], time: 105 })),
      child('c', mk.short({ marks: 2, stem: r`**(i)** Find the area of the inner surface.`, model: r`Area $= 2\pi r^2 = 2 \times \dfrac{22}{7} \times 8.4^2 = 2 \times \dfrac{22}{7} \times 70.56 = 443.52$ cm$^2$.`, sol: 'Curved surface 2 pi r squared.', scheme: [['Formula with 8.4 squared = 70.56', 1], ['443.52 cm squared', 1]], d: 2, c: 'application', t: [4], time: 90 }), [
        mk.short({ marks: 2, stem: r`**(ii)** Tin-plating costs $\text{Rs } 0.50$ per cm$^2$. Find the cost of plating the inside.`, model: r`The area is $443.52$ cm$^2$, so the cost is $443.52 \times 0.50 = \text{Rs } 221.76$.`, sol: 'Area times the rate.', scheme: [['Area 443.52', 1], ['Cost 221.76 rupees', 1]], d: 2, c: 'application', t: [4], time: 90 }),
      ]),
    ],
  }, (Cx) => {
    Cx.child('a').which([2 * PI7 * rr * rr, 3 * PI7 * rr * rr, 4 * PI7 * rr * rr, (2 / 3) * PI7 * rr ** 3], csa);
    Cx.child('b').val(rd(v, 9));
    Cx.child('c').assert(close(8.4 ** 2, 70.56) && close(csa, 443.52, 1e-6), '443.52');
    Cx.child('c').model([70.56, 443.52]);
    Cx.child('cii').assert(close(cost, 221.76, 1e-6), '221.76');
    Cx.child('cii').model([443.52, 221.76]);
  });
}
void must; void cuboidTSA; void cubeTSA; void cubeV; void coneTSA; void coneV; void sphereSA; void sphereV; void hemiTSA; void hemiV; void cylTSA;
