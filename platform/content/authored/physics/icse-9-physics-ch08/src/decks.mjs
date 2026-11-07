// ICSE 9 Physics ch08 Reflection of Light at Plane Mirrors. Deck 1: laws of reflection, the pin experiment, the image in a plane
// mirror and uses (t01, t02). Deck 2: images in two mirrors, parallel and inclined (t03). Numbers come from calc.mjs; narration
// carries no digits, symbols or unit abbreviations.
import { sl, deck, table, flow, svgV, r } from '../../icse-9-physics-ch01/src/lib.mjs';
import { LAWS, PINS, IMAGE, LATERAL, PARALLEL_IMAGES, INCL90, INCL60, PERI } from './svgs.mjs';
import { LAW_I, PIN_I, PIN_R, D1, D1_DIST, PAR, PAR_IM, PAR_I2, PAR_OBJ_I2, N_TABLE, D2_INCL, D2_EX2 } from './calc.mjs';

export const V = {
  laws: svgV(LAWS, 'A ray reflected at a plane mirror with the normal and the equal angles of incidence and reflection marked'),
  pins: svgV(PINS, 'Top view of the pin experiment with a mirror, a normal and four pins'),
  image: svgV(IMAGE, 'The image of a point object in a plane mirror found from two reflected rays'),
  lateral: svgV(LATERAL, 'The letter F and its laterally inverted image in a plane mirror'),
  peri: svgV(PERI, 'A periscope with two plane mirrors at 45 degrees'),
  par: svgV(PARALLEL_IMAGES, 'An object between two parallel plane mirrors with the first images drawn on both sides'),
  i90: svgV(INCL90, 'Two plane mirrors at right angles with an object and its three images on a circle'),
  i60: svgV(INCL60, 'Two plane mirrors inclined at 60 degrees with an object and its five images on a circle'),
};

export const deck1 = deck({
  part: 1,
  title: 'Reflection of Light at Plane Mirrors — Part 1: Laws of reflection and the image',
  goals: [
    'State the laws of reflection and describe the pin experiment that verifies them',
    'Calculate angles of incidence and reflection and locate the image of a point object',
    'List the characteristics of the image in a plane mirror, explain lateral inversion and give uses of plane mirrors',
  ],
  slides: [
    sl('title', 'How does a mirror turn light around?', {
      b: 'Part 1 — light bounces off a mirror by a simple rule that we can test.',
      v: flow('LR', [['a', 'Light ray from a source'], ['b', 'Strikes the mirror'], ['c', 'Bounces back by a rule']], [['a', 'b'], ['b', 'c']], 'Flow from a light ray striking a mirror to the ray bouncing back by a rule'),
      n: 'Look at yourself in a mirror and you see a face that seems to sit behind the glass. This part shows the simple rule that decides where every ray of light goes after it hits a mirror.',
    }),
    sl('concept', 'Words we need', {
      b: 'A ray falling on a mirror is the **incident ray**; the ray that leaves is the **reflected ray**. The **normal** is the line at **90°** to the mirror at the **point of incidence**. The **angle of incidence** ($i$) and the **angle of reflection** ($r$) are measured **from the normal**, not from the mirror.',
      v: table(['Term', 'Meaning'], [['Incident ray', 'Ray that falls on the mirror'], ['Reflected ray', 'Ray that bounces off the mirror'], ['Normal', 'Perpendicular to the mirror at the point of incidence'], ['Angle of incidence i', 'Between the incident ray and the normal'], ['Angle of reflection r', 'Between the reflected ray and the normal']], 'Table of the terms used in reflection and their meanings'),
      n: 'The normal is a line standing straight up from the mirror at the point where the ray lands. Both angles are measured from this line. Many students wrongly measure from the mirror surface, so be careful.',
    }),
    sl('concept', 'The two laws of reflection', {
      b: '**First law:** the angle of incidence is **equal to** the angle of reflection, $i = r$. **Second law:** the incident ray, the reflected ray and the normal at the point of incidence all lie in the **same plane**. A ray along the normal has $i = 0$ and returns along its own path.',
      v: V.laws,
      m: [r`\angle i = \angle r`],
      n: 'The two angles on either side of the normal are equal, and all three lines lie in one flat plane, such as the page. A ray that strikes the mirror straight on has zero angle and bounces straight back.',
    }),
    sl('check', 'Quick check: the first law', {
      b: 'Remember that both angles are measured from the normal.',
      v: table(['Angle of incidence', 'Angle of reflection'], [['40°', '?']], 'Table of an angle of incidence and an unknown angle of reflection'),
      chk: 'chk-law',
      n: 'A ray strikes a plane mirror with an angle of incidence of forty degrees. What is the angle of reflection?',
    }),
    sl('concept', 'Verifying the laws with pins', {
      b: 'Draw a line for the mirror and a **normal** on a sheet of paper. Fix pins **P1 and P2** along an incident ray. Looking into the mirror, fix **P3 and P4** so that they appear **in line with the images** of P1 and P2. Join P3, P4 to the point of incidence and **measure $i$ and $r$** with a protractor.',
      v: V.pins,
      n: 'Two pins mark the incident ray. Looking in the mirror, you place two more pins so that they line up with the images of the first two. The line through the last pins is the reflected ray, and a protractor measures both angles.',
    }),
    sl('concept', 'What the readings show', {
      b: `Repeat for different incident rays. Within the error of measurement, **i = r** every time, and the reflected ray lies in the plane of the paper. Small differences of ${PIN_R.map((x, k) => Math.abs(x - PIN_I[k])).filter((d) => d).join(' or ')}° come from reading the protractor.`,
      v: table(['Angle i', ...PIN_I.map((x) => `${x}°`)], [['Angle r', ...PIN_R.map((x) => `${x}°`)]], 'Table of sample readings of the angle of incidence and the angle of reflection'),
      n: 'The measured angles of reflection agree with the angles of incidence to within one degree. The small differences come from reading the protractor, not from the law, which holds exactly.',
    }),
    sl('example', 'Worked example 1: angles at a mirror', {
      b: r`**Problem.** A ray strikes a plane mirror so that it makes ${D1.withMirror}° with the mirror surface. Find the angle of incidence, the angle of reflection and the angle between the incident and reflected rays.

**Step 1.** Angle of incidence $= 90° - ${D1.withMirror}° = ${D1.i}°$.

**Step 2.** By the first law, $r = ${D1.i}°$, so the angle between the rays $= ${D1.i}° + ${D1.i}° = ${D1.between}°$.`,
      v: table(['Quantity', 'Working', 'Value'], [['Angle of incidence', `90° − ${D1.withMirror}°`, `${D1.i}°`], ['Angle of reflection', 'Equals i', `${D1.i}°`], ['Angle between the rays', `${D1.i}° + ${D1.i}°`, `${D1.between}°`]], 'Table of the working for the angle of incidence, the angle of reflection and the angle between the rays'),
      n: 'The ray makes forty degrees with the mirror, so it makes fifty degrees with the normal. The reflected ray also makes fifty with the normal, so the angle between the incident and reflected rays is one hundred degrees.',
    }),
    sl('check', 'Quick check: angle with the mirror', {
      b: 'First change the angle with the mirror into the angle with the normal.',
      v: table(['Ray makes with the mirror', 'Find'], [['30°', 'Angle of reflection']], 'Table of the angle a ray makes with the mirror and the quantity to find'),
      chk: 'chk-ang',
      n: 'A ray makes an angle of thirty degrees with a plane mirror. What is the angle of reflection?',
    }),
    sl('concept', 'The image of a point in a plane mirror', {
      b: 'Rays from a point object O reflect as if they came from a point **I behind the mirror**. Trace the reflected rays **backwards** (dotted) and they meet at I. The line OI is **perpendicular** to the mirror, and **IM = OM**: the image is as far behind the mirror as the object is in front.',
      v: V.image,
      n: 'Two rays from the object reflect by the law. When we extend the reflected rays backwards behind the mirror, they meet at the image. The image lies as far behind the mirror as the object stands in front.',
    }),
    sl('concept', 'Characteristics of the image', {
      b: 'The image in a plane mirror is **virtual** (it cannot be caught on a screen), **erect**, **the same size** as the object, **as far behind the mirror as the object is in front**, and **laterally inverted**.',
      v: table(['Characteristic', 'Plane mirror image'], [['Nature', 'Virtual'], ['Orientation', 'Erect'], ['Size', 'Same as the object'], ['Distance', 'Equal to the distance of the object from the mirror'], ['Left and right', 'Interchanged (lateral inversion)']], 'Table of the five characteristics of the image in a plane mirror'),
      n: 'The image seems to sit behind the mirror but no light really reaches it, so it is virtual and cannot appear on a screen. It is upright, the same size, as far behind as the object is in front, and turned left to right.',
    }),
    sl('check', 'Quick check: the image', {
      b: 'Think about whether light really reaches the position of the image.',
      v: table(['Image in a plane mirror', 'Real or virtual?'], [['Cannot be received on a screen', '?']], 'Table asking whether the image in a plane mirror is real or virtual'),
      chk: 'chk-char',
      n: 'Which word correctly describes the image formed by a plane mirror?',
    }),
    sl('concept', 'Lateral inversion', {
      b: 'In a plane mirror the **left side of the object appears as the right side of the image**. A letter like F looks reversed. This is **lateral inversion**. The word AMBULANCE is printed reversed on the front of the vehicle so that a driver sees it correctly in the rear-view mirror.',
      v: V.lateral,
      n: 'The image is turned left to right, like the letter shown. Ambulances print their name reversed on the front so that drivers ahead can read it correctly in their mirrors.',
    }),
    sl('example', 'Worked example 2: distances to the image', {
      b: r`**Problem.** A candle is ${D1_DIST.u} cm in front of a plane mirror. Find the distance of the image from the mirror and the distance between the candle and its image.

**Step 1.** The image is as far behind as the object is in front: $v = ${D1_DIST.v}$ cm.

**Step 2.** Distance between object and image $= ${D1_DIST.u} + ${D1_DIST.v} = ${D1_DIST.apart}$ cm.`,
      v: table(['Quantity', 'Working', 'Value'], [['Image distance behind the mirror', 'Equal to the object distance', `${D1_DIST.v} cm`], ['Distance between object and image', `${D1_DIST.u} + ${D1_DIST.v}`, `${D1_DIST.apart} cm`]], 'Table of the working for the image distance and the distance between the object and its image'),
      n: 'The image is twenty-four centimetres behind the mirror. The distance from the candle to its image adds the two equal distances, which is forty-eight centimetres.',
    }),
    sl('concept', 'Uses of plane mirrors', {
      b: 'Plane mirrors are used in **dressing tables and shops**, in **periscopes** (two mirrors at **45°** let us see over a wall or from a submarine), in **kaleidoscopes** (mirrors at an angle make patterns), in **barbers’ shops** (to view the back of the head) and in **instrument scales** to avoid reading errors.',
      v: V.peri,
      n: 'A periscope has two plane mirrors, each tilted at forty five degrees. Light is turned through a right angle at the top and again at the bottom, so you can see over a wall. Other uses are dressing mirrors and kaleidoscopes.',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Laws of reflection: i = r, and the incident ray, reflected ray and normal lie in one plane. Angles are measured from the normal.',
        'The pin experiment verifies i = r with P1, P2 on the incident ray and P3, P4 in line with the images.',
        'The image in a plane mirror is virtual, erect, the same size, as far behind as the object is in front, and laterally inverted.',
        'Uses: dressing mirrors, periscopes, kaleidoscopes, barbers’ shops.',
      ],
      v: table(['Law', 'Statement'], [['First', 'i = r'], ['Second', 'Incident ray, reflected ray and normal are in one plane']], 'Summary table of the two laws of reflection'),
      n: 'To sum up Part one. The angle of incidence equals the angle of reflection, and the rays and the normal lie in one plane. A plane mirror forms a virtual, upright, same-size, laterally inverted image as far behind as the object is in front.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'Measure i and r from the normal; if a ray makes 30° with the mirror, i = 60°.',
        'Show the normal as a dotted line and put arrows on all rays.',
        'In ray diagrams, draw the reflected rays backwards with dotted lines to find the image.',
        'List all five characteristics, including "virtual" and "laterally inverted".',
      ],
      v: table(['Slip', 'Fix'], [['Angle of incidence measured from the mirror', 'Measure it from the normal'], ['Image drawn with continuous lines behind the mirror', 'Dotted lines for virtual rays'], ['Saying the image is real', 'It is virtual']], 'Table of three common slips and their fixes'),
      n: 'Exam tips. Measure both angles from the normal. Draw the normal dotted and put arrows on every ray. Use dotted lines behind the mirror for the image. And list all the characteristics, including virtual and laterally inverted.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Reflection of Light at Plane Mirrors — Part 2: Images in two mirrors',
  goals: [
    'Explain why two parallel plane mirrors form many images and why the images get fainter',
    'Locate the first few images in two parallel mirrors by repeated reflection',
    'Use n = 360 ÷ θ − 1 for two inclined mirrors, including the odd and even cases',
  ],
  slides: [
    sl('title', 'Why do two mirrors give many images?', {
      b: 'Part 2 — an image can itself act as an object for the other mirror.',
      v: flow('LR', [['a', 'Object'], ['b', 'Image in mirror one'], ['c', 'Acts as object for mirror two']], [['a', 'b'], ['b', 'c']], 'Flow from an object to its image in the first mirror and then to that image acting as an object for the second mirror'),
      n: 'In a barber’s shop you may see a long line of images when two mirrors face each other. The reason is simple: the image formed by one mirror becomes the object for the other mirror.',
    }),
    sl('concept', 'Two parallel plane mirrors', {
      b: `Place an object O between two parallel mirrors M1 and M2. M1 makes the image **I1** and M2 makes **I2**. Then **I1 acts as an object for M2** and **I2 for M1**, giving **I3** and **I4**, and so on. In principle the number of images is **infinite**. In the figure the mirrors are ${PAR.d} cm apart and O is ${PAR.x0} cm from M1.`,
      v: V.par,
      n: 'The first mirror forms one image and the second mirror forms another. Each of those images is then reflected again by the opposite mirror. The process never ends, so the images are very many and line up in rows behind each mirror.',
    }),
    sl('concept', 'Finding the positions by reflection', {
      b: `To locate each image, reflect the previous image in the next mirror, which is the same distance **behind** the mirror as the image is in front. With O at ${PAR.x0} cm from M1 and the mirrors ${PAR.d} cm apart, the first images are ${PAR.x0} cm behind M1 (I1) and ${PAR_I2} cm behind M2 (I2). I3 is the image of I2 in M1, and I4 is the image of I1 in M2.`,
      v: table(['Image', 'Formed by', 'Distance behind the mirror (cm)'], [['I1', 'M1 from O', `${PAR.x0} behind M1`], ['I2', 'M2 from O', `${PAR.d - PAR.x0} behind M2`], ['I3', 'M1 from I2', `${-PAR_IM.chainB[1]} behind M1`], ['I4', 'M2 from I1', `${PAR_IM.chainA[1] - PAR.d} behind M2`]], 'Table of the first four images in two parallel mirrors and their distances behind the mirrors'),
      n: 'Each new image is found by reflecting the one before it in the other mirror. The distances behind the mirrors increase each time, so the images spread out in a line on each side.',
    }),
    sl('concept', 'Why the images become fainter', {
      b: 'At each reflection a small part of the light is **absorbed** by the mirror and part passes through or is scattered, so **less light reaches the eye** from each later image. The **successive images become fainter** and the far ones cannot be seen.',
      v: table(['Image', 'Reflections', 'Brightness'], [['I1 and I2', 'One', 'Brightest'], ['I3 and I4', 'Two', 'Fainter'], ['Later images', 'Three or more', 'Fainter still']], 'Table of how the brightness of the images falls with the number of reflections'),
      n: 'No mirror reflects all the light that falls on it. At every reflection some light is lost. An image that has been reflected many times is therefore fainter than one reflected only once.',
    }),
    sl('check', 'Quick check: parallel mirrors', {
      b: 'Think about how many times the process of reflection can go on.',
      v: table(['Two parallel mirrors', 'Number of images'], [['Object between them', '?']], 'Table asking for the number of images in two parallel mirrors'),
      chk: 'chk-par',
      n: 'How many images does an object form between two parallel plane mirrors, in principle?',
    }),
    sl('example', 'Worked example 1: distances in parallel mirrors', {
      b: r`**Problem.** An object is ${PAR.x0} cm from mirror M1 and ${PAR.d - PAR.x0} cm from mirror M2 (${PAR.d} cm apart). Find the distance between the object and the first image formed by M2.

**Step 1.** First image in M2 is ${PAR.d - PAR.x0} cm behind M2.

**Step 2.** Distance from O $= ${PAR.d - PAR.x0} + ${PAR.d - PAR.x0} = ${PAR_OBJ_I2}$ cm.`,
      v: table(['Quantity', 'Working', 'Value'], [['Image behind M2', 'Equal to the object distance from M2', `${PAR.d - PAR.x0} cm`], ['Object to image', `${PAR.d - PAR.x0} + ${PAR.d - PAR.x0}`, `${PAR_OBJ_I2} cm`]], 'Table of the working for the distance between the object and the first image in M2'),
      n: 'The object is thirty centimetres from the second mirror, so its image is thirty centimetres behind that mirror. The distance between the object and this image is therefore sixty centimetres.',
    }),
    sl('concept', 'Two mirrors at an angle', {
      b: 'When two mirrors meet at an **angle θ**, the object and all its images lie on a **circle** whose centre is where the mirrors meet. The images are found by repeated reflection. At **90°** three images are formed: **I1** in M1, **I2** in M2, and **I3**, the image of I1 in M2 (or of I2 in M1), formed by **two** reflections.',
      v: V.i90,
      n: 'At a right angle, the first mirror makes one image and the second mirror makes another. The third image is made by two reflections. The object and all three images lie on one circle centred where the mirrors meet.',
    }),
    sl('concept', 'The number of images: n = 360 ÷ θ − 1', {
      b: 'If $\\dfrac{360}{\\theta}$ is a **whole number**, the number of images is $n = \\dfrac{360}{\\theta} - 1$. This holds for any position of the object when $\\dfrac{360}{\\theta}$ is **even**. When it is **odd**, it holds only if the object is on the **bisector** of the angle; otherwise $n = \\dfrac{360}{\\theta}$.',
      v: table(['θ', '360 ÷ θ', 'Images n'], N_TABLE.map(([t, n, off]) => [`${t}°`, `${360 / t}`, off === undefined ? `${n}` : `${n} on the bisector, ${off} elsewhere`]), 'Table of the number of images for different angles between the mirrors'),
      m: [r`n = \dfrac{360}{\theta} - 1`],
      n: 'Divide three hundred and sixty by the angle between the mirrors, then subtract one. This works for any object position when the quotient is even. When the quotient is odd, an object off the bisector forms one more image.',
    }),
    sl('example', 'Worked example 2: counting images', {
      b: r`**Problem.** Two plane mirrors are inclined at ${D2_INCL.th}°. How many images are formed? What if they are at ${D2_EX2.th}° and the object is (i) on the bisector, (ii) not on it?

**Step 1.** For ${D2_INCL.th}°: $\dfrac{360}{${D2_INCL.th}} = ${D2_INCL.m}$, even, so $n = ${D2_INCL.m} - 1 = ${D2_INCL.n}$.

**Step 2.** For ${D2_EX2.th}°: $\dfrac{360}{${D2_EX2.th}} = 5$, odd. On the bisector $n = 5 - 1 = ${D2_EX2.on}$; elsewhere $n = ${D2_EX2.off}$.`,
      v: table(['θ', '360 ÷ θ', 'Case', 'Images'], [[`${D2_INCL.th}°`, `${D2_INCL.m}`, 'Even', `${D2_INCL.n}`], [`${D2_EX2.th}°`, '5', 'Odd, on the bisector', `${D2_EX2.on}`], [`${D2_EX2.th}°`, '5', 'Odd, off the bisector', `${D2_EX2.off}`]], 'Table of the working for the number of images at sixty and seventy-two degrees'),
      n: 'At sixty degrees the quotient is six, which is even, so there are five images. At seventy two degrees the quotient is five, which is odd. An object on the bisector gives four images, and any other position gives five.',
    }),
    sl('concept', 'A picture for 60 degrees', {
      b: 'At **60°** there are **five images** I1 to I5, and all of them, with the object O, lie on the **same circle** about the meeting point of the mirrors. The more the mirrors are closed up, the **smaller θ** and the **more images** are formed.',
      v: V.i60,
      n: 'At sixty degrees you can count five images on the dotted circle. The smaller the angle between the mirrors, the more images there are, as in a kaleidoscope.',
    }),
    sl('check', 'Quick check: counting images', {
      b: 'Use n = 360 ÷ θ − 1 and check whether the quotient is even.',
      v: table(['Angle between mirrors', 'Object'], [['90°', 'Between the mirrors']], 'Table of the angle between two mirrors and the position of the object'),
      chk: 'chk-incl',
      n: 'Two plane mirrors are at right angles with an object between them. How many images are formed?',
    }),
    sl('concept', 'Limits of the formula', {
      b: 'As **θ → 0**, the mirrors become **parallel** and the number of images becomes **infinite**. At **θ = 180°** the two mirrors form one flat mirror, giving **one** image. The formula is used only when 360 ÷ θ is a **whole number**, as in school examinations.',
      v: table(['Angle between the mirrors', 'Images'], [['Close to 0° (nearly parallel)', 'Very many'], ['0° (parallel)', 'Infinite'], ['180° (one flat mirror)', '1']], 'Table of the number of images at the limiting angles between two mirrors'),
      n: 'If the mirrors are nearly parallel, there are very many images, and parallel mirrors give no end to the images. If the mirrors form one flat surface, there is a single image.',
    }),
    sl('check', 'Quick check: why fainter?', {
      b: 'Consider what happens at each reflection.',
      v: table(['Image', 'Brightness'], [['First image', 'Bright'], ['Tenth image', 'Very faint']], 'Table of the brightness of the first image and the tenth image'),
      chk: 'chk-bright',
      n: 'Why do the successive images in two parallel mirrors become fainter?',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'An image formed by one mirror acts as an object for the other, so two mirrors give many images.',
        'Two parallel mirrors give an infinite number of images in principle; successive images are fainter because some light is lost at each reflection.',
        'Mirrors inclined at θ give n = 360/θ − 1 images when 360/θ is a whole number; if 360/θ is odd and the object is off the bisector, n = 360/θ.',
        'The object and all the images lie on a circle centred where the mirrors meet.',
      ],
      v: table(['θ', 'Images'], [['90°', '3'], ['60°', '5'], ['45°', '7']], 'Summary table of the number of images at ninety, sixty and forty-five degrees'),
      n: 'To sum up Part two. Each image acts as an object for the other mirror. Parallel mirrors give endless faint images. Mirrors inclined at an angle give three hundred and sixty over the angle, minus one, images in the common cases.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'Say that the first image acts as an object for the second mirror.',
        'Give brightness falling as the reason for faint images: light is lost at every reflection.',
        'Check whether 360 ÷ θ is even or odd before using the formula.',
        'Draw dotted lines and mark each image I1, I2, I3 in order.',
      ],
      v: table(['Slip', 'Fix'], [['The images become fainter because they are farther', 'Light is lost at each reflection'], ['Forgetting the − 1', 'n = 360 ÷ θ − 1'], ['Using the formula for an odd quotient without the bisector rule', 'Check the object position']], 'Table of three common slips and their fixes'),
      n: 'Exam tips. Say that an image acts as an object for the other mirror. Explain fainter images by the loss of light at each reflection. Check whether three hundred and sixty over the angle is even or odd. And label each image in order.',
    }),
  ],
});
void LAW_I;
