// Build CBSE 10 Mathematics ch12 Surface Areas and Volumes. Run from platform/:
//   npx tsx content/authored/maths/cbse-10-mathematics-ch12/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, topic, deck, sl, table, flow, build, chapterTests, r } from '../../cbse-10-mathematics-ch10/src/lib.mjs';
import { figs } from './figs.mjs';

setUnit('cbse-10-mathematics-ch12');
await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const formulaTable = table(['Solid', 'Curved / lateral surface', 'Total surface', 'Volume'], [['Cuboid $l \\times b \\times h$', '$2h(l + b)$', '$2(lb + bh + hl)$', '$lbh$'], ['Cube, edge $a$', '$4a^2$', '$6a^2$', '$a^3$'], ['Cylinder', '$2\\pi rh$', '$2\\pi r(r + h)$', '$\\pi r^2h$'], ['Cone', '$\\pi rl$', '$\\pi r(l + r)$', '$\\dfrac13\\pi r^2h$'], ['Sphere', '—', '$4\\pi r^2$', '$\\dfrac43\\pi r^3$'], ['Hemisphere', '$2\\pi r^2$', '$3\\pi r^2$', '$\\dfrac23\\pi r^3$']], 'Formula table for six solids: cuboid, cube, cylinder, cone, sphere and hemisphere, giving the curved or lateral surface area, the total surface area and the volume of each.', 'Learn this table: every combined solid is built from it.');
const visibleTable = table(['Combined solid', 'Hidden faces', 'Surface area'], [['Cone on cylinder (tent, no floor)', 'joining circle, floor', '$2\\pi rh + \\pi rl$'], ['Hemisphere on cone (kulfi)', 'joining circle', '$\\pi rl + 2\\pi r^2$'], ['Cylinder with two hemispherical ends', 'both end circles', '$2\\pi rh + 4\\pi r^2$'], ['Hemisphere scooped from a cube', 'circle cut from the face', '$6a^2 - \\pi r^2 + 2\\pi r^2$']], 'Table of combined solids: a tent loses the joining circle and the floor; a kulfi loses the joining circle; a capsule loses both end circles; a cube with a hemispherical hollow loses a circle from one face but gains the bowl.', 'Add the surfaces you can touch from outside; drop the joined faces.');
const unitTable = table(['From', 'To', 'Multiply by'], [['m³', 'litres', '$1000$'], ['litres', 'cm³', '$1000$'], ['m³', 'cm³', '$1000000$'], ['cm³', 'litres', '$\\dfrac{1}{1000}$']], 'Unit conversion table: cubic metres to litres multiply by 1000; litres to cubic centimetres multiply by 1000; cubic metres to cubic centimetres multiply by one million; cubic centimetres to litres divide by 1000.', '$1$ m³ $= 1000$ L and $1$ L $= 1000$ cm³.');
const saFlow = flow('LR', [['s', 'Split into basic solids'], ['h', 'Cross out joined (hidden) faces'], ['a', 'Add the visible surfaces'], ['u', 'Answer in square units']], [['s', 'h'], ['h', 'a'], ['a', 'u']], 'Flow for surface area of a combined solid: split it into basic solids, cross out the joined faces, add the visible surfaces, and answer in square units.', 'Surface area: visible faces only.');
const vFlow = flow('LR', [['s', 'Split into basic solids'], ['j', 'Joined: add volumes'], ['c', 'Cut out: subtract volumes'], ['u', 'Answer in cubic units (or litres)']], [['s', 'j'], ['s', 'c'], ['j', 'u'], ['c', 'u']], 'Flow for volume of a combined solid: split it into basic solids, add the volumes of parts that are joined, subtract the volumes of parts that are cut out, and answer in cubic units or litres.', 'Volume: add what is joined, subtract what is removed.');
const sum1 = table(['Idea', 'Rule'], [['Slant height', '$l = \\sqrt{r^2 + h^2}$'], ['Joined faces', 'never counted'], ['Hemisphere on a solid', 'use $2\\pi r^2$, not $3\\pi r^2$'], ['Scoop a hemisphere', 'surface $-\\pi r^2 + 2\\pi r^2$'], ['Open objects', 'no lid, no floor: leave those faces out']], 'Summary table of part one: slant height is the square root of r squared plus h squared; joined faces are never counted; a hemisphere on a solid uses its curved surface 2 pi r squared; scooping a hemisphere removes pi r squared and adds 2 pi r squared; open objects have no lid or floor.', 'Surface area rules.');
const sum2 = table(['Situation', 'Volume'], [['Two solids joined', 'sum of volumes'], ['Solid cut out', 'difference of volumes'], ['Cone on hemisphere', '$\\dfrac13\\pi r^2(h + 2r)$'], ['Cylinder $+$ cone (same $r$)', '$\\pi r^2\\left(h_1 + \\dfrac{h_2}{3}\\right)$'], ['Capacity', 'm³ $\\times 1000 =$ litres']], 'Summary table of part two: joined solids add volumes, cut-outs subtract; a cone on a hemisphere has volume one third pi r squared times h plus 2 r; a cylinder with a cone has pi r squared times h1 plus h2 over 3; cubic metres times 1000 gives litres.', 'Volume rules.');

const d1 = deck({
  part: 1,
  title: 'Surface Areas and Volumes — Part 1: Surface area of combined solids',
  goals: ['Recall the surface-area formulas of the six basic solids', 'Find the slant height of a cone', 'Decide which faces are visible when two solids are joined', 'Find the surface area of combinations of two solids in real objects', 'Handle solids with a part scooped out'],
  slides: [
    sl('title', 'Surface Areas and Volumes, Part 1: Surface area of combined solids', { b: 'A kulfi is a cone and a hemisphere. What is its surface?', v: figs.kulfi, n: 'Welcome to Surface Areas and Volumes. Look at a kulfi: it is a cone topped with a hemisphere. A tent is a cylinder with a cone on top, and a gas cylinder is a cylinder with two hemispheres. In this part we find the surface area of such combined solids. The one new idea is to count only the faces you can see.' }),
    sl('concept', 'What you will be able to do', { ul: ['Use the surface-area formulas for **cuboid, cube, cylinder, cone, sphere, hemisphere**', 'Find a cone\'s **slant height**', 'Spot the **hidden faces** when solids are joined', 'Find surface areas of tents, kulfis, toys and tanks', 'Handle a hemisphere **scooped out** of a solid'], n: 'These are your goals for part one. You met these six solids in class nine. This year the syllabus combines any two of them, as in real objects. Note that converting one solid into another, and the frustum of a cone, are not in the syllabus this year.' }),
    sl('diagram', 'The six basic solids', { b: 'Every combined solid in this chapter is made of two of these.', v: formulaTable, n: 'Here is the formula table for the six solids. For each one, know the curved surface, the total surface and the volume. Notice the hemisphere: its curved surface is two pi r squared, half a sphere, and its total surface adds the flat circle, three pi r squared. That difference matters a lot in combined solids.' }),
    sl('diagram', 'The slant height of a cone', { b: 'The radius $r$, height $h$ and slant height $l$ form a right triangle:', m: ['l = \\sqrt{r^2 + h^2}'], v: figs.coneLabels, n: 'The curved surface of a cone uses the slant height l, not the vertical height h. The radius, the height and the slant height form a right triangle, with l as the hypotenuse. So l is the square root of r squared plus h squared. Use h for volume and l for surface area. Mixing them up is the most common mistake in this chapter.' }),
    sl('check', 'Quick check: curved surface of a cone', { b: 'Which length goes into $\\pi rl$?', chk: 'm09', n: 'The curved surface needs the slant height. Is it given, or do you need Pythagoras first?' }),
    sl('concept', 'Joining solids hides faces', { b: 'When two solids are joined, the faces in contact go **inside**. The surface area of the combination is the sum of the **visible** surfaces only.', ul: ['Cone on a cylinder: the top of the cylinder and the base of the cone are hidden', 'Hemisphere on a cone: use the hemisphere\'s **curved** surface $2\\pi r^2$', 'So: TSA of a combination $\\ne$ sum of TSAs'], v: visibleTable, n: 'Imagine painting a combined solid. You can only paint what you can touch from outside. Where two solids are glued, the faces in contact disappear inside. So never add total surface areas blindly. List the visible pieces: usually curved surfaces, plus any flat face that is still outside, such as the bottom of a rocket.' }),
    sl('example', 'Worked example 1: a camp tent', { b: 'A tent at a school camp in Manali is a cylinder of radius $3.5$ m and height $3$ m with a conical top of height $1.2$ m. Find the canvas needed and its cost at ₹$500$ per m². (Use $\\pi = \\dfrac{22}{7}$.)', ul: ['**Step 1 —** $l = \\sqrt{3.5^2 + 1.2^2} = \\sqrt{12.25 + 1.44} = \\sqrt{13.69} = 3.7$ m.', '**Step 2 —** Canvas $= 2\\pi rh + \\pi rl = \\dfrac{22}{7} \\times 3.5 \\times (6 + 3.7) = 11 \\times 9.7 = 106.7$ m².', '**Step 3 —** Cost $= 106.7 \\times 500 = $ ₹$53350$.', '**Why —** No floor, and the joining circle is open inside the tent.'], v: figs.tent, n: 'A tent has no floor, and inside it there is no wall where the cone meets the cylinder. So the canvas is just the two curved surfaces. Find the slant height first: three point seven metres. Then take pi r out as a common factor: eleven times nine point seven gives one hundred and six point seven square metres.' }),
    sl('example', 'Worked example 2: wrapping a kulfi', { b: 'A kulfi is a cone of radius $3.5$ cm and height $12$ cm with a hemisphere of radius $3.5$ cm on top. Find the area of foil that covers it completely. (Use $\\pi = \\dfrac{22}{7}$.)', ul: ['**Step 1 —** $l = \\sqrt{3.5^2 + 12^2} = \\sqrt{12.25 + 144} = \\sqrt{156.25} = 12.5$ cm.', '**Step 2 —** Visible: curved cone $\\pi rl$ and curved hemisphere $2\\pi r^2$.', '**Step 3 —** Foil $= \\pi r(l + 2r) = \\dfrac{22}{7} \\times 3.5 \\times (12.5 + 7) = 11 \\times 19.5 = 214.5$ cm².', '**Trap —** $3\\pi r^2$ would wrongly add the hidden flat circle.'], v: figs.kulfi, n: 'The flat face of the hemisphere is glued to the base of the cone, so neither is outside. That leaves two curved surfaces. Taking pi r common keeps the arithmetic short: eleven times nineteen point five, two hundred and fourteen point five square centimetres. If you wrote three pi r squared for the hemisphere, you counted a hidden circle.' }),
    sl('check', 'Quick check: which faces count?', { b: 'Picture painting the solid.', chk: 'm04', n: 'Which circle disappears when the hemisphere sits on the cylinder? Which flat face can you still touch?' }),
    sl('example', 'Worked example 3: a hemisphere scooped out', { b: 'A hemisphere of radius $3$ cm is scooped out of the top face of a wooden cube of edge $10$ cm. Find the total surface area of the remaining solid. (Use $\\pi = 3.14$.)', ul: ['**Step 1 —** Cube $= 6 \\times 100 = 600$ cm².', '**Step 2 —** The top face loses a circle: $-\\pi r^2$. The hollow adds a bowl: $+2\\pi r^2$.', '**Step 3 —** Net change $= +\\pi r^2 = 3.14 \\times 9 = 28.26$ cm².', '**Answer —** $600 + 28.26 = 628.26$ cm².'], v: figs.cubeScoop, n: 'Scooping makes the surface bigger, which surprises many students. A circle disappears from the top face, but the inside of the bowl becomes new surface, and the bowl is twice the circle. So the net change is plus one pi r squared, twenty eight point two six square centimetres, giving six hundred and twenty eight point two six.' }),
    sl('example', 'Worked example 4: an oil tanker', { b: 'The body of an oil tanker is a cylinder $7$ m long and of radius $1.4$ m, with a hemisphere at each end. Find the area to be painted and the cost at ₹$120$ per m². (Use $\\pi = \\dfrac{22}{7}$.)', ul: ['**Step 1 —** Cylinder: $2\\pi rh = 2 \\times \\dfrac{22}{7} \\times 1.4 \\times 7 = 61.6$ m².', '**Step 2 —** Two hemispheres $=$ one sphere: $4\\pi r^2 = 4 \\times \\dfrac{22}{7} \\times 1.96 = 24.64$ m².', '**Step 3 —** Area $= 61.6 + 24.64 = 86.24$ m².', '**Step 4 —** Cost $= 86.24 \\times 120 = $ ₹$10348.80$.'], v: figs.capsule, n: 'Both flat ends of the cylinder are covered by hemispheres, so they vanish. What remains is the curved surface of the cylinder and two curved hemispheres, which together make a whole sphere. Add them: eighty six point two four square metres. Multiply by the rate for the cost. Always check that the rate and the area use the same unit.' }),
    sl('diagram', 'Planning a surface-area answer', { b: 'Write the plan in one line before calculating: it earns a mark and avoids hidden faces.', v: saFlow, n: 'Here is a four-step plan. Split the object into basic solids. Cross out every face that is joined, and any face that is open, like the floor of a tent. Add the visible surfaces, taking common factors such as pi r. Finally write the unit, square metres or square centimetres.' }),
    sl('check', 'Quick check: scooping changes the surface', { b: 'What is removed, and what is added?', chk: 'tf5', n: 'When you scoop out a bowl, which flat area is lost and which curved area appears? Compare them.' }),
    sl('example', 'Worked example 5: a painted toy', { b: 'A wooden toy is a cone of radius $7$ cm and height $24$ cm standing on a hemisphere of radius $7$ cm. Find the area to be painted. (Use $\\pi = \\dfrac{22}{7}$.)', ul: ['**Step 1 —** $l = \\sqrt{7^2 + 24^2} = \\sqrt{625} = 25$ cm.', '**Step 2 —** Curved cone $= \\pi rl = \\dfrac{22}{7} \\times 7 \\times 25 = 550$ cm².', '**Step 3 —** Curved hemisphere $= 2\\pi r^2 = 308$ cm².', '**Answer —** $550 + 308 = 858$ cm².'], v: figs.toy, n: 'This is the kulfi turned upside down: a cone on a hemisphere. Again the two flat circles are glued together. The slant height comes from the seven, twenty four, twenty five triangle. Add the curved cone, five hundred and fifty, and the curved hemisphere, three hundred and eight: eight hundred and fifty eight square centimetres.' }),
    sl('summary', 'Summary', { ul: ['Six basic solids — learn their CSA, TSA and volume', '$l = \\sqrt{r^2 + h^2}$; use $l$ for surface, $h$ for volume', 'Combined solid: add **visible** surfaces only', 'Hemisphere glued on: $2\\pi r^2$; two hemispheres $= 4\\pi r^2$', 'Scooped hemisphere: net $+\\pi r^2$'], v: sum1, n: 'To sum up part one. Start from the six basic formulas. Find the slant height when a cone is involved. For combined solids, count only the visible faces: glued faces and open faces are left out. And remember the surprising rule: scooping out a hemisphere increases the surface area by pi r squared.' }),
    sl('exam-tips', 'Exam tips: how marks are awarded', { ul: ['**Surface area (3 marks):** slant height 1 + correct visible faces 1 + answer with unit 1', '**Cost questions:** area 1 + rate × area 1', '**Mistake:** using $h$ instead of $l$ in $\\pi rl$', '**Mistake:** $3\\pi r^2$ for a hemisphere that is glued on', '**Mistake:** adding total surface areas of the parts', '**Mistake:** cm² and m² mixed in one answer'], n: 'Show the slant height on its own line; it earns a mark. Then write in words which surfaces you are adding, for example curved surface of cylinder plus curved surface of cone. That sentence shows the examiner you understood the combination. Keep units consistent, and give the final answer with the right square unit.' }),
  ],
});

const d2 = deck({
  part: 2,
  title: 'Surface Areas and Volumes — Part 2: Volume of combined solids',
  goals: ['Recall the volume formulas of the six basic solids', 'Find the volume of two joined solids by adding', 'Find the volume left when a solid is cut out by subtracting', 'Convert between cubic units and litres', 'Solve problems on silos, tanks, toys and containers'],
  slides: [
    sl('title', 'Surface Areas and Volumes, Part 2: Volume of combined solids', { b: 'How much grain does a silo hold?', v: figs.silo, n: 'Welcome to part two. A grain silo is a cylinder with a conical roof. How much grain fits inside? For volume the rule is even simpler than for surface area: joined solids add up, and parts that are cut out are subtracted. We will also convert cubic units into litres for capacity questions.' }),
    sl('concept', 'What you will be able to do', { ul: ['Use the **volume** formulas of the six solids', '**Add** volumes of joined parts', '**Subtract** volumes of parts cut out', 'Convert **m³, cm³ and litres**', 'Solve silo, tank, toy and container problems'], n: 'These are your goals. Unlike surface area, volume does not care about hidden faces: the space inside a combined solid is simply the space of its parts put together. The skill is to identify the parts correctly and to keep track of units.' }),
    sl('diagram', 'Volume of a combined solid', { b: 'Joined solids: **add** the volumes. Cut-outs: **subtract**.', v: vFlow, n: 'Here is the plan. Split the object into basic solids. If two parts are joined, add their volumes. If a part has been cut out, subtract its volume. Then write the answer in cubic units, or convert to litres if the question asks for capacity. That is the whole method.' }),
    sl('example', 'Worked example 1: a grain silo', { b: 'A grain silo near Karnal is a cylinder of radius $3.5$ m and height $10$ m with a conical top of height $3$ m. How much grain can it hold? (Use $\\pi = \\dfrac{22}{7}$.)', ul: ['**Step 1 —** $\\pi r^2 = \\dfrac{22}{7} \\times 12.25 = 38.5$ m².', '**Step 2 —** Cylinder $= 38.5 \\times 10 = 385$ m³; cone $= \\dfrac13 \\times 38.5 \\times 3 = 38.5$ m³.', '**Step 3 —** Total $= 385 + 38.5 = 423.5$ m³.', '**Shortcut —** $\\pi r^2\\left(h_1 + \\dfrac{h_2}{3}\\right) = 38.5 \\times 11$ ✓.'], v: figs.silo, n: 'Both parts share the same base area, pi r squared, thirty eight point five square metres. Compute it once. The cylinder holds base times height; the cone holds one third of base times height. Adding gives four hundred and twenty three point five cubic metres. The shortcut factorises the base area out of both terms.' }),
    sl('check', 'Quick check: volume of a rocket', { b: 'Do not forget the $\\dfrac13$ for the cone.', chk: 'm08', n: 'Find the cylinder and the cone separately. Which option forgets the one third?' }),
    sl('example', 'Worked example 2: how much kulfi?', { b: 'Find the volume of the kulfi from part 1: a cone of radius $3.5$ cm and height $12$ cm with a hemisphere of radius $3.5$ cm on top. (Use $\\pi = \\dfrac{22}{7}$.)', ul: ['**Step 1 —** $\\pi r^2 = 38.5$ cm².', '**Step 2 —** Cone $= \\dfrac13 \\times 38.5 \\times 12 = 154$ cm³.', '**Step 3 —** Hemisphere $= \\dfrac23 \\times 38.5 \\times 3.5 \\approx 89.83$ cm³.', '**Answer —** $154 + 89.83 = 243.83$ cm³; or $\\dfrac13\\pi r^2(h + 2r) = \\dfrac13 \\times 38.5 \\times 19$ ✓.'], v: figs.kulfi, n: 'Add the cone and the hemisphere. Both use pi r squared, so again compute it once. The cone gives one hundred and fifty four, the hemisphere about eighty nine point eight three, so the kulfi holds about two hundred and forty three point eight three cubic centimetres. The general formula, one third pi r squared times h plus two r, is a neat check.' }),
    sl('example', 'Worked example 3: a hollow scooped out', { b: 'A wooden paint palette is a block $20$ cm $\\times$ $14$ cm $\\times$ $5$ cm with a hemispherical well of radius $3.5$ cm in its top. Find the volume of wood. (Use $\\pi = \\dfrac{22}{7}$.)', ul: ['**Step 1 —** Block $= 20 \\times 14 \\times 5 = 1400$ cm³.', '**Step 2 —** Well $= \\dfrac23 \\times \\dfrac{22}{7} \\times 3.5^3 = \\dfrac23 \\times 134.75 \\approx 89.83$ cm³.', '**Step 3 —** Wood $= 1400 - 89.83 = 1310.17$ cm³.', '**Check —** The well is $3.5$ cm deep, less than the $5$ cm block ✓.'], v: figs.wellBlock, n: 'Here a part is removed, so subtract. The block is fourteen hundred cubic centimetres and the hemispherical well is about eighty nine point eight three. The wood left is thirteen hundred and ten point one seven cubic centimetres. Notice the contrast with surface area, where scooping added area: volume always goes down when you remove material.' }),
    sl('example', 'Worked example 4: a test tube', { b: 'A test tube is a cylinder of radius $1$ cm and height $14$ cm with a hemispherical bottom of radius $1$ cm. Find how much liquid it can hold. (Use $\\pi = 3.14$.)', ul: ['**Step 1 —** Cylinder $= 3.14 \\times 1 \\times 14 = 43.96$ cm³.', '**Step 2 —** Hemisphere $= \\dfrac23 \\times 3.14 \\times 1 \\approx 2.09$ cm³.', '**Step 3 —** Capacity $\\approx 43.96 + 2.09 = 46.05$ cm³.', '**Note —** That is about $46$ mL.'], v: figs.testTube, n: 'Capacity means the volume of the inside. The test tube is a cylinder with a hemisphere at the bottom, so add them. The hemisphere is small here, about two cubic centimetres, but leaving it out would still lose a mark. One cubic centimetre is one millilitre, so the tube holds about forty six millilitres.' }),
    sl('check', 'Quick check: a cube with a hollow', { b: 'Remove the hemisphere\'s volume from the cube.', chk: 'm11', n: 'Find the cube and the hemisphere. Do you add or subtract?' }),
    sl('diagram', 'Units: cubic metres, cubic centimetres and litres', { b: '$1$ m³ $= 1000$ litres; $1$ litre $= 1000$ cm³ $= 1000$ mL.', v: unitTable, n: 'Capacity questions often ask for litres. One cubic metre holds a thousand litres, and one litre is a thousand cubic centimetres. So if your volume is in cubic metres, multiply by a thousand to get litres. If it is in cubic centimetres, divide by a thousand. Write the conversion as a separate line in your answer.' }),
    sl('example', 'Worked example 5: a water tank', { b: 'A water tank in a Chennai apartment block is a cylinder of radius $2.1$ m and height $4$ m on a hemispherical bottom of radius $2.1$ m. Find its capacity in litres. (Use $\\pi = \\dfrac{22}{7}$.)', ul: ['**Step 1 —** $\\pi r^2 = \\dfrac{22}{7} \\times 4.41 = 13.86$ m²; cylinder $= 13.86 \\times 4 = 55.44$ m³.', '**Step 2 —** Hemisphere $= \\dfrac23 \\times 13.86 \\times 2.1 = 19.404$ m³.', '**Step 3 —** Total $= 55.44 + 19.404 = 74.844$ m³.', '**Answer —** $74.844 \\times 1000 = 74844$ litres.'], v: figs.tank, n: 'Add the cylinder and the hemispherical bottom. A neat trick: the hemisphere volume is two thirds of pi r squared times r, so you can reuse pi r squared again. The total is seventy four point eight four four cubic metres. Multiply by a thousand for litres: seventy four thousand eight hundred and forty four litres.' }),
    sl('example', 'Worked example 6: a cone carved from a cylinder', { b: 'A cone of radius $6$ cm and height $8$ cm is hollowed out of a solid cylinder of the same radius and height. Find the volume and the total surface area of what is left. (Use $\\pi = 3.14$.)', ul: ['**Step 1 —** Volume $= \\pi r^2h - \\dfrac13\\pi r^2h = \\dfrac23 \\times 3.14 \\times 36 \\times 8 = 602.88$ cm³.', '**Step 2 —** Cavity slant height $l = \\sqrt{36 + 64} = 10$ cm.', '**Step 3 —** Surface $= 2\\pi rh + \\pi r^2 + \\pi rl = 3.14 \\times 6 \\times (16 + 6 + 10) = 602.88$ cm².', '**Note —** The two numbers match by coincidence; the units (cm³, cm²) differ.'], v: figs.cylCavity, n: 'For volume, subtract the cone, which is one third of the cylinder, so two thirds is left. For the surface, the top circle is gone, the inside of the cone appears, and the curved side and the bottom remain. Both answers come to six hundred and two point eight eight, a coincidence of these numbers. One is in cubic centimetres, the other in square centimetres.' }),
    sl('check', 'Quick check: litres', { b: 'Convert m³ to litres at the end.', chk: 'm14', n: 'Find the volume in cubic metres first. How many litres are in one cubic metre?' }),
    sl('summary', 'Summary', { ul: ['Joined solids: **add** volumes', 'Cut-outs: **subtract** volumes', 'Compute $\\pi r^2$ once when parts share a base', '$1$ m³ $= 1000$ L; $1$ L $= 1000$ cm³', 'Use $h$ (not $l$) in volume formulas'], v: sum2, n: 'To sum up part two. Volume follows a simple rule: add the parts that are joined and subtract the parts that are removed. Reuse pi r squared when parts share a base. Use the vertical height in volume formulas, never the slant height. And convert cubic metres to litres by multiplying by a thousand.' }),
    sl('exam-tips', 'Exam tips: how marks are awarded', { ul: ['**Volume (3 marks):** each part 1 + sum or difference with unit 1', '**Capacity:** volume 1 + conversion to litres 1', '**Mistake:** forgetting $\\dfrac13$ for a cone or $\\dfrac23$ for a hemisphere', '**Mistake:** using the slant height in a volume', '**Mistake:** total height used as the cylinder height (subtract the hemisphere\'s radius)', '**Mistake:** m³ to litres multiplied by 100'], n: 'Write each part on its own line with its formula; each part earns a mark. Read heights carefully: if the total height of a vessel with a hemispherical bottom is given, the cylinder height is the total minus the radius. Finish with the unit, cubic centimetres, cubic metres or litres, exactly as the question asks.' }),
  ],
});

const notes = {
  unit: 'cbse-10-mathematics-ch12', version: 1, title: 'Surface Areas and Volumes — chapter notes', language: 'en',
  sections: [
    { heading: '1. The six basic solids', body_md: r`| Solid | Curved / lateral surface | Total surface | Volume |
|---|---|---|---|
| Cuboid | $2h(l + b)$ | $2(lb + bh + hl)$ | $lbh$ |
| Cube | $4a^2$ | $6a^2$ | $a^3$ |
| Cylinder | $2\pi rh$ | $2\pi r(r + h)$ | $\pi r^2h$ |
| Cone | $\pi rl$ | $\pi r(l + r)$ | $\frac13\pi r^2h$ |
| Sphere | — | $4\pi r^2$ | $\frac43\pi r^3$ |
| Hemisphere | $2\pi r^2$ | $3\pi r^2$ | $\frac23\pi r^3$ |

Use the value of $\pi$ the question gives. *Not in the 2026–27 syllabus:* conversion of one solid into another (melting, recasting, digging) and the frustum of a cone.`, key_terms: [{ term: 'Curved surface area (CSA)', definition_md: 'The area of the curved part only, without flat faces.' }, { term: 'Total surface area (TSA)', definition_md: 'Curved surface plus all flat faces of a single solid.' }], formulas: [], visual: formulaTable, visuals: [figs.gallery], topic_ids: [topic(1), topic(2)] },
    { heading: '2. The cone and its slant height', body_md: r`For a cone of radius $r$ and vertical height $h$, the slant height is

$$l = \sqrt{r^2 + h^2}.$$

Use $l$ in the curved surface $\pi rl$ and $h$ in the volume $\dfrac13\pi r^2h$. Useful triples: $(5, 12, 13)$, $(7, 24, 25)$, $(21, 20, 29)$, $(3.5, 12, 12.5)$, $(2.8, 2.1, 3.5)$.

A cone and a cylinder with the same base and height: the cone has one-third of the volume.`, key_terms: [{ term: 'Slant height', definition_md: 'The distance from the apex of a cone to any point on the edge of its base.' }], formulas: [{ latex: 'l = \\sqrt{r^2 + h^2}', label: 'Slant height' }], visual: figs.coneLabels, topic_ids: [topic(1)] },
    { heading: '3. Surface area of a combination', body_md: r`**Rule:** add the **visible** surfaces only. Faces in contact are inside the solid; open faces (a tent's floor, a cup's top) are not there.

- Tent (cylinder $+$ cone, no floor): $2\pi rh + \pi rl$.
- Kulfi or toy (cone $+$ hemisphere): $\pi rl + 2\pi r^2$.
- Capsule or tanker (cylinder $+$ two hemispheres): $2\pi rh + 4\pi r^2$.
- Rocket (cylinder $+$ cone, with bottom): $2\pi rh + \pi r^2 + \pi rl$.
- Cube with a cube or cuboid on top: the covered square reappears as the top of the upper block, so add only its side faces.

Joining two solids with a common circle of radius $r$ removes $2\pi r^2$ from the sum of their total surfaces.`, key_terms: [], formulas: [{ latex: 'S = \\pi r l + 2\\pi r^2', label: 'Cone on a hemisphere' }, { latex: 'S = 2\\pi r h + 4\\pi r^2', label: 'Cylinder with two hemispherical ends' }], visual: visibleTable, visuals: [figs.tent, figs.capsule], topic_ids: [topic(1)] },
    { heading: '4. Scooping out and sticking on', body_md: r`- **Scooping a hemisphere** of radius $r$ from a face: the face loses $\pi r^2$, the bowl adds $2\pi r^2$ — surface **increases** by $\pi r^2$; volume **decreases** by $\dfrac23\pi r^3$.
- **Sticking a hemisphere** on a face: the face loses $\pi r^2$ (covered), the dome adds $2\pi r^2$ — surface increases by $\pi r^2$; volume increases by $\dfrac23\pi r^3$.
- **Hollowing a cone** from a cylinder (same $r$, $h$): the top circle goes, the inside of the cone $\pi rl$ appears; volume left $= \dfrac23\pi r^2h$.

*Example:* cube of edge $10$ cm with a hemisphere of radius $3$ cm scooped out: surface $600 + 28.26 = 628.26$ cm².`, key_terms: [], formulas: [{ latex: '\\Delta S = -\\pi r^2 + 2\\pi r^2 = +\\pi r^2', label: 'Scooping a hemisphere' }], visual: figs.cubeScoop, visuals: [figs.cylCavity], topic_ids: [topic(1), topic(2)] },
    { heading: '5. Volume of a combination', body_md: r`**Rule:** joined parts **add**; removed parts **subtract**.

- Cylinder $+$ cone on the same base: $\pi r^2\left(h_1 + \dfrac{h_2}{3}\right)$ (silo $r = 3.5$, $h_1 = 10$, $h_2 = 3$: $423.5$ m³).
- Cone $+$ hemisphere: $\dfrac13\pi r^2(h + 2r)$ (kulfi $r = 3.5$, $h = 12$: $\approx 243.83$ cm³).
- Cylinder $+$ hemisphere: $\pi r^2\left(h + \dfrac{2r}{3}\right)$.
- Block with a hollow: block $-$ hollow.

When the **total** height of a vessel with a hemispherical bottom is given, the cylinder's height is total $-$ $r$. The smallest box around a solid has the same radius and the full height.`, key_terms: [], formulas: [{ latex: 'V = \\frac13\\pi r^2(h + 2r)', label: 'Cone on a hemisphere' }, { latex: 'V = \\pi r^2\\left(h_1 + \\frac{h_2}{3}\\right)', label: 'Cylinder with a cone on top' }], visual: vFlow, visuals: [figs.silo, figs.tank], topic_ids: [topic(2)] },
    { heading: '6. Units and capacity', body_md: r`- $1$ m³ $= 1000$ litres; $1$ litre $= 1000$ cm³ $= 1000$ mL; $1$ m³ $= 10^6$ cm³.
- Capacity is the volume of the inside of a container.
- Cost $=$ area $\times$ rate (per m² or per cm²) or volume $\times$ rate; keep units consistent.

*Example:* tank $74.844$ m³ $= 74844$ litres.`, key_terms: [{ term: 'Capacity', definition_md: 'The volume a container can hold, often in litres.' }], formulas: [{ latex: '1\\ \\text{m}^3 = 1000\\ \\text{L}', label: 'Litres' }], visual: unitTable, topic_ids: [topic(2)] },
  ],
  exam_tips_md: r`**How marks are awarded**
- *Surface area (2–3 marks):* slant height 1; visible faces named 1; answer with unit 1.
- *Volume (2–3 marks):* each part 1; sum or difference with unit 1.
- *Long questions (5 marks):* typically slant height, surface, cost, volume and a conversion, one mark each.

**Common mistakes**
1. Slant height in a volume, or vertical height in $\pi rl$.
2. $3\pi r^2$ for a hemisphere that is glued to another solid.
3. Adding total surface areas of the parts.
4. Forgetting $\dfrac13$ (cone) or $\dfrac23$ (hemisphere).
5. Using the total height as the cylinder's height.
6. Litres: multiply m³ by $1000$, divide cm³ by $1000$.`,
  status: 'draft', provenance: d1.provenance,
};

const fc = (id, front_md, back_md, tag, t) => ({ id, front_md, back_md, tag, topic_id: topic(t) });
const flashcards = {
  unit: 'cbse-10-mathematics-ch12', version: 1, language: 'en',
  cards: [
    fc('f01', 'CSA and TSA of a cylinder?', '$2\\pi rh$ and $2\\pi r(r + h)$', 'formula', 1),
    fc('f02', 'CSA and TSA of a cone?', '$\\pi rl$ and $\\pi r(l + r)$', 'formula', 1),
    fc('f03', 'Slant height of a cone?', '$l = \\sqrt{r^2 + h^2}$', 'formula', 1),
    fc('f04', 'Surface area of a sphere?', '$4\\pi r^2$', 'formula', 1),
    fc('f05', 'CSA and TSA of a hemisphere?', '$2\\pi r^2$ and $3\\pi r^2$', 'formula', 1),
    fc('f06', 'TSA of a cuboid?', '$2(lb + bh + hl)$', 'formula', 1),
    fc('f07', 'Surface area of a combined solid?', 'The sum of the **visible** surfaces only.', 'concept', 1),
    fc('f08', 'Tent canvas (cylinder $+$ cone, no floor)?', '$2\\pi rh + \\pi rl$', 'example', 1),
    fc('f09', 'Kulfi surface (cone $+$ hemisphere)?', '$\\pi rl + 2\\pi r^2$', 'example', 1),
    fc('f10', 'Capsule surface (cylinder $+$ two hemispheres)?', '$2\\pi rh + 4\\pi r^2$', 'example', 1),
    fc('f11', 'Scooping a hemisphere out of a face changes the surface by…', '$+\\pi r^2$ (lose $\\pi r^2$, gain $2\\pi r^2$).', 'concept', 1),
    fc('f12', 'Joining two solids along a circle of radius $r$ removes how much surface?', '$2\\pi r^2$ (one circle from each solid).', 'concept', 1),
    fc('f13', 'Common slip with a glued hemisphere?', 'Using $3\\pi r^2$ instead of $2\\pi r^2$.', 'exam-tip', 1),
    fc('f14', 'Use $h$ or $l$ in $\\pi r\\,?$ for the cone\'s curved surface?', '$l$, the slant height.', 'exam-tip', 1),
    fc('f15', 'Two cubes of edge $a$ joined face to face: surface?', '$10a^2$', 'example', 1),
    fc('f16', 'Volume of a cylinder?', '$\\pi r^2h$', 'formula', 2),
    fc('f17', 'Volume of a cone?', '$\\dfrac13\\pi r^2h$', 'formula', 2),
    fc('f18', 'Volume of a sphere and of a hemisphere?', '$\\dfrac43\\pi r^3$ and $\\dfrac23\\pi r^3$', 'formula', 2),
    fc('f19', 'Volume of a combined solid?', 'Add joined parts; subtract parts cut out.', 'concept', 2),
    fc('f20', 'Volume of a cone on a hemisphere (same $r$)?', '$\\dfrac13\\pi r^2(h + 2r)$', 'formula', 2),
    fc('f21', 'Volume of a cylinder with a cone on top (same $r$)?', '$\\pi r^2\\left(h_1 + \\dfrac{h_2}{3}\\right)$', 'formula', 2),
    fc('f22', 'A cone is carved from a cylinder with the same base and height. Fraction left?', '$\\dfrac23$', 'concept', 2),
    fc('f23', '$1$ m³ in litres?', '$1000$ litres', 'fact', 2),
    fc('f24', '$1$ litre in cm³?', '$1000$ cm³', 'fact', 2),
    fc('f25', 'Vessel: total height $H$, hemispherical bottom of radius $r$. Cylinder height?', '$H - r$', 'exam-tip', 2),
    fc('f26', 'Cone and cylinder, same base and height: ratio of volumes?', '$1 : 3$', 'fact', 2),
    fc('f27', 'Hemisphere and cone, same $r$, cone height $r$: ratio of volumes?', '$2 : 1$', 'example', 2),
    fc('f28', 'Common slip in volume of a cone?', 'Forgetting the $\\dfrac13$, or using $l$ instead of $h$.', 'exam-tip', 2),
    fc('f29', 'Which two topics are NOT in the 2026–27 syllabus for this chapter?', 'Conversion of solids from one shape to another, and the frustum of a cone.', 'exam-tip', 2),
    fc('f30', 'Picture: cylinder with a cone hollowed from its top. Surfaces?', 'Curved cylinder $+$ bottom circle $+$ inside of the cone.', 'diagram', 1),
  ],
  status: 'draft', provenance: d1.provenance,
};

const release = {
  unit: 'cbse-10-mathematics-ch12', version: 1, academic_year: '2026-27', created_at: '2026-10-27T00:00:00+05:30',
  decks: [d1, d2], notes, flashcards, questions: [],
  build: { run_id: null, checks: { syllabus: 'topics t01–t02 only (surface area and volume of combinations of two of cube, cuboid, sphere, hemisphere, cylinder, cone); removed topics absent: no conversion of solids (no melting, recasting, digging or flow problems) and no frustum anywhere, including distractors.' } },
};
const tests = chapterTests('Surface Areas and Volumes', {
  A: ['m02', 'm07', 'ar1', 'tf2'],
  B: ['s203', 's207', 's304'],
  C: ['l01', 'l05'],
  D: ['c02'],
}, {
  A: ['m03', 'm06', 'm08', 'm10', 'm11', 'm15', 'm16', 'ar3', 'ar4', 'ar6'],
  B: ['s201', 's202', ['s204', 's205'], 's301', ['s303', 's306']],
  C: ['l03', ['l04', 'l06']],
  D: ['c01', 'c04'],
});
build({ dir: DIR, release, testsSpec: tests });
