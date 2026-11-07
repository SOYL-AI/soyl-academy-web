// ICSE 10 Physics ch05 Refraction through Lenses — question bank (ICSE 2027 specimen style).
// Every numerical value is computed here with the lens formula 1/v - 1/u = 1/f (New Cartesian convention) and asserted by a
// re-solve check. No item asks for a derivation of the lens formula, a scale drawing or the magnifying-power formula
// (removed topics). MCQ keys are placed by the builder.
import { mk, add, r, near } from './lib.mjs';

const { mcq, ar, tf, fill, match, num, short, long } = mk;
const f3 = (x, n = 3) => String(Number(x.toPrecision(n)));
const img = (u, f) => 1 / (1 / f + 1 / u);

// ---------------------------------------------------------------- t01 lenses and their terms
add('converge-mcq', mcq({
  stem: 'Sunil wants to focus the parallel rays of sunlight to a bright spot on a dry leaf. He should use a lens that is:',
  right: 'thicker at its centre than at its edges',
  wrong: ['thinner at its centre than at its edges', 'flat on both faces', 'curved inwards on one face and flat on the other'],
  sol: 'A lens thicker at the middle is convex, a converging lens — option (@K).',
  d: 1, c: 'application', t: [1],
}));
add('prisms-mcq', mcq({
  stem: 'When a concave lens is pictured as a set of small prisms, the prisms:',
  right: 'have their apexes towards the principal axis, so rays bend away from the axis',
  wrong: ['have their bases towards the principal axis, so rays bend towards the axis', 'are all identical, so rays are not bent', 'have their bases towards the axis, so rays bend away from it'],
  sol: 'A prism bends light towards its base; in a concave lens the bases point outwards, so light diverges — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('optical-mcq', mcq({
  stem: 'Through which point of a thin lens does a ray of light pass without any deviation?',
  right: 'The optical centre',
  wrong: ['The principal focus', 'The centre of curvature of one surface', 'Any point on the rim'],
  sol: 'Near the optical centre the faces are parallel, like a thin slab — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('focal-tf', tf({
  stem: 'A thin lens in air has two principal foci, one on each side, at equal distances from its optical centre.',
  key: 't',
  sol: 'True: F₁ and F₂ lie at the same distance f on either side.',
  d: 1, c: 'recall', t: [1],
}));
add('focus-fill', fill({
  stem: 'The plane passing through the principal focus of a lens, normal to the principal axis, is called the ___ plane.',
  acc: [['focal']],
  sol: '**Focal** plane.',
  d: 1, c: 'recall', t: [1],
}));
add('conv-ar', ar({
  a: 'A convex lens is called a converging lens.',
  r: 'It behaves like a set of prisms with their bases towards the principal axis, so it bends rays towards the axis.',
  key: 'c',
  sol: 'Both are true, and R explains A — option (c).',
  d: 2, c: 'understanding', t: [1],
}));
add('burn-short2', short({
  marks: 2,
  stem: 'On a sunny day, a convex lens can be used to burn a hole in a sheet of paper, but a concave lens cannot. Explain why.',
  model: 'Sunlight arrives as a parallel beam. The convex lens converges this beam to its principal focus, concentrating the energy at one small spot that becomes hot enough to burn the paper. A concave lens spreads the beam out, so the light is never concentrated.',
  sol: 'Converges to focus vs diverges.',
  scheme: [['Convex lens converges the parallel beam at its focus', 1], ['Concave lens diverges it', 1]],
  d: 2, c: 'application', t: [1],
}));
add('identify-short2', short({
  marks: 2,
  stem: 'Priya is given two lenses that look alike from a distance. Without touching their surfaces, how can she find out which one is convex? Give a reason.',
  model: 'She can hold each lens close to printed text and look through it. The lens that makes the letters look larger and upright is convex (the print lies within its focus, giving a virtual magnified image); the one that makes them look smaller is concave.',
  sol: 'Look at print; convex magnifies.',
  scheme: [['Test', 1], ['Reason', 1]],
  d: 3, c: 'application', t: [1, 2, 3],
}));

// ---------------------------------------------------------------- t02 images by a convex lens
const vP = img(-18, 12);
add('f2f-mcq', mcq({
  stem: 'In a slide projector, the slide is 18 cm from a convex lens of focal length 12 cm. The image on the screen is:',
  right: `real, inverted and magnified, ${f3(vP)} cm from the lens`,
  wrong: [`virtual, erect and magnified, ${f3(vP)} cm from the lens`, 'real, inverted and diminished, 20 cm from the lens', 'real, inverted and the same size, 24 cm from the lens'],
  sol: `The slide is between F and 2F, so the image is beyond 2F: $\\dfrac{1}{v} = \\dfrac{1}{12} - \\dfrac{1}{18} = \\dfrac{1}{36}$, $v = ${f3(vP)}$ cm, real, inverted, magnified — option (@K).`,
  d: 3, c: 'application', t: [2, 4],
}), () => near(vP, 36, 1e-9) || 'v');
add('parallel-mcq', mcq({
  stem: 'A narrow beam from a laser torch, parallel to the principal axis, falls on a concave lens. After passing through the lens, the rays:',
  right: 'spread out as if they were coming from the principal focus on the side of the incident light',
  wrong: ['meet at the principal focus on the far side of the lens', 'stay parallel to the principal axis', 'all pass through the optical centre'],
  sol: 'A concave lens diverges a parallel beam so that it appears to come from F₁ — option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
add('size-ar', ar({
  a: 'The image formed by a convex lens of an object placed at 2F₁ is the same size as the object.',
  r: 'Every image formed by a convex lens is real.',
  key: 'a',
  sol: 'A is true; R is false — a convex lens gives a virtual image when the object is within F — option (a).',
  d: 2, c: 'analysis', t: [2],
}));
add('pwr-ar', ar({
  a: 'A lens of power +4 D has a focal length of 25 cm.',
  r: 'A convex lens is thicker at the middle than at its edges.',
  key: 'd',
  sol: 'Both are true ($f = \\dfrac{1}{4} = 0.25$ m), but R does not explain A, which follows from $P = \\dfrac{1}{f}$ — option (d).',
  d: 2, c: 'analysis', t: [1, 5],
}));
add('mag-tf', tf({
  stem: 'The magnification produced by a concave lens for a real object is always positive and less than 1.',
  key: 't',
  sol: 'True: the image is always erect (m positive) and diminished (m less than 1).',
  d: 2, c: 'understanding', t: [3, 4],
}));
add('beyond-mcq', mcq({
  stem: 'A phone camera lens of focal length 5 mm photographs a friend standing 3 m away. The image on the sensor is:',
  right: 'just beyond the focus, real, inverted and highly diminished',
  wrong: ['at twice the focal length, real, inverted and the same size', 'on the same side as the friend, virtual and erect', 'at infinity, real and magnified'],
  sol: 'The friend is far beyond 2F, so the image is real, inverted, diminished and lies just beyond F — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('at2f-mcq', mcq({
  stem: 'A candle placed 30 cm in front of a convex lens gives a sharp image of exactly the same size on a screen. The focal length of the lens is:',
  right: '15 cm',
  wrong: ['30 cm', '60 cm', '10 cm'],
  sol: 'Same-size image means object at 2F: $2f = 30$ cm, so $f = 15$ cm — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('searchlight-mcq', mcq({
  stem: 'To obtain a parallel beam of light from a small bulb using a convex lens, the bulb should be placed:',
  right: 'at the principal focus of the lens',
  wrong: ['at twice the focal length from the lens', 'between the focus and the lens', 'very far from the lens'],
  sol: 'Rays from a point at F emerge parallel — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('move-mcq', mcq({
  stem: 'An object is moved slowly from 2F₁ towards F₁ of a convex lens. The real image:',
  right: 'moves away from the lens and becomes larger',
  wrong: ['moves towards the lens and becomes smaller', 'stays at 2F₂ but becomes larger', 'becomes virtual and erect'],
  sol: 'The image moves from 2F₂ towards infinity and grows — option (@K).',
  d: 3, c: 'analysis', t: [2],
}));
add('screen-tf', tf({
  stem: 'Whenever a convex lens forms an image that can be caught on a screen, the image is inverted.',
  key: 't',
  sol: 'True: every real image of a real object formed by a single lens is inverted.',
  d: 2, c: 'understanding', t: [2],
}));
add('conv-fill', fill({
  stem: 'When an object is placed at the principal focus of a convex lens, its image is formed at ___.',
  acc: [['infinity']],
  sol: '**Infinity**.',
  d: 1, c: 'recall', t: [2],
}));
add('ray3-ar', ar({
  a: 'A ray of light passing through the first principal focus of a convex lens emerges parallel to the principal axis.',
  r: 'A ray parallel to the axis passes through the principal focus, and the path of light is reversible.',
  key: 'c',
  sol: 'Both are true, and R explains A — option (c).',
  d: 3, c: 'analysis', t: [2],
}));
add('copy-short1', short({
  marks: 1,
  stem: 'Where must a document be placed in front of the convex lens of a copying camera to obtain a copy of the same size?',
  model: 'At twice the focal length (2F₁) from the lens.',
  sol: 'At 2F₁.',
  scheme: [['At 2F₁', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('diag-short2', short({
  marks: 2,
  stem: 'Describe, as you would draw it, how two principal rays locate the image of an object placed beyond 2F₁ of a convex lens. State the nature of the image.',
  model: 'From the top of the object, draw a ray parallel to the axis that passes through F₂ after refraction, and a ray through the optical centre that goes straight on. They cross between F₂ and 2F₂ below the axis; the image is real, inverted and diminished.',
  sol: 'Two rays; image between F₂ and 2F₂.',
  scheme: [['Two correct rays', 1], ['Position and nature', 1]],
  d: 2, c: 'understanding', t: [2],
}));
const cs = [30, 16, 5].map((d) => img(-d, 8));
add('table-short3', short({
  marks: 3,
  stem: 'A convex lens has a focal length of 8 cm. State the position and nature of the image when an object is placed at (a) 30 cm, (b) 16 cm and (c) 5 cm from the lens.',
  model: '(a) Beyond 2F₁ (2F = 16 cm): image between F₂ and 2F₂, real, inverted, diminished. (b) At 2F₁: image at 2F₂, 16 cm behind the lens, real, inverted, same size. (c) Within F: image on the same side as the object, virtual, erect, magnified.',
  sol: 'Diminished real; same size at 2F; virtual magnified.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 2, c: 'application', t: [2],
}), () => (cs[0] > 8 && cs[0] < 16 && near(cs[1], 16, 1e-9) && cs[2] < 0) || 'positions');

// ---------------------------------------------------------------- t03 images by a concave lens
const vC1 = img(-60, -15);
add('concave-mcq', mcq({
  stem: 'A lamp is 60 cm in front of a concave lens of focal length 15 cm. Its image is:',
  right: `virtual, erect and diminished, ${f3(vC1)} cm from the lens on the lamp’s side`,
  wrong: [`real, inverted and diminished, ${f3(vC1)} cm behind the lens`, 'virtual, erect and magnified, 20 cm from the lens', 'real, inverted and the same size, 60 cm behind the lens'],
  sol: `$\\dfrac{1}{v} = -\\dfrac{1}{15} - \\dfrac{1}{60} = -\\dfrac{5}{60}$, so $v = ${f3(vC1)}$ cm: virtual, erect, diminished — option (@K).`,
  d: 2, c: 'application', t: [3, 4],
}), () => near(vC1, -12, 1e-9) || 'v');
add('concave2-mcq', mcq({
  stem: 'Rahul moves a candle from far away steadily towards a concave lens. Its image:',
  right: 'moves from near F₁ towards the lens and grows, but stays smaller than the candle',
  wrong: ['becomes real when the candle passes F₁', 'becomes larger than the candle once the candle is within F₁', 'stays at F₁ and does not change size'],
  sol: 'A concave lens always gives a virtual, erect, diminished image between F₁ and O; it approaches O and grows towards object size — option (@K).',
  d: 3, c: 'analysis', t: [3],
}));
add('concave-tf', tf({
  stem: 'Bringing a lit candle very close to a diverging lens makes the lens produce an image of the flame that can be caught on a screen.',
  key: 'f',
  sol: 'False: the refracted rays always diverge, so the image of a real object is always virtual.',
  d: 1, c: 'understanding', t: [3],
}));
add('centre-fill', fill({
  stem: 'The image formed by a concave lens always lies between its principal focus and its ___ centre.',
  acc: [['optical']],
  sol: '**Optical** centre.',
  d: 1, c: 'recall', t: [3],
}));
add('tree-ar', ar({
  a: 'A distant tree seen through a concave lens looks upright and smaller.',
  r: 'A concave lens makes rays diverge so that they appear to come from a point between F₁ and the lens.',
  key: 'c',
  sol: 'Both are true, and R explains A — option (c).',
  d: 2, c: 'understanding', t: [3],
}));
add('concave-short2', short({
  marks: 2,
  stem: 'Rohit claims that if he moves a pencil close enough to a diverging lens, he can catch its image on a screen. Explain why he is wrong, and state where the image always lies.',
  model: 'A concave lens bends every ray away from the principal axis, so the refracted rays from a point of the object always spread apart and never actually meet. They only appear to meet when produced backwards, on the object side, between the principal focus F₁ and the optical centre.',
  sol: 'Diverging rays; between F₁ and O.',
  scheme: [['Rays diverge, never meet', 1], ['Image between F₁ and O', 1]],
  d: 2, c: 'understanding', t: [3],
}));

// ---------------------------------------------------------------- t04 sign convention, lens formula, magnification
add('sign-mcq', mcq({
  stem: 'Light falls on a diverging lens from the left. Using the New Cartesian convention, its focal length is taken as:',
  right: 'negative, because its principal focus lies on the side of the incident light',
  wrong: ['positive, because focal length is a distance', 'negative, because its image is always inverted', 'zero, because it has no real focus'],
  sol: 'F of a concave lens is on the incident side, against the light, so f < 0 — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
const vM = img(-24, 8);
add('lensf-mcq', mcq({
  stem: 'A toy car stands 24 cm from a convex lens whose focal length is 8 cm. Where does its image form? (v, with sign)',
  right: `+${f3(vM)} cm`,
  wrong: ['+6 cm', `−${f3(vM)} cm`, '+16 cm'],
  sol: `$\\dfrac{1}{v} = \\dfrac{1}{8} + \\dfrac{1}{-24} = \\dfrac{3 - 1}{24} = \\dfrac{1}{12}$, so $v = +${f3(vM)}$ cm — option (@K).`,
  d: 2, c: 'application', t: [4],
}), () => near(vM, 12, 1e-9) || 'v');
const mMag = 45 / -15;
add('mag-mcq', mcq({
  stem: 'A lens forms an image at v = +45 cm of an object at u = −15 cm. The magnification and the nature of the image are:',
  right: 'm = −3; real, inverted, three times as tall',
  wrong: ['m = +3; virtual, erect, three times as tall', 'm = −0.33; real, inverted, diminished', 'm = +0.33; virtual, erect, diminished'],
  sol: `$m = \\dfrac{v}{u} = \\dfrac{45}{-15} = ${mMag}$ — option (@K).`,
  d: 2, c: 'application', t: [4],
}), () => mMag === -3 || 'm');
const vCandle = img(-36, 12);
const mCandle = vCandle / -36;
add('candle-num', num({
  stem: 'A 6.0 cm tall candle stands 36 cm in front of a convex lens of focal length 12 cm. Find the image distance v in cm (with sign).',
  value: vCandle, tol: 0.01, unit: 'cm',
  sol: r`$\dfrac{1}{v} = \dfrac{1}{f} + \dfrac{1}{u} = \dfrac{1}{12} - \dfrac{1}{36} = \dfrac{2}{36}$, so $v = \dfrac{36}{2} = 18$ cm (real image).`,
  scheme: [['+18 cm', 1]],
  d: 2, c: 'application', t: [4],
}), () => near(vCandle, 18, 1e-9) || 'v');
add('candle-short3', short({
  marks: 3,
  stem: 'For the same 6.0 cm candle 36 cm in front of the convex lens of focal length 12 cm, the image forms 18 cm behind the lens. (a) Calculate the magnification. (b) Find the height of the image. (c) State three characteristics of the image.',
  model: `(a) $m = \\dfrac{v}{u} = \\dfrac{18}{-36} = ${mCandle}$. (b) $h_{2} = m h_{1} = ${mCandle} \\times 6.0 = ${f3(mCandle * 6)}$ cm: 3.0 cm tall, below the axis. (c) Real, inverted and diminished (half the size).`,
  sol: '−0.5; −3.0 cm; real, inverted, diminished.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 2, c: 'application', t: [4],
}), () => (near(mCandle, -0.5, 1e-9) && near(mCandle * 6, -3, 1e-9)) || 'm');
const vCc = img(-24, -12);
add('concave-num', num({
  stem: 'An object is placed 24 cm in front of a concave lens of focal length 12 cm. Find the image distance v in cm (with sign).',
  value: vCc, tol: 0.01, unit: 'cm',
  sol: r`$\dfrac{1}{v} = \dfrac{1}{f} + \dfrac{1}{u} = -\dfrac{1}{12} - \dfrac{1}{24} = -\dfrac{3}{24}$, so $v = -\dfrac{24}{3} = -8$ cm (virtual, on the object side).`,
  scheme: [['−8 cm', 1]],
  d: 2, c: 'application', t: [4],
}), () => near(vCc, -8, 1e-9) || 'v');
const fScreen = 1 / (1 / 60 - 1 / -30);
add('screen-num', num({
  stem: 'A lamp is 30 cm in front of a lens, and a sharp image of it is caught on a screen 60 cm behind the lens. Find the focal length of the lens in cm.',
  value: fScreen, tol: 0.01, unit: 'cm',
  sol: r`$u = -30$ cm, $v = +60$ cm: $\dfrac{1}{f} = \dfrac{1}{60} - \dfrac{1}{-30} = \dfrac{1 + 2}{60} = \dfrac{3}{60}$, so $f = \dfrac{60}{3} = 20$ cm (convex).`,
  scheme: [['+20 cm', 1]],
  d: 3, c: 'application', t: [4],
}), () => near(fScreen, 20, 1e-9) || 'f');
const vMg = img(-10, 15);
const mMg = vMg / -10;
add('stampm-num', num({
  stem: 'A stamp collector holds a convex lens of focal length 15 cm at 10 cm from a stamp. What magnification does the lens produce?',
  value: mMg, tol: 0.01,
  sol: r`$\dfrac{1}{v} = \dfrac{1}{15} - \dfrac{1}{10} = \dfrac{2 - 3}{30} = -\dfrac{1}{30}$, so $v = -30$ cm; $m = \dfrac{v}{u} = \dfrac{-30}{-10} = 3$ (virtual, erect).`,
  scheme: [['m = 3', 1]],
  d: 3, c: 'application', t: [4, 5],
}), () => near(mMg, 3, 1e-9) || 'm');
const uReal = -(4 / 3) * 20;
add('three-num', num({
  stem: 'A convex lens of focal length 20 cm forms a real image three times the size of an object. How far from the lens (in cm) is the object? Give a positive distance.',
  value: Number((-uReal).toFixed(1)), tol: 0.1, unit: 'cm',
  sol: r`Real image: $m = -3$, so $v = -3u$. Then $\dfrac{1}{-3u} - \dfrac{1}{u} = \dfrac{1}{20}$ gives $-\dfrac{4}{3u} = \dfrac{1}{20}$, so $u = -\dfrac{80}{3} = -26.67$ cm; the object is $\dfrac{80}{3} = 26.7$ cm from the lens.`,
  scheme: [['26.7 cm', 1]],
  d: 4, c: 'analysis', t: [4],
}), () => (near(img(uReal, 20) / uReal, -3, 1e-9) && near(-uReal, 26.67, 0.001)) || 'u');
const mC2 = img(-36, -18) / -36;
add('third-num', num({
  stem: 'A concave lens of focal length 18 cm forms an image of a toy placed 36 cm in front of it. Find the magnification, to three significant figures.',
  value: Number(f3(mC2)), tol: 0.005,
  sol: r`$\dfrac{1}{v} = -\dfrac{1}{18} - \dfrac{1}{36} = -\dfrac{3}{36}$, so $v = -12$ cm; $m = \dfrac{v}{u} = \dfrac{-12}{-36} = 0.333$ (virtual, erect, diminished).`,
  scheme: [['0.333', 1]],
  d: 2, c: 'application', t: [3, 4],
}), () => near(mC2, 1 / 3, 1e-9) || 'm');
add('formula-fill', fill({
  stem: 'A real object always sits on the incoming-light side of a lens, so in the New Cartesian convention its distance u carries a ___ sign.',
  acc: [['negative']],
  sol: '**Negative**.',
  d: 1, c: 'recall', t: [4],
}));
add('signs-ar', ar({
  a: 'A lens gives a magnification of −2 for an object; this image can be caught on a screen.',
  r: 'A negative magnification means the image is real and inverted.',
  key: 'c',
  sol: 'Both are true, and R explains A — option (c).',
  d: 3, c: 'analysis', t: [4],
}));
add('vsign-tf', tf({
  stem: 'If the image distance worked out from the lens formula is negative, the image is virtual and lies on the same side as the object.',
  key: 't',
  sol: 'True: negative distances are measured against the incident light, on the object side.',
  d: 2, c: 'understanding', t: [4],
}));
add('lens-short1', short({
  marks: 1,
  stem: 'Write the lens formula used with the New Cartesian sign convention, naming the symbols.',
  model: '1/v − 1/u = 1/f, where v is the image distance, u the object distance and f the focal length, all from the optical centre.',
  sol: '1/v − 1/u = 1/f.',
  scheme: [['Formula with symbols', 1]],
  d: 1, c: 'recall', t: [4],
}));
add('conv-short2', short({
  marks: 2,
  stem: 'List the rules used to give signs to distances and heights for a lens (New Cartesian convention), and say what sign the focal length of each type of lens takes.',
  model: 'Distances are measured from the optical centre; those in the direction of the incident light are positive and those against it negative; heights above the axis are positive and below negative. A convex lens has positive f, a concave lens negative f.',
  sol: 'Rules; f signs.',
  scheme: [['Rules', 1], ['Signs of f', 1]],
  d: 1, c: 'recall', t: [4],
}));

// ---------------------------------------------------------------- t05 power, magnifying glass, uses
const P20 = 1 / -0.2;
add('power-mcq', mcq({
  stem: 'A concave lens has a focal length of 20 cm. Its power is:',
  right: '−5 D',
  wrong: ['+5 D', '−0.05 D', '−20 D'],
  sol: `$P = \\dfrac{1}{f} = \\dfrac{1}{-0.20} = ${P20}$ D — option (@K).`,
  d: 2, c: 'application', t: [5],
}), () => P20 === -5 || 'P');
const P80 = 1 / 0.8;
add('power-num', num({
  stem: 'A convex lens used in a toy telescope has a focal length of 80 cm. Find its power in dioptres.',
  value: P80, tol: 0.01, unit: 'D',
  sol: r`$f = 0.80$ m; $P = \dfrac{1}{0.80} = 1.25$ D.`,
  scheme: [['+1.25 D', 1]],
  d: 1, c: 'application', t: [5],
}), () => near(P80, 1.25, 1e-9) || 'P');
const fP = 100 / -1.25;
add('pfocal-num', num({
  stem: 'An optician’s prescription reads −1.25 D. Find the focal length of the lens in cm (with sign).',
  value: fP, tol: 0.01, unit: 'cm',
  sol: r`$f = \dfrac{1}{P} = \dfrac{1}{-1.25} = -0.8$ m, so $f = -0.8 \times 100 = -80$ cm (concave).`,
  scheme: [['−80 cm', 1]],
  d: 2, c: 'application', t: [5],
}), () => near(fP, -80, 1e-9) || 'f');
const f8 = 100 / 8;
add('p8-num', num({
  stem: 'A lens has a power of +8 D. Find its focal length in cm.',
  value: f8, tol: 0.01, unit: 'cm',
  sol: r`$f = \dfrac{100}{P} = \dfrac{100}{8} = 12.5$ cm (convex).`,
  scheme: [['12.5 cm', 1]],
  d: 1, c: 'application', t: [5],
}), () => near(f8, 12.5, 1e-9) || 'f');
add('magglass-mcq', mcq({
  stem: 'A biology student uses a convex lens as a magnifying glass to look at the hairs on a leaf. The leaf must be placed:',
  right: 'between the lens and its principal focus',
  wrong: ['exactly at the principal focus', 'between F and 2F', 'beyond 2F'],
  sol: 'Only within F does a convex lens give a virtual, erect, magnified image — option (@K).',
  d: 1, c: 'understanding', t: [5],
}));
add('strong-mcq', mcq({
  stem: 'Two convex lenses have focal lengths of 5 cm and 50 cm. The better one to use as a magnifying glass, and its power, is:',
  right: 'the 5 cm lens, with power +20 D',
  wrong: ['the 50 cm lens, with power +2 D', 'the 5 cm lens, with power +0.2 D', 'the 50 cm lens, with power +50 D'],
  sol: 'A shorter focal length gives a larger image; $P = \\dfrac{1}{0.05} = 20$ D — option (@K).',
  d: 3, c: 'evaluation', t: [5],
}), () => near(1 / 0.05, 20, 1e-9) || 'P');
add('dioptre-fill', fill({
  stem: 'A lens of focal length 0.5 m has a power of 2 ___.',
  acc: [['dioptre', 'dioptres', 'diopter', 'diopters', 'D']],
  sol: '**Dioptres** (D).',
  d: 1, c: 'recall', t: [5],
}));
add('power-tf', tf({
  stem: 'A lens of power −3 D is a converging lens.',
  key: 'f',
  sol: 'False: negative power means a diverging (concave) lens.',
  d: 1, c: 'understanding', t: [5],
}));
add('power-ar', ar({
  a: 'A convex lens of focal length 10 cm has a greater power than a convex lens of focal length 25 cm.',
  r: 'The power of a lens is the reciprocal of its focal length in metres.',
  key: 'c',
  sol: 'Both are true (+10 D against +4 D), and R explains A — option (c).',
  d: 2, c: 'application', t: [5],
}));
add('glass-ar', ar({
  a: 'A magnifying glass forms a real image of a small insect.',
  r: 'The insect is held between the lens and its principal focus.',
  key: 'b',
  sol: 'A is false — the image is virtual and erect; R is true — option (b).',
  d: 2, c: 'understanding', t: [5],
}));
add('magglass-short2', short({
  marks: 2,
  stem: 'A watch repairer wears an eyeglass that is a convex lens of short focal length. (a) Where does he hold the tiny gear relative to the lens? (b) State the nature of the image he sees.',
  model: '(a) Closer to the lens than its principal focus (between the optical centre and F). (b) Virtual, erect and magnified, on the same side of the lens as the gear.',
  sol: 'Within F; virtual, erect, magnified.',
  scheme: [['(a)', 1], ['(b)', 1]],
  d: 2, c: 'application', t: [5],
}));
add('use-short1', short({
  marks: 1,
  stem: 'Name the kind of lens used in the spectacles of a student who cannot see the blackboard clearly from the back of the class.',
  model: 'A concave (diverging) lens.',
  sol: 'Concave.',
  scheme: [['Concave lens', 1]],
  d: 1, c: 'recall', t: [5],
}));
add('uses-match', match({
  marks: 2,
  stem: 'Match each device in Column A with the lens and object position it uses in Column B.',
  pairs: [
    ['Slide projector', 'Convex lens, object between F and 2F'],
    ['Magnifying glass', 'Convex lens, object within F'],
    ['Camera', 'Convex lens, object beyond 2F'],
    ['Door peephole', 'Concave lens, any object position'],
  ],
  order: [3, 0, 2, 1],
  sol: 'Projector → between F and 2F; magnifying glass → within F; camera → beyond 2F; peephole → concave lens.',
  d: 2, c: 'application', t: [2, 3, 5],
}));
add('term-match', match({
  marks: 2,
  stem: 'Match each quantity in Column A with its correct sign or unit in Column B.',
  pairs: [
    ['Focal length of a concave lens', 'Negative'],
    ['Power of a lens', 'Dioptre'],
    ['Magnification of a real image', 'Negative, no unit'],
    ['Image distance of a real image', 'Positive'],
  ],
  order: [1, 2, 3, 0],
  sol: 'Concave f → negative; power → dioptre; real-image m → negative, no unit; real-image v → positive.',
  d: 2, c: 'understanding', t: [4, 5],
}));

// ---------------------------------------------------------------- 10-mark structured questions
add('convex-long', long({
  stem: '(a) Define (i) the optical centre, (ii) the principal focus and (iii) the focal length of a convex lens. [3]\n\n(b) Describe, as you would draw it, the ray diagram for an object placed beyond 2F₁ of a convex lens, and state the position and nature of the image. [3]\n\n(c) For a convex lens, state where the object should be placed to obtain an image that is (i) real and the same size, (ii) virtual and magnified, (iii) at infinity, and (iv) real, magnified, for use in a projector. [4]',
  model: '(a) (i) The point on the principal axis through which a ray passes undeviated. (ii) The point on the axis where rays parallel to the axis meet after refraction. (iii) The distance from the optical centre to the principal focus.\n\n(b) A ray from the top of the object parallel to the axis bends through F₂; a ray through O goes straight; a ray through F₁ emerges parallel. They meet between F₂ and 2F₂ below the axis: the image is real, inverted and diminished.\n\n(c) (i) At 2F₁. (ii) Between O and F₁. (iii) At F₁. (iv) Between F₁ and 2F₁.',
  sol: 'Definitions; ray diagram; four positions.',
  scheme: [['(a)(i)', 1], ['(a)(ii)', 1], ['(a)(iii)', 1], ['(b) rays', 2], ['(b) image', 1], ['(c)(i)', 1], ['(c)(ii)', 1], ['(c)(iii)', 1], ['(c)(iv)', 1]],
  d: 2, c: 'understanding', t: [1, 2],
}));
const L2v = img(-20, 15);
const L2m = L2v / -20;
const L2v2 = img(-10, 15);
const L2m2 = L2v2 / -10;
add('formula-long', long({
  stem: '(a) Explain how signs are given to u, v and f for a lens, and write the lens formula. [3]\n\n(b) A 2.5 cm tall object is placed 20 cm in front of a convex lens of focal length 15 cm. Calculate (i) the image distance, (ii) the magnification and (iii) the height of the image. [3]\n\n(c) The object is moved to 10 cm from the same lens. (i) Find the new image distance. (ii) Find the magnification. (iii) State the nature of the image. (iv) Name a device that uses this arrangement. [4]',
  model: `(a) Distances from the optical centre; along the incident light positive, against it negative; heights up positive, down negative. Lens formula: $\\dfrac{1}{v} - \\dfrac{1}{u} = \\dfrac{1}{f}$.\n\n(b) (i) $\\dfrac{1}{v} = \\dfrac{1}{15} - \\dfrac{1}{20} = \\dfrac{1}{60}$, so $v = +${f3(L2v)}$ cm. (ii) $m = \\dfrac{${f3(L2v)}}{-20} = ${f3(L2m)}$. (iii) $h_{2} = ${f3(L2m)} \\times 2.5 = ${f3(L2m * 2.5)}$ cm (inverted).\n\n(c) (i) $\\dfrac{1}{v} = \\dfrac{1}{15} - \\dfrac{1}{10} = -\\dfrac{1}{30}$, so $v = ${f3(L2v2)}$ cm. (ii) $m = \\dfrac{-30}{-10} = ${f3(L2m2)}$. (iii) Virtual, erect, magnified, on the object side. (iv) A magnifying glass.`,
  sol: 'Rules and formula; real image; virtual image.',
  scheme: [['(a) rules', 2], ['(a) formula', 1], ['(b)(i)', 1], ['(b)(ii)', 1], ['(b)(iii)', 1], ['(c)(i)', 1], ['(c)(ii)', 1], ['(c)(iii)', 1], ['(c)(iv)', 1]],
  d: 3, c: 'application', t: [4, 5],
}), () => (near(L2v, 60, 1e-9) && near(L2m, -3, 1e-9) && near(L2v2, -30, 1e-9) && near(L2m2, 3, 1e-9)) || 'formula');
const L3v = img(-30, -20);
const L3m = L3v / -30;
add('concave-long', long({
  stem: '(a) Describe, as you would draw it, the ray diagram for an object placed in front of a concave lens, and state the nature of the image. [3]\n\n(b) An object is placed 30 cm in front of a concave lens of focal length 20 cm. Calculate (i) the image distance and (ii) the magnification, and (iii) state whether the image is magnified or diminished. [3]\n\n(c) (i) Explain why a concave lens cannot form a real image of a real object. (ii) Where does the image lie when the object is very far away? (iii) Give two uses of a concave lens. [4]',
  model: `(a) From the top of the object, a ray parallel to the axis leaves the lens diverging as if from F₁ (drawn dotted back to F₁); a ray through O goes straight on. Produced backwards they meet between F₁ and O on the object side: the image is virtual, erect and diminished.\n\n(b) (i) $\\dfrac{1}{v} = -\\dfrac{1}{20} - \\dfrac{1}{30} = -\\dfrac{5}{60}$, so $v = ${f3(L3v)}$ cm. (ii) $m = \\dfrac{-12}{-30} = ${f3(L3m)}$. (iii) Diminished (and erect, virtual).\n\n(c) (i) It always makes the refracted rays diverge, so they never actually meet. (ii) At the principal focus F₁ (highly diminished). (iii) Spectacles for short sight; door peepholes (also in lens combinations).`,
  sol: 'Diagram; image distance and magnification; reasons and uses.',
  scheme: [['(a) rays', 2], ['(a) nature', 1], ['(b)(i)', 1], ['(b)(ii)', 1], ['(b)(iii)', 1], ['(c)(i)', 2], ['(c)(ii)', 1], ['(c)(iii)', 1]],
  d: 3, c: 'application', t: [3, 4, 5],
}), () => (near(L3v, -12, 1e-9) && near(L3m, 0.4, 1e-9)) || 'concave');
const L4v = img(-4, 5);
const L4m = L4v / -4;
add('power-long', long({
  stem: '(a) What does the power of a lens measure? Write it in terms of the focal length, name its SI unit, and say how its sign is decided. [3]\n\n(b) Find the power of (i) a convex lens of focal length 20 cm and (ii) a concave lens of focal length 50 cm. (iii) Which lens is stronger? [3]\n\n(c) A magnifying glass of focal length 5.0 cm is held 4.0 cm from a printed letter. (i) Find the image distance. (ii) Find the magnification. (iii) State the nature of the image. (iv) Why is a lens of short focal length preferred? [4]',
  model: `(a) Power is the reciprocal of the focal length expressed in metres; its SI unit is the dioptre (D), the power of a lens of focal length 1 m. It is positive for a convex lens and negative for a concave lens, following the sign of f.\n\n(b) (i) $P = \\dfrac{1}{0.20} = +5$ D. (ii) $P = \\dfrac{1}{-0.50} = -2$ D. (iii) The convex lens: its power has the larger magnitude.\n\n(c) (i) $\\dfrac{1}{v} = \\dfrac{1}{5} - \\dfrac{1}{4} = -\\dfrac{1}{20}$, so $v = ${f3(L4v)}$ cm. (ii) $m = \\dfrac{-20}{-4} = ${f3(L4m)}$. (iii) Virtual, erect, magnified, on the same side as the letter. (iv) A shorter focal length (greater power) gives a larger image.`,
  sol: 'Definition; two powers; magnifying glass.',
  scheme: [['(a) definition and unit', 2], ['(a) sign', 1], ['(b)(i)', 1], ['(b)(ii)', 1], ['(b)(iii)', 1], ['(c)(i)', 1], ['(c)(ii)', 1], ['(c)(iii)', 1], ['(c)(iv)', 1]],
  d: 2, c: 'application', t: [5],
}), () => (near(L4v, -20, 1e-9) && near(L4m, 5, 1e-9)) || 'glass');
const L5u1 = -(3 / 2) * 15;
const L5u2 = -15 / 2;
add('design-long', long({
  stem: 'Asha has a convex lens of focal length 15 cm.\n\n(a) She wants a real image twice the size of a bulb on a wall. Find where she must place the bulb and where the wall must be. [3]\n\n(b) She now wants an erect image twice the size of a seed. Find where the seed must be and where the image forms. [3]\n\n(c) (i) Compare the signs of m in (a) and (b), and explain what they tell you. (ii) Could a concave lens give either image? Give a reason. (iii) Which of the two arrangements is used in a projector? [4]',
  model: `(a) Real image: $m = -2$, so $v = -2u$. Then $\\dfrac{1}{-2u} - \\dfrac{1}{u} = \\dfrac{1}{15}$ gives $-\\dfrac{3}{2u} = \\dfrac{1}{15}$, so $u = ${f3(L5u1)}$ cm and $v = +45$ cm: bulb 22.5 cm in front of the lens, wall 45 cm behind it.\n\n(b) Erect image: $m = +2$, so $v = 2u$. Then $\\dfrac{1}{2u} - \\dfrac{1}{u} = \\dfrac{1}{15}$ gives $-\\dfrac{1}{2u} = \\dfrac{1}{15}$, so $u = ${f3(L5u2)}$ cm and $v = -15$ cm: seed 7.5 cm from the lens, image 15 cm from the lens on the seed’s side.\n\n(c) (i) In (a) m is negative: real and inverted; in (b) m is positive: virtual and erect. (ii) No: a concave lens always gives a diminished image (and never a real one). (iii) Arrangement (a), with the object between F and 2F.`,
  sol: 'Real ×2; virtual ×2; comparison.',
  scheme: [['(a) method', 2], ['(a) positions', 1], ['(b) method', 2], ['(b) positions', 1], ['(c)(i)', 2], ['(c)(ii)', 1], ['(c)(iii)', 1]],
  d: 4, c: 'analysis', t: [2, 4],
}), () => (near(img(L5u1, 15) / L5u1, -2, 1e-9) && near(img(L5u2, 15) / L5u2, 2, 1e-9) && near(img(L5u1, 15), 45, 1e-9) && near(img(L5u2, 15), -15, 1e-9)) || 'design');
