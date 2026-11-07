// ICSE 10 Physics ch04 Refraction of Light at Plane Surfaces — question bank (ICSE 2027 specimen style).
// Every numerical value is computed here and asserted by a re-solve check. MCQ keys are placed by the builder.
import { mk, add, r, near } from './lib.mjs';

const { mcq, ar, tf, fill, match, num, short, long } = mk;
const f = (x, n = 3) => String(Number(x.toPrecision(n)));
const D = Math.PI / 180;
const sinD = (a) => Math.sin(a * D);
const asinD = (x) => Math.asin(x) / D;
const c = 3e8;

// ---------------------------------------------------------------- t01 refraction, laws, speed / wavelength / frequency
add('freq-mcq', mcq({
  stem: 'Orange light from a sodium street lamp passes from air into the glass of a car windscreen. Which property of the light does NOT change?',
  right: 'Its frequency',
  wrong: ['Its speed', 'Its wavelength', 'Its direction, for a ray falling obliquely'],
  sol: 'Frequency is fixed by the source; speed and wavelength both fall in glass, and an oblique ray bends — option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
add('normal-mcq', mcq({
  stem: 'A laser beam strikes the flat glass wall of an aquarium along the normal. Inside the glass the beam:',
  right: 'goes straight on, but travels more slowly',
  wrong: ['bends towards the normal', 'bends away from the normal', 'is totally reflected back'],
  sol: 'For i = 0 there is no change of direction, only a change of speed — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('partial-mcq', mcq({
  stem: 'Standing outside a sweet shop at night, Rehan sees the sweets through the window and also a faint reflection of himself in the same glass. This shows that at a glass surface:',
  right: 'part of the light is reflected and the rest is refracted',
  wrong: ['all the light is refracted', 'all the light is reflected', 'light is absorbed and then given out again'],
  sol: 'Partial reflection and refraction happen together at a boundary — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('rod-mcq', mcq({
  stem: 'A glass rod of refractive index 1.47 almost disappears when it is dipped in a beaker of glycerine. The refractive index of glycerine is most likely:',
  right: 'about 1.47, the same as that of the rod',
  wrong: ['about 1.00', 'about 2.42', 'about 0.68, the reciprocal of 1.47'],
  sol: 'Light passes undeviated, with no reflection, between media of equal refractive index, so the boundary cannot be seen — option (@K).',
  d: 3, c: 'analysis', t: [1, 2],
}));
add('bend-ar', ar({
  a: 'A ray of light going obliquely from water into air bends away from the normal.',
  r: 'Light travels faster in air than in water.',
  key: 'c',
  sol: 'Both are true; the increase in speed is the cause of bending away — option (c).',
  d: 2, c: 'understanding', t: [1],
}));
add('slow-ar', ar({
  a: 'A beam of light that falls along the normal on a glass block passes through it without changing direction.',
  r: 'The frequency of light does not change when it enters glass.',
  key: 'd',
  sol: 'Both statements are true, but the undeviated path is due to i = 0, not to the constant frequency — option (d).',
  d: 3, c: 'analysis', t: [1],
}));
add('freq-tf', tf({
  stem: 'When light passes from air into water, its wavelength becomes shorter but its frequency stays the same.',
  key: 't',
  sol: 'True: v = fλ with f fixed, so λ falls with v.',
  d: 1, c: 'understanding', t: [1],
}));
add('plane-fill', fill({
  stem: 'The incident ray, the refracted ray and the normal at the point of incidence all lie in the same ___.',
  acc: [['plane']],
  sol: '**Plane** (first law of refraction).',
  d: 1, c: 'recall', t: [1],
}));
add('cause-short1', short({
  marks: 1,
  stem: 'Why does a beam of torchlight change direction when it passes slantwise from air into a pond?',
  model: 'Because the speed of light in water is less than in air.',
  sol: 'Change of speed.',
  scheme: [['Change in speed of light', 1]],
  d: 1, c: 'understanding', t: [1],
}));
add('undev-short2', short({
  marks: 2,
  stem: 'Ishaan says, “A ray of light always bends when it passes from one transparent medium into another.” State two situations that prove him wrong.',
  model: '(i) When the ray falls along the normal to the boundary (angle of incidence zero). (ii) When the two media have the same refractive index, so the speed of light does not change, for example a glass rod in a liquid of equal refractive index.',
  sol: 'Normal incidence; equal refractive indices.',
  scheme: [['Normal incidence', 1], ['Equal refractive index', 1]],
  d: 2, c: 'application', t: [1],
}));
const snell = sinD(45) / sinD(30);
add('laws-short2', short({
  marks: 2,
  stem: 'Riya sends a ray from air into a block of clear perspex at several angles of incidence. For each reading, sin i ÷ sin r comes to about 1.49, and the rays always stay on the drawing paper. State the two laws of refraction that her results illustrate.',
  model: '(1) The incident ray, the refracted ray and the normal at the point of incidence lie in one plane. (2) For a given pair of media and a given colour of light, sin i ÷ sin r is constant (Snell’s law); here the constant, about 1.49, is the refractive index of perspex.',
  sol: 'Two laws.',
  scheme: [['First law', 1], ['Second law (Snell’s law)', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('snell-num', num({
  stem: 'A ray of light in air meets the surface of a clear liquid at an angle of incidence of 45°. The angle of refraction is 30°. Calculate the refractive index of the liquid, to three significant figures. (sin 45° = 0.7071, sin 30° = 0.5)',
  value: Number(f(snell)), tol: 0.01,
  sol: r`$\mu = \dfrac{\sin i}{\sin r} = \dfrac{0.7071}{0.5} = 1.414$, about 1.41.`,
  scheme: [['1.41', 1]],
  d: 2, c: 'application', t: [1, 2],
}), () => near(snell, 1.414, 0.001) || 'mu');

// ---------------------------------------------------------------- t02 refractive index, v = f lambda
const muPlastic = c / 2e8;
add('speed-mcq', mcq({
  stem: 'Light travels at 2.0 × 10⁸ m/s in a sheet of acrylic. Taking the speed of light in air as 3.0 × 10⁸ m/s, the refractive index of the acrylic is:',
  right: f(muPlastic),
  wrong: ['0.667', '6.0', '1.33'],
  sol: `$\\mu = \\dfrac{c}{v} = \\dfrac{3.0 \\times 10^{8}}{2.0 \\times 10^{8}} = ${f(muPlastic)}$ — option (@K).`,
  d: 1, c: 'application', t: [2],
}), () => near(muPlastic, 1.5, 1e-9) || 'mu');
add('ruby-mcq', mcq({
  stem: 'A ray passes obliquely from turpentine (refractive index 1.47) into a ruby (refractive index 1.76). In the ruby, the ray:',
  right: 'slows down and bends towards the normal',
  wrong: ['speeds up and bends away from the normal', 'slows down and bends away from the normal', 'keeps the same speed and direction'],
  sol: 'Ruby has the larger refractive index, so it is optically denser: light slows and bends towards the normal — option (@K).',
  d: 2, c: 'application', t: [1, 2],
}));
const lamG = 600 / 1.5;
add('wave-mcq', mcq({
  stem: 'The orange-yellow glow of a lamp has a wavelength of 600 nm in air. Inside a glass slab with μ = 1.5, its wavelength becomes:',
  right: `${f(lamG)} nm`,
  wrong: ['900 nm', '600 nm', '300 nm'],
  sol: `Frequency is unchanged, so $\\lambda_{glass} = \\dfrac{\\lambda_{air}}{\\mu} = \\dfrac{600}{1.5} = ${f(lamG)}$ nm — option (@K).`,
  d: 3, c: 'application', t: [1, 2],
}), () => near(lamG, 400, 1e-9) || 'lambda');
add('kero-mcq', mcq({
  stem: 'Kerosene (refractive index 1.44) floats on water (refractive index 1.33). Which statement is correct?',
  right: 'Kerosene is optically denser than water even though its mass density is lower',
  wrong: ['Water is optically denser because it is heavier', 'Both are equally dense optically', 'Light travels faster in kerosene than in water'],
  sol: 'Optical density depends on refractive index, not on mass density — option (@K).',
  d: 3, c: 'analysis', t: [2],
}));
const tTime = 0.03 / (c / 1.5);
add('time-num', num({
  stem: 'A flash of light crosses a glass window pane 3.0 cm thick, along the normal. The refractive index of the glass is 1.5. How long does the light take to cross the pane? Give your answer in units of 10⁻¹⁰ s.',
  value: tTime / 1e-10, tol: 0.01, unit: '× 10⁻¹⁰ s',
  sol: r`$v = \dfrac{c}{\mu} = \dfrac{3 \times 10^{8}}{1.5} = 2 \times 10^{8}$ m/s; $t = \dfrac{0.03}{2 \times 10^{8}} = 1.5 \times 10^{-10}$ s, so in units of $10^{-10}$ s the time is $\dfrac{1.5 \times 10^{-10}}{10^{-10}} = 1.5$.`,
  scheme: [['Speed in glass', 0.5], ['1.5 (× 10⁻¹⁰ s)', 0.5]],
  d: 3, c: 'application', t: [2],
}), () => near(tTime, 1.5e-10, 1e-9) || 'time');
const muOil = 3 / 2.04;
add('oil-num', num({
  stem: 'In a sample of mustard oil, light travels at 2.04 × 10⁸ m/s. Find the refractive index of the oil, to three significant figures. (c = 3.0 × 10⁸ m/s)',
  value: Number(f(muOil)), tol: 0.01,
  sol: r`$\mu = \dfrac{c}{v} = \dfrac{3.0}{2.04} = 1.47$.`,
  scheme: [['1.47', 1]],
  d: 2, c: 'application', t: [2],
}), () => near(muOil, 1.4706, 0.001) || 'mu');
const fRed = c / 7.5e-7;
add('freq-num', num({
  stem: 'A red laser emits light of wavelength 7.5 × 10⁻⁷ m in air. Find its frequency in units of 10¹⁴ Hz. (c = 3.0 × 10⁸ m/s)',
  value: fRed / 1e14, tol: 0.01, unit: '× 10¹⁴ Hz',
  sol: r`$f = \dfrac{c}{\lambda} = \dfrac{3.0 \times 10^{8}}{7.5 \times 10^{-7}} = 4.0 \times 10^{14}$ Hz, so in units of $10^{14}$ Hz the frequency is $\dfrac{4.0 \times 10^{14}}{10^{14}} = 4$.`,
  scheme: [['4.0 (× 10¹⁴ Hz)', 1]],
  d: 2, c: 'application', t: [2],
}), () => near(fRed, 4e14, 1e-9) || 'f');
const relMu = 2.25 / 2.0;
add('rel-num', num({
  stem: 'The speed of light is 2.25 × 10⁸ m/s in the water of an aquarium and 2.0 × 10⁸ m/s in its glass wall. Find the refractive index of the glass with respect to the water, to three significant figures.',
  value: Number(f(relMu)), tol: 0.005,
  sol: r`$\,{}_{w}\mu_{g} = \dfrac{v_{water}}{v_{glass}} = \dfrac{2.25}{2.0} = 1.125$, about 1.13.`,
  scheme: [['1.13', 1]],
  d: 3, c: 'application', t: [2],
}), () => near(relMu, 1.125, 1e-9) || 'rel');
add('mu-fill', fill({
  stem: 'Refractive index has no ___ because it is the ratio of two speeds.',
  acc: [['unit', 'units']],
  sol: '**Unit**.',
  d: 1, c: 'recall', t: [2],
}));
add('mu-tf', tf({
  stem: 'The absolute refractive index of a transparent solid can be less than 1.',
  key: 'f',
  sol: 'False: light is slower in any material than in vacuum, so c/v is greater than 1.',
  d: 1, c: 'understanding', t: [2],
}));
add('colour-ar', ar({
  a: 'A green traffic light seen by a diver under water still looks green.',
  r: 'The frequency of light, which decides its colour, does not change on refraction.',
  key: 'c',
  sol: 'Both are true, and R explains A — option (c).',
  d: 2, c: 'understanding', t: [1, 2],
}));
add('mu-short1', short({
  marks: 1,
  stem: 'Write the relation between the refractive index μ of a medium, the speed of light c in vacuum and its speed v in the medium.',
  model: 'μ = c ÷ v (the ratio of the speed in vacuum to the speed in the medium).',
  sol: 'μ = c/v.',
  scheme: [['Relation', 1]],
  d: 1, c: 'recall', t: [2],
}));
const muDia = 3 / 1.24;
add('diamond-short2', short({
  marks: 2,
  stem: 'Light travels at 1.24 × 10⁸ m/s in diamond and at 2.0 × 10⁸ m/s in crown glass. (a) Calculate the refractive index of diamond. (b) Which of the two is optically denser? Give a reason.',
  model: `(a) $\\mu = \\dfrac{3.0 \\times 10^{8}}{1.24 \\times 10^{8}} \\approx ${f(muDia)}$. (b) Diamond, because light travels more slowly in it (its refractive index, about 2.42, is larger than that of glass, 1.5).`,
  sol: 'About 2.42; diamond.',
  scheme: [['(a) refractive index', 1], ['(b) diamond with reason', 1]],
  d: 2, c: 'application', t: [2],
}), () => near(muDia, 2.42, 0.002) || 'diamond');
const fG = 5.6e14;
const lamAir = c / fG;
const vW = c / (4 / 3);
const lamW = vW / fG;
add('wave-short3', short({
  marks: 3,
  stem: 'A green laser has a frequency of 5.6 × 10¹⁴ Hz. Its beam passes from air into water of refractive index 4/3. Calculate (a) the wavelength in air, (b) the speed of light in water, (c) the wavelength in water, each to three significant figures. (c = 3.0 × 10⁸ m/s)',
  model: `(a) $\\lambda = \\dfrac{c}{f} = \\dfrac{3.0 \\times 10^{8}}{5.6 \\times 10^{14}} \\approx 5.36 \\times 10^{-7}$ m (536 nm). (b) $v = \\dfrac{c}{\\mu} = 3.0 \\times 10^{8} \\times \\dfrac{3}{4} = 2.25 \\times 10^{8}$ m/s. (c) $\\lambda_{w} = \\dfrac{v}{f} = \\dfrac{2.25 \\times 10^{8}}{5.6 \\times 10^{14}} \\approx 4.02 \\times 10^{-7}$ m (402 nm); the frequency is unchanged.`,
  sol: '536 nm; 2.25 × 10⁸ m/s; 402 nm.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 3, c: 'application', t: [1, 2],
}), () => (near(lamAir, 5.357e-7, 0.001) && near(vW, 2.25e8, 1e-9) && near(lamW, 4.018e-7, 0.001)) || 'wave');

// ---------------------------------------------------------------- t03 glass block, lateral displacement, thick mirror
const rBlock = asinD(sinD(40) / 1.5);
add('slab-mcq', mcq({
  stem: 'A ray strikes one face of a parallel-sided glass block at an angle of incidence of 40°. Inside the glass it travels at about 25° to the normal. The ray leaving the opposite face makes with the normal an angle of:',
  right: '40°',
  wrong: [`${Math.round(rBlock)}°`, '0°', '50°'],
  sol: `The faces are parallel, so the ray meets the second face at ${Math.round(rBlock)}° and leaves at the original angle, 40° — option (@K).`,
  d: 2, c: 'application', t: [3],
}), () => (Math.round(rBlock) === 25) || 'r');
add('lateral-mcq', mcq({
  stem: 'Which change makes the lateral displacement of a ray passing through a glass block larger?',
  right: 'Using a thicker block of the same glass, at the same angle of incidence',
  wrong: ['Making the angle of incidence zero', 'Using a block of glass of lower refractive index', 'Moving the light source farther away along the same ray'],
  sol: 'Lateral displacement grows with thickness, angle of incidence and refractive index; it is zero at normal incidence — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('thick-mcq', mcq({
  stem: 'A candle flame is viewed obliquely in a thick plane mirror silvered at the back, and a row of images is seen. The brightest image is formed by:',
  right: 'reflection at the silvered back surface',
  wrong: ['reflection at the front glass surface', 'the last of the repeated reflections inside the glass', 'none — all the images are equally bright'],
  sol: 'Most of the light enters the glass and is reflected strongly by the silvering, giving the second (brightest) image — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('lateral-tf', tf({
  stem: 'A ray that falls normally on a rectangular glass block has zero lateral displacement.',
  key: 't',
  sol: 'True: it passes straight through without any sideways shift.',
  d: 1, c: 'understanding', t: [3],
}));
add('lateral-fill', fill({
  stem: 'The perpendicular distance between the incident ray produced and the emergent ray of a glass block is called the lateral ___.',
  acc: [['displacement', 'shift']],
  sol: '**Displacement** (lateral shift).',
  d: 1, c: 'recall', t: [3],
}));
add('thick-ar', ar({
  a: 'A thick plane mirror silvered at the back forms several images of a bright object.',
  r: 'Light undergoes repeated partial reflection and refraction between the front glass surface and the silvered back.',
  key: 'c',
  sol: 'Both are true, and R explains A — option (c).',
  d: 2, c: 'understanding', t: [3],
}));
const rSana = asinD(sinD(50) / 1.5);
add('block-short2', short({
  marks: 2,
  stem: 'Sana traces a ray through a glass block of refractive index 1.5 with an angle of incidence of 50° and measures the angle of refraction as 31°. (a) What angle does the emergent ray make with the normal at the far face? (b) Name the three factors on which the lateral displacement depends.',
  model: '(a) 50°, equal to the angle of incidence, because the two faces of the block are parallel. (b) The thickness of the block, the angle of incidence and the refractive index of the glass.',
  sol: '50°; thickness, i, μ.',
  scheme: [['(a)', 1], ['(b)', 1]],
  d: 2, c: 'application', t: [3],
}), () => (Math.abs(rSana - 31) < 0.5) || 'r');
add('thick-short2', short({
  marks: 2,
  stem: 'Ananya looks obliquely at a lamp in a thick bathroom mirror and sees a faint image, then a bright image, then fainter ones. Explain how the first two images are formed.',
  model: 'The first, faint image comes from the small fraction of light reflected straight off the front glass surface. The second, brightest image comes from the light that enters the glass, is reflected by the silvered back and refracts out again; most of the light follows this path.',
  sol: 'Front surface; silvered back.',
  scheme: [['First image', 1], ['Second, brightest image', 1]],
  d: 2, c: 'understanding', t: [3],
}));

// ---------------------------------------------------------------- t04 real and apparent depth
const appK = 7.2 / 1.44;
add('depth-mcq', mcq({
  stem: 'A ring dropped into a beaker of kerosene (refractive index 1.44) lies 7.2 cm below the surface. Seen from directly above, it appears to be at a depth of:',
  right: `${f(appK, 2)} cm`,
  wrong: ['10.4 cm', '2.2 cm', '7.2 cm'],
  sol: `$\\text{apparent depth} = \\dfrac{7.2}{1.44} = ${f(appK)}$ cm — option (@K).`,
  d: 2, c: 'application', t: [4],
}), () => near(appK, 5, 1e-9) || 'depth');
const shiftS = 6 * (1 - 1 / 1.5);
add('shift-num', num({
  stem: 'A glass paperweight 6.0 cm thick (refractive index 1.5) rests on a printed page. By how many centimetres does the print appear to be raised when viewed from directly above?',
  value: shiftS, tol: 0.01, unit: 'cm',
  sol: r`Apparent depth $= \dfrac{6.0}{1.5} = 4.0$ cm; shift $= 6.0 - 4.0 = 2.0$ cm.`,
  scheme: [['2.0 cm', 1]],
  d: 2, c: 'application', t: [4],
}), () => near(shiftS, 2, 1e-9) || 'shift');
const realW = 0.9 * (4 / 3);
add('real-num', num({
  stem: 'A water tank looks 0.9 m deep when seen from directly above. Taking the refractive index of water as 4/3, find its real depth in metres.',
  value: realW, tol: 0.01, unit: 'm',
  sol: r`Real depth $= \mu \times \text{apparent depth} = \dfrac{4}{3} \times 0.9 = 1.2$ m.`,
  scheme: [['1.2 m', 1]],
  d: 2, c: 'application', t: [4],
}), () => near(realW, 1.2, 1e-9) || 'real');
const muBlock = 4.5 / 3.0;
add('mublock-num', num({
  stem: 'A travelling microscope is focused on a cross mark. A glass block 4.5 cm thick is placed over the mark, and the microscope must be raised by 1.5 cm to focus on the mark again. Find the refractive index of the glass.',
  value: muBlock, tol: 0.01,
  sol: r`Apparent depth $= 4.5 - 1.5 = 3.0$ cm; $\mu = \dfrac{\text{real depth}}{\text{apparent depth}} = \dfrac{4.5}{3.0} = 1.5$.`,
  scheme: [['Apparent depth', 0.5], ['1.5', 0.5]],
  d: 4, c: 'analysis', t: [4],
}), () => near(muBlock, 1.5, 1e-9) || 'mu');
add('stick-mcq', mcq({
  stem: 'Kabir holds a straight steel ruler slantwise in a bucket of water. Looking from above, he sees that the part of the ruler under water:',
  right: 'appears raised, so the ruler looks bent upwards at the water surface',
  wrong: ['appears lowered, so the ruler looks bent downwards', 'looks exactly in line with the part in air', 'cannot be seen at all'],
  sol: 'Every point under water appears raised, so the immersed part looks lifted and the ruler looks bent at the surface — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('depth-tf', tf({
  stem: 'A coin at the bottom of a bucket of water, seen from directly above, appears deeper than it really is.',
  key: 'f',
  sol: 'False: it appears raised; apparent depth = real depth ÷ μ is less than the real depth.',
  d: 1, c: 'understanding', t: [4],
}));
add('depth-fill', fill({
  stem: 'Refractive index of water = real depth ÷ ___ depth.',
  acc: [['apparent']],
  sol: '**Apparent**.',
  d: 1, c: 'recall', t: [4],
}));
add('fish-ar', ar({
  a: 'A fish in a pond appears to a boy on the bank to be nearer the surface than it actually is.',
  r: 'Light from the fish bends towards the normal as it comes out of the water into air.',
  key: 'a',
  sol: 'A is true; R is false — light leaving water bends away from the normal — option (a).',
  d: 2, c: 'analysis', t: [4],
}));
add('oblique-short1', short({
  marks: 1,
  stem: 'A coin in a pool is first viewed from directly above and then from a slant. In which case does it appear nearer the surface?',
  model: 'When viewed from a slant (obliquely): the apparent rise is larger.',
  sol: 'Oblique viewing.',
  scheme: [['Oblique viewing', 1]],
  d: 3, c: 'application', t: [4],
}));
add('pool-short2', short({
  marks: 2,
  stem: 'A lifeguard warns children that a swimming pool is deeper than it looks. Explain, in terms of refraction, why the pool looks shallower than it is.',
  model: 'Light from the floor of the pool bends away from the normal as it passes from water into air. The eye follows the emergent rays back in straight lines, and they appear to come from a point above the floor. So the floor appears raised and the pool looks shallower.',
  sol: 'Bending away from normal; image raised.',
  scheme: [['Bending away from the normal at the surface', 1], ['Rays traced back meet above the floor', 1]],
  d: 2, c: 'understanding', t: [4],
}));
const app16 = 16 / (4 / 3);
const app16b = 16 / 1.6;
add('depth-short3', short({
  marks: 3,
  stem: 'A glass beaker contains water (refractive index 4/3) to a depth of 16 cm, with a small bead at the bottom. (a) Find the apparent depth of the bead. (b) By how much does the bead appear raised? (c) The water is replaced by a liquid of refractive index 1.6 to the same depth. What is the new apparent depth?',
  model: `(a) $\\dfrac{16}{4/3} = ${f(app16)}$ cm. (b) $16 - ${f(app16)} = ${f(16 - app16)}$ cm. (c) $\\dfrac{16}{1.6} = ${f(app16b)}$ cm — the denser liquid makes the bead look even nearer.`,
  sol: '12 cm; 4 cm; 10 cm.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 2, c: 'application', t: [4],
}), () => (near(app16, 12, 1e-9) && near(app16b, 10, 1e-9)) || 'depths');

// ---------------------------------------------------------------- t05 prism and deviation
add('prism-mcq', mcq({
  stem: 'A narrow beam of red laser light passes through a glass prism standing on its base. Compared with the incident beam, the emergent beam is:',
  right: 'turned towards the base of the prism',
  wrong: ['turned towards the apex of the prism', 'parallel to the incident beam but shifted', 'reflected back towards the laser'],
  sol: 'Refraction at both inclined faces turns the ray towards the base — option (@K).',
  d: 1, c: 'understanding', t: [5],
}));
const devQ = 55 + 46 - 60;
add('dev-num', num({
  stem: 'In a prism experiment with a prism of angle 60°, Tanvi measures the angle of incidence as 55° and the angle of emergence as 46°. Find the angle of deviation, in degrees.',
  value: devQ, tol: 0, unit: '°',
  sol: r`$\delta = i + e - A = 55 + 46 - 60 = 41$, so the deviation is $41^\circ$.`,
  scheme: [['41°', 1]],
  d: 2, c: 'application', t: [5],
}), () => devQ === 41 || 'dev');
const r2Q = 60 - 28;
add('r2-num', num({
  stem: 'A ray enters an equilateral glass prism (angle 60°). The angle of refraction at the first face is 28°. Find the angle at which the ray meets the second face inside the prism, in degrees.',
  value: r2Q, tol: 0, unit: '°',
  sol: r`$r_{1} + r_{2} = A$, so $r_{2} = 60 - 28 = 32$, that is $32^\circ$.`,
  scheme: [['32°', 1]],
  d: 2, c: 'application', t: [5],
}), () => r2Q === 32 || 'r2');
add('devfactor-mcq', mcq({
  stem: 'The angle of deviation produced by a glass prism does NOT depend on:',
  right: 'how far the light source is from the prism',
  wrong: ['the angle of incidence', 'the refractive index of the glass', 'the angle of the prism'],
  sol: 'Deviation depends on i, A, the material and the colour of light, not on the distance of the source — option (@K).',
  d: 2, c: 'understanding', t: [5],
}));
add('min-tf', tf({
  stem: 'As the angle of incidence on a prism is slowly increased from a small value, the angle of deviation first decreases and then increases.',
  key: 't',
  sol: 'True: deviation passes through a minimum value.',
  d: 3, c: 'understanding', t: [5],
}));
add('dev-fill', fill({
  stem: 'The angle between the incident ray produced and the emergent ray of a prism is called the angle of ___.',
  acc: [['deviation']],
  sol: '**Deviation**.',
  d: 1, c: 'recall', t: [5],
}));
add('glassair-ar', ar({
  a: 'When light passes from the glass of a prism back into air, its speed decreases.',
  r: 'Glass is optically denser than air.',
  key: 'b',
  sol: 'A is false — light speeds up on entering air; R is true — option (b).',
  d: 2, c: 'understanding', t: [1, 5],
}));
add('devfactors-short2', short({
  marks: 2,
  stem: 'Rohan says the deviation produced by his prism “depends only on the angle of the prism”. Name four factors on which it actually depends.',
  model: 'The angle of incidence, the angle of the prism, the refractive index of the material of the prism, and the colour (wavelength) of the light used.',
  sol: 'i, A, μ, colour.',
  scheme: [['Any two factors', 1], ['Other two factors', 1]],
  d: 2, c: 'recall', t: [5],
}));

// ---------------------------------------------------------------- t06 critical angle, TIR, totally reflecting prisms
add('crit-mcq', mcq({
  stem: 'The critical angle for a certain glass–air surface is 42°. A ray inside the glass meets this surface at an angle of incidence of 50°. The ray:',
  right: 'is totally reflected back into the glass',
  wrong: ['passes into air, bending away from the normal', 'passes into air without bending', 'grazes along the surface'],
  sol: 'Glass to air and 50° > 42°, so total internal reflection occurs — option (@K).',
  d: 2, c: 'application', t: [6],
}));
const Cw = asinD(3 / 4);
add('critw-num', num({
  stem: 'Calculate the critical angle for light going from water (refractive index 4/3) into air, correct to one decimal place, in degrees.',
  value: Number(Cw.toFixed(1)), tol: 0.1, unit: '°',
  sol: r`$\sin C = \dfrac{1}{\mu} = \dfrac{3}{4} = 0.75$; $C = \sin^{-1}(0.75) = 48.6$, that is $48.6^\circ$.`,
  scheme: [['48.6°', 1]],
  d: 2, c: 'application', t: [6],
}), () => near(Cw, 48.59, 0.001) || 'C');
const muPipe = 1 / sinD(40);
add('pipe-num', num({
  stem: 'A plastic used to make a decorative light pipe has a critical angle of 40° with air. Find its refractive index, to three significant figures. (sin 40° = 0.643)',
  value: Number(f(muPipe)), tol: 0.01,
  sol: r`$\mu = \dfrac{1}{\sin C} = \dfrac{1}{0.643} = 1.556$, about 1.56.`,
  scheme: [['1.56', 1]],
  d: 2, c: 'application', t: [6],
}), () => near(muPipe, 1.556, 0.001) || 'mu');
add('tircond-mcq', mcq({
  stem: 'Total internal reflection can take place when light travels:',
  right: 'from glass towards air, at an angle of incidence greater than the critical angle',
  wrong: ['from air towards glass, at any angle of incidence', 'from glass towards air, at an angle smaller than the critical angle', 'from air towards water, at an angle greater than the critical angle'],
  sol: 'Both conditions: denser to rarer, and i greater than C — option (@K).',
  d: 1, c: 'understanding', t: [6],
}));
add('p90-mcq', mcq({
  stem: 'Light enters one of the shorter faces of a right-angled isosceles glass prism along the normal. After total internal reflection at the hypotenuse face, it is turned through:',
  right: '90°',
  wrong: ['45°', '180°', '60°'],
  sol: 'It meets the hypotenuse at 45° (> 42°), is totally reflected and leaves the other short face at right angles to its original direction — option (@K).',
  d: 2, c: 'application', t: [6],
}));
add('p180-mcq', mcq({
  stem: 'A cycle reflector contains tiny right-angled isosceles prisms. Light enters through the hypotenuse face along the normal. It comes out:',
  right: 'travelling back in the direction it came from, turned through 180°',
  wrong: ['turned through 90°', 'without any change in direction', 'spread out into colours, turned through 45°'],
  sol: 'Two total internal reflections, each at 45°, reverse the ray — option (@K).',
  d: 3, c: 'application', t: [6],
}));
const Cd = asinD(1 / 2.42);
add('dia-mcq', mcq({
  stem: 'Diamond (refractive index 2.42) sparkles far more than glass (refractive index 1.5) cut in the same shape, because diamond has:',
  right: `a much smaller critical angle (about ${Math.round(Cd)}°), so light is trapped and totally reflected many times inside it`,
  wrong: ['a larger critical angle, so more light escapes at once', 'a silvered back surface', 'a lower refractive index, so light travels faster in it'],
  sol: `$\\sin C = \\dfrac{1}{2.42} = 0.413$, so $C \\approx ${Math.round(Cd)}^\\circ$, much smaller than about $42^\\circ$ for glass — option (@K).`,
  d: 3, c: 'analysis', t: [6],
}), () => Math.round(Cd) === 24 || 'Cd');
add('tir-tf', tf({
  stem: 'A totally reflecting prism reflects practically all the light falling on it, while a silvered plane mirror absorbs a small part of it.',
  key: 't',
  sol: 'True: this is one advantage of the prism.',
  d: 2, c: 'understanding', t: [6],
}));
add('crit-fill', fill({
  stem: 'The angle of incidence in the denser medium for which the angle of refraction in the rarer medium is 90° is called the ___ angle.',
  acc: [['critical']],
  sol: '**Critical**.',
  d: 1, c: 'recall', t: [6],
}));
add('airtir-ar', ar({
  a: 'Total internal reflection cannot occur when light passes from air into water.',
  r: 'A ray entering an optically denser medium bends towards the normal, so the angle of refraction never reaches 90°.',
  key: 'c',
  sol: 'Both are true, and R explains A — option (c).',
  d: 3, c: 'analysis', t: [6],
}));
add('tirname-short1', short({
  marks: 1,
  stem: 'Name the phenomenon that lets a 45°–45°–90° glass prism act as a perfect reflector in a periscope.',
  model: 'Total internal reflection.',
  sol: 'TIR.',
  scheme: [['Total internal reflection', 1]],
  d: 1, c: 'recall', t: [6],
}));
add('adv-short2', short({
  marks: 2,
  stem: 'A periscope for a school model submarine can be built with two plane mirrors or two right-angled isosceles prisms. Give two reasons why the prisms are the better choice.',
  model: 'Prisms reflect all the incident light by total internal reflection, so the image is brighter; a thick mirror also gives faint extra images, while a prism gives only one. A prism has no silver coating, so it does not tarnish or peel with age.',
  sol: 'Brighter, single image, no silvering.',
  scheme: [['First reason', 1], ['Second reason', 1]],
  d: 2, c: 'evaluation', t: [6],
}));
const e30 = asinD(1.5 * 0.5);
const Cg = asinD(1 / 1.5);
add('crit-short3', short({
  marks: 3,
  stem: 'Inside a glass block (refractive index 1.5), rays meet the glass–air surface at angles of incidence of (a) 30°, (b) 41.8° and (c) 60°. State what happens to each ray, with a calculation for (a). (sin 30° = 0.5; the critical angle of the glass is 41.8°)',
  model: `(a) $\\sin e = 1.5 \\times 0.5 = 0.75$, so the ray passes into air at about ${f(e30)}° from the normal, bending away from it (a little light is also reflected). (b) 41.8° is the critical angle: the refracted ray grazes along the surface (angle of refraction 90°). (c) 60° is more than the critical angle, so the ray is totally internally reflected back into the glass.`,
  sol: 'Refracted at 48.6°; grazes; TIR.',
  scheme: [['(a) with calculation', 1], ['(b)', 1], ['(c)', 1]],
  d: 3, c: 'analysis', t: [6],
}), () => (near(e30, 48.59, 0.001) && near(Cg, 41.81, 0.001)) || 'angles');

// ---------------------------------------------------------------- match items
add('value-match', match({
  marks: 2,
  stem: 'Pair each optical quantity in Column A with its typical value in Column B.',
  pairs: [
    ['Refractive index of water', '1.33'],
    ['Refractive index of diamond', '2.42'],
    ['Critical angle of crown glass', 'About 42°'],
    ['Critical angle of diamond', 'About 24°'],
  ],
  order: [2, 0, 3, 1],
  sol: 'Water → 1.33; diamond → 2.42; crown glass → about 42°; diamond → about 24°.',
  d: 1, c: 'recall', t: [2, 6],
}));
add('effect-match', match({
  marks: 2,
  stem: 'For each everyday sight in Column A, choose its cause from Column B.',
  pairs: [
    ['A swimming pool looks shallower than it is', 'Refraction at the water surface'],
    ['A thick mirror shows several images of a flame', 'Repeated partial reflection inside the glass'],
    ['A prism in a periscope turns light through 90°', 'Total internal reflection'],
    ['The ray leaving a glass block is parallel to the incident ray', 'Refraction at two parallel faces'],
  ],
  order: [1, 3, 0, 2],
  sol: 'Pool → refraction at the surface; thick mirror → repeated partial reflection; periscope prism → TIR; glass block → two parallel faces.',
  d: 2, c: 'application', t: [3, 4, 6],
}));

// ---------------------------------------------------------------- 10-mark structured questions
const vL = c / 1.6;
const lamL = 5.0e-7 / 1.6;
add('laws-long', long({
  stem: '(a) Write down the laws that govern the bending of light at a boundary, and define the absolute refractive index of a medium. [3]\n\n(b) Light of wavelength 5.0 × 10⁻⁷ m in air enters a flint glass of refractive index 1.6. Calculate (i) the speed of light in the glass, (ii) its wavelength in the glass, and (iii) its frequency. (c = 3.0 × 10⁸ m/s) [3]\n\n(c) (i) Which of the three quantities in (b) is the same in air and in glass? Why? (ii) Does the colour of the light change in the glass? (iii) State two conditions under which a ray passes from one medium to another without bending. [4]',
  model: `(a) (1) The incident ray, the refracted ray and the normal at the point of incidence lie in the same plane. (2) For a given pair of media and colour, sin i ÷ sin r is a constant (Snell’s law). Absolute refractive index: speed of light in vacuum ÷ speed of light in the medium.\n\n(b) (i) $v = \\dfrac{3.0 \\times 10^{8}}{1.6} = ${f(vL / 1e8, 4)} \\times 10^{8}$ m/s. (ii) $\\lambda = \\dfrac{5.0 \\times 10^{-7}}{1.6} \\approx 3.1 \\times 10^{-7}$ m. (iii) $f = \\dfrac{3.0 \\times 10^{8}}{5.0 \\times 10^{-7}} = 6.0 \\times 10^{14}$ Hz.\n\n(c) (i) The frequency: it is set by the source. (ii) No: colour depends on frequency, which does not change. (iii) When the ray falls along the normal; when the two media have equal refractive indices.`,
  sol: 'Laws and definition; three calculations; frequency, colour and two conditions.',
  scheme: [['(a) two laws', 2], ['(a) definition', 1], ['(b)(i)', 1], ['(b)(ii)', 1], ['(b)(iii)', 1], ['(c)(i)', 1], ['(c)(ii)', 1], ['(c)(iii)', 2]],
  d: 3, c: 'application', t: [1, 2],
}), () => (near(vL, 1.875e8, 1e-9) && near(lamL, 3.125e-7, 1e-9)) || 'flint');
add('block-long', long({
  stem: '(a) Describe, as you would draw it, the path of a ray of light falling obliquely on a rectangular glass block, marking the angle of incidence, the angle of refraction, the angle of emergence and the lateral displacement. [3]\n\n(b) A ray strikes a glass block (refractive index 1.5) at an angle of incidence of 60°. (i) Find the sine of the angle of refraction, and the angle. (ii) State the angle of emergence. (sin 60° = 0.866) [3]\n\n(c) (i) Name the factors on which lateral displacement depends. (ii) Explain how a thick plane mirror forms more than one image of a candle, and which image is the brightest. [4]',
  model: `(a) The ray bends towards the normal on entering the block (angle of refraction smaller than the angle of incidence) and away from the normal on leaving it at the opposite face. The emergent ray is parallel to the incident ray. The lateral displacement is the perpendicular distance between the incident ray produced (dotted) and the emergent ray; normals are drawn at both points.\n\n(b) (i) $\\sin r = \\dfrac{0.866}{1.5} = 0.577$, so $r \\approx ${f(asinD(0.866 / 1.5))}^\\circ$. (ii) $60^\\circ$, the same as the angle of incidence, because the faces are parallel.\n\n(c) (i) Thickness of the block, angle of incidence, refractive index (colour of light). (ii) Some light reflects from the front glass surface, giving a faint image; most enters the glass, reflects at the silvered back and comes out, giving the brightest image; repeated reflections inside the glass give further, fainter images.`,
  sol: 'Ray path; Snell’s law and e = i; factors and thick mirror.',
  scheme: [['(a) path and angles', 2], ['(a) lateral displacement', 1], ['(b)(i)', 2], ['(b)(ii)', 1], ['(c)(i)', 1], ['(c)(ii) images', 2], ['(c)(ii) brightest', 1]],
  d: 3, c: 'application', t: [3],
}), () => near(asinD(0.866 / 1.5), 35.26, 0.001) || 'r');
const realL = 2.0;
const appL = realL / (4 / 3);
const muL = 20 / 15;
add('depth-long', long({
  stem: '(a) Define real depth and apparent depth, and write the relation between them and the refractive index. [3]\n\n(b) A pond is 2.0 m deep and the refractive index of water is 4/3. (i) How deep does the pond appear from directly above? (ii) By how much is its floor raised? (iii) A boy who is 1.5 m tall plans to wade across it because it looks shallow. Is this safe? [3]\n\n(c) A vessel holds a liquid 20 cm deep, and a mark on its floor appears 15 cm below the surface. (i) Find the refractive index of the liquid. (ii) Explain why a pencil dipped slantwise into the liquid looks bent. (iii) How would the apparent depth change if the mark were viewed at a slant? [4]',
  model: `(a) Real depth: actual depth of an object below the surface. Apparent depth: the depth at which it appears when seen from the rarer medium. $\\mu = \\dfrac{\\text{real depth}}{\\text{apparent depth}}$ (for viewing from directly above).\n\n(b) (i) $\\dfrac{2.0}{4/3} = ${f(appL)}$ m. (ii) $2.0 - 1.5 = 0.5$ m. (iii) No: the real depth, 2.0 m, is more than his height.\n\n(c) (i) $\\mu = \\dfrac{20}{15} = ${f(muL)}$. (ii) Each point of the immersed part appears raised (light bends away from the normal as it leaves the liquid), so the immersed part seems lifted and the pencil looks bent at the surface. (iii) It would appear even smaller: the mark looks still nearer the surface.`,
  sol: 'Definitions; pond; liquid.',
  scheme: [['(a) definitions', 2], ['(a) relation', 1], ['(b)(i)', 1], ['(b)(ii)', 1], ['(b)(iii)', 1], ['(c)(i)', 2], ['(c)(ii)', 1], ['(c)(iii)', 1]],
  d: 3, c: 'evaluation', t: [4],
}), () => (near(appL, 1.5, 1e-9) && near(muL, 1.333, 0.001)) || 'depth');
const Cg2 = asinD(1 / 1.5);
add('tir-long', long({
  stem: '(a) What is meant by the critical angle? State the two conditions necessary for total internal reflection. [3]\n\n(b) (i) Calculate the critical angle for a glass of refractive index 1.5. (ii) The critical angle of a certain liquid is 45°. Find its refractive index. (sin 45° = 0.7071) [3]\n\n(c) (i) Describe, as you would draw it, how a right-angled isosceles prism turns a ray through 180°. (ii) Why is total reflection possible inside such a glass prism? (iii) Give two advantages of using such a prism instead of a plane mirror. [4]',
  model: `(a) The critical angle is the angle of incidence in the denser medium for which the angle of refraction in the rarer medium is 90°. Conditions: light travels from an optically denser to a rarer medium; the angle of incidence exceeds the critical angle.\n\n(b) (i) $\\sin C = \\dfrac{1}{1.5} = 0.667$, so $C \\approx ${f(Cg2)}^\\circ$. (ii) $\\mu = \\dfrac{1}{0.7071} = 1.414$.\n\n(c) (i) The ray enters the hypotenuse face along the normal (undeviated), meets one short face at 45°, is totally reflected to the other short face, meets it at 45°, is totally reflected again, and leaves the hypotenuse face along the normal, travelling back parallel to its original path. (ii) The angle of incidence, 45°, is greater than the critical angle of glass (about 42°). (iii) All the light is reflected, so the image is brighter; only one image is formed; there is no silvering to fade.`,
  sol: 'Definition and conditions; two calculations; 180° prism and advantages.',
  scheme: [['(a) definition', 1], ['(a) two conditions', 2], ['(b)(i)', 2], ['(b)(ii)', 1], ['(c)(i)', 2], ['(c)(ii)', 1], ['(c)(iii)', 1]],
  d: 3, c: 'application', t: [6],
}), () => (near(Cg2, 41.81, 0.001) && near(1 / 0.7071, 1.414, 0.001)) || 'C');
const PL = (() => {
  const n = 1.5;
  const i = 48;
  const r1 = asinD(sinD(i) / n);
  const r2 = 60 - r1;
  const e = asinD(n * sinD(r2));
  return { r1, r2, e, dev: i + e - 60 };
})();
add('prism-long', long({
  stem: '(a) Describe, as you would draw it, the path of a ray of monochromatic light through a triangular glass prism, marking the angle of deviation. [3]\n\n(b) A ray falls at 48° on one face of an equilateral glass prism (refractive index 1.5). (i) Find the angle of refraction at the first face. (ii) Find the angle of incidence at the second face. (iii) The ray emerges at 49.2°; find the angle of deviation. (sin 48° = 0.743) [3]\n\n(c) (i) Name two factors other than the angle of incidence on which the deviation depends. (ii) In (b), the ray inside the prism is almost parallel to the base. What does this tell you about the deviation? (iii) Give one way in which a prism differs from a glass block in its effect on a ray. [4]',
  model: `(a) The ray bends towards the normal at the first face and away from the normal at the second face, so it is turned towards the base. The angle of deviation is the angle between the incident ray produced forward and the emergent ray produced backward.\n\n(b) (i) $\\sin r_{1} = \\dfrac{0.743}{1.5} = 0.495$, so $r_{1} \\approx ${f(PL.r1)}^\\circ$. (ii) $r_{2} = 60 - ${f(PL.r1)} = ${f(PL.r2)}$, that is about $${f(PL.r2)}^\\circ$. (iii) $\\delta = i + e - A = 48 + 49.2 - 60 = 37.2$, that is $37.2^\\circ$.\n\n(c) (i) The angle of the prism; the refractive index of the glass (also the colour of light). (ii) The ray passes symmetrically, so the deviation is (nearly) the minimum deviation. (iii) A glass block gives an emergent ray parallel to the incident ray; a prism deviates the ray towards its base.`,
  sol: 'Ray path; angles and deviation; factors.',
  scheme: [['(a) path', 2], ['(a) deviation marked', 1], ['(b)(i)', 1], ['(b)(ii)', 1], ['(b)(iii)', 1], ['(c)(i)', 2], ['(c)(ii)', 1], ['(c)(iii)', 1]],
  d: 4, c: 'analysis', t: [5],
}), () => (near(PL.r1, 29.7, 0.002) && near(PL.e, 49.2, 0.002) && near(PL.dev, 37.2, 0.002)) || `prism ${PL.r1} ${PL.e} ${PL.dev}`);
