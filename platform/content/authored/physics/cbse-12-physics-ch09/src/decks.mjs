// ch09 Ray Optics and Optical Instruments — three decks: Part 1 (t01–t02) mirrors, refraction and total internal
// reflection; Part 2 (t03–t04) spherical surfaces, lenses and the prism; Part 3 (t05) microscopes and telescopes.
// Worked-example numbers are computed here (New Cartesian sign convention).
import { sl, deck, table, flow, svgV, plot, r, sci, dec } from '../../cbse-12-physics-ch01/src/lib.mjs';
import * as G from './svgs.mjs';
import { mirrorImage, lensImage } from './optics.mjs';

const todeg = (x) => (x * 180) / Math.PI;
const rad = (d) => (d * Math.PI) / 180;
// ---------------------------------------------------------------- worked-example numbers
const ex1 = mirrorImage(-25, -15);
const ex2 = mirrorImage(-30, 20);
const ex3 = { glass: todeg(Math.asin(1 / 1.5)), water: todeg(Math.asin(1 / 1.33)), diamond: todeg(Math.asin(1 / 2.42)) };
const ex4 = { C: todeg(Math.asin(1.45 / 1.5)) };
const ex5 = G.SPHERE_DATA;
const ex6 = { f: 1 / (0.5 * (1 / 20 + 1 / 20)) };
const ex7 = lensImage(-30, 20);
const ex8 = { P: 5 - 2, f: 100 / 3 };
const ex9 = { n: Math.sin(rad(45)) / Math.sin(rad(30)) };
const ex10 = { mNear: 1 + 25 / 5, mInf: 25 / 5 };
const ex11 = { m: (15 / 1.0) * (25 / 5.0) };
const ex12 = { m: 100 / 5, L: 105 };
export const EX = { ex1, ex2, ex3, ex4, ex5, ex6, ex7, ex8, ex9, ex10, ex11, ex12 };

export const V = {
  mConcave: svgV(G.M_CONCAVE, 'Ray diagram for a concave mirror with the object between C and F'),
  mConvex: svgV(G.M_CONVEX, 'Ray diagram for a convex mirror'),
  lConvex: svgV(G.L_CONVEX, 'Ray diagram for a convex lens with the object between F and 2F'),
  lConcave: svgV(G.L_CONCAVE, 'Ray diagram for a concave lens'),
  tir: svgV(G.TIR, 'Rays from a point under water showing refraction, the critical angle and total internal reflection', 'Angles computed with Snell’s law for n = 1.33.'),
  fibre: svgV(G.FIBRE, 'Light guided along an optical fibre by total internal reflection'),
  prism: svgV(G.PRISM, 'Ray through a prism at minimum deviation, parallel to the base inside', 'Computed with Snell’s law at both faces; deviation checked.'),
  micro: svgV(G.MICRO, 'Compound microscope ray diagram with objective, first image and eyepiece'),
  tele: svgV(G.TELESCOPE, 'Astronomical telescope in normal adjustment'),
  sph: svgV(G.SPHERICAL, 'Refraction at a convex spherical glass surface forming an image inside the glass'),
};
const dpts = [];
for (let i = 28; i <= 90; i += 2) {
  const d = G.deviation(i);
  if (d !== null) dpts.push([i, Number(d.toFixed(2))]);
}
export const devPlot = plot(
  {
    x: { min: 25, max: 90, label: 'angle of incidence i (°)' },
    y: { min: 30, max: 60, label: 'deviation δ (°)' },
    series: [{ label: 'δ for A = 60°, n = 1.5 (computed with Snell’s law)', kind: 'line', points: dpts }],
    hlines: [{ y: Number(G.PRISM_DATA.dmin.toFixed(2)), label: 'δmin ≈ 37.2°', dashed: true }],
  },
  'Graph of deviation against angle of incidence for a 60 degree glass prism: the deviation falls to a minimum of about 37.2 degrees at an incidence of about 48.6 degrees and then rises again',
  'Each angle of deviation (except the minimum) occurs for two angles of incidence.',
);

export const deck1 = deck({
  part: 1,
  title: 'Ray Optics — Part 1: Mirrors, refraction and total internal reflection',
  goals: [
    'Apply the mirror formula and magnification with the New Cartesian sign convention',
    'Use Snell’s law and the refractive index',
    'Explain total internal reflection, the critical angle and optical fibres',
  ],
  slides: [
    sl('title', 'Ray Optics and Optical Instruments', {
      b: 'Part 1 — light as rays: images in curved mirrors, bending at boundaries, and light trapped inside glass by total internal reflection.',
      v: flow('LR', [['m', 'Spherical mirrors'], ['f', 'Mirror formula'], ['s', 'Snell’s law'], ['t', 'Total internal reflection'], ['o', 'Optical fibres']], [['m', 'f'], ['f', 's'], ['s', 't'], ['t', 'o']], 'Flow of the part: spherical mirrors, mirror formula, Snell’s law, total internal reflection, optical fibres'),
      n: 'Ray optics treats light as rays that travel in straight lines and bend at boundaries. It explains a car’s rear-view mirror, the sparkle of a diamond and the internet signals racing through glass fibres under the sea. In this part we revisit curved mirrors with the mirror formula, then study refraction and the special case of total internal reflection.',
    }),
    sl('diagram', 'Mirror formula and magnification', {
      b: r`With the **New Cartesian sign convention** (distances from the pole; along the incident light positive; heights up positive):
$$\dfrac{1}{v} + \dfrac{1}{u} = \dfrac{1}{f},\qquad f = \dfrac{R}{2},\qquad m = \dfrac{h'}{h} = -\dfrac{v}{u}$$
Concave mirror: $f < 0$. Convex mirror: $f > 0$. Real images: $v < 0$ and $m < 0$.`,
      v: V.mConcave,
      n: 'Measure all distances from the pole of the mirror. Distances in the direction of the incident light are positive, and those against it are negative, so for a real object u is negative. The mirror formula links u, v and f, and the focal length is half the radius of curvature. A negative magnification means an inverted image. This ray diagram is computed directly from the formula.',
    }),
    sl('example', 'Worked example 1: a concave mirror', {
      b: r`An object is 25 cm in front of a concave mirror of focal length 15 cm. Find the position, nature and magnification of the image.`,
      ul: [
        r`Step 1 — signs: $u = -25$ cm, $f = -15$ cm.`,
        r`Step 2 — $\dfrac{1}{v} = \dfrac{1}{f} - \dfrac{1}{u} = -\dfrac{1}{15} + \dfrac{1}{25} = -\dfrac{2}{75}$, so $v = ${dec(ex1.v, 3)}$ cm.`,
        r`Step 3 — $m = -\dfrac{v}{u} = -\dfrac{-37.5}{-25} = ${dec(ex1.m, 2)}$: real, inverted, 1.5 times enlarged, 37.5 cm in front of the mirror.`,
      ],
      v: V.mConcave,
      n: 'Put in the signs first: the object and the focus of a concave mirror are both in front, so both are negative. The formula gives v equals minus thirty seven point five centimetres, so the image is in front of the mirror and real. The magnification is minus one point five: inverted and one and a half times larger. The object lies between C and F, as in the diagram.',
    }),
    sl('diagram', 'Convex mirrors', {
      b: r`A convex mirror always forms a **virtual, erect, diminished** image behind it, whatever the object distance; it gives a wide field of view (rear-view mirrors, shop security mirrors).`,
      ul: [r`Worked: $f = +20$ cm, $u = -30$ cm: $\dfrac{1}{v} = \dfrac{1}{20} + \dfrac{1}{30}$, so $v = ${dec(ex2.v, 3)}$ cm and $m = ${dec(ex2.m, 2)}$.`],
      v: V.mConvex,
      n: 'For a convex mirror the focus is behind the mirror, so f is positive. With an object thirty centimetres in front and a focal length of twenty, the image forms twelve centimetres behind the mirror, erect and only zero point four times as tall. That reduced, upright and wide view is exactly what a driver needs in a rear-view mirror.',
    }),
    sl('check', 'Quick check: sign of the focal length', {
      b: 'Choose the correct statement.',
      v: null,
      chk: 'signf-mcq',
      n: 'Recall where the focus of each mirror lies relative to the incident light.',
    }),
    sl('concept', 'Refraction and Snell’s law', {
      b: r`At a boundary, $n_1\sin i = n_2\sin r$. The **refractive index** of a medium is $n = c/v$. Light bends **towards** the normal entering a denser medium and away from it leaving.`,
      ul: ['Relative index $n_{21} = n_2/n_1 = v_1/v_2$.', 'Apparent depth: an object under water looks nearer: apparent depth = real depth / n (for near-normal viewing).', 'Frequency is unchanged; wavelength and speed change.'],
      v: table(['Medium', 'n (approx.)', 'Speed of light'], [['Air', '1.0003', 'c'], ['Water', '1.33', '2.26 × 10⁸ m s⁻¹'], ['Crown glass', '1.52', '1.97 × 10⁸ m s⁻¹'], ['Diamond', '2.42', '1.24 × 10⁸ m s⁻¹']], 'Table of refractive indices and speeds of light in air, water, glass and diamond'),
      n: 'When light crosses into another medium its speed changes, so it bends. Snell’s law says n one sine i equals n two sine r. The refractive index n is the speed of light in vacuum divided by its speed in the medium. Going into a denser medium the ray bends towards the normal. A swimming pool looks shallower than it is because rays from the bottom bend away from the normal as they leave the water.',
    }),
    sl('diagram', 'Total internal reflection', {
      b: r`Going from a denser to a rarer medium, the refracted ray bends away from the normal. At the **critical angle** $C$ it grazes the surface ($r = 90^\circ$):
$$\sin C = \dfrac{n_2}{n_1}\quad(\text{into air: } \sin C = 1/n)$$
For $i > C$ there is no refracted ray: all the light is reflected — **total internal reflection** (TIR).`,
      ul: ['Conditions: light goes from denser to rarer, and i > C.'],
      v: V.tir,
      n: 'Shine light from water up into air at increasing angles. At first it refracts out, bending away from the normal. At one angle, the critical angle, the refracted ray just skims along the surface. Beyond that, no light gets out at all: the surface acts as a perfect mirror. This is total internal reflection. It needs light travelling from the denser medium and an angle of incidence greater than the critical angle.',
    }),
    sl('example', 'Worked example 2: critical angles', {
      b: 'Find the critical angle for light going from (a) glass (n = 1.5), (b) water (n = 1.33), (c) diamond (n = 2.42) into air.',
      ul: [
        r`(a) $\sin C = \dfrac{1}{1.5}$: $C \approx ${dec(ex3.glass, 3)}^\circ$.`,
        r`(b) $\sin C = \dfrac{1}{1.33}$: $C \approx ${dec(ex3.water, 3)}^\circ$.`,
        r`(c) $\sin C = \dfrac{1}{2.42}$: $C \approx ${dec(ex3.diamond, 3)}^\circ$ — very small, so light entering a cut diamond is totally reflected many times and the stone sparkles.`,
      ],
      v: table(['Medium', 'n', 'Critical angle'], [['Glass', '1.5', `${dec(ex3.glass, 3)}°`], ['Water', '1.33', `${dec(ex3.water, 3)}°`], ['Diamond', '2.42', `${dec(ex3.diamond, 3)}°`]], 'Worked table: critical angles of about 41.8 degrees for glass, 48.8 degrees for water and 24.4 degrees for diamond'),
      n: 'Take the inverse sine of one over n in each case. Glass gives about forty two degrees, water about forty nine degrees and diamond only about twenty four degrees. Because a diamond’s critical angle is so small, light that enters a well-cut stone is reflected again and again inside before escaping through the top facets, which is why it sparkles.',
    }),
    sl('diagram', 'Optical fibres', {
      b: 'A thin glass **core** is surrounded by **cladding** of lower refractive index. Light entering the core meets the boundary at more than the critical angle and is totally reflected again and again, travelling far with little loss.',
      ul: ['Uses: internet and telephone links, endoscopes for seeing inside the body, decorative lamps.', 'Other TIR examples: mirages on hot roads, totally reflecting prisms in periscopes and binoculars, the sparkle of diamonds.'],
      v: V.fibre,
      n: 'An optical fibre is a hair-thin strand of very pure glass with a core and a cladding of slightly lower refractive index. Light inside the core strikes the boundary at a large angle, beyond the critical angle, so it is totally reflected each time and zigzags along the fibre for kilometres. Fibres carry internet data under the oceans, and bundles of them let doctors see inside the body.',
    }),
    sl('example', 'Worked example 3: the core–cladding boundary', {
      b: r`An optical fibre has a core of index 1.50 and cladding of index 1.45. Find the critical angle at the core–cladding boundary.`,
      ul: [
        r`Step 1 — $\sin C = \dfrac{n_2}{n_1} = \dfrac{1.45}{1.50} \approx 0.967$.`,
        r`Step 2 — $C \approx ${dec(ex4.C, 3)}^\circ$.`,
        'Meaning — light must strike the wall at more than about 75° to the normal, i.e. travel nearly along the fibre, to be guided.',
      ],
      v: V.fibre,
      n: 'At the core–cladding boundary the light goes from index one point five to index one point four five, so sine C is their ratio, about zero point nine six seven, and C is about seventy five degrees. Only rays travelling nearly parallel to the fibre’s axis meet the wall at more than this angle and are trapped. That is why light must be fed in close to the axis.',
    }),
    sl('check', 'Quick check: conditions for TIR', {
      b: 'Judge the assertion and the reason.',
      v: V.tir,
      chk: 'tirAR',
      n: 'Total internal reflection needs two conditions. Check whether the situation described meets both.',
    }),
    sl('check', 'Quick check: critical angle', {
      b: 'Find the critical angle.',
      v: null,
      chk: 'crit-num',
      n: 'Use sine C equals one over n for light going from the medium into air.',
    }),
    sl('summary', 'Summary — Part 1', {
      b: 'Key results:',
      v: table(
        ['Idea', 'Result'],
        [
          ['Mirror formula', '$1/v + 1/u = 1/f$, $f = R/2$'],
          ['Magnification', '$m = -v/u$'],
          ['Snell’s law', '$n_1\\sin i = n_2\\sin r$, $n = c/v$'],
          ['Critical angle', '$\\sin C = n_2/n_1$'],
          ['TIR conditions', 'Denser → rarer and $i > C$'],
        ],
        'Summary table of the mirror formula, magnification, Snell’s law, the critical angle and conditions for total internal reflection',
      ),
      n: 'To sum up: use the sign convention with the mirror formula, one over v plus one over u equals one over f, and magnification minus v over u. Refraction follows Snell’s law, with the refractive index equal to c over v. Light going from a denser to a rarer medium at more than the critical angle is totally reflected; optical fibres, diamonds and periscope prisms all use this.',
    }),
    sl('exam-tips', 'Exam tips — Part 1', {
      ul: [
        'Write the sign of every quantity before substituting; a sign error flips the answer.',
        'State both conditions for TIR in every answer.',
        'In fibre questions, the critical angle is at the core–cladding boundary: $\\sin C = n_\\text{cladding}/n_\\text{core}$.',
        'Draw ray diagrams with arrows, and dashed lines for virtual rays and images.',
      ],
      v: table(['Mirror', 'Sign of f', 'Image (real object)'], [['Concave', '−', 'Real or virtual'], ['Convex', '+', 'Always virtual, erect, diminished']], 'Table of the sign of f and the kind of image for concave and convex mirrors'),
      n: 'Most marks are lost on signs, so write each quantity with its sign before using a formula. When explaining total internal reflection, always give both conditions. For optical fibres, remember that the relevant boundary is between core and cladding. And in ray diagrams, use arrows on rays and dashed lines for anything virtual.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Ray Optics — Part 2: Spherical surfaces, lenses and the prism',
  goals: [
    'Derive refraction at a spherical surface and the lens maker’s formula',
    'Apply the thin lens formula, magnification and the power of lenses in contact',
    'Derive the relation for the angle of minimum deviation of a prism',
  ],
  slides: [
    sl('title', 'Spherical surfaces, lenses and the prism', {
      b: 'Part 2 — from one curved surface to a thin lens, combinations of lenses, and the prism.',
      v: flow('LR', [['s', 'One spherical surface'], ['l', 'Lens maker’s formula'], ['t', 'Thin lens formula'], ['p', 'Power and combinations'], ['q', 'Prism']], [['s', 'l'], ['l', 't'], ['t', 'p'], ['p', 'q']], 'Flow of the part: refraction at one spherical surface, lens maker’s formula, thin lens formula, power and combinations, prism'),
      n: 'A lens is just two curved refracting surfaces close together. In this part we first find how one curved surface forms an image, then apply it twice to get the lens maker’s formula and the thin lens formula. We define the power of a lens, combine lenses, and finally see how a prism deviates light, with a minimum deviation that lets us measure refractive index.',
    }),
    sl('diagram', 'Refraction at a spherical surface', {
      b: r`For a point object in medium $n_1$ and a spherical surface of radius $R$ bounding medium $n_2$ (paraxial rays, sign convention from the pole):
$$\dfrac{n_2}{v} - \dfrac{n_1}{u} = \dfrac{n_2 - n_1}{R}$$`,
      ul: ['Derivation: apply Snell’s law (small angles) at the point where a ray meets the surface, and relate the angles to u, v and R.'],
      v: V.sph,
      n: 'Consider a ray from a point object hitting a curved surface. At that point, Snell’s law with small angles relates the angles to the normal, which passes through the centre of curvature. Expressing each angle in terms of the height of the point and the distances u, v and R gives n two over v minus n one over u equals n two minus n one over R. The figure is computed from it.',
    }),
    sl('example', 'Worked example 4: an image inside glass', {
      b: r`A point object in air is 30 cm in front of a convex glass surface ($n = 1.5$, $R = +10$ cm). Where is the image?`,
      ul: [
        r`Step 1 — $\dfrac{1.5}{v} - \dfrac{1}{-30} = \dfrac{1.5 - 1}{10} = 0.05$.`,
        r`Step 2 — $\dfrac{1.5}{v} = 0.05 - \dfrac{1}{30} \approx 0.0167$, so $v \approx ${dec(ex5.v, 2)}$ cm.`,
        'Step 3 — positive: a real image 90 cm inside the glass.',
      ],
      v: V.sph,
      n: 'Put n one equals one, n two equals one point five, u equals minus thirty and R equals plus ten, because the centre of curvature is inside the glass. The right-hand side is zero point zero five. Subtracting one thirtieth leaves about zero point zero one six seven for one point five over v, so v is ninety centimetres. The image is real and inside the glass.',
    }),
    sl('concept', 'The lens maker’s formula', {
      b: r`Apply the spherical-surface result to the first surface (image $I_1$), then use $I_1$ as the object for the second surface. For a thin lens of index $n$ in air:
$$\dfrac{1}{f} = (n - 1)\left(\dfrac{1}{R_1} - \dfrac{1}{R_2}\right)$$`,
      ul: ['Biconvex: $R_1 > 0$, $R_2 < 0$, so $f > 0$ (converging).', 'In a medium of index $n_m$, replace $n$ by $n/n_m$: a lens can even become diverging in a denser liquid.'],
      v: V.lConvex,
      n: 'A thin lens has two surfaces. The first surface forms an image inside the glass; that image is the object for the second surface. Adding the two equations, the glass terms cancel and we get one over f equals n minus one, times one over R one minus one over R two. For a biconvex lens, R one is positive and R two negative, so the focal length is positive.',
    }),
    sl('example', 'Worked example 5: a symmetric biconvex lens', {
      b: r`A biconvex lens of glass ($n = 1.5$) has both radii 20 cm. Find its focal length.`,
      ul: [
        r`Step 1 — signs: $R_1 = +20$ cm, $R_2 = -20$ cm.`,
        r`Step 2 — $\dfrac{1}{f} = (1.5 - 1)\left(\dfrac{1}{20} + \dfrac{1}{20}\right) = 0.5 \times 0.1 = 0.05$, so $f = ${dec(ex6.f, 2)}$ cm.`,
        'Note — for a symmetric biconvex lens of n = 1.5, f equals the radius of curvature.',
      ],
      v: V.lConvex,
      n: 'The first surface bulges towards the incoming light, so its centre is on the far side and R one is plus twenty. The second surface’s centre is on the near side, so R two is minus twenty. The bracket becomes one tenth, times zero point five, giving one over f equals zero point zero five: f is twenty centimetres, equal to the radius in this special case.',
    }),
    sl('concept', 'Thin lens formula and magnification', {
      b: r`$$\dfrac{1}{v} - \dfrac{1}{u} = \dfrac{1}{f},\qquad m = \dfrac{h'}{h} = \dfrac{v}{u}$$
Convex lens: $f > 0$; concave lens: $f < 0$. A real image has $v > 0$ and $m < 0$.`,
      v: V.lConcave,
      n: 'The thin lens formula is one over v minus one over u equals one over f, with the same sign convention measured from the optical centre. Note the minus sign, different from the mirror formula, and that the magnification is v over u, without a minus. A concave lens always gives a virtual, erect, diminished image on the same side as the object, like this ray diagram shows.',
    }),
    sl('example', 'Worked example 6: a convex lens', {
      b: r`An object is 30 cm from a convex lens of focal length 20 cm. Find the image position and magnification.`,
      ul: [
        r`Step 1 — $u = -30$ cm, $f = +20$ cm.`,
        r`Step 2 — $\dfrac{1}{v} = \dfrac{1}{f} + \dfrac{1}{u} = \dfrac{1}{20} - \dfrac{1}{30} = \dfrac{1}{60}$, so $v = ${dec(ex7.v, 2)}$ cm.`,
        r`Step 3 — $m = \dfrac{v}{u} = \dfrac{60}{-30} = ${dec(ex7.m, 2)}$: real, inverted, twice the size.`,
      ],
      v: V.lConvex,
      n: 'With the object thirty centimetres in front of a twenty centimetre convex lens, one over v is one twentieth minus one thirtieth, one sixtieth, so the image is sixty centimetres behind the lens. The magnification v over u is minus two: real, inverted and twice as tall. The object is between F and two F, so the image is beyond two F, matching the ray diagram.',
    }),
    sl('concept', 'Power of a lens; lenses in contact', {
      b: r`**Power** $P = \dfrac{1}{f}$ (f in metres); unit **dioptre** (D = m$^{-1}$). Converging: $P > 0$; diverging: $P < 0$.
Thin lenses in contact: $\dfrac{1}{F} = \dfrac{1}{f_1} + \dfrac{1}{f_2}$, i.e. $P = P_1 + P_2$; magnifications multiply: $m = m_1m_2$.`,
      v: table(['Lens', 'f', 'Power'], [['Convex, f = 50 cm', '+0.50 m', '+2.0 D'], ['Concave, f = 25 cm', '−0.25 m', '−4.0 D'], ['Both in contact', '−0.50 m', '−2.0 D']], 'Table of the powers of a 50 centimetre convex lens, a 25 centimetre concave lens and the two in contact'),
      n: 'The power of a lens is one over its focal length in metres, measured in dioptres. A strong lens has a short focal length and a large power. Converging lenses have positive power and diverging lenses negative. For thin lenses in contact, powers simply add, which is how opticians combine lenses. The total magnification is the product of the separate magnifications.',
    }),
    sl('example', 'Worked example 7: combining lenses', {
      b: r`A convex lens of power +5.0 D is placed in contact with a concave lens of power −2.0 D. Find the power and focal length of the combination. Is it converging or diverging?`,
      ul: [
        r`Step 1 — $P = 5.0 + (-2.0) = ${dec(ex8.P, 2)}$ D.`,
        r`Step 2 — $F = \dfrac{1}{P} = \dfrac{1}{3.0} \approx 0.333$ m $= ${dec(ex8.f, 3)}$ cm.`,
        'Step 3 — positive power: the combination is **converging**.',
      ],
      v: table(['Lens', 'Power'], [['Convex', '+5.0 D'], ['Concave', '−2.0 D'], ['Combination', `+${dec(ex8.P, 2)} D (f ≈ 33.3 cm)`]], 'Worked table: plus five dioptres and minus two dioptres combine to plus three dioptres, a focal length of about 33 centimetres'),
      n: 'Add the powers: five minus two gives plus three dioptres. The focal length is one third of a metre, about thirty three centimetres. Because the total power is positive, the pair behaves as a converging lens, weaker than the convex lens alone. Combining lenses this way is used in camera lenses and spectacles.',
    }),
    sl('check', 'Quick check: power of a lens', {
      b: 'Find the power.',
      v: null,
      chk: 'power-num',
      n: 'Convert the focal length to metres and take its reciprocal, with the right sign.',
    }),
    sl('diagram', 'Refraction through a prism', {
      b: r`For a prism of angle A: $r_1 + r_2 = A$ and the deviation is $\delta = i + e - A$. At **minimum deviation** $i = e$ and $r_1 = r_2 = A/2$, so
$$n = \dfrac{\sin\left(\dfrac{A + \delta_m}{2}\right)}{\sin\left(\dfrac{A}{2}\right)}$$`,
      v: V.prism,
      n: 'A ray passing through a prism bends at both faces, always towards the base. Geometry gives r one plus r two equals the prism angle A, and the total deviation is i plus e minus A. As i increases, the deviation first falls and then rises. At the minimum, the ray passes symmetrically, parallel to the base inside, and i equals e. Then the refractive index is the sine of half of A plus delta m over the sine of half A.',
    }),
    sl('diagram', 'Deviation against angle of incidence', {
      b: 'Plotting δ against i gives a U-shaped curve with a single minimum $\\delta_m$; every other deviation occurs for two angles of incidence (i and e interchanged).',
      v: devPlot,
      n: 'This graph is computed with Snell’s law for a sixty degree glass prism. As the angle of incidence rises from about thirty degrees, the deviation falls, reaches its minimum of about thirty seven degrees when the angle of incidence is about forty nine degrees, then rises again. Measuring this minimum in the laboratory gives an accurate value of the refractive index.',
    }),
    sl('example', 'Worked example 8: refractive index from δm', {
      b: r`A prism of angle 60° gives a minimum deviation of 30°. Find the refractive index of its glass.`,
      ul: [
        r`Step 1 — $\dfrac{A + \delta_m}{2} = \dfrac{60 + 30}{2} = 45^\circ$; $\dfrac{A}{2} = 30^\circ$.`,
        r`Step 2 — $n = \dfrac{\sin 45^\circ}{\sin 30^\circ} = \dfrac{0.707}{0.5} \approx ${dec(ex9.n, 3)}$.`,
        'Check — the angle of incidence at minimum deviation is 45°.',
      ],
      v: V.prism,
      n: 'Add the prism angle and the minimum deviation, sixty plus thirty, and halve: forty five degrees. Half the prism angle is thirty degrees. The refractive index is sine forty five over sine thirty, about one point four one. At minimum deviation the ray enters and leaves at forty five degrees, symmetrically.',
    }),
    sl('check', 'Quick check: a lens in water', {
      b: 'Judge the assertion and the reason.',
      v: V.lConvex,
      chk: 'water-ar',
      n: 'Think about the lens maker’s formula with n replaced by the ratio of the indices of glass and water.',
    }),
    sl('check', 'Quick check: minimum deviation', {
      b: 'Choose the correct statement about a prism at minimum deviation.',
      v: devPlot,
      chk: 'mindev-mcq',
      n: 'At minimum deviation the path through the prism is symmetric.',
    }),
    sl('summary', 'Summary — Part 2', {
      b: 'Key results:',
      v: table(
        ['Idea', 'Result'],
        [
          ['Spherical surface', '$n_2/v - n_1/u = (n_2 - n_1)/R$'],
          ['Lens maker’s formula', '$1/f = (n - 1)(1/R_1 - 1/R_2)$'],
          ['Thin lens', '$1/v - 1/u = 1/f$, $m = v/u$'],
          ['Power', '$P = 1/f$ (D); in contact $P = P_1 + P_2$'],
          ['Prism', '$r_1 + r_2 = A$, $\\delta = i + e - A$, $n = \\sin\\frac{A+\\delta_m}{2}/\\sin\\frac{A}{2}$'],
        ],
        'Summary table of refraction at a spherical surface, the lens maker’s formula, the thin lens formula, power and the prism relations',
      ),
      n: 'To sum up: one curved surface obeys n two over v minus n one over u equals n two minus n one over R. Applying it twice gives the lens maker’s formula. The thin lens formula is one over v minus one over u equals one over f, with magnification v over u. Power is one over f in dioptres, and powers of lenses in contact add. A prism has a minimum deviation that gives its refractive index.',
    }),
    sl('exam-tips', 'Exam tips — Part 2', {
      ul: [
        'Lens maker’s formula: get the signs of $R_1$ and $R_2$ from where the centres of curvature lie.',
        'Lens formula has a minus sign: $1/v - 1/u = 1/f$; mirror formula has a plus.',
        'Power needs f in metres.',
        'Prism derivation: show $r_1 + r_2 = A$ and $\\delta = i + e - A$, then put $i = e$, $r_1 = r_2$ at the minimum.',
      ],
      v: table(['Formula', 'Mirror', 'Lens'], [['Image', '1/v + 1/u = 1/f', '1/v − 1/u = 1/f'], ['Magnification', '−v/u', 'v/u']], 'Table comparing the mirror and lens formulas and magnifications'),
      n: 'Keep the mirror and lens formulas apart: plus for mirrors, minus for lenses, and the magnification has a minus sign only for mirrors. In the lens maker’s formula, decide the sign of each radius from where its centre lies. Remember metres for power. For the prism, write the two geometric relations first and then apply the minimum-deviation conditions.',
    }),
  ],
});

export const deck3 = deck({
  part: 3,
  title: 'Ray Optics — Part 3: Microscopes and telescopes',
  goals: [
    'Derive the magnifying power of a simple microscope',
    'Derive the magnifying power of a compound microscope and an astronomical telescope',
    'Describe a reflecting telescope and its advantages',
  ],
  slides: [
    sl('title', 'Optical instruments', {
      b: 'Part 3 — using lenses and mirrors to see the very small and the very far.',
      v: flow('LR', [['s', 'Simple microscope'], ['c', 'Compound microscope'], ['t', 'Refracting telescope'], ['r', 'Reflecting telescope']], [['s', 'c'], ['c', 't'], ['t', 'r']], 'Flow of the part: simple microscope, compound microscope, refracting telescope, reflecting telescope'),
      n: 'Our eyes cannot see bacteria or the moons of Jupiter, because they look too small: they make too small an angle at the eye. Optical instruments increase that angle. In this part we see how a single magnifying glass works, how two lenses make a compound microscope, and how telescopes, both refracting and reflecting, bring distant objects closer.',
    }),
    sl('concept', 'Magnifying power and the simple microscope', {
      b: r`**Magnifying power** $m = \dfrac{\beta}{\alpha}$: angle subtended at the eye by the image ÷ angle subtended by the object at the near point ($D = 25$ cm). For a convex lens of focal length $f$ held close to the eye:
$$m = 1 + \dfrac{D}{f}\ \ (\text{image at } D),\qquad m = \dfrac{D}{f}\ \ (\text{image at infinity, relaxed eye})$$`,
      v: table(['Image position', 'Magnifying power'], [['Near point (25 cm)', '1 + D/f'], ['Infinity (relaxed eye)', 'D/f']], 'Table of the magnifying power of a simple microscope for an image at the near point and at infinity'),
      n: 'What matters is the angle an object makes at the eye. Without help, the largest angle comes from holding the object at the near point, about twenty five centimetres. A convex lens lets you bring the object much closer and still see it clearly. The magnifying power is one plus D over f when the image is at the near point, and D over f when it is at infinity, which is more comfortable.',
    }),
    sl('example', 'Worked example 9: a magnifying glass', {
      b: r`A jeweller uses a convex lens of focal length 5.0 cm as a simple microscope. Find its magnifying power when the image is (a) at the near point, (b) at infinity.`,
      ul: [
        r`(a) $m = 1 + \dfrac{D}{f} = 1 + \dfrac{25}{5.0} = ${dec(ex10.mNear, 2)}$.`,
        r`(b) $m = \dfrac{D}{f} = \dfrac{25}{5.0} = ${dec(ex10.mInf, 2)}$.`,
        'Note — a shorter focal length gives a larger magnification.',
      ],
      v: table(['Image at', 'm'], [['25 cm', String(ex10.mNear)], ['Infinity', String(ex10.mInf)]], 'Worked table: magnifying power 6 with the image at the near point and 5 with the image at infinity'),
      n: 'With a five centimetre lens, D over f is five. If the jeweller places the image at the near point, the magnification is one more, six. With a relaxed eye, viewing the image at infinity, it is five. A stronger lens, with a shorter focal length, would magnify more, but very short focal lengths cause blurred images, which is why compound microscopes are used for higher magnification.',
    }),
    sl('diagram', 'The compound microscope', {
      b: r`The **objective** (short focal length $f_o$) forms a real, inverted, enlarged image of the object; the **eyepiece** (focal length $f_e$) magnifies this image like a simple microscope.
$$m = m_o m_e \approx \dfrac{L}{f_o}\left(1 + \dfrac{D}{f_e}\right)\ \text{(final image at } D),\qquad m \approx \dfrac{L}{f_o}\cdot\dfrac{D}{f_e}\ \text{(at infinity)}$$
$L$ is the tube length (distance between the second focus of the objective and the first focus of the eyepiece).`,
      v: V.micro,
      n: 'A compound microscope uses two converging lenses. The objective, with a very short focal length, forms a real, inverted and enlarged image inside the tube. The eyepiece then acts as a magnifying glass on that image, producing a large virtual final image. The total magnification is the product of the two: roughly L over f o, times D over f e when the final image is at infinity.',
    }),
    sl('example', 'Worked example 10: a school microscope', {
      b: r`A compound microscope has an objective of focal length 1.0 cm, an eyepiece of focal length 5.0 cm and a tube length of 15 cm. Estimate its magnifying power in normal adjustment (final image at infinity).`,
      ul: [
        r`Step 1 — objective: $m_o \approx \dfrac{L}{f_o} = \dfrac{15}{1.0} = 15$.`,
        r`Step 2 — eyepiece: $m_e = \dfrac{D}{f_e} = \dfrac{25}{5.0} = 5$.`,
        r`Step 3 — $m \approx 15 \times 5 = ${dec(ex11.m, 2)}$.`,
      ],
      v: V.micro,
      n: 'The objective magnifies about L over f o, fifteen times. The eyepiece adds a factor of D over f e, five. Multiplying gives about seventy five. To get more magnification, a microscope uses an objective with an even shorter focal length; that is why high-power objectives are tiny lenses held very close to the specimen.',
    }),
    sl('check', 'Quick check: objective of a microscope', {
      b: 'Choose the best statement.',
      v: V.micro,
      chk: 'objective-mcq',
      n: 'Think about what the objective must do to a tiny object placed just outside its focus.',
    }),
    sl('diagram', 'The astronomical (refracting) telescope', {
      b: r`The **objective** (long focal length $f_o$, large aperture) forms an image of a distant object at its focus; the **eyepiece** (short $f_e$) magnifies it. In **normal adjustment** the final image is at infinity:
$$m = \dfrac{\beta}{\alpha} = \dfrac{f_o}{f_e},\qquad \text{tube length } L = f_o + f_e$$
The final image is inverted (no problem for astronomy).`,
      v: V.tele,
      n: 'In a telescope the object is very far away, so rays from it arrive parallel. A long-focus objective brings them to an image at its focal point, and the eyepiece, placed so that this image is also at its own focus, sends the rays out parallel again but at a larger angle. The angular magnification is f o over f e, and the tube is f o plus f e long.',
    }),
    sl('example', 'Worked example 11: a refracting telescope', {
      b: r`A telescope has an objective of focal length 100 cm and an eyepiece of focal length 5.0 cm. Find its magnifying power and tube length in normal adjustment.`,
      ul: [
        r`Step 1 — $m = \dfrac{f_o}{f_e} = \dfrac{100}{5.0} = ${dec(ex12.m, 2)}$.`,
        r`Step 2 — $L = f_o + f_e = 100 + 5 = ${ex12.L}$ cm.`,
        'Note — a large objective aperture also gathers more light, so fainter stars can be seen.',
      ],
      v: V.tele,
      n: 'Divide the focal lengths: one hundred over five gives a magnifying power of twenty. In normal adjustment the lenses are separated by the sum of their focal lengths, one hundred and five centimetres. A long objective focal length gives high magnification, and a wide objective lets in more light, so faint objects become visible.',
    }),
    sl('concept', 'Reflecting telescopes', {
      b: 'Large telescopes use a **concave mirror** as the objective. In the **Cassegrain** design, a small convex secondary mirror reflects the light back through a hole in the primary to the eyepiece or camera.',
      ul: ['No **chromatic aberration** (mirrors reflect all colours alike).', 'A **paraboloidal** mirror removes spherical aberration.', 'A mirror can be supported from behind, so it can be made very large; it is lighter and cheaper than a lens of the same size.'],
      v: flow('LR', [['l', 'Light from a star'], ['p', 'Concave primary mirror'], ['s', 'Convex secondary mirror'], ['h', 'Through a hole in the primary'], ['e', 'Eyepiece or camera']], [['l', 'p'], ['p', 's'], ['s', 'h'], ['h', 'e']], 'Flow of light in a Cassegrain reflecting telescope: from the star to the concave primary, to the convex secondary, back through a hole in the primary to the eyepiece'),
      n: 'Big research telescopes, such as the two metre telescope at Hanle in Ladakh, use mirrors instead of lenses. Light from the sky falls on a large concave primary mirror, reflects to a small convex secondary, and returns through a hole in the primary to the camera. Mirrors have no colour fringes, can be shaped to avoid spherical aberration, and can be supported from behind, so they can be built very large.',
    }),
    sl('check', 'Quick check: telescope magnification', {
      b: 'Find the magnifying power.',
      v: V.tele,
      chk: 'tele-num',
      n: 'In normal adjustment the magnifying power is the focal length of the objective divided by that of the eyepiece.',
    }),
    sl('check', 'Quick check: reflecting telescopes', {
      b: 'Judge the assertion and the reason.',
      v: null,
      chk: 'reflect-ar',
      n: 'Think about whether a mirror splits white light into colours as a lens does.',
    }),
    sl('summary', 'Summary — Part 3', {
      b: 'Key results:',
      v: table(
        ['Instrument', 'Magnifying power'],
        [
          ['Simple microscope', '$1 + D/f$ (near point); $D/f$ (infinity)'],
          ['Compound microscope', '$\\approx (L/f_o)(D/f_e)$ at infinity; $(L/f_o)(1 + D/f_e)$ at D'],
          ['Astronomical telescope', '$f_o/f_e$; tube $f_o + f_e$ (normal adjustment)'],
          ['Reflecting telescope', 'Concave mirror objective; no chromatic aberration'],
        ],
        'Summary table of the magnifying powers of the simple microscope, compound microscope and astronomical telescope, and the reflecting telescope',
      ),
      n: 'To sum up: magnifying power compares the angle at the eye with and without the instrument. A simple microscope gives one plus D over f, or D over f with a relaxed eye. A compound microscope multiplies the objective’s magnification, about L over f o, by the eyepiece’s. A telescope gives f o over f e. Large telescopes use mirrors, which have no chromatic aberration and can be made very big.',
    }),
    sl('exam-tips', 'Exam tips — Part 3', {
      ul: [
        'Draw ray diagrams for the microscope and telescope with labelled focal points and the final image position.',
        'Microscope: short $f_o$ and short $f_e$. Telescope: long $f_o$, short $f_e$.',
        'State whether the final image is at D or at infinity before writing the formula.',
        'Give two advantages of reflecting over refracting telescopes.',
      ],
      v: table(['Instrument', 'Objective', 'Eyepiece'], [['Compound microscope', 'Very short f, small aperture', 'Short f'], ['Astronomical telescope', 'Long f, large aperture', 'Short f']], 'Table comparing the objective and eyepiece of a compound microscope and an astronomical telescope'),
      n: 'Examiners expect neat ray diagrams with the focal points and the final image marked. Remember the design rule: a microscope has short focal lengths for both lenses, while a telescope has a long-focus objective with a large aperture. Always say where the final image is before choosing a formula, and be ready with the advantages of reflecting telescopes.',
    }),
  ],
});
