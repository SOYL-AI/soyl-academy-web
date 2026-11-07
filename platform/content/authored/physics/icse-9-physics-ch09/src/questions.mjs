// ICSE 9 Physics ch09 Spherical Mirrors: question bank in ICSE school-examination style (short stems, "state", "define", "give a
// reason", numericals with formula, substitution and unit, 10-mark structured questions in parts). Cartesian sign convention and
// 1/v + 1/u = 1/f; direct numericals only (the derivation and scale drawing are removed topics). Numbers come from calc.mjs. AR
// keys use the ICSE option order: a = A true R false, b = A false R true, c = both true and R explains, d = both true and R does
// not explain.
import { mk, add, svgV, r, sig } from '../../icse-9-physics-ch01/src/lib.mjs';
import * as K from './calc.mjs';
import { TERMS_LETTERED, CASE_C_F_LETTERED, CASE_CONVEX } from './svgs.mjs';

const { mcq, ar, tf, fill, num, short, long, match } = mk;
const termsFig = svgV(TERMS_LETTERED, 'A concave mirror with its principal axis and points lettered A to E');
const caseFig = svgV(CASE_C_F_LETTERED, 'A concave mirror with an object and its image, lettered A to E');
const convexFig = svgV(CASE_CONVEX, 'A convex mirror with an object and its virtual image');
const term = (o) => short({ marks: 1, wl: null, scheme: [[o.sch ?? 'Correct answer', 1]], ...o });
const cm = (x) => `${x} cm`;

// ---------------------------------------------------------------- deck-check items (not used in tests)
add('chk-fr', mcq({
  stem: 'A spherical mirror has a radius of curvature of 30 cm. Its focal length is',
  right: cm(K.CHK_F), wrong: ['30 cm', '60 cm', '7.5 cm'],
  sol: r`$f = \dfrac{R}{2} = \dfrac{30}{2} = ${K.CHK_F}$ cm, option (@K).`,
  d: 1, c: 'application', t: [1],
}), () => K.CHK_F === 15 || 'f');
add('chk-ray', mcq({
  stem: 'A ray of light parallel to the principal axis falls on a concave mirror. After reflection it',
  right: 'passes through the principal focus', wrong: ['passes through the pole', 'goes back along its own path', 'moves away parallel to the axis'],
  sol: 'A ray parallel to the axis is reflected through the focus of a concave mirror, option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('chk-case', mcq({
  stem: 'An object is placed at the centre of curvature of a concave mirror. The image is formed',
  right: 'at the centre of curvature, real, inverted and of the same size as the object', wrong: ['at the focus, real, inverted and diminished', 'beyond the centre of curvature, real and enlarged', 'behind the mirror, virtual and erect'],
  sol: 'An object at C has its image at C, real, inverted and equal in size, option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('chk-conv', mcq({
  stem: 'The image formed by a convex mirror, for any position of the object in front of it, is always',
  right: 'virtual, erect and diminished', wrong: ['real, inverted and diminished', 'virtual, erect and enlarged', 'real, inverted and enlarged'],
  sol: 'A convex mirror diverges the rays, so the image is virtual, erect and smaller than the object, option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('chk-sign', mcq({
  stem: 'In the Cartesian sign convention, the object distance of a real object placed in front of a mirror is',
  right: 'negative', wrong: ['positive', 'zero', 'positive for a concave mirror only'],
  sol: 'The object is on the side from which the light comes, against the direction of the incident light, so u is negative, option (@K).',
  d: 1, c: 'recall', t: [5],
}));
add('chk-formula', mcq({
  stem: 'A concave mirror has a focal length of 10 cm. An object is placed 40 cm in front of it. The image distance, with its sign, is',
  right: `${K.CHK2_V} cm`, wrong: ['+13.3 cm', '−8 cm', '−50 cm'],
  sol: r`$\dfrac{1}{v} = \dfrac{1}{f} - \dfrac{1}{u} = \dfrac{1}{-10} - \dfrac{1}{-40} = -\dfrac{3}{40}$, so $v = ${K.CHK2_V}$ cm, option (@K).`,
  d: 2, c: 'application', t: [5],
}), () => K.CHK2_V === -13.3 || 'v');

// ---------------------------------------------------------------- t01 terms; f = R/2
add('tm-mcq1', mcq({
  stem: 'In a convex mirror the reflecting surface is the',
  right: 'outer surface of the sphere, which bulges towards the object', wrong: ['inner surface of the sphere, which curves towards the object', 'flat middle part of the sphere', 'silvered back of a plane mirror'],
  sol: 'A convex mirror reflects from the outward-bulging surface, option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('tm-mcq2', mcq({
  stem: 'A convex mirror has a radius of curvature of 36 cm. Its focal length in the sign convention is',
  right: `+${K.M2.f} cm`, wrong: [`−${K.M2.f} cm`, `+${K.M2.R} cm`, `−${K.M2.R} cm`],
  sol: r`$f = \dfrac{R}{2} = \dfrac{36}{2} = ${K.M2.f}$ cm and for a convex mirror it is positive, option (@K).`,
  d: 2, c: 'application', t: [1],
}), () => K.M2.f === 18 || 'f');
add('tm-mcq3', mcq({
  stem: 'The distance between the pole and the principal focus of a spherical mirror is called its',
  right: 'focal length', wrong: ['radius of curvature', 'aperture', 'object distance'],
  sol: 'PF is the focal length, option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('tm-mcq4', mcq({
  stem: 'The focal length of a concave mirror is 7.5 cm in size. Its radius of curvature in size is',
  right: cm(K.M4R.R), wrong: ['3.75 cm', '7.5 cm', '22.5 cm'],
  sol: r`$R = 2f = 2 \times 7.5 = ${K.M4R.R}$ cm, option (@K).`,
  d: 2, c: 'application', t: [1],
}), () => K.M4R.R === 15 || 'R');
add('tm-ar', ar({
  a: 'The focal length of a spherical mirror is half its radius of curvature.',
  r: 'The principal focus lies midway between the pole and the centre of curvature.',
  key: 'c',
  sol: 'Both are true; because F is midway between P and C, PF = PC ÷ 2, so (R) explains (A), option (c).',
  d: 2, c: 'understanding', t: [1],
}));
add('tm-tf', tf({
  stem: 'The centre of curvature of a spherical mirror lies on the principal axis.',
  key: 't',
  sol: 'True. The principal axis is the line through the pole and the centre of curvature.',
  d: 1, c: 'recall', t: [1],
}));
add('tm-fill', fill({
  marks: 4,
  stem: 'The middle point of a spherical mirror is its ___. The distance between this point and the centre of curvature is the ___. The focal length is ___ of the radius of curvature. A concave mirror is also called a ___ mirror.',
  acc: [['pole'], ['radius of curvature', 'radius'], ['half', 'one half'], ['converging']],
  sol: 'Pole; radius of curvature; half; converging.',
  d: 1, c: 'recall', t: [1],
}));
add('tm-term', term({
  stem: 'Define the focal length of a spherical mirror.',
  model: 'The **distance between the pole and the principal focus** of the mirror.', sol: 'Distance from the pole to the principal focus.', sch: 'Pole to principal focus',
  d: 1, c: 'recall', t: [1],
}));
add('tm-short2a', short({
  marks: 2, wl: null,
  stem: 'Define the pole and the centre of curvature of a spherical mirror.',
  model: 'The **pole** is the **middle point** of the reflecting surface of the mirror. The **centre of curvature** is the **centre of the sphere** of which the mirror is a part.',
  sol: 'Pole: middle of the mirror surface; centre of curvature: centre of the parent sphere.',
  scheme: [['Pole: middle point of the mirror', 1], ['Centre of curvature: centre of the sphere', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('tm-short2b', short({
  marks: 2, wl: null,
  stem: 'State the relation between the focal length and the radius of curvature of a spherical mirror, and say which of the two is greater.',
  model: r`$f = \dfrac{R}{2}$, so the **radius of curvature is twice the focal length**; R is the greater.`,
  sol: 'f = R/2; R is twice f.',
  scheme: [['f = R/2', 1], ['R is the greater, twice f', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('num-f', num({
  stem: 'A concave mirror has a radius of curvature of 30 cm. Find its focal length, with its sign in the Cartesian convention.',
  value: K.N_F.f, tol: 0, unit: 'cm',
  sol: r`$R = -30$ cm for a concave mirror, so $f = \dfrac{R}{2} = \dfrac{-30}{2} = ${K.N_F.f}$ cm.`,
  scheme: [['f = R/2 with R = −30 cm', 0.5], [`${K.N_F.f} cm`, 0.5]],
  d: 1, c: 'application', t: [1],
}), () => K.N_F.f === -15 || 'f');
add('num-r', num({
  stem: 'A convex mirror has a focal length of 25 cm. Find its radius of curvature, with its sign in the Cartesian convention.',
  value: K.N_R.R, tol: 0, unit: 'cm',
  sol: r`$R = 2f = 2 \times 25 = +${K.N_R.R}$ cm (positive for a convex mirror).`,
  scheme: [['R = 2f', 0.5], [`+${K.N_R.R} cm`, 0.5]],
  d: 1, c: 'application', t: [1],
}), () => K.N_R.R === 50 || 'R');

// ---------------------------------------------------------------- t02 paths of specific rays
add('rs-mcq1', mcq({
  stem: 'A ray of light directed towards the centre of curvature of a spherical mirror is reflected',
  right: 'back along its own path', wrong: ['through the focus', 'parallel to the principal axis', 'through the pole'],
  sol: 'Such a ray meets the mirror along the normal, so it returns along the same path, option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('rs-mcq2', mcq({
  stem: 'A ray of light passing through the principal focus of a concave mirror is reflected',
  right: 'parallel to the principal axis', wrong: ['through the centre of curvature', 'back along its own path', 'through the pole'],
  sol: 'By the reversibility of light, a ray through F becomes parallel to the axis, option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('rs-mcq3', mcq({
  stem: 'A parallel beam of rays at a small angle to the principal axis falls on a concave mirror. After reflection the rays meet',
  right: 'at a point on the focal plane', wrong: ['at the focus on the principal axis', 'at the centre of curvature', 'behind the mirror'],
  sol: 'The rays meet at a point of the plane through F perpendicular to the axis, option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('rs-mcq4', mcq({
  stem: 'Light from a very distant star falls on a concave mirror. The image of the star is formed',
  right: 'at the principal focus', wrong: ['at the centre of curvature', 'at the pole', 'behind the mirror'],
  sol: 'Rays from a distant object are parallel, so they meet at F, option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('rs-mcq5', mcq({
  stem: 'A ray of light directed towards the principal focus behind a convex mirror is reflected',
  right: 'parallel to the principal axis', wrong: ['through the pole', 'back along its own path', 'through the centre of curvature'],
  sol: 'A ray directed towards F is reflected parallel to the axis, option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('rs-ar', ar({
  a: 'A ray of light directed towards the centre of curvature of a mirror is reflected back along its own path.',
  r: 'The angle of incidence of such a ray is 90°.',
  key: 'a',
  sol: '(A) is true; (R) is false because such a ray falls along the normal, so its angle of incidence is 0°, option (a).',
  d: 3, c: 'analysis', t: [2],
}));
add('rs-short2', short({
  marks: 2, wl: null,
  stem: 'State the path of the reflected ray when the incident ray (i) is parallel to the principal axis of a concave mirror and (ii) passes through the principal focus.',
  model: '**(i)** The reflected ray passes **through the principal focus F**. **(ii)** The reflected ray is **parallel to the principal axis**.',
  sol: 'Through F; parallel to the axis.',
  scheme: [['Parallel ray goes through F', 1], ['Ray through F goes parallel to the axis', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('rs-short3', short({
  marks: 3, wl: null,
  stem: 'A convex mirror and a concave mirror each receive a beam of rays parallel to the principal axis. Describe what happens to the reflected rays in each case.',
  model: 'For the **concave mirror** the reflected rays **converge and pass through the principal focus** in front of the mirror. For the **convex mirror** they **diverge**, and when produced backwards they **appear to come from the principal focus behind the mirror**, which is a virtual focus.',
  sol: 'Concave: converge at the real focus; convex: diverge, appearing to come from the virtual focus.',
  scheme: [['Concave: rays converge through F', 1], ['Convex: rays diverge', 1], ['Convex: appear to come from the virtual focus behind', 1]],
  d: 2, c: 'understanding', t: [2],
}));

// ---------------------------------------------------------------- t03 images by a concave mirror
add('cc-mcq1', mcq({
  stem: 'An object is placed beyond the centre of curvature of a concave mirror. The image is formed',
  right: 'between the focus and the centre of curvature, real, inverted and diminished', wrong: ['at the centre of curvature, real, inverted and the same size', 'beyond the centre of curvature, real, inverted and enlarged', 'behind the mirror, virtual and erect'],
  sol: 'Beyond C the image lies between F and C, real, inverted and smaller, option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('cc-mcq2', mcq({
  stem: 'A small lamp is placed at the principal focus of a concave mirror. The reflected light forms',
  right: 'a parallel beam', wrong: ['a beam that meets at the centre of curvature', 'a beam that spreads out widely', 'a real image on a screen at C'],
  sol: 'Rays from F are reflected parallel to the axis, so the image is at infinity, option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('cc-mcq3', mcq({
  stem: 'A concave mirror forms an erect and enlarged image of an object. The object is placed',
  right: 'between the pole and the principal focus', wrong: ['between the focus and the centre of curvature', 'at the centre of curvature', 'beyond the centre of curvature'],
  sol: 'Only an object inside the focus gives a virtual, erect, enlarged image, option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('cc-mcq4', mcq({
  stem: 'A real image of the same size as the object is obtained with a concave mirror when the object is placed',
  right: 'at the centre of curvature', wrong: ['at the principal focus', 'between the pole and the focus', 'at infinity'],
  sol: 'At C the image is at C and is equal in size, option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('cc-mcq5', mcq({
  stem: 'A concave mirror forms a real, inverted and enlarged image. The object is placed',
  right: 'between the focus and the centre of curvature', wrong: ['beyond the centre of curvature', 'at the centre of curvature', 'between the pole and the focus'],
  sol: 'The image is enlarged and beyond C only when the object is between C and F, option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('cc-ar', ar({
  a: 'A concave mirror forms a real image for every position of the object in front of it.',
  r: 'A concave mirror converges parallel rays to its focus.',
  key: 'b',
  sol: '(A) is false because an object between the pole and the focus gives a virtual image; (R) is true, option (b).',
  d: 3, c: 'analysis', t: [3],
}));
add('cc-tf', tf({
  stem: 'A real image formed by a concave mirror is always inverted.',
  key: 't',
  sol: 'True. Every real image formed by a concave mirror is inverted.',
  d: 2, c: 'understanding', t: [3],
}));
add('cc-match', match({
  marks: 5,
  stem: 'A concave mirror has a focal length of 10 cm. Match each position of the object in Column A with the image in Column B.',
  pairs: [
    ['40 cm in front of the mirror', 'real, inverted, between F and C'],
    ['20 cm in front of the mirror', 'real, inverted, same size, at C'],
    ['15 cm in front of the mirror', 'real, inverted, enlarged, beyond C'],
    ['10 cm in front of the mirror', 'formed at infinity'],
    ['5 cm in front of the mirror', 'virtual, erect, enlarged, behind the mirror'],
  ],
  order: [3, 0, 4, 1, 2],
  sol: '40 cm: beyond C, image between F and C; 20 cm: at C; 15 cm: between C and F, image beyond C; 10 cm: at F, infinity; 5 cm: inside F, virtual.',
  d: 3, c: 'application', t: [3],
}));
add('cc-short2a', short({
  marks: 2, wl: null,
  stem: 'State the position of the object for which a concave mirror forms a virtual image. State two characteristics of this image.',
  model: 'The object is placed **between the pole and the principal focus**. The image is **erect** and **enlarged** (and virtual, behind the mirror).',
  sol: 'Object inside the focus; image erect and enlarged.',
  scheme: [['Object between P and F', 1], ['Erect and enlarged', 1]],
  d: 1, c: 'recall', t: [3],
}));
add('cc-short2b', short({
  marks: 2, wl: null,
  stem: 'Why can a real image formed by a concave mirror be received on a screen but a virtual image cannot?',
  model: 'In a **real** image the reflected rays **actually meet**, so light reaches the screen. In a **virtual** image the rays only **appear to come from** a point behind the mirror, where no light reaches.',
  sol: 'Real: rays meet; virtual: rays only appear to meet.',
  scheme: [['Real image: rays actually meet', 1], ['Virtual image: rays only appear to meet, no light there', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('cc-short3', short({
  marks: 3, wl: null,
  stem: 'An object is placed between the pole and the principal focus of a concave mirror. State the nature, position and size of the image, and say why it cannot be caught on a screen.',
  model: 'The image is **virtual and erect**, formed **behind the mirror**, and **enlarged**. It cannot be caught on a screen because the reflected rays **diverge** and only their **backward extensions meet**, so no light actually reaches the image.',
  sol: 'Virtual, erect, enlarged, behind the mirror; rays diverge so no light reaches it.',
  scheme: [['Virtual and erect, behind the mirror', 1], ['Enlarged', 1], ['Rays diverge, backward extensions meet, so not on a screen', 1]],
  d: 2, c: 'understanding', t: [3],
}));

// ---------------------------------------------------------------- t04 convex mirror; uses
add('cx-mcq1', mcq({
  stem: 'An object is placed in front of a convex mirror. As the object is moved from far away towards the mirror, its image',
  right: 'stays virtual, erect and diminished, and grows in size', wrong: ['becomes real when the object is inside the focus', 'becomes enlarged beyond the object size', 'turns inverted when the object is at the centre of curvature'],
  sol: 'A convex mirror always forms a virtual, erect, diminished image; the image gets larger as the object comes nearer, option (@K).',
  d: 3, c: 'analysis', t: [4],
}));
add('cx-mcq2', mcq({
  stem: 'A convex mirror is used as a rear-view mirror in vehicles because it',
  right: 'gives an erect image and a wide field of view', wrong: ['forms a real and enlarged image', 'forms an inverted image', 'converges the light of the vehicles behind'],
  sol: 'The diverging mirror shows a large area, and the image is erect, option (@K).',
  d: 1, c: 'understanding', t: [4],
}));
add('cx-mcq3', mcq({
  stem: 'A dentist uses a small concave mirror to see the back of a tooth. For this the tooth must be',
  right: 'between the pole and the principal focus of the mirror', wrong: ['beyond the centre of curvature of the mirror', 'at the centre of curvature of the mirror', 'at infinity'],
  sol: 'Inside F the image is erect and enlarged, option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('cx-mcq4', mcq({
  stem: 'In a car headlight, the bulb is placed at the principal focus of a concave reflector so that',
  right: 'the reflected light forms a parallel beam', wrong: ['the reflected light converges to a point on the road', 'a virtual image of the bulb forms behind the reflector', 'the light spreads out in all directions'],
  sol: 'Rays from F are reflected parallel to the axis, option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('cx-ar', ar({
  a: 'A convex mirror is used as the rear-view mirror of a motorcycle.',
  r: 'A convex mirror always forms an erect image.',
  key: 'd',
  sol: 'Both statements are true, but (R) is not the reason for its use; the reason is its wide field of view, option (d).',
  d: 3, c: 'analysis', t: [4],
}));
add('cx-tf', tf({
  stem: 'A convex mirror can form a real image if the object is placed very close to it.',
  key: 'f',
  sol: 'False. A convex mirror always forms a virtual image, whatever the position of the object.',
  d: 2, c: 'understanding', t: [4],
}));
add('cx-term', term({
  stem: 'Name the mirror used by a shopkeeper to watch customers in all parts of the shop.',
  model: 'A **convex mirror**.', sol: 'Convex mirror.', sch: 'Convex mirror',
  d: 1, c: 'recall', t: [4],
}));
add('cx-short2a', short({
  marks: 2, wl: null,
  stem: 'Name two uses of a concave mirror and state, in each case, where the object is placed.',
  model: 'A **shaving mirror**: the face is **between the pole and the focus**, giving an erect, enlarged image. A **torch or headlight reflector**: the bulb is **at the focus**, giving a parallel beam.',
  sol: 'Shaving mirror, face inside F; headlight, bulb at F.',
  scheme: [['A use with the position of the object', 1], ['A second use with the position of the object', 1]],
  d: 2, c: 'application', t: [4],
}));
add('cx-short2b', short({
  marks: 2, wl: null,
  stem: 'Why is a convex mirror preferred to a plane mirror as the rear-view mirror of a car?',
  model: 'A convex mirror forms an **erect, diminished image**, so it covers a **much wider field of view** than a plane mirror of the same size, and the driver can see more of the road behind.',
  sol: 'Erect diminished image gives a wider field of view than a plane mirror.',
  scheme: [['Erect, diminished image', 1], ['Wider field of view', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('cx-short3', short({
  marks: 3, wl: null,
  stem: 'Explain why a convex mirror always forms a virtual, erect and diminished image.',
  model: 'A convex mirror **diverges** every ray that falls on it. The reflected rays never meet in front of the mirror, so **no real image** is formed. Their backward extensions meet **behind the mirror**, between the pole and the focus, which gives a **virtual, erect** image, and as the rays spread out the image is **smaller** than the object.',
  sol: 'Rays diverge, so no real image; backward extensions meet behind between P and F, giving a small virtual image.',
  scheme: [['Rays diverge, never meet in front', 1], ['Backward extensions meet behind the mirror: virtual, erect', 1], ['Image between P and F, so smaller than the object', 1]],
  d: 3, c: 'understanding', t: [4],
}));

// ---------------------------------------------------------------- t05 sign convention; mirror formula and magnification
add('sf-mcq1', mcq({
  stem: 'In the Cartesian sign convention, the focal length of a concave mirror is',
  right: 'negative', wrong: ['positive', 'zero', 'positive for a real object only'],
  sol: 'The focus of a concave mirror is on the side of the object, against the direction of the incident light, option (@K).',
  d: 1, c: 'recall', t: [5],
}));
add('sf-mcq2', mcq({
  stem: 'A concave mirror has a focal length of 20 cm. An object is placed 30 cm in front of it. The image distance, with its sign, is',
  right: `${K.SF2.v} cm`, wrong: ['+60 cm', '−12 cm', '−6 cm'],
  sol: r`$\dfrac{1}{v} = \dfrac{1}{f} - \dfrac{1}{u} = \dfrac{1}{-20} - \dfrac{1}{-30} = -\dfrac{1}{60}$, so $v = ${K.SF2.v}$ cm, option (@K).`,
  d: 2, c: 'application', t: [5],
}), () => K.SF2.v === -60 || 'v');
add('sf-mcq3', mcq({
  stem: 'A concave mirror has f = −10 cm and an object is placed 25 cm in front of it. The magnification is about',
  right: `${K.M3_M}`, wrong: ['+0.667', '−1.5', '−2.5'],
  sol: r`$v = ${K.M3_V}$ cm, so $m = -\dfrac{v}{u} = -\dfrac{${K.M3_V}}{-25} = ${K.M3_M}$, option (@K).`,
  d: 3, c: 'application', t: [5],
}), () => K.M3_M === -0.667 || 'm');
add('sf-mcq4', mcq({
  stem: 'A mirror has a negative magnification. The image is',
  right: 'real and inverted', wrong: ['virtual and erect', 'real and erect', 'virtual and inverted'],
  sol: 'A negative m means the image is inverted, which for a mirror means it is real, option (@K).',
  d: 2, c: 'understanding', t: [5],
}));
add('sf-mcq5', mcq({
  stem: 'An object is placed at the principal focus of a concave mirror of focal length 12 cm. The image distance is',
  right: 'infinite', wrong: ['−12 cm', '+12 cm', '−24 cm'],
  sol: r`With $u = f$, $\dfrac{1}{v} = \dfrac{1}{f} - \dfrac{1}{u} = 0$, so $v$ is infinite, option (@K).`,
  d: 3, c: 'application', t: [5],
}), () => K.vOf(K.M4.u, K.M4.f) === Infinity || 'v');
add('sf-tf', tf({
  stem: 'A virtual image formed by a concave mirror has a positive image distance in the Cartesian sign convention.',
  key: 't',
  sol: 'True. A virtual image is behind the mirror, along the direction of the incident light, so v is positive.',
  d: 2, c: 'understanding', t: [5],
}));
add('sf-term', term({
  stem: 'Write the formula that connects the image distance v, the object distance u and the focal length f of a spherical mirror.',
  model: r`$\dfrac{1}{v} + \dfrac{1}{u} = \dfrac{1}{f}$`, sol: '1/v + 1/u = 1/f.', sch: '1/v + 1/u = 1/f',
  d: 1, c: 'recall', t: [5],
}));
add('sf-short2a', short({
  marks: 2, wl: null,
  stem: 'State two rules of the Cartesian sign convention for mirrors.',
  model: 'The **pole is the origin**. Distances measured **against the direction of the incident light are negative** and those along it are positive; **heights above the principal axis are positive**, below it negative. (Any two.)',
  sol: 'Any two: pole is the origin, against the light negative, heights above the axis positive.',
  scheme: [['First rule', 1], ['Second rule', 1]],
  d: 1, c: 'recall', t: [5],
}));
add('sf-short3a', short({
  marks: 3, wl: null,
  stem: `A concave mirror has a focal length of 20 cm. An object is placed 50 cm in front of it. Find (a) the image distance and (b) the magnification, and state the nature of the image.`,
  model: r`**(a)** $\dfrac{1}{v} = \dfrac{1}{-20} - \dfrac{1}{-50}$, so $v = ${K.LE_V}$ cm.` + '\n\n' + r`**(b)** $m = -\dfrac{v}{u} = -\dfrac{${K.LE_V}}{-50} = ${K.LE_M}$. The image is **real, inverted and diminished**.`,
  sol: '−33.3 cm; −0.667; real, inverted, diminished.',
  scheme: [['v = −33.3 cm', 1], ['m = −0.667', 1], ['Real, inverted, diminished', 1]],
  d: 3, c: 'application', t: [5],
}), () => K.LE_V === -33.3 && K.LE_M === -0.667 || 'sf-s3a');
add('sf-short3b', short({
  marks: 3, wl: null,
  stem: `A concave mirror has a focal length of 24 cm. An object 2 cm tall is placed 16 cm in front of it. Find the image distance, the magnification and the height of the image.`,
  model: r`$\dfrac{1}{v} = \dfrac{1}{-24} - \dfrac{1}{-16}$, so $v = +${K.LF.v}$ cm (behind the mirror). $m = -\dfrac{v}{u} = -\dfrac{${K.LF.v}}{-16} = +${K.LF.m}$. Height of the image $= ${K.LF.m} \times 2 = ${K.LF.h2}$ cm, **virtual and erect**.`,
  sol: '+48 cm; +3; 6 cm, virtual and erect.',
  scheme: [['v = +48 cm', 1], ['m = +3', 1], ['Height 6 cm, virtual and erect', 1]],
  d: 3, c: 'application', t: [5],
}), () => K.LF.v === 48 && K.LF.m === 3 && K.LF.h2 === 6 || 'sf-s3b');
add('num-v1', num({
  stem: 'A concave mirror has a focal length of 12 cm. An object is placed 36 cm in front of it. Find the image distance.',
  value: K.N_V1.v, tol: 0.1, unit: 'cm',
  sol: r`$f = -12$ cm, $u = -36$ cm: $\dfrac{1}{v} = \dfrac{1}{f} - \dfrac{1}{u} = -\dfrac{1}{12} + \dfrac{1}{36} = -\dfrac{1}{18}$, so $v = ${K.N_V1.v}$ cm.`,
  scheme: [['Formula with signs', 0.5], [`${K.N_V1.v} cm`, 0.5]],
  d: 2, c: 'application', t: [5],
}), () => K.N_V1.v === -18 || 'v');
add('num-m1', num({
  stem: 'A concave mirror of focal length 12 cm forms an image 18 cm in front of it of an object placed 36 cm in front of it. Find the magnification.',
  value: K.N_V1.m, tol: 0.005, unit: null,
  sol: r`$m = -\dfrac{v}{u} = -\dfrac{-18}{-36} = ${K.N_V1.m}$.`,
  scheme: [['m = −v/u with signs', 0.5], [`${K.N_V1.m}`, 0.5]],
  d: 2, c: 'application', t: [5],
}), () => K.N_V1.m === -0.5 || 'm');
add('num-conv', num({
  stem: 'A convex mirror has a focal length of 20 cm. An object is placed 60 cm in front of it. Find the image distance, with its sign.',
  value: K.N_CONV.v, tol: 0.05, unit: 'cm',
  sol: r`$f = +20$ cm, $u = -60$ cm: $\dfrac{1}{v} = \dfrac{1}{20} + \dfrac{1}{60} = \dfrac{4}{60}$, so $v = +${K.N_CONV.v}$ cm (virtual, behind the mirror).`,
  scheme: [['Formula with signs', 0.5], [`+${K.N_CONV.v} cm`, 0.5]],
  d: 2, c: 'application', t: [5],
}), () => K.N_CONV.v === 15 || 'v');
add('num-obj', num({
  stem: 'A concave mirror of focal length 12 cm forms a real image 36 cm in front of the mirror. Find the distance of the object from the mirror, with its sign.',
  value: K.N_OBJ.u, tol: 0.1, unit: 'cm',
  sol: r`$f = -12$ cm, $v = -36$ cm: $\dfrac{1}{u} = \dfrac{1}{f} - \dfrac{1}{v} = -\dfrac{1}{12} + \dfrac{1}{36} = -\dfrac{1}{18}$, so $u = ${K.N_OBJ.u}$ cm.`,
  scheme: [['Formula with signs', 0.5], [`${K.N_OBJ.u} cm`, 0.5]],
  d: 3, c: 'application', t: [5],
}), () => K.N_OBJ.u === -18 || 'u');
add('num-h', num({
  stem: 'A candle flame 4 cm tall is placed 15 cm in front of a concave mirror of focal length 10 cm. Find the height of the image, with its sign.',
  value: K.N_H.h2, tol: 0.05, unit: 'cm',
  sol: r`$\dfrac{1}{v} = -\dfrac{1}{10} + \dfrac{1}{15} = -\dfrac{1}{30}$, so $v = ${K.N_H.v}$ cm; $m = -\dfrac{v}{u} = ${K.N_H.m}$; $h' = m h = ${K.N_H.m} \times 4 = ${K.N_H.h2}$ cm (inverted).`,
  scheme: [['v = −30 cm', 0.5], [`${K.N_H.h2} cm`, 0.5]],
  d: 3, c: 'application', t: [5],
}), () => K.N_H.h2 === -8 || 'h');
add('num-virt', num({
  stem: 'An object is placed 10 cm in front of a concave mirror of focal length 20 cm. Find the image distance, with its sign, and state whether the image is real or virtual.',
  value: K.N_VIRT.v, tol: 0.1, unit: 'cm',
  sol: r`$\dfrac{1}{v} = \dfrac{1}{-20} - \dfrac{1}{-10} = \dfrac{1}{20}$, so $v = +${K.N_VIRT.v}$ cm: positive, so the image is virtual, behind the mirror ($m = +${K.N_VIRT.m}$).`,
  scheme: [['Formula with signs', 0.5], [`+${K.N_VIRT.v} cm, virtual`, 0.5]],
  d: 3, c: 'application', t: [3, 5],
}), () => K.N_VIRT.v === 20 || 'v');
add('num-shave', num({
  stem: 'A shaving mirror gives an erect image three times as large as the face, when the face is 20 cm in front of it. Find the focal length of the mirror, with its sign.',
  value: K.N_SHAVE.f, tol: 0.1, unit: 'cm',
  sol: r`$m = -\dfrac{v}{u} = +3$ with $u = -20$ cm, so $v = ${K.N_SHAVE.v}$ cm; $\dfrac{1}{f} = \dfrac{1}{v} + \dfrac{1}{u} = \dfrac{1}{60} - \dfrac{1}{20} = -\dfrac{1}{30}$, so $f = ${K.N_SHAVE.f}$ cm.`,
  scheme: [['v = +60 cm', 0.5], [`${K.N_SHAVE.f} cm`, 0.5]],
  d: 3, c: 'application', t: [4, 5],
}), () => K.N_SHAVE.f === -30 || 'f');
add('num-rear', num({
  stem: 'A convex rear-view mirror has a focal length of 30 cm. A van is 90 cm in front of it. Find the image distance, with its sign.',
  value: K.N_REAR.v, tol: 0.05, unit: 'cm',
  sol: r`$\dfrac{1}{v} = \dfrac{1}{30} + \dfrac{1}{90} = \dfrac{4}{90}$, so $v = +${K.N_REAR.v}$ cm (virtual, behind the mirror), with $m = +${K.N_REAR.m}$.`,
  scheme: [['Formula with signs', 0.5], [`+${K.N_REAR.v} cm`, 0.5]],
  d: 3, c: 'application', t: [4, 5],
}), () => K.N_REAR.v === 22.5 || 'v');
add('num-err', num({
  stem: 'A concave mirror has a focal length of 15 cm. A pencil is placed 45 cm in front of it. Find the magnification.',
  value: K.N_ERR.m, tol: 0.005, unit: null,
  sol: r`$\dfrac{1}{v} = -\dfrac{1}{15} + \dfrac{1}{45} = -\dfrac{2}{45}$, so $v = ${K.N_ERR.v}$ cm and $m = -\dfrac{v}{u} = ${K.N_ERR.m}$.`,
  scheme: [['v = −22.5 cm', 0.5], [`${K.N_ERR.m}`, 0.5]],
  d: 3, c: 'application', t: [5],
}), () => K.N_ERR.m === -0.5 || 'm');

// ---------------------------------------------------------------- 10-mark structured questions
add('long-terms', long({
  marks: 10, wl: null,
  stem: `The figure shows a concave mirror with its principal axis and some points lettered A to E.\n\n(a) Name the parts A, B, C, D and E. [3]\n\n(b) The distance AB is ${K.LT.pf} cm. Find the distance AC and the radius of curvature. [2]\n\n(c) Define the principal focus of a concave mirror. [2]\n\n(d) State the sign of the focal length of this mirror in the Cartesian sign convention. [1]\n\n(e) State the position and nature of the image of a very distant object. [2]`,
  model: '**(a)** **A** is the pole; **B** is the principal focus; **C** is the centre of curvature; **D** is the principal axis; **E** is the radius of curvature.\n\n' + r`**(b)** AB is the focal length, so $\text{AC} = R = 2f = 2 \times ${K.LT.pf} = ${K.LT.pc}$ cm, and the radius of curvature is **${K.LT.pc} cm**.` + '\n\n**(c)** The **point on the principal axis at which rays parallel to the axis meet** after reflection from the mirror.\n\n**(d)** **Negative**.\n\n**(e)** The image is formed **at the principal focus**; it is **real and inverted** (and very small, a point).',
  sol: 'Pole, principal focus, centre of curvature, principal axis, radius; 24 cm; point where parallel rays meet; negative; at F, real and inverted.',
  scheme: [['A and B named', 1], ['C and D named', 1], ['E named', 1], ['AC = 2 × AB', 1], ['24 cm', 1], ['Parallel rays', 1], ['Meet at a point on the axis after reflection', 1], ['Negative', 1], ['Image at F', 1], ['Real and inverted', 1]],
  d: 2, c: 'understanding', t: [1, 2, 3],
  assets: [termsFig],
}), () => K.LT.pc === 24 || 'terms');
add('long-case', long({
  marks: 10, wl: null,
  stem: 'The figure shows an object in front of a concave mirror and the image formed. The parts are lettered A to E.\n\n(a) Name the points or parts A, B, C, D and E. [3]\n\n(b) State the position, nature and size of the image. [3]\n\n(c) The object is moved to the point B. Describe the image formed. [2]\n\n(d) Name a use of this mirror when the object is placed between C and B, and give the reason. [2]',
  model: '**(a)** **A** is the centre of curvature; **B** is the principal focus; **C** is the pole; **D** is the object; **E** is the image.\n\n**(b)** The image is **beyond the centre of curvature** (farther than A), **real and inverted**, and **enlarged**.\n\n**(c)** The reflected rays become **parallel**, so the image is formed **at infinity**; it is real, inverted and highly enlarged.\n\n**(d)** Moving the object between B and C: a **shaving mirror** gives an **erect, enlarged virtual image** when the face is nearer to the mirror than the focus B.',
  sol: 'Centre of curvature, focus, pole, object, image; beyond C, real, inverted, enlarged; at infinity; shaving mirror, erect enlarged image inside F.',
  scheme: [['A and B named', 1], ['C and D named', 1], ['E named', 1], ['Beyond the centre of curvature', 1], ['Real and inverted', 1], ['Enlarged', 1], ['Rays reflected parallel', 1], ['Image at infinity', 1], ['Use named, with the object between P and F', 1], ['Reason: erect enlarged virtual image', 1]],
  d: 3, c: 'application', t: [3, 4],
  assets: [caseFig],
}));
add('long-conc', long({
  marks: 10, wl: null,
  stem: `A concave mirror has a focal length of ${Math.abs(K.LA.f)} cm. An object ${K.LA.h} cm tall is placed ${Math.abs(K.LA.u)} cm in front of the mirror.\n\n(a) State the signs of f and u in the Cartesian sign convention. [2]\n\n(b) Find the image distance. [2]\n\n(c) Find the magnification. [2]\n\n(d) Find the height of the image and state whether the image is real or virtual, and erect or inverted. [2]\n\n(e) State whether the object is between F and C, or beyond C. [2]`,
  model: r`**(a)** Both are **negative**: $f = ${K.LA.f}$ cm (concave mirror) and $u = ${K.LA.u}$ cm (object in front).` + '\n\n' + r`**(b)** $\dfrac{1}{v} = \dfrac{1}{f} - \dfrac{1}{u} = -\dfrac{1}{15} + \dfrac{1}{45} = -\dfrac{2}{45}$, so $v = ${K.LA.v}$ cm.` + '\n\n' + r`**(c)** $m = -\dfrac{v}{u} = -\dfrac{${K.LA.v}}{${K.LA.u}} = ${K.LA.m}$.` + '\n\n' + r`**(d)** $h' = m h = ${K.LA.m} \times ${K.LA.h} = ${K.LA.h2}$ cm. The image is **real** (v is negative) and **inverted** (m is negative).` + '\n\n' + r`**(e)** $R = 2f = ${2 * K.LA.f}$ cm, so C is ${Math.abs(2 * K.LA.f)} cm from the mirror; the object at ${Math.abs(K.LA.u)} cm is **beyond C**.`,
  sol: 'f and u negative; −22.5 cm; −0.5; −3 cm, real and inverted; beyond C.',
  scheme: [['f negative', 1], ['u negative', 1], ['Formula with signs', 1], ['v = −22.5 cm', 1], ['m = −v/u', 1], ['m = −0.5', 1], ['Height −3 cm', 1], ['Real and inverted with reasons', 1], ['R = 2f = −30 cm', 1], ['Object beyond C', 1]],
  d: 3, c: 'application', t: [5],
}), () => K.LA.v === -22.5 && K.LA.m === -0.5 && K.LA.h2 === -3 || 'conc');
add('long-shave', long({
  marks: 10, wl: null,
  stem: `A concave shaving mirror has a focal length of ${Math.abs(K.LB.f)} cm. A small pimple ${K.LB.h} mm high is ${Math.abs(K.LB.u)} cm from the mirror.\n\n(a) State whether the pimple is between F and P, or beyond F. [1]\n\n(b) Find the image distance. [2]\n\n(c) Find the magnification. [2]\n\n(d) Find the height of the image in mm. [1]\n\n(e) State the nature of the image (real or virtual, erect or inverted, enlarged or diminished). [2]\n\n(f) Why is a concave mirror, and not a plane mirror, used for shaving? [2]`,
  model: r`**(a)** The mirror's F is ${Math.abs(K.LB.f)} cm from P and the pimple is ${Math.abs(K.LB.u)} cm from P, so it is **between F and P**.` + '\n\n' + r`**(b)** $\dfrac{1}{v} = \dfrac{1}{f} - \dfrac{1}{u} = -\dfrac{1}{18} + \dfrac{1}{12} = \dfrac{1}{36}$, so $v = +${K.LB.v}$ cm.` + '\n\n' + r`**(c)** $m = -\dfrac{v}{u} = -\dfrac{${K.LB.v}}{-12} = +${K.LB.m}$.` + '\n\n' + r`**(d)** $h' = m h = ${K.LB.m} \times ${K.LB.h} = ${K.LB.h2}$ mm.` + '\n\n**(e)** **Virtual** (v positive), **erect** (m positive) and **enlarged** (m greater than 1).\n\n**(f)** A concave mirror with the face inside F gives an **enlarged, erect image**, so details of the skin are seen clearly; a plane mirror gives only an image of the same size.',
  sol: 'Between F and P; +36 cm; +3; 9 mm; virtual, erect, enlarged; enlarged erect image.',
  scheme: [['Between F and P', 1], ['Formula with signs', 1], ['v = +36 cm', 1], ['m = −v/u', 1], ['m = +3', 1], ['Height 9 mm', 1], ['Virtual', 1], ['Erect and enlarged', 1], ['Concave mirror gives an enlarged image', 1], ['Plane mirror gives the same size', 1]],
  d: 3, c: 'application', t: [3, 4, 5],
}), () => K.LB.v === 36 && K.LB.m === 3 && K.LB.h2 === 9 || 'shave');
add('long-conv', long({
  marks: 10, wl: null,
  stem: `The figure shows an object in front of a convex mirror and the image formed. The focal length of the mirror is ${K.LC.f} cm, and an object is placed ${Math.abs(K.LC.u)} cm in front of it.\n\n(a) Find the radius of curvature of the mirror. [1]\n\n(b) Find the image distance, with its sign. [2]\n\n(c) Find the magnification. [2]\n\n(d) State the position, nature and size of the image. [3]\n\n(e) Name one use of a convex mirror and give the reason for it. [2]`,
  model: r`**(a)** $R = 2f = 2 \times ${K.LC.f} = ${2 * K.LC.f}$ cm.` + '\n\n' + r`**(b)** $\dfrac{1}{v} = \dfrac{1}{f} - \dfrac{1}{u} = \dfrac{1}{40} + \dfrac{1}{120} = \dfrac{4}{120}$, so $v = +${K.LC.v}$ cm.` + '\n\n' + r`**(c)** $m = -\dfrac{v}{u} = -\dfrac{${K.LC.v}}{-120} = +${K.LC.m}$.` + '\n\n**(d)** The image is **behind the mirror**, at ' + K.LC.v + ' cm from the pole (between P and F); it is **virtual and erect**; and **diminished** to one quarter of the size of the object.\n\n**(e)** A **rear-view mirror**: it gives an erect image and a **wide field of view**.',
  sol: '80 cm; +30 cm; +0.25; virtual, erect, diminished behind the mirror between P and F; rear-view mirror, wide field of view.',
  scheme: [['R = 2f', 1], ['Formula with signs', 1], ['v = +30 cm', 1], ['m = −v/u', 1], ['m = +0.25', 1], ['Behind the mirror between P and F', 1], ['Virtual and erect', 1], ['Diminished', 1], ['A use named', 1], ['Reason: wide field of view', 1]],
  d: 3, c: 'application', t: [4, 5],
  assets: [convexFig],
}), () => K.LC.v === 30 && K.LC.m === 0.25 || 'conv');
add('long-table', long({
  marks: 10, wl: null,
  stem: `A concave mirror has a radius of curvature of ${Math.abs(K.LD.R)} cm. An object ${K.LD.h} cm tall is placed ${Math.abs(K.LD.u)} cm in front of it.\n\n(a) Find the focal length, with its sign. [1]\n\n(b) State whether the object is beyond C, between C and F, or between F and P. [1]\n\n(c) Find the image distance. [2]\n\n(d) Find the magnification. [2]\n\n(e) Find the height of the image, and say whether it is erect or inverted. [2]\n\n(f) State whether the image can be obtained on a screen, with a reason. [2]`,
  model: r`**(a)** $f = \dfrac{R}{2} = \dfrac{${K.LD.R}}{2} = ${K.LD.f}$ cm.` + '\n\n' + r`**(b)** C is ${Math.abs(K.LD.R)} cm from the mirror and F is ${Math.abs(K.LD.f)} cm from it; the object at ${Math.abs(K.LD.u)} cm is **between C and F**.` + '\n\n' + r`**(c)** $\dfrac{1}{v} = \dfrac{1}{f} - \dfrac{1}{u} = -\dfrac{1}{20} + \dfrac{1}{30} = -\dfrac{1}{60}$, so $v = ${K.LD.v}$ cm.` + '\n\n' + r`**(d)** $m = -\dfrac{v}{u} = -\dfrac{${K.LD.v}}{${K.LD.u}} = ${K.LD.m}$.` + '\n\n' + r`**(e)** $h' = m h = ${K.LD.m} \times ${K.LD.h} = ${K.LD.h2}$ cm, so the image is ${Math.abs(K.LD.h2)} cm tall and **inverted**.` + '\n\n**(f)** **Yes**, because v is negative, so the image is **real**: the reflected rays actually meet there, so it can be received on a screen ' + Math.abs(K.LD.v) + ' cm in front of the mirror.',
  sol: '−20 cm; between C and F; −60 cm; −2; 10 cm inverted; real image so it can be received on a screen.',
  scheme: [['f = −20 cm', 1], ['Between C and F', 1], ['Formula with signs', 1], ['v = −60 cm', 1], ['m = −v/u', 1], ['m = −2', 1], ['Height −10 cm', 1], ['Inverted', 1], ['v negative so real', 1], ['Can be received on a screen', 1]],
  d: 3, c: 'application', t: [1, 3, 5],
}), () => K.LD.f === -20 && K.LD.v === -60 && K.LD.m === -2 && K.LD.h2 === -10 || 'table');
add('num-focal', num({
  stem: 'A concave mirror forms a real image that is twice as tall as the object when the object is 15 cm in front of the mirror. Find the focal length of the mirror, with its sign.',
  value: K.N_FOC.f, tol: 0.1, unit: 'cm',
  sol: r`A real image is inverted, so $m = -2 = -\dfrac{v}{u}$ with $u = -15$ cm, which gives $v = ${K.N_FOC.v}$ cm. Then $\dfrac{1}{f} = \dfrac{1}{v} + \dfrac{1}{u} = -\dfrac{1}{30} - \dfrac{1}{15} = -\dfrac{1}{10}$, so $f = ${K.N_FOC.f}$ cm.`,
  scheme: [['v = −30 cm from m = −2', 0.5], [`${K.N_FOC.f} cm`, 0.5]],
  d: 4, c: 'analysis', t: [5],
}), () => K.N_FOC.f === -10 || 'f');
add('num-same', num({
  stem: 'A pin placed 24 cm in front of a concave mirror has its real image formed at the same place as the pin. Find the focal length of the mirror, with its sign.',
  value: K.N_SAME.f, tol: 0.1, unit: 'cm',
  sol: r`$u = v = -24$ cm: $\dfrac{1}{f} = \dfrac{1}{v} + \dfrac{1}{u} = -\dfrac{1}{24} - \dfrac{1}{24} = -\dfrac{1}{12}$, so $f = ${K.N_SAME.f}$ cm (the pin is at the centre of curvature).`,
  scheme: [['u = v = −24 cm substituted', 0.5], [`${K.N_SAME.f} cm`, 0.5]],
  d: 3, c: 'application', t: [3, 5],
}), () => K.N_SAME.f === -12 || 'f');
