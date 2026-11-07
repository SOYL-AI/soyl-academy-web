// ISC 12 Physics ch15 Refraction at Spherical Surfaces and Thin Lenses — question bank (ISC style).
// Numbers computed and re-checked; New Cartesian sign convention throughout (light from left to right, real object u < 0,
// R positive when the centre of curvature lies on the outgoing side, converging lens f > 0). Lens and mirror systems are
// re-solved with the paraxial ray tracer in svgs.mjs, independently of the step-by-step formulas used in the answers.
import { mk, add, r, dec, near } from '../../isc-12-physics-ch01/src/lib.mjs';
import { surfaceImage, lensImage, lensMaker, systemImage, parallelImage, traceRay } from './svgs.mjs';

const { mcq, ar, tf, fill, match, num, short, long } = mk;
const L = (x, f) => ({ x, kind: 'lens', f });
const M = (x, f) => ({ x, kind: 'mirror', f });

// ================================================================ t01 refraction at a single spherical surface
add('surfsign-mcq', mcq({
  stem: 'A lamp in air faces the convex end of a long acrylic rod (n = 1.49). The lamp is 40 cm from the end, and the centre of curvature of the end lies 5.0 cm inside the rod. With the light from the lamp taken as travelling from left to right, the values to use in n₂/v − n₁/u = (n₂ − n₁)/R are',
  right: 'u = −40 cm and R = +5.0 cm',
  wrong: ['u = +40 cm and R = +5.0 cm', 'u = −40 cm and R = −5.0 cm', 'u = +40 cm and R = −5.0 cm'],
  sol: 'Distances are measured from the pole. The lamp is on the side the light comes from, so u is negative; the centre of curvature is on the side the light goes to, inside the rod, so R is positive — option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
const rod = { n: 1.6, R: 4, u: -20 };
rod.v = surfaceImage(1, rod.n, rod.u, rod.R);
add('rod-num', num({
  stem: 'One end of a long acrylic-glass rod (n = 1.6) is ground to a convex surface of radius 4.0 cm. A small bright bead in air is 20 cm from this end, on the axis. Find the distance of its image from the end of the rod, in cm, with its sign.',
  value: Number(dec(rod.v, 2)), tol: 0.3, unit: 'cm',
  sol: r`$n_1 = 1$, $n_2 = 1.6$, $u = -20$ cm, $R = +4.0$ cm. $\dfrac{1.6}{v} = \dfrac{0.6}{4.0} + \dfrac{1}{-20} = 0.15 - 0.05 = 0.10$, so $v = ${dec(rod.v, 2)}$ cm: a real image inside the rod.`,
  scheme: [['Signs and substitution: 1.6/v = 0.6/4.0 − 1/20', 1], ['v = +16 cm (real, inside the rod)', 1]],
  marks: 2, d: 2, c: 'application', t: [1],
}), (q) => near(1.6 / rod.v - 1 / rod.u, 0.6 / 4) && q.answer.value === 16 || `rod ${rod.v}`);
const bowl = { n1: 4 / 3, n2: 1, u: -10, R: -15 };
bowl.v = surfaceImage(bowl.n1, bowl.n2, bowl.u, bowl.R);
bowl.m = (bowl.n1 * bowl.v) / (bowl.n2 * bowl.u);
add('fishbowl-num', num({
  stem: 'A goldfish swims in a spherical glass bowl of radius 15 cm filled with water (n = 4/3). A child looks at it from outside along a line through the centre of the bowl, and the fish is 10 cm from the near wall. Neglecting the thin glass, find the image distance v of the fish from the wall, in cm, with its sign (light travelling from the fish towards the child).',
  value: Number(dec(bowl.v, 2)), tol: 0.2, unit: 'cm',
  sol: r`Light goes from water to air: $n_1 = 4/3$, $n_2 = 1$, $u = -10$ cm. The centre of the bowl is on the water side, against the light, so $R = -15$ cm. $\dfrac{1}{v} = \dfrac{1 - 4/3}{-15} + \dfrac{4/3}{-10} = \dfrac{1}{45} - \dfrac{2}{15} = -\dfrac{5}{45}$, so $v = ${dec(bowl.v, 2)}$ cm: a virtual image 9.0 cm inside the bowl, slightly nearer than the fish and magnified ($m = \dfrac{n_1 v}{n_2 u} = ${dec(bowl.m, 2)}$).`,
  scheme: [['Signs: n₁ = 4/3, n₂ = 1, u = −10 cm, R = −15 cm', 1], ['v = −9.0 cm (virtual, inside the bowl)', 1]],
  marks: 2, d: 3, c: 'analysis', t: [1],
}), (q) => near(bowl.v, -9) && near(bowl.m, 1.2) && q.answer.value === -9 || `bowl ${bowl.v}`);
const rf = { n: 1.5, R: 3.5 };
rf.f2 = (rf.n * rf.R) / (rf.n - 1);
add('rodfocus-fill', fill({
  stem: 'A glass rod (n = 1.5) has a convex end of radius 3.5 cm. A beam of light travelling in air parallel to the axis of the rod enters this end and is brought to a focus ___ cm inside the glass.',
  acc: [['10.5', '10.50']],
  sol: r`For $u \to -\infty$: $\dfrac{1.5}{v} = \dfrac{0.5}{3.5}$, so $v = f_2 = \dfrac{n_2 R}{n_2 - n_1} = \dfrac{1.5 \times 3.5}{0.5} = ${dec(rf.f2, 3)}$ cm.`,
  d: 2, c: 'understanding', t: [1],
}), (q) => near(surfaceImage(1, 1.5, -1e9, 3.5), 10.5, 1e-6) && q.answer.blanks[0].accepted[0] === '10.5' || 'rf');
const ns = surfaceImage(1, 1.5, -6, 5);
add('nearsurface-mcq', mcq({
  stem: 'A small bead in air is 6.0 cm from the convex end (radius 5.0 cm) of a thick glass rod of refractive index 1.5. The image of the bead formed by refraction at this end is',
  right: 'virtual, 22.5 cm from the end on the air side',
  wrong: ['real, 22.5 cm inside the glass', 'virtual, 9.0 cm from the end on the air side', 'real, 15 cm inside the glass'],
  sol: r`$\dfrac{1.5}{v} = \dfrac{0.5}{5.0} - \dfrac{1}{6.0} = 0.100 - 0.167 = -0.0667$, so $v = ${dec(ns, 3)}$ cm. The negative sign puts the image on the air side: the rays inside the glass still diverge, so the image is virtual. The bead is nearer than the first focal point (10 cm) — option (@K).`,
  d: 3, c: 'application', t: [1],
}), () => near(ns, -22.5) || `ns ${ns}`);
const sf = surfaceImage(1, 1.5, -1e9, 1);
add('surfacefocus-mcq', mcq({
  stem: 'Sunlight falls along the axis onto the convex polished face, of radius of curvature R, of a large glass block of refractive index 1.5. Inside the glass the light converges to a point at a distance from the pole of',
  right: '3R',
  wrong: ['2R', 'R/2', '1.5R'],
  sol: r`For parallel light $u \to -\infty$: $\dfrac{1.5}{v} = \dfrac{0.5}{R}$, so $v = f_2 = \dfrac{n_2 R}{n_2 - n_1} = 3R$. (2R is the first focal length measured in air; R/2 is the focal length of a mirror) — option (@K).`,
  d: 2, c: 'understanding', t: [1],
}), () => near(sf, 3, 1e-6) || `sf ${sf}`);
add('flat-tf', tf({
  stem: 'Letting R become infinite in n₂/v − n₁/u = (n₂ − n₁)/R gives the apparent-depth result: a pebble 12 cm below a flat water surface (n = 4/3), viewed from directly above, appears 9.0 cm below the surface.',
  key: 't',
  sol: 'True. With R → ∞, n₂/v = n₁/u. Light goes from water (n₁ = 4/3) to air (n₂ = 1) with u = −12 cm, so v = (n₂/n₁)u = (3/4)(−12) = −9.0 cm: the pebble appears 9.0 cm deep, i.e. real depth ÷ n.',
  d: 2, c: 'understanding', t: [1],
}), () => near(surfaceImage(4 / 3, 1, -12, 1e12), -9, 1e-6) || 'flat');
add('surface-ar', ar({
  a: 'A point object in air on the axis of a convex glass surface always forms a real image inside the glass.',
  r: 'A convex glass surface facing the air converges light that enters the glass through it.',
  key: 'd',
  sol: 'R is true: (n₂ − n₁)/R > 0, so the surface converges light. A is false: an object nearer than the first focal point, |u| < n₁R/(n₂ − n₁), gives a negative v, a virtual image on the air side — option (d).',
  d: 2, c: 'understanding', t: [1],
}), () => surfaceImage(1, 1.5, -6, 5) < 0 || 'sar');
const pw = { R: 7.5, n: 1.5 };
pw.v = surfaceImage(pw.n, 1, -pw.R, -pw.R);
pw.slab = pw.R * (1 - 1 / pw.n);
add('paperweight-short2', short({
  marks: 2,
  stem: 'A hemispherical glass paperweight (n = 1.5, radius 7.5 cm) rests with its flat face on a letter printed on a page, the letter directly below the top of the dome. Viewed from above, where does the letter appear? Compare this with a flat glass slab 7.5 cm thick.',
  model: r`The letter is at the centre of curvature of the dome: $u = -7.5$ cm, $R = -7.5$ cm (glass to air). $\dfrac{1}{v} = \dfrac{1 - 1.5}{-7.5} + \dfrac{1.5}{-7.5} = -\dfrac{1}{7.5}$, so $v = ${dec(pw.v, 2)}$ cm: the letter is seen at its **true position** (its rays meet the dome normally). A slab would raise it by $7.5\left(1 - \dfrac{1}{1.5}\right) = ${dec(pw.slab, 2)}$ cm.`,
  sol: 'Object at the centre of curvature: no shift; slab shift t(1 − 1/n).',
  scheme: [['Dome: v = −7.5 cm, letter at its true place', 1], ['Slab: raised by 2.5 cm', 1]],
  d: 3, c: 'analysis', t: [1], wl: null,
}), () => near(pw.v, -7.5) && near(pw.slab, 2.5) || `pw ${pw.v}`);
const mb = { n: 1.5, R: 1 };
mb.v1 = surfaceImage(1, mb.n, -1e12, mb.R);
mb.u2 = mb.v1 - 2 * mb.R;
mb.v2 = surfaceImage(mb.n, 1, mb.u2, -mb.R);
add('sphere-short3', short({
  marks: 3,
  stem: 'A glass marble (n = 1.5) of radius 1.0 cm is held in a beam of sunlight. Treating each surface in turn, find where the light is brought to a focus, measured from the far side of the marble.',
  model: r`**First surface** (air to glass, $R_1 = +1.0$ cm, $u \to -\infty$): $\dfrac{1.5}{v_1} = \dfrac{0.5}{1.0}$, so $v_1 = ${dec(mb.v1, 2)}$ cm from the front, i.e. 1.0 cm beyond the back surface.
**Second surface** (glass to air, $R_2 = -1.0$ cm): the rays still converge towards that point, a **virtual object** at $u_2 = 3.0 - 2.0 = +${dec(mb.u2, 2)}$ cm.
$\dfrac{1}{v} = \dfrac{1 - 1.5}{-1.0} + \dfrac{1.5}{1.0} = 0.5 + 1.5 = 2.0$, so $v = ${dec(mb.v2, 1)}$ cm: the focus is 0.5 cm beyond the back of the marble.`,
  sol: 'Surface 1 gives v₁ = 3.0 cm; virtual object u₂ = +1.0 cm for surface 2; v = 0.5 cm.',
  scheme: [['v₁ = 3.0 cm from the front surface', 1], ['Virtual object u₂ = +1.0 cm, R₂ = −1.0 cm', 1], ['Focus 0.5 cm beyond the marble', 1]],
  d: 4, c: 'analysis', t: [1], wl: null,
}), () => near(mb.v1, 3, 1e-6) && near(mb.v2, 0.5, 1e-6) || `mb ${mb.v2}`);
const ri = { n: 1.5, R: 3, u: -15, h: 1.5 };
ri.v = surfaceImage(1, ri.n, ri.u, ri.R);
ri.m = ri.v / (ri.n * ri.u);
add('rodimage-short3', short({
  marks: 3,
  stem: 'A glass rod (n = 1.5) has a convex end of radius 3.0 cm. A tiny arrow 1.5 mm tall stands upright in air 15 cm from this end, on the axis. Find the position of its image, the magnification, and the height and nature of the image.',
  model: r`$\dfrac{1.5}{v} = \dfrac{0.5}{3.0} + \dfrac{1}{-15} = 0.167 - 0.067 = 0.100$, so $v = +${dec(ri.v, 2)}$ cm (inside the rod, real).
For a single surface $m = \dfrac{n_1 v}{n_2 u} = \dfrac{1 \times 15}{1.5 \times (-15)} = ${dec(ri.m, 3)}$.
$h' = mh = ${dec(ri.m, 3)} \times 1.5 = ${dec(ri.m * ri.h, 2)}$ mm: a **real, inverted** image 1.0 mm tall, 15 cm inside the rod.`,
  sol: 'Surface formula for v; m = n₁v/(n₂u).',
  scheme: [['v = +15 cm', 1], ['m = n₁v/(n₂u) = −0.667', 1], ['Image 1.0 mm, real and inverted', 1]],
  d: 3, c: 'application', t: [1], wl: null,
}), () => near(ri.v, 15) && near(ri.m * ri.h, -1) || `ri ${ri.v}`);
const eq = { n: 1.5, R: 4 };
eq.a = ((1 + eq.n) * eq.R) / (eq.n - 1);
add('equal-num', num({
  stem: 'At what distance in front of the convex end (radius 4.0 cm) of a glass rod (n = 1.5) must a point object in air be placed so that its real image inside the rod is exactly as far from the end as the object is? Answer in cm.',
  value: Number(dec(eq.a, 2)), tol: 0.2, unit: 'cm',
  sol: r`Put $u = -a$ and $v = +a$: $\dfrac{1.5}{a} + \dfrac{1}{a} = \dfrac{0.5}{4.0}$, so $\dfrac{2.5}{a} = 0.125$ and $a = ${dec(eq.a, 2)}$ cm.`,
  scheme: [['u = −a, v = +a substituted: 2.5/a = 0.5/4.0', 1], ['a = 20 cm', 1]],
  marks: 2, d: 3, c: 'analysis', t: [1],
}), (q) => near(surfaceImage(1, 1.5, -eq.a, 4), eq.a) && q.answer.value === 20 || `eq ${eq.a}`);
const tf2 = { n1: 1, n2: 4 / 3, R: 8 };
tf2.f2 = (tf2.n2 * tf2.R) / (tf2.n2 - tf2.n1);
tf2.f1 = (-tf2.n1 * tf2.R) / (tf2.n2 - tf2.n1);
add('twofoci-short2', short({
  marks: 2,
  stem: 'Show that the two focal lengths of a single spherical refracting surface satisfy f₂/f₁ = −n₂/n₁. Find both for a convex water surface (n = 4/3) of radius 8.0 cm, with light arriving from the air.',
  model: r`$u \to -\infty$: $f_2 = \dfrac{n_2 R}{n_2 - n_1}$; $v \to \infty$: $f_1 = -\dfrac{n_1 R}{n_2 - n_1}$; dividing, $\dfrac{f_2}{f_1} = -\dfrac{n_2}{n_1}$.
Here $f_2 = \dfrac{(4/3)(8.0)}{1/3} = +${dec(tf2.f2, 2)}$ cm and $f_1 = ${dec(tf2.f1, 2)}$ cm.`,
  sol: 'Put u → −∞, then v → ∞.',
  scheme: [['Both focal lengths from the formula; ratio −n₂/n₁', 1], ['f₂ = +32 cm, f₁ = −24 cm', 1]],
  d: 3, c: 'analysis', t: [1], wl: null,
}), () => near(tf2.f2, 32) && near(tf2.f1, -24) && near(tf2.f2 / tf2.f1, -4 / 3) || 'tf2');

// ================================================================ t02 lens maker's formula, thin lens formula, liquids
add('biconcave-mcq', mcq({
  stem: 'Light travels from left to right through a thin biconcave lens of glass in air. In the lens maker’s formula, the signs of R₁, R₂ and of the focal length f are',
  right: 'R₁ negative, R₂ positive, f negative',
  wrong: ['R₁ positive, R₂ negative, f negative', 'R₁ negative, R₂ positive, f positive', 'R₁ positive, R₂ negative, f positive'],
  sol: 'The first face is concave towards the light: its centre of curvature lies on the incoming (left) side, so R₁ < 0. The second face’s centre lies on the right, so R₂ > 0. Then 1/R₁ − 1/R₂ < 0 and f < 0: a diverging lens — option (@K).',
  d: 2, c: 'understanding', t: [2],
}), () => lensMaker(1.5, -20, 20) < 0 || 'bcc');
const pc = { n: 1.52, f: 50 };
pc.R = (pc.n - 1) * pc.f;
add('planoconvex-num', num({
  stem: 'An optician must grind a plano-convex lens of focal length 50 cm from glass of refractive index 1.52. What radius of curvature must the curved face have? Answer in cm.',
  value: Number(dec(pc.R, 2)), tol: 0.2, unit: 'cm',
  sol: r`With the plane face $R = \infty$: $\dfrac{1}{f} = \dfrac{n - 1}{R}$, so $R = (n - 1)f = 0.52 \times 50 = ${dec(pc.R, 2)}$ cm.`,
  scheme: [['1/f = (n − 1)/R for a plano-convex lens', 1], ['R = 26 cm', 1]],
  marks: 2, d: 2, c: 'understanding', t: [2],
}), (q) => near(lensMaker(1.52, Infinity, -pc.R), 50) && q.answer.value === 26 || 'pc');
const ue = lensMaker(1.55, 22, -33);
add('unequal-num', num({
  stem: 'A biconvex lens is made of glass of refractive index 1.55, with radii of curvature 22 cm and 33 cm. Find its focal length in air, in cm.',
  value: Number(dec(ue, 2)), tol: 0.2, unit: 'cm',
  sol: r`$R_1 = +22$ cm, $R_2 = -33$ cm: $\dfrac{1}{f} = 0.55\left(\dfrac{1}{22} + \dfrac{1}{33}\right) = 0.55 \times \dfrac{5}{66} = \dfrac{1}{24}$, so $f = ${dec(ue, 2)}$ cm.`,
  scheme: [['Signs R₁ = +22 cm, R₂ = −33 cm in the lens maker’s formula', 1], ['f = 24 cm', 1]],
  marks: 2, d: 2, c: 'understanding', t: [2],
}), (q) => near(ue, 24) && near(lensMaker(1.55, 33, -22), 24) && q.answer.value === 24 || `ue ${ue}`);
const bcn = lensMaker(1.65, -26, 26);
add('biconcave-num', num({
  stem: 'A symmetrical biconcave lens is made of flint glass (n = 1.65), each face having a radius of curvature of 26 cm. Find its focal length in air, in cm, with its sign.',
  value: Number(dec(bcn, 2)), tol: 0.2, unit: 'cm',
  sol: r`$R_1 = -26$ cm, $R_2 = +26$ cm: $\dfrac{1}{f} = 0.65\left(-\dfrac{1}{26} - \dfrac{1}{26}\right) = -\dfrac{1.3}{26} = -0.05$, so $f = ${dec(bcn, 2)}$ cm (diverging).`,
  scheme: [['1/f = 0.65 × (−2/26); f = −20 cm', 1]],
  d: 2, c: 'understanding', t: [2],
}), (q) => near(bcn, -20) && q.answer.value === -20 || `bcn ${bcn}`);
add('reverse-tf', tf({
  stem: 'Turning a thin plano-convex lens round, so that the light meets its flat face first instead of its curved face, changes its focal length.',
  key: 'f',
  sol: 'False. Curved face first: R₁ = +R, R₂ = ∞; flat face first: R₁ = ∞, R₂ = −R. In both cases 1/R₁ − 1/R₂ = 1/R, so f = R/(n − 1) is unchanged for a thin lens.',
  d: 2, c: 'understanding', t: [2],
}), () => near(lensMaker(1.5, 10, Infinity), lensMaker(1.5, Infinity, -10)) || 'rev');
const wt = { n: 1.5, fa: 18, nw: 4 / 3 };
wt.fw = (wt.fa * (wt.n - 1)) / (wt.n / wt.nw - 1);
add('water-num', num({
  stem: 'A glass lens (n = 1.5) has a focal length of +18 cm in air. A diver uses it under water (n = 4/3). Find its focal length in water, in cm.',
  value: Number(dec(wt.fw, 2)), tol: 0.5, unit: 'cm',
  sol: r`$\dfrac{f_w}{f_a} = \dfrac{n - 1}{n/n_w - 1} = \dfrac{0.5}{1.125 - 1} = 4$, so $f_w = 4 \times 18 = ${dec(wt.fw, 2)}$ cm (still converging).`,
  scheme: [['Ratio (n − 1)/(n/n_w − 1) = 4', 1], ['f_w = 72 cm', 1]],
  marks: 2, d: 3, c: 'application', t: [2],
}), (q) => {
  // independent: radii from f in air (equiconvex), then the lens maker's formula in water
  const R = 2 * (wt.n - 1) * wt.fa;
  return (near(lensMaker(wt.n, R, -R, wt.nw), 72) && q.answer.value === 72) || 'wt';
});
add('cs2-mcq', mcq({
  stem: 'A biconvex lens of crown glass (n = 1.52) is immersed in carbon disulphide (n = 1.63). In the liquid, the lens',
  right: 'diverges light, because the glass is optically rarer than the liquid',
  wrong: ['converges light more strongly than in air', 'still converges light, but with a longer focal length', 'neither converges nor diverges light, because both media are transparent'],
  sol: r`In the liquid the factor $\dfrac{n}{n_m} - 1 = \dfrac{1.52}{1.63} - 1 \approx -0.067$ is negative, while $\dfrac{1}{R_1} - \dfrac{1}{R_2}$ stays positive, so f is negative: the convex lens now diverges light — option (@K).`,
  d: 3, c: 'analysis', t: [2],
}), () => lensMaker(1.52, 20, -20, 1.63) < 0 || 'cs2');
add('liquid-ar', ar({
  a: 'A biconvex glass lens has a longer focal length when it is immersed in water than when it is in air.',
  r: 'The refractive index of glass relative to water is smaller than its refractive index relative to air.',
  key: 'a',
  sol: 'Both are true, and R explains A: 1/f is proportional to (n/n_m − 1), which is smaller in water (1.5/1.33 − 1 ≈ 0.13) than in air (0.5), so the lens bends light less and f is longer — option (a).',
  d: 2, c: 'understanding', t: [2],
}), () => lensMaker(1.5, 20, -20, 4 / 3) > lensMaker(1.5, 20, -20) || 'lar');
add('airlens-ar', ar({
  a: 'A thin air gap shaped like a biconvex lens, trapped inside a block of glass, diverges light that passes through it.',
  r: 'In the lens maker’s formula the factor (n_lens/n_surroundings − 1) is negative when the lens material is optically rarer than its surroundings.',
  key: 'a',
  sol: 'Both are true, and R explains A: for the air lens n_lens/n_surroundings = 1/1.5, so the factor is −1/3 while (1/R₁ − 1/R₂) > 0; f is negative and the convex-shaped air gap diverges light — option (a).',
  d: 3, c: 'understanding', t: [2],
}), () => lensMaker(1, 10, -10, 1.5) < 0 || 'air');
add('shapes-match', match({
  stem: 'For light travelling from left to right, match each thin lens in Column A with the signs of its radii of curvature in Column B.',
  pairs: [
    ['Biconvex lens', 'R₁ > 0 and R₂ < 0'],
    ['Biconcave lens', 'R₁ < 0 and R₂ > 0'],
    ['Plano-convex lens with its flat face towards the light', 'R₁ infinite and R₂ < 0'],
    ['Plano-concave lens with its curved face towards the light', 'R₁ < 0 and R₂ infinite'],
  ],
  order: [1, 3, 0, 2],
  sol: 'A radius is positive when its centre of curvature lies on the outgoing (right) side: biconvex → R₁ > 0, R₂ < 0 (1 → q); biconcave → R₁ < 0, R₂ > 0 (2 → s); plano-convex, flat face first → R₁ infinite, R₂ < 0 (3 → p); plano-concave, curved face first → R₁ < 0, R₂ infinite (4 → r).',
  d: 2, c: 'understanding', t: [2],
}));
const lf = { n: 1.5, fa: 20, fl: -60 };
lf.k = (lf.n - 1) * (lf.fa / lf.fl); // n/nl − 1
lf.nl = lf.n / (1 + lf.k);
add('liquidfind-short3', short({
  marks: 3,
  stem: 'A biconvex glass lens (n = 1.5) has a focal length of 20 cm in air. When it is immersed in a certain oil, it behaves as a diverging lens of focal length 60 cm. Find the refractive index of the oil, and explain why the lens diverges light in it.',
  model: r`$\dfrac{f_l}{f_a} = \dfrac{n - 1}{n/n_l - 1}$ with $f_l = -60$ cm: $\dfrac{-60}{20} = \dfrac{0.5}{1.5/n_l - 1}$, so $\dfrac{1.5}{n_l} - 1 = -\dfrac{1}{6}$.
Then $\dfrac{1.5}{n_l} = \dfrac{5}{6}$ and $n_l = ${dec(lf.nl, 2)}$.
The oil is optically **denser** than the glass ($1.8 > 1.5$), so $n/n_l - 1 < 0$ and, with $(1/R_1 - 1/R_2) > 0$, f is negative: light bends away from the thicker middle of the lens.`,
  sol: 'f_l/f_a = (n − 1)/(n/n_l − 1) with f_l = −60 cm.',
  scheme: [['Ratio equation with f_l = −60 cm', 1], ['n_l = 1.8', 1], ['Oil denser than glass makes (n/n_l − 1) negative', 1]],
  d: 3, c: 'analysis', t: [2], wl: null,
}), () => {
  const R = 2 * (lf.n - 1) * lf.fa;
  return (near(lf.nl, 1.8) && near(lensMaker(lf.n, R, -R, lf.nl), -60)) || `lf ${lf.nl}`;
});
add('biconcave-short2', short({
  marks: 2,
  stem: 'Using the lens maker’s formula, show that a thin biconcave glass lens in air always diverges light, whatever the radii of its two faces.',
  model: r`For light from the left, $R_1 = -|R_1|$ and $R_2 = +|R_2|$, so $\dfrac{1}{R_1} - \dfrac{1}{R_2} = -\left(\dfrac{1}{|R_1|} + \dfrac{1}{|R_2|}\right) < 0$. Glass in air has $n > 1$, so $(n - 1) > 0$. Hence $\dfrac{1}{f} < 0$: **f is negative** for any radii, and the lens is diverging.`,
  sol: 'Both terms of the bracket are negative; (n − 1) > 0.',
  scheme: [['Signs R₁ < 0, R₂ > 0 make the bracket negative', 1], ['(n − 1) > 0, so f < 0: diverging', 1]],
  d: 3, c: 'analysis', t: [2], wl: null,
}), () => [[5, 40], [30, 30], [12, 90]].every(([a, b]) => lensMaker(1.5, -a, b) < 0) || 'bcs');
const ld = { n: 1.5, P: 6, nw: 4 / 3 };
ld.Pw = (ld.P * (ld.n / ld.nw - 1)) / (ld.n - 1);
add('lensdrop-short2', short({
  marks: 2,
  stem: 'A student says that a glass lens (n = 1.5) of power +6.0 D in air will have a power of +3.0 D when used under water (n = 4/3), “since water halves the bending”. Evaluate the claim.',
  model: r`The claim is **wrong**. Power is proportional to $(n/n_m - 1)$: in air $0.5$, in water $\dfrac{1.5}{4/3} - 1 = 0.125$, a quarter as much. So the focal length becomes four times as long and the power falls to $\dfrac{6.0}{4} = ${dec(ld.Pw, 2)}$ D, not 3.0 D.`,
  sol: 'Factor (n/n_m − 1) falls from 0.5 to 0.125.',
  scheme: [['Compares (n/n_m − 1): 0.5 in air, 0.125 in water', 1], ['Power +1.5 D, so the claim is wrong', 1]],
  d: 3, c: 'evaluation', t: [2], wl: null,
}), () => near(ld.Pw, 1.5) || `ld ${ld.Pw}`);
const tl = { n: 1.5, R: 9, u: -54 };
tl.f = lensMaker(tl.n, Infinity, -tl.R);
Object.assign(tl, lensImage(tl.u, tl.f));
add('thinlens-short3', short({
  marks: 3,
  stem: 'A plano-convex lens of glass (n = 1.5) has a curved face of radius 9.0 cm. Find its focal length using the lens maker’s formula, and then use the thin lens formula to find the position, magnification and nature of the image of an object 54 cm in front of it.',
  model: r`Lens maker: $R_1 = \infty$, $R_2 = -9.0$ cm: $\dfrac{1}{f} = \dfrac{0.5}{9.0}$, so $f = +${dec(tl.f, 2)}$ cm.
Thin lens: $\dfrac{1}{v} = \dfrac{1}{f} + \dfrac{1}{u} = \dfrac{1}{18} - \dfrac{1}{54} = \dfrac{2}{54}$, so $v = +${dec(tl.v, 2)}$ cm.
$m = \dfrac{v}{u} = \dfrac{27}{-54} = ${dec(tl.m, 2)}$: a **real, inverted** image half the size, 27 cm beyond the lens.`,
  sol: 'f = R/(n − 1); then 1/v = 1/f + 1/u; m = v/u.',
  scheme: [['f = +18 cm', 1], ['v = +27 cm', 1], ['m = −0.5: real, inverted, half size', 1]],
  d: 3, c: 'application', t: [2], wl: null,
}), () => near(tl.f, 18) && near(tl.v, 27) && near(tl.m, -0.5) || `tl ${tl.v}`);
add('lmform-mcq', mcq({
  stem: 'A thin glass lens of refractive index n_g, with radii of curvature R₁ and R₂, is used immersed in a liquid of refractive index n_l. Its focal length f in the liquid is given by',
  right: r`$\dfrac{1}{f} = \left(\dfrac{n_g}{n_l} - 1\right)\left(\dfrac{1}{R_1} - \dfrac{1}{R_2}\right)$`,
  wrong: [r`$\dfrac{1}{f} = (n_g - n_l)\left(\dfrac{1}{R_1} - \dfrac{1}{R_2}\right)$`, r`$\dfrac{1}{f} = \left(\dfrac{n_l}{n_g} - 1\right)\left(\dfrac{1}{R_1} - \dfrac{1}{R_2}\right)$`, r`$\dfrac{1}{f} = (n_g - 1)\left(\dfrac{1}{R_1} - \dfrac{1}{R_2}\right)$`],
  sol: 'At each surface the bending depends on the index of the glass relative to the surrounding liquid, so n in the lens maker’s formula is replaced by n_g/n_l. Option (@3) ignores the liquid; option (@1) is too large by the factor n_l; option (@2) has the ratio upside down — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));

// ================================================================ t03 magnification and power
const rd = 100 / 2.75;
add('reading-num', num({
  stem: 'An optician’s prescription for a pair of reading glasses reads +2.75 D. Find the focal length of each lens, in cm (3 significant figures).',
  value: Number(dec(rd, 3)), tol: 0.2, unit: 'cm',
  sol: r`$f = \dfrac{1}{P} = \dfrac{1}{2.75}$ m $= 0.3636$ m, i.e. $f = 0.3636 \times 100 = ${dec(rd, 3)}$ cm (positive: converging).`,
  scheme: [['f = 1/P = 0.364 m = 36.4 cm', 1]],
  d: 1, c: 'understanding', t: [3],
}), (q) => near(rd, 36.36, 0.001) && q.answer.value === 36.4 || `rd ${rd}`);
add('powersign-mcq', mcq({
  stem: 'A spectacle lens is marked −2.25 D. It is',
  right: 'a diverging lens of focal length 44.4 cm',
  wrong: ['a converging lens of focal length 44.4 cm', 'a diverging lens of focal length 2.25 m', 'a diverging lens of focal length 4.44 cm'],
  sol: r`$f = \dfrac{1}{P} = \dfrac{1}{-2.25}$ m $= -0.444$ m $= -44.4$ cm; the negative power means a diverging (concave) lens — option (@K).`,
  d: 1, c: 'understanding', t: [3],
}), () => near(100 / -2.25, -44.44, 0.001) || 'ps');
const mg = { f: 15, m: -3 };
mg.u = (1 - mg.m) * -mg.f / -mg.m; // from 1/(m u) − 1/u = 1/f → u = f(1 − m)/m
mg.v = mg.m * mg.u;
add('mag-num', num({
  stem: 'A convex lens of focal length 15 cm is used to throw a real image of a lamp filament, three times as large as the filament, onto a screen. How far from the lens must the filament be? Give u in cm, with its sign.',
  value: Number(dec(mg.u, 2)), tol: 0.2, unit: 'cm',
  sol: r`Real image: $m = \dfrac{v}{u} = -3$, so $v = -3u$. Then $\dfrac{1}{-3u} - \dfrac{1}{u} = -\dfrac{4}{3u} = \dfrac{1}{15}$, giving $u = ${dec(mg.u, 2)}$ cm (and $v = +${dec(mg.v, 2)}$ cm).`,
  scheme: [['m = −3 gives v = −3u', 1], ['u = −20 cm', 1]],
  marks: 2, d: 3, c: 'application', t: [3],
}), (q) => near(lensImage(mg.u, 15).m, -3) && q.answer.value === -20 || `mg ${mg.u}`);
const sc = { D: 120, m: -3 };
sc.uAbs = sc.D / (1 - sc.m);
sc.v = sc.D - sc.uAbs;
sc.f = (sc.uAbs * sc.v) / sc.D;
add('screen-num', num({
  stem: 'A slide and a screen are fixed 1.20 m apart. A convex lens placed between them forms a sharp image on the screen three times the size of the slide picture. Find the focal length of the lens, in cm.',
  value: Number(dec(sc.f, 3)), tol: 0.2, unit: 'cm',
  sol: r`Real image, $|v| = 3|u|$ and $|u| + v = 120$ cm: $|u| = 30$ cm, $v = 90$ cm. $\dfrac{1}{f} = \dfrac{1}{90} + \dfrac{1}{30} = \dfrac{4}{90}$, so $f = ${dec(sc.f, 3)}$ cm.`,
  scheme: [['u = −30 cm, v = +90 cm from the two conditions', 1], ['f = 22.5 cm', 1]],
  marks: 2, d: 3, c: 'analysis', t: [3],
}), (q) => near(lensImage(-30, sc.f).v, 90) && near(lensImage(-30, sc.f).m, -3) && q.answer.value === 22.5 || `sc ${sc.f}`);
const cc = lensImage(-36, -18);
add('concave-mcq', mcq({
  stem: 'A toy is 36 cm in front of a concave lens of focal length 18 cm. The image of the toy is',
  right: 'virtual and erect, 12 cm from the lens on the toy’s side, one third the size of the toy',
  wrong: ['real and inverted, 12 cm beyond the lens, one third the size of the toy', 'virtual and erect, 36 cm from the lens on the toy’s side, the same size as the toy', 'virtual and erect, 18 cm from the lens on the toy’s side, half the size of the toy'],
  sol: r`$u = -36$ cm, $f = -18$ cm: $\dfrac{1}{v} = -\dfrac{1}{18} - \dfrac{1}{36} = -\dfrac{3}{36}$, so $v = ${dec(cc.v, 2)}$ cm; $m = \dfrac{v}{u} = \dfrac{-12}{-36} = +\dfrac{1}{3}$ — option (@K).`,
  d: 2, c: 'application', t: [3],
}), () => near(cc.v, -12) && near(cc.m, 1 / 3) || 'cc');
add('concave-tf', tf({
  stem: 'A concave glass lens in air cannot form a real image of a real object, wherever the object is placed.',
  key: 't',
  sol: 'True. With f < 0 and u < 0, 1/v = 1/f + 1/u is the sum of two negative terms, so v is always negative: the image is virtual, on the object’s side.',
  d: 1, c: 'understanding', t: [3],
}), () => [-5, -30, -200].every((u) => lensImage(u, -20).v < 0) || 'ctf');
const cam = 1 / 0.004;
add('camera-fill', fill({
  stem: 'The tiny lens of a phone camera has a focal length of 4.0 mm. Its power is ___ dioptres.',
  acc: [['250', '+250', '250 D']],
  sol: `P = 1/f = 1/(0.0040 m) = **${dec(cam, 3)}** D.`,
  d: 2, c: 'understanding', t: [3],
}), (q) => near(cam, 250) && q.answer.blanks[0].accepted[0] === '250' || 'cam');
add('mag-short2', short({
  marks: 2,
  stem: 'An object AB stands on the axis of a thin convex lens and forms a real image A′B′. Using the ray from A through the optical centre O, show that the magnification is m = h′/h = v/u.',
  model: r`The ray AO passes undeviated through the optical centre to A′. Triangles ABO and A′B′O are **similar** (right angles at B and B′, equal vertical angles at O), so $\dfrac{A'B'}{AB} = \dfrac{OB'}{OB}$. With signs, $A'B' = h'$ (negative), $AB = h$, $OB' = v$, $OB = -u$: $\dfrac{h'}{h} = \dfrac{v}{u}$, so $m = \dfrac{v}{u}$.`,
  sol: 'Similar triangles at the optical centre; then signs.',
  scheme: [['Similar triangles ABO and A′B′O', 1], ['Signs give m = h′/h = v/u', 1]],
  d: 2, c: 'understanding', t: [3], wl: null,
}));
const ds = { D: 100, x: 20 };
ds.f = (ds.D ** 2 - ds.x ** 2) / (4 * ds.D);
add('displacement-short3', short({
  marks: 3,
  stem: 'A lamp and a screen are fixed 100 cm apart. A convex lens gives a sharp image on the screen in two positions, 20 cm apart. Find the object and image distances in each position, the focal length of the lens, and the product of the two magnifications.',
  model: r`The positions are symmetrical (object and image distances swap): $|u| + v = 100$ and the difference is 20, so position 1: $u = -40$ cm, $v = +60$ cm; position 2: $u = -60$ cm, $v = +40$ cm.
$\dfrac{1}{f} = \dfrac{1}{60} + \dfrac{1}{40} = \dfrac{5}{120}$, so $f = ${dec(ds.f, 2)}$ cm (equivalently $f = \dfrac{D^2 - x^2}{4D}$).
$m_1 = \dfrac{60}{-40} = -1.5$, $m_2 = \dfrac{40}{-60} = -\dfrac{2}{3}$; $m_1 m_2 = 1$.`,
  sol: 'Conjugate positions swap u and v.',
  scheme: [['u = −40, v = 60 and u = −60, v = 40', 1], ['f = 24 cm', 1], ['m₁m₂ = (−1.5)(−2/3) = 1', 1]],
  d: 4, c: 'analysis', t: [3], wl: null,
}), () => near(ds.f, 24) && near(lensImage(-40, 24).v, 60) && near(lensImage(-60, 24).v, 40) && near(lensImage(-40, 24).m * lensImage(-60, 24).m, 1) || 'ds');
add('graph-mcq', mcq({
  stem: 'In a lens experiment a student plots 1/v against 1/u, both in m⁻¹, and gets a straight line that cuts the 1/v axis at +2.5 m⁻¹. The focal length of the lens and the slope of the line are',
  right: '40 cm and +1',
  wrong: ['40 cm and −1', '25 cm and +1', '2.5 cm and −1'],
  sol: r`$\dfrac{1}{v} = \dfrac{1}{u} + \dfrac{1}{f}$ is a straight line of slope +1 with intercept $\dfrac{1}{f} = P = 2.5$ m⁻¹, so $f = 0.40$ m = 40 cm — option (@K).`,
  d: 3, c: 'analysis', t: [3],
}), () => near(1 / lensImage(-0.5, 0.4).v - 1 / -0.5, 2.5) || 'gr');
const ch = lensImage(-12, -24);
ch.h = ch.m * 4;
add('concaveheight-num', num({
  stem: 'A candle flame 4.0 cm tall is 12 cm in front of a concave lens of focal length 24 cm. Find the height of the image, in cm (3 significant figures).',
  value: Number(dec(ch.h, 3)), tol: 0.05, unit: 'cm',
  sol: r`$\dfrac{1}{v} = -\dfrac{1}{24} - \dfrac{1}{12} = -\dfrac{3}{24}$, so $v = ${dec(ch.v, 2)}$ cm; $m = \dfrac{v}{u} = \dfrac{-8}{-12} = ${dec(ch.m, 3)}$; $h' = mh = ${dec(ch.h, 3)}$ cm (erect, virtual).`,
  scheme: [['v = −8.0 cm, m = 2/3, h′ = 2.67 cm', 1]],
  d: 2, c: 'application', t: [3],
}), (q) => near(ch.v, -8) && near(ch.h, 8 / 3) && q.answer.value === 2.67 || `ch ${ch.h}`);
const sun = { f: 0.6, theta: 9.3e-3 };
sun.d = sun.f * sun.theta * 1000;
add('sunimage-num', num({
  stem: 'A convex lens of focal length 60 cm forms an image of the Sun on a sheet of paper. The Sun subtends an angle of 9.3 × 10⁻³ rad at the lens. Find the diameter of the image, in mm.',
  value: Number(dec(sun.d, 2)), tol: 0.1, unit: 'mm',
  sol: r`The Sun is effectively at infinity, so its image is in the focal plane. Rays from opposite edges of the disc pass undeviated through the optical centre, so the image diameter is $f\theta = 0.60 \times 9.3 \times 10^{-3}$ m $= 5.58 \times 10^{-3}$ m, i.e. $5.58 \times 10^{-3} \times 1000 = ${dec(sun.d, 2)}$ mm.`,
  scheme: [['Image in the focal plane; d = fθ = 5.6 mm', 1]],
  d: 3, c: 'application', t: [3],
}), (q) => {
  const far = lensImage(-1e9, 60);
  return (near(far.v * sun.theta * 10, 5.58, 1e-3) && q.answer.value === 5.6) || `sun ${sun.d}`;
});
add('magsign-mcq', mcq({
  stem: 'A thin lens forms an image of a real object with a magnification of +0.4. The lens and the image are',
  right: 'a concave lens; a virtual, erect image smaller than the object',
  wrong: ['a convex lens; a real, inverted image smaller than the object', 'a convex lens; a virtual, erect image smaller than the object', 'a concave lens; a real, erect image smaller than the object'],
  sol: 'm = v/u > 0 means v has the sign of u: the image is on the object’s side, virtual and erect. A convex lens forms virtual images only when the object is inside F, and they are then enlarged; a diminished virtual image needs a concave lens — option (@K).',
  d: 3, c: 'analysis', t: [3],
}), () => {
  const e = lensImage(-30, -20);
  return (e.m > 0 && e.m < 1 && [-5, -10, -15].every((u) => lensImage(u, 20).m > 1)) || 'msg';
});
add('power-short2', short({
  marks: 2,
  stem: 'Define the power of a lens and state its SI unit. Find the power of a lens of focal length −16 cm, and say why a lens of shorter focal length is said to be more powerful.',
  model: r`Power is the reciprocal of the focal length in metres, $P = \dfrac{1}{f}$; its unit is the **dioptre** (D = m⁻¹). Here $P = \dfrac{1}{-0.16} = -6.25$ D (diverging). A shorter focal length bends a parallel beam to a point (or away from one) in a shorter distance: it deviates rays more, so its power is larger.`,
  sol: 'P = 1/f in metres.',
  scheme: [['P = 1/f (m), unit dioptre', 1], ['P = −6.25 D; shorter f bends rays more', 1]],
  d: 2, c: 'understanding', t: [3],
}), () => near(1 / -0.16, -6.25) || 'pw2');

// ================================================================ t04 thin lenses in contact
add('contact-short3', short({
  marks: 3,
  stem: 'Two thin lenses of focal lengths f₁ and f₂ are placed in contact. Derive an expression for the focal length F of the combination, and hence show that the power of the combination is the sum of the powers of the two lenses.',
  model: r`Let an object O be at distance u. **Lens 1** alone would form an image $I_1$ at $v_1$: $\dfrac{1}{v_1} - \dfrac{1}{u} = \dfrac{1}{f_1}$.
The light reaches lens 2 before $I_1$ forms, so $I_1$ acts as a (virtual) object for **lens 2**, at the same distance $v_1$ because the lenses touch: $\dfrac{1}{v} - \dfrac{1}{v_1} = \dfrac{1}{f_2}$.
Adding: $\dfrac{1}{v} - \dfrac{1}{u} = \dfrac{1}{f_1} + \dfrac{1}{f_2}$. The pair acts as one lens with $\dfrac{1}{F} = \dfrac{1}{f_1} + \dfrac{1}{f_2}$; with $P = 1/f$, $P = P_1 + P_2$.`,
  sol: 'Image of lens 1 is the object for lens 2; add the two equations.',
  scheme: [['Thin lens equation for lens 1', 1], ['I₁ as the object for lens 2 at the same distance', 1], ['Adding: 1/F = 1/f₁ + 1/f₂ and P = P₁ + P₂', 1]],
  d: 2, c: 'understanding', t: [4], wl: null,
}));
const ct = { f1: 16, f2: -40 };
ct.F = 1 / (1 / ct.f1 + 1 / ct.f2);
add('contact-num', num({
  stem: 'A converging lens of focal length 16 cm is cemented to a diverging lens of focal length 40 cm. Find the focal length of the combination, in cm (3 significant figures).',
  value: Number(dec(ct.F, 3)), tol: 0.2, unit: 'cm',
  sol: r`$\dfrac{1}{F} = \dfrac{1}{16} - \dfrac{1}{40} = \dfrac{5 - 2}{80} = \dfrac{3}{80}$, so $F = ${dec(ct.F, 3)}$ cm (power $+${dec(100 / ct.F, 3)}$ D, converging).`,
  scheme: [['1/F = 1/16 − 1/40', 1], ['F = 26.7 cm', 1]],
  marks: 2, d: 2, c: 'understanding', t: [4],
}), (q) => near(100 / 16 - 100 / 40, 100 / ct.F) && q.answer.value === 26.7 || `ct ${ct.F}`);
add('zero-mcq', mcq({
  stem: 'A converging lens of focal length 25 cm is placed in contact with a diverging lens of focal length 25 cm. The combination',
  right: 'has zero power and acts like a parallel-sided glass plate',
  wrong: ['is converging, with a focal length of 12.5 cm', 'is diverging, with a focal length of 50 cm', 'is converging, with a focal length of 50 cm'],
  sol: 'P = +4.0 D − 4.0 D = 0, so 1/F = 0: F is infinite and the pair neither converges nor diverges light — option (@K).',
  d: 2, c: 'understanding', t: [4],
}), () => Math.abs(1 / 25 - 1 / 25) < 1e-15 || 'zero');
const nd = { f1: 12, F: 20 };
nd.f2 = 1 / (1 / nd.F - 1 / nd.f1);
add('needed-num', num({
  stem: 'A camera designer has a converging lens of focal length 12 cm and wants a combination of focal length 20 cm. What focal length must a second thin lens, placed in contact with the first, have? Answer in cm, with its sign.',
  value: Number(dec(nd.f2, 2)), tol: 0.3, unit: 'cm',
  sol: r`$\dfrac{1}{f_2} = \dfrac{1}{F} - \dfrac{1}{f_1} = \dfrac{1}{20} - \dfrac{1}{12} = \dfrac{3 - 5}{60} = -\dfrac{1}{30}$, so $f_2 = ${dec(nd.f2, 2)}$ cm: a diverging lens.`,
  scheme: [['1/f₂ = 1/F − 1/f₁', 1], ['f₂ = −30 cm (diverging)', 1]],
  marks: 2, d: 3, c: 'understanding', t: [4],
}), (q) => near(1 / (1 / 12 + 1 / nd.f2), 20) && q.answer.value === -30 || `nd ${nd.f2}`);
add('contact-tf', tf({
  stem: 'Two identical converging lenses, each of focal length 30 cm, placed in contact give a combination of focal length 60 cm.',
  key: 'f',
  sol: 'False. 1/F = 1/30 + 1/30 = 1/15, so F = 15 cm: the powers add, so the pair is twice as powerful and its focal length is halved.',
  d: 1, c: 'understanding', t: [4],
}), () => near(1 / (2 / 30), 15) || 'ctf2');
add('powers-match', match({
  stem: 'Match each pair of thin lenses placed in contact (Column A, focal lengths given) with the power of the combination in Column B.',
  pairs: [
    ['+20 cm and +20 cm', '+10 D'],
    ['+10 cm and −10 cm', '0 D'],
    ['+25 cm and −50 cm', '+2.0 D'],
    ['−20 cm and −20 cm', '−10 D'],
  ],
  order: [3, 1, 0, 2],
  sol: 'P = 1/f₁ + 1/f₂ with f in metres: +5 + 5 = +10 D (1 → s); +10 − 10 = 0 D (2 → q); +4 − 2 = +2.0 D (3 → p); −5 − 5 = −10 D (4 → r).',
  d: 2, c: 'application', t: [4],
}), () => [[0.2, 0.2, 10], [0.1, -0.1, 0], [0.25, -0.5, 2], [-0.2, -0.2, -10]].every(([a, b, p]) => near(1 / a + 1 / b + 1e-12, p + 1e-12, 1e-9)) || 'pm');
const ci = { f1: 15, f2: -60, u: -30 };
ci.F = 1 / (1 / ci.f1 + 1 / ci.f2);
ci.v = lensImage(ci.u, ci.F).v;
add('contactimage-num', num({
  stem: 'A converging lens of focal length 15 cm and a diverging lens of focal length 60 cm are held in contact. An object is placed 30 cm in front of the pair. Find the image distance, in cm.',
  value: Number(dec(ci.v, 2)), tol: 0.3, unit: 'cm',
  sol: r`$\dfrac{1}{F} = \dfrac{1}{15} - \dfrac{1}{60} = \dfrac{3}{60}$, so $F = +${dec(ci.F, 2)}$ cm. $\dfrac{1}{v} = \dfrac{1}{20} - \dfrac{1}{30} = \dfrac{1}{60}$, so $v = +${dec(ci.v, 2)}$ cm (real).`,
  scheme: [['F = +20 cm', 1], ['v = +60 cm', 1]],
  marks: 2, d: 3, c: 'application', t: [4],
}), (q) => {
  // independent: lens 1 then lens 2 at the same place
  const v1 = lensImage(ci.u, ci.f1).v;
  const v2 = lensImage(v1, ci.f2).v;
  return (near(v2, 60) && q.answer.value === 60) || `ci ${v2}`;
});
add('power-ar', ar({
  a: 'The power of two thin lenses placed in contact is the sum of their separate powers.',
  r: 'The magnification produced by two thin lenses in contact is the sum of their separate magnifications.',
  key: 'c',
  sol: 'A is true: 1/F = 1/f₁ + 1/f₂, so P = P₁ + P₂. R is false: the image of the first lens is the object of the second, so the magnifications multiply, m = m₁m₂ — option (c).',
  d: 2, c: 'understanding', t: [4],
}));
const cn = { f1: 12, f2: -10 };
cn.F = 1 / (1 / cn.f1 + 1 / cn.f2);
add('contactnature-mcq', mcq({
  stem: 'A converging lens of focal length 12 cm is placed in contact with a diverging lens of focal length 10 cm. The combination is',
  right: 'diverging, with a focal length of magnitude 60 cm',
  wrong: ['converging, with a focal length of 60 cm', 'diverging, with a focal length of magnitude 5.5 cm', 'converging, with a focal length of 22 cm'],
  sol: r`$\dfrac{1}{F} = \dfrac{1}{12} - \dfrac{1}{10} = -\dfrac{1}{60}$, so $F = ${dec(cn.F, 2)}$ cm: the diverging lens is the more powerful one, so the pair diverges light — option (@K).`,
  d: 2, c: 'understanding', t: [4],
}), () => near(cn.F, -60) || 'cn');
const c8 = 1 / (1 / 10 + 1 / 40);
add('contact8-mcq', mcq({
  stem: 'A magnifying lens of focal length 10 cm is used in contact with a weak converging lens of focal length 40 cm. The focal length of the pair is',
  right: '8.0 cm',
  wrong: ['50 cm', '25 cm', '13.3 cm'],
  sol: r`$\dfrac{1}{F} = \dfrac{1}{10} + \dfrac{1}{40} = \dfrac{5}{40}$, so $F = ${dec(c8, 2)}$ cm: adding a converging lens shortens the focal length. 50 cm adds the focal lengths instead of their reciprocals — option (@K).`,
  d: 2, c: 'understanding', t: [4],
}), () => near(c8, 8) || 'c8');
const cf = 100 / (9 - 3);
add('contact-fill', fill({
  stem: 'An optician holds a +9.0 D trial lens in contact with a −3.0 D trial lens. The pair behaves as a single lens of focal length ___ cm.',
  acc: [['16.7', '16.67', '+16.7']],
  sol: `P = +9.0 − 3.0 = +6.0 D, so F = 1/6.0 m = **${dec(cf, 3)}** cm.`,
  d: 2, c: 'understanding', t: [4],
}), (q) => near(cf, 16.667, 1e-4) && q.answer.blanks[0].accepted[0] === '16.7' || 'cf');
add('comboeval-short2', short({
  marks: 2,
  stem: 'A student needs a +3.0 D reading lens for a model but has only a +7.0 D lens and a −4.0 D lens. She proposes to tape the two lenses together, face to face. Evaluate her plan, giving the focal length she would obtain.',
  model: r`The plan **works**. Thin lenses in contact add their powers: $P = +7.0 + (-4.0) = +3.0$ D, a converging combination of focal length $F = \dfrac{1}{3.0}$ m $= 33.3$ cm, as required. The lenses must be thin and touch (on a common axis); any gap would change the result.`,
  sol: 'P = P₁ + P₂ = +3.0 D.',
  scheme: [['P = +7.0 − 4.0 = +3.0 D, so the plan works', 1], ['F = 33.3 cm; lenses must be in contact on one axis', 1]],
  d: 3, c: 'evaluation', t: [4],
}), () => near(1 / (1 / (1 / 7) + 1 / (-1 / 4)), 1 / 3) || 'ce');
const ll = { f0: 20, F: 30, n: 1.5, nw: 4 / 3 };
ll.fw = 1 / (1 / ll.F - 1 / ll.f0);
ll.R = -(ll.nw - 1) * ll.fw;
ll.ng = 1 + ll.R / (2 * ll.f0);
add('liquidlens-short3', short({
  marks: 3,
  stem: 'An equiconvex glass lens rests on a horizontal plane mirror. A pin held above it on the axis coincides with its own image when it is 20 cm above the lens. A little water (n = 4/3) is then placed between the lens and the mirror, and the coincidence position becomes 30 cm. Find the focal length of the water layer, the radius of curvature of the lens faces, and the refractive index of the glass.',
  model: r`With a plane mirror, coincidence occurs when the pin is at the focus, so $f_g = 20$ cm and, with water, the glass + water pair has $F = 30$ cm.
The water forms a **plano-concave lens** in contact with the glass: $\dfrac{1}{f_w} = \dfrac{1}{30} - \dfrac{1}{20} = -\dfrac{1}{60}$, so $f_w = ${dec(ll.fw, 2)}$ cm.
For the water lens $\dfrac{1}{f_w} = -\dfrac{n_w - 1}{R}$: $R = \dfrac{1}{3} \times 60 = ${dec(ll.R, 2)}$ cm. For the glass, $\dfrac{1}{20} = (n_g - 1)\dfrac{2}{20}$, so $n_g = ${dec(ll.ng, 2)}$.`,
  sol: 'Coincidence at the focus of the lens (or of the glass + water pair).',
  scheme: [['f_w = −60 cm from 1/F = 1/f_g + 1/f_w', 1], ['R = 20 cm from the plano-concave water lens', 1], ['n_g = 1.5 from the equiconvex lens', 1]],
  d: 4, c: 'analysis', t: [4, 5], wl: null,
}), () => {
  // independent: build the system with the computed R and n and trace it
  const fg = lensMaker(ll.ng, ll.R, -ll.R);
  const fw = lensMaker(ll.nw, -ll.R, Infinity);
  const Fp = 1 / (1 / fg + 1 / fw);
  const img = systemImage(-Fp, 1, [L(0, Fp), M(0.001, Infinity), L(0, Fp)]);
  return (near(fg, 20) && near(Fp, 30) && near(img.x, -30, 1e-3)) || `ll ${fg} ${Fp}`;
});

// ================================================================ t05 separated lenses, lens with a mirror
const tc = parallelImage([L(0, 10), L(25, 20)]);
add('twoconvex-num', num({
  stem: 'A parallel beam of light falls on a convex lens of focal length 10 cm. A second convex lens, of focal length 20 cm, is 25 cm beyond the first, on the same axis. Find the position of the final image relative to the second lens: v₂ in cm, with its sign.',
  value: Number(dec(tc.x - 25, 2)), tol: 0.3, unit: 'cm',
  sol: r`Lens 1: $v_1 = +10$ cm. For lens 2, $u_2 = 10 - 25 = -15$ cm (a real object 15 cm in front, inside its focal length). $\dfrac{1}{v_2} = \dfrac{1}{20} - \dfrac{1}{15} = -\dfrac{1}{60}$, so $v_2 = ${dec(tc.x - 25, 2)}$ cm: a virtual image 60 cm in front of the second lens.`,
  scheme: [['v₁ = 10 cm; u₂ = −15 cm', 1], ['v₂ = −60 cm (virtual)', 1]],
  marks: 2, d: 3, c: 'application', t: [5],
}), (q) => near(lensImage(-15, 20).v, -60) && near(tc.x - 25, -60) && !tc.real && q.answer.value === -60 || `tc ${tc.x}`);
const vo = parallelImage([L(0, 20), L(10, -15)]);
add('virtualobj-mcq', mcq({
  stem: 'A parallel beam falls on a convex lens of focal length 20 cm. A concave lens of focal length 15 cm is placed 10 cm beyond it, on the same axis. The beam is finally brought to',
  right: 'a real point 30 cm beyond the concave lens',
  wrong: ['a real point 10 cm beyond the concave lens', 'a virtual point 6.0 cm in front of the concave lens', 'a real point 60 cm beyond the concave lens'],
  sol: r`The convex lens alone would focus the beam 20 cm away, 10 cm beyond the concave lens: a **virtual object**, $u_2 = +10$ cm. $\dfrac{1}{v} = -\dfrac{1}{15} + \dfrac{1}{10} = \dfrac{1}{30}$, so $v = +30$ cm: a real focus. Taking $u_2 = -10$ cm wrongly gives the 6.0 cm answer — option (@K).`,
  d: 3, c: 'analysis', t: [5],
}), () => near(vo.x - 10, 30) && vo.real || `vo ${vo.x}`);
add('separation-mcq', mcq({
  stem: 'Two convex lenses, of focal lengths 15 cm and 10 cm, are mounted on a common axis. A parallel beam enters the first lens. For the beam to leave the second lens parallel again, the distance between the lenses must be',
  right: '25 cm',
  wrong: ['5.0 cm', '6.0 cm', '150 cm'],
  sol: 'The first lens brings the beam to a focus 15 cm beyond it. For the second lens to make it parallel, that point must be at its first focus, 10 cm in front of it: separation 15 + 10 = 25 cm. 6.0 cm is the focal length of the two in contact — option (@K).',
  d: 2, c: 'understanding', t: [5],
}), () => Math.abs(traceRay([-10, 1], 0, [L(0, 15), L(25, 10)]).s) < 1e-12 && Math.abs(traceRay([-10, 1], 0, [L(0, 15), L(20, 10)]).s) > 1e-3 || 'sep');
add('mirrorlens-mcq', mcq({
  stem: 'A convex lens of focal length 25 cm stands 10 cm in front of a plane mirror. A pin is moved along the axis on the other side of the lens until the pin and its image coincide with no parallax. The pin is then',
  right: '25 cm from the lens',
  wrong: ['35 cm from the lens', '15 cm from the lens', '50 cm from the lens'],
  sol: 'Coincidence needs the light to leave the lens as a parallel beam, so that the plane mirror sends it straight back and the lens focuses it again where it started: the pin must be at the focus, 25 cm from the lens, whatever the lens–mirror distance — option (@K).',
  d: 2, c: 'understanding', t: [5],
}), () => near(systemImage(-25, 1, [L(0, 25), M(10, Infinity), L(0, 25)]).x, -25) || 'ml');
add('combo-tf', tf({
  stem: 'When two lenses some distance apart form a final image, the total magnification is the sum of the magnifications produced by the two lenses.',
  key: 'f',
  sol: 'False. The image of the first lens is the object of the second, so the second lens scales an already-scaled image: m = m₁ × m₂ (for example (−2) × (−3) = +6, not −5).',
  d: 2, c: 'understanding', t: [5],
}), () => near(systemImage(-15, 1, [L(0, 10), L(50, 15)]).m, 6) || 'ctf3');
add('planemirror-ar', ar({
  a: 'When a pin in front of a convex lens backed by a plane mirror coincides with its own image, the pin is at the focus of the lens.',
  r: 'A plane mirror forms a virtual image as far behind it as the object is in front of it.',
  key: 'b',
  sol: 'Both are true, but R does not explain A. Coincidence happens because light from the focus leaves the lens parallel and the mirror reverses a parallel beam, so the lens refocuses it in the same plane; the image distance rule for a plane mirror is not the reason — option (b).',
  d: 2, c: 'understanding', t: [5],
}), () => near(systemImage(-18, 1, [L(0, 18), M(7, Infinity), L(0, 18)]).x, -18) || 'pmar');
add('virtualobj-short2', short({
  marks: 2,
  stem: 'What is meant by a virtual object for the second of two lenses on a common axis? State the sign of its object distance in the New Cartesian convention, and describe one arrangement in which it occurs.',
  model: 'A virtual object is a point towards which the rays are still **converging** when they reach the second lens: the first lens would form its image beyond the second lens. It lies on the outgoing side, so **u₂ is positive**. Example: a concave lens placed between a convex lens and the point where the convex lens would focus a beam.',
  sol: 'Rays converging towards a point beyond the lens: u > 0.',
  scheme: [['Rays converge towards a point beyond the second lens', 1], ['u₂ positive; a valid arrangement', 1]],
  d: 2, c: 'understanding', t: [5],
}));
const lmS = { f: 15, u: -22.5, fm: 10 };
lmS.v1 = lensImage(lmS.u, lmS.f).v;
lmS.d = lmS.v1 + 2 * lmS.fm;
lmS.sys = systemImage(lmS.u, 1, [L(0, lmS.f), M(lmS.d, lmS.fm), L(0, lmS.f)]);
add('lensmirror-short3', short({
  marks: 3,
  stem: 'An object is 22.5 cm in front of a convex lens of focal length 15 cm. A concave mirror of focal length 10 cm is to be placed on the axis beyond the lens so that every ray returning from the mirror retraces its path. Find the distance between the lens and the mirror, and state where the final image forms and whether it is erect or inverted.',
  model: r`Lens: $\dfrac{1}{v_1} = \dfrac{1}{15} - \dfrac{1}{22.5} = \dfrac{1}{45}$, so $I_1$ is ${dec(lmS.v1, 2)} cm beyond the lens ($m_1 = -2$).
Rays retrace their paths only if they meet the mirror **normally**, i.e. if $I_1$ is at the mirror’s centre of curvature, $R = 2f = 20$ cm in front of it. So the mirror is $45 + 20 = ${dec(lmS.d, 2)}$ cm from the lens.
The mirror images $I_1$ on itself ($m = -1$); the lens then sends the light back to the object position ($m_3 = -0.5$). Total $m = (-2)(-1)(-0.5) = ${dec(lmS.sys.m, 1)}$: the final image falls **on the object, inverted**, same size.`,
  sol: 'I₁ at the centre of curvature of the mirror.',
  scheme: [['v₁ = +45 cm', 1], ['Mirror 65 cm from the lens (I₁ at its centre of curvature)', 1], ['Final image on the object, inverted, same size', 1]],
  d: 4, c: 'analysis', t: [5], wl: null,
}), () => near(lmS.d, 65) && near(lmS.sys.x, lmS.u) && near(lmS.sys.m, -1) || `lmS ${lmS.sys.x}`);
const sp = { f1: 12, f2: -18, d: 6, u: -36 };
sp.a = lensImage(sp.u, sp.f1);
sp.u2 = sp.a.v - sp.d;
sp.b = lensImage(sp.u2, sp.f2);
sp.sys = systemImage(sp.u, 1, [L(0, sp.f1), L(sp.d, sp.f2)]);
add('separated-short3', short({
  marks: 3,
  stem: 'A convex lens of focal length 12 cm and a concave lens of focal length 18 cm are on a common axis, 6.0 cm apart. An object is 36 cm in front of the convex lens. Find the position of the final image and the total magnification, and state the nature of the image.',
  model: r`Convex lens: $\dfrac{1}{v_1} = \dfrac{1}{12} - \dfrac{1}{36} = \dfrac{1}{18}$, $v_1 = +${dec(sp.a.v, 2)}$ cm, $m_1 = ${dec(sp.a.m, 1)}$.
$I_1$ is $18 - 6.0 = 12$ cm **beyond** the concave lens: a virtual object, $u_2 = +${dec(sp.u2, 2)}$ cm. $\dfrac{1}{v_2} = -\dfrac{1}{18} + \dfrac{1}{12} = \dfrac{1}{36}$, so $v_2 = +${dec(sp.b.v, 2)}$ cm and $m_2 = \dfrac{36}{12} = ${dec(sp.b.m, 1)}$.
Final image 36 cm beyond the concave lens; $m = m_1 m_2 = ${dec(sp.a.m * sp.b.m, 2)}$: **real, inverted**, 1.5 times the size of the object.`,
  sol: 'u₂ = v₁ − d = +12 cm (virtual object).',
  scheme: [['v₁ = +18 cm, m₁ = −0.5', 1], ['Virtual object u₂ = +12 cm; v₂ = +36 cm', 1], ['m = −1.5: real, inverted, enlarged', 1]],
  d: 3, c: 'analysis', t: [5], wl: null,
}), () => near(sp.sys.x - sp.d, 36) && near(sp.sys.m, -1.5) && sp.sys.real || `sp ${sp.sys.x}`);
const pm = { f: 10, u: -15, mirror: 22 };
pm.sys = systemImage(pm.u, 1, [L(0, pm.f), M(pm.mirror, Infinity), L(0, pm.f)]);
add('planemirror-num', num({
  stem: 'An object is 15 cm in front of a convex lens of focal length 10 cm. A plane mirror stands 22 cm behind the lens, facing it. Light passes through the lens, is reflected, and passes through the lens again. How far from the lens is the final image? Answer in cm.',
  value: Number(dec(-pm.sys.x, 2)), tol: 0.3, unit: 'cm',
  sol: r`Lens: $v_1 = \dfrac{1}{1/10 - 1/15} = +30$ cm, 8.0 cm behind the mirror. The mirror turns the converging rays back to a point 8.0 cm in front of it, $22 - 8 = 14$ cm from the lens. Return pass (measured along the returning light): $u = -14$ cm, $\dfrac{1}{v} = \dfrac{1}{10} - \dfrac{1}{14} = \dfrac{4}{140}$, so $v = ${dec(-pm.sys.x, 2)}$ cm: a real image 35 cm from the lens on the object’s side ($m = +5$).`,
  scheme: [['v₁ = 30 cm; mirror image 14 cm from the lens', 1], ['Return pass: final image 35 cm from the lens', 1]],
  marks: 2, d: 4, c: 'analysis', t: [5],
}), (q) => near(lensImage(-14, 10).v, 35) && near(pm.sys.x, -35) && near(pm.sys.m, 5) && q.answer.value === 35 || `pm ${pm.sys.x}`);

// ================================================================ 5-mark questions (in parts)
const sl5 = { n: 1.5, R: 2.5, u: -10 };
sl5.v = surfaceImage(1, sl5.n, sl5.u, sl5.R);
sl5.F1 = (-1 * sl5.R) / (sl5.n - 1);
add('surface-long', long({
  stem: '(a) A convex spherical surface of radius R separates a rarer medium of refractive index n₁ from a denser medium of refractive index n₂. With a ray diagram described in words, derive the relation n₂/v − n₁/u = (n₂ − n₁)/R for a point object in the rarer medium forming a real image in the denser medium. [3] (b) A long glass rod (n = 1.5) has a convex end of radius 2.5 cm. (i) Find the position of the image of a point object in air 10 cm from the end. (ii) Where must the object be placed for the light inside the rod to travel parallel to its axis? [2]',
  model: r`(a) O is the object on the axis, P the pole, C the centre of curvature. A ray OA meets the surface at A and bends towards the normal CA, meeting the axis at I. Let the ray, the normal and the refracted ray make angles $\alpha$, $\gamma$, $\beta$ with the axis; AD is perpendicular to the axis.
Exterior angles: in triangle OAC, $i = \alpha + \gamma$; in triangle AIC, $\gamma = r + \beta$, so $r = \gamma - \beta$. Snell’s law for small angles: $n_1 i = n_2 r$, so $n_1(\alpha + \gamma) = n_2(\gamma - \beta)$.
Paraxial rays (D at P): $\alpha = \dfrac{AD}{OP}$, $\beta = \dfrac{AD}{PI}$, $\gamma = \dfrac{AD}{PC}$, with $OP = -u$, $PI = v$, $PC = R$. Then $n_1\left(-\dfrac{1}{u} + \dfrac{1}{R}\right) = n_2\left(\dfrac{1}{R} - \dfrac{1}{v}\right)$, i.e. $\dfrac{n_2}{v} - \dfrac{n_1}{u} = \dfrac{n_2 - n_1}{R}$.

(b)(i) $\dfrac{1.5}{v} = \dfrac{0.5}{2.5} - \dfrac{1}{10} = 0.10$, so $v = +${dec(sl5.v, 2)}$ cm (real, inside the rod).
(ii) Parallel rays inside need $v \to \infty$: $-\dfrac{1}{u} = \dfrac{0.5}{2.5}$, so $u = ${dec(sl5.F1, 2)}$ cm: the object at the first focal point, 5.0 cm in front of the end.`,
  sol: 'Exterior angles, small-angle Snell’s law, signs; then the formula with v → ∞.',
  scheme: [['Diagram: O, A, C, I with α, β, γ; i = α + γ and r = γ − β', 1], ['n₁i = n₂r with α, β, γ as AD/OP, AD/PI, AD/PC', 1], ['Signs substituted to give the relation', 1], ['v = +15 cm', 1], ['u = −5.0 cm', 1]],
  d: 3, c: 'application', t: [1], wl: null,
}), () => near(sl5.v, 15) && near(sl5.F1, -5) && !Number.isFinite(surfaceImage(1, 1.5, sl5.F1, 2.5)) || `sl5 ${sl5.v}`);
const lml = { n: 1.5, f: 15, nl: 1.25 };
lml.R = 2 * (lml.n - 1) * lml.f;
lml.fl = lensMaker(lml.n, lml.R, -lml.R, lml.nl);
add('lensmaker-long', long({
  stem: '(a) Using the relation for refraction at a single spherical surface, derive the lens maker’s formula for a thin biconvex lens of refractive index n in air, and hence the thin lens formula 1/v − 1/u = 1/f. [3] (b) An equiconvex lens of glass (n = 1.5) has a focal length of 15 cm in air. Find (i) the radius of curvature of its faces, (ii) its focal length when immersed in a liquid of refractive index 1.25. [2]',
  model: r`(a) Let a point object O be at distance u from the thin lens (radii $R_1$, $R_2$). **First surface** (air to glass) alone forms an image $I_1$: $\dfrac{n}{v_1} - \dfrac{1}{u} = \dfrac{n - 1}{R_1}$.
Before $I_1$ forms, the rays meet the **second surface** (glass to air); $I_1$ is its object, at distance $v_1$ (thin lens): $\dfrac{1}{v} - \dfrac{n}{v_1} = \dfrac{1 - n}{R_2}$.
Adding: $\dfrac{1}{v} - \dfrac{1}{u} = (n - 1)\left(\dfrac{1}{R_1} - \dfrac{1}{R_2}\right)$. For $u \to -\infty$, $v = f$: $\dfrac{1}{f} = (n - 1)\left(\dfrac{1}{R_1} - \dfrac{1}{R_2}\right)$, so $\dfrac{1}{v} - \dfrac{1}{u} = \dfrac{1}{f}$.

(b)(i) $R_1 = R$, $R_2 = -R$: $\dfrac{1}{15} = 0.5 \times \dfrac{2}{R}$, so $R = ${dec(lml.R, 2)}$ cm.
(ii) $\dfrac{1}{f_l} = \left(\dfrac{1.5}{1.25} - 1\right)\dfrac{2}{15} = 0.2 \times \dfrac{2}{15}$, so $f_l = ${dec(lml.fl, 3)}$ cm.`,
  sol: 'Surface formula twice, I₁ as the object for surface 2; then u → −∞.',
  scheme: [['First surface: n/v₁ − 1/u = (n − 1)/R₁', 1], ['Second surface with I₁ as object; adding the equations', 1], ['u → −∞ gives the lens maker’s formula and 1/v − 1/u = 1/f', 1], ['R = 15 cm', 1], ['f in the liquid = 37.5 cm', 1]],
  d: 3, c: 'application', t: [2], wl: null,
}), () => near(lensMaker(1.5, 15, -15), 15) && near(lml.fl, 37.5) || `lml ${lml.fl}`);
const cl = { f1: 15, u: -40, v: 120 };
cl.F = 1 / (1 / cl.v - 1 / cl.u);
cl.f2 = 1 / (1 / cl.F - 1 / cl.f1);
cl.P = 100 / cl.F;
add('contact-long', long({
  stem: '(a) Two thin lenses of focal lengths f₁ and f₂ are in contact. Show that they act as a single lens of focal length F given by 1/F = 1/f₁ + 1/f₂. [2] (b) A convex lens of focal length 15 cm is placed in contact with a concave lens. The pair forms a real image of an object 40 cm away on a screen 120 cm from the lenses. Find the focal length of the combination and of the concave lens. [2] (c) Find the power of the combination and say whether it converges or diverges light. [1]',
  model: r`(a) Lens 1 alone: $\dfrac{1}{v_1} - \dfrac{1}{u} = \dfrac{1}{f_1}$. Its image $I_1$ is the object for lens 2, at the same distance $v_1$ since the lenses touch: $\dfrac{1}{v} - \dfrac{1}{v_1} = \dfrac{1}{f_2}$. Adding: $\dfrac{1}{v} - \dfrac{1}{u} = \dfrac{1}{f_1} + \dfrac{1}{f_2}$, which is the thin lens formula for one lens with $\dfrac{1}{F} = \dfrac{1}{f_1} + \dfrac{1}{f_2}$.

(b) $u = -40$ cm, $v = +120$ cm: $\dfrac{1}{F} = \dfrac{1}{120} + \dfrac{1}{40} = \dfrac{4}{120}$, so $F = +${dec(cl.F, 2)}$ cm. Then $\dfrac{1}{f_2} = \dfrac{1}{30} - \dfrac{1}{15} = -\dfrac{1}{30}$, so $f_2 = ${dec(cl.f2, 2)}$ cm.

(c) $P = \dfrac{1}{0.30} = +${dec(cl.P, 3)}$ D: positive, so the combination **converges** light.`,
  sol: 'Add the two lens equations; then 1/F = 1/v − 1/u and 1/f₂ = 1/F − 1/f₁.',
  scheme: [['Lens 1 equation and I₁ as the object of lens 2', 1], ['Adding gives 1/F = 1/f₁ + 1/f₂', 1], ['F = +30 cm', 1], ['f₂ = −30 cm', 1], ['P = +3.33 D, converging', 1]],
  d: 3, c: 'application', t: [3, 4], wl: null,
}), () => near(cl.F, 30) && near(cl.f2, -30) && near(lensImage(-40, 1 / (1 / 15 + 1 / cl.f2)).v, 120) || `cl ${cl.f2}`);
const tw = { f1: 12, f2: 8, d: 60, u: -18, h: 3 };
tw.a = lensImage(tw.u, tw.f1);
tw.u2 = tw.a.v - tw.d;
tw.b = lensImage(tw.u2, tw.f2);
tw.sys = systemImage(tw.u, tw.h, [L(0, tw.f1), L(tw.d, tw.f2)]);
add('twolens-long', long({
  stem: '(a) Explain how the final image formed by two thin lenses on a common axis, some distance apart, is found, and how the total magnification is obtained. [1] (b) Two convex lenses of focal lengths 12 cm and 8.0 cm are placed 60 cm apart on a common axis. An object 3.0 cm tall stands 18 cm in front of the first lens. Find the position of the image formed by each lens. [2] (c) Find the size and nature of the final image. [2]',
  model: r`(a) Find the image formed by the first lens; it acts as the object for the second lens, at a distance $u_2 = v_1 - d$ from it. The final image is found with the thin lens formula for lens 2, and $m = m_1 m_2$.

(b) Lens 1: $\dfrac{1}{v_1} = \dfrac{1}{12} - \dfrac{1}{18} = \dfrac{1}{36}$, $v_1 = +${dec(tw.a.v, 2)}$ cm. Lens 2: $u_2 = 36 - 60 = ${dec(tw.u2, 2)}$ cm; $\dfrac{1}{v_2} = \dfrac{1}{8.0} - \dfrac{1}{24} = \dfrac{2}{24}$, $v_2 = +${dec(tw.b.v, 2)}$ cm beyond the second lens.

(c) $m_1 = \dfrac{36}{-18} = ${dec(tw.a.m, 1)}$, $m_2 = \dfrac{12}{-24} = ${dec(tw.b.m, 1)}$, $m = m_1 m_2 = +${dec(tw.sys.m, 1)}$. The final image is **real** (v₂ > 0), **erect** and the same size, 3.0 cm tall.`,
  sol: 'u₂ = v₁ − d; m = m₁m₂.',
  scheme: [['Image of lens 1 is the object of lens 2; m = m₁m₂', 1], ['v₁ = +36 cm', 1], ['u₂ = −24 cm, v₂ = +12 cm', 1], ['m₁ = −2, m₂ = −0.5, m = +1', 1], ['3.0 cm, real and erect', 1]],
  d: 3, c: 'application', t: [5], wl: null,
}), () => near(tw.sys.x - tw.d, 12) && near(tw.sys.h, 3) && tw.sys.real || `tw ${tw.sys.x}`);
const lml2 = { f: 20, u: -30, d: 40 };
lml2.v1 = lensImage(lml2.u, lml2.f).v;
lml2.R = lml2.v1 - lml2.d;
lml2.sys = systemImage(lml2.u, 1, [L(0, lml2.f), M(lml2.d, -lml2.R / 2), L(0, lml2.f)]);
add('lensmirror-long', long({
  stem: '(a) Describe how the focal length of a convex lens can be found with a plane mirror and a pin, and explain why the pin coincides with its image only when it is at the focus. [2] (b) An object is 30 cm in front of a convex lens of focal length 20 cm. A convex mirror is placed on the axis 40 cm behind the lens, and the final image is found to coincide with the object. Find the radius of curvature of the mirror, and state whether the final image is erect or inverted. [3]',
  model: r`(a) Lay the lens on (or in front of) a plane mirror and move a pin along the axis until its inverted image is seen tip to tip with it, with no parallax; the pin-to-lens distance is f. From a pin at the focus, light leaves the lens as a **parallel beam**; the mirror reflects a parallel beam as a parallel beam, so on its return the lens focuses it in the same focal plane. At any other position the returning beam is not parallel and the image forms elsewhere.

(b) Lens: $\dfrac{1}{v_1} = \dfrac{1}{20} - \dfrac{1}{30} = \dfrac{1}{60}$, so $I_1$ would be ${dec(lml2.v1, 2)} cm beyond the lens, 20 cm **behind** the convex mirror. The image falls back on the object only if the rays retrace their path, i.e. strike the mirror normally: they must be heading for its **centre of curvature**. So $R = 60 - 40 = ${dec(lml2.R, 2)}$ cm.
Magnifications: lens $m_1 = -2$, mirror (rays retrace) $-1$, lens on return $-0.5$: $m = ${dec(lml2.sys.m, 1)}$, so the final image is **inverted** and the same size.`,
  sol: 'Parallel beam from F; rays retrace when aimed at the mirror’s centre of curvature.',
  scheme: [['Method: pin–image coincidence without parallax; distance = f', 1], ['Reason: parallel beam out and back', 1], ['v₁ = +60 cm', 1], ['I₁ at the mirror’s centre of curvature: R = 20 cm', 1], ['Final image inverted, same size', 1]],
  d: 4, c: 'analysis', t: [5], wl: null,
}), () => near(lml2.R, 20) && near(lml2.sys.x, -30) && near(lml2.sys.m, -1) || `lml2 ${lml2.sys.x}`);
