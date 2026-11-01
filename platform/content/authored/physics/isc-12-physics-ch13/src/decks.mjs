// ISC 12 Physics ch13 Reflection at Spherical Mirrors and Refraction at Plane Surfaces — two decks: Part 1 (t01)
// spherical mirrors, R = 2f, the sign convention, the mirror formula and magnification; Part 2 (t02–t04) Snell's law,
// relative refractive index across several media, slabs, real and apparent depth, total internal reflection, total
// reflecting prisms and optical fibres. Numbers computed here.
import { sl, deck, table, svgV, plot, r, dec } from '../../isc-12-physics-ch01/src/lib.mjs';
import * as G from './svgs.mjs';

const rad = (d) => (d * Math.PI) / 180;
/** Relative refractive index symbol, e.g. N(1, 2) gives {}_1n_2 (keeps "${" out of the template literals). */
const N = (a, b) => `{}_${a}n_${b}`;
const deg = (x) => (x * 180) / Math.PI;
export const mirror = (u, f) => {
  const v = 1 / (1 / f - 1 / u);
  return { v, m: -v / u };
};

// ---------------------------------------------------------------- worked-example numbers
const ex1 = { f: -12, u: -18, h: 3 };
Object.assign(ex1, mirror(ex1.u, ex1.f));
ex1.hi = ex1.m * ex1.h;
const ex2 = { f: -20, u: -12, h: 1.2 };
Object.assign(ex2, mirror(ex2.u, ex2.f));
ex2.hi = ex2.m * ex2.h;
const ex3 = { f: 40, u: -600, h: 240 };
Object.assign(ex3, mirror(ex3.u, ex3.f));
ex3.hi = ex3.m * ex3.h;
const ex4 = { i: 45, nw: 1.33, ng: 1.5 };
ex4.rw = deg(Math.asin(Math.sin(rad(ex4.i)) / ex4.nw));
ex4.rg = deg(Math.asin(Math.sin(rad(ex4.i)) / ex4.ng));
ex4.wng = ex4.ng / ex4.nw;
const ex5 = { t: 6, n: 1.5, i: 60 };
ex5.r = deg(Math.asin(Math.sin(rad(ex5.i)) / ex5.n));
ex5.d = (ex5.t * Math.sin(rad(ex5.i - ex5.r))) / Math.cos(rad(ex5.r));
const ex6 = { real: 40, nw: 4 / 3, t: 6, ng: 1.5 };
ex6.app = ex6.real / ex6.nw;
ex6.rise = ex6.real - ex6.app;
ex6.shift = ex6.t * (1 - 1 / ex6.ng);
const ex7 = { n: 1.45, nw: 1.33 };
ex7.Cair = deg(Math.asin(1 / ex7.n));
ex7.Cwater = deg(Math.asin(ex7.nw / ex7.n));
const fib = { n1: G.FIBRE_DATA.n1, n2: G.FIBRE_DATA.n2 };
fib.C = deg(Math.asin(fib.n2 / fib.n1));
fib.acc = deg(Math.asin(Math.sqrt(fib.n1 ** 2 - fib.n2 ** 2)));
export const EX = { ex1, ex2, ex3, ex4, ex5, ex6, ex7, fib };

export const V = {
  terms: svgV(G.TERMS, 'Concave mirror with its pole, focus and centre of curvature, R equal to 2f'),
  r2f: svgV(G.R2F, 'Parallel ray reflected at a concave mirror, showing why f is half of R'),
  sign: svgV(G.SIGN, 'New Cartesian sign convention for mirrors'),
  deriv: svgV(G.DERIV, 'Ray diagram for deriving the mirror formula'),
  ex1: svgV(G.EX1, 'Worked example 1: real, inverted image twice the object size'),
  ex2: svgV(G.EX2, 'Worked example 2: virtual, magnified image in a concave make-up mirror'),
  convex: svgV(G.CONVEX, 'Convex mirror forming a virtual, erect, diminished image'),
  snell: svgV(G.SNELL, 'Refraction of a ray from air into glass'),
  layers: svgV(G.LAYERS, 'A ray through parallel layers of water and glass'),
  slab: svgV(G.SLAB, 'Lateral shift of a ray through a parallel-sided glass slab'),
  depth: svgV(G.DEPTH, 'Real and apparent depth under water and under a glass slab'),
  tir: svgV(G.TIR, 'Rays from a point in glass below, at and above the critical angle'),
  prisms: svgV(G.PRISMS, 'Three total reflecting prisms'),
  fibre: svgV(G.FIBRE, 'Light guided along an optical fibre by total internal reflection'),
};
export const uvPlot = plot(
  {
    x: { min: 0, max: 60, label: 'object distance |u| (cm)' },
    y: { min: 0, max: 80, label: 'image distance |v| (cm)' },
    functions: [
      { expr: '12x/(x - 12)', label: 'concave mirror, f = 12 cm (real images)', domain: [14.4, 60] },
      { expr: 'x', label: '|v| = |u|', domain: [0, 60] },
    ],
    vlines: [{ x: 12, label: '|u| = f', dashed: true }],
    points: [
      { at: [18, 36], label: 'worked example 1: 36 cm' },
      { at: [24, 24], label: 'object at C: image at C' },
      { at: [36, 18], label: 'object and image swapped' },
    ],
  },
  'Graph of image distance against object distance for a concave mirror of focal length 12 centimetres: as the object moves in from far away towards the focus, the real image moves out from the focus towards infinity; the curve meets the line v equals u at 24 centimetres, the centre of curvature',
  'Object and image positions can be swapped: 18 cm and 36 cm are a conjugate pair.',
);
const nGlass = 1.5;
const Cg = deg(Math.asin(1 / nGlass));
const at30 = deg(Math.asin(nGlass * Math.sin(rad(30))));
export const tirPlot = plot(
  {
    x: { min: 0, max: 90, label: 'angle of incidence in the glass (degrees)' },
    y: { min: 0, max: 90, label: 'angle of refraction in air (degrees)' },
    functions: [{ expr: 'asin(1.5sin(x*pi/180))*180/pi', label: 'glass (n = 1.5) to air', domain: [0, 41.8] }],
    vlines: [{ x: Number(Cg.toFixed(1)), label: `critical angle ${Cg.toFixed(1)}°`, dashed: true }],
    points: [{ at: [30, at30], label: `30° in glass: ${at30.toFixed(1)}° in air` }],
  },
  'Graph of the angle of refraction in air against the angle of incidence inside glass of refractive index 1.5: the refracted angle grows faster than the incident angle and reaches 90 degrees at the critical angle of about 41.8 degrees; beyond it there is no refracted ray',
  'Beyond the critical angle the light is totally reflected.',
);
const lat60 = (6 * Math.sin(rad(60) - Math.asin(Math.sin(rad(60)) / 1.5))) / Math.cos(Math.asin(Math.sin(rad(60)) / 1.5));
export const latPlot = plot(
  {
    x: { min: 0, max: 90, label: 'angle of incidence i (degrees)' },
    y: { min: 0, max: 6, label: 'lateral shift d (cm)' },
    functions: [{ expr: '6sin(x*pi/180 - asin(sin(x*pi/180)/1.5))/cos(asin(sin(x*pi/180)/1.5))', label: 'slab 6.0 cm thick, n = 1.5', domain: [0, 89] }],
    points: [{ at: [60, lat60], label: `worked example 5: ${lat60.toFixed(2)} cm` }],
  },
  'Graph of the lateral shift of a ray through a 6 centimetre glass slab of refractive index 1.5 against the angle of incidence: zero at normal incidence, rising slowly at first and then steeply, approaching the slab thickness for grazing incidence',
  'd = t sin(i − r)/cos r grows with i and is zero for normal incidence.',
);
const rayTable = table(
  ['Incident ray from the top of the object', 'Reflected ray'],
  [
    ['Parallel to the principal axis', 'Passes through F (concave) or appears to come from F (convex)'],
    ['Through F (or heading towards F of a convex mirror)', 'Parallel to the principal axis'],
    ['Through C (or heading towards C of a convex mirror)', 'Returns along itself (it meets the mirror normally)'],
    ['To the pole P', 'Reflected at an equal angle on the other side of the axis'],
  ],
  'Table of the four standard rays for locating the image in a spherical mirror: parallel to the axis, through the focus, through the centre of curvature, and to the pole',
);
const imageTable = table(
  ['Object (concave mirror)', 'Image', 'Nature'],
  [
    ['At infinity', 'At F', 'Real, inverted, point-sized'],
    ['Beyond C', 'Between F and C', 'Real, inverted, smaller'],
    ['At C', 'At C', 'Real, inverted, same size'],
    ['Between C and F', 'Beyond C', 'Real, inverted, larger'],
    ['At F', 'At infinity', 'Real, inverted, very large'],
    ['Between F and P', 'Behind the mirror', 'Virtual, erect, larger'],
  ],
  'Table of the image formed by a concave mirror for six object positions, from infinity to inside the focus',
);
const magTable = table(
  ['Sign or size of m', 'Meaning'],
  [
    ['m negative', 'Image real and inverted (in front of the mirror)'],
    ['m positive', 'Image virtual and erect (behind the mirror)'],
    ['|m| > 1', 'Image larger than the object'],
    ['|m| < 1', 'Image smaller than the object'],
  ],
  'Table of what the sign and size of the magnification tell you about an image',
);
const usesTable = table(
  ['Mirror', 'Use', 'Why'],
  [
    ['Concave', 'Torch and headlight reflectors', 'Lamp at F gives a parallel beam'],
    ['Concave', 'Shaving and make-up mirrors', 'Face inside F: erect, magnified image'],
    ['Concave', 'Solar cookers and furnaces', 'Sunlight brought to a focus'],
    ['Convex', 'Rear-view mirrors of vehicles', 'Erect image, wide field of view'],
    ['Convex', 'Shop security and road-bend mirrors', 'Large area seen in a small mirror'],
  ],
  'Table of uses of concave and convex mirrors with the reason for each',
);
const indexTable = table(
  ['Medium', 'Refractive index n', 'Speed of light (× 10⁸ m s⁻¹)'],
  [
    ['Air', '1.0003 (taken as 1)', '3.00'],
    ['Water', '1.33', '2.26'],
    ['Crown glass', '1.52', '1.97'],
    ['Diamond', '2.42', '1.24'],
  ],
  'Table of refractive indices of air, water, crown glass and diamond with the speed of light in each, equal to c divided by n',
);
const criticalTable = table(
  ['Boundary', 'Critical angle'],
  [
    ['Water to air (n = 1.33)', '48.8°'],
    ['Crown glass to air (n = 1.52)', '41.1°'],
    ['Diamond to air (n = 2.42)', '24.4°'],
    ['Glass (1.52) to water (1.33)', '61.0°'],
  ],
  'Table of critical angles: water to air 48.8 degrees, crown glass to air 41.1 degrees, diamond to air 24.4 degrees, glass to water 61.0 degrees',
);

export const deck1 = deck({
  part: 1,
  title: 'Mirrors and Plane Refraction — Part 1: Reflection at spherical mirrors',
  goals: [
    'Use the terms pole, focus, centre and radius of curvature, and show that R = 2f for paraxial rays',
    'Apply the New Cartesian sign convention and derive the mirror formula for a concave mirror',
    'Find the position, size and nature of images in concave and convex mirrors',
  ],
  slides: [
    sl('title', 'Reflection at Spherical Mirrors', {
      b: 'Part 1 — curved mirrors: how they form images, the sign convention and the mirror formula.',
      v: V.terms,
      n: 'A torch reflector, a make-up mirror and the wide mirror on a bus all use curved mirrors. In this part we name the important points of a spherical mirror, prove that its focal length is half its radius of curvature, fix a sign convention, derive the mirror formula, and use it to predict where an image forms, how large it is, and whether it can be caught on a screen.',
    }),
    sl('concept', 'The parts of a spherical mirror', {
      b: 'A **spherical mirror** is part of a hollow sphere: **concave** if the inside is silvered, **convex** if the outside is.',
      ul: [
        '**Pole P:** centre of the mirror’s surface. **Centre of curvature C:** centre of the sphere. **Radius of curvature R:** PC.',
        '**Principal axis:** the line through P and C. **Aperture:** the width of the mirror.',
        '**Principal focus F:** where rays parallel to the axis meet after reflection (concave), or seem to come from (convex). **Focal length f:** PF.',
        '**Paraxial rays:** rays close and nearly parallel to the axis; all the results here assume them.',
      ],
      v: V.terms,
      n: 'The pole is the middle of the mirror, the centre of curvature is the centre of the sphere it was cut from, and the distance between them is the radius of curvature. The principal axis joins them. Rays parallel to the axis meet at the principal focus of a concave mirror, or seem to spread out from it for a convex one. We always assume paraxial rays, close to the axis.',
    }),
    sl('diagram', 'Why the focal length is half the radius', {
      b: r`A ray parallel to the axis strikes the mirror at M; CM is the normal. Angle of incidence $\theta$ = angle of reflection $\theta$, and $\angle MCF = \theta$ (alternate angles). So triangle FCM is **isosceles**: $FC = FM$.
For a paraxial ray M is very close to P, so $FM \approx FP$. Then $FC = FP$: F is the **midpoint** of PC.
$$f = \dfrac{R}{2}$$`,
      ul: ['The same proof works for a convex mirror, with F behind it.', 'For wide rays F moves towards the mirror (spherical aberration), so only paraxial rays meet at one point.'],
      v: V.r2f,
      n: 'Follow one ray parallel to the axis. At the mirror the normal points to the centre of curvature, and the ray reflects at the same angle theta. Because the incident ray is parallel to the axis, the angle at C is also theta, so the triangle formed by F, C and M has two equal angles and two equal sides. For a ray close to the axis, F M is nearly F P, so F sits halfway between P and C.',
    }),
    sl('concept', 'The New Cartesian sign convention', {
      b: 'ISC uses the **New Cartesian** convention, with the light drawn travelling from left to right:',
      ul: [
        'All distances are measured **from the pole**.',
        'Distances in the direction of the incident light are **positive**; against it, **negative**.',
        'Heights above the principal axis are **positive**; below it, **negative**.',
        'So a real object has $u < 0$; a concave mirror has $f < 0$ and a convex mirror $f > 0$; real images (in front) have $v < 0$.',
      ],
      v: V.sign,
      n: 'Signs keep one formula working for every case. Measure every distance from the pole. If it runs the same way as the incoming light, which we draw from left to right, it is positive; if it runs back towards the source, it is negative. Heights above the axis are positive. So a real object always has a negative u, a concave mirror has a negative focal length, and a convex mirror a positive one.',
    }),
    sl('check', 'Quick check: signs', {
      b: 'Choose the correct option.',
      v: V.sign,
      chk: 'signconv-mcq',
      n: 'Which side of the pole is each point on, compared with the incoming light?',
    }),
    sl('diagram', 'Locating an image: four useful rays', {
      b: 'Any two of these rays from the top of the object fix the top of the image:',
      v: rayTable,
      ul: ['Where the reflected rays actually meet, the image is **real** and can be caught on a screen.', 'Where they only **seem** to come from (traced back behind the mirror), the image is **virtual**.'],
      n: 'To find an image, follow two rays from the top of the object. A ray parallel to the axis reflects through the focus. A ray through the focus comes back parallel. A ray through the centre of curvature hits the mirror head on and returns along itself. A ray to the pole reflects symmetrically about the axis. Where the reflected rays cross, there is a real image; if they only seem to cross behind the mirror, the image is virtual.',
    }),
    sl('diagram', 'Deriving the mirror formula', {
      b: r`Object AB beyond C; image A′B′. Triangles A′B′F and MDF are similar, and so are A′B′P and ABP. With $MD = AB$ and $D \approx P$:
$$\dfrac{A'B'}{AB} = \dfrac{B'F}{FP} = \dfrac{B'P}{BP}$$
Signs: $B'P = -v$, $BP = -u$, $FP = -f$, $B'F = f - v$:
$$\dfrac{f - v}{-f} = \dfrac{-v}{-u} \;\Rightarrow\; \dfrac{1}{v} + \dfrac{1}{u} = \dfrac{1}{f}$$`,
      ul: ['The formula holds for concave and convex mirrors and for real and virtual images, once the signs are put in.'],
      v: V.deriv,
      n: 'Here is the derivation for a concave mirror with a real image. The ray through the focus gives one pair of similar triangles, and the ray to the pole gives another. For a small mirror, M D equals the object height and D is at the pole, so both ratios equal the image height over the object height. Writing each length with its sign and rearranging gives one over v plus one over u equals one over f.',
    }),
    sl('concept', 'Magnification', {
      b: r`The **linear magnification** is the ratio of image height to object height:
$$m = \dfrac{h'}{h} = -\dfrac{v}{u}$$
From the similar triangles A′B′P and ABP, with the signs of the convention.`,
      v: magTable,
      ul: ['m has no unit. A real image of a real object always has negative m; a virtual one positive m.'],
      n: 'Magnification is the image height divided by the object height, and from the triangles at the pole it equals minus v over u. Its sign tells you the nature of the image. A negative magnification means a real, inverted image in front of the mirror; a positive one means a virtual, erect image behind it. Its size tells you whether the image is larger or smaller than the object.',
    }),
    sl('example', 'Worked example 1: a real, magnified image', {
      b: 'An object 3.0 cm tall stands 18 cm in front of a concave mirror of focal length 12 cm. Find the position, size and nature of the image.',
      ul: [
        r`Step 1 — signs: $u = -18$ cm, $f = -12$ cm.`,
        r`Step 2 — $\dfrac{1}{v} = \dfrac{1}{f} - \dfrac{1}{u} = -\dfrac{1}{12} + \dfrac{1}{18} = -\dfrac{1}{36}$, so $v = ${dec(ex1.v, 2)}$ cm (36 cm in front: **real**).`,
        r`Step 3 — $m = -\dfrac{v}{u} = -\dfrac{-36}{-18} = ${dec(ex1.m, 1)}$; $h' = mh = ${dec(ex1.hi, 2)}$ cm: **inverted, twice the size**.`,
      ],
      v: V.ex1,
      n: 'Put in the signs first: u is minus eighteen and f is minus twelve. One over v is minus one twelfth plus one eighteenth, which is minus one thirty sixth, so v is minus thirty six centimetres. The minus sign says the image is in front of the mirror and real. The magnification is minus two, so the image is inverted, six centimetres tall, and lies beyond the centre of curvature.',
    }),
    sl('diagram', 'Where the image forms in a concave mirror', {
      b: 'As the object moves from far away towards the mirror:',
      v: imageTable,
      ul: ['Real images move out from F to infinity while the object moves in from infinity to F.', 'Only an object inside F gives a virtual, erect image.'],
      n: 'A distant object gives a tiny real image at the focus. As the object comes closer, the image moves out and grows: between F and C when the object is beyond C, at C when the object is at C, and beyond C when the object is between C and F. With the object at F the image is at infinity. Inside F, the image jumps behind the mirror and becomes virtual, erect and magnified.',
    }),
    sl('check', 'Quick check: reading the graph', {
      b: 'Choose the correct option.',
      v: uvPlot,
      chk: 'uvgraph-mcq',
      n: 'Where does the curve cross the line on which the image and object distances are equal?',
    }),
    sl('example', 'Worked example 2: a make-up mirror', {
      b: 'A concave make-up mirror has a focal length of 20 cm. A woman holds it 12 cm from her face. Where is the image of a freckle 1.2 mm across, and how large does it look?',
      ul: [
        r`Step 1 — $u = -12$ cm, $f = -20$ cm: $\dfrac{1}{v} = -\dfrac{1}{20} + \dfrac{1}{12} = \dfrac{2}{60}$, so $v = +${dec(ex2.v, 2)}$ cm (**behind** the mirror: virtual).`,
        r`Step 2 — $m = -\dfrac{v}{u} = -\dfrac{30}{-12} = +${dec(ex2.m, 2)}$: **erect**, and $h' = 2.5 \times 1.2 = ${dec(ex2.hi, 2)}$ mm.`,
      ],
      v: V.ex2,
      n: 'The face is inside the focus, so we expect a virtual image. One over v is minus one twentieth plus one twelfth, which is two sixtieths, so v is plus thirty centimetres: the image is thirty centimetres behind the mirror. The magnification is plus two and a half, so the image is erect and the freckle looks three millimetres across.',
    }),
    sl('diagram', 'Convex mirrors', {
      b: r`For a convex mirror $f > 0$ and, for a real object, $u < 0$, so $\dfrac{1}{v} = \dfrac{1}{f} - \dfrac{1}{u}$ is the sum of two positive terms:`,
      ul: ['v is positive and **smaller than f**: the image is always **virtual**, behind the mirror, between P and F.', 'm = −v/u is positive and less than 1: always **erect and diminished**.', 'A wide region in front fits into a small image: a large **field of view**.'],
      v: V.convex,
      n: 'A convex mirror always behaves the same way for a real object. With a positive focal length and a negative object distance, one over v is a sum of two positive numbers, so v is positive and smaller than f. The image is virtual, behind the mirror and between the pole and the focus. It is always erect and smaller than the object, and a wide scene squeezes into a small image.',
    }),
    sl('example', 'Worked example 3: a rear-view mirror', {
      b: 'The convex rear-view mirror of a car has a radius of curvature of 80 cm. A truck 2.4 m tall is 6.0 m behind it. Find the position and height of the truck’s image.',
      ul: [
        r`Step 1 — $f = +\dfrac{R}{2} = +40$ cm, $u = -600$ cm: $\dfrac{1}{v} = \dfrac{1}{40} + \dfrac{1}{600} = \dfrac{16}{600}$, so $v = +${dec(ex3.v, 3)}$ cm.`,
        r`Step 2 — $m = -\dfrac{v}{u} = \dfrac{37.5}{600} = ${dec(ex3.m, 3)}$; $h' = ${dec(ex3.m, 3)} \times 240 = ${dec(ex3.hi, 2)}$ cm, erect.`,
      ],
      v: table(['Quantity', 'Value'], [['Focal length', '+40 cm'], ['Image distance', '+37.5 cm (behind the mirror)'], ['Magnification', '+0.0625'], ['Image height', '15 cm, erect']], 'Worked table: focal length plus 40 centimetres, image 37.5 centimetres behind the mirror, magnification 0.0625, image 15 centimetres tall and erect'),
      n: 'Half the radius gives a focal length of plus forty centimetres. With the truck six metres away, one over v is one fortieth plus one six hundredth, giving thirty seven and a half centimetres behind the mirror. The magnification is about six hundredths, so the truck appears only fifteen centimetres tall: smaller, and so seemingly farther away, than it really is.',
    }),
    sl('concept', 'Uses of spherical mirrors', {
      b: 'Each use follows from where the object or source sits:',
      v: usesTable,
      ul: ['Convex mirrors make vehicles look smaller, hence farther away, than they are: drivers are warned that objects are closer than they appear.'],
      n: 'A lamp at the focus of a concave reflector sends out a parallel beam, as in a torch or headlight. Hold your face inside the focus of a concave mirror and you see an enlarged, upright image, which is why shaving and make-up mirrors are concave. Large concave mirrors concentrate sunlight. Convex mirrors give an erect, wide view, so they are used on vehicles, in shops and at sharp bends in hill roads.',
    }),
    sl('check', 'Quick check: a security mirror', {
      b: 'Calculate the magnification.',
      v: V.convex,
      chk: 'security-num',
      n: 'Use the mirror formula with a positive focal length, then m equals minus v over u.',
    }),
    sl('summary', 'Summary — Part 1', {
      b: 'Key results:',
      v: table(
        ['Idea', 'Result'],
        [
          ['Focal length', '$f = R/2$ (paraxial rays)'],
          ['Sign convention', 'From P; along the light +; real object $u < 0$; concave $f < 0$, convex $f > 0$'],
          ['Mirror formula', '$\\dfrac{1}{v} + \\dfrac{1}{u} = \\dfrac{1}{f}$'],
          ['Magnification', '$m = h\'/h = -v/u$; negative: real, inverted'],
          ['Concave', 'Real images unless the object is inside F'],
          ['Convex', 'Always virtual, erect, diminished, between P and F'],
        ],
        'Summary table of the focal length, the sign convention, the mirror formula, magnification, and the images of concave and convex mirrors',
      ),
      n: 'To sum up: for rays near the axis, the focal length is half the radius of curvature. Measure distances from the pole, positive along the light, so real objects have negative u and concave mirrors negative f. The mirror formula is one over v plus one over u equals one over f, and the magnification is minus v over u. Concave mirrors give real images except inside F; convex mirrors always give small, erect, virtual images.',
    }),
    sl('exam-tips', 'Exam tips — Part 1', {
      ul: [
        'Write the signed values of u and f before using the formula; keep the signs in the answer.',
        'State the nature of the image from the signs: v and m negative means real and inverted.',
        'In the derivation, name both pairs of similar triangles and the paraxial approximation.',
        'For R = 2f, explain why triangle FCM is isosceles.',
      ],
      v: table(['Asked', 'Key point'], [['Convex mirror, real object?', 'Image always virtual'], ['Image same size and real?', 'Object at C, |u| = 2|f|'], ['m = +3?', 'Virtual, erect: concave, object inside F']], 'Table of common questions and the key point for each'),
      n: 'Always write u and f with their signs before you substitute, and keep the sign of every answer, because it carries meaning. Say what the image is like from those signs: a negative v and a negative m mean a real, inverted image. In the mirror formula derivation, name both pairs of similar triangles and say where you use rays close to the axis. For the focal length result, explain the isosceles triangle.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Mirrors and Plane Refraction — Part 2: Refraction, apparent depth and total internal reflection',
  goals: [
    'Apply Snell’s law and relative refractive indices to rays crossing several parallel media, and find the lateral shift through a slab',
    'Calculate real and apparent depth and the apparent shift through a slab or liquid',
    'Relate the critical angle to refractive index and explain total reflecting prisms and optical fibres',
  ],
  slides: [
    sl('title', 'Refraction at Plane Surfaces', {
      b: 'Part 2 — light bending at flat boundaries: Snell’s law, slabs, apparent depth and total internal reflection.',
      v: V.snell,
      n: 'A pool looks shallower than it is, a glass slab shifts what you see through it sideways, and a hair-thin glass fibre carries internet data under the ocean. All of these come from refraction at flat surfaces. In this part we state Snell’s law, link refractive indices across several media, measure apparent depth, and see how light can be trapped completely by total internal reflection.',
    }),
    sl('concept', 'Refraction and Snell’s law', {
      b: r`When light crosses from one medium into another it changes speed and, unless it meets the boundary normally, its direction.
**Laws of refraction:** (1) the incident ray, the refracted ray and the normal lie in one plane; (2) **Snell’s law:**
$$n_1\sin i = n_2\sin r \qquad\text{or}\qquad \dfrac{\sin i}{\sin r} = {}_1n_2$$`,
      ul: ['Absolute refractive index $n = c/v$: the speed in vacuum over the speed in the medium.', 'Into a denser medium (larger n) the ray bends **towards** the normal; into a rarer one, **away** from it.', 'Frequency does not change; speed and wavelength fall by the factor n.'],
      v: V.snell,
      n: 'Light slows down in glass, and a ray meeting the glass at an angle bends. Snell’s law says n one times the sine of the angle of incidence equals n two times the sine of the angle of refraction. The absolute refractive index is the speed of light in vacuum divided by its speed in the medium. Entering a denser medium the ray bends towards the normal. The frequency stays fixed, so the wavelength shrinks.',
    }),
    sl('concept', 'Relative refractive index', {
      b: r`The refractive index of medium 2 **relative to** medium 1:
$$${N("1", "2")} = \dfrac{\sin i}{\sin r} = \dfrac{n_2}{n_1} = \dfrac{v_1}{v_2}$$`,
      ul: [r`Reversibility: $${N("2", "1")} = \dfrac{1}{${N("1", "2")}}$ (a ray retraces its path).`, r`Example: $${N("a", "w")} = 1.33$, $${N("a", "g")} = 1.50$, so $${N("w", "g")} = \dfrac{1.50}{1.33} = 1.13$.`],
      v: indexTable,
      n: 'The refractive index of a second medium relative to the first is the sine of the incidence angle over the sine of the refraction angle, and it equals the ratio of their absolute indices, or the inverse ratio of the speeds. Because light retraces its path, the index of medium one relative to medium two is just the reciprocal. Glass relative to water, for example, is one point five over one point three three.',
    }),
    sl('check', 'Quick check: glass relative to water', {
      b: 'Choose the correct option.',
      v: indexTable,
      chk: 'chain-mcq',
      n: 'Divide the absolute index of the second medium by that of the first.',
    }),
    sl('diagram', 'Several parallel media: ₁n₂ × ₂n₃ × ₃n₁ = 1', {
      b: r`A ray passes from medium 1 through parallel layers 2 and 3 and back into medium 1. At each boundary $n\sin\theta$ is unchanged, so it leaves at its original angle. Applying Snell’s law at each face:
$$${N("1", "2")}\;${N("2", "3")}\;${N("3", "1")} = \dfrac{\sin\theta_1}{\sin\theta_2}\cdot\dfrac{\sin\theta_2}{\sin\theta_3}\cdot\dfrac{\sin\theta_3}{\sin\theta_1} = 1$$`,
      ul: [r`Hence $${N("2", "3")} = \dfrac{${N("1", "3")}}{${N("1", "2")}}$: relative indices follow from absolute ones.`, 'The emergent ray is parallel to the incident ray because the first and last media are the same.'],
      v: V.layers,
      n: 'Send a ray from air through a layer of water and a layer of glass with parallel faces, and back into air. At each boundary Snell’s law keeps n sine theta the same, so the ray comes out at exactly the angle it went in. Multiply the three relative indices and every sine cancels: the product is one. This is how the index of glass relative to water follows from their indices relative to air.',
    }),
    sl('example', 'Worked example 4: a ray through water and glass', {
      b: r`A ray in air meets a layer of water ($n = 1.33$) lying on a glass plate ($n = 1.50$) at 45°. Find the angle in the water and in the glass, and the index of glass relative to water.`,
      ul: [
        r`Step 1 — $\sin\theta_w = \dfrac{\sin 45^\circ}{1.33}$, so $\theta_w = ${dec(ex4.rw, 3)}^\circ$.`,
        r`Step 2 — $n\sin\theta$ is constant: $\sin\theta_g = \dfrac{\sin 45^\circ}{1.50}$, so $\theta_g = ${dec(ex4.rg, 3)}^\circ$.`,
        r`Step 3 — $${N("w", "g")} = \dfrac{1.50}{1.33} = ${dec(ex4.wng, 3)}$; check: $\dfrac{\sin ${dec(ex4.rw, 3)}^\circ}{\sin ${dec(ex4.rg, 3)}^\circ} = ${dec(Math.sin(rad(ex4.rw)) / Math.sin(rad(ex4.rg)), 3)}$.`,
      ],
      v: V.layers,
      n: 'In the water, the sine of the angle is the sine of forty five degrees over one point three three, giving about thirty two degrees. We do not need the water angle to find the glass angle: n sine theta is the same in every layer, so the glass angle is about twenty eight degrees. The index of glass relative to water is about one point one three, and the ratio of the two sines agrees.',
    }),
    sl('diagram', 'A parallel-sided slab: lateral shift', {
      b: r`At the first face $\sin i = n\sin r$; at the second, $n\sin r = \sin e$. So $e = i$: the emergent ray is **parallel** to the incident ray but displaced sideways by the **lateral shift**
$$d = \dfrac{t\,\sin(i - r)}{\cos r}$$`,
      ul: ['The path inside the slab has length $t/\\cos r$; d is that length times $\\sin(i - r)$.', 'd = 0 at normal incidence; it grows with t, with i and with n.'],
      v: V.slab,
      n: 'A ray through a glass slab bends towards the normal at the top face and back by exactly the same amount at the bottom face, so it leaves parallel to its original direction. It has, however, been shifted sideways. The path inside the glass is t over cos r long, and the sideways distance is that path times the sine of i minus r. A thicker slab, a larger angle or a denser glass all increase the shift.',
    }),
    sl('example', 'Worked example 5: lateral shift', {
      b: 'A ray meets a glass slab 6.0 cm thick (n = 1.5) at 60°. Find the angle of refraction and the lateral shift.',
      ul: [
        r`Step 1 — $\sin r = \dfrac{\sin 60^\circ}{1.5} = ${dec(Math.sin(rad(ex5.r)), 3)}$, so $r = ${dec(ex5.r, 3)}^\circ$.`,
        r`Step 2 — $d = \dfrac{6.0 \times \sin(60^\circ - ${dec(ex5.r, 3)}^\circ)}{\cos ${dec(ex5.r, 3)}^\circ} = ${dec(ex5.d, 3)}$ cm.`,
      ],
      v: latPlot,
      n: 'The sine of the refraction angle is the sine of sixty degrees over one point five, about point five eight, so r is about thirty five point three degrees. The difference i minus r is about twenty four point seven degrees. Six times its sine, divided by the cosine of r, gives a lateral shift of about three point oh eight centimetres. The graph shows the shift rising steeply towards grazing incidence.',
    }),
    sl('check', 'Quick check: a stack of layers', {
      b: 'Choose the correct option.',
      v: V.layers,
      chk: 'stack-mcq',
      n: 'What stays the same at every boundary between parallel layers?',
    }),
    sl('diagram', 'Real and apparent depth', {
      b: r`Rays from O on the floor of a tank bend **away** from the normal at the surface and seem to come from I, nearer the surface. For rays close to the normal ($\tan \approx \sin$):
$$n = \dfrac{\sin r}{\sin i} \approx \dfrac{\tan r}{\tan i} = \dfrac{\text{real depth}}{\text{apparent depth}}$$`,
      ul: ['Water (n = 4/3): a pool looks three quarters as deep as it is.', 'Viewed obliquely, the bottom looks even shallower.'],
      v: V.depth,
      n: 'Look straight down into a tank. Light from a coin on the floor bends away from the normal as it leaves the water, and your eye traces it back to a point higher up. For rays close to the normal the tangents can be replaced by sines, and the refractive index equals the real depth over the apparent depth. Water makes a pool look about three quarters as deep as it really is.',
    }),
    sl('concept', 'Apparent shift through a slab or liquid', {
      b: r`An object seen through a slab of thickness $t$ appears **raised** by
$$s = t - \dfrac{t}{n} = t\left(1 - \dfrac{1}{n}\right)$$`,
      ul: ['The shift does not depend on how far the object is below the slab.', r`Several layers: apparent depth $= \dfrac{t_1}{n_1} + \dfrac{t_2}{n_2} + \dots$`, 'A travelling microscope uses this to measure n: real thickness over apparent thickness.'],
      v: V.depth,
      n: 'Put a glass slab on a mark and the mark seems lifted towards you. The slab’s thickness t appears as t over n, so the mark rises by t times one minus one over n. The rise does not depend on how far below the slab the mark is. For several layers, add each thickness over its own index. A travelling microscope measures n this way, from the real and apparent thicknesses.',
    }),
    sl('example', 'Worked example 6: a pebble and a stamp', {
      b: '(a) A pebble lies on the bottom of a pond 40 cm deep (n = 4/3). How deep does it appear from directly above? (b) A stamp is viewed through a glass block 6.0 cm thick (n = 1.5) laid on it. By how much does it appear raised?',
      ul: [
        r`(a) Apparent depth $= \dfrac{40}{4/3} = ${dec(ex6.app, 2)}$ cm: the pebble seems ${dec(ex6.rise, 2)} cm higher.`,
        r`(b) $s = t\left(1 - \dfrac{1}{n}\right) = 6.0 \times \left(1 - \dfrac{1}{1.5}\right) = ${dec(ex6.shift, 2)}$ cm.`,
      ],
      v: table(['Case', 'Real', 'Apparent', 'Raised by'], [['Pebble in the pond', '40 cm', '30 cm', '10 cm'], ['Stamp under the block', '6.0 cm', '4.0 cm', '2.0 cm']], 'Worked table: the pebble at 40 centimetres appears at 30 centimetres, raised by 10; the stamp under 6 centimetres of glass appears 4 centimetres below the top, raised by 2'),
      n: 'Dividing forty centimetres by four thirds gives thirty, so the pebble looks ten centimetres higher than it is, a real danger for anyone judging a pond’s depth by eye. Through the glass block the stamp seems only four centimetres below the top, so it is raised by six times one third, two centimetres. Notice that water lifts a quarter of the depth, glass a third.',
    }),
    sl('diagram', 'Total internal reflection', {
      b: 'Light going from a **denser** to a **rarer** medium bends away from the normal. As the angle of incidence grows, the refracted ray approaches the surface.',
      ul: ['At the **critical angle C** the refracted ray grazes the surface (angle of refraction 90°).', 'Beyond C there is no refracted ray: **all** the light is reflected — **total internal reflection** (TIR).', 'Conditions: light travels from denser to rarer, and meets the boundary at more than C.'],
      v: V.tir,
      n: 'Shine light from inside glass towards the air. A ray at a small angle mostly escapes, bending away from the normal. Increase the angle and the escaping ray tilts down towards the surface, until at the critical angle it just skims along it. Beyond that angle nothing escapes, and every bit of the light is reflected back into the glass. This is total internal reflection.',
    }),
    sl('concept', 'Critical angle and refractive index', {
      b: r`At $i = C$ the angle of refraction is 90°. For light from a medium of index $n$ into air, Snell’s law gives $n\sin C = 1 \times \sin 90^\circ$:
$$\sin C = \dfrac{1}{n} \qquad\text{(into a medium } n_2 < n_1\text{: } \sin C = \dfrac{n_2}{n_1}\text{)}$$`,
      v: tirPlot,
      ul: ['The larger n, the smaller C: diamond’s small critical angle traps light inside it.'],
      n: 'At the critical angle the refracted ray is at ninety degrees, so Snell’s law gives n times the sine of C equals one. The sine of the critical angle is one over n. If the second medium is not air, it becomes n two over n one. The graph shows the refracted angle in air racing up to ninety degrees as the incident angle in glass reaches about forty two degrees.',
    }),
    sl('check', 'Quick check: a block of ice', {
      b: 'Decide whether the statement is true or false.',
      v: criticalTable,
      chk: 'ice-tf',
      n: 'Find the critical angle of ice first, then compare it with the given angle.',
    }),
    sl('diagram', 'Total reflecting prisms', {
      b: 'A glass prism with angles of 45°, 90°, 45° (or 30°, 60°, 90°) reflects light totally where the angle of incidence (45° or 60°) exceeds C (about 42° for glass):',
      ul: ['(a) Ray entering one short face normally: TIR at the hypotenuse, turned through **90°** (periscopes).', '(b) Ray entering the hypotenuse normally: two TIRs, turned through **180°** (binoculars, reflectors).', '(c) 30°–60°–90° prism: incidence 60° on the hypotenuse is total when n > 1.155; incidence 30° would need n > 2.', 'Better than silvered mirrors: nearly 100% reflected, no silvering to tarnish, no double images.'],
      v: V.prisms,
      n: 'A glass prism can act as a perfect mirror. In a right-angled isosceles prism, a ray entering a short face normally meets the long face at forty five degrees, more than the critical angle of glass, and turns through ninety degrees. Enter through the long face instead and it is reflected twice and sent back. In a thirty sixty ninety prism, a sixty degree incidence is also total, but a thirty degree one is not.',
    }),
    sl('example', 'Worked example 7: will the prism work under water?', {
      b: 'A right-angled isosceles prism is made of glass with n = 1.45. Does it turn light through 90° by total internal reflection (a) in air, (b) when immersed in water (n = 1.33)?',
      ul: [
        r`(a) $\sin C = \dfrac{1}{1.45}$, so $C = ${dec(ex7.Cair, 3)}^\circ$. Incidence at the hypotenuse is $45^\circ > C$: **total** reflection.`,
        r`(b) $\sin C = \dfrac{1.33}{1.45}$, so $C = ${dec(ex7.Cwater, 3)}^\circ$. Now $45^\circ < C$: light **leaks** out into the water.`,
      ],
      v: table(['Surroundings', 'Critical angle', 'Incidence 45°?'], [['Air', '43.6°', 'Totally reflected'], ['Water', '66.5°', 'Partly refracted out']], 'Worked table: in air the critical angle is 43.6 degrees, less than 45, so the light is totally reflected; in water it is 66.5 degrees, more than 45, so light escapes'),
      n: 'In air the critical angle of this glass is about forty three point six degrees. The light meets the long face at forty five degrees, just more than that, so it is totally reflected. Put the prism in water and the critical angle depends on the ratio of the two indices, which raises it to about sixty six and a half degrees. Forty five degrees is now too small, and light escapes into the water.',
    }),
    sl('diagram', 'Optical fibres', {
      b: r`A thin glass **core** is surrounded by **cladding** of slightly lower index. Light that meets the core–cladding boundary at more than the critical angle ($\sin C = n_2/n_1$) is totally reflected again and again, and travels along the fibre even round gentle bends.`,
      ul: [
        r`Example: core ${fib.n1}, cladding ${fib.n2}: $C = ${dec(fib.C, 3)}^\circ$; rays entering within about ${dec(fib.acc, 3)}° of the axis are guided.`,
        'Uses: telephone and internet cables, endoscopes for seeing inside the body, decorative lamps.',
        'Advantages over copper: huge data capacity, very low loss, no electrical interference.',
      ],
      v: V.fibre,
      n: 'An optical fibre is a glass core, thinner than a hair, wrapped in cladding of slightly lower refractive index. Light entering the end close to the axis meets the core wall at a large angle, more than the critical angle, so it is totally reflected, again and again, and travels kilometres with little loss. Fibres carry telephone and internet signals, and bundles of them let doctors see inside the body.',
    }),
    sl('summary', 'Summary — Part 2', {
      b: 'Key results:',
      v: table(
        ['Idea', 'Result'],
        [
          ['Snell’s law', '$n_1\\sin i = n_2\\sin r$; $n = c/v$'],
          ['Relative index', '${}_1n_2 = n_2/n_1$; ${}_1n_2\\,{}_2n_3\\,{}_3n_1 = 1$'],
          ['Slab', 'Emergent ray parallel; $d = t\\sin(i - r)/\\cos r$'],
          ['Apparent depth', '$n = $ real / apparent; shift $t(1 - 1/n)$'],
          ['Critical angle', '$\\sin C = 1/n$ (or $n_2/n_1$)'],
          ['TIR uses', 'Prisms turning light by 90° or 180°; optical fibres'],
        ],
        'Summary table of Snell’s law, relative refractive index, the slab, apparent depth, the critical angle and the uses of total internal reflection',
      ),
      n: 'To sum up: Snell’s law says n sine theta is the same on both sides of a boundary, and the refractive index is c over v. Relative indices are ratios of absolute ones, and their product round a closed set of media is one. A slab shifts a ray sideways without turning it. Depth looks smaller by the factor n. The critical angle has sine one over n, and total internal reflection powers prisms and optical fibres.',
    }),
    sl('exam-tips', 'Exam tips — Part 2', {
      ul: [
        'Check which way the light travels before using sin C = 1/n: TIR needs denser to rarer.',
        'For layers, use n sin θ = constant; there is no need to work through every boundary.',
        'Apparent depth formulae need near-normal viewing: say so.',
        'For prisms, compare the angle of incidence inside the glass with C.',
      ],
      v: table(['Asked', 'Key point'], [['Ray from air into glass at 89°?', 'Never TIR'], ['Slab shift, mark lower down?', 'Same shift'], ['Prism in water?', 'C rises; check again']], 'Table of common questions and the key point for each'),
      n: 'Before you write sine C equals one over n, check the direction of the light: total internal reflection needs it to go from a denser to a rarer medium. For a stack of layers, use n sine theta is constant and skip the middle steps. Mention near-normal viewing in apparent depth answers. And in prism questions, compare the angle of incidence inside the glass with the critical angle for the surroundings.',
    }),
  ],
});
