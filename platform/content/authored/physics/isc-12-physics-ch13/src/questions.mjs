// ISC 12 Physics ch13 Reflection at Spherical Mirrors and Refraction at Plane Surfaces — question bank (ISC style).
// Numbers computed and re-checked; New Cartesian sign convention throughout (light from left to right, real object u < 0,
// concave f < 0, convex f > 0).
import { mk, add, r, dec, near } from '../../isc-12-physics-ch01/src/lib.mjs';
import { mirror } from './decks.mjs';
import { trace } from './svgs.mjs';

const { mcq, ar, tf, fill, match, num, short, long } = mk;
const rad = (d) => (d * Math.PI) / 180;
/** Relative refractive index symbol: N(1, 2) gives {}_1n_2 (keeps "${" out of the template literals). */
const N = (a, b) => `{}_${a}n_${b}`;
const [N12, N23, N31, N13] = [N(1, 2), N(2, 3), N(3, 1), N(1, 3)];
const deg = (x) => (x * 180) / Math.PI;
const asinD = (x) => deg(Math.asin(x));
const sinD = (d) => Math.sin(rad(d));
const lateral = (t, n, i) => {
  const rr = Math.asin(sinD(i) / n);
  return { r: deg(rr), d: (t * Math.sin(rad(i) - rr)) / Math.cos(rr) };
};

// ================================================================ t01 spherical mirrors
add('signconv-mcq', mcq({
  stem: 'A convex mirror of focal length 15 cm hangs on the wall of a shop, and a customer stands 2.5 m in front of it. Taking the light from the customer as travelling from left to right (New Cartesian convention), the values to put into the mirror formula are',
  right: 'u = −250 cm and f = +15 cm',
  wrong: ['u = +250 cm and f = +15 cm', 'u = −250 cm and f = −15 cm', 'u = +250 cm and f = −15 cm'],
  sol: 'Distances are measured from the pole. The customer is on the side the light comes from, against the incident light, so u is negative. The focus of a convex mirror lies behind it, along the incident light, so f is positive — option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
add('bowl-fill', fill({
  stem: 'The polished inside of a steel ladle is part of a sphere of radius 9.0 cm. Used as a concave mirror for paraxial rays, the ladle has a focal length of magnitude ___ cm.',
  acc: [['4.5', '4.50', '−4.5', '-4.5']],
  sol: 'f = R/2 = 9.0/2 = **4.5** cm (−4.5 cm with the sign of a concave mirror).',
  d: 1, c: 'understanding', t: [1],
}), (q) => near(9 / 2, 4.5) && q.answer.blanks[0].accepted[0] === '4.5' || 'bowl');
const ring = mirror(-15, -10);
add('ring-num', num({
  stem: 'A jeweller holds a ring 15 cm in front of a concave mirror of focal length 10 cm. Find the image distance v in cm, giving its sign in the New Cartesian convention.',
  value: Number(dec(ring.v, 2)), tol: 0.5, unit: 'cm',
  sol: r`$u = -15$ cm, $f = -10$ cm. $\dfrac{1}{v} = \dfrac{1}{f} - \dfrac{1}{u} = -\dfrac{1}{10} + \dfrac{1}{15} = -\dfrac{1}{30}$, so $v = ${dec(ring.v, 2)}$ cm: a real image 30 cm in front of the mirror.`,
  scheme: [['Signs: u = −15 cm, f = −10 cm', 1], ['v = −30 cm (real, in front)', 1]],
  marks: 2, d: 2, c: 'application', t: [1],
}), (q) => near(ring.v, -30) && q.answer.value === -30 || 'ring');
const sec = mirror(-45, 30);
add('security-num', num({
  stem: 'A convex mirror of focal length 30 cm stands on a desk, and a pen is placed 45 cm in front of it. Find the magnification of the image of the pen.',
  value: Number(dec(sec.m, 2)), tol: 0.01, unit: null,
  sol: r`$u = -45$ cm, $f = +30$ cm: $\dfrac{1}{v} = \dfrac{1}{30} + \dfrac{1}{45} = \dfrac{5}{90}$, so $v = +${dec(sec.v, 2)}$ cm. $m = -\dfrac{v}{u} = -\dfrac{18}{-45} = ${dec(sec.m, 2)}$: erect and diminished.`,
  scheme: [['v = +18 cm; m = −v/u = 0.40', 1]],
  d: 2, c: 'application', t: [1],
}), (q) => near(sec.v, 18) && near(sec.m, 0.4) && q.answer.value === 0.4 || 'sec');
const mk1 = mirror(-8, -24);
add('makeup-mcq', mcq({
  stem: 'A watch repairer looks at a tiny screw placed 8.0 cm in front of a concave mirror of focal length 24 cm. The image of the screw is',
  right: 'virtual and erect, 12 cm behind the mirror, 1.5 times the size of the screw',
  wrong: ['real and inverted, 12 cm in front of the mirror, 1.5 times the size of the screw', 'virtual and erect, 24 cm behind the mirror, 3 times the size of the screw', 'real and inverted, 6.0 cm in front of the mirror, 0.75 times the size of the screw'],
  sol: r`$u = -8.0$ cm, $f = -24$ cm: $\dfrac{1}{v} = -\dfrac{1}{24} + \dfrac{1}{8} = \dfrac{2}{24}$, so $v = +${dec(mk1.v, 2)}$ cm (behind the mirror, virtual); $m = -\dfrac{12}{-8} = +${dec(mk1.m, 2)}$ (erect, 1.5 times) — option (@K).`,
  d: 2, c: 'application', t: [1],
}), () => near(mk1.v, 12) && near(mk1.m, 1.5) || 'mk1');
add('water-ar', ar({
  a: 'A concave mirror of focal length 20 cm, lowered into a tank of water, still has a focal length of 20 cm.',
  r: 'The focal length of a mirror is half its radius of curvature, and the law of reflection does not involve the refractive index of the surrounding medium.',
  key: 'a',
  sol: 'Both are true, and R explains A: reflection obeys i = r in any medium, so the rays meet at the same point, f = R/2, in water as in air — option (a).',
  d: 2, c: 'understanding', t: [1],
}));
add('magsign-mcq', mcq({
  stem: 'A spherical mirror forms an image of a real object with a magnification of −0.25. The mirror and its image are',
  right: 'a concave mirror; a real, inverted image one quarter the size of the object',
  wrong: ['a convex mirror; a virtual, erect image one quarter the size of the object', 'a concave mirror; a virtual, erect image one quarter the size of the object', 'a convex mirror; a real, inverted image four times the size of the object'],
  sol: 'm = −v/u is negative, so v has the same sign as u: the image is in front of the mirror, real and inverted. Only a concave mirror forms a real image of a real object, and |m| = 0.25 means one quarter the size — option (@K).',
  d: 3, c: 'analysis', t: [1],
}));
const pins = { u: -36, v: -45 };
pins.f = 1 / (1 / pins.v + 1 / pins.u);
pins.R = 2 * pins.f;
add('pins-num', num({
  stem: 'In a laboratory, an object pin stands 36 cm in front of a concave mirror, and a search pin shows no parallax with the inverted image when it is 45 cm in front of the mirror. Find the radius of curvature of the mirror in cm, with its sign.',
  value: Number(dec(pins.R, 2)), tol: 0.5, unit: 'cm',
  sol: r`$u = -36$ cm, $v = -45$ cm: $\dfrac{1}{f} = \dfrac{1}{v} + \dfrac{1}{u} = -\dfrac{1}{45} - \dfrac{1}{36} = -\dfrac{4 + 5}{180} = -\dfrac{1}{20}$, so $f = ${dec(pins.f, 2)}$ cm and $R = 2f = ${dec(pins.R, 2)}$ cm.`,
  scheme: [['1/f = 1/v + 1/u with both negative: f = −20 cm', 1], ['R = 2f = −40 cm', 1]],
  marks: 2, d: 3, c: 'application', t: [1],
}), (q) => near(pins.f, -20) && q.answer.value === -40 || 'pins');
add('Rf-short3', short({
  marks: 3,
  stem: 'Using a ray parallel to the principal axis of a concave mirror, prove that its focal length is half its radius of curvature. State the approximation you use.',
  model: r`Let a ray parallel to the axis strike the mirror at M. C is the centre of curvature, so CM is the normal at M; call the angle of incidence $\theta$. By the law of reflection the reflected ray MF also makes $\theta$ with CM, so $\angle CMF = \theta$. The incident ray is parallel to the axis, so $\angle MCF = \theta$ (alternate angles). Triangle FCM therefore has two equal angles: $FC = FM$.
For a **paraxial** ray (small aperture) M lies very close to P, so $FM \approx FP$. Then $FC = FP$: F is the midpoint of PC, so $f = PF = \dfrac{PC}{2} = \dfrac{R}{2}$.`,
  sol: 'Isosceles triangle FCM; paraxial FM ≈ FP.',
  scheme: [['CM is the normal; angles of incidence and reflection both θ', 1], ['∠MCF = θ (alternate angles), so FC = FM', 1], ['Paraxial rays: FM ≈ FP, so f = R/2', 1]],
  d: 2, c: 'understanding', t: [1], wl: null,
}));
add('inside-short2', short({
  marks: 2,
  stem: 'Using the mirror formula and the New Cartesian sign convention, show that a real object placed between the pole and the focus of a concave mirror always forms a virtual, erect, magnified image.',
  model: r`Here $f = -|f|$ and $u = -|u|$ with $|u| < |f|$. Then $\dfrac{1}{v} = \dfrac{1}{f} - \dfrac{1}{u} = \dfrac{1}{|u|} - \dfrac{1}{|f|} > 0$, so **v is positive**: the image is behind the mirror, **virtual**. Also $\dfrac{1}{v} < \dfrac{1}{|u|}$, so $v > |u|$ and $m = -\dfrac{v}{u} = \dfrac{v}{|u|} > 1$: the image is **erect and magnified**.`,
  sol: '1/v = 1/|u| − 1/|f| > 0 and v > |u|.',
  scheme: [['1/v = 1/|u| − 1/|f| > 0, so v > 0: virtual', 1], ['v > |u|, so m = v/|u| > 1: erect, magnified', 1]],
  d: 3, c: 'analysis', t: [1], wl: null,
}), () => {
  const e = mirror(-7, -10);
  return (e.v > 0 && e.m > 1) || 'inside';
});
add('rearview-short2', short({
  marks: 2,
  stem: 'A two-wheeler maker proposes fitting plane mirrors instead of convex mirrors as rear-view mirrors, “so that riders judge distances correctly”. Evaluate the proposal.',
  model: 'A plane mirror shows vehicles at true size, so distances are judged better, but it covers only a **narrow region** behind. A convex mirror gives an **erect, diminished** image of a much **wider field of view**, showing neighbouring lanes. For safety the convex mirror is better, so the proposal should be rejected.',
  sol: 'Plane: true size, narrow view; convex: wide field of view.',
  scheme: [['Plane mirror: correct size but a narrow field of view', 1], ['Convex: erect, wide field of view, so the proposal is less safe', 1]],
  d: 3, c: 'evaluation', t: [1],
}));
add('uses-match', match({
  stem: 'Match each mirror set-up in Column A with the image property it relies on, in Column B.',
  pairs: [
    ['Bulb at the focus of a concave torch reflector', 'Reflected rays leave parallel, giving a strong beam'],
    ['Face held inside the focus of a concave make-up mirror', 'An erect, enlarged virtual image'],
    ['Convex mirror at a hairpin bend on a hill road', 'An erect, diminished image of a wide stretch of road'],
    ['Large concave mirror of a solar cooker', 'Parallel sunlight brought together near the focus'],
  ],
  order: [2, 0, 3, 1],
  sol: 'Torch → parallel beam (1 → r); make-up mirror → erect, enlarged virtual image (2 → p); hill-road mirror → wide view (3 → s); solar cooker → sunlight concentrated near the focus (4 → q).',
  d: 2, c: 'understanding', t: [1],
}));
const atC = mirror(-50, -25);
add('atC-mcq', mcq({
  stem: 'A concave mirror forms a real image exactly the same size as the object when the object is 50 cm in front of it. The focal length of the mirror is',
  right: '25 cm',
  wrong: ['50 cm', '100 cm', '12.5 cm'],
  sol: 'A real image of the same size (m = −1) is formed only when the object is at the centre of curvature, so R = 50 cm and f = R/2 = 25 cm — option (@K).',
  d: 2, c: 'understanding', t: [1],
}), () => near(atC.v, -50) && near(atC.m, -1) || 'atC');
add('approach-tf', tf({
  stem: 'As a candle is moved steadily from far away towards the focus of a concave mirror, its real image moves away from the mirror and grows larger.',
  key: 't',
  sol: 'True. The image moves out from F (object far away) towards infinity (object at F), and |m| = |v/u| grows from nearly zero to very large.',
  d: 2, c: 'understanding', t: [1],
}), () => {
  const a = mirror(-100, -20);
  const b = mirror(-30, -20);
  return (b.v < a.v && Math.abs(b.m) > Math.abs(a.m)) || 'approach';
});
const bike = mirror(-450, 50);
bike.hi = bike.m * 150;
add('bike-num', num({
  stem: 'The convex rear-view mirror of a scooter has a focal length of 50 cm. A car 1.5 m tall is 4.5 m behind the scooter. Find the height of the car’s image, in cm.',
  value: Number(dec(bike.hi, 2)), tol: 0.2, unit: 'cm',
  sol: r`$u = -450$ cm, $f = +50$ cm: $\dfrac{1}{v} = \dfrac{1}{50} + \dfrac{1}{450} = \dfrac{10}{450}$, so $v = +${dec(bike.v, 2)}$ cm. $m = -\dfrac{v}{u} = \dfrac{45}{450} = ${dec(bike.m, 2)}$, so $h' = ${dec(bike.m, 2)} \times 150 = ${dec(bike.hi, 2)}$ cm, erect.`,
  scheme: [['v = +45 cm', 1], ['m = 0.10, image height 15 cm', 1]],
  marks: 2, d: 3, c: 'application', t: [1],
}), (q) => near(bike.v, 45) && near(bike.hi, 15) && q.answer.value === 15 || 'bike');
const sh = { u: -10, m: 2.5 };
sh.v = -sh.m * sh.u;
sh.f = 1 / (1 / sh.v + 1 / sh.u);
sh.R = 2 * sh.f;
add('shaving-short3', short({
  marks: 3,
  stem: 'A man wants an upright image of his face 2.5 times life size when he holds a concave shaving mirror 10 cm from his face. Find where the image is formed, and the focal length and radius of curvature the mirror must have.',
  model: r`An upright image is virtual, so $m = +2.5 = -\dfrac{v}{u}$ with $u = -10$ cm: $v = -2.5u = +${dec(sh.v, 2)}$ cm, i.e. 25 cm **behind** the mirror.
$\dfrac{1}{f} = \dfrac{1}{v} + \dfrac{1}{u} = \dfrac{1}{25} - \dfrac{1}{10} = \dfrac{2 - 5}{50} = -\dfrac{3}{50}$, so $f = ${dec(sh.f, 3)}$ cm.
$R = 2f = ${dec(sh.R, 3)}$ cm (the negative signs confirm a concave mirror).`,
  sol: 'm = +2.5 gives v = +25 cm; mirror formula for f; R = 2f.',
  scheme: [['Erect image: m = +2.5, so v = +25 cm (behind the mirror)', 1], ['1/f = 1/25 − 1/10, f ≈ −16.7 cm', 1], ['R = 2f ≈ −33.3 cm', 1]],
  d: 3, c: 'analysis', t: [1], wl: null,
}), () => near(sh.v, 25) && near(sh.f, -50 / 3) && near(sh.R, -100 / 3) || 'sh');
const pr = { m: -4, v: -300 };
pr.u = -pr.v / pr.m;
pr.f = 1 / (1 / pr.v + 1 / pr.u);
add('projector-short3', short({
  marks: 3,
  stem: 'A concave mirror is used to throw an image of a small lamp filament, magnified 4 times, onto a wall 3.0 m from the mirror. How far from the mirror must the filament be, and what is the focal length of the mirror?',
  model: r`An image on a wall is real and inverted, so $m = -4$ and $v = -300$ cm.
$m = -\dfrac{v}{u}$ gives $u = -\dfrac{v}{m} = -\dfrac{-300}{-4} = ${dec(pr.u, 2)}$ cm: the filament is 75 cm in front of the mirror.
$\dfrac{1}{f} = \dfrac{1}{v} + \dfrac{1}{u} = -\dfrac{1}{300} - \dfrac{1}{75} = -\dfrac{5}{300}$, so $f = ${dec(pr.f, 2)}$ cm (focal length 60 cm).`,
  sol: 'Real image: m = −4, v = −300 cm; u = −75 cm; f = −60 cm.',
  scheme: [['Real image: m = −4, v = −300 cm', 1], ['u = −75 cm', 1], ['f = −60 cm', 1]],
  d: 3, c: 'application', t: [1], wl: null,
}), () => near(pr.u, -75) && near(pr.f, -60) || 'pr');
add('uvgraph-mcq', mcq({
  stem: 'A student measures the image distance |v| for several object distances |u| in front of a concave mirror, and plots |v| against |u|. The curve crosses the straight line |v| = |u| at |u| = 30 cm. The focal length of the mirror is',
  right: '15 cm',
  wrong: ['30 cm', '60 cm', '7.5 cm'],
  sol: 'A real image is as far from the mirror as the object only when both are at the centre of curvature, so R = 30 cm and f = R/2 = 15 cm — option (@K).',
  d: 3, c: 'analysis', t: [1],
}), () => near(mirror(-30, -15).v, -30) || 'uvg');
add('convexF-fill', fill({
  stem: 'For any real object in front of a convex mirror, the virtual image lies behind the mirror, between its pole and its ___.',
  acc: [['focus', 'principal focus', 'F', 'focal point']],
  sol: 'Between P and the principal **focus**: with f > 0 and u < 0, 1/v = 1/f − 1/u > 1/f, so 0 < v < f.',
  d: 2, c: 'understanding', t: [1],
}));
const cu = { R: 60, m: 0.25 };
cu.f = cu.R / 2;
cu.u = -((1 / cu.m) - 1) * cu.f;
cu.v = -cu.m * cu.u;
add('convexu-num', num({
  stem: 'Where must an object be placed in front of a convex mirror of radius of curvature 60 cm so that its image is one quarter of its size? Give u in cm, with its sign.',
  value: Number(dec(cu.u, 2)), tol: 0.5, unit: 'cm',
  sol: r`$f = +30$ cm. A convex mirror gives an erect image, so $m = +\dfrac{1}{4} = -\dfrac{v}{u}$, i.e. $v = -\dfrac{u}{4}$. Then $\dfrac{1}{v} + \dfrac{1}{u} = -\dfrac{4}{u} + \dfrac{1}{u} = -\dfrac{3}{u} = \dfrac{1}{30}$, so $u = ${dec(cu.u, 2)}$ cm (image at $v = +${dec(cu.v, 3)}$ cm).`,
  scheme: [['m = +1/4 gives v = −u/4', 1], ['−3/u = 1/f: u = −90 cm', 1]],
  marks: 2, d: 3, c: 'application', t: [1],
}), (q) => {
  const e = mirror(cu.u, cu.f);
  return (near(cu.u, -90) && near(e.m, 0.25) && q.answer.value === -90) || 'cu';
});
const hi = mirror(-30, -20);
hi.h = hi.m * 5;
add('heightimage-num', num({
  stem: 'An object 5.0 cm tall stands 30 cm in front of a concave mirror of focal length 20 cm. Find the height of the image in cm, with its sign.',
  value: Number(dec(hi.h, 2)), tol: 0.2, unit: 'cm',
  sol: r`$\dfrac{1}{v} = -\dfrac{1}{20} + \dfrac{1}{30} = -\dfrac{1}{60}$, so $v = ${dec(hi.v, 2)}$ cm; $m = -\dfrac{v}{u} = ${dec(hi.m, 2)}$ and $h' = mh = ${dec(hi.h, 2)}$ cm (real, inverted).`,
  scheme: [['v = −60 cm, m = −2, h′ = −10 cm', 1]],
  d: 2, c: 'application', t: [1],
}), (q) => near(hi.v, -60) && q.answer.value === -10 || 'hi');

// ================================================================ t02 Snell's law, relative index, slabs
const sn = asinD(1.33 * 0.5);
add('snell-num', num({
  stem: 'A ray travelling in the water of a fish tank (n = 1.33) meets the water–air surface at 30° to the normal. Find the angle of refraction in air, in degrees (3 significant figures).',
  value: Number(dec(sn, 3)), tol: 0.2, unit: '°',
  sol: r`$n_w\sin 30^\circ = 1 \times \sin r$: $\sin r = 1.33 \times 0.500 = 0.665$, so $r = \sin^{-1}(0.665) = ${dec(sn, 3)}$ degrees (bent away from the normal).`,
  scheme: [['sin r = 1.33 sin 30° = 0.665; r ≈ 41.7°', 1]],
  d: 2, c: 'understanding', t: [2],
}), (q) => near(sn, 41.68, 0.001) && q.answer.value === 41.7 || `sn ${sn}`);
const wl = 633 * 0.75;
add('wavelength-num', num({
  stem: 'Light from a helium–neon laser has a wavelength of 633 nm in air. Find its wavelength in water of refractive index 4/3, in nm (3 significant figures).',
  value: Number(dec(wl, 3)), tol: 1, unit: 'nm',
  sol: r`The frequency is unchanged and the speed falls by the factor n, so $\lambda_w = \dfrac{\lambda}{n} = \dfrac{633}{4/3} = ${dec(wl, 3)}$ nm.`,
  scheme: [['λ/n = 475 nm', 1]],
  d: 2, c: 'understanding', t: [2],
}), (q) => near(wl, 474.75) && q.answer.value === 475 || 'wl');
add('chain-mcq', mcq({
  stem: 'The refractive index of water with respect to air is 1.33, and that of a clear acrylic plastic with respect to air is 1.60. The refractive index of the plastic with respect to water is about',
  right: '1.20',
  wrong: ['0.83', '2.13', '2.93'],
  sol: r`$${N('w', 'p')} = \dfrac{${N('a', 'p')}}{${N('a', 'w')}} = \dfrac{1.60}{1.33} \approx 1.20$; 0.83 is the index of water relative to the plastic — option (@K).`,
  d: 2, c: 'understanding', t: [2],
}), () => near(1.6 / 1.33, 1.203, 0.001) || 'chain');
add('freq-mcq', mcq({
  stem: 'A beam of green light passes from air into a block of acrylic plastic. Which property of the light is the same inside the block as in the air?',
  right: 'its frequency',
  wrong: ['its speed', 'its wavelength', 'its direction, whatever the angle of incidence'],
  sol: 'The frequency is fixed by the source; the speed and the wavelength both fall by the factor n, and the direction changes unless the beam meets the surface normally — option (@K).',
  d: 1, c: 'understanding', t: [2],
}));
add('cycle-fill', fill({
  stem: 'A ray crosses parallel layers from air into oil, from oil into glass and from glass back into air. The product of the three relative refractive indices for these crossings (oil relative to air, glass relative to oil, air relative to glass) equals ___.',
  acc: [['1', 'one', '1.0']],
  sol: 'The product is **1**: each relative index is a ratio of absolute indices, (n_oil/n_air)(n_glass/n_oil)(n_air/n_glass) = 1.',
  d: 1, c: 'recall', t: [2],
}));
add('slab-ar', ar({
  a: 'A ray that passes obliquely through a parallel-sided glass slab in air leaves it travelling parallel to its original direction.',
  r: 'Glass has a higher refractive index than air, so light travels more slowly in it.',
  key: 'b',
  sol: 'Both are true, but R does not explain A. The emergent ray is parallel because the slab’s faces are parallel and the media on both sides are the same, so the refraction at the second face exactly reverses that at the first (sin e = n sin r = sin i) — option (b).',
  d: 2, c: 'understanding', t: [2],
}));
const stk = [1.52, 1.33, 1.47].map((n) => asinD(sinD(40) / n));
add('stack-mcq', mcq({
  stem: 'A ray in air strikes the top of a stack of three parallel transparent layers, glass (n = 1.52), water (n = 1.33) and oil (n = 1.47), at 40° to the normal, and emerges from the bottom of the stack into air. Its angle with the normal after it emerges is',
  right: '40°, whatever the refractive indices of the layers',
  wrong: ['less than 40°, because glass is the densest layer', 'more than 40°, because the ray last left the oil', 'about 25°, the angle inside the glass'],
  sol: r`At every parallel boundary $n\sin\theta$ is unchanged, so in the final air layer $1 \times \sin\theta = 1 \times \sin 40^\circ$: $\theta = 40^\circ$. (Inside the glass the angle is about $${dec(stk[0], 2)}^\circ$.) — option (@K).`,
  d: 3, c: 'analysis', t: [2],
}), () => near(stk[0], 25.0, 0.01) && near(1.33 * sinD(stk[1]), sinD(40)) || 'stk');
const lt = lateral(5, 1.6, 45);
add('lateral-num', num({
  stem: 'A ray meets a glass block 5.0 cm thick (n = 1.6) at an angle of incidence of 45°. Find the lateral shift of the emergent ray, in cm (3 significant figures).',
  value: Number(dec(lt.d, 3)), tol: 0.02, unit: 'cm',
  sol: r`$\sin r = \dfrac{\sin 45^\circ}{1.6} = ${dec(sinD(lt.r), 3)}$, so $r = ${dec(lt.r, 3)}^\circ$. $d = \dfrac{t\sin(i - r)}{\cos r} = \dfrac{5.0 \times \sin ${dec(45 - lt.r, 3)}^\circ}{\cos ${dec(lt.r, 3)}^\circ} = ${dec(lt.d, 3)}$ cm.`,
  scheme: [['r ≈ 26.2°', 1], ['d ≈ 1.79 cm', 1]],
  marks: 2, d: 3, c: 'application', t: [2],
}), (q) => near(lt.d, 1.7936, 0.001) && q.answer.value === 1.79 || `lt ${lt.d}`);
add('lateraldep-mcq', mcq({
  stem: 'A narrow beam passes obliquely through a parallel-sided glass block. Which one of these changes would REDUCE the lateral shift of the beam?',
  right: 'replacing the block by an equally thick one of lower refractive index',
  wrong: ['using a thicker block of the same glass', 'increasing the angle of incidence', 'replacing the block by an equally thick one of higher refractive index'],
  sol: r`$d = \dfrac{t\sin(i - r)}{\cos r} = t(\sin i - \cos i\tan r)$. A lower n makes r larger (closer to i), so $\tan r$ rises and d falls; a thicker block, a larger i or a higher n all increase d — option (@K).`,
  d: 3, c: 'analysis', t: [2],
}), () => lateral(5, 1.4, 45).d < lateral(5, 1.6, 45).d && lateral(6, 1.6, 45).d > lateral(5, 1.6, 45).d && lateral(5, 1.6, 55).d > lateral(5, 1.6, 45).d || 'ldep');
add('bend-tf', tf({
  stem: 'A ray passing obliquely from glass (n = 1.5) into water (n = 1.33) bends towards the normal, because water is also denser than air.',
  key: 'f',
  sol: 'False. At this boundary the light goes from the optically denser glass into the rarer water, so it bends away from the normal; only the two media at the boundary matter.',
  d: 2, c: 'understanding', t: [2],
}));
add('laws-short2', short({
  marks: 2,
  stem: 'State the two laws of refraction of light, and define the absolute refractive index of a medium in terms of the speed of light.',
  model: '(1) The incident ray, the refracted ray and the normal lie in **one plane**. (2) **Snell’s law:** for two given media and colour, sin i / sin r is constant (n₁ sin i = n₂ sin r). **Absolute refractive index:** n = c/v, the speed of light in vacuum over its speed in the medium.',
  sol: 'Coplanar rays; Snell’s law; n = c/v.',
  scheme: [['Both laws stated', 1], ['n = c/v defined', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('cycle-short3', short({
  marks: 3,
  stem: 'A ray passes from medium 1 into medium 2, then into medium 3, and then back into medium 1, the boundaries being parallel. Using Snell’s law at each boundary, prove that 1n2 × 2n3 × 3n1 = 1, and hence express 2n3 in terms of 1n2 and 1n3.',
  model: r`Let the angles with the normal be $\theta_1$, $\theta_2$, $\theta_3$ in media 1, 2, 3, and $\theta_1'$ when the ray is back in medium 1. Snell’s law at each boundary: $${N12} = \dfrac{\sin\theta_1}{\sin\theta_2}$, $${N23} = \dfrac{\sin\theta_2}{\sin\theta_3}$, $${N31} = \dfrac{\sin\theta_3}{\sin\theta_1'}$.
Experiment (or the reversibility of light) shows that the ray emerges parallel to the incident ray, $\theta_1' = \theta_1$. Multiplying, every sine cancels: $${N12}\,${N23}\,${N31} = 1$.
Since $${N31} = \dfrac{1}{${N13}}$, this gives $${N23} = \dfrac{${N13}}{${N12}}$.`,
  sol: 'Multiply the three Snell ratios; θ₁′ = θ₁.',
  scheme: [['Snell’s law written at each of the three boundaries', 1], ['Emergent ray parallel (θ₁′ = θ₁), so the product is 1', 1], ['₂n₃ = ₁n₃ / ₁n₂', 1]],
  d: 3, c: 'understanding', t: [2], wl: null,
}));
const ls3 = lateral(3, Math.sqrt(3), 60);
add('lateral-short3', short({
  marks: 3,
  stem: 'Derive an expression for the lateral shift of a ray passing through a parallel-sided slab of thickness t, in terms of t, the angle of incidence i and the angle of refraction r. Evaluate it for t = 3.0 cm, n = √3 and i = 60°.',
  model: r`The ray enters at B, travels through the slab to C and leaves parallel to its incident direction. The path inside has length $BC = \dfrac{t}{\cos r}$. The incident ray produced makes an angle $(i - r)$ with BC, so the perpendicular distance from C to it is
$$d = BC\,\sin(i - r) = \dfrac{t\sin(i - r)}{\cos r}$$
Here $\sin r = \dfrac{\sin 60^\circ}{\sqrt 3} = 0.5$, so $r = ${dec(ls3.r, 2)}^\circ$ and $d = \dfrac{3.0 \times \sin 30^\circ}{\cos 30^\circ} = ${dec(ls3.d, 3)}$ cm.`,
  sol: 'BC = t/cos r; d = BC sin(i − r).',
  scheme: [['Path in the slab t/cos r', 1], ['d = t sin(i − r)/cos r', 1], ['r = 30°, d ≈ 1.73 cm', 1]],
  d: 3, c: 'application', t: [2], wl: null,
}), () => near(ls3.r, 30) && near(ls3.d, Math.sqrt(3)) || 'ls3');
const tr = { i: 40, r: 33, nw: 1.33 };
tr.wng = sinD(tr.i) / sinD(tr.r);
tr.ng = tr.nw * tr.wng;
add('trough-short2', short({
  marks: 2,
  stem: 'A ray in water (n = 1.33) meets the flat glass bottom of an aquarium at 40° to the normal and is refracted at 33° inside the glass. Find the refractive index of the glass relative to water, and the absolute refractive index of the glass.',
  model: r`$${N('w', 'g')} = \dfrac{\sin 40^\circ}{\sin 33^\circ} = \dfrac{${dec(sinD(40), 4)}}{${dec(sinD(33), 4)}} = ${dec(tr.wng, 3)}$.
Absolute index: $n_g = n_w \times ${N('w', 'g')} = 1.33 \times ${dec(tr.wng, 3)} = ${dec(tr.ng, 3)}$.`,
  sol: 'Ratio of sines; multiply by the index of water.',
  scheme: [['Glass relative to water ≈ 1.18', 1], ['n_g = 1.33 × 1.18 ≈ 1.57', 1]],
  d: 3, c: 'analysis', t: [2], wl: null,
}), () => near(tr.wng, 1.1802, 0.001) && near(tr.ng, 1.5697, 0.001) || `tr ${tr.ng}`);
const sp = { n: 1.5, d: 6e-3, c: 3e8 };
sp.t = (sp.n * sp.d) / sp.c;
add('speedtime-num', num({
  stem: 'How long does light take to cross a window pane 6.0 mm thick (n = 1.5) at normal incidence? Take c = 3.0 × 10⁸ m s⁻¹ and give the answer in picoseconds.',
  value: Number(dec(sp.t * 1e12, 2)), tol: 0.5, unit: 'ps',
  sol: r`Speed in the glass $v = \dfrac{c}{n} = 2.0 \times 10^{8}$ m s$^{-1}$, so $t = \dfrac{6.0 \times 10^{-3}}{2.0 \times 10^{8}} = 3.0 \times 10^{-11}$ s, i.e. $3.0 \times 10^{-11} \times 10^{12} = ${dec(sp.t * 1e12, 2)}$ ps.`,
  scheme: [['v = c/n; t = 30 ps', 1]],
  d: 2, c: 'application', t: [2],
}), (q) => near(sp.t, 3e-11) && q.answer.value === 30 || 'sp');

// ================================================================ t03 real and apparent depth
add('kerosene-num', num({
  stem: 'A coin lies at the bottom of a jar filled with kerosene (n = 1.44) to a depth of 36 cm. How deep does the coin appear when viewed from directly above? Answer in cm.',
  value: Number(dec(36 / 1.44, 3)), tol: 0.2, unit: 'cm',
  sol: r`Apparent depth $= \dfrac{\text{real depth}}{n} = \dfrac{36}{1.44} = ${dec(36 / 1.44, 3)}$ cm.`,
  scheme: [['36 ÷ 1.44 = 25.0 cm', 1]],
  d: 2, c: 'understanding', t: [3],
}), (q) => near(36 / 1.44, 25) && q.answer.value === 25 || 'ker');
const pw = 4.5 * (1 - 1 / 1.5);
add('slabshift-num', num({
  stem: 'A printed dot is viewed from above through a glass paperweight 4.5 cm thick (n = 1.5) resting on it. By how much does the dot appear to be raised, in cm?',
  value: Number(dec(pw, 2)), tol: 0.05, unit: 'cm',
  sol: r`$s = t\left(1 - \dfrac{1}{n}\right) = 4.5 \times \left(1 - \dfrac{1}{1.5}\right) = ${dec(pw, 2)}$ cm.`,
  scheme: [['s = t(1 − 1/n)', 1], ['s = 1.5 cm', 1]],
  marks: 2, d: 2, c: 'application', t: [3],
}), (q) => near(pw, 1.5) && q.answer.value === 1.5 || 'pw');
const ly = 20 / (4 / 3) + 12 / 1.5;
add('layers-num', num({
  stem: 'A glass beaker holds 20 cm of water (n = 4/3) with a 12 cm layer of oil (n = 1.5) floating on it. A scratch on the bottom of the beaker is viewed from directly above. Find its apparent depth below the top surface of the oil, in cm.',
  value: Number(dec(ly, 2)), tol: 0.2, unit: 'cm',
  sol: r`Each layer looks $t/n$ thick: $\dfrac{20}{4/3} + \dfrac{12}{1.5} = 15 + 8.0 = ${dec(ly, 2)}$ cm (the real depth is 32 cm).`,
  scheme: [['Water looks 15 cm, oil 8.0 cm', 1], ['Apparent depth 23 cm', 1]],
  marks: 2, d: 3, c: 'application', t: [3],
}), (q) => near(ly, 23) && q.answer.value === 23 || 'ly');
const tm = { bench: 4.2, mark: 5.1, top: 7.2 };
tm.n = (tm.top - tm.bench) / (tm.top - tm.mark);
add('travelling-num', num({
  stem: 'With a travelling microscope, a mark on the bench is in focus at a scale reading of 4.20 cm. A glass slab is placed on the mark, which is refocused at 5.10 cm; the top surface of the slab is in focus at 7.20 cm. Find the refractive index of the glass (3 significant figures).',
  value: Number(dec(tm.n, 3)), tol: 0.01, unit: null,
  sol: r`Real thickness $= 7.20 - 4.20 = 3.00$ cm; apparent thickness $= 7.20 - 5.10 = 2.10$ cm. $n = \dfrac{3.00}{2.10} = ${dec(tm.n, 3)}$.`,
  scheme: [['Real 3.00 cm and apparent 2.10 cm', 1], ['n = 1.43', 1]],
  marks: 2, d: 3, c: 'application', t: [3],
}), (q) => near(tm.n, 1.42857) && q.answer.value === 1.43 || 'tm');
add('kingfisher-mcq', mcq({
  stem: 'A kingfisher hovers 30 cm above the calm surface of a pond. To a fish directly below it, looking up through the water (n = 4/3), the bird appears to be at a height above the surface of',
  right: '40 cm',
  wrong: ['22.5 cm', '30 cm', '70 cm'],
  sol: 'Seen from the denser medium, distances in the rarer medium appear stretched: apparent height = n × real height = (4/3) × 30 = 40 cm, so the bird looks farther away than it is. 22.5 cm divides by n instead of multiplying — option (@K).',
  d: 3, c: 'analysis', t: [3],
}), () => near((4 / 3) * 30, 40) || 'kf');
add('oblique-tf', tf({
  stem: 'The floor of a swimming pool, seen at a slant from the edge of the pool, appears even shallower than when it is seen from directly above.',
  key: 't',
  sol: 'True. For oblique viewing the rays leaving the water are bent further from the normal, so they trace back to a point even nearer the surface than the near-normal value real depth/n.',
  d: 2, c: 'understanding', t: [3],
}), () => {
  // apparent depth (per unit real depth) traced back from rays 10° and 35° from the normal in water
  const appD = (a) => Math.tan(rad(a)) / Math.tan(Math.asin((4 / 3) * sinD(a)));
  return (appD(35) < appD(10) && appD(10) < 0.76) || 'obl';
});
add('shift-ar', ar({
  a: 'The apparent shift of an ink mark seen through a glass slab is the same whether the slab lies on the mark or is held 2 cm above it.',
  r: 'The apparent shift produced by a glass slab of thickness t and refractive index n is t/n.',
  key: 'c',
  sol: 'A is true: the shift t(1 − 1/n) depends only on the slab, not on where the mark is. R is false: t/n is the apparent thickness of the slab; the shift is t − t/n — option (c).',
  d: 2, c: 'understanding', t: [3],
}));
const stp = 6 * (1 - 1 / 1.5);
add('stacked-mcq', mcq({
  stem: 'Two identical glass plates, each 3.0 cm thick with refractive index 1.5, are stacked on a printed page. Viewed from directly above, the print appears to be raised by',
  right: '2.0 cm',
  wrong: ['1.0 cm', '4.0 cm', '3.0 cm'],
  sol: r`The plates act as one slab 6.0 cm thick: $s = 6.0 \times \left(1 - \dfrac{1}{1.5}\right) = ${dec(stp, 2)}$ cm. 1.0 cm is the shift of one plate; 4.0 cm is the apparent thickness — option (@K).`,
  d: 2, c: 'understanding', t: [3],
}), () => near(stp, 2) || 'stp');
const aw = { rise: 2, nw: 4 / 3, no: 1.5 };
aw.tw = aw.rise / (1 - 1 / aw.nw);
aw.to = aw.rise / (1 - 1 / aw.no);
add('addwater-short2', short({
  marks: 2,
  stem: 'A coin lies at the bottom of an empty beaker. Water (n = 4/3) is poured in until the coin, viewed from above, appears to have risen by 2.0 cm. Find the depth of water. What depth of oil (n = 1.5) would give the same rise?',
  model: r`Rise $= t\left(1 - \dfrac{1}{n}\right)$. Water: $t\left(1 - \dfrac{3}{4}\right) = \dfrac{t}{4} = 2.0$, so $t = ${dec(aw.tw, 2)}$ cm.
Oil: $t\left(1 - \dfrac{2}{3}\right) = \dfrac{t}{3} = 2.0$, so $t = ${dec(aw.to, 2)}$ cm: less oil is needed because its index is higher.`,
  sol: 'Rise = t(1 − 1/n).',
  scheme: [['Water: t/4 = 2.0 cm, t = 8.0 cm', 1], ['Oil: t/3 = 2.0 cm, t = 6.0 cm', 1]],
  d: 3, c: 'analysis', t: [3], wl: null,
}), () => near(aw.tw, 8) && near(aw.to, 6) || 'aw');
add('stick-short2', short({
  marks: 2,
  stem: 'A straight stick is dipped obliquely into a pond. Explain why it looks bent at the water surface, and say whether the part under water looks raised or lowered.',
  model: 'Light from the submerged part bends **away from the normal** on leaving the water, so the eye traces it back to a point **higher** than the real one (apparent depth = real depth ÷ n). Each point is raised in proportion to its depth, so the immersed part looks **raised** and the stick looks bent.',
  sol: 'Refraction away from the normal raises each point by depth × (1 − 1/n).',
  scheme: [['Rays bend away from the normal on leaving the water', 1], ['Each point appears raised (more for deeper points): stick looks bent upwards', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('apparent-short3', short({
  marks: 3,
  stem: 'With a ray diagram described in words, show that for an object at the bottom of a liquid of refractive index n, viewed from directly above, n = real depth ÷ apparent depth. State the approximation you make.',
  model: r`Let O be the object at depth OB below the point B of the surface directly above it. A ray OB along the normal passes straight out. A second ray OA meets the surface at A at a small angle $i$ and refracts away from the normal at angle $r$; produced backwards it meets the normal BO at I, the image. Then $\tan i = \dfrac{AB}{OB}$ and $\tan r = \dfrac{AB}{IB}$.
Snell’s law at A (liquid to air): $n = \dfrac{\sin r}{\sin i}$. For near-normal viewing, i and r are **small**, so $\sin \approx \tan$:
$$n \approx \dfrac{\tan r}{\tan i} = \dfrac{OB}{IB} = \dfrac{\text{real depth}}{\text{apparent depth}}$$`,
  sol: 'Small angles: sin ≈ tan.',
  scheme: [['Diagram: normal ray and an oblique ray traced back to I', 1], ['tan i = AB/OB, tan r = AB/IB; n = sin r/sin i', 1], ['Small angles: n = OB/IB (real/apparent)', 1]],
  d: 3, c: 'understanding', t: [3], wl: null,
}));
const tk = { tw: 16, nw: 4 / 3, tg: 6, ng: 1.5 };
tk.app = tk.tw / tk.nw + tk.tg / tk.ng;
tk.rise = tk.tw + tk.tg - tk.app;
add('tank-short3', short({
  marks: 3,
  stem: 'A glass block 6.0 cm thick (n = 1.5) lies on the bottom of a tank, with a scratch on the tank floor beneath it, and is covered by 16 cm of water (n = 4/3). Viewed from directly above, find the apparent depth of the scratch below the water surface and how far it appears to be raised.',
  model: r`Viewed from above, each layer appears $t/n$ thick.
Water: $\dfrac{16}{4/3} = 12$ cm. Glass: $\dfrac{6.0}{1.5} = 4.0$ cm.
Apparent depth $= 12 + 4.0 = ${dec(tk.app, 2)}$ cm, while the real depth is $16 + 6.0 = 22$ cm, so the scratch appears raised by $${dec(tk.rise, 2)}$ cm (4.0 cm by the water and 2.0 cm by the glass).`,
  sol: 'Sum of t/n over the layers.',
  scheme: [['Water layer appears 12 cm', 1], ['Glass appears 4.0 cm; apparent depth 16 cm', 1], ['Raised by 22 − 16 = 6.0 cm', 1]],
  d: 3, c: 'application', t: [3], wl: null,
}), () => near(tk.app, 16) && near(tk.rise, 6) || 'tk');

// ================================================================ t04 total internal reflection, prisms, fibres
const fl = asinD(1 / 1.72);
add('flint-num', num({
  stem: 'Find the critical angle for light travelling from dense flint glass (n = 1.72) into air, in degrees (3 significant figures).',
  value: Number(dec(fl, 3)), tol: 0.2, unit: '°',
  sol: r`$\sin C = \dfrac{1}{n} = \dfrac{1}{1.72} = ${dec(1 / 1.72, 3)}$, so $C = \sin^{-1}(${dec(1 / 1.72, 3)}) = ${dec(fl, 3)}$ degrees.`,
  scheme: [['sin C = 1/1.72; C ≈ 35.5°', 1]],
  d: 2, c: 'understanding', t: [4],
}), (q) => near(fl, 35.546, 0.001) && q.answer.value === 35.5 || `fl ${fl}`);
const gly = asinD(1.47 / 1.52);
add('glycerine-num', num({
  stem: 'A block of crown glass (n = 1.52) is in contact with glycerine (n = 1.47). Find the critical angle for light travelling in the glass towards the glycerine, in degrees (3 significant figures).',
  value: Number(dec(gly, 3)), tol: 0.2, unit: '°',
  sol: r`$\sin C = \dfrac{n_2}{n_1} = \dfrac{1.47}{1.52} = ${dec(1.47 / 1.52, 4)}$, so $C = \sin^{-1}(${dec(1.47 / 1.52, 4)}) = ${dec(gly, 3)}$ degrees: only rays meeting the boundary almost at grazing incidence are totally reflected.`,
  scheme: [['sin C = n₂/n₁ = 1.47/1.52', 1], ['C ≈ 75.3°', 1]],
  marks: 2, d: 3, c: 'application', t: [4],
}), (q) => near(gly, 75.25, 0.001) && q.answer.value === 75.3 || `gly ${gly}`);
const pl = { v: 1.8e8 };
pl.n = 3e8 / pl.v;
pl.C = asinD(1 / pl.n);
add('speedC-mcq', mcq({
  stem: 'Light travels at 1.8 × 10⁸ m s⁻¹ in a certain plastic. The critical angle for light passing from this plastic into air is about',
  right: '37°',
  wrong: ['53°', '42°', '31°'],
  sol: r`$n = \dfrac{c}{v} = \dfrac{3.0 \times 10^{8}}{1.8 \times 10^{8}} = ${dec(pl.n, 3)}$, so $\sin C = \dfrac{1}{n} = 0.60$ and $C \approx ${dec(pl.C, 3)}^\circ$; 53° is the angle whose cosine is 0.60 — option (@K).`,
  d: 3, c: 'application', t: [4],
}), () => near(pl.C, 36.87, 0.001) || 'pl');
const p45 = asinD(1 / 1.4);
add('plastic45-mcq', mcq({
  stem: 'A right-angled isosceles prism for a toy periscope is moulded from a plastic of refractive index 1.40. A ray entering one short face normally meets the long face at 45°. At the long face the light',
  right: 'is partly refracted out, because 45° is less than the critical angle of about 45.6°',
  wrong: ['is totally reflected, because 45° is more than the critical angle of about 44.4°', 'is totally reflected, because every ray inside a prism is reflected at its long face', 'passes straight through without bending, because it entered the prism normally'],
  sol: r`$\sin C = \dfrac{1}{1.40}$, so $C \approx ${dec(p45, 3)}^\circ$. The angle of incidence, 45°, is just below C, so total internal reflection does not occur; some light escapes and the periscope image is dim — option (@K).`,
  d: 3, c: 'analysis', t: [4],
}), () => (p45 > 45 && near(p45, 45.58, 0.001)) || 'p45');
const P3 = (() => {
  const a = 120;
  const b = a * Math.tan(rad(30));
  return { poly: [[0, 0], [0, b], [a, b]], start: [-20, 0.55 * b] };
})();
const t30 = trace(P3.poly, 1.5, P3.start, [1, 0]);
add('prism30-mcq', mcq({
  stem: 'A glass prism (n = 1.5) has angles of 30°, 60° and 90°. A ray enters the shorter of the two faces that meet at the right angle, normally, and then meets the hypotenuse face. The angle of incidence at the hypotenuse, and what happens there, are',
  right: '60°; the light is totally reflected, since the critical angle of the glass is about 41.8°',
  wrong: ['30°; the light is totally reflected, since 30° exceeds the critical angle of the glass', '30°; the light is refracted out of the hypotenuse face', '60°; the light is refracted out, since the critical angle of the glass is about 62°'],
  sol: 'The shorter leg is opposite the 30° angle. A ray entering it normally travels parallel to the longer leg and meets the hypotenuse at 60° (the angle between the hypotenuse’s normal and the longer leg). Since sin C = 1/1.5 gives C ≈ 41.8° < 60°, the light is totally reflected — option (@K).',
  d: 3, c: 'analysis', t: [4],
}), () => (t30.ev[1].kind === 'TIR' && near(t30.ev[1].i, 60)) || `p30 ${JSON.stringify(t30.ev)}`);
const EQ = { poly: [[0, 0], [100, 0], [50, -100 * Math.sin(rad(60))]], start: [30, 20] };
const teq = trace(EQ.poly, 1.5, EQ.start, [0, -1]);
const eqDev = angleOf(teq.d, [0, -1]);
function angleOf(a, b) {
  return deg(Math.acos(Math.max(-1, Math.min(1, a[0] * b[0] + a[1] * b[1]))));
}
add('equilateral-mcq', mcq({
  stem: 'A ray enters one face of an equilateral glass prism (n = 1.5) normally. It meets the second face at an angle of incidence of 60°, is totally reflected there, and then leaves through the third face. Through what angle has the ray been turned in all?',
  right: '60°',
  wrong: ['120°', '90°', '180°'],
  sol: 'Reflection at an angle of incidence of 60° turns a ray through 180° − 2 × 60° = 60°. The reflected ray then meets the third face normally (by symmetry), so it leaves without further bending: the total deviation is 60° — option (@K).',
  d: 4, c: 'analysis', t: [4],
}), () => (teq.ev.map((e) => e.kind).join(' ') === 'in TIR out' && near(teq.ev[1].i, 60) && teq.ev[2].i < 1e-6 && near(eqDev, 60)) || `eq ${eqDev}`);
const ice = asinD(1 / 1.31);
add('ice-tf', tf({
  stem: 'A ray travelling inside a block of ice (n = 1.31) that meets the ice–air surface at 52° to the normal is totally reflected.',
  key: 't',
  sol: `True. sin C = 1/1.31, so C ≈ ${dec(ice, 3)}°; the angle of incidence, 52°, exceeds C, and the light is going from the denser ice to the rarer air, so it is totally reflected.`,
  d: 2, c: 'application', t: [4],
}), () => (ice < 52 && near(ice, 49.76, 0.001)) || `ice ${ice}`);
add('retro-ar', ar({
  a: 'A right-angled isosceles glass prism (n = 1.5) can send a beam of light back parallel to its original direction.',
  r: 'A beam entering the hypotenuse face normally meets each of the two shorter faces at 45°, which is more than the critical angle of the glass, so it is totally reflected twice.',
  key: 'a',
  sol: 'Both are true, and R explains A: the two total internal reflections at 45° each turn the beam through 90°, so it leaves through the hypotenuse reversed, turned through 180° — option (a).',
  d: 2, c: 'understanding', t: [4],
}), () => asinD(1 / 1.5) < 45 || 'retro');
add('cladding-ar', ar({
  a: 'Light can be guided along an optical fibre whose cladding has a higher refractive index than its core.',
  r: 'Total internal reflection can occur only when light travelling in an optically denser medium meets a boundary with a rarer one.',
  key: 'd',
  sol: 'R is true. A is false: with a cladding of higher index, light in the core meets a denser medium, so it is never totally reflected and leaks out into the cladding — option (d).',
  d: 2, c: 'understanding', t: [4],
}));
const fo = { h: 60, n: 4 / 3 };
fo.C = asinD(1 / fo.n);
fo.r = fo.h * Math.tan(rad(fo.C));
add('fountain-short3', short({
  marks: 3,
  stem: 'A small lamp lies at the bottom of an ornamental pool, 60 cm below the surface (n of water = 4/3). Explain why light from the lamp leaves the surface only through a circular patch, and find the radius of the patch.',
  model: r`Rays from the lamp that meet the surface at more than the critical angle C are **totally reflected** back into the water; only rays within C of the vertical escape. They meet the surface inside a circle centred above the lamp, whose edge is where $i = C$.
$\sin C = \dfrac{1}{n} = \dfrac{3}{4}$, so $C = ${dec(fo.C, 3)}^\circ$.
Radius $r = h\tan C = \dfrac{h}{\sqrt{n^2 - 1}} = 60 \times ${dec(Math.tan(rad(fo.C)), 3)} = ${dec(fo.r, 3)}$ cm.`,
  sol: 'Only rays within C escape; r = h tan C.',
  scheme: [['Rays beyond C are totally reflected; the edge of the patch is at i = C', 1], ['sin C = 3/4, C ≈ 48.6°', 1], ['r = h tan C ≈ 68.0 cm', 1]],
  d: 3, c: 'application', t: [4], wl: null,
}), () => near(fo.r, 180 / Math.sqrt(7)) && near(fo.r, 68.03, 0.001) || `fo ${fo.r}`);
add('sinC-short2', short({
  marks: 2,
  stem: 'Define the critical angle for light passing from a denser medium (index n₁) into a rarer one (index n₂), and obtain the relation between the critical angle and the two refractive indices.',
  model: r`The critical angle C is the **angle of incidence in the denser medium** for which the angle of refraction in the rarer medium is **90°** (the refracted ray grazes the boundary). Applying Snell’s law at that angle: $n_1\sin C = n_2\sin 90^\circ = n_2$, so $\sin C = \dfrac{n_2}{n_1}$; for the rarer medium air, $\sin C = \dfrac{1}{n}$.`,
  sol: 'Snell’s law with r = 90°.',
  scheme: [['Definition: angle of incidence in the denser medium giving r = 90°', 1], ['n₁ sin C = n₂, so sin C = n₂/n₁', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('prisms-short3', short({
  marks: 3,
  stem: 'Describe, with ray paths described in words, how a right-angled isosceles glass prism can be used (i) to turn a ray through 90°, and (ii) to turn it through 180°. State the angle of incidence at each reflecting face, and why the reflection there is total.',
  model: '(i) The ray enters one of the shorter faces **normally**, passes straight in and meets the hypotenuse face at **45°**; it is totally reflected and leaves normally through the other short face, turned through **90°**. (ii) The ray enters the **hypotenuse** face normally, meets each shorter face in turn at **45°**, is totally reflected at both, and leaves through the hypotenuse, turned through **180°**. The reflection is total because the light goes from glass to air and 45° exceeds the critical angle of glass, about 42°.',
  sol: '45° incidence exceeds C ≈ 42° for glass.',
  scheme: [['90° prism path with one TIR at 45°', 1], ['180° prism path with two TIRs at 45°', 1], ['45° > C (about 42°), glass to air: TIR', 1]],
  d: 2, c: 'understanding', t: [4], wl: [50, 90],
}), () => asinD(1 / 1.5) < 45 || 'prs');
add('fibre-short3', short({
  marks: 3,
  stem: 'Describe the construction of an optical fibre and explain how light travels along it, even when the fibre is gently bent. Give two uses of optical fibres.',
  model: 'An optical fibre has a very thin glass or plastic **core**, surrounded by a **cladding** of slightly lower refractive index and a protective outer coat. Light entering one end close to the axis meets the core–cladding boundary at an angle **greater than the critical angle**, so it is **totally reflected**, again and again, with almost no loss. A gentle bend keeps the angle of incidence above the critical angle, so the light follows the fibre. Uses: telephone and internet cables; endoscopes for viewing inside the body.',
  sol: 'Core of higher index inside cladding; repeated TIR.',
  scheme: [['Core inside cladding of lower refractive index', 1], ['Repeated TIR at angles above C, also round gentle bends', 1], ['Two uses', 1]],
  d: 2, c: 'understanding', t: [4], wl: [50, 90],
}));
const ac = { n1: 1.5, n2: 1.45 };
ac.C = asinD(ac.n2 / ac.n1);
ac.inside = 90 - ac.C;
ac.theta = asinD(ac.n1 * sinD(ac.inside));
add('acceptance-num', num({
  stem: 'An optical fibre has a core of refractive index 1.50 and cladding of refractive index 1.45. Find the largest angle to the fibre axis at which a ray in air can enter the flat end of the core and still be totally reflected at the core–cladding boundary, in degrees (3 significant figures).',
  value: Number(dec(ac.theta, 3)), tol: 0.2, unit: '°',
  sol: r`At the wall: $\sin C = \dfrac{1.45}{1.50}$, so $C = ${dec(ac.C, 4)}^\circ$; inside the core the ray may make at most $90^\circ - C = ${dec(ac.inside, 3)}^\circ$ with the axis. At the end face: $\sin\theta = 1.50\sin ${dec(ac.inside, 3)}^\circ = ${dec(sinD(ac.theta), 3)}$, so $\theta = \sin^{-1}(${dec(sinD(ac.theta), 3)}) = ${dec(ac.theta, 3)}$ degrees (equivalently $\sin\theta = \sqrt{n_1^2 - n_2^2}$).`,
  scheme: [['C ≈ 75.2°, so at most 14.8° to the axis inside', 1], ['sin θ = 1.50 sin 14.8°, θ ≈ 22.6°', 1]],
  marks: 2, d: 4, c: 'analysis', t: [4],
}), (q) => near(sinD(ac.theta), Math.sqrt(1.5 ** 2 - 1.45 ** 2)) && q.answer.value === 22.6 || `ac ${ac.theta}`);
const dm = { nd: 2.42, ng: 1.5, nw: 1.33 };
dm.Cd = asinD(dm.nw / dm.nd);
dm.Cg = asinD(dm.nw / dm.ng);
add('diamond-short2', short({
  marks: 2,
  stem: 'A jeweller claims that a small right-angled isosceles prism cut from diamond (n = 2.42) will still turn light through 90° by total internal reflection when it is used under water (n = 1.33), although a glass prism (n = 1.5) would not. Evaluate the claim.',
  model: r`The claim is **correct**. In water, diamond: $\sin C = \dfrac{1.33}{2.42}$, $C \approx ${dec(dm.Cd, 3)}^\circ$, less than the 45° angle of incidence, so the light is totally reflected. Glass: $\sin C = \dfrac{1.33}{1.5}$, $C \approx ${dec(dm.Cg, 3)}^\circ$, more than 45°, so light leaks out into the water.`,
  sol: 'Compare 45° with sin⁻¹(1.33/n).',
  scheme: [['Diamond in water: C ≈ 33° < 45°, total reflection', 1], ['Glass in water: C ≈ 62° > 45°, fails: claim correct', 1]],
  d: 3, c: 'evaluation', t: [4], wl: null,
}), () => dm.Cd < 45 && dm.Cg > 45 && near(dm.Cd, 33.34, 0.001) || `dm ${dm.Cd}`);
add('fibrebend-mcq', mcq({
  stem: 'Light starts to leak out of an optical fibre at a place where the fibre is bent very sharply. This is because at the bend',
  right: 'rays meet the core–cladding boundary at less than the critical angle',
  wrong: ['the refractive index of the core rises above that of the cladding', 'the light slows down and its frequency falls', 'the cladding absorbs all the light that reaches it'],
  sol: 'At a sharp bend the core wall turns towards the rays, so they strike it more nearly head-on; the angle of incidence falls below the critical angle and part of the light is refracted out of the core — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
const cm = [1 / 1.33, 1 / 1.52, 1 / 1.77, 1.33 / 1.52].map(asinD);
add('criticalmatch-match', match({
  stem: 'Match each boundary in Column A, crossed by light going from the first medium into the second, with its critical angle in Column B.',
  pairs: [
    ['Water (n = 1.33) to air', '48.8°'],
    ['Crown glass (n = 1.52) to air', '41.1°'],
    ['Sapphire (n = 1.77) to air', '34.4°'],
    ['Crown glass (n = 1.52) to water (n = 1.33)', '61.0°'],
  ],
  order: [3, 1, 0, 2],
  sol: 'sin C = n₂/n₁: water–air 48.8° (1 → s); glass–air 41.1° (2 → q); sapphire–air 34.4° (3 → p); glass–water 61.0° (4 → r).',
  d: 3, c: 'application', t: [4],
}), () => ['48.8', '41.1', '34.4', '61.0'].every((s, k) => dec(cm[k], 3) === s) || `cm ${cm}`);

// ================================================================ 5-mark questions (in parts)
const ml = mirror(-25, -20);
ml.hi = ml.m * 4;
add('mirror-long', long({
  stem: '(a) With a labelled ray diagram described in words, derive the mirror formula 1/v + 1/u = 1/f for a concave mirror forming a real image of an object placed beyond its centre of curvature, using the New Cartesian sign convention. [3] (b) An object 4.0 cm tall is placed 25 cm in front of a concave mirror of focal length 20 cm. Find the position, size and nature of the image. [2]',
  model: r`(a) Object AB stands on the axis beyond C. Ray AM, parallel to the axis, reflects through F; ray AP, to the pole, reflects at an equal angle. They meet at A′, and A′B′ is the real, inverted image between C and F. Draw MD perpendicular to the axis.
Triangles A′B′F and MDF are similar: $\dfrac{A'B'}{MD} = \dfrac{B'F}{FD}$. Triangles A′B′P and ABP are similar: $\dfrac{A'B'}{AB} = \dfrac{B'P}{BP}$. For a small aperture $MD = AB$ and $D \approx P$, so $\dfrac{B'F}{FP} = \dfrac{B'P}{BP}$.
With the signs $B'P = -v$, $BP = -u$, $FP = -f$, $B'F = f - v$: $\dfrac{f - v}{-f} = \dfrac{v}{u}$, so $uv - uf = vf$; dividing by $uvf$: $\dfrac{1}{v} + \dfrac{1}{u} = \dfrac{1}{f}$.

(b) $u = -25$ cm, $f = -20$ cm: $\dfrac{1}{v} = -\dfrac{1}{20} + \dfrac{1}{25} = -\dfrac{1}{100}$, so $v = ${dec(ml.v, 3)}$ cm. $m = -\dfrac{v}{u} = ${dec(ml.m, 2)}$, so $h' = ${dec(ml.hi, 2)}$ cm: real, inverted, four times enlarged, 100 cm in front of the mirror.`,
  sol: 'Two pairs of similar triangles with paraxial approximation; then signs.',
  scheme: [['Ray diagram: rays via F and P, MD drawn', 1], ['Similar triangles with MD = AB, D ≈ P', 1], ['Signs substituted and rearranged to 1/v + 1/u = 1/f', 1], ['v = −100 cm', 1], ['m = −4; image 16 cm tall, real, inverted', 1]],
  d: 3, c: 'application', t: [1], wl: null,
}), () => near(ml.v, -100) && near(ml.m, -4) && near(ml.hi, -16) || 'ml');
const cl = { f: 20, m: 0.2 };
cl.u = -((1 / cl.m) - 1) * cl.f;
cl.v = -cl.m * cl.u;
add('convex-long', long({
  stem: '(a) Using the mirror formula and the New Cartesian sign convention, show that a convex mirror always forms a virtual, erect, diminished image of a real object, lying between its pole and its focus. [2] (b) Give one reason why a convex mirror is used as a rear-view mirror and one reason why a concave mirror is used in a torch. [1] (c) A convex mirror of focal length 20 cm forms an image one fifth the size of an object. Find the object distance and the image distance. [2]',
  model: r`(a) For a convex mirror $f > 0$; a real object has $u < 0$. Then $\dfrac{1}{v} = \dfrac{1}{f} - \dfrac{1}{u} = \dfrac{1}{f} + \dfrac{1}{|u|}$, which is positive and larger than $\dfrac{1}{f}$: so $0 < v < f$, the image is behind the mirror (**virtual**) between P and F. Also $m = -\dfrac{v}{u} = \dfrac{v}{|u|}$ is positive (**erect**) and, since $v < f$ and $\dfrac{1}{v} > \dfrac{1}{|u|}$, $v < |u|$, so $m < 1$ (**diminished**).

(b) Rear-view: it gives an erect image of a wide field of view. Torch: a bulb at the focus of a concave reflector gives a parallel beam.

(c) Erect image: $m = +\dfrac{1}{5} = -\dfrac{v}{u}$, so $v = -\dfrac{u}{5}$. Then $-\dfrac{5}{u} + \dfrac{1}{u} = \dfrac{1}{20}$, so $-\dfrac{4}{u} = \dfrac{1}{20}$: $u = ${dec(cl.u, 2)}$ cm and $v = +${dec(cl.v, 2)}$ cm (16 cm behind the mirror).`,
  sol: '1/v = 1/f + 1/|u| > 1/f; m = v/|u| < 1; then m = 1/5.',
  scheme: [['1/v > 1/f > 0: virtual, between P and F', 1], ['m positive and less than 1: erect, diminished', 1], ['Wide field of view; parallel beam from bulb at F', 1], ['v = −u/5 substituted', 1], ['u = −80 cm, v = +16 cm', 1]],
  d: 3, c: 'application', t: [1], wl: null,
}), () => {
  const e = mirror(cl.u, cl.f);
  return (near(cl.u, -80) && near(e.v, 16) && near(e.m, 0.2)) || 'cl';
});
const rl = lateral(4, 1.55, 50);
rl.shift = 4 * (1 - 1 / 1.55);
add('refraction-long', long({
  stem: '(a) State Snell’s law. Show that a ray passing obliquely through a parallel-sided glass slab in air emerges parallel to its original direction. [2] (b) A ray in air falls at 50° on a glass slab 4.0 cm thick of refractive index 1.55. Find the angle of refraction and the lateral shift of the emergent ray. [2] (c) A mark on the lower face of the same slab is viewed from directly above. By how much does it appear to be raised? [1]',
  model: r`(a) Snell’s law: $n_1\sin i = n_2\sin r$ (with the incident ray, refracted ray and normal in one plane). At the top face $\sin i = n\sin r$. The faces are parallel, so the ray meets the lower face at $r$; there $n\sin r = \sin e$. Hence $\sin e = \sin i$, $e = i$: the emergent ray is parallel to the incident ray (only shifted sideways).

(b) $\sin r = \dfrac{\sin 50^\circ}{1.55} = ${dec(sinD(rl.r), 3)}$, so $r = ${dec(rl.r, 3)}^\circ$. $d = \dfrac{t\sin(i - r)}{\cos r} = \dfrac{4.0 \times \sin ${dec(50 - rl.r, 3)}^\circ}{\cos ${dec(rl.r, 3)}^\circ} = ${dec(rl.d, 3)}$ cm.

(c) $s = t\left(1 - \dfrac{1}{n}\right) = 4.0 \times \left(1 - \dfrac{1}{1.55}\right) = ${dec(rl.shift, 3)}$ cm.`,
  sol: 'e = i at parallel faces; d = t sin(i − r)/cos r; s = t(1 − 1/n).',
  scheme: [['Snell’s law stated', 1], ['sin e = n sin r = sin i, so e = i', 1], ['r ≈ 29.6°', 1], ['d ≈ 1.60 cm', 1], ['Raised by ≈ 1.42 cm', 1]],
  d: 3, c: 'application', t: [2, 3], wl: null,
}), () => near(rl.r, 29.62, 0.001) && near(rl.d, 1.6023, 0.002) && near(rl.shift, 1.4194, 0.001) || `rl ${rl.r} ${rl.d}`);
const tl = { n1: 1.58, n2: 1.5 };
tl.C = asinD(tl.n2 / tl.n1);
tl.axis = 90 - tl.C;
add('tir-long', long({
  stem: '(a) What is meant by the critical angle? Derive the relation between the critical angle and the refractive index of a medium surrounded by air. [2] (b) An optical fibre has a core of refractive index 1.58 and cladding of refractive index 1.50. Find (i) the critical angle at the core–cladding boundary, (ii) the largest angle a ray inside the core may make with the fibre axis and still be guided along it. [2] (c) Give one advantage of optical fibres over copper cables for carrying signals. [1]',
  model: r`(a) The critical angle is the angle of incidence in the denser medium for which the angle of refraction in the rarer medium is 90°. Snell’s law from the medium (index n) into air at that angle: $n\sin C = 1 \times \sin 90^\circ$, so $\sin C = \dfrac{1}{n}$.

(b)(i) $\sin C = \dfrac{1.50}{1.58} = ${dec(tl.n2 / tl.n1, 4)}$, so $C = ${dec(tl.C, 3)}^\circ$.
(ii) The ray meets the wall at $90^\circ - \theta$ when it makes $\theta$ with the axis; it is guided while $90^\circ - \theta > C$, i.e. $\theta < 90^\circ - ${dec(tl.C, 3)}^\circ = ${dec(tl.axis, 3)}^\circ$.

(c) Any one: far greater information capacity; very low loss over long distances; no electrical interference or cross-talk; lighter and thinner.`,
  sol: 'sin C = 1/n; sin C = n₂/n₁ for the fibre; θ < 90° − C.',
  scheme: [['Definition of the critical angle', 1], ['n sin C = 1, so sin C = 1/n', 1], ['C ≈ 71.7°', 1], ['Largest angle to the axis ≈ 18.3°', 1], ['One valid advantage', 1]],
  d: 3, c: 'application', t: [4], wl: null,
}), () => near(tl.C, 71.69, 0.001) && near(tl.axis, 18.31, 0.002) || `tl ${tl.C}`);
const pl5 = { n: 1.5, nw: 1.33 };
pl5.min = 1 / sinD(45);
pl5.Cair = asinD(1 / pl5.n);
pl5.Cw = asinD(pl5.nw / pl5.n);
add('prism-long', long({
  stem: '(a) Describe, with the ray path described in words, how a right-angled isosceles glass prism turns a ray through 180°, giving the angle of incidence at each face. [2] (b) Find the least refractive index the prism material must have for it to work in air. [1] (c) A 30°–60°–90° prism of glass with n = 1.50 is set so that a ray entering its shorter right-angle face normally meets the hypotenuse at 60°. Show whether the ray is totally reflected there (i) in air, (ii) when the prism is immersed in water (n = 1.33). [2]',
  model: r`(a) The ray enters the hypotenuse face normally (angle of incidence 0°, no bending), meets one shorter face at 45° and is totally reflected, travels parallel to the hypotenuse, meets the other shorter face at 45° and is totally reflected again, then leaves the hypotenuse face normally, travelling back parallel to its original path.

(b) Total reflection at 45° needs $45^\circ > C$, i.e. $\sin C = \dfrac{1}{n} < \sin 45^\circ$: $n > \sqrt 2 = ${dec(pl5.min, 3)}$.

(c)(i) In air $\sin C = \dfrac{1}{1.50}$, $C = ${dec(pl5.Cair, 3)}^\circ < 60^\circ$: **totally reflected**.
(ii) In water $\sin C = \dfrac{1.33}{1.50}$, $C = ${dec(pl5.Cw, 3)}^\circ > 60^\circ$: **not** totally reflected; part of the light escapes into the water.`,
  sol: 'Two TIRs at 45°; n > √2; compare 60° with C in air and in water.',
  scheme: [['Normal entry through the hypotenuse; two TIRs at 45°', 1], ['Emerges reversed through the hypotenuse', 1], ['n > √2 ≈ 1.41', 1], ['Air: C ≈ 41.8° < 60°, total', 1], ['Water: C ≈ 62.5° > 60°, not total', 1]],
  d: 4, c: 'analysis', t: [4], wl: null,
}), () => near(pl5.min, Math.SQRT2) && pl5.Cair < 60 && pl5.Cw > 60 && near(pl5.Cw, 62.46, 0.001) || `pl5 ${pl5.Cw}`);
