// ISC 12 Physics ch15 Refraction at Spherical Surfaces and Thin Lenses — two decks: Part 1 (t01–t02) refraction at a
// single spherical surface, the lens maker's formula, the thin lens formula and a lens in a liquid; Part 2 (t03–t05)
// magnification, power, lenses in contact, separated lenses and a lens with a mirror. New Cartesian sign convention
// throughout. Numbers computed here.
import { sl, deck, table, flow, svgV, plot, r, dec } from '../../isc-12-physics-ch01/src/lib.mjs';
import * as G from './svgs.mjs';

const { surfaceImage, lensImage, lensMaker, systemImage } = G;

// ---------------------------------------------------------------- worked-example numbers
const ex1 = { n1: 1, n2: 1.5, u: -24, R: 6 };
ex1.v = surfaceImage(ex1.n1, ex1.n2, ex1.u, ex1.R);
ex1.m = (ex1.n1 * ex1.v) / (ex1.n2 * ex1.u);
ex1.F2 = (ex1.n2 * ex1.R) / (ex1.n2 - ex1.n1);
ex1.F1 = (-ex1.n1 * ex1.R) / (ex1.n2 - ex1.n1);
const ex2 = { n: 1.6, R1: 18, R2: -36 };
ex2.f = lensMaker(ex2.n, ex2.R1, ex2.R2);
ex2.fRev = lensMaker(ex2.n, -ex2.R2, -ex2.R1);
ex2.fPlano = lensMaker(ex2.n, Infinity, -18);
const ex3 = { nw: 4 / 3, nl: 1.7 };
ex3.fw = lensMaker(ex2.n, ex2.R1, ex2.R2, ex3.nw);
ex3.fl = lensMaker(ex2.n, ex2.R1, ex2.R2, ex3.nl);
const ex4 = { u: -28, f: 21, h: 2 };
Object.assign(ex4, lensImage(ex4.u, ex4.f));
ex4.hi = ex4.m * ex4.h;
const cex = { u: -20, f: -30, h: 3 };
Object.assign(cex, lensImage(cex.u, cex.f));
const ex5 = { P1: 8, P2: -5, u: -50 };
ex5.P = ex5.P1 + ex5.P2;
ex5.F = 100 / ex5.P;
ex5.v = lensImage(ex5.u, ex5.F).v;
const ex6 = { ...G.TWO_DATA };
ex6.a = lensImage(ex6.u, ex6.f1);
ex6.u2 = ex6.a.v - ex6.d;
ex6.b = lensImage(ex6.u2, ex6.f2);
ex6.m = ex6.a.m * ex6.b.m;
const ex7 = { ...G.LM2_DATA };
ex7.a = lensImage(ex7.u, ex7.f);
ex7.behind = ex7.a.v - ex7.mirror;
ex7.I2 = ex7.mirror - ex7.behind;
ex7.c = lensImage(-ex7.I2, ex7.f); // return pass: measured along the returning light, object 18 cm away
ex7.sys = systemImage(ex7.u, 1, [{ x: 0, kind: 'lens', f: ex7.f }, { x: ex7.mirror, kind: 'mirror', f: Infinity }, { x: 0, kind: 'lens', f: ex7.f }]);
export const EX = { ex1, ex2, ex3, ex4, cex, ex5, ex6, ex7 };
for (const [ok, msg] of [
  [Math.abs(ex1.v - 36) < 1e-9 && Math.abs(ex1.m + 1) < 1e-9, 'ex1'],
  [Math.abs(ex2.f - 20) < 1e-9 && Math.abs(ex2.fRev - 20) < 1e-9 && Math.abs(ex2.fPlano - 30) < 1e-9, 'ex2'],
  [Math.abs(ex3.fw - 60) < 1e-9 && ex3.fl < 0, 'ex3'],
  [Math.abs(ex4.v - 84) < 1e-9 && Math.abs(ex4.hi + 6) < 1e-9, 'ex4'],
  [Math.abs(ex5.F - 100 / 3) < 1e-9 && Math.abs(ex5.v - 100) < 1e-9, 'ex5'],
  [Math.abs(ex6.b.v - 60) < 1e-9 && Math.abs(ex6.m - 6) < 1e-9, 'ex6'],
  [Math.abs(ex7.c.v - 36) < 1e-9 && Math.abs(ex7.sys.x + 36) < 1e-9 && Math.abs(ex7.sys.m - 4) < 1e-9, 'ex7'],
])
  if (!ok) throw new Error(`deck number check failed: ${msg}`);

export const V = {
  surf: svgV(G.SURF, 'Refraction at a convex spherical surface, with the angles used in the derivation'),
  sex: svgV(G.SEX, 'Worked example 1: image formed inside a glass rod with a convex end'),
  shapes: svgV(G.SHAPES, 'Lens shapes and the signs of their radii of curvature'),
  lm: svgV(G.LM, 'Derivation of the lens maker’s formula from two surfaces'),
  lex: svgV(G.LEX, 'Worked example: a real, inverted image three times the object size'),
  cex: svgV(G.CEX, 'A concave lens forming a virtual, erect, diminished image'),
  contact: svgV(G.CONTACT, 'Two thin lenses in contact'),
  two: svgV(G.TWO, 'Two separated convex lenses forming a final erect image'),
  auto: svgV(G.AUTO, 'Finding the focal length of a convex lens with a plane mirror'),
  lensmirror: svgV(G.LENSMIRROR, 'A convex lens with a plane mirror behind it'),
};
export const liquidPlot = plot(
  {
    x: { min: 1, max: 1.6, label: 'refractive index of the surrounding liquid' },
    y: { min: 0, max: 200, label: 'focal length of the lens (cm)' },
    functions: [{ expr: '12x/(1.6 - x)', label: 'lens of n = 1.6, f = 20 cm in air', domain: [1, 1.5] }],
    vlines: [{ x: 1.6, label: 'liquid as dense as the glass: no focusing', dashed: true }],
    points: [
      { at: [1, 20], label: 'in air: 20 cm' },
      { at: [4 / 3, 60], label: 'in water: 60 cm' },
    ],
  },
  'Graph of the focal length of a glass lens of refractive index 1.6, 20 centimetres in air, against the refractive index of the liquid it is placed in: 60 centimetres in water, rising steeply as the liquid index approaches that of the glass, where the lens stops focusing',
  'f(liquid) = f(air) × (n − 1)/(n/n_l − 1).',
);
export const recipPlot = plot(
  {
    x: { min: -10, max: 0, label: '1/u (m⁻¹)' },
    y: { min: -4, max: 8, label: '1/v (m⁻¹)' },
    functions: [{ expr: 'x + 6', label: 'convex lens, P = +6.0 D', domain: [-10, 0] }],
    hlines: [{ y: 0, dashed: true }],
    points: [
      { at: [0, 6], label: 'object at infinity: 1/v = P' },
      { at: [-6, 0], label: 'object at F: image at infinity' },
      { at: [-8, -2], label: 'object inside F: v < 0 (virtual)' },
    ],
  },
  'Straight-line graph of one over v against one over u for a convex lens of power plus 6 dioptres: slope one, meeting the one over v axis at plus 6 and the one over u axis at minus 6; below the one over u axis the image is virtual',
  'Thin lens formula as a straight line: 1/v = 1/u + P.',
);
const signTable = table(
  ['Quantity', 'Sign (light from left to right)'],
  [
    ['Distances u, v, f, R', 'Measured from the pole P (or the optical centre O of a lens)'],
    ['Real object', '$u < 0$'],
    ['Real image formed by refraction', '$v > 0$ (on the far side)'],
    ['Radius of curvature R', 'Positive if the centre C lies on the side the light goes to'],
    ['Converging lens / diverging lens', '$f > 0$ / $f < 0$'],
  ],
  'Table of the New Cartesian signs for refracting surfaces and lenses: distances from the pole, real object negative, real image on the far side positive, radius positive if the centre lies on the outgoing side, converging lens positive focal length',
);
const formTable = table(
  ['Lens (light from the left)', 'Radii', 'Lens maker’s formula'],
  [
    ['Biconvex', '$R_1 > 0$, $R_2 < 0$', '$\\dfrac{1}{f} = (n - 1)\\left(\\dfrac{1}{|R_1|} + \\dfrac{1}{|R_2|}\\right)$'],
    ['Equiconvex', '$R_1 = R$, $R_2 = -R$', '$f = \\dfrac{R}{2(n - 1)}$'],
    ['Plano-convex', '$R_1 = \\infty$, $R_2 = -R$', '$f = \\dfrac{R}{n - 1}$'],
    ['Biconcave', '$R_1 < 0$, $R_2 > 0$', '$\\dfrac{1}{f} = -(n - 1)\\left(\\dfrac{1}{|R_1|} + \\dfrac{1}{|R_2|}\\right)$'],
  ],
  'Table of the lens maker’s formula for biconvex, equiconvex, plano-convex and biconcave lenses, with the signs of the radii',
);
const convexTable = table(
  ['Object (convex lens)', 'Image', 'Nature'],
  [
    ['At infinity', 'At F₂', 'Real, inverted, point-sized'],
    ['Beyond 2F₁', 'Between F₂ and 2F₂', 'Real, inverted, smaller'],
    ['At 2F₁', 'At 2F₂', 'Real, inverted, same size'],
    ['Between F₁ and 2F₁', 'Beyond 2F₂', 'Real, inverted, larger'],
    ['Between F₁ and O', 'Same side as the object', 'Virtual, erect, larger'],
  ],
  'Table of images formed by a convex lens for five object positions, from infinity to inside the focus',
);
const magTable = table(
  ['Lens result', 'Meaning'],
  [
    ['$m = v/u$ negative', 'Real, inverted image (opposite side)'],
    ['$m$ positive', 'Virtual, erect image (same side as the object)'],
    ['$|m| > 1$ / $|m| < 1$', 'Enlarged / diminished'],
    ['Single surface', '$m = \\dfrac{n_1 v}{n_2 u}$'],
  ],
  'Table of what the sign and size of the magnification of a lens mean, and the magnification of a single refracting surface',
);
const powerTable = table(
  ['Lens', 'Focal length', 'Power'],
  [
    ['Reading glasses', '+40 cm', '+2.5 D'],
    ['Camera lens', '+50 mm', '+20 D'],
    ['Lens for a short-sighted eye', '−80 cm', '−1.25 D'],
    ['Strong hand lens', '+8.0 cm', '+12.5 D'],
  ],
  'Table of focal lengths and powers: reading glasses plus 2.5 dioptres, a 50 millimetre camera lens plus 20 dioptres, a lens of minus 80 centimetres minus 1.25 dioptres, a hand lens plus 12.5 dioptres',
);

export const deck1 = deck({
  part: 1,
  title: 'Spherical Surfaces and Thin Lenses — Part 1: Refraction at a spherical surface and the lens maker’s formula',
  goals: [
    'Derive n₂/v − n₁/u = (n₂ − n₁)/R for a convex surface facing the rarer medium, and use it with the New Cartesian signs',
    'Derive the lens maker’s formula and the thin lens formula for a biconvex lens, and apply them to other lens shapes',
    'Predict how the focal length of a lens changes when it is placed in a liquid',
  ],
  slides: [
    sl('title', 'Refraction at Spherical Surfaces and Thin Lenses', {
      b: 'Part 1 — one curved surface, then two: from a glass rod with a rounded end to the lens maker’s formula.',
      v: V.sex,
      n: 'Every lens, from a pair of spectacles to a phone camera, is made of curved glass surfaces. In this part we find where a single curved surface forms an image, then put two surfaces together to get the lens maker’s formula, which links the focal length of a lens to its shape and its glass. Finally we see what happens to a lens when it is dipped in water or another liquid.',
    }),
    sl('concept', 'Signs for refracting surfaces', {
      b: 'We keep the **New Cartesian** convention from mirrors, with the light drawn travelling from left to right. A spherical refracting surface has a **pole P**, a **centre of curvature C** and a **radius of curvature R**.',
      v: signTable,
      ul: ['For a surface, **R is positive** when C lies on the side the light is going to (convex towards the incoming light) and negative otherwise.', 'Results hold for **paraxial** rays: close to the axis and making small angles with it.'],
      n: 'The signs are the ones you used for mirrors. Measure every distance from the pole, positive along the light and negative against it. A real object therefore has a negative u, and a real image formed by refraction, on the far side of the surface, has a positive v. The radius is positive when the centre of curvature lies on the side the light is heading to. All our results assume rays close to the axis.',
    }),
    sl('diagram', 'Setting up the derivation', {
      b: r`A convex surface separates a rarer medium ($n_1$) from a denser one ($n_2$). A ray from O meets the surface at A and bends **towards** the normal CA, crossing the axis at the real image I. Let it make angles $\alpha$, $\beta$, $\gamma$ with the axis at O, I and C.`,
      ul: [r`Triangle OAC (exterior angle at A): $i = \alpha + \gamma$.`, r`Triangle AIC (exterior angle at C): $\gamma = r + \beta$, so $r = \gamma - \beta$.`, 'D is the foot of the perpendicular from A; for paraxial rays D is at P.'],
      v: V.surf,
      n: 'Take one ray from the object O. It strikes the surface at A, where the normal is the line to the centre of curvature C, and bends towards that normal before crossing the axis at I. Mark the small angles alpha, beta and gamma that the ray, the refracted ray and the normal make with the axis. Two exterior-angle results then link them: i equals alpha plus gamma, and r equals gamma minus beta.',
    }),
    sl('concept', 'Deriving the refraction formula', {
      b: r`Snell’s law for small angles: $n_1 i = n_2 r$, so $n_1(\alpha + \gamma) = n_2(\gamma - \beta)$. With D at P, $\alpha \approx \dfrac{AD}{OP}$, $\beta \approx \dfrac{AD}{PI}$, $\gamma \approx \dfrac{AD}{PC}$. Signs: $OP = -u$, $PI = v$, $PC = R$:
$$n_1\left(\dfrac{1}{-u} + \dfrac{1}{R}\right) = n_2\left(\dfrac{1}{R} - \dfrac{1}{v}\right) \;\Rightarrow\; \dfrac{n_2}{v} - \dfrac{n_1}{u} = \dfrac{n_2 - n_1}{R}$$`,
      ul: ['Derived here for a convex surface facing the rarer medium with a real image; with signs, the same formula is used for every case.', r`For a flat surface, $R \to \infty$: $\dfrac{n_2}{v} = \dfrac{n_1}{u}$, the real and apparent depth result.`],
      v: V.surf,
      n: 'For small angles Snell’s law becomes n one times i equals n two times r. Substitute the two angle relations, and replace each angle by its tangent: the height of A divided by the distance along the axis. Put in the signs, with u negative, and the height cancels. The result is n two over v minus n one over u equals n two minus n one, all over R. A flat surface gives the apparent depth rule.',
    }),
    sl('check', 'Quick check: signs at a glass rod', {
      b: 'Choose the correct option.',
      v: V.sex,
      chk: 'surfsign-mcq',
      n: 'Where is the object, and on which side is the centre of curvature, compared with the incoming light?',
    }),
    sl('example', 'Worked example 1: an image inside a glass rod', {
      b: 'A long glass rod ($n = 1.5$) has a convex end of radius 6.0 cm. An object stands in air 24 cm from the end. Find the position and magnification of the image.',
      ul: [
        r`Step 1 — signs: $n_1 = 1$, $n_2 = 1.5$, $u = -24$ cm, $R = +6.0$ cm.`,
        r`Step 2 — $\dfrac{1.5}{v} = \dfrac{0.5}{6.0} + \dfrac{1}{-24} = \dfrac{1}{12} - \dfrac{1}{24} = \dfrac{1}{24}$, so $v = +${dec(ex1.v, 2)}$ cm: a **real** image inside the rod.`,
        r`Step 3 — magnification of a surface $m = \dfrac{n_1 v}{n_2 u} = \dfrac{36}{1.5 \times (-24)} = ${dec(ex1.m, 1)}$: inverted, same size.`,
      ],
      v: V.sex,
      n: 'Put in the signs first: u is minus twenty four, R is plus six. Then one point five over v equals half over six, minus one over twenty four, which is one over twenty four, so v is plus thirty six centimetres: a real image inside the rod. For one surface the magnification is n one v over n two u, which here is minus one: the image is inverted and the same size as the object.',
    }),
    sl('concept', 'The two focal points of a surface', {
      b: r`A single surface has **two** focal lengths. Parallel rays from the left meet at $F_2$ ($u \to -\infty$): $f_2 = \dfrac{n_2 R}{n_2 - n_1}$. An object at $F_1$ gives parallel rays inside ($v \to \infty$): $f_1 = -\dfrac{n_1 R}{n_2 - n_1}$.`,
      ul: [r`They are unequal: $\dfrac{f_2}{f_1} = -\dfrac{n_2}{n_1}$.`, r`Worked example 1: $f_2 = \dfrac{1.5 \times 6.0}{0.5} = +${dec(ex1.F2, 2)}$ cm and $f_1 = ${dec(ex1.F1, 2)}$ cm.`],
      v: table(['Focal point', 'Glass rod, R = 6.0 cm, n = 1.5'], [['F₁ (object side)', '12 cm in front of the end'], ['F₂ (inside the glass)', '18 cm inside the rod'], ['Ratio f₂/f₁', '−1.5 = −n₂/n₁']], 'Table of the two focal points of the glass rod: F1 12 centimetres in front of the end, F2 18 centimetres inside, ratio minus 1.5'),
      n: 'A single curved surface has two different focal points. Parallel light coming from the air is brought to a focus inside the glass, at f two, which is n two R over n two minus n one. An object at the first focal point, in front of the surface, sends a parallel beam into the glass. For the glass rod these are eighteen centimetres inside and twelve centimetres in front, in the ratio of the indices.',
    }),
    sl('diagram', 'Thin lenses and the signs of their radii', {
      b: 'A lens has two refracting surfaces. In a **thin** lens the thickness is negligible, so both poles are at the **optical centre O**. With light from the left:',
      ul: ['Biconvex: $R_1 > 0$ (C₁ on the right), $R_2 < 0$ (C₂ on the left).', 'Biconcave: $R_1 < 0$, $R_2 > 0$. A plane face has $R = \\infty$.', 'Lenses thicker at the centre converge light in air; lenses thinner at the centre diverge it.'],
      v: V.shapes,
      n: 'A lens is two curved surfaces close together. If its thickness is small compared with the radii and distances, we call it thin and measure everything from its optical centre. For a biconvex lens with light from the left, the first centre of curvature lies to the right, so R one is positive, and the second lies to the left, so R two is negative. A plane face has an infinite radius.',
    }),
    sl('diagram', 'Deriving the lens maker’s formula', {
      b: r`**Surface 1** (air to glass) alone forms an image $I_1$ at $v_1$: $\dfrac{n}{v_1} - \dfrac{1}{u} = \dfrac{n - 1}{R_1}$.
**Surface 2** (glass to air) treats $I_1$ as its object (thin lens: same distance $v_1$) and forms the final image I: $\dfrac{1}{v} - \dfrac{n}{v_1} = \dfrac{1 - n}{R_2}$.
**Add:** the $n/v_1$ terms cancel:
$$\dfrac{1}{v} - \dfrac{1}{u} = (n - 1)\left(\dfrac{1}{R_1} - \dfrac{1}{R_2}\right)$$`,
      v: V.lm,
      n: 'Apply the surface formula twice. The first surface, going from air into glass, would form an image I one. The rays never reach it, because the second surface bends them again, so I one acts as the object for the second surface, going from glass back into air. Write both equations for a thin lens and add them. The terms in v one cancel, leaving one relation between u, v, the two radii and n.',
    }),
    sl('concept', 'Lens maker’s formula and thin lens formula', {
      b: r`For an object at infinity the image is at the **focus**: $u \to -\infty$, $v = f$. So
$$\dfrac{1}{f} = (n - 1)\left(\dfrac{1}{R_1} - \dfrac{1}{R_2}\right) \qquad \text{(lens maker’s formula)}$$
and therefore
$$\dfrac{1}{v} - \dfrac{1}{u} = \dfrac{1}{f} \qquad \text{(thin lens formula)}$$`,
      ul: ['Turning a thin lens round (R₁ → −R₂, R₂ → −R₁) leaves f unchanged: both foci are the same distance from O.', 'f depends on the glass (n) and the shape (R₁, R₂), and also on the medium around the lens.'],
      v: formTable,
      n: 'If the object is very far away, the rays arrive parallel and meet at the focus, so v becomes f. That gives the lens maker’s formula: one over f equals n minus one, times one over R one minus one over R two. Putting it back, the general equation becomes the thin lens formula, one over v minus one over u equals one over f. Reversing a thin lens does not change its focal length.',
    }),
    sl('check', 'Quick check: a biconcave lens', {
      b: 'Choose the correct option.',
      v: V.shapes,
      chk: 'biconcave-mcq',
      n: 'For light from the left, where is each centre of curvature of a biconcave lens?',
    }),
    sl('example', 'Worked example 2: designing a lens', {
      b: 'A biconvex lens is ground from glass of $n = 1.6$ with radii 18 cm and 36 cm. Find its focal length (a) with the 18 cm face towards the object, (b) turned round. (c) What is the focal length of a plano-convex lens of the same glass with $R = 18$ cm?',
      ul: [
        r`(a) $R_1 = +18$, $R_2 = -36$: $\dfrac{1}{f} = 0.6\left(\dfrac{1}{18} + \dfrac{1}{36}\right) = 0.6 \times \dfrac{3}{36} = 0.05$, so $f = +${dec(ex2.f, 2)}$ cm.`,
        r`(b) $R_1 = +36$, $R_2 = -18$: the same sum, so $f = +${dec(ex2.fRev, 2)}$ cm.`,
        r`(c) $R_1 = \infty$, $R_2 = -18$: $\dfrac{1}{f} = \dfrac{0.6}{18}$, so $f = +${dec(ex2.fPlano, 2)}$ cm.`,
      ],
      v: table(['Lens', 'R₁, R₂ (cm)', 'f (cm)'], [['Biconvex, 18 cm face first', '+18, −36', '+20'], ['Same lens turned round', '+36, −18', '+20'], ['Plano-convex', '∞, −18', '+30']], 'Worked table: the biconvex lens has a focal length of 20 centimetres either way round; the plano-convex lens of the same glass has 30 centimetres'),
      n: 'With the more curved face first, R one is plus eighteen and R two is minus thirty six. The bracket is one eighteenth plus one thirty sixth, which is three thirty sixths, and times nought point six gives one twentieth, so f is twenty centimetres. Turned round, the two terms swap but their sum is the same. Flatten one face and the bracket loses a term, so the focal length grows to thirty centimetres.',
    }),
    sl('concept', 'A lens in a liquid', {
      b: r`The lens maker’s formula really uses the index of the glass **relative to the surroundings**. A lens of index $n$ in a medium of index $n_m$:
$$\dfrac{1}{f} = \left(\dfrac{n}{n_m} - 1\right)\left(\dfrac{1}{R_1} - \dfrac{1}{R_2}\right) \qquad \dfrac{f_{\text{liquid}}}{f_{\text{air}}} = \dfrac{n - 1}{n/n_m - 1}$$`,
      ul: ['$n_m < n$: same kind of lens, but weaker (longer f).', '$n_m = n$: no refraction at all; the lens cannot be seen to focus.', '$n_m > n$: a convex lens **diverges** light, a concave lens converges it.'],
      v: liquidPlot,
      n: 'In the derivation, n was really the index of the glass compared with what surrounds it. In a liquid that ratio is closer to one, so the bending is weaker and the focal length longer. If the liquid has the same index as the glass, the lens does nothing at all. If the liquid is optically denser than the glass, a convex lens becomes a diverging one. The graph shows the focal length shooting up as the liquid index approaches that of the glass.',
    }),
    sl('example', 'Worked example 3: the lens under water and in oil', {
      b: 'The lens of worked example 2 ($n = 1.6$, $f = 20$ cm in air) is placed (a) in water ($n = 4/3$), (b) in a liquid of index 1.70. Find its focal length each time.',
      ul: [
        r`(a) $\dfrac{n}{n_w} - 1 = \dfrac{1.6}{4/3} - 1 = 0.2$, against $0.6$ in air: $f_w = 20 \times \dfrac{0.6}{0.2} = ${dec(ex3.fw, 2)}$ cm (still converging, three times weaker).`,
        r`(b) $\dfrac{1.6}{1.70} - 1 = ${dec(1.6 / 1.7 - 1, 3)}$: $f = 20 \times \dfrac{0.6}{${dec(1.6 / 1.7 - 1, 3)}} = ${dec(ex3.fl, 3)}$ cm: the lens now **diverges** light.`,
      ],
      v: table(['Surroundings', 'n/n_m − 1', 'Focal length'], [['Air', '0.6', '+20 cm'], ['Water', '0.2', '+60 cm'], ['Liquid, n = 1.70', '−0.059', '−204 cm (diverging)']], 'Worked table: the lens has focal length plus 20 centimetres in air, plus 60 in water, and about minus 204 centimetres in a liquid of index 1.70, where it diverges light'),
      n: 'In water the glass is only one point two times denser than its surroundings, so the factor n over n m minus one drops from nought point six to nought point two, and the focal length triples to sixty centimetres. In the liquid of index one point seven the factor turns negative, about minus nought point nought six, and the convex lens behaves as a weak diverging lens of focal length about two hundred centimetres.',
    }),
    sl('check', 'Quick check: a denser liquid', {
      b: 'Choose the correct option.',
      v: liquidPlot,
      chk: 'cs2-mcq',
      n: 'Compare the index of the glass with that of the liquid around it.',
    }),
    sl('summary', 'Summary — Part 1', {
      b: 'Key results:',
      v: table(
        ['Idea', 'Result'],
        [
          ['Single surface', '$\\dfrac{n_2}{v} - \\dfrac{n_1}{u} = \\dfrac{n_2 - n_1}{R}$; $m = \\dfrac{n_1 v}{n_2 u}$'],
          ['Focal lengths of a surface', '$f_2 = \\dfrac{n_2 R}{n_2 - n_1}$, $f_1 = -\\dfrac{n_1 R}{n_2 - n_1}$'],
          ['Lens maker', '$\\dfrac{1}{f} = (n - 1)\\left(\\dfrac{1}{R_1} - \\dfrac{1}{R_2}\\right)$'],
          ['Thin lens', '$\\dfrac{1}{v} - \\dfrac{1}{u} = \\dfrac{1}{f}$'],
          ['In a liquid', 'replace $n$ by $n/n_m$; denser liquid reverses the lens'],
        ],
        'Summary table of the single-surface formula and magnification, the focal lengths of a surface, the lens maker’s formula, the thin lens formula and a lens in a liquid',
      ),
      n: 'To sum up: at one curved surface, n two over v minus n one over u equals n two minus n one over R, derived from two exterior angles and Snell’s law for small angles. Adding the equations for the two faces of a thin lens gives the lens maker’s formula and the thin lens formula. In a liquid, use the index of the glass relative to the liquid.',
    }),
    sl('exam-tips', 'Exam tips — Part 1', {
      ul: [
        'Write n₁, n₂, u, R with signs before substituting; n₁ is always the medium the light comes from.',
        'In the surface derivation, state the exterior-angle steps and the small-angle approximation.',
        'In the lens maker’s derivation, say that I₁ acts as the object for the second surface.',
        'Sign of R: positive if the centre of curvature lies on the outgoing side.',
      ],
      v: table(['Asked', 'Key point'], [['Biconvex R₁, R₂?', 'R₁ > 0, R₂ < 0'], ['Lens in water?', 'f longer, same type'], ['Liquid denser than glass?', 'Lens changes type']], 'Table of common questions and the key point for each'),
      n: 'Write every quantity with its sign before you substitute, and remember that n one belongs to the medium the light is coming from. In the surface derivation, show both exterior-angle steps and say where you use small angles. In the lens maker’s derivation, explain that the first image acts as the object for the second surface. A radius is positive when its centre lies on the outgoing side.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Spherical Surfaces and Thin Lenses — Part 2: Magnification, power and combinations',
  goals: [
    'Use the thin lens formula with m = v/u and P = 1/f, with correct signs',
    'Derive 1/F = 1/f₁ + 1/f₂ and P = P₁ + P₂ for thin lenses in contact',
    'Locate the final image formed by separated lenses and by a lens with a mirror',
  ],
  slides: [
    sl('title', 'Magnification, Power and Lens Combinations', {
      b: 'Part 2 — how large the image is, how strong a lens is, and what happens when lenses and mirrors work together.',
      v: V.two,
      n: 'Cameras, projectors and spectacles rarely use one lens on its own. In this part we measure how strongly a lens bends light, its power in dioptres, and find the size of the images it forms. Then we combine lenses, first touching each other and then separated, and finally send light through a lens to a mirror and back again, following the image step by step.',
    }),
    sl('diagram', 'Images formed by a convex lens', {
      b: r`Use $\dfrac{1}{v} - \dfrac{1}{u} = \dfrac{1}{f}$ with $f > 0$. Three easy rays fix the image: parallel to the axis → through $F_2$; through O → undeviated; through $F_1$ → parallel.`,
      v: convexTable,
      ul: ['Real images form on the far side ($v > 0$) whenever the object is beyond $F_1$.'],
      n: 'For a convex lens use the thin lens formula with a positive focal length, or draw three rays. A ray parallel to the axis passes through the far focus; a ray through the optical centre goes straight on; a ray through the near focus comes out parallel. As the object moves in from far away, the real image moves out from the focus and grows, until inside the focus the image becomes virtual.',
    }),
    sl('concept', 'Magnification of a lens', {
      b: r`The ray through the optical centre is undeviated, so the triangles ABO and A′B′O are similar:
$$m = \dfrac{h'}{h} = \dfrac{v}{u}$$
(For a mirror $m = -v/u$; for a lens the minus sign is absent because the image forms on the far side.)`,
      v: magTable,
      ul: ['m negative: real and inverted; m positive: virtual and erect.'],
      n: 'The ray through the optical centre goes straight through, so the object, its image and the centre form two similar triangles. The ratio of heights is v over u. Unlike a mirror, there is no minus sign. For a real image of a real object, u is negative and v positive, so m is negative and the image is inverted. A virtual image has m positive and is erect.',
    }),
    sl('example', 'Worked example 4: a magnified real image', {
      b: 'An object 2.0 cm tall stands 28 cm in front of a convex lens of focal length 21 cm. Find the position, size and nature of the image.',
      ul: [
        r`Step 1 — $\dfrac{1}{v} = \dfrac{1}{f} + \dfrac{1}{u} = \dfrac{1}{21} - \dfrac{1}{28} = \dfrac{4 - 3}{84}$, so $v = +${dec(ex4.v, 2)}$ cm (real, on the far side).`,
        r`Step 2 — $m = \dfrac{v}{u} = \dfrac{84}{-28} = ${dec(ex4.m, 1)}$; $h' = mh = ${dec(ex4.hi, 1)}$ cm: **inverted, three times the size**.`,
      ],
      v: V.lex,
      n: 'One over v is one over twenty one minus one over twenty eight, which is one over eighty four, so the image forms eighty four centimetres beyond the lens. It is real. The magnification is eighty four over minus twenty eight, minus three, so the image is inverted and six centimetres tall. The diagram shows all three rays meeting there.',
    }),
    sl('diagram', 'Concave lenses', {
      b: r`For a concave lens $f < 0$; with a real object $u < 0$: $\dfrac{1}{v} = \dfrac{1}{f} + \dfrac{1}{u}$ is negative, and $|v| < |f|$, $|v| < |u|$.`,
      ul: ['The image is always **virtual, erect and diminished**, between $F_1$ and O on the object side.', r`Example: $f = -30$ cm, $u = -20$ cm gives $v = ${dec(cex.v, 2)}$ cm and $m = +${dec(cex.m, 1)}$.`],
      v: V.cex,
      n: 'A concave lens has a negative focal length. For a real object both terms on the right of the formula are negative, so v is negative: the image is on the same side as the object, and closer to the lens than both the object and the focus. It is always virtual, erect and smaller. With a thirty centimetre lens and an object at twenty centimetres, the image is twelve centimetres from the lens and six tenths the size.',
    }),
    sl('check', 'Quick check: what lens is it?', {
      b: 'Choose the correct option.',
      v: magTable,
      chk: 'magsign-mcq',
      n: 'What does a positive magnification smaller than one tell you?',
    }),
    sl('concept', 'Power of a lens', {
      b: r`The **power** of a lens measures how strongly it converges or diverges light:
$$P = \dfrac{1}{f\text{ (in metres)}} \qquad \text{unit: dioptre (D)} = \text{m}^{-1}$$`,
      ul: ['Converging lenses have positive power, diverging lenses negative power.', 'A shorter focal length means a larger power: the lens bends rays more.', 'Opticians prescribe lenses by power.'],
      v: powerTable,
      n: 'The power of a lens is one over its focal length in metres, measured in dioptres. A converging lens has a positive power and a diverging lens a negative one. The shorter the focal length, the more sharply the lens bends rays, and the larger its power. A fifty millimetre camera lens has a power of twenty dioptres; reading glasses of forty centimetres have plus two and a half.',
    }),
    sl('diagram', 'The thin lens formula as a straight line', {
      b: r`Rewrite the formula as $\dfrac{1}{v} = \dfrac{1}{u} + P$ (distances in metres). A graph of $1/v$ against $1/u$ is a straight line of **slope 1**, cutting both axes at a distance P from the origin.`,
      ul: ['On the 1/v axis: object at infinity, image at F.', 'On the 1/u axis: object at F, image at infinity.'],
      v: recipPlot,
      n: 'If you plot one over v against one over u, the thin lens formula becomes a straight line of slope one. It meets the one over v axis at the power: there the object is at infinity and the image at the focus. It meets the one over u axis at minus the power, where the object sits at the focus. Below that axis the image is virtual. This is a quick way to find f from experimental data.',
    }),
    sl('check', 'Quick check: a prescription', {
      b: 'Calculate the focal length.',
      v: powerTable,
      chk: 'reading-num',
      n: 'Divide one by the power to get the focal length in metres, then convert.',
    }),
    sl('diagram', 'Thin lenses in contact', {
      b: r`Lens 1 alone forms $I_1$: $\dfrac{1}{v_1} - \dfrac{1}{u} = \dfrac{1}{f_1}$. $I_1$ is the (virtual) object for lens 2, at the same distance since the lenses touch: $\dfrac{1}{v} - \dfrac{1}{v_1} = \dfrac{1}{f_2}$. Adding:
$$\dfrac{1}{v} - \dfrac{1}{u} = \dfrac{1}{f_1} + \dfrac{1}{f_2} = \dfrac{1}{F} \qquad P = P_1 + P_2$$`,
      ul: ['The pair acts as one lens of focal length F; magnification $m = m_1 m_2$.', 'Combinations are used to build lenses of a chosen power and to reduce colour defects.'],
      v: V.contact,
      n: 'Put two thin lenses together. The first lens alone would form an image I one. That image becomes the object for the second lens, and because the lenses touch, its distance is the same v one. Write the two lens equations and add them: v one cancels, and the pair behaves as a single lens whose reciprocal focal length is the sum of the two reciprocals. In other words, powers simply add.',
    }),
    sl('example', 'Worked example 5: combining powers', {
      b: 'A lens of power +8.0 D is placed in contact with a lens of power −5.0 D. Find the power and focal length of the combination, and where it images an object 50 cm away.',
      ul: [
        r`Step 1 — $P = +8.0 - 5.0 = +${dec(ex5.P, 2)}$ D, so $F = \dfrac{1}{3.0}$ m $= +${dec(ex5.F, 3)}$ cm: **converging**.`,
        r`Step 2 — $\dfrac{1}{v} = \dfrac{1}{F} + \dfrac{1}{u} = 3.0 - 2.0 = 1.0$ m⁻¹, so $v = +${dec(ex5.v / 100, 2)}$ m (real image 100 cm beyond the pair).`,
      ],
      v: table(['Lens', 'Power', 'Focal length'], [['Convex', '+8.0 D', '+12.5 cm'], ['Concave', '−5.0 D', '−20 cm'], ['In contact', '+3.0 D', '+33.3 cm']], 'Worked table: plus 8 dioptres and minus 5 dioptres in contact give plus 3 dioptres, a converging combination of focal length 33.3 centimetres'),
      n: 'Powers add, so plus eight and minus five give plus three dioptres. The combination converges, with a focal length of one third of a metre, about thirty three centimetres. Working in metres and dioptres, one over v is three minus two, which is one per metre, so the object at fifty centimetres is imaged one metre beyond the pair.',
    }),
    sl('concept', 'Separated lenses: one image at a time', {
      b: 'When lenses are a distance d apart, find the image step by step:',
      v: flow('LR', [['o', 'Object'], ['l1', 'Lens 1: find v₁'], ['i1', 'I₁ is the object for lens 2'], ['u2', 'u₂ = v₁ − d'], ['l2', 'Lens 2: find v₂'], ['m', 'm = m₁ × m₂']], [['o', 'l1'], ['l1', 'i1'], ['i1', 'u2'], ['u2', 'l2'], ['l2', 'm']], 'Flow of the method: find the image of the first lens, use it as the object for the second lens at distance v1 minus d, find the final image, and multiply the magnifications'),
      ul: ['If $I_1$ lies beyond lens 2, $u_2 > 0$: a **virtual object** (the rays reach lens 2 still converging).', 'Measure each distance from the lens being used.'],
      n: 'For lenses some distance apart, work one lens at a time. Find the image formed by the first lens, then treat that image as the object for the second, measuring its distance from the second lens: u two equals v one minus d. If the first image would lie beyond the second lens, u two is positive and we call it a virtual object. The overall magnification is the product of the two.',
    }),
    sl('example', 'Worked example 6: two convex lenses', {
      b: 'Two convex lenses of focal lengths 10 cm and 15 cm are 50 cm apart. An object is 15 cm in front of the first. Find the final image and the total magnification.',
      ul: [
        r`Lens 1: $\dfrac{1}{v_1} = \dfrac{1}{10} - \dfrac{1}{15} = \dfrac{1}{30}$, $v_1 = +${dec(ex6.a.v, 2)}$ cm, $m_1 = ${dec(ex6.a.m, 1)}$.`,
        r`Lens 2: $u_2 = 30 - 50 = ${dec(ex6.u2, 2)}$ cm; $\dfrac{1}{v_2} = \dfrac{1}{15} - \dfrac{1}{20} = \dfrac{1}{60}$, $v_2 = +${dec(ex6.b.v, 2)}$ cm, $m_2 = ${dec(ex6.b.m, 1)}$.`,
        r`$m = m_1 m_2 = +${dec(ex6.m, 1)}$: a **real, erect** image six times the size, 60 cm beyond the second lens.`,
      ],
      v: V.two,
      n: 'The first lens forms a real, inverted image thirty centimetres away, twice the size. That is twenty centimetres in front of the second lens, so the second lens sees a real object at minus twenty centimetres and forms an image sixty centimetres beyond itself, three times larger and inverted again. Two inversions make the final image erect, and it is six times the size of the object.',
    }),
    sl('check', 'Quick check: a virtual object', {
      b: 'Choose the correct option.',
      v: V.two,
      chk: 'virtualobj-mcq',
      n: 'Where would the convex lens alone bring the beam to a focus, compared with the concave lens?',
    }),
    sl('diagram', 'A lens with a plane mirror: finding f', {
      b: 'Put a plane mirror behind a convex lens and move a pin along the axis in front of it. When the pin is at the **focus**, its rays leave the lens parallel, return parallel after reflection, and are focused back in the plane of the pin: the inverted image sits tip to tip with the pin, with **no parallax**.',
      ul: ['The pin-to-lens distance is then f, whatever the lens–mirror distance.', 'Light passes through the lens twice; treat each pass separately.'],
      v: V.auto,
      n: 'A neat way to find the focal length of a convex lens is to put a plane mirror behind it. Move a pin until its inverted image appears right beside it with no parallax. At that point the pin is at the focus: its light leaves the lens as a parallel beam, the mirror sends the beam straight back, and the lens focuses it again in the same plane. The distance from the pin to the lens is f.',
    }),
    sl('example', 'Worked example 7: a lens and a plane mirror', {
      b: 'An object is 18 cm in front of a convex lens of focal length 12 cm. A plane mirror is 27 cm behind the lens. Find the final image.',
      ul: [
        r`Pass 1 (lens): $\dfrac{1}{v_1} = \dfrac{1}{12} - \dfrac{1}{18}$, $v_1 = +${dec(ex7.a.v, 2)}$ cm, $m_1 = ${dec(ex7.a.m, 1)}$: $I_1$ would be ${dec(ex7.behind, 1)} cm **behind** the mirror.`,
        r`Mirror: the converging rays are turned back to $I_2$, ${dec(ex7.behind, 1)} cm in front of it, i.e. ${dec(ex7.I2, 2)} cm from the lens ($m = +1$).`,
        r`Pass 2 (lens, light now going right to left; measure along it): $u = -18$ cm, $v = +${dec(ex7.c.v, 2)}$ cm, $m_3 = ${dec(ex7.c.m, 1)}$. Final image ${dec(ex7.c.v, 2)} cm in front of the lens, $m = (-2)(+1)(-2) = +${dec(ex7.sys.m, 1)}$: **real and erect**.`,
      ],
      v: V.lensmirror,
      n: 'First pass: the lens would form an image thirty six centimetres away, but that is nine centimetres beyond the mirror. The mirror turns the converging rays round, so they meet nine centimetres in front of it, eighteen centimetres from the lens. On the way back that point is a real object eighteen centimetres from the lens, which images it thirty six centimetres in front of the lens. Two inversions make the image erect, four times the size.',
    }),
    sl('concept', 'A lens with a curved mirror', {
      b: 'The same step-by-step method works with a concave or convex mirror behind the lens. A useful special case:',
      ul: ['If the lens’s image $I_1$ falls at the **centre of curvature** of the mirror, the rays meet the mirror normally and retrace their path: the final image forms **on the object itself**, inverted.', 'Use this to find R of a mirror, or the position of a mirror, from a coincidence of object and image.', 'A silvered lens (a lens with one face silvered) is not part of the ISC syllabus; here the mirror is always separate.'],
      v: table(['Mirror behind the lens', 'Condition for the image to fall back on the object'], [['Plane', 'Object at the focus of the lens'], ['Concave', 'I₁ at the mirror’s centre of curvature (I₁ in front of the mirror)'], ['Convex', 'I₁ at the mirror’s centre of curvature (I₁ behind the mirror)']], 'Table of the conditions for the final image to coincide with the object, for a plane, a concave and a convex mirror behind a lens'),
      n: 'A curved mirror behind the lens is handled in the same way: lens, then mirror, then lens again. One special case is very useful. If the lens forms its image exactly at the centre of curvature of the mirror, every ray strikes the mirror normally and comes straight back along its own path, so the final image lands on the object itself. Note that we keep the mirror separate from the lens.',
    }),
    sl('summary', 'Summary — Part 2', {
      b: 'Key results:',
      v: table(
        ['Idea', 'Result'],
        [
          ['Thin lens', '$\\dfrac{1}{v} - \\dfrac{1}{u} = \\dfrac{1}{f}$; $m = \\dfrac{v}{u}$'],
          ['Power', '$P = 1/f$ (f in m), dioptre; convex +, concave −'],
          ['Lenses in contact', '$\\dfrac{1}{F} = \\dfrac{1}{f_1} + \\dfrac{1}{f_2}$; $P = P_1 + P_2$'],
          ['Separated lenses', '$u_2 = v_1 - d$; $m = m_1 m_2$'],
          ['Lens and mirror', 'Lens, mirror, lens again; image on the object if I₁ is at C'],
        ],
        'Summary table of the thin lens formula and magnification, power, lenses in contact, separated lenses and a lens with a mirror',
      ),
      n: 'To sum up: the thin lens formula and m equals v over u give the position and size of an image, with the signs telling you its nature. Power is one over the focal length in metres. Powers of lenses in contact add. For separated lenses, or a lens with a mirror, find one image at a time, use it as the next object, and multiply the magnifications.',
    }),
    sl('exam-tips', 'Exam tips — Part 2', {
      ul: [
        'Lens: m = v/u (no minus sign); mirror: m = −v/u.',
        'Convert f to metres before finding the power; keep its sign.',
        'In the contact derivation, state that I₁ is the object for the second lens at the same distance.',
        'For separated lenses, re-measure distances from the second lens; a positive u₂ means a virtual object.',
        'On the return pass through a lens, measure distances along the returning light.',
      ],
      v: table(['Asked', 'Key point'], [['m = +0.5 with a lens?', 'Concave lens'], ['+3 D and −1 D in contact?', '+2 D, f = 50 cm'], ['Pin and image coincide?', 'Pin at the focus (plane mirror)']], 'Table of common questions and the key point for each'),
      n: 'Remember that a lens has m equals v over u, with no minus sign. Convert focal lengths to metres before finding power, and keep the sign. In the contact derivation, say that the first image is the object for the second lens. For separated lenses, re-measure every distance from the lens you are using. And on the way back through a lens, measure distances along the returning light.',
    }),
  ],
});
