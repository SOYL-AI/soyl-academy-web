// ISC 12 Physics ch16 Optical Instruments — question bank (ISC style).
// D = 25 cm; magnifying powers quoted as magnitudes. Numbers computed here and re-solved: lens systems with the paraxial
// ray tracer in svgs.mjs (the image found by tracing rays, and β/α read off the traced rays), independently of the
// step-by-step formulas used in the answers.
import { mk, add, r, dec, near } from '../../isc-12-physics-ch01/src/lib.mjs';
import { D, lensImage, objectFor, simpleM, compound, telescope, cassegrain, dmin, traceRay, systemImage, L, M } from './svgs.mjs';

const { mcq, ar, tf, fill, match, num, short, long } = mk;
const rad = (x) => (x * Math.PI) / 180;

/** Independent re-solve of a compound microscope by ray tracing: β/α with the final image at D or at infinity. */
function traceMicroscope({ fo, uo, fe, sep }) {
  const h = 1e-3;
  const img = systemImage(uo, h, [L(0, fo), L(sep, fe)]);
  if (!Number.isFinite(img.x)) {
    const t = traceRay([uo, h], 0, [L(0, fo), L(sep, fe)]);
    return { M: Math.abs(t.s) / (h / D), atInf: true };
  }
  return { M: Math.abs(img.h) / (sep - img.x) / (h / D), dist: sep - img.x, atInf: false };
}
/** Independent re-solve of a refracting telescope by ray tracing: β/α for a distant object at angle a. */
function traceTelescope({ fo, fe, sep }) {
  const a = 1e-4;
  const el = [L(0, fo), L(sep, fe)];
  const t1 = traceRay([-10, 10 * a + 0.5], -a, el);
  const t2 = traceRay([-10, 10 * a - 0.5], -a, el);
  if (Math.abs(t1.s - t2.s) < 1e-12) return { M: Math.abs(t1.s) / a, atInf: true };
  const X = (t2.y - t1.y + t1.s * t1.x - t2.s * t2.x) / (t1.s - t2.s);
  const Y = t1.y + t1.s * (X - t1.x);
  return { M: Math.abs(Y) / (sep - X) / a, dist: sep - X, atInf: false };
}

// ================================================================ t01 simple microscope
add('simpleD-mcq', mcq({
  stem: 'A convex lens of focal length f is used as a magnifying glass, held close to the eye, with the final image adjusted to the least distance of distinct vision D. Its magnifying power is',
  right: '1 + D/f',
  wrong: ['D/f', 'D/f − 1', '1 + f/D'],
  sol: 'With v = −D, 1/|u| = 1/f + 1/D, and M = β/α = (h/|u|)/(h/D) = D/|u| = 1 + D/f. D/f is the value for the image at infinity — option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
const np = { MD: 4.5 };
np.f = D / (np.MD - 1);
np.Minf = D / np.f;
add('nearpoint-mcq', mcq({
  stem: 'A hand lens gives a magnifying power of 4.5 when the image of a postage stamp is formed at the near point (25 cm). When the stamp is moved so that the image is at infinity, the magnifying power becomes',
  right: '3.5',
  wrong: ['5.5', '4.5', '3.15'],
  sol: r`$1 + \dfrac{D}{f} = 4.5$ gives $\dfrac{D}{f} = 3.5$ (so $f = ${dec(np.f, 3)}$ cm). With the image at infinity $M = \dfrac{D}{f} = ${dec(np.Minf, 2)}$: always exactly one less — option (@K).`,
  d: 2, c: 'application', t: [1],
}), () => near(simpleM(np.f).atInf, 3.5) && near(simpleM(np.f).atD, 4.5) || `np ${np.Minf}`);
const lp = { P: 32 };
lp.f = 100 / lp.P;
lp.M = D / lp.f;
add('loupe-num', num({
  stem: 'A gem-tester’s loupe is a single convex lens of power +32 D. Find its magnifying power when it is used with a relaxed eye (final image at infinity).',
  value: Number(dec(lp.M, 2)), tol: 0.1, unit: null,
  sol: r`$f = \dfrac{1}{P} = \dfrac{1}{32}$ m $= ${dec(lp.f, 4)}$ cm. Image at infinity: $M = \dfrac{D}{f} = \dfrac{25}{3.125} = ${dec(lp.M, 2)}$.`,
  scheme: [['f = 3.125 cm; M = D/f = 8.0', 1]],
  d: 2, c: 'understanding', t: [1],
}), (q) => {
  const t = traceRay([-lp.f, 1e-3], 0, [L(0, lp.f)]);
  const t2 = traceRay([-lp.f, 1e-3], 1e-3 / -lp.f, [L(0, lp.f)]);
  return (near(t.s, t2.s, 1e-9) && near(Math.abs(t.s) / (1e-3 / D), 8) && q.answer.value === 8) || `lp ${lp.M}`;
});
const lf = { f: 7.5 };
lf.u = objectFor(-D, lf.f);
add('leaf-mcq', mcq({
  stem: 'A biology student studies the veins of a leaf through a hand lens of focal length 7.5 cm held close to her eye, with the image formed at 25 cm. The leaf must be held at a distance from the lens of about',
  right: '5.8 cm',
  wrong: ['7.5 cm', '10.7 cm', '3.3 cm'],
  sol: r`$v = -25$ cm: $\dfrac{1}{u} = \dfrac{1}{v} - \dfrac{1}{f} = -\dfrac{1}{25} - \dfrac{1}{7.5}$, so $|u| = ${dec(-lf.u, 3)}$ cm — option (@K). At 7.5 cm (the focus) the image would be at infinity; 10.7 cm comes from subtracting the reciprocals; 3.3 is D/f, the magnifying power at infinity.`,
  d: 2, c: 'application', t: [1],
}), () => near(lensImage(lf.u, lf.f).v, -25) && near(-lf.u, 5.77, 0.002) || `lf ${lf.u}`);
const sc = { f: 4 };
sc.u = objectFor(-D, sc.f);
sc.M = 1 + D / sc.f;
add('loupeD-num', num({
  stem: 'A stamp collector uses a convex lens of focal length 4.0 cm held close to the eye, and adjusts the stamp until its image is at the near point, 25 cm away. How far from the lens is the stamp? Answer in cm (3 significant figures).',
  value: Number(dec(-sc.u, 3)), tol: 0.03, unit: 'cm',
  sol: r`$\dfrac{1}{|u|} = \dfrac{1}{f} + \dfrac{1}{D} = \dfrac{1}{4.0} + \dfrac{1}{25} = 0.29$ cm⁻¹, so $|u| = ${dec(-sc.u, 3)}$ cm (and $M = 1 + \dfrac{25}{4.0} = ${dec(sc.M, 3)}$).`,
  scheme: [['v = −25 cm in the lens formula: 1/|u| = 1/4.0 + 1/25', 1], ['|u| = 3.45 cm', 1]],
  marks: 2, d: 2, c: 'application', t: [1],
}), (q) => near(lensImage(-q.answer.value, 4).v, -25, 0.01) && q.answer.value === 3.45 || `sc ${sc.u}`);
add('simple-fill', fill({
  stem: 'A naturalist examines an insect’s wing through a hand lens of focal length 10 cm with a relaxed eye, the final image being at infinity. The magnifying power is ___.',
  acc: [['2.5', '2.50']],
  sol: r`Image at infinity: $M = \dfrac{D}{f} = \dfrac{25}{10} = 2.5$.`,
  d: 1, c: 'understanding', t: [1],
}), (q) => near(simpleM(10).atInf, 2.5) && q.answer.blanks[0].accepted[0] === '2.5' || 'sf');
add('simple-tf', tf({
  stem: 'If a magnifying glass is first used with the object at its focus and then with the object moved slightly closer so that the image comes in to the near point, its magnifying power rises by exactly one.',
  key: 't',
  sol: 'True. With the object at the focus, M = D/f (image at infinity); with the image at the near point, M = 1 + D/f. The difference is exactly 1, whatever the lens.',
  d: 2, c: 'understanding', t: [1],
}), () => [3, 7.5, 12].every((f) => near(simpleM(f).atD - simpleM(f).atInf, 1)) || 'stf');
add('simple-ar', ar({
  a: 'For a magnifying glass held close to the eye with the image at the near point, the magnifying power is equal to the linear magnification v/u of the image.',
  r: 'With the eye at the lens, an image of height h′ at distance D subtends the angle h′/D, while the object held at D without the lens subtends h/D.',
  key: 'a',
  sol: 'Both are true, and R explains A: M = β/α = (h′/D)/(h/D) = h′/h, which is the linear magnification v/u (here D/|u| = 1 + D/f) — option (a).',
  d: 3, c: 'understanding', t: [1],
}), () => near(lensImage(objectFor(-D, 6), 6).m, simpleM(6).atD) || 'sar');
const fs = { f: 8, D1: 25, D2: 50 };
fs.M1 = 1 + fs.D1 / fs.f;
fs.M2 = 1 + fs.D2 / fs.f;
add('farsight-short2', short({
  marks: 2,
  stem: 'Two people use the same magnifying glass of focal length 8.0 cm, each adjusting the image to their own near point: one has a near point of 25 cm, the other (who is long-sighted) of 50 cm. Find the magnifying power each obtains, and explain why the long-sighted person gains more from the lens.',
  model: r`$M = 1 + \dfrac{D}{f}$ with each person’s own D: $1 + \dfrac{25}{8.0} = ${dec(fs.M1, 3)}$ and $1 + \dfrac{50}{8.0} = ${dec(fs.M2, 3)}$. M compares with the best unaided view, α = h/D. The long-sighted person must hold the object twice as far away to see it clearly, so α is half as large, while with the lens both view it from only about 6–7 cm, so β is nearly the same: the ratio β/α is larger for the long-sighted person.`,
  sol: 'M = 1 + D/f with D = 25 cm and 50 cm.',
  scheme: [['M = 4.13 and 7.25', 1], ['Larger D makes the unaided angle α smaller, so the gain is larger', 1]],
  d: 3, c: 'analysis', t: [1], wl: null,
}), () => near(lensImage(objectFor(-50, 8), 8).m, fs.M2) && near(fs.M1, 4.125) || `fs ${fs.M2}`);
const tl = { f: 0.2 };
tl.M = 1 + D / tl.f;
add('tinylens-short2', short({
  marks: 2,
  stem: 'A student claims that a single glass bead lens of focal length 2.0 mm would make a simple microscope with a magnifying power of more than 100, and that compound microscopes are therefore unnecessary. Evaluate the claim.',
  model: r`On paper the claim holds: $M = 1 + \dfrac{25}{0.20} = ${dec(tl.M, 3)}$. In practice it is **not** a good replacement: the bead is about the size of the focal length, so the object must be held about 2 mm from it and the eye pressed against it; the field of view is tiny and so little light is collected; and a strongly curved lens gives large spherical and chromatic aberration. A compound microscope reaches high M with comfortable distances and corrected lenses.`,
  sol: 'M = 1 + D/f is large, but distances, field and aberrations make it impractical.',
  scheme: [['M = 126 from the formula', 1], ['Impractical: object ~2 mm away, tiny field, aberrations; compound microscope needed', 1]],
  d: 3, c: 'evaluation', t: [1], wl: null,
}), () => near(tl.M, 126) || `tl ${tl.M}`);
add('simple-short3', short({
  marks: 3,
  stem: 'Define the magnifying power of a simple microscope. Derive an expression for it (a) when the final image is formed at the least distance of distinct vision D, (b) when the final image is at infinity.',
  model: r`Magnifying power $M = \dfrac{\beta}{\alpha}$: the angle subtended at the eye by the image ÷ the angle subtended by the object placed at D and viewed directly ($\alpha = h/D$). The eye is close to the lens.
(a) The object, of height h, is inside F at distance |u|; the virtual image is at $v = -D$. $\beta = \dfrac{h}{|u|}$, so $M = \dfrac{D}{|u|}$. From $\dfrac{1}{v} - \dfrac{1}{u} = \dfrac{1}{f}$: $-\dfrac{1}{D} + \dfrac{1}{|u|} = \dfrac{1}{f}$, so $\dfrac{D}{|u|} = 1 + \dfrac{D}{f}$, i.e. $M = 1 + \dfrac{D}{f}$.
(b) The object is at F; the rays leave parallel and $\beta = \dfrac{h}{f}$, so $M = \dfrac{D}{f}$.`,
  sol: 'β/α with α = h/D; lens formula with v = −D; object at F for (b).',
  scheme: [['Definition with α for the object at D', 1], ['(a) M = D/|u| = 1 + D/f using v = −D', 1], ['(b) β = h/f, M = D/f', 1]],
  d: 2, c: 'understanding', t: [1], wl: null,
}));
const sl5 = { P: 12 };
sl5.f = 100 / sl5.P;
Object.assign(sl5, simpleM(sl5.f));
sl5.u = objectFor(-D, sl5.f);
add('simple-long', long({
  stem: '(a) With the help of a ray diagram (described in words), derive the magnifying power of a simple microscope when the image is formed at the near point, and state how it changes when the image is formed at infinity. [3] (b) An engraver uses a lens of power +12 D as a simple microscope. (i) Find the magnifying power with the image at the near point and at infinity. [1] (ii) How far from the lens must the work be held in the first case? [1]',
  model: r`(a) The object AB, of height h, is placed inside the focus F of a convex lens held close to the eye. Rays from A — one parallel to the axis (refracted through F₂) and one through the optical centre (undeviated) — diverge after the lens; traced back, they meet at A′, giving a virtual, erect, enlarged image A′B′ at the near point, $v = -D$.
$\beta = \dfrac{h}{|u|}$ (angle of the image at the eye) and $\alpha = \dfrac{h}{D}$ (object held at D without the lens), so $M = \dfrac{D}{|u|}$. The lens formula with $v = -D$ gives $\dfrac{1}{|u|} = \dfrac{1}{f} + \dfrac{1}{D}$, so $M = 1 + \dfrac{D}{f}$. With the object at F the image is at infinity and $M = \dfrac{D}{f}$, one less.

(b)(i) $f = \dfrac{1}{12}$ m $= ${dec(sl5.f, 3)}$ cm: $M = 1 + 25 \times 0.12 = ${dec(sl5.atD, 1)}$ at the near point, $M = ${dec(sl5.atInf, 1)}$ at infinity.
(ii) $\dfrac{1}{|u|} = 0.12 + 0.04 = 0.16$ cm⁻¹, so $|u| = ${dec(-sl5.u, 3)}$ cm.`,
  sol: 'Ray diagram, β/α, lens formula with v = −D; then P → f.',
  scheme: [['Ray diagram described: object inside F, virtual erect image at D', 1], ['β = h/|u|, α = h/D', 1], ['M = 1 + D/f; D/f for the image at infinity', 1], ['M = 4 and 3', 1], ['|u| = 6.25 cm', 1]],
  d: 3, c: 'application', t: [1], wl: null,
}), () => near(sl5.atD, 4) && near(sl5.atInf, 3) && near(-sl5.u, 6.25) && near(lensImage(sl5.u, sl5.f).v, -25) || `sl5 ${sl5.u}`);
const pw = { Minf: 12.5 };
pw.f = D / pw.Minf;
add('focal-num', num({
  stem: 'A watch repairer wants a single-lens magnifier that gives a magnifying power of 12.5 when used with a relaxed eye. What focal length must the lens have? Answer in cm.',
  value: Number(dec(pw.f, 2)), tol: 0.05, unit: 'cm',
  sol: r`Image at infinity: $M = \dfrac{D}{f}$, so $f = \dfrac{25}{12.5} = ${dec(pw.f, 2)}$ cm (power +50 D).`,
  scheme: [['f = D/M = 2.0 cm', 1]],
  d: 2, c: 'understanding', t: [1],
}), (q) => near(simpleM(q.answer.value).atInf, 12.5) || `pw ${pw.f}`);

// ================================================================ t02 compound microscope
add('intermediate-mcq', mcq({
  stem: 'In a compound microscope adjusted so that the final image is at the near point, the image formed by the objective is',
  right: 'real, inverted and enlarged, lying just inside the focus of the eyepiece',
  wrong: ['virtual, erect and enlarged, lying just outside the focus of the eyepiece', 'real, erect and diminished, lying at the focus of the objective', 'real, inverted and enlarged, lying beyond twice the focal length of the eyepiece'],
  sol: 'The object is just beyond F_o, so the objective forms a real, inverted, enlarged image. The eyepiece must form a virtual magnified image of it, so it lies inside F_e — option (@K).',
  d: 1, c: 'understanding', t: [2],
}), () => {
  const c = compound({ fo: 1.5, uo: -1.8, fe: 6.25 });
  return (c.vo > 0 && c.mo > 1 && -c.ueD < 6.25) || 'int';
});
add('finalimage-mcq', mcq({
  stem: 'A pathology student views a stained cell through a compound microscope with the final image at the near point. Compared with the cell itself, the final image is',
  right: 'virtual, inverted and greatly enlarged',
  wrong: ['real, inverted and greatly enlarged', 'virtual, erect and greatly enlarged', 'real, erect and slightly enlarged'],
  sol: 'The objective forms a real, inverted image; the eyepiece, used as a magnifier, forms a virtual image of it without turning it again. So the final image is virtual and inverted relative to the cell, and enlarged by m_o × m_e — option (@K).',
  d: 2, c: 'understanding', t: [2],
}), () => systemImage(-1.8, 1, [L(0, 1.5), L(14, 6.25)]).m < 0 && !systemImage(-1.8, 1, [L(0, 1.5), L(14, 6.25)]).real || 'fin');
const cd = { fo: 0.8, uo: -0.9, fe: 4 };
Object.assign(cd, compound(cd));
add('compoundD-num', num({
  stem: 'A microscope has an objective of focal length 0.80 cm and an eyepiece of focal length 4.0 cm. A specimen is 0.90 cm in front of the objective, and the final image is formed 25 cm from the eyepiece. Find the magnifying power.',
  value: Number(dec(cd.MD, 2)), tol: 0.5, unit: null,
  sol: r`Objective: $\dfrac{1}{v_o} = \dfrac{1}{0.80} - \dfrac{1}{0.90} = \dfrac{1}{7.2}$, so $v_o = ${dec(cd.vo, 2)}$ cm and $m_o = \dfrac{7.2}{0.90} = ${dec(cd.mo, 1)}$. Eyepiece: $m_e = 1 + \dfrac{25}{4.0} = 7.25$. $M = 8 \times 7.25 = ${dec(cd.MD, 2)}$.`,
  scheme: [['v_o = 7.2 cm, m_o = 8', 1], ['M = 8 × (1 + 25/4.0) = 58', 1]],
  marks: 2, d: 2, c: 'application', t: [2],
}), (q) => near(traceMicroscope({ fo: 0.8, uo: -0.9, fe: 4, sep: cd.sepD }).M, 58) && q.answer.value === 58 || `cd ${cd.MD}`);
const sp = { fo: 1.2, uo: -1.5, fe: 3 };
Object.assign(sp, compound(sp));
add('separation-num', num({
  stem: 'In a student’s microscope the objective has a focal length of 1.2 cm and the eyepiece 3.0 cm. A small seed is 1.5 cm from the objective, and the microscope is focused so that the final image is at the near point. Find the distance between the two lenses, in cm (3 significant figures).',
  value: Number(dec(sp.sepD, 3)), tol: 0.05, unit: 'cm',
  sol: r`Objective: $\dfrac{1}{v_o} = \dfrac{1}{1.2} - \dfrac{1}{1.5} = \dfrac{1}{6.0}$, $v_o = ${dec(sp.vo, 2)}$ cm. Eyepiece, image at 25 cm: $\dfrac{1}{|u_e|} = \dfrac{1}{3.0} + \dfrac{1}{25}$, $|u_e| = ${dec(-sp.ueD, 3)}$ cm. Separation $= 6.0 + 2.68 = ${dec(sp.sepD, 3)}$ cm.`,
  scheme: [['v_o = 6.0 cm; |u_e| = 2.68 cm', 1], ['Separation 8.68 cm', 1]],
  marks: 2, d: 3, c: 'analysis', t: [2],
}), (q) => {
  const t = traceMicroscope({ fo: 1.2, uo: -1.5, fe: 3, sep: q.answer.value });
  return (near(t.dist, 25, 0.02) && near(sp.MD, 4 * (1 + 25 / 3))) || `sp ${t.dist}`;
});
const im = { mo: 30, fe: 2 };
im.M = im.mo * (D / im.fe);
add('infinity-mcq', mcq({
  stem: 'The objective of a microscope forms an image 30 times as large as the specimen, and the eyepiece has a focal length of 2.0 cm. The microscope is set for a relaxed eye, with the final image at infinity. Its magnifying power is',
  right: '375',
  wrong: ['405', '60', '15'],
  sol: r`Final image at infinity: $M = m_o \cdot \dfrac{D}{f_e} = 30 \times \dfrac{25}{2.0} = ${dec(im.M, 3)}$ — option (@K). 405 uses $1 + D/f_e$ (image at D); 60 multiplies by $f_e$; 15 divides by it.`,
  d: 2, c: 'application', t: [2],
}), () => near(im.M, 375) || 'im');
const ii = { fo: 1, uo: -1.1, fe: 4 };
Object.assign(ii, compound(ii));
add('infinity-num', num({
  stem: 'A microscope has an objective of focal length 1.0 cm and an eyepiece of focal length 4.0 cm. An object is 1.1 cm from the objective, and the eyepiece is set so that the final image is at infinity. Using the expression for this setting, find the magnifying power.',
  value: Number(dec(ii.Minf, 3)), tol: 0.5, unit: null,
  sol: r`$\dfrac{1}{v_o} = \dfrac{1}{1.0} - \dfrac{1}{1.1}$, so $v_o = ${dec(ii.vo, 2)}$ cm and $m_o = \dfrac{11}{1.1} = ${dec(ii.mo, 2)}$. $M = m_o \dfrac{D}{f_e} = 10 \times \dfrac{25}{4.0} = ${dec(ii.Minf, 3)}$ (lenses $11 + 4.0 = 15$ cm apart).`,
  scheme: [['v_o = 11 cm, m_o = 10', 1], ['M = 10 × 25/4.0 = 62.5', 1]],
  marks: 2, d: 2, c: 'application', t: [2],
}), (q) => {
  const t = traceMicroscope({ fo: 1, uo: -1.1, fe: 4, sep: ii.sepInf });
  return (t.atInf && near(t.M, 62.5) && q.answer.value === 62.5) || `ii ${t.M}`;
});
add('compound-tf', tf({
  stem: 'In a compound microscope, the eyepiece forms a real image of the objective’s image, and the eye looks at this real image.',
  key: 'f',
  sol: 'False. The objective’s image lies inside the focus of the eyepiece (or at it), so the eyepiece acts as a magnifying glass and forms a virtual image (at D or at infinity). The only real image is the one formed by the objective.',
  d: 1, c: 'understanding', t: [2],
}));
add('compound-ar', ar({
  a: 'The final image seen in a compound microscope is inverted with respect to the object.',
  r: 'The eyepiece of a compound microscope inverts the image formed by the objective.',
  key: 'c',
  sol: 'A is true. R is false: the eyepiece forms a virtual, erect image of the objective’s image (like a magnifying glass). The inversion is done by the objective, which forms a real, inverted image — option (c).',
  d: 2, c: 'understanding', t: [2],
}), () => lensImage(-5, 6.25).m > 0 && lensImage(-1.8, 1.5).m < 0 || 'car');
const es = { fe: 4 };
es.ue = -objectFor(-D, es.fe);
es.shift = es.fe - es.ue;
add('eyeshift-mcq', mcq({
  stem: 'A microscope with an eyepiece of focal length 4.0 cm is focused with the final image at the near point (25 cm). To view with a relaxed eye (final image at infinity) without moving the specimen or the objective, the eyepiece must be moved',
  right: 'about 0.55 cm away from the objective',
  wrong: ['about 0.55 cm towards the objective', 'about 4.0 cm away from the objective', 'about 3.45 cm towards the objective'],
  sol: r`For the image at D the objective’s image is $|u_e| = \dfrac{1}{1/4.0 + 1/25} = ${dec(es.ue, 3)}$ cm from the eyepiece; for the image at infinity it must be at the focus, 4.0 cm away. The eyepiece moves out by $4.0 - 3.45 = ${dec(es.shift, 2)}$ cm, away from the objective — option (@K).`,
  d: 3, c: 'analysis', t: [2],
}), () => near(es.shift, 0.552, 0.002) || `es ${es.shift}`);
const tb = { fo: 0.4, vo: 20 };
tb.exact = tb.vo / tb.fo - 1;
tb.approx = tb.vo / tb.fo;
add('tube-short2', short({
  marks: 2,
  stem: 'Show that the linear magnification of the objective of a microscope can be written as v_o/f_o − 1. An objective of focal length 0.40 cm forms its image 20 cm away: compare its exact magnification with the estimate L/f_o, taking L = 20 cm.',
  model: r`From $\dfrac{1}{v_o} - \dfrac{1}{u_o} = \dfrac{1}{f_o}$, multiply by $v_o$: $1 - \dfrac{v_o}{u_o} = \dfrac{v_o}{f_o}$, so $\dfrac{v_o}{|u_o|} = \dfrac{v_o}{f_o} - 1$.
Here $\dfrac{20}{0.40} - 1 = ${dec(tb.exact, 2)}$, against the estimate $\dfrac{L}{f_o} = ${dec(tb.approx, 2)}$: only 2% high, because $v_o \gg f_o$.`,
  sol: 'Multiply the lens formula by v_o.',
  scheme: [['m_o = v_o/f_o − 1 from the lens formula', 1], ['49 against 50 (2% difference)', 1]],
  d: 3, c: 'analysis', t: [2], wl: null,
}), () => near(lensImage(-tb.vo / tb.exact, tb.fo).v, tb.vo) && near(tb.exact, 49) || `tb ${tb.exact}`);
const tf2 = { fo: 1.5 };
add('twoF-short2', short({
  marks: 2,
  stem: 'A student sets up a compound microscope with the specimen at twice the focal length of the objective, “so that the objective’s image is sharp and well placed”. Explain, using the objective’s magnification, why this is a poor choice and where the specimen should be.',
  model: r`At $u_o = -2f_o$ the objective forms its image at $v_o = 2f_o$, so $m_o = \dfrac{v_o}{|u_o|} = 1$: the objective does not magnify at all, and the whole magnifying power comes from the eyepiece. The specimen should be **just beyond $F_o$**, so that $v_o$ is large compared with $|u_o|$ and the objective gives a large real image (e.g. $m_o \approx \dfrac{L}{f_o}$).`,
  sol: 'm_o = 1 at 2F_o.',
  scheme: [['At 2F_o, v_o = 2f_o and m_o = 1: no magnification from the objective', 1], ['Specimen just beyond F_o makes v_o ≫ |u_o|', 1]],
  d: 2, c: 'analysis', t: [2], wl: null,
}), () => near(lensImage(-2 * tf2.fo, tf2.fo).m, -1) || 'tf2');
add('compound-short3', short({
  marks: 3,
  stem: 'Describe, with a labelled ray diagram (in words), how a compound microscope forms the final image at the least distance of distinct vision, and derive an expression for its magnifying power in this adjustment.',
  model: r`The object AB is placed just beyond the focus $F_o$ of the objective, which forms a real, inverted, enlarged image A′B′ (height $h'$) inside the focus $F_e$ of the eyepiece. The eyepiece acts as a simple microscope and forms a virtual image A″B″ at D.
A″B″ subtends at the eye the same angle as A′B′: $\beta = \dfrac{h'}{|u_e|}$. The object at D unaided subtends $\alpha = \dfrac{h}{D}$. So $M = \dfrac{h'}{h}\cdot\dfrac{D}{|u_e|}$.
$\dfrac{h'}{h} = \dfrac{v_o}{|u_o|}$ and, with $v = -D$ for the eyepiece, $\dfrac{D}{|u_e|} = 1 + \dfrac{D}{f_e}$: $M = \dfrac{v_o}{|u_o|}\left(1 + \dfrac{D}{f_e}\right) \approx \dfrac{L}{f_o}\left(1 + \dfrac{D}{f_e}\right)$.`,
  sol: 'm_o × m_e with m_e = 1 + D/f_e.',
  scheme: [['Ray diagram described: A′B′ real, inverted, inside F_e; A″B″ virtual at D', 1], ['β = h′/|u_e|, α = h/D', 1], ['M = (v_o/|u_o|)(1 + D/f_e)', 1]],
  d: 2, c: 'understanding', t: [2], wl: null,
}));
const dg = { M: 135, fe: 2, fo: 1.5 };
dg.me = 1 + D / dg.fe;
dg.mo = dg.M / dg.me;
dg.vo = dg.fo * (1 + dg.mo);
dg.uo = dg.vo / dg.mo;
dg.ue = -objectFor(-D, dg.fe);
dg.sep = dg.vo + dg.ue;
add('design-short3', short({
  marks: 3,
  stem: 'A microscope is to give a magnifying power of 135 with the final image at the near point, using an eyepiece of focal length 2.0 cm and an objective of focal length 1.5 cm. Find how far from the objective the specimen must be, and the distance between the two lenses.',
  model: r`Eyepiece: $m_e = 1 + \dfrac{25}{2.0} = 13.5$, so the objective must give $m_o = \dfrac{135}{13.5} = ${dec(dg.mo, 2)}$.
With $v_o = m_o|u_o|$ in the lens formula: $v_o = f_o(1 + m_o) = 1.5 \times 11 = ${dec(dg.vo, 3)}$ cm and $|u_o| = \dfrac{16.5}{10} = ${dec(dg.uo, 3)}$ cm.
Eyepiece object distance: $\dfrac{1}{|u_e|} = \dfrac{1}{2.0} + \dfrac{1}{25}$, $|u_e| = ${dec(dg.ue, 3)}$ cm. Separation $= 16.5 + 1.85 = ${dec(dg.sep, 4)}$ cm.`,
  sol: 'm_o = M/m_e; v_o = f_o(1 + m_o); separation v_o + |u_e|.',
  scheme: [['m_e = 13.5, m_o = 10', 1], ['|u_o| = 1.65 cm (v_o = 16.5 cm)', 1], ['Separation 18.35 cm', 1]],
  d: 4, c: 'analysis', t: [2], wl: null,
}), () => near(traceMicroscope({ fo: 1.5, uo: -dg.uo, fe: 2, sep: dg.sep }).M, 135) && near(dg.uo, 1.65) && near(dg.sep, 18.352, 1e-3) || `dg ${dg.sep}`);
const sw = { fo: 0.75, uo: -0.8, fe: 2 };
Object.assign(sw, compound(sw));
add('switch-short3', short({
  marks: 3,
  stem: 'A microscope has an objective of focal length 0.75 cm and an eyepiece of focal length 2.0 cm, with a specimen 0.80 cm from the objective. Find the magnifying power and the separation of the lenses (a) with the final image at the near point, (b) with the final image at infinity.',
  model: r`Objective: $\dfrac{1}{v_o} = \dfrac{1}{0.75} - \dfrac{1}{0.80}$, $v_o = ${dec(sw.vo, 3)}$ cm, $m_o = \dfrac{12}{0.80} = ${dec(sw.mo, 2)}$.
(a) $M = 15\left(1 + \dfrac{25}{2.0}\right) = ${dec(sw.MD, 4)}$; $|u_e| = ${dec(-sw.ueD, 3)}$ cm, so the lenses are $${dec(sw.sepD, 4)}$ cm apart.
(b) $M = 15 \times \dfrac{25}{2.0} = ${dec(sw.Minf, 4)}$; the objective’s image is at $F_e$, so the lenses are $12 + 2.0 = ${dec(sw.sepInf, 3)}$ cm apart.`,
  sol: 'm_o = 15; m_e = 13.5 or 12.5.',
  scheme: [['v_o = 12 cm, m_o = 15', 1], ['(a) M = 202.5, separation 13.85 cm', 1], ['(b) M = 187.5, separation 14.0 cm', 1]],
  d: 3, c: 'application', t: [2], wl: null,
}), () => near(traceMicroscope({ ...sw, uo: -0.8, sep: sw.sepD }).M, 202.5) && traceMicroscope({ fo: 0.75, uo: -0.8, fe: 2, sep: sw.sepInf }).atInf && near(sw.Minf, 187.5) || `sw ${sw.MD}`);
const cl = { fo: 1.25, uo: -1.5, fe: 3 };
Object.assign(cl, compound(cl));
add('compound-long', long({
  stem: '(a) Draw (describe in words) a labelled ray diagram of a compound microscope with the final image at the least distance of distinct vision D, and derive the expression for its magnifying power in this adjustment. [3] (b) In such a microscope the objective has a focal length of 1.25 cm and the eyepiece 3.0 cm; a specimen is placed 1.5 cm from the objective. Find the magnifying power with the final image at D and the distance between the lenses. [2]',
  model: r`(a) Object AB just beyond $F_o$; objective forms a real, inverted, enlarged image A′B′ (height $h'$) just inside $F_e$; the eyepiece forms the virtual, enlarged final image A″B″ at D (inverted relative to AB). Rays from A: one parallel to the axis, refracted through $F_o'$ to A′; one through the objective’s centre to A′; from A′ they diverge after the eyepiece, as if from A″.
$\beta = \dfrac{h'}{|u_e|}$, $\alpha = \dfrac{h}{D}$, so $M = \dfrac{h'}{h}\cdot\dfrac{D}{|u_e|} = \dfrac{v_o}{|u_o|}\left(1 + \dfrac{D}{f_e}\right)$, using $\dfrac{1}{|u_e|} = \dfrac{1}{f_e} + \dfrac{1}{D}$ for the eyepiece.

(b) $\dfrac{1}{v_o} = \dfrac{1}{1.25} - \dfrac{1}{1.5} = \dfrac{2}{15}$, $v_o = ${dec(cl.vo, 2)}$ cm, $m_o = 5$; $M = 5\left(1 + \dfrac{25}{3.0}\right) = ${dec(cl.MD, 3)}$. $|u_e| = ${dec(-cl.ueD, 3)}$ cm, so the lenses are $${dec(cl.sepD, 4)}$ cm apart.`,
  sol: 'Ray diagram; M = m_o m_e; then numbers.',
  scheme: [['Ray diagram described with A′B′ inside F_e and A″B″ at D', 1], ['β = h′/|u_e| and α = h/D', 1], ['M = (v_o/|u_o|)(1 + D/f_e)', 1], ['v_o = 7.5 cm, M = 46.7', 1], ['Separation 10.18 cm', 1]],
  d: 3, c: 'application', t: [2], wl: null,
}), () => near(traceMicroscope({ fo: 1.25, uo: -1.5, fe: 3, sep: cl.sepD }).M, 140 / 3) && near(cl.sepD, 10.179, 1e-3) || `cl ${cl.MD}`);
const ta = { L: 18, fo: 0.45, fe: 5 };
ta.M = (ta.L / ta.fo) * (D / ta.fe);
add('tubeapprox-num', num({
  stem: 'Estimate the magnifying power of a microscope, set for a relaxed eye, whose objective (focal length 0.45 cm) forms its image 18 cm away and whose eyepiece has a focal length of 5.0 cm. Use the approximation L/f_o for the objective.',
  value: Number(dec(ta.M, 3)), tol: 2, unit: null,
  sol: r`$M \approx \dfrac{L}{f_o}\cdot\dfrac{D}{f_e} = \dfrac{18}{0.45} \times \dfrac{25}{5.0} = 40 \times 5 = ${dec(ta.M, 3)}$ (exactly, $m_o = 39$ and $M = 195$).`,
  scheme: [['M ≈ (18/0.45)(25/5.0) = 200', 1]],
  d: 2, c: 'understanding', t: [2],
}), (q) => near(ta.M, 200) && near(18 / 0.45 - 1, 39) && q.answer.value === 200 || `ta ${ta.M}`);

// ================================================================ t03 refracting telescope
add('normal-mcq', mcq({
  stem: 'An observer adjusts an astronomical telescope so that she can view the Moon with a relaxed eye (normal adjustment). The image of the Moon formed by the objective then lies',
  right: 'at the focus of the objective, which coincides with the focus of the eyepiece',
  wrong: ['at the near point of the observer’s eye', 'midway between the objective and the eyepiece', 'at twice the focal length of the eyepiece from it'],
  sol: 'Light from the distant Moon is focused in the focal plane of the objective. For the rays to leave the eyepiece parallel (final image at infinity), that image must also be at the focus of the eyepiece, so the lenses are f_o + f_e apart — option (@K).',
  d: 1, c: 'understanding', t: [3],
}));
const tfl = { fo: 90, fe: 3.6 };
add('tele-fill', fill({
  stem: 'A refracting telescope built with an objective of focal length 90 cm and an eyepiece of focal length 3.6 cm is set in normal adjustment. The lenses are then ___ cm apart.',
  acc: [['93.6']],
  sol: `In normal adjustment L = f_o + f_e = 90 + 3.6 = **${dec(tfl.fo + tfl.fe, 3)}** cm.`,
  d: 1, c: 'understanding', t: [3],
}), (q) => traceTelescope({ ...tfl, sep: 93.6 }).atInf && q.answer.blanks[0].accepted[0] === '93.6' || 'tfl');
const jp = { fo: 90, fe: 3.6, a: 2.0e-4 };
jp.b = (jp.fo / jp.fe) * jp.a;
add('jupiter-num', num({
  stem: 'Jupiter subtends an angle of 2.0 × 10⁻⁴ rad at the Earth. What angle does its final image subtend at the eye when it is viewed through a telescope in normal adjustment, with an objective of focal length 90 cm and an eyepiece of focal length 3.6 cm? Answer in rad.',
  value: Number(dec(jp.b, 2)), tol: 0.0002, unit: 'rad',
  sol: r`$M = \dfrac{f_o}{f_e} = \dfrac{90}{3.6} = 25$, and $\beta = M\alpha = 25 \times 2.0 \times 10^{-4} = ${dec(jp.b, 2)}$ rad.`,
  scheme: [['M = 25; β = Mα = 5.0 × 10⁻³ rad', 1]],
  d: 2, c: 'application', t: [3],
}), (q) => near(traceTelescope({ fo: 90, fe: 3.6, sep: 93.6 }).M * 2e-4, q.answer.value) || `jp ${jp.b}`);
const td = telescope({ fo: 140, fe: 3.5 });
add('teleD-num', num({
  stem: 'An astronomical telescope has an objective of focal length 140 cm and an eyepiece of focal length 3.5 cm. Find its magnifying power when it is adjusted so that the final image is at the near point (25 cm).',
  value: Number(dec(td.MD, 3)), tol: 0.2, unit: null,
  sol: r`$M = \dfrac{f_o}{f_e}\left(1 + \dfrac{f_e}{D}\right) = 40 \times \left(1 + \dfrac{3.5}{25}\right) = 40 \times 1.14 = ${dec(td.MD, 3)}$.`,
  scheme: [['f_o/f_e = 40', 1], ['M = 40 × 1.14 = 45.6', 1]],
  marks: 2, d: 2, c: 'application', t: [3],
}), (q) => {
  const t = traceTelescope({ fo: 140, fe: 3.5, sep: td.LD });
  return (near(t.M, 45.6) && near(t.dist, 25) && q.answer.value === 45.6) || `td ${t.M}`;
});
const sh = { fe: 3.5 };
sh.shift = sh.fe + td.ueD;
add('shift-num', num({
  stem: 'An astronomical telescope with an objective of focal length 140 cm and an eyepiece of focal length 3.5 cm is first in normal adjustment. By how much must the eyepiece be moved, and in which direction, to bring the final image to the near point, 25 cm from the eye? Give the distance in cm.',
  value: Number(dec(sh.shift, 2)), tol: 0.02, unit: 'cm',
  sol: r`Normal adjustment: the objective’s image is 3.5 cm from the eyepiece. For the image at D: $\dfrac{1}{|u_e|} = \dfrac{1}{3.5} + \dfrac{1}{25}$, so $|u_e| = ${dec(-td.ueD, 3)}$ cm. The eyepiece moves $3.5 - 3.07 = ${dec(sh.shift, 2)}$ cm **towards the objective** (tube $${dec(td.LD, 4)}$ cm instead of 143.5 cm).`,
  scheme: [['|u_e| = 3.07 cm for the image at D', 1], ['Moves 0.43 cm towards the objective', 1]],
  marks: 2, d: 3, c: 'analysis', t: [3],
}), (q) => near(traceTelescope({ fo: 140, fe: 3.5, sep: 143.5 - q.answer.value }).dist, 25, 0.02) || `sh ${sh.shift}`);
add('teleD-mcq', mcq({
  stem: 'An astronomical telescope is changed from normal adjustment to the setting in which the final image is at the near point. Compared with normal adjustment, the magnifying power and the distance between the lenses',
  right: 'increase and decrease respectively',
  wrong: ['decrease and increase respectively', 'both increase', 'both stay the same'],
  sol: 'M changes from f_o/f_e to (f_o/f_e)(1 + f_e/D), which is larger; the objective’s image must now lie inside the focus of the eyepiece, so the eyepiece moves in and L = f_o + |u_e| is less than f_o + f_e — option (@K).',
  d: 3, c: 'analysis', t: [3],
}), () => {
  const t = telescope({ fo: 80, fe: 8 });
  return (t.MD > t.Mn && t.LD < t.Ln) || 'tdm';
});
add('inverted-tf', tf({
  stem: 'When a distant water tank on a hill is viewed through an astronomical telescope in normal adjustment, it appears upside down.',
  key: 't',
  sol: 'True. The objective forms a real, inverted image of the distant object; the eyepiece magnifies it without inverting it again, so the final image is inverted. (Terrestrial telescopes add an erecting lens or prisms.)',
  d: 1, c: 'understanding', t: [3],
}), () => {
  const t = traceRay([-10, 10 * 1e-3], -1e-3, [L(0, 80), L(88, 8)]);
  return t.s > 0 || 'inv';
});
add('tele-ar', ar({
  a: 'In normal adjustment the distance between the objective and the eyepiece of an astronomical telescope equals the sum of their focal lengths.',
  r: 'The final image formed by an astronomical telescope is inverted.',
  key: 'b',
  sol: 'Both are true, but R does not explain A. A follows because the image formed by the objective lies at the focus of both lenses; the inversion (R) is due to the objective forming a real image — option (b).',
  d: 2, c: 'understanding', t: [3],
}));
add('tele-short3', short({
  marks: 3,
  stem: 'With the help of a ray diagram (described in words), derive an expression for the magnifying power of a refracting astronomical telescope in normal adjustment. State the distance between the lenses in this adjustment.',
  model: r`Parallel rays from the top of a distant object reach the objective at a small angle α to the axis. The objective brings them to a point A′ in its focal plane, forming a real, inverted image A′B′ of height h at $F_o$: $\alpha \approx \dfrac{h}{f_o}$ (from the ray through the objective’s centre).
In normal adjustment A′B′ is also at the focus of the eyepiece, so the rays from A′ leave the eyepiece parallel, at angle β with $\beta \approx \dfrac{h}{f_e}$ (ray through the eyepiece’s centre); the final image is at infinity.
$M = \dfrac{\beta}{\alpha} = \dfrac{f_o}{f_e}$; the lenses are $f_o + f_e$ apart.`,
  sol: 'α = h/f_o, β = h/f_e.',
  scheme: [['Ray diagram: image at the common focus; rays leave parallel', 1], ['α = h/f_o and β = h/f_e', 1], ['M = f_o/f_e; L = f_o + f_e', 1]],
  d: 2, c: 'understanding', t: [3], wl: null,
}));
const tl2 = telescope({ fo: 60, fe: 2 });
add('telelengths-short3', short({
  marks: 3,
  stem: 'A small telescope has an objective of focal length 60 cm and an eyepiece of focal length 2.0 cm. Find its magnifying power and the separation of the lenses (a) in normal adjustment, (b) with the final image at the near point.',
  model: r`(a) $M = \dfrac{60}{2.0} = ${dec(tl2.Mn, 2)}$; $L = 60 + 2.0 = ${dec(tl2.Ln, 2)}$ cm.
(b) $M = 30\left(1 + \dfrac{2.0}{25}\right) = 30 \times 1.08 = ${dec(tl2.MD, 3)}$. Eyepiece: $\dfrac{1}{|u_e|} = \dfrac{1}{2.0} + \dfrac{1}{25} = 0.54$, $|u_e| = ${dec(-tl2.ueD, 3)}$ cm, so $L = ${dec(tl2.LD, 4)}$ cm.`,
  sol: 'f_o/f_e and f_o + f_e; then (1 + f_e/D) and f_o + |u_e|.',
  scheme: [['(a) M = 30, L = 62 cm', 1], ['(b) M = 32.4', 1], ['(b) L = 61.85 cm', 1]],
  d: 3, c: 'application', t: [3], wl: null,
}), () => near(traceTelescope({ fo: 60, fe: 2, sep: tl2.LD }).M, 32.4) && traceTelescope({ fo: 60, fe: 2, sep: 62 }).atInf && near(tl2.LD, 61.852, 1e-3) || `tl2 ${tl2.LD}`);
const ds = { M: 35, L: 108 };
ds.fe = ds.L / (ds.M + 1);
ds.fo = ds.M * ds.fe;
add('design-short2', short({
  marks: 2,
  stem: 'A telescope in normal adjustment must have a magnifying power of 35 and a tube length of 108 cm. Find the focal lengths of the objective and the eyepiece needed.',
  model: r`$f_o = 35 f_e$ and $f_o + f_e = 108$ cm, so $36 f_e = 108$: $f_e = ${dec(ds.fe, 2)}$ cm and $f_o = ${dec(ds.fo, 3)}$ cm.`,
  sol: 'f_o/f_e = 35 and f_o + f_e = 108.',
  scheme: [['f_o = 35 f_e and f_o + f_e = 108', 1], ['f_e = 3.0 cm, f_o = 105 cm', 1]],
  d: 2, c: 'application', t: [3], wl: null,
}), () => near(ds.fe, 3) && near(ds.fo, 105) && traceTelescope({ fo: ds.fo, fe: ds.fe, sep: 108 }).atInf || 'ds');
const mn = { fo: 160, fe: 4, a: 9.0e-3 };
mn.d = mn.fo * mn.a;
mn.b = (mn.fo / mn.fe) * mn.a;
add('moon-num', num({
  stem: 'The Moon subtends an angle of about 9.0 × 10⁻³ rad at the Earth. An observatory telescope has an objective of focal length 160 cm and an eyepiece of focal length 4.0 cm. Find the diameter of the Moon’s image formed by the objective, in cm.',
  value: Number(dec(mn.d, 3)), tol: 0.02, unit: 'cm',
  sol: r`The Moon is effectively at infinity, so its image is in the focal plane of the objective: diameter $= f_o\alpha = 160 \times 9.0 \times 10^{-3} = ${dec(mn.d, 3)}$ cm. (Viewed in normal adjustment it subtends $40 \times 9.0 \times 10^{-3} = ${dec(mn.b, 2)}$ rad at the eye.)`,
  scheme: [['Image in the focal plane: d = f_oα', 1], ['d = 1.44 cm', 1]],
  marks: 2, d: 2, c: 'application', t: [3],
}), (q) => {
  const t = traceRay([-10, 10 * mn.a], -mn.a, [L(0, mn.fo)]);
  return (near(Math.abs(t.y + t.s * (mn.fo - t.x)), q.answer.value, 0.01) && q.answer.value === 1.44) || `mn ${mn.d}`;
});
add('aperture-short2', short({
  marks: 2,
  stem: 'Two telescopes have identical focal lengths (objective 120 cm, eyepiece 3.0 cm), but the objective of one is 6.0 cm in diameter and the other 12 cm. Compare their magnifying powers and the amounts of light they collect from a star, and say which would show a faint star cluster better.',
  model: 'Both have $M = \\dfrac{f_o}{f_e} = 40$: magnifying power does not depend on the aperture. The light collected is proportional to the **area** of the objective, so the 12 cm telescope collects $(12/6.0)^2 = 4$ times as much. It shows the faint cluster better: the images are brighter, and its wider aperture also resolves stars that are closer together.',
  sol: 'M = f_o/f_e for both; light ∝ diameter².',
  scheme: [['Same M = 40', 1], ['4 times the light; the wider telescope is better for faint objects', 1]],
  d: 3, c: 'analysis', t: [3], wl: null,
}), () => near(120 / 3, 40) && near((12 / 6) ** 2, 4) || 'ap');
const tlg = telescope({ fo: 75, fe: 2.5 });
add('tele-long', long({
  stem: '(a) Draw (describe in words) a labelled ray diagram of a refracting astronomical telescope with the final image formed at the least distance of distinct vision D, and derive the expression for its magnifying power. [3] (b) A telescope has an objective of focal length 75 cm and an eyepiece of focal length 2.5 cm. Find its magnifying power and length (i) in normal adjustment, (ii) with the final image at D. [2]',
  model: r`(a) Parallel rays from the top of a distant object, at angle α to the axis, are brought by the objective to A′ in its focal plane: a real, inverted image A′B′ of height h at $F_o$, so $\alpha = \dfrac{h}{f_o}$. The eyepiece is placed so that A′B′ lies just inside its focus, at $|u_e|$; it forms a virtual, magnified final image A″B″ at D, the emerging rays diverging as if from A″.
β, the angle subtended by A″B″ at the eye, equals that of A′B′: $\beta = \dfrac{h}{|u_e|}$. So $M = \dfrac{\beta}{\alpha} = \dfrac{f_o}{|u_e|}$. With $v = -D$: $\dfrac{1}{|u_e|} = \dfrac{1}{f_e} + \dfrac{1}{D}$, hence $M = \dfrac{f_o}{f_e}\left(1 + \dfrac{f_e}{D}\right)$.

(b)(i) $M = \dfrac{75}{2.5} = ${dec(tlg.Mn, 2)}$, $L = ${dec(tlg.Ln, 3)}$ cm. (ii) $M = 30 \times 1.1 = ${dec(tlg.MD, 2)}$; $|u_e| = \dfrac{1}{0.4 + 0.04} = ${dec(-tlg.ueD, 3)}$ cm, so $L = ${dec(tlg.LD, 4)}$ cm.`,
  sol: 'α = h/f_o, β = h/|u_e|; lens formula for the eyepiece with v = −D.',
  scheme: [['Ray diagram described: A′B′ at F_o inside F_e; A″B″ at D', 1], ['α = h/f_o and β = h/|u_e|', 1], ['M = (f_o/f_e)(1 + f_e/D)', 1], ['(i) M = 30, L = 77.5 cm', 1], ['(ii) M = 33, L = 77.27 cm', 1]],
  d: 3, c: 'application', t: [3], wl: null,
}), () => near(traceTelescope({ fo: 75, fe: 2.5, sep: tlg.LD }).M, 33) && near(tlg.LD, 77.273, 1e-3) || `tlg ${tlg.MD}`);
const tf3 = { fo: 180, M: 60 };
tf3.fe = tf3.fo / tf3.M;
add('eyepiece-num', num({
  stem: 'A college observatory has a refracting telescope whose objective has a focal length of 1.8 m. What focal length of eyepiece gives a magnifying power of 60 in normal adjustment? Answer in cm.',
  value: Number(dec(tf3.fe, 2)), tol: 0.05, unit: 'cm',
  sol: r`$f_e = \dfrac{f_o}{M} = \dfrac{180}{60} = ${dec(tf3.fe, 2)}$ cm.`,
  scheme: [['f_e = f_o/M = 3.0 cm', 1]],
  d: 2, c: 'understanding', t: [3],
}), (q) => near(traceTelescope({ fo: 180, fe: q.answer.value, sep: 180 + q.answer.value }).M, 60) || 'tf3');
add('birds-mcq', mcq({
  stem: 'A bird-watcher wants to watch herons on a lake 300 m away. An astronomical telescope of suitable magnifying power is a poor choice mainly because',
  right: 'it shows the birds upside down, unless an erecting lens or prisms are added',
  wrong: ['it cannot focus on objects nearer than a few kilometres', 'its magnifying power is less than 1 for nearby objects', 'it can be used only at night'],
  sol: 'The objective forms a real, inverted image and the eyepiece does not turn it back, so terrestrial viewing needs an erecting system (a third lens, or prisms as in binoculars) — option (@K).',
  d: 1, c: 'understanding', t: [3, 5],
}));

// ================================================================ t04 reflecting telescope
add('cass-mcq', mcq({
  stem: 'In a Cassegrain reflecting telescope, the light reflected by the large primary mirror reaches the eyepiece after',
  right: 'reflection at a small convex secondary mirror, which sends it back through a hole in the centre of the primary',
  wrong: ['reflection at a small plane mirror at 45°, which sends it out through the side of the tube', 'refraction through a convex lens placed at the focus of the primary', 'reflection at a small concave mirror placed beyond the focus of the primary'],
  sol: 'In the Cassegrain design a convex secondary, placed inside the focus of the concave primary, reflects the converging light back along the axis through a central hole in the primary to a focus behind it. A 45° plane mirror sending light out sideways describes the Newtonian design — option (@K).',
  d: 1, c: 'understanding', t: [4],
}));
add('chroma-mcq', mcq({
  stem: 'A bright star seen through a large lens telescope shows faint coloured fringes, but the same star seen through a mirror telescope does not. This is because',
  right: 'the angle of reflection does not depend on wavelength, while the refractive index of glass does',
  wrong: ['a mirror collects more light than a lens of the same diameter', 'a mirror forms a virtual image, which has no colour', 'light travels faster in a mirror telescope tube than in glass'],
  sol: 'A lens focuses different colours at different distances because n of glass varies with wavelength (chromatic aberration). The law of reflection (i = r) involves no refractive index, so all colours reflected by a mirror meet at one focus — option (@K).',
  d: 2, c: 'understanding', t: [4],
}), () => (30 / (2 * (1.53 - 1))) < 30 / (2 * (1.51 - 1)) || 'chr');
add('paraboloid-tf', tf({
  stem: 'A concave mirror of large aperture ground to a spherical shape brings all rays of a parallel beam to a single focus, which is why large telescope mirrors are made spherical.',
  key: 'f',
  sol: 'False. A spherical mirror of large aperture focuses rays far from the axis closer to the mirror than paraxial rays (spherical aberration). Telescope primaries are made paraboloidal, which brings all rays parallel to the axis to one point.',
  d: 2, c: 'understanding', t: [4],
}), () => {
  // exact reflection at a sphere of R = 100: an edge ray at y = 40 crosses the axis nearer than R/2
  const R = 100;
  const y = 40;
  const th = Math.asin(y / R);
  const x = R - R / (2 * Math.cos(th));
  return (x > 0 && R / 2 - (R - x) < 0) || 'par';
});
const nw = { R: 400, fe: 2.5 };
nw.fo = nw.R / 2;
nw.M = nw.fo / nw.fe;
add('refl-mcq', mcq({
  stem: 'In a reflecting telescope the concave objective mirror has a radius of curvature of 4.0 m; a small plane mirror merely turns the converging beam aside to an eyepiece of focal length 2.5 cm. With the final image at infinity, the magnifying power is',
  right: '80',
  wrong: ['160', '40', '1.6'],
  sol: r`The plane mirror does not change the focal length, so $f_o = \dfrac{R}{2} = 2.0$ m $= 200$ cm and $M = \dfrac{f_o}{f_e} = \dfrac{200}{2.5} = ${dec(nw.M, 2)}$ — option (@K). 160 uses R instead of R/2.`,
  d: 2, c: 'application', t: [4],
}), () => {
  // trace: concave mirror f = 200, plane mirror (folding) ignored, eyepiece at the focus
  const a = 1e-5;
  const t = traceRay([0, 5], -a, [M(10, 200), L(10 - 200 - 2.5, 2.5)]);
  return (near(Math.abs(t.s) / a, 80, 1e-6) && near(nw.M, 80)) || `nw ${Math.abs(t.s) / a}`;
});
const rn = { F: 320, fe: 2 };
add('refl-num', num({
  stem: 'The mirror system of a Cassegrain telescope has an effective focal length of 3.2 m. Find the magnifying power with an eyepiece of focal length 2.0 cm, the final image being at infinity.',
  value: rn.F / rn.fe, tol: 1, unit: null,
  sol: r`$M = \dfrac{F}{f_e} = \dfrac{320}{2.0} = ${dec(rn.F / rn.fe, 3)}$.`,
  scheme: [['M = F/f_e = 160', 1]],
  d: 1, c: 'understanding', t: [4],
}), (q) => q.answer.value === 160 || 'rn');
const cs = cassegrain({ fp: 100, xp: 100, xs: 20, fs: -25, fe: 4 });
add('cass-short3', short({
  marks: 3,
  stem: 'In a Cassegrain telescope the primary mirror has a focal length of 100 cm, and a convex secondary mirror of focal length 25 cm is placed 80 cm in front of it. Find where the light finally comes to a focus, the effective focal length of the mirror system, and the magnifying power with an eyepiece of focal length 4.0 cm (image at infinity).',
  model: r`The primary alone would focus 100 cm from it, i.e. $100 - 80 = ${dec(cs.p, 2)}$ cm beyond the secondary: a **virtual object** for the secondary.
Mirror formula for the convex secondary ($f = -25$ cm, virtual object 20 cm behind it): $\dfrac{1}{v} = -\dfrac{1}{25} + \dfrac{1}{20} = \dfrac{1}{100}$, so $v = ${dec(cs.q, 3)}$ cm in front of the secondary: the focus is $100 - 80 = ${dec(cs.behind, 2)}$ cm **behind** the primary (through its hole).
The secondary magnifies $\dfrac{100}{20} = ${dec(cs.ms, 1)}$ times, so $F = 5 \times 100 = ${dec(cs.F, 3)}$ cm and $M = \dfrac{500}{4.0} = ${dec(cs.M, 3)}$.`,
  sol: 'Virtual object for the secondary; F = f_primary × m_secondary.',
  scheme: [['Virtual object 20 cm behind the secondary; v = 100 cm', 1], ['Focus 20 cm behind the primary; F = 500 cm', 1], ['M = 125', 1]],
  d: 4, c: 'analysis', t: [4], wl: null,
}), () => {
  const el = [M(100, 100), M(20, -25), L(cs.xe, 4)];
  const t = traceRay([0, 30], 0, el.slice(0, 2));
  const xAxis = t.x - t.y / t.s;
  const a = 1e-5;
  const o1 = traceRay([0, 30], a, el);
  return (near(xAxis, 120) && near(30 / Math.abs(t.s), 500) && near(Math.abs(o1.s) / a, 125, 1e-6)) || `cs ${xAxis}`;
});
add('devasthal-short2', short({
  marks: 2,
  stem: 'A guide at an observatory tells visitors that India’s 3.6 m Devasthal telescope near Nainital could not sensibly have been built with a 3.6 m lens as its objective. Give two reasons from physics that support her.',
  model: 'Any two: (i) a lens can be held only at its rim, so a 3.6 m lens would **sag** under its own weight and distort the image, while a mirror is supported over its whole back; (ii) a lens shows **chromatic aberration**, a mirror does not; (iii) a lens needs a huge block of flawless, bubble-free glass and **two** accurately shaped surfaces, and the thick glass **absorbs** light; a mirror needs one coated surface.',
  sol: 'Sag, chromatic aberration, flawless glass and absorption.',
  scheme: [['First valid reason', 1], ['Second valid reason', 1]],
  d: 2, c: 'understanding', t: [4], wl: null,
}));
add('refl-ar', ar({
  a: 'Because the small secondary mirror of a Cassegrain telescope blocks the centre of the incoming beam, the image of a planet seen through it has a dark hole in the middle.',
  r: 'The secondary mirror stops the central part of the light that would otherwise reach the primary mirror.',
  key: 'd',
  sol: 'R is true. A is false: every part of the remaining (ring-shaped) aperture receives light from every point of the planet and focuses it to the corresponding point of the image, so the image is complete — only slightly dimmer — option (d).',
  d: 3, c: 'analysis', t: [4],
}));
add('obstruction-mcq', mcq({
  stem: 'Someone sticks a small black paper disc over the centre of the objective of a telescope, covering one tenth of its area, and looks at the Moon. Compared with before, the image of the Moon is',
  right: 'complete and the same size, but slightly dimmer',
  wrong: ['missing its central part', 'smaller in size, but just as bright', 'unchanged in every way, because only the edges of a lens focus light'],
  sol: 'Each point of the Moon sends light through the whole uncovered aperture, and all of it is focused to the same image point. Blocking part of the aperture removes some light from every image point (about 10% less), but leaves the image whole and the magnifying power unchanged — option (@K).',
  d: 3, c: 'analysis', t: [4],
}), () => {
  // rays through two different parts of the aperture from one object point meet at the same image point
  const a = systemImage(-500, 2, [L(0, 80)]);
  const t1 = traceRay([-500, 2], (6 - 2) / 500, [L(0, 80)]);
  return near(t1.y + t1.s * (a.x - t1.x), a.h, 1e-9) || 'obs';
});
add('compare-short3', short({
  marks: 3,
  stem: 'A school can afford either a refracting telescope with a 10 cm objective lens or a Cassegrain reflector with a 20 cm mirror, at the same price. Students mainly want to photograph faint nebulae. Evaluate the choice, giving one point against the option you recommend.',
  model: 'Recommend the **20 cm reflector**. (i) It collects $(20/10)^2 = 4$ times as much light, so faint nebulae show up in much shorter exposures, and its larger aperture resolves finer detail. (ii) A mirror has no chromatic aberration, so colour photographs are free of fringes, and the folded Cassegrain tube is short and easy to mount. **Against it:** the secondary mirror blocks some light and the mirrors need occasional re-alignment and re-coating, while a refractor’s sealed tube needs little upkeep.',
  sol: 'Light ∝ diameter²; no chromatic aberration; upkeep against it.',
  scheme: [['Reflector: 4 times the light (and better resolution)', 1], ['No chromatic aberration; short tube', 1], ['A valid drawback (obstruction, alignment, re-coating)', 1]],
  d: 3, c: 'evaluation', t: [4, 5], wl: null,
}), () => near((20 / 10) ** 2, 4) || 'cmp');
const rl = { F: 600, fe1: 2, fe2: 5 };
add('refl-long', long({
  stem: '(a) Draw (describe in words) a labelled ray diagram of a Cassegrain reflecting telescope forming the final image at infinity. [2] (b) State two advantages of a reflecting telescope over a refracting one. [1] (c) A Cassegrain telescope has a mirror system of effective focal length 6.0 m. Find its magnifying power with eyepieces of focal lengths 2.0 cm and 5.0 cm, and say which eyepiece is better for viewing a large, faint galaxy. [2]',
  model: r`(a) Parallel rays from a distant object fall on a large **concave paraboloidal primary mirror** with a central hole. The converging reflected rays meet a small **convex secondary mirror** placed inside the primary’s focus, which reflects them back along the axis through the hole to a focus just behind the primary. An **eyepiece** placed so that this image is at its focus sends the rays out parallel: the final image is at infinity.

(b) Any two: no chromatic aberration; no spherical aberration with a paraboloidal mirror; a mirror can be supported from behind, so very large apertures are possible; one surface to figure, no light absorbed in glass; short tube.

(c) $M = \dfrac{F}{f_e}$: $\dfrac{600}{2.0} = ${dec(rl.F / rl.fe1, 3)}$ and $\dfrac{600}{5.0} = ${dec(rl.F / rl.fe2, 3)}$. The **5.0 cm** eyepiece is better for a large faint galaxy: the light is spread over a smaller image, so it looks brighter, and more of the galaxy fits in the field.`,
  sol: 'Concave primary, convex secondary, hole, eyepiece; M = F/f_e.',
  scheme: [['Diagram: concave primary with hole, convex secondary', 1], ['Rays to a focus behind the primary; eyepiece gives parallel rays', 1], ['Two advantages', 1], ['M = 300 and 120', 1], ['5.0 cm eyepiece: brighter image, wider field', 1]],
  d: 3, c: 'analysis', t: [4], wl: null,
}), () => near(rl.F / rl.fe1, 300) && near(rl.F / rl.fe2, 120) || 'rl');

// ================================================================ t05 resolving power; uses, advantages, drawbacks
add('rp-mcq', mcq({
  stem: 'A laboratory microscope just fails to separate two neighbouring granules in a cell lit with red light. The granules are most likely to be resolved by',
  right: 'lighting the specimen with violet light instead of red',
  wrong: ['fitting an eyepiece of shorter focal length', 'using a longer microscope tube', 'lighting the specimen with infrared radiation'],
  sol: 'd = λ/(2n sin β): a shorter wavelength makes the smallest resolvable separation smaller. A stronger eyepiece or a longer tube only increases the magnification of the blurred image; infrared has a longer wavelength — option (@K).',
  d: 2, c: 'application', t: [5],
}), () => dmin(400, 1, rad(60)) < dmin(700, 1, rad(60)) || 'rpm');
const rp = { lambda: 480, na: 0.8 };
rp.d = rp.lambda / (2 * rp.na);
add('rp-num', num({
  stem: 'A microscope objective has a numerical aperture n sin β of 0.80 and is used with blue light of wavelength 480 nm. Using d = λ/(2n sin β), find the smallest separation between two points of the specimen that it can resolve, in nm.',
  value: Number(dec(rp.d, 3)), tol: 2, unit: 'nm',
  sol: r`$d = \dfrac{480}{2 \times 0.80} = ${dec(rp.d, 3)}$ nm, i.e. $3.0 \times 10^{-7}$ m; resolving power $\dfrac{1}{d} = ${dec(1 / (rp.d * 1e-9) / 1e6, 3)} \times 10^{6}$ m⁻¹.`,
  scheme: [['d = λ/(2n sin β) substituted', 1], ['d = 300 nm', 1]],
  marks: 2, d: 2, c: 'application', t: [5],
}), (q) => near(dmin(480, 1, Math.asin(0.8)), q.answer.value) || `rp ${rp.d}`);
const oil = { lambda: 600, n: 1.52, beta: 60 };
oil.d = dmin(oil.lambda, oil.n, rad(oil.beta));
add('oil-num', num({
  stem: 'An oil-immersion objective accepts light in a cone of half-angle 60°, the oil having a refractive index of 1.52. Using d = λ/(2n sin β), find the smallest separation it can resolve in orange light of wavelength 600 nm, in nm (3 significant figures).',
  value: Number(dec(oil.d, 3)), tol: 2, unit: 'nm',
  sol: r`$n\sin\beta = 1.52 \times \sin 60° = 1.52 \times 0.866 = 1.316$; $d = \dfrac{600}{2 \times 1.316} = ${dec(oil.d, 3)}$ nm (without the oil it would be ${dec(dmin(600, 1, rad(60)), 3)} nm).`,
  scheme: [['Numerical aperture 1.32', 1], ['d = 228 nm', 1]],
  marks: 2, d: 3, c: 'application', t: [5],
}), (q) => near(600 / (2 * 1.52 * Math.sqrt(3) / 2), q.answer.value, 0.005) && q.answer.value === 228 || `oil ${oil.d}`);
const rr = { l1: 675, l2: 450 };
rr.ratio = rr.l1 / rr.l2;
add('rpratio-num', num({
  stem: 'The same microscope objective is used first with red light of wavelength 675 nm and then with blue light of wavelength 450 nm. Find the ratio of its resolving power in blue light to that in red light.',
  value: Number(dec(rr.ratio, 2)), tol: 0.02, unit: null,
  sol: r`Resolving power $= \dfrac{2n\sin\beta}{\lambda} \propto \dfrac{1}{\lambda}$, so the ratio is $\dfrac{675}{450} = ${dec(rr.ratio, 2)}$.`,
  scheme: [['RP ∝ 1/λ; ratio 675/450 = 1.5', 1]],
  d: 2, c: 'understanding', t: [5],
}), (q) => near(dmin(675, 1.2, 0.9) / dmin(450, 1.2, 0.9), q.answer.value) || 'rr');
add('rp-tf', tf({
  stem: 'Replacing the eyepiece of a microscope with one that doubles its magnifying power also doubles its resolving power.',
  key: 'f',
  sol: 'False. Resolving power 2n sin β/λ depends on the wavelength, the medium and the objective’s cone of light, not on the eyepiece. A stronger eyepiece only enlarges the blurred image (empty magnification).',
  d: 2, c: 'understanding', t: [5],
}));
add('rp-ar', ar({
  a: 'A microscope that records its images with an ultraviolet-sensitive camera can show finer detail of a specimen than the same microscope used with visible light.',
  r: 'The smallest separation a microscope can resolve is proportional to the wavelength of the light used.',
  key: 'a',
  sol: 'Both are true, and R explains A: d = λ/(2n sin β), so ultraviolet light (shorter λ) gives a smaller d, i.e. finer detail — option (a).',
  d: 2, c: 'understanding', t: [5],
}), () => dmin(300, 1, 1) < dmin(550, 1, 1) || 'rpa');
add('na-fill', fill({
  stem: 'For a microscope objective, the product of the refractive index of the medium in front of it and the sine of the half-angle of the cone of light it accepts, which fixes its resolving power, is called its ___.',
  acc: [['numerical aperture', 'N.A.', 'NA']],
  sol: 'The **numerical aperture**, n sin β; resolving power = 2n sin β/λ.',
  d: 1, c: 'understanding', t: [5],
}));
add('rp-short2', short({
  marks: 2,
  stem: 'Write the expression for the resolving power of a compound microscope, naming each symbol. State two practical ways in which its resolving power can be increased.',
  model: r`Resolving power $= \dfrac{1}{d} = \dfrac{2n\sin\beta}{\lambda}$, where d is the smallest resolvable separation, n the refractive index of the medium between the object and the objective, β the half-angle of the cone of light from the object accepted by the objective, and λ the wavelength. Ways (any two): use light of **shorter wavelength** (blue or ultraviolet); use **oil immersion** to raise n; use an objective of **wider aperture** close to the object (larger β).`,
  sol: 'RP = 2n sin β/λ.',
  scheme: [['Expression with symbols named', 1], ['Two valid ways', 1]],
  d: 2, c: 'understanding', t: [5], wl: null,
}));
const em = { lambda: 550, na1: 0.65, na2: 1.25, gap: 250 };
em.d1 = em.lambda / (2 * em.na1);
em.d2 = em.lambda / (2 * em.na2);
add('empty-short3', short({
  marks: 3,
  stem: 'A student wants to see two features of a bacterium that are 250 nm apart, using green light (550 nm) and a dry objective of numerical aperture 0.65. Finding them blurred together, she fits an eyepiece of much shorter focal length. Evaluate her approach, and suggest a better one supported by a calculation.',
  model: r`With the dry objective $d = \dfrac{550}{2 \times 0.65} = ${dec(em.d1, 3)}$ nm, much more than 250 nm: the features cannot be resolved. A stronger eyepiece only enlarges the blurred image (**empty magnification**), so her approach fails.
Better: an **oil-immersion** objective, e.g. numerical aperture 1.25: $d = \dfrac{550}{2 \times 1.25} = ${dec(em.d2, 3)}$ nm < 250 nm, so the features are resolved. (Shorter wavelength light would also help.)`,
  sol: 'd = λ/(2 n sin β) for each objective.',
  scheme: [['d = 423 nm > 250 nm: not resolvable', 1], ['Stronger eyepiece gives empty magnification', 1], ['Oil immersion (NA 1.25): d = 220 nm, resolved', 1]],
  d: 3, c: 'evaluation', t: [5], wl: null,
}), () => em.d1 > em.gap && em.d2 < em.gap && near(em.d1, 423.1, 1e-3) || `em ${em.d1}`);
add('drawbacks-match', match({
  stem: 'Match each optical instrument in Column A with a drawback of it in Column B.',
  pairs: [
    ['Simple microscope', 'Magnifying power limited to about ten by aberrations of short-focus lenses'],
    ['Compound microscope', 'Inverted image and a small field of view'],
    ['Large refracting telescope', 'Colour fringes, and an objective that sags because it can be held only at its rim'],
    ['Cassegrain reflecting telescope', 'Part of the incoming light blocked by the secondary mirror'],
  ],
  order: [2, 0, 3, 1],
  sol: 'Simple microscope → limited magnifying power (1 → r); compound microscope → inverted image, small field (2 → p); large refractor → chromatic aberration and sagging lens (3 → s); Cassegrain → central obstruction by the secondary (4 → q).',
  d: 2, c: 'understanding', t: [5],
}));
add('separation-match', match({
  stem: 'Match each instrument setting in Column A with the distance between its objective and eyepiece in Column B (v_o is the image distance of a microscope objective; D = 25 cm).',
  pairs: [
    ['Compound microscope, final image at infinity', 'v_o + f_e'],
    ['Telescope in normal adjustment', 'f_o + f_e'],
    ['Telescope, final image at D', 'f_o + f_e D/(f_e + D)'],
    ['Compound microscope, final image at D', 'v_o + f_e D/(f_e + D)'],
  ],
  order: [1, 0, 3, 2],
  sol: 'Final image at infinity: the first image is at the eyepiece focus, so the distance is (image distance) + f_e: microscope v_o + f_e (1 → q), telescope f_o + f_e (2 → p). Final image at D: the first image is |u_e| = f_eD/(f_e + D) from the eyepiece: telescope (3 → s), microscope (4 → r).',
  d: 3, c: 'application', t: [2, 3],
}), () => near(-objectFor(-D, 4), (4 * D) / (4 + D)) || 'sm');
const rv = { lambda: 450, beta: 64, n: 1.5 };
rv.dAir = dmin(rv.lambda, 1, rad(rv.beta));
rv.dOil = dmin(rv.lambda, rv.n, rad(rv.beta));
add('resolve-long', long({
  stem: '(a) What is meant by the resolving power of a compound microscope? Write its expression and state the factors on which it depends. [2] (b) An objective accepts light in a cone of half-angle 64°. Find the smallest separation it can resolve in light of wavelength 450 nm (i) in air, (ii) with oil of refractive index 1.5 between the objective and the slide. [2] (c) Explain why fitting a stronger eyepiece does not let the microscope show finer detail. [1]',
  model: r`(a) Resolving power is the ability to show two close points of the object as separate; it is the reciprocal of the smallest separation d that can be resolved: $\dfrac{1}{d} = \dfrac{2n\sin\beta}{\lambda}$. It depends on the wavelength λ (shorter is better), the refractive index n of the medium between object and objective, and the half-angle β of the cone of light accepted by the objective.

(b) $\sin 64° = 0.899$. (i) $d = \dfrac{450}{2 \times 0.899} = ${dec(rv.dAir, 3)}$ nm. (ii) $d = \dfrac{450}{2 \times 1.5 \times 0.899} = ${dec(rv.dOil, 3)}$ nm.

(c) The eyepiece only magnifies the image formed by the objective. Detail that the objective has already blurred together cannot be separated by enlarging it: the result is a larger but equally blurred image (empty magnification).`,
  sol: 'RP = 2n sin β/λ; d in air and in oil.',
  scheme: [['Definition and expression', 1], ['Factors λ, n, β', 1], ['d = 250 nm in air', 1], ['d = 167 nm in oil', 1], ['Eyepiece only enlarges the blur', 1]],
  d: 3, c: 'application', t: [5], wl: null,
}), () => near(rv.dAir, 250.3, 1e-3) && near(rv.dOil, 166.9, 1e-3) || `rv ${rv.dAir}`);
