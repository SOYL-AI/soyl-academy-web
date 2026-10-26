// Build CBSE 10 Mathematics ch11 Areas Related to Circles. Run from platform/:
//   npx tsx content/authored/maths/cbse-10-mathematics-ch11/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, topic, deck, sl, table, flow, build, chapterTests, r } from '../../cbse-10-mathematics-ch10/src/lib.mjs';
import { figs } from './figs.mjs';

setUnit('cbse-10-mathematics-ch11');
await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const fractionTable = table(['Angle $\\theta$', 'Fraction $\\dfrac{\\theta}{360}$', 'Sector area', 'Arc length'], [['$360^\\circ$', '$1$', '$\\pi r^2$', '$2\\pi r$'], ['$180^\\circ$', '$\\dfrac12$', '$\\dfrac12\\pi r^2$', '$\\pi r$'], ['$90^\\circ$', '$\\dfrac14$', '$\\dfrac14\\pi r^2$', '$\\dfrac12\\pi r$'], ['$\\theta$', '$\\dfrac{\\theta}{360}$', '$\\dfrac{\\theta}{360}\\pi r^2$', '$\\dfrac{\\theta}{360} \\times 2\\pi r$']], 'Table: a full turn gives the whole area pi r squared and the whole circumference 2 pi r; a half turn gives half of each; a quarter turn a quarter of each; an angle theta gives the fraction theta over 360 of each.', 'A sector is the fraction $\\dfrac{\\theta}{360}$ of the circle.');
const clockTable = table(['Hand', 'Full turn', 'Per minute', 'In 20 minutes'], [['Minute hand', '$360^\\circ$ in $60$ min', '$6^\\circ$', '$120^\\circ$'], ['Hour hand', '$360^\\circ$ in $12$ h', '$0.5^\\circ$', '$10^\\circ$'], ['Seconds hand', '$360^\\circ$ in $1$ min', '$360^\\circ$', '$20$ full turns']], 'Table of clock hands: the minute hand turns 6 degrees per minute, 120 degrees in 20 minutes; the hour hand turns half a degree per minute, 10 degrees in 20 minutes; the seconds hand makes a full turn every minute.', 'Find the angle first, then use the sector formulas.');
const piTable = table(['Stem says', 'Use', 'Typical radius'], [['$\\pi = \\dfrac{22}{7}$', 'cancel the $7$', '$7, 14, 21, 35, 10.5$'], ['$\\pi = 3.14$', 'decimals', '$10, 12, 20$'], ['nothing', 'leave the answer in terms of $\\pi$', 'any']], 'Table: when the question says pi equals 22 over 7, cancel the 7 with radii such as 7, 14, 21 or 10.5; when it says 3.14, work in decimals; if nothing is said, leave the answer in terms of pi.', 'Always use the value of $\\pi$ the question gives.');
const triTable = table(['Angle at $O$', '$\\triangle OAB$', 'Area of $\\triangle OAB$', 'Minor segment'], [['$60^\\circ$', 'equilateral, side $r$', '$\\dfrac{\\sqrt3}{4}r^2$', '$\\left(\\dfrac{\\pi}{6} - \\dfrac{\\sqrt3}{4}\\right)r^2$'], ['$90^\\circ$', 'right isosceles', '$\\dfrac12 r^2$', '$\\left(\\dfrac{\\pi}{4} - \\dfrac12\\right)r^2$'], ['$120^\\circ$', 'height $\\dfrac r2$, base $\\sqrt3\\,r$', '$\\dfrac{\\sqrt3}{4}r^2$', '$\\left(\\dfrac{\\pi}{3} - \\dfrac{\\sqrt3}{4}\\right)r^2$']], 'Table of the three syllabus angles: for 60 degrees the triangle is equilateral with area root 3 over 4 r squared; for 90 degrees it is right isosceles with area half r squared; for 120 degrees it has height r over 2 and base root 3 r, area root 3 over 4 r squared. The segment is the sector minus the triangle.', 'The syllabus uses only these three angles for segments.');
const strategy = flow('TB', [['w', 'Name the **whole** figure (square, circle, sector…)'], ['p', 'List the **pieces** added or removed'], ['o', 'Check for **overlaps** (count shared parts once)'], ['c', 'Compute each area with the given $\\pi$'], ['a', 'Shaded $=$ whole $\\pm$ pieces']], [['w', 'p'], ['p', 'o'], ['o', 'c'], ['c', 'a']], 'Strategy chart for shaded regions: name the whole figure, list the pieces added or removed, check for overlaps, compute each area with the given value of pi, and add or subtract.', 'Every shaded-region question is "whole plus or minus pieces".');
const sum1 = table(['Quantity', 'Formula'], [['Sector area', '$\\dfrac{\\theta}{360} \\times \\pi r^2$'], ['Arc length', '$\\dfrac{\\theta}{360} \\times 2\\pi r$'], ['Sector perimeter', 'arc $+ 2r$'], ['Area from arc', '$\\dfrac12 lr$'], ['Major sector', '$\\pi r^2 -$ minor sector']], 'Summary table: sector area is theta over 360 times pi r squared; arc length is theta over 360 times 2 pi r; the perimeter of a sector is the arc plus two radii; the area is also half the arc times the radius; a major sector is the circle minus the minor sector.', 'Five formulas for part one.');
const sum2 = table(['Region', 'Area'], [['Minor segment', 'sector $-$ $\\triangle OAB$'], ['Major segment', '$\\pi r^2 -$ minor segment'], ['Ring', '$\\pi(R^2 - r^2)$'], ['Shaded region', 'whole $\\pm$ pieces'], ['Segment perimeter', 'arc $+$ chord']], 'Summary table: a minor segment is the sector minus the triangle; a major segment is the circle minus the minor segment; a ring is pi times R squared minus r squared; a shaded region is the whole plus or minus its pieces; the perimeter of a segment is arc plus chord.', 'Every answer is built from sectors, triangles and squares.');

const d1 = deck({
  part: 1,
  title: 'Areas Related to Circles — Part 1: Sectors and arcs',
  goals: ['Recognise sectors, arcs, minor and major parts of a circle', 'Find the area of a sector and the length of its arc for any angle', 'Find the perimeter of a sector', 'Work backwards from an arc or an area to the angle or radius', 'Solve clock, pendulum and sports-ground problems'],
  slides: [
    sl('title', 'Areas Related to Circles, Part 1: Sectors and arcs', { b: 'A slice of a circle is just a **fraction** of the whole.', v: figs.title1, n: 'Welcome to Areas Related to Circles. Think of a slice of pizza, the part of a cricket ground between two fielders, or the area a wiper or a sprinkler covers. Each is a slice of a circle called a sector. The big idea of this part is simple: a sector is a fraction of the whole circle, and the angle tells you which fraction.' }),
    sl('concept', 'What you will be able to do', { ul: ['Name **sectors** and **arcs**, minor and major', 'Find the **area of a sector**', 'Find the **length of an arc** and the perimeter of a sector', 'Work backwards to an angle or a radius', 'Use the value of $\\pi$ the question gives'], n: 'These are your goals for part one. You already know that a circle of radius r has area pi r squared and circumference two pi r. Everything today comes from those two formulas and one fraction.' }),
    sl('diagram', 'Parts of a circle', { b: 'Two radii cut a circle into a **minor sector** and a **major sector**; their arcs are the minor and major arcs. The two angles at the centre add up to $360^\\circ$.', v: figs.parts, n: 'Two radii split a circle into two sectors. The smaller one is the minor sector, and its curved edge is the minor arc. The rest is the major sector, with the major arc. If the minor sector has angle theta, the major sector has three hundred and sixty minus theta degrees. Unless a question says major, sector means the minor one.' }),
    sl('concept', 'The fraction idea', { b: 'A full turn of $360^\\circ$ gives the whole circle, so an angle $\\theta$ gives the fraction $\\dfrac{\\theta}{360}$ of the area **and** of the circumference.', m: ['\\text{Area of sector} = \\frac{\\theta}{360} \\times \\pi r^2, \\qquad \\text{Arc length} = \\frac{\\theta}{360} \\times 2\\pi r'], v: fractionTable, n: 'Look at the table. Half a turn gives half the circle, a quarter turn gives a quarter. So an angle theta gives theta over three sixty of the circle. Multiply that fraction by pi r squared for the area, or by two pi r for the length of the arc. These are the two formulas of the chapter; there is nothing new to memorise.' }),
    sl('example', 'Worked example 1: area, arc and perimeter', { b: 'A sector has radius $21$ cm and angle $60^\\circ$. Find its area, its arc length and its perimeter. (Use $\\pi = \\dfrac{22}{7}$.)', ul: ['**Step 1 —** Fraction $= \\dfrac{60}{360} = \\dfrac16$.', '**Step 2 —** Area $= \\dfrac16 \\times \\dfrac{22}{7} \\times 21 \\times 21 = \\dfrac16 \\times 1386 = 231$ cm².', '**Step 3 —** Arc $= \\dfrac16 \\times 2 \\times \\dfrac{22}{7} \\times 21 = \\dfrac16 \\times 132 = 22$ cm.', '**Step 4 —** Perimeter $= 22 + 21 + 21 = 64$ cm.'], v: figs.arcGeo, n: 'Find the fraction first: sixty out of three sixty is one sixth. Then take one sixth of the whole area, one thousand three hundred and eighty six, which gives two hundred and thirty one square centimetres. The arc is one sixth of the circumference, twenty two centimetres. For the perimeter, do not forget the two radii.' }),
    sl('check', 'Quick check: area of a sector', { b: 'Find the fraction $\\dfrac{\\theta}{360}$ first.', chk: 'm03', n: 'What fraction of a full turn is forty five degrees? Take that fraction of the area of the whole circle.' }),
    sl('example', 'Worked example 2: a cricket boundary', { b: 'A cricket ground in Chennai is a circle of radius $70$ m. Two fielders stand on the boundary so that the angle between them at the pitch is $45^\\circ$. Find the length of boundary rope between them and the area of ground they guard. (Use $\\pi = \\dfrac{22}{7}$.)', ul: ['**Step 1 —** Fraction $= \\dfrac{45}{360} = \\dfrac18$.', '**Step 2 —** Rope $= \\dfrac18 \\times 2 \\times \\dfrac{22}{7} \\times 70 = \\dfrac18 \\times 440 = 55$ m.', '**Step 3 —** Area $= \\dfrac18 \\times \\dfrac{22}{7} \\times 70 \\times 70 = \\dfrac18 \\times 15400 = 1925$ m².', '**Check —** $\\dfrac12 lr = \\dfrac12 \\times 55 \\times 70 = 1925$ ✓.'], v: figs.cricket, n: 'The angle between the two fielders is one eighth of a full turn. So the rope between them is one eighth of the boundary, fifty five metres, and the region they guard is one eighth of the ground. The check uses a neat shortcut: the area of a sector is half the arc times the radius, just like a triangle.' }),
    sl('concept', 'A shortcut: area $= \\dfrac12 \\times$ arc $\\times$ radius', { b: 'Since $\\dfrac{\\theta}{360}\\pi r^2 = \\dfrac12 r \\times \\dfrac{\\theta}{360} \\times 2\\pi r$:', m: ['A = \\frac12\\, l\\, r'], ul: ['Useful when the **arc length** is given and the angle is not', 'A sector behaves like a "triangle" with base $l$ and height $r$', 'Example: $l = 22$ cm, $r = 21$ cm gives $A = 231$ cm²'], v: table(['Arc $l$', 'Radius $r$', 'Area $\\dfrac12 lr$'], [['$22$ cm', '$21$ cm', '$231$ cm²'], ['$55$ m', '$70$ m', '$1925$ m²'], ['$44$ cm', '$35$ cm', '$770$ cm²']], 'Table of three sectors: arc 22 and radius 21 give area 231; arc 55 and radius 70 give area 1925; arc 44 and radius 35 give area 770.', 'No angle needed.'), n: 'Here is a shortcut worth remembering. The area of a sector equals half the arc length times the radius. Picture the sector as a very thin triangle with base equal to the arc and height equal to the radius. When a question gives the arc and the radius but not the angle, this saves a step.' }),
    sl('example', 'Worked example 3: a swinging pendulum', { b: 'A pendulum $35$ cm long swings so that its bob moves along an arc of $22$ cm. Through what angle does it swing? (Use $\\pi = \\dfrac{22}{7}$.)', ul: ['**Step 1 —** The bob moves on a circle of radius $35$ cm: circumference $= 2 \\times \\dfrac{22}{7} \\times 35 = 220$ cm.', '**Step 2 —** $\\dfrac{\\theta}{360} = \\dfrac{22}{220} = \\dfrac{1}{10}$.', '**Step 3 —** $\\theta = 36^\\circ$.', '**Check —** $\\dfrac{36}{360} \\times 220 = 22$ ✓.'], v: figs.pendulum, n: 'Work backwards. The arc is a fraction of the full circumference, and that same fraction is theta over three sixty. The circumference of a circle of radius thirty five is two hundred and twenty, so the arc is one tenth of it. One tenth of three sixty is thirty six degrees.' }),
    sl('check', 'Quick check: perimeter of a sector', { b: 'Perimeter means the whole boundary.', chk: 'm04', n: 'Find the arc first. Then ask yourself: how many straight edges does a sector have, and how long is each?' }),
    sl('example', 'Worked example 4: a major sector', { b: 'At a birthday party in Patna, a quarter of a round cake of radius $14$ cm is eaten. Find the area of the top of the remaining cake and the length of its curved edge. (Use $\\pi = \\dfrac{22}{7}$.)', ul: ['**Step 1 —** The remaining part is a major sector of angle $360^\\circ - 90^\\circ = 270^\\circ$.', '**Step 2 —** Area $= \\dfrac{270}{360} \\times \\dfrac{22}{7} \\times 196 = \\dfrac34 \\times 616 = 462$ cm².', '**Step 3 —** Curved edge $= \\dfrac34 \\times 2 \\times \\dfrac{22}{7} \\times 14 = \\dfrac34 \\times 88 = 66$ cm.', '**Check —** Circle $-$ quadrant $= 616 - 154 = 462$ ✓.'], v: figs.major, n: 'The eaten piece is a quadrant, so what is left is a major sector of two hundred and seventy degrees. You can use the fraction three quarters directly, or subtract the quadrant from the whole circle. Both give four hundred and sixty two square centimetres. Doing it both ways is a good habit in exams.' }),
    sl('diagram', 'Angles from clocks and the value of pi', { b: 'Many problems hide the angle: find it first. And always use the value of $\\pi$ the question states.', v: clockTable, n: 'Clock problems are really sector problems in disguise. The minute hand turns six degrees every minute, and the hour hand half a degree. Once you know the angle, use the usual formulas. Also read the question for the value of pi. Twenty two by seven suits radii like seven or twenty one; three point one four suits radii like ten.' }),
    sl('diagram', 'Choosing the value of $\\pi$', { b: 'Different values of $\\pi$ give slightly different answers; the marking scheme expects the one in the question.', v: piTable, n: 'If the question says twenty two by seven, use it, and look for sevens to cancel. If it says three point one four, work in decimals. If it gives no value, leave pi in the answer, like six pi square centimetres. Using a different value from the one given can cost you the final mark.' }),
    sl('check', 'Quick check: from arc to angle', { b: 'Compare the arc with the whole circumference.', chk: 'tf4', n: 'What is the full circumference of this circle? What fraction of it is the given arc?' }),
    sl('summary', 'Summary', { ul: ['Sector $= \\dfrac{\\theta}{360}$ of the circle', 'Area $= \\dfrac{\\theta}{360}\\pi r^2$; arc $= \\dfrac{\\theta}{360} \\times 2\\pi r$', 'Perimeter of a sector $=$ arc $+ 2r$', 'Area $= \\dfrac12 lr$ when the arc is known', 'Major sector: angle $360^\\circ - \\theta$, or circle $-$ minor'], v: sum1, n: 'To sum up part one. A sector is a fraction of the circle, theta over three sixty. Use it with pi r squared for area and with two pi r for arc length. Add two radii for the perimeter. Work backwards from an arc or an area to find the angle, and use the major angle, three sixty minus theta, for major sectors.' }),
    sl('exam-tips', 'Exam tips: how marks are awarded', { ul: ['**Sector area / arc (2 marks):** correct formula with $\\dfrac{\\theta}{360}$ 1 + answer with unit 1', '**Perimeter (2–3 marks):** arc 1 + adding $2r$ 1', '**Mistake:** using $2\\pi r$ for area or $\\pi r^2$ for arc length', '**Mistake:** forgetting the two radii in a perimeter', '**Mistake:** using $3.14$ when the question says $\\dfrac{22}{7}$', '**Mistake:** units: cm for lengths, cm² for areas'], n: 'Write the formula first, with theta over three sixty; that line earns a mark even if the arithmetic slips. Check your units: lengths in centimetres, areas in square centimetres. A quick sense check helps: a sector of sixty degrees must be one sixth of the circle. And for perimeter, include both radii.' }),
  ],
});

const d2 = deck({
  part: 2,
  title: 'Areas Related to Circles — Part 2: Segments and shaded regions',
  goals: ['Find the area of a minor segment for central angles of 60°, 90° and 120°', 'Find the area of a major segment', 'Find areas of shaded regions made of sectors, segments, triangles and squares', 'Find perimeters of segments and shaded regions'],
  slides: [
    sl('title', 'Areas Related to Circles, Part 2: Segments and shaded regions', { b: 'Cut a circle with a chord and you get two **segments**.', v: figs.seg90, n: 'Welcome to part two. A straight chord cuts a circle into two pieces called segments. The arched glass above an old doorway is one. In this part we find the areas of segments, and then the areas of shaded designs made from circles, squares and triangles, like tiles, flower beds and rangoli patterns.' }),
    sl('concept', 'What you will be able to do', { ul: ['Find a **minor segment** as sector minus triangle', 'Handle the three syllabus angles: $60^\\circ$, $90^\\circ$, $120^\\circ$', 'Find a **major segment**', 'Plan a **shaded region**: whole $\\pm$ pieces', 'Find perimeters made of arcs and straight lines'], n: 'Here are the goals. For segments, the syllabus uses only three central angles: sixty, ninety and one hundred and twenty degrees. Shaded-region questions combine simple shapes; the skill is to plan which pieces to add and which to subtract.' }),
    sl('diagram', 'Segment = sector − triangle', { b: 'The sector $OAB$ is made of $\\triangle OAB$ and the minor segment. So', m: ['\\text{Minor segment} = \\text{sector } OAB - \\triangle OAB, \\qquad \\text{Major segment} = \\pi r^2 - \\text{minor segment}'], v: figs.seg90, n: 'Look at the sector O A B. Draw the chord A B, and the sector splits into two parts: the triangle O A B and the segment. So the segment is the sector minus the triangle. The major segment is everything else in the circle: the circle minus the minor segment.' }),
    sl('concept', 'The triangle for each syllabus angle', { b: 'The area of $\\triangle OAB$ (two sides $r$) depends on the angle at $O$:', v: triTable, n: 'You need the area of the triangle O A B. At ninety degrees it is a right triangle with legs r and r, so its area is half r squared. At sixty degrees it is equilateral, so use root three over four r squared. At one hundred and twenty degrees, drop a perpendicular from O: its height is r over two and the base is root three r, giving the same root three over four r squared.' }),
    sl('example', 'Worked example 1: a 90° segment', { b: 'A chord of a circle of radius $14$ cm subtends a right angle at the centre. Find the areas of the minor and major segments. (Use $\\pi = \\dfrac{22}{7}$.)', ul: ['**Step 1 —** Sector $= \\dfrac14 \\times \\dfrac{22}{7} \\times 196 = 154$ cm².', '**Step 2 —** $\\triangle OAB = \\dfrac12 \\times 14 \\times 14 = 98$ cm².', '**Step 3 —** Minor segment $= 154 - 98 = 56$ cm².', '**Step 4 —** Major segment $= 616 - 56 = 560$ cm².'], v: figs.seg90, n: 'Three steps every time: sector, triangle, subtract. The quarter circle is one hundred and fifty four, the right triangle is ninety eight, so the minor segment is fifty six square centimetres. For the major segment, subtract fifty six from the whole circle, six hundred and sixteen. Do not subtract the triangle again.' }),
    sl('check', 'Quick check: minor segment', { b: 'Sector, triangle, subtract.', chk: 'm10', n: 'Find the sector of ninety degrees, then the right triangle. Which of the options is their difference?' }),
    sl('example', 'Worked example 2: a 60° segment', { b: 'A chord of a circle of radius $12$ cm subtends $60^\\circ$ at the centre. Find the area of the minor segment. (Use $\\pi = 3.14$, $\\sqrt3 = 1.73$.)', ul: ['**Step 1 —** Sector $= \\dfrac16 \\times 3.14 \\times 144 = 75.36$ cm².', '**Step 2 —** $\\triangle OAB$ is equilateral: $\\dfrac{1.73}{4} \\times 144 = 62.28$ cm².', '**Step 3 —** Segment $= 75.36 - 62.28 = 13.08$ cm².', '**Sense check —** A $60^\\circ$ segment is thin: much smaller than the sector ✓.'], v: figs.seg60, n: 'With sixty degrees, the two radii and the chord form an equilateral triangle, because the base angles must also be sixty. So use root three over four times r squared. Here the segment is quite thin, only about thirteen square centimetres, which matches the picture. Use the decimal values the question gives.' }),
    sl('example', 'Worked example 3: a 120° segment', { b: 'A chord of a circle of radius $30$ cm subtends $120^\\circ$ at the centre. Find the area of the minor segment. (Use $\\pi = 3.14$, $\\sqrt3 = 1.73$.)', ul: ['**Step 1 —** Sector $= \\dfrac13 \\times 3.14 \\times 900 = 942$ cm².', '**Step 2 —** $OM \\perp AB$: $OM = 15$ cm, $AB = 30\\sqrt3$ cm, so $\\triangle OAB = \\dfrac12 \\times 30\\sqrt3 \\times 15 = 225\\sqrt3 = 389.25$ cm².', '**Step 3 —** Segment $= 942 - 389.25 = 552.75$ cm².', '**Check —** $\\dfrac{\\sqrt3}{4} \\times 900 = 225\\sqrt3$ ✓.'], v: figs.seg120, n: 'For one hundred and twenty degrees, drop the perpendicular O M to the chord. It bisects the angle, so each half is sixty degrees, and O M is half the radius, fifteen. Half the chord is fifteen root three, so the chord is thirty root three. The triangle has area two hundred and twenty five root three, about three hundred and eighty nine.' }),
    sl('check', 'Quick check: a 60° segment', { b: 'Equilateral triangle for $60^\\circ$.', chk: 'n06', n: 'Which formula gives the area of an equilateral triangle of side six? Subtract it from the sector.' }),
    sl('diagram', 'Planning a shaded region', { b: 'Shaded-region questions combine **simple** shapes. Plan before you calculate.', v: strategy, n: 'Here is a plan for any shaded region. Name the whole figure. List the pieces cut out or added. Check whether pieces overlap, so nothing is counted twice. Then compute each area with the value of pi given, and finally add or subtract. Write the plan in one line at the start of your answer; examiners give credit for it.' }),
    sl('example', 'Worked example 4: a rangoli tile', { b: 'A square tile of side $28$ cm has a quadrant of radius $7$ cm cut at each corner and a circle of radius $7$ cm cut at the centre. Find the area of the shaded part. (Use $\\pi = \\dfrac{22}{7}$.)', ul: ['**Step 1 —** Square $= 28 \\times 28 = 784$ cm².', '**Step 2 —** Four quadrants of radius $7$ make one circle: $\\dfrac{22}{7} \\times 49 = 154$ cm².', '**Step 3 —** Central circle $= 154$ cm².', '**Answer —** Shaded $= 784 - 154 - 154 = 476$ cm².'], v: figs.tile, n: 'The whole is the square. Four quarter circles of the same radius always join up to one full circle, which saves a lot of work. The central circle is another full circle of the same size. They do not overlap, so subtract both from the square: four hundred and seventy six square centimetres.' }),
    sl('example', 'Worked example 5: a leaf design', { b: 'In a square $ABCD$ of side $14$ cm, quadrant arcs with centres $B$ and $D$ enclose a leaf. Find its area. (Use $\\pi = \\dfrac{22}{7}$.)', ul: ['**Step 1 —** The leaf is two $90^\\circ$ segments on the diagonal $AC$.', '**Step 2 —** One segment $= \\dfrac14 \\times \\dfrac{22}{7} \\times 196 - \\dfrac12 \\times 14 \\times 14 = 154 - 98 = 56$ cm².', '**Step 3 —** Leaf $= 2 \\times 56 = 112$ cm².', '**Check —** Two quadrants overlap in the leaf: $154 + 154 - 196 = 112$ ✓.'], v: figs.leaf14, n: 'The diagonal A C splits the leaf into two equal segments, each of ninety degrees. Each is a quarter circle minus a right triangle, fifty six square centimetres, so the leaf is one hundred and twelve. A clever check: the two quarter circles together cover the square once and the leaf twice, so the leaf is their sum minus the square.' }),
    sl('check', 'Quick check: corners of a square', { b: 'Four equal quadrants make one circle.', chk: 'm16', n: 'What do the four corner pieces add up to? Subtract that from the square.' }),
    sl('example', 'Worked example 6: sectors in a triangle', { b: 'An equilateral triangle $ABC$ has side $20$ cm. With each vertex as centre, a sector of radius $10$ cm is drawn inside it. Find the area of the region of the triangle outside the sectors. (Use $\\pi = 3.14$, $\\sqrt3 = 1.73$.)', ul: ['**Step 1 —** Triangle $= \\dfrac{1.73}{4} \\times 400 = 173$ cm².', '**Step 2 —** Each sector has angle $60^\\circ$; three of them make $180^\\circ$, a semicircle: $\\dfrac12 \\times 3.14 \\times 100 = 157$ cm².', '**Step 3 —** Region $= 173 - 157 = 16$ cm².', '**Note —** The sectors just meet at the midpoints of the sides, so they do not overlap.'], v: figs.triSectors, n: 'The angles of the triangle are sixty degrees each, so the three sectors have angles adding to one hundred and eighty: together they make a semicircle of radius ten. Subtract it from the triangle to get sixteen square centimetres. This trick works in any triangle: the three corner sectors of equal radius always make a semicircle.' }),
    sl('diagram', 'Perimeters of curved regions', { b: '**Perimeter of a segment** $=$ arc $+$ chord. For any shaded region, walk round its boundary and add each straight piece and each arc.', v: figs.segPerimeter, n: 'Perimeter means the length of the boundary. For a segment, that is the curved arc plus the straight chord. For other shaded regions, trace the boundary with your finger and list each piece, straight or curved. A common slip is to add the radii, which are not part of a segment boundary.' }),
    sl('summary', 'Summary', { ul: ['Minor segment $=$ sector $-$ $\\triangle OAB$', '$\\triangle OAB$: $\\dfrac12 r^2$ for $90^\\circ$; $\\dfrac{\\sqrt3}{4}r^2$ for $60^\\circ$ and $120^\\circ$', 'Major segment $= \\pi r^2 -$ minor segment', 'Shaded region $=$ whole $\\pm$ pieces; four equal quadrants $=$ one circle', 'Perimeter of a segment $=$ arc $+$ chord'], v: sum2, n: 'To sum up part two. A segment is a sector minus a triangle, and you only need three triangle formulas. A major segment is the circle minus the minor one. For shaded regions, plan whole plus or minus pieces, look for quarter circles that join into a full circle, and walk round the boundary for perimeters.' }),
    sl('exam-tips', 'Exam tips: how marks are awarded', { ul: ['**Segment (3 marks):** sector 1 + triangle 1 + subtraction with unit 1', '**Shaded region (3–5 marks):** plan 1 + each piece 1 + final answer 1', '**Mistake:** using $\\dfrac12 r^2$ for a $60^\\circ$ triangle', '**Mistake:** subtracting the triangle again for a major segment', '**Mistake:** counting overlapping pieces twice', '**Mistake:** rounding early: keep exact values until the end'], n: 'In segment questions, show the sector and the triangle on separate lines; each earns a mark. Use the right triangle formula for the angle. In shaded regions, write your plan first, and keep unrounded values until the last step so that your final answer matches the scheme. Finally, give the unit, square centimetres or square metres.' }),
  ],
});

const notes = {
  unit: 'cbse-10-mathematics-ch11', version: 1, title: 'Areas Related to Circles — chapter notes', language: 'en',
  sections: [
    { heading: '1. Circle facts and the value of π', body_md: r`For a circle of radius $r$: area $= \pi r^2$, circumference $= 2\pi r$.

Use the value of $\pi$ given in the question: $\dfrac{22}{7}$ (choose radii that cancel the $7$) or $3.14$; if none is given, leave $\pi$ in the answer.

A **ring** between concentric circles of radii $R > r$ has area $\pi(R^2 - r^2)$ — not $\pi(R - r)^2$. A wheel covers one circumference per revolution.`, key_terms: [{ term: 'Ring (annulus)', definition_md: 'The region between two concentric circles.' }], formulas: [{ latex: 'A = \\pi r^2, \\quad C = 2\\pi r', label: 'Circle' }, { latex: 'A_{\\text{ring}} = \\pi(R^2 - r^2)', label: 'Ring' }], visual: piTable, topic_ids: [topic(3)] },
    { heading: '2. Sectors and arcs', body_md: r`Two radii divide a circle into a **minor sector** (angle $\theta$) and a **major sector** (angle $360^\circ - \theta$). A sector of angle $\theta$ is the fraction $\dfrac{\theta}{360}$ of the circle, so

$$\text{Area} = \frac{\theta}{360} \times \pi r^2, \qquad \text{Arc length } l = \frac{\theta}{360} \times 2\pi r.$$

Perimeter of a sector $= l + 2r$. Also $\text{Area} = \dfrac12 lr$.

*Example:* $r = 21$ cm, $\theta = 60^\circ$: area $231$ cm², arc $22$ cm, perimeter $64$ cm.`, key_terms: [{ term: 'Sector', definition_md: 'The region between two radii and the arc between them.' }, { term: 'Quadrant', definition_md: 'A sector of angle $90^\\circ$.' }], formulas: [{ latex: '\\frac{\\theta}{360} \\times \\pi r^2', label: 'Area of a sector' }, { latex: '\\frac{\\theta}{360} \\times 2\\pi r', label: 'Length of an arc' }, { latex: 'A = \\frac12 l r', label: 'Area from the arc' }], visual: figs.parts, visuals: [fractionTable], topic_ids: [topic(1)] },
    { heading: '3. Finding the angle first; working backwards', body_md: r`Many problems hide the angle:
- **Clocks:** minute hand $6^\circ$ per minute; hour hand $0.5^\circ$ per minute.
- **Equal slices:** $n$ equal sectors have angle $\dfrac{360^\circ}{n}$ (a $24$-spoke wheel: $15^\circ$).
- **Fractions:** a sector that is $\dfrac15$ of the circle has angle $72^\circ$.

**Backwards:** from an arc, $\dfrac{\theta}{360} = \dfrac{l}{2\pi r}$ (pendulum $35$ cm, arc $22$ cm gives $36^\circ$); from an area, $\dfrac{\theta}{360} = \dfrac{A}{\pi r^2}$.

For the same angle, sector areas are in the ratio of $r^2$ and arcs in the ratio of $r$.`, key_terms: [], formulas: [{ latex: '\\frac{\\theta}{360} = \\frac{l}{2\\pi r} = \\frac{A}{\\pi r^2}', label: 'Working backwards' }], visual: clockTable, visuals: [figs.pendulum], topic_ids: [topic(1)] },
    { heading: '4. Segments', body_md: r`A chord divides a circle into a **minor segment** and a **major segment**.

$$\text{Minor segment} = \text{sector } OAB - \triangle OAB, \qquad \text{Major segment} = \pi r^2 - \text{minor segment}.$$

The syllabus uses central angles of $60^\circ$, $90^\circ$ and $120^\circ$:
- $90^\circ$: $\triangle OAB = \dfrac12 r^2$.
- $60^\circ$: $\triangle OAB$ is equilateral, area $\dfrac{\sqrt3}{4}r^2$.
- $120^\circ$: drop $OM \perp AB$; $OM = \dfrac r2$, $AB = \sqrt3\,r$, area $\dfrac{\sqrt3}{4}r^2$.

Perimeter of a segment $=$ arc $+$ chord ($90^\circ$: chord $= r\sqrt2$; $60^\circ$: chord $= r$; $120^\circ$: chord $= r\sqrt3$).`, key_terms: [{ term: 'Segment', definition_md: 'The region between a chord and an arc of a circle.' }], formulas: [{ latex: '\\left(\\frac{\\pi}{4} - \\frac12\\right)r^2', label: 'Minor segment, 90°' }, { latex: '\\left(\\frac{\\pi}{6} - \\frac{\\sqrt3}{4}\\right)r^2', label: 'Minor segment, 60°' }, { latex: '\\left(\\frac{\\pi}{3} - \\frac{\\sqrt3}{4}\\right)r^2', label: 'Minor segment, 120°' }], visual: triTable, visuals: [figs.seg120], topic_ids: [topic(2)] },
    { heading: '5. Shaded regions', body_md: r`Plan: **whole $\pm$ pieces**, checking overlaps.

Useful facts:
- Four equal quadrants at the corners of a square make one full circle.
- The three corner sectors (equal radius) of any triangle make a semicircle, since the angles add to $180^\circ$.
- A leaf between two quadrants on a square's diagonal $=$ two $90^\circ$ segments $=$ quadrant $+$ quadrant $-$ square.
- The region inside a circle but outside an inscribed square is four $90^\circ$ segments.

*Examples:* tile $28$ cm with corner quadrants and a central circle, radius $7$: $784 - 154 - 154 = 476$ cm². Equilateral triangle side $20$ with corner sectors of radius $10$: $173 - 157 = 16$ cm².`, key_terms: [], formulas: [], visual: strategy, visuals: [figs.tile, figs.leaf14, figs.triSectors], topic_ids: [topic(3)] },
    { heading: '6. Perimeters of curved figures', body_md: r`Walk round the boundary and add every piece:
- sector: arc $+ 2r$;
- segment: arc $+$ chord;
- a quadrant-cornered park edge: straight parts $+$ arcs (four quadrant arcs $= 2\pi r$);
- a ring track: the outer edge exceeds the inner edge by $2\pi \times$ width.

*Example:* quadrant of radius $14$ cm: arc $22$ cm, perimeter $50$ cm; $90^\circ$ segment of radius $14$ cm: $22 + 14\sqrt2 \approx 41.80$ cm.`, key_terms: [{ term: 'Perimeter', definition_md: 'The total length of the boundary of a region.' }], formulas: [{ latex: 'P_{\\text{sector}} = \\frac{\\theta}{360} \\times 2\\pi r + 2r', label: 'Perimeter of a sector' }], visual: figs.segPerimeter, topic_ids: [topic(1), topic(3)] },
  ],
  exam_tips_md: r`**How marks are awarded**
- *Sector / arc (2 marks):* formula with $\dfrac{\theta}{360}$ 1; answer with unit 1.
- *Segment (3 marks):* sector 1; triangle 1; difference 1.
- *Shaded region (3–5 marks):* plan 1; each component 1; final answer 1.

**Common mistakes**
1. $2\pi r$ in an area, or $\pi r^2$ in an arc.
2. Forgetting the two radii in the perimeter of a sector (or adding radii to a segment's perimeter).
3. $\dfrac12 r^2$ used for a $60^\circ$ or $120^\circ$ triangle.
4. $\pi(R - r)^2$ for a ring.
5. A different value of $\pi$ from the one given; rounding too early.
6. Missing units: cm for lengths, cm² for areas.`,
  status: 'draft', provenance: d1.provenance,
};

const fc = (id, front_md, back_md, tag, t) => ({ id, front_md, back_md, tag, topic_id: topic(t) });
const flashcards = {
  unit: 'cbse-10-mathematics-ch11', version: 1, language: 'en',
  cards: [
    fc('f01', 'What is a **sector**?', 'The region between two radii and the arc between them.', 'definition', 1),
    fc('f02', 'Area of a sector of angle $\\theta$?', '$\\dfrac{\\theta}{360} \\times \\pi r^2$', 'formula', 1),
    fc('f03', 'Length of an arc of angle $\\theta$?', '$\\dfrac{\\theta}{360} \\times 2\\pi r$', 'formula', 1),
    fc('f04', 'Perimeter of a sector?', 'Arc $+ 2r$.', 'formula', 1),
    fc('f05', 'Area of a sector from its arc $l$?', '$\\dfrac12 lr$', 'formula', 1),
    fc('f06', 'A sector of $90^\\circ$ is called…', 'A quadrant.', 'definition', 1),
    fc('f07', 'Angle of the major sector if the minor sector is $\\theta$?', '$360^\\circ - \\theta$', 'concept', 1),
    fc('f08', 'Minute hand: degrees per minute?', '$6^\\circ$', 'fact', 1),
    fc('f09', 'Hour hand: degrees per minute?', '$0.5^\\circ$', 'fact', 1),
    fc('f10', '$r = 21$ cm, $\\theta = 60^\\circ$, $\\pi = \\dfrac{22}{7}$: area and arc?', '$231$ cm² and $22$ cm.', 'example', 1),
    fc('f11', 'Same angle, radii in ratio $1 : 2$. Ratio of sector areas?', '$1 : 4$ (area $\\propto r^2$).', 'concept', 1),
    fc('f12', 'Pendulum $35$ cm, arc $22$ cm: angle?', '$36^\\circ$', 'example', 1),
    fc('f13', 'What is a **segment** of a circle?', 'The region between a chord and an arc.', 'definition', 2),
    fc('f14', 'Area of a minor segment?', 'Sector $OAB$ $-$ $\\triangle OAB$.', 'formula', 2),
    fc('f15', 'Area of a major segment?', '$\\pi r^2 -$ minor segment.', 'formula', 2),
    fc('f16', '$\\triangle OAB$ for $90^\\circ$?', '$\\dfrac12 r^2$', 'formula', 2),
    fc('f17', '$\\triangle OAB$ for $60^\\circ$ or $120^\\circ$?', '$\\dfrac{\\sqrt3}{4}r^2$', 'formula', 2),
    fc('f18', 'Why is $\\triangle OAB$ equilateral for $60^\\circ$?', '$OA = OB$, so the base angles are equal; they add to $120^\\circ$, so each is $60^\\circ$.', 'concept', 2),
    fc('f19', 'For $120^\\circ$, the perpendicular $OM$ to the chord has length…', '$\\dfrac r2$ (and $AB = \\sqrt3\\,r$).', 'diagram', 2),
    fc('f20', 'Minor segment, $r = 14$, $90^\\circ$, $\\pi = \\dfrac{22}{7}$?', '$154 - 98 = 56$ cm²', 'example', 2),
    fc('f21', 'Which central angles does the syllabus use for segments?', '$60^\\circ$, $90^\\circ$ and $120^\\circ$.', 'exam-tip', 2),
    fc('f22', 'Perimeter of a segment?', 'Arc $+$ chord.', 'formula', 2),
    fc('f23', 'Area of a ring, radii $R$ and $r$?', '$\\pi(R^2 - r^2)$', 'formula', 3),
    fc('f24', 'Four equal quadrants at the corners of a square add up to…', 'One full circle.', 'concept', 3),
    fc('f25', 'Three equal-radius sectors at the corners of a triangle add up to…', 'A semicircle (angles sum to $180^\\circ$).', 'concept', 3),
    fc('f26', 'Leaf between two quadrants on a square of side $a$?', 'Two $90^\\circ$ segments: $2\\left(\\dfrac{\\pi}{4} - \\dfrac12\\right)a^2$.', 'diagram', 3),
    fc('f27', 'Plan for any shaded region?', 'Whole $\\pm$ pieces, checking for overlaps.', 'exam-tip', 3),
    fc('f28', 'Revolutions of a wheel to cover a distance $d$?', '$\\dfrac{d}{2\\pi r}$ (same units).', 'formula', 3),
    fc('f29', 'Circumference and area numerically equal: radius?', '$2$ units.', 'example', 3),
    fc('f30', 'Common slip with $\\pi$?', 'Using $3.14$ when the question says $\\dfrac{22}{7}$ (or the reverse).', 'exam-tip', 3),
  ],
  status: 'draft', provenance: d1.provenance,
};

const release = {
  unit: 'cbse-10-mathematics-ch11', version: 1, academic_year: '2026-27', created_at: '2026-10-27T00:00:00+05:30',
  decks: [d1, d2], notes, flashcards, questions: [],
  build: { run_id: null, checks: { syllabus: 'topics t01–t03 only; segments only for central angles 60°, 90° and 120° (syllabus LO); combinations of plane figures appear only as simple shaded regions inside problems (the separate section is deleted). Every stem states the value of π (and √3 where needed) used in the key.' } },
};
const tests = chapterTests('Areas Related to Circles', {
  A: ['m02', 'm07', 'ar1', 'tf5'],
  B: ['s203', 's208', 's302'],
  C: ['l01', 'l03'],
  D: ['c01'],
}, {
  A: ['m03', 'm05', 'm10', 'm12', 'm13', 'm14', 'm17', 'ar3', 'ar4', 'ar6'],
  B: ['s201', 's202', ['s205', 's206'], 's301', ['s304', 's307']],
  C: ['l04', ['l05', 'l02']],
  D: ['c02', 'c04'],
});
build({ dir: DIR, release, testsSpec: tests });
