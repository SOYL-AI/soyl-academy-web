// ch09 Light – Reflection and Refraction — four decks: Part 1 (t01) spherical mirrors; Part 2 (t02) sign convention and
// mirror formula; Part 3 (t03) refraction; Part 4 (t04–t05) lenses, lens formula and power.
import { sl, deck, table, flow, svgV, plot, r } from '../../cbse-10-science-ch06/src/lib.mjs';
import * as G from './svgs.mjs';

const ray = (spec, alt, caption) => svgV(spec, alt, caption ?? 'Drawn to scale from the mirror or lens formula: every ray meets at the image point.');
export const V = {
  terms: svgV(G.TERMS, 'Concave mirror with P, F and C marked on the principal axis and brackets showing R = 2f'),
  sign: svgV(G.SIGN, 'Sign convention: pole as origin, distances along the incident light positive, against it negative, heights up positive and down negative'),
  mInf: ray(G.M_INF, 'Parallel rays reflected by a concave mirror meet at F'),
  mBeyond: ray(G.M_BEYOND, 'Object beyond C: image between F and C, real, inverted, diminished'),
  mAtC: ray(G.M_AT_C, 'Object at C: image at C, real, inverted, same size'),
  mCF: ray(G.M_C_F, 'Object between C and F: image beyond C, real, inverted, enlarged'),
  mAtF: ray(G.M_AT_F, 'Object at F: reflected rays parallel, image at infinity'),
  mFP: ray(G.M_F_P, 'Object between F and P: virtual, erect, enlarged image behind the mirror'),
  mConvex: ray(G.M_CONVEX, 'Convex mirror: virtual, erect, diminished image behind the mirror between P and F'),
  mConvexInf: ray(G.M_CONVEX_INF, 'Convex mirror: parallel rays diverge as if from F behind the mirror'),
  lInf: ray(G.L_INF, 'Convex lens: parallel rays converge at F₂'),
  lBeyond: ray(G.L_BEYOND, 'Convex lens, object beyond 2F₁: image between F₂ and 2F₂, real, inverted, diminished'),
  lAt2F: ray(G.L_AT_2F, 'Convex lens, object at 2F₁: image at 2F₂, real, inverted, same size'),
  l2FF: ray(G.L_2F_F, 'Convex lens, object between F₁ and 2F₁: image beyond 2F₂, real, inverted, enlarged'),
  lAtF: ray(G.L_AT_F, 'Convex lens, object at F₁: refracted rays parallel, image at infinity'),
  lFO: ray(G.L_F_O, 'Convex lens, object between F₁ and O: virtual, erect, enlarged image on the object’s side'),
  lConcave: ray(G.L_CONCAVE, 'Concave lens: virtual, erect, diminished image between F₁ and O'),
  lConcaveInf: ray(G.L_CONCAVE_INF, 'Concave lens: parallel rays diverge as if from F₁'),
  slab: svgV(G.SLAB, 'Ray through a glass slab bending towards the normal on entering and away on leaving; emergent ray parallel to the incident ray with a lateral shift', 'Drawn for refractive index 1.5 and an angle of incidence of 45°, so the angle of refraction is about 28°.'),
};

export const concaveTable = table(
  ['Object at', 'Image at', 'Size', 'Nature'],
  [
    ['Infinity', 'F', 'Highly diminished, point-sized', 'Real, inverted'],
    ['Beyond C', 'Between F and C', 'Diminished', 'Real, inverted'],
    ['C', 'C', 'Same size', 'Real, inverted'],
    ['Between C and F', 'Beyond C', 'Enlarged', 'Real, inverted'],
    ['F', 'Infinity', 'Highly enlarged', 'Real, inverted'],
    ['Between F and P', 'Behind the mirror', 'Enlarged', 'Virtual, erect'],
  ],
  'Table of image position, size and nature for six object positions in front of a concave mirror',
);
export const convexLensTable = table(
  ['Object at', 'Image at', 'Size', 'Nature'],
  [
    ['Infinity', 'F₂', 'Highly diminished, point-sized', 'Real, inverted'],
    ['Beyond 2F₁', 'Between F₂ and 2F₂', 'Diminished', 'Real, inverted'],
    ['2F₁', '2F₂', 'Same size', 'Real, inverted'],
    ['Between F₁ and 2F₁', 'Beyond 2F₂', 'Enlarged', 'Real, inverted'],
    ['F₁', 'Infinity', 'Highly enlarged', 'Real, inverted'],
    ['Between F₁ and O', 'Same side as the object', 'Enlarged', 'Virtual, erect'],
  ],
  'Table of image position, size and nature for six object positions in front of a convex lens',
);

export const deck1 = deck({
  part: 1,
  title: 'Light – Reflection and Refraction — Part 1: Spherical mirrors and ray diagrams',
  goals: [
    'Define pole, centre of curvature, principal axis, principal focus and focal length, and relate R = 2f',
    'Draw ray diagrams for a concave mirror for six object positions',
    'Draw the ray diagram for a convex mirror and describe its image',
    'State uses of concave and convex mirrors',
  ],
  slides: [
    sl('title', 'Light – Reflection and Refraction', {
      b: 'Part 1 — how curved mirrors form images, and how to find those images with simple ray diagrams.',
      v: flow('LR', [['l', 'Light travels in straight lines'], ['r', 'Reflection at a mirror'], ['s', 'Curved mirrors: concave and convex'], ['i', 'Images: real or virtual, big or small']], [['l', 'r'], ['r', 's'], ['s', 'i']], 'Flow from light travelling in straight lines to reflection, curved mirrors and the images they form'),
      n: 'Namaste! Look into a shiny steel spoon. On one side your face appears upside down; on the other it is upright but tiny. Why? The answer lies in how curved surfaces reflect light. In this part we learn the language of spherical mirrors and a powerful tool, the ray diagram, which lets us predict exactly where an image will form.',
    }),
    sl('concept', 'Reflection: the two laws', {
      b: 'Light falling on a polished surface is reflected. **(1)** The angle of incidence equals the angle of reflection. **(2)** The incident ray, the reflected ray and the normal at the point of incidence lie in the same plane. These laws hold for **all** reflecting surfaces, flat or curved.',
      v: table(['Plane mirror image', 'Property'], [['Position', 'As far behind the mirror as the object is in front'], ['Nature', 'Virtual and erect'], ['Size', 'Same as the object'], ['Orientation', 'Laterally inverted (left and right swapped)']], 'Table of the properties of the image formed by a plane mirror'),
      n: 'You met these laws in earlier classes with plane mirrors. Angle of incidence equals angle of reflection, and everything lies in one plane. A plane mirror gives an upright, same-size image that seems to be behind the mirror. The exciting part is that the very same laws apply at every tiny point of a curved mirror. That is all we need to explain spherical mirrors.',
    }),
    sl('concept', 'Spherical mirrors: concave and convex', {
      b: 'A **spherical mirror** is part of a hollow sphere. If the reflecting surface curves **inwards** (like the inside of a spoon), it is **concave**. If it bulges **outwards** (like the back of a spoon), it is **convex**.',
      v: table(['', 'Concave mirror', 'Convex mirror'], [['Reflecting surface', 'Curves inwards, towards the object', 'Bulges outwards'], ['Effect on parallel rays', 'Converges them', 'Diverges them'], ['Everyday example', 'Inside of a steel spoon', 'Back of a steel spoon']], 'Table comparing concave and convex mirrors by reflecting surface, effect on parallel rays and an everyday example'),
      n: 'Imagine cutting a piece out of a hollow, shiny ball. If you look into the inside, you have a concave mirror; it curves inwards like a cave, which is an easy way to remember the name. If you look at the outside, you have a convex mirror, bulging out towards you. Concave mirrors bring light together; convex mirrors spread it out.',
    }),
    sl('diagram', 'Pole, centre of curvature and focus', {
      b: r`The **pole (P)** is the centre of the mirror’s surface. The **centre of curvature (C)** is the centre of the sphere it is part of; the **radius of curvature (R)** is the distance PC. The **principal axis** passes through P and C. Rays parallel to the axis meet (concave) or appear to meet (convex) at the **principal focus (F)**; **PF** is the **focal length (f)**. For mirrors of small aperture, $R = 2f$.`,
      v: V.terms,
      m: [r`R = 2f`],
      n: 'Learn these points well, because every ray diagram uses them. P is on the mirror itself. C is the centre of the imaginary sphere, so it lies in front of a concave mirror and behind a convex one. F lies exactly halfway between P and C. So if the radius of curvature is forty centimetres, the focal length is twenty centimetres.',
    }),
    sl('concept', 'Rules for drawing ray diagrams', {
      b: 'Any **two** of these rays fix the image. Each follows the laws of reflection.',
      v: table(['Incident ray', 'Concave mirror: reflected ray', 'Convex mirror: reflected ray'], [['Parallel to the principal axis', 'Passes through F', 'Appears to come from F'], ['Through F (or towards F for convex)', 'Parallel to the axis', 'Parallel to the axis'], ['Through C (or towards C for convex)', 'Retraces its path', 'Retraces its path'], ['At the pole P', 'Reflects at an equal angle on the other side of the axis', 'Reflects at an equal angle on the other side of the axis']], 'Table of four standard incident rays and how a concave and a convex mirror reflect each'),
      n: 'Here is the toolkit. A ray parallel to the axis reflects through the focus. A ray through the focus reflects parallel. A ray through the centre of curvature hits the mirror head-on, along the normal, so it comes straight back. A ray striking the pole bounces off at an equal angle. Pick any two, find where they meet, and that is your image.',
    }),
    sl('diagram', 'Concave mirror: object at infinity', {
      b: 'Rays from a very distant object, such as the Sun, arrive **parallel** to the axis. After reflection they **meet at F**. The image is at **F**: real, inverted and **point-sized**.',
      v: V.mInf,
      n: 'Sunlight arrives in parallel rays because the Sun is so far away. A concave mirror gathers these rays to a single bright point, the focus. That is why the focus is so hot in a solar cooker. Never look at this point directly, and never point a mirror at a person’s eyes, because concentrated sunlight can burn.',
    }),
    sl('diagram', 'Concave mirror: object beyond C', {
      b: 'A ray parallel to the axis reflects through F; a ray through F reflects parallel. They meet **between F and C**. The image is **real, inverted and diminished**.',
      v: V.mBeyond,
      n: 'Now bring the object closer, but keep it beyond the centre of curvature. Follow the two rays from the tip of the object. Where they cross, below the axis, is the tip of the image. It forms between F and C, upside down and smaller. Because the rays really meet there, the image is real: you could catch it on a screen.',
    }),
    sl('check', 'Quick check: object at C', {
      b: 'An object is placed at the centre of curvature of a concave mirror. Where is the image, and what is it like?',
      n: 'Quick check. Use the table you are building in your mind: as the object moves closer, where does the image move? Think about the special point where the object and image coincide.',
      chk: 'at-c-mcq',
    }),
    sl('diagram', 'Concave mirror: object at C', {
      b: 'With the object **at C**, the image is also **at C**: **real, inverted and the same size** as the object.',
      v: V.mAtC,
      n: 'Here the image sits right on top of the object’s position, upside down and exactly the same size. You can check this with the rays: the ray parallel to the axis reflects through F and crosses the ray that reflected parallel, just below C. This is a handy position to remember because it is the boundary between diminished and enlarged images.',
    }),
    sl('diagram', 'Concave mirror: object between C and F', {
      b: 'Now the image forms **beyond C**: **real, inverted and enlarged**.',
      v: V.mCF,
      n: 'Move the object between C and F, and the image jumps out beyond C and grows larger than the object. Notice how the image and object have swapped roles compared with the beyond C case. This is exactly what a cinema projector does with a lens: a small object close in gives a large real image far away.',
    }),
    sl('diagram', 'Concave mirror: object at F', {
      b: 'With the object **at F**, the reflected rays are **parallel**. They meet only at **infinity**, so the image is at infinity, **real, inverted and highly enlarged**.',
      v: V.mAtF,
      n: 'Place a small bulb exactly at the focus and the mirror sends out a parallel beam. That is how torches, searchlights and vehicle headlights throw light a long way without spreading out much. In ray-diagram language, the reflected rays never meet, so we say the image forms at infinity.',
    }),
    sl('diagram', 'Concave mirror: object between F and P', {
      b: 'When the object is **closer than F**, the reflected rays **diverge**. Extended backwards, they meet **behind the mirror**: a **virtual, erect, enlarged** image.',
      v: V.mFP,
      n: 'Bring your face very close to a concave shaving or make-up mirror and you see a big, upright image of yourself. The reflected rays spread apart, and your eyes trace them back to a point behind the mirror. No light actually reaches that point, so the image is virtual. Dashed lines in a ray diagram always show these backward extensions.',
    }),
    sl('concept', 'Concave mirror images: the full table', {
      b: 'As the object moves from far away towards the mirror, the image moves from F out to infinity and becomes larger; inside F it becomes virtual and erect.',
      v: concaveTable,
      n: 'This table is one of the most tested ideas in the chapter. Notice the pattern. Every real image is inverted, and the only virtual image, when the object is inside F, is erect and enlarged. Learn the table as a story of an object walking towards the mirror, and the image running the other way, growing all the time.',
    }),
    sl('example', 'Worked example 1: positioning the object', {
      b: 'Ananya wants to use a concave mirror of focal length 15 cm to throw an **enlarged, real** image of a candle flame onto a wall. Where should she place the candle? Where should she place it to see an **enlarged, upright** image in the mirror instead?',
      ul: [
        'Step 1 — R = 2f = 30 cm, so C is 30 cm and F is 15 cm from the mirror.',
        'Step 2 — Enlarged and real: the object must be **between C and F**, that is, between 15 cm and 30 cm from the mirror.',
        'Step 3 — Enlarged and upright (virtual): the object must be **between F and P**, closer than 15 cm.',
        'Check — real images are always inverted, so the flame on the wall will appear upside down.',
      ],
      v: table(['Image wanted', 'Object position', 'Distance from mirror'], [['Enlarged, real (on a wall)', 'Between C and F', '15 cm to 30 cm'], ['Enlarged, upright (in the mirror)', 'Between F and P', 'Less than 15 cm']], 'Worked table: for an enlarged real image place the object between 15 and 30 centimetres; for an enlarged upright image place it closer than 15 centimetres'),
      n: 'Start by turning the focal length into the positions of F and C. Then use the table: enlarged real images need the object between C and F, and enlarged upright images need it inside F. Notice that the flame on the wall will be upside down. Every real image formed by a single mirror is inverted, which is a quick way to check your answers.',
    }),
    sl('check', 'Quick check: real or virtual?', {
      b: 'Judge the assertion and the reason about images in a concave mirror.',
      n: 'Quick check. Can a real image be erect with one concave mirror? Decide whether each statement is true, then whether the reason explains the assertion.',
      chk: 'real-inverted-ar',
    }),
    sl('diagram', 'Convex mirror: always virtual and small', {
      b: 'For a convex mirror, the reflected rays always **diverge**. Extended backwards, they meet behind the mirror, **between P and F**. The image is always **virtual, erect and diminished**, wherever the object is.',
      v: V.mConvex,
      n: 'A convex mirror is simple to remember: whatever you do, the image is upright, smaller, and seems to be just behind the mirror. As the object moves closer, the image grows a little but never becomes as large as the object. Because it squeezes a wide view into a small image, a convex mirror shows you a lot of the scene at once.',
    }),
    sl('concept', 'Uses of spherical mirrors', {
      b: 'Each mirror is chosen for the kind of image or beam it produces.',
      v: table(['Mirror', 'Use', 'Why'], [['Concave', 'Torches, searchlights, headlights', 'Bulb at F gives a strong parallel beam'], ['Concave', 'Shaving and make-up mirrors', 'Face inside F gives an enlarged, erect image'], ['Concave', 'Dentists’ mirrors', 'Enlarged image of a tooth'], ['Concave', 'Solar furnaces and cookers', 'Concentrate sunlight at F'], ['Convex', 'Rear-view (wing) mirrors of vehicles', 'Erect image and a wide field of view']], 'Table of uses of concave and convex mirrors with the reason for each'),
      n: 'Next time you travel, notice the mirrors around you. The headlights of the bus use concave reflectors with the bulb at the focus. The driver’s side mirrors are convex, giving an upright view of a wide stretch of road behind. At the dentist, a small concave mirror shows your teeth enlarged. Every use comes straight from the ray diagrams.',
    }),
    sl('example', 'Worked example 2: which mirror for the job?', {
      b: 'Choose a mirror for each job and justify: (a) a truck driver’s side mirror, (b) a mirror to examine a small splinter in a finger, (c) a reflector for a powerful torch.',
      ul: [
        'Step 1 — (a) **Convex**: always gives an erect, diminished image, so a wide area of road fits in the mirror.',
        'Step 2 — (b) **Concave**, with the finger closer than F: an enlarged, erect, virtual image.',
        'Step 3 — (c) **Concave**, with the bulb at F: the reflected rays form a parallel beam.',
        'Check — each choice matches a row of the image table.',
      ],
      v: table(['Job', 'Mirror', 'Object position', 'Image or beam'], [['Side mirror', 'Convex', 'Anywhere', 'Erect, diminished, wide view'], ['Splinter', 'Concave', 'Between F and P', 'Erect, enlarged'], ['Torch reflector', 'Concave', 'Bulb at F', 'Parallel beam']], 'Worked table matching three jobs to convex or concave mirrors with object positions and the image or beam produced'),
      n: 'Exam questions often hide the mirror choice inside a situation. Ask yourself what the user needs: a wide upright view, an enlarged view, or a parallel beam. A wide view always means convex. Enlarged and upright means concave with the object very close. A beam means concave with the source at the focus. Always give the reason as well as the name.',
    }),
    sl('check', 'Quick check: the rear-view mirror', {
      b: 'Why are convex mirrors used as rear-view mirrors in vehicles?',
      n: 'Your turn. Think about what a driver needs to see behind, and what kind of image a convex mirror always gives.',
      chk: 'rearview-mcq',
    }),
    sl('summary', 'Summary: spherical mirrors', {
      ul: [
        'Laws of reflection hold for curved mirrors too.',
        'P, C, F and the principal axis; R = 2f.',
        'Ray rules: parallel → through F; through F → parallel; through C → back on itself.',
        'Concave: real and inverted images except when the object is inside F (virtual, erect, enlarged).',
        'Convex: always virtual, erect and diminished, between P and F.',
        'Uses: concave for beams, shaving, dentists, solar cookers; convex for rear-view mirrors.',
      ],
      v: table(['Mirror', 'Image types possible'], [['Concave', 'Real inverted (any size) or virtual erect enlarged'], ['Convex', 'Only virtual, erect, diminished']], 'Summary table of the kinds of image a concave and a convex mirror can form'),
      n: 'Let us recap. Spherical mirrors obey the same laws of reflection as plane mirrors. With a few standard rays you can find any image. Concave mirrors are versatile: they give real images of many sizes, or a big upright image when the object is very close. Convex mirrors always give small, upright images, which is perfect for watching the road behind.',
    }),
    sl('exam-tips', 'Exam tips: ray diagrams', {
      ul: [
        'Use a ruler, draw **arrows** on every ray, and mark **P, F, C** on the axis.',
        'Two rays are enough; choose the easiest pair for the object position.',
        'Draw virtual rays and virtual images with **dashed** lines.',
        'Always state the image’s **position, size and nature** (real or virtual, erect or inverted).',
        'Do not draw a convex mirror’s focus in front of it: F and C are behind a convex mirror.',
        'Typical 3-mark split: correct rays (1) + image drawn (1) + position, size and nature stated (1).',
      ],
      v: table(['Common mistake', 'Correct idea'], [['Rays without arrowheads', 'Every ray needs an arrow showing direction'], ['Virtual image drawn with solid lines', 'Use dashed lines for virtual rays and images'], ['Convex mirror image enlarged', 'Convex mirror images are always diminished'], ['Real image erect', 'Real images from a single mirror are inverted']], 'Table of common ray-diagram mistakes and the correct ideas'),
      n: 'Ray diagrams carry easy marks if you are neat. Use a sharp pencil and a ruler, put arrowheads on every ray, and dash the virtual parts. Label P, F and C. Then describe the image in words: where it is, how big it is, and whether it is real or virtual, erect or inverted. Examiners look for all three descriptions.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Light – Reflection and Refraction — Part 2: Sign convention and the mirror formula',
  goals: [
    'Apply the New Cartesian sign convention to spherical mirrors',
    'Use the mirror formula to find image distance, object distance or focal length',
    'Calculate magnification and interpret its sign and size',
  ],
  slides: [
    sl('title', 'Mirror formula and magnification', {
      b: 'Part 2 — turning ray diagrams into numbers with a sign convention and one simple formula.',
      v: flow('LR', [['s', 'Sign convention'], ['f', 'Mirror formula'], ['v', 'Image distance'], ['m', 'Magnification'], ['n', 'Nature and size of image']], [['s', 'f'], ['f', 'v'], ['v', 'm'], ['m', 'n']], 'Flow from the sign convention to the mirror formula, image distance, magnification and the nature of the image'),
      n: 'Ray diagrams tell us roughly where an image forms. But an optician or an engineer needs exact numbers. In this part you will learn a sign convention and one neat formula that together give the position and size of any image formed by a spherical mirror, with signs that even tell you whether the image is real or virtual.',
    }),
    sl('diagram', 'The New Cartesian sign convention', {
      b: 'The **pole** is the origin and the principal axis is the x-axis. The object is placed to the **left**, so incident light travels left to right. Distances measured **in the direction of the incident light** are **positive**; distances measured **against** it are **negative**. Heights **above** the axis are **positive**; heights **below** are **negative**.',
      v: V.sign,
      n: 'Think of the pole as the zero mark on a number line. Light comes from the left, so anything to the left of the mirror, including the object, has a negative distance. Anything behind the mirror, to the right, is positive. Heights work like a graph: up is positive, down is negative. Write these signs down before you do any calculation.',
    }),
    sl('concept', 'What the signs tell you', {
      b: 'Once the convention is fixed, the signs of the answers carry meaning.',
      v: table(['Quantity', 'Concave mirror', 'Convex mirror'], [['Object distance u', 'Negative', 'Negative'], ['Focal length f', 'Negative (F in front)', 'Positive (F behind)'], ['Image distance v', 'Negative if real; positive if virtual', 'Always positive (virtual)'], ['Magnification m', 'Negative if real and inverted; positive if virtual and erect', 'Positive, less than 1']], 'Table of the signs of object distance, focal length, image distance and magnification for concave and convex mirrors'),
      n: 'Here is the decoding key. For a mirror, the object distance is always negative because the object is in front. A concave mirror’s focus is in front too, so its focal length is negative. A convex mirror’s focus is behind, so its focal length is positive. If your image distance comes out negative, the image is in front and real; if positive, it is behind and virtual.',
    }),
    sl('concept', 'The mirror formula and magnification', {
      b: r`The **mirror formula** links object distance $u$, image distance $v$ and focal length $f$. **Magnification** $m$ is the ratio of image height $h'$ to object height $h$.`,
      m: [r`\dfrac{1}{v} + \dfrac{1}{u} = \dfrac{1}{f}`, r`m = \dfrac{h'}{h} = -\dfrac{v}{u}`],
      v: table(['Value of m', 'Meaning'], [['Negative', 'Real and inverted image'], ['Positive', 'Virtual and erect image'], ['Size greater than 1', 'Enlarged'], ['Size less than 1', 'Diminished']], 'Table explaining what a negative or positive magnification and a size greater or less than one mean'),
      n: 'Two formulas do all the work. The mirror formula says one over v plus one over u equals one over f. The magnification is the image height over the object height, which also equals minus v over u. A negative magnification means the image is upside down and real. A size bigger than one means the image is enlarged. The derivation is not required; using it correctly is.',
    }),
    sl('example', 'Worked example 1: concave mirror', {
      b: r`An object 4 cm tall is placed 15 cm in front of a concave mirror of focal length 10 cm. Find the position, nature and size of the image.`,
      ul: [
        r`Step 1 — Signs: $u = -15\ \text{cm}$, $f = -10\ \text{cm}$, $h = +4\ \text{cm}$.`,
        r`Step 2 — $\dfrac{1}{v} = \dfrac{1}{f} - \dfrac{1}{u} = -\dfrac{1}{10} + \dfrac{1}{15} = -\dfrac{1}{30}$, so $v = -30\ \text{cm}$.`,
        r`Step 3 — $m = -\dfrac{v}{u} = -\dfrac{-30}{-15} = -2$, so $h' = m \times h = -2 \times 4 = -8\ \text{cm}$.`,
        'Conclusion — the image is 30 cm **in front** of the mirror, **real, inverted** and **enlarged** (8 cm tall).',
      ],
      v: table(['Quantity', 'Value', 'Meaning'], [['v', '−30 cm', 'In front of the mirror: real'], ['m', '−2', 'Inverted, twice as large'], ["h'", '−8 cm', 'Below the axis: inverted']], 'Worked table: image distance minus 30 centimetres, magnification minus 2, image height minus 8 centimetres'),
      n: 'Follow the same routine every time. First write each quantity with its sign. Then rearrange the formula to find one over v, and combine the fractions carefully. Finally use the magnification to find the image height. Check the answer against the ray diagram: the object is between C and F here, so the image should be beyond C, real, inverted and enlarged. It is.',
    }),
    sl('check', 'Quick check: image distance', {
      b: 'Solve the numerical question about a concave mirror.',
      n: 'Your turn. Write u and f with their signs first, then use one over v equals one over f minus one over u. Watch your signs carefully.',
      chk: 'mirror-v-num',
    }),
    sl('example', 'Worked example 2: convex mirror', {
      b: r`A car’s convex side mirror has a focal length of 20 cm. A motorcycle is 30 cm from the mirror (in a model set-up). Find the image distance and magnification.`,
      ul: [
        r`Step 1 — Signs: $u = -30\ \text{cm}$, $f = +20\ \text{cm}$ (convex).`,
        r`Step 2 — $\dfrac{1}{v} = \dfrac{1}{20} - \dfrac{1}{-30} = \dfrac{1}{20} + \dfrac{1}{30} = \dfrac{5}{60}$, so $v = +12\ \text{cm}$.`,
        r`Step 3 — $m = -\dfrac{v}{u} = -\dfrac{12}{-30} = +0.4$.`,
        'Conclusion — the image is 12 cm **behind** the mirror, **virtual, erect** and **diminished** (0.4 times the size).',
      ],
      v: V.mConvex,
      n: 'For a convex mirror the focal length is positive, because the focus is behind the mirror. Substituting carefully, the image distance comes out positive, which means the image is behind the mirror and virtual. The magnification is positive and less than one, so the image is upright and smaller. That matches the convex mirror rule exactly.',
    }),
    sl('example', 'Worked example 3: finding the object distance', {
      b: r`A dentist wants an **erect** image of a tooth that is **3 times** larger, using a concave mirror of focal length 12 cm. How far from the tooth should the mirror be held?`,
      ul: [
        r`Step 1 — Erect means virtual, so $m = +3 = -\dfrac{v}{u}$, giving $v = -3u$.`,
        r`Step 2 — Substitute in $\dfrac{1}{v} + \dfrac{1}{u} = \dfrac{1}{f}$: $-\dfrac{1}{3u} + \dfrac{1}{u} = -\dfrac{1}{12}$, so $\dfrac{2}{3u} = -\dfrac{1}{12}$.`,
        r`Step 3 — $3u = -24$, so $u = -8\ \text{cm}$, and $v = -3u = +24\ \text{cm}$.`,
        'Check — the tooth is 8 cm away, inside F (12 cm), so the image is virtual and erect, as required.',
      ],
      v: table(['Quantity', 'Value'], [['m', '+3'], ['u', '−8 cm'], ['v', '+24 cm (behind the mirror)']], 'Worked table: magnification plus 3, object distance minus 8 centimetres, image distance plus 24 centimetres'),
      n: 'Sometimes the question gives the magnification and asks for the object distance. Use the magnification to connect v and u, then substitute into the mirror formula, leaving only u. Here the tooth must be eight centimetres from the mirror, which is inside the focus, just as the ray diagram rule for an enlarged upright image predicts.',
    }),
    sl('concept', 'How the image moves as the object moves', {
      b: 'For a concave mirror of focal length 10 cm, the graph shows the image distance for objects placed beyond F. As the object approaches F, the image rushes away towards infinity; far-away objects form images close to F.',
      v: plot({ x: { min: 10, max: 60, label: 'Object distance from the mirror (cm)' }, y: { min: 0, max: 120, label: 'Image distance from the mirror (cm)' }, functions: [{ expr: '10x/(x-10)', label: 'Image distance', domain: [11, 60] }], points: [{ at: [20, 20], label: 'Object at C: image at C' }, { at: [15, 30] }, { at: [30, 15] }] }, 'Graph of image distance against object distance for a concave mirror of focal length 10 centimetres: the curve falls from very large values near 10 centimetres, passes through 20 and 20, and approaches 10 centimetres for distant objects', 'Distances are sizes only (without signs); the curve is the mirror formula.'),
      n: 'This graph shows the mirror formula as a picture. Start far away on the right: the image is just outside the focus. Move the object closer, and the image moves out. At twenty centimetres, which is C, object and image are at the same place. Just outside the focus, the image shoots off towards infinity. The graph explains the whole image table at a glance.',
    }),
    sl('check', 'Quick check: reading the sign of m', {
      b: 'Judge the assertion and the reason about the magnification produced by a convex mirror.',
      n: 'Quick check. What sign and size of magnification does a convex mirror always give? Then decide whether the reason explains it.',
      chk: 'convex-m-ar',
    }),
    sl('two-column', 'Signs at a glance: concave versus convex', {
      b: 'Keep this comparison handy while solving numericals.',
      cols: ['**Concave mirror**\n\n- f negative\n- Real image: v negative, m negative\n- Virtual image (object inside F): v positive, m positive and greater than 1', '**Convex mirror**\n\n- f positive\n- Image always virtual: v positive\n- m positive and less than 1'],
      v: table(['If you get…', 'Then the image is…'], [['v negative', 'In front of the mirror, real'], ['v positive', 'Behind the mirror, virtual'], ['m negative', 'Inverted'], ['m positive', 'Erect']], 'Table for interpreting the sign of the image distance and magnification'),
      n: 'Here is your sign summary in one place. A concave mirror has a negative focal length; a convex mirror a positive one. If v is negative, the image is in front and real; if positive, behind and virtual. If m is negative, the image is inverted; if positive, erect. Always end a numerical by translating your signs into words.',
    }),
    sl('check', 'Quick check: radius and focus', {
      b: 'A spherical mirror has a radius of curvature of 32 cm. What is its focal length?',
      n: 'Quick check. Remember the simple relation between the radius of curvature and the focal length.',
      chk: 'radius-fill',
    }),
    sl('summary', 'Summary: mirror formula', {
      ul: [
        'Pole = origin; incident light from the left; along the light positive, against it negative.',
        r`Mirror formula: $\dfrac{1}{v} + \dfrac{1}{u} = \dfrac{1}{f}$; $R = 2f$.`,
        r`Magnification: $m = \dfrac{h'}{h} = -\dfrac{v}{u}$.`,
        'Concave: f negative. Convex: f positive. Object distance u is negative for real objects.',
        'v negative → real; v positive → virtual. m negative → inverted; m positive → erect.',
      ],
      v: table(['Formula', 'Use'], [[r`$\dfrac{1}{v} + \dfrac{1}{u} = \dfrac{1}{f}$`, 'Find u, v or f'], [r`$m = -\dfrac{v}{u}$`, 'Find the magnification'], [r`$m = \dfrac{h'}{h}$`, 'Find the image height']], 'Summary table of the mirror formula and two forms of magnification with their uses'),
      n: 'Let us recap. Fix the sign convention first, then use one over v plus one over u equals one over f, and m equals minus v over u. The signs of your answers describe the image: where it is, whether it is real or virtual, and whether it is upright or inverted. Practise a few problems every day and this becomes automatic.',
    }),
    sl('exam-tips', 'Exam tips: mirror numericals', {
      ul: [
        'Write **given** values with signs, then the **formula**, then **substitution**, then the **answer with unit**.',
        'Never drop the minus sign of a concave mirror’s focal length.',
        'Combine fractions carefully; find 1/v first, then invert.',
        'Finish with a sentence: position, nature (real or virtual, erect or inverted) and size.',
        'Check the answer against the ray-diagram table.',
        'Typical 3-mark split: signs and formula (1) + correct v (1) + m with nature of the image (1).',
      ],
      v: table(['Common mistake', 'Correct idea'], [['Taking f positive for a concave mirror', 'f is negative for a concave mirror'], ['Forgetting to invert 1/v', 'Find 1/v, then take its reciprocal'], ['Using m = v/u for mirrors', 'For mirrors, m = −v/u'], ['Giving v without its meaning', 'State real or virtual from the sign of v']], 'Table of common mistakes in mirror numericals with the correct ideas'),
      n: 'Most lost marks in numericals come from signs. Write every given value with its sign before touching the formula. Find one over v, then remember to turn it upside down. For mirrors, magnification has a minus sign: minus v over u. Finally, write a sentence describing the image. A correct number with no interpretation rarely earns full marks.',
    }),
  ],
});

export const deck3 = deck({
  part: 3,
  title: 'Light – Reflection and Refraction — Part 3: Refraction of light',
  goals: [
    'Explain refraction using everyday examples',
    'State the laws of refraction and trace a ray through a rectangular glass slab',
    'Calculate absolute and relative refractive index from speeds of light',
  ],
  slides: [
    sl('title', 'Refraction of light', {
      b: 'Part 3 — why light bends when it passes from one medium into another, and how we measure that bending.',
      v: flow('LR', [['a', 'Light in air'], ['b', 'Reaches a new medium'], ['c', 'Speed changes'], ['d', 'Direction changes: refraction']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow showing light reaching a new medium, changing speed and therefore changing direction'),
      n: 'Put a pencil in a glass of water and it looks broken at the surface. A coin at the bottom of a bucket seems closer than it is. A lemon in a glass of water looks bigger. All these tricks are caused by refraction, the bending of light as it passes from one medium into another. Let us find out why it happens and how to measure it.',
    }),
    sl('concept', 'What is refraction?', {
      b: 'Light travels at **different speeds** in different media. When it passes **obliquely** from one transparent medium into another, its speed changes and so does its **direction**. This change of direction is **refraction**.',
      v: table(['Everyday observation', 'Explained by'], [['Pencil looks bent at the water surface', 'Light from the submerged part bends as it leaves water'], ['Bottom of a pond looks shallower', 'Rays bend away from the normal as they leave water'], ['Letters look raised under a glass block', 'Refraction at the glass surfaces'], ['Lemon looks larger in a glass of water', 'The curved glass and water bend light like a lens']], 'Table of four everyday observations caused by refraction'),
      n: 'Imagine a column of marching students crossing from a smooth road onto sand at an angle. The students who reach the sand first slow down, while the others are still on the road, so the whole column swings round. Light does the same when one side of a beam slows down before the other. A change in speed, at an angle, means a change in direction.',
    }),
    sl('diagram', 'Refraction through a glass slab', {
      b: 'Entering glass from air, the ray bends **towards** the normal (r < i). Leaving glass into air, it bends **away** from the normal. In a slab with parallel faces, the **emergent ray is parallel to the incident ray**, but shifted sideways: the **lateral shift**.',
      v: V.slab,
      n: 'In the lab, you trace a ray through a rectangular glass slab with pins. On entering glass, light slows down and bends towards the normal. On leaving, it speeds up and bends away by exactly the same amount, because the two faces are parallel. So the light comes out travelling in its original direction, just shifted sideways. The angle of emergence equals the angle of incidence.',
    }),
    sl('concept', 'The laws of refraction', {
      b: r`**(1)** The incident ray, the refracted ray and the normal at the point of incidence lie in the **same plane**. **(2)** For a given pair of media and a given colour of light, the ratio of the sine of the angle of incidence to the sine of the angle of refraction is **constant** (**Snell’s law**). This constant is the **refractive index** of the second medium with respect to the first.`,
      m: [r`\dfrac{\sin i}{\sin r} = \text{constant} = n_{21}`],
      v: table(['Light passes from', 'To', 'Bends'], [['Rarer (air)', 'Denser (glass, water)', 'Towards the normal'], ['Denser (glass, water)', 'Rarer (air)', 'Away from the normal'], ['Any medium', 'Another, along the normal', 'Does not bend']], 'Table of the direction of bending when light passes between optically rarer and denser media'),
      n: 'The first law is like reflection: everything stays in one plane. The second law, Snell’s law, says that for two given materials, sine of i divided by sine of r is always the same number, whatever the angle. That number is the refractive index. Notice also that a ray hitting the surface straight on, along the normal, passes through without bending.',
    }),
    sl('example', 'Worked example 1: using Snell’s law', {
      b: r`A ray passes from air into a liquid. For one angle of incidence, $\sin i = 0.60$ and $\sin r = 0.45$. Find the refractive index of the liquid with respect to air. Will the ray bend towards or away from the normal?`,
      ul: [
        r`Step 1 — $n = \dfrac{\sin i}{\sin r}$.`,
        r`Step 2 — $n = \dfrac{0.60}{0.45} \approx 1.33$.`,
        'Step 3 — n is greater than 1, so the liquid is optically denser than air and the ray bends **towards** the normal.',
        'Check — 1.33 is close to the refractive index of water.',
      ],
      v: table(['Quantity', 'Value'], [['sin i', '0.60'], ['sin r', '0.45'], ['n', '≈ 1.33']], 'Worked table: sine of i 0.60, sine of r 0.45, refractive index about 1.33'),
      n: 'With sine values given, Snell’s law becomes a simple division. Zero point six zero divided by zero point four five is about one point three three. Because this is greater than one, the light slows down in the liquid and bends towards the normal. Comparing your answer with known values is a smart way to check it; this liquid behaves like water.',
    }),
    sl('check', 'Quick check: towards or away?', {
      b: 'A ray of light passes from water into air at an angle. What happens to it?',
      n: 'Quick check. Is light going from a denser to a rarer medium, or the other way? Which way does it bend?',
      chk: 'water-air-mcq',
    }),
    sl('concept', 'Refractive index and the speed of light', {
      b: r`The refractive index tells us how much light **slows down**. The **absolute refractive index** of a medium is $n = \dfrac{c}{v}$, where $c = 3 \times 10^8\ \text{m/s}$ is the speed of light in vacuum. The refractive index of medium 2 **relative** to medium 1 is $n_{21} = \dfrac{v_1}{v_2} = \dfrac{n_2}{n_1}$.`,
      m: [r`n_m = \dfrac{c}{v}`, r`n_{21} = \dfrac{v_1}{v_2} = \dfrac{n_2}{n_1}`],
      v: table(['Medium', 'Refractive index (approx.)'], [['Air', '1.0003'], ['Water', '1.33'], ['Kerosene', '1.44'], ['Crown glass', '1.52'], ['Diamond', '2.42']], 'Table of approximate refractive indices of air, water, kerosene, crown glass and diamond'),
      n: 'Light zips through a vacuum at three hundred thousand kilometres every second. In water it travels slower, and in diamond slower still. The refractive index compares these speeds. A refractive index of two point four two means light in diamond travels at less than half its speed in vacuum. A higher refractive index means a slower speed and a greater bending of light.',
    }),
    sl('example', 'Worked example 2: speed of light in glass', {
      b: r`The refractive index of a glass is 1.5 and that of water is 1.33. Find (a) the speed of light in the glass, and (b) the refractive index of glass with respect to water.`,
      ul: [
        r`Step 1 — (a) $v = \dfrac{c}{n} = \dfrac{3 \times 10^8}{1.5} = 2 \times 10^8\ \text{m/s}$.`,
        r`Step 2 — (b) $n_{gw} = \dfrac{n_g}{n_w} = \dfrac{1.5}{1.33} \approx 1.13$.`,
        'Step 3 — Light is slower in glass than in water, so glass is optically denser than water.',
        'Check — the relative index is between 1 and 1.5, as expected for two dense media.',
      ],
      v: table(['Quantity', 'Value'], [['Speed of light in glass', '2 × 10⁸ m/s'], ['Refractive index of glass relative to water', '≈ 1.13']], 'Worked table: speed of light in glass 2 times 10 to the power 8 metres per second; relative refractive index about 1.13'),
      n: 'For the speed, divide the speed of light in vacuum by the refractive index: three times ten to the power eight divided by one point five is two times ten to the power eight metres per second. For the relative refractive index, divide one absolute index by the other. Always ask whether your answer makes sense; a speed faster than light in vacuum would be impossible.',
    }),
    sl('check', 'Quick check: speed in a medium', {
      b: 'Solve the numerical question about the speed of light in a medium.',
      n: 'Your turn. Rearrange the refractive index formula to find the speed, and keep the powers of ten tidy.',
      chk: 'speed-num',
    }),
    sl('concept', 'Optical density is not mass density', {
      b: 'A medium with a **larger refractive index** is **optically denser**: light travels more slowly in it. This is **not** the same as mass density. Kerosene floats on water (lower mass density) but has a **higher** refractive index, so it is optically denser.',
      v: table(['Pair', 'Mass density', 'Optical density'], [['Kerosene and water', 'Kerosene is less dense (floats)', 'Kerosene is denser (n = 1.44 vs 1.33)'], ['Glass and water', 'Glass is denser', 'Glass is denser']], 'Table showing that kerosene is less dense than water by mass but optically denser'),
      n: 'Here is a classic trap. Kerosene floats on water, so it has a lower mass density. Yet light travels more slowly in kerosene, so it is optically denser. The words rarer and denser in optics always refer to how fast light travels, never to mass. When a question asks which medium is optically denser, look at the refractive index or the speed of light.',
    }),
    sl('check', 'Quick check: optically denser', {
      b: 'Judge the assertion and the reason about kerosene and water.',
      n: 'Quick check. Separate the two ideas of density in your head before you decide.',
      chk: 'kerosene-ar',
    }),
    sl('summary', 'Summary: refraction', {
      ul: [
        'Refraction is the change in direction of light when its speed changes at a boundary.',
        'Rarer to denser: bends towards the normal; denser to rarer: away from the normal.',
        'Glass slab: emergent ray parallel to incident ray, with a lateral shift.',
        r`Snell’s law: $\dfrac{\sin i}{\sin r} = n_{21}$ (constant).`,
        r`$n = \dfrac{c}{v}$; $n_{21} = \dfrac{v_1}{v_2} = \dfrac{n_2}{n_1}$.`,
        'Optical density depends on the speed of light, not on mass density.',
      ],
      v: table(['Formula', 'Meaning'], [[r`$\dfrac{\sin i}{\sin r} = n_{21}$`, 'Snell’s law'], [r`$n = \dfrac{c}{v}$`, 'Absolute refractive index'], [r`$n_{21} = \dfrac{n_2}{n_1}$`, 'Relative refractive index']], 'Summary table of Snell’s law and the absolute and relative refractive index formulas'),
      n: 'Let us recap. Light bends when it changes speed at a boundary between two media. Into a denser medium it bends towards the normal; into a rarer one, away. A glass slab returns the ray to its original direction, slightly shifted. Snell’s law gives a constant ratio, the refractive index, which also equals the ratio of the speeds of light.',
    }),
    sl('exam-tips', 'Exam tips: refraction', {
      ul: [
        'Draw the **normal** as a dashed line at each surface, and mark angles from the normal, not from the surface.',
        'In a slab diagram, show the emergent ray **parallel** to the incident ray and mark i, r and e.',
        'State Snell’s law with "for a given pair of media and a given colour of light".',
        'Write speeds with units (m/s) and powers of ten clearly.',
        'Remember: higher refractive index → lower speed → optically denser.',
        'Typical 3-mark split: laws stated (1) + labelled diagram (1) + calculation or explanation (1).',
      ],
      v: table(['Common mistake', 'Correct idea'], [['Angles measured from the surface', 'Angles are measured from the normal'], ['Emergent ray not parallel', 'For a slab, the emergent ray is parallel to the incident ray'], ['Kerosene is optically rarer because it floats', 'Optical density depends on the speed of light'], ['n can be less than 1 for glass', 'Absolute n of any material is greater than 1']], 'Table of common mistakes about refraction with the correct ideas'),
      n: 'Here are the habits that earn marks. Draw the normal every time and measure angles from it. In the slab diagram, make sure the emergent ray is parallel to the incident ray. When you state Snell’s law, include the condition about the pair of media and the colour of light. And remember that optical density is all about the speed of light.',
    }),
  ],
});

export const deck4 = deck({
  part: 4,
  title: 'Light – Reflection and Refraction — Part 4: Lenses, the lens formula and power',
  goals: [
    'Draw ray diagrams for convex and concave lenses for different object positions',
    'Use the lens formula and magnification formula to solve problems',
    'Calculate the power of a lens in dioptres and of lenses in contact',
  ],
  slides: [
    sl('title', 'Spherical lenses', {
      b: 'Part 4 — how lenses form images, the lens formula, and the power of a lens that opticians write in dioptres.',
      v: flow('LR', [['l', 'Lens'], ['r', 'Refraction at two curved surfaces'], ['i', 'Image found by ray diagram'], ['f', 'Lens formula'], ['p', 'Power in dioptres']], [['l', 'r'], ['r', 'i'], ['i', 'f'], ['f', 'p']], 'Flow from a lens to refraction at its surfaces, image formation, the lens formula and power'),
      n: 'Spectacles, cameras, microscopes, projectors and your own eyes all use lenses. A lens is simply a piece of glass or plastic with curved surfaces that bends light by refraction. In this final part we learn to find images formed by lenses, calculate their positions with the lens formula, and understand the power printed on a spectacle prescription.',
    }),
    sl('concept', 'Convex and concave lenses', {
      b: 'A **convex lens** is thicker in the middle; it **converges** parallel rays. A **concave lens** is thinner in the middle; it **diverges** parallel rays.',
      v: table(['', 'Convex lens', 'Concave lens'], [['Shape', 'Thicker at the middle', 'Thicker at the edges'], ['Effect on parallel rays', 'Converges to F₂', 'Diverges as if from F₁'], ['Also called', 'Converging lens', 'Diverging lens'], ['Example', 'Magnifying glass', 'Lens in spectacles for short sight']], 'Table comparing convex and concave lenses by shape, effect on light, other name and example'),
      n: 'Run your finger over a magnifying glass: it bulges in the middle, so it is convex. A convex lens bends parallel rays inwards to meet at a point. A concave lens is thinner in the middle and spreads rays outwards. Each lens has an optical centre, a principal axis, and two foci, one on each side, because light can pass through it either way.',
    }),
    sl('concept', 'Lens terms and ray rules', {
      b: 'The **optical centre (O)** is the centre of the lens; a ray through O passes **undeviated**. Each lens has two principal foci, **F₁** and **F₂**, at the **focal length f** from O; **2F₁** and **2F₂** are at twice the focal length.',
      v: table(['Incident ray', 'Convex lens: refracted ray', 'Concave lens: refracted ray'], [['Parallel to the axis', 'Passes through F₂', 'Appears to come from F₁'], ['Through F₁ (or towards F₂ for concave)', 'Emerges parallel to the axis', 'Emerges parallel to the axis'], ['Through O', 'Goes straight on', 'Goes straight on']], 'Table of three standard rays and how convex and concave lenses refract them'),
      n: 'Lens ray diagrams use three easy rays. A ray parallel to the axis bends through the far focus of a convex lens, or spreads out as if from the near focus of a concave lens. A ray through the near focus comes out parallel. And a ray through the optical centre goes straight through, without bending. Any two of these rays locate the image.',
    }),
    sl('diagram', 'Convex lens: object at infinity', {
      b: 'Parallel rays from a distant object converge at **F₂**: a real, inverted, **point-sized** image.',
      v: V.lInf,
      n: 'Hold a convex lens in sunlight and move a piece of paper behind it. At one distance, a tiny dazzling spot appears. That spot is the image of the Sun, formed at the focus. The distance from the lens to the spot is the focal length. Be careful: the spot is hot enough to burn paper, so never look at the Sun through a lens.',
    }),
    sl('diagram', 'Convex lens: object beyond 2F₁', {
      b: 'The image forms **between F₂ and 2F₂**: **real, inverted, diminished**.',
      v: V.lBeyond,
      n: 'Here the object is far from the lens, beyond twice the focal length. The parallel ray bends through F two, and the ray through the optical centre goes straight on. They meet on the other side, between F two and two F two, giving a small, upside-down, real image. This is how a camera lens fits a big scene onto a small sensor.',
    }),
    sl('diagram', 'Convex lens: object at 2F₁', {
      b: 'The image forms **at 2F₂**: **real, inverted, same size**.',
      v: V.lAt2F,
      n: 'When the object sits at two F one, the image appears at two F two, exactly the same size but upside down. This symmetry is worth remembering. It is also a handy way to measure the focal length in the lab: adjust until object and image are the same size, then the distance between them is four times the focal length.',
    }),
    sl('check', 'Quick check: the camera', {
      b: 'Where must an object be placed in front of a convex lens to get a real, inverted and diminished image?',
      n: 'Quick check. Diminished real images come from distant objects. Which region of the axis gives one?',
      chk: 'lens-diminished-mcq',
    }),
    sl('diagram', 'Convex lens: object between F₁ and 2F₁', {
      b: 'The image forms **beyond 2F₂**: **real, inverted, enlarged**.',
      v: V.l2FF,
      n: 'Bring the object between F one and two F one, and the image moves far out beyond two F two and becomes larger than the object. A film or slide projector works this way: a small picture close to the lens becomes a huge image on a distant screen. That is why slides are put into projectors upside down.',
    }),
    sl('diagram', 'Convex lens: object at F₁', {
      b: 'The refracted rays emerge **parallel**: the image is at **infinity**, real, inverted, highly enlarged.',
      v: V.lAtF,
      n: 'With the object exactly at the focus, the lens sends out a parallel beam. The rays never meet, so the image is at infinity. Lighthouses and some torches use this idea with lenses, placing the light source at the focus so the beam travels far without spreading.',
    }),
    sl('diagram', 'Convex lens: object between F₁ and O', {
      b: 'The refracted rays **diverge**; traced back, they meet on the **same side** as the object: a **virtual, erect, enlarged** image. This is how a **magnifying glass** works.',
      v: V.lFO,
      n: 'Hold a magnifying glass close to small print, closer than its focal length. The letters look big and upright. The rays leaving the lens spread apart, and your eye traces them back to a larger image on the same side as the print. Because the light does not actually come from there, the image is virtual and cannot be caught on a screen.',
    }),
    sl('concept', 'Convex lens images: the full table', {
      b: 'The pattern matches the concave mirror, with 2F and F in place of C and F.',
      v: convexLensTable,
      n: 'Compare this table with the concave mirror table and you will see the same story. As the object approaches the lens, the image moves away and grows, until it becomes virtual and erect inside the focus. Instead of C and F we now use two F and F. Learn one table well, and the other almost comes for free.',
    }),
    sl('diagram', 'Concave lens: always virtual and small', {
      b: 'A concave lens always gives a **virtual, erect, diminished** image, **between F₁ and O**, on the same side as the object. Parallel rays diverge as if from **F₁**.',
      v: V.lConcave,
      n: 'A concave lens behaves like a convex mirror. Whatever the position of the object, the rays spread out after the lens, and the image is small, upright and virtual, between the focus and the lens. People who cannot see distant objects clearly often wear concave lenses, as you will learn in the next chapter.',
    }),
    sl('concept', 'The lens formula and magnification', {
      b: r`The same sign convention applies, with the **optical centre** as the origin. The **lens formula** links $u$, $v$ and $f$. Magnification is $m = \dfrac{h'}{h} = \dfrac{v}{u}$ (note: **no minus sign** for lenses). For a **convex** lens $f$ is **positive**; for a **concave** lens $f$ is **negative**.`,
      m: [r`\dfrac{1}{v} - \dfrac{1}{u} = \dfrac{1}{f}`, r`m = \dfrac{h'}{h} = \dfrac{v}{u}`],
      v: table(['Quantity', 'Convex lens', 'Concave lens'], [['f', 'Positive', 'Negative'], ['v for a real image', 'Positive (other side)', 'Not possible'], ['v for a virtual image', 'Negative (same side)', 'Negative (same side)'], ['m for a real image', 'Negative', 'Not possible']], 'Table of the signs of focal length, image distance and magnification for convex and concave lenses'),
      n: 'Notice two differences from mirrors. The lens formula has a minus sign: one over v minus one over u equals one over f. And magnification for a lens is simply v over u, with no minus sign. A convex lens has a positive focal length because its focus F two is on the far side, where light travels to. A concave lens has a negative focal length.',
    }),
    sl('example', 'Worked example 1: convex lens', {
      b: r`An object is placed 18 cm in front of a convex lens of focal length 12 cm. Find the position and nature of the image and the magnification.`,
      ul: [
        r`Step 1 — Signs: $u = -18\ \text{cm}$, $f = +12\ \text{cm}$.`,
        r`Step 2 — $\dfrac{1}{v} = \dfrac{1}{f} + \dfrac{1}{u} = \dfrac{1}{12} - \dfrac{1}{18} = \dfrac{1}{36}$, so $v = +36\ \text{cm}$.`,
        r`Step 3 — $m = \dfrac{v}{u} = \dfrac{36}{-18} = -2$.`,
        'Conclusion — the image is 36 cm on the **other side** of the lens, **real, inverted** and **twice** the size.',
      ],
      v: V.l2FF,
      n: 'Rearrange the lens formula to give one over v equals one over f plus one over u. With u negative, this becomes one over twelve minus one over eighteen, which is one over thirty-six. The image is thirty-six centimetres behind the lens, real because v is positive, and inverted because m is negative. The object is between F one and two F one, exactly as in the diagram.',
    }),
    sl('example', 'Worked example 2: concave lens', {
      b: r`An object is placed 30 cm in front of a concave lens of focal length 15 cm. Find the image distance and magnification.`,
      ul: [
        r`Step 1 — Signs: $u = -30\ \text{cm}$, $f = -15\ \text{cm}$.`,
        r`Step 2 — $\dfrac{1}{v} = \dfrac{1}{f} + \dfrac{1}{u} = -\dfrac{1}{15} - \dfrac{1}{30} = -\dfrac{1}{10}$, so $v = -10\ \text{cm}$.`,
        r`Step 3 — $m = \dfrac{v}{u} = \dfrac{-10}{-30} \approx +0.33$.`,
        'Conclusion — the image is 10 cm from the lens on the **same side** as the object: **virtual, erect**, about **one third** the size.',
      ],
      v: table(['Quantity', 'Value', 'Meaning'], [['v', '−10 cm', 'Same side as the object: virtual'], ['m', '+1/3', 'Erect, diminished']], 'Worked table: image distance minus 10 centimetres, magnification plus one third'),
      n: 'For a concave lens, remember that the focal length is negative. Both terms on the right are then negative, and v comes out negative, so the image is on the same side as the object and virtual. The magnification is positive and less than one: upright and smaller. A concave lens can never give a real image of a real object.',
    }),
    sl('check', 'Quick check: lens numerical', {
      b: 'Solve the numerical question about a convex lens.',
      n: 'Your turn. Use one over v equals one over f plus one over u, with the signs written first.',
      chk: 'lens-v-num',
    }),
    sl('concept', 'Power of a lens', {
      b: r`The **power** of a lens is its ability to converge or diverge light: $P = \dfrac{1}{f}$, with $f$ in **metres**. The unit is the **dioptre (D)**: $1\ \text{D} = 1\ \text{m}^{-1}$. A **convex** lens has **positive** power; a **concave** lens **negative** power. For lenses in **contact**, the powers **add**: $P = P_1 + P_2 + \dots$`,
      m: [r`P = \dfrac{1}{f\,(\text{in m})}`, r`P = P_1 + P_2 + P_3 + \dots`],
      v: table(['Lens', 'Focal length', 'Power'], [['Convex', '+0.50 m', '+2.0 D'], ['Convex', '+0.25 m', '+4.0 D'], ['Concave', '−0.40 m', '−2.5 D'], ['Concave', '−1.00 m', '−1.0 D']], 'Table of four lenses with their focal lengths in metres and powers in dioptres'),
      n: 'A strongly curved lens bends light sharply and has a short focal length, so it is more powerful. Power is one divided by the focal length in metres, measured in dioptres. Opticians write a plus sign for convex lenses and a minus sign for concave ones. When lenses are placed together, as in a camera, their powers simply add up.',
    }),
    sl('example', 'Worked example 3: power and lenses in contact', {
      b: r`(a) Find the power of a concave lens of focal length 25 cm. (b) A convex lens of power +2.5 D is placed in contact with a concave lens of power −1.0 D. Find the power and focal length of the combination.`,
      ul: [
        r`Step 1 — (a) $f = -25\ \text{cm} = -0.25\ \text{m}$, so $P = \dfrac{1}{-0.25} = -4\ \text{D}$.`,
        r`Step 2 — (b) $P = P_1 + P_2 = +2.5 + (-1.0) = +1.5\ \text{D}$.`,
        r`Step 3 — $f = \dfrac{1}{P} = \dfrac{1}{1.5} \approx 0.67\ \text{m} = 67\ \text{cm}$; positive, so the combination acts as a **convex** lens.`,
        'Check — always convert centimetres to metres before using P = 1/f.',
      ],
      v: table(['Lens', 'Power'], [['Concave, f = 25 cm', '−4 D'], ['Convex', '+2.5 D'], ['Concave', '−1.0 D'], ['Combination', '+1.5 D (f ≈ 67 cm)']], 'Worked table of lens powers: minus 4 dioptres, plus 2.5, minus 1.0, and the combination plus 1.5 dioptres'),
      n: 'The most common slip in power questions is forgetting to convert centimetres into metres. Twenty-five centimetres is zero point two five metres, so the power is minus four dioptres. For lenses in contact, just add the powers with their signs. Plus two point five and minus one give plus one point five dioptres, which means the pair behaves like a convex lens.',
    }),
    sl('check', 'Quick check: power and sign', {
      b: 'Judge the assertion and the reason about the power of lenses.',
      n: 'Quick check. Think about the sign of the focal length of each kind of lens.',
      chk: 'power-sign-ar',
    }),
    sl('summary', 'Summary: lenses', {
      ul: [
        'Convex lenses converge light; concave lenses diverge it.',
        'Ray rules: parallel → through F₂ (or from F₁); through F₁ → parallel; through O → straight on.',
        'Convex lens images follow the same pattern as a concave mirror; inside F it acts as a magnifier.',
        'Concave lens: always virtual, erect, diminished, between F₁ and O.',
        r`Lens formula $\dfrac{1}{v} - \dfrac{1}{u} = \dfrac{1}{f}$; $m = \dfrac{v}{u}$.`,
        r`Power $P = \dfrac{1}{f}$ (f in metres), in dioptres; powers in contact add.`,
      ],
      v: table(['Formula', 'Use'], [[r`$\dfrac{1}{v} - \dfrac{1}{u} = \dfrac{1}{f}$`, 'Find u, v or f'], [r`$m = \dfrac{v}{u} = \dfrac{h'}{h}$`, 'Magnification and image height'], [r`$P = \dfrac{1}{f}$`, 'Power in dioptres (f in m)']], 'Summary table of the lens formula, magnification and power formulas with their uses'),
      n: 'Let us recap. Convex lenses bring light together and can form real or virtual images; concave lenses spread light out and always form small, upright, virtual images. The lens formula has a minus sign, and lens magnification has none. Power, in dioptres, is one over the focal length in metres, and the powers of lenses in contact simply add.',
    }),
    sl('exam-tips', 'Exam tips: lens problems', {
      ul: [
        'Lens formula: **1/v − 1/u = 1/f**; mirror formula: **1/v + 1/u = 1/f**. Do not mix them up.',
        'Lens magnification is **v/u**; mirror magnification is **−v/u**.',
        'Convex lens: f positive; concave lens: f negative.',
        'Convert cm to m before finding power; state the sign and the unit D.',
        'In lens diagrams, mark O, F₁, F₂, 2F₁, 2F₂, and dash virtual rays.',
        'Typical 3-mark split: signs and formula (1) + v or P (1) + nature of image or type of lens (1).',
      ],
      v: table(['Common mistake', 'Correct idea'], [['Using the mirror formula for a lens', 'Use 1/v − 1/u = 1/f for lenses'], ['m = −v/u for a lens', 'For a lens, m = v/u'], ['P = 1/f with f in cm', 'f must be in metres'], ['Concave lens power written as positive', 'Concave lenses have negative power']], 'Table of common mistakes in lens problems with the correct ideas'),
      n: 'Here is the checklist for full marks. Use the right formula: lenses have a minus sign between the fractions, mirrors a plus. Lens magnification has no minus sign. Give the focal length its correct sign for the type of lens. Convert to metres before calculating power, and always end with the sign and the unit, dioptre.',
    }),
  ],
});
