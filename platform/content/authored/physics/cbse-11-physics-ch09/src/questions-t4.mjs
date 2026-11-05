// ch09 question bank, part 3: t04 (surface tension, surface energy, angle of contact, excess pressure, capillary rise). g = 9.8 m s⁻² where used.
import { mk, add, r, dec, near } from '../../cbse-11-physics-ch01/src/lib.mjs';
import { g, capHeight, integ, root, deriv } from './phys.mjs';

const { mcq, ar, tf, fill, num, short } = mk;
const v3 = (x) => Number(dec(x, 3));

add('tension-mcq', mcq({
  stem: 'A small drop of mercury placed on a smooth table in a laboratory forms a nearly spherical bead. The main reason is that',
  right: 'surface tension tends to make the surface area of the drop as small as possible',
  wrong: ['gravity does not act on small drops', 'the viscosity of mercury is very large', 'the air under the drop pushes it into a sphere'],
  sol: 'A liquid surface has energy proportional to its area, so a free drop takes the shape with the least area for its volume, a sphere. Gravity only flattens large drops — option (@K).',
  d: 1, c: 'understanding', t: [4],
}));
add('bubble-mcq', mcq({
  stem: 'A soap bubble of radius R blown from a soap solution has an excess pressure ΔP inside it. A bubble of radius R/2 blown from the same solution has an excess pressure',
  right: '2ΔP',
  wrong: ['ΔP/2', '4ΔP', 'ΔP'],
  sol: 'For a soap bubble ΔP = 4S/R, inversely proportional to the radius. Halving R doubles ΔP — option (@K).',
  d: 3, c: 'application', t: [4],
}));
const cp = { h1: 6.0, k: 3 };
cp.h2 = cp.h1 * cp.k;
add('cap-mcq', mcq({
  stem: 'Water rises by 6.0 cm in a clean glass capillary tube dipped in a beaker. In another clean glass tube of one-third the radius, dipped in the same water, the rise is',
  right: `${cp.h2} cm`,
  wrong: [`${cp.h1 / cp.k} cm`, `${cp.h1} cm`, `${cp.h1 * cp.k * cp.k} cm`],
  sol: `h = 2S cos θ/(ρ g r) ∝ 1/r, so one-third the radius gives three times the rise: 3 × 6.0 = ${cp.h2} cm — option (@K).`,
  d: 2, c: 'application', t: [4],
}), () => cp.h2 === 18 || 'cp');
add('contact-mcq', mcq({
  stem: 'Which liquid–solid pair has an obtuse angle of contact, so that the liquid surface is convex at the wall of a narrow glass tube?',
  right: 'mercury and glass',
  wrong: ['water and clean glass', 'kerosene and glass', 'alcohol and glass'],
  sol: 'Mercury does not wet glass: its angle of contact (about 140°) exceeds 90°, giving a convex meniscus and a depression. Water, kerosene and alcohol all wet clean glass (acute angle, concave meniscus) — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('merge-mcq', mcq({
  stem: 'Eight identical drops of water, each of radius r, merge into a single big drop. Compared with the total surface energy of the eight drops, the surface energy of the big drop is',
  right: 'half as much',
  wrong: ['twice as much', 'the same', 'one quarter as much'],
  sol: 'Volume is conserved, so the big drop has radius 2r. Eight drops have area 8 × 4πr² = 32πr²; the big drop has 4π(2r)² = 16πr², half as much, so its surface energy S × area is half — option (@K). The difference is released as heat.',
  d: 3, c: 'application', t: [4],
}));
add('cap-ar', ar({
  a: 'Water rises higher in a thin capillary tube than in a wide one.',
  r: 'The angle of contact between water and clean glass is acute, so the water wets the glass.',
  key: 'b',
  sol: 'Both are true, but R explains why water rises at all, not why it rises higher in a thinner tube; that comes from h ∝ 1/r — option (b).',
  d: 3, c: 'understanding', t: [4],
}));
add('soap-tf', tf({
  stem: 'A soap bubble in air has an excess pressure twice that of a liquid drop of the same radius and surface tension.',
  key: 't',
  sol: 'True. A drop has one surface and ΔP = 2S/R; a soap bubble has two surfaces (inside and outside the film), so ΔP = 4S/R, twice as large for the same S and R.',
  d: 2, c: 'understanding', t: [4],
}));
add('contact-fill', fill({
  stem: 'The angle of contact between mercury and clean glass is ___ than 90°, so mercury does not wet glass.',
  acc: [['greater', 'larger', 'more']],
  sol: 'Mercury has an obtuse angle of contact, **greater** than 90° (about 140°).',
  d: 1, c: 'recall', t: [4],
}));
const fl = { S: 0.025, l: 0.10 };
fl.F = Number((2 * fl.S * fl.l).toPrecision(6));
fl.mN = Number((fl.F * 1000).toPrecision(6));
add('film-num', num({
  stem: 'A soap film is stretched across a U-shaped wire frame in a Bhopal school laboratory, with a light slider of length 10 cm held against the film. The soap solution has surface tension 0.025 N m⁻¹. Find the force needed to hold the slider in place, in mN.',
  value: fl.mN, tol: 0.05, unit: 'mN',
  sol: r`The film has two surfaces, so $F = 2Sl = 2 \times 0.025 \times 0.10 = ${fl.F}$ N $= ${fl.mN}$ mN.`,
  scheme: [[`F = 2Sl = 2 × 0.025 × 0.10 = ${fl.F} N = ${fl.mN} mN`, 1]],
  d: 2, c: 'application', t: [4],
}), (q) => near(0.025 * 2 * 0.1 * 1000, q.answer.value, 1e-9) || 'fl');
const dp = { S: 0.465, R: 1.0e-3 };
dp.P = (2 * dp.S) / dp.R;
add('drop-num', num({
  stem: 'A tiny drop of mercury in a thermometer-repair shop has radius 1.0 mm. The surface tension of mercury is 0.465 N m⁻¹. Find the excess pressure inside the drop, in Pa.',
  value: dp.P, tol: 1, unit: 'Pa',
  sol: r`A drop has one surface: $\Delta P = \dfrac{2S}{R} = \dfrac{2 \times 0.465}{1.0 \times 10^{-3}} = ${dp.P}$ Pa.`,
  scheme: [[`ΔP = 2S/R = 2 × 0.465/(1.0 × 10⁻³) = ${dp.P} Pa`, 1]],
  d: 1, c: 'application', t: [4],
}), (q) => near(dp.S * (deriv((x) => 4 * Math.PI * x * x, dp.R) / deriv((x) => (4 / 3) * Math.PI * x ** 3, dp.R)), q.answer.value, 1e-4) || 'dp');
const bp = { S: 0.025, d: 0.03 };
bp.R = bp.d / 2;
bp.P = (4 * bp.S) / bp.R;
add('bubble-num', num({
  stem: 'A soap bubble of diameter 3.0 cm is blown in air in a Delhi classroom from a solution of surface tension 0.025 N m⁻¹. Find the excess pressure inside it, in Pa (3 significant figures).',
  value: v3(bp.P), tol: 0.01, unit: 'Pa',
  sol: r`Radius $R = 1.5$ cm $= 0.015$ m. A soap bubble has two surfaces: $\Delta P = \dfrac{4S}{R} = \dfrac{4 \times 0.025}{0.015} = ${dec(bp.P, 3)}$ Pa.`,
  scheme: [['R = 0.015 m; two surfaces, so ΔP = 4S/R', 1], [`ΔP = 4 × 0.025/0.015 = ${dec(bp.P, 3)} Pa`, 1]],
  marks: 2, d: 2, c: 'application', t: [4],
}), (q) => near(2 * ((2 * bp.S) / bp.R), q.answer.value, 3e-3) || 'bp');
const bw = { S: 0.030, R: 0.020 };
bw.W = bw.S * 2 * 4 * Math.PI * bw.R ** 2;
add('blow-num', num({
  stem: 'A soap bubble is blown from nothing to a radius of 2.0 cm in air. The soap solution has surface tension 0.030 N m⁻¹. Taking the work done as the gain of surface energy (two surfaces), find the work done, in mJ (3 significant figures).',
  value: v3(bw.W * 1000), tol: 0.005, unit: 'mJ',
  sol: r`Surface area gained $= 2 \times 4\pi R^2 = 2 \times 4\pi \times (0.020)^2 = ${dec(2 * 4 * Math.PI * bw.R ** 2, 4)}$ m$^2$. $W = S\,\Delta A = 0.030 \times ${dec(2 * 4 * Math.PI * bw.R ** 2, 4)} = ${dec(bw.W * 1000, 3)} \times 10^{-3}$ J $= ${dec(bw.W * 1000, 3)}$ mJ.`,
  scheme: [[`ΔA = 2 × 4πR² = ${dec(2 * 4 * Math.PI * bw.R ** 2, 4)} m²`, 1], [`W = S ΔA = ${dec(bw.W * 1000, 3)} mJ`, 1]],
  marks: 2, d: 3, c: 'application', t: [4],
}), (q) => near(integ((x) => 2 * 8 * Math.PI * x * bw.S, 0, bw.R) * 1000, q.answer.value, 3e-3) || 'bw');
const mg = { n: 1000, r: 1.0e-4, S: 0.072 };
mg.R = mg.r * Math.cbrt(mg.n);
mg.dA = mg.n * 4 * Math.PI * mg.r ** 2 - 4 * Math.PI * mg.R ** 2;
mg.E = mg.S * mg.dA;
add('merge-num', num({
  stem: 'A fine spray from a Kerala waterfall contains 1000 identical water droplets of radius 0.10 mm. They merge into one big drop. Taking the surface tension of water as 0.072 N m⁻¹, find the energy released, in μJ (3 significant figures).',
  value: v3(mg.E * 1e6), tol: 0.05, unit: 'μJ',
  sol: r`Volume is conserved: $R^3 = 1000\,r^3$, so $R = 10r = ${dec(mg.R * 1000, 3)}$ mm. Area lost $= 1000 \times 4\pi r^2 - 4\pi R^2 = 4\pi\,(1000 \times 10^{-8} - 10^{-6}) = ${dec(mg.dA * 1e4, 3)} \times 10^{-4}$ m$^2$. Energy released $= S\,\Delta A = 0.072 \times ${dec(mg.dA * 1e4, 3)} \times 10^{-4} = ${dec(mg.E * 1e6, 3)} \times 10^{-6}$ J $= ${dec(mg.E * 1e6, 3)}$ μJ.`,
  scheme: [['R = 10r from conservation of volume', 1], [`ΔA = 1000 × 4πr² − 4πR² = ${dec(mg.dA * 1e4, 3)} × 10⁻⁴ m²`, 1], [`E = S ΔA = ${dec(mg.E * 1e6, 3)} μJ`, 1]],
  marks: 3, d: 3, c: 'application', t: [4],
}), (q) => {
  const R = root((x) => (4 / 3) * Math.PI * x ** 3 - mg.n * (4 / 3) * Math.PI * mg.r ** 3, 1e-6, 1e-2);
  return near(mg.S * (mg.n * 4 * Math.PI * mg.r ** 2 - 4 * Math.PI * R * R) * 1e6, q.answer.value, 3e-3) || 'mg';
});
const ca = { S: 0.022, rho: 800, r: 0.4e-3 };
ca.h = (2 * ca.S) / (ca.rho * g * ca.r);
add('cap-num', num({
  stem: 'Ethyl alcohol (surface tension 0.022 N m⁻¹, density 800 kg m⁻³, angle of contact about 0°) rises in a clean glass capillary tube of radius 0.40 mm held in a chemistry laboratory. Take g = 9.8 m s⁻². Find the height of the rise, in cm (3 significant figures).',
  value: v3(ca.h * 100), tol: 0.02, unit: 'cm',
  sol: r`$h = \dfrac{2S\cos\theta}{\rho g r} = \dfrac{2 \times 0.022 \times 1}{800 \times 9.8 \times 0.40 \times 10^{-3}} = ${dec(ca.h, 3)}$ m $= ${dec(ca.h * 100, 3)}$ cm.`,
  scheme: [['h = 2S cos θ/(ρ g r) with cos 0° = 1', 1], [`h = ${dec(ca.h, 3)} m = ${dec(ca.h * 100, 3)} cm`, 1]],
  marks: 2, d: 2, c: 'application', t: [4],
}), (q) => near(capHeight(ca.S, 0, ca.rho, ca.r) * 100, q.answer.value, 3e-3) || 'ca');
const mc = { S: 0.465, th: 135, rho: 13600, r: 0.8e-3 };
mc.h = (2 * mc.S * Math.cos((mc.th * Math.PI) / 180)) / (mc.rho * g * mc.r);
add('merc-num', num({
  stem: 'Mercury (surface tension 0.465 N m⁻¹, angle of contact 135°, density 13 600 kg m⁻³) is in contact with a clean glass tube of radius 0.80 mm dipped into a trough of mercury. Take g = 9.8 m s⁻². Find the magnitude of the depression of the mercury level inside the tube, in mm (3 significant figures).',
  value: v3(-mc.h * 1000), tol: 0.05, unit: 'mm',
  sol: r`$h = \dfrac{2S\cos\theta}{\rho g r} = \dfrac{2 \times 0.465 \times (-0.7071)}{13600 \times 9.8 \times 0.80 \times 10^{-3}} = ${dec(mc.h * 1000, 3)} \times 10^{-3}$ m. The negative sign means the level is **depressed**. Depression $= |h| = ${dec(-mc.h * 1000, 3)}$ mm.`,
  scheme: [['cos 135° = −0.7071 (obtuse angle, so a depression)', 1], ['h = 2S cos θ/(ρ g r)', 1], [`Depression = ${dec(-mc.h * 1000, 3)} mm`, 1]],
  marks: 3, d: 4, c: 'application', t: [4],
}), (q) => near(-capHeight(mc.S, mc.th, mc.rho, mc.r) * 1000, q.answer.value, 3e-3) || 'mc');
const rr = { h: 0.049, S: 0.072 };
rr.r = (2 * rr.S) / (1000 * g * rr.h);
add('radius-num', num({
  stem: 'In a clean glass capillary tube dipped in water (surface tension 0.072 N m⁻¹, density 1000 kg m⁻³, angle of contact 0°) the water rises by 4.9 cm. Take g = 9.8 m s⁻². Find the radius of the tube, in mm (2 significant figures).',
  value: Number(dec(rr.r * 1000, 2)), tol: 0.005, unit: 'mm',
  sol: r`$h = \dfrac{2S}{\rho g r}$, so $r = \dfrac{2S}{\rho g h} = \dfrac{2 \times 0.072}{1000 \times 9.8 \times 0.049} = ${dec(rr.r * 1000, 3)} \times 10^{-3}$ m $= ${dec(rr.r * 1000, 2)}$ mm.`,
  scheme: [['r = 2S/(ρ g h)', 1], [`r = ${dec(rr.r * 1000, 2)} mm`, 1]],
  marks: 2, d: 3, c: 'application', t: [4],
}), (q) => near(capHeight(rr.S, 0, 1000, q.answer.value / 1000) * 1000, rr.h * 1000, 1e-2) || 'rr');
add('st-short', short({
  marks: 2,
  stem: 'Define surface tension and give its SI unit. Why does a soap film stretched on a wire frame pull on a sliding wire of length l with a force 2Sl and not Sl?',
  model: 'Surface tension is the **force per unit length** acting along a line drawn on the liquid surface, tangent to the surface and perpendicular to the line; its SI unit is N m⁻¹. A soap film has **two surfaces** (front and back), each pulling on the wire with force $Sl$, so the total force is $2Sl$.',
  sol: 'Force per unit length, N m⁻¹; two surfaces.',
  scheme: [['Force per unit length on a line in the surface; unit N m⁻¹', 1], ['Film has two surfaces, so 2Sl', 1]],
  d: 2, c: 'recall', t: [4],
}));
add('contact-short', short({
  marks: 2,
  stem: 'Define the angle of contact. What does a value greater than 90° tell you about how the liquid behaves on the solid?',
  model: 'The angle of contact is the angle between the **solid surface** and the **tangent to the liquid surface** at the line of contact, measured inside the liquid. If it is greater than 90° the liquid does **not wet** the solid: it draws itself into beads and has a convex surface at the wall, as mercury does on glass.',
  sol: 'Angle between solid and liquid tangent, measured inside the liquid; > 90° means non-wetting.',
  scheme: [['Angle between solid surface and tangent to the liquid surface, measured inside the liquid', 1], ['> 90°: liquid does not wet the solid (e.g. mercury on glass)', 1]],
  d: 2, c: 'recall', t: [4],
}));
add('cap-short', short({
  marks: 2,
  stem: 'Explain why water rises in a thin glass tube dipped in it, whereas mercury is pushed down in the same tube.',
  model: 'Water wets glass (acute angle of contact), so its surface is concave and the surface tension pulls it up the tube until the weight of the raised column balances the pull. Mercury does not wet glass (angle of contact about 140°, obtuse), so its surface is convex and the surface tension pushes the level **down**: $h = 2S\\cos\\theta/(\\rho g r)$ is negative.',
  sol: 'Acute angle: rise; obtuse angle: fall.',
  scheme: [['Water: acute angle, concave surface, pulled up until weight balances', 1], ['Mercury: obtuse angle, convex surface, cos θ negative, level pushed down', 1]],
  d: 3, c: 'understanding', t: [4],
}));
add('bubble-short', short({
  marks: 3,
  stem: 'Show by balancing forces on one half of the drop that the excess pressure inside a spherical liquid drop of radius R and surface tension S is 2S/R.',
  model: r`Cut the drop through a diameter and consider one half. The excess pressure $\Delta P$ acts on the flat circle of area $\pi R^2$, giving an outward force $\Delta P\,\pi R^2$. The surface tension pulls the half inward along the rim of length $2\pi R$ with force $S \times 2\pi R$. In equilibrium $\Delta P\,\pi R^2 = 2\pi R S$, so $\Delta P = \dfrac{2S}{R}$.`,
  sol: 'Force balance on a hemisphere.',
  scheme: [['Outward force ΔP πR² on the cut circle', 1], ['Inward surface-tension force S × 2πR along the rim', 1], ['ΔP = 2S/R', 1]],
  d: 3, c: 'application', t: [4],
}));
add('energy-short', short({
  marks: 3,
  stem: 'A wire slider of length l on a soap film of surface tension S is pulled a distance d. Show that the work done equals S times the increase in area of the film, and say what this tells you about surface energy.',
  model: r`The film has two surfaces, so the force needed is $F = 2Sl$. The work done in pulling the slider a distance $d$ is $W = Fd = 2Sld$. The area of each surface increases by $ld$, so the total increase of area is $\Delta A = 2ld$ and $W = S\,\Delta A$. The work is stored as **surface energy**, so surface energy per unit area equals the surface tension $S$.`,
  sol: 'W = Fd = 2Sld = S ΔA.',
  scheme: [['F = 2Sl', 1], ['W = Fd = 2Sld and ΔA = 2ld, so W = S ΔA', 1], ['Surface energy per unit area = S', 1]],
  d: 3, c: 'application', t: [4],
}));
add('two-bubbles-short', short({
  marks: 2,
  stem: 'Two soap bubbles of different radii, blown from the same solution, are joined by a short tube. Which bubble shrinks and which grows? Give the reason.',
  model: 'The excess pressure inside a soap bubble is $4S/R$, which is **larger for the smaller bubble**. Air therefore flows from the smaller bubble (higher pressure) into the larger one: the smaller bubble shrinks and the larger one grows.',
  sol: 'Smaller bubble has the higher pressure.',
  scheme: [['ΔP = 4S/R is larger for the smaller bubble', 1], ['Air flows from the smaller to the larger: smaller shrinks, larger grows', 1]],
  d: 3, c: 'analysis', t: [4],
}));
void integ;
