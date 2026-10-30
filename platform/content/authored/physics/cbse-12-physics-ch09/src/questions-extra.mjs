// ch09 further items added in the verifier pass (type spread, AR key spread, bank margin). Imported last.
import { mk, add, r, near } from '../../cbse-12-physics-ch01/src/lib.mjs';
import { lensImage } from './optics.mjs';

const { mcq, ar, tf, fill, match, num } = mk;

add('dioptre-fill', fill({
  stem: 'The SI unit of the power of a lens, equal to one inverse metre, is the ___.',
  acc: [['dioptre', 'diopter', 'D']],
  sol: 'The **dioptre** (D): a lens of focal length 1 m has a power of 1 D.',
  d: 1, c: 'recall', t: [3],
}));
add('critical-fill', fill({
  stem: 'For total internal reflection, light must travel from an optically denser to a rarer medium and meet the boundary at more than the ___ angle.',
  acc: [['critical']],
  sol: 'The **critical** angle, given by sin C = n₂/n₁.',
  d: 1, c: 'recall', t: [2],
}));
add('instruments-match', match({
  stem: 'Match each instrument in Column A with its magnifying power in Column B.',
  pairs: [['Simple microscope, image at infinity', 'D/f'], ['Simple microscope, image at the near point', '1 + D/f'], ['Astronomical telescope, normal adjustment', 'fo/fe'], ['Compound microscope, image at infinity', '(L/fo)(D/fe)']],
  order: [2, 0, 3, 1],
  sol: 'Image at infinity → D/f (1 → r); near point → 1 + D/f (2 → p); telescope → fo/fe (3 → s); compound microscope → (L/fo)(D/fe) (4 → q).',
  d: 2, c: 'understanding', t: [5],
}));
add('blue-tf', tf({
  stem: 'The refractive index of glass is slightly larger for violet light than for red light, so a prism deviates violet light more.',
  key: 't',
  sol: 'True. A larger n gives a larger deviation; this dispersion spreads white light into a spectrum, violet bent most.',
  d: 2, c: 'understanding', t: [4],
}));
add('lensm-ar', ar({
  a: 'A concave lens can form a real image of a real object.',
  r: 'A concave lens has a negative focal length.',
  key: 'd',
  sol: 'R is true. A is false: for a real object, 1/v = 1/f + 1/u is always negative for a concave lens, so the image is always virtual — option (d).',
  d: 2, c: 'understanding', t: [3],
}), () => (lensImage(-37, -20).v < 0) || 'virtual');
add('mag-lens-ar', ar({
  a: 'An object placed at the focus of a convex lens produces an image at infinity.',
  r: 'Rays from a point at the focus of a convex lens emerge parallel to the principal axis.',
  key: 'c',
  sol: 'A is true. R is false as stated: rays from a point at the focus emerge parallel to each other, but only the ray from the point on the axis is parallel to the principal axis; rays from an off-axis point in the focal plane emerge parallel to the line through the optical centre — option (c).',
  d: 4, c: 'analysis', t: [3],
}));
const eyeL = lensImage(-25, 5);
add('reading-mcq', mcq({
  stem: 'A watchmaker holds a convex lens of focal length 5.0 cm 4.0 cm away from a small gear. Where is the image formed?',
  right: '20 cm from the lens, on the same side as the gear (virtual)',
  wrong: ['20 cm from the lens, on the other side (real)', '2.2 cm from the lens, on the other side', 'At infinity'],
  sol: r`$\dfrac{1}{v} = \dfrac{1}{5.0} - \dfrac{1}{4.0} = -\dfrac{1}{20}$, so $v = -20$ cm: virtual, on the object’s side, magnified 5 times — option (@K).`,
  d: 3, c: 'application', t: [3, 5],
}), () => near(lensImage(-4, 5).v, -20) && eyeL.v > 0 || 'reading');
const sw = { h: 1.0, C: Math.asin(1 / 1.33) };
sw.rad = sw.h * Math.tan(sw.C);
add('window-mcq', mcq({
  stem: 'A diver looks straight up from 1.0 m below the calm surface of a pool (n = 1.33). Light from the whole sky reaches her only through a bright circle on the surface. The radius of this circle is about',
  right: '1.1 m',
  wrong: ['0.75 m', '1.33 m', '2.0 m'],
  sol: 'Light from above reaches her only within the critical angle C ≈ 48.8° of the vertical, so the radius is h tan C = 1.0 × tan 48.8° ≈ 1.14 m — option (@K).',
  d: 4, c: 'application', t: [2],
}), () => near(sw.rad, 1.14, 0.01) || `sw ${sw.rad}`);
const c2 = 1 / (1 / 20 - 1 / 30);
add('pair-num', num({
  stem: 'A convex lens of focal length 20 cm is in contact with a concave lens of focal length 30 cm. Find the focal length of the combination, in cm.',
  value: c2, tol: 0.3, unit: 'cm',
  sol: '1/F = 1/20 + 1/(−30) = 1/60, so F = 60 cm (converging).',
  scheme: [['1/F = 1/f₁ + 1/f₂ with signs', 1], ['F = +60 cm', 1]],
  marks: 2, d: 2, c: 'application', t: [3],
}), (q) => near(c2, q.answer.value) || 'c2');
add('prismn-mcq', mcq({
  stem: 'Two 60° prisms are made of glasses with refractive indices 1.5 and 1.7. Which gives the larger angle of minimum deviation?',
  right: 'The prism with n = 1.7',
  wrong: ['The prism with n = 1.5', 'Both give the same', 'It depends on the colour of the prism’s base'],
  sol: 'At minimum deviation sin((A + δm)/2) = n sin(A/2); a larger n needs a larger (A + δm)/2, so δm is larger (about 37° against about 56°) — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('choose-mcq', mcq({
  stem: 'From lenses of focal lengths 100 cm, 50 cm, 10 cm and 2.0 cm, which pair gives the astronomical telescope of greatest magnifying power?',
  right: 'Objective 100 cm, eyepiece 2.0 cm',
  wrong: ['Objective 2.0 cm, eyepiece 100 cm', 'Objective 50 cm, eyepiece 10 cm', 'Objective 100 cm, eyepiece 50 cm'],
  sol: 'm = fo/fe is largest with the longest objective and the shortest eyepiece: 100/2.0 = 50 — option (@K).',
  d: 2, c: 'application', t: [5],
}));
