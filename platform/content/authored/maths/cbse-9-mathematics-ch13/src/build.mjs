// Build CBSE 9 Mathematics ch13 Surface Area and Volume. Run from platform/:
//   npx tsx content/_stage/maths/cbse-9-mathematics-ch13/src/build.mjs
// Every figure is drawn from computed points (figs.mjs); every number in a table or worked example is computed with the stated value
// of pi and asserted with the formulas of h.mjs (and, for the pyramids, from the 3D coordinates in figs.mjs).
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, topic, deck, sl, table, flow, build, chapterTests } from './lib.mjs';
import { r, must, close, rd, PI7, PI314, cuboidTSA, cuboidLSA, cuboidV, cubeTSA, cubeLSA, cubeV, cylCSA, cylTSA, cylV, slant, coneCSA, coneTSA, coneV, sqSlant, sqPyrLSA, sqPyrTSA, pyrV, sphereSA, sphereV, hemiCSA, hemiTSA, hemiV } from './h.mjs';
import { fCuboid, fCube, fCyl, fCone, fSqPyr, fSphere, fHemi, fTank, fDrum, fCylNet, fConeNet, fTent, fShikhara, fTriPyr, fPyrCube, fLadoo, fDome, fKatori } from './figs.mjs';

setUnit('cbse-9-mathematics-ch13', 'claude-sonnet-5-5 (writer); reviewed by claude-opus-5-5 (subject-producer)');
await import('./questions.mjs');
await import('./questions2.mjs');
await import('./questions3.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ================================================================ tables, deck 1
must(cuboidLSA(8, 5, 4) === 104 && cuboidTSA(8, 5, 4) === 184 && cuboidV(8, 5, 4) === 160 && cubeLSA(5) === 100 && cubeTSA(5) === 150 && cubeV(5) === 125, 'cuboid and cube table');
const tCuboid = table(['Solid', 'Lateral surface area', 'Total surface area', 'Volume'], [
  [r`Cuboid $l \times b \times h$`, r`$2h(l + b)$`, r`$2(lb + bh + hl)$`, r`$lbh$`],
  [r`Cube of edge $a$`, r`$4a^2$`, r`$6a^2$`, r`$a^3$`],
  [r`Cuboid $8 \times 5 \times 4$ cm`, r`$2 \times 4 \times 13 = 104$ cm$^2$`, r`$2(40 + 20 + 32) = 184$ cm$^2$`, r`$8 \times 5 \times 4 = 160$ cm$^3$`],
  [r`Cube of edge $5$ cm`, r`$4 \times 25 = 100$ cm$^2$`, r`$6 \times 25 = 150$ cm$^2$`, r`$5^3 = 125$ cm$^3$`],
], 'Table of formulas. A cuboid of length l, breadth b and height h has lateral surface area 2 h times l plus b, total surface area 2 times lb plus bh plus hl, and volume l b h. A cube of edge a has 4 a squared, 6 a squared and a cubed. Examples: a cuboid 8 by 5 by 4 centimetres has 104, 184 square centimetres and 160 cubic centimetres; a cube of edge 5 centimetres has 100, 150 and 125.', 'Surface areas are in square units; volume is in cubic units.');
must(100 ** 2 === 10000 && 100 ** 3 === 1000000 && 1000000 / 1000 === 1000, 'unit conversions');
const tUnits = table(['Quantity', 'Units', 'Useful fact'], [
  ['Length', 'cm, m', r`$1$ m $= 100$ cm`],
  ['Area', r`cm$^2$, m$^2$`, r`$1$ m$^2$ $= 10000$ cm$^2$`],
  ['Volume', r`cm$^3$, m$^3$`, r`$1$ m$^3$ $= 1000000$ cm$^3$`],
  ['Capacity', 'litre (L)', r`$1$ L $= 1000$ cm$^3$ and $1$ m$^3$ $= 1000$ L`],
], 'Table of units: length in centimetres or metres, with 1 metre equal to 100 centimetres; area in square centimetres or square metres, with 1 square metre equal to 10000 square centimetres; volume in cubic centimetres or cubic metres, with 1 cubic metre equal to 1000000 cubic centimetres; capacity in litres, with 1 litre equal to 1000 cubic centimetres and 1 cubic metre equal to 1000 litres.', 'Change every length to the same unit before you multiply.');
must(close(4 * 2.5 * 1.8, 18) && 18 * 1000 === 18000 && close(4 * 2.5, 10) && close(2 * 1.8 * (4 + 2.5), 23.4) && close(10 + 23.4, 33.4) && close(33.4 * 25, 835), 'WE1 tank');
const tWE1 = table(['Step', 'Working', 'Result'], [
  ['Volume (capacity)', r`$4 \times 2.5 \times 1.8$`, r`$18$ m$^3$`],
  ['In litres', r`$18 \times 1000$`, r`$18000$ L`],
  ['Base', r`$4 \times 2.5$`, r`$10$ m$^2$`],
  ['Four walls', r`$2 \times 1.8 \times (4 + 2.5)$`, r`$23.4$ m$^2$`],
  ['Inside of the open tank', r`$10 + 23.4$`, r`$33.4$ m$^2$`],
  [r`Painting at $\text{Rs } 25$ per m$^2$`, r`$33.4 \times 25$`, r`$\text{Rs } 835$`],
], 'Table: a tank 4 metres long, 2.5 metres broad and 1.8 metres deep holds 4 times 2.5 times 1.8, which is 18 cubic metres or 18000 litres. Its base is 10 square metres and its four walls 23.4 square metres, so the inside of the open tank is 33.4 square metres. Painting at 25 rupees per square metre costs 835 rupees.', 'An open tank has no top: base plus four walls.');
must(cylCSA(14, 3, PI7) === 264 && close(2 * PI7 * 14 * 14, 1232) && 264 + 1232 === 1496 && close(cylTSA(14, 3, PI7), 1496) && close(cylV(14, 3, PI7), 1848), 'cylinder table');
const tCyl = table(['Quantity', 'Formula', r`$r = 14$ cm, $h = 3$ cm, $\pi = \dfrac{22}{7}$`], [
  ['Curved surface area', r`$2\pi r h$`, r`$2 \times \dfrac{22}{7} \times 14 \times 3 = 264$ cm$^2$`],
  ['Area of the two circular ends', r`$2\pi r^2$`, r`$2 \times \dfrac{22}{7} \times 14^2 = 1232$ cm$^2$`],
  ['Total surface area', r`$2\pi r(r + h)$`, r`$264 + 1232 = 1496$ cm$^2$`],
  ['Volume', r`$\pi r^2 h$`, r`$\dfrac{22}{7} \times 14^2 \times 3 = 1848$ cm$^3$`],
], 'Table of cylinder formulas with radius 14 centimetres, height 3 centimetres and pi equal to 22 over 7: curved surface area 2 pi r h is 264, the two circular ends 2 pi r squared are 1232, the total surface area 2 pi r times r plus h is 1496 square centimetres, and the volume pi r squared h is 1848 cubic centimetres.', 'A closed cylinder has a curved surface and two circular ends.');
must(close(cylCSA(35, 90, PI7), 19800) && close(2 * PI7 * 35 * 35, 7700) && 19800 + 7700 === 27500 && close(cylV(35, 90, PI7), 346500) && 346500 / 1000 === 346.5, 'drum');
const tDrum = table(['Step', 'Working', 'Result'], [
  ['Curved surface', r`$2 \times \dfrac{22}{7} \times 35 \times 90$`, r`$19800$ cm$^2$`],
  ['Two circular ends', r`$2 \times \dfrac{22}{7} \times 35^2$`, r`$7700$ cm$^2$`],
  ['Total surface', r`$19800 + 7700$`, r`$27500$ cm$^2$`],
  ['Volume', r`$\dfrac{22}{7} \times 35^2 \times 90$`, r`$346500$ cm$^3$`],
  ['Capacity in litres', r`$346500 \div 1000$`, r`$346.5$ L`],
], 'Table: an oil drum of radius 35 centimetres and height 90 centimetres has curved surface 19800 square centimetres, two ends of 7700 square centimetres, total surface 27500 square centimetres and volume 346500 cubic centimetres, which is 346.5 litres.', 'Divide cubic centimetres by $1000$ to get litres.');
must(slant(5, 12) === 13 && close(coneCSA(5, 13, PI314), 204.1) && close(PI314 * 25, 78.5) && close(coneTSA(5, 13, PI314), 282.6) && close(204.1 + 78.5, 282.6) && close(coneV(5, 12, PI314), 314), 'cone table');
const tCone = table(['Quantity', 'Formula', r`$r = 5$ cm, $h = 12$ cm, $\pi = 3.14$`], [
  ['Slant height', r`$l = \sqrt{r^2 + h^2}$`, r`$\sqrt{25 + 144} = 13$ cm`],
  ['Curved surface area', r`$\pi r l$`, r`$3.14 \times 5 \times 13 = 204.1$ cm$^2$`],
  ['Total surface area', r`$\pi r(r + l)$`, r`$204.1 + 3.14 \times 25 = 282.6$ cm$^2$`],
  ['Volume', r`$\dfrac{1}{3}\pi r^2 h$`, r`$\dfrac{1}{3} \times 3.14 \times 25 \times 12 = 314$ cm$^3$`],
], 'Table of cone formulas with radius 5 centimetres, height 12 centimetres and pi equal to 3.14: slant height 13 centimetres, curved surface area 204.1, total surface area 282.6 square centimetres and volume 314 cubic centimetres.', 'The volume of a cone is one third of the volume of the cylinder with the same base and height.');
must(slant(9, 12) === 15 && close(coneCSA(9, 15, PI314), 423.9) && close(423.9 * 80, 33912) && close(coneV(9, 12, PI314), 1017.36), 'tent');
const tTent = table(['Step', 'Working', 'Result'], [
  ['Slant height', r`$\sqrt{9^2 + 12^2} = \sqrt{225}$`, r`$15$ m`],
  ['Canvas (curved surface)', r`$3.14 \times 9 \times 15$`, r`$423.9$ m$^2$`],
  [r`Cost at $\text{Rs } 80$ per m$^2$`, r`$423.9 \times 80$`, r`$\text{Rs } 33912$`],
  ['Air inside (volume)', r`$\dfrac{1}{3} \times 3.14 \times 9^2 \times 12$`, r`$1017.36$ m$^3$`],
], 'Table: a conical tent of radius 9 metres and height 12 metres has slant height 15 metres, canvas of 423.9 square metres costing 33912 rupees at 80 rupees per square metre, and a volume of 1017.36 cubic metres.', 'Canvas is the curved surface only; the floor is not covered.');
const goal1 = flow('LR', [['a', 'Cuboids and cubes'], ['b', 'Units of volume'], ['c', 'Cylinders'], ['d', 'Cones']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow of Part 1: cuboids and cubes, units of volume and capacity, right circular cylinders, and right circular cones.', 'Part 1 road map.');
const sum1 = flow('LR', [['a', 'Cuboid: 2(lb + bh + hl), lbh'], ['b', 'Cylinder: 2 pi r (r + h), pi r squared h'], ['c', 'Cone: pi r (r + l), one third pi r squared h']], [['a', 'b'], ['b', 'c']], 'Summary flow of Part 1: cuboid total surface area and volume, cylinder total surface area and volume, cone total surface area and volume.', 'Three families of Part 1.');

// ================================================================ deck 1
const d1 = deck({
  part: 1,
  title: 'Surface Area and Volume: Part 1, cuboids, cubes, cylinders and cones',
  goals: ['Find the lateral surface area, total surface area and volume of a cuboid and a cube', 'Convert between cubic units and litres', 'Find the curved surface area, total surface area and volume of a cylinder and a cone', 'Use the slant height of a cone, l equal to the square root of r squared plus h squared'],
  slides: [
    sl('title', 'Tanks, drums and tents', { b: r`The space inside a solid is its **volume**; the size of its outside is its **surface area**. A water tank on a roof is a **cuboid**.`, v: fTank, n: `A water tank on a roof, an oil drum in a shop, a tent at a fair. Each is a solid. The space inside a solid is its volume, and the size of its outside is its surface area. In this part we find both for cuboids, cubes, cylinders and cones, and we always say which units we use.` }),
    sl('concept', 'What you will be able to do', { ul: ['Find **surface areas** and **volumes** of cuboids and cubes', 'Change **cubic units to litres**', 'Find the **surface area** and **volume** of a cylinder', 'Use the **slant height** of a cone'], v: goal1, n: `First we look at cuboids and cubes, and at how to change cubic units into litres. Then we study the cylinder, whose curved surface opens out into a rectangle. Last comes the cone, where the slant height joins the radius and the height in a right angled triangle.` }),
    sl('diagram', 'The cuboid', { b: r`A **cuboid** has $6$ rectangular faces, $12$ edges and $8$ corners. The **lateral surface** is the four side walls. The **total surface** also has the top and the bottom.`, v: fCuboid, n: `A cuboid has six faces, and each face is a rectangle. Opposite faces are equal, so there are three pairs. The four side walls make the lateral surface. If we add the floor and the ceiling, we get the total surface. Hidden edges are drawn as dashed lines.` }),
    sl('concept', 'Formulas for the cuboid and the cube', { b: r`Add the areas of the three pairs of faces: $lb$, $bh$ and $hl$, each twice. A **cube** is a cuboid with $l = b = h = a$.`, v: tCuboid, n: `The three pairs of faces have areas l times b, b times h and h times l. Add them and double the sum to get the total surface area. The four walls alone give two times h times l plus b. The volume is length times breadth times height. A cube of edge a has six equal faces, so its surface area is six a squared.` }),
    sl('example', 'Worked example 1: a water tank', { b: r`An open tank is $4$ m long, $2.5$ m broad and $1.8$ m deep. Find its capacity in litres, and the cost of painting its inside at $\text{Rs } 25$ per m$^2$.`, ul: [r`**Volume —** $4 \times 2.5 \times 1.8 = 18$ m$^3$, which is $18000$ L`, r`**Inside —** the base $10$ m$^2$ and four walls $23.4$ m$^2$ make $33.4$ m$^2$`, r`**Cost —** $33.4 \times 25 = \text{Rs } 835$`], v: tWE1, n: `The volume is four times two point five times one point eight, which is eighteen cubic metres. One cubic metre holds one thousand litres, so the tank holds eighteen thousand litres. The tank has no lid, so we paint the base and the four walls only. That is thirty-three point four square metres, and at twenty-five rupees each the cost is eight hundred thirty-five rupees.` }),
    sl('diagram', 'The cube', { b: r`All edges of a cube are equal to $a$. Its **lateral surface** is $4a^2$, its **total surface** is $6a^2$ and its volume is $a^3$.`, v: fCube, n: `In a cube all twelve edges are equal, and all six faces are equal squares. If the edge is a, each face has area a squared. The four walls have area four a squared, all six faces have area six a squared, and the volume is a times a times a.` }),
    sl('concept', 'Units of area, volume and capacity', { b: r`Area is in **square** units and volume in **cubic** units. Convert every length to one unit **before** multiplying.`, v: tUnits, n: `Lengths are measured in centimetres or metres. Areas are in square units and volumes in cubic units. One metre is one hundred centimetres, so one cubic metre is one million cubic centimetres. The litre is a unit of capacity, and one litre is one thousand cubic centimetres. So one cubic metre holds one thousand litres.` }),
    sl('check', 'Quick check: a sweet box', { b: 'A cubical box of sweets has an edge of fifteen centimetres. What is its total surface area?', v: fCube, chk: 'm01', n: `A cube has six equal faces. Find the area of one face first.` }),
    sl('diagram', 'The right circular cylinder', { b: r`A **cylinder** has two equal circular ends of radius $r$ and a curved surface of height $h$. The line joining the centres of the ends is its **axis** and has length $h$.`, v: fCyl, n: `A drum, a pillar and a tin are cylinders. A right circular cylinder has two equal circles as its ends. The line joining the centres of the two circles is straight up, and its length is the height h. The side of the cylinder is a curved surface.` }),
    sl('diagram', 'Opening out the curved surface', { b: r`Cut the curved surface along its height and flatten it: it is a **rectangle** with length $2\pi r$ and width $h$. So the curved surface area is $2\pi r \times h$.`, v: fCylNet, n: `Cut the side of a tin along its height and open it flat. It becomes a rectangle. The long side of the rectangle is the distance round the circle, which is two pi r. The short side is the height of the cylinder. So the curved surface area is two pi r times h. The two circles give two pi r squared more.` }),
    sl('concept', 'Formulas for the cylinder', { b: r`State the value of $\pi$: $\dfrac{22}{7}$ if $r$ is a multiple of $7$, otherwise $3.14$.`, v: tCyl, n: `The curved surface area is two pi r h. The two circular ends add two pi r squared. Together the total surface area is two pi r times r plus h. The volume of a cylinder is the area of the base, pi r squared, times the height. Always say which value of pi you use.` }),
    sl('example', 'Worked example 2: an oil drum', { b: r`A closed oil drum has radius $35$ cm and height $90$ cm. Find its curved surface, total surface and capacity in litres. Use $\pi = \dfrac{22}{7}$.`, ul: [r`**Curved surface —** $2 \times \dfrac{22}{7} \times 35 \times 90 = 19800$ cm$^2$`, r`**Total surface —** $19800 + 7700 = 27500$ cm$^2$`, r`**Capacity —** $\dfrac{22}{7} \times 35^2 \times 90 = 346500$ cm$^3 = 346.5$ L`], v: fDrum, n: `The curved surface is two times twenty-two sevenths times thirty-five times ninety, which is nineteen thousand eight hundred square centimetres. The two circular ends add seven thousand seven hundred, so the total surface is twenty-seven thousand five hundred. The volume is three hundred forty-six thousand five hundred cubic centimetres. Divide by one thousand to get three hundred forty-six point five litres.` }),
    sl('check', 'Quick check: a garden roller', { b: 'A garden roller is a cylinder of radius twenty-one centimetres and length one hundred centimetres. What area does it cover in ten turns?', v: fCyl, chk: 'm02', n: `In one turn it covers its curved surface once.` }),
    sl('diagram', 'The right circular cone', { b: r`A **cone** has a circular base of radius $r$ and an apex at height $h$ above the centre. The sloping edge from the apex to the rim is the **slant height** $l$, and $l^2 = r^2 + h^2$.`, v: fCone, n: `A cone has one circular base and a pointed top called the apex. The height h goes straight down from the apex to the centre of the base. The slant height l runs along the slope to the rim. The height, the radius and the slant height make a right angled triangle, so l squared is r squared plus h squared.` }),
    sl('diagram', 'Opening out a cone', { b: r`Cut a cone along its slant height: its curved surface becomes a **sector** of radius $l$ whose arc is the circumference $2\pi r$ of the base. For $r = 6$, $l = 10$: the sector is $\dfrac{216}{360}$ of a circle of radius $10$.`, v: fConeNet, n: `Cut a paper cone along its slope and open it out. We get a sector of a circle whose radius is the slant height. Its arc is the same as the distance round the base of the cone. The sector is a fraction of the big circle, and that fraction times pi l squared works out to pi r l, the curved surface area of the cone.` }),
    sl('concept', 'Formulas for the cone', { b: r`Find $l$ first when $h$ is given. The cone takes **one third** of the volume of the cylinder with the same base and height.`, v: tCone, n: `The curved surface area of a cone is pi r l. Add the base, pi r squared, to get the total surface area, pi r times r plus l. The volume is one third times pi r squared times h. Notice that the volume uses the height, but the surface area uses the slant height. Find the slant height first if only the height is given.` }),
    sl('example', 'Worked example 3: a conical tent', { b: r`A conical tent has base radius $9$ m and height $12$ m. Find the canvas needed, its cost at $\text{Rs } 80$ per m$^2$, and the air inside. Use $\pi = 3.14$.`, ul: [r`**Slant height —** $l = \sqrt{81 + 144} = 15$ m`, r`**Canvas —** $3.14 \times 9 \times 15 = 423.9$ m$^2$, costing $423.9 \times 80 = \text{Rs } 33912$`, r`**Air —** $\dfrac{1}{3} \times 3.14 \times 9^2 \times 12 = 1017.36$ m$^3$`], v: fTent, n: `First find the slant height. Nine squared plus twelve squared is two hundred twenty-five, whose square root is fifteen. The canvas is the curved surface, three point one four times nine times fifteen, which is four hundred twenty-three point nine square metres. At eighty rupees each that costs thirty-three thousand nine hundred twelve rupees. The air inside is the volume, one thousand seventeen point three six cubic metres.` }),
    sl('check', 'Quick check: a heap of grain', { b: 'A heap of wheat in a mandi is a cone of base radius three and a half metres and height six metres. How much wheat is in the heap?', v: fCone, chk: 'm03', n: `Use one third of the base area times the height.` }),
    sl('summary', 'Summary', { ul: [r`Cuboid: total surface $2(lb + bh + hl)$, lateral $2h(l + b)$, volume $lbh$; cube: $6a^2$, $4a^2$, $a^3$`, r`$1$ m$^3 = 1000$ L and $1$ L $= 1000$ cm$^3$`, r`Cylinder: curved $2\pi rh$, total $2\pi r(r + h)$, volume $\pi r^2 h$`, r`Cone: $l = \sqrt{r^2 + h^2}$, curved $\pi rl$, total $\pi r(r + l)$, volume $\dfrac{1}{3}\pi r^2 h$`], v: sum1, n: `To sum up. For a cuboid, add the three pairs of faces and double. A cube of edge a has surface six a squared and volume a cubed. For a cylinder the curved surface is two pi r h and the volume is pi r squared h. For a cone the curved surface is pi r l and the volume is one third of pi r squared h. Always state the value of pi, and give the correct units.` }),
    sl('exam-tips', 'Exam tips: how marks are awarded', { ul: ['**Surface area and volume (2–3 marks):** formula, value of $\\pi$, substitution, answer with the unit', '**Cones:** find the slant height $l$ first when $h$ is given', '**Mistake:** using the height $h$ in place of the slant height $l$ in $\\pi r l$', '**Mistake:** forgetting to convert cm$^3$ to litres or the lengths to one unit'], n: `For solid problems, write the formula, say which value of pi you use, show the substitution, and give the unit. For a cone, find the slant height first. Two common slips are using the height in place of the slant height in the curved surface area, and forgetting to change cubic centimetres to litres.` }),
  ],
});

// ================================================================ tables, deck 2
must(sqSlant(16, 15) === 17 && sqSlant(24, 16) === 20 && sqSlant(30, 8) === 17 && sqSlant(10, 12) === 13, 'pyramid slants');
const tSlant = table([r`Base side $a$`, r`Height $h$`, r`Half side $\dfrac{a}{2}$`, r`Slant height $l = \sqrt{h^2 + \left(\dfrac{a}{2}\right)^2}$`], [
  ['$16$ cm', '$15$ cm', '$8$ cm', r`$\sqrt{225 + 64} = 17$ cm`],
  ['$24$ cm', '$16$ cm', '$12$ cm', r`$\sqrt{256 + 144} = 20$ cm`],
  ['$30$ cm', '$8$ cm', '$15$ cm', r`$\sqrt{64 + 225} = 17$ cm`],
  ['$10$ cm', '$12$ cm', '$5$ cm', r`$\sqrt{144 + 25} = 13$ cm`],
], 'Table of slant heights of square pyramids. A base of 16 centimetres and height 15 gives half side 8 and slant height 17. A base of 24 and height 16 gives slant height 20. A base of 30 and height 8 gives slant height 17. A base of 10 and height 12 gives slant height 13.', 'The height, the half side and the slant height make a right-angled triangle.');
must(sqPyrLSA(10, 13) === 260 && sqPyrTSA(10, 13) === 360 && pyrV(100, 12) === 400 && 4 * (0.5 * 10 * 13) === 260, 'pyramid table');
const tPyr = table(['Quantity', 'Formula', r`Square pyramid: $a = 10$, $h = 12$, $l = 13$ cm`], [
  ['Lateral surface area', r`$4 \times \dfrac{1}{2} a l = 2al$`, r`$2 \times 10 \times 13 = 260$ cm$^2$`],
  ['Area of the base', r`$a^2$`, r`$100$ cm$^2$`],
  ['Total surface area', r`$a^2 + 2al$`, r`$100 + 260 = 360$ cm$^2$`],
  ['Volume', r`$\dfrac{1}{3} \times \text{base area} \times h$`, r`$\dfrac{1}{3} \times 100 \times 12 = 400$ cm$^3$`],
], 'Table of square pyramid formulas for base side 10, height 12 and slant height 13 centimetres: lateral surface area 2 a l is 260, base area 100, total surface area 360 square centimetres, and volume one third of base area times height is 400 cubic centimetres.', 'Lateral surface area = sum of the areas of the triangular faces.');
must(0.5 * 30 * 17 === 255 && 4 * 255 === 1020 && 30 * 30 === 900 && 900 + 1020 === 1920 && (900 * 8) / 3 === 2400, 'shikhara table');
const tShik = table(['Step', 'Working', 'Result'], [
  ['Slant height', r`$\sqrt{8^2 + 15^2} = \sqrt{289}$`, r`$17$ cm`],
  ['One triangular face', r`$\dfrac{1}{2} \times 30 \times 17$`, r`$255$ cm$^2$`],
  ['Lateral surface (four faces)', r`$4 \times 255$`, r`$1020$ cm$^2$`],
  ['Base', r`$30 \times 30$`, r`$900$ cm$^2$`],
  ['Total surface', r`$900 + 1020$`, r`$1920$ cm$^2$`],
  ['Volume', r`$\dfrac{1}{3} \times 900 \times 8$`, r`$2400$ cm$^3$`],
], 'Table: a pyramid with a square base of side 30 centimetres and height 8 centimetres has slant height 17. One face has area 255 and the four faces 1020 square centimetres. With the base of 900 the total surface is 1920 square centimetres, and the volume is 2400 cubic centimetres.', 'Half the base side, $15$ cm, and the height $8$ cm give the slant height $17$ cm.');
must(0.5 * 12 * 5 === 30 && 0.5 * 16 * 5 === 40 && 0.5 * 20 * 5 === 50 && 30 + 40 + 50 === 120 && 96 + 120 === 216 && (96 * 3) / 3 === 96, 'triangular pyramid table');
const tTri = table(['Step', 'Working', 'Result'], [
  ['Base (right-angled triangle)', r`$\dfrac{1}{2} \times 12 \times 16$`, r`$96$ cm$^2$`],
  ['Face on the side $12$', r`$\dfrac{1}{2} \times 12 \times 5$`, r`$30$ cm$^2$`],
  ['Face on the side $16$', r`$\dfrac{1}{2} \times 16 \times 5$`, r`$40$ cm$^2$`],
  ['Face on the side $20$', r`$\dfrac{1}{2} \times 20 \times 5$`, r`$50$ cm$^2$`],
  ['Lateral surface', r`$30 + 40 + 50$`, r`$120$ cm$^2$`],
  ['Total surface', r`$96 + 120$`, r`$216$ cm$^2$`],
  ['Volume', r`$\dfrac{1}{3} \times 96 \times 3$`, r`$96$ cm$^3$`],
], 'Table: for the triangular pyramid with base 12, 16 and 20 centimetres, height 3 and every slant height 5, the base has area 96, the faces have areas 30, 40 and 50 so the lateral surface is 120 square centimetres, the total surface is 216 square centimetres and the volume is 96 cubic centimetres.', 'Lateral surface area = sum of the three triangular faces.');
must(cubeV(6) === 216 && pyrV(36, 6) === 72 && 3 * 72 === 216, 'cube and pyramid');
const tCubePyr = table(['Solid', 'Base area', 'Height', 'Volume'], [
  ['Cube of edge $6$ cm', r`$36$ cm$^2$`, r`$6$ cm`, r`$6^3 = 216$ cm$^3$`],
  ['One pyramid in it', r`$36$ cm$^2$`, r`$6$ cm`, r`$\dfrac{1}{3} \times 36 \times 6 = 72$ cm$^3$`],
  ['Three such pyramids', '', '', r`$3 \times 72 = 216$ cm$^3$`],
], 'Table: a cube of edge 6 centimetres has base area 36, height 6 and volume 216 cubic centimetres. A pyramid with the same base and height has volume one third of 36 times 6, which is 72. Three such pyramids together have volume 216, the volume of the cube.', 'A pyramid is one third of the cuboid with the same base and height.');
must(close(sphereSA(6, PI314), 452.16) && close(PI314 * 36, 113.04) && close(4 * 113.04, 452.16) && close(sphereV(6, PI314), 904.32), 'sphere table');
const tSphere = table(['Quantity', 'Formula', r`$r = 6$ cm, $\pi = 3.14$`], [
  ['Area of the great circle', r`$\pi r^2$`, r`$3.14 \times 36 = 113.04$ cm$^2$`],
  ['Surface area of the sphere', r`$4\pi r^2$`, r`$4 \times 113.04 = 452.16$ cm$^2$`],
  ['Volume of the sphere', r`$\dfrac{4}{3}\pi r^3$`, r`$\dfrac{4}{3} \times 3.14 \times 216 = 904.32$ cm$^3$`],
], 'Table of sphere formulas with radius 6 centimetres and pi equal to 3.14: the great circle has area 113.04, the surface area 4 pi r squared is 452.16 square centimetres, and the volume four thirds pi r cubed is 904.32 cubic centimetres.', 'The surface of a sphere is $4$ times the area of its great circle.');
must(close(sphereSA(2.1, PI7), 55.44) && close(sphereV(2.1, PI7), 38.808) && close(2.1 ** 2, 4.41) && close(2.1 ** 3, 9.261), 'ladoo');
const tLadoo = table(['Step', 'Working', 'Result'], [
  ['Surface area', r`$4 \times \dfrac{22}{7} \times 2.1^2 = 4 \times \dfrac{22}{7} \times 4.41$`, r`$55.44$ cm$^2$`],
  ['Volume', r`$\dfrac{4}{3} \times \dfrac{22}{7} \times 2.1^3 = \dfrac{4}{3} \times \dfrac{22}{7} \times 9.261$`, r`$38.808$ cm$^3$`],
], 'Table: a ladoo of radius 2.1 centimetres has surface area 4 times 22 over 7 times 4.41, which is 55.44 square centimetres, and volume four thirds times 22 over 7 times 9.261, which is 38.808 cubic centimetres.', 'Use $\\pi = \\tfrac{22}{7}$ because $2.1 = 3 \\times 0.7$ makes the working easy.');
must(close(hemiCSA(4.2, PI7), 110.88) && close(PI7 * 4.2 * 4.2, 55.44) && close(hemiTSA(4.2, PI7), 166.32) && close(110.88 + 55.44, 166.32) && close(hemiV(4.2, PI7), 155.232), 'hemisphere table');
const tHemi = table(['Quantity', 'Formula', r`$r = 4.2$ cm, $\pi = \dfrac{22}{7}$`], [
  ['Curved surface area', r`$2\pi r^2$`, r`$2 \times \dfrac{22}{7} \times 17.64 = 110.88$ cm$^2$`],
  ['Area of the flat face', r`$\pi r^2$`, r`$55.44$ cm$^2$`],
  ['Total surface area', r`$3\pi r^2$`, r`$110.88 + 55.44 = 166.32$ cm$^2$`],
  ['Volume', r`$\dfrac{2}{3}\pi r^3$`, r`$\dfrac{2}{3} \times \dfrac{22}{7} \times 74.088 = 155.232$ cm$^3$`],
], 'Table of hemisphere formulas for a katori of radius 4.2 centimetres with pi equal to 22 over 7: curved surface area 2 pi r squared is 110.88, the flat face 55.44, the total surface area 3 pi r squared is 166.32 square centimetres, and the volume two thirds pi r cubed is 155.232 cubic centimetres.', 'A solid hemisphere is half a sphere, plus its flat face.');
must(close(hemiCSA(10.5, PI7), 693) && close(693 * 40, 27720) && close(hemiV(10.5, PI7), 2425.5), 'dome');
const tDome = table(['Step', 'Working', 'Result'], [
  ['Curved surface (outside of the dome)', r`$2 \times \dfrac{22}{7} \times 10.5^2$`, r`$693$ m$^2$`],
  [r`Painting at $\text{Rs } 40$ per m$^2$`, r`$693 \times 40$`, r`$\text{Rs } 27720$`],
  ['Space inside (volume)', r`$\dfrac{2}{3} \times \dfrac{22}{7} \times 10.5^3$`, r`$2425.5$ m$^3$`],
], 'Table: a hemispherical dome of radius 10.5 metres has a curved surface of 693 square metres, which costs 27720 rupees to paint at 40 rupees per square metre, and encloses a volume of 2425.5 cubic metres.', 'The floor of a dome is not painted: use the curved surface only.');
const goal2 = flow('LR', [['a', 'Pyramids'], ['b', 'Slant heights'], ['c', 'Volume of a pyramid'], ['d', 'Spheres'], ['e', 'Hemispheres']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']], 'Flow of Part 2: pyramids, slant heights of their faces, the volume of a pyramid, spheres and hemispheres.', 'Part 2 road map.');
const sum2 = flow('LR', [['a', 'Pyramid: lateral = faces, volume = base x h / 3'], ['b', 'Sphere: 4 pi r squared, 4/3 pi r cubed'], ['c', 'Hemisphere: 2 pi r squared, 3 pi r squared, 2/3 pi r cubed']], [['a', 'b'], ['b', 'c']], 'Summary flow of Part 2: pyramid lateral surface and volume, sphere surface area and volume, hemisphere curved and total surface area and volume.', 'Three tools of Part 2.');

// ================================================================ deck 2
const d2 = deck({
  part: 2,
  title: 'Surface Area and Volume: Part 2, pyramids, spheres and hemispheres',
  goals: ['Identify square and triangular pyramids and name their parts', 'Find the lateral surface area from the slant heights of the faces', 'Use volume equal to one third of base area times height', 'Find the surface area and volume of a sphere and a hemisphere'],
  slides: [
    sl('title', 'Spires, ladoos and domes', { b: r`The spire of a temple is a **pyramid**, a ladoo is a **sphere** and a planetarium roof is a **hemisphere**.`, v: fShikhara, n: `The tall spire of a temple, called a shikhara, can be a pyramid. A ladoo is a sphere, and the roof of a planetarium is half a sphere. In this part we find the surface area and the volume of these three kinds of solid, using the same careful steps as before.` }),
    sl('concept', 'What you will be able to do', { ul: ['**Name the parts** of a square or triangular pyramid', 'Find the **lateral surface** from the slant heights', 'Use **one third of base area times height**', 'Find the area and volume of a **sphere** and a **hemisphere**'], v: goal2, n: `We begin with pyramids and learn their parts. We find the slant height of a face and use it for the lateral surface. Then we find the volume of a pyramid by comparing it with a cube. At the end we meet the sphere and the hemisphere, which have simple formulas with pi.` }),
    sl('diagram', 'The parts of a pyramid', { b: r`A pyramid has a **base**, triangular **faces** that meet at the **apex** $V$, a **height** $VO$ and, on each face, a **slant height** $l$ from the apex to the mid-point $M$ of a base edge.`, v: fSqPyr, n: `A pyramid has a flat base, and triangular faces that meet at a point called the apex. If the base is a square, we call it a square pyramid. If the base is a triangle, it is a triangular pyramid. The height drops straight down from the apex to the base. The slant height is measured along a face, from the apex to the middle of a base edge.` }),
    sl('concept', 'Finding the slant height', { b: r`The height $h$, the half side $\dfrac{a}{2}$ and the slant height $l$ form a right-angled triangle, so $l = \sqrt{h^2 + \left(\dfrac{a}{2}\right)^2}$.`, v: tSlant, n: `Look at the triangle formed by the height, half of a base edge, and the slant height. It has a right angle at the foot of the height. So by the theorem of Pythagoras, the slant height squared is the height squared plus the half side squared. The table gives four examples with whole number answers.` }),
    sl('concept', 'Surface area and volume of a square pyramid', { b: r`The four faces are equal triangles of area $\dfrac{1}{2}al$. The **volume** is $\dfrac{1}{3}$ of the base area times the height.`, v: tPyr, n: `Each triangular face has area half base times slant height. A square pyramid has four equal faces, so its lateral surface is two times a times l. Adding the square base gives the total surface. The volume is one third of the base area times the height.` }),
    sl('example', 'Worked example 1: a temple shikhara', { b: r`A model shikhara is a square pyramid with base side $30$ cm and height $8$ cm. Find its lateral surface, total surface and volume.`, ul: [r`**Slant height —** $l = \sqrt{8^2 + 15^2} = 17$ cm`, r`**Lateral surface —** $4 \times \dfrac{1}{2} \times 30 \times 17 = 1020$ cm$^2$`, r`**Total surface —** $1020 + 900 = 1920$ cm$^2$`, r`**Volume —** $\dfrac{1}{3} \times 900 \times 8 = 2400$ cm$^3$`], v: tShik, n: `The half side is fifteen and the height is eight, so the slant height is the square root of two hundred eighty-nine, which is seventeen. One face has area half times thirty times seventeen, which is two hundred fifty-five. Four faces make one thousand twenty. Add the base, nine hundred, to get one thousand nine hundred twenty. The volume is one third of nine hundred times eight, which is two thousand four hundred.` }),
    sl('diagram', 'A triangular pyramid', { b: r`A **triangular pyramid** has $4$ triangular faces: the base and three lateral faces. Here the base is a right-angled triangle $12$, $16$, $20$ and every lateral face has slant height $5$ cm.`, v: fTriPyr, n: `Here is a pyramid with a triangular base. It has four triangular faces in all, the base and three side faces. The apex is exactly above the point in the base that is equally far from all three sides, so each side face has the same slant height. To find the lateral surface, add the areas of the three side faces.` }),
    sl('example', 'Worked example 2: a triangular pyramid', { b: r`Find the lateral surface, total surface and volume of the triangular pyramid with base sides $12$, $16$, $20$ cm, height $3$ cm and slant height $5$ cm on every side face.`, ul: [r`**Faces —** $30$, $40$ and $50$ cm$^2$, so lateral surface $= 120$ cm$^2$`, r`**Base —** $\dfrac{1}{2} \times 12 \times 16 = 96$ cm$^2$, so total surface $= 216$ cm$^2$`, r`**Volume —** $\dfrac{1}{3} \times 96 \times 3 = 96$ cm$^3$`], v: tTri, n: `Each side face has a base equal to one side of the triangle, and a slant height of five. Their areas are thirty, forty and fifty, which add up to one hundred twenty. The base is a right angled triangle, with area half of twelve times sixteen, which is ninety-six. So the total surface is two hundred sixteen. The volume is one third of ninety-six times three, which is ninety-six.` }),
    sl('diagram', 'Why one third?', { b: r`Three pyramids with the same apex fit exactly in a cube, each with a face of the cube as its base. So each has volume $\dfrac{1}{3}$ of the cube: $\dfrac{1}{3} \times \text{base} \times \text{height}$. For an edge of $6$ cm: $216 \div 3 = 72 = \dfrac{1}{3} \times 36 \times 6$ cm$^3$.`, v: fPyrCube, n: `Take a cube. Pick one top corner and join it to the four corners of the bottom face. This pyramid has the same base and height as the cube. Three such pyramids, one on each face that misses the chosen corner, fill the cube. So each is one third of the cube. For an edge of six, the cube is two hundred sixteen, and each pyramid is seventy-two.` }),
    sl('check', 'Quick check: slant height', { b: 'A square pyramid has a base side of sixteen centimetres and a height of fifteen centimetres. What is the slant height of a face?', v: fSqPyr, chk: 'm04', n: `Use half of the base side, and the height.` }),
    sl('diagram', 'The sphere', { b: r`A **sphere** is the set of all points at a fixed distance $r$ from a centre $O$. Its surface area is $4\pi r^2$, which is **four times** the area of its **great circle**, and its volume is $\dfrac{4}{3}\pi r^3$.`, v: fSphere, n: `A sphere is a perfectly round solid, like a ball or a ladoo. Every point on its surface is the same distance, the radius, from the centre. The biggest circle you can draw on it is the great circle. The surface area of a sphere is four times the area of its great circle. The volume is four thirds pi r cubed.` }),
    sl('concept', 'Formulas for the sphere', { b: r`Use $\pi = \dfrac{22}{7}$ when $r$ is a multiple of $7$ or $3.5$, or when it makes the working easy; otherwise use $3.14$.`, v: tSphere, n: `Here is a sphere of radius six, using three point one four. The great circle has area one hundred thirteen point zero four. Four times that gives the surface area, four hundred fifty-two point one six square centimetres. The volume is four thirds of pi times six cubed, which is nine hundred four point three two cubic centimetres.` }),
    sl('example', 'Worked example 3: a ladoo', { b: r`A ladoo is a sphere of radius $2.1$ cm. Find its surface area and its volume. Use $\pi = \dfrac{22}{7}$.`, ul: [r`**Surface —** $4 \times \dfrac{22}{7} \times 2.1^2 = 55.44$ cm$^2$`, r`**Volume —** $\dfrac{4}{3} \times \dfrac{22}{7} \times 2.1^3 = 38.808$ cm$^3$`], v: fLadoo, n: `The radius is two point one. Its square is four point four one, and its cube is nine point two six one. The surface area is four times twenty-two sevenths times four point four one, which is fifty-five point four four square centimetres. The volume is four thirds times twenty-two sevenths times nine point two six one, which is thirty-eight point eight zero eight cubic centimetres.` }),
    sl('check', 'Quick check: a balloon', { b: 'A spherical balloon has a radius of one point seven five metres. How much rubber covers its surface? Use twenty-two sevenths for pi.', v: fSphere, chk: 'm05', n: `The surface area of a sphere is four pi r squared.` }),
    sl('diagram', 'The hemisphere', { b: r`A plane through the centre cuts a sphere into two **hemispheres**. A solid hemisphere has a **curved surface** $2\pi r^2$ and a **flat face** $\pi r^2$, so its total surface is $3\pi r^2$.`, v: fKatori, n: `A plane through the centre of a sphere cuts it into two equal hemispheres. The curved part is half of the surface of the sphere, so its area is two pi r squared. A solid hemisphere also has a flat circular face of area pi r squared. So the total surface area is three pi r squared. The volume is half of the sphere, which is two thirds pi r cubed.` }),
    sl('concept', 'Formulas for the hemisphere', { b: r`A hollow bowl has no flat face: its **inner surface** is the curved surface only, $2\pi r^2$.`, v: tHemi, n: `Here is a katori of radius four point two centimetres. The curved surface is two pi r squared, which is one hundred ten point eight eight. The flat face adds fifty-five point four four, so the total surface is one hundred sixty-six point three two. The volume is two thirds pi r cubed. A bowl without a lid has only the curved surface to polish or to paint.` }),
    sl('example', 'Worked example 4: a planetarium dome', { b: r`The dome of a planetarium is a hemisphere of radius $10.5$ m. Find the cost of painting its outside at $\text{Rs } 40$ per m$^2$, and the space inside. Use $\pi = \dfrac{22}{7}$.`, ul: [r`**Curved surface —** $2 \times \dfrac{22}{7} \times 10.5^2 = 693$ m$^2$`, r`**Cost —** $693 \times 40 = \text{Rs } 27720$`, r`**Volume —** $\dfrac{2}{3} \times \dfrac{22}{7} \times 10.5^3 = 2425.5$ m$^3$`], v: fDome, n: `The outside of a dome is its curved surface. Two times twenty-two sevenths times ten point five squared is six hundred ninety-three square metres. Painting it at forty rupees each costs twenty-seven thousand seven hundred twenty rupees. The space inside is two thirds times twenty-two sevenths times ten point five cubed, which is two thousand four hundred twenty-five point five cubic metres.` }),
    sl('check', 'Quick check: a solid hemisphere', { b: 'A solid hemisphere has a radius of fourteen centimetres. What is its total surface area? Use twenty-two sevenths for pi.', v: fHemi, chk: 'm06', n: `Do not forget the flat face.` }),
    sl('summary', 'Summary', { ul: [r`Square pyramid: $l = \sqrt{h^2 + (a/2)^2}$; lateral $2al$; total $a^2 + 2al$; volume $\dfrac{1}{3} \times \text{base} \times h$`, r`Triangular pyramid: lateral surface $=$ sum of the three side faces`, r`Sphere: surface $4\pi r^2$, volume $\dfrac{4}{3}\pi r^3$`, r`Hemisphere: curved $2\pi r^2$, total $3\pi r^2$, volume $\dfrac{2}{3}\pi r^3$`], v: sum2, n: `To sum up. A pyramid has a lateral surface made of triangles, and a volume of one third of the base area times the height. The surface of a sphere is four pi r squared, and its volume is four thirds pi r cubed. A solid hemisphere has a curved surface of two pi r squared, a total surface of three pi r squared, and a volume of two thirds pi r cubed.` }),
    sl('exam-tips', 'Exam tips: how marks are awarded', { ul: ['**Pyramids (2–3 marks):** find the slant height, then the faces, then the volume with the factor $\\frac{1}{3}$', '**Hemisphere:** decide whether the flat face is included (solid) or not (bowl, dome)', '**Mistake:** using the height $h$ instead of the slant height $l$ for the faces', '**Mistake:** forgetting the factor $\\frac{1}{3}$ in the volume of a pyramid or cone'], n: `For pyramids, find the slant height first, then the areas of the faces, and use one third for the volume. For a hemisphere, decide whether the flat face is part of the surface. Two common slips are using the height instead of the slant height, and forgetting the factor one third in the volume.` }),
  ],
});

// ================================================================ notes
const notes = {
  unit: 'cbse-9-mathematics-ch13', version: 1, title: 'Surface Area and Volume: chapter notes', language: 'en',
  sections: [
    { heading: '1. Cuboids and cubes', body_md: r`A **cuboid** has $6$ rectangular faces in $3$ equal pairs. Its **lateral surface area** is the four side walls, $2h(l + b)$. Its **total surface area** is $2(lb + bh + hl)$ and its **volume** is $lbh$. A **cube** of edge $a$ has lateral surface $4a^2$, total surface $6a^2$ and volume $a^3$.\n\nAn open tank has no top: add the base and the four walls only.`, key_terms: [{ term: 'Lateral surface', definition_md: 'The surface of a solid without its top and bottom (the side walls).' }, { term: 'Total surface area', definition_md: 'The area of the whole outside of a closed solid.' }, { term: 'Volume', definition_md: 'The space a solid takes up, in cubic units.' }], formulas: [{ latex: r`T = 2(lb + bh + hl), \quad V = lbh`, label: 'Cuboid' }, { latex: r`T = 6a^2, \quad V = a^3`, label: 'Cube' }], visual: fCuboid, visuals: [tCuboid, fCube, fTank, tWE1], topic_ids: [topic(1)] },
    { heading: '2. Units of area, volume and capacity', body_md: r`Area is in square units and volume in cubic units. $1$ m $= 100$ cm, $1$ m$^2 = 10000$ cm$^2$, $1$ m$^3 = 1000000$ cm$^3$. A **litre** measures capacity: $1$ L $= 1000$ cm$^3$ and $1$ m$^3 = 1000$ L. Change every length to one unit before multiplying.`, key_terms: [{ term: 'Capacity', definition_md: 'The volume of liquid a container can hold, in litres.' }], formulas: [], visual: tUnits, visuals: [], topic_ids: [topic(1)] },
    { heading: '3. Right circular cylinders', body_md: r`A **right circular cylinder** has two equal circular ends of radius $r$ and height $h$. Its curved surface opens out into a rectangle $2\pi r$ by $h$, so the **curved surface area** is $2\pi rh$. The **total surface area** is $2\pi r(r + h)$ and the **volume** is $\pi r^2 h$. State the value of $\pi$ ($\dfrac{22}{7}$ or $3.14$).`, key_terms: [{ term: 'Curved surface area', definition_md: 'The area of the side of a cylinder or cone, without the flat ends.' }], formulas: [{ latex: r`C = 2\pi rh, \quad T = 2\pi r(r + h), \quad V = \pi r^2 h`, label: 'Cylinder' }], visual: fCyl, visuals: [fCylNet, tCyl, fDrum, tDrum], topic_ids: [topic(2)] },
    { heading: '4. Right circular cones', body_md: r`A **cone** has a circular base of radius $r$, height $h$ and **slant height** $l = \sqrt{r^2 + h^2}$. Its curved surface opens out into a sector of radius $l$ and arc $2\pi r$, so the **curved surface area** is $\pi rl$. The **total surface area** is $\pi r(r + l)$ and the **volume** is $\dfrac{1}{3}\pi r^2 h$, one third of the cylinder with the same base and height.`, key_terms: [{ term: 'Slant height', definition_md: 'The length of the sloping edge of a cone from its apex to the rim of the base.' }], formulas: [{ latex: r`C = \pi rl, \quad T = \pi r(r + l), \quad V = \dfrac{1}{3}\pi r^2 h`, label: 'Cone' }], visual: fCone, visuals: [fConeNet, tCone, fTent, tTent], topic_ids: [topic(2)] },
    { heading: '5. Pyramids', body_md: r`A **pyramid** has a polygon as its base and triangular faces meeting at the **apex**. It is a **square pyramid** or a **triangular pyramid** by its base. The **slant height** of a face runs from the apex to the mid-point of the base edge; for a square pyramid $l = \sqrt{h^2 + (a/2)^2}$. The **lateral surface area** is the sum of the areas of the triangular faces ($2al$ for a square pyramid). The **volume** is $\dfrac{1}{3} \times \text{base area} \times \text{height}$, because three pyramids on the faces of a cube with a common apex fill the cube.`, key_terms: [{ term: 'Apex', definition_md: 'The point where all the triangular faces of a pyramid meet.' }, { term: 'Square pyramid', definition_md: 'A pyramid whose base is a square.' }, { term: 'Triangular pyramid', definition_md: 'A pyramid whose base is a triangle; it has four triangular faces.' }], formulas: [{ latex: r`L = 2al, \quad T = a^2 + 2al, \quad V = \dfrac{1}{3} \times \text{base area} \times h`, label: 'Square pyramid' }], visual: fSqPyr, visuals: [tSlant, tPyr, fShikhara, tShik, fTriPyr, tTri, fPyrCube, tCubePyr], topic_ids: [topic(3)] },
    { heading: '6. Spheres and hemispheres', body_md: r`A **sphere** of radius $r$ has surface area $4\pi r^2$ (four times its great circle) and volume $\dfrac{4}{3}\pi r^3$. A **solid hemisphere** has a curved surface $2\pi r^2$, a flat face $\pi r^2$, total surface $3\pi r^2$ and volume $\dfrac{2}{3}\pi r^3$. A hollow bowl or a dome has the curved surface only.`, key_terms: [{ term: 'Great circle', definition_md: 'The largest circle on a sphere, cut by a plane through its centre.' }, { term: 'Hemisphere', definition_md: 'Half of a sphere.' }], formulas: [{ latex: r`S = 4\pi r^2, \quad V = \dfrac{4}{3}\pi r^3`, label: 'Sphere' }, { latex: r`C = 2\pi r^2, \quad T = 3\pi r^2, \quad V = \dfrac{2}{3}\pi r^3`, label: 'Hemisphere' }], visual: fSphere, visuals: [tSphere, fLadoo, tLadoo, fHemi, tHemi, fDome, tDome], topic_ids: [topic(4)] },
  ],
  exam_tips_md: r`**How marks are awarded**\n- *Surface area and volume (2–3 marks):* formula, value of $\pi$, substitution, answer with the unit.\n- *Cones and pyramids:* find the slant height first.\n- *Hemisphere:* say whether the flat face is included.\n\n**Common mistakes**\n1. Not stating the value of $\pi$.\n2. Using $h$ instead of $l$ in $\pi r l$ or in the faces of a pyramid.\n3. Forgetting the factor $\dfrac{1}{3}$.\n4. Mixing units (cm and m) or forgetting to change cm$^3$ to litres.\n5. Using the total surface when only the curved surface is needed (tent, dome, open tank).`,
  status: 'draft', provenance: d1.provenance,
};

const fcard = (id, front_md, back_md, tag, t) => ({ id, front_md, back_md, tag, topic_id: topic(t) });
const flashcards = {
  unit: 'cbse-9-mathematics-ch13', version: 1, language: 'en',
  cards: [
    fcard('f01', 'What is the lateral surface of a cuboid?', 'The four side walls; the top and the bottom are not counted.', 'definition', 1),
    fcard('f02', 'Total surface area of a cuboid?', r`$2(lb + bh + hl)$.`, 'formula', 1),
    fcard('f03', 'Lateral surface area of a cuboid?', r`$2h(l + b)$.`, 'formula', 1),
    fcard('f04', 'Volume of a cuboid?', r`$l \times b \times h$.`, 'formula', 1),
    fcard('f05', 'Total surface area and volume of a cube of edge a?', r`$6a^2$ and $a^3$; the lateral surface is $4a^2$.`, 'formula', 1),
    fcard('f06', 'How many litres are in 1 cubic metre?', r`$1000$ litres.`, 'fact', 1),
    fcard('f07', 'How many cubic centimetres are in 1 litre?', r`$1000$ cm$^3$.`, 'fact', 1),
    fcard('f08', 'Which surfaces does an open tank have?', 'The base and four walls only: no top.', 'exam-tip', 1),
    fcard('f09', 'In what units do areas and volumes come?', 'Areas in square units, volumes in cubic units.', 'concept', 1),
    fcard('f10', 'What shape is the opened-out curved surface of a cylinder?', r`A rectangle $2\pi r$ long and $h$ high.`, 'concept', 2),
    fcard('f11', 'Curved surface area of a cylinder?', r`$2\pi rh$.`, 'formula', 2),
    fcard('f12', 'Total surface area of a closed cylinder?', r`$2\pi r(r + h)$.`, 'formula', 2),
    fcard('f13', 'Volume of a cylinder?', r`$\pi r^2 h$.`, 'formula', 2),
    fcard('f14', 'What is the slant height of a cone?', 'The length of the sloping edge from the apex to the rim of the base.', 'definition', 2),
    fcard('f15', 'Slant height in terms of r and h?', r`$l = \sqrt{r^2 + h^2}$.`, 'formula', 2),
    fcard('f16', 'Curved surface area of a cone?', r`$\pi r l$.`, 'formula', 2),
    fcard('f17', 'Total surface area of a cone?', r`$\pi r(r + l)$.`, 'formula', 2),
    fcard('f18', 'Volume of a cone?', r`$\dfrac{1}{3}\pi r^2 h$, one third of the cylinder with the same base and height.`, 'formula', 2),
    fcard('f19', 'What does the opened-out curved surface of a cone look like?', 'A sector of a circle of radius l whose arc is the circumference of the base.', 'concept', 2),
    fcard('f20', 'What is a pyramid?', 'A solid with a polygon as its base and triangular faces meeting at an apex.', 'definition', 3),
    fcard('f21', 'What is a triangular pyramid?', 'A pyramid with a triangle as its base; it has four triangular faces.', 'definition', 3),
    fcard('f22', 'Slant height of a square pyramid?', r`$l = \sqrt{h^2 + (a/2)^2}$.`, 'formula', 3),
    fcard('f23', 'Lateral surface area of a square pyramid?', r`$4 \times \dfrac{1}{2}al = 2al$.`, 'formula', 3),
    fcard('f24', 'How do you find the lateral surface of any pyramid?', 'Add the areas of its triangular faces.', 'concept', 3),
    fcard('f25', 'Volume of a pyramid?', r`$\dfrac{1}{3} \times \text{base area} \times \text{height}$.`, 'formula', 3),
    fcard('f26', 'Why is the volume of a pyramid one third?', 'Three pyramids with a common apex fill a cube, each on one face.', 'concept', 3),
    fcard('f27', 'Surface area of a sphere?', r`$4\pi r^2$, four times the area of its great circle.`, 'formula', 4),
    fcard('f28', 'Volume of a sphere?', r`$\dfrac{4}{3}\pi r^3$.`, 'formula', 4),
    fcard('f29', 'Curved surface and total surface of a solid hemisphere?', r`$2\pi r^2$ and $3\pi r^2$.`, 'formula', 4),
    fcard('f30', 'Volume of a hemisphere?', r`$\dfrac{2}{3}\pi r^3$, half the sphere.`, 'formula', 4),
    fcard('f31', 'When does a hemisphere have no flat face to count?', 'When it is a hollow bowl or a dome: only the curved surface is used.', 'exam-tip', 4),
    fcard('f32', 'Which value of pi should you use?', r`$\dfrac{22}{7}$ if $r$ is a multiple of $7$ (or $3.5$, $10.5$, $2.1$), otherwise $3.14$; always state it.`, 'exam-tip', 4),
  ],
  status: 'draft', provenance: d1.provenance,
};

const release = {
  unit: 'cbse-9-mathematics-ch13', version: 1, academic_year: '2026-27', created_at: '2026-11-05T00:00:00+05:30',
  decks: [d1, d2], notes, flashcards, questions: [],
  build: { run_id: null, checks: { syllabus: 't01 surface area and volume of cuboids and cubes, units of capacity; t02 curved and total surface area and volume of right circular cylinders and cones with the slant height; t03 square and triangular pyramids, lateral surface from the slant heights of the faces, volume one third of base area times height; t04 surface area and volume of spheres and hemispheres', self_checks: 'every solid is drawn from computed 3D points in an oblique view and marked not to scale; every area and volume is asserted from the formulas with the stated value of pi and, for the pyramids, from the 3D coordinates; every answer in the item banks is recomputed from the givens' } },
};
const tests = chapterTests('Surface Area and Volume', {
  A: ['m09', 'm14', 'm20', 'ar1'],
  B: ['s202', 's204', 's301'],
  C: ['l01', 'l03'],
  D: ['c01'],
}, {
  A: ['m08', 'm10', 'm11', 'm13', 'm15', 'm17', 'm18', 'm21', 'ar2', 'ar3'],
  B: ['s201', 's203', ['s206', 's207'], 's302', ['s303', 's304']],
  C: ['l02', ['l04', 'l05']],
  D: ['c02', 'c04'],
});
build({ dir: DIR, release, testsSpec: tests });
