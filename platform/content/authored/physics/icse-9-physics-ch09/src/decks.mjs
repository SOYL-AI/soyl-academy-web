// ICSE 9 Physics ch09 Spherical Mirrors. Deck 1: terms, f = R/2, paths of specific rays and the images formed by a concave mirror
// for each object position (t01, t02, t03). Deck 2: the convex mirror, uses, the Cartesian sign convention, the mirror formula
// and magnification (t04, t05). Numbers come from calc.mjs; narration carries no digits, symbols or unit abbreviations.
// Derivation of the mirror formula and scale drawing are removed topics: ray diagrams are simple sketches.
import { sl, deck, table, flow, svgV, r } from '../../icse-9-physics-ch01/src/lib.mjs';
import { TERMS, PAR_CONCAVE, PAR_CONVEX, PAR_INCL, CASE_BEYOND_C, CASE_AT_C, CASE_C_F, CASE_AT_F, CASE_IN_F, CASE_CONVEX, SIGN } from './svgs.mjs';
import { CASES, D1, D1_X, D1_CLASS, D1_CLASS_V, D2_EX1, D2_EX2 } from './calc.mjs';

export const V = {
  terms: svgV(TERMS, 'A concave mirror with the pole, focus, centre of curvature, principal axis, R and f marked'),
  parConcave: svgV(PAR_CONCAVE, 'Rays parallel to the axis meeting at the focus after reflection from a concave mirror'),
  parConvex: svgV(PAR_CONVEX, 'Rays parallel to the axis appearing to diverge from the focus behind a convex mirror'),
  parIncl: svgV(PAR_INCL, 'A parallel beam at a small angle to the axis meeting at a point on the focal plane of a concave mirror'),
  beyondC: svgV(CASE_BEYOND_C, 'Ray diagram for an object beyond the centre of curvature of a concave mirror'),
  atC: svgV(CASE_AT_C, 'Ray diagram for an object at the centre of curvature of a concave mirror'),
  cf: svgV(CASE_C_F, 'Ray diagram for an object between the centre of curvature and the focus of a concave mirror'),
  atF: svgV(CASE_AT_F, 'Ray diagram for an object at the focus of a concave mirror'),
  inF: svgV(CASE_IN_F, 'Ray diagram for an object between the focus and the pole of a concave mirror'),
  convex: svgV(CASE_CONVEX, 'Ray diagram for an object in front of a convex mirror'),
  sign: svgV(SIGN, 'The Cartesian sign convention for a mirror'),
};

const size = (m) => (!Number.isFinite(m) ? 'Highly enlarged' : Math.abs(m) < 1 ? 'Diminished' : Math.abs(m) === 1 ? 'Same size' : 'Enlarged');
const where = ['Between F and C', 'At C', 'Beyond C', 'At infinity', 'Behind the mirror'];
const nature = ['Real, inverted', 'Real, inverted', 'Real, inverted', 'Real, inverted', 'Virtual, erect'];
const posName = ['Beyond C', 'At C', 'Between C and F', 'At F', 'Between F and P'];

export const deck1 = deck({
  part: 1,
  title: 'Spherical Mirrors — Part 1: Terms, specific rays and images in a concave mirror',
  goals: [
    'Name the parts of a spherical mirror and use f = R/2',
    'Draw the reflected ray for each of the specific incident rays',
    'Draw simple ray diagrams for a concave mirror and state the position, nature and size of the image for each object position',
  ],
  slides: [
    sl('title', 'Mirrors that curve', {
      b: 'Part 1 — a curved mirror can gather light into a point or spread it out, depending on which side shines.',
      v: flow('LR', [['a', 'Part of a hollow sphere'], ['b', 'Reflecting surface inside: concave'], ['c', 'Reflecting surface outside: convex']], [['a', 'b'], ['a', 'c']], 'Flow from a part of a hollow sphere to the concave and convex mirrors'),
      n: 'A shiny spoon shows your face upside down on one side and upright on the other. That is because a spoon is a curved mirror, and the two sides are a concave and a convex surface.',
    }),
    sl('concept', 'The parts of a spherical mirror', {
      b: 'A spherical mirror is part of a hollow sphere. Its middle point is the **pole P**. The centre of the sphere is the **centre of curvature C**, and the **radius of curvature R** is the distance PC. The line PC is the **principal axis**. The **principal focus F** is where rays parallel to the axis meet, and the **focal length f** is the distance PF.',
      v: V.terms,
      n: 'The pole is the middle of the mirror. The centre of the sphere it came from is the centre of curvature. The line joining them is the principal axis. The focus lies halfway between the pole and the centre.',
    }),
    sl('concept', 'Concave and convex; f = R/2', {
      b: 'In a **concave** mirror the reflecting surface curves **inwards**; it **converges** parallel rays to a **real** focus in front. In a **convex** mirror the surface bulges **outwards**; it **diverges** parallel rays, which appear to come from a **virtual** focus behind it. For both, the focal length is **half** the radius of curvature: $f = \\dfrac{R}{2}$.',
      v: table(['', 'Concave mirror', 'Convex mirror'], [['Reflecting surface', 'Curved inwards', 'Bulges outwards'], ['Parallel rays', 'Converge at F', 'Appear to diverge from F'], ['Focus', 'Real, in front', 'Virtual, behind'], ['Other name', 'Converging mirror', 'Diverging mirror']], 'Table comparing a concave mirror and a convex mirror'),
      m: [r`f = \dfrac{R}{2}`],
      n: 'A concave mirror curves inwards like the inside of a bowl, and it brings parallel rays together. A convex mirror bulges outwards and spreads rays apart. In both cases the focal length is half the radius of curvature.',
    }),
    sl('example', 'Worked example 1: f from R', {
      b: r`**Problem.** A concave mirror has a radius of curvature of ${Math.abs(D1.R)} cm. A convex mirror has a radius of curvature of ${D1_X.Rc} cm. Find the focal length of each.

**Step 1.** Concave: $f = \dfrac{R}{2} = \dfrac{${Math.abs(D1.R)}}{2} = ${Math.abs(D1.f)}$ cm (in the sign convention, $f = ${D1.f}$ cm).

**Step 2.** Convex: $f = \dfrac{${D1_X.Rc}}{2} = ${D1_X.f}$ cm (in the sign convention, $f = +${D1_X.f}$ cm).`,
      v: table(['Mirror', 'R', 'f'], [['Concave', `${Math.abs(D1.R)} cm`, `${Math.abs(D1.f)} cm (${D1.f} cm with sign)`], ['Convex', `${D1_X.Rc} cm`, `${D1_X.f} cm (+${D1_X.f} cm with sign)`]], 'Table of the radius of curvature and the focal length of a concave and a convex mirror'),
      n: 'Divide the radius of curvature by two. The concave mirror has a focal length of fifteen centimetres and the convex mirror has twenty centimetres. Later we will give the concave one a negative sign.',
    }),
    sl('check', 'Quick check: focal length', {
      b: 'Use f = R ÷ 2.',
      v: table(['Mirror', 'Radius of curvature'], [['Concave', '30 cm']], 'Table of the radius of curvature of a concave mirror'),
      chk: 'chk-fr',
      n: 'A spherical mirror has a radius of curvature of thirty centimetres. What is its focal length?',
    }),
    sl('concept', 'Specific rays: parallel to the axis and through F', {
      b: 'We draw images using rays whose path we know. **A ray parallel to the principal axis** is reflected **through F** (concave) or **as if from F** (convex). **A ray through F** (or directed towards F) is reflected **parallel to the axis**. **A ray through C** (or towards C) is reflected **straight back** along its own path.',
      v: V.parConcave,
      n: 'In the diagram a beam parallel to the axis is reflected through the focus. The reverse also holds: a ray through the focus comes back parallel to the axis. A ray directed through the centre of curvature returns along its own path.',
    }),
    sl('concept', 'A parallel beam at an angle', {
      b: 'A beam of **parallel rays at a small angle to the axis** is reflected so that the rays meet at a point **Q** on the **focal plane**, the plane through F at **right angles** to the principal axis. A very distant object gives parallel rays, so its image lies **at the focus**: for an object at infinity the image is formed at F.',
      v: V.parIncl,
      n: 'If the parallel beam slants a little, the rays still meet at one point, but now the point lies above or below the focus on the focal plane. A very distant object sends nearly parallel rays, so its image forms at the focus.',
    }),
    sl('check', 'Quick check: the specific rays', {
      b: 'Recall what happens to a ray that is parallel to the axis.',
      v: table(['Incident ray', 'Concave mirror'], [['Parallel to the principal axis', '?']], 'Table asking for the reflected ray when the incident ray is parallel to the principal axis'),
      chk: 'chk-ray',
      n: 'A ray of light parallel to the principal axis falls on a concave mirror. Where does the reflected ray go?',
    }),
    sl('concept', 'Object beyond C', {
      b: 'When the object is **beyond C**, the image is formed **between F and C**. It is **real, inverted and diminished**.',
      v: V.beyondC,
      n: 'The object is far from the mirror, beyond the centre of curvature. The reflected rays meet between the focus and the centre. The image is real, upside down and smaller than the object.',
    }),
    sl('concept', 'Object at C', {
      b: 'When the object is **at C**, the image is formed **at C**. It is **real, inverted and the same size** as the object.',
      v: V.atC,
      n: 'With the object at the centre of curvature, the image forms at the same place. It is real, upside down and of the same size as the object.',
    }),
    sl('concept', 'Object between C and F', {
      b: 'When the object is **between C and F**, the image is formed **beyond C**. It is **real, inverted and enlarged**.',
      v: V.cf,
      n: 'Moving the object closer, between the centre and the focus, makes the image move out beyond the centre of curvature. It is still real and upside down, but now it is larger than the object.',
    }),
    sl('concept', 'Object at F', {
      b: 'When the object is **at F**, the reflected rays are **parallel**, so the image is formed **at infinity**. It is **real, inverted and highly enlarged**. A lamp placed at F gives a **parallel beam**.',
      v: V.atF,
      n: 'With the object at the focus, the reflected rays travel parallel to each other and never meet, so the image is at infinity. This is how a torch reflector gives a parallel beam of light.',
    }),
    sl('concept', 'Object between F and P', {
      b: 'When the object is **between F and P** (inside the focus), the reflected rays **diverge**. Traced backwards they meet **behind the mirror**: the image is **virtual, erect and enlarged**. This is how a **shaving mirror** works.',
      v: V.inF,
      n: 'If the object is closer than the focus, the reflected rays spread out. We trace them back behind the mirror, where they seem to meet. The image is virtual, upright and larger, as you see in a shaving mirror.',
    }),
    sl('concept', 'All the cases in one table', {
      b: 'Position, nature and size of the image formed by a **concave mirror**. The magnifications are computed from the mirror formula for a mirror with $f = -10$ cm (object distances $u = -30, -20, -15, -10$ and $-5$ cm).',
      v: table(['Object position', 'Image position', 'Nature', 'Size'], [...CASES.map((c, k) => [posName[k], where[k], nature[k], size(c.m)]), ['At infinity', 'At F', 'Real, inverted', 'Highly diminished (a point)']], 'Table of the position, nature and size of the image for each position of the object in front of a concave mirror'),
      n: 'Here is the whole story. As the object moves from far away towards the mirror, the real image moves from the focus out to infinity and grows. Inside the focus the image turns virtual, upright and enlarged.',
    }),
    sl('example', 'Worked example 2: where is the object?', {
      b: r`**Problem.** A concave mirror has $f = ${D1_CLASS.f}$ cm. An object is ${Math.abs(D1_CLASS.u)} cm in front of it. In which region is the object, and where is the image?

**Step 1.** $R = 2f = ${D1_CLASS.R}$ cm, so C is ${Math.abs(D1_CLASS.R)} cm from the pole. The object at ${Math.abs(D1_CLASS.u)} cm is **beyond C**.

**Step 2.** The image is real and between F and C. By the formula, $v = ${D1_CLASS_V}$ cm, which is between ${Math.abs(D1_CLASS.f)} cm and ${Math.abs(D1_CLASS.R)} cm in front.`,
      v: table(['Quantity', 'Value'], [['Focal length', `${Math.abs(D1_CLASS.f)} cm`], ['Distance of C', `${Math.abs(D1_CLASS.R)} cm`], ['Object distance', `${Math.abs(D1_CLASS.u)} cm, beyond C`], ['Image distance', `${Math.abs(D1_CLASS_V)} cm, between F and C`]], 'Table of the focal length, centre of curvature, object distance and image distance'),
      n: 'Find the centre of curvature by doubling the focal length. The object is farther than that, so it is beyond the centre. The image therefore lies between the focus and the centre, and the formula confirms this.',
    }),
    sl('check', 'Quick check: object at C', {
      b: 'Look at the table of cases.',
      v: table(['Object position', 'Image?'], [['At C', '?']], 'Table asking for the image formed when the object is at the centre of curvature'),
      chk: 'chk-case',
      n: 'An object is placed at the centre of curvature of a concave mirror. Which statement about the image is correct?',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Spherical mirror terms: pole P, centre of curvature C, radius R, principal axis, focus F, focal length f; f = R/2.',
        'Specific rays: parallel to the axis → through F; through F → parallel to the axis; through C → back along itself.',
        'Concave mirror: object beyond C → image between F and C (real, inverted, diminished); at C → at C (same size); between C and F → beyond C (enlarged); at F → at infinity; between F and P → virtual, erect, enlarged.',
        'Parallel rays at a small angle meet on the focal plane; an object at infinity gives an image at F.',
      ],
      v: table(['Object', 'Image'], [['Beyond C', 'Between F and C'], ['At C', 'At C'], ['Between C and F', 'Beyond C'], ['At F', 'At infinity'], ['Between F and P', 'Virtual, behind the mirror']], 'Summary table of the object positions and the image positions for a concave mirror'),
      n: 'To sum up Part one. Learn the parts of the mirror and the three specific rays. For a concave mirror, the image is real and upside down for every object beyond the focus, and virtual, upright and larger inside the focus.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'Draw the principal axis and mark P, F and C before the rays; put arrows on every ray.',
        'Use two rays that you know; draw the third only as a check.',
        'Use dotted lines for virtual rays and virtual images behind the mirror.',
        'State the position, nature and size of the image in your answer; scale drawing is not required.',
      ],
      v: table(['Slip', 'Fix'], [['Reflected ray drawn without an arrow', 'Put arrows on all rays'], ['Real image drawn with a dotted line', 'Real: continuous; virtual: dotted'], ['Image left unlabelled', 'State position, nature and size']], 'Table of three common slips and their fixes'),
      n: 'Exam tips. Mark the pole, the focus and the centre before you draw. Put an arrow on every ray. Use dotted lines for anything virtual. And always state the position, nature and size of the image.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Spherical Mirrors — Part 2: The convex mirror, uses and the mirror formula',
  goals: [
    'Explain why a convex mirror always forms a virtual, erect, diminished image and justify the uses of concave and convex mirrors',
    'Apply the Cartesian sign convention to u, v, f and R',
    'Solve direct numerical problems using 1/v + 1/u = 1/f and magnification m = −v/u',
  ],
  slides: [
    sl('title', 'The mirror that sees more', {
      b: 'Part 2 — the convex mirror always gives a small, upright image, and a simple formula gives the numbers for any mirror.',
      v: flow('LR', [['a', 'Convex mirror'], ['b', 'Wide field of view'], ['c', 'Rear-view mirror']], [['a', 'b'], ['b', 'c']], 'Flow from the convex mirror to its wide field of view to its use as a rear-view mirror'),
      n: 'The mirror on the side of a car shows a wide view of the road behind, though everything looks small. That mirror is convex, and this part explains why it behaves this way.',
    }),
    sl('concept', 'The image in a convex mirror', {
      b: 'For **every** position of the object, a convex mirror forms an image that is **virtual, erect and diminished**, between the **pole and the focus**, behind the mirror. The image moves towards F as the object moves far away, and gets nearer to the pole as the object comes closer.',
      v: V.convex,
      n: 'The rays reflected by a convex mirror always spread apart. Traced backwards, they meet behind the mirror, between the pole and the focus. The image is virtual, upright and smaller than the object.',
    }),
    sl('concept', 'Why a convex mirror cannot give a real image', {
      b: 'A convex mirror **diverges** all rays. Reflected rays never meet in front of the mirror, so **no real image** can form. Only their **backward extensions** meet, behind the mirror, which gives a **virtual** image. Since the rays spread, the image is always **smaller** than the object.',
      v: table(['Mirror', 'Image for any object position'], [['Convex', 'Virtual, erect, diminished, between P and F'], ['Concave (beyond F)', 'Real, inverted'], ['Concave (inside F)', 'Virtual, erect, enlarged']], 'Table comparing the images formed by a convex mirror and a concave mirror'),
      n: 'Because a convex mirror spreads the rays apart, they cannot meet in front of it. Only their backward extensions meet, and so the image is always virtual, upright and smaller.',
    }),
    sl('check', 'Quick check: the convex mirror', {
      b: 'Recall what a convex mirror does to parallel rays.',
      v: table(['Mirror', 'Object'], [['Convex', 'Any position in front']], 'Table of a convex mirror with an object at any position in front'),
      chk: 'chk-conv',
      n: 'Which description is always correct for the image formed by a convex mirror?',
    }),
    sl('concept', 'Uses of concave and convex mirrors', {
      b: 'A **concave** mirror with the object **inside F** gives an **enlarged, erect** image: **shaving and make-up mirrors**, dentists’ mirrors. A lamp at **F** gives a **parallel beam**: **torches and car headlights**. It also focuses sunlight: **solar cookers**. A **convex** mirror gives a **wide field of view** with an erect image: **rear-view mirrors**, **shop security mirrors** and **street lights**.',
      v: table(['Mirror', 'Use', 'Reason'], [['Concave', 'Shaving mirror', 'Erect, enlarged image when the face is within F'], ['Concave', 'Torch or headlight reflector', 'Lamp at F gives a parallel beam'], ['Convex', 'Rear-view mirror', 'Wide field of view; erect image'], ['Convex', 'Shop security mirror', 'Shows a wide area']], 'Table of four uses of concave and convex mirrors and the reason for each'),
      n: 'A shaving mirror is concave, with the face inside the focus, so the image is upright and large. A torch uses a concave reflector with the lamp at the focus. Rear-view mirrors are convex to give a wide view.',
    }),
    sl('concept', 'The Cartesian sign convention', {
      b: 'The **pole is the origin**. Light travels **from left to right**, and the object is always on the left. Distances **against** the direction of the incident light are **negative**; along it, **positive**. Heights **above** the principal axis are **positive**, below it negative.',
      v: V.sign,
      n: 'Take the pole as zero. The object is on the left, so its distance is negative. Distances measured in the direction of the light are positive. Heights above the axis are positive.',
    }),
    sl('concept', 'Signs for the two mirrors', {
      b: 'For a **concave** mirror, **f and R are negative**. For a **convex** mirror, **f and R are positive**. The object distance **u is always negative** for a real object. A **real** image of a concave mirror has a **negative v** (in front); a **virtual** image has a **positive v** (behind the mirror).',
      v: table(['Quantity', 'Concave mirror', 'Convex mirror'], [['f and R', 'Negative', 'Positive'], ['u (real object)', 'Negative', 'Negative'], ['v of a real image', 'Negative', 'Not formed'], ['v of a virtual image', 'Positive', 'Positive']], 'Table of the signs of f, R, u and v for a concave and a convex mirror'),
      n: 'Remember: a concave mirror has a negative focal length and a convex mirror has a positive focal length. The object distance is always negative. A real image is in front, so its distance is negative too.',
    }),
    sl('concept', 'The mirror formula and magnification', {
      b: 'For a mirror, $\\dfrac{1}{v} + \\dfrac{1}{u} = \\dfrac{1}{f}$. The **magnification** is the ratio of image height to object height: $m = \\dfrac{h\'}{h} = -\\dfrac{v}{u}$. A **negative m** means an **inverted** (real) image, a **positive m** an **erect** (virtual) one. $|m| > 1$ means enlarged, $|m| < 1$ diminished. We use the formula without proof.',
      v: table(['Quantity', 'Symbol', 'Meaning'], [['Object distance', 'u', 'Negative'], ['Image distance', 'v', 'Negative if real, positive if virtual'], ['Focal length', 'f', 'Negative concave, positive convex'], ['Magnification', 'm', '−v/u = h′/h']], 'Table of the quantities in the mirror formula and what they mean'),
      m: [r`\dfrac{1}{v} + \dfrac{1}{u} = \dfrac{1}{f}`, r`m = \dfrac{h'}{h} = -\dfrac{v}{u}`],
      n: 'The reciprocal of the image distance plus the reciprocal of the object distance equals the reciprocal of the focal length. The magnification is minus the image distance divided by the object distance.',
    }),
    sl('example', 'Worked example 1: a concave mirror', {
      b: r`**Problem.** A concave mirror has $f = ${D2_EX1.f}$ cm. An object ${Math.abs(D2_EX1.h)} cm tall is placed ${Math.abs(D2_EX1.u)} cm in front of it. Find $v$, $m$ and the height of the image.

**Step 1.** $\dfrac{1}{v} = \dfrac{1}{f} - \dfrac{1}{u} = \dfrac{1}{-15} - \dfrac{1}{-25}$, so $v = ${D2_EX1.v}$ cm: a real image in front of the mirror.

**Step 2.** $m = -\dfrac{v}{u} = -\dfrac{${D2_EX1.v}}{${D2_EX1.u}} = ${D2_EX1.m}$, so $h' = m h = ${D2_EX1.m} \times ${D2_EX1.h} = ${D2_EX1.h2}$ cm: **inverted**, ${Math.abs(D2_EX1.h2)} cm tall.`,
      v: table(['Quantity', 'Value'], [['Image distance v', `${D2_EX1.v} cm`], ['Magnification m', `${D2_EX1.m}`], ['Height of the image', `${D2_EX1.h2} cm (inverted)`]], 'Table of the image distance, the magnification and the height of the image for the concave mirror'),
      n: 'Use the formula with the signs. The image distance comes out negative, so the image is real and in front of the mirror. The magnification is negative, so the image is inverted, and one and a half times as large.',
    }),
    sl('check', 'Quick check: the sign of u', {
      b: 'Remember where the object is placed.',
      v: table(['Quantity', 'Sign for a real object'], [['Object distance u', '?']], 'Table asking for the sign of the object distance for a real object'),
      chk: 'chk-sign',
      n: 'In the Cartesian sign convention, what is the sign of the object distance for a real object in front of a mirror?',
    }),
    sl('example', 'Worked example 2: a convex mirror', {
      b: r`**Problem.** A convex mirror has $f = +${D2_EX2.f}$ cm. An object ${D2_EX2.h} cm tall is ${Math.abs(D2_EX2.u)} cm in front of it. Find $v$, $m$ and the height of the image.

**Step 1.** $\dfrac{1}{v} = \dfrac{1}{${D2_EX2.f}} - \dfrac{1}{-60} = \dfrac{1}{20} + \dfrac{1}{60}$, so $v = +${D2_EX2.v}$ cm: virtual, behind the mirror.

**Step 2.** $m = -\dfrac{v}{u} = -\dfrac{${D2_EX2.v}}{-60} = +${D2_EX2.m}$, so $h' = ${D2_EX2.m} \times ${D2_EX2.h} = ${D2_EX2.h2}$ cm: erect and diminished.`,
      v: table(['Quantity', 'Value'], [['Image distance v', `+${D2_EX2.v} cm`], ['Magnification m', `+${D2_EX2.m}`], ['Height of the image', `${D2_EX2.h2} cm (erect)`]], 'Table of the image distance, the magnification and the height of the image for the convex mirror'),
      n: 'For the convex mirror the focal length is positive. The image distance comes out positive, so the image is virtual and behind the mirror. The magnification is positive and less than one, so it is upright and smaller.',
    }),
    sl('check', 'Quick check: using the formula', {
      b: 'Use 1/v = 1/f − 1/u with the signs.',
      v: table(['Mirror', 'f', 'u'], [['Concave', '−10 cm', '−40 cm']], 'Table of the focal length and object distance of a concave mirror'),
      chk: 'chk-formula',
      n: 'A concave mirror has a focal length of ten centimetres, and an object is forty centimetres in front of it. What is the image distance, with its sign?',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'A convex mirror always forms a virtual, erect, diminished image between P and F; it is used as a rear-view mirror and for security.',
        'Concave mirrors: shaving mirrors, torches and headlights, solar cookers.',
        'Cartesian convention: distances from the pole, against the light negative; f and R negative for concave, positive for convex; u negative.',
        '1/v + 1/u = 1/f; m = h′/h = −v/u; negative m means inverted (real), positive m erect (virtual).',
      ],
      v: table(['Formula', 'Use'], [['1/v + 1/u = 1/f', 'Find v, u or f'], ['m = −v/u', 'Size and orientation of the image']], 'Summary table of the mirror formula and the magnification'),
      n: 'To sum up Part two. A convex mirror gives a small, upright, virtual image and a wide view. For any mirror, use the formula with the correct signs and read the answer: a negative magnification means an inverted image.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'Write the signs before substituting: u negative, f negative for concave, positive for convex.',
        'Substitute in 1/v = 1/f − 1/u with the units, then give v with its sign.',
        'Say whether the image is real or virtual from the sign of v, and erect or inverted from m.',
        'Give uses with a reason: shaving mirror (inside F), rear-view mirror (wide field).',
      ],
      v: table(['Slip', 'Fix'], [['Using u as a positive number', 'u is negative for a real object'], ['Positive f for a concave mirror', 'f is negative for a concave mirror'], ['Quoting v without a sign', 'The sign tells real or virtual']], 'Table of three common slips and their fixes'),
      n: 'Exam tips. Write down the signs first. Put them into the formula and keep the sign of the answer. Use the sign of the image distance to say real or virtual, and the magnification to say upright or inverted.',
    }),
  ],
});
