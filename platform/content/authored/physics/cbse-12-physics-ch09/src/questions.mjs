// ch09 Ray Optics and Optical Instruments — question bank. Every numerical value is computed here (New Cartesian sign
// convention) and re-checked by the `check` functions. AR keys planned: a d a c a b.
import { mk, add, r, dec, near } from '../../cbse-12-physics-ch01/src/lib.mjs';
import { mirrorImage, lensImage } from './optics.mjs';

const { mcq, ar, tf, fill, match, num, short, long, part } = mk;
const rad = (d) => (d * Math.PI) / 180;
const todeg = (x) => (x * 180) / Math.PI;

// ================================================================ t01 spherical mirrors
add('signf-mcq', mcq({
  stem: 'In the New Cartesian sign convention, with light incident from the left, which is correct?',
  right: 'The focal length of a concave mirror is negative and that of a convex mirror is positive',
  wrong: ['The focal length of a concave mirror is positive and that of a convex mirror is negative', 'Both mirrors have positive focal lengths', 'The sign of f depends on where the object is'],
  sol: 'The focus of a concave mirror is in front (against the incident light); that of a convex mirror is behind — option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
const m1 = mirrorImage(-36, -24);
add('concave-num', num({
  stem: 'A candle flame stands 36 cm in front of a concave mirror whose radius of curvature is 48 cm. Where must a screen be placed to catch a sharp image? Give v with its sign, in cm.',
  value: m1.v, tol: 0.2, unit: 'cm',
  sol: r`$f = R/2 = -24$ cm and $u = -36$ cm. $\dfrac{1}{v} = \dfrac{1}{f} - \dfrac{1}{u} = -\dfrac{1}{24} + \dfrac{1}{36} = -\dfrac{1}{72}$, so $v = ${dec(m1.v, 2)}$ cm: the screen goes 72 cm in front of the mirror (real image).`,
  scheme: [['f = R/2 = −24 cm', 0.5], ['v = −72 cm', 0.5]],
  d: 2, c: 'application', t: [1],
}), (q) => near(m1.v, q.answer.value) || 'v');
const m2 = mirrorImage(-10, -15);
add('mag-mcq', mcq({
  stem: 'An object is 10 cm in front of a concave mirror of focal length 15 cm. The image is',
  right: 'virtual, erect and 3 times enlarged, 30 cm behind the mirror',
  wrong: ['real, inverted and 3 times enlarged, 30 cm in front', 'virtual, erect and diminished, 6 cm behind', 'at infinity'],
  sol: r`$\dfrac{1}{v} = -\dfrac{1}{15} + \dfrac{1}{10} = \dfrac{1}{30}$: $v = +30$ cm, $m = -\dfrac{v}{u} = -\dfrac{30}{-10} = 3$ — option (@K).`,
  d: 3, c: 'application', t: [1],
}), () => near(m2.v, 30) && near(m2.m, 3) || 'm2');
const m3 = mirrorImage(-50, 25);
add('convex-num', num({
  stem: 'An object is 50 cm in front of a convex mirror of focal length 25 cm. Find the image distance, in cm (3 significant figures).',
  value: Number(dec(m3.v, 3)), tol: 0.1, unit: 'cm',
  sol: r`$\dfrac{1}{v} = \dfrac{1}{25} + \dfrac{1}{50} = \dfrac{3}{50}$, so $v = \dfrac{50}{3} = ${dec(m3.v, 3)}$ cm (virtual, behind the mirror).`,
  scheme: [['v = +16.7 cm', 1]],
  d: 2, c: 'understanding', t: [1],
}), (q) => near(m3.v, q.answer.value) || 'v3');
add('shaving-mcq', mcq({
  stem: 'A dentist’s or shaving mirror gives an enlarged, upright image of the face or tooth. It is',
  right: 'a concave mirror, with the object inside its focal length',
  wrong: ['a convex mirror, with the object anywhere', 'a concave mirror, with the object beyond its centre of curvature', 'a plane mirror'],
  sol: 'Only a concave mirror with the object between P and F gives a virtual, erect, enlarged image — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('rearview-mcq', mcq({
  stem: 'Convex mirrors are used as rear-view mirrors in vehicles because they',
  right: 'always give an erect, diminished image and a wide field of view',
  wrong: ['give an enlarged image of following vehicles', 'form real images on the windscreen', 'have no focal point'],
  sol: 'A convex mirror always forms a virtual, erect, diminished image, so a wide area fits in a small mirror — option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
add('mirror-ar', ar({
  a: 'A convex mirror can never form a real image of a real object.',
  r: 'For a convex mirror f > 0 and for a real object u < 0, so 1/v = 1/f − 1/u is always positive.',
  key: 'a',
  sol: 'Both true; v > 0 means the image is always behind the mirror (virtual), which R proves — option (a).',
  d: 3, c: 'analysis', t: [1],
}), () => { const v = mirrorImage(-37, 20).v; return v > 0 || 'v'; });
const fm = { u: -30, v: -60 };
fm.f = 1 / (1 / fm.v + 1 / fm.u);
add('findf-num', num({
  stem: 'A concave mirror forms a real image 60 cm in front of it of an object placed 30 cm in front of it. Find the magnitude of its focal length, in cm.',
  value: Math.abs(fm.f), tol: 0.2, unit: 'cm',
  sol: r`$\dfrac{1}{f} = \dfrac{1}{v} + \dfrac{1}{u} = -\dfrac{1}{60} - \dfrac{1}{30} = -\dfrac{3}{60}$, so $f = -\dfrac{60}{3} = ${dec(fm.f, 2)}$ cm and $|f| = 20$ cm.`,
  scheme: [['Signs u = −30, v = −60', 1], ['|f| = 20 cm', 1]],
  marks: 2, d: 2, c: 'application', t: [1],
}), (q) => near(Math.abs(fm.f), q.answer.value) || 'f');
add('plane-tf', tf({
  stem: 'A plane mirror can be thought of as a spherical mirror of infinite radius of curvature, so its focal length is infinite.',
  key: 't',
  sol: 'True. With R → ∞, f = R/2 → ∞; the mirror formula then gives v = −u (image as far behind as the object is in front).',
  d: 2, c: 'understanding', t: [1],
}));
add('mirror-short', short({
  marks: 2,
  stem: 'Using the mirror formula, show why a convex mirror always forms a diminished image of a real object.',
  model: r`For a convex mirror $f > 0$ and $u < 0$, so $\dfrac{1}{v} = \dfrac{1}{f} - \dfrac{1}{u} = \dfrac{1}{f} + \dfrac{1}{|u|}$. This is larger than $\dfrac{1}{|u|}$, so $v < |u|$. Then $m = -\dfrac{v}{u} = \dfrac{v}{|u|}$ lies between 0 and 1: the image is **erect and diminished** (and virtual, since v > 0).`,
  sol: 'Compare v with |u| from the formula.',
  scheme: [['1/v = 1/f + 1/|u| > 1/|u|, so v < |u|', 1], ['0 < m < 1: erect, diminished', 1]],
  d: 3, c: 'application', t: [1], wl: null,
}));

// ================================================================ t02 refraction and TIR
add('tirAR', ar({
  a: 'Total internal reflection can occur when light passes from air into glass.',
  r: 'Glass has a higher refractive index than air.',
  key: 'd',
  sol: 'R is true. A is false: TIR needs light travelling from the denser to the rarer medium (glass to air), not air to glass — option (d).',
  d: 2, c: 'understanding', t: [2],
}));
const cr = todeg(Math.asin(1 / 1.6));
add('crit-num', num({
  stem: 'Find the critical angle for light going from glass of refractive index 1.6 into air, in degrees (3 significant figures).',
  value: Number(dec(cr, 3)), tol: 0.2, unit: '°',
  sol: r`$\sin C = \dfrac{1}{1.6} = 0.625$, so $C = \sin^{-1}(0.625) = ${dec(cr, 3)}$ degrees.`,
  scheme: [['sin C = 1/n, C ≈ 38.7°', 1]],
  d: 1, c: 'understanding', t: [2],
}), (q) => near(cr, q.answer.value) || 'cr');
const sn = todeg(Math.asin(Math.sin(rad(45)) / 1.5));
add('snell-num', num({
  stem: 'A ray in air strikes glass (n = 1.5) at an angle of incidence of 45°. Find the angle of refraction, in degrees (3 significant figures).',
  value: Number(dec(sn, 3)), tol: 0.2, unit: '°',
  sol: r`$\sin r = \dfrac{\sin 45^\circ}{1.5} = \dfrac{0.707}{1.5} \approx 0.471$, so $r = \sin^{-1}(0.471) = ${dec(sn, 3)}$ degrees.`,
  scheme: [['Snell’s law', 0.5], ['r ≈ 28.1°', 0.5]],
  d: 2, c: 'understanding', t: [2],
}), (q) => near(sn, q.answer.value) || 'sn');
const ap = 2 / 1.33;
add('apparent-num', num({
  stem: 'A water tank is 2.0 m deep (n = 1.33). Viewed from directly above, how deep does it appear? Answer in metres (3 significant figures).',
  value: Number(dec(ap, 3)), tol: 0.01, unit: 'm',
  sol: r`Apparent depth $= \dfrac{\text{real depth}}{n} = \dfrac{2.0}{1.33} \approx ${dec(ap, 3)}$ m.`,
  scheme: [['Apparent depth = real/n', 1], ['≈ 1.50 m', 1]],
  marks: 2, d: 2, c: 'application', t: [2],
}), (q) => near(ap, q.answer.value) || 'ap');
add('speed-mcq', mcq({
  stem: 'The speed of light in glass of refractive index 1.5 is',
  right: '$2.0 \\times 10^{8}$ m s$^{-1}$',
  wrong: ['$4.5 \\times 10^{8}$ m s$^{-1}$', '$3.0 \\times 10^{8}$ m s$^{-1}$', '$1.5 \\times 10^{8}$ m s$^{-1}$'],
  sol: r`$v = \dfrac{c}{n} = \dfrac{3.0 \times 10^{8}}{1.5} = 2.0 \times 10^{8}$ m s$^{-1}$ — option (@K).`,
  d: 1, c: 'understanding', t: [2],
}));
add('mirage-mcq', mcq({
  stem: 'On a hot summer afternoon, a highway in Rajasthan seems to have pools of water on it. This mirage is due to',
  right: 'total internal reflection of light from the sky in the hot, less dense air near the road',
  wrong: ['reflection of light from oil on the road', 'diffraction of light by the hot road', 'dispersion of sunlight'],
  sol: 'Air near the hot road is rarer; light from the sky bending through layers of decreasing index meets one at more than the critical angle and is totally reflected upwards — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('diamond-mcq', mcq({
  stem: 'A well-cut diamond sparkles much more than a glass imitation of the same shape mainly because diamond has',
  right: 'a much smaller critical angle, so light is totally reflected many times inside',
  wrong: ['a larger critical angle, so more light escapes', 'a lower refractive index', 'a rough surface that scatters light'],
  sol: 'Diamond’s n ≈ 2.42 gives C ≈ 24°; most light striking inner faces is totally reflected before leaving through the top — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('fibre-mcq', mcq({
  stem: 'In an optical fibre, the refractive index of the core must be',
  right: 'greater than that of the cladding',
  wrong: ['less than that of the cladding', 'equal to that of the cladding', 'less than that of air'],
  sol: 'TIR at the core–cladding boundary needs light going from the denser core to the rarer cladding — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('critn-mcq', mcq({
  stem: 'The critical angle for a transparent material in air is 30°. Its refractive index is',
  right: '2.0',
  wrong: ['1.5', '0.5', '1.2'],
  sol: r`$n = \dfrac{1}{\sin C} = \dfrac{1}{\sin 30^\circ} = 2$ — option (@K).`,
  d: 2, c: 'application', t: [2],
}), () => near(1 / Math.sin(rad(30)), 2) || 'n');
add('prismTIR-mcq', mcq({
  stem: 'A right-angled isosceles glass prism is used in binoculars to turn light through 90° by total internal reflection at its hypotenuse face, where the angle of incidence is 45°. This works only if the refractive index of the glass is',
  right: 'greater than √2 (about 1.41)',
  wrong: ['less than √2', 'exactly 1', 'greater than 2'],
  sol: r`TIR needs $45^\circ > C$, i.e. $\sin C = \dfrac{1}{n} < \sin 45^\circ$, so $n > \sqrt{2}$ — option (@K).`,
  d: 4, c: 'application', t: [2],
}), () => near(1 / Math.sin(rad(45)), Math.SQRT2) || 'n');
const gw = todeg(Math.asin(1.33 / 1.5));
add('liquid-mcq', mcq({
  stem: 'Light travels from glass (n = 1.50) into water (n = 1.33). The critical angle at the glass–water surface is about',
  right: '62.5°',
  wrong: ['41.8°', '48.8°', 'There is no critical angle for this pair'],
  sol: r`$\sin C = \dfrac{1.33}{1.50} \approx 0.887$, so $C \approx ${dec(gw, 3)}^\circ$ — larger than for glass–air because the indices are closer — option (@K).`,
  d: 3, c: 'application', t: [2],
}), () => near(gw, 62.5, 0.005) || `gw ${gw}`);
add('tir-short', short({
  marks: 2,
  stem: 'What is total internal reflection? State the two conditions needed for it.',
  model: 'When light travelling in a **denser** medium meets a boundary with a rarer medium at an angle of incidence **greater than the critical angle**, no light is refracted: **all** of it is reflected back into the denser medium. Conditions: (1) light goes from denser to rarer; (2) the angle of incidence exceeds the critical angle.',
  sol: 'Definition plus two conditions.',
  scheme: [['Definition', 1], ['Both conditions', 1]],
  d: 1, c: 'understanding', t: [2],
}));
add('periscope-short', short({
  marks: 2,
  stem: 'Why are right-angled glass prisms, rather than plane mirrors, used to turn light in good periscopes and binoculars?',
  model: 'At the hypotenuse face the light meets the glass–air boundary at **45°**, more than the critical angle (about 42° for glass), so it is **totally** reflected: **100%** of the light is reflected, with no silvering to tarnish. A plane mirror absorbs some light and its silvering degrades, and a back-silvered mirror gives faint double images.',
  sol: 'TIR reflects all the light.',
  scheme: [['45° exceeds the critical angle: TIR', 1], ['Total reflection, brighter, no tarnishing silver', 1]],
  d: 3, c: 'application', t: [2],
}));
const fb = { n1: 1.55, n2: 1.45 };
fb.C = todeg(Math.asin(fb.n2 / fb.n1));
add('fibre-short3', short({
  marks: 3,
  stem: 'An optical fibre has a core of index 1.55 and cladding of index 1.45. (a) Find the critical angle at the core–cladding boundary. (b) A ray inside the core makes 15° with the fibre axis. Will it be guided along the fibre? Explain.',
  model: r`(a) $\sin C = \dfrac{1.45}{1.55} \approx 0.935$, so $C \approx ${dec(fb.C, 3)}^\circ$.
(b) A ray at 15° to the axis meets the wall (parallel to the axis) at an angle of incidence of $90^\circ - 15^\circ = 75^\circ$. This is **more than** the critical angle (about 69.3°), so it is **totally reflected** each time and is guided along the fibre.`,
  sol: 'Find C; angle of incidence = 90° − angle to axis.',
  scheme: [['C ≈ 69.3°', 1], ['Angle of incidence 75°', 1], ['75° > C: guided by TIR', 1]],
  d: 4, c: 'application', t: [2], wl: null,
}), () => near(fb.C, 69.3, 0.002) && 75 > fb.C || `fb ${fb.C}`);

// ================================================================ t03 spherical surfaces and lenses
add('power-num', num({
  stem: 'Find the power of a concave lens of focal length 25 cm, in dioptres (with sign).',
  value: -4, tol: 0.05, unit: 'D',
  sol: r`$f = -0.25$ m, so $P = \dfrac{1}{f} = \dfrac{1}{-0.25} = -4$ D.`,
  scheme: [['P = 1/f in m = −4.0 D', 1]],
  d: 1, c: 'understanding', t: [3],
}), (q) => near(-4, q.answer.value) || 'P');
const l1 = lensImage(-10, 15);
add('lens-num', num({
  stem: 'An object is 10 cm from a convex lens of focal length 15 cm. Find the image distance v, with its sign, in cm.',
  value: l1.v, tol: 0.2, unit: 'cm',
  sol: r`$\dfrac{1}{v} = \dfrac{1}{f} + \dfrac{1}{u} = \dfrac{1}{15} - \dfrac{1}{10} = -\dfrac{1}{30}$, so $v = ${dec(l1.v, 2)}$ cm: a virtual image on the object’s side (magnifying glass).`,
  scheme: [['Lens formula with signs', 0.5], ['v = −30 cm', 0.5]],
  d: 2, c: 'understanding', t: [3],
}), (q) => near(l1.v, q.answer.value) || 'l1');
add('twoF-mcq', mcq({
  stem: 'An object is placed at 2F in front of a convex lens. The image is',
  right: 'at 2F on the other side, real, inverted and the same size',
  wrong: ['at F on the other side, real and point-sized', 'virtual, erect and enlarged', 'at infinity'],
  sol: r`With $u = -2f$: $\dfrac{1}{v} = \dfrac{1}{f} - \dfrac{1}{2f} = \dfrac{1}{2f}$, so $v = 2f$ and $m = -1$ — option (@K).`,
  d: 1, c: 'understanding', t: [3],
}), () => near(lensImage(-40, 20).v, 40) || '2F');
const pc = 1 / (0.5 * (1 / 15));
add('plano-num', num({
  stem: 'A plano-convex lens of glass (n = 1.5) has a curved surface of radius 15 cm. Find its focal length, in cm.',
  value: pc, tol: 0.2, unit: 'cm',
  sol: r`With $R_1 = +15$ cm and $R_2 = \infty$: $\dfrac{1}{f} = (1.5 - 1)\left(\dfrac{1}{15} - 0\right) = \dfrac{1}{30}$, so $f = ${dec(pc, 2)}$ cm.`,
  scheme: [['R₂ = ∞ for the flat face', 0.5], ['f = 30 cm', 0.5]],
  d: 2, c: 'understanding', t: [3],
}), (q) => near(pc, q.answer.value) || 'pc');
const bc = 1 / (0.6 * (-1 / 20 - 1 / 20));
add('biconcave-num', num({
  stem: 'A biconcave lens of glass with n = 1.6 has both surfaces of radius 20 cm. Find its focal length, with sign, in cm (3 significant figures).',
  value: Number(dec(bc, 3)), tol: 0.1, unit: 'cm',
  sol: r`$R_1 = -20$ cm, $R_2 = +20$ cm: $\dfrac{1}{f} = (1.6 - 1)\left(-\dfrac{1}{20} - \dfrac{1}{20}\right) = -0.06$, so $f = \dfrac{1}{-0.06} = ${dec(bc, 3)}$ cm (diverging).`,
  scheme: [['Signs of R₁ and R₂', 1], ['f ≈ −16.7 cm', 1]],
  marks: 2, d: 3, c: 'application', t: [3],
}), (q) => near(bc, q.answer.value) || 'bc');
add('water-ar', ar({
  a: 'A convex glass lens (n = 1.5) has a longer focal length when it is immersed in water than in air.',
  r: 'In water, the factor (n − 1) in the lens maker’s formula is replaced by (n_glass/n_water − 1), which is smaller.',
  key: 'a',
  sol: 'Both true; (1.5/1.33 − 1) ≈ 0.13 is much less than 0.5, so 1/f is smaller and f longer (about four times), as R explains — option (a).',
  d: 3, c: 'application', t: [3],
}), () => (1.5 / 1.33 - 1 < 0.5) || 'w');
const cb = { P: 4 - 2.5 };
cb.f = 100 / cb.P;
add('combo-num', num({
  stem: 'A convex lens of power +4.0 D is in contact with a concave lens of power −2.5 D. Find the focal length of the combination, in cm (3 significant figures).',
  value: Number(dec(cb.f, 3)), tol: 0.3, unit: 'cm',
  sol: r`$P = 4.0 - 2.5 = 1.5$ D, so $F = \dfrac{1}{1.5} \approx 0.667$ m, i.e. $F = \dfrac{100}{1.5} = ${dec(cb.f, 3)}$ cm (converging).`,
  scheme: [['P = +1.5 D', 1], ['F ≈ 66.7 cm', 1]],
  marks: 2, d: 2, c: 'application', t: [3],
}), (q) => near(cb.f, q.answer.value) || 'cb');
const ss = { n1: 1, n2: 1.5, u: -40, R: -20 };
ss.v = ss.n2 / ((ss.n2 - ss.n1) / ss.R + ss.n1 / ss.u);
add('surface-num', num({
  stem: 'A point object in air is 40 cm in front of a CONCAVE spherical glass surface (n = 1.5) of radius 20 cm. Find the image distance v, with sign, in cm.',
  value: ss.v, tol: 0.2, unit: 'cm',
  sol: r`$R = -20$ cm (centre on the incident side). $\dfrac{1.5}{v} = \dfrac{1.5 - 1}{-20} + \dfrac{1}{-40} = -0.025 - 0.025 = -0.05$, so $v = ${dec(ss.v, 2)}$ cm: a virtual image in front of the surface.`,
  scheme: [['Sign of R', 1], ['v = −30 cm, virtual', 1]],
  marks: 2, d: 3, c: 'application', t: [3],
}), (q) => near(ss.v, q.answer.value) || 'ss');
add('samen-mcq', mcq({
  stem: 'A glass lens (n = 1.5) is immersed in a transparent liquid that also has refractive index 1.5. The lens',
  right: 'behaves like a flat sheet of glass: it neither converges nor diverges light',
  wrong: ['becomes a stronger converging lens', 'becomes a diverging lens', 'reflects all light that enters it'],
  sol: 'The relative index is 1, so (n_rel − 1) = 0 and 1/f = 0: no refraction at its surfaces — option (@K).',
  d: 3, c: 'application', t: [3],
}));
add('cut-mcq', mcq({
  stem: 'A thin symmetric biconvex lens of focal length f is cut into two equal plano-convex halves by a plane perpendicular to its axis. The focal length of each half is',
  right: '2f',
  wrong: ['f', 'f/2', '4f'],
  sol: r`For the whole lens $\dfrac{1}{f} = (n - 1)\dfrac{2}{R}$; each half has one curved face: $\dfrac{1}{f'} = (n - 1)\dfrac{1}{R} = \dfrac{1}{2f}$ — option (@K).`,
  d: 4, c: 'analysis', t: [3],
}));
add('half-tf', tf({
  stem: 'If the lower half of a convex lens is covered with black paper, only the upper half of the image is formed.',
  key: 'f',
  sol: 'False. Every part of the lens forms a complete image; covering half the lens lets through less light, so the full image is formed but is dimmer.',
  d: 2, c: 'application', t: [3],
}));
const ls = lensImage(-24, 16);
add('lens-short3', short({
  marks: 3,
  stem: 'An object 2.0 cm tall stands 24 cm in front of a convex lens of focal length 16 cm. Find the position, size and nature of the image.',
  model: r`$\dfrac{1}{v} = \dfrac{1}{16} - \dfrac{1}{24} = \dfrac{1}{48}$, so $v = ${dec(ls.v, 2)}$ cm (on the far side). $m = \dfrac{v}{u} = \dfrac{48}{-24} = ${dec(ls.m, 2)}$, so the image is $2 \times 2.0 = 4$ cm tall. It is **real, inverted and magnified** (the object is between F and 2F).`,
  sol: 'Lens formula, then m = v/u.',
  scheme: [['v = +48 cm', 1], ['m = −2, height 4.0 cm', 1], ['Real, inverted, magnified', 1]],
  d: 3, c: 'application', t: [3], wl: null,
}), () => near(ls.v, 48) && near(ls.m, -2) || 'ls');

// ================================================================ t04 prism
add('mindev-mcq', mcq({
  stem: 'When a prism is set at the angle of minimum deviation,',
  right: 'the ray inside the prism travels parallel to its base and i = e',
  wrong: ['the angle of incidence is zero', 'the emergent ray grazes the second face', 'the deviation equals the prism angle'],
  sol: 'At minimum deviation the path is symmetric: r₁ = r₂ = A/2 and i = e — option (@K).',
  d: 1, c: 'understanding', t: [4],
}));
const pn = Math.sin(rad(50)) / Math.sin(rad(30));
add('prismn-num', num({
  stem: 'A prism of angle 60° gives a minimum deviation of 40°. Find the refractive index of its glass (3 significant figures).',
  value: Number(dec(pn, 3)), tol: 0.005, unit: null,
  sol: r`$n = \dfrac{\sin\frac{60 + 40}{2}}{\sin 30^\circ} = \dfrac{\sin 50^\circ}{0.5} \approx ${dec(pn, 3)}$.`,
  scheme: [['Formula with (A + δm)/2 = 50°', 0.5], ['n ≈ 1.53', 0.5]],
  d: 2, c: 'application', t: [4],
}), (q) => near(pn, q.answer.value) || 'pn');
add('thin-mcq', mcq({
  stem: 'A thin prism of angle 5.0° is made of glass of refractive index 1.5. The deviation it produces is about',
  right: '2.5°',
  wrong: ['7.5°', '5.0°', '1.5°'],
  sol: r`For a thin prism $\delta \approx (n - 1)A = 0.5 \times 5.0 = 2.5^\circ$ — option (@K).`,
  d: 1, c: 'understanding', t: [4],
}));
add('relation-mcq', mcq({
  stem: 'For refraction through a prism of angle A, the angles of refraction at the two faces, r₁ and r₂, satisfy',
  right: 'r₁ + r₂ = A',
  wrong: ['r₁ − r₂ = A', 'r₁ + r₂ = 180° − A', 'r₁ = r₂ always'],
  sol: 'The normals to the two faces meet at an angle 180° − A, so in the triangle formed r₁ + r₂ = A — option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('prismdev-short', short({
  marks: 2,
  stem: 'A graph of deviation against angle of incidence for a prism is U-shaped. Explain why, apart from the minimum, each value of deviation occurs at two angles of incidence.',
  model: 'Light paths are **reversible**: a ray entering at angle i and leaving at e has the same deviation as one entering at e and leaving at i. So each deviation (except the minimum) occurs for **two** angles of incidence, i and e. At the minimum the two coincide (**i = e**), giving the single lowest point of the U.',
  sol: 'Reversibility swaps i and e.',
  scheme: [['Reversibility: i and e can be interchanged', 1], ['They coincide only at minimum deviation', 1]],
  d: 3, c: 'understanding', t: [4],
}));
const p3 = { n: Math.SQRT2, A: 60 };
p3.dm = 2 * todeg(Math.asin(p3.n * Math.sin(rad(30)))) - p3.A;
add('prism-short3', short({
  marks: 3,
  stem: 'A prism of angle 60° has refractive index √2. Find its angle of minimum deviation and the angle of incidence at which it occurs.',
  model: r`At minimum deviation $r = A/2 = 30^\circ$, so $\sin i = n\sin r = \sqrt2 \times 0.5 = 0.707$ and $i = 45^\circ$. Then $\delta_m = 2i - A = 90^\circ - 60^\circ = ${dec(p3.dm, 2)}^\circ$. (Check: $\sin\frac{60 + 30}{2}/\sin 30^\circ = \sqrt2$.)`,
  sol: 'r = A/2, Snell, δm = 2i − A.',
  scheme: [['r = 30°', 1], ['i = 45°', 1], ['δm = 30°', 1]],
  d: 3, c: 'application', t: [4], wl: null,
}), () => near(p3.dm, 30) || 'p3');

// ================================================================ t05 optical instruments
add('objective-mcq', mcq({
  stem: 'The objective of a compound microscope has a very short focal length so that it',
  right: 'forms a large real image of a tiny object placed just outside its focus',
  wrong: ['forms a virtual image for the eyepiece', 'collects light from very distant objects', 'reduces the size of the image'],
  sol: 'With the object just beyond a short focus, v is large compared with |u|, giving a large linear magnification v/u — option (@K).',
  d: 2, c: 'understanding', t: [5],
}));
add('tele-num', num({
  stem: 'An astronomical telescope has an objective of focal length 120 cm and an eyepiece of focal length 4.0 cm. Find its magnifying power in normal adjustment.',
  value: 30, tol: 0.2, unit: null,
  sol: r`$m = \dfrac{f_o}{f_e} = \dfrac{120}{4.0} = 30$.`,
  scheme: [['m = fo/fe = 30', 1]],
  d: 1, c: 'understanding', t: [5],
}), (q) => near(30, q.answer.value) || 'm');
add('simple-num', num({
  stem: 'Find the magnifying power of a simple microscope of focal length 2.5 cm when the image is formed at the near point (D = 25 cm).',
  value: 1 + 25 / 2.5, tol: 0.1, unit: null,
  sol: r`$m = 1 + \dfrac{D}{f} = 1 + \dfrac{25}{2.5} = 11$.`,
  scheme: [['m = 1 + D/f = 11', 1]],
  d: 1, c: 'understanding', t: [5],
}), (q) => near(11, q.answer.value) || 'm');
const cm = (16 / 0.5) * (25 / 2.5);
add('compound-num', num({
  stem: 'A compound microscope has an objective of focal length 0.50 cm, an eyepiece of focal length 2.5 cm and a tube length of 16 cm. Estimate its magnifying power with the final image at infinity.',
  value: cm, tol: 2, unit: null,
  sol: r`$m \approx \dfrac{L}{f_o}\cdot\dfrac{D}{f_e} = \dfrac{16}{0.50} \times \dfrac{25}{2.5} = 32 \times 10 = 320$.`,
  scheme: [['m_o ≈ 32, m_e = 10', 1], ['m ≈ 320', 1]],
  marks: 2, d: 2, c: 'application', t: [5],
}), (q) => near(cm, q.answer.value) || 'cm');
add('telelength-mcq', mcq({
  stem: 'A telescope with lenses of focal lengths 120 cm and 5.0 cm is set in normal adjustment. The distance between the lenses is',
  right: '125 cm',
  wrong: ['115 cm', '24 cm', '600 cm'],
  sol: 'In normal adjustment the image formed by the objective is at the focus of both lenses: L = fo + fe = 125 cm — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('reverse-mcq', mcq({
  stem: 'A student looks through a telescope from the wrong end (through the objective). Distant objects now appear',
  right: 'smaller, with angular magnification fe/fo (less than 1)',
  wrong: ['larger, with magnification fo/fe', 'the same size', 'larger, with magnification fo + fe'],
  sol: 'The roles of the lenses swap: magnification becomes fe/fo < 1, so objects look smaller and farther away — option (@K).',
  d: 3, c: 'analysis', t: [5],
}));
add('aperture-mcq', mcq({
  stem: 'Astronomical telescopes are built with objectives of very large diameter mainly to',
  right: 'collect more light and resolve finer detail',
  wrong: ['increase the magnifying power fo/fe', 'shorten the tube', 'remove the need for an eyepiece'],
  sol: 'Light-gathering power grows with the area of the objective, and a wider aperture resolves closer stars; magnification depends on the focal lengths — option (@K).',
  d: 2, c: 'understanding', t: [5],
}));
add('reflect-ar', ar({
  a: 'A reflecting telescope does not suffer from chromatic aberration.',
  r: 'A mirror reflects light of all wavelengths in the same way.',
  key: 'a',
  sol: 'Both true; since reflection does not depend on wavelength, all colours focus at the same point, which explains A — option (a).',
  d: 2, c: 'understanding', t: [5],
}));
add('eyeD-ar', ar({
  a: 'A simple microscope gives a larger magnifying power when the image is formed at the near point than when it is at infinity.',
  r: 'The near point of a normal eye is about 25 cm.',
  key: 'b',
  sol: 'Both are true, but R alone does not explain A. A follows from m = 1 + D/f (near point) compared with m = D/f (infinity) — option (b).',
  d: 3, c: 'understanding', t: [5],
}));
add('micro-short', short({
  marks: 2,
  stem: 'Why should both the objective and the eyepiece of a compound microscope have short focal lengths?',
  model: 'The magnifying power is about $\\dfrac{L}{f_o}\\cdot\\dfrac{D}{f_e}$. A **short f_o** makes the objective’s image much larger than the object (large $L/f_o$), and a **short f_e** makes the eyepiece a stronger magnifier (large $D/f_e$). Both increase the total magnification.',
  sol: 'm ∝ 1/(fo fe).',
  scheme: [['m ≈ (L/fo)(D/fe)', 1], ['Short fo and fe both increase m', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('reflecting-short', short({
  marks: 2,
  stem: 'Give two advantages of a reflecting telescope over a refracting telescope.',
  model: 'Any two: **no chromatic aberration** (mirrors reflect all colours alike); a **paraboloidal** mirror removes spherical aberration; a mirror can be **supported over its whole back**, so very large apertures are possible; a large mirror is **lighter and cheaper** than a lens of the same size.',
  sol: 'List two.',
  scheme: [['First advantage', 1], ['Second advantage', 1]],
  d: 1, c: 'recall', t: [5],
}));
const tn = { fo: 100, fe: 5, D: 25 };
tn.m = (tn.fo / tn.fe) * (1 + tn.fe / tn.D);
add('telescope-short3', short({
  marks: 3,
  stem: 'A telescope has an objective of focal length 100 cm and an eyepiece of focal length 5.0 cm. Find its magnifying power (a) in normal adjustment, (b) when the final image is at the near point, 25 cm from the eye. (c) Which setting gives the larger magnification?',
  model: r`(a) $m = \dfrac{f_o}{f_e} = \dfrac{100}{5.0} = 20$.
(b) $m = \dfrac{f_o}{f_e}\left(1 + \dfrac{f_e}{D}\right) = 20 \times \left(1 + \dfrac{5.0}{25}\right) = ${dec(tn.m, 2)}$.
(c) The near-point setting gives the larger magnification (24 against 20), though normal adjustment is more comfortable for long viewing.`,
  sol: 'fo/fe; then multiply by (1 + fe/D).',
  scheme: [['(a) 20', 1], ['(b) 24', 1], ['(c) near point larger', 1]],
  d: 3, c: 'application', t: [5], wl: null,
}), () => near(tn.m, 24) || 'tn');

// ================================================================ long answers (5 marks)
add('tir-long', long({
  stem: '(a) Explain total internal reflection and derive the relation between the critical angle and the refractive index for light going from a medium into air. (b) Explain how an optical fibre transmits light, and why its cladding has a lower refractive index than its core. (c) Find the critical angle for diamond (n = 2.42) and explain why diamonds sparkle.',
  model: r`(a) When light passes from a denser medium (index n) into air, it bends away from the normal. As i increases, r reaches 90° at the **critical angle** C; for larger i no light is refracted and all of it is reflected — **total internal reflection**. Snell’s law at the critical angle: $n\sin C = 1 \times \sin 90^\circ$, so $\sin C = \dfrac{1}{n}$.

(b) A fibre has a thin glass **core** surrounded by **cladding** of lower index. Light entering near the axis meets the core–cladding boundary at more than the critical angle ($\sin C = n_\text{clad}/n_\text{core}$), so it is totally reflected again and again and travels along the fibre with little loss, even round gentle bends. The cladding must be optically **rarer** so that TIR can occur at the boundary (and it protects the core surface).

(c) $\sin C = \dfrac{1}{2.42} \approx 0.413$, so $C \approx ${dec(todeg(Math.asin(1 / 2.42)), 3)}^\circ$. With such a small critical angle, light entering a cut diamond is totally reflected many times at its faces and leaves mainly through the top, so the stone sparkles.`,
  sol: 'Snell at r = 90°; fibre by repeated TIR; small C for diamond.',
  scheme: [['TIR explained with conditions', 1], ['sin C = 1/n derived', 1], ['Fibre: repeated TIR at core–cladding boundary', 1], ['Why cladding has lower n', 1], ['C ≈ 24.4° and sparkle explained', 1]],
  d: 3, c: 'understanding', t: [2], wl: null,
}), () => near(todeg(Math.asin(1 / 2.42)), 24.4, 0.002) || 'diamond');
const lm = { n: 1.5, R1: 30, R2: -60 };
lm.f = 1 / ((lm.n - 1) * (1 / lm.R1 - 1 / lm.R2));
add('lensmaker-long', long({
  stem: '(a) Using the formula for refraction at a spherical surface, derive the lens maker’s formula for a thin lens in air. (b) A biconvex lens of glass (n = 1.5) has radii of curvature 30 cm and 60 cm. Find its focal length and power. (c) What would happen to its focal length in a liquid of refractive index 1.5?',
  model: r`(a) For the first surface (radius $R_1$), light goes from air ($n_1 = 1$) into glass ($n_2 = n$): $\dfrac{n}{v_1} - \dfrac{1}{u} = \dfrac{n - 1}{R_1}$. The image $I_1$ acts as the object for the second surface (radius $R_2$), from glass into air: $\dfrac{1}{v} - \dfrac{n}{v_1} = \dfrac{1 - n}{R_2}$ (thin lens: distances measured from the same centre). Adding: $\dfrac{1}{v} - \dfrac{1}{u} = (n - 1)\left(\dfrac{1}{R_1} - \dfrac{1}{R_2}\right)$. For an object at infinity $v = f$, so $\dfrac{1}{f} = (n - 1)\left(\dfrac{1}{R_1} - \dfrac{1}{R_2}\right)$.

(b) $R_1 = +30$ cm, $R_2 = -60$ cm: $\dfrac{1}{f} = 0.5\left(\dfrac{1}{30} + \dfrac{1}{60}\right) = 0.5 \times \dfrac{3}{60} = \dfrac{1}{40}$, so $f = ${dec(lm.f, 2)}$ cm and $P = \dfrac{1}{0.40} = 2.5$ D.

(c) The relative index becomes 1.5/1.5 = 1, so $1/f = 0$: the focal length becomes **infinite** and the lens has no focusing effect.`,
  sol: 'Two surfaces, add, set u = −∞.',
  scheme: [['First surface equation', 1], ['Second surface equation with I₁ as object', 1], ['Lens maker’s formula', 1], ['f = 40 cm, P = 2.5 D', 1], ['Infinite f in the liquid', 1]],
  d: 3, c: 'understanding', t: [3], wl: null,
}), () => near(lm.f, 40) || 'lm');
const pl = { A: 60, dm: 38 };
pl.n = Math.sin(rad((pl.A + pl.dm) / 2)) / Math.sin(rad(pl.A / 2));
pl.i = (pl.A + pl.dm) / 2;
add('prism-long', long({
  stem: '(a) Trace the path of a ray through a prism and show that r₁ + r₂ = A and δ = i + e − A. (b) Derive the relation for the refractive index in terms of A and the angle of minimum deviation. (c) A 60° prism gives a minimum deviation of 38°. Find its refractive index and the angle of incidence at minimum deviation.',
  model: r`(a) A ray enters face AB at incidence $i$, refracts at $r_1$, meets face AC at $r_2$ and emerges at $e$. The normals at the two faces meet at a point N; in quadrilateral A–(entry)–N–(exit) the angles at the faces are 90°, so the angle at N is $180^\circ - A$. In the triangle formed by the ray inside and the two normals, $r_1 + r_2 + (180^\circ - A) = 180^\circ$, so $r_1 + r_2 = A$. The deviations at the faces are $(i - r_1)$ and $(e - r_2)$, so $\delta = i + e - (r_1 + r_2) = i + e - A$.

(b) At minimum deviation $i = e$ and $r_1 = r_2 = r$. Then $2r = A$, $r = A/2$, and $\delta_m = 2i - A$, so $i = \dfrac{A + \delta_m}{2}$. Snell’s law: $n = \dfrac{\sin i}{\sin r} = \dfrac{\sin\frac{A + \delta_m}{2}}{\sin\frac{A}{2}}$.

(c) $i = \dfrac{60 + 38}{2} = ${pl.i}^\circ$; $n = \dfrac{\sin 49^\circ}{\sin 30^\circ} \approx ${dec(pl.n, 3)}$.`,
  sol: 'Geometry of the normals; then i = e, r = A/2.',
  scheme: [['r₁ + r₂ = A from the geometry', 1], ['δ = i + e − A', 1], ['Minimum deviation conditions', 1], ['n = sin((A + δm)/2)/sin(A/2)', 1], ['i = 49°, n ≈ 1.51', 1]],
  d: 3, c: 'understanding', t: [4], wl: null,
}), () => near(pl.n, 1.509, 0.002) || `pl ${pl.n}`);
const ml = { fo: 2, fe: 6.25, uo: -2.5, D: 25 };
ml.vo = lensImage(ml.uo, ml.fo).v;
ml.mo = ml.vo / ml.uo;
ml.me = 1 + ml.D / ml.fe;
ml.m = ml.mo * ml.me;
add('micro-long', long({
  stem: '(a) Draw (describe) the ray diagram of a compound microscope with the final image at the near point, and derive an expression for its magnifying power. (b) A compound microscope has an objective of focal length 2.0 cm and an eyepiece of focal length 6.25 cm. An object is placed 2.5 cm from the objective, and the final image is at 25 cm from the eye. Find the magnifying power.',
  model: r`(a) The object is placed just outside the focus of the objective, which forms a real, inverted, enlarged image A′B′ just inside the focus of the eyepiece. The eyepiece acts as a simple microscope and forms a virtual, enlarged final image at the near point. Magnifying power $m = m_o \times m_e$, where $m_o = \dfrac{v_o}{u_o}$ (linear magnification by the objective) and $m_e = 1 + \dfrac{D}{f_e}$ (eyepiece with image at D). So $m = \dfrac{v_o}{u_o}\left(1 + \dfrac{D}{f_e}\right)$ (in magnitude).

(b) Objective: $\dfrac{1}{v_o} = \dfrac{1}{2.0} - \dfrac{1}{2.5} = \dfrac{1}{10}$, so $v_o = ${dec(ml.vo, 2)}$ cm and $|m_o| = \dfrac{10}{2.5} = ${Math.abs(ml.mo)}$. Eyepiece: $m_e = 1 + \dfrac{25}{6.25} = ${ml.me}$. Total $|m| = 4 \times 5 = ${Math.abs(ml.m)}$.`,
  sol: 'm = m_o m_e; lens formula for the objective.',
  scheme: [['Ray diagram described', 1], ['m = m_o × m_e', 1], ['m_e = 1 + D/f_e', 1], ['v_o = 10 cm, m_o = 4', 1], ['m = 20', 1]],
  d: 4, c: 'understanding', t: [5], wl: null,
}), () => near(ml.vo, 10) && near(Math.abs(ml.m), 20) || 'ml');
const tl = { fo: 150, fe: 6 };
add('tele-long', long({
  stem: '(a) Draw (describe) the ray diagram of an astronomical telescope in normal adjustment and derive its magnifying power. (b) A telescope has lenses of focal lengths 150 cm and 6.0 cm. Find its magnifying power and tube length in normal adjustment. (c) Describe a Cassegrain reflecting telescope and give one advantage over a refracting telescope.',
  model: r`(a) Parallel rays from a distant object, at angle α to the axis, are focused by the objective to an image at its focus F_o, a distance $f_o$ from it. The eyepiece is placed so that this image is also at its focus, so the rays leave parallel at angle β (final image at infinity). If the image has height h: $\tan\alpha \approx \alpha = \dfrac{h}{f_o}$ and $\tan\beta \approx \beta = \dfrac{h}{f_e}$, so $m = \dfrac{\beta}{\alpha} = \dfrac{f_o}{f_e}$.

(b) $m = \dfrac{150}{6.0} = ${tl.fo / tl.fe}$; tube length $= 150 + 6.0 = ${tl.fo + tl.fe}$ cm.

(c) A large **concave primary mirror** collects light and reflects it towards a small **convex secondary mirror**, which sends it back through a hole in the primary to the eyepiece or camera. Advantage: no chromatic aberration (also: large mirrors can be supported from behind and are cheaper).`,
  sol: 'Angles h/fo and h/fe; ratio fo/fe.',
  scheme: [['Ray diagram described', 1], ['m = fo/fe derived', 1], ['m = 25', 1], ['L = 156 cm', 1], ['Cassegrain description and advantage', 1]],
  d: 3, c: 'understanding', t: [5], wl: null,
}), () => near(tl.fo / tl.fe, 25) || 'tl');

// ================================================================ case-based (4 marks: 1 + 1 + 2)
const dn = mirrorImage(-1.5, -2);
add('dentist-case', mk.case({
  passage: 'A dentist in Kozhikode uses a small mirror on a long handle to examine the back of a patient’s teeth. The mirror is concave with a focal length of 2.0 cm, and she holds it about 1.5 cm from a tooth so that she sees an enlarged, upright image.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'Why must the tooth be closer to the mirror than 2.0 cm?',
      right: 'Only an object inside the focal length of a concave mirror gives an enlarged, upright (virtual) image',
      wrong: ['A concave mirror cannot form any image beyond its focus', 'The mirror would melt if held further away', 'Beyond the focus the image is always diminished'],
      sol: 'Inside F the image is virtual, erect and enlarged; beyond F it is real and inverted — option (@K).',
      d: 2, c: 'understanding', t: [1],
    })),
    part('b', num({
      stem: 'Find the magnification of the image.',
      value: dn.m, tol: 0.05, unit: null,
      sol: r`$u = -1.5$ cm, $f = -2.0$ cm: $\dfrac{1}{v} = -\dfrac{1}{2.0} + \dfrac{1}{1.5} = \dfrac{1}{6}$, so $v = +6$ cm and $m = -\dfrac{v}{u} = -\dfrac{6}{-1.5} = ${dec(dn.m, 2)}$.`,
      scheme: [['m = +4 (virtual, erect)', 1]],
      d: 3, c: 'application', t: [1],
    })),
    part('c', short({
      marks: 2,
      stem: 'Describe the image the dentist sees: where it is, and what it is like.',
      model: 'The image is **6 cm behind the mirror**, **virtual** (it cannot be caught on a screen), **erect** and **four times enlarged**, so small cavities are easy to see.',
      sol: 'Use v = +6 cm and m = +4.',
      scheme: [['6 cm behind the mirror, virtual', 1], ['Erect and ×4 enlarged', 1]],
      d: 2, c: 'application', t: [1],
    }), [
      short({
        marks: 2,
        stem: 'A trainee suggests using a convex mirror of the same focal length instead, “to see more teeth at once”. Evaluate the suggestion.',
        model: 'A convex mirror does give a **wider field of view**, but its image is always **diminished** (here m ≈ 0.57 at 1.5 cm). The dentist needs **magnification** to see fine detail, so the concave mirror is better; the suggestion trades detail for field of view and is unsuitable for close examination.',
        sol: 'Convex: wide but diminished.',
        scheme: [['Convex image diminished (wider view)', 1], ['Detail needs magnification: concave better', 1]],
        d: 3, c: 'evaluation', t: [1],
      }),
    ]),
  ],
}), (q) => near(dn.m, 4) && near(mirrorImage(-1.5, 2).m, 0.571, 0.01) && near(q.children[1].answer.value, 4) || 'dn');

const en = { n1: 1.62, n2: 1.52 };
en.C = todeg(Math.asin(en.n2 / en.n1));
add('endoscope-case', mk.case({
  passage: 'At a hospital in Lucknow, doctors use an endoscope to look inside a patient’s stomach. It contains two bundles of thin optical fibres: one carries light in, and the other carries the image out. Each fibre has a core of refractive index 1.62 and cladding of index 1.52.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'Light stays inside each fibre, even round bends, because of',
      right: 'total internal reflection at the core–cladding boundary',
      wrong: ['refraction out of the core', 'absorption by the cladding', 'diffraction at the fibre’s end'],
      sol: 'The denser core and rarer cladding allow TIR whenever the light meets the boundary beyond the critical angle — option (@K).',
      d: 1, c: 'understanding', t: [2],
    })),
    part('b', num({
      stem: 'Find the critical angle at the core–cladding boundary, in degrees (3 significant figures).',
      value: Number(dec(en.C, 3)), tol: 0.2, unit: '°',
      sol: r`$\sin C = \dfrac{1.52}{1.62} \approx 0.938$, so $C = \sin^{-1}(0.938) = ${dec(en.C, 3)}$ degrees.`,
      scheme: [['C ≈ 69.8°', 1]],
      d: 2, c: 'application', t: [2],
    })),
    part('c', short({
      marks: 2,
      stem: 'Explain why a very sharp bend in the endoscope would make the image dimmer.',
      model: 'At a sharp bend, light meets the core wall at a **smaller angle of incidence**, possibly **less than the critical angle** (69.8°). That light is then partly **refracted out** into the cladding instead of being totally reflected, so less reaches the far end and the image is dimmer.',
      sol: 'Bend reduces the angle of incidence below C.',
      scheme: [['Sharp bend lowers the angle of incidence', 1], ['Below C some light escapes: dimmer', 1]],
      d: 3, c: 'analysis', t: [2],
    }), [
      short({
        marks: 2,
        stem: 'A designer proposes cladding of index 1.40 instead of 1.52. Evaluate the effect on how much light the fibre can carry round bends.',
        model: r`With 1.40, $\sin C = \dfrac{1.40}{1.62} \approx 0.864$, so $C \approx 59.8^\circ$, much **smaller** than 69.8°. Light meeting the wall at a wider range of angles is still totally reflected, so the fibre **accepts more light** and tolerates **sharper bends**. The proposal improves light transmission.`,
        sol: 'Lower cladding index lowers C.',
        scheme: [['C falls to ≈ 59.8°', 1], ['More angles trapped: better for bends', 1]],
        d: 4, c: 'evaluation', t: [2], wl: null,
      }),
    ]),
  ],
}), (q) => near(en.C, 69.8, 0.002) && near(todeg(Math.asin(1.4 / 1.62)), 59.8, 0.003) && near(q.children[1].answer.value, 69.8, 0.003) || `en ${en.C}`);

add('spectacle-case', mk.case({
  passage: 'An optometrist in Indore prescribes spectacles of power −2.5 D for a student who cannot see the blackboard clearly. The student’s grandmother has reading glasses of power +2.0 D.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'What kind of lens does the student need?',
      right: 'A concave (diverging) lens',
      wrong: ['A convex (converging) lens', 'A cylindrical lens only', 'A plane glass sheet'],
      sol: 'Negative power means a negative focal length: a diverging, concave lens — option (@K).',
      d: 1, c: 'understanding', t: [3],
    })),
    part('b', num({
      stem: 'Find the focal length of the student’s lens, with sign, in cm.',
      value: -40, tol: 0.2, unit: 'cm',
      sol: r`$f = \dfrac{1}{P} = \dfrac{1}{-2.5} = -0.4$ m, i.e. $-0.4 \times 100 = -40$ cm.`,
      scheme: [['f = −40 cm', 1]],
      d: 2, c: 'application', t: [3],
    })),
    part('c', short({
      marks: 2,
      stem: 'If the student’s lens and the grandmother’s lens are placed in contact, find the power and focal length of the combination, and say whether it converges or diverges light.',
      model: r`$P = -2.5 + 2.0 = -0.5$ D, so $f = \dfrac{1}{-0.5} = -2$ m $= -200$ cm. The combination is a weak **diverging** lens.`,
      sol: 'Powers add.',
      scheme: [['P = −0.5 D', 1], ['f = −200 cm, diverging', 1]],
      d: 2, c: 'application', t: [3], wl: null,
    }), [
      short({
        marks: 2,
        stem: 'Explain why the grandmother’s lens can be used as a magnifying glass but the student’s cannot.',
        model: 'The grandmother’s lens is **converging** (+2.0 D, f = 50 cm): with print held inside its focal length it forms a **virtual, erect, enlarged** image, like a simple microscope. The student’s **diverging** lens always forms a **diminished** virtual image, so it cannot magnify.',
        sol: 'Converging lens magnifies inside F; diverging always diminishes.',
        scheme: [['Converging lens, object inside F: enlarged image', 1], ['Diverging lens always diminishes', 1]],
        d: 3, c: 'application', t: [3, 5],
      }),
    ]),
  ],
}), (q) => near(1 / -2.5 * 100, -40) && near(q.children[1].answer.value, -40) || 'spec');

add('labtele-case', mk.case({
  passage: 'In a school physics club in Pune, students build a telescope from a cardboard tube and two convex lenses taken from old equipment: lens P of focal length 50 cm and lens Q of focal length 5.0 cm. They want to view the Moon with the final image at infinity.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'Which lens should be the objective?',
      right: 'Lens P (50 cm), because the objective needs a long focal length',
      wrong: ['Lens Q (5.0 cm), because the objective needs a short focal length', 'Either; it makes no difference', 'Neither; a telescope needs a concave objective'],
      sol: 'Magnification fo/fe is large only if the objective has the longer focal length — option (@K).',
      d: 1, c: 'understanding', t: [5],
    })),
    part('b', num({
      stem: 'Find the magnifying power of their telescope in normal adjustment.',
      value: 10, tol: 0.1, unit: null,
      sol: r`$m = \dfrac{f_o}{f_e} = \dfrac{50}{5.0} = 10$.`,
      scheme: [['m = 10', 1]],
      d: 1, c: 'understanding', t: [5],
    })),
    part('c', short({
      marks: 2,
      stem: 'How long must the tube be, and why will the Moon appear upside down?',
      model: 'In normal adjustment the lenses are $f_o + f_e = 50 + 5 = 55$ cm apart. The objective forms a **real, inverted** image at its focus, and the eyepiece magnifies it without turning it back, so the final image is **inverted**.',
      sol: 'L = fo + fe; real inverted intermediate image.',
      scheme: [['55 cm', 1], ['Inverted because the objective’s real image is inverted', 1]],
      d: 2, c: 'application', t: [5],
    }), [
      short({
        marks: 2,
        stem: 'One student wants a bigger magnification by using a 2.5 cm eyepiece borrowed from a microscope. Evaluate the idea.',
        model: 'It works in principle: $m = 50/2.5 = 20$, **double** the magnification, and the tube becomes 52.5 cm. But the image will be **dimmer** and any shake or blur is magnified too, so the improvement is real but limited by the small objective and by steadiness.',
        sol: 'm = fo/fe; trade-offs.',
        scheme: [['m doubles to 20', 1], ['Dimmer, shakier image: limited benefit', 1]],
        d: 3, c: 'evaluation', t: [5],
      }),
    ]),
  ],
}));

await import('./questions-extra.mjs');
