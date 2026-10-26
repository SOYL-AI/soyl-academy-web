// ch09 Light – Reflection and Refraction — question bank. AR keys planned: a c a d b b d c a.
// Every numerical is re-solved by script from the givens with the New Cartesian sign convention.
import { mk, add, r } from '../../cbse-10-science-ch06/src/lib.mjs';
import { mirrorImage, lensImage } from './optics.mjs';

const { mcq, ar, tf, fill, match, num, short, long, part } = mk;
const near = (a, b, tol = 1e-6) => Math.abs(a - b) <= tol;
const C = 3e8;
const deg = (d) => (d * Math.PI) / 180;

// ---------------------------------------------------------------- t01 spherical mirrors and ray diagrams
add('at-c-mcq', mcq({
  stem: 'An object is placed at the centre of curvature of a concave mirror. Where is the image, and what is it like?',
  right: 'At C; real, inverted and the same size',
  wrong: ['At F; real, inverted and point-sized', 'Behind the mirror; virtual, erect and enlarged', 'Beyond C; real, inverted and enlarged'],
  sol: r`With the object at C ($u = -2f$), the mirror formula gives $v = -2f$: the image is also at C, real, inverted, and $m = -1$ (same size) — option (@K).`,
  d: 2, c: 'understanding', t: [1],
}), () => { const { v, m } = mirrorImage(-40, -20); return (near(v, -40) && near(m, -1)) || 'at C'; });
add('shop-mirror-mcq', mcq({
  stem: 'A convex mirror used for security in a shop has a radius of curvature of 2.4 m. What is its focal length?',
  right: '1.2 m',
  wrong: ['2.4 m', '4.8 m', '0.6 m'],
  sol: r`$f = \dfrac{R}{2} = \dfrac{2.4}{2} = 1.2\ \text{m}$ — option (@K). (For a convex mirror it is taken as +1.2 m in the sign convention.)`,
  d: 1, c: 'application', t: [1],
}), () => near(2.4 / 2, 1.2) || 'R/2');
add('virtual-concave-mcq', mcq({
  stem: 'For which position of the object does a concave mirror form a virtual image?',
  right: 'Between the pole and the principal focus',
  wrong: ['At the centre of curvature', 'Between the focus and the centre of curvature', 'Beyond the centre of curvature'],
  sol: 'Only when the object is closer than F do the reflected rays diverge, so they appear to meet behind the mirror — option (@K). All other positions give real images.',
  d: 2, c: 'understanding', t: [1],
}), () => mirrorImage(-8, -12).v > 0 && mirrorImage(-30, -12).v < 0 || 'virtual');
add('torch-mcq', mcq({
  stem: 'A torch maker wants the light from a small bulb to leave the concave reflector as a strong parallel beam. Where should the bulb be placed?',
  right: 'At the principal focus of the reflector',
  wrong: ['At the centre of curvature of the reflector', 'Between the focus and the pole', 'Beyond the centre of curvature'],
  sol: 'Rays from a source at F reflect parallel to the principal axis (the reverse of parallel rays meeting at F) — option (@K).',
  d: 2, c: 'application', t: [1, 2],
}), () => !Number.isFinite(mirrorImage(-20, -20).v) || 'beam');
add('ladle-mcq', mcq({
  stem: 'Rohit holds a large polished steel ladle at arm’s length and looks into its hollow side. Its focal length is only about 4 cm. What does he see?',
  right: 'A small, upside-down image of his face',
  wrong: ['A large, upright image of his face', 'A small, upright image of his face', 'No image at all'],
  sol: r`Step 1 — The hollow side is a concave mirror with $f \approx 4$ cm, so C is about 8 cm away.

Step 2 — His face, at arm’s length (about 50 cm), is far beyond C, so the image is real, **inverted and diminished** — option (@K).

Step 3 — A small upright image (@2) is what he would see in the back (convex) side.`,
  d: 3, c: 'application', t: [1],
}), () => { const { m } = mirrorImage(-50, -4); return (m < 0 && Math.abs(m) < 1) || 'ladle'; });
add('rearview-mcq', mcq({
  stem: 'Why are convex mirrors used as rear-view mirrors in vehicles?',
  right: 'They always give an erect, diminished image and a wider field of view.',
  wrong: ['They always give an enlarged image of vehicles behind.', 'They form real images that can be seen clearly at night.', 'They make vehicles behind appear closer than they are.'],
  sol: 'A convex mirror always forms a virtual, erect, diminished image, so a wide area behind fits into a small mirror — option (@K). It makes vehicles look smaller and so farther away, not closer (@3).',
  d: 2, c: 'understanding', t: [1, 2],
}));
add('convex-image-mcq', mcq({
  stem: 'The image formed by a convex mirror is always:',
  right: 'virtual, erect and diminished',
  wrong: ['real, inverted and diminished', 'virtual, erect and enlarged', 'real, erect and the same size'],
  sol: 'Reflected rays from a convex mirror always diverge, so the image is virtual, erect and diminished — option (@K).',
  d: 1, c: 'recall', t: [1],
}), () => [-5, -20, -100].every((u) => { const { v, m } = mirrorImage(u, 15); return v > 0 && m > 0 && m < 1; }) || 'convex');
add('enlarged-real-mcq', mcq({
  stem: 'Aditi wants to project an enlarged image of a lit candle onto a wall using a concave mirror. Where should she place the candle?',
  right: 'Between the principal focus and the centre of curvature',
  wrong: ['Beyond the centre of curvature', 'Between the pole and the principal focus', 'Exactly at the centre of curvature'],
  sol: 'An image on a wall must be real; real and enlarged needs the object between F and C — option (@K). Inside F (@2) gives a virtual image that cannot be projected; at C (@3) the image is the same size.',
  d: 3, c: 'application', t: [1],
}), () => { const { v, m } = mirrorImage(-30, -20); return (v < 0 && Math.abs(m) > 1) || 'enlarged real'; });
add('screen-mcq', mcq({
  stem: 'A mirror never forms an image that can be obtained on a screen, and its image is always smaller than the object, wherever the object is placed. The mirror is:',
  right: 'convex',
  wrong: ['concave', 'plane', 'either concave or plane'],
  sol: r`Step 1 — "Never on a screen" means the image is always virtual, which rules out a concave mirror (@1), which forms real images for most positions.

Step 2 — A plane mirror (@2) always gives a same-size image.

Step 3 — Always virtual and always smaller fits a convex mirror — option (@K).`,
  d: 4, c: 'analysis', t: [1],
}));
add('real-inverted-ar', ar({
  a: 'A concave mirror forms an erect image only when the object is placed between its pole and principal focus.',
  r: 'Only for this position do the reflected rays diverge, so that they appear to meet behind the mirror and form a virtual image.',
  key: 'a',
  sol: 'Both are true. For every other position the rays actually meet in front, giving real, inverted images; inside F they diverge and form a virtual, erect image. R explains A — option (a).',
  d: 3, c: 'understanding', t: [1],
}));
add('convex-ar', ar({
  a: 'A convex mirror always forms a diminished image.',
  r: 'The principal focus of a convex mirror lies in front of the mirror.',
  key: 'c',
  sol: 'A is true. R is false: the focus of a convex mirror lies behind it — option (c).',
  d: 2, c: 'understanding', t: [1],
}));
add('plane-tf', tf({
  stem: 'The image formed by a plane mirror is virtual, erect and the same size as the object.',
  key: 't',
  sol: 'True. It is also laterally inverted and as far behind the mirror as the object is in front.',
  d: 1, c: 'recall', t: [1],
}));
add('pole-fill', fill({
  stem: 'The centre of the reflecting surface of a spherical mirror is called its ___.',
  acc: [['pole']],
  sol: 'It is the **pole** (P).',
  d: 1, c: 'recall', t: [1],
}));
add('concave-match', match({
  stem: 'For a concave mirror, match each object position in Column A with the image position in Column B.',
  pairs: [['At infinity', 'At F'], ['Beyond C', 'Between F and C'], ['Between C and F', 'Beyond C'], ['Between F and P', 'Behind the mirror']],
  order: [2, 0, 3, 1],
  sol: 'At infinity → at F (1 → r); beyond C → between F and C (2 → p); between C and F → beyond C (3 → s); between F and P → behind the mirror (4 → q).',
  d: 2, c: 'understanding', t: [1],
}), () => {
  const f = -20;
  const b = mirrorImage(-60, f).v; const c = mirrorImage(-30, f).v; const d = mirrorImage(-10, f).v;
  return (b < -20 && b > -40 && c < -40 && d > 0) || 'table';
});
add('terms-short', short({
  marks: 2,
  stem: '(a) Define the principal focus of a concave mirror.\n\n(b) The radius of curvature of a concave mirror is 24 cm. What is its focal length?',
  model: '(a) The principal focus is the point on the principal axis where rays of light parallel to the axis **meet after reflection** from a concave mirror.\n\n(b) $f = \\dfrac{R}{2} = \\dfrac{24}{2} = 12$ cm.',
  sol: r`Step 1 — Define F for a concave mirror.

Step 2 — Use $R = 2f$.`,
  scheme: [['(a) Definition', 1], ['(b) f = 12 cm', 1]],
  d: 1, c: 'understanding', t: [1],
  wl: null,
}), () => near(24 / 2, 12) || 'f');
add('uses-short', short({
  marks: 3,
  stem: 'State one use each of a concave mirror in (a) a vehicle headlight and (b) a dentist’s clinic, and one use of a convex mirror. For each, explain which property of the mirror or its image is being used.',
  model: '(a) **Headlight:** the bulb is placed at the focus of a concave reflector, so the reflected light forms a strong **parallel beam**.\n\n(b) **Dentist:** a concave mirror held close to a tooth (inside F) gives an **enlarged, erect** image, so small details are easy to see.\n\n(c) **Convex mirror:** rear-view mirror of a vehicle, because it always gives an **erect, diminished** image and a **wider field of view**.',
  sol: 'Link each use to the position of the object and the kind of image or beam produced.',
  scheme: [['Headlight: parallel beam from a bulb at F', 1], ['Dentist: enlarged erect image (object inside F)', 1], ['Rear-view: erect, diminished, wide view', 1]],
  d: 2, c: 'application', t: [1, 2],
}));
add('ray-cf-short', short({
  marks: 3,
  wl: null,
  stem: 'Draw a ray diagram to show the image formed by a concave mirror when the object is placed between its principal focus and centre of curvature. State the position, size and nature of the image.',
  model: 'Ray diagram: from the top of the object, one ray **parallel to the axis** reflects through **F**; a second ray **through F** reflects **parallel** to the axis. They meet below the axis beyond C, where the tip of the image is drawn.\n\nImage: **beyond C**, **enlarged**, **real and inverted**.',
  sol: 'Draw two standard rays with arrows, locate the image where they cross, then describe it.',
  scheme: [['Two correct rays with arrows', 1], ['Image drawn beyond C', 1], ['Position, size and nature stated', 1]],
  d: 3, c: 'application', t: [1],
}), () => { const { v, m } = mirrorImage(-30, -20); return (v < -40 && m < -1) || 'C-F'; });
add('concave-long', long({
  stem: '(a) Draw ray diagrams to show the image formed by a concave mirror when the object is placed (i) beyond the centre of curvature and (ii) between the pole and the principal focus.\n\n(b) State the position, size and nature of the image in each case.\n\n(c) Which of these two arrangements is used in a shaving mirror, and why?',
  model: '(a) (i) A ray parallel to the axis reflects through F; a ray through F reflects parallel; they meet **between F and C**. (ii) A ray parallel to the axis reflects through F; a ray along the line from C through the object reflects back along itself; the reflected rays **diverge**, and their backward extensions (dashed) meet **behind the mirror**.\n\n(b) (i) Between F and C; **diminished**; **real and inverted**. (ii) Behind the mirror; **enlarged**; **virtual and erect**.\n\n(c) Arrangement (ii): a face held closer than the focus gives an **enlarged, erect** image, which is what a person shaving needs.',
  sol: 'Step 1 — Draw two standard rays for each position, with arrows and dashed virtual rays.\n\nStep 2 — Describe each image.\n\nStep 3 — Match the shaving mirror to the enlarged, erect image.',
  scheme: [['(a) Diagram (i)', 1.5], ['(a) Diagram (ii) with dashed extensions', 1.5], ['(b) Both images described', 1], ['(c) Arrangement (ii) with reason', 1]],
  d: 3, c: 'understanding', t: [1, 2],
}), () => { const a = mirrorImage(-60, -20); const b = mirrorImage(-10, -20); return (a.v < -20 && a.v > -40 && Math.abs(a.m) < 1 && b.v > 0 && b.m > 1) || 'concave cases'; });

// ---------------------------------------------------------------- t02 sign convention and mirror formula
add('mirror-v-num', num({
  stem: 'An object is placed 20 cm in front of a concave mirror of focal length 12 cm. Find the image distance v, with its sign, in centimetres.',
  value: -30, tol: 0.1, unit: 'cm',
  sol: r`Step 1 — $u = -20\ \text{cm}$, $f = -12\ \text{cm}$.

Step 2 — $\dfrac{1}{v} = \dfrac{1}{f} - \dfrac{1}{u} = -\dfrac{1}{12} + \dfrac{1}{20} = -\dfrac{1}{30}$.

Step 3 — $v = -30\ \text{cm}$: the image is 30 cm in front of the mirror (real).`,
  scheme: [['Signs and formula', 0.5], ['v = −30 cm', 0.5]],
  d: 3, c: 'application', t: [2],
}), (q) => near(mirrorImage(-20, -12).v, q.answer.value) || 'v');
add('mirror-m-num', num({
  stem: 'An object is placed 25 cm in front of a concave mirror of focal length 10 cm. Find the magnification produced, correct to two decimal places.',
  value: -0.67, tol: 0.01, unit: null,
  sol: r`Step 1 — $u = -25\ \text{cm}$, $f = -10\ \text{cm}$: $\dfrac{1}{v} = -\dfrac{1}{10} + \dfrac{1}{25} = -\dfrac{3}{50}$, so $v \approx -16.67\ \text{cm}$.

Step 2 — $m = -\dfrac{v}{u} \approx -\dfrac{-16.67}{-25} \approx -0.67$: real, inverted, diminished.`,
  scheme: [['Finds v ≈ −16.7 cm', 0.5], ['m ≈ −0.67', 0.5]],
  d: 3, c: 'application', t: [2],
}), (q) => near(mirrorImage(-25, -10).m, q.answer.value, 0.005) || 'm');
add('convex-v-num', num({
  stem: 'An object is placed 10 cm in front of a convex mirror of focal length 15 cm. Find the image distance v, with its sign, in centimetres.',
  value: 6, tol: 0.05, unit: 'cm',
  sol: r`Step 1 — $u = -10\ \text{cm}$, $f = +15\ \text{cm}$.

Step 2 — $\dfrac{1}{v} = \dfrac{1}{15} - \dfrac{1}{-10} = \dfrac{1}{15} + \dfrac{1}{10} = \dfrac{1}{6}$.

Step 3 — $v = +6\ \text{cm}$: 6 cm behind the mirror (virtual).`,
  scheme: [['Signs and formula', 0.5], ['v = +6 cm', 0.5]],
  d: 3, c: 'application', t: [2],
}), (q) => near(mirrorImage(-10, 15).v, q.answer.value) || 'convex v');
add('radius-fill', fill({
  stem: 'A spherical mirror has a radius of curvature of 32 cm. Its focal length is ___ cm.',
  acc: [['16', '16 cm', '+16', '-16', '−16']],
  sol: r`$f = \dfrac{R}{2} = \dfrac{32}{2} = 16$ cm.`,
  d: 1, c: 'application', t: [1, 2],
}), () => near(32 / 2, 16) || 'R/2');
add('sign-f-mcq', mcq({
  stem: 'In the New Cartesian sign convention, the focal length of a concave mirror is taken as:',
  right: 'negative, because the focus is in front of the mirror, against the direction of incident light',
  wrong: ['positive, because the mirror converges light', 'positive, because the focus is behind the mirror', 'zero, because the focus lies on the principal axis'],
  sol: 'Distances measured against the direction of incident light are negative; the focus of a concave mirror is in front of it — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('plus-v-mcq', mcq({
  stem: 'Using the mirror formula for a concave mirror, Sunil finds v = +18 cm. What does this tell him about the image?',
  right: 'It is behind the mirror, so it is virtual and erect.',
  wrong: ['It is in front of the mirror, so it is real and inverted.', 'It is at infinity.', 'He must have made an error, because v is always negative for a concave mirror.'],
  sol: 'A positive v means the image lies behind the mirror, in the direction of the incident light: a virtual, erect image (object inside F) — option (@K). Concave mirrors can give positive v (@3).',
  d: 3, c: 'application', t: [2],
}), () => mirrorImage(-9, -18).v > 0 || 'plus v');
add('m-meaning-mcq', mcq({
  stem: 'A mirror produces a magnification of −0.5. The image is:',
  right: 'real, inverted and half the size of the object',
  wrong: ['virtual, erect and half the size of the object', 'real, inverted and twice the size of the object', 'virtual, erect and twice the size of the object'],
  sol: 'Negative m → real and inverted; size 0.5 → half as tall — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('object-for-m-mcq', mcq({
  stem: 'A concave mirror of focal length 10 cm forms a real image twice the size of the object. How far from the mirror is the object?',
  right: '15 cm',
  wrong: ['5 cm', '20 cm', '30 cm'],
  sol: r`Step 1 — Real image, twice the size: $m = -2 = -\dfrac{v}{u}$, so $v = 2u$.

Step 2 — $\dfrac{1}{2u} + \dfrac{1}{u} = -\dfrac{1}{10}$, so $\dfrac{3}{2u} = -\dfrac{1}{10}$ and $u = -15\ \text{cm}$ — option (@K).

Step 3 — Check: $v = -30$ cm, $m = -2$. 5 cm (@1) gives a virtual image; 20 cm (@2) is at C (same size).`,
  d: 4, c: 'analysis', t: [2],
}), () => { const { m } = mirrorImage(-15, -10); return near(m, -2) || 'u'; });
add('convex-m-ar', ar({
  a: 'The magnification produced by a convex mirror is always positive and less than 1.',
  r: 'A convex mirror always forms a virtual, erect and diminished image.',
  key: 'a',
  sol: 'Both are true. Erect gives a positive m, and diminished gives a value less than 1, so R explains A — option (a).',
  d: 2, c: 'understanding', t: [2],
}), () => [-1, -10, -50].every((u) => { const { m } = mirrorImage(u, 20); return m > 0 && m < 1; }) || 'convex m');
add('negative-m-ar', ar({
  a: 'The focal length of a convex mirror is taken as negative in the New Cartesian sign convention.',
  r: 'The focus of a convex mirror lies behind the mirror, in the direction of the incident light.',
  key: 'd',
  sol: 'A is false: since the focus is behind the mirror, along the incident light, f is positive. R is true — option (d).',
  d: 2, c: 'understanding', t: [2],
}));
add('u-sign-tf', tf({
  stem: 'In the New Cartesian sign convention, the distance u of a real object placed in front of a mirror is always negative.',
  key: 't',
  sol: 'True. The object is placed to the left, against the direction of the incident light, so u is negative.',
  d: 2, c: 'understanding', t: [2],
}));
add('sign-short', short({
  marks: 2,
  stem: 'State the four rules of the New Cartesian sign convention for spherical mirrors.',
  model: '(1) The **pole** is the origin and the principal axis is the x-axis; the object is placed to the **left** of the mirror. (2) Distances measured in the direction of the **incident light** are **positive**. (3) Distances measured **against** the incident light are **negative**. (4) Heights **above** the axis are **positive** and heights **below** are **negative**.',
  sol: 'List the origin, the two direction rules and the height rule.',
  scheme: [['Origin and object position', 0.5], ['Positive along the incident light', 0.5], ['Negative against it', 0.5], ['Heights up positive, down negative', 0.5]],
  d: 1, c: 'recall', t: [2],
}));
add('mirror-calc-short', short({
  marks: 3,
  wl: null,
  stem: 'A 5 cm tall object is placed 30 cm in front of a concave mirror of focal length 20 cm. Find the position, nature and height of the image.',
  model: r`$u = -30$ cm, $f = -20$ cm, $h = +5$ cm.

$\dfrac{1}{v} = -\dfrac{1}{20} + \dfrac{1}{30} = -\dfrac{1}{60}$, so $v = -60$ cm.

$m = -\dfrac{v}{u} = -\dfrac{-60}{-30} = -2$, so $h' = -2 \times 5 = -10$ cm.

The image is **60 cm in front** of the mirror, **real, inverted** and **enlarged** (10 cm tall).`,
  sol: r`Step 1 — Signs. Step 2 — Mirror formula for v. Step 3 — $m = -\dfrac{v}{u}$, then $h' = m h$.`,
  scheme: [['Signs and formula; v = −60 cm', 1], ['m = −2 and h′ = −10 cm', 1], ['Nature: real, inverted, enlarged', 1]],
  d: 3, c: 'application', t: [2],
}), () => { const { v, m } = mirrorImage(-30, -20); return (near(v, -60) && near(m, -2) && near(m * 5, -10)) || 'calc'; });
add('dentist-short', short({
  marks: 3,
  wl: null,
  stem: 'A dentist uses a concave mirror of focal length 16 cm and wants an erect image of a tooth that is 4 times as large. How far from the tooth should she hold the mirror? Where is the image formed?',
  model: r`Erect, so the image is virtual and $m = +4 = -\dfrac{v}{u}$, giving $v = -4u$.

$\dfrac{1}{v} + \dfrac{1}{u} = \dfrac{1}{f}$: $-\dfrac{1}{4u} + \dfrac{1}{u} = -\dfrac{1}{16}$, so $\dfrac{3}{4u} = -\dfrac{1}{16}$ and $u = -12$ cm.

$v = -4u = +48$ cm. She should hold the mirror **12 cm** from the tooth; the image is **48 cm behind** the mirror (virtual, erect).`,
  sol: 'Step 1 — Use m to relate v and u. Step 2 — Substitute in the mirror formula. Step 3 — Find v and interpret.',
  scheme: [['m = +4 gives v = −4u', 1], ['u = −12 cm', 1], ['v = +48 cm, virtual and erect', 1]],
  d: 4, c: 'analysis', t: [2],
}), () => { const { v, m } = mirrorImage(-12, -16); return (near(v, 48) && near(m, 4)) || 'dentist'; });
add('convex-long', long({
  wl: null,
  stem: 'A convex mirror has a radius of curvature of 60 cm. A 6 cm tall object is placed 20 cm in front of it.\n\n(a) Find the position and size of the image.\n\n(b) State the nature of the image.\n\n(c) Draw a ray diagram for this case.\n\n(d) Give one use of convex mirrors and explain why they suit it.',
  model: r`(a) $f = +\dfrac{60}{2} = +30$ cm; $u = -20$ cm. $\dfrac{1}{v} = \dfrac{1}{30} + \dfrac{1}{20} = \dfrac{1}{12}$, so $v = +12$ cm. $m = -\dfrac{v}{u} = -\dfrac{12}{-20} = +0.6$, so $h' = 0.6 \times 6 = 3.6$ cm.

(b) **Virtual, erect, diminished**, 12 cm behind the mirror.

(c) A ray parallel to the axis reflects as if coming from F (dashed back to F); a ray aimed at C reflects back along itself (dashed to C); the dashed extensions meet behind the mirror between P and F.

(d) Rear-view mirrors of vehicles: they always give an erect, diminished image and a **wider field of view**.`,
  sol: 'Step 1 — f = R/2, positive for convex. Step 2 — Mirror formula and magnification. Step 3 — Describe and draw. Step 4 — Use with reason.',
  scheme: [['(a) f = +30 cm and v = +12 cm', 1.5], ['(a) m = 0.6, h′ = 3.6 cm', 1], ['(b) Nature', 0.5], ['(c) Ray diagram with dashed extensions', 1], ['(d) Use with reason', 1]],
  d: 4, c: 'application', t: [1, 2],
}), () => { const { v, m } = mirrorImage(-20, 30); return (near(v, 12) && near(m, 0.6) && near(m * 6, 3.6)) || 'convex long'; });
add('shaving-long', long({
  wl: null,
  stem: 'Priya’s concave make-up mirror has a focal length of 24 cm. She holds her face 16 cm from it.\n\n(a) Calculate the image distance and the magnification.\n\n(b) Describe the image and explain why it is useful for her.\n\n(c) Draw the ray diagram for this situation.\n\n(d) If she moves her face to 60 cm from the mirror, describe the new image without calculation, and say whether it is still useful as a make-up mirror.',
  model: r`(a) $u = -16$ cm, $f = -24$ cm. $\dfrac{1}{v} = -\dfrac{1}{24} + \dfrac{1}{16} = \dfrac{1}{48}$, so $v = +48$ cm. $m = -\dfrac{v}{u} = -\dfrac{48}{-16} = +3$.

(b) The image is **virtual, erect and three times enlarged**, 48 cm behind the mirror: she sees an upright, magnified view of her face.

(c) A ray parallel to the axis reflects through F; a ray along the line from C through the object reflects back on itself; the reflected rays diverge, and their dashed extensions meet behind the mirror.

(d) At 60 cm the face is beyond C (48 cm), so the image is **real, inverted and diminished**, in front of the mirror; it is no longer useful as a make-up mirror.`,
  sol: 'Step 1 — Signs and the mirror formula. Step 2 — Interpret v and m. Step 3 — Ray diagram. Step 4 — Use the position of C (R = 48 cm).',
  scheme: [['(a) v = +48 cm', 1], ['(a) m = +3', 1], ['(b) Description and usefulness', 1], ['(c) Ray diagram', 1], ['(d) Real, inverted, diminished; not useful', 1]],
  d: 5, c: 'analysis', t: [1, 2],
}), () => { const a = mirrorImage(-16, -24); const b = mirrorImage(-60, -24); return (near(a.v, 48) && near(a.m, 3) && b.v < 0 && b.m < 0 && Math.abs(b.m) < 1) || 'shaving'; });

// ---------------------------------------------------------------- t03 refraction
add('water-air-mcq', mcq({
  stem: 'A ray of light passes obliquely from water into air. What happens to it at the surface?',
  right: 'It bends away from the normal.',
  wrong: ['It bends towards the normal.', 'It passes straight through without bending.', 'It is always completely reflected back into the water.'],
  sol: 'Light speeds up as it passes from an optically denser medium (water) to a rarer one (air), so it bends away from the normal — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('slab-mcq', mcq({
  stem: 'A ray of light passes obliquely through a rectangular glass slab. How is the emergent ray related to the incident ray?',
  right: 'It is parallel to the incident ray but shifted sideways.',
  wrong: ['It travels along the same line as the incident ray.', 'It is perpendicular to the incident ray.', 'It bends towards the base of the slab at a larger angle.'],
  sol: 'Bending at the first face is reversed at the second, parallel face, so the emergent ray is parallel to the incident ray, with a lateral shift — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('pencil-mcq', mcq({
  stem: 'A pencil dipped slantwise into a glass of water appears bent at the water surface. This is because:',
  right: 'light from the part under water bends as it passes from water into air',
  wrong: ['the pencil actually bends in water', 'light is reflected by the water surface', 'water absorbs light from the lower part of the pencil'],
  sol: 'Rays from the submerged part refract away from the normal as they leave the water, so that part appears raised and the pencil looks bent — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('slowest-mcq', mcq({
  stem: 'The refractive indices of four materials are: water 1.33, kerosene 1.44, crown glass 1.52 and diamond 2.42. In which material does light travel most slowly?',
  right: 'Diamond',
  wrong: ['Water', 'Kerosene', 'Crown glass'],
  sol: r`Since $v = \dfrac{c}{n}$, the largest refractive index gives the lowest speed: diamond — option (@K).`,
  d: 2, c: 'application', t: [3],
}), () => (C / 2.42 < C / 1.52) || 'slowest');
add('towards-normal-mcq', mcq({
  stem: 'Light passes from medium A (refractive index 1.33) into medium B (refractive index 1.65). Which statement is correct?',
  right: 'The light slows down and bends towards the normal.',
  wrong: ['The light speeds up and bends away from the normal.', 'The light slows down and bends away from the normal.', 'The light does not bend, because both media are transparent.'],
  sol: 'B has a higher refractive index, so it is optically denser: light slows down and bends towards the normal — option (@K).',
  d: 3, c: 'application', t: [3],
}));
add('normal-mcq', mcq({
  stem: 'A ray of light falls on a glass surface along the normal (angle of incidence 0°). What happens to it?',
  right: 'It passes into the glass without changing direction.',
  wrong: ['It bends towards the normal.', 'It bends away from the normal.', 'It is completely reflected.'],
  sol: r`With $i = 0$, $\sin i = 0$, so $\sin r = 0$ and $r = 0$: the ray goes straight on (its speed still changes) — option (@K).`,
  d: 2, c: 'understanding', t: [3],
}));
add('speed-num', num({
  stem: 'The refractive index of a medium is 1.25. Find the speed of light in this medium, in units of 10⁸ m/s. (Speed of light in vacuum = 3 × 10⁸ m/s.)',
  value: 2.4, tol: 0.01, unit: '× 10⁸ m/s',
  sol: r`$v = \dfrac{c}{n} = \dfrac{3 \times 10^8}{1.25} = 2.4 \times 10^8\ \text{m/s}$.`,
  scheme: [['v = c/n = 2.4 × 10⁸ m/s', 1]],
  d: 2, c: 'application', t: [3],
}), (q) => near(C / 1.25 / 1e8, q.answer.value) || 'speed');
add('snell-num', num({
  stem: 'For a ray passing from air into a transparent plastic, sin i = 0.50 and sin r = 0.32. Find the refractive index of the plastic, correct to two decimal places.',
  value: 1.56, tol: 0.01, unit: null,
  sol: r`$n = \dfrac{\sin i}{\sin r} = \dfrac{0.50}{0.32} \approx 1.56$.`,
  scheme: [['n = 0.50 ÷ 0.32 ≈ 1.56', 1]],
  d: 2, c: 'application', t: [3],
}), (q) => near(0.5 / 0.32, q.answer.value, 0.005) || 'snell');
add('relative-num', num({
  marks: 2,
  stem: 'The refractive index of diamond is 2.42 and that of glass is 1.50. Find the refractive index of diamond with respect to glass, correct to two decimal places, and say which material is optically denser.',
  value: 1.61, tol: 0.01, unit: null,
  sol: r`Step 1 — $n_{dg} = \dfrac{n_d}{n_g} = \dfrac{2.42}{1.50} \approx 1.61$.

Step 2 — The value is greater than 1, so diamond is optically denser than glass (light is slower in diamond).`,
  scheme: [['Relative index formula', 0.5], ['1.61', 1], ['Diamond is optically denser', 0.5]],
  d: 3, c: 'application', t: [3],
}), (q) => near(2.42 / 1.5, q.answer.value, 0.005) || 'relative');
add('n-from-speed-num', num({
  stem: 'Light travels at 2.25 × 10⁸ m/s in a liquid. Find the refractive index of the liquid, correct to two decimal places.',
  value: 1.33, tol: 0.01, unit: null,
  sol: r`$n = \dfrac{c}{v} = \dfrac{3 \times 10^8}{2.25 \times 10^8} \approx 1.33$ (the liquid could be water).`,
  scheme: [['n = c/v ≈ 1.33', 1]],
  d: 3, c: 'application', t: [3],
}), (q) => near(C / 2.25e8, q.answer.value, 0.005) || 'n');
add('kerosene-ar', ar({
  a: 'Kerosene is optically denser than water.',
  r: 'Kerosene floats on water.',
  key: 'b',
  sol: 'Both are true, but floating depends on mass density, while optical density depends on the speed of light (n = 1.44 for kerosene, 1.33 for water). R does not explain A — option (b).',
  d: 3, c: 'analysis', t: [3],
}));
add('slab-ar', ar({
  a: 'The emergent ray from a rectangular glass slab is parallel to the incident ray.',
  r: 'Light travels more slowly in glass than in air.',
  key: 'b',
  sol: 'Both are true, but the slower speed explains why light bends, not why the emergent ray is parallel; that is because the two faces are parallel, so the second bending reverses the first — option (b).',
  d: 3, c: 'analysis', t: [3],
}));
add('n-less-ar', ar({
  a: 'The absolute refractive index of glass is less than 1.',
  r: 'Light travels more slowly in glass than in vacuum.',
  key: 'd',
  sol: 'A is false: n = c/v, and since v in glass is less than c, n is greater than 1. R is true — option (d).',
  d: 2, c: 'understanding', t: [3],
}));
add('n-tf', tf({
  stem: 'A medium with a higher refractive index is optically denser, and light travels more slowly in it.',
  key: 't',
  sol: 'True, since n = c/v.',
  d: 1, c: 'understanding', t: [3],
}));
add('snell-fill', fill({
  stem: 'For a given pair of media and colour of light, the constant ratio of the sine of the angle of incidence to the sine of the angle of refraction is called the ___.',
  acc: [['refractive index', 'relative refractive index']],
  sol: 'It is the **refractive index** of the second medium with respect to the first (Snell’s law).',
  d: 1, c: 'recall', t: [3],
}));
add('laws-refraction-short', short({
  marks: 2,
  stem: 'State the two laws of refraction of light.',
  model: '(1) The incident ray, the refracted ray and the normal to the interface at the point of incidence all lie in the **same plane**. (2) For a given pair of media and a given colour of light, the ratio of the sine of the angle of incidence to the sine of the angle of refraction is **constant** (Snell’s law).',
  sol: 'State both laws, including the conditions in the second.',
  scheme: [['First law', 1], ['Snell’s law with its conditions', 1]],
  d: 1, c: 'recall', t: [3],
}));
add('coin-short', short({
  marks: 2,
  stem: 'A coin lying at the bottom of a bucket of water appears to be raised when seen from above. Explain why.',
  model: 'Light from the coin passes from **water into air**, an optically rarer medium, so at the surface it bends **away from the normal**. To an eye above, the rays seem to come from a point higher than the coin, so the coin appears **raised** (the water looks shallower).',
  sol: 'Trace light from the coin to the eye and apply the rule for denser-to-rarer refraction.',
  scheme: [['Refraction from water to air, away from the normal', 1], ['Rays appear to come from a higher point', 1]],
  d: 3, c: 'application', t: [3],
}));
add('slab-short', short({
  marks: 3,
  stem: 'Describe, with the help of a labelled diagram, the path of a ray of light through a rectangular glass slab. Why is the emergent ray parallel to the incident ray?',
  model: 'Diagram labels: incident ray, normal at each face, refracted ray inside the slab, emergent ray, angles **i**, **r** and **e**, lateral shift.\n\nOn entering the glass the ray slows down and bends **towards** the normal (r < i). On leaving, it speeds up and bends **away** from the normal. Because the two faces are **parallel**, the bending at the second face exactly reverses the bending at the first, so **e = i** and the emergent ray is **parallel** to the incident ray, shifted sideways.',
  sol: 'Draw the ray with normals and angles; explain the two bendings and why they cancel.',
  scheme: [['Labelled diagram with normals and angles', 1], ['Towards then away from the normal', 1], ['Parallel faces, so e = i and the rays are parallel', 1]],
  d: 3, c: 'application', t: [3],
}));
add('speed-short', short({
  marks: 3,
  wl: null,
  stem: 'The refractive index of water is 1.33 and that of a glass is 1.50. (a) Find the speed of light in each. (b) In which is light faster? (c) Which is optically denser?',
  model: r`(a) Water: $v = \dfrac{3 \times 10^8}{1.33} \approx 2.26 \times 10^8$ m/s. Glass: $v = \dfrac{3 \times 10^8}{1.50} = 2.0 \times 10^8$ m/s.

(b) Light is faster in **water**.

(c) **Glass** is optically denser (larger n, lower speed).`,
  sol: r`Use $v = \dfrac{c}{n}$ for each, then compare.`,
  scheme: [['Speed in water ≈ 2.26 × 10⁸ m/s', 1], ['Speed in glass = 2.0 × 10⁸ m/s', 1], ['Faster in water; glass optically denser', 1]],
  d: 3, c: 'application', t: [3],
}), () => (near(C / 1.33 / 1e8, 2.26, 0.005) && near(C / 1.5 / 1e8, 2)) || 'speeds');
add('refraction-long', long({
  stem: '(a) What is refraction of light? Why does it happen?\n\n(b) State the laws of refraction.\n\n(c) Draw a labelled diagram of refraction through a rectangular glass slab and mark the lateral shift.\n\n(d) The speed of light in a medium is 2 × 10⁸ m/s. Find its absolute refractive index.',
  model: r`(a) Refraction is the **change in direction** of light when it passes obliquely from one transparent medium into another. It happens because light travels at **different speeds** in different media.

(b) (1) The incident ray, the refracted ray and the normal at the point of incidence lie in the same plane. (2) For a given pair of media and colour of light, $\dfrac{\sin i}{\sin r}$ is constant (Snell’s law).

(c) Diagram: incident ray, normals, refracted ray bending towards the normal inside the glass, emergent ray bending away and parallel to the incident ray, angles i, r and e, and the lateral shift between the incident direction and the emergent ray.

(d) $n = \dfrac{c}{v} = \dfrac{3 \times 10^8}{2 \times 10^8} = 1.5$.`,
  sol: 'Step 1 — Define and give the cause. Step 2 — Two laws. Step 3 — Labelled slab diagram. Step 4 — n = c/v.',
  scheme: [['(a) Definition and cause', 1], ['(b) Two laws', 1], ['(c) Labelled diagram with lateral shift', 2], ['(d) n = 1.5', 1]],
  d: 3, c: 'understanding', t: [3],
}), () => near(C / 2e8, 1.5) || 'n');

// ---------------------------------------------------------------- t04 lenses and images
add('lens-diminished-mcq', mcq({
  stem: 'Where must an object be placed in front of a convex lens to obtain a real, inverted and diminished image?',
  right: 'Beyond 2F₁',
  wrong: ['At 2F₁', 'Between F₁ and 2F₁', 'Between F₁ and the optical centre'],
  sol: 'An object beyond 2F₁ gives a diminished real image between F₂ and 2F₂ — option (@K). At 2F₁ the image is the same size (@1); between F₁ and 2F₁ it is enlarged (@2); inside F₁ it is virtual (@3).',
  d: 2, c: 'understanding', t: [4],
}), () => { const { v, m } = lensImage(-50, 20); return (v > 0 && Math.abs(m) < 1) || 'diminished'; });
add('magnifier-mcq', mcq({
  stem: 'A watch repairer uses a convex lens as a magnifying glass. Where must the tiny part of the watch be placed?',
  right: 'Between the optical centre and the focus of the lens',
  wrong: ['Exactly at the focus of the lens', 'At twice the focal length from the lens', 'Beyond twice the focal length from the lens'],
  sol: 'Only an object closer than F₁ gives a virtual, erect, enlarged image — option (@K).',
  d: 3, c: 'application', t: [4],
}), () => { const { v, m } = lensImage(-4, 5); return (v < 0 && m > 1) || 'magnifier'; });
add('concave-lens-mcq', mcq({
  stem: 'The image formed by a concave lens of a real object is always:',
  right: 'virtual, erect and diminished',
  wrong: ['real, inverted and diminished', 'virtual, erect and enlarged', 'real, erect and the same size'],
  sol: 'A concave lens diverges light, so its image is always virtual, erect and diminished, between F₁ and O — option (@K).',
  d: 1, c: 'recall', t: [4],
}), () => [-5, -30, -200].every((u) => { const { v, m } = lensImage(u, -20); return v < 0 && m > 0 && m < 1; }) || 'concave lens');
add('same-size-mcq', mcq({
  stem: 'An object is placed 40 cm in front of a convex lens of focal length 20 cm. Where is the image formed?',
  right: '40 cm on the other side of the lens; real, inverted, same size',
  wrong: ['20 cm on the other side of the lens; real, inverted, diminished', '40 cm on the same side as the object; virtual, erect', 'At infinity'],
  sol: r`The object is at $2F_1$ ($u = -40$ cm $= -2f$). Then $\dfrac{1}{v} = \dfrac{1}{20} - \dfrac{1}{40} = \dfrac{1}{40}$, so $v = +40$ cm and $m = \dfrac{v}{u} = -1$ — option (@K).`,
  d: 3, c: 'application', t: [4, 5],
}), () => { const { v, m } = lensImage(-40, 20); return (near(v, 40) && near(m, -1)) || '2F'; });
add('projector-mcq', mcq({
  stem: 'In a school projector, a small slide is placed in front of a convex lens so that a large, real image is formed on a distant screen. Where is the slide placed?',
  right: 'Between F₁ and 2F₁',
  wrong: ['Beyond 2F₁', 'At F₁', 'Between F₁ and the optical centre'],
  sol: 'A large real image far away needs the object between F₁ and 2F₁ — option (@K). Beyond 2F₁ (@1) gives a small image; at F₁ (@2) the image is at infinity; inside F₁ (@3) it is virtual.',
  d: 3, c: 'application', t: [4],
}), () => { const { v, m } = lensImage(-30, 20); return (v > 40 && m < -1) || 'projector'; });
add('identify-lens-mcq', mcq({
  stem: 'A lens forms an erect, diminished image of a distant tree and also an erect, diminished image of a book held close to it. The lens is most likely:',
  right: 'concave',
  wrong: ['convex', 'either convex or concave', 'a thick glass slab'],
  sol: r`Step 1 — A convex lens gives an inverted image of a distant object, and an enlarged image of a close one, so it cannot fit (@1).

Step 2 — A concave lens always gives erect, diminished images — option (@K). A glass slab (@3) does not form diminished images.`,
  d: 4, c: 'analysis', t: [4],
}), () => { const a = lensImage(-1000, -20); const b = lensImage(-10, -20); return (a.m > 0 && a.m < 1 && b.m > 0 && b.m < 1) || 'concave both'; });
add('o-ar', ar({
  a: 'A ray of light passing through the optical centre of a lens goes straight on without deviation.',
  r: 'The optical centre of a lens is the same point as its principal focus.',
  key: 'c',
  sol: 'A is true. R is false: the optical centre is at the middle of the lens, while the foci are a focal length away on either side — option (c).',
  d: 2, c: 'understanding', t: [4],
}));
add('lens-virtual-tf', tf({
  stem: 'A convex lens can form a virtual image.',
  key: 't',
  sol: 'True. When the object is between F₁ and O, a convex lens forms a virtual, erect, enlarged image (a magnifying glass).',
  d: 2, c: 'understanding', t: [4],
}), () => lensImage(-10, 20).v < 0 || 'virtual');
add('o-fill', fill({
  stem: 'A ray of light passing through the ___ of a lens goes straight on without bending.',
  acc: [['optical centre', 'optical center', 'centre', 'center']],
  sol: 'It is the **optical centre** (O).',
  d: 1, c: 'recall', t: [4],
}));
add('lens-match', match({
  stem: 'For a convex lens, match each object position in Column A with the nature of the image in Column B.',
  pairs: [['Beyond 2F₁', 'Real, inverted, diminished'], ['At 2F₁', 'Real, inverted, same size'], ['Between F₁ and 2F₁', 'Real, inverted, enlarged'], ['Between F₁ and O', 'Virtual, erect, enlarged']],
  order: [1, 3, 0, 2],
  sol: 'Beyond 2F₁ → diminished (1 → q); at 2F₁ → same size (2 → s); between F₁ and 2F₁ → enlarged real (3 → p); inside F₁ → virtual erect enlarged (4 → r).',
  d: 2, c: 'understanding', t: [4],
}), () => {
  const f = 20; const a = lensImage(-60, f); const b = lensImage(-40, f); const c = lensImage(-30, f); const d = lensImage(-10, f);
  return (Math.abs(a.m) < 1 && near(b.m, -1) && c.m < -1 && d.m > 1) || 'lens table';
});
add('concave-lens-ray-short', short({
  marks: 2,
  wl: null,
  stem: 'Draw a ray diagram to show the image formed by a concave lens of an object placed between F₁ and 2F₁. State the nature of the image.',
  model: 'Ray diagram: a ray **parallel to the axis** is refracted so that it **appears to come from F₁** (dashed back to F₁); a ray **through O** goes straight on. The dashed extension and the ray through O meet **between F₁ and O**, on the same side as the object.\n\nImage: **virtual, erect, diminished**.',
  sol: 'Two standard rays; locate the image where the ray through O meets the backward extension.',
  scheme: [['Correct rays with dashed extension', 1], ['Image between F₁ and O, virtual, erect, diminished', 1]],
  d: 3, c: 'application', t: [4],
}), () => { const { v, m } = lensImage(-30, -20); return (v < 0 && v > -20 && m > 0 && m < 1) || 'concave lens image'; });
add('convex-lens-ray-short', short({
  marks: 3,
  wl: null,
  stem: 'Draw a ray diagram for a convex lens with the object placed between F₁ and the optical centre. Describe the image, and name a device that uses this arrangement.',
  model: 'Ray diagram: a ray **parallel to the axis** refracts through **F₂**; a ray **through O** goes straight on. The refracted rays **diverge**; their dashed backward extensions meet on the **same side as the object**, beyond it.\n\nImage: **virtual, erect, enlarged**. Device: a **magnifying glass** (simple microscope).',
  sol: 'Draw the two rays, extend them backwards, describe the image and name the magnifier.',
  scheme: [['Correct rays', 1], ['Dashed extensions locate a virtual image on the object’s side', 1], ['Virtual, erect, enlarged; magnifying glass', 1]],
  d: 3, c: 'application', t: [4],
}), () => { const { v, m } = lensImage(-10, 20); return (v < 0 && m > 1) || 'magnifier'; });
add('lens-diagram-long', long({
  stem: '(a) Distinguish between a convex lens and a concave lens (two points).\n\n(b) Draw ray diagrams for a convex lens when the object is placed (i) at 2F₁ and (ii) at F₁. State the position and nature of the image in each case.\n\n(c) Explain why a concave lens can never form a real image of a real object.',
  model: '(a) A convex lens is **thicker at the middle** and **converges** parallel rays; a concave lens is **thicker at the edges** and **diverges** parallel rays.\n\n(b) (i) Ray parallel to the axis → through F₂; ray through O → straight on; they meet at **2F₂**: **real, inverted, same size**. (ii) Ray parallel to the axis → through F₂; ray through O → straight on; the refracted rays are **parallel**, so the image is at **infinity**: real, inverted, highly enlarged.\n\n(c) A concave lens always makes the rays **diverge** after refraction, so they never actually meet; they only appear to meet on the object’s side, giving a **virtual** image.',
  sol: 'Step 1 — Shape and effect. Step 2 — Two diagrams with descriptions. Step 3 — Divergence means no real meeting point.',
  scheme: [['(a) Two differences', 1], ['(b)(i) Diagram and description', 1.5], ['(b)(ii) Diagram and description', 1.5], ['(c) Rays always diverge, so the image is virtual', 1]],
  d: 3, c: 'understanding', t: [4],
}), () => (near(lensImage(-40, 20).v, 40) && !Number.isFinite(lensImage(-20, 20).v)) || 'cases');

// ---------------------------------------------------------------- t05 lens formula and power
add('lens-v-num', num({
  stem: 'An object is placed 15 cm in front of a convex lens of focal length 10 cm. Find the image distance v, with its sign, in centimetres.',
  value: 30, tol: 0.1, unit: 'cm',
  sol: r`Step 1 — $u = -15\ \text{cm}$, $f = +10\ \text{cm}$.

Step 2 — $\dfrac{1}{v} = \dfrac{1}{f} + \dfrac{1}{u} = \dfrac{1}{10} - \dfrac{1}{15} = \dfrac{1}{30}$.

Step 3 — $v = +30\ \text{cm}$: on the other side of the lens (real).`,
  scheme: [['Signs and formula', 0.5], ['v = +30 cm', 0.5]],
  d: 3, c: 'application', t: [5],
}), (q) => near(lensImage(-15, 10).v, q.answer.value) || 'lens v');
add('concave-lens-num', num({
  stem: 'An object is placed 20 cm in front of a concave lens of focal length 20 cm. Find the image distance v, with its sign, in centimetres.',
  value: -10, tol: 0.05, unit: 'cm',
  sol: r`$u = -20$ cm, $f = -20$ cm. $\dfrac{1}{v} = -\dfrac{1}{20} - \dfrac{1}{20} = -\dfrac{1}{10}$, so $v = -10$ cm: virtual, on the same side as the object.`,
  scheme: [['v = −10 cm', 1]],
  d: 3, c: 'application', t: [5],
}), (q) => near(lensImage(-20, -20).v, q.answer.value) || 'concave lens v');
add('power-num', num({
  stem: 'Find the power of a convex lens of focal length 40 cm, in dioptres.',
  value: 2.5, tol: 0.01, unit: 'D',
  sol: r`$f = +40\ \text{cm} = +0.40\ \text{m}$, so $P = \dfrac{1}{0.40} = +2.5\ \text{D}$.`,
  scheme: [['Converts to metres; P = +2.5 D', 1]],
  d: 2, c: 'application', t: [5],
}), (q) => near(1 / 0.4, q.answer.value) || 'power');
add('contact-num', num({
  stem: 'A convex lens of power +4.0 D is placed in contact with a concave lens of power −1.5 D. Find the focal length of the combination, in centimetres.',
  value: 40, tol: 0.1, unit: 'cm',
  sol: r`$P = +4.0 + (-1.5) = +2.5\ \text{D}$, so $f = \dfrac{1}{2.5} = 0.40\ \text{m} = 40\ \text{cm}$ (converging).`,
  scheme: [['P = +2.5 D', 0.5], ['f = 40 cm', 0.5]],
  d: 3, c: 'application', t: [5],
}), (q) => near(100 / (4.0 - 1.5), q.answer.value) || 'contact');
add('lens-m-num', num({
  stem: 'An object is placed 10 cm in front of a convex lens of focal length 15 cm. Find the magnification produced.',
  value: 3, tol: 0.01, unit: null,
  sol: r`Step 1 — $\dfrac{1}{v} = \dfrac{1}{15} - \dfrac{1}{10} = -\dfrac{1}{30}$, so $v = -30$ cm.

Step 2 — $m = \dfrac{v}{u} = \dfrac{-30}{-10} = +3$: virtual, erect, three times enlarged.`,
  scheme: [['v = −30 cm', 0.5], ['m = +3', 0.5]],
  d: 3, c: 'application', t: [5],
}), (q) => near(lensImage(-10, 15).m, q.answer.value) || 'lens m');
add('power-sign-mcq', mcq({
  stem: 'An optician’s prescription reads −2.0 D. What kind of lens is it, and what is its focal length?',
  right: 'Concave lens of focal length 50 cm',
  wrong: ['Convex lens of focal length 50 cm', 'Concave lens of focal length 2 cm', 'Convex lens of focal length 2 m'],
  sol: r`Negative power means a concave (diverging) lens. $f = \dfrac{1}{P} = \dfrac{1}{-2.0} = -0.5\ \text{m} = -50\ \text{cm}$ — option (@K).`,
  d: 2, c: 'application', t: [5],
}), () => near(1 / -2.0, -0.5) || 'f');
add('lens-formula-mcq', mcq({
  stem: 'Which is the correct lens formula in the New Cartesian sign convention?',
  right: '1/v − 1/u = 1/f',
  wrong: ['1/v + 1/u = 1/f', '1/u − 1/v = 1/f', 'v − u = f'],
  sol: 'For lenses, 1/v − 1/u = 1/f — option (@K). 1/v + 1/u = 1/f (@1) is the mirror formula.',
  d: 1, c: 'recall', t: [5],
}));
add('strongest-mcq', mcq({
  stem: 'Which of these lenses converges light most strongly?',
  right: 'A convex lens of focal length 10 cm',
  wrong: ['A convex lens of focal length 50 cm', 'A concave lens of focal length 10 cm', 'A convex lens of focal length 1 m'],
  sol: r`Converging power is largest for the convex lens with the shortest focal length: $P = \dfrac{1}{0.10} = +10\ \text{D}$, compared with +2 D and +1 D; a concave lens diverges light — option (@K).`,
  d: 3, c: 'application', t: [5],
}), () => (1 / 0.1 > 1 / 0.5 && 1 / 0.5 > 1 / 1) || 'power order');
add('power-sign-ar', ar({
  a: 'The power of a concave lens is negative.',
  r: 'The focal length of a concave lens is negative in the New Cartesian sign convention.',
  key: 'a',
  sol: r`Both are true. Since $P = \dfrac{1}{f}$, a negative focal length gives a negative power, so R explains A — option (a).`,
  d: 2, c: 'understanding', t: [5],
}));
add('power-short', short({
  marks: 2,
  wl: null,
  stem: '(a) Define one dioptre.\n\n(b) Find the power of (i) a convex lens of focal length 25 cm and (ii) a concave lens of focal length 50 cm.',
  model: r`(a) One dioptre is the power of a lens whose focal length is **1 metre**.

(b) (i) $P = \dfrac{1}{0.25} = +4\ \text{D}$. (ii) $P = \dfrac{1}{-0.50} = -2\ \text{D}$.`,
  sol: 'Define the unit, convert each focal length to metres with its sign, and take the reciprocal.',
  scheme: [['(a) Definition', 1], ['(b) +4 D and −2 D (0.5 each)', 1]],
  d: 2, c: 'application', t: [5],
}), () => (near(1 / 0.25, 4) && near(1 / -0.5, -2)) || 'powers');
add('lens-calc-short', short({
  marks: 3,
  wl: null,
  stem: 'A 3 cm tall object is placed 24 cm in front of a convex lens of focal length 16 cm. Find the position, nature and height of the image.',
  model: r`$u = -24$ cm, $f = +16$ cm. $\dfrac{1}{v} = \dfrac{1}{16} - \dfrac{1}{24} = \dfrac{1}{48}$, so $v = +48$ cm.

$m = \dfrac{v}{u} = \dfrac{48}{-24} = -2$, so $h' = -2 \times 3 = -6$ cm.

The image is **48 cm on the other side** of the lens, **real, inverted** and **enlarged** (6 cm tall).`,
  sol: 'Step 1 — Signs and the lens formula. Step 2 — m = v/u and h′ = m h. Step 3 — Interpret.',
  scheme: [['v = +48 cm', 1], ['m = −2, h′ = −6 cm', 1], ['Real, inverted, enlarged', 1]],
  d: 3, c: 'application', t: [5],
}), () => { const { v, m } = lensImage(-24, 16); return (near(v, 48) && near(m, -2) && near(m * 3, -6)) || 'lens calc'; });
add('contact-short', short({
  marks: 3,
  wl: null,
  stem: 'A convex lens of power +5 D is placed in contact with a concave lens of power −3 D.\n\n(a) Find the power and focal length of the combination.\n\n(b) An object is placed 75 cm in front of the combination. Find the image distance.\n\n(c) Is the image real or virtual?',
  model: r`(a) $P = +5 + (-3) = +2$ D, so $f = \dfrac{1}{2} = 0.5$ m $= +50$ cm.

(b) $u = -75$ cm: $\dfrac{1}{v} = \dfrac{1}{50} - \dfrac{1}{75} = \dfrac{1}{150}$, so $v = +150$ cm.

(c) v is positive, so the image is **real** (on the other side, inverted).`,
  sol: 'Add the powers, convert to focal length, then use the lens formula.',
  scheme: [['(a) P = +2 D, f = 50 cm', 1], ['(b) v = +150 cm', 1], ['(c) Real', 1]],
  d: 4, c: 'analysis', t: [5],
}), () => { const f = 100 / (5 - 3); return (near(f, 50) && near(lensImage(-75, f).v, 150)) || 'contact'; });
add('lens-long', long({
  wl: null,
  stem: 'A 4 cm tall object is placed 30 cm in front of a convex lens of focal length 20 cm.\n\n(a) Find the position and height of the image, and state its nature.\n\n(b) Draw a ray diagram for this case.\n\n(c) Find the power of the lens.\n\n(d) If the object is moved to 10 cm from the lens, find the new image distance and describe the image.',
  model: r`(a) $u = -30$ cm, $f = +20$ cm. $\dfrac{1}{v} = \dfrac{1}{20} - \dfrac{1}{30} = \dfrac{1}{60}$, so $v = +60$ cm. $m = \dfrac{v}{u} = \dfrac{60}{-30} = -2$, $h' = -8$ cm. **Real, inverted, enlarged**, 60 cm on the other side.

(b) A ray parallel to the axis refracts through F₂; a ray through O goes straight on; they meet beyond 2F₂.

(c) $P = \dfrac{1}{0.20} = +5$ D.

(d) $u = -10$ cm: $\dfrac{1}{v} = \dfrac{1}{20} - \dfrac{1}{10} = -\dfrac{1}{20}$, so $v = -20$ cm; $m = \dfrac{-20}{-10} = +2$: **virtual, erect, enlarged**, on the same side as the object.`,
  sol: 'Step 1 — Lens formula and magnification. Step 2 — Ray diagram. Step 3 — P = 1/f in metres. Step 4 — Repeat with u = −10 cm.',
  scheme: [['(a) v = +60 cm, h′ = −8 cm, nature', 1.5], ['(b) Ray diagram', 1], ['(c) +5 D', 1], ['(d) v = −20 cm, virtual erect enlarged', 1.5]],
  d: 4, c: 'application', t: [4, 5],
}), () => { const a = lensImage(-30, 20); const b = lensImage(-10, 20); return (near(a.v, 60) && near(a.m * 4, -8) && near(1 / 0.2, 5) && near(b.v, -20) && near(b.m, 2)) || 'lens long'; });

// ---------------------------------------------------------------- case-based
add('torch-case', mk.case({
  passage: 'A small company in Rajkot makes torches. The concave reflector behind the bulb has a focal length of 4 cm. Engineers moved the bulb along the principal axis and observed the beam on a wall 10 m away.\n\n| Bulb distance from reflector (cm) | Beam on the wall |\n|---|---|\n| 2 | Wide, spreading, dim |\n| 4 | Narrow, bright circle, about the size of the reflector |\n| 6 | Light first converges, then spreads; blurry patch |',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'At which bulb position does the reflector give a parallel beam?',
      right: '4 cm, at the principal focus',
      wrong: ['2 cm, between the pole and the focus', '6 cm, between the focus and the centre of curvature', 'At all three positions'],
      sol: 'A source at F gives reflected rays parallel to the axis — option (@K).',
      d: 2, c: 'application', t: [1, 2],
    })),
    part('b', num({
      stem: 'What is the radius of curvature of the reflector, in centimetres?',
      value: 8, tol: 0, unit: 'cm',
      sol: r`$R = 2f = 2 \times 4 = 8$ cm.`,
      scheme: [['R = 8 cm', 1]],
      d: 1, c: 'application', t: [1],
    })),
    part('c', short({
      marks: 2,
      stem: 'Explain, using the rules for reflection at a concave mirror, why the bulb at 4 cm gives a narrow bright beam, while at 2 cm the beam spreads out.',
      model: 'At 4 cm the bulb is **at F**. Rays from F reflect **parallel** to the axis, so the beam stays narrow and bright. At 2 cm the bulb is **inside F**: the reflected rays **diverge** (as if from a virtual image behind the reflector), so the beam spreads and becomes dim.',
      sol: 'Apply the ray rules to a source at F and a source inside F.',
      scheme: [['Bulb at F gives parallel reflected rays', 1], ['Inside F the reflected rays diverge', 1]],
      d: 3, c: 'analysis', t: [1],
    }), [
      short({
        marks: 2,
        stem: 'A salesperson suggests replacing the concave reflector with a convex one "to spread the light more evenly". Evaluate this suggestion for a torch meant to light up a path far ahead.',
        model: 'The suggestion is **poor** for this purpose. A convex reflector always makes reflected rays **diverge**, so the light would spread widely and become dim far away. A concave reflector with the bulb at F gives a **parallel beam** that stays bright over a long distance, which is what a torch for a distant path needs.',
        sol: 'Compare the beam from each reflector with the need to light a distant path.',
        scheme: [['Convex reflector spreads light (diverges)', 1], ['Concave with bulb at F is better for a far beam', 1]],
        d: 3, c: 'evaluation', t: [1, 2],
      }),
    ]),
  ],
}), (q) => (near(2 * 4, q.children[1].answer.value) && !Number.isFinite(mirrorImage(-4, -4).v) && mirrorImage(-2, -4).v > 0 && mirrorImage(-6, -4).v < 0) || 'torch');
add('mirror-lab-case', mk.case({
  passage: 'In a school laboratory, Farhan placed a lit candle at different distances in front of a concave mirror and moved a screen until a sharp image appeared. He recorded his results using the sign convention.\n\n| Trial | Object distance u (cm) | Image distance v (cm) |\n|---|---|---|\n| 1 | −30 | −60 |\n| 2 | −40 | −40 |\n| 3 | −60 | −30 |\n\nIn a fourth trial, with the candle 15 cm from the mirror, he could not get any image on the screen.',
  d: 4, c: 'analysis',
  children: [
    part('a', mcq({
      stem: 'What is the focal length of the mirror?',
      right: '−20 cm',
      wrong: ['−40 cm', '−10 cm', '+20 cm'],
      sol: r`From trial 2: $\dfrac{1}{v} + \dfrac{1}{u} = -\dfrac{1}{40} - \dfrac{1}{40} = -\dfrac{1}{20}$, so $f = -20$ cm — option (@K). (Trials 1 and 3 give the same.)`,
      d: 3, c: 'analysis', t: [2],
    })),
    part('b', num({
      stem: 'Find the magnification in trial 1.',
      value: -2, tol: 0, unit: null,
      sol: r`$m = -\dfrac{v}{u} = -\dfrac{-60}{-30} = -2$.`,
      scheme: [['m = −2', 1]],
      d: 2, c: 'application', t: [2],
    })),
    part('c', short({
      marks: 2,
      stem: 'Explain why the image in trial 2 was the same size as the candle.',
      model: r`In trial 2, u = v = −40 cm = 2f, so the candle was **at C** (R = 40 cm). An object at C forms its image at C, and $m = -\dfrac{v}{u} = -1$: **real, inverted and the same size**.`,
      sol: 'Relate u = −40 cm to C (R = 2f) and compute m.',
      scheme: [['Candle at C because R = 2f = 40 cm', 1], ['m = −1, so the same size', 1]],
      d: 3, c: 'analysis', t: [1, 2],
    }), [
      short({
        marks: 2,
        stem: 'Use the mirror formula to explain why no image appeared on the screen in the fourth trial.',
        model: r`With $u = -15$ cm and $f = -20$ cm: $\dfrac{1}{v} = -\dfrac{1}{20} + \dfrac{1}{15} = \dfrac{1}{60}$, so $v = +60$ cm. The positive v means the image is **behind the mirror**, i.e. **virtual** (erect, enlarged, $m = +4$), so it cannot be caught on a screen.`,
        sol: 'Find v and interpret its sign.',
        scheme: [['v = +60 cm', 1], ['Positive v means virtual, so no image on the screen', 1]],
        d: 4, c: 'analysis', t: [1, 2],
      }),
    ]),
  ],
}), (q) => {
  const f = -20;
  const ok = [[-30, -60], [-40, -40], [-60, -30]].every(([u, v]) => near(mirrorImage(u, f).v, v));
  const t4 = mirrorImage(-15, f);
  return (ok && near(q.children[1].answer.value, mirrorImage(-30, f).m) && near(t4.v, 60) && near(t4.m, 4)) || 'lab';
});
add('hillroad-case', mk.case({
  passage: 'On sharp bends of hill roads in Himachal Pradesh, large convex mirrors are fixed on poles so that drivers can see vehicles coming round the bend. One such mirror has a focal length of 1.5 m. A car is 12 m in front of the mirror. Many vehicle side mirrors carry the warning: "Objects in mirror are closer than they appear".',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'The image of the car in the mirror is:',
      right: 'virtual, erect and diminished',
      wrong: ['real, inverted and diminished', 'virtual, erect and enlarged', 'real, erect and the same size'],
      sol: 'A convex mirror always gives a virtual, erect, diminished image — option (@K).',
      d: 1, c: 'understanding', t: [1],
    })),
    part('b', num({
      stem: 'Find the magnification of the image of the car, correct to two decimal places.',
      value: 0.11, tol: 0.01, unit: null,
      sol: r`$u = -12$ m, $f = +1.5$ m: $\dfrac{1}{v} = \dfrac{1}{1.5} + \dfrac{1}{12} = \dfrac{3}{4}$, so $v \approx +1.33$ m. $m = -\dfrac{v}{u} \approx -\dfrac{1.33}{-12} \approx 0.11$.`,
      scheme: [['m ≈ 0.11', 1]],
      d: 3, c: 'application', t: [2],
    })),
    part('c', short({
      marks: 2,
      stem: 'Why is a convex mirror, and not a concave or plane mirror, used at the bend?',
      model: 'A convex mirror always gives an **erect** image, so drivers are not confused, and a **diminished** image, so a **wide field of view** (the whole bend and the road beyond) fits into one mirror. A plane mirror shows a much smaller area, and a concave mirror would give inverted images of distant vehicles.',
      sol: 'Compare the images given by the three mirrors for distant vehicles.',
      scheme: [['Erect image and wide field of view', 1], ['Why plane or concave mirrors are unsuitable', 1]],
      d: 3, c: 'application', t: [1, 2],
    }), [
      short({
        marks: 2,
        stem: 'Explain the warning "Objects in mirror are closer than they appear", using your answer to part (b).',
        model: 'The convex mirror forms a **diminished** image (about 0.11 times the size of the car here). A smaller-looking car seems **farther away** to the driver, who judges distance by size. So the vehicle is actually **closer** than it appears, and the warning reminds drivers to take care.',
        sol: 'Link the small magnification to the brain judging distance by apparent size.',
        scheme: [['Image is diminished (uses m ≈ 0.11)', 1], ['Smaller image seems farther, so the object is closer than it appears', 1]],
        d: 4, c: 'evaluation', t: [1, 2],
      }),
    ]),
  ],
}), (q) => near(mirrorImage(-12, 1.5).m, q.children[1].answer.value, 0.005) || 'hill');
add('snell-case', mk.case({
  passage: 'Students traced rays through a rectangular glass block using pins. For three angles of incidence they measured the angle of refraction inside the glass and looked up the sines.\n\n| Angle of incidence i | sin i | Angle of refraction r | sin r |\n|---|---|---|---|\n| 30° | 0.500 | 19.5° | 0.334 |\n| 45° | 0.707 | 28.1° | 0.471 |\n| 60° | 0.866 | 35.3° | 0.578 |\n\nThey noticed that each emergent ray left the far face parallel to its incident ray.',
  d: 4, c: 'analysis',
  children: [
    part('a', mcq({
      stem: 'What do the angles in the table show about the ray entering the glass?',
      right: 'It bends towards the normal, because r is less than i.',
      wrong: ['It bends away from the normal, because r is less than i.', 'It does not bend, because the glass is transparent.', 'It bends towards the normal, because r is greater than i.'],
      sol: 'In every trial r < i, so the ray bends towards the normal on entering the optically denser glass — option (@K).',
      d: 2, c: 'understanding', t: [3],
    })),
    part('b', num({
      stem: 'Using the 45° trial, find the refractive index of the glass, correct to one decimal place.',
      value: 1.5, tol: 0.05, unit: null,
      sol: r`$n = \dfrac{\sin i}{\sin r} = \dfrac{0.707}{0.471} \approx 1.5$.`,
      scheme: [['n ≈ 1.5', 1]],
      d: 2, c: 'application', t: [3],
    })),
    part('c', short({
      marks: 2,
      stem: 'Show how the data support Snell’s law.',
      model: 'The ratio sin i / sin r is about the **same** in every trial: 0.500 ÷ 0.334 ≈ 1.50; 0.707 ÷ 0.471 ≈ 1.50; 0.866 ÷ 0.578 ≈ 1.50. Snell’s law says this ratio is **constant** for a given pair of media, and it is, even though i changes from 30° to 60°.',
      sol: 'Compute the ratio for each trial and compare.',
      scheme: [['Three ratios calculated, each about 1.5', 1], ['Constant ratio confirms Snell’s law', 1]],
      d: 4, c: 'analysis', t: [3],
      wl: null,
    }), [
      short({
        marks: 2,
        stem: 'Using your answer to part (b), find the speed of light in the glass, and explain why the emergent rays were parallel to the incident rays.',
        model: r`$v = \dfrac{c}{n} = \dfrac{3 \times 10^8}{1.5} = 2 \times 10^8$ m/s. The two faces of the block are **parallel**, so the bending away from the normal at the second face exactly reverses the bending towards it at the first face; the angle of emergence equals the angle of incidence.`,
        sol: 'Use v = c/n, then explain with the parallel faces.',
        scheme: [['v = 2 × 10⁸ m/s', 1], ['Parallel faces reverse the bending, so e = i', 1]],
        d: 3, c: 'application', t: [3],
        wl: null,
      }),
    ]),
  ],
}), (q) => {
  const rows = [[30, 19.5], [45, 28.1], [60, 35.3]];
  const okSines = rows.every(([i, rr]) => near(Math.round(Math.sin(deg(i)) * 1000) / 1000, [0.5, 0.707, 0.866][rows.findIndex((x) => x[0] === i)]) && near(Math.round(Math.sin(deg(rr)) * 1000) / 1000, [0.334, 0.471, 0.578][rows.findIndex((x) => x[1] === rr)]));
  const ratios = [[0.5, 0.334], [0.707, 0.471], [0.866, 0.578]].map(([a, b]) => a / b);
  return (okSines && ratios.every((x) => near(x, 1.5, 0.01)) && near(Math.round((0.707 / 0.471) * 10) / 10, q.children[1].answer.value)) || 'snell data';
});
add('loupe-case', mk.case({
  passage: 'A watch repairer in Chandni Chowk uses a small convex lens, a loupe, with a focal length of 5 cm. To inspect a tiny gear, he holds the lens so that the gear is 4 cm from it and looks through the lens with his eye close to it. His apprentice once held the lens 7 cm from the gear and complained that the gear looked blurred and upside down.',
  d: 4, c: 'analysis',
  children: [
    part('a', mcq({
      stem: 'With the gear 4 cm from the lens, the image he sees is:',
      right: 'virtual, erect and enlarged',
      wrong: ['real, inverted and enlarged', 'virtual, erect and diminished', 'real, inverted and diminished'],
      sol: 'The gear is inside F (5 cm), so the convex lens acts as a magnifier: virtual, erect, enlarged — option (@K).',
      d: 2, c: 'application', t: [4],
    })),
    part('b', num({
      stem: 'What is the power of the loupe, in dioptres?',
      value: 20, tol: 0, unit: 'D',
      sol: r`$P = \dfrac{1}{0.05} = +20$ D.`,
      scheme: [['+20 D', 1]],
      d: 2, c: 'application', t: [5],
    })),
    part('c', short({
      marks: 2,
      stem: 'Calculate the magnification produced when the gear is 4 cm from the lens.',
      model: r`$u = -4$ cm, $f = +5$ cm: $\dfrac{1}{v} = \dfrac{1}{5} - \dfrac{1}{4} = -\dfrac{1}{20}$, so $v = -20$ cm. $m = \dfrac{v}{u} = \dfrac{-20}{-4} = +5$: the gear appears five times larger and upright.`,
      sol: 'Lens formula, then m = v/u.',
      scheme: [['v = −20 cm', 1], ['m = +5', 1]],
      d: 3, c: 'application', t: [5],
      wl: null,
    }), [
      short({
        marks: 2,
        stem: 'Use the lens formula to explain the apprentice’s complaint when the gear was 7 cm from the lens.',
        model: r`$u = -7$ cm: $\dfrac{1}{v} = \dfrac{1}{5} - \dfrac{1}{7} = \dfrac{2}{35}$, so $v = +17.5$ cm and $m = \dfrac{17.5}{-7} = -2.5$. The gear was **beyond F**, so the lens formed a **real, inverted** image on the far side; viewed with the eye close to the lens, this does not give a clear upright magnified view — hence blurred and upside down.`,
        sol: 'Find v and m for u = −7 cm and interpret their signs.',
        scheme: [['v = +17.5 cm, m = −2.5', 1], ['Object beyond F gives a real, inverted image, not a magnified upright view', 1]],
        d: 4, c: 'analysis', t: [4, 5],
        wl: null,
      }),
    ]),
  ],
}), (q) => {
  const a = lensImage(-4, 5); const b = lensImage(-7, 5);
  return (near(1 / 0.05, q.children[1].answer.value) && near(a.v, -20) && near(a.m, 5) && near(b.v, 17.5) && near(b.m, -2.5)) || 'loupe';
});
add('camera-case', mk.case({
  passage: 'A simple camera uses a convex lens of focal length 10 cm. To get a sharp picture, the distance between the lens and the sensor must equal the image distance. A student calculated these distances for three objects.\n\n| Object distance (cm) | 100 | 50 | 20 |\n|---|---|---|---|\n| Image distance (cm) | 11.1 | 12.5 | 20.0 |',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'What happens to the image as the object is brought closer to the lens?',
      right: 'The image moves farther from the lens and becomes larger.',
      wrong: ['The image moves closer to the lens and becomes smaller.', 'The image stays at the focus.', 'The image becomes virtual.'],
      sol: 'The image distance rises from 11.1 cm to 20.0 cm, and the magnification (v/u) grows — option (@K).',
      d: 2, c: 'analysis', t: [4],
    })),
    part('b', num({
      stem: 'Check the middle column: find the image distance, in centimetres, for an object 50 cm from the lens.',
      value: 12.5, tol: 0.05, unit: 'cm',
      sol: r`$u = -50$ cm, $f = +10$ cm: $\dfrac{1}{v} = \dfrac{1}{10} - \dfrac{1}{50} = \dfrac{4}{50}$, so $v = 12.5$ cm.`,
      scheme: [['v = 12.5 cm', 1]],
      d: 3, c: 'application', t: [5],
    })),
    part('c', short({
      marks: 2,
      stem: 'Explain why a camera must move its lens (focus) when the photographer switches from a distant building to a nearby flower.',
      model: 'For a distant object the image forms close to F (about 10–11 cm behind the lens). For a nearby object it forms **farther** away (up to 20 cm in the table). Since the sensor must be exactly at the image distance for a sharp picture, the lens must be **moved away from the sensor** to focus on the nearby flower.',
      sol: 'Use the table to show that v changes with u.',
      scheme: [['Image distance increases for nearer objects (from the data)', 1], ['Lens-to-sensor distance must change to stay sharp', 1]],
      d: 3, c: 'application', t: [4, 5],
    }), [
      short({
        marks: 2,
        stem: 'The student claims that the photograph of an object 20 cm away would be the same size as the object. Evaluate this claim.',
        model: r`The claim is **correct**. 20 cm is $2f$, so the object is at $2F_1$; then $v = +20$ cm and $m = \dfrac{v}{u} = \dfrac{20}{-20} = -1$: the image is real, inverted and the **same size**.`,
        sol: 'Check m for u = −20 cm.',
        scheme: [['Object at 2F₁, v = 20 cm', 1], ['m = −1, so same size: claim correct', 1]],
        d: 3, c: 'evaluation', t: [4, 5],
        wl: null,
      }),
    ]),
  ],
}), (q) => {
  const vs = [-100, -50, -20].map((u) => Math.round(lensImage(u, 10).v * 10) / 10);
  return (near(vs[0], 11.1) && near(vs[1], 12.5) && near(vs[2], 20) && near(q.children[1].answer.value, 12.5) && near(lensImage(-20, 10).m, -1)) || 'camera';
});
